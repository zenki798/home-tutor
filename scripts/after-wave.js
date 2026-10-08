/* 단원 작성·검토 워크플로(물결)가 끝난 뒤 정리 — node scripts/after-wave.js
 *
 * 1) data/units 에서 실행되지 않는(쓰다 끊긴) 단원 파일을 tmp/partial-units/ 로 옮긴다 — 카탈로그가 '준비 중'으로 두고, 다음 물결의 작성자가 초안으로 참고한다
 * 2) 카탈로그(data/catalog.js)·질문 검색 색인(data/index/)을 다시 만든다
 * 3) 학습 내용 검사(요약)를 보인다 — 오류가 있으면 종료 코드 1
 * 전체 시험(npx playwright test)과 커밋은 따로 한다. 워크플로가 도는 동안에는 돌리지 않는다(쓰는 중인 파일을 옮겨 버린다).
 * (tmp/after-wave.sh 와 같은 일 — 경로에 매이지 않게 2026-10-08 옮겼다)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { loadUnitFile } = require('./validate-content.js');

const ROOT = path.join(__dirname, '..');
const UNITS = path.join(ROOT, 'data', 'units');
const PART = path.join(ROOT, 'tmp', 'partial-units');

fs.mkdirSync(PART, { recursive: true });
let moved = 0;
for (const f of fs.readdirSync(UNITS).filter((x) => x.endsWith('.js'))) {
  const p = path.join(UNITS, f);
  const r = loadUnitFile(p);
  if (!r.unit || r.error) {
    console.log('끊긴 파일 → tmp/partial-units:', f, r.error ? String(r.error.msg || '').slice(0, 60) : '');
    fs.renameSync(p, path.join(PART, f));
    moved++;
  }
}
console.log('옮긴 파일: ' + moved);

function run(script, args) {
  return execFileSync(process.execPath, [path.join(__dirname, script)].concat(args || []), { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 });
}
function tail(s, n) { return String(s || '').trim().split('\n').slice(-n).join('\n'); }

console.log(tail(run('build-catalog.js'), 2));
console.log(tail(run('build-index.js'), 2));
try {
  console.log(tail(run('validate-content.js', ['--quiet']), 6));
} catch (e) {
  console.log(tail(e.stdout, 12));
  process.exitCode = 1;
}
