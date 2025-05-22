// ==========================================
// 📄 useAuth.js | Hook de acesso ao AuthContext (Agroverso)
// ==========================================
// Fornece acesso padronizado ao contexto de autenticação
// Garante segurança de uso e facilita reutilização em componentes
// Desenvolvido com sabedoria, força e beleza – padrão High Tech Agroverso
// ==========================================

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * 🔐 Hook personalizado para acessar o AuthContext de forma segura
 * @returns {Object} Contexto de autenticação contendo estado e ações
 * @throws {Error} Caso usado fora de um <AuthProvider>
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('❌ useAuth deve ser usado dentro de um <AuthProvider>');
  }

  return context;
}

// ==========================================
// 🌱 Desenvolvido com sabedoria, força e beleza
// 🧠 Padrão High Tech Agroverso – agroverso.tec.br
// ==========================================
