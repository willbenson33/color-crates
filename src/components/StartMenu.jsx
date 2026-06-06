import { DIFFICULTIES } from '../data/colors.js'

export default function StartMenu({ bestScore, onStart }) {
  return (
    <div className="screen menu">
      <h1 className="title">
        <span className="title-color title-c1">C</span>
        <span className="title-color title-c2">o</span>
        <span className="title-color title-c3">l</span>
        <span className="title-color title-c4">o</span>
        <span className="title-color title-c5">r</span>
        {' '}
        <span className="title-crate">Crates</span>
      </h1>
      <p className="subtitle">Click the box that matches the named color, then open your crate!</p>

      <div className="difficulty-list">
        {Object.values(DIFFICULTIES).map((d) => (
          <button
            key={d.key}
            className={`difficulty-btn diff-${d.key}`}
            onClick={() => onStart(d.key)}
          >
            <span className="difficulty-label">{d.label}</span>
            <span className="difficulty-blurb">{d.blurb}</span>
            <span className="difficulty-points">+{d.points} pts / hit</span>
          </button>
        ))}
      </div>

      <p className="best-score">🏆 Best Score: {bestScore}</p>
    </div>
  )
}
