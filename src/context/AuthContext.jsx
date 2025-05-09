// ==========================================
// 📄 AuthContext.jsx | Agroverso – Autenticação Global Profissional
// ==========================================
// Contexto React para login, logout e gestão de sessão JWT com refresh automático
// Integração com authStorage, authService, modo demo e interceptador
// Desenvolvido com sabedoria, força e beleza – padrão High Tech Agroverso
// ==========================================

import React, {
  createContext,
  useState,
  useEffect,
  useMemo
} from 'react';

import { AuthService } from '../services/auth/authService';
import {
  getToken,
  getUser,
  saveSession,
  clearSession
} from '../services/auth/authStorage';

/**
 * 🌐 Permite simular login com dados locais (modo demo)
 * Pode ser ativado via VITE_ENABLE_FAKE_DATA=true no .env
 */
const ENABLE_FAKE_DATA = import.meta.env.VITE_ENABLE_FAKE_DATA === 'true';

/**
 * 🧠 Criação do contexto global de autenticação
 */
export const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';
/**
 * 🛡️ Provedor global de autenticação
 * Gerencia login, logout, sessão JWT e modo demo (admin.json)
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [token, setToken] = useState(getToken());
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * 🚀 Efeito de inicialização da sessão
   * Valida o token salvo ou limpa sessão inválida
   */
  useEffect(() => {
    const initialize = async () => {
      const storedToken = getToken();

      if (!storedToken) {
        clearSession();
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        if (!ENABLE_FAKE_DATA) {
          const me = await AuthService.me();
          setUser(me);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.warn('⚠️ Sessão inválida detectada. Realizando logout automático.');
        logout(false); // evita redirecionamento neste caso
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);
  /**
   * 🔑 Login do usuário (modo real ou simulado)
   * @param {string} email - Email de login
   * @param {string} senha - Senha do usuário
   */
  const login = async (email, senha) => {
    setLoading(true);
    setError(null);

    try {
      if (ENABLE_FAKE_DATA) {
        const admins = await fetch('/data/admin.json').then((r) => r.json());
        const match = admins.find(
          (adm) =>
            adm.usuario.toLowerCase() === email.toLowerCase() &&
            adm.senha === senha
        );

        if (!match) throw new Error('Credenciais inválidas (modo simulado)');

        const fakeToken = 'fake-jwt-token';
        const fakeUser = { nome: match.nome, email: match.usuario };

        saveSession(fakeToken, fakeUser);
        setToken(fakeToken);
        setUser(fakeUser);
        setIsAuthenticated(true);
      } else {
        const { token, user } = await AuthService.login(email, senha);
        saveSession(token, user);
        setToken(token);
        setUser(user);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Erro ao realizar login:', err);
      setError(err.message || 'Erro ao fazer login.');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };
  /**
   * 🚪 Logout do usuário
   * Limpa sessão, estado e redireciona para a tela de login
   * @param {boolean} redirect - Redirecionar após logout (padrão: true)
   */
  const logout = (redirect = true) => {
    AuthService.logout();
    clearSession();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    if (redirect && typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  /**
   * 💾 Valor memoizado para fornecer o contexto de forma estável
   */
  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    setError,
  }), [user, token, isAuthenticated, loading, error]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
// ==========================================
// 🌱 Desenvolvido com sabedoria, força e beleza
// 🧠 Padrão High Tech Agroverso – agroverso.tec.br
// ==========================================
