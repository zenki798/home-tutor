/* 기하 · 벡터의 내적
 * 내적의 정의(|a||b|cosθ), 성분으로 계산, 내적의 성질, 두 벡터가 이루는 각, 수직 조건과 평행 조건을 다룬다.
 * (직선·평면의 방정식에 내적을 쓰는 것은 다음 단원부터) */
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
  function rootAns(n) {
    if (n === 0) return '0';
    var r = rootParts(n);
    if (r.m === 1) return String(r.k);
    return (r.k === 1 ? '' : r.k) + '√' + r.m;
  }
  function vt(v) { return '(' + v.join(', ') + ')'; }
  function dot(a, b) { return a.reduce(function (s, x, i) { return s + x * b[i]; }, 0); }
  function sumSq(v) { return dot(v, v); }
  function prodTex(a, b) {
    return a.map(function (x, i) { return (x < 0 ? '(' + x + ')' : x) + '\\times' + (b[i] < 0 ? '(' + b[i] + ')' : b[i]); }).join('+');
  }
  // 각(도)과 코사인 값
  var COS = { 0: '1', 30: '\\dfrac{\\sqrt{3}}{2}', 45: '\\dfrac{\\sqrt{2}}{2}', 60: '\\dfrac{1}{2}', 90: '0', 120: '-\\dfrac{1}{2}', 135: '-\\dfrac{\\sqrt{2}}{2}', 150: '-\\dfrac{\\sqrt{3}}{2}', 180: '-1' };
  var ANGLES = [30, 45, 60, 90, 120, 135, 150];
  function deg(x) { return '$' + x + '^\\circ$'; }

  // 좌표평면 위의 벡터 그림 (화살표·점·점선·각 표시)
  function plane(o) {
    var u = o.u || 30, pad = 20;
    var x0 = o.xmin, x1 = o.xmax, y0 = o.ymin, y1 = o.ymax;
    var W = (x1 - x0) * u + 2 * pad, H = (y1 - y0) * u + 2 * pad;
    function X(x) { return +(pad + (x - x0) * u).toFixed(1); }
    function Y(y) { return +(pad + (y1 - y) * u).toFixed(1); }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">';
    var i;
    if (o.grid !== false) {
      for (i = x0; i <= x1; i++) s += '<line x1="' + X(i) + '" y1="' + Y(y0) + '" x2="' + X(i) + '" y2="' + Y(y1) + '" stroke="currentColor" stroke-opacity="0.15"/>';
      for (i = y0; i <= y1; i++) s += '<line x1="' + X(x0) + '" y1="' + Y(i) + '" x2="' + X(x1) + '" y2="' + Y(i) + '" stroke="currentColor" stroke-opacity="0.15"/>';
    }
    if (o.axes !== false) {
      if (y0 <= 0 && y1 >= 0) s += '<line x1="' + X(x0) + '" y1="' + Y(0) + '" x2="' + X(x1) + '" y2="' + Y(0) + '" stroke="currentColor" stroke-width="1.3"/><text x="' + (X(x1) - 4) + '" y="' + (Y(0) - 6) + '" font-size="13" fill="currentColor" text-anchor="end" font-style="italic">x</text>';
      if (x0 <= 0 && x1 >= 0) s += '<line x1="' + X(0) + '" y1="' + Y(y0) + '" x2="' + X(0) + '" y2="' + Y(y1) + '" stroke="currentColor" stroke-width="1.3"/><text x="' + (X(0) + 6) + '" y="' + (Y(y1) + 12) + '" font-size="13" fill="currentColor" font-style="italic">y</text>';
    }
    (o.arcs || []).forEach(function (a) {
      var r = a.r * u, cx = X(a.c[0]), cy = Y(a.c[1]);
      var t1 = a.from * Math.PI / 180, t2 = a.to * Math.PI / 180;
      var sx = +(cx + r * Math.cos(t1)).toFixed(1), sy = +(cy - r * Math.sin(t1)).toFixed(1);
      var ex = +(cx + r * Math.cos(t2)).toFixed(1), ey = +(cy - r * Math.sin(t2)).toFixed(1);
      var large = (a.to - a.from) > 180 ? 1 : 0;
      s += '<path d="M' + sx + ' ' + sy + ' A' + r + ' ' + r + ' 0 ' + large + ' 0 ' + ex + ' ' + ey + '" fill="none" stroke="currentColor" stroke-width="1.4"/>';
      if (a.label) s += '<text x="' + X(a.lx) + '" y="' + Y(a.ly) + '" font-size="14" fill="currentColor" text-anchor="middle" font-style="italic">' + a.label + '</text>';
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
    id: 'math-h-geo-10',
    course: 'math-h-geo',
    title: '벡터의 내적',
    summary: '두 벡터의 내적을 정의하고 성분으로 계산하여, 두 벡터가 이루는 각과 수직·평행 조건을 구합니다.',
    goals: [
      '두 벡터의 내적의 뜻을 알고, 크기와 이루는 각으로 내적을 구할 수 있다.',
      '성분을 이용하여 평면벡터와 공간벡터의 내적을 계산할 수 있다.',
      '내적의 성질을 이용하여 벡터의 크기와 내적에 관한 식을 계산할 수 있다.',
      '내적을 이용하여 두 벡터가 이루는 각을 구하고, 수직 조건과 평행 조건을 쓸 수 있다.',
    ],
    standards: ['[12기하03-03]'],

    concepts: [
      {
        title: '내적의 정의',
        body: '영벡터가 아닌 두 벡터 $\\vec{a}$, $\\vec{b}$에 대하여 $\\vec{a}=\\overrightarrow{\\mathrm{OA}}$, $\\vec{b}=\\overrightarrow{\\mathrm{OB}}$로 **시점을 같게** 놓았을 때, $\\angle\\mathrm{AOB}=\\theta$ ($0\\le\\theta\\le\\pi$)를 두 벡터가 **이루는 각**이라고 합니다. 이때\n\n$\\vec{a}\\cdot\\vec{b}=|\\vec{a}||\\vec{b}|\\cos\\theta$\n\n를 두 벡터의 **내적**이라고 합니다. $\\vec{a}=\\vec{0}$ 또는 $\\vec{b}=\\vec{0}$이면 $\\vec{a}\\cdot\\vec{b}=0$으로 정합니다. 내적의 결과는 벡터가 아니라 **실수**입니다.\n\n$\\cos\\theta$의 부호에 따라 내적의 부호가 정해집니다.\n\n| 이루는 각 $\\theta$ | 예각 | 직각 | 둔각 |\n|---|---|---|---|\n| 내적 $\\vec{a}\\cdot\\vec{b}$ | 양수 | $0$ | 음수 |\n\n특히 $\\theta=0$이면 $\\vec{a}\\cdot\\vec{a}=|\\vec{a}|^2$입니다.\n\n예: $|\\vec{a}|=2$, $|\\vec{b}|=3$, $\\theta=60^\\circ$이면 $\\vec{a}\\cdot\\vec{b}=2\\times3\\times\\dfrac{1}{2}=3$입니다.\n\n> ⚠️ 이루는 각은 두 벡터의 시점을 맞춘 뒤에 잽니다. 꼬리와 머리가 이어진 채로 보이는 각은 이루는 각이 아닐 수 있습니다.',
        easy: '내적은 "두 벡터가 얼마나 같은 쪽을 향하는가"를 재는 수입니다. 같은 쪽을 볼수록 크고, 서로 직각이면 0, 반대쪽을 볼수록 음수가 됩니다.\n\n수레를 비스듬히 끌 때를 떠올려 보십시오. 앞으로 나아가는 데 쓰이는 힘은 끄는 힘 중 앞쪽 방향의 부분, 곧 $|\\vec{F}|\\cos\\theta$뿐입니다. 이것에 이동 거리를 곱한 것이 물리에서 말하는 "일"이고, 바로 내적입니다.',
        fig: {
          type: 'svg',
          svg: plane({ xmin: -1, xmax: 6, ymin: -1, ymax: 4, grid: false, axes: false, vecs: [
            { from: [0, 0], to: [5, 0], label: 'a', lx: 4.6, ly: -0.6 },
            { from: [0, 0], to: [2.5, 3.2], label: 'b', lx: 1.9, ly: 3.2, color: 'var(--fig-2)' },
          ], arcs: [{ c: [0, 0], r: 1, from: 0, to: 52, label: 'θ', lx: 1.35, ly: 0.55 }], pts: [{ x: 0, y: 0, label: 'O', dx: -14, dy: 14 }] }),
          alt: '시점 O를 같게 놓은 두 벡터 a와 b, 그리고 두 벡터가 이루는 각 θ',
        },
        check: {
          type: 'choice',
          q: '$|\\vec{a}|=4$, $|\\vec{b}|=3$이고 두 벡터가 이루는 각의 크기가 $120^\\circ$일 때, $\\vec{a}\\cdot\\vec{b}$의 값은 무엇입니까?',
          choices: ['$-6$', '$6$', '$6\\sqrt{3}$'],
          answer: 0,
          why: ['', '$\\cos120^\\circ$의 부호를 놓쳤습니다. 둔각이므로 내적은 음수입니다.', '$\\cos$ 대신 $\\sin120^\\circ=\\dfrac{\\sqrt{3}}{2}$를 곱했습니다.'],
          explain: '$\\vec{a}\\cdot\\vec{b}=4\\times3\\times\\cos120^\\circ=12\\times\\left(-\\dfrac{1}{2}\\right)=-6$입니다.',
        },
      },
      {
        title: '성분을 이용한 내적의 계산',
        body: '$\\vec{a}=(a_1, a_2)$, $\\vec{b}=(b_1, b_2)$이면\n\n$\\vec{a}\\cdot\\vec{b}=a_1b_1+a_2b_2$\n\n이고, 공간벡터 $\\vec{a}=(a_1, a_2, a_3)$, $\\vec{b}=(b_1, b_2, b_3)$이면\n\n$\\vec{a}\\cdot\\vec{b}=a_1b_1+a_2b_2+a_3b_3$\n\n입니다. 곧 **같은 자리의 성분끼리 곱하여 모두 더합니다.**\n\n이유: $\\vec{a}=\\overrightarrow{\\mathrm{OA}}$, $\\vec{b}=\\overrightarrow{\\mathrm{OB}}$로 놓고 삼각형 $\\mathrm{OAB}$에 코사인법칙을 쓰면\n\n$|\\vec{b}-\\vec{a}|^2=|\\vec{a}|^2+|\\vec{b}|^2-2|\\vec{a}||\\vec{b}|\\cos\\theta$\n\n입니다. 양변을 성분으로 쓰면 $(b_1-a_1)^2+(b_2-a_2)^2=(a_1^2+a_2^2)+(b_1^2+b_2^2)-2\\,\\vec{a}\\cdot\\vec{b}$이고, 정리하면 $\\vec{a}\\cdot\\vec{b}=a_1b_1+a_2b_2$가 됩니다. ($\\theta=0$, $\\pi$일 때도 직접 확인하면 성립합니다.)\n\n예: $\\vec{a}=(2, -1, 3)$, $\\vec{b}=(1, 4, 2)$이면 $\\vec{a}\\cdot\\vec{b}=2-4+6=4$입니다.',
        easy: '성분으로 내적을 구하는 것은 "짝끼리 곱해서 모두 더하기"입니다. 첫째끼리, 둘째끼리, 셋째끼리 곱한 뒤 합칩니다.\n\n장보기에 비유하면, 사과·배·귤의 개수 $(3, 2, 5)$와 한 개당 값 $(500, 800, 200)$의 내적 $3\\times500+2\\times800+5\\times200=4100$이 전체 값이 됩니다. 결과가 벡터가 아니라 하나의 수라는 점도 같습니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\vec{a}=(2, -1, 3)$, $\\vec{b}=(1, 4, 2)$일 때, $\\vec{a}\\cdot\\vec{b}$의 값을 구하십시오.',
          answer: '4',
          wrong: [
            { a: '12', why: '$-1$의 부호를 무시했습니다. $(-1)\\times4=-4$입니다.' },
            { a: '11', why: '성분끼리 더했습니다. 내적은 같은 자리의 성분끼리 곱하여 더합니다.' },
          ],
          explain: '$\\vec{a}\\cdot\\vec{b}=2\\times1+(-1)\\times4+3\\times2=2-4+6=4$입니다.',
        },
      },
      {
        title: '내적의 성질',
        body: '세 벡터 $\\vec{a}$, $\\vec{b}$, $\\vec{c}$와 실수 $k$에 대하여 다음이 성립합니다. (성분으로 계산하면 바로 확인할 수 있습니다.)\n\n- 교환법칙: $\\vec{a}\\cdot\\vec{b}=\\vec{b}\\cdot\\vec{a}$\n- 분배법칙: $\\vec{a}\\cdot(\\vec{b}+\\vec{c})=\\vec{a}\\cdot\\vec{b}+\\vec{a}\\cdot\\vec{c}$\n- 실수배: $(k\\vec{a})\\cdot\\vec{b}=\\vec{a}\\cdot(k\\vec{b})=k(\\vec{a}\\cdot\\vec{b})$\n- $\\vec{a}\\cdot\\vec{a}=|\\vec{a}|^2\\ge0$\n\n이 성질로 다항식처럼 전개할 수 있습니다.\n\n$|\\vec{a}+\\vec{b}|^2=(\\vec{a}+\\vec{b})\\cdot(\\vec{a}+\\vec{b})=|\\vec{a}|^2+2\\vec{a}\\cdot\\vec{b}+|\\vec{b}|^2$\n\n$|\\vec{a}-\\vec{b}|^2=|\\vec{a}|^2-2\\vec{a}\\cdot\\vec{b}+|\\vec{b}|^2$, $\\;(\\vec{a}+\\vec{b})\\cdot(\\vec{a}-\\vec{b})=|\\vec{a}|^2-|\\vec{b}|^2$\n\n> ⚠️ 내적은 실수이므로 수처럼 "나눌" 수 없습니다. $\\vec{a}\\cdot\\vec{b}=\\vec{a}\\cdot\\vec{c}$라고 해서 $\\vec{b}=\\vec{c}$인 것은 아닙니다. 또 $|\\vec{a}+\\vec{b}|^2$에서 $2\\vec{a}\\cdot\\vec{b}$를 빠뜨리지 않도록 주의합니다.',
        easy: '내적은 곱셈과 아주 비슷하게 전개됩니다. $(x+y)^2=x^2+2xy+y^2$처럼 $|\\vec{a}+\\vec{b}|^2=|\\vec{a}|^2+2\\vec{a}\\cdot\\vec{b}+|\\vec{b}|^2$입니다. $x^2$ 자리에 $|\\vec{a}|^2$, $xy$ 자리에 $\\vec{a}\\cdot\\vec{b}$를 넣는다고 생각하면 됩니다.\n\n그래서 벡터의 크기를 구할 때는 먼저 제곱해서 내적으로 바꾸고, 전개한 뒤 마지막에 제곱근을 구합니다.',
        check: {
          type: 'ox',
          q: '$|\\vec{a}|=3$, $|\\vec{b}|=2$, $\\vec{a}\\cdot\\vec{b}=1$일 때 $|\\vec{a}+\\vec{b}|^2=13$입니다.',
          answer: false,
          explain: '$|\\vec{a}+\\vec{b}|^2=|\\vec{a}|^2+2\\vec{a}\\cdot\\vec{b}+|\\vec{b}|^2=9+2+4=15$입니다. 13은 $2\\vec{a}\\cdot\\vec{b}$를 빠뜨린 값입니다.',
        },
      },
      {
        title: '두 벡터가 이루는 각',
        body: '내적의 정의를 거꾸로 쓰면, 영벡터가 아닌 두 벡터가 이루는 각 $\\theta$ ($0\\le\\theta\\le\\pi$)를 구할 수 있습니다.\n\n$\\cos\\theta=\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}=\\dfrac{a_1b_1+a_2b_2+a_3b_3}{\\sqrt{a_1^2+a_2^2+a_3^2}\\sqrt{b_1^2+b_2^2+b_3^2}}$\n\n$0\\le\\theta\\le\\pi$에서 $\\cos\\theta$의 값 하나에 $\\theta$가 하나로 정해지므로, 코사인 값으로 각을 찾으면 됩니다.\n\n| $\\theta$ | $30^\\circ$ | $45^\\circ$ | $60^\\circ$ | $90^\\circ$ | $120^\\circ$ | $135^\\circ$ | $150^\\circ$ |\n|---|---|---|---|---|---|---|---|\n| $\\cos\\theta$ | $\\frac{\\sqrt{3}}{2}$ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{1}{2}$ | $0$ | $-\\frac{1}{2}$ | $-\\frac{\\sqrt{2}}{2}$ | $-\\frac{\\sqrt{3}}{2}$ |\n\n예: $\\vec{a}=(1, 1, 0)$, $\\vec{b}=(0, 1, 1)$이면 $\\vec{a}\\cdot\\vec{b}=1$, $|\\vec{a}||\\vec{b}|=\\sqrt{2}\\times\\sqrt{2}=2$이므로 $\\cos\\theta=\\dfrac{1}{2}$, $\\theta=60^\\circ$입니다.',
        easy: '각을 구하는 순서는 늘 같습니다. ① 내적을 구한다 ② 두 크기를 구해 곱한다 ③ 나누어 $\\cos\\theta$를 얻는다 ④ 표에서 각을 찾는다.\n\n$\\cos\\theta$가 음수로 나오면 틀린 것이 아니라 두 벡터가 둔각을 이룬다는 뜻입니다. 이루는 각은 $0$부터 $180^\\circ$까지이니까요.',
        check: {
          type: 'choice',
          q: '두 벡터 $\\vec{a}=(1, 0)$, $\\vec{b}=(-1, 1)$이 이루는 각의 크기는 무엇입니까?',
          choices: ['$135^\\circ$', '$45^\\circ$', '$120^\\circ$'],
          answer: 0,
          why: ['', '내적 $-1$의 부호를 놓쳤습니다. $\\cos\\theta$가 음수이면 둔각입니다.', '$\\cos\\theta=-\\dfrac{\\sqrt{2}}{2}$입니다. $-\\dfrac{1}{2}$일 때가 $120^\\circ$입니다.'],
          explain: '$\\vec{a}\\cdot\\vec{b}=-1$, $|\\vec{a}|=1$, $|\\vec{b}|=\\sqrt{2}$이므로 $\\cos\\theta=-\\dfrac{1}{\\sqrt{2}}=-\\dfrac{\\sqrt{2}}{2}$, $\\theta=135^\\circ$입니다.',
        },
      },
      {
        title: '두 벡터의 수직 조건과 평행 조건',
        body: '영벡터가 아닌 두 벡터 $\\vec{a}$, $\\vec{b}$에 대하여\n\n- **수직 조건**: $\\vec{a}\\perp\\vec{b} \\iff \\vec{a}\\cdot\\vec{b}=0$ — 이루는 각이 $90^\\circ$이면 $\\cos\\theta=0$이기 때문입니다.\n- **평행 조건**: $\\vec{a}\\parallel\\vec{b} \\iff \\vec{a}\\cdot\\vec{b}=\\pm|\\vec{a}||\\vec{b}|$ — 이루는 각이 $0$ 또는 $\\pi$이면 $\\cos\\theta=\\pm1$이기 때문입니다. 성분으로는 $\\vec{b}=k\\vec{a}$ ($k\\ne0$), 곧 대응하는 성분의 비가 같습니다.\n\n성분으로 쓰면 수직 조건은 $a_1b_1+a_2b_2+a_3b_3=0$이라는 **일차식 하나**가 되어 미지수를 쉽게 구할 수 있습니다.\n\n예: $\\vec{a}=(2, k, 1)$과 $\\vec{b}=(1, -1, 3)$이 수직이면 $2-k+3=0$이므로 $k=5$입니다.\n\n> 💡 $\\vec{a}\\cdot\\vec{b}=0$이라고 해서 둘 중 하나가 영벡터인 것은 아닙니다. 영벡터가 아닌 두 벡터가 수직일 수도 있습니다.',
        easy: '수직인지 알아보려고 각도기를 댈 필요가 없습니다. 성분끼리 곱해서 더한 값이 0이면 수직입니다. $(3, 4)$와 $(4, -3)$은 $12-12=0$이므로 수직이지요.\n\n평행은 "한 벡터를 늘이거나 줄이거나 뒤집으면 다른 벡터가 되는 것"이므로, 성분의 비가 같은지 보면 됩니다.',
        check: {
          type: 'short', check: 'number',
          q: '두 벡터 $\\vec{a}=(3, -2)$, $\\vec{b}=(4, k)$가 서로 수직일 때, 실수 $k$의 값을 구하십시오.',
          answer: '6',
          wrong: [
            { a: '-6', why: '$-2k$의 부호를 놓쳤습니다. $12-2k=0$에서 $k=6$입니다.' },
            { a: '-8/3', why: '평행 조건(성분의 비)을 썼습니다. 수직이면 내적이 0입니다.' },
          ],
          explain: '$\\vec{a}\\cdot\\vec{b}=3\\times4+(-2)\\times k=12-2k=0$이므로 $k=6$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '두 벡터 $\\vec{a}=(2, 1, -1)$, $\\vec{b}=(1, 2, 1)$이 이루는 각의 크기 $\\theta$를 구하십시오.',
        steps: [
          '성분으로 내적을 구합니다. $\\vec{a}\\cdot\\vec{b}=2\\times1+1\\times2+(-1)\\times1=3$',
          '두 벡터의 크기를 구합니다. $|\\vec{a}|=\\sqrt{4+1+1}=\\sqrt{6}$, $|\\vec{b}|=\\sqrt{1+4+1}=\\sqrt{6}$',
          '$\\cos\\theta=\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}=\\dfrac{3}{6}=\\dfrac{1}{2}$',
          '$0\\le\\theta\\le\\pi$에서 $\\cos\\theta=\\dfrac{1}{2}$인 각은 $\\theta=60^\\circ$입니다.',
        ],
        answer: '$\\theta=60^\\circ$ $\\left(=\\dfrac{\\pi}{3}\\right)$',
      },
      {
        q: '$|\\vec{a}|=2$, $|\\vec{b}|=3$, $|\\vec{a}-\\vec{b}|=\\sqrt{7}$일 때, 두 벡터 $\\vec{a}$, $\\vec{b}$가 이루는 각의 크기를 구하십시오.',
        steps: [
          '크기가 주어지면 제곱하여 내적으로 바꿉니다. $|\\vec{a}-\\vec{b}|^2=|\\vec{a}|^2-2\\vec{a}\\cdot\\vec{b}+|\\vec{b}|^2$',
          '수를 넣으면 $7=4-2\\vec{a}\\cdot\\vec{b}+9$이므로 $\\vec{a}\\cdot\\vec{b}=3$입니다.',
          '$\\cos\\theta=\\dfrac{3}{2\\times3}=\\dfrac{1}{2}$이므로 $\\theta=60^\\circ$입니다.',
        ],
        answer: '$60^\\circ$',
      },
    ],

    terms: [
      { term: '내적', def: '두 벡터 $\\vec{a}$, $\\vec{b}$가 이루는 각이 $\\theta$일 때 $\\vec{a}\\cdot\\vec{b}=|\\vec{a}||\\vec{b}|\\cos\\theta$로 정한 실수입니다. 성분으로는 같은 자리의 성분끼리 곱해 더한 값입니다.' },
      { term: '두 벡터가 이루는 각', def: '두 벡터의 시점을 같게 놓았을 때 두 벡터 사이의 각 $\\theta$ ($0\\le\\theta\\le\\pi$)입니다.' },
      { term: '수직 조건', def: '영벡터가 아닌 두 벡터가 수직이면 내적이 0이고, 그 거꾸로도 성립합니다. $\\vec{a}\\perp\\vec{b} \\iff \\vec{a}\\cdot\\vec{b}=0$' },
      { term: '평행 조건', def: '영벡터가 아닌 두 벡터가 평행하면 $\\vec{b}=k\\vec{a}$ ($k\\ne0$)이고, 이때 $\\vec{a}\\cdot\\vec{b}=\\pm|\\vec{a}||\\vec{b}|$입니다.' },
      { term: '코사인법칙', def: '삼각형에서 $c^2=a^2+b^2-2ab\\cos C$가 성립한다는 법칙입니다. 내적을 성분으로 계산하는 공식을 이끌어 낼 때 씁니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '$|\\vec{a}|=3$, $|\\vec{b}|=4$이고 두 벡터가 이루는 각의 크기가 $60^\\circ$일 때, $\\vec{a}\\cdot\\vec{b}$의 값을 구하십시오.',
        answer: '6',
        wrong: [{ a: '12', why: '$\\cos60^\\circ$를 곱하지 않았습니다. 내적은 $|\\vec{a}||\\vec{b}|\\cos\\theta$입니다.' }],
        explain: '$\\vec{a}\\cdot\\vec{b}=3\\times4\\times\\cos60^\\circ=12\\times\\dfrac{1}{2}=6$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 0,
        q: '영벡터가 아닌 두 벡터가 이루는 각이 둔각이면 두 벡터의 내적은 음수입니다.',
        answer: true,
        explain: '둔각 $\\theta$ ($90^\\circ<\\theta<180^\\circ$)에서는 $\\cos\\theta<0$이고 $|\\vec{a}||\\vec{b}|>0$이므로 $\\vec{a}\\cdot\\vec{b}=|\\vec{a}||\\vec{b}|\\cos\\theta<0$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 1,
        q: '$\\vec{a}=(3, -2)$, $\\vec{b}=(1, 4)$일 때, $\\vec{a}\\cdot\\vec{b}$의 값을 구하십시오.',
        answer: '-5',
        wrong: [{ a: '11', why: '$-2$의 부호를 무시했습니다. $(-2)\\times4=-8$입니다.' }],
        explain: '$\\vec{a}\\cdot\\vec{b}=3\\times1+(-2)\\times4=3-8=-5$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', concept: 1,
        q: '$\\vec{a}=(1, -2, 3)$, $\\vec{b}=(4, 0, -1)$일 때, $\\vec{a}\\cdot\\vec{b}$의 값을 구하십시오.',
        answer: '1',
        wrong: [{ a: '7', why: '$3\\times(-1)$의 부호를 놓쳤습니다. $4+0-3$을 계산합니다.' }],
        explain: '$\\vec{a}\\cdot\\vec{b}=1\\times4+(-2)\\times0+3\\times(-1)=4+0-3=1$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', fixed: true, concept: 3,
        q: '두 벡터 $\\vec{a}=(3, 1)$, $\\vec{b}=(1, 2)$가 이루는 각의 크기는 무엇입니까?',
        choices: ['$30^\\circ$', '$45^\\circ$', '$60^\\circ$', '$135^\\circ$'],
        answer: 1,
        why: [
          '$\\cos\\theta=\\dfrac{\\sqrt{2}}{2}$입니다. $\\dfrac{\\sqrt{3}}{2}$일 때가 $30^\\circ$입니다.',
          '',
          '$\\cos\\theta=\\dfrac{\\sqrt{2}}{2}$입니다. $\\dfrac{1}{2}$일 때가 $60^\\circ$입니다.',
          '내적이 양수 5이므로 예각입니다. 부호를 다시 확인합니다.',
        ],
        explain: '$\\vec{a}\\cdot\\vec{b}=3+2=5$, $|\\vec{a}|=\\sqrt{10}$, $|\\vec{b}|=\\sqrt{5}$이므로 $\\cos\\theta=\\dfrac{5}{\\sqrt{50}}=\\dfrac{5}{5\\sqrt{2}}=\\dfrac{\\sqrt{2}}{2}$, $\\theta=45^\\circ$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 4,
        q: '두 벡터 $\\vec{a}=(2, k, 1)$, $\\vec{b}=(1, -1, 3)$이 서로 수직일 때, 실수 $k$의 값을 구하십시오.',
        answer: '5',
        wrong: [{ a: '-5', why: '$k\\times(-1)=-k$의 부호를 놓쳤습니다. $2-k+3=0$입니다.' }],
        explain: '$\\vec{a}\\cdot\\vec{b}=2-k+3=0$이므로 $k=5$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 2,
        q: '영벡터가 아닌 세 벡터 $\\vec{a}$, $\\vec{b}$, $\\vec{c}$에 대하여 **항상 옳은** 것은 무엇입니까?',
        choices: [
          '$\\vec{a}\\cdot\\vec{b}=\\vec{b}\\cdot\\vec{a}$',
          '$\\vec{a}\\cdot\\vec{b}=\\vec{a}\\cdot\\vec{c}$이면 $\\vec{b}=\\vec{c}$',
          '$|\\vec{a}\\cdot\\vec{b}|=|\\vec{a}||\\vec{b}|$',
          '$(\\vec{a}+\\vec{b})\\cdot(\\vec{a}-\\vec{b})=|\\vec{a}|^2+|\\vec{b}|^2$',
        ],
        answer: 0,
        why: [
          '',
          '내적은 나누어 약분할 수 없습니다. 예를 들어 $\\vec{a}$에 수직인 서로 다른 두 벡터 $\\vec{b}$, $\\vec{c}$는 모두 내적이 0입니다.',
          '$|\\vec{a}\\cdot\\vec{b}|=|\\vec{a}||\\vec{b}||\\cos\\theta|$이므로 두 벡터가 평행할 때만 성립합니다.',
          '전개하면 $|\\vec{a}|^2-|\\vec{b}|^2$입니다. 가운데 항 $\\vec{a}\\cdot\\vec{b}$와 $\\vec{b}\\cdot\\vec{a}$는 서로 지워집니다.',
        ],
        explain: '내적은 교환법칙이 성립하므로 $\\vec{a}\\cdot\\vec{b}=\\vec{b}\\cdot\\vec{a}$는 항상 옳습니다. 나머지는 성립하지 않는 경우가 있습니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'expr', concept: 2,
        q: '$|\\vec{a}|=2$, $|\\vec{b}|=3$이고 두 벡터가 이루는 각의 크기가 $120^\\circ$일 때, $|\\vec{a}+\\vec{b}|$를 구하십시오. (근호는 √ 또는 sqrt로 입력합니다.)',
        answer: '√7',
        hint: '$|\\vec{a}+\\vec{b}|^2$을 내적으로 전개합니다.',
        wrong: [
          { a: '√13', why: '$2\\vec{a}\\cdot\\vec{b}$를 빠뜨렸습니다. $|\\vec{a}+\\vec{b}|^2=|\\vec{a}|^2+2\\vec{a}\\cdot\\vec{b}+|\\vec{b}|^2$입니다.' },
          { a: '√19', why: '$\\vec{a}\\cdot\\vec{b}$의 부호를 놓쳤습니다. $\\cos120^\\circ=-\\dfrac{1}{2}$이므로 $\\vec{a}\\cdot\\vec{b}=-3$입니다.' },
          { a: '7', why: '$|\\vec{a}+\\vec{b}|^2$까지 구했습니다. 제곱근을 구해야 합니다.' },
        ],
        explain: '$\\vec{a}\\cdot\\vec{b}=2\\times3\\times\\left(-\\dfrac{1}{2}\\right)=-3$이므로 $|\\vec{a}+\\vec{b}|^2=4+2\\times(-3)+9=7$, $|\\vec{a}+\\vec{b}|=\\sqrt{7}$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', unit: '°', concept: 3,
        q: '$|\\vec{a}|=2$, $|\\vec{b}|=3$, $|\\vec{a}+\\vec{b}|=\\sqrt{19}$일 때, 두 벡터가 이루는 각의 크기는 몇 도인지 구하십시오.',
        answer: '60',
        hint: '$|\\vec{a}+\\vec{b}|^2$을 전개해 $\\vec{a}\\cdot\\vec{b}$를 먼저 구합니다.',
        wrong: [{ a: '120', why: '$\\vec{a}\\cdot\\vec{b}$의 부호를 잘못 구했습니다. $19=4+2\\vec{a}\\cdot\\vec{b}+9$에서 $\\vec{a}\\cdot\\vec{b}=3>0$입니다.' }],
        explain: '$19=4+2\\vec{a}\\cdot\\vec{b}+9$이므로 $\\vec{a}\\cdot\\vec{b}=3$입니다. $\\cos\\theta=\\dfrac{3}{2\\times3}=\\dfrac{1}{2}$이므로 $\\theta=60^\\circ$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'set', concept: 4,
        q: '두 벡터 $\\vec{a}=(k, 1, -2)$, $\\vec{b}=(k, 3, 2)$가 서로 수직이 되도록 하는 실수 $k$의 값을 모두 구하십시오.',
        answer: ['1', '-1'],
        hint: '수직 조건을 쓰면 $k$에 대한 이차방정식이 됩니다.',
        wrong: [{ a: ['1'], why: '$k^2=1$의 해는 두 개입니다. 음수 해도 함께 씁니다.' }],
        explain: '$\\vec{a}\\cdot\\vec{b}=k^2+3-4=k^2-1=0$이므로 $k=1$ 또는 $k=-1$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 4,
        q: '벡터 $\\vec{a}=(1, 2, -1)$과 **수직인** 벡터는 무엇입니까?',
        choices: ['$(1, 0, 1)$', '$(2, 4, -2)$', '$(1, 1, 1)$', '$(0, 1, -1)$'],
        answer: 0,
        why: [
          '',
          '$\\vec{a}$의 2배이므로 평행한 벡터입니다. 내적은 $2+8+2=12$입니다.',
          '내적이 $1+2-1=2$로 0이 아닙니다.',
          '내적이 $0+2+1=3$으로 0이 아닙니다.',
        ],
        explain: '수직이면 내적이 0입니다. $(1, 2, -1)\\cdot(1, 0, 1)=1+0-1=0$이므로 $(1, 0, 1)$이 수직입니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 0,
        q: '한 변의 길이가 2인 정삼각형 $\\mathrm{ABC}$에서 $\\overrightarrow{\\mathrm{AB}}\\cdot\\overrightarrow{\\mathrm{BC}}$의 값을 구하십시오.',
        fig: { type: 'polygon', points: [[0, 0], [2, 0], [1, 1.732]], labels: ['A', 'B', 'C'], sides: ['2', '2', '2'], alt: '한 변의 길이가 2인 정삼각형 ABC' },
        answer: '-2',
        hint: '두 벡터의 시점을 같게 놓았을 때의 각을 생각합니다. 정삼각형의 내각이 곧 이루는 각은 아닙니다.',
        wrong: [{ a: '2', why: '내각 $60^\\circ$를 이루는 각으로 썼습니다. $\\overrightarrow{\\mathrm{AB}}$를 $\\mathrm{B}$로 옮겨 시점을 맞추면 이루는 각은 $120^\\circ$입니다.' }],
        explain: '$\\overrightarrow{\\mathrm{AB}}$와 $\\overrightarrow{\\mathrm{BC}}$의 시점을 $\\mathrm{B}$로 맞추면 $\\overrightarrow{\\mathrm{AB}}$는 $\\mathrm{A}$에서 $\\mathrm{B}$로 향하는 방향 그대로 $\\mathrm{B}$에서 뻗으므로, 두 벡터가 이루는 각은 $180^\\circ-60^\\circ=120^\\circ$입니다. 따라서 $2\\times2\\times\\cos120^\\circ=-2$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 2,
        q: '$|\\vec{a}|=3$, $|\\vec{b}|=2$이고 두 벡터가 이루는 각의 크기가 $60^\\circ$입니다. 두 벡터 $\\vec{a}+\\vec{b}$와 $\\vec{a}-k\\vec{b}$가 서로 수직일 때, 실수 $k$의 값을 구하십시오.',
        answer: '12/7',
        hint: '$(\\vec{a}+\\vec{b})\\cdot(\\vec{a}-k\\vec{b})=0$을 다항식처럼 전개합니다.',
        wrong: [{ a: '9/4', why: '$\\vec{a}\\cdot\\vec{b}$가 들어 있는 항을 빠뜨렸습니다. 전개하면 $|\\vec{a}|^2+(1-k)\\vec{a}\\cdot\\vec{b}-k|\\vec{b}|^2$입니다.' }],
        explain: '$\\vec{a}\\cdot\\vec{b}=3\\times2\\times\\dfrac{1}{2}=3$입니다. $(\\vec{a}+\\vec{b})\\cdot(\\vec{a}-k\\vec{b})=|\\vec{a}|^2-k\\vec{a}\\cdot\\vec{b}+\\vec{a}\\cdot\\vec{b}-k|\\vec{b}|^2=9-3k+3-4k=12-7k=0$이므로 $k=\\dfrac{12}{7}$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 3,
        q: '두 벡터 $\\vec{a}=(1, 0, 1)$, $\\vec{b}=(0, 1, t)$가 이루는 각의 크기가 $60^\\circ$일 때, 양수 $t$의 값을 구하십시오.',
        answer: '1',
        hint: '$\\cos60^\\circ=\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}$에 성분을 넣고 양변을 제곱합니다.',
        wrong: [{ a: '-1', why: '$t^2=1$의 두 해 중 문제의 조건(양수)에 맞는 것을 고릅니다. $t<0$이면 내적이 음수가 되어 둔각입니다.' }],
        explain: '$\\vec{a}\\cdot\\vec{b}=t$, $|\\vec{a}|=\\sqrt{2}$, $|\\vec{b}|=\\sqrt{1+t^2}$이므로 $\\dfrac{t}{\\sqrt{2}\\sqrt{1+t^2}}=\\dfrac{1}{2}$입니다. 양변을 제곱하면 $4t^2=2(1+t^2)$, $t^2=1$이고 $t>0$이므로 $t=1$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 2,
        q: '세 벡터 $\\vec{a}$, $\\vec{b}$, $\\vec{c}$가 $\\vec{a}+\\vec{b}+\\vec{c}=\\vec{0}$, $|\\vec{a}|=3$, $|\\vec{b}|=4$, $|\\vec{c}|=5$를 만족시킬 때, $\\vec{a}\\cdot\\vec{b}+\\vec{b}\\cdot\\vec{c}+\\vec{c}\\cdot\\vec{a}$의 값을 구하십시오.',
        answer: '-25',
        hint: '$|\\vec{a}+\\vec{b}+\\vec{c}|^2=0$을 전개합니다.',
        wrong: [
          { a: '25', why: '부호를 놓쳤습니다. $0=50+2(\\vec{a}\\cdot\\vec{b}+\\vec{b}\\cdot\\vec{c}+\\vec{c}\\cdot\\vec{a})$입니다.' },
          { a: '-50', why: '전개에서 생기는 2를 나누지 않았습니다.' },
        ],
        explain: '$0=|\\vec{a}+\\vec{b}+\\vec{c}|^2=|\\vec{a}|^2+|\\vec{b}|^2+|\\vec{c}|^2+2(\\vec{a}\\cdot\\vec{b}+\\vec{b}\\cdot\\vec{c}+\\vec{c}\\cdot\\vec{a})$이므로 $0=50+2S$, $S=-25$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 0,
        q: '원점 $\\mathrm{O}$와 점 $\\mathrm{A}(3, 4)$가 있습니다. 점 $\\mathrm{P}$가 원 $x^2+y^2=1$ 위를 움직일 때, $\\overrightarrow{\\mathrm{OP}}\\cdot\\overrightarrow{\\mathrm{OA}}$의 최댓값을 구하십시오.',
        answer: '5',
        hint: '$|\\overrightarrow{\\mathrm{OP}}|=1$, $|\\overrightarrow{\\mathrm{OA}}|=5$로 일정합니다. 남은 것은 $\\cos\\theta$뿐입니다.',
        wrong: [
          { a: '7', why: '$\\mathrm{A}$의 두 성분을 더하기만 했습니다. $|\\overrightarrow{\\mathrm{OP}}|=1$이므로 내적은 $5\\cos\\theta$이고, 그 최댓값을 구합니다.' },
          { a: '25', why: '$|\\overrightarrow{\\mathrm{OA}}|^2$을 구했습니다. $|\\overrightarrow{\\mathrm{OP}}|=1$입니다.' },
        ],
        explain: '$\\overrightarrow{\\mathrm{OP}}\\cdot\\overrightarrow{\\mathrm{OA}}=|\\overrightarrow{\\mathrm{OP}}||\\overrightarrow{\\mathrm{OA}}|\\cos\\theta=1\\times5\\times\\cos\\theta$이므로 $\\theta=0$, 곧 $\\mathrm{P}\\left(\\dfrac{3}{5}, \\dfrac{4}{5}\\right)$일 때 최댓값 5를 가집니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 4,
        q: '벡터 $\\vec{a}=(1, 2)$에 수직이고 크기가 $\\sqrt{5}$이며 $x$성분이 양수인 벡터는 무엇입니까?',
        choices: ['$(2, -1)$', '$(-2, 1)$', '$(1, 2)$', '$(4, -2)$'],
        answer: 0,
        why: [
          '',
          '수직이고 크기도 맞지만 $x$성분이 음수입니다.',
          '크기는 $\\sqrt{5}$이지만 $\\vec{a}$ 자신이므로 평행합니다.',
          '수직이지만 크기가 $\\sqrt{20}=2\\sqrt{5}$입니다.',
        ],
        hint: '구하는 벡터를 $(x, y)$로 놓고 수직 조건과 크기 조건을 씁니다.',
        explain: '$(x, y)$라 하면 $x+2y=0$, $x^2+y^2=5$입니다. $x=-2y$를 넣으면 $5y^2=5$, $y=\\pm1$이고 $x$가 양수이므로 $y=-1$, $x=2$입니다. 답은 $(2, -1)$입니다.',
      },
    ],

    deeper: [
      {
        title: '내적이 쓰이는 곳 — 일, 정사영, 부등식',
        body: '물리에서 힘 $\\vec{F}$로 물체를 $\\vec{s}$만큼 옮길 때 한 **일**은 $W=\\vec{F}\\cdot\\vec{s}=|\\vec{F}||\\vec{s}|\\cos\\theta$입니다. 이동 방향과 수직인 힘은 일을 하지 않습니다($\\cos90^\\circ=0$).\n\n또 $\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}=|\\vec{a}|\\cos\\theta$는 $\\vec{a}$를 $\\vec{b}$의 방향으로 **정사영**한 길이(부호 포함)입니다. 앞에서 배운 정사영의 길이 $l\\cos\\theta$와 같은 생각입니다.\n\n$|\\cos\\theta|\\le1$이므로 언제나 $|\\vec{a}\\cdot\\vec{b}|\\le|\\vec{a}||\\vec{b}|$가 성립합니다. 성분으로 쓰면 $(a_1b_1+a_2b_2)^2\\le(a_1^2+a_2^2)(b_1^2+b_2^2)$, 곧 **코시-슈바르츠 부등식**입니다.\n\n다음 단원에서는 내적이 0이라는 수직 조건으로 직선의 방정식(법선벡터)을 세웁니다.',
      },
    ],

    faq: [
      {
        q: '내적의 결과는 왜 벡터가 아니고 그냥 수예요?',
        a: '내적은 "두 벡터가 같은 방향으로 얼마나 함께 가는가"를 재도록 정의한 값이라서 방향이 없는 실수입니다. 크기 $|\\vec{a}|$, $|\\vec{b}|$와 $\\cos\\theta$가 모두 수이니 곱도 수입니다. 그래서 $(\\vec{a}\\cdot\\vec{b})\\cdot\\vec{c}$처럼 내적의 결과에 다시 내적을 할 수는 없습니다.',
      },
      {
        q: '각을 구하는데 cos 값이 음수가 나왔어요. 계산이 틀린 건가요?',
        a: '틀린 것이 아닙니다. 두 벡터가 이루는 각은 $0$부터 $\\pi$($180^\\circ$)까지이고, 둔각이면 $\\cos\\theta$가 음수입니다. 예를 들어 $\\cos\\theta=-\\dfrac{1}{2}$이면 $\\theta=120^\\circ$입니다.',
      },
      {
        q: '내적이 0이면 둘 중 하나는 영벡터인 거 아니에요?',
        a: '수의 곱셈과 달리 그렇지 않습니다. $(1, 0)\\cdot(0, 1)=0$처럼 영벡터가 아닌 두 벡터도 서로 수직이면 내적이 0입니다. 그래서 내적이 0이라는 조건이 수직을 알아보는 데 쓰입니다.',
      },
    ],

    mistakes: [
      '$\\overrightarrow{\\mathrm{AB}}\\cdot\\overrightarrow{\\mathrm{BC}}$에서 도형의 내각을 그대로 이루는 각으로 쓰는 실수 — 두 벡터의 시점을 맞춘 뒤 각을 잽니다(정삼각형이면 $120^\\circ$).',
      '$|\\vec{a}+\\vec{b}|^2=|\\vec{a}|^2+|\\vec{b}|^2$처럼 계산하는 실수 — 가운데 항 $2\\vec{a}\\cdot\\vec{b}$가 있습니다.',
      '성분으로 내적을 구할 때 음수 성분의 부호를 놓치는 실수 — $(-2)\\times4=-8$처럼 곱마다 부호를 확인합니다.',
    ],

    gens: [
      {
        id: 'dot-comp',
        level: 1,
        title: '성분으로 내적 계산하기',
        make: function (R) {
          var dim = R.pick([2, 3, 3]);
          var a, b;
          do {
            a = []; b = [];
            for (var i = 0; i < dim; i++) { a.push(R.int(-5, 5)); b.push(R.int(-5, 5)); }
          } while (a.filter(function (x) { return x !== 0; }).length < dim - 1 || b.filter(function (x) { return x !== 0; }).length < dim - 1);
          var ans = dot(a, b);
          var wrong = [], seen = {};
          function addW(v, why) { var s = String(v); if (v !== ans && !seen[s]) { seen[s] = 1; wrong.push({ a: s, why: why }); } }
          addW(a.reduce(function (s, x, i) { return s + Math.abs(x * b[i]); }, 0), '음수인 곱의 부호를 놓쳤습니다. 곱마다 부호를 확인합니다.');
          addW(a.reduce(function (s, x, i) { return s + x + b[i]; }, 0), '성분끼리 더했습니다. 내적은 같은 자리의 성분끼리 곱하여 더합니다.');
          if (dim === 2) addW(a[0] * b[1] + a[1] * b[0], '성분을 엇갈려 곱했습니다. 같은 자리끼리($x$성분끼리, $y$성분끼리) 곱합니다.');
          return {
            type: 'short', check: 'number', concept: 1,
            q: '$\\vec{a}=' + vt(a) + '$, $\\vec{b}=' + vt(b) + '$일 때, $\\vec{a}\\cdot\\vec{b}$의 값을 구하십시오.',
            answer: String(ans),
            wrong: wrong,
            explain: '같은 자리의 성분끼리 곱하여 더합니다.\n\n$\\vec{a}\\cdot\\vec{b}=' + prodTex(a, b) + '=' + ans + '$',
          };
        },
      },
      {
        id: 'perp-k',
        level: 1,
        title: '수직 조건으로 미지수 구하기',
        make: function (R) {
          var dim = R.pick([2, 3, 3]);
          var a, b, j, s, k;
          do {
            a = []; b = [];
            for (var i = 0; i < dim; i++) { a.push(R.nonzero(-4, 4)); b.push(R.int(-4, 4)); }
            j = R.int(0, dim - 1);
            b[j] = R.pick([1, -1, 2, -2, 3]);
            s = 0;
            for (var t = 0; t < dim; t++) if (t !== j) s += a[t] * b[t];
            k = -s / b[j];
          } while (k !== Math.round(k) || k === 0);
          var aShow = a.map(function (x, i) { return i === j ? 'k' : String(x); });
          var terms = a.map(function (x, i) {
            var bb = b[i] < 0 ? '(' + b[i] + ')' : b[i];
            return (i === j ? 'k' : (x < 0 ? '(' + x + ')' : x)) + '\\times' + bb;
          }).join('+');
          var wrong = [], seen = {};
          function addW(v, why) { var st = String(v); if (v !== k && !seen[st]) { seen[st] = 1; wrong.push({ a: st, why: why }); } }
          addW(-k, '이항할 때 부호를 놓쳤습니다. 식을 다시 정리해 봅니다.');
          addW(-s, '$k$에 곱해지는 수 $' + b[j] + '$' + R.josa(b[j], '을/를') + ' 빠뜨렸습니다.');
          return {
            type: 'short', check: 'number', concept: 4,
            q: '두 벡터 $\\vec{a}=(' + aShow.join(', ') + ')$, $\\vec{b}=' + vt(b) + '$에 대하여 $\\vec{a}$와 $\\vec{b}$가 서로 수직일 때, 실수 $k$의 값을 구하십시오.',
            answer: String(k),
            wrong: wrong,
            explain: '수직이면 내적이 0입니다.\n\n$\\vec{a}\\cdot\\vec{b}=' + terms + '=' + R.fmt.poly([b[j], s], 'k') + '=0$\n\n따라서 $k=' + k + '$입니다.',
          };
        },
      },
      {
        id: 'angle-vec',
        level: 2,
        title: '성분으로 두 벡터가 이루는 각 구하기',
        make: function (R) {
          var P3 = [
            [[1, 1, 0], [0, 1, 1], 60], [[2, 1, -1], [1, 2, 1], 60], [[1, 0, 1], [1, 1, 0], 60],
            [[1, 1, 0], [1, 0, 0], 45], [[0, 3, 4], [0, 7, 1], 45],
            [[1, 2, 2], [2, 1, -2], 90], [[1, -1, 2], [3, 1, -1], 90], [[2, 3, 1], [1, -1, 1], 90],
            [[1, 1, 0], [-1, 0, 1], 120], [[2, 1, -1], [-1, -2, -1], 120],
            [[1, 1, 0], [-1, 0, 0], 135], [[0, 3, 4], [0, -7, -1], 135],
            [[1, 1, 2], [4, 5, 3], 30], [[1, 2, 3], [4, 1, 5], 30],
            [[1, 1, 2], [-5, -4, -3], 150], [[1, 2, 3], [-4, -1, -5], 150],
            [[1, 1, 4], [-1, 2, 2], 45], [[1, 2, 2], [1, -1, -4], 135],
          ];
          var P2 = [
            [[3, 1], [1, 2], 45], [[1, 3], [2, 1], 45], [[1, -2], [3, -1], 45],
            [[2, 1], [-1, 2], 90], [[3, 1], [-1, 3], 90],
            [[3, 1], [-1, -2], 135], [[1, 0], [-1, 1], 135], [[1, 2], [-3, -1], 135],
          ];
          var base = R.bool(0.6) ? R.pick(P3) : R.pick(P2);
          var dim = base[0].length, th = base[2];
          var perm = R.shuffle(dim === 3 ? [0, 1, 2] : [0, 1]);
          var sg = perm.map(function () { return R.sign(); });
          var ka = R.pick([1, 1, 2]), kb = R.pick([1, 1, 2]);
          var a = perm.map(function (p, i) { return sg[i] * ka * base[0][p] || 0; });
          var b = perm.map(function (p, i) { return sg[i] * kb * base[1][p] || 0; });
          if (R.bool()) { var tmp = a; a = b; b = tmp; }
          var d = dot(a, b), A2 = sumSq(a), B2 = sumSq(b);
          var pool = ANGLES.filter(function (x) { return x !== th && x !== 180 - th; });
          var wrongs = (th !== 90 ? [180 - th] : []).concat(R.sample(pool, th !== 90 ? 2 : 3));
          var opts = [th].concat(wrongs).sort(function (x, y) { return x - y; });
          var why = opts.map(function (w) {
            if (w === th) return '';
            if (w === 180 - th) return '내적 $' + d + '$의 부호를 놓쳤습니다. $\\cos\\theta$의 부호가 각이 예각인지 둔각인지를 정합니다.';
            if (w === 90) return '내적이 0일 때가 $90^\\circ$입니다. 이 두 벡터의 내적은 $' + d + '$입니다.';
            return '$\\cos' + w + '^\\circ=' + COS[w] + '$입니다. 구한 $\\cos\\theta$의 값과 비교해 봅니다.';
          });
          return {
            type: 'choice', fixed: true, concept: 3,
            q: '두 벡터 $\\vec{a}=' + vt(a) + '$, $\\vec{b}=' + vt(b) + '$에 대하여 $\\vec{a}$와 $\\vec{b}$가 이루는 각의 크기를 고르십시오.',
            choices: opts.map(deg),
            answer: opts.indexOf(th),
            why: why,
            explain: '$\\vec{a}\\cdot\\vec{b}=' + prodTex(a, b) + '=' + d + '$, $|\\vec{a}|=' + rootTex(A2) + '$, $|\\vec{b}|=' + rootTex(B2) + '$\n\n$\\cos\\theta=\\dfrac{' + d + '}{' + rootTex(A2) + '\\times' + rootTex(B2) + '}=' + COS[th] + '$이므로 $\\theta=' + th + '^\\circ$입니다.',
          };
        },
      },
      {
        id: 'angle-from-norm',
        level: 3,
        title: '크기 조건에서 내적과 이루는 각 구하기',
        make: function (R) {
          var p = R.int(1, 5), q = R.int(2, 6);
          var th = R.pick([60, 90, 120]);
          var plus = R.bool();
          var pq2 = th === 60 ? p * q : (th === 120 ? -p * q : 0); // 2|a||b|cosθ = 2a·b
          var r = p * p + q * q + (plus ? pq2 : -pq2);
          var D = pq2 / 2;   // a·b (정수가 아닐 수 있다)
          var Dt = R.F(pq2, 2).toTex();
          var op = plus ? '+' : '-';
          var pool = ANGLES.filter(function (x) { return x !== th && x !== 180 - th; });
          var wrongs = (th !== 90 ? [180 - th] : []).concat(R.sample(pool, th !== 90 ? 2 : 3));
          var opts = [th].concat(wrongs).sort(function (x, y) { return x - y; });
          var why = opts.map(function (w) {
            if (w === th) return '';
            if (w === 180 - th) return '$|\\vec{a}' + op + '\\vec{b}|^2=|\\vec{a}|^2' + op + '2\\vec{a}\\cdot\\vec{b}+|\\vec{b}|^2$에서 가운데 항의 부호를 잘못 써서 내적의 부호가 바뀌었습니다.';
            if (w === 90) return '내적이 0일 때가 $90^\\circ$입니다. 전개하여 구한 내적은 $' + Dt + '$입니다.';
            return '$\\cos' + w + '^\\circ=' + COS[w] + '$입니다. $\\cos\\theta=\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}$를 다시 계산해 봅니다.';
          });
          return {
            type: 'choice', fixed: true, concept: 3,
            q: '$|\\vec{a}|=' + p + '$, $|\\vec{b}|=' + q + '$, $|\\vec{a}' + op + '\\vec{b}|=' + rootTex(r) + '$일 때, 두 벡터 $\\vec{a}$, $\\vec{b}$가 이루는 각의 크기를 고르십시오.',
            choices: opts.map(deg),
            answer: opts.indexOf(th),
            why: why,
            hint: '주어진 크기를 제곱하여 내적으로 전개합니다.',
            explain: '$|\\vec{a}' + op + '\\vec{b}|^2=|\\vec{a}|^2' + op + '2\\vec{a}\\cdot\\vec{b}+|\\vec{b}|^2$이므로 $' + r + '=' + (p * p) + op + '2\\vec{a}\\cdot\\vec{b}+' + (q * q) + '$, $\\vec{a}\\cdot\\vec{b}=' + Dt + '$입니다.\n\n$\\cos\\theta=\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}=' + R.F(pq2, 2 * p * q).toTex() + '$이므로 $\\theta=' + th + '^\\circ$입니다.' + (D === 0 ? ' (내적이 0이므로 두 벡터는 수직입니다.)' : ''),
          };
        },
      },
    ],
  });
})();
