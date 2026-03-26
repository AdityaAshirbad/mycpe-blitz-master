# MyCPE Blitz - Database Schema (MongoDB)

## Collections

### 1. Players Collection

```javascript
{
  _id: ObjectId,
  
  // Basic Info
  employeeId: String (unique, from MYCPE SSO),
  name: String,
  email: String (unique),
  avatar: String (URL),
  department: String,
  joinDate: Date,
  lastLoginDate: Date,
  
  // Game Stats
  stats: {
    totalMatches: Number (default: 0),
    wins: Number (default: 0),
    losses: Number (default: 0),
    draws: Number (default: 0),
    winRate: Number (0-100), // Calculated: (wins / totalMatches) * 100
    currentWinStreak: Number (default: 0),
    bestWinStreak: Number (default: 0),
    averageMatchDuration: Number (seconds),
    totalPlayTime: Number (seconds)
  },
  
  // Rating System
  elo: {
    rating: Number (default: 1000),
    deviation: Number (default: 200, Glicko system),
    lastMatchDate: Date
  },
  
  // League/Tier
  league: {
    currentTier: String (enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond']),
    promotionProgress: Number (0-100),
    seasonRank: Number,
    lastPromotion: Date,
    promotionStreak: Number
  },
  
  // Coin Economy
  coins: {
    balance: Number (default: 5000),
    lifetime: Number (total earned),
    spent: Number (total spent),
    lastSpinDate: Date,
    spinCount: Number (daily counter)
  },
  
  // Achievements
  achievements: [
    {
      achievementId: String,
      unlockedDate: Date,
      progress: Number (0-100)
    }
  ],
  
  // Preferences
  preferences: {
    boardTheme: String (default: 'classic'),
    pieceStyle: String (default: 'standard'),
    soundEnabled: Boolean (default: true),
    notificationsEnabled: Boolean (default: true),
    preferredBetSize: Number (default: 100)
  },
  
  // Social
  friends: [ObjectId], // References to other Players
  blockedPlayers: [ObjectId],
  
  // Account Status
  isActive: Boolean (default: true),
  isSuspended: Boolean (default: false),
  suspensionReason: String,
  suspensionUntil: Date,
  
  metadata: {
    ipAddress: String,
    userAgent: String,
    timezone: String
  },
  
  createdAt: Date (auto),
  updatedAt: Date (auto)
}

// Indexes
db.players.createIndex({ employeeId: 1 }, { unique: true })
db.players.createIndex({ email: 1 }, { unique: true })
db.players.createIndex({ 'elo.rating': -1 })
db.players.createIndex({ 'league.currentTier': 1 })
db.players.createIndex({ 'stats.wins': -1 })
db.players.createIndex({ 'coins.balance': -1 })
db.players.createIndex({ createdAt: -1 })
```

---

### 2. Matches Collection

```javascript
{
  _id: ObjectId,
  
  // Match Metadata
  matchType: String (enum: ['ranked', 'casual', 'tournament', 'challenge']),
  timeFormat: String (enum: ['blitz3+0', 'blitz5+0', 'rapid10+0']),
  startDate: Date,
  endDate: Date,
  duration: Number (milliseconds),
  
  // Players
  players: {
    white: {
      playerId: ObjectId (ref: Players),
      initialElo: Number,
      finalElo: Number,
      eloChange: Number (can be negative),
      result: String (enum: ['win', 'loss', 'draw']),
      coinsBet: Number,
      coinsWon: Number,
      moves: NumberI,
      timeUsed: Number (seconds),
      resignation: Boolean (default: false),
      disconnected: Boolean (default: false)
    },
    black: {
      // Same structure as white
    }
  },
  
  // Game State
  game: {
    initialFEN: String,
    finalFEN: String,
    moves: [
      {
        moveNumber: Number,
        notation: String (e.g., "e2-e4"),
        san: String (Standard Algebraic Notation),
        fen: String (position after move),
        timestamp: Date
      }
    ],
    endReason: String (enum: ['checkmate', 'resignation', 'timeout', 'disconnect', 'draw_agreement', 'insufficient_material', 'threefold_repetition', '50_move_rule']),
    winner: String (enum: ['white', 'black', 'draw']),
    winnerPlayerId: ObjectId (null if draw)
  },
  
  // Betting
  betting: {
    whiteCoinsStaked: Number,
    blackCoinsStaked: Number,
    totalPot: Number,
    winnersReward: Number,
    platformFee: Number (e.g., 5% of pot)
  },
  
  // Matchmaking Info
  matchmakingData: {
    eloDiff: Number,
    queueWaitTime: Number (seconds),
    matchFound: Date
  },
  
  // Quality Metrics
  quality: {
    moveAccuracy: Number (0-100, calculated from engine eval),
    avgDepth: Number,
    principalVariationAccuracy: Number
  },
  
  createdAt: Date (auto),
  updatedAt: Date (auto)
}

// Indexes
db.matches.createIndex({ createdAt: -1 })
db.matches.createIndex({ 'players.white.playerId': 1 })
db.matches.createIndex({ 'players.black.playerId': 1 })
db.matches.createIndex({ matchType: 1 })
db.matches.createIndex({ endDate: -1 })
db.matches.createIndex({ 'game.winner': 1 })
```

---

### 3. MatchQueue Collection

```javascript
{
  _id: ObjectId,
  
  playerId: ObjectId (ref: Players),
  playerName: String,
  elo: Number,
  preferredBet: Number (100, 250, 500, 750, 1000),
  timeFormat: String,
  
  // Queue Info
  queuedAt: Date,
  searchRadius: Number (initial: 200, expands over time),
  lastSearchExpansion: Date,
  
  // Player Status
  isOnline: Boolean,
  lastHeartbeat: Date,
  
  // Priority
  priority: Number (higher = earlier match)
  
  createdAt: Date
}

// Indexes
db.match_queue.createIndex({ queuedAt: 1 }) // TTL index: 5 minutes
db.match_queue.createIndex({ elo: 1 })
db.match_queue.createIndex({ preferredBet: 1 })
db.match_queue.createIndex({ playerId: 1 }, { unique: true })
```

---

### 4. CoinTransactions Collection

```javascript
{
  _id: ObjectId,
  
  playerId: ObjectId (ref: Players),
  
  transactionType: String (enum: [
    'match_win',
    'match_loss',
    'daily_spin',
    'initial_allocation',
    'tournament_reward',
    'bonus',
    'admin_adjustment',
    'achievement_reward',
    'streak_bonus'
  ]),
  
  amount: Number (can be negative),
  
  // Reference to related data
  matchId: ObjectId (optional, ref: Matches),
  achievementId: ObjectId (optional),
  spinWheelId: ObjectId (optional),
  
  // Balance Tracking
  balanceBefore: Number,
  balanceAfter: Number,
  
  description: String,
  
  metadata: {
    opponent: String (optional),
    betSize: Number (optional),
    reason: String
  },
  
  createdAt: Date (auto)
}

// Indexes
db.coin_transactions.createIndex({ playerId: 1, createdAt: -1 })
db.coin_transactions.createIndex({ transactionType: 1 })
db.coin_transactions.createIndex({ createdAt: -1 })
db.coin_transactions.createIndex({ matchId: 1 })
```

---

### 5. SpinWheelEvents Collection

```javascript
{
  _id: ObjectId,
  
  playerId: ObjectId (ref: Players),
  
  reward: {
    tier: String (enum: ['common', 'uncommon', 'rare', 'legendary']),
    coinsEarned: Number,
    badge: String (optional),
    multiplier: Number (1x, 1.5x, 2x)
  },
  
  spinDate: Date,
  nextEligibleSpin: Date (24 hours later),
  
  createdAt: Date
}

// Indexes
db.spin_wheel_events.createIndex({ playerId: 1, spinDate: -1 })
db.spin_wheel_events.createIndex({ spinDate: -1 })
db.spin_wheel_events.createIndex({ nextEligibleSpin: 1 }) // TTL index
```

---

### 6. Leaderboards Collection

```javascript
{
  _id: ObjectId,
  
  season: Number (e.g., 1, 2, 3),
  seasonStart: Date,
  seasonEnd: Date,
  leaderboardType: String (enum: ['weekly', 'monthly', 'seasonal']),
  
  rankings: [
    {
      rank: Number,
      playerId: ObjectId (ref: Players),
      playerName: String,
      
      stats: {
        coinsEarned: Number,
        gamesPlayed: Number,
        wins: Number,
        winRate: Number,
        winStreak: Number,
        eloRating: Number
      },
      
      rewards: {
        coinsRewarded: Number,
        badgesUnlocked: [String]
      }
    }
  ],
  
  metadata: {
    totalParticipants: Number,
    totalMatches: Number,
    totalCoinsCirculated: Number
  },
  
  createdAt: Date
}

// Indexes
db.leaderboards.createIndex({ leaderboardType: 1, seasonStart: -1 })
db.leaderboards.createIndex({ 'rankings.playerId': 1 })
```

---

### 7. Achievements Collection

```javascript
{
  _id: ObjectId,
  
  achievementType: String,
  name: String (e.g., "5 Win Streak"),
  description: String,
  icon: String (URL or emoji),
  
  // Criteria
  criteria: {
    type: String (enum: [
      'win_streak',
      'checkmate_speed',
      'defeat_higher_rated',
      'high_roller',
      'first_victory',
      'undefeated_series',
      'games_played',
      'tier_promotion',
      'tournament_winner',
      'challenge_accepted'
    ]),
    threshold: Number (e.g., 5 for 5-win streak),
    timeWindow: String (e.g., "consecutive", "weekly", "all_time")
  },
  
  // Reward
  reward: {
    coinsBonus: Number,
    rarity: String (enum: ['common', 'uncommon', 'rare', 'legendary']),
    badgeColor: String,
    specialEffect: String (optional, e.g., "profile_highlight")
  },
  
  // Stats
  unlockedCount: Number,
  
  isActive: Boolean (default: true),
  
  createdAt: Date
}

// Indexes
db.achievements.createIndex({ achievementType: 1 })
db.achievements.createIndex({ 'criteria.type': 1 })
```

---

### 8. PlayerAchievements Collection

```javascript
{
  _id: ObjectId,
  
  playerId: ObjectId (ref: Players),
  achievementId: ObjectId (ref: Achievements),
  
  unlockedDate: Date,
  displayOnProfile: Boolean (default: true),
  
  progress: {
    current: Number (e.g., 3 out of 5 wins),
    target: Number (e.g., 5 wins)
  },
  
  createdAt: Date,
  updatedAt: Date
}

// Indexes
db.player_achievements.createIndex({ playerId: 1 })
db.player_achievements.createIndex({ achievementId: 1 })
db.player_achievements.createIndex({ unlockedDate: -1 })
```

---

### 9. Leagues Collection

```javascript
{
  _id: ObjectId,
  
  tier: String (enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond']),
  
  // Elo Range
  eloMin: Number,
  eloMax: Number,
  
  // Benefits
  benefits: {
    coinsMultiplier: Number (1.0, 1.1, 1.25, 1.5, 2.0),
    matchmakingPriority: Number (higher = priority),
    specialBadge: String
  },
  
  // Stats
  playerCount: Number,
  
  createdAt: Date
}

// Indexes
db.leagues.createIndex({ tier: 1 }, { unique: true })
db.leagues.createIndex({ eloMin: 1, eloMax: 1 })
```

---

### 10. Tournaments Collection

```javascript
{
  _id: ObjectId,
  
  name: String,
  description: String,
  
  // Schedule
  startDate: Date,
  endDate: Date,
  registrationDeadline: Date,
  
  // Format
  format: String (enum: ['knockout', 'round_robin', 'swiss']),
  maxPlayers: Number,
  timeFormat: String,
  
  // Entry
  entryFee: Number (coins),
  
  // Participants
  participants: [
    {
      playerId: ObjectId (ref: Players),
      dateJoined: Date,
      seed: Number (initial ranking)
    }
  ],
  
  // Bracket
  bracket: {
    rounds: [
      {
        roundNumber: Number,
        matches: [
          {
            matchId: ObjectId,
            player1: ObjectId,
            player2: ObjectId,
            winner: ObjectId,
            scheduledTime: Date
          }
        ]
      }
    ]
  },
  
  // Results
  winner: ObjectId,
  finalResults: [
    {
      rank: Number,
      playerId: ObjectId,
      coinsReward: Number
    }
  ],
  
  status: String (enum: ['registration_open', 'in_progress', 'completed', 'cancelled']),
  
  createdAt: Date,
  updatedAt: Date
}

// Indexes
db.tournaments.createIndex({ startDate: -1 })
db.tournaments.createIndex({ status: 1 })
db.tournaments.createIndex({ 'participants.playerId': 1 })
```

---

### 11. Challenges Collection

```javascript
{
  _id: ObjectId,
  
  // Players
  from: ObjectId (ref: Players - challenger),
  to: ObjectId (ref: Players - challenged),
  
  // Challenge Details
  betSize: Number,
  timeFormat: String,
  
  // Status
  status: String (enum: ['pending', 'accepted', 'rejected', 'expired', 'in_progress', 'completed']),
  
  // Timestamps
  sentDate: Date,
  expiryDate: Date (24 hours from sentDate),
  respondedDate: Date (optional),
  completedDate: Date (optional),
  
  // Related Match
  matchId: ObjectId (optional, ref: Matches),
  
  // Reason/Message
  message: String (optional)
  
  createdAt: Date
}

// Indexes
db.challenges.createIndex({ from: 1, createdAt: -1 })
db.challenges.createIndex({ to: 1, status: 1 })
db.challenges.createIndex({ expiryDate: 1 }) // TTL index: 24 hours
db.challenges.createIndex({ matchId: 1 })
```

---

### 12. PlayerSessions Collection

```javascript
{
  _id: ObjectId,
  
  playerId: ObjectId (ref: Players),
  sessionToken: String (JWT),
  
  // Session Info
  loginDate: Date,
  lastActivityDate: Date,
  expiryDate: Date (1 hour from loginDate),
  
  // Device Info
  ipAddress: String,
  userAgent: String,
  deviceType: String (enum: ['desktop', 'mobile', 'tablet']),
  
  // Status
  isActive: Boolean,
  
  createdAt: Date
}

// Indexes
db.player_sessions.createIndex({ playerId: 1, isActive: 1 })
db.player_sessions.createIndex({ sessionToken: 1 }, { unique: true })
db.player_sessions.createIndex({ expiryDate: 1 }) // TTL index: 1 hour
```

---

## Summary of Collections

| Collection | Purpose | Records | Size |
|-----------|---------|---------|------|
| players | User profiles & stats | ~10K-100K | ~1-2 GB |
| matches | Game records | ~1M+/month | ~10-20 GB |
| match_queue | Active queue | ~1K peak | ~10 MB |
| coin_transactions | Ledger | ~10M | ~2 GB |
| spin_wheel_events | Daily rewards | ~100K/month | ~500 MB |
| leaderboards | Rankings | ~1K/season | ~100 MB |
| achievements | Badge definitions | ~50 | ~1 MB |
| player_achievements | Unlocked badges | ~500K | ~500 MB |
| leagues | Tier definitions | 5 | ~10 KB |
| tournaments | Events | ~100/month | ~100 MB |
| challenges | Direct invites | ~50K/month | ~100 MB |
| player_sessions | Active sessions | ~10K peak | ~100 MB |

---

## Indexing Strategy

### Hot Queries (Priority 1)
- Player profile lookup by ID
- Leaderboard rankings
- Match history by player
- Coin balance lookup

### Warm Queries (Priority 2)
- Matchmaking queue searches
- Recent matches list
- Achievement progress
- Tournament brackets

### Cold Queries (Priority 3)
- Historical analytics
- Seasonal reports
- Aggregate statistics

---

## Data Retention Policy

- **Matches**: Keep all (game history important)
- **Transactions**: Keep all (audit trail)
- **Sessions**: Archive after 90 days
- **Temporary queues**: Auto-expire after 5 minutes
- **Spin wheel events**: Keep for 1 year
- **Leaderboards**: Archive previous seasons
