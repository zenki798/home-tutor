const { test, expect } = require('@playwright/test');
const { open, collectErrors, waitReady, readStore, STUDENT, STUDENT_B } = require('./helpers');

/*
 * 처음 쓰는 사람: 학교급 → 학년 → 별명 → 과목(선생님) 카드.
 * 다시 온 사람: "누가 공부하나요?" 에서 고른다. 학년 바꾸기, 다른 학년 과목 보기.
 */

test('첫 방문: 학교급 → 학년 → 별명을 고르면 그 학년의 선생님 카드가 나온다', async ({ page }) => {
  const errors = collectErrors(page);
  const calls = await open(page);

  await expect(page).toHaveURL(/#\/setup$/);
  await expect(page.locator('.bubble-text')).toContainText('학교급과 학년을 알려 주세요');
  const levels = page.locator('.level-card');
  await expect(levels).toHaveCount(5);
  await expect(levels.nth(0)).toContainText('초등학교');
  await expect(levels.nth(4)).toContainText('성인');
  await expect(page.locator('.steps-bar [aria-current="step"]')).toContainText('학교급');

  await page.getByRole('link', { name: /중학교/ }).click();
  await waitReady(page);
  await expect(page.locator('.page-title')).toHaveText('중학교 몇 학년인가요?');
  await expect(page.locator('.grade-btn')).toHaveCount(3);
  await page.getByRole('link', { name: '2학년' }).click();
  await waitReady(page);

  await expect(page.locator('.nick-chosen')).toContainText('중학교 2학년');
  await expect(page.locator('#nickHelp')).toContainText('이 기기에만 저장되고');
  await page.getByLabel(/별명/).fill('테스트');
  // 나를 나타낼 동물과 공부 수준(기초 다지기·보통·도전)
  await expect(page.locator('.avatar-opt')).toHaveCount(12);
  await page.getByRole('radio', { name: '펭귄' }).check();
  await expect(page.getByRole('radio', { name: /보통/ })).toBeChecked(); // 기본은 보통
  await page.getByRole('radio', { name: /도전/ }).check();
  await page.getByRole('button', { name: '시작하기' }).click();
  await waitReady(page);

  await expect(page).toHaveURL(/#\/home$/);
  await expect(page.locator('.page-title')).toHaveText('중학교 2학년 과목');
  const cards = page.locator('.teacher-card');
  await expect(cards).toHaveCount(2);
  await expect(cards.nth(0)).toContainText('수학 선생님');
  await expect(cards.nth(0)).toContainText('중학교 수학 2');
  await expect(cards.nth(0)).toHaveClass(/subj-math/);
  await expect(cards.nth(1)).toContainText('영어 선생님');
  await expect(page.locator('.bubble-text')).toContainText('테스트 학생, 안녕하세요');
  await expect(page.locator('#studentChip')).toContainText('중2');
  await expect(page.locator('#studentChip .chip-avatar')).toHaveText('🐧');

  const profiles = await readStore(page, 'profiles');
  expect(profiles).toHaveLength(1);
  expect(profiles[0]).toMatchObject({ name: '테스트', avatar: '🐧', level: 'mid', grade: 'm2', pace: 'hard' });
  expect(await readStore(page, 'current')).toBe(profiles[0].id);

  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('별명은 비워 둬도 되고, 학년이 하나뿐인 학교급(대학교)은 학년 단계를 건너뛴다', async ({ page }) => {
  await open(page, { url: '/#/setup' });
  await page.getByRole('link', { name: /대학교/ }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/setup\/univ\/u$/);
  await expect(page.locator('.steps-bar [aria-current="step"]')).toContainText('나에 대해');
  await page.getByRole('button', { name: '시작하기' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/home$/);
  await expect(page.locator('.state-box')).toContainText('아직 준비 중');
  const profiles = await readStore(page, 'profiles');
  expect(profiles[0]).toMatchObject({ name: '', avatar: '🐶', level: 'univ', grade: 'u', pace: 'normal' });
  await expect(page.locator('.bubble-text')).toContainText('안녕하세요');
});

test('다시 오면 "누가 공부하나요?" 에서 학생을 고른다', async ({ page }) => {
  await open(page, { student: [STUDENT, STUDENT_B] });
  await expect(page.locator('.page-title')).toHaveText('누가 공부하나요?');
  const cards = page.locator('.profile-card');
  await expect(cards).toHaveCount(2);
  await expect(cards.nth(0)).toContainText('테스트');
  await expect(cards.nth(0)).toContainText('중학교 2학년');
  await expect(cards.nth(0)).toContainText('지난번');
  await cards.nth(1).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/home$/);
  await expect(page.locator('.page-title')).toHaveText('초등학교 5학년 과목');
  await expect(page.locator('.teacher-card')).toHaveCount(1);
  await expect(page.locator('.teacher-card')).toContainText('과학 선생님');
  // 초등학생에게는 쉬운 해요체
  await expect(page.locator('.bubble-text')).toContainText('별빛 친구, 안녕하세요! 오늘은 어떤 과목을 공부해 볼까요?');
  expect(await readStore(page, 'current')).toBe(STUDENT_B.id);
});

test('학년 바꾸기: 학교급·학년만 다시 고르고 같은 학생으로 이어진다', async ({ page }) => {
  await open(page, { student: true, url: '/#/home' });
  await page.getByRole('link', { name: '학년 바꾸기' }).click();
  await waitReady(page);
  await expect(page.locator('.page-title')).toHaveText('중학교 몇 학년인가요?');
  await page.getByRole('link', { name: '학교급 다시 고르기' }).click();
  await waitReady(page);
  await page.getByRole('link', { name: /초등학교/ }).click();
  await waitReady(page);
  await page.getByRole('link', { name: '5학년' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/home$/);
  await expect(page.locator('.teacher-card')).toContainText('초등 과학 5');
  const profiles = await readStore(page, 'profiles');
  expect(profiles).toHaveLength(1);
  expect(profiles[0]).toMatchObject({ id: STUDENT.id, name: '테스트', level: 'elem', grade: 'e5' });
});

test('다른 학년 과목도 보기: 같은 학교급의 과목을 학년별로 묶어 보여 준다', async ({ page }) => {
  await open(page, { student: true, url: '/#/home' });
  await page.getByRole('link', { name: '다른 학년 과목도 보기' }).click();
  await waitReady(page);
  await expect(page.locator('.page-title')).toHaveText('중학교 전체 과목');
  const groups = page.locator('.group-title');
  await expect(groups).toHaveText(['중학교 1학년', '중학교 2학년']);
  await expect(page.locator('.teacher-card')).toHaveCount(2); // 1~3학년 공통 영어는 한 번만
  await page.getByRole('link', { name: '내 학년 과목만 보기' }).click();
  await waitReady(page);
  await expect(page.locator('.page-title')).toHaveText('중학교 2학년 과목');
});

test('학생이 없을 때 단원 주소로 바로 들어오면, 설정을 마친 뒤 그 단원으로 간다', async ({ page }) => {
  await open(page, { url: '/#/unit/math-m2-01/learn' });
  await expect(page).toHaveURL(/#\/setup$/);
  await page.getByRole('link', { name: /중학교/ }).click();
  await waitReady(page);
  await page.getByRole('link', { name: '2학년' }).click();
  await waitReady(page);
  await page.getByRole('button', { name: '시작하기' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/unit\/math-m2-01\/learn$/);
  await expect(page.locator('.page-title')).toHaveText('일차부등식');
});
