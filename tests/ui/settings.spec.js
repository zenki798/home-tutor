const { test, expect } = require('@playwright/test');
const { open, collectErrors, waitReady, readStore, goHash, STUDENT, STUDENT_B } = require('./helpers');

/*
 * 학생(프로필) 여러 명 — 진도가 섞이지 않는다. 설정: 글자 크기·테마(유지), 학생 관리, 기록 지우기(확인 창), 정보.
 */

test('학생 두 명: 진도가 따로 기록된다', async ({ page }) => {
  const errors = collectErrors(page);
  await open(page, { student: [STUDENT, STUDENT_B], url: '/#/unit/math-m2-01/learn' });
  await page.getByRole('button', { name: '다음 ›' }).click();
  await expect(page.locator('#cvCount')).toHaveText('카드 2 / 4');

  // 학생 칩 → 누가 공부하나요? → 별빛
  await page.locator('#studentChip').click();
  await waitReady(page);
  await page.locator('.profile-card', { hasText: '별빛' }).click();
  await waitReady(page);
  await expect(page.locator('#studentChip')).toContainText('초5');
  await page.locator('.teacher-card').first().click();
  await waitReady(page);
  await page.locator('.unit-row').first().click();
  await waitReady(page);
  await expect(page.locator('.page-title')).toHaveText('물질의 용해');

  const a = await readStore(page, 'p.p-test-a.progress');
  const b = await readStore(page, 'p.p-test-b.progress');
  expect(Object.keys(a)).toEqual(['math-m2-01']);
  expect(a['math-m2-01'].seen).toEqual([0, 1]);
  expect(Object.keys(b)).toEqual(['sci-e5-01']);
  expect(b['sci-e5-01'].seen).toEqual([0]);

  // 다시 테스트로 바꾸면 그 학생의 진도가 보인다
  await goHash(page, '#/settings');
  await page.locator('.student-row', { hasText: '테스트' }).getByRole('button', { name: '이 학생으로' }).click();
  await waitReady(page);
  await goHash(page, '#/course/math-m2');
  await expect(page.locator('.unit-row').first()).toContainText('공부 중');
  await expect(page.locator('.unit-row').first()).toContainText('개념 2/4');
  await goHash(page, '#/stats');
  await expect(page.locator('.course-stat', { hasText: '중학교 수학 2' })).toContainText('개념 카드 2/4장');
  expect(errors).toEqual([]);
});

test('글자 크기: 바로 적용되고 다시 열어도 유지된다', async ({ page }) => {
  await open(page, { student: true, url: '/#/settings' });
  const font = page.locator('.set-sec', { hasText: '글자 크기' });
  const rootSize = () => page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize));
  expect(await rootSize()).toBe(16);
  await font.getByRole('radio', { name: '아주 크게' }).check();
  await expect(page.locator('html')).toHaveAttribute('data-font', '3');
  expect(await rootSize()).toBeCloseTo(20.8, 1);
  expect((await readStore(page, 'settings')).fontScale).toBe(3);
  await page.reload();
  await waitReady(page);
  await expect(page.locator('html')).toHaveAttribute('data-font', '3');
  await expect(font.getByRole('radio', { name: '아주 크게' })).toBeChecked();
  await font.getByRole('radio', { name: '크게', exact: true }).check();
  expect(await rootSize()).toBeCloseTo(18.4, 1);
  await font.getByRole('radio', { name: '보통', exact: true }).check();
  expect(await rootSize()).toBe(16);
});

test('테마: 어둡게·밝게·자동 (다시 열어도 유지)', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await open(page, { student: true, url: '/#/settings' });
  const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(await bg()).toBe('rgb(247, 244, 238)');
  await page.getByRole('radio', { name: '어둡게' }).check();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await bg()).toBe('rgb(20, 22, 27)');
  await expect(page.locator('meta[name="theme-color"]').first()).toHaveAttribute('content', '#14161b');
  await page.reload();
  await waitReady(page);
  expect(await bg()).toBe('rgb(20, 22, 27)');
  await page.getByRole('radio', { name: '자동' }).check();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', /.*/);
  expect(await bg()).toBe('rgb(247, 244, 238)');
  // 자동이면 기기 설정을 따른다
  await page.emulateMedia({ colorScheme: 'dark' });
  expect(await bg()).toBe('rgb(20, 22, 27)');
  await page.getByRole('radio', { name: '밝게' }).check();
  expect(await bg()).toBe('rgb(247, 244, 238)');
});

test('이 학생 기록 지우기: 확인 창에서 취소하면 그대로, 지우기를 누르면 지운다', async ({ page }) => {
  const storage = {
    'tutor.p.p-test-a.progress': { 'math-m2-01': { seen: [0, 1], cards: 4, solved: 3, correct: 2, best: 66, last: 1 } },
    'tutor.p.p-test-a.notes': [{ key: 'math-m2-01#p6', unit: 'math-m2-01', given: 'O', at: 1, wrongCount: 1, rightStreak: 0, problem: { type: 'ox', q: '문제', answer: false, explain: '해설' } }],
    'tutor.p.p-test-a.recent': ['math-m2-01'],
  };
  await open(page, { student: true, storage, url: '/#/settings' });
  await page.getByRole('button', { name: '이 학생 기록 지우기' }).click();
  const dlg = page.getByRole('dialog');
  await expect(dlg).toBeVisible();
  await expect(dlg).toContainText('기록을 지울까요?');
  await expect(dlg.getByRole('button', { name: '취소' })).toBeFocused();
  await dlg.getByRole('button', { name: '취소' }).click();
  await expect(dlg).toHaveCount(0);
  expect(await readStore(page, 'p.p-test-a.progress')).not.toBeNull();

  // Esc 로도 닫힌다
  await page.getByRole('button', { name: '이 학생 기록 지우기' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('button', { name: '이 학생 기록 지우기' })).toBeFocused();

  await page.getByRole('button', { name: '이 학생 기록 지우기' }).click();
  await page.getByRole('dialog').getByRole('button', { name: '지우기' }).click();
  await expect(page.locator('.set-msg')).toHaveText('기록을 지웠어요.');
  expect(await readStore(page, 'p.p-test-a.progress')).toBeNull();
  expect(await readStore(page, 'p.p-test-a.notes')).toBeNull();
  expect(await readStore(page, 'p.p-test-a.recent')).toBeNull();
  expect(await readStore(page, 'profiles')).toHaveLength(1); // 학생은 남는다
});

test('공부 수준: 설정에서 바꾸면 바로 쓰인다 (기초 다지기 → 쉬운 설명 먼저)', async ({ page }) => {
  await open(page, { student: true, url: '/#/settings' });
  const sec = page.locator('.set-sec', { hasText: '공부 수준' });
  await expect(sec.getByRole('radio', { name: /보통/ })).toBeChecked();
  await sec.getByRole('radio', { name: /기초 다지기/ }).check();
  expect((await readStore(page, 'profiles'))[0].pace).toBe('easy');
  await expect(page.locator('.student-row').first().locator('.p-meta')).toContainText('기초 다지기');
  await page.goto('/#/unit/math-m2-01/learn');
  await waitReady(page);
  await expect(page.locator('.concept-card:visible .easy-first')).toBeVisible();
});

test('학생 관리: 이름·동물 바꾸기, 추가, 삭제', async ({ page }) => {
  await open(page, { student: [STUDENT, STUDENT_B], url: '/#/settings' });
  const rows = page.locator('.student-row');
  await expect(rows).toHaveCount(2);
  await expect(rows.first()).toContainText('지금 공부 중');
  await expect(rows.nth(1)).toContainText('기초 다지기');

  await rows.first().getByRole('button', { name: '이름·동물 바꾸기' }).click();
  await rows.first().getByLabel('새 별명').fill('새이름');
  await rows.first().getByRole('radio', { name: '사자' }).check();
  await rows.first().getByRole('button', { name: '저장' }).click();
  await waitReady(page);
  await expect(page.locator('#studentChip')).toHaveAttribute('aria-label', /새이름/);
  await expect(page.locator('#studentChip .chip-avatar')).toHaveText('🦁');
  expect((await readStore(page, 'profiles'))[0]).toMatchObject({ name: '새이름', avatar: '🦁' });

  await page.locator('.student-row', { hasText: '별빛' }).getByRole('button', { name: '삭제' }).click();
  await expect(page.getByRole('dialog')).toContainText('별빛');
  await page.getByRole('dialog').getByRole('button', { name: '지우기' }).click();
  await waitReady(page);
  await expect(page.locator('.student-row')).toHaveCount(1);

  await page.getByRole('link', { name: '＋ 학생 추가' }).click();
  await waitReady(page);
  await page.getByRole('link', { name: /고등학교/ }).click();
  await waitReady(page);
  await page.getByRole('link', { name: '1학년' }).click();
  await waitReady(page);
  await page.getByLabel(/별명/).fill('셋째');
  await page.getByRole('button', { name: '시작하기' }).click();
  await waitReady(page);
  const profiles = await readStore(page, 'profiles');
  expect(profiles.map((p) => p.name)).toEqual(['새이름', '셋째']);
  expect(await readStore(page, 'current')).toBe(profiles[1].id);
  await expect(page.locator('#studentChip')).toContainText('고1');
});

test('마지막 학생을 지우면 처음 설정으로 돌아간다', async ({ page }) => {
  await open(page, { student: true, url: '/#/settings' });
  await page.locator('.student-row').getByRole('button', { name: '삭제' }).click();
  await page.getByRole('dialog').getByRole('button', { name: '지우기' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/setup$/);
  expect(await readStore(page, 'profiles')).toEqual([]);
});

test('정보: AI·서버 없음, 교육과정 안내, 틀린 곳 알려 주기(새 창 링크)', async ({ page }) => {
  await open(page, { student: true, url: '/#/settings' });
  const info = page.locator('.set-sec', { hasText: '가정교사 정보' });
  await expect(info).toContainText('AI·서버 없이 이 기기 안에서만 동작해요');
  await expect(info).toContainText('2022 개정 교육과정을 참고해 새로 쓴 것이며, 교과서를 대신하지 않아요');
  const link = info.getByRole('link', { name: /GitHub 저장소에 알려 주기/ });
  await expect(link).toHaveAttribute('href', 'https://github.com/zenki798/home-tutor/issues');
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', /noopener/);
  await expect(page.locator('.set-sec', { hasText: '앱으로 설치하기' })).toContainText('홈 화면에 추가');
});

test('기록 화면: 숫자로만(연속 공부·공부한 날·푼 문제·정답률), 최근 단원', async ({ page }) => {
  const d = new Date();
  const day = (k) => { const x = new Date(d); x.setDate(x.getDate() - k); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
  const storage = {
    'tutor.p.p-test-a.progress': {
      'math-m2-01': { seen: [0, 1, 2, 3], cards: 4, solved: 10, correct: 8, best: 80, last: Date.now() },
      'math-m2-02': { seen: [0], cards: 2, solved: 0, correct: 0, best: 0, last: Date.now() },
    },
    'tutor.p.p-test-a.days': [day(5), day(2), day(1), day(0)],
    'tutor.p.p-test-a.recent': ['math-m2-02', 'math-m2-01'],
  };
  await open(page, { student: true, storage, url: '/#/stats' });
  const tiles = page.locator('.tile');
  await expect(tiles.nth(0)).toContainText('연속 공부');
  await expect(tiles.nth(0)).toContainText('3일');
  await expect(tiles.nth(1)).toContainText('4일');
  await expect(tiles.nth(2)).toContainText('10개');
  await expect(tiles.nth(3)).toContainText('80%');
  const math = page.locator('.course-stat', { hasText: '중학교 수학 2' });
  await expect(math).toContainText('진도 75%'); // (4/4 + 1/2) / 2 단원
  await expect(math).toContainText('단원 2/2개 공부');
  await expect(math).toContainText('개념 카드 5/6장');
  await expect(math).toContainText('정답률 80%');
  await expect(page.locator('.recent-list li a')).toHaveText(['연립일차방정식', '일차부등식']);
  await expect(page.locator('.page')).not.toContainText('순위');
});
