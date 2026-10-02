/* 공통수학2 · 두 점 사이의 거리와 내분점
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy) */
(function () {
  // 생성기 도우미 (난수를 쓰지 않는 순수 함수만)
  // n = k^2 * m (m 은 제곱 인수가 없는 수)
  function rad(n) {
    var k = 1, m = n, f = 2;
    while (f * f <= m) {
      while (m % (f * f) === 0) { m /= f * f; k *= f; }
      f++;
    }
    return { k: k, m: m };
  }
  // √n 을 간단히 한 TeX
  function radTex(n) {
    var r = rad(n);
    if (r.m === 1) return String(r.k);
    return (r.k === 1 ? '' : r.k) + '\\sqrt{' + r.m + '}';
  }
  // √n 을 채점용 식으로
  function radExpr(n) {
    var r = rad(n);
    if (r.m === 1) return String(r.k);
    return (r.k === 1 ? '' : r.k) + '√' + r.m;
  }
  // √n 을 읽은 소리의 마지막 수 (조사 고르기용): "k 루트 m" → m
  function radLast(n) {
    var r = rad(n);
    return r.m === 1 ? r.k : r.m;
  }
  function par(n) { return n < 0 ? '(' + n + ')' : String(n); }
  // 좌표 글자 (분수도 쓸 수 있게 Frac 을 받는다)
  function ptTex(x, y) { return '(' + x + ', ' + y + ')'; }
  function fracPt(R, a, b, d) { return '$' + ptTex(R.F(a, d).toTex(), R.F(b, d).toTex()) + '$'; }

  Tutor.registerUnit({
    id: 'math-h-c2-01',
    course: 'math-h-c2',
    title: '두 점 사이의 거리와 내분점',
    summary: '좌표평면에서 두 점 사이의 거리를 구하고, 선분을 주어진 비로 나누는 내분점의 좌표를 구합니다.',
    goals: [
      '수직선 위와 좌표평면 위의 두 점 사이의 거리를 구할 수 있다.',
      '두 점 사이의 거리를 이용하여 삼각형의 모양을 판단할 수 있다.',
      '선분을 주어진 비로 내분하는 점과 중점의 좌표를 구할 수 있다.',
      '삼각형의 무게중심의 좌표를 구할 수 있다.',
    ],
    standards: ['[10공수2-01-01]'],

    concepts: [
      {
        title: '수직선 위의 두 점 사이의 거리',
        body: '수직선 위의 두 점 $\\mathrm{A}(x_1)$, $\\mathrm{B}(x_2)$ 사이의 거리는 두 좌표의 차의 절댓값입니다.\n\n$\\overline{\\mathrm{AB}}=|x_2-x_1|$\n\n거리는 항상 0 이상이므로, 큰 좌표에서 작은 좌표를 빼거나 차에 절댓값을 씌웁니다. 빼는 순서를 바꾸어도 $|x_2-x_1|=|x_1-x_2|$이므로 결과는 같습니다.\n\n예를 들어 $\\mathrm{A}(-3)$, $\\mathrm{B}(5)$ 사이의 거리는 $|5-(-3)|=8$입니다.\n\n> ⚠️ 두 좌표를 **더하는** 것이 아닙니다. $-3$과 $5$를 더한 $2$는 거리가 아닙니다.',
        easy: '온도계를 떠올려 보세요. 영하 3도에서 영상 5도까지 오르면 눈금 몇 칸을 올라갔을까요? 0도까지 3칸, 0도에서 5도까지 5칸, 모두 8칸입니다.\n\n수직선 위의 거리도 이렇게 "몇 칸 떨어져 있는가"입니다. 계산으로는 큰 수에서 작은 수를 빼면 됩니다: $5-(-3)=8$.',
        fig: { type: 'numberline', min: -4, max: 6, step: 1, points: [{ x: -3, label: 'A' }, { x: 5, label: 'B' }], alt: '수직선 위의 두 점 A(-3)과 B(5)' },
        check: {
          type: 'choice',
          q: '수직선 위의 두 점 $\\mathrm{A}(-4)$, $\\mathrm{B}(2)$ 사이의 거리는 얼마입니까?',
          choices: ['$6$', '$2$', '$-6$'],
          answer: 0,
          why: ['', '두 좌표를 더했습니다. 거리는 두 좌표의 차의 절댓값입니다: $|2-(-4)|=6$', '거리는 음수가 될 수 없습니다. 차에 절댓값을 씌워 $6$입니다.'],
          explain: '$\\overline{\\mathrm{AB}}=|2-(-4)|=|6|=6$입니다. 수직선에서 $-4$부터 $2$까지 6칸입니다.',
        },
      },
      {
        title: '좌표평면 위의 두 점 사이의 거리',
        body: '좌표평면 위의 두 점 $\\mathrm{A}(x_1, y_1)$, $\\mathrm{B}(x_2, y_2)$ 사이의 거리는\n\n$\\overline{\\mathrm{AB}}=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$\n\n**이유**: 점 $\\mathrm{A}$에서 가로로, 점 $\\mathrm{B}$에서 세로로 선을 그으면 선분 $\\mathrm{AB}$를 빗변으로 하는 직각삼각형이 생깁니다. 가로 길이는 $|x_2-x_1|$, 세로 길이는 $|y_2-y_1|$이므로 피타고라스 정리로 빗변의 길이를 구한 것입니다. 제곱을 하므로 절댓값 기호는 필요 없습니다.\n\n예: $\\mathrm{A}(1, 1)$, $\\mathrm{B}(4, 5)$일 때 $\\overline{\\mathrm{AB}}=\\sqrt{3^2+4^2}=\\sqrt{25}=5$\n\n특히 원점 $\\mathrm{O}$와 점 $\\mathrm{P}(x, y)$ 사이의 거리는 $\\overline{\\mathrm{OP}}=\\sqrt{x^2+y^2}$입니다.\n\n> 💡 "거리가 같다"는 조건은 근호를 없애기 위해 **거리의 제곱이 같다**로 바꾸어 식을 세우면 편리합니다.',
        easy: '바둑판 같은 길에서 오른쪽으로 3칸, 위로 4칸 가야 하는 곳을 생각해 보세요. 길을 따라가면 $3+4=7$칸이지만, 새처럼 곧장 날아가면 직각삼각형의 빗변을 따라갑니다.\n\n빗변의 길이는 피타고라스 정리로 $\\sqrt{3^2+4^2}=5$입니다. 좌표평면의 거리 공식은 "가로 차, 세로 차를 각각 제곱해 더한 뒤 근호"라는 이 계산을 식으로 쓴 것입니다.',
        fig: {
          type: 'coord', xmin: -1, xmax: 6, ymin: -1, ymax: 6,
          points: [{ x: 1, y: 1, label: 'A(1, 1)' }, { x: 4, y: 5, label: 'B(4, 5)' }, { x: 4, y: 1 }],
          segments: [{ from: [1, 1], to: [4, 5] }, { from: [1, 1], to: [4, 1], dashed: true }, { from: [4, 1], to: [4, 5], dashed: true }],
          alt: '점 A(1, 1)과 점 B(4, 5)를 잇는 선분과, 가로 3·세로 4인 직각삼각형을 이루는 점선',
        },
        check: {
          type: 'short', check: 'expr',
          q: '두 점 $\\mathrm{A}(1, 2)$, $\\mathrm{B}(3, 5)$ 사이의 거리를 구하세요. (근호는 √ 또는 sqrt로 입력합니다. 예: √2)',
          answer: '√13',
          wrong: [
            { a: '5', why: '가로 차 2와 세로 차 3을 그냥 더했습니다. 각각 제곱해 더한 뒤 근호를 씌웁니다.' },
            { a: '13', why: '제곱의 합까지는 맞습니다. 마지막에 근호를 씌워야 합니다.' },
          ],
          explain: '$\\overline{\\mathrm{AB}}=\\sqrt{(3-1)^2+(5-2)^2}=\\sqrt{4+9}=\\sqrt{13}$입니다.',
        },
      },
      {
        title: '거리로 삼각형의 모양 알아보기',
        body: '세 꼭짓점의 좌표를 알면 세 변의 길이를 모두 구할 수 있고, 그 길이로 삼각형의 모양을 판단합니다.\n\n| 세 변의 길이 $a$, $b$, $c$ 사이의 관계 | 삼각형의 모양 |\n|---|---|\n| 두 변의 길이가 같다 | 이등변삼각형 |\n| 세 변의 길이가 모두 같다 | 정삼각형 |\n| $a^2+b^2=c^2$ | 빗변이 $c$인 직각삼각형 |\n| 두 변이 같고 $a^2+b^2=c^2$ | 직각이등변삼각형 |\n\n예: $\\mathrm{A}(0, 0)$, $\\mathrm{B}(4, 2)$, $\\mathrm{C}(1, 3)$에서\n$\\overline{\\mathrm{AB}}^2=20$, $\\overline{\\mathrm{BC}}^2=9+1=10$, $\\overline{\\mathrm{CA}}^2=1+9=10$\n\n$\\overline{\\mathrm{BC}}=\\overline{\\mathrm{CA}}$이고 $\\overline{\\mathrm{BC}}^2+\\overline{\\mathrm{CA}}^2=\\overline{\\mathrm{AB}}^2$이므로 삼각형 $\\mathrm{ABC}$는 $\\angle \\mathrm{C}=90^\\circ$인 직각이등변삼각형입니다.\n\n> 💡 근호를 계산할 필요 없이 **길이의 제곱**끼리 비교하면 빠르고 정확합니다. 직각은 가장 긴 변(빗변)의 맞은편 꼭짓점에 있습니다.',
        easy: '세 변의 "제곱"만 구해 두면 판단은 덧셈 비교로 끝납니다.\n\n1. 세 수 가운데 같은 것이 있으면 이등변삼각형입니다.\n2. 작은 두 수의 합이 가장 큰 수와 같으면 직각삼각형입니다.\n\n위 예에서는 10, 10, 20이므로 1번(10과 10이 같다)과 2번(10+10=20)이 모두 맞습니다. 그래서 직각이등변삼각형입니다.',
        fig: {
          type: 'coord', xmin: -1, xmax: 5, ymin: -1, ymax: 4,
          points: [{ x: 0, y: 0, label: 'A' }, { x: 4, y: 2, label: 'B' }, { x: 1, y: 3, label: 'C' }],
          segments: [{ from: [0, 0], to: [4, 2] }, { from: [4, 2], to: [1, 3] }, { from: [1, 3], to: [0, 0] }],
          alt: '세 점 A(0, 0), B(4, 2), C(1, 3)을 꼭짓점으로 하는 삼각형',
        },
        check: {
          type: 'choice',
          q: '삼각형의 세 변의 길이의 제곱이 각각 $5$, $5$, $10$입니다. 이 삼각형은 어떤 삼각형입니까?',
          choices: ['직각이등변삼각형', '정삼각형', '직각이 아닌 이등변삼각형'],
          answer: 0,
          why: ['', '세 변이 모두 같지는 않습니다. 길이의 제곱이 5, 5, 10으로 하나가 다릅니다.', '두 변이 같은 것은 맞지만 $5+5=10$이므로 직각삼각형이기도 합니다.'],
          explain: '두 변의 길이가 같으므로 이등변삼각형이고, $5+5=10$으로 작은 두 제곱의 합이 가장 큰 제곱과 같으므로 직각삼각형입니다. 둘을 합쳐 직각이등변삼각형입니다.',
        },
      },
      {
        title: '수직선 위의 선분의 내분점',
        body: '점 $\\mathrm{P}$가 선분 $\\mathrm{AB}$ 위에 있고 $\\overline{\\mathrm{AP}}:\\overline{\\mathrm{PB}}=m:n$ ($m>0$, $n>0$)일 때, 점 $\\mathrm{P}$는 선분 $\\mathrm{AB}$를 $m:n$으로 **내분**한다고 하고, 점 $\\mathrm{P}$를 **내분점**이라고 합니다.\n\n수직선 위의 두 점 $\\mathrm{A}(x_1)$, $\\mathrm{B}(x_2)$에 대하여 선분 $\\mathrm{AB}$를 $m:n$으로 내분하는 점 $\\mathrm{P}$의 좌표는\n\n$\\dfrac{mx_2+nx_1}{m+n}$\n\n**이유** ($x_1<x_2$일 때): $\\mathrm{P}$는 $\\mathrm{A}$에서 $\\mathrm{B}$ 쪽으로 전체 길이의 $\\frac{m}{m+n}$만큼 간 점이므로 $x_1+\\frac{m}{m+n}(x_2-x_1)=\\frac{mx_2+nx_1}{m+n}$입니다.\n\n예: $\\mathrm{A}(-2)$, $\\mathrm{B}(8)$일 때 $2:3$으로 내분하는 점은 $\\frac{2\\times8+3\\times(-2)}{5}=\\frac{10}{5}=2$입니다. (확인: $\\overline{\\mathrm{AP}}=4$, $\\overline{\\mathrm{PB}}=6$, $4:6=2:3$)\n\n> 💡 비의 앞 수 $m$은 **뒤쪽 끝점** $\\mathrm{B}$의 좌표와, 뒤 수 $n$은 **앞쪽 끝점** $\\mathrm{A}$의 좌표와 곱합니다(엇갈려 곱하기). $m=n$이면 중점 $\\frac{x_1+x_2}{2}$가 됩니다.',
        easy: '내분점 공식은 "무게를 단 평균"입니다. 시소를 떠올려 보세요. $\\mathrm{B}$ 쪽에 무게 $m$, $\\mathrm{A}$ 쪽에 무게 $n$을 올리면 받침점은 무거운 쪽으로 끌려갑니다.\n\n$\\overline{\\mathrm{AP}}:\\overline{\\mathrm{PB}}=2:3$이면 $\\mathrm{P}$는 $\\mathrm{A}$에 더 가까워야 하므로 $\\mathrm{A}$ 쪽 무게가 더 큰 $3$이 되어야 합니다. 그래서 $\\mathrm{A}$의 좌표에 $3$, $\\mathrm{B}$의 좌표에 $2$를 곱해 더하고 $2+3=5$로 나눕니다.',
        fig: { type: 'numberline', min: -3, max: 9, step: 1, points: [{ x: -2, label: 'A' }, { x: 2, label: 'P' }, { x: 8, label: 'B' }], alt: '수직선 위의 점 A(-2), P(2), B(8). AP는 4칸, PB는 6칸' },
        check: {
          type: 'choice',
          q: '수직선 위의 두 점 $\\mathrm{A}(1)$, $\\mathrm{B}(7)$에 대하여 선분 $\\mathrm{AB}$를 $1:2$로 내분하는 점의 좌표는 무엇입니까?',
          choices: ['$3$', '$5$', '$4$'],
          answer: 0,
          why: ['', '비를 거꾸로 곱했습니다. $2:1$로 내분하는 점이 $5$입니다. $m=1$은 $\\mathrm{B}$의 좌표와 곱합니다.', '중점을 구했습니다. 비가 $1:1$일 때만 중점입니다.'],
          explain: '$\\frac{1\\times7+2\\times1}{1+2}=\\frac{9}{3}=3$입니다. 확인하면 $\\overline{\\mathrm{AP}}=2$, $\\overline{\\mathrm{PB}}=4$로 $1:2$입니다.',
        },
      },
      {
        title: '좌표평면 위의 선분의 내분점과 중점',
        body: '좌표평면 위의 두 점 $\\mathrm{A}(x_1, y_1)$, $\\mathrm{B}(x_2, y_2)$에 대하여 선분 $\\mathrm{AB}$를 $m:n$ ($m>0$, $n>0$)으로 내분하는 점 $\\mathrm{P}$의 좌표는\n\n$\\mathrm{P}\\left(\\dfrac{mx_2+nx_1}{m+n}, \\dfrac{my_2+ny_1}{m+n}\\right)$\n\n특히 선분 $\\mathrm{AB}$의 **중점** $\\mathrm{M}$의 좌표는 $\\mathrm{M}\\left(\\dfrac{x_1+x_2}{2}, \\dfrac{y_1+y_2}{2}\\right)$입니다.\n\n**이유**: 세 점 $\\mathrm{A}$, $\\mathrm{P}$, $\\mathrm{B}$에서 $x$축에 수선을 내리면, 평행선 사이의 선분의 길이의 비에 따라 $x$축 위의 발도 같은 비 $m:n$으로 나뉩니다. 그래서 $x$좌표와 $y$좌표를 따로따로 수직선의 내분점 공식으로 구하면 됩니다.\n\n예: $\\mathrm{A}(-1, 5)$, $\\mathrm{B}(5, -1)$일 때 $1:2$로 내분하는 점은\n$\\left(\\frac{1\\times5+2\\times(-1)}{3}, \\frac{1\\times(-1)+2\\times5}{3}\\right)=(1, 3)$',
        easy: '좌표평면의 내분점은 "수직선 두 개"로 나누어 생각하면 됩니다. 가로(x좌표)끼리 한 번, 세로(y좌표)끼리 한 번, 수직선 위의 내분점 공식을 따로 쓰면 끝입니다.\n\n중점은 $1:1$로 내분하는 점이므로 그냥 두 좌표의 **평균**입니다. $x$좌표끼리 더해 2로 나누고, $y$좌표끼리 더해 2로 나눕니다.',
        fig: {
          type: 'coord', xmin: -2, xmax: 6, ymin: -2, ymax: 6,
          points: [{ x: -1, y: 5, label: 'A' }, { x: 1, y: 3, label: 'P' }, { x: 5, y: -1, label: 'B' }],
          segments: [{ from: [-1, 5], to: [5, -1] }],
          alt: '점 A(-1, 5)와 점 B(5, -1)을 잇는 선분 위에 A에 더 가까운 점 P(1, 3)',
        },
        check: {
          type: 'choice',
          q: '두 점 $\\mathrm{A}(2, -3)$, $\\mathrm{B}(6, 5)$를 잇는 선분 $\\mathrm{AB}$의 중점의 좌표는 무엇입니까?',
          choices: ['$(4, 1)$', '$(8, 2)$', '$(2, 4)$'],
          answer: 0,
          why: ['', '두 좌표를 더하기만 하고 2로 나누지 않았습니다.', '좌표의 차를 2로 나누었습니다. 중점은 합을 2로 나눕니다.'],
          explain: '$\\left(\\frac{2+6}{2}, \\frac{-3+5}{2}\\right)=(4, 1)$입니다.',
        },
      },
      {
        title: '삼각형의 무게중심의 좌표',
        body: '삼각형의 세 **중선**(꼭짓점과 마주 보는 변의 중점을 이은 선분)은 한 점에서 만나고, 이 점을 **무게중심**이라고 합니다. 무게중심은 각 중선을 꼭짓점으로부터 $2:1$로 내분합니다.\n\n세 꼭짓점이 $\\mathrm{A}(x_1, y_1)$, $\\mathrm{B}(x_2, y_2)$, $\\mathrm{C}(x_3, y_3)$인 삼각형의 무게중심 $\\mathrm{G}$의 좌표는\n\n$\\mathrm{G}\\left(\\dfrac{x_1+x_2+x_3}{3}, \\dfrac{y_1+y_2+y_3}{3}\\right)$\n\n**이유**: 변 $\\mathrm{BC}$의 중점을 $\\mathrm{M}$이라 하면 $\\mathrm{M}$의 $x$좌표는 $\\frac{x_2+x_3}{2}$입니다. $\\mathrm{G}$는 선분 $\\mathrm{AM}$을 $2:1$로 내분하므로 $x$좌표는 $\\dfrac{2\\times\\frac{x_2+x_3}{2}+1\\times x_1}{3}=\\dfrac{x_1+x_2+x_3}{3}$입니다. $y$좌표도 같습니다.\n\n예: $\\mathrm{A}(1, 4)$, $\\mathrm{B}(-2, -1)$, $\\mathrm{C}(4, 0)$일 때 $\\mathrm{G}\\left(\\frac{1-2+4}{3}, \\frac{4-1+0}{3}\\right)=(1, 1)$',
        easy: '무게중심은 이름 그대로 삼각형 모양 판을 손가락 하나로 받쳤을 때 균형이 맞는 점입니다.\n\n좌표로는 아주 간단합니다. 세 꼭짓점의 $x$좌표의 **평균**, $y$좌표의 **평균**이 무게중심의 좌표입니다. 두 점의 평균이 중점이었듯이, 세 점의 평균이 무게중심입니다.',
        fig: {
          type: 'coord', xmin: -3, xmax: 5, ymin: -2, ymax: 5,
          points: [{ x: 1, y: 4, label: 'A' }, { x: -2, y: -1, label: 'B' }, { x: 4, y: 0, label: 'C' }, { x: 1, y: 1, label: 'G' }],
          segments: [
            { from: [1, 4], to: [-2, -1] }, { from: [-2, -1], to: [4, 0] }, { from: [4, 0], to: [1, 4] },
            { from: [1, 4], to: [1, -0.5], dashed: true }, { from: [-2, -1], to: [2.5, 2], dashed: true }, { from: [4, 0], to: [-0.5, 1.5], dashed: true },
          ],
          alt: '삼각형 ABC와 세 중선(점선)이 만나는 무게중심 G(1, 1)',
        },
        check: {
          type: 'choice',
          q: '세 점 $\\mathrm{A}(0, 0)$, $\\mathrm{B}(6, 0)$, $\\mathrm{C}(3, 6)$를 꼭짓점으로 하는 삼각형의 무게중심의 좌표는 무엇입니까?',
          choices: ['$(3, 2)$', '$(9, 6)$', '$\\left(\\frac{9}{2}, 3\\right)$'],
          answer: 0,
          why: ['', '세 좌표를 더하기만 하고 3으로 나누지 않았습니다.', '2로 나누었습니다. 꼭짓점이 3개이므로 3으로 나눕니다.'],
          explain: '$\\left(\\frac{0+6+3}{3}, \\frac{0+0+6}{3}\\right)=(3, 2)$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '세 점 $\\mathrm{A}(-1, 1)$, $\\mathrm{B}(3, -1)$, $\\mathrm{C}(1, 5)$를 꼭짓점으로 하는 삼각형 $\\mathrm{ABC}$는 어떤 삼각형인지 말하세요.',
        fig: {
          type: 'coord', xmin: -2, xmax: 4, ymin: -2, ymax: 6,
          points: [{ x: -1, y: 1, label: 'A' }, { x: 3, y: -1, label: 'B' }, { x: 1, y: 5, label: 'C' }],
          segments: [{ from: [-1, 1], to: [3, -1] }, { from: [3, -1], to: [1, 5] }, { from: [1, 5], to: [-1, 1] }],
          alt: '세 점 A(-1, 1), B(3, -1), C(1, 5)를 꼭짓점으로 하는 삼각형',
        },
        steps: [
          '세 변의 길이의 제곱을 구합니다. $\\overline{\\mathrm{AB}}^2=(3+1)^2+(-1-1)^2=16+4=20$',
          '$\\overline{\\mathrm{BC}}^2=(1-3)^2+(5+1)^2=4+36=40$, $\\overline{\\mathrm{CA}}^2=(-1-1)^2+(1-5)^2=4+16=20$',
          '$\\overline{\\mathrm{AB}}=\\overline{\\mathrm{CA}}$이므로 이등변삼각형입니다.',
          '$\\overline{\\mathrm{AB}}^2+\\overline{\\mathrm{CA}}^2=20+20=40=\\overline{\\mathrm{BC}}^2$이므로 가장 긴 변 $\\mathrm{BC}$의 맞은편 각 $\\angle \\mathrm{A}$가 직각입니다.',
        ],
        answer: '$\\angle \\mathrm{A}=90^\\circ$인 직각이등변삼각형',
      },
      {
        q: '두 점 $\\mathrm{A}(-4, 2)$, $\\mathrm{B}(6, -3)$에 대하여 선분 $\\mathrm{AB}$를 $3:2$로 내분하는 점 $\\mathrm{P}$의 좌표를 구하세요.',
        steps: [
          '$m=3$은 $\\mathrm{B}$의 좌표와, $n=2$는 $\\mathrm{A}$의 좌표와 곱하고 $m+n=5$로 나눕니다.',
          '$x$좌표: $\\dfrac{3\\times6+2\\times(-4)}{5}=\\dfrac{18-8}{5}=2$',
          '$y$좌표: $\\dfrac{3\\times(-3)+2\\times2}{5}=\\dfrac{-9+4}{5}=-1$',
          '확인: $\\mathrm{P}$는 $\\mathrm{A}$보다 $\\mathrm{B}$에 더 가까워야 합니다($3>2$). $\\mathrm{A}$에서 $x$좌표로 6, $\\mathrm{B}$까지는 4만큼이니 $6:4=3:2$로 맞습니다.',
        ],
        answer: '$\\mathrm{P}(2, -1)$',
      },
      {
        q: '삼각형 $\\mathrm{ABC}$에서 $\\mathrm{A}(-1, 3)$, $\\mathrm{B}(4, -2)$이고 무게중심이 $\\mathrm{G}(2, 1)$일 때, 꼭짓점 $\\mathrm{C}$의 좌표를 구하세요.',
        steps: [
          '$\\mathrm{C}(a, b)$로 놓고 무게중심 공식을 씁니다.',
          '$\\dfrac{-1+4+a}{3}=2$에서 $3+a=6$, $a=3$',
          '$\\dfrac{3+(-2)+b}{3}=1$에서 $1+b=3$, $b=2$',
        ],
        answer: '$\\mathrm{C}(3, 2)$',
      },
    ],

    terms: [
      { term: '두 점 사이의 거리', def: '두 점을 잇는 선분의 길이입니다. 좌표평면에서는 $\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$으로 구합니다.' },
      { term: '내분', def: '선분 $\\mathrm{AB}$ 위의 점 $\\mathrm{P}$가 $\\overline{\\mathrm{AP}}:\\overline{\\mathrm{PB}}=m:n$이 되게 선분을 나누는 것입니다.' },
      { term: '내분점', def: '선분을 $m:n$으로 내분하는 점입니다. 좌표는 $\\left(\\frac{mx_2+nx_1}{m+n}, \\frac{my_2+ny_1}{m+n}\\right)$입니다.' },
      { term: '중점', def: '선분을 $1:1$로 내분하는 점, 곧 선분의 한가운데 점입니다. 두 끝점의 좌표의 평균입니다.' },
      { term: '중선', def: '삼각형의 한 꼭짓점과 그 꼭짓점의 맞은편 변의 중점을 이은 선분입니다.' },
      { term: '무게중심', def: '삼각형의 세 중선이 만나는 점입니다. 각 중선을 꼭짓점으로부터 $2:1$로 내분하며, 좌표는 세 꼭짓점의 좌표의 평균입니다.' },
      { term: '직각이등변삼각형', def: '두 변의 길이가 같고, 그 두 변 사이의 각이 직각인 삼각형입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '수직선 위의 두 점 $\\mathrm{A}(-7)$, $\\mathrm{B}(3)$ 사이의 거리를 구하세요.',
        answer: '10',
        wrong: [{ a: '4', why: '두 좌표를 더했습니다($-7+3=-4$). 거리는 두 좌표의 차의 절댓값입니다.' }],
        explain: '$\\overline{\\mathrm{AB}}=|3-(-7)|=10$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 1,
        q: '두 점 $\\mathrm{A}(-1, 2)$, $\\mathrm{B}(3, -1)$ 사이의 거리를 구하세요.',
        answer: '5',
        wrong: [
          { a: '7', why: '가로 차 4와 세로 차 3을 그냥 더했습니다. 각각 제곱해 더한 뒤 근호를 씌웁니다.' },
          { a: '25', why: '거리의 제곱을 구했습니다. 근호를 씌우면 $\\sqrt{25}=5$입니다.' },
        ],
        explain: '$\\overline{\\mathrm{AB}}=\\sqrt{(3+1)^2+(-1-2)^2}=\\sqrt{16+9}=\\sqrt{25}=5$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'expr', concept: 1,
        q: '원점 $\\mathrm{O}$와 점 $\\mathrm{P}(2, -4)$ 사이의 거리를 구하세요. (근호는 √ 또는 sqrt로 입력합니다. 예: 3√2)',
        answer: '2√5',
        wrong: [
          { a: '6', why: '가로 2와 세로 4를 그냥 더했습니다. $\\sqrt{x^2+y^2}$으로 구합니다.' },
          { a: '20', why: '제곱의 합까지는 맞습니다. 근호를 씌워 $\\sqrt{20}=2\\sqrt{5}$입니다.' },
        ],
        explain: '$\\overline{\\mathrm{OP}}=\\sqrt{2^2+(-4)^2}=\\sqrt{20}=2\\sqrt{5}$입니다. $\\sqrt{20}$으로 답해도 같은 값입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 3,
        q: '수직선 위의 두 점 $\\mathrm{A}(-4)$, $\\mathrm{B}(8)$에 대하여 선분 $\\mathrm{AB}$를 $3:1$로 내분하는 점의 좌표는 무엇입니까?',
        choices: ['$5$', '$-1$', '$2$', '$20$'],
        answer: 0,
        why: [
          '',
          '비를 거꾸로 곱했습니다. $3$은 $\\mathrm{B}$의 좌표 $8$과, $1$은 $\\mathrm{A}$의 좌표 $-4$와 곱합니다.',
          '중점을 구했습니다. 비가 $3:1$이므로 $\\mathrm{B}$에 더 가까운 점입니다.',
          '분자까지만 계산했습니다. $3+1=4$로 나누어야 합니다.',
        ],
        explain: '$\\dfrac{3\\times8+1\\times(-4)}{3+1}=\\dfrac{20}{4}=5$입니다. 확인하면 $\\overline{\\mathrm{AP}}=9$, $\\overline{\\mathrm{PB}}=3$으로 $3:1$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 4,
        q: '두 점 $\\mathrm{A}(-2, 1)$, $\\mathrm{B}(4, 7)$에 대하여 선분 $\\mathrm{AB}$를 $2:1$로 내분하는 점의 좌표는 무엇입니까?',
        choices: ['$(2, 5)$', '$(0, 3)$', '$(1, 4)$', '$(6, 15)$'],
        answer: 0,
        why: [
          '',
          '비를 거꾸로 곱해 $1:2$로 내분하는 점을 구했습니다.',
          '중점을 구했습니다. 비가 $2:1$이면 $\\mathrm{B}$에 더 가까운 점입니다.',
          '분자까지만 계산했습니다. $2+1=3$으로 나누어야 합니다.',
        ],
        explain: '$x$좌표는 $\\dfrac{2\\times4+1\\times(-2)}{3}=\\dfrac{6}{3}=2$, $y$좌표는 $\\dfrac{2\\times7+1\\times1}{3}=\\dfrac{15}{3}=5$이므로 $(2, 5)$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'ox', concept: 4,
        q: '두 점 $\\mathrm{A}(3, -2)$, $\\mathrm{B}(-5, 6)$를 잇는 선분의 중점의 좌표는 $(-1, 2)$입니다.',
        answer: true,
        explain: '$\\left(\\frac{3+(-5)}{2}, \\frac{-2+6}{2}\\right)=(-1, 2)$이므로 맞습니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 5,
        q: '세 점 $\\mathrm{A}(2, 5)$, $\\mathrm{B}(-4, 1)$, $\\mathrm{C}(5, -3)$를 꼭짓점으로 하는 삼각형의 무게중심의 좌표는 무엇입니까?',
        choices: ['$(1, 1)$', '$\\left(\\frac{3}{2}, \\frac{3}{2}\\right)$', '$(3, 3)$', '$\\left(\\frac{1}{2}, -1\\right)$'],
        answer: 0,
        why: [
          '',
          '세 좌표의 합을 2로 나누었습니다. 꼭짓점이 3개이므로 3으로 나눕니다.',
          '세 좌표를 더하기만 하고 3으로 나누지 않았습니다.',
          '변 $\\mathrm{BC}$의 중점을 구했습니다. 무게중심은 세 꼭짓점의 좌표의 평균입니다.',
        ],
        explain: '$\\left(\\frac{2+(-4)+5}{3}, \\frac{5+1+(-3)}{3}\\right)=\\left(\\frac{3}{3}, \\frac{3}{3}\\right)=(1, 1)$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 2,
        q: '세 점 $\\mathrm{A}(1, 1)$, $\\mathrm{B}(5, 2)$, $\\mathrm{C}(2, 5)$를 꼭짓점으로 하는 삼각형 $\\mathrm{ABC}$는 어떤 삼각형입니까?',
        fig: {
          type: 'coord', xmin: -1, xmax: 6, ymin: -1, ymax: 6,
          points: [{ x: 1, y: 1, label: 'A' }, { x: 5, y: 2, label: 'B' }, { x: 2, y: 5, label: 'C' }],
          segments: [{ from: [1, 1], to: [5, 2] }, { from: [5, 2], to: [2, 5] }, { from: [2, 5], to: [1, 1] }],
          alt: '세 점 A(1, 1), B(5, 2), C(2, 5)를 꼭짓점으로 하는 삼각형',
        },
        choices: [
          '$\\overline{\\mathrm{AB}}=\\overline{\\mathrm{AC}}$인 이등변삼각형',
          '$\\angle \\mathrm{A}=90^\\circ$인 직각이등변삼각형',
          '정삼각형',
          '$\\overline{\\mathrm{BA}}=\\overline{\\mathrm{BC}}$인 이등변삼각형',
        ],
        answer: 0,
        why: [
          '',
          '$\\overline{\\mathrm{AB}}^2+\\overline{\\mathrm{AC}}^2=34$인데 $\\overline{\\mathrm{BC}}^2=18$이므로 직각삼각형이 아닙니다.',
          '$\\overline{\\mathrm{BC}}^2$의 값은 18로, 다른 두 변의 길이의 제곱 17과 다릅니다.',
          '$\\overline{\\mathrm{BA}}^2$의 값은 17, $\\overline{\\mathrm{BC}}^2$의 값은 18로 다릅니다. 세 변을 모두 계산해 비교해 보세요.',
        ],
        hint: '세 변의 길이의 제곱을 각각 구해 비교하세요.',
        explain: '$\\overline{\\mathrm{AB}}^2=4^2+1^2=17$, $\\overline{\\mathrm{BC}}^2=(-3)^2+3^2=18$, $\\overline{\\mathrm{CA}}^2=(-1)^2+(-4)^2=17$입니다. $\\overline{\\mathrm{AB}}=\\overline{\\mathrm{AC}}$인 이등변삼각형이고, $17+17\\ne18$이므로 직각삼각형은 아닙니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 1,
        q: '$x$축 위의 점 $\\mathrm{P}$가 두 점 $\\mathrm{A}(1, 3)$, $\\mathrm{B}(5, 1)$에서 같은 거리에 있습니다. 점 $\\mathrm{P}$의 $x$좌표를 구하세요.',
        answer: '2',
        hint: '$\\mathrm{P}(a, 0)$으로 놓고 $\\overline{\\mathrm{PA}}^2=\\overline{\\mathrm{PB}}^2$을 세워 보세요.',
        wrong: [{ a: '3', why: '선분 $\\mathrm{AB}$의 중점의 $x$좌표를 구했습니다. 중점은 $x$축 위에 있지 않습니다. $\\mathrm{P}(a, 0)$으로 놓고 거리의 제곱이 같다는 식을 풀어 보세요.' }],
        explain: '$\\mathrm{P}(a, 0)$이라 하면 $(a-1)^2+3^2=(a-5)^2+1^2$입니다. 전개하면 $a^2-2a+10=a^2-10a+26$이므로 $8a=16$, $a=2$입니다. (확인: $\\overline{\\mathrm{PA}}^2=1+9=10$, $\\overline{\\mathrm{PB}}^2=9+1=10$)',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 1,
        q: '두 점 $\\mathrm{A}(2, a)$, $\\mathrm{B}(6, 1)$ 사이의 거리가 5일 때, 양수 $a$의 값을 구하세요. (단, $a>1$)',
        answer: '4',
        hint: '거리의 제곱이 25라는 식을 세웁니다.',
        wrong: [{ a: '-2', why: '$a-1=-3$인 경우입니다. 조건 $a>1$을 만족하지 않습니다.' }],
        explain: '$(6-2)^2+(1-a)^2=25$에서 $(a-1)^2=9$, $a-1=\\pm3$이므로 $a=4$ 또는 $a=-2$입니다. $a>1$이므로 $a=4$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 4,
        q: '점 $\\mathrm{A}(0, 1)$에 대하여 선분 $\\mathrm{AB}$를 $1:3$으로 내분하는 점이 $\\mathrm{P}(2, 3)$일 때, 점 $\\mathrm{B}$의 좌표는 무엇입니까?',
        choices: ['$(8, 9)$', '$(4, 5)$', '$(8, 11)$', '$\\left(\\frac{8}{3}, \\frac{11}{3}\\right)$'],
        answer: 0,
        why: [
          '',
          '$\\mathrm{P}$를 중점으로 보고 구했습니다. 비가 $1:3$이므로 $\\mathrm{B}$는 $\\mathrm{P}$에서 훨씬 멀리 있습니다.',
          '$\\mathrm{A}$의 좌표에 3을 곱하는 것을 빠뜨렸습니다. $\\frac{1\\times b+3\\times1}{4}=3$입니다.',
          '비를 거꾸로 곱했습니다. 앞 수 1은 $\\mathrm{B}$의 좌표와 곱합니다.',
        ],
        hint: '$\\mathrm{B}(a, b)$로 놓고 내분점 공식에 넣어 보세요.',
        explain: '$\\mathrm{B}(a, b)$라 하면 $\\frac{1\\times a+3\\times0}{4}=2$에서 $a=8$, $\\frac{1\\times b+3\\times1}{4}=3$에서 $b+3=12$, $b=9$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 5,
        q: '세 점 $\\mathrm{A}(a, 1)$, $\\mathrm{B}(3, b)$, $\\mathrm{C}(-1, 4)$를 꼭짓점으로 하는 삼각형의 무게중심이 $\\mathrm{G}(2, 3)$일 때, $a+b$의 값을 구하세요.',
        answer: '8',
        hint: '$x$좌표와 $y$좌표를 따로 식으로 세웁니다.',
        wrong: [{ a: '-2', why: '3으로 나누는 것을 빠뜨리고 세 좌표의 합을 2, 3과 같다고 놓았습니다. 세 좌표의 합은 무게중심 좌표의 3배입니다.' }],
        explain: '$\\frac{a+3+(-1)}{3}=2$에서 $a+2=6$, $a=4$입니다. $\\frac{1+b+4}{3}=3$에서 $b+5=9$, $b=4$입니다. 따라서 $a+b=8$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 1,
        q: '두 점 $\\mathrm{A}(1, 2)$, $\\mathrm{B}(5, 4)$와 $x$축 위의 점 $\\mathrm{P}$에 대하여 $\\overline{\\mathrm{PA}}^2+\\overline{\\mathrm{PB}}^2$의 최솟값을 구하세요.',
        answer: '28',
        hint: '$\\mathrm{P}(x, 0)$으로 놓으면 이차함수의 최솟값 문제가 됩니다.',
        wrong: [{ a: '3', why: '최솟값을 갖는 점 $\\mathrm{P}$의 $x$좌표를 답했습니다. 그때의 $\\overline{\\mathrm{PA}}^2+\\overline{\\mathrm{PB}}^2$ 값을 구해야 합니다.' }],
        explain: '$\\mathrm{P}(x, 0)$이라 하면 $\\overline{\\mathrm{PA}}^2+\\overline{\\mathrm{PB}}^2=(x-1)^2+4+(x-5)^2+16=2x^2-12x+46=2(x-3)^2+28$입니다. 따라서 $x=3$일 때 최솟값 28을 갖습니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 4,
        q: '평행사변형 $\\mathrm{ABCD}$의 세 꼭짓점이 $\\mathrm{A}(1, 1)$, $\\mathrm{B}(5, 2)$, $\\mathrm{C}(6, 5)$일 때, 꼭짓점 $\\mathrm{D}$의 좌표는 무엇입니까?',
        choices: ['$(2, 4)$', '$(10, 6)$', '$(0, -2)$', '$\\left(\\frac{7}{2}, 3\\right)$'],
        answer: 0,
        why: [
          '',
          '꼭짓점의 순서를 $\\mathrm{A}$, $\\mathrm{B}$, $\\mathrm{D}$, $\\mathrm{C}$로 보았습니다. 평행사변형 $\\mathrm{ABCD}$의 대각선은 $\\mathrm{AC}$와 $\\mathrm{BD}$입니다.',
          '대각선을 $\\mathrm{AB}$와 $\\mathrm{CD}$로 보았습니다. 대각선은 마주 보는 꼭짓점끼리 잇습니다.',
          '두 대각선이 만나는 점(선분 $\\mathrm{AC}$의 중점)을 구했습니다. 이 점이 선분 $\\mathrm{BD}$의 중점이 되도록 $\\mathrm{D}$를 구합니다.',
        ],
        hint: '평행사변형의 두 대각선은 서로를 이등분합니다.',
        explain: '대각선 $\\mathrm{AC}$, $\\mathrm{BD}$의 중점이 같아야 합니다. $\\mathrm{D}(a, b)$라 하면 $\\frac{1+6}{2}=\\frac{5+a}{2}$에서 $a=2$, $\\frac{1+5}{2}=\\frac{2+b}{2}$에서 $b=4$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 4,
        q: '원점 $\\mathrm{O}$와 두 점 $\\mathrm{A}(-2, 6)$, $\\mathrm{B}(6, 2)$가 있습니다. 선분 $\\mathrm{AB}$ 위의 점 $\\mathrm{P}$에 대하여 삼각형 $\\mathrm{OAP}$와 삼각형 $\\mathrm{OPB}$의 넓이의 비가 $1:3$일 때, 점 $\\mathrm{P}$의 좌표는 무엇입니까?',
        fig: {
          type: 'coord', xmin: -3, xmax: 7, ymin: -1, ymax: 7,
          points: [{ x: -2, y: 6, label: 'A' }, { x: 6, y: 2, label: 'B' }],
          segments: [{ from: [0, 0], to: [-2, 6] }, { from: [-2, 6], to: [6, 2] }, { from: [6, 2], to: [0, 0] }],
          alt: '원점 O와 점 A(-2, 6), 점 B(6, 2)로 이루어진 삼각형',
        },
        choices: ['$(0, 5)$', '$(4, 3)$', '$(2, 4)$'],
        answer: 0,
        why: [
          '',
          '비를 거꾸로 써서 $\\overline{\\mathrm{AP}}:\\overline{\\mathrm{PB}}=3:1$인 점을 구했습니다. 넓이가 작은 삼각형 $\\mathrm{OAP}$ 쪽의 밑변 $\\overline{\\mathrm{AP}}$가 더 짧습니다.',
          '중점을 구했습니다. 넓이의 비가 $1:3$이므로 $\\mathrm{P}$는 $\\mathrm{A}$에 더 가깝습니다.',
        ],
        hint: '두 삼각형은 높이(점 $\\mathrm{O}$에서 직선 $\\mathrm{AB}$까지의 거리)가 같습니다.',
        explain: '두 삼각형의 높이가 같으므로 넓이의 비는 밑변의 비와 같습니다. $\\overline{\\mathrm{AP}}:\\overline{\\mathrm{PB}}=1:3$이므로 $\\mathrm{P}$는 선분 $\\mathrm{AB}$를 $1:3$으로 내분합니다. $\\left(\\frac{1\\times6+3\\times(-2)}{4}, \\frac{1\\times2+3\\times6}{4}\\right)=(0, 5)$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 5,
        q: '삼각형 $\\mathrm{ABC}$의 세 변의 중점의 좌표가 $(1, 2)$, $(3, -1)$, $(5, 3)$일 때, 삼각형 $\\mathrm{ABC}$의 무게중심의 좌표는 무엇입니까?',
        choices: ['$\\left(3, \\frac{4}{3}\\right)$', '$\\left(6, \\frac{8}{3}\\right)$', '$\\left(\\frac{3}{2}, \\frac{2}{3}\\right)$', '$(9, 4)$'],
        answer: 0,
        why: [
          '',
          '세 중점의 좌표의 합이 세 꼭짓점의 좌표의 합의 절반이라고 생각했습니다. 실제로는 두 합이 같습니다.',
          '세 중점의 좌표의 합이 세 꼭짓점의 좌표의 합의 2배라고 생각했습니다. 실제로는 두 합이 같습니다.',
          '세 좌표를 더하기만 하고 3으로 나누지 않았습니다.',
        ],
        hint: '세 중점의 $x$좌표를 모두 더하면 꼭짓점의 $x$좌표로 어떻게 나타나는지 생각해 보세요.',
        explain: '꼭짓점의 $x$좌표를 $x_1$, $x_2$, $x_3$이라 하면 세 중점의 $x$좌표의 합은 $\\frac{x_1+x_2}{2}+\\frac{x_2+x_3}{2}+\\frac{x_3+x_1}{2}=x_1+x_2+x_3$입니다. $y$좌표도 같습니다. 따라서 무게중심은 세 중점이 이루는 삼각형의 무게중심과 같고, $\\left(\\frac{1+3+5}{3}, \\frac{2-1+3}{3}\\right)=\\left(3, \\frac{4}{3}\\right)$입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 2,
        q: '세 점 $\\mathrm{A}(1, 1)$, $\\mathrm{B}(4, 2)$, $\\mathrm{C}(a, 5)$를 꼭짓점으로 하는 삼각형 $\\mathrm{ABC}$가 $\\angle \\mathrm{B}=90^\\circ$인 직각삼각형일 때, $a$의 값을 구하세요.',
        answer: '3',
        hint: '$\\angle \\mathrm{B}$가 직각이면 빗변은 $\\mathrm{B}$의 맞은편 변 $\\mathrm{AC}$입니다.',
        wrong: [{ a: '-1/3', why: '$\\angle \\mathrm{A}$가 직각이라고 보고 식을 세웠습니다. $\\angle \\mathrm{B}=90^\\circ$이면 $\\overline{\\mathrm{AB}}^2+\\overline{\\mathrm{BC}}^2=\\overline{\\mathrm{AC}}^2$입니다.' }],
        explain: '$\\overline{\\mathrm{AB}}^2=9+1=10$, $\\overline{\\mathrm{BC}}^2=(a-4)^2+9$, $\\overline{\\mathrm{AC}}^2=(a-1)^2+16$입니다. $10+(a-4)^2+9=(a-1)^2+16$을 전개하면 $a^2-8a+35=a^2-2a+17$, $6a=18$, $a=3$입니다. (확인: $\\overline{\\mathrm{BC}}^2=10$, $\\overline{\\mathrm{AC}}^2=20=10+10$)',
      },
    ],

    deeper: [
      {
        title: '좌표로 증명하는 중선 정리',
        body: '삼각형 $\\mathrm{ABC}$에서 변 $\\mathrm{BC}$의 중점을 $\\mathrm{M}$이라 하면\n\n$\\overline{\\mathrm{AB}}^2+\\overline{\\mathrm{AC}}^2=2\\left(\\overline{\\mathrm{AM}}^2+\\overline{\\mathrm{BM}}^2\\right)$\n\n이 성립합니다(**중선 정리**, 파푸스의 정리). 도형만으로 증명하면 보조선이 필요하지만, 좌표를 쓰면 계산으로 끝납니다.\n\n$\\mathrm{M}$을 원점에, 변 $\\mathrm{BC}$를 $x$축 위에 놓아 $\\mathrm{B}(-c, 0)$, $\\mathrm{C}(c, 0)$, $\\mathrm{A}(a, b)$라 합니다. 그러면\n$\\overline{\\mathrm{AB}}^2+\\overline{\\mathrm{AC}}^2=\\{(a+c)^2+b^2\\}+\\{(a-c)^2+b^2\\}=2(a^2+b^2+c^2)$\n이고, $\\overline{\\mathrm{AM}}^2=a^2+b^2$, $\\overline{\\mathrm{BM}}^2=c^2$이므로 두 변이 같습니다.\n\n> 💡 좌표를 잡을 때는 계산이 쉬워지도록 중요한 점을 원점에, 중요한 선분을 축 위에 놓습니다. 이것이 **좌표기하**의 힘입니다.',
      },
      {
        title: '내분점은 가중평균, 그리고 다음 단원',
        body: '내분점 $\\dfrac{mx_2+nx_1}{m+n}$은 두 좌표에 무게 $m$, $n$을 주어 평균을 낸 **가중평균**입니다. 무게가 같으면($m=n$) 보통 평균, 곧 중점이 됩니다. 무게중심이 세 꼭짓점의 평균인 것도 같은 생각입니다.\n\n이 단원의 거리 공식은 앞으로 계속 쓰입니다. 다음 단원에서는 점과 직선 사이의 거리를 구하고, 그다음 단원에서는 "한 점에서 거리가 일정한 점들의 모임"인 원을 $(x-a)^2+(y-b)^2=r^2$이라는 방정식으로 나타냅니다. 이 식은 바로 두 점 사이의 거리 공식을 제곱한 것입니다.',
      },
    ],

    faq: [
      {
        q: '거리 공식에서 $x_2-x_1$로 빼야 하나요, $x_1-x_2$로 빼야 하나요?',
        a: '어느 쪽으로 빼도 됩니다. $(x_2-x_1)^2=(x_1-x_2)^2$처럼 제곱하면 부호가 사라지기 때문입니다. 다만 $x$좌표와 $y$좌표에서 빼는 순서를 같게 해 두면 실수가 줄어듭니다.',
      },
      {
        q: '내분점 공식에서 $m$과 $n$을 어느 좌표에 곱하는지 자꾸 헷갈려요.',
        a: '$\\overline{\\mathrm{AP}}:\\overline{\\mathrm{PB}}=m:n$일 때 $m$은 $\\mathrm{B}$, $n$은 $\\mathrm{A}$와 곱합니다(엇갈려 곱하기). 헷갈리면 극단적인 경우로 확인하세요. 비가 $1:0$에 가까우면 $\\mathrm{P}$는 $\\mathrm{B}$에 붙어야 하므로 $m$이 $\\mathrm{B}$에 곱해져야 맞습니다. 답을 구한 뒤 $\\mathrm{P}$가 어느 끝점에 더 가까운지 확인하는 습관도 좋습니다.',
      },
      {
        q: '답에 근호가 있으면 어떻게 입력하나요?',
        a: '√ 기호나 sqrt를 씁니다. 예를 들어 $2\\sqrt{5}$는 2√5 또는 2sqrt(5)로 입력합니다. $\\sqrt{20}$처럼 간단히 하지 않은 꼴로 써도 값이 같으면 정답으로 처리됩니다.',
      },
      {
        q: '무게중심 공식은 왜 3으로 나누나요?',
        a: '무게중심은 세 꼭짓점의 좌표의 평균이기 때문입니다. 중선을 $2:1$로 내분하는 점을 공식대로 계산하면 $\\frac{x_1+x_2+x_3}{3}$이 나옵니다. 두 점의 평균(중점)은 2로, 세 점의 평균(무게중심)은 3으로 나눈다고 기억하면 됩니다.',
      },
    ],

    mistakes: [
      '거리 공식에서 가로 차와 세로 차를 그냥 더하는 실수 — $\\mathrm{A}(1, 1)$, $\\mathrm{B}(4, 5)$ 사이의 거리는 $3+4=7$이 아니라 $\\sqrt{3^2+4^2}=5$입니다.',
      '내분점 공식에서 $m$과 $n$을 거꾸로 곱하는 실수 — $m:n$으로 내분하면 $m$은 끝점 $\\mathrm{B}$의 좌표와 곱합니다. 답이 어느 끝점에 가까운지 확인하세요.',
      '중점이나 무게중심을 구할 때 좌표를 더하기만 하고 2나 3으로 나누는 것을 잊는 실수.',
    ],

    gens: [
      {
        id: 'dist-plane',
        level: 1,
        title: '좌표평면 위의 두 점 사이의 거리',
        make: function (R) {
          var x1 = R.int(-5, 5), y1 = R.int(-5, 5);
          var dx = R.nonzero(-6, 6), dy = R.nonzero(-6, 6);
          var x2 = x1 + dx, y2 = y1 + dy;
          var adx = Math.abs(dx), ady = Math.abs(dy);
          var d2 = dx * dx + dy * dy;
          var simple = radTex(d2);
          var tail = simple === '\\sqrt{' + d2 + '}' ? '' : '=' + simple;
          return {
            type: 'short', check: 'expr', concept: 1,
            q: '두 점 $\\mathrm{A}' + ptTex(x1, y1) + '$, $\\mathrm{B}' + ptTex(x2, y2) + '$ 사이의 거리를 구하세요. (근호는 √ 또는 sqrt로 입력합니다. 예: 2√5)',
            answer: radExpr(d2),
            wrong: [
              { a: String(adx + ady), why: '가로 차 ' + adx + R.josa(adx, '과/와') + ' 세로 차 ' + ady + R.josa(ady, '을/를') + ' 그냥 더했습니다. 각각 제곱해 더한 뒤 근호를 씌웁니다.' },
              { a: String(d2), why: '제곱의 합까지는 맞습니다. 마지막에 근호를 씌워야 합니다.' },
            ],
            explain: '$\\overline{\\mathrm{AB}}=\\sqrt{(' + x2 + '-' + par(x1) + ')^2+(' + y2 + '-' + par(y1) + ')^2}=\\sqrt{' + par(dx) + '^2+' + par(dy) + '^2}=\\sqrt{' + (dx * dx) + '+' + (dy * dy) + '}=\\sqrt{' + d2 + '}' + tail + '$입니다.',
          };
        },
      },
      {
        id: 'centroid',
        level: 1,
        title: '삼각형의 무게중심의 좌표',
        make: function (R) {
          var gx, gy, ax, ay, bx, by, cx, cy, tries = 0;
          do {
            gx = R.nonzero(-3, 3); gy = R.nonzero(-3, 3);
            ax = R.int(-5, 5); ay = R.int(-5, 5);
            bx = R.int(-5, 5); by = R.int(-5, 5);
            cx = 3 * gx - ax - bx; cy = 3 * gy - ay - by;
            tries++;
          } while (tries < 50 && (bx - ax) * (cy - ay) - (by - ay) * (cx - ax) === 0);
          var correct = fracPt(R, gx, gy, 1);
          var cands = [
            [fracPt(R, 3 * gx, 3 * gy, 1), '세 좌표를 더하기만 하고 3으로 나누지 않았습니다.'],
            [fracPt(R, 3 * gx, 3 * gy, 2), '세 좌표의 합을 2로 나누었습니다. 꼭짓점이 3개이므로 3으로 나눕니다.'],
            [fracPt(R, bx + cx, by + cy, 2), '변 BC의 중점을 구했습니다. 무게중심은 세 꼭짓점의 좌표의 평균입니다.'],
            [fracPt(R, ax + bx, ay + by, 2), '변 AB의 중점을 구했습니다. 무게중심은 세 꼭짓점의 좌표의 평균입니다.'],
            [fracPt(R, gy, gx, 1), '$x$좌표와 $y$좌표를 바꾸어 썼습니다.'],
          ];
          var reason = {};
          cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
          var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
          return {
            type: 'choice', concept: 5,
            q: '세 점 $\\mathrm{A}' + ptTex(ax, ay) + '$, $\\mathrm{B}' + ptTex(bx, by) + '$, $\\mathrm{C}' + ptTex(cx, cy) + '$를 꼭짓점으로 하는 삼각형 $\\mathrm{ABC}$의 무게중심의 좌표는 무엇입니까?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: '무게중심의 좌표는 세 꼭짓점의 좌표의 평균입니다.\n\n$\\left(\\dfrac{' + ax + '+' + par(bx) + '+' + par(cx) + '}{3}, \\dfrac{' + ay + '+' + par(by) + '+' + par(cy) + '}{3}\\right)=\\left(\\dfrac{' + (3 * gx) + '}{3}, \\dfrac{' + (3 * gy) + '}{3}\\right)=' + ptTex(gx, gy) + '$입니다.',
          };
        },
      },
      {
        id: 'divide-plane',
        level: 2,
        title: '좌표평면 위의 선분의 내분점',
        make: function (R) {
          var mn = R.pick([[1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2], [1, 4], [4, 1], [3, 4], [4, 3]]);
          var m = mn[0], n = mn[1], s = m + n;
          var dx = R.nonzero(-2, 2), dy = R.nonzero(-2, 2);
          var ax = R.int(-5, 5), ay = R.int(-5, 5);
          var bx = ax + s * dx, by = ay + s * dy;
          var px = ax + m * dx, py = ay + m * dy;
          var correct = fracPt(R, px, py, 1);
          var cands = [
            [fracPt(R, ax + n * dx, ay + n * dy, 1), '비를 거꾸로 곱해 $' + n + ':' + m + '$' + R.josa(m, '으로/로') + ' 내분하는 점을 구했습니다. 앞 수 $' + m + '$' + R.josa(m, '은/는') + ' B의 좌표와 곱합니다.'],
            [fracPt(R, px, ay + n * dy, 1), '$y$좌표를 구할 때 비를 거꾸로 곱했습니다.'],
            [fracPt(R, ax + n * dx, py, 1), '$x$좌표를 구할 때 비를 거꾸로 곱했습니다.'],
            [fracPt(R, ax + bx, ay + by, 2), '중점을 구했습니다. 비가 $1:1$일 때만 중점입니다.'],
            [fracPt(R, s * px, s * py, 1), '분자까지만 계산했습니다. $' + m + '+' + n + '=' + s + '$' + R.josa(s, '으로/로') + ' 나누어야 합니다.'],
          ];
          var reason = {};
          cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
          var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
          return {
            type: 'choice', concept: 4,
            q: '두 점 $\\mathrm{A}' + ptTex(ax, ay) + '$, $\\mathrm{B}' + ptTex(bx, by) + '$에 대하여 선분 $\\mathrm{AB}$를 $' + m + ':' + n + '$' + R.josa(n, '으로/로') + ' 내분하는 점의 좌표는 무엇입니까?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: '$x$좌표: $\\dfrac{' + m + '\\times' + par(bx) + '+' + n + '\\times' + par(ax) + '}{' + s + '}=\\dfrac{' + (s * px) + '}{' + s + '}=' + px + '$\n\n' +
              '$y$좌표: $\\dfrac{' + m + '\\times' + par(by) + '+' + n + '\\times' + par(ay) + '}{' + s + '}=\\dfrac{' + (s * py) + '}{' + s + '}=' + py + '$\n\n따라서 내분점은 ' + correct + '입니다.',
          };
        },
      },
      {
        id: 'equidistant-axis',
        level: 2,
        title: '두 점에서 같은 거리에 있는 축 위의 점',
        make: function (R) {
          // 거리의 제곱이 같은 (u, v) 묶음: u 는 축 방향, v 는 축에서 떨어진 정도
          var groups = [
            [[1, 7], [5, 5], [7, 1]], [[1, 8], [4, 7], [7, 4], [8, 1]], [[1, 2], [2, 1]], [[1, 3], [3, 1]],
            [[2, 3], [3, 2]], [[1, 4], [4, 1]], [[2, 4], [4, 2]], [[1, 5], [5, 1]], [[2, 5], [5, 2]], [[3, 4], [4, 3]], [[3, 5], [5, 3]],
          ];
          var two = R.sample(R.pick(groups), 2);
          var e1 = two[0], e2 = two[1];
          var a = R.int(-3, 3);
          var u1 = R.sign() * e1[0], v1 = R.sign() * e1[1];
          var u2 = R.sign() * e2[0], v2 = R.sign() * e2[1];
          var onX = R.bool();
          var A, B, axis, P;
          if (onX) { A = [a + u1, v1]; B = [a + u2, v2]; axis = 'x'; P = '(a, 0)'; }
          else { A = [v1, a + u1]; B = [v2, a + u2]; axis = 'y'; P = '(0, a)'; }
          var k = onX ? 0 : 1;            // 축 방향 좌표의 자리
          var o = 1 - k;                  // 다른 좌표의 자리
          var coef = 2 * (B[k] - A[k]);
          var rhs = (B[0] * B[0] + B[1] * B[1]) - (A[0] * A[0] + A[1] * A[1]);
          var midTwice = A[k] + B[k];
          var wrong = [];
          if (midTwice !== 2 * a) {
            wrong.push({ a: R.F(midTwice, 2).toString(), why: '선분 AB의 중점의 $' + axis + '$좌표를 구했습니다. 중점은 $' + axis + '$축 위에 있지 않습니다. 점 P를 $' + P + '$' + R.josa(onX ? 0 : 'a', '으로/로') + ' 놓고 거리의 제곱이 같다는 식을 풀어 보세요.' });
          }
          var sq = function (t) { return '(a-' + par(t) + ')^2'; };
          return {
            type: 'short', check: 'number', concept: 1,
            q: '$' + axis + '$축 위의 점 $\\mathrm{P}$가 두 점 $\\mathrm{A}' + ptTex(A[0], A[1]) + '$, $\\mathrm{B}' + ptTex(B[0], B[1]) + '$에서 같은 거리에 있습니다. 점 $\\mathrm{P}$의 $' + axis + '$좌표를 구하세요.',
            answer: String(a),
            hint: '$\\mathrm{P}' + P + '$' + R.josa(onX ? 0 : 'a', '으로/로') + ' 놓고 $\\overline{\\mathrm{PA}}^2=\\overline{\\mathrm{PB}}^2$을 세워 보세요.',
            wrong: wrong,
            explain: '$\\mathrm{P}' + P + '$' + (onX ? '이라' : '라') + ' 하면 $\\overline{\\mathrm{PA}}^2=\\overline{\\mathrm{PB}}^2$에서\n\n$' + sq(A[k]) + '+' + par(A[o]) + '^2=' + sq(B[k]) + '+' + par(B[o]) + '^2$\n\n' +
              '양변의 $a^2$이 지워지므로 정리하면 $' + coef + 'a=' + rhs + '$, 곧 $a=' + a + '$입니다.\n\n' +
              '(확인: $\\overline{\\mathrm{PA}}^2=' + (u1 * u1 + v1 * v1) + '$, $\\overline{\\mathrm{PB}}^2=' + (u2 * u2 + v2 * v2) + '$)',
          };
        },
      },
    ],
  });
})();
