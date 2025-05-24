// ==============================================================================
// 📄 App.jsx | Agroverso – Estrutura Principal da Aplicação com Logger Resiliente
// 📁 Diretório: src/
// ✨ Atualizado com replay de logs offline via useLogger()
// ==============================================================================

import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

// 🧠 Roteamento modularizado
import AppRoutes from './routes/AppRoutes';

// 🌒 Contexto global de tema (claro/escuro)
import { ThemeProvider } from './context/ThemeContext';

// 🔐 Contexto global de autenticação
import { AuthProvider } from './context/AuthContext';

// 📡 Observabilidade Agroverso – Telemetria com replay de logs offline
import { useLogger } from './hooks/useLogger';

export default function App() {
  const logger = useLogger();

  // 🔁 Replay automático de logs salvos offline ao iniciar com conexão
  useEffect(() => {
    if (navigator.onLine) {
      logger.replayOfflineLogs();
    }
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

// ==============================================================================
// 🔚 Fim do arquivo: src/App.jsx
// 🌐 Roteamento seguro, temas integrados e replay de logs ativado com perfeição
// 🧠 Agroverso – Sistema observável, modular e pronto para ambientes reais
// ==============================================================================
