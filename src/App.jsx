import { useEffect, useRef, useState } from 'react'
import StartMenu from './components/StartMenu.jsx'
import GameBoard from './components/GameBoard.jsx'
import CrateReveal from './components/CrateReveal.jsx'
import { DIFFICULTIES } from './data/colors.js'
import { makePrizeBag } from './data/prizes.js'
import './App.css'

const BEST_SCORE_KEY = 'colorCrates.bestScore'

// Format total seconds as "Xs" or "Mm Ss".
function formatTime(seconds) {
  const total = Math.floor(seconds)
  const m = Math.floor(total / 60)
  const s = total % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

export default function App() {
  const [phase, setPhase] = useState('menu') // 'menu' | 'playing' | 'crate'
  const [difficulty, setDifficulty] = useState('easy')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [currentPrize, setCurrentPrize] = useState(null)
  // Total seconds spent in the current game. It does NOT tick live — it's a
  // static snapshot refreshed only when the player interacts (correct pick or
  // advancing a round), giving a sense of time spent so far.
  const [totalTime, setTotalTime] = useState(0)
  const gameStart = useRef(Date.now())
  // Draws prizes without repeats until the whole pool has been seen.
  const drawPrize = useRef(makePrizeBag()).current
  const [bestScore, setBestScore] = useState(() => {
    const saved = Number(localStorage.getItem(BEST_SCORE_KEY))
    return Number.isFinite(saved) ? saved : 0
  })

  // Persist best score whenever it improves.
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem(BEST_SCORE_KEY, String(score))
    }
  }, [score, bestScore])

  // Snapshot of elapsed game time at this interaction.
  function refreshTime() {
    setTotalTime((Date.now() - gameStart.current) / 1000)
  }

  function startGame(difficultyKey) {
    setDifficulty(difficultyKey)
    setScore(0)
    setStreak(0)
    gameStart.current = Date.now()
    setTotalTime(0)
    setPhase('playing')
  }

  function handleCorrect() {
    const config = DIFFICULTIES[difficulty] ?? DIFFICULTIES.easy
    const newStreak = streak + 1
    // Small streak bonus to reward consecutive hits.
    const gained = config.points + Math.max(0, newStreak - 1) * 2
    setStreak(newStreak)
    setScore((s) => s + gained)
    refreshTime()
    setCurrentPrize(drawPrize())
    setPhase('crate')
  }

  function nextRound() {
    refreshTime()
    setPhase('playing')
  }

  function quitToMenu() {
    setPhase('menu')
  }

  return (
    <div className="app">
      {phase === 'menu' && (
        <StartMenu bestScore={bestScore} onStart={startGame} />
      )}

      {phase === 'playing' && (
        <GameBoard
          difficulty={difficulty}
          score={score}
          streak={streak}
          timeLabel={formatTime(totalTime)}
          onCorrect={handleCorrect}
          onQuit={quitToMenu}
        />
      )}

      {phase === 'crate' && (
        <CrateReveal
          prize={currentPrize}
          score={score}
          streak={streak}
          timeLabel={formatTime(totalTime)}
          onNext={nextRound}
          onQuit={quitToMenu}
        />
      )}
    </div>
  )
}
