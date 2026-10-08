const { test, expect } = require('@playwright/test');
const { open, goHash, readIDB, STUDENT } = require('./helpers');

/*
 * 기록 저장 문제 (docs/ARCHITECTURE.md §9.6 — 1순위 데이터 보호): 이 기기에 기록을 쓰지 못하면(저장 공간 부족 등)
 * 화면 위에 알리고, 기록은 메모리에 그대로 두었다가 다시 쓸 수 있게 되면 저장하고 알림을 거둔다.
 * 저장소의 쓰기를 시험 안에서 막아 "저장 공간이 가득 찬 기기"를 흉내 낸다.
 */

// 이 기기 저장소(IndexedDB)의 쓰기를 막는다 / 되살린다
const blockWrites = (page) => page.evaluate(() => {
  const prov = Tutor.store._provider();
  window.__realWrite = prov.write;
  prov.write = () => Promise.reject(Object.assign(new Error('저장 공간이 가득 찼어요'), { name: 'QuotaExceededError' }));
});
const unblockWrites = (page) => page.evaluate(() => { Tutor.store._provider().write = window.__realWrite; });

test('저장 공간이 부족해 기록을 쓰지 못하면 알리고, 공간이 생겨 다시 저장하면 알림을 거둔다 (기록은 그대로 남는다)', async ({ page }) => {
  await open(page, { student: true, url: '/#/home' });
  const bar = page.locator('#save-problem');
  await expect(bar).toBeHidden();
  await blockWrites(page);
  await goHash(page, '#/unit/math-m2-01/learn'); // 단원을 열면 최근 단원을 기록한다
  await expect(bar).toBeVisible();
  await expect(bar).toContainText('학습 기록을 이 기기에 저장하지 못하고 있어요');
  await expect(bar).toContainText('저장 공간이 부족해요');
  await expect(bar.getByRole('link', { name: '설정' })).toHaveAttribute('href', '#/settings');
  // 화면은 그대로 쓸 수 있고, 다른 화면으로 가도 알림은 남는다
  await expect(page.locator('.unit-tabs')).toBeVisible();
  await goHash(page, '#/home');
  await expect(bar).toBeVisible();
  // 공간을 비운 뒤 '지금 다시 저장하기'
  await unblockWrites(page);
  await bar.getByRole('button', { name: '지금 다시 저장하기' }).click();
  await expect(bar).toBeHidden();
  const idb = await readIDB(page);
  expect(idb['p.' + STUDENT.id + '.recent']).toContain('math-m2-01');
});

test('단추를 누르지 않아도 다시 쓸 수 있게 되면 저절로 저장하고 알림을 거둔다', async ({ page }) => {
  await open(page, { student: true, url: '/#/home' });
  const bar = page.locator('#save-problem');
  await blockWrites(page);
  await goHash(page, '#/unit/math-m2-01/learn');
  await expect(bar).toBeVisible();
  await unblockWrites(page);
  await expect(bar).toBeHidden({ timeout: 20000 }); // 2초 → 4초 → … 뒤 다시 쓴다
  const idb = await readIDB(page);
  expect(idb['p.' + STUDENT.id + '.recent']).toContain('math-m2-01');
});
