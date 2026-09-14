const CACHE_PREFIX = 'conspiracion-mayo-';
const CACHE_NAME = CACHE_PREFIX + 'v5';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './botica-bg.jpg',
  './pasadizos-bg.jpg',
  './despacho-bg.jpg',
  './imprenta-bg.jpg',
  './catedral-bg.jpg',
  './fuerte-bg.jpg',
  './consagracion-bg.jpg',
  './resistencia-bg.jpg',
  './aduana-bg.jpg',
  './cuartel-bg.jpg',
  './camino-norte-bg.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
