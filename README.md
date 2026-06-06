# Color Crates 🎨📦

A fast little color-matching game built with React + Vite. A prompt names a color —
click the matching box to win a crate and reveal a random emoji prize. Endless rounds
with a score and streak.

**Play:** https://willbenson33.github.io/color-crates/

## Difficulties
- **Basic Colors** — 6 boxes, everyday color names.
- **Advanced Colors** — 10 boxes, fancier names and similar shades.
- **Stroop Trick** — advanced colors where the prompt word is drawn in a *lying* color.

## Develop
```bash
npm install
npm run dev        # local dev server
npm run dev -- --host   # expose on your LAN (e.g. to a phone)
npm run build      # production build into dist/
```

Deployment is automated: pushing to `main` triggers the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages.
