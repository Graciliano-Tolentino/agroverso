// ==============================================================================
// 📄 logger.js | Agroverso – Núcleo de Logging Corporativo Modularizado (v2.5)
// 📁 Diretório: src/utils/
// ✨ Integração: Console Dev, Sentry, Datadog, LogRocket, GTM
// 🧠 Recursos: Throttle, Persistência Offline, Stack Trace, Sanitização, Retry
// ==============================================================================

const lastLogs = new Map();

/**
 * Impede spam de logs em intervalos curtos.
 * @param {string} key - Chave única do evento
 * @param {number} delay - Tempo mínimo entre eventos iguais (ms)
 * @returns {boolean} - Se o log pode ou não ser enviado
 */
export function throttleLog(key, delay = 2000) {
  const now = Date.now();
  const lastTime = lastLogs.get(key) || 0;
  if (now - lastTime < delay) return false;
  lastLogs.set(key, now);
  return true;
}

/**
 * Sanitiza dados para evitar envio de informações sensíveis.
 * @param {object} data - Objeto do log
 * @returns {object} - Objeto sanitizado
 */
export function sanitizeLogData(data) {
  const clone = { ...data };
  delete clone.token;
  delete clone.password;
  return clone;
}

/**
 * Armazena logs localmente para envio posterior.
 * @param {object} logData - Dados do log
 */
export function saveOfflineLog(logData) {
  const buffer = JSON.parse(localStorage.getItem('agroverso_logs') || '[]');
  buffer.push(logData);
  localStorage.setItem('agroverso_logs', JSON.stringify(buffer));
}

/**
 * Reenvia logs armazenados offline.
 */
export function replayOfflineLogs() {
  const buffer = JSON.parse(localStorage.getItem('agroverso_logs') || '[]');
  buffer.forEach(log => logToDestinations(log));
  localStorage.removeItem('agroverso_logs');
}

/**
 * Central de logs – redireciona para todos os destinos (console, Sentry etc).
 * @param {object} rawLogData - Objeto de log (message, level, stack, etc.)
 */
export function logToDestinations(rawLogData) {
  const logData = sanitizeLogData(rawLogData);
  const { level = 'info', message, stack, ...meta } = logData;

  logToConsole(level, message, stack, meta);
  logToSentry(level, message, stack, meta);
  logToLogRocket(level, message, stack, meta);
  logToDatadog(level, message, stack, meta);
  logToGTM(level, message, stack, meta);
}

// ==== Destinos Individuais ==============================

export function logToConsole(level, message, stack, meta) {
  if (process.env.NODE_ENV === 'production') return;

  const output = stack ? `${message}\n${stack}` : message;
  switch (level) {
    case 'error': console.error(output, meta); break;
    case 'warn': console.warn(output, meta); break;
    default: console.log(output, meta);
  }
}

export function logToSentry(level, message, stack, meta) {
  if (!window.Sentry?.captureException) return;

  const error = new Error(message);
  if (stack) error.stack = stack;

  if (stack) {
    window.Sentry.captureException(error, {
      level,
      extra: { ...meta, stack }
    });
  } else {
    window.Sentry.captureMessage(message, {
      level,
      extra: meta
    });
  }
}

export function logToLogRocket(level, message, stack, meta) {
  if (!window.LogRocket?.log) return;

  window.LogRocket.log(`[${level.toUpperCase()}] ${message}`, {
    ...meta,
    ...(stack && { stack }),
  });
}

export function logToDatadog(level, message, stack, meta) {
  if (!window.DD_LOGS?.logger?.[level]) return;

  window.DD_LOGS.logger[level](message, {
    ...meta,
    ...(stack && { stack }),
  });
}

export function logToGTM(level, message, stack, meta) {
  if (!window.dataLayer) return;

  window.dataLayer.push({
    event: `logger_${level}`,
    message,
    stack: stack || '',
    ...meta,
  });
}
