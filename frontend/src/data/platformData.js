export const timeControls = [
  { id: 'bullet', label: 'Bullet', duration: '1 min', increment: '+0', audience: 'Experts and quick-break players' },
  { id: 'blitz', label: 'Blitz', duration: '5 min', increment: '+2', audience: 'Default company ladder format' },
  { id: 'classical', label: 'Classical', duration: '15 min', increment: '+5', audience: 'Beginner-friendly deliberate play' },
];

export const betTiers = [
  { id: 'micro', label: 'Micro', coins: 100 },
  { id: 'standard', label: 'Standard', coins: 250 },
  { id: 'high', label: 'High', coins: 500 },
  { id: 'elite', label: 'Elite', coins: 750 },
  { id: 'champion', label: 'Champion', coins: 1000 },
];

export const platformData = {
  overview: {
    season: 'Spring 2026',
    leaderboardReset: 'Friday 6:00 PM',
    coinFloor: 'Monday 12:00 AM UTC',
    successMetrics: [
      { label: 'Weekly active players', value: '42%', tone: 'good' },
      { label: 'Avg games per player', value: '3.7', tone: 'good' },
      { label: 'Median match time', value: '24s', tone: 'good' },
      { label: 'Challenge acceptance', value: '63%', tone: 'good' },
    ],
    kpis: [
      { label: 'Players online', value: '186', detail: '124 available, 38 in-game, 24 DND' },
      { label: 'Active live games', value: '31', detail: '6 private, 25 open to spectators' },
      { label: 'Coins in circulation', value: '1.84M', detail: 'Healthy economy, 7.6% weekly growth' },
      { label: 'Department battles', value: '4', detail: 'Finance leads Support by 18 points' },
    ],
    priorities: [
      'Zero-friction play start with time control, stake, and beginner mode preset in one action.',
      'Visible social context around rivals, spectators, departments, and challenge inboxes.',
      'Transparent coin, rank, and badge progression on every major surface.',
    ],
  },
  currentPlayer: {
    id: 'p-001',
    name: 'Aarav Nair',
    email: 'aarav.nair@mycpeone.internal',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Aarav%20Nair',
    role: 'Product Analyst',
    department: 'Product',
    status: 'Available',
    points: 1385,
    title: 'Knight',
    nextTitle: 'Bishop',
    pointsToNext: 115,
    coins: 7420,
    weeklyRank: 7,
    seasonRank: 14,
    wins: 58,
    losses: 22,
    draws: 7,
    winRate: 67,
    streak: 4,
    bestStreak: 8,
    dailyBonusClaimed: true,
    weeklyCoinFloorProtected: false,
    beginnerMode: true,
    mostPlayedOpening: 'Italian Game',
    averageGameDuration: '7m 42s',
    timeControlBreakdown: [
      { mode: 'Bullet', winRate: '54%', games: 12 },
      { mode: 'Blitz', winRate: '71%', games: 49 },
      { mode: 'Classical', winRate: '63%', games: 26 },
    ],
    badges: [
      { id: 'first-victory', name: 'First Victory', description: 'Won your first match.', progress: 'Unlocked' },
      { id: 'hat-trick', name: 'Hat Trick', description: 'Won 3 games in a row.', progress: 'Unlocked' },
      { id: 'nemesis', name: 'Nemesis Defeated', description: 'Beat the colleague who had your number.', progress: 'Unlocked' },
      { id: 'century', name: 'Century Club', description: 'Play 100 games total.', progress: '71 / 100' },
    ],
    rivals: [
      { name: 'Priya Raman', status: 'Nemesis', note: 'You are 2-5 against her. One more win clears the tag.' },
      { name: 'Sahil Mehta', status: 'Rival', note: 'He just jumped two spots above you on the weekly ladder.' },
    ],
    notifications: [
      'Priya Raman accepted your Blitz challenge for 250 coins.',
      'Weekly tournament seeding closes in 9 hours.',
      'You are 115 points away from Bishop title.',
    ],
  },
  matchmaking: {
    queueSummary: {
      averageWait: '24 sec',
      rankWindow: 'Within 2 title tiers for first 15 sec',
      acceptanceWindow: '10 sec',
    },
    computerOpponents: [
      {
        id: 'bot-coach',
        name: 'Coach Bot',
        title: 'Training Partner',
        department: 'Practice Arena',
        status: 'Ready anytime',
        preferredMode: 'Blitz',
        difficulty: 'easy',
        summary: 'Plays safe moves and gives newer employees room to learn.',
      },
      {
        id: 'bot-rival',
        name: 'Rival Bot',
        title: 'Sparring AI',
        department: 'Practice Arena',
        status: 'Ready anytime',
        preferredMode: 'Blitz',
        difficulty: 'medium',
        summary: 'Looks for captures and punishes loose pieces.',
      },
      {
        id: 'bot-master',
        name: 'Master Bot',
        title: 'Challenge Engine',
        department: 'Practice Arena',
        status: 'Ready anytime',
        preferredMode: 'Classical',
        difficulty: 'hard',
        summary: 'Chooses stronger positional replies for focused practice.',
      },
    ],
    availablePlayers: [
      { id: 'p-002', name: 'Priya Raman', title: 'Bishop', points: 1510, department: 'Design', status: 'In Queue', preferredMode: 'Blitz', balance: 8910 },
      { id: 'p-003', name: 'Daniel Cruz', title: 'Knight', points: 1405, department: 'Finance', status: 'Available', preferredMode: 'Classical', balance: 4320 },
      { id: 'p-004', name: 'Megha Kapoor', title: 'Rook', points: 1730, department: 'HR', status: 'Spectating', preferredMode: 'Bullet', balance: 11600 },
      { id: 'p-005', name: 'Ishaan Verma', title: 'Pawn', points: 980, department: 'Support', status: 'Beginner Mode', preferredMode: 'Classical', balance: 870 },
      { id: 'p-006', name: 'Nina Joseph', title: 'Queen', points: 2050, department: 'Operations', status: 'Do Not Disturb', preferredMode: 'Blitz', balance: 14300 },
    ],
    pendingChallenges: [
      { id: 'c-100', from: 'Priya Raman', title: 'Bishop', record: '71W / 26L', mode: 'Blitz', bet: 250, message: 'No excuses this time.', expiresIn: '2h 14m' },
      { id: 'c-101', from: 'Daniel Cruz', title: 'Knight', record: '40W / 31L', mode: 'Classical', bet: 100, message: 'Coffee break game?', expiresIn: '18h' },
    ],
    sentChallenges: [
      { id: 'c-110', to: 'Sahil Mehta', mode: 'Bullet', bet: 500, status: 'Snoozed for 1h' },
      { id: 'c-111', to: 'Tara Singh', mode: 'Blitz', bet: 250, status: 'Waiting for challenger sync' },
    ],
  },
  liveGames: [
    { id: 'g-001', white: 'Nina Joseph', black: 'Aarush Patel', mode: 'Blitz', move: '24...Qh4', spectators: 18, privacy: 'Public', tension: 'Check in 3 moves likely' },
    { id: 'g-002', white: 'Priya Raman', black: 'Daniel Cruz', mode: 'Bullet', move: '17.Bxf7+', spectators: 42, privacy: 'Public', tension: 'Both under 20 seconds' },
    { id: 'g-003', white: 'Ritika Das', black: 'Sahil Mehta', mode: 'Classical', move: '12...e5', spectators: 5, privacy: 'Private', tension: 'Spectators locked' },
  ],
  leaderboard: {
    weekly: [
      { rank: 1, name: 'Nina Joseph', department: 'Operations', title: 'Queen', points: 2050, delta: '+4', coins: 14300, winRate: '79%' },
      { rank: 2, name: 'Megha Kapoor', department: 'HR', title: 'Rook', points: 1730, delta: '+1', coins: 11600, winRate: '74%' },
      { rank: 3, name: 'Priya Raman', department: 'Design', title: 'Bishop', points: 1510, delta: '-1', coins: 8910, winRate: '73%' },
      { rank: 4, name: 'Sahil Mehta', department: 'Engineering', title: 'Bishop', points: 1462, delta: '+2', coins: 7020, winRate: '68%' },
      { rank: 5, name: 'Daniel Cruz', department: 'Finance', title: 'Knight', points: 1405, delta: '0', coins: 4320, winRate: '57%' },
      { rank: 7, name: 'Aarav Nair', department: 'Product', title: 'Knight', points: 1385, delta: '+3', coins: 7420, winRate: '67%' },
    ],
    hallOfFame: [
      { week: 'Week 11', champion: 'Nina Joseph', runnerUp: 'Priya Raman', third: 'Megha Kapoor' },
      { week: 'Week 10', champion: 'Megha Kapoor', runnerUp: 'Sahil Mehta', third: 'Aarav Nair' },
      { week: 'Week 9', champion: 'Priya Raman', runnerUp: 'Daniel Cruz', third: 'Nina Joseph' },
    ],
    departments: [
      { name: 'Finance', score: 118, trend: '+12', leader: 'Daniel Cruz' },
      { name: 'Support', score: 100, trend: '+7', leader: 'Ishaan Verma' },
      { name: 'Design', score: 97, trend: '+5', leader: 'Priya Raman' },
      { name: 'Product', score: 95, trend: '+14', leader: 'Aarav Nair' },
    ],
  },
  tournaments: [
    { name: 'Friday Blitz Cup', status: 'Registration Open', start: 'Friday 5:00 PM', format: '16-player knockout', reward: 'Hall of Fame badge + 1500 coins' },
    { name: 'Department Clash: Product vs Design', status: 'Round 2 live', start: 'Now', format: 'Best-of-12 team series', reward: 'Portal banner takeover' },
    { name: 'Flash Tournament', status: 'Admin-ready', start: 'One-click launch', format: '1-hour bullet swarm', reward: 'Temporary portal crown' },
  ],
  activityFeed: [
    { author: 'Nina Joseph', action: 'shared a win card after a 9-move checkmate', meta: 'Champion tier, 1000-coin pot' },
    { author: 'Priya Raman', action: 'earned Giant Slayer', meta: 'Beat a player two title tiers above her' },
    { author: 'Finance Department', action: 'overtook Support in department standings', meta: '+18 points this week' },
  ],
  admin: {
    moderationQueue: [
      { id: 'f-001', players: 'Anaya / Dev', reason: 'Repeated 1000-coin alternated wins', severity: 'High' },
      { id: 'f-002', players: 'Tara / Yusuf', reason: 'Five disconnect forfeits in 48h', severity: 'Medium' },
      { id: 'f-003', players: 'Riya / Neil', reason: 'Suspiciously fast 30-move classical game', severity: 'Medium' },
    ],
    actions: [
      'Launch Flash Tournament',
      'Create Department Challenge',
      'Reset player coin balance',
      'Export weekly participation CSV',
    ],
  },
  profile: {
    headToHead: [
      { opponent: 'Priya Raman', record: '2W - 5L', status: 'Nemesis', note: 'Beat her once more to clear the tag.' },
      { opponent: 'Daniel Cruz', record: '4W - 1L', status: 'Favored', note: 'Strong classical record.' },
      { opponent: 'Sahil Mehta', record: '3W - 3L', status: 'Even', note: 'Most contested rivalry.' },
    ],
    matchHistory: [
      { opponent: 'Sahil Mehta', result: 'Win', mode: 'Blitz', bet: 250, change: '+15 RP / +250 coins' },
      { opponent: 'Priya Raman', result: 'Loss', mode: 'Bullet', bet: 500, change: '-10 RP / -500 coins' },
      { opponent: 'Daniel Cruz', result: 'Draw', mode: 'Classical', bet: 100, change: '+2 RP / 0 coins' },
      { opponent: 'Ishaan Verma', result: 'Win', mode: 'Classical', bet: 100, change: '+15 RP / +100 coins' },
    ],
  },
};

export const getPlayerPreviewByName = (name) =>
  platformData.matchmaking.availablePlayers.find((player) => player.name === name) || null;
