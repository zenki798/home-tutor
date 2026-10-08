/* 가정교사 — 학습 데이터 저장 계층 (window.TutorStorage)
 * 계약: docs/ARCHITECTURE.md §9
 *
 * - 학생의 학습 정보는 이 기기에만 저장한다. 서버·클라우드로 보내지 않는다(규칙 4·6·7).
 * - 저장소(Provider)를 갈아 끼울 수 있다: IndexedDB(기본) → localStorage → 메모리 순으로 되는 것을 쓴다.
 *   나중에 클라우드 동기화를 붙일 때도 Provider 만 더하면 되고, 화면·엔진은 store.get/set 그대로 쓴다.
 * - 화면은 동기 API(get/set)를 쓴다: 처음에 ready() 로 전부 메모리에 올리고, 쓰기는 모아서 Provider 에 한 번에(원자적으로) 저장한다.
 * - 학생 프로필별로 데이터를 완전히 나눈다: 키 'p.<학생id>.<종류>'. 학생을 지우면 그 학생 키만 모두 지운다.
 * - 백업 파일은 반드시 암호로 잠근다(PBKDF2-SHA256 → AES-GCM-256). 파일이 남의 손에 들어가도 읽을 수 없고, 고친 파일은 풀리지 않는다.
 * - 가져오기는 끝까지 검사한 뒤에만 기존 데이터를 건드리고, 바꾸기 전에 되돌리기 지점을 만든다.
 */
(function (root, factory) {
  var mod = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = mod;
  else root.TutorStorage = mod;
})(typeof self !== 'undefined' ? self : (typeof globalThis !== 'undefined' ? globalThis : this), function (root) {
  'use strict';

  var hasOwn = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
  function isObj(x) { return !!x && typeof x === 'object' && !Array.isArray(x); }
  function clone(v) { return v === undefined ? undefined : JSON.parse(JSON.stringify(v)); }
  function warn(msg) { try { if (root && root.console && root.console.warn) root.console.warn('[가정교사 저장] ' + msg); } catch (e) { /* 무시 */ } }

  var DB_NAME = 'home-tutor';
  var DB_VERSION = 1;
  var OBJ_STORE = 'kv';
  var LEGACY_PREFIX = 'tutor.';     // core.js 의 예전 localStorage 키 앞머리 (옮겨 온다)
  var SYS_PREFIX = 'sys.';           // 저장 계층 자체가 쓰는 키(되돌리기 지점 등) — 백업에 넣지 않는다

  /* ================================================================
   * Provider — 실제로 저장하는 곳. 모두 같은 약속(비동기)을 지킨다.
   *   name, open(), loadAll() → { key: value }, write([{ key, value } | { key, del: true }]) (한 번에), clearAll()
   * ================================================================ */

  function MemoryProvider() {
    this.name = 'memory';
    this.data = {};
  }
  MemoryProvider.prototype.open = function () { return Promise.resolve(); };
  MemoryProvider.prototype.loadAll = function () { return Promise.resolve(clone(this.data) || {}); };
  MemoryProvider.prototype.write = function (changes) {
    var d = this.data;
    changes.forEach(function (c) { if (c.del) delete d[c.key]; else d[c.key] = clone(c.value); });
    return Promise.resolve();
  };
  MemoryProvider.prototype.clearAll = function () { this.data = {}; return Promise.resolve(); };

  function LocalStorageProvider(win, prefix) {
    this.name = 'localstorage';
    this.win = win || root;
    this.prefix = prefix || LEGACY_PREFIX;
  }
  LocalStorageProvider.prototype.ls = function () {
    var ls = this.win.localStorage; // 접근만 해도 throw 하는 브라우저가 있다 — 부르는 쪽이 잡는다
    if (!ls) throw new Error('localStorage 없음');
    return ls;
  };
  LocalStorageProvider.prototype.open = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      try {
        var ls = self.ls();
        ls.setItem(self.prefix + '__probe', '1');
        ls.removeItem(self.prefix + '__probe');
        resolve();
      } catch (e) { reject(e); }
    });
  };
  LocalStorageProvider.prototype.loadAll = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      try {
        var ls = self.ls();
        var out = {};
        for (var i = 0; i < ls.length; i++) {
          var k = ls.key(i);
          if (typeof k !== 'string' || k.indexOf(self.prefix) !== 0) continue;
          var key = k.slice(self.prefix.length);
          if (key === '__probe' || key.indexOf('__mirror.') === 0) continue;
          try { out[key] = JSON.parse(ls.getItem(k)); } catch (e) { /* 깨진 값은 건너뛴다 */ }
        }
        resolve(out);
      } catch (e) { reject(e); }
    });
  };
  LocalStorageProvider.prototype.write = function (changes) {
    var self = this;
    return new Promise(function (resolve, reject) {
      var ls;
      try { ls = self.ls(); } catch (e) { reject(e); return; }
      // localStorage 에는 트랜잭션이 없다 — 실패하면 앞서 바꾼 것을 되돌린다
      var undo = [];
      try {
        changes.forEach(function (c) {
          var k = self.prefix + c.key;
          undo.push([k, ls.getItem(k)]);
          if (c.del) ls.removeItem(k);
          else ls.setItem(k, JSON.stringify(c.value));
        });
        resolve();
      } catch (e) {
        for (var i = undo.length - 1; i >= 0; i--) {
          try { if (undo[i][1] === null) ls.removeItem(undo[i][0]); else ls.setItem(undo[i][0], undo[i][1]); } catch (e2) { /* 무시 */ }
        }
        reject(e);
      }
    });
  };
  LocalStorageProvider.prototype.clearAll = function () {
    var self = this;
    return this.loadAll().then(function (all) {
      return self.write(Object.keys(all).map(function (k) { return { key: k, del: true }; }));
    });
  };

  function IndexedDBProvider(win, dbName) {
    this.name = 'indexeddb';
    this.win = win || root;
    this.dbName = dbName || DB_NAME;
    this.db = null;
  }
  IndexedDBProvider.prototype.open = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      var idb;
      try { idb = self.win.indexedDB; } catch (e) { reject(e); return; }
      if (!idb) { reject(new Error('IndexedDB 없음')); return; }
      var req;
      try { req = idb.open(self.dbName, DB_VERSION); } catch (e) { reject(e); return; }
      var timer = setTimeout(function () { reject(new Error('IndexedDB 열기 시간 초과')); }, 4000);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(OBJ_STORE)) db.createObjectStore(OBJ_STORE);
      };
      req.onsuccess = function () {
        clearTimeout(timer);
        self.db = req.result;
        // 다른 탭이 판을 올리면 닫아 준다(막지 않게)
        self.db.onversionchange = function () { try { self.db.close(); } catch (e) { /* 무시 */ } };
        resolve();
      };
      req.onerror = function () { clearTimeout(timer); reject(req.error || new Error('IndexedDB 열기 실패')); };
      req.onblocked = function () { /* 다른 탭이 옛 판을 쥐고 있다 — 끝날 때까지 기다린다(시간 초과가 처리) */ };
    });
  };
  IndexedDBProvider.prototype.tx = function (mode) {
    if (!this.db) throw new Error('IndexedDB 가 열려 있지 않음');
    return this.db.transaction(OBJ_STORE, mode);
  };
  IndexedDBProvider.prototype.loadAll = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      var out = {};
      var t;
      try { t = self.tx('readonly'); } catch (e) { reject(e); return; }
      var cur = t.objectStore(OBJ_STORE).openCursor();
      cur.onsuccess = function () {
        var c = cur.result;
        if (c) { out[String(c.key)] = c.value; c.continue(); }
      };
      t.oncomplete = function () { resolve(out); };
      t.onerror = function () { reject(t.error || new Error('IndexedDB 읽기 실패')); };
      t.onabort = function () { reject(t.error || new Error('IndexedDB 읽기 중단')); };
    });
  };
  IndexedDBProvider.prototype.write = function (changes) {
    var self = this;
    return new Promise(function (resolve, reject) {
      var t;
      try { t = self.tx('readwrite'); } catch (e) { reject(e); return; }
      var os = t.objectStore(OBJ_STORE);
      try {
        changes.forEach(function (c) { if (c.del) os.delete(c.key); else os.put(c.value, c.key); });
      } catch (e) {
        try { t.abort(); } catch (e2) { /* 무시 */ }
        reject(e);
        return;
      }
      // 한 트랜잭션: 모두 저장되거나 하나도 저장되지 않는다
      t.oncomplete = function () { resolve(); };
      t.onerror = function () { reject(t.error || new Error('IndexedDB 쓰기 실패')); };
      t.onabort = function () { reject(t.error || new Error('IndexedDB 쓰기 중단')); };
    });
  };
  IndexedDBProvider.prototype.clearAll = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      var t;
      try { t = self.tx('readwrite'); } catch (e) { reject(e); return; }
      t.objectStore(OBJ_STORE).clear();
      t.oncomplete = function () { resolve(); };
      t.onerror = function () { reject(t.error); };
    });
  };

  /* ================================================================
   * Store — 화면이 쓰는 동기 API (메모리 캐시 + 모아서 쓰기)
   *   ready() → Promise   처음 한 번: 저장소를 열고 전부 메모리에 올린다(예전 localStorage 값은 옮겨 온다)
   *   get(key, fallback)  set(key, value)  remove(key)  keys(prefix)   ← 예전 Tutor.store 와 같은 모양
   *   flush() → Promise   밀린 쓰기를 지금 저장
   *   batch(fn)           여러 set/remove 를 한 번에(원자적으로) 저장
   *   removePrefix(p)     'p.<학생id>.' 처럼 앞머리가 같은 키를 모두 지운다
   *   snapshot()          지금 데이터 사본({ key: value }, sys.* 제외)
   *   replaceAll(entries, keep)  지금 데이터를 entries 로 바꾼다(keep(key) 가 참인 키는 남김). 저장이 성공해야 메모리도 바뀐다
   *   onChange(fn)        키가 바뀌면 fn(key) (다른 탭에서 바뀐 것도)
   *   provider            'indexeddb' | 'localstorage' | 'memory' | 'loading'
   * ================================================================ */

  function createStore(opts) {
    opts = opts || {};
    var win = opts.win || root;
    var order = opts.providers || ['indexeddb', 'localstorage', 'memory'];
    // 화면을 그리기 전에 동기로 읽어야 하는 값(글자 크기·테마) — localStorage 에 사본을 둔다. 학습 기록은 사본을 두지 않는다
    var mirrorKeys = opts.mirror || ['settings'];
    var cache = {};
    var dirty = {};
    var timer = null;
    var provider = null;
    var readyP = null;
    var writing = Promise.resolve();
    var listeners = [];
    var channel = null;
    var holding = 0; // batch 중이면 쓰기를 미룬다

    function mirrorRead(k) {
      try {
        var raw = win.localStorage ? win.localStorage.getItem(LEGACY_PREFIX + '__mirror.' + k) : null;
        return raw ? JSON.parse(raw) : undefined;
      } catch (e) { return undefined; }
    }
    function mirrorWrite(k, v) {
      try {
        if (!win.localStorage) return;
        if (v === undefined) win.localStorage.removeItem(LEGACY_PREFIX + '__mirror.' + k);
        else win.localStorage.setItem(LEGACY_PREFIX + '__mirror.' + k, JSON.stringify(v));
      } catch (e) { /* 막혀 있으면 사본 없이 */ }
    }
    mirrorKeys.forEach(function (k) { var v = mirrorRead(k); if (v !== undefined) cache[k] = v; });

    function makeProvider(name) {
      if (name && typeof name === 'object') return name; // 직접 만든 Provider (테스트·앞으로의 클라우드 동기화)
      if (name === 'indexeddb') return new IndexedDBProvider(win, opts.dbName);
      if (name === 'localstorage') return new LocalStorageProvider(win, opts.prefix);
      return new MemoryProvider();
    }

    function openFirst(i) {
      if (i >= order.length) {
        var m = new MemoryProvider();
        return m.open().then(function () { return m; });
      }
      var p = makeProvider(order[i]);
      return p.open().then(function () { return p; }, function (e) {
        warn(p.name + ' 을(를) 쓸 수 없어 다음 저장소를 씁니다 (' + (e && e.message) + ')');
        return openFirst(i + 1);
      });
    }

    // IndexedDB 를 처음 쓸 때 예전 localStorage 'tutor.*' 값을 옮겨 온다(한 번만, 옮긴 뒤 지운다)
    function migrateLegacy(p, loaded) {
      if (p.name !== 'indexeddb' || Object.keys(loaded).length) return Promise.resolve(loaded);
      var ls = new LocalStorageProvider(win, LEGACY_PREFIX);
      return ls.open().then(function () { return ls.loadAll(); }).then(function (old) {
        var keys = Object.keys(old);
        if (!keys.length) return loaded;
        return p.write(keys.map(function (k) { return { key: k, value: old[k] }; })).then(function () {
          return ls.write(keys.map(function (k) { return { key: k, del: true }; })).then(null, function () {});
        }).then(function () { return old; });
      }).then(null, function () { return loaded; });
    }

    function emit(key) {
      listeners.slice().forEach(function (fn) { try { fn(key); } catch (e) { /* 듣는 쪽 오류는 무시 */ } });
    }

    function schedule() {
      if (holding || timer) return;
      timer = setTimeout(function () {
        timer = null;
        if (provider) store.flush().then(null, function () {});
      }, 40);
    }

    function changesFor(keys) {
      return keys.map(function (k) {
        return hasOwn(cache, k) && cache[k] !== undefined ? { key: k, value: cache[k] } : { key: k, del: true };
      });
    }

    // 다른 탭이 저장하면 그 키들을 다시 읽는다(이 탭에서 아직 저장 안 한 키는 그대로)
    function listenOtherTabs() {
      try {
        if (!win.document || !win.BroadcastChannel || provider.name === 'memory') return; // 브라우저 화면에서만
        channel = new win.BroadcastChannel('home-tutor-store');
        channel.onmessage = function (ev) {
          var keys = ev && ev.data && Array.isArray(ev.data.keys) ? ev.data.keys : null;
          if (!keys) return;
          provider.loadAll().then(function (all) {
            keys.forEach(function (k) {
              if (hasOwn(dirty, k)) return;
              if (hasOwn(all, k)) cache[k] = all[k]; else delete cache[k];
              emit(k);
            });
          }, function () {});
        };
      } catch (e) { channel = null; }
    }
    function announce(keys) {
      try { if (channel) channel.postMessage({ keys: keys }); } catch (e) { /* 무시 */ }
    }

    var store = {
      get provider() { return provider ? provider.name : 'loading'; },

      ready: function () {
        if (readyP) return readyP;
        readyP = openFirst(0).then(function (p) {
          provider = p;
          return p.loadAll().then(function (all) { return migrateLegacy(p, all); });
        }).then(function (all) {
          // ready 전에 이미 바꾼 키(dirty)는 그대로 두고 나머지를 채운다
          Object.keys(all).forEach(function (k) { if (!hasOwn(dirty, k)) cache[k] = all[k]; });
          // 사본에만 있던 값(예: 처음 IndexedDB 로 옮길 때의 설정)은 저장소에도 쓴다
          mirrorKeys.forEach(function (k) { if (!hasOwn(all, k) && cache[k] !== undefined && !hasOwn(dirty, k)) dirty[k] = true; });
          listenOtherTabs();
          if (Object.keys(dirty).length) schedule();
          return store;
        }, function (e) {
          warn('저장소를 열지 못해 이번에는 기록이 남지 않아요 (' + (e && e.message) + ')');
          provider = new MemoryProvider();
          return store;
        });
        return readyP;
      },

      get: function (key, fallback) {
        if (fallback === undefined) fallback = null;
        if (typeof key !== 'string' || !hasOwn(cache, key) || cache[key] === undefined) return fallback;
        return clone(cache[key]); // 사본을 준다 — 받은 쪽이 고쳐도 저장된 값이 몰래 바뀌지 않게
      },

      set: function (key, value) {
        if (typeof key !== 'string' || !key) return false;
        var v;
        try { v = clone(value === undefined ? null : value); } catch (e) { return false; } // 순환 참조 등은 저장하지 않는다
        cache[key] = v;
        dirty[key] = true;
        if (mirrorKeys.indexOf(key) >= 0) mirrorWrite(key, v);
        emit(key);
        schedule();
        return true;
      },

      remove: function (key) {
        if (typeof key !== 'string' || !key) return;
        delete cache[key];
        dirty[key] = true;
        if (mirrorKeys.indexOf(key) >= 0) mirrorWrite(key, undefined);
        emit(key);
        schedule();
      },

      keys: function (prefix) {
        prefix = prefix || '';
        return Object.keys(cache).filter(function (k) {
          return cache[k] !== undefined && k.indexOf(prefix) === 0 && (prefix.indexOf(SYS_PREFIX) === 0 || k.indexOf(SYS_PREFIX) !== 0);
        });
      },

      removePrefix: function (prefix) {
        if (typeof prefix !== 'string' || prefix.length < 3) return 0; // 실수로 전부 지우지 않게
        var ks = store.keys(prefix);
        store.batch(function () { ks.forEach(function (k) { store.remove(k); }); });
        return ks.length;
      },

      batch: function (fn) {
        holding++;
        try { fn(store); } finally { holding--; }
        schedule();
      },

      flush: function () {
        if (timer) { clearTimeout(timer); timer = null; }
        if (!provider) return readyP ? readyP.then(function () { return store.flush(); }) : Promise.resolve();
        var keys = Object.keys(dirty);
        if (!keys.length) return writing;
        dirty = {};
        var changes = changesFor(keys);
        var run = function () { return provider.write(changes); };
        var p = writing.then(run, run);
        writing = p.then(function () { announce(keys); }, function (e) {
          // 저장 실패: 다음 기회에 다시 쓰도록 표시만 되돌린다(메모리의 값은 그대로)
          keys.forEach(function (k) { dirty[k] = true; });
          warn('저장하지 못했어요 — 다음에 다시 시도해요 (' + (e && e.message) + ')');
        });
        return p;
      },

      snapshot: function () {
        var out = {};
        Object.keys(cache).forEach(function (k) {
          if (cache[k] !== undefined && k.indexOf(SYS_PREFIX) !== 0) out[k] = clone(cache[k]);
        });
        return out;
      },

      replaceAll: function (entries, keep) {
        var changes = [];
        Object.keys(cache).forEach(function (k) {
          if (k.indexOf(SYS_PREFIX) === 0 || cache[k] === undefined) return;
          if (keep && keep(k)) return;
          if (!hasOwn(entries, k)) changes.push({ key: k, del: true });
        });
        Object.keys(entries).forEach(function (k) { changes.push({ key: k, value: clone(entries[k]) }); });
        return store.ready().then(function () { return store.flush().then(null, function () {}); }).then(function () {
          var run = function () { return provider.write(changes); };
          var p = writing.then(run, run);
          writing = p.then(null, function () {});
          return p;
        }).then(function () {
          // 저장소가 모두 받아들인 뒤에만 메모리를 바꾼다 — 실패하면 기존 데이터가 그대로 남는다
          changes.forEach(function (c) {
            if (c.del) delete cache[c.key]; else cache[c.key] = c.value;
            if (mirrorKeys.indexOf(c.key) >= 0) mirrorWrite(c.key, c.del ? undefined : c.value);
            emit(c.key);
          });
          announce(changes.map(function (c) { return c.key; }));
        });
      },

      onChange: function (fn) {
        if (typeof fn === 'function') listeners.push(fn);
        return function () { listeners = listeners.filter(function (x) { return x !== fn; }); };
      },

      // 테스트·진단용: 지금 쓰는 Provider 객체
      _provider: function () { return provider; },
    };

    // 화면을 떠날 때 밀린 쓰기를 저장한다
    try {
      if (win.addEventListener) {
        win.addEventListener('pagehide', function () { store.flush().then(null, function () {}); });
        if (win.document && win.document.addEventListener) {
          win.document.addEventListener('visibilitychange', function () {
            if (win.document.visibilityState === 'hidden') store.flush().then(null, function () {});
          });
        }
      }
    } catch (e) { /* node 등 */ }

    return store;
  }

  /* ================================================================
   * 암호 — 백업 파일 잠그기, 학생 PIN (Web Crypto: PBKDF2-SHA256 → AES-GCM-256)
   * ================================================================ */

  var BACKUP_FORMAT = 'home-tutor-backup';
  var PAYLOAD_FORMAT = 'home-tutor-backup-data';
  var BACKUP_VERSION = 1;
  var KDF_ITER = 600000;            // PBKDF2-HMAC-SHA256 권장 반복 횟수
  var KDF_ITER_MIN = 100000;
  var KDF_ITER_MAX = 5000000;
  var PIN_ITER = 150000;
  var MAX_FILE = 25 * 1024 * 1024;  // 백업 파일 크기 상한
  var MAX_KEY_BYTES = 4 * 1024 * 1024;
  var MAX_PROFILES = 30;
  var DATA_KINDS = ['progress', 'notes', 'recent', 'days', 'attempts', 'stats', 'chat', 'prefs', 'reports'];
  var LEVELS = ['elem', 'mid', 'high', 'univ', 'adult'];
  var PACES = ['easy', 'normal', 'hard'];
  var ID_RE = /^[A-Za-z0-9_-]{1,40}$/;
  var PIN_RE = /^\d{4,8}$/;
  var DATA_KEY_RE = /^p\.([A-Za-z0-9_-]{1,40})\.([a-z]{1,20})$/;

  function cryptoApi() {
    // 브라우저: window.crypto, node(시험): globalThis.crypto
    var c = root && root.crypto;
    return c && c.subtle && typeof c.getRandomValues === 'function' ? c : null;
  }
  // https·localhost·file:// 같은 안전한 환경에서만 쓸 수 있다
  function canEncrypt() { return !!cryptoApi(); }
  function randomBytes(n) { var a = new Uint8Array(n); cryptoApi().getRandomValues(a); return a; }
  function toB64(bytes) {
    var s = '';
    for (var i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(s);
  }
  function fromB64(str) {
    if (typeof str !== 'string' || !/^[A-Za-z0-9+/]*={0,2}$/.test(str)) throw new Error('base64 가 아님');
    var s = atob(str);
    var a = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) a[i] = s.charCodeAt(i);
    return a;
  }
  function utf8(s) { return new TextEncoder().encode(s); }
  function unutf8(b) { return new TextDecoder('utf-8', { fatal: true }).decode(b); }

  function deriveKey(password, salt, iterations) {
    var sub = cryptoApi().subtle;
    return sub.importKey('raw', utf8(String(password).normalize('NFC')), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return sub.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt: salt, iterations: iterations }, base,
        { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    });
  }

  function encryptText(text, password, iterations) {
    if (!canEncrypt()) return Promise.reject(new Error('이 화면에서는 암호화를 쓸 수 없어요'));
    var salt = randomBytes(16);
    var iv = randomBytes(12);
    var iter = Math.max(KDF_ITER_MIN, Math.min(KDF_ITER_MAX, iterations || KDF_ITER));
    return deriveKey(password, salt, iter).then(function (key) {
      return cryptoApi().subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, utf8(text));
    }).then(function (buf) {
      return {
        kdf: { name: 'PBKDF2', hash: 'SHA-256', iterations: iter, salt: toB64(salt) },
        cipher: { name: 'AES-GCM', iv: toB64(iv) },
        data: toB64(new Uint8Array(buf)),
      };
    });
  }

  // 암호가 틀리거나 한 글자라도 바뀐 파일은 AES-GCM 인증에서 걸러진다
  function decryptText(env, password) {
    if (!canEncrypt()) return Promise.reject(new Error('이 화면에서는 암호를 풀 수 없어요'));
    var salt = fromB64(env.kdf.salt);
    var iv = fromB64(env.cipher.iv);
    var data = fromB64(env.data);
    return deriveKey(password, salt, env.kdf.iterations).then(function (key) {
      return cryptoApi().subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, data);
    }).then(function (buf) { return unutf8(new Uint8Array(buf)); });
  }

  /* ---------- 학생 PIN (같은 기기를 쓰는 다른 사람이 함부로 보지 못하게) ---------- */

  function pinBits(pin, salt, iter) {
    var sub = cryptoApi().subtle;
    return sub.importKey('raw', utf8(pin), 'PBKDF2', false, ['deriveBits']).then(function (base) {
      return sub.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: salt, iterations: iter }, base, 256);
    }).then(function (buf) { return new Uint8Array(buf); });
  }

  // PIN 은 그대로 저장하지 않고 소금을 친 해시만 남긴다
  function hashPin(pin, iterations) {
    if (!PIN_RE.test(String(pin))) return Promise.reject(new Error('PIN 은 숫자 4~8자리예요'));
    if (!canEncrypt()) return Promise.reject(new Error('이 화면에서는 PIN 을 쓸 수 없어요'));
    var salt = randomBytes(16);
    var iter = iterations || PIN_ITER;
    return pinBits(String(pin), salt, iter).then(function (bits) {
      return { v: 1, salt: toB64(salt), iter: iter, hash: toB64(bits) };
    });
  }

  function validLock(lock) {
    if (!isObj(lock) || lock.v !== 1 || typeof lock.salt !== 'string' || typeof lock.hash !== 'string') return false;
    if (!(Number.isInteger(lock.iter) && lock.iter >= 1000 && lock.iter <= KDF_ITER_MAX)) return false;
    try { return fromB64(lock.salt).length >= 8 && fromB64(lock.hash).length === 32; } catch (e) { return false; }
  }

  function verifyPin(pin, lock) {
    if (!validLock(lock) || !PIN_RE.test(String(pin)) || !canEncrypt()) return Promise.resolve(false);
    var salt = fromB64(lock.salt);
    var want = fromB64(lock.hash);
    return pinBits(String(pin), salt, lock.iter).then(function (got) {
      var diff = got.length ^ want.length;
      for (var i = 0; i < got.length && i < want.length; i++) diff |= got[i] ^ want[i]; // 걸리는 시간이 정답 여부로 달라지지 않게
      return diff === 0;
    }, function () { return false; });
  }

  /* ================================================================
   * 백업 — 내보내기(암호 필수) / 읽기·검사 / 안전한 복원 / 되돌리기
   * ================================================================ */

  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function backupFileName(d) {
    d = d || new Date();
    return '가정교사-백업-' + d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + '.json';
  }

  function levelOfGrade(g) {
    var c = String(g).charAt(0);
    return { e: 'elem', m: 'mid', h: 'high', u: 'univ', a: 'adult' }[c] || 'elem';
  }

  // 별명 등 짧은 글: 제어 문자·꺾쇠를 빼고 길이를 자른다
  function cleanText(s, max) {
    return typeof s === 'string' ? s.replace(/[\u0000-\u001f\u007f<>]/g, '').trim().slice(0, max) : '';
  }

  function cleanProfile(p) {
    if (!isObj(p) || typeof p.id !== 'string' || !ID_RE.test(p.id)) return null;
    if (typeof p.grade !== 'string' || !/^[a-z0-9]{1,6}$/.test(p.grade)) return null;
    var out = { id: p.id, grade: p.grade, level: LEVELS.indexOf(p.level) >= 0 ? p.level : levelOfGrade(p.grade) };
    out.name = cleanText(p.name, 20);
    out.avatar = cleanText(p.avatar, 8);
    if (PACES.indexOf(p.pace) >= 0) out.pace = p.pace;
    if (typeof p.created === 'number' && isFinite(p.created)) out.created = p.created;
    if (p.lock !== undefined && p.lock !== null) {
      if (!validLock(p.lock)) return null;
      out.lock = { v: 1, salt: p.lock.salt, iter: p.lock.iter, hash: p.lock.hash };
    }
    return out;
  }

  var BAD = { bad: true };
  // 객체 리터럴의 __proto__ 는 자기 키가 되지 않으므로 문자열로 비교한다(프로토타입 오염 방지)
  function dangerKey(k) { return k === '__proto__' || k === 'constructor' || k === 'prototype'; }
  // JSON 값을 새로 복사하며 검사한다: 깊이·길이 제한, 위험한 키(__proto__ 등) 제거
  function sanitize(v, depth) {
    if (depth > 12) return BAD;
    if (v === null || typeof v === 'boolean') return v;
    if (typeof v === 'number') return isFinite(v) ? v : null;
    if (typeof v === 'string') return v.length > 100000 ? v.slice(0, 100000) : v;
    if (Array.isArray(v)) {
      if (v.length > 50000) return BAD;
      var arr = [];
      for (var i = 0; i < v.length; i++) {
        var x = sanitize(v[i], depth + 1);
        if (x === BAD) return BAD;
        arr.push(x);
      }
      return arr;
    }
    if (isObj(v)) {
      var out = {};
      var ks = Object.keys(v);
      if (ks.length > 50000) return BAD;
      for (var j = 0; j < ks.length; j++) {
        var k = ks[j];
        if (dangerKey(k)) continue;
        var y = sanitize(v[k], depth + 1);
        if (y === BAD) return BAD;
        out[k] = y;
      }
      return out;
    }
    return BAD;
  }

  function typeOk(kind, v) {
    switch (kind) {
      case 'progress': case 'stats': case 'prefs': return isObj(v);
      case 'notes': case 'attempts': case 'reports': return Array.isArray(v);
      case 'recent': case 'days': return Array.isArray(v) && v.every(function (x) { return typeof x === 'string'; });
      case 'chat': return isObj(v) || Array.isArray(v);
    }
    return false;
  }

  function fail(msg, warnings) { return { ok: false, errors: [msg], warnings: warnings || [] }; }

  // 백업 파일 겉봉 검사 — 암호를 풀기 전에 모양부터 본다
  function checkEnvelope(env) {
    if (!isObj(env) || env.format !== BACKUP_FORMAT) return '가정교사 백업 파일이 아니에요';
    if (!Number.isInteger(env.version) || env.version < 1) return '백업 파일의 판 정보가 올바르지 않아요';
    if (env.version > BACKUP_VERSION) return '더 새로운 가정교사에서 만든 백업이라 열 수 없어요. 가정교사를 새로 고친 뒤 다시 해 보세요';
    if (env.encrypted !== true) return '암호로 잠기지 않은 백업은 받지 않아요';
    var k = env.kdf;
    var c = env.cipher;
    if (!isObj(k) || k.name !== 'PBKDF2' || k.hash !== 'SHA-256' || !Number.isInteger(k.iterations) ||
        k.iterations < KDF_ITER_MIN || k.iterations > KDF_ITER_MAX) return '백업 파일의 잠금 정보가 올바르지 않아요';
    if (!isObj(c) || c.name !== 'AES-GCM') return '백업 파일의 잠금 정보가 올바르지 않아요';
    try {
      if (fromB64(k.salt).length !== 16 || fromB64(c.iv).length !== 12) return '백업 파일의 잠금 정보가 올바르지 않아요';
    } catch (e) { return '백업 파일의 잠금 정보가 올바르지 않아요'; }
    if (typeof env.data !== 'string' || !env.data.length || env.data.length > MAX_FILE) return '백업 파일의 내용이 비었거나 너무 커요';
    return null;
  }

  // 풀어낸 내용 검사 — 학생·기록 하나하나의 모양을 확인하고 깨끗한 사본을 만든다
  function validatePayload(p) {
    var errors = [];
    var warnings = [];
    if (!isObj(p) || p.format !== PAYLOAD_FORMAT) return fail('백업 내용의 형식이 맞지 않아요');
    if (!Number.isInteger(p.version) || p.version < 1 || p.version > BACKUP_VERSION) return fail('알 수 없는 백업 판이에요');
    if (!Array.isArray(p.profiles) || !p.profiles.length) return fail('백업에 학생이 없어요');
    if (p.profiles.length > MAX_PROFILES) return fail('학생이 너무 많아요 (' + p.profiles.length + '명)');
    var ids = {};
    var profiles = [];
    p.profiles.forEach(function (raw, i) {
      var c = cleanProfile(raw);
      if (!c) { errors.push((i + 1) + '번째 학생 정보가 올바르지 않아요'); return; }
      if (ids[c.id]) { errors.push('같은 학생이 두 번 들어 있어요'); return; }
      ids[c.id] = true;
      profiles.push(c);
    });
    var data = {};
    if (!isObj(p.data)) errors.push('학습 기록 부분이 없어요');
    else {
      Object.keys(p.data).forEach(function (k) {
        var m = DATA_KEY_RE.exec(k);
        if (!m || !ids[m[1]]) { warnings.push('알 수 없는 항목은 건너뛰었어요'); return; }
        if (DATA_KINDS.indexOf(m[2]) < 0) { warnings.push('알 수 없는 기록 종류는 건너뛰었어요: ' + m[2]); return; }
        var v = sanitize(p.data[k], 0);
        if (v === BAD) { errors.push('기록 값이 올바르지 않아요: ' + m[2]); return; }
        if (!typeOk(m[2], v)) { errors.push('기록 형식이 맞지 않아요: ' + m[2]); return; }
        if (JSON.stringify(v).length > MAX_KEY_BYTES) { errors.push('기록이 너무 커요: ' + m[2]); return; }
        data[k] = v;
      });
    }
    var settings = null;
    if (p.settings !== undefined && p.settings !== null) {
      var s = sanitize(p.settings, 0);
      if (isObj(s)) {
        settings = {};
        ['fontScale', 'theme', 'installHint'].forEach(function (k) {
          if (typeof s[k] === 'string' || typeof s[k] === 'number') settings[k] = s[k];
        });
      } else warnings.push('설정은 건너뛰었어요');
    }
    if (errors.length) return { ok: false, errors: errors, warnings: warnings };
    // 같은 경고는 한 번만
    warnings = warnings.filter(function (w, i) { return warnings.indexOf(w) === i; });
    return {
      ok: true, errors: [], warnings: warnings,
      payload: { profiles: profiles, data: data, settings: settings },
      summary: {
        createdAt: typeof p.createdAt === 'string' ? p.createdAt.slice(0, 40) : '',
        profiles: profiles.map(function (x) { return { name: x.name, avatar: x.avatar, grade: x.grade, level: x.level, locked: !!x.lock }; }),
        records: Object.keys(data).length,
      },
    };
  }

  function collect(store, profileIds) {
    var all = store.get('profiles', []);
    var list = (Array.isArray(all) ? all : []).filter(function (p) {
      return isObj(p) && typeof p.id === 'string' && (!profileIds || profileIds.indexOf(p.id) >= 0);
    });
    var data = {};
    list.forEach(function (p) {
      var pre = 'p.' + p.id + '.';
      store.keys(pre).forEach(function (k) {
        if (DATA_KINDS.indexOf(k.slice(pre.length)) >= 0) data[k] = store.get(k);
      });
    });
    var payload = {
      format: PAYLOAD_FORMAT, version: BACKUP_VERSION, createdAt: new Date().toISOString(),
      scope: profileIds ? 'some' : 'all', profiles: list, data: data,
    };
    if (!profileIds) payload.settings = store.get('settings', null);
    return payload;
  }

  /* 내보내기 — 암호(6자 이상)는 꼭 정해야 한다. 파일이 남의 손에 들어가도 읽을 수 없게
   *   opts: { password, profileIds?: [id…] (없으면 모든 학생), iterations?: (시험용) }
   *   → { text, fileName, profiles } */
  function exportBackup(store, opts) {
    opts = opts || {};
    var pw = String(opts.password || '');
    if (pw.length < 6) return Promise.reject(new Error('백업 암호는 6자 이상으로 정해 주세요'));
    if (!canEncrypt()) return Promise.reject(new Error('이 화면에서는 암호화를 쓸 수 없어요. 인터넷 주소(https)나 파일로 열어 주세요'));
    return store.ready().then(function () {
      var payload = collect(store, opts.profileIds || null);
      if (!payload.profiles.length) throw new Error('내보낼 학생 기록이 없어요');
      return encryptText(JSON.stringify(payload), pw, opts.iterations).then(function (enc) {
        var env = {
          format: BACKUP_FORMAT, version: BACKUP_VERSION, app: '가정교사', createdAt: payload.createdAt,
          note: '가정교사 학습 기록 백업입니다. 만들 때 정한 암호가 있어야 열 수 있어요.',
          encrypted: true, kdf: enc.kdf, cipher: enc.cipher, data: enc.data,
        };
        return { text: JSON.stringify(env, null, 1), fileName: backupFileName(), profiles: payload.profiles.length };
      });
    });
  }

  /* 읽기·검사 — 기존 데이터는 건드리지 않는다
   *   → { ok, errors[], warnings[], payload?, summary? } */
  function readBackup(text, password) {
    if (typeof text !== 'string' || !text) return Promise.resolve(fail('파일을 읽지 못했어요'));
    if (text.length > MAX_FILE) return Promise.resolve(fail('파일이 너무 커요'));
    var env;
    try { env = JSON.parse(text.replace(/^﻿/, '')); } catch (e) { return Promise.resolve(fail('가정교사 백업 파일이 아니에요')); }
    var bad = checkEnvelope(env);
    if (bad) return Promise.resolve(fail(bad));
    if (!String(password || '')) return Promise.resolve(fail('백업 암호를 넣어 주세요'));
    return decryptText(env, password).then(function (plain) {
      var payload;
      try { payload = JSON.parse(plain); } catch (e) { return fail('백업 내용이 손상되었어요'); }
      return validatePayload(payload);
    }, function () {
      return fail('암호가 맞지 않거나 파일이 손상되었어요');
    });
  }

  function newProfileId() {
    var hex = '';
    var b = cryptoApi() ? randomBytes(6) : null;
    for (var i = 0; i < 6; i++) hex += ('0' + (b ? b[i] : Math.floor(Math.random() * 256)).toString(16)).slice(-2);
    return 'p' + Date.now().toString(36) + hex;
  }

  /* 복원 — 검사를 통과한 payload 만 받는다
   *   mode 'add'     : 지금 기록은 그대로 두고 백업의 학생을 새 학생으로 더한다(기본, 안전)
   *   mode 'replace' : 이 기기의 학생·기록을 백업 내용으로 바꾼다. 바꾸기 전에 되돌리기 지점을 저장한다
   *   저장소가 쓰기에 실패하면 메모리도 바뀌지 않는다(replaceAll) — 기존 데이터가 손상되지 않는다 */
  function restoreBackup(store, payload, opts) {
    var mode = opts && opts.mode === 'replace' ? 'replace' : 'add';
    if (!payload || !Array.isArray(payload.profiles) || !payload.profiles.length || !isObj(payload.data)) {
      return Promise.reject(new Error('검사를 통과한 백업만 복원할 수 있어요'));
    }
    return store.ready().then(function () {
      return mode === 'add' ? restoreAdd(store, payload) : restoreReplace(store, payload);
    });
  }

  function restoreAdd(store, payload) {
    var existing = store.get('profiles', []);
    if (!Array.isArray(existing)) existing = [];
    var taken = {};
    existing.forEach(function (p) { if (isObj(p)) taken[p.id] = true; });
    var names = existing.map(function (p) { return isObj(p) ? p.name : ''; });
    var map = {};
    var added = [];
    payload.profiles.forEach(function (p) {
      var id = newProfileId();
      while (taken[id]) id = newProfileId();
      taken[id] = true;
      map[p.id] = id;
      var np = clone(p);
      np.id = id;
      if (np.name && names.indexOf(np.name) >= 0) np.name = (np.name.slice(0, 15) + ' (가져옴)');
      added.push(np);
    });
    var entries = {};
    Object.keys(payload.data).forEach(function (k) {
      var m = DATA_KEY_RE.exec(k);
      if (m && map[m[1]]) entries['p.' + map[m[1]] + '.' + m[2]] = payload.data[k];
    });
    entries.profiles = existing.concat(added);
    if (!store.get('current', null)) entries.current = added[0].id;
    // 지금 키는 모두 남기고(keep) 새 키만 더한다 — 한 번에 저장
    return store.replaceAll(entries, function () { return true; }).then(function () {
      return { ok: true, mode: 'add', added: added.map(function (p) { return p.id; }) };
    });
  }

  function restoreReplace(store, payload) {
    var point = { at: Date.now(), entries: store.snapshot() };
    var entries = {};
    Object.keys(payload.data).forEach(function (k) { entries[k] = payload.data[k]; });
    entries.profiles = payload.profiles;
    entries.current = payload.profiles[0].id;
    if (payload.settings) entries.settings = payload.settings;
    // 1) 되돌리기 지점부터 저장 — 이것이 실패하면 아무것도 바꾸지 않는다
    return store.replaceAll({ 'sys.restorePoint': point }, function () { return true; }).then(function () {
      // 2) 한 번에 바꾼다(설정은 백업에 없으면 이 기기 것을 둔다)
      return store.replaceAll(entries, function (k) { return k === 'settings' && !payload.settings; });
    }).then(function () {
      return { ok: true, mode: 'replace', restorePoint: true };
    });
  }

  function restorePointInfo(store) {
    var p = store.get('sys.restorePoint', null);
    return p && isObj(p.entries) ? { at: p.at, profiles: Array.isArray(p.entries.profiles) ? p.entries.profiles.length : 0 } : null;
  }

  // 마지막 '바꾸기' 복원 전으로 되돌린다
  function undoRestore(store) {
    return store.ready().then(function () {
      var p = store.get('sys.restorePoint', null);
      if (!p || !isObj(p.entries)) throw new Error('되돌릴 기록이 없어요');
      return store.replaceAll(p.entries).then(function () {
        store.remove('sys.restorePoint');
        return store.flush();
      }).then(function () { return { ok: true }; });
    });
  }

  // 이 기기의 학습 기록을 모두 지운다(설정은 남길 수 있다)
  function wipeAll(store, keepSettings) {
    return store.replaceAll({}, function (k) { return keepSettings && k === 'settings'; }).then(function () {
      store.remove('sys.restorePoint');
      return store.flush();
    });
  }

  return {
    createStore: createStore,
    MemoryProvider: MemoryProvider,
    LocalStorageProvider: LocalStorageProvider,
    IndexedDBProvider: IndexedDBProvider,
    DATA_KINDS: DATA_KINDS,
    canEncrypt: canEncrypt,
    exportBackup: exportBackup,
    readBackup: readBackup,
    restoreBackup: restoreBackup,
    restorePointInfo: restorePointInfo,
    undoRestore: undoRestore,
    wipeAll: wipeAll,
    backupFileName: backupFileName,
    hashPin: hashPin,
    verifyPin: verifyPin,
    PIN_RE: PIN_RE,
    // 시험용
    _internal: {
      encryptText: encryptText, decryptText: decryptText, checkEnvelope: checkEnvelope,
      validatePayload: validatePayload, sanitize: sanitize, cleanProfile: cleanProfile,
      BACKUP_FORMAT: BACKUP_FORMAT, PAYLOAD_FORMAT: PAYLOAD_FORMAT,
    },
  };
});
