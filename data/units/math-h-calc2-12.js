/* 미적분Ⅱ · 넓이와 부피, 움직인 거리
 * 곡선과 x축·y축 사이의 넓이, 두 곡선 사이의 넓이, 단면의 넓이를 적분하여 구하는 입체도형의 부피,
 * 좌표평면 위를 움직이는 점이 움직인 거리, 곡선의 길이. */
(function () {
  // 그래프 SVG. o: { x:[min,max], y:[min,max], fns:[함수], shade:[{ top, bot?, a, b, c? }], param:[{ x(t), y(t), t0, t1 }], text:[[x,y,글자]] }
  function plot(o) {
    var W = 280, H = 200, pl = 14, pr = 14, pt = 14, pb = 16;
    var x0 = o.x[0], x1 = o.x[1], y0 = o.y[0], y1 = o.y[1];
    function X(x) { return pl + (x - x0) / (x1 - x0) * (W - pl - pr); }
    function Y(y) { return pt + (y1 - y) / (y1 - y0) * (H - pt - pb); }
    function r1(v) { return Math.round(v * 10) / 10; }
    function P(x, y) { return r1(X(x)) + ',' + r1(Y(y)); }
    function cl(y) { return Math.max(y0, Math.min(y1, y)); }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">';
    (o.shade || []).forEach(function (r) {
      var pts = [], n = 60, i, x;
      for (i = 0; i <= n; i++) { x = r.a + (r.b - r.a) * i / n; pts.push(P(x, cl(r.top(x)))); }
      for (i = n; i >= 0; i--) { x = r.a + (r.b - r.a) * i / n; pts.push(P(x, cl(r.bot ? r.bot(x) : 0))); }
      s += '<polygon points="' + pts.join(' ') + '" fill="var(--fig-' + (r.c || 1) + ')" fill-opacity="0.38" stroke="none"/>';
    });
    (o.shadeY || []).forEach(function (r) {   // y 로 칠하기: x = left(y) ~ right(y), y 는 a~b
      var pts = [], n = 60, i, y;
      for (i = 0; i <= n; i++) { y = r.a + (r.b - r.a) * i / n; pts.push(P(r.right(y), y)); }
      for (i = n; i >= 0; i--) { y = r.a + (r.b - r.a) * i / n; pts.push(P(r.left ? r.left(y) : 0, y)); }
      s += '<polygon points="' + pts.join(' ') + '" fill="var(--fig-' + (r.c || 1) + ')" fill-opacity="0.38" stroke="none"/>';
    });
    var ax = r1(Y(0)), ay = r1(X(0));
    s += '<g stroke="currentColor" stroke-width="1.3" fill="none">';
    s += '<line x1="4" y1="' + ax + '" x2="' + (W - 5) + '" y2="' + ax + '"/>';
    if (x0 <= 0 && x1 >= 0) s += '<line x1="' + ay + '" y1="' + (H - 4) + '" x2="' + ay + '" y2="5"/>';
    s += '</g><g fill="currentColor">';
    s += '<polygon points="' + (W - 2) + ',' + ax + ' ' + (W - 9) + ',' + r1(ax - 3.5) + ' ' + (W - 9) + ',' + r1(ax + 3.5) + '"/>';
    if (x0 <= 0 && x1 >= 0) s += '<polygon points="' + ay + ',2 ' + r1(ay - 3.5) + ',9 ' + r1(ay + 3.5) + ',9"/>';
    s += '</g>';
    (o.fns || []).forEach(function (fn, k) {
      var d = '', on = false, n = 160, i, x, y;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n;
        y = fn(x);
        if (!isFinite(y) || y < y0 || y > y1) { on = false; continue; }
        d += (on ? 'L' : 'M') + P(x, y);
        on = true;
      }
      s += '<path d="' + d + '" fill="none" stroke="' + (k === 0 ? 'currentColor' : 'var(--fig-' + (k + 1) + ')') + '" stroke-width="2.2" stroke-linejoin="round"/>';
    });
    (o.param || []).forEach(function (c) {
      var d = '', n = 120, i, t;
      for (i = 0; i <= n; i++) { t = c.t0 + (c.t1 - c.t0) * i / n; d += (i ? 'L' : 'M') + P(c.x(t), c.y(t)); }
      s += '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>';
      (c.dots || []).forEach(function (t) { s += '<circle cx="' + r1(X(c.x(t))) + '" cy="' + r1(Y(c.y(t))) + '" r="3.2" fill="currentColor"/>'; });
    });
    s += '<g fill="currentColor" font-family="sans-serif" font-size="13" text-anchor="middle">';
    (o.text || []).forEach(function (t) { s += '<text x="' + r1(X(t[0])) + '" y="' + r1(Y(t[1])) + '">' + t[2] + '</text>'; });
    s += '</g></svg>';
    return s;
  }
  var PI = Math.PI;
  // 단면이 정사각형인 입체 겨냥도 (밑면 곡선 y=√x 를 비스듬히 그린 모양)
  var solidFig = (function () {
    var s = '<svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg">';
    function px(x, h) { return [Math.round((30 + 50 * x) * 10) / 10, Math.round((160 - h) * 10) / 10]; }
    var top = [], bot = [], i, x, h;
    for (i = 0; i <= 40; i++) { x = 4 * i / 40; h = 38 * Math.sqrt(x); top.push(px(x, h)); bot.push(px(x, 0)); }
    // 옆면(정사각형의 윗변이 지나는 곡선)과 바닥
    s += '<polygon points="' + top.map(function (p) { return p.join(','); }).join(' ') + ' ' + px(4, 0).join(',') + ' ' + px(0, 0).join(',') + '" fill="var(--fig-1)" fill-opacity="0.22" stroke="none"/>';
    s += '<polyline points="' + top.map(function (p) { return p.join(','); }).join(' ') + '" fill="none" stroke="currentColor" stroke-width="1.8"/>';
    // 깊이 방향(뒤쪽) 곡선
    var back = top.map(function (p, j) { var d = 0.5 * 38 * Math.sqrt(4 * j / 40); return [Math.round((p[0] + d) * 10) / 10, Math.round((p[1] - d * 0.55) * 10) / 10]; });
    s += '<polyline points="' + back.map(function (p) { return p.join(','); }).join(' ') + '" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>';
    // x 축
    s += '<line x1="18" y1="160" x2="272" y2="160" stroke="currentColor" stroke-width="1.3"/>';
    s += '<polygon points="276,160 269,156.5 269,163.5" fill="currentColor"/>';
    // x=2.4 에서의 정사각형 단면
    var xs = 2.4, side = 38 * Math.sqrt(xs), b0 = px(xs, 0), t0 = px(xs, side), dd = 0.5 * side;
    var b1 = [b0[0] + dd, b0[1] - dd * 0.55], t1 = [t0[0] + dd, t0[1] - dd * 0.55];
    s += '<polygon points="' + [b0, t0, t1, b1].map(function (p) { return Math.round(p[0] * 10) / 10 + ',' + Math.round(p[1] * 10) / 10; }).join(' ') + '" fill="var(--fig-2)" fill-opacity="0.5" stroke="currentColor" stroke-width="1.4"/>';
    s += '<g fill="currentColor" font-family="sans-serif" font-size="13" text-anchor="middle">';
    s += '<text x="' + b0[0] + '" y="178">x</text><text x="30" y="178">a</text><text x="230" y="178">b</text><text x="268" y="178">x</text>';
    s += '<text x="' + (b0[0] + 34) + '" y="' + Math.round(t0[1] + 12) + '">S(x)</text>';
    s += '</g></svg>';
    return s;
  })();

  function tex(f) { return f.toTex(); }
  function dedup(ans, cands) {
    var out = [], seen = {};
    seen[ans.toString()] = true;
    cands.forEach(function (w) { var k = w[0].toString(); if (!seen[k]) { seen[k] = true; out.push({ a: k, why: w[1] }); } });
    return out;
  }

  Tutor.registerUnit({
    id: 'math-h-calc2-12',
    course: 'math-h-calc2',
    title: '넓이와 부피, 움직인 거리',
    summary: '정적분으로 곡선으로 둘러싸인 도형의 넓이와 입체도형의 부피를 구하고, 좌표평면 위를 움직이는 점이 움직인 거리와 곡선의 길이를 구합니다.',
    goals: [
      '곡선과 좌표축, 두 곡선으로 둘러싸인 도형의 넓이를 구할 수 있다.',
      '단면의 넓이를 적분하여 입체도형의 부피를 구할 수 있다.',
      '좌표평면 위를 움직이는 점이 움직인 거리를 구할 수 있다.',
      '곡선의 길이를 구할 수 있다.',
    ],
    standards: ['[12미적Ⅱ-03-05]', '[12미적Ⅱ-03-06]', '[12미적Ⅱ-03-07]'],

    concepts: [
      {
        title: '곡선과 좌표축 사이의 넓이',
        body: '함수 $f(x)$가 구간 $[a, b]$에서 연속일 때, 곡선 $y=f(x)$와 $x$축 및 두 직선 $x=a$, $x=b$로 둘러싸인 도형의 넓이는\n\n' +
          '$S=\\int_{a}^{b}|f(x)|\\,dx$\n\n' +
          '입니다. $f(x)<0$인 부분은 정적분이 음수로 나오므로, **$f(x)$의 부호가 바뀌는 곳에서 구간을 나누어** $x$축 아래 부분은 부호를 바꾸어 더합니다.\n\n' +
          '예: 곡선 $y=\\sin x$ ($0\\le x\\le2\\pi$)와 $x$축으로 둘러싸인 넓이는 $\\int_{0}^{\\pi}\\sin x\\,dx-\\int_{\\pi}^{2\\pi}\\sin x\\,dx=2+2=4$ (정적분 $\\int_{0}^{2\\pi}\\sin x\\,dx=0$과 다릅니다)\n\n' +
          '**$y$축과의 넓이** 곡선이 $x=g(y)$ 꼴이면 $y$로 적분합니다. 곡선 $x=g(y)$와 $y$축 및 두 직선 $y=c$, $y=d$로 둘러싸인 넓이는 $S=\\int_{c}^{d}|g(y)|\\,dy$입니다.\n\n' +
          '예: 곡선 $y=\\ln x$와 $y$축, 두 직선 $y=0$, $y=1$로 둘러싸인 넓이는 $x=e^{y}$으로 바꾸어 $\\int_{0}^{1}e^{y}\\,dy=e-1$',
        easy: '넓이는 언제나 양수입니다. 그런데 정적분은 $x$축 아래 부분을 음수로 셈하므로, 넓이를 구할 때는 아래 부분을 "뒤집어서" 더해야 합니다. 그래서 먼저 그래프를 대강 그려 $x$축 위와 아래를 나누는 것이 첫걸음입니다.\n\n' +
          '$y$축과의 넓이는 고개를 옆으로 돌려 $y$축을 바닥으로 본다고 생각하면 됩니다. 그림의 칠한 부분은 $y=\\ln x$와 $y$축 사이로, 옆에서 보면 $x=e^y$ 아래의 넓이입니다.',
        fig: {
          type: 'svg',
          alt: '곡선 y=ln x 와 y축, 직선 y=0, y=1 로 둘러싸인 부분이 칠해져 있는 그림. 칠한 부분은 y축과 곡선 사이에 있다',
          svg: plot({
            x: [-0.4, 3.4], y: [-1.6, 1.6], fns: [function (x) { return x > 0.05 ? Math.log(x) : NaN; }],
            shadeY: [{ right: function (y) { return Math.exp(y); }, a: 0, b: 1, c: 1 }],
            text: [[2.9, 0.75, 'y=ln x'], [-0.18, 0.92, '1'], [-0.18, -0.3, 'O'], [2.72, -0.3, 'e']],
          }),
        },
        check: {
          type: 'short', check: 'number',
          q: '곡선 $y=\\sin x$ ($0\\le x\\le2\\pi$)와 $x$축으로 둘러싸인 도형의 넓이를 구하십시오.',
          answer: '4',
          wrong: [{ a: '0', why: '$\\int_{0}^{2\\pi}\\sin x\\,dx$를 계산했습니다. 구간 $[\\pi, 2\\pi]$에서는 곡선이 $x$축 아래에 있으므로 부호를 바꾸어 더합니다.' }],
          explain: '$[0, \\pi]$에서 $\\sin x\\ge0$, $[\\pi, 2\\pi]$에서 $\\sin x\\le0$이므로 $\\int_{0}^{\\pi}\\sin x\\,dx+\\int_{\\pi}^{2\\pi}(-\\sin x)\\,dx=2+2=4$입니다.',
        },
      },
      {
        title: '두 곡선 사이의 넓이',
        body: '두 함수 $f(x)$, $g(x)$가 구간 $[a, b]$에서 연속일 때, 두 곡선 $y=f(x)$, $y=g(x)$와 두 직선 $x=a$, $x=b$로 둘러싸인 도형의 넓이는\n\n' +
          '$S=\\int_{a}^{b}|f(x)-g(x)|\\,dx$\n\n' +
          '입니다. 구간에서 $f(x)\\ge g(x)$이면 $\\int_{a}^{b}\\{f(x)-g(x)\\}dx$, 곧 **(위의 곡선) − (아래의 곡선)** 을 적분합니다. 두 곡선이 $x$축 위에 있든 아래에 있든 이 식은 그대로 성립합니다.\n\n' +
          '순서: ① 두 곡선의 교점의 $x$좌표를 구해 적분 구간을 정하고 ② 구간에서 어느 곡선이 위에 있는지 확인한 뒤 ③ (위 − 아래)를 적분합니다. 위아래가 바뀌는 교점이 있으면 그곳에서 구간을 나눕니다.\n\n' +
          '예: 곡선 $y=\\sqrt{x}$와 직선 $y=x$의 교점은 $x=0$, $x=1$이고, $0\\le x\\le1$에서 $\\sqrt{x}\\ge x$이므로\n\n' +
          '$S=\\int_{0}^{1}(\\sqrt{x}-x)\\,dx=\\left[\\dfrac{2}{3}x\\sqrt{x}-\\dfrac{1}{2}x^2\\right]_{0}^{1}=\\dfrac{2}{3}-\\dfrac{1}{2}=\\dfrac{1}{6}$',
        easy: '두 곡선 사이의 넓이는 "위 곡선 아래 넓이"에서 "아래 곡선 아래 넓이"를 뺀 것입니다. 큰 땅에서 작은 땅을 떼어 내면 사이의 띠만 남는 것과 같습니다.\n\n' +
          '그래서 식은 언제나 (위) − (아래)입니다. 가는 세로 막대 하나를 세웠을 때 막대의 길이가 $f(x)-g(x)$이고, 이 막대들을 모두 모은 것이 넓이라고 생각해도 됩니다. 그림에서 칠한 부분이 $y=\\sqrt{x}$와 $y=x$ 사이입니다.',
        fig: {
          type: 'svg',
          alt: '곡선 y=√x 와 직선 y=x 가 원점과 점 (1, 1)에서 만나고, 그 사이가 칠해져 있는 그림',
          svg: plot({
            x: [-0.15, 1.5], y: [-0.15, 1.35], fns: [Math.sqrt, function (x) { return x; }],
            shade: [{ top: Math.sqrt, bot: function (x) { return x; }, a: 0, b: 1, c: 1 }],
            text: [[1.32, 1.06, 'y=√x'], [1.3, 1.31, 'y=x'], [1, -0.1, '1'], [-0.07, -0.1, 'O']],
          }),
        },
        check: {
          type: 'choice',
          q: '구간 $[a, b]$에서 $f(x)\\ge g(x)$일 때, 두 곡선 $y=f(x)$, $y=g(x)$와 두 직선 $x=a$, $x=b$로 둘러싸인 넓이를 나타낸 것은 무엇입니까?',
          choices: ['$\\int_{a}^{b}\\{f(x)-g(x)\\}dx$', '$\\int_{a}^{b}\\{g(x)-f(x)\\}dx$', '$\\int_{a}^{b}\\{f(x)+g(x)\\}dx$'],
          answer: 0,
          why: [
            '',
            '(아래) − (위)를 적분하면 넓이에 $-$ 부호가 붙은 값이 나옵니다.',
            '두 곡선 아래의 넓이를 더한 것입니다. 사이의 넓이는 빼서 구합니다.',
          ],
          explain: '사이의 넓이는 위 곡선 아래 넓이에서 아래 곡선 아래 넓이를 뺀 것이므로 $\\int_{a}^{b}\\{f(x)-g(x)\\}dx$입니다.',
        },
      },
      {
        title: '입체도형의 부피',
        body: '$x$축 위의 구간 $[a, b]$에 놓인 입체도형을 $x$좌표가 $x$인 점을 지나고 $x$축에 수직인 평면으로 자른 단면의 넓이가 $S(x)$일 때, 이 입체도형의 부피는\n\n' +
          '$V=\\int_{a}^{b}S(x)\\,dx$\n\n' +
          '입니다. 입체를 두께가 $\\Delta x$인 얇은 판으로 잘게 썰면 판 하나의 부피는 약 $S(x)\\Delta x$이고, 이것을 더해 극한을 취한 것이 정적분이기 때문입니다(앞 단원의 구분구적법).\n\n' +
          '예: 밑면의 넓이가 $A$, 높이가 $h$인 뿔을 꼭짓점에서 거리가 $x$인 곳에서 밑면에 평행하게 자르면, 단면은 밑면과 닮음비가 $x:h$인 도형이므로 $S(x)=A\\left(\\dfrac{x}{h}\\right)^2$입니다.\n\n' +
          '$V=\\int_{0}^{h}\\dfrac{A}{h^2}x^2\\,dx=\\dfrac{A}{h^2}\\cdot\\dfrac{h^3}{3}=\\dfrac{1}{3}Ah$\n\n' +
          '중학교에서 배운 뿔의 부피 공식 $\\dfrac{1}{3}\\times(\\text{밑넓이})\\times(\\text{높이})$가 이렇게 증명됩니다.\n\n' +
          '> ⚠️ 단면이 정사각형이면 넓이는 (한 변)$^2$입니다. 한 변의 길이를 그대로 적분하지 않도록 주의합니다.',
        easy: '식빵 한 덩이의 부피를 생각해 보십시오. 식빵을 아주 얇게 썰면 한 조각은 거의 납작한 판이고, 그 부피는 (자른 면의 넓이) × (두께)입니다. 모든 조각의 부피를 더하면 식빵 전체의 부피가 됩니다.\n\n' +
          '두께를 한없이 얇게 하여 더하는 것이 바로 정적분이므로, 부피는 "단면의 넓이 $S(x)$를 적분한 것"입니다. 그림은 단면이 정사각형인 입체를 한 곳에서 자른 모습입니다.',
        fig: { type: 'svg', alt: '구간 a 부터 b 까지 놓인 입체도형을 x 좌표가 x 인 곳에서 x축에 수직으로 자른 정사각형 단면 S(x)가 칠해져 있는 그림', svg: solidFig },
        check: {
          type: 'short', check: 'number',
          q: '구간 $[0, 4]$에서 $x$축에 수직인 평면으로 자른 단면이 한 변의 길이가 $\\sqrt{x}$인 정사각형인 입체도형의 부피를 구하십시오.',
          answer: '8',
          wrong: [{ a: '16/3', why: '한 변의 길이 $\\sqrt{x}$를 그대로 적분했습니다. 단면의 넓이는 $(\\sqrt{x})^2=x$입니다.' }],
          explain: '단면의 넓이는 $S(x)=(\\sqrt{x})^2=x$이므로 $V=\\int_{0}^{4}x\\,dx=\\left[\\dfrac{1}{2}x^2\\right]_{0}^{4}=8$입니다.',
        },
      },
      {
        title: '평면 위를 움직이는 점이 움직인 거리',
        body: '좌표평면 위를 움직이는 점 P의 시각 $t$에서의 위치가 $(x, y)=(f(t), g(t))$일 때, 속도는 $\\left(\\dfrac{dx}{dt}, \\dfrac{dy}{dt}\\right)$이고 속력은 $\\sqrt{\\left(\\dfrac{dx}{dt}\\right)^2+\\left(\\dfrac{dy}{dt}\\right)^2}$입니다(앞에서 배운 평면 운동).\n\n' +
          '시각 $t=a$에서 $t=b$까지 점 P가 **움직인 거리**는 속력을 적분하여\n\n' +
          '$s=\\int_{a}^{b}\\sqrt{\\{f\'(t)\\}^2+\\{g\'(t)\\}^2}\\,dt$\n\n' +
          '입니다. 아주 짧은 시간 $\\Delta t$ 동안 점은 가로로 약 $f\'(t)\\Delta t$, 세로로 약 $g\'(t)\\Delta t$만큼 움직이므로, 피타고라스 정리로 움직인 길이가 약 $\\sqrt{\\{f\'(t)\\}^2+\\{g\'(t)\\}^2}\\,\\Delta t$이기 때문입니다.\n\n' +
          '예: $x=3t^2$, $y=3t-t^3$이면 $\\dfrac{dx}{dt}=6t$, $\\dfrac{dy}{dt}=3-3t^2$이고\n\n' +
          '$36t^2+(3-3t^2)^2=9t^4+18t^2+9=9(t^2+1)^2$\n\n' +
          '이므로 속력은 $3(t^2+1)$입니다. $t=0$부터 $t=1$까지 움직인 거리는 $\\int_{0}^{1}3(t^2+1)\\,dt=1+3=4$입니다.\n\n' +
          '> 💡 근호 안이 완전제곱식이 되도록 문제가 만들어진 경우가 많습니다. 전개해서 $(\\ )^2$ 꼴을 찾아보십시오.',
        easy: '자동차의 주행 거리계는 매 순간의 속력을 쌓아 갑니다. 평면 위를 움직이는 점도 같아서, 매 순간의 속력(빠르기)을 시간에 대해 적분하면 움직인 거리가 됩니다.\n\n' +
          '평면에서의 속력은 가로 방향 빠르기와 세로 방향 빠르기를 두 변으로 하는 직각삼각형의 빗변입니다. 그래서 $\\sqrt{(\\text{가로 빠르기})^2+(\\text{세로 빠르기})^2}$를 적분합니다. 처음 위치와 나중 위치 사이의 직선 거리와는 다릅니다.',
        fig: {
          type: 'svg',
          alt: '시각 t=0 에서 원점을 출발하여 x=3t², y=3t−t³ 을 따라 오른쪽 위로 올라갔다가 다시 내려오는 곡선 경로. t=0, t=1 인 점이 찍혀 있다',
          svg: plot({
            x: [-1, 13], y: [-2.6, 2.8],
            param: [{ x: function (t) { return 3 * t * t; }, y: function (t) { return 3 * t - t * t * t; }, t0: 0, t1: 2, dots: [0, 1] }],
            text: [[3, 2.35, 't=1'], [-0.5, -0.5, 'O']],
          }),
        },
        check: {
          type: 'ox',
          q: '평면 위를 움직이는 점의 시각 $t=a$부터 $t=b$까지 움직인 거리는 처음 위치와 나중 위치 사이의 거리와 항상 같습니다.',
          answer: false,
          explain: '움직인 거리는 지나간 길(경로)의 길이로, 속력 $\\sqrt{\\{f\'(t)\\}^2+\\{g\'(t)\\}^2}$를 적분하여 구합니다. 점이 곧게 한 방향으로만 움직일 때를 빼면 두 점 사이의 직선 거리보다 깁니다. 예를 들어 원을 한 바퀴 돌면 처음과 나중 위치는 같지만 움직인 거리는 원의 둘레입니다.',
        },
      },
      {
        title: '곡선의 길이',
        body: '곡선이 $x=f(t)$, $y=g(t)$ ($a\\le t\\le b$)로 나타내어질 때 곡선의 길이는 점이 그 곡선을 따라 움직인 거리와 같습니다.\n\n' +
          '$l=\\int_{a}^{b}\\sqrt{\\left(\\dfrac{dx}{dt}\\right)^2+\\left(\\dfrac{dy}{dt}\\right)^2}\\,dt$\n\n' +
          '곡선이 $y=f(x)$ ($a\\le x\\le b$)이면 $x=t$, $y=f(t)$로 보아 $\\dfrac{dx}{dt}=1$이므로\n\n' +
          '$l=\\int_{a}^{b}\\sqrt{1+\\{f\'(x)\\}^2}\\,dx$\n\n' +
          '예: $y=\\dfrac{2}{3}x\\sqrt{x}$ ($0\\le x\\le3$)에서 $f\'(x)=\\sqrt{x}$이므로\n\n' +
          '$l=\\int_{0}^{3}\\sqrt{1+x}\\,dx=\\left[\\dfrac{2}{3}(1+x)\\sqrt{1+x}\\right]_{0}^{3}=\\dfrac{2}{3}(8-1)=\\dfrac{14}{3}$\n\n' +
          '예: 원 $x=r\\cos t$, $y=r\\sin t$ ($0\\le t\\le2\\pi$)는 $\\left(\\dfrac{dx}{dt}\\right)^2+\\left(\\dfrac{dy}{dt}\\right)^2=r^2$이므로 길이가 $\\int_{0}^{2\\pi}r\\,dt=2\\pi r$입니다. 원의 둘레 공식이 다시 나옵니다.',
        easy: '구부러진 철사의 길이를 재려면 철사를 아주 짧은 토막으로 나누어 토막마다 곧은 선분으로 보고 더하면 됩니다. 가로로 $\\Delta x$만큼 갈 때 세로로 $f\'(x)\\Delta x$만큼 오르면 토막의 길이는 피타고라스 정리로 $\\sqrt{1+\\{f\'(x)\\}^2}\\,\\Delta x$입니다.\n\n' +
          '이 토막들을 모두 더하는 것이 정적분입니다. 직선 $y=2x$처럼 기울기가 일정하면 $\\sqrt{1+4}=\\sqrt{5}$를 구간의 길이만큼 곱한 것이 되어, 선분의 길이와 같습니다.',
        check: {
          type: 'choice',
          q: '직선 $y=2x$ ($0\\le x\\le3$)의 길이를 곡선의 길이 공식으로 구한 것은 무엇입니까?',
          choices: ['$3\\sqrt{5}$', '$9$', '$3\\sqrt{3}$'],
          answer: 0,
          why: [
            '',
            '$\\int_{0}^{3}(1+2)\\,dx$처럼 근호와 제곱을 빠뜨렸습니다. $\\sqrt{1+2^2}=\\sqrt{5}$입니다.',
            '$\\sqrt{1+2}$로 계산했습니다. 기울기를 제곱해야 하므로 $\\sqrt{1+2^2}=\\sqrt{5}$입니다.',
          ],
          explain: '$f\'(x)=2$이므로 $l=\\int_{0}^{3}\\sqrt{1+4}\\,dx=3\\sqrt{5}$입니다. 두 점 $(0, 0)$, $(3, 6)$ 사이의 거리 $\\sqrt{9+36}=3\\sqrt{5}$와 같습니다.',
        },
      },
    ],

    examples: [
      {
        q: '두 곡선 $y=\\sqrt{x}$, $y=x^2$으로 둘러싸인 도형의 넓이를 구하십시오.',
        steps: [
          '교점: $\\sqrt{x}=x^2$에서 $x=x^4$, $x(x^3-1)=0$이므로 $x=0$, $x=1$입니다.',
          '$0\\le x\\le1$에서 $\\sqrt{x}\\ge x^2$입니다(예: $x=\\dfrac{1}{4}$이면 $\\dfrac{1}{2}>\\dfrac{1}{16}$).',
          '$S=\\int_{0}^{1}(\\sqrt{x}-x^2)\\,dx=\\left[\\dfrac{2}{3}x\\sqrt{x}-\\dfrac{1}{3}x^3\\right]_{0}^{1}=\\dfrac{2}{3}-\\dfrac{1}{3}=\\dfrac{1}{3}$',
        ],
        answer: '$\\dfrac{1}{3}$',
      },
      {
        q: '밑면이 한 변의 길이가 $a$인 정사각형이고 높이가 $h$인 정사각뿔의 부피를 정적분으로 구하십시오.',
        steps: [
          '꼭짓점을 원점, 꼭짓점에서 밑면에 내린 수선을 $x$축으로 잡습니다.',
          '꼭짓점에서 거리가 $x$인 곳의 단면은 한 변의 길이가 $\\dfrac{ax}{h}$인 정사각형이므로 $S(x)=\\dfrac{a^2x^2}{h^2}$입니다.',
          '$V=\\int_{0}^{h}\\dfrac{a^2}{h^2}x^2\\,dx=\\dfrac{a^2}{h^2}\\cdot\\dfrac{h^3}{3}=\\dfrac{1}{3}a^2h$',
        ],
        answer: '$\\dfrac{1}{3}a^2h$',
      },
      {
        q: '좌표평면 위를 움직이는 점 P의 시각 $t$에서의 위치가 $x=3t^2$, $y=3t-t^3$일 때, $t=0$부터 $t=2$까지 점 P가 움직인 거리를 구하십시오.',
        steps: [
          '$\\dfrac{dx}{dt}=6t$, $\\dfrac{dy}{dt}=3-3t^2$입니다.',
          '$(6t)^2+(3-3t^2)^2=9t^4+18t^2+9=9(t^2+1)^2$이므로 속력은 $3(t^2+1)$입니다.',
          '$s=\\int_{0}^{2}3(t^2+1)\\,dt=\\left[t^3+3t\\right]_{0}^{2}=8+6=14$',
        ],
        answer: '$14$',
      },
    ],

    terms: [
      { term: '두 곡선 사이의 넓이', def: '$\\int_{a}^{b}|f(x)-g(x)|\\,dx$입니다. 위에 있는 곡선에서 아래에 있는 곡선을 빼서 적분합니다.' },
      { term: '단면의 넓이', def: '입체도형을 한 축에 수직인 평면으로 잘랐을 때 생기는 단면의 넓이 $S(x)$입니다. 부피는 $\\int_{a}^{b}S(x)\\,dx$입니다.' },
      { term: '속력', def: '평면 위를 움직이는 점의 속도 $\\left(\\dfrac{dx}{dt}, \\dfrac{dy}{dt}\\right)$의 크기 $\\sqrt{\\left(\\dfrac{dx}{dt}\\right)^2+\\left(\\dfrac{dy}{dt}\\right)^2}$입니다.' },
      { term: '움직인 거리', def: '시각 $a$부터 $b$까지 점이 지나간 경로의 길이입니다. 속력을 $a$부터 $b$까지 적분하여 구합니다.' },
      { term: '곡선의 길이', def: '$y=f(x)$ ($a\\le x\\le b$)의 길이는 $\\int_{a}^{b}\\sqrt{1+\\{f\'(x)\\}^2}\\,dx$입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '그림은 곡선 $y=\\ln x$입니다. 곡선 $y=\\ln x$와 $x$축 및 직선 $x=e$로 둘러싸인 도형의 넓이를 구하십시오.',
        fig: {
          type: 'svg',
          alt: '곡선 y=ln x 가 점 (1, 0)에서 x축과 만나고, x=1 부터 x=e 까지 곡선 아래가 칠해져 있는 그림',
          svg: plot({
            x: [-0.3, 3.4], y: [-1.3, 1.5], fns: [function (x) { return x > 0.05 ? Math.log(x) : NaN; }],
            shade: [{ top: function (x) { return Math.log(x); }, a: 1, b: Math.E, c: 1 }],
            text: [[1, -0.3, '1'], [2.72, -0.3, 'e'], [3.0, 1.32, 'y=ln x'], [-0.15, -0.3, 'O']],
          }),
        },
        answer: '1',
        hint: '$\\int\\ln x\\,dx=x\\ln x-x+C$입니다.',
        wrong: [{ a: '0', why: '$\\left[x\\ln x-x\\right]_{1}^{e}$에서 아래끝 값 $1\\cdot\\ln 1-1=-1$을 0으로 셈했습니다.' }],
        explain: '곡선은 $x=1$에서 $x$축과 만나고 $1\\le x\\le e$에서 $\\ln x\\ge0$입니다. $\\int_{1}^{e}\\ln x\\,dx=\\left[x\\ln x-x\\right]_{1}^{e}=(e-e)-(0-1)=1$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 0,
        q: '구간 $[0, \\pi]$에서 곡선 $y=\\cos x$와 $x$축 및 두 직선 $x=0$, $x=\\pi$로 둘러싸인 도형의 넓이는 $\\int_{0}^{\\pi}\\cos x\\,dx=0$입니다.',
        answer: false,
        explain: '$\\left[0, \\dfrac{\\pi}{2}\\right]$에서는 $\\cos x\\ge0$, $\\left[\\dfrac{\\pi}{2}, \\pi\\right]$에서는 $\\cos x\\le0$입니다. 넓이는 $\\int_{0}^{\\frac{\\pi}{2}}\\cos x\\,dx-\\int_{\\frac{\\pi}{2}}^{\\pi}\\cos x\\,dx=1+1=2$입니다. 정적분 값 0은 위아래 넓이가 서로 지워진 값입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 0,
        q: '곡선 $y=e^x$과 $x$축 및 두 직선 $x=0$, $x=\\ln 4$로 둘러싸인 도형의 넓이를 구하십시오.',
        answer: '3',
        wrong: [{ a: '4', why: '아래끝 값 $e^{0}=1$을 빼는 것을 빠뜨렸습니다.' }],
        explain: '$\\int_{0}^{\\ln 4}e^x\\,dx=\\left[e^x\\right]_{0}^{\\ln 4}=4-1=3$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', concept: 1,
        q: '곡선 $y=\\sqrt{x}$와 직선 $y=x$로 둘러싸인 도형의 넓이를 구하십시오.',
        answer: '1/6',
        wrong: [
          { a: '-1/6', why: '(아래) − (위)를 적분했습니다. $0\\le x\\le1$에서는 $\\sqrt{x}\\ge x$입니다.' },
          { a: '7/6', why: '두 함수를 빼야 하는데 더했습니다.' },
        ],
        explain: '교점은 $x=0$, $x=1$이고 그 사이에서 $\\sqrt{x}\\ge x$이므로 $\\int_{0}^{1}(\\sqrt{x}-x)\\,dx=\\dfrac{2}{3}-\\dfrac{1}{2}=\\dfrac{1}{6}$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 0,
        q: '곡선 $y=\\ln x$와 $y$축 및 두 직선 $y=0$, $y=2$로 둘러싸인 도형의 넓이는 무엇입니까?',
        choices: ['$e^{2}-1$', '$e^{2}$', '$2$', '$e^{2}+1$'],
        answer: 0,
        hint: '$y=\\ln x$를 $x=e^{y}$으로 바꾸어 $y$에 대하여 적분합니다.',
        why: [
          '',
          '아래끝 값 $e^{0}=1$을 빼는 것을 빠뜨렸습니다.',
          '$y$의 범위의 길이만 구했습니다. $\\int_{0}^{2}e^{y}\\,dy$를 계산합니다.',
          '아래끝 값을 빼야 하는데 더했습니다.',
        ],
        explain: '$x=e^{y}$이므로 넓이는 $\\int_{0}^{2}e^{y}\\,dy=\\left[e^{y}\\right]_{0}^{2}=e^{2}-1$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 2,
        q: '구간 $[1, 3]$에서 $x$축에 수직인 평면으로 자른 단면이 한 변의 길이가 $x$인 정사각형인 입체도형의 부피를 구하십시오.',
        answer: '26/3',
        wrong: [{ a: '4', why: '한 변의 길이 $x$를 그대로 적분했습니다. 단면의 넓이는 $x^2$입니다.' }],
        explain: '$S(x)=x^2$이므로 $V=\\int_{1}^{3}x^2\\,dx=\\dfrac{27-1}{3}=\\dfrac{26}{3}$입니다.',
      },
      {
        id: 'p7', level: 2, type: 'choice', concept: 1,
        q: '두 곡선 $y=\\sin x$, $y=\\cos x$와 두 직선 $x=0$, $x=\\dfrac{\\pi}{4}$로 둘러싸인 도형의 넓이는 무엇입니까?',
        choices: ['$\\sqrt{2}-1$', '$1-\\sqrt{2}$', '$\\sqrt{2}$', '$1$'],
        answer: 0,
        hint: '$0\\le x\\le\\dfrac{\\pi}{4}$에서 $\\cos x\\ge\\sin x$입니다.',
        why: [
          '',
          '(아래) − (위)를 적분하여 음수가 나왔습니다. 넓이는 양수입니다.',
          '아래끝 값 $\\sin 0+\\cos 0=1$을 빼는 것을 빠뜨렸습니다.',
          '두 함수를 빼야 하는데 더했습니다. $\\int_{0}^{\\frac{\\pi}{4}}(\\cos x+\\sin x)\\,dx=1$입니다. 두 곡선 사이는 (위) − (아래)입니다.',
        ],
        explain: '$\\int_{0}^{\\frac{\\pi}{4}}(\\cos x-\\sin x)\\,dx=\\left[\\sin x+\\cos x\\right]_{0}^{\\frac{\\pi}{4}}=\\left(\\dfrac{\\sqrt{2}}{2}+\\dfrac{\\sqrt{2}}{2}\\right)-(0+1)=\\sqrt{2}-1$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 2,
        q: '밑면의 반지름의 길이가 $r$, 높이가 $h$인 원뿔을 꼭짓점에서 거리가 $x$인 곳에서 밑면에 평행하게 자른 단면의 넓이 $S(x)$는 무엇입니까?',
        choices: ['$\\dfrac{\\pi r^2x^2}{h^2}$', '$\\dfrac{\\pi r^2x}{h}$', '$\\pi r^2$', '$\\dfrac{\\pi rx^2}{h}$'],
        answer: 0,
        why: [
          '',
          '단면의 반지름이 $\\dfrac{rx}{h}$이므로 넓이는 반지름의 **제곱**에 비례합니다.',
          '밑면의 넓이 그대로입니다. 꼭짓점에 가까울수록 단면은 작아집니다.',
          '반지름 $\\dfrac{rx}{h}$를 제곱할 때 $r$도 제곱해야 합니다.',
        ],
        explain: '단면은 반지름이 $\\dfrac{rx}{h}$인 원이므로 $S(x)=\\pi\\left(\\dfrac{rx}{h}\\right)^2=\\dfrac{\\pi r^2x^2}{h^2}$입니다. 이것을 $0$부터 $h$까지 적분하면 $\\dfrac{1}{3}\\pi r^2h$가 됩니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 3,
        q: '좌표평면 위를 움직이는 점 P의 시각 $t$에서의 위치가 $x=2\\cos t$, $y=2\\sin t$일 때, $t=0$부터 $t=\\pi$까지 점 P가 움직인 거리는 무엇입니까?',
        choices: ['$2\\pi$', '$4$', '$4\\pi$', '$\\pi$'],
        answer: 0,
        why: [
          '',
          '처음 위치 $(2, 0)$과 나중 위치 $(-2, 0)$ 사이의 직선 거리입니다. 점은 반원을 따라 움직였습니다.',
          '원 한 바퀴의 길이입니다. $t$가 $0$부터 $\\pi$까지이면 반 바퀴입니다.',
          '속력을 1로 보았습니다. 속력은 $\\sqrt{4\\sin^2t+4\\cos^2t}=2$입니다.',
        ],
        explain: '$\\dfrac{dx}{dt}=-2\\sin t$, $\\dfrac{dy}{dt}=2\\cos t$이므로 속력은 $\\sqrt{4\\sin^2t+4\\cos^2t}=2$입니다. 움직인 거리는 $\\int_{0}^{\\pi}2\\,dt=2\\pi$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 3,
        q: '좌표평면 위를 움직이는 점 P의 시각 $t$에서의 위치가 $x=t^2$, $y=\\dfrac{2}{3}t^3$일 때, $t=0$부터 $t=\\sqrt{3}$까지 점 P가 움직인 거리를 구하십시오.',
        answer: '14/3',
        hint: '속력은 $\\sqrt{4t^2+4t^4}=2t\\sqrt{1+t^2}$이고, $1+t^2=u$로 치환합니다.',
        wrong: [{ a: '16/3', why: '$\\left[\\dfrac{2}{3}(1+t^2)\\sqrt{1+t^2}\\right]_{0}^{\\sqrt{3}}$에서 아래끝 값 $\\dfrac{2}{3}$를 빼는 것을 빠뜨렸습니다.' }],
        explain: '$\\dfrac{dx}{dt}=2t$, $\\dfrac{dy}{dt}=2t^2$이므로 속력은 $\\sqrt{4t^2+4t^4}=2t\\sqrt{1+t^2}$ ($t\\ge0$)입니다.\n\n' +
          '$1+t^2=u$로 놓으면 $2t\\,dt=du$이고 $u$는 $1$부터 $4$까지이므로 $\\int_{1}^{4}\\sqrt{u}\\,du=\\left[\\dfrac{2}{3}u\\sqrt{u}\\right]_{1}^{4}=\\dfrac{16}{3}-\\dfrac{2}{3}=\\dfrac{14}{3}$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 4,
        q: '곡선 $y=\\dfrac{2}{3}x\\sqrt{x}$ ($0\\le x\\le8$)의 길이를 구하십시오.',
        answer: '52/3',
        hint: '$y\'=\\sqrt{x}$이므로 $\\sqrt{1+(y\')^2}=\\sqrt{1+x}$입니다.',
        wrong: [
          { a: '18', why: '$\\left[\\dfrac{2}{3}(1+x)\\sqrt{1+x}\\right]_{0}^{8}$에서 아래끝 값 $\\dfrac{2}{3}$를 빼는 것을 빠뜨렸습니다.' },
          { a: '8', why: '가로 방향의 길이만 구했습니다. 곡선은 위로도 올라가므로 더 깁니다.' },
        ],
        explain: '$l=\\int_{0}^{8}\\sqrt{1+x}\\,dx=\\left[\\dfrac{2}{3}(1+x)\\sqrt{1+x}\\right]_{0}^{8}=\\dfrac{2}{3}(27-1)=\\dfrac{52}{3}$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'ox', concept: 3,
        q: '평면 위를 움직이는 점의 위치가 $(f(t), g(t))$일 때, $t=a$부터 $t=b$까지 움직인 거리는 $\\int_{a}^{b}\\{|f\'(t)|+|g\'(t)|\\}dt$입니다.',
        answer: false,
        explain: '가로 방향과 세로 방향으로 움직인 거리를 따로 더하면 실제 경로보다 길어집니다(직각삼각형에서 두 변의 합이 빗변보다 긴 것과 같습니다). 움직인 거리는 $\\int_{a}^{b}\\sqrt{\\{f\'(t)\\}^2+\\{g\'(t)\\}^2}\\,dt$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 0,
        q: '함수 $f(x)=x^3+x$의 역함수를 $g(x)$라 할 때, $\\int_{0}^{2}g(x)\\,dx$의 값을 구하십시오.',
        answer: '5/4',
        hint: '$f(1)=2$입니다. $y=g(x)$의 그래프 아래 넓이를 $y=f(x)$의 그래프로 생각하면, 가로 1, 세로 2인 직사각형에서 $\\int_{0}^{1}f(x)\\,dx$를 뺀 것입니다.',
        wrong: [
          { a: '3/4', why: '$\\int_{0}^{1}f(x)\\,dx$를 그대로 답했습니다. 역함수의 그래프 아래 넓이는 직사각형에서 이 값을 뺀 것입니다.' },
          { a: '6', why: '$\\int_{0}^{2}f(x)\\,dx$를 계산했습니다. 역함수의 적분은 원래 함수의 적분과 다릅니다.' },
        ],
        explain: '$f(0)=0$, $f(1)=2$이고 $f$는 증가함수입니다. $y=g(x)$ ($0\\le x\\le2$) 아래의 넓이는 $y=f(x)$의 그래프와 $y$축 사이의 넓이와 같으므로\n\n' +
          '$\\int_{0}^{2}g(x)\\,dx=1\\times2-\\int_{0}^{1}(x^3+x)\\,dx=2-\\left(\\dfrac{1}{4}+\\dfrac{1}{2}\\right)=\\dfrac{5}{4}$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 2,
        q: '곡선 $y=x^2$과 직선 $y=1$로 둘러싸인 도형을 밑면으로 하는 입체도형이 있습니다. 이 입체도형을 $x$축에 수직인 평면으로 자른 단면은 모두 정사각형입니다. 이 입체도형의 부피를 구하십시오.',
        answer: '16/15',
        hint: '$x$에서의 단면은 한 변의 길이가 $1-x^2$인 정사각형입니다.',
        wrong: [
          { a: '4/3', why: '한 변의 길이 $1-x^2$을 그대로 적분했습니다. 이것은 밑면의 넓이입니다. 단면의 넓이는 $(1-x^2)^2$입니다.' },
          { a: '8/15', why: '구간 $[0, 1]$만 계산했습니다. 밑면은 $-1\\le x\\le1$에 걸쳐 있습니다.' },
        ],
        explain: '밑면은 $-1\\le x\\le1$이고, $x$에서의 단면은 한 변의 길이가 $1-x^2$인 정사각형이므로 $S(x)=(1-x^2)^2=1-2x^2+x^4$입니다.\n\n' +
          '$V=\\int_{-1}^{1}(1-2x^2+x^4)\\,dx=2\\left(1-\\dfrac{2}{3}+\\dfrac{1}{5}\\right)=2\\times\\dfrac{8}{15}=\\dfrac{16}{15}$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 4,
        q: '곡선 $y=\\dfrac{e^x+e^{-x}}{2}$ ($0\\le x\\le\\ln 2$)의 길이를 구하십시오.',
        answer: '3/4',
        hint: '$1+(y\')^2=\\left(\\dfrac{e^x+e^{-x}}{2}\\right)^2$이 됩니다.',
        wrong: [{ a: '1/4', why: '피적분함수 $\\dfrac{e^x+e^{-x}}{2}$의 부정적분을 $\\dfrac{e^x+e^{-x}}{2}$로 했습니다. $(e^{-x})\'=-e^{-x}$이므로 부정적분은 $\\dfrac{e^x-e^{-x}}{2}$입니다.' }],
        explain: '$y\'=\\dfrac{e^x-e^{-x}}{2}$이므로 $1+(y\')^2=\\dfrac{4+e^{2x}-2+e^{-2x}}{4}=\\left(\\dfrac{e^x+e^{-x}}{2}\\right)^2$입니다.\n\n' +
          '$l=\\int_{0}^{\\ln 2}\\dfrac{e^x+e^{-x}}{2}\\,dx=\\left[\\dfrac{e^x-e^{-x}}{2}\\right]_{0}^{\\ln 2}=\\dfrac{2-\\frac{1}{2}}{2}-0=\\dfrac{3}{4}$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 1,
        q: '두 곡선 $y=e^x$, $y=e^{-x}$과 직선 $x=1$로 둘러싸인 도형의 넓이는 무엇입니까?',
        choices: ['$e+\\dfrac{1}{e}-2$', '$e-\\dfrac{1}{e}$', '$e+\\dfrac{1}{e}$', '$e-\\dfrac{1}{e}-2$'],
        answer: 0,
        hint: '두 곡선은 $x=0$에서 만나고, $0\\le x\\le1$에서 $e^x\\ge e^{-x}$입니다.',
        why: [
          '',
          '$\\int e^{-x}\\,dx$를 $e^{-x}$으로 했습니다. $(e^{-x})\'=-e^{-x}$이므로 부정적분은 $-e^{-x}$입니다.',
          '아래끝 $x=0$에서의 값 $e^{0}+e^{0}=2$를 빼는 것을 빠뜨렸습니다.',
          '$\\int e^{-x}\\,dx$의 부호를 틀리고 아래끝 값으로 2를 뺐습니다. $(e^{-x})\'=-e^{-x}$이므로 부정적분은 $e^x+e^{-x}$이고, $x=0$에서의 값이 2입니다.',
        ],
        explain: '$\\int_{0}^{1}(e^x-e^{-x})\\,dx=\\left[e^x+e^{-x}\\right]_{0}^{1}=\\left(e+\\dfrac{1}{e}\\right)-2$입니다.',
      },
    ],

    deeper: [
      {
        title: '카발리에리의 원리',
        body: '17세기 이탈리아의 수학자 카발리에리는 "두 입체를 같은 높이에서 자른 단면의 넓이가 언제나 같으면 두 입체의 부피는 같다"는 원리를 내놓았습니다. 동전 더미를 비스듬히 밀어도 부피가 변하지 않는 것과 같은 생각입니다.\n\n' +
          '이 단원의 공식 $V=\\int_{a}^{b}S(x)\\,dx$로 보면 당연한 결과입니다. 부피는 단면의 넓이 $S(x)$만으로 정해지기 때문입니다. 이 원리를 이용하면 구의 부피 $\\dfrac{4}{3}\\pi r^3$도 원기둥과 원뿔의 부피로 설명할 수 있습니다.',
      },
      {
        title: '다음 과정과의 연결',
        body: '이 단원으로 미적분Ⅱ의 적분이 마무리됩니다. 넓이·부피·거리·길이처럼 "잘게 나누어 더하는 양"은 모두 정적분으로 나타낼 수 있다는 것이 핵심입니다.\n\n' +
          '물리에서 힘이 한 일, 확률과 통계에서 연속확률변수의 확률(확률밀도함수의 그래프 아래 넓이)도 같은 생각으로 정적분을 씁니다. 기하에서 배우는 벡터를 쓰면 평면 위의 운동을 위치벡터와 속도벡터로 더 간결하게 나타낼 수 있습니다.',
      },
    ],

    faq: [
      {
        q: '넓이를 구하는데 정적분 값이 음수로 나왔어요.',
        a: '곡선이 $x$축 아래에 있거나, 두 곡선 사이의 넓이에서 (아래) − (위)로 뺐기 때문입니다. 넓이는 음수가 될 수 없으므로 부호가 바뀌는 곳에서 구간을 나누고, 구간마다 (위) − (아래)로 적분하여 더합니다.',
      },
      {
        q: '언제 x로 적분하고 언제 y로 적분하나요?',
        a: '세로 막대로 자를 때 위아래 경계가 하나의 식으로 깔끔하게 나오면 $x$로, 가로 막대로 자를 때 좌우 경계가 깔끔하면 $y$로 적분합니다. $y=\\ln x$와 $y$축 사이처럼 $x=e^y$으로 바꾸면 쉬워지는 경우에는 $y$로 적분하는 것이 편합니다.',
      },
      {
        q: '움직인 거리와 위치의 변화량은 어떻게 다른가요?',
        a: '위치의 변화량은 처음 위치에서 나중 위치까지 곧장 잇는 화살표이고, 움직인 거리는 실제로 지나간 길의 길이입니다. 원을 한 바퀴 돌면 위치의 변화량은 0이지만 움직인 거리는 원의 둘레입니다. 움직인 거리는 속력(속도의 크기)을 적분해서 구합니다.',
      },
      {
        q: '곡선의 길이 공식에서 근호 안을 어떻게 계산하나요?',
        a: '대부분의 문제는 $1+\\{f\'(x)\\}^2$이 완전제곱식이 되도록 만들어져 있습니다. 예를 들어 $f\'(x)=\\dfrac{x^2}{2}-\\dfrac{1}{2x^2}$이면 $1+\\{f\'(x)\\}^2=\\left(\\dfrac{x^2}{2}+\\dfrac{1}{2x^2}\\right)^2$입니다. 가운데 항의 부호만 바뀐 꼴을 찾아보십시오.',
      },
    ],

    mistakes: [
      '넓이를 구할 때 $x$축 아래 부분을 나누지 않고 정적분 하나로 계산하는 실수 — 부호가 바뀌는 곳에서 구간을 나눕니다.',
      '단면이 정사각형인 입체의 부피에서 한 변의 길이를 그대로 적분하는 실수 — 단면의 넓이(한 변의 제곱)를 적분합니다.',
      '움직인 거리를 처음 위치와 나중 위치 사이의 거리로 구하는 실수 — 속력 $\\sqrt{(x\')^2+(y\')^2}$을 적분합니다.',
    ],

    gens: [
      {
        id: 'area-under',
        level: 1,
        title: '곡선과 x축 사이의 넓이',
        make: function (R) {
          var t = R.int(0, 5), k = R.int(1, 4), q, ans, signed = null, cands = [], explain, concept = 0;
          var ks = k === 1 ? '' : String(k);
          if (t === 0) {          // y = k/x, 1 ≤ x ≤ e^m
            var m = R.int(1, 3), up = m === 1 ? 'e' : 'e^{' + m + '}';
            q = '곡선 $y=\\dfrac{' + k + '}{x}$' + R.josa(k, '과/와') + ' $x$축 및 두 직선 $x=1$, $x=' + up + '$' + (m === 1 ? '로' : '으로') + ' 둘러싸인 도형의 넓이를 구하십시오.';
            ans = R.F(k * m);
            cands = [[R.F(k * (m - 1)), '$\\ln 1$을 1로 셈했습니다. $\\ln 1=0$입니다.']];
            explain = '$1\\le x\\le ' + up + '$에서 $\\dfrac{' + k + '}{x}>0$이므로 $\\int_{1}^{' + up + '}\\dfrac{' + k + '}{x}\\,dx=\\left[' + ks + '\\ln x\\right]_{1}^{' + up + '}=' + (k * m) + '$입니다.';
          } else if (t === 1) {   // y = k e^x, 0 ≤ x ≤ ln m
            var mm = R.int(2, 6);
            q = '곡선 $y=' + ks + 'e^{x}$과 $x$축 및 두 직선 $x=0$, $x=\\ln ' + mm + '$' + R.josa(mm, '으로/로') + ' 둘러싸인 도형의 넓이를 구하십시오.';
            ans = R.F(k * (mm - 1));
            cands = [[R.F(k * mm), '아래끝 값 $e^{0}=1$을 0으로 셈했습니다.']];
            explain = '$\\int_{0}^{\\ln ' + mm + '}' + ks + 'e^{x}\\,dx=\\left[' + ks + 'e^{x}\\right]_{0}^{\\ln ' + mm + '}=' + (k * mm) + '-' + k + '=' + (k * (mm - 1)) + '$입니다.';
          } else if (t === 2) {   // y = k sin x, [0, 2π] or [0, 3π/2]
            var whole = R.bool();
            var hi = whole ? '2\\pi' : '\\frac{3\\pi}{2}';
            q = '곡선 $y=' + ks + '\\sin x$ ($0\\le x\\le' + hi + '$)와 $x$축' + (whole ? '으로' : ' 및 직선 $x=\\dfrac{3\\pi}{2}$로') + ' 둘러싸인 도형의 넓이를 구하십시오.';
            ans = R.F(whole ? 4 * k : 3 * k);
            signed = R.F(whole ? 0 : k);
            cands = [[signed, '정적분 하나로 계산했습니다. $[\\pi, ' + hi + ']$에서는 곡선이 $x$축 아래에 있으므로 부호를 바꾸어 더합니다.'],
              [R.F(2 * k), '$[0, \\pi]$ 부분만 구했습니다. $x$축 아래 부분의 넓이도 더합니다.']];
            explain = '$[0, \\pi]$에서는 $x$축 위, $[\\pi, ' + hi + ']$에서는 아래입니다. $\\int_{0}^{\\pi}' + ks + '\\sin x\\,dx=' + (2 * k) + '$, $\\int_{\\pi}^{' + hi + '}' + ks + '\\sin x\\,dx=' + (whole ? -2 * k : -k) + '$이므로 넓이는 $' + (2 * k) + '+' + (whole ? 2 * k : k) + '=' + tex(ans) + '$입니다.';
          } else if (t === 3) {   // y = k cos x, [0, π]
            q = '곡선 $y=' + ks + '\\cos x$ ($0\\le x\\le\\pi$)와 $x$축 및 두 직선 $x=0$, $x=\\pi$로 둘러싸인 도형의 넓이를 구하십시오.';
            ans = R.F(2 * k);
            cands = [[R.F(0), '정적분 하나로 계산하여 위아래 넓이가 지워졌습니다. $x=\\dfrac{\\pi}{2}$에서 구간을 나눕니다.'],
              [R.F(k), '$\\left[0, \\dfrac{\\pi}{2}\\right]$ 부분만 구했습니다.']];
            explain = '$\\int_{0}^{\\frac{\\pi}{2}}' + ks + '\\cos x\\,dx=' + k + '$, $\\int_{\\frac{\\pi}{2}}^{\\pi}' + ks + '\\cos x\\,dx=' + (-k) + '$이므로 넓이는 $' + k + '+' + k + '=' + (2 * k) + '$입니다.';
          } else if (t === 4) {   // y = k/x, -e^m ≤ x ≤ -1 (x축 아래)
            var m4 = R.int(1, 3), lo = m4 === 1 ? '-e' : '-e^{' + m4 + '}';
            q = '곡선 $y=\\dfrac{' + k + '}{x}$' + R.josa(k, '과/와') + ' $x$축 및 두 직선 $x=' + lo + '$, $x=-1$로 둘러싸인 도형의 넓이를 구하십시오.';
            ans = R.F(k * m4);
            signed = R.F(-k * m4);
            cands = [[signed, '정적분 값을 그대로 썼습니다. $x<0$에서 $\\dfrac{' + k + '}{x}<0$이어서 곡선이 $x$축 아래에 있으므로 부호를 바꿉니다.']];
            explain = '$x<0$에서 곡선은 $x$축 아래에 있습니다. $\\int_{' + lo + '}^{-1}\\dfrac{' + k + '}{x}\\,dx=\\left[' + ks + '\\ln|x|\\right]_{' + lo + '}^{-1}=0-' + (k * m4) + '=' + (-k * m4) + '$이므로 넓이는 $' + (k * m4) + '$입니다.';
            concept = 0;
          } else {                // y = k√x, 0 ≤ x ≤ m²
            var m5 = R.int(1, 3);
            q = '곡선 $y=' + ks + '\\sqrt{x}$와 $x$축 및 직선 $x=' + (m5 * m5) + '$' + R.josa(m5 * m5, '으로/로') + ' 둘러싸인 도형의 넓이를 구하십시오.';
            ans = R.F(2 * k * m5 * m5 * m5, 3);
            cands = [[R.F(3 * k * m5 * m5 * m5, 2), '새 지수 $\\dfrac{3}{2}$을 곱했습니다. $\\dfrac{2}{3}$를 곱해야 합니다.']];
            explain = '$\\int_{0}^{' + (m5 * m5) + '}' + ks + '\\sqrt{x}\\,dx=\\left[' + tex(R.F(2 * k, 3)) + 'x\\sqrt{x}\\right]_{0}^{' + (m5 * m5) + '}=' + tex(R.F(2 * k, 3)) + '\\times' + (m5 * m5 * m5) + '=' + tex(ans) + '$입니다.';
          }
          return {
            type: 'short', check: 'number', concept: concept,
            q: q,
            answer: ans.toString(),
            hint: '곡선이 $x$축 위에 있는지 아래에 있는지 먼저 확인합니다.',
            wrong: dedup(ans, cands),
            explain: explain,
          };
        },
      },
      {
        id: 'area-between',
        level: 2,
        title: '곡선과 직선 사이의 넓이',
        make: function (R) {
          var t = R.int(0, 2), a = R.int(1, 4), m, q, ans, cands, explain, line, X;
          var as = a === 1 ? '' : String(a);
          if (t === 2) {          // y = a√x, y = (a/m³)x², 교점 x = m²
            m = R.int(1, 2);
            var c3 = R.F(a, m * m * m);
            var para = (c3.eq(1) ? '' : (c3.isInt() ? String(c3.num) : '\\dfrac{' + c3.num + '}{' + c3.den + '}')) + 'x^{2}';
            X = m * m;
            ans = R.F(a * m * m * m, 3);
            var cI3 = R.F(2 * a * m * m * m, 3), pI = R.F(a * m * m * m, 3);
            q = '곡선 $y=' + as + '\\sqrt{x}$와 곡선 $y=' + para + '$으로 둘러싸인 도형의 넓이를 구하십시오.';
            cands = [
              [ans.neg(), '(아래) − (위)를 적분했습니다. 두 교점 사이에서는 $y=' + as + '\\sqrt{x}$가 위에 있습니다.'],
              [cI3, '$y=' + as + '\\sqrt{x}$ 아래의 넓이만 구했습니다. 아래 곡선 아래의 넓이를 빼야 합니다.'],
              [cI3.add(pI), '두 넓이를 빼야 하는데 더했습니다.'],
            ];
            explain = '교점: $' + as + '\\sqrt{x}=' + para + '$에서 $x=0$, $x=' + X + '$입니다. 그 사이에서 $y=' + as + '\\sqrt{x}$가 위에 있으므로\n\n' +
              '$\\int_{0}^{' + X + '}\\left(' + as + '\\sqrt{x}-' + para + '\\right)dx=' + tex(cI3) + '-' + tex(pI) + '=' + tex(ans) + '$';
          } else if (t === 0) {   // y = a√x, y = (a/m)x, 교점 x = m²
            m = R.int(1, 4);
            var sl = R.F(a, m);
            line = sl.eq(1) ? 'x' : (sl.isInt() ? sl.num + 'x' : '\\dfrac{' + sl.num + '}{' + sl.den + '}x');
            X = m * m;
            ans = R.F(a * m * m * m, 6);
            var curveI = R.F(2 * a * m * m * m, 3), lineI = R.F(a * m * m * m, 2);
            q = '곡선 $y=' + (a === 1 ? '' : a) + '\\sqrt{x}$와 직선 $y=' + line + '$로 둘러싸인 도형의 넓이를 구하십시오.';
            cands = [
              [ans.neg(), '(아래) − (위)를 적분했습니다. 두 교점 사이에서는 곡선이 직선보다 위에 있습니다.'],
              [curveI, '곡선 아래의 넓이만 구했습니다. 직선 아래의 넓이를 빼야 합니다.'],
              [curveI.add(lineI), '두 넓이를 빼야 하는데 더했습니다.'],
            ];
            explain = '교점: $' + (a === 1 ? '' : a) + '\\sqrt{x}=' + line + '$에서 $x=0$, $x=' + X + '$입니다. 그 사이에서 곡선이 위에 있으므로\n\n' +
              '$\\int_{0}^{' + X + '}\\left(' + (a === 1 ? '' : a) + '\\sqrt{x}-' + line + '\\right)dx=' + tex(curveI) + '-' + tex(lineI) + '=' + tex(ans) + '$';
          } else {                // y = a∛x, y = (a/m²)x, 교점 x = m³ (제1사분면)
            m = R.int(1, 2);
            var sl2 = R.F(a, m * m);
            line = sl2.eq(1) ? 'x' : (sl2.isInt() ? sl2.num + 'x' : '\\dfrac{' + sl2.num + '}{' + sl2.den + '}x');
            X = m * m * m;
            ans = R.F(a * Math.pow(m, 4), 4);
            var cI = R.F(3 * a * Math.pow(m, 4), 4), lI = R.F(a * Math.pow(m, 4), 2);
            q = '$x\\ge0$인 범위에서 곡선 $y=' + (a === 1 ? '' : a) + '\\sqrt[3]{x}$와 직선 $y=' + line + '$로 둘러싸인 도형의 넓이를 구하십시오.';
            cands = [
              [ans.neg(), '(아래) − (위)를 적분했습니다. 두 교점 사이에서는 곡선이 직선보다 위에 있습니다.'],
              [cI, '곡선 아래의 넓이만 구했습니다. 직선 아래의 넓이를 빼야 합니다.'],
              [cI.add(lI), '두 넓이를 빼야 하는데 더했습니다.'],
            ];
            explain = '교점: $x\\ge0$에서 $x=0$, $x=' + X + '$입니다. 그 사이에서 곡선이 위에 있으므로\n\n' +
              '$\\int_{0}^{' + X + '}\\left(' + (a === 1 ? '' : a) + '\\sqrt[3]{x}-' + line + '\\right)dx=\\left[' + tex(R.F(3 * a, 4)) + 'x\\sqrt[3]{x}\\right]_{0}^{' + X + '}-' + tex(lI) + '=' + tex(cI) + '-' + tex(lI) + '=' + tex(ans) + '$';
          }
          return {
            type: 'short', check: 'number', concept: 1,
            q: q,
            answer: ans.toString(),
            hint: '먼저 교점의 $x$좌표를 구하고, 그 사이에서 어느 쪽이 위에 있는지 확인합니다.',
            wrong: dedup(ans, cands),
            explain: explain,
          };
        },
      },
      {
        id: 'volume-section',
        level: 2,
        title: '단면의 넓이로 구하는 부피',
        make: function (R) {
          var t = R.int(0, 3), q, ans, cands, explain, side, range, S;
          if (t === 0) {          // 한 변 √(ax), [0, h] → a h²/2
            var a = R.int(1, 4), h = R.int(1, 4);
            side = a === 1 ? '\\sqrt{x}' : '\\sqrt{' + a + 'x}';
            range = '[0, ' + h + ']';
            S = (a === 1 ? '' : a) + 'x';
            ans = R.F(a * h * h, 2);
            cands = [[R.F(a * h * h), '$\\int ' + S + '\\,dx$에서 $\\dfrac{1}{2}$을 빠뜨렸습니다.'],
              [R.F(a * h), '적분하지 않고 단면의 넓이 $S(x)=' + S + '$에 위끝 $x=' + h + '$만 넣었습니다. 부피는 $S(x)$를 적분하여 구합니다.']];
            explain = '단면의 넓이는 $S(x)=(' + side + ')^2=' + S + '$이므로 $V=\\int_{0}^{' + h + '}' + S + '\\,dx=\\left[' + (R.F(a, 2).eq(1) ? '' : tex(R.F(a, 2))) + 'x^{2}\\right]_{0}^{' + h + '}=' + tex(ans) + '$입니다.';
          } else if (t === 1) {   // 한 변 k√(sin x), [0, π] → 2k²
            var k = R.int(1, 3);
            side = (k === 1 ? '' : k) + '\\sqrt{\\sin x}';
            range = '[0, \\pi]';
            S = (k === 1 ? '' : k * k) + '\\sin x';
            ans = R.F(2 * k * k);
            cands = [[R.F(0), '$\\left[-\\cos x\\right]_{0}^{\\pi}$에서 $\\cos\\pi=-1$을 1로 셈했습니다.'], [R.F(-2 * k * k), '$\\int\\sin x\\,dx=-\\cos x$의 부호를 놓쳤습니다.']];
            if (k > 1) cands.push([R.F(2 * k), '한 변의 길이 $' + side + '$를 제곱할 때 $' + k + '$도 제곱해야 합니다.']);
            explain = '$S(x)=(' + side + ')^2=' + S + '$이므로 $V=\\int_{0}^{\\pi}' + S + '\\,dx=' + (k === 1 ? '' : k * k) + '\\left[-\\cos x\\right]_{0}^{\\pi}=' + (k === 1 ? '' : k * k + '\\times2=') + tex(ans) + '$입니다.';
          } else if (t === 2) {   // 한 변 k/√x, [1, e^m] → k² m
            var k2 = R.int(1, 3), m = R.int(1, 3), up = m === 1 ? 'e' : 'e^{' + m + '}';
            side = '\\dfrac{' + k2 + '}{\\sqrt{x}}';
            range = '[1, ' + up + ']';
            S = '\\dfrac{' + (k2 * k2) + '}{x}';
            ans = R.F(k2 * k2 * m);
            cands = [[R.F(k2 * k2 * (m - 1)), '$\\ln 1$을 1로 셈했습니다. $\\ln 1=0$입니다.']];
            if (k2 > 1) cands.push([R.F(k2 * m), '한 변의 길이를 제곱할 때 분자 $' + k2 + '$도 제곱해야 합니다.']);
            explain = '$S(x)=\\left(' + side + '\\right)^2=' + S + '$이므로 $V=\\int_{1}^{' + up + '}' + S + '\\,dx=\\left[' + (k2 * k2 === 1 ? '' : k2 * k2) + '\\ln x\\right]_{1}^{' + up + '}=' + tex(ans) + '$입니다.';
          } else {                // 한 변 e^x, [0, ln m] → (m²-1)/2
            var m2 = R.int(2, 4);
            side = 'e^{x}';
            range = '[0, \\ln ' + m2 + ']';
            S = 'e^{2x}';
            ans = R.F(m2 * m2 - 1, 2);
            cands = [
              [R.F(m2 * m2 - 1), '$\\int e^{2x}\\,dx=\\dfrac{1}{2}e^{2x}$에서 $\\dfrac{1}{2}$을 빠뜨렸습니다.'],
              [R.F(m2 - 1), '한 변의 길이 $e^{x}$을 그대로 적분했습니다. 단면의 넓이는 $e^{2x}$입니다.'],
              [R.F(m2 * m2, 2), '아래끝 값 $\\dfrac{1}{2}e^{0}=\\dfrac{1}{2}$을 빼는 것을 빠뜨렸습니다.'],
            ];
            explain = '$S(x)=(e^{x})^2=e^{2x}$이므로 $V=\\int_{0}^{\\ln ' + m2 + '}e^{2x}\\,dx=\\left[\\dfrac{1}{2}e^{2x}\\right]_{0}^{\\ln ' + m2 + '}=\\dfrac{' + (m2 * m2) + '-1}{2}=' + tex(ans) + '$입니다.';
          }
          return {
            type: 'short', check: 'number', concept: 2,
            q: '구간 $' + range + '$에서 $x$축 위의 점 $(x, 0)$을 지나고 $x$축에 수직인 평면으로 자른 단면이 한 변의 길이가 $' + side + '$인 정사각형인 입체도형이 있습니다. 이 입체도형의 부피를 구하십시오.',
            answer: ans.toString(),
            hint: '단면의 넓이 $S(x)$는 (한 변의 길이)$^2$입니다.',
            wrong: dedup(ans, cands.filter(function (c) { return c[1]; })),
            explain: explain,
          };
        },
      },
      {
        id: 'length',
        level: 3,
        title: '움직인 거리와 곡선의 길이',
        make: function (R) {
          var t = R.int(0, 4), q, ans, cands, explain, concept;
          if (t === 3) {          // 사이클로이드 x = r(t - sin t), y = r(1 - cos t), 0 ≤ t ≤ 2π → 8r
            var rr = R.int(1, 4);
            var xr = rr === 1 ? 't-\\sin t' : rr + '(t-\\sin t)', yr = rr === 1 ? '1-\\cos t' : rr + '(1-\\cos t)';
            ans = R.F(8 * rr);
            cands = [
              [R.F(0), '$\\sqrt{2-2\\cos t}$를 $2\\sin t$로 바꾸었습니다. $1-\\cos t=2\\sin^{2}\\dfrac{t}{2}$이므로 $2\\sin\\dfrac{t}{2}$입니다.'],
              [R.F(4 * rr), '$\\left[-' + (4 * rr) + '\\cos\\dfrac{t}{2}\\right]_{0}^{2\\pi}$에서 아래끝 값을 빼는 것을 빠뜨렸습니다.'],
              [R.F(2 * rr), '$\\int\\sin\\dfrac{t}{2}\\,dt$를 $-\\dfrac{1}{2}\\cos\\dfrac{t}{2}$로 했습니다. $\\dfrac{t}{2}=u$로 치환하면 $dt=2\\,du$이므로 $-2\\cos\\dfrac{t}{2}$입니다.'],
            ];
            q = '좌표평면 위를 움직이는 점 P의 시각 $t$에서의 위치가 $x=' + xr + '$, $y=' + yr + '$일 때, $t=0$부터 $t=2\\pi$까지 점 P가 움직인 거리를 구하십시오.';
            explain = '$\\dfrac{dx}{dt}=' + (rr === 1 ? '1-\\cos t' : rr + '(1-\\cos t)') + '$, $\\dfrac{dy}{dt}=' + (rr === 1 ? '' : rr) + '\\sin t$이므로\n\n' +
              '$\\left(\\dfrac{dx}{dt}\\right)^2+\\left(\\dfrac{dy}{dt}\\right)^2=' + (rr === 1 ? '2-2\\cos t' : rr * rr + '(2-2\\cos t)') + '=' + (4 * rr * rr) + '\\sin^{2}\\dfrac{t}{2}$이고, $0\\le t\\le2\\pi$에서 $\\sin\\dfrac{t}{2}\\ge0$이므로 속력은 $' + (2 * rr) + '\\sin\\dfrac{t}{2}$입니다.\n\n' +
              '$\\int_{0}^{2\\pi}' + (2 * rr) + '\\sin\\dfrac{t}{2}\\,dt=\\left[-' + (4 * rr) + '\\cos\\dfrac{t}{2}\\right]_{0}^{2\\pi}=' + (4 * rr) + '+' + (4 * rr) + '=' + (8 * rr) + '$';
            concept = 3;
          } else if (t === 4) {   // y = x⁴/8 + 1/(4x²), 1 ≤ x ≤ m
            var m4 = R.int(2, 3);
            var F4 = function (x) { return R.F(Math.pow(x, 4), 8).sub(R.F(1, 4 * x * x)); };
            var f4 = function (x) { return R.F(Math.pow(x, 4), 8).add(R.F(1, 4 * x * x)); };
            ans = F4(m4).sub(F4(1));
            cands = [
              [R.F(m4 - 1), '가로 방향의 길이 $' + m4 + '-1$만 구했습니다.'],
              [f4(m4).sub(f4(1)), '$\\int_{1}^{' + m4 + '}y\'\\,dx$, 곧 세로 방향의 변화량을 구했습니다.'],
              [R.F(m4 - 1).add(f4(m4).sub(f4(1))), '$\\int(1+y\')\\,dx$로 근호와 제곱을 빠뜨렸습니다.'],
            ];
            q = '곡선 $y=\\dfrac{x^{4}}{8}+\\dfrac{1}{4x^{2}}$ ($1\\le x\\le' + m4 + '$)의 길이를 구하십시오.';
            explain = '$y\'=\\dfrac{x^{3}}{2}-\\dfrac{1}{2x^{3}}$이므로 $1+(y\')^2=\\left(\\dfrac{x^{3}}{2}+\\dfrac{1}{2x^{3}}\\right)^2$입니다.\n\n' +
              '$l=\\int_{1}^{' + m4 + '}\\left(\\dfrac{x^{3}}{2}+\\dfrac{1}{2x^{3}}\\right)dx=\\left[\\dfrac{x^{4}}{8}-\\dfrac{1}{4x^{2}}\\right]_{1}^{' + m4 + '}=' + tex(F4(m4)) + '-\\left(-\\dfrac{1}{8}\\right)=' + tex(ans) + '$';
            concept = 4;
          } else if (t === 0) {   // x = 3c t², y = c(3t - t³), 0 ≤ t ≤ T → c(3T + T³)
            var c = R.int(1, 3), T = R.int(1, 3);
            var xs = (3 * c) + 't^{2}', ys = (3 * c) + 't-' + (c === 1 ? '' : c) + 't^{3}';
            ans = R.F(c * (3 * T + T * T * T));
            var disp = R.F(3 * c * T * T + 3 * c * T - c * T * T * T);   // x, y 변화량의 합
            var sq = R.F(9 * c * c).mul(R.F(T).add(R.F(2 * T * T * T, 3)).add(R.F(Math.pow(T, 5), 5)));
            cands = [
              [disp, '$\\int\\left(\\dfrac{dx}{dt}+\\dfrac{dy}{dt}\\right)dt$로 가로·세로 변화량을 더했습니다. 속력 $\\sqrt{\\left(\\dfrac{dx}{dt}\\right)^2+\\left(\\dfrac{dy}{dt}\\right)^2}$을 적분합니다.'],
              [sq, '근호를 빠뜨리고 속력의 제곱을 적분했습니다.'],
              [R.F(3 * c * T), '속력 $' + (3 * c) + '(t^{2}+1)$에서 $t^{2}$ 항의 적분을 빠뜨렸습니다.'],
            ];
            q = '좌표평면 위를 움직이는 점 P의 시각 $t$에서의 위치가 $x=' + xs + '$, $y=' + ys + '$일 때, $t=0$부터 $t=' + T + '$까지 점 P가 움직인 거리를 구하십시오.';
            explain = '$\\dfrac{dx}{dt}=' + (6 * c) + 't$, $\\dfrac{dy}{dt}=' + (3 * c) + '-' + (3 * c) + 't^{2}$이므로\n\n' +
              '$\\left(\\dfrac{dx}{dt}\\right)^2+\\left(\\dfrac{dy}{dt}\\right)^2=' + (9 * c * c) + '(t^{4}+2t^{2}+1)=' + (9 * c * c) + '(t^{2}+1)^{2}$, 속력은 $' + (3 * c) + '(t^{2}+1)$입니다.\n\n' +
              '$\\int_{0}^{' + T + '}' + (3 * c) + '(t^{2}+1)\\,dt=' + (3 * c) + '\\left[\\dfrac{1}{3}t^{3}+t\\right]_{0}^{' + T + '}=' + tex(ans) + '$';
            concept = 3;
          } else if (t === 1) {   // y = x³/6 + 1/(2x), 1 ≤ x ≤ m
            var m = R.int(2, 5);
            ans = R.F(m * m * m - 1, 6).add(R.F(m - 1, 2 * m));
            var fm = R.F(m * m * m, 6).add(R.F(1, 2 * m)), f1 = R.F(2, 3);
            cands = [
              [R.F(m - 1), '가로 방향의 길이 $' + m + '-1$만 구했습니다.'],
              [fm.sub(f1), '$\\int_{1}^{' + m + '}f\'(x)\\,dx$, 곧 세로 방향의 변화량을 구했습니다.'],
              [R.F(m - 1).add(fm.sub(f1)), '$\\int\\{1+f\'(x)\\}dx$로 근호와 제곱을 빠뜨렸습니다.'],
            ];
            q = '곡선 $y=\\dfrac{x^{3}}{6}+\\dfrac{1}{2x}$ ($1\\le x\\le' + m + '$)의 길이를 구하십시오.';
            explain = '$y\'=\\dfrac{x^{2}}{2}-\\dfrac{1}{2x^{2}}$이므로 $1+(y\')^2=\\left(\\dfrac{x^{2}}{2}+\\dfrac{1}{2x^{2}}\\right)^2$입니다.\n\n' +
              '$l=\\int_{1}^{' + m + '}\\left(\\dfrac{x^{2}}{2}+\\dfrac{1}{2x^{2}}\\right)dx=\\left[\\dfrac{x^{3}}{6}-\\dfrac{1}{2x}\\right]_{1}^{' + m + '}=' + tex(R.F(m * m * m, 6).sub(R.F(1, 2 * m))) + '-\\left(-\\dfrac{1}{3}\\right)=' + tex(ans) + '$';
            concept = 4;
          } else {                // y = (2/3)x√x, 0 ≤ x ≤ b (1+b 완전제곱)
            var b = R.pick([3, 8, 15]), r = Math.sqrt(1 + b);
            ans = R.F(2 * (r * r * r - 1), 3);
            cands = [
              [R.F(2 * r * r * r, 3), '아래끝 값 $\\dfrac{2}{3}$를 빼는 것을 빠뜨렸습니다.'],
              [R.F(b), '가로 방향의 길이만 구했습니다.'],
              [R.F(3 * (r * r * r - 1), 2), '$\\int\\sqrt{1+x}\\,dx$에서 $\\dfrac{3}{2}$을 곱했습니다. $\\dfrac{2}{3}$를 곱해야 합니다.'],
            ];
            q = '곡선 $y=\\dfrac{2}{3}x\\sqrt{x}$ ($0\\le x\\le' + b + '$)의 길이를 구하십시오.';
            explain = '$y\'=\\sqrt{x}$이므로 $\\sqrt{1+(y\')^2}=\\sqrt{1+x}$입니다.\n\n' +
              '$l=\\int_{0}^{' + b + '}\\sqrt{1+x}\\,dx=\\left[\\dfrac{2}{3}(1+x)\\sqrt{1+x}\\right]_{0}^{' + b + '}=\\dfrac{2}{3}(' + (r * r * r) + '-1)=' + tex(ans) + '$';
            concept = 4;
          }
          return {
            type: 'short', check: 'number', concept: concept,
            q: q,
            answer: ans.toString(),
            hint: concept === 3 ? '속력의 근호 안을 전개하면 완전제곱식이 됩니다.' : '$1+(y\')^2$이 완전제곱식이 되는지 살펴봅니다.',
            wrong: dedup(ans, cands.filter(function (c) { return c[1]; })),
            explain: explain,
          };
        },
      },
    ],
  });
})();
