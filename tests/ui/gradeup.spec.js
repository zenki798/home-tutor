const { test, expect } = require('@playwright/test');
const { open, collectErrors, waitReady, readStore, goHash } = require('./helpers');

/*
 * 새 학년 안내: 한국 학년도는 3월 1일에 시작한다. 학년을 정한 뒤(gradeAt — 없으면 만든 날) 새 학년도가 되면
 * 홈에서 "새 학년이 되었나요?"라고 묻는다 → [○학년으로 올리기] · [그대로 두기](이번 학년도에는 다시 묻지 않음) · [다른 학년 고르기].
 * 학년을 맞게 두어야 교육과정 변경 안내(js/impact.js)도 정확하다. 학년을 정한 때를 알 수 없으면 묻지 않는다. 학생은 가상의 이름.
 */
const OCT = new Date(2026, 9, 8, 12).getTime();
function student(grade, level, extra) {
  return Object.assign({ id: 'p-up', name: '민수', avatar: '🐻', level, grade, pace: 'normal', created: OCT }, extra);
}
async function at(page, y, m, d) { await page.clock.setFixedTime(new Date(y, m - 1, d, 10, 0, 0)); }
const card = (page) => page.locator('.grade-up');

test('새 학년도(3월)가 되면 묻고, 올리면 학년·학교급이 바뀌고 다시 묻지 않는다', async ({ page }) => {
  const errors = collectErrors(page);
  await at(page, 2027, 3, 2);
  const calls = await open(page, { student: student('m2', 'mid'), url: '/#/home' });
  await expect(card(page)).toBeVisible();
  await expect(card(page)).toContainText('새 학년이 되었나요?');
  await expect(card(page)).toContainText('2027학년도');
  await expect(card(page)).toContainText('중학교 2학년');
  await card(page).getByRole('button', { name: '중학교 3학년으로 올리기' }).click();
  await waitReady(page);
  await expect(card(page)).toHaveCount(0);
  await expect(page.locator('#studentChip')).toContainText('중3');
  const p = (await readStore(page, 'profiles'))[0];
  expect(p).toMatchObject({ grade: 'm3', level: 'mid' });
  expect(p.gradeAt).toBe(new Date(2027, 2, 2, 10).getTime());
  await page.reload();
  await waitReady(page);
  await expect(card(page)).toHaveCount(0);
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('그대로 두면 이번 학년도에는 다시 묻지 않고, 다음 학년도에 다시 묻는다', async ({ page }) => {
  await at(page, 2027, 3, 2);
  await open(page, { student: student('e3', 'elem'), url: '/#/home' });
  await card(page).getByRole('button', { name: '그대로 두기' }).click();
  await expect(card(page)).toHaveCount(0);
  expect((await readStore(page, 'profiles'))[0]).toMatchObject({ grade: 'e3', gradeAsk: 2027 });
  await page.reload();
  await waitReady(page);
  await expect(card(page)).toHaveCount(0);
  await at(page, 2028, 3, 5);
  await page.reload();
  await waitReady(page);
  await expect(card(page)).toBeVisible();
  await expect(card(page).getByRole('button', { name: '초등학교 4학년으로 올리기' })).toBeVisible();
});

test('3월 1일 전이면 묻지 않는다 (2027-02-28)', async ({ page }) => {
  await at(page, 2027, 2, 28);
  await open(page, { student: student('m2', 'mid'), url: '/#/home' });
  await expect(page.locator('.page-title')).toBeVisible();
  await expect(card(page)).toHaveCount(0);
});

test('초등 6학년 → 중학교 1학년: 학교급도 바뀌고 홈이 중학교 과목으로', async ({ page }) => {
  await at(page, 2027, 3, 2);
  await open(page, { student: student('e6', 'elem'), url: '/#/home' });
  await card(page).getByRole('button', { name: '중학교 1학년으로 올리기' }).click();
  await waitReady(page);
  await expect(page.locator('.page-title')).toHaveText('중학교 1학년 과목');
  expect((await readStore(page, 'profiles'))[0]).toMatchObject({ grade: 'm1', level: 'mid' });
});

test('고등학교 3학년은 올리기 대신 다른 학년 고르기만 (대학교·성인)', async ({ page }) => {
  await at(page, 2027, 3, 2);
  await open(page, { student: student('h3', 'high'), url: '/#/home' });
  await expect(card(page)).toBeVisible();
  await expect(card(page).getByRole('button', { name: /올리기/ })).toHaveCount(0);
  await expect(card(page)).toContainText('대학교');
  await expect(card(page).getByRole('link', { name: '다른 학년 고르기' })).toHaveAttribute('href', '#/setup?change=1');
});

test('대학교·성인 학생에게는 묻지 않는다', async ({ page }) => {
  await at(page, 2027, 3, 2);
  await open(page, { student: [student('u', 'univ'), student('a', 'adult', { id: 'p-up2', name: '지아' })], url: '/#/home' });
  await expect(page.locator('.page-title')).toBeVisible();
  await expect(card(page)).toHaveCount(0);
  await goHash(page, '#/settings');
  await page.locator('.student-row', { hasText: '지아' }).getByRole('button', { name: '이 학생으로' }).click();
  await goHash(page, '#/home');
  await expect(card(page)).toHaveCount(0);
});

test('예전 기록처럼 만든 날만 있고 그 값이 가정교사가 나오기 전이면(알 수 없음) 묻지 않는다', async ({ page }) => {
  await at(page, 2027, 3, 2);
  await open(page, { student: student('m2', 'mid', { created: 1 }), url: '/#/home' });
  await expect(page.locator('.page-title')).toBeVisible();
  await expect(card(page)).toHaveCount(0);
});

test('이번 학년도에 학년을 직접 바꾸었으면 묻지 않는다', async ({ page }) => {
  await at(page, 2027, 3, 2);
  await open(page, { student: student('m2', 'mid'), url: '/#/setup/mid/m3?change=1' });
  await waitReady(page);
  await expect(page).toHaveURL(/#\/home$/);
  await expect(card(page)).toHaveCount(0);
  const p = (await readStore(page, 'profiles'))[0];
  expect(p).toMatchObject({ grade: 'm3', gradeAt: new Date(2027, 2, 2, 10).getTime() });
});
