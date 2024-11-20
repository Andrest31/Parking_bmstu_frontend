// service-worker.js
const CACHE_NAME = 'parking-bmstu-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/icons/favicon-512x512.png',
    '/icons/apple-touch-icon.png',
    '/src/main.tsx',  // добавьте другие файлы, которые вам нужно кэшировать
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Если ресурс в кэше, отдаем его, иначе загружаем из сети
            return cachedResponse || fetch(event.request);
        })
    );
});
