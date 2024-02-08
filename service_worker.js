const cacheName = 'v1';

let urlsToCache = [
"./",
"./img/apple-touch-icon.png",
"./img/favicon-32x32.png",
"./img/favicon-16x16.png",
"./img/safari-pinned-tab.svg",
"./img/favicon.ico",
"./estilos/MiEstilo.css"


]


self.addEventListener( 'install', e=>{

e.waitUntil(
caches.open(cacheName)
.then(cache =>{
    return cache.addAll(urlsToCache)
    .then(() => self.skipWaiting());
})
.catch((err) => console.error("Service Worker: Error Caching Files", err))
);
});

self.addEventListener("activate", (e) => {
    const cacheWhiteList = [cacheName];


e.waitUntil(
caches
.keys()
.then((cacheNames) => {
    return Promise.all(
        cacheNames.map((cache) => {
            if (cacheWhiteList.indexOf(cache)=== -1) {
             return caches.delete(cache);   
            }
        })
    );
})
.then (() => self.clients.claim())
);
});

self.addEventListener("fetch", (e) =>{
    e.respondWith(
        caches.match(e.request).then((response) => {
            if (response) {

            }
            return fetch(e.request);
        }
        )
    )
})


