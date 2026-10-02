const { test, expect } = require('@playwright/test');
const { open, collectErrors, waitReady, goHash, readStore, flushStore, readIDB, readLocal } = require('./helpers');
const TS = require('../../js/storage.js');

/*
 * 학생 PIN (ARCHITECTURE §9.4): 설정에서 걸기·바꾸기·풀기(숫자 4~8자리, 두 번 입력). PIN은 해시만 저장한다.
 * PIN이 걸린 학생으로 바꾸거나 앱을 다시 열 때 그 학생이 지금 학생이면, PIN을 맞혀야 그 학생의 화면·기록을 보여 준다.
 * 틀리면 다시, [PIN을 잊었어요] → 백업에서 되살리기 / 지우고 새로 시작(두 번 확인). 잠긴 학생의 기록은 다른 학생 화면에 나오지 않는다.
 * 시험 학생은 가상의 이름(민수·지아), PIN은 시험용 가짜.
 */

const MINSU = { id: 'p-minsu', name: '민수', avatar: '🐻', level: 'mid', grade: 'm2', pace: 'normal', created: 1 };
const JIA = { id: 'p-jia', name: '지아', avatar: '🐰', level: 'mid', grade: 'm2', pace: 'easy', created: 2 };
const PIN = '2468';

let LOCK = null;
test.beforeAll(async () => { LOCK = await TS.hashPin(PIN, 1000); }); // 시험은 반복 횟수를 줄인다

const pinSec = (page) => page.locator('section[aria-labelledby="setPin"]');

async function enterPin(scope, pin) {
  await scope.locator('.pin-input').fill(pin);
  await scope.getByRole('button', { name: '열기' }).click();
}

test('PIN 걸기 → 그 학생으로 바꿀 때 PIN이 필요하고, 틀린 PIN은 거절한다', async ({ page }) => {
  const errors = collectErrors(page);
  const calls = await open(page, { student: [MINSU, JIA], url: '/#/settings' });
  const sec = pinSec(page);
  await expect(sec).toContainText('기기 자체의 잠금(화면 잠금)을 대신하지는 않아요');
  await sec.getByRole('button', { name: 'PIN 걸기' }).click();
  await expect(sec.locator('#pinOld')).toBeHidden(); // 처음 걸 때는 지금 PIN이 없다
  // 형식·두 번 입력 확인
  await sec.locator('#pinNew').fill('12');
  await sec.locator('#pinNew2').fill('12');
  await sec.getByRole('button', { name: '저장' }).click();
  await expect(sec.locator('.form-msg')).toHaveText('새 PIN은 숫자 4~8자리로 정해 주세요.');
  await sec.locator('#pinNew').fill(PIN);
  await sec.locator('#pinNew2').fill('2469');
  await sec.getByRole('button', { name: '저장' }).click();
  await expect(sec.locator('.form-msg')).toHaveText('새 PIN 두 개가 서로 달라요. 다시 넣어 주세요.');
  await sec.locator('#pinNew2').fill(PIN);
  await sec.getByRole('button', { name: '저장' }).click();
  await waitReady(page);
  await expect(pinSec(page).locator('.pin-done')).toContainText('PIN을 걸었어요');
  await expect(pinSec(page)).toContainText('‘민수’에게 PIN이 걸려 있어요');
  await expect(page.locator('.student-row', { hasText: '민수' }).locator('.p-lock')).toHaveCount(1);
  // PIN은 해시만 저장한다 (어디에도 PIN 글자가 없다)
  await flushStore(page);
  const profiles = await readStore(page, 'profiles');
  expect(profiles[0].lock).toMatchObject({ v: 1, iter: expect.any(Number) });
  expect(JSON.stringify(await readIDB(page))).not.toContain('"' + PIN + '"');
  expect(JSON.stringify(await readLocal(page))).not.toContain(PIN);

  // 지아로 바꾸기 (지아는 PIN이 없다)
  await page.locator('#studentChip').click();
  await waitReady(page);
  await page.locator('.profile-card', { hasText: '지아' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/home$/);
  await expect(page.locator('#studentChip')).toContainText('지아');

  // 다시 민수로: PIN을 물어본다. 맞히기 전에는 지금 학생이 바뀌지 않는다
  await page.locator('#studentChip').click();
  await waitReady(page);
  await page.locator('.profile-card', { hasText: '민수' }).click();
  const panel = page.locator('.pin-panel');
  await expect(panel).toBeVisible();
  await expect(panel.locator('.pin-who')).toContainText('민수');
  await expect(page.locator('.profile-list')).toBeHidden();
  await enterPin(panel, '1111');
  await expect(panel.locator('.pin-msg')).toHaveText('PIN이 맞지 않아요. 다시 넣어 주세요.');
  await expect(page).toHaveURL(/#\/$/);
  expect(await readStore(page, 'current')).toBe(JIA.id);
  await enterPin(panel, '12');
  await expect(panel.locator('.pin-msg')).toHaveText('PIN은 숫자 4~8자리예요.');
  await enterPin(panel, PIN);
  await waitReady(page);
  await expect(page).toHaveURL(/#\/home$/);
  await expect(page.locator('#studentChip')).toContainText('민수');
  expect(await readStore(page, 'current')).toBe(MINSU.id);
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('앱을 다시 열면 잠긴 학생은 PIN 화면부터 — 맞히기 전에는 화면·기록·오답노트·대화를 보여 주지 않는다', async ({ page }) => {
  const minsu = Object.assign({}, MINSU, { lock: LOCK });
  const storage = {
    'tutor.p.p-minsu.notes': [{ key: 'k1', unit: 'math-m2-01', given: 'O', at: 1, wrongCount: 1, rightStreak: 0, problem: { type: 'ox', q: '민수만의 오답 문제', answer: false, explain: '해설' } }],
    'tutor.p.p-minsu.chat': { math: [{ who: 'me', text: '민수만의 질문', t: 1 }] },
  };
  await open(page, { student: [minsu], storage, url: '/#/notes' });
  await expect(page.locator('.page-title')).toHaveText('PIN을 넣어 주세요');
  await expect(page.locator('#topTitle')).toHaveText('PIN 확인');
  await expect(page.locator('#tabbar')).toBeHidden();
  await expect(page.locator('#studentChip')).toBeHidden();
  await expect(page.locator('.page')).not.toContainText('민수만의');
  expect(await page.evaluate(() => window.TutorApp.profile())).toBeNull();
  for (const h of ['#/home', '#/stats', '#/ask/math', '#/course/math-m2', '#/unit/math-m2-01/learn', '#/setup/mid?change=1']) {
    await goHash(page, h);
    await expect(page.locator('.page-title'), h).toHaveText('PIN을 넣어 주세요');
    await expect(page.locator('.page'), h).not.toContainText('민수만의');
  }
  // 틀리면 다시
  await enterPin(page.locator('.pin-panel'), '9999');
  await expect(page.locator('.pin-msg')).toHaveText('PIN이 맞지 않아요. 다시 넣어 주세요.');
  // 맞히면 원래 가려던 화면
  await goHash(page, '#/notes');
  await enterPin(page.locator('.pin-panel'), PIN);
  await waitReady(page);
  await expect(page.locator('.note-card')).toContainText('민수만의 오답 문제');
  await goHash(page, '#/ask/math');
  await expect(page.locator('.chat > li.msg.me')).toHaveText(/민수만의 질문/);
  // 새로고침하면 다시 잠긴다
  await page.reload();
  await waitReady(page);
  await expect(page.locator('.page-title')).toHaveText('PIN을 넣어 주세요');
  // [다른 학생 고르기]
  await page.getByRole('button', { name: '다른 학생 고르기' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/$/);
  await expect(page.locator('.profile-card', { hasText: '민수' }).locator('.p-lock')).toHaveCount(1);
});

test('PIN 바꾸기·풀기는 지금 PIN을 맞혀야 한다', async ({ page }) => {
  await open(page, { student: [Object.assign({}, MINSU, { lock: LOCK })], url: '/#/home' });
  await enterPin(page.locator('.pin-panel'), PIN);
  await waitReady(page);
  await goHash(page, '#/settings');
  const sec = pinSec(page);
  await sec.getByRole('button', { name: 'PIN 바꾸기' }).click();
  await sec.locator('#pinOld').fill('0000');
  await sec.locator('#pinNew').fill('135790');
  await sec.locator('#pinNew2').fill('135790');
  await sec.getByRole('button', { name: '저장' }).click();
  await expect(sec.locator('.form-msg')).toHaveText('지금 PIN이 맞지 않아요.');
  await sec.locator('#pinOld').fill(PIN);
  await sec.getByRole('button', { name: '저장' }).click();
  await waitReady(page);
  await expect(pinSec(page).locator('.pin-done')).toHaveText('PIN을 바꿨어요.');
  const lock = (await readStore(page, 'profiles'))[0].lock;
  expect(lock.hash).not.toBe(LOCK.hash);
  expect(await TS.verifyPin('135790', lock)).toBe(true);
  expect(await TS.verifyPin(PIN, lock)).toBe(false);

  await pinSec(page).getByRole('button', { name: 'PIN 풀기' }).click();
  await pinSec(page).locator('#pinOld').fill(PIN);
  await pinSec(page).getByRole('button', { name: 'PIN 풀기' }).click();
  await expect(pinSec(page).locator('.form-msg')).toHaveText('지금 PIN이 맞지 않아요.');
  await pinSec(page).locator('#pinOld').fill('135790');
  await pinSec(page).getByRole('button', { name: 'PIN 풀기' }).click();
  await waitReady(page);
  await expect(pinSec(page).locator('.pin-done')).toHaveText('PIN을 풀었어요.');
  expect((await readStore(page, 'profiles'))[0].lock).toBeUndefined();
  await expect(pinSec(page).getByRole('button', { name: 'PIN 걸기' })).toBeVisible();
  // 풀었으면 다시 열어도 묻지 않는다
  await flushStore(page);
  await page.reload();
  await waitReady(page);
  await goHash(page, '#/home');
  await expect(page.locator('.page-title')).toHaveText('중학교 2학년 과목');
});

test('PIN을 잊었어요 → 안내, 이 학생 지우기는 두 번 확인하고 그 학생 기록만 지운다', async ({ page }) => {
  const storage = {
    'tutor.p.p-minsu.notes': [{ key: 'k1', unit: 'math-m2-01', given: 'O', at: 1, wrongCount: 1, rightStreak: 0, problem: { type: 'ox', q: '민수 문제', answer: false, explain: '해설' } }],
    'tutor.p.p-jia.notes': [{ key: 'k2', unit: 'math-m2-01', given: 'X', at: 1, wrongCount: 1, rightStreak: 0, problem: { type: 'ox', q: '지아 문제', answer: true, explain: '해설' } }],
  };
  await open(page, { student: [Object.assign({}, MINSU, { lock: LOCK }), JIA], storage, url: '/#/home' });
  const panel = page.locator('.pin-panel');
  await panel.getByRole('button', { name: 'PIN을 잊었어요' }).click();
  const help = panel.locator('.pin-forgot');
  await expect(help).toBeVisible();
  await expect(help).toContainText('백업에서 되살리기');
  await expect(help).toContainText('지우고 새로 시작하기');
  await expect(help.getByRole('link', { name: '설정으로 가기' })).toHaveAttribute('href', '#/settings');

  // 두 번째 확인에서 취소하면 그대로
  await help.getByRole('button', { name: '이 학생 지우기' }).click();
  await expect(page.getByRole('dialog')).toContainText('이 학생을 지울까요?');
  await page.getByRole('dialog').getByRole('button', { name: '지우기' }).click();
  await expect(page.getByRole('dialog')).toContainText('정말 지울까요?');
  await page.getByRole('dialog').getByRole('button', { name: '취소' }).click();
  expect((await readStore(page, 'profiles')).length).toBe(2);

  await help.getByRole('button', { name: '이 학생 지우기' }).click();
  await page.getByRole('dialog').getByRole('button', { name: '지우기' }).click();
  await page.getByRole('dialog').getByRole('button', { name: '정말 지우기' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/$/);
  await expect(page.locator('.profile-card')).toHaveCount(1);
  await expect(page.locator('.profile-card')).toContainText('지아');
  await flushStore(page);
  const idb = await readIDB(page);
  expect(Object.keys(idb).filter((k) => k.indexOf('p.p-minsu.') === 0)).toEqual([]);
  expect(idb['p.p-jia.notes'][0].problem.q).toBe('지아 문제');
  expect(idb.current).toBeUndefined();
});

test('잠긴 학생의 기록은 다른 학생의 화면 어디에도 나오지 않는다', async ({ page }) => {
  const storage = {
    'tutor.p.p-minsu.notes': [{ key: 'k1', unit: 'math-m2-01', given: 'O', at: 1, wrongCount: 1, rightStreak: 0, problem: { type: 'ox', q: '민수만의 오답 문제', answer: false, explain: '해설' } }],
    'tutor.p.p-minsu.chat': { math: [{ who: 'me', text: '민수만의 질문', t: 1 }] },
    'tutor.p.p-minsu.attempts': [{ t: 1, unit: 'math-m2-01', pid: 'p1', level: 1, ok: false, cause: '민수만의 실수' }],
    'tutor.p.p-minsu.progress': { 'math-m2-02': { seen: [0, 1], cards: 2, solved: 9, correct: 9, best: 100, last: 1 } },
    'tutor.p.p-jia.notes': [{ key: 'k2', unit: 'math-m2-01', given: 'X', at: 1, wrongCount: 1, rightStreak: 0, problem: { type: 'ox', q: '지아 문제', answer: true, explain: '해설' } }],
  };
  // 지금 학생은 지아, 민수는 PIN으로 잠겨 있다
  const students = [Object.assign({}, MINSU, { lock: LOCK }), JIA];
  await open(page, { storage: Object.assign({ 'tutor.profiles': students, 'tutor.current': JIA.id }, storage), url: '/#/home' });
  for (const h of ['#/home', '#/notes', '#/stats', '#/ask/math', '#/course/math-m2', '#/settings', '#/']) {
    await goHash(page, h);
    const text = await page.locator('#main').innerText();
    expect(text, h).not.toContain('민수만의');
  }
  await goHash(page, '#/notes');
  await expect(page.locator('.note-card')).toHaveCount(1);
  await expect(page.locator('.note-card')).toContainText('지아 문제');
  await goHash(page, '#/course/math-m2');
  await expect(page.locator('.unit-row').nth(1)).toContainText('시작 전');
  // 설정에서도: 잠긴 학생은 이름 바꾸기가 없고, [이 학생으로] 를 누르면 PIN을 묻는다
  await goHash(page, '#/settings');
  const row = page.locator('.student-row', { hasText: '민수' });
  await expect(row.getByRole('button', { name: '이름·동물 바꾸기' })).toHaveCount(0);
  await row.getByRole('button', { name: '이 학생으로' }).click();
  await expect(row.locator('.pin-panel')).toBeVisible();
  await enterPin(row.locator('.pin-panel'), '0000');
  await expect(row.locator('.pin-msg')).toHaveText('PIN이 맞지 않아요. 다시 넣어 주세요.');
  expect(await readStore(page, 'current')).toBe(JIA.id);
  await enterPin(row.locator('.pin-panel'), PIN);
  await waitReady(page);
  await expect(page.locator('.student-row.is-current')).toContainText('민수');
  expect(await readStore(page, 'current')).toBe(MINSU.id);
});
