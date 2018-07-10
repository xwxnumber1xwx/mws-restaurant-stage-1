if (navigator.ServiceWorker) {

    const cacheSW = "cacheV1";

    self.addEventListener('install', function (event) {

        event.waitUntil(
            caches.open(cacheSW).then(function(cache) {
                return cache.addAll([
                    '/',
                    'css/styles.css',
                    'data/restaurants.json',
                    'js/*.js',
                    'img/*.jpg',
                    '/index.html',
                    '/restaurant.html'

                ]);
            })
        );
    });


};