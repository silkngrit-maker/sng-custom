// Service worker della versione offline del configuratore S'N'G.
// Ogni pubblicazione cambia VERSION: il telefono scarica i file nuovi e poi mostra "Nuova versione disponibile".
const VERSION = '20261110-7d40d02a';
const CACHE = 'sng-cfg-' + VERSION;
const FILES = [
 "./",
 "a/amiri_n4.94cde4e18ec8ae53bf8f7240b84e1f76ce23772d.woff",
 "a/amiri_n4.fee8c3379b68ea3b9c7241a63b8a252071faad52.woff2",
 "a/base.css",
 "a/sng-cfg-davanti-azzurro-bande.png",
 "a/sng-cfg-davanti-azzurro-maschera.png",
 "a/sng-cfg-davanti-azzurro-sagoma.png",
 "a/sng-cfg-davanti-azzurro-sin-bande.png",
 "a/sng-cfg-davanti-azzurro-sin-maschera.png",
 "a/sng-cfg-davanti-azzurro-sin-sagoma.png",
 "a/sng-cfg-davanti-azzurro-sin.jpg",
 "a/sng-cfg-davanti-azzurro.jpg",
 "a/sng-cfg-davanti-bande.png",
 "a/sng-cfg-davanti-bianco-bande.png",
 "a/sng-cfg-davanti-bianco-maschera.png",
 "a/sng-cfg-davanti-bianco-sagoma.png",
 "a/sng-cfg-davanti-bianco-sin-bande.png",
 "a/sng-cfg-davanti-bianco-sin-maschera.png",
 "a/sng-cfg-davanti-bianco-sin-sagoma.png",
 "a/sng-cfg-davanti-bianco-sin.jpg",
 "a/sng-cfg-davanti-bianco.jpg",
 "a/sng-cfg-davanti-blu-bande.png",
 "a/sng-cfg-davanti-blu-maschera.png",
 "a/sng-cfg-davanti-blu-sagoma.png",
 "a/sng-cfg-davanti-blu-sin-bande.png",
 "a/sng-cfg-davanti-blu-sin-maschera.png",
 "a/sng-cfg-davanti-blu-sin-sagoma.png",
 "a/sng-cfg-davanti-blu-sin.jpg",
 "a/sng-cfg-davanti-blu.jpg",
 "a/sng-cfg-davanti-grigio-bande.png",
 "a/sng-cfg-davanti-grigio-maschera.png",
 "a/sng-cfg-davanti-grigio-sagoma.png",
 "a/sng-cfg-davanti-grigio-sin-bande.png",
 "a/sng-cfg-davanti-grigio-sin-maschera.png",
 "a/sng-cfg-davanti-grigio-sin-sagoma.png",
 "a/sng-cfg-davanti-grigio-sin.jpg",
 "a/sng-cfg-davanti-grigio.jpg",
 "a/sng-cfg-davanti-maschera.png",
 "a/sng-cfg-davanti-nero-bande.png",
 "a/sng-cfg-davanti-nero-maschera.png",
 "a/sng-cfg-davanti-nero-sagoma.png",
 "a/sng-cfg-davanti-nero-sin-bande.png",
 "a/sng-cfg-davanti-nero-sin-maschera.png",
 "a/sng-cfg-davanti-nero-sin-sagoma.png",
 "a/sng-cfg-davanti-nero-sin.jpg",
 "a/sng-cfg-davanti-nero.jpg",
 "a/sng-cfg-davanti-sagoma.png",
 "a/sng-cfg-davanti-sagoma1.png",
 "a/sng-cfg-davanti.jpg",
 "a/sng-cfg-dietro-bande.png",
 "a/sng-cfg-dietro-maschera.png",
 "a/sng-cfg-dietro-sagoma.png",
 "a/sng-cfg-dietro-sagoma1.png",
 "a/sng-cfg-dietro.jpg",
 "a/sng-cfg-fam-azzurro.jpg",
 "a/sng-cfg-fam-blu.jpg",
 "a/sng-cfg-fam-grigio.jpg",
 "a/sng-cfg-fam-nero.jpg",
 "a/sng-cfg-ricamo-bande.png",
 "a/sng-cfg-ricamo-fili.png",
 "a/sng-cfg-ricamo-maschera.png",
 "a/sng-cfg-ricamo-sagoma.png",
 "a/sng-cfg-ricamo-senza.png",
 "a/sng-cfg-ricamo.jpg",
 "a/sng-cfg.js",
 "a/sng-seta-8766.jpg",
 "a/sng-seta-8767.jpg",
 "a/sng-seta-8770.jpg",
 "a/sng-seta-8771.jpg",
 "a/sng-seta-8772.jpg",
 "a/sng-seta-8773.jpg",
 "a/sng-seta-8774.jpg",
 "a/sng-seta-8775.jpg",
 "a/sng-seta-8776.jpg",
 "a/sng-seta-8777.jpg",
 "a/sng-seta-damasco-ottanio-uccelli.jpg",
 "a/sng-seta-damasco-rosa-antico.jpg",
 "a/sng-seta-damasco-verde.jpg",
 "a/sng-seta-farfalle-salvia.jpg",
 "a/sng-seta-jacquard-azzurro.jpg",
 "a/sng-seta-jacquard-blu.jpg",
 "a/sng-seta-sg1.jpg",
 "a/sng-seta-sg4.jpg",
 "a/sng-seta-sg5.jpg",
 "a/sng-seta-sg6.jpg",
 "a/sng-seta-sg7.jpg",
 "a/sng-seta-sg8.jpg",
 "a/sng-seta-sg9.jpg",
 "a/sng-tokens.css",
 "fonts/0186fb75f1-k3kPo8UDI-1M0wlSV9XAw6lQkqWY8Q82sLydOxKsv4Rn.woff2",
 "fonts/4559906935-8vIJ7ww63mVu7gt79mT7PkRXMw.woff2",
 "fonts/9e5095030b-QOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0KxC9TeP2Xz5c.woff2",
 "fonts/9f8cfcb939-8vIJ7ww63mVu7gt7-GT7PkRXM8Xx.woff2",
 "fonts/acb6475b6d-ZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChjeveQ7ZXk8g.woff2",
 "fonts/c628a829d0-k3kPo8UDI-1M0wlSV9XAw6lQkqWY8Q82sLyTOxKsv4RnUPU.woff2",
 "fonts/e45fbfdae7-ZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0KxCBTeP2Xz5fU8w.woff2",
 "fonts/ea6119fa7f-nv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChjdPeQ7ZXk8kD6.woff2",
 "fonts/ed6f8e8580-ZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0KxCFTeP2Xz5fU8w.woff2",
 "fonts/fdb5885c3b-nv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChjdfeQ7ZXk8kD6.woff2",
 "fonts/fe4a10363b-k3kPo8UDI-1M0wlSV9XAw6lQkqWY8Q82sLySOxKsv4RnUPU.woff2",
 "fonts/fonts.css",
 "icons/apple-touch-icon.png",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "icons/icon-maskable-512.png",
 "index.html",
 "manifest.webmanifest",
 "sng-cfg.css"
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // riusa i file già scaricati dalla versione precedente se identici nel nome, poi scarica il resto
    await Promise.all(FILES.map(async (f) => {
      const res = await fetch(new Request(f, { cache: 'reload' }));
      if (!res.ok) throw new Error(f + ' ' + res.status);
      await cache.put(f, res);
    }));
    // prima installazione: attiva subito
    if (!self.registration.active) self.skipWaiting();
  })());
});

self.addEventListener('message', (e) => { if (e.data === 'skipWaiting') self.skipWaiting(); });

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('sng-cfg-') && k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (req.mode === 'navigate') {
      return (await cache.match('./')) || (await cache.match('index.html')) || fetch(req);
    }
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    try { return await fetch(req); } catch (err) { return new Response('', { status: 504 }); }
  })());
});
