import { useState } from 'react'

// Desserts the mystery gift can turn into when opened. One is picked at random,
// and every confetti particle rains down as that same dessert.
const DESSERT_EMOJIS = ['🍰', '🧁', '🍩', '🍪', '🍫', '🍬', '🍭', '🍮', '🍦', '🍨', '🍧', '🥧', '🍡', '🍯', '🥮']

function randomDessert() {
  return DESSERT_EMOJIS[Math.floor(Math.random() * DESSERT_EMOJIS.length)]
}

function makeTopParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: `t${i}`,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: (1.8 + Math.random() * 2) * 1.5,
    size: 1 + Math.random() * 1.4,
    rotation: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360),
  }))
}

function makeBottomParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: `b${i}`,
    left: Math.random() * 100,
    delay: Math.random() * 2.5,
    duration: (1.5 + Math.random() * 2) * 1.5,
    size: 0.9 + Math.random() * 1.3,
    rotation: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360),
    rise: -(50 + Math.random() * 70),
    drift: (Math.random() - 0.5) * 40,
  }))
}

export default function CrateReveal({ prize, score, streak, timeLabel, onNext, onQuit }) {
  const [opened, setOpened] = useState(false)
  const [party, setParty] = useState(false)
  // The dessert the gift turns into — picked when the party is triggered.
  const [dessert, setDessert] = useState(null)
  const [topParticles] = useState(() => makeTopParticles(110))
  const [botParticles] = useState(() => makeBottomParticles(110))

  function triggerParty() {
    if (!party) {
      setDessert(randomDessert())
      setParty(true)
    }
  }

  // After the gift is opened into a dessert, show that dessert in its place.
  const displayEmoji = party && dessert ? dessert : prize?.emoji

  return (
    <div className="screen crate-screen">
      {party && (
        <div className="party-overlay">
          <div className="party-time-text">🎉 PARTY TIME 🎉</div>
          {topParticles.map(p => (
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
              {dessert}
            </span>
          ))}
          {botParticles.map(p => (
            <span
              key={p.id}
              className="party-particle-bottom"
              style={{
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                fontSize: `${p.size}rem`,
                '--end-rotation': `${p.rotation}deg`,
                '--rise': `${p.rise}vh`,
                '--drift': `${p.drift}vw`,
              }}
            >
              {dessert}
            </span>
          ))}
        </div>
      )}

      <h2 className="success-banner">✅ Correct!</h2>
      <p className="success-sub">
        {party
          ? '🎊 What a party! 🎊'
          : opened
          ? prize?.emoji === '🎁' ? 'Tap your prize to celebrate!' : 'You won a prize!'
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
              onClick={prize?.emoji === '🎁' ? triggerParty : undefined}
              style={{ cursor: prize?.emoji === '🎁' && !party ? 'pointer' : 'default' }}
              role={prize?.emoji === '🎁' && !party ? 'button' : undefined}
              aria-label={prize?.emoji === '🎁' && !party ? 'tap for party' : undefined}
            >
              {displayEmoji}
            </span>
          </div>
          <p className="prize-label">{prize?.label}</p>
          {prize?.emoji === '🎁' && !party && <p className="prize-tap-hint">Tap it!</p>}
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
