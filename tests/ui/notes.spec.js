const { test, expect } = require('@playwright/test');
const { open, collectErrors, waitReady, readStore, quizState, STUDENT } = require('./helpers');

/*
 * 오답노트: 과목·단원별로 모이고, 다시 풀어 두 번 연속 맞히면 빠진다. 지우기, 비슷한 문제.
 */

const OX_NOTE = {
  key: 'math-m2-01#p6', unit: 'math-m2-01', given: 'O', at: 1, wrongCount: 1, rightStreak: 0, gen: null, src: 'bank',
  problem: {
    id: 'p6', level: 1, type: 'ox',
    q: '부등식 $-3x>6$ 의 양쪽을 $-3$ 으로 나누면 $x>-2$ 가 된다.',
    answer: false,
    explain: '음수로 나누면 부등호 방향이 바뀌어요. 바르게 고치면 $x<-2$ 예요.',
  },
};
/* 생성기 문제 사본 + 수직선 그림(Infinity 는 '__inf__' 로 저장된다) */
const GEN_NOTE = {
  key: 'math-m2-01#gen:solve-basic:abc', unit: 'math-m2-01', given: '$x< 3$', at: 2, wrongCount: 2, rightStreak: 0, gen: 'solve-basic', src: 'gen',
  problem: {
    id: 'g-solve-basic-1', level: 1, type: 'choice',
    q: '일차부등식 $2x+1 > 7$ 의 해는?',
    fig: { type: 'numberline', min: 0, max: 6, step: 1, ranges: [{ from: 3, to: '__inf__', fromOpen: true }] },
    choices: ['$x> 3$', '$x< 3$', '$x> 4$', '$x> 2$'], answer: 0,
    explain: '양쪽에서 1을 빼면 $2x > 6$, 양쪽을 2로 나누면 $x > 3$ 이에요.',
  },
};
const SCI_NOTE = {
  key: 'sci-e5-01#s3', unit: 'sci-e5-01', given: '용매', at: 3, wrongCount: 1, rightStreak: 1, gen: null, src: 'bank',
  problem: { id: 's3', level: 1, type: 'short', check: 'text', q: '녹는 물질을 무엇이라고 할까요?', answer: ['용질'], explain: '녹는 물질은 **용질**이에요.' },
};

function withNotes(notes) {
  return { 'tutor.p.p-test-a.notes': notes };
}

test('과목·단원별로 묶어 보여 준다 (그림이 있는 사본도)', async ({ page }) => {
  const errors = collectErrors(page);
  const calls = await open(page, { student: true, storage: withNotes([OX_NOTE, GEN_NOTE, SCI_NOTE]), url: '/#/notes' });
  await expect(page.locator('#topTitle')).toHaveText('오답노트');
  await expect(page.locator('#tabbar a[aria-current="page"]')).toHaveAttribute('data-tab', 'notes');
  await expect(page.locator('.bubble-text')).toContainText('두 번 연속으로 맞히면 오답노트에서 빠져요');
  await expect(page.locator('#notesCount')).toHaveText('3문제');
  await expect(page.locator('.note-group .group-title')).toHaveText([/수학 · 일차부등식/, /과학 · 물질의 용해/]);
  await expect(page.locator('.note-card')).toHaveCount(3);
  const gen = page.locator('.note-card[data-key="' + GEN_NOTE.key + '"]');
  await expect(gen.locator('.fig-wrap svg')).toBeVisible();
  await expect(gen.locator('.note-meta')).toContainText('틀린 횟수 2번');
  await expect(page.locator('.note-card[data-key="' + SCI_NOTE.key + '"] .note-meta')).toContainText('연속 맞힘 1번');
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('다시 풀어 두 번 연속 맞히면 오답노트에서 빠진다', async ({ page }) => {
  await open(page, { student: true, storage: withNotes([OX_NOTE, SCI_NOTE]), url: '/#/notes' });
  const card = page.locator('.note-card[data-key="' + OX_NOTE.key + '"]');
  await card.getByRole('button', { name: '다시 풀기' }).click();
  await card.locator('.ox-btn[data-v="false"]').click();
  await card.getByRole('button', { name: '확인하기' }).click();
  await expect(card.locator('.feedback')).toHaveClass(/is-ok/);
  await expect(card.locator('.note-status')).toContainText('1번 맞힘');
  await expect(card.locator('.note-status')).toContainText('한 번 더 맞히면 오답노트에서 빠져요');
  let notes = await readStore(page, 'p.p-test-a.notes');
  expect(notes.find((n) => n.key === OX_NOTE.key).rightStreak).toBe(1);

  await card.getByRole('button', { name: '한 번 더 풀기' }).click();
  await card.locator('.ox-btn[data-v="false"]').click();
  await card.getByRole('button', { name: '확인하기' }).click();
  await expect(card.locator('.note-status')).toContainText('두 번 연속 맞혔어요! 오답노트에서 뺐어요.');
  await expect(page.locator('#notesCount')).toHaveText('1문제');
  notes = await readStore(page, 'p.p-test-a.notes');
  expect(notes.map((n) => n.key)).toEqual([SCI_NOTE.key]);

  await page.reload();
  await waitReady(page);
  await expect(page.locator('.note-card')).toHaveCount(1);
});

test('다시 풀다 틀리면 연속 맞힘이 처음부터, 틀린 횟수가 늘어난다', async ({ page }) => {
  await open(page, { student: true, storage: withNotes([SCI_NOTE]), url: '/#/notes' });
  const card = page.locator('.note-card').first();
  await card.getByRole('button', { name: '다시 풀기' }).click();
  await expect(card.locator('.short-input')).toBeFocused();
  await card.locator('.short-input').fill('용액');
  await card.locator('.short-input').press('Enter');
  await expect(card.locator('.feedback')).toHaveClass(/is-bad/);
  await expect(card.locator('.feedback')).toContainText('용질');
  await expect(card.locator('.note-status')).toContainText('아쉬워요');
  const notes = await readStore(page, 'p.p-test-a.notes');
  expect(notes[0]).toMatchObject({ wrongCount: 2, rightStreak: 0, given: '용액' });
});

test('다시 풀다 틀리면 추가 설명: 그 개념 카드를 불러와 보여 주고, 같은 개념의 비슷한 문제로', async ({ page }) => {
  const note = Object.assign({}, OX_NOTE, { problem: Object.assign({}, OX_NOTE.problem, { concept: 1 }) });
  const calls = await open(page, { student: true, storage: withNotes([note]), url: '/#/notes' });
  expect(calls.units).toEqual([]); // 오답노트는 단원 파일 없이 사본만으로 그린다
  const card = page.locator('.note-card').first();
  await card.getByRole('button', { name: '다시 풀기' }).click();
  await card.locator('.ox-btn[data-v="true"]').click();
  await card.getByRole('button', { name: '확인하기' }).click();
  const fb = card.locator('.feedback');
  await expect(fb).toHaveClass(/is-bad/);
  await fb.getByRole('button', { name: '개념 다시 보기' }).click();
  await expect(fb.locator('.concept-again .ca-title')).toHaveText('부등식의 성질');
  await expect(fb.locator('.concept-again')).toContainText('음수를 곱하거나 나누기');
  expect(calls.units).toEqual(['math-m2-01']); // 필요할 때만 단원을 불러온다
  await fb.getByRole('button', { name: '비슷한 문제 풀기' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/quiz\/math-m2-01\?concept=1&n=5&lv=all&seed=\d+/);
  const st = await quizState(page);
  expect(st.items.length).toBeGreaterThan(0);
  expect(st.items.every((it) => it.concept === 1)).toBe(true);
});

test('지우기', async ({ page }) => {
  await open(page, { student: true, storage: withNotes([OX_NOTE, SCI_NOTE]), url: '/#/notes' });
  await page.locator('.note-card[data-key="' + SCI_NOTE.key + '"]').getByRole('button', { name: '지우기' }).click();
  await expect(page.locator('.note-card')).toHaveCount(1);
  await expect(page.locator('.note-group')).toHaveCount(1); // 빈 묶음도 사라진다
  const notes = await readStore(page, 'p.p-test-a.notes');
  expect(notes.map((n) => n.key)).toEqual([OX_NOTE.key]);
});

test('생성기에서 나온 오답은 "비슷한 문제" 로 같은 생성기 문제를 새로 푼다', async ({ page }) => {
  await open(page, { student: true, storage: withNotes([GEN_NOTE]), url: '/#/notes' });
  await page.getByRole('button', { name: '비슷한 문제' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/quiz\/math-m2-01\?gen=solve-basic&n=5&lv=1&seed=\d+/);
  const st = await quizState(page);
  expect(st.total).toBe(5);
  expect(st.items.every((it) => it.gen === 'solve-basic' && it.src === 'gen')).toBe(true);
});

test('틀린 문제가 없으면 빈 화면 안내', async ({ page }) => {
  await open(page, { student: true, url: '/#/notes' });
  await expect(page.locator('.state-box')).toContainText('틀린 문제가 없어요');
});

test('예상문제에서 틀린 문제가 오답노트로 들어가 다시 풀 수 있다 (사본·그림 그대로)', async ({ page }) => {
  await open(page, { student: { id: 'p-e5', name: '', level: 'elem', grade: 'e5', created: 1 }, url: '/#/quiz/sci-e5-01?n=10&lv=2&seed=5' });
  const st = await quizState(page);
  const pie = st.items.findIndex((it) => it.key === 'sci-e5-01#s5');
  expect(pie).toBeGreaterThanOrEqual(0);
  for (let i = 0; i < st.total; i++) {
    const item = st.items[i];
    const form = page.locator('.quiz form.problem');
    if (item.type === 'choice') await form.locator('.choice[data-i="' + (i === pie ? (item.answer + 1) % item.choices.length : item.answer) + '"]').click();
    else await form.locator('.short-input').fill(String(item.answer) + (item.unitLabel || ''));
    await form.locator('.pw-submit').click();
    await page.locator('.quiz-next').click();
  }
  await page.locator('#tabbar a[data-tab="notes"]').click();
  await waitReady(page);
  const card = page.locator('.note-card[data-key="sci-e5-01#s5"]');
  await expect(card).toBeVisible();
  await expect(card.locator('.fig-wrap svg')).toBeVisible();
  await card.getByRole('button', { name: '다시 풀기' }).click();
  await expect(card.locator('.choice')).toHaveCount(3);
});
