const path = require('path');
const { pathToFileURL } = require('url');
const { test, expect } = require('@playwright/test');

/*
 * 사용자는 Edge 에서 index.html 을 더블클릭(file://)해서 연다. 이 PC 의 실제 Edge(channel: msedge, 창 없이)로
 * 진짜 data/ 를 그대로 열어 같은 흐름을 확인하고, 화면을 test-results 에 사진으로 남긴다.
 */

const FILE_URL = pathToFileURL(path.resolve(__dirname, '..', '..', 'index.html')).href;

function collectErrors(page) {
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(e.message));
  return errors;
}
async function ready(page) {
  await expect(page.locator('html')).toHaveAttribute('data-state', 'ready');
}

test('Edge 로 더블클릭해 연 것처럼: 학교급 → 학년 → 과목 → 단원 → 개념, 문제 한 개', async ({ page }, testInfo) => {
  const errors = collectErrors(page);
  const external = [];
  page.on('request', (r) => { if (/^https?:/.test(r.url())) external.push(r.url()); });
  const shot = async (name) => page.screenshot({ path: testInfo.outputPath(name + '.png'), fullPage: true });
  // CSP(index.html 의 meta)가 file:// 에서 자기 파일을 막지 않는지
  await page.addInitScript(() => {
    window.__csp = [];
    document.addEventListener('securitypolicyviolation', (e) => window.__csp.push(e.violatedDirective + ' ' + e.blockedURI));
  });

  await page.goto(FILE_URL);
  await ready(page);
  await expect(page.locator('.level-card')).toHaveCount(5);
  await shot('1-setup');
  await page.locator('.level-card').first().click();
  await ready(page);
  if (await page.locator('.grade-btn').count()) {
    await page.locator('.grade-btn').first().click();
    await ready(page);
  }
  await page.getByLabel(/별명/).fill('테스트');
  await page.getByRole('button', { name: '시작하기' }).click();
  await ready(page);
  await expect(page.locator('.teacher-card').first()).toBeVisible();
  await shot('2-home');

  // 단원이 모두 준비 중인 과정은 건너뛰고, 열 수 있는 첫 단원으로
  await page.locator('a.teacher-card:not(.is-soon)').first().click();
  await ready(page);
  await expect(page.locator('a.unit-row').first()).toBeVisible();
  await shot('3-course');
  await page.locator('a.unit-row').first().click();
  await expect(page).toHaveURL(/#\/unit\/[^/]+\/learn$/);
  await ready(page);
  await expect(page.locator('.concept-card:visible')).toHaveCount(1);
  await expect(page.locator('.concept-card:visible .cc-body')).not.toBeEmpty();
  await shot('4-learn');

  // 문제 탭 → 시작 → 한 문제 풀기(답을 몰라도 채점 화면이 뜨는지만)
  await page.locator('.unit-tabs a', { hasText: '문제' }).click();
  await ready(page);
  const start = page.getByRole('button', { name: '문제 풀기 시작' });
  if (await start.count()) {
    await start.click();
    await ready(page);
    const form = page.locator('.quiz form.problem');
    await expect(form).toBeVisible();
    const st = await page.evaluate(() => window.TutorApp.quizState());
    const item = st.items[0];
    if (item.type === 'choice') await form.locator('.choice[data-i="' + item.answer + '"]').click();
    else if (item.type === 'ox') await form.locator('.ox-btn[data-v="' + item.answer + '"]').click();
    else if (item.type === 'order') { for (const i of item.answer) await form.locator('.order-item[data-i="' + i + '"]').click(); }
    else await form.locator('.short-input').fill(Array.isArray(item.answer) ? (item.check === 'set' ? item.answer.join(', ') : item.answer[0]) : String(item.answer));
    await form.locator('.pw-submit').click();
    await expect(form.locator('.feedback')).toHaveClass(/is-ok/);
    await shot('5-quiz');
  }

  // 다시 열어도(새로고침) 학생과 진도가 남는다 — Edge 의 file:// 에서 IndexedDB(안 되면 localStorage)
  expect(['indexeddb', 'localstorage']).toContain(await page.evaluate(() => window.TutorApp.storageProvider));
  expect(await page.evaluate(() => window.TutorStorage.canEncrypt())).toBe(true); // 백업 암호화·PIN
  await page.evaluate(() => window.Tutor.store.flush());
  await page.reload();
  await ready(page);
  await expect(page.locator('#studentChip')).toBeVisible();

  expect(await page.evaluate(() => window.__csp)).toEqual([]);
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});
