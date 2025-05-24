/*
  ==============================================================================
  📄 FallbackHeader.jsx
  📁 src/components/fallbacks
  ✍️ Refatorado por: Graciliano Tolentino
  📅 Atualizado em: 22/05/2025
  🎯 Fallback visual com botão de retry para Header

  🌍 UX funcional — Sabedoria, Força e Beleza
  ==============================================================================
*/

import React from 'react';

const FallbackHeader = ({ onRetry }) => {
  return (
    <div
      className="w-full p-4 bg-red-100 border-b border-red-500 text-red-800 text-center"
      role="alert"
      aria-live="assertive"
    >
      <strong className="block mb-1">Erro ao carregar o cabeçalho</strong>
      <p className="text-sm mb-3">Não foi possível exibir a barra superior. Tente novamente para restaurar o layout.</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
};

export default FallbackHeader;
