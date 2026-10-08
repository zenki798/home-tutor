const { test, expect } = require('@playwright/test');
const { open, collectErrors, waitReady, readStore, goHash } = require('./helpers');

/*
 * 과정 → 단원 → 개념 카드(이론) · 더 쉬운 설명 · 예제 단계 보기 · 학습 목표·용어 · 진도 기록.
 */

test('과정 화면: 선생님 인사, 단원 목록(번호·제목·요약·학기·진도), 세 가지 버튼', async ({ page }) => {
  const errors = collectErrors(page);
  const calls = await open(page, { student: true, url: '/#/home' });
  await page.locator('.teacher-card', { hasText: '수학 선생님' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/course\/math-m2$/);
  await expect(page.locator('#topTitle')).toHaveText('중학교 수학 2');
  await expect(page.locator('.bubble-who')).toHaveText('수학 선생님');
  await expect(page.locator('.bubble-text')).toContainText('수학 선생님이에요. ‘중학교 수학 2’를 단원 순서대로 함께 공부해요.');
  await expect(page.locator('.bubble-note')).toContainText('2022 개정 교육과정');
  const rows = page.locator('.unit-row');
  await expect(rows).toHaveCount(2);
  await expect(rows.nth(0)).toContainText('1');
  await expect(rows.nth(0)).toContainText('일차부등식');
  await expect(rows.nth(0)).toContainText('부등식의 뜻과 성질을 알고');
  await expect(rows.nth(0)).toContainText('1학기');
  await expect(rows.nth(0)).toContainText('시작 전');
  await expect(page.getByRole('link', { name: /이어서 공부하기/ })).toContainText('일차부등식');
  await expect(page.getByRole('button', { name: /예상문제 풀기/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /선생님께 질문하기/ })).toHaveAttribute('href', '#/ask/math?course=math-m2');
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('개념 카드: 한 장씩 넘기고(수식·그림), 본 카드는 진도에 남는다', async ({ page }) => {
  const errors = collectErrors(page);
  const calls = await open(page, { student: true, url: '/#/course/math-m2' });
  await page.locator('.unit-row').first().click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/unit\/math-m2-01\/learn$/);
  await expect(page.locator('.unit-tabs [aria-current="page"]')).toHaveText('개념');
  await expect(page.locator('.bubble-text').first()).toContainText('오늘은 ‘일차부등식’을 배워요. 먼저 ‘부등식이란?’부터 알아볼까요?');

  const card = page.locator('.concept-card:visible');
  await expect(card).toHaveCount(1);
  await expect(page.locator('#cvCount')).toHaveText('카드 1 / 4');
  await expect(card.locator('.cc-title')).toHaveText('부등식이란?');
  await expect(card.locator('.cc-body .mt').first()).toBeVisible();        // 수식(TutorText)
  await expect(card.locator('.fig-wrap svg')).toBeVisible();                // 그림(TutorFig)
  await expect(card.locator('.fig-wrap svg')).toHaveAttribute('role', 'img');
  await expect(page.getByRole('button', { name: '‹ 이전' })).toBeDisabled();

  await page.getByRole('button', { name: '다음 ›' }).click();
  await expect(page.locator('#cvCount')).toHaveText('카드 2 / 4');
  await expect(page.locator('.concept-card:visible .cc-title')).toHaveText('부등식의 성질');
  await expect(page.locator('.concept-card:visible table')).toBeVisible();  // 표
  await expect(page.locator('.dot').nth(1)).toHaveAttribute('aria-current', 'step');

  await page.locator('.dot').nth(2).click();
  await expect(page.locator('.concept-card:visible .cc-title')).toHaveText('일차부등식 풀기');
  await expect(page.locator('.concept-card:visible .fig-wrap svg')).toBeVisible(); // 좌표평면
  await page.getByRole('button', { name: '‹ 이전' }).click();
  await expect(page.locator('#cvCount')).toHaveText('카드 2 / 4');

  const prog = await readStore(page, 'p.p-test-a.progress');
  expect(prog['math-m2-01'].seen).toEqual([0, 1, 2]);
  expect(prog['math-m2-01'].cards).toBe(4);
  expect(await readStore(page, 'p.p-test-a.recent')).toEqual(['math-m2-01']);
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('마지막 카드에서 "다 봤어요" → 예제로 안내, 과정 화면에 "개념 다 봄"', async ({ page }) => {
  await open(page, { student: true, url: '/#/unit/math-m2-01/learn' });
  for (let i = 0; i < 3; i++) await page.getByRole('button', { name: '다음 ›' }).click();
  await expect(page.locator('#cvCount')).toHaveText('카드 4 / 4');
  await page.getByRole('button', { name: '다 봤어요 ✔' }).click();
  await expect(page.locator('#cvDone')).toBeVisible();
  await expect(page.locator('#cvDone')).toContainText('개념 카드를 모두 봤어요');
  await page.locator('#cvDone').getByRole('link', { name: '예제 보기' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/unit\/math-m2-01\/examples$/);
  await goHash(page, '#/course/math-m2');
  await expect(page.locator('.unit-row').first()).toContainText('개념 다 봄');
  await expect(page.locator('.unit-row').first()).toContainText('개념 4/4');
  await expect(page.locator('.unit-row').first()).toHaveClass(/status-done/);
});

test('이해 확인: 카드를 읽고 바로 푼다 — 틀리면 이유·해설 + 다른 방법의 설명, 한 번 더 풀어 맞히면 "확인함"', async ({ page }) => {
  const errors = collectErrors(page);
  await open(page, { student: true, url: '/#/unit/math-m2-01/learn?card=1' });
  const card = page.locator('.concept-card:visible');
  const box = card.locator('.check-box');
  await expect(box.locator('.check-title')).toContainText('이해 확인');
  await expect(box.locator('.ok-badge')).toBeHidden();
  await expect(box.locator('.choice')).toHaveCount(3);
  // 일부러 틀린다: "방향이 그대로예요"
  await box.locator('.choice[data-i="0"]').click();
  await box.getByRole('button', { name: '확인하기' }).click();
  await expect(box.locator('.feedback')).toHaveClass(/is-bad/);
  await expect(box.locator('.fb-why')).toContainText('음수를 곱하거나 나누면 방향이 바뀌어요');
  await expect(box.locator('.fb-explain')).toContainText('방향이 바뀌어요');
  await expect(box.locator('.easy-box.again')).toContainText('다른 방법으로 다시 설명해 볼게요');
  await expect(box.locator('.easy-box.again')).toContainText('수직선에서');
  // ← → 로 카드를 넘기는 키가 보기 고르기를 방해하지 않는다
  await box.getByRole('button', { name: '한 번 더 풀기' }).click();
  await box.locator('.choice[data-i="0"] input').focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('#cvCount')).toHaveText('카드 2 / 4');
  await box.locator('.choice[data-i="1"]').click();
  await box.getByRole('button', { name: '확인하기' }).click();
  await expect(box.locator('.feedback')).toHaveClass(/is-ok/);
  await expect(box.locator('.check-ok')).toContainText('잘 이해했어요');
  await expect(box.locator('.ok-badge')).toBeVisible();
  const prog = await readStore(page, 'p.p-test-a.progress');
  expect(prog['math-m2-01'].checked).toEqual([1]);
  // short 이해 확인: 쓴 답에 맞춘 진단
  await page.locator('.dot').nth(2).click();
  const box2 = page.locator('.concept-card:visible .check-box');
  await box2.locator('.short-input').fill('8');
  await box2.locator('.short-input').press('Enter');
  await expect(box2.locator('.fb-why')).toContainText('2를 곱했어요');
  // 이해 확인이 없는 카드
  await page.locator('.dot').nth(3).click();
  await expect(page.locator('.concept-card:visible .check-box')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('수 답을 읽지 못하면 채점하지 않고 다시 써 달라고 한다 · 문장처럼 쓴 답은 읽는다 · 수가 없는 답은 그대로 채점', async ({ page }) => {
  await open(page, { student: true, url: '/#/unit/math-m2-01/learn?card=2' });
  const box = page.locator('.concept-card:visible .check-box');
  const input = box.locator('.short-input');
  // 수는 있는데 수로 읽을 수 없는 답 → 채점하지 않는다(진도·오답 기록 없음)
  await input.fill('2와 3 사이');
  await input.press('Enter');
  await expect(box.locator('.pw-msg')).toBeVisible();
  await expect(box.locator('.pw-msg')).toContainText('수로 읽지 못했어요');
  await expect(box.locator('.feedback')).toBeHidden();
  await expect(input).toBeFocused();
  await expect(input).toBeEnabled();
  expect((((await readStore(page, 'p.p-test-a.progress')) || {})['math-m2-01'] || {}).checked || []).toEqual([]);
  expect((await readStore(page, 'p.p-test-a.attempts')) || []).toEqual([]);
  // 수가 하나도 없는 답("모르겠어요")은 다시 쓰라고 하지 않고 그대로 채점한다(막히지 않게) — 안내는 사라진다
  await input.fill('모르겠어요');
  await input.press('Enter');
  await expect(box.locator('.feedback')).toHaveClass(/is-bad/);
  await expect(box.locator('.pw-msg')).toBeHidden();
  // 문장처럼 쓴 답은 수만 보고 채점
  await box.getByRole('button', { name: '한 번 더 풀기' }).click();
  await box.locator('.short-input').fill('답은 2입니다');
  await box.locator('.short-input').press('Enter');
  await expect(box.locator('.feedback')).toHaveClass(/is-ok/);
});

test('기초 다지기 학생은 쉬운 설명을 먼저 본다', async ({ page }) => {
  const easy = { id: 'p-easy', name: '', avatar: '🐰', level: 'mid', grade: 'm2', pace: 'easy', created: 1 };
  await open(page, { student: easy, url: '/#/unit/math-m2-01/learn' });
  const card = page.locator('.concept-card:visible');
  await expect(card).toHaveClass(/is-easy-first/);
  const first = card.locator('.easy-box.easy-first');
  await expect(first).toBeVisible();
  await expect(first).toContainText('쉽게 먼저 볼까요?');
  await expect(first).toContainText('시소를 떠올려 보세요');
  // 쉬운 설명이 본문보다 앞에 온다
  const order = await card.evaluate((el) => {
    const a = el.querySelector('.easy-first');
    const b = el.querySelector('.cc-body');
    return !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
  });
  expect(order).toBe(true);
  await expect(card.locator('[data-act="easy"]')).toHaveCount(0);
  await expect(card.locator('.cc-sub')).toHaveText('교과서처럼 말하면');
});

test('"더 쉽게 설명해 주세요" 를 누르면 다른 설명이 열리고 닫힌다', async ({ page }) => {
  await open(page, { student: true, url: '/#/unit/math-m2-01/learn' });
  const btn = page.locator('.concept-card:visible').getByRole('button', { name: /더 쉽게 설명해 주세요/ });
  await expect(btn).toHaveAttribute('aria-expanded', 'false');
  await btn.click();
  await expect(btn).toHaveAttribute('aria-expanded', 'true');
  const box = page.locator('.concept-card:visible .easy-box');
  await expect(box).toBeVisible();
  await expect(box).toContainText('시소를 떠올려 보세요');
  await btn.click();
  await expect(box).toBeHidden();
  // easy 가 없는 카드에는 버튼이 없다
  await page.locator('.dot').nth(2).click();
  await expect(page.locator('.concept-card:visible [data-act="easy"]')).toHaveCount(0);
});

test('모두 펼쳐 보기: 카드 4장을 한 번에 보고, 다시 한 장씩', async ({ page }) => {
  await open(page, { student: true, url: '/#/unit/math-m2-01/learn' });
  await page.getByRole('button', { name: '모두 펼쳐 보기' }).click();
  await expect(page.locator('.concept-card:visible')).toHaveCount(4);
  await expect(page.locator('#cvNav')).toBeHidden();
  await expect(page.getByRole('button', { name: '한 장씩 보기' })).toHaveAttribute('aria-pressed', 'true');
  const prog = await readStore(page, 'p.p-test-a.progress');
  expect(prog['math-m2-01'].seen).toEqual([0, 1, 2, 3]);
  await page.getByRole('button', { name: '한 장씩 보기' }).click();
  await expect(page.locator('.concept-card:visible')).toHaveCount(1);
});

test('학습 목표와 핵심 용어, 용어 주소(?term=)로 바로 가기', async ({ page }) => {
  await open(page, { student: true, url: '/#/unit/math-m2-01/learn?term=2' });
  await expect(page.locator('.goals li')).toHaveCount(3);
  await expect(page.locator('.goals')).toContainText('부등식의 뜻을 알고');
  await expect(page.locator('.term dt')).toHaveText(['부등식', '부등호', '일차부등식', '부등식의 해']);
  await expect(page.locator('#term-2')).toHaveClass(/flash/);
  await expect(page.locator('#term-2')).toBeFocused();
});

test('카드 주소(?card=)로 들어오면 그 카드부터 보여 준다', async ({ page }) => {
  await open(page, { student: true, url: '/#/unit/math-m2-01/learn?card=3' });
  await expect(page.locator('#cvCount')).toHaveText('카드 4 / 4');
  await expect(page.locator('.concept-card:visible .cc-title')).toHaveText('해를 수직선에 나타내기');
});

test('예제: "다음 단계" 로 풀이를 한 줄씩, 마지막에 답', async ({ page }) => {
  await open(page, { student: true, url: '/#/unit/math-m2-01/examples' });
  await expect(page.locator('.bubble-text')).toContainText('한 단계씩 같이 풀어 봐요');
  const ex = page.locator('.example').first();
  await expect(ex.locator('.ex-q')).toContainText('풀어 보세요');
  await expect(ex.locator('.steps > li:visible')).toHaveCount(0);
  await ex.getByRole('button', { name: '풀이 첫 단계 보기' }).click();
  await expect(ex.locator('.steps > li:visible')).toHaveCount(1);
  await expect(ex.locator('.steps > li:visible')).toContainText('양쪽에 1을 더해요');
  await ex.getByRole('button', { name: '다음 단계' }).click();
  await expect(ex.locator('.steps > li:visible')).toHaveCount(2);
  await expect(ex.locator('.ex-answer')).toBeHidden();
  await ex.getByRole('button', { name: '답 보기' }).click();
  await expect(ex.locator('.ex-answer')).toBeVisible();
  await expect(ex.locator('.ex-answer .mt').first()).toBeVisible();
  await ex.getByRole('button', { name: '처음부터 다시' }).click();
  await expect(ex.locator('.steps > li:visible')).toHaveCount(0);

  // 두 번째 예제는 한 번에 보기 (그림 포함)
  const ex2 = page.locator('.example').nth(1);
  await expect(ex2.locator('.fig-wrap svg')).toBeVisible();
  await ex2.getByRole('button', { name: '한 번에 보기' }).click();
  await expect(ex2.locator('.steps > li:visible')).toHaveCount(2);
  await expect(ex2.locator('.ex-answer')).toBeVisible();
});

test('영어 단원: 낱말(vocab) 목록과 예문', async ({ page }) => {
  await open(page, { student: true, url: '/#/unit/eng-m-01/learn' });
  await expect(page.locator('.page').first()).toHaveClass(/subj-eng/);
  await expect(page.locator('.vocab-list li')).toHaveCount(9);
  await expect(page.locator('.vocab-list li').first()).toContainText('already');
  await expect(page.locator('.vocab-list li').first()).toContainText('이미');
  await expect(page.locator('.vocab-list .v-ex').first()).toHaveAttribute('lang', 'en');
});

test('초등 과학 단원: 직접 그린 그림과 막대그래프, 쉬운 말투', async ({ page }) => {
  await open(page, { student: { id: 'p-e5', name: '', level: 'elem', grade: 'e5', created: 1 }, url: '/#/unit/sci-e5-01/learn' });
  await expect(page.locator('.bubble-text').first()).toContainText('오늘은 ‘물질의 용해’를 배워요.');
  await expect(page.locator('.concept-card:visible .fig-wrap svg')).toBeVisible();
  await page.locator('.dot').nth(2).click();
  await expect(page.locator('.concept-card:visible .fig-wrap svg')).toBeVisible();
});

test('단원을 불러오지 못하면 알리고, 다시 시도하면 열린다', async ({ page }) => {
  await open(page, { student: true, url: '/#/unit/math-m2-02/learn', failUnits: ['math-m2-02'], wait: false });
  await expect(page.locator('html')).toHaveAttribute('data-state', 'error');
  await expect(page.locator('.state-box.is-error')).toContainText('불러오지 못했어요');
  await page.getByRole('button', { name: '다시 시도' }).click();
  await waitReady(page);
  await expect(page.locator('.page-title')).toHaveText('연립일차방정식');
  await expect(page.locator('.concept-card:visible .mt').first()).toBeVisible(); // cases 환경
});
