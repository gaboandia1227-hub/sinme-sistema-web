import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/sinme-sistema-web/', // Esto es importante para que funcione correctamente en GitHub Pages
})
