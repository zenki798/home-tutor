const { test, expect } = require('@playwright/test');
const fs = require('fs');
const os = require('os');
const path = require('path');
const zlib = require('zlib');

/*
 * 교육과정 고시 자동 반영 (AI·사람 없이) — scripts/lib/notices.js · scripts/curriculum-watch.js · build-catalog 의 notices
 *   국가교육위원회 법령자료 글 → 첨부 고시문(hwpx·pdf) → 고시 번호·날짜·바뀐 별책·학년별 시행일·새 과목 → curriculum/notices.json → 카탈로그
 * 네트워크 없이: 게시판·첨부는 가짜 응답으로, hwpx 는 시험 안에서 zip 으로 만든다.
 */
const ROOT = path.join(__dirname, '..', '..');
const N = require(path.join(ROOT, 'scripts', 'lib', 'notices.js'));
const { readZip } = require(path.join(ROOT, 'scripts', 'lib', 'zip.js'));
const W = require(path.join(ROOT, 'scripts', 'curriculum-watch.js'));
const { catalogNotices } = require(path.join(ROOT, 'scripts', 'build-catalog.js'));

/* ---------- 시험용 zip(hwpx) 만들기 ---------- */
function crc32(buf) {
  let crc = 0xffffffff;
  for (let n = 0; n < buf.length; n++) {
    let c = (crc ^ buf[n]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function makeZip(files) {
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const f of files) {
    const raw = Buffer.from(f.data, 'utf8');
    const data = f.deflate ? zlib.deflateRawSync(raw) : raw;
    const name = Buffer.from(f.name, 'utf8');
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x800, 6); lh.writeUInt16LE(f.deflate ? 8 : 0, 8);
    lh.writeUInt32LE(crc32(raw), 14); lh.writeUInt32LE(data.length, 18); lh.writeUInt32LE(raw.length, 22); lh.writeUInt16LE(name.length, 26);
    locals.push(lh, name, data);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0x800, 8); ch.writeUInt16LE(f.deflate ? 8 : 0, 10);
    ch.writeUInt32LE(crc32(raw), 16); ch.writeUInt32LE(data.length, 20); ch.writeUInt32LE(raw.length, 24); ch.writeUInt16LE(name.length, 28);
    ch.writeUInt32LE(offset, 42);
    centrals.push(ch, name);
    offset += 30 + name.length + data.length;
  }
  const cd = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat(locals.concat([cd, end]));
}
const xmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function hwpx(lines) {
  const xml = '<hs:sec xmlns:hs="x" xmlns:hp="y">' + lines.map((l) => '<hp:p><hp:run><hp:t>' + xmlEsc(l) + '</hp:t></hp:run></hp:p>').join('') + '</hs:sec>';
  return makeZip([{ name: 'mimetype', data: 'application/hwp+zip' }, { name: 'Contents/section0.xml', data: xml, deflate: true }]);
}

/* ---------- 실제 고시문과 같은 꼴의 글 ---------- */
const NOTICE_2024_3 = [
  '국가교육위원회 고시 제2024-3호',
  '　국가교육위원회법 제12조, 초⋅중등교육법 제23조제2항 및 제48조에 의거하여 초⋅중등학교 교육과정(교육부 고시 제2022-33호)을 다음과 같이 일부 개정하여 고시합니다. ',
  '2024년 8월 16일',
  '국가교육위원회위원장',
  ' 1. 초⋅중등학교 교육과정 총론은 【별책 1】과 같습니다. 다만, 【별책 1】에서 <표 6>의 고등학교 외국어⋅국제 계열 선택 과목 교육과정은 교육부 고시 제2015-74호의 【별책 23】에 따릅니다.',
  ' 2. 초등학교 교육과정은 【별책 2】와 같습니다.',
  ' 5. 사회과 교육과정은 【별책 7】과 같습니다.',
  ' 7. 영어과 교육과정은 【별책 14】와 같습니다. ',
  ' 11. 전문 교과 교육과정은 【별책 23~39】와 같습니다.',
  '부  칙',
  ' 1. 이 교육과정은 학교급별, 학년별로 다음과 같이 시행합니다. ',
  '   가. 2025년 3월 1일: 초등학교 1~4학년, 중학교 1학년, 고등학교 1학년',
  '   나. 2026년 3월 1일: 초등학교 5, 6학년, 중학교 2학년, 고등학교 2학년',
  '   다. 2027년 3월 1일: 중학교 3학년, 고등학교 3학년 ',
  '<참고>',
  '  ※ 국가교육위원회 홈페이지(www.ne.go.kr) > 자료실 > 법령자료',
];
const NOTICE_2015 = [
  '국가교육위원회 고시 제2024-1호',
  ' 초⋅중등교육법 제23조제2항에 의거하여 초⋅중등학교 교육과정(교육부 고시 제2015-74호)을 다음과 같이 일부 개정하여 고시합니다.',
  '2024년 8월 16일',
  ' 1. 영어과 교육과정은 【별책 14】와 같습니다.',
  '부 칙',
  '   가. 2025년 3월 1일: 고등학교 3학년',
];
// 통합본 PDF(pdftotext): 쪽 나눔 \f, 윈도 줄바꿈 \r\n, 맨 위의 "(…제2026-1호 일부개정 포함)" 은 머리글이 아니다, 총론 본문의 날짜는 부칙이 아니다
const CONSOLIDATED = [
  '        교육부 고시 제2022-33호 [별책 1]',
  '(국가교육위원회 고시 제2026-1호 일부개정 포함)',
  '',
  '초⋅중등학교 교육과정 총론',
  '\f\f교육부 고시 제2022-33호',
  '',
  '  초⋅중등교육법 제23조제2항, 제48조에 의거하여 초⋅중등학교 교육과정을 다음과 같이 고시한다.',
  '                                                     2022년 12월 22일',
  '   1. 초⋅중등학교 교육과정 총론은 【별책 1】과 같다.',
  '   15. 바른 생활, 슬기로운 생활, 즐거운 생활 교육과정은 【별책 15】와 같다.',
  '   25. 한국어 교육과정 【별책 41】과 같다.',
  '부 칙',
  '     가. 2024년 3월 1일：초등학교 1, 2학년',
  '  <참고>',
  '\f국가교육위원회 고시 제2026-1호',
  '',
  '  「국가교육위원회 설치 및 운영에 관한 법률」 제12조, 「초･중등교육법」 제23조제2항 및',
  '제48조에 의거하여 초·중등학교 교육과정(국가교육위원회 고시 제2024-3호, 2024. 8. 16.)의',
  '【별책 1】총론, 【별책 15】바른 생활, 슬기로운 생활, 건강한 생활, 즐거운 생활 교육과정을 일부',
  '개정하여 다음과 같이 고시합니다.',
  '                                                     2026년 1월 21일',
  '   1. 초‧중등학교 교육과정 총론은 【별책 1】과 같습니다.',
  '  5. 바른 생활, 슬기로운 생활, 건강한 생활, 즐거운 생활 교육과정은 【별책 15】와 같습니다.',
  '부 칙',
  '  1. 이 교육과정은 학교급별, 학년별로 다음과 같이 시행합니다.',
  '    가. 2026년 3월 1일: 고등학교 1, 2학년',
  '    다. 2028년 3월 1일: 초등학교 1, 2학년',
  '\f전부개정 교육부 고시 제2022-33호(2022.12.22.)',
  '일부개정 국가교육위원회 고시 제2026-1호(2026.1.21.)',
  '  초⋅중등학교 교육과정 총론',
  '    가. 2099년 3월 1일: 초등학교 1학년',
].join('\r\n');

const META = {
  basis: { no: '교육부 고시 제2022-33호', date: '2022-12-22' },
  volumes: { 7: '사회과', 14: '영어과', 15: '바른 생활, 슬기로운 생활, 즐거운 생활' },
  covers: { 6: { courses: ['soc-h-ethics'] }, 7: { subjects: ['soc', 'hist'], except: ['soc-h-ethics'] }, 14: { subjects: ['eng'] }, 15: { subjects: ['life'] } },
};

test('zip 읽기: 저장·deflate 항목, 없는 이름은 null, zip 이 아니면 throw', () => {
  const z = readZip(makeZip([{ name: 'a.txt', data: '가나다' }, { name: 'b/c.xml', data: '<x>라마바</x>'.repeat(50), deflate: true }]));
  expect(z.names).toEqual(['a.txt', 'b/c.xml']);
  expect(z.read('a.txt').toString('utf8')).toBe('가나다');
  expect(z.read('b/c.xml').toString('utf8')).toBe('<x>라마바</x>'.repeat(50));
  expect(z.read('없음')).toBeNull();
  expect(() => readZip(Buffer.from('zip 아님 zip 아님 zip 아님'))).toThrow();
});

test('hwpx 글자: 본문 XML 의 문단을 줄로, 표시 문자(&lt; 등)를 되살린다', () => {
  const t = N.hwpxText(hwpx(NOTICE_2024_3));
  expect(t.split('\n')[0]).toBe('국가교육위원회 고시 제2024-3호');
  expect(t).toContain('<표 6>');
  expect(t).toContain('가. 2025년 3월 1일: 초등학교 1~4학년, 중학교 1학년, 고등학교 1학년');
});

test('고시문 읽기(hwpx 고시문): 고시 번호·날짜·고친 대상·바뀐 별책(범위 포함)·학년별 시행일', () => {
  const [n] = N.parseNotices(N.hwpxText(hwpx(NOTICE_2024_3)));
  expect(n).toEqual({
    id: 'nec-2024-3', no: '국가교육위원회 고시 제2024-3호', date: '2024-08-16', amends: ['교육부 고시 제2022-33호'],
    volumes: [{ n: 1, name: '총론' }, { n: 2, name: '초등학교' }, { n: 7, name: '사회과' }, { n: 14, name: '영어과' }, { n: 23, to: 39, name: '전문 교과' }],
    effective: [
      { date: '2025-03-01', grades: ['e1', 'e2', 'e3', 'e4', 'm1', 'h1'] },
      { date: '2026-03-01', grades: ['e5', 'e6', 'm2', 'h2'] },
      { date: '2027-03-01', grades: ['m3', 'h3'] },
    ],
  });
});

test('고시문 읽기(여러 고시가 이어진 통합본 PDF): 머리글 줄만 고시로, 부칙 밖 날짜는 시행일이 아니다', () => {
  const list = N.parseNotices(CONSOLIDATED);
  expect(list.map((n) => n.id)).toEqual(['moe-2022-33', 'nec-2026-1']);
  const base = list[0];
  expect(base.date).toBe('2022-12-22');
  expect(base.volumes).toEqual([{ n: 1, name: '총론' }, { n: 15, name: '바른 생활, 슬기로운 생활, 즐거운 생활' }, { n: 41, name: '한국어' }]); // '은/는' 빠진 줄도
  const n = list[1];
  expect(n.date).toBe('2026-01-21');
  expect(n.amends).toEqual(['국가교육위원회 고시 제2024-3호']);
  expect(n.volumes.map((v) => v.n)).toEqual([1, 15]);
  expect(n.volumes[1].name).toBe('바른 생활, 슬기로운 생활, 건강한 생활, 즐거운 생활');
  expect(n.effective).toEqual([{ date: '2026-03-01', grades: ['h1', 'h2'] }, { date: '2028-03-01', grades: ['e1', 'e2'] }]); // 2099 는 총론 본문
});

test('학년 읽기: 범위(~)·쉼표·학교급 여럿, 없는 학년은 버린다', () => {
  expect(N.parseGrades('초등학교 1~4학년, 중학교 1학년, 고등학교 1, 2학년')).toEqual(['e1', 'e2', 'e3', 'e4', 'm1', 'h1', 'h2']);
  expect(N.parseGrades('초등학교 5, 6학년')).toEqual(['e5', 'e6']);
  expect(N.parseGrades('중학교 2∼7학년')).toEqual(['m2', 'm3']);
  expect(N.parseGrades('모든 학년')).toEqual([]);
});

test('기록에 더하기: 기준 고시 뒤 2022 계열만(고친 대상의 사슬), 새 과목 이름, 두 번 넣어도 그대로', () => {
  const parsed = N.parseNotices(N.hwpxText(hwpx(NOTICE_2024_3)))
    .concat(N.parseNotices(N.hwpxText(hwpx(NOTICE_2015))))
    .concat(N.parseNotices(CONSOLIDATED));
  const r = N.mergeNotices([], parsed, META);
  expect(r.added.map((n) => n.id)).toEqual(['nec-2024-3', 'nec-2026-1']); // 기준(2022-33)·2015 계열(2024-1)은 뺀다
  const n26 = r.notices.find((n) => n.id === 'nec-2026-1');
  expect(n26.volumes.find((v) => v.n === 15).newSubjects).toEqual(['건강한 생활']);
  expect(n26.volumes.find((v) => v.n === 1).newSubjects).toBeUndefined();
  const again = N.mergeNotices(r.notices, parsed, META);
  expect(again.added).toEqual([]);
  expect(again.notices).toEqual(r.notices);
  // 사슬이 끊기면(2024-3 없이 2026-1 만) 받아들이지 않는다 → 사람이 확인
  expect(N.mergeNotices([], N.parseNotices(CONSOLIDATED), META).added).toEqual([]);
});

const BOARD_HTML = '<ul>' +
  '<li><a href="BD_selectBbs.do?q_bbsSn=1016&amp;q_bbsDocNo=20260518112211473">「국가교육위원회 운영규칙 개정안」</a></li>' +
  '<li><a href="BD_selectBbs.do?q_bbsSn=1016&amp;q_bbsDocNo=20260121102419070">「초·중등학교 교육과정」및「특수교육 교육과정」일부개정 고시 안내</a></li>' +
  '<li><a href="BD_selectBbs.do?q_bbsSn=1016&amp;q_bbsDocNo=20240927163706792">「초&middot;중등학교 교육과정」및 「특수교육 교육과정」일부개정 고시 안내</a></li>' +
  '</ul>';
const fileItem = (name, id) => '<li><div class="file_name"><i class="ico"></i><p>' + name + '</p><span> (65 KB)</span></div>' +
  '<a href="/component/file/ND_fileDownload.do?q_fileSn=310&amp;q_fileId=' + id + '" title="다운로드"><span>다운로드</span></a></li>';
const POST_2024 = '<ul class="conts-board-file">' +
  fileItem('붙임1 (2015 개정 관련) ｢초·중등학교 교육과정｣ (일부개정) 국가교육위원회 고시 제2024-1호.hwpx', 'a1') +
  fileItem('붙임3 (2022 개정 관련) ｢초·중등학교 교육과정｣ (일부개정) 국가교육위원회 고시 제2024-3호.hwpx', 'a3') +
  fileItem('붙임4 (2022 개정 관련) ｢특수교육 교육과정｣ (일부개정) 국가교육위원회 고시 제2024-4호.hwpx', 'a4') + '</ul>';
const POST_2026 = '<ul class="conts-board-file">' +
  fileItem('붙임1. 「초·중등학교 교육과정」(일부개정) 국가교육위원회 고시 제2026-1호(2026.1.21.).hwpx', 'b1') + '</ul>';

test('게시판 읽기: 글 번호·제목, 첨부 이름·주소, 초·중등학교 교육과정 고시 글과 2022 계열 첨부만 고른다', () => {
  const posts = N.parseBoardList(BOARD_HTML);
  expect(posts.map((p) => p.docNo)).toEqual(['20260518112211473', '20260121102419070', '20240927163706792']);
  expect(posts.map((p) => N.isCurriculumTitle(p.title))).toEqual([false, true, true]);
  const files = N.parseAttachments(POST_2024);
  expect(files.map((f) => f.href)).toEqual([
    '/component/file/ND_fileDownload.do?q_fileSn=310&q_fileId=a1',
    '/component/file/ND_fileDownload.do?q_fileSn=310&q_fileId=a3',
    '/component/file/ND_fileDownload.do?q_fileSn=310&q_fileId=a4',
  ]);
  expect(files.map((f) => N.isCurriculumAttachment(f.name))).toEqual([false, true, false]); // 2015 개정·특수교육은 뺀다
  expect(N.isCurriculumAttachment('「초·중등학교 교육과정」 고시.hwp')).toBe(false);         // 옛 한글 파일은 읽지 못한다
});

// 가짜 인터넷: 주소 → 응답
function fakeNet(map) {
  const calls = [];
  return {
    calls,
    getText: async (url) => { calls.push(url); if (!(url in map)) throw new Error('없는 주소 ' + url); return map[url]; },
    getBuffer: async (url) => { calls.push(url); if (!(url in map)) throw new Error('없는 주소 ' + url); return map[url]; },
    robots: async () => true,
    sleep: async () => {},
  };
}
const consolidatedHwpx = () => hwpx(CONSOLIDATED.replace(/\f/g, '\n').split(/\r?\n/));

test('새 고시 모으기(가짜 인터넷): 오래된 글부터 첨부를 읽어 기록에 더하고, 다음 주에는 아무것도 다시 받지 않는다', async () => {
  const D = 'https://www.ne.go.kr/component/file/ND_fileDownload.do?q_fileSn=';
  const net = fakeNet({
    [W.NEC.origin + W.NEC.list]: BOARD_HTML,
    [W.NEC.view('20240927163706792')]: POST_2024,
    [W.NEC.view('20260121102419070')]: POST_2026,
    [D + '310&q_fileId=a3']: hwpx(NOTICE_2024_3),
    [D + '666&q_fileId=b1']: consolidatedHwpx(),
  });
  // 2026 글 첨부 주소를 가짜 표에 맞춘다
  net.getText = ((orig) => async (url) => (await orig(url)).replace('q_fileSn=310&amp;q_fileId=b1', 'q_fileSn=666&amp;q_fileId=b1'))(net.getText);
  const r = await W.collectNotices(Object.assign({ meta: META, store: { checkedPosts: [], notices: [] } }, net));
  expect(r.added.map((n) => n.id)).toEqual(['nec-2024-3', 'nec-2026-1']);
  expect(r.problems).toEqual([]);
  expect(r.changed).toBe(true);
  expect(r.store.checkedPosts).toEqual(['20240927163706792', '20260121102419070']);
  expect(r.store.notices[0].url).toBe(W.NEC.view('20240927163706792'));
  expect(net.calls.some((u) => /q_fileId=a1|q_fileId=a4/.test(u))).toBe(false);   // 2015·특수교육 첨부는 받지 않는다
  expect(net.calls.some((u) => u.includes('20260518112211473'))).toBe(false);       // 교육과정이 아닌 글은 열지 않는다

  const net2 = fakeNet({ [W.NEC.origin + W.NEC.list]: BOARD_HTML });
  const r2 = await W.collectNotices(Object.assign({ meta: META, store: r.store }, net2));
  expect(r2.changed).toBe(false);
  expect(r2.added).toEqual([]);
  expect(net2.calls).toEqual([W.NEC.origin + W.NEC.list]);                           // 목록 한 번만

  // robots.txt 가 막으면 아무것도 읽지 않고 throw
  const net3 = fakeNet({});
  net3.robots = async () => false;
  await expect(W.collectNotices(Object.assign({ meta: META, store: { checkedPosts: [], notices: [] } }, net3))).rejects.toThrow('robots');
  expect(net3.calls).toEqual([]);
});

test('읽지 못한 글은 "문제"로 알리고(이슈), 다시 받지 않게 확인 표시를 한다', async () => {
  const net = fakeNet({
    [W.NEC.origin + W.NEC.list]: BOARD_HTML.replace(/<li><a href="BD_selectBbs.do\?q_bbsSn=1016&amp;q_bbsDocNo=2024[\s\S]*?<\/li>/, ''),
    [W.NEC.view('20260121102419070')]: POST_2026,
    ['https://www.ne.go.kr/component/file/ND_fileDownload.do?q_fileSn=310&q_fileId=b1']: hwpx(['고시와 상관없는 글입니다.']),
  });
  const r = await W.collectNotices(Object.assign({ meta: META, store: { checkedPosts: [], notices: [] } }, net));
  expect(r.added).toEqual([]);
  expect(r.problems).toEqual([expect.objectContaining({ docNo: '20260121102419070', why: expect.stringContaining('읽지 못했어요') })]);
  expect(r.store.checkedPosts).toEqual(['20260121102419070']);
});

test('robots.txt 판단(RFC 9309): 2xx 는 규칙대로, 4xx 는 제한 없음, 5xx·연결 실패는 막힌 것으로', () => {
  expect(W.robotsVerdict(200, 'User-agent: *\nDisallow: /user/', '/user/bbs/BD_selectBbsList.do')).toBe(false);
  expect(W.robotsVerdict(200, 'User-agent: *\nDisallow: /search', '/user/bbs/BD_selectBbsList.do')).toBe(true);
  expect(W.robotsVerdict(400, '', '/x')).toBe(true);
  expect(W.robotsVerdict(404, '', '/x')).toBe(true);
  expect(W.robotsVerdict(503, '', '/x')).toBe(false);
  expect(W.robotsVerdict(0, '', '/x')).toBe(false);
});

test('예약 작업 유지: 마지막 커밋이 45일 넘으면 표시 파일을 고치고, 아니면 그대로', () => {
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'tutor-keep-')), 'status.json');
  const now = Date.parse('2026-10-05T00:00:00Z');
  expect(W.keepalive({ now, lastCommit: now - 10 * 86400000, file })).toBe(false);
  expect(fs.existsSync(file)).toBe(false);
  expect(W.keepalive({ now, lastCommit: now - 50 * 86400000, file })).toBe(true);
  expect(JSON.parse(fs.readFileSync(file, 'utf8')).lastKeepalive).toBe('2026-10-05');
});

test('카탈로그의 고시: 이 사이트가 다루는 교과만(과목·과정·제외 과정), 새 과목에는 이어지는 단원', () => {
  const notices = N.mergeNotices([], N.parseNotices(N.hwpxText(hwpx(NOTICE_2024_3))).concat(N.parseNotices(CONSOLIDATED)), META).notices;
  const courses = [{ id: 'life-e1', subject: 'life', grades: ['e1'], units: [
    { id: 'life-e1-07', title: '건강한 나의 하루', summary: '건강한 생활 습관을 알아봐요.' },
    { id: 'life-e1-08', title: '우리 마을', summary: '마을을 둘러봐요.' },
    { id: 'life-e1-09', title: '준비 중 단원', summary: '건강', soon: true },
  ] }];
  const cat = catalogNotices(notices, META, courses);
  expect(cat.map((n) => n.id)).toEqual(['nec-2024-3', 'nec-2026-1']);
  expect(cat[0].parts).toEqual([
    { name: '사회과', subjects: ['soc', 'hist'], courses: [], except: ['soc-h-ethics'] },
    { name: '영어과', subjects: ['eng'], courses: [], except: [] },
  ]); // 총론·초등학교·전문 교과처럼 단원 내용과 상관없는 별책은 parts 에 넣지 않는다
  expect(cat[0].volumes).toContain('전문 교과');
  expect(cat[1].parts).toEqual([{
    name: '바른 생활, 슬기로운 생활, 건강한 생활, 즐거운 생활', subjects: ['life'], courses: [], except: [],
    newSubjects: ['건강한 생활'], related: ['life-e1-07'],
  }]);
});

test('지금 저장소의 기록(curriculum/notices.json)은 형식이 맞고, 카탈로그에 실려 있다', () => {
  const store = JSON.parse(fs.readFileSync(path.join(ROOT, 'curriculum', 'notices.json'), 'utf8'));
  expect(Array.isArray(store.checkedPosts)).toBe(true);
  for (const n of store.notices) {
    expect(n.no).toMatch(/^(국가교육위원회|교육부) 고시 제\d{4}-\d+호$/);
    expect(n.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(n.effective.length).toBeGreaterThan(0);
    expect(n.url).toMatch(/^https:\/\/www\.ne\.go\.kr\//);
  }
  const catalog = fs.readFileSync(path.join(ROOT, 'data', 'catalog.js'), 'utf8');
  for (const n of store.notices) expect(catalog).toContain('"id":"' + n.id + '"');
});
