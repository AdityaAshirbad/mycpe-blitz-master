import React, { useState } from 'react';
import { useSocialStore } from '../../store/socialStore';
import { usePlayerStore } from '../../store/playerStore';
import { apiService } from '../../services/apiService';
import { Modal, Button } from '../Common/CommonComponents';
import '../../styles/Social.css';

export const InvitePlayerModal = ({ isOpen, onClose }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [betAmount, setBetAmount] = useState(100);
  const suggestions = useSocialStore(state => state.suggestions);
  const setSuggestions = useSocialStore(state => state.setSuggestions);
  const player = usePlayerStore(state => state.player);

  const fetchSuggestions = React.useCallback(async () => {
    try {
      const response = await apiService.getPlayerSuggestions();
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }, [setSuggestions]);

  React.useEffect(() => {
    if (isOpen) {
      fetchSuggestions();
    }
  }, [fetchSuggestions, isOpen]);

  const handleSendChallenge = async () => {
    if (!selectedPlayer) return;

    try {
      await apiService.sendChallenge(selectedPlayer.id, betAmount);
      onClose();
      setSelectedPlayer(null);
      setBetAmount(100);
    } catch (error) {
      console.error('Error sending challenge:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} title="Invite Player" onClose={onClose}>
      <div className="invite-form">
        <div className="form-group">
          <label>Select Player</label>
          <div className="player-list">
            {suggestions.map(player => (
              <div
                key={player.id}
                className={`player-item ${selectedPlayer?.id === player.id ? 'selected' : ''}`}
                onClick={() => setSelectedPlayer(player)}
              >
                <img src={player.avatar} alt={player.name} className="player-avatar-small" />
                <div className="player-details">
                  <div className="player-name">{player.name}</div>
                  <div className="player-elo">Elo: {player.elo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Bet Amount</label>
          <div className="bet-selector">
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
            />
            <div className="bet-display">
              <span className="coin-icon">🪙</span>
              <span className="bet-value">{betAmount}</span>
            </div>
          </div>
          <p className="your-balance">Your balance: {player.coins} coins</p>
        </div>

        <div className="form-actions">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button 
            variant="primary" 
            onClick={handleSendChallenge}
            disabled={!selectedPlayer || betAmount > player.coins}
          >
            Send Challenge
          </Button>
        </div>
      </div>
    </Modal>
  );
};
