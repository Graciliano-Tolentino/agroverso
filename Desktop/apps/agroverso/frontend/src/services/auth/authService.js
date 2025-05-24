// =====================================================================================
// 📄 authService.js | Serviço de Autenticação com Interceptor (v3.1)
// =====================================================================================
// 🔐 JWT + Axios com interceptadores inteligentes e fila de renovação
// 🧠 Agora compatível com Vite, Rollup e ESM puro (jwt-decode@4.x)
// 🌱 Padrão Agroverso 12/10 – Segurança, clareza e estabilidade
// =====================================================================================

import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // ✅ Correção ESM implementada com sucesso

import {
  getToken,
  saveSession,
  clearSession,
  getUser,
} from './authStorage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.agroverso.tec.br';

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

/**
 * ⏱️ Verifica se o token está expirado com margem de segurança (default 60s)
 */
const isTokenExpired = (token, bufferInSeconds = 60) => {
  try {
    const decoded = jwtDecode(token); // ✅ Uso correto da função nomeada
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp <= now + bufferInSeconds;
  } catch (err) {
    console.error('Erro ao decodificar JWT:', err);
    return true;
  }
};

// 🔁 Controle global de renovação
let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

/**
 * ♻️ Solicita novo token e atualiza session local
 */
const refreshToken = async () => {
  try {
    const response = await instance.post('/auth/refresh', {}, {
      withCredentials: true,
    });

    const { token, user } = response.data;

    if (!token || !user) throw new Error('Resposta inválida ao renovar token');

    saveSession(token, user);
    return token;
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    clearSession();
    return null;
  }
};

// 🔐 Interceptor de requisição
instance.interceptors.request.use(
  async (config) => {
    let token = getToken();

    if (token && isTokenExpired(token)) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshToken();
          token = newToken;
          onRefreshed(newToken);
        } catch (err) {
          console.error('Erro no refresh de token:', err);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        addRefreshSubscriber((newToken) => {
          if (newToken && config?.headers) {
            config.headers.Authorization = `Bearer ${newToken}`;
          }
          resolve(config);
        });
      });
    }

    if (token && config?.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🛡️ Interceptor de resposta com retry após erro 401
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = await refreshToken();
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Erro após 401 ao tentar renovar:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// 🔑 Função de login via API
const login = async (email, senha) => {
  if (!email || typeof email !== 'string') throw new Error('Email inválido');
  if (!senha || typeof senha !== 'string') throw new Error('Senha inválida');

  const response = await instance.post('/auth/login', { email, senha });
  const { token, user } = response.data;

  if (!token || isTokenExpired(token)) {
    throw new Error('Token inválido ou expirado');
  }

  saveSession(token, user);
  return { token, user };
};

// 🚪 Função de logout
const logout = () => {
  clearSession();
  // await instance.post('/auth/logout'); // opcional
};

// 📥 Recupera dados do usuário autenticado
const me = async () => {
  const response = await instance.get('/auth/me');
  return response.data;
};

// 🚀 Exporta o serviço completo
export const AuthService = {
  login,
  logout,
  me,
  refreshToken,
  axiosInstance: instance,
};
