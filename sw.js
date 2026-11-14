// Network-first: con internet siempre trae lo último; sin internet usa la copia guardada.
// Al instalarse, descarga todas las apps de apps.json para que anden offline.
const CACHE = 'mis-juegos-v1';
const SHELL = ['./', 'index.html', 'manifest.json', 'apps.json', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(SHELL);
    try {
      const apps = await (await fetch('apps.json', { cache: 'no-cache' })).json();
      await cache.addAll(apps.map(a => a.path));
    } catch (e) { /* si falla, se cachean al abrirlas */ }
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await fetch(event.request);
      if (res.ok) cache.put(event.request, res.clone());
      return res;
    } catch (e) {
      return (await cache.match(event.request, { ignoreSearch: true })) || Response.error();
    }
  })());
});
