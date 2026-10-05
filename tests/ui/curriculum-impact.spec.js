const { test, expect } = require('@playwright/test');
const { open, collectErrors, goHash, STUDENT, STUDENT_B } = require('./helpers');

/*
 * 교육과정 변경 — 별책 성취기준 비교 결과를 화면에 (curriculum-watch → notices.json analysis → 카탈로그 parts[].status·changes)
 *   applied(자동 반영): 바뀐 성취기준과 관련 단원, 지금 바뀐 내용으로 배우는 단원에 '개정 반영 중'
 *   manual: "교육과정 변경 감지 - 수동 확인 필요" — 기존 자료를 그대로 둔다고 알린다
 *   설정: 이 기기의 학생마다 지금·앞으로 다닐 학년에 실제로 닿는 변경만(기기 안 계산, 밖으로 보내지 않음)
 * 시험 학생: 테스트(중2) · 별빛(초5) — 지어낸 이름. 날짜는 시계를 고정한다.
 */
const MANUAL = '교육과정 변경 감지 - 수동 확인 필요';
const NOTICES = [
  {
    id: 'nec-2024-3', no: '국가교육위원회 고시 제2024-3호', date: '2024-08-16', url: 'https://www.ne.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1016&q_bbsDocNo=1',
    volumes: ['영어과'], effective: [{ date: '2025-03-01', grades: ['m1'] }, { date: '2026-03-01', grades: ['m2'] }, { date: '2027-03-01', grades: ['m3'] }],
    parts: [{ name: '영어과', subjects: ['eng'], courses: [], except: [], status: 'unchanged' }],
  },
  {
    id: 'nec-2026-1', no: '국가교육위원회 고시 제2026-1호', date: '2026-01-21', url: 'https://www.ne.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1016&q_bbsDocNo=2',
    volumes: ['과학과'], effective: [{ date: '2026-03-01', grades: ['e5', 'e6'] }],
    parts: [{ name: '과학과', subjects: ['sci'], courses: [], except: [], status: 'manual' }],
  },
  {
    id: 'nec-2027-2', no: '국가교육위원회 고시 제2027-2호', date: '2026-09-10', url: 'https://www.ne.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1016&q_bbsDocNo=3',
    volumes: ['수학과'], effective: [{ date: '2027-03-01', grades: ['m1', 'm2'] }, { date: '2028-03-01', grades: ['m3', 'e5', 'e6'] }],
    parts: [{
      name: '수학과', subjects: ['math'], courses: [], except: [], status: 'applied',
      changes: [
        { k: 'chg', code: '[9수01-02]', from: '옛 성취기준 문장이다.', to: '새로 고친 성취기준 문장이다.', courses: ['math-m2'], units: ['math-m2-01'] },
        { k: 'add', code: '[9수01-09]', text: '새로 생긴 성취기준이다.', courses: ['math-m2'] },
      ],
    }],
  },
];
const PATCH = { notices: NOTICES, basis: '교육부 고시 제2022-33호' };

test('수동 확인 필요: 초5 과학에 그 표시와 "기존 자료 그대로"를 알린다', async ({ page }) => {
  const errors = collectErrors(page);
  await page.clock.setFixedTime(new Date('2026-10-05T09:00:00'));
  const calls = await open(page, { student: STUDENT_B, url: '/#/course/sci-e5', catalogPatch: PATCH });
  const box = page.locator('.cur-news');
  await expect(box.locator('.cur-manual')).toHaveText(MANUAL);
  await expect(box.locator('.cur-status.is-manual')).toContainText('예전 교육과정 그대로 두었어요');
  await expect(page.locator('.rev-badge')).toHaveCount(0);
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('자동 반영: 바뀐 성취기준 목록과 관련 단원, 시행 전에는 단원에 "개정 반영 중"을 붙이지 않는다', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-10-05T09:00:00'));
  await open(page, { student: STUDENT, url: '/#/course/math-m2', catalogPatch: PATCH });
  const box = page.locator('.cur-news');
  await expect(box.locator('.cur-line')).toHaveText('2027년 3월부터 수학과 교육과정이 바뀌어요.');
  await expect(box.locator('.cur-status.is-applied')).toHaveText('✅ 바뀐 성취기준 2개를 공식 문서에서 확인했어요.');
  await box.locator('.cur-chg summary').click();
  const items = box.locator('.chg-list li');
  await expect(items).toHaveCount(2);
  await expect(items.nth(0)).toContainText('[9수01-02] 새로 고친 성취기준 문장이다.(바뀌기 전: 옛 성취기준 문장이다.)');
  await expect(items.nth(0).locator('.chg-units a')).toHaveAttribute('href', '#/unit/math-m2-01/learn');
  await expect(items.nth(1)).toContainText('[9수01-09] 새로 생김 새로 생긴 성취기준이다.');
  await expect(page.locator('.unit-row[data-unit="math-m2-01"] .rev-badge')).toHaveCount(0);
});

test('시행일이 지나면: 그 단원에 "개정 반영 중", 단원 머리에 바뀐 성취기준(바뀌기 전 문장과 함께)', async ({ page }) => {
  const errors = collectErrors(page);
  await page.clock.setFixedTime(new Date('2027-04-01T09:00:00'));
  await open(page, { student: STUDENT, url: '/#/course/math-m2', catalogPatch: PATCH });
  await expect(page.locator('.unit-row[data-unit="math-m2-01"] .rev-badge')).toHaveText('개정 반영 중');
  await expect(page.locator('.unit-row[data-unit="math-m2-02"] .rev-badge')).toHaveCount(0);
  await goHash(page, '#/unit/math-m2-01/learn');
  const note = page.locator('.cur-unit');
  await expect(note).toContainText('이 단원의 성취기준이 바뀌었어요.');
  await expect(note.locator('.chg-to')).toHaveText('새로 고친 성취기준 문장이다.');
  await expect(note.locator('.chg-from')).toHaveText('(바뀌기 전: 옛 성취기준 문장이다.)');
  await expect(note).toContainText('국가교육위원회 고시 제2027-2호');
  await goHash(page, '#/unit/math-m2-02/learn');
  await expect(page.locator('.cur-unit')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('성취기준 변화 없음: 영어(중2)에 "성취기준은 그대로"', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-10-05T09:00:00'));
  await open(page, { student: STUDENT, url: '/#/course/eng-m', catalogPatch: PATCH });
  await expect(page.locator('.cur-news .cur-status')).toHaveText('이 과목의 성취기준은 그대로예요.');
  await expect(page.locator('.cur-news .cur-manual')).toHaveCount(0);
});

test('설정: 학생마다 지금·앞으로 다닐 학년에 실제로 닿는 변경만(지금/몇 년 몇 월, 반영됨/수동 확인), 기기 안 계산 안내', async ({ page }) => {
  const errors = collectErrors(page);
  await page.clock.setFixedTime(new Date('2026-10-05T09:00:00'));
  const calls = await open(page, { student: [STUDENT, STUDENT_B], url: '/#/settings', catalogPatch: PATCH });
  const sec = page.locator('.set-sec', { has: page.locator('#setCurImpact') });
  await expect(sec.locator('h3')).toHaveText('교육과정 변경과 우리 학생');
  await expect(sec).toContainText('계산은 이 기기 안에서만 하고, 이름·학년·기록은 밖으로 보내지 않아요');
  const studs = sec.locator('.imp-student');
  await expect(studs).toHaveCount(2);
  // 테스트(중2): 수학 변경은 2027년 중2 부터라 이미 지나고, 과학(초5)은 지난 학년 → 닿는 것 없음
  await expect(studs.nth(0).locator('.imp-name')).toContainText('테스트');
  await expect(studs.nth(0)).toContainText('지금 학년과 앞으로 다닐 학년에 닿는 교육과정 변경은 없어요.');
  // 별빛(초5): 과학은 지금(초5)부터 수동 확인 필요, 수학은 2029년 중2 때 바뀐 성취기준(자동 반영)으로
  const items = studs.nth(1).locator('.imp-item');
  await expect(items).toHaveCount(2);
  await expect(items.nth(0).locator('.imp-when')).toHaveText('지금 학년(초5)부터');
  await expect(items.nth(0).locator('.cur-manual')).toHaveText(MANUAL);
  await expect(items.nth(0)).toContainText('과학과 교육과정');
  await expect(items.nth(1).locator('.imp-when')).toHaveText('2029년 3월(중2)부터');
  await expect(items.nth(1)).toContainText('성취기준 2개 바뀜(자동 반영)');
  await expect(items.nth(1).locator('.imp-courses')).toHaveText('배우게 될 과목: 중학교 수학 2');
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('영향 계산 파일(js/impact.js)이 없어도 화면은 그대로 뜨고, 그 안내만 빠진다', async ({ page }) => {
  const errors = collectErrors(page);
  await page.clock.setFixedTime(new Date('2027-04-01T09:00:00'));
  await open(page, { student: [STUDENT, STUDENT_B], url: '/#/course/math-m2', catalogPatch: PATCH, blockScripts: ['js/impact.js'] });
  await expect(page.locator('.cur-news .cur-status.is-applied')).toBeVisible();
  await expect(page.locator('.rev-badge')).toHaveCount(0);
  await goHash(page, '#/settings');
  await expect(page.locator('#setInfo')).toBeVisible();
  await expect(page.locator('#setCurImpact')).toHaveCount(0);
  expect(errors.filter((e) => !/Failed to load resource/.test(e))).toEqual([]); // 일부러 막은 파일의 404 만
});
