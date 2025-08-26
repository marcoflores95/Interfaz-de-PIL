/**
 * ================================================================================
 * Service Worker (sw.js) - VF_2.1.0
 * --------------------------------------------------------------------------------
 * - [MEJORADO] Implementa una estrategia de cacheo más robusta. Ahora los
 * archivos se cachean individualmente para que un fallo no detenga todo el
 * proceso de instalación del Service Worker.
 * - Implementa una estrategia de caché "Cache First".
 * ================================================================================
 */

const CACHE_NAME = 'guanajuato-kids-cache-v2'; // Se incrementa la versión para forzar actualización
const urlsToCache = [
    '/',
    '/index.html',
    '/municipios.html',
    '/tienda.html',
    '/logros.html',
    '/asistente.html',
    '/style.css',
    '/js/main.js',
    '/js/app.js',
    '/js/config.js',
    '/js/player-data.js',
    '/js/ui.js',
    '/js/game-logic.js',
    '/js/registro.js',
    // URLs externas que son más propensas a fallar se manejan con cuidado
    'https://cdn.tailwindcss.com',
];

// Evento de instalación: se abre la caché y se añaden los archivos.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Cache abierta. Empezando a cachear recursos.');
            const promises = urlsToCache.map(urlToCache => {
                return fetch(urlToCache)
                    .then(response => {
                        if (response.ok) {
                            // Cachear solo si la respuesta es válida
                            return cache.put(urlToCache, response);
                        }
                        console.warn(`Fallo al descargar y cachear: ${urlToCache}. Status: ${response.status}`);
                    })
                    .catch(error => {
                        // Capturar errores de red para una URL específica
                        console.error(`Fallo en fetch para ${urlToCache}:`, error);
                    });
            });
            return Promise.all(promises);
        }).then(() => {
            console.log('Todos los recursos solicitados han sido procesados.');
        })
    );
});

// Evento fetch: intercepta las peticiones de la red.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si la respuesta está en la caché, la devuelve.
                if (response) {
                    return response;
                }
                // Si no, la busca en la red.
                return fetch(event.request);
            })
    );
});

// Evento de activación: limpia cachés antiguas.
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Borrando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
