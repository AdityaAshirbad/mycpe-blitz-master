# MyCPE Blitz - Developer Quick Start Guide

## 🚀 Getting Started in 15 Minutes

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- Redis (local or cloud)
- Git
- VS Code (recommended)

---

## 1. Clone & Install

```bash
# Clone repository
git clone <repo>
cd mycpe-blitz-master

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## 2. Environment Setup

### Backend (.env)
```
# backend/.env
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/mycpe-blitz

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=1h

# MYCPE SSO (integration)
SSO_URL=https://sso.mycpe.com
SSO_CLIENT_ID=your_client_id
SSO_CLIENT_SECRET=your_client_secret

# Logging
LOG_LEVEL=debug
```

### Frontend (.env.local)
```
# frontend/.env.local
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_ENV=development
```

---

## 3. Start Local Services

### Option A: Docker (Recommended)
```bash
# Start MongoDB and Redis
docker-compose up -d

# Check services are running
docker ps
```

### Option B: Local Installation
```bash
# macOS
brew install mongodb-community
brew install redis
brew services start mongodb-community
brew services start redis

# Linux/Windows
# Follow MongoDB and Redis installation guides
mongod
redis-server
```

---

## 4. Run Development Servers

### Terminal 1: Backend
```bash
cd backend
npm run dev
# Server running on http://localhost:5000
# Socket.IO on ws://localhost:5000
```

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
# App running on http://localhost:5173
```

### Terminal 3: MongoDB Monitoring (Optional)
```bash
# View database in MongoDB Compass
# Connect to: mongodb://localhost:27017
```

---

## 5. Verify Setup

### Test Backend API
```bash
curl http://localhost:5000/api/players/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Test Frontend
Open http://localhost:5173 in browser
- Should see login page
- (Will fail auth until SSO configured)

### Test WebSocket
Open browser DevTools console:
```javascript
// Check Socket.IO connection
console.log(io())
```

---

## 6. Project Overview

### Architecture
```
Frontend (React + Vite)
    ↓
Socket.IO (Real-time)
    ↓
Express Backend (Node.js)
    ↓
MongoDB (Data) + Redis (Cache)
```

### Key Files

**Backend**:
- `backend/server.js` - Entry point
- `backend/src/services/` - Business logic
- `backend/src/websocket/` - Socket.IO events
- `backend/src/routes/` - API endpoints

**Frontend**:
- `frontend/src/components/` - React components
- `frontend/src/services/` - API/Socket clients
- `frontend/src/hooks/` - Custom hooks
- `frontend/src/store/` - State management

---

## 7. Development Workflow

### Making a Change

**Backend Example: Add player endpoint**

1. Create route: `backend/src/routes/players.js`
```javascript
router.get('/players/:id', async (req, res) => {
  // Implementation
});
```

2. Test in Postman/curl

3. Update API_SPEC.md

4. Create tests: `backend/tests/players.test.js`

5. Run tests: `npm test`

6. Push to feature branch

**Frontend Example: Add new component**

1. Create component: `frontend/src/components/MyComponent.jsx`
```javascript
export function MyComponent() {
  return <div>MyComponent</div>;
}
```

2. Import in parent component

3. Test locally

4. Update COMPONENT_STRUCTURE.md

5. Push to feature branch

---

## 8. Common Commands

### Backend
```bash
# Development
npm run dev

# Production build
npm run build

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Linting
npm run lint

# Database seed (if available)
npm run db:seed
```

### Frontend
```bash
# Development
npm run dev

# Production build
npm run build

# Preview build locally
npm run preview

# Run tests
npm test

# Linting
npm run lint
```

---

## 9. Database Basics

### Connect to MongoDB
```bash
mongosh mongodb://localhost:27017/mycpe-blitz
```

### Common Queries
```javascript
// View all players
db.players.find().limit(10)

// View recent matches
db.matches.find().sort({createdAt: -1}).limit(5)

// Check coin balance of player
db.players.findOne({$text: { $search: "John" }}, {coins: 1})

// View matchmaking queue
db.match_queue.find()
```

---

## 10. Debugging

### Enable Debug Logging
```bash
# Backend
DEBUG=blitz:* npm run dev

## Frontend DevTools
F12 → Open DevTools
- Console: Check Socket.IO events
- Network: Monitor API calls
- Redux DevTools: (if installed)
```

### Common Issues

**Problem**: Port 5000 already in use
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>
```

**Problem**: MongoDB connection fails
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Restart MongoDB
brew services stop mongodb-community
brew services start mongodb-community
```

**Problem**: Socket.IO connection fails
- Check CORS settings in `backend/src/config/socket-io.js`
- Verify frontend VITE_SOCKET_URL matches backend

---

## 11. Code Patterns

### Backend API Route
```javascript
// backend/src/routes/example.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware');
const { ExampleController } = require('../controllers');

router.get('/example', authMiddleware, ExampleController.getExample);

module.exports = router;
```

### Frontend Component
```javascript
// frontend/src/components/Example.jsx
import { useGame } from '../hooks/useGame';

export function Example() {
  const { gameState, makeMove } = useGame();
  
  return (
    <div>
      <h1>Example Component</h1>
      <button onClick={() => makeMove()}>Make Move</button>
    </div>
  );
}
```

### Socket.IO Event
```javascript
// Backend
socket.on('my_event', (data) => {
  socket.broadcast.emit('response', {message: 'Received'});
});

// Frontend
const socket = io('http://localhost:5000');
socket.emit('my_event', {content: 'test'});
socket.on('response', (data) => {
  console.log(data.message);
});
```

---

## 12. Testing

### Unit Test Example
```javascript
// backend/tests/services/eloService.test.js
describe('EloService', () => {
  it('should increase Elo on win', () => {
    const newElo = eloService.calculateNewRating(1000, 1000, 'win');
    expect(newElo).toBeGreaterThan(1000);
  });
});
```

### Run Tests
```bash
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

---

## 13. Git Workflow

### Create Feature Branch
```bash
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "feat: add my feature"

# Push branch
git push origin feature/my-feature

# Create Pull Request on GitHub
```

### Commit Convention
```
feat: new feature
fix: bug fix
docs: documentation
style: code style
refactor: refactoring
perf: performance improvement
test: testing
chore: build/tooling
```

---

## 14. Performance Tips

### Frontend
- Use React DevTools Profiler
- Check bundle size: `npm run build -- --report`
- Lazy load components: `React.lazy()`
- Use `memo()` for expensive components

### Backend
- Monitor database queries: Enable MongoDB profiler
- Check API response times: Use response time middleware
- Profile CPU: Use Node.js `--inspect` flag

```bash
# Backend profiling
node --inspect backend/server.js
# Open chrome://inspect
```

---

## 15. Useful Resources

### Documentation
- [REQUIREMENTS.md](./REQUIREMENTS.md) - Product requirements
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Data models
- [API_SPEC.md](./API_SPEC.md) - API endpoints
- [COMPONENT_STRUCTURE.md](./COMPONENT_STRUCTURE.md) - Frontend structure
- [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) - Timeline & phases

### Libraries Used
- **Chess Logic**: [chess.js](https://github.com/jhlywa/chess.js)
- **UI Component**: [react-chessboard](https://github.com/Clariity/react-chessboard)
- **Real-time**: [Socket.IO](https://socket.io/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Frontend Build**: [Vite](https://vitejs.dev/)

### External Resources
- MongoDB Docs: https://docs.mongodb.com/
- Express Docs: https://expressjs.com/
- React Docs: https://react.dev/
- Socket.IO Docs: https://socket.io/docs/

---

## 16. Next Steps

1. **Run the app** (step 4 above)
2. **Make a test commit**: Edit `REQUIREMENTS.md`, commit, push
3. **Read the docs**: Start with ARCHITECTURE.md
4. **Pick a task**: Check PROJECT_ROADMAP.md Week 1
5. **Ask questions**: Use Slack/Discord for team

---

## Support

**Questions?** 
- Check the [FAQs](#) in team docs
- Ask in #development Slack channel
- Create an issue on GitHub
- Contact tech lead

---

## Quick Reference

```bash
# Full reset (dangerous!)
rm -rf node_modules package-lock.json
npm install

# Update all dependencies
npm update

# Check for security issues
npm audit

# Fix security issues
npm audit fix

# Clean build
npm run clean
npm run build

# Run in production mode locally
NODE_ENV=production npm start
```

---

Happy coding! 🎮♟️

**Version**: 1.0 | **Last Updated**: March 2024 | **Maintained By**: Tech Lead
