/* 단원 내용 → 질문 검색 색인 data/index/<과목>-<학교급>.js (ARCHITECTURE §5)
 *
 *   node scripts/build-index.js           만든다
 *   node scripts/build-index.js --check   지금 파일이 최신인지 본다(다르면 종료 코드 1)
 *
 * 휴대폰에서 질문할 때 그 과목·학교급 색인만 싣도록 나눈다(한 파일 수백 KB 이하).
 * 글은 TutorText.plain 으로 평문으로 바꾸고 짧게 자른다. 같은 입력 → 같은 출력(정렬).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { loadUnitFile } = require('./validate-content.js');

const ROOT = path.join(__dirname, '..');
const TutorText = require(path.join(ROOT, 'js', 'mathtext.js'));
const { build: buildCatalog } = require('./build-catalog');
const OUT_DIR = path.join(ROOT, 'data', 'index');

function plain(s, max) {
  if (typeof s !== 'string' || !s) return '';
  let t;
  try { t = TutorText.plain(s); } catch (e) { t = s; }
  t = t.replace(/\s+/g, ' ').trim();
  return max && t.length > max ? t.slice(0, max - 1) + '…' : t;
}

// 화면처럼 엔진 전역(TutorMath·TutorText·TutorFig)이 있는 상태에서 실행한다(검사기·build-catalog 와 같은 방식)
function loadUnit(id) {
  const r = loadUnitFile(path.join(ROOT, 'data', 'units', id + '.js'));
  if (r.error) throw new Error(id + ': ' + r.error.msg);
  return r.unit;
}

function entriesFor(course, meta) {
  const unit = loadUnit(meta.id);
  if (!unit) return [];
  const base = { subject: course.subject, course: course.id, unit: unit.id, grade: course.grades[0] };
  const terms = (unit.terms || []).map((t) => t && t.term).filter((x) => typeof x === 'string' && x);
  const out = [];
  const add = (o) => out.push(Object.assign({}, o, base, { id: o.id }));
  add({ id: unit.id, kind: 'unit', title: unit.title, text: plain([unit.summary].concat(unit.goals || []).join(' '), 200), keywords: terms.slice(0, 10), ref: { tab: 'concepts', idx: 0 } });
  (unit.concepts || []).forEach((c, i) => {
    if (!c) return;
    const body = plain(c.body, 400);
    add({
      id: unit.id + '#c' + i, kind: 'concept', title: plain(c.title, 60), text: body.slice(0, 160),
      keywords: terms.filter((t) => body.includes(t) || String(c.title).includes(t)).slice(0, 8), ref: { tab: 'concepts', idx: i },
    });
  });
  (unit.terms || []).forEach((t, i) => {
    if (!t || !t.term) return;
    add({ id: unit.id + '#t' + i, kind: 'term', title: plain(t.term, 40), text: plain(t.def, 160), keywords: [t.term], ref: { tab: 'terms', idx: i } });
  });
  (unit.faq || []).forEach((f, i) => {
    if (!f || !f.q) return;
    add({ id: unit.id + '#f' + i, kind: 'faq', title: plain(f.q, 80), text: plain(f.a, 200), keywords: terms.filter((t) => String(f.q).includes(t)).slice(0, 5), ref: { tab: 'faq', idx: i } });
  });
  (unit.mistakes || []).forEach((m, i) => {
    add({ id: unit.id + '#m' + i, kind: 'mistake', title: '자주 하는 실수', text: plain(m, 160), keywords: [], ref: { tab: 'faq' } });
  });
  // 영어 낱말: "library 뜻", "도서관 영어로"
  (unit.vocab || []).forEach((v, i) => {
    if (!v || !v.w) return;
    add({ id: unit.id + '#v' + i, kind: 'term', title: v.w, text: plain(v.m + (v.ex ? ' — ' + v.ex : ''), 120), keywords: [v.w, v.m].filter(Boolean), ref: { tab: 'vocab', idx: i } });
  });
  return out;
}

function build() {
  const cat = buildCatalog();
  // build-catalog 의 결과에서 과정 목록을 다시 읽는다(같은 규칙: 준비 중 단원은 빼고)
  const sandbox = { Tutor: { registerCatalog(c) { sandbox.cat = c; } } };
  vm.runInNewContext(cat.text, sandbox);
  const groups = {};
  for (const course of sandbox.cat.courses) {
    const key = course.subject + '-' + course.level;
    if (!groups[key]) groups[key] = [];
    for (const u of course.units) {
      if (u.soon) continue;
      groups[key].push.apply(groups[key], entriesFor(course, u));
    }
  }
  const files = {};
  Object.keys(groups).sort().forEach((key) => {
    const list = groups[key];
    files[key + '.js'] = '/* 자동 생성 — node scripts/build-index.js. 직접 고치지 않는다. 항목 ' + list.length + '개 */\n' +
      'Tutor.registerIndex(' + JSON.stringify(key) + ', [\n' + list.map((e) => JSON.stringify(e)).join(',\n') + '\n]);\n';
  });
  return files;
}

function main() {
  const files = build();
  const check = process.argv.includes('--check');
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const existing = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.js'));
  let stale = [];
  for (const f of existing) if (!files[f]) stale.push(f);
  if (check) {
    for (const f of Object.keys(files)) {
      const p = path.join(OUT_DIR, f);
      if (!fs.existsSync(p) || fs.readFileSync(p, 'utf8') !== files[f]) stale.push(f);
    }
    if (stale.length) {
      console.error('✗ 검색 색인이 최신이 아니에요: ' + stale.join(', ') + ' — node scripts/build-index.js 로 다시 만드세요');
      process.exit(1);
    }
    console.log('✓ 검색 색인 최신 (' + Object.keys(files).length + '개 파일)');
    return;
  }
  for (const f of stale) fs.unlinkSync(path.join(OUT_DIR, f));
  let total = 0;
  for (const f of Object.keys(files)) {
    fs.writeFileSync(path.join(OUT_DIR, f), files[f]);
    total += files[f].length;
    console.log('data/index/' + f + ' — ' + Math.round(files[f].length / 1024) + 'KB');
  }
  console.log('합계 ' + Math.round(total / 1024) + 'KB, 파일 ' + Object.keys(files).length + '개');
}

if (require.main === module) main();
module.exports = { build };
