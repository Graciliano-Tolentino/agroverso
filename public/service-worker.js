/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: public/service-worker.js
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Service Worker para suporte offline, caching e performance.
     Implementa estratégias híbridas para PWA modernas.
     Desenvolvido com sabedoria, força e beleza.
  ============================================
*/

const CACHE_NAME = 'agroverso-cache-v1';
const OFFLINE_URL = '/offline.html';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/src/main.jsx',
  '/src/assets/images/logo_agroverso.png'
];

// Instala o SW e adiciona arquivos estáticos ao cache
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Ativa o novo SW e limpa caches antigos
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando e limpando caches antigos...');
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Intercepta as requisições
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Pede dados da API – strategy: Network First
  if (request.url.includes('/api')) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, res.clone());
            return res;
          });
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Demais arquivos – strategy: Cache First
  event.respondWith(
    caches.match(request).then((cached) => {
      return cached || fetch(request).catch(() => caches.match(OFFLINE_URL));
    })
  );
});

/*
  ============================================
  🔚 Fim do arquivo public/service-worker.js
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
