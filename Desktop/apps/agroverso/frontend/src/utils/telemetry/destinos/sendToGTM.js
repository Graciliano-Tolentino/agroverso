// =====================================================================================
// 📄 sendToGTM.js | Agroverso – Envio de evento RBAC para Google Tag Manager
// =====================================================================================

export function sendToGTM(evento) {
  if (typeof window === 'undefined') return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'acesso_negado_rbac',
      ...evento,
    });
  } catch (err) {
    console.warn('[GTM] Falha ao enviar acesso_negado_rbac', err);
  }
}
