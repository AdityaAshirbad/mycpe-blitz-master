import { create } from 'zustand';

export const useSocialStore = create((set) => ({
  challenges: [],
  pendingChallenges: [],
  friends: [],
  suggestions: [],
  isLoading: false,
  error: null,

  setChallenges: (challenges) => set({ challenges }),

  addChallenge: (challenge) => set((state) => ({
    challenges: [...state.challenges, challenge],
  })),

  removeChallenge: (challengeId) => set((state) => ({
    challenges: state.challenges.filter(c => c.id !== challengeId),
  })),

  setPendingChallenges: (challenges) => set({ pendingChallenges: challenges }),

  addPendingChallenge: (challenge) => set((state) => ({
    pendingChallenges: [...state.pendingChallenges, challenge],
  })),

  removePendingChallenge: (challengeId) => set((state) => ({
    pendingChallenges: state.pendingChallenges.filter(c => c.id !== challengeId),
  })),

  setFriends: (friends) => set({ friends }),

  addFriend: (friend) => set((state) => ({
    friends: [...state.friends, friend],
  })),

  removeFriend: (friendId) => set((state) => ({
    friends: state.friends.filter(f => f.id !== friendId),
  })),

  setSuggestions: (suggestions) => set({ suggestions }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),
}));
