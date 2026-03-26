import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

let socket = null;

export const socketService = {
  connect: () => {
    if (socket?.connected) return socket;

    socket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return socket;
  },

  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },

  getSocket: () => socket,

  // Game events
  onMove: (callback) => {
    if (socket) socket.on('opponent_move', callback);
  },

  emitMove: (matchId, from, to) => {
    if (socket) socket.emit('move', { matchId, from, to });
  },

  onGameEnd: (callback) => {
    if (socket) socket.on('game_end', callback);
  },

  emitResign: (matchId) => {
    if (socket) socket.emit('resign', { matchId });
  },

  // Matchmaking events
  onMatchFound: (callback) => {
    if (socket) socket.on('match_found', callback);
  },

  onQueueUpdate: (callback) => {
    if (socket) socket.on('queue_update', callback);
  },

  // Challenge/Invite events
  onChallengeReceived: (callback) => {
    if (socket) socket.on('challenge_received', callback);
  },

  emitChallenge: (data) => {
    if (socket) socket.emit('send_challenge', data);
  },

  // Player online status
  onPlayerOnline: (callback) => {
    if (socket) socket.on('player_online', callback);
  },

  onPlayerOffline: (callback) => {
    if (socket) socket.on('player_offline', callback);
  },

  onPlayersOnlineUpdate: (callback) => {
    if (socket) socket.on('players_online_update', callback);
  },

  // Leaderboard updates
  onLeaderboardUpdate: (callback) => {
    if (socket) socket.on('leaderboard_update', callback);
  },

  // Notifications
  onNotification: (callback) => {
    if (socket) socket.on('notification', callback);
  },

  // Generic listeners and emitters
  on: (event, callback) => {
    if (socket) socket.on(event, callback);
  },

  off: (event, callback) => {
    if (socket) socket.off(event, callback);
  },

  emit: (event, data) => {
    if (socket) socket.emit(event, data);
  },
};

export default socketService;
