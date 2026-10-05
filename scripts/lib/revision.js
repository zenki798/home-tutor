/* 교육과정 별책(성취기준) 자동 반영 — 판정 · 기록(예약) · 되돌리기
 *
 * 기준 자료(지금 시행 판): curriculum/standards/v<별책>.json — 공식 별책 원문에서 규칙으로 뽑은 성취기준(코드 → 문장·과목·영역·학년군)
 *   { volume, name, notice, source: { url, file, archive?, sha256, bytes }, parser, count, courses, standards: { 코드: { t, c, a, b } } }
 * 고친 판: curriculum/standards/versions/v<별책>/<고시 id>.json — 같은 꼴 + 고시일·발견일·검증일·시행일(학년별)·앞 판·해시.
 *   **기준 자료는 덮어쓰지 않는다.** 새 판은 따로 쌓고(고시 순서대로 사슬), 학생에게는 그 학년의 시행 학년도가 되었을 때만
 *   적용된다(js/impact.js — 기기 안 계산). 시행 전 학년이 남아 있으면 scheduled, 모든 학년이 시행되면 active.
 *
 * 새 고시가 어떤 별책을 고쳤으면, 그 별책의 확정 원문을 공식 경로에서 받아 같은 규칙으로 읽고 사슬의 마지막 판과 비교한다(추가·삭제·변경).
 * 아래 조건을 하나도 어기지 않을 때만 기록한다. 하나라도 불확실하면 기존 자료를 그대로 두고 "수동 확인 필요"로 남긴다.
 *   출처   1) 공식 기관(https) 주소에서 받은 파일   2) 행정예고본·신구대비표 같은 확정 전 문서가 아님
 *          3) 문서 머리의 고시 번호·별책 번호가 이 고시와 같음
 *   읽기   4) 문서 구조를 남김없이 읽음(issues 없음)   5) 과목 목록이 앞 판과 같음(빠지거나 새로 생긴 과목 없음)
 *   코드   6) 새 과목 약어(코드 앞부분)가 없음   7) 같은 코드의 과목·영역·학년군이 앞 판과 같음   8) 다른 별책 코드와 겹치지 않음
 *          9) 같은 코드인데 문장이 크게 달라진 것(뜻이 바뀌었을 수 있음)이 없음   10) 바뀐 양이 전면 개편 수준이 아님
 *   학년  11) 바뀐 코드의 학년군이 그 코드를 쓰는 이 사이트 과정의 학년과 맞음(다른 학년에 잘못 붙지 않음)
 *   시행  12) 바뀌는 과정의 모든 학년에 고시의 시행일이 있음   13) 두 공식 경로(국가교육위원회·국가법령정보센터)의 시행일·별책이 같음
 *   차례  14) 앞선 고시의 같은 별책 변경이 확인되지 않은 채 남아 있지 않음, 뒤 고시가 먼저 기록돼 있지 않음
 *   중복  15) 같은 고시·별책은 한 번만 — 같은 원문이면 그대로(멱등), 다른 원문이면 겹쳐 쓰지 않고 수동 확인
 * 기록 전에는 앞 판을 curriculum/history/standards/<시각>-<고시>-v<별책>/ 에 보관하고(파일별 sha256 전·후 포함),
 * curriculum/history/standards-log.json 에 남긴다. 되돌리기(rollback)는 파일 해시가 기록 직후 그대로인지 확인한 뒤 그 판을 지우고,
 * 기록 전 해시로 돌아왔는지 다시 확인한다. 그 별책은 "수동 확인 필요(되돌림)" — 다음 확인 때 다시 자동 기록하지 않는다.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const S = require('./standards');
const N = require('./notices');
const { hwpText } = require('./hwp');
const { readZip } = require('./zip');
const { xlsxSheets } = require('./xlsx');

const PARSER = 1;
// 확인된 판의 상태: scheduled(시행 전 학년이 남음) · active(모든 학년 시행). 예전 기록의 applied 도 확인된 판으로 읽는다
const VERIFIED = ['scheduled', 'active', 'applied'];
const OFFICIAL = ['ne.go.kr', 'moe.go.kr', 'law.go.kr'];
const DRAFT = /행정\s*예고|예고\s*본|예고\s*안|\(\s*안\s*\)|개정\s*안|시안|초안|신구\s*(?:조문\s*)?대비|의견\s*(?:검토|수렴|제출)|공청회|공표문/;
const LIMITS = { removed: 0.2, changed: 0.3, added: 0.5, minSimilarity: 0.35, smallBase: 20 };
const MANUAL_LABEL = '교육과정 변경 감지 - 수동 확인 필요';

function hostIn(u, list) {
  try {
    const x = new URL(u);
    return x.protocol === 'https:' && list.some((d) => x.hostname === d || x.hostname.endsWith('.' + d));
  } catch (e) { return false; }
}
// 자동으로 받는 곳(robots.txt 가 허락하는 공식 기관)
function isOfficialUrl(u) { return hostIn(u, OFFICIAL); }
// 사람이 직접 받아 넣은 파일: 국가교육과정정보센터(사람에게는 열린 공식 자료실)도 출처로 인정한다
const MANUAL_HOSTS = OFFICIAL.concat(['ncic.go.kr', 'ncic.re.kr']);
function isManualSourceUrl(u) { return hostIn(u, MANUAL_HOSTS); }
function isDraft() {
  return [].slice.call(arguments).some((n) => DRAFT.test(N.norm(String(n || '')).replace(/\s+/g, ' ')));
}
function sha256(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }

// zip 안 이름: UTF-8 표시가 없으면 한국 공공기관 파일은 대개 CP949 다
function zipName(n) {
  return /[\x80-\xff]/.test(n) ? new TextDecoder('euc-kr').decode(Buffer.from(n, 'latin1')) : n;
}
const DOC_EXT = /\.(hwp|hwpx|pdf|xlsx)$/i;

// 파일 하나(zip 이면 안의 문서들) → [{ name, buf, archive? }]
function expandFiles(name, buf) {
  if (/\.zip$/i.test(name)) {
    const z = readZip(buf);
    return z.names.filter((n) => !/\/$/.test(n)).map((n) => ({ name: zipName(n).split('/').pop(), buf: z.read(n), archive: name }))
      .filter((f) => DOC_EXT.test(f.name));
  }
  return DOC_EXT.test(name) ? [{ name, buf }] : [];
}

// 문서 → 성취기준 읽기 결과(parseStandards 꼴). 읽을 수 없으면 issues 에 까닭
function readDoc(name, buf) {
  try {
    if (/\.xlsx$/i.test(name)) return S.parseStandardsRows([].concat(...xlsxSheets(buf).map((s) => s.rows)));
    let text;
    if (/\.hwp$/i.test(name)) text = hwpText(buf);
    else if (/\.hwpx$/i.test(name)) text = N.hwpxText(buf);
    else if (/\.pdf$/i.test(name)) text = N.pdfText(buf);
    else return { standards: [], courses: [], issues: ['읽을 수 없는 파일 형식이에요'], warnings: [], stats: {} };
    return S.parseStandards(text);
  } catch (e) {
    return { standards: [], courses: [], issues: ['파일을 읽지 못했어요: ' + e.message], warnings: [], stats: {} };
  }
}

// 파일 이름으로 본 별책 번호: "[별책7] 사회과 교육과정.hwp" → 7
function volumeOfName(name) {
  const m = /별책\s*(\d+)/.exec(N.norm(name || ''));
  return m ? Number(m[1]) : null;
}

/* ---------- 기준 자료 ---------- */

function registryFile(dir, v) { return path.join(dir, 'v' + v + '.json'); }
function loadRegistry(dir, v) {
  const f = registryFile(dir, v);
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null;
}
function loadRegistries(dir) {
  const out = {};
  if (!fs.existsSync(dir)) return out;
  for (const f of fs.readdirSync(dir)) {
    const m = /^v(\d+)\.json$/.exec(f);
    if (m) out[m[1]] = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  }
  return out;
}
function textMap(reg) {
  const out = {};
  for (const code of Object.keys((reg && reg.standards) || {})) out[code] = reg.standards[code].t;
  return out;
}
function toRegistry(parsed, info) {
  const standards = {};
  for (const s of parsed.standards) {
    const e = { t: s.text };
    if (s.course) e.c = s.course;
    if (s.area) e.a = s.area;
    if (s.band) e.b = s.band;
    standards[s.code] = e;
  }
  const out = { volume: info.volume, name: info.name || parsed.title || null, notice: info.notice };
  if (info.prev) out.prev = info.prev;
  out.source = info.source;
  out.parser = PARSER;
  out.count = parsed.standards.length;
  out.courses = parsed.courses;
  out.standards = standards;
  return out;
}
function writeJson(file, obj) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(obj, null, 1) + '\n');
}

/* ---------- 고친 판(versions) · 해시 ---------- */

function versionsDir(stdDir, v) { return path.join(stdDir, 'versions', 'v' + v); }
function versionFile(stdDir, v, noticeId) { return path.join(versionsDir(stdDir, v), noticeId + '.json'); }
// 이 별책의 고친 판들(고시일 순) → [{ file, data }]
function loadVersions(stdDir, v) {
  const dir = versionsDir(stdDir, v);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => /\.json$/.test(f)).map((f) => ({ file: path.join(dir, f), data: JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) }))
    .sort((a, b) => String(a.data.noticeDate).localeCompare(String(b.data.noticeDate)) || String(a.data.noticeId).localeCompare(String(b.data.noticeId)));
}
// 사슬의 마지막 판(없으면 기준 자료) → { file, data }
function chainHead(stdDir, v) {
  const list = loadVersions(stdDir, v);
  if (list.length) return list[list.length - 1];
  const f = registryFile(stdDir, v);
  return fs.existsSync(f) ? { file: f, data: JSON.parse(fs.readFileSync(f, 'utf8')) } : null;
}
function fileSha(file) { return fs.existsSync(file) ? sha256(fs.readFileSync(file)) : null; }
function rel(curDir, file) { return path.relative(curDir, file).split(path.sep).join('/'); }
// 성취기준 내용만의 해시(코드·문장·과목·영역·학년군) — 같은 내용이면 같은 값(파일 모양·출처와 무관)
function contentHash(standards) {
  const codes = Object.keys(standards || {}).sort();
  return sha256(Buffer.from(JSON.stringify(codes.map((c) => [c, standards[c].t, standards[c].c || '', standards[c].a || '', standards[c].b || ''])), 'utf8'));
}
// curriculum/standards 아래 모든 파일의 상태 해시(기록 직전·직후 비교용)
function dataHash(curDir) {
  const root = path.join(curDir, 'standards');
  const out = [];
  (function walk(d) {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const f = path.join(d, e.name);
      if (e.isDirectory()) walk(f);
      else out.push(rel(curDir, f) + ':' + fileSha(f));
    }
  })(root);
  return sha256(Buffer.from(out.join('\n'), 'utf8'));
}
function todayOf(at) { return String(at || new Date().toISOString()).slice(0, 10); }

// 지도(curriculum/*.json)의 성취기준 색인: 코드 → 그 코드를 쓰는 단원·과정·학년, 코드 앞부분 → 과정·학년
function mapIndex(curDir) {
  const out = { byCode: new Map(), byPrefix: new Map() };
  let map;
  try { map = require('./curriculum').loadMap(curDir); } catch (e) { return out; }
  for (const c of map.courses || []) {
    for (const u of c.units || []) {
      for (const code of u.standards || []) {
        if (!out.byCode.has(code)) out.byCode.set(code, []);
        out.byCode.get(code).push({ course: c.id, unit: u.id, grades: c.grades || [] });
        const p = S.codeParts(code);
        if (!p) continue;
        if (!out.byPrefix.has(p.prefix)) out.byPrefix.set(p.prefix, new Map());
        out.byPrefix.get(p.prefix).set(c.id, c.grades || []);
      }
    }
  }
  return out;
}
const bandGrades = (code) => { const p = S.codeParts(code); return p ? S.BANDS[p.band] || [] : []; };
const meets = (a, b) => a.some((g) => b.includes(g));

/* ---------- 판정 ---------- */

const squashName = (s) => String(s || '').replace(/\s+/g, '');
const listShort = (arr, n) => arr.slice(0, n || 3).join(', ') + (arr.length > (n || 3) ? ' 외 ' + (arr.length - (n || 3)) + '개' : '');

// → { ok, reasons: [사람이 읽을 까닭], diff, grades: { code: [이 사이트에서 이 변화가 닿는 학년] } }
//   o: { notice, volume, doc: { url, name, title, parsed }, registry(사슬의 마지막 판), others: { v: registry }, pending: [앞선 고시 번호],
//        later: [먼저 기록된 뒤 고시 번호], manualFile, map(mapIndex), cross(crossCheck 결과), requireCross(기본 true) }
function assess(o) {
  const reasons = [];
  const n = o.notice || {};
  const doc = o.doc || {};
  const p = doc.parsed || { standards: [], issues: ['읽은 결과가 없어요'] };
  const prev = o.registry;
  // 출처
  if (!prev) reasons.push('이 별책의 기준 성취기준 자료(curriculum/standards/v' + o.volume + '.json)가 없어요');
  if (o.manualFile ? !isManualSourceUrl(doc.url) : !isOfficialUrl(doc.url)) {
    reasons.push('공식 기관(국가교육위원회·교육부·국가법령정보센터' + (o.manualFile ? '·국가교육과정정보센터' : '') + ') 주소에서 받은 파일이 아니에요');
  }
  if (isDraft(doc.name, doc.title, doc.archive)) reasons.push('행정예고본·신구대비표 같은 확정 전 문서예요');
  if (p.volume !== o.volume || p.notice !== n.no) {
    reasons.push('문서 머리의 고시 번호·별책 번호(' + (p.notice || '없음') + ' [별책 ' + (p.volume || '?') + '])가 ' + n.no + ' [별책 ' + o.volume + ']와 달라요');
  }
  // 읽기
  if (p.issues && p.issues.length) reasons.push('문서 구조를 확실히 읽지 못했어요: ' + p.issues.slice(0, 3).join(' / ') + (p.issues.length > 3 ? ' 외 ' + (p.issues.length - 3) + '건' : ''));
  if (p.standards && p.standards.some((s) => !s.course)) reasons.push('어느 과목인지 알 수 없는 성취기준이 있어요');
  if (prev && Array.isArray(prev.courses) && prev.courses.length && Array.isArray(p.courses)) {
    const before = prev.courses.map((c) => squashName(c.name)).filter(Boolean);
    const after = p.courses.map((c) => squashName(c.name)).filter(Boolean);
    const gone = prev.courses.filter((c) => c.name && !after.includes(squashName(c.name))).map((c) => c.name);
    const added = p.courses.filter((c) => c.name && !before.includes(squashName(c.name))).map((c) => c.name);
    if (gone.length) reasons.push('앞 판에 있던 과목이 문서에서 빠졌어요(일부만 읽었거나 과목이 없어졌어요): ' + listShort(gone));
    if (added.length) reasons.push('새 과목이 생겼어요 — 이 사이트의 어느 과정에 넣을지 사람이 정해야 해요: ' + listShort(added));
  }
  // 시행
  if (!Array.isArray(n.effective) || !n.effective.length) reasons.push('고시의 학년별 시행일을 읽지 못했어요');
  if (o.requireCross !== false && (!o.cross || o.cross.status !== 'same')) {
    reasons.push('두 공식 경로(국가교육위원회·국가법령정보센터)에서 같은 고시·시행일을 아직 확인하지 못했어요' + (o.cross && o.cross.note ? '(' + o.cross.note + ')' : ''));
  }
  // 차례
  if (o.pending && o.pending.length) reasons.push('앞선 고시(' + o.pending.join(', ') + ')의 같은 별책 변경이 아직 확인되지 않았어요');
  if (o.later && o.later.length) reasons.push('뒤에 나온 고시(' + o.later.join(', ') + ')가 이 별책에 이미 기록돼 있어요(차례가 어긋나요)');

  let diff = null;
  const grades = {};
  if (prev && p.standards && p.standards.length) {
    const next = {};
    const info = {};
    for (const s of p.standards) { next[s.code] = s.text; info[s.code] = s; }
    diff = S.diffStandards(textMap(prev), next);
    const base = Object.keys(prev.standards || {}).length;
    // 양
    if (base >= LIMITS.smallBase) {
      if (diff.removed.length > base * LIMITS.removed) reasons.push('빠진 성취기준이 ' + diff.removed.length + '개로 너무 많아요(전면 개편일 수 있어요)');
      if (diff.changed.length > base * LIMITS.changed) reasons.push('바뀐 성취기준이 ' + diff.changed.length + '개로 너무 많아요(전면 개편일 수 있어요)');
      if (diff.added.length > base * LIMITS.added) reasons.push('새 성취기준이 ' + diff.added.length + '개로 너무 많아요(전면 개편일 수 있어요)');
    }
    const far = diff.changed.filter((c) => c.sim < LIMITS.minSimilarity);
    if (far.length) reasons.push('같은 코드인데 문장이 크게 달라진 성취기준이 ' + far.length + '개 있어요(뜻이 바뀌었을 수 있어요): ' + listShort(far.map((c) => c.code)));
    // 코드: 새 과목 약어 · 같은 코드의 과목·영역·학년군 · 다른 별책과 겹침
    const prefixes = new Set(Object.keys(prev.standards || {}).map((c) => (S.codeParts(c) || {}).prefix));
    const newPrefix = [...new Set(diff.added.map((x) => (S.codeParts(x.code) || {}).prefix).filter((x) => x && !prefixes.has(x)))];
    if (newPrefix.length) reasons.push('앞 판에 없던 코드 앞부분(새 과목 약어)이 있어요: ' + listShort(newPrefix));
    const moved = [];
    for (const code of Object.keys(next)) {
      const a = prev.standards[code];
      const b = info[code];
      if (!a) continue;
      if ((a.c && squashName(a.c) !== squashName(b.course)) || (a.a && squashName(a.a) !== squashName(b.area)) || (a.b && squashName(a.b) !== squashName(b.band))) moved.push(code);
    }
    if (moved.length) reasons.push('같은 코드의 과목·영역·학년군이 앞 판과 달라요(짜임이 바뀌었거나 잘못 읽었어요): ' + listShort(moved));
    const clash = [];
    for (const s of diff.added) {
      for (const v of Object.keys(o.others || {})) {
        if (Number(v) !== o.volume && o.others[v].standards && o.others[v].standards[s.code]) clash.push(s.code + '(별책 ' + v + ')');
      }
    }
    if (clash.length) reasons.push('다른 별책의 성취기준 코드와 겹쳐요: ' + listShort(clash));
    // 학년: 바뀐 코드의 학년군 ↔ 그 코드를 쓰는 이 사이트 과정의 학년 / 시행: 그 학년들의 시행일
    const map = o.map || { byCode: new Map(), byPrefix: new Map() };
    const wrong = [];
    const need = new Set();
    for (const x of diff.added.concat(diff.removed, diff.changed)) {
      const band = bandGrades(x.code);
      let targets = (map.byCode.get(x.code) || []).map((r) => ({ course: r.course, grades: r.grades }));
      if (!targets.length) {
        const pre = map.byPrefix.get((S.codeParts(x.code) || {}).prefix);
        if (pre) {
          const all = [...pre].map(([course, g]) => ({ course, grades: g }));
          targets = all.filter((t) => meets(t.grades, band));
          if (!targets.length) wrong.push(x.code + '(학년군 ' + band.join('·') + ' ↔ 과정 ' + all.map((t) => t.course).join('·') + ')');
        }
      } else {
        for (const t of targets) if (!meets(t.grades, band)) wrong.push(x.code + '(학년군 ' + band.join('·') + ' ↔ ' + t.course + ' ' + t.grades.join('·') + ')');
      }
      const gs = [...new Set([].concat(...targets.map((t) => t.grades.filter((g) => band.includes(g)))))];
      if (gs.length) { grades[x.code] = gs; gs.forEach((g) => need.add(g)); }
    }
    if (wrong.length) reasons.push('바뀐 성취기준의 학년군이 그 코드를 쓰는 과정의 학년과 맞지 않아요(다른 학년에 잘못 붙을 수 있어요): ' + listShort(wrong));
    const have = new Set([].concat(...(n.effective || []).map((e) => e.grades || [])));
    const missing = [...need].filter((g) => !have.has(g));
    if (missing.length) reasons.push('바뀌는 과정의 학년 중 고시에 시행일이 없는 학년이 있어요: ' + missing.join(', '));
  } else if (prev) {
    reasons.push('성취기준을 하나도 읽지 못했어요');
  }
  return { ok: reasons.length === 0, reasons, diff, grades };
}

// 확인된 판의 상태: 이 고시의 학년별 시행일 가운데 오늘(at) 뒤가 남아 있으면 scheduled, 모두 지났으면 active
function phaseOf(effective, today) {
  const dates = (effective || []).map((e) => e.date).filter(Boolean);
  return dates.length && dates.every((d) => d <= today) ? 'active' : 'scheduled';
}

/* ---------- 적용 · 기록 · 되돌리기 ---------- */

function stampOf(at) { return String(at).replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z').replace('T', '-'); }
function logFile(curDir) { return path.join(curDir, 'history', 'standards-log.json'); }
function readLog(curDir) {
  const f = logFile(curDir);
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : { note: '성취기준 자동 반영·되돌리기 기록(scripts/lib/revision.js). 보관본은 같은 폴더의 standards/ 아래.', entries: [] };
}
function appendLog(curDir, entry) {
  const log = readLog(curDir);
  log.entries.push(entry);
  writeJson(logFile(curDir), log);
}

// 고친 판 기록(기준 자료는 그대로, 앞 판 보관·해시) → { snapshot(상대 경로), counts, version: { file, sha256 }, prev: { file, sha256 }, dataHash: { before, after } }
//   o: { curDir, notice, volume, doc: { url, name, archive?, sha256, bytes, parsed }, diff, at(ISO 시각), status }
function applyVolume(o) {
  const stdDir = path.join(o.curDir, 'standards');
  const at = o.at || new Date().toISOString();
  const vf = versionFile(stdDir, o.volume, o.notice.id);
  if (fs.existsSync(vf)) throw new Error('이미 기록된 판이에요(겹쳐 쓰지 않아요): ' + rel(o.curDir, vf));
  const head = chainHead(stdDir, o.volume);
  const snapName = stampOf(at) + '-' + o.notice.id + '-v' + o.volume;
  const snapDir = path.join(o.curDir, 'history', 'standards', snapName);
  const tracked = [rel(o.curDir, vf)].concat(head ? [rel(o.curDir, head.file)] : []);
  const before = {};
  for (const r of tracked) before[r] = fileSha(path.join(o.curDir, r));
  const hashBefore = dataHash(o.curDir);
  fs.mkdirSync(snapDir, { recursive: true });
  if (head) fs.copyFileSync(head.file, path.join(snapDir, path.basename(head.file))); // 비교한 앞 판(바뀌지 않지만 보관)
  const counts = { added: o.diff.added.length, removed: o.diff.removed.length, changed: o.diff.changed.length };
  const source = { url: o.doc.url, file: o.doc.name, archive: o.doc.archive || undefined, sha256: o.doc.sha256, bytes: o.doc.bytes };
  const ver = toRegistry(o.doc.parsed, {
    volume: o.volume,
    name: head && head.data ? head.data.name : null,
    notice: o.notice.no,
    prev: head && head.data ? head.data.notice : undefined,
    source,
  });
  const out = Object.assign({
    volume: ver.volume, name: ver.name, notice: ver.notice, noticeId: o.notice.id,
    noticeDate: o.notice.date, discovered: o.notice.discovered || todayOf(at), verified: todayOf(at),
    effective: o.notice.effective || [],
    prev: head ? { notice: head.data.notice, file: rel(o.curDir, head.file), sha256: before[rel(o.curDir, head.file)] } : null,
    contentSha256: contentHash(ver.standards),
  }, { source: ver.source, parser: ver.parser, count: ver.count, courses: ver.courses, standards: ver.standards });
  writeJson(vf, out);
  const after = {};
  for (const r of tracked) after[r] = fileSha(path.join(o.curDir, r));
  const hashAfter = dataHash(o.curDir);
  writeJson(path.join(snapDir, 'manifest.json'), {
    at, notice: o.notice.no, id: o.notice.id, volume: o.volume, status: o.status,
    creates: [rel(o.curDir, vf)], restores: [], before, after, dataHash: { before: hashBefore, after: hashAfter },
    source: { url: o.doc.url, file: o.doc.name, archive: o.doc.archive || undefined, sha256: o.doc.sha256 },
    counts,
  });
  const snapshot = rel(o.curDir, snapDir);
  const version = { file: rel(o.curDir, vf), sha256: after[rel(o.curDir, vf)] };
  const prevInfo = head ? { file: rel(o.curDir, head.file), sha256: before[rel(o.curDir, head.file)] } : null;
  appendLog(o.curDir, {
    at, action: 'apply', id: o.notice.id, notice: o.notice.no, volume: o.volume, status: o.status,
    source: o.doc.url, file: o.doc.name, counts, snapshot, version, prev: prevInfo, dataHash: { before: hashBefore, after: hashAfter },
  });
  return { snapshot, counts, version, prev: prevInfo, dataHash: { before: hashBefore, after: hashAfter } };
}

// 되돌리기 → { ok, restored: [파일], notice, volume, dataHash } — 해시로 기록 직후 그대로인지 먼저 보고, 되돌린 뒤 기록 전 해시와 같은지 확인한다.
// notices.json 의 그 별책은 "수동 확인 필요(되돌림)"로(다음 확인 때 다시 자동 기록하지 않는다)
function rollback(o) {
  const curDir = o.curDir;
  const log = readLog(curDir);
  const applied = log.entries.filter((e) => e.action === 'apply' && !log.entries.some((r) => r.action === 'rollback' && r.snapshot === e.snapshot));
  const target = o.snapshot ? applied.find((e) => e.snapshot === o.snapshot || e.snapshot.endsWith('/' + o.snapshot)) : applied[applied.length - 1];
  if (!target) return { ok: false, error: o.snapshot ? '되돌릴 보관본을 찾지 못했어요: ' + o.snapshot : '되돌릴 자동 반영 기록이 없어요' };
  // 같은 별책을 그 뒤에 또 바꾼 기록이 있으면 순서대로(최근 것부터) 되돌려야 한다
  const later = applied.filter((e) => e.volume === target.volume && e.at > target.at);
  if (later.length) return { ok: false, error: '같은 별책을 그 뒤에 또 바꿨어요. 먼저 되돌리세요: ' + later.map((e) => e.snapshot).join(', ') };
  const snapDir = path.join(curDir, target.snapshot);
  const man = JSON.parse(fs.readFileSync(path.join(snapDir, 'manifest.json'), 'utf8'));
  // 기록 직후 그대로인가(사람이 그 뒤에 고쳤으면 덮어쓰지 않는다)
  const changedSince = Object.keys(man.after || {}).filter((r) => fileSha(path.join(curDir, r)) !== man.after[r]);
  if (changedSince.length) return { ok: false, error: '기록 뒤에 파일이 바뀌어 자동으로 되돌리지 않았어요(직접 확인하세요): ' + changedSince.join(', ') };
  const hashBefore = dataHash(curDir);
  const restored = [];
  for (const r of man.creates || []) {
    const f = path.join(curDir, r);
    if (fs.existsSync(f)) { fs.unlinkSync(f); restored.push(r + ' (지움)'); }
  }
  for (const r of man.restores || []) { // 예전 꼴(기준 자료를 바꿨던 기록)
    fs.copyFileSync(path.join(snapDir, path.basename(r)), path.join(curDir, r));
    restored.push(r);
  }
  for (const r of man.removesIfMissing || []) {
    const f = path.join(curDir, r);
    if (fs.existsSync(f)) { fs.unlinkSync(f); restored.push(r + ' (지움)'); }
  }
  const mismatch = Object.keys(man.before || {}).filter((r) => fileSha(path.join(curDir, r)) !== man.before[r]);
  if (mismatch.length) return { ok: false, error: '되돌린 뒤 파일이 기록 전과 달라요(직접 확인하세요): ' + mismatch.join(', '), restored };
  // notices.json: 이 별책을 되돌림 상태로
  const nf = path.join(curDir, 'notices.json');
  if (fs.existsSync(nf)) {
    const store = JSON.parse(fs.readFileSync(nf, 'utf8'));
    const n = (store.notices || []).find((x) => x.id === target.id);
    if (n && n.analysis && n.analysis.volumes && n.analysis.volumes[target.volume]) {
      const v = n.analysis.volumes[target.volume];
      n.analysis.volumes[target.volume] = { status: 'manual', reasons: ['사람이 자동 반영을 되돌렸어요(' + todayOf(o.at) + ')'], rolledBack: true, source: v.source };
      n.analysis.status = summarizeStatus(n.analysis.volumes);
      writeJson(nf, store);
      restored.push('notices.json (' + target.id + ' 별책 ' + target.volume + ' → 수동 확인 필요)');
    }
  }
  const hashAfter = dataHash(curDir);
  appendLog(curDir, { at: o.at || new Date().toISOString(), action: 'rollback', id: target.id, notice: target.notice, volume: target.volume, snapshot: target.snapshot, dataHash: { before: hashBefore, after: hashAfter } });
  return { ok: true, restored, notice: target.notice, volume: target.volume, snapshot: target.snapshot, dataHash: { before: hashBefore, after: hashAfter } };
}

// 별책 하나 판정(+ 통과하면 기록) → notices.json 의 analysis.volumes[v] 에 넣을 기록
//   o: { curDir, store(notices.json 내용), notice, volume, docs: [후보 문서(buf 포함)], apply, at, cross(crossCheck 결과), requireCross, manualFile, map }
//   이미 같은 고시·별책 판이 있으면: 같은 원문·같은 내용이면 그 기록 그대로(already), 다르면 겹쳐 쓰지 않고 수동 확인
function judgeVolume(o) {
  const stdDir = path.join(o.curDir, 'standards');
  const head = chainHead(stdDir, o.volume);
  const registry = head ? head.data : null;
  const others = loadRegistries(stdDir);
  const map = o.map || mapIndex(o.curDir);
  const today = todayOf(o.at);
  const list = (o.store && o.store.notices) || [];
  const volOf = (x) => x.analysis && x.analysis.volumes && x.analysis.volumes[o.volume];
  const pending = list.filter((x) => x.id !== o.notice.id && x.date < o.notice.date && volOf(x) && volOf(x).status === 'manual').map((x) => x.no);
  const later = loadVersions(stdDir, o.volume).filter((x) => x.data.noticeId !== o.notice.id && String(x.data.noticeDate) > String(o.notice.date)).map((x) => x.data.notice);
  const existing = fs.existsSync(versionFile(stdDir, o.volume, o.notice.id)) ? JSON.parse(fs.readFileSync(versionFile(stdDir, o.volume, o.notice.id), 'utf8')) : null;
  const tried = [];
  let best = null;
  for (const d of o.docs || []) {
    const parsed = d.parsed || readDoc(d.name, d.buf);
    const doc = Object.assign({}, d, { parsed });
    const a = existing ?
      { ok: false, reasons: [], diff: null, grades: {} } :
      assess({ notice: o.notice, volume: o.volume, doc, registry, others, pending, later, manualFile: o.manualFile, map, cross: o.cross, requireCross: o.requireCross });
    tried.push({ file: d.name, url: d.url, ok: a.ok, reasons: a.reasons });
    // 머리가 이 고시·별책인 문서를 고른다(다른 별책·다른 고시 문서는 후보에서 뺀다)
    if (parsed.volume === o.volume && parsed.notice === o.notice.no) { best = { doc, a }; if (a.ok) break; }
  }
  const source = (x) => ({ url: x.url, file: x.name, archive: x.archive || undefined, sha256: x.sha256 });
  if (existing) {
    // 같은 고시를 또 찾았다: 같은 원문(파일 해시)이거나 같은 내용(성취기준 해시)이면 아무것도 바꾸지 않는다
    const same = best && (best.doc.sha256 === (existing.source || {}).sha256 ||
      contentHash(toRegistry(best.doc.parsed, { volume: o.volume, notice: o.notice.no }).standards) === existing.contentSha256);
    const cur = volOf(list.find((x) => x.id === o.notice.id) || {});
    if ((same || !best) && cur && VERIFIED.includes(cur.status)) return Object.assign({}, cur, { already: true });
    if (same || !best) return { status: 'manual', reasons: ['판 파일은 있는데 기록 상태(' + (cur ? cur.status : '없음') + ')와 맞지 않아요 — 사람이 확인해야 해요'], conflict: true };
    return { status: 'manual', reasons: ['같은 고시·별책의 판이 이미 다른 원문으로 기록돼 있어요 — 겹쳐 쓰지 않았어요(' + rel(o.curDir, versionFile(stdDir, o.volume, o.notice.id)) + ')'], source: source(best.doc), conflict: true };
  }
  if (!best) {
    const heads = [...new Set((o.docs || []).map((d) => {
      const p = d.parsed || readDoc(d.name, d.buf);
      return (p.notice || '고시 번호 없음') + ' [별책 ' + (p.volume || '?') + ']';
    }))];
    const why = (o.docs || []).length ?
      '받은 파일 ' + o.docs.length + '개 중 머리에 "' + o.notice.no + ' [별책 ' + o.volume + ']"이 있는 확정 원문이 없어요(받은 파일의 머리: ' + heads.join(', ') + ')' :
      '공식 경로에서 이 별책의 확정 원문 파일을 찾지 못했어요(고시 전문은 국가교육과정정보센터에 실리지만, 그곳은 robots.txt 로 자동 접근을 막고 있어요)';
    return { status: 'manual', reasons: [why], tried: tried.length ? tried : undefined };
  }
  if (!best.a.ok) return { status: 'manual', reasons: best.a.reasons, source: source(best.doc), tried };
  const d = best.a.diff;
  const empty = !d.added.length && !d.removed.length && !d.changed.length;
  if (empty) return { status: 'unchanged', source: source(best.doc), noticeDate: o.notice.date, verified: today };
  const status = phaseOf(o.notice.effective, today);
  const nextReg = toRegistry(best.doc.parsed, { volume: o.volume, notice: o.notice.no });
  const rec = {
    status, noticeDate: o.notice.date, discovered: o.notice.discovered || today, verified: today, effective: o.notice.effective,
    source: source(best.doc),
    changes: changeList(d, { prev: registry, next: nextReg }, best.a.grades),
    counts: { added: d.added.length, removed: d.removed.length, changed: d.changed.length },
  };
  if (o.apply !== false) {
    const r = applyVolume({ curDir: o.curDir, notice: o.notice, volume: o.volume, doc: best.doc, diff: d, at: o.at, status });
    rec.snapshot = r.snapshot;
    rec.version = r.version;
    rec.prev = r.prev;
    rec.dataHash = r.dataHash;
  }
  return rec;
}

// 시간이 지나 모든 학년의 시행일이 지나면 scheduled → active (매주 확인이 부른다). 바뀌면 true
function refreshStatus(rec, today) {
  if (!rec || rec.status !== 'scheduled') return false;
  if (phaseOf(rec.effective, today) !== 'active') return false;
  rec.status = 'active';
  rec.activated = today;
  return true;
}

function summarizeStatus(volumes) {
  const st = Object.keys(volumes || {}).map((k) => volumes[k].status);
  if (!st.length) return 'none';
  if (st.includes('manual')) return 'manual';
  if (st.includes('scheduled')) return 'scheduled';
  if (st.some((s) => s === 'active' || s === 'applied')) return 'active';
  return 'unchanged';
}

// 변경 목록(보여 줄 꼴): 문장까지 담는다. grades: 이 사이트에서 이 변화가 닿는 학년(학년군 ∩ 과정 학년)
function changeList(diff, reg, grades) {
  const info = (code, r) => {
    const e = r && r.standards && r.standards[code];
    const out = e ? { course: e.c || null, band: e.b || null } : {};
    if (grades && grades[code]) out.grades = grades[code];
    return out;
  };
  return {
    added: diff.added.map((x) => Object.assign({ code: x.code, text: x.text }, info(x.code, reg.next))),
    removed: diff.removed.map((x) => Object.assign({ code: x.code, text: x.text }, info(x.code, reg.prev))),
    changed: diff.changed.map((x) => Object.assign({ code: x.code, from: x.from, to: x.to }, info(x.code, reg.next))),
  };
}

module.exports = {
  PARSER, VERIFIED, OFFICIAL, DRAFT, LIMITS, MANUAL_LABEL,
  isOfficialUrl, isManualSourceUrl, isDraft, sha256, zipName, expandFiles, readDoc, volumeOfName,
  registryFile, loadRegistry, loadRegistries, textMap, toRegistry, writeJson,
  versionsDir, versionFile, loadVersions, chainHead, fileSha, contentHash, dataHash, mapIndex, phaseOf,
  assess, applyVolume, rollback, readLog, summarizeStatus, refreshStatus, changeList, judgeVolume,
};
