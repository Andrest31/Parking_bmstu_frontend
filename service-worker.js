const CACHE_NAME = 'parking-bmstu-cache-v1';
const urlsToCache = [
    '/Parking_bmstu_frontend/',
    '/Parking_bmstu_frontend/index.html',
    '/Parking_bmstu_frontend/icons/favicon-512x512.png',
    '/Parking_bmstu_frontend/icons/apple-touch-icon.png',
    '/Parking_bmstu_frontend/assets/style.css', // CSS файл
    '/Parking_bmstu_frontend/assets/main.js',   // JS файл
];

self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching files...');
            return cache.addAll(urlsToCache);
        }).catch((err) => {
            console.error('Caching failed:', err);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log(`Deleting old cache: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).catch((err) => {
            console.error('Activation failed:', err);
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log(`Fetching: ${event.request.url}`);
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        }).catch((err) => {
            console.error('Fetch failed:', err);
        })
    );
});
