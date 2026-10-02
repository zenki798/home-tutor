/* 가정교사 — 데이터 등록·지연 로딩·저장소 (window.Tutor)
 * 계약: docs/ARCHITECTURE.md §1
 * - 데이터 파일(data/*.js)이 Tutor.registerX 를 불러 자신을 등록한다. fetch 를 쓰지 않는 것은 file:// 에서 막히기 때문.
 * - 저장소는 localStorage 가 막혀 있어도(사생활 보호 모드·file:// 설정) 메모리로 조용히 계속한다.
 * - node 에서도 require 해서 쓸 수 있다(내용 검사·테스트). 이때 저장소는 메모리만 쓴다. */
(function (root, factory) {
  var mod = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = mod;
  else root.Tutor = mod;
})(typeof self !== 'undefined' ? self : this, function (root) {
  'use strict';

  var hasOwn = Object.prototype.hasOwnProperty;

  var Tutor = {
    catalog: null,
    units: {},
    indexes: {},
  };

  /* ---------- 카탈로그 ---------- */

  var maps = null; // 카탈로그에서 id 로 바로 찾기 위한 표 (카탈로그가 바뀌면 다시 만든다)

  function buildMaps() {
    var m = { level: {}, subject: {}, course: {}, unit: {} };
    var cat = Tutor.catalog;
    if (!cat) return m;
    (cat.levels || []).forEach(function (lv) { if (lv && lv.id) m.level[lv.id] = lv; });
    (cat.subjects || []).forEach(function (s) { if (s && s.id) m.subject[s.id] = s; });
    (cat.courses || []).forEach(function (c) {
      if (!c || !c.id) return;
      m.course[c.id] = c;
      (c.units || []).forEach(function (u, i) {
        if (u && u.id && !m.unit[u.id]) m.unit[u.id] = { course: c, unit: u, index: i };
      });
    });
    return m;
  }

  function lookup() {
    if (!maps) maps = buildMaps();
    return maps;
  }

  Tutor.registerCatalog = function (catalog) {
    Tutor.catalog = catalog || null;
    maps = null;
  };

  Tutor.registerUnit = function (unit) {
    if (!unit || typeof unit.id !== 'string' || !unit.id) return;
    Tutor.units[unit.id] = unit;
  };

  Tutor.registerIndex = function (subject, entries) {
    if (typeof subject !== 'string' || !subject) return;
    Tutor.indexes[subject] = Array.isArray(entries) ? entries : [];
  };

  Tutor.level = function (id) { return hasOwn.call(lookup().level, id) ? lookup().level[id] : null; };
  Tutor.subject = function (id) { return hasOwn.call(lookup().subject, id) ? lookup().subject[id] : null; };
  Tutor.course = function (id) { return hasOwn.call(lookup().course, id) ? lookup().course[id] : null; };

  Tutor.unitMeta = function (unitId) {
    var m = hasOwn.call(lookup().unit, unitId) ? lookup().unit[unitId] : null;
    return m ? { course: m.course, unit: m.unit, index: m.index } : null;
  };

  Tutor.coursesFor = function (gradeId, subjectId) {
    var cat = Tutor.catalog;
    if (!cat || !Array.isArray(cat.courses)) return [];
    return cat.courses.filter(function (c) {
      return c && Array.isArray(c.grades) && c.grades.indexOf(gradeId) >= 0 &&
        (!subjectId || c.subject === subjectId);
    });
  };

  /* ---------- 스크립트 지연 로딩 ---------- */

  var LOAD_TIMEOUT = 15000;
  var pending = {}; // src → Promise. 같은 src 는 한 번만 싣는다(실패하면 지워서 다시 시도할 수 있게)

  Tutor.loadScript = function (src) {
    if (hasOwn.call(pending, src)) return pending[src];
    var p = new Promise(function (resolve, reject) {
      var doc = root.document;
      if (!doc || typeof doc.createElement !== 'function') {
        reject(new Error('문서가 없어 스크립트를 실을 수 없습니다: ' + src));
        return;
      }
      var s = doc.createElement('script');
      var settled = false;
      var timer = setTimeout(function () { finish(new Error('시간이 너무 오래 걸립니다: ' + src)); }, LOAD_TIMEOUT);
      function finish(err) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        s.onload = null;
        s.onerror = null;
        if (err) {
          delete pending[src];
          if (s.parentNode) s.parentNode.removeChild(s);
          reject(err);
        } else {
          resolve();
        }
      }
      s.onload = function () { finish(null); };
      s.onerror = function () { finish(new Error('불러오지 못했습니다: ' + src)); };
      s.src = src;
      (doc.head || doc.documentElement).appendChild(s);
    });
    pending[src] = p;
    return p;
  };

  /* 경로 밖으로 나가는 id(../ 등)를 막는다 */
  var SAFE_ID = /^[A-Za-z0-9][A-Za-z0-9_-]*$/;

  Tutor.loadUnit = function (unitId) {
    if (typeof unitId === 'string' && hasOwn.call(Tutor.units, unitId)) return Promise.resolve(Tutor.units[unitId]);
    if (typeof unitId !== 'string' || !SAFE_ID.test(unitId)) {
      return Promise.reject(new Error('단원 이름이 올바르지 않습니다: ' + unitId));
    }
    return Tutor.loadScript('data/units/' + unitId + '.js').then(function () {
      if (!hasOwn.call(Tutor.units, unitId)) {
        delete pending['data/units/' + unitId + '.js']; // 내용이 없던 파일 — 다시 시도할 수 있게
        throw new Error('단원 파일에 내용이 없습니다: ' + unitId);
      }
      return Tutor.units[unitId];
    });
  };

  Tutor.loadIndex = function (subject) {
    if (typeof subject === 'string' && hasOwn.call(Tutor.indexes, subject)) return Promise.resolve(Tutor.indexes[subject]);
    if (typeof subject !== 'string' || !SAFE_ID.test(subject)) {
      return Promise.reject(new Error('과목 이름이 올바르지 않습니다: ' + subject));
    }
    return Tutor.loadScript('data/index/' + subject + '.js').then(function () {
      if (!hasOwn.call(Tutor.indexes, subject)) {
        delete pending['data/index/' + subject + '.js'];
        throw new Error('색인 파일에 내용이 없습니다: ' + subject);
      }
      return Tutor.indexes[subject];
    });
  };

  /* ---------- 저장소 ----------
   * 브라우저에서 js/storage.js(TutorStorage)가 먼저 실렸으면 그것을 쓴다:
   *   IndexedDB → localStorage → 메모리, ready() 뒤에 화면을 그린다 (ARCHITECTURE §9).
   * 없으면(node 시험, storage.js 를 못 불러왔을 때) 아래의 localStorage 저장소를 쓴다:
   *   값은 JSON 으로, 키 앞에 'tutor.' 를 붙인다.
   *   이 세션에서 쓴 값은 메모리에도 둔다: localStorage 가 막혀 있거나 가득 차도 같은 화면 안에서는 이어진다. */

  var PREFIX = 'tutor.';
  var memory = {};   // 키(접두어 포함) → JSON 문자열, 지운 키는 null

  function storage() {
    try {
      return root.localStorage || null;
    } catch (e) {
      return null; // 접근만 해도 예외를 던지는 브라우저가 있다
    }
  }

  function readRaw(k) {
    if (hasOwn.call(memory, k)) return memory[k];
    var s = storage();
    if (!s) return null;
    try {
      var v = s.getItem(k);
      return v === undefined ? null : v;
    } catch (e) {
      return null;
    }
  }

  function parse(raw, fallback) {
    if (raw === null || raw === undefined) return fallback;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  Tutor.store = {
    get: function (key, fallback) {
      if (fallback === undefined) fallback = null;
      return parse(readRaw(PREFIX + key), fallback);
    },
    set: function (key, value) {
      var k = PREFIX + key;
      var raw;
      try {
        raw = JSON.stringify(value === undefined ? null : value);
      } catch (e) {
        return false; // 순환 참조 같은 것은 저장하지 않는다
      }
      memory[k] = raw;
      var s = storage();
      if (!s) return false;
      try {
        s.setItem(k, raw);
        return true;
      } catch (e) {
        return false;
      }
    },
    remove: function (key) {
      var k = PREFIX + key;
      memory[k] = null;
      var s = storage();
      if (!s) return;
      try { s.removeItem(k); } catch (e) { /* 막혀 있으면 메모리에서만 지운다 */ }
    },
    keys: function (prefix) {
      var seen = {};
      var out = [];
      var want = PREFIX + (typeof prefix === 'string' ? prefix : ''); // storage.js 처럼 앞머리로 고를 수 있다
      function add(k) {
        if (typeof k !== 'string' || k.indexOf(want) !== 0 || hasOwn.call(seen, k)) return;
        seen[k] = true;
        if (readRaw(k) !== null) out.push(k.slice(PREFIX.length));
      }
      var s = storage();
      if (s) {
        try {
          for (var i = 0; i < s.length; i++) add(s.key(i));
        } catch (e) { /* 메모리 키만 쓴다 */ }
      }
      Object.keys(memory).forEach(add);
      return out;
    },
    // storage.js 와 같은 모양으로 쓰도록: 이 저장소는 바로 쓸 수 있어 기다릴 것이 없다
    ready: function () { return Promise.resolve(Tutor.store); },
    flush: function () { return Promise.resolve(); },
    removePrefix: function (prefix) {
      if (typeof prefix !== 'string' || prefix.length < 3) return 0; // 실수로 전부 지우지 않게
      var ks = Tutor.store.keys(prefix);
      ks.forEach(function (k) { Tutor.store.remove(k); });
      return ks.length;
    },
  };

  var TS = root && root.TutorStorage;
  if (TS && typeof TS.createStore === 'function') {
    try {
      Tutor.store = TS.createStore();
    } catch (e) { /* 만들지 못하면 위의 localStorage 저장소로 계속한다 */ }
  }

  return Tutor;
});
