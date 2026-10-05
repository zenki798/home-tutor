/* 단원 파일 빠른 검사 — 내용 작성자가 단원 하나를 쓸 때마다 돌린다.
 *
 *   node scripts/lint-unit.js math-e4-07              단원 하나
 *   node scripts/lint-unit.js math-e4-07 math-e4-08   여러 개
 *   node scripts/lint-unit.js --course math-e4        과정의 (있는) 단원 전부
 *   옵션: --seeds 300 (생성기 시험 횟수, 기본 200), --quiet (경고 숨김), --json
 *
 * 형식·정답 자기 일관성·서식 글·그림·생성기·조사까지 본다(scripts/lib/unit-checks.js).
 * 교육과정 지도(curriculum/*.json)에 있는 단원인지, 제목이 같은지도 본다.
 * 오류가 있으면 종료 코드 1.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { checkUnit } = require('./lib/unit-checks');

const ROOT = path.join(__dirname, '..');
const TutorMath = require(path.join(ROOT, 'js', 'mathlib.js'));
const TutorText = require(path.join(ROOT, 'js', 'mathtext.js'));
const TutorFig = require(path.join(ROOT, 'js', 'figures.js'));

// 교육과정 지도(curriculum/*.json — meta.json·notices.json 은 빼고): scripts/lib/curriculum.js 와 같은 읽기
function loadCurriculum() {
  const dir = path.join(ROOT, 'curriculum');
  const units = {};
  const courses = {};
  if (!fs.existsSync(dir)) return { units, courses };
  const map = require('./lib/curriculum').loadMap(dir);
  for (const c of map.courses) courses[c.id] = c;
  for (const id of Object.keys(map.units)) units[id] = map.units[id];
  return { units, courses };
}

// 단원 파일을 실행해 등록된 단원을 받는다 (파일마다 따로 — 한 파일의 문법 오류가 다른 파일을 막지 않게)
function loadUnitFile(file) {
  let unit = null;
  let count = 0;
  const sandbox = {
    Tutor: { registerUnit(u) { unit = u; count++; } },
    TutorMath, TutorText, TutorFig, console,
  };
  sandbox.self = sandbox;
  sandbox.window = sandbox;
  try {
    vm.runInNewContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file, timeout: 5000 });
  } catch (e) {
    return { error: '파일을 실행하지 못했어요(문법 오류?): ' + e.message };
  }
  if (count !== 1) return { error: 'Tutor.registerUnit 을 ' + count + '번 불렀어요 (한 파일 = 한 단원)' };
  return { unit };
}

function lintFile(file, cur, opts) {
  const fileId = path.basename(file, '.js');
  const loaded = loadUnitFile(file);
  if (loaded.error) return { id: fileId, errors: [{ path: '', msg: loaded.error }], warnings: [], stats: {} };
  const meta = cur.units[fileId] || null;
  const course = meta ? meta.course : null;
  const res = checkUnit(loaded.unit, {
    TutorMath, TutorText, TutorFig,
    meta, fileId, requireMeta: Object.keys(cur.units).length > 0,
    subject: course ? course.subject : undefined,
    grades: course ? course.grades : undefined,
    seeds: opts.seeds,
    source: fs.readFileSync(file, 'utf8'),
  });
  return Object.assign({ id: fileId }, res);
}

function main() {
  const args = process.argv.slice(2);
  const opts = { seeds: 200, quiet: false, json: false };
  const ids = [];
  let course = null;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--seeds') opts.seeds = Number(args[++i]) || 200;
    else if (a === '--quiet') opts.quiet = true;
    else if (a === '--json') opts.json = true;
    else if (a === '--course') course = args[++i];
    else if (a === '--unit') ids.push(args[++i]);
    else ids.push(a);
  }
  const cur = loadCurriculum();
  const unitDir = path.join(ROOT, 'data', 'units');
  if (course) {
    const c = cur.courses[course];
    const list = c ? c.units.map((u) => u.id) : fs.readdirSync(unitDir).filter((f) => f.startsWith(course + '-')).map((f) => f.slice(0, -3));
    for (const id of list) if (fs.existsSync(path.join(unitDir, id + '.js'))) ids.push(id);
  }
  if (!ids.length) {
    console.error('사용법: node scripts/lint-unit.js <단원id…> | --course <과정id> [--seeds N] [--quiet] [--json]');
    process.exit(2);
  }
  const results = [];
  for (const id of ids) {
    const file = path.join(unitDir, id + '.js');
    if (!fs.existsSync(file)) { results.push({ id, errors: [{ path: '', msg: '파일이 없어요: data/units/' + id + '.js' }], warnings: [], stats: {} }); continue; }
    results.push(lintFile(file, cur, opts));
  }
  if (opts.json) {
    console.log(JSON.stringify(results, null, 1));
  } else {
    for (const r of results) {
      console.log('■ ' + r.id + ' — 오류 ' + r.errors.length + ' · 경고 ' + r.warnings.length +
        (r.stats && r.stats.problems !== undefined ? ' · 문제 ' + r.stats.problems + '(생성기 견본 포함) · 생성기 ' + r.stats.gens + ' · 이해 확인 ' + r.stats.checks + '/' + r.stats.concepts : ''));
      for (const e of r.errors) console.log('  ✗ ' + (e.path ? e.path + ': ' : '') + e.msg);
      if (!opts.quiet) for (const w of r.warnings) console.log('  △ ' + (w.path ? w.path + ': ' : '') + w.msg);
    }
    const ne = results.reduce((s, r) => s + r.errors.length, 0);
    const nw = results.reduce((s, r) => s + r.warnings.length, 0);
    console.log('합계: 단원 ' + results.length + ' · 오류 ' + ne + ' · 경고 ' + nw);
  }
  process.exit(results.some((r) => r.errors.length) ? 1 : 0);
}

if (require.main === module) main();
module.exports = { loadUnitFile, loadCurriculum, lintFile };
