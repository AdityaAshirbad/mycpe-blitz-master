import { create } from 'zustand';

export const useUIStore = create((set) => ({
  theme: 'dark', // dark, light
  sidebarOpen: true,
  modals: {
    invitePlayer: false,
    gameResults: false,
    settings: false,
    profileView: false,
  },
  notifications: [],

  setTheme: (theme) => set({ theme }),

  toggleSidebar: () => set((state) => ({
    sidebarOpen: !state.sidebarOpen,
  })),

  openModal: (modalName) => set((state) => ({
    modals: {
      ...state.modals,
      [modalName]: true,
    },
  })),

  closeModal: (modalName) => set((state) => ({
    modals: {
      ...state.modals,
      [modalName]: false,
    },
  })),

  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, {
      id: Date.now(),
      ...notification,
    }],
  })),

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id),
  })),
}));
