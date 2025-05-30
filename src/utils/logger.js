// ===================================================================================================
// 📄 logger.js | Agroverso v3.0 – Núcleo Inteligente de Logging Corporativo com Rastreamento Modular
// ===================================================================================================
// 🎯 Finalidade:
//     • Padronizar mensagens de log com clareza emocional, semântica e contexto.
//     • Redirecionar para múltiplos destinos: Console, Sentry, LogRocket, Datadog, GTM.
//     • Garantir throttle, sanitização e persistência segura para ambientes offline.
// ===================================================================================================

const lastLogs = new Map()

/**
 * Throttle por chave — impede spam de logs idênticos em curto intervalo
 */
export function throttleLog(key, delay = 2000) {
  const now = Date.now()
  const lastTime = lastLogs.get(key) || 0
  if (now - lastTime < delay) return false
  lastLogs.set(key, now)
  return true
}

/**
 * Sanitiza campos sensíveis como tokens e senhas antes de envio.
 */
export function sanitizeLogData(data) {
  const clone = { ...data }
  delete clone.token
  delete clone.password
  delete clone.secret
  return clone
}

/**
 * Armazena logs localmente para reenvio posterior.
 */
export function saveOfflineLog(logData) {
  const buffer = JSON.parse(localStorage.getItem('agroverso_logs') || '[]')
  buffer.push(logData)
  localStorage.setItem('agroverso_logs', JSON.stringify(buffer))
}

/**
 * Reenvia todos os logs persistidos offline.
 */
export function replayOfflineLogs() {
  const buffer = JSON.parse(localStorage.getItem('agroverso_logs') || '[]')
  buffer.forEach(log => logToDestinations(log))
  localStorage.removeItem('agroverso_logs')
}

/**
 * Roteador central: envia para todos os destinos registrados.
 */
export function logToDestinations(rawLogData) {
  const logData = sanitizeLogData(rawLogData)
  const { level = 'info', message, stack, ...meta } = logData

  logToConsole(level, message, stack, meta)
  logToSentry(level, message, stack, meta)
  logToLogRocket(level, message, stack, meta)
  logToDatadog(level, message, stack, meta)
  logToGTM(level, message, stack, meta)
}

/**
 * Console local com formatação e filtro por ambiente.
 */
export function logToConsole(level, message, stack, meta) {
  if (process.env.NODE_ENV === 'production') return
  const output = stack ? `${message}\n${stack}` : message
  switch (level) {
    case 'error': console.error('[❌]', output, meta); break
    case 'warn': console.warn('[⚠️]', output, meta); break
    case 'debug': console.debug('[🐞]', output, meta); break
    default: console.info('[ℹ️]', output, meta)
  }
}

/**
 * Envia erros e mensagens para o Sentry, se disponível.
 */
export function logToSentry(level, message, stack, meta) {
  if (!window.Sentry?.captureException) return
  const error = new Error(message)
  if (stack) error.stack = stack
  window.Sentry[level === 'error' ? 'captureException' : 'captureMessage'](error, {
    level,
    extra: meta
  })
}

/**
 * Integra com LogRocket, se disponível no navegador.
 */
export function logToLogRocket(level, message, stack, meta) {
  if (!window.LogRocket?.log) return
  window.LogRocket.log(`[${level.toUpperCase()}] ${message}`, {
    ...meta,
    ...(stack && { stack }),
  })
}

/**
 * Envia logs para o Datadog Browser SDK.
 */
export function logToDatadog(level, message, stack, meta) {
  if (!window.DD_LOGS?.logger?.[level]) return
  window.DD_LOGS.logger[level](message, {
    ...meta,
    ...(stack && { stack }),
  })
}

/**
 * Push de log como evento para o Google Tag Manager.
 */
export function logToGTM(level, message, stack, meta) {
  if (!window.dataLayer) return
  window.dataLayer.push({
    event: `logger_${level}`,
    message,
    stack: stack || '',
    ...meta,
  })
}

/**
 * Exportação do logger principal padronizado
 */
export const logger = {
  info: (...args) => logToDestinations({ level: 'info', message: args.join(' ') }),
  warn: (...args) => logToDestinations({ level: 'warn', message: args.join(' ') }),
  error: (...args) => logToDestinations({ level: 'error', message: args.join(' ') }),
  debug: (...args) => {
    if (process.env.NODE_ENV !== 'production') {
      logToDestinations({ level: 'debug', message: args.join(' ') })
    }
  }
}
