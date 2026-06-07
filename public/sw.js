/* Service worker minimal de « Peer to Peer ».
 *
 * Objectifs : rendre l'app installable (PWA) et utilisable hors ligne pour
 * l'essentiel. Stratégies :
 *   - navigations  : network-first → cache → page /offline ;
 *   - ressources   : stale-while-revalidate (assets statiques hashés).
 *
 * Confidentialité : on ne met en cache QUE des GET de même origine
 * (HTML/JS/CSS/images de l'app). Les saisies des outils vivent en
 * sessionStorage, jamais ici, et rien n'est envoyé sur le réseau.
 */
const CACHE = "p2p-cache-v1";
const OFFLINE_URL = "/offline";
const PRECACHE = ["/", OFFLINE_URL, "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.addAll(PRECACHE).catch(() => {});
      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigations : réseau d'abord, repli sur le cache puis sur /offline.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(CACHE);
          cache.put(request, fresh.clone());
          return fresh;
        } catch {
          return (
            (await caches.match(request)) ||
            (await caches.match(OFFLINE_URL)) ||
            Response.error()
          );
        }
      })()
    );
    return;
  }

  // Ressources statiques : on sert le cache et on rafraîchit en arrière-plan.
  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      const network = fetch(request)
        .then((resp) => {
          if (resp && resp.status === 200 && resp.type === "basic") {
            caches.open(CACHE).then((c) => c.put(request, resp.clone()));
          }
          return resp;
        })
        .catch(() => cached);
      return cached || network;
    })()
  );
});
