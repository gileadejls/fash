const CACHE_NAME = 'my-static-cache-v1';
const urlsToCache = [
    '/',
    '/styles.css',
    '/script.js',
    '/images/logo.png',
    '../images',
    
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
