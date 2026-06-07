// Basic palette: common, unambiguous colors most people name instantly.
export const BASIC_PALETTE = [
  { name: 'Red',    hex: '#e53935' },
  { name: 'Orange', hex: '#fb8c00' },
  { name: 'Yellow', hex: '#fdd835' },
  { name: 'Green',  hex: '#43a047' },
  { name: 'Blue',   hex: '#1e88e5' },
  { name: 'Purple', hex: '#8e24aa' },
  { name: 'Pink',   hex: '#ec407a' },
  { name: 'Brown',  hex: '#6d4c41' },
  { name: 'Gray',   hex: '#9e9e9e' },
  { name: 'Black',  hex: '#212121' },
  { name: 'White',  hex: '#fafafa' },
  { name: 'Cyan',   hex: '#00bcd4' },
]

// Advanced palette: nuanced / less common color names, plus similar shades
// (multiple reds, greens, blues) that are trickier to tell apart.
// Hex values use the standard / web definitions for each named color.
export const ADVANCED_PALETTE = [
  { name: 'Crimson', hex: '#dc143c' },
  { name: 'Scarlet', hex: '#ff2400' },
  { name: 'Coral', hex: '#ff7f50' },
  { name: 'Amber', hex: '#ff8f00' },
  { name: 'Gold', hex: '#ffd700' },
  { name: 'Lime', hex: '#c6ff00' },
  { name: 'Olive', hex: '#808000' },
  { name: 'Emerald', hex: '#50c878' },
  { name: 'Teal', hex: '#008080' },
  { name: 'Turquoise', hex: '#40e0d0' },
  { name: 'Sky Blue', hex: '#87ceeb' },
  { name: 'Azure', hex: '#007fff' },
  { name: 'Indigo', hex: '#4b0082' },
  { name: 'Violet', hex: '#8f00ff' },
  { name: 'Magenta', hex: '#ff00ff' },
  { name: 'Maroon', hex: '#800000' },
  { name: 'Mauve', hex: '#e0b0ff' },
  { name: 'Tan', hex: '#d2b48c' },
  { name: 'Salmon', hex: '#fa8072' },
  { name: 'Vermilion', hex: '#e34234' },
  { name: 'Rose', hex: '#ff007f' },
  { name: 'Fuchsia', hex: '#ff77ff' },
  { name: 'Plum', hex: '#8e4585' },
  { name: 'Lavender', hex: '#b57edc' },
  { name: 'Periwinkle', hex: '#ccccff' },
  { name: 'Cobalt', hex: '#0047ab' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Cerulean', hex: '#2a52be' },
  { name: 'Aquamarine', hex: '#7fffd4' },
  { name: 'Jade', hex: '#00a86b' },
  { name: 'Mint', hex: '#3eb489' },
  { name: 'Chartreuse', hex: '#7fff00' },
  { name: 'Forest Green', hex: '#228b22' },
  { name: 'Sage', hex: '#9caf88' },
  { name: 'Mustard', hex: '#ffdb58' },
  { name: 'Saffron', hex: '#f4c430' },
  { name: 'Apricot', hex: '#fbceb1' },
  { name: 'Peach', hex: '#ffe5b4' },
  { name: 'Sienna', hex: '#a0522d' },
  { name: 'Chocolate', hex: '#7b3f00' },
  { name: 'Beige', hex: '#f5f5dc' },
  { name: 'Khaki', hex: '#c3b091' },
  { name: 'Charcoal', hex: '#36454f' },
  { name: 'Slate', hex: '#708090' },
  { name: 'Burgundy', hex: '#800020' },
  { name: 'Ruby', hex: '#e0115f' },
]

// Four difficulties, scaling by number of boxes (and color vocabulary).
// `cols` keeps each grid symmetric: 2×2, 3×3, 4×3, 4×4.
export const DIFFICULTIES = {
  easy: {
    key: 'easy',
    label: 'Easy',
    blurb: '4 boxes (2×2) · basic colors',
    palette: BASIC_PALETTE,
    count: 4,
    cols: 2,
    points: 10,
  },
  medium: {
    key: 'medium',
    label: 'Medium',
    blurb: '9 boxes (3×3) · basic colors',
    palette: BASIC_PALETTE,
    count: 9,
    cols: 3,
    points: 15,
  },
  hard: {
    key: 'hard',
    label: 'Hard',
    blurb: '12 boxes (4×3) · fancy colors',
    palette: ADVANCED_PALETTE,
    count: 12,
    cols: 4,
    points: 25,
  },
  expert: {
    key: 'expert',
    label: 'Expert',
    blurb: '16 boxes (4×4) · fancy colors',
    palette: ADVANCED_PALETTE,
    count: 16,
    cols: 4,
    points: 40,
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
  const config = DIFFICULTIES[difficulty] ?? DIFFICULTIES.easy
  const boxes = shuffle(config.palette).slice(0, config.count)
  const target = boxes[Math.floor(Math.random() * boxes.length)]
  return { boxes: shuffle(boxes), target }
}
