/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/context/ThemeContext.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Contexto global de tema (claro/escuro) para toda a aplicação.
     Aplica a classe 'dark' no <html>, respeita preferência do sistema
     e sincroniza com localStorage. Facilita acessibilidade e consistência.
     Desenvolvido com sabedoria, força e beleza.
  ============================================
*/

import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

// Hook customizado para facilitar consumo do contexto
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const getPreferredTheme = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getPreferredTheme);

  // Sincroniza a classe 'dark' no HTML e salva no localStorage
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
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/*
  ============================================
  🔚 Fim do arquivo src/context/ThemeContext.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
