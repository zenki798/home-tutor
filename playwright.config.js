const fs = require('fs');
const { defineConfig, devices, webkit } = require('@playwright/test');

const PORT = 4182;
const BASE_URL = 'http://localhost:' + PORT;

/* 이 PC 에 Edge 가 있으면 실제 Edge 로 file:// 화면도 확인한다 (사용자는 Edge 로 더블클릭해서 연다). CI 에서는 뺀다. */
const EDGE_PATHS = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];
const HAS_EDGE = !process.env.CI && process.platform === 'win32' && EDGE_PATHS.some((p) => fs.existsSync(p));
/* 속도를 재는 시험(describe 제목에 '성능') — perf 프로젝트에서만 돈다 */
const PERF = /성능/;
/* 아이폰·아이패드의 사파리와 같은 WebKit 엔진으로도 화면을 확인한다(2026-10-08). CI 는 늘(워크플로가 설치), 이 PC 는 깔려 있을 때만 */
const HAS_WEBKIT = !!process.env.CI || (function () { try { return fs.existsSync(webkit.executablePath()); } catch (e) { return false; } })();

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  /* 사용자가 같은 PC 에서 다른 일을 한다 — 창 없이(headless), 동시 2개 */
  workers: process.env.CI ? 4 : 2,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 60 * 1000,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: BASE_URL,
    headless: true,
    locale: 'ko-KR',
    trace: 'on-first-retry',
    /* 서비스 워커는 기본으로 막고, 앱 설치·오프라인 검사에서만 켠다 */
    serviceWorkers: 'block',
  },

  projects: [
    /* 브라우저 없이 도는 검사: 엔진 단위 테스트 + 학습 내용 전체 검사 (속도 시험은 아래 perf 로) */
    { name: 'logic', testDir: './tests/logic', grepInvert: PERF },
    {
      name: 'desktop',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } },
    },
    {
      name: 'mobile',
      testDir: './tests/ui',
      use: { ...devices['Pixel 5'] },
    },
    ...(HAS_EDGE
      ? [{ name: 'edge-file', testDir: './tests/edge', use: { channel: 'msedge', viewport: { width: 1280, height: 900 } } }]
      : []),
    /* 아이폰(WebKit). 크롬에만 있는 기능을 보는 시험은 뺀다 — 개발 도구(CDP)로 본 설치 가능 판정 · 안드로이드 크롬의 설치 신호(beforeinstallprompt) ·
       서비스 워커가 받는 요청을 가짜 자료로 바꿔 끼우기(WebKit 에서는 Playwright 가 하지 못해 진짜 단원 파일이 온다).
       파일(file://)로 여는 시험은 PC 더블클릭용이라 뺀다(아이폰은 인터넷 주소로 연다). 아이폰 설치 안내는 그대로 본다(pwa.spec.js) */
    ...(HAS_WEBKIT ? [{
      name: 'iphone', testDir: './tests/ui', use: { ...devices['iPhone 13'] },
      testIgnore: ['**/file-protocol.spec.js'],
      grepInvert: /크롬이 설치 가능한 앱으로 인정한다|안드로이드 크롬|한 번 본 단원은 인터넷이 끊겨도/,
    }] : []),
    /* 속도 시험(제목에 '성능')은 다른 시험이 다 끝난 뒤에 돈다. 학습 내용 전체 검사(약 2분, CPU 를 많이 씀)와 겹치면
       재는 시간이 두 배 넘게 부풀어 한도를 넘었다(2026-10-08 — 따로 재면 검색 색인 0.5~0.8초, 겹치면 1.5~1.8초). 한도는 그대로 둔다.
       logic 만 돌릴 때: npm run test:logic (= --project=logic --project=perf --no-deps) */
    { name: 'perf', testDir: './tests/logic', grep: PERF,
      dependencies: ['logic', 'desktop', 'mobile'].concat(HAS_EDGE ? ['edge-file'] : [], HAS_WEBKIT ? ['iphone'] : []) },
  ],

  /* 브라우저 없는 검사(logic)만 돌릴 때는 TUTOR_NO_SERVER=1 로 서버를 띄우지 않는다
     (여러 작업이 동시에 엔진 테스트를 돌려도 포트가 부딪히지 않게) */
  webServer: process.env.TUTOR_NO_SERVER
    ? undefined
    : {
        command: 'node server.js',
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 30 * 1000,
      },
});
