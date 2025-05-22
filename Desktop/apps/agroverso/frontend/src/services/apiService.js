/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/services/apiService.js
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Serviço centralizado de integração com backend.
     Organizado por domínio funcional (posts, certificados, contato).
     Inclui timeout, tratamento de erro e mensagens padronizadas.
     Desenvolvido com sabedoria, força e beleza.
  ============================================
*/

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.agroverso.tec.br';

// Utilitário genérico de requisição com timeout
async function request(endpoint, method = 'GET', data = null, signal = null, timeout = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  const finalSignal = signal || controller.signal;

  const config = {
    method,
    headers: { 'Content-Type': 'application/json' },
    signal: finalSignal,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${baseURL}${endpoint}`, config);
    clearTimeout(timer);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Erro na requisição');
    }

    return await response.json();
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Tempo limite excedido');
    }
    console.error(`[API] ${method} ${endpoint} –`, err.message);
    throw err;
  }
}
// 🔖 Módulo: Posts
const posts = {
  async getTodos() {
    return await request('/posts');
  }
};

// 📬 Módulo: Contato
const contato = {
  async enviarMensagem(formData) {
    return await request('/contato', 'POST', formData);
  }
};

// 📄 Módulo: Certificados
const certificados = {
  async validar(codigo) {
    return await request(`/certificados/${codigo}`);
  }
};

// Exportação agrupada por domínio
export const api = {
  posts,
  contato,
  certificados
};

/*
  ============================================
  🔚 Fim do arquivo src/services/apiService.js
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
