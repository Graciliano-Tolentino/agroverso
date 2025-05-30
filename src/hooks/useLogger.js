// =====================================================================================================
// 📄 useLogger.js | Agroverso – Hook de Logging Global com Captura de Erros, Rejeições e Replay Offline
// 📁 Diretório: src/hooks/
// 🌐 Integração: Sentry, LogRocket, GTM, Datadog, Observabilidade Agroverso
// 🔁 Foco: resiliência offline, rastreabilidade contextual e segurança silenciosa
// =====================================================================================================

import { useEffect } from 'react'
import {
  logToDestinations,
  throttleLog,
  saveOfflineLog,
  replayOfflineLogs
} from '@/utils/logger'

/**
 * useLogger – Hook universal de logging centralizado
 * Ativa:
 *   1. Replay de logs offline (armazenados em localStorage)
 *   2. Captura de erros globais (window.onerror)
 *   3. Captura de rejeições não tratadas (unhandledrejection)
 *
 * @param {Object} [config]
 * @param {string} [config.component='App'] – Identificador do ponto de origem (componente base)
 * @param {string} [config.context='App Boot'] – Contexto semântico do logger
 * @param {boolean} [config.offlineFallback=true] – Permitir salvar logs localmente em caso de falha
 */
export default function useLogger({
  component = 'App',
  context = 'App Boot',
  offlineFallback = true
} = {}) {
  useEffect(() => {
    // 🔁 Reenvia logs salvos no localStorage
    replayOfflineLogs()

    // 📛 Captura de erros não interceptados no navegador
    const handleGlobalError = (msg, src, lineno, colno, err) => {
      const key = `${component}::${msg}`
      if (!throttleLog(key)) return

      const logData = {
        level: 'error',
        message: msg,
        stack: err?.stack || `at ${src}:${lineno}:${colno}`,
        component,
        context,
        type: 'window.onerror',
        timestamp: new Date().toISOString()
      }

      try {
        logToDestinations(logData)
      } catch {
        if (offlineFallback) saveOfflineLog(logData)
      }
    }

    // ❌ Captura de rejeições silenciosas (Promises não tratadas)
    const handlePromiseRejection = event => {
      const error = event.reason || {}
      const key = `${component}::${error.message || 'Rejeição silenciosa'}`
      if (!throttleLog(key)) return

      const logData = {
        level: 'error',
        message: error.message || 'Rejeição de promessa não tratada',
        stack: error.stack || error.toString() || null,
        component,
        context,
        type: 'unhandledrejection',
        timestamp: new Date().toISOString()
      }

      try {
        logToDestinations(logData)
      } catch {
        if (offlineFallback) saveOfflineLog(logData)
      }
    }

    window.addEventListener('error', handleGlobalError)
    window.addEventListener('unhandledrejection', handlePromiseRejection)

    return () => {
      window.removeEventListener('error', handleGlobalError)
      window.removeEventListener('unhandledrejection', handlePromiseRejection)
    }
  }, [component, context, offlineFallback])
}
