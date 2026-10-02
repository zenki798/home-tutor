const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { open, collectErrors, waitReady, readStore, flushStore, readIDB } = require('./helpers');
const TS = require('../../js/storage.js');

/*
 * 학습 기록 옮기기 (ARCHITECTURE §9.3): 설정 → "학습 기록 옮기기".
 * 내보내기는 암호(6자 이상)로 잠근 파일을 내려받고, 가져오기는 끝까지 검사한 뒤 더하기(기본)·바꾸기(두 번 확인, 되돌리기)로 복원한다.
 * 틀린 암호·망가진 파일은 이유만 알리고 아무것도 바꾸지 않는다. 내려받은 파일은 test-results 아래에만 둔다.
 * 시험 학생은 가상의 이름(민수·지아), 암호는 시험용 가짜.
 */

const MINSU = { id: 'p-minsu', name: '민수', avatar: '🐻', level: 'mid', grade: 'm2', pace: 'normal', created: 1 };
const JIA = { id: 'p-jia', name: '지아', avatar: '🐰', level: 'mid', grade: 'm2', pace: 'easy', created: 2 };
const PW = ['star', 'light', '7'].join('-'); // 시험용 가짜 암호
const SEED = {
  'tutor.p.p-minsu.progress': { 'math-m2-01': { seen: [0, 1, 2], cards: 4, solved: 5, correct: 4, best: 80, last: 1 } },
  'tutor.p.p-minsu.notes': [{ key: 'math-m2-01#p6', unit: 'math-m2-01', given: 'O', at: 1, wrongCount: 1, rightStreak: 0, problem: { type: 'ox', q: '민수의 오답 문제', answer: false, explain: '해설' } }],
  'tutor.p.p-minsu.chat': { math: [{ who: 'me', text: '민수의 질문', t: 1 }] },
  'tutor.p.p-jia.progress': { 'eng-m-01': { seen: [0], cards: 3, solved: 0, correct: 0, best: 0, last: 1 } },
};

const backupSec = (page) => page.locator('#backup');

/* 설정의 내보내기로 백업 파일을 만들어 test-results 아래에 저장한다 */
async function exportBackup(page, testInfo, opt = {}) {
  const sec = backupSec(page);
  if (opt.scope) await sec.getByRole('radio', { name: opt.scope }).check();
  await sec.locator('#bkPw').fill(opt.pw || PW);
  await sec.locator('#bkPw2').fill(opt.pw2 || opt.pw || PW);
  const [dl] = await Promise.all([
    page.waitForEvent('download'),
    sec.getByRole('button', { name: '백업 파일 만들기' }).click(),
  ]);
  expect(dl.suggestedFilename()).toMatch(/^가정교사-백업-\d{4}-\d{2}-\d{2}\.json$/);
  const file = testInfo.outputPath(opt.name || 'backup.json');
  await dl.saveAs(file);
  await expect(sec.locator('.bk-out')).toContainText('백업 파일을 만들었어요');
  return file;
}

/* 가져오기: [파일 고르기] 단추로 파일 선택 창을 열어 고르기 → 암호 → 열어 보기 */
async function openBackup(page, file, pw) {
  const sec = backupSec(page);
  const [chooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    sec.locator('label.file-btn').click(),
  ]);
  expect(chooser.isMultiple()).toBe(false);
  await chooser.setFiles(file);
  await expect(sec.locator('#bkFileName')).toHaveText(path.basename(file));
  await sec.locator('#bkPwIn').fill(pw);
  await sec.getByRole('button', { name: '백업 열어 보기' }).click();
}

test('내보내기: 암호로 잠근 파일을 내려받는다 (별명·기록이 평문으로 보이지 않는다), 암호가 짧거나 다르면 막는다', async ({ page }, testInfo) => {
  const errors = collectErrors(page);
  const calls = await open(page, { student: [MINSU, JIA], storage: SEED, url: '/#/settings' });
  const sec = backupSec(page);
  await expect(sec).toContainText('암호를 잊으면 아무도 이 백업을 열 수 없어요');
  await expect(sec.getByRole('radio', { name: /지금 학생/ })).toBeChecked();
  await expect(sec.getByRole('radio', { name: /모든 학생 \(2명\)/ })).toBeEnabled();

  // 암호가 짧으면·다르면 파일을 만들지 않는다
  await sec.locator('#bkPw').fill('12345');
  await sec.locator('#bkPw2').fill('12345');
  await sec.getByRole('button', { name: '백업 파일 만들기' }).click();
  await expect(sec.locator('.bk-export .form-msg')).toHaveText('백업 암호는 6자 이상으로 정해 주세요.');
  await sec.locator('#bkPw').fill(PW);
  await sec.locator('#bkPw2').fill(PW + 'x');
  await sec.getByRole('button', { name: '백업 파일 만들기' }).click();
  await expect(sec.locator('.bk-export .form-msg')).toHaveText('암호와 암호 확인이 서로 달라요.');

  const file = await exportBackup(page, testInfo);
  const text = fs.readFileSync(file, 'utf8');
  const env = JSON.parse(text);
  expect(env).toMatchObject({ format: 'home-tutor-backup', version: 1, encrypted: true });
  expect(env.kdf).toMatchObject({ name: 'PBKDF2', hash: 'SHA-256' });
  expect(env.cipher.name).toBe('AES-GCM');
  for (const secret of ['민수', '지아', 'math-m2-01', '오답 문제', PW]) expect(text).not.toContain(secret);
  // 암호 칸은 비운다
  await expect(sec.locator('#bkPw')).toHaveValue('');
  // 맞는 암호로 풀면 지금 학생(민수)만 들어 있다
  const res = await TS.readBackup(text, PW);
  expect(res.ok).toBe(true);
  expect(res.summary.profiles.map((p) => p.name)).toEqual(['민수']);
  expect(Object.keys(res.payload.data).sort()).toEqual(['p.p-minsu.chat', 'p.p-minsu.notes', 'p.p-minsu.progress']);
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('가져오기 — 더하기(기본): 지금 기록은 그대로, 백업의 학생을 새 학생으로 더한다', async ({ page }, testInfo) => {
  await open(page, { student: [MINSU, JIA], storage: SEED, url: '/#/settings' });
  const file = await exportBackup(page, testInfo);
  await flushStore(page);
  const before = await readIDB(page);

  await openBackup(page, file, PW);
  const sum = backupSec(page).locator('.bk-summary');
  await expect(sum).toBeVisible();
  await expect(sum.locator('.bk-people li')).toHaveCount(1);
  await expect(sum.locator('.bk-people')).toContainText('민수');
  await expect(sum.locator('.bk-people')).toContainText('중학교 2학년');
  await expect(sum.locator('.bk-meta')).toContainText('학생 1명 · 기록 3가지 · 만든 날');
  await expect(sum.getByRole('radio', { name: /이 기기에 더하기/ })).toBeChecked();
  await sum.getByRole('button', { name: '가져오기' }).click();
  await waitReady(page);
  await expect(backupSec(page).locator('.bk-result')).toContainText('백업에서 학생 1명을 더했어요');

  const rows = page.locator('.student-row');
  await expect(rows).toHaveCount(3);
  await expect(rows.nth(2)).toContainText('민수 (가져옴)');
  const profiles = await readStore(page, 'profiles');
  const added = profiles[2];
  expect(added.id).not.toBe(MINSU.id);
  const after = await readIDB(page);
  // 원래 기록은 하나도 바뀌지 않았다
  for (const k of Object.keys(before)) if (k !== 'profiles') expect(after[k], k).toEqual(before[k]);
  expect(after['p.' + added.id + '.progress']).toEqual(before['p.p-minsu.progress']);
  expect(after['p.' + added.id + '.notes']).toEqual(before['p.p-minsu.notes']);
});

test('가져오기 — 모두 바꾸기(두 번 확인) → 되돌리기로 원래대로', async ({ page }, testInfo) => {
  await open(page, { student: [MINSU, JIA], storage: SEED, url: '/#/settings' });
  const file = await exportBackup(page, testInfo); // 민수만 든 백업
  // 백업 뒤에 바뀐 기록
  await page.evaluate(async () => {
    const st = window.Tutor.store;
    st.set('p.p-minsu.recent', ['math-m2-02']);
    await st.flush();
  });
  await flushStore(page);
  const before = await readIDB(page);

  await openBackup(page, file, PW);
  const sum = backupSec(page).locator('.bk-summary');
  await sum.getByRole('radio', { name: /모두 바꾸기/ }).check();
  await sum.getByRole('button', { name: '가져오기' }).click();
  // 첫 번째 확인에서 취소하면 아무것도 바뀌지 않는다
  await expect(page.getByRole('dialog')).toContainText('이 기기의 기록을 모두 바꿀까요?');
  await expect(page.getByRole('dialog')).toContainText('학생 2명');
  await page.getByRole('dialog').getByRole('button', { name: '취소' }).click();
  expect(await readIDB(page)).toEqual(before);
  // 두 번 확인하면 바꾼다
  await sum.getByRole('button', { name: '가져오기' }).click();
  await page.getByRole('dialog').getByRole('button', { name: '바꾸기' }).click();
  await expect(page.getByRole('dialog')).toContainText('정말 모두 바꿀까요?');
  await page.getByRole('dialog').getByRole('button', { name: '모두 바꾸기' }).click();
  await waitReady(page);
  await expect(backupSec(page).locator('.bk-result')).toContainText('백업 내용으로 바꿨어요');
  await expect(page.locator('.student-row')).toHaveCount(1);
  await expect(page.locator('.student-row')).toContainText('민수');
  const replaced = await readIDB(page);
  expect(replaced.profiles.map((p) => p.id)).toEqual([MINSU.id]);
  expect(replaced['p.p-jia.progress']).toBeUndefined();
  expect(replaced['p.p-minsu.recent']).toBeUndefined(); // 백업에 없던 기록
  expect(replaced['sys.restorePoint']).toBeTruthy();

  // 되돌리기
  const undo = backupSec(page).locator('.bk-undo');
  await expect(undo).toContainText('되돌릴 수 있어요');
  await expect(undo).toContainText('학생 2명');
  await undo.getByRole('button', { name: '되돌리기', exact: true }).click();
  await page.getByRole('dialog').getByRole('button', { name: '되돌리기', exact: true }).click();
  await waitReady(page);
  await expect(backupSec(page).locator('.bk-result')).toContainText('가져오기 전 기록으로 되돌렸어요');
  await expect(page.locator('.student-row')).toHaveCount(2);
  await expect(backupSec(page).locator('.bk-undo')).toHaveCount(0);
  await flushStore(page);
  expect(await readIDB(page)).toEqual(before);
});

test('틀린 암호·망가진 파일·다른 파일은 이유만 알리고 기존 데이터를 그대로 둔다', async ({ page }, testInfo) => {
  const errors = collectErrors(page);
  await open(page, { student: [MINSU, JIA], storage: SEED, url: '/#/settings' });
  const file = await exportBackup(page, testInfo);
  await flushStore(page);
  const before = await readIDB(page);
  const msg = backupSec(page).locator('.bk-import .form-msg');

  // 틀린 암호
  await openBackup(page, file, 'wrong-' + PW);
  await expect(msg).toContainText('암호가 맞지 않거나 파일이 손상되었어요');
  await expect(msg).toContainText('지금 기록은 그대로예요');
  await expect(backupSec(page).locator('.bk-summary')).toBeHidden();

  // 한 글자 바뀐 파일(손상·변조)
  const env = JSON.parse(fs.readFileSync(file, 'utf8'));
  const i = Math.floor(env.data.length / 2);
  env.data = env.data.slice(0, i) + (env.data[i] === 'A' ? 'B' : 'A') + env.data.slice(i + 1);
  const broken = testInfo.outputPath('broken.json');
  fs.writeFileSync(broken, JSON.stringify(env));
  await openBackup(page, broken, PW);
  await expect(msg).toContainText('암호가 맞지 않거나 파일이 손상되었어요');

  // 가정교사 백업이 아닌 파일
  const other = testInfo.outputPath('other.json');
  fs.writeFileSync(other, JSON.stringify({ hello: 'world' }));
  await openBackup(page, other, PW);
  await expect(msg).toContainText('가정교사 백업 파일이 아니에요');

  // 암호로 잠기지 않은 백업
  const plain = testInfo.outputPath('plain.json');
  fs.writeFileSync(plain, JSON.stringify(Object.assign({}, env, { encrypted: false })));
  await openBackup(page, plain, PW);
  await expect(msg).toContainText('암호로 잠기지 않은 백업은 받지 않아요');

  // JSON 이 아닌 파일
  const junk = testInfo.outputPath('junk.json');
  fs.writeFileSync(junk, '이건 백업이 아니에요 {');
  await openBackup(page, junk, PW);
  await expect(msg).toContainText('가정교사 백업 파일이 아니에요');

  await flushStore(page);
  expect(await readIDB(page)).toEqual(before);
  await expect(page.locator('.student-row')).toHaveCount(2);
  expect(errors).toEqual([]);
});

test('다른 학생에게 PIN이 걸려 있으면 "모든 학생" 내보내기를 막고 이유를 알린다', async ({ page }) => {
  const lock = await TS.hashPin('2468', 1000);
  await open(page, { student: [MINSU, Object.assign({}, JIA, { lock })], url: '/#/settings' });
  const sec = backupSec(page);
  await expect(sec.getByRole('radio', { name: /모든 학생/ })).toBeDisabled();
  await expect(sec.locator('.bk-all-note')).toContainText('PIN이 걸린 다른 학생이 있어서 ‘모든 학생’은 내보낼 수 없어요');
  await expect(sec.getByRole('radio', { name: /지금 학생 \(민수\)/ })).toBeChecked();
});

test('PIN 을 잊었을 때: PIN 이 걸린 학생의 백업을 "PIN 잠금 없이" 더할 수 있다 (백업 암호를 아는 사람만)', async ({ page }, testInfo) => {
  const lock = await TS.hashPin('2468', 1000);
  // 다른 기기에서 만든 백업이라고 치자: PIN 이 걸린 민수 한 명
  const mem = TS.createStore({ providers: [new TS.MemoryProvider()], win: {} });
  await mem.ready();
  mem.set('profiles', [Object.assign({}, MINSU, { lock })]);
  mem.set('p.p-minsu.progress', { 'math-m2-01': { seen: [0, 1], cards: 4, solved: 2, correct: 2, best: 100, last: 1 } });
  const out = await TS.exportBackup(mem, { password: PW, iterations: 100000 });
  const file = testInfo.outputPath('locked.json');
  fs.writeFileSync(file, out.text);

  await open(page, { student: [JIA], url: '/#/settings' });
  await openBackup(page, file, PW);
  const sum = backupSec(page).locator('.bk-summary');
  await expect(sum.locator('.bk-people')).toContainText('🔒 PIN');
  const keep = sum.getByRole('checkbox', { name: /PIN 잠금도 그대로 가져오기/ });
  await expect(keep).toBeChecked();
  await keep.uncheck();
  await sum.getByRole('button', { name: '가져오기' }).click();
  await expect(backupSec(page).locator('.bk-result')).toContainText('백업에서 학생 1명을 더했어요');
  const profiles = await readStore(page, 'profiles');
  expect(profiles.map((p) => p.name)).toEqual(['지아', '민수']);
  expect(profiles[1].lock).toBeUndefined();
  // 이제 PIN 없이 그 학생으로 바꿀 수 있고, 기록이 그대로다
  await page.locator('.student-row', { hasText: '민수' }).getByRole('button', { name: '이 학생으로' }).click();
  await waitReady(page);
  await expect(page.locator('.student-row.is-current')).toContainText('민수');
  expect(await readStore(page, 'p.' + profiles[1].id + '.progress')).toMatchObject({ 'math-m2-01': { solved: 2 } });
});

test('모든 학생 내보내기 → 다른 기기(빈 저장소)에서 가져오면 학생·기록·설정이 그대로', async ({ page, browser }, testInfo) => {
  await open(page, { student: [MINSU, JIA], storage: Object.assign({ 'tutor.settings': { fontScale: 2, theme: 'dark' } }, SEED), url: '/#/settings' });
  const file = await exportBackup(page, testInfo, { scope: /모든 학생/ });
  await flushStore(page);
  const original = await readIDB(page);

  // 다른 기기: 새 브라우저 문맥(저장소가 비어 있다)
  const ctx = await browser.newContext({
    baseURL: testInfo.project.use.baseURL, viewport: page.viewportSize(), locale: 'ko-KR', serviceWorkers: 'block',
  });
  const other = await ctx.newPage();
  await open(other, { url: '/#/settings' });
  await expect(other.locator('.student-row')).toHaveCount(0);
  await openBackup(other, file, PW);
  const sum = backupSec(other).locator('.bk-summary');
  await expect(sum.locator('.bk-people li')).toHaveCount(2);
  await sum.getByRole('radio', { name: /모두 바꾸기/ }).check();
  await sum.getByRole('button', { name: '가져오기' }).click();
  await other.getByRole('dialog').getByRole('button', { name: '바꾸기' }).click();
  await other.getByRole('dialog').getByRole('button', { name: '모두 바꾸기' }).click();
  await waitReady(other);
  await expect(other.locator('.student-row')).toHaveCount(2);
  await expect(other.locator('html')).toHaveAttribute('data-theme', 'dark');
  await flushStore(other);
  const moved = await readIDB(other);
  for (const k of Object.keys(original)) expect(moved[k], k).toEqual(original[k]);
  await ctx.close();
});

test('암호화 기능을 쓸 수 없는 화면에서는 백업·PIN을 이유와 함께 막는다', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(Crypto.prototype, 'subtle', { configurable: true, get() { return undefined; } });
  });
  await open(page, { student: [MINSU], url: '/#/settings' });
  const sec = backupSec(page);
  await expect(sec.locator('.notice').first()).toContainText('암호화 기능을 쓸 수 없어요');
  await expect(sec.getByRole('button', { name: '백업 파일 만들기' })).toBeDisabled();
  await expect(sec.getByRole('button', { name: '백업 열어 보기' })).toBeDisabled();
  await expect(sec.locator('#bkPw')).toBeDisabled();
  const pin = page.locator('section[aria-labelledby="setPin"]');
  await expect(pin.locator('.notice')).toContainText('암호화 기능을 쓸 수 없어요');
  await expect(pin.getByRole('button', { name: 'PIN 걸기' })).toHaveCount(0);
});

test('이 기기에서 모든 기록 지우기: 두 번 확인하고, 화면 설정만 남긴다 (공용 컴퓨터 안내)', async ({ page }) => {
  await open(page, { student: [MINSU, JIA], storage: Object.assign({ 'tutor.settings': { fontScale: 2, theme: 'auto' } }, SEED), url: '/#/settings' });
  const sec = page.locator('.set-sec', { hasText: '이 기기에서 모든 기록 지우기' });
  await expect(sec).toContainText('공용 컴퓨터');
  await sec.getByRole('button', { name: '이 기기에서 모든 기록 지우기' }).click();
  await expect(page.getByRole('dialog')).toContainText('학생 2명');
  await page.getByRole('dialog').getByRole('button', { name: '지우기' }).click();
  await expect(page.getByRole('dialog')).toContainText('정말 모두 지울까요?');
  // 두 번째에서 취소하면 그대로
  await page.getByRole('dialog').getByRole('button', { name: '취소' }).click();
  await expect(page.locator('.student-row')).toHaveCount(2);

  await sec.getByRole('button', { name: '이 기기에서 모든 기록 지우기' }).click();
  await page.getByRole('dialog').getByRole('button', { name: '지우기' }).click();
  await page.getByRole('dialog').getByRole('button', { name: '모두 지우기' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/setup$/);
  await flushStore(page);
  const left = await readIDB(page);
  expect(Object.keys(left)).toEqual(['settings']);
  await expect(page.locator('html')).toHaveAttribute('data-font', '2');
  await page.reload();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/setup$/);
});
