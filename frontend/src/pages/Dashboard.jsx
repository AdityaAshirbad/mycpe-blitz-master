import React from 'react';
import { Link } from 'react-router-dom';
import { usePlatformStore } from '../store/platformStore';

export const Dashboard = () => {
  const { currentPlayer, overview, tournaments, liveGames, activityFeed, matchmaking } = usePlatformStore((state) => state.data);

  return (
    <div className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="kicker">MYCPE ONE Chess Platform</span>
          <h1>Friendly competition with real momentum.</h1>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/play">
              Play now
            </Link>
            <Link className="btn btn-secondary" to="/leaderboard">
              See rankings
            </Link>
          </div>
        </div>

        <div className="hero-aside">
          <div className="metric-stack">
            <span className="metric-label">Current title</span>
            <strong>{currentPlayer.title}</strong>
            <small>{currentPlayer.points} ranking points</small>
          </div>
          <div className="metric-stack">
            <span className="metric-label">Coins ready</span>
            <strong>{currentPlayer.coins}</strong>
            <small>Weekly floor active every {overview.coinFloor}</small>
          </div>
          <div className="metric-stack">
            <span className="metric-label">This week</span>
            <strong>#{currentPlayer.weeklyRank}</strong>
            <small>{currentPlayer.streak} match win streak</small>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        {overview.kpis.map((item) => (
          <article key={item.label} className="stat-card">
            <span className="card-label">{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="content-grid two-third">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Command center</span>
              <h2>Highlights</h2>
            </div>
          </div>
          <div className="bullet-list">
            {overview.priorities.map((priority) => (
              <div key={priority} className="list-row">
                <span className="dot" />
                <p>{priority}</p>
              </div>
            ))}
          </div>

          <div className="mini-grid">
            {overview.successMetrics.map((metric) => (
              <div key={metric.label} className="mini-card">
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="panel emphasis-panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Personal pulse</span>
              <h2>{currentPlayer.name}</h2>
            </div>
            <span className="status-pill">{currentPlayer.status}</span>
          </div>
          <div className="profile-strips">
            <div>
              <span>Next title</span>
              <strong>{currentPlayer.nextTitle}</strong>
            </div>
            <div>
              <span>Points remaining</span>
              <strong>{currentPlayer.pointsToNext}</strong>
            </div>
            <div>
              <span>Most played opening</span>
              <strong>{currentPlayer.mostPlayedOpening}</strong>
            </div>
          </div>
          <div className="progress-rail">
            <div className="progress-fill" style={{ width: '62%' }} />
          </div>
          <div className="notification-list">
            {currentPlayer.notifications.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Challenge inbox</span>
              <h2>Incoming asks</h2>
            </div>
            <Link className="text-link" to="/play">
              Open challenge center
            </Link>
          </div>
          <div className="challenge-list">
            {matchmaking.pendingChallenges.map((challenge) => (
              <div key={challenge.id} className="challenge-row">
                <div>
                  <strong>{challenge.from}</strong>
                  <p>
                    {challenge.title} - {challenge.mode} - {challenge.bet} coins
                  </p>
                </div>
                <div className="challenge-meta">
                  <span>{challenge.expiresIn}</span>
                  <small>{challenge.message}</small>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Live now</span>
              <h2>Spectator-worthy games</h2>
            </div>
          </div>
          <div className="live-list">
            {liveGames.map((game) => (
              <div key={game.id} className="live-row">
                <div>
                  <strong>
                    {game.white} vs {game.black}
                  </strong>
                  <p>
                    {game.mode} - {game.move}
                  </p>
                </div>
                <div className="live-meta">
                  <span>{game.spectators} watching</span>
                  <small>{game.tension}</small>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Events</span>
              <h2>Tournaments and department play</h2>
            </div>
          </div>
          <div className="tile-list">
            {tournaments.map((event) => (
              <div key={event.name} className="tile-card">
                <span className="status-pill">{event.status}</span>
                <strong>{event.name}</strong>
                <p>{event.format}</p>
                <small>
                  {event.start} - {event.reward}
                </small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Social momentum</span>
              <h2>Portal activity feed</h2>
            </div>
          </div>
          <div className="activity-list">
            {activityFeed.map((item) => (
              <div key={`${item.author}-${item.action}`} className="activity-row">
                <strong>{item.author}</strong>
                <p>{item.action}</p>
                <small>{item.meta}</small>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};
