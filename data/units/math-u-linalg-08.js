/* 선형대수학 · 내적과 직교성
 * 내적·노름·거리·코시-슈바르츠, 직교집합·정규직교기저·직교여공간, 직교사영, 그람-슈미트와 QR 분해, 최소제곱 해와 직선 맞추기.
 * (앞 단원: 기저와 차원·선형변환·고윳값 / 다음 단원: 대칭행렬의 직교대각화와 특이값 분해) */
(function () {
  function tup(v) { return '(' + v.join(', ') + ')'; }
  function dot(a, b) { return a.reduce(function (s, x, i) { return s + x * b[i]; }, 0); }
  function par(x) { return x < 0 ? '(' + x + ')' : String(x); }
  function dotTex(a, b) { return a.map(function (x, i) { return par(x) + '\\cdot ' + par(b[i]); }).join('+'); }
  // √n 을 a√b 꼴로: TeX 와 답 칸(expr) 두 가지
  function rootParts(n) {
    var k = 1, m = n;
    for (var f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; k *= f; }
    return { k: k, m: m };
  }
  function rootTex(n) {
    var r = rootParts(n);
    if (r.m === 1) return String(r.k);
    return (r.k === 1 ? '' : r.k) + '\\sqrt{' + r.m + '}';
  }
  function rootAns(n) {
    var r = rootParts(n);
    if (r.m === 1) return String(r.k);
    return (r.k === 1 ? '' : r.k + '*') + 'sqrt(' + r.m + ')';
  }

  // ---------- 좌표평면 그림 ----------
  function plane(o) {
    var u = o.u || 34, pad = 18;
    var x0 = o.xmin, x1 = o.xmax, y0 = o.ymin, y1 = o.ymax;
    var W = (x1 - x0) * u + 2 * pad, H = (y1 - y0) * u + 2 * pad;
    function X(x) { return +(pad + (x - x0) * u).toFixed(1); }
    function Y(y) { return +(pad + (y1 - y) * u).toFixed(1); }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">', i;
    for (i = x0; i <= x1; i++) s += '<line x1="' + X(i) + '" y1="' + Y(y0) + '" x2="' + X(i) + '" y2="' + Y(y1) + '" stroke="currentColor" stroke-opacity="0.12"/>';
    for (i = y0; i <= y1; i++) s += '<line x1="' + X(x0) + '" y1="' + Y(i) + '" x2="' + X(x1) + '" y2="' + Y(i) + '" stroke="currentColor" stroke-opacity="0.12"/>';
    s += '<line x1="' + X(x0) + '" y1="' + Y(0) + '" x2="' + X(x1) + '" y2="' + Y(0) + '" stroke="currentColor" stroke-width="1.2"/>';
    s += '<line x1="' + X(0) + '" y1="' + Y(y0) + '" x2="' + X(0) + '" y2="' + Y(y1) + '" stroke="currentColor" stroke-width="1.2"/>';
    (o.segs || []).forEach(function (g) {
      s += '<line x1="' + X(g.from[0]) + '" y1="' + Y(g.from[1]) + '" x2="' + X(g.to[0]) + '" y2="' + Y(g.to[1]) + '" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/>';
    });
    (o.vecs || []).forEach(function (v) {
      var c = v.color || 'var(--fig-1)', f = v.from || [0, 0];
      var ax = X(f[0]), ay = Y(f[1]), bx = X(v.to[0]), by = Y(v.to[1]);
      var ang = Math.atan2(by - ay, bx - ax), L = 10;
      var p1x = +(bx - L * Math.cos(ang - 0.4)).toFixed(1), p1y = +(by - L * Math.sin(ang - 0.4)).toFixed(1);
      var p2x = +(bx - L * Math.cos(ang + 0.4)).toFixed(1), p2y = +(by - L * Math.sin(ang + 0.4)).toFixed(1);
      s += '<line x1="' + ax + '" y1="' + ay + '" x2="' + bx + '" y2="' + by + '" stroke="' + c + '" stroke-width="2.4"/>';
      s += '<polygon points="' + bx + ',' + by + ' ' + p1x + ',' + p1y + ' ' + p2x + ',' + p2y + '" fill="' + c + '"/>';
      if (v.label) s += '<text x="' + X(v.lx) + '" y="' + Y(v.ly) + '" font-size="14" fill="' + c + '" text-anchor="middle" font-weight="bold">' + v.label + '</text>';
    });
    return s + '</svg>';
  }

  Tutor.registerUnit({
    id: 'math-u-linalg-08',
    course: 'math-u-linalg',
    title: '내적과 직교성',
    summary: '내적·노름·직교를 정리하고, 직교사영과 그람-슈미트 과정, 최소제곱법으로 연립방정식의 가장 가까운 해를 구합니다.',
    goals: [
      '내적으로 노름·거리·각을 구하고, 코시-슈바르츠 부등식을 설명할 수 있다.',
      '직교집합과 정규직교기저의 성질을 이용하고, 직교여공간을 구할 수 있다.',
      '직교사영을 계산하고, 그람-슈미트 과정으로 직교기저와 QR 분해를 구할 수 있다.',
      '정규방정식으로 최소제곱 해를 구하여 자료에 가장 잘 맞는 직선을 찾을 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '내적·노름·거리와 코시-슈바르츠 부등식',
        body: '$\\mathbf{R}^n$의 두 벡터 $\\mathbf{u}=(u_1, \\ldots, u_n)$, $\\mathbf{v}=(v_1, \\ldots, v_n)$의 **내적**은\n\n$\\mathbf{u}\\cdot\\mathbf{v}=u_1v_1+\\cdots+u_nv_n=\\mathbf{u}^{T}\\mathbf{v}$\n\n입니다(기하에서 배운 내적을 $n$차원으로 넓힌 것).\n\n| 개념 | 정의 |\n|---|---|\n| **노름**(길이) | $\\|\\mathbf{v}\\|=\\sqrt{\\mathbf{v}\\cdot\\mathbf{v}}$ |\n| **단위벡터** | 길이 1인 벡터. $\\mathbf{v}/\\|\\mathbf{v}\\|$ (정규화) |\n| **거리** | $d(\\mathbf{u}, \\mathbf{v})=\\|\\mathbf{u}-\\mathbf{v}\\|$ |\n| **각** | $\\cos\\theta=\\dfrac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|}$ |\n| **직교** | $\\mathbf{u}\\cdot\\mathbf{v}=0$ |\n\n**코시-슈바르츠 부등식**: $|\\mathbf{u}\\cdot\\mathbf{v}|\\le\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|$ (등호는 한 벡터가 다른 벡터의 스칼라배일 때)\n\n이 부등식 덕분에 위의 $\\cos\\theta$ 값이 항상 $-1$과 1 사이에 있어 3차원 이상에서도 "각"을 정의할 수 있습니다. 여기서 **삼각부등식** $\\|\\mathbf{u}+\\mathbf{v}\\|\\le\\|\\mathbf{u}\\|+\\|\\mathbf{v}\\|$도 나옵니다.\n\n> 💡 함수 공간에서는 $\\int_{a}^{b} f(t)g(t)\\,dt$ 같은 것도 내적의 성질(대칭·선형·양의 정부호)을 만족해서 같은 이론을 그대로 쓸 수 있습니다.',
        easy: '내적은 "두 화살표가 얼마나 같은 쪽을 향하는가"를 재는 수입니다. 같은 쪽이면 양수, 수직이면 0, 반대쪽이면 음수입니다.\n\n자기 자신과의 내적은 성분의 제곱의 합이라 피타고라스 정리처럼 길이의 제곱이 됩니다. $(3, 4)$이면 $9+16=25$, 길이는 5입니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\mathbf{v}=(1, 2, 2)$의 노름 $\\|\\mathbf{v}\\|$를 구하세요.',
          answer: '3',
          wrong: [
            { a: '9', why: '$\\mathbf{v}\\cdot\\mathbf{v}=9$에서 멈췄습니다. 노름은 그 제곱근입니다.' },
            { a: '5', why: '성분을 그대로 더했습니다. 노름은 성분의 제곱의 합의 제곱근입니다.' },
          ],
          explain: '$\\|\\mathbf{v}\\|=\\sqrt{1^2+2^2+2^2}=\\sqrt{9}=3$입니다.',
        },
      },
      {
        title: '직교집합·정규직교기저와 직교여공간',
        body: '영벡터가 아닌 벡터들이 서로 모두 직교하면 **직교집합**, 여기에 모두 단위벡터이면 **정규직교집합**이라고 합니다.\n\n**직교집합은 일차독립입니다.** $c_1\\mathbf{v}_1+\\cdots+c_k\\mathbf{v}_k=\\mathbf{0}$의 양변에 $\\mathbf{v}_i$를 내적하면 나머지 항이 모두 0이 되어 $c_i\\|\\mathbf{v}_i\\|^2=0$, 곧 $c_i=0$이기 때문입니다.\n\n그래서 직교기저에서는 좌표를 연립방정식 없이 **내적 한 번**으로 구합니다.\n\n$\\mathbf{x}=c_1\\mathbf{v}_1+\\cdots+c_n\\mathbf{v}_n, \\quad c_i=\\dfrac{\\mathbf{x}\\cdot\\mathbf{v}_i}{\\mathbf{v}_i\\cdot\\mathbf{v}_i}$ (정규직교기저이면 $c_i=\\mathbf{x}\\cdot\\mathbf{u}_i$)\n\n부분공간 $W$의 모든 벡터와 직교하는 벡터 전체를 $W$의 **직교여공간**이라고 합니다. 기호는 $W^{\\perp}$입니다.\n\n- $W^{\\perp}$도 부분공간이고, $\\operatorname{dim} W+\\operatorname{dim} W^{\\perp}=n$입니다.\n- 행렬에서는 $(\\operatorname{Row} A)^{\\perp}=\\operatorname{Nul} A$입니다. $A\\mathbf{x}=\\mathbf{0}$은 "$\\mathbf{x}$가 모든 행과 직교한다"는 뜻이기 때문입니다.\n\n예: $\\mathbf{R}^3$에서 $W=\\operatorname{span}\\{(1, 1, 1)\\}$(직선)의 직교여공간은 평면 $x+y+z=0$입니다.',
        easy: '방의 모서리에 있는 세 선(가로·세로·높이)처럼 서로 수직인 방향들은 서로 "겹치는 부분"이 전혀 없습니다. 그래서 일차독립이고, 어느 방향으로 얼마나 갔는지는 그 방향과의 내적만 보면 바로 알 수 있습니다.\n\n직교여공간은 "주어진 공간과 직각을 이루는 모든 방향"입니다. 바닥(평면)에 직각인 방향은 기둥 방향(직선) 하나뿐이지요.',
        check: {
          type: 'ox',
          q: '$\\mathbf{R}^3$에서 원점을 지나는 평면 $W$의 직교여공간은 원점을 지나는 직선입니다.',
          answer: true,
          explain: '$\\operatorname{dim} W+\\operatorname{dim} W^{\\perp}=3$이고 평면의 차원은 2이므로 직교여공간의 차원은 1, 곧 직선입니다. 평면의 법선 방향이 바로 그 직선입니다.',
        },
      },
      {
        title: '직교사영',
        body: '벡터 $\\mathbf{v}$를 $\\mathbf{u}$ 방향 성분과 그에 수직인 성분으로 나눌 수 있습니다.\n\n$\\operatorname{proj}_{\\mathbf{u}}\\mathbf{v}=\\dfrac{\\mathbf{v}\\cdot\\mathbf{u}}{\\mathbf{u}\\cdot\\mathbf{u}}\\,\\mathbf{u}, \\qquad \\mathbf{v}-\\operatorname{proj}_{\\mathbf{u}}\\mathbf{v}\\perp\\mathbf{u}$\n\n그림은 $\\mathbf{v}=(1, 3)$을 $\\mathbf{u}=(2, 1)$ 방향 직선 위로 정사영한 모습입니다. $\\frac{\\mathbf{v}\\cdot\\mathbf{u}}{\\mathbf{u}\\cdot\\mathbf{u}}=\\frac{5}{5}=1$이라 정사영은 $(2, 1)$이고, 남은 부분 $(-1, 2)$는 직선과 수직입니다.\n\n부분공간 $W$에 **직교기저** $\\{\\mathbf{w}_1, \\ldots, \\mathbf{w}_k\\}$가 있으면 $W$ 위로의 직교사영은 각 방향으로의 사영을 더한 것입니다.\n\n$\\operatorname{proj}_{W}\\mathbf{v}=\\dfrac{\\mathbf{v}\\cdot\\mathbf{w}_1}{\\mathbf{w}_1\\cdot\\mathbf{w}_1}\\mathbf{w}_1+\\cdots+\\dfrac{\\mathbf{v}\\cdot\\mathbf{w}_k}{\\mathbf{w}_k\\cdot\\mathbf{w}_k}\\mathbf{w}_k$\n\n그러면 $\\mathbf{v}=\\operatorname{proj}_{W}\\mathbf{v}+\\mathbf{z}$, $\\mathbf{z}\\in W^{\\perp}$ 꼴로 단 한 가지로 나뉘고(**직교분해**), $\\operatorname{proj}_{W}\\mathbf{v}$는 $W$ 안에서 $\\mathbf{v}$와 **가장 가까운 점**입니다. 그래서 $\\mathbf{v}$와 $W$ 사이의 거리는 $\\|\\mathbf{z}\\|$입니다.\n\n> ⚠️ 위 합 공식은 기저가 **직교**할 때만 맞습니다. 직교하지 않으면 먼저 그람-슈미트 과정으로 직교기저를 만들어야 합니다.',
        easy: '해가 머리 위에 있을 때 막대의 그림자를 생각해 보세요. 막대 $\\mathbf{v}$가 바닥(직선 $\\mathbf{u}$) 위에 드리우는 그림자가 직교사영이고, 막대 끝에서 그림자 끝으로 내린 선은 바닥과 수직입니다.\n\n그림자의 길이는 "막대가 바닥 방향으로 얼마나 뻗었나", 곧 내적으로 잽니다.',
        fig: {
          type: 'svg',
          alt: '원점을 지나는 방향 (2,1)의 점선 직선, v=(1,3) 화살표, 정사영 (2,1) 화살표, v의 끝에서 (2,1)로 내린 수직 점선.',
          svg: plane({
            xmin: -1, xmax: 4, ymin: -1, ymax: 4, u: 40,
            segs: [{ from: [-1, -0.5], to: [4, 2] }, { from: [1, 3], to: [2, 1] }],
            vecs: [
              { to: [1, 3], label: 'v', lx: 0.45, ly: 2.6, color: 'var(--fig-1)' },
              { to: [2, 1], label: 'proj', lx: 2.3, ly: 0.45, color: 'var(--fig-2)' },
            ],
          }),
        },
        check: {
          type: 'short', check: 'number',
          q: '$\\mathbf{v}=(3, 1)$을 $\\mathbf{u}=(1, 1)$ 위로 정사영한 벡터 $\\operatorname{proj}_{\\mathbf{u}}\\mathbf{v}$의 **첫째 성분**을 구하세요.',
          answer: '2',
          wrong: [{ a: '4', why: '$\\mathbf{v}\\cdot\\mathbf{u}=4$만 곱했습니다. $\\mathbf{u}\\cdot\\mathbf{u}=2$로 나누어야 합니다.' }],
          explain: '$\\dfrac{\\mathbf{v}\\cdot\\mathbf{u}}{\\mathbf{u}\\cdot\\mathbf{u}}=\\dfrac{4}{2}=2$이므로 $\\operatorname{proj}_{\\mathbf{u}}\\mathbf{v}=2(1, 1)=(2, 2)$입니다. 확인: $(3, 1)-(2, 2)=(1, -1)$은 $(1, 1)$과 수직입니다.',
        },
      },
      {
        title: '그람-슈미트 과정과 QR 분해',
        body: '일차독립인 $\\mathbf{x}_1, \\mathbf{x}_2, \\ldots$로부터 같은 공간을 생성하는 **직교기저**를 만드는 방법입니다. 새 벡터에서 "이미 만든 방향의 성분"을 빼 나갑니다.\n\n$\\mathbf{v}_1=\\mathbf{x}_1$\n\n$\\mathbf{v}_2=\\mathbf{x}_2-\\dfrac{\\mathbf{x}_2\\cdot\\mathbf{v}_1}{\\mathbf{v}_1\\cdot\\mathbf{v}_1}\\mathbf{v}_1$\n\n$\\mathbf{v}_3=\\mathbf{x}_3-\\dfrac{\\mathbf{x}_3\\cdot\\mathbf{v}_1}{\\mathbf{v}_1\\cdot\\mathbf{v}_1}\\mathbf{v}_1-\\dfrac{\\mathbf{x}_3\\cdot\\mathbf{v}_2}{\\mathbf{v}_2\\cdot\\mathbf{v}_2}\\mathbf{v}_2$\n\n마지막에 각각을 길이로 나누면 정규직교기저 $\\mathbf{u}_i=\\mathbf{v}_i/\\|\\mathbf{v}_i\\|$가 됩니다. 계산 중간에 분수가 나오면 벡터에 적당한 수를 곱해도 방향이 같으므로 괜찮습니다.\n\n**QR 분해**: 열이 일차독립인 $m\\times n$ 행렬 $A$는\n\n$A=QR$\n\n로 쓸 수 있습니다. $Q$는 $A$의 열에 그람-슈미트 과정을 해서 얻은 정규직교 열들의 행렬($Q^{T}Q=I$), $R=Q^{T}A$는 대각성분이 양수인 $n\\times n$ **위삼각행렬**입니다. $\\mathbf{x}_j$는 $\\mathbf{u}_1, \\ldots, \\mathbf{u}_j$만으로 나타나므로 $R$의 대각선 아래가 0입니다.\n\n> 💡 QR 분해는 최소제곱 문제를 수치적으로 안정되게 풀고, 고윳값을 근사하는 알고리즘에도 쓰입니다.',
        easy: '비뚤게 놓인 막대들을 서로 직각이 되게 세우는 과정입니다. 첫 막대는 그대로 두고, 둘째 막대에서는 첫 막대 방향으로 기운 부분(그림자)을 잘라 내면 첫 막대와 수직이 됩니다. 셋째 막대에서는 앞의 두 방향으로 기운 부분을 모두 잘라 냅니다.\n\n잘라 내는 양이 바로 앞 카드의 직교사영입니다.',
        check: {
          type: 'choice',
          q: '$\\mathbf{x}_1=(1, 0)$, $\\mathbf{x}_2=(2, 3)$에 그람-슈미트 과정을 쓸 때 $\\mathbf{v}_2$는 무엇입니까?',
          choices: ['$(0, 3)$', '$(2, 0)$', '$(2, 3)$'],
          answer: 0,
          why: ['', '빼야 할 정사영 $\\operatorname{proj}_{\\mathbf{v}_1}\\mathbf{x}_2$를 답했습니다. $\\mathbf{x}_2$에서 이것을 빼야 합니다.', '$\\mathbf{x}_2$를 그대로 썼습니다. $(2, 3)\\cdot(1, 0)=2\\ne 0$이라 아직 직교하지 않습니다.'],
          explain: '$\\dfrac{\\mathbf{x}_2\\cdot\\mathbf{v}_1}{\\mathbf{v}_1\\cdot\\mathbf{v}_1}=\\dfrac{2}{1}=2$이므로 $\\mathbf{v}_2=(2, 3)-2(1, 0)=(0, 3)$입니다.',
        },
      },
      {
        title: '최소제곱 해와 자료에 맞는 직선',
        body: '$A\\mathbf{x}=\\mathbf{b}$에 해가 없을 때($\\mathbf{b}\\notin\\operatorname{Col} A$), 오차 $\\|\\mathbf{b}-A\\mathbf{x}\\|$를 가장 작게 하는 $\\hat{\\mathbf{x}}$를 **최소제곱 해**라고 합니다.\n\n$A\\hat{\\mathbf{x}}$는 열공간에서 $\\mathbf{b}$와 가장 가까운 점, 곧 $\\operatorname{proj}_{\\operatorname{Col} A}\\mathbf{b}$입니다. 그래서 오차 $\\mathbf{b}-A\\hat{\\mathbf{x}}$는 $A$의 모든 열과 직교하고, $A^{T}(\\mathbf{b}-A\\hat{\\mathbf{x}})=\\mathbf{0}$에서 **정규방정식**\n\n$A^{T}A\\hat{\\mathbf{x}}=A^{T}\\mathbf{b}$\n\n를 얻습니다. $A$의 열이 일차독립이면 $A^{T}A$가 가역이라 해가 하나뿐입니다.\n\n**직선 맞추기**: 자료 $(x_1, y_1), \\ldots, (x_m, y_m)$에 직선 $y=\\beta_0+\\beta_1x$를 맞추려면\n\n$A=\\begin{bmatrix} 1 & x_1 \\\\ \\vdots & \\vdots \\\\ 1 & x_m \\end{bmatrix}, \\quad \\mathbf{b}=\\begin{bmatrix} y_1 \\\\ \\vdots \\\\ y_m \\end{bmatrix}$\n\n로 놓고 정규방정식을 풉니다. 예: 점 $(0, 1)$, $(1, 1)$, $(2, 3)$이면 $A^{T}A=\\begin{bmatrix} 3 & 3 \\\\ 3 & 5 \\end{bmatrix}$, $A^{T}\\mathbf{b}=(5, 7)$이고, 풀면 $\\beta_1=1$, $\\beta_0=\\frac{2}{3}$입니다. 직선 $y=x+\\frac{2}{3}$가 세로 오차의 제곱의 합을 가장 작게 합니다(그림의 점선이 오차).',
        easy: '세 점이 한 직선 위에 있지 않으면 세 점을 모두 지나는 직선은 없습니다. 그래서 "모두에게 조금씩 양보한" 직선을 찾습니다. 각 점에서 직선까지의 세로 거리(오차)를 제곱해 더한 값이 가장 작은 직선입니다.\n\n선형대수로 보면 "닿을 수 없는 목표 $\\mathbf{b}$의 그림자(정사영)를 대신 맞히는 것"입니다.',
        fig: {
          type: 'coord',
          xmin: -1, xmax: 3, ymin: -1, ymax: 4,
          points: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 3 }],
          fns: [{ expr: 'x+2/3', from: -1, to: 3 }],
          segments: [{ from: [0, 1], to: [0, 0.667], dashed: true }, { from: [1, 1], to: [1, 1.667], dashed: true }, { from: [2, 3], to: [2, 2.667], dashed: true }],
          alt: '점 (0,1), (1,1), (2,3)과 최소제곱 직선 y=x+2/3, 각 점에서 직선까지의 세로 오차를 점선으로 표시',
        },
        check: {
          type: 'ox',
          q: '정규방정식 $A^{T}A\\hat{\\mathbf{x}}=A^{T}\\mathbf{b}$는 $A\\mathbf{x}=\\mathbf{b}$의 해가 없을 때에도 항상 해를 가집니다.',
          answer: true,
          explain: '$\\mathbf{b}$의 열공간 위로의 정사영은 항상 있고, 그것을 $A\\hat{\\mathbf{x}}$로 나타내는 $\\hat{\\mathbf{x}}$가 정규방정식의 해입니다. $A$의 열이 일차독립이면 그 해가 하나뿐입니다.',
        },
      },
    ],

    examples: [
      {
        q: '$\\mathbf{u}=(1, 2, 2)$, $\\mathbf{v}=(2, -1, 2)$가 이루는 각 $\\theta$에 대하여 $\\cos\\theta$를 구하고, 코시-슈바르츠 부등식을 확인하세요.',
        steps: [
          '$\\mathbf{u}\\cdot\\mathbf{v}=2-2+4=4$입니다.',
          '$\\|\\mathbf{u}\\|=\\sqrt{1+4+4}=3$, $\\|\\mathbf{v}\\|=\\sqrt{4+1+4}=3$입니다.',
          '$\\cos\\theta=\\dfrac{4}{3\\cdot 3}=\\dfrac{4}{9}$입니다.',
          '$|\\mathbf{u}\\cdot\\mathbf{v}|=4\\le 9=\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|$로 부등식이 성립하고, 두 벡터가 평행하지 않으므로 등호는 아닙니다.',
        ],
        answer: '$\\cos\\theta=\\dfrac{4}{9}$',
      },
      {
        q: '$\\mathbf{x}_1=(1, 1, 0)$, $\\mathbf{x}_2=(1, 0, 1)$에 그람-슈미트 과정을 써서 정규직교기저를 구하고, $A=[\\,\\mathbf{x}_1\\ \\mathbf{x}_2\\,]$의 QR 분해에서 $R$을 구하세요.',
        steps: [
          '$\\mathbf{v}_1=(1, 1, 0)$입니다.',
          '$\\dfrac{\\mathbf{x}_2\\cdot\\mathbf{v}_1}{\\mathbf{v}_1\\cdot\\mathbf{v}_1}=\\dfrac{1}{2}$이므로 $\\mathbf{v}_2=(1, 0, 1)-\\frac{1}{2}(1, 1, 0)=\\left(\\frac{1}{2}, -\\frac{1}{2}, 1\\right)$, 2배해서 $(1, -1, 2)$로 써도 됩니다. 확인: $(1, 1, 0)\\cdot(1, -1, 2)=0$',
          '정규화: $\\mathbf{u}_1=\\dfrac{1}{\\sqrt{2}}(1, 1, 0)$, $\\mathbf{u}_2=\\dfrac{1}{\\sqrt{6}}(1, -1, 2)$입니다.',
          '$R=Q^{T}A$: $r_{11}=\\mathbf{u}_1\\cdot\\mathbf{x}_1=\\sqrt{2}$, $r_{12}=\\mathbf{u}_1\\cdot\\mathbf{x}_2=\\dfrac{1}{\\sqrt{2}}$, $r_{22}=\\mathbf{u}_2\\cdot\\mathbf{x}_2=\\dfrac{3}{\\sqrt{6}}=\\dfrac{\\sqrt{6}}{2}$, $r_{21}=0$입니다.',
        ],
        answer: '$R=\\begin{bmatrix} \\sqrt{2} & \\frac{\\sqrt{2}}{2} \\\\ 0 & \\frac{\\sqrt{6}}{2} \\end{bmatrix}$',
      },
      {
        q: '점 $(0, 1)$, $(1, 1)$, $(2, 3)$에 가장 잘 맞는 직선 $y=\\beta_0+\\beta_1x$를 최소제곱법으로 구하세요.',
        steps: [
          '$A=\\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\\\ 1 & 2 \\end{bmatrix}$, $\\mathbf{b}=(1, 1, 3)$으로 놓습니다.',
          '$A^{T}A=\\begin{bmatrix} 3 & 3 \\\\ 3 & 5 \\end{bmatrix}$ (자료 수, $\\sum x$, $\\sum x^2$), $A^{T}\\mathbf{b}=(5, 7)$ ($\\sum y$, $\\sum xy$)입니다.',
          '정규방정식 $3\\beta_0+3\\beta_1=5$, $3\\beta_0+5\\beta_1=7$에서 빼면 $2\\beta_1=2$, $\\beta_1=1$이고 $\\beta_0=\\frac{2}{3}$입니다.',
          '확인: 오차 $(1-\\frac{2}{3}, 1-\\frac{5}{3}, 3-\\frac{8}{3})=(\\frac{1}{3}, -\\frac{2}{3}, \\frac{1}{3})$은 $A$의 두 열 $(1, 1, 1)$, $(0, 1, 2)$와 모두 직교합니다.',
        ],
        answer: '$y=x+\\frac{2}{3}$',
      },
    ],

    terms: [
      { term: '내적', def: '$\\mathbf{u}\\cdot\\mathbf{v}=u_1v_1+\\cdots+u_nv_n$입니다. 길이·각·직교를 정하는 기본 도구입니다.' },
      { term: '노름', def: '벡터의 길이 $\\|\\mathbf{v}\\|=\\sqrt{\\mathbf{v}\\cdot\\mathbf{v}}$입니다.' },
      { term: '코시-슈바르츠 부등식', def: '$|\\mathbf{u}\\cdot\\mathbf{v}|\\le\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|$입니다. 등호는 두 벡터가 평행할 때만 성립합니다.' },
      { term: '직교', def: '두 벡터의 내적이 0인 것입니다.' },
      { term: '정규직교기저', def: '서로 직교하는 단위벡터로 이루어진 기저입니다. 좌표가 $c_i=\\mathbf{x}\\cdot\\mathbf{u}_i$로 바로 구해집니다.' },
      { term: '직교여공간', def: '부분공간 $W$의 모든 벡터와 직교하는 벡터 전체 $W^{\\perp}$입니다. $(\\operatorname{Row} A)^{\\perp}=\\operatorname{Nul} A$' },
      { term: '직교사영', def: '벡터를 부분공간 위로 수직으로 내린 것입니다. 그 부분공간에서 원래 벡터와 가장 가까운 점입니다.' },
      { term: '그람-슈미트 과정', def: '일차독립인 벡터들에서 앞 벡터 방향의 성분을 차례로 빼어 직교기저를 만드는 방법입니다.' },
      { term: 'QR 분해', def: '$A=QR$ ($Q$는 정규직교 열, $R$은 위삼각행렬)로 나타내는 것입니다.' },
      { term: '정규방정식', def: '최소제곱 해가 만족하는 식 $A^{T}A\\hat{\\mathbf{x}}=A^{T}\\mathbf{b}$입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '$(2, -1, 3)\\cdot(1, 4, 2)$를 계산하세요.',
        answer: '4',
        wrong: [{ a: '12', why: '$-1\\times 4=-4$의 부호를 놓쳤습니다. $2-4+6$입니다.' }],
        explain: '$2\\cdot 1+(-1)\\cdot 4+3\\cdot 2=2-4+6=4$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'expr', concept: 0,
        q: '$\\mathbf{v}=(1, 2, 3)$의 노름을 구하세요. (제곱근은 √ 또는 sqrt 로 쓰세요. 예: √5)',
        answer: 'sqrt(14)',
        wrong: [
          { a: '14', why: '$\\mathbf{v}\\cdot\\mathbf{v}=14$에서 멈췄습니다. 노름은 그 제곱근입니다.' },
          { a: '6', why: '성분을 그대로 더했습니다. 성분의 제곱을 더한 뒤 제곱근을 씌웁니다.' },
        ],
        explain: '$\\|\\mathbf{v}\\|=\\sqrt{1+4+9}=\\sqrt{14}$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 0,
        q: '두 벡터 $(1, k, 2)$와 $(3, 1, -1)$이 직교하도록 하는 $k$의 값을 구하세요.',
        answer: '-1',
        wrong: [{ a: '1', why: '$3+k-2=0$에서 이항할 때 부호를 다시 확인해 보세요.' }],
        explain: '직교하려면 내적이 0이어야 합니다. $3+k-2=0$이므로 $k=-1$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: '영벡터를 포함하지 않는 직교집합은 항상 일차독립입니다.',
        answer: true,
        explain: '$c_1\\mathbf{v}_1+\\cdots+c_k\\mathbf{v}_k=\\mathbf{0}$에 $\\mathbf{v}_i$를 내적하면 $c_i\\|\\mathbf{v}_i\\|^2=0$이고 $\\mathbf{v}_i\\ne\\mathbf{0}$이므로 $c_i=0$입니다. 모든 계수가 0이므로 일차독립입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 2,
        q: '$\\mathbf{v}=(5, 1)$을 $\\mathbf{u}=(1, 1)$ 위로 정사영한 벡터의 **첫째 성분**을 구하세요.',
        answer: '3',
        wrong: [{ a: '6', why: '$\\mathbf{v}\\cdot\\mathbf{u}=6$을 그대로 계수로 썼습니다. $\\mathbf{u}\\cdot\\mathbf{u}=2$로 나누어야 합니다.' }],
        explain: '$\\dfrac{\\mathbf{v}\\cdot\\mathbf{u}}{\\mathbf{u}\\cdot\\mathbf{u}}=\\dfrac{6}{2}=3$이므로 정사영은 $3(1, 1)=(3, 3)$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 1,
        q: '다음 중 $\\mathbf{R}^2$의 **정규직교**기저는 무엇입니까?',
        choices: [
          '$\\left\\{\\left(\\frac{3}{5}, \\frac{4}{5}\\right), \\left(-\\frac{4}{5}, \\frac{3}{5}\\right)\\right\\}$',
          '$\\{(3, 4), (-4, 3)\\}$',
          '$\\left\\{\\left(\\frac{3}{5}, \\frac{4}{5}\\right), \\left(\\frac{4}{5}, \\frac{3}{5}\\right)\\right\\}$',
          '$\\{(1, 1), (1, -1)\\}$',
        ],
        answer: 0,
        why: [
          '',
          '서로 직교하지만 길이가 5라서 단위벡터가 아닙니다. 정규직교는 길이도 1이어야 합니다.',
          '둘 다 단위벡터이지만 내적이 $\\frac{24}{25}\\ne 0$이라 직교하지 않습니다.',
          '서로 직교하지만 길이가 $\\sqrt{2}$라서 단위벡터가 아닙니다.',
        ],
        explain: '$\\left(\\frac{3}{5}\\right)^2+\\left(\\frac{4}{5}\\right)^2=1$로 둘 다 단위벡터이고, 내적은 $-\\frac{12}{25}+\\frac{12}{25}=0$으로 직교합니다.',
      },
      {
        id: 'p7', level: 2, type: 'short', check: 'number', concept: 0,
        q: '두 점 $(1, 2, 3)$과 $(3, 0, 4)$ 사이의 거리를 구하세요.',
        answer: '3',
        wrong: [{ a: '9', why: '거리의 제곱을 구했습니다. 제곱근을 씌워야 합니다.' }],
        explain: '차이 벡터는 $(-2, 2, -1)$이고 거리는 $\\sqrt{4+4+1}=3$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 1,
        q: '$3\\times 5$ 행렬 $A$의 계수가 2입니다. $\\mathbf{R}^5$에서 행공간의 직교여공간의 차원을 구하세요.',
        answer: '3',
        hint: '행공간의 직교여공간은 영공간입니다.',
        wrong: [
          { a: '2', why: '행공간 자체의 차원을 썼습니다. 직교여공간의 차원은 $5-2$입니다.' },
          { a: '1', why: '행의 개수 3에서 뺐습니다. 행공간은 $\\mathbf{R}^5$ 안에 있습니다.' },
        ],
        explain: '$(\\operatorname{Row} A)^{\\perp}=\\operatorname{Nul} A$이고, 그 차원은 $5-\\operatorname{rank} A=3$입니다. $\\operatorname{dim} W+\\operatorname{dim} W^{\\perp}=5$로도 확인할 수 있습니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 1,
        q: '정규직교기저 $\\mathbf{u}_1=\\left(\\frac{3}{5}, \\frac{4}{5}\\right)$, $\\mathbf{u}_2=\\left(-\\frac{4}{5}, \\frac{3}{5}\\right)$에 대하여 $\\mathbf{x}=(5, 5)=c_1\\mathbf{u}_1+c_2\\mathbf{u}_2$일 때 $c_1$을 구하세요.',
        answer: '7',
        hint: '정규직교기저에서는 $c_i=\\mathbf{x}\\cdot\\mathbf{u}_i$입니다.',
        wrong: [{ a: '-1', why: '$c_2=\\mathbf{x}\\cdot\\mathbf{u}_2$를 구했습니다.' }],
        explain: '$c_1=\\mathbf{x}\\cdot\\mathbf{u}_1=3+4=7$, $c_2=\\mathbf{x}\\cdot\\mathbf{u}_2=-4+3=-1$입니다. 확인: $7\\left(\\frac{3}{5}, \\frac{4}{5}\\right)-\\left(-\\frac{4}{5}, \\frac{3}{5}\\right)=(5, 5)$',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 3,
        q: '$\\mathbf{x}_1=(1, 1)$, $\\mathbf{x}_2=(1, 3)$에 그람-슈미트 과정을 쓸 때 $\\mathbf{v}_2$는 무엇입니까?',
        choices: ['$(-1, 1)$', '$(2, 2)$', '$(1, 3)$', '$(0, 2)$'],
        answer: 0,
        why: [
          '',
          '$\\mathbf{x}_2$의 $\\mathbf{v}_1$ 방향 성분(정사영)을 답했습니다. 이것을 $\\mathbf{x}_2$에서 빼야 합니다.',
          '$\\mathbf{x}_2$를 그대로 썼습니다. $(1, 3)\\cdot(1, 1)=4\\ne 0$이라 직교하지 않습니다.',
          '$\\mathbf{x}_1$을 한 번만 뺐습니다. 빼는 양은 $\\frac{4}{2}=2$배입니다.',
        ],
        explain: '$\\dfrac{\\mathbf{x}_2\\cdot\\mathbf{v}_1}{\\mathbf{v}_1\\cdot\\mathbf{v}_1}=\\dfrac{4}{2}=2$이므로 $\\mathbf{v}_2=(1, 3)-2(1, 1)=(-1, 1)$입니다. 확인: $(1, 1)\\cdot(-1, 1)=0$',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 4,
        q: '점 $(0, 0)$, $(1, 1)$, $(2, 1)$에 가장 잘 맞는 직선 $y=\\beta_0+\\beta_1x$를 최소제곱법으로 구할 때, 기울기 $\\beta_1$을 구하세요.',
        answer: '1/2',
        hint: '$A^{T}A=\\begin{bmatrix} 3 & 3 \\\\ 3 & 5 \\end{bmatrix}$이고 $A^{T}\\mathbf{b}=(\\sum y, \\sum xy)$입니다.',
        wrong: [{ a: '1/6', why: '$y$절편 $\\beta_0$을 구했습니다. 문제는 기울기를 묻습니다.' }],
        explain: '$A^{T}\\mathbf{b}=(0+1+1, 0+1+2)=(2, 3)$입니다. 정규방정식 $3\\beta_0+3\\beta_1=2$, $3\\beta_0+5\\beta_1=3$에서 $2\\beta_1=1$, $\\beta_1=\\frac{1}{2}$이고 $\\beta_0=\\frac{1}{6}$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'ox', concept: 3,
        q: '열들이 정규직교인 행렬 $Q$에 대하여 $Q^{T}Q=I$입니다.',
        answer: true,
        explain: '$Q^{T}Q$의 $(i, j)$ 성분은 $Q$의 $i$열과 $j$열의 내적입니다. 정규직교이면 $i=j$일 때 1, $i\\ne j$일 때 0이므로 단위행렬입니다. ($Q$가 정사각이 아니면 $QQ^{T}=I$가 성립하지 않을 수 있습니다.)',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 0,
        q: '$\\|\\mathbf{u}\\|=3$, $\\|\\mathbf{v}\\|=4$, $\\|\\mathbf{u}+\\mathbf{v}\\|=\\sqrt{37}$일 때 $\\|\\mathbf{u}-\\mathbf{v}\\|^2$을 구하세요.',
        answer: '13',
        hint: '$\\|\\mathbf{u}\\pm\\mathbf{v}\\|^2=\\|\\mathbf{u}\\|^2\\pm 2\\,\\mathbf{u}\\cdot\\mathbf{v}+\\|\\mathbf{v}\\|^2$을 쓰세요.',
        wrong: [
          { a: '25', why: '$\\mathbf{u}\\cdot\\mathbf{v}=0$이라고 보았습니다. 먼저 $\\|\\mathbf{u}+\\mathbf{v}\\|^2$에서 내적을 구하세요.' },
          { a: '6', why: '$\\mathbf{u}\\cdot\\mathbf{v}$를 구한 데서 멈췄습니다.' },
        ],
        explain: '$37=9+2\\,\\mathbf{u}\\cdot\\mathbf{v}+16$이므로 $\\mathbf{u}\\cdot\\mathbf{v}=6$입니다. $\\|\\mathbf{u}-\\mathbf{v}\\|^2=9-12+16=13$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 0,
        q: '$a^2+b^2+c^2=1$일 때 $2a+b+2c$의 최댓값을 구하세요.',
        answer: '3',
        hint: '$2a+b+2c=(2, 1, 2)\\cdot(a, b, c)$로 보고 코시-슈바르츠 부등식을 쓰세요.',
        wrong: [
          { a: '5', why: '계수를 그대로 더했습니다. $a=b=c=1$은 조건 $a^2+b^2+c^2=1$을 만족하지 않습니다.' },
          { a: '9', why: '$\\|(2, 1, 2)\\|^2$을 구했습니다. 최댓값은 노름 자체입니다.' },
        ],
        explain: '$|(2, 1, 2)\\cdot(a, b, c)|\\le\\|(2, 1, 2)\\|\\,\\|(a, b, c)\\|=3\\cdot 1=3$입니다. 등호는 $(a, b, c)$가 $(2, 1, 2)$와 같은 방향일 때, 곧 $(a, b, c)=\\left(\\frac{2}{3}, \\frac{1}{3}, \\frac{2}{3}\\right)$일 때 성립하므로 최댓값은 3입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'expr', concept: 2,
        q: '$W=\\operatorname{span}\\{(1, 1, 0), (1, -1, 1)\\}$일 때, 점 $\\mathbf{b}=(2, 0, -2)$와 $W$ 사이의 거리를 구하세요. (제곱근은 √ 또는 sqrt 로 쓰세요)',
        answer: 'sqrt(6)',
        hint: '두 생성 벡터가 직교하는지 먼저 확인하고, $\\operatorname{proj}_{W}\\mathbf{b}$를 구하세요.',
        wrong: [
          { a: '6', why: '거리의 제곱을 구했습니다.' },
          { a: 'sqrt(8)', why: '$\\|\\mathbf{b}\\|$를 구했습니다. $\\mathbf{b}$에서 $W$ 위로의 정사영을 뺀 벡터의 길이를 구해야 합니다.' },
        ],
        explain: '$(1, 1, 0)\\cdot(1, -1, 1)=0$이라 직교기저입니다. $\\operatorname{proj}_{W}\\mathbf{b}=\\frac{2}{2}(1, 1, 0)+\\frac{0}{3}(1, -1, 1)=(1, 1, 0)$이고, $\\mathbf{z}=\\mathbf{b}-(1, 1, 0)=(1, -1, -2)$입니다. 거리는 $\\|\\mathbf{z}\\|=\\sqrt{1+1+4}=\\sqrt{6}$입니다. ($\\mathbf{z}$는 두 생성 벡터와 모두 직교합니다.)',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 3,
        q: '열이 일차독립인 $m\\times n$ 행렬 $A$의 QR 분해 $A=QR$에서 $R$을 구하는 식은 무엇입니까?',
        choices: ['$R=Q^{T}A$', '$R=QA$', '$R=AQ^{T}$', '$R=A^{T}Q$'],
        answer: 0,
        why: [
          '',
          '크기부터 맞지 않습니다($Q$는 $m\\times n$). $A=QR$의 양변 왼쪽에 $Q$의 전치행렬을 곱해 보세요.',
          '$A$의 오른쪽에 곱하면 $Q$를 소거할 수 없습니다. $Q^{T}Q=I$를 쓰려면 왼쪽에 $Q$의 전치행렬을 곱합니다.',
          '이것은 $(Q^{T}A)^{T}=R^{T}$입니다. 아래삼각행렬이 나옵니다.',
        ],
        explain: '$A=QR$의 양변 왼쪽에 $Q$의 전치행렬을 곱하면 $Q^{T}A=Q^{T}QR=R$입니다($Q^{T}Q=I$). 성분으로는 $r_{ij}=\\mathbf{u}_i\\cdot\\mathbf{x}_j$입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 4,
        q: '해가 없는 연립방정식 $x=2$, $x=3$, $x=7$의 최소제곱 해 $\\hat{x}$를 구하세요.',
        answer: '4',
        hint: '$A=(1, 1, 1)^{T}$, $\\mathbf{b}=(2, 3, 7)$로 놓고 정규방정식을 쓰세요.',
        wrong: [{ a: '12', why: '$A^{T}\\mathbf{b}=12$에서 멈췄습니다. $A^{T}A=3$으로 나누어야 합니다.' }],
        explain: '$A^{T}A=3$, $A^{T}\\mathbf{b}=2+3+7=12$이므로 $3\\hat{x}=12$, $\\hat{x}=4$입니다. 측정값 여러 개를 하나의 값으로 맞출 때 최소제곱 해는 **평균**이 됩니다.',
      },
    ],

    deeper: [
      {
        title: '최소제곱법과 데이터 과학',
        body: '측정에는 늘 오차가 있어서 자료를 정확히 지나는 모형은 드뭅니다. 최소제곱법은 오차의 제곱의 합을 가장 작게 하는 모형을 고르는 방법으로, 19세기 초 천문학자들이 행성·혜성의 궤도를 관측값에서 구하면서 널리 쓰이게 되었습니다(르장드르와 가우스가 발전시켰습니다).\n\n오늘날에는 직선뿐 아니라 $y=\\beta_0+\\beta_1x+\\beta_2x^2$ 같은 곡선, 변수가 여러 개인 모형도 같은 정규방정식 $A^{T}A\\hat{\\mathbf{x}}=A^{T}\\mathbf{y}$ 꼴로 풉니다. 행렬 $A$의 열만 바꾸면 되기 때문입니다. 확률과 통계학 과정의 회귀분석은 이 결과에 오차의 확률 모형을 더해 해석합니다.',
      },
      {
        title: '직교성이 계산을 쉽게 하는 이유',
        body: '직교기저에서는 좌표 하나를 구할 때 다른 좌표를 신경 쓸 필요가 없습니다(내적 한 번). 그래서 공학에서는 신호를 서로 직교하는 사인·코사인 파동의 합으로 나타내는 **푸리에 급수**를 즐겨 씁니다. 각 진동수의 세기가 적분(함수의 내적) 한 번으로 바로 구해집니다.\n\n다음 단원에서는 대칭행렬이 항상 **직교하는 고유벡터**를 가진다는 사실(스펙트럼 정리)과, 모든 행렬을 두 직교행렬과 대각행렬로 나누는 특이값 분해를 배웁니다.',
      },
    ],

    faq: [
      {
        q: '정사영 공식에서 왜 $\\mathbf{u}\\cdot\\mathbf{u}$로 나누나요?',
        a: '$\\mathbf{u}$의 길이에 상관없이 같은 정사영이 나오게 하기 위해서입니다. $\\mathbf{u}$를 2배로 바꾸면 분자 $\\mathbf{v}\\cdot\\mathbf{u}$도 2배, 곱하는 $\\mathbf{u}$도 2배, 분모는 4배가 되어 결과가 그대로입니다. $\\mathbf{u}$가 단위벡터이면 분모가 1이라 $(\\mathbf{v}\\cdot\\mathbf{u})\\mathbf{u}$로 간단해집니다.',
      },
      {
        q: '최소제곱 해는 진짜 해인가요?',
        a: '아닙니다. 원래 식 $A\\mathbf{x}=\\mathbf{b}$를 만족하지는 않고, "가장 덜 틀리는" 근사해입니다. 만약 $A\\mathbf{x}=\\mathbf{b}$에 진짜 해가 있으면 오차가 0이 되므로 최소제곱 해가 곧 진짜 해가 됩니다.',
      },
      {
        q: '그람-슈미트에서 중간에 분수가 나오면 어떻게 하나요?',
        a: '$\\mathbf{v}_k$에 0이 아닌 수를 곱해도 방향이 같아 직교성은 그대로입니다. 예를 들어 $\\left(\\frac{1}{2}, -\\frac{1}{2}, 1\\right)$ 대신 $(1, -1, 2)$를 쓰고 계속 진행해도 됩니다. 정규직교기저가 필요하면 마지막에 길이로 나눕니다.',
      },
    ],

    mistakes: [
      '정사영을 $(\\mathbf{v}\\cdot\\mathbf{u})\\mathbf{u}$로 계산하는 실수 — $\\mathbf{u}$가 단위벡터가 아니면 $\\mathbf{u}\\cdot\\mathbf{u}$로 나누어야 합니다.',
      '직교하지 않는 기저로 $\\operatorname{proj}_{W}$ 합 공식을 쓰는 실수 — 먼저 그람-슈미트 과정으로 직교기저를 만듭니다.',
      '노름을 구할 때 제곱근을 빼먹는 실수 — $\\|\\mathbf{v}\\|^2=\\mathbf{v}\\cdot\\mathbf{v}$이고, $\\|\\mathbf{v}\\|$는 그 제곱근입니다.',
    ],

    gens: [
      {
        id: 'dot-norm',
        level: 1,
        title: '내적과 노름 계산',
        make: function (R) {
          var n = R.pick([3, 3, 4]);
          var u = [], v = [], i;
          for (i = 0; i < n; i++) { u.push(R.int(-4, 5)); v.push(R.int(-4, 5)); }
          if (u.every(function (x) { return x === 0; })) u[0] = 1;
          var kind = R.int(0, 1);
          if (kind === 0) {
            var d = dot(u, v);
            var abs = u.reduce(function (s, x, k) { return s + Math.abs(x * v[k]); }, 0);
            var w = [];
            if (abs !== d) w.push({ a: String(abs), why: '음수인 곱의 부호를 놓쳤습니다. 각 성분의 곱을 부호까지 그대로 더합니다.' });
            return {
              type: 'short', check: 'number', concept: 0,
              q: '$\\mathbf{u}=' + tup(u) + '$, $\\mathbf{v}=' + tup(v) + '$일 때 $\\mathbf{u}\\cdot\\mathbf{v}$를 구하세요.',
              answer: String(d),
              wrong: w,
              explain: '$\\mathbf{u}\\cdot\\mathbf{v}=' + dotTex(u, v) + '=' + d + '$입니다.' + (d === 0 ? ' 내적이 0이므로 두 벡터는 직교합니다.' : ''),
            };
          }
          var s = dot(u, u);
          var w2 = [];
          if (s !== 1) w2.push({ a: String(s), why: '$\\mathbf{u}\\cdot\\mathbf{u}=' + s + '$에서 멈췄습니다. 노름은 그 제곱근입니다.' });
          var sumAbs = u.reduce(function (t, x) { return t + Math.abs(x); }, 0);
          if (sumAbs * sumAbs !== s) w2.push({ a: String(sumAbs), why: '성분의 절댓값을 그대로 더했습니다. 성분의 제곱을 더한 뒤 제곱근을 씌웁니다.' });
          return {
            type: 'short', check: 'expr', concept: 0,
            q: '$\\mathbf{u}=' + tup(u) + '$의 노름 $\\|\\mathbf{u}\\|$를 구하세요. (제곱근은 √ 또는 sqrt 로 쓰세요. 예: √5)',
            answer: rootAns(s),
            wrong: w2,
            explain: '$\\|\\mathbf{u}\\|=\\sqrt{' + u.map(function (x) { return par(x) + '^2'; }).join('+') + '}=\\sqrt{' + s + '}' + (rootTex(s) === '\\sqrt{' + s + '}' ? '' : '=' + rootTex(s)) + '$입니다.',
          };
        },
      },
      {
        id: 'orth-k',
        level: 1,
        title: '직교 조건으로 미지수 구하기',
        make: function (R) {
          var k, a, d, e, f, c;
          do {
            k = R.nonzero(-5, 5);
            a = R.nonzero(-4, 4); d = R.int(-4, 4); e = R.pick([-2, -1, 1, 2]); f = R.pick([-1, 1]);
            c = -(a * d + k * e) / f;
          } while (Math.abs(c) > 9 || c === 0 || d === 0);
          var v = [d, e, f];
          var tex = '(' + a + ', k, ' + c + ')';
          return {
            type: 'short', check: 'number', concept: 0,
            q: '두 벡터 $\\mathbf{a}=' + tex + '$, $\\mathbf{b}=' + tup(v) + '$에 대하여 $\\mathbf{a}\\perp\\mathbf{b}$가 되도록 하는 $k$의 값을 구하세요.',
            answer: String(k),
            wrong: [{ a: String(-k), why: '이항할 때 부호가 바뀌었습니다. 내적 식을 다시 정리해 보세요.' }],
            explain: '직교하려면 내적이 0이어야 합니다. $' + par(a) + '\\cdot ' + par(d) + '+k\\cdot ' + par(e) + '+' + par(c) + '\\cdot ' + par(f) + '=0$, 곧 $' + (a * d + c * f) + (e < 0 ? '' : '+') + (e === 1 ? '' : e === -1 ? '-' : e) + 'k=0$이므로 $k=' + k + '$입니다.',
            hint: '내적이 0이 되는 식을 세우세요.',
          };
        },
      },
      {
        id: 'proj-2d',
        level: 2,
        title: '직선 위로의 직교사영',
        make: function (R) {
          var u, t, s;
          do {
            u = [R.int(-3, 3), R.int(-3, 3)];
          } while (dot(u, u) < 2);
          t = R.nonzero(-3, 3); s = R.nonzero(-2, 2);
          var up = [-u[1], u[0]];
          var v = [t * u[0] + s * up[0], t * u[1] + s * up[1]];
          var vu = dot(v, u), uu = dot(u, u);
          var proj = [t * u[0], t * u[1]];
          var correct = '$' + tup(proj) + '$';
          var cands = [
            ['$' + tup([vu * u[0], vu * u[1]]) + '$', '$\\mathbf{u}\\cdot\\mathbf{u}=' + uu + '$' + R.josa(uu, '으로/로') + ' 나누지 않았습니다. $\\mathbf{u}$가 단위벡터가 아니면 꼭 나누어야 합니다.'],
            ['$' + tup([s * up[0], s * up[1]]) + '$', '$\\mathbf{u}$에 수직인 성분 $\\mathbf{v}-\\operatorname{proj}_{\\mathbf{u}}\\mathbf{v}$를 답했습니다.'],
            ['$' + tup(v) + '$', '$\\mathbf{v}$를 그대로 썼습니다. 정사영은 $\\mathbf{u}$와 평행해야 합니다.'],
            ['$' + tup([-proj[0], -proj[1]]) + '$', '계수 $\\frac{\\mathbf{v}\\cdot\\mathbf{u}}{\\mathbf{u}\\cdot\\mathbf{u}}$의 부호를 다시 확인해 보세요.'],
            ['$' + tup([t * up[0], t * up[1]]) + '$', '방향을 $\\mathbf{u}$에 수직인 쪽으로 잡았습니다. 정사영은 $\\mathbf{u}$와 평행합니다.'],
          ];
          var reason = {};
          cands.forEach(function (k) { if (!(k[0] in reason)) reason[k[0]] = k[1]; });
          var pick = R.choices(correct, cands.map(function (k) { return k[0]; }));
          return {
            type: 'choice', concept: 2,
            q: '$\\mathbf{v}=' + tup(v) + '$, $\\mathbf{u}=' + tup(u) + '$일 때 $\\mathbf{v}$를 $\\mathbf{u}$ 위로 정사영한 벡터 $\\operatorname{proj}_{\\mathbf{u}}\\mathbf{v}$를 고르세요.',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (ch) { return ch === correct ? '' : reason[ch] || ''; }),
            explain: '$\\mathbf{v}\\cdot\\mathbf{u}=' + dotTex(v, u) + '=' + vu + '$, $\\mathbf{u}\\cdot\\mathbf{u}=' + uu + '$이므로 계수는 $\\frac{' + vu + '}{' + uu + '}=' + t + '$입니다. ' +
              '그래서 $\\operatorname{proj}_{\\mathbf{u}}\\mathbf{v}=' + par(t) + tup(u) + '=' + tup(proj) + '$입니다. 확인: $\\mathbf{v}-\\operatorname{proj}_{\\mathbf{u}}\\mathbf{v}=' + tup([s * up[0], s * up[1]]) + '$이고, 이 벡터와 $\\mathbf{u}$의 내적은 0입니다.',
          };
        },
      },
      {
        id: 'lsq-line',
        level: 2,
        title: '최소제곱 직선의 기울기와 절편',
        make: function (R) {
          var m = R.pick([3, 4]);
          var xs = [], ys = [], i, b1, b0;
          do {
            xs = []; ys = [];
            for (i = 0; i < m; i++) { xs.push(i); ys.push(R.int(0, 6)); }
            var Sx = 0, Sy = 0, Sxx = 0, Sxy = 0;
            for (i = 0; i < m; i++) { Sx += xs[i]; Sy += ys[i]; Sxx += xs[i] * xs[i]; Sxy += xs[i] * ys[i]; }
            b1 = R.F(m * Sxy - Sx * Sy, m * Sxx - Sx * Sx);
            b0 = R.F(Sy).sub(b1.mul(Sx)).div(m);
            // 세 점이 한 직선 위에 있으면 최소제곱의 의미가 없으므로 다시
            var exact = true;
            for (i = 0; i < m; i++) if (!b0.add(b1.mul(xs[i])).eq(R.F(ys[i]))) exact = false;
          } while (exact || b1.isZero());
          var askSlope = R.bool();
          var ans = askSlope ? b1 : b0;
          var other = askSlope ? b0 : b1;
          var ends = R.F(ys[m - 1] - ys[0], m - 1);
          var wrongs = [];
          if (!other.eq(ans)) wrongs.push({ a: other.toString(), why: askSlope ? '$y$절편 $\\beta_0$을 구했습니다. 문제는 기울기를 묻습니다.' : '기울기 $\\beta_1$을 구했습니다. 문제는 $y$절편을 묻습니다.' });
          if (askSlope && !ends.eq(ans) && !ends.eq(other)) wrongs.push({ a: ends.toString(), why: '양 끝 두 점만 이은 기울기입니다. 최소제곱 직선은 모든 점을 함께 고려합니다.' });
          var pts = xs.map(function (x, k) { return '$(' + x + ', ' + ys[k] + ')$'; }).join(', ');
          return {
            type: 'short', check: 'number', concept: 4,
            q: '점 ' + pts + '에 가장 잘 맞는 직선 $y=\\beta_0+\\beta_1x$를 최소제곱법으로 구할 때, ' + (askSlope ? '기울기 $\\beta_1$' : '$y$절편 $\\beta_0$') + '을 구하세요. (분수로 써도 됩니다)',
            fig: { type: 'coord', xmin: -1, xmax: m, ymin: -1, ymax: 7, points: xs.map(function (x, k) { return { x: x, y: ys[k] }; }), alt: '주어진 자료의 점 ' + m + '개' },
            answer: ans.toString(),
            hint: '정규방정식 $A^{T}A\\begin{bmatrix} \\beta_0 \\\\ \\beta_1 \\end{bmatrix}=A^{T}\\mathbf{b}$에서 $A^{T}A=\\begin{bmatrix} ' + m + ' & ' + Sx + ' \\\\ ' + Sx + ' & ' + Sxx + ' \\end{bmatrix}$입니다.',
            wrong: wrongs,
            explain: '$A^{T}A=\\begin{bmatrix} ' + m + ' & ' + Sx + ' \\\\ ' + Sx + ' & ' + Sxx + ' \\end{bmatrix}$ (자료 수, $\\sum x$, $\\sum x^2$), $A^{T}\\mathbf{b}=(' + Sy + ', ' + Sxy + ')$ ($\\sum y$, $\\sum xy$)입니다.\n\n' +
              '정규방정식 $' + m + '\\beta_0+' + Sx + '\\beta_1=' + Sy + '$, $' + Sx + '\\beta_0+' + Sxx + '\\beta_1=' + Sxy + '$' + R.josa(Sxy, '을/를') + ' 풀면 $\\beta_1=' + b1.toTex() + '$, $\\beta_0=' + b0.toTex() + '$입니다.\n\n' +
              '그래서 ' + (askSlope ? '기울기는' : '$y$절편은') + ' $' + ans.toTex() + '$입니다.',
          };
        },
      },
    ],
  });
})();
