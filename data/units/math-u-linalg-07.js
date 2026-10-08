/* 선형대수학 · 고윳값과 고유벡터
 * Av=λv 의 뜻, 특성방정식과 고유공간, 닮음과 대각화, 대각화로 거듭제곱, 마르코프 연쇄(전이행렬은 열의 합이 1).
 * (앞 단원: 행렬식·기저와 차원·선형변환 / 다음 단원: 내적과 직교성 — 대칭행렬의 직교대각화는 9단원) */
(function () {
  function tup(v) { return '(' + v.join(', ') + ')'; }
  function texOf(x) { return typeof x === 'number' ? String(x) : typeof x === 'string' ? x : x.toTex(); }
  function mat(rows) {
    return '\\begin{bmatrix} ' + rows.map(function (r) { return r.map(texOf).join(' & '); }).join(' \\\\ ') + ' \\end{bmatrix}';
  }
  function mul(A, B) {
    return A.map(function (row) {
      return B[0].map(function (_, j) { return row.reduce(function (t, x, k) { return t + x * B[k][j]; }, 0); });
    });
  }
  // 행렬식이 ±1 인 정수 2×2 행렬 P (고유벡터를 열로) — 역행렬도 정수
  function unimodular(R, lo, hi) {
    var a, b, c, d, det;
    do {
      a = R.int(lo, hi); b = R.int(lo, hi); c = R.int(lo, hi); d = R.int(lo, hi);
      det = a * d - b * c;
    } while (Math.abs(det) !== 1 || [a, b, c, d].filter(function (x) { return x === 0; }).length > 1);
    return { P: [[a, b], [c, d]], Pinv: [[d * det, -b * det], [-c * det, a * det]], det: det };
  }
  // λ²-tλ+d 를 TeX 로
  function charPoly(t, d) {
    var s = '\\lambda^2';
    if (t !== 0) s += (t > 0 ? '-' : '+') + (Math.abs(t) === 1 ? '' : Math.abs(t)) + '\\lambda';
    if (d !== 0) s += (d > 0 ? '+' : '-') + Math.abs(d);
    return s;
  }
  function factor(l) { return l === 0 ? '\\lambda' : '(\\lambda' + (l > 0 ? '-' + l : '+' + (-l)) + ')'; }
  function fz(x) { return x === 0 ? 0 : x; } // -0 없애기

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
      s += '<line x1="' + ax + '" y1="' + ay + '" x2="' + bx + '" y2="' + by + '" stroke="' + c + '" stroke-width="' + (v.w || 2.4) + '"/>';
      s += '<polygon points="' + bx + ',' + by + ' ' + p1x + ',' + p1y + ' ' + p2x + ',' + p2y + '" fill="' + c + '"/>';
      if (v.label) s += '<text x="' + X(v.lx) + '" y="' + Y(v.ly) + '" font-size="14" fill="' + c + '" text-anchor="middle" font-weight="bold">' + v.label + '</text>';
    });
    return s + '</svg>';
  }

  Tutor.registerUnit({
    id: 'math-u-linalg-07',
    course: 'math-u-linalg',
    title: '고윳값과 고유벡터',
    summary: '$A\\mathbf{v}=\\lambda\\mathbf{v}$를 만족하는 고윳값과 고유벡터를 특성방정식으로 구하고, 대각화로 행렬의 거듭제곱과 마르코프 연쇄의 장기 상태를 계산합니다.',
    goals: [
      '고윳값과 고유벡터의 뜻을 알고, 주어진 벡터가 고유벡터인지 판정할 수 있다.',
      '특성방정식을 풀어 고윳값을 구하고, 고유공간의 기저를 구할 수 있다.',
      '대각화 가능 조건을 알고, 대각화($A=PDP^{-1}$)를 이용해 행렬의 거듭제곱을 계산할 수 있다.',
      '전이행렬로 마르코프 연쇄를 나타내고 정상상태 벡터를 구할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '고윳값과 고유벡터의 뜻',
        body: '정사각행렬 $A$에 대하여 영벡터가 아닌 벡터 $\\mathbf{v}$와 스칼라 $\\lambda$가\n\n$A\\mathbf{v}=\\lambda\\mathbf{v}$\n\n를 만족하면 $\\lambda$를 $A$의 **고윳값**, $\\mathbf{v}$를 $\\lambda$에 대한 **고유벡터**라고 합니다.\n\n기하적으로는 "$A$를 곱해도 **방향이 바뀌지 않고** 길이만 $\\lambda$배가 되는 벡터"입니다($\\lambda<0$이면 반대 방향으로 뒤집힙니다).\n\n예: $A=\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$, $\\mathbf{v}=(1, 1)$이면 $A\\mathbf{v}=(3, 3)=3\\mathbf{v}$이므로 $\\mathbf{v}$는 고윳값 3에 대한 고유벡터입니다. 반면 $\\mathbf{w}=(1, 0)$은 $A\\mathbf{w}=(2, 1)$로 방향이 바뀌므로 고유벡터가 아닙니다(그림).\n\n- $\\mathbf{v}$가 고유벡터이면 $2\\mathbf{v}$, $-\\mathbf{v}$처럼 0이 아닌 스칼라배도 모두 같은 고윳값의 고유벡터입니다.\n- 영벡터는 고유벡터로 치지 않습니다($A\\mathbf{0}=\\lambda\\mathbf{0}$은 모든 $\\lambda$에 대해 성립해서 의미가 없습니다). 하지만 고윳값 $\\lambda=0$은 있을 수 있습니다.',
        easy: '고무판에 화살표를 여러 개 그려 놓고 고무판을 잡아당긴다고 생각해 보세요. 대부분의 화살표는 늘어나면서 방향도 틀어집니다. 그런데 잡아당기는 방향과 나란한 화살표는 길이만 늘어나고 방향은 그대로입니다.\n\n그런 "방향이 그대로인 화살표"가 고유벡터이고, 몇 배로 늘어났는지가 고윳값입니다.',
        fig: {
          type: 'svg',
          alt: 'v=(1,1)과 Av=(3,3)은 같은 직선 위에 있고, w=(1,0)과 Aw=(2,1)은 방향이 다르다.',
          svg: plane({
            xmin: -1, xmax: 4, ymin: -1, ymax: 4, u: 40,
            segs: [{ from: [-1, -1], to: [4, 4] }],
            vecs: [
              { to: [3, 3], label: 'Av', lx: 2.6, ly: 3.3, color: 'var(--fig-2)', w: 2 },
              { to: [1, 1], label: 'v', lx: 0.55, ly: 1.15, color: 'var(--fig-1)', w: 3.2 },
              { to: [2, 1], label: 'Aw', lx: 2.45, ly: 1.15, color: 'var(--fig-4)' },
              { to: [1, 0], label: 'w', lx: 1, ly: -0.5, color: 'var(--fig-3)' },
            ],
          }),
        },
        check: {
          type: 'short', check: 'number',
          q: '$A=\\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$, $\\mathbf{v}=(1, -2)$일 때 $A\\mathbf{v}=\\lambda\\mathbf{v}$가 되는 $\\lambda$를 구하세요.',
          answer: '2',
          wrong: [{ a: '-4', why: '$A\\mathbf{v}=(2, -4)$의 둘째 성분을 그대로 썼습니다. $(2, -4)$가 $(1, -2)$의 몇 배인지 구해야 합니다.' }],
          explain: '$A\\mathbf{v}=(4-2, 2-6)=(2, -4)=2(1, -2)$이므로 $\\lambda=2$입니다.',
        },
      },
      {
        title: '특성방정식과 고유공간',
        body: '$A\\mathbf{v}=\\lambda\\mathbf{v}$는 $(A-\\lambda I)\\mathbf{v}=\\mathbf{0}$과 같습니다. 이 식이 **영벡터가 아닌 해**를 가지려면 $A-\\lambda I$가 가역이 아니어야 하므로\n\n$\\det(A-\\lambda I)=0$ (**특성방정식**)\n\n이 고윳값을 정합니다. $n\\times n$ 행렬이면 $\\lambda$에 대한 $n$차 방정식입니다.\n\n$2\\times 2$ 행렬은 대각합 $\\operatorname{tr} A=a_{11}+a_{22}$와 행렬식으로 바로 쓸 수 있습니다.\n\n$\\lambda^2-(\\operatorname{tr} A)\\lambda+\\det A=0$\n\n예: $A=\\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$이면 $\\lambda^2-7\\lambda+10=(\\lambda-2)(\\lambda-5)=0$이므로 고윳값은 2, 5입니다.\n\n고윳값 $\\lambda$를 하나 구하면, $\\operatorname{Nul}(A-\\lambda I)$가 그 고윳값의 고유벡터 전체(와 영벡터)를 모은 부분공간, 곧 **고유공간**입니다.\n\n- $\\lambda=5$: $A-5I=\\begin{bmatrix} -1 & 1 \\\\ 2 & -2 \\end{bmatrix}$ → $x=y$ → 기저 $(1, 1)$\n- $\\lambda=2$: $A-2I=\\begin{bmatrix} 2 & 1 \\\\ 2 & 1 \\end{bmatrix}$ → $y=-2x$ → 기저 $(1, -2)$\n\n> 💡 삼각행렬의 고윳값은 대각성분입니다. $\\det(A-\\lambda I)$가 대각성분의 곱 $(a_{11}-\\lambda)\\cdots(a_{nn}-\\lambda)$이기 때문입니다.\n\n특성방정식에서 $\\lambda$가 몇 겹근인지를 **대수적 중복도**, 고유공간의 차원을 **기하적 중복도**라고 합니다. 항상 1 ≤ 기하적 중복도 ≤ 대수적 중복도입니다.',
        easy: '"방향이 그대로인 벡터"를 찾는 문제를 두 단계로 나눕니다.\n\n1. 먼저 "몇 배인지"($\\lambda$)를 찾습니다: $\\det(A-\\lambda I)=0$. $2\\times 2$이면 "$\\lambda^2-$(대각선의 합)$\\lambda+$(행렬식)$=0$"이라는 이차방정식입니다.\n2. 그다음 그 $\\lambda$마다 $(A-\\lambda I)\\mathbf{v}=\\mathbf{0}$을 풀어 방향($\\mathbf{v}$)을 찾습니다. 이것은 1단원에서 배운 동차 연립방정식입니다.',
        check: {
          type: 'short', check: 'set',
          q: '$A=\\begin{bmatrix} 2 & 3 \\\\ 0 & -1 \\end{bmatrix}$의 고윳값을 모두 구하세요. (쉼표로 구분)',
          answer: ['2', '-1'],
          wrong: [{ a: ['2', '1'], why: '대각성분 $-1$의 부호를 바꿨습니다. 삼각행렬의 고윳값은 대각성분 그대로입니다.' }],
          explain: '삼각행렬이므로 $\\det(A-\\lambda I)=(2-\\lambda)(-1-\\lambda)$이고, 고윳값은 대각성분 2와 $-1$입니다.',
        },
      },
      {
        title: '닮은 행렬과 대각화',
        body: '가역행렬 $P$가 있어 $B=P^{-1}AP$이면 $A$와 $B$는 **닮았다**고 합니다. 닮은 행렬은 같은 변환을 다른 기저로 본 것이므로 특성다항식이 같고, 따라서 고윳값·행렬식·대각합이 같습니다.\n\n$A$가 대각행렬 $D$와 닮으면, 곧 $A=PDP^{-1}$ 꼴로 쓸 수 있으면 $A$는 **대각화 가능**하다고 합니다. 이때\n\n- $P$의 열은 $A$의 고유벡터들이고,\n- $D$의 대각성분은 그에 대응하는 고윳값입니다(같은 순서).\n\n$AP=PD$를 열마다 쓰면 $A\\mathbf{p}_i=\\lambda_i\\mathbf{p}_i$이기 때문입니다.\n\n**대각화 가능 조건**: $n\\times n$ 행렬 $A$가 대각화 가능 $\\iff$ 일차독립인 고유벡터가 $n$개 있다 $\\iff$ 모든 고윳값에서 기하적 중복도 = 대수적 중복도.\n\n- 서로 다른 고윳값이 $n$개이면 항상 대각화 가능합니다(서로 다른 고윳값의 고유벡터는 일차독립).\n- $\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$은 고윳값 1이 이중근인데 고유공간이 $\\operatorname{span}\\{(1, 0)\\}$, 1차원뿐이라 대각화할 수 **없습니다**.\n\n> ⚠️ 고윳값이 중근이라고 해서 대각화가 불가능한 것은 아닙니다. $2I$는 이중근이지만 이미 대각행렬입니다.',
        easy: '대각화는 "좋은 좌표축 고르기"입니다. 고유벡터 방향을 새 좌표축으로 잡으면, $A$는 각 축을 따라 $\\lambda$배씩 늘이기만 하는 단순한 변환(대각행렬 $D$)으로 보입니다.\n\n$P$는 "고유벡터 좌표 → 표준 좌표" 번역기, $P^{-1}$은 그 반대입니다. 그래서 $A=PDP^{-1}$ 꼴은 "번역하고, 축마다 늘이고, 다시 번역"하는 과정입니다. 다만 고유벡터가 모자라 좌표축을 다 채우지 못하는 행렬도 있습니다.',
        check: {
          type: 'ox',
          q: '서로 다른 고윳값을 $n$개 가지는 $n\\times n$ 행렬은 항상 대각화 가능합니다.',
          answer: true,
          explain: '서로 다른 고윳값에 대한 고유벡터들은 일차독립입니다. 그래서 일차독립인 고유벡터가 $n$개 생기고, 이것을 열로 놓은 $P$로 대각화할 수 있습니다.',
        },
      },
      {
        title: '대각화로 거듭제곱 구하기',
        body: '$A=PDP^{-1}$이면\n\n$A^2=PDP^{-1}PDP^{-1}=PD^2P^{-1}$\n\n처럼 가운데의 $P^{-1}P=I$가 사라지므로 일반적으로\n\n$A^k=PD^kP^{-1}$\n\n입니다. 대각행렬의 거듭제곱은 대각성분만 거듭제곱하면 되므로 계산이 아주 쉬워집니다.\n\n예: $A=\\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}=PDP^{-1}$, $P=\\begin{bmatrix} 1 & 1 \\\\ 1 & -2 \\end{bmatrix}$, $D=\\begin{bmatrix} 5 & 0 \\\\ 0 & 2 \\end{bmatrix}$이면\n\n$A^k=\\dfrac{1}{3}\\begin{bmatrix} 2\\cdot 5^k+2^k & 5^k-2^k \\\\ 2\\cdot 5^k-2\\cdot 2^k & 5^k+2\\cdot 2^k \\end{bmatrix}$\n\n$k=1$을 넣으면 $A$가 그대로 나오는 것으로 확인할 수 있습니다.\n\n> 💡 $k$가 커지면 절댓값이 가장 큰 고윳값($5^k$)의 항이 나머지를 압도합니다. 그래서 $A^k\\mathbf{x}$는 그 고윳값의 고유벡터 방향으로 점점 정렬됩니다. 인구·경제 모형의 장기 예측이 이 원리를 씁니다.',
        easy: '$A$를 100번 곱하는 것은 힘들지만, "번역 → 축마다 100번 늘이기 → 다시 번역"은 쉽습니다. 축마다 늘이는 것은 그냥 수의 거듭제곱($5^{100}$, $2^{100}$)이기 때문입니다.\n\n$PDP^{-1}\\cdot PDP^{-1}$에서 가운데 $P^{-1}P$가 서로 지워지는 모습을 직접 써 보면 왜 $PD^kP^{-1}$인지 바로 보입니다.',
        check: {
          type: 'ox',
          q: '$A=PDP^{-1}$이면 $A^3=P^3D^3P^{-3}$입니다.',
          answer: false,
          explain: '$A^3=PDP^{-1}PDP^{-1}PDP^{-1}=PD^3P^{-1}$입니다. 가운데의 $P^{-1}P$가 $I$로 사라질 뿐 $P$가 거듭제곱되지는 않습니다.',
        },
      },
      {
        title: '응용: 마르코프 연쇄와 전이행렬',
        body: '상태가 몇 가지 있고, 다음 단계의 상태가 지금 상태에만 따라 정해진 확률로 바뀌는 과정을 **마르코프 연쇄**라고 합니다.\n\n**전이행렬** $P$의 $(i, j)$ 성분은 "상태 $j$에서 상태 $i$로 갈 확률"로 잡습니다. 그러면 각 **열의 합이 1**이고, 상태 분포 벡터 $\\mathbf{x}_k$(성분의 합 1)는\n\n$\\mathbf{x}_{k+1}=P\\mathbf{x}_k, \\qquad \\mathbf{x}_k=P^k\\mathbf{x}_0$\n\n로 바뀝니다.\n\n예(가상의 날씨 모형): 맑은 날 다음 날은 0.9의 확률로 맑고, 비 온 날 다음 날은 0.2의 확률로 맑습니다. 상태 순서를 (맑음, 비)로 하면\n\n$P=\\begin{bmatrix} 0.9 & 0.2 \\\\ 0.1 & 0.8 \\end{bmatrix}$\n\n열의 합이 1인 행렬은 항상 고윳값 1을 가집니다. $P\\mathbf{q}=\\mathbf{q}$이고 성분의 합이 1인 $\\mathbf{q}$를 **정상상태 벡터**라 하며, 성분이 모두 양수인 전이행렬이면 어느 $\\mathbf{x}_0$에서 시작해도 $\\mathbf{x}_k\\to\\mathbf{q}$입니다.\n\n위 예에서 $(P-I)\\mathbf{q}=\\mathbf{0}$은 $-0.1q_1+0.2q_2=0$, 곧 $q_1=2q_2$이므로 $\\mathbf{q}=\\left(\\frac{2}{3}, \\frac{1}{3}\\right)$입니다. 오래 지나면 맑은 날이 약 $\\frac{2}{3}$입니다. 다른 고윳값은 $\\operatorname{tr} P-1=0.7$이고, $0.7^k\\to 0$이라 처음 상태의 영향이 사라집니다.\n\n> ⚠️ 책에 따라 행의 합이 1이 되게(행 벡터에 오른쪽으로 곱하게) 쓰기도 합니다. 이 단원은 열의 합이 1인 약속을 씁니다.',
        easy: '전이행렬의 한 열은 "오늘 이 상태라면 내일은 어디로 갈까"의 확률표입니다. 확률을 모두 더하면 1이니 열의 합이 1입니다.\n\n정상상태는 "내일의 분포가 오늘과 똑같아서 더 이상 변하지 않는 분포"입니다. 맑은 날에서 비로 가는 사람(0.1×맑음)과 비에서 맑음으로 오는 사람(0.2×비)이 같아지면 균형이 잡힙니다: $0.1q_1=0.2q_2$.',
        check: {
          type: 'short', check: 'number',
          q: '전이행렬 $P=\\begin{bmatrix} 0.8 & 0.3 \\\\ 0.2 & 0.7 \\end{bmatrix}$의 정상상태 벡터 $\\mathbf{q}=(q_1, q_2)$에서 $q_1$을 구하세요.',
          answer: '0.6',
          wrong: [{ a: '0.4', why: '$q_2$를 구했습니다. $0.2q_1=0.3q_2$에서 $q_1$이 더 큽니다.' }],
          explain: '$P\\mathbf{q}=\\mathbf{q}$에서 $-0.2q_1+0.3q_2=0$, 곧 $q_1=1.5q_2$입니다. $q_1+q_2=1$과 연립하면 $q_2=0.4$, $q_1=0.6$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '$A=\\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$의 고윳값과 각 고윳값에 대한 고유벡터를 구하고 대각화하세요.',
        steps: [
          '$\\operatorname{tr} A=7$, $\\det A=12-2=10$이므로 특성방정식은 $\\lambda^2-7\\lambda+10=0$, 곧 $(\\lambda-5)(\\lambda-2)=0$입니다. 고윳값은 5, 2입니다.',
          '$\\lambda=5$: $(A-5I)\\mathbf{v}=\\mathbf{0}$에서 $-x+y=0$이므로 고유벡터 $(1, 1)$을 얻습니다.',
          '$\\lambda=2$: $(A-2I)\\mathbf{v}=\\mathbf{0}$에서 $2x+y=0$이므로 고유벡터 $(1, -2)$를 얻습니다.',
          '고유벡터를 열로 놓아 $P=\\begin{bmatrix} 1 & 1 \\\\ 1 & -2 \\end{bmatrix}$, 같은 순서로 $D=\\begin{bmatrix} 5 & 0 \\\\ 0 & 2 \\end{bmatrix}$이면 $A=PDP^{-1}$입니다.',
          '검산: $A(1, 1)=(5, 5)$, $A(1, -2)=(2, -4)$로 각각 5배, 2배입니다.',
        ],
        answer: '고윳값 5, 2 / 고유벡터 $(1, 1)$, $(1, -2)$',
      },
      {
        q: '같은 행렬 $A=\\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$에 대하여 $A^3$의 $(1, 2)$ 성분을 대각화로 구하세요.',
        steps: [
          '$P^{-1}=\\dfrac{1}{-3}\\begin{bmatrix} -2 & -1 \\\\ -1 & 1 \\end{bmatrix}=\\dfrac{1}{3}\\begin{bmatrix} 2 & 1 \\\\ 1 & -1 \\end{bmatrix}$입니다.',
          '$A^3=PD^3P^{-1}$이고 $D^3=\\begin{bmatrix} 125 & 0 \\\\ 0 & 8 \\end{bmatrix}$입니다.',
          '$PD^3=\\begin{bmatrix} 125 & 8 \\\\ 125 & -16 \\end{bmatrix}$이고, 여기에 $P^{-1}$의 둘째 열 $\\frac{1}{3}(1, -1)$을 곱하면 $(1, 2)$ 성분은 $\\frac{1}{3}(125-8)=39$입니다.',
          '공식 $\\frac{1}{3}(5^k-2^k)$에 $k=3$을 넣어도 $\\frac{117}{3}=39$로 같습니다.',
        ],
        answer: '39',
      },
      {
        q: '가상의 날씨 모형 $P=\\begin{bmatrix} 0.9 & 0.2 \\\\ 0.1 & 0.8 \\end{bmatrix}$에서 오늘 맑다면($\\mathbf{x}_0=(1, 0)$), 모레 맑을 확률은 얼마입니까?',
        steps: [
          '내일: $\\mathbf{x}_1=P\\mathbf{x}_0=(0.9, 0.1)$ — $P$의 첫째 열입니다.',
          '모레: $\\mathbf{x}_2=P\\mathbf{x}_1=(0.9\\times 0.9+0.2\\times 0.1, 0.1\\times 0.9+0.8\\times 0.1)=(0.83, 0.17)$입니다.',
          '성분의 합이 1인지 확인: $0.83+0.17=1$',
        ],
        answer: '0.83',
      },
    ],

    terms: [
      { term: '고윳값', def: '$A\\mathbf{v}=\\lambda\\mathbf{v}$ ($\\mathbf{v}\\ne\\mathbf{0}$)를 만족하는 스칼라 $\\lambda$입니다. 특성방정식의 근입니다.' },
      { term: '고유벡터', def: '$A$를 곱해도 방향이 바뀌지 않는(스칼라배가 되는) 영벡터가 아닌 벡터입니다.' },
      { term: '특성방정식', def: '$\\det(A-\\lambda I)=0$입니다. $2\\times 2$이면 $\\lambda^2-(\\operatorname{tr} A)\\lambda+\\det A=0$' },
      { term: '고유공간', def: '한 고윳값 $\\lambda$에 대한 고유벡터 전체와 영벡터의 모임, $\\operatorname{Nul}(A-\\lambda I)$입니다.' },
      { term: '대수적 중복도', def: '고윳값이 특성방정식의 몇 겹근인지를 나타내는 수입니다.' },
      { term: '기하적 중복도', def: '고윳값의 고유공간의 차원입니다. 대수적 중복도보다 클 수 없습니다.' },
      { term: '닮은 행렬', def: '$B=P^{-1}AP$인 가역행렬 $P$가 있는 두 행렬입니다. 고윳값·행렬식·대각합이 같습니다.' },
      { term: '대각화', def: '$A=PDP^{-1}$ ($D$는 대각행렬)로 나타내는 것입니다. $P$의 열은 고유벡터, $D$의 대각성분은 고윳값입니다.' },
      { term: '전이행렬', def: '마르코프 연쇄에서 $(i, j)$ 성분이 상태 $j$에서 $i$로 갈 확률인 행렬입니다. 각 열의 합이 1입니다.' },
      { term: '정상상태 벡터', def: '$P\\mathbf{q}=\\mathbf{q}$이고 성분의 합이 1인 확률 벡터입니다. 고윳값 1의 고유벡터를 합이 1이 되게 맞춘 것입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'ox', concept: 0,
        q: '$A=\\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$에 대하여 $(1, 1)$은 $A$의 고유벡터입니다.',
        answer: false,
        explain: '$A(1, 1)=(2, 3)$은 $(1, 1)$의 스칼라배가 아니므로 고유벡터가 아닙니다. 이 행렬의 고유벡터는 $(1, 0)$ 방향(고윳값 2)과 $(0, 1)$ 방향(고윳값 3)입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 0,
        q: '$A=\\begin{bmatrix} 1 & 2 \\\\ 3 & 2 \\end{bmatrix}$, $\\mathbf{v}=(2, 3)$일 때 $A\\mathbf{v}=\\lambda\\mathbf{v}$인 $\\lambda$를 구하세요.',
        answer: '4',
        wrong: [{ a: '8', why: '$A\\mathbf{v}=(8, 12)$의 첫째 성분을 그대로 썼습니다. $(8, 12)$가 $(2, 3)$의 몇 배인지 구하세요.' }],
        explain: '$A\\mathbf{v}=(2+6, 6+6)=(8, 12)=4(2, 3)$이므로 $\\lambda=4$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'set', concept: 1,
        q: '$A=\\begin{bmatrix} 5 & 0 & 0 \\\\ 1 & 2 & 0 \\\\ 3 & 4 & -1 \\end{bmatrix}$의 고윳값을 모두 구하세요. (쉼표로 구분)',
        answer: ['5', '2', '-1'],
        wrong: [{ a: ['5', '2', '1'], why: '$-1$의 부호를 바꿨습니다. 삼각행렬의 고윳값은 대각성분 그대로입니다.' }],
        explain: '아래삼각행렬이므로 $\\det(A-\\lambda I)=(5-\\lambda)(2-\\lambda)(-1-\\lambda)$이고 고윳값은 대각성분 5, 2, $-1$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 1,
        q: '$A=\\begin{bmatrix} 1 & 2 \\\\ 4 & 3 \\end{bmatrix}$의 특성방정식은 무엇입니까?',
        choices: ['$\\lambda^2-4\\lambda-5=0$', '$\\lambda^2+4\\lambda-5=0$', '$\\lambda^2-4\\lambda+11=0$', '$\\lambda^2-5\\lambda+4=0$'],
        answer: 0,
        why: [
          '',
          '일차항의 부호가 반대입니다. 특성방정식은 $\\lambda^2-(\\operatorname{tr} A)\\lambda+\\det A=0$입니다.',
          '행렬식을 $3+8$로 계산했습니다. $\\det A=1\\cdot 3-2\\cdot 4=-5$입니다.',
          '대각합이나 행렬식을 잘못 계산했습니다. 대각합은 $1+3=4$, 행렬식은 $1\\cdot 3-2\\cdot 4=-5$입니다.',
        ],
        explain: '$\\operatorname{tr} A=1+3=4$, $\\det A=3-8=-5$이므로 $\\lambda^2-4\\lambda-5=0$입니다. 인수분해하면 $(\\lambda-5)(\\lambda+1)=0$이라 고윳값은 5, $-1$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'set', concept: 1,
        q: '$A=\\begin{bmatrix} 6 & -2 \\\\ 2 & 1 \\end{bmatrix}$의 고윳값을 모두 구하세요. (쉼표로 구분)',
        answer: ['2', '5'],
        wrong: [
          { a: ['-2', '-5'], why: '$\\lambda^2-7\\lambda+10=0$의 근의 부호를 바꿨습니다. $(\\lambda-2)(\\lambda-5)=0$입니다.' },
          { a: ['6', '1'], why: '대각성분을 그대로 썼습니다. 삼각행렬이 아니면 특성방정식을 풀어야 합니다.' },
        ],
        explain: '$\\operatorname{tr} A=7$, $\\det A=6+4=10$이므로 $\\lambda^2-7\\lambda+10=(\\lambda-2)(\\lambda-5)=0$입니다. 고윳값은 2, 5입니다.',
      },
      {
        id: 'p6', level: 1, type: 'ox', concept: 2,
        q: '닮은 두 행렬은 고윳값이 같습니다.',
        answer: true,
        explain: '$B=P^{-1}AP$이면 $\\det(B-\\lambda I)=\\det(P^{-1}(A-\\lambda I)P)=\\det(A-\\lambda I)$이므로 특성다항식이 같고, 고윳값도 같습니다.',
      },
      {
        id: 'p7', level: 2, type: 'short', check: 'number', concept: 1,
        q: '$A=\\begin{bmatrix} 2 & 1 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 3 \\end{bmatrix}$에서 고윳값 2에 대한 고유공간의 차원을 구하세요.',
        answer: '1',
        hint: '$A-2I$의 계수를 구하고 차원 정리를 쓰세요.',
        wrong: [{ a: '2', why: '대수적 중복도(2가 이중근)를 썼습니다. 고유공간의 차원은 $\\operatorname{Nul}(A-2I)$의 차원입니다.' }],
        explain: '$A-2I=\\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$의 계수는 2이므로 고유공간의 차원은 $3-2=1$입니다. 대수적 중복도 2보다 작으므로 $A$는 대각화할 수 없습니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 2,
        q: '다음 중 대각화할 수 **없는** 행렬은 무엇입니까?',
        choices: [
          '$\\begin{bmatrix} 2 & 1 \\\\ 0 & 2 \\end{bmatrix}$',
          '$\\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$',
          '$\\begin{bmatrix} 2 & 1 \\\\ 0 & 3 \\end{bmatrix}$',
          '$\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$',
        ],
        answer: 0,
        why: [
          '',
          '이미 대각행렬이므로 대각화 가능합니다($P=I$). 고윳값이 중근이어도 고유공간이 2차원입니다.',
          '고윳값 2, 3이 서로 다르므로 대각화 가능합니다.',
          '고윳값 $1$, $-1$이 서로 다르므로 대각화 가능합니다.',
        ],
        explain: '$\\begin{bmatrix} 2 & 1 \\\\ 0 & 2 \\end{bmatrix}$는 고윳값 2가 이중근인데, $A-2I=\\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix}$의 영공간이 $\\operatorname{span}\\{(1, 0)\\}$뿐이라 일차독립인 고유벡터가 1개뿐입니다. 그래서 대각화할 수 없습니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 3,
        q: '$A=PDP^{-1}$, $P=\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$, $D=\\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$일 때 $A^3$의 $(1, 2)$ 성분을 구하세요.',
        answer: '19',
        hint: '$A^3=PD^3P^{-1}$이고 $P^{-1}=\\begin{bmatrix} 1 & -1 \\\\ 0 & 1 \\end{bmatrix}$입니다.',
        wrong: [{ a: '1', why: '$A$의 $(1, 2)$ 성분 1을 세제곱했습니다. 행렬의 거듭제곱은 성분별 거듭제곱이 아닙니다.' }],
        explain: '$D^3=\\begin{bmatrix} 8 & 0 \\\\ 0 & 27 \\end{bmatrix}$, $PD^3=\\begin{bmatrix} 8 & 27 \\\\ 0 & 27 \\end{bmatrix}$, $PD^3P^{-1}=\\begin{bmatrix} 8 & -8+27 \\\\ 0 & 27 \\end{bmatrix}=\\begin{bmatrix} 8 & 19 \\\\ 0 & 27 \\end{bmatrix}$이므로 19입니다. 확인: $A=\\begin{bmatrix} 2 & 1 \\\\ 0 & 3 \\end{bmatrix}$을 직접 세제곱해도 같습니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 4,
        q: '가상의 자전거 대여소 두 곳(가, 나)이 있습니다. 가에서 빌린 자전거의 70%는 가에, 30%는 나에 반납되고, 나에서 빌린 자전거의 80%는 나에, 20%는 가에 반납됩니다. 오래 지난 뒤 가에 있는 자전거의 비율을 소수로 구하세요.',
        answer: '0.4',
        hint: '전이행렬 $P=\\begin{bmatrix} 0.7 & 0.2 \\\\ 0.3 & 0.8 \\end{bmatrix}$의 정상상태 벡터를 구하세요.',
        wrong: [{ a: '0.6', why: '나에 있는 비율을 구했습니다. 가에서 나가는 비율(0.3)이 들어오는 비율(0.2)보다 크므로 가의 비율이 더 작습니다.' }],
        explain: '$P\\mathbf{q}=\\mathbf{q}$에서 $-0.3q_1+0.2q_2=0$, 곧 $q_2=1.5q_1$입니다. $q_1+q_2=2.5q_1=1$이므로 $q_1=0.4$입니다. 장기적으로 40%가 가에 있습니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 0,
        q: '$A$가 가역이고 $A\\mathbf{v}=3\\mathbf{v}$ ($\\mathbf{v}\\ne\\mathbf{0}$)일 때, $A^{-1}\\mathbf{v}$는 무엇입니까?',
        choices: ['$\\frac{1}{3}\\mathbf{v}$', '$3\\mathbf{v}$', '$-3\\mathbf{v}$', '$\\mathbf{v}$'],
        answer: 0,
        why: [
          '',
          '$A$와 $A^{-1}$의 고윳값을 같다고 보았습니다. 양변에 $A^{-1}$을 곱해 보세요.',
          '역행렬은 부호를 바꾸는 것이 아니라 역수를 취합니다.',
          '$A^{-1}A\\mathbf{v}=\\mathbf{v}$와 헷갈렸습니다. $A^{-1}\\mathbf{v}$ 자체를 구해야 합니다.',
        ],
        explain: '$A\\mathbf{v}=3\\mathbf{v}$의 양변에 $A^{-1}$을 곱하면 $\\mathbf{v}=3A^{-1}\\mathbf{v}$이므로 $A^{-1}\\mathbf{v}=\\frac{1}{3}\\mathbf{v}$입니다. $\\mathbf{v}$는 $A^{-1}$의 고윳값 $\\frac{1}{3}$에 대한 고유벡터이기도 합니다.',
      },
      {
        id: 'p12', level: 2, type: 'ox', concept: 4,
        q: '각 열의 합이 1인 전이행렬은 항상 고윳값 1을 가집니다.',
        answer: true,
        explain: '열의 합이 1이면 $P^{T}(1, \\ldots, 1)=(1, \\ldots, 1)$이므로 $P^{T}$의 고윳값에 1이 있습니다. $P$와 $P^{T}$의 특성다항식은 같으므로($\\det$는 전치해도 같음) $P$도 고윳값 1을 가집니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 1,
        q: '$2\\times 2$ 행렬 $A$의 대각합이 5이고 행렬식이 6입니다. $\\det(A+I)$를 구하세요.',
        answer: '12',
        hint: '먼저 고윳값을 구하고, $A+I$의 고윳값이 무엇인지 생각해 보세요.',
        wrong: [{ a: '7', why: '$\\det A+1$로 계산했습니다. 행렬식은 덧셈에 대해 나누어지지 않습니다.' }],
        explain: '$\\lambda^2-5\\lambda+6=0$에서 고윳값은 2, 3입니다. $A+I$의 고윳값은 각각 1 큰 3, 4이고, 행렬식은 고윳값의 곱이므로 $3\\times 4=12$입니다. (특성다항식 $p(\\lambda)=\\det(A-\\lambda I)$로 보면 $\\det(A+I)=p(-1)=1+5+6=12$입니다.)',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 1,
        q: '$A=\\begin{bmatrix} 1 & k \\\\ 1 & 3 \\end{bmatrix}$의 고윳값 하나가 4가 되도록 하는 $k$의 값을 구하세요.',
        answer: '3',
        hint: '4가 고윳값이면 $\\det(A-4I)=0$입니다.',
        wrong: [{ a: '-3', why: '$\\det(A-4I)=(1-4)(3-4)-k=3-k$의 부호를 다시 확인해 보세요.' }],
        explain: '$\\det(A-4I)=(-3)(-1)-k\\cdot 1=3-k=0$이므로 $k=3$입니다. 이때 $\\operatorname{tr} A=4$이므로 다른 고윳값은 0입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 2,
        q: '실수 $a$, $b$에 대하여 $A=\\begin{bmatrix} a & 1 \\\\ 0 & b \\end{bmatrix}$가 대각화 가능할 필요충분조건은 무엇입니까?',
        choices: ['$a\\ne b$', '$a=b$', '$ab\\ne 0$', '$a$, $b$에 관계없이 항상 가능'],
        answer: 0,
        why: [
          '',
          '$a=b$이면 $A-aI=\\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix}$이라 고유공간이 1차원뿐이어서 대각화할 수 없습니다.',
          '고윳값이 0이어도 대각화할 수 있습니다. 가역성과 대각화 가능성은 다른 성질입니다.',
          '$a=b$이면 일차독립인 고유벡터가 1개뿐이라 대각화할 수 없습니다.',
        ],
        explain: '고윳값은 대각성분 $a$, $b$입니다. $a\\ne b$이면 서로 다른 고윳값 2개라 대각화 가능합니다. $a=b$이면 이중근인데 고유공간 $\\operatorname{Nul}(A-aI)=\\operatorname{span}\\{(1, 0)\\}$이 1차원이라 대각화할 수 없습니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 4,
        q: '가상의 날씨 모형 $P=\\begin{bmatrix} 0.9 & 0.2 \\\\ 0.1 & 0.8 \\end{bmatrix}$(상태 순서: 맑음, 비)에서, 오늘 비가 왔다면 모레 맑을 확률을 구하세요.',
        answer: '0.34',
        hint: '$\\mathbf{x}_0=(0, 1)$에서 시작해 $P$를 두 번 곱하세요.',
        wrong: [
          { a: '0.2', why: '내일 맑을 확률에서 멈췄습니다. 하루 더 진행해야 합니다.' },
          { a: '0.04', why: '$0.2\\times 0.2$만 계산했습니다. "비 → 맑음 → 맑음" 경로($0.2\\times 0.9$)도 더해야 합니다.' },
        ],
        explain: '$\\mathbf{x}_1=P(0, 1)=(0.2, 0.8)$, $\\mathbf{x}_2=P\\mathbf{x}_1=(0.9\\times 0.2+0.2\\times 0.8, 0.1\\times 0.2+0.8\\times 0.8)=(0.34, 0.66)$입니다. 경로로 보면 비→맑음→맑음 $0.2\\times 0.9=0.18$과 비→비→맑음 $0.8\\times 0.2=0.16$의 합입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 3,
        q: '$P=\\begin{bmatrix} 0.9 & 0.2 \\\\ 0.1 & 0.8 \\end{bmatrix}$일 때 $k\\to\\infty$에서 $P^k$의 $(1, 2)$ 성분의 극한값을 구하세요.',
        answer: '2/3',
        hint: '고윳값 1, 0.7로 대각화하면 $P^k=Q\\begin{bmatrix} 1 & 0 \\\\ 0 & 0.7^k \\end{bmatrix}Q^{-1}$입니다.',
        wrong: [
          { a: '1/3', why: '정상상태 벡터의 둘째 성분을 썼습니다. $P^k$의 극한은 모든 열이 $\\mathbf{q}=(\\frac{2}{3}, \\frac{1}{3})$이 되므로 첫째 행의 성분은 $\\frac{2}{3}$입니다.' },
          { a: '0', why: '$0.7^k\\to 0$이지만 고윳값 1의 항은 남습니다.' },
        ],
        explain: '고윳값은 1과 $\\operatorname{tr} P-1=0.7$입니다. $0.7^k\\to 0$이므로 $P^k$은 고윳값 1의 부분만 남아 모든 열이 정상상태 벡터 $\\mathbf{q}=(\\frac{2}{3}, \\frac{1}{3})$인 행렬로 수렴합니다. 그래서 $(1, 2)$ 성분은 $\\frac{2}{3}$로 수렴합니다. 어느 상태에서 시작해도 장기적으로 맑을 확률은 $\\frac{2}{3}$라는 뜻입니다.',
      },
    ],

    deeper: [
      {
        title: '검색 엔진과 고유벡터',
        body: '웹 문서의 중요도를 매기는 한 방법은 "사람이 링크를 따라 무작위로 돌아다닐 때 각 문서에 머무는 장기 비율"을 구하는 것입니다. 이것은 문서들을 상태로 하는 거대한 마르코프 연쇄의 정상상태 벡터, 곧 고윳값 1의 고유벡터입니다. 문서가 수십억 개라 특성방정식을 풀 수는 없고, 아무 벡터에서 시작해 전이행렬을 계속 곱하는 **거듭제곱법**으로 근사합니다. 이 단원에서 본 "$A^k\\mathbf{x}$는 가장 큰 고윳값의 고유벡터 쪽으로 정렬된다"는 성질을 그대로 쓰는 것입니다.',
      },
      {
        title: '대각화할 수 없을 때와 다음 단원',
        body: '모든 행렬이 대각화되지는 않습니다. $\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$처럼 고유벡터가 모자라는 행렬은 대각행렬 대신 "거의 대각"인 조르당 표준형까지만 갈 수 있습니다(더 높은 과정에서 배웁니다). 또 실수 행렬이라도 회전행렬처럼 고윳값이 복소수인 경우가 있습니다.\n\n반면 **대칭행렬**($A^{T}=A$)은 항상 실수 고윳값을 가지고, 서로 수직인 고유벡터로 대각화됩니다. 다음 단원에서 수직(직교)의 개념을 정리한 뒤, 그다음 단원에서 이 아름다운 정리를 배웁니다.',
      },
    ],

    faq: [
      {
        q: '고유벡터는 왜 답이 여러 개예요?',
        a: '$\\mathbf{v}$가 고유벡터이면 $2\\mathbf{v}$, $-5\\mathbf{v}$처럼 0이 아닌 스칼라배도 모두 $A(c\\mathbf{v})=\\lambda(c\\mathbf{v})$를 만족합니다. 그래서 고유벡터는 "하나의 벡터"가 아니라 "하나의 방향(고유공간)"으로 생각하는 것이 좋습니다. 답을 쓸 때는 보통 성분이 간단한 것 하나를 대표로 씁니다.',
      },
      {
        q: '고윳값이 0이면 어떻게 되나요?',
        a: '고윳값 0이 있다는 것은 $A\\mathbf{v}=\\mathbf{0}$인 영벡터가 아닌 $\\mathbf{v}$가 있다는 뜻이므로 $A$가 가역이 아니라는 뜻입니다($\\det A$는 고윳값의 곱이라 0). 고윳값 0의 고유공간이 바로 $\\operatorname{Nul} A$입니다. 그래도 대각화는 가능할 수 있습니다.',
      },
      {
        q: '전이행렬은 행의 합이 1이어야 하지 않나요?',
        a: '책마다 약속이 다릅니다. 상태 벡터를 열벡터로 써서 $\\mathbf{x}_{k+1}=P\\mathbf{x}_k$로 곱하면 열의 합이 1이고, 행벡터로 써서 $\\mathbf{x}_{k+1}=\\mathbf{x}_kP$로 곱하면 행의 합이 1입니다. 두 약속의 행렬은 서로 전치 관계입니다. 이 단원은 열의 합이 1인 약속을 씁니다.',
      },
    ],

    mistakes: [
      '고유벡터로 영벡터를 답하는 실수 — 고유벡터는 정의상 영벡터가 아닙니다.',
      '$A=PDP^{-1}$에서 $P$의 열(고유벡터)과 $D$의 대각성분(고윳값)의 순서를 맞추지 않는 실수 — $i$번째 열의 고유벡터에 대응하는 고윳값이 $D$의 $i$번째 대각성분입니다.',
      '고윳값이 중근이면 무조건 대각화가 안 된다고 생각하는 실수 — 고유공간의 차원이 중복도만큼 있으면 대각화됩니다(예: $2I$).',
    ],

    gens: [
      {
        id: 'eigvals-2x2',
        level: 1,
        title: '특성방정식으로 고윳값 구하기',
        make: function (R) {
          var U, l1, l2, A;
          do {
            U = unimodular(R, -2, 2);
            l1 = R.int(-4, 6); l2 = R.int(-4, 6);
            A = mul(mul(U.P, [[l1, 0], [0, l2]]), U.Pinv);
          } while (l1 === l2 || A[0][1] === 0 || A[1][0] === 0 || A.some(function (r) { return r.some(function (x) { return Math.abs(x) > 15; }); }));
          var t = A[0][0] + A[1][1], d = A[0][0] * A[1][1] - A[0][1] * A[1][0];
          var ansSet = [String(l1), String(l2)];
          var same = function (a, b) { return a.slice().sort().join() === b.slice().sort().join(); };
          var wrongs = [];
          var neg = [String(fz(-l1)), String(fz(-l2))];
          if (!same(neg, ansSet)) wrongs.push({ a: neg, why: '근의 부호를 바꿨습니다. $' + factor(l1) + factor(l2) + '=0$의 근을 다시 확인해 보세요.' });
          var diag = [String(A[0][0]), String(A[1][1])];
          if (!same(diag, ansSet) && !(A[0][1] === 0 || A[1][0] === 0)) wrongs.push({ a: diag, why: '대각성분을 그대로 썼습니다. 삼각행렬이 아니면 특성방정식을 풀어야 합니다.' });
          var tri = A[0][1] === 0 || A[1][0] === 0;
          return {
            type: 'short', check: 'set', concept: 1,
            q: '$A=' + mat(A) + '$의 고윳값을 모두 구하세요. (쉼표로 구분)',
            answer: ansSet,
            hint: '특성방정식 $\\lambda^2-(\\operatorname{tr} A)\\lambda+\\det A=0$을 풀어 보세요.',
            wrong: wrongs,
            explain: '$\\operatorname{tr} A=' + t + '$, $\\det A=' + d + '$이므로 특성방정식은 $' + charPoly(t, d) + '=0$입니다. 인수분해하면 $' + factor(l1) + factor(l2) + '=0$이므로 고윳값은 $' + Math.min(l1, l2) + '$, $' + Math.max(l1, l2) + '$입니다.' +
              (tri ? ' (삼각행렬이라 대각성분이 곧 고윳값입니다.)' : ''),
          };
        },
      },
      {
        id: 'eigvec-pick',
        level: 1,
        title: '고유벡터 고르기',
        make: function (R) {
          var U, l1, l2, A;
          do {
            U = unimodular(R, -2, 3);
            l1 = R.int(-3, 5); l2 = R.int(-3, 5);
            A = mul(mul(U.P, [[l1, 0], [0, l2]]), U.Pinv);
          } while (l1 === l2 || A[0][1] === 0 || A[1][0] === 0 || A.some(function (r) { return r.some(function (x) { return Math.abs(x) > 15; }); }));
          var v = [U.P[0][0], U.P[1][0]], w = [U.P[0][1], U.P[1][1]];
          var par = function (a, b) { return a[0] * b[1] - a[1] * b[0] === 0; };
          var correct = '$' + tup(v) + '$';
          var cands = [
            ['$' + tup(w) + '$', '고윳값 $' + l2 + '$에 대한 고유벡터입니다. 문제는 고윳값 $' + l1 + '$의 고유벡터를 묻습니다.'],
            ['$(0, 0)$', '영벡터는 고유벡터가 아닙니다. $A\\mathbf{0}=\\lambda\\mathbf{0}$은 모든 $\\lambda$에서 성립해서 의미가 없습니다.'],
          ];
          var trial = [[v[1], v[0]], [v[0], -v[1]], [v[0] + 1, v[1]], [v[0], v[1] + 1], [-v[1], v[0]]];
          trial.forEach(function (u) {
            if ((u[0] !== 0 || u[1] !== 0) && !par(u, v)) {
              var Au = [A[0][0] * u[0] + A[0][1] * u[1], A[1][0] * u[0] + A[1][1] * u[1]];
              cands.push(['$' + tup(u) + '$', '$A' + tup(u) + '=' + tup(Au) + '$이므로 $' + tup(u) + '$의 $' + l1 + '$배가 아닙니다. $A\\mathbf{v}=' + l1 + '\\mathbf{v}$인지 직접 곱해 확인해 보세요.']);
            }
          });
          var reason = {};
          cands.forEach(function (k) { if (!(k[0] in reason)) reason[k[0]] = k[1]; });
          var pick = R.choices(correct, cands.map(function (k) { return k[0]; }));
          var Av = [l1 * v[0], l1 * v[1]];
          return {
            type: 'choice', concept: 0,
            q: '$A=' + mat(A) + '$의 고윳값 $' + l1 + '$에 대한 고유벡터를 고르세요.',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (ch) { return ch === correct ? '' : reason[ch] || ''; }),
            explain: '$A' + tup(v) + '=' + tup(Av) + '=' + l1 + tup(v) + '$이므로 이 벡터가 고윳값 $' + l1 + '$의 고유벡터입니다. ' +
              '(직접 구하려면 $(A-' + (l1 < 0 ? '(' + l1 + ')' : l1) + 'I)\\mathbf{v}=\\mathbf{0}$을 풉니다.)',
          };
        },
      },
      {
        id: 'diag-power',
        level: 2,
        title: '대각화로 거듭제곱 계산하기',
        make: function (R) {
          var U, l1, l2, k, D, A, Dk, PDk, Ak, i, j, ans;
          do {
            do {
              U = unimodular(R, -2, 2);
              l1 = R.pick([-2, -1, 1, 2, 3]); l2 = R.pick([-2, -1, 1, 2, 3]);
            } while (Math.abs(l1) === Math.abs(l2));
            k = R.int(3, 4);
            D = [[l1, 0], [0, l2]];
            A = mul(mul(U.P, D), U.Pinv);
            Dk = [[Math.pow(l1, k), 0], [0, Math.pow(l2, k)]];
            PDk = mul(U.P, Dk);
            Ak = mul(PDk, U.Pinv);
            i = R.int(0, 1); j = R.int(0, 1);
            ans = fz(Ak[i][j]);
          } while (ans === 0 || (A[0][1] === 0 && A[1][0] === 0));
          var naive = Math.pow(A[i][j], k);
          var wrongs = [];
          if (naive !== ans) wrongs.push({ a: String(naive), why: '$A$의 $(' + (i + 1) + ', ' + (j + 1) + ')$ 성분을 ' + k + '제곱했습니다. 행렬의 거듭제곱은 성분별 거듭제곱이 아닙니다.' });
          var noInv = fz(PDk[i][j]);
          if (noInv !== ans && noInv !== naive) wrongs.push({ a: String(noInv), why: '$PD^{' + k + '}$에서 멈췄습니다. 오른쪽에 $P^{-1}$까지 곱해야 합니다.' });
          return {
            type: 'short', check: 'number', concept: 3,
            q: '$A=PDP^{-1}$이고 $P=' + mat(U.P) + '$, $D=' + mat(D) + '$입니다. $A^{' + k + '}$의 $(' + (i + 1) + ', ' + (j + 1) + ')$ 성분을 구하세요.',
            answer: String(ans),
            hint: '$A^{' + k + '}=PD^{' + k + '}P^{-1}$이고, $P^{-1}=' + mat(U.Pinv) + '$입니다.',
            wrong: wrongs,
            explain: '$A^{' + k + '}=PD^{' + k + '}P^{-1}$이고 $D^{' + k + '}=' + mat(Dk) + '$입니다.\n\n' +
              '$PD^{' + k + '}=' + mat(PDk) + '$, $PD^{' + k + '}P^{-1}=' + mat(PDk) + mat(U.Pinv) + '=' + mat(Ak.map(function (r) { return r.map(fz); })) + '$\n\n' +
              '그래서 $(' + (i + 1) + ', ' + (j + 1) + ')$ 성분은 $' + ans + '$입니다.',
          };
        },
      },
      {
        id: 'markov-steady',
        level: 2,
        title: '마르코프 연쇄의 정상상태',
        make: function (R) {
          var a, b;
          do { a = R.int(1, 5); b = R.int(1, 5); } while (a === b);
          // a: 상태 1 → 2 로 옮기는 비율(십분율), b: 상태 2 → 1
          var dec = function (n) { return '0.' + n; };
          var places = R.pick([['가', '나'], ['동쪽 마을', '서쪽 마을'], ['도서관', '공원']]);
          var askFirst = R.bool();
          var num = askFirst ? b : a;
          var ans = R.F(num, a + b);
          var other = R.F(askFirst ? a : b, a + b);
          var P = [[dec(10 - a), dec(b)], [dec(a), dec(10 - b)]];
          var target = askFirst ? places[0] : places[1];
          // 유한소수로 나타나지 않는 답(2/7, 1/3 …)은 소수로 쓰면 정확히 맞출 수 없으므로 분수로만 묻는다
          var dd = ans.den;
          while (dd % 2 === 0) dd /= 2;
          while (dd % 5 === 0) dd /= 5;
          var form = dd === 1 ? '분수나 소수로' : '분수로';
          return {
            type: 'short', check: 'number', concept: 4,
            q: '가상의 두 곳 ' + places[0] + ', ' + places[1] + ' 사이를 사람들이 매주 옮겨 다닙니다. ' + places[0] + '에 있던 사람의 ' + (a * 10) + '%는 ' + places[1] + R.josa(places[1], '으로/로') + ', ' + places[1] + '에 있던 사람의 ' + (b * 10) + '%는 ' + places[0] + R.josa(places[0], '으로/로') + ' 옮기고 나머지는 그대로 있습니다. 오래 지난 뒤 ' + target + '에 있는 사람의 비율을 ' + form + ' 구하세요.',
            answer: ans.toString(),
            hint: '전이행렬 $P=' + mat(P) + '$에서 $P\\mathbf{q}=\\mathbf{q}$, $q_1+q_2=1$을 푸세요.',
            wrong: [{ a: other.toString(), why: '다른 곳의 비율을 구했습니다. 균형식 $0.' + a + 'q_1=0.' + b + 'q_2$에서 어느 쪽이 큰지 다시 확인해 보세요.' }],
            explain: '상태 순서를 (' + places[0] + ', ' + places[1] + ')로 하면 $P=' + mat(P) + '$입니다. $P\\mathbf{q}=\\mathbf{q}$의 첫째 식은 $-0.' + a + 'q_1+0.' + b + 'q_2=0$, 곧 $' + (a === 1 ? '' : a) + 'q_1=' + (b === 1 ? '' : b) + 'q_2$입니다. ' +
              '$q_1+q_2=1$과 연립하면 $q_1=' + R.F(b, a + b).toTex() + '$, $q_2=' + R.F(a, a + b).toTex() + '$이므로 답은 $' + ans.toTex() + '$입니다.',
          };
        },
      },
    ],
  });
})();
