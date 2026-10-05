/* 교육과정 지도(curriculum/*.json) → data/catalog.js (화면이 싣는 카탈로그)
 *
 *   node scripts/build-catalog.js           만든다
 *   node scripts/build-catalog.js --check   지금 파일이 최신인지 본다(다르면 종료 코드 1) — 테스트가 쓴다
 *
 * - 학교급·과목 목록은 여기 고정 목록(ARCHITECTURE §7.1). 과정은 학교급 → 첫 학년 → 과목 순서로 줄 세운다.
 * - 단원은 { id, title, summary, sem? } 만 넣는다(topics·standards 는 첫 화면 용량 때문에 뺀다).
 * - 단원 파일이 없거나 실행되지 않으면(쓰다 끊김) soon: true — 화면에 "준비 중"으로 보인다.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { loadUnitFile } = require('./validate-content.js');
const { mapFiles, sameStandards } = require('./lib/curriculum');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'catalog.js');
const UNITS = path.join(ROOT, 'data', 'units');

const LEVELS = [
  { id: 'elem', name: '초등학교', short: '초등', grades: [1, 2, 3, 4, 5, 6].map((n) => ({ id: 'e' + n, name: n + '학년' })) },
  { id: 'mid', name: '중학교', short: '중등', grades: [1, 2, 3].map((n) => ({ id: 'm' + n, name: n + '학년' })) },
  { id: 'high', name: '고등학교', short: '고등', grades: [1, 2, 3].map((n) => ({ id: 'h' + n, name: n + '학년' })) },
  { id: 'univ', name: '대학교', short: '대학', grades: [{ id: 'u', name: '교양·기초' }] },
  { id: 'adult', name: '성인', short: '성인', grades: [{ id: 'a', name: '성인' }] },
];
const SUBJECTS = [
  { id: 'kor', name: '국어', teacher: '국어 선생님', icon: '📖' },
  { id: 'math', name: '수학', teacher: '수학 선생님', icon: '📐' },
  { id: 'eng', name: '영어', teacher: '영어 선생님', icon: '🔤' },
  { id: 'soc', name: '사회', teacher: '사회 선생님', icon: '🌏' },
  { id: 'hist', name: '역사', teacher: '역사 선생님', icon: '🏛️' },
  { id: 'sci', name: '과학', teacher: '과학 선생님', icon: '🔬' },
  { id: 'life', name: '통합교과', teacher: '통합교과 선생님', icon: '🌱' },
];
const GRADE_ORDER = [].concat(...LEVELS.map((l) => l.grades.map((g) => g.id)));
const LEVEL_ORDER = LEVELS.map((l) => l.id);
const SUBJECT_ORDER = SUBJECTS.map((s) => s.id);

function fail(msg) {
  console.error('✗ ' + msg);
  process.exit(1);
}

// 단원 파일이 실제로 실행되고 같은 id 의 단원을 등록하는가 (쓰다 끊긴 파일은 준비 중으로).
// 화면처럼 엔진 전역(TutorMath·TutorText·TutorFig)이 있는 상태에서 실행한다 — 검사기(validate-content)와 같은 방식.
// (엔진 없이 돌리면 맨 위에서 var F = TutorMath.F 를 쓰는 멀쩡한 단원이 준비 중이 된다)
function loadReady(id, unitsDir) {
  const file = path.join(unitsDir || UNITS, id + '.js');
  if (!fs.existsSync(file)) return null;
  const r = loadUnitFile(file);
  return !r.error && r.count === 1 && !!r.unit && r.unit.id === id ? r.unit : null;
}

// 교육과정 이름·판: curriculum/meta.json (개정 때 이 파일과 지도(curriculum/*.json)를 바꾼다 — docs/CURRICULUM-REVISION.md)
function loadMeta(dir) {
  const file = path.join(dir || path.join(ROOT, 'curriculum'), 'meta.json');
  let m = {};
  try { m = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { fail('curriculum/meta.json 을 읽지 못했어요: ' + e.message); }
  if (!m.name || !m.version) fail('curriculum/meta.json 에 name·version 이 필요해요');
  return m;
}

// opts(시험용): { curDir, unitsDir } — 기본은 curriculum/ 와 data/units/
function build(opts) {
  opts = opts || {};
  const dir = opts.curDir || path.join(ROOT, 'curriculum');
  const files = mapFiles(dir);
  const courses = [];
  const seen = new Set();
  const codes = { byCode: new Map(), byPrefix: new Map() }; // 성취기준 코드 → 단원들, 코드 앞부분(학년군+과목) → 과정들
  for (const f of files) {
    let j;
    try { j = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); } catch (e) { fail(f + ' 를 읽지 못했어요: ' + e.message); }
    for (const c of j.courses || []) {
      if (!c.id || seen.has(c.id)) fail('과정 id 가 없거나 겹쳐요: ' + c.id + ' (' + f + ')');
      seen.add(c.id);
      if (!SUBJECT_ORDER.includes(c.subject)) fail('모르는 과목: ' + c.subject + ' (' + c.id + ')');
      if (!LEVEL_ORDER.includes(c.level)) fail('모르는 학교급: ' + c.level + ' (' + c.id + ')');
      if (!Array.isArray(c.grades) || !c.grades.length || c.grades.some((g) => !GRADE_ORDER.includes(g))) fail('학년이 이상해요: ' + c.id);
      if (!c.title || !Array.isArray(c.units) || !c.units.length) fail('제목이나 단원이 없어요: ' + c.id);
      const units = c.units.map((u, i) => {
        if (!u.id || !u.title || !u.summary) fail('단원 칸이 빠졌어요: ' + c.id + ' ' + (i + 1) + '번째');
        if (seen.has(u.id)) fail('단원 id 가 겹쳐요: ' + u.id);
        seen.add(u.id);
        const out = { id: u.id, title: u.title, summary: u.summary };
        if (u.sem === 1 || u.sem === 2) out.sem = u.sem;
        for (const code of u.standards || []) {
          if (!codes.byCode.has(code)) codes.byCode.set(code, []);
          codes.byCode.get(code).push({ course: c.id, unit: u.id });
          const p = codePrefix(code);
          if (p) { if (!codes.byPrefix.has(p)) codes.byPrefix.set(p, new Set()); codes.byPrefix.get(p).add(c.id); }
        }
        const unit = loadReady(u.id, opts.unitsDir);
        if (!unit) out.soon = true;
        // 개정 반영 필요: 단원 파일이 지도와 다른 성취기준으로 쓰였다(교육과정이 바뀐 뒤 아직 다시 쓰지 않음)
        else if (!sameStandards(unit.standards, u.standards)) out.rev = true;
        return out;
      });
      const course = { id: c.id, subject: c.subject, level: c.level, grades: c.grades, title: c.title };
      if (c.note) course.note = c.note;
      course.units = units;
      courses.push(course);
    }
  }
  courses.sort((a, b) =>
    LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level) ||
    GRADE_ORDER.indexOf(a.grades[0]) - GRADE_ORDER.indexOf(b.grades[0]) ||
    SUBJECT_ORDER.indexOf(a.subject) - SUBJECT_ORDER.indexOf(b.subject) ||
    (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  const total = courses.reduce((s, c) => s + c.units.length, 0);
  const soon = courses.reduce((s, c) => s + c.units.filter((u) => u.soon).length, 0);
  const rev = courses.reduce((s, c) => s + c.units.filter((u) => u.rev).length, 0);
  const meta = loadMeta(dir);
  const notices = catalogNotices(readNotices(dir), meta, courses, codes);
  const head = '/* 자동 생성 — node scripts/build-catalog.js (원본: curriculum/*.json). 직접 고치지 않는다.\n' +
    ' * 과정 ' + courses.length + ' · 단원 ' + total + ' (준비 중 ' + soon + (rev ? ' · 개정 반영 중 ' + rev : '') + ')' +
    (notices.length ? ' · 그 뒤 고시 ' + notices.length : '') + ' */\n';
  const body = 'Tutor.registerCatalog({\n' +
    '"version":1,"curriculum":' + JSON.stringify(meta.name) + (meta.basis && meta.basis.no ? ',"basis":' + JSON.stringify(meta.basis.no) : '') + ',\n' +
    '"levels":' + JSON.stringify(LEVELS) + ',\n' +
    '"subjects":' + JSON.stringify(SUBJECTS) + ',\n' +
    (notices.length ? '"notices":[\n' + notices.map((n) => JSON.stringify(n)).join(',\n') + '\n],\n' : '') +
    '"courses":[\n' + courses.map((c) => JSON.stringify(c)).join(',\n') + '\n]});\n';
  return { text: head + body, courses: courses.length, total, soon, rev, notices: notices.length };
}

/* 그 뒤 고시(curriculum/notices.json — scripts/curriculum-watch.js 가 자동으로 적는다) → 카탈로그의 notices
 * 화면은 과정(과목·학년)마다 맞는 고시를 골라 "교육과정 소식"으로 안내한다(js/app.js courseNotices).
 *   { id, no, date, url, volumes: [바뀐 별책 이름…], effective: [{ date, grades }],
 *     parts: [{ name, subjects, courses, except, newSubjects?, related? }] }  ← parts: 이 사이트가 다루는 교과만(meta.covers) */
function readNotices(dir) {
  const file = path.join(dir, 'notices.json');
  if (!fs.existsSync(file)) return [];
  let j;
  try { j = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { fail('curriculum/notices.json 을 읽지 못했어요: ' + e.message); }
  return Array.isArray(j.notices) ? j.notices : [];
}

// 새 과목과 이어지는 지금 단원: 과목 이름으로 같은 과목·학년 단원의 제목·요약을 찾는다(규칙 검색, js/search.js)
function relatedUnits(name, subjects, grades, courses) {
  let S;
  try { S = require(path.join(ROOT, 'js', 'search.js')); } catch (e) { return []; }
  const entries = [];
  for (const c of courses) {
    if (!subjects.includes(c.subject) || !c.grades.some((g) => grades.includes(g))) continue;
    for (const u of c.units) {
      if (u.soon) continue;
      entries.push({ id: u.id, kind: 'unit', title: u.title, text: u.summary, keywords: [], subject: c.subject, course: c.id, unit: u.id, grade: c.grades[0], ref: { tab: 'concepts', idx: 0 } });
    }
  }
  if (!entries.length) return [];
  const idx = S.build(entries);
  const queries = [name].concat(name.split(/\s+/).filter((w) => w.length >= 2 && w !== '생활'));
  const out = [];
  for (const q of queries) {
    for (const r of S.query(idx, q, { limit: 3 })) if (!out.includes(r.entry.id)) out.push(r.entry.id);
  }
  return out.slice(0, 3);
}

// 성취기준 코드 앞부분(학년군+과목 약어): [4사06-01] → 4사, [10공수1-01-01] → 10공수1, [12미적Ⅱ-01-01] → 12미적Ⅱ
function codePrefix(code) {
  const m = /^\[(\d{1,2})([가-힣]+(?:\([가-힣]+\))?(?:\d|[ⅠⅡⅢⅣ])?)-?\d{2}-\d{2}\]$/.exec(code || '');
  return m ? m[1] + m[2] : null;
}
const BAND_GRADES = { 2: ['e1', 'e2'], 4: ['e3', 'e4'], 6: ['e5', 'e6'], 9: ['m1', 'm2', 'm3'], 10: ['h1'], 12: ['h1', 'h2', 'h3'] };

// 자동 반영된 성취기준 변화(notices.json analysis) → 카탈로그 꼴: 과정·단원에 잇는다
//   바뀜·빠짐: 그 코드를 쓰는 단원의 과정 / 새로 생김: 같은 코드 앞부분을 쓰는 과정(없으면 이 별책의 과목 중 학년이 맞는 과정)
function catalogChanges(ch, part, courses, codes) {
  const out = [];
  const inPart = (c) => (part.courses.includes(c.id) || (part.subjects.includes(c.subject) && !part.except.includes(c.id)));
  const forCode = (code) => {
    const hits = (codes && codes.byCode.get(code)) || [];
    if (hits.length) return { courses: [...new Set(hits.map((h) => h.course))], units: [...new Set(hits.map((h) => h.unit))] };
    const p = codePrefix(code);
    const band = p ? BAND_GRADES[Number(/^\d+/.exec(p)[0])] || [] : [];
    let cs = p && codes && codes.byPrefix.get(p) ? [...codes.byPrefix.get(p)] : [];
    if (!cs.length) cs = courses.filter((c) => inPart(c) && c.grades.some((g) => band.includes(g))).map((c) => c.id);
    return { courses: cs, units: [] };
  };
  for (const x of ch.changed || []) out.push(Object.assign({ k: 'chg', code: x.code, from: x.from, to: x.to }, forCode(x.code)));
  for (const x of ch.added || []) out.push(Object.assign({ k: 'add', code: x.code, text: x.text }, forCode(x.code)));
  for (const x of ch.removed || []) out.push(Object.assign({ k: 'del', code: x.code, text: x.text }, forCode(x.code)));
  return out.filter((x) => x.courses.length);
}

function catalogNotices(list, meta, courses, codes) {
  const covers = meta.covers || {};
  return list.map((n) => {
    const grades = [].concat(...(n.effective || []).map((e) => e.grades));
    const parts = [];
    for (const v of n.volumes || []) {
      const cv = covers[String(v.n)];
      if (!cv) continue;
      const part = { name: v.name, subjects: cv.subjects || [], courses: cv.courses || [], except: cv.except || [] };
      if (v.newSubjects && v.newSubjects.length) {
        part.newSubjects = v.newSubjects;
        part.related = [].concat(...v.newSubjects.map((s) => relatedUnits(s, part.subjects, grades, courses)))
          .filter((x, i, a) => a.indexOf(x) === i).slice(0, 3);
      }
      // 별책 성취기준 비교 결과: applied(자동 반영) · unchanged(성취기준 문장 변화 없음) · manual(교육과정 변경 감지 - 수동 확인 필요)
      const an = n.analysis && n.analysis.volumes && n.analysis.volumes[v.n];
      if (an && ['applied', 'unchanged', 'manual'].includes(an.status)) {
        part.status = an.status;
        if (an.status === 'applied' && an.changes) part.changes = catalogChanges(an.changes, part, courses, codes);
      }
      parts.push(part);
    }
    return { id: n.id, no: n.no, date: n.date, url: n.url, volumes: (n.volumes || []).map((v) => v.name), effective: n.effective || [], parts };
  });
}

function main() {
  const r = build();
  if (process.argv.includes('--check')) {
    const now = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
    if (now !== r.text) {
      console.error('✗ data/catalog.js 가 최신이 아니에요 — node scripts/build-catalog.js 로 다시 만드세요');
      process.exit(1);
    }
    console.log('✓ data/catalog.js 최신 (과정 ' + r.courses + ' · 단원 ' + r.total + ' · 준비 중 ' + r.soon + (r.rev ? ' · 개정 반영 중 ' + r.rev : '') + ')');
    return;
  }
  fs.writeFileSync(OUT, r.text);
  console.log('data/catalog.js — 과정 ' + r.courses + ' · 단원 ' + r.total + ' · 준비 중 ' + r.soon + (r.rev ? ' · 개정 반영 중 ' + r.rev : '') + (r.notices ? ' · 그 뒤 고시 ' + r.notices : '') + ' · ' + Math.round(r.text.length / 1024) + 'KB');
}

if (require.main === module) main();
module.exports = { build, LEVELS, SUBJECTS, sameStandards, loadMeta, catalogNotices, catalogChanges, codePrefix };
