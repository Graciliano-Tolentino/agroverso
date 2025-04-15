// ⚙️ vite.config.js — Agroverso com sabedoria, força e beleza
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// 🌱 Configuração unificada para ambientes locais e Vercel
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // 🧭 Não usar 'base' para Vercel — ele serve a partir da raiz
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles')
      }
    },
    server: {
      port: 5173,
      open: true
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true
    },
    define: {
      __APP_ENV__: env.APP_ENV
    }
  }
})
