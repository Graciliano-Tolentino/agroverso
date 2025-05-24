// ==============================================================================
// 📄 useLogger.js | Agroverso – Logging Centralizado com Rastreamento Multi-canal
// 📁 Diretório: src/hooks/
// 🎯 Propósito:
//     • Capturar erros globais e rejeições
//     • Unificar registro de erros e avisos com rastreabilidade total
//     • Integrar com Sentry, LogRocket, GTM, Datadog e fallback local
// ==============================================================================

import { useEffect } from 'react';
import { logToDestinations, throttleLog, saveOfflineLog } from '@/utils/logger';

/**
 * Hook Agroverso para captura reativa global (onerror e unhandledrejection)
 * Usado uma vez por componente raiz (ex: App.jsx)
 */
export default function useLogger({ component, context, offlineFallback = false }) {
  useEffect(() => {
    // 📛 Captura de erros globais
    const handleError = (error, source, lineno, colno, errObj) => {
      const key = `${component}::${error?.message || 'erro_global'}`;
      if (!throttleLog(key)) return;

      const logData = {
        level: 'error',
        message: error?.message || 'Erro global não identificado',
        stack: errObj?.stack || error?.stack || `at ${source}:${lineno}:${colno}`,
        component,
        context,
        type: 'window.onerror',
        timestamp: new Date().toISOString(),
      };

      try {
        logToDestinations(logData);
      } catch (dispatchError) {
        if (offlineFallback) saveOfflineLog(logData);
      }
    };

    // ❌ Captura de Promessas rejeitadas
    const handleRejection = (event) => {
      const error = event.reason || {};
      const key = `${component}::${error?.message || 'rejeicao_nao_tratada'}`;
      if (!throttleLog(key)) return;

      const logData = {
        level: 'error',
        message: error?.message || 'Rejeição de promessa sem tratamento',
        stack: error?.stack || error?.toString() || null,
        component,
        context,
        type: 'unhandledrejection',
        timestamp: new Date().toISOString(),
      };

      try {
        logToDestinations(logData);
      } catch (dispatchError) {
        if (offlineFallback) saveOfflineLog(logData);
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, [component, context, offlineFallback]);
}
// ==============================================================================
// ✅ Métodos utilitários para logging direto em componentes, funções e fallbacks
// ==============================================================================

/**
 * logError – Registra erro com stack e contexto técnico
 * @param {Object} options
 * @param {Error} [options.error] – Objeto de erro original (preferencial)
 * @param {string} [options.message] – Mensagem alternativa
 * @param {string} options.component – Nome do componente onde ocorreu o erro
 * @param {string} options.context – Descrição funcional ou módulo
 * @param {string} [options.level='error'] – Nível de severidade
 * @param {boolean} [options.offlineFallback=true] – Salvar localmente se falhar
 */
export function logError({
  error,
  message = '',
  component,
  context,
  level = 'error',
  offlineFallback = true,
}) {
  const key = `${component}::${error?.message || message || 'erro_desconhecido'}`;
  if (!throttleLog(key)) return;

  const logData = {
    level,
    message: error?.message || message || 'Erro não especificado',
    stack: error?.stack || error?.toString() || 'stack indisponível',
    component,
    context,
    type: 'runtime',
    timestamp: new Date().toISOString(),
  };

  try {
    logToDestinations(logData);
  } catch (dispatchError) {
    if (offlineFallback) saveOfflineLog(logData);
  }
}

/**
 * logWarn – Registra aviso técnico ou operacional com rastreabilidade
 * @param {Object} options
 * @param {string} options.message – Texto do aviso
 * @param {string} options.component – Nome do componente de origem
 * @param {string} options.context – Situação ou motivo do log
 * @param {boolean} [options.offlineFallback=false]
 */
export function logWarn({
  message,
  component,
  context,
  offlineFallback = false,
}) {
  const key = `${component}::${message}`;
  if (!throttleLog(key)) return;

  const logData = {
    level: 'warn',
    message: message || 'Aviso não especificado',
    stack: null,
    component,
    context,
    type: 'warning',
    timestamp: new Date().toISOString(),
  };

  try {
    logToDestinations(logData);
  } catch (dispatchError) {
    if (offlineFallback) saveOfflineLog(logData);
  }
}
