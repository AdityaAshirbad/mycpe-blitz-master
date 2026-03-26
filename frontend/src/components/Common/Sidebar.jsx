import React from 'react';
import { NavLink } from 'react-router-dom';
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
    </aside>
  );
};
