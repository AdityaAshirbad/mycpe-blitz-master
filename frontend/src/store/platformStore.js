import { create } from 'zustand';
import { platformData } from '../data/platformData';

const mergePlatformData = (incoming = {}) => ({
  ...platformData,
  ...incoming,
  overview: {
    ...platformData.overview,
    ...incoming.overview,
  },
  currentPlayer: {
    ...platformData.currentPlayer,
    ...incoming.currentPlayer,
  },
  matchmaking: {
    ...platformData.matchmaking,
    ...incoming.matchmaking,
    queueSummary: {
      ...platformData.matchmaking.queueSummary,
      ...incoming.matchmaking?.queueSummary,
    },
    availablePlayers: incoming.matchmaking?.availablePlayers || platformData.matchmaking.availablePlayers,
    pendingChallenges: incoming.matchmaking?.pendingChallenges || platformData.matchmaking.pendingChallenges,
    sentChallenges: incoming.matchmaking?.sentChallenges || platformData.matchmaking.sentChallenges,
    computerOpponents: incoming.matchmaking?.computerOpponents || platformData.matchmaking.computerOpponents,
  },
  liveGames: incoming.liveGames || platformData.liveGames,
  leaderboard: {
    ...platformData.leaderboard,
    ...incoming.leaderboard,
    weekly: incoming.leaderboard?.weekly || platformData.leaderboard.weekly,
    hallOfFame: incoming.leaderboard?.hallOfFame || platformData.leaderboard.hallOfFame,
    departments: incoming.leaderboard?.departments || platformData.leaderboard.departments,
  },
  tournaments: incoming.tournaments || platformData.tournaments,
  activityFeed: incoming.activityFeed || platformData.activityFeed,
  admin: {
    ...platformData.admin,
    ...incoming.admin,
    moderationQueue: incoming.admin?.moderationQueue || platformData.admin.moderationQueue,
    actions: incoming.admin?.actions || platformData.admin.actions,
  },
  profile: {
    ...platformData.profile,
    ...incoming.profile,
    headToHead: incoming.profile?.headToHead || platformData.profile.headToHead,
    matchHistory: incoming.profile?.matchHistory || platformData.profile.matchHistory,
  },
});

export const usePlatformStore = create((set) => ({
  data: platformData,
  isLoading: false,
  error: null,

  setPlatformData: (data) => set({ data: mergePlatformData(data), error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
