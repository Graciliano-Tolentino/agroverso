// ==============================================================================
// 📄 SkeletonSidebar.jsx | Agroverso – Skeleton para carregamento do Sidebar
// 📁 Diretório: src/components/skeletons/
// ✨ Animação pulse, compatível com layout real do menu lateral
// ==============================================================================

import React from 'react';

export default function SkeletonSidebar() {
  return (
    <aside
      className="w-64 h-screen bg-white border-r border-gray-200 p-6 animate-pulse"
      aria-label="Carregando menu lateral"
    >
      <div className="space-y-4">
        {/* Título falso */}
        <div className="h-5 w-3/4 bg-gray-200 rounded" />

        {/* Ítens de menu simulados */}
        {[...Array(5)].map((_, index) => (
          <div
            key={`skeleton-item-${index}`}
            className="h-4 w-full bg-gray-200 rounded"
          />
        ))}

        {/* Separador */}
        <div className="h-1 w-1/2 bg-gray-100 rounded mt-6" />

        {/* Ícones/rodapé simulados */}
        <div className="h-4 w-2/3 bg-gray-200 rounded mt-4" />
      </div>
    </aside>
  );
}
