import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` must match the GitHub Pages repo subpath so assets resolve correctly
// at https://willbenson33.github.io/color-crates/
export default defineConfig({
  base: '/color-crates/',
  plugins: [react()],
})
