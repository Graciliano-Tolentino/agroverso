// =====================================================================================
// 📄 AuthContext.jsx (v3.4) | Agroverso – Autenticação Global com Arquitetura Modular
// =====================================================================================
// Integra login real com AuthService e login simulado com auth.fake.ts
// Usuários simulados com base64, RBAC, perfil e verificação de conta ativa
// Desenvolvido com sabedoria, força e beleza — padrão técnico 12/10
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
import { loginFake } from '../services/auth/auth.fake'; // ✅ Lógica fake extraída

import {
  getToken,
  getUser,
  saveSession,
  clearSession,
} from '../services/auth/authStorage';
import { isFakeAuthEnabled } from '@/utils/authMode';

const AuthContext = createContext(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [token, setToken] = useState(getToken());
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authTraceId] = useState(() => uuidv4());

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
        if (!isFakeAuthEnabled()) {
          const me = await AuthService.me();
          setUser(me);
          setIsAuthenticated(true);
          console.info('[AuthContext] Sessão validada', { traceId: authTraceId });
        }
      } catch (err) {
        console.warn('[AuthContext] Sessão inválida. Logout automático.', { traceId: authTraceId });
        logout(false);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [authTraceId]);

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

      console.info('[AuthContext] Login bem-sucedido', {
        email,
        traceId: authTraceId,
      });
    } catch (err) {
      console.error('[AuthContext] Falha no login', {
        error: err.message,
        traceId: authTraceId,
      });
      setError(err.message || 'Erro ao fazer login.');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };
  const logout = (redirect = true) => {
    AuthService.logout();
    clearSession();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setError(null);
    console.info('[AuthContext] Logout executado', { traceId: authTraceId });
  };

  const value = useMemo(() => {
    const state = {
      user,
      token,
      isAuthenticated,
      loading,
      error,
      login,
      logout,
      setError,
      traceId: authTraceId,
    };
    return Object.freeze(state); // ✅ Proteção contra mutações acidentais
  }, [user, token, isAuthenticated, loading, error, authTraceId]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook seguro para acesso ao contexto de autenticação.
 * @param {Object} options
 * @param {boolean} options.fallbackIfEmpty - Se true, retorna objeto vazio em vez de lançar erro
 */
export function useAuth({ fallbackIfEmpty = false } = {}) {
  const context = useContext(AuthContext);

  if (!context && fallbackIfEmpty) {
    console.warn('[useAuth] Contexto ausente. Usando fallback SSR-safe.');
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
    throw new Error('[useAuth] Este hook só pode ser usado dentro de <AuthProvider>.');
  }

  return context;
}
