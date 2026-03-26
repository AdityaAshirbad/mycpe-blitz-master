# MyCPE Blitz - REST API Specification

## Base URL
```
https://api.mycpe.com/blitz/v1
```

## Authentication
All endpoints (except `/auth/login`) require:
```
Header: Authorization: Bearer {JWT_TOKEN}
```

---

## 1. Authentication Endpoints

### 1.1 Login / SSO
```
POST /auth/login

Request:
{
  "employeeId": "EMP001",
  "token": "sso_token_from_mycpe",
  "deviceInfo": {
    "platform": "web",
    "userAgent": "...",
    "ip": "..."
  }
}

Response (200):
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@mycpe.com",
    "avatar": "https://...",
    "elo": 1250,
    "coins": 4850,
    "league": "Silver"
  },
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": 3600
}

Error (401):
{
  "success": false,
  "error": "Invalid credentials"
}
```

### 1.2 Refresh Token
```
POST /auth/refresh

Request:
{
  "refreshToken": "eyJhbGc..."
}

Response (200):
{
  "success": true,
  "token": "eyJhbGc...",
  "expiresIn": 3600
}
```

### 1.3 Logout
```
POST /auth/logout

Response (200):
{
  "success": true
}
```

---

## 2. Player Endpoints

### 2.1 Get Player Profile
```
GET /players/{playerId}

Response (200):
{
  "success": true,
  "player": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@mycpe.com",
    "avatar": "https://...",
    "department": "Engineering",
    "joinDate": "2024-01-15T00:00:00Z",
    
    "stats": {
      "totalMatches": 256,
      "wins": 145,
      "losses": 100,
      "draws": 11,
      "winRate": 56.64,
      "currentWinStreak": 7,
      "bestWinStreak": 15,
      "averageMatchDuration": 420,
      "totalPlayTime": 107520
    },
    
    "elo": {
      "rating": 1350,
      "deviation": 50
    },
    
    "league": {
      "currentTier": "Gold",
      "promotionProgress": 75,
      "seasonRank": 42
    },
    
    "coins": {
      "balance": 8750,
      "lifetime": 250000,
      "lastSpinDate": "2024-03-24T12:00:00Z"
    },
    
    "achievements": [
      {
        "id": "5_win_streak",
        "name": "5 Win Streak",
        "unlockedDate": "2024-02-10T00:00:00Z"
      }
    ],
    
    "recentMatches": [
      {
        "matchId": "...",
        "opponent": "Jane Smith",
        "result": "win",
        "eloChange": +32,
        "coinChange": +500,
        "date": "2024-03-24T10:30:00Z"
      }
    ]
  }
}
```

### 2.2 Get Current Player (Self)
```
GET /players/me

Response: (Same as 2.1)
```

### 2.3 Update Player Preferences
```
PUT /players/me/preferences

Request:
{
  "boardTheme": "dark",
  "pieceStyle": "carved",
  "soundEnabled": false,
  "notificationsEnabled": true,
  "preferredBetSize": 250
}

Response (200):
{
  "success": true,
  "preferences": {...}
}
```

### 2.4 Get Player Stats & History
```
GET /players/{playerId}/stats?period=week&limit=50

Query Params:
- period: 'day' | 'week' | 'month' | 'all' (default: 'month')
- limit: 1-100 (default: 50)
- offset: pagination

Response (200):
{
  "success": true,
  "stats": {
    "period": "week",
    "matchesPlayed": 12,
    "wins": 8,
    "losses": 3,
    "draws": 1,
    "coinBalance": 8750,
    "coinsEarned": +2500,
    "coinsSpent": -1200,
    "eloChange": +85,
    "newAchievements": 2
  },
  "matches": [
    {
      "matchId": "...",
      "date": "2024-03-24T10:30:00Z",
      "opponent": "Jane Smith",
      "result": "win",
      "duration": 420,
      "moves": 42,
      "eloChange": +32,
      "coinChange": +500
    }
  ]
}
```

---

## 3. Matchmaking Endpoints

### 3.1 Join Matchmaking Queue
```
POST /matchmaking/queue

Request:
{
  "betSize": 250,
  "timeFormat": "blitz5+0"
}

Response (200):
{
  "success": true,
  "queueId": "queue_123...",
  "position": 3,
  "playersAhead": 2,
  "playersOnline": 127,
  "estimatedWaitTime": 45,
  "message": "Looking for opponent..."
}
```

### 3.2 Leave Queue
```
DELETE /matchmaking/queue

Response (200):
{
  "success": true,
  "message": "Left queue"
}
```

### 3.3 Get Queue Status
```
GET /matchmaking/queue/status

Response (200):
{
  "success": true,
  "inQueue": true,
  "position": 3,
  "playersAhead": 2,
  "playersOnline": 127,
  "estimatedWaitTime": 45
}
```

### 3.4 Get Matchmaking Stats
```
GET /matchmaking/stats

Response (200):
{
  "success": true,
  "stats": {
    "totalPlayersOnline": 450,
    "playersInQueue": 120,
    "averageWaitTime": 35,
    "matchesPerHour": 850,
    "eloDiagram": {
      "under800": 45,
      "800-1100": 150,
      "1100-1400": 180,
      "1400-1700": 65,
      "over1700": 10
    }
  }
}
```

---

## 4. Match Endpoints

### 4.1 Create Manual Match (Challenge Friend)
```
POST /matches/create

Request:
{
  "opponentId": "507f1f77bcf86cd799439012",
  "betSize": 500,
  "timeFormat": "blitz5+0",
  "message": "Want to play a quick game?"
}

Response (200):
{
  "success": true,
  "matchId": "match_507f...",
  "roomCode": "ABCD1234",
  "status": "waiting_for_opponent"
}
```

### 4.2 Get Match Details
```
GET /matches/{matchId}

Response (200):
{
  "success": true,
  "match": {
    "matchId": "match_507f...",
    "matchType": "ranked",
    "timeFormat": "blitz5+0",
    "status": "in_progress",
    "startTime": "2024-03-24T10:30:00Z",
    
    "players": {
      "white": {
        "playerId": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "elo": 1350,
        "coinsBet": 250,
        "timeRemaining": 298,
        "moves": 12
      },
      "black": {
        "playerId": "507f1f77bcf86cd799439012",
        "name": "Jane Smith",
        "elo": 1320,
        "coinsBet": 250,
        "timeRemaining": 315,
        "moves": 11
      }
    },
    
    "game": {
      "currentFEN": "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
      "moves": [
        { "move": "e2-e4", "san": "e4", "timestamp": "2024-03-24T10:30:15Z" },
        { "move": "c7-c5", "san": "c5", "timestamp": "2024-03-24T10:30:45Z" }
      ],
      "lastMove": "c7-c5",
      "inCheck": false
    }
  }
}
```

### 4.3 Make Move
```
POST /matches/{matchId}/move

Request:
{
  "from": "e2",
  "to": "e4",
  "promotion": null
}

Response (200):
{
  "success": true,
  "move": {
    "from": "e2",
    "to": "e4",
    "san": "e4",
    "legalMove": true
  },
  "gameState": {
    "currentFEN": "...",
    "whiteTimeRemaining": 298,
    "blackTimeRemaining": 315,
    "inCheck": false,
    "gameEnded": false
  }
}

Error (400):
{
  "success": false,
  "error": "Invalid move"
}
```

### 4.4 Resign Match
```
POST /matches/{matchId}/resign

Response (200):
{
  "success": true,
  "result": "opponent_wins",
  "coinsTransferred": 250
}
```

### 4.5 Offer Draw
```
POST /matches/{matchId}/draw_offer

Response (200):
{
  "success": true,
  "status": "draw_offered",
  "message": "Draw offer sent to opponent"
}
```

### 4.6 Accept/Reject Draw
```
POST /matches/{matchId}/draw_response

Request:
{
  "action": "accept" | "reject"
}

Response (200):
{
  "success": true,
  "drawAccepted": true | false
}
```

### 4.7 Get Match History
```
GET /players/{playerId}/matches?limit=50&offset=0&filter=all

Query Params:
- limit: 1-100 (default: 50)
- offset: pagination
- filter: 'all' | 'wins' | 'losses' | 'draws' | 'ranked' | 'casual'

Response (200):
{
  "success": true,
  "total": 256,
  "matches": [
    {
      "matchId": "match_507f...",
      "date": "2024-03-24T10:30:00Z",
      "opponent": {
        "id": "507f1f77bcf86cd799439012",
        "name": "Jane Smith",
        "elo": 1320
      },
      "result": "win",
      "duration": 420,
      "moves": 42,
      "eloChange": +32,
      "coinChange": +250
    }
  ]
}
```

---

## 5. Coin Endpoints

### 5.1 Get Coin Balance
```
GET /coins/balance

Response (200):
{
  "success": true,
  "balance": 8750,
  "lifetime": 250000,
  "spent": 241250,
  "currency": "VirtualCoins"
}
```

### 5.2 Get Coin History
```
GET /coins/history?limit=50&offset=0&type=all

Query Params:
- limit: 1-100 (default: 50)
- type: 'all' | 'match_win' | 'match_loss' | 'daily_spin' | 'bonus' | 'admin'

Response (200):
{
  "success": true,
  "total": 500,
  "transactions": [
    {
      "transactionId": "txn_123...",
      "date": "2024-03-24T10:30:00Z",
      "type": "match_win",
      "amount": +500,
      "description": "Won match vs Jane Smith",
      "balanceAfter": 8750,
      "referenceId": "match_507f..."
    }
  ]
}
```

---

## 6. Leaderboard Endpoints

### 6.1 Get Global Leaderboard
```
GET /leaderboard/global?limit=100&period=week&page=1

Query Params:
- limit: 10-500 (default: 100)
- period: 'week' | 'month' | 'all_time'
- page: pagination
- sortBy: 'coins' | 'wins' | 'elo' | 'winstreak'

Response (200):
{
  "success": true,
  "period": "week",
  "totalPlayers": 5420,
  "leaderboard": [
    {
      "rank": 1,
      "player": {
        "id": "507f1f77bcf86cd799439010",
        "name": "Alice Johnson",
        "elo": 1650,
        "avatar": "https://..."
      },
      "stats": {
        "coinsEarned": 12500,
        "gamesPlayed": 45,
        "wins": 38,
        "winRate": 84.44,
        "winStreak": 12,
        "eloRating": 1650
      }
    },
    {
      "rank": 2,
      "player": {
        "id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "elo": 1350,
        "avatar": "https://..."
      },
      "stats": {...}
    }
  ]
}
```

### 6.2 Get Personal Rank
```
GET /leaderboard/me?period=week

Response (200):
{
  "success": true,
  "rank": 42,
  "totalPlayers": 5420,
  "percentile": 99.2,
  "stats": {
    "coinsEarned": 8750,
    "gamesPlayed": 35,
    "wins": 24,
    "winRate": 68.57
  },
  "nearbyPlayers": [
    { "rank": 41, "name": "Player Name", "coins": 8800 },
    { "rank": 43, "name": "Player Name", "coins": 8700 }
  ]
}
```

### 6.3 Get League Rankings
```
GET /leaderboard/league/{league}?limit=50

Query Params:
- league: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond'
- limit: 10-500

Response: (Similar to 6.1)
```

---

## 7. Achievements Endpoints

### 7.1 Get All Achievements
```
GET /achievements

Response (200):
{
  "success": true,
  "achievements": [
    {
      "id": "5_win_streak",
      "name": "5 Win Streak",
      "description": "Win 5 consecutive matches",
      "icon": "🔥",
      "rarity": "uncommon",
      "reward": {
        "coins": 100,
        "badge": true
      },
      "unlockedCount": 1245,
      "progress": {
        "current": 5,
        "target": 5,
        "unlocked": true
      }
    }
  ]
}
```

### 7.2 Get Player Achievements
```
GET /players/{playerId}/achievements

Response (200):
{
  "success": true,
  "total": 12,
  "unlocked": 8,
  "achievements": [
    {
      "achievementId": "5_win_streak",
      "name": "5 Win Streak",
      "unlockedDate": "2024-02-10T00:00:00Z",
      "coinsRewarded": 100
    }
  ]
}
```

---

## 8. Social Endpoints

### 8.1 Send Challenge
```
POST /social/challenges

Request:
{
  "toPlayerId": "507f1f77bcf86cd799439012",
  "betSize": 500,
  "timeFormat": "blitz5+0",
  "message": "Want to play?"
}

Response (200):
{
  "success": true,
  "challengeId": "challenge_123...",
  "status": "pending",
  "sentDate": "2024-03-24T10:30:00Z",
  "expiryDate": "2024-03-25T10:30:00Z"
}
```

### 8.2 Get Pending Challenges
```
GET /social/challenges/pending

Response (200):
{
  "success": true,
  "received": [
    {
      "challengeId": "challenge_123...",
      "fromPlayer": {
        "id": "507f1f77bcf86cd799439012",
        "name": "Jane Smith",
        "elo": 1320
      },
      "betSize": 500,
      "sentDate": "2024-03-24T10:30:00Z",
      "expiryDate": "2024-03-25T10:30:00Z"
    }
  ],
  "sent": [...]
}
```

### 8.3 Respond to Challenge
```
POST /social/challenges/{challengeId}/respond

Request:
{
  "action": "accept" | "reject"
}

Response (200):
{
  "success": true,
  "matchId": "match_507f..." (if accepted)
}
```

### 8.4 Get Blocked Players
```
GET /social/blocked

Response (200):
{
  "success": true,
  "blockedPlayers": [
    {
      "id": "507f1f77bcf86cd799439020",
      "name": "Blocked User",
      "blockedDate": "2024-03-20T00:00:00Z"
    }
  ]
}
```

### 8.5 Add to Blocked
```
POST /social/block/{playerId}

Response (200):
{
  "success": true
}
```

### 8.6 Remove from Blocked
```
DELETE /social/block/{playerId}

Response (200):
{
  "success": true
}
```

---

## 9. Daily Spin Wheel Endpoints

### 9.1 Check Spin Eligibility
```
GET /spin/eligibility

Response (200):
{
  "success": true,
  "canSpin": true,
  "lastSpinDate": "2024-03-23T12:00:00Z",
  "nextEligibleDate": "2024-03-24T12:00:00Z",
  "spinsRemainingToday": 1
}
```

### 9.2 Spin Wheel
```
POST /spin/wheel

Response (200):
{
  "success": true,
  "reward": {
    "tier": "uncommon",
    "coinsAwarded": 250,
    "multiplier": 1.5,
    "message": "You won 250 coins!"
  },
  "newBalance": 8750,
  "nextEligibleDate": "2024-03-25T12:00:00Z"
}

Error (400):
{
  "success": false,
  "error": "Already spun today. Try again tomorrow!"
}
```

### 9.3 Get Spin History
```
GET /spin/history?limit=30

Response (200):
{
  "success": true,
  "history": [
    {
      "spinDate": "2024-03-24T12:00:00Z",
      "reward": "uncommon",
      "coinsAwarded": 250,
      "multiplier": 1.5
    }
  ]
}
```

---

## 10. Tournament Endpoints

### 10.1 List Tournaments
```
GET /tournaments?status=all&limit=50

Query Params:
- status: 'all' | 'registration_open' | 'in_progress' | 'completed'
- limit: 1-100

Response (200):
{
  "success": true,
  "tournaments": [
    {
      "tournamentId": "tour_123...",
      "name": "Weekly Chess Championship",
      "startDate": "2024-03-29T18:00:00Z",
      "endDate": "2024-03-31T23:59:00Z",
      "registrationDeadline": "2024-03-29T17:00:00Z",
      "entryFee": 500,
      "maxPlayers": 64,
      "currentParticipants": 32,
      "format": "knockout",
      "status": "registration_open",
      "totalPrizePool": 16000
    }
  ]
}
```

### 10.2 Register for Tournament
```
POST /tournaments/{tournamentId}/register

Response (200):
{
  "success": true,
  "message": "Successfully registered",
  "seed": 12,
  "coinsDeducted": 500
}
```

### 10.3 Get Tournament Bracket
```
GET /tournaments/{tournamentId}/bracket

Response (200):
{
  "success": true,
  "tournament": {
    "id": "tour_123...",
    "name": "Weekly Chess Championship",
    "bracket": {
      "rounds": [
        {
          "roundNumber": 1,
          "matches": [
            {
              "matchId": "match_123...",
              "player1": { "id": "...", "name": "John", "seed": 1 },
              "player2": { "id": "...", "name": "Jane", "seed": 32 },
              "winner": null,
              "status": "pending"
            }
          ]
        }
      ]
    }
  }
}
```

### 10.4 Get Tournament Results
```
GET /tournaments/{tournamentId}/results

Response (200):
{
  "success": true,
  "results": [
    {
      "rank": 1,
      "player": { "id": "...", "name": "Winner Name" },
      "coinsReward": 8000
    },
    {
      "rank": 2,
      "player": { "id": "...", "name": "Runner Up" },
      "coinsReward": 4800
    }
  ]
}
```

---

## Error Codes

| Code | Status | Message |
|------|--------|---------|
| 400 | Bad Request | Invalid input parameters |
| 401 | Unauthorized | Invalid or expired token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Player already in queue |
| 429 | Rate Limited | Too many requests |
| 500 | Server Error | Internal error |
| 503 | Service Unavailable | Service temporarily down |

---

## Rate Limiting

```
Per IP / User ID: 1000 requests per hour
Per endpoint:
  - POST /matches/move: 100 per hour per match
  - GET /leaderboard: 60 per hour
  - POST /matchmaking/queue: 10 per hour
```

---

## Pagination

All list endpoints support:
```
Query:
  - limit: 1-500 (default: 50)
  - offset: 0-N (default: 0)
  - page: 1-N (alternative to offset)

Response:
{
  "success": true,
  "total": 5420,
  "limit": 50,
  "offset": 0,
  "hasMore": true,
  "data": [...]
}
```
