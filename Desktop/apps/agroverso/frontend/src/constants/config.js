// =====================================================================================
// 📄 config.js | Agroverso – Configurações Globais, Ambientes e Chaves de Execução [v4.0]
// =====================================================================================
// 🧭 Finalidade:
//     • Centraliza parâmetros críticos de ambiente, autenticação, rotas e metadados globais.
//     • Refatorado para ser expansível, validável, modular e preparado para SSR e i18n.
//     • Desenvolvido com sabedoria, força e beleza — padrão técnico pessimista 12/10.
// =====================================================================================

/* 🌐 Ambiente Atual */
const ambienteAtivo = import.meta.env.MODE || 'desconhecido';

/* 🔎 Função para validação de variáveis sensíveis */
function validarConfigObrigatoria(chave, valor) {
  if (!valor) {
    console.warn(`⚠️ [CONFIG] Variável de ambiente obrigatória não definida: ${chave}`);
  }
}

/* 🧩 Flags Ambientais */
export const isDesenvolvimento = ambienteAtivo === 'development';
export const isProducao = ambienteAtivo === 'production';

/* 🔐 Configuração Global */
export const config = {
  nomeAplicacao: 'Agroverso',
  urlPadrao: 'https://agroverso.tec.br',
  modoFakeAutenticacao: false,
  ambiente: ambienteAtivo,

  fallback403: {
    titulo: 'Acesso negado',
    mensagem: 'Você não possui permissão para acessar esta área do sistema.',
    recomendacao: 'Verifique se está autenticado e se possui permissões adequadas.',
    codigo: 403,
  },

  tokenPublico: import.meta.env.VITE_TOKEN_PUBLICO || null,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.agroverso.com',
};

// 🧪 Validação de variáveis críticas
validarConfigObrigatoria('VITE_TOKEN_PUBLICO', config.tokenPublico);
validarConfigObrigatoria('VITE_API_BASE_URL', config.apiBaseUrl);

// =====================================================================================
// ⚙️ Constantes Globais | Padrões Técnicos e Parametrizações Compartilhadas
// =====================================================================================

/* 🔄 Paginação */
export const PAGINACAO_TAMANHO_PADRAO = 10;
export const PAGINACAO_TAMANHO_MAXIMO = 100;

/* 🎨 Temas visuais */
export const TEMAS_DISPONIVEIS = ['claro', 'escuro'];
export const TEMA_PADRAO = 'claro';

/* 📅 Datas e horários */
export const FORMATO_DATA_PADRAO = 'DD/MM/YYYY';
export const FORMATO_DATA_HORA_PADRAO = 'DD/MM/YYYY HH:mm';
export const TIMEZONE_PADRAO = 'America/Sao_Paulo'; // 🌐 Universalização e consistência temporal

/* 🛡️ Segurança: Tentativas e bloqueio */
export const LIMITE_TENTATIVAS_LOGIN = 5;
export const INTERVALO_BLOQUEIO_TENTATIVAS = 15; // minutos

// =====================================================================================
// 🧠 Telemetria e Observabilidade | Integrações com ferramentas externas
// =====================================================================================

export const TELEMETRIA_ATIVA = true;
export const ID_TRACKING_GTM = import.meta.env.VITE_ID_GTM || null;
export const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN || null;

validarConfigObrigatoria('VITE_ID_GTM', ID_TRACKING_GTM);
validarConfigObrigatoria('VITE_SENTRY_DSN', SENTRY_DSN);

// =====================================================================================
// 📞 Suporte Institucional | Canais de Comunicação
// =====================================================================================

export const WHATSAPP_SUPORTE = '+5511963372373';
export const EMAIL_CONTATO = 'contato@agroverso.tec.br';

// =====================================================================================
// 🎁 Recursos Beta & Metadados de Versão
// =====================================================================================

export const MODO_BETA = import.meta.env.VITE_MODO_BETA === 'true';
export const VERSAO_SISTEMA = 'v4.0.0';
export const BUILD_HASH = import.meta.env.VITE_BUILD_HASH || 'desconhecido';

validarConfigObrigatoria('VITE_BUILD_HASH', BUILD_HASH);
