import { useEffect, useMemo, useRef, useState } from 'react'
import { DIFFICULTIES, makeRound } from '../data/colors.js'

export default function GameBoard({ difficulty, score, streak, onCorrect, onQuit }) {
  const config = DIFFICULTIES[difficulty] ?? DIFFICULTIES.basic

  // A round is regenerated whenever we re-enter the playing phase. Using a
  // local key bumps the round when the player returns from the crate screen.
  const [roundId] = useState(0)
  const round = useMemo(() => makeRound(difficulty), [difficulty, roundId])

  // Per-round timer: starts when the round begins, ticks live in the HUD.
  const startRef = useRef(Date.now())
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    startRef.current = Date.now()
    setElapsed(0)
    const id = setInterval(() => {
      setElapsed((Date.now() - startRef.current) / 1000)
    }, 100)
    return () => clearInterval(id)
  }, [round])

  function handleClick(box) {
    // Only the correct box does anything — wrong boxes are inert (no response).
    if (box.name === round.target.name) {
      onCorrect((Date.now() - startRef.current) / 1000)
    }
  }

  return (
    <div className="screen game">
      <div className="hud">
        <button className="quit-btn" onClick={onQuit}>← Menu</button>
        <div className="hud-stats">
          <span className="hud-score">Score: {score}</span>
          <span className="hud-time">⏱ {elapsed.toFixed(1)}s</span>
          <span className="hud-streak">🔥 Streak: {streak}</span>
        </div>
      </div>

      <p className="prompt">
        Click the <span className="prompt-color">{round.target.name}</span> box
      </p>

      <div className={`grid grid-${config.count <= 6 ? 'small' : 'large'}`}>
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
