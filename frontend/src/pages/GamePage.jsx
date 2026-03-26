import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { betTiers, timeControls } from '../data/platformData';
import { chooseComputerMove } from '../services/computerPlayer';
import { apiService } from '../services/apiService';
import { usePlatformStore } from '../store/platformStore';

const INITIAL_POSITION = new Chess().fen();
const FALLBACK_OPPONENT = {
  id: 'bot-coach',
  name: 'Coach Bot',
  title: 'Training Partner',
  department: 'Practice Arena',
  status: 'Ready anytime',
  preferredMode: 'Blitz',
  difficulty: 'easy',
  isComputer: true,
};

const getSecondsForMode = (mode) => {
  if (mode === 'bullet') return 60;
  if (mode === 'classical') return 15 * 60;
  return 5 * 60;
};

const formatClock = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const GamePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = usePlatformStore((state) => state.data);
  const state = location.state || {};
  const matchmaking = data.matchmaking || {};
  const availablePlayers = matchmaking.availablePlayers || [];
  const liveGames = data.liveGames || [];
  const fallbackLiveGame = liveGames[1] || liveGames[0] || { spectators: 0 };
  const opponent = state.opponent || availablePlayers[1] || availablePlayers[0] || FALLBACK_OPPONENT;
  const isComputerOpponent = Boolean(opponent?.isComputer);
  const computerDifficulty = state.computerDifficulty || opponent?.difficulty || 'medium';
  const selectedControl = state.timeControl || 'blitz';
  const selectedBet = state.betTier || betTiers[1];
  const [matchId, setMatchId] = React.useState(state.matchId || null);
  const [game, setGame] = React.useState(new Chess());
  const [position, setPosition] = React.useState(INITIAL_POSITION);
  const [selectedSquare, setSelectedSquare] = React.useState(null);
  const [moveSquares, setMoveSquares] = React.useState({});
  const [beginnerMode, setBeginnerMode] = React.useState(state.beginnerMode ?? true);
  const [localHotseatMode, setLocalHotseatMode] = React.useState(!isComputerOpponent);
  const [gameStatus, setGameStatus] = React.useState('White to move');
  const [whiteClock, setWhiteClock] = React.useState(getSecondsForMode(selectedControl));
  const [blackClock, setBlackClock] = React.useState(getSecondsForMode(selectedControl));

  React.useEffect(() => {
    const createMatch = async () => {
      if (matchId || !opponent?.id || isComputerOpponent) return;

      try {
        const response = await apiService.createMatch({
          opponentId: opponent.id,
          timeControl: selectedControl,
          betAmount: selectedBet.coins,
          privacyMode: state.privacyMode,
          beginnerMode,
        });
        setMatchId(response.data.id);
      } catch (error) {
        console.error('Unable to create match:', error);
      }
    };

    createMatch();
  }, [beginnerMode, isComputerOpponent, matchId, opponent?.id, selectedBet.coins, selectedControl, state.privacyMode]);

  const history = game.history({ verbose: true });
  const increment = selectedControl === 'classical' ? 5 : selectedControl === 'blitz' ? 2 : 0;
  const boardOrientation = localHotseatMode ? (game.turn() === 'w' ? 'white' : 'black') : 'white';

  React.useEffect(() => {
    if (game.isGameOver()) return undefined;

    const timer = window.setInterval(() => {
      if (game.turn() === 'w') {
        setWhiteClock((time) => Math.max(time - 1, 0));
      } else {
        setBlackClock((time) => Math.max(time - 1, 0));
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [game]);

  React.useEffect(() => {
    if (whiteClock === 0) {
      setGameStatus('Black wins on time');
    }
  }, [whiteClock]);

  React.useEffect(() => {
    if (blackClock === 0) {
      setGameStatus('White wins on time');
    }
  }, [blackClock]);

  React.useEffect(() => {
    if (!isComputerOpponent || game.turn() !== 'b' || game.isGameOver() || blackClock === 0 || whiteClock === 0) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      const computerMove = chooseComputerMove(game, computerDifficulty);
      if (!computerMove) return;
      makeMove(computerMove.from, computerMove.to, {
        promotion: computerMove.promotion || 'q',
        persist: false,
      });
    }, 500);

    return () => window.clearTimeout(timer);
  }, [blackClock, computerDifficulty, game, isComputerOpponent, whiteClock]);

  const syncGame = (nextGame) => {
    setGame(nextGame);
    setPosition(nextGame.fen());
    setSelectedSquare(null);
    setMoveSquares({});

    if (nextGame.isCheckmate()) {
      setGameStatus(nextGame.turn() === 'w' ? 'Black wins by checkmate' : 'White wins by checkmate');
    } else if (nextGame.isDraw()) {
      setGameStatus('Draw detected');
    } else if (nextGame.inCheck()) {
      setGameStatus(nextGame.turn() === 'w' ? 'White is in check' : 'Black is in check');
    } else {
      setGameStatus(nextGame.turn() === 'w' ? 'White to move' : 'Black to move');
    }
  };

  const addIncrement = (turnBeforeMove) => {
    if (!increment) return;
    if (turnBeforeMove === 'w') {
      setWhiteClock((time) => time + increment);
    } else {
      setBlackClock((time) => time + increment);
    }
  };

  const getPromotionPiece = (from, to) => {
    const piece = game.get(from);
    if (!piece || piece.type !== 'p') return 'q';

    const targetRank = to[1];
    const isPromotion =
      (piece.color === 'w' && targetRank === '8') ||
      (piece.color === 'b' && targetRank === '1');

    if (!isPromotion) return 'q';

    const selection = window.prompt('Promote pawn to: q, r, b, or n', 'q');
    const normalized = selection?.trim().toLowerCase();
    return ['q', 'r', 'b', 'n'].includes(normalized) ? normalized : 'q';
  };

  const makeMove = (from, to, options = {}) => {
    const turnBeforeMove = game.turn();
    const nextGame = new Chess(game.fen());
    const result = nextGame.move({
      from,
      to,
      promotion: options.promotion || getPromotionPiece(from, to),
    });
    if (!result) return false;
    addIncrement(turnBeforeMove);
    syncGame(nextGame);

    if (matchId && options.persist !== false) {
      apiService.makeMove(matchId, {
        from,
        to,
        fen: nextGame.fen(),
        san: result.san,
      }).catch((error) => {
        console.error('Unable to persist move:', error);
      });
    }
    return true;
  };

  const onDrop = ({ sourceSquare, targetSquare }) => {
    if (!targetSquare) return false;
    return makeMove(sourceSquare, targetSquare);
  };

  const handleSquareClick = ({ square }) => {
    if (selectedSquare && moveSquares[square]) {
      makeMove(selectedSquare, square);
      return;
    }

    const piece = game.get(square);
    if (!piece) {
      setSelectedSquare(null);
      setMoveSquares({});
      return;
    }

    if (localHotseatMode) {
      if (piece.color !== game.turn()) {
        setSelectedSquare(null);
        setMoveSquares({});
        return;
      }
    } else if (piece.color !== 'w') {
      setSelectedSquare(null);
      setMoveSquares({});
      return;
    }

    const moves = game.moves({ square, verbose: true });
    if (!moves.length) {
      setSelectedSquare(null);
      setMoveSquares({});
      return;
    }

    const nextSquares = {};
    moves.forEach((move) => {
      nextSquares[move.to] = {
        background:
          game.get(move.to) && game.get(move.to).color !== game.get(square)?.color
            ? 'radial-gradient(circle, rgba(255,132,0,0.95) 0%, rgba(255,132,0,0.35) 55%, transparent 56%)'
            : 'radial-gradient(circle, rgba(255,132,0,0.7) 0%, rgba(255,132,0,0.22) 28%, transparent 30%)',
        borderRadius: '50%',
      };
    });

    nextSquares[square] = {
      background: 'rgba(255, 132, 0, 0.25)',
    };

    setSelectedSquare(square);
    setMoveSquares(nextSquares);
  };

  const handlePieceClick = ({ square }) => {
    if (!square) return;
    handleSquareClick({ square });
  };

  const resetGame = () => {
    const freshGame = new Chess();
    setWhiteClock(getSecondsForMode(selectedControl));
    setBlackClock(getSecondsForMode(selectedControl));
    setGameStatus('White to move');
    setLocalHotseatMode(!isComputerOpponent);
    syncGame(freshGame);
  };

  return (
    <div className="game-shell">
      <section className="game-topbar">
        <div className="game-topbar__copy">
          <span className="kicker">{isComputerOpponent ? 'Practice match' : 'Live match'}</span>
          <h1>
            Aarav Nair vs {opponent?.name || 'Opponent'}
          </h1>
          <p>
            {timeControls.find((item) => item.id === selectedControl)?.label} -{' '}
            {isComputerOpponent ? `${computerDifficulty} computer difficulty` : `${selectedBet.coins} coin wager`} -{' '}
            {state.privacyMode === 'private' || isComputerOpponent ? 'Private' : 'Spectator-enabled'} table
          </p>
        </div>
        <div className="inline-actions">
          <button type="button" className="btn btn-secondary" onClick={() => setBeginnerMode((value) => !value)}>
            {beginnerMode ? 'Hide hints' : 'Show hints'}
          </button>
          {!isComputerOpponent && (
            <button type="button" className="btn btn-secondary" onClick={() => setLocalHotseatMode((value) => !value)}>
              {localHotseatMode ? 'Hotseat on' : 'Hotseat off'}
            </button>
          )}
          <button type="button" className="btn btn-secondary" onClick={resetGame}>
            Reset board
          </button>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>
            Exit match
          </button>
        </div>
      </section>

      <section className="game-layout-grid">
        <article className="panel game-main">
          <div className="clock-strip">
            <div className="clock-card">
              <span>Aarav Nair</span>
              <strong>{formatClock(whiteClock)}</strong>
            </div>
            <div className="status-pill">{gameStatus}</div>
            <div className="clock-card">
              <span>{opponent?.name || 'Opponent'}</span>
              <strong>{formatClock(blackClock)}</strong>
            </div>
          </div>

          <div className="board-wrap">
            <Chessboard
              options={{
                id: 'mycpe-one-board',
                position,
                boardOrientation,
                onPieceDrop: onDrop,
                onPieceClick: handlePieceClick,
                onSquareClick: handleSquareClick,
                allowDragging: true,
                canDragPiece: ({ piece }) => {
                  if (!piece?.pieceType) return false;
                  if (localHotseatMode) {
                    return piece.pieceType[0].toLowerCase() === game.turn();
                  }
                  return piece.pieceType[0].toLowerCase() === 'w';
                },
                boardStyle: {
                  width: 'min(100%, 640px)',
                  borderRadius: '24px',
                  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.45)',
                  overflow: 'hidden',
                },
                darkSquareStyle: { backgroundColor: '#8a3f00' },
                lightSquareStyle: { backgroundColor: '#f3d3b3' },
                squareStyles: moveSquares,
              }}
            />
          </div>
        </article>

        <aside className="game-sidebars">
          <article className="panel">
            <div className="panel-heading">
              <div>
                <span className="kicker">Moves</span>
                <h2>History</h2>
              </div>
            </div>
            <div className="move-list">
              {history.length === 0 ? (
                <p>No moves yet.</p>
              ) : (
                history.map((move, index) => (
                  <div key={`${move.san}-${index}`} className="move-row">
                    <span>{index + 1}</span>
                    <strong>{move.san}</strong>
                    <small>
                      {move.from} to {move.to}
                    </small>
                  </div>
                ))
              )}
            </div>
          </article>

          <article className="panel">
            <div className="panel-heading">
              <div>
                <span className="kicker">Context</span>
                <h2>Match details</h2>
              </div>
            </div>
            <div className="bullet-list">
              <div className="list-row">
                <span className="dot" />
                <p>Beginner mode {beginnerMode ? 'enabled with legal-move highlighting' : 'disabled'}.</p>
              </div>
              <div className="list-row">
                <span className="dot" />
                <p>{increment ? `Increment active at +${increment} seconds per move.` : 'No move increment in this mode.'}</p>
              </div>
              <div className="list-row">
                <span className="dot" />
                <p>
                  {isComputerOpponent
                    ? `Computer opponent is active on ${computerDifficulty} difficulty.`
                    : localHotseatMode
                      ? 'Hotseat mode is active, so both sides can be played locally.'
                      : 'Single-side mode is active for white only.'}
                </p>
              </div>
              <div className="list-row">
                <span className="dot" />
                <p>{fallbackLiveGame.spectators} people are watching the featured company match stream.</p>
              </div>
              <div className="list-row">
                <span className="dot" />
                <p>Takeback, draw, and spectator chat can layer into this shell next.</p>
              </div>
            </div>
          </article>
        </aside>
      </section>
    </div>
  );
};
