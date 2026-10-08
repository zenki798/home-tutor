// TutorFig (js/figures.js) — 학습 그림 SVG 엔진 검사. 브라우저 없이 require 해서 본다.
const { test, expect } = require('@playwright/test');
const F = require('../../js/figures.js');

/* ── 도우미 ── */

// 간단한 태그 스택 파서: 여는 태그·닫는 태그 짝이 맞고, 맨 바깥이 <svg> 하나인지
function tagReport(svg) {
  const stack = [];
  const re = /<(\/?)([a-zA-Z][\w:.-]*)\b[^>]*?(\/?)>/g;
  let m, roots = 0;
  while ((m = re.exec(svg))) {
    const closing = m[1] === '/', name = m[2], selfClose = m[3] === '/';
    if (closing) {
      const top = stack.pop();
      if (top !== name) return { ok: false, why: '닫는 태그 </' + name + '> 의 짝이 ' + top };
    } else if (!selfClose) {
      if (stack.length === 0) roots++;
      stack.push(name);
    } else if (stack.length === 0) roots++;
  }
  if (stack.length) return { ok: false, why: '안 닫힌 태그: ' + stack.join(',') };
  return { ok: roots === 1, why: '맨 바깥 요소 수 ' + roots };
}
function count(s, needle) { return s.split(needle).length - 1; }
function rootTag(svg) { return /^<svg\b[^>]*>/.exec(svg)[0]; }
function rootAttr(svg, name) {
  const m = new RegExp('\\s' + name + '="([^"]*)"').exec(rootTag(svg));
  return m ? m[1] : null;
}
function viewBox(svg) { return rootAttr(svg, 'viewBox').split(/\s+/).map(Number); }
// class 가 정확히 그 이름인 요소 수 (fig-cell 과 fig-cell fig-on 을 구분)
function countClass(svg, cls) {
  return (svg.match(/class="([^"]*)"/g) || []).filter((c) => c.slice(7, -1).split(' ').indexOf(cls) >= 0).length;
}
/* 보조선 이름표(fig-seg-label)가 도형의 변(fig-shape)·보조선(fig-seg)을 가로지르거나 서로 겹치는 곳 — 엔진과 같은 글자 폭 어림으로 */
function segLabelHits(svg) {
  const num = (a, k) => Number((new RegExp('\\s' + k + '="(-?[\\d.]+)"').exec(a) || [])[1]);
  const lines = [];
  for (const m of svg.matchAll(/<line\b([^>]*)\/>/g)) {
    if (/class="fig-seg"/.test(m[1])) lines.push([[num(m[1], 'x1'), num(m[1], 'y1')], [num(m[1], 'x2'), num(m[1], 'y2')]]);
  }
  for (const m of svg.matchAll(/<path\b([^>]*)\/>/g)) {
    if (!/class="fig-shape"/.test(m[1])) continue;
    const pts = [.../\sd="([^"]*)"/.exec(m[1])[1].matchAll(/[ML](-?[\d.]+) (-?[\d.]+)/g)].map((q) => [Number(q[1]), Number(q[2])]);
    pts.forEach((p, i) => lines.push([p, pts[(i + 1) % pts.length]]));
  }
  const boxes = texts(svg, 'fig-seg-label').map((t) => {
    const size = num(t.attrs, 'font-size'), w = F.textWidth(t.text, size);
    return { text: t.text, x1: t.x - w / 2, x2: t.x + w / 2, y1: t.y - size * 0.5, y2: t.y + size * 0.5 };
  });
  // 선분이 상자를 지나는가 (Liang–Barsky)
  const cross = (a, b, r) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], p = [-dx, dx, -dy, dy], q = [a[0] - r.x1, r.x2 - a[0], a[1] - r.y1, r.y2 - a[1]];
    let t0 = 0, t1 = 1;
    for (let i = 0; i < 4; i++) {
      if (p[i] === 0) { if (q[i] < 0) return false; continue; }
      const t = q[i] / p[i];
      if (p[i] < 0) { if (t > t1) return false; if (t > t0) t0 = t; } else { if (t < t0) return false; if (t < t1) t1 = t; }
    }
    return true;
  };
  const out = [];
  boxes.forEach((r, i) => {
    if (lines.some(([a, b]) => cross(a, b, r))) out.push(r.text + ' × 선');
    boxes.forEach((q, j) => { if (j > i && r.x1 < q.x2 && q.x1 < r.x2 && r.y1 < q.y2 && q.y1 < r.y2) out.push(r.text + ' × ' + q.text); });
  });
  return out;
}

function texts(svg, cls) {
  const out = [];
  const re = /<text\b([^>]*)>([^<]*)<\/text>/g;
  let m;
  while ((m = re.exec(svg))) {
    if (cls && !new RegExp('class="[^"]*\\b' + cls + '\\b').test(m[1])) continue;
    const x = Number((/\sx="([^"]+)"/.exec(m[1]) || [])[1]), y = Number((/\sy="([^"]+)"/.exec(m[1]) || [])[1]);
    out.push({ x, y, text: m[2], attrs: m[1] });
  }
  return out;
}
function lineOf(svg, cls) {
  const m = new RegExp('<line ([^>]*class="' + cls + '"[^>]*)/>').exec(svg);
  const g = (k) => Number(new RegExp('\\b' + k + '="([^"]+)"').exec(m[1])[1]);
  return { x1: g('x1'), y1: g('y1'), x2: g('x2'), y2: g('y2') };
}
const isError = (svg) => /class="fig fig-error"/.test(svg) && svg.indexOf('그림을 그릴 수 없어요') > 0;

/* ── 모든 type 의 대표 그림 ── */
const SAMPLES = {
  clock: { type: 'clock', h: 3, m: 30 },
  numberline: { type: 'numberline', min: -5, max: 5, step: 1, points: [{ x: 2, label: 'A' }, { x: -3, open: true }], ranges: [{ from: 1, to: Infinity, fromOpen: true }], arrows: [{ from: 0, to: 3, label: '+3' }] },
  fraction: { type: 'fraction', shape: 'bar', n: 3, d: 4 },
  coord: { type: 'coord', fns: [{ expr: '2x+1', label: 'y=2x+1' }], points: [{ x: 1, y: 3, label: 'A' }], segments: [{ from: [1, 0], to: [1, 3], dashed: true }] },
  polygon: { type: 'polygon', points: [[0, 0], [4, 0], [0, 3]], labels: ['A', 'B', 'C'], sides: ['4cm', '5cm', '3cm'], angles: [{ at: 0, right: true }, { at: 1, label: '37°' }] },
  circle: { type: 'circle', r: '3cm', showCenter: true, showRadius: true, label: 'O' },
  angle: { type: 'angle', deg: 60 },
  bars: { type: 'bars', labels: ['사과', '배', '포도'], values: [5, 3, 8], unit: '명', title: '좋아하는 과일' },
  line: { type: 'line', labels: ['1월', '2월', '3월', '4월'], values: [3, 5, 4, 8], unit: '권' },
  pie: { type: 'pie', labels: ['독서', '운동', '게임', '음악'], values: [40, 30, 20, 10], title: '취미' },
  blocks: { type: 'blocks', hundreds: 2, tens: 3, ones: 4 },
  cuboid: { type: 'cuboid', w: 5, h: 3, d: 4, labels: { w: '5cm', h: '3cm', d: '4cm' } },
  svg: { type: 'svg', svg: '<svg viewBox="0 0 300 150" width="600" height="300"><rect x="10" y="10" width="280" height="130" fill="none" stroke="currentColor"/></svg>', alt: '네모 그림' },
};

test.describe('TutorFig 공통 형식', () => {
  test('type 목록에 계약의 13가지가 모두 있다', () => {
    expect(F.types.slice().sort()).toEqual(Object.keys(SAMPLES).sort());
    expect(typeof F.render).toBe('function');
    expect(typeof F.check).toBe('function');
  });

  for (const type of Object.keys(SAMPLES)) {
    test(type + ': <svg 로 시작, viewBox·role·aria-label, 태그 짝, 크기 속성 없음', () => {
      const spec = SAMPLES[type];
      expect(F.check(spec)).toEqual([]);
      const svg = F.render(spec);
      expect(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"')).toBe(true);
      expect(svg.endsWith('</svg>')).toBe(true);
      const vb = viewBox(svg);
      expect(vb).toHaveLength(4);
      expect(vb.every(Number.isFinite)).toBe(true);
      expect(vb[2]).toBeGreaterThan(0);
      expect(vb[3]).toBeGreaterThan(0);
      expect(rootAttr(svg, 'class')).toBe('fig fig-' + type);
      expect(rootAttr(svg, 'role')).toBe('img');
      expect((rootAttr(svg, 'aria-label') || '').length).toBeGreaterThan(1);
      expect(rootAttr(svg, 'width')).toBeNull();
      expect(rootAttr(svg, 'height')).toBeNull();
      const rep = tagReport(svg);
      expect(rep.ok, rep.why).toBe(true);
      // 한 화면에 여러 그림이 있어도 부딪히지 않게 id 를 쓰지 않는다 · 글꼴은 물려받는다 · 계산 찌꺼기 없음
      expect(svg).not.toMatch(/\sid="/);
      expect(svg).not.toMatch(/font-family/);
      expect(svg).not.toMatch(/NaN|undefined|Infinity/);
      expect(svg.length).toBeLessThan(20000);
      // 같은 spec → 같은 그림
      expect(F.render(spec)).toBe(svg);
    });
  }

  test('선·글자는 currentColor, 강조색은 CSS 변수(기본값 포함)', () => {
    const all = Object.keys(SAMPLES).map((t) => F.render(SAMPLES[t])).join('');
    expect(all).toMatch(/stroke="currentColor"/);
    expect(all).toMatch(/fill="currentColor"/);
    expect(all).toMatch(/var\(--fig-1, #2563eb\)/);
    expect(all).toMatch(/var\(--fig-2, #f59e0b\)/);
    // 색 코드를 직접 박지 않는다 (CSS 변수의 기본값 말고는)
    const bare = all.replace(/var\(--fig-\d, #[0-9a-f]{6}\)/g, '');
    expect(bare).not.toMatch(/#[0-9a-fA-F]{6}\b/);
  });

  test('size: 원래 크기(viewBox 너비·높이) — 작은 그림도 너무 작게 잡히지 않는다', () => {
    expect(F.size(F.render({ type: 'clock', h: 1 }))).toEqual({ w: 240, h: 240 });
    const b = F.size(F.render({ type: 'blocks', ones: 1 }));
    expect(b.w).toBeGreaterThanOrEqual(200);
    expect(b.h).toBeGreaterThanOrEqual(100);
    expect(F.size('<div></div>')).toBeNull();
    for (const t of Object.keys(SAMPLES)) {
      const z = F.size(F.render(SAMPLES[t]));
      expect(z.w, t).toBeGreaterThanOrEqual(100);
      expect(z.w, t).toBeLessThanOrEqual(520);
    }
  });

  test('alt 를 주면 aria-label 로 쓴다 (이스케이프)', () => {
    const svg = F.render({ type: 'clock', h: 9, m: 0, alt: '아홉 시 "정각" <시계>' });
    expect(rootAttr(svg, 'aria-label')).toBe('아홉 시 &quot;정각&quot; &lt;시계&gt;');
  });
});

test.describe('시계 clock', () => {
  test('숫자 1~12, 분 눈금 60개(굵은 12 + 가는 48)', () => {
    const svg = F.render({ type: 'clock', h: 3, m: 30 });
    const nums = texts(svg, 'fig-num').map((t) => t.text);
    expect(nums).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
    const minor = /<path d="([^"]+)"[^>]*class="fig-tick"/.exec(svg)[1];
    const major = /<path d="([^"]+)"[^>]*class="fig-tick fig-tick-major"/.exec(svg)[1];
    expect(count(minor, 'M')).toBe(48);
    expect(count(major, 'M')).toBe(12);
  });

  test('3시 30분: 시침은 3과 4 사이, 분침은 6, 분침이 더 길다', () => {
    const svg = F.render({ type: 'clock', h: 3, m: 30 });
    const ang = (l) => ((Math.atan2(l.x2 - 120, 120 - l.y2) * 180) / Math.PI + 360) % 360;
    const len = (l) => Math.hypot(l.x2 - 120, l.y2 - 120);
    const hour = lineOf(svg, 'fig-hour'), minute = lineOf(svg, 'fig-minute');
    expect(ang(hour)).toBeGreaterThan(90);
    expect(ang(hour)).toBeLessThan(120);
    expect(Math.abs(ang(hour) - 105)).toBeLessThan(1);
    expect(Math.abs(ang(minute) - 180)).toBeLessThan(1);
    expect(len(minute)).toBeGreaterThan(len(hour) * 1.3);
    expect(rootAttr(svg, 'aria-label')).toBe('3시 30분을 가리키는 시계');
  });

  test('오후 시각·정각 설명, showNumbers:false 면 숫자 없음', () => {
    expect(F.describe({ type: 'clock', h: 15, m: 5 })).toBe('오후 3시 5분을 가리키는 시계');
    expect(F.describe({ type: 'clock', h: 12, m: 0 })).toBe('12시를 가리키는 시계');
    const svg = F.render({ type: 'clock', h: 10, m: 10, showNumbers: false });
    expect(countClass(svg, 'fig-num')).toBe(0);
  });
});

test.describe('수직선 numberline', () => {
  test('넓은 범위도 눈금 글자가 겹치지 않는다 (0~1000, 1칸마다)', () => {
    const svg = F.render({ type: 'numberline', min: 0, max: 1000, step: 1 });
    const labs = texts(svg, 'fig-tick-label');
    expect(labs.length).toBeGreaterThan(3);
    expect(labs.length).toBeLessThan(30);
    for (let i = 1; i < labs.length; i++) {
      const w = (t) => t.text.length * 13 * 0.62;
      expect(labs[i].x - labs[i - 1].x).toBeGreaterThan((w(labs[i]) + w(labs[i - 1])) / 2);
    }
    // 0 에 맞춘 보기 좋은 수에 글자를 단다
    expect(labs[0].text).toBe('0');
    expect(labs.map((t) => Number(t.text.replace(/,/g, ''))).every((v) => v % 50 === 0)).toBe(true);
  });

  test('열린 점·닫힌 점, 범위의 끝없는 쪽은 화살표', () => {
    const svg = F.render({ type: 'numberline', min: -3, max: 5, ranges: [{ from: -1, to: Infinity, fromOpen: true }, { from: -Infinity, to: 3 }] });
    expect(countClass(svg, 'fig-range')).toBe(2);
    expect(countClass(svg, 'fig-open')).toBe(1);
    expect(countClass(svg, 'fig-dot')).toBe(2);
    expect(rootAttr(svg, 'aria-label')).toContain('-1 초과');
    expect(rootAttr(svg, 'aria-label')).toContain('3 이하');
  });

  test('뛰어 세기 화살표와 이름', () => {
    const svg = F.render({ type: 'numberline', min: 0, max: 10, arrows: [{ from: 0, to: 3, label: '+3' }, { from: 3, to: 7, label: '+4' }] });
    expect(countClass(svg, 'fig-jump')).toBe(2);
    expect(texts(svg, 'fig-jump-label').map((t) => t.text)).toEqual(['+3', '+4']);
  });

  test('음수 눈금은 진짜 빼기 기호(−), 큰 수는 콤마를 같은 꼴로', () => {
    const svg = F.render({ type: 'numberline', min: -10000, max: 10000, step: 1000 });
    const labs = texts(svg, 'fig-tick-label').map((t) => t.text);
    expect(labs).toContain('−10,000');
    expect(labs).toContain('0');
    expect(labs.filter((t) => /^−?\d{4,}$/.test(t))).toEqual([]);
  });

  test('fractions:true 면 1/k 칸 눈금을 분수로 (약분하지 않음, 정수는 정수로)', () => {
    const svg = F.render({ type: 'numberline', min: 0, max: 2, step: 1 / 4, fractions: true });
    expect(F.check({ type: 'numberline', min: 0, max: 2, step: 1 / 4, fractions: true })).toEqual([]);
    const fr = svg.match(/<g class="fig-tick-label fig-frac">.*?<\/g>/g).map((g) => g.match(/>([^<>]+)<\/text>/g).map((t) => t.slice(1, -7)).join('/'));
    expect(fr).toEqual(['1/4', '2/4', '3/4', '5/4', '6/4', '7/4']);
    expect(texts(svg, 'fig-tick-label').map((t) => t.text)).toEqual(['0', '1', '2']);
    expect(tagReport(svg).ok).toBe(true);
    // 끝없는 소수 칸이면서 fractions 가 없으면 소수 넷째 자리까지만
    const dec = texts(F.render({ type: 'numberline', min: 0, max: 1, step: 1 / 3 }), 'fig-tick-label').map((t) => t.text);
    expect(dec).toEqual(['0', '0.3333', '0.6667', '1']);
  });
});

test.describe('분수 모형 fraction', () => {
  test('막대: d 칸 중 n 칸 색칠', () => {
    const svg = F.render({ type: 'fraction', shape: 'bar', n: 3, d: 4 });
    expect(countClass(svg, 'fig-cell')).toBe(4);
    expect(countClass(svg, 'fig-on')).toBe(3);
    expect(rootAttr(svg, 'aria-label')).toBe('4칸 중 3칸을 색칠한 막대');
  });

  test('가분수 7/4: 모형 2개를 자동으로 나란히', () => {
    const svg = F.render({ type: 'fraction', shape: 'bar', n: 7, d: 4 });
    expect(countClass(svg, 'fig-whole')).toBe(2);
    expect(countClass(svg, 'fig-cell')).toBe(8);
    expect(countClass(svg, 'fig-on')).toBe(7);
  });

  test('원: 8조각 중 3조각, whole 로 모형 수 지정', () => {
    const svg = F.render({ type: 'fraction', shape: 'circle', n: 3, d: 8 });
    expect(countClass(svg, 'fig-cell')).toBe(8);
    expect(countClass(svg, 'fig-on')).toBe(3);
    const two = F.render({ type: 'fraction', shape: 'circle', n: 1, d: 2, whole: 3 });
    expect(countClass(two, 'fig-whole')).toBe(3);
    expect(countClass(two, 'fig-on')).toBe(1);
  });
});

test.describe('좌표평면 coord · 식 계산기', () => {
  test('계산기: 암묵적 곱·거듭제곱·괄호·sqrt·abs·소수·분수', () => {
    const v = (e, x) => F.compile(e)(x);
    expect(v('2x+1', 2)).toBe(5);
    expect(v('y = 3(x-1)', 4)).toBe(9);
    expect(v('(x+1)(x-1)', 3)).toBe(8);
    expect(v('-x^2', 3)).toBe(-9);
    expect(v('2^-1', 0)).toBe(0.5);
    expect(v('x^2^3', 2)).toBe(256);
    expect(v('1/2x', 4)).toBe(2);
    expect(v('0.5x+1.5', 1)).toBe(2);
    expect(v('sqrt(x-1)+1', 5)).toBe(3);
    expect(v('√x', 9)).toBe(3);
    expect(v('abs(x-3)', 1)).toBe(2);
    expect(v('|x|+|x-2|', 3)).toBe(4);
    expect(v('2|x|', -3)).toBe(6);
    expect(v('x²−3x', 2)).toBe(-2);
    expect(v('f(x)=x³', 2)).toBe(8);
    expect(v('6÷x×2', 3)).toBe(4);
    expect(v('{2[x+1]}', 1)).toBe(4);
    expect(v('x^(1/3)', -8)).toBeCloseTo(-2, 9);
    expect(v('2pi', 0)).toBeCloseTo(2 * Math.PI, 12);
    expect(Number.isNaN(v('sqrt(x)', -1))).toBe(true);
  });

  test('계산기: 못 읽는 식은 한국어 오류', () => {
    for (const bad of ['', '2x+', '(x+1', 'x+y', '3 4', '2**x', 'x=']) {
      expect(() => F.compile(bad), bad).toThrow();
    }
    try { F.compile('x+y'); } catch (e) { expect(e.message).toMatch(/[가-힣]/); }
  });

  test('그래프는 path, 점·라벨, 원점 O, 축 이름', () => {
    const svg = F.render(SAMPLES.coord);
    expect(countClass(svg, 'fig-fn')).toBe(1);
    expect(countClass(svg, 'fig-pt')).toBe(1);
    expect(countClass(svg, 'fig-seg')).toBe(1);
    expect(texts(svg, 'fig-origin').map((t) => t.text)).toEqual(['O']);
    expect(texts(svg, 'fig-axis-label').map((t) => t.text).sort()).toEqual(['x', 'y']);
    expect(rootAttr(svg, 'aria-label')).toBe('좌표평면 위의 y=2x+1 그래프, 점 A (1, 3)');
  });

  test('그래프는 그림 범위 밖으로 나가지 않고, 분모 0 근처에서 끊긴다 (y=1/x)', () => {
    const svg = F.render({ type: 'coord', xmin: -4, xmax: 4, ymin: -4, ymax: 4, fns: [{ expr: '1/x' }] });
    const d = /<path d="([^"]+)"[^>]*class="fig-fn"/.exec(svg)[1];
    expect(count(d, 'M')).toBe(2);   // 두 가지(가지마다 한 조각)
    const nums = d.replace(/[ML]/g, ' ').trim().split(/\s+/).map(Number);
    for (let i = 0; i < nums.length; i += 2) {
      expect(nums[i]).toBeGreaterThanOrEqual(-0.05);
      expect(nums[i]).toBeLessThanOrEqual(300.05);
      expect(nums[i + 1]).toBeGreaterThanOrEqual(-0.05);
      expect(nums[i + 1]).toBeLessThanOrEqual(300.05);
    }
  });

  test('원점이 그림 밖이면 축을 가장자리에 두고 0 을 그대로 쓴다', () => {
    const svg = F.render({ type: 'coord', xmin: 1, xmax: 10, ymin: -5, ymax: 5, fns: [{ expr: 'x-3' }] });
    expect(countClass(svg, 'fig-origin')).toBe(0);
    expect(texts(svg, 'fig-tick-label').map((t) => t.text)).toContain('0');
    expect(tagReport(svg).ok).toBe(true);
  });

  test('정의역 끝까지 잇는다 (y=√(x−1)+1 은 (1, 1) 에서 시작)', () => {
    const svg = F.render({ type: 'coord', xmin: -1, xmax: 7, ymin: -1, ymax: 5, fns: [{ expr: 'sqrt(x-1)+1' }] });
    const d = /<path d="([^"]+)"[^>]*class="fig-fn"/.exec(svg)[1];
    const first = d.slice(1).split('L')[0].split(' ').map(Number);
    // 화면 좌표: x=1 → (1+1)×37.5 = 75, y=1 → (5−1)×37.5 = 150
    expect(Math.abs(first[0] - 75)).toBeLessThan(0.6);
    expect(Math.abs(first[1] - 150)).toBeLessThan(0.6);
  });
});

test.describe('도형·그래프·수 모형', () => {
  test('다각형: 꼭짓점·변 이름, 직각 표시, 각 호', () => {
    const svg = F.render(SAMPLES.polygon);
    expect(texts(svg, 'fig-vertex-label').map((t) => t.text)).toEqual(['A', 'B', 'C']);
    expect(texts(svg, 'fig-side-label').map((t) => t.text)).toEqual(['4cm', '5cm', '3cm']);
    expect(countClass(svg, 'fig-right')).toBe(1);
    expect(countClass(svg, 'fig-arc')).toBe(1);
    expect(rootAttr(svg, 'aria-label')).toContain('삼각형 ABC');
    // 꼭짓점 이름은 도형 바깥: A 는 왼쪽 아래, B 는 오른쪽, C 는 위
    const L = Object.fromEntries(texts(svg, 'fig-vertex-label').map((t) => [t.text, t]));
    expect(L.A.x).toBeLessThan(L.B.x);
    expect(L.C.y).toBeLessThan(L.A.y);
  });

  test('다각형: 높이 선분(점선)과 그 발의 직각 표시, 선분 이름', () => {
    const spec = { type: 'polygon', points: [[0, 0], [6, 0], [8, 3], [2, 3]], fill: true,
      segments: [{ from: [2, 3], to: [2, 0], dashed: true, label: '3cm', right: true }] };
    expect(F.check(spec)).toEqual([]);
    const svg = F.render(spec);
    expect(countClass(svg, 'fig-seg')).toBe(1);
    expect(countClass(svg, 'fig-right')).toBe(1);
    expect(texts(svg, 'fig-seg-label').map((t) => t.text)).toEqual(['3cm']);
    expect(svg).toMatch(/fill-opacity="0.14"/);
  });

  test('다각형: 보조선 이름은 변·다른 보조선·다른 이름과 겹치지 않는 자리로 (마름모의 두 대각선 · 변 가까운 높이) — 겹치지 않던 이름은 예전 자리', () => {
    // 마름모: 두 대각선이 가운데서 만나, 두 이름이 가운데에 포개지고 다른 대각선을 가로지르던 것
    const rhombus = { type: 'polygon', points: [[0, 4], [5, 8], [10, 4], [5, 0]],
      segments: [{ from: [0, 4], to: [10, 4], dashed: true, label: '10 cm' }, { from: [5, 8], to: [5, 0], dashed: true, label: '8 cm' }] };
    // 높이가 오른쪽 변 가까이: 오른쪽에 두면 변을 가로지르던 것
    const tri = { type: 'polygon', points: [[0, 0], [4, 0], [3, 8]], sides: ['4 cm', null, null],
      segments: [{ from: [3, 8], to: [3, 0], dashed: true, right: true, label: '8 cm' }] };
    for (const spec of [rhombus, tri]) {
      expect(F.check(spec)).toEqual([]);
      expect(segLabelHits(F.render(spec))).toEqual([]);
    }
    expect(texts(F.render(rhombus), 'fig-seg-label').map((t) => t.text).sort()).toEqual(['10 cm', '8 cm']);
    // 겹칠 것이 없으면 예전처럼 선의 오른쪽 가운데(평행사변형의 높이)
    const para = F.render({ type: 'polygon', points: [[0, 0], [6, 0], [8, 3], [2, 3]],
      segments: [{ from: [2, 3], to: [2, 0], dashed: true, label: '3cm', right: true }] });
    const seg = /<line\b[^>]*x1="([\d.]+)" y1="([\d.]+)" x2="[\d.]+" y2="([\d.]+)"[^>]*class="fig-seg"/.exec(para);
    const lab = texts(para, 'fig-seg-label')[0];
    expect(lab.x).toBeGreaterThan(Number(seg[1]));
    expect(Math.abs(lab.y - (Number(seg[2]) + Number(seg[3])) / 2)).toBeLessThan(0.6);
  });

  test('다각형은 임의 단위를 자동 축척한다 (비율 유지)', () => {
    const small = viewBox(F.render({ type: 'polygon', points: [[0, 0], [0.004, 0], [0.004, 0.002], [0, 0.002]] }));
    const big = viewBox(F.render({ type: 'polygon', points: [[0, 0], [4000, 0], [4000, 2000], [0, 2000]] }));
    expect(small[2]).toBeCloseTo(big[2], 5);
    expect(small[3]).toBeCloseTo(big[3], 5);
    expect(big[2]).toBeGreaterThan(200);
    expect(big[2]).toBeLessThan(400);
  });

  test('원·각·직육면체', () => {
    const c = F.render({ type: 'circle', r: '5cm', d: '10cm', showDiameter: true });
    expect(countClass(c, 'fig-radius')).toBe(1);
    expect(countClass(c, 'fig-diameter')).toBe(1);
    expect(F.describe({ type: 'circle', r: '3cm' })).toBe('반지름이 3cm인 원');
    const a = F.render({ type: 'angle', deg: 90 });
    expect(countClass(a, 'fig-right')).toBe(1);
    expect(texts(F.render({ type: 'angle', deg: 135 }), 'fig-angle-label')[0].text).toBe('135°');
    const cu = F.render(SAMPLES.cuboid);
    expect(countClass(cu, 'fig-hidden')).toBe(3);
    expect(cu).toMatch(/stroke-dasharray="5 4"/);
    expect(texts(cu, 'fig-len-label').map((t) => t.text).sort()).toEqual(['3cm', '4cm', '5cm']);
  });

  test('막대그래프: 막대 수, 값·단위·제목, 보기 좋은 눈금(1·2·5×10^k)', () => {
    const svg = F.render({ type: 'bars', labels: ['가', '나', '다', '라'], values: [120, 85, 140, 60], unit: '권', title: '빌린 책' });
    expect(countClass(svg, 'fig-bar')).toBe(4);
    expect(texts(svg, 'fig-val').map((t) => t.text)).toEqual(['120', '85', '140', '60']);
    expect(texts(svg, 'fig-unit')[0].text).toBe('(권)');
    expect(texts(svg, 'fig-title')[0].text).toBe('빌린 책');
    const ticks = texts(svg, 'fig-tick-label').map((t) => Number(t.text));
    const step = ticks[1] - ticks[0];
    expect([1, 2, 5].indexOf(step / Math.pow(10, Math.floor(Math.log10(step))))).toBeGreaterThanOrEqual(0);
    expect(Math.max(...ticks)).toBeGreaterThanOrEqual(140);
    const h = F.render({ type: 'bars', labels: ['가', '나'], values: [3, 5], horizontal: true, showValues: false });
    expect(countClass(h, 'fig-bar')).toBe(2);
    expect(countClass(h, 'fig-val')).toBe(0);
  });

  test('꺾은선그래프: 점 수, 0 에서 먼 값은 물결선', () => {
    const svg = F.render({ type: 'line', labels: ['1월', '2월', '3월', '4월'], values: [18, 21, 25, 27], unit: '°C' });
    expect(countClass(svg, 'fig-mark')).toBe(4);
    expect(count(svg, 'class="fig-line"')).toBe(1);
    expect(countClass(svg, 'fig-wave')).toBe(1);
    expect(countClass(F.render({ type: 'line', labels: ['a', 'b'], values: [18, 27], fromZero: true }), 'fig-wave')).toBe(0);
  });

  test('원그래프: 조각 수, 백분율 합 100', () => {
    const svg = F.render({ type: 'pie', labels: ['가', '나', '다'], values: [1, 1, 1] });
    expect(countClass(svg, 'fig-slice')).toBe(3);
    const pct = texts(svg).map((t) => t.text).join(' ').match(/\d+%/g).map((p) => parseInt(p, 10));
    expect(pct.reduce((a, b) => a + b, 0)).toBe(100);
    expect(F.describe({ type: 'pie', labels: ['A', 'B'], values: [3, 1] })).toBe('원그래프: A 75%, B 25%');
  });

  test('수 모형: 백·십·일 모형 개수만큼', () => {
    const svg = F.render({ type: 'blocks', hundreds: 5, tens: 12, ones: 13 });
    expect(count(svg, 'class="fig-hundred"')).toBe(5);
    expect(count(svg, 'class="fig-ten"')).toBe(12);
    expect(countClass(svg, 'fig-one')).toBe(13);
    expect(rootAttr(svg, 'aria-label')).toBe('수 모형: 백 모형 5개, 십 모형 12개, 일 모형 13개');
    // 넓으면 줄을 바꾼다 (가로 460 안팎)
    expect(viewBox(svg)[2]).toBeLessThan(480);
  });
});

test.describe('직접 그린 svg', () => {
  test('정상: 크기 속성을 떼고 class·role·aria-label 을 붙인다', () => {
    const svg = F.render(SAMPLES.svg);
    expect(rootTag(svg)).toBe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" class="fig fig-svg" role="img" aria-label="네모 그림">');
    expect(svg).toContain('<rect x="10" y="10" width="280" height="130" fill="none" stroke="currentColor"/>');
    expect(F.describe({ type: 'svg', svg: '<svg viewBox="0 0 300 150"></svg>' })).toBe('그림');
  });

  const FORBIDDEN = {
    'script': '<svg viewBox="0 0 10 10"><script>alert(1)</script></svg>',
    'on…= 속성': '<svg viewBox="0 0 10 10"><rect onclick="x()" width="5" height="5"/></svg>',
    'onload (슬래시 뒤)': '<svg viewBox="0 0 10 10"/onload=alert(1)></svg>',
    '외부 href': '<svg viewBox="0 0 10 10"><use href="https://example.com/a.svg#x"/></svg>',
    '외부 xlink:href': "<svg viewBox=\"0 0 10 10\"><a xlink:href='http://example.com'>x</a></svg>",
    'foreignObject': '<svg viewBox="0 0 10 10"><foreignObject><div>x</div></foreignObject></svg>',
    'image': '<svg viewBox="0 0 10 10"><image href="#a"/></svg>',
    'img 태그': '<svg viewBox="0 0 10 10"><img src="x.png"></svg>',
    'style 요소': '<svg viewBox="0 0 10 10"><style>body{display:none}</style></svg>',
    'javascript:': '<svg viewBox="0 0 10 10"><a href="javascript:alert(1)">x</a></svg>',
    '외부 url()': '<svg viewBox="0 0 10 10"><rect fill="url(http://example.com/p)"/></svg>',
    'viewBox 없음': '<svg width="10" height="10"><rect/></svg>',
    '<svg 로 시작 안 함': '<div><svg viewBox="0 0 10 10"></svg></div>',
    '20KB 초과': '<svg viewBox="0 0 10 10">' + '<!--' + 'x'.repeat(21000) + '-->' + '</svg>',
  };
  for (const [name, src] of Object.entries(FORBIDDEN)) {
    test('금지: ' + name, () => {
      const errs = F.check({ type: 'svg', svg: src });
      expect(errs.length).toBeGreaterThan(0);
      expect(errs.join(' ')).toMatch(/[가-힣]/);
      const out = F.render({ type: 'svg', svg: src });
      expect(isError(out)).toBe(true);
      expect(out).not.toMatch(/script|onclick|onload|example\.com|foreignObject|<img|<style|javascript/i);
    });
  }

  test('그림 안을 가리키는 href="#id"·url(#id) 는 괜찮다', () => {
    const ok = '<svg viewBox="0 0 200 100"><defs><linearGradient id="g"/></defs><rect fill="url(#g)" width="5" height="5"/><use href="#g"/></svg>';
    expect(F.check({ type: 'svg', svg: ok })).toEqual([]);
  });

  test('viewBox 가 너무 작으면(1단위 ≈ 1px) 경고하지만 그린다', () => {
    const tiny = { type: 'svg', svg: '<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4"/></svg>' };
    expect(F.check(tiny).join(' ')).toMatch(/viewBox 너비가 10/);
    expect(isError(F.render(tiny))).toBe(false);
  });
});

test.describe('check: 형식 오류를 사람이 읽을 말로', () => {
  const CASES = [
    ['객체가 아님', 42, /객체/],
    ['type 없음', {}, /type/],
    ['모르는 type', { type: 'graph3d' }, /모르는 그림 종류.*graph3d/],
    ['시 빠짐', { type: 'clock', m: 30 }, /h\(시\)/],
    ['시 범위 밖', { type: 'clock', h: 25 }, /0~23/],
    ['분 범위 밖', { type: 'clock', h: 3, m: 60 }, /0~59/],
    ['음수 d', { type: 'fraction', n: 1, d: -4 }, /d\(전체 칸 수\)/],
    ['d 가 0', { type: 'fraction', n: 0, d: 0 }, /d\(전체 칸 수\)/],
    ['n<0', { type: 'fraction', n: -1, d: 4 }, /n\(색칠한 칸 수\)/],
    ['모양 이름', { type: 'fraction', shape: 'square', n: 1, d: 4 }, /shape/],
    ['min>=max', { type: 'numberline', min: 5, max: 5 }, /min 은 max 보다 작아야/],
    ['step 0', { type: 'numberline', min: 0, max: 5, step: 0 }, /step/],
    ['점이 범위 밖', { type: 'numberline', min: 0, max: 5, points: [{ x: 9 }] }, /범위\(0~5\) 밖/],
    ['범위 from>=to', { type: 'numberline', min: 0, max: 5, ranges: [{ from: 3, to: 1 }] }, /from 은 to 보다/],
    ['좌표 범위 거꾸로', { type: 'coord', xmin: 5, xmax: -5 }, /xmin 은 xmax 보다/],
    ['못 읽는 식', { type: 'coord', fns: [{ expr: '2x+' }] }, /식 '2x\+' 을 읽을 수 없어요/],
    ['선분 좌표', { type: 'coord', segments: [{ from: [0], to: [1, 1] }] }, /from 은 \[x, y\]/],
    ['꼭짓점 2개', { type: 'polygon', points: [[0, 0], [1, 1]] }, /3개 이상/],
    ['한 줄 위 꼭짓점', { type: 'polygon', points: [[0, 0], [1, 1], [2, 2]] }, /한 줄 위/],
    ['labels 개수', { type: 'polygon', points: [[0, 0], [1, 0], [0, 1]], labels: ['A', 'B'] }, /labels 의 개수/],
    ['각 번호', { type: 'polygon', points: [[0, 0], [1, 0], [0, 1]], angles: [{ at: 5 }] }, /at 은 꼭짓점 번호/],
    ['각도 범위', { type: 'angle', deg: 400 }, /0~360/],
    ['값 개수 불일치', { type: 'bars', labels: ['a', 'b', 'c'], values: [1, 2] }, /개수가 달라요/],
    ['값이 수가 아님', { type: 'line', labels: ['a', 'b'], values: [1, '2'] }, /모두 수/],
    ['원그래프 음수', { type: 'pie', labels: ['a', 'b'], values: [3, -1] }, /0 이상/],
    ['수 모형 없음', { type: 'blocks', hundreds: 0 }, /하나도 없어요/],
    ['수 모형 음수', { type: 'blocks', tens: -2 }, /0~40/],
    ['직육면체 0', { type: 'cuboid', w: 0, h: 2, d: 3 }, /w 는 0보다 큰 수/],
    ['svg 비어 있음', { type: 'svg', svg: '' }, /svg\(그림 글\)/],
    ['alt 가 글자가 아님', { type: 'clock', h: 1, alt: 3 }, /alt/],
  ];
  for (const [name, spec, re] of CASES) {
    test(name, () => {
      const errs = F.check(spec);
      expect(errs.length).toBeGreaterThan(0);
      expect(errs.join('\n')).toMatch(re);
      // 잘못된 spec 에도 throw 하지 않고 오류 그림
      const svg = F.render(spec);
      expect(isError(svg)).toBe(true);
      expect(tagReport(svg).ok).toBe(true);
    });
  }

  test('모르는 칸은 알려 주지만(오타 잡기) 그림은 그린다', () => {
    const spec = { type: 'clock', h: 3, mm: 30 };
    expect(F.check(spec).join(' ')).toMatch(/모르는 칸 'mm'/);
    expect(isError(F.render(spec))).toBe(false);
  });

  test('그림 범위 밖 그래프는 경고', () => {
    expect(F.check({ type: 'coord', fns: [{ expr: 'x+100' }] }).join(' ')).toMatch(/보이지 않아요/);
  });

  test('render 는 어떤 값에도 throw 하지 않는다', () => {
    const junk = [null, undefined, 0, 'clock', [], { type: null }, { type: 'coord', fns: 'x' }, { type: 'coord', points: [null] },
      { type: 'polygon', points: 'ABC' }, { type: 'numberline', min: 0, max: Infinity }, { type: 'bars', labels: null, values: null },
      { type: 'fraction', n: 1e9, d: 1 }, { type: 'svg', svg: 42 }, { type: 'pie', labels: ['a'], values: [0] }];
    for (const j of junk) {
      let out;
      expect(() => { out = F.render(j); }).not.toThrow();
      expect(out.startsWith('<svg')).toBe(true);
      expect(isError(out)).toBe(true);
      expect(Array.isArray(F.check(j))).toBe(true);
    }
  });
});

test.describe('라벨 이스케이프', () => {
  const EVIL = '<b onmouseover="x()">A&\'B\'</b>';
  const ESC = '&lt;b onmouseover=&quot;x()&quot;&gt;A&amp;&#39;B&#39;&lt;/b&gt;';

  test('다각형·좌표평면·그래프의 글자는 태그로 해석되지 않는다', () => {
    const outs = [
      F.render({ type: 'polygon', points: [[0, 0], [4, 0], [0, 3]], labels: [EVIL, 'B', 'C'], sides: [EVIL, null, null] }),
      F.render({ type: 'coord', points: [{ x: 1, y: 1, label: EVIL }], fns: [{ expr: 'x', label: EVIL }] }),
      F.render({ type: 'bars', labels: [EVIL, '나'], values: [1, 2], title: EVIL, unit: EVIL }),
      F.render({ type: 'numberline', min: 0, max: 5, points: [{ x: 1, label: EVIL }] }),
      F.render({ type: 'cuboid', w: 1, h: 1, d: 1, labels: { w: EVIL } }),
    ];
    for (const svg of outs) {
      expect(svg).not.toContain('<b');
      expect(svg).toContain('&lt;b onmouseover=&quot;');
      expect(tagReport(svg).ok).toBe(true);
    }
    expect(outs[0]).toContain(ESC);
    expect(outs[2]).toContain(ESC);
  });

  test('한글 라벨은 그대로 보인다', () => {
    const svg = F.render({ type: 'polygon', points: [[0, 0], [4, 0], [0, 3]], labels: ['ㄱ', 'ㄴ', 'ㄷ'], sides: ['밑변', null, '높이'] });
    expect(texts(svg, 'fig-vertex-label').map((t) => t.text)).toEqual(['ㄱ', 'ㄴ', 'ㄷ']);
    expect(texts(svg, 'fig-side-label').map((t) => t.text)).toEqual(['밑변', '높이']);
  });
});
