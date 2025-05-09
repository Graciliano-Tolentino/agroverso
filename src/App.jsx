/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/App.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Estrutura principal da aplicação Agroverso.
     Envolve o roteamento central (AppRoutes), o contexto
     de tema global (ThemeProvider) e prepara a aplicação
     para expansão segura com sabedoria, força e beleza.
  ============================================
*/

import React from 'react'
import { BrowserRouter } from 'react-router-dom'

// 🧠 Roteamento modularizado
import AppRoutes from './routes/AppRoutes'

// 🌒 Contexto global de tema (claro/escuro)
import { ThemeProvider } from './context/ThemeContext'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}
