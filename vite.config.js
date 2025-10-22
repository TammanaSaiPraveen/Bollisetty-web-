import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://bolisetti-fast-api.onrender.com',
        changeOrigin: true,
        secure: true,
        // Do not rewrite path; backend expects /api prefix
        // rewrite: (path) => path
      },
    },
  },
})
