/* 앱 아이콘 PNG 를 만든다 (`npm run make:icons`). 이미지 도구 없이 SVG 를 브라우저(Playwright 크로미움, 창 없이)로 찍는다.
 * - icon-192/512      : 일반 아이콘 (둥근 모서리, 바깥은 투명)
 * - icon-maskable-512 : 안드로이드 모양 마스크용 (배경을 끝까지 채우고, 그림은 가운데 안전 영역 안에)
 * - apple-touch-icon  : iOS 홈 화면용 180px (배경을 끝까지 채운다. 모서리는 iOS 가 둥글린다)
 * 그림: 따뜻한 파랑~남색 바탕 위에 펼친 책과 연필. 작게 보여도 알아보게 단순한 면으로만 그린다. */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'icons');
const BG_TOP = '#4d86e8';
const BG_BOTTOM = '#1d3889';

/* 100×100 좌표계. 책+연필 전체가 가운데(50,50)에 오도록 잡았다. */
function glyph(scale) {
  const t = (100 - 100 * scale) / 2;
  return `
  <g transform="translate(${t} ${t}) scale(${scale})">
    <g transform="translate(0 4)">
      <!-- 책 표지(아래 테두리) -->
      <path d="M14 40 L14 74 C27 71.5 41 72.5 50 79 C59 72.5 73 71.5 86 74 L86 40 Z" fill="#ffb547"/>
      <!-- 왼쪽·오른쪽 쪽 -->
      <path d="M50 42 C42 35.5 29 34.5 18 36.5 L18 70 C29 68 42 69 50 75 Z" fill="#ffffff"/>
      <path d="M50 42 C58 35.5 71 34.5 82 36.5 L82 70 C71 68 58 69 50 75 Z" fill="#e9f0ff"/>
      <path d="M50 42 L50 75" stroke="#b9c8ec" stroke-width="1.6" stroke-linecap="round"/>
      <!-- 글줄 -->
      <g stroke="#a9bce6" stroke-width="2.2" stroke-linecap="round" fill="none">
        <path d="M24.5 45 C31 44 37.5 44.5 43.5 47"/>
        <path d="M24.5 52 C31 51 37.5 51.5 43.5 54"/>
        <path d="M24.5 59 C31 58 37.5 58.5 43.5 61"/>
      </g>
      <!-- 연필 (오른쪽 쪽에 기대어) -->
      <g transform="rotate(-45 70 30)">
        <rect x="53.5" y="25.5" width="27" height="9" fill="#ff6b5b"/>
        <rect x="53.5" y="25.5" width="27" height="3" fill="#ff8f7f"/>
        <rect x="80.5" y="25.5" width="3" height="9" fill="#d7dce6"/>
        <rect x="83.5" y="25.5" width="4.5" height="9" rx="1.5" fill="#ffd0d6"/>
        <path d="M53.5 25.5 L53.5 34.5 L45 30 Z" fill="#f7d9a8"/>
        <path d="M48.2 28.3 L48.2 31.7 L45 30 Z" fill="#2b2f3a"/>
      </g>
    </g>
  </g>`;
}

function svg({ rounded, scale }) {
  const defs = `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${BG_TOP}"/><stop offset="1" stop-color="${BG_BOTTOM}"/></linearGradient></defs>`;
  const bg = rounded
    ? `<rect x="4" y="4" width="92" height="92" rx="22" fill="url(#bg)"/>`
    : `<rect width="100" height="100" fill="url(#bg)"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${defs}${bg}${glyph(scale)}</svg>`;
}

const ICONS = [
  { file: 'icon-192.png', size: 192, rounded: true, scale: 0.86 },
  { file: 'icon-512.png', size: 512, rounded: true, scale: 0.86 },
  { file: 'icon-maskable-512.png', size: 512, rounded: false, scale: 0.7 }, // 안전 영역: 가운데 지름 80%
  { file: 'apple-touch-icon.png', size: 180, rounded: false, scale: 0.8 },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch(); // 창 없이(headless)
  const page = await browser.newPage();
  for (const icon of ICONS) {
    await page.setViewportSize({ width: icon.size, height: icon.size });
    await page.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block;width:${icon.size}px;height:${icon.size}px}</style>${svg(icon)}`);
    await page.locator('svg').screenshot({ path: path.join(OUT, icon.file), omitBackground: true });
    console.log('icons/' + icon.file);
  }
  await browser.close();
})();
