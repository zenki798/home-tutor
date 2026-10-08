const { test, expect } = require('@playwright/test');
const { open, readStore, waitReady, STUDENT, STUDENT_B } = require('./helpers');

/*
 * 설정 → '이 학생 기록 지우기'(2026-10-08 고침): 그 학생의 학습 기록(진도·오답노트·풀이 기록·통계·대화·최근 단원·공부한 날·이어 풀기)만 지운다.
 * 그 학생의 선택(읽어 주기 — prefs)과 아직 전하지 않은 '틀린 곳 알림'(reports, 따로 지우는 단추가 있다)은 남는다. 다른 학생 기록은 그대로.
 */
const pre = (id) => 'tutor.p.' + id + '.';
function records(id) {
  return {
    [pre(id) + 'progress']: { 'math-m2-01': { seen: [0, 1], cards: 4, solved: 3, correct: 2, best: 66, last: 1 } },
    [pre(id) + 'notes']: [{ key: 'math-m2-01#p6', unit: 'math-m2-01', given: 'O', at: 1, wrongCount: 1, rightStreak: 0, problem: { type: 'ox', q: '문제', answer: false, explain: '해설' } }],
    [pre(id) + 'attempts']: [{ t: 1, unit: 'math-m2-01', level: 1, ok: true, pid: 'p1' }],
    [pre(id) + 'stats']: { v: 1, days: { '2026-10-01': { n: 1, c: 1 } }, subjects: { math: { n: 1, c: 1 } } },
    [pre(id) + 'recent']: ['math-m2-01'],
    [pre(id) + 'days']: ['2026-10-01'],
    [pre(id) + 'chat']: { math: [{ who: 'me', text: '질문', t: 1 }] },
    [pre(id) + 'prefs']: { tts: 'on', ttsRate: 'normal' },
    [pre(id) + 'reports']: [{ t: 1, unit: 'math-m2-01', kind: 'problem', ref: 'p6', reason: 'answer', memo: '', q: '문제' }],
  };
}

test('이 학생 기록 지우기: 학습 기록만 지우고 읽어 주기 설정·틀린 곳 알림은 남긴다 (다른 학생은 그대로)', async ({ page }) => {
  const storage = Object.assign(records(STUDENT.id), records(STUDENT_B.id));
  await open(page, { student: [STUDENT, STUDENT_B], storage, url: '/#/settings' });
  const sec = page.locator('section[aria-labelledby="setClear"]');
  await expect(sec).toContainText('읽어 주기 설정과 틀린 곳 알림은 남아요');
  await sec.getByRole('button', { name: '이 학생 기록 지우기' }).click();
  const dlg = page.getByRole('dialog');
  await expect(dlg).toContainText('복습 일정');
  await dlg.getByRole('button', { name: '지우기' }).click();
  await expect(sec.locator('.set-msg')).toHaveText('기록을 지웠어요.');

  const id = STUDENT.id;
  for (const k of ['progress', 'notes', 'attempts', 'stats', 'recent', 'days', 'chat']) {
    expect(await readStore(page, 'p.' + id + '.' + k), k).toBeNull();
  }
  expect(await readStore(page, 'p.' + id + '.prefs')).toEqual({ tts: 'on', ttsRate: 'normal' });
  expect((await readStore(page, 'p.' + id + '.reports')).length).toBe(1);
  // 다른 학생 기록은 그대로
  expect((await readStore(page, 'p.' + STUDENT_B.id + '.notes')).length).toBe(1);
  expect(await readStore(page, 'p.' + STUDENT_B.id + '.progress')).not.toBeNull();
  // 새로고침해도 그대로 (저장소를 다 불러온 뒤에 읽는다)
  await page.reload();
  await waitReady(page);
  expect(await readStore(page, 'p.' + id + '.prefs')).toEqual({ tts: 'on', ttsRate: 'normal' });
  expect(await readStore(page, 'p.' + id + '.progress')).toBeNull();
});

test('학생을 지우면 그 학생의 모든 것(설정·알림 포함)이 지워진다', async ({ page }) => {
  const storage = Object.assign(records(STUDENT.id), records(STUDENT_B.id));
  await open(page, { student: [STUDENT, STUDENT_B], storage, url: '/#/settings' });
  await page.locator('.student-row', { hasText: STUDENT_B.name }).getByRole('button', { name: '삭제' }).click();
  await page.getByRole('dialog').getByRole('button', { name: '지우기' }).click();
  await expect(page.locator('.student-row')).toHaveCount(1);
  for (const k of ['progress', 'notes', 'prefs', 'reports']) {
    expect(await readStore(page, 'p.' + STUDENT_B.id + '.' + k), k).toBeNull();
  }
  expect(await readStore(page, 'p.' + STUDENT.id + '.prefs')).toEqual({ tts: 'on', ttsRate: 'normal' });
});
