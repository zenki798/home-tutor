/* 선형대수학 · 기저와 차원
 * 기저·차원, 좌표벡터와 기저 변환, 열공간·행공간·영공간, 계수(rank)·퇴화차수(nullity)와 차원 정리.
 * (앞 단원: 가우스 소거법·역행렬·행렬식·부분공간·일차독립 / 다음 단원: 선형변환) */
(function () {
  // ---------- 글자 도우미 ----------
  function tup(v) { return '(' + v.join(', ') + ')'; }
  function texOf(x) { return typeof x === 'number' ? String(x) : x.toTex(); }
  function mat(rows) {
    return '\\begin{bmatrix} ' + rows.map(function (r) { return r.map(texOf).join(' & '); }).join(' \\\\ ') + ' \\end{bmatrix}';
  }
  function setTex(vs) { return '$\\{' + vs.map(tup).join(', ') + '\\}$'; }

  // ---------- 행 사다리꼴 (정확한 분수) ----------
  function echelon(R, rows) {
    var A = rows.map(function (r) { return r.map(function (x) { return R.F(x); }); });
    var m = A.length, n = A[0].length, piv = [], r = 0;
    for (var c = 0; c < n && r < m; c++) {
      var p = -1;
      for (var i = r; i < m; i++) if (!A[i][c].isZero()) { p = i; break; }
      if (p < 0) continue;
      var t = A[p]; A[p] = A[r]; A[r] = t;
      for (i = r + 1; i < m; i++) {
        if (A[i][c].isZero()) continue;
        var f = A[i][c].div(A[r][c]);
        A[i] = A[i].map(function (x, j) { return x.sub(f.mul(A[r][j])); });
      }
      piv.push(c); r++;
    }
    return { rows: A, pivots: piv, rank: r };
  }
  function rankOf(R, rows) { return rows.length ? echelon(R, rows).rank : 0; }
  // 벡터 모음 cands 가 행렬 A 의 열공간의 기저인가
  function isColBasis(R, A, cands) {
    var cols = A[0].map(function (_, j) { return A.map(function (row) { return row[j]; }); });
    var r = rankOf(R, cols);
    if (cands.length !== r) return false;
    if (cands[0].length !== A.length) return false;
    if (rankOf(R, cands) !== r) return false;
    return rankOf(R, cols.concat(cands)) === r;
  }
  // E(사다리꼴, 피벗 1) 위에 단위 하삼각 행렬 L 을 곱해 A = L E 를 만든다 → 소거하면 다시 E 가 나온다
  function buildMatrix(R, rank) {
    var pivSets = { 1: [[0]], 2: [[0, 1], [0, 2], [0, 3]], 3: [[0, 1, 2], [0, 1, 3], [0, 2, 3]] };
    var piv = R.pick(pivSets[rank]);
    var E = [];
    for (var i = 0; i < 3; i++) {
      var row = [0, 0, 0, 0];
      if (i < rank) {
        row[piv[i]] = 1;
        for (var j = piv[i] + 1; j < 4; j++) row[j] = R.int(-3, 3);
      }
      E.push(row);
    }
    var l21 = R.nonzero(-2, 2), l31 = R.int(-2, 2), l32 = R.nonzero(-2, 2);
    var A = [
      E[0].slice(),
      E[0].map(function (x, j) { return l21 * x + E[1][j]; }),
      E[0].map(function (x, j) { return l31 * x + l32 * E[1][j] + E[2][j]; }),
    ];
    return { A: A, E: E, piv: piv };
  }

  // ---------- 좌표평면 위 벡터 그림 ----------
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
      s += '<line x1="' + X(g.from[0]) + '" y1="' + Y(g.from[1]) + '" x2="' + X(g.to[0]) + '" y2="' + Y(g.to[1]) + '" stroke="currentColor" stroke-width="1.3" stroke-dasharray="5 4"/>';
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
    id: 'math-u-linalg-05',
    course: 'math-u-linalg',
    title: '기저와 차원',
    summary: '벡터공간의 기저와 차원을 구하고, 행렬의 열공간·행공간·영공간과 계수(rank)·퇴화차수(nullity)의 관계를 공부합니다.',
    goals: [
      '기저의 뜻을 알고, 주어진 벡터들이 기저인지 판정하며 벡터공간의 차원을 구할 수 있다.',
      '기저에 대한 좌표벡터를 구하고, 기저 변환 행렬로 좌표를 바꿀 수 있다.',
      '행렬의 열공간·행공간·영공간의 기저를 행 소거로 구할 수 있다.',
      '계수와 퇴화차수를 구하고 차원 정리(rank + nullity = 열의 개수)를 쓸 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '기저: 공간을 만드는 최소한의 재료',
        body: '벡터공간 $V$의 벡터들 $\\mathbf{b}_1, \\ldots, \\mathbf{b}_n$이 다음 두 조건을 모두 만족하면 이들을 $V$의 **기저**(basis)라고 합니다.\n\n1. **$V$를 생성한다**: $V$의 모든 벡터가 $\\mathbf{b}_1, \\ldots, \\mathbf{b}_n$의 일차결합으로 나타난다.\n2. **일차독립이다**: 어느 하나도 나머지의 일차결합이 아니다.\n\n생성 조건은 "재료가 모자라지 않다", 일차독립 조건은 "남는 재료가 없다"는 뜻입니다. 그래서 기저로 나타낸 일차결합 $\\mathbf{x}=c_1\\mathbf{b}_1+\\cdots+c_n\\mathbf{b}_n$의 계수는 **하나로 정해집니다**(두 가지로 나타나면 빼서 일차종속이 되기 때문입니다).\n\n예: $\\mathbf{e}_1=(1, 0, 0)$, $\\mathbf{e}_2=(0, 1, 0)$, $\\mathbf{e}_3=(0, 0, 1)$은 $\\mathbf{R}^3$의 **표준기저**입니다. $(1, 1, 0)$, $(0, 1, 1)$, $(1, 0, 1)$도 $\\mathbf{R}^3$의 기저입니다. 세 벡터를 열로 놓은 행렬의 행렬식이 $2\\ne 0$이기 때문입니다.\n\n> 💡 $\\mathbf{R}^n$의 벡터 $n$개가 기저인지는 그 벡터들을 열로 놓은 정사각행렬의 행렬식이 0이 아닌지(곧 가역인지)로 판정할 수 있습니다.',
        easy: '레고로 집을 짓는다고 생각해 보세요. "기저"는 어떤 모양이든 만들 수 있으면서(생성), 쓸데없이 겹치는 블록이 하나도 없는(일차독립) 블록 세트입니다.\n\n평면에서는 $(1, 0)$과 $(0, 1)$ 두 개면 어느 점이든 "오른쪽으로 몇, 위로 몇"으로 갈 수 있습니다. 여기에 $(1, 1)$을 더 넣으면 이미 만들 수 있는 것이라 쓸데없이 겹치고, $(1, 0)$ 하나만 있으면 위로 갈 수가 없습니다.',
        check: {
          type: 'ox',
          q: '$(1, 0)$, $(0, 1)$, $(1, 1)$은 $\\mathbf{R}^2$의 기저입니다.',
          answer: false,
          explain: '세 벡터로 평면 전체를 만들 수는 있지만 $(1, 1)=(1, 0)+(0, 1)$이므로 일차종속입니다. 기저는 생성과 일차독립을 모두 만족해야 하므로 기저가 아닙니다. 하나를 빼면 기저가 됩니다.',
        },
      },
      {
        title: '차원',
        body: '한 벡터공간의 기저는 여러 가지이지만, **기저를 이루는 벡터의 개수는 항상 같습니다.** 이 개수를 $V$의 **차원**(dimension)이라 하고 $\\operatorname{dim} V$로 씁니다. 영공간 $\\{\\mathbf{0}\\}$의 차원은 0으로 약속합니다.\n\n| 공간 | 기저의 예 | 차원 |\n|---|---|---|\n| $\\mathbf{R}^n$ | $\\mathbf{e}_1, \\ldots, \\mathbf{e}_n$ | $n$ |\n| 차수가 2 이하인 다항식 전체 $P_2$ | $1, t, t^2$ | 3 |\n| $2\\times 2$ 행렬 전체 | 성분 하나만 1인 행렬 4개 | 4 |\n| $\\mathbf{R}^3$에서 원점을 지나는 평면 | 평면 위의 평행하지 않은 두 벡터 | 2 |\n\n차원이 $n$인 공간에서는 다음이 성립합니다.\n\n- 벡터가 $n$개보다 많으면 반드시 일차종속입니다.\n- 벡터가 $n$개보다 적으면 공간 전체를 생성할 수 없습니다.\n- 벡터가 **정확히 $n$개**이면, 일차독립이기만 해도(또는 생성하기만 해도) 기저입니다.\n\n> ⚠️ $P_2$의 차원은 2가 아니라 3입니다. 상수항 $1$도 기저에 들어갑니다.',
        easy: '차원은 "그 공간에서 독립적으로 움직일 수 있는 방향의 수"입니다. 직선 위의 개미는 앞뒤 한 방향(1차원), 책상 위의 개미는 두 방향(2차원), 방 안의 파리는 세 방향(3차원)으로 움직입니다.\n\n다항식 $a+bt+ct^2$도 $a$, $b$, $c$ 세 수를 각각 마음대로 고를 수 있으니 3차원입니다.',
        check: {
          type: 'choice',
          q: '차수가 3 이하인 다항식 전체의 공간 $P_3$의 차원은 얼마입니까?',
          choices: ['4', '3', '2'],
          answer: 0,
          why: ['', '최고차항의 차수만 세었습니다. 기저 $1, t, t^2, t^3$에는 상수항 $1$도 들어갑니다.', '기저 $1, t, t^2, t^3$을 모두 세어 보세요. 계수 $a, b, c, d$ 네 개를 마음대로 고를 수 있습니다.'],
          explain: '$P_3$의 원소는 $a+bt+ct^2+dt^3$ 꼴이고, $1, t, t^2, t^3$이 기저입니다. 그래서 차원은 4입니다.',
        },
      },
      {
        title: '좌표벡터와 기저 변환',
        body: '$B=\\{\\mathbf{b}_1, \\ldots, \\mathbf{b}_n\\}$이 기저이면 모든 $\\mathbf{x}$는 $\\mathbf{x}=c_1\\mathbf{b}_1+\\cdots+c_n\\mathbf{b}_n$으로 단 한 가지로 나타납니다. 이 계수를 모은 $[\\mathbf{x}]_B=(c_1, \\ldots, c_n)$을 **$B$에 대한 좌표벡터**라고 합니다.\n\n예: $B=\\{(1, 1), (1, -1)\\}$, $\\mathbf{x}=(3, 1)$이면 $c_1+c_2=3$, $c_1-c_2=1$에서 $c_1=2$, $c_2=1$입니다. 곧 $[\\mathbf{x}]_B=(2, 1)$입니다(그림: $2\\mathbf{b}_1$만큼 간 뒤 $\\mathbf{b}_2$만큼 더 갑니다).\n\n기저 벡터를 **열로** 놓은 행렬 $P_B=[\\,\\mathbf{b}_1\\ \\cdots\\ \\mathbf{b}_n\\,]$을 쓰면 식이 간단해집니다.\n\n$\\mathbf{x}=P_B\\,[\\mathbf{x}]_B, \\qquad [\\mathbf{x}]_B=P_B^{-1}\\,\\mathbf{x}$\n\n두 기저 $B$, $C$ 사이에서는 $[\\mathbf{x}]_C=P_C^{-1}P_B\\,[\\mathbf{x}]_B$입니다. 행렬 $P_C^{-1}P_B$를 **$B$에서 $C$로의 기저 변환 행렬**(좌표 변환 행렬)이라고 합니다.\n\n> 💡 기저가 다르면 같은 벡터도 좌표가 달라집니다. 같은 장소를 "북쪽으로 3블록"이라고도, "북동쪽 대로를 따라 2블록"이라고도 말할 수 있는 것과 같습니다.',
        easy: '좌표벡터는 "길 안내"입니다. 표준기저로는 "오른쪽 3, 위 1"이라고 안내하던 점 $(3, 1)$을, 기저 $B$로는 "$\\mathbf{b}_1$ 방향으로 2걸음, $\\mathbf{b}_2$ 방향으로 1걸음"이라고 안내합니다. 그래서 $[\\mathbf{x}]_B=(2, 1)$입니다.\n\n좌표를 구하는 일은 결국 연립일차방정식 $P_B\\,\\mathbf{c}=\\mathbf{x}$를 푸는 일입니다.',
        fig: {
          type: 'svg',
          alt: '기저 b1=(1,1), b2=(1,-1)과 벡터 x=(3,1). 원점에서 2b1만큼 간 점 (2,2)에서 b2만큼 더 가면 x에 닿는다.',
          svg: plane({
            xmin: -1, xmax: 4, ymin: -2, ymax: 3, u: 40,
            segs: [{ from: [1, 1], to: [2, 2] }, { from: [2, 2], to: [3, 1] }],
            vecs: [
              { to: [1, 1], label: 'b₁', lx: 0.45, ly: 1.05, color: 'var(--fig-1)' },
              { to: [1, -1], label: 'b₂', lx: 0.45, ly: -1.05, color: 'var(--fig-2)' },
              { to: [3, 1], label: 'x', lx: 3.3, ly: 0.8, color: 'var(--fig-3)' },
            ],
          }),
        },
        check: {
          type: 'short', check: 'number',
          q: '기저 $B=\\{(1, 0), (1, 1)\\}$에 대하여 $\\mathbf{x}=(5, 2)$의 좌표벡터 $[\\mathbf{x}]_B$의 **첫째 성분**을 구하세요.',
          answer: '3',
          wrong: [
            { a: '5', why: '표준좌표를 그대로 썼습니다. $c_1(1, 0)+c_2(1, 1)=(5, 2)$를 풀어야 합니다.' },
            { a: '2', why: '둘째 성분을 구했습니다. 둘째 식에서 $c_2=2$이고, 첫째 식 $c_1+c_2=5$에서 $c_1$을 구하세요.' },
          ],
          explain: '$c_1(1, 0)+c_2(1, 1)=(c_1+c_2, c_2)=(5, 2)$이므로 $c_2=2$, $c_1=3$입니다. 곧 $[\\mathbf{x}]_B=(3, 2)$이고 첫째 성분은 3입니다.',
        },
      },
      {
        title: '열공간·행공간·영공간',
        body: '$m\\times n$ 행렬 $A$에는 세 가지 부분공간이 따라옵니다.\n\n| 이름 | 뜻 | 들어 있는 곳 |\n|---|---|---|\n| 열공간 $\\operatorname{Col} A$ | $A$의 열들이 생성하는 공간 $=\\{A\\mathbf{x}\\}$ | $\\mathbf{R}^m$ |\n| 행공간 $\\operatorname{Row} A$ | $A$의 행들이 생성하는 공간 | $\\mathbf{R}^n$ |\n| 영공간 $\\operatorname{Nul} A$ | $A\\mathbf{x}=\\mathbf{0}$의 해 전체 | $\\mathbf{R}^n$ |\n\n기저는 모두 **행 사다리꼴** $U$ 하나로 구합니다.\n\n- **열공간**: $U$에서 피벗이 있는 열의 번호를 찾고, **원래 행렬 $A$**의 그 열들을 고릅니다.\n- **행공간**: $U$의 0이 아닌 행들이 기저입니다(행 연산은 행공간을 바꾸지 않습니다).\n- **영공간**: $U\\mathbf{x}=\\mathbf{0}$을 자유변수로 풀어, 자유변수마다 벡터 하나씩 얻습니다.\n\n> ⚠️ 행 연산은 열공간을 **바꿉니다**. 그래서 열공간의 기저로는 $U$의 열이 아니라 $A$의 피벗 열을 써야 합니다. 대신 열들 사이의 일차결합 관계는 행 연산을 해도 그대로이므로, 어느 열이 피벗 열인지는 $U$에서 읽어도 됩니다.',
        easy: '세 공간은 행렬을 세 방향에서 본 모습입니다.\n\n- 열공간: "$A\\mathbf{x}$로 **만들 수 있는** 결과 전체" — $A\\mathbf{x}=\\mathbf{b}$가 해를 가지는 $\\mathbf{b}$의 모임입니다.\n- 영공간: "$A$를 곱하면 **사라지는** 입력 전체".\n- 행공간: 행들이 만드는 공간으로, 영공간과 서로 수직인 짝입니다(내적 단원에서 다시 봅니다).',
        check: {
          type: 'ox',
          q: '$\\operatorname{Col} A$의 기저를 구할 때는 행 사다리꼴 $U$의 피벗 열을 그대로 쓰면 됩니다.',
          answer: false,
          explain: '행 연산은 열공간을 바꾸므로 $U$의 열은 $\\operatorname{Col} A$의 기저가 아닐 수 있습니다. 피벗의 **위치**만 $U$에서 읽고, 기저로는 **원래 $A$**의 그 열들을 씁니다.',
        },
      },
      {
        title: '계수·퇴화차수와 차원 정리',
        body: '$A$의 **계수**(rank)는 열공간의 차원, **퇴화차수**(nullity)는 영공간의 차원입니다.\n\n$\\operatorname{rank} A=\\operatorname{dim}\\operatorname{Col} A=\\text{피벗의 개수}, \\qquad \\operatorname{nullity} A=\\operatorname{dim}\\operatorname{Nul} A=\\text{자유변수의 개수}$\n\n행공간의 기저는 사다리꼴의 0이 아닌 행, 곧 피벗이 있는 행이므로 $\\operatorname{dim}\\operatorname{Row} A=\\operatorname{rank} A$이기도 합니다. 그래서 $\\operatorname{rank} A=\\operatorname{rank} A^{T}$입니다.\n\n$n$개의 열은 피벗 열이거나 자유변수 열이므로 다음 **차원 정리**(계수 정리)가 성립합니다.\n\n$\\operatorname{rank} A+\\operatorname{nullity} A=n\\quad(\\text{열의 개수})$\n\n예: $4\\times 6$ 행렬의 계수가 3이면 퇴화차수는 $6-3=3$입니다. 곧 $A\\mathbf{x}=\\mathbf{0}$의 해공간은 $\\mathbf{R}^6$ 안의 3차원 공간입니다.\n\n> ⚠️ 빼는 수는 **열의 개수** $n$입니다. 행의 개수 $m$에서 빼면 $A^{T}$의 영공간 차원 $m-\\operatorname{rank} A$가 됩니다.',
        easy: '열 $n$개를 "변수 $n$개"로 보세요. 소거를 하면 변수마다 둘 중 하나가 됩니다.\n\n- 피벗 변수: 다른 변수로 값이 정해지는 변수 → 개수가 계수\n- 자유변수: 마음대로 고를 수 있는 변수 → 개수가 퇴화차수(해공간의 차원)\n\n둘을 더하면 당연히 변수 전체의 개수 $n$입니다.',
        check: {
          type: 'short', check: 'number',
          q: '$4\\times 6$ 행렬 $A$의 계수가 3일 때, $\\operatorname{nullity} A$를 구하세요.',
          answer: '3',
          wrong: [{ a: '1', why: '행의 개수 4에서 뺐습니다. 차원 정리에서 빼는 수는 열의 개수 6입니다.' }],
          explain: '차원 정리에서 $\\operatorname{rank} A+\\operatorname{nullity} A=6$이므로 $\\operatorname{nullity} A=6-3=3$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '행렬 $A=\\begin{bmatrix} 1 & 2 & 0 & 1 \\\\ 2 & 4 & 1 & 4 \\\\ 3 & 6 & 1 & 5 \\end{bmatrix}$의 열공간·행공간·영공간의 기저와 계수·퇴화차수를 구하세요.',
        steps: [
          '둘째 행에서 첫째 행의 2배를, 셋째 행에서 첫째 행의 3배를 빼면 둘째·셋째 행이 모두 $(0, 0, 1, 2)$가 됩니다. 셋째 행에서 둘째 행을 빼면 $U=\\begin{bmatrix} 1 & 2 & 0 & 1 \\\\ 0 & 0 & 1 & 2 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}$입니다.',
          '피벗은 1열과 3열에 있습니다. 그래서 $\\operatorname{rank} A=2$입니다.',
          '열공간의 기저: 원래 $A$의 1열과 3열, 곧 $\\{(1, 2, 3), (0, 1, 1)\\}$입니다.',
          '행공간의 기저: $U$의 0이 아닌 행 $\\{(1, 2, 0, 1), (0, 0, 1, 2)\\}$입니다.',
          '영공간: 자유변수 $x_2=s$, $x_4=t$로 두면 $x_3=-2t$, $x_1=-2s-t$입니다. $\\mathbf{x}=s(-2, 1, 0, 0)+t(-1, 0, -2, 1)$이므로 기저는 $\\{(-2, 1, 0, 0), (-1, 0, -2, 1)\\}$이고 $\\operatorname{nullity} A=2$입니다.',
          '확인: $\\operatorname{rank} A+\\operatorname{nullity} A=2+2=4$로 열의 개수와 같습니다.',
        ],
        answer: '$\\operatorname{rank} A=2$, $\\operatorname{nullity} A=2$',
      },
      {
        q: '기저 $B=\\{(1, 2), (3, 5)\\}$에 대하여 $\\mathbf{x}=(1, 1)$의 좌표벡터 $[\\mathbf{x}]_B$를 구하세요.',
        steps: [
          '기저 벡터를 열로 놓으면 $P_B=\\begin{bmatrix} 1 & 3 \\\\ 2 & 5 \\end{bmatrix}$이고, $\\det P_B=5-6=-1$입니다.',
          '$P_B^{-1}=\\dfrac{1}{-1}\\begin{bmatrix} 5 & -3 \\\\ -2 & 1 \\end{bmatrix}=\\begin{bmatrix} -5 & 3 \\\\ 2 & -1 \\end{bmatrix}$입니다.',
          '$[\\mathbf{x}]_B=P_B^{-1}\\mathbf{x}=(-5+3, 2-1)=(-2, 1)$입니다.',
          '검산: $-2(1, 2)+1\\cdot(3, 5)=(1, 1)$로 맞습니다.',
        ],
        answer: '$[\\mathbf{x}]_B=(-2, 1)$',
      },
    ],

    terms: [
      { term: '기저', def: '벡터공간을 생성하고 일차독립인 벡터들의 모임입니다. 예: $\\mathbf{R}^2$의 기저 $\\{(1, 0), (0, 1)\\}$' },
      { term: '표준기저', def: '$\\mathbf{R}^n$에서 한 성분만 1이고 나머지가 0인 벡터 $\\mathbf{e}_1, \\ldots, \\mathbf{e}_n$입니다.' },
      { term: '차원', def: '기저를 이루는 벡터의 개수입니다. 기저를 어떻게 고르든 같습니다. 예: $\\operatorname{dim}\\mathbf{R}^n=n$, $\\operatorname{dim} P_2=3$' },
      { term: '좌표벡터', def: '벡터를 기저 $B$의 일차결합으로 나타냈을 때의 계수를 모은 벡터 $[\\mathbf{x}]_B$입니다.' },
      { term: '기저 변환 행렬', def: '한 기저에 대한 좌표를 다른 기저에 대한 좌표로 바꾸는 행렬입니다. $B$에서 $C$로 바꾸는 행렬은 $P_C^{-1}P_B$입니다.' },
      { term: '열공간', def: '행렬의 열들이 생성하는 공간 $\\operatorname{Col} A=\\{A\\mathbf{x}\\}$입니다. $A\\mathbf{x}=\\mathbf{b}$가 해를 가지는 $\\mathbf{b}$의 모임과 같습니다.' },
      { term: '행공간', def: '행렬의 행들이 생성하는 공간 $\\operatorname{Row} A$입니다. 행 연산을 해도 바뀌지 않습니다.' },
      { term: '영공간', def: '$A\\mathbf{x}=\\mathbf{0}$의 해 전체의 집합 $\\operatorname{Nul} A$입니다. 핵이라고도 합니다.' },
      { term: '계수(rank)', def: '열공간의 차원으로, 행 사다리꼴의 피벗 개수와 같습니다. 행공간의 차원과도 같습니다.' },
      { term: '퇴화차수(nullity)', def: '영공간의 차원으로, $A\\mathbf{x}=\\mathbf{0}$을 풀 때 자유변수의 개수와 같습니다. 차원 정리: 계수 + 퇴화차수 = 열의 개수' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '다음 중 $\\mathbf{R}^2$의 기저인 것은 무엇입니까?',
        choices: ['$\\{(1, 2), (2, 3)\\}$', '$\\{(1, 2), (2, 4)\\}$', '$\\{(1, 0), (0, 1), (1, 1)\\}$', '$\\{(0, 0), (1, 1)\\}$'],
        answer: 0,
        why: [
          '',
          '$(2, 4)=2(1, 2)$이므로 일차종속입니다. 두 벡터가 한 직선 위에 있어 평면을 생성하지 못합니다.',
          '벡터가 3개로 2차원 공간의 차원보다 많아 반드시 일차종속입니다.',
          '영벡터가 들어 있으면 항상 일차종속입니다.',
        ],
        explain: '$\\begin{vmatrix} 1 & 2 \\\\ 2 & 3 \\end{vmatrix}=3-4=-1\\ne 0$이므로 $(1, 2)$, $(2, 3)$은 일차독립이고, 2차원 공간의 일차독립인 벡터 2개는 기저입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 1,
        q: '$\\mathbf{R}^3$에서 평면 $x+y+z=0$은 원점을 지나는 부분공간입니다. 이 부분공간의 차원을 구하세요.',
        answer: '2',
        wrong: [
          { a: '3', why: '$\\mathbf{R}^3$ 전체의 차원을 썼습니다. 식 하나가 자유도를 하나 줄입니다.' },
          { a: '1', why: '식의 개수를 세었습니다. 자유변수의 개수(평면 위의 독립인 방향 수)를 세어야 합니다.' },
        ],
        explain: '$x=-y-z$이고 $y=s$, $z=t$가 자유변수이므로 $(x, y, z)=s(-1, 1, 0)+t(-1, 0, 1)$입니다. 기저 벡터가 2개이므로 차원은 2입니다.',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 1,
        q: '$\\mathbf{R}^3$에서 일차독립인 벡터 3개는 항상 $\\mathbf{R}^3$의 기저입니다.',
        answer: true,
        explain: '$\\mathbf{R}^3$의 차원은 3입니다. 차원이 $n$인 공간에서 일차독립인 벡터 $n$개는 자동으로 공간 전체를 생성하므로 기저입니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', concept: 4,
        q: '$5\\times 7$ 행렬 $A$의 계수가 3입니다. $A\\mathbf{x}=\\mathbf{0}$의 해공간의 차원을 구하세요.',
        answer: '4',
        wrong: [
          { a: '2', why: '행의 개수 5에서 뺐습니다. 해 $\\mathbf{x}$는 $\\mathbf{R}^7$에 있으므로 열의 개수 7에서 빼야 합니다.' },
          { a: '3', why: '계수를 그대로 썼습니다. 해공간의 차원은 퇴화차수입니다.' },
        ],
        explain: '해공간은 $\\operatorname{Nul} A$이고, 차원 정리에서 $\\operatorname{nullity} A=7-3=4$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 3,
        q: '$A$가 $3\\times 5$ 행렬일 때, $\\operatorname{Nul} A$는 어느 공간의 부분공간입니까?',
        choices: ['$\\mathbf{R}^5$', '$\\mathbf{R}^3$', '$\\mathbf{R}^{15}$', '$\\mathbf{R}^2$'],
        answer: 0,
        why: [
          '',
          '$\\mathbf{R}^3$은 $A\\mathbf{x}$가 사는 곳으로, 열공간이 들어 있는 공간입니다.',
          '행렬의 성분 개수를 세었습니다. $A\\mathbf{x}$를 계산할 수 있으려면 $\\mathbf{x}$의 성분이 열의 개수만큼 있어야 합니다.',
          '열의 개수에서 행의 개수를 뺐습니다. 이것은 퇴화차수의 최솟값과 관계가 있을 뿐, 공간의 이름이 아닙니다.',
        ],
        explain: '$A\\mathbf{x}$가 정의되려면 $\\mathbf{x}$는 성분이 5개여야 합니다. 그래서 $\\operatorname{Nul} A$는 $\\mathbf{R}^5$의 부분공간이고, $\\operatorname{Col} A$는 $\\mathbf{R}^3$의 부분공간입니다.',
      },
      {
        id: 'p6', level: 1, type: 'ox', concept: 4,
        q: '모든 행렬 $A$에 대하여 $\\operatorname{rank} A=\\operatorname{rank} A^{T}$입니다.',
        answer: true,
        explain: '$A^{T}$의 열공간은 $A$의 행공간입니다. 행공간과 열공간의 차원은 모두 피벗의 개수와 같으므로 두 계수는 같습니다.',
      },
      {
        id: 'p7', level: 2, type: 'short', check: 'number', concept: 2,
        q: '기저 $B=\\{(1, 1), (1, -1)\\}$에 대하여 $\\mathbf{x}=(5, 1)$의 좌표벡터 $[\\mathbf{x}]_B$의 **둘째 성분**을 구하세요.',
        answer: '2',
        hint: '$c_1(1, 1)+c_2(1, -1)=(5, 1)$을 성분별로 쓰면 연립방정식이 됩니다.',
        wrong: [
          { a: '1', why: '표준좌표의 둘째 성분을 그대로 썼습니다. 기저 $B$로 나타낸 계수를 구해야 합니다.' },
          { a: '3', why: '첫째 성분을 구했습니다. 둘째 성분은 $\\mathbf{b}_2=(1, -1)$의 계수입니다.' },
        ],
        explain: '$c_1+c_2=5$, $c_1-c_2=1$을 풀면 $c_1=3$, $c_2=2$입니다. 곧 $[\\mathbf{x}]_B=(3, 2)$이고 둘째 성분은 2입니다. 검산: $3(1, 1)+2(1, -1)=(5, 1)$',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 4,
        q: '행렬 $A=\\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 1 & 0 & 1 \\end{bmatrix}$의 계수를 구하세요.',
        answer: '2',
        hint: '둘째 행과 첫째 행의 관계를 살펴보세요.',
        wrong: [
          { a: '3', why: '행이 3개라고 계수가 3인 것은 아닙니다. 둘째 행이 첫째 행의 2배라서 소거하면 0인 행이 생깁니다.' },
          { a: '1', why: '둘째 행만 없어지고 셋째 행 $(1, 0, 1)$은 첫째 행의 배수가 아니므로 피벗이 하나 더 남습니다.' },
        ],
        explain: '둘째 행 $=2\\times$ 첫째 행이므로 소거하면 0이 됩니다. 셋째 행에서 첫째 행을 빼면 $(0, -2, -2)$로 피벗이 생깁니다. 사다리꼴 $\\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & -2 & -2 \\\\ 0 & 0 & 0 \\end{bmatrix}$의 피벗이 2개이므로 계수는 2입니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 3,
        q: '$A=\\begin{bmatrix} 1 & 2 & 1 \\\\ 2 & 4 & 3 \\\\ 3 & 6 & 4 \\end{bmatrix}$의 행 사다리꼴은 $U=\\begin{bmatrix} 1 & 2 & 1 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}$입니다. $\\operatorname{Col} A$의 기저로 알맞은 것은 무엇입니까?',
        choices: ['$\\{(1, 2, 3), (1, 3, 4)\\}$', '$\\{(1, 0, 0), (1, 1, 0)\\}$', '$\\{(1, 2, 3), (2, 4, 6)\\}$', '$\\{(1, 2, 1), (0, 0, 1)\\}$'],
        answer: 0,
        why: [
          '',
          '사다리꼴 $U$의 피벗 열을 썼습니다. 행 연산은 열공간을 바꾸므로 원래 $A$의 1열과 3열을 써야 합니다. 예를 들어 $(1, 2, 3)$은 이 두 벡터로 만들 수 없습니다.',
          '$(2, 4, 6)=2(1, 2, 3)$이므로 일차종속이라 기저가 될 수 없습니다. 2열은 피벗 열이 아닙니다.',
          '$U$의 0이 아닌 행으로, 행공간의 기저입니다. 열공간의 기저가 아닙니다.',
        ],
        explain: '$U$에서 피벗은 1열과 3열에 있습니다. 그래서 원래 $A$의 1열 $(1, 2, 3)$과 3열 $(1, 3, 4)$가 $\\operatorname{Col} A$의 기저이고, $\\operatorname{rank} A=2$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 4,
        q: '$4\\times 4$ 행렬 $A$에 대하여 $A\\mathbf{x}=\\mathbf{0}$의 해 전체가 원점을 지나는 직선 하나입니다. $\\operatorname{rank} A$를 구하세요.',
        answer: '3',
        hint: '원점을 지나는 직선의 차원은 1입니다.',
        wrong: [{ a: '1', why: '퇴화차수(해공간의 차원)를 답했습니다. 계수는 $4-1$입니다.' }],
        explain: '해공간이 직선이므로 $\\operatorname{nullity} A=1$입니다. 차원 정리에서 $\\operatorname{rank} A=4-1=3$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 2,
        q: '기저 $B=\\{(2, 1), (3, 2)\\}$에 대한 좌표벡터가 $[\\mathbf{x}]_B=(1, 3)$일 때, $\\mathbf{x}$는 무엇입니까?',
        choices: ['$(11, 7)$', '$(-7, 5)$', '$(5, 9)$', '$(1, 3)$'],
        answer: 0,
        why: [
          '',
          '$P_B^{-1}$을 곱했습니다. 그것은 $\\mathbf{x}$에서 $[\\mathbf{x}]_B$를 구할 때 쓰는 식입니다. 이번에는 $\\mathbf{x}=P_B[\\mathbf{x}]_B$입니다.',
          '기저 벡터를 행으로 놓고 곱했습니다. 기저 벡터는 $P_B$의 열입니다.',
          '좌표벡터를 그대로 썼습니다. 기저가 표준기저가 아니면 좌표와 벡터 자체가 다릅니다.',
        ],
        explain: '$\\mathbf{x}=1\\cdot(2, 1)+3\\cdot(3, 2)=(2+9, 1+6)=(11, 7)$입니다. 행렬로는 $P_B[\\mathbf{x}]_B=\\begin{bmatrix} 2 & 3 \\\\ 1 & 2 \\end{bmatrix}\\begin{bmatrix} 1 \\\\ 3 \\end{bmatrix}$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 0,
        q: '세 벡터 $(1, 2, k)$, $(0, 1, 1)$, $(1, 3, 4)$가 $\\mathbf{R}^3$의 기저가 **되지 않게** 하는 $k$의 값을 구하세요.',
        answer: '3',
        hint: '세 벡터를 행(또는 열)으로 놓은 행렬식이 0이 되는 $k$를 찾으세요.',
        wrong: [{ a: '-3', why: '행렬식 $3-k$의 부호를 다시 확인해 보세요. $k=-3$이면 행렬식은 6입니다.' }],
        explain: '$\\begin{vmatrix} 1 & 2 & k \\\\ 0 & 1 & 1 \\\\ 1 & 3 & 4 \\end{vmatrix}=1(4-3)-2(0-1)+k(0-1)=3-k$입니다. 이 값이 0인 $k=3$일 때 세 벡터는 일차종속이 되어 기저가 아닙니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 4,
        q: '$7\\times 9$ 행렬 $A$에 대하여 $\\operatorname{nullity} A=4$입니다. $\\operatorname{Nul} A^{T}$의 차원을 구하세요.',
        answer: '2',
        hint: '먼저 $\\operatorname{rank} A$를 구하고, $A^{T}$의 크기를 생각해 보세요.',
        wrong: [
          { a: '4', why: '$A$와 $A^{T}$의 퇴화차수가 같다고 생각했습니다. 같은 것은 계수입니다.' },
          { a: '5', why: '$\\operatorname{rank} A$를 구한 데서 멈췄습니다. $A^{T}$의 열은 7개입니다.' },
        ],
        explain: '$\\operatorname{rank} A=9-4=5$입니다. $A^{T}$의 크기는 $9\\times 7$이고 계수도 5이므로 $\\operatorname{nullity} A^{T}=7-5=2$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 1,
        q: '$W=\\operatorname{span}\\{(1, 2, 1), (2, 1, -1), (3, 3, 0), (0, 3, 3)\\}$의 차원을 구하세요.',
        answer: '2',
        hint: '셋째·넷째 벡터를 앞의 두 벡터로 나타낼 수 있는지 보세요.',
        wrong: [
          { a: '4', why: '벡터의 개수를 세었습니다. 생성하는 벡터 중 일차종속인 것을 빼고 세어야 합니다.' },
          { a: '3', why: '$\\mathbf{R}^3$에 있는 벡터라고 차원이 3인 것은 아닙니다. 독립인 벡터가 몇 개인지 확인해 보세요.' },
        ],
        explain: '$(3, 3, 0)=(1, 2, 1)+(2, 1, -1)$, $(0, 3, 3)=2(1, 2, 1)-(2, 1, -1)$입니다. 앞의 두 벡터는 서로 배수가 아니므로 일차독립이고, 이 둘이 $W$의 기저입니다. 차원은 2입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 4,
        q: '$A$가 $3\\times 5$ 행렬일 때, **항상** 옳은 것은 무엇입니까?',
        choices: [
          '$\\operatorname{Nul} A$에 영벡터가 아닌 벡터가 있다.',
          '$\\operatorname{Col} A=\\mathbf{R}^3$이다.',
          '$A$의 다섯 열은 일차독립이다.',
          '$\\operatorname{rank} A=5$일 수 있다.',
        ],
        answer: 0,
        why: [
          '',
          '계수가 3일 때만 성립합니다. 예를 들어 영행렬이면 열공간은 $\\{\\mathbf{0}\\}$입니다.',
          '$\\mathbf{R}^3$의 벡터 5개는 차원 3보다 많으므로 반드시 일차종속입니다.',
          '계수는 행의 개수 3을 넘을 수 없습니다(피벗은 한 행에 하나).',
        ],
        explain: '$\\operatorname{rank} A\\le 3$이므로 $\\operatorname{nullity} A=5-\\operatorname{rank} A\\ge 2$입니다. 그래서 $A\\mathbf{x}=\\mathbf{0}$은 항상 자명하지 않은 해를 가집니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 2,
        q: '기저 $B=\\{(1, 0), (1, 1)\\}$에 대하여 $[\\mathbf{x}]_B=(2, 1)$입니다. 다른 기저 $C=\\{(1, 1), (0, 1)\\}$에 대한 좌표벡터 $[\\mathbf{x}]_C$의 **둘째 성분**을 구하세요.',
        answer: '-2',
        hint: '먼저 $\\mathbf{x}$를 표준좌표로 구한 뒤, $C$로 나타내 보세요.',
        wrong: [
          { a: '1', why: '$[\\mathbf{x}]_B$의 둘째 성분을 그대로 썼습니다. 기저가 바뀌면 좌표도 바뀝니다.' },
          { a: '3', why: '$\\mathbf{x}$의 표준좌표 $(3, 1)$에서 멈추고 첫째 성분을 썼습니다. 이제 $C$로 나타내야 합니다.' },
        ],
        explain: '$\\mathbf{x}=2(1, 0)+1\\cdot(1, 1)=(3, 1)$입니다. $d_1(1, 1)+d_2(0, 1)=(d_1, d_1+d_2)=(3, 1)$에서 $d_1=3$, $d_2=-2$입니다. 기저 변환 행렬 $P_C^{-1}P_B=\\begin{bmatrix} 1 & 1 \\\\ -1 & 0 \\end{bmatrix}$에 $(2, 1)$을 곱해도 $(3, -2)$가 나옵니다.',
      },
    ],

    deeper: [
      {
        title: '네 개의 기본 부분공간',
        body: '$m\\times n$ 행렬 $A$의 계수가 $r$이면 네 공간의 차원이 모두 정해집니다.\n\n| 공간 | 들어 있는 곳 | 차원 |\n|---|---|---|\n| $\\operatorname{Row} A$ | $\\mathbf{R}^n$ | $r$ |\n| $\\operatorname{Nul} A$ | $\\mathbf{R}^n$ | $n-r$ |\n| $\\operatorname{Col} A$ | $\\mathbf{R}^m$ | $r$ |\n| $\\operatorname{Nul} A^{T}$ | $\\mathbf{R}^m$ | $m-r$ |\n\n$\\mathbf{R}^n$은 행공간과 영공간으로, $\\mathbf{R}^m$은 열공간과 $\\operatorname{Nul} A^{T}$, 두 부분공간으로 나뉘고 차원이 꼭 맞아떨어집니다. 내적과 직교성 단원에서는 이 짝들이 서로 **수직**이라는 것까지 배웁니다. 이 그림은 연립방정식의 해가 언제 있는지(열공간), 몇 개인지(영공간)를 한눈에 보여 주어 공학·데이터 분석에서 자주 쓰입니다.',
      },
      {
        title: '기저를 바꾸면 무엇이 좋은가',
        body: '같은 벡터라도 기저를 잘 고르면 계산이 쉬워집니다. 예를 들어 디지털 이미지를 저장할 때 화소 값(표준기저) 대신 "얼마나 부드럽게 변하는가"를 나타내는 파동 모양의 기저로 바꾸면, 대부분의 계수가 0에 가까워져 작은 계수를 버려도 사람 눈에는 거의 차이가 없습니다. 이미지 압축이 이런 기저 변환을 이용합니다.\n\n다음 단원들에서는 선형변환을 가장 간단하게 보이게 하는 기저(고유벡터 기저, 직교 기저)를 찾는 법을 배웁니다.',
      },
    ],

    faq: [
      {
        q: '기저는 하나로 정해져 있나요?',
        a: '아닙니다. $\\mathbf{R}^2$만 해도 평행하지 않은 두 벡터면 무엇이든 기저입니다. 하지만 기저의 **개수**(차원)는 항상 같습니다. 그래서 "차원"이라는 말이 의미를 가집니다.',
      },
      {
        q: '열공간의 기저는 왜 원래 행렬의 열로 골라야 하나요?',
        a: '행 연산은 열벡터 자체를 바꾸므로 사다리꼴의 열은 원래 열공간에 없을 수도 있습니다. 하지만 열들 사이의 관계(예: 3열 = 1열 + 2열)는 행 연산 전후에 똑같습니다. 그래서 "어느 열이 독립인가"는 사다리꼴에서 읽고, 벡터는 원래 행렬에서 가져옵니다.',
      },
      {
        q: '계수랑 퇴화차수는 어떻게 바로 구하나요?',
        a: '행 사다리꼴을 만들고 피벗을 세면 계수입니다. 퇴화차수는 열의 개수에서 계수를 빼면 됩니다(차원 정리). 영공간의 기저를 일일이 구하지 않아도 차원은 알 수 있습니다.',
      },
    ],

    mistakes: [
      '열공간의 기저로 행 사다리꼴의 열을 쓰는 실수 — 피벗 위치만 사다리꼴에서 읽고, 벡터는 원래 행렬 $A$의 열을 씁니다.',
      '차원 정리에서 행의 개수를 쓰는 실수 — $\\operatorname{rank} A+\\operatorname{nullity} A$는 **열**의 개수입니다.',
      '$P_2$(차수 2 이하 다항식)의 차원을 2라고 하는 실수 — 기저 $1, t, t^2$으로 3차원입니다.',
    ],

    gens: [
      {
        id: 'coord-vector',
        level: 1,
        title: '기저에 대한 좌표벡터 구하기',
        make: function (R) {
          var a, b, c, d, det, zeros;
          do {
            a = R.int(-3, 3); b = R.int(-3, 3); c = R.int(-3, 3); d = R.int(-3, 3);
            det = a * d - b * c;
            zeros = [a, b, c, d].filter(function (x) { return x === 0; }).length;
          } while (Math.abs(det) !== 1 || zeros > 1);
          var b1 = [a, c], b2 = [b, d];
          var c1 = R.nonzero(-3, 3), c2 = R.nonzero(-3, 3);
          var x = [a * c1 + b * c2, c * c1 + d * c2];
          // 기저 벡터를 행으로 놓고 푼 값: [[a, c], [b, d]] y = x
          var yT = [(d * x[0] - c * x[1]) / det, (-b * x[0] + a * x[1]) / det];
          var correct = '$' + tup([c1, c2]) + '$';
          var cands = [
            ['$' + tup([c2, c1]) + '$', '두 좌표의 순서를 바꿨습니다. 첫째 좌표는 $\\mathbf{b}_1$의 계수입니다.'],
            ['$' + tup(x) + '$', '$\\mathbf{x}$의 표준좌표를 그대로 썼습니다. 기저 $B$로 나타낸 계수를 구해야 합니다.'],
            ['$' + tup(yT) + '$', '기저 벡터를 행으로 놓고 풀었습니다. 기저 벡터는 행렬 $P_B$의 열입니다.'],
            ['$' + tup([-c1, c2]) + '$', '첫째 좌표의 부호가 틀렸습니다. $c_1\\mathbf{b}_1+c_2\\mathbf{b}_2$가 $\\mathbf{x}$가 되는지 검산해 보세요.'],
            ['$' + tup([c1, -c2]) + '$', '둘째 좌표의 부호가 틀렸습니다. $c_1\\mathbf{b}_1+c_2\\mathbf{b}_2$가 $\\mathbf{x}$가 되는지 검산해 보세요.'],
            ['$' + tup([-c1, -c2]) + '$', '두 좌표의 부호가 모두 반대입니다. 이항할 때 부호를 다시 확인하고 검산해 보세요.'],
          ];
          var reason = {};
          cands.forEach(function (k) { if (!(k[0] in reason)) reason[k[0]] = k[1]; });
          var pick = R.choices(correct, cands.map(function (k) { return k[0]; }));
          return {
            type: 'choice', concept: 2,
            q: '기저 $B=\\{\\mathbf{b}_1, \\mathbf{b}_2\\}$, $\\mathbf{b}_1=' + tup(b1) + '$, $\\mathbf{b}_2=' + tup(b2) + '$에 대하여 $\\mathbf{x}=' + tup(x) + '$의 좌표벡터 $[\\mathbf{x}]_B$를 고르세요.',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (ch) { return ch === correct ? '' : reason[ch] || ''; }),
            explain: '$c_1\\mathbf{b}_1+c_2\\mathbf{b}_2=\\mathbf{x}$를 행렬로 쓰면 $' + mat([[a, b], [c, d]]) + '\\begin{bmatrix} c_1 \\\\ c_2 \\end{bmatrix}=' + mat([[x[0]], [x[1]]]) + '$입니다. ' +
              '$\\det P_B=' + det + '$이므로 $P_B^{-1}=' + mat([[d / det, -b / det], [-c / det, a / det]]) + '$이고, $[\\mathbf{x}]_B=P_B^{-1}\\mathbf{x}=' + tup([c1, c2]) + '$입니다.\n\n' +
              '검산: $' + c1 + tup(b1) + (c2 < 0 ? '' : '+') + c2 + tup(b2) + '=' + tup(x) + '$',
          };
        },
      },
      {
        id: 'rank-nullity',
        level: 1,
        title: '차원 정리로 계수·퇴화차수 구하기',
        make: function (R) {
          var m, n;
          do { m = R.int(2, 9); n = R.int(2, 9); } while (m === n);
          var r = R.int(1, Math.min(m, n));
          var kind = R.int(0, 3);
          var q, ans, wrongs = [], ex;
          var size = '$' + m + '\\times ' + n + '$ 행렬 $A$';
          if (kind === 0) {
            q = size + '의 계수가 ' + r + '입니다. $\\operatorname{nullity} A$를 구하세요.';
            ans = n - r;
            wrongs.push({ a: String(m - r), why: '행의 개수 ' + m + '에서 뺐습니다. 차원 정리에서 빼는 수는 열의 개수 ' + n + '입니다.' });
            ex = '차원 정리 $\\operatorname{rank} A+\\operatorname{nullity} A=' + n + '$(열의 개수)에서 $\\operatorname{nullity} A=' + n + '-' + r + '=' + ans + '$입니다.';
          } else if (kind === 1) {
            var k = n - r;
            q = size + '에 대하여 $A\\mathbf{x}=\\mathbf{0}$의 해공간의 차원이 ' + k + '입니다. $\\operatorname{rank} A$를 구하세요.';
            ans = r;
            wrongs.push({ a: String(m - k), why: '행의 개수 ' + m + '에서 뺐습니다. 해 $\\mathbf{x}$는 $\\mathbf{R}^{' + n + '}$에 있으므로 열의 개수 ' + n + '에서 뺍니다.' });
            ex = '해공간의 차원은 퇴화차수이므로 $\\operatorname{rank} A=' + n + '-' + k + '=' + ans + '$입니다.';
          } else if (kind === 2) {
            q = size + '의 계수가 ' + r + '입니다. $\\operatorname{Nul} A^{T}$의 차원을 구하세요.';
            ans = m - r;
            wrongs.push({ a: String(n - r), why: '$A$의 퇴화차수를 구했습니다. $A^{T}$의 크기는 $' + n + '\\times ' + m + '$이라 열이 ' + m + '개입니다.' });
            ex = '$A^{T}$의 크기는 $' + n + '\\times ' + m + '$이고 $\\operatorname{rank} A^{T}=\\operatorname{rank} A=' + r + '$입니다. 차원 정리에서 $\\operatorname{nullity} A^{T}=' + m + '-' + r + '=' + ans + '$입니다.';
          } else {
            var k2 = n - r;
            q = size + '에 대하여 $\\operatorname{nullity} A=' + k2 + '$입니다. 행공간의 차원 $\\operatorname{dim}\\operatorname{Row} A$를 구하세요.';
            ans = r;
            wrongs.push({ a: String(m - k2), why: '행의 개수에서 뺐습니다. 먼저 차원 정리로 계수를 구하세요: $\\operatorname{rank} A=' + n + '-' + k2 + '$' });
            wrongs.push({ a: String(k2), why: '퇴화차수를 그대로 썼습니다. 행공간의 차원은 계수와 같습니다.' });
            ex = '$\\operatorname{rank} A=' + n + '-' + k2 + '=' + r + '$이고, 행공간의 차원은 계수와 같으므로 ' + ans + '입니다.';
          }
          return {
            type: 'short', check: 'number', concept: 4,
            q: q,
            answer: String(ans),
            wrong: wrongs.filter(function (w) { return Number(w.a) !== ans && Number(w.a) >= 0; }),
            explain: ex,
          };
        },
      },
      {
        id: 'rank-3x4',
        level: 2,
        title: '행 소거로 계수·퇴화차수 구하기',
        make: function (R) {
          var r = R.pick([1, 2, 2, 3, 3]);
          var M = buildMatrix(R, r);
          var ech = echelon(R, M.A);
          var askNull = R.bool();
          var ans = askNull ? 4 - ech.rank : ech.rank;
          var wrongs = askNull
            ? [
              { a: String(ech.rank), why: '계수를 답했습니다. 퇴화차수는 열의 개수 4에서 계수를 뺀 값입니다.' },
              { a: String(3 - ech.rank), why: '행의 개수 3에서 뺐습니다. 해 $\\mathbf{x}$는 $\\mathbf{R}^4$에 있으므로 열의 개수 4에서 뺍니다.' },
            ]
            : [
              { a: '3', why: '행의 개수를 세었습니다. 소거하면 0이 되는 행이 있는지 확인해 보세요.' },
              { a: String(4 - ech.rank), why: '자유변수의 개수(퇴화차수)를 세었습니다. 계수는 피벗의 개수입니다.' },
            ];
          var pivNames = ech.pivots.map(function (p) { return (p + 1) + '열'; }).join(', ');
          return {
            type: 'short', check: 'number', concept: 4,
            q: '다음 행렬 $A$의 ' + (askNull ? '퇴화차수 $\\operatorname{nullity} A$' : '계수 $\\operatorname{rank} A$') + '를 구하세요.\n\n$A=' + mat(M.A) + '$',
            answer: String(ans),
            hint: '행 사다리꼴로 만들어 피벗을 세어 보세요.',
            wrong: wrongs.filter(function (w) { return Number(w.a) !== ans && Number(w.a) >= 0; }),
            explain: '행 소거를 하면 $' + mat(ech.rows) + '$입니다. 피벗은 ' + pivNames + '에 있어 $\\operatorname{rank} A=' + ech.rank + '$입니다.' +
              (askNull ? ' 차원 정리에서 $\\operatorname{nullity} A=4-' + ech.rank + '=' + ans + '$입니다.' : ''),
          };
        },
      },
      {
        id: 'col-basis',
        level: 3,
        title: '열공간의 기저 고르기',
        make: function (R) {
          var M, ech;
          do { M = buildMatrix(R, 2); ech = echelon(R, M.A); } while (ech.rank !== 2);
          var A = M.A, U = ech.rows, pv = ech.pivots;
          var col = function (Mx, j) { return Mx.map(function (row) { return row[j]; }); };
          var colNum = function (Mx, j) { return col(Mx, j).map(function (x) { return Number(x); }); };
          var good = [col(A, pv[0]), col(A, pv[1])];
          var correct = setTex(good);
          var cands = [];
          var uCols = [colNum(U, pv[0]), colNum(U, pv[1])];
          if (!isColBasis(R, A, uCols)) cands.push([setTex(uCols), '행 사다리꼴의 피벗 열을 썼습니다. 행 연산은 열공간을 바꾸므로 원래 $A$의 피벗 열을 써야 합니다.']);
          var first2 = [col(A, 0), col(A, 1)];
          if (!isColBasis(R, A, first2)) cands.push([setTex(first2), '앞의 두 열이 일차종속입니다. 피벗이 있는 열을 골라야 합니다.']);
          var free = [0, 1, 2, 3].filter(function (j) { return pv.indexOf(j) < 0; });
          cands.push([setTex([col(A, pv[0]), col(A, pv[1]), col(A, free[0])]), '벡터가 3개로 계수 2보다 많아 일차종속입니다.']);
          cands.push([setTex([col(A, pv[0])]), '벡터가 하나뿐이라 열공간 전체를 생성하지 못합니다. 계수가 2이므로 기저 벡터는 2개입니다.']);
          cands.push([setTex([U[0].map(Number), U[1].map(Number)]), '사다리꼴의 0이 아닌 행으로, 행공간의 기저입니다. 열공간은 $\\mathbf{R}^3$에 있습니다.']);
          var reason = {};
          cands.forEach(function (k) { if (!(k[0] in reason)) reason[k[0]] = k[1]; });
          var pick = R.choices(correct, cands.map(function (k) { return k[0]; }));
          return {
            type: 'choice', concept: 3,
            q: '$A=' + mat(A) + '$의 행 사다리꼴은 $U=' + mat(U) + '$입니다. $\\operatorname{Col} A$의 기저로 알맞은 것을 고르세요.',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (ch) { return ch === correct ? '' : reason[ch] || ''; }),
            explain: '$U$에서 피벗은 ' + (pv[0] + 1) + '열과 ' + (pv[1] + 1) + '열에 있습니다. 그래서 원래 $A$의 ' + (pv[0] + 1) + '열이 $\\operatorname{Col} A$의 기저입니다: ' + correct + '. 기저 벡터가 2개이므로 $\\operatorname{rank} A=2$입니다.',
          };
        },
      },
    ],
  });
})();
