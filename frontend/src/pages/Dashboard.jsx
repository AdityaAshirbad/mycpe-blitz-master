import React from 'react';
import { Link } from 'react-router-dom';
import { usePlatformStore } from '../store/platformStore';

const chartPalette = ['#165d86', '#2f7a68', '#4d9ac1', '#7bb39f', '#d4e6f3'];

const parseNumericValue = (value) => {
  if (typeof value === 'number') return value;
  const normalized = String(value).replace('%', '').replace('s', '');
  return Number.parseFloat(normalized) || 0;
};

export const Dashboard = () => {
  const { currentPlayer, overview, tournaments, liveGames, activityFeed, matchmaking, leaderboard, profile } = usePlatformStore((state) => state.data);

  const departmentLeaders = [...leaderboard.departments].sort((a, b) => b.score - a.score);
  const maxDepartmentScore = Math.max(...departmentLeaders.map((item) => item.score), 1);
  const topPlayers = [...leaderboard.weekly].sort((a, b) => b.points - a.points).slice(0, 5);
  const maxPlayerPoints = Math.max(...topPlayers.map((item) => item.points), 1);
  const maxSpectators = Math.max(...liveGames.map((game) => game.spectators), 1);
  const timeBreakdown = currentPlayer.timeControlBreakdown.map((item) => ({
    ...item,
    winRateValue: parseNumericValue(item.winRate),
  }));
  const maxGames = Math.max(...timeBreakdown.map((item) => item.games), 1);
  const coinImpact = profile.matchHistory.map((match) => {
    const coinMatch = match.change.match(/([+-]\d+)\s*coins/i);
    return {
      ...match,
      coinDelta: coinMatch ? Number.parseInt(coinMatch[1], 10) : 0,
    };
  });
  const maxCoinSwing = Math.max(...coinImpact.map((match) => Math.abs(match.coinDelta)), 1);

  return (
    <div className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="kicker">MYCPE ONE CHESS MASTER</span>
          <h1>Friendly competition with real momentum.</h1>
          <div className="hero-tags">
            <span className="hero-tag">Live ladder</span>
            <span className="hero-tag">Private matches</span>
            <span className="hero-tag">Bot practice</span>
          </div>
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

      <section className="analytics-grid">
        <article className="panel analytics-panel analytics-panel-wide">
          <div className="panel-heading">
            <div>
              <span className="kicker">Departments</span>
              <h2>Standings by score</h2>
            </div>
          </div>
          <div className="bar-list">
            {departmentLeaders.map((department, index) => (
              <div key={department.name} className="bar-row">
                <div className="bar-copy">
                  <strong>{department.name}</strong>
                  <small>{department.leader}</small>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(department.score / maxDepartmentScore) * 100}%`,
                      background: chartPalette[index % chartPalette.length],
                    }}
                  />
                </div>
                <span className="bar-value">{department.score}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel analytics-panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Leaderboard</span>
              <h2>Top player points</h2>
            </div>
          </div>
          <div className="column-chart">
            {topPlayers.map((player, index) => (
              <div key={player.name} className="column-item">
                <div className="column-value">{player.points}</div>
                <div className="column-track">
                  <div
                    className="column-fill"
                    style={{
                      height: `${(player.points / maxPlayerPoints) * 100}%`,
                      background: chartPalette[index % chartPalette.length],
                    }}
                  />
                </div>
                <div className="column-label">{player.name.split(' ')[0]}</div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel analytics-panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Live interest</span>
              <h2>Spectators per game</h2>
            </div>
          </div>
          <div className="bar-list">
            {liveGames.map((game, index) => (
              <div key={game.id} className="bar-row">
                <div className="bar-copy">
                  <strong>{game.white.split(' ')[0]} vs {game.black.split(' ')[0]}</strong>
                  <small>{game.mode}</small>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(game.spectators / maxSpectators) * 100}%`,
                      background: chartPalette[index % chartPalette.length],
                    }}
                  />
                </div>
                <span className="bar-value">{game.spectators}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel analytics-panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Personal form</span>
              <h2>Performance by mode</h2>
            </div>
          </div>
          <div className="dual-metric-list">
            {timeBreakdown.map((mode, index) => (
              <div key={mode.mode} className="dual-metric-row">
                <div className="dual-metric-copy">
                  <strong>{mode.mode}</strong>
                  <small>{mode.games} games</small>
                </div>
                <div className="dual-bars">
                  <div className="mini-track">
                    <div
                      className="mini-fill"
                      style={{
                        width: `${(mode.games / maxGames) * 100}%`,
                        background: chartPalette[index % chartPalette.length],
                      }}
                    />
                  </div>
                  <div className="mini-track win-track">
                    <div
                      className="mini-fill"
                      style={{
                        width: `${mode.winRateValue}%`,
                        background: '#2f7a68',
                      }}
                    />
                  </div>
                </div>
                <span className="dual-metric-value">{mode.winRate}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel analytics-panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Economy</span>
              <h2>Recent coin impact</h2>
            </div>
          </div>
          <div className="impact-list">
            {coinImpact.map((match) => (
              <div key={`${match.opponent}-${match.mode}-${match.result}`} className="impact-row">
                <div className="impact-copy">
                  <strong>{match.opponent}</strong>
                  <small>{match.mode} · {match.result}</small>
                </div>
                <div className="impact-track">
                  <div
                    className={`impact-fill ${match.coinDelta >= 0 ? 'positive' : 'negative'}`}
                    style={{
                      width: `${(Math.abs(match.coinDelta) / maxCoinSwing) * 100}%`,
                    }}
                  />
                </div>
                <span className={`impact-value ${match.coinDelta >= 0 ? 'positive' : 'negative'}`}>
                  {match.coinDelta > 0 ? `+${match.coinDelta}` : match.coinDelta}
                </span>
              </div>
            ))}
          </div>
        </article>
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
                  <span className="meta-chip">{challenge.expiresIn}</span>
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
                  <span className="meta-chip">{game.spectators} watching</span>
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
