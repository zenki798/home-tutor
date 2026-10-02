const { test, expect } = require('@playwright/test');
const { open, collectErrors, waitReady, goHash, readStore, readIDB, readLocal } = require('./helpers');

/*
 * 질문: ① 인사 ② 수학 풀이 엔진(풀이 단계) ③ 사이트 안 내용 검색 ④ 모르면 정직하게.
 * AI·서버 없이 이 기기 안에서만. 대화는 이 기기에만 글자로 저장한다(과목마다 최근 30개, ARCHITECTURE §9.2).
 * (계산·검색은 js/solver.js · js/search.js 엔진이 있어야 통과한다)
 */

async function ask(page, text) {
  const before = await page.locator('.chat > li.msg.t:not(.wait)').count();
  await page.locator('#askInput').fill(text);
  await page.locator('#askInput').press('Enter');
  await expect(page.locator('.chat > li.msg.me').last()).toContainText(text);
  await expect(page.locator('.chat > li.msg.t:not(.wait)')).toHaveCount(before + 1);
  return page.locator('.chat > li.msg.t').last();
}

test('선생님 고르기: 내 학교급의 과목 선생님들', async ({ page }) => {
  await open(page, { student: true, url: '/#/home' });
  await page.locator('#tabbar a[data-tab="ask"]').click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/ask$/);
  await expect(page.locator('.teacher-card')).toHaveText([/수학 선생님/, /영어 선생님/]);
  await page.locator('.teacher-card', { hasText: '수학 선생님' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/ask\/math$/);
  await expect(page.locator('#topTitle')).toHaveText('수학 선생님께 질문');
  await expect(page.locator('.chat .msg.t').first()).toContainText('수학 선생님에게 무엇이든 물어보세요');
});

test('계산 질문 → 풀이 단계를 하나씩 보여 주고 마지막에 답', async ({ page }) => {
  const errors = collectErrors(page);
  const calls = await open(page, { student: true, url: '/#/ask/math' });
  // 여러 단계로 푸는 방정식: 한 단계씩
  const msg = await ask(page, '3(x-1)=2x+5');
  const sol = msg.locator('.sol');
  await expect(sol).toBeVisible();
  const steps = sol.locator('.sol-steps > li');
  const n = await steps.count();
  expect(n).toBeGreaterThanOrEqual(2);
  await expect(sol.locator('.sol-steps > li:visible')).toHaveCount(1);
  await expect(sol.locator('.sol-answer')).toBeHidden();
  for (let i = 1; i < n; i++) {
    await sol.getByRole('button', { name: '다음 단계' }).click();
    await expect(sol.locator('.sol-steps > li:visible')).toHaveCount(i + 1);
  }
  await expect(sol.locator('.sol-answer')).toBeVisible();
  await expect(sol.locator('.sol-answer')).toContainText('8');
  await expect(sol.getByRole('button', { name: '다음 단계' })).toHaveCount(0);
  await expect(page.locator('#askInput')).toBeFocused(); // 다 보면 다음 질문을 바로 쓸 수 있게
  // 분수 계산(한 단계 풀이면 답까지 바로)
  const msg2 = await ask(page, '3/4 ÷ 2/5');
  await expect(msg2.locator('.sol .mt').first()).toBeVisible();
  await expect(msg2.locator('.sol-answer')).toBeVisible();
  await expect(msg2.locator('.sol-answer')).toContainText('15');
  await expect(msg2.locator('.sol-answer')).toContainText('8');
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('예시 칩을 누르면 그 질문을 보내고, "한 번에 보기" 로 풀이 전체', async ({ page }) => {
  await open(page, { student: true, url: '/#/ask/math' });
  const chip = page.locator('.ask-chips .chip', { hasText: '2x+3=7' });
  await chip.click();
  const msg = page.locator('.chat > li.msg.t').last();
  await expect(page.locator('.chat > li.msg.me').last()).toContainText('2x+3=7');
  await expect(msg.locator('.sol')).toBeVisible();
  await msg.getByRole('button', { name: '한 번에 보기' }).click();
  await expect(msg.locator('.sol-answer')).toBeVisible();
  await expect(msg.locator('.sol-answer')).toContainText('2');
});

test('개념 질문 → 배운 내용에서 찾아 요약하고, [자세히 보기] 로 그 카드에 간다', async ({ page }) => {
  const errors = collectErrors(page);
  const calls = await open(page, { student: true, url: '/#/ask/math?course=math-m2' });
  const msg = await ask(page, '부등식의 성질이 뭐예요?');
  await expect(msg).toContainText('‘일차부등식’에서 배우는 내용이에요.');
  await expect(msg.locator('.found-title')).toHaveText('부등식의 성질');
  await expect(msg.locator('.found-text')).toContainText('음수를 곱하거나 나누면 부등호 방향이 바뀌어요');
  await expect(msg.locator('.others li').first()).toBeVisible(); // 다른 후보
  expect(await msg.locator('.others li').count()).toBeLessThanOrEqual(2);
  await msg.getByRole('link', { name: '자세히 보기' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/unit\/math-m2-01\/learn\?card=1$/);
  await expect(page.locator('#cvCount')).toHaveText('카드 2 / 4');
  await expect(page.locator('.concept-card:visible .cc-title')).toHaveText('부등식의 성질');
  expect(calls.index).toEqual(['math-mid']); // 과정의 학교급 색인(data/index/<과목>-<학교급>.js)만 싣는다
  expect(errors).toEqual([]);
  expect(calls.external).toEqual([]);
});

test('모르는 질문에는 지어내지 않고 정직하게 안내한다', async ({ page }) => {
  await open(page, { student: true, url: '/#/ask/math' });
  const msg = await ask(page, '블랙홀은 왜 검게 보여요?');
  await expect(msg).toContainText('그 질문은 아직 제가 잘 몰라요. 이런 단원을 살펴보면 도움이 될 거예요.');
  await expect(msg).toContainText('학교 선생님이나 부모님께도 여쭤 보세요.');
  const links = msg.locator('.others a');
  expect(await links.count()).toBeGreaterThanOrEqual(1);
  await expect(links.first()).toHaveAttribute('href', /^#\/unit\/math-m2-0\d\/learn$/);
  await expect(msg.locator('.found')).toHaveCount(0);
});

test('인사에는 인사로 답한다', async ({ page }) => {
  await open(page, { student: true, url: '/#/ask/eng' });
  const msg = await ask(page, '안녕하세요');
  await expect(msg).toContainText('안녕하세요! 궁금한 것을 편하게 물어보세요.');
});

test('단원 질문 탭: 자주 묻는 질문 칩, 자주 하는 실수, 그 단원 안에서 찾기', async ({ page }) => {
  await open(page, { student: true, url: '/#/unit/math-m2-01/ask' });
  await expect(page.locator('.chat .msg.t').first()).toContainText('‘일차부등식’에서 궁금한 것을 물어보세요');
  const faq = page.locator('.faq-chip');
  await expect(faq).toHaveCount(2);
  await faq.first().click();
  await expect(page.locator('.chat > li.msg.me').last()).toContainText('왜 음수로 나누면 부등호 방향이 바뀌어요?');
  await expect(page.locator('.chat > li.msg.t').last()).toContainText('수직선에서 0을 기준으로 뒤집히기 때문이에요');
  await expect(page.locator('.mistake-box li')).toHaveCount(2);
  await expect(page.locator('.mistake-box')).toContainText('음수로 나누고도 부등호 방향을 그대로 두는 실수');

  const msg = await ask(page, '수직선에 빈 점은 언제 그려요?');
  await expect(msg.locator('.found-title')).toHaveText('해를 수직선에 나타내기');
});

test('검색 결과가 자주 묻는 질문이면 그 단원의 질문 탭에서 답을 보여 준다', async ({ page }) => {
  await open(page, { student: true, url: '/#/ask/eng' });
  const msg = await ask(page, '현재완료랑 과거는 뭐가 달라요?');
  await expect(msg).toContainText('비슷한 질문이 있어요.');
  await msg.getByRole('link', { name: '자세히 보기' }).click();
  await waitReady(page);
  await expect(page).toHaveURL(/#\/unit\/eng-m-01\/ask\?faq=0$/);
  await expect(page.locator('.chat > li.msg.t').last()).toContainText('지금과 이어져 있다는 느낌');
});

test('색인을 불러오지 못해도 알리고, 계산 풀이는 계속 된다', async ({ page }) => {
  await open(page, { student: true, url: '/#/ask/math', failIndex: true });
  await expect(page.locator('.index-note')).toBeVisible();
  await expect(page.locator('.index-note')).toContainText('색인을 불러오지 못했어요');
  await expect(page.locator('.index-note').getByRole('button', { name: '다시 시도' })).toBeVisible();
  const msg = await ask(page, '부등식이 뭐예요?');
  await expect(msg).toContainText('색인을 불러오지 못해서');
  const calc = await ask(page, '12와 18의 최대공약수');
  await expect(calc.locator('.sol')).toBeVisible();
});

test('대화는 이 기기에만 글자로 저장된다: 다시 열면 이어 보이고, [대화 기록 지우기] 로 지운다', async ({ page }) => {
  await open(page, { student: true, url: '/#/ask/math' });
  await expect(page.locator('.ask-privacy')).toContainText('대화는 이 기기에만 저장돼요');
  await ask(page, '대화기록시험 2x+3=7');
  await ask(page, '부등식의 성질이 뭐예요?');
  const chat = await readStore(page, 'p.p-test-a.chat');
  expect(chat.math.map((m) => m.who)).toEqual(['me', 't', 'me', 't']);
  expect(chat.math[0].text).toBe('대화기록시험 2x+3=7');
  expect(chat.math[3].text).toContain('부등식의 성질');
  expect(JSON.stringify(chat)).not.toMatch(/<[a-z]/i); // 서식(HTML)은 저장하지 않는다
  // localStorage 에는 남지 않는다(학습 기록은 IndexedDB 에만)
  expect(JSON.stringify(await readLocal(page))).not.toContain('대화기록시험');
  expect(JSON.stringify((await readIDB(page))['p.p-test-a.chat'])).toContain('대화기록시험');

  await page.reload();
  await waitReady(page);
  await expect(page.locator('.chat > li.msg.me')).toHaveCount(2);
  await expect(page.locator('.chat > li.msg.me').first()).toHaveText(/대화기록시험/);
  await expect(page.locator('.chat .chat-sep')).toHaveText('지난 대화');
  await expect(page.locator('.chat > li.msg.t.past').last()).toContainText('부등식의 성질');

  // 다른 과목 질문 화면에는 나오지 않는다
  await goHash(page, '#/ask/eng');
  await expect(page.locator('.chat > li.msg.me')).toHaveCount(0);

  await goHash(page, '#/ask/math');
  await page.getByRole('button', { name: '대화 기록 지우기' }).click();
  await expect(page.getByRole('dialog')).toContainText('대화 기록을 지울까요?');
  await page.getByRole('dialog').getByRole('button', { name: '지우기' }).click();
  await expect(page.locator('.chat > li.msg.me')).toHaveCount(0);
  await expect(page.locator('.chat .chat-sep')).toHaveCount(0);
  expect(await readStore(page, 'p.p-test-a.chat')).toBeNull();
  await page.reload();
  await waitReady(page);
  await expect(page.locator('.chat > li.msg.me')).toHaveCount(0);
});

test('질문 색인: 과정이 없으면 학생의 학교급 색인, 그 파일이 없으면 과목 이름 색인으로 한 번 더', async ({ page }) => {
  // 고등학생: 고등 수학 과정이 없어 data/index/math-high.js 를 찾고(없음) → data/index/math.js
  const high = { id: 'p-high', name: '지아', avatar: '🐰', level: 'high', grade: 'h1', pace: 'normal', created: 1 };
  const calls = await open(page, { student: high, url: '/#/ask/math' });
  const msg = await ask(page, '부등식의 성질이 뭐예요?');
  await expect(msg.locator('.found-title')).toHaveText('부등식의 성질');
  expect(calls.index).toEqual(['math-high', 'math']);
  await expect(page.locator('.index-note')).toBeHidden();
});
