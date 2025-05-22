// =======================================================
// 🚀 Agroverso High Tech | Configuração Definitiva do Vite
// 🌱 Ambiente: Desenvolvimento, Produção e Deploy Vercel
// 📄 Arquivo: vite.config.js
// 🗓️ Última atualização: 20/05/2025
// 👨‍💻 Equipe: Agroverso Tech
// ✍️ Desenvolvido com sabedoria, força e beleza
// =======================================================

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      compression({ algorithm: 'brotliCompress' })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
      }
    },
    base: '/',
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
      hmr: {
        host: 'localhost',
        overlay: true
      }
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV || 'development')
    },
    build: {
      outDir: 'dist',
      sourcemap: env.APP_ENV === 'staging',
      chunkSizeWarningLimit: 500,
      minify: 'terser',
      terserOptions: { compress: { drop_console: true } },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'react-vendor';
              if (id.includes('lucide-react') || id.includes('qrcode.react')) return 'ui-vendor';
              if (id.includes('zustand') || id.includes('@tanstack/react-query')) return 'state-vendor';
              if (id.includes('formik') || id.includes('yup') || id.includes('react-hook-form') || id.includes('zod')) return 'form-vendor';
              return 'vendor';
            }
          }
        }
      }
    },
    css: {
      postcss: {
        plugins: [
          require('autoprefixer'),
          require('cssnano')({ preset: 'default' })
        ]
      }
    }
  };
});