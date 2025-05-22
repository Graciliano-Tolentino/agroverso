// ==========================================
// 📄 authService.js | Serviço de Autenticação com Interceptor
// ==========================================
// Lida com login, refresh token, logout e proteção automática via Axios
// Ideal para ambiente de produção com tokens JWT expiráveis
// Desenvolvido com sabedoria, força e beleza – padrão High Tech Agroverso
// ==========================================

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  getToken,
  saveSession,
  clearSession,
  getUser,
} from './authStorage';

/**
 * 🌐 URL base da API protegida do Agroverso
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.agroverso.tec.br';

/**
 * 🔧 Instância Axios com configuração inicial
 */
const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // garante envio de cookies HttpOnly quando necessário
});
/**
 * ⏱️ Verifica se o token JWT está expirado, com margem de segurança.
 * @param {string} token - Token JWT
 * @param {number} bufferInSeconds - Margem antes do expirar real (padrão: 60s)
 * @returns {boolean} Verdadeiro se o token estiver vencido ou inválido
 */
const isTokenExpired = (token, bufferInSeconds = 60) => {
  try {
    const decoded = jwt_decode(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp <= (now + bufferInSeconds);
  } catch (err) {
    console.error('Erro ao decodificar token JWT:', err);
    return true;
  }
};

/**
 * 🔁 Variáveis globais de controle de renovação concorrente
 */
let isRefreshing = false;
let refreshSubscribers = [];

/**
 * 📬 Informa todas as requisições aguardando novo token
 * @param {string} token - Novo token gerado com sucesso
 */
const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

/**
 * 📌 Adiciona uma nova requisição à fila de espera pela renovação
 * @param {(token: string) => void} callback
 */
const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};
/**
 * ♻️ Requisição de renovação de token no backend
 * Atualiza o armazenamento local com o novo token e usuário
 * @returns {Promise<string|null>} Novo token ou null se falhar
 */
const refreshToken = async () => {
  try {
    const response = await instance.post('/auth/refresh', {}, {
      withCredentials: true, // necessário para receber cookies HttpOnly
    });

    const { token, user } = response.data;

    if (!token || !user) {
      throw new Error('Resposta inválida ao renovar token');
    }

    saveSession(token, user);
    return token;
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    clearSession();
    return null;
  }
};
/**
 * 🔐 Interceptador de requisições
 * Verifica validade do token antes de cada requisição.
 * Se o token estiver expirado, renova antes de seguir.
 */
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
          console.error('Erro ao renovar token dentro do interceptor:', err);
        } finally {
          isRefreshing = false;
        }
      }

      // Fila de espera pela renovação
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
/**
 * 🛡️ Interceptador de respostas
 * Se a resposta for 401 (não autorizado), tenta renovar o token e repetir a requisição
 */
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Já tentou renovar? Evita loop infinito
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = await refreshToken();

        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return instance(originalRequest); // tenta de novo com o novo token
        }
      } catch (refreshError) {
        console.error('Erro ao renovar token após 401:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);
/**
 * 🔑 Login via API
 * @param {string} email - Email do usuário
 * @param {string} senha - Senha do usuário
 * @returns {Promise<{ token: string, user: Object }>}
 */
const login = async (email, senha) => {
  if (!email || typeof email !== 'string') {
    throw new Error('Email inválido');
  }
  if (!senha || typeof senha !== 'string') {
    throw new Error('Senha inválida');
  }

  const response = await instance.post('/auth/login', { email, senha });
  const { token, user } = response.data;

  if (!token || isTokenExpired(token)) {
    throw new Error('Token inválido ou expirado');
  }

  saveSession(token, user);
  return { token, user };
};

/**
 * 🚪 Logout manual do usuário
 */
const logout = () => {
  clearSession();
  // Opcional: notificar backend
  // await instance.post('/auth/logout');
};

/**
 * 📥 Obter dados do usuário atual
 * @returns {Promise<Object>}
 */
const me = async () => {
  const response = await instance.get('/auth/me');
  return response.data;
};

/**
 * 🚀 Serviço de Autenticação completo
 */
export const AuthService = {
  login,
  logout,
  me,
  refreshToken,
  axiosInstance: instance,
};

// ==========================================
// 🌱 Desenvolvido com sabedoria, força e beleza
// 🧠 Padrão High Tech Agroverso – agroverso.tec.br
// ==========================================
