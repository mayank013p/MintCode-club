import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'react-icons', '@fortawesome/react-fontawesome', '@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons'],
          auth: ['@react-oauth/google', 'axios'],
          ai: ['@google/generative-ai', 'react-markdown', 'rehype-highlight', 'remark-gfm'],
          animations: ['lottie-web', '@lottiefiles/react-lottie-player', '@lottiefiles/dotlottie-react'],
          utils: ['react-countup', 'styled-components', 'dotenv'],
        },
      },
    },
  },
}
})
