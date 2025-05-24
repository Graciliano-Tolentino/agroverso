// =====================================================================================
// 📄 telemetry.js | Agroverso – API de Log Manual (logEvent)
// =====================================================================================

export function logEvent(nomeEvento, payload = {}) {
  try {
    const timestamp = new Date().toISOString();

    const evento = {
      nome: nomeEvento,
      dados: {
        ...payload,
        traceId: gerarTraceId(),
        navegador: navigator.userAgent,
        idioma: navigator.language,
        horario: timestamp,
      },
    };

    console.debug('[🔍 Telemetria]', evento);

    // Exemplo de envio futuro:
    // fetch('/api/telemetria', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(evento),
    // });
  } catch (err) {
    console.warn('[⚠️ Telemetria Fallback]', err);
  }
}

function gerarTraceId() {
  return 'trace_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}
