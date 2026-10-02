const { test, expect } = require('@playwright/test');
const { open, collectErrors, waitReady, STUDENT } = require('./helpers');

/*
 * 앱(PWA) 설치 — 홈 화면에 추가하면 주소창 없이(standalone) 뜨는지, 설치 조건(manifest·아이콘·서비스 워커)을
 * 크롬이 인정하는지, 한 번 본 단원을 오프라인에서도 보는지, 앱 모드·설치 안내가 맞는지.
 */

test('manifest: 단독 실행(standalone), 시작 주소·범위, 이름, 아이콘 3종(일반 192·512, 마스커블)', async ({ request }) => {
  const res = await request.get('/manifest.webmanifest');
  expect(res.ok()).toBe(true);
  const m = await res.json();
  expect(m.name).toBe('가정교사 — 초등부터 성인까지 혼자 공부');
  expect(m.short_name).toBe('가정교사');
  expect(m.display).toBe('standalone');
  expect(m.start_url).toBe('./?source=pwa');
  expect(m.scope).toBe('./');
  expect(m.lang).toBe('ko');
  const has = (size, purpose) => m.icons.some((i) => i.sizes === size && i.type === 'image/png' && (i.purpose || 'any').includes(purpose));
  expect(has('192x192', 'any')).toBe(true);
  expect(has('512x512', 'any')).toBe(true);
  expect(has('512x512', 'maskable')).toBe(true);
});

test('아이콘 파일이 실제로 있고 적힌 크기와 같다 (apple-touch-icon 180 포함)', async ({ page }) => {
  await open(page, { student: true, url: '/#/home' });
  const sizes = await page.evaluate(async () => {
    const m = await (await fetch('manifest.webmanifest')).json();
    const list = m.icons.map((i) => ({ src: i.src, want: Number(i.sizes.split('x')[0]) }))
      .concat({ src: document.querySelector('link[rel="apple-touch-icon"]').getAttribute('href'), want: 180 });
    return Promise.all(list.map(({ src, want }) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ src, want, w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = () => resolve({ src, want, w: 0, h: 0 });
      img.src = src;
    })));
  });
  for (const s of sizes) expect(s, s.src).toMatchObject({ w: s.want, h: s.want });
});

test('홈 화면 앱용 설정: 안전 영역(노치)·테마 색·아이폰 단독 실행 메타 태그', async ({ page }) => {
  await open(page, { student: true, url: '/#/home' });
  await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content', /viewport-fit=cover/);
  await expect(page.locator('meta[name="theme-color"]').first()).toHaveAttribute('content', /^#/);
  await expect(page.locator('meta[name="apple-mobile-web-app-capable"]')).toHaveAttribute('content', 'yes');
  await expect(page.locator('meta[name="mobile-web-app-capable"]')).toHaveAttribute('content', 'yes');
  await expect(page.locator('meta[name="apple-mobile-web-app-title"]')).toHaveAttribute('content', '가정교사');
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', 'manifest.webmanifest');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
});

test.describe('서비스 워커를 켜고 검사', () => {
  test.use({ serviceWorkers: 'allow' });

  test('크롬이 설치 가능한 앱으로 인정한다 (설치 불가 사유 0건)', async ({ page, context }) => {
    const errors = collectErrors(page);
    const calls = await open(page, { context, student: true, url: '/#/home' });
    await page.evaluate(() => navigator.serviceWorker.ready);
    const cdp = await context.newCDPSession(page);
    const manifest = await cdp.send('Page.getAppManifest');
    expect(manifest.errors).toEqual([]);
    await expect.poll(async () => (await cdp.send('Page.getInstallabilityErrors')).installabilityErrors, { timeout: 15000 })
      .toEqual([]);
    expect(errors).toEqual([]);
    expect(calls.external).toEqual([]);
  });

  test('한 번 본 단원은 인터넷이 끊겨도 다시 볼 수 있다', async ({ page, context }) => {
    await open(page, { context, student: true, url: '/#/home' });
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.reload(); // 서비스 워커가 페이지를 맡은 상태로
    await waitReady(page);
    await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
    await page.evaluate(() => { location.hash = '#/unit/math-m2-01/learn'; });
    await waitReady(page);
    await expect(page.locator('.page-title')).toHaveText('일차부등식');
    // 뒤에서 캐시에 담길 시간을 준다
    await expect.poll(() => page.evaluate(async () => {
      const keys = await caches.keys();
      for (const k of keys) {
        const c = await caches.open(k);
        if (await c.match('data/units/math-m2-01.js')) return true;
      }
      return false;
    })).toBe(true);

    await context.setOffline(true);
    await page.goto('/?source=pwa#/unit/math-m2-01/learn');
    await waitReady(page);
    await expect(page.locator('.page-title')).toHaveText('일차부등식');
    await expect(page.locator('.concept-card:visible .cc-title')).toHaveText('부등식이란?');
    await expect(page.locator('html')).toHaveClass(/app-mode/);
    await context.setOffline(false);
  });
});

test.describe('앱 모드 (홈 화면에서 실행)', () => {
  test('앱 모드 표시가 붙고, 설치 안내는 뜨지 않는다', async ({ page }) => {
    await open(page, { student: true, url: '/?source=pwa#/home' });
    await expect(page.locator('html')).toHaveClass(/app-mode/);
    expect(await page.evaluate(() => window.TutorApp.appMode)).toBe(true);
    await page.evaluate(() => {
      const e = new Event('beforeinstallprompt', { cancelable: true });
      e.prompt = () => {};
      e.userChoice = Promise.resolve({});
      window.dispatchEvent(e);
    });
    await expect(page.locator('#install-bar')).toBeHidden();
  });

  test('처음 실행(시작 주소)도 화면이 뜬다', async ({ page }) => {
    await open(page, { url: '/?source=pwa' });
    await expect(page).toHaveURL(/\?source=pwa#\/setup$/);
    await expect(page.locator('.level-card')).toHaveCount(5);
  });
});

test.describe('설치 안내 (브라우저로 볼 때)', () => {
  const fire = (page) => page.evaluate(() => {
    const e = new Event('beforeinstallprompt', { cancelable: true });
    e.prompt = () => { window.__prompted = true; };
    e.userChoice = Promise.resolve({ outcome: 'accepted' });
    window.dispatchEvent(e);
  });

  test('안드로이드 크롬: 설치 가능 신호가 오면 "앱으로 설치" 버튼을 보이고, 누르면 설치 창을 띄운다', async ({ page }) => {
    await open(page, { student: true, url: '/#/home' });
    await expect(page.locator('#install-bar')).toBeHidden();
    await fire(page);
    await expect(page.locator('#install-bar')).toBeVisible();
    await expect(page.locator('#install-text')).toContainText('주소창 없이 앱처럼');
    await page.locator('#install-btn').click();
    expect(await page.evaluate(() => window.__prompted)).toBe(true);
    await expect(page.locator('#install-bar')).toBeHidden();
  });

  test('설정 화면에서도 설치 버튼을 누를 수 있다', async ({ page }) => {
    await open(page, { student: true, url: '/#/settings' });
    await expect(page.locator('[data-act="install"]')).toBeHidden();
    await fire(page);
    await page.locator('[data-act="install"]').click();
    expect(await page.evaluate(() => window.__prompted)).toBe(true);
  });

  test('닫기를 누르면 다음에 다시 열어도 안내하지 않는다', async ({ page }) => {
    await open(page, { student: true, url: '/#/home' });
    await fire(page);
    await page.locator('#install-close').click();
    await expect(page.locator('#install-bar')).toBeHidden();
    await page.reload();
    await waitReady(page);
    await fire(page);
    await expect(page.locator('#install-bar')).toBeHidden();
  });
});

test.describe('아이폰·아이패드 설치 안내 (사파리에는 설치 버튼이 없어 글로 안내한다)', () => {
  async function asDevice(page, { ua, platform, touchPoints }) {
    await page.addInitScript(([u, p, t]) => {
      Object.defineProperty(Navigator.prototype, 'userAgent', { get: () => u });
      Object.defineProperty(Navigator.prototype, 'platform', { get: () => p });
      Object.defineProperty(Navigator.prototype, 'maxTouchPoints', { get: () => t });
    }, [ua, platform, touchPoints]);
    await open(page, { student: true, url: '/#/home' });
  }
  const MAC_SAFARI = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15';
  const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';

  test('아이폰: 아래쪽 공유 버튼으로 홈 화면에 추가하라고 안내한다', async ({ page }) => {
    await asDevice(page, { ua: IPHONE, platform: 'iPhone', touchPoints: 5 });
    await expect(page.locator('#install-bar')).toBeVisible();
    await expect(page.locator('#install-text')).toContainText('아래쪽 공유 버튼');
    await expect(page.locator('#install-btn')).toBeHidden();
  });

  test('아이패드(사파리가 Mac 처럼 밝혀도): 오른쪽 위 공유 버튼으로 안내한다', async ({ page }) => {
    await asDevice(page, { ua: MAC_SAFARI, platform: 'MacIntel', touchPoints: 5 });
    await expect(page.locator('#install-bar')).toBeVisible();
    await expect(page.locator('#install-text')).toContainText('오른쪽 위 공유 버튼');
  });

  test('진짜 Mac(터치 없음)에는 안내하지 않는다', async ({ page }) => {
    await asDevice(page, { ua: MAC_SAFARI, platform: 'MacIntel', touchPoints: 0 });
    await expect(page.locator('#install-bar')).toBeHidden();
  });
});
