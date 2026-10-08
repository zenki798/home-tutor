const { test, expect } = require('@playwright/test');
const { open, goHash, readStore, waitReady, STUDENT, STUDENT_B } = require('./helpers');

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

test('홈의 "이어서 공부하기"가 어디부터인지 알린다: 안 본 첫 카드(이름까지)부터 · 다 봤으면 문제 풀기로', async ({ page }) => {
  const recent = { ['tutor.p.' + STUDENT.id + '.recent']: ['math-m2-01'] };
  const calls = await open(page, { student: true, storage: Object.assign({}, prog([0, 1]), recent), url: '/#/home' });
  const card = page.locator('.continue-card').first();
  await expect(card).toContainText('일차부등식');
  // 단원 파일을 아직 안 불러왔으면 불러와 다음 카드 이름을 채운다
  await expect(card.locator('.cc-next')).toHaveText('개념 3/4 · ‘일차부등식 풀기’부터');
  expect(calls.units).toEqual(['math-m2-01']);
  await expect(card).toHaveAttribute('href', '#/unit/math-m2-01/learn');
  // 이미 불러온 단원이면 처음부터 이름까지(다시 부르지 않는다)
  await goHash(page, '#/stats');
  await goHash(page, '#/home');
  await expect(page.locator('.continue-card').first().locator('.cc-next')).toHaveText('개념 3/4 · ‘일차부등식 풀기’부터');
  expect(calls.units).toEqual(['math-m2-01']);
  // 다 본 단원
  await page.evaluate(([k]) => { Tutor.store.set(k, { 'math-m2-01': { seen: [0, 1, 2, 3], cards: 4, solved: 0, correct: 0, best: 0, last: 1 } }); },
    ['p.' + STUDENT.id + '.progress']);
  await page.evaluate(() => { location.hash = '#/stats'; });
  await page.evaluate(() => { location.hash = '#/home'; });
  await expect(page.locator('.continue-card').first().locator('.cc-next')).toHaveText('개념 카드 다 봄 · 문제 풀기');
  await expect(page.locator('.continue-card').first()).toHaveAttribute('href', '#/unit/math-m2-01/practice');
});

test('홈의 다음 카드 이름: 단원 파일을 불러오지 못하면 번호만 그대로(오류 없이)', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const recent = { ['tutor.p.' + STUDENT.id + '.recent']: ['math-m2-01'] };
  const calls = await open(page, { student: true, storage: Object.assign({}, prog([0, 1]), recent), url: '/#/home', failUnits: ['math-m2-01'] });
  await expect.poll(() => calls.units.length).toBe(1);
  const next = page.locator('.continue-card').first().locator('.cc-next');
  await expect(next).toHaveText('개념 3/4부터');
  await expect(page.locator('html')).toHaveAttribute('data-state', 'ready');
  expect(errors).toEqual([]);
});

test('아직 개념 카드를 한 장도 보지 않은 단원은 "어디부터"를 따로 쓰지 않는다', async ({ page }) => {
  const recent = { ['tutor.p.' + STUDENT.id + '.recent']: ['math-m2-01'] };
  await open(page, { student: true, storage: Object.assign({}, prog([]), recent), url: '/#/home' });
  await expect(page.locator('.continue-card').first()).toContainText('일차부등식');
  await expect(page.locator('.continue-card .cc-next')).toHaveCount(0);
  await expect(page.locator('.continue-card').first()).toHaveAttribute('href', '#/unit/math-m2-01/learn');
});

test('학생을 바꾸면 앞 학생이 보던 카드 위치가 다음 학생에게 이어지지 않는다(다음 학생의 진도에 섞이지 않음) · 다른 탭에서 바꿔도', async ({ page }) => {
  const B = STUDENT_B.id;
  const storage = Object.assign({}, prog([0, 1]));
  await open(page, { student: [STUDENT, STUDENT_B], storage, url: '/#/unit/math-m2-01/learn' });
  expect(await visibleCard(page)).toEqual([2]); // 앞 학생: 이어 보기로 셋째 카드
  await page.locator('[data-act="next"]').click();
  expect(await visibleCard(page)).toEqual([3]);
  // 학생 고르기 화면에서 다른 학생으로
  await goHash(page, '#/');
  await page.locator('.profile-card', { hasText: STUDENT_B.name }).click();
  await waitReady(page);
  await goHash(page, '#/unit/math-m2-01/learn');
  expect(await visibleCard(page)).toEqual([0]); // 다음 학생은 아직 안 본 단원 — 첫 카드부터
  await expect(page.locator('#cvResume')).toHaveCount(0);
  await expect.poll(async () => ((await readStore(page, 'p.' + B + '.progress')) || {})['math-m2-01'].seen).toEqual([0]);
  // 다른 탭에서 앞 학생으로 바꾼 것처럼(저장소의 지금 학생만 바뀜) — 다음 화면부터 그 학생의 상태로
  await page.locator('[data-act="next"]').click(); // 다음 학생: 둘째 카드
  await page.evaluate((id) => { Tutor.store.set('current', id); }, STUDENT.id);
  await goHash(page, '#/home'); // 같은 주소로는 다시 그리지 않으니 다른 화면을 거쳐
  await goHash(page, '#/unit/math-m2-01/learn');
  // 앞 학생은 네 카드를 다 봤다 → 첫 카드부터(다음 학생이 보던 둘째 카드가 이어지지 않는다)
  expect(await visibleCard(page)).toEqual([0]);
  await expect(page.locator('#cvResume')).toHaveCount(0);
});
