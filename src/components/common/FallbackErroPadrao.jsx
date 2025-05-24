// ==============================================================================
// 📄 FallbackErroPadrao.jsx | Agroverso – Tela Padrão de Erros com Empatia e Clareza
// 📁 Diretório: src/components/common/
// 🎨 Visual acolhedor, responsivo e elegante – UX emocional com sabedoria
// ✨ Compatível com ErrorBoundary, fallbackRender, SSR e contato rápido
// ==============================================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FallbackErroPadrao() {
  const navigate = useNavigate();

  return (
    <section className="w-full min-h-[60vh] flex flex-col justify-center items-center text-center px-6 py-10 bg-white dark:bg-gray-900">
      <h1 className="text-3xl sm:text-4xl font-bold text-red-700 dark:text-red-400 mb-4">
        Algo deu errado...
      </h1>

      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-xl mb-6">
        Um erro inesperado ocorreu em nossa aplicação. Isso já está sendo analisado
        por nossa equipe técnica. Pedimos desculpas pelo transtorno.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          Tentar novamente
        </button>

        <button
          onClick={() => navigate('/contato')}
          className="px-6 py-2 rounded-xl bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Falar com suporte
        </button>
      </div>
    </section>
  );
}
