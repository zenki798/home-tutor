const { test, expect } = require('@playwright/test');
const path = require('path');

/*
 * 단원 검사(scripts/lib/unit-checks.js) — 단원 1,000여 개의 품질 문지기.
 * 일부러 틀린 단원을 만들어 각 검사가 "그 이유로" 잡는지, 올바른 단원은 오류 0 인지 본다.
 */
const ROOT = path.join(__dirname, '..', '..');
const { checkUnit } = require(path.join(ROOT, 'scripts', 'lib', 'unit-checks'));
const { lintParticles } = require(path.join(ROOT, 'scripts', 'lib', 'particles'));
const ctx = {
  TutorMath: require(path.join(ROOT, 'js', 'mathlib.js')),
  TutorText: require(path.join(ROOT, 'js', 'mathtext.js')),
  TutorFig: require(path.join(ROOT, 'js', 'figures.js')),
  seeds: 40,
  subject: 'math',
};
const B = String.fromCharCode(92);
const EXPLAIN = '해설이에요. 왜 그런지 충분히 길게 씁니다.';

function base() {
  return {
    id: 'x-01', course: 'x', title: '시험 단원', summary: '시험 단원 요약이에요.', goals: ['목표를 알 수 있어요.'],
    concepts: [0, 1, 2].map((i) => ({
      title: '카드' + i, body: '설명이 충분히 긴 개념 카드 본문입니다. 서른 글자를 넘겨요.',
      check: { type: 'ox', q: '맞나요?', answer: true, explain: '맞아요. 이유는 이래요.' },
    })),
    examples: [{ q: '예제', steps: ['한 단계'], answer: '답' }],
    terms: [{ term: 'a', def: '뜻' }, { term: 'b', def: '뜻' }, { term: 'c', def: '뜻' }],
    practice: Array.from({ length: 8 }, (_, i) => ({ id: 'p' + i, level: 1, type: 'ox', q: '문제', answer: true, explain: EXPLAIN, concept: 0 })),
    advanced: Array.from({ length: 3 }, (_, i) => ({ id: 'a' + i, level: 3, type: 'ox', q: '문제', answer: false, explain: EXPLAIN, concept: 1 })),
    deeper: [{ title: '더 알아보기', body: '심화 읽을거리 본문입니다. 서른 글자가 넘도록 길게 씁니다.' }],
    faq: [{ q: '질문', a: '답변이에요 열 글자 넘게' }, { q: '질문2', a: '답변이에요 열 글자 넘게' }],
    mistakes: ['실수'],
    gens: [
      { id: 'g1', level: 1, title: '더하기', make: (R) => { const a = R.int(1, 50); return { type: 'short', check: 'number', q: a + '+1', answer: String(a + 1), explain: '1을 더해요. 계산합니다.', concept: 0 }; } },
      { id: 'g2', level: 2, title: '빼기', make: (R) => { const a = R.int(10, 60); return { type: 'short', check: 'number', q: a + '-2', answer: String(a - 2), explain: '2를 빼요. 계산합니다.', concept: 0 }; } },
    ],
  };
}
const run = (mut) => checkUnit(mut(base()), ctx);
const msgs = (r) => r.errors.map((e) => e.path + ': ' + e.msg).join('\n');

test('올바른 단원은 오류 0', () => {
  const r = run((u) => u);
  expect(r.errors, msgs(r)).toEqual([]);
  expect(r.stats.gens).toBe(2);
  expect(r.stats.checks).toBe(3);
});

const BAD = [
  ['choice 정답 번호가 보기 밖', (u) => { u.practice[0] = { id: 'p0', level: 1, type: 'choice', q: 'q', choices: ['a', 'b', 'c'], answer: 3, why: ['', '', ''], explain: EXPLAIN, concept: 0 }; return u; }, /answer.*보기 번호/],
  ['같은 보기 두 번', (u) => { u.practice[0] = { id: 'p0', level: 1, type: 'choice', q: 'q', choices: ['a', 'b', 'a'], answer: 0, why: ['', 'x', 'y'], explain: EXPLAIN, concept: 0 }; return u; }, /같은 보기/],
  ['수 정답에 text 채점', (u) => { u.practice[1] = { id: 'p1', level: 1, type: 'short', q: 'q', answer: '1 3/6', explain: EXPLAIN, concept: 0 }; return u; }, /check: 'number'/],
  ['정답이 채점기를 통과하지 못함', (u) => { u.practice[1] = { id: 'p1', level: 1, type: 'short', check: 'number', q: 'q', answer: 'abc', explain: EXPLAIN, concept: 0 }; return u; }, /수로 읽을 수 없는/],
  ['"틀린 답"이 사실은 정답과 같은 값', (u) => { u.practice[2] = { id: 'p2', level: 1, type: 'short', check: 'number', q: 'q', answer: '1/2', wrong: [{ a: '2/4', why: '틀렸어요' }], explain: EXPLAIN, concept: 0 }; return u; }, /틀린 답.*정답으로/],
  ['concept 번호가 카드 밖', (u) => { u.practice[3].concept = 9; return u; }, /개념 카드 번호/],
  ['order 정답이 순열이 아님', (u) => { u.practice[5] = { id: 'p5', level: 2, type: 'order', q: 'q', choices: ['a', 'b', 'c'], answer: [0, 0, 2], explain: EXPLAIN, concept: 0 }; return u; }, /순서 배열/],
  ['ox 정답이 boolean 이 아님', (u) => { u.practice[6].answer = 'O'; return u; }, /true\/false/],
  ['문제 id 겹침', (u) => { u.practice[7].id = 'p0'; return u; }, /id 가 겹쳐요/],
  ['백슬래시 하나(폼피드)', (u) => { u.concepts[0].body = '설명 $' + String.fromCharCode(12) + 'rac{1}{2}$ 이에요. 서른 글자를 넘기는 본문입니다.'; return u; }, /제어 문자/],
  ['백슬래시 빠진 명령', (u) => { u.concepts[1].body = '설명 $sqrt{2}$ 이에요. 서른 글자를 넘기는 본문입니다 정말로.'; return u; }, /백슬래시가 빠진/],
  ['모르는 TeX 명령', (u) => { u.practice[4].q = '$' + B + 'foo{x}$'; return u; }, /모르는 TeX/],
  ['undefined 글자', (u) => { u.practice[4].q = '값은 undefined'; return u; }, /undefined/],
  ['잘못된 그림', (u) => { u.concepts[2].fig = { type: 'nope' }; return u; }, /그림/],
  ['수학 단원에 생성기 없음', (u) => { u.gens = []; return u; }, /생성기/],
  ['생성기에 Math.random', (u) => { u.gens[0].make = () => ({ type: 'ox', q: 'q' + Math.random(), answer: true, explain: EXPLAIN }); return u; }, /Math\.random/],
  ['생성기가 결정적이지 않음', (u) => { let k = 0; u.gens[1].make = () => ({ type: 'ox', q: 'q' + (k++), answer: true, explain: EXPLAIN, concept: 0 }); return u; }, /같은 seed/],
  ['생성기가 오류를 냄', (u) => { u.gens[0].make = (R) => R.choices('1', ['1', '1']); return u; }, /오류/],
  ['생성기 문제가 거의 같음', (u) => { u.gens[0].make = () => ({ type: 'ox', q: '항상 같은 문제', answer: true, explain: EXPLAIN, concept: 0 }); return u; }, /서로 다른 문제/],
  ['개념 카드가 없음', (u) => { u.concepts = []; return u; }, /concepts: 비어/],
  ['해설이 비었음', (u) => { u.advanced[0].explain = ''; return u; }, /explain: 비어/],
];
for (const [name, mut, re] of BAD) {
  test('잡아야 한다: ' + name, () => {
    const r = run(mut);
    expect(r.errors.length, '오류가 없음').toBeGreaterThan(0);
    expect(msgs(r)).toMatch(re);
  });
}

test('경고: 이해 확인·why·concept 이 빠지면 알린다', () => {
  const r = run((u) => {
    delete u.concepts[0].check;
    delete u.practice[0].concept;
    u.practice[1] = { id: 'p1', level: 1, type: 'choice', q: 'q', choices: ['a', 'b', 'c'], answer: 0, explain: EXPLAIN, concept: 0 };
    return u;
  });
  const w = r.warnings.map((x) => x.path + ': ' + x.msg).join('\n');
  expect(w).toMatch(/concepts\[0\]\.check/);
  expect(w).toMatch(/practice\[0\]\.concept/);
  expect(w).toMatch(/practice\[1\]\.why/);
});

test('경고: 수 뒤 조사', () => {
  const r = run((u) => { u.practice[0].q = '$' + B + 'frac{9}{8}$은 가분수예요.'; return u; });
  expect(r.warnings.map((x) => x.msg).join('\n')).toMatch(/조사.*은 → 는/);
});

test('영어 단원은 vocab 이 필요하다', () => {
  const r = checkUnit(Object.assign(base(), { gens: [] }), Object.assign({}, ctx, { subject: 'eng', grades: ['m1'] }));
  expect(msgs(r)).toMatch(/vocab/);
});

test('조사 검사기: 틀린 문장은 잡고 맞는 문장은 넘긴다', () => {
  const fr = (a, b) => B + 'frac{' + a + '}{' + b + '}';
  const wrong = ['$' + fr(9, 8) + '$은 가분수예요.', '분수 부분은 $' + fr(6, 5) + '$가 되고', '3를 더해요.', '$x^2$는 0 이상', '답은 10예요.', '$7$으로 나누어요.'];
  const right = ['$' + fr(9, 8) + '$는 가분수예요.', '3을 더해요. 2를 빼요. 10은 짝수예요.', '$x$가 커지면 $y$도 커져요.', '$7$로 나누어요. $3$으로 나누어요.', '사과 3개를 샀어요. 3가지 방법이 있어요.', '$' + B + 'angle A$가 직각이에요.', '1, 2, 3으로 모두 3개예요.'];
  for (const t of wrong) expect(lintParticles(t).length, t).toBeGreaterThan(0);
  for (const t of right) expect(lintParticles(t), t).toEqual([]);
});

test('견본 단원(math-e4-07)은 오류·경고 0', () => {
  const { lintFile, loadCurriculum } = require(path.join(ROOT, 'scripts', 'lint-unit.js'));
  const r = lintFile(path.join(ROOT, 'data', 'units', 'math-e4-07.js'), loadCurriculum(), { seeds: 120 });
  expect(r.errors, msgs(r)).toEqual([]);
  expect(r.warnings.map((x) => x.path + ': ' + x.msg)).toEqual([]);
});
