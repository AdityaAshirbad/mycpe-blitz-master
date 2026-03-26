import React from 'react';
import { usePlayerStore } from '../../store/playerStore';
import { useUIStore } from '../../store/uiStore';

export const Header = () => {
  const player = usePlayerStore((state) => state.player);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <header className="app-header">
      <div className="header-brand">
        <button type="button" className="ghost-button mobile-only" onClick={toggleSidebar} aria-label="Toggle navigation">
          Menu
        </button>
        <div>
          <span className="kicker">MYCPE ONE</span>
          <h2>Chess Command</h2>
        </div>
      </div>

      <div className="header-summary">
        <div className="summary-pill">
          <span>Coins</span>
          <strong>{player.coins}</strong>
        </div>
        <div className="summary-pill">
          <span>Rank</span>
          <strong>{player.title || player.league}</strong>
        </div>
        <div className="summary-pill player-pill">
          <img src={player.avatar} alt={player.name} />
          <div>
            <span>{player.name}</span>
            <strong>{player.department}</strong>
          </div>
        </div>
      </div>
    </header>
  );
};
