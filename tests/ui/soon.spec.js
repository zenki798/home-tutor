const { test, expect } = require('@playwright/test');
const { open, collectErrors, waitReady, goHash } = require('./helpers');

/*
 * 준비 중 단원 (카탈로그 soon: true): 과정 화면에는 "준비 중" 으로 보이지만 누를 수 없고, 예상문제·이어서 공부하기에서 빠지고,
 * 주소로 바로 들어오면 오류가 아니라 친절한 "준비 중이에요" 화면. 단원이 모두 준비 중인 과정은 과목 카드에도 표시한다.
 * 시험 카탈로그(tests/fixtures/catalog.js)를 시험마다 조금 바꿔 끼운다.
 */

const MINSU = { id: 'p-minsu', name: '민수', avatar: '🐻', level: 'mid', grade: 'm2', pace: 'normal', created: 1 };
const PATCH = {
  soon: ['math-m2-02'],
  courses: [{
    id: 'kor-m2', subject: 'kor', level: 'mid', grades: ['m2'], title: '중학교 국어 2',
    note: '테스트용 과정 · 단원을 모두 만들고 있다',
    units: [
      { id: 'kor-m2-01', title: '비유하는 표현', summary: '빗대어 말하는 방법을 알아봐요.', soon: true },
      { id: 'kor-m2-02', title: '설명하는 글', summary: '대상을 알기 쉽게 풀어 쓴 글을 읽어요.', soon: true },
    ],
  }],
};

test('과목 카드: 단원이 모두 준비 중인 과정은 "준비 중" 표시와 함께 뒤로 간다', async ({ page }) => {
  const errors = collectErrors(page);
  const calls = await open(page, { student: [MINSU], catalogPatch: PATCH, url: '/#/home' });
  const cards = page.locator('.teacher-card');
  await expect(cards).toHaveCount(3);
  await expect(cards.nth(0)).toContainText('중학교 수학 2');
  await expect(cards.nth(0)).toContainText('준비 중 1개'); // 2단원 중 1개가 준비 중
  await expect(cards.nth(1)).toContainText('중학교 영어');
  await expect(cards.nth(2)).toContainText('중학교 국어 2');
  await expect(cards.nth(2)).toHaveClass(/is-soon/);
  await expect(cards.nth(2).locator('.soon-badge')).toHaveText('준비 중');
  await expect(page.locator('.teacher-card.is-soon')).toHaveCount(1);
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('과정 화면: 준비 중 단원은 표시만 하고 누를 수 없으며, 예상문제 단원 고르기·이어서 공부하기에서 빠진다', async ({ page }) => {
  const calls = await open(page, {
    student: [MINSU], catalogPatch: PATCH, url: '/#/course/math-m2',
    storage: { 'tutor.p.p-minsu.recent': ['math-m2-02', 'math-m2-01'] },
  });
  const rows = page.locator('.unit-row');
  await expect(rows).toHaveCount(2);
  await expect(page.locator('a.unit-row')).toHaveCount(1);
  const soonRow = page.locator('.unit-row.is-soon');
  await expect(soonRow).toHaveCount(1);
  await expect(soonRow).toContainText('연립일차방정식');
  await expect(soonRow).toContainText('준비 중');
  await expect(soonRow).toHaveAttribute('aria-disabled', 'true');
  await expect(page.locator('.section-title')).toContainText('준비 중 1개');
  await soonRow.click();
  await expect(page).toHaveURL(/#\/course\/math-m2$/); // 눌러도 아무 데도 가지 않는다
  // 이어서 공부하기: 최근에 연 단원이 준비 중이면 건너뛴다
  await expect(page.getByRole('link', { name: /이어서 공부하기/ })).toContainText('일차부등식');
  // 예상문제 단원 고르기: 준비된 단원만
  await page.getByRole('button', { name: /예상문제 풀기/ }).click();
  const boxes = page.locator('#mixForm input[name="u"]');
  await expect(boxes).toHaveCount(1);
  await expect(page.locator('#mixForm')).toContainText('일차부등식');
  await expect(page.locator('#mixForm')).not.toContainText('연립일차방정식');
  await page.locator('#mixForm').getByRole('radio', { name: '5문제' }).check();
  await page.locator('#mixForm').getByRole('radio', { name: '기본' }).check();
  await page.locator('#mixForm').getByRole('button', { name: '문제 풀기 시작' }).click();
  await waitReady(page);
  const st = await page.evaluate(() => window.TutorApp.quizState());
  expect(st.items.every((it) => it.unit === 'math-m2-01')).toBe(true);
  // 홈의 이어서 공부하기도 준비 중 단원은 건너뛴다
  await goHash(page, '#/home');
  await expect(page.locator('.continue-card')).toContainText('일차부등식');
  expect(calls.units).not.toContain('math-m2-02');
});

test('준비 중 단원을 주소로 바로 열면 오류가 아니라 "준비 중이에요" 화면 (단원 파일을 부르지 않는다)', async ({ page }) => {
  const errors = collectErrors(page);
  const calls = await open(page, { student: [MINSU], catalogPatch: PATCH, url: '/#/unit/math-m2-02/learn' });
  await expect(page.locator('html')).toHaveAttribute('data-state', 'ready');
  await expect(page.locator('.state-box.is-error')).toHaveCount(0);
  await expect(page.locator('.page-title')).toHaveText('연립일차방정식');
  await expect(page.locator('.soon-box')).toContainText('이 단원은 준비 중이에요.');
  await expect(page.locator('.bubble-text')).toContainText('지금 만들고 있어요');
  await expect(page.locator('#backBtn')).toBeVisible();
  // 같은 과정의 다른 단원으로 갈 수 있다
  await page.getByRole('link', { name: '일차부등식 공부하기' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/unit\/math-m2-01\/learn$/);
  // 예상문제 주소도 같은 안내
  await goHash(page, '#/quiz/math-m2-02?n=5&lv=1');
  await expect(page.locator('.soon-box')).toContainText('이 단원은 준비 중이에요.');
  await goHash(page, '#/unit/math-m2-02/practice');
  await expect(page.locator('.soon-box')).toBeVisible();
  expect(calls.units).toEqual(['math-m2-01']);
  // 최근 공부한 단원에 넣지 않는다
  const recent = await page.evaluate(() => window.Tutor.store.get('p.p-minsu.recent', []));
  expect(recent).not.toContain('math-m2-02');
  expect(errors).toEqual([]);
});

test('단원이 모두 준비 중인 과정: 기다려 달라는 안내, 이어서 공부하기·예상문제 없음', async ({ page }) => {
  const calls = await open(page, { student: [MINSU], catalogPatch: PATCH, url: '/#/home' });
  await page.locator('.teacher-card', { hasText: '중학교 국어 2' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/course\/kor-m2$/);
  await expect(page.locator('.soon-box')).toContainText('지금 만들고 있어요');
  await expect(page.getByRole('link', { name: /이어서 공부하기/ })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /예상문제 풀기/ })).toHaveCount(0);
  await expect(page.locator('.unit-row.is-soon')).toHaveCount(2);
  await expect(page.locator('a.unit-row')).toHaveCount(0);
  await expect(page.getByRole('link', { name: /선생님께 질문하기/ })).toBeVisible();
  // 예상문제 주소로 와도 과정 화면으로 돌려보낸다
  await page.evaluate(() => { location.hash = '#/quiz/kor-m2?n=5'; });
  await waitReady(page);
  await expect(page).toHaveURL(/#\/course\/kor-m2$/);
  expect(calls.units).toEqual([]);
});

test('교육과정 개정 반영 중인 단원: 목록에 "개정 반영 중" 표시, 열 수 있고 단원 위에 안내', async ({ page }) => {
  const errors = collectErrors(page);
  const calls = await open(page, { student: true, url: '/#/course/math-m2', catalogPatch: { rev: ['math-m2-02'] } });
  const rows = page.locator('.unit-row');
  await expect(rows.nth(1).locator('.rev-badge')).toHaveText('개정 반영 중');
  await expect(rows.nth(0).locator('.rev-badge')).toHaveCount(0);
  await rows.nth(1).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/unit\/math-m2-02\/learn$/);
  await expect(page.locator('.rev-note')).toContainText('새 교육과정에 맞춰 이 단원을 고치고 있어요');
  await expect(page.locator('.concept-card:visible')).toHaveCount(1); // 공부는 그대로 된다
  await page.evaluate(() => { location.hash = '#/unit/math-m2-01/learn'; });
  await waitReady(page);
  await expect(page.locator('.rev-note')).toHaveCount(0);
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});
