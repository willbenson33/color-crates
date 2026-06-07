# Color Crates — project notes for Claude

A small color-matching game: a prompt names a color, the player clicks the matching
box to win a crate and reveal a random emoji prize. Endless rounds with score, streak,
and a per-round timer.

## Stack
- **React 18 + Vite** (plain JSX, no TypeScript), plain CSS.
- Deployed to **GitHub Pages** at https://willbenson33.github.io/color-crates/
  via the workflow in `.github/workflows/deploy.yml` (builds on every push to `main`).
- Vite `base` is `/color-crates/` so Pages asset paths resolve — keep this in sync if
  the repo is ever renamed.

## Layout
- `src/App.jsx` — state machine (`menu` → `playing` → `crate`), score/streak/timer, prize bag.
- `src/components/StartMenu.jsx` — difficulty picker + best score.
- `src/components/GameBoard.jsx` — prompt, color grid, HUD, per-round timer.
- `src/components/CrateReveal.jsx` — success → open crate → prize → Next Round.
- `src/data/colors.js` — `BASIC_PALETTE`, `ADVANCED_PALETTE`, `DIFFICULTIES`, `makeRound()`.
- `src/data/prizes.js` — `PRIZES` list + `makePrizeBag()` (draws without repeats).

## Dev mode
Putting `/dev` anywhere in the URL path (e.g. `http://localhost:5173/color-crates/dev`)
unlocks dev shortcut buttons in the bottom-right corner. Gated by `DEV_MODE` in
`src/App.jsx` (`window.location.pathname.includes('/dev')`):
- **🎲 Wild Card** — jump straight to the crate screen with a random prize.
- **🎁 Surprise** — jump straight to the crate screen with the 🎁 Mystery Gift, the
  "surprise" reward that triggers the tap-to-celebrate party animation.

Note: this is a client-side path check, so it works on the Vite dev server but a hard
load of `/color-crates/dev` on GitHub Pages would 404 (no SPA fallback). It's intended
for local dev use.

## Workflow — IMPORTANT
**After each change, update the build and GitHub Pages.** Concretely, once edits are done:
1. `npm run build` to confirm it compiles cleanly.
2. `git add -A && git commit` with a clear message.
3. `git push origin main` — this triggers the Pages deploy workflow automatically.
4. Optionally confirm the live site at https://willbenson33.github.io/color-crates/.

Do this for every change so the deployed site always reflects the latest code.

## Communication
- When sharing the live site URL, write it as plain text without bold or markdown formatting: https://willbenson33.github.io/color-crates/ — wrapping it in `**...**` breaks the link.

## Dev commands
```bash
npm install
npm run dev            # local dev server
npm run dev -- --host  # expose on LAN (e.g. phone testing)
npm run build          # production build into dist/
```
