const { test, expect } = require('@playwright/test');
const { open, collectErrors, waitReady, horizontalOverflow, STUDENT } = require('./helpers');
const TS = require('../../js/storage.js');

/*
 * 보호자용 학습 요약(js/summary.js, #/summary): 지금 학생 한 명의 기록만, 이 기기 안에서만 계산해 보여 준다.
 * 최근 7일·30일 · 날짜별 · 과목별 · 잘한/더 연습할 단원 · 자주 틀린 까닭 · 오답노트·복습·틀린 곳 알림 · 인쇄 · 글로 복사(별명 없이).
 * 시험의 오늘은 2026-10-08(그 기기 시간대의 정오)로 고정한다. 학생은 가상의 이름.
 */
const TODAY = new Date(2026, 9, 8, 12, 0, 0);
function at(m, d) { return new Date(2026, m - 1, d, 12).getTime(); }
function att(m, d, unit, ok, extra) { return Object.assign({ t: at(m, d), unit, level: 1, ok }, extra); }
const ATTEMPTS = [
  att(9, 20, 'math-m2-01', false, { cause: '부호를 바꾸지 않았어요' }),
  att(10, 2, 'math-m2-01', true),
  att(10, 3, 'math-m2-01', true),
  att(10, 3, 'math-m2-01', true),
  att(10, 5, 'math-m2-01', true),
  att(10, 6, 'math-m2-02', false, { cause: '두 식을 더하지 않고 뺐어요' }),
  att(10, 6, 'math-m2-02', false, { cause: '두 식을 더하지 않고 뺐어요' }),
  att(10, 7, 'math-m2-02', false, { cause: '부호를 바꾸지 않았어요' }),
  att(10, 7, 'math-m2-02', true),
  att(10, 8, 'sci-e5-01', true),
  att(10, 8, 'sci-e5-01', false, { level: 0, pid: 'check-0' }),
  att(10, 8, 'sci-e5-01', true, { level: 0, pid: 'check-1' }),
];
function records(id) {
  const ox = (k) => ({ id: k, level: 1, type: 'ox', q: '문제 ' + k, answer: true, explain: '해설' });
  return {
    ['tutor.p.' + id + '.attempts']: ATTEMPTS,
    ['tutor.p.' + id + '.days']: ['2026-09-20', '2026-10-03', '2026-10-06', '2026-10-08'],
    ['tutor.p.' + id + '.progress']: {
      'math-m2-01': { seen: [0, 1, 2], cards: 4, solved: 5, correct: 4, last: at(10, 5) },
      'sci-e5-01': { seen: [0], cards: 3, solved: 1, correct: 1, last: at(10, 8) },
    },
    ['tutor.p.' + id + '.notes']: [
      { key: 'math-m2-02#q1', unit: 'math-m2-02', problem: ox('q1'), at: at(10, 6), due: '2026-10-08', wrongCount: 1, rightStreak: 0 },
      { key: 'math-m2-02#q2', unit: 'math-m2-02', problem: ox('q2'), at: at(10, 7), due: '2026-10-09', wrongCount: 1, rightStreak: 0 },
    ],
    ['tutor.p.' + id + '.reports']: [{ t: at(10, 7), unit: 'math-m2-01', kind: 'problem', ref: 'p6', reason: 'answer', memo: '', q: '문제' }],
  };
}

async function stubClipboard(page) {
  await page.addInitScript(() => {
    window.__copied = [];
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: (t) => { window.__copied.push(String(t)); return Promise.resolve(); } },
    });
  });
}

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(TODAY);
});

test('기록 화면 → 보호자용 학습 요약: 최근 7일 숫자·날짜별·과목별·단원·자주 틀린 까닭·복습', async ({ page }) => {
  const errors = collectErrors(page);
  const calls = await open(page, { student: true, storage: records(STUDENT.id), url: '/#/stats' });
  await page.getByRole('link', { name: /보호자용 학습 요약/ }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/summary$/);
  await expect(page.locator('#topTitle')).toHaveText('학습 요약');
  expect(await page.title()).toBe('학습 요약 · 가정교사'); // 문서 제목(인쇄 머리글)에 별명을 넣지 않는다
  await expect(page.locator('.sum-range')).toContainText('10월 2일 ~ 10월 8일');

  const tiles = page.locator('.sum-body .tile');
  await expect(tiles.nth(0)).toContainText('공부한 날');
  await expect(tiles.nth(0)).toContainText('3일');
  await expect(tiles.nth(1)).toContainText('9개');
  await expect(tiles.nth(2)).toContainText('67%');
  await expect(tiles.nth(3)).toContainText('2개');

  await expect(page.locator('.sum-days li')).toHaveCount(7);
  await expect(page.locator('.sum-days li').first()).toHaveAttribute('aria-label', /10월 2일.*1문제/);
  await expect(page.locator('.sum-subjects li').first()).toContainText('수학');
  await expect(page.locator('.sum-subjects li').first()).toContainText('8문제 · 정답률 63%');
  await expect(page.locator('.sum-strong')).toContainText('일차부등식');
  await expect(page.locator('.sum-weak')).toContainText('연립일차방정식');
  await expect(page.locator('.sum-causes li').first()).toContainText('두 식을 더하지 않고 뺐어요');
  await expect(page.locator('.sum-causes li').first()).toContainText('2번');
  await expect(page.locator('.sum-review')).toContainText('오답노트 2문제');
  await expect(page.locator('.sum-review')).toContainText('오늘 복습할 문제 1개');
  await expect(page.locator('.sum-review')).toContainText('틀린 곳 알림 1건');
  await expect(page.locator('.sum-studied li')).toHaveText([/물질의 용해.*개념 1\/3장/, /일차부등식.*개념 3\/4장/]);
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('최근 30일로 바꾸면 더 앞의 기록까지 센다 (키보드로 바꿔도 초점이 그 칸에 남고, 가로로 넘치지 않는다)', async ({ page }) => {
  await open(page, { student: true, storage: records(STUDENT.id), url: '/#/summary' });
  await page.getByRole('radio', { name: '최근 30일' }).check();
  await expect(page.locator('.sum-range')).toContainText('9월 9일 ~ 10월 8일');
  await expect(page.locator('.sum-body .tile').nth(1)).toContainText('10개');
  await expect(page.locator('.sum-days li')).toHaveCount(30);
  expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
  await page.locator('input[name="sumPeriod"][value="30"]').focus();
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('input[name="sumPeriod"][value="7"]')).toBeChecked();
  await expect(page.locator('input[name="sumPeriod"][value="7"]')).toBeFocused();
  await expect(page.locator('.sum-days li')).toHaveCount(7);
});

test('글로 복사하기: 학년과 숫자만 — 별명은 넣지 않는다', async ({ page }) => {
  await stubClipboard(page);
  await open(page, { student: true, storage: records(STUDENT.id), url: '/#/summary' });
  await page.getByRole('button', { name: '글로 복사하기' }).click();
  await expect(page.locator('.sum-done')).toContainText('복사했어요');
  const copied = await page.evaluate(() => window.__copied);
  expect(copied).toHaveLength(1);
  expect(copied[0].split('\n')[0]).toBe('가정교사 학습 요약 (중학교 2학년)');
  expect(copied[0]).toContain('푼 문제 9개 · 정답률 67%');
  expect(copied[0]).not.toContain(STUDENT.name);
  await expect(page.locator('textarea.sum-text')).toHaveValue(copied[0]);
});

test('인쇄하면 위쪽 막대·아래 탭·버튼은 숨기고 요약만 나온다', async ({ page }) => {
  await open(page, { student: true, storage: records(STUDENT.id), url: '/#/summary' });
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('#topbar')).toBeHidden();
  await expect(page.locator('.sum-actions')).toBeHidden();
  await expect(page.locator('.sum-period')).toBeHidden();
  await expect(page.locator('.sum-body')).toBeVisible();
  await expect(page.locator('.sum-print-head')).toBeVisible(); // 인쇄할 때만 보이는 머리글(학년·기간)
  await page.emulateMedia({ media: 'screen' });
  await expect(page.locator('.sum-print-head')).toBeHidden();
});

test('기록이 없으면 이 기간에 푼 문제가 없다고 안내한다', async ({ page }) => {
  await open(page, { student: true, url: '/#/summary' });
  await expect(page.locator('.sum-body .state-box')).toContainText('이 기간에 푼 문제가 없어요');
  await expect(page.locator('.sum-days')).toHaveCount(0);
});

test('PIN 이 걸린 학생은 PIN 을 맞혀야 요약을 볼 수 있다', async ({ page }) => {
  const lock = await TS.hashPin('2468', 1000);
  const locked = Object.assign({}, STUDENT, { lock });
  await open(page, { student: locked, storage: records(STUDENT.id), url: '/#/summary' });
  await expect(page.locator('.pin-input')).toBeVisible();
  await expect(page.locator('.sum-body')).toHaveCount(0);
  await page.locator('.pin-input').fill('2468');
  await page.getByRole('button', { name: '열기' }).click();
  await waitReady(page);
  await expect(page.locator('.sum-body .tile').nth(1)).toContainText('9개');
});

test('자주 틀린 개념: 2번 이상 틀린 개념 카드를 제목과 함께(단원 파일을 먼저 싣는다), 글로 복사에도 넣고, 누르면 그 카드로 간다', async ({ page }) => {
  await stubClipboard(page);
  const id = STUDENT.id;
  const recs = records(id);
  recs['tutor.p.' + id + '.attempts'] = ATTEMPTS.concat([
    att(10, 7, 'math-m2-01', false, { c: 1 }),
    att(10, 8, 'math-m2-01', false, { c: 1, level: 0, pid: 'check-1' }), // 이해 확인도 센다
    att(10, 8, 'math-m2-01', false, { c: 2 }),                          // 한 번만 틀림 — 넣지 않는다
  ]);
  await open(page, { student: true, storage: recs, url: '/#/summary' });
  const sec = page.locator('section[aria-labelledby="sumConT"]');
  await expect(sec.getByRole('heading', { name: '자주 틀린 개념' })).toBeVisible();
  const links = sec.locator('a');
  await expect(links).toHaveCount(1);
  await expect(links.first()).toHaveText('부등식의 성질'); // 요약을 바로 열어도 단원 파일을 싣고 제목을 보인다
  await expect(links.first()).toHaveAttribute('href', '#/unit/math-m2-01/learn?card=1');
  await expect(sec).toContainText('일차부등식 · 틀린 문제 2개');
  await page.getByRole('button', { name: '글로 복사하기' }).click();
  await expect.poll(() => page.evaluate(() => window.__copied[0] || '')).toContain('자주 틀린 개념\n- 부등식의 성질 · 일차부등식 (틀린 문제 2개)');
  await links.first().click();
  await waitReady(page);
  const shown = await page.evaluate(() => Array.from(document.querySelectorAll('.concept-card')).filter((c) => !c.hidden).map((c) => Number(c.getAttribute('data-i'))));
  expect(shown).toEqual([1]);
});

test('기록 화면: 개념 카드 번호가 든 기록이 없으면 "다시 볼 개념" 칸이 없다', async ({ page }) => {
  await open(page, { student: true, storage: records(STUDENT.id), url: '/#/stats' });
  await expect(page.locator('.page-title')).toHaveText('학습 기록');
  await expect(page.locator('.stats-again')).toHaveCount(0);
});

test('기록 화면에도 "다시 볼 개념" — 최근 30일 동안 두 번 이상 틀린 개념 카드를 많이 틀린 차례로, 그 카드로 가는 링크', async ({ page }) => {
  const id = STUDENT.id;
  const recs = records(id);
  recs['tutor.p.' + id + '.attempts'] = ATTEMPTS.concat([
    att(9, 20, 'math-m2-01', false, { c: 3 }), att(9, 21, 'math-m2-01', false, { c: 3 }), // 30일 안
    att(10, 7, 'math-m2-01', false, { c: 1 }), att(10, 8, 'math-m2-01', false, { c: 1 }), att(10, 8, 'math-m2-01', false, { c: 1 }),
  ]);
  await open(page, { student: true, storage: recs, url: '/#/stats' });
  const sec = page.locator('.stats-again');
  await expect(sec.getByRole('heading', { name: '다시 볼 개념' })).toBeVisible();
  await expect(sec.locator('a')).toHaveText(['부등식의 성질', '해를 수직선에 나타내기']);
  await expect(sec.locator('a').first()).toHaveAttribute('href', '#/unit/math-m2-01/learn?card=1');
  await expect(sec).toContainText('일차부등식 · 틀린 문제 3개');
});
