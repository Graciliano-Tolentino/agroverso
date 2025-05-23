// =====================================================================================
// 📄 trackAccessDenied.js | Agroverso – Núcleo Modular de Telemetria de RBAC (v3.1)
// =====================================================================================
// ✅ Corrige e refina duplicidade de eventos
// ✅ Adiciona traceId global para correlação cross-plataforma
// ✅ Padroniza nomenclatura: userRole, expectedRoles, path
// ✅ Permite plugins externos com prioridade e silenciamento
// ✅ Isola falhas por destino com try/catch independentes
// =====================================================================================

import { sendToGTM } from './destinos/sendToGTM';
import { sendToLogRocket } from './destinos/sendToLogRocket';
import { sendToDatadog } from './destinos/sendToDatadog';

const DESTINOS = ['GTM', 'LogRocket', 'DataDog'];
const registeredTelemetryPlugins = [];

/**
 * 🔌 Registra plugins externos de rastreamento
 * @param {(evento: object) => void} fn
 * @param {{ prioridade?: number, silencioso?: boolean }} options
 */
export function registerTelemetryPlugin(fn, options = {}) {
  registeredTelemetryPlugins.push({
    fn,
    prioridade: options.prioridade || 0,
    silencioso: options.silencioso ?? true,
  });
}

function gerarTraceId() {
  return 'trace_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function isSSR() {
  return typeof window === 'undefined';
}

/**
 * 🚫 trackAccessDenied
 * Registra um evento unificado de acesso negado por RBAC
 *
 * @param {{ userRole: string, esperado: string[], rota: string }} opts
 * @param {'ativo' | 'passivo'} modo - Define o comportamento SSR
 */
export function trackAccessDenied(opts, modo = 'ativo') {
  const { userRole, esperado, rota } = opts;

  if (isSSR()) {
    if (modo === 'ativo') {
      console.warn('[SSR][RBAC] Evento ignorado (modo ativo)', { userRole, esperado, rota });
    }
    return;
  }

  const traceId = gerarTraceId();
  const timestamp = new Date().toISOString();

  const evento = {
    traceId,
    userRole,
    expectedRoles: esperado,
    path: rota,
    timestamp,
  };

  // 🎯 Envio para destinos principais (modularizados)
  try {
    sendToGTM({ ...evento });
  } catch (err) {
    console.warn('[GTM] erro ao enviar evento:', err);
  }

  try {
    sendToLogRocket({ ...evento });
  } catch (err) {
    console.warn('[LogRocket] erro ao rastrear evento:', err);
  }

  try {
    sendToDatadog({ ...evento });
  } catch (err) {
    console.warn('[DataDog] erro ao registrar evento:', err);
  }

  // 🔌 Execução de plugins externos ordenados por prioridade
  registeredTelemetryPlugins
    .sort((a, b) => b.prioridade - a.prioridade)
    .forEach(({ fn, silencioso }) => {
      try {
        fn(evento);
      } catch (err) {
        if (!silencioso) throw err;
        console.warn('[Plugin externo] falha isolada', err);
      }
    });

  // 🖥️ Log final para correlação e debug
  console.info('[RBAC][Resumo de Telemetria]', {
    destinos: DESTINOS,
    pluginsRegistrados: registeredTelemetryPlugins.length,
    ...evento,
  });
}
