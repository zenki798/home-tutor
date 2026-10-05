/* 교육과정 개정 소식 확인 · 고시 자동 반영 (AI 없음, 사람 손 없음 — 매주 GitHub Actions 가 돌린다)
 *
 *   node scripts/curriculum-watch.js              두 곳을 보고 찾은 것을 보여 준다(바꾸는 것 없음)
 *   node scripts/curriculum-watch.js --update     국가교육위원회의 새 교육과정 고시를 읽어 curriculum/notices.json 에 더한다
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

const ROOT = path.join(__dirname, '..');
const NOTICES_FILE = path.join(ROOT, 'curriculum', 'notices.json');
const META_FILE = path.join(ROOT, 'curriculum', 'meta.json');
const STATUS_FILE = path.join(ROOT, '.github', 'curriculum-watch-status.json');
const COMMIT_MSG_FILE = path.join(ROOT, 'tmp', 'curriculum-watch-commit.txt');

const MOE = {
  name: '교육부 보도자료',
  origin: 'https://www.moe.go.kr',
  list: '/boardCnts/listRenew.do?boardID=294&m=020402&s=moe',
  view: (seq) => 'https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=294&boardSeq=' + seq + '&lev=0&m=020402&s=moe',
};
const NEC = {
  name: '국가교육위원회 법령자료',
  origin: 'https://www.ne.go.kr',
  list: '/user/bbs/BD_selectBbsList.do?q_bbsSn=1016',
  view: (docNo) => 'https://www.ne.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1016&q_bbsDocNo=' + docNo,
};
const UA = 'home-tutor-curriculum-watch/1.0 (+https://github.com/zenki798/home-tutor)';
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

/* ---------- 내려받기 · robots.txt ---------- */

// robots.txt: User-agent: * 묶음의 Disallow 로 이 경로가 막혔는가
function robotsDisallows(robots, pathname) {
  let star = false;
  const rules = [];
  for (const raw of String(robots || '').split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    const m = /^([A-Za-z-]+)\s*:\s*(.*)$/.exec(line);
    if (!m) continue;
    const key = m[1].toLowerCase();
    if (key === 'user-agent') star = m[2].trim() === '*';
    else if (star && key === 'disallow' && m[2].trim()) rules.push(m[2].trim());
  }
  return rules.some((r) => pathname.startsWith(r));
}

// RFC 9309: 2xx 면 규칙대로, 4xx(읽을 수 없음)면 제한 없음, 5xx·연결 실패면 막힌 것으로 본다
function robotsVerdict(status, text, pathname) {
  if (status === 0 || status >= 500) return false;
  if (status >= 400) return true;
  return !robotsDisallows(text, pathname);
}

async function fetchRes(url) {
  return fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'ko' }, redirect: 'follow' });
}
async function get(url) {
  const res = await fetchRes(url);
  if (!res.ok) throw new Error(url + ' → HTTP ' + res.status);
  return res.text();
}
async function getBuffer(url) {
  const res = await fetchRes(url);
  if (!res.ok) throw new Error(url + ' → HTTP ' + res.status);
  return Buffer.from(await res.arrayBuffer());
}
async function robotsAllowed(origin, pathname) {
  let res;
  try { res = await fetchRes(origin + '/robots.txt'); } catch (e) { return false; }
  return robotsVerdict(res.status, res.ok ? await res.text() : '', pathname);
}

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
//   → { store(바뀐 기록), changed, added: [고시], problems: [{ docNo, title, why }], posts }
async function collectNotices(opts) {
  const o = Object.assign({ getText: get, getBuffer, robots: robotsAllowed, sleep: (ms) => new Promise((r) => setTimeout(r, ms)) }, opts || {});
  const meta = o.meta || readJson(META_FILE, {});
  const store = Object.assign({ source: NEC.name, checkedPosts: [], notices: [] }, o.store || readJson(NOTICES_FILE, {}));
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
  const merged = N.mergeNotices(store.notices, parsed, meta);
  const next = { source: store.source, checkedPosts: store.checkedPosts.concat(checked).sort(), notices: merged.notices };
  return { store: next, changed: checked.length > 0, checked, added: merged.added, problems, posts };
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

function noticeIssues(added, problems) {
  let opened = 0;
  for (const n of added) {
    const key = '[고시 ' + n.id + ']';
    const body = [
      '국가교육위원회 법령자료에서 새 교육과정 고시를 읽어 **사이트에 자동으로 반영**했어요(알림용 — 따로 할 일 없음).',
      '',
      '- 고시: ' + n.no + ' (' + n.date + ')',
      '- 바뀐 교육과정(별책): ' + n.volumes.map((v) => v.name + (v.newSubjects ? ' — 새 과목: ' + v.newSubjects.join(', ') : '')).join(' / '),
      '- 시행: ' + n.effective.map((e) => e.date + ' ' + e.grades.join(',')).join(' / '),
      '- 원문: ' + n.url,
      '',
      '사이트는 해당 과목·학년 학생에게 이 소식을 알려 줘요. 단원 내용(설명·문제)은 그대로이고,',
      '교과별 성취기준이 바뀌어 단원을 다시 써야 할 때는 docs/CURRICULUM-REVISION.md 를 보세요.',
    ].join('\n');
    if (openIssue(key, '교육과정 고시 자동 반영 ' + key + ' ' + n.no, body)) opened++;
  }
  for (const p of problems) {
    const key = '[법령자료 #' + p.docNo + ']';
    const body = [
      '국가교육위원회 법령자료의 교육과정 글을 자동으로 읽지 못했어요. 사람이 한 번 확인해 주세요.',
      '',
      '- 제목: ' + p.title,
      '- 까닭: ' + p.why,
      '- 원문: ' + NEC.view(p.docNo),
      '',
      '읽는 방법은 scripts/lib/notices.js 에 있어요(고시문 모양이 바뀌었으면 거기를 고친다).',
    ].join('\n');
    if (openIssue(key, '교육과정 고시를 읽지 못함 ' + key + ' ' + p.title.slice(0, 50), body)) opened++;
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

  // 1) 국가교육위원회 고시
  if (!args.includes('--html')) {
    try {
      const r = await collectNotices();
      console.log(NEC.name + ': 글 ' + r.posts.length + '건, 새로 읽은 교육과정 글 ' + r.checked.length + '건, 새 고시 ' + r.added.length + '건');
      r.added.forEach((n) => console.log('+ ' + summary(n)));
      r.problems.forEach((p) => console.log('! 읽지 못함 #' + p.docNo + ' ' + p.title + ' — ' + p.why));
      if (args.includes('--update') && r.changed) {
        writeNotices(r.store);
        fs.mkdirSync(path.dirname(COMMIT_MSG_FILE), { recursive: true });
        fs.writeFileSync(COMMIT_MSG_FILE, (r.added.length ? '교육과정 고시 자동 반영: ' + r.added.map((n) => n.no).join(', ') : '교육과정 법령자료 확인 기록') +
          '\n\n' + (r.added.map((n) => '- ' + summary(n)).join('\n') || '- 새 고시 없음(확인한 글만 기록)') + '\n');
        setOutput('changed', 'true');
      }
      if (doIssue) console.log('이슈: ' + noticeIssues(r.added, r.problems) + '건');
    } catch (e) {
      console.error('✗ ' + NEC.name + ' 확인 실패: ' + e.message);
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
module.exports = { parseList, isRevisionNews, robotsDisallows, robotsVerdict, collectNotices, keepalive, NEC, MOE };
