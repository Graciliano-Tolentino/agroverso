// =====================================================================================
// 📄 useTelemetry.js | Agroverso – Rastreamento automático por contexto
// =====================================================================================

import { useEffect } from 'react';
import { logEvent } from '@/utils/telemetry'; // nova API separada

export default function useTelemetry(contexto = 'default') {
  useEffect(() => {
    const timestamp = new Date().toISOString();
    logEvent('page_view', { contexto, timestamp });
  }, [contexto]);
}
