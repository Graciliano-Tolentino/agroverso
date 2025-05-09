// =======================================================
// 🚀 Agroverso High Tech | Configuração Avançada do Vite
// 🌱 Ambiente: Desenvolvimento, Produção e Deploy Vercel
// 📄 Arquivo: vite.config.js
// 🗓️ Última atualização: 09/05/2025
// 👨‍💻 Equipe: Agroverso Tech
// ✍️ Desenvolvido com sabedoria, força e beleza
// =======================================================

// 🛠️ Importação de plugins essenciais
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// =======================================================
// 📌 Objetivo do Arquivo:
// Fornecer configuração robusta, clara e altamente otimizada
// para desenvolvimento local e implantação no ambiente Vercel.
// =======================================================

// =======================================================
// 🌍 Carregamento dinâmico de variáveis de ambiente
// 🔄 Configuração Unificada (Local & Vercel)
// =======================================================

export default defineConfig(({ mode }) => {
  // 🗃️ Carrega variáveis do arquivo .env com base no modo atual
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // =======================================================
    // 📦 Plugins essenciais para React e ecossistema moderno
    // =======================================================
    plugins: [
      react(),  // ⚛️ Suporte essencial ao React
      // ➕ (Possível expansão futura para plugins adicionais)
    ],

    // =======================================================
    // 🗂️ Alias claros e organizados para imports internos
    // =======================================================
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles')
      }
    },
    // =======================================================
    // 🌐 Configuração Avançada do Servidor Local
    // 🔌 Ideal para desenvolvimento rápido e eficiente
    // =======================================================
    server: {
      port: 5173,           // 🔢 Porta padrão para desenvolvimento
      host: '0.0.0.0',      // 🌍 Acesso via rede local
      open: true,           // 🖥️ Abre automaticamente no navegador
      cors: true,           // 🔓 CORS habilitado para integração facilitada
      strictPort: true,     // 🔐 Evita conflitos com outras portas locais
      hmr: { overlay: true } // ♻️ Hot Module Replacement com overlay de erros
    },

    // =======================================================
    // 📦 Configuração Robusta e Otimizada para Builds
    // 🚀 Perfeita para produção e deploy no Vercel
    // =======================================================
    build: {
      outDir: 'dist',               // 📂 Diretório final para arquivos estáticos
      emptyOutDir: true,            // 🧹 Limpa diretório antes de cada build
      sourcemap: mode !== 'production', // 🗺️ Source maps apenas em desenvolvimento
      minify: 'esbuild',            // 🔍 Minificação avançada para performance
      assetsInlineLimit: 4096,      // 🖼️ Limite para assets inline (4 KB)
      rollupOptions: {              // 🧩 Configuração avançada Rollup
        output: {
          manualChunks: {           // 📑 Chunks organizados e eficientes
            vendor: ['react', 'react-dom', 'react-router-dom']
          }
        }
      }
    },
    // =======================================================
    // 🔑 Definição Segura e Clara das Variáveis Globais
    // 🌟 Disponível globalmente na aplicação React
    // =======================================================
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV), // 📌 Ambiente da aplicação (dev/prod)
      'process.env': {}                         // 🛡️ Evita erros com bibliotecas dependentes
    }
  }
})

// =======================================================
// 🎯 Configuração concluída com absoluto sucesso!
// ✅ Arquivo final pronto para deploy e desenvolvimento
// 🚀 Agroverso | Desenvolvido com sabedoria, força e beleza
// =======================================================
