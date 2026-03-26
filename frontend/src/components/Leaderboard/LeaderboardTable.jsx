import React, { useState, useEffect } from 'react';
import { useLeaderboardStore } from '../../store/leaderboardStore';
import { apiService } from '../../services/apiService';
import '../../styles/Leaderboard.css';

export const LeaderboardTable = () => {
  const [period, setPeriod] = useState('weekly');
  const [league, setLeague] = useState('all');
  const leaderboard = useLeaderboardStore(state => state.leaderboard);
  const setLeaderboard = useLeaderboardStore(state => state.setLeaderboard);
  const isLoading = useLeaderboardStore(state => state.isLoading);
  const setLoading = useLeaderboardStore(state => state.setIsLoading);

  const fetchLeaderboard = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService.getLeaderboard(period, league);
      if (response?.data?.length > 0) {
        setLeaderboard(response.data);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Fallback to local dummy data in case API is unavailable
      setLeaderboard([
        { id: 'p1', name: 'ChessMaster99', avatar: 'https://i.pravatar.cc/100?img=10', elo: 2480, wins: 153, losses: 21, winRate: 88, league: 'diamond' },
        { id: 'p2', name: 'BlueKnight', avatar: 'https://i.pravatar.cc/100?img=11', elo: 2375, wins: 141, losses: 32, winRate: 82, league: 'platinum' },
        { id: 'p3', name: 'WhiteRook', avatar: 'https://i.pravatar.cc/100?img=12', elo: 2260, wins: 131, losses: 43, winRate: 75, league: 'gold' },
        { id: 'p4', name: 'QueenSlayer', avatar: 'https://i.pravatar.cc/100?img=13', elo: 2190, wins: 118, losses: 48, winRate: 71, league: 'gold' },
        { id: 'p5', name: 'PawnStorm', avatar: 'https://i.pravatar.cc/100?img=14', elo: 2100, wins: 104, losses: 55, winRate: 65, league: 'silver' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [league, period, setLeaderboard, setLoading]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-controls">
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="all-time">All Time</option>
        </select>

        <select value={league} onChange={(e) => setLeague(e.target.value)}>
          <option value="all">All Leagues</option>
          <option value="bronze">Bronze</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="platinum">Platinum</option>
          <option value="diamond">Diamond</option>
        </select>
      </div>

      {isLoading ? (
        <div className="loading">Loading leaderboard...</div>
      ) : (
        <div className="leaderboard-table-wrapper">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Elo</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Win Rate</th>
                <th>League</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((player, index) => (
                <tr key={player.id} className={`rank-${index + 1}`}>
                  <td className="rank-badge">
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && `#${index + 1}`}
                  </td>
                  <td className="player-name">
                    <img src={player.avatar} alt={player.name} className="avatar-small" />
                    {player.name}
                  </td>
                  <td className="elo">{player.elo}</td>
                  <td className="wins">{player.wins}</td>
                  <td className="losses">{player.losses}</td>
                  <td className="win-rate">{player.winRate}%</td>
                  <td className={`league league-${player.league}`}>{player.league}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
