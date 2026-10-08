const { test, expect } = require('@playwright/test');
const path = require('path');

/*
 * 보호자용 학습 요약 — js/summary.js (지금 학생 한 명의 기록만, 이 기기 안에서만 계산)
 *   기간은 오늘을 포함한 최근 7일·30일. 날짜는 그 기기의 날짜. 이해 확인(level 0)은 '푼 문제'와 따로 센다.
 */
const M = require(path.join(__dirname, '..', '..', 'js', 'summary.js'));

function at(m, d, h = 12) { return new Date(2026, m - 1, d, h).getTime(); }
const TODAY = '2026-10-08';
const INFO = {
  'math-m2-01': { subject: 'math', subjectName: '수학', title: '일차부등식' },
  'math-m2-02': { subject: 'math', subjectName: '수학', title: '연립일차방정식' },
  'sci-e5-01': { subject: 'sci', subjectName: '과학', title: '물질의 용해' },
};
const unitInfo = (id) => INFO[id] || null;

function att(m, d, unit, ok, extra) { return Object.assign({ t: at(m, d), unit, level: 1, ok }, extra); }

const ATTEMPTS = [
  att(9, 20, 'math-m2-01', false, { cause: '부호를 바꾸지 않았어요' }), // 7일 밖, 30일 안
  att(10, 2, 'math-m2-01', true),                                      // 7일 밖(10-02 < 10-02? from=10-02 → 안)
  att(10, 3, 'math-m2-01', true),
  att(10, 3, 'math-m2-01', true),
  att(10, 5, 'math-m2-01', true),
  att(10, 6, 'math-m2-02', false, { cause: '두 식을 더하지 않고 뺐어요' }),
  att(10, 6, 'math-m2-02', false, { cause: '두 식을 더하지 않고 뺐어요' }),
  att(10, 7, 'math-m2-02', false, { cause: '부호를 바꾸지 않았어요' }),
  att(10, 7, 'math-m2-02', true),
  att(10, 8, 'sci-e5-01', true),
  att(10, 8, 'sci-e5-01', false, { level: 0, pid: 'check-0' }),        // 이해 확인
  att(10, 8, 'sci-e5-01', true, { level: 0, pid: 'check-1' }),
];

test('최근 7일: 날짜별·과목별·단원별, 이해 확인은 따로', () => {
  const s = M.build({
    attempts: ATTEMPTS, days: ['2026-09-20', '2026-10-03', '2026-10-06', '2026-10-08', '2026-10-08'],
    progress: {
      'math-m2-01': { seen: [0, 1, 2], cards: 4, last: at(10, 5) },
      'sci-e5-01': { seen: [0], cards: 3, last: at(10, 8) },
      'math-m2-02': { seen: [], cards: 3, last: at(9, 1) },               // 기간 밖
    },
    notes: [{ key: 'a' }, { key: 'b' }], reports: [{ unit: 'x', ref: 'p1' }],
  }, { today: TODAY, period: 7, unitInfo, due: 1 });

  expect(s).toMatchObject({ from: '2026-10-02', to: '2026-10-08', period: 7, studyDays: 3 });
  expect(s.solved).toBe(9);    // 10-02 ~ 10-08 의 level 1 문제
  expect(s.correct).toBe(6);
  expect(s.rate).toBe(67);
  expect(s.checks).toBe(2);
  expect(s.checksOk).toBe(1);
  expect(s.daily.map((d) => d.date)).toEqual(['2026-10-02', '2026-10-03', '2026-10-04', '2026-10-05', '2026-10-06', '2026-10-07', '2026-10-08']);
  expect(s.daily.map((d) => d.n)).toEqual([1, 2, 0, 1, 2, 2, 3]);
  expect(s.bySubject).toEqual([
    { subject: 'math', name: '수학', n: 8, c: 5, rate: 63 },
    { subject: 'sci', name: '과학', n: 1, c: 1, rate: 100 },
  ]);
  expect(s.strong.map((u) => u.title)).toEqual(['일차부등식']);      // 4문제 100%
  expect(s.weak.map((u) => u.title)).toEqual(['연립일차방정식']);    // 4문제 25%
  expect(s.causes).toEqual([{ text: '두 식을 더하지 않고 뺐어요', n: 2 }, { text: '부호를 바꾸지 않았어요', n: 1 }]);
  expect(s.studied.map((u) => u.unit)).toEqual(['sci-e5-01', 'math-m2-01']);
  expect(s.studied[1]).toMatchObject({ title: '일차부등식', seen: 3, cards: 4 });
  expect(s).toMatchObject({ notes: 2, due: 1, reports: 1, partial: false });
});

test('최근 30일은 더 앞의 기록까지, 1문제만 푼 단원은 잘한·더 연습할 단원에 넣지 않는다', () => {
  const s = M.build({ attempts: ATTEMPTS }, { today: TODAY, period: 30, unitInfo });
  expect(s.from).toBe('2026-09-09');
  expect(s.daily).toHaveLength(30);
  expect(s.solved).toBe(10);
  expect(s.causes[0]).toEqual({ text: '부호를 바꾸지 않았어요', n: 2 }); // 같으면 최근 것이 앞 — 여기서는 2번
  expect(s.strong.map((u) => u.unit)).toEqual(['math-m2-01']);       // 5문제 80%
  expect(s.units.find((u) => u.unit === 'sci-e5-01').n).toBe(1);
  expect(s.strong.concat(s.weak).some((u) => u.unit === 'sci-e5-01')).toBe(false);
  expect(M.MIN_UNIT).toBe(3);
});

test('기록이 없거나 이상한 값이어도 죽지 않는다', () => {
  const s = M.build({ attempts: [null, 3, { t: 'x', ok: true }, { t: at(10, 8), ok: 'yes' }], progress: 'x', days: [1, null] }, { today: TODAY });
  expect(s).toMatchObject({ period: 7, solved: 0, correct: 0, rate: null, checks: 0, studyDays: 0, notes: 0, due: 0, reports: 0 });
  expect(s.bySubject).toEqual([]);
  expect(s.daily.every((d) => d.n === 0)).toBe(true);
  expect(M.build(null, { today: TODAY }).solved).toBe(0);
});

test('풀이 기록이 가득 차서 기간 앞부분이 빠졌으면 알린다', () => {
  const many = Array.from({ length: 2000 }, (_, i) => ({ t: at(10, 7) + i, unit: 'math-m2-01', level: 1, ok: true }));
  expect(M.build({ attempts: many }, { today: TODAY, period: 7 }).partial).toBe(true);
  expect(M.build({ attempts: many.slice(0, 1999) }, { today: TODAY, period: 7 }).partial).toBe(false);
});

test('글로 복사할 요약: 학년만, 별명 같은 학생 정보는 넣지 않는다', () => {
  const s = M.build({ attempts: ATTEMPTS, notes: [{}] }, { today: TODAY, period: 7, unitInfo, due: 1 });
  const text = M.toText(s, { grade: '중학교 2학년' });
  expect(text.split('\n')[0]).toBe('가정교사 학습 요약 (중학교 2학년)');
  expect(text).toContain('기간: 10월 2일 ~ 10월 8일 (최근 7일)');
  expect(text).toContain('푼 문제 9개 · 정답률 67%');
  expect(text).toContain('- 수학: 8문제, 정답률 63%');
  expect(text).toContain('잘한 단원\n- 일차부등식 (4문제, 100%)');
  expect(text).toContain('더 연습하면 좋은 단원\n- 연립일차방정식 (4문제, 25%)');
  expect(text).toContain('- 두 식을 더하지 않고 뺐어요 (2번)');
  expect(text).toContain('오답노트 1문제 · 오늘 복습할 문제 1개');
  const empty = M.toText(M.build({}, { today: TODAY }), {});
  expect(empty).toContain('정답률 -');
});

test('자주 틀린 개념: 이 기간에 2번 이상 틀린 개념 카드만, 많이 틀린 차례(같으면 최근)로 — 이해 확인도 센다', () => {
  const TITLES = { 'math-m2-02#1': '가감법', 'math-m2-02#0': '연립방정식의 해', 'sci-e5-01#2': '용해와 온도' };
  const conceptTitle = (u, c) => TITLES[u + '#' + c] || null;
  const A = [
    att(9, 20, 'math-m2-02', false, { c: 1 }),                       // 7일 밖
    att(10, 6, 'math-m2-02', false, { c: 1 }),
    att(10, 6, 'math-m2-02', false, { c: 1 }),
    att(10, 7, 'math-m2-02', true, { c: 1 }),
    att(10, 7, 'math-m2-02', false, { c: 0 }),
    att(10, 7, 'math-m2-02', false, { c: 0 }),
    att(10, 8, 'sci-e5-01', false, { c: 2, level: 0, pid: 'check-2' }), // 이해 확인도 개념 카드별로 센다
    att(10, 8, 'sci-e5-01', false, { c: 2 }),
    att(10, 8, 'sci-e5-01', false, { c: 3 }),                          // 한 번만 틀림 — 넣지 않는다
    att(10, 8, 'math-m2-01', false),                                   // 개념 번호 없는 기록 — 세지 않는다
    att(10, 8, 'math-m2-01', false, { c: -1 }), att(10, 8, 'math-m2-01', false, { c: 1.5 }), att(10, 8, 'math-m2-01', false, { c: '2' }),
  ];
  const s = M.build({ attempts: A }, { today: TODAY, period: 7, unitInfo, conceptTitle });
  expect(s.concepts).toEqual([
    { unit: 'sci-e5-01', c: 2, n: 2, wrong: 2, title: '용해와 온도', unitTitle: '물질의 용해' },
    { unit: 'math-m2-02', c: 0, n: 2, wrong: 2, title: '연립방정식의 해', unitTitle: '연립일차방정식' },
    { unit: 'math-m2-02', c: 1, n: 3, wrong: 2, title: '가감법', unitTitle: '연립일차방정식' },
  ]);
  // 30일이면 9월 20일 것까지 — 가감법이 3번으로 맨 앞
  const s30 = M.build({ attempts: A }, { today: TODAY, period: 30, unitInfo, conceptTitle });
  expect(s30.concepts[0]).toMatchObject({ unit: 'math-m2-02', c: 1, wrong: 3 });
  // 제목을 모르면 '개념 n'(번호는 1부터)
  const noTitle = M.build({ attempts: A }, { today: TODAY, period: 7, unitInfo });
  expect(noTitle.concepts[0].title).toBe('');
  const text = M.toText(noTitle, {});
  expect(text).toContain('자주 틀린 개념\n- 개념 3 · 물질의 용해 (틀린 문제 2개)');
  expect(M.toText(s, {})).toContain('- 가감법 · 연립일차방정식 (틀린 문제 2개)');
  // 개념 기록이 없으면 그 줄이 없다
  expect(M.toText(M.build({ attempts: ATTEMPTS }, { today: TODAY, unitInfo }), {})).not.toContain('자주 틀린 개념');
  expect(M.MIN_CONCEPT).toBe(2);
});
