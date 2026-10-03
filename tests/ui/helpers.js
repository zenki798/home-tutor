const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { expect } = require('@playwright/test');

/*
 * 화면 테스트 도우미.
 * - data/catalog.js · data/units/* · data/index/* 를 tests/fixtures/ 의 가짜 데이터로 바꿔 끼운다
 *   (진짜 학습 내용이 바뀌어도 화면 테스트는 결정적으로).
 * - 외부 주소 요청은 전부 막고 기록한다 → 테스트마다 0건을 확인한다.
 */

const ROOT = path.resolve(__dirname, '..', '..');
const FIX = path.join(ROOT, 'tests', 'fixtures');
const FILE_URL = pathToFileURL(path.join(ROOT, 'index.html')).href;

/* 테스트용 학생 (실제 이름이 아닌 더미 값) */
const STUDENT = { id: 'p-test-a', name: '테스트', avatar: '🐶', level: 'mid', grade: 'm2', pace: 'normal', created: 1 };
const STUDENT_B = { id: 'p-test-b', name: '별빛', avatar: '🐰', level: 'elem', grade: 'e5', pace: 'easy', created: 2 };

function fixture(rel) {
  const file = path.join(FIX, rel);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
}

/* 브라우저 안에서 돈다(문자열로 바꿔 카탈로그 뒤에 붙인다) */
function patchCatalog(patch) {
  var c = Tutor.catalog;
  (patch.soon || []).forEach(function (id) {
    c.courses.forEach(function (co) { co.units.forEach(function (u) { if (u.id === id) u.soon = true; }); });
  });
  (patch.rev || []).forEach(function (id) {
    c.courses.forEach(function (co) { co.units.forEach(function (u) { if (u.id === id) u.rev = true; }); });
  });
  (patch.courses || []).forEach(function (co) { c.courses.push(co); });
  Tutor.registerCatalog(c);
}

/**
 * @param {import('@playwright/test').Page|import('@playwright/test').BrowserContext} target
 * @param {object} [opt]
 * catalogPatch: { soon: [단원id…], rev: [단원id…](개정 반영 중), courses: [과정…] }
 * @param {string[]} [opt.failUnits]  이 단원 파일은 처음 한 번 실패시킨다(다시 시도 확인용)
 * @param {boolean}  [opt.failIndex]  검색 색인을 모두 실패시킨다
 * @param {string[]} [opt.blockScripts] 이 경로(js/…)의 스크립트를 404 로 (엔진이 없을 때 화면이 버티는지)
 */
async function routeFixtures(target, opt = {}) {
  const calls = { external: [], units: [], index: [] };
  const failedOnce = {};

  /* 목록에 없는 외부 요청은 막고 기록한다. 뒤에 등록한 route 가 먼저 적용된다. */
  await target.route(/^https?:\/\/(?!localhost[:/]|127\.0\.0\.1[:/])/, (route) => {
    calls.external.push(route.request().url());
    return route.abort();
  });

  await target.route(/\/data\/catalog\.js(\?.*)?$/, (route) => {
    let body = fixture('catalog.js');
    /* 시험마다 카탈로그를 조금 바꿔 끼운다: { soon: [단원id…], courses: [과정…] } — 준비 중 단원 확인용 */
    if (opt.catalogPatch) body += '\n;(' + patchCatalog.toString() + ')(' + JSON.stringify(opt.catalogPatch) + ');\n';
    return route.fulfill({ status: 200, contentType: 'text/javascript; charset=utf-8', body });
  });

  await target.route(/\/data\/units\/([^/?#]+)\.js(\?.*)?$/, (route) => {
    const name = /\/data\/units\/([^/?#]+)\.js/.exec(route.request().url())[1];
    calls.units.push(name);
    if ((opt.failUnits || []).includes(name) && !failedOnce[name]) {
      failedOnce[name] = true;
      return route.abort('connectionrefused');
    }
    const body = fixture(path.join('units', name + '.js'));
    if (body === null) return route.fulfill({ status: 404, contentType: 'text/plain', body: 'Not Found' });
    return route.fulfill({ status: 200, contentType: 'text/javascript; charset=utf-8', body });
  });

  await target.route(/\/data\/index\/([^/?#]+)\.js(\?.*)?$/, (route) => {
    const name = /\/data\/index\/([^/?#]+)\.js/.exec(route.request().url())[1];
    calls.index.push(name);
    if (opt.failIndex) return route.abort('connectionrefused');
    const body = fixture(path.join('index', name + '.js'));
    if (body === null) return route.fulfill({ status: 404, contentType: 'text/plain', body: 'Not Found' });
    return route.fulfill({ status: 200, contentType: 'text/javascript; charset=utf-8', body });
  });

  for (const s of opt.blockScripts || []) {
    await target.route('**/' + s, (route) => route.fulfill({ status: 404, contentType: 'text/plain', body: 'Not Found' }));
  }
  return calls;
}

/* 콘솔 에러·페이지 예외를 모은다 */
function collectErrors(page) {
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(e.message));
  return errors;
}

/* 지금 주소(location.hash)의 화면을 다 그렸을 때까지 기다린다.
   링크를 누른 직후에는 hashchange 가 아직 처리되지 않아 이전 화면의 ready 가 남아 있을 수 있어서, 그린 주소(data-route)까지 맞춰 본다. */
async function waitReady(page, timeout = 10000) {
  await page.waitForFunction(() => {
    const r = document.documentElement;
    return r.getAttribute('data-state') === 'ready' && r.getAttribute('data-route') === (location.hash || '#');
  }, null, { timeout });
}

/* 페이지를 열기 전에 저장소(localStorage)를 채운다. 새로고침에는 다시 채우지 않는다. */
async function seedStorage(page, items) {
  await page.addInitScript((data) => {
    try {
      if (sessionStorage.getItem('__seeded')) return;
      sessionStorage.setItem('__seeded', '1');
      Object.keys(data).forEach((k) => localStorage.setItem(k, JSON.stringify(data[k])));
    } catch (e) { /* 막힌 경우는 그 테스트가 따로 다룬다 */ }
  }, items);
}

function studentItems(students = [STUDENT], current = students[0].id, extra = {}) {
  return Object.assign({ 'tutor.profiles': students, 'tutor.current': current }, extra);
}

/**
 * 가짜 데이터를 끼우고 연다.
 * @param {import('@playwright/test').Page} page
 * @param {object} [opt]  routeFixtures 옵션 + url, student(true|프로필|false), storage(추가 저장값), context, wait
 */
async function open(page, opt = {}) {
  const calls = await routeFixtures(opt.context || page, opt);
  const student = opt.student === undefined ? false : opt.student;
  if (student || opt.storage) {
    const list = student === true ? [STUDENT] : student ? [].concat(student) : [];
    const items = list.length ? studentItems(list, list[0].id, opt.storage || {}) : Object.assign({}, opt.storage);
    await seedStorage(page, items);
  }
  await page.goto(opt.url || '/');
  if (opt.wait !== false) await waitReady(page);
  return calls;
}

/* 앱 안에서 주소 이동 (hashchange) */
async function goHash(page, hash) {
  await page.evaluate((h) => { location.hash = h; }, hash);
  await waitReady(page);
}

/* 앱의 저장소(Tutor.store — IndexedDB 를 메모리에 올려 둔 것)에서 읽는다. 밀린 쓰기를 먼저 저장해 두어,
   바로 뒤에 새로고침해도 기록이 남는다 */
async function readStore(page, key) {
  return page.evaluate(async (k) => {
    const st = window.Tutor && window.Tutor.store;
    if (!st) return null;
    try { if (st.flush) await st.flush(); } catch (e) { /* 저장 실패는 시험이 따로 본다 */ }
    const v = st.get(k, null);
    return v === undefined ? null : v;
  }, key);
}

/* 밀린 쓰기를 지금 저장 (새로고침·다른 탭 전에) */
async function flushStore(page) {
  await page.evaluate(async () => { if (window.Tutor && window.Tutor.store && window.Tutor.store.flush) await window.Tutor.store.flush(); });
}

/* IndexedDB(home-tutor / kv)에 실제로 저장된 것을 그대로 읽는다 — { 키: 값 } */
async function readIDB(page) {
  return page.evaluate(() => new Promise((resolve, reject) => {
    const req = indexedDB.open('home-tutor');
    let fresh = false;
    /* 아직 없는 DB 를 시험이 먼저 만들지 않게: 새로 만들려 하면 그만둔다 */
    req.onupgradeneeded = () => { fresh = true; req.transaction.abort(); };
    req.onerror = () => (fresh ? resolve({}) : reject(req.error));
    req.onsuccess = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('kv')) { db.close(); resolve({}); return; }
      const out = {};
      const t = db.transaction('kv', 'readonly');
      const cur = t.objectStore('kv').openCursor();
      cur.onsuccess = () => { const c = cur.result; if (c) { out[String(c.key)] = c.value; c.continue(); } };
      t.oncomplete = () => { db.close(); resolve(out); };
      t.onerror = () => { db.close(); reject(t.error); };
    };
  }));
}

/* localStorage 의 'tutor.*' 값 (예전 저장 방식 — 이제는 화면 설정 사본만 남아야 한다) */
async function readLocal(page) {
  return page.evaluate(() => {
    const out = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf('tutor.') === 0) out[k] = localStorage.getItem(k);
      }
    } catch (e) { /* 막힘 */ }
    return out;
  });
}

/* CSP 위반(securitypolicyviolation)을 모은다 — 페이지를 열기 전에 부른다 */
async function trackCsp(page) {
  await page.addInitScript(() => {
    window.__csp = [];
    document.addEventListener('securitypolicyviolation', (e) => {
      window.__csp.push(e.violatedDirective + ' ' + e.blockedURI);
    });
  });
}
async function cspViolations(page) {
  return page.evaluate(() => window.__csp || []);
}

async function quizState(page) {
  return page.evaluate(() => window.TutorApp.quizState());
}

/* 지금 문제의 정답을 고르거나 쓴다. how: 'right' | 'wrong'. 입력 위치는 화면의 data-i(원래 번호)로 찾는다 */
async function answerCurrent(page, how = 'right', opts = {}) {
  const st = await quizState(page);
  const item = st.items[st.index];
  const form = page.locator('.quiz form.problem');
  await fillAnswer(page, form, item, how, opts);
  await form.locator('.pw-submit').click();
  await expect(form.locator('.feedback')).toBeVisible();
  return item;
}

async function fillAnswer(page, form, item, how, opts = {}) {
  if (item.type === 'choice') {
    const n = item.choices.length;
    const pick = how === 'right' ? item.answer : (item.answer + 1) % n;
    await form.locator('.choice[data-i="' + pick + '"]').click();
  } else if (item.type === 'ox') {
    const v = how === 'right' ? item.answer : !item.answer;
    await form.locator('.ox-btn[data-v="' + v + '"]').click();
  } else if (item.type === 'order') {
    const seq = how === 'right' ? item.answer : item.answer.slice().reverse();
    for (const i of seq) await form.locator('.order-item[data-i="' + i + '"]').click();
  } else {
    const first = Array.isArray(item.answer) ? (item.check === 'set' ? item.answer.join(', ') : item.answer[0]) : String(item.answer);
    let text = how === 'right' ? first : '987654';
    if (how === 'right' && opts.withUnit && item.unitLabel) text = text + item.unitLabel;
    await form.locator('.short-input').fill(text);
  }
}

/* 결과 화면이 나올 때까지 모두 정답(또는 표시한 번호만 오답)으로 풀기 */
async function solveAll(page, wrongAt = []) {
  /* 맞춤 난이도(섞어서)는 다음 문제를 그때그때 고르므로, 문제마다 상태를 다시 읽는다 */
  for (let guard = 0; guard < 60; guard++) {
    const st = await quizState(page);
    if (st.done) break;
    await answerCurrent(page, wrongAt.includes(st.index) ? 'wrong' : 'right', { withUnit: true });
    await page.locator('.quiz-next').click();
  }
  await expect(page.locator('.result')).toBeVisible();
}

/* 가로 스크롤이 생기지 않았는지 (문서 너비가 화면 너비를 넘지 않는지) */
async function horizontalOverflow(page) {
  return page.evaluate(() => {
    const el = document.scrollingElement || document.documentElement;
    return el.scrollWidth - el.clientWidth;
  });
}

module.exports = {
  ROOT, FIX, FILE_URL, STUDENT, STUDENT_B,
  routeFixtures, collectErrors, waitReady, seedStorage, studentItems, open, goHash, readStore,
  flushStore, readIDB, readLocal, trackCsp, cspViolations,
  quizState, answerCurrent, fillAnswer, solveAll, horizontalOverflow,
};
