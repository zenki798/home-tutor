const { test, expect } = require('@playwright/test');
const { open, collectErrors, waitReady, goHash, STUDENT, STUDENT_B } = require('./helpers');

/*
 * 교육과정 소식 — 국가교육위원회가 교육과정을 고치면 scripts/curriculum-watch.js 가 고시문을 자동으로 읽어
 * 카탈로그의 notices 에 싣고(사람·AI 없이), 가정교사가 그 과목·학년 학생에게 알려 준다.
 * 이 기기의 오늘 날짜로 "바뀌어요(앞으로)"·"바뀌었어요(이미)"를 고른다 → 시계를 고정해 시험한다.
 */
const NOTICES = [
  {
    id: 'nec-2024-3', no: '국가교육위원회 고시 제2024-3호', date: '2024-08-16', url: 'https://www.ne.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1016&q_bbsDocNo=1',
    volumes: ['총론', '사회과', '영어과'],
    effective: [{ date: '2025-03-01', grades: ['e1', 'e2', 'e3', 'e4', 'm1', 'h1'] }, { date: '2026-03-01', grades: ['e5', 'e6', 'm2', 'h2'] }],
    parts: [{ name: '영어과', subjects: ['eng'], courses: [], except: [] }],
  },
  {
    id: 'nec-2027-9', no: '국가교육위원회 고시 제2027-9호', date: '2027-02-01', url: 'https://www.ne.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1016&q_bbsDocNo=2',
    volumes: ['과학과'],
    effective: [{ date: '2028-03-01', grades: ['e5', 'e6'] }],
    parts: [{ name: '과학과', subjects: ['sci'], courses: [], except: [], newSubjects: ['우주와 생명'], related: ['sci-e5-01'] }],
  },
];
const PATCH = { notices: NOTICES, basis: '교육부 고시 제2022-33호' };

test('이미 시행된 개정: 영어 과정에 "바뀌었어요"와 이 학생 학년(중2)의 시행일, 자세히에 고시·바탕·원문', async ({ page }) => {
  const errors = collectErrors(page);
  await page.clock.setFixedTime(new Date('2026-10-05T09:00:00'));
  const calls = await open(page, { student: STUDENT, url: '/#/course/eng-m', catalogPatch: PATCH });
  const box = page.locator('.cur-news');
  await expect(box).toHaveCount(1);
  await expect(box.locator('.cur-news-title')).toContainText('교육과정 소식');
  await expect(box.locator('.cur-line')).toHaveText('영어과 교육과정이 일부 바뀌었어요. 2026년 3월부터 바뀐 교육과정으로 배워요.');
  await expect(box.locator('.cur-new')).toHaveCount(0);
  await box.locator('summary').click();
  await expect(box.locator('.cur-more')).toContainText('국가교육위원회 고시 제2024-3호 (2024년 8월 16일)');
  await expect(box.locator('.cur-more')).toContainText('2022 개정 교육과정을 바탕으로 만들었어요(교육부 고시 제2022-33호)');
  const link = box.locator('.cur-more a');
  await expect(link).toHaveAttribute('href', NOTICES[0].url);
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', /noopener/);
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]); // 링크는 누를 때만 — 페이지가 바깥에 요청하지 않는다
});

test('앞으로 시행될 개정: 초5 과학에 "바뀌어요", 새로 생기는 과목과 지금 미리 볼 단원 링크', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-10-05T09:00:00'));
  await open(page, { student: STUDENT_B, url: '/#/course/sci-e5', catalogPatch: PATCH });
  const box = page.locator('.cur-news');
  await expect(box.locator('.cur-line')).toHaveText('2028년 3월부터 과학과 교육과정(배우는 내용)이 바뀌어요.');
  await expect(box.locator('.cur-new')).toHaveText('🌱 새로 생기는 과목: ‘우주와 생명’');
  const rel = box.locator('.cur-rel a');
  await expect(rel).toHaveText('물질의 용해');
  await rel.click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/unit\/sci-e5-01\/learn$/);
});

test('시행일이 지나면 같은 고시도 저절로 "바뀌었어요"로 바뀐다 (이 기기의 날짜)', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2028-04-01T09:00:00'));
  await open(page, { student: STUDENT_B, url: '/#/course/sci-e5', catalogPatch: PATCH });
  await expect(page.locator('.cur-news .cur-line')).toHaveText('과학과 교육과정(배우는 내용)이 조금 바뀌었어요. 2028년 3월부터 바뀐 교육과정으로 배워요.');
});

test('관계없는 과목·학년에는 소식이 없고, 고시가 없으면 아무것도 그리지 않는다', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-10-05T09:00:00'));
  await open(page, { student: STUDENT, url: '/#/course/math-m2', catalogPatch: PATCH });
  await expect(page.locator('.page-title')).toHaveText('중학교 수학 2');
  await expect(page.locator('.cur-news')).toHaveCount(0);
  await goHash(page, '#/course/eng-m');
  await expect(page.locator('.cur-news')).toHaveCount(1);
  // 고시 기록이 없는 카탈로그(지금까지와 같음)
  const page2 = await page.context().newPage();
  await open(page2, { student: STUDENT, url: '/#/course/eng-m' });
  await expect(page2.locator('.page-title')).toBeVisible();
  await expect(page2.locator('.cur-news')).toHaveCount(0);
});

test('설정 > 가정교사 정보: 기준 고시와 그 뒤 고시 목록(바뀐 별책·원문)', async ({ page }) => {
  await open(page, { student: STUDENT, url: '/#/settings', catalogPatch: PATCH });
  const info = page.locator('.set-sec', { has: page.locator('#setInfo') });
  await expect(info).toContainText('2022 개정 교육과정(교육부 고시 제2022-33호)을 참고해 새로 쓴 것');
  const items = info.locator('.cur-info li');
  await expect(items).toHaveCount(2);
  await expect(items.nth(0)).toContainText('국가교육위원회 고시 제2024-3호 (2024년 8월 16일) — 총론, 사회과, 영어과');
  await expect(items.nth(1).locator('a')).toHaveAttribute('href', NOTICES[1].url);
});
