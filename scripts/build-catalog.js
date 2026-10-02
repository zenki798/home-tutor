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
function unitReady(id) {
  const file = path.join(UNITS, id + '.js');
  if (!fs.existsSync(file)) return false;
  const r = loadUnitFile(file);
  return !r.error && r.count === 1 && !!r.unit && r.unit.id === id;
}

function build() {
  const dir = path.join(ROOT, 'curriculum');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort();
  const courses = [];
  const seen = new Set();
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
        if (!unitReady(u.id)) out.soon = true;
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
  const head = '/* 자동 생성 — node scripts/build-catalog.js (원본: curriculum/*.json). 직접 고치지 않는다.\n' +
    ' * 과정 ' + courses.length + ' · 단원 ' + total + ' (준비 중 ' + soon + ') */\n';
  const body = 'Tutor.registerCatalog({\n' +
    '"version":1,"curriculum":"2022 개정 교육과정",\n' +
    '"levels":' + JSON.stringify(LEVELS) + ',\n' +
    '"subjects":' + JSON.stringify(SUBJECTS) + ',\n' +
    '"courses":[\n' + courses.map((c) => JSON.stringify(c)).join(',\n') + '\n]});\n';
  return { text: head + body, courses: courses.length, total, soon };
}

function main() {
  const r = build();
  if (process.argv.includes('--check')) {
    const now = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
    if (now !== r.text) {
      console.error('✗ data/catalog.js 가 최신이 아니에요 — node scripts/build-catalog.js 로 다시 만드세요');
      process.exit(1);
    }
    console.log('✓ data/catalog.js 최신 (과정 ' + r.courses + ' · 단원 ' + r.total + ' · 준비 중 ' + r.soon + ')');
    return;
  }
  fs.writeFileSync(OUT, r.text);
  console.log('data/catalog.js — 과정 ' + r.courses + ' · 단원 ' + r.total + ' · 준비 중 ' + r.soon + ' · ' + Math.round(r.text.length / 1024) + 'KB');
}

if (require.main === module) main();
module.exports = { build, LEVELS, SUBJECTS };
