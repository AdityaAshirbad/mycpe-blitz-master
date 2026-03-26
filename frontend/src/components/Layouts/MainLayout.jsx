import React from 'react';
import { Header } from '../Common/Header';
import { Sidebar } from '../Common/Sidebar';

export const MainLayout = ({ children }) => (
  <div className="app-shell">
    <Header />
    <div className="app-body">
      <Sidebar />
      <main className="app-main">{children}</main>
    </div>
  </div>
);
