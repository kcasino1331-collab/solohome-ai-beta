const CACHE_NAME = "solohome-beta-shell-v5";
const APP_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js?v=beta-2",
  "./backend-config.js?v=beta-2",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key !== CACHE_NAME)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html")),
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          return caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, response.clone()))
            .then(() => response)
            .catch((error) => {
              console.error("Could not refresh an offline SOLOhome AI beta asset.", error);
              return response;
            });
        }
        return response;
      })
      .catch(() => caches.match(event.request)),
  );
});
