const fs = require('fs');
const { defineConfig, devices } = require('@playwright/test');

const PORT = 4182;
const BASE_URL = 'http://localhost:' + PORT;

/* 이 PC 에 Edge 가 있으면 실제 Edge 로 file:// 화면도 확인한다 (사용자는 Edge 로 더블클릭해서 연다). CI 에서는 뺀다. */
const EDGE_PATHS = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];
const HAS_EDGE = !process.env.CI && process.platform === 'win32' && EDGE_PATHS.some((p) => fs.existsSync(p));

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
    /* 브라우저 없이 도는 검사: 엔진 단위 테스트 + 학습 내용 전체 검사 */
    { name: 'logic', testDir: './tests/logic' },
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
