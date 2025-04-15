// 🌱 main.jsx – Ponto de entrada principal do Agroverso
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'


// 🌀 Estilos globais com Tailwind CSS e customizações regenerativas
import './styles/index.css'

// 🔒 Renderização com clareza, força e segurança
const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
