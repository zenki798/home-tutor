/* 선형대수학 · 선형변환
 * 선형변환의 정의, 표준행렬, 회전·반사·사영·확대 변환, 핵과 치역·단사와 전사, 합성과 역변환.
 * (앞 단원: 행렬의 곱·역행렬·행렬식·기저와 차원 / 다음 단원: 고윳값과 고유벡터) */
(function () {
  // ---------- 글자 도우미 ----------
  function tup(v) { return '(' + v.join(', ') + ')'; }
  function mat(rows) {
    return '\\begin{bmatrix} ' + rows.map(function (r) { return r.join(' & '); }).join(' \\\\ ') + ' \\end{bmatrix}';
  }
  // 일차식: lin([2, -1], ['x', 'y']) → '2x-y'
  function lin(cs, vs) {
    var s = '';
    cs.forEach(function (c, i) {
      if (c === 0) return;
      var a = Math.abs(c), sign = c < 0 ? '-' : (s ? '+' : '');
      s += sign + (a === 1 ? '' : a) + vs[i];
    });
    return s || '0';
  }
  function mul(A, B) {
    return A.map(function (row) {
      return B[0].map(function (_, j) { return row.reduce(function (t, x, k) { return t + x * B[k][j]; }, 0); });
    });
  }
  function transpose(A) { return A[0].map(function (_, j) { return A.map(function (r) { return r[j]; }); }); }
  function rank(R, rows) {
    var A = rows.map(function (r) { return r.map(function (x) { return R.F(x); }); });
    var m = A.length, n = A[0].length, r = 0;
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
      r++;
    }
    return r;
  }

  // ---------- 좌표평면 그림 (벡터·다각형) ----------
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
    (o.polys || []).forEach(function (g) {
      var pts = g.pts.map(function (p) { return X(p[0]) + ',' + Y(p[1]); }).join(' ');
      s += '<polygon points="' + pts + '" fill="' + (g.fill || 'none') + '" fill-opacity="0.25" stroke="currentColor" stroke-width="1.3"' + (g.dashed ? ' stroke-dasharray="5 4"' : '') + '/>';
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
    id: 'math-u-linalg-06',
    course: 'math-u-linalg',
    title: '선형변환',
    summary: '선형변환의 뜻을 알고 표준행렬로 나타내며, 회전·반사·사영·확대 변환과 핵·치역, 합성과 역변환을 행렬로 다룹니다.',
    goals: [
      '선형변환의 정의를 알고, 주어진 변환이 선형인지 판정할 수 있다.',
      '$\\mathbf{R}^n$에서 $\\mathbf{R}^m$으로의 선형변환의 표준행렬을 구할 수 있다.',
      '회전·반사·사영·확대 변환을 행렬로 나타내고, 핵과 치역을 구해 단사·전사를 판정할 수 있다.',
      '선형변환의 합성과 역변환을 행렬의 곱과 역행렬로 계산할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '선형변환의 정의',
        body: '벡터공간 $V$에서 $W$로 가는 함수 $T$가 모든 벡터 $\\mathbf{u}$, $\\mathbf{v}$와 스칼라 $c$에 대하여\n\n1. $T(\\mathbf{u}+\\mathbf{v})=T(\\mathbf{u})+T(\\mathbf{v})$ (덧셈을 보존)\n2. $T(c\\mathbf{v})=cT(\\mathbf{v})$ (스칼라배를 보존)\n\n를 만족하면 $T$를 **선형변환**이라고 합니다. 두 조건을 합쳐 "일차결합을 보존한다"고도 말합니다: $T(c_1\\mathbf{v}_1+c_2\\mathbf{v}_2)=c_1T(\\mathbf{v}_1)+c_2T(\\mathbf{v}_2)$.\n\n$c=0$을 넣으면 $T(\\mathbf{0})=\\mathbf{0}$이 나옵니다. 그래서 영벡터를 영벡터로 보내지 않는 변환은 선형이 아닙니다.\n\n- $T(x, y)=(2x+y, x-3y)$: 각 성분이 상수항 없는 일차식이므로 선형입니다.\n- $T(x, y)=(x+1, y)$: $T(0, 0)=(1, 0)$이므로 선형이 아닙니다(평행이동).\n- $T(x, y)=(xy, x)$: $T(2(1, 1))=(4, 2)$이지만 $2T(1, 1)=(2, 2)$이므로 선형이 아닙니다.\n\n> 💡 $\\mathbf{R}^n$에서 $\\mathbf{R}^m$으로의 변환은 **각 성분이 상수항 없는 일차식**일 때, 그리고 그때만 선형입니다.',
        easy: '선형변환은 "격자를 고르게 늘이고, 돌리고, 뒤집는" 변환입니다. 모눈종이를 변환하면 격자선은 여전히 곧고, 평행한 선은 평행하게, 간격은 고르게 남으며, 원점은 제자리에 있습니다.\n\n원점을 옮기거나(평행이동) 선을 휘게 만드는($x^2$, $xy$ 같은 항) 변환은 선형이 아닙니다.',
        check: {
          type: 'ox',
          q: '$T(x, y)=(x+1, y)$는 선형변환입니다.',
          answer: false,
          explain: '$T(0, 0)=(1, 0)\\ne(0, 0)$입니다. 선형변환은 반드시 영벡터를 영벡터로 보내므로 이 평행이동은 선형이 아닙니다.',
        },
      },
      {
        title: '표준행렬',
        body: '$\\mathbf{R}^n$에서 $\\mathbf{R}^m$으로의 선형변환 $T$는 항상 어떤 $m\\times n$ 행렬 $A$의 곱으로 나타납니다: $T(\\mathbf{x})=A\\mathbf{x}$. 이 $A$를 $T$의 **표준행렬**이라 하고, 표준기저의 상을 **열로** 놓아 만듭니다.\n\n$A=[\\,T(\\mathbf{e}_1)\\ \\ T(\\mathbf{e}_2)\\ \\cdots\\ T(\\mathbf{e}_n)\\,]$\n\n이유: $\\mathbf{x}=x_1\\mathbf{e}_1+\\cdots+x_n\\mathbf{e}_n$이고 $T$가 일차결합을 보존하므로 $T(\\mathbf{x})=x_1T(\\mathbf{e}_1)+\\cdots+x_nT(\\mathbf{e}_n)$, 곧 열들의 일차결합 $A\\mathbf{x}$입니다.\n\n예: $T(x, y)=(x+2y, 3x, x-y)$이면 $T(\\mathbf{e}_1)=(1, 3, 1)$, $T(\\mathbf{e}_2)=(2, 0, -1)$이므로\n\n$A=\\begin{bmatrix} 1 & 2 \\\\ 3 & 0 \\\\ 1 & -1 \\end{bmatrix}$ ($3\\times 2$ 행렬)\n\n그림은 $T(\\mathbf{e}_1)=(2, 1)$, $T(\\mathbf{e}_2)=(-1, 1)$인 변환이 단위정사각형을 평행사변형으로 보내는 모습입니다. 이때 표준행렬은 $\\begin{bmatrix} 2 & -1 \\\\ 1 & 1 \\end{bmatrix}$입니다.\n\n> ⚠️ 크기는 $m\\times n$입니다. 행의 개수 = 도착 공간의 차원, 열의 개수 = 출발 공간의 차원.',
        easy: '선형변환은 $\\mathbf{e}_1$, $\\mathbf{e}_2$가 어디로 가는지만 알면 전부 정해집니다. 모든 벡터가 "$\\mathbf{e}_1$ 몇 개 + $\\mathbf{e}_2$ 몇 개"이니까요.\n\n그래서 $T(\\mathbf{e}_1)$, $T(\\mathbf{e}_2)$를 차례로 **세로로** 세워 붙이면 표준행렬이 됩니다. 식 $T(x, y)=(x+2y, \\ldots)$에서 계수를 가로로 읽어 적어도 같은 행렬이 나옵니다(행 = 출력의 각 성분).',
        fig: {
          type: 'svg',
          alt: '점선 단위정사각형과, 변환 뒤의 평행사변형. T(e1)=(2,1), T(e2)=(-1,1) 화살표가 그려져 있다.',
          svg: plane({
            xmin: -2, xmax: 3, ymin: -1, ymax: 3, u: 40,
            polys: [
              { pts: [[0, 0], [1, 0], [1, 1], [0, 1]], dashed: true },
              { pts: [[0, 0], [2, 1], [1, 2], [-1, 1]], fill: 'var(--fig-1)' },
            ],
            vecs: [
              { to: [2, 1], label: 'T(e₁)', lx: 2.45, ly: 0.55, color: 'var(--fig-2)' },
              { to: [-1, 1], label: 'T(e₂)', lx: -1.3, ly: 1.4, color: 'var(--fig-3)' },
            ],
          }),
        },
        check: {
          type: 'choice',
          q: '선형변환 $T: \\mathbf{R}^4 \\to \\mathbf{R}^2$의 표준행렬의 크기는 무엇입니까?',
          choices: ['$2\\times 4$', '$4\\times 2$', '$4\\times 4$'],
          answer: 0,
          why: ['', '행과 열을 바꿨습니다. $A\\mathbf{x}$에서 $\\mathbf{R}^4$의 벡터 $\\mathbf{x}$를 받으려면 열이 4개, 결과가 $\\mathbf{R}^2$에 있으려면 행이 2개여야 합니다.', '출발 공간만 보았습니다. 행의 개수는 도착 공간의 차원 2입니다.'],
          explain: '표준행렬은 (도착 공간의 차원)$\\times$(출발 공간의 차원)이므로 $2\\times 4$입니다. 열 4개가 $T(\\mathbf{e}_1), \\ldots, T(\\mathbf{e}_4)$입니다.',
        },
      },
      {
        title: '회전·반사·사영·확대',
        body: '평면의 대표적인 선형변환은 $\\mathbf{e}_1$, $\\mathbf{e}_2$가 어디로 가는지 그려 보면 표준행렬을 바로 쓸 수 있습니다.\n\n| 변환 | 표준행렬 |\n|---|---|\n| 원점 중심 $\\theta$ 회전(시계 반대 방향) | $\\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}$ |\n| $x$축에 대한 반사 | $\\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}$ |\n| 직선 $y=x$에 대한 반사 | $\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$ |\n| $x$축 위로의 정사영 | $\\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix}$ |\n| $k$배 확대·축소 | $\\begin{bmatrix} k & 0 \\\\ 0 & k \\end{bmatrix}$ |\n\n예를 들어 $90^\\circ$ 회전은 $\\mathbf{e}_1=(1, 0)$을 $(0, 1)$로, $\\mathbf{e}_2=(0, 1)$을 $(-1, 0)$으로 보내므로 $\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$입니다. 곧 $(x, y)\\mapsto(-y, x)$입니다.\n\n일반적으로 원점을 지나고 $x$축과 각 $\\theta$를 이루는 직선에 대한 반사는 $\\begin{bmatrix} \\cos 2\\theta & \\sin 2\\theta \\\\ \\sin 2\\theta & -\\cos 2\\theta \\end{bmatrix}$이고, 방향벡터가 $(1, m)$인 직선 $y=mx$ 위로의 정사영은 $\\dfrac{1}{1+m^2}\\begin{bmatrix} 1 & m \\\\ m & m^2 \\end{bmatrix}$입니다.\n\n> 💡 행렬식으로 보면: 회전은 1(넓이·방향 보존), 반사는 $-1$(방향이 뒤집힘), 정사영은 0(납작해짐), $k$배 확대는 $k^2$입니다.',
        easy: '공식을 외우기보다 "$\\mathbf{e}_1$과 $\\mathbf{e}_2$를 손가락으로 따라 움직여 보기"를 권합니다.\n\n$90^\\circ$ 회전: 오른쪽을 가리키던 $\\mathbf{e}_1$은 위쪽 $(0, 1)$을, 위를 가리키던 $\\mathbf{e}_2$는 왼쪽 $(-1, 0)$을 가리키게 됩니다. 이 둘을 열로 세우면 $\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$입니다.',
        check: {
          type: 'choice',
          q: '원점을 중심으로 시계 반대 방향으로 $90^\\circ$ 회전하는 변환의 표준행렬은 무엇입니까?',
          choices: ['$\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$', '$\\begin{bmatrix} 0 & 1 \\\\ -1 & 0 \\end{bmatrix}$', '$\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$'],
          answer: 0,
          why: ['', '시계 방향 $90^\\circ$ 회전입니다. $\\mathbf{e}_1$이 $(0, -1)$로 가 버립니다.', '직선 $y=x$에 대한 반사입니다. 행렬식이 $-1$이라 방향이 뒤집힙니다.'],
          explain: '$\\mathbf{e}_1\\mapsto(0, 1)$, $\\mathbf{e}_2\\mapsto(-1, 0)$이므로 이 둘을 열로 놓은 $\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$입니다. 회전 공식에 $\\theta=90^\\circ$를 넣어도 같습니다.',
        },
      },
      {
        title: '핵과 치역, 단사와 전사',
        body: '선형변환 $T(\\mathbf{x})=A\\mathbf{x}$ ($A$는 $m\\times n$)에 대하여\n\n- **핵**(kernel): $\\operatorname{ker} T=\\{\\mathbf{x} : T(\\mathbf{x})=\\mathbf{0}\\}=\\operatorname{Nul} A$ ($\\mathbf{R}^n$의 부분공간)\n- **치역**(range): $\\operatorname{range} T=\\{T(\\mathbf{x})\\}=\\operatorname{Col} A$ ($\\mathbf{R}^m$의 부분공간)\n\n앞 단원의 차원 정리는 $\\operatorname{dim}\\operatorname{ker} T+\\operatorname{dim}\\operatorname{range} T=n$이 됩니다.\n\n| 성질 | 뜻 | 판정 |\n|---|---|---|\n| **단사**(일대일) | 서로 다른 입력은 서로 다른 출력 | $\\operatorname{ker} T=\\{\\mathbf{0}\\}$, 곧 $\\operatorname{rank} A=n$ |\n| **전사**(위로) | 치역이 $\\mathbf{R}^m$ 전체 | $\\operatorname{rank} A=m$ |\n\n단사 판정이 핵만 보면 되는 이유: $T(\\mathbf{u})=T(\\mathbf{v})$이면 $T(\\mathbf{u}-\\mathbf{v})=\\mathbf{0}$이므로, 핵이 $\\{\\mathbf{0}\\}$이면 $\\mathbf{u}=\\mathbf{v}$입니다.\n\n> 💡 계수는 $m$과 $n$을 넘을 수 없으므로, $n>m$이면 단사일 수 없고 $n<m$이면 전사일 수 없습니다. $n=m$이면 단사와 전사가 같은 뜻이 됩니다.',
        easy: '핵은 "변환하면 원점으로 사라지는 입력들", 치역은 "변환해서 닿을 수 있는 출력들"입니다.\n\n$x$축 위로의 정사영 $(x, y)\\mapsto(x, 0)$을 생각해 보세요. $y$축 위의 점은 모두 원점으로 사라지므로 핵은 $y$축이고, 결과는 모두 $x$축 위에 있으므로 치역은 $x$축입니다. 서로 다른 점 $(1, 2)$, $(1, 5)$가 같은 점 $(1, 0)$으로 가니 단사가 아니고, $(0, 1)$에는 닿지 못하니 전사도 아닙니다.',
        check: {
          type: 'ox',
          q: '정의역이 $\\mathbf{R}^3$이고 공역이 $\\mathbf{R}^2$인 선형변환 $T$는 단사일 수 없습니다.',
          answer: true,
          explain: '표준행렬은 $2\\times 3$이라 계수가 2 이하입니다. 그래서 $\\operatorname{dim}\\operatorname{ker} T=3-\\operatorname{rank}\\ge 1$이 되어 핵에 영벡터가 아닌 벡터가 반드시 있습니다.',
        },
      },
      {
        title: '합성과 역변환',
        body: '$T(\\mathbf{x})=A\\mathbf{x}$를 한 뒤 $S(\\mathbf{y})=B\\mathbf{y}$를 하면\n\n$(S\\circ T)(\\mathbf{x})=S(T(\\mathbf{x}))=B(A\\mathbf{x})=(BA)\\mathbf{x}$\n\n이므로 **합성 $S\\circ T$의 표준행렬은 $BA$**입니다. 나중에 하는 변환의 행렬이 **왼쪽**에 옵니다. 행렬의 곱셈이 지금처럼 정의된 이유가 바로 이것입니다.\n\n예: $30^\\circ$ 회전 뒤 $60^\\circ$ 회전은 $90^\\circ$ 회전이므로 $R_{60^\\circ}R_{30^\\circ}=R_{90^\\circ}$입니다.\n\n$T: \\mathbf{R}^n \\to \\mathbf{R}^n$의 표준행렬 $A$가 가역이면 $T$는 **역변환** $T^{-1}(\\mathbf{y})=A^{-1}\\mathbf{y}$를 가집니다. $A$가 가역 $\\iff$ $\\det A\\ne 0$ $\\iff$ $T$가 단사 $\\iff$ $T$가 전사입니다.\n\n- $\\theta$ 회전의 역변환은 $-\\theta$ 회전입니다.\n- 반사의 역변환은 자기 자신입니다($A^2=I$).\n- 정사영은 $\\det=0$이라 역변환이 없습니다(납작해진 정보는 되돌릴 수 없습니다).\n\n> ⚠️ 행렬의 곱은 교환법칙이 성립하지 않으므로 $S\\circ T$와 $T\\circ S$는 대개 다릅니다.',
        easy: '양말을 신고(먼저) 신발을 신는(나중) 과정을 식으로 쓰면 "신발(양말(발))"입니다. 나중에 한 일이 바깥, 곧 왼쪽에 옵니다. 행렬도 같아서 $T$ 다음 $S$이면 $BA$입니다.\n\n되돌릴 때는 거꾸로: 신발을 먼저 벗고 양말을 벗습니다. 그래서 $(BA)^{-1}=A^{-1}B^{-1}$입니다.',
        check: {
          type: 'choice',
          q: '$T(\\mathbf{x})=A\\mathbf{x}$, $S(\\mathbf{x})=B\\mathbf{x}$일 때 합성 $S\\circ T$의 표준행렬은 무엇입니까?',
          choices: ['$BA$', '$AB$', '$A+B$'],
          answer: 0,
          why: ['', '곱하는 순서가 반대입니다. $S(T(\\mathbf{x}))=B(A\\mathbf{x})$이므로 먼저 하는 $T$의 행렬 $A$가 $\\mathbf{x}$ 바로 옆(오른쪽)에 옵니다.', '합성은 차례로 하는 것이므로 곱입니다. 행렬의 합은 두 변환의 결과를 더한 $T+S$에 해당합니다.'],
          explain: '$(S\\circ T)(\\mathbf{x})=S(A\\mathbf{x})=B(A\\mathbf{x})=(BA)\\mathbf{x}$이므로 표준행렬은 $BA$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '$T(x, y, z)=(x-y+2z, 3y+z)$의 표준행렬 $A$를 구하고, $T(1, 1, 1)$을 계산하세요.',
        steps: [
          '각 성분의 계수를 가로로 읽으면 첫 행은 $(1, -1, 2)$, 둘째 행은 $(0, 3, 1)$입니다.',
          '열로 확인: $T(\\mathbf{e}_1)=(1, 0)$, $T(\\mathbf{e}_2)=(-1, 3)$, $T(\\mathbf{e}_3)=(2, 1)$이 $A$의 열입니다.',
          '$A=\\begin{bmatrix} 1 & -1 & 2 \\\\ 0 & 3 & 1 \\end{bmatrix}$ ($2\\times 3$)입니다.',
          '$T(1, 1, 1)=A\\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix}=(1-1+2, 0+3+1)=(2, 4)$입니다.',
        ],
        answer: '$A=\\begin{bmatrix} 1 & -1 & 2 \\\\ 0 & 3 & 1 \\end{bmatrix}$, $T(1, 1, 1)=(2, 4)$',
      },
      {
        q: '$T(x, y)=(x+2y, 2x+4y)$의 핵과 치역을 구하고, 단사·전사인지 판정하세요.',
        steps: [
          '표준행렬은 $A=\\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}$이고 둘째 행이 첫째 행의 2배이므로 $\\operatorname{rank} A=1$입니다.',
          '핵: $x+2y=0$이므로 $\\operatorname{ker} T=\\operatorname{span}\\{(-2, 1)\\}$ (직선, 차원 1)입니다.',
          '치역: 두 열 $(1, 2)$, $(2, 4)$가 한 직선 위에 있으므로 $\\operatorname{range} T=\\operatorname{span}\\{(1, 2)\\}$ (직선, 차원 1)입니다.',
          '핵이 $\\{\\mathbf{0}\\}$이 아니므로 단사가 아니고, 치역이 $\\mathbf{R}^2$ 전체가 아니므로 전사도 아닙니다. 확인: $1+1=2$(차원 정리).',
        ],
        answer: '단사도 전사도 아니다',
      },
      {
        q: '직선 $y=x$에 대한 반사를 한 뒤 원점 중심 $90^\\circ$ 회전을 하는 변환은 어떤 변환입니까?',
        steps: [
          '반사 $F=\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$, 회전 $R=\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$입니다.',
          '나중에 하는 회전이 왼쪽: $RF=\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}=\\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix}$',
          '이 행렬은 $(x, y)\\mapsto(-x, y)$, 곧 $y$축에 대한 반사입니다.',
          '점으로 확인: $(x, y)\\to(y, x)\\to(-x, y)$로 맞습니다.',
        ],
        answer: '$y$축에 대한 반사',
      },
    ],

    terms: [
      { term: '선형변환', def: '덧셈과 스칼라배를 보존하는 함수입니다. $T(\\mathbf{u}+\\mathbf{v})=T(\\mathbf{u})+T(\\mathbf{v})$, $T(c\\mathbf{v})=cT(\\mathbf{v})$' },
      { term: '표준행렬', def: '$T(\\mathbf{x})=A\\mathbf{x}$가 되는 행렬 $A$입니다. 열이 $T(\\mathbf{e}_1), \\ldots, T(\\mathbf{e}_n)$입니다.' },
      { term: '회전변환', def: '원점을 중심으로 각 $\\theta$만큼 돌리는 변환입니다. 표준행렬은 $\\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}$' },
      { term: '반사변환', def: '원점을 지나는 직선(또는 평면)에 대하여 대칭으로 옮기는 변환입니다. 같은 반사를 두 번 하면 제자리로 돌아옵니다.' },
      { term: '정사영변환', def: '직선이나 평면 위로 수직으로 내린 점으로 보내는 변환입니다. 예: $(x, y)\\mapsto(x, 0)$' },
      { term: '핵', def: '$T(\\mathbf{x})=\\mathbf{0}$이 되는 $\\mathbf{x}$ 전체, $\\operatorname{ker} T=\\operatorname{Nul} A$입니다.' },
      { term: '치역', def: '$T$의 출력 전체, $\\operatorname{range} T=\\operatorname{Col} A$입니다.' },
      { term: '단사', def: '서로 다른 입력을 서로 다른 출력으로 보내는 성질입니다. 선형변환에서는 핵이 $\\{\\mathbf{0}\\}$인 것과 같습니다.' },
      { term: '전사', def: '치역이 도착 공간 전체인 성질입니다. $m\\times n$ 표준행렬의 계수가 $m$인 것과 같습니다.' },
      { term: '역변환', def: '$T$를 되돌리는 변환 $T^{-1}$입니다. 표준행렬이 가역일 때만 있고, 그 행렬은 $A^{-1}$입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '다음 중 선형변환인 것은 무엇입니까?',
        choices: ['$T(x, y)=(2x-y, 3y)$', '$T(x, y)=(x+1, y)$', '$T(x, y)=(x^2, y)$', '$T(x, y)=(xy, x)$'],
        answer: 0,
        why: [
          '',
          '$T(0, 0)=(1, 0)$이라 영벡터를 영벡터로 보내지 않습니다. 상수항이 있으면 선형이 아닙니다.',
          '$T(2, 0)=(4, 0)$이지만 $2T(1, 0)=(2, 0)$이라 스칼라배를 보존하지 않습니다.',
          '$xy$ 같은 곱의 항이 있으면 스칼라배를 보존하지 않습니다. $T(2, 2)=(4, 2)$, $2T(1, 1)=(2, 2)$',
        ],
        explain: '$T(x, y)=(2x-y, 3y)$는 각 성분이 상수항 없는 일차식이므로 표준행렬 $\\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix}$의 곱으로 쓸 수 있는 선형변환입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 1,
        q: '선형변환 $T: \\mathbf{R}^2 \\to \\mathbf{R}^2$에서 $T(\\mathbf{e}_1)=(1, 3)$, $T(\\mathbf{e}_2)=(2, -1)$입니다. $T(4, 1)$의 **둘째 성분**을 구하세요.',
        answer: '11',
        wrong: [{ a: '7', why: '$T(\\mathbf{e}_1)$, $T(\\mathbf{e}_2)$를 행으로 놓았습니다. 표준행렬의 열로 놓아야 합니다.' }],
        explain: '$T(4, 1)=4T(\\mathbf{e}_1)+1\\cdot T(\\mathbf{e}_2)=(4, 12)+(2, -1)=(6, 11)$이므로 둘째 성분은 11입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 2,
        q: '원점을 중심으로 $180^\\circ$ 회전하는 변환의 표준행렬은 무엇입니까?',
        choices: [
          '$\\begin{bmatrix} -1 & 0 \\\\ 0 & -1 \\end{bmatrix}$',
          '$\\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}$',
          '$\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$',
          '$\\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix}$',
        ],
        answer: 0,
        why: ['', '$x$축에 대한 반사입니다. $\\mathbf{e}_1$은 그대로 있습니다.', '$90^\\circ$ 회전입니다.', '$y$축에 대한 반사입니다. $\\mathbf{e}_2$는 그대로 있습니다.'],
        explain: '$180^\\circ$ 회전은 $\\mathbf{e}_1\\mapsto(-1, 0)$, $\\mathbf{e}_2\\mapsto(0, -1)$이므로 $-I$입니다. 회전 공식에서 $\\cos 180^\\circ=-1$, $\\sin 180^\\circ=0$을 넣어도 같습니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', concept: 3,
        q: '선형변환 $T: \\mathbf{R}^5 \\to \\mathbf{R}^3$의 표준행렬의 계수가 3입니다. $\\operatorname{ker} T$의 차원을 구하세요.',
        answer: '2',
        wrong: [{ a: '0', why: '도착 공간의 차원 3에서 뺐습니다. 핵은 $\\mathbf{R}^5$ 안에 있으므로 $5-3$입니다.' }],
        explain: '$\\operatorname{dim}\\operatorname{ker} T+\\operatorname{dim}\\operatorname{range} T=5$이고 치역의 차원은 계수 3이므로 핵의 차원은 2입니다. 치역이 $\\mathbf{R}^3$ 전체이므로 $T$는 전사이지만 단사는 아닙니다.',
      },
      {
        id: 'p5', level: 1, type: 'ox', concept: 0,
        q: '모든 선형변환 $T$에 대하여 $T(\\mathbf{0})=\\mathbf{0}$입니다.',
        answer: true,
        explain: '$T(\\mathbf{0})=T(0\\cdot\\mathbf{0})=0\\cdot T(\\mathbf{0})=\\mathbf{0}$입니다. 스칼라배 보존 조건에서 바로 나옵니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 2,
        q: '$\\mathbf{R}^2$에서 $x$축 위로의 정사영 $(x, y)\\mapsto(x, 0)$의 표준행렬은 무엇입니까?',
        choices: [
          '$\\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix}$',
          '$\\begin{bmatrix} 0 & 0 \\\\ 0 & 1 \\end{bmatrix}$',
          '$\\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}$',
          '$\\begin{bmatrix} 1 & 1 \\\\ 0 & 0 \\end{bmatrix}$',
        ],
        answer: 0,
        why: ['', '$y$축 위로의 정사영입니다.', '$x$축에 대한 반사입니다. 정사영은 $y$성분을 없앱니다.', '$(x, y)\\mapsto(x+y, 0)$이 되어 $\\mathbf{e}_2$가 $(1, 0)$으로 갑니다. 정사영에서는 $\\mathbf{e}_2$가 원점으로 갑니다.'],
        explain: '$\\mathbf{e}_1\\mapsto(1, 0)$, $\\mathbf{e}_2\\mapsto(0, 0)$이므로 표준행렬은 $\\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix}$입니다. 행렬식이 0이라 역변환이 없습니다.',
      },
      {
        id: 'p7', level: 2, type: 'choice', concept: 1,
        q: '그림은 선형변환 $T$가 점선의 단위정사각형을 색칠한 평행사변형으로 보내는 모습입니다. 화살표는 $T(\\mathbf{e}_1)$과 $T(\\mathbf{e}_2)$입니다. $T$의 표준행렬은 무엇입니까?',
        fig: {
          type: 'svg',
          alt: '점선 단위정사각형 (0,0),(1,0),(1,1),(0,1)이 꼭짓점 (0,0),(1,0),(2,1),(1,1)인 평행사변형으로 바뀐 그림. 화살표 T(e1)은 (1,0), T(e2)는 (1,1)을 가리킨다.',
          svg: plane({
            xmin: -1, xmax: 3, ymin: -1, ymax: 2, u: 46,
            polys: [
              { pts: [[0, 0], [1, 0], [1, 1], [0, 1]], dashed: true },
              { pts: [[0, 0], [1, 0], [2, 1], [1, 1]], fill: 'var(--fig-1)' },
            ],
            vecs: [
              { to: [1, 0], label: 'T(e₁)', lx: 0.55, ly: -0.45, color: 'var(--fig-2)' },
              { to: [1, 1], label: 'T(e₂)', lx: 0.35, ly: 1.3, color: 'var(--fig-3)' },
            ],
          }),
        },
        choices: [
          '$\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$',
          '$\\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\end{bmatrix}$',
          '$\\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}$',
          '$\\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}$',
        ],
        answer: 0,
        why: [
          '',
          '$T(\\mathbf{e}_1)$, $T(\\mathbf{e}_2)$를 행으로 놓았습니다. 열로 놓아야 합니다.',
          '꼭짓점 $(2, 1)$은 $T(1, 1)=T(\\mathbf{e}_1)+T(\\mathbf{e}_2)$입니다. 표준행렬의 열은 $T(\\mathbf{e}_1)$, $T(\\mathbf{e}_2)$입니다.',
          '$T(\\mathbf{e}_2)$를 꼭짓점 $(2, 1)$로 잘못 읽었습니다. 화살표 $T(\\mathbf{e}_2)$는 $(1, 1)$을 가리킵니다.',
        ],
        explain: '$T(\\mathbf{e}_1)=(1, 0)$, $T(\\mathbf{e}_2)=(1, 1)$을 열로 놓으면 $\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$입니다. 이 변환은 $(x, y)\\mapsto(x+y, y)$로, 위로 갈수록 오른쪽으로 밀리는 **층밀림**(전단) 변환입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 4,
        q: '$T(x, y)=(x+y, y)$, $S(x, y)=(2x, x-y)$일 때 $(S\\circ T)(1, 3)$의 **첫째 성분**을 구하세요.',
        answer: '8',
        hint: '$S\\circ T$는 $T$를 먼저 하고 $S$를 나중에 합니다.',
        wrong: [{ a: '0', why: '$T\\circ S$, 곧 $S$를 먼저 계산했습니다. $S\\circ T$는 $T$가 먼저입니다.' }],
        explain: '$T(1, 3)=(4, 3)$, $S(4, 3)=(8, 1)$이므로 첫째 성분은 8입니다. 행렬로는 $BA=\\begin{bmatrix} 2 & 0 \\\\ 1 & -1 \\end{bmatrix}\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}=\\begin{bmatrix} 2 & 2 \\\\ 1 & 0 \\end{bmatrix}$이고 $(2+6, 1+0)=(8, 1)$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', fixed: true, concept: 3,
        q: '$T(x, y)=(x-y, 2x-2y)$에 대하여 옳은 것은 무엇입니까?',
        choices: ['단사이고 전사이다', '단사이지만 전사는 아니다', '전사이지만 단사는 아니다', '단사도 전사도 아니다'],
        answer: 3,
        why: [
          '$T(1, 1)=(0, 0)$이므로 핵에 영벡터가 아닌 벡터가 있습니다. 단사가 아닙니다.',
          '$T(1, 1)=(0, 0)$이므로 핵에 영벡터가 아닌 벡터가 있어 단사가 아닙니다.',
          '치역은 직선 $\\operatorname{span}\\{(1, 2)\\}$뿐이라 $\\mathbf{R}^2$ 전체가 아닙니다. 전사가 아닙니다.',
          '',
        ],
        explain: '표준행렬 $\\begin{bmatrix} 1 & -1 \\\\ 2 & -2 \\end{bmatrix}$의 계수는 1입니다. 핵은 $\\operatorname{span}\\{(1, 1)\\}$이라 단사가 아니고, 치역은 $\\operatorname{span}\\{(1, 2)\\}$라 전사도 아닙니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 4,
        q: '$T(x, y)=(2x+y, 5x+3y)$일 때 $T(x, y)=(1, 0)$이 되는 $(x, y)$에서 $y$의 값을 구하세요.',
        answer: '-5',
        hint: '역변환의 행렬 $A^{-1}$을 구해 $(1, 0)$에 곱해 보세요.',
        wrong: [
          { a: '5', why: '역행렬 공식에서 부호를 바꾸는 자리를 다시 확인해 보세요. $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}^{-1}=\\dfrac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$' },
          { a: '-1', why: '$A^{-1}$의 첫째 **행**을 읽었습니다. $A^{-1}\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$은 $A^{-1}$의 첫째 **열**입니다.' },
        ],
        explain: '$A=\\begin{bmatrix} 2 & 1 \\\\ 5 & 3 \\end{bmatrix}$, $\\det A=6-5=1$이므로 $A^{-1}=\\begin{bmatrix} 3 & -1 \\\\ -5 & 2 \\end{bmatrix}$입니다. $(x, y)=A^{-1}(1, 0)=(3, -5)$이고, 검산하면 $2\\cdot 3-5=1$, $15-15=0$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'ox', concept: 4,
        q: '$T: \\mathbf{R}^2 \\to \\mathbf{R}^2$의 표준행렬의 행렬식이 0이면 $T$는 역변환을 가지지 않습니다.',
        answer: true,
        explain: '행렬식이 0이면 표준행렬이 가역이 아니므로 역변환이 없습니다. 이때 $T$는 평면을 직선이나 점으로 납작하게 만들어 핵이 $\\{\\mathbf{0}\\}$이 아닙니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 4,
        q: '원점 중심 $90^\\circ$ 회전(시계 반대 방향)을 한 뒤 $x$축에 대한 반사를 하는 변환은 무엇과 같습니까?',
        choices: ['직선 $y=-x$에 대한 반사', '직선 $y=x$에 대한 반사', '원점 중심 $180^\\circ$ 회전', '원점 중심 $-90^\\circ$ 회전'],
        answer: 0,
        why: [
          '',
          '순서를 반대로 곱했습니다. 반사를 먼저 하고 회전하면 $y=x$ 반사가 됩니다. 나중에 하는 반사의 행렬이 왼쪽에 옵니다.',
          '반사가 한 번 들어가므로 행렬식이 $-1$입니다. 회전(행렬식 1)이 될 수 없습니다.',
          '반사가 한 번 들어가므로 행렬식이 $-1$입니다. 회전(행렬식 1)이 될 수 없습니다.',
        ],
        explain: '$\\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}=\\begin{bmatrix} 0 & -1 \\\\ -1 & 0 \\end{bmatrix}$이고, 이것은 $(x, y)\\mapsto(-y, -x)$, 곧 직선 $y=-x$에 대한 반사입니다. 점으로 확인: $(x, y)\\to(-y, x)\\to(-y, -x)$',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 1,
        q: '선형변환 $T: \\mathbf{R}^2 \\to \\mathbf{R}^2$에서 $T(1, 1)=(3, 1)$, $T(1, -1)=(1, 5)$입니다. $T$의 표준행렬의 행렬식을 구하세요.',
        answer: '-7',
        hint: '$\\mathbf{e}_1=\\frac{1}{2}\\{(1, 1)+(1, -1)\\}$, $\\mathbf{e}_2=\\frac{1}{2}\\{(1, 1)-(1, -1)\\}$을 이용하세요.',
        wrong: [{ a: '14', why: '$T(1, 1)$, $T(1, -1)$을 그대로 열로 놓았습니다. 표준행렬의 열은 $T(\\mathbf{e}_1)$, $T(\\mathbf{e}_2)$입니다.' }],
        explain: '선형성으로 $T(\\mathbf{e}_1)=\\frac{1}{2}\\{(3, 1)+(1, 5)\\}=(2, 3)$, $T(\\mathbf{e}_2)=\\frac{1}{2}\\{(3, 1)-(1, 5)\\}=(1, -2)$입니다. 표준행렬 $\\begin{bmatrix} 2 & 1 \\\\ 3 & -2 \\end{bmatrix}$의 행렬식은 $-4-3=-7$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 2,
        q: '원점을 지나고 $x$축과 $30^\\circ$를 이루는 직선에 대한 반사를 한 뒤, $x$축과 $75^\\circ$를 이루는 직선에 대한 반사를 합니다. 합성 변환은 무엇입니까?',
        choices: ['시계 반대 방향 $90^\\circ$ 회전', '시계 반대 방향 $45^\\circ$ 회전', '시계 방향 $90^\\circ$ 회전', '$x$축과 $105^\\circ$를 이루는 직선에 대한 반사'],
        answer: 0,
        hint: '반사 행렬 $\\begin{bmatrix} \\cos 2\\theta & \\sin 2\\theta \\\\ \\sin 2\\theta & -\\cos 2\\theta \\end{bmatrix}$ 두 개를 곱해 보세요.',
        why: [
          '',
          '두 직선 사이의 각 $45^\\circ$를 그대로 썼습니다. 반사 두 번은 그 각의 **2배**만큼 회전합니다.',
          '순서를 반대로 했습니다. 먼저 $30^\\circ$ 직선, 나중에 $75^\\circ$ 직선이므로 $2(75^\\circ-30^\\circ)$만큼 시계 반대 방향으로 돕니다.',
          '반사를 두 번 하면 행렬식이 $(-1)(-1)=1$이라 반사가 아니라 회전입니다.',
        ],
        explain: '각 $\\alpha$, $\\beta$인 직선에 대한 반사 행렬을 $F_\\alpha$, $F_\\beta$라 하면 삼각함수의 덧셈정리로 $F_\\beta F_\\alpha=\\begin{bmatrix} \\cos 2(\\beta-\\alpha) & -\\sin 2(\\beta-\\alpha) \\\\ \\sin 2(\\beta-\\alpha) & \\cos 2(\\beta-\\alpha) \\end{bmatrix}$, 곧 $2(\\beta-\\alpha)$ 회전입니다. $2(75^\\circ-30^\\circ)=90^\\circ$이므로 시계 반대 방향 $90^\\circ$ 회전입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 3,
        q: '$T(\\mathbf{x})=A\\mathbf{x}$, $A=\\begin{bmatrix} 1 & 2 & 0 & 1 \\\\ 0 & 1 & 1 & 1 \\\\ 1 & 3 & 1 & 2 \\end{bmatrix}$일 때 $\\operatorname{ker} T$의 차원을 구하세요.',
        answer: '2',
        hint: '셋째 행과 앞의 두 행의 관계를 보세요.',
        wrong: [{ a: '1', why: '계수를 3으로 보았습니다. 셋째 행은 첫째 행과 둘째 행의 합이라 소거하면 0이 됩니다.' }],
        explain: '셋째 행 = 첫째 행 + 둘째 행이고, 앞의 두 행은 일차독립이므로 $\\operatorname{rank} A=2$입니다. 그래서 $\\operatorname{dim}\\operatorname{ker} T=4-2=2$입니다. 치역의 차원이 2라 $\\mathbf{R}^3$ 전체가 아니므로 전사도 아닙니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 3,
        q: '선형변환 $T: \\mathbf{R}^n \\to \\mathbf{R}^n$에 대하여 **항상** 옳은 것은 무엇입니까?',
        choices: [
          '핵이 $\\{\\mathbf{0}\\}$이면 치역은 $\\mathbf{R}^n$ 전체이다.',
          '단사이지만 전사가 아닌 경우가 있다.',
          '표준행렬의 행렬식이 0이어도 역변환이 있을 수 있다.',
          '치역이 $\\mathbf{R}^n$ 전체여도 핵이 직선일 수 있다.',
        ],
        answer: 0,
        why: [
          '',
          '정사각행렬이면 차원 정리에서 $\\operatorname{dim}\\operatorname{ker}=0 \\iff \\operatorname{rank}=n$이므로 단사와 전사가 같습니다.',
          '행렬식이 0이면 표준행렬이 가역이 아니라 역변환이 없습니다.',
          '치역의 차원이 $n$이면 차원 정리에서 핵의 차원은 $n-n=0$입니다.',
        ],
        explain: '차원 정리 $\\operatorname{dim}\\operatorname{ker} T+\\operatorname{dim}\\operatorname{range} T=n$에서 핵의 차원이 0이면 치역의 차원은 $n$, 곧 $\\mathbf{R}^n$ 전체입니다. 정사각인 경우 단사·전사·가역이 모두 같은 뜻입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 2,
        q: '점 $(5, 0)$을 직선 $y=2x$ 위로 정사영한 점의 $y$좌표를 구하세요.',
        answer: '2',
        hint: '직선 $y=mx$ 위로의 정사영 행렬은 $\\dfrac{1}{1+m^2}\\begin{bmatrix} 1 & m \\\\ m & m^2 \\end{bmatrix}$입니다.',
        wrong: [{ a: '10', why: '$x=5$를 직선의 식에 그대로 넣었습니다. 정사영은 수선의 발이므로 $x$좌표도 바뀝니다.' }],
        explain: '$m=2$이면 정사영 행렬은 $\\dfrac{1}{5}\\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}$이고, $(5, 0)$을 보내면 $\\dfrac{1}{5}(5, 10)=(1, 2)$입니다. 확인: $(5, 0)-(1, 2)=(4, -2)$는 방향벡터 $(1, 2)$와 내적이 $4-4=0$으로 수직입니다.',
      },
    ],

    deeper: [
      {
        title: '컴퓨터 그래픽과 선형변환',
        body: '화면 속 3차원 물체를 돌리고, 키우고, 비추는 계산은 대부분 행렬 곱셈입니다. 물체의 꼭짓점 수만 개에 같은 행렬을 곱하면 되고, 여러 동작을 이어 할 때는 행렬들을 미리 곱해 하나로 만들어 둡니다(합성 = 곱). 그래픽 처리 장치(GPU)가 행렬 곱셈을 매우 빠르게 하도록 만들어진 이유입니다.\n\n다만 평행이동은 선형이 아니므로, 그래픽에서는 $(x, y)$를 $(x, y, 1)$로 한 차원 늘린 **동차좌표**를 써서 평행이동까지 $3\\times 3$ 행렬 곱으로 처리합니다.',
      },
      {
        title: '다음 단원과의 연결: 변환이 늘이기만 하는 방향',
        body: '대부분의 벡터는 선형변환을 하면 방향이 바뀝니다. 그런데 어떤 특별한 방향의 벡터는 길이만 바뀌고 방향은 그대로입니다($A\\mathbf{v}=\\lambda\\mathbf{v}$). 이런 방향(고유벡터)을 기저로 잡으면 변환이 "축마다 늘이기"로 단순해집니다. 다음 단원에서 이 방향을 찾는 법을 배웁니다.',
      },
    ],

    faq: [
      {
        q: '표준행렬은 계수를 가로로 읽어도 되나요, 세로로 읽어야 하나요?',
        a: '식 $T(x, y)=(ax+by, cx+dy)$에서 계수를 가로로 읽어 행으로 적으면 $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$이고, 이것은 $T(\\mathbf{e}_1)=(a, c)$, $T(\\mathbf{e}_2)=(b, d)$를 열로 놓은 것과 같습니다. 두 방법은 같은 행렬을 줍니다. 헷갈리는 것은 "$T(\\mathbf{e}_1)$을 행으로 적는" 경우뿐입니다.',
      },
      {
        q: '합성할 때 왜 순서가 거꾸로인가요?',
        a: '함수 기호가 왼쪽에 붙기 때문입니다. $S(T(\\mathbf{x}))$에서 $\\mathbf{x}$에 먼저 닿는 것은 $T$, 곧 $A$입니다. 그래서 $B(A\\mathbf{x})=(BA)\\mathbf{x}$가 되어 먼저 하는 변환의 행렬이 오른쪽에 옵니다.',
      },
      {
        q: '단사와 전사는 어떻게 빨리 판정하나요?',
        a: '표준행렬의 계수 $r$을 구하고, 열의 개수 $n$, 행의 개수 $m$과 비교합니다. $r=n$이면 단사, $r=m$이면 전사입니다. 정사각행렬이면 행렬식이 0이 아닌지만 보면 둘 다 판정됩니다.',
      },
    ],

    mistakes: [
      '합성 $S\\circ T$의 행렬을 $AB$로 쓰는 실수 — 먼저 하는 $T$의 행렬 $A$가 오른쪽: $BA$입니다.',
      '$T(\\mathbf{e}_1)$, $T(\\mathbf{e}_2)$를 표준행렬의 행으로 적는 실수 — 표준기저의 상은 **열**입니다.',
      '평행이동 $T(\\mathbf{x})=\\mathbf{x}+\\mathbf{b}$ ($\\mathbf{b}\\ne\\mathbf{0}$)를 선형변환이라고 하는 실수 — $T(\\mathbf{0})\\ne\\mathbf{0}$입니다.',
    ],

    gens: [
      {
        id: 'std-matrix',
        level: 1,
        title: '식에서 표준행렬 구하기',
        make: function (R) {
          var n = R.pick([2, 2, 3]);
          var vs = n === 2 ? ['x', 'y'] : ['x', 'y', 'z'];
          var A, ok;
          do {
            A = [0, 1].map(function () { return vs.map(function () { return R.int(-4, 5); }); });
            var zeros = A[0].concat(A[1]).filter(function (x) { return x === 0; }).length;
            ok = zeros <= 1 && A[0][1] !== 0 && A[0].join() !== A[1].join() && A[0][0] !== A[0][1];
            if (n === 2) ok = ok && A[0][1] !== A[1][0];
          } while (!ok);
          var correct = '$' + mat(A) + '$';
          var colSwap = A.map(function (r) { var c = r.slice(); var t = c[0]; c[0] = c[1]; c[1] = t; return c; });
          var signErr = A.map(function (r, i) { return r.map(function (x, j) { return i === 0 && j === 1 ? -x : x; }); });
          var cands = [
            ['$' + mat(transpose(A)) + '$', '각 성분의 계수를 열로 적었습니다. 출력의 첫째 성분 $' + lin(A[0], vs) + '$의 계수는 첫째 **행**에 옵니다.'],
            ['$' + mat([A[1], A[0]]) + '$', '두 행의 순서가 바뀌었습니다. 첫째 행은 출력의 첫째 성분의 계수입니다.'],
            ['$' + mat(colSwap) + '$', '$x$와 $y$의 계수 자리가 바뀌었습니다. 첫째 열은 $x$의 계수, 곧 $T(\\mathbf{e}_1)$입니다.'],
            ['$' + mat(signErr) + '$', '계수의 부호를 다시 확인해 보세요.'],
          ];
          var reason = {};
          cands.forEach(function (k) { if (!(k[0] in reason)) reason[k[0]] = k[1]; });
          var pick = R.choices(correct, cands.map(function (k) { return k[0]; }));
          var arg = n === 2 ? '(x, y)' : '(x, y, z)';
          var eCols = A[0].map(function (_, j) { return '$T(\\mathbf{e}_' + (j + 1) + ')=' + tup([A[0][j], A[1][j]]) + '$'; }).join(', ');
          return {
            type: 'choice', concept: 1,
            q: '선형변환 $T' + arg + '=(' + lin(A[0], vs) + ', ' + lin(A[1], vs) + ')$의 표준행렬을 고르세요.',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (ch) { return ch === correct ? '' : reason[ch] || ''; }),
            explain: '표준기저의 상은 ' + eCols + '이고, 이것을 열로 놓으면 ' + correct + '입니다. 각 성분의 계수를 가로로 읽어 행으로 적어도 같습니다. 크기는 $2\\times ' + n + '$입니다.',
          };
        },
      },
      {
        id: 'geo-image',
        level: 1,
        title: '회전·반사·사영·확대로 옮긴 점',
        make: function (R) {
          var T = [
            { name: '원점을 중심으로 시계 반대 방향으로 $90^\\circ$ 회전', M: [[0, -1], [1, 0]] },
            { name: '원점을 중심으로 $180^\\circ$ 회전', M: [[-1, 0], [0, -1]] },
            { name: '원점을 중심으로 시계 방향으로 $90^\\circ$ 회전', M: [[0, 1], [-1, 0]] },
            { name: '$x$축에 대한 반사', M: [[1, 0], [0, -1]] },
            { name: '$y$축에 대한 반사', M: [[-1, 0], [0, 1]] },
            { name: '직선 $y=x$에 대한 반사', M: [[0, 1], [1, 0]] },
            { name: '직선 $y=-x$에 대한 반사', M: [[0, -1], [-1, 0]] },
            { name: '$x$축 위로의 정사영', M: [[1, 0], [0, 0]] },
            { name: '$y$축 위로의 정사영', M: [[0, 0], [0, 1]] },
            { name: '원점을 중심으로 2배 확대', M: [[2, 0], [0, 2]] },
          ];
          var a, b;
          do { a = R.nonzero(-5, 5); b = R.nonzero(-5, 5); } while (Math.abs(a) === Math.abs(b));
          var ti = R.int(0, T.length - 1);
          var img = function (M) { return [M[0][0] * a + M[0][1] * b, M[1][0] * a + M[1][1] * b]; };
          var t = T[ti], p = img(t.M);
          var correct = '$' + tup(p) + '$';
          var others = R.shuffle(T.filter(function (_, i) { return i !== ti; }));
          var reason = {};
          var cands = others.map(function (o) {
            var s = '$' + tup(img(o.M)) + '$';
            if (!(s in reason)) reason[s] = '이것은 ' + o.name + R.josa(o.name, '을/를') + ' 한 결과입니다. $\\mathbf{e}_1$, $\\mathbf{e}_2$가 어디로 가는지 다시 따라가 보세요.';
            return s;
          });
          var pick = R.choices(correct, cands);
          return {
            type: 'choice', concept: 2,
            q: '점 $' + tup([a, b]) + '$에 ' + t.name + R.josa(t.name, '을/를') + ' 한 점을 고르세요.',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (ch) { return ch === correct ? '' : reason[ch] || ''; }),
            explain: '이 변환의 표준행렬은 $' + mat(t.M) + '$입니다. $' + mat(t.M) + mat([[a], [b]]) + '=' + mat([[p[0]], [p[1]]]) + '$이므로 ' + correct + '입니다.',
          };
        },
      },
      {
        id: 'compose',
        level: 2,
        title: '합성변환의 표준행렬',
        make: function (R) {
          var A, B, AB, BA;
          var rnd = function () { return [[R.int(-2, 3), R.int(-2, 3)], [R.int(-2, 3), R.int(-2, 3)]]; };
          do {
            A = rnd(); B = rnd();
            AB = mul(A, B); BA = mul(B, A);
          } while (AB.join() === BA.join() || A.join() === B.join() || A.join() === '0,0,0,0' || B.join() === '0,0,0,0');
          var sFirst = R.bool();
          // sFirst: T 를 먼저 하고 S 를 나중에 (S∘T → BA), 아니면 T∘S → AB
          var good = sFirst ? BA : AB, rev = sFirst ? AB : BA;
          var sum = [[A[0][0] + B[0][0], A[0][1] + B[0][1]], [A[1][0] + B[1][0], A[1][1] + B[1][1]]];
          var had = [[A[0][0] * B[0][0], A[0][1] * B[0][1]], [A[1][0] * B[1][0], A[1][1] * B[1][1]]];
          var correct = '$' + mat(good) + '$';
          var cands = [
            ['$' + mat(rev) + '$', '곱하는 순서가 반대입니다. 먼저 하는 변환의 행렬이 오른쪽에 옵니다.'],
            ['$' + mat(had) + '$', '같은 자리의 성분끼리 곱했습니다. 행렬의 곱은 행과 열의 내적으로 계산합니다.'],
            ['$' + mat(sum) + '$', '합성은 행렬의 합이 아니라 곱입니다.'],
            ['$' + mat(transpose(good)) + '$', '곱은 맞지만 행과 열을 바꿔 적었습니다. $(i, j)$ 성분은 왼쪽 행렬의 $i$행과 오른쪽 행렬의 $j$열의 내적입니다.'],
          ];
          var reason = {};
          cands.forEach(function (k) { if (!(k[0] in reason)) reason[k[0]] = k[1]; });
          var pick = R.choices(correct, cands.map(function (k) { return k[0]; }));
          var name = sFirst ? 'S\\circ T' : 'T\\circ S';
          var order = sFirst ? '$T$를 먼저, $S$를 나중에' : '$S$를 먼저, $T$를 나중에';
          var prod = sFirst ? 'BA=' + mat(B) + mat(A) : 'AB=' + mat(A) + mat(B);
          return {
            type: 'choice', concept: 4,
            q: '$T(\\mathbf{x})=A\\mathbf{x}$, $S(\\mathbf{x})=B\\mathbf{x}$이고 $A=' + mat(A) + '$, $B=' + mat(B) + '$입니다. $' + name + '$의 표준행렬을 고르세요.',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (ch) { return ch === correct ? '' : reason[ch] || ''; }),
            explain: '$' + name + '$는 ' + order + ' 하므로 나중 변환의 행렬이 왼쪽에 옵니다. $' + prod + '=' + mat(good) + '$입니다.',
          };
        },
      },
      {
        id: 'inj-surj',
        level: 2,
        title: '단사·전사 판정',
        make: function (R) {
          var m = R.int(2, 3), n = R.int(2, 3);
          var r = R.int(1, Math.min(m, n));
          var A;
          do {
            var C = [];
            for (var i = 0; i < m; i++) { C.push([]); for (var k = 0; k < r; k++) C[i].push(R.int(-2, 2)); }
            var D = [];
            for (k = 0; k < r; k++) { D.push([]); for (var j = 0; j < n; j++) D[k].push(R.int(-2, 2)); }
            A = mul(C, D);
          } while (rank(R, A) !== r || A.some(function (row) { return row.every(function (x) { return x === 0; }); }) || A.some(function (row) { return row.some(function (x) { return Math.abs(x) > 9; }); }));
          var inj = r === n, sur = r === m;
          var labels = ['단사이고 전사이다', '단사이지만 전사는 아니다', '전사이지만 단사는 아니다', '단사도 전사도 아니다'];
          var ans = inj && sur ? 0 : inj ? 1 : sur ? 2 : 3;
          var injWhy = inj ? '' : '핵의 차원이 $' + n + '-' + r + '=' + (n - r) + '$이므로 핵에 영벡터가 아닌 벡터가 있습니다. 단사가 아닙니다.';
          var surWhy = sur ? '' : '치역의 차원은 ' + r + '뿐이라 $\\mathbf{R}^{' + m + '}$ 전체가 아닙니다. 전사가 아닙니다.';
          var why = [0, 1, 2, 3].map(function (i) {
            if (i === ans) return '';
            var wantInj = i === 0 || i === 1, wantSur = i === 0 || i === 2;
            if (wantInj !== inj) return inj ? '핵이 $\\{\\mathbf{0}\\}$이므로 단사입니다. 계수 ' + r + R.josa(r, '이/가') + ' 열의 개수와 같습니다.' : injWhy;
            return sur ? '계수 ' + r + R.josa(r, '이/가') + ' 행의 개수와 같아 치역이 $\\mathbf{R}^{' + m + '}$ 전체이므로 전사입니다.' : surWhy;
          });
          return {
            type: 'choice', fixed: true, concept: 3,
            q: '$T(\\mathbf{x})=A\\mathbf{x}$, $A=' + mat(A) + '$일 때 $T: \\mathbf{R}^{' + n + '} \\to \\mathbf{R}^{' + m + '}$에 대하여 옳은 것을 고르세요.',
            choices: labels,
            answer: ans,
            why: why,
            hint: '표준행렬의 계수를 구해 열의 개수, 행의 개수와 비교해 보세요.',
            explain: '행 소거를 하면 $\\operatorname{rank} A=' + r + '$입니다.\n\n' +
              (inj ? '- 계수가 열의 개수 ' + n + R.josa(n, '과/와') + ' 같아 핵이 $\\{\\mathbf{0}\\}$입니다 → 단사' : '- 핵의 차원은 $' + n + '-' + r + '=' + (n - r) + '$로 0이 아닙니다 → 단사가 아님') + '\n' +
              (sur ? '- 계수가 행의 개수 ' + m + R.josa(m, '과/와') + ' 같아 치역이 $\\mathbf{R}^{' + m + '}$ 전체입니다 → 전사' : '- 치역의 차원 ' + r + R.josa(r, '은/는') + ' 행의 개수 ' + m + '보다 작습니다 → 전사가 아님') + '\n\n' +
              '그래서 "' + labels[ans] + '"입니다.',
          };
        },
      },
    ],
  });
})();
