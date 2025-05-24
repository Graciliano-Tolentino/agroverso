/*
  ==========================================================
  🚀 Agroverso High Tech | Service Worker – Versão Blindada
  🌱 Telemetria validada, persistência deduplicada, replay auditável
  📄 Arquivo: public/service-worker-template.js
  🗓️ Atualizado em: 20/05/2025
  👨‍💻 Equipe: Agroverso Tech
  ✍️ Mantido com sabedoria, força e beleza
  ==========================================================
*/

import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Precaching dinâmico com fallback garantido
precacheAndRoute([
  ...self.__WB_MANIFEST,
  { url: '/offline.html', revision: null }
]);

// SPA Routing interno com fallback para index.html
const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler);
registerRoute(navigationRoute);

// Cache para assets estáticos com política de expiração
registerRoute(
  ({ request }) =>
    ['script', 'style', 'font'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'agroverso-static-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 dias
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// Função para gerar hash SHA-256 para logs (deduplicação)
async function hashPayload(payload) {
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(payload));
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Função para salvar logs localmente em IndexedDB
function saveLogToIndexedDB(data) {
  const request = indexedDB.open('agroverso-logs', 1);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.createObjectStore('errors', { keyPath: 'id' });
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    const tx = db.transaction(['errors'], 'readwrite');
    const store = tx.objectStore('errors');
    store.put(data);
  };
}
// Estratégia segura para APIs: validação + beacon + fallback persistente
registerRoute(
  ({ url }) => url.pathname.startsWith('/api'),
  async ({ request }) => {
    try {
      const response = await fetch(request);

      const isValid =
        response &&
        response.ok &&
        response.headers.has('Content-Type') &&
        response.headers.get('Content-Type').includes('application/json');

      if (!isValid) throw new Error('Resposta inválida ou não-JSON');

      try {
        const cache = await caches.open('agroverso-api-cache');
        await cache.put(request, response.clone());
      } catch (e) {
        console.warn('[SW] Falha ao salvar no cache:', e);

        const payload = {
          error: e.message,
          url: request.url,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        };

        payload.id = await hashPayload(payload);

        let beaconSent = false;
        try {
          if ('navigator' in self && 'sendBeacon' in navigator) {
            beaconSent = navigator.sendBeacon(
              '/log/sw-cache-error',
              JSON.stringify(payload)
            );
          }
        } catch {
          beaconSent = false;
        }

        if (!beaconSent) {
          saveLogToIndexedDB(payload);
          if ('registration' in self && self.registration.sync) {
            self.registration.sync.register('replay-sw-errors');
          }
        }
      }

      return response;
    } catch {
      return caches.match(request);
    }
  }
);

// Replay de logs de erros salvos localmente
function replayLogsWhenOnline() {
  const request = indexedDB.open('agroverso-logs', 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    const tx = db.transaction(['errors'], 'readwrite');
    const store = tx.objectStore('errors');
    const getAll = store.getAll();

    getAll.onsuccess = function () {
      const logs = getAll.result;
      logs.forEach((log) => {
        const sent = navigator.sendBeacon('/log/sw-cache-error', JSON.stringify(log));
        if (sent) {
          store.delete(log.id); // limpeza após sucesso
        }
      });
    };
  };
}

self.addEventListener('sync', (event) => {
  if (event.tag === 'replay-sw-errors') {
    event.waitUntil(replayLogsWhenOnline());
  }
});
// Fallback universal para navegação offline com resposta HTML segura
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match('/offline.html').then((offlinePage) =>
          offlinePage ||
          new Response('<h1>Você está offline</h1>', {
            headers: { 'Content-Type': 'text/html' },
            status: 503,
            statusText: 'Offline',
          })
        )
      )
    );
  }
});

// Ciclo de vida: ativação imediata e controle completo
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

/*
  ==========================================================
  🔚 Fim do arquivo service-worker-template.js
  🔒 Telemetria persistente, rastreabilidade por hash e replay auditável
  🌍 Agroverso – Infraestrutura regenerativa até o último byte offline
  🛡️ Padrão 12/10 sob qualquer auditoria, rede ou navegador
  ✍️ Mantido com sabedoria, força e beleza
  ==========================================================
*/
