/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/components/ThemeToggle.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Componente funcional de botão interruptor de tema claro/escuro.
     Garante acessibilidade com ARIA e ícones visuais (sol/lua).
     Aplica persistência via localStorage e sincroniza com Tailwind.
     Desenvolvido com sabedoria, força e beleza.
  ============================================
*/

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react'; // Ícones leves e modernos

const ThemeToggle = () => {
  // Estado inicial baseado na preferência salva ou padrão do sistema
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });

  // Aplica/remover classe 'dark' na tag <html> conforme o tema
  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

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
  🔚 Fim do arquivo src/components/ThemeToggle.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
