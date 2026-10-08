/* 가정교사 — 화면 동작 (window.TutorApp)
 * 계약: docs/ARCHITECTURE.md §1·§7·§8
 * - 주소 뒤 # 로 화면을 나눈다(file:// 에서도 뒤로 가기가 된다).
 * - 엔진(TutorMath·TutorText·TutorFig·TutorSearch·TutorSolver)이 없거나 오류를 내도 화면은 죽지 않는다:
 *   글자는 이스케이프해 그대로 보이고, 그 기능만 빠진다.
 * - 저장은 Tutor.store 로만. 별명·기록·질문은 이 기기 밖으로 나가지 않는다. */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var Tutor = window.Tutor;
  var VERSION = '0.1.0';
  var ISSUES_URL = 'https://github.com/zenki798/home-tutor/issues';

  function setState(s) { root.setAttribute('data-state', s); }

  if (!Tutor) {
    setState('error');
    var m0 = doc.getElementById('main');
    if (m0) {
      /* 인라인 이벤트(onclick=…)는 CSP 가 막는다 — 이벤트는 코드로 단다 */
      m0.innerHTML = '<div class="page"><div class="state-box is-error"><p>프로그램 파일(js/core.js)을 불러오지 못했어요.</p>' +
        '<button type="button" class="btn primary" id="reloadBtn">다시 시도</button></div></div>';
      var rb = doc.getElementById('reloadBtn');
      if (rb) rb.addEventListener('click', function () { location.reload(); });
    }
    return;
  }

  var store = Tutor.store;
  var TS = window.TutorStorage || null; // 백업·PIN (js/storage.js). 없으면 그 기능만 막는다
  var TI = window.TutorImpact || null;  // 교육과정 변경이 학생에게 닿는가(js/impact.js, 기기 안 계산). 없으면 그 안내만 빠진다
  var TR = window.TutorReview || null;  // 복습 일정(js/review.js). 없으면 오답노트만 예전처럼 쓴다
  var TSP = window.TutorSpeech || null; // 읽어 주기 글 만들기(js/speech.js). 없으면 🔊 버튼만 빠진다

  /* ================= 설정(글자 크기·테마) — 화면을 그리기 전에 먼저 적용해 깜빡임을 줄인다 ================= */

  var FONT_SCALES = ['1', '2', '3'];
  var THEMES = ['auto', 'light', 'dark'];
  var THEME_COLORS = { light: '#f7f4ee', dark: '#14161b' };

  function getSettings() {
    var s = store.get('settings', {});
    if (!isObj(s)) s = {};
    return {
      fontScale: FONT_SCALES.indexOf(String(s.fontScale)) >= 0 ? Number(s.fontScale) : 1,
      theme: THEMES.indexOf(s.theme) >= 0 ? s.theme : 'auto',
      installHint: s.installHint === 'off' ? 'off' : 'on',
    };
  }

  function saveSettings(patch) {
    var s = getSettings();
    Object.keys(patch).forEach(function (k) { s[k] = patch[k]; });
    store.set('settings', s);
    // 바로 저장한다 — 바꾸자마자 창을 닫아도 다음에 연 화면이 예전 설정으로 돌아가지 않게
    if (typeof store.flush === 'function') { try { store.flush().then(null, function () {}); } catch (e) { /* 저장 실패는 다음 기회에 */ } }
    applySettings(s);
    return s;
  }

  function applySettings(s) {
    root.setAttribute('data-font', String(s.fontScale));
    if (s.theme === 'light' || s.theme === 'dark') root.setAttribute('data-theme', s.theme);
    else root.removeAttribute('data-theme');
    var metas = doc.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) {
      var meta = metas[i];
      if (!meta.hasAttribute('data-media')) meta.setAttribute('data-media', meta.getAttribute('media') || '');
      var auto = /dark/.test(meta.getAttribute('data-media')) ? THEME_COLORS.dark : THEME_COLORS.light;
      meta.setAttribute('content', s.theme === 'auto' ? auto : THEME_COLORS[s.theme]);
    }
  }

  applySettings(getSettings());

  /* 앱 모드: 홈 화면에 설치해서 실행한 경우. manifest 의 start_url 에 ?source=pwa 를 붙여 두었다. */
  var APP_MODE = (function () {
    try {
      return window.matchMedia('(display-mode: standalone)').matches ||
        window.matchMedia('(display-mode: fullscreen)').matches ||
        navigator.standalone === true ||
        /(?:^|[?&])source=pwa(?:&|$)/.test(location.search.slice(1));
    } catch (e) { return false; }
  })();
  if (APP_MODE) root.classList.add('app-mode');

  /* ================= 작은 도구 ================= */

  function esc(s) {
    return String(s === null || s === undefined ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(sel, el) { return (el || doc).querySelector(sel); }
  function $$(sel, el) { return Array.prototype.slice.call((el || doc).querySelectorAll(sel)); }
  function isObj(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }
  function num(v) { return typeof v === 'number' && isFinite(v) ? v : 0; }
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function todayStr(d) { d = d || new Date(); return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
  function hashStr(s) {
    var h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }
  var idSeq = 0;
  function nextId(p) { idSeq += 1; return (p || 'id') + idSeq; }
  function report(err) { try { console.error('[가정교사]', err); } catch (e) { /* 콘솔이 없는 환경 */ } }
  function warn(msg, err) { try { console.warn('[가정교사] ' + msg, err || ''); } catch (e) { /* 무시 */ } }
  function sameArr(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }
  function announce(msg) {
    var a = doc.getElementById('announcer');
    if (!a) return;
    a.textContent = '';
    setTimeout(function () { a.textContent = msg; }, 40);
  }
  function para(text) { return '<p>' + esc(text) + '</p>'; }

  /* 받침에 따라 조사를 고른다: josa('부등식', '을/를') → '을' */
  var DIGIT_JONG = [21, 8, 0, 16, 0, 0, 1, 8, 8, 0]; // 영 일 이 삼 사 오 육 칠 팔 구
  function jongOf(word) {
    var w = String(word || '').replace(/[\s'"‘’“”()[\]{}<>.,!?~·…:;*_$\\-]+$/, '');
    if (!w) return -1;
    var ch = w.charAt(w.length - 1);
    var code = ch.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) return (code - 0xac00) % 28;
    if (ch >= '0' && ch <= '9') return DIGIT_JONG[+ch];
    if (/[a-z]/i.test(ch)) return /[lmn]/i.test(ch) ? (/l/i.test(ch) ? 8 : 4) : 0;
    return -1;
  }
  function josa(word, pair) {
    var p = pair.split('/');
    var j = jongOf(word);
    if (j < 0) return p[0] + '(' + p[1] + ')';
    if (pair === '으로/로') return (j === 0 || j === 8) ? '로' : '으로';
    return j > 0 ? p[0] : p[1];
  }

  /* 학교급별 말투: 초등 e(쉬운 해요체), 중등 m(해요체), 고등 이상 h(합니다체) */
  function toneOf(profile) {
    var lv = profile ? profile.level : '';
    if (lv === 'elem') return 'e';
    if (lv === 'high' || lv === 'univ' || lv === 'adult') return 'h';
    return 'm';
  }
  function say(v) {
    if (typeof v === 'string') return v;
    var t = toneOf(S.profile);
    return v[t] || (t === 'e' ? v.m : null) || v.m || v.h || v.e || '';
  }

  /* 무작위: 문제 섞기는 seed 로 재현할 수 있게 */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, rnd) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  /* 문제 생성기 seed 는 매번 달라야 한다(같은 단원을 다시 풀어도 새 문제). 화면 코드가 시각으로 만든다. */
  var seedCounter = 0;
  function newSeed() {
    seedCounter += 1;
    return ((Date.now() % 2147483647) ^ Math.floor(Math.random() * 2147483647) ^ (seedCounter * 7919)) >>> 0;
  }

  /* ================= 엔진 감싸기 — 없거나 오류가 나도 화면은 계속 ================= */

  function engine(name) {
    var g = window[name];
    return g && (typeof g === 'object' || typeof g === 'function') ? g : null;
  }

  var E = {
    render: function (src) {
      if (src === null || src === undefined || src === '') return '';
      var TT = engine('TutorText');
      if (TT && typeof TT.render === 'function') {
        try { return TT.render(String(src)); } catch (e) { report(e); }
      }
      return '<p>' + esc(src).replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
    },
    inline: function (src) {
      if (src === null || src === undefined) return '';
      var TT = engine('TutorText');
      if (TT && typeof TT.inline === 'function') {
        try { return TT.inline(String(src)); } catch (e) { report(e); }
      }
      return esc(src);
    },
    plain: function (src) {
      if (src === null || src === undefined) return '';
      var TT = engine('TutorText');
      if (TT && typeof TT.plain === 'function') {
        try { return String(TT.plain(String(src))); } catch (e) { report(e); }
      }
      return String(src).replace(/\[\[[^\]]*\]\]/g, '(   )').replace(/\*\*|__|\$/g, '').replace(/\\([a-zA-Z]+)/g, '$1');
    },
    fig: function (spec) {
      if (!isObj(spec)) return '';
      var TF = engine('TutorFig');
      if (TF && typeof TF.render === 'function') {
        try {
          var svg = String(TF.render(spec));
          /* 그림은 viewBox 1단위 ≈ 1px 로 그려진다: 그 너비를 넘게 늘이지 않고(글자 크기 설정만큼은 같이 커지게 rem), 좁으면 줄인다 */
          var vb = /viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)/.exec(svg);
          var w = vb ? parseFloat(vb[1]) : 0;
          return '<figure class="fig-wrap"><div class="fig-in"' + (w > 0 ? ' style="max-width:' + (Math.round((w / 16) * 100) / 100) + 'rem"' : '') + '>' + svg + '</div></figure>';
        } catch (e) { report(e); }
      }
      return spec.alt ? '<figure class="fig-wrap fig-missing"><figcaption>' + esc('그림: ' + spec.alt) + '</figcaption></figure>' : '';
    },
    check: function (p, input) {
      var TM = engine('TutorMath');
      if (TM && typeof TM.checkAnswer === 'function') {
        try {
          var r = TM.checkAnswer(p, input);
          if (r && typeof r.correct === 'boolean') return { correct: r.correct, empty: !!r.empty };
        } catch (e) { report(e); }
      }
      return fallbackCheck(p, input);
    },
    answerText: function (p) {
      var TM = engine('TutorMath');
      if (TM && typeof TM.answerText === 'function') {
        try { return String(TM.answerText(p)); } catch (e) { report(e); }
      }
      if (p.type === 'choice') return String((p.choices || [])[p.answer]);
      if (p.type === 'ox') return p.answer ? 'O' : 'X';
      if (p.type === 'order') return (p.answer || []).map(function (i) { return (p.choices || [])[i]; }).join(' → ');
      return String(Array.isArray(p.answer) ? p.answer[0] : p.answer);
    },
    toolkit: function (seed) {
      var TM = engine('TutorMath');
      if (!TM || typeof TM.toolkit !== 'function') return null;
      try { return TM.toolkit(seed); } catch (e) { report(e); return null; }
    },
    rng: function (seed) {
      var TM = engine('TutorMath');
      if (TM && typeof TM.rng === 'function') {
        try { var f = TM.rng(seed); if (typeof f === 'function') return f; } catch (e) { report(e); }
      }
      return mulberry32(seed);
    },
    solve: function (text, grade) {
      var TS = engine('TutorSolver');
      if (!TS || typeof TS.solve !== 'function') return null;
      try {
        var r = TS.solve(text, { grade: grade });
        return r && (Array.isArray(r.steps) || r.answer) ? r : null;
      } catch (e) { report(e); return null; }
    },
    intent: function (text) {
      var SE = engine('TutorSearch');
      if (!SE || typeof SE.intent !== 'function') return null;
      try { return SE.intent(text) || null; } catch (e) { report(e); return null; }
    },
    canSearch: function () {
      var SE = engine('TutorSearch');
      return !!(SE && typeof SE.build === 'function' && typeof SE.query === 'function');
    },
    build: function (entries) {
      return engine('TutorSearch').build(entries);
    },
    query: function (index, text, opts) {
      var SE = engine('TutorSearch');
      try {
        var r = SE.query(index, text, opts);
        return Array.isArray(r) ? r.filter(function (x) { return x && isObj(x.entry) && !(typeof x.score === 'number' && x.score <= 0); }) : [];
      } catch (e) { report(e); return []; }
    },
  };

  /* 채점 엔진이 없을 때의 간단한 채점 (정확한 채점은 TutorMath.checkAnswer) */
  function fallbackCheck(p, input) {
    var empty = input === null || input === undefined ||
      (typeof input === 'string' && !input.trim()) || (Array.isArray(input) && !input.length);
    if (empty) return { correct: false, empty: true };
    if (p.type === 'choice' || p.type === 'ox') return { correct: input === p.answer, empty: false };
    if (p.type === 'order') return { correct: sameArr(input, p.answer), empty: false };
    var norm = function (s) {
      s = String(s);
      if (s.normalize) s = s.normalize('NFKC');
      return s.replace(/\s+/g, '').toLowerCase().replace(/[.?]+$/, '');
    };
    var answers = Array.isArray(p.answer) ? p.answer : [p.answer];
    var given = String(input);
    if (p.unit) given = given.split(p.unit).join('');
    if (p.check === 'set') {
      var setOf = function (s) { return String(s).split(/[,\s]+|또는|or/).filter(Boolean).map(norm).sort().join(','); };
      var want = answers.length > 1 ? answers.map(norm).sort().join(',') : setOf(answers[0]);
      return { correct: setOf(given) === want, empty: false };
    }
    return { correct: answers.some(function (a) { return norm(a) === norm(given); }), empty: false };
  }

  /* ================= 상태와 저장 ================= */

  var S = {
    route: null,
    prevRoute: null,
    seq: 0,
    profile: null,
    depth: 0,
    replacing: false,
    first: true,
    quiz: null,
    review: null,    // 지금 하는 '오늘의 복습' (§10)
    sumPeriod: 7,    // 보호자용 학습 요약의 기간(7·30일, §12) — 저장하지 않는다
    chats: {},       // 이번에 연 대화(서식 그대로). 저장은 p.<id>.chat 에 글자만 (§9.2)
    unitUI: {},
    search: {},      // 색인 이름 → Promise<검색 색인>
    installEvent: null,
    pendingRoute: null,
    closeModal: null,
    started: false,  // 저장소 준비(ready)가 끝나 첫 화면을 그렸는지
    unlocked: {},    // 이번에 PIN을 맞힌 학생 id — 메모리에만 둔다(다시 열면 또 묻는다)
    pinFails: {},    // 학생 id → { n, until } 연속으로 틀린 횟수
  };

  /* 기록이 이 기기에 남는지: IndexedDB·localStorage 면 남고, 메모리뿐이면 창을 닫으면 지워진다 */
  var lsOk = (function () {
    try {
      var ls = window.localStorage;
      ls.setItem('tutor.__probe', '1');
      ls.removeItem('tutor.__probe');
      return true;
    } catch (e) { return false; }
  })();
  function storageOk() {
    var p = store && store.provider;
    if (p === 'indexeddb' || p === 'localstorage') return true;
    if (p === 'memory') return false;
    return lsOk; // storage.js 없이 예전 저장소를 쓸 때
  }
  /* 'p.<학생id>.' 로 시작하는 키를 모두 지운다 — 그 학생의 기록만 */
  function removePrefix(prefix) {
    if (typeof store.removePrefix === 'function') return store.removePrefix(prefix);
    var n = 0;
    store.keys().forEach(function (k) { if (k.indexOf(prefix) === 0) { store.remove(k); n += 1; } });
    return n;
  }
  function flushStore() {
    try { return Promise.resolve(store.flush ? store.flush() : null).then(null, function () {}); } catch (e) { return Promise.resolve(); }
  }

  function validProfile(p) {
    return isObj(p) && typeof p.id === 'string' && p.id && typeof p.grade === 'string';
  }
  function profiles() {
    var list = store.get('profiles', []);
    return Array.isArray(list) ? list.filter(validProfile) : [];
  }
  function findProfile(id) {
    var list = profiles();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  /* PIN(§9.4): profile.lock 은 PIN 해시. 이번에 PIN을 맞혀야 그 학생의 화면·기록을 보여 준다 */
  function isLocked(p) { return !!(p && isObj(p.lock)); }
  function needsPin(p) { return isLocked(p) && !S.unlocked[p.id]; }
  /* 지금 학생 — PIN이 걸렸는데 아직 맞히지 않았으면 없는 것으로 친다 */
  function currentProfile() {
    var p = findProfile(store.get('current', null));
    return p && !needsPin(p) ? p : null;
  }
  function lockedCurrent() {
    var p = findProfile(store.get('current', null));
    return p && needsPin(p) ? p : null;
  }
  function setCurrent(id) {
    var prev = store.get('current', null);
    if (prev && prev !== id) delete S.unlocked[prev]; // 다른 학생으로 바꾸면 앞 학생은 다시 잠긴다(돌아올 때 PIN)
    store.set('current', id);
    S.profile = currentProfile();
    S.quiz = null;
    S.review = null;
    S.chats = {};
  }
  function newProfileId() { return 'p' + Date.now().toString(36) + Math.floor(Math.random() * 1679616).toString(36); }
  function pk(name, p) { var prof = p || S.profile; return 'p.' + (prof ? prof.id : 'guest') + '.' + name; }
  function readObj(key) { var v = store.get(key, {}); return isObj(v) ? v : {}; }
  function readArr(key) { var v = store.get(key, []); return Array.isArray(v) ? v : []; }

  function progressAll(p) { return readObj(pk('progress', p)); }
  function unitProg(all, unitId) {
    var u = isObj(all[unitId]) ? all[unitId] : {};
    return {
      seen: Array.isArray(u.seen) ? u.seen.filter(function (x) { return typeof x === 'number'; }) : [],
      cards: num(u.cards),
      solved: num(u.solved),
      correct: num(u.correct),
      best: num(u.best),
      last: num(u.last),
      checked: Array.isArray(u.checked) ? u.checked.filter(function (x) { return typeof x === 'number'; }) : [],
    };
  }
  /* checked: 이해 확인 문제를 맞힌 개념 카드 번호 (진도 기록에 덧붙인 칸) */
  function markChecked(unit, idx) {
    updateProgress(unit.id, function (u) {
      if (u.checked.indexOf(idx) < 0) u.checked.push(idx);
      u.checked.sort(function (a, b) { return a - b; });
      u.cards = (unit.concepts || []).length;
      if (u.seen.indexOf(idx) < 0) { u.seen.push(idx); u.seen.sort(function (a, b) { return a - b; }); }
    });
  }
  function updateProgress(unitId, fn) {
    var all = progressAll();
    var u = unitProg(all, unitId);
    fn(u);
    u.last = Date.now();
    all[unitId] = u;
    store.set(pk('progress'), all);
    markDay();
    return u;
  }
  /* cards: 그 단원의 개념 카드 수 — 단원 파일을 다시 싣지 않고 진도(본 카드/전체)를 계산하려고 함께 둔다 */
  function markSeen(unit, idx) {
    var all = progressAll();
    var cur = unitProg(all, unit.id);
    var total = (unit.concepts || []).length;
    if (cur.seen.indexOf(idx) >= 0 && cur.cards === total) return;
    updateProgress(unit.id, function (u) {
      if (u.seen.indexOf(idx) < 0) u.seen.push(idx);
      u.seen.sort(function (a, b) { return a - b; });
      u.cards = total;
    });
  }
  function recentList() { return readArr(pk('recent')).filter(function (x) { return typeof x === 'string'; }); }
  function pushRecent(unitId) {
    var r = recentList().filter(function (x) { return x !== unitId; });
    r.unshift(unitId);
    store.set(pk('recent'), r.slice(0, 20));
  }
  function daysList() { return readArr(pk('days')).filter(function (x) { return typeof x === 'string'; }); }
  function markDay() {
    var d = todayStr();
    var days = daysList();
    if (days.indexOf(d) >= 0) return;
    days.push(d);
    store.set(pk('days'), days.slice(-400));
  }
  function notesList() {
    return readArr(pk('notes')).filter(function (n) { return isObj(n) && isObj(n.problem) && typeof n.key === 'string'; });
  }
  function saveNotes(list) { store.set(pk('notes'), list); }

  /* 오답노트 사본: JSON 은 Infinity 를 null 로 바꾸므로(수직선 범위 끝) 표시해서 저장한다 */
  var INF = '__inf__';
  var NINF = '__-inf__';
  function packProblem(p) {
    return JSON.parse(JSON.stringify(p, function (k, v) {
      if (v === Infinity) return INF;
      if (v === -Infinity) return NINF;
      if (typeof v === 'function') return undefined;
      return v;
    }));
  }
  function unpackProblem(p) {
    (function walk(o) {
      if (!o || typeof o !== 'object') return;
      Object.keys(o).forEach(function (k) {
        var v = o[k];
        if (v === INF) o[k] = Infinity;
        else if (v === NINF) o[k] = -Infinity;
        else if (v && typeof v === 'object') walk(v);
      });
    })(p);
    return p;
  }

  /* cause: 그때 보여 준 오답 진단(글자만), concept: 그 문제가 연습하는 개념 카드 번호 (§9.2)
   * due: 다음 복습 날 — 틀리면 다음 날 '오늘의 복습'에 다시 나온다(§10) */
  function addNote(item, given, cause) {
    var list = notesList();
    var found = null;
    var concept = typeof item.p.concept === 'number' ? item.p.concept : null;
    var due = TR ? TR.firstDue(todayStr()) : null;
    for (var i = 0; i < list.length; i++) if (list[i].key === item.key) found = list[i];
    if (found) {
      found.wrongCount = num(found.wrongCount) + 1;
      found.rightStreak = 0;
      found.given = given;
      found.at = Date.now();
      found.problem = packProblem(item.p);
      found.cause = cause || '';
      found.concept = concept;
      if (due) found.due = due;
    } else {
      var fresh = {
        key: item.key, unit: item.unit, problem: packProblem(item.p), given: given, at: Date.now(),
        wrongCount: 1, rightStreak: 0, gen: item.gen || null, src: item.src, cause: cause || '', concept: concept,
      };
      if (due) fresh.due = due;
      list.unshift(fresh);
    }
    saveNotes(list.slice(0, 300));
  }

  /* ---- 복습 일정 (§10, js/review.js) ----
   * 틀리면 다음 날, 한 번 맞히면 3일 뒤에 '오늘의 복습'으로 다시 낸다. 두 번 연속 맞히면 오답노트에서 뺀다. */
  var REVIEW_MAX = 10; // 한 번에 낼 복습 문제 수
  function reviewDue(list) { return TR ? TR.dueList(list || notesList(), todayStr()) : []; }
  function nextReviewText(list) {
    var nx = TR ? TR.nextDue(list || notesList(), todayStr()) : null;
    return nx ? '다음 복습: ' + TR.label(nx.date, todayStr()) + ' · ' + nx.n + '문제' : '';
  }
  function mdText(iso) { return Number(String(iso).slice(5, 7)) + '월 ' + Number(String(iso).slice(8, 10)) + '일'; }
  /* 오답노트 항목을 다시 푼 결과를 저장한다 — 오답노트의 '다시 풀기'와 오늘의 복습이 함께 쓴다.
   *   → { note, cleared(두 번 연속 맞혀 뺐는지), due(다음 복습 날) } — 그새 지워진 항목이면 null */
  function gradeNote(key, prob, res) {
    var list = notesList();
    var idx = -1;
    for (var i = 0; i < list.length; i++) if (list[i].key === key) { idx = i; break; }
    if (idx < 0) return null;
    var n = list[idx];
    updateProgress(n.unit, function (u) { u.solved += 1; if (res.correct) u.correct += 1; });
    logItem({ unit: n.unit, src: n.src || (n.gen ? 'gen' : 'bank'), gen: n.gen, p: prob }, res);
    var out;
    if (TR) {
      out = TR.answer(n, res.correct, todayStr());
    } else if (res.correct) { // 복습 일정 파일이 없을 때: 예전 규칙만
      n.rightStreak = num(n.rightStreak) + 1;
      out = { cleared: n.rightStreak >= 2, due: null };
    } else {
      n.wrongCount = num(n.wrongCount) + 1;
      n.rightStreak = 0;
      out = { cleared: false, due: null };
    }
    if (!res.correct) {
      n.given = res.given;
      n.at = Date.now();
      n.cause = causeText(res.why);
    }
    if (out.cleared) list.splice(idx, 1);
    saveNotes(list);
    return { note: n, cleared: out.cleared, due: out.due };
  }
  /* 오답노트 위: 오늘 복습할 문제 수와 [복습 시작], 없으면 다음 복습 날 */
  function reviewSlotHtml(list) {
    if (!TR || !list.length) return '';
    var n = reviewDue(list).length;
    if (n) {
      return '<section class="review-box card" aria-label="오늘의 복습"><p class="rb-text"><span aria-hidden="true">📅</span> 오늘 복습할 문제 <strong>' + n + '개</strong></p>' +
        '<a class="btn primary" href="#/review">복습 시작</a></section>';
    }
    var nx = nextReviewText(list);
    return nx ? '<p class="review-next muted">' + esc(nx) + '</p>' : '';
  }

  /* ---- 학습 기록 (학습 연속성에 필요한 만큼만, §9.2) ----
   * attempts: 최근 풀이 2000개 { t, unit, pid | gen, level, ok, cause?, c? }   (level 0 = 개념 카드의 이해 확인, c = 묶인 개념 카드 번호)
   * stats:    { days: { 'YYYY-MM-DD': { n, c } } (최근 400일), subjects: { 과목: { n, c } } } */
  var MAX_ATTEMPTS = 2000;
  function causeText(why) {
    if (!why) return '';
    var t = E.plain(why).replace(/\s+/g, ' ').trim();
    return t.length > 200 ? t.slice(0, 199) + '…' : t;
  }
  function subjectOfUnit(unitId) {
    var meta = Tutor.unitMeta(unitId);
    if (meta) return meta.course.subject;
    var u = Tutor.units[unitId];
    var c = u ? Tutor.course(u.course) : null;
    return c ? c.subject : '';
  }
  function logAttempt(rec) {
    var a = { t: Date.now(), unit: String(rec.unit || ''), level: num(rec.level), ok: !!rec.ok };
    if (rec.gen) a.gen = String(rec.gen); else a.pid = String(rec.pid || '');
    if (rec.cause) a.cause = rec.cause;
    if (typeof rec.c === 'number' && rec.c >= 0 && Math.floor(rec.c) === rec.c) a.c = rec.c;
    var list = readArr(pk('attempts'));
    list.push(a);
    if (list.length > MAX_ATTEMPTS) list = list.slice(list.length - MAX_ATTEMPTS);
    store.set(pk('attempts'), list);

    var st = readObj(pk('stats'));
    var days = isObj(st.days) ? st.days : {};
    var subs = isObj(st.subjects) ? st.subjects : {};
    var d = todayStr();
    var dd = isObj(days[d]) ? days[d] : { n: 0, c: 0 };
    days[d] = { n: num(dd.n) + 1, c: num(dd.c) + (a.ok ? 1 : 0) };
    var keys = Object.keys(days).sort();
    if (keys.length > 400) keys.slice(0, keys.length - 400).forEach(function (k) { delete days[k]; });
    var sid = subjectOfUnit(a.unit) || 'etc';
    var ss = isObj(subs[sid]) ? subs[sid] : { n: 0, c: 0 };
    subs[sid] = { n: num(ss.n) + 1, c: num(ss.c) + (a.ok ? 1 : 0) };
    store.set(pk('stats'), { v: 1, days: days, subjects: subs });
  }
  /* 문제 위젯이 채점한 것을 기록한다. item: { unit, src, gen, p } */
  function logItem(item, res) {
    logAttempt({
      unit: item.unit, level: item.p.level || 1, ok: res.correct, cause: res.correct ? '' : causeText(res.why),
      gen: item.src === 'gen' || item.src === 'vocab' ? item.gen : null, pid: item.p.id,
      c: item.p && typeof item.p.concept === 'number' ? item.p.concept : null,
    });
  }
  function attemptsList() {
    return readArr(pk('attempts')).filter(function (a) { return isObj(a) && typeof a.ok === 'boolean'; });
  }

  /* ================= 카탈로그 도우미 ================= */

  function cat() { return Tutor.catalog || { levels: [], subjects: [], courses: [] }; }
  /* 준비 중 단원(카탈로그의 soon: true): 목록에는 보이지만 열 수 없다. 단원이 모두 준비 중인 과정은 과목 카드에도 표시 */
  function isSoon(u) { return !!(u && u.soon); }
  function readyUnits(c) { return ((c && c.units) || []).filter(function (u) { return u && u.id && !isSoon(u); }); }
  function courseSoon(c) { return !readyUnits(c).length; }
  function unitSoon(unitId) {
    var meta = Tutor.unitMeta(unitId);
    return !!(meta && isSoon(meta.unit));
  }
  function gradeInfo(gid) {
    var levels = cat().levels || [];
    for (var i = 0; i < levels.length; i++) {
      var gs = levels[i].grades || [];
      for (var j = 0; j < gs.length; j++) if (gs[j].id === gid) return { level: levels[i], grade: gs[j] };
    }
    return null;
  }
  function gradeLabel(gid, short) {
    var gi = gradeInfo(gid);
    if (!gi) return '';
    var L = gi.level;
    var G = gi.grade;
    if (short) {
      var m = /^(\d+)학년$/.exec(G.name || '');
      return m ? String(L.short || L.name).charAt(0) + m[1] : (L.short || L.name);
    }
    if (G.name === L.name || G.name === L.short) return L.name;
    return L.name + ' ' + G.name;
  }
  var TUTOR = { id: 'tutor', name: '가정교사', teacher: '가정교사', icon: '🧑‍🏫' };
  function subjectOf(id) { return Tutor.subject(id) || { id: id || 'none', name: '과목', teacher: '선생님', icon: '📘' }; }
  function subjClass(id) { return 'subj subj-' + String(id || 'none').replace(/[^a-z0-9-]/gi, ''); }
  function teacherName(s) { return s.teacher || ((s.name || '') + ' 선생님'); }
  function addressee() {
    var p = S.profile;
    if (!p || !p.name) return '';
    if (p.level === 'elem') return p.name + ' 친구';
    if (p.level === 'univ' || p.level === 'adult') return p.name + ' 님';
    return p.name + ' 학생';
  }
  var LEVEL_ICON = { elem: '🎒', mid: '📘', high: '✏️', univ: '🎓', adult: '☕' };
  var LEVEL_DESC = { elem: '1~6학년', mid: '1~3학년', high: '1~3학년', univ: '교양·기초', adult: '다시 배우는 어른' };

  /* 학생 정보(ARCHITECTURE §8): avatar 는 동물 이모지, pace 는 공부 수준 */
  var AVATARS = ['🐶', '🐱', '🐰', '🐻', '🐼', '🦊', '🐯', '🐨', '🐸', '🐧', '🦁', '🐹'];
  var AVATAR_NAMES = ['강아지', '고양이', '토끼', '곰', '판다', '여우', '호랑이', '코알라', '개구리', '펭귄', '사자', '햄스터'];
  var PACES = [
    { id: 'easy', name: '기초 다지기', desc: '쉬운 설명부터, 기본 문제로 차근차근' },
    { id: 'normal', name: '보통', desc: '교과서 순서대로' },
    { id: 'hard', name: '도전', desc: '실력 문제부터, 잘하면 심화까지' },
  ];
  function paceOf(p) {
    var v = p && p.pace;
    return v === 'easy' || v === 'hard' ? v : 'normal';
  }
  function paceName(id) {
    for (var i = 0; i < PACES.length; i++) if (PACES[i].id === id) return PACES[i].name;
    return '보통';
  }
  function nextAvatar() {
    var used = {};
    profiles().forEach(function (p) { if (p.avatar) used[p.avatar] = 1; });
    for (var i = 0; i < AVATARS.length; i++) if (!used[AVATARS[i]]) return AVATARS[i];
    return AVATARS[0];
  }
  function avatarRadios(name, current) {
    return '<div class="avatar-grid">' + AVATARS.map(function (a, i) {
      return '<label class="avatar-opt"><input type="radio" name="' + name + '" value="' + a + '"' + (a === current ? ' checked' : '') + '>' +
        '<span aria-hidden="true">' + a + '</span><span class="sr-only">' + AVATAR_NAMES[i] + '</span></label>';
    }).join('') + '</div>';
  }
  function paceRadios(name, current) {
    return '<div class="pace-list">' + PACES.map(function (p) {
      return '<label class="pace-opt"><input type="radio" name="' + name + '" value="' + p.id + '"' + (p.id === current ? ' checked' : '') + '>' +
        '<span class="pace-box"><span class="pace-name">' + esc(p.name) + '</span><span class="pace-desc">' + esc(p.desc) + '</span></span></label>';
    }).join('') + '</div>';
  }

  function courseProgress(course, prog) {
    var units = course.units || [];
    var r = { pct: 0, started: 0, total: units.length, seen: 0, cards: 0, solved: 0, correct: 0 };
    var sum = 0;
    units.forEach(function (u) {
      if (!isObj(prog[u.id])) return;
      var p = unitProg(prog, u.id);
      var s = p.seen.length;
      if (s || p.solved) r.started += 1;
      if (p.cards) sum += Math.min(1, s / p.cards);
      r.seen += s;
      r.cards += p.cards;
      r.solved += p.solved;
      r.correct += p.correct;
    });
    r.pct = units.length ? Math.round((100 * sum) / units.length) : 0;
    return r;
  }
  function unitStatus(p) {
    if (p.cards && p.seen.length >= p.cards) return { key: 'done', icon: '✔', label: '개념 다 봄' };
    if (p.seen.length || p.solved) return { key: 'doing', icon: '◐', label: '공부 중' };
    return { key: 'none', icon: '○', label: '시작 전' };
  }

  /* ================= 주소(라우터) ================= */

  function safeDecode(s) { try { return decodeURIComponent(s); } catch (e) { return s; } }
  function parseHash() {
    var h = location.hash || '';
    if (h.charAt(0) === '#') h = h.slice(1);
    var qi = h.indexOf('?');
    var path = qi >= 0 ? h.slice(0, qi) : h;
    var qstr = qi >= 0 ? h.slice(qi + 1) : '';
    var parts = path.split('/').filter(function (x) { return x; }).map(safeDecode);
    var query = {};
    qstr.split('&').forEach(function (kv) {
      if (!kv) return;
      var i = kv.indexOf('=');
      query[safeDecode(i >= 0 ? kv.slice(0, i) : kv)] = i >= 0 ? safeDecode(kv.slice(i + 1)) : '';
    });
    return { name: parts[0] || 'start', parts: parts, query: query, hash: '#' + h };
  }
  function qs(obj) {
    var out = [];
    Object.keys(obj).forEach(function (k) {
      var v = obj[k];
      if (v === undefined || v === null || v === '') return;
      out.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
    });
    return out.length ? '?' + out.join('&') : '';
  }
  function go(hash, replace) {
    if (hash.charAt(0) !== '#') hash = '#' + hash;
    if (location.hash === hash || (hash === '#/' && !location.hash)) { render(); return; }
    if (replace) {
      S.replacing = true;
      location.replace(hash);
    } else {
      location.hash = hash;
    }
  }
  /* 뒤로 가기 버튼: 앱 안에서 넘어온 화면이면 브라우저 기록으로, 처음 연 화면이면 위 단계로 */
  function syncDepth() {
    var st = null;
    try { st = history.state; } catch (e) { st = null; }
    if (isObj(st) && typeof st.tutorDepth === 'number') {
      S.depth = st.tutorDepth;
    } else {
      if (S.first) S.depth = 0;
      else if (!S.replacing) S.depth += 1;
      try { history.replaceState({ tutorDepth: S.depth }, '', location.href); } catch (e) { /* 막혀도 동작은 한다 */ }
    }
    S.replacing = false;
  }
  function goBack() {
    if (S.depth > 0) history.back();
    else go(S.backHash || '#/home', true);
  }

  /* ================= 그리기 ================= */

  var VIEWS = {};

  function render() {
    if (!S.started) return; // 저장소를 다 불러온 뒤에 처음 그린다(start)
    var seq = ++S.seq;
    syncDepth();
    S.prevRoute = S.route;
    var r = parseHash();
    S.route = r;
    window.TutorApp.route = r;
    setState('loading');
    if (S.closeModal) S.closeModal();
    stopSpeaking();     // 다른 화면으로 가면 읽기를 멈춘다(§13)
    SPEECH.reg = {};    // 🔊 버튼은 화면마다 새로 만든다

    if (!Tutor.catalog) {
      mount(seq, errorView('catalog'));
      return;
    }
    S.profile = currentProfile();
    var needsProfile = ['home', 'course', 'unit', 'quiz', 'ask', 'notes', 'stats', 'review', 'summary'];
    if (!S.profile) {
      /* 지금 학생에게 PIN이 걸려 있으면 PIN을 맞혀야 그 학생의 화면·기록을 보여 준다 (§9.4) */
      var locked = lockedCurrent();
      var wantsProfile = needsProfile.indexOf(r.name) >= 0 || (r.name === 'setup' && r.query.change === '1');
      if (locked && wantsProfile) {
        mount(seq, lockView(locked));
        return;
      }
      if (needsProfile.indexOf(r.name) >= 0) {
        S.pendingRoute = r.hash;
        go(profiles().length ? '#/' : '#/setup', true);
        return;
      }
    }
    if (r.name === 'start' && !profiles().length) {
      go('#/setup', true);
      return;
    }

    var view = VIEWS[r.name] || viewNotFound;
    var out;
    try {
      out = view(r);
    } catch (e) {
      report(e);
      out = errorView('crash', e);
    }
    if (out && typeof out.then === 'function') {
      mount(seq, loadingView(), true);
      out.then(function (v) { mount(seq, v); }, function (err) {
        warn('불러오기 실패', err);
        mount(seq, errorView('load', err));
      });
    } else {
      mount(seq, out);
    }
  }

  function mount(seq, v, keepLoading) {
    if (seq !== S.seq) return; // 그새 다른 화면으로 넘어갔다
    if (v.redirect) { go(v.redirect, true); return; }
    var main = doc.getElementById('main');
    updateChrome(v);
    var page = doc.createElement('div');
    page.className = 'page' + (v.cls ? ' ' + v.cls : '') + (v.subject ? ' ' + subjClass(v.subject) : '');
    page.innerHTML = v.html || '';
    main.innerHTML = '';
    main.appendChild(page);
    if (typeof v.mount === 'function') {
      try { v.mount(page); } catch (e) { report(e); }
    }
    if (keepLoading) return;
    /* 어느 주소를 다 그렸는지 남긴다 — 테스트가 "이 주소의 화면이 다 그려졌는지"를 정확히 기다리게 */
    root.setAttribute('data-route', S.route.hash);
    setState(v.state || 'ready');
    if (!S.first) placeFocus(page, v);
    S.first = false;
  }

  function placeFocus(page, v) {
    var r = S.route;
    var prev = S.prevRoute;
    /* 같은 단원 안에서 탭만 바꿨으면 탭에 그대로 머문다 */
    if (r.name === 'unit' && prev && prev.name === 'unit' && prev.parts[1] === r.parts[1]) {
      var cur = $('.unit-tabs [aria-current="page"]', page);
      if (cur) {
        cur.focus();
        var tabs = $('.unit-tabs', page);
        if (tabs && tabs.getBoundingClientRect().top < 0) tabs.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
    var target = (v.focus && $(v.focus, page)) || $('.page-title', page) || $('h2', page);
    if (target) {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); }
    }
  }

  function updateChrome(v) {
    var title = v.title || '가정교사';
    doc.getElementById('topTitle').textContent = title;
    doc.title = title === '가정교사' ? '가정교사 — 초등부터 성인까지 혼자 공부' : title + ' · 가정교사';
    S.backHash = v.back || null;
    doc.getElementById('backBtn').hidden = !v.back;
    root.classList.toggle('has-back', !!v.back);
    root.classList.toggle('no-profile', !S.profile);
    if (v.subject) root.setAttribute('data-subject', v.subject);
    else root.removeAttribute('data-subject');
    $$('#tabbar a').forEach(function (a) {
      if (a.getAttribute('data-tab') === v.tab) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    var gear = doc.getElementById('settingsBtn');
    if (S.route && S.route.name === 'settings') gear.setAttribute('aria-current', 'page'); else gear.removeAttribute('aria-current');
    var chip = doc.getElementById('studentChip');
    if (S.profile) {
      var p = S.profile;
      var name = p.name || '학생';
      chip.hidden = false;
      chip.innerHTML = '<span class="chip-avatar" aria-hidden="true">' + esc(avatarChar(p)) + '</span>' +
        '<span class="chip-name">' + esc(name) + '</span><span class="chip-grade">' + esc(gradeLabel(p.grade, true)) + '</span>';
      chip.setAttribute('aria-label', '학생 바꾸기 (지금: ' + name + ', ' + gradeLabel(p.grade) + ')');
    } else {
      chip.hidden = true;
    }
  }

  function avatarChar(p) {
    if (p && typeof p.avatar === 'string' && AVATARS.indexOf(p.avatar) >= 0) return p.avatar;
    if (p && p.name) {
      var chars = Array.from ? Array.from(p.name) : p.name.split('');
      return chars[0];
    }
    return LEVEL_ICON[p ? p.level : ''] || '🙂';
  }

  function loadingView() {
    return { title: (S.route && S.route.name === 'unit') ? '불러오는 중' : '가정교사', html: '<div class="state-box" role="status"><p>불러오는 중이에요…</p></div>' };
  }

  function errorView(kind, err) {
    var msg = kind === 'catalog' ? '학습 목록(data/catalog.js)을 불러오지 못했어요.' :
      kind === 'load' ? '내용을 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요.' :
        '화면을 그리다 문제가 생겼어요.';
    return {
      title: '문제가 생겼어요',
      state: 'error',
      back: S.profile ? '#/home' : null,
      html: '<div class="state-box is-error" role="alert"><p class="state-icon" aria-hidden="true">⚠️</p><p>' + esc(msg) + '</p>' +
        (err && err.message ? '<p class="muted small">' + esc(err.message) + '</p>' : '') +
        '<button type="button" class="btn primary" data-act="retry">다시 시도</button></div>',
      mount: function (page) {
        var b = $('[data-act="retry"]', page);
        if (b) b.addEventListener('click', function () { if (kind === 'catalog') location.reload(); else render(); });
      },
    };
  }

  function viewNotFound() {
    return {
      title: '찾을 수 없어요',
      back: '#/home',
      html: '<div class="state-box"><p>찾는 화면이 없어요.</p><a class="btn primary" href="#/home">처음으로</a></div>',
    };
  }

  /* 선생님 말풍선 */
  function bubble(s, msgHtml, extraCls) {
    return '<div class="bubble-row ' + subjClass(s.id) + (extraCls ? ' ' + extraCls : '') + '">' +
      '<div class="avatar" aria-hidden="true">' + esc(s.icon || '🧑‍🏫') + '</div>' +
      '<div class="bubble"><p class="bubble-who">' + esc(teacherName(s)) + '</p><div class="bubble-text">' + msgHtml + '</div></div></div>';
  }

  function progressBar(pct, text) {
    return '<span class="pbar" aria-hidden="true"><span class="pbar-fill" style="width:' + clamp(pct, 0, 100) + '%"></span></span>' +
      (text ? '<span class="pbar-text">' + esc(text) + '</span>' : '');
  }

  /* ================= 좁은 화면의 긴 수식 (§16) =================
   * 괄호·분수 안처럼 줄을 바꿀 수 없는 수식 덩어리가 글 칸보다 넓으면 칸 밖으로 삐져나오고, 화면 끝을 넘으면
   * 화면 전체가 옆으로 밀린다(휴대폰 360px 에서 예제 풀이 칸은 230px 남짓). 그런 수식만 고친다:
   *  - 조금 넓으면 그 수식의 글자를 FIT_MIN 배까지 줄여 칸에 맞춘다
   *  - 그래도 넓으면 그 수식만 한 줄로 떼어 옆으로 밀어 보게 한다(.mt-fit — 손가락으로, 또는 Tab 으로 가서 화살표로)
   * 화면을 그리거나 칸이 보이거나 바뀔 때(펼치기·채점 뒤 해설·정답 표시), 칸 너비가 바뀔 때(화면 돌리기) 다시 잰다.
   * 늘 다시 재고, 바뀐 수식만 고친다. 가운데 블록 수식(.mt-block)은 원래 옆으로 민다. */
  var FIT_MIN = 0.8;
  var fit = { queued: false, pass: 0, chain: 0 };

  function queueFit() {
    if (fit.queued) return;
    fit.queued = true;
    var run = function () {
      fit.queued = false;
      try { fitMath(); } catch (e) { report(e); }
    };
    if (window.requestAnimationFrame) window.requestAnimationFrame(run);
    else setTimeout(run, 16);
  }

  // 수식이 놓인 글 칸(블록)
  function fitBox(m) {
    for (var p = m.parentElement; p; p = p.parentElement) {
      var d = getComputedStyle(p).display;
      if (d !== 'inline' && d !== 'contents') return p;
    }
    return null;
  }

  function fitEdge(cs, side) {
    return (parseFloat(cs['padding' + side]) || 0) + (parseFloat(cs['border' + side + 'Width']) || 0);
  }

  // 수식이 쓸 수 있는 너비: 글 칸 안쪽 왼쪽 끝부터, 글 칸과 그 위 칸들 가운데 가장 먼저 끝나는 안쪽 오른쪽 끝까지
  // (사이 칸들의 오른쪽 여백만큼 덜어서). 격자·줄 상자 안의 칸(보기 단추)은 긴 수식에 밀려 넓어질 수 있어
  // 위쪽 칸(문제 카드)이 진짜 한계다. 옆으로 미는 상자(표 상자) 안이면 거기서 멈춘다 — 표는 상자째 민다
  function fitRoom(box, main) {
    var cs = getComputedStyle(box), r = box.getBoundingClientRect();
    var left = r.left + fitEdge(cs, 'Left');
    var right = r.right - fitEdge(cs, 'Right');
    var after = fitEdge(cs, 'Right') + (parseFloat(cs.marginRight) || 0);
    for (var p = box.parentElement; p && p !== main; p = p.parentElement) {
      var ps = getComputedStyle(p);
      if (ps.overflowX === 'auto' || ps.overflowX === 'scroll') break;
      right = Math.min(right, p.getBoundingClientRect().right - fitEdge(ps, 'Right') - after);
      after += fitEdge(ps, 'Right') + (parseFloat(ps.marginRight) || 0);
    }
    return right - left;
  }

  // 줄을 바꿀 수 없는 가장 넓은 덩어리 (긴 수식은 관계 기호 뒤에서 나뉜 덩어리마다, 아니면 수식 전체).
  // 줄여 둔 수식은 원래 크기로 되돌려 센다
  function fitNeed(m) {
    var parts = m.querySelectorAll('.mt-c');
    if (!parts.length) parts = [m.firstElementChild || m];
    var w = 0;
    for (var i = 0; i < parts.length; i++) w = Math.max(w, parts[i].getBoundingClientRect().width);
    return w / (m.__fitScale || 1);
  }

  function fitMath() {
    var main = doc.getElementById('main');
    if (!main) return;
    var pass = ++fit.pass;
    var all = main.querySelectorAll('.mt:not(.mt-disp)');
    var plan = [];
    for (var i = 0; i < all.length; i++) {
      var m = all[i];
      if (!m.getClientRects().length) continue; // 숨은 칸: 보일 때 잰다
      var box = fitBox(m);
      if (!box) continue;
      if (box.__fitPass !== pass) { box.__fitPass = pass; box.__fitRoom = fitRoom(box, main); }
      var room = box.__fitRoom, need = fitNeed(m);
      var mode = '', scale = 1;
      if (need > room + 0.5) {
        scale = (room - 1) / need;
        mode = scale >= FIT_MIN ? 'shrink' : 'scroll';
      }
      var was = m.__fitMode || '';
      if (mode !== was || (mode === 'shrink' && Math.abs(scale - m.__fitScale) > 0.01)) plan.push({ m: m, mode: mode, scale: scale });
    }
    // 읽기를 다 한 뒤에 고친다 (화면 계산을 한 번만)
    plan.forEach(function (x) {
      var m = x.m;
      m.classList.toggle('mt-fit', x.mode === 'scroll');
      m.style.fontSize = '';
      m.__fitScale = 1;
      if (x.mode === 'shrink') {
        m.style.fontSize = (parseFloat(getComputedStyle(m).fontSize) * x.scale).toFixed(2) + 'px';
        m.__fitScale = x.scale;
      }
      // 키보드로도 밀 수 있게 — 보기 단추(label) 안에서는 단추가 초점을 받는다
      if (x.mode === 'scroll' && !m.closest('label, button, a')) m.setAttribute('tabindex', '0');
      else m.removeAttribute('tabindex');
      m.__fitMode = x.mode;
    });
    // 고친 수식 때문에 둘레 칸이 바뀌었을 수 있다(넓어졌던 보기 단추가 줄어듦) — 바뀐 것이 없을 때까지 몇 번 더 잰다
    fit.chain = plan.length ? fit.chain + 1 : 0;
    if (plan.length && fit.chain < 4) queueFit();
  }

  /* ================= 처음: 누가 공부하나요? ================= */

  function lockMark(p) {
    return isLocked(p) ? '<span class="p-lock"><span aria-hidden="true">🔒</span><span class="sr-only">PIN 잠금</span></span>' : '';
  }

  VIEWS.start = function () {
    var list = profiles();
    var cur = store.get('current', null);
    var cards = list.map(function (p) {
      var isCur = p.id === cur;
      return '<li><button type="button" class="profile-card' + (isCur ? ' is-current' : '') + '" data-act="pick" data-id="' + esc(p.id) + '">' +
        '<span class="p-avatar" aria-hidden="true">' + esc(avatarChar(p)) + '</span>' +
        '<span class="p-text"><span class="p-name">' + esc(p.name || '이름 없는 학생') + '</span>' +
        '<span class="p-meta">' + esc(gradeLabel(p.grade)) + '</span></span>' + lockMark(p) +
        (isCur ? '<span class="p-badge">지난번</span>' : '') + '</button></li>';
    }).join('');
    return {
      title: '가정교사',
      html: bubble(TUTOR, para('다시 만나서 반가워요! 오늘은 누가 공부하나요?')) +
        '<h2 class="page-title" tabindex="-1">누가 공부하나요?</h2>' +
        '<ul class="profile-list">' + cards + '</ul>' +
        '<div class="pin-host card" hidden></div>' +
        '<p class="center-row"><a class="btn ghost" href="#/setup?new=1">＋ 새 학생 추가</a></p>',
      mount: function (page) {
        var listEl = $('.profile-list', page);
        var host = $('.pin-host', page);
        page.addEventListener('click', function (e) {
          var b = e.target.closest('[data-act="pick"]');
          if (!b) return;
          var id = b.getAttribute('data-id');
          var p = findProfile(id);
          if (!p) return;
          function enter() {
            setCurrent(id);
            var next = S.pendingRoute;
            S.pendingRoute = null;
            go(next || '#/home');
          }
          if (!needsPin(p)) { enter(); return; }
          /* PIN이 걸린 학생: 맞혀야 들어간다. 그 전에는 지금 학생을 바꾸지 않는다 */
          var panel = pinPanel(p, {
            onOk: enter,
            cancelLabel: '다른 학생 고르기',
            onCancel: function () {
              host.hidden = true;
              host.innerHTML = '';
              listEl.hidden = false;
              b.focus();
            },
            onDeleted: function () { go(profiles().length ? '#/' : '#/setup', true); },
          });
          host.innerHTML = '';
          host.appendChild(panel.el);
          host.hidden = false;
          listEl.hidden = true;
          panel.focus();
        });
      },
    };
  };

  /* PIN 확인 칸 — 학생 고르기·잠금 화면·설정이 함께 쓴다.
   * opt: { onOk(), onCancel?(), cancelLabel?, onDeleted?(), hideWho? }   PIN은 화면·저장소 어디에도 남기지 않고 해시와만 맞춰 본다 */
  function pinPanel(p, opt) {
    opt = opt || {};
    var id = nextId('pin');
    var can = !!(TS && TS.canEncrypt());
    var el = doc.createElement('div');
    el.className = 'pin-panel';
    el.innerHTML = (opt.hideWho ? '' :
      '<p class="pin-who"><span class="p-avatar" aria-hidden="true">' + esc(avatarChar(p)) + '</span>' +
      '<span class="p-name">' + esc(p.name || '이름 없는 학생') + '</span>' +
      '<span class="badge lock-badge"><span aria-hidden="true">🔒</span> PIN 잠금</span></p>') +
      (can ? '' : '<p class="notice small">이 화면에서는 PIN을 확인할 수 없어요. 인터넷 주소(https)나 파일(index.html)로 열어 주세요.</p>') +
      '<form class="pin-form" novalidate>' +
      '<label class="field-label" for="' + id + '-in">PIN (숫자 4~8자리)</label>' +
      '<input id="' + id + '-in" class="text-input pin-input" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="off"' + (can ? '' : ' disabled') + '>' +
      '<p class="form-msg pin-msg" role="alert" hidden></p>' +
      '<div class="form-actions"><button type="submit" class="btn primary"' + (can ? '' : ' disabled') + '>열기</button>' +
      (opt.onCancel ? '<button type="button" class="btn ghost" data-act="pin-cancel">' + esc(opt.cancelLabel || '취소') + '</button>' : '') + '</div></form>' +
      '<button type="button" class="btn small ghost" data-act="pin-forgot" aria-expanded="false" aria-controls="' + id + '-forgot">PIN을 잊었어요</button>' +
      '<div class="pin-forgot" id="' + id + '-forgot" hidden>' +
      '<p>PIN은 이 기기에 그대로 저장하지 않아서 알려 줄 수 없어요. 이렇게 할 수 있어요.</p>' +
      '<ul class="plain-list"><li><strong>백업에서 되살리기</strong>: 이 학생의 백업 파일과 그 암호가 있으면 설정 → ‘학습 기록 옮기기’에서 기록을 되살릴 수 있어요.</li>' +
      '<li><strong>지우고 새로 시작하기</strong>: 이 학생을 지우면 진도·오답노트·대화도 함께 지워져요.</li></ul>' +
      '<div class="form-actions"><a class="btn small" href="#/settings">설정으로 가기</a>' +
      '<button type="button" class="btn small danger" data-act="pin-delete">이 학생 지우기</button></div></div>';
    var form = $('.pin-form', el);
    var input = $('.pin-input', el);
    var msg = $('.pin-msg', el);
    var okBtn = $('button[type="submit"]', form);
    var busy = false;
    function show(t) { msg.textContent = t || ''; msg.hidden = !t; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy || !can) return;
      var fresh = findProfile(p.id);
      if (!fresh) { show('이 학생을 찾을 수 없어요.'); return; }
      if (!isLocked(fresh)) { S.unlocked[p.id] = true; opt.onOk(); return; } // 그새 PIN이 풀렸다
      var f = S.pinFails[p.id];
      var wait = f && f.until ? Math.ceil((f.until - Date.now()) / 1000) : 0;
      if (wait > 0) { show('여러 번 틀려서 잠깐 쉬어요. ' + wait + '초 뒤에 다시 해 보세요.'); return; }
      var pin = input.value.replace(/\s+/g, '');
      if (!/^\d{4,8}$/.test(pin)) { show('PIN은 숫자 4~8자리예요.'); input.focus(); return; }
      busy = true;
      okBtn.disabled = true;
      show('');
      TS.verifyPin(pin, fresh.lock).then(function (ok) {
        busy = false;
        okBtn.disabled = false;
        input.value = '';
        if (ok) {
          delete S.pinFails[p.id];
          S.unlocked[p.id] = true;
          announce('PIN이 맞아요.');
          opt.onOk();
          return;
        }
        var ff = S.pinFails[p.id] || (S.pinFails[p.id] = { n: 0, until: 0 });
        ff.n += 1;
        if (ff.n >= 5) {
          ff.n = 0;
          ff.until = Date.now() + 30000;
          show('PIN이 다섯 번 맞지 않았어요. 30초 뒤에 다시 해 보세요.');
        } else {
          show('PIN이 맞지 않아요. 다시 넣어 주세요.');
        }
        input.focus();
      });
    });
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]');
      if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'pin-cancel' && opt.onCancel) opt.onCancel();
      else if (act === 'pin-forgot') {
        var box = doc.getElementById(b.getAttribute('aria-controls'));
        var open = b.getAttribute('aria-expanded') !== 'true';
        b.setAttribute('aria-expanded', String(open));
        box.hidden = !open;
      } else if (act === 'pin-delete') {
        deleteProfileTwice(findProfile(p.id) || p).then(function (done) {
          if (done && opt.onDeleted) opt.onDeleted();
        });
      }
    });
    return {
      el: el,
      focus: function () { if (!input.disabled) input.focus(); },
    };
  }

  /* 잠긴 학생이 지금 학생일 때: 그 학생의 화면 대신 PIN을 묻는다 (앱을 다시 열 때도) */
  function lockView(p) {
    return {
      title: 'PIN 확인',
      cls: 'lock-page',
      focus: '.pin-input',
      html: bubble(TUTOR, para(say({
        e: 'PIN으로 잠가 둔 학생이에요. PIN을 넣으면 공부를 이어서 할 수 있어요.',
        m: 'PIN으로 잠가 둔 학생이에요. PIN을 넣으면 이어서 공부할 수 있어요.',
        h: 'PIN으로 잠가 둔 학생입니다. PIN을 넣으면 이어서 공부할 수 있습니다.',
      }))) +
        '<h2 class="page-title" tabindex="-1">PIN을 넣어 주세요</h2><div class="pin-host card"></div>',
      mount: function (page) {
        var panel = pinPanel(p, {
          onOk: function () { render(); },
          cancelLabel: '다른 학생 고르기',
          onCancel: function () { go('#/'); },
          onDeleted: function () { go(profiles().length ? '#/' : '#/setup', true); },
        });
        $('.pin-host', page).appendChild(panel.el);
      },
    };
  }

  /* 학생과 그 학생의 기록(p.<id>.*)만 지운다 — 다른 학생 기록은 그대로 */
  function deleteProfile(id) {
    removePrefix('p.' + id + '.');
    var rest = profiles().filter(function (x) { return x.id !== id; });
    store.set('profiles', rest);
    delete S.unlocked[id];
    delete S.pinFails[id];
    if (store.get('current', null) === id) {
      store.remove('current');
      S.profile = null;
      S.quiz = null;
      S.review = null;
      S.chats = {};
    }
    return rest;
  }
  /* PIN을 잊었을 때 등: 두 번 확인하고 지운다 */
  function deleteProfileTwice(p) {
    var name = p.name || '이름 없는 학생';
    return confirmBox({
      title: '이 학생을 지울까요?',
      body: '‘' + name + '’ 학생과 그 학생의 진도·오답노트·대화가 이 기기에서 모두 지워져요.',
      ok: '지우기', danger: true,
    }).then(function (yes) {
      return yes ? confirmBox({
        title: '정말 지울까요?',
        body: '지우면 되돌릴 수 없어요. 백업 파일이 없다면 기록을 되살릴 수 없어요.',
        ok: '정말 지우기', danger: true,
      }) : false;
    }).then(function (yes) {
      if (!yes) return false;
      deleteProfile(p.id);
      announce('학생을 지웠어요.');
      return true;
    });
  }

  /* ================= 설정(학교급 → 학년 → 별명) ================= */

  function setupSteps(step) {
    var names = ['학교급', '학년', '나에 대해'];
    return '<ol class="steps-bar" aria-label="시작하기 단계">' + names.map(function (n, i) {
      var k = i + 1;
      return '<li class="' + (k < step ? 'done' : k === step ? 'now' : '') + '"' + (k === step ? ' aria-current="step"' : '') + '>' +
        '<span class="st-num" aria-hidden="true">' + (k < step ? '✔' : k) + '</span><span>' + n + '</span></li>';
    }).join('') + '</ol>';
  }

  VIEWS.setup = function (r) {
    var levels = cat().levels || [];
    var lvId = r.parts[1];
    var gId = r.parts[2];
    var change = r.query.change === '1' && !!S.profile;
    var q = change ? '?change=1' : (r.query['new'] === '1' ? '?new=1' : '');
    var hello = change ? '몇 학년 공부를 할까요? 학교급과 학년을 다시 골라 주세요.' :
      '안녕하세요! 저는 혼자 공부하는 여러분을 돕는 가정교사예요. 먼저 학교급과 학년을 알려 주세요.';
    var base = {
      title: change ? '학년 바꾸기' : '시작하기',
      back: change ? '#/home' : (profiles().length ? '#/' : null),
    };

    if (!lvId) {
      base.html = bubble(TUTOR, para(hello)) + (change ? '' : setupSteps(1)) +
        '<h2 class="page-title" tabindex="-1">학교급을 골라 주세요</h2>' +
        '<ul class="level-grid">' + levels.map(function (L) {
          return '<li><a class="level-card lv-' + esc(L.id) + '" href="#/setup/' + encodeURIComponent(L.id) + q + '">' +
            '<span class="lv-icon" aria-hidden="true">' + (LEVEL_ICON[L.id] || '📚') + '</span>' +
            '<span class="lv-name">' + esc(L.name) + '</span>' +
            '<span class="lv-desc">' + esc(LEVEL_DESC[L.id] || ((L.grades || []).length + '개 학년')) + '</span></a></li>';
        }).join('') + '</ul>';
      return base;
    }

    var L = Tutor.level(lvId);
    if (!L) return { redirect: '#/setup' + q };
    var grades = L.grades || [];
    if (!gId) {
      if (grades.length === 1) return { redirect: '#/setup/' + L.id + '/' + grades[0].id + q };
      base.back = '#/setup' + q;
      base.html = (change ? '' : setupSteps(2)) +
        '<h2 class="page-title" tabindex="-1">' + esc(L.name) + ' 몇 학년인가요?</h2>' +
        '<ul class="grade-grid">' + grades.map(function (G) {
          var has = Tutor.coursesFor(G.id).some(function (c) { return !courseSoon(c); });
          return '<li><a class="grade-btn" href="#/setup/' + encodeURIComponent(L.id) + '/' + encodeURIComponent(G.id) + q + '">' +
            '<span class="g-name">' + esc(G.name) + '</span>' + (has ? '' : '<span class="g-note">준비 중</span>') + '</a></li>';
        }).join('') + '</ul>' +
        '<p class="center-row"><a class="link" href="#/setup' + q + '">학교급 다시 고르기</a></p>';
      return base;
    }

    var G = null;
    grades.forEach(function (g) { if (g.id === gId) G = g; });
    if (!G) return { redirect: '#/setup/' + L.id + q };

    if (change) {
      var list = profiles();
      // gradeAt: 학년을 정한 때 — 새 학년 안내가 이번 학년도에는 다시 묻지 않게(§14)
      list.forEach(function (p) { if (p.id === S.profile.id) { p.level = L.id; p.grade = G.id; p.gradeAt = Date.now(); delete p.gradeAsk; } });
      store.set('profiles', list);
      S.profile = currentProfile();
      S.quiz = null;
      announce(gradeLabel(G.id) + josa(gradeLabel(G.id), '으로/로') + ' 바꿨어요.');
      return { redirect: '#/home' };
    }

    base.back = grades.length > 1 ? '#/setup/' + L.id + q : '#/setup' + q;
    base.html = setupSteps(3) +
      '<h2 class="page-title" tabindex="-1">어떻게 불러 드릴까요?</h2>' +
      '<form class="nick-form card" id="nickForm" novalidate>' +
      '<p class="nick-chosen">' + esc(gradeLabel(G.id)) + ' <a class="link small" href="#/setup' + q + '">바꾸기</a></p>' +
      '<label class="field-label" for="nick">별명 <span class="opt">(선택)</span></label>' +
      '<input id="nick" class="text-input" type="text" maxlength="12" autocomplete="off" placeholder="예: 별빛, 민수" aria-describedby="nickHelp">' +
      '<p class="help" id="nickHelp">비워 두어도 괜찮아요. 이 기기에만 저장되고 어디에도 보내지 않아요. 실제 이름 대신 별명을 써도 좋아요.</p>' +
      '<fieldset class="pick-set"><legend class="field-label">나를 나타낼 동물</legend>' + avatarRadios('avatar', nextAvatar()) + '</fieldset>' +
      '<fieldset class="pick-set"><legend class="field-label">공부 수준</legend>' + paceRadios('pace', 'normal') +
      '<p class="help">언제든 설정에서 바꿀 수 있어요.</p></fieldset>' +
      '<button type="submit" class="btn primary big wide">시작하기</button></form>';
    base.mount = function (page) {
      $('#nickForm', page).addEventListener('submit', function (e) {
        e.preventDefault();
        var form = e.currentTarget;
        var name = $('#nick', page).value.replace(/\s+/g, ' ').trim().slice(0, 12);
        var p = {
          id: newProfileId(), name: name, avatar: radioVal(form, 'avatar') || nextAvatar(),
          level: L.id, grade: G.id, pace: radioVal(form, 'pace') || 'normal', created: Date.now(), gradeAt: Date.now(),
        };
        var list = profiles();
        list.push(p);
        store.set('profiles', list);
        setCurrent(p.id);
        var next = S.pendingRoute;
        S.pendingRoute = null;
        go(next || '#/home', true);
      });
    };
    return base;
  };

  /* ================= 과목 화면 (선생님 카드) ================= */

  function teacherGrid(courses, prog) {
    /* 공부할 수 있는 과정을 먼저, 단원이 모두 준비 중인 과정은 뒤에 (그 안에서는 카탈로그 순서) */
    var list = courses.filter(function (c) { return !courseSoon(c); }).concat(courses.filter(courseSoon));
    return '<ul class="teacher-grid">' + list.map(function (c) {
      var s = subjectOf(c.subject);
      var cp = courseProgress(c, prog);
      var soon = courseSoon(c);
      var later = cp.total - readyUnits(c).length;
      var bar = soon ? '<span class="pbar-text">단원 ' + cp.total + '개를 만들고 있어요</span>' :
        progressBar(cp.pct, '진도 ' + cp.pct + '% · 단원 ' + cp.total + '개' + (later ? ' (준비 중 ' + later + '개)' : ''));
      return '<li><a class="teacher-card ' + subjClass(s.id) + (soon ? ' is-soon' : '') + '" href="#/course/' + encodeURIComponent(c.id) + '" data-course="' + esc(c.id) + '">' +
        '<span class="t-icon" aria-hidden="true">' + esc(s.icon || '📘') + '</span>' +
        '<span class="t-body"><span class="t-teacher">' + esc(teacherName(s)) + '</span>' +
        '<span class="t-course">' + esc(c.title) + (soon ? ' <span class="badge soon-badge">준비 중</span>' : '') + '</span>' +
        '<span class="t-progress">' + bar + '</span></span>' +
        '<span class="t-go" aria-hidden="true">›</span></a></li>';
    }).join('') + '</ul>';
  }

  /* ---- 새 학년 안내 (§14) ---- 한국 학년도는 3월 1일에 시작한다(js/impact.js schoolYear).
   * 학년을 정한 때(gradeAt, 없으면 만든 날)의 학년도가 지금보다 앞이면 "새 학년이 되었나요?" — 그대로 두면 그 학년도에는 다시 묻지 않는다(gradeAsk). */
  var GRADE_FLOOR = new Date(2026, 2, 1).getTime(); // 이보다 앞선 시각은 알 수 없는 값으로 본다(가정교사가 나오기 전 — 시험용 가짜 프로필 등)
  function gradeUpInfo(p) {
    if (!p || !TI || typeof TI.schoolYear !== 'function' || !Array.isArray(TI.ORDER)) return null;
    var i = TI.ORDER.indexOf(p.grade);
    if (i < 0) return null; // 대학교·성인
    var setAt = typeof p.gradeAt === 'number' && isFinite(p.gradeAt) ? p.gradeAt : p.created;
    if (typeof setAt !== 'number' || !isFinite(setAt) || setAt < GRADE_FLOOR) return null;
    var nowYear = TI.schoolYear(todayStr());
    if (TI.schoolYear(todayStr(new Date(setAt))) >= nowYear || p.gradeAsk === nowYear) return null;
    return { year: nowYear, next: TI.ORDER[i + 1] || null };
  }
  function gradeUpHtml(p, info) {
    var cur = gradeLabel(p.grade);
    var nx = info.next ? gradeLabel(info.next) : '';
    return '<section class="grade-up card" aria-labelledby="gradeUpT"><h3 id="gradeUpT"><span aria-hidden="true">🌸</span> 새 학년이 되었나요?</h3>' +
      '<p>' + esc(say({
        e: info.year + '학년도가 시작됐어요. 지금 학년은 ‘' + cur + '’' + josa(cur, '으로/로') + ' 되어 있어요.',
        m: info.year + '학년도가 시작됐어요. 지금 학년은 ‘' + cur + '’' + josa(cur, '으로/로') + ' 되어 있어요.',
        h: info.year + '학년도가 시작되었습니다. 지금 학년은 ‘' + cur + '’' + josa(cur, '으로/로') + ' 되어 있습니다.',
      })) + '</p>' +
      (info.next ? '' : '<p>' + esc(say({ m: '고등학교를 마쳤다면 ‘다른 학년 고르기’에서 대학교(교양·기초)나 성인을 고를 수 있어요.',
        h: '고등학교를 마쳤다면 ‘다른 학년 고르기’에서 대학교(교양·기초)나 성인을 고를 수 있습니다.' })) + '</p>') +
      '<div class="form-actions">' +
      (info.next ? '<button type="button" class="btn primary" data-act="grade-up" data-g="' + esc(info.next) + '">' + esc(nx + josa(nx, '으로/로') + ' 올리기') + '</button>' : '') +
      '<button type="button" class="btn ghost" data-act="grade-keep">그대로 두기</button>' +
      '<a class="btn ghost" href="#/setup?change=1">다른 학년 고르기</a></div>' +
      '<p class="muted small">학년이 맞아야 교육과정이 바뀔 때 알맞게 알려 줄 수 있어요.</p></section>';
  }

  VIEWS.home = function (r) {
    var p = S.profile;
    var gi = gradeInfo(p.grade);
    var prog = progressAll();
    var all = r.query.all === '1';
    var addr = addressee();
    var hello = say({
      e: (addr ? addr + ', ' : '') + '안녕하세요! 오늘은 어떤 과목을 공부해 볼까요? 선생님을 골라 보세요.',
      m: (addr ? addr + ', ' : '') + '안녕하세요! 오늘은 어떤 과목을 공부할까요?',
      h: (addr ? addr + ', ' : '') + '안녕하세요. 오늘 공부할 과목을 고르세요.',
    });
    var html = bubble(TUTOR, para(hello));

    if (!gi) {
      html += '<div class="state-box"><p>학년 정보를 찾을 수 없어요.</p><a class="btn primary" href="#/setup?change=1">학년 다시 고르기</a></div>';
      return { title: '가정교사', tab: 'home', html: html };
    }

    var up = all ? null : gradeUpInfo(p);
    if (up) html += gradeUpHtml(p, up);

    /* 이어서 공부하기: 최근에 연 단원 중 지금 열 수 있는 것 (준비 중으로 바뀐 단원은 건너뛴다) */
    var rec = recentList().filter(function (id) { var m0 = Tutor.unitMeta(id); return m0 && !isSoon(m0.unit); })[0];
    var meta = rec ? Tutor.unitMeta(rec) : null;
    if (meta && !all) {
      var rs = subjectOf(meta.course.subject);
      /* 어디부터 이어지는지(§17): 안 본 첫 개념 카드 — 다 봤으면 문제 풀기로 */
      var rp = unitProg(progressAll(), rec);
      var where = '#/unit/' + encodeURIComponent(rec) + '/learn';
      var nextText = '';
      if (rp.cards) {
        var nk = 0;
        while (nk < rp.cards && rp.seen.indexOf(nk) >= 0) nk++;
        if (nk >= rp.cards) {
          nextText = '개념 카드 다 봄 · 문제 풀기';
          where = '#/unit/' + encodeURIComponent(rec) + '/practice';
        } else if (nk > 0) {
          nextText = '개념 ' + (nk + 1) + '/' + rp.cards + '부터';
        }
      }
      html += '<a class="continue-card ' + subjClass(rs.id) + '" href="' + where + '">' +
        '<span class="cc-icon" aria-hidden="true">▶</span><span class="cc-text"><span class="cc-label">이어서 공부하기</span>' +
        '<span class="cc-unit">' + esc(E.plain(meta.unit.title)) + '</span><span class="cc-course">' + esc(rs.icon || '') + ' ' + esc(meta.course.title) + '</span>' +
        (nextText ? '<span class="cc-next">' + esc(nextText) + '</span>' : '') + '</span></a>';
    }

    /* 풀다 만 예상문제(§15) */
    if (!all) html += quizResumeCardHtml();

    /* 오늘의 복습: 다음 복습 날이 된 오답이 있으면 (§10) */
    var dueN = all ? 0 : reviewDue().length;
    if (dueN) {
      html += '<a class="review-card" href="#/review"><span class="rc-icon" aria-hidden="true">📅</span>' +
        '<span class="rc-text"><span class="rc-label">오늘의 복습</span><span class="rc-sub">' + esc(say({
          e: '틀렸던 문제를 다시 풀어 봐요!', m: '틀렸던 문제를 다시 풀어 볼까요?', h: '틀렸던 문제를 다시 풀어 봅시다.',
        })) + '</span></span><span class="rc-count">' + dueN + '문제</span></a>';
    }

    if (!all) {
      var courses = Tutor.coursesFor(p.grade);
      html += '<h2 class="page-title" tabindex="-1">' + esc(gradeLabel(p.grade)) + ' 과목</h2>';
      html += courses.length ? teacherGrid(courses, prog) :
        '<div class="state-box"><p>이 학년의 과목은 아직 준비 중이에요. 다른 학년 과목을 먼저 살펴보세요.</p></div>';
    } else {
      html += '<h2 class="page-title" tabindex="-1">' + esc(gi.level.name) + ' 전체 과목</h2>';
      var shown = {};
      (gi.level.grades || []).forEach(function (g) {
        var cs = Tutor.coursesFor(g.id).filter(function (c) { return !shown[c.id]; });
        cs.forEach(function (c) { shown[c.id] = true; });
        if (cs.length) html += '<h3 class="group-title">' + esc(gradeLabel(g.id)) + '</h3>' + teacherGrid(cs, prog);
      });
      if (!Object.keys(shown).length) html += '<div class="state-box"><p>아직 준비된 과목이 없어요.</p></div>';
    }
    html += '<div class="link-row">' +
      (all ? '<a class="btn ghost" href="#/home">내 학년 과목만 보기</a>' : '<a class="btn ghost" href="#/home?all=1">다른 학년 과목도 보기</a>') +
      '<a class="btn ghost" href="#/setup/' + encodeURIComponent(gi.level.id) + '?change=1">학년 바꾸기</a></div>';
    if (!storageOk()) {
      html += '<p class="notice">이 브라우저에서는 기록을 저장할 수 없어요. 창을 닫으면 진도가 지워져요.</p>';
    }
    return {
      title: '가정교사', tab: 'home', back: all ? '#/home' : null, html: html,
      mount: function (page) {
        /* 새 학년 안내 (§14) */
        page.addEventListener('click', function (e) {
          var b = e.target.closest('[data-act="grade-up"], [data-act="grade-keep"]');
          var me = S.profile;
          if (!b || !me) return;
          if (b.getAttribute('data-act') === 'grade-up') {
            var g = b.getAttribute('data-g');
            var ng = gradeInfo(g);
            if (!ng) return;
            updateProfile(me.id, function (x) { x.grade = g; x.level = ng.level.id; x.gradeAt = Date.now(); delete x.gradeAsk; });
            S.quiz = null;
            S.review = null;
            announce(gradeLabel(g) + josa(gradeLabel(g), '으로/로') + ' 바꿨어요.');
            render();
          } else {
            var info = gradeUpInfo(me);
            if (info) updateProfile(me.id, function (x) { x.gradeAsk = info.year; });
            var box = b.closest('.grade-up');
            if (box && box.parentNode) box.parentNode.removeChild(box);
            announce('이번 학년도에는 다시 묻지 않을게요.');
            var t = $('.page-title', page);
            if (t) t.focus();
          }
        });
      },
    };
  };

  /* ================= 과정 화면 ================= */

  function countLevelFields(defN, defLv) {
    var ns = [5, 10, 20];
    var lvs = [['1', '기본'], ['2', '실력'], ['mix', '섞어서']];
    return '<fieldset class="seg"><legend>문제 수</legend><div class="seg-row">' + ns.map(function (n) {
      return '<label class="seg-opt"><input type="radio" name="n" value="' + n + '"' + (n === defN ? ' checked' : '') + '><span>' + n + '문제</span></label>';
    }).join('') + '</div></fieldset>' +
      '<fieldset class="seg"><legend>난이도</legend><div class="seg-row">' + lvs.map(function (l) {
        return '<label class="seg-opt"><input type="radio" name="lv" value="' + l[0] + '"' + (l[0] === defLv ? ' checked' : '') + '><span>' + l[1] + '</span></label>';
      }).join('') + '</div></fieldset>';
  }
  function radioVal(form, name) {
    var c = form.querySelector('input[name="' + name + '"]:checked');
    return c ? c.value : null;
  }

  function continueUnit(c, prog) {
    var units = readyUnits(c); // 준비 중 단원은 건너뛴다
    var rec = recentList();
    for (var i = 0; i < rec.length; i++) {
      for (var j = 0; j < units.length; j++) if (units[j].id === rec[i]) return units[j];
    }
    for (var k = 0; k < units.length; k++) {
      if (unitStatus(unitProg(prog, units[k].id)).key !== 'done') return units[k];
    }
    return units[0] || null;
  }

  /* ---- 교육과정 소식 (카탈로그 notices) ----
   * 국가교육위원회가 교육과정을 고치면 scripts/curriculum-watch.js 가 고시문을 자동으로 읽어 curriculum/notices.json 에 적고,
   * build-catalog 가 카탈로그에 싣는다(사람·AI 없이 매주 GitHub Actions). 화면은 이 과정의 과목·학년이 바뀐 고시만 골라
   * 이 학생 학년(없으면 과정 학년)의 시행일과 함께 알려 준다. 날짜는 이 기기의 오늘 날짜로 "바뀌어요/바뀌었어요"를 고른다. */
  function todayIso() {
    var d = new Date();
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }
  function koDate(iso, withDay) {
    var p = String(iso || '').split('-');
    if (p.length < 3) return String(iso || '');
    return Number(p[0]) + '년 ' + Number(p[1]) + '월' + (withDay || Number(p[2]) !== 1 ? ' ' + Number(p[2]) + '일' : '');
  }
  /* 별책 성취기준 비교 결과(카탈로그 parts[].status · changes — curriculum-watch 가 매주 자동으로):
   *   scheduled·active(예전 applied): 공식 원문과 비교해 바뀐 성취기준을 새 판으로 기록 — 학생에게는 그 학년의 시행 학년도부터(js/impact.js)
   *   unchanged: 성취기준 문장 변화 없음 / manual: 자동으로 확실히 반영할 수 없어 기존 자료를 그대로 둠 → "교육과정 변경 감지 - 수동 확인 필요" */
  var MANUAL_LABEL = '교육과정 변경 감지 - 수동 확인 필요';
  function isVerified(s) { return s === 'scheduled' || s === 'active' || s === 'applied'; }
  // 이 과정에 닿는 변화(확인된 판인데 이 과정 변화가 없으면 이 과정에는 unchanged)
  function partFor(p, c) {
    var ok = isVerified(p.status);
    var changes = ok && Array.isArray(p.changes) ?
      p.changes.filter(function (x) { return isObj(x) && Array.isArray(x.courses) && x.courses.indexOf(c.id) >= 0; }) : [];
    var status = ok ? (changes.length ? 'applied' : 'unchanged') : (p.status || 'pending');
    return { p: p, status: status, changes: changes };
  }
  // 변화가 닿는지 셀 학생 학년: 학생이 있으면 그 학년, 없으면 이 과정 첫 학년에 있는 학생으로 본다
  function impactGrade(c) {
    if (S.profile && TI && TI.ORDER.indexOf(S.profile.grade) >= 0) return S.profile.grade;
    return (c && c.grades && c.grades[0]) || '';
  }
  // 지금 바뀐 성취기준으로 배우고 있는 단원 → { 단원 id: true } ('개정 반영 중' 표시)
  function changedNowUnits(c) {
    var out = {};
    if (!TI || !c) return out;
    (c.units || []).forEach(function (u) {
      TI.forUnit(cat(), u.id, c, impactGrade(c), todayIso()).forEach(function (x) { if (x.hit && x.hit.now) out[u.id] = true; });
    });
    return out;
  }
  function changeItemHtml(x, linkUnits) {
    var units = linkUnits && Array.isArray(x.units) ? x.units.map(function (id) {
      var m = Tutor.unitMeta(id);
      return m && !isSoon(m.unit) ? '<a href="#/unit/' + encodeURIComponent(id) + '/learn">' + esc(E.plain(m.unit.title)) + '</a>' : '';
    }).filter(Boolean) : [];
    var body = x.k === 'chg' ? '<span class="chg-to">' + esc(x.to) + '</span><span class="chg-from">(바뀌기 전: ' + esc(x.from) + ')</span>' :
      x.k === 'add' ? '<span class="chg-tag">새로 생김</span> ' + esc(x.text) : '<span class="chg-tag">빠짐</span> <span class="chg-from">' + esc(x.text) + '</span>';
    return '<li><span class="chg-code">' + esc(x.code) + '</span> ' + body + (units.length ? '<span class="chg-units">관련 단원: ' + units.join(', ') + '</span>' : '') + '</li>';
  }
  function partStatusHtml(fp) {
    if (fp.status === 'manual') {
      return '<p class="cur-status is-manual"><span class="badge cur-manual">' + esc(MANUAL_LABEL) + '</span> ' + esc(say({
        e: '바뀐 내용을 아직 확실하게 확인하지 못해서, 예전 교육과정 그대로 두었어요. 학교 수업과 다르면 학교 선생님 말씀을 따라요.',
        m: '바뀐 내용을 아직 확실하게 확인하지 못해서 기존 교육과정 그대로 두었어요. 학교 수업과 다르면 학교 선생님 말씀을 따라 주세요.',
        h: '바뀐 내용을 자동으로 확실하게 확인하지 못해 기존 교육과정 자료를 그대로 두었습니다. 학교 수업과 다른 점은 학교 선생님의 안내를 따르십시오.' })) + '</p>';
    }
    if (fp.status === 'applied') {
      return '<p class="cur-status is-applied"><span aria-hidden="true">✅</span> ' + esc(say({
        e: '바뀐 성취기준(배울 내용 목표) ' + fp.changes.length + '개를 공식 문서에서 확인했어요.',
        m: '바뀐 성취기준 ' + fp.changes.length + '개를 공식 문서에서 확인했어요.',
        h: '바뀐 성취기준 ' + fp.changes.length + '개를 공식 문서에서 확인해 반영했습니다.' })) + '</p>' +
        '<details class="cur-more cur-chg"><summary>바뀐 성취기준 보기</summary><ul class="chg-list">' +
        fp.changes.map(function (x) { return changeItemHtml(x, true); }).join('') + '</ul></details>';
    }
    if (fp.status === 'unchanged') return '<p class="cur-status">' + esc(say({ e: '이 과목의 성취기준(배울 내용 목표)은 그대로예요.', m: '이 과목의 성취기준은 그대로예요.', h: '이 과목의 성취기준 문장은 바뀌지 않았습니다.' })) + '</p>';
    return '';
  }
  function courseNotices(c) {
    var list = cat().notices;
    if (!Array.isArray(list) || !c) return [];
    var g = S.profile && (c.grades || []).indexOf(S.profile.grade) >= 0 ? S.profile.grade : null;
    var out = [];
    list.forEach(function (n) {
      if (!isObj(n) || !Array.isArray(n.parts) || !Array.isArray(n.effective)) return;
      var parts = n.parts.filter(function (p) {
        return isObj(p) && ((Array.isArray(p.courses) && p.courses.indexOf(c.id) >= 0) ||
          (Array.isArray(p.subjects) && p.subjects.indexOf(c.subject) >= 0 && !(Array.isArray(p.except) && p.except.indexOf(c.id) >= 0)));
      });
      if (!parts.length) return;
      var when = null;
      n.effective.forEach(function (e) {
        if (!isObj(e) || !Array.isArray(e.grades)) return;
        var hit = g ? e.grades.indexOf(g) >= 0 : (c.grades || []).some(function (x) { return e.grades.indexOf(x) >= 0; });
        if (hit && (!when || e.date < when)) when = e.date;
      });
      if (when) out.push({ n: n, parts: parts, when: when });
    });
    return out;
  }
  function courseNoticesHtml(c) {
    var list = courseNotices(c);
    if (!list.length) return '';
    var today = todayIso();
    var name = cat().curriculum || '교육과정';
    return '<section class="cur-news" aria-labelledby="curNewsT"><h3 class="cur-news-title" id="curNewsT"><span aria-hidden="true">📢</span> 교육과정 소식</h3><ul class="cur-list">' +
      list.map(function (x) {
        var names = x.parts.map(function (p) { return p.name; }).join(' · ');
        var line = x.when > today ?
          say({ e: koDate(x.when) + '부터 ' + names + ' 교육과정(배우는 내용)이 바뀌어요.', m: koDate(x.when) + '부터 ' + names + ' 교육과정이 바뀌어요.',
            h: koDate(x.when) + '부터 ' + names + ' 교육과정이 바뀝니다.' }) :
          say({ e: names + ' 교육과정(배우는 내용)이 조금 바뀌었어요. ' + koDate(x.when) + '부터 바뀐 교육과정으로 배워요.',
            m: names + ' 교육과정이 일부 바뀌었어요. ' + koDate(x.when) + '부터 바뀐 교육과정으로 배워요.',
            h: names + ' 교육과정이 일부 개정되었습니다. ' + koDate(x.when) + '부터 개정된 교육과정이 적용됩니다.' });
        var news = '';
        // 지금 이 과목을 배우는 학생인데 바뀐 교육과정이 닿지 않으면(시행 전에 이 학년을 마친다) 그렇다고 알려 준다
        if (TI && x.when > today && S.profile && (c.grades || []).indexOf(S.profile.grade) >= 0 && !TI.forCourse(x.n, c, S.profile.grade, today).length) {
          news += '<p class="cur-status is-before">' + esc(say({ e: '지금 학년은 바뀌기 전 교육과정으로 이 과목을 배워요.', m: '지금 학년은 바뀌기 전 교육과정으로 이 과목을 배워요.',
            h: '지금 학년은 개정 전 교육과정으로 이 과목을 배웁니다.' })) + '</p>';
        }
        x.parts.forEach(function (p) {
          news += partStatusHtml(partFor(p, c));
          (Array.isArray(p.newSubjects) ? p.newSubjects : []).forEach(function (ns) {
            var rel = (Array.isArray(p.related) ? p.related : []).map(function (id) {
              var m = Tutor.unitMeta(id);
              return m && !isSoon(m.unit) ? '<a href="#/unit/' + encodeURIComponent(id) + '/learn">' + esc(E.plain(m.unit.title)) + '</a>' : '';
            }).filter(Boolean);
            // say(): 말투 칸 e(초)·m(중)·h(고 이상) — m 이 없으면 중학생에게 h(합니다체)가 간다
            news += '<p class="cur-new"><span aria-hidden="true">🌱</span> 새로 생기는 과목: ‘' + esc(ns) + '’</p>' +
              (rel.length ? '<p class="cur-rel">' + esc(say({ e: '지금은 이 단원으로 미리 공부할 수 있어요:', m: '지금은 이 단원으로 미리 공부할 수 있어요:', h: '지금은 이 단원으로 미리 공부할 수 있습니다:' })) + ' ' + rel.join(', ') + '</p>' : '');
          });
        });
        return '<li><p class="cur-line">' + esc(line) + '</p>' + news +
          '<details class="cur-more"><summary>자세히</summary>' +
          '<p>' + esc(x.n.no + ' (' + koDate(x.n.date, true) + ')') + '</p>' +
          '<p>' + esc(say({ e: '이 사이트의 단원은 ' + name + josa(name, '을/를') + ' 바탕으로 만들었어요' + (cat().basis ? '(' + cat().basis + ')' : '') +
            '. 바뀐 내용이 확인되면 그 단원에 ‘개정 반영 중’이 붙어요. 학교 수업과 다른 점이 있으면 학교 선생님 말씀을 따라 주세요.',
          m: '이 사이트의 단원은 ' + name + josa(name, '을/를') + ' 바탕으로 만들었어요' + (cat().basis ? '(' + cat().basis + ')' : '') +
            '. 바뀐 내용이 확인되면 그 단원에 ‘개정 반영 중’이 붙어요. 학교 수업과 다른 점이 있으면 학교 선생님 말씀을 따라 주세요.',
          h: '이 사이트의 단원은 ' + name + josa(name, '을/를') + ' 바탕으로 만들었습니다' + (cat().basis ? '(' + cat().basis + ')' : '') +
            '. 바뀐 내용이 확인되면 그 단원에 ‘개정 반영 중’이 표시됩니다. 학교 수업과 다른 점은 학교 선생님의 안내를 따르십시오.' })) + '</p>' +
          (x.n.url ? '<p><a href="' + esc(x.n.url) + '" target="_blank" rel="noopener noreferrer">고시 원문 보기(국가교육위원회, 새 창)</a></p>' : '') +
          '</details></li>';
      }).join('') + '</ul></section>';
  }

  // 단원 머리: 이 단원의 성취기준이 바뀐 고시(자동 반영)가 이 학생에게 닿으면 바뀐 문장을 보여 준다
  function unitChangeNote(unitId, course) {
    if (!TI || !course) return '';
    var list = TI.forUnit(cat(), unitId, course, impactGrade(course), todayIso()).filter(function (x) { return x.hit; });
    if (!list.length) return '';
    var now = list.some(function (x) { return x.hit.now; });
    var first = list.reduce(function (a, x) { return !a || x.hit.year < a.hit.year ? x : a; }, null);
    var y = first.hit.year;
    var head = now ? say({ e: '이 단원의 성취기준(배울 내용 목표)이 바뀌었어요.', m: '이 단원의 성취기준이 바뀌었어요.', h: '이 단원의 성취기준이 개정되었습니다.' }) :
      say({ e: y + '년 3월부터 이 단원의 성취기준(배울 내용 목표)이 바뀌어요.', m: y + '년 3월부터 이 단원의 성취기준이 바뀌어요.', h: y + '년 3월부터 이 단원의 성취기준이 개정됩니다.' });
    return '<div class="notice cur-unit" role="note"><p><span aria-hidden="true">📢</span> ' + esc(head) + '</p><ul class="chg-list">' +
      list.map(function (x) { return changeItemHtml(x.change, false); }).join('') + '</ul>' +
      '<p class="muted small">' + esc(first.notice.no) + ' · ' + esc(say({ e: '단원 설명과 문제는 바뀌기 전 기준이라 조금 다를 수 있어요.',
        m: '단원 설명과 문제는 바뀌기 전 기준이라 조금 다를 수 있어요.', h: '단원 설명과 문제는 개정 전 기준이므로 일부 다를 수 있습니다.' })) + '</p></div>';
  }

  // 설정: 이 기기의 학생마다 지금 학년과 앞으로 다닐 학년에 실제로 닿는 교육과정 변경 (기기 안에서만 계산 — js/impact.js)
  function impactHtml(list) {
    if (!TI || !Array.isArray(cat().notices) || !cat().notices.length || !list.length) return '';
    var today = todayIso();
    var rows = list.map(function (p) {
      var who = '<p class="imp-name">' + esc(p.name || '이름 없는 학생') + ' <span class="p-meta">' + esc(gradeLabel(p.grade)) + '</span></p>';
      if (TI.ORDER.indexOf(p.grade) < 0) return '<li class="imp-student">' + who + '<p class="muted">초·중·고 교육과정 변경과는 관계없어요.</p></li>';
      var items = TI.forStudent(cat(), p.grade, today);
      if (!items.length) return '<li class="imp-student">' + who + '<p class="muted">지금 학년과 앞으로 다닐 학년에 닿는 교육과정 변경은 없어요.</p></li>';
      return '<li class="imp-student">' + who + '<ul class="imp-list">' + items.map(function (it) {
        var when = it.when.now ? '지금 학년(' + gradeLabel(it.when.grade, true) + ')부터' : it.when.year + '년 3월(' + gradeLabel(it.when.grade, true) + ')부터';
        var st = isVerified(it.status) ? '성취기준 ' + it.changes.length + '개 바뀜(자동 반영)' : it.status === 'manual' ? MANUAL_LABEL : '확인 중';
        var cs = it.courses.slice(0, 4).map(function (c) { return c.title; }).join(', ') + (it.courses.length > 4 ? ' 외 ' + (it.courses.length - 4) + '개' : '');
        return '<li class="imp-item is-' + esc(it.status) + '"><span class="imp-when">' + esc(when) + '</span> · ' + esc(it.part.name + ' 교육과정') +
          ' — <span class="imp-st">' + (it.status === 'manual' ? '<span class="badge cur-manual">' + esc(st) + '</span>' : esc(st)) + '</span>' +
          '<span class="imp-courses">배우게 될 과목: ' + esc(cs) + '</span><span class="imp-no">' + esc(it.notice.no) + '</span></li>';
      }).join('') + '</ul></li>';
    }).join('');
    return '<section class="set-sec card" aria-labelledby="setCurImpact"><h3 id="setCurImpact">교육과정 변경과 우리 학생</h3>' +
      '<p class="muted">학생마다 지금 학년과 앞으로 다닐 학년에 실제로 닿는 교육과정 변경만 골랐어요. 계산은 이 기기 안에서만 하고, 이름·학년·기록은 밖으로 보내지 않아요.</p>' +
      '<ul class="imp-students">' + rows + '</ul></section>';
  }

  // 설정 > 가정교사 정보: 기준 고시 뒤에 나온 교육과정 고시 전부(바뀐 별책 이름까지)
  function noticesInfoHtml() {
    var list = Array.isArray(cat().notices) ? cat().notices.filter(function (n) { return isObj(n) && n.no; }) : [];
    if (!list.length) return '';
    return '<li class="cur-info">그 뒤 바뀐 교육과정 고시(매주 자동으로 확인해요):<ul>' + list.map(function (n) {
      var vols = Array.isArray(n.volumes) ? n.volumes.join(', ') : '';
      return '<li>' + esc(n.no + ' (' + koDate(n.date, true) + ')') + (vols ? ' — ' + esc(vols) : '') +
        (n.url ? ' <a href="' + esc(n.url) + '" target="_blank" rel="noopener noreferrer">원문</a>' : '') + '</li>';
    }).join('') + '</ul></li>';
  }

  // chg: 이 학생이 지금 바뀐 성취기준으로 배우는 단원(changedNowUnits) — '개정 반영 중'을 붙인다
  function unitRow(u, i, prog, chg) {
    if (isSoon(u)) {
      /* 준비 중: 보이기만 하고 누를 수 없다 */
      return '<li><div class="unit-row is-soon" data-unit="' + esc(u.id) + '" aria-disabled="true">' +
        '<span class="u-num" aria-hidden="true">' + (i + 1) + '</span>' +
        '<span class="u-body"><span class="u-title"><span class="sr-only">' + (i + 1) + '단원 </span>' + E.inline(u.title) + '</span>' +
        (u.summary ? '<span class="u-sum">' + E.inline(u.summary) + '</span>' : '') + '</span>' +
        '<span class="u-status"><span aria-hidden="true">🚧</span> 준비 중</span></div></li>';
    }
    var p = unitProg(prog, u.id);
    var st = unitStatus(p);
    var meta = [];
    if (u.sem) meta.push(u.sem + '학기');
    if (p.cards) meta.push('개념 ' + p.seen.length + '/' + p.cards);
    if (p.solved) meta.push('문제 ' + p.solved + '개 · 정답률 ' + Math.round((100 * p.correct) / p.solved) + '%');
    return '<li><a class="unit-row status-' + st.key + '" href="#/unit/' + encodeURIComponent(u.id) + '/learn" data-unit="' + esc(u.id) + '">' +
      '<span class="u-num" aria-hidden="true">' + (i + 1) + '</span>' +
      '<span class="u-body"><span class="u-title"><span class="sr-only">' + (i + 1) + '단원 </span>' + E.inline(u.title) +
      (u.rev || (chg && chg[u.id]) ? ' <span class="badge rev-badge" title="새 교육과정에 맞춰 고치는 중">개정 반영 중</span>' : '') + '</span>' +
      (u.summary ? '<span class="u-sum">' + E.inline(u.summary) + '</span>' : '') +
      (meta.length ? '<span class="u-meta">' + esc(meta.join(' · ')) + '</span>' : '') + '</span>' +
      '<span class="u-status"><span aria-hidden="true">' + st.icon + '</span> ' + st.label + '</span></a></li>';
  }

  VIEWS.course = function (r) {
    var c = Tutor.course(r.parts[1]);
    if (!c) return viewNotFound();
    var s = subjectOf(c.subject);
    var prog = progressAll();
    var units = c.units || [];
    var tn = teacherName(s);
    var hello = say({
      e: '안녕하세요! 저는 ' + tn + josa(tn, '이에요/예요') + '. ‘' + c.title + '’' + josa(c.title, '을/를') + ' 처음부터 차근차근 같이 공부해요.',
      m: tn + josa(tn, '이에요/예요') + '. ‘' + c.title + '’' + josa(c.title, '을/를') + ' 단원 순서대로 함께 공부해요.',
      h: tn + '입니다. ‘' + c.title + '’' + josa(c.title, '을/를') + ' 단원 순서대로 함께 공부하겠습니다.',
    });
    var cont = continueUnit(c, prog);
    var ready = readyUnits(c);               // 열 수 있는 단원 (준비 중 제외)
    var later = units.length - ready.length; // 준비 중 단원 수
    var studied = ready.filter(function (u) { return isObj(prog[u.id]); });

    var html = bubble(s, para(hello) + (c.note ? '<p class="bubble-note">' + esc(c.note) + '</p>' : ''));
    html += '<h2 class="page-title" tabindex="-1">' + esc(c.title) + '</h2>';
    html += courseNoticesHtml(c);
    if (!ready.length) {
      html += '<div class="state-box soon-box"><p class="state-icon" aria-hidden="true">🚧</p><p>' + esc(say({
        e: '이 과정의 단원은 선생님이 지금 열심히 만들고 있어요. 조금만 기다려 주세요!',
        m: '이 과정의 단원은 지금 만들고 있어요. 조금만 기다려 주세요.',
        h: '이 과정의 단원은 지금 준비 중입니다. 조금만 기다려 주세요.',
      })) + '</p><a class="btn" href="#/home">다른 과목 보기</a></div>';
    }
    html += '<div class="action-row">' +
      (cont ? '<a class="btn primary big" href="#/unit/' + encodeURIComponent(cont.id) + '/learn" data-act="continue"><span>▶ 이어서 공부하기</span><span class="btn-sub">' + esc(E.plain(cont.title)) + '</span></a>' : '') +
      (ready.length ? '<button type="button" class="btn big" data-act="mix" aria-expanded="false" aria-controls="mixForm"><span>✎ 예상문제 풀기</span><span class="btn-sub">단원을 골라 섞어서</span></button>' : '') +
      '<a class="btn big" href="#/ask/' + encodeURIComponent(s.id) + '?course=' + encodeURIComponent(c.id) + '"><span>💬 선생님께 질문하기</span><span class="btn-sub">' + esc(tn) + '</span></a></div>';
    /* 예상문제는 준비된 단원에서만 낸다 */
    if (ready.length) {
      html += '<form class="mix-form card" id="mixForm" hidden novalidate>' +
        '<fieldset class="mix-units"><legend>섞을 단원</legend><div class="check-list">' + ready.map(function (u) {
          var on = studied.length ? isObj(prog[u.id]) : true;
          var meta0 = Tutor.unitMeta(u.id);
          var no = meta0 ? meta0.index + 1 : 0;
          return '<label class="check"><input type="checkbox" name="u" value="' + esc(u.id) + '"' + (on ? ' checked' : '') + '><span>' + (no ? no + '. ' : '') + E.inline(u.title) + '</span></label>';
        }).join('') + '</div><button type="button" class="btn small ghost" data-act="mix-all">모두 고르기</button></fieldset>' +
        countLevelFields(10, 'mix') +
        '<p class="form-msg" role="alert" hidden></p>' +
        '<button type="submit" class="btn primary big wide">문제 풀기 시작</button></form>';
    }
    html += '<h3 class="section-title">단원 ' + units.length + '개' + (later ? ' <span class="count">(준비 중 ' + later + '개)</span>' : '') + '</h3>';
    var chgNow = changedNowUnits(c);
    html += units.length ? '<ol class="unit-list">' + units.map(function (u, i) { return unitRow(u, i, prog, chgNow); }).join('') + '</ol>' :
      '<div class="state-box"><p>단원이 아직 준비 중이에요.</p></div>';

    return {
      title: c.title, tab: 'home', back: '#/home', subject: s.id, html: html,
      mount: function (page) {
        var form = $('#mixForm', page);
        var toggle = $('[data-act="mix"]', page);
        if (!form || !toggle) return;
        toggle.addEventListener('click', function () {
          form.hidden = !form.hidden;
          toggle.setAttribute('aria-expanded', String(!form.hidden));
          if (!form.hidden) {
            var first = $('input', form);
            if (first) first.focus();
          }
        });
        $('[data-act="mix-all"]', form).addEventListener('click', function () {
          $$('input[name="u"]', form).forEach(function (i) { i.checked = true; });
        });
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var sel = $$('input[name="u"]:checked', form).map(function (i) { return i.value; });
          var msg = $('.form-msg', form);
          if (!sel.length) {
            msg.textContent = '단원을 하나 이상 골라 주세요.';
            msg.hidden = false;
            return;
          }
          msg.hidden = true;
          var allIds = ready.map(function (u) { return u.id; });
          startQuiz(c.id, {
            units: sel.length === allIds.length ? '' : sel.join(','),
            n: radioVal(form, 'n') || 10,
            lv: radioVal(form, 'lv') || 'mix',
          });
        });
      },
    };
  };

  /* ================= 단원 화면 ================= */

  var UNIT_TABS = ['learn', 'examples', 'practice', 'advanced', 'ask'];
  var TAB_LABELS = { learn: '개념', examples: '예제', practice: '문제', advanced: '심화', ask: '질문' };

  function unitUI(id) {
    // fresh: 이번에 이 단원을 처음 여는지 — 그러면 개념 탭이 지난번에 본 다음 카드부터 보인다(§17)
    if (!S.unitUI[id]) S.unitUI[id] = { card: 0, all: false, fresh: true };
    return S.unitUI[id];
  }

  /* 준비 중인 단원을 주소로 바로 열었을 때: 오류가 아니라 친절한 안내 */
  function soonView(meta) {
    var c = meta.course;
    var s = subjectOf(c.subject);
    var ut = E.plain(meta.unit.title);
    var next = null;
    var ready = readyUnits(c);
    for (var i = 0; i < ready.length; i++) {
      var mi = Tutor.unitMeta(ready[i].id);
      if (!next) next = ready[i];
      if (mi && mi.index > meta.index) { next = ready[i]; break; }
    }
    return {
      title: ut, tab: 'home', back: '#/course/' + encodeURIComponent(c.id), subject: s.id, cls: 'soon-page',
      html: bubble(s, para(say({
        e: '‘' + ut + '’ 단원은 선생님이 지금 열심히 만들고 있어요. 조금만 기다려 주세요!',
        m: '‘' + ut + '’ 단원은 지금 만들고 있어요. 조금만 기다려 주세요.',
        h: '‘' + ut + '’ 단원은 지금 준비 중입니다. 조금만 기다려 주세요.',
      }))) +
        '<h2 class="page-title" tabindex="-1">' + E.inline(meta.unit.title) + '</h2>' +
        '<div class="state-box soon-box"><p class="state-icon" aria-hidden="true">🚧</p><p>이 단원은 준비 중이에요.</p>' +
        (meta.unit.summary ? '<p class="muted">' + E.inline(meta.unit.summary) + '</p>' : '') +
        '<div class="link-row center">' +
        (next ? '<a class="btn primary" href="#/unit/' + encodeURIComponent(next.id) + '/learn">' + esc(E.plain(next.title)) + ' 공부하기</a>' : '') +
        '<a class="btn" href="#/course/' + encodeURIComponent(c.id) + '">단원 목록 보기</a></div></div>',
    };
  }

  VIEWS.unit = function (r) {
    var unitId = r.parts[1];
    var tab = r.parts[2] || 'learn';
    if (!unitId) return { redirect: '#/home' };
    if (UNIT_TABS.indexOf(tab) < 0) return { redirect: '#/unit/' + encodeURIComponent(unitId) + '/learn' };
    var sm = Tutor.unitMeta(unitId);
    if (sm && isSoon(sm.unit)) return soonView(sm); // 파일을 부르지 않는다
    return Tutor.loadUnit(unitId).then(function (unit) {
      var meta = Tutor.unitMeta(unit.id);
      var course = meta ? meta.course : Tutor.course(unit.course);
      var s = subjectOf(course ? course.subject : '');
      pushRecent(unit.id);
      var head = '<div class="unit-head">' +
        (course ? '<p class="crumb"><a href="#/course/' + encodeURIComponent(course.id) + '">' + esc(course.title) + '</a>' + (meta ? ' · ' + (meta.index + 1) + '단원' : '') + '</p>' : '') +
        '<h2 class="page-title" tabindex="-1">' + E.inline(unit.title) + '</h2>' +
        (unit.summary ? '<p class="unit-sum">' + E.inline(unit.summary) + '</p>' : '') +
        /* 교육과정이 바뀐 뒤 아직 새 성취기준으로 다시 쓰지 않은 단원(카탈로그 rev — build-catalog 가 붙인다) */
        (meta && meta.unit && meta.unit.rev ? '<p class="notice rev-note" role="note"><span aria-hidden="true">🔄</span> ' +
          esc(say({ e: '새 교육과정에 맞춰 이 단원을 고치고 있어요. 공부는 그대로 할 수 있지만, 학교에서 배우는 내용과 조금 다를 수 있어요.',
            m: '새 교육과정에 맞춰 이 단원을 고치고 있어요. 공부는 그대로 할 수 있지만, 학교에서 배우는 내용과 조금 다를 수 있어요.',
            h: '새 교육과정에 맞춰 이 단원을 고치는 중입니다. 공부는 그대로 할 수 있지만, 학교에서 배우는 내용과 조금 다를 수 있습니다.' })) + '</p>' : '') +
        unitChangeNote(unit.id, course) +
        '</div>' +
        '<nav class="unit-tabs" aria-label="단원 메뉴">' + UNIT_TABS.map(function (t) {
          return '<a href="#/unit/' + encodeURIComponent(unit.id) + '/' + t + '" data-tab="' + t + '"' + (t === tab ? ' aria-current="page"' : '') + '>' + TAB_LABELS[t] + '</a>';
        }).join('') + '</nav>';
      var panel = TAB_VIEWS[tab](unit, course, s, r);
      return {
        title: E.plain(unit.title),
        tab: 'home',
        back: course ? '#/course/' + encodeURIComponent(course.id) : '#/home',
        subject: s.id,
        cls: 'unit-page tab-' + tab,
        html: head + '<div class="tab-panel" id="tabPanel">' + panel.html + '</div>',
        mount: panel.mount,
      };
    });
  };

  var TAB_VIEWS = {};

  /* --- 개념 --- */
  TAB_VIEWS.learn = function (unit, course, s, r) {
    var concepts = Array.isArray(unit.concepts) ? unit.concepts : [];
    var n = concepts.length;
    var ui = unitUI(unit.id);
    var resumed = false;
    if (r.query.card !== undefined) {
      ui.card = clamp(parseInt(r.query.card, 10) || 0, 0, Math.max(0, n - 1));
      ui.all = false;
    } else if (ui.fresh && n > 1) {
      /* 이어서 보기(§17): 이 단원을 이번에 처음 열면, 지난번에 본 카드 다음 — 아직 안 본 첫 카드부터 */
      var seenBefore = unitProg(progressAll(), unit.id).seen;
      var next = 0;
      while (next < n && seenBefore.indexOf(next) >= 0) next++;
      if (next > 0 && next < n) { ui.card = next; resumed = true; }
    }
    ui.fresh = false;
    ui.card = clamp(ui.card, 0, Math.max(0, n - 1));
    var first = n ? E.plain(concepts[0].title) : '';
    var ut = E.plain(unit.title);
    var from = resumed ? E.plain(concepts[ui.card].title) : '';
    var intro = resumed ? say({
      e: '‘' + ut + '’ 공부를 이어서 해요. 지난번에 본 다음인 ‘' + from + '’부터 볼까요?',
      m: '‘' + ut + '’ 공부를 이어서 해요. 지난번에 본 다음인 ‘' + from + '’부터 볼까요?',
      h: '‘' + ut + '’ 공부를 이어서 합니다. 지난번에 본 다음인 ‘' + from + '’부터 살펴보겠습니다.',
    }) : say({
      e: '오늘은 ‘' + ut + '’' + josa(ut, '을/를') + ' 배워요.' + (first ? ' 먼저 ‘' + first + '’부터 알아볼까요?' : ''),
      m: '오늘은 ‘' + ut + '’' + josa(ut, '을/를') + ' 배워요.' + (first ? ' 먼저 ‘' + first + '’부터 알아볼까요?' : ''),
      h: '이번 시간에는 ‘' + ut + '’' + josa(ut, '을/를') + ' 공부합니다.' + (first ? ' 먼저 ‘' + first + '’부터 살펴보겠습니다.' : ''),
    });

    /* 개념 설명 → 이해 확인 (§7.4). 기초 다지기 학생에게는 쉬운 설명(easy)을 먼저 보여 준다 */
    var easyFirst = paceOf(S.profile) === 'easy';
    var checked = unitProg(progressAll(), unit.id).checked;
    var cards = concepts.map(function (c, i) {
      var body = '<div class="rich cc-body">' + E.render(c.body) + '</div>' + E.fig(c.fig);
      var easyHtml = '';
      if (c.easy && easyFirst) {
        easyHtml = '<div class="easy-box easy-first"><p class="easy-label">쉽게 먼저 볼까요?</p><div class="rich">' + E.render(c.easy) + '</div></div>' +
          '<p class="cc-sub">교과서처럼 말하면</p>';
      } else if (c.easy) {
        easyHtml = '<div class="easy"><button type="button" class="btn soft" data-act="easy" aria-expanded="false" aria-controls="easy-' + i + '">' +
          '<span aria-hidden="true">🙂</span> 더 쉽게 설명해 주세요</button>' +
          '<div class="easy-box" id="easy-' + i + '" hidden><p class="easy-label">더 쉽게 말하면</p><div class="rich">' + E.render(c.easy) + '</div></div></div>';
      }
      var check = isObj(c.check) && c.check.type ?
        '<section class="check-box" aria-labelledby="chk-' + i + '"><h4 class="check-title" id="chk-' + i + '"><span aria-hidden="true">✅</span> 이해 확인' +
        '<span class="badge ok-badge"' + (checked.indexOf(i) >= 0 ? '' : ' hidden') + '>확인함 ✔</span></h4>' +
        '<p class="check-sub">' + esc(say({ e: '방금 읽은 내용을 잘 알았는지 풀어 봐요.', m: '방금 읽은 내용을 확인해 봐요.', h: '방금 읽은 내용을 확인해 봅시다.' })) + '</p>' +
        '<div class="check-host" data-i="' + i + '"></div></section>' : '';
      /* 읽어 주기(§13): 제목 → (기초 다지기면 쉬운 설명) → 본문 */
      var sb = speakBtn(function () { return [c.title, easyFirst && c.easy ? c.easy : '', c.body].filter(Boolean).join('\n\n'); });
      return '<article class="concept-card' + (easyFirst && c.easy ? ' is-easy-first' : '') + '" id="cc-' + i + '" data-i="' + i + '" aria-labelledby="cct-' + i + '">' +
        '<p class="cc-step">개념 ' + (i + 1) + ' / ' + n + '</p>' +
        '<h3 class="cc-title" id="cct-' + i + '" tabindex="-1">' + E.inline(c.title) + '</h3>' +
        (sb ? '<div class="cc-tools">' + sb + '</div>' : '') +
        (easyFirst && c.easy ? easyHtml + body : body + easyHtml) + check +
        '<div class="report-host" data-i="' + i + '"></div></article>';
    }).join('');

    var dots = concepts.map(function (c, i) {
      return '<button type="button" class="dot" data-go="' + i + '" aria-label="' + (i + 1) + '번째 카드: ' + esc(E.plain(c.title)) + '"></button>';
    }).join('');

    var goals = (unit.goals || []).length ? '<section class="side-box goals"><h3>학습 목표</h3><ul>' + unit.goals.map(function (g) {
      return '<li>' + E.inline(g) + '</li>';
    }).join('') + '</ul></section>' : '';
    var terms = (unit.terms || []).length ? '<section class="side-box terms" id="terms"><h3>핵심 용어</h3><dl class="term-list">' + unit.terms.map(function (t, i) {
      return '<div class="term" id="term-' + i + '"><dt>' + E.inline(t.term) + '</dt><dd class="rich">' + E.render(t.def) + '</dd></div>';
    }).join('') + '</dl></section>' : '';
    var vocab = (unit.vocab || []).length ? '<section class="side-box vocab" id="vocab"><h3>낱말 ' + unit.vocab.length + '개</h3><ul class="vocab-list">' + unit.vocab.map(function (v) {
      return '<li><p class="v-head"><span class="v-w" lang="en">' + esc(v.w) + '</span><span class="v-m">' + esc(v.m) + '</span></p>' +
        (v.ex ? '<p class="v-ex" lang="en">' + esc(v.ex) + '</p>' : '') + (v.exm ? '<p class="v-exm">' + esc(v.exm) + '</p>' : '') + '</li>';
    }).join('') + '</ul></section>' : '';

    var html = '<div class="learn-layout"><div class="learn-main">' + bubble(s, para(intro));
    if (n) {
      html += '<section class="concepts" aria-label="개념 카드">' +
        '<div class="cv-bar"><p class="cv-count" id="cvCount" aria-live="polite"></p>' +
        '<button type="button" class="btn small ghost" data-act="all" aria-pressed="false">모두 펼쳐 보기</button></div>' +
        (resumed ? '<p class="notice small resume-note" id="cvResume" role="status">지난번에 본 다음 카드부터 보여 드려요. ' +
          '<button type="button" class="btn small ghost" data-act="first">처음부터 보기</button></p>' : '') +
        '<div class="cv-cards">' + cards + '</div>' +
        '<div class="cv-nav" id="cvNav"><button type="button" class="btn" data-act="prev">‹ 이전</button>' +
        '<div class="dots" role="group" aria-label="카드 고르기">' + dots + '</div>' +
        '<button type="button" class="btn primary" data-act="next">다음 ›</button></div>' +
        '<div class="cv-done" id="cvDone" hidden><p>' + esc(say({ e: '개념 카드를 모두 봤어요! 이제 예제를 같이 풀어 볼까요?', m: '개념 카드를 모두 봤어요. 이제 예제를 풀어 볼까요?', h: '개념 카드를 모두 보았습니다. 이제 예제를 풀어 봅시다.' })) + '</p>' +
        '<div class="action-row"><a class="btn primary" href="#/unit/' + encodeURIComponent(unit.id) + '/examples">예제 보기</a>' +
        '<a class="btn" href="#/unit/' + encodeURIComponent(unit.id) + '/practice">문제 풀기</a></div></div>' +
        '</section>';
    } else {
      html += '<div class="state-box"><p>이 단원의 개념 카드는 아직 준비 중이에요.</p></div>';
    }
    html += '</div><aside class="learn-side" aria-label="학습 목표와 용어">' + goals + terms + vocab + '</aside></div>';

    return {
      html: html,
      mount: function (page) {
        if (!n) return;
        var sec = $('.concepts', page);
        var allBtn = $('[data-act="all"]', sec);
        var prevBtn = $('[data-act="prev"]', sec);
        var nextBtn = $('[data-act="next"]', sec);
        var done = $('#cvDone', sec);

        function show(i, focus) {
          ui.card = clamp(i, 0, n - 1);
          $$('.concept-card', sec).forEach(function (el, k) { el.hidden = !ui.all && k !== ui.card; });
          $$('.dot', sec).forEach(function (d, k) {
            if (k === ui.card) d.setAttribute('aria-current', 'step'); else d.removeAttribute('aria-current');
          });
          $('#cvCount', sec).textContent = ui.all ? '개념 카드 ' + n + '장 모두' : '카드 ' + (ui.card + 1) + ' / ' + n;
          $('#cvNav', sec).hidden = ui.all;
          allBtn.textContent = ui.all ? '한 장씩 보기' : '모두 펼쳐 보기';
          allBtn.setAttribute('aria-pressed', String(ui.all));
          prevBtn.disabled = ui.card === 0;
          nextBtn.textContent = ui.card === n - 1 ? '다 봤어요 ✔' : '다음 ›';
          if (ui.all) {
            for (var k = 0; k < n; k++) markSeen(unit, k);
          } else {
            markSeen(unit, ui.card);
          }
          if (focus) {
            var t = $('#cct-' + ui.card, sec);
            if (t) t.focus();
          }
        }

        sec.addEventListener('click', function (e) {
          var b = e.target.closest('button');
          if (!b || !sec.contains(b)) return;
          var act = b.getAttribute('data-act');
          if (act === 'prev') show(ui.card - 1, true);
          else if (act === 'first') {
            /* 이어서 보기(§17)를 마다하고 첫 카드부터 */
            var rn = $('#cvResume', sec);
            if (rn) rn.hidden = true;
            ui.all = false;
            show(0, true);
          } else if (act === 'next') {
            if (ui.card === n - 1) {
              done.hidden = false;
              var a = $('a', done);
              if (a) a.focus();
            } else show(ui.card + 1, true);
          } else if (act === 'all') {
            ui.all = !ui.all;
            show(ui.card, false);
            if (ui.all) done.hidden = false;
          } else if (act === 'easy') {
            var box = doc.getElementById(b.getAttribute('aria-controls'));
            var open = b.getAttribute('aria-expanded') !== 'true';
            b.setAttribute('aria-expanded', String(open));
            box.hidden = !open;
          } else if (b.hasAttribute('data-go')) {
            show(parseInt(b.getAttribute('data-go'), 10), true);
          }
        });
        /* 이해 확인: 카드를 읽고 바로 푼다. 틀리면 이유·해설 + 쉬운 설명으로 다시, 그리고 한 번 더 */
        function mountCheck(host, i, focus) {
          var c = concepts[i];
          host.innerHTML = '';
          var w = problemWidget(c.check, {
            report: { unit: unit.id, kind: 'problem', ref: 'check-' + i, q: c.check.q },
            onGraded: function (res, after) {
              logAttempt({ unit: unit.id, pid: 'check-' + i, level: 0, ok: res.correct, cause: res.correct ? '' : causeText(res.why), c: i });
              if (res.correct) {
                markChecked(unit, i);
                var badge = $('#chk-' + i + ' .ok-badge', sec);
                if (badge) badge.hidden = false;
                after.innerHTML = '<p class="check-ok">' + esc(say({ e: '잘 이해했어요! 다음 카드로 가 볼까요?', m: '잘 이해했어요!', h: '잘 이해했습니다.' })) + '</p>';
                return;
              }
              after.innerHTML = (c.easy ?
                '<div class="easy-box again"><p class="easy-label">' + esc(say({ m: '다른 방법으로 다시 설명해 볼게요', h: '다른 방법으로 다시 설명하겠습니다' })) + '</p>' +
                '<div class="rich">' + E.render(c.easy) + '</div></div>' :
                '<p class="check-again">' + esc(say({ m: '카드를 한 번 더 읽어 보고 다시 풀어 봐요.', h: '카드를 다시 읽고 한 번 더 풀어 보세요.' })) + '</p>') +
                '<button type="button" class="btn small primary" data-act="check-retry">한 번 더 풀기</button>';
              $('[data-act="check-retry"]', after).addEventListener('click', function () { mountCheck(host, i, true); });
            },
          });
          host.appendChild(w.el);
          if (focus) w.focus();
        }
        $$('.check-host', sec).forEach(function (host) { mountCheck(host, parseInt(host.getAttribute('data-i'), 10), false); });
        /* 개념 카드마다 '틀린 곳 알리기' (§11) */
        $$('.report-host', sec).forEach(function (h) {
          var ci = parseInt(h.getAttribute('data-i'), 10);
          h.appendChild(reportUI({ unit: unit.id, kind: 'concept', ref: 'c' + ci, q: concepts[ci].title }).el);
        });

        /* 키보드 ← → 로 카드 넘기기 (이해 확인 문제의 보기·입력 칸 안에서는 그 칸의 방향키로 둔다) */
        sec.addEventListener('keydown', function (e) {
          if (ui.all || e.altKey || e.ctrlKey || e.metaKey) return;
          if (e.target.closest && e.target.closest('input, textarea, select, .problem')) return;
          if (e.key === 'ArrowRight' && ui.card < n - 1) { e.preventDefault(); show(ui.card + 1, true); }
          else if (e.key === 'ArrowLeft' && ui.card > 0) { e.preventDefault(); show(ui.card - 1, true); }
        });
        show(ui.card, false);
        if (S.route.query.card !== undefined) {
          var t = $('#cct-' + ui.card, sec);
          if (t) setTimeout(function () { t.scrollIntoView({ block: 'center' }); t.focus({ preventScroll: true }); }, 0);
        }
        var termIdx = S.route.query.term;
        if (termIdx !== undefined) {
          var termEl = doc.getElementById('term-' + parseInt(termIdx, 10));
          if (termEl) {
            termEl.classList.add('flash');
            termEl.setAttribute('tabindex', '-1');
            setTimeout(function () { termEl.scrollIntoView({ block: 'center' }); termEl.focus({ preventScroll: true }); }, 0);
          }
        }
        if (S.route.query.vocab !== undefined) {
          var vEl = doc.getElementById('vocab');
          if (vEl) setTimeout(function () { vEl.scrollIntoView({ block: 'start' }); }, 0);
        }
      },
    };
  };

  /* --- 예제: 풀이를 한 줄씩 --- */
  TAB_VIEWS.examples = function (unit, course, s, r) {
    var exs = Array.isArray(unit.examples) ? unit.examples : [];
    var intro = say({
      e: '예제를 한 단계씩 같이 풀어 봐요. ‘다음 단계’를 누르면 풀이가 하나씩 나와요.',
      m: '예제를 한 단계씩 같이 풀어 봐요. ‘다음 단계’를 누르면 풀이가 하나씩 나와요.',
      h: '예제를 한 단계씩 풀어 보겠습니다. ‘다음 단계’를 누르면 풀이가 하나씩 나옵니다.',
    });
    var html = bubble(s, para(intro));
    if (!exs.length) {
      html += '<div class="state-box"><p>이 단원의 예제는 아직 준비 중이에요.</p></div>';
      return { html: html };
    }
    html += '<ol class="example-list">' + exs.map(function (ex, i) {
      var steps = Array.isArray(ex.steps) ? ex.steps : [];
      /* 읽어 주기(§13): 문제 + 지금까지 펼친 풀이(+ 답을 펼쳤으면 답) */
      var sb = speakBtn(function () {
        var li = doc.getElementById('ex-' + i);
        var shown = li ? parseInt(li.getAttribute('data-shown'), 10) || 0 : 0;
        var parts = ['예제 ' + (i + 1) + '. ' + ex.q];
        steps.slice(0, shown).forEach(function (st, k) { parts.push((k + 1) + '단계. ' + st); });
        if (shown > steps.length) parts.push('답은 ' + ex.answer);
        return parts.join('\n');
      });
      return '<li class="example card" id="ex-' + i + '" data-i="' + i + '" data-shown="0">' +
        '<h3 class="ex-title">예제 ' + (i + 1) + '</h3>' + (sb ? '<div class="ex-tools">' + sb + '</div>' : '') +
        '<div class="rich ex-q">' + E.render(ex.q) + '</div>' + E.fig(ex.fig) +
        '<ol class="steps" aria-live="polite">' + steps.map(function (st, k) {
          return '<li hidden><span class="step-num" aria-hidden="true">' + (k + 1) + '</span><div class="rich">' + E.render(st) + '</div></li>';
        }).join('') + '</ol>' +
        '<div class="ex-answer" hidden><span class="ans-label">답</span> <span class="ans-body">' + E.inline(ex.answer) + '</span></div>' +
        '<div class="ex-actions"><button type="button" class="btn primary" data-act="step">' + (steps.length ? '풀이 첫 단계 보기' : '답 보기') + '</button>' +
        '<button type="button" class="btn ghost" data-act="all">한 번에 보기</button></div>' +
        '<div class="report-host" data-i="' + i + '"></div></li>';
    }).join('') + '</ol>';
    return {
      html: html,
      mount: function (page) {
        /* 예제마다 '틀린 곳 알리기' (§11) — 버튼은 data-rp 라서 아래 data-act 처리와 섞이지 않는다 */
        $$('.example .report-host', page).forEach(function (h) {
          var xi = parseInt(h.getAttribute('data-i'), 10);
          h.appendChild(reportUI({ unit: unit.id, kind: 'example', ref: 'ex' + xi, q: exs[xi].q }).el);
        });
        function update(li) {
          var shown = parseInt(li.getAttribute('data-shown'), 10);
          var steps = $$('.steps > li', li);
          steps.forEach(function (st, k) { st.hidden = k >= shown; });
          var ansShown = shown > steps.length;
          $('.ex-answer', li).hidden = !ansShown;
          var btn = $('[data-act="step"]', li);
          var all = $('[data-act="all"]', li);
          if (ansShown) { btn.textContent = '처음부터 다시'; all.hidden = true; }
          else if (shown === steps.length) { btn.textContent = '답 보기'; all.hidden = false; }
          else { btn.textContent = shown === 0 ? '풀이 첫 단계 보기' : '다음 단계'; all.hidden = false; }
        }
        page.addEventListener('click', function (e) {
          var b = e.target.closest('[data-act]');
          if (!b) return;
          var li = b.closest('.example');
          if (!li) return;
          var steps = $$('.steps > li', li).length;
          var shown = parseInt(li.getAttribute('data-shown'), 10);
          if (b.getAttribute('data-act') === 'step') shown = shown > steps ? 0 : shown + 1;
          else shown = steps + 1;
          li.setAttribute('data-shown', String(shown));
          update(li);
          if (shown > steps) announce('답: ' + E.plain(exs[+li.getAttribute('data-i')].answer));
        });
        var exIdx = S.route.query.ex;
        if (exIdx !== undefined) {
          var li = doc.getElementById('ex-' + parseInt(exIdx, 10));
          if (li) setTimeout(function () { li.scrollIntoView({ block: 'start' }); }, 0);
        }
      },
    };
  };

  /* 문제 수를 미리 세어 안내한다 */
  function poolInfo(unit) {
    var lv = { 1: 0, 2: 0, 3: 0 };
    (unit.practice || []).concat(unit.advanced || []).forEach(function (p) { if (p && lv[p.level || 1] !== undefined) lv[p.level || 1] += 1; });
    var gens = { 1: 0, 2: 0, 3: 0 };
    (unit.gens || []).forEach(function (g) { if (g && gens[g.level || 1] !== undefined) gens[g.level || 1] += 1; });
    var vocab = (unit.vocab || []).filter(function (v) { return v && v.w && v.m; }).length >= 4;
    return { bank: lv, gens: gens, vocab: vocab };
  }

  /* --- 문제 --- */
  TAB_VIEWS.practice = function (unit, course, s) {
    var info = poolInfo(unit);
    var bankN = info.bank[1] + info.bank[2];
    var makes = info.gens[1] + info.gens[2] > 0 || info.vocab;
    var intro = say({
      e: '배운 내용을 문제로 확인해 봐요. 문제 수와 난이도를 고르고 시작하세요.',
      m: '배운 내용을 문제로 확인해 봐요. 문제 수와 난이도를 고르고 시작하세요.',
      h: '배운 내용을 문제로 확인해 봅시다. 문제 수와 난이도를 고르고 시작하세요.',
    });
    var html = bubble(s, para(intro));
    if (!bankN && !makes) {
      html += '<div class="state-box"><p>이 단원의 문제는 아직 준비 중이에요.</p></div>';
      return { html: html };
    }
    html += '<form class="quiz-setup card" id="quizSetup" novalidate>' + countLevelFields(10, 'mix') +
      '<p class="pool-note">문제은행 ' + bankN + '문제' + (makes ? ' + 풀 때마다 새로 만드는 문제' : '') + '에서 골라 내요. 한 문제씩 바로 채점하고 해설을 보여 줘요.</p>' +
      '<p class="pool-note">‘섞어서’는 맞춤 난이도예요. 두 번 연속 맞히면 한 단계 어려운 문제를, 두 번 연속 틀리면 쉬운 문제를 내요. 지금 공부 수준: ' + esc(paceName(paceOf(S.profile))) + '</p>' +
      '<button type="submit" class="btn primary big wide">문제 풀기 시작</button></form>';
    return {
      html: html,
      mount: function (page) {
        var form = $('#quizSetup', page);
        if (!form) return;
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          startQuiz(unit.id, { n: radioVal(form, 'n') || 10, lv: radioVal(form, 'lv') || 'mix' });
        });
      },
    };
  };

  /* --- 심화 --- */
  TAB_VIEWS.advanced = function (unit, course, s) {
    var info = poolInfo(unit);
    var deeper = Array.isArray(unit.deeper) ? unit.deeper : [];
    var intro = say({
      e: '조금 더 깊이 들어가 볼까요? 어려우면 개념으로 돌아가도 괜찮아요.',
      m: '조금 더 깊이 들어가 볼까요? 어려우면 개념으로 돌아가도 괜찮아요.',
      h: '한 걸음 더 들어가 봅시다. 어려우면 개념으로 돌아가도 좋습니다.',
    });
    var html = bubble(s, para(intro));
    html += deeper.map(function (d) {
      return '<article class="deeper card"><h3>' + E.inline(d.title) + '</h3><div class="rich">' + E.render(d.body) + '</div></article>';
    }).join('');
    var advN = info.bank[3];
    var adv3 = info.gens[3] > 0;
    html += '<div class="adv-cta card">' + (advN || adv3 ?
      '<p class="adv-count">심화 문제 ' + advN + '개' + (adv3 ? ' + 새로 만드는 문제' : '') + '</p>' +
      '<button type="button" class="btn primary big" data-act="adv-start">심화 문제 풀기</button>' :
      '<p>이 단원에는 아직 심화 문제가 없어요.</p>') + '</div>';
    return {
      html: html,
      mount: function (page) {
        var b = $('[data-act="adv-start"]', page);
        if (b) b.addEventListener('click', function () { startQuiz(unit.id, { n: 5, lv: 3 }); });
      },
    };
  };

  /* --- 질문 (단원) --- */
  TAB_VIEWS.ask = function (unit, course, s, r) {
    var faq = Array.isArray(unit.faq) ? unit.faq : [];
    var mistakes = Array.isArray(unit.mistakes) ? unit.mistakes : [];
    var chat = chatBox({
      key: 'unit:' + unit.id, subject: s.id, s: s, course: course ? course.id : null, unit: unit.id, unitObj: unit,
      grade: S.profile.grade,
    });
    var html = chat.html;
    if (faq.length) {
      html += '<section class="faq-box card"><h3>자주 묻는 질문</h3><div class="chips" role="group" aria-label="자주 묻는 질문">' + faq.map(function (f, i) {
        return '<button type="button" class="chip faq-chip" data-faq="' + i + '">' + E.inline(f.q) + '</button>';
      }).join('') + '</div></section>';
    }
    if (mistakes.length) {
      html += '<section class="mistake-box card"><h3><span aria-hidden="true">⚠️</span> 자주 하는 실수</h3><ul>' + mistakes.map(function (m) {
        return '<li class="rich">' + E.render(m) + '</li>';
      }).join('') + '</ul></section>';
    }
    return {
      html: html,
      mount: function (page) {
        var api = chat.mount(page);
        page.addEventListener('click', function (e) {
          var b = e.target.closest('[data-faq]');
          if (!b) return;
          var f = faq[parseInt(b.getAttribute('data-faq'), 10)];
          if (f) api.say(E.plain(f.q), E.render(f.a));
        });
        var fi = r.query.faq;
        if (fi !== undefined && faq[parseInt(fi, 10)]) {
          var f = faq[parseInt(fi, 10)];
          if (!api.lastAsked(E.plain(f.q))) api.say(E.plain(f.q), E.render(f.a));
        }
      },
    };
  };

  /* ================= 읽어 주기 (§13, js/speech.js) — 이 기기 안의 목소리만 =================
   * 인터넷 목소리(localService 가 아닌 것)는 읽을 글을 회사 서버로 보내므로 쓰지 않는다(규칙 4·7). 목소리가 없으면 버튼을 숨긴다.
   * 학생별 선택은 p.<id>.prefs 의 tts('on'|'off', 없으면 자동: 초등 1~3학년만 켬)·ttsRate('normal', 없으면 천천히). */
  var SPEECH = { synth: null, voice: null, btn: null, reg: {}, seq: 0 };
  var TTS_GRADES = ['e1', 'e2', 'e3'];
  function ttsMode(p) { var v = readObj(pk('prefs', p)).tts; return v === 'on' || v === 'off' ? v : 'auto'; }
  function ttsRateMode(p) { return readObj(pk('prefs', p)).ttsRate === 'normal' ? 'normal' : 'slow'; }
  function ttsOn() {
    var p = S.profile;
    if (!p || !TSP || !SPEECH.synth) return false;
    var m = ttsMode(p);
    return m === 'auto' ? TTS_GRADES.indexOf(p.grade) >= 0 : m === 'on';
  }
  function initSpeech() {
    try { SPEECH.synth = window.speechSynthesis || null; } catch (e) { SPEECH.synth = null; }
    if (!SPEECH.synth || typeof window.SpeechSynthesisUtterance !== 'function' || !TSP) { SPEECH.synth = null; return; }
    function pick() {
      var list = [];
      try { list = SPEECH.synth.getVoices() || []; } catch (e) { list = []; }
      SPEECH.voice = TSP.pickVoice(list);
      root.classList.toggle('can-speak', !!SPEECH.voice);
      var slot = doc.querySelector('#speech .speech-slot'); // 설정 화면이 열려 있으면 목소리 안내도 고친다
      if (slot) slot.innerHTML = speechStateHtml();
      var tb = doc.querySelector('#speech [data-act="speech-test"]');
      if (tb) tb.disabled = !SPEECH.voice;
    }
    pick();
    try {
      if (typeof SPEECH.synth.addEventListener === 'function') SPEECH.synth.addEventListener('voiceschanged', pick);
      else SPEECH.synth.onvoiceschanged = pick;
    } catch (e) { /* 목소리 목록이 바뀌어도 알 수 없는 브라우저 */ }
  }
  /* 🔊 버튼: fn() 이 읽을 서식 글을 낸다(누를 때 만든다). 읽어 주기를 쓰지 않으면 '' */
  function speakBtn(fn, label, cls) {
    if (!ttsOn()) return '';
    var id = 'sp' + (++SPEECH.seq);
    SPEECH.reg[id] = fn;
    return '<button type="button" class="btn small soft speak-btn' + (cls ? ' ' + cls : '') + '" data-speak="' + id + '" aria-pressed="false">' +
      '<span aria-hidden="true">🔊</span> ' + esc(label || '읽어 주기') + '</button>';
  }
  function stopSpeaking() {
    if (SPEECH.synth) { try { SPEECH.synth.cancel(); } catch (e) { /* 무시 */ } }
    if (SPEECH.btn) {
      SPEECH.btn.setAttribute('aria-pressed', 'false');
      SPEECH.btn.classList.remove('is-speaking');
    }
    SPEECH.btn = null;
  }
  function speakText(src, btn) {
    if (!SPEECH.synth || !SPEECH.voice || !TSP) return;
    var again = !!btn && SPEECH.btn === btn;
    stopSpeaking();
    if (again) return; // 읽는 중에 같은 버튼을 다시 누르면 멈춘다
    var text = TSP.toSpeech(src);
    if (!text) return;
    var u = new window.SpeechSynthesisUtterance(text);
    u.voice = SPEECH.voice;
    u.lang = SPEECH.voice.lang || 'ko-KR';
    u.rate = ttsRateMode(S.profile) === 'normal' ? 1 : 0.85;
    function done() {
      if (btn && SPEECH.btn === btn) {
        btn.setAttribute('aria-pressed', 'false');
        btn.classList.remove('is-speaking');
        SPEECH.btn = null;
      }
    }
    u.onend = done;
    u.onerror = done;
    if (btn) {
      SPEECH.btn = btn;
      btn.setAttribute('aria-pressed', 'true');
      btn.classList.add('is-speaking');
    }
    try { SPEECH.synth.speak(u); } catch (e) { done(); }
  }
  function speechStateHtml() {
    if (!SPEECH.synth) return '<p class="notice small">이 브라우저는 읽어 주기를 지원하지 않아요.</p>';
    if (!SPEECH.voice) {
      return '<p class="notice small">이 기기 안의 한국어 목소리를 찾지 못했어요. 그래서 🔊 버튼이 보이지 않아요.</p>' +
        '<ul class="plain-list small"><li>윈도: 설정 → 시간 및 언어 → 음성 → 음성 추가에서 ‘한국어’</li>' +
        '<li>안드로이드: 설정 → 텍스트 음성 변환(TTS) → 기본 엔진의 음성 데이터에서 ‘한국어’ 설치</li>' +
        '<li>아이폰·아이패드: 설정 → 손쉬운 사용 → 읽기 및 말하기 → 음성 → ‘한국어’</li></ul>' +
        '<p class="muted small">기기마다 메뉴 이름이 조금 달라요. 목소리를 설치한 뒤 이 화면을 다시 열어 주세요.</p>';
    }
    return '<p class="speech-voice">목소리: ' + esc(SPEECH.voice.name || '한국어') + '</p>';
  }
  /* 문제 읽기: 문제 + 보기(화면에 보인 순서와 번호) */
  function problemSpeech(p, order) {
    var parts = [p.q];
    var ch = Array.isArray(p.choices) ? p.choices : [];
    var idx = order || ch.map(function (c, i) { return i; });
    if (p.type === 'choice') idx.forEach(function (oi, k) { parts.push((k + 1) + '번, ' + ch[oi]); });
    else if (p.type === 'ox') parts.push('맞으면 O, 틀리면 X를 골라요.');
    else if (p.type === 'order') parts.push('줄 세울 것: ' + idx.map(function (oi) { return ch[oi]; }).join(', '));
    return parts.join('\n');
  }
  /* 채점 뒤: 정답 · 왜 틀렸을까 · 해설 */
  function feedbackSpeech(p, ok, why) {
    var ans = E.answerText(p);
    var parts = ['정답은 ' + ans + (p.type === 'short' && p.unit && ans.indexOf(p.unit) < 0 ? ' ' + p.unit : '') + '.'];
    if (!ok && why) parts.push('왜 틀렸을까? ' + why);
    if (p.explain) parts.push('해설. ' + p.explain);
    return parts.join('\n');
  }

  /* ================= 틀린 곳 알리기 (§11) — 그 기기에만 모은다(사용자 결정 2026-10-08) =================
   * 문제(채점 뒤)·개념 카드·예제마다 버튼. 알린 것은 그 학생의 p.<id>.reports 에만 쌓이고(서버·외부 요청 없음),
   * 설정의 '틀린 곳 알림'에서 보호자가 글로 복사해 직접 전한다. 같은 곳을 다시 알리면 하나로 고친다. */
  var REPORT_REASONS = [
    ['answer', '정답이 틀린 것 같아요'],
    ['question', '문제나 보기가 이상해요'],
    ['explain', '설명·해설이 틀린 것 같아요'],
    ['typo', '글자·그림이 잘못됐어요'],
    ['other', '기타'],
  ];
  var REPORT_KINDS = { problem: '문제', concept: '개념 카드', example: '예제' };
  var MAX_REPORTS = 200;
  function reasonText(id) {
    for (var i = 0; i < REPORT_REASONS.length; i++) if (REPORT_REASONS[i][0] === id) return REPORT_REASONS[i][1];
    return '기타';
  }
  function reportsList() {
    return readArr(pk('reports')).filter(function (r) { return isObj(r) && typeof r.unit === 'string' && typeof r.ref === 'string'; });
  }
  /* 알리는 사람이 쓴 짧은 말: 제어 문자를 빼고 200자까지 (화면에는 늘 글자로만 넣는다) */
  function cleanMemo(s) {
    return String(s || '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200);
  }
  function snippet(src) {
    var t = E.plain(src || '').replace(/\s+/g, ' ').trim();
    return t.length > 150 ? t.slice(0, 149) + '…' : t;
  }
  /* 문제를 다시 찾을 수 있는 이름: 문제은행은 문제 번호, 생성기 문제는 'g-<생성기>-<seed>'(같은 문제를 다시 만든다) */
  function problemRef(p) { return p && typeof p.id === 'string' && p.id ? p.id : 'q-' + hashStr(String(p && p.q)); }
  function saveReport(ctx, reason, memo) {
    var list = reportsList().filter(function (r) { return !(r.unit === ctx.unit && r.kind === ctx.kind && r.ref === ctx.ref); });
    list.unshift({ t: Date.now(), unit: ctx.unit, kind: ctx.kind, ref: ctx.ref, reason: reason, memo: cleanMemo(memo), q: snippet(ctx.q), v: VERSION });
    store.set(pk('reports'), list.slice(0, MAX_REPORTS));
  }

  /* 설정의 '틀린 곳 알림' 목록 (그 학생 것만) */
  function reportsBodyHtml(list) {
    var intro = '<p class="muted">문제·개념 카드·예제의 ‘틀린 곳 알리기’로 알린 것을 이 기기에만 모아 두었어요. 어디로도 보내지 않아요. ' +
      '보호자가 [글로 복사하기]로 복사해 가정교사를 만든 사람에게 직접 전해 주세요.</p>';
    if (!list.length) return intro + '<p class="report-empty">아직 알린 곳이 없어요. 문제를 풀다 이상한 곳을 찾으면 ‘틀린 곳 알리기’를 눌러 주세요.</p>';
    return intro + '<p class="report-count">모두 ' + list.length + '건</p><ol class="report-list">' + list.map(function (r, i) {
      var meta = Tutor.unitMeta(r.unit);
      var s = meta ? subjectOf(meta.course.subject) : null;
      var where = (s ? s.name + ' · ' : '') + (meta ? E.plain(meta.unit.title) : r.unit) + ' · ' + (REPORT_KINDS[r.kind] || '문제');
      return '<li class="report-item"><p class="rp-head"><span class="rp-when">' + esc(dateText(r.t)) + '</span> <span class="rp-where">' + esc(where) + '</span></p>' +
        '<p class="rp-reason">' + esc(reasonText(r.reason)) + '</p>' +
        (r.memo ? '<p class="rp-memo">“' + esc(r.memo) + '”</p>' : '') +
        (r.q ? '<p class="rp-q muted small">' + esc(r.q) + '</p>' : '') +
        '<button type="button" class="btn small ghost danger" data-act="report-del" data-i="' + i + '">지우기</button></li>';
    }).join('') + '</ol><div class="form-actions"><button type="button" class="btn primary" data-act="report-copy">글로 복사하기</button>' +
      '<button type="button" class="btn ghost danger" data-act="report-clear">모두 지우기</button></div>';
  }
  /* 보호자가 전할 글 — 별명 같은 학생 정보는 넣지 않는다 */
  function reportsText(list) {
    var lines = ['가정교사 틀린 곳 알림 ' + list.length + '건 (' + todayStr() + ' · 판 ' + VERSION + ')', ''];
    list.forEach(function (r, i) {
      var meta = Tutor.unitMeta(r.unit);
      var s = meta ? subjectOf(meta.course.subject) : null;
      lines.push((i + 1) + ') ' + (typeof r.t === 'number' && isFinite(r.t) ? todayStr(new Date(r.t)) + ' · ' : '') +
        (s ? s.name + ' · ' : '') + (meta ? E.plain(meta.unit.title) + ' ' : '') + '(' + r.unit + ') · ' + (REPORT_KINDS[r.kind] || '문제') + ' ' + r.ref);
      lines.push('   이유: ' + reasonText(r.reason));
      if (r.memo) lines.push('   메모: ' + cleanMemo(r.memo));
      if (r.q) lines.push('   내용: ' + cleanMemo(r.q));
    });
    return lines.join('\n');
  }
  /* 클립보드에 쓰기 — 안 되면 false (화면이 글을 보여 주고 직접 복사하게 한다) */
  function copyText(text) {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return false; });
      }
    } catch (e) { /* 막힘 */ }
    return Promise.resolve(false);
  }

  /* 버튼 + 펼치는 칸. ctx: { unit, kind: 'problem'|'concept'|'example', ref, q }
   * 문제 위젯(<form>) 안에도 들어가므로 <form> 을 쓰지 않고, 바깥 화면의 data-act 처리와 섞이지 않게 data-rp 를 쓴다 */
  function reportUI(ctx) {
    var id = nextId('rp');
    var el = doc.createElement('div');
    el.className = 'report';
    el.innerHTML = '<button type="button" class="btn small ghost report-btn" data-rp="open" aria-expanded="false" aria-controls="' + id + '">' +
      '<span aria-hidden="true">🚩</span> 틀린 곳 알리기</button>' +
      '<div class="report-form" id="' + id + '" role="group" aria-labelledby="' + id + '-t" hidden>' +
      '<p class="rf-title" id="' + id + '-t">어떤 점이 이상한가요?</p><div class="rf-reasons">' +
      REPORT_REASONS.map(function (r, i) {
        return '<label class="check"><input type="radio" name="' + id + '-r" value="' + r[0] + '" id="' + id + '-r' + i + '"><span>' + esc(r[1]) + '</span></label>';
      }).join('') + '</div>' +
      '<label class="field-label" for="' + id + '-m">더 적을 말 <span class="opt">(선택)</span></label>' +
      '<textarea id="' + id + '-m" class="text-input rf-memo" rows="2" maxlength="200" aria-describedby="' + id + '-h"></textarea>' +
      '<p class="help" id="' + id + '-h">이름·연락처는 쓰지 마세요. 알린 내용은 이 기기에만 모아 두고, 보호자가 설정의 ‘틀린 곳 알림’에서 확인해 전해 줄 수 있어요.</p>' +
      '<p class="form-msg" role="alert" hidden></p>' +
      '<div class="form-actions"><button type="button" class="btn small primary" data-rp="send">알리기</button>' +
      '<button type="button" class="btn small ghost" data-rp="cancel">취소</button></div></div>' +
      '<p class="report-done" role="status" hidden></p>';
    var btn = $('.report-btn', el);
    var box = $('.report-form', el);
    var msg = $('.form-msg', el);
    var done = $('.report-done', el);
    function toggle(open) {
      box.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      msg.hidden = true;
      if (open) {
        done.hidden = true;
        var first = $('input', box);
        if (first) first.focus();
      }
    }
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-rp]');
      if (!b || !el.contains(b)) return;
      var act = b.getAttribute('data-rp');
      if (act === 'open') { toggle(box.hidden); return; }
      if (act === 'cancel') { toggle(false); btn.focus(); return; }
      if (act === 'send') {
        var picked = box.querySelector('input[type="radio"]:checked');
        if (!picked) {
          msg.textContent = '어떤 점이 이상한지 골라 주세요.';
          msg.hidden = false;
          return;
        }
        saveReport(ctx, picked.value, $('.rf-memo', box).value);
        $$('input', box).forEach(function (r) { r.checked = false; });
        $('.rf-memo', box).value = '';
        toggle(false);
        done.textContent = say({
          e: '고마워요! 알린 내용은 이 기기에 모아 두었어요. 보호자에게 설정의 ‘틀린 곳 알림’을 보여 주세요.',
          m: '고마워요! 알린 내용은 이 기기에 모아 두었어요. 보호자가 설정의 ‘틀린 곳 알림’에서 확인할 수 있어요.',
          h: '고맙습니다. 알린 내용은 이 기기에 모아 두었습니다. 설정의 ‘틀린 곳 알림’에서 확인할 수 있습니다.',
        });
        done.hidden = false;
        btn.focus();
      }
    });
    return { el: el };
  }

  /* ================= 문제 위젯 (예상문제·오답노트가 함께 쓴다) ================= */

  var CIRCLED = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];
  var LEVEL_NAMES = { 1: '기본', 2: '실력', 3: '심화' };
  var INPUT_HELP = {
    number: '분수는 3/4, 대분수는 1 2/3 처럼 써요. 단위는 써도 되고 안 써도 돼요.',
    set: '답이 여러 개면 쉼표(,)로 나눠 써요. 예: 2, 3',
    expr: '식은 2x+1 처럼 써요. 거듭제곱은 x^2 처럼 써요.',
  };

  function givenText(p, input) {
    if (p.type === 'choice') return E.plain((p.choices || [])[input]);
    if (p.type === 'ox') return input ? 'O' : 'X';
    if (p.type === 'order') return (input || []).map(function (i) { return E.plain((p.choices || [])[i]); }).join(' → ');
    return String(input === null || input === undefined ? '' : input).trim();
  }

  /* 오답 분석(§7.4): 학생이 고른 보기(why) · 쓴 답(wrong)에 맞춘 "왜 틀렸을까". 없으면 '' */
  function diagnose(p, val) {
    if (p.type === 'choice' && Array.isArray(p.why) && typeof val === 'number') {
      var w = p.why[val];
      return typeof w === 'string' && w.trim() ? w : '';
    }
    if (p.type === 'short' && Array.isArray(p.wrong) && typeof val === 'string') {
      for (var i = 0; i < p.wrong.length; i++) {
        var d = p.wrong[i];
        if (!isObj(d) || d.a === undefined || d.a === null || !d.why) continue;
        /* 틀린 답 후보도 그 문제의 채점 방식(check)으로 비교한다: number 면 값이 같으면 걸린다 */
        if (E.check({ type: 'short', check: p.check, unit: p.unit, answer: d.a }, val).correct) return String(d.why);
      }
    }
    return '';
  }

  /* 추가 설명(§7.4): 관련 개념 카드를 다시 보여 주고, 비슷한 문제를 권한다 */
  function moreBoxHtml(more, id) {
    var u = more.unitId ? Tutor.units[more.unitId] : null;
    var card = u && Array.isArray(u.concepts) && typeof more.idx === 'number' ? u.concepts[more.idx] : null;
    var hasCard = typeof more.idx === 'number' && more.unitId;
    var title = card ? E.plain(card.title) : '';
    var ask = hasCard ?
      say({ e: (title ? '‘' + title + '’ ' : '') + '개념을 다시 볼까요?', m: (title ? '‘' + title + '’ ' : '') + '개념을 다시 볼까요?', h: (title ? '‘' + title + '’ ' : '') + '개념을 다시 볼까요?' }) :
      say({ m: '비슷한 문제로 한 번 더 연습해 볼까요?', h: '비슷한 문제로 한 번 더 연습해 봅시다.' });
    return '<div class="fb-more"><p class="fb-more-q">' + esc(ask) + '</p><div class="fb-more-actions">' +
      (hasCard ? '<button type="button" class="btn small soft" data-act="again" aria-expanded="false" aria-controls="' + id + '-again">개념 다시 보기</button>' : '') +
      (more.onSimilar ? '<button type="button" class="btn small" data-act="similar">비슷한 문제 풀기</button>' : '') + '</div>' +
      (hasCard ? '<div class="concept-again" id="' + id + '-again" hidden></div>' : '') + '</div>';
  }
  function conceptAgainHtml(unit, idx) {
    var c = unit && Array.isArray(unit.concepts) ? unit.concepts[idx] : null;
    if (!c) return '<p class="muted">개념 카드를 찾지 못했어요.</p>';
    return '<p class="ca-title">' + E.inline(c.title) + '</p>' +
      (c.easy ? '<div class="easy-box"><p class="easy-label">쉽게 말하면</p><div class="rich">' + E.render(c.easy) + '</div></div>' : '') +
      '<div class="rich">' + E.render(c.body) + '</div>' + E.fig(c.fig) +
      '<p class="ca-link"><a class="link" href="#/unit/' + encodeURIComponent(unit.id) + '/learn?card=' + idx + '">개념 카드에서 보기 ›</a></p>';
  }

  /* 정답 문구는 TutorMath.answerText 가 정한다(계약 §2.5). 화면은 단위·O/X 풀이말만 덧붙인다 */
  function answerHtml(p) {
    var t = E.answerText(p);
    if (p.type === 'ox') {
      return '<span class="ans-text ox-ans">' + esc(t) + (t === 'O' ? ' (맞아요)' : t === 'X' ? ' (틀려요)' : '') + '</span>';
    }
    return '<span class="ans-text">' + E.inline(t) + (p.type === 'short' && p.unit && t.indexOf(p.unit) < 0 ? ' ' + esc(p.unit) : '') + '</span>';
  }

  function problemWidget(p, opt) {
    opt = opt || {};
    var rnd = opt.rnd || Math.random;
    var id = nextId('pw');
    var type = p.type;
    var form = doc.createElement('form');
    form.className = 'problem type-' + String(type).replace(/[^a-z]/g, '');
    form.setAttribute('novalidate', '');
    form.setAttribute('aria-labelledby', id + '-q');
    var h = [];
    h.push('<div class="pq rich" id="' + id + '-q" tabindex="-1">' + E.render(p.q) + '</div>');
    h.push(E.fig(p.fig));
    var count = 0;
    var dispOrder = null; // 화면에 보인 보기 순서 — 읽어 주기도 이 순서·번호로 읽는다
    if (type === 'choice' && Array.isArray(p.choices)) {
      var idx = p.choices.map(function (c, i) { return i; });
      var order = p.fixed ? idx : shuffle(idx, rnd);
      dispOrder = order;
      h.push('<fieldset class="choices"><legend class="sr-only">보기 중 하나를 고르세요</legend>' + order.map(function (oi, k) {
        return '<label class="choice" data-i="' + oi + '"><input type="radio" name="' + id + '-c" value="' + oi + '">' +
          '<span class="c-num" aria-hidden="true">' + (CIRCLED[k] || (k + 1)) + '</span>' +
          '<span class="c-text">' + E.inline(p.choices[oi]) + '</span><span class="c-mark"></span></label>';
      }).join('') + '</fieldset>');
    } else if (type === 'ox') {
      h.push('<fieldset class="ox"><legend class="sr-only">맞으면 O, 틀리면 X 를 고르세요</legend>' +
        '<label class="ox-btn ox-o" data-v="true"><input type="radio" name="' + id + '-ox" value="true">' +
        '<span class="ox-big" aria-hidden="true">O</span><span class="ox-say">맞아요</span><span class="c-mark"></span></label>' +
        '<label class="ox-btn ox-x" data-v="false"><input type="radio" name="' + id + '-ox" value="false">' +
        '<span class="ox-big" aria-hidden="true">X</span><span class="ox-say">틀려요</span><span class="c-mark"></span></label></fieldset>');
    } else if (type === 'short') {
      var help = INPUT_HELP[p.check] || '';
      h.push('<div class="short"><label class="field-label" for="' + id + '-a">답</label><div class="short-row">' +
        '<input id="' + id + '-a" class="text-input short-input" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done"' +
        (help ? ' aria-describedby="' + id + '-h"' : '') + '>' +
        (p.unit ? '<span class="short-unit">' + esc(p.unit) + '</span>' : '') + '</div>' +
        (help ? '<p class="help" id="' + id + '-h">' + esc(help) + '</p>' : '') + '</div>');
    } else if (type === 'order' && Array.isArray(p.choices)) {
      count = p.choices.length;
      var items = p.choices.map(function (c, i) { return i; });
      var shown = shuffle(items, rnd);
      if (shown.length > 1 && sameArr(shown, p.answer)) shown = shown.slice(1).concat(shown[0]); // 처음부터 정답 순서로 보이지 않게
      dispOrder = shown;
      h.push('<div class="order"><p class="help">항목을 순서대로 눌러요. 잘못 눌렀으면 ‘되돌리기’를 눌러요.</p>' +
        '<ol class="order-picked" aria-label="내가 정한 순서"></ol>' +
        '<div class="order-pool" role="group" aria-label="남은 항목">' + shown.map(function (i) {
          return '<button type="button" class="order-item" data-i="' + i + '">' + E.inline(p.choices[i]) + '</button>';
        }).join('') + '</div>' +
        '<div class="order-tools"><button type="button" class="btn small ghost" data-act="undo" disabled>↶ 되돌리기</button></div></div>');
    } else {
      h.push('<p class="notice">이 문제는 아직 화면에 보여 줄 수 없는 형식이에요.</p>');
    }
    /* 읽어 주기(§13): 문제 위에 🔊 — 문제와 보기(보인 순서·번호) */
    var psb = speakBtn(function () { return problemSpeech(p, dispOrder); }, '문제 읽어 주기');
    if (psb) h.unshift('<div class="pw-tools">' + psb + '</div>');
    if (p.hint) {
      h.push('<div class="hint-wrap"><button type="button" class="btn small soft" data-act="hint" aria-expanded="false" aria-controls="' + id + '-hint">' +
        '<span aria-hidden="true">💡</span> 힌트 보기</button><div class="hint rich" id="' + id + '-hint" hidden>' + E.render(p.hint) + '</div></div>');
    }
    /* 알림 문구는 버튼 아래에 둔다: 문구가 사라질 때 버튼이 움직이면 누르는 순간 클릭이 빗나간다 */
    h.push('<div class="pw-actions"><button type="submit" class="btn primary big pw-submit">확인하기</button></div>');
    h.push('<p class="pw-msg" role="alert" hidden></p>');
    h.push('<div class="feedback" role="status" tabindex="-1" hidden></div>');
    h.push('<div class="pw-after"></div>');
    h.push('<div class="pw-report"></div>'); // 채점한 뒤 '틀린 곳 알리기' (opt.report)
    form.innerHTML = h.join('');

    var picked = [];
    var graded = false;
    var msg = $('.pw-msg', form);
    var input = $('.short-input', form);
    var undoBtn = $('[data-act="undo"]', form);
    var submitBtn = $('.pw-submit', form);

    function showMsg(t) { msg.textContent = t; msg.hidden = false; }
    function clearMsg() { msg.hidden = true; msg.textContent = ''; }

    function pick(btn) {
      var i = parseInt(btn.getAttribute('data-i'), 10);
      picked.push(i);
      btn.hidden = true;
      var li = doc.createElement('li');
      li.setAttribute('data-i', String(i));
      li.innerHTML = '<span class="o-num" aria-hidden="true">' + picked.length + '</span><span class="o-text">' + E.inline(p.choices[i]) + '</span>';
      $('.order-picked', form).appendChild(li);
      undoBtn.disabled = false;
      clearMsg();
      var nextBtn = $$('.order-item', form).filter(function (b) { return !b.hidden; })[0];
      (nextBtn || submitBtn).focus();
    }
    function undo() {
      if (!picked.length) return;
      var i = picked.pop();
      var ol = $('.order-picked', form);
      if (ol.lastElementChild) ol.removeChild(ol.lastElementChild);
      var btn = $('.order-item[data-i="' + i + '"]', form);
      if (btn) { btn.hidden = false; btn.focus(); }
      undoBtn.disabled = !picked.length;
    }
    function readInput() {
      if (type === 'choice' || type === 'ox') {
        var c = form.querySelector('input[type="radio"]:checked');
        if (!c) return null;
        return type === 'ox' ? c.value === 'true' : parseInt(c.value, 10);
      }
      if (type === 'short') return input ? input.value : '';
      if (type === 'order') return picked.length ? picked.slice() : null;
      return null;
    }
    function lock() {
      $$('input, button.order-item, [data-act="undo"]', form).forEach(function (el) { el.disabled = true; });
      $('.pw-actions', form).hidden = true;
      form.classList.add('is-graded');
    }
    function submit() {
      if (graded) return;
      var val = readInput();
      if (type === 'order' && val && val.length < count) {
        showMsg('남은 항목도 모두 눌러서 순서를 정해 주세요.');
        return;
      }
      var res = E.check(p, val);
      if (res.empty) {
        showMsg(type === 'short' ? '답을 입력해 주세요.' : type === 'order' ? '항목을 눌러 순서를 정해 주세요.' : '답을 골라 주세요.');
        if (input) input.focus();
        return;
      }
      graded = true;
      clearMsg();
      lock();
      var ok = res.correct;
      $$('.choice, .ox-btn', form).forEach(function (lab) {
        var v = lab.classList.contains('ox-btn') ? lab.getAttribute('data-v') === 'true' : parseInt(lab.getAttribute('data-i'), 10);
        var mark = $('.c-mark', lab);
        var right = v === p.answer;
        var mine = v === val;
        if (right) { lab.classList.add('is-correct'); mark.textContent = '✔ 정답'; }
        else if (mine) { lab.classList.add('is-wrong'); mark.textContent = '✘ 내 답'; }
      });
      if (input) form.classList.add(ok ? 'input-ok' : 'input-bad');
      if (type === 'order') $('.order-picked', form).classList.add(ok ? 'is-correct' : 'is-wrong');
      var fb = $('.feedback', form);
      var why = ok ? '' : diagnose(p, val);
      var res2 = { correct: ok, given: givenText(p, val), input: val, why: why };
      more = ok ? null : (typeof opt.more === 'function' ? opt.more(res2) : opt.more || null);
      fb.className = 'feedback ' + (ok ? 'is-ok' : 'is-bad');
      fb.innerHTML = '<p class="fb-head"><span class="fb-icon" aria-hidden="true">' + (ok ? '✔' : '✘') + '</span><strong>' +
        esc(ok ? say({ e: '정답이에요! 잘했어요.', m: '정답이에요!', h: '정답입니다.' }) :
          say({ e: '오답이에요. 괜찮아요, 해설을 같이 봐요.', m: '오답이에요. 해설을 확인해 봐요.', h: '오답입니다. 해설을 확인하세요.' })) +
        '</strong></p>' +
        speakBtn(function () { return feedbackSpeech(p, ok, why); }, '해설 읽어 주기', 'fb-speak') +
        '<div class="fb-answer"><span class="fb-label">정답</span> ' + answerHtml(p) + '</div>' +
        (why ? '<div class="fb-why"><p class="fb-label">왜 틀렸을까?</p><div class="rich">' + E.render(why) + '</div></div>' : '') +
        (p.explain ? '<div class="fb-explain"><p class="fb-label">해설</p><div class="rich">' + E.render(p.explain) + '</div></div>' : '') +
        (more ? moreBoxHtml(more, id) : '');
      fb.hidden = false;
      announce(ok ? '정답' : '오답');
      var rctx = typeof opt.report === 'function' ? opt.report() : opt.report;
      if (isObj(rctx)) $('.pw-report', form).appendChild(reportUI(rctx).el);
      if (typeof opt.onGraded === 'function') {
        opt.onGraded(res2, $('.pw-after', form));
      }
    }
    var more = null;

    function toggleAgain(b) {
      var box = doc.getElementById(b.getAttribute('aria-controls'));
      if (!box || !more) return;
      var open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(open));
      box.hidden = !open;
      if (open && !box.hasChildNodes()) {
        box.innerHTML = '<p class="muted">불러오는 중이에요…</p>';
        Tutor.loadUnit(more.unitId).then(function (u) {
          box.innerHTML = conceptAgainHtml(u, more.idx);
        }, function () {
          box.innerHTML = '<p class="muted">개념 카드를 불러오지 못했어요.</p>';
        });
      }
    }

    form.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b || !form.contains(b)) return;
      var act = b.getAttribute('data-act');
      if (act === 'hint') { toggleHint(b); return; }
      if (act === 'again') { toggleAgain(b); return; }
      if (act === 'similar') { if (more && typeof more.onSimilar === 'function') more.onSimilar(); return; }
      if (graded) return;
      if (act === 'undo') undo();
      else if (b.classList.contains('order-item')) pick(b);
    });
    function toggleHint(b) {
      var box = doc.getElementById(b.getAttribute('aria-controls'));
      var open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(open));
      b.lastChild.textContent = open ? ' 힌트 닫기' : ' 힌트 보기';
      box.hidden = !open;
    }
    form.addEventListener('input', clearMsg);
    form.addEventListener('change', function () {
      clearMsg();
      $$('.choice, .ox-btn', form).forEach(function (lab) {
        var r = $('input', lab);
        lab.classList.toggle('is-picked', !!(r && r.checked));
      });
    });
    form.addEventListener('submit', function (e) { e.preventDefault(); submit(); });

    return {
      el: form,
      focus: function () {
        var t = input || $('.pq', form);
        try { t.focus({ preventScroll: !input }); } catch (e) { t.focus(); }
      },
    };
  }

  /* ================= 예상문제 만들기 ================= */

  /* 같은 문제인지: 글이 같아도 그림·보기가 다르면 다른 문제다("몇 시일까요?" + 다른 시계). 보기 순서는 따지지 않는다 */
  function problemSig(p) {
    var ch = Array.isArray(p.choices) ? p.choices.map(String).slice().sort() : '';
    return String(p.q) + '|' + JSON.stringify(ch) + '|' + JSON.stringify(p.fig || null);
  }
  function problemKey(unitId, src, p, genId) {
    if (src === 'bank') return unitId + '#' + p.id;
    return unitId + '#' + src + ':' + (genId || '') + ':' + hashStr(problemSig(p));
  }

  function genProblem(unit, g, seed) {
    var R = E.toolkit(seed);
    if (!R || typeof g.make !== 'function') return null;
    try {
      var p = g.make(R);
      if (!isObj(p) || !p.type || !p.q) return null;
      p = Object.assign({}, p, { id: 'g-' + g.id + '-' + seed, level: g.level || 1 });
      // 생성기의 "틀린 답"이 이번에 뽑힌 수로는 정답과 같아질 수 있다(예: 직각) — 그런 진단은 버린다
      if (Array.isArray(p.wrong)) {
        var M = engine('TutorMath');
        p.wrong = p.wrong.filter(function (w) {
          if (!isObj(w) || w.a === undefined) return false;
          try { return !(M && M.checkAnswer(p, Array.isArray(w.a) ? w.a.join(', ') : String(w.a)).correct); } catch (e2) { return true; }
        });
      }
      return p;
    } catch (e) {
      warn('문제 생성기 오류: ' + unit.id + ' / ' + g.id, e);
      return null;
    }
  }

  /* 영어 단원: vocab 으로 낱말 문제를 만든다(CONTENT-GUIDE §6.3) */
  function escapeRe(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function vocabProblem(unit, level, rnd) {
    var list = (unit.vocab || []).filter(function (v) { return v && v.w && v.m; });
    if (list.length < 4) return null;
    var target = list[Math.floor(rnd() * list.length)];
    var others = shuffle(list.filter(function (v) { return v !== target && v.m !== target.m && v.w.toLowerCase() !== target.w.toLowerCase(); }), rnd);
    var seenM = {};
    var seenW = {};
    var wrongM = [];
    var wrongW = [];
    others.forEach(function (v) {
      if (!seenM[v.m] && wrongM.length < 3) { seenM[v.m] = 1; wrongM.push(v.m); }
      if (!seenW[v.w.toLowerCase()] && wrongW.length < 3) { seenW[v.w.toLowerCase()] = 1; wrongW.push(v.w); }
    });
    var exNote = target.ex ? '\n\n' + target.ex + (target.exm ? '\n' + target.exm : '') : '';
    var kinds = level >= 2 ? ['spell', 'blank'] : ['mean', 'word'];
    var kind = kinds[Math.floor(rnd() * kinds.length)];
    var re = new RegExp('(^|[^A-Za-z])' + escapeRe(target.w) + '(?![A-Za-z])', 'i');
    if (kind === 'blank' && !(target.ex && re.test(target.ex) && wrongW.length >= 3)) kind = 'spell';
    function choiceOf(right, wrongs) {
      var all = shuffle([right].concat(wrongs.slice(0, 3)), rnd);
      return { choices: all, answer: all.indexOf(right) };
    }
    var mean = '**' + target.w + '** — ' + target.m;
    if (kind === 'mean' && wrongM.length >= 3) {
      var c1 = choiceOf(target.m, wrongM);
      return { type: 'choice', level: 1, q: '다음 낱말의 뜻으로 알맞은 것은?\n\n**' + target.w + '**', choices: c1.choices, answer: c1.answer, explain: mean + exNote };
    }
    if ((kind === 'word' || kind === 'mean') && wrongW.length >= 3) {
      var c2 = choiceOf(target.w, wrongW);
      return { type: 'choice', level: 1, q: '다음 뜻을 가진 영어 낱말은?\n\n**' + target.m + '**', choices: c2.choices, answer: c2.answer, explain: mean + exNote };
    }
    if (kind === 'blank') {
      var c3 = choiceOf(target.w, wrongW);
      var sentence = target.ex.replace(re, function (all, pre) { return pre + '[[빈칸]]'; });
      return {
        type: 'choice', level: 2, q: '빈칸에 알맞은 낱말은?\n\n' + sentence + (target.exm ? '\n\n(' + target.exm + ')' : ''),
        choices: c3.choices, answer: c3.answer, explain: mean + exNote,
      };
    }
    return {
      type: 'short', check: 'text', level: 2,
      q: '다음 뜻을 가진 영어 낱말을 쓰세요.\n\n**' + target.m + '**',
      answer: [target.w],
      hint: '첫 글자: ' + target.w.charAt(0) + ' · 모두 ' + target.w.replace(/[^A-Za-z]/g, '').length + '글자',
      explain: mean + exNote,
    };
  }

  /* ---- 문제 모으기 ---- */
  function bankItem(u, p) { return { p: p, unit: u.id, src: 'bank', gen: null, key: problemKey(u.id, 'bank', p) }; }

  /* 수준별 문제 풀: 문제은행 + 생성기(+ 영어 낱말). o.gen 이면 그 생성기만, o.concept 이면 그 개념 카드의 문제만 */
  function collectPools(units, o, levels) {
    var canGen = !!E.toolkit(1);
    var pools = {};
    levels.forEach(function (l) { pools[l] = { bank: [], makers: [] }; });
    units.forEach(function (u) {
      if (!o.gen) {
        (u.practice || []).concat(u.advanced || []).forEach(function (p) {
          if (!isObj(p) || !p.type) return;
          var l = p.level || 1;
          if (!pools[l]) return;
          if (o.concept !== undefined && p.concept !== o.concept) return;
          pools[l].bank.push(bankItem(u, p));
        });
      }
      (u.gens || []).forEach(function (g) {
        if (!isObj(g) || !canGen || (o.gen && o.gen !== g.id)) return;
        var l = g.level || 1;
        if (pools[l]) pools[l].makers.push({ unit: u, g: g });
      });
      if ((!o.gen || o.gen === '@vocab') && o.concept === undefined && (u.vocab || []).length >= 4) {
        [1, 2].forEach(function (l) { if (pools[l]) pools[l].makers.push({ unit: u, vocab: true, level: l }); });
      }
    });
    return pools;
  }

  /* 생성기로 새 문제 하나. 이미 낸 문제(st.seen)와 같으면 다른 seed 로 다시. st: { seed, tries, seen } */
  function makeOne(makers, st, concept) {
    for (var k = 0; k < 40 && makers.length; k++) {
      var mk = makers[st.tries % makers.length];
      st.tries += 1;
      var seed = (st.seed + st.tries * 7919) >>> 0;
      var p = mk.vocab ? vocabProblem(mk.unit, mk.level, E.rng(seed)) : genProblem(mk.unit, mk.g, seed);
      if (!p) continue;
      if (concept !== undefined && p.concept !== concept) continue;
      /* 낱말 문제는 보기(오답)가 무작위라 묻는 글로만 같은지 본다 */
      var sig = mk.vocab ? 'vocab|' + p.q : problemSig(p);
      if (st.seen[sig]) continue;
      st.seen[sig] = 1;
      var src = mk.vocab ? 'vocab' : 'gen';
      var gid = mk.vocab ? '@vocab' : mk.g.id;
      if (mk.vocab) p.id = 'v-' + seed;
      return { p: p, unit: mk.unit.id, src: src, gen: gid, key: problemKey(mk.unit.id, src, p, gid) };
    }
    return null;
  }
  function seenOf(items) {
    var seen = {};
    items.forEach(function (it) { seen[it.src === 'vocab' ? 'vocab|' + it.p.q : problemSig(it.p)] = 1; });
    return seen;
  }

  /* 난이도를 정해서 풀 때: 문제은행 + 생성기를 섞어 n 문제. 생성기가 있으면 절반 이상을 생성기에서 낸다 */
  function levelsFor(lv) {
    if (lv === 'all') return [1, 2, 3];
    if (lv === 'mix') return [1, 2];
    return [parseInt(lv, 10) || 1];
  }
  function buildQuiz(units, o) {
    var rnd = E.rng(o.seed);
    var levels = levelsFor(o.lv);
    var pools = collectPools(units, o, levels);
    var bank = [];
    var makers = [];
    levels.forEach(function (l) { bank = bank.concat(pools[l].bank); makers = makers.concat(pools[l].makers); });
    bank = shuffle(bank, rnd);
    var n = o.n;
    var wantGen = makers.length ? (bank.length ? Math.ceil(n / 2) : n) : 0;
    if (bank.length < n - wantGen) wantGen = n - bank.length;
    var st = { seed: o.seed, tries: 0, seen: seenOf(bank) };
    var made = [];
    while (made.length < wantGen) {
      var it = makeOne(makers, st, o.concept);
      if (!it) break;
      made.push(it);
    }
    var take = Math.min(bank.length, n - made.length);
    return shuffle(bank.slice(0, take).concat(made), rnd);
  }

  /* "섞어서" = 맞춤 난이도(§7.4): 학생 수준(pace)에서 시작해 두 번 연속 맞히면 한 단계 위, 두 번 연속 틀리면 한 단계 아래 문제를 낸다 */
  var ADAPT = {
    easy: { levels: [1, 2], start: 1 },
    normal: { levels: [1, 2], start: 1 },
    hard: { levels: [1, 2, 3], start: 2 },
  };
  function adaptiveInit(q, units, o) {
    var plan = ADAPT[paceOf(S.profile)] || ADAPT.normal;
    var rnd = E.rng(o.seed);
    q.adaptive = true;
    q.levels = plan.levels;
    q.pools = collectPools(units, o, plan.levels);
    var bankCount = 0;
    var hasMakers = false;
    var all = [];
    plan.levels.forEach(function (l) {
      q.pools[l].bank = shuffle(q.pools[l].bank, rnd);
      bankCount += q.pools[l].bank.length;
      all = all.concat(q.pools[l].bank);
      if (q.pools[l].makers.length) hasMakers = true;
    });
    q.gst = { seed: o.seed, tries: 0, seen: seenOf(all) };
    q.level = plan.start;
    q.okRun = 0;
    q.badRun = 0;
    q.fromBank = 0;
    q.fromGen = 0;
    q.levelNote = '';
    q.total = hasMakers ? o.n : Math.min(o.n, bankCount);
  }
  function drawFrom(q, level) {
    var pool = q.pools[level];
    if (!pool) return null;
    var order = q.fromGen <= q.fromBank ? ['gen', 'bank'] : ['bank', 'gen']; // 절반 이상은 생성기 문제
    for (var i = 0; i < order.length; i++) {
      if (order[i] === 'bank' && pool.bank.length) { q.fromBank += 1; return pool.bank.shift(); }
      if (order[i] === 'gen' && pool.makers.length) {
        var it = makeOne(pool.makers, q.gst);
        if (it) { q.fromGen += 1; return it; }
      }
    }
    return null;
  }
  function drawNext(q) {
    /* 목표 수준에 문제가 없으면 가까운 수준(같으면 쉬운 쪽)에서 */
    var order = q.levels.slice().sort(function (a, b) { return (Math.abs(a - q.level) - Math.abs(b - q.level)) || (a - b); });
    for (var i = 0; i < order.length; i++) {
      var it = drawFrom(q, order[i]);
      if (it) return it;
    }
    return null;
  }
  function adaptAfter(q, correct) {
    var lv = q.levels;
    var before = q.level;
    if (correct) { q.okRun += 1; q.badRun = 0; } else { q.badRun += 1; q.okRun = 0; }
    if (q.okRun >= 2 && q.level < lv[lv.length - 1]) { q.level += 1; q.okRun = 0; }
    else if (q.badRun >= 2 && q.level > lv[0]) { q.level -= 1; q.badRun = 0; }
    q.levelNote = q.level > before ? 'up' : q.level < before ? 'down' : '';
  }

  /* "비슷한 문제"(§7.4 추가 설명): 생성기 문제면 같은 생성기의 새 문제, 문제은행이면 같은 개념(concept)의 다른 문제 */
  function similarFor(q, item) {
    var unit = Tutor.units[item.unit];
    if (!unit) return null;
    var used = {};
    q.items.forEach(function (it) { used[it.key] = 1; });
    var st = { seed: newSeed(), tries: 0, seen: seenOf(q.items) };
    if (item.src === 'gen' || item.src === 'vocab') {
      var makers = item.src === 'vocab' ? [{ unit: unit, vocab: true, level: item.p.level || 1 }] :
        (unit.gens || []).filter(function (g) { return isObj(g) && g.id === item.gen; }).map(function (g) { return { unit: unit, g: g }; });
      var made = makeOne(makers, st);
      return made ? Object.assign(made, { extra: true }) : null;
    }
    var c = item.p.concept;
    var lvl = item.p.level || 1;
    var pool = (unit.practice || []).concat(unit.advanced || []).filter(function (x) {
      return isObj(x) && x.type && x.id !== item.p.id && !used[unit.id + '#' + x.id];
    });
    var same = typeof c === 'number' ? pool.filter(function (x) { return x.concept === c; }) : pool;
    same.sort(function (a, b) { return Math.abs((a.level || 1) - lvl) - Math.abs((b.level || 1) - lvl); });
    if (same.length) return Object.assign(bankItem(unit, same[0]), { extra: true });
    if (typeof c === 'number') {
      var g2 = makeOne((unit.gens || []).filter(isObj).map(function (g) { return { unit: unit, g: g }; }), st, c);
      if (g2) return Object.assign(g2, { extra: true });
    }
    return null;
  }

  function newQuiz(o) {
    var q = {
      key: o.key, id: o.id, title: o.title, back: o.back, subject: o.subject, units: o.units,
      unitIds: o.units.map(function (u) { return u.id; }),
      n: o.n, lv: o.lv, gen: o.gen, concept: o.concept, seed: o.seed, rnd: E.rng((o.seed ^ 0x5bd1e995) >>> 0),
      items: [], i: 0, answers: [], done: false, retry: false, adaptive: false, note: '', total: 0,
    };
    if (o.lv === 'mix' && !o.gen && o.concept === undefined) {
      adaptiveInit(q, o.units, o);
      var first = drawNext(q);
      if (first) q.items.push(first);
      else q.total = 0;
    } else {
      q.items = buildQuiz(o.units, o);
      q.total = q.items.length;
    }
    if (q.total && q.total < o.n) q.note = '준비된 문제가 ' + q.total + '개라서 ' + q.total + '문제만 낼게요.';
    return q;
  }

  /* ---- 예상문제 이어 풀기 (§15, 2026-10-08) ----
   * 새로고침하거나 휴대폰이 뒤에 있던 탭을 다시 불러와도 풀던 곳부터: 그 학생의 p.<id>.quiz 에 낸 문제(사본)·답·순서를 둔다(한 칸).
   * 답을 하나라도 한 뒤에만 남기고, 다 풀면 지운다. 일주일이 지난 것은 버린다. 백업에는 넣지 않는다(잠깐의 상태). */
  var QUIZ_KEEP_MS = 7 * 86400000;
  function saveQuizState(q) {
    if (!q || S.quiz !== q) return;
    if (q.done || !q.answers.some(Boolean)) { if (q.done) store.remove(pk('quiz')); return; }
    store.set(pk('quiz'), {
      v: 1, key: q.key, at: Date.now(), title: q.title, i: q.i, total: q.total, retry: !!q.retry,
      items: q.items.map(function (it) {
        return { p: packProblem(it.p), unit: it.unit, src: it.src, gen: it.gen || null, key: it.key, extra: !!it.extra };
      }),
      answers: q.answers.map(function (a) { return a ? { correct: !!a.correct, given: String(a.given || '') } : null; }),
      ad: q.adaptive ? { level: q.level, okRun: q.okRun, badRun: q.badRun, fromBank: q.fromBank, fromGen: q.fromGen, tries: q.gst ? q.gst.tries : 0 } : null,
    });
    /* 바로 저장한다(모아 쓰기 40ms 를 기다리지 않음) — 사파리는 답한 직후 페이지가 닫히면 밀린 쓰기를 끝내 주지 않았다.
       같은 번에 이 답의 풀이 기록·진도·오답노트도 함께 저장된다 */
    flushStore();
  }
  /* 저장해 둔 이어 풀기 기록(맞는 꼴이고 일주일 안이면) — 없으면 null */
  function storedQuiz() {
    var s = readObj(pk('quiz'));
    if (s.v !== 1 || typeof s.key !== 'string' || s.key.indexOf('#/quiz/') !== 0 || !Array.isArray(s.items) || !s.items.length || !Array.isArray(s.answers)) return null;
    if (Date.now() - num(s.at) > QUIZ_KEEP_MS) return null;
    return s;
  }
  /* 같은 주소의 새 문제지(q)에 저장해 둔 문제·답을 되살린다. 단원 묶음이 다르거나 모양이 틀리면 되살리지 않는다 */
  function restoreQuiz(q) {
    var s = storedQuiz();
    if (!s) {
      if (isObj(store.get(pk('quiz'), null))) store.remove(pk('quiz')); // 오래되었거나 망가진 기록
      return false;
    }
    if (s.key !== q.key) return false;
    var items = [];
    for (var k = 0; k < s.items.length; k++) {
      var it = s.items[k];
      if (!isObj(it) || !isObj(it.p) || typeof it.p.type !== 'string' || typeof it.key !== 'string' || q.unitIds.indexOf(it.unit) < 0) return false;
      items.push({
        p: unpackProblem(JSON.parse(JSON.stringify(it.p))), unit: it.unit, src: it.src === 'gen' || it.src === 'vocab' ? it.src : 'bank',
        gen: typeof it.gen === 'string' ? it.gen : null, key: it.key, extra: !!it.extra,
      });
    }
    q.items = items;
    q.answers = s.answers.slice(0, items.length).map(function (a) {
      return isObj(a) ? { correct: !!a.correct, given: typeof a.given === 'string' ? a.given : '' } : undefined;
    });
    q.i = clamp(Math.floor(num(s.i)), 0, items.length - 1);
    q.total = Math.max(items.length, Math.floor(num(s.total)));
    q.retry = !!s.retry;
    if (q.retry) q.adaptive = false;
    if (q.adaptive && isObj(s.ad)) {
      ['level', 'okRun', 'badRun', 'fromBank', 'fromGen'].forEach(function (f) { if (typeof s.ad[f] === 'number') q[f] = s.ad[f]; });
      /* 이미 낸 문제는 다시 내지 않는다 */
      var used = {};
      items.forEach(function (x) {
        used[x.key] = 1;
        if (q.gst) q.gst.seen[x.src === 'vocab' ? 'vocab|' + x.p.q : problemSig(x.p)] = 1;
      });
      if (q.gst) q.gst.tries = Math.max(q.gst.tries, Math.floor(num(s.ad.tries)));
      (q.levels || []).forEach(function (l) { if (q.pools[l]) q.pools[l].bank = q.pools[l].bank.filter(function (b) { return !used[b.key]; }); });
    }
    q.resumed = true;
    /* 답한 문제에서 [다음 문제]를 누르기 전에 닫혔으면 다음 문제로 */
    if (q.answers[q.i]) advanceQuiz(q);
    return true;
  }
  /* 다음 문제로 (맞춤 난이도면 그때 한 문제를 더 고른다). 더 없으면 끝 */
  function advanceQuiz(q) {
    q.i += 1;
    if (q.i >= q.items.length && q.adaptive && q.items.length < q.total) {
      var nx = drawNext(q);
      if (nx) q.items.push(nx);
      else q.total = q.items.length; // 낼 문제가 더 없으면 여기서 끝
    }
    if (q.i >= q.items.length) finishQuiz();
  }
  function quizResumeCardHtml() {
    var s = storedQuiz();
    if (!s) return '';
    var answered = s.answers.filter(function (a) { return isObj(a); }).length;
    var total = Math.max(s.items.length, Math.floor(num(s.total)));
    return '<a class="continue-card quiz-resume-card" href="' + esc(s.key) + '"><span class="cc-icon" aria-hidden="true">✎</span>' +
      '<span class="cc-text"><span class="cc-label">풀던 예상문제 이어 풀기</span><span class="cc-unit">' + esc(String(s.title || '예상문제')) + '</span>' +
      '<span class="cc-course">' + answered + ' / ' + total + '문제 풀었어요</span></span></a>';
  }

  /* 예상문제 시작은 언제나 새 seed 를 주소에 담는다 — 끝난 문제를 다시 시작해도 새 문제가 나오고, 새로고침하면 같은 문제로 이어진다 */
  function startQuiz(id, params) {
    go('#/quiz/' + encodeURIComponent(id) + qs(Object.assign({}, params, { seed: newSeed() })));
  }

  VIEWS.quiz = function (r) {
    var id = r.parts[1];
    if (!id) return { redirect: '#/home' };
    var course = Tutor.course(id);
    var unitIds;
    if (course) {
      /* 준비 중 단원은 빼고 낸다 */
      var allIds = readyUnits(course).map(function (u) { return u.id; });
      if (!allIds.length) return { redirect: '#/course/' + encodeURIComponent(course.id) };
      var sel = (r.query.units || '').split(',').filter(function (x) { return allIds.indexOf(x) >= 0; });
      unitIds = sel.length ? sel : allIds;
    } else {
      var um = Tutor.unitMeta(id);
      if (um && isSoon(um.unit)) return soonView(um);
      unitIds = [id];
    }
    var n = clamp(parseInt(r.query.n, 10) || 10, 1, 30);
    var lv = ['1', '2', '3', 'mix', 'all'].indexOf(r.query.lv) >= 0 ? r.query.lv : 'mix';
    var gen = r.query.gen || '';
    var concept = r.query.concept !== undefined && r.query.concept !== '' && isFinite(parseInt(r.query.concept, 10)) ? parseInt(r.query.concept, 10) : undefined;
    var key = r.hash;
    return Promise.all(unitIds.map(function (u) {
      return Tutor.loadUnit(u).then(null, function (err) { warn('단원을 불러오지 못해 빼고 냅니다: ' + u, err); return null; });
    })).then(function (loaded) {
      var units = loaded.filter(Boolean);
      if (!units.length) throw new Error('문제를 낼 단원을 불러오지 못했습니다.');
      var meta = Tutor.unitMeta(units[0].id);
      var c = course || (meta ? meta.course : Tutor.course(units[0].course));
      var s = subjectOf(c ? c.subject : '');
      if (!S.quiz || S.quiz.key !== key) {
        S.quiz = newQuiz({
          key: key, id: id, units: units, n: n, lv: lv, gen: gen, concept: concept,
          seed: r.query.seed ? (parseInt(r.query.seed, 10) >>> 0) : newSeed(),
          title: (course ? course.title : E.plain(units[0].title)) + ' 예상문제',
          back: course ? '#/course/' + encodeURIComponent(course.id) : '#/unit/' + encodeURIComponent(units[0].id) + '/' + (lv === '3' ? 'advanced' : 'practice'),
          subject: s.id,
        });
        restoreQuiz(S.quiz); // 같은 문제지를 풀다 닫혔으면 그 자리부터(§15)
      }
      var q = S.quiz;
      return {
        title: q.title, tab: 'home', back: q.back, subject: q.subject, cls: 'quiz-page',
        html: '<h2 class="sr-only page-title" tabindex="-1">' + esc(q.title) + '</h2><div class="quiz" id="quiz"></div>',
        focus: '.pq',
        mount: function (page) { drawQuiz($('#quiz', page), false); },
      };
    });
  };

  function drawQuiz(host, focus) {
    var q = S.quiz;
    if (!q.items.length) {
      host.innerHTML = '<div class="state-box"><p>' + esc(q.gen ? '이 문제를 만들 수 없어요. 문제 엔진(js/mathlib.js)을 확인해 주세요.' : '이 조건에 맞는 문제가 아직 없어요. 난이도를 바꿔 보세요.') + '</p>' +
        '<a class="btn primary" href="' + esc(q.back) + '">돌아가기</a></div>';
      return;
    }
    if (q.done) { drawResult(host, focus); return; }
    saveQuizState(q); // 이어 풀기(§15) — 답을 하나라도 한 뒤부터
    var resumeNote = q.resumed ? say({ m: '지난번에 풀던 곳부터 이어서 풀어요.', h: '지난번에 풀던 곳부터 이어서 풉니다.' }) : '';
    q.resumed = false;
    var item = q.items[q.i];
    var p = item.p;
    var total = q.total;
    var levelNote = q.levelNote === 'up' ? say({ e: '잘하고 있어요! 이제 조금 더 어려운 문제를 내 볼게요.', m: '잘하고 있어요! 이제 한 단계 어려운 문제를 낼게요.', h: '잘하고 있습니다. 이제 한 단계 어려운 문제를 냅니다.' }) :
      q.levelNote === 'down' ? say({ e: '괜찮아요. 조금 쉬운 문제로 다시 다져 볼게요.', m: '조금 쉬운 문제로 다시 다져 볼게요.', h: '한 단계 쉬운 문제로 다시 다져 봅시다.' }) : '';
    q.levelNote = '';
    host.innerHTML = '<div class="quiz-head"><p class="quiz-count"><span class="sr-only">문제 </span><strong>' + (q.i + 1) + '</strong> / ' + total + '</p>' +
      '<span class="badge lv-badge lv-' + (p.level || 1) + '">' + (LEVEL_NAMES[p.level || 1] || '기본') + '</span>' +
      (item.src !== 'bank' ? '<span class="badge new-badge" title="풀 때마다 새로 만드는 문제">새 문제</span>' : '') +
      (item.extra ? '<span class="badge extra-badge">비슷한 문제</span>' : '') +
      (q.retry ? '<span class="badge retry-badge">다시 풀기</span>' : '') + '</div>' +
      '<div class="pbar quiz-bar" aria-hidden="true"><span class="pbar-fill" style="width:' + Math.round((100 * q.i) / Math.max(1, total)) + '%"></span></div>' +
      (q.note && q.i === 0 ? '<p class="notice small">' + esc(q.note) + '</p>' : '') +
      (resumeNote ? '<p class="notice small resume-note" role="status">' + esc(resumeNote) + '</p>' : '') +
      (levelNote ? '<p class="notice small level-note" role="status">' + esc(levelNote) + '</p>' : '') +
      '<div class="pw-host"></div>';
    var w = problemWidget(p, {
      rnd: q.rnd,
      report: { unit: item.unit, kind: 'problem', ref: problemRef(p), q: p.q },
      more: function () {
        var idx = typeof p.concept === 'number' ? p.concept : null;
        var sim = similarFor(q, item);
        if (idx === null && !sim) return null;
        return {
          unitId: item.unit, idx: idx,
          onSimilar: sim ? function () {
            if (S.quiz !== q || q.items[q.i] !== item) return;
            q.items.splice(q.i + 1, 0, sim);
            q.total += 1;
            q.i += 1;
            drawQuiz(host, true);
          } : null,
        };
      },
      onGraded: function (res, after) {
        onQuizAnswer(item, res);
        saveQuizState(q);
        var last = q.i >= q.total - 1;
        after.innerHTML = '<button type="button" class="btn primary big wide quiz-next">' + (last ? '결과 보기' : '다음 문제 ›') + '</button>';
        var nb = $('.quiz-next', after);
        nb.addEventListener('click', function () {
          advanceQuiz(q);
          drawQuiz(host, true);
        });
        nb.focus();
      },
    });
    $('.pw-host', host).appendChild(w.el);
    if (focus) {
      window.scrollTo(0, 0);
      w.focus();
    } else {
      setTimeout(function () { if (doc.body.contains(w.el)) w.focus(); }, 0); // 주소로 바로 열어도 문제에 초점
    }
  }

  function onQuizAnswer(item, res) {
    var q = S.quiz;
    q.answers[q.i] = { correct: res.correct, given: res.given };
    if (q.adaptive && !q.retry) adaptAfter(q, res.correct);
    updateProgress(item.unit, function (u) {
      u.solved += 1;
      if (res.correct) u.correct += 1;
    });
    logItem(item, res);
    if (!res.correct) addNote(item, res.given, causeText(res.why));
  }

  function finishQuiz() {
    var q = S.quiz;
    q.done = true;
    store.remove(pk('quiz')); // 다 풀었다 — 이어 풀기 기록을 지운다(§15)
    if (q.retry) return;
    var per = {};
    q.items.forEach(function (it, i) {
      var a = q.answers[i];
      if (!a) return;
      per[it.unit] = per[it.unit] || { n: 0, c: 0 };
      per[it.unit].n += 1;
      if (a.correct) per[it.unit].c += 1;
    });
    Object.keys(per).forEach(function (uid) {
      var pct = Math.round((100 * per[uid].c) / per[uid].n);
      updateProgress(uid, function (u) { u.best = Math.max(u.best, pct); });
    });
  }

  function drawResult(host, focus) {
    var q = S.quiz;
    var total = q.items.length;
    var right = q.answers.filter(function (a) { return a && a.correct; }).length;
    var pct = total ? Math.round((100 * right) / total) : 0;
    var s = subjectOf(q.subject);
    var msg = pct === 100 ? say({ e: '모두 맞혔어요! 정말 대단해요.', m: '모두 맞혔어요! 아주 잘했어요.', h: '모두 맞혔습니다. 훌륭합니다.' }) :
      pct >= 70 ? say({ e: '잘했어요! 틀린 문제만 다시 보면 완벽해요.', m: '잘했어요! 틀린 문제만 다시 보면 완벽해요.', h: '잘했습니다. 틀린 문제만 다시 확인해 봅시다.' }) :
        say({ e: '괜찮아요. 틀린 문제를 다시 풀어 보면 실력이 쑥 늘어요.', m: '괜찮아요. 틀린 문제를 다시 풀면 실력이 늘어요.', h: '틀린 문제를 다시 풀어 보면 실력이 늡니다. 개념을 한 번 더 보는 것도 좋습니다.' });
    var wrong = [];
    q.items.forEach(function (it, i) { if (!q.answers[i] || !q.answers[i].correct) wrong.push({ it: it, a: q.answers[i] }); });
    var html = bubble(s, para(msg)) +
      '<section class="result card" aria-labelledby="resTitle"><h2 class="page-title" id="resTitle" tabindex="-1">결과</h2>' +
      '<p class="score"><strong>' + right + '</strong><span> / ' + total + '</span></p>' +
      '<p class="score-sub">' + total + '문제 중 ' + right + '문제를 맞혔어요 · ' + pct + '점</p>' +
      progressBar(pct, '') + '</section>';
    /* 다시 볼 개념(§18 — 오답 분석·복습 추천): 틀린 문제가 묶인 개념 카드를 많이 틀린 차례로, 그 카드로 바로 간다 */
    var again = {}, order = 0;
    wrong.forEach(function (w) {
      var ci = w.it.p && typeof w.it.p.concept === 'number' ? w.it.p.concept : -1;
      var u = w.it.unit ? Tutor.units[w.it.unit] : null;
      if (ci < 0 || !u || !Array.isArray(u.concepts) || !u.concepts[ci]) return;
      var k = u.id + '#' + ci;
      if (!again[k]) again[k] = { u: u, i: ci, n: 0, at: order++ };
      again[k].n += 1;
    });
    var againList = Object.keys(again).map(function (k) { return again[k]; })
      .sort(function (a, b) { return b.n - a.n || a.at - b.at; }).slice(0, 5);
    var manyUnits = againList.some(function (x) { return x.u.id !== againList[0].u.id; });
    if (againList.length) {
      html += '<section class="again-box" aria-labelledby="againTitle"><h3 class="section-title" id="againTitle">다시 볼 개념</h3>' +
        '<p class="muted small">' + esc(say({ e: '틀린 문제와 이어진 개념 카드예요. 한 번 더 보고 다시 풀어 봐요.', m: '틀린 문제와 이어진 개념 카드예요. 한 번 더 보고 다시 풀어 봐요.', h: '틀린 문제와 이어진 개념 카드입니다. 한 번 더 보고 다시 풀어 봅시다.' })) + '</p>' +
        '<ul class="again-list">' + againList.map(function (x) {
          return '<li class="card again-item"><a class="link again-link" href="#/unit/' + encodeURIComponent(x.u.id) + '/learn?card=' + x.i + '">' + E.inline(x.u.concepts[x.i].title) + '</a>' +
            '<span class="muted small">' + (manyUnits ? esc(E.plain(x.u.title)) + ' · ' : '') + '틀린 문제 ' + x.n + '개</span></li>';
        }).join('') + '</ul></section>';
    }
    if (wrong.length) {
      html += '<section class="wrong-box"><h3 class="section-title">틀린 문제 ' + wrong.length + '개</h3><ol class="wrong-list">' + wrong.map(function (w) {
        return '<li class="card"><div class="rich">' + E.render(w.it.p.q) + '</div>' +
          '<p class="wl-given"><span class="wl-label">내 답</span> ' + esc(w.a && w.a.given ? w.a.given : '(풀지 않음)') + '</p>' +
          '<div class="wl-answer"><span class="wl-label">정답</span> ' + answerHtml(w.it.p) + '</div></li>';
      }).join('') + '</ol><p class="muted">틀린 문제는 오답노트에 모아 두었어요.</p></section>';
    }
    html += '<div class="action-row result-actions">' +
      (wrong.length ? '<button type="button" class="btn primary big" data-act="retry-wrong">틀린 문제 다시 풀기</button>' : '') +
      '<button type="button" class="btn big" data-act="more">비슷한 문제 더 풀기</button>' +
      '<a class="btn big ghost" href="' + esc(q.back) + '">' + (q.back.indexOf('#/course/') === 0 ? '과정으로 돌아가기' : '단원으로 돌아가기') + '</a></div>';
    host.innerHTML = html;
    host.addEventListener('click', function handler(e) {
      var b = e.target.closest('[data-act]');
      if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'retry-wrong') {
        host.removeEventListener('click', handler);
        var again = wrong.map(function (w) { return w.it; });
        S.quiz = Object.assign({}, q, { items: again, total: again.length, i: 0, answers: [], done: false, retry: true, adaptive: false, note: '', levelNote: '' });
        drawQuiz(host, true);
      } else if (act === 'more') {
        host.removeEventListener('click', handler);
        S.quiz = newQuiz({ key: q.key, id: q.id, units: q.units, n: q.n, lv: q.lv, gen: q.gen, concept: q.concept, seed: newSeed(), title: q.title, back: q.back, subject: q.subject });
        drawQuiz(host, true);
      }
    });
    if (focus) {
      window.scrollTo(0, 0);
      var t = $('#resTitle', host);
      if (t) t.focus({ preventScroll: true });
    }
  }

  /* ================= 질문 (대화) ================= */

  var CHIPS = {
    math: {
      e: ['36 + 47', '3/4 ÷ 2/5', '12와 18의 최대공약수', '분수의 나눗셈이 뭐예요?'],
      m: ['2x+3=7', '3/4 ÷ 2/5', '12와 18의 최대공약수', '일차부등식이 뭐예요?'],
      h: ['x^2-5x+6=0', 'x^3-2x+1 미분', '2x+3>7', '함수가 뭐예요?'],
    },
    kor: ['비유법이 뭐예요?', '받침이 뭐예요?', '설명문과 논설문은 어떻게 달라요?'],
    eng: ['현재완료가 뭐예요?', 'be동사는 언제 써요?', '복수형은 어떻게 만들어요?'],
    sci: ['광합성이 뭐예요?', '용해가 뭐예요?', '3.5km는 몇 m'],
    soc: ['민주주의가 뭐예요?', '지도에서 방위는 어떻게 봐요?', '200의 15%'],
    hist: ['고조선은 언제 세워졌어요?', '훈민정음은 누가 만들었어요?', '삼국 통일은 언제예요?'],
    life: ['봄에는 어떤 꽃이 피어요?', '손은 언제 씻어요?', '우리 동네에는 무엇이 있어요?'],
  };
  function exampleChips(subject) {
    var c = CHIPS[subject];
    if (!c) return ['무엇을 배우나요?'];
    if (Array.isArray(c)) return c;
    return c[toneOf(S.profile)] || c.m;
  }

  /* 질문 검색 색인: data/index/<과목>-<학교급>.js (과정의 학교급, 없으면 학생의 학교급).
     그 파일이 없으면 data/index/<과목>.js 로 한 번 더 (예전 이름·시험용 가짜 데이터) */
  function ctxLevel(ctx) {
    var c = ctx.course ? Tutor.course(ctx.course) : null;
    if (c && c.level) return c.level;
    var gi = gradeInfo(ctx.grade);
    return gi ? gi.level.id : '';
  }
  function indexNames(ctx) {
    var lv = ctxLevel(ctx);
    return lv ? [ctx.subject + '-' + lv, ctx.subject] : [ctx.subject];
  }
  function loadSearch(ctx) {
    return loadSearchNames(indexNames(ctx));
  }
  function loadSearchNames(names) {
    var key = names[0];
    if (S.search[key]) return S.search[key];
    var p = Tutor.loadIndex(names[0]).then(null, function (err) {
      if (names.length < 2) throw err;
      return Tutor.loadIndex(names[1]);
    }).then(function (entries) {
      if (!E.canSearch()) throw new Error('검색 엔진(js/search.js)이 없습니다.');
      return E.build(entries);
    });
    S.search[key] = p;
    p.then(null, function () { delete S.search[key]; });
    return p;
  }

  function bigrams(s) {
    s = String(s || '').toLowerCase().replace(/[^0-9a-z가-힣]/g, '');
    var out = {};
    for (var i = 0; i < s.length - 1; i++) out[s.substr(i, 2)] = 1;
    return out;
  }
  function overlap(a, b) { var n = 0; for (var k in a) if (b[k]) n += 1; return n; }

  /* 모를 때 권할 단원: 같은 과목에서 질문과 글자가 겹치는 단원, 없으면 지금 과정의 앞 단원들 */
  function suggestUnits(text, ctx) {
    var gi = gradeInfo(ctx.grade);
    var qb = bigrams(text);
    var cands = [];
    (cat().courses || []).forEach(function (c) {
      if (c.subject !== ctx.subject) return;
      var mine = (c.grades || []).indexOf(ctx.grade) >= 0;
      var sameLevel = gi && c.level === gi.level.id;
      if (!mine && !sameLevel && c.id !== ctx.course) return;
      (c.units || []).forEach(function (u) {
        if (isSoon(u)) return; // 준비 중인 단원은 권하지 않는다
        var sc = overlap(qb, bigrams(u.title + ' ' + (u.summary || '')));
        cands.push({ id: u.id, title: E.plain(u.title), courseTitle: c.title, score: sc * 10 + (c.id === ctx.course ? 2 : mine ? 1 : 0) });
      });
    });
    var hits = cands.filter(function (c) { return c.score >= 10; }).sort(function (a, b) { return b.score - a.score; });
    if (hits.length) return hits.slice(0, 3);
    var fallback = cands.filter(function (c) { return c.score >= 1; });
    if (ctx.unit) fallback = fallback.filter(function (c) { return c.id !== ctx.unit; });
    return fallback.slice(0, 3);
  }

  function unitTitleOf(entry) {
    var meta = entry.unit ? Tutor.unitMeta(entry.unit) : null;
    return meta ? E.plain(meta.unit.title) : '';
  }

  var REF_TAB = {
    concepts: 'learn', concept: 'learn', learn: 'learn', terms: 'learn', term: 'learn', vocab: 'learn', goals: 'learn', unit: 'learn',
    examples: 'examples', example: 'examples', practice: 'practice', advanced: 'advanced', deeper: 'advanced',
    faq: 'ask', mistakes: 'ask', mistake: 'ask', ask: 'ask',
  };
  function refHash(entry) {
    if (!entry.unit) return entry.course ? '#/course/' + encodeURIComponent(entry.course) : '#/home';
    var ref = isObj(entry.ref) ? entry.ref : {};
    var tab = REF_TAB[ref.tab] || 'learn';
    var idx = typeof ref.idx === 'number' ? ref.idx : null;
    var q = {};
    if (idx !== null) {
      if (ref.tab === 'concepts' || ref.tab === 'concept') q.card = idx;
      else if (ref.tab === 'terms' || ref.tab === 'term') q.term = idx;
      else if (ref.tab === 'examples' || ref.tab === 'example') q.ex = idx;
      else if (ref.tab === 'faq') q.faq = idx;
    }
    if (ref.tab === 'vocab') q.vocab = 1;
    return '#/unit/' + encodeURIComponent(entry.unit) + '/' + tab + qs(q);
  }

  function intentReply(intent) {
    var t = {
      greeting: { e: '안녕하세요! 궁금한 것을 편하게 물어보세요.', m: '안녕하세요! 궁금한 것을 편하게 물어보세요.', h: '안녕하세요. 궁금한 것을 물어보세요.' },
      thanks: { e: '천만에요! 또 궁금한 게 있으면 언제든 물어보세요.', m: '천만에요! 또 궁금한 게 있으면 언제든 물어보세요.', h: '천만에요. 언제든 물어보세요.' },
      help: { e: '개념은 "○○이 뭐예요?" 처럼, 계산은 "3/4 ÷ 2/5" 처럼 식을 써서 물어보세요.', m: '개념은 "○○이 뭐예요?" 처럼, 계산은 "2x+3=7" 처럼 식을 써서 물어보세요.', h: '개념은 "○○이란?" 처럼, 계산은 식을 그대로 써서 물어보세요.' },
      bye: { e: '오늘도 수고했어요! 다음에 또 만나요.', m: '오늘도 수고했어요! 다음에 또 만나요.', h: '수고하셨습니다. 다음에 또 뵙겠습니다.' },
    }[intent];
    return t ? para(say(t)) : null;
  }

  function solverReply(sol) {
    var steps = Array.isArray(sol.steps) ? sol.steps : [];
    var many = steps.length > 1;
    return '<div class="sol">' + (sol.title ? '<p class="sol-title">' + E.inline(sol.title) + '</p>' : '') +
      para(say({ e: '한 단계씩 같이 풀어 봐요.', m: '한 단계씩 풀어 볼게요.', h: '한 단계씩 풀어 보겠습니다.' })) +
      '<ol class="sol-steps">' + steps.map(function (st, i) {
        return '<li' + (i ? ' hidden' : '') + '><div class="rich">' + E.render(st) + '</div></li>';
      }).join('') + '</ol>' +
      '<div class="sol-answer"' + (many ? ' hidden' : '') + '><span class="ans-label">답</span> <span class="ans-body">' + E.inline(sol.answer) + '</span></div>' +
      (many ? '<div class="sol-actions"><button type="button" class="btn small primary" data-act="sol-next">다음 단계</button>' +
        '<button type="button" class="btn small ghost" data-act="sol-all">한 번에 보기</button></div>' : '') + '</div>';
  }

  function searchReply(results, ctx) {
    var top = results[0].entry;
    var ut = unitTitleOf(top) || E.plain(top.title || '');
    var title = E.plain(top.title || '');
    var lead;
    if (top.kind === 'faq') lead = say({ m: '비슷한 질문이 있어요.', h: '비슷한 질문이 있습니다.' });
    else if (top.kind === 'term') lead = say({ m: '‘' + title + '’' + josa(title, '은/는') + ' ‘' + ut + '’에 나오는 말이에요.', h: '‘' + title + '’' + josa(title, '은/는') + ' ‘' + ut + '’에 나오는 말입니다.' });
    else if (top.kind === 'mistake') lead = say({ m: '‘' + ut + '’에서 많이 하는 실수와 관련 있어요.', h: '‘' + ut + '’에서 많이 하는 실수와 관련 있습니다.' });
    else lead = say({ m: '‘' + ut + '’에서 배우는 내용이에요.', h: '‘' + ut + '’에서 배우는 내용입니다.' });
    var out = para(lead) +
      '<div class="found"><p class="found-title">' + esc(title) + '</p>' + (top.text ? '<p class="found-text">' + esc(top.text) + '</p>' : '') + '</div>' +
      '<p class="found-go"><a class="btn small primary" href="' + esc(refHash(top)) + '">자세히 보기</a></p>';
    var seenT = {};
    seenT[top.id] = 1;
    var others = results.slice(1).filter(function (x) {
      if (seenT[x.entry.id] || (x.entry.title === top.title && x.entry.unit === top.unit)) return false;
      seenT[x.entry.id] = 1;
      return true;
    }).slice(0, 2);
    if (others.length) {
      out += '<p class="others-label">' + esc(say({ m: '이것도 살펴보세요', h: '함께 살펴볼 내용' })) + '</p><ul class="others">' + others.map(function (o) {
        var u = unitTitleOf(o.entry);
        var ot = E.plain(o.entry.title);
        return '<li><a href="' + esc(refHash(o.entry)) + '">' + esc(ot) + (u && u !== ot ? ' <span class="muted">· ' + esc(u) + '</span>' : '') + '</a></li>';
      }).join('') + '</ul>';
    }
    return out;
  }

  function unknownReply(text, ctx, extra) {
    var sugg = suggestUnits(text, ctx);
    var lv = S.profile ? S.profile.level : '';
    var ask = lv === 'univ' || lv === 'adult' ? '전문가나 믿을 만한 자료에서도 확인해 보세요.' :
      lv === 'high' ? '학교 선생님께도 여쭤 보세요.' : '학교 선생님이나 부모님께도 여쭤 보세요.';
    return (extra || '') + '<div class="unknown">' +
      para(say({ e: '그 질문은 아직 제가 잘 몰라요. 이런 단원을 살펴보면 도움이 될 거예요.', m: '그 질문은 아직 제가 잘 몰라요. 이런 단원을 살펴보면 도움이 될 거예요.', h: '그 질문은 아직 제가 잘 모릅니다. 아래 단원을 살펴보면 도움이 될 것입니다.' })) +
      (sugg.length ? '<ul class="others">' + sugg.map(function (u) {
        return '<li><a href="#/unit/' + encodeURIComponent(u.id) + '/learn">' + esc(u.title) + ' <span class="muted">· ' + esc(u.courseTitle) + '</span></a></li>';
      }).join('') + '</ul>' : '') +
      '<p class="muted">' + esc(ask) + '</p></div>';
  }

  /* 내 학교급 색인에 없으면 가까운 학교급에서 찾아 본다: 앞서 궁금해진 것(위 학교급)부터, 그다음 지난 학교급.
     그 과목·학교급에 내용이 있는 과정이 있을 때만 색인을 싣는다(없는 파일을 부르지 않는다). 못 찾으면 null */
  var LEVEL_ORDER = ['elem', 'mid', 'high', 'univ', 'adult'];
  var NEAR_LEVELS = { elem: ['mid'], mid: ['high', 'elem'], high: ['univ', 'mid'], univ: ['high', 'adult'], adult: ['high', 'mid'] };
  function hasReadyCourse(subject, level) {
    return (cat().courses || []).some(function (c) { return c.subject === subject && c.level === level && !courseSoon(c); });
  }
  function nearLevelReply(text, ctx) {
    var mine = ctxLevel(ctx);
    var order = (NEAR_LEVELS[mine] || []).filter(function (lv) { return hasReadyCourse(ctx.subject, lv); });
    var i = 0;
    function next() {
      if (i >= order.length) return null;
      var lv = order[i++];
      return loadSearchNames([ctx.subject + '-' + lv]).then(function (index) {
        var res = E.query(index, text, { subject: ctx.subject, limit: 5 });
        if (!res.length) return next();
        var L = (cat().levels || []).filter(function (x) { return x.id === lv; })[0];
        var name = L ? L.name : lv;
        var ahead = LEVEL_ORDER.indexOf(lv) > LEVEL_ORDER.indexOf(mine);
        var lead = lv === 'adult' ? say({ m: '이건 성인 과정에서 다루는 내용이에요. 함께 살펴볼까요?', h: '이 내용은 성인 과정에서 다룹니다. 함께 살펴봅시다.' }) : ahead ?
          say({ e: '이건 ' + name + '에서 배우는 내용이에요. 조금 어려울 수 있지만 미리 살펴볼까요?', m: '이건 ' + name + '에서 배우는 내용이에요. 미리 살펴볼까요?', h: '이 내용은 ' + name + ' 과정에서 다룹니다. 미리 살펴봅시다.' }) :
          say({ m: '이건 ' + name + '에서 배운 내용이에요. 다시 살펴볼까요?', h: '이 내용은 ' + name + ' 과정에서 다룹니다. 다시 살펴봅시다.' });
        return para(lead) + searchReply(res, ctx);
      }, next);
    }
    return Promise.resolve(next());
  }

  function answerFor(text, ctx) {
    var intent = E.intent(text);
    if (intent) {
      var ir = intentReply(intent);
      if (ir) return Promise.resolve(ir);
    }
    var sol = E.solve(text, ctx.grade);
    if (sol) return Promise.resolve(solverReply(sol));
    return loadSearch(ctx).then(function (index) {
      var res = E.query(index, text, { grade: ctx.grade, course: ctx.course, unit: ctx.unit, subject: ctx.subject, limit: 5 });
      if (res.length) return searchReply(res, ctx);
      return nearLevelReply(text, ctx).then(function (html) { return html || unknownReply(text, ctx); });
    }, function () {
      return unknownReply(text, ctx, para(say({ m: '색인을 불러오지 못해서 지금은 배운 내용에서 찾아볼 수 없어요. 계산 문제는 풀 수 있어요.', h: '색인을 불러오지 못해 지금은 배운 내용에서 찾을 수 없습니다. 계산 문제는 풀 수 있습니다.' })));
    });
  }

  /* ---- 대화 저장 (§9.2 p.<id>.chat) ----
   * 학습 연속성에 필요한 만큼만: 과목마다 최근 30개, 글자만 { 과목: [{ who: 'me'|'t', text, t, u?(단원 질문 탭) }] }.
   * 서식(HTML)은 저장하지 않는다 — 저장소·백업 파일에서 온 글은 언제나 글자로만 보여 준다. */
  var CHAT_MAX = 30;
  function chatAll() { return readObj(pk('chat')); }
  function chatSaved(ctx) {
    var list = chatAll()[ctx.subject];
    if (!Array.isArray(list)) return [];
    return list.filter(function (m) {
      return isObj(m) && (m.who === 'me' || m.who === 't') && typeof m.text === 'string' && m.text &&
        (typeof m.u === 'string' ? m.u : '') === (ctx.unit || '');
    }).map(function (m) { return { who: m.who, text: m.text.slice(0, 2000), past: true }; });
  }
  function chatSave(ctx, m) {
    if (!S.profile || !m.text) return;
    var all = chatAll();
    var list = Array.isArray(all[ctx.subject]) ? all[ctx.subject].filter(isObj) : [];
    var rec = { who: m.who, text: String(m.text).slice(0, 2000), t: Date.now() };
    if (ctx.unit) rec.u = ctx.unit;
    list.push(rec);
    if (list.length > CHAT_MAX) list = list.slice(list.length - CHAT_MAX);
    all[ctx.subject] = list;
    store.set(pk('chat'), all);
  }
  /* 지금 보이는 대화(과목 질문 화면이면 그 화면, 단원 질문 탭이면 그 단원)만 지운다 */
  function chatClear(ctx) {
    var all = chatAll();
    var list = Array.isArray(all[ctx.subject]) ? all[ctx.subject] : [];
    list = list.filter(function (m) { return isObj(m) && (typeof m.u === 'string' ? m.u : '') !== (ctx.unit || ''); });
    if (list.length) all[ctx.subject] = list; else delete all[ctx.subject];
    if (Object.keys(all).length) store.set(pk('chat'), all); else store.remove(pk('chat'));
  }
  /* 답 HTML → 저장할 글자 (수식은 읽는 글자로, 버튼·화면 낭독용 글은 뺀다). 스크립트·그림을 싣지 않는 빈 문서에서 읽는다 */
  var BLOCK_TAG = /^(P|LI|OL|UL|DIV|H[1-6]|SECTION|TABLE|TR|BLOCKQUOTE|FIGURE)$/;
  function replyText(html) {
    var d;
    try { d = doc.implementation.createHTMLDocument(''); } catch (e) { d = doc; }
    var box = d.createElement('div');
    box.innerHTML = String(html || '');
    $$('button, .sr-only, .sol-actions, .found-go, svg', box).forEach(function (el) { if (el.parentNode) el.parentNode.removeChild(el); });
    var out = [];
    (function walk(node) {
      for (var c = node.firstChild; c; c = c.nextSibling) {
        if (c.nodeType === 3) { out.push(c.nodeValue); continue; }
        if (c.nodeType !== 1) continue;
        if (c.getAttribute('role') === 'math' && c.hasAttribute('aria-label')) { out.push(c.getAttribute('aria-label')); continue; }
        if (c.tagName === 'BR') { out.push('\n'); continue; }
        var block = BLOCK_TAG.test(c.tagName);
        if (block) out.push('\n');
        walk(c);
        if (block) out.push('\n');
      }
    })(box);
    return out.join('').replace(/[ \t ]+/g, ' ').replace(/ ?\n ?/g, '\n').replace(/\n{2,}/g, '\n').trim().slice(0, 2000);
  }

  function chatBox(ctx) {
    var log = S.chats[ctx.key] || (S.chats[ctx.key] = chatSaved(ctx));
    var s = ctx.s;
    var tn = teacherName(s);
    var intro = ctx.unitObj ?
      say({
        e: '‘' + E.plain(ctx.unitObj.title) + '’에서 궁금한 것을 물어보세요. 계산 문제를 쓰면 풀이 과정을 보여 줄게요.',
        m: '‘' + E.plain(ctx.unitObj.title) + '’에서 궁금한 것을 물어보세요. 계산 문제를 쓰면 풀이 과정을 보여 줄게요.',
        h: '‘' + E.plain(ctx.unitObj.title) + '’에 대해 궁금한 것을 물어보세요. 계산 문제를 쓰면 풀이 과정을 보여 드립니다.',
      }) :
      say({
        e: tn + '에게 무엇이든 물어보세요. 배운 내용에서 찾아 알려 줄게요.',
        m: tn + '에게 무엇이든 물어보세요. 배운 내용에서 찾아 알려 줄게요.',
        h: tn + '에게 무엇이든 물어보세요. 배운 내용에서 찾아 알려 드립니다.',
      });
    function msgHtml(m) {
      var past = m.past ? ' past' : '';
      if (m.who === 'me') return '<li class="msg me' + past + '"><div class="msg-bubble"><span class="sr-only">나: </span>' + esc(m.text) + '</div></li>';
      /* 이번에 받은 답은 서식 그대로(html), 저장해 둔 지난 답은 글자로만 */
      var body = typeof m.html === 'string' ? m.html : '<p class="past-text">' + esc(m.text).replace(/\n/g, '<br>') + '</p>';
      return '<li class="msg t' + past + '"><div class="avatar" aria-hidden="true">' + esc(s.icon || '🧑‍🏫') + '</div>' +
        '<div class="msg-bubble"><span class="sr-only">' + esc(tn) + ': </span>' + body + '</div></li>';
    }
    var hasPast = log.some(function (m) { return m.past; });
    var chips = exampleChips(ctx.subject);
    var html = '<section class="chat-wrap" aria-label="' + esc(tn) + '에게 질문하기">' +
      '<p class="notice small index-note" hidden></p>' +
      '<ol class="chat" aria-live="polite" aria-relevant="additions">' + msgHtml({ who: 't', html: para(intro) }) +
      (hasPast ? '<li class="chat-sep"><span>지난 대화</span></li>' : '') + log.map(msgHtml).join('') + '</ol>' +
      '<div class="chips ask-chips" role="group" aria-label="이렇게 물어보세요">' + chips.map(function (c) {
        return '<button type="button" class="chip" data-ask="' + esc(c) + '">' + esc(c) + '</button>';
      }).join('') + '</div>' +
      '<form class="ask-form" novalidate><label class="sr-only" for="askInput">질문</label>' +
      '<input id="askInput" class="text-input" type="text" maxlength="200" autocomplete="off" enterkeyhint="send" placeholder="궁금한 것을 물어보세요">' +
      '<button type="submit" class="btn primary">보내기</button></form>' +
      '<div class="ask-foot"><p class="muted small ask-privacy">질문은 이 기기 안에서만 찾아 답해요. 대화는 이 기기에만 저장돼요(과목마다 최근 ' + CHAT_MAX + '개).</p>' +
      '<button type="button" class="btn small ghost" data-act="chat-clear">대화 기록 지우기</button></div></section>';

    return {
      html: html,
      mount: function (page) {
        var wrap = $('.chat-wrap', page);
        var ol = $('.chat', wrap);
        var form = $('.ask-form', wrap);
        var inp = $('#askInput', wrap);
        var busy = false;

        function append(m) {
          log.push(m);
          /* 이 기기에만, 글자로만 저장한다 */
          chatSave(ctx, { who: m.who, text: m.who === 'me' ? m.text : replyText(m.html) });
          var tmp = doc.createElement('ol');
          tmp.innerHTML = msgHtml(m);
          var li = tmp.firstChild;
          li.__msg = m;
          ol.appendChild(li);
          li.scrollIntoView({ block: 'nearest' });
          return li;
        }
        function ask(text) {
          text = String(text || '').replace(/\s+/g, ' ').trim();
          if (!text || busy) return;
          busy = true;
          append({ who: 'me', text: text });
          inp.value = '';
          var wait = doc.createElement('li');
          wait.className = 'msg t wait';
          wait.innerHTML = '<div class="avatar" aria-hidden="true">' + esc(s.icon || '🧑‍🏫') + '</div><div class="msg-bubble">찾아보는 중이에요…</div>';
          ol.appendChild(wait);
          answerFor(text, ctx).then(function (h) {
            if (wait.parentNode) wait.parentNode.removeChild(wait);
            append({ who: 't', html: h });
            busy = false;
          }, function (err) {
            report(err);
            if (wait.parentNode) wait.parentNode.removeChild(wait);
            append({ who: 't', html: unknownReply(text, ctx) });
            busy = false;
          });
        }
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          ask(inp.value);
          inp.focus();
        });
        wrap.addEventListener('click', function (e) {
          var chip = e.target.closest('[data-ask]');
          if (chip) { ask(chip.getAttribute('data-ask')); return; }
          var b = e.target.closest('[data-act]');
          if (!b) return;
          var act = b.getAttribute('data-act');
          if (act === 'chat-clear') {
            confirmBox({
              title: '대화 기록을 지울까요?',
              body: '이 화면의 질문과 답이 이 기기에서 지워져요.',
              ok: '지우기', danger: true,
            }).then(function (yes) {
              if (!yes) return;
              chatClear(ctx);
              log.length = 0;
              $$('li.msg', ol).slice(1).forEach(function (li) { li.parentNode.removeChild(li); });
              $$('.chat-sep', ol).forEach(function (li) { li.parentNode.removeChild(li); });
              announce('대화 기록을 지웠어요.');
              inp.focus();
            });
            return;
          }
          if (act !== 'sol-next' && act !== 'sol-all') return;
          var box = b.closest('.sol');
          var hidden = $$('.sol-steps > li', box).filter(function (li) { return li.hidden; });
          if (act === 'sol-all') hidden.forEach(function (li) { li.hidden = false; });
          else if (hidden.length) hidden[0].hidden = false;
          var left = $$('.sol-steps > li', box).filter(function (li) { return li.hidden; }).length;
          if (!left) {
            $('.sol-answer', box).hidden = false;
            var acts = $('.sol-actions', box);
            if (acts) acts.parentNode.removeChild(acts);
            inp.focus();
          }
          var msgLi = box.closest('li.msg');
          if (msgLi && msgLi.__msg) msgLi.__msg.html = $('.msg-bubble', msgLi).innerHTML.replace(/^<span class="sr-only">[^<]*<\/span>/, '');
        });
        /* 저장해 둔 대화의 풀이 상태도 다시 이어지게 */
        $$('li.msg', ol).forEach(function (li, i) { if (i > 0) li.__msg = log[i - 1]; });
        /* 색인을 미리 불러 둔다. 실패하면 알린다(계산 풀이는 계속 된다) */
        loadSearch(ctx).then(null, function () {
          var note = $('.index-note', wrap);
          note.innerHTML = esc('색인을 불러오지 못했어요. 계산 문제 풀이만 할 수 있어요.') + ' <button type="button" class="btn small ghost" data-act="index-retry">다시 시도</button>';
          note.hidden = false;
          $('[data-act="index-retry"]', note).addEventListener('click', function () {
            note.hidden = true;
            loadSearch(ctx).then(function () { announce('색인을 불러왔어요.'); }, function () { note.hidden = false; });
          });
        });
        return {
          lastAsked: function (q) {
            for (var i = log.length - 1; i >= 0; i--) if (log[i].who === 'me') return log[i].text === q;
            return false;
          },
          say: function (q, answerHtmlText) {
            append({ who: 'me', text: q });
            append({ who: 't', html: answerHtmlText });
          },
        };
      },
    };
  }

  VIEWS.ask = function (r) {
    var subjId = r.parts[1];
    var p = S.profile;
    if (!subjId) {
      var gi = gradeInfo(p.grade);
      var mine = Tutor.coursesFor(p.grade);
      var subs = [];
      var add = function (id) { if (subs.indexOf(id) < 0) subs.push(id); };
      mine.forEach(function (c) { add(c.subject); });
      if (gi) (cat().courses || []).forEach(function (c) { if (c.level === gi.level.id) add(c.subject); });
      var html = bubble(TUTOR, para(say({ e: '어느 선생님께 물어볼까요? 선생님을 골라 보세요.', m: '어느 과목 선생님께 물어볼까요?', h: '질문할 과목을 고르세요.' }))) +
        '<h2 class="page-title" tabindex="-1">선생님께 질문하기</h2>' +
        (subs.length ? '<ul class="teacher-grid compact">' + subs.map(function (id) {
          var s = subjectOf(id);
          return '<li><a class="teacher-card ' + subjClass(s.id) + '" href="#/ask/' + encodeURIComponent(s.id) + '">' +
            '<span class="t-icon" aria-hidden="true">' + esc(s.icon || '📘') + '</span>' +
            '<span class="t-body"><span class="t-teacher">' + esc(teacherName(s)) + '</span><span class="t-course">' + esc(s.name) + ' 질문하기</span></span>' +
            '<span class="t-go" aria-hidden="true">›</span></a></li>';
        }).join('') + '</ul>' : '<div class="state-box"><p>질문할 수 있는 과목이 아직 없어요.</p></div>');
      return { title: '질문', tab: 'ask', html: html };
    }
    var s = Tutor.subject(subjId);
    if (!s) return viewNotFound();
    var course = r.query.course ? Tutor.course(r.query.course) : null;
    if (!course) course = Tutor.coursesFor(p.grade, s.id)[0] || null;
    var chat = chatBox({ key: 'subj:' + s.id, subject: s.id, s: s, course: course ? course.id : null, unit: null, grade: p.grade });
    return {
      title: teacherName(s) + '께 질문',
      tab: 'ask',
      back: r.query.course ? '#/course/' + encodeURIComponent(r.query.course) : '#/ask',
      subject: s.id,
      cls: 'ask-page',
      html: '<h2 class="sr-only page-title" tabindex="-1">' + esc(teacherName(s)) + '께 질문하기</h2>' + chat.html,
      mount: function (page) { chat.mount(page); },
    };
  };

  /* ================= 오답노트 ================= */

  /* 오답노트의 "비슷한 문제": 생성기 문제면 같은 생성기, 아니면 같은 개념 카드(concept)의 문제로 새 예상문제 */
  function similarFromNote(note, lv) {
    var p = note.problem || {};
    if (note.gen) startQuiz(note.unit, { gen: note.gen, n: 5, lv: lv || 1 });
    else if (typeof p.concept === 'number') startQuiz(note.unit, { concept: p.concept, n: 5, lv: 'all' });
  }

  VIEWS.notes = function () {
    var list = notesList();
    var groups = [];
    var byKey = {};
    list.forEach(function (n) {
      var meta = Tutor.unitMeta(n.unit);
      var sid = meta ? meta.course.subject : 'none';
      var gk = sid + '|' + n.unit;
      if (!byKey[gk]) {
        byKey[gk] = { subject: subjectOf(sid), unit: n.unit, unitTitle: meta ? E.plain(meta.unit.title) : n.unit, courseTitle: meta ? meta.course.title : '', notes: [] };
        groups.push(byKey[gk]);
      }
      byKey[gk].notes.push(n);
    });
    var html = bubble(TUTOR, para(say({
      e: '틀린 문제를 다시 풀어 봐요. 두 번 연속으로 맞히면 오답노트에서 빠져요. 틀린 문제는 다음 날, 맞힌 문제는 3일 뒤에 ‘오늘의 복습’으로 다시 알려 줄게요.',
      m: '틀린 문제를 다시 풀어 봐요. 두 번 연속으로 맞히면 오답노트에서 빠져요. 틀린 문제는 다음 날, 맞힌 문제는 3일 뒤에 ‘오늘의 복습’으로 다시 알려 줄게요.',
      h: '틀린 문제를 다시 풀어 봅시다. 두 번 연속으로 맞히면 오답노트에서 빠집니다. 틀린 문제는 다음 날, 맞힌 문제는 3일 뒤에 ‘오늘의 복습’으로 다시 안내합니다.',
    })));
    var today = todayStr();
    html += '<h2 class="page-title" tabindex="-1">오답노트 <span class="count" id="notesCount">' + (list.length ? list.length + '문제' : '') + '</span></h2>';
    html += '<div class="review-slot">' + reviewSlotHtml(list) + '</div>';
    if (!list.length) {
      html += '<div class="state-box"><p class="state-icon" aria-hidden="true">📒</p><p>틀린 문제가 없어요. 문제를 풀다가 틀리면 여기에 모여요.</p></div>';
    }
    html += groups.map(function (g) {
      return '<section class="note-group ' + subjClass(g.subject.id) + '"><h3 class="group-title"><span aria-hidden="true">' + esc(g.subject.icon || '') + '</span> ' +
        esc(g.subject.name) + ' · ' + esc(g.unitTitle) + '</h3><ol class="note-list">' + g.notes.map(function (n) {
          var p = unpackProblem(JSON.parse(JSON.stringify(n.problem)));
          return '<li class="note-card card" data-key="' + esc(n.key) + '">' +
            '<div class="note-q"><div class="rich">' + E.render(p.q) + '</div>' + E.fig(p.fig) + '</div>' +
            '<p class="note-meta">틀린 횟수 ' + Math.max(1, num(n.wrongCount)) + '번' +
            (num(n.rightStreak) ? ' · 연속 맞힘 ' + num(n.rightStreak) + '번' : '') +
            (n.given ? ' · 내 답: ' + esc(n.given) : '') +
            (TR ? ' · 다음 복습 ' + esc(TR.label(TR.dueOf(n), today)) : '') + '</p>' +
            /* 그때 보여 준 오답 진단 (글자로만) — 같은 실수를 기억하게 */
            (typeof n.cause === 'string' && n.cause ? '<p class="note-cause"><span class="fb-label">틀린 까닭</span> ' + esc(n.cause) + '</p>' : '') +
            '<div class="note-solve"></div><p class="note-status" role="status"></p>' +
            '<div class="note-actions"><button type="button" class="btn small primary" data-act="retry">다시 풀기</button>' +
            (n.gen || typeof p.concept === 'number' ? '<button type="button" class="btn small" data-act="similar" data-lv="' + (p.level === 3 ? 3 : (p.level === 2 ? 2 : 1)) + '">비슷한 문제</button>' : '') +
            '<button type="button" class="btn small ghost danger" data-act="del">지우기</button></div></li>';
        }).join('') + '</ol></section>';
    }).join('');

    return {
      title: '오답노트', tab: 'notes', back: '#/home', html: html,
      mount: function (page) {
        function findNote(key) {
          var l = notesList();
          for (var i = 0; i < l.length; i++) if (l[i].key === key) return { list: l, note: l[i], i: i };
          return null;
        }
        function refreshCount() {
          var l = notesList();
          var el = $('#notesCount', page);
          if (el) el.textContent = l.length ? l.length + '문제' : '';
          var slot = $('.review-slot', page);
          if (slot) slot.innerHTML = reviewSlotHtml(l);
        }
        page.addEventListener('click', function (e) {
          var b = e.target.closest('[data-act]');
          if (!b) return;
          var li = b.closest('.note-card');
          if (!li) return;
          var key = li.getAttribute('data-key');
          var act = b.getAttribute('data-act');
          if (act === 'similar') {
            if (b.closest('.feedback')) return; // 다시 풀기 해설 안의 버튼은 문제 위젯이 맡는다
            var sn = findNote(key);
            if (sn) similarFromNote(sn.note, b.getAttribute('data-lv') || 1);
            return;
          }
          if (act === 'again') return;
          if (act === 'del') {
            var f = findNote(key);
            if (f) { f.list.splice(f.i, 1); saveNotes(f.list); }
            var group = li.closest('.note-group');
            li.parentNode.removeChild(li);
            if (group && !$('.note-card', group)) group.parentNode.removeChild(group);
            refreshCount();
            announce('오답노트에서 지웠어요.');
            var nextBtn = $('[data-act="retry"]', page);
            if (nextBtn) nextBtn.focus();
            return;
          }
          if (act === 'retry') {
            var found = findNote(key);
            if (!found) return;
            var prob = unpackProblem(JSON.parse(JSON.stringify(found.note.problem)));
            var host = $('.note-solve', li);
            var status = $('.note-status', li);
            status.textContent = '';
            li.classList.add('solving');
            $('.note-actions', li).hidden = true;
            host.innerHTML = '';
            var w = problemWidget(prob, {
              report: { unit: found.note.unit, kind: 'problem', ref: problemRef(prob), q: prob.q },
              more: function () {
                var nt = found.note;
                var idx = typeof prob.concept === 'number' ? prob.concept : null;
                var can = nt.gen || idx !== null;
                if (!can) return null;
                return { unitId: nt.unit, idx: idx, onSimilar: function () { similarFromNote(nt, prob.level === 3 ? 3 : (prob.level === 2 ? 2 : 1)); } };
              },
              onGraded: function (res, after) {
                var g = gradeNote(key, prob, res);
                if (!g) return;
                if (g.cleared) {
                  status.textContent = '✔ 두 번 연속 맞혔어요! 오답노트에서 뺐어요.';
                  li.classList.add('cleared');
                  after.innerHTML = '';
                  refreshCount();
                  return;
                }
                var next = g.due && TR ? ' 다음 복습 ' + TR.label(g.due, todayStr()) + '.' : '';
                status.textContent = res.correct ?
                  '✔ ' + g.note.rightStreak + '번 맞힘 — 한 번 더 맞히면 오답노트에서 빠져요.' + next :
                  '✘ 아쉬워요. 해설을 보고 다시 풀어 봐요.' + next;
                refreshCount();
                after.innerHTML = '<button type="button" class="btn small primary" data-act="retry">한 번 더 풀기</button>';
                $('button', after).focus();
              },
            });
            host.appendChild(w.el);
            w.focus();
          }
        });
      },
    };
  };

  /* ================= 오늘의 복습 (§10) ================= */

  /* 한 번의 복습: 오늘 복습할 오답 가운데 오래된 것부터 REVIEW_MAX 개. 다른 화면에 다녀와도 이어서, 다 풀었거나 날이 바뀌면 새로 */
  function newReview() {
    var keys = reviewDue().slice(0, REVIEW_MAX).map(function (n) { return n.key; });
    return { day: todayStr(), pid: S.profile ? S.profile.id : '', keys: keys, total: keys.length, i: 0, results: [], done: false };
  }

  VIEWS.review = function () {
    var rv = S.review;
    if (!rv || rv.done || rv.day !== todayStr() || !S.profile || rv.pid !== S.profile.id) S.review = newReview();
    return {
      title: '오늘의 복습', tab: 'notes', back: '#/notes', cls: 'review-page',
      html: '<h2 class="sr-only page-title" tabindex="-1">오늘의 복습</h2><div class="review" id="review"></div>',
      focus: '.pq',
      mount: function (page) { drawReview($('#review', page), false); },
    };
  };

  function drawReview(host, focus) {
    var rv = S.review;
    var list = notesList();
    if (!rv.total) {
      var nx = nextReviewText(list);
      host.innerHTML = '<div class="state-box"><p class="state-icon" aria-hidden="true">📅</p>' +
        (list.length ? '<p>' + esc(say({ e: '오늘 복습할 문제가 없어요. 잘하고 있어요!', m: '오늘 복습할 문제가 없어요.', h: '오늘 복습할 문제가 없습니다.' })) + '</p>' +
          (nx ? '<p class="muted">' + esc(nx) + '</p>' : '') :
          '<p>' + esc(say({ m: '복습할 문제가 없어요.', h: '복습할 문제가 없습니다.' })) + '</p><p class="muted">' +
          esc(say({ m: '문제를 풀다 틀리면 다음 날 여기서 다시 풀어요.', h: '문제를 풀다 틀리면 다음 날 여기서 다시 풉니다.' })) + '</p>') +
        '<a class="btn primary" href="#/notes">오답노트 보기</a></div>';
      return;
    }
    if (rv.done) { drawReviewResult(host, focus); return; }
    /* 그새 오답노트에서 지운 문제는 건너뛴다 */
    var note = null;
    while (rv.i < rv.total) {
      for (var k = 0; k < list.length; k++) if (list[k].key === rv.keys[rv.i]) { note = list[k]; break; }
      if (note) break;
      rv.i += 1;
    }
    if (!note) {
      rv.done = true;
      if (!rv.results.filter(Boolean).length) rv.total = 0; // 낼 문제가 모두 지워졌다 — 빈 안내로
      drawReview(host, focus);
      return;
    }
    var prob = unpackProblem(JSON.parse(JSON.stringify(note.problem)));
    var meta = Tutor.unitMeta(note.unit);
    var s = subjectOf(meta ? meta.course.subject : '');
    host.innerHTML = (rv.i === 0 ? bubble(TUTOR, para(say({
      e: '전에 틀렸던 문제를 다시 풀어 봐요. 맞히면 3일 뒤에 한 번 더 확인하고, 두 번 연속 맞히면 오답노트에서 빠져요.',
      m: '전에 틀렸던 문제를 다시 풀어 봐요. 맞히면 3일 뒤에 한 번 더 확인하고, 두 번 연속 맞히면 오답노트에서 빠져요.',
      h: '전에 틀렸던 문제를 다시 풀어 봅시다. 맞히면 3일 뒤에 한 번 더 확인하고, 두 번 연속 맞히면 오답노트에서 빠집니다.',
    }))) : '') +
      '<div class="quiz-head"><p class="quiz-count review-count"><span class="sr-only">복습 문제 </span><strong>' + (rv.i + 1) + '</strong> / ' + rv.total + '</p>' +
      '<span class="badge review-unit">' + esc(s.icon ? s.icon + ' ' : '') + esc(s.name) + ' · ' + esc(meta ? E.plain(meta.unit.title) : note.unit) + '</span></div>' +
      '<div class="pbar quiz-bar" aria-hidden="true"><span class="pbar-fill" style="width:' + Math.round((100 * rv.i) / rv.total) + '%"></span></div>' +
      '<div class="pw-host ' + subjClass(s.id) + '"></div>';
    var key = note.key;
    var w = problemWidget(prob, {
      report: { unit: note.unit, kind: 'problem', ref: problemRef(prob), q: prob.q },
      more: function () {
        var idx = typeof prob.concept === 'number' ? prob.concept : null;
        if (!note.gen && idx === null) return null;
        return { unitId: note.unit, idx: idx, onSimilar: function () { similarFromNote(note, prob.level === 3 ? 3 : (prob.level === 2 ? 2 : 1)); } };
      },
      onGraded: function (res, after) {
        var g = gradeNote(key, prob, res);
        rv.results[rv.i] = { correct: res.correct, cleared: !!(g && g.cleared) };
        var line = !g ? '' : g.cleared ? say({ m: '✔ 두 번 연속 맞혔어요! 오답노트에서 뺐어요.', h: '✔ 두 번 연속 맞혔습니다. 오답노트에서 뺐습니다.' }) :
          res.correct ? (g.due ? say({
            m: '✔ 맞혔어요! ' + TR.AFTER_RIGHT + '일 뒤(' + mdText(g.due) + ')에 한 번 더 볼게요.',
            h: '✔ 맞혔습니다. ' + TR.AFTER_RIGHT + '일 뒤(' + mdText(g.due) + ')에 한 번 더 확인합니다.' }) : '✔ 맞혔어요!') :
            say({ e: '✘ 괜찮아요. 해설을 읽어 보고 내일 다시 풀어 봐요.', m: '✘ 괜찮아요. 내일 다시 볼게요.', h: '✘ 내일 다시 풀어 봅시다.' });
        var last = rv.i >= rv.total - 1;
        after.innerHTML = (line ? '<p class="review-status" role="status">' + esc(line) + '</p>' : '') +
          '<button type="button" class="btn primary big wide review-next-btn">' + (last ? '결과 보기' : '다음 문제 ›') + '</button>';
        var nb = $('.review-next-btn', after);
        nb.addEventListener('click', function () {
          if (S.review !== rv) return;
          rv.i += 1;
          if (rv.i >= rv.total) rv.done = true;
          drawReview(host, true);
        });
        nb.focus();
      },
    });
    $('.pw-host', host).appendChild(w.el);
    if (focus) {
      window.scrollTo(0, 0);
      w.focus();
    } else {
      setTimeout(function () { if (doc.body.contains(w.el)) w.focus(); }, 0);
    }
  }

  function drawReviewResult(host, focus) {
    var rv = S.review;
    var done = rv.results.filter(Boolean);
    var right = done.filter(function (r) { return r.correct; }).length;
    var cleared = done.filter(function (r) { return r.cleared; }).length;
    var left = reviewDue().length;
    var msg = right === done.length ? say({ e: '모두 맞혔어요! 잘 기억하고 있네요.', m: '모두 맞혔어요! 잘 기억하고 있어요.', h: '모두 맞혔습니다. 잘 기억하고 있습니다.' }) :
      say({ e: '괜찮아요. 틀린 문제는 내일 다시 나와요. 해설을 한 번 더 읽어 두면 좋아요.', m: '틀린 문제는 내일 다시 나와요. 해설을 한 번 더 읽어 두면 좋아요.',
        h: '틀린 문제는 내일 다시 나옵니다. 해설을 한 번 더 읽어 두면 좋습니다.' });
    host.innerHTML = bubble(TUTOR, para(msg)) +
      '<section class="result card review-result" aria-labelledby="rvTitle"><h2 class="page-title" id="rvTitle" tabindex="-1">복습 결과</h2>' +
      '<p class="score"><strong>' + right + '</strong><span> / ' + done.length + '</span></p>' +
      '<p class="score-sub">' + esc(say({ m: done.length + '문제를 복습했어요.', h: done.length + '문제를 복습했습니다.' })) + '</p>' +
      '<ul class="review-sum"><li>맞힌 문제 ' + right + '개</li><li>오답노트에서 뺀 문제 ' + cleared + '개</li><li>내일 다시 볼 문제 ' + (done.length - right) + '개</li></ul>' +
      (left ? '<p class="review-left">남은 복습 ' + left + '문제</p>' : '') + '</section>' +
      '<div class="action-row result-actions">' +
      (left ? '<button type="button" class="btn primary big" data-act="review-more">이어서 복습하기</button>' : '') +
      '<a class="btn big" href="#/notes">오답노트 보기</a><a class="btn big ghost" href="#/home">처음으로</a></div>';
    var more = $('[data-act="review-more"]', host);
    if (more) {
      more.addEventListener('click', function () {
        S.review = newReview();
        drawReview(host, true);
      });
    }
    if (focus) {
      window.scrollTo(0, 0);
      var t = $('#rvTitle', host);
      if (t) t.focus({ preventScroll: true });
    }
  }

  /* ================= 기록 ================= */

  function streakOf(days) {
    var set = {};
    days.forEach(function (d) { set[d] = 1; });
    var d = new Date();
    if (!set[todayStr(d)]) d.setDate(d.getDate() - 1); // 오늘 아직 안 했으면 어제까지 이어진 날을 센다
    var n = 0;
    while (set[todayStr(d)]) { n += 1; d.setDate(d.getDate() - 1); }
    return n;
  }

  /* 최근 정답률과 "자주 틀린 원인" 상위 3개 — 풀이 기록(attempts)에서 짧게 */
  var RECENT_N = 30;
  function recentStatsHtml() {
    var list = attemptsList();
    if (!list.length) return '';
    var last = list.slice(-RECENT_N);
    var ok = last.filter(function (a) { return a.ok; }).length;
    var pct = Math.round((100 * ok) / last.length);
    var count = {};
    var order = [];
    list.forEach(function (a) {
      if (a.ok || typeof a.cause !== 'string' || !a.cause) return;
      if (!count[a.cause]) { count[a.cause] = 0; order.push(a.cause); }
      count[a.cause] += 1;
    });
    /* 많이 나온 것부터, 같으면 최근 것부터 */
    var top = order.map(function (c, i) { return { c: c, n: count[c], i: i }; })
      .sort(function (a, b) { return (b.n - a.n) || (b.i - a.i); }).slice(0, 3);
    var html = '<section class="recent-box card" aria-labelledby="recentTitle"><h3 class="section-title" id="recentTitle">최근 공부</h3>' +
      '<p class="recent-rate">최근 <strong>' + last.length + '문제</strong> 정답률 <strong>' + pct + '%</strong>' +
      ' <span class="muted small">(' + last.length + '문제 중 ' + ok + '문제 맞힘)</span></p>';
    if (top.length) {
      html += '<h4 class="causes-title">자주 틀린 원인</h4><ol class="cause-list">' + top.map(function (t) {
        return '<li><span class="cause-text">' + esc(t.c) + '</span> <span class="badge">' + t.n + '번</span></li>';
      }).join('') + '</ol><p class="muted small">오답노트에서 틀린 문제를 다시 풀어 보면 같은 실수를 줄일 수 있어요.</p>';
    }
    return html + '</section>';
  }

  /* 다시 볼 개념(§18): 최근 30일 동안 두 번 이상 틀린 개념 카드 — 학생이 보는 기록 화면에 3개까지 */
  function statsAgainHtml() {
    if (!window.TutorSummary) return '';
    var list = (summaryOf(30).concepts || []).slice(0, 3);
    if (!list.length) return '';
    return '<section class="again-box stats-again" aria-labelledby="stAgainT"><h3 class="section-title" id="stAgainT">다시 볼 개념</h3>' +
      '<p class="muted small">' + esc(say({ e: '최근 30일 동안 두 번 이상 틀린 개념 카드예요. 다시 보고 문제를 풀어 봐요.', m: '최근 30일 동안 두 번 이상 틀린 개념 카드예요. 다시 보고 문제를 풀어 봐요.', h: '최근 30일 동안 두 번 이상 틀린 개념 카드입니다. 다시 보고 문제를 풀어 봅시다.' })) + '</p>' +
      '<ul class="again-list">' + list.map(function (x) {
        return '<li class="card again-item"><a class="link again-link" href="#/unit/' + encodeURIComponent(x.unit) + '/learn?card=' + x.c + '">' + esc(x.title || '개념 ' + (x.c + 1)) + '</a>' +
          '<span class="muted small">' + esc(x.unitTitle) + ' · 틀린 문제 ' + x.wrong + '개</span></li>';
      }).join('') + '</ul></section>';
  }

  VIEWS.stats = function () {
    // 다시 볼 개념의 제목은 단원 파일에 있다 — 그 단원을 먼저 싣고 그린다
    return window.TutorSummary ? loadConceptUnits(30).then(statsView) : statsView();
  };
  function statsView() {
    var prog = progressAll();
    var days = daysList();
    var streak = streakOf(days);
    var solved = 0;
    var correct = 0;
    Object.keys(prog).forEach(function (k) { var u = unitProg(prog, k); solved += u.solved; correct += u.correct; });
    var tiles = [
      ['연속 공부', streak + '일'],
      ['공부한 날', days.length + '일'],
      ['푼 문제', solved + '개'],
      ['정답률', solved ? Math.round((100 * correct) / solved) + '%' : '–'],
    ];
    var courses = [];
    var seenC = {};
    (cat().courses || []).forEach(function (c) {
      var touched = (c.units || []).some(function (u) { return isObj(prog[u.id]); });
      var mine = S.profile && (c.grades || []).indexOf(S.profile.grade) >= 0 && !courseSoon(c);
      if ((touched || mine) && !seenC[c.id]) { seenC[c.id] = 1; courses.push(c); }
    });
    var html = '<h2 class="page-title" tabindex="-1">학습 기록</h2>' +
      '<ul class="stat-tiles">' + tiles.map(function (t) {
        return '<li class="tile"><span class="tile-label">' + esc(t[0]) + '</span><span class="tile-value">' + esc(t[1]) + '</span></li>';
      }).join('') + '</ul>';
    html += recentStatsHtml();
    html += statsAgainHtml();
    if (window.TutorSummary) {
      html += '<p class="sum-link"><a class="btn" href="#/summary"><span aria-hidden="true">👪</span> 보호자용 학습 요약 (최근 7일·30일)</a></p>';
    }
    html += '<h3 class="section-title">과정별 진도</h3>';
    html += courses.length ? '<ul class="course-stats">' + courses.map(function (c) {
      var s = subjectOf(c.subject);
      var cp = courseProgress(c, prog);
      var bits = ['단원 ' + cp.started + '/' + cp.total + '개 공부'];
      if (cp.cards) bits.push('개념 카드 ' + cp.seen + '/' + cp.cards + '장');
      bits.push('문제 ' + cp.solved + '개' + (cp.solved ? ' · 정답률 ' + Math.round((100 * cp.correct) / cp.solved) + '%' : ''));
      return '<li class="course-stat card ' + subjClass(s.id) + '"><a href="#/course/' + encodeURIComponent(c.id) + '" class="cs-title"><span aria-hidden="true">' + esc(s.icon || '') + '</span> ' + esc(c.title) + '</a>' +
        '<div class="cs-bar">' + progressBar(cp.pct, '진도 ' + cp.pct + '%') + '</div><p class="cs-meta">' + esc(bits.join(' · ')) + '</p></li>';
    }).join('') + '</ul>' : '<div class="state-box"><p>아직 공부한 과정이 없어요.</p></div>';
    var rec = recentList().slice(0, 5);
    html += '<h3 class="section-title">최근 공부한 단원</h3>';
    html += rec.length ? '<ul class="recent-list">' + rec.map(function (id) {
      var meta = Tutor.unitMeta(id);
      var p = unitProg(prog, id);
      var when = p.last ? new Date(p.last) : null;
      return '<li><a href="#/unit/' + encodeURIComponent(id) + '/learn">' + esc(meta ? E.plain(meta.unit.title) : id) + '</a>' +
        '<span class="muted small">' + esc(meta ? meta.course.title : '') + (when ? ' · ' + (when.getMonth() + 1) + '월 ' + when.getDate() + '일' : '') + '</span></li>';
    }).join('') + '</ul>' : '<div class="state-box"><p>최근 공부한 단원이 없어요.</p></div>';
    html += '<p class="muted small">기록은 이 기기에만 저장되고 다른 사람과 비교하지 않아요.</p>';
    return { title: '기록', tab: 'stats', back: '#/home', html: html };
  }

  /* ================= 보호자용 학습 요약 (§12, js/summary.js) =================
   * 지금 학생 한 명의 기록으로만 만든다(다른 학생 기록은 읽지 않는다). 최근 7일(기본)·30일. 인쇄·글로 복사(별명 없이). */
  function summaryOf(period) {
    var list = notesList();
    return window.TutorSummary.build({
      attempts: attemptsList(), days: daysList(), progress: progressAll(), notes: list, reports: reportsList(),
    }, {
      today: todayStr(), period: period, due: reviewDue(list).length,
      conceptTitle: function (id, c) {
        var u = Tutor.units[id];
        var x = u && Array.isArray(u.concepts) ? u.concepts[c] : null;
        return x ? E.plain(x.title) : null;
      },
      unitInfo: function (id) {
        var m = Tutor.unitMeta(id);
        if (!m) return null;
        var s = subjectOf(m.course.subject);
        return { subject: s.id, subjectName: s.name, title: E.plain(m.unit.title) };
      },
    });
  }
  /* 자주 틀린 개념의 제목은 단원 파일에 있다 — 아직 싣지 않은 단원만 먼저 싣는다(실패하면 '개념 n'으로) */
  function loadConceptUnits(period) {
    var s = summaryOf(period);
    var ids = [];
    (s.concepts || []).forEach(function (x) { if (!Tutor.units[x.unit] && ids.indexOf(x.unit) < 0 && Tutor.unitMeta(x.unit)) ids.push(x.unit); });
    return Promise.all(ids.map(function (id) { return Tutor.loadUnit(id).then(null, function () { return null; }); }));
  }
  function summaryBodyHtml(s) {
    var html = '<p class="sum-range">' + esc(mdText(s.from) + ' ~ ' + mdText(s.to)) + ' <span class="muted">(최근 ' + s.period + '일)</span></p>';
    html += '<ul class="stat-tiles sum-tiles">' + [
      ['공부한 날', s.studyDays + '일'], ['푼 문제', s.solved + '개'], ['정답률', s.rate === null ? '–' : s.rate + '%'], ['이해 확인', s.checks + '개'],
    ].map(function (t) {
      return '<li class="tile"><span class="tile-label">' + esc(t[0]) + '</span><span class="tile-value">' + esc(t[1]) + '</span></li>';
    }).join('') + '</ul>';
    if (!s.solved && !s.checks) {
      html += '<div class="state-box"><p>이 기간에 푼 문제가 없어요.</p><p class="muted">문제를 풀면 날짜별·과목별로 여기에 모여요.</p></div>';
    } else {
      var max = Math.max.apply(null, s.daily.map(function (d) { return d.n; }).concat([1]));
      var last = s.daily.length - 1;
      html += '<section class="sum-sec card" aria-labelledby="sumDaysT"><h3 id="sumDaysT">날짜별 푼 문제</h3>' +
        '<ol class="sum-days' + (s.period > 7 ? ' is-long' : '') + '">' + s.daily.map(function (d, i) {
          var label = mdText(d.date) + ' ' + d.n + '문제' + (d.n ? ' (' + d.c + '문제 맞힘)' : '');
          var show = s.period <= 7 || (last - i) % 7 === 0; // 30일은 오늘부터 일주일마다 날짜
          return '<li aria-label="' + esc(label) + '"><span class="sd-n" aria-hidden="true">' + (d.n || '') + '</span>' +
            '<span class="sd-bar" aria-hidden="true"><span class="sd-fill" style="height:' + Math.round((100 * d.n) / max) + '%"></span></span>' +
            '<span class="sd-d" aria-hidden="true">' + (show ? Number(d.date.slice(5, 7)) + '/' + Number(d.date.slice(8, 10)) : '') + '</span></li>';
        }).join('') + '</ol></section>';
      if (s.bySubject.length) {
        html += '<section class="sum-sec card" aria-labelledby="sumSubjT"><h3 id="sumSubjT">과목별</h3><ul class="sum-subjects">' + s.bySubject.map(function (x) {
          var sj = subjectOf(x.subject);
          return '<li class="' + subjClass(x.subject) + '"><span class="ss-name"><span aria-hidden="true">' + esc(sj.icon || '') + '</span> ' + esc(x.name) + '</span>' +
            progressBar(x.rate || 0, '') + '<span class="ss-num">' + x.n + '문제 · 정답률 ' + x.rate + '%</span></li>';
        }).join('') + '</ul></section>';
      }
      var unitLi = function (u) {
        return '<li><a href="#/unit/' + encodeURIComponent(u.unit) + '/learn">' + esc(u.title) + '</a> <span class="muted small">' + u.n + '문제 · 정답률 ' + u.rate + '%</span></li>';
      };
      if (s.strong.length || s.weak.length) {
        html += '<section class="sum-sec card" aria-labelledby="sumUnitT"><h3 id="sumUnitT">단원</h3>' +
          (s.strong.length ? '<h4>잘한 단원</h4><ul class="sum-strong">' + s.strong.map(unitLi).join('') + '</ul>' : '') +
          (s.weak.length ? '<h4>더 연습하면 좋은 단원</h4><ul class="sum-weak">' + s.weak.map(unitLi).join('') + '</ul>' : '') +
          '<p class="muted small">이 기간에 ' + window.TutorSummary.MIN_UNIT + '문제 이상 푼 단원만 견주었어요.</p></section>';
      }
      if (s.concepts && s.concepts.length) {
        html += '<section class="sum-sec card" aria-labelledby="sumConT"><h3 id="sumConT">자주 틀린 개념</h3><ol class="sum-concepts">' +
          s.concepts.map(function (x) {
            return '<li><a href="#/unit/' + encodeURIComponent(x.unit) + '/learn?card=' + x.c + '">' + esc(x.title || '개념 ' + (x.c + 1)) + '</a>' +
              ' <span class="muted small">' + esc(x.unitTitle) + ' · 틀린 문제 ' + x.wrong + '개</span></li>';
          }).join('') + '</ol><p class="muted small">이 기간에 ' + window.TutorSummary.MIN_CONCEPT + '번 이상 틀린 개념 카드예요. 누르면 그 카드를 다시 볼 수 있어요.</p></section>';
      }
      if (s.causes.length) {
        html += '<section class="sum-sec card" aria-labelledby="sumCauseT"><h3 id="sumCauseT">자주 틀린 까닭</h3><ol class="sum-causes cause-list">' +
          s.causes.map(function (c) { return '<li><span class="cause-text">' + esc(c.text) + '</span> <span class="badge">' + c.n + '번</span></li>'; }).join('') +
          '</ol></section>';
      }
    }
    html += '<section class="sum-sec card sum-review" aria-labelledby="sumRevT"><h3 id="sumRevT">오답노트 · 복습</h3>' +
      '<p>오답노트 ' + s.notes + '문제 · 오늘 복습할 문제 ' + s.due + '개 · 틀린 곳 알림 ' + s.reports + '건</p>' +
      '<p class="muted small">틀린 문제는 다음 날, 맞힌 문제는 3일 뒤에 ‘오늘의 복습’으로 다시 나와요.</p></section>';
    if (s.studied.length) {
      html += '<section class="sum-sec card" aria-labelledby="sumStudT"><h3 id="sumStudT">개념을 공부한 단원</h3><ul class="sum-studied">' + s.studied.map(function (u) {
        return '<li><a href="#/unit/' + encodeURIComponent(u.unit) + '/learn">' + esc(u.title) + '</a> <span class="muted small">개념 ' + (u.cards ? u.seen + '/' + u.cards : u.seen) + '장</span></li>';
      }).join('') + '</ul>' + (s.studiedCount > s.studied.length ? '<p class="muted small">그 밖에 ' + (s.studiedCount - s.studied.length) + '단원</p>' : '') + '</section>';
    }
    if (s.partial) html += '<p class="notice small">풀이 기록이 많아서 기간 앞부분은 빠졌을 수 있어요.</p>';
    return html;
  }

  VIEWS.summary = function () {
    var p = S.profile;
    if (!window.TutorSummary) {
      return { title: '학습 요약', tab: 'stats', back: '#/stats', html: '<div class="state-box"><p>요약 기능 파일(js/summary.js)을 불러오지 못했어요.</p></div>' };
    }
    var period = S.sumPeriod === 30 ? 30 : 7;
    return loadConceptUnits(period).then(function () { return summaryView(p, period); });
  };
  function summaryView(p, period) {
    return {
      title: '학습 요약', tab: 'stats', back: '#/stats', cls: 'summary-page',
      html: '<p class="sum-print-head">가정교사 · ' + esc(koDate(todayIso(), true)) + ' 기준</p>' +
        '<h2 class="page-title" tabindex="-1">보호자용 학습 요약</h2>' +
        '<p class="sum-who"><span class="p-avatar" aria-hidden="true">' + esc(avatarChar(p)) + '</span><strong>' + esc(p.name || '이름 없는 학생') + '</strong>' +
        '<span class="p-meta">' + esc(gradeLabel(p.grade)) + '</span></p>' +
        '<fieldset class="seg sum-period"><legend class="sr-only">기간</legend><div class="seg-row">' +
        [[7, '최근 7일'], [30, '최근 30일']].map(function (o) {
          return '<label class="seg-opt"><input type="radio" name="sumPeriod" value="' + o[0] + '"' + (o[0] === period ? ' checked' : '') + '><span>' + o[1] + '</span></label>';
        }).join('') + '</div></fieldset>' +
        '<div class="sum-body">' + summaryBodyHtml(summaryOf(period)) + '</div>' +
        '<div class="action-row sum-actions"><button type="button" class="btn" data-act="sum-print">인쇄하기</button>' +
        '<button type="button" class="btn" data-act="sum-copy">글로 복사하기</button></div>' +
        '<textarea class="text-input sum-text" readonly rows="8" aria-label="복사할 요약" hidden></textarea>' +
        '<p class="done-msg sum-done" role="status"></p>' +
        '<p class="muted small sum-note">이 기기에 저장된 이 학생의 기록으로만 만들었어요. 어디로도 보내지 않아요. 복사하는 글에는 별명을 넣지 않아요.</p>',
      mount: function (page) {
        page.addEventListener('change', function (e) {
          if (e.target.name !== 'sumPeriod') return;
          S.sumPeriod = e.target.value === '30' ? 30 : 7;
          var want = S.sumPeriod;
          loadConceptUnits(want).then(function () {
            if (S.sumPeriod !== want || !page.isConnected) return; // 그새 또 바꿨거나 화면을 떠났다
            $('.sum-body', page).innerHTML = summaryBodyHtml(summaryOf(want));
            var ta = $('.sum-text', page);
            ta.hidden = true;
            ta.value = '';
            $('.sum-done', page).textContent = '';
            announce('최근 ' + want + '일 요약으로 바꿨어요.');
          });
        });
        page.addEventListener('click', function (e) {
          var b = e.target.closest('[data-act]');
          if (!b) return;
          var act = b.getAttribute('data-act');
          if (act === 'sum-print') {
            try { window.print(); } catch (err) { warn('인쇄 창을 열지 못했습니다', err); }
          } else if (act === 'sum-copy') {
            var text = window.TutorSummary.toText(summaryOf(S.sumPeriod === 30 ? 30 : 7), { grade: gradeLabel(S.profile.grade) });
            var ta = $('.sum-text', page);
            var dm = $('.sum-done', page);
            ta.value = text;
            ta.hidden = false;
            copyText(text).then(function (ok) {
              dm.textContent = ok ? '복사했어요. 메일이나 메시지에 붙여 넣을 수 있어요.' : '자동으로 복사하지 못했어요. 아래 글을 직접 복사해 주세요.';
              announce(dm.textContent);
              if (!ok) { ta.focus(); ta.select(); }
            });
          }
        });
      },
    };
  }

  /* ================= 설정 ================= */

  /* 사파리(WebKit)는 단추를 눌러도 그 단추로 초점을 옮기지 않는다(본문 영역 #main 으로 간다) —
   * 확인 창을 닫은 뒤 초점을 돌려줄 곳으로, 방금(1초 안에) 누른 단추·링크를 먼저 쓴다(init 이 기억한다) */
  var lastPressed = null;
  var lastPressedAt = 0;
  function confirmBox(opt) {
    return new Promise(function (resolve) {
      var host = doc.getElementById('modal-root');
      var fresh = lastPressed && Date.now() - lastPressedAt < 1000 && doc.body.contains(lastPressed);
      var prev = fresh ? lastPressed : doc.activeElement;
      var id = nextId('dlg');
      host.innerHTML = '<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="' + id + '-t" aria-describedby="' + id + '-d">' +
        '<h2 class="modal-title" id="' + id + '-t">' + esc(opt.title) + '</h2><p id="' + id + '-d">' + esc(opt.body) + '</p>' +
        '<div class="modal-actions"><button type="button" class="btn" data-v="0">' + esc(opt.cancel || '취소') + '</button>' +
        '<button type="button" class="btn ' + (opt.danger ? 'danger-solid' : 'primary') + '" data-v="1">' + esc(opt.ok || '확인') + '</button></div></div></div>';
      setInert(true);
      var box = $('.modal', host);
      var btns = $$('button', box);
      btns[0].focus();
      var closed = false;
      function close(v) {
        if (closed) return;
        closed = true;
        host.innerHTML = '';
        setInert(false);
        doc.removeEventListener('keydown', onKey, true);
        S.closeModal = null;
        if (prev && typeof prev.focus === 'function' && doc.body.contains(prev)) prev.focus();
        resolve(v);
      }
      function onKey(e) {
        if (e.key === 'Escape') { e.preventDefault(); close(false); }
        else if (e.key === 'Tab') {
          var i = btns.indexOf(doc.activeElement);
          e.preventDefault();
          btns[(i + (e.shiftKey ? -1 : 1) + btns.length) % btns.length].focus();
        }
      }
      box.addEventListener('click', function (e) {
        var b = e.target.closest('button[data-v]');
        if (b) close(b.getAttribute('data-v') === '1');
      });
      $('.modal-backdrop', host).addEventListener('click', function (e) { if (e.target === e.currentTarget) close(false); });
      doc.addEventListener('keydown', onKey, true);
      S.closeModal = function () { close(false); };
    });
  }
  function setInert(on) {
    ['topbar', 'main', 'install-bar'].forEach(function (id) {
      var el = doc.getElementById(id);
      if (!el) return;
      if (on) { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); }
      else { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); }
    });
  }

  /* 그 학생의 기록(p.<id>.*: 진도·오답노트·풀이 기록·통계·대화…)을 모두 지운다. 학생은 남는다 */
  /* 학습 기록만 지운다(진도·오답노트·풀이 기록·통계·대화·최근 단원·공부한 날·이어 풀기). 그 학생의 선택(읽어 주기 — prefs)과
   * 아직 전하지 않은 틀린 곳 알림(reports — 설정에 따로 지우는 단추)은 남긴다(2026-10-08). 학생을 지울 때는 deleteProfile 이 모두 지운다 */
  var KEEP_ON_CLEAR = ['prefs', 'reports'];
  function clearProfileData(p) {
    var pre = 'p.' + p.id + '.';
    var keep = {};
    KEEP_ON_CLEAR.forEach(function (k) { var v = store.get(pre + k, null); if (v !== null) keep[k] = v; });
    removePrefix(pre);
    Object.keys(keep).forEach(function (k) { store.set(pre + k, keep[k]); });
    flushStore();
    S.chats = {};
    S.quiz = null;
    S.review = null;
  }

  /* 학생 정보 고치기 (profiles 안의 한 명) */
  function updateProfile(id, fn) {
    var list = profiles();
    list.forEach(function (p) { if (p.id === id) fn(p); });
    store.set('profiles', list);
    S.profile = currentProfile();
  }

  /* 백업·PIN을 쓸 수 없는 까닭 (없으면 '') */
  function cryptoReason() {
    if (!TS || typeof store.replaceAll !== 'function') return '저장 기능 파일(js/storage.js)을 불러오지 못했어요.';
    if (!TS.canEncrypt()) return '이 화면에서는 암호화 기능을 쓸 수 없어요. 인터넷 주소(https)나 파일(index.html)로 열어 주세요.';
    return '';
  }

  /* 백업 파일 저장: Blob + a[download] — 서버 없이, file:// 에서도 된다 */
  function downloadText(name, text) {
    var blob = new Blob([text], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = doc.createElement('a');
    a.href = url;
    a.download = name;
    a.hidden = true;
    doc.body.appendChild(a);
    a.click();
    setTimeout(function () {
      try { URL.revokeObjectURL(url); } catch (e) { /* 무시 */ }
      if (a.parentNode) a.parentNode.removeChild(a);
    }, 4000);
  }
  function readFileText(file) {
    return new Promise(function (resolve, reject) {
      if (!file) { reject(new Error('백업 파일을 골라 주세요.')); return; }
      if (file.size > 25 * 1024 * 1024) { reject(new Error('파일이 너무 커요.')); return; }
      var fr = new FileReader();
      fr.onload = function () { resolve(String(fr.result || '')); };
      fr.onerror = function () { reject(new Error('파일을 읽지 못했어요.')); };
      fr.readAsText(file);
    });
  }
  function dateText(v) {
    var d = new Date(v);
    if (!v || isNaN(d.getTime())) return '';
    return d.getFullYear() + '년 ' + (d.getMonth() + 1) + '월 ' + d.getDate() + '일 ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes());
  }
  function pinInput(id) {
    return '<input id="' + id + '" class="text-input pin-input" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="off">';
  }
  /* 다시 그린 설정 화면에 결과 문구를 보인다 */
  function setDone(sel, text) {
    var el = $('#main ' + sel);
    if (el) el.textContent = text;
    announce(text);
  }

  /* 가져올 백업의 요약 — 별명·학년·기록 수·만든 날 + 가져오는 방법 고르기 */
  function backupSummaryHtml(res) {
    var sm = res.summary || {};
    var people = Array.isArray(sm.profiles) ? sm.profiles : [];
    var anyLock = people.some(function (x) { return x.locked; });
    return '<h4 class="bk-title">백업 내용</h4>' +
      '<ul class="bk-people">' + people.map(function (x) {
        var av = typeof x.avatar === 'string' && AVATARS.indexOf(x.avatar) >= 0 ? x.avatar : '🙂';
        return '<li><span class="p-avatar" aria-hidden="true">' + esc(av) + '</span>' +
          '<span class="p-text"><span class="p-name">' + esc(x.name || '이름 없는 학생') + '</span>' +
          '<span class="p-meta">' + esc(gradeLabel(x.grade) || x.grade) + (x.locked ? ' · 🔒 PIN' : '') + '</span></span></li>';
      }).join('') + '</ul>' +
      '<p class="bk-meta">학생 ' + people.length + '명 · 기록 ' + num(sm.records) + '가지' + (sm.createdAt ? ' · 만든 날 ' + esc(dateText(sm.createdAt)) : '') + '</p>' +
      (res.warnings && res.warnings.length ? '<p class="help">알 수 없는 항목 몇 가지는 건너뛰었어요.</p>' : '') +
      '<fieldset class="pick-set bk-mode"><legend class="field-label">어떻게 가져올까요?</legend><div class="bk-modes">' +
      '<label class="pace-opt"><input type="radio" name="bkMode" value="add" checked><span class="pace-box"><span class="pace-name">이 기기에 더하기 (기본)</span>' +
      '<span class="pace-desc">지금 기록은 그대로 두고, 백업의 학생을 새 학생으로 더해요.</span></span></label>' +
      '<label class="pace-opt"><input type="radio" name="bkMode" value="replace"><span class="pace-box"><span class="pace-name">모두 바꾸기</span>' +
      '<span class="pace-desc">이 기기의 학생·기록을 백업 내용으로 바꿔요. 바꾼 뒤에 되돌릴 수 있어요.</span></span></label></div></fieldset>' +
      (anyLock ? '<label class="check bk-keeplock"><input type="checkbox" name="bkKeepLock" checked><span>PIN 잠금도 그대로 가져오기 ' +
        '<span class="muted small">(PIN을 잊었다면 체크를 풀어요. 백업 암호를 아는 사람만 가져올 수 있어요.)</span></span></label>' : '') +
      '<p class="form-msg" role="alert" hidden></p>' +
      '<div class="form-actions"><button type="button" class="btn primary" data-act="bk-restore">가져오기</button>' +
      '<button type="button" class="btn ghost" data-act="bk-cancel">취소</button></div>';
  }

  VIEWS.settings = function () {
    var st = getSettings();
    var list = profiles();
    var cur = S.profile;
    var reason = cryptoReason();
    function radios(name, opts, val) {
      return opts.map(function (o) {
        return '<label class="seg-opt"><input type="radio" name="' + name + '" value="' + o[0] + '"' + (String(val) === o[0] ? ' checked' : '') + '><span>' + esc(o[1]) + '</span></label>';
      }).join('');
    }
    var html = '<h2 class="page-title" tabindex="-1">설정</h2>';
    html += '<section class="set-sec card" aria-labelledby="setFont"><h3 id="setFont">글자 크기</h3>' +
      '<fieldset class="seg"><legend class="sr-only">글자 크기</legend><div class="seg-row">' + radios('font', [['1', '보통'], ['2', '크게'], ['3', '아주 크게']], st.fontScale) + '</div></fieldset>' +
      '<p class="muted font-preview">미리 보기: 가나다 ABC 123</p></section>';
    html += '<section class="set-sec card" aria-labelledby="setTheme"><h3 id="setTheme">화면 테마</h3>' +
      '<fieldset class="seg"><legend class="sr-only">화면 테마</legend><div class="seg-row">' + radios('theme', [['auto', '자동'], ['light', '밝게'], ['dark', '어둡게']], st.theme) + '</div></fieldset>' +
      '<p class="muted">자동은 기기 설정(밝은 화면/어두운 화면)을 따라가요.</p></section>';

    if (cur) {
      html += '<section class="set-sec card" aria-labelledby="setPace"><h3 id="setPace">공부 수준</h3>' +
        '<fieldset class="pick-set"><legend class="sr-only">공부 수준</legend>' + paceRadios('pace', paceOf(cur)) + '</fieldset>' +
        '<p class="muted">기초 다지기는 쉬운 설명을 먼저 보여 주고 기본 문제부터 내요. 도전은 실력 문제부터 내고 잘 맞히면 심화 문제까지 올라가요.</p></section>';
      /* 읽어 주기(§13) — 이 학생의 선택(p.<id>.prefs) */
      html += '<section class="set-sec card" id="speech" aria-labelledby="setSpeech"><h3 id="setSpeech">읽어 주기</h3>' +
        '<p class="muted">개념 카드·예제·문제·해설 옆에 🔊 버튼이 생겨 글을 소리 내어 읽어 줘요. 이 기기 안의 목소리로만 읽고, 읽을 글을 인터넷으로 보내는 목소리는 쓰지 않아요.</p>' +
        '<fieldset class="seg"><legend class="field-label">🔊 버튼</legend><div class="seg-row">' +
        radios('tts', [['auto', '기본(초등 1~3학년만)'], ['on', '켜기'], ['off', '끄기']], ttsMode(cur)) + '</div></fieldset>' +
        '<fieldset class="seg"><legend class="field-label">읽는 빠르기</legend><div class="seg-row">' +
        radios('ttsRate', [['slow', '천천히'], ['normal', '보통']], ttsRateMode(cur)) + '</div></fieldset>' +
        '<div class="speech-slot">' + speechStateHtml() + '</div>' +
        '<button type="button" class="btn" data-act="speech-test"' + (SPEECH.voice ? '' : ' disabled') + '>들어 보기</button></section>';
    }

    html += '<section class="set-sec card" aria-labelledby="setStudents"><h3 id="setStudents">학생 관리</h3>' +
      '<p class="muted">한 기기에서 여러 학생이 따로 진도를 기록할 수 있어요. 이름(별명)은 이 기기에만 저장돼요.</p>' +
      '<ul class="student-list">' + list.map(function (p) {
        var isCur = cur && p.id === cur.id;
        var locked = needsPin(p); // PIN을 아직 맞히지 않은 학생: 바꾸려면 PIN, 이름 바꾸기는 숨긴다
        return '<li class="student-row' + (isCur ? ' is-current' : '') + '" data-id="' + esc(p.id) + '">' +
          '<span class="p-avatar" aria-hidden="true">' + esc(avatarChar(p)) + '</span>' +
          '<span class="p-text"><span class="p-name">' + esc(p.name || '이름 없는 학생') + lockMark(p) + '</span>' +
          '<span class="p-meta">' + esc(gradeLabel(p.grade)) + ' · ' + esc(paceName(paceOf(p))) + (isCur ? ' · 지금 공부 중' : '') + '</span></span>' +
          '<span class="row-actions">' +
          (isCur ? '' : '<button type="button" class="btn small" data-act="switch">이 학생으로</button>') +
          (locked ? '' : '<button type="button" class="btn small ghost" data-act="rename">이름·동물 바꾸기</button>') +
          '<button type="button" class="btn small ghost danger" data-act="delete">삭제</button></span>' +
          (locked ? '<div class="row-pin" hidden></div>' :
            '<form class="rename-form" hidden><label class="field-label" for="rn-' + esc(p.id) + '">새 별명</label>' +
            '<input id="rn-' + esc(p.id) + '" class="text-input" type="text" maxlength="12" autocomplete="off" value="' + esc(p.name || '') + '">' +
            '<fieldset class="pick-set"><legend class="field-label">동물</legend>' + avatarRadios('av-' + p.id, avatarChar(p)) + '</fieldset>' +
            '<div class="form-actions"><button type="submit" class="btn small primary">저장</button><button type="button" class="btn small ghost" data-act="rename-cancel">취소</button></div></form>') +
          '</li>';
      }).join('') + '</ul>' +
      '<div class="action-row"><a class="btn" href="#/setup?new=1">＋ 학생 추가</a>' +
      (cur ? '<a class="btn ghost" href="#/setup/' + encodeURIComponent(cur.level) + '?change=1">학년 바꾸기</a>' : '') + '</div></section>';

    /* PIN 잠금 (§9.4): 지금 학생에게 걸기·바꾸기·풀기 */
    if (cur) {
      html += '<section class="set-sec card" aria-labelledby="setPin"><h3 id="setPin">PIN 잠금</h3>' +
        '<p class="muted">PIN을 걸면 다른 학생으로 바꾸었다가 돌아올 때나 앱을 다시 열 때 PIN을 물어봐요. 옆 사람이 내 기록을 함부로 보지 못하게 하는 잠금이에요. 기기 자체의 잠금(화면 잠금)을 대신하지는 않아요.</p>' +
        (isLocked(cur) ? '<p class="pin-state"><span aria-hidden="true">🔒</span> ‘' + esc(cur.name || '이름 없는 학생') + '’에게 PIN이 걸려 있어요.</p>' : '') +
        (reason ? '<p class="notice small">' + esc(reason) + '</p>' :
          '<div class="btn-row pin-btns">' + (isLocked(cur) ?
            '<button type="button" class="btn" data-act="pin-change">PIN 바꾸기</button><button type="button" class="btn ghost danger" data-act="pin-remove">PIN 풀기</button>' :
            '<button type="button" class="btn" data-act="pin-set">PIN 걸기</button>') + '</div>' +
          '<form class="pin-edit" hidden novalidate>' +
          '<div class="pin-field" data-f="old"><label class="field-label" for="pinOld">지금 PIN</label>' + pinInput('pinOld') + '</div>' +
          '<div class="pin-field" data-f="new"><label class="field-label" for="pinNew">새 PIN <span class="opt">(숫자 4~8자리)</span></label>' + pinInput('pinNew') + '</div>' +
          '<div class="pin-field" data-f="new"><label class="field-label" for="pinNew2">새 PIN 한 번 더</label>' + pinInput('pinNew2') + '</div>' +
          '<p class="form-msg" role="alert" hidden></p>' +
          '<div class="form-actions"><button type="submit" class="btn primary">저장</button><button type="button" class="btn ghost" data-act="pin-edit-cancel">취소</button></div></form>') +
        '<p class="done-msg pin-done" role="status"></p>' +
        '<p class="muted small">PIN을 잊으면 그 학생의 기록은 백업 파일로만 되살릴 수 있어요.</p></section>';
    }

    /* 틀린 곳 알림 (§11): 이 학생이 '틀린 곳 알리기'로 모은 것 — 이 기기에만, 보호자가 글로 복사해 전한다 */
    if (cur) {
      html += '<section class="set-sec card" id="reports" aria-labelledby="setReports"><h3 id="setReports">틀린 곳 알림</h3>' +
        '<div class="reports-body">' + reportsBodyHtml(reportsList()) + '</div>' +
        '<textarea class="text-input report-text" readonly rows="6" aria-label="전해 줄 글" hidden></textarea>' +
        '<p class="done-msg report-done" role="status"></p></section>';
    }

    /* 학습 기록 옮기기 (§9.3): 암호로 잠근 백업 파일로 내보내기·가져오기 */
    var lockedOther = list.some(function (p) { return isLocked(p) && !(cur && p.id === cur.id); });
    var rp = TS && !reason ? TS.restorePointInfo(store) : null;
    html += '<section class="set-sec card" id="backup" aria-labelledby="setBackup"><h3 id="setBackup">학습 기록 옮기기</h3>' +
      '<p class="muted">다른 기기로 기록을 옮기거나 따로 보관할 때 써요. 백업 파일은 암호로 잠가서 암호를 모르면 아무도 열 수 없어요. 파일은 어디로도 보내지 않고 이 기기에 내려받아요.</p>' +
      (reason ? '<p class="notice small">' + esc(reason) + ' 그래서 지금은 백업을 만들거나 열 수 없어요.</p>' : '') +
      '<form class="bk-export bk-part" novalidate><fieldset class="bk-fs"' + (reason ? ' disabled' : '') + '><legend class="bk-title">내보내기</legend>' +
      '<fieldset class="seg"><legend>누구의 기록을 내보낼까요?</legend><div class="seg-row">' +
      '<label class="seg-opt"><input type="radio" name="bkScope" value="me"' + (cur ? ' checked' : ' disabled') + '><span>지금 학생' + (cur ? ' (' + esc(cur.name || '이름 없음') + ')' : '') + '</span></label>' +
      '<label class="seg-opt"><input type="radio" name="bkScope" value="all"' + (lockedOther ? ' disabled' : (cur ? '' : ' checked')) + '><span>모든 학생 (' + list.length + '명)</span></label>' +
      '</div></fieldset>' +
      (lockedOther ? '<p class="help bk-all-note">PIN이 걸린 다른 학생이 있어서 ‘모든 학생’은 내보낼 수 없어요. 그 학생으로 바꾼 뒤 한 명씩 내보내 주세요.</p>' : '') +
      '<label class="field-label" for="bkPw">백업 암호 <span class="opt">(6자 이상)</span></label>' +
      '<input id="bkPw" class="text-input" type="password" autocomplete="new-password" maxlength="200">' +
      '<label class="field-label" for="bkPw2">암호 확인</label>' +
      '<input id="bkPw2" class="text-input" type="password" autocomplete="new-password" maxlength="200">' +
      '<p class="notice small bk-warn"><span aria-hidden="true">⚠️</span> 암호를 잊으면 아무도 이 백업을 열 수 없어요. 가정교사도 열어 줄 수 없으니 암호를 따로 잘 적어 두세요.</p>' +
      '<p class="form-msg" role="alert" hidden></p>' +
      '<button type="submit" class="btn primary">백업 파일 만들기</button>' +
      '<p class="done-msg bk-out" role="status"></p></fieldset></form>' +
      '<form class="bk-import bk-part" novalidate><fieldset class="bk-fs"' + (reason ? ' disabled' : '') + '><legend class="bk-title">가져오기</legend>' +
      '<span class="field-label" id="bkFileLbl">백업 파일 (.json)</span>' +
      '<div class="file-row"><input id="bkFile" class="file-input" type="file" accept=".json,application/json" aria-labelledby="bkFileLbl bkFileName">' +
      '<label class="btn small file-btn" for="bkFile"><span aria-hidden="true">📂</span> 파일 고르기</label>' +
      '<span class="file-name" id="bkFileName">아직 고르지 않았어요</span></div>' +
      '<label class="field-label" for="bkPwIn">백업 암호</label>' +
      '<input id="bkPwIn" class="text-input" type="password" autocomplete="off" maxlength="200">' +
      '<p class="form-msg" role="alert" hidden></p>' +
      '<button type="submit" class="btn">백업 열어 보기</button></fieldset></form>' +
      '<div class="bk-summary bk-part" hidden></div>' +
      '<p class="done-msg bk-result" role="status"></p>' +
      (rp ? '<div class="bk-undo"><p>‘모두 바꾸기’를 하기 전 기록으로 되돌릴 수 있어요 (' + esc(dateText(rp.at)) + ' · 학생 ' + rp.profiles + '명).</p>' +
        '<div class="form-actions"><button type="button" class="btn" data-act="bk-undo">되돌리기</button>' +
        '<button type="button" class="btn small ghost" data-act="bk-forget">되돌리기 지점 지우기</button></div></div>' : '') +
      '</section>';

    if (cur) {
      html += '<section class="set-sec card" aria-labelledby="setClear"><h3 id="setClear">기록 지우기</h3>' +
        '<p class="muted">‘' + esc(cur.name || '이름 없는 학생') + '’의 진도·오답노트·복습 일정·풀이 기록·대화를 모두 지워요. 학생 이름과 읽어 주기 설정과 틀린 곳 알림은 남아요.</p>' +
        '<button type="button" class="btn danger" data-act="clear">이 학생 기록 지우기</button><p class="set-msg" role="status"></p></section>';
    }

    html += '<section class="set-sec card" aria-labelledby="setWipe"><h3 id="setWipe">이 기기에서 모든 기록 지우기</h3>' +
      '<p class="muted">학교·도서관 같은 공용 컴퓨터에서 공부했다면, 공부를 마치고 이 버튼으로 이 기기에 남은 학생·기록·대화를 모두 지워 주세요. 화면 설정만 남아요.</p>' +
      '<button type="button" class="btn danger" data-act="wipe-all">이 기기에서 모든 기록 지우기</button></section>';

    html += '<section class="set-sec card" aria-labelledby="setInstall"><h3 id="setInstall">앱으로 설치하기</h3>' +
      (APP_MODE ? '<p>지금 앱으로 실행 중이에요.</p>' :
        '<ul class="plain-list"><li><strong>안드로이드(크롬)</strong>: 오른쪽 위 메뉴(⋮) → ‘앱 설치’ 또는 ‘홈 화면에 추가’</li>' +
        '<li><strong>아이폰·아이패드(사파리)</strong>: 공유 버튼(□↑) → ‘홈 화면에 추가’</li>' +
        '<li><strong>PC(엣지·크롬)</strong>: 주소창 오른쪽의 설치 아이콘</li></ul>' +
        '<button type="button" class="btn primary" data-act="install"' + (S.installEvent ? '' : ' hidden') + '>지금 앱으로 설치</button>') +
      '<p class="muted small">설치하면 인터넷이 없어도 한 번 본 단원은 다시 볼 수 있어요.</p></section>';

    html += impactHtml(list);

    html += '<section class="set-sec card" aria-labelledby="setInfo"><h3 id="setInfo">가정교사 정보</h3><ul class="plain-list">' +
      '<li>AI·서버 없이 이 기기 안에서만 동작해요. 질문·답·별명·기록은 기기 밖으로 나가지 않아요.</li>' +
      '<li>학습 내용은 ' + esc(cat().curriculum || '2022 개정 교육과정') + (cat().basis ? '(' + esc(cat().basis) + ')' : '') + josa(cat().curriculum || '2022 개정 교육과정', '을/를') +
        ' 참고해 새로 쓴 것이며, 교과서를 대신하지 않아요.</li>' +
      noticesInfoHtml() +
      '<li>틀린 곳을 찾았나요? <a href="' + ISSUES_URL + '" target="_blank" rel="noopener noreferrer">GitHub 저장소에 알려 주기</a> (새 창에서 열려요)</li>' +
      '<li class="muted">버전 ' + VERSION + (storageOk() ? '' : ' · 이 브라우저에서는 기록을 저장할 수 없어요') + '</li></ul></section>';

    return {
      title: '설정', tab: null, back: S.profile ? '#/home' : '#/', html: html,
      mount: function (page) {
        function formMsg(form, text, focusEl) {
          var m = $('.form-msg', form);
          if (m) { m.textContent = text || ''; m.hidden = !text; }
          if (focusEl) focusEl.focus();
        }
        function busyOn(form, on) {
          $$('button', form).forEach(function (b) { b.disabled = on; });
        }
        /* 고른 백업 파일 이름 (글자로만 넣는다) */
        function showFileName() {
          var fin = $('#bkFile', page);
          var out = $('#bkFileName', page);
          var f = fin && fin.files && fin.files[0];
          if (out) out.textContent = f ? f.name : '아직 고르지 않았어요';
        }

        page.addEventListener('change', function (e) {
          var t = e.target;
          if (t.id === 'bkFile') { showFileName(); return; }
          if (t.name === 'font') { saveSettings({ fontScale: Number(t.value) }); announce('글자 크기를 바꿨어요.'); }
          else if (t.name === 'theme') { saveSettings({ theme: t.value }); announce('화면 테마를 바꿨어요.'); }
          else if (t.name === 'pace' && cur) {
            updateProfile(cur.id, function (p) { p.pace = t.value; });
            S.quiz = null;
            /* 화면을 다시 그리지 않고(초점 유지) 학생 목록의 수준 글자만 고친다 */
            var row = page.querySelector('.student-row.is-current .p-meta');
            if (row) row.textContent = gradeLabel(cur.grade) + ' · ' + paceName(t.value) + ' · 지금 공부 중';
            announce('공부 수준을 ‘' + paceName(t.value) + '’' + josa(paceName(t.value), '으로/로') + ' 바꿨어요.');
          } else if ((t.name === 'tts' || t.name === 'ttsRate') && cur) {
            /* 읽어 주기: 기본값(자동·천천히)은 적지 않는다 */
            var pr = readObj(pk('prefs'));
            if (t.name === 'tts') { if (t.value === 'on' || t.value === 'off') pr.tts = t.value; else delete pr.tts; }
            else if (t.value === 'normal') pr.ttsRate = 'normal';
            else delete pr.ttsRate;
            if (Object.keys(pr).length) store.set(pk('prefs'), pr); else store.remove(pk('prefs'));
            announce('읽어 주기 설정을 바꿨어요.');
          }
        });

        /* ---- 이름·동물 바꾸기 ---- */
        page.addEventListener('submit', function (e) {
          var f = e.target.closest('.rename-form');
          if (!f) return;
          e.preventDefault();
          var li = f.closest('.student-row');
          var pid = li.getAttribute('data-id');
          var name = $('input[type="text"]', f).value.replace(/\s+/g, ' ').trim().slice(0, 12);
          var av = radioVal(f, 'av-' + pid);
          updateProfile(pid, function (p) {
            p.name = name;
            if (av && AVATARS.indexOf(av) >= 0) p.avatar = av;
          });
          announce('학생 정보를 바꿨어요.');
          render();
        });

        /* ---- PIN 걸기·바꾸기·풀기 ---- */
        var pinForm = $('.pin-edit', page);
        var pinBtns = $('.pin-btns', page);
        function openPinEdit(mode) {
          pinForm.setAttribute('data-mode', mode);
          $$('.pin-field', pinForm).forEach(function (f) {
            var k = f.getAttribute('data-f');
            f.hidden = mode === 'pin-set' ? k === 'old' : (mode === 'pin-remove' ? k !== 'old' : false);
          });
          $$('input', pinForm).forEach(function (i) { i.value = ''; });
          $('button[type="submit"]', pinForm).textContent = mode === 'pin-remove' ? 'PIN 풀기' : '저장';
          formMsg(pinForm, '');
          pinForm.hidden = false;
          if (pinBtns) pinBtns.hidden = true;
          var first = $$('.pin-field', pinForm).filter(function (f) { return !f.hidden; })[0];
          if (first) $('input', first).focus();
        }
        function closePinEdit() {
          pinForm.hidden = true;
          if (pinBtns) pinBtns.hidden = false;
        }
        if (pinForm) {
          pinForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var mode = pinForm.getAttribute('data-mode');
            var oldIn = $('#pinOld', pinForm);
            var n1In = $('#pinNew', pinForm);
            var n2In = $('#pinNew2', pinForm);
            var n1 = n1In.value.replace(/\s+/g, '');
            var n2 = n2In.value.replace(/\s+/g, '');
            var fresh = findProfile(cur.id);
            if (!fresh) return;
            if (mode !== 'pin-remove') {
              if (!TS.PIN_RE.test(n1)) { formMsg(pinForm, '새 PIN은 숫자 4~8자리로 정해 주세요.', n1In); return; }
              if (n1 !== n2) { formMsg(pinForm, '새 PIN 두 개가 서로 달라요. 다시 넣어 주세요.', n2In); return; }
            }
            formMsg(pinForm, '');
            busyOn(pinForm, true);
            var check = mode === 'pin-set' ? Promise.resolve(true) : TS.verifyPin(oldIn.value.replace(/\s+/g, ''), fresh.lock);
            check.then(function (ok) {
              if (!ok) {
                oldIn.value = '';
                formMsg(pinForm, '지금 PIN이 맞지 않아요.', oldIn);
                return null;
              }
              if (mode === 'pin-remove') {
                updateProfile(cur.id, function (p) { delete p.lock; });
                return 'PIN을 풀었어요.';
              }
              return TS.hashPin(n1).then(function (lock) {
                S.unlocked[cur.id] = true; // 지금 건 사람은 이미 이 학생이다
                updateProfile(cur.id, function (p) { p.lock = lock; });
                return mode === 'pin-set' ? 'PIN을 걸었어요. 앱을 다시 열거나 이 학생으로 바꿀 때 PIN을 물어봐요.' : 'PIN을 바꿨어요.';
              });
            }).then(function (done) {
              busyOn(pinForm, false);
              if (!done) return;
              render();
              setDone('.pin-done', done);
            }, function (err) {
              busyOn(pinForm, false);
              formMsg(pinForm, 'PIN을 저장하지 못했어요. ' + ((err && err.message) || ''));
            });
          });
        }

        /* ---- 백업 내보내기 ---- */
        var exportForm = $('.bk-export', page);
        exportForm.addEventListener('submit', function (e) {
          e.preventDefault();
          if (reason) return;
          var scope = radioVal(exportForm, 'bkScope');
          var pw = $('#bkPw', exportForm);
          var pw2 = $('#bkPw2', exportForm);
          var me = S.profile;
          var blocked = profiles().some(function (p) { return isLocked(p) && !(me && p.id === me.id); });
          if (!scope) { formMsg(exportForm, '누구의 기록을 내보낼지 골라 주세요.'); return; }
          if (scope === 'all' && blocked) { formMsg(exportForm, 'PIN이 걸린 다른 학생이 있어서 ‘모든 학생’은 내보낼 수 없어요.'); return; }
          if (scope === 'me' && !me) { formMsg(exportForm, '지금 공부하는 학생이 없어요.'); return; }
          if (pw.value.length < 6) { formMsg(exportForm, '백업 암호는 6자 이상으로 정해 주세요.', pw); return; }
          if (pw.value !== pw2.value) { formMsg(exportForm, '암호와 암호 확인이 서로 달라요.', pw2); return; }
          formMsg(exportForm, '');
          busyOn(exportForm, true);
          var out = $('.bk-out', exportForm);
          out.textContent = '백업 파일을 만드는 중이에요… 조금 걸려요.';
          flushStore().then(function () {
            return TS.exportBackup(store, { password: pw.value, profileIds: scope === 'all' ? null : [me.id] });
          }).then(function (res) {
            downloadText(res.fileName, res.text);
            pw.value = '';
            pw2.value = '';
            out.textContent = '백업 파일을 만들었어요: ' + res.fileName + ' (학생 ' + res.profiles + '명). 내려받은 파일을 안전한 곳에 두세요.';
            announce('백업 파일을 만들었어요.');
          }, function (err) {
            out.textContent = '';
            formMsg(exportForm, (err && err.message) || '백업 파일을 만들지 못했어요.');
          }).then(function () { busyOn(exportForm, false); });
        });

        /* ---- 백업 가져오기: 열어 보기(검사) → 요약 → 더하기/바꾸기 ---- */
        var importForm = $('.bk-import', page);
        var summary = $('.bk-summary', page);
        var pending = null;
        importForm.addEventListener('submit', function (e) {
          e.preventDefault();
          if (reason) return;
          var fileIn = $('#bkFile', importForm);
          var pwIn = $('#bkPwIn', importForm);
          var file = fileIn.files && fileIn.files[0];
          if (!file) { formMsg(importForm, '백업 파일을 골라 주세요.', fileIn); return; }
          if (!pwIn.value) { formMsg(importForm, '백업 암호를 넣어 주세요.', pwIn); return; }
          formMsg(importForm, '');
          busyOn(importForm, true);
          readFileText(file).then(function (text) { return TS.readBackup(text, pwIn.value); }).then(function (res) {
            if (!res || !res.ok) {
              /* 이유만 알리고 아무것도 바꾸지 않는다 */
              formMsg(importForm, '백업을 열지 못했어요: ' + ((res && res.errors && res.errors[0]) || '알 수 없는 문제') + '. 지금 기록은 그대로예요.');
              return;
            }
            pending = res;
            pwIn.value = '';
            summary.innerHTML = backupSummaryHtml(res);
            summary.hidden = false;
            importForm.hidden = true;
            var first = $('[data-act="bk-restore"]', summary);
            if (first) first.focus();
          }, function (err) {
            formMsg(importForm, (err && err.message) || '파일을 읽지 못했어요.');
          }).then(function () { busyOn(importForm, false); });
        });
        function closeSummary() {
          pending = null;
          summary.hidden = true;
          summary.innerHTML = '';
          importForm.hidden = false;
          $('#bkFile', importForm).value = '';
          showFileName();
        }
        function restore() {
          if (!pending) return;
          var res = pending;
          var mode = radioVal(summary, 'bkMode') === 'replace' ? 'replace' : 'add';
          var payload = res.payload;
          var keep = $('input[name="bkKeepLock"]', summary);
          if (keep && !keep.checked) {
            /* PIN을 잊었을 때: 백업 암호를 아는 사람은 PIN 없이 가져올 수 있다 */
            payload = Object.assign({}, payload, {
              profiles: payload.profiles.map(function (x) { var y = Object.assign({}, x); delete y.lock; return y; }),
            });
          }
          var ask = mode === 'add' ? Promise.resolve(true) : confirmBox({
            title: '이 기기의 기록을 모두 바꿀까요?',
            body: '이 기기의 학생 ' + profiles().length + '명과 그 기록이 백업 내용(학생 ' + payload.profiles.length + '명)으로 바뀌어요. 바꾼 뒤에 [되돌리기]로 돌아갈 수 있어요.',
            ok: '바꾸기', danger: true,
          }).then(function (yes) {
            return yes ? confirmBox({
              title: '정말 모두 바꿀까요?',
              body: '마지막으로 확인해요. 지금 이 기기의 기록 대신 백업의 기록이 보이게 돼요.',
              ok: '모두 바꾸기', danger: true,
            }) : false;
          });
          ask.then(function (yes) {
            if (!yes) return;
            busyOn(summary, true);
            flushStore().then(function () {
              return TS.restoreBackup(store, payload, { mode: mode });
            }).then(function (r) {
              S.quiz = null;
              S.review = null;
              S.chats = {};
              S.unitUI = {};
              if (mode === 'replace') { S.unlocked = {}; S.pinFails = {}; applySettings(getSettings()); }
              render();
              setDone('.bk-result', mode === 'add' ?
                '백업에서 학생 ' + ((r && r.added) || []).length + '명을 더했어요. 학생 관리에서 확인해 보세요.' :
                '이 기기의 기록을 백업 내용으로 바꿨어요. 잘못 바꿨다면 [되돌리기]를 눌러요.');
            }, function (err) {
              warn('백업을 가져오지 못했습니다', err);
              busyOn(summary, false);
              formMsg(summary, '가져오지 못했어요. 지금 기록은 그대로예요.');
            });
          });
        }

        /* ---- 모든 기록 지우기 ---- */
        function wipe() {
          if (TS && typeof TS.wipeAll === 'function' && typeof store.replaceAll === 'function') return TS.wipeAll(store, true);
          store.keys().forEach(function (k) { if (k !== 'settings') store.remove(k); });
          return flushStore();
        }
        /* ---- 틀린 곳 알림 (§11) ---- */
        function refreshReports(text) {
          var sec = $('#reports', page);
          if (!sec) return;
          $('.reports-body', sec).innerHTML = reportsBodyHtml(reportsList());
          var ta = $('.report-text', sec);
          ta.hidden = true;
          ta.value = '';
          $('.report-done', sec).textContent = text || '';
          if (text) announce(text);
        }
        function copyReports() {
          var sec = $('#reports', page);
          var ta = $('.report-text', sec);
          var dm = $('.report-done', sec);
          var text = reportsText(reportsList());
          ta.value = text;
          ta.hidden = false;
          copyText(text).then(function (ok) {
            dm.textContent = ok ? '복사했어요. 메일이나 메시지에 붙여 넣어 전해 주세요. 복사한 글은 아래에도 있어요.' :
              '자동으로 복사하지 못했어요. 아래 글을 직접 복사해 주세요.';
            announce(dm.textContent);
            if (!ok) { ta.focus(); ta.select(); }
          });
        }

        function resetSession() {
          S.profile = null;
          S.quiz = null;
          S.review = null;
          S.chats = {};
          S.unitUI = {};
          S.unlocked = {};
          S.pinFails = {};
          S.pendingRoute = null;
        }

        page.addEventListener('click', function (e) {
          var b = e.target.closest('[data-act]');
          if (!b) return;
          var act = b.getAttribute('data-act');
          var row = b.closest('.student-row');
          var pid = row ? row.getAttribute('data-id') : null;
          if (act === 'switch') {
            var tp = findProfile(pid);
            if (!tp) return;
            if (needsPin(tp)) {
              /* PIN이 걸린 학생으로 바꾸려면 PIN을 맞혀야 한다 */
              var host = $('.row-pin', row);
              var acts = $('.row-actions', row);
              var panel = pinPanel(tp, {
                hideWho: true, // 줄에 이미 별명·동물이 있다
                onOk: function () { setCurrent(tp.id); announce('학생을 바꿨어요.'); render(); },
                onCancel: function () { host.hidden = true; host.innerHTML = ''; acts.hidden = false; b.focus(); },
                onDeleted: function () { if (profiles().length) render(); else go('#/setup', true); },
              });
              host.innerHTML = '';
              host.appendChild(panel.el);
              host.hidden = false;
              acts.hidden = true;
              panel.focus();
              return;
            }
            setCurrent(pid);
            announce('학생을 바꿨어요.');
            render();
          } else if (act === 'rename') {
            var f = $('.rename-form', row);
            if (!f) return;
            f.hidden = false;
            $('.row-actions', row).hidden = true;
            $('input', f).focus();
          } else if (act === 'rename-cancel') {
            $('.rename-form', row).hidden = true;
            $('.row-actions', row).hidden = false;
          } else if (act === 'delete') {
            var target = findProfile(pid);
            if (!target) return;
            var wasCur = store.get('current', null) === pid;
            var first = confirmBox({
              title: '학생을 지울까요?',
              body: '‘' + (target.name || '이름 없는 학생') + '’ 학생과 그 학생의 진도·오답노트·대화가 모두 지워져요. 되돌릴 수 없어요.',
              ok: '지우기', danger: true,
            });
            /* PIN이 걸린 학생은 한 번 더 묻는다 */
            (isLocked(target) ? first.then(function (yes) {
              return yes ? confirmBox({ title: '정말 지울까요?', body: 'PIN이 걸린 학생이에요. 지우면 되돌릴 수 없어요.', ok: '정말 지우기', danger: true }) : false;
            }) : first).then(function (yes) {
              if (!yes) return;
              var rest = deleteProfile(pid);
              if (wasCur && rest.length) setCurrent(rest[0].id);
              announce('학생을 지웠어요.');
              if (!rest.length) go('#/setup', true); else render();
            });
          } else if (act === 'clear') {
            confirmBox({
              title: '기록을 지울까요?',
              body: '‘' + (cur.name || '이름 없는 학생') + '’의 진도·오답노트·복습 일정·풀이 기록·대화가 모두 지워져요. 되돌릴 수 없어요.',
              ok: '지우기', danger: true,
            }).then(function (yes) {
              if (!yes) return;
              clearProfileData(cur);
              var m = $('.set-msg', page);
              if (m) m.textContent = '기록을 지웠어요.';
              announce('기록을 지웠어요.');
            });
          } else if (act === 'pin-set' || act === 'pin-change' || act === 'pin-remove') {
            openPinEdit(act);
          } else if (act === 'pin-edit-cancel') {
            closePinEdit();
          } else if (act === 'bk-restore') {
            restore();
          } else if (act === 'bk-cancel') {
            closeSummary();
          } else if (act === 'bk-undo') {
            confirmBox({
              title: '가져오기 전으로 되돌릴까요?',
              body: '‘모두 바꾸기’를 하기 전의 학생·기록으로 돌아가요. 그 뒤에 쌓인 기록은 지워져요.',
              ok: '되돌리기',
            }).then(function (yes) {
              if (!yes) return;
              TS.undoRestore(store).then(function () {
                resetSession();
                applySettings(getSettings());
                render();
                setDone('.bk-result', '가져오기 전 기록으로 되돌렸어요.');
              }, function (err) {
                warn('되돌리지 못했습니다', err);
                setDone('.bk-result', '되돌리지 못했어요. 지금 기록은 그대로예요.');
              });
            });
          } else if (act === 'bk-forget') {
            store.remove('sys.restorePoint');
            flushStore();
            render();
            setDone('.bk-result', '되돌리기 지점을 지웠어요.');
          } else if (act === 'wipe-all') {
            var n = profiles().length;
            confirmBox({
              title: '이 기기의 모든 기록을 지울까요?',
              body: '이 기기에 있는 학생 ' + n + '명의 별명·진도·오답노트·풀이 기록·대화가 모두 지워져요. 화면 설정만 남아요.',
              ok: '지우기', danger: true,
            }).then(function (yes) {
              return yes ? confirmBox({
                title: '정말 모두 지울까요?',
                body: '지우면 되돌릴 수 없어요. 백업 파일이 없다면 기록을 되살릴 수 없어요.',
                ok: '모두 지우기', danger: true,
              }) : false;
            }).then(function (yes) {
              if (!yes) return;
              wipe().then(function () {
                resetSession();
                announce('이 기기의 기록을 모두 지웠어요.');
                go('#/setup', true);
              }, function (err) {
                warn('기록을 지우지 못했습니다', err);
                announce('기록을 지우지 못했어요.');
              });
            });
          } else if (act === 'install') {
            promptInstall();
          } else if (act === 'speech-test') {
            speakText('안녕하세요. 저는 가정교사예요. 이 빠르기로 읽어 줄게요. $\\frac{1}{4}+\\frac{2}{4}=\\frac{3}{4}$', b);
          } else if (act === 'report-copy') {
            copyReports();
          } else if (act === 'report-del') {
            var rl = reportsList();
            rl.splice(parseInt(b.getAttribute('data-i'), 10), 1);
            if (rl.length) store.set(pk('reports'), rl); else store.remove(pk('reports'));
            refreshReports('알림 하나를 지웠어요.');
            var nextDel = $('#reports [data-act="report-del"]', page) || $('#reports [data-act="report-copy"]', page);
            if (nextDel) nextDel.focus();
          } else if (act === 'report-clear') {
            confirmBox({
              title: '틀린 곳 알림을 모두 지울까요?',
              body: '이 기기에 모아 둔 ' + reportsList().length + '건이 지워져요. 보호자가 전했는지 먼저 확인해 주세요.',
              ok: '지우기', danger: true,
            }).then(function (yes) {
              if (!yes) return;
              store.remove(pk('reports'));
              refreshReports('틀린 곳 알림을 모두 지웠어요.');
            });
          }
        });
      },
    };
  };

  /* ================= 기록 저장 문제 (ARCHITECTURE §9.6 — 1순위 데이터 보호) =================
   * 이 기기에 기록을 쓰지 못하면(저장 공간 부족 등) 저장소(js/storage.js)가 값을 메모리에 둔 채 잠시 뒤 저절로 다시 쓴다.
   * 그동안 화면 위에 알린다: 공간을 비우면 저절로(또는 '지금 다시 저장하기'로) 저장되고, 창을 닫기 전에 설정의 백업으로
   * 파일에 남길 수도 있다(백업은 메모리의 지금 기록을 쓴다). 다시 저장되면 알림을 거둔다. */
  function initSaveWatch() {
    var bar = doc.getElementById('save-problem');
    if (!bar || !store || typeof store.onStatus !== 'function') return;
    var text = doc.getElementById('save-problem-text');
    var retry = doc.getElementById('save-retry');
    var shown = '';
    store.onStatus(function (st) {
      if (st.ok) {
        if (!bar.hidden) {
          bar.hidden = true;
          shown = '';
          announce('밀린 학습 기록을 저장했어요.');
        }
        return;
      }
      var kind = /quota/i.test(st.error || '') ? 'full' : 'other';
      if (!bar.hidden && shown === kind) return; // 다시 시도할 때마다 같은 알림을 되풀이하지 않는다
      shown = kind;
      text.innerHTML = '<strong>학습 기록을 이 기기에 저장하지 못하고 있어요.</strong> ' +
        (kind === 'full' ? '기기의 저장 공간이 부족해요. 사진이나 쓰지 않는 앱을 정리하면 저절로 다시 저장해요. ' : '잠시 뒤 저절로 다시 저장해요. ') +
        '창을 닫기 전에 <a href="#/settings">설정</a>의 백업으로 기록을 파일에 남겨 둘 수 있어요.';
      var first = bar.hidden;
      bar.hidden = false;
      if (first) announce('학습 기록을 저장하지 못하고 있어요.');
    });
    retry.addEventListener('click', function () {
      retry.disabled = true;
      flushStore().then(function () {
        retry.disabled = false;
        if (!bar.hidden) announce('아직 저장하지 못했어요. 저장 공간을 확인해 주세요.');
      });
    });
  }

  /* ================= 앱 설치 안내 ================= */

  function showInstall(text, withButton) {
    if (APP_MODE || getSettings().installHint === 'off') return;
    doc.getElementById('install-text').textContent = text;
    doc.getElementById('install-btn').hidden = !withButton;
    doc.getElementById('install-bar').hidden = false;
  }
  function hideInstall() { doc.getElementById('install-bar').hidden = true; }
  function promptInstall() {
    var ev = S.installEvent;
    if (!ev) return;
    var done = function () { S.installEvent = null; hideInstall(); $$('[data-act="install"]').forEach(function (b) { b.hidden = true; }); };
    try { ev.prompt(); } catch (e) { warn('설치 창을 열지 못했습니다', e); }
    Promise.resolve(ev.userChoice).then(done, done);
  }
  function initInstall() {
    window.addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault();
      if (APP_MODE) return;
      S.installEvent = e;
      showInstall('홈 화면에 설치하면 주소창 없이 앱처럼 쓸 수 있어요.', true);
      $$('[data-act="install"]').forEach(function (b) { b.hidden = false; });
    });
    window.addEventListener('appinstalled', hideInstall);
    doc.getElementById('install-btn').addEventListener('click', promptInstall);
    doc.getElementById('install-close').addEventListener('click', function () {
      hideInstall();
      saveSettings({ installHint: 'off' });
    });
    /* 아이패드 사파리는 Mac 처럼 자신을 밝힌다 → 터치 지점 수로 가려낸다 */
    var ua = navigator.userAgent || '';
    var ipad = /iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var ios = ipad || /iPhone|iPod/.test(ua);
    if (ios && window.isSecureContext && location.protocol !== 'file:') {
      showInstall('앱처럼 쓰려면: 사파리 ' + (ipad ? '오른쪽 위' : '아래쪽') + ' 공유 버튼(□↑) → ‘홈 화면에 추가’', false);
    }
  }

  /* ================= 시작 ================= */

  window.TutorApp = {
    version: VERSION,
    appMode: APP_MODE,
    route: null,
    /* 기록이 이 기기에 남는지(IndexedDB·localStorage) — 메모리뿐이면 false */
    get storageOk() { return storageOk(); },
    get storageProvider() { return store.provider || 'localstorage'; },
    profile: function () { return S.profile ? JSON.parse(JSON.stringify(S.profile)) : null; },
    quizState: function () {
      var q = S.quiz;
      if (!q) return null;
      /* items: 지금까지 낸 문제(맞춤 난이도면 한 문제씩 늘어난다), total: 낼 문제 수 */
      return {
        key: q.key, index: q.i, total: q.total, done: q.done, retry: q.retry, seed: q.seed,
        adaptive: !!q.adaptive, level: q.adaptive ? q.level : null,
        items: q.items.map(function (it) {
          return {
            unit: it.unit, src: it.src, gen: it.gen, key: it.key, extra: !!it.extra, type: it.p.type, level: it.p.level, q: it.p.q,
            answer: it.p.answer, choices: it.p.choices || null, check: it.p.check || null, unitLabel: it.p.unit || null,
            concept: typeof it.p.concept === 'number' ? it.p.concept : null, why: it.p.why || null, wrong: it.p.wrong || null,
          };
        }),
        answers: q.answers.slice(),
      };
    },
    engines: function () {
      return {
        TutorMath: !!engine('TutorMath'), TutorText: !!engine('TutorText'), TutorFig: !!engine('TutorFig'),
        TutorSearch: !!engine('TutorSearch'), TutorSolver: !!engine('TutorSolver'),
      };
    },
    go: function (hash) { go(hash); },
  };

  function init() {
    doc.getElementById('backBtn').addEventListener('click', goBack);
    doc.getElementById('skipLink').addEventListener('click', function () {
      var m = doc.getElementById('main');
      var t = $('.page-title', m) || m;
      if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
      t.focus();
    });
    window.addEventListener('hashchange', render);
    initInstall();
    initSaveWatch();
    /* 좁은 화면의 긴 수식(§16): 화면을 그리거나, 칸이 보이거나, 너비가 바뀌면 다시 잰다 */
    var mainEl = doc.getElementById('main');
    if (window.MutationObserver) {
      new MutationObserver(queueFit).observe(mainEl, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden', 'open', 'class'] });
    }
    if (window.ResizeObserver) new ResizeObserver(queueFit).observe(mainEl);
    else window.addEventListener('resize', queueFit);
    /* 마지막에 누른 단추·링크(사파리는 눌러도 초점이 옮겨지지 않는다 — confirmBox 가 닫힌 뒤 초점을 돌려줄 곳) */
    doc.addEventListener('click', function (e) {
      var t = e.target && e.target.closest ? e.target.closest('button, a[href], input, select, textarea') : null;
      if (t) { lastPressed = t; lastPressedAt = Date.now(); }
    }, true);
    /* 읽어 주기(§13): 이 기기 안의 목소리를 찾고, 어느 화면의 🔊 버튼이든 여기서 받는다 */
    initSpeech();
    doc.addEventListener('click', function (e) {
      var b = e.target && e.target.closest ? e.target.closest('[data-speak]') : null;
      if (!b) return;
      var fn = SPEECH.reg[b.getAttribute('data-speak')];
      if (typeof fn === 'function') {
        var src = '';
        try { src = String(fn() || ''); } catch (err) { report(err); }
        speakText(src, b);
      }
    });
    /* 서비스 워커: 설치 조건을 채우고 오프라인에서도 화면을 띄운다. file:// 에서는 쓸 수 없다. */
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register('sw.js').then(null, function () { /* 실패해도 페이지는 동작한다 */ });
    }
    /* 저장소(IndexedDB)를 다 불러온 뒤에 처음 그린다. 실패하거나 너무 오래 걸려도 화면은 그린다 */
    function start() {
      if (S.started) return;
      S.started = true;
      applySettings(getSettings()); // 저장소의 설정으로 다시 (사본이 없던 기기)
      render();
    }
    var ready = null;
    try { ready = typeof store.ready === 'function' ? store.ready() : null; } catch (e) { warn('저장소를 열지 못했습니다', e); }
    if (ready && typeof ready.then === 'function') {
      ready.then(start, function (e) { warn('저장소를 열지 못했습니다', e); start(); });
      setTimeout(start, 8000);
    } else {
      start();
    }
  }

  init();
})();
