import { useState } from 'react'

const PARTY_EMOJIS = ['🎉', '🎊', '✨', '⭐', '🌟', '💫', '🎈', '🎀', '🦄', '🌈', '💥', '🍭', '🍬', '🎮', '👑', '🎆', '🪅', '🎇', '🥳', '🎵']

function makeParticles(count = 200) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: PARTY_EMOJIS[Math.floor(Math.random() * PARTY_EMOJIS.length)],
    left: Math.random() * 100,
    delay: Math.random() * 2.5,
    duration: 1.8 + Math.random() * 2,
    size: 1 + Math.random() * 1.4,
    rotation: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360),
  }))
}

export default function CrateReveal({ prize, score, streak, timeLabel, onNext, onQuit }) {
  const [opened, setOpened] = useState(false)
  const [party, setParty] = useState(false)
  const [particles] = useState(() => makeParticles(220))

  function triggerParty() {
    if (!party) setParty(true)
  }

  return (
    <div className="screen crate-screen">
      {party && (
        <div className="party-overlay">
          <div className="party-time-text">🎉 PARTY TIME 🎉</div>
          {particles.map(p => (
            <span
              key={p.id}
              className="party-particle"
              style={{
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                fontSize: `${p.size}rem`,
                '--end-rotation': `${p.rotation}deg`,
              }}
            >
              {p.emoji}
            </span>
          ))}
        </div>
      )}

      <h2 className="success-banner">✅ Correct!</h2>
      <p className="success-sub">
        {party
          ? '🎊 What a party! 🎊'
          : opened
          ? 'Tap your prize to celebrate!'
          : 'You earned a crate — tap to open it!'}
      </p>

      {!opened ? (
        <button className="crate-box" onClick={() => setOpened(true)} aria-label="open crate">
          <span className="crate-lid" />
          <span className="crate-front">📦</span>
          <span className="crate-hint">Tap to open</span>
        </button>
      ) : (
        <div className="prize-reveal">
          <div className="prize-burst">
            <span
              className={`prize-emoji${party ? ' prize-emoji-party' : ''}`}
              onClick={triggerParty}
              style={{ cursor: party ? 'default' : 'pointer' }}
              role={party ? undefined : 'button'}
              aria-label={party ? undefined : 'tap for party'}
            >
              {prize?.emoji}
            </span>
          </div>
          <p className="prize-label">{prize?.label}</p>
          {!party && <p className="prize-tap-hint">Tap it!</p>}
        </div>
      )}

      <div className="crate-stats">
        <span>Score: {score}</span>
        <span>⏱ {timeLabel}</span>
        <span>🔥 Streak: {streak}</span>
      </div>

      {opened && (
        <div className="crate-actions">
          <button className="next-btn" onClick={onNext}>Next Round →</button>
          <button className="quit-btn-alt" onClick={onQuit}>Quit to Menu</button>
        </div>
      )}
    </div>
  )
}
