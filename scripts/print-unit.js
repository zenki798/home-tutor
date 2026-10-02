/* 단원의 문제를 사람이 읽기 좋게 뽑는다 — 검토자가 정답을 보지 않고 먼저 풀어 보기 위한 도구.
 *
 *   node scripts/print-unit.js --unit math-e4-05 --hide-answers     문제만 (문제은행 + 생성기 견본)
 *   node scripts/print-unit.js --unit math-e4-05                    정답·해설까지
 *   node scripts/print-unit.js --unit math-e4-05 --seeds 12         생성기마다 seed 1~12 로 만든 문제
 *   node scripts/print-unit.js --unit math-e4-05 --only gens        생성기 문제만 (bank: 문제은행만)
 *
 * 서식 글은 TutorText.plain 으로 평문으로 바꿔 보여 준다(있으면). 단원 파일은 고치지 않는다.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const args = process.argv.slice(2);
function opt(name, def) {
  const i = args.indexOf(name);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : def;
}
const unitId = opt('--unit', null);
const hide = args.includes('--hide-answers');
const seeds = Number(opt('--seeds', '8'));
const only = opt('--only', 'all'); // all | gens | bank

if (!unitId) {
  console.error('사용법: node scripts/print-unit.js --unit <단원id> [--hide-answers] [--seeds N] [--only gens|bank]');
  process.exit(2);
}

function tryRequire(p) {
  try { return require(p); } catch (e) { return null; }
}
const TutorMath = tryRequire(path.join(ROOT, 'js', 'mathlib.js'));
const TutorText = tryRequire(path.join(ROOT, 'js', 'mathtext.js'));
if (!TutorMath) {
  console.error('js/mathlib.js 를 불러오지 못했습니다.');
  process.exit(2);
}

const file = path.join(ROOT, 'data', 'units', unitId + '.js');
if (!fs.existsSync(file)) {
  console.error('단원 파일이 없습니다: ' + path.relative(ROOT, file));
  process.exit(2);
}

let unit = null;
const sandbox = {
  Tutor: { registerUnit(u) { unit = u; } },
  TutorMath,
  TutorText,
  console,
};
sandbox.self = sandbox;
sandbox.window = sandbox;
vm.runInNewContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
if (!unit) {
  console.error('Tutor.registerUnit 이 불리지 않았습니다.');
  process.exit(2);
}

const plain = (s) => {
  if (s === undefined || s === null) return '';
  const str = String(s);
  try { return TutorText ? TutorText.plain(str) : str; } catch (e) { return str; }
};
const indent = (s, n) => String(s).split('\n').map((l) => ' '.repeat(n) + l).join('\n');
const TYPE = { choice: '고르기', short: '답 쓰기', ox: 'O/X', order: '순서' };

function show(p, label) {
  const lines = [];
  const meta = [TYPE[p.type] || p.type, p.level ? 'level ' + p.level : null, p.check ? 'check=' + p.check : null, p.unit ? '단위=' + p.unit : null]
    .filter(Boolean).join(', ');
  lines.push('■ ' + label + '  (' + meta + ')');
  lines.push(indent(plain(p.q), 2));
  if (p.fig) lines.push('  [그림] ' + JSON.stringify(p.fig));
  if (p.type === 'choice' || p.type === 'order') {
    (p.choices || []).forEach((c, i) => lines.push('  ' + (i + 1) + ') ' + plain(c)));
    if (p.type === 'choice' && p.fixed) lines.push('  (보기 섞지 않음)');
  }
  if (!hide) {
    let ans;
    if (p.type === 'choice') ans = (typeof p.answer === 'number' ? (p.answer + 1) + ') ' + plain((p.choices || [])[p.answer]) : '?? ' + JSON.stringify(p.answer));
    else if (p.type === 'ox') ans = p.answer === true ? 'O' : p.answer === false ? 'X' : '?? ' + JSON.stringify(p.answer);
    else if (p.type === 'order') ans = (p.answer || []).map((i) => (i + 1) + ') ' + plain((p.choices || [])[i])).join(' → ');
    else ans = JSON.stringify(p.answer);
    lines.push('  ▶ 정답: ' + ans);
    if (p.hint) lines.push('  ▷ 힌트: ' + plain(p.hint));
    if (p.explain) lines.push(indent('▷ 해설: ' + plain(p.explain), 2));
    if (typeof p.concept === 'number') lines.push('  ▷ 관련 개념 카드: ' + p.concept + (unit.concepts && unit.concepts[p.concept] ? ' (' + plain(unit.concepts[p.concept].title) + ')' : ' (없는 카드!)'));
    if (Array.isArray(p.why)) p.why.forEach((w, i) => { if (w) lines.push('  ▷ ' + (i + 1) + ')을 고르면: ' + plain(w)); });
    if (Array.isArray(p.wrong)) p.wrong.forEach((w) => lines.push('  ▷ 틀린 답 ' + JSON.stringify(w.a) + ' → ' + plain(w.why)));
  }
  return lines.join('\n');
}

const out = [];
out.push('# ' + unit.id + ' · ' + unit.title + (hide ? '   (정답 숨김)' : ''));
if (only !== 'gens') {
  (unit.concepts || []).forEach((c, i) => {
    if (c && c.check) out.push(show(c.check, '이해 확인 (개념 카드 ' + i + ': ' + plain(c.title) + ')'));
  });
  for (const [key, name] of [['practice', '문제'], ['advanced', '심화']]) {
    (unit[key] || []).forEach((p, i) => out.push(show(p, name + ' ' + (p.id || i + 1))));
  }
}
if (only !== 'bank') {
  for (const g of unit.gens || []) {
    out.push('\n## 생성기 ' + g.id + ' · ' + (g.title || '') + ' (level ' + g.level + ')');
    for (let s = 1; s <= seeds; s++) {
      let p;
      try {
        p = g.make(TutorMath.toolkit(s));
      } catch (e) {
        out.push('■ seed ' + s + ' — 오류: ' + e.message);
        continue;
      }
      out.push(show(Object.assign({ level: g.level }, p), 'seed ' + s));
    }
  }
}
console.log(out.join('\n\n'));
