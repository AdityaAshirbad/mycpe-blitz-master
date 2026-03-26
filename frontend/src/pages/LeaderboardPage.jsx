import React from 'react';
import { usePlatformStore } from '../store/platformStore';

export const LeaderboardPage = () => {
  const data = usePlatformStore((state) => state.data);

  return (
    <div className="page-shell">
      <section className="hero-card compact-hero">
        <div className="hero-copy">
          <span className="kicker">Rankings and recognition</span>
          <h1>Weekly ladder, department pride, and long-term memory.</h1>
        </div>
        <div className="hero-aside">
          <div className="metric-stack">
            <span className="metric-label">Leaderboard reset</span>
            <strong>{data.overview.leaderboardReset}</strong>
            <small>Snapshots stored permanently</small>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Weekly standings</span>
              <h2>Company leaderboard</h2>
            </div>
          </div>
          <div className="table-card">
            <div className="table-row table-head">
              <span>Rank</span>
              <span>Player</span>
              <span>Title</span>
              <span>Department</span>
              <span>Points</span>
              <span>Delta</span>
            </div>
            {data.leaderboard.weekly.map((entry) => (
              <div key={`${entry.rank}-${entry.name}`} className="table-row">
                <span>#{entry.rank}</span>
                <span>{entry.name}</span>
                <span>{entry.title}</span>
                <span>{entry.department}</span>
                <span>{entry.points}</span>
                <span>{entry.delta}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Legacy</span>
              <h2>Hall of Fame</h2>
            </div>
          </div>
          <div className="tile-list">
            {data.leaderboard.hallOfFame.map((week) => (
              <div key={week.week} className="tile-card">
                <strong>{week.week}</strong>
                <p>Champion: {week.champion}</p>
                <small>
                  Runner-up: {week.runnerUp} - Third: {week.third}
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
              <span className="kicker">Department challenge</span>
              <h2>Team standings</h2>
            </div>
          </div>
          <div className="tile-list">
            {data.leaderboard.departments.map((department) => (
              <div key={department.name} className="tile-card">
                <strong>{department.name}</strong>
                <p>{department.score} points</p>
                <small>
                  Trend {department.trend} - Leader {department.leader}
                </small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel emphasis-panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Upcoming pressure</span>
              <h2>Events tied to the ladder</h2>
            </div>
          </div>
          <div className="bullet-list">
            {data.tournaments.map((tournament) => (
              <div key={tournament.name} className="list-row">
                <span className="dot" />
                <p>
                  <strong>{tournament.name}</strong> - {tournament.status} - {tournament.reward}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};
