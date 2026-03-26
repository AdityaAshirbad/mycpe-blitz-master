import React from 'react';
import { usePlatformStore } from '../store/platformStore';

export const AdminPage = () => {
  const data = usePlatformStore((state) => state.data);

  return (
    <div className="page-shell">
      <section className="hero-card compact-hero">
        <div className="hero-copy">
          <span className="kicker">Admin and HR operations</span>
          <h1>Event control, moderation, and engagement health.</h1>
        </div>
      </section>

      <section className="stats-grid">
        {data.overview.kpis.map((item) => (
          <article key={item.label} className="stat-card">
            <span className="card-label">{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Quick actions</span>
              <h2>Admin controls</h2>
            </div>
          </div>
          <div className="tile-list">
            {data.admin.actions.map((action) => (
              <div key={action} className="tile-card">
                <strong>{action}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="panel emphasis-panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Moderation</span>
              <h2>Flagged games queue</h2>
            </div>
          </div>
          <div className="tile-list">
            {data.admin.moderationQueue.map((item) => (
              <div key={item.id} className="tile-card">
                <strong>{item.players}</strong>
                <p>{item.reason}</p>
                <small>{item.severity} severity</small>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};
