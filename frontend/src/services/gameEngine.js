import { Chess } from 'chess.js';

export const gameEngine = {
  gameInstance: null,

  initGame: () => {
    gameEngine.gameInstance = new Chess();
    return gameEngine.gameInstance;
  },

  getGame: () => gameEngine.gameInstance || new Chess(),

  makeMove: (from, to) => {
    const game = gameEngine.getGame();
    try {
      const move = game.move({
        from,
        to,
        promotion: 'q', // Default to queen
      });
      return move;
    } catch (error) {
      console.error('Invalid move:', error);
      return null;
    }
  },

  isValidMove: (from, to) => {
    const game = gameEngine.getGame();
    const moves = game.moves({ square: from, verbose: true });
    return moves.some(m => m.to === to);
  },

  getLegalMoves: (square) => {
    const game = gameEngine.getGame();
    const moves = game.moves({ square, verbose: true });
    return moves.map(m => m.to);
  },

  getFEN: () => {
    const game = gameEngine.getGame();
    return game.fen();
  },

  loadFEN: (fen) => {
    const game = new Chess(fen);
    gameEngine.gameInstance = game;
    return game;
  },

  isCheckmate: () => {
    const game = gameEngine.getGame();
    return game.isCheckmate();
  },

  isStalemate: () => {
    const game = gameEngine.getGame();
    return game.isStalemate();
  },

  isCheck: () => {
    const game = gameEngine.getGame();
    return game.isCheck();
  },

  getGameStatus: () => {
    const game = gameEngine.getGame();
    if (game.isCheckmate()) return 'checkmate';
    if (game.isStalemate()) return 'stalemate';
    if (game.isDraw()) return 'draw';
    if (game.isCheck()) return 'check';
    return 'ongoing';
  },

  getTurns: () => {
    const game = gameEngine.getGame();
    return game.turn();
  },

  getMoveHistory: () => {
    const game = gameEngine.getGame();
    return game.moves({ verbose: true });
  },

  getPosition: () => {
    const game = gameEngine.getGame();
    return game.board();
  },

  reset: () => {
    gameEngine.gameInstance = new Chess();
  },

  getGameOverReason: () => {
    const game = gameEngine.getGame();
    if (game.isCheckmate()) return 'Checkmate';
    if (game.isStalemate()) return 'Stalemate';
    if (game.isDraw()) return 'Draw';
    return null;
  },
};

export default gameEngine;
