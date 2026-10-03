/* 미적분학 · 다변수 미적분 맛보기
 * 이변수 함수의 그래프와 등고선, 편도함수와 접평면, 연쇄법칙, 기울기 벡터와 방향도함수,
 * 이계도함수 판정법으로 극값 판정, 직사각형 영역에서의 이중적분과 반복적분을 다룬다. */
(function () {
  /* 그림(svg) — 좌표 범위 o.x=[x0,x1], o.y=[y0,y1] 을 가로 o.w 로 같은 비율로 그린다. */
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
      var n = c.n || 120, d = '';
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
  function circ(rad) { return function (t) { return [rad * Math.cos(t), rad * Math.sin(t)]; }; }
  var PI = Math.PI;

  // f(x, y)=x²+y² 의 등고선 f=1, 2, 3, 4
  var CONTOUR_SVG = plot({
    x: [-2.6, 2.6], y: [-2.6, 2.6], w: 300,
    curves: [1, 2, 3, 4].map(function (k) { return { f: circ(Math.sqrt(k)), t0: 0, t1: 2 * PI, c: 'var(--fig-' + k + ')' }; }),
    texts: [1, 2, 3, 4].map(function (k) {
      var r = Math.sqrt(k) * Math.SQRT1_2;
      return { x: r + 0.06, y: r + 0.06, t: String(k), c: 'var(--fig-' + k + ')', anchor: 'start' };
    }),
    pts: [{ x: 0, y: 0, label: 'O', dx: -5, dy: 14, anchor: 'end' }],
  });
  // 직사각형 R=[0,2]×[1,3] 을 작은 직사각형으로 나눈 그림
  var RECT_SVG = plot({
    x: [-0.7, 2.8], y: [-0.5, 3.6], w: 240,
    segs: [
      { a: [0, 1], b: [2, 1], c: 'var(--fig-1)', w: 2 }, { a: [2, 1], b: [2, 3], c: 'var(--fig-1)', w: 2 },
      { a: [2, 3], b: [0, 3], c: 'var(--fig-1)', w: 2 }, { a: [0, 3], b: [0, 1], c: 'var(--fig-1)', w: 2 },
      { a: [0.5, 1], b: [0.5, 3], dash: true }, { a: [1, 1], b: [1, 3], dash: true }, { a: [1.5, 1], b: [1.5, 3], dash: true },
      { a: [0, 1.5], b: [2, 1.5], dash: true }, { a: [0, 2], b: [2, 2], dash: true }, { a: [0, 2.5], b: [2, 2.5], dash: true },
    ],
    texts: [
      { x: 2, y: -0.3, t: '2' }, { x: -0.18, y: 0.95, t: '1', anchor: 'end' }, { x: -0.18, y: 2.95, t: '3', anchor: 'end' },
      { x: 2.35, y: 2.05, t: 'R', c: 'var(--fig-1)' }, { x: 0.75, y: 1.7, t: 'ΔA', c: 'var(--fig-2)' },
    ],
  });

  // 생성기용 도우미
  function mono(p, q) { return (p ? (p === 1 ? 'x' : 'x^{' + p + '}') : '') + (q ? (q === 1 ? 'y' : 'y^{' + q + '}') : ''); }
  function lin(R, list) {          // [[계수, 문자], …] → TeX (0 인 항은 빼고, 첫 항의 + 는 쓰지 않는다)
    var s = '';
    list.forEach(function (t) { s += R.fmt.term(t[0], t[1], s === ''); });
    return s || '0';
  }
  function pw(R, v, e) { return e === 0 ? '' : e === 1 ? R.fmt.paren(v) : R.fmt.paren(v) + '^{' + e + '}'; }
  function prodTex(list) { return list.filter(function (s) { return s !== ''; }).join('\\cdot '); }

  Tutor.registerUnit({
    id: 'math-u-calc-10',
    course: 'math-u-calc',
    title: '다변수 미적분 맛보기',
    summary: '변수가 둘인 함수의 그래프와 편도함수, 기울기 벡터를 알아보고, 극값 판정과 이중적분을 간단히 맛봅니다.',
    goals: [
      '이변수 함수의 그래프와 등고선의 뜻을 설명할 수 있다.',
      '편도함수를 구하고, 접평면의 방정식과 연쇄법칙을 쓸 수 있다.',
      '기울기 벡터로 방향도함수를 구하고, 이계도함수 판정법으로 임계점을 분류할 수 있다.',
      '직사각형 영역에서 이중적분을 반복적분으로 계산할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '이변수 함수의 그래프와 등고선',
        body: '순서쌍 $(x, y)$마다 실수 $f(x, y)$ 하나를 대응시키는 함수를 **이변수 함수**라고 합니다. 예: 가로 $x$, 세로 $y$인 직사각형의 넓이 $f(x, y)=xy$, 지도 위의 위치 $(x, y)$에서의 해발 고도.\n\n$z=f(x, y)$를 만족하는 점 $(x, y, z)$ 전체가 함수의 **그래프**이고, 이것은 공간의 **곡면**입니다. 예: $z=x^2+y^2$의 그래프는 위로 열린 그릇 모양(포물면)이고, $z=x^2-y^2$의 그래프는 말안장 모양입니다.\n\n곡면은 그리기 어려우므로 지도처럼 **등고선**을 씁니다. 상수 $k$에 대하여 $f(x, y)=k$를 만족하는 점 $(x, y)$의 모임이 높이 $k$인 등고선입니다.\n\n- $f(x, y)=x^2+y^2$: 등고선 $x^2+y^2=k$ $(k>0)$는 반지름이 $\\sqrt{k}$인 원입니다.\n- $f(x, y)=2x+y$: 등고선 $2x+y=k$는 서로 평행한 직선입니다.\n\n> 💡 높이를 같은 간격으로 바꾸며 그린 등고선이 **촘촘한 곳일수록 경사가 급합니다.** 그림에서 $f=x^2+y^2$의 등고선은 원점에서 멀어질수록 촘촘해집니다. 그릇의 벽이 바깥으로 갈수록 가팔라지기 때문입니다.',
        easy: '등산 지도를 떠올려 보십시오. 지도 위의 위치(동서 방향의 좌표, 남북 방향의 좌표)를 넣으면 그 지점의 높이가 나오는 함수가 이변수 함수입니다.\n\n지도에 그린 등고선은 "높이가 같은 지점을 이은 선"이고, 선들이 빽빽한 곳은 짧은 거리에서 높이가 많이 바뀌는 가파른 비탈입니다.',
        fig: { type: 'svg', svg: CONTOUR_SVG, alt: 'f(x, y)=x²+y² 의 등고선 f=1, 2, 3, 4. 원점이 중심이고 반지름이 1, √2, √3, 2인 원 네 개이며, 바깥쪽으로 갈수록 원 사이 간격이 좁아진다' },
        check: {
          type: 'choice',
          q: '$f(x, y)=x+y$의 등고선 $f(x, y)=3$은 어떤 도형입니까?',
          choices: ['직선 $x+y=3$', '반지름이 3인 원', '한 점 $(3, 3)$'],
          answer: 0,
          why: ['', '$x^2+y^2=k$ 꼴일 때 원이 됩니다. $x+y=3$은 일차식이므로 직선입니다.', '$x+y=3$을 만족하는 점은 $(3, 0)$, $(1, 2)$처럼 무수히 많습니다. $(3, 3)$은 $x+y=6$이라 이 등고선 위에 있지도 않습니다.'],
          explain: '$f(x, y)=3$, 곧 $x+y=3$을 만족하는 점 전체이므로 직선입니다. $k$를 바꾸면 서로 평행한 직선들이 등고선이 됩니다.',
        },
      },
      {
        title: '편도함수와 접평면',
        body: '$f(x, y)$에서 $y$를 상수로 보고 $x$에 대하여 미분한 것을 $x$에 대한 **편도함수**라 하고 $f_x$ 또는 $\\frac{\\partial f}{\\partial x}$로 씁니다. $f_y$도 같은 방법으로 $x$를 상수로 보고 구합니다.\n\n$f_x(a, b)=\\lim_{h \\to 0}\\frac{f(a+h, b)-f(a, b)}{h}$\n\n**뜻**: 곡면 $z=f(x, y)$를 평면 $y=b$로 자른 곡선의 $x$ 방향 기울기가 $f_x(a, b)$입니다.\n\n예: $f(x, y)=x^2y+3xy^3$이면 $f_x=2xy+3y^3$, $f_y=x^2+9xy^2$입니다.\n\n**접평면**: $f_x$, $f_y$가 연속이면 곡면 위의 점 $(a, b, f(a, b))$에서의 접평면은\n\n$z-f(a, b)=f_x(a, b)(x-a)+f_y(a, b)(y-b)$\n\n입니다. 일변수 함수의 접선 $y-f(a)=f\'(a)(x-a)$를 두 방향으로 늘린 식입니다. 점 근처에서 $f(x, y)$를 이 일차식으로 어림하는 것을 **선형근사**라고 합니다.\n\n예: $f(x, y)=x^2+y^2$, 점 $(1, 2)$에서 $f=5$, $f_x=2$, $f_y=4$이므로 접평면은 $z=5+2(x-1)+4(y-2)$, 곧 $z=2x+4y-5$입니다.',
        easy: '언덕 위에 서서 동쪽으로만 한 걸음 갈 때 높이가 얼마나 변하는지가 $f_x$, 북쪽으로만 한 걸음 갈 때가 $f_y$입니다. 한 방향으로만 움직이므로 다른 변수는 고정된 상수처럼 다룹니다.\n\n접평면은 그 지점에 넓은 판자를 살짝 대어 놓은 것입니다. 판자의 동쪽 기울기가 $f_x$, 북쪽 기울기가 $f_y$입니다.',
        check: {
          type: 'short', check: 'number',
          q: '$f(x, y)=x^3y^2$일 때 $f_x(1, 2)$의 값을 구하십시오.',
          answer: '12',
          wrong: [{ a: '4', why: '$y$에 대한 편도함수 $f_y=2x^3y$의 값을 구했습니다. $f_x$는 $y$를 상수로 보고 $x$로 미분합니다.' }],
          explain: '$y$를 상수로 보면 $f_x=3x^2y^2$입니다. $f_x(1, 2)=3\\cdot 1\\cdot 4=12$입니다.',
        },
      },
      {
        title: '연쇄법칙',
        body: '$z=f(x, y)$에서 $f$가 미분가능하고(편도함수들이 연속이면 충분합니다) $x=x(t)$, $y=y(t)$도 미분가능하면, $z$는 $t$의 함수이고\n\n$\\frac{dz}{dt}=\\frac{\\partial f}{\\partial x}\\frac{dx}{dt}+\\frac{\\partial f}{\\partial y}\\frac{dy}{dt}$\n\n입니다. $t$가 조금 변하면 $x$와 $y$가 함께 변하므로, $z$의 변화는 "$x$를 통한 변화"와 "$y$를 통한 변화"를 더한 것입니다.\n\n예: $z=x^2y$, $x=t^2$, $y=3t$이면 $t=1$에서 $x=1$, $y=3$이고\n\n$\\frac{dz}{dt}=2xy\\cdot 2t+x^2\\cdot 3=6\\cdot 2+1\\cdot 3=15$\n\n입니다. (확인: $z=3t^5$이므로 $\\frac{dz}{dt}=15t^4$, $t=1$에서 15)\n\n$x=x(s, t)$, $y=y(s, t)$처럼 변수가 둘이면 같은 방법으로\n\n$\\frac{\\partial z}{\\partial s}=\\frac{\\partial z}{\\partial x}\\frac{\\partial x}{\\partial s}+\\frac{\\partial z}{\\partial y}\\frac{\\partial y}{\\partial s}$\n\n입니다.\n\n> ⚠️ 변수가 하나뿐인 함수의 도함수는 $\\frac{d}{dt}$, 다른 변수를 고정하고 미분하는 편도함수는 $\\frac{\\partial}{\\partial t}$로 구별해 씁니다.',
        easy: '등산로를 따라 걷는 사람의 높이 $z=f(x, y)$를 생각해 보십시오. 시각 $t$에 따라 위치 $(x(t), y(t))$가 바뀌면 높이도 바뀝니다.\n\n높이가 바뀌는 빠르기 = (동쪽 기울기) × (동쪽으로 가는 빠르기) + (북쪽 기울기) × (북쪽으로 가는 빠르기). 이것이 연쇄법칙입니다.',
        check: {
          type: 'choice',
          q: '$z=f(x, y)$, $x=x(t)$, $y=y(t)$일 때 $\\frac{dz}{dt}$를 바르게 나타낸 것은 무엇입니까?',
          choices: ['$f_x\\frac{dx}{dt}+f_y\\frac{dy}{dt}$', '$f_x+f_y$', '$f_x\\frac{dx}{dt}\\cdot f_y\\frac{dy}{dt}$'],
          answer: 0,
          why: ['', '$x$, $y$가 $t$에 따라 변하는 빠르기 $\\frac{dx}{dt}$, $\\frac{dy}{dt}$를 곱하지 않았습니다.', '두 경로를 통한 변화는 곱하지 않고 더합니다.'],
          explain: '$x$를 통한 변화 $f_x\\frac{dx}{dt}$와 $y$를 통한 변화 $f_y\\frac{dy}{dt}$를 더합니다.',
        },
      },
      {
        title: '기울기 벡터와 방향도함수',
        body: '두 편도함수를 성분으로 하는 벡터 $\\nabla f=(f_x, f_y)$를 **기울기 벡터**(그래디언트)라고 합니다.\n\n점 $(x_0, y_0)$에서 단위벡터 $\\vec{u}=(a, b)$ 방향으로 움직일 때 $f$의 순간변화율을 **방향도함수** $D_{\\vec{u}}f$라고 합니다. 직선 $x=x_0+at$, $y=y_0+bt$ 위에서 연쇄법칙을 쓰면\n\n$D_{\\vec{u}}f=f_x a+f_y b=\\nabla f\\cdot\\vec{u}$\n\n입니다. $f_x$는 $\\vec{u}=(1, 0)$, $f_y$는 $\\vec{u}=(0, 1)$인 특별한 경우입니다.\n\n내적의 성질 $\\nabla f\\cdot\\vec{u}=|\\nabla f|\\cos\\phi$ ($\\phi$는 두 벡터가 이루는 각)에서\n\n- $f$는 $\\nabla f$의 방향으로 가장 빠르게 증가하고, 그때의 변화율은 $|\\nabla f|$입니다.\n- $-\\nabla f$의 방향으로 가장 빠르게 감소합니다.\n- $\\nabla f$와 수직인 방향의 방향도함수는 0입니다. 그래서 $\\nabla f$는 **등고선에 수직**입니다.\n\n예: $f=x^2y$, 점 $(1, 2)$, $\\vec{u}=\\left(\\frac{3}{5}, \\frac{4}{5}\\right)$이면 $\\nabla f=(2xy, x^2)=(4, 1)$이므로 $D_{\\vec{u}}f=\\frac{12}{5}+\\frac{4}{5}=\\frac{16}{5}$입니다.\n\n> ⚠️ 방향이 단위벡터가 아닌 벡터로 주어지면 먼저 그 크기로 나누어 단위벡터로 바꿉니다.',
        easy: '언덕에서 어느 쪽으로 걸어야 가장 가파르게 올라가는지 알려 주는 화살표가 $\\nabla f$입니다. 화살표의 길이는 그 방향으로의 가파른 정도입니다.\n\n다른 방향으로 걸으면 화살표를 그 방향에 비춘 그림자 길이만큼만 올라갑니다. 이것이 내적 $\\nabla f\\cdot\\vec{u}$입니다. 화살표와 직각인 방향, 곧 등고선을 따라 걸으면 높이가 변하지 않습니다.',
        check: {
          type: 'ox',
          q: '점 $(x_0, y_0)$에서 $\\nabla f \\ne \\vec{0}$이면, $\\nabla f$는 그 점을 지나는 등고선에 수직입니다.',
          answer: true,
          explain: '등고선을 따라 움직이면 $f$의 값이 변하지 않으므로 그 방향의 방향도함수 $\\nabla f\\cdot\\vec{u}$가 0입니다. 내적이 0이므로 $\\nabla f$는 등고선의 접선 방향과 수직입니다.',
        },
      },
      {
        title: '이변수 함수의 극값 판정',
        body: '$f$가 점 $(a, b)$에서 극값을 가지고 편도함수가 있으면 $f_x(a, b)=0$, $f_y(a, b)=0$입니다. 이런 점을 **임계점**이라고 합니다. 그러나 임계점이 모두 극값을 주지는 않습니다. 예: $f=x^2-y^2$은 원점이 임계점이지만, $x$ 방향으로는 극소이고 $y$ 방향으로는 극대인 **안장점**입니다.\n\n판정에는 **이계 편도함수** $f_{xx}=(f_x)_x$, $f_{yy}=(f_y)_y$, $f_{xy}=(f_x)_y$를 씁니다. 이계 편도함수가 연속인 보통의 함수에서는 $f_{xy}=f_{yx}$입니다.\n\n임계점 $(a, b)$에서 $D=f_{xx}f_{yy}-(f_{xy})^2$이라 하면\n\n| 조건 | 결론 |\n|---|---|\n| $D>0$, $f_{xx}>0$ | 극소 |\n| $D>0$, $f_{xx}<0$ | 극대 |\n| $D<0$ | 안장점 (극값 아님) |\n| $D=0$ | 이 방법으로는 알 수 없음 |\n\n예: $f=x^3-3x+y^2$에서 $f_x=3x^2-3$, $f_y=2y$이므로 임계점은 $(1, 0)$, $(-1, 0)$입니다. $f_{xx}=6x$, $f_{yy}=2$, $f_{xy}=0$이므로\n\n- $(1, 0)$: $D=12>0$, $f_{xx}=6>0$ → 극솟값 $f(1, 0)=-2$\n- $(-1, 0)$: $D=-12<0$ → 안장점\n\n> 💡 $D>0$이면 $f_{xx}f_{yy}>0$이므로 $f_{xx}$와 $f_{yy}$의 부호가 같습니다. $f_{yy}$로 판정해도 결론이 같습니다.',
        easy: '임계점은 곡면 위의 "평평한 곳"입니다. 평평한 곳에는 산꼭대기(극대), 골짜기 바닥(극소), 말안장의 가운데(안장점) 세 가지가 있습니다.\n\n$f_{xx}$, $f_{yy}$는 동서·남북 방향으로 얼마나 휘었는지, $f_{xy}$는 비스듬히 비틀린 정도입니다. 휘어짐이 비틀림보다 충분히 크고($D>0$) 위로 볼록하면 꼭대기, 아래로 볼록하면 바닥입니다. $D<0$이면 어떤 방향으로는 올라가고 어떤 방향으로는 내려가는 말안장입니다.',
        check: {
          type: 'choice',
          q: '임계점 $(a, b)$에서 $f_{xx}=2$, $f_{yy}=1$, $f_{xy}=3$입니다. 이 점은 무엇입니까?',
          choices: ['안장점', '극소점', '극대점'],
          answer: 0,
          why: ['', '$f_{xx}>0$만 보았습니다. 먼저 $D=2\\cdot 1-3^2=-7<0$인지 확인합니다. $D<0$이면 안장점입니다.', '$D=2-9=-7<0$이므로 극값이 아니라 안장점입니다. 또 $f_{xx}>0$이므로 극대일 수는 없습니다.'],
          explain: '$D=f_{xx}f_{yy}-(f_{xy})^2=2\\cdot 1-9=-7<0$이므로 안장점입니다.',
        },
      },
      {
        title: '직사각형 영역에서의 이중적분과 반복적분',
        body: '직사각형 $R=[a, b]\\times[c, d]$에서 $f(x, y) \\ge 0$일 때, $R$ 위에 있고 곡면 $z=f(x, y)$ 아래에 있는 입체의 부피를 생각합니다. $R$을 작은 직사각형으로 나누고 각 조각에서 (높이 $f$) × (밑넓이 $\\Delta A$)를 더한 **리만 합**의 극한을 **이중적분**이라 하고 $\\iint_{R} f(x, y)\\,dA$로 씁니다.\n\n$f$가 연속이면 이중적분은 한 변수씩 차례로 적분하는 **반복적분**으로 계산할 수 있고, 적분 순서를 바꾸어도 값이 같습니다(푸비니 정리).\n\n$\\iint_{R} f\\,dA=\\int_{a}^{b}\\left(\\int_{c}^{d}f(x, y)\\,dy\\right)dx=\\int_{c}^{d}\\left(\\int_{a}^{b}f(x, y)\\,dx\\right)dy$\n\n안쪽 적분에서는 다른 변수를 상수로 봅니다(편도함수와 같은 생각입니다).\n\n예: $R=[0, 2]\\times[1, 3]$, $f=x+2y$이면 $\\int_{1}^{3}(x+2y)\\,dy=\\left[xy+y^2\\right]_{1}^{3}=2x+8$이고, $\\int_{0}^{2}(2x+8)\\,dx=4+16=20$입니다.\n\n> 💡 $f(x, y)=g(x)h(y)$처럼 $x$의 식과 $y$의 식의 곱이면 $\\iint_{R} f\\,dA=\\left(\\int_{a}^{b}g(x)\\,dx\\right)\\left(\\int_{c}^{d}h(y)\\,dy\\right)$로 더 빨리 구할 수 있습니다.',
        easy: '식빵 한 덩어리의 부피를 구한다고 생각해 보십시오. 빵을 얇게 썰어 단면의 넓이를 구하고, 그 넓이들을 두께 방향으로 모두 더하면 부피가 됩니다.\n\n안쪽 적분 $\\int_{c}^{d}f(x, y)\\,dy$는 $x$ 위치에서 자른 단면 한 장의 넓이이고, 바깥 적분은 그 단면들을 $x$ 방향으로 쌓아 부피를 만드는 일입니다. 가로로 썰든 세로로 썰든 빵의 부피는 같습니다.',
        fig: { type: 'svg', svg: RECT_SVG, alt: '좌표평면의 직사각형 R = [0, 2]×[1, 3]. 점선으로 가로세로 4칸씩, 16개의 작은 직사각형으로 나뉘어 있고 그중 한 칸에 ΔA라고 적혀 있다' },
        check: {
          type: 'short', check: 'number',
          q: '$\\int_{0}^{1}\\left(\\int_{0}^{3}2x\\,dy\\right)dx$의 값을 구하십시오.',
          answer: '3',
          wrong: [{ a: '1', why: '안쪽 적분을 빠뜨렸습니다. $\\int_{0}^{3}2x\\,dy$는 $y$에 대한 적분이라 $2x$를 상수로 보고 $6x$가 됩니다.' }],
          explain: '안쪽 적분에서 $2x$는 상수이므로 $\\int_{0}^{3}2x\\,dy=6x$입니다. 바깥 적분은 $\\int_{0}^{1}6x\\,dx=3$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '$f(x, y)=x^2+xy+y^2-3y$의 임계점을 구하고, 극대·극소·안장점 가운데 무엇인지 판정하십시오.',
        steps: [
          '$f_x=2x+y=0$, $f_y=x+2y-3=0$을 연립합니다. 첫 식에서 $y=-2x$이고, 둘째 식에 넣으면 $x-4x-3=0$, 곧 $x=-1$, $y=2$입니다.',
          '$f_{xx}=2$, $f_{yy}=2$, $f_{xy}=1$이므로 $D=2\\cdot 2-1^2=3>0$입니다.',
          '$f_{xx}=2>0$이므로 $(-1, 2)$에서 극소입니다.',
          '극솟값은 $f(-1, 2)=1-2+4-6=-3$입니다.',
        ],
        answer: '임계점 $(-1, 2)$에서 극솟값 $-3$',
      },
      {
        q: '$f(x, y)=x^2+3y^2$의 점 $(1, 1)$에서 벡터 $\\vec{v}=(1, 2)$ 방향으로의 방향도함수와, 이 점에서 $f$가 가장 빠르게 증가하는 비율을 구하십시오.',
        steps: [
          '$\\nabla f=(2x, 6y)$이므로 점 $(1, 1)$에서 $\\nabla f=(2, 6)$입니다.',
          '$|\\vec{v}|=\\sqrt{1+4}=\\sqrt{5}$이므로 단위벡터는 $\\vec{u}=\\left(\\frac{1}{\\sqrt{5}}, \\frac{2}{\\sqrt{5}}\\right)$입니다.',
          '$D_{\\vec{u}}f=\\nabla f\\cdot\\vec{u}=\\frac{2+12}{\\sqrt{5}}=\\frac{14}{\\sqrt{5}}$입니다.',
          '가장 빠르게 증가하는 비율은 $|\\nabla f|=\\sqrt{4+36}=2\\sqrt{10}$입니다.',
        ],
        answer: '$D_{\\vec{u}}f=\\frac{14}{\\sqrt{5}}$, 최대 증가율 $2\\sqrt{10}$',
      },
      {
        q: '$R=[0, 1]\\times[0, 2]$일 때 $\\iint_{R}(x^2+y)\\,dA$를 구하십시오.',
        steps: [
          '안쪽에서 $y$에 대하여 적분합니다($x$는 상수). $\\int_{0}^{2}(x^2+y)\\,dy=\\left[x^2y+\\frac{y^2}{2}\\right]_{0}^{2}=2x^2+2$',
          '바깥에서 $x$에 대하여 적분합니다. $\\int_{0}^{1}(2x^2+2)\\,dx=\\frac{2}{3}+2=\\frac{8}{3}$',
        ],
        answer: '$\\frac{8}{3}$',
      },
    ],

    terms: [
      { term: '이변수 함수', def: '순서쌍 $(x, y)$마다 실수 하나를 대응시키는 함수입니다. 그래프 $z=f(x, y)$는 공간의 곡면입니다.' },
      { term: '등고선', def: '$f(x, y)=k$를 만족하는 점 $(x, y)$의 모임입니다. 함수값이 같은 점을 이은 곡선으로, 지도의 등고선과 같습니다.' },
      { term: '편도함수', def: '다른 변수를 상수로 보고 한 변수에 대하여 미분한 함수입니다. $f_x=\\frac{\\partial f}{\\partial x}$, $f_y=\\frac{\\partial f}{\\partial y}$' },
      { term: '접평면', def: '곡면 $z=f(x, y)$ 위의 한 점에서 곡면에 접하는 평면입니다. $z-f(a, b)=f_x(a, b)(x-a)+f_y(a, b)(y-b)$' },
      { term: '기울기 벡터', def: '편도함수를 성분으로 하는 벡터 $\\nabla f=(f_x, f_y)$입니다. $f$가 가장 빠르게 증가하는 방향을 가리키고, 등고선에 수직입니다.' },
      { term: '방향도함수', def: '단위벡터 $\\vec{u}$ 방향으로의 순간변화율입니다. $D_{\\vec{u}}f=\\nabla f\\cdot\\vec{u}$' },
      { term: '임계점', def: '$f_x=0$, $f_y=0$인 점입니다. 극값은 (편도함수가 있으면) 임계점에서만 생길 수 있습니다.' },
      { term: '안장점', def: '임계점이지만 어떤 방향으로는 증가하고 어떤 방향으로는 감소해서 극값이 아닌 점입니다. 예: $f=x^2-y^2$의 원점' },
      { term: '이중적분', def: '영역을 작은 조각으로 나누어 (함숫값) × (조각의 넓이)를 더한 리만 합의 극한입니다. $f \\ge 0$이면 곡면 아래 입체의 부피입니다.' },
      { term: '반복적분', def: '한 변수씩 차례로 적분하는 것입니다. 직사각형 영역에서 연속함수의 이중적분은 어느 순서의 반복적분으로도 구할 수 있습니다(푸비니 정리).' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '$f(x, y)=x^2+4y^2$의 등고선 $f(x, y)=4$는 어떤 곡선입니까?',
        choices: ['$x$절편이 $\\pm 2$, $y$절편이 $\\pm 1$인 타원', '반지름이 2인 원', '$x$절편이 $\\pm 1$, $y$절편이 $\\pm 2$인 타원', '$x$절편이 $\\pm 2$인 쌍곡선'],
        answer: 0,
        why: [
          '',
          '$y^2$의 계수가 4이므로 원이 아닙니다. $y=0$이면 $x=\\pm 2$, $x=0$이면 $y=\\pm 1$입니다.',
          '절편을 바꾸어 구했습니다. $y=0$을 넣으면 $x^2=4$에서 $x=\\pm 2$입니다.',
          '두 제곱항의 부호가 모두 $+$이므로 쌍곡선이 아니라 타원입니다.',
        ],
        explain: '$x^2+4y^2=4$, 곧 $\\frac{x^2}{4}+y^2=1$이므로 $x$절편이 $\\pm 2$, $y$절편이 $\\pm 1$인 타원입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1,
        q: '$f(x, y)=x^3y^2+2y$일 때 $f_x$는 무엇입니까?',
        choices: ['$3x^2y^2$', '$3x^2y^2+2$', '$2x^3y+2$', '$6x^2y$'],
        answer: 0,
        why: [
          '',
          '$2y$는 $x$에 대해서는 상수이므로 $x$로 미분하면 0입니다.',
          '$y$에 대한 편도함수 $f_y$를 구했습니다.',
          '$x$와 $y$로 한 번씩 미분한 $f_{xy}$를 구했습니다.',
        ],
        explain: '$y$를 상수로 보면 $x^3y^2$의 $x$에 대한 미분은 $3x^2y^2$이고, $2y$는 상수라서 0입니다. $f_x=3x^2y^2$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 1,
        q: '$f(x, y)=x^2y+y^3$일 때 $f_y(1, 2)$의 값을 구하십시오.',
        answer: '13',
        wrong: [
          { a: '4', why: '$x$에 대한 편도함수 $f_x=2xy$의 값을 구했습니다.' },
          { a: '12', why: '$x^2y$의 $y$에 대한 미분 $x^2$을 빠뜨렸습니다. $y$로 미분하면 $x^2$이 남습니다.' },
        ],
        explain: '$x$를 상수로 보면 $f_y=x^2+3y^2$입니다. $f_y(1, 2)=1+12=13$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 0,
        q: '$f(x, y)=x^2+y^2$의 등고선 $f(x, y)=c$ $(c>0)$는 원점이 중심이고 반지름이 $c$인 원입니다.',
        answer: false,
        explain: '$x^2+y^2=c$이므로 반지름은 $c$가 아니라 $\\sqrt{c}$입니다. 예를 들어 $c=4$이면 반지름이 2인 원입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'expr', concept: 1,
        q: '곡면 $z=x^2+xy$ 위의 점 $(1, 1, 2)$에서의 접평면을 $z=(\\text{식})$ 꼴로 나타낼 때, 우변의 식을 쓰십시오. (예: 2x-y+1)',
        answer: '3x+y-2',
        hint: '$f_x(1, 1)$, $f_y(1, 1)$을 구해 $z-2=f_x(1, 1)(x-1)+f_y(1, 1)(y-1)$에 넣습니다.',
        wrong: [
          { a: '3x+y-4', why: '접점의 높이 $f(1, 1)=2$를 더하지 않았습니다. $z-2=\\cdots$에서 2를 옮겨야 합니다.' },
          { a: '3x+y', why: '접평면을 $z=f_x(1, 1)x+f_y(1, 1)y$로 썼습니다. 접점에서 잰 변화량 $(x-1)$, $(y-1)$을 쓰고 접점의 높이 2를 더해야 합니다.' },
        ],
        explain: '$f_x=2x+y$, $f_y=x$이므로 $f_x(1, 1)=3$, $f_y(1, 1)=1$입니다.\n\n$z-2=3(x-1)+(y-1)$을 정리하면 $z=3x+y-2$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 2,
        q: '$z=xy^2$, $x=2t$, $y=t^2+1$일 때 $t=1$에서 $\\frac{dz}{dt}$의 값을 구하십시오.',
        answer: '24',
        hint: '$t=1$일 때 $x$, $y$의 값부터 구합니다.',
        wrong: [{ a: '12', why: '$f_x+f_y=4+8$만 더했습니다. 각각에 $\\frac{dx}{dt}=2$, $\\frac{dy}{dt}=2$를 곱해야 합니다.' }],
        explain: '$t=1$이면 $x=2$, $y=2$입니다. $\\frac{\\partial z}{\\partial x}=y^2=4$, $\\frac{\\partial z}{\\partial y}=2xy=8$, $\\frac{dx}{dt}=2$, $\\frac{dy}{dt}=2t=2$이므로\n\n$\\frac{dz}{dt}=4\\cdot 2+8\\cdot 2=24$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '$f(x, y)=x^2+3xy$의 점 $(1, 2)$에서의 기울기 벡터 $\\nabla f$는 무엇입니까?',
        choices: ['$(8, 3)$', '$(3, 8)$', '$(2, 3)$', '$(8, 6)$'],
        answer: 0,
        why: [
          '',
          '두 성분의 순서를 바꾸었습니다. $\\nabla f=(f_x, f_y)$입니다.',
          '$f_x$에서 $3xy$의 미분 $3y$를 빠뜨렸습니다. $f_x=2x+3y$입니다.',
          '$f_y$를 잘못 구했습니다. $3xy$를 $y$로 미분하면 $3x$이므로 $f_y(1, 2)=3$입니다.',
        ],
        explain: '$f_x=2x+3y$, $f_y=3x$이므로 점 $(1, 2)$에서 $\\nabla f=(2+6, 3)=(8, 3)$입니다.',
      },
      {
        id: 'p8', level: 1, type: 'ox', concept: 0,
        q: '그림은 $f(x, y)=x^2+y^2$의 등고선 $f=1, 2, 3, 4$입니다. 원점에서 멀어질수록 등고선 사이의 간격이 좁아지므로, 원점에서 멀수록 $f$의 값이 더 빠르게 변합니다.',
        fig: { type: 'svg', svg: CONTOUR_SVG, alt: 'f(x, y)=x²+y² 의 등고선 f=1, 2, 3, 4. 원점이 중심인 원 네 개이며, 바깥쪽으로 갈수록 원 사이 간격이 좁아진다' },
        answer: true,
        explain: '같은 높이 차이(1)를 더 짧은 거리에서 올라가므로 바깥쪽이 더 가파릅니다. 실제로 $|\\nabla f|=|(2x, 2y)|=2\\sqrt{x^2+y^2}$이므로 원점에서 멀수록 변화율이 커집니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 3,
        q: '$f(x, y)=xy^2$의 점 $(2, 1)$에서 벡터 $\\vec{v}=(3, -4)$ 방향으로의 방향도함수를 구하십시오.',
        answer: '-13/5',
        hint: '$\\vec{v}$를 먼저 단위벡터로 바꿉니다.',
        wrong: [
          { a: '-13', why: '$\\vec{v}$를 단위벡터로 바꾸지 않았습니다. $|\\vec{v}|=5$로 나누어야 합니다.' },
          { a: '13/5', why: '부호를 놓쳤습니다. $1\\cdot 3+4\\cdot(-4)=-13$입니다.' },
        ],
        explain: '$\\nabla f=(y^2, 2xy)$이므로 점 $(2, 1)$에서 $\\nabla f=(1, 4)$입니다. $|\\vec{v}|=5$이므로 $\\vec{u}=\\left(\\frac{3}{5}, -\\frac{4}{5}\\right)$입니다.\n\n$D_{\\vec{u}}f=1\\cdot\\frac{3}{5}+4\\cdot\\left(-\\frac{4}{5}\\right)=-\\frac{13}{5}$\n\n음수이므로 이 방향으로 가면 $f$가 줄어듭니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 4,
        q: '$f(x, y)=x^2+y^2-2x+4y$의 임계점과 그 판정 결과로 옳은 것은 무엇입니까?',
        choices: ['$(1, -2)$에서 극솟값 $-5$', '$(1, -2)$에서 극댓값 $-5$', '$(-1, 2)$에서 극솟값 $-5$', '$(1, -2)$는 안장점'],
        answer: 0,
        why: [
          '',
          '$D=4>0$이고 $f_{xx}=2>0$이므로 극대가 아니라 극소입니다.',
          '부호를 잘못 풀었습니다. $2x-2=0$에서 $x=1$, $2y+4=0$에서 $y=-2$입니다.',
          '$D=f_{xx}f_{yy}-(f_{xy})^2=4>0$이므로 안장점이 아닙니다.',
        ],
        hint: '$f_x=0$, $f_y=0$을 풀고 $D=f_{xx}f_{yy}-(f_{xy})^2$의 부호를 봅니다.',
        explain: '$f_x=2x-2=0$, $f_y=2y+4=0$에서 임계점은 $(1, -2)$입니다. $f_{xx}=2$, $f_{yy}=2$, $f_{xy}=0$이므로 $D=4>0$, $f_{xx}>0$이라 극소입니다. 극솟값은 $f(1, -2)=1+4-2-8=-5$입니다. (완전제곱식으로 $f=(x-1)^2+(y+2)^2-5$라고 보아도 됩니다.)',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 5,
        q: '$R=[0, 1]\\times[0, 2]$일 때 $\\iint_{R}6xy^2\\,dA$의 값을 구하십시오.',
        answer: '8',
        hint: '$6xy^2=(6x)(y^2)$로 나뉘므로 두 적분의 곱으로 구할 수 있습니다.',
        wrong: [
          { a: '24', why: '$\\int_{0}^{2}y^2\\,dy$를 $\\frac{y^3}{3}$이 아니라 $y^3$으로 계산했습니다.' },
          { a: '3', why: '$x$에 대한 적분만 했습니다. $y$에 대한 적분 $\\int_{0}^{2}y^2\\,dy=\\frac{8}{3}$도 곱해야 합니다.' },
        ],
        explain: '$\\int_{0}^{1}6x\\,dx=3$, $\\int_{0}^{2}y^2\\,dy=\\frac{8}{3}$이므로 $\\iint_{R}6xy^2\\,dA=3\\cdot\\frac{8}{3}=8$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 3,
        q: '$f(x, y)=x^2+y^2$이 점 $(3, 4)$에서 가장 빠르게 증가하는 방향으로의 변화율(방향도함수의 최댓값)을 구하십시오.',
        answer: '10',
        wrong: [
          { a: '14', why: '$\\nabla f=(6, 8)$의 두 성분을 더했습니다. 최대 변화율은 벡터의 크기 $|\\nabla f|$입니다.' },
          { a: '100', why: '$|\\nabla f|^2$을 구했습니다. 제곱근을 씌워야 합니다.' },
          { a: '5', why: '점 $(3, 4)$의 원점에서의 거리를 구했습니다. $\\nabla f=(2x, 2y)=(6, 8)$의 크기를 구합니다.' },
        ],
        explain: '$\\nabla f=(2x, 2y)=(6, 8)$이고, 최대 변화율은 $|\\nabla f|=\\sqrt{36+64}=10$입니다. 그 방향은 $\\nabla f$의 방향, 곧 원점에서 멀어지는 방향입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 4,
        q: '$f(x, y)=x^3+y^3-3xy$의 임계점과 판정 결과를 바르게 말한 것은 무엇입니까?',
        choices: [
          '$(1, 1)$에서 극솟값 $-1$을 가지고, $(0, 0)$은 안장점이다.',
          '$(1, 1)$에서 극댓값 $-1$을 가지고, $(0, 0)$은 안장점이다.',
          '$(1, 1)$에서 극솟값 $-1$, $(0, 0)$에서 극댓값 $0$을 가진다.',
          '임계점은 $(1, 1)$ 하나뿐이고, 극솟값 $-1$을 가진다.',
        ],
        answer: 0,
        why: [
          '',
          '$(1, 1)$에서 $f_{xx}=6>0$이므로 극대가 아니라 극소입니다.',
          '$(0, 0)$에서 $D=0\\cdot 0-(-3)^2=-9<0$이므로 극값이 아니라 안장점입니다.',
          '$y=x^2$, $x=y^2$에서 $x^4=x$의 해 $x=0$을 빠뜨렸습니다. $(0, 0)$도 임계점입니다.',
        ],
        hint: '$f_x=3x^2-3y=0$, $f_y=3y^2-3x=0$에서 $y=x^2$을 둘째 식에 넣어 봅니다.',
        explain: '$f_x=3x^2-3y=0$에서 $y=x^2$, 이것을 $f_y=3y^2-3x=0$에 넣으면 $x^4=x$, 곧 $x(x^3-1)=0$이므로 $x=0$ 또는 $x=1$입니다. 임계점은 $(0, 0)$, $(1, 1)$입니다.\n\n$f_{xx}=6x$, $f_{yy}=6y$, $f_{xy}=-3$이므로\n\n- $(0, 0)$: $D=0-9=-9<0$ → 안장점\n- $(1, 1)$: $D=36-9=27>0$, $f_{xx}=6>0$ → 극솟값 $f(1, 1)=1+1-3=-1$',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 5,
        q: '$R=[0, 1]\\times[0, 1]$일 때 $\\iint_{R}xe^{xy}\\,dA$의 값은 무엇입니까?',
        choices: ['$e-2$', '$e-1$', '$e$', '$2-e$'],
        answer: 0,
        why: [
          '',
          '안쪽 적분 $\\left[e^{xy}\\right]_{y=0}^{y=1}$에서 아래끝 값 $e^{0}=1$을 빼지 않았습니다.',
          '안쪽 적분의 아래끝 값 1을 빼지 않았고, 바깥 적분에서도 $e^{0}=1$을 빼지 않았습니다.',
          '부호가 반대입니다. 피적분함수가 $R$에서 0 이상이므로 적분값은 음수가 될 수 없습니다($2-e<0$).',
        ],
        hint: '$y$에 대하여 먼저 적분하면 $xe^{xy}$의 $y$에 대한 부정적분은 바로 $e^{xy}$입니다.',
        explain: '적분 순서를 잘 고르면 쉬워집니다. $y$에 대하여 먼저 적분하면($x$는 상수)\n\n$\\int_{0}^{1}xe^{xy}\\,dy=\\left[e^{xy}\\right]_{y=0}^{y=1}=e^{x}-1$\n\n$\\int_{0}^{1}(e^{x}-1)\\,dx=(e-1)-1=e-2$\n\n$x$에 대하여 먼저 적분하면 부분적분이 필요해 더 번거롭습니다. 푸비니 정리에 따라 값은 같습니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 3,
        q: '$f(x, y)=x^2+2y^2$의 점 $(1, 1)$에서 방향도함수가 0이 되는 단위벡터는 무엇입니까?',
        choices: [
          '$\\left(\\frac{2}{\\sqrt{5}}, -\\frac{1}{\\sqrt{5}}\\right)$',
          '$\\left(\\frac{1}{\\sqrt{5}}, \\frac{2}{\\sqrt{5}}\\right)$',
          '$\\left(\\frac{1}{\\sqrt{5}}, -\\frac{2}{\\sqrt{5}}\\right)$',
          '$\\left(\\frac{2}{\\sqrt{5}}, \\frac{1}{\\sqrt{5}}\\right)$',
        ],
        answer: 0,
        why: [
          '',
          '$\\nabla f=(2, 4)$와 같은 방향입니다. 이 방향의 방향도함수는 최댓값 $|\\nabla f|=2\\sqrt{5}$입니다.',
          '$\\nabla f\\cdot\\vec{u}=\\frac{2-8}{\\sqrt{5}} \\ne 0$입니다. 수직인 벡터는 성분을 바꾸고 한쪽 부호를 바꿉니다: $(4, -2)$ 방향',
          '$\\nabla f\\cdot\\vec{u}=\\frac{4+4}{\\sqrt{5}} \\ne 0$입니다.',
        ],
        hint: '방향도함수 $\\nabla f\\cdot\\vec{u}$가 0이려면 $\\vec{u}$가 $\\nabla f$에 수직이어야 합니다.',
        explain: '$\\nabla f=(2x, 4y)=(2, 4)$입니다. 이것과 수직인 방향은 $(4, -2)$ 또는 $(-4, 2)$ 방향, 곧 $(2, -1)$ 방향입니다. 크기 $\\sqrt{5}$로 나누면 $\\left(\\frac{2}{\\sqrt{5}}, -\\frac{1}{\\sqrt{5}}\\right)$입니다(반대 방향 $\\left(-\\frac{2}{\\sqrt{5}}, \\frac{1}{\\sqrt{5}}\\right)$도 됩니다). 이 방향은 점 $(1, 1)$을 지나는 등고선 $x^2+2y^2=3$의 접선 방향입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 1,
        q: '선형근사를 이용하여 $\\sqrt{3.02^2+3.97^2}$의 근삿값을 구하십시오. (점 $(3, 4)$에서 $f(x, y)=\\sqrt{x^2+y^2}$의 접평면을 이용하고, 소수 셋째 자리까지 쓰십시오.)',
        answer: '4.988',
        hint: '$f(3, 4)=5$, $f_x=\\frac{x}{\\sqrt{x^2+y^2}}$, $f_y=\\frac{y}{\\sqrt{x^2+y^2}}$입니다.',
        wrong: [
          { a: '5.036', why: '$\\Delta y=3.97-4=-0.03$의 부호를 놓쳐 0.024를 더했습니다. $y$는 줄었으므로 $\\frac{4}{5}\\cdot(-0.03)=-0.024$입니다.' },
          { a: '5', why: '$f(3, 4)$에서 멈추었습니다. 기울기와 변화량으로 보정한 값 $f_x\\Delta x+f_y\\Delta y$를 더합니다.' },
        ],
        explain: '$f(3, 4)=5$, $f_x(3, 4)=\\frac{3}{5}$, $f_y(3, 4)=\\frac{4}{5}$이고 $\\Delta x=0.02$, $\\Delta y=-0.03$입니다.\n\n$f(3.02, 3.97) \\approx 5+\\frac{3}{5}(0.02)+\\frac{4}{5}(-0.03)=5+0.012-0.024=4.988$\n\n(실제 값은 약 $4.98812$로 매우 가깝습니다.)',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 5,
        q: '직사각형 $R=[0, 2]\\times[0, 4]$에서 $f(x, y)=xy$의 평균값을 구하십시오. (평균값은 이중적분을 $R$의 넓이로 나눈 값입니다.)',
        answer: '2',
        hint: '일변수 함수의 평균값 $\\frac{1}{b-a}\\int_{a}^{b}f(x)\\,dx$와 같은 생각입니다.',
        wrong: [
          { a: '16', why: '이중적분까지만 구했습니다. $R$의 넓이 8로 나누어야 평균값입니다.' },
          { a: '4', why: '$x$, $y$ 각각의 평균 1과 2를 더한 것 같습니다. 이 함수에서는 평균값이 평균의 곱 $1\\cdot 2$와 같습니다. 이중적분을 넓이로 나누어 확인해 보십시오.' },
        ],
        explain: '$\\iint_{R}xy\\,dA=\\left(\\int_{0}^{2}x\\,dx\\right)\\left(\\int_{0}^{4}y\\,dy\\right)=2\\cdot 8=16$이고, $R$의 넓이는 $2\\cdot 4=8$이므로 평균값은 $\\frac{16}{8}=2$입니다.',
      },
    ],

    deeper: [
      {
        title: '판정식 $D$는 어디서 왔을까',
        body: '임계점 $(a, b)$ 근처에서 $f$를 이차식으로 어림하면(이변수 테일러 전개) 일차항이 사라지고\n\n$f(a+h, b+k) \\approx f(a, b)+\\frac{1}{2}(Ah^2+2Bhk+Ck^2)$, $A=f_{xx}$, $B=f_{xy}$, $C=f_{yy}$\n\n가 남습니다. 괄호 안을 완전제곱식으로 바꾸면 $A\\left(h+\\frac{B}{A}k\\right)^2+\\frac{AC-B^2}{A}k^2$이므로, $AC-B^2=D>0$이면 두 항의 부호가 $A$와 같아 극소 또는 극대이고, $D<0$이면 두 항의 부호가 달라 방향에 따라 증가·감소가 갈리는 안장점입니다.\n\n다음 과정인 **선형대수학**에서는 이 이차식을 행렬로 쓰고, 행렬의 고윳값의 부호로 같은 판정을 변수가 셋 이상인 함수까지 넓힙니다.',
      },
      {
        title: '이중적분으로 구하는 $\\int_{-\\infty}^{\\infty}e^{-x^2}\\,dx$',
        body: '$e^{-x^2}$의 부정적분은 익숙한 함수로 나타낼 수 없지만, 이중적분을 쓰면 넓은 범위의 적분값을 정확히 구할 수 있습니다.\n\n$I=\\int_{-\\infty}^{\\infty}e^{-x^2}\\,dx$라 하면 $I^2=\\iint e^{-(x^2+y^2)}\\,dA$ (평면 전체)입니다. 이것을 극좌표로 바꾸면 넓이 요소가 $r\\,dr\\,d\\theta$가 되어\n\n$I^2=\\int_{0}^{2\\pi}\\int_{0}^{\\infty}e^{-r^2}r\\,dr\\,d\\theta=2\\pi\\cdot\\frac{1}{2}=\\pi$\n\n이므로 $I=\\sqrt{\\pi}$입니다. 이 값은 확률과 통계의 정규분포에서 넓이가 1이 되도록 맞추는 상수에 그대로 쓰입니다. 직사각형이 아닌 영역과 극좌표 이중적분은 다변수 미적분학에서 본격적으로 배웁니다.',
      },
    ],

    faq: [
      {
        q: '편도함수가 둘 다 있으면 그 점에서 미분가능한 건가요?',
        a: '아닙니다. 예를 들어 $f(x, y)=\\frac{xy}{x^2+y^2}$ ($(0, 0)$에서는 0)은 원점에서 $f_x=f_y=0$이지만, 직선 $y=x$를 따라 원점에 다가가면 함숫값이 $\\frac{1}{2}$이므로 원점에서 연속도 아닙니다. 편도함수는 두 방향만 보기 때문입니다. 편도함수들이 그 점 근처에서 연속이면 미분가능합니다.',
      },
      {
        q: '$f_{xy}$와 $f_{yx}$는 항상 같아요?',
        a: '이계 편도함수들이 연속이면 같습니다(클레로 정리 또는 슈바르츠 정리). 이 단원에서 다루는 다항함수·지수함수·삼각함수의 조합은 모두 여기에 해당하므로 같다고 보아도 됩니다. 연속이 아닌 특별한 함수에서는 다를 수 있습니다.',
      },
      {
        q: '$D=0$이면 어떻게 해요?',
        a: '이계도함수 판정법으로는 결론을 내릴 수 없으므로 함수를 직접 살핍니다. 예를 들어 $x^4+y^4$과 $x^4-y^4$은 원점에서 모두 $D=0$이지만, 앞의 것은 원점에서 극소(값이 0보다 작아지지 않음)이고 뒤의 것은 $y$축을 따라 가면 음수가 되므로 안장점입니다.',
      },
      {
        q: '이중적분에서 적분 순서는 아무렇게나 바꿔도 돼요?',
        a: '직사각형 영역에서 연속함수라면 바꾸어도 값이 같습니다(푸비니 정리). 그래서 계산이 쉬운 순서를 고르면 됩니다. 예를 들어 $\\iint xe^{xy}\\,dA$는 $y$부터 적분하면 바로 풀리지만, $x$부터 적분하면 부분적분이 필요합니다.',
      },
    ],

    mistakes: [
      '편도함수를 구할 때 다른 변수만 있는 항(예: $f_x$에서 $2y$)을 상수로 보지 않고 남기는 실수 — 그 항은 미분하면 0입니다.',
      '방향도함수를 구할 때 주어진 벡터를 단위벡터로 바꾸지 않는 실수 — $\\vec{v}=(3, -4)$이면 $|\\vec{v}|=5$로 나눈 $\\left(\\frac{3}{5}, -\\frac{4}{5}\\right)$를 씁니다.',
      '극값 판정에서 $D$의 부호를 보지 않고 $f_{xx}$의 부호만으로 극소·극대를 정하는 실수 — $D<0$이면 $f_{xx}$와 상관없이 안장점입니다.',
    ],

    gens: [
      {
        id: 'partial-at-point',
        level: 1,
        title: '편도함수의 값',
        make: function (R) {
          var a, m, n, b, c, x0, y0, wrt, fxV, fyV, P = Math.pow;
          do {   // 답이 0 인 문제는 피한다
            a = R.nonzero(-3, 3); m = R.int(1, 3); n = R.int(1, 3); b = R.nonzero(-4, 4); c = R.nonzero(-5, 5);
            x0 = R.nonzero(-2, 2); y0 = R.nonzero(-2, 2); wrt = R.pick(['x', 'y']);
            fxV = a * m * P(x0, m - 1) * P(y0, n) + 2 * b * x0;
            fyV = a * n * P(x0, m) * P(y0, n - 1) + c;
          } while ((wrt === 'x' ? fxV : fyV) === 0);
          var fTex = lin(R, [[a, mono(m, n)], [b, 'x^{2}'], [c, 'y']]);
          var val, dTex, sub, wrong = [];
          if (wrt === 'x') {
            val = fxV;
            dTex = lin(R, [[a * m, mono(m - 1, n)], [2 * b, 'x']]);
            sub = prodTex([String(a * m), pw(R, x0, m - 1), pw(R, y0, n)]) + '+' + R.fmt.paren(2 * b) + '\\cdot ' + R.fmt.paren(x0);
            if (fyV !== val) wrong.push({ a: String(fyV), why: '$y$에 대한 편도함수 $f_y$의 값을 구했습니다. $f_x$는 $y$를 상수로 보고 $x$로 미분합니다.' });
            if (fxV + c !== val && fxV + c !== fyV) wrong.push({ a: String(fxV + c), why: '$' + R.fmt.term(c, 'y', true) + '$ 항을 $x$로 미분하면 0인데 $' + c + '$' + R.josa(c, '을/를') + ' 남겼습니다.' });
          } else {
            val = fyV;
            dTex = lin(R, [[a * n, mono(m, n - 1)], [c, '']]);
            sub = prodTex([String(a * n), pw(R, x0, m), pw(R, y0, n - 1)]) + '+' + R.fmt.paren(c);
            if (fxV !== val) wrong.push({ a: String(fxV), why: '$x$에 대한 편도함수 $f_x$의 값을 구했습니다. $f_y$는 $x$를 상수로 보고 $y$로 미분합니다.' });
            var keep = fyV + b * x0 * x0;
            if (keep !== val && keep !== fxV) wrong.push({ a: String(keep), why: '$' + R.fmt.term(b, 'x^{2}', true) + '$ 항은 $y$에 대해서는 상수이므로 $y$로 미분하면 0입니다.' });
          }
          return {
            type: 'short', check: 'number', concept: 1,
            q: '$f(x, y)=' + fTex + '$일 때 $f_' + wrt + '(' + x0 + ', ' + y0 + ')$의 값을 구하십시오.',
            answer: String(val),
            wrong: wrong,
            explain: (wrt === 'x' ? '$y$를 상수로 보고 $x$로 미분하면' : '$x$를 상수로 보고 $y$로 미분하면') + ' $f_' + wrt + '=' + dTex + '$입니다.\n\n$f_' + wrt + '(' + x0 + ', ' + y0 + ')=' + sub + '=' + val + '$',
          };
        },
      },
      {
        id: 'double-integral',
        level: 1,
        title: '직사각형 영역에서의 이중적분',
        make: function (R) {
          var cc = R.int(1, 6), m = R.int(1, 2), n = R.int(0, 2);
          var A = R.int(1, 3), B1 = R.int(0, 1), B2 = B1 + R.int(1, 2);
          var P = Math.pow;
          var Ix = R.F(P(A, m + 1), m + 1), Iy = R.F(P(B2, n + 1) - P(B1, n + 1), n + 1);
          var I = Ix.mul(Iy).mul(cc);
          var fTex = R.fmt.term(cc, mono(m, n), true);
          function xp(v, e) { return e === 0 ? '1' : e === 1 ? v : v + '^{' + e + '}'; }
          var wrong = [];
          var noDiv = R.F(cc * P(A, m + 1) * (P(B2, n + 1) - P(B1, n + 1)));
          if (!noDiv.eq(I)) wrong.push({ a: noDiv.toString(), why: '거듭제곱을 적분할 때 지수+1로 나누는 것을 빠뜨렸습니다. $\\int x^{k}\\,dx=\\frac{x^{k+1}}{k+1}$입니다.' });
          var onlyX = Ix.mul(cc);
          if (!onlyX.eq(I) && !onlyX.eq(noDiv)) wrong.push({ a: onlyX.toString(), why: '$x$에 대한 적분만 했습니다. $y$에 대한 적분 $\\int_{' + B1 + '}^{' + B2 + '}' + xp('y', n) + '\\,dy$도 곱해야 합니다.' });
          return {
            type: 'short', check: 'number', concept: 5,
            q: '$R=[0, ' + A + ']\\times[' + B1 + ', ' + B2 + ']$일 때 $\\iint_{R}' + fTex + '\\,dA$의 값을 구하십시오.',
            answer: I.toString(),
            wrong: wrong,
            hint: '피적분함수가 $x$의 식과 $y$의 식의 곱이면 두 정적분의 곱으로 구할 수 있습니다.',
            explain: '$\\int_{0}^{' + A + '}' + xp('x', m) + '\\,dx=' + R.fmt.frac(Ix) + '$, $\\int_{' + B1 + '}^{' + B2 + '}' + xp('y', n) + '\\,dy=' + R.fmt.frac(Iy) + '$이므로\n\n$\\iint_{R}' + fTex + '\\,dA=' + cc + '\\cdot ' + R.fmt.frac(Ix) + '\\cdot ' + R.fmt.frac(Iy) + '=' + R.fmt.frac(I) + '$',
          };
        },
      },
      {
        id: 'directional',
        level: 2,
        title: '방향도함수',
        make: function (R) {
          var a, b, c, x0, y0, fx, fy;
          do {
            a = R.nonzero(-3, 3); b = R.int(-3, 3); c = R.nonzero(-3, 3);
            x0 = R.int(-2, 2); y0 = R.int(-2, 2);
            fx = 2 * a * x0 + b * y0; fy = b * x0 + 2 * c * y0;
          } while (fx === 0 && fy === 0);
          var tri = R.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13]]);
          var p = tri[0] * R.sign(), q = tri[1] * R.sign(), h = tri[2];
          var D = R.F(fx * p + fy * q, h);
          var fTex = lin(R, [[a, 'x^{2}'], [b, 'xy'], [c, 'y^{2}']]);
          var gx = lin(R, [[2 * a, 'x'], [b, 'y']]), gy = lin(R, [[b, 'x'], [2 * c, 'y']]);
          var wrong = [];
          var raw = R.F(fx * p + fy * q);
          if (!raw.eq(D)) wrong.push({ a: raw.toString(), why: '$\\vec{v}$를 단위벡터로 바꾸지 않았습니다. $|\\vec{v}|=' + h + '$' + R.josa(h, '으로/로') + ' 나누어야 합니다.' });
          var sw = R.F(fx * q + fy * p, h);
          if (!sw.eq(D) && !sw.eq(raw)) wrong.push({ a: sw.toString(), why: '성분을 엇갈려 곱했습니다. $f_x$는 $\\vec{u}$의 첫째 성분과, $f_y$는 둘째 성분과 곱합니다.' });
          return {
            type: 'short', check: 'number', concept: 3,
            q: '$f(x, y)=' + fTex + '$의 점 $(' + x0 + ', ' + y0 + ')$에서 벡터 $\\vec{v}=(' + p + ', ' + q + ')$ 방향으로의 방향도함수를 구하십시오.',
            answer: D.toString(),
            wrong: wrong,
            hint: '$\\nabla f$를 구하고, $\\vec{v}$를 단위벡터로 바꾸어 내적합니다.',
            explain: '$\\nabla f=(' + gx + ', ' + gy + ')$이므로 점 $(' + x0 + ', ' + y0 + ')$에서 $\\nabla f=(' + fx + ', ' + fy + ')$입니다.\n\n' +
              '$|\\vec{v}|=\\sqrt{' + p * p + '+' + q * q + '}=' + h + '$이므로 $\\vec{u}=\\left(' + R.fmt.frac(R.F(p, h)) + ', ' + R.fmt.frac(R.F(q, h)) + '\\right)$입니다.\n\n' +
              '$D_{\\vec{u}}f=\\frac{' + fx + '\\cdot ' + R.fmt.paren(p) + '+' + R.fmt.paren(fy) + '\\cdot ' + R.fmt.paren(q) + '}{' + h + '}=' + R.fmt.frac(D) + '$',
          };
        },
      },
      {
        id: 'second-derivative-test',
        level: 2,
        title: '이계도함수 판정법',
        make: function (R) {
          // 극대·극소·안장점이 고르게 나오도록 종류를 먼저 고르고 계수를 맞춘다 (D=0 은 만들지 않는다)
          var kind = R.pick(['max', 'min', 'saddle']), p, q, r, s;
          if (kind !== 'saddle') {
            s = kind === 'min' ? 1 : -1;
            p = s * R.int(1, 3); r = s * R.int(1, 3);
            var qm = Math.floor(Math.sqrt(4 * p * r - 1));      // q² < 4pr
            q = R.int(-qm, qm);
          } else if (R.bool()) {
            p = R.nonzero(-3, 3); r = (p > 0 ? -1 : 1) * R.int(1, 3); q = R.int(-3, 3);
          } else {
            s = R.sign(); p = s * R.int(1, 2); r = s * R.int(1, 2);
            var qlo = Math.floor(Math.sqrt(4 * p * r)) + 1;     // q² > 4pr
            q = R.sign() * R.int(qlo, qlo + 1);
          }
          var Dv = 4 * p * r - q * q;
          var x0 = R.int(-2, 2), y0 = R.int(-2, 2), k = R.int(-4, 4);
          // f = p(x-x0)² + q(x-x0)(y-y0) + r(y-y0)² + k 를 펼친 꼴
          var Lx = -2 * p * x0 - q * y0, Ly = -q * x0 - 2 * r * y0;
          var C = p * x0 * x0 + q * x0 * y0 + r * y0 * y0 + k;
          var fTex = lin(R, [[p, 'x^{2}'], [q, 'xy'], [r, 'y^{2}'], [Lx, 'x'], [Ly, 'y'], [C, '']]);
          var ans = Dv < 0 ? 2 : p > 0 ? 1 : 0;
          var choices = ['극댓값을 가집니다.', '극솟값을 가집니다.', '안장점입니다(극값이 아닙니다).', '이 판정법으로는 알 수 없습니다.'];
          var why = [
            Dv < 0 ? '$D<0$이면 $f_{xx}$의 부호와 상관없이 안장점입니다.' : '$f_{xx}=' + 2 * p + '>0$이면 극대가 아니라 극소입니다.',
            Dv < 0 ? '$D<0$이면 $f_{xx}$의 부호와 상관없이 안장점입니다.' : '$f_{xx}=' + 2 * p + '<0$이면 극소가 아니라 극대입니다.',
            '$D=' + Dv + '>0$이므로 안장점이 아닙니다.',
            '$D=' + Dv + ' \\ne 0$이므로 이 판정법으로 결론을 낼 수 있습니다.',
          ];
          why[ans] = '';
          var concl = Dv < 0 ? '$D<0$이므로 안장점입니다.'
            : '$D>0$이고 $f_{xx}=' + 2 * p + (p > 0 ? '>0$이므로 극소이고, 극솟값은 ' : '<0$이므로 극대이고, 극댓값은 ') + '$f(' + x0 + ', ' + y0 + ')=' + k + '$입니다.';
          return {
            type: 'choice', concept: 4,
            q: '$f(x, y)=' + fTex + '$의 임계점 $(' + x0 + ', ' + y0 + ')$에서 $f$에 대한 설명으로 옳은 것은 무엇입니까? (이 점에서 $f_x=f_y=0$입니다.)',
            choices: choices,
            answer: ans,
            why: why,
            hint: '$f_{xx}$, $f_{yy}$, $f_{xy}$를 구해 $D=f_{xx}f_{yy}-(f_{xy})^2$의 부호를 봅니다.',
            explain: '$f_{xx}=' + 2 * p + '$, $f_{yy}=' + 2 * r + '$, $f_{xy}=' + q + '$이므로 $D=' + R.fmt.paren(2 * p) + '\\cdot ' + R.fmt.paren(2 * r) + '-' + R.fmt.paren(q) + '^2=' + Dv + '$입니다.\n\n' + concl,
          };
        },
      },
    ],
  });
})();
