const { test, expect } = require('@playwright/test');
const { open, quizState, solveAll, waitReady, readStore, STUDENT } = require('./helpers');

/*
 * 다시 볼 개념 (docs/ARCHITECTURE.md §18 — 2순위 오답 분석·복습 추천): 예상문제 결과에서 틀린 문제가 묶인
 * 개념 카드를 많이 틀린 차례로(같으면 먼저 틀린 차례로) 보여 주고, 누르면 그 카드로 바로 간다. 다 맞히면 없다.
 */

// 결과 화면의 '다시 볼 개념' 목록: [{ href, n }]
const againItems = (page) => page.locator('.again-list li').evaluateAll((lis) => lis.map((li) => ({
  href: li.querySelector('a').getAttribute('href'),
  title: li.querySelector('a').textContent.trim(),
  n: Number((li.textContent.match(/틀린 문제 (\d+)개/) || [])[1]),
})));

test('틀린 문제가 묶인 개념 카드를 많이 틀린 차례로 보여 주고, 누르면 그 카드로 간다', async ({ page }) => {
  await open(page, { student: true, url: '/#/quiz/math-m2-01?n=6&lv=1&seed=4' });
  const wrongAt = [0, 2, 3];
  await solveAll(page, wrongAt);
  // 기대: 틀린 문제의 개념 번호를 센다(개념이 없는 문제는 빼고)
  const st = await quizState(page);
  const count = {};
  const first = {};
  wrongAt.forEach((i, k) => {
    const c = st.items[i] && st.items[i].concept;
    if (typeof c !== 'number') return;
    count[c] = (count[c] || 0) + 1;
    if (first[c] === undefined) first[c] = k;
  });
  const expected = Object.keys(count).map(Number)
    .sort((a, b) => count[b] - count[a] || first[a] - first[b])
    .map((c) => ({ href: '#/unit/math-m2-01/learn?card=' + c, n: count[c] }));
  expect(expected.length, '시험 문제에 개념 번호가 있어야 뜻이 있다').toBeGreaterThan(0);
  await expect(page.locator('#againTitle')).toHaveText('다시 볼 개념');
  const got = await againItems(page);
  expect(got.map((x) => ({ href: x.href, n: x.n }))).toEqual(expected);
  expect(got.every((x) => x.title.length > 0)).toBe(true);
  // 풀이 기록에도 문제가 묶인 개념 카드 번호(c)가 남는다 — 보호자용 요약의 '자주 틀린 개념'이 쓴다
  const atts = (await readStore(page, 'p.' + STUDENT.id + '.attempts')) || [];
  expect(atts.map((a) => (typeof a.c === 'number' ? a.c : null))).toEqual(st.items.map((it) => it.concept));
  // 누르면 그 개념 카드로 (이어 보기보다 고른 카드가 먼저)
  await page.locator('.again-list a').first().click();
  await waitReady(page);
  const card = Number(expected[0].href.split('card=')[1]);
  const shown = await page.evaluate(() => Array.from(document.querySelectorAll('.concept-card')).filter((c) => !c.hidden).map((c) => Number(c.getAttribute('data-i'))));
  expect(shown).toEqual([card]);
});

test('다 맞히면 다시 볼 개념이 없다', async ({ page }) => {
  await open(page, { student: true, url: '/#/quiz/math-m2-01?n=4&lv=1&seed=4' });
  await solveAll(page, []);
  await expect(page.locator('.result')).toBeVisible();
  await expect(page.locator('.again-box')).toHaveCount(0);
});
