import { useMemo, useState } from 'react'
import { DIFFICULTIES, makeRound } from '../data/colors.js'

export default function GameBoard({ difficulty, score, streak, timeLabel, onCorrect, onQuit }) {
  const config = DIFFICULTIES[difficulty] ?? DIFFICULTIES.easy

  // A round is regenerated whenever we re-enter the playing phase. Using a
  // local key bumps the round when the player returns from the crate screen.
  const [roundId] = useState(0)
  const round = useMemo(() => makeRound(difficulty), [difficulty, roundId])

  function handleClick(box) {
    // Only the correct box does anything — wrong boxes are inert (no response).
    if (box.name === round.target.name) {
      onCorrect()
    }
  }

  return (
    <div className="screen game">
      <div className="hud">
        <button className="quit-btn" onClick={onQuit}>← Menu</button>
        <div className="hud-stats">
          <span className="hud-score">Score: {score}</span>
          <span className="hud-time">⏱ {timeLabel}</span>
          <span className="hud-streak">🔥 Streak: {streak}</span>
        </div>
      </div>

      <p className="prompt">
        Click the <span className="prompt-color">{round.target.name}</span> box
      </p>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
          maxWidth: `${config.cols * 160}px`,
        }}
      >
        {round.boxes.map((box, index) => (
          <button
            key={`${box.name}-${index}`}
            className="color-box"
            style={{ backgroundColor: box.hex }}
            onClick={() => handleClick(box)}
            aria-label={`color box ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
