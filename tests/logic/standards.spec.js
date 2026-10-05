const { test, expect } = require('@playwright/test');
const path = require('path');

/*
 * 교육과정 문서 읽기(AI 없이 규칙만) — scripts/lib/hwp.js · xlsx.js · standards.js
 *   한글(hwp: 복합 문서 + 압축 레코드)·엑셀(xlsx) 글자 읽기, 별책 글자에서 성취기준(코드·문장·과목·영역·학년군) 뽑기,
 *   구조를 확실히 읽지 못하면 issues 로 알리기(→ 자동 반영하지 않음), 두 판 비교(추가·삭제·변경).
 * 시험 문서는 시험 안에서 만든다(tests/logic/builders.js). 실제 별책 원문으로 한 검증은 curriculum/standards/ 의 기준 자료와
 * revision.spec.js 의 "지금 저장소의 기준 자료" 시험이 맡는다.
 */
const ROOT = path.join(__dirname, '..', '..');
const B = require('./builders');
const { readCfb, hwpText } = require(path.join(ROOT, 'scripts', 'lib', 'hwp.js'));
const { xlsxSheets, xlsxText, colIndex } = require(path.join(ROOT, 'scripts', 'lib', 'xlsx.js'));
const S = require(path.join(ROOT, 'scripts', 'lib', 'standards.js'));

/* ---------- hwp ---------- */

test('hwp 읽기: 압축·비압축, 여러 구역, 제어 문자(확장 제어는 건너뛰고 탭은 살린다)', () => {
  const paras = ['교육부 고시 제2022-33호 [별책 8]', '수학과 교육과정', '탭\t뒤 글자', '[2수01-01] 수를 센다.'];
  const want = paras.join('\n');
  expect(hwpText(B.makeHwp(paras))).toBe(want);
  expect(hwpText(B.makeHwp(paras, { compress: false }))).toBe(want);
  expect(hwpText(B.makeHwp(paras, { ctrl: true }))).toBe(want);
  expect(hwpText(B.makeHwp(paras, { sections: 2 }))).toBe(want);
});

test('hwp 읽기: 큰 스트림(일반 섹터)과 작은 스트림(미니 스트림)이 섞인 복합 문서', () => {
  const big = Array.from({ length: 400 }, (_, i) => '아주 긴 문단 ' + i + ' 번째 문장입니다.');
  const buf = B.makeHwp(big, { compress: false });
  const cfb = readCfb(buf);
  expect(cfb.names.sort()).toEqual(['BodyText/Section0', 'FileHeader']);
  expect(cfb.read('FileHeader').length).toBe(256); // 미니 스트림
  expect(cfb.read('없는 것')).toBeNull();
  const lines = hwpText(buf).split('\n');
  expect(lines.length).toBe(400);
  expect(lines[399]).toBe('아주 긴 문단 399 번째 문장입니다.');
});

test('hwp 읽기: 암호·배포용 문서와 hwp 가 아닌 파일은 읽지 않는다(→ 수동 확인)', () => {
  expect(() => hwpText(B.makeHwp(['가'], { password: true }))).toThrow(/암호/);
  expect(() => hwpText(B.makeHwp(['가'], { distribute: true }))).toThrow(/배포용/);
  expect(() => hwpText(Buffer.from('이건 한글 문서가 아니다'.repeat(40)))).toThrow(/복합 문서/);
  const notHwp = B.makeCfb({ FileHeader: Buffer.alloc(256), 'BodyText/Section0': Buffer.alloc(10) });
  expect(() => hwpText(notHwp)).toThrow(/한글\(hwp\) 문서가 아니에요/);
});

/* ---------- xlsx ---------- */

test('xlsx 읽기: 시트 이름·순서, 공유 글자, 빈 칸 자리, 숫자', () => {
  const buf = B.makeXlsx([
    { name: '성취기준', rows: [['학년군', '코드', '성취기준'], ['초1~2', '[2수01-01]', '수를 센다.'], [null, '', 3]] },
    { name: '둘째', rows: [['가', '나']] },
  ]);
  const sh = xlsxSheets(buf);
  expect(sh.map((s) => s.name)).toEqual(['성취기준', '둘째']);
  expect(sh[0].rows).toEqual([['학년군', '코드', '성취기준'], ['초1~2', '[2수01-01]', '수를 센다.'], ['', '', '3']]);
  expect(xlsxText(buf)).toBe('[성취기준]\n학년군\t코드\t성취기준\n초1~2\t[2수01-01]\t수를 센다.\n\t\t3\n[둘째]\n가\t나');
  expect(colIndex('A1')).toBe(0);
  expect(colIndex('Z9')).toBe(25);
  expect(colIndex('AA10')).toBe(26);
  expect(() => xlsxSheets(B.makeZip([{ name: 'a.txt', data: 'x' }]))).toThrow(/엑셀/);
});

/* ---------- 성취기준 코드 ---------- */

test('성취기준 코드: 표준 꼴로(대시·en dash·로마 숫자·괄호 과목), 범위·오타 꼴은 코드가 아니다', () => {
  expect(S.canonCode('[2수01-01]')).toBe('[2수01-01]');
  expect(S.canonCode('[ 4사01–02 ]')).toBe('[4사01-02]');
  expect(S.canonCode('[10공수1-01-01]')).toBe('[10공수1-01-01]');
  expect(S.canonCode('[12대수01-01]')).toBe('[12대수01-01]');
  expect(S.canonCode('[12미적Ⅱ-01-03]')).toBe('[12미적Ⅱ-01-03]');
  expect(S.canonCode('[9사(지리)01-01]')).toBe('[9사(지리)01-01]');
  expect(S.canonCode('[12동역-01-01]')).toBe('[12동역01-01]'); // 원문 오타 꼴도 같은 코드로
  expect(S.canonCode('[12지구01-01∼02]')).toBeNull();
  expect(S.canonCode('[별책 8]')).toBeNull();
  expect(S.codeParts('[10공수1-01-02]')).toEqual({ band: 10, subj: '공수1', area: '01', seq: '02', prefix: '10공수1' });
});

/* ---------- 별책 글자 → 성취기준 ---------- */

// 실제 별책(교육부 고시 제2022-33호)에서 본 짜임을 그대로 흉내 낸다
const DOC = [
  '교육부 고시 제2022-33호 [별책 9]',
  '과학과 교육과정',
  '차   례',
  '[공통 교육과정]',
  '과학\t3',
  '[선택 중심 교육과정]',
  '통합과학1, 통합과학2\t75',
  '한국사1, 한국사2\t93',
  '',
  '과학',
  '1. 성격 및 목표',
  '가. 성격',
  '(1) 자연 현상을 탐구한다.',
  '2. 내용 체계 및 성취기준',
  '가. 내용 체계',
  '핵심 아이디어',
  '⋅[4과01-01] 표 안에서 부른 코드는 정의가 아니다',
  '나. 성취기준',
  '[초등학교 3∼4학년]',
  '(1) 힘과 우리 생활',
  '',
  '󰊱 물체의 무게',
  '[4과01-01] 물체를 밀거나 당길 때의 특징을 설명할 수 있다.',
  '[4과01-02] 무게를 비교할 수 있다.',
  '<탐구 활동>',
  '• 무거운 물체를 밀어 보기',
  '(가) 성취기준 해설',
  '[4과01-02] 이 성취기준은 정의가 아니라 해설이다. 이 줄은 성취기준 문장으로 읽지 않는다.',
  '(나) 성취기준 적용 시 고려 사항',
  '여러 물체를 써서 비교하게 한다.',
  '(6) 지구와 바다',
  '[4과06-01] 지구의 육지와 바다를 비교할 수 있다.',
  '[4과06–02] 밀물과 썰물의 차이를 안다.',
  '(가) 성취기준 해설',
  '[4과06-02] 조석 용어는 다루지 않는다.',
  '3. 교수⋅학습 및 평가',
  '통합과학1, 통합과학2',
  '1. 성격 및 목표',
  '2. 내용 체계 및 성취기준',
  '<통합과학1>',
  '가. 내용 체계',
  '나. 성취기준',
  '(1) 과학의 기초',
  '[10통과1-01-01] 시간과 공간을 측정하는 방법을 설명할 수 있다.',
  '<통합과학2>',
  '가. 내용 체계',
  '나. 성취기준',
  '(1) 변화와 다양성',
  '[10통과2-01-01] 지구 환경 변화를 설명할 수 있다.',
  '3. 교수⋅학습 및 평가',
  '한국사1, 한국사2',
  '1. 성격 및 목표',
  '2. 내용 체계 및 성취기준',
  '가. 내용 체계',
  '[한국사1]',
  '⋅내용 체계 표',
  '나. 성취기준',
  '[한국사 1]',
  '(1) 근대 이전 한국사의 이해',
  '[10한사1-01-01] 고대 국가의 형성과 성장 과정을 파악한다.',
  '[한국사 2]',
  '(1) 근대 국민 국가 수립 운동',
  '[10한사2-01-01] 근대 국민 국가 수립 운동을 탐구한다',
  '3. 교수⋅학습 및 평가',
];

test('별책 읽기(실제 짜임): 학년군 머리·영역·묶음 제목·탐구 활동·해설 줄을 가려 정의만, 과목 이름은 차례 순서로', () => {
  const r = S.parseStandards(DOC.join('\n'));
  expect(r.notice).toBe('교육부 고시 제2022-33호');
  expect(r.volume).toBe(9);
  expect(r.title).toBe('과학과 교육과정');
  expect(r.issues).toEqual([]);
  expect(r.standards.map((s) => s.code)).toEqual([
    '[4과01-01]', '[4과01-02]', '[4과06-01]', '[4과06-02]', '[10통과1-01-01]', '[10통과2-01-01]', '[10한사1-01-01]', '[10한사2-01-01]',
  ]);
  const by = Object.fromEntries(r.standards.map((s) => [s.code, s]));
  expect(by['[4과01-02]']).toEqual({ code: '[4과01-02]', text: '무게를 비교할 수 있다.', course: '과학', area: '힘과 우리 생활', band: '초등학교 3~4학년' });
  expect(by['[4과06-01]'].area).toBe('지구와 바다'); // "바다"로 끝나도 영역 머리
  expect(by['[4과06-02]'].text).toBe('밀물과 썰물의 차이를 안다.'); // en dash 코드
  expect(by['[10통과2-01-01]'].course).toBe('통합과학2'); // <통합과학2>
  expect(by['[10한사1-01-01]'].course).toBe('한국사1'); // 성취기준 구역 안의 [한국사 1]
  expect(by['[10한사2-01-01]'].course).toBe('한국사2');
  expect(r.warnings).toEqual(['[10한사2-01-01]: 문장 끝 마침표가 없어요']);
  expect(r.courses).toEqual([
    { name: '과학', count: 4 }, { name: '통합과학1', count: 1 }, { name: '통합과학2', count: 1 }, { name: '한국사1', count: 1 }, { name: '한국사2', count: 1 },
  ]);
});

test('별책 읽기(PDF 글자): 줄바꿈된 문장 잇기, 쪽 번호·되풀이 머리말 빼기, 홀로 남은 "한다." 꼬리 잇기', () => {
  const head = '과학과 교육과정';
  const lines = [
    '        교육부 고시 제2022-33호 [별책 9]', '', head, '차 례', '과학 ············· 3', '',
    '과학', '1. 성격 및 목표', '나. 성취기준', '[초등학교 3∼4학년]', '(1) 힘과 우리 생활', '',
    '[4과01-01] 물체를 밀거나 당길 때의 특징을 여러 가지 방법으로',
    '- 12 -', head,
    '설명할 수 있다.',
    '[4과01-02] 무게를 비교하는',
    '한다.',
    '[4과01-03] 저울을 쓴다.',
  ];
  // 쪽마다 되풀이되는 머리말
  for (let i = 0; i < 5; i++) lines.push('- ' + (13 + i) + ' -', head, '본문 ' + i + '은 문장이다.');
  for (let i = 0; i < 5; i++) lines.push('홀로 남은 꼬리', '한다.');
  const r = S.parseStandards(lines.join('\n'));
  expect(r.issues).toEqual([]);
  const t = Object.fromEntries(r.standards.map((s) => [s.code, s.text]));
  expect(t['[4과01-01]']).toBe('물체를 밀거나 당길 때의 특징을 여러 가지 방법으로 설명할 수 있다.');
  expect(t['[4과01-02]']).toBe('무게를 비교하는 한다.');
  expect(t['[4과01-03]']).toBe('저울을 쓴다.');
});

test('확실히 읽지 못하면 issues(→ 자동 반영 안 함): 정의 없는 코드, 다른 문장으로 두 번, 학년군·영역 번호 어긋남, 문장 끝 없음, 과목 수 어긋남', () => {
  const base = ['교육부 고시 제2022-33호 [별책 8]', '수학과 교육과정', '차   례', '수학\t3', '수학', '1. 성격 및 목표', '나. 성취기준', '[초등학교 1∼2학년]', '(1) 수와 연산'];
  const run = (more) => S.parseStandards(base.concat(more).join('\n')).issues.join(' | ');
  expect(run(['[2수01-01] 수를 센다.', '(가) 성취기준 해설', '[2수01-02] 정의 없이 해설만 있다.'])).toMatch(/\[2수01-02\]\(\d+줄\)/);
  expect(run(['[2수01-01] 수를 센다.', '[2수01-01] 다른 문장이다.'])).toMatch(/같은 코드가 두 번, 다른 문장/);
  expect(run(['[4수01-01] 학년군이 다르다.'])).toMatch(/학년군 숫자가 달라요/);
  expect(run(['[2수02-01] 영역 번호가 다르다.'])).toMatch(/영역 번호가 02/);
  expect(run(['[2수01-01] 문장이 끝나지 않고 잘린 것 같은']).length).toBeGreaterThan(0);
  expect(S.parseStandards(base.concat(['[2수01-01] 수를 센다.', '3. 교수⋅학습 및 평가', '1. 성격 및 목표']).join('\n')).issues.join(' ')).toMatch(/차례의 과목 수\(1\)와 본문의 과목 수\(2\)/);
  expect(S.parseStandards('아무 글자').issues).toContain('성취기준을 하나도 찾지 못했어요');
  // 같은 코드·같은 문장이 두 번(띄어쓰기만 다름)은 괜찮다
  expect(run(['[2수01-01] 수를 센다.', '[2수01-01] 수를  센다.'])).toBe('');
});

test('표(엑셀)로 된 성취기준: 코드 칸 + "다."로 끝나는 가장 긴 칸, 문장 칸이 없으면 issue', () => {
  const r = S.parseStandardsRows([
    ['학년군', '코드', '성취기준', '비고'],
    ['초1~2', '[2수01-01]', '수의 필요성을 인식하면서 수를 센다.', '짧다.'],
    ['초1~2', '[2수01–02]', '자릿값을 이해하고 수를 읽고 쓴다.', ''],
    ['', '[2수01-03]', '', '메모'],
  ]);
  expect(r.standards.map((s) => [s.code, s.text])).toEqual([['[2수01-01]', '수의 필요성을 인식하면서 수를 센다.'], ['[2수01-02]', '자릿값을 이해하고 수를 읽고 쓴다.']]);
  expect(r.issues.join(' ')).toMatch(/\[2수01-03\]: 성취기준 문장 칸을 찾지 못했어요/);
});

test('두 판 비교: 추가·삭제·변경(닮은 정도), 띄어쓰기·가운뎃점 모양만 다르면 같은 것', () => {
  const a = { '[4사06-01]': '지역의 문화유산을 통해 문화유산의 가치를 탐색한다.', '[4사06-02]': '옛날과 오늘날의 생활 모습을 비교한다.', '[4사06-03]': '지역의 역사적 인물을 조사한다.' };
  const b = { '[4사06-01]': '지역의 국가유산을 통해 국가유산의 가치를 탐색한다.', '[4사06-02]': '옛날과  오늘날의 생활⋅모습을 비교한다', '[4사06-04]': '새 성취기준이다.' };
  b['[4사06-02]'] = '옛날과  오늘날의 생활 모습을 비교한다';
  const d = S.diffStandards(a, b);
  expect(d.added).toEqual([{ code: '[4사06-04]', text: '새 성취기준이다.' }]);
  expect(d.removed).toEqual([{ code: '[4사06-03]', text: '지역의 역사적 인물을 조사한다.' }]);
  expect(d.changed.map((c) => c.code)).toEqual(['[4사06-01]']);
  expect(d.changed[0].sim).toBeGreaterThan(0.7);
  expect(d.same).toBe(1);
  expect(S.similarity('하루를 건강하게 지낸다.', '여러 가지 악곡을 듣고 반응한다.')).toBeLessThan(0.35);
  expect(S.compareKey('생활⋅모습 ')).toBe(S.compareKey('생활·모습'));
});
