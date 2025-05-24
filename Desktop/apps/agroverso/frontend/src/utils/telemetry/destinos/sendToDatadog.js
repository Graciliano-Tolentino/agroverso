// =====================================================================================
// 📄 sendToDatadog.js | Agroverso – Envio de evento RBAC para DataDog Logs
// =====================================================================================

export function sendToDatadog(evento) {
  if (typeof window === 'undefined') return;

  try {
    window.DD_LOGS?.logger?.info?.('RBAC_BLOCK', evento);
  } catch (err) {
    console.warn('[DataDog] Falha ao enviar RBAC_BLOCK', err);
  }
}
