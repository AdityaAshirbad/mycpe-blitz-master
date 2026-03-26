import React, { useEffect } from 'react';
import { usePlayerStore } from '../../store/playerStore';
import { useLeaderboardStore } from '../../store/leaderboardStore';
import { apiService } from '../../services/apiService';
import '../../styles/Leaderboard.css';

export const PersonalRankCard = () => {
  const player = usePlayerStore(state => state.player);
  const personalRank = useLeaderboardStore(state => state.personalRank);
  const setPersonalRank = useLeaderboardStore(state => state.setPersonalRank);

  const fetchPersonalRank = React.useCallback(async () => {
    try {
      const response = await apiService.getPersonalRank();
      setPersonalRank(response.data);
    } catch (error) {
      console.error('Error fetching personal rank:', error);
    }
  }, [setPersonalRank]);

  useEffect(() => {
    fetchPersonalRank();
  }, [fetchPersonalRank]);

  const leagueEmoji = {
    bronze: '🥉',
    silver: '⚪',
    gold: '🟡',
    platinum: '🔵',
    diamond: '💎',
  };

  return (
    <div className="personal-rank-card">
      <div className="rank-header">
        <h3>Your Rank</h3>
        <span className="league-badge">
          {leagueEmoji[player.league]} {player.league.toUpperCase()}
        </span>
      </div>

      <div className="rank-content">
        <div className="rank-row">
          <span className="label">Global Rank:</span>
          <span className="value">#{personalRank?.rank || 'N/A'}</span>
        </div>
        <div className="rank-row">
          <span className="label">Elo Rating:</span>
          <span className="value">{player.elo}</span>
        </div>
        <div className="rank-row">
          <span className="label">Win Rate:</span>
          <span className="value">{player.winRate}%</span>
        </div>
        <div className="rank-row">
          <span className="label">Record:</span>
          <span className="value">{player.wins}W - {player.losses}L</span>
        </div>
      </div>

      <div className="rank-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(player.wins / (player.wins + player.losses)) * 100}%` }}
          ></div>
        </div>
        <p className="progress-label">Progress to next league</p>
      </div>
    </div>
  );
};
