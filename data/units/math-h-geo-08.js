/* 기하 · 벡터의 뜻과 연산
 * 벡터의 뜻과 크기, 서로 같은 벡터, 영벡터·단위벡터, 벡터의 덧셈(삼각형법·평행사변형법)과 뺄셈,
 * 실수배와 두 벡터의 평행, 연산 법칙을 다룬다. (위치벡터·성분·내적은 다음 단원)
 * 그림: 화살표는 아래 도우미(arrowFig)가 직접 그린 svg */
(function () {
  var C1 = 'var(--fig-1, #2563eb)', C2 = 'var(--fig-2, #f59e0b)', C4 = 'var(--fig-4, #ef4444)';

  // ---------- 그림 도우미 ----------
  function r1(v) { var t = Math.round(v * 10) / 10; return t === 0 ? 0 : t; }
  function txt(q, s, color, italic) {
    return '<text x="' + r1(q[0]) + '" y="' + r1(q[1]) + '" font-size="14" text-anchor="middle" dominant-baseline="central" fill="' + (color || 'currentColor') + '"' +
      (italic ? ' font-style="italic"' : '') + '>' + s + '</text>';
  }
  /* 평면 위 화살표 그림
     o.arrows: [{ from: [x,y], to: [x,y], label?, color?, dash?, off?: [dx,dy] }]   (label 은 화살표 가운데 옆)
     o.lines:  [{ from, to, dash? }]       화살촉 없는 선
     o.pts:    [{ p: [x,y], label, off?: [dx,dy] }] */
  function arrowFig(o, alt) {
    var all = [];
    (o.arrows || []).forEach(function (a) { all.push(a.from, a.to); });
    (o.lines || []).forEach(function (a) { all.push(a.from, a.to); });
    (o.pts || []).forEach(function (q) { all.push(q.p); });
    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    all.forEach(function (q) { minX = Math.min(minX, q[0]); maxX = Math.max(maxX, q[0]); minY = Math.min(minY, q[1]); maxY = Math.max(maxY, q[1]); });
    var M = 26, W = o.width || 260, sc = (W - 2 * M) / Math.max(maxX - minX, 1e-6);
    if ((maxY - minY) * sc > 200) sc = 200 / (maxY - minY);
    var cw = (maxX - minX) * sc;
    W = Math.max(Math.round(cw + 2 * M), 200);
    var ox = (W - cw) / 2, H = Math.round((maxY - minY) * sc + 2 * M);
    function P(p) { return [ox + (p[0] - minX) * sc, M + (maxY - p[1]) * sc]; }
    var body = '';
    (o.lines || []).forEach(function (l) {
      var a = P(l.from), b = P(l.to);
      body += '<line x1="' + r1(a[0]) + '" y1="' + r1(a[1]) + '" x2="' + r1(b[0]) + '" y2="' + r1(b[1]) + '" stroke="currentColor" stroke-width="1.3"' + (l.dash ? ' stroke-dasharray="5 4"' : '') + '/>';
    });
    (o.arrows || []).forEach(function (ar) {
      var a = P(ar.from), b = P(ar.to), dx = b[0] - a[0], dy = b[1] - a[1], L = Math.sqrt(dx * dx + dy * dy) || 1;
      var ux = dx / L, uy = dy / L, nx = -uy, ny = ux, col = ar.color || 'currentColor';
      var e = [b[0] - 9 * ux, b[1] - 9 * uy];
      body += '<line x1="' + r1(a[0]) + '" y1="' + r1(a[1]) + '" x2="' + r1(e[0]) + '" y2="' + r1(e[1]) + '" stroke="' + col + '" stroke-width="2.2"' + (ar.dash ? ' stroke-dasharray="6 4"' : '') + ' stroke-linecap="round"/>';
      body += '<path d="M ' + r1(b[0]) + ' ' + r1(b[1]) + ' L ' + r1(b[0] - 11 * ux + 5 * nx) + ' ' + r1(b[1] - 11 * uy + 5 * ny) + ' L ' + r1(b[0] - 11 * ux - 5 * nx) + ' ' + r1(b[1] - 11 * uy - 5 * ny) + ' Z" fill="' + col + '"/>';
      if (ar.label) {
        var off = ar.off || [12 * nx, 12 * ny];
        body += txt([(a[0] + b[0]) / 2 + off[0], (a[1] + b[1]) / 2 + off[1]], ar.label, col, true);
      }
    });
    (o.pts || []).forEach(function (q) {
      var s = P(q.p), off = q.off || [0, -12];
      body += '<circle cx="' + r1(s[0]) + '" cy="' + r1(s[1]) + '" r="2.5" fill="currentColor"/>' + txt([s[0] + off[0], s[1] + off[1]], q.label);
    });
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' ' + H + '">' + body + '</svg>', alt: alt };
  }
  // 정육각형 ABCDEF 와 중심 O (꼭짓점 좌표)
  var S3 = Math.sqrt(3);
  var HEX = { A: [2, 0], B: [1, S3], C: [-1, S3], D: [-2, 0], E: [-1, -S3], F: [1, -S3], O: [0, 0] };
  var HEX_OFF = { A: [12, 0], B: [8, -10], C: [-8, -10], D: [-12, 0], E: [-8, 10], F: [8, 10], O: [-4, 13] };
  function hexFig(arrows, alt) {
    var ks = ['A', 'B', 'C', 'D', 'E', 'F'], lines = [];
    ks.forEach(function (k, i) { lines.push({ from: HEX[k], to: HEX[ks[(i + 1) % 6]] }); });
    ['A', 'B', 'C'].forEach(function (k, i) { lines.push({ from: HEX[k], to: HEX[ks[i + 3]], dash: true }); });
    return arrowFig({
      lines: lines,
      arrows: arrows || [],
      pts: ks.concat(['O']).map(function (k) { return { p: HEX[k], label: k, off: HEX_OFF[k] }; }),
      width: 240,
    }, alt);
  }

  // ---------- 식 글자 ----------
  // m a + n b → TeX (vec 글자: \vec{a}, \vec{b})
  function coefTex(c, first) {
    var s = '';
    if (c < 0) s = '-'; else if (!first) s = '+';
    var ab = Math.abs(c);
    return s + (ab === 1 ? '' : ab);
  }
  function vexp(m, n) {
    if (m === 0 && n === 0) return '\\vec{0}';
    var s = '';
    if (m !== 0) s += coefTex(m, true) + '\\vec{a}';
    if (n !== 0) s += coefTex(n, s === '') + '\\vec{b}';
    return s;
  }
  function ov(s) { return '\\overrightarrow{' + s + '}'; }

  Tutor.registerUnit({
    id: 'math-h-geo-08',
    course: 'math-h-geo',
    title: '벡터의 뜻과 연산',
    summary: '크기와 방향을 함께 가진 벡터의 뜻을 알고, 벡터의 덧셈·뺄셈·실수배를 그림과 식으로 계산하며, 두 벡터가 평행할 조건을 이해합니다.',
    goals: [
      '벡터의 뜻과 크기를 알고, 서로 같은 벡터·영벡터·단위벡터를 구별할 수 있다.',
      '삼각형법과 평행사변형법으로 벡터를 더하고, 벡터의 뺄셈을 할 수 있다.',
      '벡터의 실수배를 이해하고, 두 벡터가 평행할 조건을 이용할 수 있다.',
      '벡터의 연산 법칙을 이용하여 식을 간단히 할 수 있다.',
    ],
    standards: ['[12기하03-01]'],

    concepts: [
      {
        title: '벡터의 뜻과 서로 같은 벡터',
        body: '길이, 넓이, 온도처럼 크기만으로 정해지는 양을 **스칼라**, 속도나 힘처럼 **크기와 방향**을 함께 가진 양을 **벡터**라고 합니다.\n\n점 A에서 점 B로 향하는 방향이 주어진 선분 AB를 **유향선분**이라 하고, A를 **시점**, B를 **종점**이라고 합니다. 유향선분 AB가 나타내는 벡터를 $\\overrightarrow{AB}$로 쓰고, 한 문자로 $\\vec{a}$처럼 쓰기도 합니다.\n\n- **벡터의 크기**: 선분 AB의 길이. $|\\overrightarrow{AB}|$, $|\\vec{a}|$로 나타냅니다.\n- **서로 같은 벡터**: 크기와 방향이 각각 같으면 시점의 위치가 달라도 같은 벡터입니다. $\\vec{a}=\\vec{b}$\n- **영벡터**: 시점과 종점이 같은 벡터. 크기가 0이고 $\\vec{0}$으로 나타냅니다. 방향은 생각하지 않습니다.\n- **역벡터**: $\\vec{a}$와 크기가 같고 방향이 반대인 벡터를 $-\\vec{a}$로 나타냅니다. $\\overrightarrow{BA}=-\\overrightarrow{AB}$\n- **단위벡터**: 크기가 1인 벡터\n\n예: 평행사변형 ABCD에서 $\\overrightarrow{AB}=\\overrightarrow{DC}$, $\\overrightarrow{AD}=\\overrightarrow{BC}$입니다. 그러나 $\\overrightarrow{AB}$와 $\\overrightarrow{CD}$는 방향이 반대이므로 $\\overrightarrow{CD}=-\\overrightarrow{AB}$입니다.',
        easy: '"동쪽으로 3 km 걸어라"와 "3 km 걸어라"는 다릅니다. 앞의 것은 어디로 가는지까지 알려 줍니다. 이렇게 크기와 방향을 함께 담은 것이 벡터이고, 화살표로 그립니다.\n\n화살표를 종이 위에서 방향을 바꾸지 않고 다른 곳으로 옮겨도 "동쪽으로 3 km"라는 뜻은 그대로입니다. 그래서 시점이 달라도 크기와 방향이 같으면 같은 벡터로 봅니다.',
        fig: arrowFig({
          lines: [{ from: [0, 0], to: [1.5, 2.2], dash: true }, { from: [4, 0], to: [5.5, 2.2], dash: true }],
          arrows: [{ from: [0, 0], to: [4, 0], color: C4, off: [0, 14] }, { from: [1.5, 2.2], to: [5.5, 2.2], color: C4, off: [0, -14] }],
          pts: [{ p: [0, 0], label: 'A', off: [-10, 8] }, { p: [4, 0], label: 'B', off: [10, 8] }, { p: [5.5, 2.2], label: 'C', off: [10, -6] }, { p: [1.5, 2.2], label: 'D', off: [-10, -6] }],
        }, '평행사변형 ABCD. 화살표 AB와 화살표 DC는 크기와 방향이 같다'),
        check: {
          type: 'choice',
          q: '평행사변형 ABCD에서 $\\overrightarrow{AB}$와 같은 벡터는 무엇입니까?',
          choices: ['$\\overrightarrow{DC}$', '$\\overrightarrow{CD}$', '$\\overrightarrow{BA}$'],
          answer: 0,
          why: ['', '크기는 같지만 방향이 반대입니다. $\\overrightarrow{CD}=-\\overrightarrow{AB}$입니다.', '시점과 종점이 바뀌어 방향이 반대입니다. $\\overrightarrow{BA}=-\\overrightarrow{AB}$입니다.'],
          explain: '평행사변형에서 변 AB와 변 DC는 길이가 같고 평행하며, A→B와 D→C의 방향이 같습니다. 따라서 $\\overrightarrow{AB}=\\overrightarrow{DC}$입니다.',
        },
      },
      {
        title: '벡터의 덧셈',
        body: '**삼각형법** 두 벡터 $\\vec{a}$, $\\vec{b}$에 대하여 $\\vec{a}=\\overrightarrow{AB}$가 되도록 점 A, B를 잡고, $\\vec{b}=\\overrightarrow{BC}$가 되도록 점 C를 잡을 때 $\\overrightarrow{AC}$를 $\\vec{a}$와 $\\vec{b}$의 합이라 하고 $\\vec{a}+\\vec{b}$로 나타냅니다.\n\n$\\overrightarrow{AB}+\\overrightarrow{BC}=\\overrightarrow{AC}$\n\n앞 벡터의 종점에서 다음 벡터가 시작하면, 처음 시점에서 마지막 종점으로 가는 벡터가 합입니다. 여러 개도 이어서 더할 수 있습니다. $\\overrightarrow{AB}+\\overrightarrow{BC}+\\overrightarrow{CD}=\\overrightarrow{AD}$\n\n**평행사변형법** $\\vec{a}=\\overrightarrow{AB}$, $\\vec{b}=\\overrightarrow{AD}$처럼 시점이 같으면, 평행사변형 ABCD를 만들 때 대각선 $\\overrightarrow{AC}$가 $\\vec{a}+\\vec{b}$입니다. $\\overrightarrow{AD}=\\overrightarrow{BC}$이므로 삼각형법과 같은 결과입니다.\n\n또 $\\vec{a}+\\vec{0}=\\vec{a}$, $\\vec{a}+(-\\vec{a})=\\vec{0}$입니다.\n\n> ⚠️ 일반적으로 $|\\vec{a}+\\vec{b}| \\ne |\\vec{a}|+|\\vec{b}|$입니다. 크기는 삼각형의 변의 길이처럼 계산합니다.',
        easy: '서울에서 대전까지 가고, 대전에서 부산까지 가면 결과적으로 서울에서 부산으로 간 것입니다. 중간에 어디를 거쳤든 "처음 출발한 곳 → 마지막 도착한 곳"이 합입니다.\n\n그래서 화살표를 꼬리에 머리를 잇듯 이어 붙이고, 첫 화살표의 꼬리에서 마지막 화살표의 머리까지 새 화살표를 그리면 그것이 합입니다.',
        fig: arrowFig({
          arrows: [
            { from: [0, 0], to: [3.5, 0.8], label: 'a', color: C1, off: [0, 14] },
            { from: [3.5, 0.8], to: [4.6, 3], label: 'b', color: C2, off: [12, 0] },
            { from: [0, 0], to: [4.6, 3], label: 'a+b', color: C4, off: [-16, -8] },
          ],
          pts: [{ p: [0, 0], label: 'A', off: [-10, 8] }, { p: [3.5, 0.8], label: 'B', off: [10, 10] }, { p: [4.6, 3], label: 'C', off: [8, -10] }],
        }, '삼각형법. 벡터 a=AB, b=BC를 이어 그리면 a+b=AC이다'),
        check: {
          type: 'choice',
          q: '$\\overrightarrow{AB}+\\overrightarrow{BC}+\\overrightarrow{CD}$와 같은 벡터는 무엇입니까?',
          choices: ['$\\overrightarrow{AD}$', '$\\overrightarrow{DA}$', '$\\overrightarrow{AC}$'],
          answer: 0,
          why: ['', '방향이 반대입니다. 처음 시점 A에서 마지막 종점 D로 가는 벡터가 합입니다.', '$\\overrightarrow{CD}$를 더하지 않았습니다. $\\overrightarrow{AC}+\\overrightarrow{CD}=\\overrightarrow{AD}$입니다.'],
          explain: '앞 벡터의 종점과 다음 벡터의 시점이 이어지므로 $\\overrightarrow{AB}+\\overrightarrow{BC}+\\overrightarrow{CD}=\\overrightarrow{AD}$입니다.',
        },
      },
      {
        title: '벡터의 뺄셈',
        body: '$\\vec{a}-\\vec{b}$는 $\\vec{a}$에 $\\vec{b}$의 역벡터를 더한 것으로 정합니다.\n\n$\\vec{a}-\\vec{b}=\\vec{a}+(-\\vec{b})$\n\n**시점이 같을 때** $\\vec{a}=\\overrightarrow{OA}$, $\\vec{b}=\\overrightarrow{OB}$이면\n\n$\\vec{a}-\\vec{b}=\\overrightarrow{OA}-\\overrightarrow{OB}=\\overrightarrow{BA}$\n\n곧 $\\vec{b}$의 종점 B에서 $\\vec{a}$의 종점 A로 가는 벡터입니다. 확인: $\\overrightarrow{OB}+\\overrightarrow{BA}=\\overrightarrow{OA}$이므로 $\\overrightarrow{BA}=\\overrightarrow{OA}-\\overrightarrow{OB}$입니다.\n\n이 관계를 거꾸로 쓰면 매우 자주 쓰는 식이 됩니다.\n\n$\\overrightarrow{AB}=\\overrightarrow{OB}-\\overrightarrow{OA}$ (종점 쪽 − 시점 쪽)\n\n또 $\\vec{a}-\\vec{a}=\\vec{0}$입니다.\n\n> ⚠️ $\\overrightarrow{OA}-\\overrightarrow{OB}$를 $\\overrightarrow{AB}$로 쓰는 실수가 많습니다. 빼는 벡터의 종점에서 출발합니다.',
        easy: '$\\vec{a}-\\vec{b}$는 "$\\vec{b}$에 무엇을 더하면 $\\vec{a}$가 될까?"의 답입니다. 같은 점 O에서 출발한 두 화살표가 있을 때, $\\vec{b}$의 끝에서 $\\vec{a}$의 끝으로 가는 화살표를 $\\vec{b}$에 이어 붙이면 $\\vec{a}$가 됩니다. 그 화살표가 $\\vec{a}-\\vec{b}$입니다.',
        fig: arrowFig({
          arrows: [
            { from: [0, 0], to: [4, 2.6], label: 'a', color: C1, off: [-10, -10] },
            { from: [0, 0], to: [4.4, 0], label: 'b', color: C2, off: [0, 14] },
            { from: [4.4, 0], to: [4, 2.6], label: 'a−b', color: C4, off: [22, 0] },
          ],
          pts: [{ p: [0, 0], label: 'O', off: [-10, 8] }, { p: [4, 2.6], label: 'A', off: [-6, -12] }, { p: [4.4, 0], label: 'B', off: [10, 10] }],
        }, '시점이 같은 두 벡터 a=OA, b=OB와, B에서 A로 가는 벡터 a−b=BA'),
        check: {
          type: 'choice',
          q: '$\\overrightarrow{OB}-\\overrightarrow{OA}$와 같은 벡터는 무엇입니까?',
          choices: ['$\\overrightarrow{AB}$', '$\\overrightarrow{BA}$', '$\\overrightarrow{OA}$'],
          answer: 0,
          why: ['', '방향이 반대입니다. 빼는 벡터 $\\overrightarrow{OA}$의 종점 A에서 출발해 B로 갑니다.', '$\\overrightarrow{OA}+\\overrightarrow{AB}=\\overrightarrow{OB}$이므로 $\\overrightarrow{OB}$에서 $\\overrightarrow{OA}$를 빼면 $\\overrightarrow{AB}$가 남습니다.'],
          explain: '$\\overrightarrow{OA}+\\overrightarrow{AB}=\\overrightarrow{OB}$이므로 $\\overrightarrow{OB}-\\overrightarrow{OA}=\\overrightarrow{AB}$입니다.',
        },
      },
      {
        title: '벡터의 실수배와 두 벡터의 평행',
        body: '실수 $k$와 벡터 $\\vec{a}$에 대하여 $k\\vec{a}$를 다음과 같이 정합니다($\\vec{a} \\ne \\vec{0}$).\n\n- $k>0$이면 $\\vec{a}$와 **같은 방향**이고 크기가 $k|\\vec{a}|$인 벡터\n- $k<0$이면 $\\vec{a}$와 **반대 방향**이고 크기가 $|k||\\vec{a}|$인 벡터\n- $k=0$이면 $\\vec{0}$\n\n또 $\\vec{a}=\\vec{0}$이면 $k\\vec{a}=\\vec{0}$입니다. 어느 경우든 $|k\\vec{a}|=|k||\\vec{a}|$입니다.\n\n**두 벡터의 평행** 영벡터가 아닌 두 벡터 $\\vec{a}$, $\\vec{b}$의 방향이 같거나 반대일 때 $\\vec{a}$와 $\\vec{b}$는 평행하다 하고 $\\vec{a} \\parallel \\vec{b}$로 나타냅니다.\n\n$\\vec{a} \\parallel \\vec{b} \\iff \\vec{b}=k\\vec{a}$ (단, $k \\ne 0$인 실수)\n\n**쓰임**\n\n- $\\dfrac{\\vec{a}}{|\\vec{a}|}$는 $\\vec{a}$와 방향이 같은 단위벡터입니다.\n- 서로 다른 세 점 A, B, C가 한 직선 위에 있을 필요충분조건은 $\\overrightarrow{AC}=k\\overrightarrow{AB}$인 실수 $k$가 있는 것입니다.',
        easy: '$2\\vec{a}$는 $\\vec{a}$ 화살표를 같은 방향으로 두 배 늘인 것, $-\\vec{a}$는 방향만 뒤집은 것, $-3\\vec{a}$는 뒤집어서 세 배 늘인 것입니다.\n\n방향이 같거나 정반대인 화살표들은 모두 한 화살표를 늘이거나 줄이거나 뒤집어서 만들 수 있습니다. 그래서 "평행하다"는 "한쪽이 다른 쪽의 실수배"라는 뜻입니다.',
        fig: arrowFig({
          arrows: [
            { from: [0, 2.4], to: [1.5, 2.4], label: 'a', color: C1, off: [0, -13] },
            { from: [0, 1.2], to: [3, 1.2], label: '2a', color: C2, off: [0, -13] },
            { from: [1.5, 0], to: [0, 0], label: '−a', color: C4, off: [0, -13] },
          ],
          width: 220,
        }, '벡터 a, 같은 방향으로 크기가 두 배인 2a, 크기가 같고 방향이 반대인 −a'),
        check: {
          type: 'short', check: 'number',
          q: '$|\\vec{a}|=2$일 때, $|-3\\vec{a}|$의 값을 구하십시오.',
          answer: '6',
          wrong: [{ a: '-6', why: '크기는 음수가 될 수 없습니다. $|k\\vec{a}|=|k||\\vec{a}|$이므로 $|-3| \\times 2=6$입니다.' }],
          explain: '$|-3\\vec{a}|=|-3||\\vec{a}|=3 \\times 2=6$입니다. $-3\\vec{a}$는 방향이 반대이고 크기가 3배인 벡터입니다.',
        },
      },
      {
        title: '벡터의 연산 법칙',
        body: '세 벡터 $\\vec{a}$, $\\vec{b}$, $\\vec{c}$와 실수 $k$, $l$에 대하여 다음이 성립합니다.\n\n| 법칙 | 식 |\n|---|---|\n| 교환법칙 | $\\vec{a}+\\vec{b}=\\vec{b}+\\vec{a}$ |\n| 결합법칙 | $(\\vec{a}+\\vec{b})+\\vec{c}=\\vec{a}+(\\vec{b}+\\vec{c})$ |\n| 실수배의 결합 | $k(l\\vec{a})=(kl)\\vec{a}$ |\n| 분배법칙 | $(k+l)\\vec{a}=k\\vec{a}+l\\vec{a}$, $k(\\vec{a}+\\vec{b})=k\\vec{a}+k\\vec{b}$ |\n\n교환법칙은 평행사변형법에서 두 삼각형 경로(먼저 $\\vec{a}$, 다음 $\\vec{b}$ / 먼저 $\\vec{b}$, 다음 $\\vec{a}$)가 같은 대각선에 닿는다는 것과 같습니다.\n\n그래서 벡터의 덧셈·뺄셈·실수배는 **문자식처럼** 계산합니다.\n\n예: $2(\\vec{a}+3\\vec{b})-3(\\vec{a}-\\vec{b})=2\\vec{a}+6\\vec{b}-3\\vec{a}+3\\vec{b}=-\\vec{a}+9\\vec{b}$\n\n> 💡 $\\vec{a}$, $\\vec{b}$가 영벡터가 아니고 서로 평행하지 않으면 $m\\vec{a}+n\\vec{b}=m^{\\prime}\\vec{a}+n^{\\prime}\\vec{b}$일 때 $m=m^{\\prime}$, $n=n^{\\prime}$입니다. ($m \\ne m^{\\prime}$이면 $\\vec{a}$가 $\\vec{b}$의 실수배가 되어 평행이라는 모순이 생깁니다.)',
        easy: '$\\vec{a}$를 "사과", $\\vec{b}$를 "배"라고 생각해 봅시다. 사과 2개와 배 6개에서 사과 3개를 빼고 배 3개를 더하면 사과 $-1$개, 배 9개가 됩니다. 같은 종류끼리만 모으는 것이 문자식의 동류항 정리와 똑같습니다.\n\n다만 $\\vec{a}$와 $\\vec{b}$가 평행하지 않을 때는 사과와 배처럼 서로 바꿔 셀 수 없는 "다른 종류"입니다.',
        check: {
          type: 'choice',
          q: '$3(\\vec{a}+\\vec{b})-(\\vec{a}-2\\vec{b})$를 간단히 한 것은 무엇입니까?',
          choices: ['$2\\vec{a}+5\\vec{b}$', '$2\\vec{a}+\\vec{b}$', '$4\\vec{a}+\\vec{b}$'],
          answer: 0,
          why: ['', '괄호 앞의 빼기를 $-2\\vec{b}$에 곱하지 않았습니다. $-(-2\\vec{b})=+2\\vec{b}$입니다.', '두 번째 괄호를 빼지 않고 더했습니다.'],
          explain: '$3\\vec{a}+3\\vec{b}-\\vec{a}+2\\vec{b}=2\\vec{a}+5\\vec{b}$',
        },
      },
    ],

    examples: [
      {
        q: '정육각형 ABCDEF의 중심을 O라 하고 $\\overrightarrow{AB}=\\vec{a}$, $\\overrightarrow{AF}=\\vec{b}$라 할 때, $\\overrightarrow{AC}$와 $\\overrightarrow{AD}$를 $\\vec{a}$, $\\vec{b}$로 나타내십시오.',
        fig: hexFig([{ from: HEX.A, to: HEX.B, label: 'a', color: C1, off: [12, 6] }, { from: HEX.A, to: HEX.F, label: 'b', color: C2, off: [12, -6] }], '정육각형 ABCDEF와 중심 O. 벡터 a=AB, b=AF'),
        steps: [
          '정육각형은 중심 O를 지나는 대각선으로 나누면 정삼각형 6개가 됩니다. 사각형 ABOF는 마름모이므로 평행사변형법에 의하여 $\\overrightarrow{AO}=\\vec{a}+\\vec{b}$입니다.',
          '변 BC는 선분 AO와 길이가 같고 방향도 같으므로 $\\overrightarrow{BC}=\\overrightarrow{AO}=\\vec{a}+\\vec{b}$입니다.',
          '삼각형법에 의하여 $\\overrightarrow{AC}=\\overrightarrow{AB}+\\overrightarrow{BC}=\\vec{a}+(\\vec{a}+\\vec{b})=2\\vec{a}+\\vec{b}$',
          '대각선 AD는 중심 O를 지나고 $\\overline{AD}=2\\overline{AO}$이므로 $\\overrightarrow{AD}=2\\overrightarrow{AO}=2\\vec{a}+2\\vec{b}$',
        ],
        answer: '$\\overrightarrow{AC}=2\\vec{a}+\\vec{b}$, $\\overrightarrow{AD}=2\\vec{a}+2\\vec{b}$',
      },
      {
        q: '두 벡터 $\\vec{a}$, $\\vec{b}$가 영벡터가 아니고 서로 평행하지 않습니다. 두 벡터 $3\\vec{a}+(k-1)\\vec{b}$와 $6\\vec{a}+4\\vec{b}$가 평행할 때, 실수 $k$의 값을 구하십시오.',
        steps: [
          '평행하므로 $3\\vec{a}+(k-1)\\vec{b}=t(6\\vec{a}+4\\vec{b})$인 0이 아닌 실수 $t$가 있습니다.',
          '$\\vec{a}$, $\\vec{b}$가 평행하지 않으므로 계수끼리 같아야 합니다. $3=6t$, $k-1=4t$',
          '$t=\\frac{1}{2}$이므로 $k-1=2$, 곧 $k=3$입니다.',
        ],
        answer: '$k=3$',
      },
    ],

    terms: [
      { term: '벡터', def: '크기와 방향을 함께 가진 양입니다. 유향선분 AB가 나타내는 벡터를 $\\overrightarrow{AB}$로 씁니다.' },
      { term: '스칼라', def: '길이, 넓이, 질량처럼 크기만으로 정해지는 양입니다.' },
      { term: '시점과 종점', def: '유향선분 AB에서 출발점 A를 시점, 도착점 B를 종점이라고 합니다.' },
      { term: '벡터의 크기', def: '벡터를 나타내는 유향선분의 길이입니다. $|\\overrightarrow{AB}|=\\overline{AB}$' },
      { term: '서로 같은 벡터', def: '크기와 방향이 각각 같은 두 벡터입니다. 시점의 위치는 달라도 됩니다.' },
      { term: '영벡터', def: '시점과 종점이 같은 벡터입니다. 크기는 0이고 $\\vec{0}$으로 나타냅니다.' },
      { term: '단위벡터', def: '크기가 1인 벡터입니다. 영벡터가 아닌 $\\vec{a}$에 대하여 $\\frac{\\vec{a}}{|\\vec{a}|}$는 $\\vec{a}$와 방향이 같은 단위벡터입니다.' },
      { term: '역벡터', def: '어떤 벡터와 크기는 같고 방향이 반대인 벡터입니다. $\\vec{a}$의 역벡터는 $-\\vec{a}$입니다.' },
      { term: '벡터의 평행', def: '영벡터가 아닌 두 벡터의 방향이 같거나 반대일 때 평행하다고 합니다. $\\vec{b}=k\\vec{a}$ ($k \\ne 0$)와 같은 뜻입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 2, type: 'short', check: 'number', unit: '개', concept: 0,
        q: '정육각형 ABCDEF의 중심을 O라 합니다. 일곱 개의 점 A, B, C, D, E, F, O 가운데 두 점을 시점과 종점으로 하는 벡터 중에서 $\\overrightarrow{AB}$와 같은 벡터는 $\\overrightarrow{AB}$를 빼고 몇 개입니까?',
        fig: hexFig([{ from: HEX.A, to: HEX.B, color: C4 }], '정육각형 ABCDEF와 중심 O. 벡터 AB를 색으로 표시했다'),
        answer: '3',
        hint: '선분 AB와 평행하고 길이가 같은 선분을 찾은 뒤, 방향이 A→B와 같은지 확인하십시오.',
        wrong: [{ a: '7', why: '방향이 반대인 벡터($\\overrightarrow{BA}$, $\\overrightarrow{OF}$, $\\overrightarrow{CO}$, $\\overrightarrow{DE}$)까지 셌습니다. 같은 벡터는 방향도 같아야 합니다.' }],
        explain: '선분 AB와 평행하고 길이가 같은 선분은 FO, OC, ED입니다. 방향까지 같은 벡터는 $\\overrightarrow{FO}$, $\\overrightarrow{OC}$, $\\overrightarrow{ED}$의 3개입니다.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 0,
        q: '크기가 같은 두 벡터는 서로 같은 벡터입니다.',
        answer: false,
        explain: '서로 같은 벡터가 되려면 크기와 방향이 모두 같아야 합니다. 예를 들어 $\\overrightarrow{AB}$와 $\\overrightarrow{BA}$는 크기가 같지만 방향이 반대이므로 같은 벡터가 아닙니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '$\\overrightarrow{AB}+\\overrightarrow{BC}+\\overrightarrow{CA}$와 같은 벡터는 무엇입니까?',
        choices: ['$\\vec{0}$', '$\\overrightarrow{AC}$', '$\\overrightarrow{CA}$', '$2\\overrightarrow{AC}$'],
        answer: 0,
        why: ['', '$\\overrightarrow{CA}$를 더하는 것을 빠뜨렸습니다. $\\overrightarrow{AC}+\\overrightarrow{CA}=\\overrightarrow{AA}$입니다.', '마지막 벡터만 보았습니다. 처음 시점 A에서 마지막 종점 A로 가는 벡터가 합입니다.', '벡터를 크기처럼 더했습니다. 처음 시점과 마지막 종점이 같으므로 영벡터입니다.'],
        explain: '$\\overrightarrow{AB}+\\overrightarrow{BC}=\\overrightarrow{AC}$이고 $\\overrightarrow{AC}+\\overrightarrow{CA}=\\overrightarrow{AA}=\\vec{0}$입니다. 출발한 점으로 돌아오면 합은 영벡터입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 2,
        q: '$\\overrightarrow{AB}-\\overrightarrow{AC}$와 같은 벡터는 무엇입니까?',
        choices: ['$\\overrightarrow{CB}$', '$\\overrightarrow{BC}$', '$\\overrightarrow{CA}$', '$\\overrightarrow{AB}+\\overrightarrow{AC}$'],
        answer: 0,
        why: ['', '방향을 반대로 잡았습니다. 빼는 벡터 $\\overrightarrow{AC}$의 종점 C에서 $\\overrightarrow{AB}$의 종점 B로 갑니다.', '$\\overrightarrow{AB}$를 빠뜨렸습니다. $\\overrightarrow{CA}$는 $-\\overrightarrow{AC}$일 뿐입니다.', '뺄셈을 덧셈으로 바꾸었습니다.'],
        explain: '$\\overrightarrow{AB}-\\overrightarrow{AC}=\\overrightarrow{AB}+\\overrightarrow{CA}=\\overrightarrow{CA}+\\overrightarrow{AB}=\\overrightarrow{CB}$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 3,
        q: '$|\\vec{a}|=4$일 때, $\\left|-\\frac{1}{2}\\vec{a}\\right|$의 값을 구하십시오.',
        answer: '2',
        wrong: [{ a: '-2', why: '벡터의 크기는 음수가 될 수 없습니다. $\\left|-\\frac{1}{2}\\right| \\times 4=2$입니다.' }, { a: '8', why: '$\\frac{1}{2}$배가 아니라 2배로 계산했습니다.' }],
        explain: '$\\left|-\\frac{1}{2}\\vec{a}\\right|=\\left|-\\frac{1}{2}\\right||\\vec{a}|=\\frac{1}{2} \\times 4=2$',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 4,
        q: '$3(\\vec{a}-2\\vec{b})-2(\\vec{a}-4\\vec{b})$를 간단히 한 것은 무엇입니까?',
        choices: ['$\\vec{a}+2\\vec{b}$', '$\\vec{a}-14\\vec{b}$', '$5\\vec{a}-14\\vec{b}$', '$\\vec{a}-2\\vec{b}$'],
        answer: 0,
        why: ['', '$-2 \\times (-4\\vec{b})=+8\\vec{b}$를 $-8\\vec{b}$로 계산했습니다.', '두 번째 괄호 앞의 빼기를 더하기로 보았습니다.', '$-2(\\vec{a}-4\\vec{b})$에서 $-4\\vec{b}$에 $-2$를 곱하지 않고 $+4\\vec{b}$로 썼습니다.'],
        explain: '$3\\vec{a}-6\\vec{b}-2\\vec{a}+8\\vec{b}=\\vec{a}+2\\vec{b}$',
      },
      {
        id: 'p7', level: 1, type: 'ox', concept: 3,
        q: '영벡터가 아닌 벡터 $\\vec{a}$에 대하여 $\\dfrac{\\vec{a}}{|\\vec{a}|}$는 $\\vec{a}$와 방향이 같은 단위벡터입니다.',
        answer: true,
        explain: '$\\dfrac{1}{|\\vec{a}|}$은 양수이므로 방향은 $\\vec{a}$와 같고, 크기는 $\\dfrac{1}{|\\vec{a}|} \\times |\\vec{a}|=1$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 1,
        q: '$\\overline{AB}=6$, $\\overline{AD}=8$인 직사각형 ABCD에서 $|\\overrightarrow{AB}+\\overrightarrow{AD}|$의 값을 구하십시오.',
        fig: { type: 'polygon', points: [[0, 0], [6, 0], [6, 8], [0, 8]], labels: ['A', 'B', 'C', 'D'], sides: ['6', null, null, '8'], alt: '가로 6, 세로 8인 직사각형 ABCD' },
        answer: '10',
        hint: '시점이 같은 두 벡터의 합은 평행사변형법으로 생각하십시오.',
        wrong: [{ a: '14', why: '두 벡터의 크기를 그냥 더했습니다. $|\\vec{a}+\\vec{b}|$는 $|\\vec{a}|+|\\vec{b}|$와 다릅니다.' }],
        explain: '평행사변형법에 의하여 $\\overrightarrow{AB}+\\overrightarrow{AD}=\\overrightarrow{AC}$입니다. 따라서 $|\\overrightarrow{AC}|=\\sqrt{6^2+8^2}=10$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 2,
        q: '평행사변형 ABCD에서 $\\overrightarrow{AB}=\\vec{a}$, $\\overrightarrow{AD}=\\vec{b}$일 때, $\\overrightarrow{BD}$를 $\\vec{a}$, $\\vec{b}$로 나타낸 것은 무엇입니까?',
        choices: ['$\\vec{b}-\\vec{a}$', '$\\vec{a}-\\vec{b}$', '$\\vec{a}+\\vec{b}$', '$-\\vec{a}-\\vec{b}$'],
        answer: 0,
        why: ['', '$\\overrightarrow{DB}$를 구했습니다. $\\overrightarrow{BD}=\\overrightarrow{AD}-\\overrightarrow{AB}$입니다.', '대각선 $\\overrightarrow{AC}$입니다.', '$\\overrightarrow{CA}$입니다.'],
        hint: '$\\overrightarrow{BD}=\\overrightarrow{AD}-\\overrightarrow{AB}$를 떠올려 보십시오.',
        explain: '$\\overrightarrow{BD}=\\overrightarrow{BA}+\\overrightarrow{AD}=-\\vec{a}+\\vec{b}=\\vec{b}-\\vec{a}$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 3,
        q: '두 벡터 $\\vec{a}$, $\\vec{b}$가 영벡터가 아니고 서로 평행하지 않습니다. 두 벡터 $2\\vec{a}+k\\vec{b}$와 $-6\\vec{a}+9\\vec{b}$가 평행할 때, 실수 $k$의 값을 구하십시오.',
        answer: '-3',
        hint: '$2\\vec{a}+k\\vec{b}=t(-6\\vec{a}+9\\vec{b})$로 놓고 계수를 비교하십시오.',
        wrong: [{ a: '3', why: '부호를 놓쳤습니다. $2=-6t$에서 $t=-\\frac{1}{3}$입니다.' }],
        explain: '$2\\vec{a}+k\\vec{b}=t(-6\\vec{a}+9\\vec{b})$에서 $2=-6t$, $k=9t$입니다. $t=-\\frac{1}{3}$이므로 $k=-3$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 3,
        q: '두 벡터 $\\vec{a}$, $\\vec{b}$가 영벡터가 아니고 서로 평행하지 않습니다. 서로 다른 세 점 A, B, C에 대하여 $\\overrightarrow{AB}=\\vec{a}+2\\vec{b}$, $\\overrightarrow{AC}=3\\vec{a}+k\\vec{b}$일 때, 세 점이 한 직선 위에 있도록 하는 실수 $k$의 값을 구하십시오.',
        answer: '6',
        hint: '세 점이 한 직선 위에 있으면 $\\overrightarrow{AC}=t\\overrightarrow{AB}$입니다.',
        wrong: [{ a: '2', why: '$t$를 1로 생각했습니다. $3\\vec{a}$와 $\\vec{a}$를 비교하면 $t=3$입니다.' }],
        explain: '세 점 A, B, C가 한 직선 위에 있으면 $\\overrightarrow{AC}=t\\overrightarrow{AB}$인 실수 $t$가 있습니다. $3\\vec{a}+k\\vec{b}=t\\vec{a}+2t\\vec{b}$에서 $t=3$, $k=2t=6$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 2,
        q: '정육각형 ABCDEF에서 $\\overrightarrow{AB}=\\vec{a}$, $\\overrightarrow{AF}=\\vec{b}$일 때, $\\overrightarrow{CE}$를 $\\vec{a}$, $\\vec{b}$로 나타낸 것은 무엇입니까?',
        fig: hexFig([{ from: HEX.A, to: HEX.B, label: 'a', color: C1, off: [12, 6] }, { from: HEX.A, to: HEX.F, label: 'b', color: C2, off: [12, -6] }, { from: HEX.C, to: HEX.E, color: C4 }], '정육각형 ABCDEF와 중심 O. 벡터 a=AB, b=AF와 벡터 CE'),
        choices: ['$\\vec{b}-\\vec{a}$', '$\\vec{a}-\\vec{b}$', '$\\vec{a}+\\vec{b}$', '$2\\vec{b}-\\vec{a}$'],
        answer: 0,
        why: ['', '방향이 반대인 $\\overrightarrow{EC}$를 구했습니다.', '$\\overrightarrow{AO}$(또는 $\\overrightarrow{BC}$)입니다. 방향과 위치를 다시 확인하십시오.', '$\\overrightarrow{CO}$와 $\\overrightarrow{OE}$를 다시 확인하십시오. $\\overrightarrow{OE}=\\vec{b}$입니다.'],
        hint: '중심 O를 거쳐 C에서 E로 가 보십시오.',
        explain: '사각형 ABOF가 마름모이므로 $\\overrightarrow{AO}=\\vec{a}+\\vec{b}$이고, $\\overrightarrow{CO}=-\\overrightarrow{AB}=-\\vec{a}$입니다(선분 CO는 BA와 평행하고 길이가 같습니다). 또 $\\overrightarrow{OE}=\\overrightarrow{AF}=\\vec{b}$입니다.\n\n따라서 $\\overrightarrow{CE}=\\overrightarrow{CO}+\\overrightarrow{OE}=-\\vec{a}+\\vec{b}=\\vec{b}-\\vec{a}$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'expr', concept: 1,
        q: '한 변의 길이가 2인 정삼각형 ABC에서 $|\\overrightarrow{AB}+\\overrightarrow{AC}|$의 값을 구하십시오.',
        answer: '2√3',
        hint: '선분 BC의 중점을 M이라 하면 $\\overrightarrow{AB}+\\overrightarrow{AC}=2\\overrightarrow{AM}$입니다.',
        wrong: [{ a: '4', why: '두 벡터의 크기를 그냥 더했습니다.' }, { a: '2', why: '$|\\overrightarrow{AB}-\\overrightarrow{AC}|=|\\overrightarrow{CB}|$를 구했습니다.' }, { a: '√3', why: '$|\\overrightarrow{AM}|$에서 멈췄습니다. 합은 $2\\overrightarrow{AM}$입니다.' }],
        explain: '평행사변형법으로 $\\overrightarrow{AB}+\\overrightarrow{AC}$는 AB, AC를 두 변으로 하는 평행사변형의 대각선이고, 그 대각선은 선분 BC의 중점 M을 지나며 길이가 $2\\overline{AM}$입니다. 곧 $\\overrightarrow{AB}+\\overrightarrow{AC}=2\\overrightarrow{AM}$입니다.\n\n정삼각형의 높이 $\\overline{AM}=\\sqrt{2^2-1^2}=\\sqrt{3}$이므로 구하는 값은 $2\\sqrt{3}$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 4,
        q: '평행사변형 ABCD에서 변 BC의 중점을 M이라 하고 $\\overrightarrow{AB}=\\vec{a}$, $\\overrightarrow{AD}=\\vec{b}$라 할 때, $\\overrightarrow{DM}$을 $\\vec{a}$, $\\vec{b}$로 나타낸 것은 무엇입니까?',
        choices: ['$\\vec{a}-\\frac{1}{2}\\vec{b}$', '$\\vec{a}+\\frac{1}{2}\\vec{b}$', '$\\frac{1}{2}\\vec{a}-\\vec{b}$', '$-\\vec{a}+\\frac{1}{2}\\vec{b}$'],
        answer: 0,
        why: ['', '$\\overrightarrow{AM}$을 구했습니다. 시점이 D입니다.', '$\\vec{a}$와 $\\vec{b}$의 역할을 바꾸었습니다. M은 변 BC(벡터 $\\vec{b}$ 방향)의 중점입니다.', '방향이 반대인 $\\overrightarrow{MD}$를 구했습니다.'],
        hint: 'D에서 C를 거쳐 M으로 가 보십시오.',
        explain: '$\\overrightarrow{DC}=\\overrightarrow{AB}=\\vec{a}$이고, $\\overrightarrow{CM}=\\frac{1}{2}\\overrightarrow{CB}=-\\frac{1}{2}\\overrightarrow{AD}=-\\frac{1}{2}\\vec{b}$입니다.\n\n따라서 $\\overrightarrow{DM}=\\overrightarrow{DC}+\\overrightarrow{CM}=\\vec{a}-\\frac{1}{2}\\vec{b}$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 4,
        q: '두 벡터 $\\vec{a}$, $\\vec{b}$가 영벡터가 아니고 서로 평행하지 않습니다. 실수 $m$, $n$에 대하여 $(2m-1)\\vec{a}+(n+2)\\vec{b}=(m+1)\\vec{a}+(2n-4)\\vec{b}$일 때, $m+n$의 값을 구하십시오.',
        answer: '8',
        hint: '$\\vec{a}$, $\\vec{b}$가 평행하지 않으면 양쪽의 계수가 각각 같아야 합니다.',
        wrong: [{ a: '-4', why: '이항할 때 부호를 잘못 처리했습니다. $2m-1=m+1$에서 $m=2$, $n+2=2n-4$에서 $n=6$입니다.' }],
        explain: '$\\vec{a}$, $\\vec{b}$가 영벡터가 아니고 평행하지 않으므로 계수를 비교하면 $2m-1=m+1$, $n+2=2n-4$입니다. 따라서 $m=2$, $n=6$이고 $m+n=8$입니다.',
      },
    ],

    deeper: [
      {
        title: '힘의 합성과 평행사변형법',
        body: '한 물체를 두 사람이 서로 다른 방향으로 끌면, 물체는 두 힘을 더한 하나의 힘을 받은 것처럼 움직입니다. 두 힘을 화살표로 그리고 평행사변형을 만들면 대각선이 합쳐진 힘(합력)입니다. 이것이 평행사변형법이 물리에서 쓰이는 대표적인 예입니다.\n\n두 사람이 같은 방향으로 끌면 합력의 크기는 두 힘의 크기의 합이지만, 방향이 다를수록 합력은 작아지고 정반대이면 크기의 차가 됩니다. 그래서 $|\\vec{a}+\\vec{b}| \\le |\\vec{a}|+|\\vec{b}|$입니다(삼각형의 두 변의 길이의 합은 나머지 한 변의 길이보다 크거나 같습니다).',
      },
      {
        title: '다음 단원과의 연결',
        body: '다음 단원에서는 기준점 O를 정해 점 A를 벡터 $\\overrightarrow{OA}$로 나타내는 **위치벡터**와, 벡터를 좌표처럼 수의 쌍으로 나타내는 **성분**을 배웁니다. 그러면 오늘 그림으로 하던 덧셈·뺄셈·실수배를 성분끼리의 계산으로 할 수 있습니다.\n\n이번 단원의 $\\overrightarrow{AB}=\\overrightarrow{OB}-\\overrightarrow{OA}$가 그 출발점입니다.',
      },
    ],

    faq: [
      {
        q: '벡터랑 선분은 뭐가 달라요?',
        a: '선분 AB와 선분 BA는 같은 도형이지만, 벡터 $\\overrightarrow{AB}$와 $\\overrightarrow{BA}$는 방향이 반대인 다른 벡터입니다. 또 선분은 위치가 정해져 있지만, 벡터는 크기와 방향만 같으면 어디에 그려도 같은 벡터입니다.',
      },
      {
        q: '영벡터의 방향은 뭐예요?',
        a: '영벡터는 크기가 0이어서 방향을 생각하지 않습니다. 그래서 두 벡터의 평행을 말할 때는 "영벡터가 아닌" 두 벡터라는 조건을 붙입니다.',
      },
      {
        q: '$|\\vec{a}+\\vec{b}|$는 $|\\vec{a}|+|\\vec{b}|$랑 같지 않아요?',
        a: '같지 않은 경우가 대부분입니다. 두 벡터가 같은 방향일 때만 같고, 그 밖에는 삼각형의 두 변과 나머지 한 변처럼 $|\\vec{a}+\\vec{b}|<|\\vec{a}|+|\\vec{b}|$입니다. 크기는 그림을 그려 삼각형이나 평행사변형에서 구합니다.',
      },
    ],

    mistakes: [
      '$\\overrightarrow{OA}-\\overrightarrow{OB}$를 $\\overrightarrow{AB}$로 쓰는 실수 — 빼는 벡터의 종점 B에서 출발하므로 $\\overrightarrow{BA}$입니다.',
      '$|\\vec{a}+\\vec{b}|=|\\vec{a}|+|\\vec{b}|$로 계산하는 실수 — 크기는 평행사변형이나 삼각형에서 따로 구합니다.',
      '크기만 같으면 같은 벡터라고 하는 실수 — 방향까지 같아야 서로 같은 벡터입니다.',
    ],

    gens: [
      {
        id: 'chain',
        level: 1,
        title: '벡터의 덧셈과 뺄셈을 이어서 계산하기',
        make: function (R) {
          var k = R.int(2, 4);
          var L = R.sample(['A', 'B', 'C', 'D', 'E', 'P', 'Q'], k + 1);
          var negs = [], i;
          for (i = 0; i < k; i++) negs.push(R.bool(0.45));
          if (negs.indexOf(true) < 0) negs[R.int(0, k - 1)] = true;
          var terms = '', rewrites = [], chain = [];
          for (i = 0; i < k; i++) {
            if (negs[i]) {
              terms += '-' + ov(L[i + 1] + L[i]);
              rewrites.push('-' + ov(L[i + 1] + L[i]) + '=' + ov(L[i] + L[i + 1]));
            } else terms += (i === 0 ? '' : '+') + ov(L[i] + L[i + 1]);
            chain.push(ov(L[i] + L[i + 1]));
          }
          var correct = '$' + ov(L[0] + L[k]) + '$';
          var cands = [
            ['$' + ov(L[k] + L[0]) + '$', '방향이 반대입니다. 처음 시점 ' + L[0] + '에서 마지막 종점 ' + L[k] + '로 갑니다.'],
            ['$' + ov(L[0] + L[k - 1]) + '$', '마지막 벡터를 더하지 않았습니다.'],
            ['$' + ov(L[1] + L[k]) + '$', '첫 번째 벡터를 빠뜨렸습니다.'],
            ['$\\vec{0}$', '처음 점으로 돌아오지 않으므로 영벡터가 아닙니다.'],
          ];
          var reason = {};
          cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
          var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
          return {
            type: 'choice', concept: 1,
            q: '다음과 같은 벡터는 무엇입니까?\n\n$' + terms + '$',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: '빼는 벡터는 역벡터를 더하는 것으로 바꿉니다: $' + rewrites.join('$, $') + '$\n\n그러면 앞 벡터의 종점과 다음 벡터의 시점이 이어지므로 $' + chain.join('+') + '=' + ov(L[0] + L[k]) + '$입니다.',
          };
        },
      },
      {
        id: 'simplify',
        level: 1,
        title: '벡터의 식 간단히 하기',
        make: function (R) {
          var p = R.int(2, 4), r = R.nonzero(-4, 4), q = R.nonzero(-5, 5), s = R.nonzero(-5, 5);
          var m = p + r, n = p * q + r * s;
          if (m === 0 && n === 0) { s = s === 5 ? 4 : s + 1; n = p * q + r * s; }
          var expr = p + '(' + vexp(1, q) + ')' + (r > 0 ? '+' : '-') + (Math.abs(r) === 1 ? '' : Math.abs(r)) + '(' + vexp(1, s) + ')';
          var correct = '$' + vexp(m, n) + '$';
          var cands = [
            ['$' + vexp(m, q + r * s) + '$', '첫 번째 괄호의 $\\vec{b}$ 항에 ' + p + R.josa(p, '을/를') + ' 곱하지 않았습니다.'],
            ['$' + vexp(m, p * q - r * s) + '$', '두 번째 괄호를 전개할 때 $\\vec{b}$ 항의 부호를 잘못 처리했습니다.'],
            ['$' + vexp(p - r, p * q - r * s) + '$', '두 번째 괄호 앞의 부호를 반대로 보았습니다.'],
            ['$' + vexp(m, p * q + s) + '$', '두 번째 괄호의 $\\vec{b}$ 항에 괄호 앞의 수를 곱하지 않았습니다.'],
            ['$' + vexp(m, n + 1) + '$', '$\\vec{b}$의 계수를 다시 계산해 보십시오.'],
          ];
          var reason = {};
          cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
          var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
          var expanded = vexp(p, p * q) + coefTex(r, false) + '\\vec{a}' + coefTex(r * s, false) + '\\vec{b}';
          return {
            type: 'choice', concept: 4,
            q: '다음 식을 간단히 한 것은 무엇입니까?\n\n$' + expr + '$',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: '분배법칙으로 괄호를 풀고 $\\vec{a}$끼리, $\\vec{b}$끼리 모읍니다.\n\n$' + expr + '=' + expanded + '=' + vexp(m, n) + '$',
          };
        },
      },
      {
        id: 'rect-magnitude',
        level: 2,
        title: '직사각형에서 벡터의 합과 차의 크기',
        make: function (R) {
          var t = R.pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13], [9, 12, 15], [12, 9, 15], [8, 15, 17], [15, 8, 17], [7, 24, 25], [20, 21, 29]]);
          var a = t[0], b = t[1], c = t[2];
          var modes = [
            { e: ov('AB') + '+' + ov('AD'), ans: c, how: '평행사변형법에 의하여 $' + ov('AB') + '+' + ov('AD') + '=' + ov('AC') + '$', wr: [[a + b, '두 벡터의 크기를 그냥 더했습니다.']] },
            { e: ov('AB') + '-' + ov('AD'), ans: c, how: '$' + ov('AB') + '-' + ov('AD') + '=' + ov('DB') + '$', wr: [[Math.abs(a - b), '두 벡터의 크기를 그냥 뺐습니다.']] },
            { e: ov('AB') + '+' + ov('BC') + '+' + ov('CD'), ans: b, how: '삼각형법을 이어서 쓰면 $' + ov('AB') + '+' + ov('BC') + '+' + ov('CD') + '=' + ov('AD') + '$', wr: [[2 * a + b, '세 벡터의 크기를 그냥 더했습니다.']] },
            { e: ov('AC') + '-' + ov('BD'), ans: 2 * a, how: '$' + ov('AC') + '-' + ov('BD') + '=' + ov('AC') + '+' + ov('DB') + '=(' + ov('AB') + '+' + ov('BC') + ')+(' + ov('DA') + '+' + ov('AB') + ')=2' + ov('AB') + '$ ($' + ov('BC') + '+' + ov('DA') + '=\\vec{0}$)', wr: [[0, '두 대각선의 길이가 같다고 두 벡터가 같은 것은 아닙니다. 방향이 다릅니다.'], [2 * c, '두 벡터의 크기를 그냥 더했습니다.']] },
            { e: ov('AB') + '-' + ov('CB'), ans: c, how: '$' + ov('AB') + '-' + ov('CB') + '=' + ov('AB') + '+' + ov('BC') + '=' + ov('AC') + '$', wr: [[Math.abs(a - b), '두 벡터의 크기를 그냥 뺐습니다.']] },
            { e: ov('DA') + '+' + ov('DC'), ans: c, how: '평행사변형법에 의하여 $' + ov('DA') + '+' + ov('DC') + '=' + ov('DB') + '$', wr: [[a + b, '두 벡터의 크기를 그냥 더했습니다.']] },
          ];
          var md = R.pick(modes);
          var wrong = [];
          md.wr.forEach(function (w) { if (w[0] !== md.ans) wrong.push({ a: String(w[0]), why: w[1] }); });
          var tail = md.ans === c ? '이고, 직사각형의 대각선의 길이는 $\\sqrt{' + a + '^2+' + b + '^2}=' + c + '$입니다.' : md.ans === b ? '이므로 크기는 $\\overline{AD}=' + b + '$입니다.' : '이므로 크기는 $2\\overline{AB}=' + 2 * a + '$입니다.';
          return {
            type: 'short', check: 'number', concept: md.ans === 2 * a ? 4 : (md.e.indexOf('-') >= 0 ? 2 : 1),
            fig: { type: 'polygon', points: [[0, 0], [a, 0], [a, b], [0, b]], labels: ['A', 'B', 'C', 'D'], sides: [String(a), null, null, String(b)], alt: '가로 ' + a + ', 세로 ' + b + '인 직사각형 ABCD' },
            q: '$\\overline{AB}=' + a + '$, $\\overline{AD}=' + b + '$인 직사각형 ABCD에서 $|' + md.e + '|$의 값을 구하십시오.',
            answer: String(md.ans),
            wrong: wrong,
            explain: md.how + tail,
          };
        },
      },
      {
        id: 'parallel-k',
        level: 3,
        title: '두 벡터가 평행할 조건',
        make: function (R) {
          var r1 = R.nonzero(-5, 5), r2;
          do { r2 = R.nonzero(-5, 5); } while (r2 === r1);
          var cd = -r1 * r2, e = -(r1 + r2);
          var divs = [];
          for (var i = 1; i <= Math.abs(cd); i++) if (Math.abs(cd) % i === 0) divs.push(i, -i);
          var c = R.pick(divs.filter(function (v) { return Math.abs(v) <= 6 && Math.abs(cd / v) <= 6; }).concat([cd > 0 ? 1 : -1]));
          var d = cd / c;
          var pTex = 'k\\vec{a}' + coefTex(c, false) + '\\vec{b}';
          var kTex = e === 0 ? 'k' : 'k' + (e > 0 ? '+' : '-') + Math.abs(e);
          var qTex = coefTex(d, true) + '\\vec{a}' + (e === 0 ? '+k\\vec{b}' : '+(' + kTex + ')\\vec{b}');
          var lo = Math.min(r1, r2), hi = Math.max(r1, r2);
          function fac(r) { return '(k' + (r > 0 ? '-' : '+') + Math.abs(r) + ')'; }
          var wrong = [{ a: String(r1), why: '두 값이 모두 조건을 만족합니다. 이차방정식의 두 근을 모두 구하십시오.' }];
          if (r1 !== -r2) wrong.push({ a: (-hi) + ', ' + (-lo), why: '인수분해한 뒤 근의 부호를 반대로 읽었습니다.' });
          return {
            type: 'short', check: 'set', concept: 3,
            q: '두 벡터 $\\vec{a}$, $\\vec{b}$가 영벡터가 아니고 서로 평행하지 않습니다. 두 벡터 $' + pTex + '$와 $' + qTex + '$가 평행하도록 하는 실수 $k$의 값을 모두 구하십시오.',
            answer: lo + ', ' + hi,
            hint: '$' + pTex + '=t\\{' + qTex + '\\}$로 놓고 $\\vec{a}$, $\\vec{b}$의 계수를 각각 비교하십시오.',
            wrong: wrong,
            explain: '평행하므로 $' + pTex + '=t\\{' + qTex + '\\}$인 0이 아닌 실수 $t$가 있습니다. $\\vec{a}$, $\\vec{b}$가 평행하지 않으므로 계수를 비교하면\n\n$k=' + (d === 1 ? '' : d === -1 ? '-' : d) + 't$, $' + c + '=' + (e === 0 ? 'tk' : 't(' + kTex + ')') + '$\n\n' +
              '첫 식에서 $t=' + (d === 1 ? 'k' : d === -1 ? '-k' : (d < 0 ? '-' : '') + '\\dfrac{k}{' + Math.abs(d) + '}') + '$를 둘째 식에 넣으면 $' + (e === 0 ? 'k^{2}' : 'k(' + kTex + ')') + '=' + cd + '$, 곧 $' + R.fmt.poly([1, e, -cd], 'k') + '=0$입니다.\n\n' +
              '$' + fac(lo) + fac(hi) + '=0$이므로 $k=' + lo + '$ 또는 $k=' + hi + '$입니다. (두 값 모두 $t \\ne 0$이므로 조건을 만족합니다.)',
          };
        },
      },
    ],
  });
})();
