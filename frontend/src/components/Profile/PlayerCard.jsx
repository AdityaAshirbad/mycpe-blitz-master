import React from 'react';
import { usePlayerStore } from '../../store/playerStore';
import { apiService } from '../../services/apiService';
import { Button } from '../Common/CommonComponents';
import '../../styles/Profile.css';

export const PlayerCard = ({ playerId }) => {
  const [playerData, setPlayerData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const currentPlayer = usePlayerStore(state => state.player);

  const fetchPlayer = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getPlayerProfile(playerId);
      setPlayerData(response.data);
    } catch (error) {
      console.error('Error fetching player:', error);
    } finally {
      setIsLoading(false);
    }
  }, [playerId]);

  React.useEffect(() => {
    fetchPlayer();
  }, [fetchPlayer]);

  if (!playerData || isLoading) {
    return <div>Loading...</div>;
  }

  const leagueEmoji = {
    bronze: '🥉',
    silver: '⚪',
    gold: '🟡',
    platinum: '🔵',
    diamond: '💎',
  };

  return (
    <div className="player-card">
      <div className="player-header-section">
        <img src={playerData.avatar} alt={playerData.name} className="player-large-avatar" />
        <div className="player-basic-info">
          <h2>{playerData.name}</h2>
          <div className="player-badges">
            <span className="league-badge">
              {leagueEmoji[playerData.league]} {playerData.league.toUpperCase()}
            </span>
            <span className="elo-badge">⭐ {playerData.elo}</span>
          </div>
        </div>
      </div>

      <div className="player-stats-grid">
        <div className="stat-item">
          <div className="stat-label">Wins</div>
          <div className="stat-value">{playerData.wins}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Losses</div>
          <div className="stat-value">{playerData.losses}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Win Rate</div>
          <div className="stat-value">{playerData.winRate}%</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Level</div>
          <div className="stat-value">{playerData.level}</div>
        </div>
      </div>

      {currentPlayer.id !== playerId && (
        <div className="player-actions">
          <Button variant="primary">Challenge</Button>
          <Button variant="secondary">Add Friend</Button>
        </div>
      )}
    </div>
  );
};
