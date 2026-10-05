/* 교육과정 개정 소식 확인 · 고시 자동 반영 · 성취기준 자동 반영 (AI 없음, 사람 손 없음 — 매주 GitHub Actions 가 돌린다)
 *
 *   node scripts/curriculum-watch.js              찾고 판정한 것을 보여 준다(바꾸는 것 없음)
 *   node scripts/curriculum-watch.js --update     새 교육과정 고시를 curriculum/notices.json 에 더하고, 고친 별책의 성취기준을
 *                                                 공식 원문과 비교해 조건을 모두 통과하면 curriculum/standards/ 에 반영한다(백업·기록).
 *                                                 통과하지 못하면 기존 자료를 그대로 두고 "교육과정 변경 감지 - 수동 확인 필요"로 기록한다
 *                                                 (scripts/lib/revision.js · sources.js · standards.js)
 *   node scripts/curriculum-watch.js --issue      교육부 소식·새로 더한 고시마다 GitHub 이슈(알림)를 연다 — 이미 연 것은 건너뜀
 *   node scripts/curriculum-watch.js --keepalive  마지막 커밋이 45일보다 오래면 유지 표시 파일을 고친다(예약 작업 60일 정지 규칙 대비)
 *   node scripts/curriculum-watch.js --html 파일  (테스트용) 교육부 목록을 내려받지 않고 저장한 HTML 로
 *
 * 보는 곳
 *   1) 국가교육위원회 > 자료실 > 법령자료 — 교육과정 고시가 올라오는 곳(고시문이 "전문은 국가교육위원회 홈페이지 > 자료실 > 법령자료"라고 밝힌다).
 *      "초·중등학교 교육과정 … 고시" 글의 첨부 고시문(hwpx·pdf)을 내려받아 고시 번호·날짜·바뀐 교과·학년별 시행일·새 과목을 규칙으로 읽는다
 *      (scripts/lib/notices.js) → curriculum/notices.json → build-catalog 가 카탈로그에 싣고, 사이트가 해당 과목·학년 학생에게 안내한다.
 *   2) 교육부 보도자료 — 고시 전 단계(시안·공청회·확정 발표) 소식. 알림(이슈)만 연다.
 * 지키는 것
 *   - 사이트(페이지)가 아니라 저장소 관리 도구다. 학생 기기는 여전히 외부에 아무 요청도 보내지 않는다(AGENTS.md 규칙 4).
 *   - robots.txt 를 지킨다(RFC 9309: 읽을 수 없는 4xx 는 제한 없음, 서버 오류·연결 실패는 막힌 것으로). 국가교육과정정보센터는 막혀 있어 보지 않는다.
 *   - 자기 이름(UA)을 밝히고, 곳마다 한 주에 몇 번만 읽는다. 비밀(secrets)은 쓰지 않는다(이슈는 기본 GITHUB_TOKEN).
 *   - 읽지 못하면 종료 코드 1 → Actions 실행이 실패로 표시되어 저장소 주인에게 알림이 간다.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const N = require('./lib/notices');
const R = require('./lib/revision');
const X = require('./lib/sources');
const net = require('./lib/net');

const ROOT = path.join(__dirname, '..');
const CUR_DIR = path.join(ROOT, 'curriculum');
const NOTICES_FILE = path.join(CUR_DIR, 'notices.json');
const META_FILE = path.join(CUR_DIR, 'meta.json');
const STATUS_FILE = path.join(ROOT, '.github', 'curriculum-watch-status.json');
const COMMIT_MSG_FILE = path.join(ROOT, 'tmp', 'curriculum-watch-commit.txt');

const MOE = {
  name: '교육부 보도자료',
  origin: 'https://www.moe.go.kr',
  list: '/boardCnts/listRenew.do?boardID=294&m=020402&s=moe',
  view: (seq) => 'https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=294&boardSeq=' + seq + '&lev=0&m=020402&s=moe',
};
const NEC = X.NEC;
const LABEL = 'curriculum-watch';
const PAGES = 5;
const KEEPALIVE_DAYS = 45;

/* ---------- 교육부 보도자료 (소식 알림) ---------- */

// 제목에 '교육과정'이 있고, 개정·고시 같은 말이 함께 있으면 개정 소식으로 본다
const MUST = /교육과정/;
const ANY = /(개정|고시|확정|발표|개편|총론|각론|성취기준|시안|공청회|적용|도입)/;
// 교육과정 개정과 관계없는 흔한 제목(대학·직업 교육과정, 연수 과정 등)은 뺀다
const SKIP = /(대학 ?교육과정|직업교육과정|연수|교원양성|평생교육과정|해외 ?교육과정)/;

function isRevisionNews(title) {
  const t = String(title || '');
  return MUST.test(t) && ANY.test(t) && !SKIP.test(t);
}

// 교육부 목록 HTML → [{ seq, title }]
function parseList(html) {
  const out = [];
  const seen = new Set();
  const re = /goView\('294',\s*'(\d+)'[^>]*>([\s\S]{0,400}?)<\/a>/g;
  let m;
  while ((m = re.exec(html))) {
    const title = m[2].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
    if (!title || seen.has(m[1])) continue;
    seen.add(m[1]);
    out.push({ seq: m[1], title });
  }
  return out;
}

/* ---------- 내려받기 · robots.txt (scripts/lib/net.js) ---------- */

const { get, getBuffer, robotsDisallows, robotsVerdict, robotsAllowed } = net;

async function fetchNews() {
  const listPath = MOE.list.split('?')[0];
  if (!(await robotsAllowed(MOE.origin, listPath))) throw new Error('robots.txt 가 ' + listPath + ' 를 막았어요 — 확인하지 않아요');
  // 한 쪽에 10건 — 매주 돌므로 5쪽(약 2주치)을 1초 간격으로 읽는다
  const items = [];
  const seen = new Set();
  for (let p = 1; p <= PAGES; p++) {
    if (p > 1) await new Promise((r) => setTimeout(r, 1000));
    for (const it of parseList(await get(MOE.origin + MOE.list + '&page=' + p))) {
      if (!seen.has(it.seq)) { seen.add(it.seq); items.push(it); }
    }
  }
  if (!items.length) throw new Error('보도자료 목록을 읽지 못했어요(페이지 모양이 바뀌었을 수 있어요)');
  return items;
}

/* ---------- 국가교육위원회 고시 (자동 반영) ---------- */

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return fallback; }
}

// 새 고시를 찾아 기록에 더한다. fetchers 를 바꿔 끼우면 네트워크 없이 시험할 수 있다
//   → { store(바뀐 기록), changed, added: [고시], problems: [{ docNo, title, why }], posts, via, fallbackWhy }
// 국가교육위원회 경로가 막히거나 모양이 바뀌면 국가법령정보센터(행정규칙 연혁·첨부 고시문)로 같은 고시를 찾는다
async function collectNotices(opts) {
  const o = Object.assign({ getText: get, getBuffer, post: net.post, robots: robotsAllowed, sleep: net.sleep, today: new Date().toISOString().slice(0, 10) }, opts || {});
  const meta = o.meta || readJson(META_FILE, {});
  const store = Object.assign({ source: NEC.name, checkedPosts: [], notices: [] }, o.store || readJson(NOTICES_FILE, {}));
  try {
    return await collectFromNec(o, meta, store);
  } catch (e) {
    let law;
    try { law = await X.lawNotices(o, meta); } catch (e2) {
      throw new Error(e.message + ' / 대신 ' + X.LAW.name + '도 읽지 못했어요: ' + e2.message);
    }
    const merged = N.mergeNotices(store.notices, law.notices, meta, { discovered: o.today }); // 발견일(고시일·시행일과 따로)
    const next = { source: store.source, checkedPosts: store.checkedPosts, notices: merged.notices };
    const problems = law.problems.map((p) => ({ docNo: p.where, title: p.title, why: p.why, where: p.where }));
    return { store: next, changed: merged.added.length > 0, checked: [], added: merged.added, problems, posts: [], via: 'law', fallbackWhy: e.message };
  }
}

async function collectFromNec(o, meta, store) {
  const listPath = NEC.list.split('?')[0];
  if (!(await o.robots(NEC.origin, listPath))) throw new Error('robots.txt 가 ' + listPath + ' 를 막았어요 — 확인하지 않아요');
  const posts = N.parseBoardList(await o.getText(NEC.origin + NEC.list));
  if (!posts.length) throw new Error(NEC.name + ' 목록을 읽지 못했어요(페이지 모양이 바뀌었을 수 있어요)');
  const todo = posts.filter((p) => N.isCurriculumTitle(p.title) && !store.checkedPosts.includes(p.docNo))
    .sort((a, b) => a.docNo.localeCompare(b.docNo)); // 글 번호가 올린 때 — 오래된 것부터(고친 고시의 사슬 순서)
  const parsed = [];
  const problems = [];
  const checked = [];
  for (const p of todo) {
    await o.sleep(1000);
    const files = N.parseAttachments(await o.getText(NEC.view(p.docNo))).filter((a) => N.isCurriculumAttachment(a.name));
    let found = 0;
    for (const f of files) {
      await o.sleep(1000);
      const text = N.attachmentText(f.name, await o.getBuffer(NEC.origin + f.href)); // 내려받기 실패는 throw → 다음 주에 다시
      if (text === null) continue;
      for (const n of N.parseNotices(text)) {
        parsed.push(Object.assign(n, { url: NEC.view(p.docNo), file: f.name }));
        found++;
      }
    }
    if (!found) problems.push({ docNo: p.docNo, title: p.title, why: files.length ? '첨부 고시문에서 고시를 읽지 못했어요(문서 모양이 바뀌었을 수 있어요)' : '읽을 수 있는 첨부(hwpx·pdf)가 없어요' });
    checked.push(p.docNo);
  }
  const merged = N.mergeNotices(store.notices, parsed, meta, { discovered: o.today }); // 발견일(고시일·시행일과 따로)
  const next = { source: store.source, checkedPosts: store.checkedPosts.concat(checked).sort(), notices: merged.notices };
  return { store: next, changed: checked.length > 0, checked, added: merged.added, problems, posts, via: 'nec' };
}

/* ---------- 고친 별책의 성취기준까지 (자동 반영 또는 수동 확인 필요) ---------- */

const squash = (s) => N.norm(String(s || '')).replace(/\s+/g, '');
function stripVolatile(x) {
  return JSON.parse(JSON.stringify(x || null, (k, v) => (k === 'checked' || k === 'tried' ? undefined : v)));
}

// 국가법령정보센터에 실린 같은 고시와 시행일·별책을 견준다(두 공식 경로가 같은 말을 하는가)
//   → { status: 'same' | 'differs' | 'absent' | 'error', note? }
async function crossCheck(n, o) {
  try {
    const ver = (await X.lawVersions(o)).find((v) => squash(v.no) === squash(n.no));
    if (!ver) return { status: 'absent', note: X.LAW.name + '에 아직 실리지 않았어요' };
    const files = (await X.lawAttachments(ver.seq, o)).filter((f) => /고시/.test(f.name) && !/이유서/.test(f.name) && /\.(hwpx|hwp|pdf)$/i.test(f.name));
    const pick = ['hwpx', 'hwp', 'pdf'].map((x) => files.find((f) => new RegExp('\\.' + x + '$', 'i').test(f.name))).find(Boolean);
    if (!pick) return { status: 'absent', note: X.LAW.name + '에 고시문 첨부가 없어요' };
    await o.sleep(800);
    const buf = await o.getBuffer(pick.href);
    const text = /\.hwp$/i.test(pick.name) ? require('./lib/hwp').hwpText(buf) : N.attachmentText(pick.name, buf);
    const other = N.parseNotices(text || '').find((x) => squash(x.no) === squash(n.no));
    if (!other) return { status: 'error', note: X.LAW.name + '의 고시문을 읽지 못했어요' };
    const eff = (list) => (list || []).map((e) => e.date + ':' + e.grades.slice().sort().join(',')).sort().join(' / ');
    const vols = (list) => (list || []).map((v) => v.n).sort((a, b) => a - b).join(',');
    if (eff(other.effective) !== eff(n.effective) || vols(other.volumes) !== vols(n.volumes)) {
      return { status: 'differs', note: '시행일·별책이 서로 달라요 — 국가교육위원회: ' + eff(n.effective) + ' [' + vols(n.volumes) + '] / ' + X.LAW.name + ': ' + eff(other.effective) + ' [' + vols(other.volumes) + ']' };
    }
    return { status: 'same' };
  } catch (e) {
    return { status: 'error', note: e.message };
  }
}

// → { store, changed, results: [{ notice, status, changed }] }
//   opts: 가짜 인터넷(getText·getBuffer·post·robots·sleep), curDir, meta, at, apply(false 면 판정만)
async function analyzeNotices(store, opts) {
  const o = Object.assign({ getText: get, getBuffer, post: net.post, robots: robotsAllowed, sleep: net.sleep, curDir: CUR_DIR, at: new Date().toISOString(), apply: true }, opts || {});
  const meta = o.meta || readJson(path.join(o.curDir, 'meta.json'), {});
  const covers = meta.covers || {};
  const next = JSON.parse(JSON.stringify(store));
  const results = [];
  let changed = false;
  const o2 = Object.assign({}, o); // 한 번 돌 때 국가법령정보센터 연혁은 한 번만 읽는다(sources.lawVersions 가 여기에 담아 둔다)
  const today = o.at.slice(0, 10);
  const map = R.mapIndex(o.curDir);
  for (const n of next.notices.slice().sort((a, b) => a.date.localeCompare(b.date))) {
    const prev = n.analysis;
    // 확인이 끝난 고시(기록·변화 없음·해당 없음): 다시 받지 않는다. 시간이 지나 모든 학년이 시행되면 scheduled → active 만 고친다
    if (prev && prev.status !== 'manual') {
      let moved = false;
      for (const v of Object.keys(prev.volumes || {})) if (R.refreshStatus(prev.volumes[v], today)) moved = true;
      if (moved) { prev.status = R.summarizeStatus(prev.volumes); prev.checked = today; changed = true; }
      results.push({ notice: n, status: prev.status, changed: moved, refreshed: moved });
      continue;
    }
    const vols = (n.volumes || []).map((v) => v.n).filter((v) => covers[String(v)]);
    let rec;
    if (!vols.length) rec = { status: 'none', note: '이 사이트가 쓰는 교과의 별책은 바뀌지 않았어요' };
    else {
      // 사람이 되돌린 별책은 --retry 전까지 그대로, 이미 확인된 별책도 그대로(시행 상태만 고친다)
      const keep = {};
      for (const v of vols) {
        const pv = prev && prev.volumes && prev.volumes[v];
        if (pv && (pv.rolledBack || pv.status !== 'manual')) { R.refreshStatus(pv, today); keep[v] = pv; }
      }
      const todo = vols.filter((v) => !keep[v]);
      // 시행일 확인: 두 공식 경로가 같은 말을 해야(same) 기록한다 — 아니면 judgeVolume 이 수동 확인으로 둔다
      if (todo.length && !(n.crossCheck && n.crossCheck.status === 'same')) n.crossCheck = await crossCheck(n, o2);
      const names = {};
      for (const v of todo) names[v] = (meta.volumes || {})[v];
      const found = todo.length ? await X.findVolumeDocs(n, todo, o2, names) : { docs: {}, tried: [] };
      const volumes = Object.assign({}, keep);
      for (const v of todo) {
        volumes[v] = R.judgeVolume({ curDir: o.curDir, store: next, notice: n, volume: v, docs: found.docs[v] || [], at: o.at, apply: o.apply, cross: n.crossCheck, map });
      }
      rec = { status: R.summarizeStatus(volumes), volumes };
      if (found.tried.length) rec.tried = found.tried;
    }
    const same = prev && JSON.stringify(stripVolatile(prev)) === JSON.stringify(stripVolatile(rec));
    if (!same) {
      rec.checked = today;
      n.analysis = rec;
      changed = true;
    }
    results.push({ notice: n, status: n.analysis.status, changed: !same });
  }
  return { store: next, changed, results };
}

function writeNotices(store) {
  fs.writeFileSync(NOTICES_FILE, JSON.stringify(store, null, 1) + '\n');
}

function summary(n) {
  const vols = (n.volumes || []).map((v) => v.name).join('·');
  return n.no + '(' + n.date + ') ' + vols;
}

/* ---------- GitHub 이슈 ---------- */

function gh(args) {
  return execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}
function openIssue(key, title, body) {
  const found = gh(['issue', 'list', '--state', 'all', '--search', '"' + key + '" in:title', '--json', 'number', '--limit', '5']);
  if (JSON.parse(found || '[]').length) return false;
  try {
    gh(['issue', 'create', '--title', title, '--body', body, '--label', LABEL]);
  } catch (e) {
    gh(['issue', 'create', '--title', title, '--body', body]);
  }
  return true;
}
function ensureLabel() {
  try { gh(['label', 'create', LABEL, '--color', '1d76db', '--description', '교육과정 개정 소식(자동 확인)', '--force']); } catch (e) { /* 권한이 없으면 라벨 없이 */ }
}

function newsIssues(hits) {
  let opened = 0;
  for (const h of hits) {
    const key = '[보도자료 #' + h.seq + ']';
    const body = [
      '교육부 보도자료에서 교육과정 개정과 관련된 것으로 보이는 소식을 찾았어요(자동 확인).',
      '',
      '- 제목: ' + h.title,
      '- 원문: ' + MOE.view(h.seq),
      '',
      '고시가 나오면 국가교육위원회 법령자료에서 자동으로 읽어 사이트에 안내해요(따로 할 일 없음).',
      '교육과정이 전면 개정되어 단원 내용을 다시 써야 할 때만 docs/CURRICULUM-REVISION.md 를 보세요.',
      '관계없는 소식이면 이 이슈를 닫으면 돼요.',
    ].join('\n');
    if (openIssue(key, '교육과정 개정 소식 ' + key + ' ' + h.title.slice(0, 60), body)) opened++;
  }
  return opened;
}

function noticeIssues(added, problems, analyzed, via) {
  let opened = 0;
  for (const n of added) {
    const key = '[고시 ' + n.id + ']';
    const body = [
      '새 교육과정 고시를 읽어 **사이트에 자동으로 안내**했어요(알림용).',
      '',
      '- 고시: ' + n.no + ' (' + n.date + ')',
      '- 바뀐 교육과정(별책): ' + n.volumes.map((v) => v.name + (v.newSubjects ? ' — 새 과목: ' + v.newSubjects.join(', ') : '')).join(' / '),
      '- 시행: ' + n.effective.map((e) => e.date + ' ' + e.grades.join(',')).join(' / '),
      '- 원문: ' + n.url,
      '',
      '바뀐 별책의 성취기준 비교(자동 반영 또는 "' + R.MANUAL_LABEL + '") 결과는 따로 알려요.',
    ].join('\n');
    if (openIssue(key, '교육과정 고시 자동 반영 ' + key + ' ' + n.no, body)) opened++;
  }
  for (const p of problems) {
    const key = '[법령자료 #' + p.docNo + ']';
    const body = [
      '교육과정 고시 글을 자동으로 읽지 못했어요. 사람이 한 번 확인해 주세요.',
      '',
      '- 제목: ' + p.title,
      '- 까닭: ' + p.why,
      '- 원문: ' + (p.where || NEC.view(p.docNo)),
      '',
      '읽는 방법은 scripts/lib/notices.js 에 있어요(고시문 모양이 바뀌었으면 거기를 고친다).',
    ].join('\n');
    if (openIssue(key, '교육과정 고시를 읽지 못함 ' + key + ' ' + p.title.slice(0, 50), body)) opened++;
  }
  if (via && via.via === 'law') {
    const key = '[확인 경로 ' + new Date().toISOString().slice(0, 7) + ']';
    const body = [
      NEC.name + '을 읽지 못해 이번에는 ' + X.LAW.name + '에서 고시를 확인했어요(자동으로 다른 공식 경로를 썼어요).',
      '',
      '- 까닭: ' + via.fallbackWhy,
      '',
      '국가교육위원회 누리집 모양이 바뀌었으면 scripts/lib/notices.js(parseBoardList·parseAttachments)를 고쳐 주세요.',
    ].join('\n');
    if (openIssue(key, '교육과정 확인 경로 바뀜 ' + key, body)) opened++;
  }
  for (const x of analyzed || []) {
    const n = x.notice;
    const a = n.analysis || {};
    const vols = a.volumes || {};
    for (const v of Object.keys(vols)) {
      const r = vols[v];
      const vname = ((n.volumes || []).find((y) => String(y.n) === String(v)) || {}).name || ('별책 ' + v);
      if (R.VERIFIED.includes(r.status) && r.snapshot && !r.already) {
        const key = '[자동 반영 ' + n.id + ' 별책 ' + v + ']';
        const c = r.changes || { added: [], removed: [], changed: [] };
        const body = [
          n.no + '의 ' + vname + ' 교육과정(별책 ' + v + ') 성취기준을 공식 원문과 비교해 **새 판으로 기록**했어요(' + (r.status === 'scheduled' ? '시행 예정 — scheduled' : '시행 중 — active') + '). 모든 판정 조건을 통과했어요.',
          '지금 시행 판(curriculum/standards/v' + v + '.json)은 그대로이고, 학생에게는 그 학년의 시행 학년도가 되었을 때만 적용돼요.',
          '',
          '- 고시일 ' + n.date + ' · 발견일 ' + (n.discovered || '-') + ' · 시행: ' + (n.effective || []).map((e) => e.date + ' ' + e.grades.join(',')).join(' / '),
          '- 원문: ' + r.source.url + ' (' + r.source.file + ', sha256 ' + String(r.source.sha256).slice(0, 12) + '…)',
          '- 새 판: curriculum/' + r.version.file + ' (sha256 ' + String(r.version.sha256).slice(0, 12) + '…), 비교한 앞 판: curriculum/' + (r.prev ? r.prev.file : '-'),
          '- 추가 ' + c.added.length + ' · 삭제 ' + c.removed.length + ' · 변경 ' + c.changed.length,
          '- 보관본: curriculum/' + r.snapshot + ' (되돌리기: `node scripts/curriculum-standards.js --rollback ' + r.snapshot.split('/').pop() + '`)',
          '',
        ].concat(c.added.slice(0, 30).map((s) => '+ ' + s.code + ' ' + s.text))
          .concat(c.removed.slice(0, 30).map((s) => '- ' + s.code + ' ' + s.text))
          .concat(c.changed.slice(0, 30).map((s) => '~ ' + s.code + ' ' + s.from + ' → ' + s.to)).join('\n');
        if (openIssue(key, '성취기준 자동 반영 ' + key + ' ' + vname, body)) opened++;
      } else if (r.status === 'manual') {
        const key = '[수동 확인 ' + n.id + ' 별책 ' + v + ']';
        const body = [
          // 고시 번호는 "…호"(받침 없음)로 끝나고, 표시 문구는 "…필요"로 끝난다 → 가 · 를
          '**' + R.MANUAL_LABEL + '** — ' + n.no + '가 ' + vname + ' 교육과정(별책 ' + v + ')을 바꿨는데, 자동으로 확실하게 반영할 수 없었어요.',
          '추측해서 반영하지 않고 **기존 교육과정 자료를 그대로** 두었어요. 사이트는 해당 과목에 "' + R.MANUAL_LABEL + '"를 표시해요.',
          '',
          '까닭:',
        ].concat((r.reasons || []).map((s) => '- ' + s))
          .concat(['', '찾아본 공식 경로:']).concat((a.tried || []).map((t) => '- ' + t.route + ': ' + t.result))
          .concat([
            '',
            '사람이 할 일(한 번): 국가교육과정정보센터(ncic.go.kr) > 교육과정 자료실 등 공식 자료실에서 이 별책의 **확정 원문**(hwp·hwpx·pdf)을 받아',
            '`node scripts/curriculum-standards.js analyze 받은파일 --notice ' + n.id + ' --volume ' + v + ' --url 받은곳주소`',
            '로 같은 규칙에 넣어 보세요. 모든 조건을 통과하면 `--apply` 로 반영돼요(백업·기록·되돌리기 포함). 통과하지 못하면 까닭이 나와요.',
          ]).join('\n');
        if (openIssue(key, R.MANUAL_LABEL + ' ' + key + ' ' + vname, body)) opened++;
      }
    }
  }
  return opened;
}

/* ---------- 예약 작업 유지 (공개 저장소는 커밋 없이 60일이면 예약 작업이 멈춘다) ---------- */

// opts(시험용): { now, lastCommit(ms), file }
function keepalive(opts) {
  const o = opts || {};
  const now = o.now || Date.now();
  let last = o.lastCommit;
  if (last === undefined) {
    try { last = Number(execFileSync('git', ['log', '-1', '--format=%ct'], { cwd: ROOT, encoding: 'utf8' }).trim()) * 1000; } catch (e) { return false; }
  }
  const days = Math.floor((now - last) / 86400000);
  if (days < KEEPALIVE_DAYS) { console.log('마지막 커밋 ' + days + '일 전 — 유지 커밋은 필요 없어요'); return false; }
  const today = new Date(now).toISOString().slice(0, 10);
  fs.writeFileSync(o.file || STATUS_FILE, JSON.stringify({
    note: '교육과정 개정 확인 작업(curriculum-watch)이 멈추지 않게 하는 표시 파일. 커밋이 ' + KEEPALIVE_DAYS + '일 넘게 없으면 이 날짜를 고쳐 커밋한다.',
    lastKeepalive: today,
  }, null, 1) + '\n');
  console.log('마지막 커밋 ' + days + '일 전 — 유지 표시를 고쳤어요(' + today + ')');
  return true;
}

/* ---------- 실행 ---------- */

function setOutput(key, value) {
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, key + '=' + value + '\n');
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--keepalive')) {
    setOutput('keepalive', keepalive() ? 'true' : 'false');
    return;
  }
  const doIssue = args.includes('--issue');
  if (doIssue) ensureLabel();
  let failed = false;

  // 1) 국가교육위원회 고시(막히면 국가법령정보센터) → 2) 고친 별책의 성취기준 비교·자동 반영 또는 수동 확인 필요
  if (!args.includes('--html')) {
    try {
      const update = args.includes('--update');
      const r = await collectNotices();
      if (r.via === 'law') console.log('! ' + NEC.name + '을 읽지 못해 ' + X.LAW.name + '에서 확인했어요: ' + r.fallbackWhy);
      else console.log(NEC.name + ': 글 ' + r.posts.length + '건, 새로 읽은 교육과정 글 ' + r.checked.length + '건, 새 고시 ' + r.added.length + '건');
      r.added.forEach((n) => console.log('+ ' + summary(n)));
      r.problems.forEach((p) => console.log('! 읽지 못함 #' + p.docNo + ' ' + p.title + ' — ' + p.why));
      const a = await analyzeNotices(r.store, { apply: update });
      for (const x of a.results) {
        const vols = (x.notice.analysis && x.notice.analysis.volumes) || {};
        const line = Object.keys(vols).map((v) => '별책 ' + v + ' ' + ({ scheduled: '새 판 기록(시행 예정)', active: '새 판 기록(시행 중)', applied: '자동 반영', unchanged: '성취기준 변화 없음', manual: R.MANUAL_LABEL }[vols[v].status] || vols[v].status)).join(', ');
        console.log((x.changed ? '* ' : '  ') + x.notice.no + ': ' + (line || '이 사이트 교과와 관계없음'));
        for (const v of Object.keys(vols)) (vols[v].reasons || []).slice(0, 2).forEach((s) => console.log('    - ' + s));
      }
      if (update && (r.changed || a.changed)) {
        writeNotices(a.store);
        const applied = a.results.filter((x) => x.changed && !x.refreshed && R.VERIFIED.includes(x.status));
        const manual = a.results.filter((x) => x.changed && x.status === 'manual');
        const refreshed = a.results.filter((x) => x.refreshed);
        fs.mkdirSync(path.dirname(COMMIT_MSG_FILE), { recursive: true });
        const title = r.added.length ? '교육과정 고시 자동 반영: ' + r.added.map((n) => n.no).join(', ') :
          applied.length ? '성취기준 새 판 기록: ' + applied.map((x) => x.notice.no).join(', ') :
          manual.length ? '교육과정 변경 감지(수동 확인 필요): ' + manual.map((x) => x.notice.no).join(', ') :
          refreshed.length ? '교육과정 판 시행 상태 갱신(scheduled → active): ' + refreshed.map((x) => x.notice.no).join(', ') : '교육과정 법령자료 확인 기록';
        fs.writeFileSync(COMMIT_MSG_FILE, title + '\n\n' + (r.added.map((n) => '- ' + summary(n)).concat(a.results.filter((x) => x.changed).map((x) => '- ' + x.notice.no + ': ' + x.status)).join('\n') || '- 새 고시 없음(확인한 글만 기록)') + '\n');
        setOutput('changed', 'true');
      }
      if (doIssue) console.log('이슈: ' + noticeIssues(r.added, r.problems, a.results.filter((x) => x.changed || x.status === 'manual'), r) + '건');
    } catch (e) {
      console.error('✗ 교육과정 고시 확인 실패: ' + e.message);
      failed = true;
    }
  }

  // 2) 교육부 보도자료
  try {
    const hi = args.indexOf('--html');
    const items = hi >= 0 ? parseList(fs.readFileSync(args[hi + 1], 'utf8')) : await fetchNews();
    const hits = items.filter((x) => isRevisionNews(x.title));
    console.log(MOE.name + ' ' + items.length + '건 중 교육과정 개정 관련 ' + hits.length + '건');
    hits.forEach((h) => console.log('- #' + h.seq + ' ' + h.title));
    if (doIssue && hits.length) console.log('새로 연 이슈: ' + newsIssues(hits) + '건');
  } catch (e) {
    console.error('✗ ' + MOE.name + ' 확인 실패: ' + e.message);
    failed = true;
  }
  if (failed) process.exitCode = 1;
}

if (require.main === module) main();
module.exports = { parseList, isRevisionNews, robotsDisallows, robotsVerdict, collectNotices, analyzeNotices, crossCheck, keepalive, NEC, MOE };
