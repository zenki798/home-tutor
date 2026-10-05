const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/*
 * 교육과정 별책(성취기준) 자동 반영 — scripts/lib/revision.js · sources.js · curriculum-watch.js(analyzeNotices) · curriculum-standards.js
 *   새 고시가 고친 별책의 확정 원문을 공식 경로에서 찾아 규칙으로 읽고 사슬의 마지막 판과 비교한다.
 *   판정 조건을 모두 통과할 때만 새 판을 기록(scheduled/active — 지금 시행 판은 덮어쓰지 않음, 보관·해시·되돌리기),
 *   하나라도 불확실하면 기존 자료를 그대로 두고 "교육과정 변경 감지 - 수동 확인 필요".
 * 네트워크 없이: 공식 사이트 응답은 가짜로, 별책 문서는 시험 안에서 실제 기준 자료(공식 원문에서 뽑은 것)로 만든다.
 * (멱등·조기 적용·다른 학년·일부 실패·복구 시험은 curriculum-safety.spec.js)
 */
const H = require('./rev-helpers');
const B = require('./builders');
const { ROOT, R, readReg, META, NOTICE, CHANGE7, CP949, SAME, tmpCur, clone, doc7, judge, ATTACH, fakeNet, treeHash } = H;
const X = require(path.join(ROOT, 'scripts', 'lib', 'sources.js'));
const W = require(path.join(ROOT, 'scripts', 'curriculum-watch.js'));
const CS = require(path.join(ROOT, 'scripts', 'curriculum-standards.js'));
const { catalogNotices } = require(path.join(ROOT, 'scripts', 'build-catalog.js'));

/* ---------- 판정 조건 ---------- */

function smallReg() {
  const standards = {};
  for (let i = 1; i <= 25; i++) standards['[4사01-' + String(i).padStart(2, '0') + ']'] = { t: '사회 성취기준 ' + i + '번 문장을 탐구한다.', c: '사회', a: '영역', b: '초등학교 3~4학년' };
  return { volume: 7, notice: '교육부 고시 제2022-33호', standards, courses: [{ name: '사회', count: 25 }] };
}
function parsedFrom(reg, edit) {
  const standards = Object.keys(reg.standards).map((code) => ({ code, text: reg.standards[code].t, course: '사회', area: '영역', band: '초등학교 3~4학년' }));
  const p = { volume: 7, notice: NOTICE.no, standards, courses: [{ name: '사회', count: 25 }], issues: [], warnings: [] };
  if (edit) edit(p);
  return p;
}
const goodDoc = (parsed) => ({ url: 'https://www.ne.go.kr/component/file/ND_fileDownload.do?q_fileId=x', name: '[별책 7] 사회과 교육과정.hwp', parsed });

test('판정: 모든 조건을 지키면 통과, 조건마다 하나씩 어기면 그 까닭으로 막는다', () => {
  const reg = smallReg();
  const base = { notice: NOTICE, volume: 7, registry: reg, others: { 7: reg }, cross: SAME };
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
  expect(why({ doc: goodDoc(parsedFrom(reg)), later: ['국가교육위원회 고시 제2027-1호'] })).toMatch(/뒤에 나온 고시.*차례가 어긋나요/);
  expect(why({ doc: goodDoc(parsedFrom(reg)), notice: Object.assign({}, NOTICE, { effective: [] }) })).toMatch(/시행일/);
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { p.standards[0].course = null; })) })).toMatch(/어느 과목인지/);
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { p.standards.splice(0, 6); })) })).toMatch(/빠진 성취기준이 6개/);
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { p.standards.slice(0, 8).forEach((s) => { s.text += ' 그리고 더 깊이 살펴본다.'; }); })) })).toMatch(/바뀐 성취기준이 8개/);
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { for (let i = 0; i < 13; i++) p.standards.push({ code: '[4사09-' + String(i + 1).padStart(2, '0') + ']', text: '새 문장이다.', course: '사회', area: '영역', band: '초등학교 3~4학년' }); })) })).toMatch(/새 성취기준이 13개/);
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { p.standards[2].text = '하루를 건강하고 활기차게 지낸다.'; })) })).toMatch(/크게 달라진 성취기준이 1개.*\[4사01-03\]/);
  const other = { 8: { standards: { '[4사09-01]': { t: '수를 센다.' } } } };
  expect(why({ others: Object.assign({ 7: reg }, other), doc: goodDoc(parsedFrom(reg, (p) => { p.standards.push({ code: '[4사09-01]', text: '수를 센다.', course: '사회', area: '영역', band: '초등학교 3~4학년' }); })) })).toMatch(/다른 별책의 성취기준 코드와 겹쳐요: \[4사09-01\]\(별책 8\)/);
  expect(why({ registry: null, doc: goodDoc(parsedFrom(reg)) })).toMatch(/기준 성취기준 자료/);
});

test('판정(강화): 코드·과목·영역·학년군·학년 매핑·시행일·두 경로 확인 가운데 하나라도 불확실하면 막는다', () => {
  const reg = smallReg();
  const base = { notice: NOTICE, volume: 7, registry: reg, others: { 7: reg }, cross: SAME };
  const why = (patch) => R.assess(Object.assign({}, base, patch)).reasons.join(' | ');
  // 시행일: 두 공식 경로의 확인이 없거나(아직 안 실림·못 읽음) 다르면
  for (const cross of [undefined, { status: 'absent', note: '국가법령정보센터에 아직 실리지 않았어요' }, { status: 'error', note: '접속 실패' }, { status: 'differs', note: '시행일이 달라요' }]) {
    expect(why({ cross, doc: goodDoc(parsedFrom(reg)) })).toMatch(/두 공식 경로.*아직 확인하지 못했어요/);
  }
  // 과목 목록: 빠지거나 새로 생김
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { p.courses = [{ name: '사회', count: 24 }, { name: '새 과목', count: 1 }]; })) })).toMatch(/새 과목이 생겼어요.*새 과목/);
  expect(why({ registry: Object.assign({}, reg, { courses: [{ name: '사회', count: 20 }, { name: '역사', count: 5 }] }), doc: goodDoc(parsedFrom(reg)) })).toMatch(/앞 판에 있던 과목이 문서에서 빠졌어요.*역사/);
  // 코드: 새 과목 약어, 같은 코드의 과목·영역·학년군이 바뀜
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { p.standards.push({ code: '[4건01-01]', text: '건강하게 생활한다.', course: '사회', area: '영역', band: '초등학교 3~4학년' }); })) })).toMatch(/새 과목 약어.*4건/);
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { p.standards[0].area = '다른 영역'; })) })).toMatch(/과목·영역·학년군이 앞 판과 달라요.*\[4사01-01\]/);
  expect(why({ doc: goodDoc(parsedFrom(reg, (p) => { p.standards[1].band = '초등학교 5~6학년'; })) })).toMatch(/과목·영역·학년군이 앞 판과 달라요.*\[4사01-02\]/);
  // 학년 매핑: 바뀐 코드(학년군 초3~4)를 쓰는 과정이 다른 학년(중1)이면
  const changed = (p) => { p.standards[0].text = '사회 성취기준 1번 문장을 깊이 탐구한다.'; };
  const wrongMap = { byCode: new Map([['[4사01-01]', [{ course: 'soc-m-1', unit: 'soc-m-1-01', grades: ['m1'] }]]]), byPrefix: new Map() };
  expect(why({ map: wrongMap, doc: goodDoc(parsedFrom(reg, changed)) })).toMatch(/학년군이 그 코드를 쓰는 과정의 학년과 맞지 않아요.*soc-m-1/);
  // 새 코드: 같은 앞부분 과정이 있는데 학년이 하나도 맞지 않으면
  const prefixMap = { byCode: new Map(), byPrefix: new Map([['4사', new Map([['soc-m-1', ['m1']]])]]) };
  expect(why({ map: prefixMap, doc: goodDoc(parsedFrom(reg, (p) => { p.standards.push({ code: '[4사01-26]', text: '새 문장을 탐구한다.', course: '사회', area: '영역', band: '초등학교 3~4학년' }); })) })).toMatch(/학년군이 그 코드를 쓰는 과정의 학년과 맞지 않아요/);
  // 시행일: 바뀌는 과정의 학년(초4)이 부칙에 없으면
  const okMap = { byCode: new Map([['[4사01-01]', [{ course: 'soc-e4', unit: 'soc-e4-01', grades: ['e4'] }]]]), byPrefix: new Map() };
  const noE4 = Object.assign({}, NOTICE, { effective: [{ date: '2025-03-01', grades: ['e1', 'e2', 'e3'] }] });
  expect(why({ map: okMap, notice: noE4, doc: goodDoc(parsedFrom(reg, changed)) })).toMatch(/시행일이 없는 학년.*e4/);
  // 다 맞으면 통과하고, 이 변화가 닿는 학년(학년군 ∩ 과정 학년)을 알려 준다
  const good = R.assess(Object.assign({}, base, { map: okMap, doc: goodDoc(parsedFrom(reg, changed)) }));
  expect(good.reasons).toEqual([]);
  expect(good.grades).toEqual({ '[4사01-01]': ['e4'] });
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

/* ---------- 새 판 기록 · 보관 · 해시 · 되돌리기 (실제 사회과 기준 자료 + 실제 지도) ---------- */

test('기록: 지금 시행 판은 덮어쓰지 않고 새 판을 따로 쌓는다 — 고시일·발견일·검증일·시행일·앞 판 해시, 바뀐 것과 닿는 학년', () => {
  const cur = tmpCur([7]);
  const baseBefore = fs.readFileSync(path.join(cur, 'standards', 'v7.json'), 'utf8');
  const store = { notices: [clone(NOTICE)] };
  fs.writeFileSync(path.join(cur, 'notices.json'), JSON.stringify(store));
  const doc = doc7();
  const rec = judge(cur, store, store.notices[0], [doc]);
  expect(rec.status).toBe('scheduled'); // 2026-10-05 기준 중3·고3(2027-03-01)이 아직 시행 전
  expect(rec.counts).toEqual({ added: 0, removed: 0, changed: 2 });
  expect(rec.changes.changed.map((c) => [c.code, c.course, c.grades])).toEqual([['[4사06-01]', '사회', ['e4']], ['[9역10-04]', '역사', ['m3']]]);
  expect(rec.changes.changed[0].from).toBe('지역의 문화유산을 통해 문화유산의 의미와 유형을 알아보고, 문화유산의 가치를 탐색한다.');
  expect(rec).toMatchObject({ noticeDate: '2024-08-16', discovered: '2024-08-20', verified: '2026-10-05', effective: NOTICE.effective });
  // 지금 시행 판(기준 자료)은 한 글자도 바뀌지 않는다
  expect(fs.readFileSync(path.join(cur, 'standards', 'v7.json'), 'utf8')).toBe(baseBefore);
  expect(rec.version.file).toBe('standards/versions/v7/nec-2024-3.json');
  const ver = JSON.parse(fs.readFileSync(path.join(cur, rec.version.file), 'utf8'));
  expect(ver).toMatchObject({ volume: 7, notice: NOTICE.no, noticeId: 'nec-2024-3', noticeDate: '2024-08-16', discovered: '2024-08-20', verified: '2026-10-05', count: 414 });
  expect(ver.effective).toEqual(NOTICE.effective);
  expect(ver.prev).toEqual({ notice: '교육부 고시 제2022-33호', file: 'standards/v7.json', sha256: R.sha256(Buffer.from(baseBefore)) });
  expect(ver.contentSha256).toBe(R.contentHash(ver.standards));
  expect(ver.standards['[4사06-01]'].t).toBe(CHANGE7['[4사06-01]']);
  expect(ver.source).toEqual({ url: doc.url, file: doc.name, sha256: doc.sha256, bytes: doc.bytes });
  // 해시: 판 파일 · 앞 판 · 전체 자료(기록 직전·직후)
  expect(rec.version.sha256).toBe(R.fileSha(path.join(cur, rec.version.file)));
  expect(rec.prev).toEqual({ file: 'standards/v7.json', sha256: R.sha256(Buffer.from(baseBefore)) });
  expect(rec.dataHash.after).toBe(R.dataHash(cur));
  expect(rec.dataHash.before).not.toBe(rec.dataHash.after);
  const man = JSON.parse(fs.readFileSync(path.join(cur, rec.snapshot, 'manifest.json'), 'utf8'));
  expect(man).toMatchObject({ notice: NOTICE.no, volume: 7, status: 'scheduled', creates: ['standards/versions/v7/nec-2024-3.json'], counts: { changed: 2 } });
  expect(man.before).toEqual({ 'standards/versions/v7/nec-2024-3.json': null, 'standards/v7.json': R.sha256(Buffer.from(baseBefore)) });
  expect(man.after['standards/versions/v7/nec-2024-3.json']).toBe(rec.version.sha256);
  expect(fs.readFileSync(path.join(cur, rec.snapshot, 'v7.json'), 'utf8')).toBe(baseBefore); // 비교한 앞 판 보관
  expect(R.readLog(cur).entries).toEqual([expect.objectContaining({ action: 'apply', id: 'nec-2024-3', volume: 7, status: 'scheduled', snapshot: rec.snapshot, version: rec.version, dataHash: rec.dataHash })]);
  // 모든 학년의 시행일이 지난 뒤에 확인하면 active
  const cur2 = tmpCur([7]);
  const store2 = { notices: [clone(NOTICE)] };
  expect(judge(cur2, store2, store2.notices[0], [doc7()], { at: '2027-04-01T00:00:00.000Z' }).status).toBe('active');
});

test('되돌리기: 해시로 기록 직후 그대로인지 보고 판을 지운 뒤, 자료 전체가 기록 직전 해시로 돌아왔는지 확인한다', () => {
  const cur = tmpCur([7]);
  const store = { notices: [clone(NOTICE)] };
  fs.writeFileSync(path.join(cur, 'notices.json'), JSON.stringify(store));
  const before = R.dataHash(cur);
  const files0 = treeHash(path.join(cur, 'standards'));
  const rec = judge(cur, store, store.notices[0], [doc7()]);
  expect(rec.dataHash.before).toBe(before);
  store.notices[0].analysis = { status: 'scheduled', volumes: { 7: rec } };
  fs.writeFileSync(path.join(cur, 'notices.json'), JSON.stringify(store));
  // 기록 뒤에 누가 판 파일을 고쳤으면 자동으로 되돌리지 않는다
  const vf = path.join(cur, rec.version.file);
  const good = fs.readFileSync(vf);
  fs.writeFileSync(vf, good.toString('utf8').replace('국가유산', '국가 유산'));
  const refused = R.rollback({ curDir: cur });
  expect(refused.ok).toBe(false);
  expect(refused.error).toMatch(/기록 뒤에 파일이 바뀌어/);
  expect(fs.existsSync(vf)).toBe(true);
  fs.writeFileSync(vf, good);
  // 되돌리기
  const rb = R.rollback({ curDir: cur, at: '2026-10-06T09:00:00.000Z' });
  expect(rb.ok).toBe(true);
  expect(rb.dataHash.after).toBe(before); // 자료 전체 해시가 기록 직전과 같다
  expect(R.dataHash(cur)).toBe(before);
  expect(treeHash(path.join(cur, 'standards'))).toEqual(files0);
  expect(fs.existsSync(vf)).toBe(false);
  const after = JSON.parse(fs.readFileSync(path.join(cur, 'notices.json'), 'utf8')).notices[0].analysis;
  expect(after.status).toBe('manual');
  expect(after.volumes[7]).toMatchObject({ status: 'manual', rolledBack: true, reasons: ['사람이 자동 반영을 되돌렸어요(2026-10-06)'] });
  expect(R.readLog(cur).entries.map((e) => e.action)).toEqual(['apply', 'rollback']);
  expect(R.readLog(cur).entries[1].dataHash).toEqual({ before: rec.dataHash.after, after: before });
  expect(R.rollback({ curDir: cur }).error).toMatch(/되돌릴 자동 반영 기록이 없어요/);
});

test('사슬: 같은 별책의 다음 고시는 앞 판과 비교하고, 되돌리기는 최근 것부터 — 다 되돌리면 처음 해시', () => {
  const cur = tmpCur([7]);
  const store = { notices: [clone(NOTICE)] };
  fs.writeFileSync(path.join(cur, 'notices.json'), JSON.stringify(store));
  const h0 = R.dataHash(cur);
  const dry = judge(cur, store, store.notices[0], [doc7()], { apply: false });
  expect(dry.status).toBe('scheduled');
  expect(dry.snapshot).toBeUndefined();
  expect(fs.existsSync(path.join(cur, 'history'))).toBe(false); // 판정만은 아무것도 쓰지 않는다
  expect(R.dataHash(cur)).toBe(h0);
  const a = judge(cur, store, store.notices[0], [doc7()]);
  store.notices[0].analysis = { status: a.status, volumes: { 7: a } };
  const later = Object.assign(clone(NOTICE), { id: 'nec-2027-1', no: '국가교육위원회 고시 제2027-1호', date: '2027-01-10' });
  store.notices.push(later);
  const t2 = readReg(7).standards['[4사06-02]'].t.replace(/다\.$/, '고, 알게 된 것을 발표한다.');
  const b = judge(cur, store, later, [doc7(Object.assign({}, CHANGE7, { '[4사06-02]': t2 }), later.no)], { at: '2027-01-11T12:00:00.000Z' });
  expect([a.status, b.status]).toEqual(['scheduled', 'scheduled']);
  expect(b.counts.changed).toBe(1); // 앞 판(2024-3)과 견준다
  expect(b.prev.file).toBe('standards/versions/v7/nec-2024-3.json');
  expect(R.loadVersions(path.join(cur, 'standards'), 7).map((x) => x.data.noticeId)).toEqual(['nec-2024-3', 'nec-2027-1']);
  expect(R.rollback({ curDir: cur, snapshot: a.snapshot.split('/').pop() }).error).toMatch(/먼저 되돌리세요/);
  expect(R.rollback({ curDir: cur }).snapshot).toBe(b.snapshot);
  expect(R.rollback({ curDir: cur }).snapshot).toBe(a.snapshot);
  expect(R.dataHash(cur)).toBe(h0);
});

/* ---------- 매주 확인(curriculum-watch)의 분석 단계 ---------- */

test('매주 확인: 고시 글의 별책 원문 묶음(zip·CP949 이름)을 읽어 새 판 기록(scheduled) → 다음 주엔 바뀌는 것 없음 → 시행일이 다 지나면 active', async () => {
  const cur = tmpCur();
  const zip = B.makeZip([
    { cp949Name: CP949['[별책7] 사회과 교육과정.hwp'], data: doc7().buf },
    { cp949Name: CP949['[별책14] 영어과 교육과정.hwp'], data: B.makeHwp(B.volumeLines(readReg(14), { notice: NOTICE.no })), deflate: true },
  ]);
  const post = ATTACH('붙임3 「초·중등학교 교육과정」(일부개정) 국가교육위원회 고시 제2024-3호.hwpx', 'g1') + ATTACH('붙임5 [별책7_14] 사회과·영어과 교육과정.zip', 'z1');
  const net = fakeNet({ post, files: { z1: zip }, law: true });
  const store = { source: 'x', checkedPosts: [], notices: [clone(NOTICE)] };
  const base7 = fs.readFileSync(path.join(cur, 'standards', 'v7.json'), 'utf8');
  const r = await W.analyzeNotices(store, Object.assign({ curDir: cur, meta: META, at: '2026-10-05T12:00:00.000Z' }, net));
  const n = r.store.notices[0];
  expect(r.changed).toBe(true);
  expect(n.crossCheck).toEqual({ status: 'same' });
  expect(n.analysis.status).toBe('scheduled');
  expect(n.analysis.volumes[7]).toMatchObject({ status: 'scheduled', counts: { added: 0, removed: 0, changed: 2 }, source: { file: '[별책7] 사회과 교육과정.hwp', archive: '붙임5 [별책7_14] 사회과·영어과 교육과정.zip' } });
  expect(n.analysis.volumes[7].source.url).toBe('https://www.ne.go.kr/component/file/ND_fileDownload.do?q_fileSn=1&q_fileId=z1');
  expect(n.analysis.volumes[14].status).toBe('unchanged');
  expect(fs.readFileSync(path.join(cur, 'standards', 'v7.json'), 'utf8')).toBe(base7); // 지금 시행 판 그대로
  expect(n.analysis.tried[0]).toEqual({ route: '국가교육위원회 법령자료', result: '별책 원문 2개 찾음' });
  expect(net.calls.filter((u) => /q_fileId=g1/.test(u))).toEqual([]); // 고시문 첨부는 별책 후보가 아니다
  // 카탈로그: 바뀐 성취기준을 그 코드를 쓰는 과정·단원에, 닿는 학년(학년군 ∩ 과정 학년)과 함께 잇는다
  const courses = [{ id: 'soc-e4', subject: 'soc', grades: ['e4'] }, { id: 'hist-m-2', subject: 'hist', grades: ['m3'] }];
  const codes = { byCode: new Map([['[4사06-01]', [{ course: 'soc-e4', unit: 'soc-e4-03' }]], ['[9역10-04]', [{ course: 'hist-m-2', unit: 'hist-m-2-06' }]]]), byPrefix: new Map() };
  const cat = catalogNotices(r.store.notices, META, courses, codes);
  const part = cat[0].parts.find((p) => p.name === '사회과');
  expect(part.status).toBe('scheduled');
  expect(part.changes.map((c) => [c.k, c.code, c.courses.join(), c.units.join(), c.grades.join()])).toEqual([['chg', '[4사06-01]', 'soc-e4', 'soc-e4-03', 'e4'], ['chg', '[9역10-04]', 'hist-m-2', 'hist-m-2-06', 'm3']]);
  expect(cat[0].parts.find((p) => p.name === '영어과').status).toBe('unchanged');
  // 다음 주: 이미 기록 → 다시 받지 않고 바뀌는 것 없음
  const before = net.calls.length;
  const again = await W.analyzeNotices(r.store, Object.assign({ curDir: cur, meta: META, at: '2026-10-12T12:00:00.000Z' }, net));
  expect(again.changed).toBe(false);
  expect(net.calls.length).toBe(before);
  // 2027-03-01(중3·고3 시행)이 지나면 active 로만 바뀐다(다시 받지 않음, 판 파일 그대로)
  const verSha = R.fileSha(path.join(cur, 'standards', 'versions', 'v7', 'nec-2024-3.json'));
  const early = await W.analyzeNotices(again.store, Object.assign({ curDir: cur, meta: META, at: '2027-02-28T23:00:00.000Z' }, net));
  expect(early.changed).toBe(false);
  const later = await W.analyzeNotices(again.store, Object.assign({ curDir: cur, meta: META, at: '2027-03-01T09:00:00.000Z' }, net));
  expect(later.changed).toBe(true);
  expect(later.results[0]).toMatchObject({ refreshed: true, status: 'active' });
  expect(later.store.notices[0].analysis.volumes[7]).toMatchObject({ status: 'active', activated: '2027-03-01' });
  expect(net.calls.length).toBe(before);
  expect(R.fileSha(path.join(cur, 'standards', 'versions', 'v7', 'nec-2024-3.json'))).toBe(verSha);
});

test('매주 확인: 행정예고본·신구대비표만 있거나 원문이 없으면 추측하지 않고 "수동 확인 필요" — 자료는 그대로', async () => {
  const cur = tmpCur();
  const h0 = R.dataHash(cur);
  const draft = B.hwpx(B.volumeLines(readReg(7), { notice: NOTICE.no, change: CHANGE7 }));
  const post = ATTACH('(별첨1) [별책 7] 사회과 교육과정 행정예고본.hwpx', 'd1') + ATTACH('(별첨3) [별책 7] 신구대비표.hwpx', 'd2');
  const net = fakeNet({ post, files: { d1: draft, d2: draft }, law: true });
  const r = await W.analyzeNotices({ notices: [clone(NOTICE)] }, Object.assign({ curDir: cur, meta: META, at: '2026-10-05T12:00:00.000Z' }, net));
  const a = r.store.notices[0].analysis;
  expect(a.status).toBe('manual');
  expect(a.volumes[7].reasons[0]).toMatch(/공식 경로에서 이 별책의 확정 원문 파일을 찾지 못했어요/);
  expect(a.tried.map((t) => t.result).join(' | ')).toMatch(/확정 전 문서.*행정예고본/);
  expect(net.calls.some((u) => /q_fileId=d[12]/.test(u))).toBe(false); // 확정 전 문서는 받지도 않는다
  expect(R.dataHash(cur)).toBe(h0);
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

test('매주 확인: 두 공식 경로의 고시 내용이 다르거나 한쪽에 아직 없으면 기록하지 않는다, 관계없는 고시는 "none"', async () => {
  const zip = B.makeZip([{ cp949Name: CP949['[별책7] 사회과 교육과정.hwp'], data: doc7().buf }]);
  const other = { id: 'nec-2025-9', no: '국가교육위원회 고시 제2025-9호', date: '2025-05-01', volumes: [{ n: 12, name: '음악과' }], effective: [{ date: '2026-03-01', grades: ['m1'] }] };
  // 국가법령정보센터 쪽은 별책 목록이 다르다
  const cur = tmpCur();
  const lawNotice = Object.assign(clone(NOTICE), { volumes: [{ n: 7, name: '사회과' }] });
  const r = await W.analyzeNotices({ notices: [clone(NOTICE), other] }, Object.assign({ curDir: cur, meta: META, at: '2026-10-05T12:00:00.000Z' }, fakeNet({ post: ATTACH('[별책7] 사회과 교육과정.zip', 'z1'), files: { z1: zip }, law: true, lawNotice })));
  const n = r.store.notices.find((x) => x.id === 'nec-2024-3');
  expect(n.crossCheck.status).toBe('differs');
  expect(n.analysis.volumes[7].status).toBe('manual');
  expect(n.analysis.volumes[7].reasons.join(' ')).toMatch(/두 공식 경로.*아직 확인하지 못했어요/);
  expect(r.store.notices.find((x) => x.id === 'nec-2025-9').analysis).toMatchObject({ status: 'none' });
  expect(fs.existsSync(path.join(cur, 'standards', 'versions'))).toBe(false);
  // 국가법령정보센터에 아직 없거나(absent) 읽지 못하면(error)도 기다린다 — 실리면 다음 주에 다시 판정
  for (const [opt, status] of [[{ law: true, lawAbsent: true }, 'absent'], [{ law: false }, 'error']]) {
    const cur2 = tmpCur();
    const r2 = await W.analyzeNotices({ notices: [clone(NOTICE)] }, Object.assign({ curDir: cur2, meta: META, at: '2026-10-05T12:00:00.000Z' }, fakeNet(Object.assign({ post: ATTACH('[별책7] 사회과 교육과정.zip', 'z1'), files: { z1: zip } }, opt))));
    expect(r2.store.notices[0].crossCheck.status).toBe(status);
    expect(r2.store.notices[0].analysis.volumes[7].status).toBe('manual');
    expect(fs.existsSync(path.join(cur2, 'standards', 'versions'))).toBe(false);
  }
});

test('매주 확인: 사람이 되돌린 별책은 다시 자동 기록하지 않는다(--retry 전까지)', async () => {
  const cur = tmpCur();
  const zip = B.makeZip([{ cp949Name: CP949['[별책7] 사회과 교육과정.hwp'], data: doc7().buf }]);
  const net = fakeNet({ post: ATTACH('[별책7] 사회과 교육과정.zip', 'z1'), files: { z1: zip }, law: true });
  const n = clone(NOTICE);
  n.analysis = { status: 'manual', volumes: { 7: { status: 'manual', reasons: ['사람이 자동 반영을 되돌렸어요(2026-10-06)'], rolledBack: true }, 14: { status: 'unchanged' } } };
  const r = await W.analyzeNotices({ notices: [n] }, Object.assign({ curDir: cur, meta: META, at: '2026-10-12T12:00:00.000Z' }, net));
  expect(r.changed).toBe(false);
  expect(r.store.notices[0].analysis.volumes[7].rolledBack).toBe(true);
  expect(net.calls.some((u) => /q_fileId=z1/.test(u))).toBe(false);
});

test('고시 찾기: 국가교육위원회 경로가 막히면 국가법령정보센터(연혁·첨부 고시문)로 같은 고시를 찾고, 발견일을 따로 적는다', async () => {
  const net = fakeNet({ law: true, blocked: ['https://www.ne.go.kr'] });
  const r = await W.collectNotices(Object.assign({ meta: META, store: { source: 'x', checkedPosts: [], notices: [] }, today: '2026-10-05' }, net));
  expect(r.via).toBe('law');
  expect(r.fallbackWhy).toMatch(/robots\.txt/);
  expect(r.added.map((n) => [n.id, n.date, n.discovered, n.url])).toEqual([['nec-2024-3', '2024-08-16', '2026-10-05', 'https://www.law.go.kr/LSW/admRulInfoP.do?admRulSeq=222']]);
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

/* ---------- 지금 저장소의 기준 자료(공식 원문에서 뽑은 것) ---------- */

test('지금 저장소의 기준 자료: 다루는 별책 7권 · 공식 출처·sha256 · 지도의 성취기준 코드 1553개 · 기록과 판 파일이 서로 맞음', () => {
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
  // 지금 기록된 고시: 고시일·발견일·시행일을 따로, 분석 결과는 정해진 값만
  const store = JSON.parse(fs.readFileSync(path.join(ROOT, 'curriculum', 'notices.json'), 'utf8'));
  for (const n of store.notices) {
    expect(n.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(n.discovered).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(n.discovered >= n.date).toBe(true);
    expect(n.effective.length).toBeGreaterThan(0);
    if (!n.analysis) continue;
    expect(['scheduled', 'active', 'unchanged', 'manual', 'none']).toContain(n.analysis.status);
    for (const v of Object.keys(n.analysis.volumes || {})) {
      const a = n.analysis.volumes[v];
      expect(['scheduled', 'active', 'unchanged', 'manual']).toContain(a.status);
      if (a.status === 'manual') expect(a.reasons.length).toBeGreaterThan(0);
      if (a.status === 'scheduled' || a.status === 'active') expect(R.fileSha(path.join(ROOT, 'curriculum', a.version.file))).toBe(a.version.sha256);
    }
  }
});
