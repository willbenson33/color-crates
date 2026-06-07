import { useMemo, useState } from 'react'
import { DIFFICULTIES, makeRound } from '../data/colors.js'

export default function GameBoard({ difficulty, score, streak, hardcore, timeLabel, onCorrect, onWrong, onLose, onQuit }) {
  const config = DIFFICULTIES[difficulty] ?? DIFFICULTIES.easy

  // A round is regenerated whenever we re-enter the playing phase. Using a
  // local key bumps the round when the player returns from the crate screen.
  const [roundId] = useState(0)
  const round = useMemo(() => makeRound(difficulty), [difficulty, roundId])
  // Whether the player has already picked wrong on this board. A missed round
  // can still be completed by finding the right color, but it earns no points
  // and keeps the streak broken.
  const [missed, setMissed] = useState(false)
  // Bumped on every wrong pick so the "Try again!" flash restarts its animation
  // even on consecutive misses (the changing key remounts the banner).
  const [tryAgainKey, setTryAgainKey] = useState(0)
  // Hardcore death sequence: a skull engulfs the screen before we bail to menu.
  const [dying, setDying] = useState(false)

  function handleClick(box) {
    if (dying) return
    if (box.name === round.target.name) {
      onCorrect(missed)
    } else if (hardcore) {
      // Hardcore: a single wrong pick ends the run. Play the death animation,
      // then onLose() fires when the skull finishes engulfing the screen.
      setDying(true)
    } else {
      // A wrong pick interrupts the streak and forfeits this round's points,
      // but the player can keep trying the same board to win the crate.
      setMissed(true)
      setTryAgainKey((k) => k + 1)
      onWrong()
    }
  }

  return (
    <div className="screen game">
      {dying && (
        <div className="hardcore-death">
          <span className="death-skull" onAnimationEnd={onLose}>💀</span>
        </div>
      )}

      {tryAgainKey > 0 && (
        <div key={tryAgainKey} className="try-again-flash">
          Try again!
        </div>
      )}

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
