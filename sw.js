/*
  Blak Ginja Invoice Creator - service worker
  Makes the app installable and work offline.

  When you change any app file, bump CACHE_VERSION (v1 -> v2 -> ...).
  Old caches are cleared on activation, so visitors get the fresh version.
*/
var CACHE_VERSION = 'blakginja-v1';

// Same-origin files that make up the app shell. These are pre-cached on install.
// CDN files (the PDF library and Google Fonts) are cross-origin and get cached on
// first online use by the fetch handler below, so the app also works offline.
var APP_SHELL = [
  './',
  './index.html',
  './logo.png',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './site.webmanifest'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function (cache) { return cache.addAll(APP_SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== CACHE_VERSION) return caches.delete(key);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;

  // Page loads: network first (so updates show when online), fall back to the
  // cached app when offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_VERSION).then(function (c) { c.put('./index.html', copy); });
        return res;
      }).catch(function () {
        return caches.match('./index.html').then(function (r) { return r || caches.match('./'); });
      })
    );
    return;
  }

  // Everything else (app files, the PDF library, fonts): serve from cache first,
  // otherwise fetch and cache it for next time. Works for cross-origin CDN files too.
  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) {
          var copy = res.clone();
          caches.open(CACHE_VERSION).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return cached; });
    })
  );
});
