/*
  ============================================
  📄 Componente: ThemeToggle
  📁 Caminho: src/components/ui/ThemeToggle.jsx
  ✍️ Refatorado por: Graciliano Tolentino
  📅 Atualizado em: 20/05/2025
  🧠 Objetivo:
     Substituir toda lógica local por acesso centralizado ao
     estado global de tema via ThemeContext. Elimina duplicações.
  ✨ Desenvolvido com sabedoria, força e beleza.
  ============================================
*/

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext'; // Importa o hook global

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme(); // Consome contexto

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
      aria-label="Alternar entre modo claro e escuro"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;

/*
  ============================================
  🔚 Fim do arquivo refatorado ThemeToggle.jsx
  🚫 Nenhum localStorage, classList ou useEffect aqui.
  🌀 Toda responsabilidade está no ThemeContext.jsx.
  ============================================
*/
