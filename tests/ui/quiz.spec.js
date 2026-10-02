const { test, expect } = require('@playwright/test');
const { open, collectErrors, waitReady, readStore, quizState, answerCurrent, fillAnswer, solveAll, STUDENT } = require('./helpers');

/*
 * 예상문제: 문제은행 + 생성기를 섞어 한 문제씩, 바로 채점·해설, 끝나면 점수와 틀린 문제.
 * 가정교사 흐름(ARCHITECTURE §7.4): 맞춤 난이도(섞어서) · 오답 분석(why/wrong) · 추가 설명(concept, 비슷한 문제).
 * 문제 순서는 seed 로 고정할 수 있다(?seed=). 보기는 섞이므로 화면의 data-i(원래 번호)로 고른다.
 */

/* 문제 유형별로 일부러 다른 꼴의 답을 넣어 본다 */
const SPECIAL = {
  'math-m2-01#p3': '12cm',      // number + 단위를 붙여 써도 정답
  'math-m2-01#p4': '3, 1, 2',   // set: 순서가 달라도 정답
  'math-m2-01#p5': ' 같다. ',   // text: 앞뒤 공백·마침표 무시
  'math-m2-01#p8': '3x - 2',    // expr: 띄어 써도 같은 식
};

/* 지금 문제를 (특별한 답 또는) 정답으로 풀고, 채점 결과를 확인한 뒤 다음으로 */
async function solveCurrentRight(page, seen) {
  const st = await quizState(page);
  const item = st.items[st.index];
  const form = page.locator('.quiz form.problem');
  seen.add(item.type + (item.check ? ':' + item.check : ''));
  if (SPECIAL[item.key]) await form.locator('.short-input').fill(SPECIAL[item.key]);
  else await fillAnswer(page, form, item, 'right', { withUnit: true });
  await form.locator('.pw-submit').click();
  const fb = form.locator('.feedback');
  await expect(fb, item.key).toHaveClass(/is-ok/);
  await expect(fb).toContainText('정답이에요');
  await expect(fb.locator('.fb-icon')).toHaveText('✔');
  await expect(fb.locator('.fb-more')).toHaveCount(0); // 맞히면 추가 설명은 없다
  await expect(form.locator('.pw-submit')).toBeHidden();
  await expect(page.locator('.quiz-next')).toBeFocused();
  await page.locator('.quiz-next').click();
  return item;
}

test('문제은행의 모든 유형: choice 정답·오답, short(number·set·text·expr), ox, order → 점수·오답노트', async ({ page }) => {
  const errors = collectErrors(page);
  const calls = await open(page, { student: true, url: '/#/quiz/math-m2-01?n=12&lv=1&seed=4242' });
  let st = await quizState(page);
  expect(st.adaptive).toBe(false);
  expect(st.total).toBe(12);
  const keys = st.items.map((it) => it.key);
  for (let i = 1; i <= 6; i++) expect(keys).toContain('math-m2-01#p' + i); // 기본 문제은행 6개가 모두 나온다
  expect(st.items.filter((it) => it.src === 'gen').length).toBe(6);
  await expect(page.locator('.quiz-count')).toContainText('/ 12');

  const seen = new Set();
  let wrongKey = null;
  for (let i = 0; i < 12; i++) {
    st = await quizState(page);
    const item = st.items[st.index];
    if (item.key === 'math-m2-01#p1') {
      // 일부러 틀린다: 고른 보기에 맞춘 "왜 틀렸을까"
      wrongKey = item.key;
      const form = page.locator('.quiz form.problem');
      await form.locator('.choice[data-i="0"]').click();
      await form.locator('.pw-submit').click();
      const fb = form.locator('.feedback');
      await expect(fb).toHaveClass(/is-bad/);
      await expect(fb).toContainText('오답');
      await expect(fb.locator('.fb-icon')).toHaveText('✘');
      await expect(fb.locator('.fb-answer')).toContainText('정답');
      await expect(fb.locator('.fb-why')).toContainText('왜 틀렸을까?');
      await expect(fb.locator('.fb-why')).toContainText('등호(=)가 있는 식은 등식이에요.');
      await expect(fb.locator('.fb-explain')).toContainText('해설');
      await expect(form.locator('.choice[data-i="2"]')).toHaveClass(/is-correct/);
      await expect(form.locator('.choice[data-i="2"] .c-mark')).toHaveText('✔ 정답');
      await expect(form.locator('.choice[data-i="0"] .c-mark')).toHaveText('✘ 내 답');
      await page.locator('.quiz-next').click();
      seen.add('choice');
    } else {
      await solveCurrentRight(page, seen);
    }
  }
  await expect(page.locator('.result')).toBeVisible();
  await expect(page.locator('.score-sub')).toContainText('12문제 중 11문제를 맞혔어요 · 92점');
  await expect(page.locator('.wrong-list > li')).toHaveCount(1);

  // 실력: 순서 맞추기·식 쓰기
  await page.goto('/#/quiz/math-m2-01?n=8&lv=2&seed=77');
  await waitReady(page);
  st = await quizState(page);
  for (let i = 7; i <= 10; i++) expect(st.items.map((it) => it.key)).toContain('math-m2-01#p' + i);
  for (let i = 0; i < 8; i++) await solveCurrentRight(page, seen);
  await expect(page.locator('.score-sub')).toContainText('8문제 중 8문제');

  expect([...seen].sort()).toEqual(expect.arrayContaining(['choice', 'order', 'ox', 'short:expr', 'short:number', 'short:set', 'short:text']));
  const notes = await readStore(page, 'p.p-test-a.notes');
  expect(notes).toHaveLength(1);
  expect(notes[0]).toMatchObject({ key: wrongKey, unit: 'math-m2-01', wrongCount: 1, rightStreak: 0 });
  expect(notes[0].problem.why).toHaveLength(4);
  const prog = await readStore(page, 'p.p-test-a.progress');
  expect(prog['math-m2-01']).toMatchObject({ solved: 20, correct: 19, best: 100 });
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('오답 분석: 쓴 답에 맞춘 진단(wrong) · 추가 설명: 개념 다시 보기 + 같은 개념의 비슷한 문제', async ({ page }) => {
  await open(page, { student: true, url: '/#/quiz/math-m2-01?n=12&lv=1&seed=4242' });
  const seen = new Set();
  for (let i = 0; i < 12; i++) {
    const st = await quizState(page);
    if (st.items[st.index].key === 'math-m2-01#p3') break;
    await solveCurrentRight(page, seen);
  }
  let st = await quizState(page);
  expect(st.items[st.index].key).toBe('math-m2-01#p3');
  const total = st.total;
  const form = page.locator('.quiz form.problem');
  await form.locator('.short-input').fill('48');
  await form.locator('.pw-submit').click();
  const fb = form.locator('.feedback');
  await expect(fb).toHaveClass(/is-bad/);
  await expect(fb.locator('.fb-why')).toContainText('둘레를 그대로 썼어요');
  // 추가 설명: 관련 개념 카드(concept 2)
  await expect(fb.locator('.fb-more-q')).toContainText('‘일차부등식 풀기’ 개념을 다시 볼까요?');
  const again = fb.getByRole('button', { name: '개념 다시 보기' });
  await expect(again).toHaveAttribute('aria-expanded', 'false');
  await again.click();
  await expect(again).toHaveAttribute('aria-expanded', 'true');
  await expect(fb.locator('.concept-again')).toBeVisible();
  await expect(fb.locator('.concept-again .ca-title')).toHaveText('일차부등식 풀기');
  await expect(fb.locator('.concept-again .mt').first()).toBeVisible();
  await expect(fb.locator('.concept-again a')).toHaveAttribute('href', '#/unit/math-m2-01/learn?card=2');
  // 비슷한 문제: 같은 개념의 다른 문제를 바로 다음에 낸다
  await fb.getByRole('button', { name: '비슷한 문제 풀기' }).click();
  st = await quizState(page);
  const extra = st.items[st.index];
  expect(extra.extra).toBe(true);
  expect(extra.concept).toBe(2);
  expect(extra.key).not.toBe('math-m2-01#p3');
  expect(st.total).toBe(total + 1);
  await expect(page.locator('.extra-badge')).toHaveText('비슷한 문제');
  await expect(page.locator('.quiz-count')).toContainText('/ ' + (total + 1));
});

test('생성기 문제를 틀리면 "비슷한 문제" 는 같은 생성기의 새 문제', async ({ page }) => {
  await open(page, { student: true, url: '/#/quiz/math-m2-01?n=12&lv=1&seed=4242' });
  const seen = new Set();
  for (let i = 0; i < 12; i++) {
    const st = await quizState(page);
    if (st.items[st.index].src === 'gen') break;
    await solveCurrentRight(page, seen);
  }
  let st = await quizState(page);
  const item = st.items[st.index];
  expect(item.gen).toBe('solve-basic');
  const form = page.locator('.quiz form.problem');
  await fillAnswer(page, form, item, 'wrong');
  await form.locator('.pw-submit').click();
  const fb = form.locator('.feedback');
  await expect(fb.locator('.fb-why')).not.toBeEmpty(); // 생성기도 보기마다 이유(why)를 준다
  await fb.getByRole('button', { name: '비슷한 문제 풀기' }).click();
  st = await quizState(page);
  const next = st.items[st.index];
  expect(next.extra).toBe(true);
  expect(next.gen).toBe('solve-basic');
  expect(next.q).not.toBe(item.q);
});

test('섞어서 = 맞춤 난이도: 두 번 연속 맞히면 실력 문제, 두 번 연속 틀리면 다시 기본 문제', async ({ page }) => {
  await open(page, { student: true, url: '/#/quiz/math-m2-01?n=10&lv=mix&seed=99' });
  let st = await quizState(page);
  expect(st.adaptive).toBe(true);
  expect(st.total).toBe(10);
  expect(st.items).toHaveLength(1); // 한 문제씩 그때그때 고른다
  expect(st.items[0].level).toBe(1); // 보통 학생은 기본부터
  await answerCurrent(page, 'right', { withUnit: true });
  await page.locator('.quiz-next').click();
  await answerCurrent(page, 'right', { withUnit: true });
  await page.locator('.quiz-next').click();
  st = await quizState(page);
  expect(st.items[2].level).toBe(2);
  await expect(page.locator('.level-note')).toContainText('한 단계 어려운 문제');
  await answerCurrent(page, 'wrong');
  await page.locator('.quiz-next').click();
  st = await quizState(page);
  expect(st.items[3].level).toBe(2); // 한 번 틀린 것으로는 내려가지 않는다
  await answerCurrent(page, 'wrong');
  await page.locator('.quiz-next').click();
  st = await quizState(page);
  expect(st.items[4].level).toBe(1);
  await expect(page.locator('.level-note')).toContainText('쉬운 문제');
  // 끝까지: 같은 문제 반복 없이 10문제
  await solveAll(page);
  st = await quizState(page);
  expect(st.items).toHaveLength(10);
  expect(new Set(st.items.map((it) => it.key)).size).toBe(10);
});

test('공부 수준: 도전은 실력 문제부터 시작해 심화까지, 기초 다지기는 기본부터', async ({ page }) => {
  const hard = Object.assign({}, STUDENT, { pace: 'hard' });
  await open(page, { student: hard, url: '/#/quiz/math-m2-01?n=8&lv=mix&seed=5' });
  let st = await quizState(page);
  expect(st.items[0].level).toBe(2);
  for (let i = 0; i < 2; i++) {
    await answerCurrent(page, 'right', { withUnit: true });
    await page.locator('.quiz-next').click();
  }
  st = await quizState(page);
  expect(st.items[2].level).toBe(3); // 도전 학생은 심화까지 올라간다

  /* 저장소(Tutor.store → IndexedDB)의 학생 정보를 바꾼다 */
  await page.evaluate(async () => {
    const list = window.Tutor.store.get('profiles');
    list[0].pace = 'easy';
    window.Tutor.store.set('profiles', list);
    await window.Tutor.store.flush();
  });
  await page.goto('/#/quiz/math-m2-01?n=8&lv=mix&seed=6');
  await waitReady(page);
  st = await quizState(page);
  expect(st.items[0].level).toBe(1);
});

test('생성기 문제가 섞여 나온다: 10문제, 같은 문제 반복 없음, 절반 이상이 새로 만든 문제', async ({ page }) => {
  await open(page, { student: true, url: '/#/unit/math-m2-01/practice' });
  await expect(page.locator('.pool-note').first()).toContainText('풀 때마다 새로 만드는 문제');
  await page.getByRole('button', { name: '문제 풀기 시작' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/quiz\/math-m2-01\?n=10&lv=mix&seed=\d+/);
  await solveAll(page, [0]);
  const st = await quizState(page);
  expect(st.items).toHaveLength(10);
  expect(new Set(st.items.map((it) => it.q + '|' + JSON.stringify(it.choices))).size).toBe(10);
  const gen = st.items.filter((it) => it.src === 'gen');
  expect(gen.length).toBeGreaterThanOrEqual(5);
  expect(new Set(gen.map((it) => it.gen))).toEqual(new Set(['solve-basic', 'count-natural']));

  // "비슷한 문제 더 풀기" → 새 seed 로 다른 생성기 문제
  await page.getByRole('button', { name: '비슷한 문제 더 풀기' }).click();
  const st2 = await quizState(page);
  expect(st2.seed).not.toBe(st.seed);
  expect(st2.index).toBe(0);
  await expect(page.locator('.quiz-count')).toContainText('/ 10');
});

test('같은 설정으로 다시 시작하면 끝난 결과가 아니라 새 문제가 나온다', async ({ page }) => {
  await open(page, { student: true, url: '/#/unit/math-m2-02/practice' });
  await page.getByRole('radio', { name: '5문제' }).check();
  await page.getByRole('button', { name: '문제 풀기 시작' }).click();
  await waitReady(page);
  await solveAll(page);
  await page.goBack();
  await waitReady(page);
  await expect(page).toHaveURL(/practice$/);
  await page.getByRole('radio', { name: '5문제' }).check();
  await page.getByRole('button', { name: '문제 풀기 시작' }).click();
  await waitReady(page);
  await expect(page.locator('.result')).toHaveCount(0);
  await expect(page.locator('.quiz form.problem')).toBeVisible();
});

test('문제가 모자라면 있는 만큼만 낸다고 알려 준다 (과정에서 단원 골라 섞기)', async ({ page }) => {
  const calls = await open(page, { student: true, url: '/#/course/math-m2' });
  await page.getByRole('button', { name: /예상문제 풀기/ }).click();
  const form = page.locator('#mixForm');
  await expect(form).toBeVisible();
  await expect(page.getByRole('button', { name: /예상문제 풀기/ })).toHaveAttribute('aria-expanded', 'true');
  await form.getByRole('checkbox', { name: /일차부등식/ }).uncheck();
  await form.getByRole('checkbox', { name: /연립일차방정식/ }).uncheck();
  await form.getByRole('button', { name: '문제 풀기 시작' }).click();
  await expect(form.locator('.form-msg')).toHaveText('단원을 하나 이상 골라 주세요.');
  await form.getByRole('checkbox', { name: /연립일차방정식/ }).check();
  await form.getByRole('radio', { name: '기본' }).check();
  await form.getByRole('radio', { name: '5문제' }).check();
  await form.getByRole('button', { name: '문제 풀기 시작' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/quiz\/math-m2\?units=math-m2-02&n=5&lv=1&seed=\d+/);
  await expect(page.locator('#topTitle')).toHaveText('중학교 수학 2 예상문제');
  const st = await quizState(page);
  expect(st.total).toBe(3); // 기본(1) 문제은행 3개뿐, 생성기 없음
  expect(st.items.every((it) => it.unit === 'math-m2-02')).toBe(true);
  await expect(page.locator('.notice')).toContainText('준비된 문제가 3개라서 3문제만 낼게요.');
  expect(calls.units).not.toContain('math-m2-01');
});

test('빈 답은 채점하지 않고 알려 주고, 힌트는 눌러서 연다', async ({ page }) => {
  await open(page, { student: true, url: '/#/quiz/math-m2-01?n=12&lv=1&seed=7' });
  const form = () => page.locator('.quiz form.problem');
  await form().locator('.pw-submit').click();
  await expect(form().locator('.pw-msg')).toBeVisible();
  await expect(form().locator('.pw-msg')).toHaveText(/주세요/);
  await expect(form().locator('.feedback')).toBeHidden();
  const seen = new Set();
  for (let i = 0; i < 12; i++) {
    const st = await quizState(page);
    if (st.items[st.index].key === 'math-m2-01#p2') {
      const hint = form().locator('[data-act="hint"]');
      await expect(hint).toHaveText(/힌트 보기/);
      await hint.click();
      await expect(hint).toHaveText(/힌트 닫기/);
      await expect(form().locator('.hint')).toBeVisible();
      await expect(form().locator('.hint')).toContainText('양쪽에서 같은 수를 빼도');
      await expect(hint).toHaveAttribute('aria-expanded', 'true');
      return;
    }
    await solveCurrentRight(page, seen);
  }
  throw new Error('힌트 문제가 나오지 않았다');
});

test('결과에서 "틀린 문제 다시 풀기" 는 틀린 문제만 다시 낸다', async ({ page }) => {
  await open(page, { student: true, url: '/#/quiz/math-m2-02?n=5&lv=mix&seed=11' });
  await solveAll(page, [0, 2]);
  const st = await quizState(page);
  await expect(page.locator('.wrong-list > li')).toHaveCount(2);
  await page.getByRole('button', { name: '틀린 문제 다시 풀기' }).click();
  await expect(page.locator('.retry-badge')).toBeVisible();
  const st2 = await quizState(page);
  expect(st2.total).toBe(2);
  expect(st2.items.map((it) => it.key)).toEqual([st.items[0].key, st.items[2].key]);
  await solveAll(page);
  await expect(page.locator('.score-sub')).toContainText('2문제 중 2문제를 맞혔어요');
});

test('영어 단원은 낱말(vocab)로 문제를 자동으로 만들어 섞는다', async ({ page }) => {
  await open(page, { student: true, url: '/#/quiz/eng-m-01?n=10&lv=1&seed=99' });
  const st = await quizState(page);
  expect(st.total).toBe(10);
  const vocab = st.items.filter((it) => it.src === 'vocab');
  expect(vocab.length).toBeGreaterThanOrEqual(5);
  expect(new Set(st.items.map((it) => it.q)).size).toBe(10);
  for (let i = 0; i < st.total; i++) {
    const item = await answerCurrent(page, 'right');
    await expect(page.locator('.quiz .feedback'), item.key).toHaveClass(/is-ok/);
    await page.locator('.quiz-next').click();
  }
  await expect(page.locator('.score-sub')).toContainText('10문제 중 10문제');
});

test('키보드만으로 문제를 푼다 (Tab·방향키·Space·Enter)', async ({ page }) => {
  await open(page, { student: true, url: '/#/quiz/math-m2-01?n=12&lv=1&seed=31' });
  const isFocused = (sel) => page.evaluate((s) => !!document.activeElement && document.activeElement.matches(s), sel);
  async function tabTo(sel) {
    for (let k = 0; k < 15; k++) {
      if (await isFocused(sel)) return;
      await page.keyboard.press('Tab');
    }
    throw new Error('Tab 으로 ' + sel + ' 에 가지 못했다');
  }
  for (let i = 0; i < 8; i++) {
    const st = await quizState(page);
    const item = st.items[st.index];
    const form = page.locator('.quiz form.problem');
    if (item.type === 'short') {
      await expect(form.locator('.short-input')).toBeFocused();
      const ans = Array.isArray(item.answer) ? (item.check === 'set' ? item.answer.join(', ') : item.answer[0]) : String(item.answer);
      await page.keyboard.type(ans);
      await page.keyboard.press('Enter');
    } else if (item.type === 'choice' || item.type === 'ox') {
      const labels = form.locator(item.type === 'choice' ? '.choice' : '.ox-btn');
      const attr = item.type === 'choice' ? 'data-i' : 'data-v';
      const want = String(item.answer);
      const all = await labels.evaluateAll((els, a) => els.map((e) => e.getAttribute(a)), attr);
      const k = all.indexOf(want);
      await tabTo('input[type="radio"]');
      if (k === 0) await page.keyboard.press('Space');
      for (let j = 0; j < k; j++) await page.keyboard.press(item.type === 'ox' ? 'ArrowRight' : 'ArrowDown');
      await tabTo('.pw-submit');
      await page.keyboard.press('Enter');
    } else if (item.type === 'order') {
      for (const idx of item.answer) {
        await tabTo('.order-item[data-i="' + idx + '"]');
        await page.keyboard.press('Enter');
      }
      await expect(form.locator('.pw-submit')).toBeFocused();
      await page.keyboard.press('Enter');
    }
    await expect(form.locator('.feedback'), item.key).toHaveClass(/is-ok/);
    await expect(page.locator('.quiz-next')).toBeFocused();
    await page.keyboard.press('Enter');
  }
  await expect(page.locator('.quiz-count')).toContainText('9');
});
