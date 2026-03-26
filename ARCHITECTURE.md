# MyCPE Blitz - System Architecture

## 1. System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     MYCPE Portal (Main App)                     │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              MyCPE Blitz Microservice                    │  │
│  │                                                          │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │           React Frontend (SPA)                     │ │  │
│  │  │  - Game Board UI                                  │ │  │
│  │  │  - Matchmaking Queue                              │ │  │
│  │  │  - Leaderboard                                    │ │  │
│  │  │  - Profile & Stats                                │ │  │
│  │  │  - Achievements                                   │ │  │
│  │  │  - Spin Wheel                                     │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  │                                                          │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │        Real-time Communication Layer               │ │  │
│  │  │  - WebSocket (Socket.IO)                           │ │  │
│  │  │  - Live move updates                               │ │  │
│  │  │  - Game state sync                                 │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  │                                                          │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │        Node.js Backend (Express + Socket.IO)       │ │  │
│  │  │                                                    │ │  │
│  │  │  ┌──────────────────────────────────────────────┐ │ │  │
│  │  │  │  API Routes                                  │ │ │  │
│  │  │  │  - Player Management                         │ │ │  │
│  │  │  │  - Match Management                          │ │ │  │
│  │  │  │  - Coin Transactions                         │ │ │  │
│  │  │  │  - Leaderboard                               │ │ │  │
│  │  │  │  - Matchmaking                               │ │ │  │
│  │  │  │  - Social (Invites, etc)                     │ │ │  │
│  │  │  └──────────────────────────────────────────────┘ │ │  │
│  │  │                                                    │ │  │
│  │  │  ┌──────────────────────────────────────────────┐ │ │  │
│  │  │  │  Game Engine Services                        │ │ │  │
│  │  │  │  - Chess rules validation (chess.js)        │ │ │  │
│  │  │  │  - Game state management                     │ │ │  │
│  │  │  │  - Win/loss calculation                      │ │ │  │
│  │  │  └──────────────────────────────────────────────┘ │ │  │
│  │  │                                                    │ │  │
│  │  │  ┌──────────────────────────────────────────────┐ │ │  │
│  │  │  │  Business Logic Services                     │ │ │  │
│  │  │  │  - Matchmaking algorithm                     │ │ │  │
│  │  │  │  - Elo rating system                         │ │ │  │
│  │  │  │  - Coin economy                              │ │ │  │
│  │  │  │  - Leaderboard calculation                   │ │ │  │
│  │  │  │  - Achievement system                        │ │ │  │
│  │  │  └──────────────────────────────────────────────┘ │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
         ↓                              ↓                    ↓
    ┌─────────┐                 ┌───────────────┐    ┌─────────────┐
    │ MongoDB │                 │ Redis Cache   │    │ Auth Service│
    │ Database│                 │ (Queues, etc) │    │ (MYCPE SSO) │
    └─────────┘                 └───────────────┘    └─────────────┘
```

---

## 2. Component Architecture

### 2.1 Frontend (React + Vite)

```
/src
  /components
    /Game
      - ChessBoard.jsx (Main board UI)
      - GameControls.jsx (Timer, actions)
      - MoveHistory.jsx
    /Matchmaking
      - MatchmakingQueue.jsx (Find opponent)
      - BetSelector.jsx
      - PlayersOnline.jsx
    /Social
      - ChallengeCard.jsx
      - InviteModal.jsx
      - ProfileCard.jsx
    /Rewards
      - SpinWheel.jsx
      - AchievementBadge.jsx
    /Leaderboard
      - LeaderboardTable.jsx
      - WeeklyStats.jsx
    /Profile
      - PlayerStats.jsx
      - Achievement Gallery
      - EloChart.jsx
  /pages
    - Dashboard.jsx
    - Play.jsx
    - Leaderboard.jsx
    - Profile.jsx
    - Tournament.jsx
  /services
    - socketService.js (Socket.IO client)
    - apiService.js (REST API)
    - gameEngine.js (Chess logic)
  /store
    - playerStore.js (Zustand/Redux)
    - gameStore.js
    - matchmakingStore.js
  /hooks
    - useGame.js
    - useMatchmaking.js
    - useLeaderboard.js
    - useSocket.js
```

### 2.2 Backend (Node.js + Express)

```
/backend/src
  /routes
    - auth.js (Login, SSO)
    - players.js (Profile, stats)
    - matches.js (Game management)
    - matchmaking.js (Queue, pairing)
    - coins.js (Transactions)
    - leaderboard.js (Rankings)
    - achievements.js (Badges)
    - social.js (Invites, challenges)
    - tournaments.js
  /controllers
    - playerController.js
    - matchController.js
    - matchmakingController.js
    - coinController.js
    - leaderboardController.js
    - achievementController.js
  /services
    - ChessEngine.js (Move validation, game state)
    - MatchmakingService.js (Elo pairing algorithm)
    - EloService.js (Rating calculations)
    - CoinService.js (Economy logic)
    - LeaderboardService.js (Ranking)
    - AchievementService.js (Badge logic)
    - NotificationService.js (Events)
  /models
    - Player.js
    - Match.js
    - MatchQueue.js
    - CoinTransaction.js
    - Leaderboard.js
    - Achievement.js
    - League.js
    - Tournament.js
  /websocket
    - gameEvents.js (Socket.IO handlers)
    - matchmakingEvents.js
    - socialEvents.js
  /middleware
    - authMiddleware.js
    - errorHandler.js
    - rateLimiter.js
  /utils
    - errorCodes.js
    - constants.js
    - validators.js
```

---

## 3. Data Flow

### 3.1 Match Flow

```
1. Player A initiates matchmaking (100-coin bet)
   └─→ POST /api/matchmaking/queue
       └─→ Redis Queue stores {playerId, elo, bet, timestamp}

2. Backend matchmaking service runs every 5 seconds
   └─→ MatchmakingService.findOpponent(playerA)
       └─→ Searches Redis for nearest Elo within range
       └─→ Finds Player B (similar Elo, same bet)

3. Match created, both players notified via Socket.IO
   └─→ io.emit("match_found", {matchId, opponent, bet})
   └─→ Both clients transition to game board

4. Real-time chess game
   └─→ Player A makes move
   └─→ Socket.emit("move", {from, to, matchId})
   └─→ Backend validates move (chess.js)
   └─→ Backend broadcasts move to Player B
   └─→ Socket.on("move", updateBoard)

5. Game ends (checkmate, resignation, timeout)
   └─→ Winner determined
   └─→ EloService.calculateNewRating()
   └─→ CoinService.updateBalance()
   └─→ AchievementService.checkAchievements()
   └─→ Match record saved to MongoDB
   └─→ Players notified with results

6. Both players see post-game screen
   └─→ Stats, coins gained/lost, Elo change
   └─→ Option to rematch or return to dashboard
```

---

## 4. Real-time Communication (WebSocket)

### 4.1 Socket.IO Events

**Game Events:**
```
Client → Server:
  - move: {matchId, from, to}
  - resign: {matchId}
  - draw_offer: {matchId}
  - accept_draw: {matchId}
  - rematch_request: {playerId}

Server → Client:
  - opponent_move: {from, to}
  - game_end: {winner, loser, reason}
  - timer_update: {whiteTime, blackTime}
  - check_alert: {}
  - checkmate_alert: {}
```

**Matchmaking Events:**
```
Client → Server:
  - queue_join: {bet, timeFormat}
  - queue_leave: {}

Server → Client:
  - player_queued: {position, playersAhead}
  - queue_update: {playersOnline}
  - match_found: {matchId, opponent, elo}
  - match_timeout: {}
```

**Social Events:**
```
Client → Server:
  - send_challenge: {toPlayerId, bet}
  - accept_challenge: {challengeId}
  - reject_challenge: {challengeId}

Server → Client:
  - challenge_received: {from, bet}
  - challenge_accepted: {matchId}
  - challenge_expired: {challengeId}
```

---

## 5. Database Schema

See `DATABASE_SCHEMA.md` for complete MongoDB collections.

Key collections:
- **players**: User profiles, stats, Elo, balance
- **matches**: Game records, moves, results
- **match_queue**: Matchmaking queue
- **coin_transactions**: Coin ledger
- **leaderboards**: Weekly rankings
- **achievements**: Badge data
- **tournaments**: Tournament info & brackets

---

## 6. API Architecture

See `API_SPEC.md` for complete REST endpoints.

Key endpoints:
- `GET/POST /api/players` - Player management
- `POST /api/matchmaking/queue` - Join queue
- `GET /api/matches/{id}` - Match details
- `GET /api/leaderboard` - Rankings
- `POST /api/coins/transfer` - Transactions
- `GET /api/achievements` - Badges

---

## 7. Scalability Considerations

### 7.1 High Traffic Challenges
- **Concurrent users**: Redis for session management
- **Matchmaking latency**: Sharded Redis queue
- **Real-time sync**: Socket.IO with clustering
- **Database load**: Read replicas, caching

### 7.2 Infrastructure
```
Load Balancer (Nginx)
      ↓
├─ Node.js instances (clustered)
├─ Redis (session + queue)
├─ MongoDB (main DB)
├─ MongoDB Replicas (read-only)
└─ CDN (static assets)
```

---

## 8. Security Architecture

### 8.1 Authentication
- SSO integration with MYCPE portal
- JWT tokens (short-lived, 1 hour)
- Refresh tokens (long-lived, 30 days)

### 8.2 Authorization
- Role-based access control (RBAC)
- Match-level permissions (only participants can view)
- Admin dashboard restricted

### 8.3 Data Protection
- HTTPS/TLS encryption
- Password hashing (bcrypt)
- Rate limiting (100 req/min per user)
- Input validation & sanitization

### 8.4 Game Integrity
- Server-side move validation
- No client-side game logic
- Move verification before acceptance
- Timeout enforcement

---

## 9. Monitoring & Analytics

### 9.1 Metrics Collection
- Application Performance Monitoring (APM)
- Game analytics (moves, duration, outcomes)
- User journey tracking
- Error tracking (Sentry)

### 9.2 Dashboards
- Real-time DAU/WAU
- Coin flow visualization
- Matchmaking queue depth
- Elo distribution
- Match completion rates

---

## 10. Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Socket.IO Client, Zustand |
| Backend | Node.js 18+, Express, Socket.IO |
| Database | MongoDB, Redis |
| Game Logic | chess.js (validation) |
| Real-time | Socket.IO |
| Auth | JWT + MYCPE SSO |
| Hosting | AWS/Azure (containers) |
| Monitoring | Datadog/New Relic |
| CDN | CloudFlare |

---

## 11. Development Workflow

### Phase 1: MVP
```
Week 1-2: Backend setup
- Player management
- Auth integration
- Basic match creation
- Coin system

Week 3: Frontend integration
- Game board
- Basic matchmaking (random)
- Real-time sync

Week 4: Testing & launch
- Load testing
- Beta with small group
- Launch to all users
```

### Phase 2: Enhanced features
```
Week 5-8:
- Elo system
- Leagues
- Achievements
- Better matchmaking
```

### Phase 3: Social & tournaments
```
Week 9-12:
- Tournament system
- Invite challenges
- Social features
- Analytics
```

---

## 12. Disaster Recovery

### 12.1 Backup Strategy
- MongoDB daily backups
- Redis persistence (RDB)
- Point-in-time recovery
- 30-day backup retention

### 12.2 Failover
- Database replication
- Load balancer failover
- Session recovery
- Match state restoration

---

## 13. Cost Optimization

- Horizontal scaling (add servers)
- Database indexing
- Redis caching for leaderboards
- CDN for static assets
- Scheduled job optimization
