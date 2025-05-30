// =====================================================================================
// 📄 mensagensProtectedRoute.js | Agroverso – Mensagens Padrão da Rota Protegida
// =====================================================================================
// 🎯 Finalidade:
//     • Centralizar textos de controle de acesso em rotas protegidas.
//     • Facilitar reutilização, manutenção e suporte multilíngue (pt/en).
//     • Eliminar acoplamento de mensagens no componente.
// 🔐 Integrado ao RBAC, UX emocional e rastreabilidade semântica.
// ✨ Desenvolvido com sabedoria, força e beleza — Padrão Técnico 12/10
// =====================================================================================

export const mensagens = {
  acessoNegado: {
    pt: '⛔ Acesso negado: você não tem permissão para visualizar esta página.',
    en: '⛔ Access denied: you do not have permission to view this page.'
  },
  redirecionando: {
    pt: '🔄 Redirecionando para a página de login...',
    en: '🔄 Redirecting to login page...'
  },
  autenticando: {
    pt: '🔐 Verificando suas credenciais...',
    en: '🔐 Verifying your credentials...'
  },
  expirado: {
    pt: '⏰ Sessão expirada. Por favor, faça login novamente.',
    en: '⏰ Session expired. Please log in again.'
  },
  bloqueado: {
    pt: '🔒 Acesso temporariamente bloqueado.',
    en: '🔒 Access temporarily blocked.'
  },
  aguardando: {
    pt: '⏳ Aguarde enquanto preparamos seu ambiente seguro.',
    en: '⏳ Please wait while we prepare your secure environment.'
  }
}
