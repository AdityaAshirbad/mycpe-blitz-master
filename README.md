# 🎮 MyCPE Blitz - Competitive Chess Gaming Platform

## Overview

**MyCPE Blitz** is a skill-based, real-time multiplayer chess gaming platform designed to increase employee engagement and retention on the MYCPE ONE portal. The platform features ranked matchmaking, a virtual coin economy, daily engagement loops, and social competition mechanics.

**Status**: 🚀 In Development (Phase 1 - MVP)
**Target Launch**: End of Q2 2024
**Technology Stack**: React + Node.js + MongoDB + Socket.IO

---

## 📋 Quick Navigation

### For First-Time Setup
→ Start here: **[GETTING_STARTED.md](./GETTING_STARTED.md)**
- Local development setup
- Environment configuration
- Running dev servers
- Common debugging

### For Product & Requirements
→ Read: **[REQUIREMENTS.md](./REQUIREMENTS.md)**
- Product vision & objectives
- Feature specifications
- User segmentation
- Success metrics
- Risk mitigation

### For System Architecture
→ Read: **[ARCHITECTURE.md](./ARCHITECTURE.md)**
- System design overview
- Component architecture
- Data flows
- Technology stack
- Scalability considerations

### For Database Design
→ Read: **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)**
- MongoDB collection schemas
- Indexing strategy
- Data retention policy
- Collection relationships

### For API Development
→ Read: **[API_SPEC.md](./API_SPEC.md)**
- REST endpoint specifications
- Request/response formats
- Authentication scheme
- Error codes
- Rate limiting

### For Frontend Development
→ Read: **[COMPONENT_STRUCTURE.md](./COMPONENT_STRUCTURE.md)**
- React component hierarchy
- State management (Zustand)
- Hook patterns
- Socket.IO event structure
- Backend service patterns

### For Project Timeline
→ Read: **[PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md)**
- 12-week implementation timeline
- Phase breakdown
- Feature checklist
- Success criteria
- Team responsibilities

---

## 🎯 Project Goals

### Primary Objectives
1. **Increase Daily Active Users (DAU)** by 3x within 3 months
2. **Improve session duration** to 20+ minutes per user
3. **Drive repeat engagement** with 40%+ D7 retention
4. **Foster competitive community** with leaderboards & tournaments

### Key Success Metrics
- **Weekly Active Players (WAP)**: Target 2,000 by launch
- **Match completion rate**: >80%
- **Coin economy**: Balanced circulation with no inflation
- **User satisfaction**: NPS > 50

---

## 🏗️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite + Socket.IO Client |
| **Backend** | Node.js + Express + Socket.IO |
| **Database** | MongoDB (NoSQL) + Redis (Cache/Queue) |
| **Game Logic** | chess.js (validation) + react-chessboard (UI) |
| **State Management** | Zustand (frontend) |
| **Real-time** | WebSocket (Socket.IO) |
| **Authentication** | JWT + MYCPE SSO |
| **Deployment** | Docker + AWS/Azure |
| **Monitoring** | Datadog/New Relic + Sentry |

---

## 🚀 Getting Started

### Prerequisites
```bash
- Node.js 18+
- MongoDB (local or cloud)
- Redis (local or cloud)
- Git
- Basic understanding of React, Express, Socket.IO
```

### Quick Start (5 minutes)
```bash
# 1. Clone repo
git clone <repo>
cd mycpe-blitz-master

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Configure environment
# Create .env files (see GETTING_STARTED.md)

# 4. Start services
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# 5. Open browser
# → http://localhost:5173
```

**Full setup guide**: See [GETTING_STARTED.md](./GETTING_STARTED.md)

---

## 📁 Project Structure

```
mycpe-blitz-master/
│
├── backend/                           # Node.js Express server
│   ├── src/
│   │   ├── routes/                   # API endpoints
│   │   ├── controllers/              # Request handlers
│   │   ├── services/                 # Business logic
│   │   ├── models/                   # MongoDB schemas
│   │   ├── websocket/                # Socket.IO events
│   │   ├── middleware/               # Auth, validation, etc.
│   │   └── utils/                    # Helpers & constants
│   ├── tests/                        # Jest test files
│   ├── server.js                     # Entry point
│   ├── package.json
│   └── .env                          # Environment variables
│
├── frontend/                          # React Vite app
│   ├── src/
│   │   ├── components/               # React components
│   │   ├── pages/                    # Page components
│   │   ├── hooks/                    # Custom hooks
│   │   ├── services/                 # API & Socket clients
│   │   ├── store/                    # Zustand state
│   │   ├── styles/                   # CSS/Tailwind
│   │   ├── utils/                    # Helpers
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tests/                        # Vitest/React Testing Library
│   ├── package.json
│   └── .env.local                    # Environment variables
│
├── REQUIREMENTS.md                    # Product requirements & features
├── ARCHITECTURE.md                    # System design & architecture
├── DATABASE_SCHEMA.md                 # MongoDB schemas & indexes
├── API_SPEC.md                        # REST API specifications
├── COMPONENT_STRUCTURE.md             # Frontend component guide
├── PROJECT_ROADMAP.md                 # 12-week timeline
├── GETTING_STARTED.md                 # Developer setup guide
├── package.json                       # Root package.json
└── README.md                          # This file
```

---

## 🎮 Core Features

### Phase 1 (MVP - Week 4)
- ✅ Real-time 2-player chess (Blitz format)
- ✅ Elo-based ranked matchmaking
- ✅ Virtual coin economy (earn/lose per match)
- ✅ Weekly leaderboard
- ✅ Player profiles & stats
- ⚠️ Basic authentication

### Phase 2 (Enhanced - Week 8)
- [ ] League system (Bronze → Diamond)
- [ ] Achievements & badges
- [ ] Daily spin wheel rewards
- [ ] Direct player challenges/invites
- [ ] Win streak tracking
- [ ] Social profiles

### Phase 3 (Advanced - Week 12)
- [ ] Tournament system with brackets
- [ ] Advanced analytics & dashboards
- [ ] Player customization (board themes)
- [ ] Seasonal rankings
- [ ] Admin moderation tools

---

## 💻 Development Workflow

### Day 1-2: Onboarding
1. Read [GETTING_STARTED.md](./GETTING_STARTED.md)
2. Clone repo and run locally
3. Review [REQUIREMENTS.md](./REQUIREMENTS.md)
4. Review [ARCHITECTURE.md](./ARCHITECTURE.md)

### Pick a Task
1. Check [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) for current sprint
2. Create feature branch: `git checkout -b feature/your-feature`
3. Read relevant spec (API_SPEC.md, COMPONENT_STRUCTURE.md, etc.)
4. Implement with tests
5. Create Pull Request

### Code Standards
- Language: JavaScript ES2020+
- Formatting: Prettier
- Linting: ESLint
- Tests: Jest (backend) + Vitest (frontend)
- Commit messages: Conventional Commits
- Test coverage: >80%

---

## 🗄️ Data Models

### Core Entities
- **Player**: User profile, stats, Elo, balance, preferences
- **Match**: Game record, moves, results, bet amounts
- **MatchQueue**: Active matchmaking queue
- **Leaderboard**: Weekly rankings snapshots
- **Achievement**: Badge definitions & player progress
- **Tournament**: Multi-player tournament brackets
- **CoinTransaction**: Ledger of all coin transfers

**Full schema**: See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)

---

## 🔌 Real-time Communication

### Socket.IO Events

**Game Events**
```javascript
socket.emit('move', {matchId, from, to})
socket.on('opponent_move', (data) => {})
socket.emit('resign', {matchId})
socket.on('game_end', (result) => {})
```

**Matchmaking Events**
```javascript
socket.emit('queue_join', {betSize})
socket.on('match_found', (opponent) => {})
socket.emit('queue_leave', {})
```

**Social Events**
```javascript
socket.emit('send_challenge', {toPlayerId, bet})
socket.on('challenge_received', (data) => {})
```

**Full event specs**: See [API_SPEC.md](./API_SPEC.md) Section 4-8

---

## API Endpoints

### Authentication
- `POST /auth/login` - SSO login
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - Logout

### Players
- `GET /players/me` - Current player profile
- `GET /players/{id}` - Other player profile
- `PUT /players/me/preferences` - Update settings

### Matchmaking
- `POST /matchmaking/queue` - Join queue
- `DELETE /matchmaking/queue` - Leave queue
- `GET /matchmaking/queue/status` - Queue status

### Matches
- `GET /matches/{id}` - Get match details
- `POST /matches/{id}/move` - Make move
- `POST /matches/{id}/resign` - Resign match

### Economy
- `GET /coins/balance` - Coin balance
- `GET /coins/history` - Transaction history
- `POST /spin/wheel` - Daily spin reward

### Leaderboard
- `GET /leaderboard/global` - Global rankings
- `GET /leaderboard/me` - Personal rank
- `GET /leaderboard/league/{tier}` - League rankings

**Full API specs**: See [API_SPEC.md](./API_SPEC.md)

---

## 🗺️ Implementation Roadmap

| Week | Focus | Status |
|------|-------|--------|
| **1** | Setup & Infrastructure | 🔄 In Progress |
| **2** | Core Game Mechanics | 📅 Planned |
| **3** | Matchmaking & Economy | 📅 Planned |
| **4** | MVP Polish & Launch | 📅 Planned |
| **5** | Elo & Leagues | 📅 Planned |
| **6** | Achievements & Rewards | 📅 Planned |
| **7** | Social Features | 📅 Planned |
| **8** | Customization & Analytics | 📅 Planned |
| **9-10** | Tournament System | 📅 Planned |
| **11** | Performance & Scale | 📅 Planned |
| **12** | Polish & Full Release | 📅 Planned |

**Detailed roadmap**: See [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md)

---

## 📊 Analytics & Metrics

### Dashboard Tracked Metrics
- **Engagement**: DAU, WAU, MAU, session duration, retention (D1/D7/D30)
- **Gameplay**: Matches/day, completion rate, average duration, Elo distribution
- **Economy**: Coin balance distribution, circulation rate, transaction volume
- **Social**: Challenge sent/accepted, rematch rate, player blocking
- **Performance**: API latency, error rates, server uptime

---

## 🛡️ Security

- **Authentication**: JWT + SSO integration
- **Authorization**: Role-based access control (RBAC)
- **Data Protection**: HTTPS/TLS, bcrypt password hashing
- **Game Integrity**: Server-side move validation, timeout enforcement
- **Rate Limiting**: 100 req/min per user
- **Input Validation**: Strict validation on all endpoints

---

## 🚀 Deployment

### Development
```bash
npm run dev        # Local dev servers
npm run dev:debug  # Debug mode
```

### Staging
```bash
npm run build      # Production build
npm run deploy:staging
```

### Production
```bash
npm run deploy:prod

# Monitoring
# → Datadog dashboard
# → Error tracking (Sentry)
```

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
lsof -i :5000
kill -9 <PID>
```

**MongoDB connection failed**
```bash
mongosh mongodb://localhost:27017
# Check connection
```

**Socket.IO connection fails**
- Check CORS settings
- Verify backend/frontend URLs match
- Check browser console for errors

**Full debugging guide**: See [GETTING_STARTED.md](./GETTING_STARTED.md) Section 10

---

## 📚 Documentation Index

| Document | Purpose | Audience |
|----------|---------|----------|
| [GETTING_STARTED.md](./GETTING_STARTED.md) | Local setup & development | Developers |
| [REQUIREMENTS.md](./REQUIREMENTS.md) | Product spec & features | Everyone |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design | Tech leads, Architects |
| [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) | Data models | Backend, Database |
| [API_SPEC.md](./API_SPEC.md) | API contracts | Backend, Frontend |
| [COMPONENT_STRUCTURE.md](./COMPONENT_STRUCTURE.md) | Frontend guide | Frontend |
| [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) | Timeline & planning | PMs, Tech leads |

---

## 👥 Team & Communication

### Standups
- **Daily**: 15 minutes (10:00 AM)
- **Sprint demos**: Weekly Friday (4:00 PM)
- **Planning**: Sprint day

### Channels
- **#development**: Technical discussions
- **#design**: UI/UX reviews
- **#product**: Feature feedback
- **Jira**: Task tracking

### Contacts
- **Tech Lead**: [Contact]
- **Product Manager**: [Contact]
- **DevOps**: [Contact]

---

## 📈 Success Metrics

### Breakeven Point
- 500+ daily active users
- 50+ concurrent players
- 100+ matches/day
- 80%+ match completion rate

### Growth Targets
- Month 1: 1,000 DAU
- Month 2: 3,000 DAU
- Month 3: 5,000 DAU

---

## 📝 License

Proprietary - MYCPE 2024

---

## 🆘 Need Help?

1. **Setup issues?** → [GETTING_STARTED.md](./GETTING_STARTED.md)
2. **Feature questions?** → [REQUIREMENTS.md](./REQUIREMENTS.md)
3. **Architecture questions?** → [ARCHITECTURE.md](./ARCHITECTURE.md)
4. **API questions?** → [API_SPEC.md](./API_SPEC.md)
5. **Component questions?** → [COMPONENT_STRUCTURE.md](./COMPONENT_STRUCTURE.md)
6. **Timeline questions?** → [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md)
7. **Team questions?** → Slack #development

---

## 🎓 Learning Resources

### Chess Concepts
- [Chess.js Documentation](https://github.com/jhlywa/chess.js)
- [Elo Rating System](https://en.wikipedia.org/wiki/Elo_rating_system)

### Technical Stack
- [React](https://react.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://docs.mongodb.com/)
- [Socket.IO](https://socket.io/)
- [Zustand](https://github.com/pmndrs/zustand)

### Best Practices
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [React Best Practices](https://developers.google.com/web)

---

**Version**: 1.0 | **Last Updated**: March 24, 2024 | **Status**: 🚀 Active Development

**Let's build something amazing! ♟️**
