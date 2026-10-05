/* 교육과정 별책(성취기준) 자동 반영 — 판정 · 적용(백업) · 되돌리기
 *
 * 기준 자료: curriculum/standards/v<별책>.json — 공식 별책 원문에서 규칙으로 뽑은 성취기준(코드 → 문장·과목·영역·학년군)
 *   { volume, name, notice, prev?, source: { url, file, archive?, sha256, bytes }, parser, count, courses, standards: { 코드: { t, c, a, b } } }
 *
 * 새 고시가 어떤 별책을 고쳤으면, 그 별책의 확정 원문을 공식 경로에서 받아 같은 규칙으로 읽고 기준 자료와 비교한다(추가·삭제·변경).
 * 아래 조건을 하나도 어기지 않을 때만 자동 반영한다. 하나라도 어기면 기존 자료를 그대로 두고 "수동 확인 필요"로 남긴다.
 *   1) 공식 기관(https) 주소에서 받은 파일   2) 행정예고본·신구대비표 같은 확정 전 문서가 아님
 *   3) 문서 머리의 고시 번호·별책 번호가 이 고시와 같음   4) 문서 구조를 남김없이 읽음(parseStandards 의 issues 없음)
 *   5) 앞선 고시의 같은 별책 변경이 확인되지 않은 채 남아 있지 않음   6) 바뀐 양이 전면 개편 수준이 아님
 *   7) 같은 코드인데 문장이 크게 달라진 것(뜻이 바뀌었을 수 있음)이 없음   8) 다른 별책 코드와 겹치지 않음
 *   9) 모든 성취기준의 과목을 앎   10) 고시의 학년별 시행일을 읽었음
 * 적용 전에는 바뀔 파일을 curriculum/history/standards/<시각>-<고시>-v<별책>/ 에 보관하고, curriculum/history/standards-log.json 에 기록한다.
 * 되돌리기(rollback)는 보관본으로 기준 자료를 되돌리고 그 별책을 "수동 확인 필요(되돌림)"로 바꾼다 — 다음 확인 때 다시 자동 적용하지 않는다.
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

/* ---------- 판정 ---------- */

// → { ok, reasons: [사람이 읽을 까닭], diff }
//   o: { notice, volume, doc: { url, name, title, parsed }, registry, others: { v: registry }, pending: [앞선 고시 번호] }
function assess(o) {
  const reasons = [];
  const n = o.notice || {};
  const doc = o.doc || {};
  const p = doc.parsed || { standards: [], issues: ['읽은 결과가 없어요'] };
  if (!o.registry) reasons.push('이 별책의 기준 성취기준 자료(curriculum/standards/v' + o.volume + '.json)가 없어요');
  if (o.manualFile ? !isManualSourceUrl(doc.url) : !isOfficialUrl(doc.url)) {
    reasons.push('공식 기관(국가교육위원회·교육부·국가법령정보센터' + (o.manualFile ? '·국가교육과정정보센터' : '') + ') 주소에서 받은 파일이 아니에요');
  }
  if (isDraft(doc.name, doc.title, doc.archive)) reasons.push('행정예고본·신구대비표 같은 확정 전 문서예요');
  if (p.volume !== o.volume || p.notice !== n.no) {
    reasons.push('문서 머리의 고시 번호·별책 번호(' + (p.notice || '없음') + ' [별책 ' + (p.volume || '?') + '])가 ' + n.no + ' [별책 ' + o.volume + ']와 달라요');
  }
  if (p.issues && p.issues.length) reasons.push('문서 구조를 확실히 읽지 못했어요: ' + p.issues.slice(0, 3).join(' / ') + (p.issues.length > 3 ? ' 외 ' + (p.issues.length - 3) + '건' : ''));
  if (o.pending && o.pending.length) reasons.push('앞선 고시(' + o.pending.join(', ') + ')의 같은 별책 변경이 아직 확인되지 않았어요');
  if (!Array.isArray(n.effective) || !n.effective.length) reasons.push('고시의 학년별 시행일을 읽지 못했어요');
  if (p.standards && p.standards.some((s) => !s.course)) reasons.push('어느 과목인지 알 수 없는 성취기준이 있어요');

  let diff = null;
  if (o.registry && p.standards && p.standards.length) {
    const next = {};
    for (const s of p.standards) next[s.code] = s.text;
    diff = S.diffStandards(textMap(o.registry), next);
    const base = Object.keys(o.registry.standards || {}).length;
    if (base >= LIMITS.smallBase) {
      if (diff.removed.length > base * LIMITS.removed) reasons.push('빠진 성취기준이 ' + diff.removed.length + '개로 너무 많아요(전면 개편일 수 있어요)');
      if (diff.changed.length > base * LIMITS.changed) reasons.push('바뀐 성취기준이 ' + diff.changed.length + '개로 너무 많아요(전면 개편일 수 있어요)');
      if (diff.added.length > base * LIMITS.added) reasons.push('새 성취기준이 ' + diff.added.length + '개로 너무 많아요(전면 개편일 수 있어요)');
    }
    const far = diff.changed.filter((c) => c.sim < LIMITS.minSimilarity);
    if (far.length) reasons.push('같은 코드인데 문장이 크게 달라진 성취기준이 ' + far.length + '개 있어요(뜻이 바뀌었을 수 있어요): ' + far.slice(0, 3).map((c) => c.code).join(', '));
    const clash = [];
    for (const s of diff.added) {
      for (const v of Object.keys(o.others || {})) {
        if (Number(v) !== o.volume && o.others[v].standards && o.others[v].standards[s.code]) clash.push(s.code + '(별책 ' + v + ')');
      }
    }
    if (clash.length) reasons.push('다른 별책의 성취기준 코드와 겹쳐요: ' + clash.slice(0, 3).join(', '));
    if (!diff.added.length && !diff.removed.length && !diff.changed.length) {
      // 문장이 하나도 안 바뀐 별책(총론·해설만 고친 경우) — 반영할 것이 없을 뿐 문제는 아니다
    }
  } else if (o.registry) {
    reasons.push('성취기준을 하나도 읽지 못했어요');
  }
  return { ok: reasons.length === 0, reasons, diff };
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

// 기준 자료 바꾸기(적용 전 보관) → { snapshot(상대 경로), counts }
//   o: { curDir, notice, volume, doc: { url, name, archive?, sha256, bytes, parsed }, diff, at(ISO 시각) }
function applyVolume(o) {
  const stdDir = path.join(o.curDir, 'standards');
  const at = o.at || new Date().toISOString();
  const snapName = stampOf(at) + '-' + o.notice.id + '-v' + o.volume;
  const snapDir = path.join(o.curDir, 'history', 'standards', snapName);
  const regFile = registryFile(stdDir, o.volume);
  const prev = fs.existsSync(regFile) ? JSON.parse(fs.readFileSync(regFile, 'utf8')) : null;
  fs.mkdirSync(snapDir, { recursive: true });
  if (prev) fs.copyFileSync(regFile, path.join(snapDir, path.basename(regFile)));
  const counts = { added: o.diff.added.length, removed: o.diff.removed.length, changed: o.diff.changed.length };
  writeJson(path.join(snapDir, 'manifest.json'), {
    at, notice: o.notice.no, id: o.notice.id, volume: o.volume,
    restores: prev ? ['standards/' + path.basename(regFile)] : [],
    removesIfMissing: prev ? [] : ['standards/' + path.basename(regFile)],
    source: { url: o.doc.url, file: o.doc.name, archive: o.doc.archive || undefined, sha256: o.doc.sha256 },
    counts,
  });
  const reg = toRegistry(o.doc.parsed, {
    volume: o.volume,
    name: prev ? prev.name : null,
    notice: o.notice.no,
    prev: prev ? prev.notice : undefined,
    source: { url: o.doc.url, file: o.doc.name, archive: o.doc.archive || undefined, sha256: o.doc.sha256, bytes: o.doc.bytes },
  });
  writeJson(regFile, reg);
  const snapshot = path.relative(o.curDir, snapDir).split(path.sep).join('/');
  appendLog(o.curDir, { at, action: 'apply', id: o.notice.id, notice: o.notice.no, volume: o.volume, source: o.doc.url, file: o.doc.name, counts, snapshot });
  return { snapshot, counts };
}

// 보관본으로 되돌리기 → { ok, restored: [파일], notice, volume } — notices.json 의 그 별책은 "수동 확인 필요(되돌림)"로
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
  const restored = [];
  for (const rel of man.restores || []) {
    fs.copyFileSync(path.join(snapDir, path.basename(rel)), path.join(curDir, rel));
    restored.push(rel);
  }
  for (const rel of man.removesIfMissing || []) {
    const f = path.join(curDir, rel);
    if (fs.existsSync(f)) { fs.unlinkSync(f); restored.push(rel + ' (지움)'); }
  }
  // notices.json: 이 별책을 되돌림 상태로
  const nf = path.join(curDir, 'notices.json');
  if (fs.existsSync(nf)) {
    const store = JSON.parse(fs.readFileSync(nf, 'utf8'));
    const n = (store.notices || []).find((x) => x.id === target.id);
    if (n && n.analysis && n.analysis.volumes && n.analysis.volumes[target.volume]) {
      const v = n.analysis.volumes[target.volume];
      n.analysis.volumes[target.volume] = { status: 'manual', reasons: ['사람이 자동 반영을 되돌렸어요(' + (o.at || new Date().toISOString()).slice(0, 10) + ')'], rolledBack: true, source: v.source };
      n.analysis.status = summarizeStatus(n.analysis.volumes);
      writeJson(nf, store);
      restored.push('notices.json (' + target.id + ' 별책 ' + target.volume + ' → 수동 확인 필요)');
    }
  }
  appendLog(curDir, { at: o.at || new Date().toISOString(), action: 'rollback', id: target.id, notice: target.notice, volume: target.volume, snapshot: target.snapshot });
  return { ok: true, restored, notice: target.notice, volume: target.volume, snapshot: target.snapshot };
}

// 별책 하나 판정(+ 통과하면 적용) → notices.json 의 analysis.volumes[v] 에 넣을 기록
//   o: { curDir, store(notices.json 내용), notice, volume, docs: [후보 문서(buf 포함)], apply, at, extraReasons }
function judgeVolume(o) {
  const stdDir = path.join(o.curDir, 'standards');
  const registry = loadRegistry(stdDir, o.volume);
  const others = loadRegistries(stdDir);
  const pending = ((o.store && o.store.notices) || [])
    .filter((x) => x.id !== o.notice.id && x.date < o.notice.date && x.analysis && x.analysis.volumes && x.analysis.volumes[o.volume] && x.analysis.volumes[o.volume].status === 'manual')
    .map((x) => x.no);
  const tried = [];
  let best = null;
  for (const d of o.docs || []) {
    const parsed = d.parsed || readDoc(d.name, d.buf);
    const doc = Object.assign({}, d, { parsed });
    const a = assess({ notice: o.notice, volume: o.volume, doc, registry, others, pending, manualFile: o.manualFile });
    if (o.extraReasons && o.extraReasons.length) { a.reasons = a.reasons.concat(o.extraReasons); a.ok = false; }
    tried.push({ file: d.name, url: d.url, ok: a.ok, reasons: a.reasons });
    // 머리가 이 고시·별책인 문서를 고른다(다른 별책·다른 고시 문서는 후보에서 뺀다)
    if (parsed.volume === o.volume && parsed.notice === o.notice.no) { best = { doc, a }; if (a.ok) break; }
  }
  const source = (x) => ({ url: x.url, file: x.name, archive: x.archive || undefined, sha256: x.sha256 });
  if (!best) {
    const why = (o.docs || []).length ?
      '받은 파일 ' + o.docs.length + '개 중 머리에 "' + o.notice.no + ' [별책 ' + o.volume + ']"이 있는 확정 원문이 없어요' :
      '공식 경로에서 이 별책의 확정 원문 파일을 찾지 못했어요(고시 전문은 국가교육과정정보센터에 실리지만, 그곳은 robots.txt 로 자동 접근을 막고 있어요)';
    return { status: 'manual', reasons: [why].concat(o.extraReasons || []), tried: tried.length ? tried : undefined };
  }
  if (!best.a.ok) return { status: 'manual', reasons: best.a.reasons, source: source(best.doc), tried };
  const d = best.a.diff;
  const empty = !d.added.length && !d.removed.length && !d.changed.length;
  const rec = { status: empty ? 'unchanged' : 'applied', source: source(best.doc) };
  if (!empty) {
    const nextReg = toRegistry(best.doc.parsed, { volume: o.volume, notice: o.notice.no });
    rec.changes = changeList(d, { prev: registry, next: nextReg });
    rec.counts = { added: d.added.length, removed: d.removed.length, changed: d.changed.length };
    if (o.apply !== false) rec.snapshot = applyVolume({ curDir: o.curDir, notice: o.notice, volume: o.volume, doc: best.doc, diff: d, at: o.at }).snapshot;
  }
  return rec;
}

function summarizeStatus(volumes) {
  const st = Object.keys(volumes || {}).map((k) => volumes[k].status);
  if (!st.length) return 'none';
  if (st.includes('manual')) return 'manual';
  if (st.every((s) => s === 'unchanged')) return 'unchanged';
  return 'applied';
}

// 변경 목록(보여 줄 꼴): 문장까지 담는다
function changeList(diff, reg) {
  const info = (code, r) => {
    const e = r && r.standards && r.standards[code];
    return e ? { course: e.c || null, band: e.b || null } : {};
  };
  return {
    added: diff.added.map((x) => Object.assign({ code: x.code, text: x.text }, info(x.code, reg.next))),
    removed: diff.removed.map((x) => Object.assign({ code: x.code, text: x.text }, info(x.code, reg.prev))),
    changed: diff.changed.map((x) => Object.assign({ code: x.code, from: x.from, to: x.to }, info(x.code, reg.next))),
  };
}

module.exports = {
  PARSER, OFFICIAL, DRAFT, LIMITS, MANUAL_LABEL,
  isOfficialUrl, isManualSourceUrl, isDraft, sha256, zipName, expandFiles, readDoc, volumeOfName,
  registryFile, loadRegistry, loadRegistries, textMap, toRegistry, writeJson,
  assess, applyVolume, rollback, readLog, summarizeStatus, changeList, judgeVolume,
};
