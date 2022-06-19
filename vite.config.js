import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: new URL('./server/public/', import.meta.url).pathname
  },
  root: new URL('./client/', import.meta.url).pathname,
  publicDir: new URL('./client/static/', import.meta.url).pathname
})
