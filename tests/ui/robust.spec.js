const { test, expect } = require('@playwright/test');
const { open, collectErrors, waitReady, goHash, answerCurrent, flushStore, STUDENT } = require('./helpers');

/*
 * 튼튼함: localStorage·IndexedDB 가 막혀도, 엔진 파일이 없어도, 데이터가 실패해도 화면이 죽지 않는다.
 * 뒤로 가기(브라우저 기록), 없는 주소, 글자 이스케이프(별명에 태그를 넣어도 태그로 해석하지 않음).
 */

/* 처음 설정부터 개념 카드·문제 풀이·설정까지 한 바퀴 */
async function walkThrough(page) {
  await page.getByRole('link', { name: /중학교/ }).click();
  await waitReady(page);
  await page.getByRole('link', { name: '2학년' }).click();
  await waitReady(page);
  await page.getByRole('button', { name: '시작하기' }).click();
  await waitReady(page);
  await expect(page.locator('.teacher-card')).toHaveCount(2);
}

test('localStorage 가 막혀도 처음 설정부터 문제 풀이까지 화면이 정상 동작하고, 기록은 IndexedDB 에 남는다', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { configurable: true, get() { throw new Error('localStorage blocked'); } });
  });
  const errors = collectErrors(page);
  const calls = await open(page);
  await walkThrough(page);
  await expect(page.locator('.notice')).toHaveCount(0); // IndexedDB 로 저장하므로 "저장할 수 없어요" 안내는 없다
  await goHash(page, '#/unit/math-m2-01/learn');
  await page.getByRole('button', { name: '다음 ›' }).click();
  await expect(page.locator('#cvCount')).toHaveText('카드 2 / 4');
  await goHash(page, '#/quiz/math-m2-01?n=5&lv=1&seed=3');
  await answerCurrent(page, 'right', { withUnit: true });
  await expect(page.locator('.quiz .feedback')).toHaveClass(/is-ok/);
  await goHash(page, '#/settings');
  await page.getByRole('radio', { name: '어둡게' }).check();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await page.evaluate(() => window.TutorApp.storageProvider)).toBe('indexeddb');
  expect(await page.evaluate(() => window.TutorApp.storageOk)).toBe(true);
  await flushStore(page);
  await page.reload();
  await waitReady(page);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await goHash(page, '#/course/math-m2');
  await expect(page.locator('.unit-row').first()).toContainText('개념 2/4');
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('IndexedDB·localStorage 가 모두 막혀도 화면은 정상 동작하고, 기록이 남지 않는다고 알린다', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { configurable: true, get() { throw new Error('localStorage blocked'); } });
    Object.defineProperty(window, 'indexedDB', { configurable: true, get() { throw new Error('indexedDB blocked'); } });
  });
  const errors = collectErrors(page);
  const calls = await open(page);
  await walkThrough(page);
  await expect(page.locator('.notice')).toContainText('기록을 저장할 수 없어요');
  await goHash(page, '#/unit/math-m2-01/learn');
  await page.getByRole('button', { name: '다음 ›' }).click();
  await expect(page.locator('#cvCount')).toHaveText('카드 2 / 4');
  await goHash(page, '#/quiz/math-m2-01?n=5&lv=1&seed=3');
  await answerCurrent(page, 'right', { withUnit: true });
  await expect(page.locator('.quiz .feedback')).toHaveClass(/is-ok/);
  await goHash(page, '#/settings');
  await page.getByRole('radio', { name: '어둡게' }).check();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('.set-sec', { hasText: '가정교사 정보' })).toContainText('기록을 저장할 수 없어요');
  expect(await page.evaluate(() => window.TutorApp.storageProvider)).toBe('memory');
  expect(await page.evaluate(() => window.TutorApp.storageOk)).toBe(false);
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('뒤로 가기: 브라우저 기록과 위쪽 뒤로 버튼', async ({ page }) => {
  await open(page, { student: true, url: '/#/home' });
  await expect(page.locator('#backBtn')).toBeHidden();
  await page.locator('.teacher-card').first().click();
  await waitReady(page);
  await page.locator('.unit-row').first().click();
  await waitReady(page);
  await page.locator('.unit-tabs a', { hasText: '예제' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/examples$/);

  await page.goBack();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/unit\/math-m2-01\/learn$/);
  await expect(page.locator('.unit-tabs [aria-current="page"]')).toHaveText('개념');
  await page.goBack();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/course\/math-m2$/);
  await page.goForward();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/unit\/math-m2-01\/learn$/);

  // 위쪽 뒤로 버튼은 앱 안에서 온 화면이면 브라우저 기록대로
  await page.locator('#backBtn').click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/course\/math-m2$/);
  await page.locator('#backBtn').click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/home$/);
});

test('주소로 바로 연 단원에서 뒤로 버튼을 누르면 그 과정으로 올라간다', async ({ page }) => {
  await open(page, { student: true, url: '/#/unit/math-m2-02/examples' });
  await expect(page.locator('#backBtn')).toBeVisible();
  await page.locator('#backBtn').click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/course\/math-m2$/);
  await page.locator('#backBtn').click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/home$/);
});

test('없는 주소·없는 과정은 안내 화면', async ({ page }) => {
  await open(page, { student: true, url: '/#/nothing-here' });
  await expect(page.locator('.state-box')).toContainText('찾는 화면이 없어요');
  await goHash(page, '#/course/no-such-course');
  await expect(page.locator('.state-box')).toContainText('찾는 화면이 없어요');
});

test('없는 단원 파일은 오류 화면 + 다시 시도 (경로를 벗어나는 이름은 아예 싣지 않는다)', async ({ page }) => {
  const calls = await open(page, { student: true, url: '/#/unit/..%2Fsecret/learn', wait: false });
  await expect(page.locator('html')).toHaveAttribute('data-state', 'error');
  await expect(page.locator('.state-box.is-error')).toContainText('불러오지 못했어요');
  expect(calls.units).toEqual([]);
});

test('별명에 태그를 넣어도 글자 그대로 보인다 (스크립트로 해석하지 않음)', async ({ page }) => {
  const evil = { id: 'p-x', name: '<img src=x onerror="window.__xss=1">', level: 'mid', grade: 'm2', created: 1 };
  await open(page, { student: evil, url: '/#/' });
  await expect(page.locator('.profile-card .p-name')).toHaveText(evil.name);
  await page.locator('.profile-card').click();
  await waitReady(page);
  await expect(page.locator('.bubble-text')).toContainText('<img');
  expect(await page.locator('img[src="x"]').count()).toBe(0);
  expect(await page.evaluate(() => window.__xss)).toBeUndefined();
});

test('카탈로그를 불러오지 못하면 오류 화면', async ({ page }) => {
  await page.route(/\/data\/catalog\.js(\?.*)?$/, (route) => route.abort('connectionrefused'));
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-state', 'error');
  await expect(page.locator('.state-box.is-error')).toContainText('학습 목록(data/catalog.js)을 불러오지 못했어요');
  await expect(page.getByRole('button', { name: '다시 시도' })).toBeVisible();
});

test('엔진 파일이 없어도 화면은 죽지 않는다 (글자는 그대로, 채점은 간단히)', async ({ page }) => {
  const errors = collectErrors(page);
  await open(page, {
    student: true, url: '/#/unit/math-m2-01/learn',
    blockScripts: ['js/mathlib.js', 'js/mathtext.js', 'js/figures.js', 'js/search.js', 'js/solver.js'],
  });
  expect(await page.evaluate(() => window.TutorApp.engines())).toEqual({
    TutorMath: false, TutorText: false, TutorFig: false, TutorSearch: false, TutorSolver: false,
  });
  await expect(page.locator('.concept-card:visible .cc-body')).toContainText('부등식');
  await page.getByRole('button', { name: '다음 ›' }).click();
  await expect(page.locator('#cvCount')).toHaveText('카드 2 / 4');

  await goHash(page, '#/quiz/math-m2-01?n=5&lv=1&seed=8');
  const st = await page.evaluate(() => window.TutorApp.quizState());
  expect(st.items.every((it) => it.src === 'bank')).toBe(true); // 생성기는 엔진이 있어야
  await answerCurrent(page, 'right', { withUnit: true });
  await expect(page.locator('.quiz .feedback')).toHaveClass(/is-ok/);

  await goHash(page, '#/ask/math');
  await page.locator('#askInput').fill('부등식이 뭐예요?');
  await page.locator('#askInput').press('Enter');
  await expect(page.locator('.chat > li.msg.t').last()).toContainText('그 질문은 아직 제가 잘 몰라요');

  // 남는 콘솔 에러는 없는 파일을 못 불러왔다는 브라우저 기본 메시지뿐
  expect(errors.filter((e) => !/Failed to load resource/.test(e))).toEqual([]);
});
