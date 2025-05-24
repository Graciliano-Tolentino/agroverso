// =====================================================================================
// 📄 useTelemetry.js | Agroverso – Hook de Rastreamento com Contexto Semântico
// =====================================================================================
// 🎯 Finalidade:
//     • Rastrear visualizações de página com contexto descritivo e timestamp ISO.
//     • Pronto para expansão com GA4, Datadog, Sentry ou banco analítico próprio.
// =====================================================================================

import { useEffect } from 'react';
import { logEvent } from '@/utils/telemetry';

/**
 * Hook de rastreamento por página/contexto.
 * Ideal para logs institucionais ou métricas de navegação.
 *
 * @param {string} contexto – nome do contexto ou rota ex: 'home', 'cursos', 'blog'
 * @param {object} metadataExtra – dados adicionais (opcional)
 */
export default function useTelemetry(contexto = 'default', metadataExtra = {}) {
  useEffect(() => {
    const timestamp = new Date().toISOString();

    const dados = {
      contexto,
      timestamp,
      ...metadataExtra,
    };

    logEvent('page_view', dados);

    if (process.env.NODE_ENV !== 'production') {
      console.info('[useTelemetry] Evento rastreado:', dados);
    }
  }, [contexto, metadataExtra]);
}
