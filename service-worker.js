const CACHE_NAME = 'tamashii-no-kyoumei-v302';
const urlsToCache = [
  './',
  './index.html',
  './yoga01.png',
  './soul-stage.mp3',
  './soul-gameover.mp3'
  './fever-bgm.mp3'
  './soul-space.mp3'
  './flash.mp3'
];

// インストール時にキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// リクエスト時にキャッシュから返す
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
