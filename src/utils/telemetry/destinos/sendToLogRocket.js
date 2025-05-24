// =====================================================================================
// 📄 sendToLogRocket.js | Agroverso – Rastreamento de RBAC negado no LogRocket
// =====================================================================================

export function sendToLogRocket(evento) {
  if (typeof window === 'undefined') return;

  try {
    window.LogRocket?.track?.('rbac_block', evento);
  } catch (err) {
    console.warn('[LogRocket] Falha ao rastrear rbac_block', err);
  }
}
