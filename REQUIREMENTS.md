# MyCPE Blitz - Product Requirements Document (PRD)

## 1. 🎯 Objective

Build an engaging, competitive, and socially interactive chess gaming experience within the MYCPE ONE employee portal to:

- Increase employee engagement & retention on the platform
- Foster healthy competition and collaboration
- Introduce gamified incentives using a virtual coin economy
- Create daily and weekly habit loops

---

## 2. 🧩 Problem Statement

Employees currently lack:
- Engaging interactive features within the portal
- Social and competitive touchpoints
- Incentives for regular platform usage

**Opportunity:** Introduce a skill-based multiplayer game that drives:
- Daily engagement
- Social interaction
- Competitive progression

---

## 3. 🎯 Goals & Success Metrics

### Primary Goals
- Increase Daily Active Users (DAU)
- Improve session duration
- Drive repeat engagement (retention)

### North Star Metric
**Weekly Active Players (WAP)**

### Supporting Metrics
- Avg. games per user per week
- Coin economy circulation rate
- Match completion rate
- Invite acceptance rate
- Retention (D1, D7, D30)
- Tournament participation rate
- Average Elo progression per player

---

## 4. 👥 User Segmentation

### 1. Casual Players
- Play occasionally
- Prefer low-stake games (100-250 coins)
- Motivated by fun and relaxation
- Need forgiving matchmaking

### 2. Competitive Players
- High engagement (3+ games/week)
- Focus on ranking, coins, leaderboard
- Prefer high-stake games (750-1000 coins)
- Target: Daily activity

### 3. Social Players
- Prefer playing with colleagues
- Engage via invites and challenges
- Value rematch functionality
- Community-focused

### 4. New/Beginner Players
- Low skill level (Elo < 1000)
- Need protection and balanced matchmaking
- Require onboarding tutorials
- High churn risk

---

## 5. ⚙️ Core Features

### 5.1 Matchmaking System

**Functional Requirements:**
- Auto-match players based on:
  - Elo Rating (skill level) ±200 points
  - Coin bet preference (100 / 250 / 500 / 750 / 1000)
  - Availability (online users)
  - Player tier (Bronze → Diamond)

**Logic:**
1. Search for nearest Elo match within time window (30 sec)
2. Expand search range if no match found (±500 Elo after 60 sec)
3. Priority matching for players with matching bet amounts
4. Queue players until match found or timeout

---

### 5.2 Game Modes

**Real-time 2-player chess**

Time Formats:
- **Blitz** (3+0, 5+0) - PRIMARY FOCUS
- **Rapid** (10+0) - FUTURE SCOPE
- **Classical** (future)

---

### 5.3 Coin Economy System

**Initial Allocation:**
- New players: 5,000 coins
- Daily log-in bonus: 100 coins (future)
- Seasonal resets: None

**Betting System:**
- Each match requires both players to bet:
  - 100 / 250 / 500 / 750 / 1000 coins
- Both players must have adequate coins
- Escrow holds coins during match

**Outcomes:**
- Winner takes total pot (2x bet)
- Loser loses initial bet
- Draw: Each player gets bet back

**Coin Floor Protection:**
- Minimum balance maintained: 100 coins
- No negative balance possible
- Prevents churn from "broke" state

---

### 5.4 Daily Reward System (Spin the Wheel)

**Mechanism:**
- Users can spin daily wheel once every 24 hours
- Rewards randomized with weighted probability

**Reward Tiers:**
- Common (50%): 50-150 coins
- Uncommon (30%): 150-300 coins
- Rare (15%): 300-500 coins
- Legendary (5%): 500-1000 coins

**Purpose:**
- Drive daily login habit loop
- Provide coin source for broke players
- Engagement driver

---

### 5.5 Leaderboard System

**Weekly Leaderboard** (Resets every Friday 00:00 UTC)

Rankings based on:
1. Total Coins Earned (primary)
2. Wins / Loss Ratio (secondary)
3. Win Streaks (tertiary)
4. Matches Played (tiebreaker)

**Tiers:**
- Top 10 (Platinum rewards)
- Top 50 (Gold rewards)
- Top 100 (Silver rewards)

---

### 5.6 Elo Rating System

**Purpose:**
- Ensure fair matchmaking
- Track player skill progression
- Basis for league promotion/demotion

**Calculation:**
- Base Elo: 1000
- New player protection: Accelerated Elo gain first 20 matches
- Win → Elo increases (K-factor: 32)
- Loss → Elo decreases
- Draw → Minimal change (+2/-2)

**Formula:** 
`New Elo = Old Elo + K × (1 - ExpectedScore)`

---

### 5.7 League System

**Tiers (Based on Elo):**
- Bronze: Elo < 800
- Silver: Elo 800-1100
- Gold: Elo 1100-1400
- Platinum: Elo 1400-1700
- Diamond: Elo > 1700

**Rules:**
- Promotion: +150 Elo or win streak of 5
- Demotion: -150 Elo or lose streak of 5
- League badge display on profile
- Season reset (quarterly)

---

### 5.8 Tournament System

**Features:**
- Multi-player tournaments (brackets)
- Entry fee in coins (100-1000)
- Structured knockout brackets
- Schedule: Weekly (Friday-Sunday)

**Rewards:**
- Winner: Prize pool 50%
- Runner-up: 30%
- Semifinals: 20%
- Leaderboard points boost (x2)

**Size:** 4-64 players per tournament

---

### 5.9 Invite & Social Gameplay

**Features:**
- Direct challenge to any employee
- Challenge expires in 24 hours
- Accept/reject invite
- Rematch option (auto-invite same bet)
- Challenge history tracking

**Social Benefits:**
- Increase engagement
- Build community
- Enable group play

---

### 5.10 Achievements & Badges

**Examples:**
- 🔥 5 Win Streak
- ⚡ Checkmate in under 10 moves
- 👑 Giant Killer (defeat higher-ranked player, +500 Elo)
- 💰 High Roller (win 1000+ coin bet)
- 🎓 First Victory
- 🌟 Undefeated (10 games, 100% win rate)
- 🛡️ Iron Defense (100 games played)
- 🏆 Promoted to Gold/Platinum/Diamond

**Benefits:**
- Badge display on profile
- Bonus coins (50-500 depending on achievement)
- Bragging rights
- Collectibility motivation

---

### 5.11 Win Streak Tracking

- Track consecutive wins
- Display prominently on profile
- Used in leaderboard ranking
- Reset on loss
- Bonus coins for milestones (5, 10, 20 wins)

---

### 5.12 Customization (Themes)

**Board Themes:**
- Classic (black & white)
- Colored (pastel)
- Dark mode
- Custom colors (future)

**Piece Styles:**
- Standard
- Carved (3D)
- Minimal

**Sound Options:**
- On/Off
- Volume control

---

## 6. 🔁 Engagement Loops

### Loop 1: Daily Habit Loop
```
Login → Spin wheel → Get coins → Play → Check leaderboard → Return next day
```

### Loop 2: Competitive Loop
```
Win → Increase Elo → Rank up → Face stronger players → Improve → Repeat
```

### Loop 3: Social Loop
```
Invite colleague → Play → Compete → Brag → Rematch
```

### Loop 4: Reward Loop
```
Play → Earn coins → Unlock badges/themes → Feel progress → Play more
```

---

## 7. 🧠 User Journey

### New User (Day 1)
1. Login
2. See tutorial (optional)
3. Get 5,000 coins
4. Spin wheel → Get bonus
5. Play first match (100-coin bet suggested)
6. Win/lose
7. Add to contacts/invite colleagues

### Returning User
1. Login
2. Check daily spin availability
3. Spin (if available)
4. Join match queue or invite friend
5. Bet coins
6. Play match
7. Win/lose
8. Check leaderboard
9. Earn/lose coins
10. See progress

### Competitive User
1. Play multiple matches daily
2. Win → Increase Elo
3. Climb leaderboard
4. Reach new tier
5. Enter tournament
6. Compete for rank
7. Mentor/invite others

---

## 8. 🛡️ Constraints & Risk Mitigation

### Risk 1: Skill Imbalance
**Problem:** New players matched with veterans → Frustration → Churn
**Solution:** 
- Elo-based matchmaking (±200 points)
- New player protection (accelerated progression)
- Bronze tier recommendations

### Risk 2: Coin Depletion → Churn
**Problem:** Players lose streaks → Run out of coins → Quit
**Solution:**
- Daily spin rewards
- Minimum coin floor (100 coins)
- Coin refund on server disconnect
- Loss forgiveness mechanics

### Risk 3: Game Abandonment
**Problem:** Players quit mid-game
**Solution:**
- Timeout auto-loss after 5 minutes
- Quit penalty: -50 Elo + -100 coins
- Matchmaking timeout flag

### Risk 4: Gambling Perception
**Problem:** Virtual betting might feel like gambling
**Solution:**
- No real money conversion
- Label as "virtual skill tokens"
- Parent/admin controls
- Responsible gaming messaging

### Risk 5: Toxic Behavior
**Problem:** Trash talk, harassment
**Solution:**
- Mute/block functionality
- Report system
- Seasonal bans for violations

---

## 9. 📊 Analytics & Tracking

### Core Metrics to Track

**Engagement:**
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- Monthly Active Users (MAU)
- Matches played per day
- Average session duration
- Daily spin usage

**Retention:**
- Day 1 retention (D1)
- Day 7 retention (D7)
- Day 30 retention (D30)
- Churn rate

**Coin Economy:**
- Total coins in circulation
- Average coin bet size
- Coin earn rate
- Coin burn rate (tournament/fees)

**Skill & Progression:**
- Elo distribution
- League distribution
- Average Elo gain per match
- Win/loss ratio distribution

**Social & Competition:**
- Invite sent/accepted ratio
- Rematch rate
- Tournament participation rate
- Invite conversion rate

**GrowthMetrics:**
- New user activation
- Referral rate
- Viral coefficient

---

## 10. 🚀 Success Criteria

**Month 1:**
- 50% of portal users try Blitz
- 20% become weekly active players
- 80% match completion rate

**Month 3:**
- 40% WAP (weekly active players)
- 3+ games/week per active player
- 70% D7 retention

**Month 6:**
- 50% WAP
- 5+ games/week per active player
- 60% D30 retention
- 100+ daily tournaments

---

## 11. 📅 Implementation Phases

### Phase 1 (MVP - Weeks 1-4)
- Basic matchmaking (random or simple Elo)
- Real-time chess
- Coin system (earn/lose)
- Daily spin
- Leaderboard (weekly)

### Phase 2 (Weeks 5-8)
- Elo rating system
- League system
- Achievements/badges
- Invite system

### Phase 3 (Weeks 9-12)
- Tournament system
- Social features (profiles, stats)
- Board customization
- Analytics dashboard

### Phase 4 (Post-Launch)
- Rapid/Classical time formats
- Seasonal rankings
- Advanced tournaments
- Social guilds/clans
