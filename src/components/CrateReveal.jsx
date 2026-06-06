import { useState } from 'react'

export default function CrateReveal({ prize, score, streak, onNext, onQuit }) {
  const [opened, setOpened] = useState(false)

  return (
    <div className="screen crate-screen">
      <h2 className="success-banner">✅ Correct!</h2>
      <p className="success-sub">
        {opened ? 'You won a prize!' : 'You earned a crate — tap to open it!'}
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
            <span className="prize-emoji">{prize?.emoji}</span>
          </div>
          <p className="prize-label">{prize?.label}</p>
        </div>
      )}

      <div className="crate-stats">
        <span>Score: {score}</span>
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
