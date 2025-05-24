// ==============================================================================
// 📄 FallbackSidebar.jsx | Agroverso – Fallback Visual do Menu Administrativo
// 📁 Diretório: src/components/fallbacks/
// ✨ UX proativa, instrução clara, acessibilidade refinada e botão de recuperação
// ==============================================================================

import React from 'react';
import PropTypes from 'prop-types';

export default function FallbackSidebar({ onRetry }) {
  return (
    <aside
      role="alert"
      aria-live="assertive"
      className="flex flex-col justify-center items-center h-screen w-64 bg-yellow-50 border-l-4 border-yellow-400 px-6 py-10 text-center"
    >
      <div className="text-2xl font-semibold text-yellow-800 mb-2">
        Menu indisponível
      </div>
      <p className="text-sm text-yellow-700 max-w-xs mb-6">
        Algo impediu o carregamento do painel lateral. Isso pode estar relacionado à conexão ou à carga do sistema.
      </p>
      <button
        onClick={onRetry}
        className="bg-yellow-600 text-white px-5 py-2 rounded-md text-sm font-medium shadow hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
      >
        Tentar novamente
      </button>
      <p className="mt-4 text-xs text-yellow-600 italic">
        Esta interface permanece funcional. Você pode navegar pelo sistema mesmo com o menu inativo.
      </p>
    </aside>
  );
}

FallbackSidebar.propTypes = {
  onRetry: PropTypes.func.isRequired,
};

// ==============================================================================
// 🔚 Fim do componente FallbackSidebar
// 🧠 UX empática, resiliente e refinada — padrão Agroverso 12/10
// ==============================================================================
