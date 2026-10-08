const { test, expect } = require('@playwright/test');
const { open, goHash, readStore, STUDENT } = require('./helpers');

/*
 * 개념 카드 이어 보기 (docs/ARCHITECTURE.md §17 — 3순위 '중단된 학습 이어하기'): 단원을 다시 열면
 * 지난번에 본 카드 다음(아직 안 본 첫 카드)부터 보여 주고, [처음부터 보기]로 첫 카드로 갈 수 있다.
 * 주소로 카드를 고르거나, 아직 안 봤거나, 다 본 단원은 예전처럼 첫 카드(또는 고른 카드)부터.
 * 시험 단원 math-m2-01 의 개념 카드: 부등식이란? · 부등식의 성질 · 일차부등식 풀기 · 해를 수직선에 나타내기
 */
const KEY = 'tutor.p.' + STUDENT.id + '.progress';
const prog = (seen) => ({ [KEY]: { 'math-m2-01': { seen, cards: 4, solved: 0, correct: 0, best: 0, last: 1 } } });
const visibleCard = (page) => page.evaluate(() => {
  const shown = Array.from(document.querySelectorAll('.concept-card')).filter((c) => !c.hidden);
  return shown.map((c) => Number(c.getAttribute('data-i')));
});

test('지난번에 본 다음 카드부터 보여 주고, [처음부터 보기]로 첫 카드로 간다', async ({ page }) => {
  await open(page, { student: true, storage: prog([0, 1]), url: '/#/unit/math-m2-01/learn' });
  expect(await visibleCard(page)).toEqual([2]);
  await expect(page.locator('#cvCount')).toHaveText('카드 3 / 4');
  const note = page.locator('#cvResume');
  await expect(note).toBeVisible();
  await expect(note).toContainText('지난번에 본 다음 카드부터 보여 드려요');
  await expect(page.locator('.bubble-text')).toContainText('지난번에 본 다음인 ‘일차부등식 풀기’부터');
  // 이번에 본 카드도 진도에 남는다
  await expect.poll(async () => ((await readStore(page, 'p.' + STUDENT.id + '.progress')) || {})['math-m2-01'].seen).toEqual([0, 1, 2]);
  await note.getByRole('button', { name: '처음부터 보기' }).click();
  expect(await visibleCard(page)).toEqual([0]);
  await expect(note).toBeHidden();
  await expect(page.locator('#cct-0')).toBeFocused();
  await expect(page.locator('#cvCount')).toHaveText('카드 1 / 4');
});

test('같은 때에 다른 탭에 다녀오면 보던 카드 그대로(안내는 다시 띄우지 않음)', async ({ page }) => {
  await open(page, { student: true, storage: prog([0, 1]), url: '/#/unit/math-m2-01/learn' });
  expect(await visibleCard(page)).toEqual([2]);
  await page.locator('[data-act="next"]').click();
  expect(await visibleCard(page)).toEqual([3]);
  await goHash(page, '#/unit/math-m2-01/examples');
  await goHash(page, '#/unit/math-m2-01/learn');
  expect(await visibleCard(page)).toEqual([3]);
  await expect(page.locator('#cvResume')).toHaveCount(0);
});

test('처음 여는 단원·다 본 단원·주소로 고른 카드는 예전처럼', async ({ page }) => {
  // 아직 안 본 단원: 첫 카드부터, 안내 없음
  await open(page, { student: true, url: '/#/unit/math-m2-01/learn' });
  expect(await visibleCard(page)).toEqual([0]);
  await expect(page.locator('#cvResume')).toHaveCount(0);
  await expect(page.locator('.bubble-text')).toContainText('먼저 ‘부등식이란?’부터');
});

test('다 본 단원은 첫 카드부터, 주소로 고른 카드는 그 카드부터 (이어 보기 안내 없음)', async ({ page }) => {
  await open(page, { student: true, storage: prog([0, 1, 2, 3]), url: '/#/unit/math-m2-01/learn' });
  expect(await visibleCard(page)).toEqual([0]);
  await expect(page.locator('#cvResume')).toHaveCount(0);
});

test('주소로 카드를 고르면(개념 카드에서 보기 ›) 이어 보기보다 그 카드가 먼저다', async ({ page }) => {
  await open(page, { student: true, storage: prog([0, 1]), url: '/#/unit/math-m2-01/learn?card=1' });
  expect(await visibleCard(page)).toEqual([1]);
  await expect(page.locator('#cvResume')).toHaveCount(0);
});
