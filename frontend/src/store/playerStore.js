import { create } from 'zustand';

export const usePlayerStore = create((set) => ({
  player: {
    id: null,
    name: '',
    email: '',
    avatar: '',
    elo: 1000,
    coins: 1000,
    level: 1,
    wins: 0,
    losses: 0,
    draws: 0,
    winRate: 0,
    league: 'bronze',
    achievements: [],
    friends: [],
    blockedPlayers: [],
    joinedDate: new Date(),
    phoneNumber: '',
  },
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setPlayer: (playerData) => set({ player: playerData }),
  
  setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
  
  updateCoins: (amount) => set((state) => ({
    player: {
      ...state.player,
      coins: state.player.coins + amount,
    },
  })),
  
  updateElo: (amount) => set((state) => ({
    player: {
      ...state.player,
      elo: state.player.elo + amount,
    },
  })),
  
  addFriend: (friend) => set((state) => ({
    player: {
      ...state.player,
      friends: [...state.player.friends, friend],
    },
  })),
  
  removeFriend: (friendId) => set((state) => ({
    player: {
      ...state.player,
      friends: state.player.friends.filter(f => f.id !== friendId),
    },
  })),
  
  blockPlayer: (playerId) => set((state) => ({
    player: {
      ...state.player,
      blockedPlayers: [...state.player.blockedPlayers, playerId],
    },
  })),
  
  unblockPlayer: (playerId) => set((state) => ({
    player: {
      ...state.player,
      blockedPlayers: state.player.blockedPlayers.filter(id => id !== playerId),
    },
  })),

  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  resetPlayer: () => set({
    player: {
      id: null,
      name: '',
      email: '',
      avatar: '',
      elo: 1000,
      coins: 1000,
      level: 1,
      wins: 0,
      losses: 0,
      draws: 0,
      winRate: 0,
      league: 'bronze',
      achievements: [],
      friends: [],
      blockedPlayers: [],
      joinedDate: new Date(),
      phoneNumber: '',
    },
    isAuthenticated: false,
  }),
}));
