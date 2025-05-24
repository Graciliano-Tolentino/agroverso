/*
  =====================================================================================
  📄 DECISION_REASONS.js
  📁 src/constants
  ✍️ Refatorado por: Graciliano Tolentino
  📅 Atualizado em: 24/05/2025
  🎯 Enum padronizado para motivos de (não) exibição de componentes no layout

       • Utilizado por buildLayoutView.js
       • Compatível com logs, i18n, dashboards e BI
       • Pode ser extendido futuramente com L004+, etc.

  🌍 Framework Agroverso — Legibilidade, rastreabilidade e governança visual
  =====================================================================================
*/

export const DECISION_REASONS = {
  ALLOWED: {
    code: 'L000',
    label: 'Exibição permitida',
    reason: 'allowed',
  },
  PERMISSION_DENIED: {
    code: 'L001',
    label: 'Permissão negada',
    reason: 'permission:denied',
  },
  CONFIG_DISABLED: {
    code: 'L002',
    label: 'Desativado por configuração',
    reason: 'config:hidden',
  },
  FALLBACK_DISABLED: {
    code: 'L003',
    label: 'Fallback desativado',
    reason: 'fallback:disabled',
  },
};
