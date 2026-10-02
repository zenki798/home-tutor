/* 공통수학2 · 도형의 이동
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy) */
(function () {
  // 생성기 도우미 (난수를 쓰지 않는 순수 함수만)
  function par(n) { return n < 0 ? '(' + n + ')' : String(n); }
  // n = k^2 * m
  function rad(n) {
    var k = 1, m = n, f = 2;
    while (f * f <= m) {
      while (m % (f * f) === 0) { m /= f * f; k *= f; }
      f++;
    }
    return { k: k, m: m };
  }
  function radTex(n) {
    var r = rad(n);
    if (r.m === 1) return String(r.k);
    return (r.k === 1 ? '' : r.k) + '\\sqrt{' + r.m + '}';
  }
  function radExpr(n) {
    var r = rad(n);
    if (r.m === 1) return String(r.k);
    return (r.k === 1 ? '' : r.k) + '√' + r.m;
  }
  function pt(x, y) { return '$(' + x + ', ' + y + ')$'; }
  // x-a 꼴 TeX (a 는 정수): a>0 → x-a, a<0 → x+|a|
  function shift(v, a) { return a === 0 ? v : v + (a > 0 ? '-' + a : '+' + (-a)); }
  // 정답 칸의 식: y=Mx+N 의 오른쪽 (정수 계수)
  function lineExpr(m, n) {
    var s = m === 1 ? 'x' : m === -1 ? '-x' : m + 'x';
    if (n !== 0) s += (n > 0 ? '+' : '') + n;
    return s;
  }

  Tutor.registerUnit({
    id: 'math-h-c2-04',
    course: 'math-h-c2',
    title: '도형의 이동',
    summary: '점과 도형을 평행이동하고, x축·y축·원점·직선 y=x에 대해 대칭이동한 도형의 방정식을 구합니다.',
    goals: [
      '점과 도형을 평행이동한 결과를 구할 수 있다.',
      '$x$축, $y$축, 원점에 대하여 점과 도형을 대칭이동할 수 있다.',
      '직선 $y=x$에 대하여 점과 도형을 대칭이동할 수 있다.',
      '대칭이동을 이용하여 최단 거리 문제를 해결할 수 있다.',
    ],
    standards: ['[10공수2-01-06]', '[10공수2-01-07]'],

    concepts: [
      {
        title: '점의 평행이동',
        body: '도형을 일정한 방향으로 일정한 거리만큼 옮기는 것을 **평행이동**이라고 합니다.\n\n점 $\\mathrm{P}(x, y)$를 $x$축의 방향으로 $a$만큼, $y$축의 방향으로 $b$만큼 평행이동한 점은\n\n$\\mathrm{P}\'(x+a, y+b)$\n\n이 평행이동을 기호로 $(x, y)\\to(x+a, y+b)$와 같이 나타냅니다. $a$가 음수이면 왼쪽으로, $b$가 음수이면 아래쪽으로 옮기는 것입니다.\n\n예: 점 $(1, 2)$를 $x$축의 방향으로 3만큼, $y$축의 방향으로 $-1$만큼 평행이동하면 $(1+3, 2-1)=(4, 1)$입니다.\n\n> 💡 평행이동해도 도형의 모양과 크기는 변하지 않습니다. 두 점 사이의 거리도 그대로입니다.',
        easy: '보드게임 말을 "오른쪽으로 3칸, 아래로 1칸" 옮기는 것과 같습니다. 오른쪽으로 3칸이면 $x$좌표에 3을 더하고, 아래로 1칸이면 $y$좌표에서 1을 뺍니다.\n\n$(1, 2)$에서 출발하면 $(4, 1)$에 도착합니다.',
        fig: {
          type: 'coord', xmin: -1, xmax: 5, ymin: -1, ymax: 4,
          points: [{ x: 1, y: 2, label: 'P(1, 2)' }, { x: 4, y: 1, label: "P'(4, 1)" }],
          segments: [{ from: [1, 2], to: [4, 2], dashed: true }, { from: [4, 2], to: [4, 1], dashed: true }],
          alt: "점 P(1, 2)를 오른쪽으로 3만큼, 아래로 1만큼 옮긴 점 P'(4, 1)",
        },
        check: {
          type: 'choice',
          q: '점 $(2, -1)$을 $x$축의 방향으로 $-3$만큼, $y$축의 방향으로 $4$만큼 평행이동한 점의 좌표는 무엇입니까?',
          choices: ['$(-1, 3)$', '$(5, -5)$', '$(-3, 4)$'],
          answer: 0,
          why: ['', '이동한 양을 더하지 않고 뺐습니다. 점의 평행이동은 $(x+a, y+b)$입니다.', '이동한 양 $(-3, 4)$를 그대로 썼습니다. 원래 좌표에 더해야 합니다.'],
          explain: '$(2+(-3), -1+4)=(-1, 3)$입니다.',
        },
      },
      {
        title: '도형의 평행이동',
        body: '방정식 $f(x, y)=0$이 나타내는 도형을 $x$축의 방향으로 $a$만큼, $y$축의 방향으로 $b$만큼 평행이동한 도형의 방정식은\n\n$f(x-a, y-b)=0$\n\n**이유**: 옮긴 도형 위의 점을 $(X, Y)$라 하면, 이 점은 원래 도형 위의 점 $(X-a, Y-b)$를 옮겨 온 것입니다. 그래서 $f(X-a, Y-b)=0$이 성립하고, $X$, $Y$를 다시 $x$, $y$로 쓰면 위 식이 됩니다. 점은 **더하고**, 방정식에서는 **빼는** 까닭입니다.\n\n예: 직선 $y=2x+1$을 $x$축의 방향으로 1만큼, $y$축의 방향으로 3만큼 평행이동하면\n$y-3=2(x-1)+1$, 곧 $y=2x+2$입니다.\n\n예: 같은 평행이동으로 원 $x^2+y^2=4$의 중심 $(0, 0)$은 $(1, 3)$으로 옮겨지고, 옮긴 원의 방정식은 $(x-1)^2+(y-3)^2=4$입니다. 반지름은 그대로입니다.',
        easy: '포물선 $y=x^2$의 꼭짓점 $(0, 0)$을 오른쪽으로 1, 위로 2만큼 옮기면 꼭짓점은 $(1, 2)$가 됩니다. 꼭짓점이 $(1, 2)$인 포물선은 중학교에서 배운 대로 $y=(x-1)^2+2$, 곧 $y-2=(x-1)^2$이지요.\n\n원래 식 $y=x^2$에서 $x$ 자리에 $x-1$, $y$ 자리에 $y-2$를 넣은 모양입니다. 오른쪽으로 옮겼는데 $x-1$이 되는 것이 처음엔 어색하지만, 꼭짓점 공식을 떠올리면 자연스럽습니다.',
        fig: {
          type: 'coord', xmin: -3, xmax: 4, ymin: -1, ymax: 6,
          fns: [{ expr: 'x^2', label: 'y=x²' }, { expr: '(x-1)^2+2', label: 'y-2=(x-1)²' }],
          alt: '포물선 y=x²과, 이를 오른쪽으로 1만큼 위로 2만큼 평행이동한 포물선 y-2=(x-1)²',
        },
        check: {
          type: 'ox',
          q: '직선 $y=2x$를 $x$축의 방향으로 3만큼 평행이동한 직선의 방정식은 $y=2(x+3)$입니다.',
          answer: false,
          explain: '도형을 옮길 때는 $x$ 대신 $x-3$을 넣습니다. $y=2(x-3)$, 곧 $y=2x-6$입니다. (확인: 원점 $(0, 0)$이 옮겨진 점 $(3, 0)$이 $y=2(x-3)$ 위에 있습니다.)',
        },
      },
      {
        title: '$x$축, $y$축, 원점에 대한 대칭이동',
        body: '도형을 한 직선이나 한 점에 대하여 대칭인 도형으로 옮기는 것을 **대칭이동**이라고 합니다.\n\n| 대칭의 기준 | 점 $(x, y)$가 옮겨지는 점 | 도형 $f(x, y)=0$이 옮겨진 도형 |\n|---|---|---|\n| $x$축 | $(x, -y)$ | $f(x, -y)=0$ |\n| $y$축 | $(-x, y)$ | $f(-x, y)=0$ |\n| 원점 | $(-x, -y)$ | $f(-x, -y)=0$ |\n\n**이유**: $x$축에 대하여 대칭이면 $x$축이 두 점을 잇는 선분을 수직이등분하므로 $x$좌표는 같고 $y$좌표의 부호만 바뀝니다. 도형의 경우 옮긴 도형 위의 점 $(x, y)$는 원래 도형 위의 점 $(x, -y)$에서 왔으므로 $f(x, -y)=0$입니다.\n\n예: 직선 $y=2x+1$을 $x$축에 대하여 대칭이동하면 $-y=2x+1$, 곧 $y=-2x-1$입니다.\n\n> 💡 원점에 대한 대칭이동은 $x$축 대칭과 $y$축 대칭을 차례로 한 것과 같습니다.',
        easy: '$x$축을 거울이라고 생각해 보세요. 거울 위의 점 $(3, 2)$는 거울 속에서 $(3, -2)$로 보입니다. 가로 위치는 그대로, 높이만 반대가 됩니다.\n\n$y$축이 거울이면 높이는 그대로, 가로 위치만 반대가 되어 $(-3, 2)$입니다. 원점 대칭은 둘 다 반대가 되어 $(-3, -2)$입니다.',
        fig: {
          type: 'coord', xmin: -4, xmax: 4, ymin: -3, ymax: 3,
          points: [{ x: 3, y: 2, label: 'P(3, 2)' }, { x: 3, y: -2, label: 'x축 대칭' }, { x: -3, y: 2, label: 'y축 대칭' }, { x: -3, y: -2, label: '원점 대칭' }],
          segments: [{ from: [3, 2], to: [3, -2], dashed: true }, { from: [3, 2], to: [-3, 2], dashed: true }, { from: [3, 2], to: [-3, -2], dashed: true }],
          alt: '점 P(3, 2)와 그 점을 x축, y축, 원점에 대하여 대칭이동한 세 점',
        },
        check: {
          type: 'choice',
          q: '점 $(4, -1)$을 원점에 대하여 대칭이동한 점의 좌표는 무엇입니까?',
          choices: ['$(-4, 1)$', '$(4, 1)$', '$(-4, -1)$'],
          answer: 0,
          why: ['', '$x$축에 대한 대칭이동입니다. 원점 대칭은 두 좌표의 부호를 모두 바꿉니다.', '$y$축에 대한 대칭이동입니다. 원점 대칭은 두 좌표의 부호를 모두 바꿉니다.'],
          explain: '원점에 대하여 대칭이동하면 $(x, y)\\to(-x, -y)$이므로 $(-4, 1)$입니다.',
        },
      },
      {
        title: '직선 $y=x$에 대한 대칭이동',
        body: '점 $(x, y)$를 직선 $y=x$에 대하여 대칭이동한 점은 $x$좌표와 $y$좌표를 바꾼 $(y, x)$입니다. 도형 $f(x, y)=0$을 직선 $y=x$에 대하여 대칭이동한 도형은\n\n$f(y, x)=0$\n\n**이유**: 두 점 $\\mathrm{P}(a, b)$, $\\mathrm{Q}(b, a)$에 대하여 선분 $\\mathrm{PQ}$의 중점 $\\left(\\frac{a+b}{2}, \\frac{a+b}{2}\\right)$는 직선 $y=x$ 위에 있고, 직선 $\\mathrm{PQ}$의 기울기는 $\\frac{a-b}{b-a}=-1$이므로 $y=x$에 수직입니다. 곧 직선 $y=x$가 선분 $\\mathrm{PQ}$를 수직이등분합니다.\n\n예: 직선 $y=2x+4$를 직선 $y=x$에 대하여 대칭이동하면 $x=2y+4$, 곧 $y=\\frac{1}{2}x-2$입니다.\n\n> 💡 직선 $y=-x$에 대한 대칭이동은 $(x, y)\\to(-y, -x)$, 도형은 $f(-y, -x)=0$입니다.',
        easy: '직선 $y=x$를 따라 종이를 접는다고 생각해 보세요. 점 $(4, 1)$은 접힌 쪽의 $(1, 4)$와 겹칩니다. 가로와 세로가 서로 바뀌는 것입니다.\n\n그래서 도형의 방정식에서도 $x$와 $y$를 서로 바꾸어 쓰면 됩니다. $y=2x+4$는 $x=2y+4$가 됩니다.',
        fig: {
          type: 'coord', xmin: -1, xmax: 5, ymin: -1, ymax: 5,
          points: [{ x: 4, y: 1, label: 'P(4, 1)' }, { x: 1, y: 4, label: "P'(1, 4)" }],
          fns: [{ expr: 'x', label: 'y=x' }],
          segments: [{ from: [4, 1], to: [1, 4], dashed: true }],
          alt: "점 P(4, 1)과 직선 y=x에 대하여 대칭인 점 P'(1, 4). 두 점을 잇는 점선은 y=x에 수직",
        },
        check: {
          type: 'choice',
          q: '직선 $y=2x+4$를 직선 $y=x$에 대하여 대칭이동한 직선의 방정식은 무엇입니까?',
          choices: ['$y=\\frac{1}{2}x-2$', '$y=-2x+4$', '$y=2x-4$'],
          answer: 0,
          why: ['', '$y$축에 대하여 대칭이동했습니다. 직선 $y=x$에 대한 대칭은 $x$와 $y$를 바꿉니다.', '원점에 대하여 대칭이동했습니다. 직선 $y=x$에 대한 대칭은 $x$와 $y$를 바꿉니다.'],
          explain: '$x$와 $y$를 바꾸면 $x=2y+4$이고, $y$에 대하여 풀면 $y=\\frac{1}{2}x-2$입니다.',
        },
      },
      {
        title: '대칭이동을 이용한 최단 거리',
        body: '두 점 $\\mathrm{A}$, $\\mathrm{B}$가 직선 $l$의 같은 쪽에 있을 때, $l$ 위의 점 $\\mathrm{P}$에 대하여 $\\overline{\\mathrm{AP}}+\\overline{\\mathrm{PB}}$의 최솟값을 구해 봅니다.\n\n점 $\\mathrm{A}$를 직선 $l$에 대하여 대칭이동한 점을 $\\mathrm{A}\'$이라 하면 $\\overline{\\mathrm{AP}}=\\overline{\\mathrm{A\'P}}$이므로\n\n$\\overline{\\mathrm{AP}}+\\overline{\\mathrm{PB}}=\\overline{\\mathrm{A\'P}}+\\overline{\\mathrm{PB}}\\ge\\overline{\\mathrm{A\'B}}$\n\n꺾인 길은 곧은 선분보다 짧을 수 없으므로, $\\mathrm{P}$가 선분 $\\mathrm{A\'B}$와 직선 $l$의 교점일 때 최솟값 $\\overline{\\mathrm{A\'B}}$를 갖습니다.\n\n예: $\\mathrm{A}(1, 2)$, $\\mathrm{B}(5, 4)$와 $x$축 위의 점 $\\mathrm{P}$에서 $\\mathrm{A}\'(1, -2)$이므로 최솟값은 $\\overline{\\mathrm{A\'B}}=\\sqrt{4^2+6^2}=2\\sqrt{13}$입니다.\n\n> ⚠️ 두 점이 직선의 **반대쪽**에 있으면 대칭이동할 필요 없이 최솟값은 $\\overline{\\mathrm{AB}}$입니다.',
        easy: '강가(직선)에 들러 물을 떠서 집(B)으로 가는 가장 짧은 길을 찾는 문제입니다. 출발점 A를 강 건너편 거울 속 위치 A\'으로 옮겨 놓으면, A에서 강까지 가는 길이와 A\'에서 강까지 가는 길이가 같습니다.\n\n그러면 문제는 "A\'에서 B까지 강을 건너 가장 짧게 가기"가 되고, 답은 곧은 선분 A\'B입니다.',
        fig: {
          type: 'coord', xmin: -1, xmax: 6, ymin: -3, ymax: 5,
          points: [{ x: 1, y: 2, label: 'A' }, { x: 5, y: 4, label: 'B' }, { x: 1, y: -2, label: "A'" }],
          segments: [{ from: [1, -2], to: [5, 4], dashed: true }, { from: [1, 2], to: [2.333, 0] }, { from: [2.333, 0], to: [5, 4] }, { from: [1, 2], to: [1, -2], dashed: true }],
          alt: "점 A(1, 2), B(5, 4)와 A를 x축에 대하여 대칭이동한 A'(1, -2). 선분 A'B가 x축과 만나는 점을 지나는 꺾인 길",
        },
        check: {
          type: 'choice',
          q: '$x$축 위의 점 $\\mathrm{P}$와 두 점 $\\mathrm{A}(1, 3)$, $\\mathrm{B}(4, 1)$에 대하여 $\\overline{\\mathrm{AP}}+\\overline{\\mathrm{PB}}$의 최솟값을 구하려고 합니다. 점 $\\mathrm{A}$를 어디로 옮겨 생각하면 됩니까?',
          choices: ['$(1, -3)$', '$(-1, 3)$', '$(3, 1)$'],
          answer: 0,
          why: ['', '$y$축에 대하여 대칭이동했습니다. 점 $\\mathrm{P}$가 $x$축 위에 있으므로 $x$축에 대하여 대칭이동합니다.', '직선 $y=x$에 대하여 대칭이동했습니다. 점 $\\mathrm{P}$가 놓인 $x$축에 대하여 대칭이동합니다.'],
          explain: '$\\mathrm{P}$가 $x$축 위에 있으므로 $\\mathrm{A}$를 $x$축에 대하여 대칭이동한 $(1, -3)$을 씁니다. 최솟값은 $(1, -3)$과 $\\mathrm{B}(4, 1)$ 사이의 거리 $\\sqrt{9+16}=5$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '직선 $x-2y+3=0$을 평행이동 $(x, y)\\to(x+1, y-2)$에 의하여 옮긴 직선의 방정식을 구하세요.',
        steps: [
          '$x$축의 방향으로 1만큼, $y$축의 방향으로 $-2$만큼 옮기는 평행이동입니다.',
          '도형을 옮길 때는 $x$ 대신 $x-1$, $y$ 대신 $y-(-2)=y+2$를 넣습니다.',
          '$(x-1)-2(y+2)+3=0$을 정리하면 $x-2y-2=0$입니다.',
          '확인: 원래 직선 위의 점 $(-3, 0)$을 옮긴 점 $(-2, -2)$를 넣으면 $-2+4-2=0$으로 맞습니다.',
        ],
        answer: '$x-2y-2=0$',
      },
      {
        q: '다음 원을 직선 $y=x$에 대하여 대칭이동한 원의 방정식을 구하세요.\n\n$(x-3)^2+(y+1)^2=4$',
        steps: [
          '직선 $y=x$에 대한 대칭이동이므로 $x$와 $y$를 서로 바꿉니다. $(y-3)^2+(x+1)^2=4$',
          '보기 좋게 순서를 바꾸면 $(x+1)^2+(y-3)^2=4$입니다.',
          '확인: 원래 원의 중심 $(3, -1)$을 대칭이동하면 $(-1, 3)$이고, 반지름 2는 그대로입니다.',
        ],
        answer: '$(x+1)^2+(y-3)^2=4$',
      },
      {
        q: '$x$축 위의 점 $\\mathrm{P}$와 두 점 $\\mathrm{A}(1, 2)$, $\\mathrm{B}(5, 4)$에 대하여 $\\overline{\\mathrm{AP}}+\\overline{\\mathrm{PB}}$의 최솟값과 그때의 점 $\\mathrm{P}$의 좌표를 구하세요.',
        steps: [
          '두 점 모두 $x$축 위쪽에 있으므로 $\\mathrm{A}$를 $x$축에 대하여 대칭이동한 $\\mathrm{A}\'(1, -2)$를 생각합니다.',
          '$\\overline{\\mathrm{AP}}+\\overline{\\mathrm{PB}}=\\overline{\\mathrm{A\'P}}+\\overline{\\mathrm{PB}}\\ge\\overline{\\mathrm{A\'B}}=\\sqrt{(5-1)^2+(4+2)^2}=\\sqrt{52}=2\\sqrt{13}$',
          '등호는 $\\mathrm{P}$가 직선 $\\mathrm{A\'B}$ 위에 있을 때입니다. 직선 $\\mathrm{A\'B}$는 기울기가 $\\frac{6}{4}=\\frac{3}{2}$이므로 $y+2=\\frac{3}{2}(x-1)$입니다.',
          '$y=0$을 넣으면 $x-1=\\frac{4}{3}$, $x=\\frac{7}{3}$이므로 $\\mathrm{P}\\left(\\frac{7}{3}, 0\\right)$입니다.',
        ],
        answer: '최솟값 $2\\sqrt{13}$, $\\mathrm{P}\\left(\\frac{7}{3}, 0\\right)$',
      },
    ],

    terms: [
      { term: '평행이동', def: '도형의 모든 점을 같은 방향으로 같은 거리만큼 옮기는 것입니다. $(x, y)\\to(x+a, y+b)$' },
      { term: '대칭이동', def: '도형을 한 점이나 한 직선에 대하여 대칭인 도형으로 옮기는 것입니다.' },
      { term: 'x축에 대한 대칭이동', def: '점 $(x, y)$를 $(x, -y)$로 옮기는 것입니다. 도형 $f(x, y)=0$은 $f(x, -y)=0$이 됩니다.' },
      { term: 'y축에 대한 대칭이동', def: '점 $(x, y)$를 $(-x, y)$로 옮기는 것입니다. 도형 $f(x, y)=0$은 $f(-x, y)=0$이 됩니다.' },
      { term: '원점에 대한 대칭이동', def: '점 $(x, y)$를 $(-x, -y)$로 옮기는 것입니다. 도형 $f(x, y)=0$은 $f(-x, -y)=0$이 됩니다.' },
      { term: '직선 y=x에 대한 대칭이동', def: '점 $(x, y)$를 $(y, x)$로 옮기는 것입니다. 도형 $f(x, y)=0$은 $f(y, x)=0$이 됩니다.' },
      { term: '수직이등분선', def: '선분의 중점을 지나고 그 선분에 수직인 직선입니다. 대칭인 두 점을 잇는 선분의 수직이등분선이 대칭축입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '평행이동 $(x, y)\\to(x+2, y-3)$에 의하여 점 $(a, b)$가 점 $(1, 4)$로 옮겨질 때, $a+b$의 값을 구하세요.',
        answer: '6',
        hint: '옮겨진 점에서 거꾸로 이동하면 처음 점이 나옵니다.',
        wrong: [{ a: '4', why: '점 $(1, 4)$를 한 번 더 옮겼습니다. $(1, 4)$는 옮겨진 뒤의 점이므로 거꾸로 $x$좌표에서 2를 빼고 $y$좌표에 3을 더합니다.' }],
        explain: '$a+2=1$, $b-3=4$이므로 $a=-1$, $b=7$입니다. $a+b=6$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'expr', concept: 1,
        q: '직선 $y=-x+3$을 $x$축의 방향으로 2만큼, $y$축의 방향으로 $-1$만큼 평행이동한 직선의 방정식을 구하세요. ($y=ax+b$ 꼴로 입력합니다.)',
        answer: '-x+4',
        wrong: [{ a: '-x+2', why: '$x$ 대신 $x+2$, $y$ 대신 $y-1$을 넣었습니다. 도형을 옮길 때는 $x$ 대신 $x-2$, $y$ 대신 $y+1$을 넣습니다.' }],
        explain: '$x$ 대신 $x-2$, $y$ 대신 $y-(-1)=y+1$을 넣으면 $y+1=-(x-2)+3$이므로 $y=-x+4$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '다음 원을 $x$축의 방향으로 $-3$만큼, $y$축의 방향으로 2만큼 평행이동한 원의 방정식은 무엇입니까?\n\n$(x-1)^2+(y+2)^2=4$',
        choices: ['$(x+2)^2+y^2=4$', '$(x-4)^2+(y+4)^2=4$', '$(x-2)^2+y^2=4$'],
        answer: 0,
        why: [
          '',
          '반대 방향으로 옮겼습니다. 중심 $(1, -2)$를 옮기면 $(1-3, -2+2)=(-2, 0)$입니다.',
          '중심의 $x$좌표를 $1+3$이 아니라 $1-3=-2$로 해야 합니다. $(x+2)^2$입니다.',
        ],
        explain: '중심 $(1, -2)$가 $(1-3, -2+2)=(-2, 0)$으로 옮겨지고 반지름 2는 그대로이므로 $(x+2)^2+y^2=4$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 2,
        q: '점 $(-3, 5)$를 $x$축에 대하여 대칭이동한 점의 좌표는 무엇입니까?',
        choices: ['$(-3, -5)$', '$(3, 5)$', '$(3, -5)$', '$(5, -3)$'],
        answer: 0,
        why: [
          '',
          '$y$축에 대하여 대칭이동했습니다. $x$축 대칭은 $y$좌표의 부호를 바꿉니다.',
          '원점에 대하여 대칭이동했습니다. $x$축 대칭은 $y$좌표의 부호만 바꿉니다.',
          '좌표를 바꾸어 썼습니다. $x$축 대칭은 $(x, y)\\to(x, -y)$입니다.',
        ],
        explain: '$x$축에 대하여 대칭이동하면 $(x, y)\\to(x, -y)$이므로 $(-3, -5)$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'ox', concept: 2,
        q: '원 $(x-2)^2+(y+1)^2=9$의 그래프를 $y$축에 대하여 대칭이동한 원의 방정식은 $(x+2)^2+(y+1)^2=9$입니다.',
        answer: true,
        explain: '$x$ 대신 $-x$를 넣으면 $(-x-2)^2+(y+1)^2=9$이고, $(-x-2)^2=(x+2)^2$이므로 맞습니다. 중심 $(2, -1)$이 $(-2, -1)$로 옮겨졌습니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 2,
        q: '직선 $y=3x-2$를 원점에 대하여 대칭이동한 직선의 방정식은 무엇입니까?',
        choices: ['$y=3x+2$', '$y=-3x+2$', '$y=-3x-2$', '$y=\\frac{1}{3}x+\\frac{2}{3}$'],
        answer: 0,
        why: [
          '',
          '$x$축에 대하여 대칭이동했습니다($y$ 대신 $-y$만 넣음).',
          '$y$축에 대하여 대칭이동했습니다($x$ 대신 $-x$만 넣음).',
          '직선 $y=x$에 대하여 대칭이동했습니다.',
        ],
        explain: '$x$ 대신 $-x$, $y$ 대신 $-y$를 넣으면 $-y=-3x-2$, 곧 $y=3x+2$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '점 $(2, -5)$를 직선 $y=x$에 대하여 대칭이동한 점의 좌표는 무엇입니까?',
        choices: ['$(-5, 2)$', '$(5, -2)$', '$(-2, 5)$', '$(2, 5)$'],
        answer: 0,
        why: [
          '',
          '직선 $y=-x$에 대한 대칭이동입니다. 직선 $y=x$에 대하여는 좌표를 바꾸기만 합니다.',
          '원점에 대한 대칭이동입니다.',
          '$x$축에 대한 대칭이동입니다.',
        ],
        explain: '직선 $y=x$에 대하여 대칭이동하면 $(x, y)\\to(y, x)$이므로 $(-5, 2)$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 0,
        q: '점 $(2, 5)$를 점 $(-1, 3)$으로 옮기는 평행이동에 의하여 점 $(4, 0)$이 옮겨지는 점의 좌표는 무엇입니까?',
        choices: ['$(1, -2)$', '$(7, 2)$', '$(-3, -2)$', '$(1, 2)$'],
        answer: 0,
        why: [
          '',
          '이동한 양의 부호를 반대로 썼습니다. $x$축의 방향으로 $-1-2=-3$, $y$축의 방향으로 $3-5=-2$만큼 옮깁니다.',
          '이동한 양만 썼습니다. 점 $(4, 0)$에 이동한 양을 더해야 합니다.',
          '$y$축의 방향으로 이동한 양의 부호를 반대로 썼습니다. $3-5=-2$입니다.',
        ],
        hint: '먼저 $x$축, $y$축의 방향으로 각각 얼마만큼 옮기는 평행이동인지 구하세요.',
        explain: '$(2, 5)\\to(-1, 3)$이므로 $x$축의 방향으로 $-3$만큼, $y$축의 방향으로 $-2$만큼 옮기는 평행이동입니다. 점 $(4, 0)$은 $(4-3, 0-2)=(1, -2)$로 옮겨집니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 3,
        q: '원 $x^2+y^2-4x+2y=0$을 직선 $y=x$에 대하여 대칭이동한 원의 중심의 좌표는 무엇입니까?',
        choices: ['$(-1, 2)$', '$(2, -1)$', '$(1, -2)$', '$(-2, 1)$'],
        answer: 0,
        why: [
          '',
          '대칭이동하기 전 원의 중심입니다.',
          '직선 $y=-x$에 대한 대칭이동입니다.',
          '원점에 대한 대칭이동입니다.',
        ],
        hint: '원래 원의 중심을 먼저 구하고, 그 점을 대칭이동하세요.',
        explain: '$(x-2)^2+(y+1)^2=5$이므로 원래 중심은 $(2, -1)$입니다. 직선 $y=x$에 대하여 대칭이동하면 $(-1, 2)$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 1,
        q: '직선 $y=2x+k$를 $x$축의 방향으로 1만큼, $y$축의 방향으로 $-2$만큼 평행이동한 직선이 점 $(3, 5)$를 지날 때, 상수 $k$의 값을 구하세요.',
        answer: '3',
        hint: '옮긴 직선의 방정식을 먼저 세운 뒤 점의 좌표를 넣으세요.',
        wrong: [{ a: '-5', why: '$x$ 대신 $x+1$, $y$ 대신 $y-2$를 넣었습니다. 도형을 옮길 때는 $x-1$, $y+2$를 넣습니다.' }],
        explain: '옮긴 직선은 $y+2=2(x-1)+k$입니다. $(3, 5)$를 넣으면 $7=4+k$이므로 $k=3$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'expr', concept: 4,
        q: '$x$축 위의 점 $\\mathrm{P}$와 두 점 $\\mathrm{A}(2, 3)$, $\\mathrm{B}(6, 1)$에 대하여 $\\overline{\\mathrm{AP}}+\\overline{\\mathrm{PB}}$의 최솟값을 구하세요. (근호는 √ 또는 sqrt로 입력합니다.)',
        answer: '4√2',
        hint: '점 $\\mathrm{A}$를 $x$축에 대하여 대칭이동해 보세요.',
        wrong: [{ a: '2√5', why: '선분 $\\mathrm{AB}$의 길이를 구했습니다. $\\mathrm{P}$는 $x$축 위에 있어야 하므로 꺾인 길이가 됩니다. $\\mathrm{A}$를 $x$축에 대하여 대칭이동한 점을 쓰세요.' }],
        explain: '$\\mathrm{A}\'(2, -3)$이라 하면 최솟값은 $\\overline{\\mathrm{A\'B}}=\\sqrt{(6-2)^2+(1+3)^2}=\\sqrt{32}=4\\sqrt{2}$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 3,
        q: '점 $\\mathrm{P}$를 $x$축의 방향으로 $-1$만큼, $y$축의 방향으로 2만큼 평행이동한 뒤, 직선 $y=x$에 대하여 대칭이동하였더니 점 $(3, 4)$가 되었습니다. 점 $\\mathrm{P}$의 좌표는 무엇입니까?',
        choices: ['$(5, 1)$', '$(4, 2)$', '$(3, 5)$', '$(2, 4)$'],
        answer: 0,
        why: [
          '',
          '대칭이동을 되돌리는 것을 빠뜨렸습니다. 먼저 $(3, 4)$를 $(4, 3)$으로 되돌립니다.',
          '평행이동을 되돌릴 때 부호를 반대로 했습니다. $x$좌표에 1을 더하고 $y$좌표에서 2를 뺍니다.',
          '되돌리는 순서가 바뀌었습니다. 마지막에 한 대칭이동부터 먼저 되돌립니다.',
        ],
        hint: '마지막 단계부터 거꾸로 되돌리세요.',
        explain: '대칭이동을 되돌리면 $(3, 4)\\to(4, 3)$, 평행이동을 되돌리면 $(4+1, 3-2)=(5, 1)$입니다. (확인: $(5, 1)\\to(4, 3)\\to(3, 4)$)',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'expr', concept: 4,
        q: '직선 $y=x$ 위의 점 $\\mathrm{P}$와 두 점 $\\mathrm{A}(1, 3)$, $\\mathrm{B}(3, 6)$에 대하여 $\\overline{\\mathrm{AP}}+\\overline{\\mathrm{PB}}$의 최솟값을 구하세요.',
        fig: {
          type: 'coord', xmin: -1, xmax: 7, ymin: -1, ymax: 7,
          points: [{ x: 1, y: 3, label: 'A' }, { x: 3, y: 6, label: 'B' }],
          fns: [{ expr: 'x', label: 'y=x' }],
          alt: '직선 y=x와 그 위쪽에 있는 두 점 A(1, 3), B(3, 6)',
        },
        answer: '5',
        hint: '두 점이 직선 $y=x$의 같은 쪽에 있는지 먼저 확인하고, 한 점을 $y=x$에 대하여 대칭이동하세요.',
        wrong: [{ a: '√13', why: '선분 $\\mathrm{AB}$의 길이를 구했습니다. 두 점이 직선 $y=x$의 같은 쪽에 있으므로 대칭이동을 써야 합니다.' }],
        explain: '두 점 모두 $y>x$인 쪽에 있습니다. $\\mathrm{A}$를 직선 $y=x$에 대하여 대칭이동하면 $\\mathrm{A}\'(3, 1)$이고, 최솟값은 $\\overline{\\mathrm{A\'B}}=\\sqrt{(3-3)^2+(6-1)^2}=5$입니다. 이때 $\\mathrm{P}$는 직선 $x=3$과 $y=x$의 교점 $(3, 3)$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'expr', concept: 4,
        q: '두 점 $\\mathrm{A}(1, 3)$, $\\mathrm{B}(4, 1)$이 있습니다. 점 $\\mathrm{A}$에서 출발하여 $y$축 위의 점 $\\mathrm{P}$, $x$축 위의 점 $\\mathrm{Q}$를 차례로 거쳐 점 $\\mathrm{B}$까지 가는 경로의 길이 $\\overline{\\mathrm{AP}}+\\overline{\\mathrm{PQ}}+\\overline{\\mathrm{QB}}$의 최솟값을 구하세요. (근호는 √ 또는 sqrt로 입력합니다.)',
        answer: '√41',
        hint: '$\\mathrm{A}$는 $y$축에 대하여, $\\mathrm{B}$는 $x$축에 대하여 대칭이동해 보세요.',
        wrong: [
          { a: '√29', why: '한 점만 대칭이동했습니다. 꺾이는 곳이 두 군데이므로 $\\mathrm{A}$와 $\\mathrm{B}$를 모두 대칭이동합니다.' },
          { a: '√13', why: '선분 $\\mathrm{AB}$의 길이를 구했습니다. 두 축을 거쳐야 합니다.' },
        ],
        explain: '$\\mathrm{A}$를 $y$축에 대하여 대칭이동한 점은 $\\mathrm{A}\'(-1, 3)$, $\\mathrm{B}$를 $x$축에 대하여 대칭이동한 점은 $\\mathrm{B}\'(4, -1)$입니다. $\\overline{\\mathrm{AP}}=\\overline{\\mathrm{A\'P}}$, $\\overline{\\mathrm{QB}}=\\overline{\\mathrm{QB\'}}$이므로\n\n$\\overline{\\mathrm{AP}}+\\overline{\\mathrm{PQ}}+\\overline{\\mathrm{QB}}\\ge\\overline{\\mathrm{A\'B\'}}=\\sqrt{5^2+4^2}=\\sqrt{41}$\n\n선분 $\\mathrm{A\'B\'}$은 $y$축과 점 $\\left(0, \\frac{11}{5}\\right)$에서, $x$축과 점 $\\left(\\frac{11}{4}, 0\\right)$에서 차례로 만나므로 등호가 성립합니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 1,
        q: '평행이동 $(x, y)\\to(x+m, y+n)$에 의하여 원 $x^2+y^2-2x+4y=0$이 원 $x^2+y^2+6x-2y+k=0$으로 옮겨질 때, $m+n+k$의 값을 구하세요.',
        answer: '4',
        hint: '평행이동하면 중심은 옮겨지고 반지름은 그대로입니다.',
        wrong: [
          { a: '-1', why: '$m+n$만 구했습니다. 반지름이 같다는 조건으로 $k$도 구해 더합니다.' },
          { a: '6', why: '$m$, $n$의 부호를 반대로 구했습니다. 옮긴 뒤의 중심에서 옮기기 전의 중심을 뺍니다.' },
        ],
        explain: '처음 원의 방정식은 $(x-1)^2+(y+2)^2=5$이므로 중심은 $(1, -2)$, 반지름의 제곱은 5입니다. 옮긴 원은 $(x+3)^2+(y-1)^2=10-k$로 중심 $(-3, 1)$입니다.\n\n중심이 $(1, -2)\\to(-3, 1)$이므로 $m=-4$, $n=3$이고, 반지름이 같으므로 $10-k=5$, $k=5$입니다. 따라서 $m+n+k=4$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 2,
        q: '직선 $y=ax+b$를 $x$축의 방향으로 2만큼, $y$축의 방향으로 $-3$만큼 평행이동한 뒤 $y$축에 대하여 대칭이동하였더니 직선 $y=-2x+1$이 되었습니다. $a+b$의 값을 구하세요.',
        answer: '10',
        hint: '순서대로 식을 바꾸어 가며 직선의 방정식을 구한 뒤 계수를 비교하세요.',
        wrong: [{ a: '-4', why: '평행이동할 때 $x$ 대신 $x+2$, $y$ 대신 $y-3$을 넣었습니다. 도형을 옮길 때는 $x-2$, $y+3$을 넣습니다.' }],
        explain: '평행이동: $y+3=a(x-2)+b$, 곧 $y=ax-2a+b-3$입니다. $y$축 대칭: $x$ 대신 $-x$를 넣으면 $y=-ax-2a+b-3$입니다.\n\n이것이 $y=-2x+1$이므로 $-a=-2$에서 $a=2$, $-4+b-3=1$에서 $b=8$입니다. $a+b=10$입니다.',
      },
    ],

    deeper: [
      {
        title: '대칭이동과 행렬',
        body: '공통수학1에서 배운 행렬을 쓰면 대칭이동을 곱셈 한 번으로 나타낼 수 있습니다. 점 $(x, y)$를 열행렬 $\\begin{pmatrix} x \\\\ y \\end{pmatrix}$로 쓰면\n\n- $x$축 대칭: $\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix}=\\begin{pmatrix} x \\\\ -y \\end{pmatrix}$\n- 직선 $y=x$ 대칭: $\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix}=\\begin{pmatrix} y \\\\ x \\end{pmatrix}$\n\n두 대칭이동을 차례로 하는 것은 두 행렬을 곱한 행렬 하나로 나타낼 수 있습니다. 예를 들어 $x$축 대칭 뒤 $y$축 대칭을 하면 $\\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix}$, 곧 원점 대칭이 됩니다. 컴퓨터 그래픽에서 그림을 뒤집고 돌리는 계산이 바로 이런 행렬 곱셈입니다.',
      },
      {
        title: '빛은 가장 짧은 길로 반사된다',
        body: '거울에 비친 빛은 들어온 각과 같은 각으로 나갑니다(반사의 법칙). 고대 그리스의 헤론은 이것이 "거울 위의 한 점을 거쳐 가는 길 가운데 가장 짧은 길"과 같다는 것을 보였습니다.\n\n이 단원의 최단 거리 문제가 바로 그 증명입니다. $\\mathrm{A}$를 거울(직선)에 대하여 대칭이동한 $\\mathrm{A}\'$과 $\\mathrm{B}$를 곧게 이으면, 그 선분이 거울과 만나는 점에서 들어오는 각과 나가는 각이 같아집니다. 당구공을 쿠션에 한 번 맞혀 목표 공에 보내는 길을 찾을 때도 같은 생각을 씁니다.',
      },
    ],

    faq: [
      {
        q: '점은 $x+a$로 옮기는데, 도형의 방정식에는 왜 $x-a$를 넣어요?',
        a: '방정식은 "옮긴 뒤의 점 $(x, y)$가 만족하는 조건"을 써야 하기 때문입니다. 옮긴 뒤의 점 $(x, y)$는 옮기기 전에 $(x-a, y-b)$에 있었고, 그 점이 원래 방정식을 만족합니다. 그래서 원래 식에 $x-a$, $y-b$를 넣습니다. 헷갈리면 꼭짓점이나 중심 같은 점 하나를 직접 옮겨 확인해 보세요.',
      },
      {
        q: '대칭이동한 직선을 꼭 $y=ax+b$ 꼴로 고쳐야 하나요?',
        a: '같은 직선이면 어느 꼴로 써도 맞습니다. $x=2y+4$와 $y=\\frac{1}{2}x-2$는 같은 직선입니다. 다만 기울기를 비교하거나 다른 조건과 연결할 때는 $y=$ 꼴로 정리하면 편합니다.',
      },
      {
        q: '평행이동과 대칭이동을 여러 번 하면 순서가 중요한가요?',
        a: '대부분 중요합니다. 예를 들어 점 $(1, 0)$을 $x$축의 방향으로 1만큼 옮긴 뒤 $y$축 대칭하면 $(-2, 0)$이지만, $y$축 대칭을 먼저 하면 $(0, 0)$입니다. 문제에 적힌 순서대로 하고, 거꾸로 되돌릴 때는 마지막에 한 이동부터 되돌립니다.',
      },
    ],

    mistakes: [
      '도형을 평행이동할 때 $x$ 대신 $x+a$를 넣는 실수 — 도형의 방정식에는 $x-a$, $y-b$를 넣습니다. 점 하나를 옮겨 확인하세요.',
      '$x$축 대칭과 $y$축 대칭을 바꾸어 쓰는 실수 — $x$축에 대하여 대칭이면 $x$좌표는 그대로, $y$좌표의 부호가 바뀝니다.',
      '최단 거리 문제에서 대칭이동하지 않고 선분 $\\mathrm{AB}$의 길이를 답하는 실수 — 두 점이 직선의 같은 쪽에 있으면 한 점을 대칭이동해야 합니다.',
    ],

    gens: [
      {
        id: 'translate-point',
        level: 1,
        title: '점의 평행이동',
        make: function (R) {
          var x = R.int(-5, 5), y = R.int(-5, 5), a = R.nonzero(-5, 5), b = R.nonzero(-5, 5);
          var correct = pt(x + a, y + b);
          var cands = [
            [pt(x - a, y - b), '이동한 양을 더하지 않고 뺐습니다. 점의 평행이동은 $(x+a, y+b)$입니다.'],
            [pt(x + b, y + a), '$x$축 방향과 $y$축 방향으로 이동한 양을 바꾸어 더했습니다.'],
            [pt(x + a, y - b), '$y$좌표에서 이동한 양을 뺐습니다. 더해야 합니다.'],
            [pt(x - a, y + b), '$x$좌표에서 이동한 양을 뺐습니다. 더해야 합니다.'],
            [pt(a, b), '이동한 양만 썼습니다. 원래 좌표에 이동한 양을 더해야 합니다.'],
          ];
          var reason = {};
          cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
          var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
          return {
            type: 'choice', concept: 0,
            q: '점 $(' + x + ', ' + y + ')$' + R.josa(y, '을/를') + ' $x$축의 방향으로 $' + a + '$만큼, $y$축의 방향으로 $' + b + '$만큼 평행이동한 점의 좌표는 무엇입니까?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: '$(' + x + '+' + par(a) + ', ' + y + '+' + par(b) + ')=(' + (x + a) + ', ' + (y + b) + ')$입니다.',
          };
        },
      },
      {
        id: 'reflect-point',
        level: 1,
        title: '점의 대칭이동',
        make: function (R) {
          var x, y;
          do { x = R.nonzero(-6, 6); y = R.nonzero(-6, 6); } while (Math.abs(x) === Math.abs(y));
          var imgs = [
            { p: pt(x, -y), name: '$x$축', rule: '(x, y)\\to(x, -y)' },
            { p: pt(-x, y), name: '$y$축', rule: '(x, y)\\to(-x, y)' },
            { p: pt(-x, -y), name: '원점', rule: '(x, y)\\to(-x, -y)' },
            { p: pt(y, x), name: '직선 $y=x$', rule: '(x, y)\\to(y, x)' },
            { p: pt(-y, -x), name: '직선 $y=-x$', rule: '(x, y)\\to(-y, -x)' },
          ];
          var k = R.int(0, 3);
          var target = imgs[k];
          var reason = {};
          imgs.forEach(function (im, i) { if (i !== k) reason[im.p] = im.name + '에 대한 대칭이동입니다. ' + target.name + '에 대하여는 $' + target.rule + '$입니다.'; });
          var pick = R.choices(target.p, imgs.filter(function (im, i) { return i !== k; }).map(function (im) { return im.p; }));
          return {
            type: 'choice', concept: k === 3 ? 3 : 2,
            q: '점 $(' + x + ', ' + y + ')$' + R.josa(y, '을/를') + ' ' + target.name + '에 대하여 대칭이동한 점의 좌표는 무엇입니까?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === target.p ? '' : reason[c] || ''; }),
            explain: target.name + '에 대하여 대칭이동하면 $' + target.rule + '$이므로 ' + target.p + '입니다.',
          };
        },
      },
      {
        id: 'translate-line',
        level: 2,
        title: '직선의 평행이동',
        make: function (R) {
          var m = R.nonzero(-3, 3), n = R.int(-5, 5), a = R.nonzero(-4, 4), b = R.nonzero(-4, 4);
          var N = n - m * a + b;
          var wrong = [];
          var N1 = n + m * a - b;
          if (N1 !== N) wrong.push({ a: lineExpr(m, N1), why: '$x$ 대신 $' + shift('x', -a) + '$, $y$ 대신 $' + shift('y', -b) + '$' + R.josa(Math.abs(b), '을/를') + ' 넣었습니다. 도형을 옮길 때는 $x$ 대신 $' + shift('x', a) + '$, $y$ 대신 $' + shift('y', b) + '$' + R.josa(Math.abs(b), '을/를') + ' 넣습니다.' });
          if (n - m * a !== N1) wrong.push({ a: lineExpr(m, n - m * a), why: '$y$축의 방향으로 옮기는 것을 빠뜨렸습니다. $y$ 대신 $' + shift('y', b) + '$도 넣어야 합니다.' });
          var N3 = n + m * a + b;
          if (N3 !== N) wrong.push({ a: lineExpr(m, N3), why: '$x$ 대신 $' + shift('x', -a) + '$' + R.josa(Math.abs(a), '을/를') + ' 넣었습니다. $x$축의 방향으로 $' + a + '$만큼 옮기면 $x$ 대신 $' + shift('x', a) + '$' + R.josa(Math.abs(a), '을/를') + ' 넣습니다.' });
          var mt = m === 1 ? '' : m === -1 ? '-' : String(m);
          var nt = n === 0 ? '' : (n > 0 ? '+' + n : String(n));
          var orig = R.fmt.poly([m, n]);
          return {
            type: 'short', check: 'expr', concept: 1,
            q: '직선 $y=' + orig + '$' + R.josa(n === 0 ? 'x' : n, '을/를') + ' $x$축의 방향으로 $' + a + '$만큼, $y$축의 방향으로 $' + b + '$만큼 평행이동한 직선의 방정식을 구하세요. ($y=ax+b$ 꼴로 입력합니다.)',
            answer: lineExpr(m, N),
            wrong: wrong,
            hint: '도형을 평행이동할 때는 $x$ 대신 $x-a$, $y$ 대신 $y-b$를 넣습니다.',
            explain: '$x$ 대신 $' + shift('x', a) + '$, $y$ 대신 $' + shift('y', b) + '$' + R.josa(Math.abs(b), '을/를') + ' 넣으면\n\n$' + shift('y', b) + '=' + mt + '(' + shift('x', a) + ')' + nt + '$\n\n정리하면 $y=' + R.fmt.poly([m, N]) + '$입니다.',
          };
        },
      },
      {
        id: 'shortest-path',
        level: 2,
        title: '대칭이동을 이용한 최단 거리',
        make: function (R) {
          var onX = R.bool();
          var x1, y1, x2, y2, d2, ab2, ap;
          if (onX) {
            y1 = R.int(1, 5); y2 = R.int(1, 5);
            do { x1 = R.int(-4, 5); x2 = R.int(-4, 5); } while (x1 === x2);
            d2 = (x2 - x1) * (x2 - x1) + (y1 + y2) * (y1 + y2);
            ap = '(' + x1 + ', ' + (-y1) + ')';
          } else {
            x1 = R.int(1, 5); x2 = R.int(1, 5);
            do { y1 = R.int(-4, 5); y2 = R.int(-4, 5); } while (y1 === y2);
            d2 = (x1 + x2) * (x1 + x2) + (y2 - y1) * (y2 - y1);
            ap = '(' + (-x1) + ', ' + y1 + ')';
          }
          ab2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
          var axis = onX ? '$x$축' : '$y$축';
          var dx = onX ? x2 - x1 : x2 + x1, dy = onX ? y2 + y1 : y2 - y1;
          return {
            type: 'short', check: 'expr', concept: 4,
            q: axis + ' 위의 점 $\\mathrm{P}$와 두 점 $\\mathrm{A}(' + x1 + ', ' + y1 + ')$, $\\mathrm{B}(' + x2 + ', ' + y2 + ')$에 대하여 $\\overline{\\mathrm{AP}}+\\overline{\\mathrm{PB}}$의 최솟값을 구하세요. (근호는 √ 또는 sqrt로 입력합니다.)',
            answer: radExpr(d2),
            wrong: [{ a: radExpr(ab2), why: '선분 $\\mathrm{AB}$의 길이를 구했습니다. 두 점이 ' + axis + '의 같은 쪽에 있으므로 $\\mathrm{A}$를 ' + axis + '에 대하여 대칭이동한 점을 씁니다.' }],
            hint: '점 $\\mathrm{A}$를 ' + axis + '에 대하여 대칭이동해 보세요.',
            explain: '두 점이 모두 ' + axis + '의 같은 쪽에 있습니다. $\\mathrm{A}$를 ' + axis + '에 대하여 대칭이동한 점은 $\\mathrm{A}\'' + ap + '$입니다. $\\overline{\\mathrm{AP}}=\\overline{\\mathrm{A\'P}}$이므로\n\n' +
              '$\\overline{\\mathrm{AP}}+\\overline{\\mathrm{PB}}\\ge\\overline{\\mathrm{A\'B}}=\\sqrt{' + par(dx) + '^2+' + par(dy) + '^2}=\\sqrt{' + d2 + '}' + (radTex(d2) === '\\sqrt{' + d2 + '}' ? '' : '=' + radTex(d2)) + '$\n\n최솟값은 $' + radTex(d2) + '$입니다.',
          };
        },
      },
    ],
  });
})();
