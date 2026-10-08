const { test, expect } = require('@playwright/test');
const { open, collectErrors, waitReady, readStore, goHash, fillAnswer, solveAll } = require('./helpers');

/*
 * 복습 일정(js/review.js): 틀린 문제는 다음 날, 맞힌 문제는 3일 뒤에 '오늘의 복습'으로 다시 낸다.
 * 두 번 연속 맞히면 오답노트에서 빠진다(예전 규칙 그대로). 기록은 그 학생의 오답노트(p.<id>.notes)에만.
 * 시험의 오늘은 2026-10-08(그 기기 시간대의 정오)로 고정한다.
 */
const TODAY = new Date(2026, 9, 8, 12, 0, 0);
function at(d) { return new Date(2026, 9, d, 12).getTime(); }

const OX = {
  id: 'p6', level: 1, type: 'ox',
  q: '부등식 $-3x>6$ 의 양쪽을 $-3$ 으로 나누면 $x>-2$ 가 된다.',
  answer: false, explain: '음수로 나누면 부등호 방향이 바뀌어요.',
};
const SHORT = { id: 's3', level: 1, type: 'short', check: 'text', q: '녹는 물질을 무엇이라고 할까요?', answer: ['용질'], explain: '녹는 물질은 **용질**이에요.' };

function note(key, unit, problem, extra) {
  return Object.assign({ key, unit, problem, given: 'x', at: at(5), wrongCount: 1, rightStreak: 0, gen: null, src: 'bank' }, extra);
}
const A = note('math-m2-01#p6', 'math-m2-01', OX, { due: '2026-10-08' });                                   // 오늘
const B = note('sci-e5-01#s3', 'sci-e5-01', SHORT, { at: at(6) });                                          // 다음 복습 날이 없는 예전 오답 → 10-07
const C = note('math-m2-01#p7', 'math-m2-01', Object.assign({}, OX, { id: 'p7' }), { due: '2026-10-10' }); // 모레

function withNotes(notes) { return { 'tutor.p.p-test-a.notes': notes }; }

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(TODAY);
});

test('오늘 복습할 문제가 있으면 홈·오답노트에 알리고, 날짜가 된 문제만 오래된 것부터 낸다', async ({ page }) => {
  const errors = collectErrors(page);
  const calls = await open(page, { student: true, storage: withNotes([A, B, C]), url: '/#/home' });
  const card = page.locator('.review-card');
  await expect(card).toBeVisible();
  await expect(card).toContainText('오늘의 복습');
  await expect(card).toContainText('2문제');

  await goHash(page, '#/notes');
  await expect(page.locator('.bubble-text')).toContainText('두 번 연속으로 맞히면 오답노트에서 빠져요');
  await expect(page.locator('.review-box')).toContainText('오늘 복습할 문제 2개');
  await expect(page.locator('.note-card[data-key="' + A.key + '"] .note-meta')).toContainText('다음 복습 오늘');
  await expect(page.locator('.note-card[data-key="' + C.key + '"] .note-meta')).toContainText('다음 복습 모레');

  await page.locator('.review-box').getByRole('link', { name: '복습 시작' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/review$/);
  await expect(page.locator('#topTitle')).toHaveText('오늘의 복습');
  expect(await page.title()).toBe('오늘의 복습 · 가정교사'); // 문서 제목에 학생 별명을 넣지 않는다
  await expect(page.locator('.review-count')).toContainText('1 / 2');
  await expect(page.locator('.review-unit')).toContainText('물질의 용해'); // 복습 날이 오래된 B(10-07)가 먼저
  await expect(page.locator('.review .pq')).toContainText('녹는 물질');
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('복습: 연속 두 번째로 맞히면 오답노트에서 빼고, 틀리면 다음 날 다시 낸다', async ({ page }) => {
  const B1 = Object.assign({}, B, { rightStreak: 1 });
  await open(page, { student: true, storage: withNotes([A, B1, C]), url: '/#/review' });
  const box = page.locator('.review');

  await box.locator('.short-input').fill('용질');
  await box.locator('.pw-submit').click();
  await expect(box.locator('.feedback')).toHaveClass(/is-ok/);
  await expect(box.locator('.review-status')).toContainText('두 번 연속 맞혔어요! 오답노트에서 뺐어요.');
  await box.getByRole('button', { name: '다음 문제 ›' }).click();

  await expect(page.locator('.review-count')).toContainText('2 / 2');
  await box.locator('.ox-btn[data-v="true"]').click();
  await box.locator('.pw-submit').click();
  await expect(box.locator('.feedback')).toHaveClass(/is-bad/);
  await expect(box.locator('.review-status')).toContainText('내일 다시');
  await box.getByRole('button', { name: '결과 보기' }).click();

  const res = page.locator('.review-result');
  await expect(res).toContainText('2문제를 복습했어요');
  await expect(res).toContainText('맞힌 문제 1개');
  await expect(res).toContainText('오답노트에서 뺀 문제 1개');

  const notes = await readStore(page, 'p.p-test-a.notes');
  expect(notes.map((n) => n.key)).toEqual([A.key, C.key]);
  expect(notes[0]).toMatchObject({ due: '2026-10-09', wrongCount: 2, rightStreak: 0, given: 'O' });
  expect(notes[1]).toMatchObject({ due: '2026-10-10', rightStreak: 0 }); // 오늘이 아닌 문제는 그대로
  const attempts = await readStore(page, 'p.p-test-a.attempts');
  expect(attempts.map((a) => a.ok)).toEqual([true, false]);
  const prog = await readStore(page, 'p.p-test-a.progress');
  expect(prog['math-m2-01']).toMatchObject({ solved: 1, correct: 0 });
  expect(prog['sci-e5-01']).toMatchObject({ solved: 1, correct: 1 });
});

test('복습: 처음 맞히면 3일 뒤에 한 번 더, 다 풀면 홈의 복습 카드가 사라진다', async ({ page }) => {
  await open(page, { student: true, storage: withNotes([A]), url: '/#/review' });
  const box = page.locator('.review');
  await box.locator('.ox-btn[data-v="false"]').click();
  await box.locator('.pw-submit').click();
  await expect(box.locator('.review-status')).toContainText('3일 뒤(10월 11일)');
  const notes = await readStore(page, 'p.p-test-a.notes');
  expect(notes[0]).toMatchObject({ due: '2026-10-11', rightStreak: 1, wrongCount: 1 });
  await box.getByRole('button', { name: '결과 보기' }).click();
  await expect(page.locator('.review-result')).toContainText('맞힌 문제 1개');
  await goHash(page, '#/home');
  await expect(page.locator('.review-card')).toHaveCount(0);
});

test('예상문제에서 틀린 문제는 다음 날 복습으로 들어가고, 오답노트에서 바로 다시 맞히면 3일 뒤로 미뤄진다', async ({ page }) => {
  await open(page, { student: true, url: '/#/quiz/math-m2-01?n=3&lv=1&seed=7' });
  await solveAll(page, [0]);
  let notes = await readStore(page, 'p.p-test-a.notes');
  expect(notes.length).toBe(1);
  expect(notes[0].due).toBe('2026-10-09');

  await goHash(page, '#/notes');
  await expect(page.locator('.review-box')).toHaveCount(0);
  await expect(page.locator('.review-next')).toContainText('다음 복습: 내일 · 1문제');
  const card = page.locator('.note-card').first();
  await expect(card.locator('.note-meta')).toContainText('다음 복습 내일');
  await card.getByRole('button', { name: '다시 풀기' }).click();
  const p = notes[0].problem;
  const item = { type: p.type, answer: p.answer, choices: p.choices || null, check: p.check || null, unitLabel: p.unit || null };
  await fillAnswer(page, card.locator('form.problem'), item, 'right', { withUnit: true });
  await card.locator('.pw-submit').click();
  await expect(card.locator('.note-status')).toContainText('1번 맞힘');
  await expect(card.locator('.note-status')).toContainText('다음 복습 10월 11일');
  notes = await readStore(page, 'p.p-test-a.notes');
  expect(notes[0]).toMatchObject({ due: '2026-10-11', rightStreak: 1 });
});

test('오늘 복습할 문제가 없으면 홈 카드가 없고, 복습 화면은 다음 복습 날을 알려 준다', async ({ page }) => {
  await open(page, { student: true, storage: withNotes([C]), url: '/#/home' });
  await expect(page.locator('.review-card')).toHaveCount(0);
  await goHash(page, '#/review');
  await expect(page.locator('.state-box')).toContainText('오늘 복습할 문제가 없어요');
  await expect(page.locator('.state-box')).toContainText('다음 복습: 모레 · 1문제');
  await goHash(page, '#/notes');
  await expect(page.locator('.review-next')).toContainText('다음 복습: 모레 · 1문제');
});

test('오답노트가 비어 있으면 복습 화면은 안내만 보인다', async ({ page }) => {
  await open(page, { student: true, url: '/#/review' });
  await expect(page.locator('.state-box')).toContainText('복습할 문제가 없어요');
  await expect(page.locator('.state-box')).toContainText('틀리면 다음 날');
});

test('한 번에 10문제까지 내고, 남은 복습은 이어서 푼다', async ({ page }) => {
  const many = Array.from({ length: 12 }, (_, i) => note('math-m2-01#x' + i, 'math-m2-01', Object.assign({}, OX, { id: 'x' + i }),
    { due: '2026-10-0' + (6 + (i % 3)), at: at(1) + i }));
  await open(page, { student: true, storage: withNotes(many), url: '/#/review' });
  const box = page.locator('.review');
  for (let i = 0; i < 10; i++) {
    await expect(page.locator('.review-count')).toContainText((i + 1) + ' / 10');
    await box.locator('.ox-btn[data-v="false"]').click();
    await box.locator('.pw-submit').click();
    await box.getByRole('button', { name: i < 9 ? '다음 문제 ›' : '결과 보기' }).click();
  }
  const res = page.locator('.review-result');
  await expect(res).toContainText('10문제를 복습했어요');
  await expect(res).toContainText('남은 복습 2문제');
  await box.getByRole('button', { name: '이어서 복습하기' }).click();
  await expect(page.locator('.review-count')).toContainText('1 / 2');
  const notes = await readStore(page, 'p.p-test-a.notes');
  expect(notes.filter((n) => n.due === '2026-10-11').length).toBe(10);
});

test('복습 결과: 또 틀린 문제의 개념 카드를 "다시 볼 개념"으로(단원 파일을 싣고 제목을 보인다), 누르면 그 카드로', async ({ page }) => {
  const A1 = note('math-m2-01#p6', 'math-m2-01', Object.assign({}, OX, { concept: 1 }), { due: '2026-10-08' });
  await open(page, { student: true, storage: withNotes([A1]), url: '/#/review' });
  const box = page.locator('.review');
  await box.locator('.ox-btn[data-v="true"]').click(); // 틀린 답
  await box.locator('.pw-submit').click();
  await expect(box.locator('.feedback')).toHaveClass(/is-bad/);
  await box.getByRole('button', { name: '결과 보기' }).click();
  const sec = page.locator('section[aria-labelledby="rvAgainTitle"]');
  await expect(sec.getByRole('heading', { name: '다시 볼 개념' })).toBeVisible();
  await expect(sec.locator('a')).toHaveText(['부등식의 성질']);
  await expect(sec.locator('a')).toHaveAttribute('href', '#/unit/math-m2-01/learn?card=1');
  await expect(sec).toContainText('틀린 문제 1개');
  await sec.locator('a').click();
  await waitReady(page);
  const shown = await page.evaluate(() => Array.from(document.querySelectorAll('.concept-card')).filter((c) => !c.hidden).map((c) => Number(c.getAttribute('data-i'))));
  expect(shown).toEqual([1]);
});

test('복습 결과: 다 맞혔거나 개념 번호가 없는 문제뿐이면 "다시 볼 개념"이 없다', async ({ page }) => {
  await open(page, { student: true, storage: withNotes([A]), url: '/#/review' }); // A 는 개념 번호가 없다
  const box = page.locator('.review');
  await box.locator('.ox-btn[data-v="true"]').click();
  await box.locator('.pw-submit').click();
  await box.getByRole('button', { name: '결과 보기' }).click();
  await expect(page.locator('.review-result')).toBeVisible();
  await page.waitForTimeout(200);
  await expect(page.locator('.again-box')).toHaveCount(0);
});
