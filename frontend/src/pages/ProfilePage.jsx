import React from 'react';
import { usePlatformStore } from '../store/platformStore';

export const ProfilePage = () => {
  const { currentPlayer, profile } = usePlatformStore((state) => state.data);

  return (
    <div className="page-shell">
      <section className="hero-card compact-hero">
        <div className="hero-copy">
          <span className="kicker">Personal statistics dashboard</span>
          <h1>{currentPlayer.name}</h1>
        </div>
        <div className="hero-aside">
          <div className="metric-stack">
            <span className="metric-label">Role</span>
            <strong>{currentPlayer.role}</strong>
            <small>{currentPlayer.department} department</small>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span className="card-label">Overall record</span>
          <strong>
            {currentPlayer.wins}-{currentPlayer.losses}-{currentPlayer.draws}
          </strong>
          <p>{currentPlayer.winRate}% win rate</p>
        </article>
        <article className="stat-card">
          <span className="card-label">Current rank</span>
          <strong>
            {currentPlayer.title} #{currentPlayer.weeklyRank}
          </strong>
          <p>{currentPlayer.points} ranking points</p>
        </article>
        <article className="stat-card">
          <span className="card-label">Economy</span>
          <strong>{currentPlayer.coins} coins</strong>
          <p>Weekly floor protection {currentPlayer.weeklyCoinFloorProtected ? 'used' : 'unused'}</p>
        </article>
        <article className="stat-card">
          <span className="card-label">Form</span>
          <strong>{currentPlayer.streak} straight wins</strong>
          <p>Best streak: {currentPlayer.bestStreak}</p>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">By format</span>
              <h2>Time control performance</h2>
            </div>
          </div>
          <div className="tile-list">
            {currentPlayer.timeControlBreakdown.map((mode) => (
              <div key={mode.mode} className="tile-card">
                <strong>{mode.mode}</strong>
                <p>{mode.winRate} win rate</p>
                <small>{mode.games} games played</small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Rivalries</span>
              <h2>Head-to-head records</h2>
            </div>
          </div>
          <div className="tile-list">
            {profile.headToHead.map((entry) => (
              <div key={entry.opponent} className="tile-card">
                <strong>{entry.opponent}</strong>
                <p>{entry.record}</p>
                <small>
                  {entry.status} - {entry.note}
                </small>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Achievements</span>
              <h2>Badges and progress</h2>
            </div>
          </div>
          <div className="tile-list">
            {currentPlayer.badges.map((badge) => (
              <div key={badge.id} className="tile-card">
                <strong>{badge.name}</strong>
                <p>{badge.description}</p>
                <small>{badge.progress}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Recent form</span>
              <h2>Match history</h2>
            </div>
          </div>
          <div className="table-card">
            <div className="table-row table-head">
              <span>Opponent</span>
              <span>Result</span>
              <span>Mode</span>
              <span>Bet</span>
              <span>Impact</span>
            </div>
            {profile.matchHistory.map((match) => (
              <div key={`${match.opponent}-${match.mode}-${match.result}`} className="table-row">
                <span>{match.opponent}</span>
                <span>{match.result}</span>
                <span>{match.mode}</span>
                <span>{match.bet}</span>
                <span>{match.change}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};
