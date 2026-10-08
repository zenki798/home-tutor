/* 준비 중(soon) 단원을 내용 작성 워크플로의 작업으로 묶는다 (읽기만 한다)
 *
 *   node scripts/content-jobs.js            작업 목록(JSON 배열)을 보여 준다
 *   node scripts/content-jobs.js --run 5    워크플로 한 번에 넘길 묶음으로 나눠 보여 준다
 *   옵션: --per 4 (작업 하나에 단원 몇 개, 같은 과정끼리)
 *
 * 작업 한 줄 = '<과정id>#<n>|<과목>|<단원id,…>' — tools/content-workflow.js 의 args.jobs 꼴(작성 → 독립 검토).
 * 워크플로 한 번에 작업 n개면 에이전트는 작성 n + 검토 n 명이다(2026-10-08 결정: 한 번에 10명 이하 → --run 5).
 * 카탈로그(data/catalog.js)의 soon 표시는 build-catalog 가 붙인다 — 물결을 마치면 scripts/after-wave.js 가 다시 만든다.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const argv = process.argv.slice(2);
function opt(name, def) {
  const i = argv.indexOf(name);
  const v = i >= 0 ? parseInt(argv[i + 1], 10) : NaN;
  return isFinite(v) && v > 0 ? v : def;
}
const PER = opt('--per', 4);
const RUN = opt('--run', 0);

let cat = null;
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'data', 'catalog.js'), 'utf8'), { Tutor: { registerCatalog: (c) => { cat = c; } } });
if (!cat) { console.error('data/catalog.js 를 읽지 못했어요'); process.exit(1); }

const jobs = [];
let units = 0;
for (const c of cat.courses) {
  const soon = (c.units || []).filter((u) => u && u.soon).map((u) => u.id);
  units += soon.length;
  for (let i = 0, k = 1; i < soon.length; i += PER, k++) jobs.push(c.id + '#' + k + '|' + c.subject + '|' + soon.slice(i, i + PER).join(','));
}

if (!RUN) {
  console.log(JSON.stringify(jobs, null, 1));
} else {
  const runs = [];
  for (let i = 0; i < jobs.length; i += RUN) runs.push(jobs.slice(i, i + RUN));
  console.log(JSON.stringify(runs, null, 1));
}
console.error('준비 중 단원 ' + units + '개 · 작업 ' + jobs.length + '개' + (RUN ? ' · 워크플로 ' + Math.ceil(jobs.length / RUN) + '번' : ''));
