import React from 'react';
import { useSocialStore } from '../../store/socialStore';
import { apiService } from '../../services/apiService';
import { Button } from '../Common/CommonComponents';
import '../../styles/Social.css';

export const ChallengesCard = () => {
  const pendingChallenges = useSocialStore(state => state.pendingChallenges);
  const removePendingChallenge = useSocialStore(state => state.removePendingChallenge);

  const handleAccept = async (challengeId) => {
    try {
      await apiService.acceptChallenge(challengeId);
      removePendingChallenge(challengeId);
    } catch (error) {
      console.error('Error accepting challenge:', error);
    }
  };

  const handleReject = async (challengeId) => {
    try {
      await apiService.rejectChallenge(challengeId);
      removePendingChallenge(challengeId);
    } catch (error) {
      console.error('Error rejecting challenge:', error);
    }
  };

  return (
    <div className="challenges-card">
      <h3>Pending Challenges ({pendingChallenges.length})</h3>
      
      {pendingChallenges.length === 0 ? (
        <p className="empty-state">No pending challenges</p>
      ) : (
        <div className="challenges-list">
          {pendingChallenges.map(challenge => (
            <div key={challenge.id} className="challenge-item">
              <div className="challenge-header">
                <img 
                  src={challenge.opponent.avatar} 
                  alt={challenge.opponent.name}
                  className="challenge-avatar"
                />
                <div className="challenge-info">
                  <div className="opponent-name">{challenge.opponent.name}</div>
                  <div className="challenge-bet">
                    <span className="coin-icon">🪙</span> {challenge.betAmount} coins
                  </div>
                </div>
              </div>
              
              <div className="challenge-actions">
                <Button 
                  variant="success" 
                  size="sm"
                  onClick={() => handleAccept(challenge.id)}
                >
                  ✓ Accept
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleReject(challenge.id)}
                >
                  ✗ Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
