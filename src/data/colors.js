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

// Difficulty configuration. `palette` chooses the color vocabulary,
// `count` is how many boxes appear, and `stroop` renders the prompt word
// in a mismatching color (the Stroop effect).
export const DIFFICULTIES = {
  basic: {
    key: 'basic',
    label: 'Basic Colors',
    blurb: '6 boxes, everyday color names',
    palette: BASIC_PALETTE,
    count: 6,
    stroop: false,
    points: 10,
  },
  advanced: {
    key: 'advanced',
    label: 'Advanced Colors',
    blurb: '10 boxes, fancy names & similar shades',
    palette: ADVANCED_PALETTE,
    count: 10,
    stroop: false,
    points: 20,
  },
  stroop: {
    key: 'stroop',
    label: 'Stroop Trick',
    blurb: '10 advanced colors + the word lies about its color',
    palette: ADVANCED_PALETTE,
    count: 10,
    stroop: true,
    points: 30,
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

// Build a single round: a shuffled set of `count` colors from the difficulty's
// palette, one chosen as target, and (for stroop mode) a decoy color used to
// paint the prompt word.
export function makeRound(difficulty) {
  const config = DIFFICULTIES[difficulty] ?? DIFFICULTIES.basic
  const boxes = shuffle(config.palette).slice(0, config.count)
  const target = boxes[Math.floor(Math.random() * boxes.length)]

  let promptColor = null
  if (config.stroop) {
    // Pick a different box color to display the prompt word in.
    const others = boxes.filter((c) => c.name !== target.name)
    promptColor = others[Math.floor(Math.random() * others.length)].hex
  }

  return { boxes: shuffle(boxes), target, promptColor }
}
