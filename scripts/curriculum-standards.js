/* 성취기준 기준 자료(curriculum/standards/) 만들기 · 확인 · 사람이 받은 파일 판정 · 기록 · 되돌리기 (AI 없음)
 *
 *   node scripts/curriculum-standards.js --baseline              기준 고시(교육부 고시 제2022-33호)의 별책 원문을 교육부 공식 첨부에서 받아 기준 자료를 만든다
 *   node scripts/curriculum-standards.js --baseline --from DIR   이미 받아 둔 같은 zip 으로 다시 만든다(같은 파일인지 sha256 으로 확인)
 *   node scripts/curriculum-standards.js --check                 기준 자료 형식 · 지도(curriculum/*.json)의 성취기준 코드가 모두 기준 자료에 있는지
 *   node scripts/curriculum-standards.js analyze 파일 --notice nec-2026-1 --url 받은곳주소 [--apply]
 *        사람이 공식 경로(국가교육과정정보센터 등)에서 직접 받은 별책 파일(hwp·hwpx·pdf·xlsx·zip)을 자동 반영과 같은 규칙으로 판정한다.
 *        모든 조건을 통과할 때만 --apply 로 반영한다(백업·기록 포함). 통과하지 못하면 까닭을 보여 주고 아무것도 바꾸지 않는다.
 *   node scripts/curriculum-standards.js --history               반영·되돌리기 기록
 *   node scripts/curriculum-standards.js --rollback [보관본]      마지막(또는 지정한) 자동 반영을 되돌린다 → 그 별책은 "수동 확인 필요(되돌림)"
 *   node scripts/curriculum-standards.js --retry nec-2026-1      되돌렸거나 수동 확인으로 둔 고시를 다음 확인(curriculum-watch) 때 다시 판정하게 한다
 * 바꾼 뒤에는 카탈로그를 다시 만든다(build-catalog). 커밋 전에 npx playwright test.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const R = require('./lib/revision');
const X = require('./lib/sources');
const net = require('./lib/net');
const { loadMap } = require('./lib/curriculum');

const ROOT = path.join(__dirname, '..');
const CUR = path.join(ROOT, 'curriculum');

// 기준 고시의 별책 원문 — 교육부 > 입법·행정예고 > "[교육부 고시 제2022-33호] 초중등학교 교육과정 총론 및 각론 고시"(2022-12-22)
const BASIS_POST = X.MOE.view('93458');
const BASIS_FILES = [
  { name: '(붙임2) [별책5_14] 국어 도덕 수학 사회 과학 실과기술가정정보 체육 음악 미술 영어.zip', url: 'https://www.moe.go.kr/boardCnts/fileDown.do?m=040401&s=moe&fileSeq=1512facbda6c234a1641ac7e9c156ca2' },
  { name: '(붙임3) [별책15_22] 바슬즐 제2외국어 한문 중선택 고교교양 과학계열 체육계열 예술계열.zip', url: 'https://www.moe.go.kr/boardCnts/fileDown.do?m=040401&s=moe&fileSeq=5b7e71c0de65bde9f7d3cd153db54813' },
];

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return fallback; }
}

/* ---------- 기준 자료 만들기 ---------- */

// o: { curDir, meta, getBuffer, robots, sleep, from(폴더: zip 이름 그대로) } → { written: [{ volume, count }], errors }
async function buildBaseline(o) {
  const curDir = o.curDir || CUR;
  const meta = o.meta || readJson(path.join(curDir, 'meta.json'), {});
  const covers = meta.covers || {};
  const want = Object.keys(covers).map(Number);
  const basis = (meta.basis || {}).no;
  const stdDir = path.join(curDir, 'standards');
  const written = [];
  const errors = [];
  if (!o.from && !(await o.robots(X.MOE.origin, '/boardCnts/fileDown.do'))) throw new Error('robots.txt 가 교육부 첨부를 막았어요');
  for (const src of BASIS_FILES) {
    const r = /별책\s*(\d+)\s*_\s*(\d+)/.exec(src.name);
    if (r && !want.some((v) => v >= Number(r[1]) && v <= Number(r[2]))) continue;
    let buf;
    if (o.from) buf = fs.readFileSync(path.join(o.from, src.name));
    else { buf = await o.getBuffer(src.url); await o.sleep(1000); }
    const zipSha = R.sha256(buf);
    for (const f of R.expandFiles(src.name, buf)) {
      const v = R.volumeOfName(f.name);
      if (!want.includes(v)) continue;
      const sha = R.sha256(f.buf);
      const old = R.loadRegistry(stdDir, v);
      if (o.from && old && old.source && old.source.sha256 !== sha) { errors.push('별책 ' + v + ': --from 파일이 기록된 원문과 달라요(sha256)'); continue; }
      const parsed = R.readDoc(f.name, f.buf);
      const bad = [];
      if (parsed.issues.length) bad.push('구조를 확실히 읽지 못함: ' + parsed.issues.slice(0, 3).join(' / '));
      if (parsed.volume !== v) bad.push('문서 머리의 별책 번호가 ' + parsed.volume);
      if (parsed.notice !== basis) bad.push('문서 머리의 고시가 ' + parsed.notice);
      if (bad.length) { errors.push('별책 ' + v + ' (' + f.name + '): ' + bad.join(', ')); continue; }
      const reg = R.toRegistry(parsed, {
        volume: v,
        notice: basis,
        source: { url: src.url, post: BASIS_POST, archive: src.name, archiveSha256: zipSha, file: f.name, sha256: sha, bytes: f.buf.length },
      });
      R.writeJson(R.registryFile(stdDir, v), reg);
      written.push({ volume: v, count: reg.count, name: reg.name });
    }
  }
  for (const v of want) if (!written.some((w) => w.volume === v) && !errors.some((e) => e.startsWith('별책 ' + v + ' '))) errors.push('별책 ' + v + ': 원문 파일을 찾지 못했어요');
  return { written, errors };
}

/* ---------- 확인 ---------- */

// → { ok, errors, stats: { volumes, standards, mapCodes } }
function checkRegistries(o) {
  const curDir = (o && o.curDir) || CUR;
  const meta = readJson(path.join(curDir, 'meta.json'), {});
  const regs = R.loadRegistries(path.join(curDir, 'standards'));
  const errors = [];
  const seen = new Map();
  let total = 0;
  for (const v of Object.keys(meta.covers || {})) {
    const reg = regs[v];
    if (!reg) { errors.push('기준 자료가 없어요: curriculum/standards/v' + v + '.json'); continue; }
    if (reg.volume !== Number(v)) errors.push('v' + v + '.json 의 volume 이 ' + reg.volume);
    if (!reg.notice || !reg.source || !R.isOfficialUrl(reg.source.url) || !/^[0-9a-f]{64}$/.test(reg.source.sha256 || '')) errors.push('v' + v + '.json: 고시·출처(공식 주소·sha256) 기록이 빠졌어요');
    const codes = Object.keys(reg.standards || {});
    if (codes.length !== reg.count) errors.push('v' + v + '.json: count(' + reg.count + ')와 성취기준 수(' + codes.length + ')가 달라요');
    for (const c of codes) {
      const e = reg.standards[c];
      if (!/^\[\d{1,2}[^\]]+\d{2}-\d{2}\]$/.test(c) || !e || typeof e.t !== 'string' || !/다\.?$/.test(e.t)) errors.push('v' + v + '.json: 이상한 항목 ' + c);
      if (seen.has(c)) errors.push(c + ': 별책 ' + seen.get(c) + '와 ' + v + '에 함께 있어요');
      seen.set(c, v);
    }
    total += codes.length;
  }
  const map = loadMap(curDir);
  let refs = 0;
  for (const c of map.courses) {
    for (const u of c.units || []) {
      for (const code of u.standards || []) {
        refs++;
        if (!seen.has(code)) errors.push(u.id + ': 성취기준 ' + code + ' 이 기준 자료에 없어요');
      }
    }
  }
  return { ok: !errors.length, errors, stats: { volumes: Object.keys(regs).length, standards: total, mapCodes: refs } };
}

function rebuild() {
  execFileSync(process.execPath, [path.join(__dirname, 'build-catalog.js')], { stdio: 'inherit' });
}

/* ---------- 사람이 받은 파일 판정 ---------- */

// 사람이 직접 받은 파일은 국가교육과정정보센터(사람에게는 열려 있는 공식 자료실)도 출처로 인정한다
const manualUrlOk = R.isManualSourceUrl;

function analyzeFile(o) {
  const curDir = o.curDir || CUR;
  const nf = path.join(curDir, 'notices.json');
  const store = readJson(nf, { notices: [] });
  const notice = (store.notices || []).find((n) => n.id === o.notice);
  if (!notice) return { ok: false, error: 'curriculum/notices.json 에 고시 ' + o.notice + ' 가 없어요' };
  if (!manualUrlOk(o.url)) return { ok: false, error: '--url 은 받은 공식 기관 주소(https)여야 해요(국가교육위원회·교육부·국가법령정보센터·국가교육과정정보센터)' };
  const buf = fs.readFileSync(o.file);
  const files = R.expandFiles(path.basename(o.file), buf);
  const meta = readJson(path.join(curDir, 'meta.json'), {});
  const vols = (o.volume ? [o.volume] : (notice.volumes || []).map((v) => v.n)).filter((v) => (meta.covers || {})[v]);
  const out = [];
  for (const v of vols) {
    const docs = files.map((f) => ({ url: o.url, name: f.name, archive: f.archive, buf: f.buf, sha256: R.sha256(f.buf), bytes: f.buf.length }))
      .filter((d) => { const dv = R.volumeOfName(d.name); return dv === null || dv === v; });
    // 판정만 하는 동안에는 아무것도 바꾸지 않는다(apply:false) — 통과하고 --apply 일 때만 다시 적용
    const rec = R.judgeVolume({ curDir, store, notice, volume: v, docs, apply: false, at: o.at, manualFile: true });
    if (rec.status !== 'manual' && o.apply) {
      const done = R.judgeVolume({ curDir, store, notice, volume: v, docs, apply: true, at: o.at, manualFile: true });
      done.by = 'manual-file';
      notice.analysis = notice.analysis || { volumes: {} };
      notice.analysis.volumes = notice.analysis.volumes || {};
      notice.analysis.volumes[v] = done;
      notice.analysis.status = R.summarizeStatus(notice.analysis.volumes);
      out.push({ volume: v, rec: done, applied: true });
    } else out.push({ volume: v, rec, applied: false });
  }
  if (out.some((x) => x.applied)) R.writeJson(nf, store);
  return { ok: true, results: out };
}

/* ---------- 실행 ---------- */

function arg(args, name) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--baseline')) {
    const r = await buildBaseline({ getBuffer: net.getBuffer, robots: net.robotsAllowed, sleep: net.sleep, from: arg(args, '--from') });
    r.written.forEach((w) => console.log('✓ 별책 ' + w.volume + ' ' + w.name + ' — 성취기준 ' + w.count + '개'));
    r.errors.forEach((e) => console.error('✗ ' + e));
    if (r.errors.length) process.exitCode = 1;
    return;
  }
  if (args.includes('--check')) {
    const r = checkRegistries();
    if (!r.ok) { console.error('✗ 기준 자료 문제 ' + r.errors.length + '건\n- ' + r.errors.slice(0, 30).join('\n- ')); process.exitCode = 1; return; }
    console.log('✓ 기준 자료 별책 ' + r.stats.volumes + '개 · 성취기준 ' + r.stats.standards + '개 · 지도의 성취기준 코드 ' + r.stats.mapCodes + '개 모두 확인');
    return;
  }
  if (args[0] === 'analyze') {
    const file = args[1];
    const notice = arg(args, '--notice');
    if (!file || !notice) { console.error('사용법: node scripts/curriculum-standards.js analyze 파일 --notice nec-2026-1 --url 받은곳주소 [--volume 15] [--apply]'); process.exitCode = 2; return; }
    const r = analyzeFile({ file, notice, url: arg(args, '--url'), volume: arg(args, '--volume') ? Number(arg(args, '--volume')) : undefined, apply: args.includes('--apply') });
    if (!r.ok) { console.error('✗ ' + r.error); process.exitCode = 1; return; }
    for (const x of r.results) {
      const c = x.rec.counts;
      if (x.rec.status === 'manual') console.log('✗ 별책 ' + x.volume + ': ' + R.MANUAL_LABEL + '\n  - ' + x.rec.reasons.join('\n  - '));
      else console.log((x.applied ? '✓ 반영함' : '○ 통과(아직 반영 안 함 — --apply)') + ' 별책 ' + x.volume + ': ' + (c ? '추가 ' + c.added + ' · 삭제 ' + c.removed + ' · 변경 ' + c.changed : '성취기준 문장 변화 없음'));
    }
    if (r.results.some((x) => x.applied)) rebuild();
    return;
  }
  if (args.includes('--history')) {
    const log = R.readLog(CUR);
    if (!log.entries.length) { console.log('기록이 없어요'); return; }
    log.entries.forEach((e) => console.log(e.at.slice(0, 19) + ' ' + e.action + ' ' + e.notice + ' 별책 ' + e.volume + (e.counts ? ' (추가 ' + e.counts.added + '·삭제 ' + e.counts.removed + '·변경 ' + e.counts.changed + ')' : '') + ' ' + e.snapshot));
    return;
  }
  if (args.includes('--rollback')) {
    const r = R.rollback({ curDir: CUR, snapshot: arg(args, '--rollback') && !arg(args, '--rollback').startsWith('--') ? arg(args, '--rollback') : undefined });
    if (!r.ok) { console.error('✗ ' + r.error); process.exitCode = 1; return; }
    console.log('✓ 되돌림: ' + r.notice + ' 별책 ' + r.volume + ' (' + r.snapshot + ')\n- ' + r.restored.join('\n- '));
    rebuild();
    return;
  }
  if (args.includes('--retry')) {
    const id = arg(args, '--retry');
    const nf = path.join(CUR, 'notices.json');
    const store = readJson(nf, { notices: [] });
    const n = (store.notices || []).find((x) => x.id === id);
    if (!n) { console.error('✗ 고시 ' + id + ' 가 없어요'); process.exitCode = 1; return; }
    delete n.analysis;
    R.writeJson(nf, store);
    console.log('✓ ' + n.no + ' — 다음 확인 때 다시 판정해요(node scripts/curriculum-watch.js --update)');
    rebuild();
    return;
  }
  console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(0, 14).join('\n'));
}

if (require.main === module) main().catch((e) => { console.error('✗ ' + e.message); process.exitCode = 1; });
module.exports = { buildBaseline, checkRegistries, analyzeFile, manualUrlOk, BASIS_FILES, BASIS_POST };
