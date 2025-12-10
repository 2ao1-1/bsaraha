self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("app-cache").then((cache) => {
      return cache.addAll(["/", "index.html", "/1.png", "/2.png"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Don't cache API requests - just pass them through
  if (event.request.url.includes("/api")) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          // If offline and not in cache, return a placeholder or nothing
          return new Response("Offline - Resource not available", {
            status: 503,
            statusText: "Service Unavailable",
          });
        })
      );
    })
  );
});
