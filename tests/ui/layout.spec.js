const { test, expect } = require('@playwright/test');
const { open, waitReady, goHash, horizontalOverflow, answerCurrent, STUDENT } = require('./helpers');

/*
 * 화면 배치·접근성: 휴대폰 폭(360px 포함)에서 가로 스크롤이 생기지 않고, 탭 막대가 제자리에 있고,
 * 모든 버튼·링크에 이름이 있고, 키보드 초점이 보인다.
 */

const NOTE = {
  key: 'math-m2-01#p6', unit: 'math-m2-01', given: 'O', at: 1, wrongCount: 1, rightStreak: 0, gen: null, src: 'bank',
  problem: { id: 'p6', level: 1, type: 'ox', q: '부등식 $-3x>6$ 의 양쪽을 $-3$ 으로 나누면 $x>-2$ 가 된다.', answer: false, explain: '방향이 바뀌어요.' },
};

const ROUTES = [
  '#/setup', '#/setup/mid', '#/setup/mid/m2', '#/', '#/home', '#/home?all=1', '#/course/math-m2',
  '#/unit/math-m2-01/learn', '#/unit/math-m2-01/examples', '#/unit/math-m2-01/practice', '#/unit/math-m2-01/advanced',
  '#/unit/math-m2-01/ask', '#/unit/eng-m-01/learn', '#/unit/sci-e5-01/learn', '#/unit/math-m2-02/learn',
  '#/quiz/math-m2-01?n=20&lv=mix&seed=1', '#/ask', '#/ask/math', '#/notes', '#/stats', '#/settings',
];

async function checkAllRoutes(page) {
  const bad = [];
  for (const r of ROUTES) {
    await goHash(page, r);
    const over = await horizontalOverflow(page);
    if (over > 0) bad.push(r + ' (+' + over + 'px)');
  }
  // 펼친 상태들: 개념 모두 펼치기 + 쉬운 설명, 예제 전체, 채점 뒤 해설, 과정 문제 섞기, 대화
  await goHash(page, '#/unit/math-m2-01/learn');
  await page.getByRole('button', { name: '모두 펼쳐 보기' }).click();
  for (const b of await page.locator('[data-act="easy"]').all()) await b.click();
  if (await horizontalOverflow(page) > 0) bad.push('learn: 모두 펼침');
  await goHash(page, '#/unit/math-m2-01/examples');
  for (const b of await page.locator('.example [data-act="all"]').all()) await b.click();
  if (await horizontalOverflow(page) > 0) bad.push('examples: 모두 보기');
  await goHash(page, '#/quiz/math-m2-01?n=20&lv=mix&seed=2');
  for (let i = 0; i < 4; i++) {
    await answerCurrent(page, i % 2 ? 'right' : 'wrong', { withUnit: true });
    if (await horizontalOverflow(page) > 0) bad.push('quiz: 채점 뒤 ' + i);
    await page.locator('.quiz-next').click();
  }
  await goHash(page, '#/course/math-m2');
  await page.getByRole('button', { name: /예상문제 풀기/ }).click();
  if (await horizontalOverflow(page) > 0) bad.push('course: 문제 섞기 열림');
  await goHash(page, '#/ask/math');
  await page.locator('#askInput').fill('부등식의 성질이 뭐예요?');
  await page.locator('#askInput').press('Enter');
  await expect(page.locator('.chat > li.msg.t')).toHaveCount(2);
  await page.locator('#askInput').fill('3/4 ÷ 2/5');
  await page.locator('#askInput').press('Enter');
  await expect(page.locator('.chat > li.msg.t')).toHaveCount(3);
  if (await horizontalOverflow(page) > 0) bad.push('ask: 대화');
  return bad;
}

test('모든 주요 화면에서 가로 스크롤이 생기지 않는다 (이 화면 폭)', async ({ page }) => {
  await open(page, { student: true, storage: { 'tutor.p.p-test-a.notes': [NOTE] }, url: '/#/home' });
  expect(await checkAllRoutes(page)).toEqual([]);
});

test.describe('가장 좁은 휴대폰 (360px)', () => {
  test.use({ viewport: { width: 360, height: 740 } });
  test('모든 주요 화면에서 가로 스크롤이 생기지 않는다', async ({ page }) => {
    await open(page, { student: true, storage: { 'tutor.p.p-test-a.notes': [NOTE] }, url: '/#/home' });
    expect(await checkAllRoutes(page)).toEqual([]);
  });
  test('글자를 "아주 크게" 해도 가로 스크롤이 생기지 않는다', async ({ page }) => {
    await open(page, { student: true, storage: { 'tutor.settings': { fontScale: 3, theme: 'auto' }, 'tutor.p.p-test-a.notes': [NOTE] }, url: '/#/home' });
    await expect(page.locator('html')).toHaveAttribute('data-font', '3');
    expect(await checkAllRoutes(page)).toEqual([]);
  });
});

test('탭 막대: 좁은 화면에서는 아래쪽에 붙고, 넓은 화면에서는 위쪽 막대 안에', async ({ page }) => {
  await open(page, { student: true, url: '/#/home' });
  const vp = page.viewportSize();
  const bar = await page.locator('#tabbar').boundingBox();
  const links = page.locator('#tabbar a');
  await expect(links).toHaveText(['홈', '질문', '오답노트', '기록']);
  await expect(links.first()).toHaveAttribute('aria-current', 'page');
  if (vp.width < 760) {
    expect(Math.round(bar.y + bar.height)).toBe(vp.height);
    const h = (await links.first().boundingBox()).height;
    expect(h).toBeGreaterThanOrEqual(48);
    // 마지막 내용이 탭 막대에 가려지지 않게 아래 여백이 있다
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const lastBtn = await page.locator('.link-row .btn').last().boundingBox();
    expect(lastBtn.y + lastBtn.height).toBeLessThanOrEqual(bar.y + 1);
  } else {
    const top = await page.locator('#topbar').boundingBox();
    expect(bar.y).toBeGreaterThanOrEqual(top.y);
    expect(bar.y + bar.height).toBeLessThanOrEqual(top.y + top.height);
  }
  // 학생 설정 전에는 탭 막대를 숨긴다 (이 기기의 기록을 모두 지운 뒤)
  await page.evaluate(() => window.TutorStorage.wipeAll(window.Tutor.store));
  await page.goto('/#/setup');
  await waitReady(page);
  await expect(page.locator('#tabbar')).toBeHidden();
});

test('모든 버튼·링크에 읽을 수 있는 이름이 있다', async ({ page }) => {
  await open(page, { student: true, storage: { 'tutor.p.p-test-a.notes': [NOTE] }, url: '/#/home' });
  const nameless = [];
  for (const r of ['#/home', '#/course/math-m2', '#/unit/math-m2-01/learn', '#/quiz/math-m2-01?n=5&lv=1&seed=1', '#/ask/math', '#/notes', '#/settings']) {
    await goHash(page, r);
    const found = await page.evaluate(() => Array.from(document.querySelectorAll('button, a[href], input, [role="button"]'))
      .filter((el) => el.offsetParent !== null || getComputedStyle(el).position === 'fixed')
      .filter((el) => {
        if (el.matches('input[type="radio"], input[type="checkbox"]')) return !(el.closest('label') && el.closest('label').textContent.trim());
        if (el.matches('input')) return !(el.labels && el.labels.length) && !el.getAttribute('aria-label');
        const name = (el.getAttribute('aria-label') || el.textContent || '').trim();
        return !name;
      })
      .map((el) => el.outerHTML.slice(0, 80)));
    for (const f of found) nameless.push(r + ': ' + f);
  }
  expect(nameless).toEqual([]);
});

test('키보드 초점이 눈에 보인다 (본문으로 건너뛰기 → 버튼)', async ({ page }) => {
  await open(page, { student: true, url: '/#/course/math-m2' });
  await page.keyboard.press('Tab');
  const skip = page.locator('#skipLink');
  await expect(skip).toBeFocused();
  const box = await skip.boundingBox();
  expect(box.y).toBeGreaterThanOrEqual(0); // 초점을 받으면 화면 안으로 나온다
  await page.keyboard.press('Enter');
  await expect(page.locator('.page-title')).toBeFocused();
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    const ok = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || !el.matches('a, button')) return null;
      const st = getComputedStyle(el);
      return st.outlineStyle !== 'none' && parseFloat(st.outlineWidth) >= 2;
    });
    if (ok !== null) { expect(ok).toBe(true); return; }
  }
  throw new Error('Tab 으로 버튼·링크에 가지 못했다');
});

test('움직임 줄이기 설정을 존중하고, 끝없이 도는 애니메이션이 없다', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await open(page, { student: true, url: '/#/unit/math-m2-01/learn' });
  const anim = await page.evaluate(() => getComputedStyle(document.querySelector('.concept-card:not([hidden])')).animationName);
  expect(anim).toBe('none');
  const infinite = await page.evaluate(() => {
    const out = [];
    for (const sheet of Array.from(document.styleSheets)) {
      let rules;
      try { rules = sheet.cssRules; } catch (e) { continue; }
      for (const r of Array.from(rules || [])) if (/infinite/.test(r.cssText)) out.push(r.cssText.slice(0, 80));
    }
    return out;
  });
  expect(infinite).toEqual([]);
});

test('표: 좁은 화면에서도 칸 안의 낱말을 한 글자씩 끊지 않는다 (넓으면 표만 가로로 민다)', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await open(page, { student: true, url: '/#/unit/math-m2-01/learn' });
  const res = await page.evaluate(() => {
    const host = document.createElement('div');
    host.className = 'rich cc-body';
    host.innerHTML = TutorText.render(
      '| 법칙 | 합집합 | 교집합 |\n|---|---|---|\n' +
      '| 교환법칙 | $A \cup B = B \cup A$ | $A \cap B = B \cap A$ |\n' +
      '| 결합법칙 | $(A \cup B) \cup C = A \cup (B \cup C)$ | $(A \cap B) \cap C = A \cap (B \cap C)$ |\n' +
      '| 분배법칙 | $A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$ | $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$ |');
    document.querySelector('.concept-card:not([hidden])').appendChild(host);
    const lines = (el) => { const r = document.createRange(); r.selectNodeContents(el); return Array.from(r.getClientRects()).filter((x) => x.width > 0).length; };
    const wrap = host.querySelector('.rt-tablewrap');
    return {
      firstCol: Array.from(host.querySelectorAll('tbody tr > :first-child')).map(lines),
      head: lines(host.querySelector('thead th')),
      wrapScrolls: wrap.scrollWidth > wrap.clientWidth,
      pageOver: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  expect(res.firstCol).toEqual([1, 1, 1]); // '교환법칙' 이 '교/환/법/칙' 으로 쪼개지지 않는다
  expect(res.head).toBe(1);
  expect(res.pageOver).toBeLessThanOrEqual(0); // 화면 전체는 가로로 밀리지 않는다(표 상자만 민다)
});
