const { test, expect } = require('@playwright/test');
const { open, collectErrors, readStore, goHash, quizState, fillAnswer, STUDENT } = require('./helpers');

/*
 * 읽어 주기(js/speech.js + 화면): 개념 카드·예제·문제·해설 옆의 🔊 버튼. 초등 1~3학년은 처음부터 켜져 있고, 설정에서 켜고 끈다(학생별 prefs).
 * 이 기기 안의 한국어 목소리(localService)만 쓴다 — 인터넷 목소리는 읽을 글을 회사 서버로 보내므로 쓰지 않는다(AGENTS.md 규칙 4·7).
 * 시험은 진짜 목소리 대신 가짜 speechSynthesis 를 끼워, 무엇을 어떤 목소리로 읽으려 했는지 본다. 학생은 가상의 이름.
 */
const LOW = { id: 'p-e2', name: '지아', avatar: '🐰', level: 'elem', grade: 'e2', pace: 'normal', created: 1 };
const LOCAL = { name: '기기 한국어', lang: 'ko-KR', localService: true, default: false };
const ONLINE = { name: '인터넷 한국어', lang: 'ko-KR', localService: false, default: true };

async function fakeSpeech(page, voices, opt = {}) {
  await page.addInitScript(([voices, none]) => {
    window.__spoken = [];
    window.__cancel = 0;
    if (none) { // 읽어 주기를 지원하지 않는 브라우저
      Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: undefined });
      window.SpeechSynthesisUtterance = undefined;
      return;
    }
    const listeners = [];
    const list = voices.slice();
    const synth = {
      getVoices: () => list.slice(),
      speak(u) { window.__spoken.push({ text: u.text, lang: u.lang, rate: u.rate, voice: u.voice && u.voice.name }); synth._u = u; },
      cancel() { window.__cancel += 1; },
      addEventListener(type, fn) { if (type === 'voiceschanged') listeners.push(fn); },
      removeEventListener() {},
    };
    window.__finishSpeech = () => { const u = synth._u; if (u && u.onend) u.onend({}); };
    window.__loadVoices = (more) => { more.forEach((v) => list.push(v)); listeners.forEach((f) => f()); };
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: synth });
    window.SpeechSynthesisUtterance = function (text) { this.text = text; this.lang = ''; this.rate = 1; this.voice = null; };
  }, [voices, !!opt.none]);
}
const spoken = (page) => page.evaluate(() => window.__spoken);

test('초등 1~3학년은 처음부터 켜져 있다: 개념 카드를 기기 안 목소리로, 수식은 한국어로 읽는다 · 다시 누르면 멈춘다', async ({ page }) => {
  const errors = collectErrors(page);
  await fakeSpeech(page, [ONLINE, LOCAL]);
  const calls = await open(page, { student: LOW, url: '/#/unit/math-m2-01/learn' });
  const card = page.locator('.concept-card').first();
  const btn = card.locator('.cc-tools').getByRole('button', { name: '읽어 주기' });
  await expect(btn).toBeVisible();
  await btn.click();
  await expect(btn).toHaveAttribute('aria-pressed', 'true');
  const s = await spoken(page);
  expect(s).toHaveLength(1);
  expect(s[0].voice).toBe('기기 한국어');           // 인터넷 목소리(기본값이어도)는 고르지 않는다
  expect(s[0].lang).toBe('ko-KR');
  expect(s[0].rate).toBeCloseTo(0.85);             // 저학년은 천천히
  expect(s[0].text).toContain('부등식이란?');
  expect(s[0].text).toContain('a는 b보다 작다');     // $a<b$
  expect(s[0].text).not.toMatch(/[$*\\]/);
  await btn.click();                                // 읽는 중에 다시 누르면 멈춤
  await expect(btn).toHaveAttribute('aria-pressed', 'false');
  expect(await page.evaluate(() => window.__cancel)).toBeGreaterThan(0);
  expect(await spoken(page)).toHaveLength(1);
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('문제: 보기를 화면 순서대로 번호와 함께 읽고, 채점한 뒤에는 정답·해설을 읽는다', async ({ page }) => {
  await fakeSpeech(page, [LOCAL]);
  await open(page, { student: LOW, url: '/#/quiz/math-m2-01?n=3&lv=1&seed=11' });
  const st = await quizState(page);
  const item = st.items[0];
  const form = page.locator('.quiz form.problem');
  await form.getByRole('button', { name: '문제 읽어 주기' }).click();
  let s = await spoken(page);
  expect(s).toHaveLength(1);
  expect(s[0].text).not.toMatch(/[$*\\]/);
  if (item.type === 'choice') {
    const shown = await form.locator('.choice .c-text').allInnerTexts();
    expect(s[0].text).toContain('1번');
    expect(s[0].text).toContain(shown.length + '번');
  }
  await page.evaluate(() => window.__finishSpeech());
  await expect(form.getByRole('button', { name: '문제 읽어 주기' })).toHaveAttribute('aria-pressed', 'false');
  // 정답으로 채점
  await fillAnswer(page, form, item, 'right', { withUnit: true });
  await form.locator('.pw-submit').click();
  await expect(form.locator('.feedback')).toBeVisible();
  await form.locator('.feedback').getByRole('button', { name: '해설 읽어 주기' }).click();
  s = await spoken(page);
  expect(s).toHaveLength(2);
  expect(s[1].text).toMatch(/^정답은 /);
});

test('예제도 읽어 준다(문제와 지금까지 펼친 풀이)', async ({ page }) => {
  await fakeSpeech(page, [LOCAL]);
  await open(page, { student: LOW, url: '/#/unit/math-m2-01/examples' });
  const ex = page.locator('.example').first();
  await ex.getByRole('button', { name: '풀이 첫 단계 보기' }).click();
  await ex.getByRole('button', { name: '읽어 주기', exact: true }).click();
  const s = await spoken(page);
  expect(s).toHaveLength(1);
  expect(s[0].text.length).toBeGreaterThan(5);
  expect(s[0].text).not.toMatch(/[$*\\]/);
});

test('인터넷 목소리뿐이면 버튼을 숨기고, 설정에서 까닭과 방법을 알린다', async ({ page }) => {
  await fakeSpeech(page, [ONLINE]);
  await open(page, { student: LOW, url: '/#/unit/math-m2-01/learn' });
  await expect(page.locator('.concept-card').first().locator('.cc-tools .speak-btn')).toBeHidden();
  await goHash(page, '#/settings');
  const sec = page.locator('#speech');
  await expect(sec).toContainText('이 기기 안의 한국어 목소리를 찾지 못했어요');
  await expect(sec).toContainText('인터넷으로 보내는 목소리는 쓰지 않아요');
  await expect(sec.getByRole('button', { name: '들어 보기' })).toBeDisabled();
});

test('목소리를 늦게 불러오면(voiceschanged) 그때 버튼이 보인다', async ({ page }) => {
  await fakeSpeech(page, []);
  await open(page, { student: LOW, url: '/#/unit/math-m2-01/learn' });
  const btn = page.locator('.concept-card').first().locator('.cc-tools .speak-btn');
  await expect(btn).toBeHidden();
  await page.evaluate((v) => window.__loadVoices([v]), LOCAL);
  await expect(btn).toBeVisible();
});

test('중학생은 처음엔 없고, 설정에서 켜면 생긴다 · 빠르기 보통 · 끄면 사라진다 (학생별 기록)', async ({ page }) => {
  await fakeSpeech(page, [LOCAL]);
  await open(page, { student: true, url: '/#/unit/math-m2-01/learn' });
  await expect(page.locator('.speak-btn')).toHaveCount(0);
  await goHash(page, '#/settings');
  const sec = page.locator('#speech');
  await expect(sec).toContainText('목소리: 기기 한국어');
  await sec.getByRole('radio', { name: '켜기' }).check();
  await sec.getByRole('radio', { name: '보통' }).check();
  await sec.getByRole('button', { name: '들어 보기' }).click();
  let s = await spoken(page);
  expect(s.length).toBe(1);
  expect(s[0].rate).toBe(1);
  expect(await readStore(page, 'p.' + STUDENT.id + '.prefs')).toEqual({ tts: 'on', ttsRate: 'normal' });
  await goHash(page, '#/unit/math-m2-01/learn');
  await expect(page.locator('.concept-card').first().locator('.cc-tools .speak-btn')).toBeVisible();
  await goHash(page, '#/settings');
  await page.locator('#speech').getByRole('radio', { name: '끄기' }).check();
  await goHash(page, '#/unit/math-m2-01/learn');
  await expect(page.locator('.speak-btn')).toHaveCount(0);
});

test('다른 화면으로 가면 읽기를 멈춘다', async ({ page }) => {
  await fakeSpeech(page, [LOCAL]);
  await open(page, { student: LOW, url: '/#/unit/math-m2-01/learn' });
  await page.locator('.concept-card').first().locator('.cc-tools .speak-btn').click();
  const before = await page.evaluate(() => window.__cancel);
  await goHash(page, '#/home');
  expect(await page.evaluate(() => window.__cancel)).toBeGreaterThan(before);
});

test('읽어 주기를 지원하지 않는 브라우저: 버튼 없이 그대로 동작하고 설정에 알린다', async ({ page }) => {
  const errors = collectErrors(page);
  await fakeSpeech(page, [], { none: true });
  await open(page, { student: LOW, url: '/#/unit/math-m2-01/learn' });
  await expect(page.locator('.speak-btn')).toBeHidden();
  await goHash(page, '#/settings');
  await expect(page.locator('#speech')).toContainText('이 브라우저는 읽어 주기를 지원하지 않아요');
  expect(errors).toEqual([]);
});
