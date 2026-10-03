/* 교육과정 개정 비교: 지금 지도(curriculum/) ↔ 새 지도(curriculum/revisions/<판>/)
 *
 *   node scripts/curriculum-diff.js curriculum/revisions/2027
 *   node scripts/curriculum-diff.js curriculum/revisions/2027 --md docs/revisions/2027.md --jobs tmp/revision-2027.json
 *
 * 무엇이 바뀌었는지(과정·단원·성취기준)와, 그래서 할 일을 뽑는다:
 *   - 새로 쓸 단원(새 지도에만 있음)            → 작성 작업  "과정#n|과목|id,…"
 *   - 다시 쓸 단원(성취기준이 바뀜)              → 고쳐 쓰기 "V|라벨|과목|id,…"  (적용 뒤 화면에 '개정 반영 중')
 *   - 살펴볼 단원(제목·요약·topics 만 바뀜)       → 검토     "R|라벨|과목|id,…"
 *   - 뺄 단원(새 지도에 없음)                    → curriculum-apply.js 가 retired/ 로 옮긴다
 * 작업 꼴은 내용 작성 워크플로(tmp/workflows/ 또는 docs/CURRICULUM-REVISION.md)의 jobs 와 같다.
 * 지도·단원 파일은 바꾸지 않는다(읽기만). 바꾸는 것은 curriculum-apply.js.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { ROOT, CURRENT, loadMap, sameStandards } = require('./lib/curriculum');

const JOB_SIZE = 4;

function chunk(list, n) {
  const out = [];
  for (let i = 0; i < list.length; i += n) out.push(list.slice(i, i + n));
  return out;
}

function sameList(a, b) {
  return JSON.stringify(a || []) === JSON.stringify(b || []);
}

// 두 지도를 견준다 → { from, to, courses: {added, removed, changed}, units: {added, removed, standards, content, moved}, standards: {added, removed} }
function diffMaps(oldMap, newMap) {
  const oc = {}, nc = {};
  oldMap.courses.forEach((c) => { oc[c.id] = c; });
  newMap.courses.forEach((c) => { nc[c.id] = c; });
  const courses = { added: [], removed: [], changed: [] };
  for (const id of Object.keys(nc)) {
    if (!oc[id]) { courses.added.push(id); continue; }
    const a = oc[id], b = nc[id];
    const what = ['title', 'subject', 'level', 'note'].filter((k) => (a[k] || '') !== (b[k] || ''));
    if (!sameList(a.grades, b.grades)) what.push('grades');
    if (what.length) courses.changed.push({ id, what });
  }
  for (const id of Object.keys(oc)) if (!nc[id]) courses.removed.push(id);

  const units = { added: [], removed: [], standards: [], content: [], moved: [] };
  for (const id of Object.keys(newMap.units)) {
    const n = newMap.units[id], o = oldMap.units[id];
    if (!o) { units.added.push({ id, course: n.course.id, subject: n.course.subject }); continue; }
    if (o.course.id !== n.course.id) units.moved.push({ id, from: o.course.id, to: n.course.id });
    if (!sameStandards(o.unit.standards, n.unit.standards)) {
      units.standards.push({ id, course: n.course.id, subject: n.course.subject, from: o.unit.standards || [], to: n.unit.standards || [] });
    } else {
      const what = ['title', 'summary'].filter((k) => (o.unit[k] || '') !== (n.unit[k] || ''));
      if (!sameList(o.unit.topics, n.unit.topics)) what.push('topics');
      if (what.length) units.content.push({ id, course: n.course.id, subject: n.course.subject, what });
    }
  }
  for (const id of Object.keys(oldMap.units)) if (!newMap.units[id]) units.removed.push({ id, course: oldMap.units[id].course.id });

  const codes = (m) => {
    const s = new Set();
    Object.values(m.units).forEach((x) => (x.unit.standards || []).forEach((c) => s.add(c)));
    return s;
  };
  const os = codes(oldMap), ns = codes(newMap);
  const standards = { added: [...ns].filter((c) => !os.has(c)).sort(), removed: [...os].filter((c) => !ns.has(c)).sort() };
  return {
    from: oldMap.meta ? oldMap.meta.version : null,
    to: newMap.meta ? newMap.meta.version : null,
    courses, units, standards,
  };
}

// 과정별로 단원을 4개씩 묶어 워크플로 작업 줄로
function jobs(list, prefix) {
  const byCourse = new Map();
  for (const u of list) {
    if (!byCourse.has(u.course)) byCourse.set(u.course, { subject: u.subject, ids: [] });
    byCourse.get(u.course).ids.push(u.id);
  }
  const out = [];
  for (const [course, g] of byCourse) {
    chunk(g.ids.sort(), JOB_SIZE).forEach((ids, i) => {
      const label = course + '#' + (i + 1);
      out.push(prefix ? prefix + '|' + prefix + ' ' + label + '|' + g.subject + '|' + ids.join(',') : label + '|' + g.subject + '|' + ids.join(','));
    });
  }
  return out;
}

function jobsOf(d) {
  return {
    version: d.to,
    write: jobs(d.units.added, ''),
    revise: jobs(d.units.standards, 'V'),
    review: jobs(d.units.content, 'R'),
    retire: d.units.removed.map((u) => u.id),
  };
}

function report(d) {
  const L = [];
  const n = (a) => a.length;
  L.push('# 교육과정 개정 비교: ' + (d.from || '지금') + ' → ' + (d.to || '새 판'));
  L.push('');
  L.push('| 항목 | 수 |');
  L.push('|---|---|');
  L.push('| 새 과정 | ' + n(d.courses.added) + ' |');
  L.push('| 없어진 과정 | ' + n(d.courses.removed) + ' |');
  L.push('| 바뀐 과정(제목·학년 등) | ' + n(d.courses.changed) + ' |');
  L.push('| **새로 쓸 단원** | ' + n(d.units.added) + ' |');
  L.push('| **다시 쓸 단원**(성취기준 바뀜) | ' + n(d.units.standards) + ' |');
  L.push('| 살펴볼 단원(제목·요약·topics 만 바뀜) | ' + n(d.units.content) + ' |');
  L.push('| 뺄 단원 | ' + n(d.units.removed) + ' |');
  L.push('| 새 성취기준 / 없어진 성취기준 | ' + n(d.standards.added) + ' / ' + n(d.standards.removed) + ' |');
  L.push('');
  const sec = (title, rows) => {
    if (!rows.length) return;
    L.push('## ' + title);
    L.push('');
    rows.forEach((r) => L.push('- ' + r));
    L.push('');
  };
  sec('새 과정', d.courses.added);
  sec('없어진 과정', d.courses.removed);
  sec('바뀐 과정', d.courses.changed.map((c) => c.id + ' (' + c.what.join('·') + ')'));
  sec('새로 쓸 단원', d.units.added.map((u) => u.id));
  sec('다시 쓸 단원 (성취기준)', d.units.standards.map((u) => u.id + ': ' + u.from.join(' ') + ' → ' + u.to.join(' ')));
  sec('살펴볼 단원', d.units.content.map((u) => u.id + ' (' + u.what.join('·') + ')'));
  sec('다른 과정으로 옮긴 단원', d.units.moved.map((u) => u.id + ': ' + u.from + ' → ' + u.to));
  sec('뺄 단원', d.units.removed.map((u) => u.id));
  L.push('다음: `node scripts/curriculum-apply.js <새 지도 폴더>` → 작업 목록으로 내용 워크플로 → 테스트 → 배포 (docs/CURRICULUM-REVISION.md)');
  return L.join('\n') + '\n';
}

function main() {
  const args = process.argv.slice(2);
  const dirArg = args.find((a) => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--md' && args[args.indexOf(a) - 1] !== '--jobs');
  if (!dirArg) {
    console.error('사용법: node scripts/curriculum-diff.js curriculum/revisions/<판> [--md 보고서.md] [--jobs 작업.json]');
    process.exit(2);
  }
  const newDir = path.resolve(ROOT, dirArg);
  if (!fs.existsSync(newDir)) { console.error('✗ 새 지도 폴더가 없어요: ' + dirArg); process.exit(2); }
  const d = diffMaps(loadMap(CURRENT), loadMap(newDir));
  const md = report(d);
  const mi = args.indexOf('--md');
  const ji = args.indexOf('--jobs');
  if (mi > 0 && args[mi + 1]) { fs.mkdirSync(path.dirname(path.resolve(ROOT, args[mi + 1])), { recursive: true }); fs.writeFileSync(path.resolve(ROOT, args[mi + 1]), md); }
  if (ji > 0 && args[ji + 1]) { fs.mkdirSync(path.dirname(path.resolve(ROOT, args[ji + 1])), { recursive: true }); fs.writeFileSync(path.resolve(ROOT, args[ji + 1]), JSON.stringify(jobsOf(d), null, 1)); }
  process.stdout.write(md);
}

if (require.main === module) main();
module.exports = { diffMaps, jobsOf, report };
