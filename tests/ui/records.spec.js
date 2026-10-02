const { test, expect } = require('@playwright/test');
const {
  open, collectErrors, waitReady, goHash, readStore, flushStore, readIDB, readLocal, quizState, answerCurrent,
} = require('./helpers');

/*
 * 학습 기록 저장 (ARCHITECTURE §9): IndexedDB 에 저장해 새로고침해도 남고, localStorage 에는 학습 기록을 두지 않는다.
 * 예전 localStorage(tutor.*) 기록은 처음 열 때 옮긴다. 풀이 기록(attempts)·통계(stats)·오답 원인(cause)·개념(concept).
 * 학생을 지우면 그 학생의 키(p.<id>.*)만 지운다. 시험 학생은 가상의 이름(민수·지아)만 쓴다.
 */

const MINSU = { id: 'p-minsu', name: '민수', avatar: '🐻', level: 'mid', grade: 'm2', pace: 'normal', created: 1 };
const JIA = { id: 'p-jia', name: '지아', avatar: '🐰', level: 'mid', grade: 'm2', pace: 'easy', created: 2 };

function dataFor(id, tag) {
  return {
    ['tutor.p.' + id + '.progress']: { 'math-m2-01': { seen: [0], cards: 4, solved: 2, correct: 1, best: 50, last: 1 } },
    ['tutor.p.' + id + '.notes']: [{ key: 'math-m2-01#p6', unit: 'math-m2-01', given: 'O', at: 1, wrongCount: 1, rightStreak: 0, problem: { type: 'ox', q: tag + ' 문제', answer: false, explain: '해설' } }],
    ['tutor.p.' + id + '.attempts']: [{ t: 1, unit: 'math-m2-01', pid: 'p6', level: 1, ok: false, cause: tag + ' 원인' }],
    ['tutor.p.' + id + '.stats']: { v: 1, days: { '2026-10-01': { n: 1, c: 0 } }, subjects: { math: { n: 1, c: 0 } } },
    ['tutor.p.' + id + '.chat']: { math: [{ who: 'me', text: tag + ' 질문', t: 1 }] },
    ['tutor.p.' + id + '.recent']: ['math-m2-01'],
    ['tutor.p.' + id + '.days']: ['2026-10-01'],
  };
}

test('기록은 IndexedDB 에 저장되어 새로고침해도 남고, localStorage 에는 학습 기록을 두지 않는다', async ({ page }) => {
  const errors = collectErrors(page);
  const calls = await open(page, { url: '/#/setup' });
  await page.getByRole('link', { name: /중학교/ }).click();
  await waitReady(page);
  await page.getByRole('link', { name: '2학년' }).click();
  await waitReady(page);
  await page.getByLabel(/별명/).fill('민수');
  await page.getByRole('button', { name: '시작하기' }).click();
  await waitReady(page);
  await goHash(page, '#/unit/math-m2-01/learn');
  await page.getByRole('button', { name: '다음 ›' }).click();
  await expect(page.locator('#cvCount')).toHaveText('카드 2 / 4');
  await goHash(page, '#/quiz/math-m2-01?n=5&lv=1&seed=4242');
  await answerCurrent(page, 'wrong');
  await flushStore(page);

  const idb = await readIDB(page);
  const pid = idb.current;
  expect(idb.profiles).toHaveLength(1);
  expect(idb.profiles[0]).toMatchObject({ id: pid, name: '민수', grade: 'm2' });
  expect(idb['p.' + pid + '.progress']['math-m2-01']).toMatchObject({ seen: [0, 1], solved: 1, correct: 0 });
  expect(idb['p.' + pid + '.attempts']).toHaveLength(1);
  expect(idb['p.' + pid + '.notes']).toHaveLength(1);
  // localStorage 에는 학습 기록·별명이 없다(화면 설정 사본만 둘 수 있다)
  const ls = await readLocal(page);
  expect(Object.keys(ls).filter((k) => k !== 'tutor.__mirror.settings')).toEqual([]);
  expect(JSON.stringify(ls)).not.toContain('민수');
  expect(await page.evaluate(() => window.TutorApp.storageProvider)).toBe('indexeddb');

  await page.reload();
  await waitReady(page);
  await goHash(page, '#/course/math-m2');
  await expect(page.locator('#studentChip')).toContainText('민수');
  await expect(page.locator('.unit-row').first()).toContainText('개념 2/4');
  await expect(page.locator('.unit-row').first()).toContainText('문제 1개');
  await goHash(page, '#/notes');
  await expect(page.locator('.note-card')).toHaveCount(1);
  // 주소·문서 제목에는 별명이 들어가지 않는다
  expect(page.url()).not.toContain(encodeURIComponent('민수'));
  expect(await page.title()).not.toContain('민수');
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('예전 localStorage(tutor.*) 기록을 처음 열 때 IndexedDB 로 옮긴다', async ({ page }) => {
  const legacy = Object.assign({ 'tutor.settings': { fontScale: 2, theme: 'dark' } }, dataFor(MINSU.id, '민수'));
  await open(page, { student: [MINSU], storage: legacy, url: '/#/course/math-m2' });
  // 옮긴 기록이 화면에 그대로
  await expect(page.locator('.unit-row').first()).toContainText('개념 1/4');
  await expect(page.locator('html')).toHaveAttribute('data-font', '2');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await flushStore(page);
  const idb = await readIDB(page);
  expect(idb.profiles.map((p) => p.name)).toEqual(['민수']);
  expect(idb.current).toBe(MINSU.id);
  for (const k of Object.keys(legacy)) expect(idb[k.slice('tutor.'.length)], k).toEqual(legacy[k]);
  // 옮긴 뒤 localStorage 의 예전 키는 지운다
  const ls = await readLocal(page);
  expect(Object.keys(ls).filter((k) => k !== 'tutor.__mirror.settings')).toEqual([]);
  await page.reload();
  await waitReady(page);
  await expect(page.locator('.unit-row').first()).toContainText('개념 1/4');
  await expect(page.locator('html')).toHaveAttribute('data-font', '2');
});

test('문제를 풀 때마다 풀이 기록·통계를 남기고, 오답노트에 그때 보여 준 원인과 개념을 둔다', async ({ page }) => {
  await open(page, { student: [MINSU], url: '/#/quiz/math-m2-01?n=12&lv=1&seed=4242' });
  // 문제은행 p1(보기 고르기)이 나올 때까지 맞히고, p1 은 일부러 틀린다
  let found = false;
  for (let i = 0; i < 12; i++) {
    const st = await quizState(page);
    const item = st.items[st.index];
    if (item.key === 'math-m2-01#p1') {
      const form = page.locator('.quiz form.problem');
      await form.locator('.choice[data-i="0"]').click();
      await form.locator('.pw-submit').click();
      await expect(form.locator('.fb-why')).toContainText('등호(=)가 있는 식은 등식이에요.');
      found = true;
      break;
    }
    await answerCurrent(page, 'right', { withUnit: true });
    await page.locator('.quiz-next').click();
  }
  expect(found).toBe(true);
  const attempts = await readStore(page, 'p.p-minsu.attempts');
  const last = attempts[attempts.length - 1];
  expect(last).toMatchObject({ unit: 'math-m2-01', pid: 'p1', level: 1, ok: false, cause: '등호(=)가 있는 식은 등식이에요.' });
  expect(typeof last.t).toBe('number');
  expect(attempts.slice(0, -1).every((a) => a.ok)).toBe(true);
  expect(attempts.filter((a) => a.gen).every((a) => a.gen === 'solve-basic' || a.gen === 'count-natural')).toBe(true);

  const stats = await readStore(page, 'p.p-minsu.stats');
  const today = Object.keys(stats.days)[0];
  expect(stats.days[today]).toEqual({ n: attempts.length, c: attempts.length - 1 });
  expect(stats.subjects.math).toEqual({ n: attempts.length, c: attempts.length - 1 });

  const notes = await readStore(page, 'p.p-minsu.notes');
  expect(notes[0]).toMatchObject({ key: 'math-m2-01#p1', cause: '등호(=)가 있는 식은 등식이에요.', concept: 0 });
  // 오답노트에도 그때의 까닭을 보여 준다(다시 풀 때는 감춘다)
  await goHash(page, '#/notes');
  const card = page.locator('.note-card[data-key="math-m2-01#p1"]');
  await expect(card.locator('.note-cause')).toContainText('틀린 까닭 등호(=)가 있는 식은 등식이에요.');
  await card.getByRole('button', { name: '다시 풀기' }).click();
  await expect(card.locator('.note-cause')).toBeHidden();

  // 개념 카드의 이해 확인도 남긴다(level 0)
  await goHash(page, '#/unit/math-m2-01/learn?card=1');
  const box = page.locator('.concept-card:visible .check-box');
  await box.locator('.choice[data-i="0"]').click();
  await box.getByRole('button', { name: '확인하기' }).click();
  await expect(box.locator('.feedback')).toHaveClass(/is-bad/);
  const after = await readStore(page, 'p.p-minsu.attempts');
  expect(after[after.length - 1]).toMatchObject({ unit: 'math-m2-01', pid: 'check-1', level: 0, ok: false });
  expect(after[after.length - 1].cause).toContain('음수를 곱하거나 나누면 방향이 바뀌어요');
});

test('기록 화면: 최근 정답률과 "자주 틀린 원인" 상위 3개를 짧게 보여 준다', async ({ page }) => {
  const at = (ok, cause) => ({ t: 1, unit: 'math-m2-01', pid: 'p1', level: 1, ok, cause });
  const attempts = [
    at(false, '분모끼리도 더했어요.'), at(false, '부등호 방향을 바꾸지 않았어요.'), at(true),
    at(false, '부등호 방향을 바꾸지 않았어요.'), at(false, '단위를 빠뜨렸어요.'), at(false, '부등호 방향을 바꾸지 않았어요.'),
    at(false, '분모끼리도 더했어요.'), at(false, '계산 실수를 했어요.'), at(true), at(true),
  ].map((a) => { if (!a.cause) delete a.cause; return a; });
  await open(page, { student: [MINSU], storage: { 'tutor.p.p-minsu.attempts': attempts }, url: '/#/stats' });
  const box = page.locator('.recent-box');
  await expect(box).toContainText('최근 10문제 정답률 30%');
  await expect(box.locator('.cause-list li')).toHaveCount(3);
  await expect(box.locator('.cause-list li').nth(0)).toContainText('부등호 방향을 바꾸지 않았어요.');
  await expect(box.locator('.cause-list li').nth(0)).toContainText('3번');
  await expect(box.locator('.cause-list li').nth(1)).toContainText('분모끼리도 더했어요.');
  await expect(box.locator('.cause-list li').nth(1)).toContainText('2번');
  // 같은 횟수(1번)면 최근 것이 먼저
  await expect(box.locator('.cause-list li').nth(2)).toContainText('계산 실수를 했어요.');
  // 기록이 없으면 이 칸은 없다
  await page.evaluate(async () => { window.Tutor.store.remove('p.p-minsu.attempts'); await window.Tutor.store.flush(); });
  await goHash(page, '#/home');
  await goHash(page, '#/stats');
  await expect(page.locator('.recent-box')).toHaveCount(0);
});

test('학생을 지우면 그 학생의 키(p.<id>.*)만 지워지고 다른 학생 기록은 그대로', async ({ page }) => {
  const storage = Object.assign({}, dataFor(MINSU.id, '민수'), dataFor(JIA.id, '지아'));
  await open(page, { student: [MINSU, JIA], storage, url: '/#/settings' });
  await flushStore(page);
  const before = await readIDB(page);
  const jiaKeys = Object.keys(before).filter((k) => k.indexOf('p.p-jia.') === 0);
  const minsuKeys = Object.keys(before).filter((k) => k.indexOf('p.p-minsu.') === 0);
  expect(jiaKeys.length).toBe(7);
  expect(minsuKeys.length).toBe(7);

  await page.locator('.student-row', { hasText: '지아' }).getByRole('button', { name: '삭제' }).click();
  await expect(page.getByRole('dialog')).toContainText('지아');
  await page.getByRole('dialog').getByRole('button', { name: '지우기' }).click();
  await waitReady(page);
  await expect(page.locator('.student-row')).toHaveCount(1);
  await flushStore(page);
  const after = await readIDB(page);
  expect(Object.keys(after).filter((k) => k.indexOf('p.p-jia.') === 0)).toEqual([]);
  for (const k of minsuKeys) expect(after[k], k).toEqual(before[k]);
  expect(after.profiles.map((p) => p.id)).toEqual([MINSU.id]);
  expect(after.current).toBe(MINSU.id);

  // "이 학생 기록 지우기": 그 학생의 모든 기록(대화·풀이 기록 포함)을 지우고 학생은 남긴다
  await page.getByRole('button', { name: '이 학생 기록 지우기' }).click();
  await page.getByRole('dialog').getByRole('button', { name: '지우기' }).click();
  await expect(page.locator('.set-msg')).toHaveText('기록을 지웠어요.');
  await flushStore(page);
  const cleared = await readIDB(page);
  expect(Object.keys(cleared).filter((k) => k.indexOf('p.') === 0)).toEqual([]);
  expect(cleared.profiles.map((p) => p.name)).toEqual(['민수']);
});
