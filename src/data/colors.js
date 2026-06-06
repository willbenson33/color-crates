// Basic palette: common, unambiguous colors most people name instantly.
export const BASIC_PALETTE = [
  { name: 'Red', hex: '#e53935' },
  { name: 'Orange', hex: '#fb8c00' },
  { name: 'Yellow', hex: '#fdd835' },
  { name: 'Green', hex: '#43a047' },
  { name: 'Blue', hex: '#1e88e5' },
  { name: 'Purple', hex: '#8e24aa' },
  { name: 'Pink', hex: '#ec407a' },
  { name: 'Brown', hex: '#6d4c41' },
  { name: 'Gray', hex: '#9e9e9e' },
  { name: 'Black', hex: '#212121' },
  { name: 'White', hex: '#fafafa' },
  { name: 'Cyan', hex: '#00bcd4' },
]

// Advanced palette: nuanced / less common color names, plus similar shades
// (multiple reds, greens, blues) that are trickier to tell apart.
export const ADVANCED_PALETTE = [
  { name: 'Crimson', hex: '#b71c1c' },
  { name: 'Scarlet', hex: '#ff5252' },
  { name: 'Coral', hex: '#ff7043' },
  { name: 'Amber', hex: '#ffb300' },
  { name: 'Gold', hex: '#ffca28' },
  { name: 'Lime', hex: '#c0ca33' },
  { name: 'Olive', hex: '#827717' },
  { name: 'Emerald', hex: '#1b9e5a' },
  { name: 'Teal', hex: '#00897b' },
  { name: 'Turquoise', hex: '#1de9b6' },
  { name: 'Sky Blue', hex: '#29b6f6' },
  { name: 'Azure', hex: '#2196f3' },
  { name: 'Indigo', hex: '#3949ab' },
  { name: 'Violet', hex: '#7c4dff' },
  { name: 'Magenta', hex: '#d81b60' },
  { name: 'Maroon', hex: '#880e4f' },
  { name: 'Mauve', hex: '#b39ddb' },
  { name: 'Tan', hex: '#d7ccc8' },
]

// Difficulty configuration. `palette` chooses the color vocabulary and
// `count` is how many boxes appear (chosen to form a symmetric grid).
export const DIFFICULTIES = {
  basic: {
    key: 'basic',
    label: 'Basic Colors',
    blurb: '6 boxes, everyday color names',
    palette: BASIC_PALETTE,
    count: 6,
    points: 10,
  },
  advanced: {
    key: 'advanced',
    label: 'Advanced Colors',
    blurb: '16 boxes, fancy names & similar shades',
    palette: ADVANCED_PALETTE,
    count: 16,
    points: 20,
  },
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Build a single round: a shuffled set of `count` distinct colors from the
// difficulty's palette, with one chosen as the target.
export function makeRound(difficulty) {
  const config = DIFFICULTIES[difficulty] ?? DIFFICULTIES.basic
  const boxes = shuffle(config.palette).slice(0, config.count)
  const target = boxes[Math.floor(Math.random() * boxes.length)]
  return { boxes: shuffle(boxes), target }
}
