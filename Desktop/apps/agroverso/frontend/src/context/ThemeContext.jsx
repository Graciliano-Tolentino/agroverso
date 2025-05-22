// ===================================================================
// 📄 ThemeContext.jsx | Agroverso – Contexto Global de Tema
// 📁 Diretório: src/context/
// 🎯 Finalidade:
//     Gerenciar globalmente o estado de tema (claro ou escuro)
//     em toda a aplicação Agroverso, mantendo consistência visual.
// 🧭 Justificativa:
//     Responsável por aplicar e manter a classe `dark` no <html>,
//     com persistência via localStorage, integração total com o DOM
//     e interface declarativa para a UI via React Context.
// 🛠️ Ação:
//     Refatorado para máxima clareza, consistência e controle.
// 🌟 Desenvolvido com sabedoria, força e beleza – padrão High Tech Agroverso
// ===================================================================

import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

// 🌒 Criação do contexto global de tema
export const ThemeContext = createContext();
ThemeContext.displayName = 'ThemeContext';

// 🌕 Provedor global de tema
export function ThemeProvider({ children }) {
  // 🎛️ Estado inicial do tema: claro por padrão
  const [theme, setTheme] = useState('light');

  /**
   * 🧠 Primeira carga: tenta restaurar tema salvo ou usa preferência do sistema
   */
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  /**
   * 🌀 Toda vez que o tema mudar:
   * – Aplica a classe no <html>
   * – Persiste no localStorage
   */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  /**
   * 🔁 Alterna entre modo claro e escuro
   */
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 🌗 Hook personalizado para consumir o contexto de tema com clareza e segurança
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de <ThemeProvider>');
  }
  return context;
}

// ===================================================================
// 🔚 Fim do Contexto: ThemeContext.jsx
// 🌙 Gerencia o tema claro/escuro com coerência global
// 🧠 Fornece acesso via useTheme() e alternância via toggleTheme()
// 🌀 Refatorado conforme o Método Caracol:
//     – Estado único e coeso
//     – Sem duplicação de lógica nos componentes consumidores
//     – Clareza funcional, persistência refinada e arquitetura viva
// ♻️ Pronto para durar, escalar e permanecer
// 🧬 Padrão High Tech Agroverso | agroverso.tec.br
// ===================================================================
