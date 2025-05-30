// ==============================================================================
// 📄 App.jsx | Agroverso – Estrutura Principal da Aplicação com Logger Inteligente e Modular
// 📁 Diretório: src/
// 🎯 Finalidade:
//     • Roteamento centralizado com segurança (Auth)
//     • Tema reativo com dark mode nativo
//     • Observabilidade com replay de logs e rastreamento global
// ==============================================================================

import React from 'react'
import { BrowserRouter } from 'react-router-dom'

// 🌐 Roteamento modularizado
import AppRoutes from './routes/AppRoutes'

// 🌒 Contexto de tema (claro/escuro)
import { ThemeProvider } from './context/ThemeContext'

// 🔐 Contexto global de autenticação
import { AuthProvider } from './context/AuthContext'

// 📡 Observabilidade Agroverso – Telemetria com replay e fallback offline
import useLogger from '@/hooks/useLogger'

export default function App() {
  // 🧠 Ativação do logger global (captura erros e rejeições)
  useLogger({
    component: 'App',
    context: 'Inicialização da aplicação',
    offlineFallback: true
  })

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

// ==============================================================================
// 🔚 Fim do arquivo: src/App.jsx
// 📦 Modularidade completa com rastreamento, contexto, acessibilidade e estabilidade
// 🧠 Agroverso – Preparado para ambientes reais, observáveis e resilientes
// ==============================================================================
