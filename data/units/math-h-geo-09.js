/* 기하 · 위치벡터와 벡터의 성분
 * 위치벡터의 뜻, 내분점·무게중심의 위치벡터, 평면벡터·공간벡터의 성분과 크기, 성분을 이용한 연산(합·차·실수배·평행)을 다룬다.
 * (내적은 다음 단원, 직선·평면의 방정식은 그다음 단원) */
(function () {
  // √n 을 k√m 으로 (n ≥ 0 정수)
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
  function sumSq(v) { return v.reduce(function (s, x) { return s + x * x; }, 0); }
  function sqTex(v) { return v.map(function (x) { return x < 0 ? '(' + x + ')^2' : x + '^2'; }).join('+'); }

  // 좌표평면 위의 벡터 그림 (화살표·점·점선)
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
    if (x0 <= 0 && x1 >= 0 && y0 <= 0 && y1 >= 0) s += '<text x="' + (X(0) - 5) + '" y="' + (Y(0) + 15) + '" font-size="13" fill="currentColor" text-anchor="end">O</text>';
    (o.dashed || []).forEach(function (d) {
      s += '<line x1="' + X(d[0][0]) + '" y1="' + Y(d[0][1]) + '" x2="' + X(d[1][0]) + '" y2="' + Y(d[1][1]) + '" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>';
    });
    (o.vecs || []).forEach(function (v) {
      var c = v.color || 'var(--fig-1)';
      var ax = X(v.from[0]), ay = Y(v.from[1]), bx = X(v.to[0]), by = Y(v.to[1]);
      var ang = Math.atan2(by - ay, bx - ax), L = 10;
      var p1x = +(bx - L * Math.cos(ang - 0.4)).toFixed(1), p1y = +(by - L * Math.sin(ang - 0.4)).toFixed(1);
      var p2x = +(bx - L * Math.cos(ang + 0.4)).toFixed(1), p2y = +(by - L * Math.sin(ang + 0.4)).toFixed(1);
      s += '<line x1="' + ax + '" y1="' + ay + '" x2="' + bx + '" y2="' + by + '" stroke="' + c + '" stroke-width="2.4"/>';
      s += '<polygon points="' + bx + ',' + by + ' ' + p1x + ',' + p1y + ' ' + p2x + ',' + p2y + '" fill="' + c + '"/>';
      if (v.label) {
        var lx = v.lx !== undefined ? v.lx : (v.from[0] + v.to[0]) / 2 - 0.3;
        var ly = v.ly !== undefined ? v.ly : (v.from[1] + v.to[1]) / 2 + 0.3;
        s += '<text x="' + X(lx) + '" y="' + Y(ly) + '" font-size="14" fill="' + c + '" text-anchor="middle" font-style="italic" font-weight="bold">' + v.label + '</text>';
      }
    });
    (o.pts || []).forEach(function (p) {
      s += '<circle cx="' + X(p.x) + '" cy="' + Y(p.y) + '" r="3" fill="currentColor"/>';
      if (p.label) s += '<text x="' + (X(p.x) + (p.dx || 6)) + '" y="' + (Y(p.y) + (p.dy || -6)) + '" font-size="13" fill="currentColor">' + p.label + '</text>';
    });
    return s + '</svg>';
  }

  Tutor.registerUnit({
    id: 'math-h-geo-09',
    course: 'math-h-geo',
    title: '위치벡터와 벡터의 성분',
    summary: '위치벡터로 점과 벡터를 연결하고, 평면벡터와 공간벡터를 성분으로 나타내어 크기를 구하고 계산합니다.',
    goals: [
      '위치벡터의 뜻을 알고, 두 점을 잇는 벡터를 위치벡터로 나타낼 수 있다.',
      '선분의 내분점과 삼각형의 무게중심의 위치벡터를 구할 수 있다.',
      '평면벡터와 공간벡터를 성분으로 나타내고 그 크기를 구할 수 있다.',
      '성분을 이용하여 벡터의 합·차·실수배를 계산하고 두 벡터의 평행 조건을 쓸 수 있다.',
    ],
    standards: ['[12기하03-02]'],

    concepts: [
      {
        title: '위치벡터의 뜻',
        body: '평면이나 공간에서 한 점 $\\mathrm{O}$를 기준점으로 정하면, 임의의 점 $\\mathrm{A}$에 대하여 벡터 $\\overrightarrow{\\mathrm{OA}}$가 하나로 정해집니다. 이처럼 시점을 기준점 $\\mathrm{O}$로 고정한 벡터 $\\overrightarrow{\\mathrm{OA}}=\\vec{a}$를 점 $\\mathrm{O}$에 대한 점 $\\mathrm{A}$의 **위치벡터**라고 합니다.\n\n거꾸로 위치벡터가 정해지면 끝점도 하나로 정해지므로, **점과 위치벡터는 일대일로 대응**합니다. 그래서 점에 관한 문제를 벡터의 계산으로 바꿀 수 있습니다.\n\n두 점 $\\mathrm{A}$, $\\mathrm{B}$의 위치벡터를 각각 $\\vec{a}$, $\\vec{b}$라 하면, 삼각형법 $\\overrightarrow{\\mathrm{OA}}+\\overrightarrow{\\mathrm{AB}}=\\overrightarrow{\\mathrm{OB}}$에서\n\n$\\overrightarrow{\\mathrm{AB}}=\\overrightarrow{\\mathrm{OB}}-\\overrightarrow{\\mathrm{OA}}=\\vec{b}-\\vec{a}$\n\n입니다. 곧 **(끝점의 위치벡터) − (시점의 위치벡터)** 입니다.\n\n> 💡 좌표평면·좌표공간에서는 보통 원점 $\\mathrm{O}$를 기준점으로 잡습니다.',
        easy: '위치벡터는 "출발점을 한곳으로 정해 둔 화살표"입니다. 모든 화살표를 집(점 $\\mathrm{O}$)에서 쏜다고 하면, 화살표 하나가 곧 한 장소를 가리킵니다.\n\n학교($\\mathrm{A}$)에서 도서관($\\mathrm{B}$)으로 가는 길은 "학교에서 집으로 돌아온 뒤($-\\vec{a}$), 집에서 도서관으로 가는 것($+\\vec{b}$)"과 같습니다. 그래서 $\\overrightarrow{\\mathrm{AB}}=\\vec{b}-\\vec{a}$입니다. 도착하는 쪽에서 출발하는 쪽을 뺀다고 기억하십시오.',
        fig: {
          type: 'svg',
          svg: plane({ xmin: -1, xmax: 7, ymin: -1, ymax: 5, vecs: [
            { from: [0, 0], to: [2, 4], label: 'a', lx: 0.6, ly: 2.4 },
            { from: [0, 0], to: [6, 1], label: 'b', lx: 3.2, ly: 0.1, color: 'var(--fig-2)' },
            { from: [2, 4], to: [6, 1], label: 'b − a', lx: 4.8, ly: 3.0, color: 'var(--fig-3)' },
          ], pts: [{ x: 2, y: 4, label: 'A' }, { x: 6, y: 1, label: 'B' }] }),
          alt: '원점 O에서 점 A로 가는 위치벡터 a, 점 B로 가는 위치벡터 b, 그리고 A에서 B로 가는 벡터 b−a',
        },
        check: {
          type: 'choice',
          q: '점 $\\mathrm{O}$에 대한 두 점 $\\mathrm{A}$, $\\mathrm{B}$의 위치벡터가 각각 $\\vec{a}$, $\\vec{b}$일 때, $\\overrightarrow{\\mathrm{BA}}$를 나타낸 것은 무엇입니까?',
          choices: ['$\\vec{a}-\\vec{b}$', '$\\vec{b}-\\vec{a}$', '$\\vec{a}+\\vec{b}$'],
          answer: 0,
          why: ['', '$\\overrightarrow{\\mathrm{AB}}$를 구했습니다. $\\overrightarrow{\\mathrm{BA}}$는 끝점이 $\\mathrm{A}$, 시점이 $\\mathrm{B}$입니다.', '두 위치벡터를 더하면 원점에서 출발하는 다른 벡터가 됩니다. (끝점) − (시점)으로 계산합니다.'],
          explain: '$\\overrightarrow{\\mathrm{BA}}$는 시점이 $\\mathrm{B}$, 끝점이 $\\mathrm{A}$이므로 (끝점의 위치벡터) − (시점의 위치벡터) $=\\vec{a}-\\vec{b}$입니다.',
        },
      },
      {
        title: '내분점과 무게중심의 위치벡터',
        body: '두 점 $\\mathrm{A}$, $\\mathrm{B}$의 위치벡터를 $\\vec{a}$, $\\vec{b}$라 할 때, 선분 $\\mathrm{AB}$를 $m:n$ ($m>0$, $n>0$)으로 **내분하는 점** $\\mathrm{P}$의 위치벡터 $\\vec{p}$는\n\n$\\vec{p}=\\dfrac{m\\vec{b}+n\\vec{a}}{m+n}$\n\n입니다. 이유: $\\overrightarrow{\\mathrm{AP}}=\\dfrac{m}{m+n}\\overrightarrow{\\mathrm{AB}}$이므로 $\\vec{p}-\\vec{a}=\\dfrac{m}{m+n}(\\vec{b}-\\vec{a})$이고, 정리하면 위 식이 됩니다.\n\n- 중점($m=n$)의 위치벡터: $\\dfrac{\\vec{a}+\\vec{b}}{2}$\n- 삼각형 $\\mathrm{ABC}$의 **무게중심** $\\mathrm{G}$의 위치벡터: $\\vec{g}=\\dfrac{\\vec{a}+\\vec{b}+\\vec{c}}{3}$\n\n무게중심은 중선 $\\mathrm{AM}$($\\mathrm{M}$은 변 $\\mathrm{BC}$의 중점)을 $2:1$로 내분하는 점입니다. $\\vec{m}=\\dfrac{\\vec{b}+\\vec{c}}{2}$이므로 $\\vec{g}=\\dfrac{2\\vec{m}+\\vec{a}}{3}=\\dfrac{\\vec{a}+\\vec{b}+\\vec{c}}{3}$입니다.\n\n> ⚠️ $m$은 $\\vec{b}$에, $n$은 $\\vec{a}$에 **엇갈려** 곱합니다. 점 $\\mathrm{P}$가 $\\mathrm{A}$에 가까울수록 $\\vec{a}$의 몫이 커져야 하기 때문입니다.',
        easy: '시소를 떠올려 보십시오. $\\mathrm{A}$에 몸무게 $n$, $\\mathrm{B}$에 몸무게 $m$인 사람이 앉으면 받침점은 무거운 쪽에 가까워집니다. 받침점 $\\mathrm{P}$가 선분을 $m:n$으로 나누려면 $\\mathrm{A}$ 쪽에 $n$, $\\mathrm{B}$ 쪽에 $m$의 무게를 두어야 하지요.\n\n그래서 $\\vec{p}=\\dfrac{n\\vec{a}+m\\vec{b}}{m+n}$처럼 "가중 평균"이 됩니다. 무게중심은 세 꼭짓점에 같은 무게를 둔 평균이라서 $\\dfrac{\\vec{a}+\\vec{b}+\\vec{c}}{3}$입니다.',
        check: {
          type: 'ox',
          q: '선분 $\\mathrm{AB}$를 $1:2$로 내분하는 점 $\\mathrm{P}$의 위치벡터는 $\\vec{p}=\\dfrac{\\vec{a}+2\\vec{b}}{3}$입니다.',
          answer: false,
          explain: '$m=1$, $n=2$이므로 $\\vec{p}=\\dfrac{1\\cdot\\vec{b}+2\\vec{a}}{3}=\\dfrac{2\\vec{a}+\\vec{b}}{3}$입니다. 점 $\\mathrm{P}$는 $\\mathrm{A}$에 더 가까우므로 $\\vec{a}$의 계수가 더 커야 합니다.',
        },
      },
      {
        title: '평면벡터의 성분과 크기',
        body: '좌표평면에서 $x$축, $y$축의 양의 방향의 단위벡터를 각각 $\\vec{e_1}=(1, 0)$, $\\vec{e_2}=(0, 1)$이라 하고, 이를 **기본벡터**라고 합니다.\n\n평면벡터 $\\vec{a}$에 대하여 $\\vec{a}=\\overrightarrow{\\mathrm{OA}}$인 점을 $\\mathrm{A}(a_1, a_2)$라 하면\n\n$\\vec{a}=a_1\\vec{e_1}+a_2\\vec{e_2}$\n\n로 오직 한 가지로 나타낼 수 있습니다. 이것을 $\\vec{a}=(a_1, a_2)$로 쓰고, $a_1$을 $x$**성분**, $a_2$를 $y$**성분**이라고 합니다.\n\n- 크기: 피타고라스 정리에 의해 $|\\vec{a}|=\\sqrt{a_1^2+a_2^2}$\n- 서로 같을 조건: $(a_1, a_2)=(b_1, b_2) \\iff a_1=b_1, a_2=b_2$\n- 두 점 $\\mathrm{A}(x_1, y_1)$, $\\mathrm{B}(x_2, y_2)$에 대하여 $\\overrightarrow{\\mathrm{AB}}=(x_2-x_1, y_2-y_1)$이고, $|\\overrightarrow{\\mathrm{AB}}|$는 두 점 사이의 거리입니다.\n\n예: $\\vec{a}=(3, -4)$이면 $|\\vec{a}|=\\sqrt{9+16}=5$입니다.',
        easy: '벡터의 성분은 "오른쪽으로 몇 칸, 위로 몇 칸"을 적은 길 안내입니다. $(3, 2)$는 오른쪽으로 3칸, 위로 2칸 가는 화살표이지요. 어디서 출발하든 이 안내가 같으면 같은 벡터입니다.\n\n화살표의 길이는 가로 3, 세로 2인 직각삼각형의 빗변이므로 $\\sqrt{3^2+2^2}=\\sqrt{13}$입니다.',
        fig: {
          type: 'svg',
          svg: plane({ xmin: -1, xmax: 5, ymin: -1, ymax: 4, vecs: [
            { from: [0, 0], to: [3, 2], label: 'a', lx: 1.2, ly: 1.5 },
          ], dashed: [[[3, 0], [3, 2]], [[0, 0], [3, 0]]], pts: [{ x: 3, y: 2, label: 'A(3, 2)' }] }),
          alt: '원점에서 점 A(3, 2)로 가는 벡터 a. x성분 3과 y성분 2를 점선으로 나타냈다',
        },
        check: {
          type: 'short', check: 'number',
          q: '벡터 $\\vec{a}=(5, -12)$의 크기 $|\\vec{a}|$를 구하십시오.',
          answer: '13',
          wrong: [
            { a: '-7', why: '성분을 그대로 더했습니다. 크기는 성분을 각각 제곱하여 더한 뒤 제곱근을 구합니다.' },
            { a: '17', why: '성분의 절댓값을 더했습니다. $\\sqrt{5^2+12^2}$를 계산합니다.' },
            { a: '169', why: '제곱의 합까지는 맞습니다. 마지막에 제곱근을 구해야 합니다.' },
          ],
          explain: '$|\\vec{a}|=\\sqrt{5^2+(-12)^2}=\\sqrt{25+144}=\\sqrt{169}=13$입니다.',
        },
      },
      {
        title: '공간벡터의 성분과 크기',
        body: '좌표공간에서도 $x$축, $y$축, $z$축의 양의 방향의 단위벡터\n\n$\\vec{e_1}=(1, 0, 0)$, $\\vec{e_2}=(0, 1, 0)$, $\\vec{e_3}=(0, 0, 1)$\n\n을 기본벡터로 정합니다. 공간벡터 $\\vec{a}=\\overrightarrow{\\mathrm{OA}}$에서 $\\mathrm{A}(a_1, a_2, a_3)$이면\n\n$\\vec{a}=a_1\\vec{e_1}+a_2\\vec{e_2}+a_3\\vec{e_3}=(a_1, a_2, a_3)$\n\n이고, $a_1$, $a_2$, $a_3$을 각각 $x$성분, $y$성분, $z$성분이라고 합니다.\n\n- 크기: $|\\vec{a}|=\\sqrt{a_1^2+a_2^2+a_3^2}$ — 세 모서리의 길이가 $|a_1|$, $|a_2|$, $|a_3|$인 직육면체의 대각선의 길이입니다.\n- 두 점 $\\mathrm{A}(x_1, y_1, z_1)$, $\\mathrm{B}(x_2, y_2, z_2)$에 대하여 $\\overrightarrow{\\mathrm{AB}}=(x_2-x_1, y_2-y_1, z_2-z_1)$\n\n예: $\\vec{a}=(2, -3, 6)$이면 $|\\vec{a}|=\\sqrt{4+9+36}=7$입니다.',
        easy: '공간에서는 길 안내가 하나 늘어서 "앞으로, 옆으로, 위로"의 세 수가 됩니다. 상자 한 귀퉁이에서 맞은편 귀퉁이까지 대각선으로 가는 막대의 길이를 구하는 것과 같습니다.\n\n바닥의 대각선을 먼저 구하고($\\sqrt{a_1^2+a_2^2}$), 그것과 높이로 다시 직각삼각형을 만들면 $\\sqrt{a_1^2+a_2^2+a_3^2}$가 나옵니다.',
        fig: { type: 'cuboid', w: 4, h: 2, d: 3, labels: { w: '|a₁|', h: '|a₃|', d: '|a₂|' }, alt: '세 모서리의 길이가 |a₁|, |a₂|, |a₃|인 직육면체. 벡터의 크기는 이 직육면체의 대각선의 길이이다' },
        check: {
          type: 'choice',
          q: '벡터 $\\vec{a}=(1, -2, 2)$의 크기는 무엇입니까?',
          choices: ['$3$', '$\\sqrt{5}$', '$9$'],
          answer: 0,
          why: ['', '$z$성분을 빠뜨렸습니다. 공간벡터는 세 성분을 모두 제곱하여 더합니다.', '제곱의 합 $1+4+4=9$에서 멈추었습니다. 제곱근을 구해야 합니다.'],
          explain: '$|\\vec{a}|=\\sqrt{1^2+(-2)^2+2^2}=\\sqrt{9}=3$입니다.',
        },
      },
      {
        title: '성분을 이용한 벡터의 연산',
        body: '$\\vec{a}=(a_1, a_2, a_3)$, $\\vec{b}=(b_1, b_2, b_3)$이고 $k$가 실수일 때\n\n- $\\vec{a}+\\vec{b}=(a_1+b_1, a_2+b_2, a_3+b_3)$\n- $\\vec{a}-\\vec{b}=(a_1-b_1, a_2-b_2, a_3-b_3)$\n- $k\\vec{a}=(ka_1, ka_2, ka_3)$\n\n이유: 기본벡터로 쓰면 $\\vec{a}+\\vec{b}=(a_1+b_1)\\vec{e_1}+(a_2+b_2)\\vec{e_2}+(a_3+b_3)\\vec{e_3}$처럼 같은 기본벡터끼리 묶을 수 있기 때문입니다. 평면벡터도 성분이 두 개일 뿐 같습니다.\n\n**평행 조건**: 영벡터가 아닌 두 벡터 $\\vec{a}$, $\\vec{b}$가 평행하면 $\\vec{b}=k\\vec{a}$ ($k\\ne0$)인 실수 $k$가 있으므로, 대응하는 성분의 비가 같습니다.\n\n**단위벡터**: $\\vec{a}$와 방향이 같은 단위벡터는 $\\dfrac{\\vec{a}}{|\\vec{a}|}$입니다.\n\n예: $\\vec{a}=(2, -1, 3)$, $\\vec{b}=(1, 4, -2)$이면 $2\\vec{a}-\\vec{b}=(4-1, -2-4, 6+2)=(3, -6, 8)$입니다.',
        easy: '성분 계산은 "칸마다 따로 하는 계산"입니다. 첫째 칸은 첫째 칸끼리, 둘째 칸은 둘째 칸끼리 더하거나 뺍니다. 실수배는 모든 칸에 같은 수를 곱합니다.\n\n$(2, -1, 3)$을 두 배 하면 $(4, -2, 6)$이고, 여기서 $(1, 4, -2)$를 빼면 칸마다 $4-1$, $-2-4$, $6-(-2)$이므로 $(3, -6, 8)$입니다. 음수를 뺄 때 부호에 주의하십시오.',
        check: {
          type: 'short', check: 'number',
          q: '$\\vec{a}=(3, 1, -2)$, $\\vec{b}=(1, -1, 2)$일 때, 벡터 $2\\vec{a}-\\vec{b}$의 $z$성분을 구하십시오.',
          answer: '-6',
          wrong: [
            { a: '-2', why: '$2\\vec{a}+\\vec{b}$를 계산했습니다. $\\vec{b}$를 빼야 하므로 $-4-2$입니다.' },
            { a: '-4', why: '$\\vec{b}$의 성분을 빼는 것을 빠뜨렸습니다. $2\\times(-2)-2$를 계산합니다.' },
          ],
          explain: '$z$성분끼리 계산하면 $2\\times(-2)-2=-4-2=-6$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '두 점 $\\mathrm{A}(2, -1, 3)$, $\\mathrm{B}(5, 2, 0)$에 대하여 $\\overrightarrow{\\mathrm{AB}}$의 성분과 크기를 구하고, 선분 $\\mathrm{AB}$를 $2:1$로 내분하는 점 $\\mathrm{P}$의 좌표를 구하십시오.',
        steps: [
          '(끝점) − (시점)으로 성분을 구합니다. $\\overrightarrow{\\mathrm{AB}}=(5-2, 2-(-1), 0-3)=(3, 3, -3)$',
          '크기는 $|\\overrightarrow{\\mathrm{AB}}|=\\sqrt{3^2+3^2+(-3)^2}=\\sqrt{27}=3\\sqrt{3}$입니다.',
          '내분점의 위치벡터는 $\\vec{p}=\\dfrac{2\\vec{b}+1\\cdot\\vec{a}}{3}$입니다. 성분으로 계산하면 $\\left(\\dfrac{10+2}{3}, \\dfrac{4-1}{3}, \\dfrac{0+3}{3}\\right)=(4, 1, 1)$',
          '확인: $\\overrightarrow{\\mathrm{AP}}=\\dfrac{2}{3}\\overrightarrow{\\mathrm{AB}}=(2, 2, -2)$이므로 $\\mathrm{P}=(2+2, -1+2, 3-2)=(4, 1, 1)$로 같습니다.',
        ],
        answer: '$\\overrightarrow{\\mathrm{AB}}=(3, 3, -3)$, $|\\overrightarrow{\\mathrm{AB}}|=3\\sqrt{3}$, $\\mathrm{P}(4, 1, 1)$',
      },
      {
        q: '$\\vec{a}=(1, 2)$, $\\vec{b}=(3, -1)$, $\\vec{c}=(7, 7)$일 때, $\\vec{c}=x\\vec{a}+y\\vec{b}$를 만족시키는 실수 $x$, $y$를 구하십시오.',
        steps: [
          '$x\\vec{a}+y\\vec{b}=(x+3y, 2x-y)$입니다.',
          '두 벡터가 같으면 성분이 각각 같으므로 $x+3y=7$, $2x-y=7$입니다.',
          '둘째 식에서 $y=2x-7$을 첫째 식에 넣으면 $x+6x-21=7$, $x=4$이고 $y=1$입니다.',
          '확인: $4(1, 2)+(3, -1)=(7, 7)$',
        ],
        answer: '$x=4$, $y=1$',
      },
    ],

    terms: [
      { term: '위치벡터', def: '시점을 기준점 $\\mathrm{O}$로 고정한 벡터 $\\overrightarrow{\\mathrm{OA}}$를 점 $\\mathrm{A}$의 위치벡터라고 합니다. 점과 위치벡터는 일대일로 대응합니다.' },
      { term: '기본벡터', def: '좌표축의 양의 방향의 단위벡터입니다. 평면에서는 $\\vec{e_1}=(1, 0)$, $\\vec{e_2}=(0, 1)$, 공간에서는 $\\vec{e_1}$, $\\vec{e_2}$, $\\vec{e_3}$의 세 개입니다.' },
      { term: '벡터의 성분', def: '벡터를 기본벡터의 실수배의 합으로 나타냈을 때의 계수입니다. $\\vec{a}=(a_1, a_2, a_3)$에서 $a_1$은 $x$성분, $a_2$는 $y$성분, $a_3$은 $z$성분입니다.' },
      { term: '벡터의 크기', def: '벡터를 나타내는 화살표의 길이입니다. $\\vec{a}=(a_1, a_2, a_3)$이면 $|\\vec{a}|=\\sqrt{a_1^2+a_2^2+a_3^2}$입니다.' },
      { term: '내분점의 위치벡터', def: '선분 $\\mathrm{AB}$를 $m:n$으로 내분하는 점의 위치벡터는 $\\dfrac{m\\vec{b}+n\\vec{a}}{m+n}$입니다.' },
      { term: '무게중심의 위치벡터', def: '삼각형 $\\mathrm{ABC}$의 무게중심의 위치벡터는 세 꼭짓점의 위치벡터의 평균 $\\dfrac{\\vec{a}+\\vec{b}+\\vec{c}}{3}$입니다.' },
      { term: '단위벡터', def: '크기가 1인 벡터입니다. $\\vec{a}$와 방향이 같은 단위벡터는 $\\dfrac{\\vec{a}}{|\\vec{a}|}$입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '점 $\\mathrm{O}$에 대한 세 점 $\\mathrm{A}$, $\\mathrm{B}$, $\\mathrm{C}$의 위치벡터를 각각 $\\vec{a}$, $\\vec{b}$, $\\vec{c}$라 할 때, $\\overrightarrow{\\mathrm{CB}}$를 나타낸 것은 무엇입니까?',
        choices: ['$\\vec{b}-\\vec{c}$', '$\\vec{c}-\\vec{b}$', '$\\vec{b}+\\vec{c}$', '$\\vec{b}-\\vec{a}$'],
        answer: 0,
        why: [
          '',
          '$\\overrightarrow{\\mathrm{BC}}$를 구했습니다. $\\overrightarrow{\\mathrm{CB}}$는 끝점이 $\\mathrm{B}$입니다.',
          '위치벡터를 더하면 안 됩니다. (끝점의 위치벡터) − (시점의 위치벡터)입니다.',
          '시점을 $\\mathrm{A}$로 잘못 보았습니다. $\\overrightarrow{\\mathrm{CB}}$의 시점은 $\\mathrm{C}$입니다.',
        ],
        explain: '$\\overrightarrow{\\mathrm{CB}}=\\overrightarrow{\\mathrm{OB}}-\\overrightarrow{\\mathrm{OC}}=\\vec{b}-\\vec{c}$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1,
        q: '두 점 $\\mathrm{A}$, $\\mathrm{B}$의 위치벡터를 각각 $\\vec{a}$, $\\vec{b}$라 할 때, 선분 $\\mathrm{AB}$를 $3:1$로 내분하는 점의 위치벡터는 무엇입니까?',
        choices: ['$\\dfrac{\\vec{a}+3\\vec{b}}{4}$', '$\\dfrac{3\\vec{a}+\\vec{b}}{4}$', '$\\dfrac{\\vec{a}+3\\vec{b}}{3}$', '$\\dfrac{\\vec{a}+\\vec{b}}{2}$'],
        answer: 0,
        why: [
          '',
          '$m$과 $n$을 엇갈려 곱하지 않았습니다. $3:1$로 내분하는 점은 $\\mathrm{B}$에 가까우므로 $\\vec{b}$의 계수가 커야 합니다.',
          '분모는 $m+n=4$입니다. 계수의 합이 1이 되어야 합니다.',
          '중점의 위치벡터입니다. 중점은 $1:1$로 내분하는 점입니다.',
        ],
        explain: '$m=3$, $n=1$이므로 $\\dfrac{3\\vec{b}+1\\cdot\\vec{a}}{3+1}=\\dfrac{\\vec{a}+3\\vec{b}}{4}$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '세 점 $\\mathrm{A}(1, 2, -1)$, $\\mathrm{B}(3, -4, 5)$, $\\mathrm{C}(5, 5, 2)$를 꼭짓점으로 하는 삼각형 $\\mathrm{ABC}$의 무게중심의 좌표는 무엇입니까?',
        choices: ['$(3, 1, 2)$', '$(9, 3, 6)$', '$\\left(\\dfrac{9}{2}, \\dfrac{3}{2}, 3\\right)$', '$(2, -1, 2)$'],
        answer: 0,
        why: [
          '',
          '세 위치벡터를 더하기만 했습니다. 3으로 나누어야 평균이 됩니다.',
          '2로 나누었습니다. 꼭짓점이 세 개이므로 3으로 나눕니다.',
          '선분 $\\mathrm{AB}$의 중점입니다. 무게중심은 세 꼭짓점을 모두 써서 구합니다.',
        ],
        explain: '$\\vec{g}=\\dfrac{\\vec{a}+\\vec{b}+\\vec{c}}{3}$이므로 $\\left(\\dfrac{1+3+5}{3}, \\dfrac{2-4+5}{3}, \\dfrac{-1+5+2}{3}\\right)=(3, 1, 2)$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'expr', concept: 2,
        q: '벡터 $\\vec{a}=(-3, 6)$의 크기를 구하십시오. (근호는 √ 또는 sqrt로 입력합니다. 예: 2√3)',
        answer: '3√5',
        wrong: [
          { a: '3', why: '성분을 그대로 더했습니다. 각 성분을 제곱하여 더한 뒤 제곱근을 구합니다.' },
          { a: '9', why: '성분의 절댓값을 더했습니다. 크기는 $\\sqrt{a_1^2+a_2^2}$입니다.' },
          { a: '45', why: '제곱의 합까지는 맞습니다. 제곱근을 구해야 합니다.' },
        ],
        explain: '$|\\vec{a}|=\\sqrt{(-3)^2+6^2}=\\sqrt{45}=3\\sqrt{5}$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 2,
        q: '두 점 $\\mathrm{A}(-1, 4)$, $\\mathrm{B}(2, 0)$에 대하여 $|\\overrightarrow{\\mathrm{AB}}|$를 구하십시오.',
        answer: '5',
        wrong: [
          { a: '7', why: '성분의 절댓값 $3$과 $4$를 더했습니다. $\\sqrt{3^2+(-4)^2}$를 계산합니다.' },
          { a: '-1', why: '성분 $3$과 $-4$를 그대로 더했습니다. 크기는 제곱하여 더한 뒤 제곱근을 구합니다.' },
        ],
        explain: '$\\overrightarrow{\\mathrm{AB}}=(2-(-1), 0-4)=(3, -4)$이므로 $|\\overrightarrow{\\mathrm{AB}}|=\\sqrt{9+16}=5$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'ox', concept: 3,
        q: '공간벡터 $\\vec{a}=(2, -1, 2)$의 크기는 3입니다.',
        answer: true,
        explain: '$|\\vec{a}|=\\sqrt{2^2+(-1)^2+2^2}=\\sqrt{9}=3$이므로 옳습니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 4,
        q: '$\\vec{a}=(3, -1)$, $\\vec{b}=(-2, 4)$일 때, $\\vec{a}-2\\vec{b}$를 성분으로 나타낸 것은 무엇입니까?',
        choices: ['$(7, -9)$', '$(-1, 7)$', '$(5, -5)$', '$(7, 7)$'],
        answer: 0,
        why: [
          '',
          '$\\vec{a}+2\\vec{b}$를 계산했습니다. 빼기에 주의합니다.',
          '$\\vec{a}-\\vec{b}$를 계산했습니다. $\\vec{b}$에 2를 곱해야 합니다.',
          '$y$성분의 부호를 놓쳤습니다. $-1-2\\times4=-9$입니다.',
        ],
        explain: '$2\\vec{b}=(-4, 8)$이므로 $\\vec{a}-2\\vec{b}=(3-(-4), -1-8)=(7, -9)$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 2,
        q: '두 벡터 $\\vec{a}=(x+1, 3)$, $\\vec{b}=(4, y-2)$가 서로 같을 때, $x+y$의 값을 구하십시오.',
        answer: '8',
        hint: '두 벡터가 같으면 대응하는 성분이 각각 같습니다.',
        wrong: [{ a: '4', why: '$y-2=3$에서 $y=1$로 계산했습니다. 2를 더해 $y=5$입니다.' }],
        explain: '$x+1=4$에서 $x=3$, $3=y-2$에서 $y=5$이므로 $x+y=8$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
        q: '두 벡터 $\\vec{a}=(2, -3, 1)$, $\\vec{b}=(k, 6, -2)$가 서로 평행할 때, 실수 $k$의 값을 구하십시오.',
        answer: '-4',
        hint: '$\\vec{b}=t\\vec{a}$인 실수 $t$를 $y$성분이나 $z$성분에서 먼저 구합니다.',
        wrong: [{ a: '4', why: '$t$의 부호를 놓쳤습니다. $6=-3t$에서 $t=-2$입니다.' }],
        explain: '$\\vec{b}=t\\vec{a}$라 하면 $y$성분에서 $6=-3t$, $t=-2$입니다. $z$성분도 $-2=1\\times(-2)$로 맞습니다. 따라서 $k=2t=-4$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 4,
        q: '벡터 $\\vec{a}=(1, 2, -2)$와 방향이 같은 단위벡터는 무엇입니까?',
        choices: ['$\\left(\\dfrac{1}{3}, \\dfrac{2}{3}, -\\dfrac{2}{3}\\right)$', '$\\left(-\\dfrac{1}{3}, -\\dfrac{2}{3}, \\dfrac{2}{3}\\right)$', '$\\left(\\dfrac{1}{9}, \\dfrac{2}{9}, -\\dfrac{2}{9}\\right)$', '$\\left(\\dfrac{1}{5}, \\dfrac{2}{5}, -\\dfrac{2}{5}\\right)$'],
        answer: 0,
        why: [
          '',
          '방향이 반대인 단위벡터입니다. 크기는 1이지만 $-\\dfrac{\\vec{a}}{|\\vec{a}|}$입니다.',
          '$|\\vec{a}|^2=9$로 나누었습니다. 크기 $|\\vec{a}|=3$으로 나눕니다.',
          '성분의 절댓값의 합 5로 나누었습니다. 크기는 $\\sqrt{1+4+4}=3$입니다.',
        ],
        hint: '먼저 $|\\vec{a}|$를 구합니다.',
        explain: '$|\\vec{a}|=\\sqrt{1+4+4}=3$이므로 단위벡터는 $\\dfrac{\\vec{a}}{3}=\\left(\\dfrac{1}{3}, \\dfrac{2}{3}, -\\dfrac{2}{3}\\right)$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'expr', concept: 4,
        q: '$\\vec{a}=(1, 2)$, $\\vec{b}=(3, -1)$일 때, $|2\\vec{a}+\\vec{b}|$를 구하십시오. (근호는 √ 또는 sqrt로 입력합니다.)',
        answer: '√34',
        hint: '먼저 $2\\vec{a}+\\vec{b}$를 성분으로 나타냅니다.',
        wrong: [
          { a: '2√5+√10', why: '$2|\\vec{a}|+|\\vec{b}|$를 계산했습니다. 합의 크기와 크기의 합은 일반적으로 다릅니다. 벡터를 먼저 더합니다.' },
          { a: '34', why: '제곱의 합까지는 맞습니다. 제곱근을 구해야 합니다.' },
        ],
        explain: '$2\\vec{a}+\\vec{b}=(2+3, 4-1)=(5, 3)$이므로 $|2\\vec{a}+\\vec{b}|=\\sqrt{25+9}=\\sqrt{34}$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 1,
        q: '평행사변형 $\\mathrm{ABCD}$에서 세 꼭짓점 $\\mathrm{A}$, $\\mathrm{B}$, $\\mathrm{C}$의 위치벡터가 각각 $\\vec{a}$, $\\vec{b}$, $\\vec{c}$일 때, 꼭짓점 $\\mathrm{D}$의 위치벡터는 무엇입니까?',
        fig: { type: 'polygon', points: [[0, 0], [4, 0], [5.5, 2.5], [1.5, 2.5]], labels: ['A', 'B', 'C', 'D'], alt: '평행사변형 ABCD. 꼭짓점은 A, B, C, D의 순서로 돌아간다' },
        choices: ['$\\vec{a}+\\vec{c}-\\vec{b}$', '$\\vec{a}+\\vec{b}-\\vec{c}$', '$\\vec{b}+\\vec{c}-\\vec{a}$', '$\\dfrac{\\vec{a}+\\vec{b}+\\vec{c}}{3}$'],
        answer: 0,
        why: [
          '',
          '$\\overrightarrow{\\mathrm{AD}}=\\overrightarrow{\\mathrm{CB}}$로 방향을 거꾸로 잡았습니다. $\\overrightarrow{\\mathrm{AD}}=\\overrightarrow{\\mathrm{BC}}$입니다.',
          '$\\mathrm{A}$와 $\\mathrm{B}$의 역할을 바꾸었습니다. 대각선의 양 끝인 $\\mathrm{B}$, $\\mathrm{D}$의 위치벡터의 합이 $\\vec{a}+\\vec{c}$입니다.',
          '삼각형 $\\mathrm{ABC}$의 무게중심입니다. 꼭짓점 $\\mathrm{D}$와는 다른 점입니다.',
        ],
        hint: '평행사변형에서는 $\\overrightarrow{\\mathrm{AD}}=\\overrightarrow{\\mathrm{BC}}$입니다.',
        explain: '$\\overrightarrow{\\mathrm{AD}}=\\overrightarrow{\\mathrm{BC}}$이므로 $\\vec{d}-\\vec{a}=\\vec{c}-\\vec{b}$, 곧 $\\vec{d}=\\vec{a}+\\vec{c}-\\vec{b}$입니다. (두 대각선의 중점이 같다는 $\\dfrac{\\vec{a}+\\vec{c}}{2}=\\dfrac{\\vec{b}+\\vec{d}}{2}$로 구해도 같습니다.)',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 1,
        q: '세 점 $\\mathrm{A}(1, 4, -2)$, $\\mathrm{B}(-3, 2, 5)$, $\\mathrm{C}(5, -3, 3)$에 대하여 $\\overrightarrow{\\mathrm{PA}}+\\overrightarrow{\\mathrm{PB}}+\\overrightarrow{\\mathrm{PC}}=\\vec{0}$을 만족시키는 점 $\\mathrm{P}$의 좌표는 무엇입니까?',
        choices: ['$(1, 1, 2)$', '$(3, 3, 6)$', '$(-1, -1, -2)$', '$\\left(\\dfrac{3}{2}, \\dfrac{3}{2}, 3\\right)$'],
        answer: 0,
        why: [
          '',
          '$3\\vec{p}=\\vec{a}+\\vec{b}+\\vec{c}$에서 3으로 나누는 것을 빠뜨렸습니다.',
          '이항할 때 부호를 놓쳤습니다. $\\vec{a}+\\vec{b}+\\vec{c}-3\\vec{p}=\\vec{0}$에서 $3\\vec{p}=\\vec{a}+\\vec{b}+\\vec{c}$이므로 $\\vec{p}$의 부호는 바뀌지 않습니다.',
          '2로 나누었습니다. $\\vec{p}$가 세 번 나오므로 3으로 나눕니다.',
        ],
        hint: '$\\overrightarrow{\\mathrm{PA}}=\\vec{a}-\\vec{p}$처럼 모두 위치벡터로 바꿉니다.',
        explain: '$(\\vec{a}-\\vec{p})+(\\vec{b}-\\vec{p})+(\\vec{c}-\\vec{p})=\\vec{0}$에서 $\\vec{p}=\\dfrac{\\vec{a}+\\vec{b}+\\vec{c}}{3}$, 곧 $\\mathrm{P}$는 삼각형 $\\mathrm{ABC}$의 무게중심입니다. $\\left(\\dfrac{1-3+5}{3}, \\dfrac{4+2-3}{3}, \\dfrac{-2+5+3}{3}\\right)=(1, 1, 2)$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'expr', concept: 2,
        q: '$\\vec{a}=(3, 1)$, $\\vec{b}=(1, 1)$일 때, 실수 $t$에 대하여 $|\\vec{a}-t\\vec{b}|$의 최솟값을 구하십시오. (근호는 √ 또는 sqrt로 입력합니다.)',
        answer: '√2',
        hint: '$|\\vec{a}-t\\vec{b}|^2$을 $t$에 대한 이차식으로 나타내어 완전제곱식으로 바꿉니다.',
        wrong: [
          { a: '2', why: '$|\\vec{a}-t\\vec{b}|^2$의 최솟값을 구했습니다. 마지막에 제곱근을 구합니다.' },
          { a: '√10', why: '$t=0$일 때의 값 $|\\vec{a}|$입니다. $t$를 바꾸면 더 작아질 수 있습니다.' },
        ],
        explain: '$\\vec{a}-t\\vec{b}=(3-t, 1-t)$이므로 $|\\vec{a}-t\\vec{b}|^2=(3-t)^2+(1-t)^2=2t^2-8t+10=2(t-2)^2+2$입니다. $t=2$일 때 최솟값 2를 가지므로 $|\\vec{a}-t\\vec{b}|$의 최솟값은 $\\sqrt{2}$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 4,
        q: '세 점 $\\mathrm{A}(1, 2, 3)$, $\\mathrm{B}(3, k, 7)$, $\\mathrm{C}(4, 8, m)$이 한 직선 위에 있을 때, $k+m$의 값을 구하십시오.',
        answer: '15',
        hint: '세 점이 한 직선 위에 있으면 $\\overrightarrow{\\mathrm{AC}}=t\\overrightarrow{\\mathrm{AB}}$인 실수 $t$가 있습니다.',
        wrong: [{ a: '12', why: '$m-3=6$에서 $m=6$으로 계산했습니다. 3을 더하면 $m=9$입니다.' }],
        explain: '$\\overrightarrow{\\mathrm{AB}}=(2, k-2, 4)$, $\\overrightarrow{\\mathrm{AC}}=(3, 6, m-3)$입니다. $\\overrightarrow{\\mathrm{AC}}=t\\overrightarrow{\\mathrm{AB}}$에서 $x$성분으로 $t=\\dfrac{3}{2}$입니다. $6=\\dfrac{3}{2}(k-2)$에서 $k=6$, $m-3=\\dfrac{3}{2}\\times4=6$에서 $m=9$이므로 $k+m=15$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'expr', concept: 3,
        q: '두 점 $\\mathrm{A}(1, -1, 2)$, $\\mathrm{B}(3, 1, 1)$에 대하여 $\\overrightarrow{\\mathrm{OP}}=\\overrightarrow{\\mathrm{OA}}+t\\overrightarrow{\\mathrm{AB}}$ ($t$는 실수)인 점 $\\mathrm{P}$가 $xy$평면 위에 있을 때, $|\\overrightarrow{\\mathrm{OP}}|$를 구하십시오. (근호는 √ 또는 sqrt로 입력합니다.)',
        answer: '√34',
        hint: '$xy$평면 위의 점은 $z$좌표가 0입니다.',
        wrong: [
          { a: '√6', why: '$|\\overrightarrow{\\mathrm{OA}}|$를 구했습니다. 먼저 $z$좌표가 0이 되는 $t$를 찾습니다.' },
          { a: '34', why: '제곱의 합까지는 맞습니다. 제곱근을 구해야 합니다.' },
        ],
        explain: '$\\overrightarrow{\\mathrm{AB}}=(2, 2, -1)$이므로 $\\overrightarrow{\\mathrm{OP}}=(1+2t, -1+2t, 2-t)$입니다. $z$성분이 0이면 $t=2$이고, $\\overrightarrow{\\mathrm{OP}}=(5, 3, 0)$입니다. 따라서 $|\\overrightarrow{\\mathrm{OP}}|=\\sqrt{25+9+0}=\\sqrt{34}$입니다.',
      },
    ],

    deeper: [
      {
        title: '무게중심과 질량중심 — 위치벡터의 가중 평균',
        body: '내분점의 위치벡터 $\\dfrac{n\\vec{a}+m\\vec{b}}{m+n}$은 두 위치벡터의 **가중 평균**입니다. 물리학에서는 이 생각을 넓혀, 질량이 $m_1, m_2, \\cdots, m_k$인 물체들이 위치벡터 $\\vec{r_1}, \\vec{r_2}, \\cdots, \\vec{r_k}$인 점에 있을 때 전체의 **질량중심**을\n\n$\\vec{R}=\\dfrac{m_1\\vec{r_1}+m_2\\vec{r_2}+\\cdots+m_k\\vec{r_k}}{m_1+m_2+\\cdots+m_k}$\n\n로 정합니다. 세 꼭짓점에 같은 질량을 두면 바로 삼각형의 무게중심 $\\dfrac{\\vec{a}+\\vec{b}+\\vec{c}}{3}$이 됩니다.\n\n위치벡터를 쓰면 좌표축을 어떻게 잡든 같은 식으로 계산할 수 있습니다. 다음 단원에서는 성분을 이용해 두 벡터가 이루는 각을 재는 **내적**을 배웁니다.',
      },
    ],

    faq: [
      {
        q: '위치벡터랑 그냥 벡터는 뭐가 달라요?',
        a: '벡터는 크기와 방향만 같으면 어디에 그려도 같은 벡터입니다. 위치벡터는 그중에서 시점을 기준점 $\\mathrm{O}$에 고정한 것이라서, 끝점이 곧 한 점을 가리킵니다. 그래서 위치벡터는 점을 나타내는 데 쓰고, $\\overrightarrow{\\mathrm{AB}}=\\vec{b}-\\vec{a}$처럼 두 위치벡터로 아무 벡터나 나타낼 수 있습니다.',
      },
      {
        q: '내분점 공식에서 왜 m을 b에 곱해요? 헷갈려요.',
        a: '선분 $\\mathrm{AB}$를 $m:n$으로 내분하는 점은 $\\mathrm{A}$에서 출발해 $\\overrightarrow{\\mathrm{AB}}$의 $\\dfrac{m}{m+n}$만큼 간 점입니다. $\\vec{a}+\\dfrac{m}{m+n}(\\vec{b}-\\vec{a})$를 정리하면 $\\vec{b}$ 앞에 $m$이 남습니다. 헷갈리면 "가까운 점일수록 계수가 크다"로 확인하십시오. $3:1$로 내분하는 점은 $\\mathrm{B}$에 가까우니 $\\vec{b}$의 계수가 3입니다.',
      },
      {
        q: '벡터 (3, 2)와 점 (3, 2)는 같은 거예요?',
        a: '모양은 같지만 뜻이 다릅니다. 점 $(3, 2)$는 한 위치이고, 벡터 $(3, 2)$는 "오른쪽으로 3, 위로 2"라는 이동입니다. 원점을 시점으로 그리면 벡터 $(3, 2)$의 끝점이 점 $(3, 2)$가 되므로, 원점에 대한 점 $(3, 2)$의 위치벡터가 $(3, 2)$입니다.',
      },
    ],

    mistakes: [
      '$\\overrightarrow{\\mathrm{AB}}$를 $\\vec{a}-\\vec{b}$로 거꾸로 쓰는 실수 — (끝점의 위치벡터) − (시점의 위치벡터)이므로 $\\vec{b}-\\vec{a}$입니다.',
      '내분점의 위치벡터에서 $m$과 $n$을 엇갈려 곱하지 않는 실수 — $m:n$으로 내분하는 점은 $\\dfrac{m\\vec{b}+n\\vec{a}}{m+n}$입니다.',
      '벡터의 크기를 구할 때 성분을 그대로 더하거나 제곱근을 빠뜨리는 실수 — $|\\vec{a}|=\\sqrt{a_1^2+a_2^2+a_3^2}$입니다.',
    ],

    gens: [
      {
        id: 'mag-ab',
        level: 1,
        title: '두 점을 잇는 벡터의 크기',
        make: function (R) {
          var dim = R.pick([2, 3, 3]);
          var A, d, nz;
          do {
            A = []; d = [];
            for (var i = 0; i < dim; i++) { A.push(R.int(-4, 5)); d.push(R.int(-5, 5)); }
            nz = d.filter(function (x) { return x !== 0; }).length;
          } while (nz < 2);
          var B = A.map(function (a, i) { return a + d[i]; });
          var n = sumSq(d), val = Math.sqrt(n);
          var wrong = [], seen = {};
          function addW(v, str, why) {
            if (Math.abs(v - val) > 1e-9 && !seen[str]) { seen[str] = 1; wrong.push({ a: str, why: why }); }
          }
          var plainSum = d.reduce(function (s, x) { return s + x; }, 0);
          var absSum = d.reduce(function (s, x) { return s + Math.abs(x); }, 0);
          addW(plainSum, String(plainSum), '성분을 그대로 더했습니다. 크기는 성분을 각각 제곱하여 더한 뒤 제곱근을 구합니다.');
          addW(absSum, String(absSum), '성분의 절댓값을 더했습니다. 크기는 $\\sqrt{(\\text{성분})^2\\text{의 합}}$입니다.');
          addW(n, String(n), '제곱의 합까지는 맞습니다. 마지막에 제곱근을 구해야 합니다.');
          var S = A.map(function (a, i) { return a + B[i]; });
          var ns = sumSq(S);
          addW(Math.sqrt(ns), rootAns(ns), '두 점의 좌표를 더했습니다. 성분은 (끝점의 좌표) − (시점의 좌표)로 구합니다.');
          var diff = B.map(function (b, i) { return b + '-' + R.fmt.paren(A[i]); }).join(', ');
          var tail = rootTex(n) === '\\sqrt{' + n + '}' ? '' : '=' + rootTex(n);
          return {
            type: 'short', check: 'expr', concept: dim === 2 ? 2 : 3,
            q: '두 점 $\\mathrm{A}' + vt(A) + '$, $\\mathrm{B}' + vt(B) + '$에 대하여 $|\\overrightarrow{\\mathrm{AB}}|$를 구하십시오. (근호는 √ 또는 sqrt로 입력합니다. 예: 2√3)',
            answer: rootAns(n),
            wrong: wrong,
            explain: '(끝점) − (시점)으로 성분을 구하면 $\\overrightarrow{\\mathrm{AB}}=(' + diff + ')=' + vt(d) + '$입니다.\n\n$|\\overrightarrow{\\mathrm{AB}}|=\\sqrt{' + sqTex(d) + '}=\\sqrt{' + n + '}' + tail + '$',
          };
        },
      },
      {
        id: 'lin-comb',
        level: 1,
        title: '성분으로 벡터의 합·차·실수배 계산하기',
        make: function (R) {
          var dim = R.pick([2, 3]);
          var a, b;
          function zero(v) { return v.every(function (x) { return x === 0; }); }
          do {
            a = []; b = [];
            for (var i = 0; i < dim; i++) { a.push(R.int(-4, 4)); b.push(R.int(-4, 4)); }
          } while (zero(a) || zero(b) || vt(a) === vt(b));
          var p = R.pick([1, 2, 3, -1, -2]);
          var q = R.pick([2, 3, -1, -2, -3]);
          if (p === q) q = -q;
          function comb(x, y) { return a.map(function (ai, i) { return x * ai + y * b[i]; }); }
          function ct(c, v, first) {
            var s = c < 0 ? '-' : (first ? '' : '+');
            var m = Math.abs(c);
            return s + (m === 1 ? '' : m) + v;
          }
          var c = comb(p, q);
          var correct = '$' + vt(c) + '$';
          var lastNeg = c.slice(); lastNeg[dim - 1] = -lastNeg[dim - 1];
          var firstNeg = c.slice(); firstNeg[0] = -firstNeg[0];
          var cands = [
            ['$' + vt(comb(p, -q)) + '$', '$\\vec{b}$ 앞의 부호를 반대로 계산했습니다. 식의 부호를 다시 확인합니다.'],
            ['$' + vt(comb(q, p)) + '$', '두 벡터의 계수를 서로 바꾸어 계산했습니다.'],
            ['$' + vt(comb(p, 1)) + '$', '$\\vec{b}$에 계수를 곱하지 않았습니다. 실수배는 모든 성분에 곱합니다.'],
            ['$' + vt(comb(1, q)) + '$', '$\\vec{a}$에 계수를 곱하지 않았습니다. 실수배는 모든 성분에 곱합니다.'],
            ['$' + vt(lastNeg) + '$', '마지막 성분에서 부호를 잘못 계산했습니다. 음수를 곱하거나 뺄 때 부호에 주의합니다.'],
            ['$' + vt(firstNeg) + '$', '첫째 성분에서 부호를 잘못 계산했습니다. 음수를 곱하거나 뺄 때 부호에 주의합니다.'],
            ['$' + vt(comb(-p, q)) + '$', '$\\vec{a}$ 앞의 부호를 반대로 계산했습니다. 식의 부호를 다시 확인합니다.'],
          ];
          var reason = {};
          cands.forEach(function (w) { if (w[0] !== correct && !(w[0] in reason)) reason[w[0]] = w[1]; });
          var pick = R.choices(correct, Object.keys(reason));
          var expr = ct(p, '\\vec{a}', true) + ct(q, '\\vec{b}', false);
          var pa = a.map(function (x) { return p * x; }), qb = b.map(function (x) { return q * x; });
          return {
            type: 'choice', concept: 4,
            q: '$\\vec{a}=' + vt(a) + '$, $\\vec{b}=' + vt(b) + '$일 때, $' + expr + '$를 성분으로 나타낸 것을 고르십시오.',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (x) { return x === correct ? '' : reason[x] || ''; }),
            explain: '$' + ct(p, '\\vec{a}', true) + '=' + vt(pa) + '$, $' + ct(q, '\\vec{b}', true) + '=' + vt(qb) + '$이므로 성분끼리 더하면\n\n$' + expr + '=' + vt(c) + '$',
          };
        },
      },
      {
        id: 'divide-point',
        level: 2,
        title: '선분의 내분점의 좌표 (위치벡터)',
        make: function (R) {
          var mn = R.pick([[1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2]]);
          var m = mn[0], n = mn[1], s = m + n;
          var A, d, nz;
          do {
            A = []; d = [];
            for (var i = 0; i < 3; i++) { A.push(R.int(-4, 4)); d.push(R.int(-2, 2)); }
            nz = d.filter(function (x) { return x !== 0; }).length;
          } while (nz < 2);
          function at(k) { return A.map(function (x, i) { return x + k * d[i]; }); }
          var B = at(s), P = at(m);
          var correct = '$' + vt(P) + '$';
          var cands = [
            ['$' + vt(at(n)) + '$', '$m$과 $n$을 엇갈려 곱하지 않았습니다. 이 점은 선분을 $' + n + ':' + m + '$' + R.josa(m, '으로/로') + ' 내분하는 점입니다.'],
            ['$' + vt(at(-m)) + '$', '$\\overrightarrow{\\mathrm{AB}}$를 $\\vec{a}-\\vec{b}$로 거꾸로 잡아 반대쪽으로 갔습니다. $\\overrightarrow{\\mathrm{AB}}=\\vec{b}-\\vec{a}$입니다.'],
            ['$' + vt(at(-n)) + '$', '$m$, $n$의 자리와 $\\overrightarrow{\\mathrm{AB}}$의 방향을 모두 잘못 잡았습니다.'],
          ];
          if (s % 2 === 0) cands.push(['$' + vt(at(s / 2)) + '$', '선분의 중점을 구했습니다. 중점은 $1:1$로 내분하는 점입니다.']);
          var reason = {};
          cands.forEach(function (w) { if (w[0] !== correct && !(w[0] in reason)) reason[w[0]] = w[1]; });
          var pick = R.choices(correct, Object.keys(reason));
          var comp = [0, 1, 2].map(function (i) {
            return '\\dfrac{' + m + '\\cdot' + R.fmt.paren(B[i]) + '+' + n + '\\cdot' + R.fmt.paren(A[i]) + '}{' + s + '}';
          }).join(', ');
          return {
            type: 'choice', concept: 1,
            q: '두 점 $\\mathrm{A}' + vt(A) + '$, $\\mathrm{B}' + vt(B) + '$에 대하여 선분 $\\mathrm{AB}$를 $' + m + ':' + n + '$' + R.josa(n, '으로/로') + ' 내분하는 점 $\\mathrm{P}$의 좌표를 고르십시오.',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (x) { return x === correct ? '' : reason[x] || ''; }),
            explain: '$\\vec{p}=\\dfrac{' + (m === 1 ? '' : m) + '\\vec{b}+' + (n === 1 ? '' : n) + '\\vec{a}}{' + s + '}$이므로 성분마다 계산하면\n\n$\\left(' + comp + '\\right)=' + vt(P) + '$\n\n확인: $\\overrightarrow{\\mathrm{AB}}=' + vt(at(s).map(function (x, i) { return x - A[i]; })) + '$이고 $\\overrightarrow{\\mathrm{AP}}=\\dfrac{' + m + '}{' + s + '}\\overrightarrow{\\mathrm{AB}}=' + vt(d.map(function (x) { return m * x; })) + '$입니다.',
          };
        },
      },
      {
        id: 'parallel-k',
        level: 3,
        title: '성분으로 두 벡터의 평행 조건 쓰기',
        make: function (R) {
          var p, t, k, q, ans;
          do {
            p = R.pick([1, 2, -1, -2, 3]);
            t = R.pick([2, 3, -2, -3, -1]);
            k = R.nonzero(-4, 4);
            q = R.nonzero(-4, 4);
            ans = k + t * q;
          } while (ans === 0);
          var tp = t * p, tk = t * k, M = t * q;
          var wrong = [], seen = {};
          function addW(f, why) {
            var str = f.toString();
            if (!f.eq(ans) && !seen[str]) { seen[str] = 1; wrong.push({ a: str, why: why }); }
          }
          addW(R.F(tk + q), '대응하는 성분이 서로 같다고 놓았습니다. 평행이면 성분이 같은 것이 아니라 성분의 비가 같습니다($\\vec{b}=t\\vec{a}$).');
          addW(R.F(-ans), '$t$의 부호를 잘못 구했습니다. $x$성분에서 $t$를 다시 구해 봅니다.');
          addW(R.F(t * t * t * k + q, t), '$\\vec{a}=t\\vec{b}$와 $\\vec{b}=t\\vec{a}$를 섞어 썼습니다. 한 가지 식으로 모든 성분을 비교합니다.');
          var pt = p === 1 ? 't' : (p === -1 ? '-t' : p + 't');
          return {
            type: 'short', check: 'number', concept: 4,
            q: '두 벡터 $\\vec{a}=(' + p + ', k, ' + q + ')$, $\\vec{b}=(' + tp + ', ' + tk + ', m)$이 서로 평행할 때, 실수 $k$, $m$에 대하여 $k+m$의 값을 구하십시오.',
            answer: String(ans),
            wrong: wrong,
            hint: '$\\vec{b}=t\\vec{a}$로 놓고, 두 성분이 모두 주어진 $x$성분에서 $t$를 먼저 구합니다.',
            explain: '$\\vec{b}=t\\vec{a}$라 하면 $x$성분에서 $' + tp + '=' + pt + '$, $t=' + t + '$입니다.\n\n$y$성분: $' + tk + '=' + R.fmt.paren(t) + '\\times k$에서 $k=' + k + '$\n\n$z$성분: $m=' + R.fmt.paren(t) + '\\times' + R.fmt.paren(q) + '=' + M + '$\n\n따라서 $k+m=' + k + R.fmt.signed(M) + '=' + ans + '$입니다.',
          };
        },
      },
    ],
  });
})();
