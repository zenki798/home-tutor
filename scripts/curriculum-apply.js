/* 교육과정 개정 적용: 새 지도(curriculum/revisions/<판>/)를 지금 지도로 바꾼다
 *
 *   node scripts/curriculum-apply.js curriculum/revisions/2027 --dry-run   무엇이 바뀌는지만 본다
 *   node scripts/curriculum-apply.js curriculum/revisions/2027             적용
 *
 * 1) 새 지도를 검사한다(meta.json·과정/단원 id·필수 칸) — 틀리면 아무것도 바꾸지 않는다
 * 2) 지금 지도(curriculum/*.json·meta.json)를 curriculum/history/<지금 판>/ 에 보관한다
 * 3) curriculum/ 의 지도를 새 지도로 바꾼다
 * 4) 새 지도에 없는 단원 파일은 retired/units/<지금 판>/ 으로 옮긴다(배포되지 않는다)
 * 5) build-catalog·build-index 를 다시 돌린다 →
 *    새 단원은 '준비 중', 성취기준이 바뀐 단원은 '개정 반영 중'(rev)이 저절로 붙는다. 사이트는 그대로 동작한다.
 * 그다음 curriculum-diff.js 의 작업 목록으로 내용 워크플로를 돌려 다시 쓰면 '개정 반영 중'이 저절로 사라진다.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { ROOT, CURRENT, loadMap, mapFiles, validateMap } = require('./lib/curriculum');

function copyFile(a, b) { fs.mkdirSync(path.dirname(b), { recursive: true }); fs.copyFileSync(a, b); }

// opts: { newDir, curDir, unitsDir, historyDir, retiredDir, dryRun, rebuild } → { ok, errors, archived, replaced, retired }
function applyRevision(opts) {
  const curDir = opts.curDir || CURRENT;
  const unitsDir = opts.unitsDir || path.join(ROOT, 'data', 'units');
  const newMap = loadMap(opts.newDir);
  const curMap = loadMap(curDir);
  const errors = validateMap(newMap);
  const res = { ok: false, errors, archived: null, replaced: [], retired: [], from: curMap.meta && curMap.meta.version, to: newMap.meta && newMap.meta.version };
  if (errors.length) return res;
  if (res.from && res.to && res.from === res.to) { errors.push('새 지도의 판(' + res.to + ')이 지금 판과 같아요 — meta.json 의 version 을 새 판으로'); return res; }

  const historyDir = path.join(opts.historyDir || path.join(curDir, 'history'), String(res.from || 'old'));
  const retiredDir = path.join(opts.retiredDir || path.join(ROOT, 'retired', 'units'), String(res.from || 'old'));
  const retire = Object.keys(curMap.units).filter((id) => !newMap.units[id] && fs.existsSync(path.join(unitsDir, id + '.js')));
  res.archived = historyDir;
  res.replaced = mapFiles(opts.newDir);
  res.retired = retire;
  if (opts.dryRun) { res.ok = true; return res; }

  // 2) 보관
  for (const f of mapFiles(curDir).concat(fs.existsSync(path.join(curDir, 'meta.json')) ? ['meta.json'] : [])) {
    const to = path.join(historyDir, f);
    if (!fs.existsSync(to)) copyFile(path.join(curDir, f), to);
  }
  // 3) 바꾸기: 지금 지도 파일을 지우고 새 지도 파일을 넣는다
  for (const f of mapFiles(curDir)) fs.unlinkSync(path.join(curDir, f));
  for (const f of mapFiles(opts.newDir).concat(['meta.json'])) copyFile(path.join(opts.newDir, f), path.join(curDir, f));
  // 4) 뺄 단원
  for (const id of retire) {
    fs.mkdirSync(retiredDir, { recursive: true });
    fs.renameSync(path.join(unitsDir, id + '.js'), path.join(retiredDir, id + '.js'));
  }
  // 5) 카탈로그·색인
  if (opts.rebuild !== false) {
    execFileSync(process.execPath, [path.join(__dirname, 'build-catalog.js')], { stdio: 'inherit' });
    execFileSync(process.execPath, [path.join(__dirname, 'build-index.js')], { stdio: 'inherit' });
  }
  res.ok = true;
  return res;
}

function main() {
  const args = process.argv.slice(2);
  const dirArg = args.find((a) => !a.startsWith('--'));
  if (!dirArg) {
    console.error('사용법: node scripts/curriculum-apply.js curriculum/revisions/<판> [--dry-run]');
    process.exit(2);
  }
  const newDir = path.resolve(ROOT, dirArg);
  if (!fs.existsSync(newDir)) { console.error('✗ 새 지도 폴더가 없어요: ' + dirArg); process.exit(2); }
  const dry = args.includes('--dry-run');
  const r = applyRevision({ newDir, dryRun: dry });
  if (!r.ok) {
    console.error('✗ 적용하지 않았어요:\n- ' + r.errors.join('\n- '));
    process.exit(1);
  }
  console.log((dry ? '[미리 보기] ' : '✓ ') + '교육과정 ' + (r.from || '?') + ' → ' + r.to);
  console.log('- 지금 지도 보관: ' + path.relative(ROOT, r.archived));
  console.log('- 새 지도 파일: ' + r.replaced.length + '개');
  console.log('- 뺄 단원(retired/ 로 옮김): ' + (r.retired.length ? r.retired.join(' ') : '없음'));
  if (!dry) console.log('다음: node scripts/curriculum-diff.js 의 작업 목록으로 다시 쓰기 → npx playwright test → 커밋·push (docs/CURRICULUM-REVISION.md)');
}

if (require.main === module) main();
module.exports = { applyRevision };
