/* 교육과정 개정 소식 확인 — 교육부 보도자료 목록에서 "교육과정 + 개정·고시·확정 …" 제목을 찾는다
 *
 *   node scripts/curriculum-watch.js                 찾은 소식을 보여 준다(바꾸는 것 없음)
 *   node scripts/curriculum-watch.js --issue         새 소식마다 GitHub 이슈를 연다(이미 연 소식은 건너뜀) — 매주 Actions 가 돌린다
 *   node scripts/curriculum-watch.js --html 파일     (테스트용) 내려받지 않고 저장한 목록 HTML 을 읽는다
 *
 * - 사이트(페이지)가 아니라 개발 도구다: 학생 기기에서는 돌지 않는다(AGENTS.md 규칙 4 는 페이지의 외부 요청 금지).
 * - robots.txt 를 지킨다. 국가교육과정정보센터(ncic.re.kr)는 일반 프로그램의 접근을 막아 두어 보지 않는다.
 * - 비밀(secrets)을 쓰지 않는다. 이슈는 Actions 의 기본 GITHUB_TOKEN(gh)으로 연다.
 * - 목록을 읽지 못하면 종료 코드 1 → Actions 실행이 실패로 표시되어 저장소 주인에게 알림이 간다.
 */
'use strict';
const fs = require('fs');
const { execFileSync } = require('child_process');

const SOURCE = {
  name: '교육부 보도자료',
  origin: 'https://www.moe.go.kr',
  list: '/boardCnts/listRenew.do?boardID=294&m=020402&s=moe',
  view: (seq) => 'https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=294&boardSeq=' + seq + '&lev=0&m=020402&s=moe',
};
const UA = 'home-tutor-curriculum-watch/1.0 (+https://github.com/zenki798/home-tutor)';
const LABEL = 'curriculum-watch';
const PAGES = 5;

// 제목에 '교육과정'이 있고, 개정·고시 같은 말이 함께 있으면 개정 소식으로 본다
const MUST = /교육과정/;
const ANY = /(개정|고시|확정|발표|개편|총론|각론|성취기준|시안|공청회|적용|도입)/;
// 교육과정 개정과 관계없는 흔한 제목(대학·직업 교육과정, 연수 과정 등)은 뺀다
const SKIP = /(대학 ?교육과정|직업교육과정|연수|교원양성|평생교육과정|해외 ?교육과정)/;

function isRevisionNews(title) {
  const t = String(title || '');
  return MUST.test(t) && ANY.test(t) && !SKIP.test(t);
}

// 목록 HTML → [{ seq, title }]
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

async function get(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'ko' }, redirect: 'follow' });
  if (!res.ok) throw new Error(url + ' → HTTP ' + res.status);
  return res.text();
}

async function fetchNews() {
  const robots = await get(SOURCE.origin + '/robots.txt').catch(() => '');
  const listPath = SOURCE.list.split('?')[0];
  if (robotsDisallows(robots, listPath)) throw new Error('robots.txt 가 ' + listPath + ' 를 막았어요 — 확인하지 않아요');
  // 한 쪽에 10건 — 매주 돌므로 5쪽(약 2주치)을 1초 간격으로 읽는다
  const items = [];
  const seen = new Set();
  for (let p = 1; p <= PAGES; p++) {
    if (p > 1) await new Promise((r) => setTimeout(r, 1000));
    for (const it of parseList(await get(SOURCE.origin + SOURCE.list + '&page=' + p))) {
      if (!seen.has(it.seq)) { seen.add(it.seq); items.push(it); }
    }
  }
  if (!items.length) throw new Error('보도자료 목록을 읽지 못했어요(페이지 모양이 바뀌었을 수 있어요)');
  return items;
}

function gh(args) {
  return execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

function openIssues(hits) {
  try { gh(['label', 'create', LABEL, '--color', '1d76db', '--description', '교육과정 개정 소식(자동 확인)', '--force']); } catch (e) { /* 권한이 없으면 라벨 없이 */ }
  let opened = 0;
  for (const h of hits) {
    const key = '[보도자료 #' + h.seq + ']';
    const found = gh(['issue', 'list', '--state', 'all', '--search', '"' + key + '" in:title', '--json', 'number', '--limit', '5']);
    if (JSON.parse(found || '[]').length) continue;
    const body = [
      '교육부 보도자료에서 교육과정 개정과 관련된 것으로 보이는 소식을 찾았어요(자동 확인).',
      '',
      '- 제목: ' + h.title,
      '- 원문: ' + SOURCE.view(h.seq),
      '',
      '## 확인할 것',
      '- [ ] 초·중·고 교육과정(총론·교과 성취기준)이 실제로 바뀌는 소식인지, 언제 어느 학년부터 적용되는지',
      '- [ ] 바뀐다면: 새 지도를 `curriculum/revisions/<판>/` 에 만들고 `node scripts/curriculum-diff.js` 로 영향 단원 확인',
      '- [ ] `node scripts/curriculum-apply.js` → 내용 다시 쓰기 → 테스트 → 배포 (docs/CURRICULUM-REVISION.md)',
      '',
      '관계없는 소식이면 이 이슈를 닫으면 돼요.',
    ].join('\n');
    try {
      gh(['issue', 'create', '--title', '교육과정 개정 소식 확인 ' + key + ' ' + h.title.slice(0, 60), '--body', body, '--label', LABEL]);
    } catch (e) {
      gh(['issue', 'create', '--title', '교육과정 개정 소식 확인 ' + key + ' ' + h.title.slice(0, 60), '--body', body]);
    }
    opened++;
  }
  return opened;
}

async function main() {
  const args = process.argv.slice(2);
  const hi = args.indexOf('--html');
  let items;
  try {
    items = hi >= 0 ? parseList(fs.readFileSync(args[hi + 1], 'utf8')) : await fetchNews();
  } catch (e) {
    console.error('✗ ' + SOURCE.name + ' 확인 실패: ' + e.message);
    process.exit(1);
  }
  const hits = items.filter((x) => isRevisionNews(x.title));
  console.log(SOURCE.name + ' ' + items.length + '건 중 교육과정 개정 관련 ' + hits.length + '건');
  hits.forEach((h) => console.log('- #' + h.seq + ' ' + h.title));
  if (args.includes('--issue') && hits.length) console.log('새로 연 이슈: ' + openIssues(hits) + '건');
}

if (require.main === module) main();
module.exports = { parseList, isRevisionNews, robotsDisallows };
