import { useEffect, useRef, useState } from 'react'
import StartMenu from './components/StartMenu.jsx'
import GameBoard from './components/GameBoard.jsx'
import CrateReveal from './components/CrateReveal.jsx'
import { makePrizeBag, PRIZES } from './data/prizes.js'
import './App.css'

const BEST_SCORE_KEY = 'colorCrates.bestScore'
// The "surprise" reward — the gift box that triggers the party animation.
const SURPRISE_PRIZE = PRIZES.find((p) => p.emoji === '🎁')

// Format total seconds as "Xs" or "Mm Ss".
function formatTime(seconds) {
  const total = Math.floor(seconds)
  const m = Math.floor(total / 60)
  const s = total % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

export default function App() {
  const [devMode, setDevMode] = useState(() => window.location.pathname.includes('/dev'))
  const [phase, setPhase] = useState('menu') // 'menu' | 'playing' | 'crate'
  const [difficulty, setDifficulty] = useState('easy')
  // Hardcore mode: a single wrong pick ends the run.
  const [hardcore, setHardcore] = useState(false)
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

  function handleCorrect(missed) {
    if (missed) {
      // The player slipped up earlier this round: they still win the crate, but
      // the round scores nothing and the streak stays broken.
      setStreak(0)
    } else {
      // Flat scoring: 1 point per correct card, no matter the difficulty.
      setStreak(streak + 1)
      setScore((s) => s + 1)
    }
    refreshTime()
    setCurrentPrize(drawPrize())
    setPhase('crate')
  }

  function handleWrong() {
    // Interrupting the streak forfeits the bonus momentum, but banked points stay.
    setStreak(0)
  }

  function nextRound() {
    refreshTime()
    setPhase('playing')
  }

  function quitToMenu() {
    setPhase('menu')
  }

  // Dev shortcut: jump straight to the crate screen with a given prize.
  function jumpToPrize(prize) {
    refreshTime()
    setCurrentPrize(prize)
    setPhase('crate')
  }

  return (
    <div className="app">
      {devMode && (
        <div className="dev-tools">
          <button
            className="dev-btn"
            onClick={() => jumpToPrize(drawPrize())}
            title="Skip straight to prize screen"
          >
            🎲 Wild Card
          </button>
          <button
            className="dev-btn"
            onClick={() => jumpToPrize(SURPRISE_PRIZE)}
            title="Skip straight to the surprise gift"
          >
            🎁 Surprise
          </button>
        </div>
      )}

      {phase === 'menu' && (
        <StartMenu
          bestScore={bestScore}
          onStart={startGame}
          hardcore={hardcore}
          onToggleHardcore={() => setHardcore((h) => !h)}
          onDevUnlock={() => setDevMode(true)}
        />
      )}

      {phase === 'playing' && (
        <GameBoard
          difficulty={difficulty}
          score={score}
          streak={streak}
          hardcore={hardcore}
          timeLabel={formatTime(totalTime)}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
          onLose={quitToMenu}
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
