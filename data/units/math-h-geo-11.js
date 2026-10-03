/* 기하 · 벡터를 이용한 직선의 방정식
 * 방향벡터·법선벡터로 좌표평면 위의 직선의 방정식, 좌표공간에서 한 점과 방향벡터로 정한 직선, 두 점을 지나는 직선,
 * 방향벡터로 판단하는 두 직선의 평행·수직과 이루는 각을 다룬다. (평면의 방정식은 다음 단원) */
(function () {
  function rootParts(n) {
    var k = 1, m = n;
    for (var f = 2; f * f <= m; f++) {
      while (m % (f * f) === 0) { m /= f * f; k *= f; }
    }
    return { k: k, m: m };
  }
  function rootTex(n) {
    if (n === 0) return '0';
    var r = rootParts(n);
    if (r.m === 1) return String(r.k);
    return (r.k === 1 ? '' : r.k) + '\\sqrt{' + r.m + '}';
  }
  function vt(v) { return '(' + v.join(', ') + ')'; }
  function dot(a, b) { return a.reduce(function (s, x, i) { return s + x * b[i]; }, 0); }
  function prodTex(a, b) {
    return a.map(function (x, i) { return (x < 0 ? '(' + x + ')' : x) + '\\times' + (b[i] < 0 ? '(' + b[i] + ')' : b[i]); }).join('+');
  }
  var VARS = ['x', 'y', 'z'];
  // (변수 − 좌표) 글자: x-1, y+2, z
  function shift(v, c) { return c === 0 ? v : v + (c > 0 ? '-' + c : '+' + (-c)); }
  // 대칭형 직선의 방정식 (방향벡터의 성분은 모두 0이 아니다)
  function lineTex(P, u) {
    return P.map(function (c, i) {
      var num = shift(VARS[i], c);
      return u[i] === 1 ? num : '\\dfrac{' + num + '}{' + u[i] + '}';
    }).join('=');
  }
  var COS = { 30: '\\dfrac{\\sqrt{3}}{2}', 45: '\\dfrac{\\sqrt{2}}{2}', 60: '\\dfrac{1}{2}', 90: '0', 120: '-\\dfrac{1}{2}', 135: '-\\dfrac{\\sqrt{2}}{2}', 150: '-\\dfrac{\\sqrt{3}}{2}' };
  function deg(x) { return '$' + x + '^\\circ$'; }

  // 좌표평면 그림 (직선·화살표·점)
  function plane(o) {
    var u = o.u || 30, pad = 20;
    var x0 = o.xmin, x1 = o.xmax, y0 = o.ymin, y1 = o.ymax;
    var W = (x1 - x0) * u + 2 * pad, H = (y1 - y0) * u + 2 * pad;
    function X(x) { return +(pad + (x - x0) * u).toFixed(1); }
    function Y(y) { return +(pad + (y1 - y) * u).toFixed(1); }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">';
    var i;
    for (i = x0; i <= x1; i++) s += '<line x1="' + X(i) + '" y1="' + Y(y0) + '" x2="' + X(i) + '" y2="' + Y(y1) + '" stroke="currentColor" stroke-opacity="0.15"/>';
    for (i = y0; i <= y1; i++) s += '<line x1="' + X(x0) + '" y1="' + Y(i) + '" x2="' + X(x1) + '" y2="' + Y(i) + '" stroke="currentColor" stroke-opacity="0.15"/>';
    if (y0 <= 0 && y1 >= 0) s += '<line x1="' + X(x0) + '" y1="' + Y(0) + '" x2="' + X(x1) + '" y2="' + Y(0) + '" stroke="currentColor" stroke-width="1.3"/><text x="' + (X(x1) - 4) + '" y="' + (Y(0) - 6) + '" font-size="13" fill="currentColor" text-anchor="end" font-style="italic">x</text>';
    if (x0 <= 0 && x1 >= 0) s += '<line x1="' + X(0) + '" y1="' + Y(y0) + '" x2="' + X(0) + '" y2="' + Y(y1) + '" stroke="currentColor" stroke-width="1.3"/><text x="' + (X(0) + 6) + '" y="' + (Y(y1) + 12) + '" font-size="13" fill="currentColor" font-style="italic">y</text>';
    (o.lines || []).forEach(function (l) {
      s += '<line x1="' + X(l.from[0]) + '" y1="' + Y(l.from[1]) + '" x2="' + X(l.to[0]) + '" y2="' + Y(l.to[1]) + '" stroke="currentColor" stroke-width="1.8"/>';
      if (l.label) s += '<text x="' + X(l.lx) + '" y="' + Y(l.ly) + '" font-size="14" fill="currentColor" font-style="italic">' + l.label + '</text>';
    });
    (o.vecs || []).forEach(function (v) {
      var c = v.color || 'var(--fig-1)';
      var ax = X(v.from[0]), ay = Y(v.from[1]), bx = X(v.to[0]), by = Y(v.to[1]);
      var ang = Math.atan2(by - ay, bx - ax), L = 10;
      var p1x = +(bx - L * Math.cos(ang - 0.4)).toFixed(1), p1y = +(by - L * Math.sin(ang - 0.4)).toFixed(1);
      var p2x = +(bx - L * Math.cos(ang + 0.4)).toFixed(1), p2y = +(by - L * Math.sin(ang + 0.4)).toFixed(1);
      s += '<line x1="' + ax + '" y1="' + ay + '" x2="' + bx + '" y2="' + by + '" stroke="' + c + '" stroke-width="2.4"/>';
      s += '<polygon points="' + bx + ',' + by + ' ' + p1x + ',' + p1y + ' ' + p2x + ',' + p2y + '" fill="' + c + '"/>';
      if (v.label) s += '<text x="' + X(v.lx) + '" y="' + Y(v.ly) + '" font-size="14" fill="' + c + '" text-anchor="middle" font-style="italic" font-weight="bold">' + v.label + '</text>';
    });
    (o.pts || []).forEach(function (p) {
      s += '<circle cx="' + X(p.x) + '" cy="' + Y(p.y) + '" r="3" fill="currentColor"/>';
      if (p.label) s += '<text x="' + (X(p.x) + (p.dx || 6)) + '" y="' + (Y(p.y) + (p.dy || -6)) + '" font-size="13" fill="currentColor">' + p.label + '</text>';
    });
    return s + '</svg>';
  }

  Tutor.registerUnit({
    id: 'math-h-geo-11',
    course: 'math-h-geo',
    title: '벡터를 이용한 직선의 방정식',
    summary: '방향벡터와 법선벡터를 이용해 좌표평면과 좌표공간에서 직선의 방정식을 구하고, 두 직선의 평행·수직과 이루는 각을 판단합니다.',
    goals: [
      '한 점과 방향벡터 또는 법선벡터가 주어질 때 좌표평면 위의 직선의 방정식을 구할 수 있다.',
      '좌표공간에서 한 점과 방향벡터로 정해지는 직선의 방정식을 구할 수 있다.',
      '두 점을 지나는 직선의 방정식을 평면과 공간에서 구할 수 있다.',
      '방향벡터를 이용하여 두 직선의 평행·수직을 판단하고 이루는 각을 구할 수 있다.',
    ],
    standards: ['[12기하03-04]'],

    concepts: [
      {
        title: '방향벡터로 정하는 좌표평면 위의 직선',
        body: '점 $\\mathrm{A}(x_1, y_1)$을 지나고 영벡터가 아닌 벡터 $\\vec{u}=(u_1, u_2)$에 평행한 직선 $l$을 생각합니다. 직선 위의 임의의 점 $\\mathrm{P}(x, y)$에 대하여 $\\overrightarrow{\\mathrm{AP}}\\parallel\\vec{u}$이므로 $\\overrightarrow{\\mathrm{AP}}=t\\vec{u}$인 실수 $t$가 있습니다. 위치벡터로 쓰면\n\n$\\vec{p}=\\vec{a}+t\\vec{u}$ ($t$는 실수)\n\n이고, 이것을 직선의 **벡터방정식**, $\\vec{u}$를 직선의 **방향벡터**라고 합니다. 성분으로 쓰면 $x=x_1+u_1t$, $y=y_1+u_2t$이고, $t$를 없애면\n\n$\\dfrac{x-x_1}{u_1}=\\dfrac{y-y_1}{u_2}$ ($u_1u_2\\ne0$)\n\n입니다. $u_1=0$이면 직선은 $x=x_1$, $u_2=0$이면 $y=y_1$입니다.\n\n예: 점 $(1, 2)$를 지나고 방향벡터가 $(3, -1)$인 직선은 $\\dfrac{x-1}{3}=\\dfrac{y-2}{-1}$, 정리하면 $x+3y-7=0$입니다.\n\n> ⚠️ 분자는 (변수) − (지나는 점의 좌표)입니다. $\\dfrac{x+2}{3}$이면 지나는 점의 $x$좌표는 $-2$입니다.',
        easy: '직선 위를 걸어가는 개미를 떠올려 보십시오. 출발점 $\\mathrm{A}$에서 "한 걸음 = 오른쪽으로 3, 아래로 1"을 $t$걸음 걸으면 도착점은 $\\mathrm{A}+t(3, -1)$입니다. $t$가 음수이면 뒤로 걷는 것이고, $t$를 모든 실수로 바꾸면 개미가 지나는 자리가 직선 전체가 됩니다.\n\n그래서 직선은 "출발점 하나 + 걷는 방향 하나"로 정해지고, 그 방향이 방향벡터입니다.',
        fig: {
          type: 'svg',
          svg: plane({ xmin: -3, xmax: 8, ymin: -1, ymax: 4, lines: [{ from: [-3, 10 / 3], to: [8, -1 / 3], label: 'l', lx: 7.2, ly: 0.4 }],
            vecs: [{ from: [1, 2], to: [4, 1], label: 'u', lx: 2.8, ly: 0.9 }],
            pts: [{ x: 1, y: 2, label: 'A(1, 2)', dx: -10, dy: -10 }, { x: -2, y: 3, label: 'P', dx: 4, dy: -8 }] }),
          alt: '점 A(1, 2)를 지나고 방향벡터 u=(3, -1)에 평행한 직선 l과 그 위의 점 P',
        },
        check: {
          type: 'choice',
          q: '점 $(2, -1)$을 지나고 방향벡터가 $(4, 3)$인 직선의 방정식은 무엇입니까?',
          choices: ['$\\dfrac{x-2}{4}=\\dfrac{y+1}{3}$', '$\\dfrac{x+2}{4}=\\dfrac{y-1}{3}$', '$\\dfrac{x-4}{2}=\\dfrac{y-3}{-1}$', '$\\dfrac{x-2}{3}=\\dfrac{y+1}{4}$'],
          answer: 0,
          why: [
            '',
            '분자의 부호를 반대로 썼습니다. 분자는 (변수) − (점의 좌표)이므로 $x-2$, $y-(-1)=y+1$입니다.',
            '점과 방향벡터의 자리를 바꾸었습니다. 분모에 방향벡터, 분자에 점의 좌표가 들어갑니다.',
            '방향벡터의 성분 순서를 바꾸었습니다. $x$ 아래에 $x$성분 4가 옵니다.',
          ],
          explain: '$\\dfrac{x-x_1}{u_1}=\\dfrac{y-y_1}{u_2}$에 $(x_1, y_1)=(2, -1)$, $(u_1, u_2)=(4, 3)$을 넣으면 $\\dfrac{x-2}{4}=\\dfrac{y+1}{3}$입니다.',
        },
      },
      {
        title: '법선벡터로 정하는 좌표평면 위의 직선',
        body: '점 $\\mathrm{A}(x_1, y_1)$을 지나고 영벡터가 아닌 벡터 $\\vec{n}=(a, b)$에 **수직인** 직선을 생각합니다. 직선 위의 임의의 점 $\\mathrm{P}$에 대하여 $\\overrightarrow{\\mathrm{AP}}\\perp\\vec{n}$이므로\n\n$(\\vec{p}-\\vec{a})\\cdot\\vec{n}=0$\n\n이고, 성분으로 쓰면\n\n$a(x-x_1)+b(y-y_1)=0$\n\n입니다. 이때 $\\vec{n}$을 직선의 **법선벡터**라고 합니다.\n\n거꾸로 직선 $ax+by+c=0$에서 **$x$, $y$의 계수를 차례로 쓴 벡터 $(a, b)$가 법선벡터**입니다. 방향벡터는 법선벡터에 수직이므로 $(b, -a)$를 쓸 수 있습니다.\n\n예: 점 $(2, 1)$을 지나고 법선벡터가 $(3, -4)$인 직선은 $3(x-2)-4(y-1)=0$, 곧 $3x-4y-2=0$입니다.\n\n| | 방향벡터 $\\vec{u}$ | 법선벡터 $\\vec{n}$ |\n|---|---|---|\n| 직선과의 관계 | 평행 | 수직 |\n| 쓰는 조건 | $\\overrightarrow{\\mathrm{AP}}=t\\vec{u}$ | $\\overrightarrow{\\mathrm{AP}}\\cdot\\vec{n}=0$ |',
        easy: '법선벡터는 직선에 "직각으로 꽂힌 깃대"입니다. 직선 위의 어느 두 점을 이어도 그 화살표는 깃대와 직각을 이루니까, 내적이 0이라는 식 하나로 직선이 정해집니다.\n\n그래서 $3x-4y-2=0$처럼 일반형으로 쓴 직선은 계수만 읽으면 깃대 방향 $(3, -4)$를 바로 알 수 있습니다.',
        fig: {
          type: 'svg',
          svg: plane({ xmin: -1, xmax: 5, ymin: -2, ymax: 6, lines: [{ from: [-0.5, 6], to: [3.5, -2], label: 'l', lx: 3.3, ly: -1.2 }],
            vecs: [{ from: [2, 1], to: [4, 2], label: 'n', lx: 3.6, ly: 2.4 }, { from: [2, 1], to: [1, 3], label: '', color: 'var(--fig-2)' }],
            pts: [{ x: 2, y: 1, label: 'A', dx: -16, dy: 4 }, { x: 1, y: 3, label: 'P', dx: 6, dy: -4 }] }),
          alt: '점 A를 지나는 직선 l과 A에서 직선에 수직으로 그린 법선벡터 n. 직선 위의 점 P에 대하여 벡터 AP는 n과 수직이다',
        },
        check: {
          type: 'ox',
          q: '직선 $2x-5y+1=0$의 방향벡터 중 하나는 $(2, -5)$입니다.',
          answer: false,
          explain: '$(2, -5)$는 계수를 차례로 쓴 벡터이므로 **법선벡터**입니다. 방향벡터는 이에 수직인 $(5, 2)$ 등입니다. (확인: $(2, -5)\\cdot(5, 2)=10-10=0$)',
        },
      },
      {
        title: '좌표공간에서 한 점과 방향벡터로 정한 직선',
        body: '좌표공간에서도 점 $\\mathrm{A}(x_1, y_1, z_1)$을 지나고 방향벡터가 $\\vec{u}=(u_1, u_2, u_3)$인 직선의 벡터방정식은 $\\vec{p}=\\vec{a}+t\\vec{u}$입니다. 성분으로 쓰면\n\n$x=x_1+u_1t$, $y=y_1+u_2t$, $z=z_1+u_3t$\n\n이고, $t$를 없애면\n\n$\\dfrac{x-x_1}{u_1}=\\dfrac{y-y_1}{u_2}=\\dfrac{z-z_1}{u_3}$ ($u_1u_2u_3\\ne0$)\n\n입니다. 성분 중 0이 있으면 그 좌표는 일정합니다. 예를 들어 $u_1=0$이면 $x=x_1$, $\\dfrac{y-y_1}{u_2}=\\dfrac{z-z_1}{u_3}$입니다.\n\n방정식에서 거꾸로 읽을 수도 있습니다. $\\dfrac{x-1}{2}=\\dfrac{y+3}{-1}=\\dfrac{z}{4}$는 점 $(1, -3, 0)$을 지나고 방향벡터가 $(2, -1, 4)$인 직선입니다.\n\n> 💡 공간에서는 한 벡터에 수직인 직선이 무수히 많아서, 법선벡터 하나로는 직선이 정해지지 않습니다. (법선벡터 하나로 정해지는 것은 다음 단원의 **평면**입니다.)',
        easy: '평면에서 쓰던 "출발점 + 방향"이 그대로입니다. 다만 방향을 말할 때 앞뒤·좌우에 위아래가 더해져 성분이 세 개가 되었을 뿐입니다.\n\n분수가 세 개 이어진 식이 낯설면 $t$를 다시 살려 보십시오. 세 분수가 모두 $t$와 같다는 뜻이라서 $x=1+2t$, $y=-3-t$, $z=4t$로 읽힙니다.',
        check: {
          type: 'choice',
          q: '직선 $\\dfrac{x-3}{2}=\\dfrac{y+1}{5}=\\dfrac{z-4}{-3}$의 방향벡터로 알맞은 것은 무엇입니까?',
          choices: ['$(2, 5, -3)$', '$(3, -1, 4)$', '$(2, 5, 3)$'],
          answer: 0,
          why: ['', '직선이 지나는 점의 좌표입니다. 방향벡터는 분모를 차례로 쓴 것입니다.', '$z$의 분모 $-3$의 부호를 놓쳤습니다.'],
          explain: '분모를 차례로 읽으면 방향벡터 $(2, 5, -3)$입니다. 분자에서는 지나는 점 $(3, -1, 4)$를 읽습니다.',
        },
      },
      {
        title: '두 점을 지나는 직선',
        body: '두 점 $\\mathrm{A}$, $\\mathrm{B}$를 지나는 직선은 $\\overrightarrow{\\mathrm{AB}}=\\vec{b}-\\vec{a}$를 방향벡터로 하고 점 $\\mathrm{A}$를 지나는 직선입니다.\n\n$\\vec{p}=\\vec{a}+t(\\vec{b}-\\vec{a})=(1-t)\\vec{a}+t\\vec{b}$\n\n- 평면: $\\mathrm{A}(x_1, y_1)$, $\\mathrm{B}(x_2, y_2)$이면 $\\dfrac{x-x_1}{x_2-x_1}=\\dfrac{y-y_1}{y_2-y_1}$\n- 공간: $\\mathrm{A}(x_1, y_1, z_1)$, $\\mathrm{B}(x_2, y_2, z_2)$이면 $\\dfrac{x-x_1}{x_2-x_1}=\\dfrac{y-y_1}{y_2-y_1}=\\dfrac{z-z_1}{z_2-z_1}$\n\n(분모가 0인 좌표는 일정한 값으로 따로 씁니다.)\n\n$t=0$이면 점 $\\mathrm{A}$, $t=1$이면 점 $\\mathrm{B}$이고, $0\\le t\\le1$이면 선분 $\\mathrm{AB}$ 위의 점, $t=\\dfrac{1}{2}$이면 중점입니다. 앞에서 배운 내분점의 위치벡터와 같은 식입니다.\n\n예: $\\mathrm{A}(1, 2, 3)$, $\\mathrm{B}(3, -1, 4)$를 지나는 직선은 $\\overrightarrow{\\mathrm{AB}}=(2, -3, 1)$이므로 $\\dfrac{x-1}{2}=\\dfrac{y-2}{-3}=z-3$입니다.',
        easy: '두 점이 있으면 "한 점에서 다른 점으로 가는 화살표"가 곧 걷는 방향입니다. 그러니 두 점 문제는 ① 방향벡터 $\\overrightarrow{\\mathrm{AB}}$ 구하기 ② 한 점과 방향벡터로 직선 쓰기, 두 단계면 끝납니다.\n\n직선이 좌표평면과 만나는 점을 구할 때는 $t$를 살린 꼴 $(x_1+u_1t, \\dots)$로 쓰고, 해당 좌표가 0이 되는 $t$를 찾으면 됩니다.',
        check: {
          type: 'short', check: 'number',
          q: '두 점 $\\mathrm{A}(1, 0, 2)$, $\\mathrm{B}(3, 4, -2)$를 지나는 직선 위에 점 $(5, 8, k)$가 있을 때, $k$의 값을 구하십시오.',
          answer: '-6',
          wrong: [
            { a: '10', why: '$z$성분의 부호를 놓쳤습니다. $\\overrightarrow{\\mathrm{AB}}$의 $z$성분은 $-2-2=-4$입니다.' },
            { a: '-2', why: '점 $\\mathrm{B}$의 $z$좌표입니다. $x$좌표가 5가 되는 $t$를 먼저 구합니다.' },
          ],
          explain: '$\\overrightarrow{\\mathrm{AB}}=(2, 4, -4)$이므로 직선 위의 점은 $(1+2t, 4t, 2-4t)$입니다. $1+2t=5$에서 $t=2$이고, 이때 $y=8$로 맞으며 $k=2-8=-6$입니다.',
        },
      },
      {
        title: '두 직선의 평행·수직과 이루는 각',
        body: '두 직선의 방향벡터를 각각 $\\vec{u}$, $\\vec{v}$라 하면\n\n- **평행**: $\\vec{u}\\parallel\\vec{v}$, 곧 $\\vec{v}=k\\vec{u}$ ($k\\ne0$) — 방향벡터의 성분의 비가 같습니다. (한 점을 함께 지나면 두 직선은 일치합니다.)\n- **수직**: $\\vec{u}\\perp\\vec{v}$, 곧 $\\vec{u}\\cdot\\vec{v}=0$\n- **이루는 각** $\\theta$ ($0\\le\\theta\\le\\dfrac{\\pi}{2}$): $\\cos\\theta=\\dfrac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}||\\vec{v}|}$\n\n직선에는 화살표 방향이 없어서 $\\vec{u}$ 대신 $-\\vec{u}$를 방향벡터로 써도 같은 직선입니다. 그래서 두 직선이 이루는 각은 두 방향벡터가 이루는 각 $\\alpha$와 $\\pi-\\alpha$ 중 **크지 않은 쪽**으로 정하고, 이를 위해 내적에 **절댓값**을 씌웁니다.\n\n좌표평면의 직선은 법선벡터로 판단해도 됩니다. 두 법선벡터가 이루는 각은 두 직선이 이루는 각과 같거나 서로 보각입니다.\n\n예: 방향벡터가 $(2, 1, -1)$, $(-1, -2, -1)$인 두 직선은 $\\dfrac{|-2-2+1|}{\\sqrt{6}\\sqrt{6}}=\\dfrac{1}{2}$이므로 이루는 각이 $60^\\circ$입니다. (두 벡터가 이루는 각은 $120^\\circ$입니다.)',
        easy: '두 직선이 만나면 각이 두 종류(예를 들어 $60^\\circ$와 $120^\\circ$) 생깁니다. 두 직선이 이루는 각이라고 하면 그중 작은 쪽, 곧 $90^\\circ$ 이하인 각을 말합니다.\n\n그래서 $\\cos$ 값이 음수로 나오면 절댓값을 씌워 양수로 바꾸고 각을 읽습니다.',
        check: {
          type: 'choice',
          q: '좌표평면 위의 두 직선 $\\dfrac{x-1}{1}=\\dfrac{y+2}{3}$, $\\dfrac{x+4}{3}=\\dfrac{y-1}{-1}$의 위치 관계로 알맞은 것은 무엇입니까?',
          choices: ['서로 수직이다', '서로 평행하다', '평행하지도 수직이지도 않다'],
          answer: 0,
          why: ['', '방향벡터 $(1, 3)$과 $(3, -1)$은 성분의 비가 같지 않으므로 평행하지 않습니다.', '방향벡터의 내적을 계산해 보십시오. $3-3=0$입니다.'],
          explain: '방향벡터는 $(1, 3)$, $(3, -1)$이고 내적이 $1\\times3+3\\times(-1)=0$이므로 두 직선은 서로 수직입니다.',
        },
      },
    ],

    examples: [
      {
        q: '두 점 $\\mathrm{A}(2, -1, 3)$, $\\mathrm{B}(4, 1, -1)$을 지나는 직선의 방정식을 구하고, 이 직선이 $xy$평면과 만나는 점의 좌표를 구하십시오.',
        steps: [
          '방향벡터는 $\\overrightarrow{\\mathrm{AB}}=(2, 2, -4)$입니다. 실수배도 방향벡터이므로 간단히 $(1, 1, -2)$를 씁니다.',
          '점 $\\mathrm{A}$를 지나므로 $\\dfrac{x-2}{1}=\\dfrac{y+1}{1}=\\dfrac{z-3}{-2}$, 곧 $x-2=y+1=\\dfrac{z-3}{-2}$입니다.',
          '세 식을 $t$로 놓으면 직선 위의 점은 $(2+t, -1+t, 3-2t)$입니다.',
          '$xy$평면 위의 점은 $z=0$이므로 $3-2t=0$, $t=\\dfrac{3}{2}$입니다. 이때 $x=\\dfrac{7}{2}$, $y=\\dfrac{1}{2}$입니다.',
        ],
        answer: '$x-2=y+1=\\dfrac{z-3}{-2}$, 만나는 점 $\\left(\\dfrac{7}{2}, \\dfrac{1}{2}, 0\\right)$',
      },
      {
        q: '점 $(1, -2)$를 지나고 직선 $3x+y-5=0$에 수직인 직선의 방정식을 구하십시오.',
        steps: [
          '직선 $3x+y-5=0$의 법선벡터는 $(3, 1)$입니다.',
          '이 직선에 수직인 직선은 $(3, 1)$에 평행하므로, $(3, 1)$이 구하는 직선의 방향벡터입니다.',
          '$\\dfrac{x-1}{3}=\\dfrac{y+2}{1}$이고, 정리하면 $x-1=3(y+2)$, 곧 $x-3y-7=0$입니다.',
          '확인: $(1, -2)$를 넣으면 $1+6-7=0$이고, 두 법선벡터 $(3, 1)$, $(1, -3)$의 내적은 $3-3=0$입니다.',
        ],
        answer: '$x-3y-7=0$',
      },
    ],

    terms: [
      { term: '방향벡터', def: '직선에 평행한 영벡터가 아닌 벡터입니다. 한 직선의 방향벡터는 서로 실수배 관계이므로 하나로 정해지지는 않습니다.' },
      { term: '법선벡터', def: '직선(또는 평면)에 수직인 영벡터가 아닌 벡터입니다. 좌표평면의 직선 $ax+by+c=0$의 법선벡터는 $(a, b)$입니다.' },
      { term: '직선의 벡터방정식', def: '점 $\\mathrm{A}$를 지나고 방향벡터가 $\\vec{u}$인 직선을 $\\vec{p}=\\vec{a}+t\\vec{u}$ ($t$는 실수)로 나타낸 식입니다.' },
      { term: '매개변수', def: '직선 위의 점을 $x=x_1+u_1t$, $y=y_1+u_2t$처럼 나타낼 때의 $t$입니다. $t$의 값 하나에 직선 위의 점 하나가 대응합니다.' },
      { term: '두 직선이 이루는 각', def: '두 직선의 방향벡터 $\\vec{u}$, $\\vec{v}$에 대하여 $\\cos\\theta=\\dfrac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}||\\vec{v}|}$로 정해지는 각 $\\theta$ ($0\\le\\theta\\le\\dfrac{\\pi}{2}$)입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '점 $(3, 1)$을 지나고 방향벡터가 $(2, 5)$인 직선의 방정식은 무엇입니까?',
        choices: ['$\\dfrac{x-3}{2}=\\dfrac{y-1}{5}$', '$\\dfrac{x-2}{3}=\\dfrac{y-5}{1}$', '$\\dfrac{x+3}{2}=\\dfrac{y+1}{5}$', '$\\dfrac{x-3}{5}=\\dfrac{y-1}{2}$'],
        answer: 0,
        why: [
          '',
          '점과 방향벡터의 자리를 바꾸었습니다. 분모에 방향벡터가 옵니다.',
          '분자의 부호를 반대로 썼습니다. (변수) − (점의 좌표)입니다.',
          '방향벡터의 성분 순서를 바꾸었습니다.',
        ],
        explain: '$\\dfrac{x-x_1}{u_1}=\\dfrac{y-y_1}{u_2}$에 넣으면 $\\dfrac{x-3}{2}=\\dfrac{y-1}{5}$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 1,
        q: '점 $(1, 4)$를 지나고 벡터 $\\vec{n}=(2, -3)$에 수직인 직선의 방정식을 $2x-3y+c=0$ 꼴로 나타낼 때, 상수 $c$의 값을 구하십시오.',
        answer: '10',
        wrong: [{ a: '-10', why: '$c$의 부호를 반대로 구했습니다. $2(x-1)-3(y-4)=2x-3y+10$입니다.' }],
        explain: '$2(x-1)-3(y-4)=0$을 전개하면 $2x-2-3y+12=0$, 곧 $2x-3y+10=0$이므로 $c=10$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '직선 $3x-2y+6=0$의 방향벡터로 알맞은 것은 무엇입니까?',
        choices: ['$(2, 3)$', '$(3, -2)$', '$(-2, 3)$', '$(3, 2)$'],
        answer: 0,
        why: [
          '',
          '계수를 차례로 쓴 $(3, -2)$는 법선벡터입니다. 방향벡터는 이에 수직입니다.',
          '$(3, -2)\\cdot(-2, 3)=-12\\ne0$이므로 법선벡터에 수직이 아닙니다.',
          '$(3, -2)\\cdot(3, 2)=5\\ne0$이므로 법선벡터에 수직이 아닙니다.',
        ],
        explain: '법선벡터는 $(3, -2)$이고, 방향벡터는 이에 수직이어야 합니다. $(3, -2)\\cdot(2, 3)=6-6=0$이므로 $(2, 3)$이 방향벡터입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 2,
        q: '점 $(1, -2, 3)$을 지나고 방향벡터가 $(2, 1, -4)$인 직선의 방정식은 무엇입니까?',
        choices: [
          '$\\dfrac{x-1}{2}=y+2=\\dfrac{z-3}{-4}$',
          '$\\dfrac{x+1}{2}=y-2=\\dfrac{z+3}{-4}$',
          '$x-2=\\dfrac{y-1}{-2}=\\dfrac{z+4}{3}$',
          '$\\dfrac{x-1}{2}=y+2=\\dfrac{z-3}{4}$',
        ],
        answer: 0,
        why: [
          '',
          '분자의 부호를 반대로 썼습니다. (변수) − (점의 좌표)입니다.',
          '점과 방향벡터의 자리를 바꾸었습니다.',
          '$z$의 분모 $-4$의 부호를 놓쳤습니다.',
        ],
        explain: '$\\dfrac{x-1}{2}=\\dfrac{y+2}{1}=\\dfrac{z-3}{-4}$이고, 분모가 1인 것은 생략하여 $y+2$로 씁니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 2,
        q: '직선 $\\dfrac{x-2}{3}=\\dfrac{y+1}{2}=\\dfrac{z-4}{-1}$ 위의 점 중 $x$좌표가 8인 점의 $z$좌표를 구하십시오.',
        answer: '2',
        wrong: [{ a: '6', why: '$z$의 분모 $-1$의 부호를 놓쳤습니다. $z=4-t$입니다.' }],
        explain: '세 식을 $t$로 놓으면 $x=2+3t$, $z=4-t$입니다. $2+3t=8$에서 $t=2$이므로 $z=4-2=2$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'ox', concept: 2,
        q: '직선 $x-1=\\dfrac{y+2}{3}=\\dfrac{z}{2}$는 점 $(1, -2, 0)$을 지나고 방향벡터가 $(1, 3, 2)$입니다.',
        answer: true,
        explain: '$x-1=\\dfrac{x-1}{1}$이고 $\\dfrac{z}{2}=\\dfrac{z-0}{2}$이므로, 지나는 점은 $(1, -2, 0)$, 방향벡터는 분모를 읽은 $(1, 3, 2)$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '두 점 $\\mathrm{A}(1, 2)$, $\\mathrm{B}(4, -1)$을 지나는 직선의 방정식은 무엇입니까?',
        choices: ['$\\dfrac{x-1}{3}=\\dfrac{y-2}{-3}$', '$\\dfrac{x-1}{5}=\\dfrac{y-2}{1}$', '$\\dfrac{x-4}{1}=\\dfrac{y+1}{2}$', '$\\dfrac{x-1}{3}=\\dfrac{y-2}{3}$'],
        answer: 0,
        why: [
          '',
          '두 점의 좌표를 더해 방향벡터로 썼습니다. 방향벡터는 $\\overrightarrow{\\mathrm{AB}}=\\vec{b}-\\vec{a}$입니다.',
          '점 $\\mathrm{A}$의 좌표를 방향벡터로 썼습니다. 방향벡터는 $\\overrightarrow{\\mathrm{AB}}$입니다.',
          '$y$성분의 부호를 놓쳤습니다. $-1-2=-3$입니다.',
        ],
        explain: '$\\overrightarrow{\\mathrm{AB}}=(3, -3)$이므로 $\\dfrac{x-1}{3}=\\dfrac{y-2}{-3}$입니다. (정리하면 $x+y-3=0$)',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 3,
        q: '두 점 $\\mathrm{A}(1, -1, 2)$, $\\mathrm{B}(3, 1, -2)$를 지나는 직선이 $xy$평면과 만나는 점의 $x$좌표를 구하십시오.',
        answer: '2',
        hint: '직선 위의 점을 $t$로 나타내고, $z$좌표가 0이 되는 $t$를 찾습니다.',
        wrong: [
          { a: '1/2', why: '$t$의 값입니다. 이 $t$를 $x$좌표의 식에 넣어야 합니다.' },
          { a: '3', why: '점 $\\mathrm{B}$의 $x$좌표입니다. 점 $\\mathrm{B}$의 $z$좌표는 0이 아닙니다.' },
        ],
        explain: '$\\overrightarrow{\\mathrm{AB}}=(2, 2, -4)$이므로 직선 위의 점은 $(1+2t, -1+2t, 2-4t)$입니다. $2-4t=0$에서 $t=\\dfrac{1}{2}$이고, $x=1+1=2$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
        q: '두 직선 $\\dfrac{x-1}{2}=\\dfrac{y+3}{k}=\\dfrac{z-2}{3}$, $\\dfrac{x+1}{-1}=\\dfrac{y}{4}=\\dfrac{z+5}{2}$가 서로 수직일 때, 상수 $k$의 값을 구하십시오.',
        answer: '-1',
        hint: '두 방향벡터의 내적이 0입니다.',
        wrong: [{ a: '1', why: '이항할 때 부호를 놓쳤습니다. $-2+4k+6=0$에서 $4k=-4$입니다.' }],
        explain: '방향벡터 $(2, k, 3)$과 $(-1, 4, 2)$의 내적이 0이어야 하므로 $-2+4k+6=0$, $k=-1$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', unit: '°', concept: 4,
        q: '좌표평면 위의 두 직선 $\\dfrac{x-1}{3}=y-2$, $\\dfrac{x+1}{-1}=\\dfrac{y-4}{-2}$가 이루는 각의 크기는 몇 도인지 구하십시오.',
        answer: '45',
        hint: '방향벡터를 읽고, 내적에 절댓값을 씌워 $\\cos\\theta$를 구합니다.',
        wrong: [{ a: '135', why: '두 방향벡터가 이루는 각을 답했습니다. 두 직선이 이루는 각은 $90^\\circ$ 이하이므로 내적에 절댓값을 씌웁니다.' }],
        explain: '방향벡터는 $(3, 1)$, $(-1, -2)$이고 내적은 $-3-2=-5$입니다. $\\cos\\theta=\\dfrac{|-5|}{\\sqrt{10}\\sqrt{5}}=\\dfrac{5}{5\\sqrt{2}}=\\dfrac{\\sqrt{2}}{2}$이므로 $\\theta=45^\\circ$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 1,
        q: '점 $(1, 1)$을 지나고 직선 $2x-y+3=0$에 평행한 직선의 방정식은 무엇입니까?',
        choices: ['$2x-y-1=0$', '$x+2y-3=0$', '$2x-y+3=0$', '$2x+y-3=0$'],
        answer: 0,
        why: [
          '',
          '점 $(1, 1)$을 지나지만 주어진 직선에 수직인 직선입니다. 법선벡터가 $(1, 2)$입니다.',
          '주어진 직선 자신입니다. 점 $(1, 1)$을 넣으면 $2-1+3=4\\ne0$입니다.',
          '점 $(1, 1)$은 지나지만 법선벡터 $(2, 1)$이 $(2, -1)$과 평행하지 않습니다.',
        ],
        hint: '평행한 두 직선은 법선벡터가 같습니다.',
        explain: '평행하므로 법선벡터 $(2, -1)$을 그대로 씁니다. $2(x-1)-(y-1)=0$, 곧 $2x-y-1=0$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 4,
        q: '좌표공간의 두 직선 $\\dfrac{x-1}{2}=\\dfrac{y+1}{-1}=\\dfrac{z}{3}$, $\\dfrac{x-3}{-4}=\\dfrac{y-2}{2}=\\dfrac{z+1}{-6}$의 위치 관계로 알맞은 것은 무엇입니까?',
        choices: ['서로 평행하다', '서로 수직이다', '두 직선이 일치한다', '평행하지도 수직이지도 않다'],
        answer: 0,
        why: [
          '',
          '방향벡터의 내적은 $-8-2-18=-28\\ne0$이므로 수직이 아닙니다.',
          '점 $(3, 2, -1)$을 첫째 직선의 식에 넣으면 $\\dfrac{3-1}{2}=1$, $\\dfrac{2+1}{-1}=-3$으로 같지 않으므로 이 점은 첫째 직선 위에 없습니다.',
          '$(-4, 2, -6)=-2(2, -1, 3)$이므로 두 방향벡터는 평행합니다.',
        ],
        hint: '방향벡터의 성분의 비를 먼저 보고, 평행하면 한 직선 위의 점이 다른 직선 위에 있는지 확인합니다.',
        explain: '방향벡터 $(2, -1, 3)$과 $(-4, 2, -6)$은 $(-4, 2, -6)=-2(2, -1, 3)$이므로 평행합니다. 둘째 직선 위의 점 $(3, 2, -1)$은 첫째 직선 위에 있지 않으므로 두 직선은 일치하지 않고 서로 평행합니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'expr', concept: 2,
        q: '원점 $\\mathrm{O}$와 직선 $x-5=\\dfrac{y}{2}=\\dfrac{z-2}{2}$ 위의 점 $\\mathrm{P}$ 사이의 거리의 최솟값을 구하십시오. (근호는 √ 또는 sqrt로 입력합니다.)',
        answer: '2√5',
        hint: '거리가 가장 짧을 때 $\\overrightarrow{\\mathrm{OP}}$는 직선의 방향벡터와 수직입니다.',
        wrong: [
          { a: '√29', why: '직선이 지나는 점 $(5, 0, 2)$까지의 거리입니다. 그 점이 가장 가까운 점이라는 보장이 없습니다.' },
          { a: '20', why: '거리의 제곱을 구했습니다. 제곱근을 구해야 합니다.' },
        ],
        explain: '직선 위의 점은 $\\mathrm{P}(5+t, 2t, 2+2t)$이고 방향벡터는 $\\vec{u}=(1, 2, 2)$입니다. $\\overrightarrow{\\mathrm{OP}}\\cdot\\vec{u}=(5+t)+4t+2(2+2t)=9+9t=0$에서 $t=-1$, $\\mathrm{P}(4, -2, 0)$입니다. 따라서 최솟값은 $\\sqrt{16+4+0}=2\\sqrt{5}$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 2,
        q: '두 직선 $x-1=\\dfrac{y-2}{-1}=\\dfrac{z-3}{2}$, $x=y+1=\\dfrac{z-1}{2}$이 만나는 점을 $(a, b, c)$라 할 때, $a+b+c$의 값을 구하십시오.',
        answer: '8',
        hint: '두 직선 위의 점을 서로 다른 매개변수 $s$, $t$로 나타내고 좌표가 같다고 놓습니다.',
        wrong: [{ a: '6', why: '첫째 직선이 지나는 점 $(1, 2, 3)$의 좌표의 합입니다. 이 점은 둘째 직선 위에 없습니다.' }],
        explain: '첫째 직선 위의 점은 $(1+s, 2-s, 3+2s)$, 둘째 직선 위의 점은 $(t, t-1, 1+2t)$입니다. $1+s=t$, $2-s=t-1$에서 $2-s=s$이므로 $s=1$, $t=2$입니다. $z$좌표도 $3+2=1+4=5$로 같으므로 만나는 점은 $(2, 1, 5)$이고 $a+b+c=8$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 1,
        q: '점 $(1, 1)$을 지나고 직선 $\\dfrac{x-2}{3}=\\dfrac{y+1}{4}$에 수직인 직선의 방정식은 무엇입니까?',
        choices: ['$3x+4y-7=0$', '$4x-3y-1=0$', '$3x+4y-2=0$', '$3x-4y+1=0$'],
        answer: 0,
        why: [
          '',
          '주어진 직선에 평행한 직선입니다. 법선벡터 $(4, -3)$이 방향벡터 $(3, 4)$에 수직입니다.',
          '점 $(2, -1)$을 지나는 직선입니다. 문제의 점은 $(1, 1)$입니다.',
          '점 $(1, 1)$은 지나지만 법선벡터 $(3, -4)$가 $(3, 4)$와 평행하지 않습니다.',
        ],
        hint: '주어진 직선의 방향벡터가 구하는 직선의 법선벡터가 됩니다.',
        explain: '주어진 직선의 방향벡터 $(3, 4)$에 수직인 직선은 $(3, 4)$를 법선벡터로 가집니다. $3(x-1)+4(y-1)=0$, 곧 $3x+4y-7=0$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 3,
        q: '직선 $\\dfrac{x-2}{2}=y-1=\\dfrac{z-4}{-2}$가 $xy$평면과 만나는 점을 $\\mathrm{P}$, $yz$평면과 만나는 점을 $\\mathrm{Q}$라 할 때, 선분 $\\mathrm{PQ}$의 길이를 구하십시오.',
        answer: '9',
        hint: '직선 위의 점을 $(2+2t, 1+t, 4-2t)$로 놓습니다. $xy$평면은 $z=0$, $yz$평면은 $x=0$입니다.',
        wrong: [{ a: '81', why: '거리의 제곱을 구했습니다. 제곱근을 구해야 합니다.' }],
        explain: '$z=0$에서 $t=2$이므로 $\\mathrm{P}(6, 3, 0)$, $x=0$에서 $t=-1$이므로 $\\mathrm{Q}(0, 0, 6)$입니다. $\\overline{\\mathrm{PQ}}=\\sqrt{36+9+36}=\\sqrt{81}=9$입니다.',
      },
    ],

    deeper: [
      {
        title: '점과 직선 사이의 거리 — 법선벡터로 다시 보기',
        body: '좌표평면에서 점 $\\mathrm{P}(x_1, y_1)$과 직선 $ax+by+c=0$ 사이의 거리 $d=\\dfrac{|ax_1+by_1+c|}{\\sqrt{a^2+b^2}}$를 배웠습니다. 이 공식은 법선벡터로 쉽게 설명됩니다.\n\n직선 위의 한 점을 $\\mathrm{A}$라 하면, 거리는 $\\overrightarrow{\\mathrm{AP}}$를 법선벡터 $\\vec{n}=(a, b)$ 방향으로 정사영한 길이입니다.\n\n$d=\\dfrac{|\\overrightarrow{\\mathrm{AP}}\\cdot\\vec{n}|}{|\\vec{n}|}$\n\n$\\mathrm{A}(x_0, y_0)$가 직선 위에 있으면 $ax_0+by_0=-c$이므로 $\\overrightarrow{\\mathrm{AP}}\\cdot\\vec{n}=a(x_1-x_0)+b(y_1-y_0)=ax_1+by_1+c$가 되어 공식이 나옵니다.\n\n좌표공간에서는 법선벡터 하나로 직선이 아니라 **평면**이 정해집니다. 다음 단원에서 같은 생각으로 평면의 방정식과 점과 평면 사이의 관계를 다룹니다.',
      },
    ],

    faq: [
      {
        q: '방향벡터는 하나로 정해지나요?',
        a: '아닙니다. 방향벡터에 0이 아닌 실수를 곱해도 같은 직선의 방향벡터입니다. 예를 들어 $(2, 2, -4)$ 대신 $(1, 1, -2)$나 $(-1, -1, 2)$를 써도 같은 직선이 나옵니다. 그래서 방정식의 모양은 달라도 같은 직선일 수 있습니다.',
      },
      {
        q: '방향벡터의 성분이 0이면 분모에 0을 써요?',
        a: '분모에 0을 쓸 수는 없습니다. 성분이 0인 좌표는 변하지 않으므로 따로 씁니다. 점 $(1, 2, 3)$을 지나고 방향벡터가 $(2, 0, 5)$인 직선은 $\\dfrac{x-1}{2}=\\dfrac{z-3}{5}$, $y=2$입니다.',
      },
      {
        q: '두 직선이 이루는 각에서 왜 내적에 절댓값을 붙여요?',
        a: '직선에는 정해진 방향이 없어서 방향벡터를 반대로 잡아도 같은 직선입니다. 그러면 두 방향벡터가 이루는 각이 $\\alpha$에서 $180^\\circ-\\alpha$로 바뀌는데, 직선이 이루는 각은 하나로 정해야 하므로 $90^\\circ$ 이하인 쪽을 택합니다. 절댓값은 그 작은 쪽을 고르는 장치입니다.',
      },
    ],

    mistakes: [
      '$\\dfrac{x+2}{3}$에서 지나는 점의 $x$좌표를 $2$로 읽는 실수 — 분자는 (변수) − (점의 좌표)이므로 $-2$입니다.',
      '좌표평면의 직선 $ax+by+c=0$에서 $(a, b)$를 방향벡터로 쓰는 실수 — $(a, b)$는 법선벡터이고 방향벡터는 $(b, -a)$입니다.',
      '두 직선이 이루는 각을 $120^\\circ$, $135^\\circ$처럼 둔각으로 답하는 실수 — 내적에 절댓값을 씌워 $90^\\circ$ 이하의 각을 구합니다.',
    ],

    gens: [
      {
        id: 'normal-line-2d',
        level: 1,
        title: '법선벡터로 좌표평면 위의 직선의 방정식 구하기',
        make: function (R) {
          var a, b, x1, y1, c;
          do {
            a = R.nonzero(-4, 4); b = R.nonzero(-4, 4);
            x1 = R.int(-4, 4); y1 = R.int(-4, 4);
            c = -(a * x1 + b * y1);
          } while (c === 0);
          function coef(k, v, first) {
            var s = k < 0 ? '-' : (first ? '' : '+');
            var m = Math.abs(k);
            return s + (m === 1 ? '' : m) + v;
          }
          var head = coef(a, 'x', true) + coef(b, 'y', false);
          var wrong = [], seen = {};
          function addW(v, why) { var st = String(v); if (v !== c && !seen[st]) { seen[st] = 1; wrong.push({ a: st, why: why }); } }
          addW(-c, '상수항의 부호를 반대로 구했습니다. $a(x-x_1)+b(y-y_1)=0$을 전개할 때 $-ax_1-by_1$이 상수항입니다.');
          addW(-(a * x1 - b * y1), '$y$에 관한 항의 부호를 잘못 계산했습니다. 점의 좌표를 식에 넣어 0이 되는지 확인해 봅니다.');
          addW(-(b * y1 - a * x1), '$x$에 관한 항의 부호를 잘못 계산했습니다. 점의 좌표를 식에 넣어 0이 되는지 확인해 봅니다.');
          var px = x1 === 0 ? 'x' : '(' + shift('x', x1) + ')';
          var py = y1 === 0 ? 'y' : '(' + shift('y', y1) + ')';
          return {
            type: 'short', check: 'number', concept: 1,
            q: '점 $(' + x1 + ', ' + y1 + ')$' + R.josa(y1, '을/를') + ' 지나고 벡터 $\\vec{n}=' + vt([a, b]) + '$에 수직인 직선의 방정식을 $' + head + '+c=0$ 꼴로 나타낼 때, 상수 $c$의 값을 구하십시오.',
            answer: String(c),
            wrong: wrong,
            explain: '$\\vec{n}$이 법선벡터이므로 $' + (a === 1 ? '' : a === -1 ? '-' : a) + px + (b < 0 ? '-' : '+') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + py + '=0$입니다.\n\n전개하면 $' + head + (c > 0 ? '+' : '') + c + '=0$이므로 $c=' + c + '$입니다.',
          };
        },
      },
      {
        id: 'point-on-line',
        level: 1,
        title: '공간의 직선 위의 점의 좌표 구하기',
        make: function (R) {
          var P = [R.int(-4, 4), R.int(-4, 4), R.int(-4, 4)];
          var u = [R.nonzero(-3, 3), R.nonzero(-3, 3), R.nonzero(-3, 3)];
          var t = R.pick([-2, -1, 2, 3]);
          var giv = R.int(0, 2);
          var ask = (giv + R.int(1, 2)) % 3;
          var Q = P.map(function (p, i) { return p + u[i] * t; });
          var ans = Q[ask];
          var wrong = [], seen = {};
          function addW(v, why) { var st = String(v); if (v !== ans && !seen[st]) { seen[st] = 1; wrong.push({ a: st, why: why }); } }
          addW(P[ask] - u[ask] * t, '분모의 부호를 놓쳤거나 $t$의 부호를 반대로 구했습니다. $t$를 다시 구해 봅니다.');
          var t2 = (Q[giv] + P[giv]) / u[giv];
          if (t2 === Math.round(t2)) addW(-P[ask] + u[ask] * t2, '분자에서 지나는 점의 좌표를 반대 부호로 읽었습니다. 예를 들어 분자가 $x-1$이면 지나는 점의 $x$좌표는 $1$입니다.');
          addW(P[ask] + u[ask], '$t=1$일 때의 점을 구했습니다. 주어진 좌표에서 $t$를 먼저 구합니다.');
          var rhs = P.map(function (p, i) {
            return (p === 0 ? '' : p) + (u[i] < 0 ? '-' : (p === 0 ? '' : '+')) + (Math.abs(u[i]) === 1 ? '' : Math.abs(u[i])) + 't';
          });
          var param = rhs.map(function (r, i) { return VARS[i] + '=' + r; });
          return {
            type: 'short', check: 'number', concept: 2,
            q: '직선 $' + lineTex(P, u) + '$ 위의 점 중 $' + VARS[giv] + '$좌표가 $' + Q[giv] + '$인 점의 $' + VARS[ask] + '$좌표를 구하십시오.',
            answer: String(ans),
            wrong: wrong,
            explain: '세 식을 $t$로 놓으면 $' + param[giv] + '$, $' + param[ask] + '$입니다.\n\n$' + Q[giv] + '=' + rhs[giv] + '$에서 $t=' + t + '$이므로 $' + VARS[ask] + '=' + P[ask] + R.fmt.signed(u[ask]) + '\\times' + R.fmt.paren(t) + '=' + ans + '$입니다.',
          };
        },
      },
      {
        id: 'two-point-plane',
        level: 2,
        title: '두 점을 지나는 직선이 좌표평면과 만나는 점',
        make: function (R) {
          var NAMES = ['yz평면', 'zx평면', 'xy평면'];
          var k = R.int(0, 2);
          var d = [R.nonzero(-3, 3), R.nonzero(-3, 3), R.nonzero(-3, 3)];
          var t0 = R.pick([-2, -1, 2, 3]);
          var P = [R.int(-4, 4), R.int(-4, 4), R.int(-4, 4)];
          P[k] = 0;
          var A = P.map(function (p, i) { return p - t0 * d[i]; });
          var B = A.map(function (x, i) { return x + d[i]; });
          var correct = '$' + vt(P) + '$';
          function at(s) { return A.map(function (x, i) { return x + s * d[i]; }); }
          var Ap = A.slice(); Ap[k] = 0;
          var Bp = B.slice(); Bp[k] = 0;
          var cands = [
            ['$' + vt(at(-t0)) + '$', '$t$의 부호를 반대로 구했습니다. $' + VARS[k] + '$좌표가 0이 되는지 넣어 확인해 봅니다.'],
            ['$' + vt(Ap) + '$', '점 $\\mathrm{A}$에서 ' + NAMES[k] + '에 내린 수선의 발입니다. 직선을 따라가야 합니다.'],
            ['$' + vt(Bp) + '$', '점 $\\mathrm{B}$에서 ' + NAMES[k] + '에 내린 수선의 발입니다. 직선을 따라가야 합니다.'],
            ['$' + vt(at(t0 + 1)) + '$', '$t$의 값을 1만큼 잘못 구했습니다. 방정식을 다시 풀어 봅니다.'],
          ];
          var reason = {};
          cands.forEach(function (w) { if (w[0] !== correct && !(w[0] in reason)) reason[w[0]] = w[1]; });
          var pick = R.choices(correct, Object.keys(reason));
          var param = A.map(function (p, i) { return (p === 0 ? '' : p) + (d[i] < 0 ? '-' : (p === 0 ? '' : '+')) + (Math.abs(d[i]) === 1 ? '' : Math.abs(d[i])) + 't'; });
          return {
            type: 'choice', concept: 3,
            q: '두 점 $\\mathrm{A}' + vt(A) + '$, $\\mathrm{B}' + vt(B) + '$' + R.josa(B[2], '을/를') + ' 지나는 직선이 ' + NAMES[k] + '과 만나는 점의 좌표를 고르십시오.',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (x) { return x === correct ? '' : reason[x] || ''; }),
            hint: NAMES[k] + ' 위의 점은 $' + VARS[k] + '=0$입니다.',
            explain: '방향벡터 $\\overrightarrow{\\mathrm{AB}}=' + vt(d) + '$이므로 직선은 $' + lineTex(A, d) + '$이고, 직선 위의 점은 $(' + param.join(', ') + ')$입니다.\n\n' + NAMES[k] + ' 위의 점은 $' + VARS[k] + '=0$이므로 $' + param[k] + '=0$, $t=' + t0 + '$입니다. 따라서 만나는 점은 $' + vt(P) + '$입니다.',
          };
        },
      },
      {
        id: 'angle-lines',
        level: 2,
        title: '방향벡터로 두 직선이 이루는 각 구하기',
        make: function (R) {
          var PAIRS = [
            [[1, 1, 2], [4, 5, 3], 30], [[1, 2, 3], [4, 1, 5], 30],
            [[1, 1, 2], [-5, -4, -3], 150], [[1, 2, 3], [-4, -1, -5], 150],
            [[1, 1, 4], [-1, 2, 2], 45], [[1, 2, 2], [-1, 1, 4], 45],
            [[1, 1, 4], [1, -2, -2], 135], [[1, 2, 2], [1, -1, -4], 135],
            [[2, 1, -1], [1, 2, 1], 60], [[2, 1, -1], [-1, -2, -1], 120],
            [[1, 2, 2], [2, 1, -2], 90], [[1, -1, 2], [3, 1, -1], 90], [[2, 3, 1], [1, -1, 1], 90],
          ];
          var base = R.pick(PAIRS);
          var raw = base[2], th = Math.min(raw, 180 - raw);
          var perm = R.shuffle([0, 1, 2]);
          var sg = perm.map(function () { return R.sign(); });
          var u = perm.map(function (p, i) { return sg[i] * base[0][p]; });
          var v = perm.map(function (p, i) { return sg[i] * base[1][p]; });
          if (R.bool()) { var tmp = u; u = v; v = tmp; }
          if (R.bool(0.3)) v = v.map(function (x) { return -x; });
          var P1 = [R.int(-3, 3), R.int(-3, 3), R.int(-3, 3)];
          var P2 = [R.int(-3, 3), R.int(-3, 3), R.int(-3, 3)];
          var d = dot(u, v), U2 = dot(u, u), V2 = dot(v, v);
          var vecAng = d >= 0 ? th : 180 - th;
          var wrongs = [];
          if (th !== 90) wrongs.push(180 - th);
          var pool = [30, 45, 60, 90].filter(function (x) { return x !== th; });
          wrongs = wrongs.concat(R.sample(pool, 3 - wrongs.length));
          var opts = [th].concat(wrongs).sort(function (x, y) { return x - y; });
          var why = opts.map(function (w) {
            if (w === th) return '';
            if (w === 180 - th) return '두 직선이 이루는 각은 $90^\\circ$ 이하입니다. 내적에 절댓값을 씌워 $\\cos\\theta\\ge0$이 되게 합니다.';
            if (w === 90) return '내적이 0일 때가 $90^\\circ$입니다. 이 두 방향벡터의 내적은 $' + d + '$입니다.';
            return '$\\cos' + w + '^\\circ=' + COS[w] + '$입니다. $\\cos\\theta$의 값을 다시 계산해 봅니다.';
          });
          return {
            type: 'choice', fixed: true, concept: 4,
            q: '다음 두 직선이 이루는 각의 크기를 고르십시오.\n\n$' + lineTex(P1, u) + '$\n\n$' + lineTex(P2, v) + '$',
            choices: opts.map(deg),
            answer: opts.indexOf(th),
            why: why,
            hint: '분모를 읽어 방향벡터를 구하고, $\\cos\\theta=\\dfrac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}||\\vec{v}|}$를 씁니다.',
            explain: '방향벡터는 $\\vec{u}=' + vt(u) + '$, $\\vec{v}=' + vt(v) + '$입니다. $\\vec{u}\\cdot\\vec{v}=' + prodTex(u, v) + '=' + d + '$, $|\\vec{u}|=' + rootTex(U2) + '$, $|\\vec{v}|=' + rootTex(V2) + '$\n\n$\\cos\\theta=\\dfrac{|' + d + '|}{' + rootTex(U2) + '\\times' + rootTex(V2) + '}=' + COS[th] + '$이므로 $\\theta=' + th + '^\\circ$입니다.' + (vecAng !== th ? ' (두 방향벡터가 이루는 각은 $' + vecAng + '^\\circ$이지만, 두 직선이 이루는 각은 그 보각입니다.)' : ''),
          };
        },
      },
    ],
  });
})();
