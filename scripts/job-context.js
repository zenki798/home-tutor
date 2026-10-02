/* 내용 작성·검토 작업의 맥락을 보여 준다 — 맡은 단원의 과정·차례·topics·성취기준, 같은 과목의 앞뒤 과정.
 *
 *   node scripts/job-context.js math-e4-07,math-e4-08
 *
 * 교육과정 지도 원본(curriculum/*.json)을 읽는다. 아무것도 고치지 않는다.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const LEVEL_ORDER = ['elem', 'mid', 'high', 'univ', 'adult'];
const LEVEL_NAME = { elem: '초등학교', mid: '중학교', high: '고등학교', univ: '대학교', adult: '성인' };
const TONE = {
  elem: '쉬운 해요체. 초1~2 는 한 문장 25자 안팎, 한자어 대신 쉬운 말, 작은 수, 그림 많이. 초3~6 은 교과 용어를 처음 나올 때 풀어서',
  mid: '해요체. 교과 용어를 쓰되 정의를 분명히, 왜 그런지 이유까지',
  high: '합니다체. 정확한 용어, 간결한 설명, 원리의 흐름',
  univ: '합니다체. 간결·정확, 전공과의 연결',
  adult: '합니다체. 다시 배우는 어른을 존중하는 말투(아이 취급 금지), 생활 속 예',
};

function load() {
  const dir = path.join(ROOT, 'curriculum');
  const courses = [];
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json')).sort()) {
    const j = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    for (const c of j.courses) courses.push(Object.assign({ group: j.group }, c));
  }
  return courses;
}

function main() {
  const ids = (process.argv[2] || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!ids.length) {
    console.error('사용법: node scripts/job-context.js <단원id,단원id,…>');
    process.exit(2);
  }
  const courses = load();
  const course = courses.find((c) => c.units.some((u) => u.id === ids[0]));
  if (!course) {
    console.error('교육과정 지도에 없는 단원: ' + ids[0]);
    process.exit(1);
  }
  const same = courses.filter((c) => c.subject === course.subject)
    .sort((a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level));
  const idx = same.indexOf(course);
  const out = [];
  out.push('# 과정: ' + course.title + ' (' + course.id + ')');
  out.push('- 과목: ' + course.subject + ' · 학교급: ' + LEVEL_NAME[course.level] + ' · 학년: ' + course.grades.join(', '));
  if (course.note) out.push('- 안내: ' + course.note);
  out.push('- 말투·눈높이: ' + TONE[course.level]);
  out.push('');
  out.push('## 과정 전체 단원 차례 (▶ = 이번에 쓸 단원)');
  for (const u of course.units) out.push((ids.includes(u.id) ? '▶ ' : '  ') + u.id + ' ' + u.title + (u.sem ? ' (' + u.sem + '학기)' : ''));
  out.push('');
  out.push('## 이번에 쓸 단원');
  for (const id of ids) {
    const u = course.units.find((x) => x.id === id);
    if (!u) { out.push('- ' + id + ': ⚠️ 이 과정에 없는 단원'); continue; }
    out.push('### ' + u.id + ' · ' + u.title);
    out.push('- 요약: ' + u.summary);
    if (u.standards && u.standards.length) out.push('- 성취기준: ' + u.standards.join(' '));
    out.push('- 꼭 다룰 내용(topics):');
    for (const t of u.topics || []) out.push('  - ' + t);
    const exists = fs.existsSync(path.join(ROOT, 'data', 'units', u.id + '.js'));
    out.push('- 파일: data/units/' + u.id + '.js ' + (exists ? '(이미 있음)' : '(아직 없음)'));
  }
  out.push('');
  const prev = same.slice(Math.max(0, idx - 2), idx);
  const next = same.slice(idx + 1, idx + 2);
  out.push('## 같은 과목 앞 과정 (이미 배운 것 — 풀이에 써도 된다)');
  if (!prev.length) out.push('- 없음 (이 과목의 첫 과정)');
  for (const c of prev) out.push('- ' + c.title + ': ' + c.units.map((u) => u.title).join(' · '));
  out.push('');
  out.push('## 같은 과목 다음 과정 (아직 안 배운 것 — 풀이에 쓰지 않는다)');
  if (!next.length) out.push('- 없음');
  for (const c of next) out.push('- ' + c.title + ': ' + c.units.map((u) => u.title).join(' · '));
  console.log(out.join('\n'));
}

main();
