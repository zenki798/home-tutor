const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { open, collectErrors, goHash, trackCsp, cspViolations, answerCurrent, ROOT } = require('./helpers');

/*
 * CSP (AGENTS.md 규칙 7, ARCHITECTURE §9.5): index.html 의 meta 로 자기 파일만 싣고 밖으로 아무것도 보내지 않는다.
 * 인라인 스크립트·인라인 이벤트(onclick=…)를 쓰지 않는다. 여러 화면을 돌아도 CSP 위반·외부 요청이 0건이다.
 */

const MINSU = { id: 'p-minsu', name: '민수', avatar: '🐻', level: 'mid', grade: 'm2', pace: 'normal', created: 1 };
const NOTE = {
  key: 'math-m2-01#p6', unit: 'math-m2-01', given: 'O', at: 1, wrongCount: 1, rightStreak: 0, gen: null, src: 'bank',
  problem: { id: 'p6', level: 1, type: 'ox', q: '부등식 $-3x>6$ 의 양쪽을 $-3$ 으로 나누면 $x>-2$ 가 된다.', answer: false, explain: '방향이 바뀌어요.' },
};
const WANT = {
  'default-src': ["'self'", 'file:'],
  'script-src': ["'self'", 'file:'],
  'style-src': ["'self'", 'file:', "'unsafe-inline'"],
  'img-src': ["'self'", 'file:', 'data:', 'blob:'],
  'connect-src': ["'self'"],
  'object-src': ["'none'"],
  'base-uri': ["'none'"],
  'form-action': ["'none'"],
  'worker-src': ["'self'"],
  'manifest-src': ["'self'"],
};

test('index.html: CSP meta 가 맨 앞에 있고, 인라인 스크립트·인라인 이벤트가 없다', async () => {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const m = /<meta http-equiv="Content-Security-Policy" content="([^"]+)">/.exec(html);
  expect(m).not.toBeNull();
  const policy = {};
  m[1].split(';').map((s) => s.trim()).filter(Boolean).forEach((d) => {
    const parts = d.split(/\s+/);
    policy[parts[0]] = parts.slice(1);
  });
  expect(policy).toEqual(WANT);
  // CSP meta 는 스크립트·스타일보다 먼저
  expect(html.indexOf('Content-Security-Policy')).toBeLessThan(html.indexOf('<link rel="stylesheet"'));
  expect(html.indexOf('Content-Security-Policy')).toBeLessThan(html.indexOf('<script'));
  // 모든 <script> 는 src 가 있는 파일이다
  const scripts = html.match(/<script\b[^>]*>/g) || [];
  expect(scripts.length).toBeGreaterThan(5);
  for (const s of scripts) expect(s).toMatch(/\ssrc="[^"]+\.js"/);
  expect(html).not.toMatch(/\son[a-z]+\s*=/i);
  // 화면 코드에도 인라인 이벤트·javascript: 주소를 만들지 않는다
  const app = fs.readFileSync(path.join(ROOT, 'js', 'app.js'), 'utf8');
  expect(app).not.toMatch(/\son(click|load|error|submit|change|input|mouse\w*|key\w*)\s*=\s*\\?["']/i);
  expect(app).not.toMatch(/javascript:/i);
});

test('여러 화면을 돌아도 CSP 위반·인라인 이벤트·외부 요청이 0건', async ({ page }) => {
  const errors = collectErrors(page);
  await trackCsp(page);
  const requests = [];
  page.on('request', (r) => requests.push(r.url()));
  const calls = await open(page, { student: [MINSU], storage: { 'tutor.p.p-minsu.notes': [NOTE] }, url: '/#/home' });
  const inlineHandlers = async () => page.evaluate(() => Array.from(document.querySelectorAll('*'))
    .filter((el) => Array.from(el.attributes).some((a) => /^on/i.test(a.name))).map((el) => el.outerHTML.slice(0, 60)));
  for (const h of ['#/home', '#/course/math-m2', '#/unit/math-m2-01/learn', '#/unit/math-m2-01/examples', '#/unit/sci-e5-01/learn',
    '#/quiz/math-m2-01?n=5&lv=1&seed=3', '#/notes', '#/stats', '#/settings', '#/']) {
    await goHash(page, h);
    expect(await inlineHandlers(), h).toEqual([]);
  }
  await goHash(page, '#/quiz/math-m2-01?n=5&lv=1&seed=3');
  await answerCurrent(page, 'wrong');
  await goHash(page, '#/ask/math');
  await page.locator('#askInput').fill('부등식의 성질이 뭐예요?');
  await page.locator('#askInput').press('Enter');
  await expect(page.locator('.chat > li.msg.t')).toHaveCount(2);
  await page.locator('#askInput').fill('3/4 ÷ 2/5');
  await page.locator('#askInput').press('Enter');
  await expect(page.locator('.chat > li.msg.t')).toHaveCount(3);
  expect(await inlineHandlers()).toEqual([]);

  expect(await cspViolations(page)).toEqual([]);
  expect(calls.external).toEqual([]);
  expect(requests.filter((u) => !/^http:\/\/localhost:\d+\//.test(u) && !/^(data|blob):/.test(u))).toEqual([]);
  expect(errors).toEqual([]);
});

test('CSP 가 실제로 걸려 있다: 페이지가 바깥 주소로 연결하려 하면 막힌다', async ({ page }) => {
  await trackCsp(page);
  const calls = await open(page, { student: [MINSU], url: '/#/home' });
  const result = await page.evaluate(() => fetch('https://example.com/collect?x=1').then(() => 'sent', () => 'blocked'));
  expect(result).toBe('blocked');
  expect((await cspViolations(page)).join(' ')).toContain('connect-src');
  expect(calls.external).toEqual([]); // 네트워크까지 가지도 않았다
});
