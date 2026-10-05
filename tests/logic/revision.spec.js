const { test, expect } = require('@playwright/test');
const fs = require('fs');
const os = require('os');
const path = require('path');

/*
 * 교육과정 별책(성취기준) 자동 반영 — scripts/lib/revision.js · sources.js · curriculum-watch.js(analyzeNotices) · curriculum-standards.js
 *   새 고시가 고친 별책의 확정 원문을 공식 경로에서 찾아 규칙으로 읽고 기준 자료(curriculum/standards/)와 비교한다.
 *   판정 조건을 모두 통과할 때만 반영(백업·기록·되돌리기), 하나라도 어기면 기존 자료를 그대로 두고 "교육과정 변경 감지 - 수동 확인 필요".
 * 네트워크 없이: 공식 사이트 응답은 가짜로, 별책 문서는 시험 안에서 실제 기준 자료(공식 원문에서 뽑은 것)로 만든다.
 */
const ROOT = path.join(__dirname, '..', '..');
const B = require('./builders');
const R = require(path.join(ROOT, 'scripts', 'lib', 'revision.js'));
const X = require(path.join(ROOT, 'scripts', 'lib', 'sources.js'));
const W = require(path.join(ROOT, 'scripts', 'curriculum-watch.js'));
const CS = require(path.join(ROOT, 'scripts', 'curriculum-standards.js'));
const { catalogNotices } = require(path.join(ROOT, 'scripts', 'build-catalog.js'));

const REAL = path.join(ROOT, 'curriculum', 'standards');
const readReg = (v) => JSON.parse(fs.readFileSync(path.join(REAL, 'v' + v + '.json'), 'utf8'));
const META = {
  basis: { no: '교육부 고시 제2022-33호', date: '2022-12-22' },
  volumes: { 7: '사회과', 14: '영어과', 15: '바른 생활, 슬기로운 생활, 즐거운 생활' },
  covers: { 7: { subjects: ['soc', 'hist'], except: ['soc-h-ethics'] }, 14: { subjects: ['eng'] }, 15: { subjects: ['life'] } },
};
const NEC_URL = 'https://www.ne.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1016&q_bbsDocNo=20240927163706792';
const NOTICE = {
  id: 'nec-2024-3', no: '국가교육위원회 고시 제2024-3호', date: '2024-08-16', amends: ['교육부 고시 제2022-33호'],
  volumes: [{ n: 1, name: '총론' }, { n: 7, name: '사회과' }, { n: 14, name: '영어과' }],
  effective: [{ date: '2025-03-01', grades: ['e1', 'e2', 'e3', 'e4', 'm1', 'h1'] }, { date: '2026-03-01', grades: ['e5', 'e6', 'm2', 'h2'] }, { date: '2027-03-01', grades: ['m3', 'h3'] }],
  url: NEC_URL,
};
const CHANGE7 = {
  '[4사06-01]': '지역의 국가유산을 통해 국가유산의 의미와 유형을 알아보고, 국가유산의 가치를 탐색한다.',
  '[9역10-04]': '고려의 국가유산과 대외 교류의 사례를 조사하여 그 특징을 파악한다.',
};
// 실제 공공기관 zip 처럼 UTF-8 표시가 없는 CP949 이름(교육부 별책 묶음에서 그대로 가져온 바이트)
const CP949 = {
  '[별책7] 사회과 교육과정.hwp': Buffer.from('5bbab0c3a5375d20bbe7c8b8b0fa20b1b3c0b0b0fac1a42e687770', 'hex'),
  '[별책14] 영어과 교육과정.hwp': Buffer.from('5bbab0c3a531345d20bfb5beeeb0fa20b1b3c0b0b0fac1a42e687770', 'hex'),
};

function tmpCur(vols) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tutor-rev-'));
  fs.mkdirSync(path.join(dir, 'standards'));
  for (const v of vols || [7, 14, 15]) fs.copyFileSync(path.join(REAL, 'v' + v + '.json'), path.join(dir, 'standards', 'v' + v + '.json'));
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(META));
  return dir;
}
const clone = (x) => JSON.parse(JSON.stringify(x));
const ATTACH = (name, id) => '<li><p>' + name + '</p><a href="/component/file/ND_fileDownload.do?q_fileSn=1&amp;q_fileId=' + id + '">다운로드</a></li>';
const GOSI_LINES = (n) => [n.no, ' 초·중등교육법 제23조제2항에 의거하여 초·중등학교 교육과정(교육부 고시 제2022-33호)을 다음과 같이 일부 개정하여 고시합니다.', '2024년 8월 16일']
  .concat(n.volumes.map((v, i) => ' ' + (i + 1) + '. ' + v.name + ' 교육과정은 【별책 ' + v.n + '】과 같습니다.'))
  .concat(['부 칙', '   가. 2025년 3월 1일: 초등학교 1~4학년, 중학교 1학년, 고등학교 1학년', '   나. 2026년 3월 1일: 초등학교 5, 6학년, 중학교 2학년, 고등학교 2학년', '   다. 2027년 3월 1일: 중학교 3학년, 고등학교 3학년']);

// 가짜 공식 사이트: NEC 글(첨부 목록) · 첨부 파일 · 국가법령정보센터(바로가기·연혁·첨부)
function fakeNet(o) {
  const calls = [];
  const files = o.files || {};
  return {
    calls,
    robots: async (origin) => !(o.blocked || []).includes(origin),
    sleep: async () => {},
    getText: async (u) => {
      calls.push(u);
      if (o.post && u === NEC_URL) return o.post;
      if (/law\.go\.kr/.test(u) && o.law) return '<iframe src="/LSW//admRulInfoP.do?admRulSeq=111&amp;chrClsCd=010201"></iframe>';
      throw new Error('없는 주소 ' + u);
    },
    post: async (u, form) => {
      calls.push(u + ' ' + JSON.stringify(form));
      if (!o.law) throw new Error('없는 주소 ' + u);
      if (/admRulHstListR/.test(u)) return '<a href="#AJAX" onclick="javascript:admRulViewHst(\'N\',\'222\');return false;"> 1. 초·중등학교 교육과정 [시행 2025. 3. 1.] [국가교육위원회고시 제2024-3호, 2024. 8. 16., 일부개정]</a>';
      if (/admRulAttFlList/.test(u)) return '<a href="flDownload.do?flSeq=9">국가교육위원회 고시 제2024-3호(초·중등학교 교육과정).hwpx</a>';
      throw new Error('없는 주소 ' + u);
    },
    getBuffer: async (u) => {
      calls.push(u);
      const m = /q_fileId=([a-z0-9]+)/.exec(u);
      if (m && files[m[1]]) return files[m[1]];
      if (/flSeq=9/.test(u) && o.law) return B.hwpx(GOSI_LINES(o.lawNotice || NOTICE));
      throw new Error('없는 주소 ' + u);
    },
  };
}

/* ---------- 판정 조건 ---------- */

function smallReg() {
  const standards = {};
  for (let i = 1; i <= 25; i++) standards['[4사01-' + String(i).padStart(2, '0') + ']'] = { t: '사회 성취기준 ' + i + '번 문장을 탐구한다.', c: '사회', a: '영역', b: '초등학교 3~4학년' };
  return { volume: 7, notice: '교육부 고시 제2022-33호', standards };
}
function parsedFrom(reg, edit) {
  const standards = Object.keys(reg.standards).map((code) => ({ code, text: reg.standards[code].t, course: '사회', area: '영역', band: '초등학교 3~4학년' }));
  const p = { volume: 7, notice: NOTICE.no, standards, issues: [], warnings: [] };
  if (edit) edit(p);
  return p;
}
const goodDoc = (parsed) => ({ url: 'https://www.ne.go.kr/component/file/ND_fileDownload.do?q_fileId=x', name: '[별책 7] 사회과 교육과정.hwp', parsed });

test('판정: 모든 조건을 지키면 통과, 조건마다 하나씩 어기면 그 까닭으로 막는다', () => {
  const reg = smallReg();
  const base = { notice: NOTICE, volume: 7, registry: reg, others: { 7: reg } };
  const ok = R.assess(Object.assign({}, base, { doc: goodDoc(parsedFrom(reg, (p) => { p.standards[0].text = '사회 성취기준 1번 문장을 깊이 탐구한다.'; })) }));
  expect(ok.reasons).toEqual([]);
  expect(ok.ok).toBe(true);
  expect(ok.diff.changed.map((c) => c.code)).toEqual(['[4사01-01]']);

  const why = (patch) => R.assess(Object.assign({}, base, patch)).reasons.join(' | ');
  expect(why({ doc: Object.assign(goodDoc(parsedFrom(reg)), { url: 'http://www.ne.go.kr/x' }) })).toMatch(/공식 기관/);
  expect(why({ doc: Object.assign(goodDoc(parsedFrom(reg)), { url: 'https://blog.example.com/별책.hwp' }) })).toMatch(/공식 기관/);
  expect(why({ doc: Object.assign(goodDoc(parsedFrom(reg)), { name: '(별첨1) 초중등학교 교육과정 행정예고본.pdf' }) })).toMatch(/확정 전 문서/);
  expect(why({ doc: Object.assign(goodDoc(parsedFrom(reg)), { title: '신구대비표' }) })).toMatch(/확정 전 문서/);
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { p.notice = '국가교육위원회 고시 제2026-1호'; })) })).toMatch(/문서 머리의 고시 번호/);
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { p.volume = 8; })) })).toMatch(/별책 8/);
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { p.issues = ['줄 첫머리에 나온 코드 3개의 성취기준 문장을 찾지 못했어요']; })) })).toMatch(/구조를 확실히 읽지 못했어요/);
  expect(why({ doc: goodDoc(parsedFrom(reg)), pending: ['국가교육위원회 고시 제2024-3호'] })).toMatch(/앞선 고시/);
  expect(why({ doc: goodDoc(parsedFrom(reg)), notice: Object.assign({}, NOTICE, { effective: [] }) })).toMatch(/시행일/);
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { p.standards[0].course = null; })) })).toMatch(/어느 과목인지/);
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { p.standards.splice(0, 6); })) })).toMatch(/빠진 성취기준이 6개/);
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { p.standards.slice(0, 8).forEach((s) => { s.text += ' 그리고 더 깊이 살펴본다.'; }); })) })).toMatch(/바뀐 성취기준이 8개/);
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { for (let i = 0; i < 13; i++) p.standards.push({ code: '[4사09-' + String(i + 1).padStart(2, '0') + ']', text: '새 문장이다.', course: '사회' }); })) })).toMatch(/새 성취기준이 13개/);
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { p.standards[2].text = '하루를 건강하고 활기차게 지낸다.'; })) })).toMatch(/크게 달라진 성취기준이 1개.*\[4사01-03\]/);
  const other = { 8: { standards: { '[2수01-01]': { t: '수를 센다.' } } } };
  expect(why({ others: Object.assign({ 7: reg }, other), doc: goodDoc(parsedFrom(reg, (p) => { p.standards.push({ code: '[2수01-01]', text: '수를 센다.', course: '사회' }); })) })).toMatch(/다른 별책의 성취기준 코드와 겹쳐요: \[2수01-01\]\(별책 8\)/);
  expect(why({ registry: null, doc: goodDoc(parsedFrom(reg)) })).toMatch(/기준 성취기준 자료/);
});

test('공식 주소·확정 전 문서 가리기', () => {
  expect(R.isOfficialUrl('https://www.ne.go.kr/a')).toBe(true);
  expect(R.isOfficialUrl('https://www.law.go.kr/LSW/flDownload.do?flSeq=1')).toBe(true);
  expect(R.isOfficialUrl('https://www.moe.go.kr/boardCnts/fileDown.do')).toBe(true);
  expect(R.isOfficialUrl('https://ne.go.kr.evil.example/a')).toBe(false);
  expect(R.isOfficialUrl('https://www.ncic.go.kr/a')).toBe(false); // 자동 접근이 막힌 곳 — 사람이 받은 파일에서만 인정
  expect(CS.manualUrlOk('https://www.ncic.go.kr/mobile.dwn.ogf.inventoryList.do')).toBe(true);
  expect(CS.manualUrlOk('http://www.ncic.go.kr/a')).toBe(false);
  for (const n of ['(별첨1) 초중등학교 교육과정 행정예고본.pdf', '(별첨3) 신구대비표.pdf', '「초·중등학교 교육과정」 일부개정(안)', '교육과정 시안 공청회', '행정예고 의견 검토 결과 공표문']) expect(R.isDraft(n)).toBe(true);
  for (const n of ['[별책 7] 사회과 교육과정.hwp', '붙임1. 「초·중등학교 교육과정」(일부개정) 국가교육위원회 고시 제2026-1호(2026.1.21.).pdf']) expect(R.isDraft(n)).toBe(false);
});

/* ---------- 적용 · 백업 · 기록 · 되돌리기 (실제 사회과 기준 자료) ---------- */

test('반영: 바뀐 성취기준만 기준 자료에 반영하고, 반영 전 파일을 보관·기록한다 → 되돌리면 그대로 돌아온다', () => {
  const cur = tmpCur([7]);
  const before = fs.readFileSync(path.join(cur, 'standards', 'v7.json'), 'utf8');
  const store = { notices: [clone(NOTICE)] };
  fs.writeFileSync(path.join(cur, 'notices.json'), JSON.stringify(store));
  const buf = B.makeHwp(B.volumeLines(readReg(7), { notice: NOTICE.no, change: CHANGE7 }));
  const doc = { url: 'https://www.ne.go.kr/component/file/ND_fileDownload.do?q_fileId=s7', name: '[별책 7] 사회과 교육과정.hwp', buf, sha256: R.sha256(buf), bytes: buf.length };
  const rec = R.judgeVolume({ curDir: cur, store, notice: store.notices[0], volume: 7, docs: [doc], at: '2026-10-05T12:00:00.000Z' });
  expect(rec.status).toBe('applied');
  expect(rec.counts).toEqual({ added: 0, removed: 0, changed: 2 });
  expect(rec.changes.changed.map((c) => [c.code, c.course])).toEqual([['[4사06-01]', '사회'], ['[9역10-04]', '역사']]);
  expect(rec.changes.changed[0].from).toBe('지역의 문화유산을 통해 문화유산의 의미와 유형을 알아보고, 문화유산의 가치를 탐색한다.');
  expect(rec.snapshot).toBe('history/standards/20261005-120000Z-nec-2024-3-v7');
  const reg = JSON.parse(fs.readFileSync(path.join(cur, 'standards', 'v7.json'), 'utf8'));
  expect(reg.notice).toBe(NOTICE.no);
  expect(reg.prev).toBe('교육부 고시 제2022-33호');
  expect(reg.count).toBe(414);
  expect(reg.standards['[4사06-01]'].t).toBe(CHANGE7['[4사06-01]']);
  expect(reg.source).toEqual({ url: doc.url, file: doc.name, sha256: doc.sha256, bytes: doc.bytes });
  expect(fs.readFileSync(path.join(cur, rec.snapshot, 'v7.json'), 'utf8')).toBe(before);
  const man = JSON.parse(fs.readFileSync(path.join(cur, rec.snapshot, 'manifest.json'), 'utf8'));
  expect(man).toMatchObject({ notice: NOTICE.no, volume: 7, restores: ['standards/v7.json'], counts: { changed: 2 } });
  expect(R.readLog(cur).entries).toEqual([expect.objectContaining({ action: 'apply', id: 'nec-2024-3', volume: 7, snapshot: rec.snapshot })]);

  // notices.json 에 기록한 뒤 되돌리기
  store.notices[0].analysis = { status: 'applied', volumes: { 7: rec } };
  fs.writeFileSync(path.join(cur, 'notices.json'), JSON.stringify(store));
  const rb = R.rollback({ curDir: cur, at: '2026-10-06T09:00:00.000Z' });
  expect(rb.ok).toBe(true);
  expect(fs.readFileSync(path.join(cur, 'standards', 'v7.json'), 'utf8')).toBe(before);
  const after = JSON.parse(fs.readFileSync(path.join(cur, 'notices.json'), 'utf8')).notices[0].analysis;
  expect(after.status).toBe('manual');
  expect(after.volumes[7]).toMatchObject({ status: 'manual', rolledBack: true, reasons: ['사람이 자동 반영을 되돌렸어요(2026-10-06)'] });
  expect(R.readLog(cur).entries.map((e) => e.action)).toEqual(['apply', 'rollback']);
  expect(R.rollback({ curDir: cur }).error).toMatch(/되돌릴 자동 반영 기록이 없어요/);
});

test('반영: 같은 별책을 두 번 바꿨으면 최근 것부터 되돌린다, 판정만(apply:false)은 아무것도 바꾸지 않는다', () => {
  const cur = tmpCur([7]);
  const store = { notices: [clone(NOTICE)] };
  fs.writeFileSync(path.join(cur, 'notices.json'), JSON.stringify(store));
  const mk = (change, no) => {
    const buf = B.makeHwp(B.volumeLines(readReg(7), { notice: no, change }));
    return { url: 'https://www.ne.go.kr/f', name: '[별책 7] 사회과.hwp', buf, sha256: R.sha256(buf), bytes: buf.length };
  };
  const dry = R.judgeVolume({ curDir: cur, store, notice: store.notices[0], volume: 7, docs: [mk(CHANGE7, NOTICE.no)], apply: false });
  expect(dry.status).toBe('applied');
  expect(dry.snapshot).toBeUndefined();
  expect(fs.existsSync(path.join(cur, 'history'))).toBe(false);
  expect(JSON.parse(fs.readFileSync(path.join(cur, 'standards', 'v7.json'), 'utf8')).notice).toBe('교육부 고시 제2022-33호');

  const a = R.judgeVolume({ curDir: cur, store, notice: store.notices[0], volume: 7, docs: [mk(CHANGE7, NOTICE.no)], at: '2026-10-05T12:00:00.000Z' });
  const later = Object.assign(clone(NOTICE), { id: 'nec-2027-1', no: '국가교육위원회 고시 제2027-1호', date: '2027-01-10' });
  const t2 = readReg(7).standards['[4사06-02]'].t.replace(/다\.$/, '고, 알게 된 것을 발표한다.');
  const b = R.judgeVolume({ curDir: cur, store, notice: later, volume: 7, docs: [mk(Object.assign({}, CHANGE7, { '[4사06-02]': t2 }), later.no)], at: '2027-01-11T12:00:00.000Z' });
  expect([a.status, b.status]).toEqual(['applied', 'applied']);
  expect(b.counts.changed).toBe(1); // 앞 고시를 반영한 기준 자료와 견준다
  expect(R.rollback({ curDir: cur, snapshot: a.snapshot.split('/').pop() }).error).toMatch(/먼저 되돌리세요/);
  expect(R.rollback({ curDir: cur }).snapshot).toBe(b.snapshot);
  expect(R.rollback({ curDir: cur }).snapshot).toBe(a.snapshot);
  expect(JSON.parse(fs.readFileSync(path.join(cur, 'standards', 'v7.json'), 'utf8')).notice).toBe('교육부 고시 제2022-33호');
});

/* ---------- 매주 확인(curriculum-watch)의 분석 단계 ---------- */

test('매주 확인: 고시 글에 별책 원문 묶음(zip·CP949 이름)이 있으면 읽어 자동 반영, 다시 돌려도 바뀌는 것 없음', async () => {
  const cur = tmpCur();
  const zip = B.makeZip([
    { cp949Name: CP949['[별책7] 사회과 교육과정.hwp'], data: B.makeHwp(B.volumeLines(readReg(7), { notice: NOTICE.no, change: CHANGE7 })) },
    { cp949Name: CP949['[별책14] 영어과 교육과정.hwp'], data: B.makeHwp(B.volumeLines(readReg(14), { notice: NOTICE.no })), deflate: true },
  ]);
  const post = ATTACH('붙임3 「초·중등학교 교육과정」(일부개정) 국가교육위원회 고시 제2024-3호.hwpx', 'g1') + ATTACH('붙임5 [별책7_14] 사회과·영어과 교육과정.zip', 'z1');
  const net = fakeNet({ post, files: { z1: zip }, law: true });
  const store = { source: 'x', checkedPosts: [], notices: [clone(NOTICE)] };
  const r = await W.analyzeNotices(store, Object.assign({ curDir: cur, meta: META, at: '2026-10-05T12:00:00.000Z' }, net));
  const n = r.store.notices[0];
  expect(r.changed).toBe(true);
  expect(n.crossCheck).toEqual({ status: 'same' });
  expect(n.analysis.status).toBe('applied');
  expect(n.analysis.volumes[7]).toMatchObject({ status: 'applied', counts: { added: 0, removed: 0, changed: 2 }, source: { file: '[별책7] 사회과 교육과정.hwp', archive: '붙임5 [별책7_14] 사회과·영어과 교육과정.zip' } });
  expect(n.analysis.volumes[7].source.url).toBe('https://www.ne.go.kr/component/file/ND_fileDownload.do?q_fileSn=1&q_fileId=z1');
  expect(n.analysis.volumes[14].status).toBe('unchanged');
  expect(n.analysis.tried[0]).toEqual({ route: '국가교육위원회 법령자료', result: '별책 원문 2개 찾음' });
  expect(net.calls.filter((u) => /q_fileId=g1/.test(u))).toEqual([]); // 고시문 첨부는 별책 후보가 아니다
  // 카탈로그: 바뀐 성취기준을 그 코드를 쓰는 과정·단원에 잇는다(지도의 실제 단원 색인)
  const codes = { byCode: new Map([['[4사06-01]', [{ course: 'soc-e4', unit: 'soc-e4-06' }]], ['[9역10-04]', [{ course: 'hist-m-2', unit: 'hist-m-2-03' }]]]), byPrefix: new Map() };
  const cat = catalogNotices(r.store.notices, Object.assign({}, META, { covers: META.covers }), [], codes);
  const part = cat[0].parts.find((p) => p.name === '사회과');
  expect(part.status).toBe('applied');
  expect(part.changes.map((c) => [c.k, c.code, c.courses.join(), c.units.join()])).toEqual([['chg', '[4사06-01]', 'soc-e4', 'soc-e4-06'], ['chg', '[9역10-04]', 'hist-m-2', 'hist-m-2-03']]);
  expect(cat[0].parts.find((p) => p.name === '영어과').status).toBe('unchanged');
  // 다음 주: 이미 반영 → 다시 받지 않고 바뀌는 것 없음
  const before = net.calls.length;
  const again = await W.analyzeNotices(r.store, Object.assign({ curDir: cur, meta: META, at: '2026-10-12T12:00:00.000Z' }, net));
  expect(again.changed).toBe(false);
  expect(net.calls.length).toBe(before);
});

test('매주 확인: 행정예고본·신구대비표만 있거나 원문이 없으면 추측하지 않고 "수동 확인 필요" — 기준 자료는 그대로', async () => {
  const cur = tmpCur();
  const before = fs.readFileSync(path.join(cur, 'standards', 'v7.json'), 'utf8');
  const draft = B.hwpx(B.volumeLines(readReg(7), { notice: NOTICE.no, change: CHANGE7 }));
  const post = ATTACH('(별첨1) [별책 7] 사회과 교육과정 행정예고본.hwpx', 'd1') + ATTACH('(별첨3) [별책 7] 신구대비표.hwpx', 'd2');
  const net = fakeNet({ post, files: { d1: draft, d2: draft }, law: true });
  const r = await W.analyzeNotices({ notices: [clone(NOTICE)] }, Object.assign({ curDir: cur, meta: META, at: '2026-10-05T12:00:00.000Z' }, net));
  const a = r.store.notices[0].analysis;
  expect(a.status).toBe('manual');
  expect(a.volumes[7].reasons[0]).toMatch(/공식 경로에서 이 별책의 확정 원문 파일을 찾지 못했어요/);
  expect(a.tried.map((t) => t.result).join(' | ')).toMatch(/확정 전 문서.*행정예고본/);
  expect(net.calls.some((u) => /q_fileId=d[12]/.test(u))).toBe(false); // 확정 전 문서는 받지도 않는다
  expect(fs.readFileSync(path.join(cur, 'standards', 'v7.json'), 'utf8')).toBe(before);
  expect(fs.existsSync(path.join(cur, 'history'))).toBe(false);

  // 첨부가 고시문뿐(지금 실제와 같음) → 두 공식 경로를 다 보고 수동 확인
  const net2 = fakeNet({ post: ATTACH('붙임3 국가교육위원회 고시 제2024-3호.hwpx', 'g1'), law: true });
  const r2 = await W.analyzeNotices({ notices: [clone(NOTICE)] }, Object.assign({ curDir: cur, meta: META, at: '2026-10-05T12:00:00.000Z' }, net2));
  const a2 = r2.store.notices[0].analysis;
  expect(a2.volumes[7].reasons[0]).toMatch(/robots\.txt/);
  expect(a2.tried).toEqual([
    { route: '국가교육위원회 법령자료', result: '첨부 1개 중 별책 원문 없음(고시문만 있음)' },
    { route: '국가법령정보센터(행정규칙 초·중등학교 교육과정)', result: '첨부 1개 중 별책 원문 없음(고시문·제개정이유서만 있음)' },
  ]);
});

test('매주 확인: 두 공식 경로의 고시 내용이 다르면(시행일·별책) 반영하지 않는다, 관계없는 고시는 "none"', async () => {
  const cur = tmpCur();
  const zip = B.makeZip([{ cp949Name: CP949['[별책7] 사회과 교육과정.hwp'], data: B.makeHwp(B.volumeLines(readReg(7), { notice: NOTICE.no, change: CHANGE7 })) }]);
  const lawNotice = Object.assign(clone(NOTICE), { volumes: [{ n: 7, name: '사회과' }] }); // 국가법령정보센터 쪽은 별책 목록이 다르다
  const net = fakeNet({ post: ATTACH('[별책7] 사회과 교육과정.zip', 'z1'), files: { z1: zip }, law: true, lawNotice });
  const other = { id: 'nec-2025-9', no: '국가교육위원회 고시 제2025-9호', date: '2025-05-01', volumes: [{ n: 12, name: '음악과' }], effective: [{ date: '2026-03-01', grades: ['m1'] }] };
  const r = await W.analyzeNotices({ notices: [clone(NOTICE), other] }, Object.assign({ curDir: cur, meta: META, at: '2026-10-05T12:00:00.000Z' }, net));
  const n = r.store.notices.find((x) => x.id === 'nec-2024-3');
  expect(n.crossCheck.status).toBe('differs');
  expect(n.analysis.volumes[7].status).toBe('manual');
  expect(n.analysis.volumes[7].reasons.join(' ')).toMatch(/공식 경로 두 곳의 고시 내용이 달라요/);
  expect(r.store.notices.find((x) => x.id === 'nec-2025-9').analysis).toMatchObject({ status: 'none' });
  expect(JSON.parse(fs.readFileSync(path.join(cur, 'standards', 'v7.json'), 'utf8')).notice).toBe('교육부 고시 제2022-33호');
});

test('매주 확인: 사람이 되돌린 별책은 다시 자동 반영하지 않는다(--retry 전까지)', async () => {
  const cur = tmpCur();
  const zip = B.makeZip([{ cp949Name: CP949['[별책7] 사회과 교육과정.hwp'], data: B.makeHwp(B.volumeLines(readReg(7), { notice: NOTICE.no, change: CHANGE7 })) }]);
  const net = fakeNet({ post: ATTACH('[별책7] 사회과 교육과정.zip', 'z1'), files: { z1: zip }, law: false });
  const n = clone(NOTICE);
  n.analysis = { status: 'manual', volumes: { 7: { status: 'manual', reasons: ['사람이 자동 반영을 되돌렸어요(2026-10-06)'], rolledBack: true }, 14: { status: 'unchanged' } } };
  const r = await W.analyzeNotices({ notices: [n] }, Object.assign({ curDir: cur, meta: META, at: '2026-10-12T12:00:00.000Z' }, net));
  expect(r.changed).toBe(false);
  expect(r.store.notices[0].analysis.volumes[7].rolledBack).toBe(true);
  expect(net.calls.some((u) => /q_fileId=z1/.test(u))).toBe(false);
});

test('고시 찾기: 국가교육위원회 경로가 막히면 국가법령정보센터(연혁·첨부 고시문)로 같은 고시를 찾는다', async () => {
  const net = fakeNet({ law: true, blocked: ['https://www.ne.go.kr'] });
  const r = await W.collectNotices(Object.assign({ meta: META, store: { source: 'x', checkedPosts: [], notices: [] } }, net));
  expect(r.via).toBe('law');
  expect(r.fallbackWhy).toMatch(/robots\.txt/);
  expect(r.added.map((n) => [n.id, n.date, n.url])).toEqual([['nec-2024-3', '2024-08-16', 'https://www.law.go.kr/LSW/admRulInfoP.do?admRulSeq=222']]);
  expect(r.added[0].effective).toEqual(NOTICE.effective);
  // 둘 다 막히면 실패로 알린다
  await expect(W.collectNotices(Object.assign({ meta: META, store: { notices: [] } }, fakeNet({ law: false, blocked: ['https://www.ne.go.kr'] })))).rejects.toThrow(/국가법령정보센터.*도 읽지 못했어요/);
});

test('공식 경로 읽기: 국가법령정보센터(바로가기·연혁·첨부)·교육부(첨부 목록)의 실제 모양', () => {
  expect(X.parseLawFrame('<iframe id="lawService" src="/LSW//admRulInfoP.do?admRulSeq=2100000273516&amp;chrClsCd=010201"></iframe>')).toBe('2100000273516');
  const hst = '<a href="#AJAX" onclick="javascript:admRulViewHst(\'N\',\'2100000273516\');return false;" class="on"> 1. 초·중등학교 교육과정 </a><span>[시행 2026. 3. 1.] [국가교육위원회고시 제2026-1호, 2026. 1. 21., 일부개정]</span>' +
    '<a href="#AJAX" onclick="javascript:admRulViewHst(\'N\',\'2200000080747\');return false;"> 4. 초·중등학교 교육과정 [시행 2024. 3. 1.] [교육부고시 제2022-33호, 2022. 12. 22., 전부개정]</a>';
  expect(X.parseLawHistory(hst)).toEqual([
    { seq: '2100000273516', no: '국가교육위원회 고시 제2026-1호', date: '2026-01-21', kind: '일부개정' },
    { seq: '2200000080747', no: '교육부 고시 제2022-33호', date: '2022-12-22', kind: '전부개정' },
  ]);
  expect(X.parseLawAttachments('<li><a href="flDownload.do?flSeq=143731559" title="다운">국가교육위원회 고시 제2024-3호(초·중등학교 교육과정).hwp</a></li>'))
    .toEqual([{ name: '국가교육위원회 고시 제2024-3호(초·중등학교 교육과정).hwp', href: 'https://www.law.go.kr/LSW/flDownload.do?flSeq=143731559' }]);
  const moe = '<li>\n (붙임2)+[별책5_14]+국어+도덕+수학.zip\n [ 15.1 MB ]\n <a class="btnBorder" href="/boardCnts/fileDown.do?m=040401&amp;s=moe&amp;fileSeq=1512f" title="다운로드">';
  expect(X.parseMoeAttachments(moe)).toEqual([{ name: '(붙임2) [별책5_14] 국어 도덕 수학.zip', href: 'https://www.moe.go.kr/boardCnts/fileDown.do?m=040401&s=moe&fileSeq=1512f' }]);
  expect(X.mayContain('(붙임2) [별책5_14] 국어.zip', 7)).toBe(true);
  expect(X.mayContain('(붙임3) [별책15_22] 바슬즐.zip', 7)).toBe(false);
  expect(X.mayContain('사회과 교육과정.pdf', 7, '사회과')).toBe(true);
  expect(X.mayContain('붙임1. 고시문.pdf', 7, '사회과')).toBe(false);
});

/* ---------- 사람이 받은 파일(국가교육과정정보센터 등) ---------- */

test('사람이 받은 별책 파일: 같은 규칙으로 판정, 통과하면 --apply 로 반영, 주소가 공식이 아니면 거절', () => {
  const cur = tmpCur();
  const notice = Object.assign(clone(NOTICE), { analysis: { status: 'manual', volumes: { 7: { status: 'manual', reasons: ['공식 경로에서 …'] }, 14: { status: 'manual', reasons: ['…'] } } } });
  fs.writeFileSync(path.join(cur, 'notices.json'), JSON.stringify({ notices: [notice] }));
  const file = path.join(cur, '[별책7] 사회과 교육과정.hwp');
  fs.writeFileSync(file, B.makeHwp(B.volumeLines(readReg(7), { notice: NOTICE.no, change: CHANGE7 })));
  expect(CS.analyzeFile({ curDir: cur, file, notice: 'nec-2024-3', url: 'http://example.com/a.hwp' }).error).toMatch(/공식 기관/);
  expect(CS.analyzeFile({ curDir: cur, file, notice: 'nec-2099-1', url: 'https://www.ncic.go.kr/a' }).error).toMatch(/nec-2099-1/);
  const look = CS.analyzeFile({ curDir: cur, file, notice: 'nec-2024-3', volume: 7, url: 'https://www.ncic.go.kr/a' });
  expect(look.results[0]).toMatchObject({ volume: 7, applied: false, rec: { status: 'applied', counts: { changed: 2 } } });
  expect(JSON.parse(fs.readFileSync(path.join(cur, 'standards', 'v7.json'), 'utf8')).notice).toBe('교육부 고시 제2022-33호');
  const done = CS.analyzeFile({ curDir: cur, file, notice: 'nec-2024-3', volume: 7, url: 'https://www.ncic.go.kr/a', apply: true, at: '2026-10-07T00:00:00.000Z' });
  expect(done.results[0].applied).toBe(true);
  const saved = JSON.parse(fs.readFileSync(path.join(cur, 'notices.json'), 'utf8')).notices[0].analysis;
  expect(saved.volumes[7]).toMatchObject({ status: 'applied', by: 'manual-file' });
  expect(saved.status).toBe('manual'); // 별책 14 는 아직 수동 확인
  expect(JSON.parse(fs.readFileSync(path.join(cur, 'standards', 'v7.json'), 'utf8')).notice).toBe(NOTICE.no);
});

/* ---------- 지금 저장소의 기준 자료(공식 원문에서 뽑은 것) ---------- */

test('지금 저장소의 기준 자료: 다루는 별책 7권 · 공식 출처·sha256 · 지도의 성취기준 코드 1553개가 모두 들어 있다', () => {
  const r = CS.checkRegistries();
  expect(r.errors).toEqual([]);
  expect(r.stats.standards).toBe(2000);
  const counts = {};
  for (const v of [5, 6, 7, 8, 9, 14, 15]) {
    const reg = readReg(v);
    counts[v] = reg.count;
    expect(reg.notice).toBe('교육부 고시 제2022-33호');
    expect(reg.source.url).toMatch(/^https:\/\/www\.moe\.go\.kr\/boardCnts\/fileDown\.do\?/);
    expect(reg.source.post).toBe(CS.BASIS_POST);
    expect(reg.source.sha256).toMatch(/^[0-9a-f]{64}$/);
  }
  expect(counts).toEqual({ 5: 257, 6: 103, 7: 414, 8: 435, 9: 473, 14: 270, 15: 48 });
  expect(readReg(8).standards['[2수01-01]']).toEqual({ t: '수의 필요성을 인식하면서 0과 100까지의 수 개념을 이해하고, 수를 세고 읽고 쓸 수 있다.', c: '수학', a: '수와 연산', b: '초등학교 1~2학년' });
  expect(readReg(7).standards['[10한사1-01-01]'].c).toBe('한국사1');
  // 지금 기록된 고시들의 분석 결과는 정해진 값만
  const store = JSON.parse(fs.readFileSync(path.join(ROOT, 'curriculum', 'notices.json'), 'utf8'));
  for (const n of store.notices) {
    if (!n.analysis) continue;
    expect(['applied', 'unchanged', 'manual', 'none']).toContain(n.analysis.status);
    for (const v of Object.keys(n.analysis.volumes || {})) {
      const a = n.analysis.volumes[v];
      expect(['applied', 'unchanged', 'manual']).toContain(a.status);
      if (a.status === 'manual') expect(a.reasons.length).toBeGreaterThan(0);
      if (a.status === 'applied') expect(R.isOfficialUrl(a.source.url) || CS.manualUrlOk(a.source.url)).toBe(true);
    }
  }
});
