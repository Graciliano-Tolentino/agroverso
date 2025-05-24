// =====================================================================================
// 📄 ThemeToggle.jsx | Agroverso – Comutador de Tema com Persistência e Acessibilidade
// =====================================================================================
// 🎯 Finalidade:
//     • Permitir alternância entre temas escuro e claro com persistência e acessibilidade.
//     • Compatível com Tailwind, localStorage, dark mode automático e SSR seguro.
// =====================================================================================

import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [modoEscuro, setModoEscuro] = useState(() => {
    if (typeof window === 'undefined') return false;

    const temaSalvo = localStorage.getItem('agroverso_tema');
    if (temaSalvo) return temaSalvo === 'dark';

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const classe = 'dark';

    if (modoEscuro) {
      document.documentElement.classList.add(classe);
      localStorage.setItem('agroverso_tema', 'dark');
    } else {
      document.documentElement.classList.remove(classe);
      localStorage.setItem('agroverso_tema', 'light');
    }
  }, [modoEscuro]);

  const alternarTema = () => {
    setModoEscuro((anterior) => !anterior);
  };

  return (
    <button
      onClick={alternarTema}
      type="button"
      aria-label={modoEscuro ? 'Ativar tema claro' : 'Ativar tema escuro'}
      data-testid="theme-toggle"
      className="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300
                 bg-gray-200 text-gray-900 hover:bg-gray-300
                 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
    >
      {modoEscuro ? '🌞 Tema Claro' : '🌙 Tema Escuro'}
    </button>
  );
};

export default ThemeToggle;
