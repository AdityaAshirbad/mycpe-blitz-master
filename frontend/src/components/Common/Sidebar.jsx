import React from 'react';
import { NavLink } from 'react-router-dom';
import { usePlayerStore } from '../../store/playerStore';
import { useUIStore } from '../../store/uiStore';

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Play', path: '/play' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Profile', path: '/profile' },
  { label: 'Admin', path: '/admin' },
];

export const Sidebar = () => {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const player = usePlayerStore((state) => state.player);

  return (
    <aside className={`app-sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-panel">
        <span className="kicker">Navigation</span>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-panel sidebar-spotlight">
        <span className="kicker">Quick Status</span>
        <h3>{player.name}</h3>
        <div className="sidebar-metrics">
          <div>
            <span>Points</span>
            <strong>{player.points}</strong>
          </div>
          <div>
            <span>Wins</span>
            <strong>{player.wins}</strong>
          </div>
        </div>
        <p>{player.streak} match streak and climbing toward {player.nextTitle}.</p>
      </div>
    </aside>
  );
};
