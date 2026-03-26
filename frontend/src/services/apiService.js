import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  getPlatformBootstrap: () =>
    apiClient.get('/platform/bootstrap'),

  // Auth endpoints
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
  
  logout: () =>
    apiClient.post('/auth/logout'),
  
  refreshToken: () =>
    apiClient.post('/auth/refresh'),

  // Player endpoints
  getPlayerProfile: (playerId) =>
    apiClient.get(`/players/${playerId}`),
  
  getCurrentPlayer: () =>
    apiClient.get('/players/me'),
  
  updatePlayerProfile: (data) =>
    apiClient.put('/players/me', data),
  
  getPlayerStats: (playerId) =>
    apiClient.get(`/players/${playerId}/stats`),

  // Matchmaking endpoints
  joinQueue: (betAmount, timeFormat) =>
    apiClient.post('/matchmaking/queue', { betAmount, timeFormat }),
  
  leaveQueue: () =>
    apiClient.delete('/matchmaking/queue'),
  
  getQueueStatus: () =>
    apiClient.get('/matchmaking/queue/status'),
  
  getPlayersOnline: () =>
    apiClient.get('/matchmaking/online-count'),

  // Match endpoints
  createMatch: (payload) =>
    apiClient.post('/matches', payload),

  getMatch: (matchId) =>
    apiClient.get(`/matches/${matchId}`),
  
  makeMove: (matchId, move) =>
    apiClient.post(`/matches/${matchId}/move`, move),
  
  resignMatch: (matchId, result = 'resigned') =>
    apiClient.post(`/matches/${matchId}/resign`, { result }),
  
  getMatchHistory: (playerId, limit = 20) =>
    apiClient.get(`/players/${playerId}/matches?limit=${limit}`),

  // Leaderboard endpoints
  getLeaderboard: (period = 'weekly', league = 'all') =>
    apiClient.get(`/leaderboard?period=${period}&league=${league}`),
  
  getPersonalRank: () =>
    apiClient.get('/leaderboard/me'),

  // Coins endpoints
  getCoinBalance: () =>
    apiClient.get('/coins/balance'),
  
  getCoinHistory: () =>
    apiClient.get('/coins/history'),

  // Social endpoints
  sendChallenge: (opponentId, betAmount, timeControl = 'Blitz') =>
    apiClient.post('/social/challenges', { opponentId, betAmount, timeControl }),
  
  acceptChallenge: (challengeId) =>
    apiClient.post(`/social/challenges/${challengeId}/accept`),
  
  rejectChallenge: (challengeId) =>
    apiClient.post(`/social/challenges/${challengeId}/reject`),
  
  getChallenges: () =>
    apiClient.get('/social/challenges'),
  
  getPendingChallenges: () =>
    apiClient.get('/social/challenges/pending'),
  
  getFriends: () =>
    apiClient.get('/social/friends'),
  
  addFriend: (playerId) =>
    apiClient.post('/social/friends', { playerId }),
  
  removeFriend: (playerId) =>
    apiClient.delete(`/social/friends/${playerId}`),
  
  blockPlayer: (playerId) =>
    apiClient.post('/social/block', { playerId }),
  
  unblockPlayer: (playerId) =>
    apiClient.delete(`/social/block/${playerId}`),
  
  getPlayerSuggestions: () =>
    apiClient.get('/social/suggestions'),

  // Achievements endpoints
  getAchievements: () =>
    apiClient.get('/achievements'),
  
  getPlayerAchievements: (playerId) =>
    apiClient.get(`/players/${playerId}/achievements`),

  // Error handler
  handleError: (error) => {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message || 'An error occurred',
        data: error.response.data,
      };
    }
    return {
      status: 0,
      message: error.message || 'Network error',
    };
  },
};

export default apiService;
