import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/Layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { PlayPage } from './pages/PlayPage';
import { ProfilePage } from './pages/ProfilePage';
import { GamePage } from './pages/GamePage';
import { AdminPage } from './pages/AdminPage';
import { apiService } from './services/apiService';
import { useLeaderboardStore } from './store/leaderboardStore';
import { useMatchmakingStore } from './store/matchmakingStore';
import { usePlayerStore } from './store/playerStore';
import { usePlatformStore } from './store/platformStore';
import { useSocialStore } from './store/socialStore';
import './App.css';

function App() {
  const setPlayer = usePlayerStore((state) => state.setPlayer);
  const setIsAuthenticated = usePlayerStore((state) => state.setIsAuthenticated);
  const setPlayersOnline = useMatchmakingStore((state) => state.setPlayersOnline);
  const setActiveMatches = useMatchmakingStore((state) => state.setActiveMatches);
  const setPendingChallenges = useSocialStore((state) => state.setPendingChallenges);
  const setChallenges = useSocialStore((state) => state.setChallenges);
  const setLeaderboard = useLeaderboardStore((state) => state.setLeaderboard);
  const setPlatformData = usePlatformStore((state) => state.setPlatformData);
  const setPlatformLoading = usePlatformStore((state) => state.setLoading);
  const setPlatformError = usePlatformStore((state) => state.setError);

  React.useEffect(() => {
    const hydratePlatform = async () => {
      setPlatformLoading(true);

      try {
        const response = await apiService.getPlatformBootstrap();
        const data = response.data;

        setPlatformData(data);
        setPlayer(data.currentPlayer);
        setIsAuthenticated(true);
        setPlayersOnline(Number.parseInt(data.overview.kpis[0].value, 10));
        setActiveMatches(Number.parseInt(data.overview.kpis[1].value, 10));
        setPendingChallenges(data.matchmaking.pendingChallenges);
        setChallenges(data.matchmaking.sentChallenges);
        setLeaderboard(data.leaderboard.weekly);
      } catch (error) {
        setPlatformError(apiService.handleError(error));
      } finally {
        setPlatformLoading(false);
      }
    };

    hydratePlatform();
  }, [setActiveMatches, setChallenges, setIsAuthenticated, setLeaderboard, setPendingChallenges, setPlatformData, setPlatformError, setPlatformLoading, setPlayer, setPlayersOnline]);

  return (
    <Router>
      <Routes>
        <Route path="/game" element={<GamePage />} />
        <Route
          path="*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/play" element={<PlayPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
