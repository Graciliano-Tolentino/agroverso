/*
  =====================================================================================
  📄 buildLayoutView.js (v3.4)
  📁 src/utils
  ✍️ Refatorado por: Graciliano Tolentino
  📅 Atualizado em: 25/05/2025
  🎯 Decisor universal para renderização de layout com fallback seguro, rastreável e auditável

       • Timestamp + traceId + status para telemetria completa
       • Tolerância programada para componentes críticos
       • Metadados semânticos com enum de motivos e mensagens
       • Seguro para SSR, SPA, microsserviços e ambientes federados

  🌍 Framework Agroverso — Decisões além da humanidade, com sabedoria, força e beleza
  =====================================================================================
*/

import { v4 as uuidv4 } from 'uuid';

export const DECISION_REASONS = {
  PERMISSION_DENIED: { code: 'L001', label: 'Permissão negada', reason: 'permission:denied' },
  CONFIG_DISABLED:   { code: 'L002', label: 'Desativado por configuração', reason: 'config:hidden' },
  FALLBACK_DISABLED: { code: 'L003', label: 'Fallback desativado', reason: 'fallback:disabled' },
  ALLOWED:           { code: 'L000', label: 'Exibição permitida', reason: 'allowed' },
};

/**
 * Calcula a visibilidade de seções do layout.
 *
 * @param {Object} input
 * @param {Object} input.config
 * @param {string} input.role
 * @param {string[]} input.permissions
 * @param {Object[]} input.components
 * @param {boolean} [input.fallbackIfNoPermission=false]
 * @param {function} [input.onDecision]
 * @param {string} [input.caller] - Origem da chamada (SSR, SPA, etc)
 *
 * @returns {Object} layout + meta
 */
export function buildLayoutView({
  config = {},
  role = 'guest',
  permissions = [],
  components = [],
  fallbackIfNoPermission = false,
  onDecision,
  caller = 'unspecified',
}) {
  const traceId = uuidv4();
  const timestamp = new Date().toISOString();

  // Validações formais
  if (!Array.isArray(permissions) || !permissions.every(p => typeof p === 'string' && p.trim())) {
    throw new Error('[buildLayoutView] "permissions" deve conter apenas strings válidas.');
  }

  if (!role || typeof role !== 'string') {
    throw new Error('[buildLayoutView] "role" deve ser uma string não vazia.');
  }

  if (!Array.isArray(components) || components.length === 0) {
    return {
      layout: {},
      meta: {
        traceId,
        timestamp,
        caller,
        status: 'error',
        reason: 'invalid:components:empty',
        message: 'Nenhum componente fornecido para avaliação.',
      },
    };
  }

  const isAdmin = role === 'admin';
  const layout = {};

  for (const comp of components) {
    const section = comp.section;
    const permission = comp.permission;
    const isCritical = !!comp.isCritical;
    const label = comp.label ?? section;
    const i18nKey = comp.i18nKey ?? `layout.${section}`;

    const configDisabled = config[section] === false;
    const permissionGranted = permission ? permissions.includes(permission) : true;

    let reasonObj = DECISION_REASONS.ALLOWED;

    const isVisible =
      isCritical || (
        !configDisabled &&
        (isAdmin || permissionGranted || fallbackIfNoPermission)
      );

    if (!isVisible) {
      if (configDisabled) {
        reasonObj = DECISION_REASONS.CONFIG_DISABLED;
      } else if (permission && !permissionGranted) {
        reasonObj = DECISION_REASONS.PERMISSION_DENIED;
      } else {
        reasonObj = DECISION_REASONS.FALLBACK_DISABLED;
      }
    }

    layout[section] = {
      section,
      label,
      i18nKey,
      visible: isVisible,
      reason: reasonObj.reason,
      code: reasonObj.code,
      message: reasonObj.label,
      permissionRequired: permission ?? null,
      permissionGranted,
      isCritical,
      role,
    };
  }

  if (typeof onDecision === 'function') {
    try {
      onDecision({
        layout,
        role,
        permissions,
        config,
        caller,
        traceId,
        timestamp,
      });
    } catch (err) {
      console.warn('[buildLayoutView] Erro ao executar onDecision:', err);
    }
  }

  return {
    layout,
    meta: {
      traceId,
      timestamp,
      caller,
      status: 'success',
    },
  };
}
