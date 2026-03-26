import { create } from 'zustand';

export const useMatchmakingStore = create((set) => ({
  queue: {
    isInQueue: false,
    queuePosition: 0,
    estimatedWaitTime: 0,
    betAmount: 100,
    timeFormat: 'blitz',
  },
  
  playersOnline: 0,
  activeMatches: 0,
  isSearching: false,
  error: null,

  joinQueue: (betAmount, timeFormat) => set({
    queue: {
      isInQueue: true,
      queuePosition: 0,
      estimatedWaitTime: 0,
      betAmount,
      timeFormat,
    },
    isSearching: true,
  }),

  leaveQueue: () => set({
    queue: {
      isInQueue: false,
      queuePosition: 0,
      estimatedWaitTime: 0,
      betAmount: 100,
      timeFormat: 'blitz',
    },
    isSearching: false,
  }),

  updateQueuePosition: (position) => set((state) => ({
    queue: {
      ...state.queue,
      queuePosition: position,
    },
  })),

  updateEstimatedWaitTime: (time) => set((state) => ({
    queue: {
      ...state.queue,
      estimatedWaitTime: time,
    },
  })),

  setPlayersOnline: (count) => set({ playersOnline: count }),

  setActiveMatches: (count) => set({ activeMatches: count }),

  setSearching: (searching) => set({ isSearching: searching }),

  setError: (error) => set({ error }),
}));
