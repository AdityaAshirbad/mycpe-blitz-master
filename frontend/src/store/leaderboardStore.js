import { create } from 'zustand';

export const useLeaderboardStore = create((set, get) => ({
  leaderboard: [
    { id: 'p1', name: 'ChessMaster99', avatar: 'https://i.pravatar.cc/100?img=10', elo: 2480, wins: 153, losses: 21, winRate: 88, league: 'diamond' },
    { id: 'p2', name: 'BlueKnight', avatar: 'https://i.pravatar.cc/100?img=11', elo: 2375, wins: 141, losses: 32, winRate: 82, league: 'platinum' },
    { id: 'p3', name: 'WhiteRook', avatar: 'https://i.pravatar.cc/100?img=12', elo: 2260, wins: 131, losses: 43, winRate: 75, league: 'gold' },
    { id: 'p4', name: 'QueenSlayer', avatar: 'https://i.pravatar.cc/100?img=13', elo: 2190, wins: 118, losses: 48, winRate: 71, league: 'gold' },
    { id: 'p5', name: 'PawnStorm', avatar: 'https://i.pravatar.cc/100?img=14', elo: 2100, wins: 104, losses: 55, winRate: 65, league: 'silver' },
  ],
  personalRank: 5,
  isLoading: false,
  error: null,
  filterPeriod: 'weekly', // weekly, monthly, all-time
  filterLeague: 'all', // all, bronze, silver, gold, platinum, diamond

  setLeaderboard: (data) => set({ leaderboard: data }),

  setPersonalRank: (rank) => set({ personalRank: rank }),

  setFilterPeriod: (period) => set({ filterPeriod: period }),

  setFilterLeague: (league) => set({ filterLeague: league }),

  setIsLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  updateLeaderboard: (newLeaderboard) => set({
    leaderboard: newLeaderboard.sort((a, b) => b.elo - a.elo),
  }),

  getPlayerRank: (playerId) => {
    const state = get();
    return state.leaderboard.findIndex(p => p.id === playerId) + 1;
  },
}));
