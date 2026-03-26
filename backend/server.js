const express = require('express');
const http = require('http');
const crypto = require('crypto');
const cors = require('cors');
const { Server } = require('socket.io');
const { ensureStore, loadState, updateState } = require('./store');
const { seedState } = require('./data/seedState');

ensureStore();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

app.use(cors());
app.use(express.json());

const CURRENT_PLAYER_ID = 'p-001';

const getCurrentPlayer = (state) => state.players.find((player) => player.id === state.currentPlayerId);
const getPlayerById = (state, playerId) => state.players.find((player) => player.id === playerId);

const toPlayerPreview = (player) => ({
  id: player.id,
  name: player.name,
  avatar: player.avatar,
  title: player.title,
  points: player.points,
  department: player.department,
  status: player.status,
  preferredMode: player.preferredMode || 'Blitz',
  balance: player.coins,
  wins: player.wins || 0,
  losses: player.losses || 0,
  winRate: player.winRate || 0,
});

const hydrateChallenge = (state, challenge, direction) => {
  const playerId = direction === 'incoming' ? challenge.fromPlayerId : challenge.toPlayerId;
  const player = getPlayerById(state, playerId);

  return {
    id: challenge.id,
    ...(direction === 'incoming'
      ? {
          from: player?.name,
          title: player?.title,
          record: challenge.record || `${player?.wins || 0}W / ${player?.losses || 0}L`,
          mode: challenge.mode,
          bet: challenge.bet,
          message: challenge.message,
          expiresIn: challenge.expiresIn,
          status: challenge.status,
          opponent: player ? toPlayerPreview(player) : null,
        }
      : {
          to: player?.name,
          mode: challenge.mode,
          bet: challenge.bet,
          status: challenge.status,
          opponent: player ? toPlayerPreview(player) : null,
        }),
  };
};

const buildBootstrap = (state) => ({
  overview: state.overview,
  currentPlayer: getCurrentPlayer(state),
  matchmaking: {
    ...state.matchmaking,
    computerOpponents: state.matchmaking.computerOpponents || seedState.matchmaking.computerOpponents,
    availablePlayers: state.players.filter((player) => player.id !== CURRENT_PLAYER_ID).map(toPlayerPreview),
    pendingChallenges: state.social.pendingChallenges.map((challenge) => hydrateChallenge(state, challenge, 'incoming')),
    sentChallenges: state.social.sentChallenges.map((challenge) => hydrateChallenge(state, challenge, 'outgoing')),
  },
  liveGames: state.liveGames,
  leaderboard: state.leaderboard,
  tournaments: state.tournaments,
  activityFeed: state.activityFeed,
  admin: state.admin,
  profile: state.profile,
});

const parseResultChange = (result, bet) => {
  if (result === 'Win') return `+15 RP / +${bet} coins`;
  if (result === 'Loss') return `-10 RP / -${bet} coins`;
  return '+2 RP / 0 coins';
};

app.get('/', (_req, res) => {
  res.send('MYCPE ONE Chess backend running');
});

app.get('/api/platform/bootstrap', (_req, res) => {
  const state = loadState();
  res.json(buildBootstrap(state));
});

app.get('/api/players/me', (_req, res) => {
  const state = loadState();
  res.json(getCurrentPlayer(state));
});

app.put('/api/players/me', (req, res) => {
  const updatedState = updateState((state) => {
    state.players = state.players.map((player) =>
      player.id === CURRENT_PLAYER_ID ? { ...player, ...req.body } : player,
    );
    return state;
  });
  res.json(getCurrentPlayer(updatedState));
});

app.get('/api/players/:playerId', (req, res) => {
  const state = loadState();
  const player = getPlayerById(state, req.params.playerId);
  if (!player) return res.status(404).json({ message: 'Player not found' });
  res.json(player);
});

app.get('/api/players/:playerId/stats', (req, res) => {
  const state = loadState();
  const player = getPlayerById(state, req.params.playerId);
  if (!player) return res.status(404).json({ message: 'Player not found' });
  res.json({
    wins: player.wins,
    losses: player.losses,
    draws: player.draws || 0,
    winRate: player.winRate,
    points: player.points,
    title: player.title,
    coins: player.coins,
  });
});

app.get('/api/players/:playerId/matches', (req, res) => {
  const limit = Number.parseInt(req.query.limit || '20', 10);
  const state = loadState();
  const history = state.profile.matchHistory.slice(0, limit).map((match) => {
    const opponent = getPlayerById(state, match.opponentId);
    const currentPlayer = getCurrentPlayer(state);
    const winner =
      match.result === 'Win' ? CURRENT_PLAYER_ID : match.result === 'Loss' ? match.opponentId : null;

    return {
      id: match.id,
      winner,
      player1: { id: currentPlayer.id, name: currentPlayer.name, avatar: currentPlayer.avatar },
      player2: { id: opponent?.id, name: opponent?.name || match.opponent, avatar: opponent?.avatar },
      result: match.result,
      timeControl: match.mode,
      betAmount: match.bet,
      change: match.change,
    };
  });
  res.json(history);
});

app.get('/api/leaderboard', (req, res) => {
  const state = loadState();
  const league = req.query.league;
  const rows =
    league && league !== 'all'
      ? state.leaderboard.weekly.filter((entry) => entry.title.toLowerCase() === league.toLowerCase())
      : state.leaderboard.weekly;
  res.json(rows);
});

app.get('/api/leaderboard/me', (_req, res) => {
  const state = loadState();
  const entry = state.leaderboard.weekly.find((item) => item.id === CURRENT_PLAYER_ID);
  res.json({
    rank: entry?.rank || null,
    points: entry?.points || getCurrentPlayer(state).points,
    title: entry?.title || getCurrentPlayer(state).title,
  });
});

app.get('/api/matchmaking/queue/status', (_req, res) => {
  const state = loadState();
  res.json(state.matchmaking.queue);
});

app.post('/api/matchmaking/queue', (req, res) => {
  const updatedState = updateState((state) => {
    state.matchmaking.queue = {
      isInQueue: true,
      queuePosition: 3,
      estimatedWaitTime: 24,
      betAmount: req.body.betAmount,
      timeFormat: req.body.timeFormat,
    };
    return state;
  });
  io.emit('queue_update', updatedState.matchmaking.queue);
  res.json(updatedState.matchmaking.queue);
});

app.delete('/api/matchmaking/queue', (_req, res) => {
  const updatedState = updateState((state) => {
    state.matchmaking.queue = {
      isInQueue: false,
      queuePosition: 0,
      estimatedWaitTime: 0,
      betAmount: 100,
      timeFormat: 'blitz',
    };
    return state;
  });
  io.emit('queue_update', updatedState.matchmaking.queue);
  res.json(updatedState.matchmaking.queue);
});

app.get('/api/matchmaking/online-count', (_req, res) => {
  const state = loadState();
  res.json({ count: Number.parseInt(state.overview.kpis[0].value, 10) });
});

app.get('/api/social/challenges', (_req, res) => {
  const state = loadState();
  res.json(state.social.sentChallenges.map((challenge) => hydrateChallenge(state, challenge, 'outgoing')));
});

app.get('/api/social/challenges/pending', (_req, res) => {
  const state = loadState();
  res.json(state.social.pendingChallenges.map((challenge) => hydrateChallenge(state, challenge, 'incoming')));
});

app.post('/api/social/challenges', (req, res) => {
  const challengeId = `c-${Date.now()}`;
  const updatedState = updateState((state) => {
    state.social.sentChallenges.unshift({
      id: challengeId,
      toPlayerId: req.body.opponentId,
      mode: req.body.timeControl || 'Blitz',
      bet: req.body.betAmount,
      status: 'Sent just now',
    });
    return state;
  });

  const created = updatedState.social.sentChallenges.find((challenge) => challenge.id === challengeId);
  res.status(201).json(hydrateChallenge(updatedState, created, 'outgoing'));
});

app.post('/api/social/challenges/:challengeId/accept', (req, res) => {
  const state = loadState();
  const acceptedChallenge = state.social.pendingChallenges.find((challenge) => challenge.id === req.params.challengeId);
  if (!acceptedChallenge) return res.status(404).json({ message: 'Challenge not found' });

  const matchId = `m-${Date.now()}`;
  const updatedState = updateState((draft) => {
    draft.social.pendingChallenges = draft.social.pendingChallenges.filter((challenge) => challenge.id !== req.params.challengeId);
    draft.matches.unshift({
      id: matchId,
      opponentId: acceptedChallenge.fromPlayerId,
      whitePlayerId: CURRENT_PLAYER_ID,
      blackPlayerId: acceptedChallenge.fromPlayerId,
      timeControl: acceptedChallenge.mode.toLowerCase(),
      betAmount: acceptedChallenge.bet,
      privacyMode: 'public',
      beginnerMode: true,
      fen: 'start',
      moveHistory: [],
      status: 'active',
      result: null,
      createdAt: new Date().toISOString(),
    });
    return draft;
  });

  const match = updatedState.matches.find((item) => item.id === matchId);
  res.json(match);
});

app.post('/api/social/challenges/:challengeId/reject', (req, res) => {
  updateState((state) => {
    state.social.pendingChallenges = state.social.pendingChallenges.filter((challenge) => challenge.id !== req.params.challengeId);
    return state;
  });
  res.json({ ok: true });
});

app.get('/api/social/suggestions', (_req, res) => {
  const state = loadState();
  res.json(state.players.filter((player) => player.id !== CURRENT_PLAYER_ID).map(toPlayerPreview));
});

app.get('/api/social/friends', (_req, res) => {
  const state = loadState();
  res.json(state.social.friends.map((friendId) => getPlayerById(state, friendId)).filter(Boolean).map(toPlayerPreview));
});

app.post('/api/matches', (req, res) => {
  const matchId = `m-${Date.now()}`;
  const opponent = getPlayerById(loadState(), req.body.opponentId);
  if (!opponent) return res.status(404).json({ message: 'Opponent not found' });

  const updatedState = updateState((state) => {
    state.matches.unshift({
      id: matchId,
      opponentId: req.body.opponentId,
      whitePlayerId: CURRENT_PLAYER_ID,
      blackPlayerId: req.body.opponentId,
      timeControl: req.body.timeControl || 'blitz',
      betAmount: req.body.betAmount || 250,
      privacyMode: req.body.privacyMode || 'public',
      beginnerMode: Boolean(req.body.beginnerMode),
      fen: 'start',
      moveHistory: [],
      status: 'active',
      result: null,
      createdAt: new Date().toISOString(),
    });
    return state;
  });

  const match = updatedState.matches.find((item) => item.id === matchId);
  io.emit('match_found', { matchId, opponent: toPlayerPreview(opponent) });
  res.status(201).json(match);
});

app.get('/api/matches/:matchId', (req, res) => {
  const state = loadState();
  const match = state.matches.find((item) => item.id === req.params.matchId);
  if (!match) return res.status(404).json({ message: 'Match not found' });
  res.json(match);
});

app.post('/api/matches/:matchId/move', (req, res) => {
  const updatedState = updateState((state) => {
    const match = state.matches.find((item) => item.id === req.params.matchId);
    if (!match) return state;
    match.fen = req.body.fen || match.fen;
    match.moveHistory.push({
      from: req.body.from,
      to: req.body.to,
      san: req.body.san,
      fen: req.body.fen,
      createdAt: new Date().toISOString(),
    });
    return state;
  });

  const match = updatedState.matches.find((item) => item.id === req.params.matchId);
  if (!match) return res.status(404).json({ message: 'Match not found' });

  io.emit('opponent_move', {
    matchId: match.id,
    from: req.body.from,
    to: req.body.to,
    fen: req.body.fen,
    san: req.body.san,
  });
  res.json(match);
});

app.post('/api/matches/:matchId/resign', (req, res) => {
  const updatedState = updateState((state) => {
    const match = state.matches.find((item) => item.id === req.params.matchId);
    if (!match) return state;
    match.status = 'completed';
    match.result = req.body.result || 'resigned';
    return state;
  });

  const match = updatedState.matches.find((item) => item.id === req.params.matchId);
  if (!match) return res.status(404).json({ message: 'Match not found' });
  res.json(match);
});

app.get('/api/coins/balance', (_req, res) => {
  const state = loadState();
  res.json({ balance: getCurrentPlayer(state).coins });
});

app.get('/api/coins/history', (_req, res) => {
  const state = loadState();
  res.json(state.profile.matchHistory.map((match) => ({ id: match.id, summary: match.change, bet: match.bet })));
});

app.get('/api/achievements', (_req, res) => {
  const state = loadState();
  res.json(getCurrentPlayer(state).badges);
});

app.get('/api/players/:playerId/achievements', (req, res) => {
  const state = loadState();
  const player = getPlayerById(state, req.params.playerId);
  if (!player) return res.status(404).json({ message: 'Player not found' });
  res.json(player.badges || []);
});

io.on('connection', (socket) => {
  socket.emit('players_online_update', { count: Number.parseInt(loadState().overview.kpis[0].value, 10) });
});

server.listen(5000, () => {
  console.log('MYCPE ONE Chess backend running on port 5000');
});
