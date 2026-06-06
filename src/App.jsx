import { useEffect, useState } from 'react'
import StartMenu from './components/StartMenu.jsx'
import GameBoard from './components/GameBoard.jsx'
import CrateReveal from './components/CrateReveal.jsx'
import { DIFFICULTIES } from './data/colors.js'
import { randomPrize } from './data/prizes.js'
import './App.css'

const BEST_SCORE_KEY = 'colorCrates.bestScore'

export default function App() {
  const [phase, setPhase] = useState('menu') // 'menu' | 'playing' | 'crate'
  const [difficulty, setDifficulty] = useState('basic')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [currentPrize, setCurrentPrize] = useState(null)
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

  function startGame(difficultyKey) {
    setDifficulty(difficultyKey)
    setScore(0)
    setStreak(0)
    setPhase('playing')
  }

  function handleCorrect() {
    const config = DIFFICULTIES[difficulty] ?? DIFFICULTIES.basic
    const newStreak = streak + 1
    // Small streak bonus to reward consecutive hits.
    const gained = config.points + Math.max(0, newStreak - 1) * 2
    setStreak(newStreak)
    setScore((s) => s + gained)
    setCurrentPrize(randomPrize())
    setPhase('crate')
  }

  function nextRound() {
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
          onCorrect={handleCorrect}
          onQuit={quitToMenu}
        />
      )}

      {phase === 'crate' && (
        <CrateReveal
          prize={currentPrize}
          score={score}
          streak={streak}
          onNext={nextRound}
          onQuit={quitToMenu}
        />
      )}
    </div>
  )
}
