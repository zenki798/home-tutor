/* 성취기준 기준 자료(curriculum/standards/) 만들기 · 확인 · 수동 확인 복구 · 기록 · 되돌리기 (AI 없음)
 *
 *   node scripts/curriculum-standards.js --baseline              기준 고시(교육부 고시 제2022-33호)의 별책 원문을 교육부 공식 첨부에서 받아 기준 자료를 만든다
 *   node scripts/curriculum-standards.js --baseline --from DIR   이미 받아 둔 같은 zip 으로 다시 만든다(같은 파일인지 sha256 으로 확인)
 *   node scripts/curriculum-standards.js --check                 기준 자료·고친 판 형식, 해시 사슬, 기록과 파일이 맞는지, 지도의 성취기준 코드가 모두 있는지
 *   node scripts/curriculum-standards.js recover 파일 --notice nec-2026-1 --volume 15 --url 받은곳주소 [--apply] [--close-issue]
 *        "수동 확인 필요" 복구: 관리자가 공식 원문 파일(hwp·hwpx·pdf·xlsx·zip)을 지정하면
 *        파싱 → 앞 판과 비교 → 검증(자동 반영과 같은 조건 + 두 공식 경로 시행일 확인) → 새 판 기록(scheduled/active) → 수동 확인 해제 → 이슈 정리.
 *        --apply 가 없으면 판정만 한다. 같은 원문을 다시 넣으면 아무것도 바뀌지 않는다(멱등). 다른 원문이면 겹쳐 쓰지 않는다.
 *        (analyze 는 recover 의 옛 이름)
 *   node scripts/curriculum-standards.js recover-ci               GitHub Actions(curriculum-recover.yml)용 — 환경 변수로 받는다(셸에 끼워 넣지 않는다)
 *   node scripts/curriculum-standards.js --finish-issues 결과.json  복구 결과대로 이슈에 댓글·닫기(gh)
 *   node scripts/curriculum-standards.js --history               기록·되돌리기 기록
 *   node scripts/curriculum-standards.js --rollback [보관본]      마지막(또는 지정한) 기록을 되돌린다(해시 확인) → 그 별책은 "수동 확인 필요(되돌림)"
 *   node scripts/curriculum-standards.js --retry nec-2026-1      수동 확인(되돌림 포함)인 별책을 다음 확인(curriculum-watch) 때 다시 판정하게 한다
 * 바꾼 뒤에는 카탈로그를 다시 만든다(build-catalog). 커밋 전에 npx playwright test.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const R = require('./lib/revision');
const X = require('./lib/sources');
const net = require('./lib/net');
const { loadMap } = require('./lib/curriculum');

const ROOT = path.join(__dirname, '..');
const CUR = path.join(ROOT, 'curriculum');
const INCOMING = 'curriculum/incoming';

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

const CODE_RE = /^\[\d{1,2}[^\]]+\d{2}-\d{2}\]$/;

// → { ok, errors, stats: { volumes, standards, mapCodes, versions } }
//   기준 자료(지금 시행 판) · 고친 판(versions: 해시·앞 판 사슬) · notices.json 기록과 판 파일이 서로 맞는지 · 지도 코드
function checkRegistries(o) {
  const curDir = (o && o.curDir) || CUR;
  const meta = readJson(path.join(curDir, 'meta.json'), {});
  const stdDir = path.join(curDir, 'standards');
  const regs = R.loadRegistries(stdDir);
  const errors = [];
  const seen = new Map();
  let total = 0;
  let versions = 0;
  const entryErrors = (label, reg) => {
    const codes = Object.keys(reg.standards || {});
    if (codes.length !== reg.count) errors.push(label + ': count(' + reg.count + ')와 성취기준 수(' + codes.length + ')가 달라요');
    for (const c of codes) {
      const e = reg.standards[c];
      if (!CODE_RE.test(c) || !e || typeof e.t !== 'string' || !/다\.?$/.test(e.t)) errors.push(label + ': 이상한 항목 ' + c);
    }
    return codes;
  };
  for (const v of Object.keys(meta.covers || {})) {
    const reg = regs[v];
    if (!reg) { errors.push('기준 자료가 없어요: curriculum/standards/v' + v + '.json'); continue; }
    if (reg.volume !== Number(v)) errors.push('v' + v + '.json 의 volume 이 ' + reg.volume);
    if (!reg.notice || !reg.source || !R.isOfficialUrl(reg.source.url) || !/^[0-9a-f]{64}$/.test(reg.source.sha256 || '')) errors.push('v' + v + '.json: 고시·출처(공식 주소·sha256) 기록이 빠졌어요');
    for (const c of entryErrors('v' + v + '.json', reg)) {
      if (seen.has(c)) errors.push(c + ': 별책 ' + seen.get(c) + '와 ' + v + '에 함께 있어요');
      seen.set(c, v);
    }
    total += Object.keys(reg.standards || {}).length;
    // 고친 판: 파일 이름·별책·내용 해시·출처·시행일·앞 판 해시 사슬(앞 판이 그 뒤로 바뀌지 않았는가)
    for (const ver of R.loadVersions(stdDir, v)) {
      versions++;
      const label = path.relative(curDir, ver.file).split(path.sep).join('/');
      const d = ver.data;
      if (path.basename(ver.file) !== d.noticeId + '.json' || d.volume !== Number(v)) errors.push(label + ': 파일 이름·별책 번호가 기록과 달라요');
      if (d.contentSha256 !== R.contentHash(d.standards)) errors.push(label + ': 성취기준 내용 해시가 맞지 않아요(파일이 바뀌었어요)');
      if (!d.source || !R.isManualSourceUrl(d.source.url) || !/^[0-9a-f]{64}$/.test(d.source.sha256 || '')) errors.push(label + ': 출처(공식 주소·sha256) 기록이 빠졌어요');
      if (!Array.isArray(d.effective) || !d.effective.length || !d.noticeDate || !d.discovered || !d.verified) errors.push(label + ': 고시일·발견일·검증일·시행일 기록이 빠졌어요');
      if (!d.prev || !d.prev.file || R.fileSha(path.join(curDir, d.prev.file)) !== d.prev.sha256) errors.push(label + ': 앞 판(' + (d.prev && d.prev.file) + ')이 기록 뒤에 바뀌었거나 없어요');
      entryErrors(label, d);
    }
  }
  // notices.json 의 확인된 기록 ↔ 판 파일
  const store = readJson(path.join(curDir, 'notices.json'), { notices: [] });
  const recorded = new Set();
  for (const n of store.notices || []) {
    for (const [v, a] of Object.entries((n.analysis && n.analysis.volumes) || {})) {
      if (!R.VERIFIED.includes(a.status) || !a.version) continue;
      recorded.add(a.version.file);
      if (R.fileSha(path.join(curDir, a.version.file)) !== a.version.sha256) errors.push(n.id + ' 별책 ' + v + ': 기록된 판 파일(' + a.version.file + ')이 없거나 해시가 달라요');
    }
  }
  for (const v of Object.keys(meta.covers || {})) {
    for (const ver of R.loadVersions(stdDir, v)) {
      const label = path.relative(curDir, ver.file).split(path.sep).join('/');
      if (!recorded.has(label)) errors.push(label + ': notices.json 에 이 판의 기록이 없어요(주인 없는 판)');
    }
  }
  // 지도의 성취기준 코드는 지금 시행 판(기준 자료)에 모두 있어야 한다
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
  return { ok: !errors.length, errors, stats: { volumes: Object.keys(regs).length, standards: total, mapCodes: refs, versions } };
}

function rebuild() {
  execFileSync(process.execPath, [path.join(__dirname, 'build-catalog.js')], { stdio: 'inherit' });
}

/* ---------- 수동 확인 복구 ---------- */

// 사람이 직접 받은 파일은 국가교육과정정보센터(사람에게는 열려 있는 공식 자료실)도 출처로 인정한다
const manualUrlOk = R.isManualSourceUrl;
const issueKey = (id, v) => '[수동 확인 ' + id + ' 별책 ' + v + ']';
const NET = { getText: net.get, getBuffer: net.getBuffer, post: net.post, robots: net.robotsAllowed, sleep: net.sleep };

// o: { curDir, file, notice(id), volume, url, apply, at, net(가짜 인터넷), crossCheck(시험용) }
// → { ok, error?, changed, results: [{ volume, outcome, rec, issue: { key, action: close|comment|null, body } }] }
//   outcome: recorded(새 판 기록) · unchanged(성취기준 변화 없음 — 수동 확인 해제) · already(같은 원문으로 이미 기록) ·
//            conflict(다른 원문이 이미 기록 — 겹쳐 쓰지 않음) · manual(조건을 통과하지 못함 — 그대로 수동 확인)
async function recover(o) {
  const curDir = o.curDir || CUR;
  const at = o.at || new Date().toISOString();
  const nf = path.join(curDir, 'notices.json');
  const store = readJson(nf, { notices: [] });
  const notice = (store.notices || []).find((n) => n.id === o.notice);
  if (!notice) return { ok: false, error: 'curriculum/notices.json 에 고시 ' + o.notice + ' 가 없어요' };
  if (!manualUrlOk(o.url)) return { ok: false, error: '받은 곳 주소는 공식 기관 https 주소여야 해요(국가교육위원회·교육부·국가법령정보센터·국가교육과정정보센터): ' + (o.url || '(없음)') };
  if (!o.file || !fs.existsSync(o.file)) return { ok: false, error: '원문 파일이 없어요: ' + (o.file || '(없음)') };
  const meta = readJson(path.join(curDir, 'meta.json'), {});
  const files = R.expandFiles(path.basename(o.file), fs.readFileSync(o.file));
  if (!files.length) return { ok: false, error: '읽을 수 있는 문서(hwp·hwpx·pdf·xlsx, zip 안 포함)가 없어요: ' + path.basename(o.file) };
  const vols = (o.volume ? [Number(o.volume)] : (notice.volumes || []).map((v) => v.n)).filter((v) => (meta.covers || {})[v]);
  if (!vols.length) return { ok: false, error: '이 고시에서 이 사이트가 다루는 별책이 아니에요: ' + (o.volume || '') };
  let changed = false;
  // 시행일 확인: 두 공식 경로가 같은 말을 해야 기록한다(자동과 같은 조건)
  if (!(notice.crossCheck && notice.crossCheck.status === 'same')) {
    const cc = o.crossCheck || require('./curriculum-watch').crossCheck;
    const res = await cc(notice, Object.assign({}, NET, o.net || {}));
    if (JSON.stringify(res) !== JSON.stringify(notice.crossCheck)) { notice.crossCheck = res; changed = o.apply !== false; }
  }
  const results = [];
  for (const v of vols) {
    const docs = files.map((f) => ({ url: o.url, name: f.name, archive: f.archive, buf: f.buf, sha256: R.sha256(f.buf), bytes: f.buf.length }))
      .filter((d) => { const dv = R.volumeOfName(d.name); return dv === null || dv === v; });
    const cur = notice.analysis && notice.analysis.volumes && notice.analysis.volumes[v];
    const base = { curDir, store, notice, volume: v, docs, at, manualFile: true, cross: notice.crossCheck };
    const look = R.judgeVolume(Object.assign({ apply: false }, base));
    let outcome;
    let rec = look;
    if (look.already) outcome = 'already';
    else if (look.conflict) outcome = 'conflict';
    else if (look.status === 'manual') outcome = 'manual';
    else outcome = look.status === 'unchanged' ? 'unchanged' : 'recorded';
    if (o.apply !== false && (outcome === 'recorded' || outcome === 'unchanged')) {
      rec = outcome === 'recorded' ? R.judgeVolume(Object.assign({ apply: true }, base)) : look;
      rec.recovered = { at: at.slice(0, 10), by: 'manual-file', url: o.url, file: path.basename(o.file), sha256: R.sha256(fs.readFileSync(o.file)) };
      notice.analysis = notice.analysis || { volumes: {} };
      notice.analysis.volumes = notice.analysis.volumes || {};
      notice.analysis.volumes[v] = rec;
      changed = true;
    } else if (o.apply !== false && outcome === 'manual' && (!cur || cur.status === 'manual')) {
      // 그대로 수동 확인 — 까닭만 새로(되돌림 표시는 지운다: 사람이 원문을 다시 지정했으므로)
      notice.analysis = notice.analysis || { volumes: {} };
      notice.analysis.volumes = notice.analysis.volumes || {};
      notice.analysis.volumes[v] = { status: 'manual', reasons: look.reasons, source: look.source, lastAttempt: { at: at.slice(0, 10), by: 'manual-file', url: o.url, file: path.basename(o.file) } };
      changed = true;
    }
    // 확인된 판을 수동 확인으로 덮어쓰지 않는다(conflict·manual 은 기록을 바꾸지 않는다)
    const key = issueKey(notice.id, v);
    let issue = { key, action: null, body: '' };
    if (outcome === 'recorded' || outcome === 'unchanged' || outcome === 'already') {
      const r2 = (notice.analysis && notice.analysis.volumes && notice.analysis.volumes[v]) || rec;
      issue = {
        key, action: o.apply === false ? null : 'close',
        body: [
          '관리자가 지정한 공식 원문으로 다시 확인했어요 → **' + ({ recorded: '새 판 기록(' + r2.status + ')', unchanged: '성취기준 문장 변화 없음', already: '이미 같은 원문으로 기록돼 있음' }[outcome]) + '**. "' + R.MANUAL_LABEL + '" 상태를 풀었어요.',
          '',
          '- 원문: ' + o.url + ' (' + path.basename(o.file) + ', sha256 ' + R.sha256(fs.readFileSync(o.file)).slice(0, 12) + '…)',
          r2.version ? '- 새 판: curriculum/' + r2.version.file + ' (sha256 ' + r2.version.sha256.slice(0, 12) + '…), 시행: ' + (notice.effective || []).map((e) => e.date + ' ' + e.grades.join(',')).join(' / ') : '- 지금 시행 판은 그대로예요.',
          r2.counts ? '- 추가 ' + r2.counts.added + ' · 삭제 ' + r2.counts.removed + ' · 변경 ' + r2.counts.changed : '',
          r2.snapshot ? '- 되돌리기: `node scripts/curriculum-standards.js --rollback ' + r2.snapshot.split('/').pop() + '`' : '',
        ].filter(Boolean).join('\n'),
      };
    } else {
      issue = {
        key, action: o.apply === false ? null : 'comment',
        body: ['관리자가 지정한 원문(' + path.basename(o.file) + ')으로 다시 확인했지만 **' + (outcome === 'conflict' ? '이미 다른 원문으로 기록돼 있어 겹쳐 쓰지 않았어요' : '조건을 통과하지 못해 기존 자료를 그대로 두었어요') + '**.', '', '까닭:']
          .concat((look.reasons || []).map((s) => '- ' + s)).join('\n'),
      };
    }
    results.push({ volume: v, outcome, rec, issue });
  }
  if (changed && o.apply !== false) {
    if (notice.analysis && notice.analysis.volumes) notice.analysis.status = R.summarizeStatus(notice.analysis.volumes);
    R.writeJson(nf, store);
  }
  return { ok: true, changed: changed && o.apply !== false, results };
}

// curriculum/incoming/<고시 id>/ 의 원문 파일들(같은 폴더 source.txt 에 받은 곳 주소) → 하나씩 복구
//   처리를 마친(recorded·unchanged·already) 원문은 지운다 — 출처·sha256 은 판 기록과 Git 이력에 남는다
async function recoverIncoming(o) {
  const curDir = o.curDir || CUR;
  const root = o.root || ROOT;
  const out = [];
  let changed = false;
  for (const relFile of o.files || []) {
    const parts = relFile.split('/');
    const id = parts.length >= 4 && parts[0] === 'curriculum' && parts[1] === 'incoming' ? parts[2] : null;
    const abs = path.join(root, relFile);
    if (!id || !/^(nec|moe)-\d{4}-\d+$/.test(id) || !fs.existsSync(abs) || !/\.(hwp|hwpx|pdf|xlsx|zip)$/i.test(relFile)) continue;
    const srcFile = path.join(path.dirname(abs), 'source.txt');
    const url = fs.existsSync(srcFile) ? ((fs.readFileSync(srcFile, 'utf8').match(/https:\/\/\S+/) || [])[0] || null) : null;
    const r = await recover({ curDir, file: abs, notice: id, volume: R.volumeOfName(path.basename(relFile)) || undefined, url, apply: o.apply, at: o.at, net: o.net, crossCheck: o.crossCheck });
    if (!r.ok) { out.push({ file: relFile, error: r.error, results: [] }); continue; }
    if (r.changed) changed = true;
    const done = r.results.length && r.results.every((x) => ['recorded', 'unchanged', 'already'].includes(x.outcome));
    if (done && o.apply !== false && o.clean !== false) fs.unlinkSync(abs);
    out.push({ file: relFile, removed: !!(done && o.apply !== false && o.clean !== false), results: r.results });
  }
  // 원문을 다 처리한 폴더의 source.txt 도 정리
  if (o.apply !== false && o.clean !== false) {
    for (const d of new Set((o.files || []).map((f) => path.join(root, path.dirname(f))))) {
      if (fs.existsSync(d) && !fs.readdirSync(d).some((f) => /\.(hwp|hwpx|pdf|xlsx|zip)$/i.test(f)) && fs.existsSync(path.join(d, 'source.txt'))) fs.unlinkSync(path.join(d, 'source.txt'));
    }
  }
  return { changed, items: out };
}

/* ---------- 이슈 정리 ---------- */

function ghRun(args) { return execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); }
// results: recover 결과의 results 들 → 이슈마다 댓글(같은 내용은 한 번만) · 닫기. committed=false 면 닫지 않는다(반영이 아직 저장소에 없음)
function finishIssues(results, o) {
  const gh = (o && o.gh) || ghRun;
  const done = [];
  for (const r of results || []) {
    const it = r.issue;
    if (!it || !it.action) continue;
    // 기록을 바꾼 복구(recorded·unchanged)는 커밋이 된 뒤에만 닫는다. already 는 이미 저장소에 있는 기록이라 닫아도 된다
    if (it.action === 'close' && o && o.committed === false && r.outcome !== 'already') { done.push({ key: it.key, skipped: '커밋 전이라 닫지 않음' }); continue; }
    const found = JSON.parse(gh(['issue', 'list', '--state', 'all', '--search', '"' + it.key + '" in:title', '--json', 'number,state,title', '--limit', '5']) || '[]')
      .filter((x) => String(x.title).includes(it.key));
    if (!found.length) { done.push({ key: it.key, skipped: '이슈 없음' }); continue; }
    const num = String(found[0].number);
    const mark = '<!-- recover:' + crypto.createHash('sha256').update(it.body).digest('hex').slice(0, 16) + ' -->';
    const view = JSON.parse(gh(['issue', 'view', num, '--json', 'comments,state']) || '{}');
    const already = (view.comments || []).some((c) => String(c.body || '').includes(mark));
    if (!already) gh(['issue', 'comment', num, '--body', it.body + '\n\n' + mark]);
    if (it.action === 'close' && view.state !== 'CLOSED') {
      try { gh(['issue', 'close', num, '--reason', 'completed']); } catch (e) { gh(['issue', 'close', num]); }
    }
    done.push({ key: it.key, number: Number(num), commented: !already, closed: it.action === 'close' });
  }
  return done;
}

/* ---------- 실행 ---------- */

function arg(args, name) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}
function setOutput(key, value) {
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, key + '=' + value + '\n');
}
function printResults(results) {
  for (const x of results) {
    const c = x.rec && x.rec.counts;
    const label = { recorded: '✓ 새 판 기록(' + (x.rec && x.rec.status) + ')', unchanged: '✓ 성취기준 변화 없음', already: '○ 이미 같은 원문으로 기록됨(바뀐 것 없음)', conflict: '✗ 다른 원문이 이미 기록됨(겹쳐 쓰지 않음)', manual: '✗ ' + R.MANUAL_LABEL }[x.outcome];
    console.log(label + ' — 별책 ' + x.volume + (c ? ' (추가 ' + c.added + ' · 삭제 ' + c.removed + ' · 변경 ' + c.changed + ')' : ''));
    if (x.outcome === 'manual' || x.outcome === 'conflict') (x.rec.reasons || []).forEach((s) => console.log('  - ' + s));
  }
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
    console.log('✓ 기준 자료 별책 ' + r.stats.volumes + '개 · 성취기준 ' + r.stats.standards + '개 · 고친 판 ' + r.stats.versions + '개 · 지도의 성취기준 코드 ' + r.stats.mapCodes + '개 모두 확인');
    return;
  }
  if (args[0] === 'recover' || args[0] === 'analyze') {
    const file = args[1];
    const notice = arg(args, '--notice');
    if (!file || !notice) { console.error('사용법: node scripts/curriculum-standards.js recover 파일 --notice nec-2026-1 --volume 15 --url 받은곳주소 [--apply] [--close-issue]'); process.exitCode = 2; return; }
    const apply = args.includes('--apply');
    const r = await recover({ file, notice, url: arg(args, '--url'), volume: arg(args, '--volume') ? Number(arg(args, '--volume')) : undefined, apply });
    if (!r.ok) { console.error('✗ ' + r.error); process.exitCode = 1; return; }
    printResults(r.results);
    if (!apply) console.log('(판정만 했어요 — 기록하려면 --apply)');
    if (r.changed) rebuild();
    if (apply && args.includes('--close-issue')) console.log(JSON.stringify(finishIssues(r.results, { committed: true })));
    return;
  }
  if (args[0] === 'recover-ci') {
    // GitHub Actions: 입력은 환경 변수로만 받는다(셸 명령에 끼워 넣지 않는다)
    const env = process.env;
    const dry = env.DRY_RUN === 'true';
    let res;
    if (env.EVENT === 'workflow_dispatch') {
      const file = path.join(ROOT, env.FILE || '');
      if (!env.FILE || path.relative(ROOT, file).startsWith('..')) { console.error('✗ 파일은 저장소 안의 경로여야 해요: ' + env.FILE); process.exitCode = 1; return; }
      const r = await recover({ file, notice: env.NOTICE, volume: Number(env.VOLUME) || undefined, url: env.URL, apply: !dry });
      if (!r.ok) { console.error('✗ ' + r.error); process.exitCode = 1; return; }
      res = { changed: r.changed, items: [{ file: env.FILE, results: r.results }] };
    } else {
      // push: 이번에 올라온(더해지거나 바뀐) curriculum/incoming 아래 원문만
      const before = /^[0-9a-f]{40}$/.test(env.BEFORE || '') && !/^0+$/.test(env.BEFORE) ? env.BEFORE : null;
      let list = [];
      try {
        list = before ? execFileSync('git', ['diff', '--name-only', '--diff-filter=AM', before, 'HEAD', '--', INCOMING], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean) :
          execFileSync('git', ['ls-files', '--', INCOMING], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean);
      } catch (e) { list = []; }
      res = await recoverIncoming({ files: list, apply: !dry });
    }
    for (const it of res.items) {
      console.log('· ' + it.file + (it.error ? ' — ✗ ' + it.error : ''));
      printResults(it.results || []);
    }
    fs.mkdirSync(path.join(ROOT, 'tmp'), { recursive: true });
    fs.writeFileSync(path.join(ROOT, 'tmp', 'recover-result.json'), JSON.stringify([].concat(...res.items.map((it) => (it.results || []).map((x) => ({ volume: x.volume, outcome: x.outcome, issue: x.issue })))), null, 1));
    const msg = '교육과정 수동 확인 복구: ' + res.items.map((it) => it.file.split('/').slice(-2).join('/') + ' → ' + (it.results || []).map((x) => x.outcome).join(',')).join('; ');
    fs.writeFileSync(path.join(ROOT, 'tmp', 'recover-commit.txt'), msg.slice(0, 200) + '\n');
    if (res.changed && !dry) rebuild();
    setOutput('changed', res.changed && !dry ? 'true' : 'false');
    if (res.items.some((it) => it.error)) process.exitCode = 1;
    return;
  }
  if (args.includes('--finish-issues')) {
    const results = readJson(arg(args, '--finish-issues'), []);
    console.log(JSON.stringify(finishIssues(results, { committed: process.env.COMMITTED !== 'false' }), null, 1));
    return;
  }
  if (args.includes('--history')) {
    const log = R.readLog(CUR);
    if (!log.entries.length) { console.log('기록이 없어요'); return; }
    log.entries.forEach((e) => console.log(e.at.slice(0, 19) + ' ' + e.action + ' ' + e.notice + ' 별책 ' + e.volume + (e.status ? ' [' + e.status + ']' : '') +
      (e.counts ? ' (추가 ' + e.counts.added + '·삭제 ' + e.counts.removed + '·변경 ' + e.counts.changed + ')' : '') + ' ' + e.snapshot +
      (e.dataHash ? ' 해시 ' + e.dataHash.before.slice(0, 8) + '→' + e.dataHash.after.slice(0, 8) : '')));
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
    // 수동 확인(되돌림 포함)인 별책만 지운다 — 확인된 판은 그대로
    const vols = (n.analysis && n.analysis.volumes) || {};
    for (const v of Object.keys(vols)) if (vols[v].status === 'manual') delete vols[v];
    if (!Object.keys(vols).length) delete n.analysis;
    else n.analysis.status = 'manual';
    R.writeJson(nf, store);
    console.log('✓ ' + n.no + ' — 수동 확인 별책을 다음 확인 때 다시 판정해요(node scripts/curriculum-watch.js --update)');
    rebuild();
    return;
  }
  console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(0, 19).join('\n'));
}

if (require.main === module) main().catch((e) => { console.error('✗ ' + e.message); process.exitCode = 1; });
module.exports = { buildBaseline, checkRegistries, recover, recoverIncoming, finishIssues, manualUrlOk, issueKey, BASIS_FILES, BASIS_POST };
