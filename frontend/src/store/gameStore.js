import { create } from 'zustand';

export const useGameStore = create((set) => ({
  gameState: {
    id: null,
    player1: null,
    player2: null,
    currentTurn: 'white',
    moves: [],
    position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', // FEN format
    status: 'pending', // pending, ongoing, completed, abandoned
    winner: null,
    betAmount: 0,
    timeFormat: 'blitz', // blitz, rapid, classical
    startTime: null,
    endTime: null,
    playerColor: 'white',
  },
  
  isGameActive: false,
  isLoading: false,
  error: null,

  initGame: (gameData) => set({
    gameState: gameData,
    isGameActive: true,
  }),

  makeMove: (from, to) => set((state) => ({
    gameState: {
      ...state.gameState,
      moves: [...state.gameState.moves, { from, to, timestamp: new Date() }],
      currentTurn: state.gameState.currentTurn === 'white' ? 'black' : 'white',
    },
  })),

  updatePosition: (fen) => set((state) => ({
    gameState: {
      ...state.gameState,
      position: fen,
    },
  })),

  updateGameStatus: (status) => set((state) => ({
    gameState: {
      ...state.gameState,
      status,
    },
  })),

  setWinner: (winner) => set((state) => ({
    gameState: {
      ...state.gameState,
      winner,
      status: 'completed',
      endTime: new Date(),
    },
  })),

  resetGame: () => set({
    gameState: {
      id: null,
      player1: null,
      player2: null,
      currentTurn: 'white',
      moves: [],
      position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      status: 'pending',
      winner: null,
      betAmount: 0,
      timeFormat: 'blitz',
      startTime: null,
      endTime: null,
      playerColor: 'white',
    },
    isGameActive: false,
  }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),
}));
