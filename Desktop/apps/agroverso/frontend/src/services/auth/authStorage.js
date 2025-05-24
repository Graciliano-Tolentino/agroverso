// ==========================================
// 📄 authStorage.js | Armazenamento seguro de sessão (Agroverso)
// ==========================================
// Responsável por salvar, recuperar e remover token e usuário da sessão local.
// Desenvolvido com sabedoria, força e beleza – padrão High Tech Agroverso
// ⚠️ Atenção: Armazenamento em localStorage é vulnerável a XSS. Para ambientes críticos, usar cookies HttpOnly.
// ==========================================

const TOKEN_KEY = 'agroverso_token';
const USER_KEY  = 'agroverso_user';

/**
 * 🔐 Salva o token JWT e os dados do usuário na sessão local (localStorage)
 * Garante que os dados estejam válidos antes de persistir.
 *
 * @param {string} token - Token JWT de autenticação
 * @param {Object} user - Objeto com os dados do usuário autenticado
 * @throws {Error} Se token ou usuário forem inválidos
 */
export const saveSession = (token, user) => {
  if (!token || typeof token !== 'string') {
    throw new Error('Token inválido: é necessário uma string JWT.');
  }

  if (!user || typeof user !== 'object' || Array.isArray(user)) {
    throw new Error('Usuário inválido: é necessário um objeto JSON.');
  }

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  // (Opcional) Exemplo de TTL: salva timestamp de expiração de 2 horas
  // localStorage.setItem('agroverso_exp', String(Date.now() + 2 * 60 * 60 * 1000));
};
/**
 * 🔍 Recupera o token JWT salvo na sessão local
 *
 * @returns {string|null} Token JWT ou `null` se não encontrado
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY);

/**
 * 👤 Recupera os dados do usuário autenticado salvos na sessão local
 *
 * @returns {Object|null} Objeto do usuário ou `null` se inexistente ou corrompido
 */
export const getUser = () => {
  try {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (err) {
    console.error('Erro ao recuperar os dados do usuário da sessão:', err);
    return null;
  }
};
/**
 * ❌ Limpa completamente os dados da sessão local
 * Remove token, dados do usuário e eventuais metadados de sessão
 */
export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  // localStorage.removeItem('agroverso_exp'); // caso esteja usando expiração customizada
};

// ==========================================
// 🌱 Desenvolvido com sabedoria, força e beleza
// 🧠 Padrão High Tech Agroverso – agroverso.tec.br
// ==========================================
