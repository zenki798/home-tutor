const { test, expect } = require('@playwright/test');
const { open, collectErrors, waitReady, readStore, goHash, answerCurrent, quizState, STUDENT, STUDENT_B } = require('./helpers');

/*
 * 틀린 곳 알리기(사용자 결정 2026-10-08: 그 기기에만 모은다): 문제(채점 뒤)·개념 카드·예제마다 버튼 → 이유·메모를 골라 알린다.
 * 알린 것은 그 학생의 p.<id>.reports 에만 쌓이고(외부 요청 0), 설정의 '틀린 곳 알림'에서 보호자가 글로 복사해 직접 전한다.
 * 복사하는 글에는 별명 같은 학생 정보를 넣지 않는다. 백업에는 함께 들어간다(js/storage.js DATA_KINDS).
 */

function withReports(list, id = 'p-test-a') { return { ['tutor.p.' + id + '.reports']: list }; }
const R1 = { t: Date.UTC(2026, 9, 7, 3), unit: 'math-m2-01', kind: 'problem', ref: 'p6', reason: 'answer', memo: '답이 X 같아요', q: '부등식 -3x>6 의 양쪽을 -3 으로 나누면…', v: '0.1.0' };
const R2 = { t: Date.UTC(2026, 9, 8, 3), unit: 'sci-e5-01', kind: 'concept', ref: 'c0', reason: 'typo', memo: '', q: '용해와 용액', v: '0.1.0' };

/* 클립보드에 쓴 글을 가로챈다(시험 기기의 클립보드를 건드리지 않게) */
async function stubClipboard(page, ok = true) {
  await page.addInitScript((ok) => {
    window.__copied = [];
    try {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: (t) => (ok ? (window.__copied.push(String(t)), Promise.resolve()) : Promise.reject(new Error('막힘'))) },
      });
    } catch (e) { /* 무시 */ }
  }, ok);
}

test('예상문제: 채점한 뒤 "틀린 곳 알리기" → 이유를 골라 알리면 이 기기에만 모인다', async ({ page }) => {
  const errors = collectErrors(page);
  const calls = await open(page, { student: true, url: '/#/quiz/math-m2-01?n=3&lv=1&seed=11' });
  const form = page.locator('.quiz form.problem');
  await expect(form.getByRole('button', { name: '틀린 곳 알리기' })).toHaveCount(0); // 풀기 전에는 없다
  const item = await answerCurrent(page, 'right');
  const btn = form.getByRole('button', { name: '틀린 곳 알리기' });
  await btn.click();
  const rf = form.locator('.report-form');
  await expect(rf).toBeVisible();
  await rf.getByRole('button', { name: '알리기' }).click();
  await expect(rf.locator('.form-msg')).toContainText('어떤 점이 이상한지 골라 주세요');
  await rf.getByLabel('정답이 틀린 것 같아요').check();
  await rf.locator('textarea').fill('  2번도 답이 될 것 같아요\u0007  ');
  await rf.getByRole('button', { name: '알리기' }).click();
  await expect(form.locator('.report-done')).toContainText('고마워요');
  const reports = await readStore(page, 'p.p-test-a.reports');
  expect(reports).toHaveLength(1);
  const st = await quizState(page);
  expect(reports[0]).toMatchObject({ unit: 'math-m2-01', kind: 'problem', reason: 'answer', memo: '2번도 답이 될 것 같아요' });
  const first = st.items[0];
  // 문제은행 문제는 그 문제 번호, 새로 만든 문제는 생성기 이름과 seed(같은 문제를 다시 만들 수 있다)
  if (first.src === 'bank') expect(reports[0].ref).toBe(first.key.split('#')[1]);
  else expect(reports[0].ref).toMatch(new RegExp('^g-' + first.gen + '-\\d+$'));
  expect(typeof reports[0].q).toBe('string');
  expect(reports[0].q.length).toBeGreaterThan(3);
  expect(reports[0].q.length).toBeLessThanOrEqual(150);
  expect(item).toBeTruthy();
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('개념 카드·예제에서도 알릴 수 있고, 같은 곳을 다시 알리면 하나로 고쳐진다', async ({ page }) => {
  await open(page, { student: true, url: '/#/unit/math-m2-01/learn' });
  const card = page.locator('.concept-card').first();
  await card.getByRole('button', { name: '틀린 곳 알리기' }).click();
  await card.locator('.report-form').getByLabel('글자·그림이 잘못됐어요').check();
  await card.locator('.report-form').getByRole('button', { name: '알리기' }).click();
  await expect(card.locator('.report-done')).toBeVisible();

  await card.getByRole('button', { name: '틀린 곳 알리기' }).click();
  await card.locator('.report-form').getByLabel('설명·해설이 틀린 것 같아요').check();
  await card.locator('.report-form textarea').fill('두 번째 문단');
  await card.locator('.report-form').getByRole('button', { name: '알리기' }).click();

  await goHash(page, '#/unit/math-m2-01/examples');
  const ex = page.locator('.example').first();
  await ex.getByRole('button', { name: '틀린 곳 알리기' }).click();
  await ex.locator('.report-form').getByLabel('기타').check();
  await ex.locator('.report-form').getByRole('button', { name: '알리기' }).click();
  await expect(ex.locator('.report-done')).toBeVisible();

  const reports = await readStore(page, 'p.p-test-a.reports');
  expect(reports.map((r) => r.kind + ':' + r.ref + ':' + r.reason)).toEqual(['example:ex0:other', 'concept:c0:explain']);
  expect(reports[1].memo).toBe('두 번째 문단');
});

test('설정 "틀린 곳 알림": 모은 것을 보여 주고, 학생 정보 없이 글로 복사하고, 지울 수 있다', async ({ page }) => {
  await stubClipboard(page);
  await open(page, { student: true, storage: withReports([R2, R1]), url: '/#/settings' });
  const sec = page.locator('#reports');
  await expect(sec.locator('h3')).toContainText('틀린 곳 알림');
  await expect(sec.locator('.report-item')).toHaveCount(2);
  await expect(sec.locator('.report-item').first()).toContainText('물질의 용해');
  await expect(sec.locator('.report-item').first()).toContainText('글자·그림이 잘못됐어요');
  await expect(sec.locator('.report-item').nth(1)).toContainText('정답이 틀린 것 같아요');
  await expect(sec.locator('.report-item').nth(1)).toContainText('답이 X 같아요');

  await sec.getByRole('button', { name: '글로 복사하기' }).click();
  await expect(sec.locator('.report-done')).toContainText('복사했어요');
  const copied = await page.evaluate(() => window.__copied);
  expect(copied).toHaveLength(1);
  const text = copied[0];
  expect(text).toContain('가정교사 틀린 곳 알림 2건');
  expect(text).toContain('math-m2-01');
  expect(text).toContain('문제 p6');
  expect(text).toContain('정답이 틀린 것 같아요');
  expect(text).toContain('답이 X 같아요');
  expect(text).not.toContain(STUDENT.name); // 별명은 넣지 않는다
  await expect(sec.locator('textarea.report-text')).toHaveValue(text);

  await sec.locator('.report-item').first().getByRole('button', { name: '지우기' }).click();
  await expect(sec.locator('.report-item')).toHaveCount(1);
  expect((await readStore(page, 'p.p-test-a.reports')).map((r) => r.ref)).toEqual(['p6']);

  await sec.getByRole('button', { name: '모두 지우기' }).click();
  await page.locator('.modal').getByRole('button', { name: '지우기' }).click();
  await expect(sec.locator('.report-item')).toHaveCount(0);
  await expect(sec).toContainText('아직 알린 곳이 없어요');
  expect(await readStore(page, 'p.p-test-a.reports')).toEqual(null);
});

test('클립보드를 쓸 수 없으면 글을 보여 주고 직접 복사하게 안내한다', async ({ page }) => {
  await stubClipboard(page, false);
  await open(page, { student: true, storage: withReports([R1]), url: '/#/settings' });
  const sec = page.locator('#reports');
  await sec.getByRole('button', { name: '글로 복사하기' }).click();
  await expect(sec.locator('.report-done')).toContainText('직접 복사');
  await expect(sec.locator('textarea.report-text')).toBeVisible();
  await expect(sec.locator('textarea.report-text')).toHaveValue(/가정교사 틀린 곳 알림 1건/);
});

test('알림은 학생마다 따로: 다른 학생의 설정에는 보이지 않는다', async ({ page }) => {
  await open(page, { student: [STUDENT_B, STUDENT], storage: withReports([R1], STUDENT.id), url: '/#/settings' });
  await expect(page.locator('#reports .report-item')).toHaveCount(0);
  await expect(page.locator('#reports')).toContainText('아직 알린 곳이 없어요');
});
