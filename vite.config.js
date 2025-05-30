// ==========================================================================================
// 🚀 Agroverso High Tech | Configuração Definitiva do Vite com Bloco de Testes, Modularidade e Deploy
// 🌱 Ambientes: Desenvolvimento, Produção, Staging, Testes Unitários e Deploy GitHub/Vercel
// 📄 Arquivo: vite.config.js
// 📅 Atualizado: 30/05/2025
// 👨‍💻 Equipe: Agroverso Tech — Engenharia de Software com Sabedoria, Força e Beleza
// ==========================================================================================

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import Inspect from 'vite-plugin-inspect'
import legacy from '@vitejs/plugin-legacy'
import { visualizer } from 'rollup-plugin-visualizer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: '/agroverso',
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV || 'development')
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@contexts': path.resolve(__dirname, 'src/contexts'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@assets': path.resolve(__dirname, 'src/assets')
      }
    },
    plugins: [
      react(),
      compression({ algorithm: 'brotliCompress' }),
      legacy({ targets: ['defaults', 'not IE 11'] }),
      Inspect(),
      visualizer({ filename: 'dist/bundle-report.html', open: false, gzipSize: true })
    ],

    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
      hmr: {
        host: 'localhost',
        overlay: true
      }
    },

    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          cssnano({ preset: 'default' })
        ]
      }
    },

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      include: ['src/__tests__/**/*.test.{js,jsx,ts,tsx}'],
      exclude: ['node_modules', 'dist']
    },

    // ✅ Blindagem contra problemas de interop com bibliotecas híbridas (CJS + ESM)
    optimizeDeps: {
      include: ['qrcode.react']
    },

    build: {
      outDir: 'dist',
      sourcemap: env.APP_ENV === 'staging',
      chunkSizeWarningLimit: 500,
      minify: 'terser',

      // ✅ Corrige quebras em produção por exportações default mal resolvidas
      commonjsOptions: {
        include: [/node_modules/, 'qrcode.react']
      },

      terserOptions: {
        compress: {
          drop_console: true
        }
      },

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'react-vendor'
              if (id.includes('lucide-react') || id.includes('qrcode.react')) return 'ui-vendor'
              if (
                id.includes('zustand') || id.includes('@tanstack/react-query')
              ) return 'state-vendor'
              if (
                id.includes('formik') || id.includes('yup') ||
                id.includes('react-hook-form') || id.includes('zod')
              ) return 'form-vendor'
              return 'vendor'
            }
          }
        }
      }
    }
  }
})
