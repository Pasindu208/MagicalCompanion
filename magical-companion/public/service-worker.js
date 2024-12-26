const CACHE_VERSION = 1;
const CACHE_NAME = `magical-companion-cache-v${CACHE_VERSION}`;
const apiEndpoints = [
    "/api/spells",
    "/api/characters",
    "/api/inventory",
    "/api/quests",
];

const urlsToCache = [
    "/",
    "/index.html",
    "/static/js/main.js",
    "/static/css/main.css",
    ...apiEndpoints
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
            .catch(error => console.error('Cache installation failed:', error))
    );
    // Activate immediately
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
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
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
    const isApiRequest = event.request.url.includes('/api/');

    if (!event.request.url.startsWith(self.location.origin)) {
        return; // Don't handle external requests
    }

    if (isApiRequest) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    if (!response || response.status !== 200) {
                        throw new Error('Network response was not ok');
                    }
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => cache.put(event.request, responseToCache))
                        .catch(error => console.error('Cache update failed:', error));
                    return response;
                })
                .catch(() => {
                    return caches.match(event.request)
                        .then(cachedResponse => {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            console.warn('Network request failed and no cache:', event.request.url);
                            throw new Error('No cached data available');
                        });
                })
        );
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request)
                        .then(response => {
                            if (!response || response.status !== 200) {
                                return response;
                            }
                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => cache.put(event.request, responseToCache))
                                .catch(error => console.error('Cache update failed:', error));
                            return response;
                        });
                })
                .catch(error => console.error('Fetch handler failed:', error))
        );
    }
});
