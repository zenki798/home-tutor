/* 미적분학 · 매개곡선과 극좌표
 * 매개곡선의 그래프·접선의 기울기·이계도함수, 매개곡선의 길이, 극좌표와 직교좌표의 변환,
 * 극곡선(원·심장형·장미 곡선) 그리기, 극좌표에서의 넓이와 곡선의 길이를 다룬다. */
(function () {
  /* 곡선 그림(svg) — 좌표 범위 o.x=[x0,x1], o.y=[y0,y1] 을 가로 o.w 로 같은 비율로 그린다.
   * curves: [{ f(t) → [x, y], t0, t1, c? }], segs: [{ a:[x,y], b:[x,y], dash?, c? }], pts: [{ x, y, label?, dx?, dy?, anchor? }],
   * texts: [{ x, y, t, c?, anchor? }] */
  function txt(x, y, s, c, a) {
    return '<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" font-size="12" fill="' + c + '" text-anchor="' + a + '">' + s + '</text>';
  }
  function plot(o) {
    var W = o.w || 280, x0 = o.x[0], x1 = o.x[1], y0 = o.y[0], y1 = o.y[1];
    var H = Math.round(W * (y1 - y0) / (x1 - x0));
    function X(x) { return (x - x0) / (x1 - x0) * W; }
    function Y(y) { return (y1 - y) / (y1 - y0) * H; }
    function f1(v) { return v.toFixed(1); }
    var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">';
    if (o.axes !== false) {
      out += '<line x1="0" y1="' + f1(Y(0)) + '" x2="' + W + '" y2="' + f1(Y(0)) + '" stroke="currentColor" stroke-opacity="0.45" stroke-width="1"/>';
      out += '<line x1="' + f1(X(0)) + '" y1="0" x2="' + f1(X(0)) + '" y2="' + H + '" stroke="currentColor" stroke-opacity="0.45" stroke-width="1"/>';
      out += txt(W - 4, Y(0) - 5, 'x', 'currentColor', 'end') + txt(X(0) + 6, 12, 'y', 'currentColor', 'start');
    }
    (o.segs || []).forEach(function (s) {
      out += '<line x1="' + f1(X(s.a[0])) + '" y1="' + f1(Y(s.a[1])) + '" x2="' + f1(X(s.b[0])) + '" y2="' + f1(Y(s.b[1])) +
        '" stroke="' + (s.c || 'currentColor') + '" stroke-width="' + (s.w || 1.2) + '"' + (s.dash ? ' stroke-dasharray="4 3"' : '') + '/>';
    });
    (o.curves || []).forEach(function (c, i) {
      var n = c.n || 240, d = '';
      for (var k = 0; k <= n; k++) {
        var t = c.t0 + (c.t1 - c.t0) * k / n, p = c.f(t);
        d += (k ? 'L' : 'M') + f1(X(p[0])) + ' ' + f1(Y(p[1]));
      }
      out += '<path d="' + d + '" fill="none" stroke="' + (c.c || 'var(--fig-' + (i % 4 + 1) + ')') + '" stroke-width="' + (c.w || 2) + '"/>';
    });
    (o.pts || []).forEach(function (p) {
      out += '<circle cx="' + f1(X(p.x)) + '" cy="' + f1(Y(p.y)) + '" r="3" fill="currentColor"/>';
      if (p.label) out += txt(X(p.x) + (p.dx === undefined ? 6 : p.dx), Y(p.y) + (p.dy === undefined ? -6 : p.dy), p.label, 'currentColor', p.anchor || 'start');
    });
    (o.texts || []).forEach(function (t) { out += txt(X(t.x), Y(t.y), t.t, t.c || 'currentColor', t.anchor || 'middle'); });
    return out + '</svg>';
  }
  function polar(rf) { return function (th) { var r = rf(th); return [r * Math.cos(th), r * Math.sin(th)]; }; }
  var PI = Math.PI;

  // 매개곡선 x=t², y=t³-3t (-2.1 ≤ t ≤ 2.1)
  var LOOP_SVG = plot({
    x: [-1, 5], y: [-3.3, 3.3], w: 260,
    curves: [{ f: function (t) { return [t * t, t * t * t - 3 * t]; }, t0: -2.1, t1: 2.1 }],
    pts: [
      { x: 4, y: -2, label: 't=-2', dx: -6, dy: 16, anchor: 'end' },
      { x: 0, y: 0, label: 't=0', dx: -6, dy: 16, anchor: 'end' },
      { x: 4, y: 2, label: 't=2', dx: -6, dy: -8, anchor: 'end' },
      { x: 1, y: 2, label: 't=-1', dx: 0, dy: -9, anchor: 'middle' },
      { x: 1, y: -2, label: 't=1', dx: 0, dy: 18, anchor: 'middle' },
    ],
  });
  // 극좌표 (r, θ) 와 직교좌표
  var POLAR_PT_SVG = plot({
    x: [-0.9, 2.6], y: [-0.45, 2.2], w: 280,
    segs: [
      { a: [0, 0], b: [1, Math.sqrt(3)], c: 'var(--fig-1)', w: 2 },
      { a: [1, Math.sqrt(3)], b: [1, 0], dash: true },
      { a: [1, Math.sqrt(3)], b: [0, Math.sqrt(3)], dash: true },
    ],
    curves: [{ f: function (t) { return [0.35 * Math.cos(t), 0.35 * Math.sin(t)]; }, t0: 0, t1: PI / 3, c: 'var(--fig-2)', w: 1.5, n: 30 }],
    pts: [{ x: 1, y: Math.sqrt(3), label: 'P(r, θ)', dx: 8, dy: -4 }, { x: 0, y: 0, label: 'O', dx: -6, dy: 14, anchor: 'end' }],
    texts: [
      { x: 0.38, y: 1.0, t: 'r', c: 'var(--fig-1)' },
      { x: 0.52, y: 0.2, t: 'θ', c: 'var(--fig-2)' },
      { x: 1, y: -0.3, t: 'x = r cos θ' },
      { x: -0.45, y: Math.sqrt(3) + 0.12, t: 'y = r sin θ' },
    ],
  });
  // 심장형 r=1+cosθ 와 장미 곡선 r=cos2θ (옆으로 나란히)
  var SHAPES_SVG = plot({
    x: [-1.2, 5.0], y: [-1.6, 1.6], w: 320, axes: false,
    segs: [
      { a: [-1.1, 0], b: [2.2, 0], dash: true }, { a: [2.7, 0], b: [4.9, 0], dash: true },
    ],
    curves: [
      { f: polar(function (t) { return 1 + Math.cos(t); }), t0: 0, t1: 2 * PI },
      { f: function (t) { var r = Math.cos(2 * t); return [3.8 + r * Math.cos(t), r * Math.sin(t)]; }, t0: 0, t1: 2 * PI, n: 360 },
    ],
    pts: [{ x: 0, y: 0, label: 'O', dx: -6, dy: 14, anchor: 'end' }, { x: 3.8, y: 0, label: 'O', dx: -6, dy: 14, anchor: 'end' }],
    texts: [{ x: 0.6, y: -1.45, t: 'r = 1 + cos θ (심장형)', c: 'var(--fig-1)' }, { x: 3.8, y: -1.45, t: 'r = cos 2θ (장미)', c: 'var(--fig-2)' }],
  });
  // r = 1 + sinθ (문제용 — 식은 적지 않는다)
  var MYSTERY_SVG = plot({
    x: [-1.7, 1.7], y: [-0.6, 2.4], w: 240,
    curves: [{ f: polar(function (t) { return 1 + Math.sin(t); }), t0: 0, t1: 2 * PI }],
    pts: [{ x: 0, y: 2, label: '(0, 2)', dx: 8, dy: -2 }, { x: 1, y: 0, label: '(1, 0)', dx: 4, dy: 14 }, { x: -1, y: 0, label: '(-1, 0)', dx: -4, dy: 14, anchor: 'end' }],
  });
  // 원 r=3sinθ 와 심장형 r=1+sinθ
  var REGION_SVG = plot({
    x: [-2, 2], y: [-0.6, 3.3], w: 260,
    curves: [
      { f: polar(function (t) { return 3 * Math.sin(t); }), t0: 0, t1: PI },
      { f: polar(function (t) { return 1 + Math.sin(t); }), t0: 0, t1: 2 * PI },
    ],
    pts: [{ x: 1.5 * Math.cos(PI / 6), y: 0.75, label: 'θ=π/6', dx: 6, dy: 14 }, { x: -1.5 * Math.cos(PI / 6), y: 0.75, label: 'θ=5π/6', dx: -6, dy: 14, anchor: 'end' }],
    texts: [{ x: 1.05, y: 2.75, t: 'r = 3 sin θ', c: 'var(--fig-1)' }, { x: 0, y: -0.45, t: 'r = 1 + sin θ', c: 'var(--fig-2)' }],
  });
  // 사이클로이드 x=2(t-sin t), y=2(1-cos t)
  var CYCLOID_SVG = plot({
    x: [-0.6, 13.3], y: [-0.9, 5], w: 320,
    curves: [{ f: function (t) { return [2 * (t - Math.sin(t)), 2 * (1 - Math.cos(t))]; }, t0: 0, t1: 2 * PI }],
    segs: [{ a: [2 * PI, 0], b: [2 * PI, 4], dash: true }],
    pts: [{ x: 0, y: 0, label: 't=0', dx: 4, dy: 14 }, { x: 4 * PI, y: 0, label: 't=2π', dx: -4, dy: 14, anchor: 'end' }, { x: 2 * PI, y: 4, label: '(2π, 4)', dx: 6, dy: -4 }],
  });

  // 생성기용: 특수각 (π의 몇 배) 과 cos·sin 의 정확한 값
  var ANGLES = [[1, 6], [1, 4], [1, 3], [2, 3], [3, 4], [5, 6], [7, 6], [5, 4], [4, 3], [5, 3], [7, 4], [11, 6]];
  function exactTrig(v) {           // v ≈ ±1/2, ±√2/2, ±√3/2 → { s: 부호, k: 1|2|3 (1 이면 1/2) }
    var a = Math.abs(v), s = v < 0 ? -1 : 1;
    if (Math.abs(a - 0.5) < 1e-9) return { s: s, k: 1 };
    if (Math.abs(a - Math.SQRT1_2) < 1e-9) return { s: s, k: 2 };
    return { s: s, k: 3 };
  }
  function trigTex(e) { return (e.s < 0 ? '-' : '') + (e.k === 1 ? '\\frac{1}{2}' : '\\frac{\\sqrt{' + e.k + '}}{2}'); }
  function coordTex(c, k) {          // c·√k (k=1 이면 c)
    if (c === 0) return '0';
    if (k === 1) return String(c);
    return (c === 1 ? '' : c === -1 ? '-' : String(c)) + '\\sqrt{' + k + '}';
  }
  function angTex(n, d) { return '\\frac{' + (n === 1 ? '' : n) + '\\pi}{' + d + '}'; }
  function piTex(F, R) {             // Frac k → kπ 의 TeX
    if (F.den === 1) return (F.num === 1 ? '' : F.num === -1 ? '-' : String(F.num)) + '\\pi';
    return (F.num < 0 ? '-' : '') + '\\frac{' + (Math.abs(F.num) === 1 ? '' : Math.abs(F.num)) + '\\pi}{' + F.den + '}';
  }

  Tutor.registerUnit({
    id: 'math-u-calc-09',
    course: 'math-u-calc',
    title: '매개곡선과 극좌표',
    summary: '매개변수로 나타낸 곡선과 극좌표로 나타낸 곡선을 그리고, 접선의 기울기와 넓이·길이를 구합니다.',
    goals: [
      '매개곡선을 그리고, 접선의 기울기와 이계도함수를 구할 수 있다.',
      '매개곡선의 길이를 적분으로 구할 수 있다.',
      '극좌표와 직교좌표를 서로 바꾸고, 원·심장형·장미 곡선 같은 극곡선을 그릴 수 있다.',
      '극곡선으로 둘러싸인 영역의 넓이와 극곡선의 길이를 구할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '매개곡선과 그 그래프',
        body: '평면 위의 점 $(x, y)$의 좌표를 제3의 변수 $t$의 함수로 $x=f(t)$, $y=g(t)$처럼 나타낸 것을 **매개방정식**, $t$를 **매개변수**, $t$가 변할 때 점이 그리는 곡선을 **매개곡선**이라고 합니다.\n\n$t$를 시각으로 보면 매개곡선은 움직이는 점의 **자취**이고, $t$가 커지는 쪽으로 곡선의 **방향**이 정해집니다. 같은 곡선이라도 매개화가 다르면 지나가는 방향과 빠르기가 다를 수 있습니다.\n\n예: $x=\\cos t$, $y=\\sin t$ $(0 \\le t \\le 2\\pi)$는 $\\cos^2 t+\\sin^2 t=1$에서 $x^2+y^2=1$을 만족하므로, 단위원을 $(1, 0)$에서 출발해 시계 반대 방향으로 한 바퀴 돕니다.\n\n그리는 방법은 두 가지입니다. (1) $t$에 여러 값을 넣어 점을 찍고 $t$가 커지는 순서로 잇습니다. (2) $t$를 소거해 $x$와 $y$의 관계식을 구합니다. 예: $x=t+1$, $y=t^2$이면 $t=x-1$을 대입해 $y=(x-1)^2$입니다.\n\n> 💡 그림의 $x=t^2$, $y=t^3-3t$처럼 곡선이 자기 자신과 만나 $y$를 $x$의 함수로 쓸 수 없는 곡선도 매개방정식으로는 간단히 나타낼 수 있습니다.',
        easy: '매개변수 $t$를 "시각(초)"이라고 생각해 보십시오. 개미 한 마리가 평면 위를 기어가고, $t$초일 때 개미의 위치가 $(f(t), g(t))$입니다.\n\n개미가 지나간 길이 매개곡선이고, 개미가 움직인 방향이 곡선의 방향입니다. $y=f(x)$ 꼴의 그래프는 길의 모양만 알려 주지만, 매개방정식은 "언제 어디에 있었는지"까지 알려 줍니다.',
        fig: { type: 'svg', svg: LOOP_SVG, alt: '매개곡선 x=t², y=t³-3t 의 그래프. t=-2 일 때 (4, -2)에서 출발해 t=-1 일 때 (1, 2), t=0 일 때 원점, t=1 일 때 (1, -2)를 지나 t=2 일 때 (4, 2)에 이른다. 곡선은 (3, 0)에서 자기 자신과 만나 고리를 만든다' },
        check: {
          type: 'choice',
          q: '매개방정식 $x=2\\cos t$, $y=2\\sin t$ $(0 \\le t \\le 2\\pi)$가 나타내는 곡선은 무엇입니까?',
          choices: ['원점이 중심이고 반지름이 2인 원', '원점이 중심이고 반지름이 4인 원', '원점을 지나는 직선 $y=x$'],
          answer: 0,
          why: ['', '$x^2+y^2=4$에서 반지름은 4가 아니라 $\\sqrt{4}=2$입니다.', '$t$를 소거하면 $x^2+y^2=4\\cos^2 t+4\\sin^2 t=4$입니다. 직선이 아닙니다.'],
          explain: '$x^2+y^2=4(\\cos^2 t+\\sin^2 t)=4$이므로 원점이 중심이고 반지름이 2인 원입니다. $t$가 0에서 $2\\pi$까지 변하면 시계 반대 방향으로 한 바퀴 돕니다.',
        },
      },
      {
        title: '매개곡선의 접선의 기울기',
        body: '$x=f(t)$, $y=g(t)$가 미분가능하고 $\\frac{dx}{dt} \\ne 0$이면, 연쇄법칙 $\\frac{dy}{dt}=\\frac{dy}{dx}\\cdot\\frac{dx}{dt}$에서\n\n$\\frac{dy}{dx}=\\dfrac{\\frac{dy}{dt}}{\\frac{dx}{dt}}=\\frac{g\'(t)}{f\'(t)}$\n\n입니다. 고등학교에서 배운 매개변수로 나타낸 함수의 미분법과 같습니다.\n\n- **수평접선**: $\\frac{dy}{dt}=0$이고 $\\frac{dx}{dt} \\ne 0$인 점\n- **수직접선**: $\\frac{dx}{dt}=0$이고 $\\frac{dy}{dt} \\ne 0$인 점\n- 둘 다 0이면 이 공식으로는 판단할 수 없으므로 $\\frac{dy}{dx}$의 극한으로 따로 살핍니다.\n\n예: $x=t^2$, $y=t^3-3t$에서 $\\frac{dy}{dx}=\\frac{3t^2-3}{2t}$입니다. $t=\\pm 1$에서 수평접선(점 $(1, \\mp 2)$), $t=0$에서 수직접선(원점)을 가집니다.\n\n**이계도함수**는 $\\frac{dy}{dx}$를 다시 $x$에 대하여 미분한 것이므로, $t$로 미분한 뒤 $\\frac{dx}{dt}$로 나눕니다.\n\n$\\frac{d^2y}{dx^2}=\\dfrac{\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)}{\\frac{dx}{dt}}$\n\n> ⚠️ $\\frac{d^2y}{dx^2}$는 $\\frac{d^2y}{dt^2}$를 $\\frac{d^2x}{dt^2}$로 나눈 것이 아닙니다.',
        easy: '접선의 기울기는 "$y$가 변하는 빠르기 ÷ $x$가 변하는 빠르기"입니다. 개미가 1초에 오른쪽으로 2칸, 위로 3칸 움직이는 순간이라면 그 순간 길의 기울기는 $\\frac{3}{2}$입니다.\n\n오른쪽으로는 전혀 움직이지 않고 위아래로만 움직이는 순간($\\frac{dx}{dt}=0$)에는 길이 수직으로 서 있고, 위아래로 움직이지 않는 순간($\\frac{dy}{dt}=0$)에는 길이 수평입니다.',
        check: {
          type: 'short', check: 'number',
          q: '매개곡선 $x=t^2+1$, $y=t^3$ 위에서 $t=2$인 점의 접선의 기울기 $\\frac{dy}{dx}$를 구하십시오.',
          answer: '3',
          wrong: [
            { a: '1/3', why: '거꾸로 나누었습니다. $\\frac{dy}{dx}$는 $\\frac{dy}{dt}$를 $\\frac{dx}{dt}$로 나눈 것입니다.' },
            { a: '12', why: '$\\frac{dy}{dt}=12$만 구했습니다. $\\frac{dx}{dt}=4$로 나누어야 합니다.' },
          ],
          explain: '$\\frac{dx}{dt}=2t=4$, $\\frac{dy}{dt}=3t^2=12$이므로 $\\frac{dy}{dx}=\\frac{12}{4}=3$입니다.',
        },
      },
      {
        title: '매개곡선의 길이',
        body: '$a \\le t \\le b$에서 곡선이 같은 부분을 두 번 지나지 않고 $f\'$, $g\'$이 연속이면 곡선의 길이는\n\n$L=\\int_{a}^{b}\\sqrt{\\left(\\frac{dx}{dt}\\right)^2+\\left(\\frac{dy}{dt}\\right)^2}\\,dt$\n\n입니다.\n\n**이유**: 짧은 시간 $\\Delta t$ 동안 점은 가로로 약 $f\'(t)\\Delta t$, 세로로 약 $g\'(t)\\Delta t$만큼 움직이므로, 피타고라스 정리에 따라 움직인 거리는 약 $\\sqrt{f\'(t)^2+g\'(t)^2}\\,\\Delta t$입니다. 이 작은 선분들을 더하고 $\\Delta t \\to 0$으로 보내면 위의 적분이 됩니다. 고등학교에서 평면 위를 움직이는 점이 움직인 거리를 구한 식과 같습니다.\n\n예: $x=\\frac{t^2}{2}$, $y=\\frac{t^3}{3}$ $(0 \\le t \\le \\sqrt{3})$이면 $\\sqrt{t^2+t^4}=t\\sqrt{1+t^2}$이므로\n\n$L=\\int_{0}^{\\sqrt{3}}t\\sqrt{1+t^2}\\,dt=\\left[\\frac{1}{3}(1+t^2)^{\\frac{3}{2}}\\right]_{0}^{\\sqrt{3}}=\\frac{8-1}{3}=\\frac{7}{3}$\n\n> ⚠️ 같은 부분을 여러 번 지나면(예: 원을 두 바퀴) 적분값이 곡선 길이의 몇 배가 됩니다. 곡선을 한 번만 그리는 $t$의 범위를 씁니다.',
        easy: '자동차 계기판의 속력을 시간에 대하여 적분하면 달린 거리가 나옵니다. 매개곡선 위를 움직이는 점의 속력은 가로 속력 $\\frac{dx}{dt}$와 세로 속력 $\\frac{dy}{dt}$를 두 변으로 하는 직각삼각형의 빗변, 곧 $\\sqrt{\\left(\\frac{dx}{dt}\\right)^2+\\left(\\frac{dy}{dt}\\right)^2}$입니다.\n\n곡선의 길이는 이 속력을 $t$에 대하여 적분한 "달린 거리"입니다.',
        check: {
          type: 'short', check: 'number',
          q: '매개곡선 $x=3t$, $y=4t$ $(0 \\le t \\le 2)$의 길이를 구하십시오.',
          answer: '10',
          wrong: [{ a: '14', why: '가로 속력과 세로 속력을 그냥 더했습니다. 속력은 $\\sqrt{3^2+4^2}=5$입니다.' }],
          explain: '$\\frac{dx}{dt}=3$, $\\frac{dy}{dt}=4$이므로 속력은 $\\sqrt{9+16}=5$이고, $L=\\int_{0}^{2}5\\,dt=10$입니다. 점 $(0, 0)$에서 $(6, 8)$까지의 선분 길이와 같습니다.',
        },
      },
      {
        title: '극좌표와 직교좌표의 변환',
        body: '평면 위의 점을 원점 O(**극**)에서의 거리 $r$과, 시초선(양의 $x$축)에서 시계 반대 방향으로 잰 각 $\\theta$로 $(r, \\theta)$처럼 나타낸 것을 **극좌표**라고 합니다.\n\n그림에서 $x=r\\cos\\theta$, $y=r\\sin\\theta$이므로 변환식은 다음과 같습니다.\n\n| 극좌표 → 직교좌표 | 직교좌표 → 극좌표 |\n|---|---|\n| $x=r\\cos\\theta$, $y=r\\sin\\theta$ | $r^2=x^2+y^2$, $\\tan\\theta=\\frac{y}{x}$ $(x \\ne 0)$ |\n\n예: 극좌표 $\\left(2, \\frac{\\pi}{3}\\right)$인 점의 직교좌표는 $x=2\\cos\\frac{\\pi}{3}=1$, $y=2\\sin\\frac{\\pi}{3}=\\sqrt{3}$에서 $(1, \\sqrt{3})$입니다.\n\n직교좌표를 극좌표로 바꿀 때 $\\tan\\theta=\\frac{y}{x}$만 보면 $\\theta$가 두 개($\\pi$만큼 차이) 나오므로, 점이 있는 **사분면**을 보고 고릅니다. 예: 점 $(-1, 1)$은 $r=\\sqrt{2}$이고 제2사분면에 있으므로 $\\theta=\\frac{3\\pi}{4}$입니다.\n\n> ⚠️ 한 점의 극좌표는 하나로 정해지지 않습니다. $(r, \\theta)$와 $(r, \\theta+2\\pi)$는 같은 점이고, $r<0$도 허용하면 $(-r, \\theta+\\pi)$도 같은 점입니다. $(r, \\theta)$에서 $r<0$이면 $\\theta$의 반대 방향으로 $|r|$만큼 갑니다.',
        easy: '직교좌표가 "동쪽으로 얼마, 북쪽으로 얼마"라면, 극좌표는 "어느 방향으로, 얼마나 멀리"입니다. 등대에서 배의 위치를 "북동쪽 방향으로 2 km"라고 말하는 것과 같습니다.\n\n방향과 거리를 알면 직각삼각형에서 가로 길이 $r\\cos\\theta$, 세로 길이 $r\\sin\\theta$를 구할 수 있습니다. 거꾸로 가로·세로를 알면 피타고라스 정리로 거리 $r$을 구합니다.',
        fig: { type: 'svg', svg: POLAR_PT_SVG, alt: '원점 O에서 거리 r, 양의 x축에서 각 θ만큼 돌아간 점 P(r, θ). P에서 x축과 y축에 내린 점선이 x = r cos θ, y = r sin θ를 나타낸다' },
        check: {
          type: 'ox',
          q: '극좌표 $\\left(-2, \\frac{\\pi}{6}\\right)$로 나타낸 점과 극좌표 $\\left(2, \\frac{7\\pi}{6}\\right)$로 나타낸 점은 같은 점입니다.',
          answer: true,
          explain: '$(-r, \\theta)$는 $(r, \\theta+\\pi)$와 같은 점입니다. $\\frac{\\pi}{6}+\\pi=\\frac{7\\pi}{6}$이므로 같은 점입니다. 직교좌표로 바꾸어도 둘 다 $(-\\sqrt{3}, -1)$입니다.',
        },
      },
      {
        title: '극곡선 그리기 — 원, 심장형, 장미 곡선',
        body: '극방정식 $r=f(\\theta)$를 만족하는 점 $(r, \\theta)$ 전체를 **극곡선**이라고 합니다. $\\theta$를 돌려 가며 그 방향으로 $r$만큼 나간 점을 찍어 그립니다.\n\n| 극방정식 | 곡선 |\n|---|---|\n| $r=a$ | 원점이 중심, 반지름 $a$인 원 |\n| $\\theta=\\alpha$ | 원점을 지나는 직선 |\n| $r=2a\\cos\\theta$ | 중심 $(a, 0)$, 반지름 $a$인 원 |\n| $r=a(1+\\cos\\theta)$ | **심장형**(카디오이드) |\n| $r=a\\cos n\\theta$, $r=a\\sin n\\theta$ | **장미 곡선** |\n\n**심장형** $r=1+\\cos\\theta$: $\\theta=0$에서 $r=2$로 가장 멀고, $\\theta=\\pi$에서 $r=0$이 되어 원점에서 뾰족해집니다. $\\cos\\theta$를 $\\sin\\theta$로 바꾸면 그림을 시계 반대 방향으로 $90^\\circ$ 돌린 모양(위쪽을 향함)이 됩니다.\n\n**장미 곡선** $r=a\\cos n\\theta$ ($n \\ge 2$): $n$이 홀수이면 꽃잎이 $n$장, 짝수이면 $2n$장입니다. 예: $r=\\cos 2\\theta$는 4장, $r=\\cos 3\\theta$는 3장입니다. $n$이 홀수이면 $r<0$인 부분이 이미 그린 꽃잎 위에 겹쳐 그려지기 때문입니다.\n\n> 💡 $r=2a\\cos\\theta$의 양변에 $r$을 곱하면 $r^2=2ar\\cos\\theta$, 곧 $x^2+y^2=2ax$입니다. 극방정식을 직교좌표의 방정식으로 바꿀 때 자주 쓰는 방법입니다.',
        easy: '시계 바늘을 떠올려 보십시오. 바늘이 $\\theta$ 방향을 가리킬 때 바늘의 길이가 $f(\\theta)$로 늘었다 줄었다 하고, 바늘 끝이 지나간 자국이 극곡선입니다.\n\n$r=1+\\cos\\theta$이면 바늘이 오른쪽($\\theta=0$)을 가리킬 때 가장 길고(길이 2), 왼쪽($\\theta=\\pi$)을 가리킬 때 길이가 0이 되어 하트 모양이 됩니다.',
        fig: { type: 'svg', svg: SHAPES_SVG, alt: '왼쪽: 심장형 r = 1 + cos θ. 오른쪽으로 가장 멀리(2) 뻗고 원점에서 뾰족하다. 오른쪽: 장미 곡선 r = cos 2θ. 꽃잎 4장이 위아래·좌우로 놓여 있다' },
        check: {
          type: 'choice',
          q: '장미 곡선 $r=\\sin 3\\theta$의 꽃잎은 몇 장입니까?',
          choices: ['3장', '6장', '9장'],
          answer: 0,
          why: ['', '$n$이 짝수일 때의 규칙($2n$장)을 썼습니다. $n=3$은 홀수이므로 $n$장입니다.', '$n$장 또는 $2n$장입니다. $n^2$장이 아닙니다.'],
          explain: '$n=3$이 홀수이므로 꽃잎은 3장입니다. $r<0$인 부분은 반대쪽에 이미 그린 꽃잎과 겹칩니다.',
        },
      },
      {
        title: '극좌표에서의 넓이와 곡선의 길이',
        body: '반지름 $r$, 중심각 $\\Delta\\theta$인 부채꼴의 넓이는 $\\frac{1}{2}r^2\\Delta\\theta$입니다. 극곡선 $r=f(\\theta)$와 두 반직선 $\\theta=\\alpha$, $\\theta=\\beta$로 둘러싸인 영역을 가는 부채꼴로 잘게 나누어 더하면\n\n$A=\\int_{\\alpha}^{\\beta}\\frac{1}{2}r^2\\,d\\theta=\\frac{1}{2}\\int_{\\alpha}^{\\beta}f(\\theta)^2\\,d\\theta$\n\n입니다.\n\n예: 심장형 $r=1+\\cos\\theta$로 둘러싸인 넓이는 $\\cos^2\\theta=\\frac{1+\\cos 2\\theta}{2}$를 이용하여\n\n$\\frac{1}{2}\\int_{0}^{2\\pi}(1+2\\cos\\theta+\\cos^2\\theta)\\,d\\theta=\\frac{1}{2}(2\\pi+0+\\pi)=\\frac{3\\pi}{2}$\n\n**길이**: 극곡선은 $x=f(\\theta)\\cos\\theta$, $y=f(\\theta)\\sin\\theta$인 매개곡선입니다. 매개곡선의 길이 공식에 넣어 정리하면 $\\left(\\frac{dx}{d\\theta}\\right)^2+\\left(\\frac{dy}{d\\theta}\\right)^2=r^2+\\left(\\frac{dr}{d\\theta}\\right)^2$이므로\n\n$L=\\int_{\\alpha}^{\\beta}\\sqrt{r^2+\\left(\\frac{dr}{d\\theta}\\right)^2}\\,d\\theta$\n\n입니다. 예: $r=2\\cos\\theta$ $(0 \\le \\theta \\le \\pi)$이면 $r^2+\\left(\\frac{dr}{d\\theta}\\right)^2=4\\cos^2\\theta+4\\sin^2\\theta=4$이므로 $L=2\\pi$입니다. 반지름이 1인 원의 둘레와 같습니다.\n\n> ⚠️ 곡선이 같은 부분을 두 번 지나지 않도록 $\\theta$의 범위를 정합니다. $r=2\\cos\\theta$를 $0 \\le \\theta \\le 2\\pi$에서 적분하면 원을 두 바퀴 돌아 값이 두 배가 됩니다.',
        easy: '피자를 아주 가는 조각으로 자른다고 생각해 보십시오. 조각 하나는 반지름이 $r$이고 각이 아주 작은 부채꼴이라서 넓이가 $\\frac{1}{2}r^2\\Delta\\theta$입니다.\n\n극곡선 안의 넓이는 방향마다 반지름이 다른 "모양이 일그러진 피자"의 조각들을 모두 더한 것입니다. 그래서 $r$ 자리에 $f(\\theta)$를 넣고 적분합니다.',
        check: {
          type: 'choice',
          q: '극곡선 $r=f(\\theta)$와 두 반직선 $\\theta=\\alpha$, $\\theta=\\beta$로 둘러싸인 영역의 넓이를 나타내는 식은 무엇입니까?',
          choices: ['$\\frac{1}{2}\\int_{\\alpha}^{\\beta}r^2\\,d\\theta$', '$\\int_{\\alpha}^{\\beta}r^2\\,d\\theta$', '$\\int_{\\alpha}^{\\beta}r\\,d\\theta$'],
          answer: 0,
          why: ['', '부채꼴의 넓이 $\\frac{1}{2}r^2\\Delta\\theta$에서 $\\frac{1}{2}$을 빠뜨렸습니다.', '$\\int r\\,d\\theta$는 호의 길이를 더한 것에 가깝습니다. 넓이는 부채꼴 넓이 $\\frac{1}{2}r^2\\Delta\\theta$를 더합니다.'],
          explain: '가는 부채꼴 하나의 넓이가 $\\frac{1}{2}r^2\\Delta\\theta$이므로 이를 더한 극한은 $\\frac{1}{2}\\int_{\\alpha}^{\\beta}r^2\\,d\\theta$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '매개곡선 $x=t^2$, $y=t^3-3t$ 위에서 $t=2$인 점의 접선의 방정식을 구하십시오.',
        steps: [
          '$t=2$일 때 $x=4$, $y=8-6=2$이므로 접점은 $(4, 2)$입니다.',
          '$\\frac{dx}{dt}=2t=4$, $\\frac{dy}{dt}=3t^2-3=9$입니다.',
          '접선의 기울기는 $\\frac{dy}{dx}=\\frac{9}{4}$입니다.',
          '$y-2=\\frac{9}{4}(x-4)$를 정리하면 $y=\\frac{9}{4}x-7$입니다.',
        ],
        answer: '$y=\\frac{9}{4}x-7$',
      },
      {
        q: '직교좌표 $(-\\sqrt{3}, -1)$인 점을 극좌표 $(r, \\theta)$ $(r>0,\\ 0 \\le \\theta<2\\pi)$로 나타내십시오.',
        steps: [
          '$r=\\sqrt{(-\\sqrt{3})^2+(-1)^2}=\\sqrt{4}=2$입니다.',
          '$\\tan\\theta=\\frac{-1}{-\\sqrt{3}}=\\frac{1}{\\sqrt{3}}$이므로 $\\theta$는 $\\frac{\\pi}{6}$ 또는 $\\frac{7\\pi}{6}$입니다.',
          '점은 $x<0$, $y<0$인 제3사분면에 있으므로 $\\theta=\\frac{7\\pi}{6}$입니다.',
        ],
        answer: '$\\left(2, \\frac{7\\pi}{6}\\right)$',
      },
      {
        q: '장미 곡선 $r=\\cos 2\\theta$의 꽃잎 한 장의 넓이를 구하십시오.',
        steps: [
          '$\\theta=0$ 방향의 꽃잎은 $\\cos 2\\theta \\ge 0$인 $-\\frac{\\pi}{4} \\le \\theta \\le \\frac{\\pi}{4}$에서 그려집니다.',
          '넓이는 $\\frac{1}{2}\\int_{-\\pi/4}^{\\pi/4}\\cos^2 2\\theta\\,d\\theta$입니다.',
          '$\\cos^2 2\\theta=\\frac{1+\\cos 4\\theta}{2}$이므로 $\\int_{-\\pi/4}^{\\pi/4}\\frac{1+\\cos 4\\theta}{2}\\,d\\theta=\\frac{\\pi}{4}+\\left[\\frac{\\sin 4\\theta}{8}\\right]_{-\\pi/4}^{\\pi/4}=\\frac{\\pi}{4}$입니다.',
          '따라서 꽃잎 한 장의 넓이는 $\\frac{1}{2}\\cdot\\frac{\\pi}{4}=\\frac{\\pi}{8}$이고, 꽃잎 4장 전체는 $\\frac{\\pi}{2}$입니다.',
        ],
        answer: '$\\frac{\\pi}{8}$',
      },
    ],

    terms: [
      { term: '매개변수', def: '곡선 위의 점의 좌표 $x$, $y$를 함께 정해 주는 제3의 변수입니다. 흔히 시각처럼 $t$로 씁니다.' },
      { term: '매개곡선', def: '$x=f(t)$, $y=g(t)$로 나타낸 곡선입니다. $t$가 커지는 쪽으로 방향이 있습니다. 예: $x=\\cos t$, $y=\\sin t$는 단위원' },
      { term: '수평접선', def: '기울기가 0인 접선입니다. 매개곡선에서는 $\\frac{dy}{dt}=0$이고 $\\frac{dx}{dt} \\ne 0$인 점에서 생깁니다.' },
      { term: '수직접선', def: '$y$축에 평행한 접선입니다. 매개곡선에서는 $\\frac{dx}{dt}=0$이고 $\\frac{dy}{dt} \\ne 0$인 점에서 생깁니다.' },
      { term: '극좌표', def: '원점(극)에서의 거리 $r$과 시초선에서 잰 각 $\\theta$로 점을 $(r, \\theta)$처럼 나타내는 방법입니다. $x=r\\cos\\theta$, $y=r\\sin\\theta$' },
      { term: '시초선', def: '극좌표에서 각을 재기 시작하는 반직선입니다. 보통 양의 $x$축을 씁니다.' },
      { term: '극곡선', def: '극방정식 $r=f(\\theta)$를 만족하는 점 전체가 이루는 곡선입니다.' },
      { term: '심장형(카디오이드)', def: '$r=a(1+\\cos\\theta)$ 꼴의 극곡선입니다. 하트 모양이고 원점에서 뾰족합니다. 넓이는 $\\frac{3}{2}\\pi a^2$, 길이는 $8a$입니다.' },
      { term: '장미 곡선', def: '$r=a\\cos n\\theta$ 또는 $r=a\\sin n\\theta$ 꼴의 극곡선입니다. $n$이 홀수이면 꽃잎 $n$장, 짝수이면 $2n$장입니다.' },
      { term: '사이클로이드', def: '직선 위를 미끄러지지 않고 구르는 원 위의 한 점이 그리는 곡선입니다. 반지름이 $r$이면 $x=r(t-\\sin t)$, $y=r(1-\\cos t)$입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '매개방정식 $x=t-1$, $y=2t+1$이 나타내는 곡선의 방정식은 무엇입니까?',
        choices: ['$y=2x+3$', '$y=2x-1$', '$y=2x+1$', '$y=\\frac{x-3}{2}$'],
        answer: 0,
        why: [
          '',
          '$x=t-1$을 $t=x-1$로 잘못 풀었습니다. $t=x+1$입니다.',
          '$t$ 자리에 $x$를 그대로 넣었습니다. 먼저 $t$를 $x$로 나타내야 합니다: $t=x+1$',
          '$x$와 $y$의 역할을 바꾸었습니다. 이 식은 $x=2y+3$을 $y$에 대하여 푼 것입니다.',
        ],
        explain: '$x=t-1$에서 $t=x+1$입니다. 이것을 $y=2t+1$에 대입하면 $y=2(x+1)+1=2x+3$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 1,
        q: '매개곡선 $x=t^2+3t$, $y=t^3-t$ 위에서 $t=1$인 점의 접선의 기울기를 구하십시오.',
        answer: '2/5',
        wrong: [
          { a: '5/2', why: '거꾸로 나누었습니다. $\\frac{dy}{dx}=\\frac{dy}{dt}\\div\\frac{dx}{dt}$입니다.' },
          { a: '2', why: '$\\frac{dy}{dt}$만 구했습니다. $\\frac{dx}{dt}$로 나누어야 합니다.' },
        ],
        explain: '$\\frac{dx}{dt}=2t+3=5$, $\\frac{dy}{dt}=3t^2-1=2$이므로 $\\frac{dy}{dx}=\\frac{2}{5}$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 3,
        q: '직교좌표 $(0, -3)$인 점을 $r>0$, $0 \\le \\theta<2\\pi$인 극좌표로 나타내면 $\\left(3, \\frac{\\pi}{2}\\right)$입니다.',
        answer: false,
        explain: '$r=3$은 맞지만, 점 $(0, -3)$은 음의 $y$축 위에 있으므로 $\\theta=\\frac{3\\pi}{2}$입니다. 바른 극좌표는 $\\left(3, \\frac{3\\pi}{2}\\right)$입니다. $\\left(3, \\frac{\\pi}{2}\\right)$는 $(0, 3)$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 3,
        q: '극좌표 $\\left(4, \\frac{2\\pi}{3}\\right)$인 점의 직교좌표는 무엇입니까?',
        choices: ['$(-2, 2\\sqrt{3})$', '$(2, 2\\sqrt{3})$', '$(-2\\sqrt{3}, 2)$', '$(2\\sqrt{3}, -2)$'],
        answer: 0,
        why: [
          '',
          '$\\cos\\frac{2\\pi}{3}$의 부호를 놓쳤습니다. 제2사분면의 각이라 $\\cos\\frac{2\\pi}{3}=-\\frac{1}{2}$입니다.',
          '$\\cos$와 $\\sin$의 값을 바꾸어 썼습니다. $\\cos\\frac{2\\pi}{3}=-\\frac{1}{2}$, $\\sin\\frac{2\\pi}{3}=\\frac{\\sqrt{3}}{2}$입니다.',
          '$\\cos$와 $\\sin$을 바꾸고 부호도 틀렸습니다. $x=r\\cos\\theta$, $y=r\\sin\\theta$입니다.',
        ],
        explain: '$x=4\\cos\\frac{2\\pi}{3}=4\\cdot\\left(-\\frac{1}{2}\\right)=-2$, $y=4\\sin\\frac{2\\pi}{3}=4\\cdot\\frac{\\sqrt{3}}{2}=2\\sqrt{3}$이므로 $(-2, 2\\sqrt{3})$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 4,
        q: '극방정식 $r=4\\sin\\theta$를 직교좌표의 방정식으로 바르게 나타낸 것은 무엇입니까?',
        choices: ['$x^2+(y-2)^2=4$', '$(x-2)^2+y^2=4$', '$x^2+(y-4)^2=16$', '$x^2+y^2=4$'],
        answer: 0,
        why: [
          '',
          '$\\sin\\theta$를 $x$ 쪽으로 보냈습니다. $r\\sin\\theta=y$이므로 중심은 $y$축 위에 있습니다.',
          '$x^2+y^2=4y$를 완전제곱식으로 바꿀 때 $4y$의 절반인 2가 아니라 4를 썼습니다.',
          '$r=4\\sin\\theta$를 $r=2$처럼 다루었습니다. 양변에 $r$을 곱해 $r^2=4r\\sin\\theta$로 바꿉니다.',
        ],
        explain: '양변에 $r$을 곱하면 $r^2=4r\\sin\\theta$, 곧 $x^2+y^2=4y$입니다. 정리하면 $x^2+(y-2)^2=4$, 중심이 $(0, 2)$이고 반지름이 2인 원입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 4,
        q: '장미 곡선 $r=2\\cos 4\\theta$의 꽃잎은 몇 장입니까?',
        choices: ['8장', '4장', '2장', '16장'],
        answer: 0,
        why: [
          '',
          '$n$이 홀수일 때의 규칙($n$장)을 썼습니다. $n=4$는 짝수이므로 $2n=8$장입니다.',
          '앞의 계수 2를 꽃잎 수로 보았습니다. 계수 2는 꽃잎의 길이(원점에서 가장 먼 거리)입니다.',
          '$n^2$으로 셌습니다. 짝수이면 $2n$장입니다.',
        ],
        explain: '$n=4$가 짝수이므로 꽃잎은 $2n=8$장입니다. 각 꽃잎의 길이는 2입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 4,
        q: '그림의 극곡선을 나타내는 극방정식은 무엇입니까?',
        fig: { type: 'svg', svg: MYSTERY_SVG, alt: '원점에서 뾰족하고 위쪽으로 부푼 하트 모양 곡선. 점 (0, 2), (1, 0), (-1, 0)을 지난다' },
        choices: ['$r=1+\\sin\\theta$', '$r=1+\\cos\\theta$', '$r=1-\\sin\\theta$', '$r=\\sin 2\\theta$'],
        answer: 0,
        why: [
          '',
          '$r=1+\\cos\\theta$는 $\\theta=0$에서 $r=2$이므로 오른쪽으로 부푼 심장형입니다.',
          '$r=1-\\sin\\theta$는 $\\theta=\\frac{3\\pi}{2}$에서 $r=2$이므로 아래쪽으로 부푼 심장형입니다.',
          '$r=\\sin 2\\theta$는 꽃잎이 4장인 장미 곡선입니다.',
        ],
        explain: '곡선은 원점($\\theta=\\frac{3\\pi}{2}$에서 $r=0$)에서 뾰족하고, $\\theta=\\frac{\\pi}{2}$에서 가장 먼 점 $(0, 2)$를 지납니다. $\\theta=0$, $\\pi$에서 $r=1$이므로 $(1, 0)$, $(-1, 0)$도 지납니다. $r=1+\\sin\\theta$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 2,
        q: '매개곡선 $x=t^2$, $y=\\frac{2}{3}t^3$ $(0 \\le t \\le \\sqrt{3})$의 길이를 구하십시오.',
        answer: '14/3',
        hint: '$\\sqrt{\\left(\\frac{dx}{dt}\\right)^2+\\left(\\frac{dy}{dt}\\right)^2}$를 $2t\\sqrt{1+t^2}$ 꼴로 정리해 보십시오.',
        wrong: [{ a: '16/3', why: '아래끝 $t=0$에서의 값 $\\frac{2}{3}(1+0)^{\\frac{3}{2}}=\\frac{2}{3}$를 빼지 않았습니다.' }],
        explain: '$\\frac{dx}{dt}=2t$, $\\frac{dy}{dt}=2t^2$이므로 $\\sqrt{4t^2+4t^4}=2t\\sqrt{1+t^2}$입니다($t \\ge 0$).\n\n$L=\\int_{0}^{\\sqrt{3}}2t\\sqrt{1+t^2}\\,dt=\\left[\\frac{2}{3}(1+t^2)^{\\frac{3}{2}}\\right]_{0}^{\\sqrt{3}}=\\frac{2}{3}(8-1)=\\frac{14}{3}$',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 5,
        q: '심장형 $r=2(1+\\cos\\theta)$로 둘러싸인 영역의 넓이는 얼마입니까?',
        choices: ['$6\\pi$', '$12\\pi$', '$4\\pi$', '$2\\pi$'],
        answer: 0,
        why: [
          '',
          '넓이 공식의 $\\frac{1}{2}$을 빠뜨렸습니다.',
          '$\\cos^2\\theta$의 적분 $\\pi$를 빠뜨렸습니다. $\\int_{0}^{2\\pi}\\cos^2\\theta\\,d\\theta=\\pi$입니다.',
          '$r^2$이 아니라 $r$을 적분했습니다. 넓이는 $\\frac{1}{2}\\int r^2\\,d\\theta$입니다.',
        ],
        hint: '$(1+\\cos\\theta)^2=1+2\\cos\\theta+\\cos^2\\theta$를 $0$부터 $2\\pi$까지 적분합니다.',
        explain: '$A=\\frac{1}{2}\\int_{0}^{2\\pi}4(1+\\cos\\theta)^2\\,d\\theta=2\\int_{0}^{2\\pi}(1+2\\cos\\theta+\\cos^2\\theta)\\,d\\theta=2(2\\pi+0+\\pi)=6\\pi$입니다. ($r=a(1+\\cos\\theta)$의 넓이 $\\frac{3}{2}\\pi a^2$에 $a=2$를 넣은 값과 같습니다.)',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 1,
        q: '매개곡선 $x=t^3-3t$, $y=t^2$이 수직접선을 가지는 점을 모두 고른 것은 무엇입니까?',
        choices: ['$(-2, 1)$, $(2, 1)$', '$(0, 0)$', '$(1, -2)$, $(1, 2)$', '$(-2, 1)$, $(2, 1)$, $(0, 0)$'],
        answer: 0,
        why: [
          '',
          '$(0, 0)$은 $\\frac{dy}{dt}=0$인 점, 곧 수평접선을 가지는 점입니다.',
          '$x$좌표와 $y$좌표를 바꾸어 썼습니다. $t=1$이면 $x=1-3=-2$, $y=1$입니다.',
          '$(0, 0)$에서는 $\\frac{dx}{dt}=-3 \\ne 0$이므로 수직접선이 아니라 수평접선입니다.',
        ],
        hint: '수직접선은 $\\frac{dx}{dt}=0$이고 $\\frac{dy}{dt} \\ne 0$인 점에서 생깁니다.',
        explain: '$\\frac{dx}{dt}=3t^2-3=0$에서 $t=\\pm 1$이고, 이때 $\\frac{dy}{dt}=2t \\ne 0$입니다. $t=1$이면 $(-2, 1)$, $t=-1$이면 $(2, 1)$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 1,
        q: '매개곡선 $x=t^2$, $y=t^3$ $(t>0)$에서 $t=1$일 때 $\\frac{d^2y}{dx^2}$의 값을 구하십시오.',
        answer: '3/4',
        hint: '먼저 $\\frac{dy}{dx}$를 $t$의 식으로 구하고, 그것을 $t$로 미분한 뒤 $\\frac{dx}{dt}$로 나눕니다.',
        wrong: [
          { a: '3/2', why: '$\\frac{dy}{dx}=\\frac{3t}{2}$를 $t$로 미분하기만 했습니다. $x$에 대한 미분이므로 $\\frac{dx}{dt}=2t$로 한 번 더 나눕니다.' },
          { a: '3', why: '$\\frac{d^2y}{dt^2}=6t$를 $\\frac{d^2x}{dt^2}=2$로 나누었습니다. 이 방법은 틀린 공식입니다.' },
        ],
        explain: '$\\frac{dy}{dx}=\\frac{3t^2}{2t}=\\frac{3t}{2}$입니다. 이것을 $t$로 미분하면 $\\frac{3}{2}$이고, $\\frac{dx}{dt}=2t$로 나누면 $\\frac{d^2y}{dx^2}=\\frac{3}{4t}$입니다. $t=1$이면 $\\frac{3}{4}$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 5,
        q: '극곡선 $r=\\theta^2$ $(0 \\le \\theta \\le \\sqrt{5})$의 길이를 구하십시오.',
        answer: '19/3',
        hint: '$r^2+\\left(\\frac{dr}{d\\theta}\\right)^2=\\theta^2(\\theta^2+4)$입니다.',
        wrong: [{ a: '9', why: '아래끝 $\\theta=0$에서의 값 $\\frac{1}{3}\\cdot 4^{\\frac{3}{2}}=\\frac{8}{3}$을 빼지 않았습니다.' }],
        explain: '$\\frac{dr}{d\\theta}=2\\theta$이므로 $\\sqrt{\\theta^4+4\\theta^2}=\\theta\\sqrt{\\theta^2+4}$입니다($\\theta \\ge 0$).\n\n$L=\\int_{0}^{\\sqrt{5}}\\theta\\sqrt{\\theta^2+4}\\,d\\theta=\\left[\\frac{1}{3}(\\theta^2+4)^{\\frac{3}{2}}\\right]_{0}^{\\sqrt{5}}=\\frac{1}{3}(27-8)=\\frac{19}{3}$',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 2,
        q: '반지름이 2인 원이 $x$축 위를 미끄러지지 않고 한 바퀴 구를 때, 원 위의 한 점이 그리는 사이클로이드 $x=2(t-\\sin t)$, $y=2(1-\\cos t)$ $(0 \\le t \\le 2\\pi)$의 길이를 구하십시오.',
        fig: { type: 'svg', svg: CYCLOID_SVG, alt: '사이클로이드 한 아치. t=0 일 때 원점에서 출발해 가장 높은 점 (2π, 4)를 지나 t=2π 일 때 (4π, 0)에 닿는다' },
        answer: '16',
        hint: '$1-\\cos t=2\\sin^2\\frac{t}{2}$를 이용하면 근호를 벗길 수 있습니다.',
        wrong: [
          { a: '8', why: '반지름이 1인 사이클로이드의 길이입니다. 이 곡선은 반지름이 2이므로 길이도 2배입니다.' },
          { a: '0', why: '$\\sqrt{\\sin^2\\frac{t}{2}}=\\sin\\frac{t}{2}$는 $0 \\le t \\le 2\\pi$에서 0 이상이므로 적분값이 0이 될 수 없습니다. 부정적분 $-2\\cos\\frac{t}{2}$의 부호를 확인해 보십시오.' },
        ],
        explain: '$\\frac{dx}{dt}=2(1-\\cos t)$, $\\frac{dy}{dt}=2\\sin t$이므로\n\n$\\left(\\frac{dx}{dt}\\right)^2+\\left(\\frac{dy}{dt}\\right)^2=4(1-2\\cos t+\\cos^2 t+\\sin^2 t)=8(1-\\cos t)=16\\sin^2\\frac{t}{2}$\n\n$0 \\le t \\le 2\\pi$에서 $\\sin\\frac{t}{2} \\ge 0$이므로 속력은 $4\\sin\\frac{t}{2}$입니다.\n\n$L=\\int_{0}^{2\\pi}4\\sin\\frac{t}{2}\\,dt=\\left[-8\\cos\\frac{t}{2}\\right]_{0}^{2\\pi}=8+8=16$\n\n반지름이 $r$이면 길이는 $8r$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 5,
        q: '원 $r=3\\sin\\theta$의 안쪽이면서 심장형 $r=1+\\sin\\theta$의 바깥쪽인 영역의 넓이는 얼마입니까?',
        fig: { type: 'svg', svg: REGION_SVG, alt: '원 r = 3 sin θ(중심 (0, 1.5), 반지름 1.5)와 심장형 r = 1 + sin θ. 두 곡선은 θ=π/6, θ=5π/6 방향에서 만난다' },
        choices: ['$\\pi$', '$2\\pi$', '$\\frac{3\\pi}{4}$', '$\\pi-\\frac{3\\sqrt{3}}{2}$'],
        answer: 0,
        why: [
          '',
          '넓이 공식의 $\\frac{1}{2}$을 빠뜨렸습니다.',
          '원 전체 넓이 $\\frac{9\\pi}{4}$에서 심장형 전체 넓이 $\\frac{3\\pi}{2}$를 뺐습니다. 심장형의 일부는 원 밖에 있으므로 이렇게 뺄 수 없습니다.',
          '$\\frac{1}{2}\\int(r_1-r_2)^2\\,d\\theta$로 계산했습니다. 넓이는 $\\frac{1}{2}\\int(r_1^2-r_2^2)\\,d\\theta$입니다.',
        ],
        hint: '두 곡선이 만나는 각을 $3\\sin\\theta=1+\\sin\\theta$에서 구하고, 그 사이에서 $\\frac{1}{2}\\int(r_{\\text{바깥}}^2-r_{\\text{안}}^2)\\,d\\theta$를 계산합니다.',
        explain: '$3\\sin\\theta=1+\\sin\\theta$에서 $\\sin\\theta=\\frac{1}{2}$, $\\theta=\\frac{\\pi}{6}, \\frac{5\\pi}{6}$입니다. 이 사이에서 원이 바깥에 있으므로\n\n$A=\\frac{1}{2}\\int_{\\pi/6}^{5\\pi/6}\\left(9\\sin^2\\theta-(1+\\sin\\theta)^2\\right)d\\theta=\\frac{1}{2}\\int_{\\pi/6}^{5\\pi/6}(3-4\\cos 2\\theta-2\\sin\\theta)\\,d\\theta$\n\n$=\\frac{1}{2}\\left[3\\theta-2\\sin 2\\theta+2\\cos\\theta\\right]_{\\pi/6}^{5\\pi/6}=\\frac{1}{2}(2\\pi+2\\sqrt{3}-2\\sqrt{3})=\\pi$\n\n($8\\sin^2\\theta=4-4\\cos 2\\theta$를 썼습니다.)',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 1,
        q: '심장형 $r=1+\\cos\\theta$ 위에서 $\\theta=\\frac{\\pi}{2}$인 점의 접선의 기울기 $\\frac{dy}{dx}$를 구하십시오.',
        answer: '1',
        hint: '$x=r\\cos\\theta$, $y=r\\sin\\theta$로 놓으면 $\\theta$를 매개변수로 하는 매개곡선입니다.',
        wrong: [
          { a: '-1', why: '$\\frac{dr}{d\\theta}=-\\sin\\theta=-1$을 기울기로 썼습니다. $\\frac{dr}{d\\theta}$은 접선의 기울기가 아닙니다. $\\frac{dy}{d\\theta}\\div\\frac{dx}{d\\theta}$를 구합니다.' },
          { a: '0', why: '점 $(0, 1)$에서 $r$이 최대라고 생각했을 수 있습니다. 직접 $\\frac{dy}{d\\theta}$와 $\\frac{dx}{d\\theta}$를 계산해 보십시오.' },
        ],
        explain: '$x=(1+\\cos\\theta)\\cos\\theta$, $y=(1+\\cos\\theta)\\sin\\theta$입니다.\n\n$\\frac{dx}{d\\theta}=-\\sin\\theta-2\\sin\\theta\\cos\\theta$, $\\frac{dy}{d\\theta}=\\cos\\theta+\\cos^2\\theta-\\sin^2\\theta$\n\n$\\theta=\\frac{\\pi}{2}$이면 $\\frac{dx}{d\\theta}=-1$, $\\frac{dy}{d\\theta}=0+0-1=-1$이므로 $\\frac{dy}{dx}=\\frac{-1}{-1}=1$입니다. (접점은 $(0, 1)$입니다.)',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 1,
        q: '매개곡선 $x=t^2-2t$, $y=t^3-3t$에서 수평접선을 가지는 점을 바르게 말한 것은 무엇입니까?',
        choices: ['$(3, 2)$ 한 점뿐이다', '$(3, 2)$와 $(-1, -2)$ 두 점이다', '$(-1, -2)$ 한 점뿐이다', '수평접선을 가지는 점은 없다'],
        answer: 0,
        why: [
          '',
          '$t=1$에서는 $\\frac{dx}{dt}$와 $\\frac{dy}{dt}$가 모두 0입니다. 이때는 극한을 보아야 하고, 기울기는 3으로 수평이 아닙니다.',
          '$t=1$인 점 $(-1, -2)$에서는 $\\frac{dx}{dt}=0$이기도 하므로 공식을 그대로 쓸 수 없고, 기울기의 극한은 3입니다. 수평접선은 $t=-1$인 점에 있습니다.',
          '$t=-1$이면 $\\frac{dy}{dt}=0$, $\\frac{dx}{dt}=-4 \\ne 0$이므로 수평접선이 있습니다.',
        ],
        hint: '$\\frac{dy}{dt}=0$인 $t$를 구한 뒤, 그 $t$에서 $\\frac{dx}{dt}$도 0인지 확인합니다.',
        explain: '$\\frac{dy}{dt}=3t^2-3=0$에서 $t=\\pm 1$입니다.\n\n- $t=-1$: $\\frac{dx}{dt}=2t-2=-4 \\ne 0$이므로 수평접선입니다. 점은 $(1+2, -1+3)=(3, 2)$입니다.\n- $t=1$: $\\frac{dx}{dt}=0$이기도 합니다. $t \\ne 1$에서 $\\frac{dy}{dx}=\\frac{3(t-1)(t+1)}{2(t-1)}=\\frac{3(t+1)}{2}$이므로 $t \\to 1$일 때 기울기는 3입니다. 수평이 아닙니다.\n\n따라서 수평접선을 가지는 점은 $(3, 2)$뿐입니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 5,
        q: '장미 곡선 $r=2\\cos 3\\theta$의 꽃잎 한 장의 넓이는 얼마입니까?',
        choices: ['$\\frac{\\pi}{3}$', '$\\pi$', '$\\frac{2\\pi}{3}$', '$\\frac{\\pi}{6}$'],
        answer: 0,
        why: [
          '',
          '꽃잎 3장 전체의 넓이입니다. 한 장은 그 $\\frac{1}{3}$입니다.',
          '넓이 공식의 $\\frac{1}{2}$을 빠뜨렸습니다.',
          '꽃잎의 절반($0 \\le \\theta \\le \\frac{\\pi}{6}$)만 적분했습니다. 꽃잎 한 장은 $-\\frac{\\pi}{6} \\le \\theta \\le \\frac{\\pi}{6}$입니다.',
        ],
        hint: '$\\theta=0$ 방향의 꽃잎은 $\\cos 3\\theta \\ge 0$인 범위에서 그려집니다.',
        explain: '꽃잎 한 장은 $-\\frac{\\pi}{6} \\le \\theta \\le \\frac{\\pi}{6}$에서 그려집니다.\n\n$A=\\frac{1}{2}\\int_{-\\pi/6}^{\\pi/6}4\\cos^2 3\\theta\\,d\\theta=\\int_{-\\pi/6}^{\\pi/6}(1+\\cos 6\\theta)\\,d\\theta=\\frac{\\pi}{3}+\\left[\\frac{\\sin 6\\theta}{6}\\right]_{-\\pi/6}^{\\pi/6}=\\frac{\\pi}{3}$',
      },
    ],

    deeper: [
      {
        title: '사이클로이드 — 가장 빨리 미끄러져 내려오는 길',
        body: '높이가 다른 두 점을 잇는 미끄럼틀 가운데, 마찰 없이 공이 **가장 빨리** 내려오는 모양은 직선이 아니라 (뒤집힌) 사이클로이드의 일부입니다. 1696년 요한 베르누이가 이 문제(최단 강하선 문제)를 내었고, 여러 수학자가 풀이를 내놓았습니다. 이 문제는 함수 전체 가운데 가장 좋은 것을 찾는 **변분법**이 발전하는 계기가 되었습니다.\n\n사이클로이드에는 또 다른 성질도 있습니다. 뒤집힌 사이클로이드 그릇의 어느 높이에서 공을 놓아도 바닥에 닿는 시간이 같습니다(등시성). 하위헌스는 이 성질을 이용해 더 정확한 진자 시계를 설계하려 했습니다.\n\n이 단원에서 구한 길이 $8r$과 한 아치 아래 넓이 $3\\pi r^2$(굴러가는 원 넓이의 3배)도 이 곡선이 가진 깔끔한 성질입니다.',
      },
      {
        title: '극좌표는 어디에 쓰일까',
        body: '중심에서의 거리와 방향이 자연스러운 문제에서는 극좌표가 식을 크게 줄여 줍니다.\n\n- **행성의 궤도**: 태양을 극으로 두면 타원 궤도가 $r=\\frac{p}{1+e\\cos\\theta}$ 한 줄로 쓰입니다($p$는 양의 상수, $e$는 이심률). $e<1$이면 타원, $e=1$이면 포물선, $e>1$이면 쌍곡선입니다.\n- **마이크의 지향성**: 앞쪽 소리를 잘 받고 뒤쪽 소리를 거의 받지 않는 마이크의 감도 그림이 심장형과 닮아 "카디오이드 마이크"라고 부릅니다.\n- **다변수 미적분**: 원 모양 영역의 이중적분은 극좌표로 바꾸면 쉬워집니다. 이때 넓이 요소가 $dx\\,dy$에서 $r\\,dr\\,d\\theta$로 바뀌는데, 이 단원의 부채꼴 넓이 $\\frac{1}{2}r^2\\Delta\\theta$와 같은 생각에서 나옵니다.',
      },
    ],

    faq: [
      {
        q: '매개방정식은 왜 써요? 그냥 $y=f(x)$로 쓰면 안 되나요?',
        a: '원이나 고리 모양처럼 한 $x$에 $y$가 여러 개인 곡선은 $y=f(x)$ 하나로 쓸 수 없습니다. 매개방정식은 이런 곡선도 간단히 나타내고, 점이 언제 어디에 있는지(방향과 빠르기)까지 담습니다. 물체의 운동을 다룰 때 특히 자연스럽습니다.',
      },
      {
        q: '극좌표에서 $r$이 음수면 어떻게 그려요?',
        a: '$(r, \\theta)$에서 $r<0$이면 $\\theta$ 방향의 반대쪽으로 $|r|$만큼 갑니다. 곧 $(r, \\theta)$와 $(-r, \\theta+\\pi)$는 같은 점입니다. 장미 곡선 $r=\\cos 3\\theta$에서 $r<0$인 부분이 반대쪽 꽃잎과 겹치는 것이 이 때문입니다.',
      },
      {
        q: '극좌표 넓이 공식에는 왜 $\\frac{1}{2}$이 붙어요?',
        a: '극좌표에서는 영역을 직사각형이 아니라 가는 부채꼴로 나눕니다. 반지름 $r$, 중심각 $\\Delta\\theta$인 부채꼴의 넓이가 $\\frac{1}{2}r^2\\Delta\\theta$이므로, 이를 더한 적분에도 $\\frac{1}{2}$이 남습니다. 반지름이 $a$인 원 $r=a$에 넣어 보면 $\\frac{1}{2}a^2\\cdot 2\\pi=\\pi a^2$으로 맞습니다.',
      },
      {
        q: '매개곡선의 이계도함수를 $\\frac{d^2y}{dt^2}$를 $\\frac{d^2x}{dt^2}$로 나누어 구하면 왜 틀려요?',
        a: '$\\frac{d^2y}{dx^2}$는 $\\frac{dy}{dx}$를 "$x$에 대하여" 미분한 것입니다. $\\frac{dy}{dx}$는 $t$의 함수이므로 $t$로 미분한 뒤 $\\frac{dx}{dt}$로 나누어야 합니다(연쇄법칙). 예를 들어 $x=t^2$, $y=t^3$이면 바른 값은 $\\frac{3}{4t}$인데, 틀린 방법은 $\\frac{6t}{2}=3t$가 나옵니다.',
      },
    ],

    mistakes: [
      '직교좌표를 극좌표로 바꿀 때 $\\tan\\theta=\\frac{y}{x}$만 보고 $\\theta$를 정하는 실수 — 점이 있는 사분면을 확인합니다. $(-1, -1)$은 $\\theta=\\frac{\\pi}{4}$가 아니라 $\\frac{5\\pi}{4}$입니다.',
      '극곡선의 넓이에서 $\\frac{1}{2}$을 빠뜨리거나, 같은 부분을 두 번 그리는 범위로 적분하는 실수 — $r=2\\cos\\theta$는 $0 \\le \\theta \\le \\pi$에서 원을 한 바퀴 그립니다.',
      '매개곡선의 $\\frac{d^2y}{dx^2}$를 $\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)$로 끝내는 실수 — 마지막에 $\\frac{dx}{dt}$로 한 번 더 나눕니다.',
    ],

    gens: [
      {
        id: 'param-slope',
        level: 1,
        title: '매개곡선의 접선의 기울기',
        make: function (R) {
          var a, b, c, d, t0, dx, dy;
          do {
            a = R.nonzero(-3, 3); b = R.int(-4, 4); c = R.nonzero(-2, 2); d = R.int(-5, 5);
            t0 = R.pick([-2, -1, 1, 2]);
            dx = 2 * a * t0 + b; dy = 3 * c * t0 * t0 + d;
          } while (dx === 0 || dy === 0);
          var ans = R.F(dy, dx);
          var xs = R.fmt.poly([a, b, 0], 't'), ys = R.fmt.poly([c, 0, d, 0], 't');
          var wrong = [];
          var rec = R.F(dx, dy);
          if (!rec.eq(ans)) wrong.push({ a: rec.toString(), why: '거꾸로 나누었습니다. $\\frac{dy}{dx}$는 $\\frac{dy}{dt}$를 $\\frac{dx}{dt}$로 나눈 값입니다.' });
          if (!ans.eq(dy)) wrong.push({ a: String(dy), why: '$\\frac{dy}{dt}$의 값만 구했습니다. $\\frac{dx}{dt}=' + dx + '$' + R.josa(dx, '으로/로') + ' 나누어야 합니다.' });
          return {
            type: 'short', check: 'number', concept: 1,
            q: '매개곡선 $x=' + xs + '$, $y=' + ys + '$ 위에서 $t=' + t0 + '$인 점의 접선의 기울기 $\\frac{dy}{dx}$를 구하십시오.',
            answer: ans.toString(),
            wrong: wrong,
            explain: '$\\frac{dx}{dt}=' + R.fmt.poly([2 * a, b], 't') + '$, $\\frac{dy}{dt}=' + R.fmt.poly([3 * c, 0, d], 't') + '$이므로 $t=' + t0 + '$에서 $\\frac{dx}{dt}=' + dx + '$, $\\frac{dy}{dt}=' + dy + '$입니다.\n\n$\\frac{dy}{dx}=' + dy + '\\div' + R.fmt.paren(dx) + '=' + R.fmt.frac(ans) + '$',
          };
        },
      },
      {
        id: 'polar-to-rect',
        level: 1,
        title: '극좌표를 직교좌표로 바꾸기',
        make: function (R) {
          var ang = R.pick(ANGLES), n = ang[0], dd = ang[1];
          var r = R.pick([2, 4, 6]), h = r / 2;
          var th = n * PI / dd;
          var ce = exactTrig(Math.cos(th)), se = exactTrig(Math.sin(th));
          var X = coordTex(ce.s * h, ce.k), Y = coordTex(se.s * h, se.k);
          var nX = coordTex(-ce.s * h, ce.k), nY = coordTex(-se.s * h, se.k);
          function pt(a, b) { return '$(' + a + ', ' + b + ')$'; }
          var correct = pt(X, Y);
          var quad = th < PI / 2 ? 1 : th < PI ? 2 : th < 3 * PI / 2 ? 3 : 4;
          var signWhy = '부호를 잘못 정했습니다. $\\theta$는 제' + quad + '사분면의 각이므로 점도 제' + quad + '사분면에 있습니다.';
          var cands = [
            [pt(Y, X), '$\\cos$와 $\\sin$의 값을 바꾸어 썼습니다. $x=r\\cos\\theta$, $y=r\\sin\\theta$입니다.'],
            [pt(nX, Y), signWhy],
            [pt(X, nY), signWhy],
            [pt(nX, nY), signWhy],
            [pt(coordTex(ce.s * h, 1), coordTex(se.s * h, 1)), '근호를 빠뜨렸습니다. $\\frac{\\sqrt{2}}{2}$, $\\frac{\\sqrt{3}}{2}$ 같은 값을 다시 확인해 보십시오.'],
            [pt(nY, nX), '$\\cos$와 $\\sin$을 바꾸고 부호도 틀렸습니다.'],
          ];
          var reason = {};
          cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
          var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
          var A = angTex(n, dd);
          return {
            type: 'choice', concept: 3,
            q: '극좌표 $\\left(' + r + ', ' + A + '\\right)$인 점의 직교좌표는 무엇입니까?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: '$x=' + r + '\\cos ' + A + '=' + r + '\\cdot\\left(' + trigTex(ce) + '\\right)=' + X + '$, $y=' + r + '\\sin ' + A + '=' + r + '\\cdot\\left(' + trigTex(se) + '\\right)=' + Y + '$이므로 직교좌표는 ' + correct + '입니다.',
          };
        },
      },
      {
        id: 'polar-area',
        level: 2,
        title: '극곡선으로 둘러싸인 넓이',
        make: function (R) {
          var kind = R.pick(['cardioid', 'circle', 'rose']);
          var fn = R.pick(['cos', 'sin']), eq, k, steps, wrong = [];
          if (kind === 'cardioid') {
            var a = R.int(1, 4), sg = R.pick(['+', '-']);
            eq = 'r=' + (a === 1 ? '' : a) + '(1' + sg + '\\' + fn + '\\theta)';
            k = R.F(3 * a * a, 2);
            steps = '$A=\\frac{1}{2}\\int_{0}^{2\\pi}' + (a === 1 ? '' : a * a) + '(1' + sg + '\\' + fn + '\\theta)^2\\,d\\theta=\\frac{' + a * a + '}{2}\\int_{0}^{2\\pi}(1' + sg + '2\\' + fn + '\\theta+\\' + fn + '^2\\theta)\\,d\\theta=\\frac{' + a * a + '}{2}(2\\pi+0+\\pi)=' + piTex(k) + '$';
            wrong.push({ a: k.mul(2).toString(), why: '넓이 공식의 $\\frac{1}{2}$을 빠뜨렸습니다.' });
            wrong.push({ a: String(a * a), why: '$\\' + fn + '^2\\theta$의 적분 $\\pi$를 빠뜨렸습니다. $\\int_{0}^{2\\pi}\\' + fn + '^2\\theta\\,d\\theta=\\pi$입니다.' });
          } else if (kind === 'circle') {
            var cc = R.int(2, 8);
            eq = 'r=' + cc + '\\' + fn + '\\theta';
            k = R.F(cc * cc, 4);
            var rng = fn === 'cos' ? '-\\frac{\\pi}{2}}^{\\frac{\\pi}{2}' : '0}^{\\pi';
            steps = '이 곡선은 반지름이 $' + R.fmt.frac(R.F(cc, 2)) + '$인 원이고, $\\theta$가 ' + (fn === 'cos' ? '$-\\frac{\\pi}{2}$부터 $\\frac{\\pi}{2}$까지' : '$0$부터 $\\pi$까지') + ' 변할 때 한 바퀴를 그립니다.\n\n$A=\\frac{1}{2}\\int_{' + rng + '}' + cc * cc + '\\' + fn + '^2\\theta\\,d\\theta=\\frac{' + cc * cc + '}{2}\\cdot\\frac{\\pi}{2}=' + piTex(k) + '$';
            wrong.push({ a: k.mul(2).toString(), why: '$\\frac{1}{2}$을 빠뜨렸거나, $0$부터 $2\\pi$까지 적분해 원을 두 바퀴 셌습니다.' });
          } else {
            var ra = R.int(1, 3), nn = R.int(2, 5);
            eq = 'r=' + (ra === 1 ? '' : ra) + '\\' + fn + ' ' + nn + '\\theta';
            var odd = nn % 2 === 1;
            k = R.F(ra * ra, odd ? 4 : 2);
            steps = '$n=' + nn + '$' + R.josa(nn, '이/가') + (odd ? ' 홀수이므로 꽃잎은 ' + nn + '장이고, $0 \\le \\theta \\le \\pi$에서 곡선 전체를 한 번 그립니다.' : ' 짝수이므로 꽃잎은 ' + 2 * nn + '장이고, $0 \\le \\theta \\le 2\\pi$에서 곡선 전체를 한 번 그립니다.') +
              '\n\n$A=\\frac{1}{2}\\int_{0}^{' + (odd ? '\\pi' : '2\\pi') + '}' + (ra === 1 ? '' : ra * ra) + '\\' + fn + '^2 ' + nn + '\\theta\\,d\\theta=\\frac{' + ra * ra + '}{2}\\cdot' + (odd ? '\\frac{\\pi}{2}' : '\\pi') + '=' + piTex(k) + '$';
            wrong.push({ a: k.mul(2).toString(), why: odd ? '$\\frac{1}{2}$을 빠뜨렸거나, $0$부터 $2\\pi$까지 적분해 꽃잎을 두 번씩 셌습니다($n$이 홀수이면 $\\pi$까지로 충분합니다).' : '넓이 공식의 $\\frac{1}{2}$을 빠뜨렸습니다.' });
            if (!odd) wrong.push({ a: k.div(2).toString(), why: '$n$이 짝수인데 $0$부터 $\\pi$까지만 적분해 꽃잎의 절반만 셌습니다. 짝수이면 꽃잎이 $2n$장이고 $2\\pi$까지 적분합니다.' });
          }
          return {
            type: 'short', check: 'number', concept: 5,
            q: '극곡선 $' + eq + '$로 둘러싸인 영역' + (kind === 'rose' ? '(꽃잎 전체)' : '') + '의 넓이를 $k\\pi$라고 할 때, $k$의 값을 구하십시오.',
            answer: k.toString(),
            wrong: wrong,
            hint: '넓이는 $\\frac{1}{2}\\int r^2\\,d\\theta$이고, 곡선을 한 번만 그리는 $\\theta$의 범위로 적분합니다.',
            explain: steps + '\n\n따라서 $k=' + R.fmt.frac(k) + '$입니다.',
          };
        },
      },
      {
        id: 'param-length',
        level: 2,
        title: '매개곡선의 길이',
        make: function (R) {
          var TT = ['0', '\\sqrt{3}', '2\\sqrt{2}', '\\sqrt{15}'];   // s=1,2,3,4 일 때 t=√(s²-1)
          var pair = R.sample([1, 2, 3, 4], 2).sort(function (p, q) { return p - q; });
          var s1 = pair[0], s2 = pair[1], m = R.int(1, 6);
          var cy = R.F(2 * m, 3), L = cy.mul(s2 * s2 * s2 - s1 * s1 * s1);
          var xs = (m === 1 ? '' : m) + 't^2';
          var ys = (cy.isInt() ? (cy.num === 1 ? '' : cy.num) : R.fmt.frac(cy)) + 't^3';
          var two = 2 * m === 1 ? '' : String(2 * m);
          var wrong = [];
          var noLower = cy.mul(s2 * s2 * s2);
          if (!noLower.eq(L)) wrong.push({ a: noLower.toString(), why: '아래끝에서의 값 $' + R.fmt.frac(cy) + '\\cdot ' + s1 * s1 + '^{\\frac{3}{2}}$을 빼지 않았습니다.' });
          return {
            type: 'short', check: 'number', concept: 2,
            q: '매개곡선 $x=' + xs + '$, $y=' + ys + '$ $(' + TT[s1 - 1] + ' \\le t \\le ' + TT[s2 - 1] + ')$의 길이를 구하십시오.',
            answer: L.toString(),
            wrong: wrong,
            hint: '$\\sqrt{\\left(\\frac{dx}{dt}\\right)^2+\\left(\\frac{dy}{dt}\\right)^2}$를 $t\\sqrt{1+t^2}$의 상수배로 정리해 보십시오.',
            explain: '$\\frac{dx}{dt}=' + two + 't$, $\\frac{dy}{dt}=' + two + 't^2$이므로 $\\sqrt{' + 4 * m * m + 't^2+' + 4 * m * m + 't^4}=' + two + 't\\sqrt{1+t^2}$입니다($t \\ge 0$).\n\n' +
              '$L=\\int_{' + TT[s1 - 1] + '}^{' + TT[s2 - 1] + '}' + two + 't\\sqrt{1+t^2}\\,dt=\\left[' + R.fmt.frac(cy) + '(1+t^2)^{\\frac{3}{2}}\\right]_{' + TT[s1 - 1] + '}^{' + TT[s2 - 1] + '}=' + R.fmt.frac(cy) + '(' + s2 * s2 * s2 + '-' + s1 * s1 * s1 + ')=' + R.fmt.frac(L) + '$\n\n' +
              '($t=' + TT[s2 - 1] + '$이면 $1+t^2=' + s2 * s2 + '$, $t=' + TT[s1 - 1] + '$이면 $1+t^2=' + s1 * s1 + '$입니다.)',
          };
        },
      },
    ],
  });
})();
