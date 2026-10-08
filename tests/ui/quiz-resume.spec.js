const { test, expect } = require('@playwright/test');
const { open, waitReady, readStore, flushStore, goHash, quizState, answerCurrent, solveAll, STUDENT, STUDENT_B } = require('./helpers');

/*
 * 예상문제 이어 풀기(2026-10-08 — 사용자 지시 3순위 '중단된 학습 이어하기'): 새로고침하거나 휴대폰이 뒤에 있던 탭을 다시 불러와도
 * 풀던 문제부터. 그 학생의 p.<id>.quiz 에 낸 문제(사본)·답·순서를 두고, 다 풀면 지운다. 일주일이 지난 것은 버린다. 홈에 "풀던 예상문제" 카드.
 */
const DAY = 86400000;
const T0 = new Date(2026, 9, 8, 15, 0, 0);

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(T0);
});

test('새로고침해도 풀던 곳부터: 낸 문제·맞고 틀린 것 그대로, 다 풀면 이어 풀기 기록을 지운다', async ({ page }) => {
  await open(page, { student: true, url: '/#/quiz/math-m2-01?n=5&lv=1&seed=4242' });
  const before = await quizState(page);
  await answerCurrent(page, 'right', { withUnit: true });
  await page.locator('.quiz-next').click();
  await answerCurrent(page, 'wrong');
  await page.locator('.quiz-next').click();
  await expect(page.locator('.quiz-count')).toContainText('3 / 5');

  await page.reload();
  await waitReady(page);
  await expect(page.locator('.quiz-count')).toContainText('3 / 5');
  await expect(page.locator('.resume-note')).toContainText('풀던 곳부터 이어서');
  const st = await quizState(page);
  expect(st.index).toBe(2);
  expect(st.items.map((it) => it.key)).toEqual(before.items.map((it) => it.key));
  expect(st.answers.slice(0, 2).map((a) => a.correct)).toEqual([true, false]);

  await solveAll(page);
  await expect(page.locator('.score-sub')).toContainText('5문제 중 4문제를 맞혔어요');
  expect(await readStore(page, 'p.' + STUDENT.id + '.quiz')).toBeNull();
  const attempts = await readStore(page, 'p.' + STUDENT.id + '.attempts');
  expect(attempts.length).toBe(5); // 다시 열어도 같은 문제를 두 번 기록하지 않는다
});

test('답을 맞힌 뒤 [다음 문제]를 누르기 전에 새로고침하면 다음 문제로 넘어가 있다', async ({ page }) => {
  await open(page, { student: true, url: '/#/quiz/math-m2-01?n=5&lv=1&seed=4242' });
  await answerCurrent(page, 'right', { withUnit: true });
  // 화면은 채점하자마자 저장을 시작한다. 사파리(WebKit)는 그 몇 밀리초 안에 페이지가 닫히면 쓰기를 끝내 주지 않으므로, 저장이 끝난 뒤 새로고침한다
  await flushStore(page);
  await page.reload();
  await waitReady(page);
  expect((await quizState(page)).index).toBe(1);
  await expect(page.locator('.quiz-count')).toContainText('2 / 5');
});

test('맞춤 난이도(섞어서)도 이어서 — 이미 낸 문제는 다시 나오지 않는다', async ({ page }) => {
  await open(page, { student: true, url: '/#/quiz/math-m2-01?n=8&lv=mix&seed=11' });
  for (let i = 0; i < 3; i++) {
    await answerCurrent(page, 'right', { withUnit: true });
    await page.locator('.quiz-next').click();
  }
  const mid = await quizState(page);
  expect(mid.adaptive).toBe(true);
  await page.reload();
  await waitReady(page);
  const st = await quizState(page);
  expect(st.index).toBe(3);
  expect(st.items.slice(0, 4).map((it) => it.key)).toEqual(mid.items.slice(0, 4).map((it) => it.key));
  await solveAll(page);
  const end = await quizState(page);
  const keys = end.items.map((it) => it.key);
  expect(new Set(keys).size).toBe(keys.length);
  expect(end.answers.filter(Boolean).length).toBe(end.items.length);
});

test('홈의 "풀던 예상문제 이어 풀기" 카드를 누르면 그 문제부터 (다른 학생에게는 보이지 않는다)', async ({ page }) => {
  await open(page, { student: [STUDENT, STUDENT_B], url: '/#/quiz/math-m2-01?n=5&lv=1&seed=4242' });
  await answerCurrent(page, 'right', { withUnit: true });
  await page.locator('.quiz-next').click();
  await answerCurrent(page, 'right', { withUnit: true });
  await page.locator('.quiz-next').click();
  await goHash(page, '#/home');
  const card = page.locator('.quiz-resume-card');
  await expect(card).toBeVisible();
  await expect(card).toContainText('일차부등식 예상문제');
  await expect(card).toContainText('2 / 5');
  await page.reload(); // 메모리의 문제 상태 없이 저장된 기록으로
  await waitReady(page);
  await page.locator('.quiz-resume-card').click();
  await waitReady(page);
  await expect(page.locator('.quiz-count')).toContainText('3 / 5');

  await goHash(page, '#/settings');
  await page.locator('.student-row', { hasText: STUDENT_B.name }).getByRole('button', { name: '이 학생으로' }).click();
  await goHash(page, '#/home');
  await expect(page.locator('.quiz-resume-card')).toHaveCount(0);
});

test('일주일이 지난 이어 풀기 기록은 버리고 처음부터 낸다', async ({ page }) => {
  await open(page, { student: true, url: '/#/quiz/math-m2-01?n=5&lv=1&seed=4242' });
  await answerCurrent(page, 'right', { withUnit: true });
  await page.locator('.quiz-next').click();
  expect(await readStore(page, 'p.' + STUDENT.id + '.quiz')).not.toBeNull();
  await page.clock.setFixedTime(new Date(T0.getTime() + 8 * DAY));
  await page.reload();
  await waitReady(page);
  expect((await quizState(page)).index).toBe(0);
  await expect(page.locator('.resume-note')).toHaveCount(0);
  await goHash(page, '#/home');
  await expect(page.locator('.quiz-resume-card')).toHaveCount(0);
});

test('틀린 문제 다시 풀기를 하다 새로고침해도 다시 풀기로 이어진다', async ({ page }) => {
  await open(page, { student: true, url: '/#/quiz/math-m2-02?n=5&lv=mix&seed=11' });
  await solveAll(page, [0, 2]);
  await page.getByRole('button', { name: '틀린 문제 다시 풀기' }).click();
  await answerCurrent(page, 'right', { withUnit: true });
  await page.locator('.quiz-next').click();
  await page.reload();
  await waitReady(page);
  const st = await quizState(page);
  expect(st.retry).toBe(true);
  expect(st.total).toBe(2);
  expect(st.index).toBe(1);
  await expect(page.locator('.retry-badge')).toBeVisible();
});
