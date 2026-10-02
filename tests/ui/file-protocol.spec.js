const { test, expect } = require('@playwright/test');
const { collectErrors, waitReady, flushStore, trackCsp, cspViolations, FILE_URL } = require('./helpers');

/*
 * 사용자는 index.html 을 더블클릭(file://)해서 연다. 이때 ES 모듈·fetch 는 막히고 localStorage 도 막힐 수 있다.
 * 진짜 data/ 를 그대로 쓴다 — 내용은 바뀌므로 구조만 확인한다:
 * 첫 학교급 → 첫 학년 → 공부할 수 있는 첫 과목 → 첫 단원(준비 중 단원은 건너뛴다) → 개념 카드가 보이고 콘솔 에러가 없다.
 */

async function walkToFirstUnit(page) {
  await page.goto(FILE_URL);
  await waitReady(page);
  await expect(page).toHaveURL(/#\/setup$/);
  await page.locator('.level-card').first().click();
  await waitReady(page);
  // 학년이 하나뿐인 학교급이면 바로 별명 단계
  if (await page.locator('.grade-btn').count()) {
    await page.locator('.grade-btn').first().click();
    await waitReady(page);
  }
  await page.getByRole('button', { name: '시작하기' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/home$/);
  // 단원이 모두 준비 중인 과정(카드에 '준비 중')은 건너뛴다
  const cards = page.locator('a.teacher-card:not(.is-soon)');
  expect(await cards.count()).toBeGreaterThan(0);
  await cards.first().click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/course\//);
  // 열 수 있는 단원만 링크다(준비 중 단원은 누를 수 없다)
  const rows = page.locator('a.unit-row');
  expect(await rows.count()).toBeGreaterThan(0);
  await rows.first().click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/unit\/[^/]+\/learn$/);
  await expect(page.locator('.page-title')).not.toBeEmpty();
  await expect(page.locator('.concept-card:visible')).toHaveCount(1);
  await expect(page.locator('.concept-card:visible .cc-title')).not.toBeEmpty();
  await expect(page.locator('.concept-card:visible .cc-body')).not.toBeEmpty();
}

test.describe('file:// 로 직접 열었을 때 (진짜 data/)', () => {
  test('학교급 → 학년 → 과목 → 단원 → 개념 카드, 콘솔 에러·CSP 위반 없음, 다시 열어도 학생이 남는다', async ({ page }) => {
    const errors = collectErrors(page);
    await trackCsp(page);
    await walkToFirstUnit(page);
    // 다음 카드로 넘기기·탭 바꾸기도 file:// 에서 된다
    if (await page.getByRole('button', { name: '다음 ›' }).isEnabled()) {
      await page.getByRole('button', { name: '다음 ›' }).click();
      await expect(page.locator('#cvCount')).toContainText('카드 2');
    }
    await page.locator('.unit-tabs a', { hasText: '문제' }).click();
    await waitReady(page);
    await expect(page).toHaveURL(/\/practice$/);
    await page.goBack();
    await waitReady(page);
    await expect(page).toHaveURL(/\/learn$/);
    expect(await page.evaluate(() => window.TutorApp.engines())).toEqual({
      TutorMath: true, TutorText: true, TutorFig: true, TutorSearch: true, TutorSolver: true,
    });
    // 더블클릭으로 연 화면에서도 기록이 이 기기에 남는다 (IndexedDB, 안 되면 localStorage)
    expect(['indexeddb', 'localstorage']).toContain(await page.evaluate(() => window.TutorApp.storageProvider));
    // 백업 암호화(Web Crypto)도 file:// 에서 쓸 수 있다
    expect(await page.evaluate(() => window.TutorStorage.canEncrypt())).toBe(true);
    await flushStore(page);
    await page.reload();
    await waitReady(page);
    await expect(page.locator('#studentChip')).toBeVisible();
    expect(await cspViolations(page)).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('localStorage·IndexedDB 를 못 써도 화면이 죽지 않는다', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', { configurable: true, get() { throw new Error('localStorage blocked'); } });
      Object.defineProperty(window, 'indexedDB', { configurable: true, get() { throw new Error('indexedDB blocked'); } });
    });
    const errors = collectErrors(page);
    await walkToFirstUnit(page);
    expect(await page.evaluate(() => window.TutorApp.storageOk)).toBe(false);
    expect(errors).toEqual([]);
  });

  test('file:// 에서는 서비스 워커를 등록하지 않고, 외부로 아무 요청도 하지 않는다', async ({ page }) => {
    const external = [];
    const sw = [];
    page.on('request', (r) => {
      if (/^https?:/.test(r.url())) external.push(r.url());
      if (/\/sw\.js(\?|$)/.test(r.url())) sw.push(r.url());
    });
    await page.goto(FILE_URL);
    await waitReady(page);
    expect(await page.evaluate(() => location.protocol)).toBe('file:');
    expect(await page.evaluate(() => !!(navigator.serviceWorker && navigator.serviceWorker.controller))).toBe(false);
    expect(sw).toEqual([]);
    expect(external).toEqual([]);
  });
});
