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
  { emoji: '🦋', label: 'Butterfly!' },
  { emoji: '🌟', label: 'Glowing Star!' },
  { emoji: '🍦', label: 'Ice Cream!' },
  { emoji: '🎮', label: 'Game On!' },
  { emoji: '🐶', label: 'Good Doggo!' },
  { emoji: '🌺', label: 'Hibiscus Bloom!' },
  { emoji: '🦊', label: 'Sly Fox!' },
  { emoji: '🍔', label: 'Juicy Burger!' },
  { emoji: '🎯', label: 'Bullseye!' },
  { emoji: '🐢', label: 'Speedy Turtle!' },
  { emoji: '🪙', label: 'Gold Coin!' },
  { emoji: '🧁', label: 'Cupcake!' },
  { emoji: '🐙', label: 'Octopus!' },
  { emoji: '🍉', label: 'Watermelon!' },
  { emoji: '🎺', label: 'Trumpet Fanfare!' },
  { emoji: '🐼', label: 'Panda Pal!' },
  { emoji: '🍭', label: 'Lollipop!' },
  { emoji: '🛸', label: 'UFO!' },
  { emoji: '🦁', label: 'Brave Lion!' },
  { emoji: '🌮', label: 'Taco Tuesday!' },
  { emoji: '🐝', label: 'Busy Bee!' },
  { emoji: '🍓', label: 'Strawberry!' },
  { emoji: '🎲', label: 'Lucky Dice!' },
  { emoji: '🐧', label: 'Penguin Pal!' },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// A "bag" draws prizes without replacement: every prize appears once before
// any repeats. When the bag empties it reshuffles for a fresh pass.
export function makePrizeBag() {
  let bag = []
  return function draw() {
    if (bag.length === 0) bag = shuffle(PRIZES)
    return bag.pop()
  }
}
