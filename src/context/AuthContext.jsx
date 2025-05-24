// =====================================================================================
// 📄 AuthContext.jsx | Agroverso – Contexto Seguro de Autenticação (v5.0)
// =====================================================================================
// 🎯 Finalidade:
//     • Centralizar estado e ações de autenticação com rastreabilidade e fallback seguro.
//     • Compatível com ambientes SSR, fakeAuth, i18n e controle de erros refinado.
// =====================================================================================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AuthService } from '../services/auth/authService';
import { loginFake } from '../services/auth/auth.fake';

import {
  getToken,
  getUser,
  saveSession,
  clearSession,
} from '../services/auth/authStorage';

import { isFakeAuthEnabled } from '@/utils/authMode';

export const AuthContext = createContext(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [token, setToken] = useState(getToken());
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [traceId] = useState(() => uuidv4());

  useEffect(() => {
    const inicializar = async () => {
      const tokenSalvo = getToken();
      if (!tokenSalvo) {
        clearSession();
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        if (!isFakeAuthEnabled()) {
          const usuario = await AuthService.me();
          setUser(usuario);
          setIsAuthenticated(true);
          console.info('[AuthContext] Sessão validada', { traceId });
        }
      } catch (err) {
        console.warn('[AuthContext] Falha na sessão. Executando logout automático.', { traceId });
        logout(false);
      } finally {
        setLoading(false);
      }
    };

    inicializar();
  }, [traceId]);

  const login = async (email, senha) => {
    setLoading(true);
    setError(null);

    try {
      if (isFakeAuthEnabled()) {
        const { token: fakeToken, user: fakeUser } = await loginFake(email, senha);
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

      console.info('[AuthContext] Login bem-sucedido', { email, traceId });
    } catch (err) {
      console.error('[AuthContext] Falha no login', { erro: err.message, traceId });
      setError(err.message || 'Erro ao fazer login.');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = (redirect = true) => {
    AuthService.logout?.();
    clearSession();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setError(null);
    console.info('[AuthContext] Logout executado', { traceId });
  };

  const value = useMemo(() =>
    Object.freeze({
      user,
      token,
      isAuthenticated,
      loading,
      error,
      login,
      logout,
      setError,
      traceId,
    }),
    [user, token, isAuthenticated, loading, error, traceId]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * 🔐 useAuth – Acesso seguro ao contexto de autenticação
 * ✅ Protegido para SSR e ambientes híbridos
 */
export function useAuth({ fallbackIfEmpty = false } = {}) {
  const context = useContext(AuthContext);

  if (!context && fallbackIfEmpty) {
    console.warn('[useAuth] Contexto ausente. Fallback de leitura ativado.');
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      login: () => {},
      logout: () => {},
      setError: () => {},
      traceId: null,
    };
  }

  if (!context) {
    throw new Error('[useAuth] Este hook deve ser usado dentro de <AuthProvider>.');
  }

  return context;
}
