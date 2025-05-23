// =====================================================================================
// 📄 AuthContext.jsx (v3.5) | Agroverso – Autenticação Global com Exportação Nomeada
// =====================================================================================
// ✅ Corrigido para exportar AuthContext de forma nomeada, compatível com Vite/Rollup
// ✅ Recomendado para setups com múltiplos hooks e múltiplos providers coexistentes
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

// ✅ Exportação nomeada corrigida
export const AuthContext = createContext(undefined);
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

      console.info('[AuthContext] Login bem-sucedido', { email, traceId: authTraceId });
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
    return Object.freeze(state); // 🔒 Protege contra mutações externas
  }, [user, token, isAuthenticated, loading, error, authTraceId]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * 🔓 Hook seguro para acesso ao contexto de autenticação
 * Protegido contra uso fora do <AuthProvider> e compatível com SSR
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
