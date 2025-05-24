/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/main.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Ponto de entrada principal da aplicação React Agroverso.
     Inicializa a aplicação com segurança, estilos globais
     e registra o Service Worker para habilitar PWA offline.
     Desenvolvido com sabedoria, força e beleza.
  ============================================
*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 🌀 Estilos globais com Tailwind CSS e customizações regenerativas
import './styles/index.css'

// 🔒 Renderização principal da aplicação com modo estrito
const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// 🚀 Registro do Service Worker para suporte a PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('[PWA] Service Worker registrado com sucesso:', registration.scope)
      })
      .catch((error) => {
        console.error('[PWA] Falha ao registrar o Service Worker:', error)
      })
  })
}

/*
  ============================================
  🔚 Fim do arquivo src/main.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
