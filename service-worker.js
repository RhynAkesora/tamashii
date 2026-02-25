const CACHE_NAME = 'tamashii-no-kyoumei-v3712';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './yoga01.png',
  './game-title.png',
  './logo-white.png',
  './icon-192.png',
  './icon-512.png',
  './soul-stage.mp3',
  './soul-gameover.mp3',
  './soul-title.mp3',
  './soul-highscore.mp3',
  './soul-space.mp3',
  './fever-bgm.mp3',
  './flash.mp3'
];

// インストール時にキャッシュ（即座に有効化）
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// 古いキャッシュを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((name) => name !== CACHE_NAME)
             .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
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
