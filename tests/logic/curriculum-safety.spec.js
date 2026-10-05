const { test, expect } = require('@playwright/test');
const fs = require('fs');
const os = require('os');
const path = require('path');

/*
 * 교육과정 자동 반영 안정장치 — "절대로 일어나면 안 되는 일"을 실제 기준 자료(공식 원문에서 뽑은 사회과 414개)와 실제 지도로 시험한다.
 *   1) 같은 고시를 두 번 반영(멱등) 2) 파싱 일부 실패 상태에서 반영 3) 다른 학년 과정에 붙이기 4) 미래 판으로 지금 시행 판 덮어쓰기
 *   5) 수동 확인 복구 흐름(원문 지정 → 파싱 → 비교 → 검증 → 기록 → 수동 확인 해제 → 이슈 정리) 6) 판 해시 사슬·기록 무결성
 * (학생에게 언제 적용되는지 — 조기 적용·학년별 순차 적용 — 는 impact.spec.js)
 */
const H = require('./rev-helpers');
const B = require('./builders');
const { ROOT, R, readReg, META, NOTICE, CHANGE7, SAME, tmpCur, clone, doc7, judge, ATTACH, fakeNet, treeHash } = H;
const W = require(path.join(ROOT, 'scripts', 'curriculum-watch.js'));
const CS = require(path.join(ROOT, 'scripts', 'curriculum-standards.js'));
const { catalogChanges } = require(path.join(ROOT, 'scripts', 'build-catalog.js'));

const noFiles = (cur) => !fs.existsSync(path.join(cur, 'standards', 'versions')) && !fs.existsSync(path.join(cur, 'history'));

/* ---------- 1) 같은 고시를 두 번 반영하지 않는다 ---------- */

test('멱등: 같은 고시·같은 원문을 다시 판정하면 그대로(already) — 새 판·보관본·기록·해시가 하나도 늘지 않는다', () => {
  const cur = tmpCur([7]);
  const store = { notices: [clone(NOTICE)] };
  const a = judge(cur, store, store.notices[0], [doc7()]);
  store.notices[0].analysis = { status: a.status, volumes: { 7: a } };
  const snap = treeHash(cur);
  const logLen = R.readLog(cur).entries.length;
  // 같은 원문(파일 해시 같음)
  const again = judge(cur, store, store.notices[0], [doc7()]);
  expect(again.already).toBe(true);
  expect(again.status).toBe('scheduled');
  expect(again.version).toEqual(a.version);
  // 같은 내용이 다른 모양 파일(hwpx)로 와도(내용 해시 같음) 그대로
  const hwpx = B.hwpx(B.volumeLines(readReg(7), { notice: NOTICE.no, change: CHANGE7 }));
  const sameContent = judge(cur, store, store.notices[0], [{ url: 'https://www.law.go.kr/LSW/flDownload.do?flSeq=1', name: '[별책 7] 사회과.hwpx', buf: hwpx, sha256: R.sha256(hwpx), bytes: hwpx.length }]);
  expect(sameContent.already).toBe(true);
  expect(treeHash(cur)).toEqual(snap);
  expect(R.readLog(cur).entries.length).toBe(logLen);
  // 판 파일을 직접 다시 쓰려고 해도 막는다(마지막 방어선)
  expect(() => R.applyVolume({ curDir: cur, notice: store.notices[0], volume: 7, doc: Object.assign(doc7(), { parsed: R.readDoc('a.hwp', doc7().buf) }), diff: { added: [], removed: [], changed: [] } })).toThrow(/이미 기록된 판/);
  expect(treeHash(cur)).toEqual(snap);
});

test('멱등: 같은 고시에 다른 원문이 오면 겹쳐 쓰지 않고 수동 확인(conflict) — 기록된 판은 그대로', () => {
  const cur = tmpCur([7]);
  const store = { notices: [clone(NOTICE)] };
  const a = judge(cur, store, store.notices[0], [doc7()]);
  store.notices[0].analysis = { status: a.status, volumes: { 7: a } };
  const snap = treeHash(cur);
  const other = doc7(Object.assign({}, CHANGE7, { '[4사05-01]': readReg(7).standards['[4사05-01]'].t.replace(/다\.$/, '고 발표한다.') }));
  const r = judge(cur, store, store.notices[0], [other]);
  expect(r).toMatchObject({ status: 'manual', conflict: true });
  expect(r.reasons[0]).toMatch(/이미 다른 원문으로 기록돼 있어요 — 겹쳐 쓰지 않았어요/);
  expect(treeHash(cur)).toEqual(snap);
});

test('멱등: 같은 고시가 두 글에서 나와도 기록은 하나, 매주 다시 돌려도 새로 받거나 다시 기록하지 않는다', async () => {
  const gosi = B.hwpx(H.GOSI_LINES(NOTICE));
  const list = '<a href="BD_selectBbs.do?q_bbsSn=1016&amp;q_bbsDocNo=20240927163706792">「초·중등학교 교육과정」 일부개정 고시 안내</a>' +
    '<a href="BD_selectBbs.do?q_bbsSn=1016&amp;q_bbsDocNo=20240927163706799">「초·중등학교 교육과정」 일부개정 고시 안내(다시 올림)</a>';
  const post = (id) => '<p>붙임3 「초·중등학교 교육과정」 (일부개정) 국가교육위원회 고시 제2024-3호.hwpx</p><a href="/component/file/ND_fileDownload.do?q_fileSn=1&amp;q_fileId=' + id + '">다운로드</a>';
  const pages = {
    'https://www.ne.go.kr/user/bbs/BD_selectBbsList.do?q_bbsSn=1016': list,
    'https://www.ne.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1016&q_bbsDocNo=20240927163706792': post('a1'),
    'https://www.ne.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1016&q_bbsDocNo=20240927163706799': post('a2'),
  };
  const calls = [];
  const fake = {
    robots: async () => true, sleep: async () => {}, today: '2026-10-05',
    getText: async (u) => { calls.push(u); if (u in pages) return pages[u]; throw new Error('없는 주소 ' + u); },
    getBuffer: async (u) => { calls.push(u); return gosi; },
  };
  const r = await W.collectNotices(Object.assign({ meta: META, store: { source: 'x', checkedPosts: [], notices: [] } }, fake));
  expect(r.added.map((n) => n.id)).toEqual(['nec-2024-3']);
  expect(r.store.notices.length).toBe(1);
  const again = await W.collectNotices(Object.assign({ meta: META, store: r.store }, fake));
  expect(again.added).toEqual([]);
  expect(again.store.notices.length).toBe(1);
});

/* ---------- 2) 파싱이 일부라도 실패하면 반영하지 않는다 ---------- */

test('일부 실패: 정의 하나 빠짐·문장 잘림·과목 한 장 빠짐·다른 문장 겹침·과목 통째로 빠짐·깨진 파일 — 모두 수동 확인, 자료 그대로', () => {
  const lines = B.volumeLines(readReg(7), { notice: NOTICE.no, change: CHANGE7 });
  const firstExp = lines.indexOf('(가) 성취기준 해설');
  const codeLine = lines.findIndex((l) => l.startsWith('[4사06-01]'));
  const courseStart = (name) => lines.indexOf(name, lines.indexOf('차   례') + 30);
  const cut = (arr, from, to) => arr.slice(0, from).concat(arr.slice(to));
  const variants = {
    '정의 하나 빠짐(해설에만 남음)': (l) => cut(l, firstExp - 1, firstExp),
    '문장 잘림': (l) => l.map((x, i) => (i === codeLine ? x.replace(/다\.$/, '') : x)),
    '과목 한 장 빠짐(차례에는 있음)': (l) => cut(l, courseStart('동아시아 역사 기행'), courseStart('정치')),
    '같은 코드가 다른 문장으로': (l) => l.slice(0, codeLine + 1).concat(['[4사06-01] 전혀 다른 문장으로 다시 적었다.'], l.slice(codeLine + 1)),
    '과목이 통째로 빠짐(차례·본문 모두)': (l) => cut(l, courseStart('동아시아 역사 기행'), courseStart('정치')).filter((x) => !/^동아시아 역사 기행\t/.test(x)),
  };
  for (const [name, edit] of Object.entries(variants)) {
    const cur = tmpCur([7]);
    const store = { notices: [clone(NOTICE)] };
    const h0 = R.dataHash(cur);
    const r = judge(cur, store, store.notices[0], [doc7(null, null, { edit })]);
    expect(r.status, name).toBe('manual');
    expect(r.reasons.join(' '), name).toMatch(/구조를 확실히 읽지 못했어요|과목이 문서에서 빠졌어요/);
    expect(R.dataHash(cur), name).toBe(h0);
    expect(noFiles(cur), name).toBe(true);
  }
  // 깨진 파일·암호 걸린 파일
  for (const buf of [Buffer.from('이건 hwp 가 아니다'.repeat(100)), B.makeHwp(lines, { password: true })]) {
    const cur = tmpCur([7]);
    const store = { notices: [clone(NOTICE)] };
    const r = judge(cur, store, store.notices[0], [{ url: 'https://www.ne.go.kr/f', name: '[별책 7] 사회과.hwp', buf, sha256: R.sha256(buf), bytes: buf.length }]);
    expect(r.status).toBe('manual');
    expect(noFiles(cur)).toBe(true);
  }
});

/* ---------- 3) 다른 학년 과정에 붙이지 않는다 ---------- */

test('다른 학년: 바뀐 코드의 학년군과 그 코드를 쓰는 과정의 학년이 어긋나면 기록하지 않고, 카탈로그도 학년이 맞는 과정에만 잇는다', () => {
  // 지도가 잘못돼 초3~4 성취기준을 중1 과정이 쓰고 있다고 하자
  const cur = tmpCur([7]);
  const store = { notices: [clone(NOTICE)] };
  const wrong = { byCode: new Map([['[4사06-01]', [{ course: 'soc-m-1', unit: 'soc-m-1-01', grades: ['m1'] }]]]), byPrefix: new Map() };
  const r = judge(cur, store, store.notices[0], [doc7()], { map: wrong });
  expect(r.status).toBe('manual');
  expect(r.reasons.join(' ')).toMatch(/학년군이 그 코드를 쓰는 과정의 학년과 맞지 않아요.*\[4사06-01\]/);
  expect(noFiles(cur)).toBe(true);
  // 카탈로그: 학년이 맞지 않는 과정에는 잇지 않는다(변화를 버린다) · 맞는 과정만, 닿는 학년은 학년군 ∩ 과정 학년
  const courses = [{ id: 'soc-m-1', subject: 'soc', grades: ['m1'] }, { id: 'soc-e3', subject: 'soc', grades: ['e3'] }, { id: 'soc-e4', subject: 'soc', grades: ['e4'] }, { id: 'soc-34', subject: 'soc', grades: ['e3', 'e4', 'e5'] }];
  const part = { subjects: ['soc'], courses: [], except: [] };
  const ch = { changed: [{ code: '[4사06-01]', from: '옛 문장이다.', to: '새 문장이다.' }], added: [{ code: '[4사06-09]', text: '새 성취기준이다.' }], removed: [] };
  const badIdx = { byCode: new Map([['[4사06-01]', [{ course: 'soc-m-1', unit: 'soc-m-1-01' }]]]), byPrefix: new Map([['4사', new Set(['soc-m-1'])]]) };
  const out = catalogChanges(ch, part, courses, badIdx);
  // 학년이 맞지 않는 중1 과정(그 코드를 쓰는 단원 포함)에는 절대 잇지 않고, 이 별책에서 학년군(초3~4)이 맞는 과정에만 — 닿는 학년도 e3·e4 만
  expect(out.map((x) => [x.k, x.code, x.courses.join(), x.units.join(), x.grades.join()])).toEqual([
    ['chg', '[4사06-01]', 'soc-e3,soc-e4,soc-34', '', 'e3,e4'],
    ['add', '[4사06-09]', 'soc-e3,soc-e4,soc-34', '', 'e3,e4'],
  ]);
  expect(JSON.stringify(out)).not.toMatch(/soc-m-1|"m1"|"e5"/);
  const goodIdx = { byCode: new Map([['[4사06-01]', [{ course: 'soc-34', unit: 'soc-34-01' }]]]), byPrefix: new Map() };
  expect(catalogChanges({ changed: ch.changed }, part, courses, goodIdx).map((x) => [x.courses.join(), x.units.join(), x.grades.join()])).toEqual([['soc-34', 'soc-34-01', 'e3,e4']]);
});

/* ---------- 4) 미래 판으로 지금 시행 판을 덮어쓰지 않는다 ---------- */

test('미래 판: 시행 전 고시를 기록해도 지금 시행 판(기준 자료)·지도는 그대로, 상태는 scheduled 이고 학년별 시행일을 그대로 갖는다', () => {
  const cur = tmpCur([7]);
  const future = Object.assign(clone(NOTICE), { id: 'nec-2027-5', no: '국가교육위원회 고시 제2027-5호', date: '2027-08-01', discovered: '2027-08-03',
    effective: [{ date: '2028-03-01', grades: ['e1', 'e2', 'e3', 'e4', 'm1', 'h1'] }, { date: '2029-03-01', grades: ['e5', 'e6', 'm2', 'h2'] }, { date: '2030-03-01', grades: ['m3', 'h3'] }] });
  const store = { notices: [future] };
  const base = fs.readFileSync(path.join(cur, 'standards', 'v7.json'));
  const maps = Object.fromEntries(fs.readdirSync(cur).filter((f) => /\.json$/.test(f)).map((f) => [f, R.sha256(fs.readFileSync(path.join(cur, f)))]));
  const r = judge(cur, store, future, [doc7(null, future.no)], { at: '2027-08-03T00:00:00.000Z' });
  expect(r.status).toBe('scheduled');
  expect(r).toMatchObject({ noticeDate: '2027-08-01', discovered: '2027-08-03', verified: '2027-08-03', effective: future.effective });
  expect(fs.readFileSync(path.join(cur, 'standards', 'v7.json')).equals(base)).toBe(true);
  for (const [f, sha] of Object.entries(maps)) expect(R.sha256(fs.readFileSync(path.join(cur, f))), f).toBe(sha);
  // 상태는 마지막 시행일이 지나야만 active
  expect(R.phaseOf(future.effective, '2030-02-28')).toBe('scheduled');
  expect(R.phaseOf(future.effective, '2030-03-01')).toBe('active');
  const rec = clone(r);
  expect(R.refreshStatus(rec, '2029-12-31')).toBe(false);
  expect(R.refreshStatus(rec, '2030-03-01')).toBe(true);
  expect(rec).toMatchObject({ status: 'active', activated: '2030-03-01' });
});

/* ---------- 5) 수동 확인 복구 ---------- */

function manualStore() {
  const n = clone(NOTICE);
  n.crossCheck = { status: 'same' };
  n.analysis = { status: 'manual', volumes: { 7: { status: 'manual', reasons: ['공식 경로에서 이 별책의 확정 원문 파일을 찾지 못했어요'] }, 14: { status: 'manual', reasons: ['…'] } } };
  return { notices: [n] };
}
function writeDoc(dir, name, buf) { const f = path.join(dir, name); fs.writeFileSync(f, buf); return f; }
const NCIC = 'https://www.ncic.go.kr/mobile.dwn.ogf.inventoryList.do?orgAll=nec-2024-3';

test('복구: 공식 원문 지정 → 파싱 → 앞 판 비교 → 검증 → 새 판 기록 → 수동 확인 해제 → 이슈 닫기, 다시 넣으면 그대로', async () => {
  const cur = tmpCur(null, { full: true });
  fs.writeFileSync(path.join(cur, 'notices.json'), JSON.stringify(manualStore()));
  const file7 = writeDoc(cur, '[별책7] 사회과 교육과정.hwp', doc7().buf);
  const at = '2026-10-07T10:00:00.000Z';
  // 판정만(--apply 없음): 아무것도 쓰지 않는다
  const before = treeHash(cur);
  const look = await CS.recover({ curDir: cur, file: file7, notice: 'nec-2024-3', volume: 7, url: NCIC, apply: false, at });
  expect(look.results.map((x) => [x.outcome, x.rec.status, x.issue.action])).toEqual([['recorded', 'scheduled', null]]);
  expect(treeHash(cur)).toEqual(before);
  // 기록
  const done = await CS.recover({ curDir: cur, file: file7, notice: 'nec-2024-3', volume: 7, url: NCIC, apply: true, at });
  expect(done.changed).toBe(true);
  expect(done.results[0]).toMatchObject({ volume: 7, outcome: 'recorded', issue: { key: '[수동 확인 nec-2024-3 별책 7]', action: 'close' } });
  expect(done.results[0].issue.body).toMatch(/수동 확인 필요" 상태를 풀었어요/);
  const saved = JSON.parse(fs.readFileSync(path.join(cur, 'notices.json'), 'utf8')).notices[0];
  expect(saved.analysis.volumes[7]).toMatchObject({ status: 'scheduled', counts: { changed: 2 }, recovered: { at: '2026-10-07', by: 'manual-file', url: NCIC, file: '[별책7] 사회과 교육과정.hwp' } });
  expect(saved.analysis.status).toBe('manual'); // 별책 14 는 아직
  expect(R.fileSha(path.join(cur, saved.analysis.volumes[7].version.file))).toBe(saved.analysis.volumes[7].version.sha256);
  expect(CS.checkRegistries({ curDir: cur }).errors).toEqual([]);
  // 별책 14 원문(성취기준 그대로) → unchanged 로 수동 확인 해제 → 고시 전체가 scheduled
  const file14 = writeDoc(cur, '[별책14] 영어과 교육과정.hwp', B.makeHwp(B.volumeLines(readReg(14), { notice: NOTICE.no })));
  const d14 = await CS.recover({ curDir: cur, file: file14, notice: 'nec-2024-3', volume: 14, url: NCIC, apply: true, at });
  expect(d14.results[0]).toMatchObject({ outcome: 'unchanged', issue: { action: 'close' } });
  expect(JSON.parse(fs.readFileSync(path.join(cur, 'notices.json'), 'utf8')).notices[0].analysis.status).toBe('scheduled');
  // 같은 원문을 다시 넣으면: already, 아무것도 바뀌지 않음(이슈는 이미 닫혔으면 그대로)
  const snap = treeHash(cur);
  const again = await CS.recover({ curDir: cur, file: file7, notice: 'nec-2024-3', volume: 7, url: NCIC, apply: true, at: '2026-10-08T10:00:00.000Z' });
  expect(again.changed).toBe(false);
  expect(again.results[0].outcome).toBe('already');
  expect(treeHash(cur)).toEqual(snap);
  // 다른 원문이면 겹쳐 쓰지 않는다(conflict) — 기록·파일 그대로, 이슈에는 까닭 댓글만
  const otherBuf = doc7(Object.assign({}, CHANGE7, { '[4사05-01]': readReg(7).standards['[4사05-01]'].t.replace(/다\.$/, '고 발표한다.') })).buf;
  const conflict = await CS.recover({ curDir: cur, file: writeDoc(cur, '다른원문.hwp', otherBuf), notice: 'nec-2024-3', volume: 7, url: NCIC, apply: true, at });
  expect(conflict.results[0]).toMatchObject({ outcome: 'conflict', issue: { action: 'comment' } });
  expect(conflict.changed).toBe(false);
  fs.unlinkSync(path.join(cur, '다른원문.hwp'));
  expect(treeHash(cur)).toEqual(snap);
  // 그 뒤 매주 확인은 확인된 별책을 다시 받지 않는다
  const st = JSON.parse(fs.readFileSync(path.join(cur, 'notices.json'), 'utf8'));
  const net = fakeNet({ post: '', law: true });
  const w = await W.analyzeNotices(st, Object.assign({ curDir: cur, meta: META, at: '2026-10-12T12:00:00.000Z' }, net));
  expect(w.changed).toBe(false);
  expect(net.calls).toEqual([]);
});

test('복구: 조건을 통과하지 못한 원문·두 경로 확인 실패·잘못된 주소·파일은 아무것도 반영하지 않고 까닭만 남긴다', async () => {
  const cur = tmpCur();
  fs.writeFileSync(path.join(cur, 'notices.json'), JSON.stringify(manualStore()));
  const at = '2026-10-07T10:00:00.000Z';
  // 다른 고시의 원문(머리가 2022-33) — 판정 실패: 수동 확인 그대로 + 마지막 시도 기록 + 이슈 댓글
  const wrong = writeDoc(cur, 'old.hwp', B.makeHwp(B.volumeLines(readReg(7), { notice: '교육부 고시 제2022-33호' })));
  const r = await CS.recover({ curDir: cur, file: wrong, notice: 'nec-2024-3', volume: 7, url: NCIC, apply: true, at });
  expect(r.results[0]).toMatchObject({ outcome: 'manual', issue: { action: 'comment' } });
  expect(r.results[0].issue.body).toMatch(/머리에 "국가교육위원회 고시 제2024-3호 \[별책 7\]"이 있는 확정 원문이 없어요\(받은 파일의 머리: 교육부 고시 제2022-33호 \[별책 7\]\)/);
  const v7 = JSON.parse(fs.readFileSync(path.join(cur, 'notices.json'), 'utf8')).notices[0].analysis.volumes[7];
  expect(v7).toMatchObject({ status: 'manual', lastAttempt: { by: 'manual-file', file: 'old.hwp' } });
  expect(fs.existsSync(path.join(cur, 'standards', 'versions'))).toBe(false);
  // 두 공식 경로의 시행일이 아직 같다고 확인되지 않으면(확인 결과를 지운 뒤 다시 보니 다름) 기록하지 않는다
  const st = manualStore();
  delete st.notices[0].crossCheck;
  fs.writeFileSync(path.join(cur, 'notices.json'), JSON.stringify(st));
  const good = writeDoc(cur, 'good.hwp', doc7().buf);
  const rd = await CS.recover({ curDir: cur, file: good, notice: 'nec-2024-3', volume: 7, url: NCIC, apply: true, at, crossCheck: async () => ({ status: 'differs', note: '시행일이 달라요' }) });
  expect(rd.results[0].outcome).toBe('manual');
  expect(rd.results[0].rec.reasons.join(' ')).toMatch(/두 공식 경로.*아직 확인하지 못했어요/);
  expect(fs.existsSync(path.join(cur, 'standards', 'versions'))).toBe(false);
  // 잘못된 입력
  expect((await CS.recover({ curDir: cur, file: good, notice: 'nec-2024-3', volume: 7, url: 'http://blog.example.com/x', apply: true })).error).toMatch(/공식 기관 https/);
  expect((await CS.recover({ curDir: cur, file: good, notice: 'nec-2099-1', volume: 7, url: NCIC, apply: true })).error).toMatch(/nec-2099-1/);
  expect((await CS.recover({ curDir: cur, file: path.join(cur, '없는.hwp'), notice: 'nec-2024-3', volume: 7, url: NCIC, apply: true })).error).toMatch(/원문 파일이 없어요/);
  expect((await CS.recover({ curDir: cur, file: path.join(cur, 'meta.json'), notice: 'nec-2024-3', volume: 7, url: NCIC, apply: true })).error).toMatch(/읽을 수 있는 문서/);
});

test('복구: 이슈 정리 — 기록이 커밋된 뒤에만 닫고, 같은 댓글은 한 번만, 이미 같은 원문(already)은 바로 닫는다', () => {
  const issues = { 4: { number: 4, title: '교육과정 변경 감지 - 수동 확인 필요 [수동 확인 nec-2024-3 별책 7] 사회과', state: 'OPEN', comments: [] } };
  const calls = [];
  const gh = (args) => {
    calls.push(args.join(' '));
    if (args[0] === 'issue' && args[1] === 'list') return JSON.stringify(Object.values(issues).filter((i) => i.title.includes(args[5].replace(/^"|" in:title$/g, ''))).map((i) => ({ number: i.number, state: i.state, title: i.title })));
    if (args[1] === 'view') return JSON.stringify({ state: issues[args[2]].state, comments: issues[args[2]].comments });
    if (args[1] === 'comment') { issues[args[2]].comments.push({ body: args[4] }); return ''; }
    if (args[1] === 'close') { issues[args[2]].state = 'CLOSED'; return ''; }
    return '';
  };
  const res = [{ volume: 7, outcome: 'recorded', issue: { key: '[수동 확인 nec-2024-3 별책 7]', action: 'close', body: '새 판 기록' } }];
  // 커밋 실패(또는 전): 닫지 않는다
  expect(CS.finishIssues(res, { gh, committed: false })).toEqual([{ key: '[수동 확인 nec-2024-3 별책 7]', skipped: '커밋 전이라 닫지 않음' }]);
  expect(issues[4].state).toBe('OPEN');
  // 커밋 뒤: 댓글 + 닫기
  expect(CS.finishIssues(res, { gh, committed: true })).toEqual([{ key: '[수동 확인 nec-2024-3 별책 7]', number: 4, commented: true, closed: true }]);
  expect(issues[4].state).toBe('CLOSED');
  expect(issues[4].comments.length).toBe(1);
  // 다시 돌려도 같은 댓글을 또 달지 않는다
  CS.finishIssues(res, { gh, committed: true });
  expect(issues[4].comments.length).toBe(1);
  // already 는 커밋 없이도 닫는다(이미 저장소에 있는 기록)
  issues[4].state = 'OPEN';
  CS.finishIssues([{ volume: 7, outcome: 'already', issue: { key: '[수동 확인 nec-2024-3 별책 7]', action: 'close', body: '이미 같은 원문' } }], { gh, committed: false });
  expect(issues[4].state).toBe('CLOSED');
  // 이슈가 없으면 건너뛴다
  expect(CS.finishIssues([{ outcome: 'manual', issue: { key: '[수동 확인 nec-2099-1 별책 7]', action: 'comment', body: 'x' } }], { gh })).toEqual([{ key: '[수동 확인 nec-2099-1 별책 7]', skipped: '이슈 없음' }]);
});

test('복구(올려 두기): curriculum/incoming/<고시>/ 원문 + source.txt → 처리를 마친 원문은 지우고, 실패한 원문은 남긴다', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'tutor-in-'));
  const cur = tmpCur();
  fs.writeFileSync(path.join(cur, 'notices.json'), JSON.stringify(manualStore()));
  const dir = path.join(root, 'curriculum', 'incoming', 'nec-2024-3');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, '[별책7] 사회과 교육과정.hwp'), doc7().buf);
  fs.writeFileSync(path.join(dir, '[별책14] 영어과(잘못 받은 파일).hwp'), B.makeHwp(B.volumeLines(readReg(14), { notice: '교육부 고시 제2022-33호' })));
  fs.writeFileSync(path.join(dir, 'source.txt'), '받은 곳: ' + NCIC + '\n');
  const files = ['curriculum/incoming/nec-2024-3/[별책7] 사회과 교육과정.hwp', 'curriculum/incoming/nec-2024-3/[별책14] 영어과(잘못 받은 파일).hwp', 'curriculum/incoming/README.md'];
  const r = await CS.recoverIncoming({ curDir: cur, root, files, apply: true, at: '2026-10-07T10:00:00.000Z' });
  expect(r.changed).toBe(true);
  expect(r.items.map((x) => [path.basename(x.file), x.removed, x.results.map((y) => y.outcome).join()])).toEqual([
    ['[별책7] 사회과 교육과정.hwp', true, 'recorded'],
    ['[별책14] 영어과(잘못 받은 파일).hwp', false, 'manual'],
  ]);
  expect(fs.readdirSync(dir).sort()).toEqual(['[별책14] 영어과(잘못 받은 파일).hwp', 'source.txt']); // 실패한 원문·주소는 남는다
  const a = JSON.parse(fs.readFileSync(path.join(cur, 'notices.json'), 'utf8')).notices[0].analysis;
  expect([a.volumes[7].status, a.volumes[14].status]).toEqual(['scheduled', 'manual']);
});

test('복구 작업(curriculum-recover.yml): 입력은 환경 변수로만, 테스트 통과 뒤에만 커밋, 정해 둔 경로만, 이슈 정리, 매주 확인과 한 줄로', () => {
  const yml = fs.readFileSync(path.join(ROOT, '.github', 'workflows', 'curriculum-recover.yml'), 'utf8');
  expect(yml).toMatch(/paths: \['curriculum\/incoming\/\*\*'\]/);
  expect(yml).toContain('workflow_dispatch:');
  expect(yml).toContain('node scripts/curriculum-standards.js recover-ci');
  // 입력값을 run 안에 직접 넣지 않는다(셸 끼워 넣기 방지) — env 로만
  const lines = yml.split('\n');
  const runs = [];
  lines.forEach((l, i) => {
    const m = /^(\s*)run:\s*(.*)$/.exec(l);
    if (!m) return;
    if (m[2] && m[2] !== '|') { runs.push(m[2]); return; }
    for (let j = i + 1; j < lines.length && (!lines[j].trim() || lines[j].search(/\S/) > m[1].length); j++) runs.push(lines[j]);
  });
  expect(runs.length).toBeGreaterThan(5);
  expect(runs.join('\n')).not.toMatch(/\$\{\{\s*(inputs|github\.event)\./);
  expect(yml).toMatch(/NOTICE: \$\{\{ inputs\.notice \}\}/);
  expect(yml).toContain("steps.test.outcome == 'success'");
  expect(yml).toContain('npx playwright test');
  expect(yml).toContain('node scripts/curriculum-standards.js --check');
  expect(yml).toContain('git commit -F tmp/recover-commit.txt');
  expect(yml).not.toMatch(/git add (\.|-A|--all)(\s|$)/);
  expect(yml).toContain('--finish-issues tmp/recover-result.json');
  expect(yml).toMatch(/group: curriculum-watch/);
  expect(yml).not.toMatch(/\$\{\{\s*secrets\./);
  expect(fs.existsSync(path.join(ROOT, 'curriculum', 'incoming', 'README.md'))).toBe(true);
});

/* ---------- 6) 판 해시 사슬·기록 무결성 ---------- */

test('무결성 검사: 기록된 판 뒤에 앞 판이 바뀌거나, 판 파일이 바뀌거나, 주인 없는 판이 있으면 --check 가 잡는다', () => {
  const cur = tmpCur(null, { full: true });
  const store = { notices: [clone(NOTICE)] };
  const a = judge(cur, store, store.notices[0], [doc7()]);
  store.notices[0].analysis = { status: a.status, volumes: { 7: a } };
  fs.writeFileSync(path.join(cur, 'notices.json'), JSON.stringify(store));
  expect(CS.checkRegistries({ curDir: cur }).errors).toEqual([]);
  expect(CS.checkRegistries({ curDir: cur }).stats.versions).toBe(1);
  // 판 파일 내용이 바뀜
  const vf = path.join(cur, a.version.file);
  const good = fs.readFileSync(vf, 'utf8');
  fs.writeFileSync(vf, good.replace('국가유산의 의미와 유형을', '국가유산의 의미와 종류를'));
  expect(CS.checkRegistries({ curDir: cur }).errors.join(' ')).toMatch(/내용 해시가 맞지 않아요.*|해시가 달라요/);
  fs.writeFileSync(vf, good);
  // 앞 판(지금 시행 판)이 기록 뒤에 바뀜
  const bf = path.join(cur, 'standards', 'v7.json');
  const base = fs.readFileSync(bf, 'utf8');
  fs.writeFileSync(bf, base.replace('"count": 414', '"count": 414 '));
  expect(CS.checkRegistries({ curDir: cur }).errors.join(' ')).toMatch(/앞 판\(standards\/v7\.json\)이 기록 뒤에 바뀌었/);
  fs.writeFileSync(bf, base);
  // 주인 없는 판(기록이 없어짐)
  fs.writeFileSync(path.join(cur, 'notices.json'), JSON.stringify({ notices: [clone(NOTICE)] }));
  expect(CS.checkRegistries({ curDir: cur }).errors.join(' ')).toMatch(/주인 없는 판/);
});
