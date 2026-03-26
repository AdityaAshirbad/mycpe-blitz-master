# MyCPE Blitz - Component Structure & Implementation Guide

## Frontend Component Architecture

### Directory Structure

```
frontend/src/
│
├── components/
│   ├── Game/
│   │   ├── ChessBoard.jsx              # Main chess board UI (react-chessboard)
│   │   ├── GameControls.jsx            # Timer, forfeit, draw buttons
│   │   ├── MoveHistory.jsx             # Notation + move list
│   │   ├── GameNotifications.jsx       # Check/checkmate alerts
│   │   ├── PostGameScreen.jsx          # Results, stats, coin changes
│   │   └── GameContainer.jsx           # Root game component
│   │
│   ├── Matchmaking/
│   │   ├── MatchmakingQueue.jsx        # Queue status & wait animation
│   │   ├── BetSelector.jsx             # Choose bet amount
│   │   ├── TimeFormatSelector.jsx      # Blitz/Rapid/Classical
│   │   ├── PlayersOnlineWidget.jsx     # Show online count
│   │   └── QueueCancelButton.jsx       # Leave queue
│   │
│   ├── Leaderboard/
│   │   ├── LeaderboardTable.jsx        # Main rankings table
│   │   ├── LeaderboardFilters.jsx      # Period/league filters
│   │   ├── PersonalRankCard.jsx        # Player's rank info
│   │   ├── LeaderboardEntry.jsx        # Single row
│   │   └── LeaderboardContainer.jsx    # Root leaderboard
│   │
│   ├── Profile/
│   │   ├── PlayerCard.jsx              # Profile header (name, avatar, stats)
│   │   ├── StatsPanel.jsx              # Detailed stats display
│   │   ├── AchievementGallery.jsx      # Badges showcase
│   │   ├── EloChart.jsx                # Elo progression graph
│   │   ├── RecentMatches.jsx           # Match history list
│   │   ├── LeaguePanel.jsx             # Tier & promotion progress
│   │   └── ProfileContainer.jsx        # Root profile
│   │
│   ├── Rewards/
│   │   ├── SpinWheelUI.jsx             # Animated wheel component
│   │   ├── SpinButton.jsx              # Trigger spin
│   │   ├── RewardAnimation.jsx         # Coin animation
│   │   ├── AchievementNotification.jsx # Badge unlocked popup
│   │   └── RewardsContainer.jsx        # Root rewards
│   │
│   ├── Social/
│   │   ├── ChallengeCard.jsx           # Challenge invite card
│   │   ├── ChallengeModal.jsx          # Send challenge form
│   │   ├── InviteResponse.jsx          # Accept/reject UI
│   │   ├── FriendsList.jsx             # Colleagues list
│   │   ├── BlockList.jsx               # Blocked players
│   │   ├── OpponentCard.jsx            # Show opponent info during game
│   │   └── SocialContainer.jsx         # Root social
│   │
│   ├── Common/
│   │   ├── Header.jsx                  # Navigation bar
│   │   ├── Sidebar.jsx                 # Menu
│   │   ├── CoinDisplay.jsx             # Coin balance widget
│   │   ├── EloDisplay.jsx              # Elo badge
│   │   ├── Timer.jsx                   # Chess clock
│   │   ├── Modal.jsx                   # Reusable modal
│   │   ├── Button.jsx                  # Themed button
│   │   ├── LoadingSpinner.jsx          # Loading indicator
│   │   ├── ErrorBoundary.jsx           # Error handling
│   │   └── Toast.jsx                   # Notifications
│   │
│   └── Layouts/
│       ├── MainLayout.jsx              # Primary layout with header/sidebar
│       ├── GameLayout.jsx              # Full-screen game layout
│       └── ModalLayout.jsx             # Overlay layout
│
├── pages/
│   ├── Dashboard.jsx                   # Home/main page
│   ├── PlayPage.jsx                    # Game mode (matchmaking → game)
│   ├── LeaderboardPage.jsx             # Rankings view
│   ├── ProfilePage.jsx                 # Player profile
│   ├── TournamentPage.jsx              # Tournaments list & bracket
│   ├── SettingsPage.jsx                # Preferences/themes
│   └── NotFoundPage.jsx                # 404
│
├── hooks/
│   ├── useGame.js                      # Game state & logic
│   ├── useMatchmaking.js               # Queue & matchmaking
│   ├── useSocket.js                    # WebSocket connection
│   ├── useLeaderboard.js               # Leaderboard data
│   ├── usePlayer.js                    # Current player data
│   ├── useCoinBalance.js               # Coin state
│   ├── useAchievements.js              # Badge logic
│   └── useTimer.js                     # Chess clock
│
├── services/
│   ├── socketService.js                # Socket.IO client wrapper
│   ├── apiService.js                   # REST API wrapper
│   ├── gameEngine.js                   # Chess logic (chess.js)
│   ├── authService.js                  # Login/SSO
│   ├── storageService.js               # LocalStorage wrapper
│   └── analyticsService.js             # Event tracking
│
├── store/
│   ├── gameStore.js                    # Game state (Zustand)
│   ├── playerStore.js                  # Player state
│   ├── matchmakingStore.js             # Queue state
│   ├── leaderboardStore.js             # Rankings state
│   ├── uiStore.js                      # UI state (theme, modals)
│   └── notificationStore.js            # Toasts/alerts
│
├── styles/
│   ├── globals.css                     # Global styles
│   ├── variables.css                   # CSS variables (colors, spacing)
│   ├── animations.css                  # Keyframes
│   └── responsive.css                  # Media queries
│
├── utils/
│   ├── formatters.js                   # Number, date formatting
│   ├── validators.js                   # Input validation
│   ├── constants.js                    # App constants
│   ├── colors.js                       # Color palette
│   ├── piece-sounds.js                 # Audio handling
│   └── helpers.js                      # Utility functions
│
├── tests/
│   ├── components/                     # Component tests
│   ├── hooks/                          # Hook tests
│   ├── services/                       # Service tests
│   └── integration/                    # E2E tests
│
├── App.jsx                             # Root component
├── main.jsx                            # Entry point
└── index.html                          # HTML template
```

---

## Key Components Deep Dive

### 1. ChessBoard.jsx
```javascript
// Wraps react-chessboard library
Props:
  - position: FEN string
  - onMovePiece: (source, target) → Promise
  - isPlayerTurn: Boolean
  - showLegalMoves: Boolean
  - playerColor: 'white' | 'black'

State:
  - selectedSquare: String
  - legalMoves: String[]
  - arrow: Array (for highlighting)

Features:
  - Drag-and-drop pieces
  - Legal move highlighting
  - Move animation
  - Board theme switching
  - Piece style switching
```

### 2. MatchmakingQueue.jsx
```javascript
Props:
  - isSearching: Boolean
  - onCancel: Function

State:
  - playersAhead: Number
  - estimatedWaitTime: Number
  - playersOnline: Number

Features:
  - Real-time queue position updates
  - Animated waiting indicator
  - Cancel queue button
  - Show similar Elo players found
```

### 3. LeaderboardTable.jsx
```javascript
Props:
  - entries: Array[LeaderboardEntry]
  - currentPlayerRank: Number
  - isLoading: Boolean
  - onPlayerClick: Function

Features:
  - Sortable columns (coins, elo, winrate)
  - Pagination
  - Infinite scroll (optional)
  - Highlight current player
  - Show trend arrows (↑ ↓)
```

### 4. SpinWheelUI.jsx
```javascript
Props:
  - isEligible: Boolean
  - onSpin: Function
  - isSpinning: Boolean
  - reward: Object (optional)

Features:
  - Canvas-based wheel animation
  - Particle effects on win
  - Sound effects
  - Coin animation
  - Next spin timer
```

---

## State Management (Zustand)

### gameStore.js
```javascript
{
  // Current match
  matchId: String,
  fen: String,
  moves: Array,
  whiteTime: Number,
  blackTime: Number,
  gameStatus: String, // 'playing' | 'checkmate' | 'resignation' | 'timeout'
  winner: String,
  
  // Players
  playerColor: String, // 'white' | 'black'
  opponentName: String,
  opponentElo: Number,
  
  // Betting
  coinsBet: Number,
  coinsReward: Number,
  
  // Functions
  makeMove: (from, to) → void,
  resign: () → void,
  offerDraw: () → void,
  acceptDraw: () → void,
  updateTimers: (wt, bt) → void,
  setGameStatus: (status) → void,
  resetGame: () → void
}
```

### playerStore.js
```javascript
{
  // User data
  id: String,
  name: String,
  avatar: String,
  email: String,
  
  // Stats
  totalMatches: Number,
  wins: Number,
  losses: Number,
  winRate: Number,
  currentWinStreak: Number,
  
  // Elo
  elo: Number,
  league: String,
  
  // Economy
  coinBalance: Number,
  spinsToday: Number,
  
  // Preferences
  theme: String,
  soundEnabled: Boolean,
  
  // Functions
  fetchPlayer: () → void,
  updateBalance: (amount) → void,
  updateElo: (newElo) → void,
  setPreferences: (prefs) → void
}
```

---

## Socket.IO Events

### Game Events
```javascript
// Client emits
socket.emit('move', {matchId, from, to})
socket.emit('resign', {matchId})
socket.emit('draw_offer', {matchId})

// Server broadcasts
socket.on('opponent_move', (data) => {})
socket.on('timer_update', (data) => {})
socket.on('game_end', (data) => {})
socket.on('check_alert', () => {})
```

### Matchmaking Events
```javascript
// Client → Server
socket.emit('queue_join', {betSize, timeFormat})
socket.emit('queue_leave', {})

// Server → Client
socket.on('player_queued', (data) => {})
socket.on('match_found', (data) => {})
socket.on('queue_update', (data) => {})
```

---

## Backend Services (Node.js)

### Directory Structure

```
backend/src/
├── routes/
│   ├── auth.routes.js
│   ├── players.routes.js
│   ├── matches.routes.js
│   ├── matchmaking.routes.js
│   ├── coins.routes.js
│   ├── leaderboard.routes.js
│   ├── achievements.routes.js
│   ├── social.routes.js
│   ├── tournaments.routes.js
│   └── spin.routes.js
│
├── controllers/
│   ├── authController.js
│   ├── playerController.js
│   ├── matchController.js
│   ├── matchmakingController.js
│   ├── coinController.js
│   ├── leaderboardController.js
│   ├── achievementController.js
│   ├── socialController.js
│   ├── tournamentController.js
│   └── spinController.js
│
├── services/
│   ├── ChessEngine.js
│   ├── MatchmakingService.js
│   ├── EloService.js
│   ├── CoinService.js
│   ├── LeaderboardService.js
│   ├── AchievementService.js
│   ├── NotificationService.js
│   ├── TournamentService.js
│   └── AnalyticsService.js
│
├── models/
│   ├── Player.js
│   ├── Match.js
│   ├── MatchQueue.js
│   ├── CoinTransaction.js
│   ├── Leaderboard.js
│   ├── Achievement.js
│   ├── League.js
│   ├── Tournament.js
│   ├── Challenge.js
│   └── Session.js
│
├── websocket/
│   ├── gameEvents.js
│   ├── matchmakingEvents.js
│   ├── socialEvents.js
│   ├── notificationSystem.js
│   └── connectionManager.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   ├── rateLimiter.js
│   ├── validateRequest.js
│   └── logRequest.js
│
├── utils/
│   ├── errors.js
│   ├── constants.js
│   ├── validators.js
│   ├── logger.js
│   └── helpers.js
│
├── jobs/
│   ├── leaderboardJob.js             # Weekly update
│   ├── tournamentBracketJob.js       # Generate brackets
│   ├── timeoutJob.js                 # Timeout inactive games
│   ├── coinRefundJob.js              # Handle disconnects
│   └── achievementCheckJob.js        # Check achievements
│
├── config/
│   ├── database.js
│   ├── redis.js
│   ├── socket-io.js
│   └── env.js
│
├── tests/
│   ├── services/
│   ├── routes/
│   ├── integration/
│   └── fixtures/
│
├── server.js                         # Entry point
└── app.js                            # Express app
```

---

## Key Backend Services

### ChessEngine.js
```javascript
class ChessEngine {
  constructor() {
    this.game = new Chess()
  }
  
  validateMove(from, to, promotion) → {legal, move}
  getCurrentFEN() → String
  getGameStatus() → {inCheck, inCheckmate, inDraw, ...}
  getMoves(square) → Array[String]
  makeMove(from, to) → {success, error}
  reset() → void
  loadPosition(fen) → void
}
```

### MatchmakingService.js
```javascript
class MatchmakingService {
  async findOpponent(player) → {match, opponent}
  
  searchByElo(playerElo, radius) → Array[Candidates]
  calculateTimeSinceQueued(timestamp) → Number
  expandSearchRadius(currentRadius) → Number
  
  // Used by scheduled job
  async matchmake() → void // Runs every 5 seconds
}
```

### EloService.js
```javascript
class EloService {
  calculateNewRating(player, opponent, result) → {newElo, change}
  
  // Uses K-factor system
  // Protects new players (accelerated gain first 20 matches)
  
  getExpectedScore(playerElo, opponentElo) → Number
  calculateK(player, result) → Number
}
```

### CoinService.js
```javascript
class CoinService {
  async processMatchResult(match, winner, loser)
  async transferCoins(from, to, amount, reason)
  async getBalance(playerId) → Number
  async enforceMinimumBalance(playerId)
  async recordTransaction(transaction)
}
```

### LeaderboardService.js
```javascript
class LeaderboardService {
  async generateWeeklyLeaderboard() → Array[Rankings]
  async getPlayerRank(playerId, period) → {rank, percentile}
  async getLeagueRankings(league) → Array[Rankings]
  
  // Scheduled to run every Friday 00:00 UTC
}
```

---

## Implementation Phases

### Phase 1: MVP (Weeks 1-4)

**Backend:**
- [ ] Player model & auth
- [ ] Basic matchmaking (random or simple Elo sorting)
- [ ] Match creation & move validation
- [ ] Socket.IO setup
- [ ] Coin system basics
- [ ] Match result processing

**Frontend:**
- [ ] Login page
- [ ] Dashboard
- [ ] Chess board
- [ ] Matchmaking queue
- [ ] Game screen
- [ ] Post-game screen
- [ ] Leaderboard (basic)

**Database:**
- [ ] Player collection
- [ ] Match collection
- [ ] Coin transactions
- [ ] Match queue

**Testing:**
- [ ] Unit tests for chess engine
- [ ] Integration tests for matchmaking
- [ ] E2E tests for game flow

### Phase 2: Features (Weeks 5-8)

**Backend:**
- [ ] Elo rating system
- [ ] League system
- [ ] Achievements & badges
- [ ] Social features (challenges)
- [ ] Daily spin wheel
- [ ] Better leaderboards
- [ ] Analytics

**Frontend:**
- [ ] Player profiles
- [ ] Achievements gallery
- [ ] Challenge invites
- [ ] Social features
- [ ] Spin wheel
- [ ] Theme customization
- [ ] Enhanced leaderboard

**New Collections:**
- [ ] Achievements
- [ ] Player achievements
- [ ] Leagues
- [ ] Challenges

### Phase 3: Advanced Features (Weeks 9-12)

**Backend:**
- [ ] Tournament system
- [ ] Tournament bracket generation
- [ ] Advanced analytics dashboard
- [ ] Admin tools
- [ ] Seasonal systems
- [ ] Notification system enhancements

**Frontend:**
- [ ] Tournament UI & brackets
- [ ] Tournament history
- [ ] Advanced stats/graphs
- [ ] Admin dashboard
- [ ] User moderation tools
- [ ] Seasonal rewards screen

**Performance:**
- [ ] Caching layer (Redis)
- [ ] Queue optimization
- [ ] Database indexes
- [ ] CDN for assets

### Phase 4: Launch & Optimization

- [ ] Load testing
- [ ] Security hardening
- [ ] Bug fixes
- [ ] Performance tuning
- [ ] Beta launch to 10% users
- [ ] Gradual rollout
- [ ] Monitoring setup

---

## Development Workflow

### Local Setup
```bash
# Backend
cd backend
npm install
npm run dev              # Starts on :5000

# Frontend
cd frontend
npm install
npm run dev              # Starts on :5173

# MongoDB (local or cloud)
# Redis (local or cloud)
```

### Testing
```bash
# Run tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### Deployment
```bash
# Build
npm run build

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:prod
```

---

## Code Style & Standards

- **JavaScript**: ES2020+
- **Formatting**: Prettier
- **Linting**: ESLint
- **Testing**: Jest + React Testing Library
- **Git**: Conventional commits
- **Documentation**: JSDoc comments

---

## Performance Targets

- First Contentful Paint: < 2s
- Time To Interactive: < 4s
- Match move latency: < 100ms
- API response time: < 200ms
- Database query time: < 50ms
- Leaderboard update: < 10s (weekly job)
