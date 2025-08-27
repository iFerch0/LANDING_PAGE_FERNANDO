const CACHE_NAME = 'ferchotecnico-v2';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/hero-poster.jpg',
  '/favicon.ico',
  '/favicon.svg',
  '/logo.png',
  '/icons/android/android-launchericon-192-192.png',
  '/icons/android/android-launchericon-512-512.png',
  '/icons/android/android-launchericon-96-96.png',
  '/_next/static/css/',
  '/_next/static/js/',
  '/areas-servicio',
  '/blog'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
  // Force activation of new service worker
  self.skipWaiting();
});

// Fetch event - Network first for HTML, cache first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Network first for HTML pages
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(request))
    );
  } 
  // Cache first for assets
  else {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          return response || fetch(request).then((fetchResponse) => {
            const responseClone = fetchResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
            return fetchResponse;
          });
        })
    );
  }
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});
