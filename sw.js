// Ascension service worker
// Handles: offline caching of the app shell, and showing local notifications
// (registration.showNotification is required for notifications inside an
// installed iOS PWA — the plain `new Notification()` constructor does not
// work in standalone mode on iOS Safari).

const CACHE_NAME = 'ascension-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch(() => {}) // don't block install if a font/CDN request fails offline
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first for the app shell, network-first fallback for everything else
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(() => cached);
    })
  );
});

// Tapping a notification focuses (or opens) the app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./index.html');
    })
  );
});

// NOTE ON REAL PUSH NOTIFICATIONS:
// This service worker can display notifications locally (triggered by the
// app itself via registration.showNotification, e.g. the "Send Test
// Notification" button in Settings). That works while the app is open or
// briefly backgrounded. True server-sent push — reminders that arrive even
// when the app is fully closed — requires a backend that sends Web Push
// messages (VAPID keys + a `push` event handler here). That backend piece
// isn't included in this static site; see the README for how to add one.
