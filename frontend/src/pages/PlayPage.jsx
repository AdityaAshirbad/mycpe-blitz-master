import React from 'react';
import { useNavigate } from 'react-router-dom';
import { betTiers, timeControls } from '../data/platformData';
import { usePlatformStore } from '../store/platformStore';

export const PlayPage = () => {
  const navigate = useNavigate();
  const data = usePlatformStore((state) => state.data);
  const matchmaking = data.matchmaking || {};
  const queueSummary = matchmaking.queueSummary || {};
  const pendingChallenges = matchmaking.pendingChallenges || [];
  const computerOpponents = matchmaking.computerOpponents || [];
  const availablePlayers = matchmaking.availablePlayers || [];
  const sentChallenges = matchmaking.sentChallenges || [];
  const [selectedMode, setSelectedMode] = React.useState('blitz');
  const [selectedBet, setSelectedBet] = React.useState('standard');
  const [beginnerMode, setBeginnerMode] = React.useState(true);
  const [privacyMode, setPrivacyMode] = React.useState('public');

  const openGame = (opponentInput, options = {}) => {
    const opponent =
      typeof opponentInput === 'string'
        ? availablePlayers.find((player) => player.name === opponentInput)
        : opponentInput;

    if (!opponent) return;

    navigate('/game', {
      state: {
        opponent,
        timeControl: selectedMode,
        betTier: betTiers.find((bet) => bet.id === selectedBet),
        beginnerMode,
        privacyMode,
        ...options,
      },
    });
  };

  return (
    <div className="page-shell">
      <section className="hero-card compact-hero">
        <div className="hero-copy">
          <span className="kicker">Matchmaking and direct play</span>
          <h1>Start a game with the right stakes and context.</h1>
          <div className="hero-tags">
            <span className="hero-tag">Fast pairing</span>
            <span className="hero-tag">Practice bots</span>
            <span className="hero-tag">Custom stakes</span>
          </div>
        </div>
        <div className="hero-aside">
          <div className="metric-stack">
            <span className="metric-label">Average queue</span>
            <strong>{queueSummary.averageWait}</strong>
            <small>{queueSummary.rankWindow}</small>
          </div>
          <div className="metric-stack">
            <span className="metric-label">Accept window</span>
            <strong>{queueSummary.acceptanceWindow}</strong>
            <small>Both players must confirm</small>
          </div>
        </div>
      </section>

      <section className="content-grid two-third">
        <article className="panel emphasis-panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Play now</span>
              <h2>Queue builder</h2>
            </div>
          </div>

          <div className="choice-grid">
            {timeControls.map((control) => (
              <button
                key={control.id}
                type="button"
                className={`choice-card ${selectedMode === control.id ? 'active' : ''}`}
                onClick={() => setSelectedMode(control.id)}
              >
                <strong>{control.label}</strong>
                <span>
                  {control.duration} {control.increment}
                </span>
                <small>{control.audience}</small>
              </button>
            ))}
          </div>

          <div className="choice-grid">
            {betTiers.map((tier) => (
              <button
                key={tier.id}
                type="button"
                className={`choice-card ${selectedBet === tier.id ? 'active' : ''}`}
                onClick={() => setSelectedBet(tier.id)}
              >
                <strong>{tier.label}</strong>
                <span>{tier.coins} coins</span>
                <small>Matched stake on both sides</small>
              </button>
            ))}
          </div>

          <div className="switch-row">
            <label>
              <span>Beginner mode</span>
              <small>Show legal move hints and teaching overlays.</small>
            </label>
            <button type="button" className={`toggle ${beginnerMode ? 'on' : ''}`} onClick={() => setBeginnerMode((value) => !value)}>
              <span />
            </button>
          </div>

          <div className="segment-row">
            <button
              type="button"
              className={privacyMode === 'public' ? 'segment active' : 'segment'}
              onClick={() => setPrivacyMode('public')}
            >
              Public game
            </button>
            <button
              type="button"
              className={privacyMode === 'private' ? 'segment active' : 'segment'}
              onClick={() => setPrivacyMode('private')}
            >
              Private game
            </button>
          </div>

          <div className="inline-actions">
            <button type="button" className="btn btn-primary" onClick={() => openGame('Daniel Cruz')}>
              Start matched game
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => openGame('Priya Raman')}>
              Accept featured challenge
            </button>
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Challenge inbox</span>
              <h2>Incoming challenges</h2>
            </div>
          </div>
          <div className="challenge-list">
            {pendingChallenges.map((challenge) => (
              <div key={challenge.id} className="challenge-row">
                <div>
                  <strong>{challenge.from}</strong>
                  <p>
                    {challenge.mode} - {challenge.bet} coins - {challenge.record}
                  </p>
                  <small>{challenge.message}</small>
                </div>
                <button type="button" className="btn btn-secondary" onClick={() => openGame(challenge.from)}>
                  Accept
                </button>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel emphasis-panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Practice mode</span>
              <h2>Play against the computer</h2>
            </div>
          </div>
          <div className="tile-list">
            {computerOpponents.map((bot) => (
              <div key={bot.id} className="tile-card">
                <strong>{bot.name}</strong>
                <p>
                  {bot.title} - {bot.preferredMode}
                </p>
                <small>{bot.summary}</small>
                <span className="meta-chip meta-chip-inline">{bot.difficulty}</span>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    openGame(
                      {
                        ...bot,
                        isComputer: true,
                      },
                      {
                        computerDifficulty: bot.difficulty,
                        privacyMode: 'private',
                      },
                    )
                  }
                >
                  Play vs computer
                </button>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Player directory</span>
              <h2>Available opponents</h2>
            </div>
          </div>
          <div className="directory-list">
            {availablePlayers.map((player) => (
              <div key={player.id} className="directory-row">
                <div>
                  <strong>{player.name}</strong>
                  <p>
                    {player.title} - {player.department} - prefers {player.preferredMode}
                  </p>
                </div>
                <div className="directory-meta">
                  <span className="meta-chip">{player.status}</span>
                  <button type="button" className="btn btn-secondary" onClick={() => openGame(player.name)}>
                    Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="kicker">Outbox</span>
              <h2>Sent challenges</h2>
            </div>
          </div>
          <div className="tile-list">
            {sentChallenges.map((challenge) => (
              <div key={challenge.id} className="tile-card">
                <strong>{challenge.to}</strong>
                <p>
                  {challenge.mode} - {challenge.bet} coins
                </p>
                <small>{challenge.status}</small>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};
