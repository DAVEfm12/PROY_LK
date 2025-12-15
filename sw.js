const CACHE_NAME = 'LK_Estudio-shell-v1';
const ASSETS = [
  '/', 
  '/index.php',
  '/css/style.css',
  '/js/app.js',
  '/js/router.js',
  '/js/ui.js',
  '/components/nav.html',
  '/components/footer.html',
  '/pages/home.html',
  '/pages/servicios.html',
  '/pages/instructora.html',
  '/pages/vip.html',
  '/img/logo.png',
  '/img/icon-192.png',
  '/img/icon-512.png'
];

// Instalar SW y cachear el shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activar SW y eliminar cachés antiguos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Interceptar peticiones
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request).catch(() => caches.match('/pages/offline.html'));
    })
  );
});