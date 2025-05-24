// =====================================================================================
// 📄 trackAccessDenied.js | Agroverso – Núcleo de Telemetria RBAC Modularizado (v4.0)
// =====================================================================================
// 🎯 Finalidade:
//     • Registrar eventos de acesso negado por RBAC com rastreabilidade total e plugabilidade externa.
//     • Compatível com SSR, GTM, LogRocket, DataDog, plugins externos e sistemas analíticos futuros.
// =====================================================================================

import { sendToGTM } from './destinos/sendToGTM';
import { sendToLogRocket } from './destinos/sendToLogRocket';
import { sendToDatadog } from './destinos/sendToDatadog';

const DESTINOS_PADRAO = ['GTM', 'LogRocket', 'DataDog'];
const registeredTelemetryPlugins = [];

/**
 * 🔌 registerTelemetryPlugin
 * Permite injetar plugins externos com prioridade e isolamento.
 * @param {(evento: object) => void} fn - função callback do plugin
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
  return `trace_${Math.random().toString(36).substring(2, 8)}_${Date.now().toString(36)}`;
}

function isSSR() {
  return typeof window === 'undefined';
}

/**
 * 🚫 trackAccessDenied
 * Registra um evento unificado de acesso negado por RBAC (Role-Based Access Control).
 *
 * @param {{ userRole: string, esperado: string[], rota: string }} opts
 * @param {'ativo' | 'passivo'} modo – Define o comportamento em ambiente SSR
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

  // 🎯 Envio para destinos padrão
  try {
    sendToGTM(evento);
  } catch (err) {
    console.warn('[GTM] erro ao enviar evento:', err);
  }

  try {
    sendToLogRocket(evento);
  } catch (err) {
    console.warn('[LogRocket] erro ao rastrear evento:', err);
  }

  try {
    sendToDatadog(evento);
  } catch (err) {
    console.warn('[DataDog] erro ao registrar evento:', err);
  }

  // 🔌 Plugins externos (ordenados por prioridade)
  registeredTelemetryPlugins
    .sort((a, b) => b.prioridade - a.prioridade)
    .forEach(({ fn, silencioso }) => {
      try {
        fn(evento);
      } catch (err) {
        if (!silencioso) throw err;
        console.warn('[Plugin externo] falha isolada:', err);
      }
    });

  // 🧠 Log final para rastreabilidade
  console.info('[RBAC][Telemetry Summary]', {
    destinos: DESTINOS_PADRAO,
    pluginsRegistrados: registeredTelemetryPlugins.length,
    ...evento,
  });
}
