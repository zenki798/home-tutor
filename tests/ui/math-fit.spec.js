const { test, expect } = require('@playwright/test');
const { open, horizontalOverflow } = require('./helpers');

/*
 * 좁은 화면의 긴 수식 (docs/ARCHITECTURE.md §16): 괄호·분수 안처럼 줄을 바꿀 수 없는 수식이 글 칸보다 넓으면
 * 조금 넓을 때는 그 수식의 글자를 0.8배까지 줄여 칸에 맞추고, 그래도 넓으면 그 수식만 한 줄로 떼어 옆으로 밀어 본다.
 * 짧은 수식은 그대로이고, 칸이 넓어지면 원래대로 돌아오며, 숨어 있던 칸은 보일 때, 칸이 좁아지면(채점 뒤 정답 표시) 다시 맞춘다.
 */

// 분자에 항이 n 개인 분수 — 분수 안이라 줄을 바꿀 수 없다
const FRAC = (n) => '$\\frac{' + Array.from({ length: n }, (_, i) => (i + 1) + '\\times ' + (i + 2)).join('+') + '}{9}$';

// 개념 카드에 글 칸을 붙이고, 분자 항 수를 늘려 가며 "칸 너비 ÷ 원래 크기의 너비"가 알맞은 분수를 고른다.
// 붙이자마자(맞춤은 다음 화면 그리기 때) 재므로 원래 크기를 잰다. 글꼴이 달라도(크롬·사파리) 같은 비율을 고른다
async function addFormulas(page) {
  return page.evaluate((src) => {
    const frac = new Function('n', 'return (' + src + ')(n)');
    const card = document.querySelector('.concept-card:not([hidden])');
    const host = document.createElement('div');
    host.className = 'rich cc-body fit-host';
    const ns = Array.from({ length: 24 }, (_, i) => i + 1);
    host.innerHTML = ns.map((n) => '<div data-n="' + n + '">' + TutorText.render('늘어놓으면 ' + frac(n) + '입니다.') + '</div>').join('');
    card.appendChild(host);
    const box = host.querySelector('.rt') || host;
    const cs = getComputedStyle(box);
    const room = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const need = {};
    for (const n of ns) need[n] = host.querySelector('[data-n="' + n + '"] .mt-in').getBoundingClientRect().width;
    const pick = (lo, hi) => ns.find((n) => room / need[n] >= lo && room / need[n] < hi);
    const chosen = { short: 1, shrink: pick(0.84, 0.97), scroll: pick(0.3, 0.7) };
    host.innerHTML = Object.keys(chosen).map((k) => '<div data-k="' + k + '">' + TutorText.render('늘어놓으면 ' + frac(chosen[k]) + '입니다.') + '</div>').join('');
    return { room, chosen, need: { short: need[chosen.short], shrink: need[chosen.shrink], scroll: need[chosen.scroll] } };
  }, FRAC.toString());
}

// 수식마다: 맞춤 상태, 줄을 바꿀 수 없는 덩어리의 오른쪽 끝이 글 칸 안인지, 옆으로 밀 수 있는지
async function fitState(page, sel = '.fit-host') {
  return page.evaluate((s) => {
    const out = {};
    for (const el of document.querySelectorAll(s + ' [data-k]')) {
      const m = el.querySelector('.mt');
      const box = el.querySelector('.rt') || el;
      const b = box.getBoundingClientRect();
      const cs = getComputedStyle(box);
      const right = b.right - parseFloat(cs.paddingRight);
      const mr = m.getBoundingClientRect();
      const inner = m.querySelector('.mt-in').getBoundingClientRect();
      out[el.getAttribute('data-k')] = {
        fit: m.classList.contains('mt-fit'),
        shrunk: m.style.fontSize !== '',
        tab: m.getAttribute('tabindex'),
        inside: (m.classList.contains('mt-fit') ? mr.right : inner.right) <= right + 1,
        scrolls: m.scrollWidth > m.clientWidth + 1,
      };
    }
    return out;
  }, sel);
}

const twoFrames = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));

test.describe('좁은 화면의 긴 수식 (§16)', () => {
  test('360px: 조금 넓은 수식은 글자를 줄여 칸에 맞추고, 아주 넓은 수식은 그 수식만 옆으로 밀며, 짧은 수식은 그대로다', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page, { student: true, url: '/#/unit/math-m2-01/learn' });
    const info = await addFormulas(page);
    expect(info.chosen.shrink, JSON.stringify(info)).toBeTruthy();
    expect(info.chosen.scroll, JSON.stringify(info)).toBeTruthy();
    await expect.poll(() => fitState(page)).toEqual({
      short: { fit: false, shrunk: false, tab: null, inside: true, scrolls: false },
      shrink: { fit: false, shrunk: true, tab: null, inside: true, scrolls: false },
      scroll: { fit: true, shrunk: false, tab: '0', inside: true, scrolls: true },
    });
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
    // 옆으로 미는 수식도 화면이 읽는 이름(평문)은 그대로
    await expect(page.locator('.fit-host [data-k="scroll"] .mt')).toHaveAttribute('role', 'math');
    // 다시 재도 그대로다(맞춘 수식을 원래 크기로 되돌려 센다)
    await page.evaluate(() => document.querySelector('.fit-host').classList.add('again'));
    await twoFrames(page);
    const again = await fitState(page);
    expect(again.shrink.shrunk).toBe(true);
    expect(again.scroll.fit).toBe(true);
  });

  test('칸이 넓어지면(화면 돌리기·넓은 화면) 원래 크기로 돌아온다', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page, { student: true, url: '/#/unit/math-m2-01/learn' });
    const info = await addFormulas(page);
    await expect.poll(async () => (await fitState(page)).shrink.shrunk).toBe(true);
    await page.setViewportSize({ width: 1280, height: 800 });
    const room = await page.evaluate(() => {
      const box = document.querySelector('.fit-host [data-k="shrink"] .rt') || document.querySelector('.fit-host [data-k="shrink"]');
      const cs = getComputedStyle(box);
      return box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    });
    expect(room, '넓은 화면의 칸이 줄인 수식보다 넓어야 시험이 뜻이 있다').toBeGreaterThan(info.need.shrink + 2);
    await expect.poll(async () => {
      const s = await fitState(page);
      return { shrunk: s.shrink.shrunk, fit: s.shrink.fit, inside: s.shrink.inside };
    }).toEqual({ shrunk: false, fit: false, inside: true });
    // 짧은 수식은 그대로, 아주 넓은 수식도 (넓은 칸에 맞게 다시 맞춰져) 칸 밖으로 나가지 않는다
    const s = await fitState(page);
    expect(s.short).toEqual({ fit: false, shrunk: false, tab: null, inside: true, scrolls: false });
    expect(s.scroll.inside).toBe(true);
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
  });

  test('숨은 칸의 수식은 보일 때 맞춘다 (펼치기·채점 뒤 해설)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page, { student: true, url: '/#/unit/math-m2-01/learn' });
    const info = await addFormulas(page);
    await page.evaluate(({ src, n }) => {
      const frac = new Function('n', 'return (' + src + ')(n)');
      const box = document.createElement('div');
      box.className = 'rich cc-body fit-hidden';
      box.hidden = true;
      box.innerHTML = '<div data-k="scroll">' + TutorText.render('늘어놓으면 ' + frac(n) + '입니다.') + '</div>';
      document.querySelector('.concept-card:not([hidden])').appendChild(box);
    }, { src: FRAC.toString(), n: info.chosen.scroll });
    // 숨어 있는 동안에는 잴 수 없으니 그대로 둔다
    await twoFrames(page);
    expect(await page.locator('.fit-hidden .mt.mt-fit').count()).toBe(0);
    await page.evaluate(() => { document.querySelector('.fit-hidden').hidden = false; });
    await expect.poll(async () => (await fitState(page, '.fit-hidden')).scroll).toEqual({ fit: true, shrunk: false, tab: '0', inside: true, scrolls: true });
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
  });

  test('보기 단추(격자) 안의 긴 수식도 문제 카드 밖으로 나가지 않고, 채점 뒤 정답 표시가 붙어 칸이 좁아지면 다시 맞춘다', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page, { student: true, url: '/#/unit/math-m2-01/learn' });
    // 보기는 화면처럼 줄 안 수식으로 그린다(E.inline) — 수식만 있는 글을 render 하면 가운데 블록 수식이 되어 원래 옆으로 민다
    await page.evaluate((src) => {
      const frac = new Function('n', 'return (' + src + ')(n)');
      const card = document.createElement('div');
      card.className = 'problem fit-card';
      card.innerHTML = '<fieldset class="choices"><legend class="sr-only">보기</legend>' + [3, 7, 9, 16].map((n, i) =>
        '<label class="choice"><input type="radio" name="fitc"><span class="c-num">' + (i + 1) + '</span>' +
        '<span class="c-text">' + TutorText.inline(frac(n)) + '</span><span class="c-mark"></span></label>').join('') + '</fieldset>';
      document.querySelector('.concept-card:not([hidden])').appendChild(card);
    }, FRAC.toString());
    // 문제 카드 안쪽 오른쪽 끝을 넘는 보기 단추·수식이 없고, 수식이 정답 표시에 겹치지 않는다 (옆으로 미는 수식은 그 상자를 본다)
    const inside = () => page.evaluate(() => {
      const card = document.querySelector('.fit-card');
      const cs = getComputedStyle(card);
      const right = card.getBoundingClientRect().right - parseFloat(cs.borderRightWidth) - parseFloat(cs.paddingRight);
      const bad = [];
      document.querySelectorAll('.fit-card .choice').forEach((l, i) => {
        if (l.getBoundingClientRect().right > right + 1) bad.push('보기 ' + (i + 1));
        const m = l.querySelector('.mt');
        const mark = l.querySelector('.c-mark').getBoundingClientRect();
        const end = m.classList.contains('mt-fit') ? m.getBoundingClientRect().right : m.querySelector('.mt-in').getBoundingClientRect().right;
        if (end > right + 1) bad.push('수식 ' + (i + 1));
        if (mark.width && end > mark.left + 1) bad.push('정답 표시에 겹침 ' + (i + 1));
      });
      return bad;
    });
    await expect.poll(inside).toEqual([]);
    expect(await page.locator('.fit-card .mt-fit').count()).toBeGreaterThan(0); // 16항짜리는 옆으로 민다
    expect(await page.locator('.fit-card .mt[tabindex]').count()).toBe(0);    // 보기 단추 안에서는 단추가 초점을 받는다
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
    // 채점: 보기마다 오른쪽에 정답·오답 표시가 붙어 수식 칸이 좁아진다 → 다시 맞춘다
    await page.evaluate(() => document.querySelectorAll('.fit-card .c-mark').forEach((x, i) => { x.textContent = i ? '오답' : '정답'; }));
    await expect.poll(inside).toEqual([]);
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
  });
});
