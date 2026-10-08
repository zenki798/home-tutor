const { test, expect } = require('@playwright/test');
const { open, goHash } = require('./helpers');

/*
 * 기록 지키기 (docs/ARCHITECTURE.md §9.7 — 1순위 데이터 보호): 브라우저는 저장 공간이 모자라면 사이트 기록을 지울 수 있다.
 * 학생 기록이 생기면 브라우저에 한 번 "지우지 말아 달라"(navigator.storage.persist)고 요청하고(파이어폭스는 창을 띄워 물어서 저절로는 안 함),
 * 설정에서 지금 상태·쓰는 공간을 보이고, 받아 주지 않았으면 백업을 권하며 다시 요청할 수 있다. 아이폰 사파리는 7일 삭제를 알린다.
 * 브라우저의 저장 관리자(navigator.storage)를 시험 안에서 바꿔 끼워 결과를 정한다.
 */
async function stubStorage(page, { persisted = false, grant = false, usage = 1258291, ua = null } = {}) {
  await page.addInitScript(([persisted0, grant0, usage0, ua0]) => {
    window.__keep = { persisted: persisted0, grant: grant0, asks: 0 };
    const sm = {
      persisted: () => Promise.resolve(window.__keep.persisted),
      persist: () => { window.__keep.asks += 1; window.__keep.persisted = window.__keep.grant; return Promise.resolve(window.__keep.grant); },
      estimate: () => Promise.resolve({ usage: usage0, quota: 1e9 }),
    };
    Object.defineProperty(Navigator.prototype, 'storage', { configurable: true, get: () => sm });
    if (ua0) Object.defineProperty(Navigator.prototype, 'userAgent', { configurable: true, get: () => ua0 });
  }, [persisted, grant, usage, ua]);
}
const asks = (page) => page.evaluate(() => window.__keep.asks);

test('학생 기록이 생기면 브라우저에 한 번 기록 보존을 요청하고, 설정에 "지켜 주고 있어요"와 쓰는 공간을 보인다', async ({ page }) => {
  await stubStorage(page, { persisted: false, grant: true });
  await open(page, { student: true, url: '/#/home' });
  await expect.poll(() => asks(page)).toBe(1);
  await goHash(page, '#/notes');
  await goHash(page, '#/settings');
  expect(await asks(page)).toBe(1); // 한 번만
  await expect(page.locator('#keepState')).toHaveText('이 브라우저는 이 기기의 학습 기록을 지우지 않고 지켜 주고 있어요.');
  await expect(page.locator('[data-act="keep-ask"]')).toHaveCount(0);
  await expect(page.locator('#keepUsage')).toHaveText('이 사이트가 이 기기에 쓰는 공간: 약 1.2MB (한 번 본 단원 내용의 사본 포함)');
});

test('브라우저가 받아 주지 않으면 설정에서 백업을 권하고, 단추로 다시 요청할 수 있다', async ({ page }) => {
  await stubStorage(page, { persisted: false, grant: false });
  await open(page, { student: true, url: '/#/settings' });
  await expect(page.locator('#keepState')).toContainText('저장 공간이 모자라면 브라우저가 학습 기록을 지울 수 있어요');
  const ask = page.getByRole('button', { name: '기록을 지켜 달라고 요청하기' });
  await expect(ask).toBeVisible();
  const before = await asks(page);
  await page.evaluate(() => { window.__keep.grant = true; });
  await ask.click();
  await expect(page.locator('#keepState')).toContainText('지켜 주고 있어요');
  await expect(page.locator('#keepState')).toBeFocused();
  expect(await asks(page)).toBe(before + 1);
  await expect(page.locator('[data-act="keep-ask"]')).toHaveCount(0);
});

test('학생이 아직 없으면(처음 설정 화면) 요청하지 않는다', async ({ page }) => {
  await stubStorage(page, { persisted: false, grant: true });
  await open(page, { url: '/#/setup' });
  await page.waitForTimeout(300);
  expect(await asks(page)).toBe(0);
});

test('파이어폭스: 저절로는 요청하지 않고, 설정의 단추로만', async ({ page }) => {
  const FIREFOX = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0';
  await stubStorage(page, { persisted: false, grant: true, ua: FIREFOX });
  await open(page, { student: true, url: '/#/home' });
  await page.waitForTimeout(300);
  expect(await asks(page)).toBe(0);
  await goHash(page, '#/settings');
  await page.getByRole('button', { name: '기록을 지켜 달라고 요청하기' }).click();
  await expect(page.locator('#keepState')).toContainText('지켜 주고 있어요');
  expect(await asks(page)).toBe(1);
});

test('아이폰 사파리(홈 화면 앱이 아닐 때): 7일 동안 열지 않으면 기록이 지워질 수 있다고 알리고, 설치 안내에도 기록 이야기를 붙인다', async ({ page }) => {
  const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
  await stubStorage(page, { persisted: false, grant: false, ua: IPHONE });
  await open(page, { student: true, url: '/#/home' });
  await expect(page.locator('#install-text')).toContainText('홈 화면에 추가하면 학습 기록도 오래 남아요');
  await goHash(page, '#/settings');
  await expect(page.locator('.keep-ios')).toContainText('7일 넘게 열지 않은 사이트의 기록이 지워질 수 있어요');
});

test('저장 관리자가 없는 브라우저: 단추 없이 백업을 권하는 말만', async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(Navigator.prototype, 'storage', { configurable: true, get: () => undefined }); });
  await open(page, { student: true, url: '/#/settings' });
  await expect(page.locator('#keepState')).toContainText('가끔 아래에서 백업 파일을 만들어 두면');
  await expect(page.locator('[data-act="keep-ask"]')).toHaveCount(0);
  await expect(page.locator('#keepUsage')).toBeHidden();
});
