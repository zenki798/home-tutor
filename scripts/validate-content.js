/* 학습 내용 전체 검사 — 단원 800여 개의 품질 문지기 (AGENTS.md 규칙 1·3, docs/ARCHITECTURE.md §7)
 *
 *   node scripts/validate-content.js                       전체: 카탈로그 + data/units/*.js
 *   node scripts/validate-content.js --unit math-e4-07     단원 하나 (여러 번: --unit a --unit b 또는 --unit a,b)
 *   node scripts/validate-content.js --course math-e4      과정 하나       --subject math    과목 하나
 *   옵션: --seeds N         생성기를 seed 1..N 으로 돌려 본다 (기본 300)
 *         --quiet           경고는 숨기고 오류만
 *         --json            결과를 JSON 으로 ({ errors, warnings, stats })
 *         --allow-missing   카탈로그에 있는데 파일이 아직 없는 단원을 오류 대신 경고로 (내용 작성 중일 때)
 *         --catalog <파일>  --units-dir <폴더>   다른 카탈로그·단원 폴더 (기본 data/catalog.js, data/units)
 *
 * 출력: 한 줄에 하나 "✗ 파일 · 칸 경로 · 무엇이 틀렸고 어떻게 고치나" (✗ 오류, △ 경고),
 *       마지막 줄 "오류 N · 경고 M · 단원 K · 문제 P · 생성기 G". 오류가 있으면 종료 코드 1.
 *
 * 단원 하나의 규칙(형식·개수·정답 자기 일관성·서식 글·그림·생성기·조사·비밀정보)은 scripts/lib/unit-checks.js 에 있다
 * (작성자가 쓰는 lint-unit.js 와 같은 규칙 — 둘이 어긋나지 않게 한 곳에 둔다). 여기서는 그 위에
 *   - 카탈로그 형식(§7.1)과 파일 ↔ 카탈로그의 짝(파일 이름 = 단원 id = 카탈로그 단원 id, 빠진 파일)
 *   - 파일마다 따로 실행(한 파일의 문법 오류가 다른 파일을 막지 않게)
 *   - unit-checks 가 보지 않는 것: 문제 id 누락, 칸 이름 오타, 정답 칸의 금지 글자, 값이 같은 보기,
 *     생성기의 끝나지 않는 반복, 여러 seed 에서의 결정성, 호출 순서에 따라 달라지는 생성기
 * 를 더 본다.
 *
 * module.exports = { validateAll, validateUnitFile, loadCatalog, loadUnitFile }
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { performance } = require('perf_hooks');

const ROOT = path.join(__dirname, '..');
const TutorMath = require(path.join(ROOT, 'js', 'mathlib.js'));
const TutorText = require(path.join(ROOT, 'js', 'mathtext.js'));
const TutorFig = require(path.join(ROOT, 'js', 'figures.js'));
const { checkUnit, RANGES } = require('./lib/unit-checks');

const DEFAULT_CATALOG = path.join(ROOT, 'data', 'catalog.js');
const DEFAULT_UNITS = path.join(ROOT, 'data', 'units');
const DEFAULT_SEEDS = 300;
const LOAD_TIMEOUT_MS = 5000;      // 파일 하나를 실행하는 시간 (끝나지 않는 반복 막기)
const REPORT_SEEDS = 3;            // 같은 규칙에 걸린 seed 는 앞 3개만 보고 (같은 오류 수백 줄 방지)

/* ---------- 작은 도구 ---------- */

function isStr(x) { return typeof x === 'string'; }
function nonEmpty(x) { return isStr(x) && x.trim().length > 0; }
function isObj(x) { return !!x && typeof x === 'object' && !Array.isArray(x); }
function typeName(x) {
  if (x === undefined) return '없음';
  if (x === null) return 'null';
  if (Array.isArray(x)) return '배열';
  if (typeof x === 'string') return '글자';
  if (typeof x === 'number') return '수';
  if (typeof x === 'boolean') return '참/거짓';
  if (typeof x === 'function') return '함수';
  return '객체';
}
function show(x, max) {
  let s;
  try { s = typeof x === 'string' ? x : JSON.stringify(x); } catch (e) { s = String(x); }
  if (s === undefined) s = String(x);
  max = max || 60;
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}
function relPath(abs) {
  const r = path.relative(ROOT, abs);
  const inside = r && !r.startsWith('..') && !path.isAbsolute(r);
  return (inside ? r : abs).split(path.sep).join('/');
}
function asList(x) {
  if (x === undefined || x === null || x === '') return null;
  const arr = (Array.isArray(x) ? x : [x]).reduce((acc, v) => acc.concat(String(v).split(',')), []);
  const out = arr.map((s) => s.trim()).filter(Boolean);
  return out.length ? out : null;
}
function escapeRe(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

// 오타 칸 이름에 "혹시 ○○?" 를 붙이기 위한 편집 거리
function editDistance(a, b) {
  const m = a.length;
  const n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}
const KEY_ALIASES = {
  explanation: 'explain', explains: 'explain', solution: 'explain', answers: 'answer', options: 'choices', choice: 'choices',
  hints: 'hint', question: 'q', questions: 'q', concepts: 'concept', example: 'examples', term: 'terms', problems: 'practice',
  practise: 'practice', advance: 'advanced', faqs: 'faq', mistake: 'mistakes', gen: 'gens', generators: 'gens', words: 'vocab',
  goal: 'goals', standard: 'standards', defs: 'def', definition: 'def', meaning: 'm', word: 'w', example_ko: 'exm', make_: 'make',
};
function suggestKey(k, allowed) {
  const lower = String(k).toLowerCase();
  if (KEY_ALIASES[lower] && allowed.indexOf(KEY_ALIASES[lower]) >= 0) return KEY_ALIASES[lower];
  let best = null;
  let bestD = 3;
  for (const a of allowed) {
    const d = editDistance(lower, a.toLowerCase());
    if (d < bestD) { bestD = d; best = a; }
  }
  return best;
}
function unknownKeyMsg(k, allowed) {
  const s = suggestKey(k, allowed);
  return "모르는 칸 '" + k + "' 이 있어요 — 화면이 쓰지 않아요" + (s ? ". 혹시 '" + s + "'?" : '') + ' (쓸 수 있는 칸: ' + allowed.join(', ') + ')';
}

// 화면에 보이는 글에 들어가면 안 되는 글자 — 생성기의 빈 값(undefined·NaN)이나 쓰다 만 표시. unit-checks 와 같은 규칙
const FORBIDDEN = ['undefined', 'NaN', '[object Object]', 'Infinity', 'TODO', 'FIXME', 'lorem', 'XXX'];
const NULL_RE = /(^|[^A-Za-z])null([^A-Za-z]|$)/;
function forbiddenIn(s) {
  const out = [];
  for (const f of FORBIDDEN) if (s.indexOf(f) >= 0) out.push(f);
  if (NULL_RE.test(s)) out.push('null');
  return out;
}

// unit-checks 에 넘기는 TutorText: 같은 글을 수백 번 검사하지 않게 결과를 기억한다 (생성기 보기·힌트는 seed 마다 되풀이된다)
const memoText = (function () {
  const LIMIT = 30000;
  const checks = new Map();
  const plains = new Map();
  function memo(map, fn, s) {
    if (typeof s !== 'string') return fn(s);
    let r = map.get(s);
    if (r === undefined) {
      if (map.size >= LIMIT) map.clear();
      r = fn(s);
      if (Array.isArray(r)) Object.freeze(r);
      map.set(s, r);
    }
    return r;
  }
  return {
    check: (s) => memo(checks, TutorText.check, s),
    plain: (s) => memo(plains, TutorText.plain, s),
    render: TutorText.render,
    inline: TutorText.inline,
    tex: TutorText.tex,
  };
})();

const numberMemo = new Map();
function choiceNumber(c) {
  // 보기가 수 하나(3/4, $\frac{3}{4}$, 0.75, $1\frac{1}{2}$ …)면 그 값, 아니면 null
  if (typeof c !== 'string') return null;
  let v = numberMemo.get(c);
  if (v === undefined) {
    if (numberMemo.size > 30000) numberMemo.clear();
    v = /\d/.test(c) ? TutorMath.parseNumberAnswer(c) : null;
    numberMemo.set(c, v);
  }
  return v;
}

/* ---------- 파일 실행 ---------- */

// data/*.js 파일 하나를 새 vm 문맥에서 실행해 등록을 모은다. 엔진 전역(TutorMath·TutorText·TutorFig)도 넣어 준다.
function runScript(src, filename) {
  const got = { catalogs: [], units: [], indexes: [], logs: 0, error: null, context: null };
  const Tutor = {
    registerCatalog: function (c) { got.catalogs.push(c); },
    registerUnit: function (u) { got.units.push(u); },
    registerIndex: function (s, e) { got.indexes.push({ subject: s, entries: e }); },
  };
  const count = function () { got.logs++; };
  const sandbox = {
    Tutor: Tutor, TutorMath: TutorMath, TutorText: TutorText, TutorFig: TutorFig,
    console: { log: count, info: count, warn: count, error: count, debug: count },
  };
  sandbox.self = sandbox;
  sandbox.window = sandbox;
  const context = vm.createContext(sandbox);
  got.context = context;
  try {
    new vm.Script(String(src), { filename: filename }).runInContext(context, { timeout: LOAD_TIMEOUT_MS });
  } catch (e) {
    got.error = describeError(e, filename);
  }
  return got;
}

function describeError(e, filename) {
  const name = e && e.name ? String(e.name) : 'Error';
  const message = e && e.message !== undefined ? String(e.message) : String(e);
  if (e && e.code === 'ERR_SCRIPT_EXECUTION_TIMEOUT') {
    return { line: 0, msg: '파일을 실행하는 데 ' + (LOAD_TIMEOUT_MS / 1000) + '초가 넘게 걸려요 — 끝나지 않는 반복문이 있는지 보세요' };
  }
  const m = new RegExp(escapeRe(filename) + ':(\\d+)').exec(e && e.stack ? String(e.stack) : '');
  const line = m ? Number(m[1]) : 0;
  if (name === 'SyntaxError') {
    let hint = '';
    if (/Unexpected end of input/.test(message)) hint = ' — 파일이 중간에 끊겼어요(괄호·따옴표가 닫히지 않았거나 아직 쓰는 중이에요)';
    else if (/Invalid or unexpected token/.test(message)) hint = ' — 따옴표 안에서 줄을 바꿨거나(줄바꿈은 \\n) 따옴표 짝이 맞지 않아요';
    else if (/Unexpected (identifier|string|number|token)/.test(message)) hint = " — 앞 칸 끝의 쉼표(,)가 빠졌거나, 작은따옴표 글 안의 ' 를 \\' 로 쓰지 않았는지 보세요";
    return { line: line, msg: '문법 오류: ' + message + hint };
  }
  return { line: line, msg: '실행 중 오류(' + name + '): ' + message };
}

function readSource(file) {
  try {
    return { src: fs.readFileSync(file, 'utf8') };
  } catch (e) {
    return { error: '파일을 읽지 못했어요: ' + e.message };
  }
}

// 단원 파일 하나를 실행해 단원 객체를 받는다 (build-index.js 도 쓴다)
//   → { unit, context, error, count, logs, wrongCalls }
function loadUnitFile(file, source) {
  const abs = path.resolve(file);
  let src = source;
  if (src === undefined) {
    const r = readSource(abs);
    if (r.error) return { unit: null, error: { line: 0, msg: r.error }, count: 0 };
    src = r.src;
  }
  const run = runScript(src, relPath(abs));
  return {
    unit: run.units.length ? run.units[0] : null,
    count: run.units.length,
    error: run.error,
    context: run.context,
    logs: run.logs,
    wrongCalls: run.catalogs.length + run.indexes.length,
    source: src,
  };
}

/* ---------- 카탈로그 (§7.1) ---------- */

const CATALOG_KEYS = ['version', 'curriculum', 'basis', 'levels', 'subjects', 'notices', 'courses'];
const COURSE_KEYS = ['id', 'subject', 'level', 'grades', 'title', 'note', 'units'];
// soon: 내용이 아직 없는 단원(화면에 '준비 중'으로 보인다) — build-catalog.js 가 파일 유무로 붙인다
// rev: 교육과정 개정 뒤 아직 새 성취기준으로 다시 쓰지 않은 단원(화면에 '개정 반영 중') — build-catalog.js 가 성취기준을 견줘 붙인다
const CAT_UNIT_KEYS = ['id', 'title', 'summary', 'sem', 'soon', 'rev'];
const ID_RE = /^[a-z][a-z0-9]*$/;
const COURSE_ID_RE = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;

function loadCatalog(file) {
  const abs = path.resolve(file || DEFAULT_CATALOG);
  const res = {
    file: relPath(abs), catalog: null, errors: [], warnings: [],
    levels: new Map(), grades: new Map(), subjects: new Map(), courses: new Map(), units: new Map(),
  };
  const add = (list, level) => (p, msg, extra) => list.push(Object.assign({ level: level, file: res.file, path: p, msg: msg }, extra || {}));
  const E = add(res.errors, 'error');
  const W = add(res.warnings, 'warning');

  if (!fs.existsSync(abs)) {
    E('', '카탈로그 파일이 없어요 — node scripts/build-catalog.js 로 curriculum/*.json 에서 만드세요');
    return res;
  }
  const r = readSource(abs);
  if (r.error) { E('', r.error); return res; }
  const run = runScript(r.src, res.file);
  if (run.error) {
    E(run.error.line ? run.error.line + '번째 줄' : '', run.error.msg);
    return res;
  }
  if (run.catalogs.length !== 1) {
    E('', 'Tutor.registerCatalog 를 ' + run.catalogs.length + '번 불렀어요 — 카탈로그 파일은 한 번만 불러요');
    if (!run.catalogs.length) return res;
  }
  if (run.units.length || run.indexes.length) E('', '카탈로그 파일에서 Tutor.registerUnit·registerIndex 를 부르면 안 돼요');
  const c = run.catalogs[0];
  if (!isObj(c)) { E('', '카탈로그가 객체가 아니에요: ' + typeName(c)); return res; }
  res.catalog = c;

  Object.keys(c).forEach((k) => { if (CATALOG_KEYS.indexOf(k) < 0) W(k, unknownKeyMsg(k, CATALOG_KEYS)); });
  if (!Number.isInteger(c.version) || c.version < 1) E('version', 'version 은 1 이상의 정수예요: ' + show(c.version));
  if (!nonEmpty(c.curriculum)) E('curriculum', "curriculum(교육과정 이름, 예: '2022 개정 교육과정')이 없어요");
  if (c.basis !== undefined && !nonEmpty(c.basis)) E('basis', "basis(기준 고시, 예: '교육부 고시 제2022-33호')는 글자예요");
  // 그 뒤 고시(curriculum/notices.json → build-catalog): 화면이 과목·학년별 "교육과정 소식"으로 쓴다
  if (c.notices !== undefined) {
    if (!Array.isArray(c.notices)) E('notices', 'notices 는 배열이에요');
    (Array.isArray(c.notices) ? c.notices : []).forEach((n, i) => {
      const p = 'notices[' + i + ']';
      if (!isObj(n) || !nonEmpty(n.id) || !nonEmpty(n.no)) { E(p, '고시는 { id, no, date, effective, parts } 객체예요'); return; }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(String(n.date))) E(p + '.date', '고시 날짜는 YYYY-MM-DD 예요: ' + show(n.date));
      if (n.url !== undefined && !/^https:\/\//.test(String(n.url))) E(p + '.url', '원문 주소는 https:// 로 시작해요');
      if (!Array.isArray(n.effective) || n.effective.some((e) => !isObj(e) || !/^\d{4}-\d{2}-\d{2}$/.test(String(e.date)) || !Array.isArray(e.grades) || !e.grades.length)) {
        E(p + '.effective', '시행일은 [{ date: YYYY-MM-DD, grades: [학년 id…] }] 꼴이에요');
      }
      if (!Array.isArray(n.parts)) E(p + '.parts', 'parts 는 배열이에요');
      // 별책 성취기준 비교 결과(curriculum-watch → notices.json analysis → build-catalog)
      (Array.isArray(n.parts) ? n.parts : []).forEach((part, j) => {
        const pp = p + '.parts[' + j + ']';
        if (!isObj(part)) { E(pp, '부분은 객체예요'); return; }
        const VERIFIED = ['scheduled', 'active', 'applied'];
        if (part.status !== undefined && VERIFIED.concat(['unchanged', 'manual']).indexOf(part.status) < 0) E(pp + '.status', 'status 는 scheduled·active·unchanged·manual 중 하나예요: ' + show(part.status));
        if (part.changes !== undefined) {
          if (!Array.isArray(part.changes) || VERIFIED.indexOf(part.status) < 0) { E(pp + '.changes', 'changes 는 확인된 판(scheduled·active)의 배열이에요'); return; }
          part.changes.forEach((x, k) => {
            const cp = pp + '.changes[' + k + ']';
            if (!isObj(x) || ['chg', 'add', 'del'].indexOf(x.k) < 0 || !/^\[\d{1,2}[^\]]+\d{2}-\d{2}\]$/.test(String(x.code))) { E(cp, '변화는 { k: chg·add·del, code: [성취기준 코드], … } 꼴이에요'); return; }
            if (x.k === 'chg' ? !nonEmpty(x.from) || !nonEmpty(x.to) : !nonEmpty(x.text)) E(cp, '바뀐 성취기준 문장이 빠졌어요: ' + x.code);
            if (!Array.isArray(x.courses) || !x.courses.length) E(cp + '.courses', '이어지는 과정이 없어요: ' + x.code);
            if (x.units !== undefined && !Array.isArray(x.units)) E(cp + '.units', 'units 는 배열이에요');
            // 이 변화가 닿는 학년(코드 학년군 ∩ 과정 학년) — 다른 학년에 적용되지 않게
            if (x.grades !== undefined && (!Array.isArray(x.grades) || !x.grades.length || x.grades.some((g) => !/^(e[1-6]|m[1-3]|h[1-3])$/.test(g)))) E(cp + '.grades', '학년은 [e1…h3] 배열이에요: ' + x.code);
          });
        }
      });
    });
  }

  // 학교급·학년
  if (!Array.isArray(c.levels) || !c.levels.length) E('levels', '학교급(levels) 배열이 없어요');
  (Array.isArray(c.levels) ? c.levels : []).forEach((lv, i) => {
    const p = 'levels[' + i + ']';
    if (!isObj(lv)) { E(p, '학교급은 { id, name, short, grades } 객체예요'); return; }
    if (!isStr(lv.id) || !ID_RE.test(lv.id)) { E(p + '.id', '학교급 id 는 영어 소문자예요: ' + show(lv.id)); return; }
    if (res.levels.has(lv.id)) E(p + '.id', '학교급 id 가 겹쳐요: ' + lv.id);
    res.levels.set(lv.id, lv);
    if (!nonEmpty(lv.name)) E(p + '.name', '학교급 이름(name)이 없어요');
    if (!nonEmpty(lv.short)) E(p + '.short', '줄인 이름(short, 예: 초등)이 없어요');
    if (!Array.isArray(lv.grades) || !lv.grades.length) { E(p + '.grades', '학년(grades) 배열이 없어요'); return; }
    lv.grades.forEach((g, j) => {
      const gp = p + '.grades[' + j + ']';
      if (!isObj(g) || !isStr(g.id) || !/^[a-z][a-z0-9]*$/.test(g.id)) { E(gp, '학년은 { id: \'e1\', name: \'1학년\' } 꼴이에요: ' + show(g)); return; }
      if (res.grades.has(g.id)) E(gp + '.id', '학년 id 가 겹쳐요: ' + g.id);
      else res.grades.set(g.id, lv.id);
      if (!nonEmpty(g.name)) E(gp + '.name', '학년 이름(name)이 없어요');
    });
  });

  // 과목
  if (!Array.isArray(c.subjects) || !c.subjects.length) E('subjects', '과목(subjects) 배열이 없어요');
  (Array.isArray(c.subjects) ? c.subjects : []).forEach((s, i) => {
    const p = 'subjects[' + i + ']';
    if (!isObj(s)) { E(p, '과목은 { id, name, teacher, icon } 객체예요'); return; }
    if (!isStr(s.id) || !ID_RE.test(s.id)) { E(p + '.id', '과목 id 는 영어 소문자예요: ' + show(s.id)); return; }
    if (res.subjects.has(s.id)) E(p + '.id', '과목 id 가 겹쳐요: ' + s.id);
    res.subjects.set(s.id, s);
    for (const k of ['name', 'teacher', 'icon']) if (!nonEmpty(s[k])) E(p + '.' + k, k + ' 이 없어요');
  });

  // 과정·단원
  if (!Array.isArray(c.courses)) { E('courses', '과정(courses) 배열이 없어요'); return res; }
  if (!c.courses.length) E('courses', '과정이 하나도 없어요');
  const unitWhere = new Map();
  c.courses.forEach((co, i) => {
    const p = 'courses[' + i + ']';
    if (!isObj(co)) { E(p, '과정은 객체예요: ' + typeName(co)); return; }
    const cid = isStr(co.id) ? co.id : '';
    const extra = { course: cid || undefined, subject: isStr(co.subject) ? co.subject : undefined };
    const CE = (q, m) => E(q, m, extra);
    const CW = (q, m) => W(q, m, extra);
    if (!nonEmpty(co.id)) { CE(p + '.id', '과정 id 가 없어요'); return; }
    if (!COURSE_ID_RE.test(cid)) CE(p + '.id', "과정 id 는 '<과목>-<학년 또는 이름>' 꼴의 영어 소문자·숫자예요 (예: math-e3, kor-h-lit): " + cid);
    if (res.courses.has(cid)) CE(p + '.id', '과정 id 가 겹쳐요: ' + cid);
    res.courses.set(cid, co);
    Object.keys(co).forEach((k) => { if (COURSE_KEYS.indexOf(k) < 0) CW(p + '.' + k, unknownKeyMsg(k, COURSE_KEYS)); });

    if (!isStr(co.subject) || !res.subjects.has(co.subject)) {
      CE(p + '.subject', '없는 과목이에요: ' + show(co.subject) + ' (있는 과목: ' + Array.from(res.subjects.keys()).join(', ') + ')');
    } else if (cid.indexOf(co.subject + '-') !== 0) {
      CE(p + '.id', "과정 id 는 과목 id 로 시작해요: '" + cid + "' → '" + co.subject + "-…'");
    }
    if (!isStr(co.level) || !res.levels.has(co.level)) {
      CE(p + '.level', '없는 학교급이에요: ' + show(co.level) + ' (있는 학교급: ' + Array.from(res.levels.keys()).join(', ') + ')');
    }
    if (!Array.isArray(co.grades) || !co.grades.length) CE(p + '.grades', "학년(grades) 배열이 없어요 (예: ['m2'])");
    else {
      co.grades.forEach((g, j) => {
        if (!res.grades.has(g)) CE(p + '.grades[' + j + ']', '없는 학년이에요: ' + show(g));
        else if (res.levels.has(co.level) && res.grades.get(g) !== co.level) {
          CE(p + '.grades[' + j + ']', "학년 '" + g + "' 은 학교급 '" + res.grades.get(g) + "' 의 학년이에요 (과정의 학교급: " + co.level + ')');
        }
      });
      if (new Set(co.grades).size !== co.grades.length) CE(p + '.grades', '같은 학년이 두 번 있어요: ' + show(co.grades));
    }
    if (!nonEmpty(co.title)) CE(p + '.title', '과정 제목(title)이 없어요');
    if (co.note !== undefined && !isStr(co.note)) CE(p + '.note', 'note 는 글자예요');

    if (!Array.isArray(co.units) || !co.units.length) { CE(p + '.units', '과정에 단원이 하나도 없어요 — 단원이 1개 이상 있어야 해요'); return; }
    const idRe = new RegExp('^' + escapeRe(cid) + '-(\\d{2})$');
    co.units.forEach((u, j) => {
      const up = p + '.units[' + j + ']';
      if (!isObj(u)) { CE(up, '단원은 { id, title, summary, sem? } 객체예요'); return; }
      const uid = isStr(u.id) ? u.id : '';
      const UE = (q, m) => E(q, m, Object.assign({ unit: uid || undefined }, extra));
      const UW = (q, m) => W(q, m, Object.assign({ unit: uid || undefined }, extra));
      if (!uid) { UE(up + '.id', '단원 id 가 없어요'); return; }
      const m = idRe.exec(uid);
      if (!m) UE(up + '.id', "단원 id 는 '<과정id>-<두 자리 번호>' 꼴이에요 (예: " + cid + '-' + String(j + 1).padStart(2, '0') + '): ' + uid);
      else if (Number(m[1]) !== j + 1) UW(up + '.id', (j + 1) + '번째 단원인데 번호가 ' + m[1] + ' 이에요 — 단원 순서 = 배우는 순서, 번호도 01 부터 차례대로 두세요');
      if (unitWhere.has(uid)) UE(up + '.id', '단원 id 가 겹쳐요: ' + uid + ' (먼저 나온 곳: ' + unitWhere.get(uid) + ')');
      else {
        unitWhere.set(uid, up);
        res.units.set(uid, { course: co, unit: u, index: j });
      }
      for (const k of ['title', 'summary']) {
        if (!nonEmpty(u[k])) { UE(up + '.' + k, k === 'title' ? '단원 제목(title)이 없어요' : '단원 요약(summary)이 없어요 — 과정 화면의 단원 목록에 보여요'); continue; }
        for (const msg of memoText.check(u[k])) UE(up + '.' + k, msg);
        for (const f of forbiddenIn(u[k])) UE(up + '.' + k, '들어가면 안 되는 글자: ' + f);
      }
      if (u.sem !== undefined && u.sem !== 1 && u.sem !== 2) UE(up + '.sem', 'sem(학기)은 1 또는 2 예요: ' + show(u.sem));
      Object.keys(u).forEach((k) => {
        if (CAT_UNIT_KEYS.indexOf(k) >= 0) return;
        if (k === 'topics' || k === 'standards') UW(up + '.' + k, k + ' 는 카탈로그에 넣지 않아요(첫 화면 용량) — curriculum/*.json 에만 두고 build-catalog.js 로 만들면 빠져요');
        else UW(up + '.' + k, unknownKeyMsg(k, CAT_UNIT_KEYS));
      });
    });
  });
  return res;
}

/* ---------- 단원 하나 ---------- */

const UNIT_KEYS = ['id', 'course', 'title', 'summary', 'goals', 'standards', 'concepts', 'examples', 'terms', 'practice',
  'advanced', 'deeper', 'faq', 'mistakes', 'gens', 'vocab'];
const PROBLEM_KEYS = ['id', 'level', 'type', 'q', 'fig', 'choices', 'answer', 'fixed', 'check', 'unit', 'hint', 'explain',
  'concept', 'why', 'wrong'];
const PART_KEYS = {
  concepts: ['title', 'body', 'easy', 'fig', 'check'],
  examples: ['q', 'fig', 'steps', 'answer'],
  terms: ['term', 'def'],
  deeper: ['title', 'body'],
  faq: ['q', 'a'],
  vocab: ['w', 'm', 'ex', 'exm'],
  gens: ['id', 'level', 'title', 'make'],
};
const LIST_KEYS = Object.keys(RANGES).concat(['goals', 'standards', 'gens', 'vocab']);
// 문제 글이 그림을 가리키는데 그 문제에 fig 가 없는 경우 (화면은 문제마다 따로 보여 준다)
const FIG_REF_RE = /(위|아래|다음|오른쪽|왼쪽)의?\s*그림|그림(과 같이|과 같은|에서|을 보고|를 보고|처럼)/;
// 인용 지문(> 로 시작하는 줄) 안의 이야기, '그림 편지·그림일기·그림책', '줄기와 잎 그림'(그래프 이름)은 그림을 가리키는 말이 아니다
const FIG_WORDS_RE = /그림\s*(편지|일기|책|카드)|줄기와\s*잎\s*그림/g;
function figRefText(q) {
  return q.split('\n').filter((l) => !/^\s*>/.test(l)).join('\n').replace(FIG_WORDS_RE, '');
}

function guessSubject(id) { return String(id).split('-')[0]; }
function guessCourse(id) { return String(id).replace(/-\d+$/, ''); }

// 가정교사 흐름의 문제 객체들 (bank: 문제은행, check: 개념 카드의 이해 확인)
function eachStaticProblem(unit, cb) {
  (Array.isArray(unit.concepts) ? unit.concepts : []).forEach((c, i) => {
    if (isObj(c) && c.check !== undefined) cb(c.check, 'concepts[' + i + '].check', 'check', c);
  });
  for (const key of ['practice', 'advanced']) {
    (Array.isArray(unit[key]) ? unit[key] : []).forEach((p, i) => cb(p, key + '[' + i + ']', 'bank', null));
  }
}

// 생성기·문제은행 공통: unit-checks 가 보지 않는 문제 규칙. report(path, msg, level, rule)
function extraProblemChecks(p, base, where, report) {
  if (!isObj(p)) return;
  Object.keys(p).forEach((k) => {
    if (PROBLEM_KEYS.indexOf(k) < 0) report(base + '.' + k, unknownKeyMsg(k, PROBLEM_KEYS), 'warning', 'key:' + k);
  });
  if (p.fixed !== undefined && typeof p.fixed !== 'boolean') {
    report(base + '.fixed', 'fixed 는 true/false 예요: ' + show(p.fixed), 'warning', 'fixed');
  }
  // 정답 칸: 금지 글자·서식 글 (unit-checks 는 short 정답의 글자를 보지 않는다)
  if (p.type === 'short' && p.answer !== undefined) {
    const list = Array.isArray(p.answer) ? p.answer : [p.answer];
    list.forEach((a, i) => {
      const ap = base + '.answer' + (Array.isArray(p.answer) ? '[' + i + ']' : '');
      const vals = Array.isArray(a) ? a : [a];
      for (const v of vals) {
        if (!isStr(v)) continue;
        for (const f of forbiddenIn(v)) {
          report(ap, '정답에 들어가면 안 되는 글자: ' + f + ' — 생성기 변수가 비었거나(undefined·NaN) 쓰다 만 표시가 남았어요: ' + show(v), 'error', 'forbidden');
        }
        for (const m of memoText.check(v)) report(ap, m, 'error', 'answer-text');
      }
    });
    // 'set' 정답이 수 모음으로 읽히지 않으면 어느 원소인지 알려 준다 (자기 일관성 오류는 unit-checks 가 따로 낸다)
    if (p.check === 'set') {
      const joined = Array.isArray(p.answer) ? p.answer.join(', ') : String(p.answer);
      const r = TutorMath.checkAnswer(p, joined);
      if (!r.correct) {
        const parts = joined.replace(/[{}()[\]]/g, ' ').replace(/[a-z]\s*=/gi, ' ')
          .split(/,|;|또는|그리고|\s+/).map((s) => s.trim()).filter(Boolean);
        const bad = parts.filter((s) => !TutorMath.parseNumberAnswer(s.replace(/±/g, '')) && !TutorMath.exactValue(s.replace(/±/g, '')));
        if (bad.length) report(base + '.answer', "check: 'set' 정답은 수의 모음이어야 해요 — 수로 읽을 수 없는 원소: " + bad.map((b) => '"' + b + '"').join(', '), 'error', 'set');
      }
    }
  }
  // 값이 같은 보기 (정답 1/2 와 오답 2/4 → 정답이 둘). 형태를 묻는 문제면 괜찮으므로 경고
  if ((p.type === 'choice' || p.type === 'order') && Array.isArray(p.choices)) {
    const vals = p.choices.map(choiceNumber);
    outer:
    for (let i = 0; i < vals.length; i++) {
      if (!vals[i]) continue;
      for (let j = i + 1; j < vals.length; j++) {
        if (vals[j] && vals[i].eq(vals[j])) {
          report(base + '.choices', '값이 같은 보기가 있어요: [' + i + '] ' + show(p.choices[i], 30) + ' = [' + j + '] ' + show(p.choices[j], 30) +
            (p.type === 'choice' ? ' — 형태(기약분수·대분수 등)를 묻는 문제가 아니면 정답이 둘이 돼요' : ' — 크기 순서를 정할 수 없어요'), 'warning', 'same-value');
          break outer;
        }
      }
    }
  }
  if (isStr(p.q) && p.fig === undefined && FIG_REF_RE.test(figRefText(p.q)) && where !== 'check-with-fig') {
    const m = FIG_REF_RE.exec(figRefText(p.q));
    report(base + '.fig', "문제 글이 그림을 가리키는데('" + m[0] + "') 이 문제에 fig 가 없어요 — 그림이 필요하면 그 문제의 fig 칸에 넣어요(화면은 문제를 하나씩 따로 보여 줘요)", 'warning', 'fig-ref');
  }
}

function validateStatic(unit, fileId, meta, cat, E, W) {
  Object.keys(unit).forEach((k) => { if (UNIT_KEYS.indexOf(k) < 0) W(k, unknownKeyMsg(k, UNIT_KEYS)); });
  const typeErrors = new Set();
  for (const k of LIST_KEYS) {
    if (unit[k] !== undefined && !Array.isArray(unit[k])) {
      E(k, k + ' 는 배열([ … ])이어야 해요 (지금은 ' + typeName(unit[k]) + ')');
      typeErrors.add(k);
    }
  }
  // 카탈로그와의 짝 (unit-checks 는 meta 가 있을 때 course·title 만 본다)
  if (cat && !meta) {
    E('id', '카탈로그(' + cat.file + ')에 없는 단원이에요: ' + fileId + ' — 파일 이름을 카탈로그의 단원 id 와 맞추거나, ' +
      'curriculum/*.json 에 단원을 넣고 node scripts/build-catalog.js 로 카탈로그를 다시 만드세요');
  }
  if (!meta) {
    if (!nonEmpty(unit.course)) E('course', "course(과정 id)가 없어요 — 예: '" + guessCourse(fileId) + "'");
    else if (fileId.indexOf(unit.course + '-') !== 0) E('course', "단원 id '" + fileId + "' 는 과정 id '" + unit.course + "' 로 시작해야 해요");
  }
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*-\d{2}$/.test(fileId)) {
    E('id', "파일 이름(단원 id)은 '<과정id>-<두 자리 번호>' 꼴의 영어 소문자·숫자예요 (예: math-e4-07): " + fileId);
  }
  if (nonEmpty(unit.title)) {
    for (const m of memoText.check(unit.title)) E('title', m);
    for (const f of forbiddenIn(unit.title)) E('title', '들어가면 안 되는 글자: ' + f);
  }
  if (Array.isArray(unit.goals) && unit.goals.length && (unit.goals.length < 2 || unit.goals.length > 4)) {
    W('goals', '학습 목표가 ' + unit.goals.length + '개 — 2~4개를 권장해요');
  }
  if (Array.isArray(unit.standards)) {
    unit.standards.forEach((s, i) => { if (!nonEmpty(s)) E('standards[' + i + ']', "성취기준 코드는 글자예요 (예: '[9수02-07]'): " + show(s)); });
  }
  if (Array.isArray(unit.vocab) && unit.vocab.length > 20) W('vocab', '낱말이 ' + unit.vocab.length + '개 — 8~20개를 권장해요');

  // 칸 이름 오타
  for (const key of Object.keys(PART_KEYS)) {
    (Array.isArray(unit[key]) ? unit[key] : []).forEach((item, i) => {
      if (!isObj(item)) return;
      Object.keys(item).forEach((k) => { if (PART_KEYS[key].indexOf(k) < 0) W(key + '[' + i + '].' + k, unknownKeyMsg(k, PART_KEYS[key])); });
    });
  }
  (Array.isArray(unit.terms) ? unit.terms : []).forEach((t, i) => {
    if (!isObj(t) || !nonEmpty(t.term)) return;
    for (const m of memoText.check(t.term)) E('terms[' + i + '].term', m);
    for (const f of forbiddenIn(t.term)) E('terms[' + i + '].term', '들어가면 안 되는 글자: ' + f);
  });
  (Array.isArray(unit.vocab) ? unit.vocab : []).forEach((v, i) => {
    if (!isObj(v)) return;
    for (const k of ['w', 'm']) if (isStr(v[k])) for (const f of forbiddenIn(v[k])) E('vocab[' + i + '].' + k, '들어가면 안 되는 글자: ' + f);
  });
  (Array.isArray(unit.gens) ? unit.gens : []).forEach((g, i) => {
    if (isObj(g) && isStr(g.title)) for (const f of forbiddenIn(g.title)) E('gens[' + i + '].title', '들어가면 안 되는 글자: ' + f);
  });
  const seenTerm = new Map();
  (Array.isArray(unit.terms) ? unit.terms : []).forEach((t, i) => {
    if (!isObj(t) || !nonEmpty(t.term)) return;
    const k = t.term.replace(/\s+/g, '').toLowerCase();
    if (seenTerm.has(k)) W('terms[' + i + '].term', '같은 용어가 두 번 있어요: ' + t.term + ' (' + seenTerm.get(k) + ')');
    else seenTerm.set(k, 'terms[' + i + ']');
  });

  // 문제: id 누락(오답노트가 단원id#문제id 로 기억한다), 같은 문제 두 번, 그 밖의 문제 규칙
  const seenQ = new Map();
  eachStaticProblem(unit, (p, base, where, card) => {
    if (!isObj(p)) return;
    if (where === 'bank') {
      if (p.id === undefined || p.id === null || p.id === '') E(base + '.id', "문제 id 가 없어요 — 단원 안에서 겹치지 않게 'p1', 'a1' 처럼 넣어요(오답노트·기록이 id 로 문제를 기억해요)");
      else if (!isStr(p.id) && !Number.isInteger(p.id)) E(base + '.id', '문제 id 는 글자예요: ' + show(p.id));
      if (isStr(p.q) && p.q.trim()) {
        // 글이 같아도 그림이 다르면 다른 문제다("계산해 보세요." + 세로셈 그림)
        let fig = '';
        try { fig = p.fig === undefined ? '' : JSON.stringify(p.fig) || ''; } catch (e) { fig = String(p.fig); }
        const k = memoText.plain(p.q).replace(/\s+/g, '') + '|' + show(p.choices || '', 400) + '|' + fig;
        if (seenQ.has(k)) W(base + '.q', '같은 문제가 이미 있어요: ' + seenQ.get(k));
        else seenQ.set(k, base);
      }
    }
    if (where === 'check' && p.type === 'choice' && Array.isArray(p.choices) && p.choices.length === 2) {
      W(base + '.choices', '이해 확인 choice 의 보기가 2개뿐이에요 — 보기 3개로 늘리거나 ox 로 바꾸세요');
    }
    const w = where === 'check' && card && card.fig !== undefined ? 'check-with-fig' : where;
    extraProblemChecks(p, base, w, (pp, msg, level) => (level === 'error' ? E : W)(pp, msg));
  });
  return typeErrors;
}

/* ---------- 생성기: 끝나지 않는 반복·결정성·정답 칸 (unit-checks 의 시험 앞뒤로 돈다) ---------- */

const LOOP_DEF = new vm.Script(
  'var __tutorLoop = function (g, seeds, tk, now, twice) {\n' +
  '  var out = [];\n' +
  '  for (var i = 0; i < seeds.length; i++) {\n' +
  '    var s = seeds[i];\n' +
  '    __tutorSeed = s;\n' +
  '    var r = { s: s };\n' +
  '    var t0 = now();\n' +
  '    try { r.p = g.make(tk(s)); } catch (e) { r.err = (e && e.message !== undefined) ? String(e.message) : String(e); }\n' +
  '    r.ms = now() - t0;\n' +
  '    if (twice(s)) { try { r.again = g.make(tk(s)); } catch (e2) { r.againErr = (e2 && e2.message !== undefined) ? String(e2.message) : String(e2); } }\n' +
  '    out.push(r);\n' +
  '  }\n' +
  '  return out;\n' +
  '};', { filename: 'validate-content:생성기 시험' });
const LOOP_CALL = new vm.Script('__tutorLoop(__tutorArgs.g, __tutorArgs.seeds, __tutorArgs.tk, __tutorArgs.now, __tutorArgs.twice)',
  { filename: 'validate-content:생성기 시험' });

function json(x) {
  try { return JSON.stringify(x); } catch (e) { return '(JSON 으로 바꿀 수 없음: ' + e.message + ')'; }
}

// 생성기를 단원 파일의 문맥 안에서 시간 제한을 두고 돌린다 (밖에서 그냥 부르면 끝나지 않는 반복이 검사 전체를 멈춘다)
function runGen(context, g, seeds, timeoutMs, twice) {
  if (!context.__tutorLoop) LOOP_DEF.runInContext(context);
  context.__tutorSeed = 0;
  context.__tutorArgs = { g: g, seeds: seeds, tk: TutorMath.toolkit, now: () => performance.now(), twice: twice || (() => false) };
  try {
    return { results: LOOP_CALL.runInContext(context, { timeout: timeoutMs }) };
  } catch (e) {
    if (e && e.code === 'ERR_SCRIPT_EXECUTION_TIMEOUT') return { hung: true, seed: context.__tutorSeed };
    return { failed: describeError(e, 'validate-content').msg };
  } finally {
    context.__tutorArgs = null;
  }
}

function seedList(n) { const a = []; for (let s = 1; s <= n; s++) a.push(s); return a; }

function preflightGens(unit, context, seeds, timeoutMs, E, W) {
  const info = [];
  const gens = Array.isArray(unit.gens) ? unit.gens : [];
  gens.forEach((g, gi) => {
    const gp = 'gens[' + gi + ']';
    const it = { gi: gi, hung: false, nondet: [], first: new Map() };
    info.push(it);
    if (!isObj(g) || typeof g.make !== 'function') return;
    const r = runGen(context, g, seedList(seeds), timeoutMs, (s) => s <= 10 || s % 10 === 0);
    if (r.hung) {
      it.hung = true;
      E(gp, '생성기가 ' + Math.round(timeoutMs / 1000) + '초 안에 끝나지 않아요(seed ' + r.seed + ' 에서 멈춤) — 조건을 만족할 때까지 다시 뽑는 while 반복이 ' +
        '끝나지 않는지 보세요. 한 번 만드는 데 50ms 안쪽이어야 해요');
      return;
    }
    if (r.failed) { E(gp, '생성기를 시험하지 못했어요: ' + r.failed); it.hung = true; return; }
    const counts = {};
    const once = (rule) => { counts[rule] = (counts[rule] || 0) + 1; return counts[rule] <= REPORT_SEEDS; };
    const keysSeen = new Set();
    for (const x of r.results) {
      if (x.s <= 3 || x.s === seeds || x.s === Math.ceil(seeds / 2)) it.first.set(x.s, x.err !== undefined ? 'ERR:' + x.err : json(x.p));
      if (x.again !== undefined || x.againErr !== undefined) {
        const a = x.err !== undefined ? 'ERR:' + x.err : json(x.p);
        const b = x.againErr !== undefined ? 'ERR:' + x.againErr : json(x.again);
        if (a !== b) it.nondet.push(x.s);
      }
      if (x.err !== undefined || !isObj(x.p)) continue;   // throw·형식은 unit-checks 가 알린다
      extraProblemChecks(x.p, gp + ' seed ' + x.s, 'gen', (pp, msg, level, rule) => {
        if (rule && rule.indexOf('key:') === 0) {     // 칸 이름 오타는 생성기마다 한 번
          if (keysSeen.has(rule)) return;
          keysSeen.add(rule);
        } else if (!once(rule || msg)) return;
        (level === 'error' ? E : W)(pp, msg);
      });
    }
  });
  return info;
}

// unit-checks 가 생성기를 수백 번 돌린 뒤 처음 seed 를 다시 만들어 본다 — 바깥 배열을 sort·push 하는 등 호출 순서에 따라 바뀌는 생성기
function recheckGens(unit, context, info, timeoutMs, E) {
  const gens = Array.isArray(unit.gens) ? unit.gens : [];
  for (const it of info) {
    if (it.hung || !it.first.size || it.nondet.length) continue;
    const g = gens[it.gi];
    const seeds = Array.from(it.first.keys());
    const r = runGen(context, g, seeds, timeoutMs);
    if (!r.results) continue;
    const diff = r.results.filter((x) => (x.err !== undefined ? 'ERR:' + x.err : json(x.p)) !== it.first.get(x.s)).map((x) => x.s);
    if (diff.length) {
      E('gens[' + it.gi + ']', '여러 번 돌린 뒤 같은 seed 로 다시 만들면 다른 문제가 나와요(seed ' + diff.join(', ') + ') — make 가 바깥의 배열·변수를 ' +
        '바꾸는지(sort·push·splice·카운터) 보세요. make 안에서는 R 과 지역 변수만 써요');
    }
  }
}

/* ---------- 단원 파일 검사 ---------- */

// file: 단원 파일 경로. opts: { catalog (loadCatalog 결과 | null = 카탈로그 없이), catalogFile, seeds, source, genTimeoutMs }
//   → { id, file, errors: [{level, file, unit, path, msg}], warnings, stats: { problems, gens, checks, concepts } }
function validateUnitFile(file, opts) {
  opts = opts || {};
  const abs = path.resolve(file);
  const relFile = relPath(abs);
  const fileId = path.basename(abs).replace(/\.js$/, '');
  const cat = opts.catalog !== undefined ? opts.catalog : loadCatalog(opts.catalogFile);
  const seeds = Number.isInteger(opts.seeds) && opts.seeds > 0 ? opts.seeds : DEFAULT_SEEDS;
  const genTimeoutMs = opts.genTimeoutMs || Math.max(10000, seeds * 100);
  const out = { id: fileId, file: relFile, errors: [], warnings: [], stats: { problems: 0, gens: 0, checks: 0, concepts: 0 } };
  const E = (p, m) => out.errors.push({ level: 'error', file: relFile, unit: fileId, path: p, msg: m });
  const W = (p, m) => out.warnings.push({ level: 'warning', file: relFile, unit: fileId, path: p, msg: m });

  const loaded = loadUnitFile(abs, opts.source);
  if (loaded.error) {
    E(loaded.error.line ? loaded.error.line + '번째 줄' : '', loaded.error.msg);
    return out;
  }
  if (loaded.wrongCalls) E('', '단원 파일에서 Tutor.registerCatalog·registerIndex 를 부르면 안 돼요 — Tutor.registerUnit({ … }) 하나만 둬요');
  if (loaded.count !== 1) {
    E('', 'Tutor.registerUnit 을 ' + loaded.count + '번 불렀어요 — 한 파일 = 한 단원, Tutor.registerUnit({ … }) 을 한 번만 불러요');
    if (!loaded.count) return out;
  }
  if (loaded.logs) W('', 'console 출력이 ' + loaded.logs + '번 있어요 — 단원 파일에는 필요 없어요');
  const unit = loaded.unit;
  const meta = cat ? (cat.units.get(fileId) || null) : null;
  if (!isObj(unit)) {
    E('', 'Tutor.registerUnit 에 단원 객체가 없어요: ' + typeName(unit));
    return out;
  }

  // 1) 생성기 미리 돌리기 (끝나지 않는 생성기는 unit-checks 에 넘기지 않는다)
  const genInfo = preflightGens(unit, loaded.context, seeds, genTimeoutMs, E, W);
  const hung = new Set(genInfo.filter((x) => x.hung).map((x) => x.gi));
  let forCheck = unit;
  if (hung.size) {
    const stub = function () { throw new Error('시험하지 않음'); };
    forCheck = Object.assign({}, unit, { gens: unit.gens.map((g, i) => (hung.has(i) ? Object.assign({}, g, { make: stub }) : g)) });
  }

  // 2) 단원 규칙 (lint-unit.js 와 같은 검사)
  const subject = meta ? meta.course.subject : guessSubject(fileId);
  const res = checkUnit(forCheck, {
    TutorMath: TutorMath, TutorText: memoText, TutorFig: TutorFig,
    meta: meta ? { course: meta.course, unit: meta.unit } : null,
    fileId: fileId, requireMeta: false,
    subject: subject, grades: meta ? meta.course.grades : undefined,
    seeds: seeds, source: loaded.source,
  });

  // 3) 더 보는 규칙
  const typeErrors = validateStatic(unit, fileId, meta, cat, E, W);
  recheckGens(unit, loaded.context, genInfo, genTimeoutMs, E);

  // unit-checks 결과 다듬기: 끝나지 않은 생성기·배열이 아닌 칸에 대한 겹치는 말은 뺀다
  const genPathRe = /^gens\[(\d+)\]([ .]|$)/;
  const drop = (f) => {
    const m = genPathRe.exec(f.path);
    if (m && hung.has(Number(m[1]))) return true;
    if (typeErrors.has(f.path) && /^비어 있어요/.test(f.msg)) return true;
    return false;
  };
  const nondetReported = new Set();
  for (const e of res.errors) {
    if (drop(e)) continue;
    const m = genPathRe.exec(e.path);
    if (m && /같은 seed/.test(e.msg)) nondetReported.add(Number(m[1]));
    out.errors.push({ level: 'error', file: relFile, unit: fileId, path: e.path, msg: e.msg });
  }
  for (const w of res.warnings) {
    if (drop(w)) continue;
    out.warnings.push({ level: 'warning', file: relFile, unit: fileId, path: w.path, msg: w.msg });
  }
  for (const it of genInfo) {
    if (it.nondet.length && !nondetReported.has(it.gi)) {
      E('gens[' + it.gi + ']', '같은 seed 인데 다른 문제가 나와요(seed ' + it.nondet.slice(0, 5).join(', ') + (it.nondet.length > 5 ? ' …' : '') +
        ') — Math.random·Date 나 make 밖의 변수를 쓰지 말고 R 만 쓰세요(같은 seed → 같은 문제)');
    }
  }
  // 칸 경로 순서로 (같은 칸의 말은 나온 순서대로)
  out.stats.concepts = Array.isArray(unit.concepts) ? unit.concepts.length : 0;
  out.stats.checks = (Array.isArray(unit.concepts) ? unit.concepts : []).filter((c) => isObj(c) && c.check !== undefined).length;
  out.stats.problems = (Array.isArray(unit.practice) ? unit.practice.length : 0) + (Array.isArray(unit.advanced) ? unit.advanced.length : 0) + out.stats.checks;
  out.stats.gens = Array.isArray(unit.gens) ? unit.gens.length : 0;
  return out;
}

/* ---------- 전체 ---------- */

function isUnitFileName(f) { return /\.js$/.test(f) && !/\.draft\.js$/.test(f); }

// opts: { catalogFile, unitsDir, units: [id], course: id|[id], subject: id|[id], seeds, allowMissing, genTimeoutMs, onUnit(result, i, n) }
//   → { errors, warnings, stats: { units, problems, gens, checks, missing }, missing: [id], orphans: [id] }
function validateAll(opts) {
  opts = opts || {};
  const catalogFile = opts.catalogFile ? path.resolve(opts.catalogFile) : DEFAULT_CATALOG;
  const unitsDir = opts.unitsDir ? path.resolve(opts.unitsDir) : DEFAULT_UNITS;
  const cat = loadCatalog(catalogFile);
  const onlyUnits = asList(opts.units);
  const onlyCourses = asList(opts.course);
  const onlySubjects = asList(opts.subject);
  const filtered = !!(onlyUnits || onlyCourses || onlySubjects);
  const pass = (id, m) => {
    const courseId = m ? m.course.id : guessCourse(id);
    const subj = m ? m.course.subject : guessSubject(id);
    return (!onlyUnits || onlyUnits.indexOf(id) >= 0) && (!onlyCourses || onlyCourses.indexOf(courseId) >= 0) &&
      (!onlySubjects || onlySubjects.indexOf(subj) >= 0);
  };
  const passCatalogFinding = (f) => {
    if (!filtered) return true;
    if (f.unit) return pass(f.unit, cat.units.get(f.unit) || null);
    if (!f.course) return false;      // 학교급·과목 같은 전체 칸은 거르지 않은 검사에서만
    return (!onlyCourses || onlyCourses.indexOf(f.course) >= 0) && (!onlySubjects || onlySubjects.indexOf(f.subject) >= 0) &&
      (!onlyUnits || onlyUnits.some((u) => u.indexOf(f.course + '-') === 0));
  };

  const errors = cat.errors.filter(passCatalogFinding);
  const warnings = cat.warnings.filter(passCatalogFinding);
  const stats = { units: 0, problems: 0, gens: 0, checks: 0, missing: 0 };

  let files = [];
  if (!fs.existsSync(unitsDir)) {
    errors.push({ level: 'error', file: relPath(unitsDir), path: '', msg: '단원 폴더가 없어요' });
  } else {
    files = fs.readdirSync(unitsDir).filter(isUnitFileName).sort();
  }
  const fileIds = new Set(files.map((f) => f.replace(/\.js$/, '')));

  // 카탈로그에 있는데 파일이 없는 단원
  const missing = [];
  let soon = 0;
  cat.units.forEach((m, id) => {
    if (!pass(id, m)) return;
    if (m.unit.soon === true) {
      // 준비 중으로 표시된 단원: 파일이 없는 것이 맞다. 파일이 생겼으면 카탈로그를 다시 만들라고 알린다
      if (fileIds.has(id)) warnings.push({ level: 'warning', file: relPath(path.join(unitsDir, id + '.js')), unit: id, course: m.course.id, path: '',
        msg: '파일이 생겼는데 카탈로그에는 아직 준비 중(soon)이에요 — node scripts/build-catalog.js 로 다시 만드세요' });
      else soon++;
      return;
    }
    if (fileIds.has(id)) return;
    missing.push(id);
    const f = {
      level: opts.allowMissing ? 'warning' : 'error', file: relPath(path.join(unitsDir, id + '.js')), unit: id, course: m.course.id, path: '',
      msg: '파일이 없어요 — 카탈로그 ' + m.course.id + ' 의 ' + (m.index + 1) + '번째 단원 "' + m.unit.title + '"',
    };
    (opts.allowMissing ? warnings : errors).push(f);
  });
  stats.missing = missing.length;
  stats.soon = soon;
  if (onlyUnits) {
    for (const id of onlyUnits) {
      if (!fileIds.has(id) && !cat.units.has(id)) {
        errors.push({ level: 'error', file: relPath(path.join(unitsDir, id + '.js')), unit: id, path: '', msg: '그런 단원이 없어요 — 파일도, 카탈로그 단원도 없어요: ' + id });
      }
    }
  }

  const todo = files.filter((f) => {
    const id = f.replace(/\.js$/, '');
    return pass(id, cat.units.get(id) || null);
  });
  const orphans = [];
  todo.forEach((f, i) => {
    const id = f.replace(/\.js$/, '');
    if (!cat.units.has(id)) orphans.push(id);
    const r = validateUnitFile(path.join(unitsDir, f), { catalog: cat, seeds: opts.seeds, genTimeoutMs: opts.genTimeoutMs });
    stats.units++;
    stats.problems += r.stats.problems;
    stats.gens += r.stats.gens;
    stats.checks += r.stats.checks;
    for (const e of r.errors) errors.push(e);
    for (const w of r.warnings) warnings.push(w);
    if (typeof opts.onUnit === 'function') opts.onUnit(r, i, todo.length);
  });
  return { errors: errors, warnings: warnings, stats: stats, missing: missing, orphans: orphans, catalog: cat };
}

/* ---------- 출력 ---------- */

function formatFinding(f) {
  return (f.level === 'error' ? '✗ ' : '△ ') + f.file + (f.path ? ' · ' + f.path : '') + ' · ' + f.msg;
}

function summaryLine(r) {
  return '오류 ' + r.errors.length + ' · 경고 ' + r.warnings.length + ' · 단원 ' + r.stats.units + ' · 문제 ' + r.stats.problems + ' · 생성기 ' + r.stats.gens;
}

function formatReport(r, quiet) {
  // 파일별로 묶고, 파일 안에서는 오류 먼저
  const byFile = new Map();
  const put = (f) => { if (!byFile.has(f.file)) byFile.set(f.file, []); byFile.get(f.file).push(f); };
  r.errors.forEach(put);
  if (!quiet) r.warnings.forEach(put);
  const lines = [];
  const keys = Array.from(byFile.keys());
  keys.sort((a, b) => {
    const ca = /catalog\.js$/.test(a) ? 0 : 1;
    const cb = /catalog\.js$/.test(b) ? 0 : 1;
    return ca - cb || (a < b ? -1 : a > b ? 1 : 0);
  });
  for (const k of keys) {
    const list = byFile.get(k);
    list.filter((f) => f.level === 'error').forEach((f) => lines.push(formatFinding(f)));
    list.filter((f) => f.level !== 'error').forEach((f) => lines.push(formatFinding(f)));
  }
  lines.push(summaryLine(r));
  return lines.join('\n');
}

const USAGE = '사용법: node scripts/validate-content.js [--unit <id>]… [--course <id>] [--subject <id>] [--seeds N] [--quiet] [--json] [--allow-missing] [--catalog <파일>] [--units-dir <폴더>]';

function parseArgs(argv) {
  const o = { units: [], course: [], subject: [], seeds: DEFAULT_SEEDS, quiet: false, json: false, allowMissing: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const val = () => {
      const v = argv[++i];
      if (v === undefined || v.indexOf('--') === 0) throw new Error(a + ' 뒤에 값이 필요해요');
      return v;
    };
    if (a === '--unit') o.units.push(path.basename(val()).replace(/\.js$/, ''));
    else if (a === '--course') o.course.push(val());
    else if (a === '--subject') o.subject.push(val());
    else if (a === '--seeds') {
      o.seeds = Number(val());
      if (!Number.isInteger(o.seeds) || o.seeds < 1) throw new Error('--seeds 는 1 이상의 정수예요');
    } else if (a === '--quiet') o.quiet = true;
    else if (a === '--json') o.json = true;
    else if (a === '--allow-missing') o.allowMissing = true;
    else if (a === '--catalog') o.catalogFile = val();
    else if (a === '--units-dir') o.unitsDir = val();
    else if (a === '--help' || a === '-h') o.help = true;
    else throw new Error('모르는 옵션: ' + a);
  }
  return o;
}

function main() {
  let o;
  try {
    o = parseArgs(process.argv.slice(2));
  } catch (e) {
    console.error(e.message + '\n' + USAGE);
    process.exit(2);
  }
  if (o.help) { console.log(USAGE); return; }
  const tty = !o.json && process.stderr.isTTY;
  const r = validateAll({
    catalogFile: o.catalogFile, unitsDir: o.unitsDir, seeds: o.seeds, allowMissing: o.allowMissing,
    units: o.units.length ? o.units : null, course: o.course.length ? o.course : null, subject: o.subject.length ? o.subject : null,
    onUnit: tty ? (res, i, n) => { if (n > 5) process.stderr.write('\r검사 중 ' + (i + 1) + '/' + n + ' ' + res.id + '            '); } : null,
  });
  if (tty) process.stderr.write('\r' + ' '.repeat(60) + '\r');
  if (o.json) {
    const strip = (f) => ({ level: f.level, file: f.file, unit: f.unit, path: f.path, msg: f.msg });
    console.log(JSON.stringify({ errors: r.errors.map(strip), warnings: o.quiet ? [] : r.warnings.map(strip), stats: Object.assign({ errors: r.errors.length, warnings: r.warnings.length }, r.stats), missing: r.missing, orphans: r.orphans }, null, 1));
  } else {
    console.log(formatReport(r, o.quiet));
  }
  process.exitCode = r.errors.length ? 1 : 0;
}

if (require.main === module) main();

module.exports = {
  validateAll: validateAll,
  validateUnitFile: validateUnitFile,
  loadCatalog: loadCatalog,
  loadUnitFile: loadUnitFile,
  formatReport: formatReport,
  formatFinding: formatFinding,
  summaryLine: summaryLine,
  DEFAULT_SEEDS: DEFAULT_SEEDS,
};
