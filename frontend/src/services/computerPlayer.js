import { Chess } from 'chess.js';

const PIECE_VALUES = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 0,
};

const EASY = 'easy';
const MEDIUM = 'medium';
const HARD = 'hard';

const evaluateBoard = (game) => {
  if (game.isCheckmate()) {
    return game.turn() === 'w' ? -100000 : 100000;
  }

  if (game.isDraw()) {
    return 0;
  }

  let score = 0;
  const board = game.board();

  board.forEach((row) => {
    row.forEach((piece) => {
      if (!piece) return;
      const value = PIECE_VALUES[piece.type] || 0;
      score += piece.color === 'b' ? value : -value;
    });
  });

  if (game.inCheck()) {
    score += game.turn() === 'w' ? 35 : -35;
  }

  return score;
};

const scoreMove = (game, move, difficulty) => {
  const next = new Chess(game.fen());
  next.move(move);

  let score = evaluateBoard(next);

  if (move.captured) {
    score += (PIECE_VALUES[move.captured] || 0) + 25;
  }

  if (move.promotion) {
    score += PIECE_VALUES[move.promotion] || 0;
  }

  if (next.isCheckmate()) {
    score += 50000;
  } else if (next.inCheck()) {
    score += 45;
  }

  const file = move.to.charCodeAt(0) - 97;
  const rank = Number.parseInt(move.to[1], 10) - 1;
  const centrality = 3.5 - Math.abs(file - 3.5) + (3.5 - Math.abs(rank - 3.5));

  if (difficulty !== EASY) {
    score += centrality * 6;
  }

  if (difficulty === HARD) {
    const replies = next.moves({ verbose: true });
    if (replies.length) {
      const worstReply = Math.min(
        ...replies.map((reply) => {
          const replyGame = new Chess(next.fen());
          replyGame.move(reply);
          return evaluateBoard(replyGame);
        }),
      );
      score = score * 0.65 + worstReply * 0.35;
    }
  }

  return score;
};

export const chooseComputerMove = (game, difficulty = MEDIUM) => {
  const legalMoves = game.moves({ verbose: true });
  if (!legalMoves.length) return null;

  if (difficulty === EASY) {
    const forcingMoves = legalMoves.filter((move) => move.captured || move.promotion);
    const pool = forcingMoves.length ? forcingMoves : legalMoves;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  const rankedMoves = legalMoves
    .map((move) => ({
      move,
      score: scoreMove(game, move, difficulty),
    }))
    .sort((a, b) => b.score - a.score);

  if (difficulty === MEDIUM && rankedMoves.length > 1) {
    const topMoves = rankedMoves.slice(0, Math.min(3, rankedMoves.length));
    return topMoves[Math.floor(Math.random() * topMoves.length)].move;
  }

  return rankedMoves[0].move;
};

export default chooseComputerMove;
