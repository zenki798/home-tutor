/* 서비스 워커 — 앱 설치 조건을 채우고, 한 번 본 화면·단원은 인터넷이 없어도 뜨게 한다.
 * - 같은 출처 GET 만 다룬다(이 앱은 외부 요청을 하지 않는다).
 * - 화면 파일(html·css·js·카탈로그): 네트워크 우선 → 새 버전을 올리면 다음 실행 때 바로 반영, 연결이 없을 때만 캐시.
 * - 단원 내용(data/units)·검색 색인(data/index): 캐시 우선 + 뒤에서 새로 받아 두기 → 한 번 본 단원은 오프라인에서도.
 * - file:// 에서는 등록하지 않는다(app.js). 캐시 이름에 버전을 붙여, 바뀌면 옛 캐시를 지운다. */
var VERSION = 'v5';
var SHELL_CACHE = 'tutor-shell-' + VERSION;
var DATA_CACHE = 'tutor-data-' + VERSION;
var SHELL = [
  './', 'index.html', 'manifest.webmanifest',
  'css/app.css', 'css/mathtext.css',
  'js/mathlib.js', 'js/mathtext.js', 'js/figures.js', 'js/search.js', 'js/solver.js', 'js/storage.js', 'js/impact.js', 'js/review.js', 'js/summary.js', 'js/core.js', 'js/app.js',
  'data/catalog.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(function (cache) {
      // 하나가 없어도(아직 안 만든 파일 등) 나머지는 담는다
      return Promise.all(SHELL.map(function (url) {
        return cache.add(new Request(url, { cache: 'reload' })).catch(function () { /* 건너뛴다 */ });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) {
        return k.indexOf('tutor-') === 0 && k !== SHELL_CACHE && k !== DATA_CACHE;
      }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function isData(url) {
  return /\/data\/(units|index)\//.test(url.pathname);
}

function putIfOk(cacheName, req, res) {
  if (res && res.ok && res.type === 'basic') {
    var copy = res.clone();
    caches.open(cacheName).then(function (c) { return c.put(req, copy); });
  }
  return res;
}

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (isData(url)) {
    // 캐시 우선: 있으면 바로 주고, 뒤에서 새로 받아 둔다
    event.respondWith(
      caches.open(DATA_CACHE).then(function (cache) {
        return cache.match(req).then(function (hit) {
          var fresh = fetch(req).then(function (res) { return putIfOk(DATA_CACHE, req, res); });
          if (hit) {
            fresh.catch(function () { /* 오프라인 — 캐시로 충분하다 */ });
            return hit;
          }
          return fresh;
        });
      })
    );
    return;
  }

  // 네트워크 우선, 실패하면 캐시 (?source=pwa 처럼 주소 뒤가 달라도 같은 화면)
  event.respondWith(
    fetch(req).then(function (res) { return putIfOk(SHELL_CACHE, req, res); }).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (hit) {
        if (hit) return hit;
        if (req.mode === 'navigate') return caches.match('index.html');
        return Response.error();
      });
    })
  );
});
