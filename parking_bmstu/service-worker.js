const CACHE_NAME = 'parking-bmstu-cache-v1';
const urlsToCache = [
    '/Parking_bmstu_frontend/',
    '/Parking_bmstu_frontend/index.html',
    '/Parking_bmstu_frontend/icons/favicon-512x512.png',
    '/Parking_bmstu_frontend/icons/apple-touch-icon.png',
    '/Parking_bmstu_frontend/assets/style.css', // Пример пути к CSS
    '/Parking_bmstu_frontend/assets/main.js',   // Пример пути к JS
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
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
            return cachedResponse || fetch(event.request);
        })
    );
});
