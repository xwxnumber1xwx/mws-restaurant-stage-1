const cachePrefix = 'restaurant-cacheV';
let cacheSW = cachePrefix + '01';

self.addEventListener('install', function (event) {
    //store cache
    event.waitUntil(
        caches.open(cacheSW).then(function(cache) {
            console.log('[install] Caches opened, adding all core components to cache');
            return cache.addAll([
                '/',
                '/css/styles.css',
                '/data/restaurants.json',
                '/js/',
                '/img/',
                '/index.html',
                '/restaurant.html'
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log('[activate] Activating ServiceWorker!');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.filter(function(cacheName) {
            return cacheName.startsWith(cachePrefix) &&
                    cacheName != cacheSW;
            }).map(function(cacheName) {
            return caches.delete(cacheName);
            })
        );
        })
    );
});

self.addEventListener('fetch', function(event) {
    //take cache
    event.respondWith(
            caches.match(event.request).then(function(response) {
                if (response) {
                    console.log('[fetch] Returning from ServiceWorker cache: ', event.request.url);
                    return response;
                }
                console.log('[fetch] Returning from server: ', event.request.url);
                return fetch(event.request);
            })
    );
    //update cache
    event.waitUntil(
        caches.open(cacheSW).then(function(cache) {
            return fetch(event.request).then(function (response) {
                return cache.put(event.request, response);
            })
    })
    )
});