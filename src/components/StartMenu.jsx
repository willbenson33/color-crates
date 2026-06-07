import { DIFFICULTIES } from '../data/colors.js'

export default function StartMenu({ bestScore, onStart, hardcore, onToggleHardcore }) {
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

      <button
        type="button"
        className={`hardcore-toggle${hardcore ? ' on' : ''}`}
        onClick={onToggleHardcore}
        role="switch"
        aria-checked={hardcore}
      >
        <span className="hardcore-switch" />
        <span className="hardcore-text">
          <span className="hardcore-name">💀 Hardcore</span>
          <span className="hardcore-desc">One wrong color ends your run</span>
        </span>
      </button>

      <div className="difficulty-list">
        {Object.values(DIFFICULTIES).map((d) => (
          <button
            key={d.key}
            className={`difficulty-btn diff-${d.key}`}
            onClick={() => onStart(d.key)}
          >
            <span className="difficulty-label">{d.label}</span>
            <span className="difficulty-blurb">{d.blurb}</span>
            <span className="difficulty-points">+1 pt / hit</span>
          </button>
        ))}
      </div>

      <p className="best-score">🏆 Best Score: {bestScore}</p>
    </div>
  )
}
