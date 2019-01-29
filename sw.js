const CACHE_NAME = "five";
var urlsToCache = [
    "/",
    "/index.html",
    "/css/materialize.min.css",
    "/css/custom.css",
    "/img/abdulmuhit.jpg",
    "/img/fantaseen.png",
    "/img/goal.png",
    "/img/goal.svg",
    "/img/favicon.ico",
    "/manifest.json",
    "/js/materialize.js",
    "/js/materialize.min.js",
    "/js/registersw.js",
    "/js/idbdicoding.js",
    "/js/app.js",
    "/js/vue_components/home.js",
    "/js/vue_components/loaderoverlay_goback.js",
    "/js/vue_components/page_about.js",
    "/js/vue_components/page_bookmarked.js",
    "/js/vue_components/page_fixtures.js",
    "/js/vue_components/page_team.js",
    "/lib/idb.js",
    "/lib/axios.js",
    "/lib/vue.js",
    "/lib/vue-router.js",
    "/fonts/MaterialIcons-Regular.eot",
    "/fonts/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2",
    "/fonts/MaterialIcons-Regular.ttf"

];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", function(event) {
    console.log(`${CACHE_NAME} now ready to handle fetches!`);
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function(response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );


});


self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Empty Payload';
    }
    var options = {
        body: body,
        icon: './img/favicon.ico',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Hello Bola Mania!', options)
    );
});


/*

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});


*/



