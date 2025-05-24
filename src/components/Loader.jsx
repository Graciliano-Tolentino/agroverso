/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/components/Loader.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Componente visual de carregamento para feedback
     em requisições assíncronas. Pode ser usado em
     tela cheia ou embutido em qualquer seção.
     Animado com Tailwind, leve e acessível.
     Desenvolvido com sabedoria, força e beleza.
  ============================================
*/

import React from 'react';

const Loader = ({ fullScreen = false, label = "Carregando..." }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? 'fixed inset-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm' : ''
      }`}
      role="status"
      aria-live="polite"
    >
      <svg
        className="animate-spin h-8 w-8 text-blue-600 dark:text-blue-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      {label && (
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          {label}
        </p>
      )}
    </div>
  );
};

export default Loader;

/*
  ============================================
  🔚 Fim do arquivo src/components/Loader.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
