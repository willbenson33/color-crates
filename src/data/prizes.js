// Fun emoji prizes awarded when a crate is opened.
export const PRIZES = [
  { emoji: '🎉', label: 'Party Time!' },
  { emoji: '🍕', label: 'Pizza Slice!' },
  { emoji: '🦄', label: 'Magic Unicorn!' },
  { emoji: '💎', label: 'Shiny Diamond!' },
  { emoji: '🏆', label: 'Golden Trophy!' },
  { emoji: '🚀', label: 'Rocket Ship!' },
  { emoji: '🍩', label: 'Sweet Donut!' },
  { emoji: '🐱', label: 'Cool Cat!' },
  { emoji: '🌈', label: 'Rainbow!' },
  { emoji: '⭐', label: 'Lucky Star!' },
  { emoji: '🎸', label: 'Rock Star!' },
  { emoji: '👑', label: 'Royal Crown!' },
  { emoji: '🍀', label: 'Four-Leaf Clover!' },
  { emoji: '🎁', label: 'Mystery Gift!' },
  { emoji: '🐉', label: 'Mighty Dragon!' },
  { emoji: '🍫', label: 'Chocolate Bar!' },
]

export function randomPrize() {
  return PRIZES[Math.floor(Math.random() * PRIZES.length)]
}
