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
  '/areas-servicio',
  '/blog'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return Promise.allSettled(
          urlsToCache.map(url => {
            return cache.add(url).catch(error => {
              console.warn(`Failed to cache ${url}:`, error);
              return Promise.resolve(); // Continue with other files
            });
          })
        );
      })
      .then(() => {
        console.log('Service Worker installation completed.');
      })
  );
  // Force activation of new service worker
  self.skipWaiting();
});

// Fetch event - Network first for HTML, cache first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Network first for HTML pages
  if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Only cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch((error) => {
          console.log(`Network failed for ${request.url}, trying cache:`, error);
          // Fallback to cache if network fails
          return caches.match(request);
        })
    );
  }
  // Cache first for assets
  else {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          // If not in cache, fetch from network
          return fetch(request).then((fetchResponse) => {
            // Only cache successful responses
            if (fetchResponse.status === 200) {
              const responseClone = fetchResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return fetchResponse;
          });
        })
        .catch((error) => {
          console.log(`Failed to fetch ${request.url}:`, error);
          // Return a basic offline response for failed requests
          return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
        })
    );
  }
});// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('Service Worker activation completed.');
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});
