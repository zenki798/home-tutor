/* 확률과 통계학 · 연속확률분포
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 표준정규분포표 값 P(0≤Z≤z)(소수 넷째 자리)는 문제마다 함께 준다. 지수분포 확률은 e 를 남긴 꼴(choice)로 묻는다.
 * 표본분포·중심극한정리(5단원)는 풀이에 쓰지 않는다. 적분은 앞 과정(미적분학)에서 배운 것을 쓴다. */
(function () {
  function r1(v) { var t = Math.round(v * 10) / 10; return t === 0 ? 0 : t; }
  function txt(x, y, s, size, anchor) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '" text-anchor="' + (anchor || 'middle') + '" fill="currentColor">' + s + '</text>';
  }
  // 밀도함수 그림: fn(x) 를 [x0, x1] 에서 그리고 shade = [a, b] 를 색칠, ticks = [[x, 글], …]
  function densSvg(o) {
    var L = 30, Rt = 286, T = 14, B = 128;
    function px(x) { return L + (Rt - L) * (x - o.x0) / (o.x1 - o.x0); }
    function py(y) { return B - (B - T) * y / o.ymax; }
    var n = 120, pts = [], i, x;
    var s = '';
    if (o.shade) {
      var a = o.shade[0], b = o.shade[1], sh = [];
      for (i = 0; i <= 60; i++) { x = a + (b - a) * i / 60; sh.push(r1(px(x)) + ',' + r1(py(o.fn(x)))); }
      s += '<polygon points="' + r1(px(a)) + ',' + B + ' ' + sh.join(' ') + ' ' + r1(px(b)) + ',' + B + '" fill="var(--fig-2)" fill-opacity="0.5" stroke="none"/>';
    }
    s += '<line x1="' + (L - 8) + '" y1="' + B + '" x2="' + (Rt + 8) + '" y2="' + B + '" stroke="currentColor" stroke-width="1.2"/>';
    if (o.yaxis !== false) s += '<line x1="' + r1(px(o.yaxisAt || 0)) + '" y1="' + (B + 4) + '" x2="' + r1(px(o.yaxisAt || 0)) + '" y2="' + (T - 8) + '" stroke="currentColor" stroke-width="1.2"/>';
    var from = o.from === undefined ? o.x0 : o.from, to = o.to === undefined ? o.x1 : o.to;
    for (i = 0; i <= n; i++) { x = from + (to - from) * i / n; pts.push(r1(px(x)) + ',' + r1(py(o.fn(x)))); }
    s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="currentColor" stroke-width="2"/>';
    (o.vlines || []).forEach(function (v) {
      s += '<line x1="' + r1(px(v)) + '" y1="' + B + '" x2="' + r1(px(v)) + '" y2="' + r1(py(o.fn(v))) + '" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>';
    });
    (o.ticks || []).forEach(function (t) {
      s += '<line x1="' + r1(px(t[0])) + '" y1="' + (B - 3) + '" x2="' + r1(px(t[0])) + '" y2="' + (B + 3) + '" stroke="currentColor" stroke-width="1"/>';
      s += txt(px(t[0]), B + 16, t[1], 11);
    });
    (o.yticks || []).forEach(function (t) {
      s += '<line x1="' + r1(px(o.yaxisAt || 0) - 3) + '" y1="' + r1(py(t[0])) + '" x2="' + r1(px(o.yaxisAt || 0) + 3) + '" y2="' + r1(py(t[0])) + '" stroke="currentColor" stroke-width="1"/>';
      s += txt(px(o.yaxisAt || 0) - 6, py(t[0]) + 4, t[1], 11, 'end');
    });
    if (o.label) s += txt(o.label[0], o.label[1], o.label[2], 12, 'start');
    s += txt(Rt + 8, B + 16, 'x', 12, 'end');
    return { type: 'svg', alt: o.alt, svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">' + s + '</svg>' };
  }
  function phi(z) { return Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI); }
  function stdNormFig(shade, ticks, alt) {
    return densSvg({ fn: phi, x0: -3.6, x1: 3.6, ymax: 0.42, shade: shade, ticks: ticks, vlines: shade, yaxis: false, alt: alt });
  }
  // 표준정규분포표: P(0 ≤ Z ≤ z) × 10000
  var TBL = { 5: 1915, 10: 3413, 15: 4332, 20: 4772, 25: 4938 };
  var TABLE = '| $z$ | 0.5 | 1.0 | 1.5 | 2.0 | 2.5 |\n|---|---|---|---|---|---|\n| $P(0\\le Z\\le z)$ | 0.1915 | 0.3413 | 0.4332 | 0.4772 | 0.4938 |';
  function ansText(f) { var d = f.toDecimal(8); return d === null ? f.toString() : d; }
  function texOf(f) { var d = f.toDecimal(8); return d === null ? f.toTex() : d; }
  // 틀린 답 목록: 정답과 값이 같거나 서로 겹치는 것, 0 이하는 뺀다 (Frac 끼리 비교)
  function W(ans, list) {
    var seen = [ans], out = [];
    list.forEach(function (w) {
      var v = w[0];
      if (!v || v.sign() <= 0) return;
      for (var i = 0; i < seen.length; i++) if (seen[i].eq(v)) return;
      seen.push(v);
      out.push({ a: ansText(v), why: w[1] });
    });
    return out;
  }
  // e^{-지수} 의 TeX (지수는 Frac)
  function ePow(f) {
    if (f.isInt()) return 'e^{-' + f.toString() + '}';
    return 'e^{-' + f.num + '/' + f.den + '}';
  }

  Tutor.registerUnit({
    id: 'math-u-stat-04',
    course: 'math-u-stat',
    title: '연속확률분포',
    summary: '확률밀도함수와 누적분포함수로 연속확률변수의 확률을 적분으로 구하고, 기댓값과 분산을 계산합니다. 균등분포·정규분포·지수분포의 성질과 표준화를 익힙니다.',
    goals: [
      '확률밀도함수의 조건을 알고, 적분으로 확률·누적분포함수·기댓값·분산을 구할 수 있다.',
      '균등분포의 확률과 평균·분산을 구할 수 있다.',
      '정규분포를 표준화하여 표준정규분포표로 확률을 구할 수 있다.',
      '지수분포로 기다리는 시간의 확률을 구하고 무기억성을 설명할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '확률밀도함수와 누적분포함수',
        body: '키, 시간, 무게처럼 구간 안의 어떤 실수 값이든 가질 수 있는 확률변수를 **연속확률변수**라고 합니다. 연속확률변수의 확률은 **확률밀도함수**(pdf) $f(x)$ 아래의 넓이로 정합니다.\n\n' +
          '$P(a\\le X\\le b)=\\int_{a}^{b}f(x)\\,dx$\n\n' +
          '확률밀도함수의 조건은 두 가지입니다: 모든 $x$에서 $f(x)\\ge0$, 그리고 $\\int_{-\\infty}^{\\infty}f(x)\\,dx=1$.\n\n' +
          '- 한 점의 확률은 넓이가 없으므로 $P(X=a)=0$입니다. 그래서 $P(a\\le X\\le b)=P(a<X<b)$처럼 등호가 있든 없든 확률이 같습니다.\n' +
          '- $f(x)$ 자체는 확률이 아니라 "확률의 밀도"입니다. 넓이만 1이면 되므로 $f(x)$가 1보다 큰 곳이 있어도 됩니다.\n\n' +
          '**누적분포함수**는 $F(x)=P(X\\le x)=\\int_{-\\infty}^{x}f(t)\\,dt$이고, 미적분학의 기본정리에 따라 $F^{\\prime}(x)=f(x)$입니다. 또 $P(a<X\\le b)=F(b)-F(a)$입니다.\n\n' +
          '예: $f(x)=2x\\ (0\\le x\\le1)$, 그 밖에서는 0이면 $\\int_{0}^{1}2x\\,dx=1$이므로 확률밀도함수입니다. $F(x)=x^{2}\\ (0\\le x\\le1)$이고 $P\\left(X\\le\\frac{1}{2}\\right)=\\frac{1}{4}$입니다.',
        easy: '모래를 바닥에 쏟아 무더기를 만들었다고 생각해 보세요. 모래 전체의 양이 1이고, 어느 구간에 모래가 얼마나 있는지가 확률입니다.\n\n' +
          '무더기의 높이가 확률밀도함수 $f(x)$입니다. 높이가 높은 곳에 모래가 많이 몰려 있지만, 한 점 위의 모래는 두께가 없으니 양이 0입니다. 그래서 연속확률변수에서는 "정확히 한 값"의 확률이 0입니다.',
        fig: densSvg({ fn: function (x) { return x >= 0 && x <= 1 ? 2 * x : 0; }, x0: -0.15, x1: 1.25, from: 0, to: 1, ymax: 2.15, shade: [0, 0.5], vlines: [1], ticks: [[0, '0'], [0.5, '0.5'], [1, '1']], yticks: [[1, '1'], [2, '2']], alt: '확률밀도함수 y=2x(0≤x≤1)의 그래프. 0부터 0.5까지 그래프 아래가 색칠되어 있고 그 넓이는 1/4이다' }),
        check: {
          type: 'short', check: 'number',
          q: '확률밀도함수가 $f(x)=2x\\ (0\\le x\\le1)$, 그 밖에서는 0인 확률변수 $X$에 대하여 $P(X\\le0.5)$를 구하세요.',
          answer: '0.25',
          wrong: [{ a: '1', why: '밀도함수의 값 $f(0.5)=1$을 답했습니다. 확률은 그래프 아래의 넓이입니다.' }, { a: '0.5', why: '구간의 길이를 답했습니다. 밀도가 고르지 않으므로 넓이를 적분으로 구합니다.' }],
          explain: '$P(X\\le0.5)=\\int_{0}^{0.5}2x\\,dx=\\left[x^{2}\\right]_{0}^{0.5}=0.25$입니다.',
        },
      },
      {
        title: '연속확률변수의 기댓값과 분산',
        body: '이산형의 합 $\\sum$이 연속형에서는 적분 $\\int$로 바뀝니다.\n\n' +
          '$E(X)=\\int_{-\\infty}^{\\infty}x\\,f(x)\\,dx$, $E(g(X))=\\int_{-\\infty}^{\\infty}g(x)\\,f(x)\\,dx$\n\n' +
          '$\\mathrm{Var}(X)=E(X^{2})-\\{E(X)\\}^{2}$, 표준편차 $\\sigma=\\sqrt{\\mathrm{Var}(X)}$\n\n' +
          '$E(aX+b)=aE(X)+b$, $\\mathrm{Var}(aX+b)=a^{2}\\mathrm{Var}(X)$ 같은 성질은 이산형과 똑같이 성립합니다.\n\n' +
          '예: $f(x)=2x\\ (0\\le x\\le1)$이면\n' +
          '$E(X)=\\int_{0}^{1}x\\cdot2x\\,dx=\\dfrac{2}{3}$, $E(X^{2})=\\int_{0}^{1}x^{2}\\cdot2x\\,dx=\\dfrac{1}{2}$\n' +
          '$\\mathrm{Var}(X)=\\dfrac{1}{2}-\\left(\\dfrac{2}{3}\\right)^{2}=\\dfrac{1}{18}$\n\n' +
          '기댓값은 밀도함수 그래프를 판자로 오렸을 때 **균형이 맞는 점**(무게중심의 $x$좌표)입니다. 위 예에서 오른쪽이 무거우므로 평균이 구간의 가운데 0.5보다 오른쪽인 $\\frac{2}{3}$에 있습니다.',
        easy: '시소 위에 모래를 쌓았는데 오른쪽에 더 많이 쌓였다면, 시소가 수평이 되는 받침점은 가운데보다 오른쪽에 있어야 합니다. 이 받침점이 기댓값입니다.\n\n' +
          '계산은 이산형과 같은 생각입니다. "값 × 확률"을 모두 더하는 대신 "값 × 밀도"를 적분합니다.',
        check: {
          type: 'short', check: 'number',
          q: '확률밀도함수가 $f(x)=3x^{2}\\ (0\\le x\\le1)$, 그 밖에서는 0인 확률변수 $X$의 기댓값 $E(X)$를 구하세요.',
          answer: '3/4',
          wrong: [{ a: '1/2', why: '구간의 가운데를 답했습니다. 밀도가 오른쪽으로 갈수록 커지므로 평균은 0.5보다 큽니다.' }, { a: '1', why: '$\\int f(x)\\,dx$를 구했습니다. 기댓값은 $\\int x\\,f(x)\\,dx$입니다.' }, { a: '3/5', why: '$E(X^{2})=\\int x^{2}f(x)\\,dx$를 구했습니다.' }],
          explain: '$E(X)=\\int_{0}^{1}x\\cdot3x^{2}\\,dx=\\left[\\dfrac{3x^{4}}{4}\\right]_{0}^{1}=\\dfrac{3}{4}$입니다.',
        },
      },
      {
        title: '균등분포',
        body: '구간 $[a, b]$ 안의 모든 값이 "똑같이 나올 법한" 확률변수는 **균등분포** $U(a, b)$를 따릅니다. 밀도가 일정해야 넓이가 1이 되므로\n\n' +
          '$f(x)=\\dfrac{1}{b-a}\\ (a\\le x\\le b)$, 그 밖에서는 0\n\n' +
          '그래서 확률은 **길이의 비율**입니다. $a\\le c\\le d\\le b$이면 $P(c\\le X\\le d)=\\dfrac{d-c}{b-a}$입니다.\n\n' +
          '$E(X)=\\dfrac{a+b}{2}$, $\\mathrm{Var}(X)=\\dfrac{(b-a)^{2}}{12}$\n\n' +
          '분산은 $E(X^{2})=\\int_{a}^{b}\\dfrac{x^{2}}{b-a}\\,dx=\\dfrac{a^{2}+ab+b^{2}}{3}$에서 $\\left(\\dfrac{a+b}{2}\\right)^{2}$을 빼서 얻습니다.\n\n' +
          '예: 버스가 20분 간격으로 오고 정류장에 아무 때나 도착한다면 기다리는 시간은 $U(0, 20)$입니다. 15분 넘게 기다릴 확률은 $\\dfrac{20-15}{20}=\\dfrac{1}{4}$, 평균 대기 시간은 10분입니다.',
        easy: '20 cm 길이의 막대에 눈을 감고 점 하나를 찍는다고 생각해 보세요. 어느 곳이든 똑같이 찍힐 수 있다면, 오른쪽 끝 5 cm 안에 찍힐 확률은 길이의 비율 $\\frac{5}{20}$입니다.\n\n' +
          '균등분포는 이렇게 "확률 = 길이의 비율"로 계산하는 가장 단순한 연속분포입니다.',
        fig: densSvg({ fn: function () { return 0.05; }, x0: -3, x1: 23, from: 0, to: 20, ymax: 0.07, shade: [15, 20], vlines: [0, 20], ticks: [[0, '0'], [10, '10'], [15, '15'], [20, '20']], yticks: [[0.05, '1/20']], alt: '구간 0부터 20까지 높이 1/20로 평평한 균등분포의 밀도함수. 15부터 20까지가 색칠되어 있다' }),
        check: {
          type: 'short', check: 'number',
          q: '$X$가 균등분포 $U(2, 10)$을 따를 때 $P(3\\le X\\le7)$을 구하세요.',
          answer: '0.5',
          wrong: [{ a: '4', why: '구간의 길이에서 멈추었습니다. 전체 길이 8로 나누어야 합니다.' }, { a: '0.4', why: '전체 길이를 10으로 보았습니다. 구간 $[2, 10]$의 길이는 8입니다.' }],
          explain: '$P(3\\le X\\le7)=\\dfrac{7-3}{10-2}=\\dfrac{4}{8}=0.5$입니다.',
        },
      },
      {
        title: '정규분포와 표준화',
        body: '평균 $\\mu$, 분산 $\\sigma^{2}$인 **정규분포** $N(\\mu, \\sigma^{2})$의 확률밀도함수는\n\n' +
          '$f(x)=\\dfrac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{(x-\\mu)^{2}}{2\\sigma^{2}}}$\n\n' +
          '입니다. 그래프는 $x=\\mu$에 대하여 대칭인 종 모양이고, $\\sigma$가 클수록 낮고 넓게 퍼집니다. 측정 오차, 키, 시험 점수처럼 많은 작은 요인이 더해진 양이 이 분포에 가깝습니다.\n\n' +
          '이 함수는 손으로 적분할 수 없으므로 **표준화**를 합니다. $X$가 $N(\\mu, \\sigma^{2})$을 따르면\n\n' +
          '$Z=\\dfrac{X-\\mu}{\\sigma}$는 **표준정규분포** $N(0, 1)$을 따릅니다.\n\n' +
          '그리고 $P(0\\le Z\\le z)$의 값을 적은 **표준정규분포표**로 확률을 구합니다. 대칭성 $P(Z\\le0)=0.5$, $P(Z\\le-z)=P(Z\\ge z)$를 함께 씁니다.\n\n' +
          '예: 키가 $N(170, 6^{2})$을 따를 때 182 cm 이상일 확률은 $P(X\\ge182)=P\\left(Z\\ge\\frac{182-170}{6}\\right)=P(Z\\ge2)=0.5-0.4772=0.0228$입니다.\n\n' +
          '> 💡 **68-95-99.7 규칙**: 정규분포에서 평균으로부터 표준편차 1개, 2개, 3개 안에 각각 약 68%, 95%, 99.7%의 값이 들어갑니다.',
        easy: '학교마다 시험의 평균과 표준편차가 달라도, 점수를 "평균에서 표준편차 몇 개만큼 떨어졌나"(z-점수)로 바꾸면 모두 같은 자로 잴 수 있습니다.\n\n' +
          '정규분포도 마찬가지입니다. 어떤 정규분포든 표준화하면 표준정규분포 하나가 되므로, 표 하나만 있으면 모든 정규분포의 확률을 구할 수 있습니다.',
        fig: stdNormFig([-1, 1], [[-2, '-2'], [-1, '-1'], [0, '0'], [1, '1'], [2, '2']], '표준정규분포 곡선. -1부터 1까지 색칠되어 있고 그 넓이는 약 0.68이다'),
        check: {
          type: 'short', check: 'number',
          q: '$Z$가 표준정규분포를 따르고 $P(0\\le Z\\le1)=0.3413$입니다. $P(Z\\le1)$을 구하세요.',
          answer: '0.8413',
          wrong: [{ a: '0.3413', why: '$0\\le Z\\le1$ 부분만 구했습니다. $Z\\le0$인 부분 0.5를 더해야 합니다.' }, { a: '0.1587', why: '$P(Z\\ge1)$을 구했습니다.' }],
          explain: '$P(Z\\le1)=P(Z\\le0)+P(0\\le Z\\le1)=0.5+0.3413=0.8413$입니다.',
        },
      },
      {
        title: '지수분포와 기다리는 시간',
        body: '사건이 단위 시간당 평균 $\\lambda$번, 서로 독립적으로(포아송 분포를 따라) 일어날 때 **다음 사건까지 기다리는 시간** $X$는 **지수분포** $\\mathrm{Exp}(\\lambda)$를 따릅니다.\n\n' +
          '$f(x)=\\lambda e^{-\\lambda x}\\ (x\\ge0)$, $F(x)=1-e^{-\\lambda x}$, $P(X>t)=e^{-\\lambda t}$\n\n' +
          '$E(X)=\\dfrac{1}{\\lambda}$, $\\mathrm{Var}(X)=\\dfrac{1}{\\lambda^{2}}$\n\n' +
          '$P(X>t)$는 "시간 $t$ 동안 사건이 한 번도 일어나지 않을 확률"이고, 이것은 평균 $\\lambda t$인 포아송 분포에서 0번일 확률 $e^{-\\lambda t}$과 같습니다.\n\n' +
          '예: 손님이 평균 10분에 한 명꼴로 오면 $\\lambda=\\frac{1}{10}$(분당)이고, 5분 넘게 아무도 오지 않을 확률은 $e^{-5/10}=e^{-1/2}\\approx0.607$입니다.\n\n' +
          '지수분포는 **무기억성** $P(X>s+t|X>s)=P(X>t)$를 가집니다. 이미 $s$분을 기다렸어도 앞으로 $t$분 더 기다릴 확률은 처음과 같습니다.\n\n' +
          '> ⚠️ 모수를 평균 $\\theta=\\frac{1}{\\lambda}$로 쓰는 책도 있습니다. "평균 10분"이면 $\\lambda=0.1$, $\\theta=10$입니다. 문제에서 어느 쪽인지 확인합니다.',
        easy: '고장이 "나이를 먹지 않는" 부품을 생각해 보세요. 새것이든 100시간 쓴 것이든 앞으로 1시간 안에 고장 날 확률이 똑같습니다. 이런 부품의 수명이 지수분포입니다.\n\n' +
          '그래프는 0에서 가장 높고 오른쪽으로 갈수록 빠르게 줄어듭니다. 짧게 기다리는 일이 많고, 아주 오래 기다리는 일은 드뭅니다.',
        fig: densSvg({ fn: function (x) { return x < 0 ? 0 : 0.5 * Math.exp(-0.5 * x); }, x0: -0.6, x1: 8, from: 0, to: 8, ymax: 0.55, shade: [2, 8], vlines: [2], ticks: [[0, '0'], [2, '2'], [4, '4'], [6, '6']], alt: '지수분포의 밀도함수 그래프. x=0에서 가장 높고 오른쪽으로 갈수록 줄어든다. x=2부터 오른쪽이 색칠되어 있다' }),
        check: {
          type: 'choice',
          q: '$X$가 지수분포 $\\mathrm{Exp}(\\lambda)$를 따를 때 $P(X>t)$는 무엇입니까?',
          choices: ['$e^{-\\lambda t}$', '$1-e^{-\\lambda t}$', '$\\lambda e^{-\\lambda t}$'],
          answer: 0,
          why: ['', '누적분포함수 $F(t)=P(X\\le t)$입니다. $P(X>t)$는 1에서 이것을 뺀 값입니다.', '확률밀도함수 $f(t)$의 값입니다. 밀도는 확률이 아닙니다.'],
          explain: '$P(X>t)=\\int_{t}^{\\infty}\\lambda e^{-\\lambda x}\\,dx=\\left[-e^{-\\lambda x}\\right]_{t}^{\\infty}=e^{-\\lambda t}$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '확률변수 $X$의 확률밀도함수가 $f(x)=kx(2-x)\\ (0\\le x\\le2)$, 그 밖에서는 0입니다. 상수 $k$와 $P(X\\le1)$을 구하세요.',
        steps: [
          '넓이가 1이어야 하므로 $\\int_{0}^{2}k(2x-x^{2})\\,dx=k\\left[x^{2}-\\dfrac{x^{3}}{3}\\right]_{0}^{2}=k\\left(4-\\dfrac{8}{3}\\right)=\\dfrac{4k}{3}=1$입니다.',
          '따라서 $k=\\dfrac{3}{4}$입니다.',
          '$P(X\\le1)=\\dfrac{3}{4}\\left[x^{2}-\\dfrac{x^{3}}{3}\\right]_{0}^{1}=\\dfrac{3}{4}\\times\\dfrac{2}{3}=\\dfrac{1}{2}$입니다.',
          '확인: 그래프가 $x=1$에 대하여 대칭이므로 왼쪽 절반의 넓이가 $\\frac{1}{2}$인 것이 자연스럽습니다.',
        ],
        answer: '$k=\\dfrac{3}{4}$, $P(X\\le1)=\\dfrac{1}{2}$',
      },
      {
        q: '어느 공장에서 채우는 음료의 양이 정규분포 $N(500, 4^{2})$(단위: mL)을 따릅니다. 음료의 양이 494 mL 이상 508 mL 이하일 확률을 구하세요. ($P(0\\le Z\\le1.5)=0.4332$, $P(0\\le Z\\le2)=0.4772$)',
        steps: [
          '표준화합니다: $\\dfrac{494-500}{4}=-1.5$, $\\dfrac{508-500}{4}=2$',
          '$P(494\\le X\\le508)=P(-1.5\\le Z\\le2)$입니다.',
          '0을 기준으로 나누면 $P(-1.5\\le Z\\le0)+P(0\\le Z\\le2)$이고, 대칭성에 따라 $P(-1.5\\le Z\\le0)=P(0\\le Z\\le1.5)$입니다.',
          '$0.4332+0.4772=0.9104$입니다.',
        ],
        answer: '0.9104',
      },
    ],

    terms: [
      { term: '확률밀도함수', def: '연속확률변수에서 그래프 아래의 넓이가 확률이 되는 함수 $f(x)$입니다. $f(x)\\ge0$이고 전체 넓이가 1입니다.' },
      { term: '누적분포함수', def: '$F(x)=P(X\\le x)=\\int_{-\\infty}^{x}f(t)\\,dt$입니다. 연속형이면 $F^{\\prime}(x)=f(x)$입니다.' },
      { term: '연속확률변수', def: '구간 안의 모든 실수 값을 가질 수 있는 확률변수입니다. 한 점에서의 확률은 0입니다.' },
      { term: '균등분포', def: '구간 $[a, b]$에서 밀도가 $\\frac{1}{b-a}$로 일정한 분포 $U(a, b)$입니다. 평균 $\\frac{a+b}{2}$, 분산 $\\frac{(b-a)^{2}}{12}$' },
      { term: '정규분포', def: '평균 $\\mu$에 대하여 대칭인 종 모양의 분포 $N(\\mu, \\sigma^{2})$입니다.' },
      { term: '표준정규분포', def: '평균 0, 분산 1인 정규분포 $N(0, 1)$입니다. 보통 확률변수를 $Z$로 씁니다.' },
      { term: '표준화', def: '$X$가 $N(\\mu, \\sigma^{2})$을 따를 때 $Z=\\frac{X-\\mu}{\\sigma}$로 바꾸어 표준정규분포로 만드는 것입니다.' },
      { term: '68-95-99.7 규칙', def: '정규분포에서 평균으로부터 표준편차 1개, 2개, 3개 안에 각각 약 68%, 95%, 99.7%의 값이 들어간다는 규칙입니다.' },
      { term: '지수분포', def: '사건 사이의 기다리는 시간의 분포로, 밀도함수 $\\lambda e^{-\\lambda x}\\ (x\\ge0)$, 평균 $\\frac{1}{\\lambda}$입니다.' },
      { term: '무기억성', def: '$P(X>s+t|X>s)=P(X>t)$인 성질입니다. 이미 기다린 시간이 앞으로 기다릴 시간의 확률에 영향을 주지 않습니다. 연속분포에서는 지수분포가 이 성질을 가집니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '확률변수 $X$의 확률밀도함수가 $f(x)=kx\\ (0\\le x\\le4)$, 그 밖에서는 0일 때 상수 $k$를 구하세요.',
        answer: '1/8',
        hint: '그래프 아래의 넓이가 1이어야 합니다.',
        wrong: [{ a: '1/4', why: '$f(4)=1$이 되도록 정했습니다. 밀도의 값이 아니라 넓이가 1이어야 합니다.' }, { a: '1/16', why: '$\\int_{0}^{4}x\\,dx=8$인데 16으로 계산했습니다. $\\left[\\frac{x^{2}}{2}\\right]_{0}^{4}=8$입니다.' }],
        explain: '$\\int_{0}^{4}kx\\,dx=k\\left[\\dfrac{x^{2}}{2}\\right]_{0}^{4}=8k=1$이므로 $k=\\dfrac{1}{8}$입니다. (삼각형의 넓이 $\\frac{1}{2}\\times4\\times4k=8k$로 보아도 됩니다.)',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 0,
        q: '확률밀도함수 $f(x)$의 값은 확률이므로 1보다 클 수 없습니다.',
        answer: false,
        explain: '$f(x)$는 확률이 아니라 확률의 밀도입니다. 그래프 아래의 전체 넓이만 1이면 되므로, 예를 들어 $f(x)=2x\\ (0\\le x\\le1)$은 $x=1$ 근처에서 1보다 크지만 확률밀도함수입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 1,
        q: '확률밀도함수가 $f(x)=\\dfrac{x}{2}\\ (0\\le x\\le2)$, 그 밖에서는 0인 확률변수 $X$의 기댓값을 구하세요.',
        answer: '4/3',
        wrong: [{ a: '1', why: '구간의 가운데를 답했습니다. 밀도가 오른쪽으로 갈수록 커지므로 평균은 1보다 큽니다.' }, { a: '2', why: '$\\int_{0}^{2}x^{2}\\,dx$처럼 $\\frac{1}{2}$을 곱하지 않았습니다.' }],
        explain: '$E(X)=\\int_{0}^{2}x\\cdot\\dfrac{x}{2}\\,dx=\\left[\\dfrac{x^{3}}{6}\\right]_{0}^{2}=\\dfrac{8}{6}=\\dfrac{4}{3}$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', concept: 2,
        q: '$X$가 균등분포 $U(5, 25)$를 따를 때 $P(8\\le X\\le13)$을 구하세요.',
        answer: '0.25',
        wrong: [{ a: '5', why: '구간의 길이에서 멈추었습니다. 전체 길이 20으로 나누어야 합니다.' }, { a: '0.2', why: '전체 길이를 25로 보았습니다. 구간 $[5, 25]$의 길이는 20입니다.' }],
        explain: '$P(8\\le X\\le13)=\\dfrac{13-8}{25-5}=\\dfrac{5}{20}=0.25$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 2,
        q: '$X$가 균등분포 $U(0, 12)$를 따를 때 $\\mathrm{Var}(X)$를 구하세요.',
        answer: '12',
        wrong: [{ a: '6', why: '평균 $\\frac{0+12}{2}$를 구했습니다.' }, { a: '144', why: '12로 나누지 않았습니다. 분산은 $\\frac{(b-a)^{2}}{12}$입니다.' }, { a: '48', why: '$\\frac{(b-a)^{2}}{3}$은 $E(X^{2})$입니다. 평균의 제곱 36을 빼야 합니다.' }],
        explain: '$\\mathrm{Var}(X)=\\dfrac{(12-0)^{2}}{12}=\\dfrac{144}{12}=12$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 3,
        q: '$X$가 정규분포 $N(50, 10^{2})$을 따를 때 $P(X\\ge70)$을 구하세요. ($P(0\\le Z\\le2)=0.4772$)',
        answer: '0.0228',
        wrong: [{ a: '0.4772', why: '$P(0\\le Z\\le2)$를 그대로 답했습니다. $Z\\ge2$는 0.5에서 이것을 뺀 부분입니다.' }, { a: '0.9772', why: '$P(Z\\le2)$를 구했습니다. 부등호 방향을 확인하세요.' }],
        explain: '$Z=\\dfrac{70-50}{10}=2$이므로 $P(X\\ge70)=P(Z\\ge2)=0.5-0.4772=0.0228$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'number', unit: '분', concept: 4,
        q: '어떤 기계가 다음 고장까지 작동하는 시간 $X$(분)가 평균 4분인 지수분포를 따른다고 합니다. $X$의 표준편차를 구하세요.',
        answer: '4',
        wrong: [{ a: '16', why: '분산을 구했습니다. 지수분포의 분산은 $\\frac{1}{\\lambda^{2}}=16$이고 표준편차는 그 제곱근입니다.' }, { a: '0.25', why: '$\\lambda$를 답했습니다. 평균이 $\\frac{1}{\\lambda}=4$입니다.' }, { a: '2', why: '평균의 제곱근을 구했습니다. 지수분포는 표준편차가 평균과 같습니다.' }],
        explain: '평균이 $\\frac{1}{\\lambda}=4$이므로 $\\lambda=\\frac{1}{4}$이고, $\\mathrm{Var}(X)=\\frac{1}{\\lambda^{2}}=16$, 표준편차는 4분입니다. 지수분포는 평균과 표준편차가 같습니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 3,
        q: '$X$가 정규분포 $N(72, 8^{2})$을 따를 때 $P(60\\le X\\le84)$를 구하세요. ($P(0\\le Z\\le1.5)=0.4332$)',
        answer: '0.8664',
        hint: '양 끝을 표준화하면 0에 대하여 대칭인 구간이 됩니다.',
        wrong: [{ a: '0.4332', why: '한쪽 절반만 구했습니다. $-1.5\\le Z\\le0$ 부분도 같은 넓이입니다.' }, { a: '0.9332', why: '$P(Z\\le1.5)$를 구했습니다. 왼쪽 끝 $Z=-1.5$보다 작은 부분은 빼야 합니다.' }],
        explain: '$\\dfrac{60-72}{8}=-1.5$, $\\dfrac{84-72}{8}=1.5$이므로 $P(-1.5\\le Z\\le1.5)=2\\times0.4332=0.8664$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 4,
        q: '어느 상점에 손님이 평균 10분에 한 명꼴로 온다고 합니다. 손님이 도착하는 사이의 시간이 지수분포를 따를 때, 방금 손님이 온 뒤 다음 손님이 오기까지 **5분 넘게** 걸릴 확률은 무엇입니까?',
        choices: ['$e^{-1/2}$', '$1-e^{-1/2}$', '$e^{-50}$', '$e^{-2}$'],
        answer: 0,
        hint: '평균이 10분이면 $\\lambda$는 얼마일까요?',
        why: ['', '5분 안에 올 확률 $P(X\\le5)$입니다.', '$\\lambda$ 대신 평균 10을 곱했습니다. $\\lambda=\\frac{1}{10}$입니다.', '$\\lambda t$를 $\\frac{10}{5}$으로 거꾸로 계산했습니다. $\\lambda t=\\frac{5}{10}$입니다.'],
        explain: '$\\lambda=\\frac{1}{10}$이므로 $P(X>5)=e^{-5/10}=e^{-1/2}\\approx0.607$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 3,
        q: '어떤 시험의 점수가 평균 60점, 표준편차 10점인 정규분포를 따른다고 합니다. 68-95-99.7 규칙으로 어림할 때, 80점 이상인 학생의 비율에 가장 가까운 것은 무엇입니까?',
        choices: ['약 2.5%', '약 5%', '약 16%', '약 95%'],
        answer: 0,
        hint: '80점은 평균에서 표준편차 몇 개만큼 떨어져 있나요?',
        why: ['', '평균 ±2σ 바깥 전체(양쪽)의 비율입니다. 80점 이상은 그 가운데 오른쪽 한쪽입니다.', '1σ(70점) 이상인 비율입니다. 80점은 평균보다 2σ 위입니다.', '평균 ±2σ 안에 드는 비율입니다.'],
        explain: '80점은 $z=\\dfrac{80-60}{10}=2$입니다. 평균 ±2σ 안에 약 95%가 있으므로 바깥은 약 5%이고, 대칭이므로 오른쪽 꼬리는 그 절반인 약 2.5%입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 0,
        q: '연속확률변수 $X$의 누적분포함수가 $F(x)=x^{3}\\ (0\\le x\\le1)$입니다($x<0$이면 0, $x>1$이면 1). $P(X>0.5)$를 구하세요.',
        answer: '0.875',
        wrong: [{ a: '0.125', why: '$P(X\\le0.5)=F(0.5)$를 구했습니다. 1에서 빼야 합니다.' }, { a: '0.5', why: '구간 길이의 비율로 계산했습니다. 이 분포는 균등분포가 아닙니다.' }],
        explain: '$P(X>0.5)=1-F(0.5)=1-0.5^{3}=1-0.125=0.875$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 3,
        q: '$X$가 정규분포 $N(100, 4^{2})$을 따를 때 $P(X\\le94)$를 구하세요. ($P(0\\le Z\\le1.5)=0.4332$)',
        answer: '0.0668',
        hint: '표준화한 값이 음수이면 대칭성을 쓰세요.',
        wrong: [{ a: '0.9332', why: '$P(Z\\le1.5)$를 구했습니다. $Z=-1.5$이므로 왼쪽 꼬리입니다.' }, { a: '0.4332', why: '$P(-1.5\\le Z\\le0)$을 구했습니다. 0.5에서 빼야 합니다.' }],
        explain: '$Z=\\dfrac{94-100}{4}=-1.5$이므로 $P(X\\le94)=P(Z\\le-1.5)=P(Z\\ge1.5)=0.5-0.4332=0.0668$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 4,
        q: '어떤 전구의 수명이 평균 1,000시간인 지수분포를 따릅니다. 이 전구를 이미 500시간 사용했는데 아직 켜져 있습니다. 앞으로 1,000시간 **이상** 더 켜져 있을 확률은 무엇입니까?',
        choices: ['$e^{-1}$', '$e^{-3/2}$', '$e^{-1/2}$', '$1-e^{-1}$'],
        answer: 0,
        hint: '$P(X>1500|X>500)$을 조건부확률의 정의로 계산해 보세요.',
        why: ['', '조건 없이 1,500시간 넘게 켜져 있을 확률 $P(X>1500)$입니다. 이미 500시간을 버텼다는 조건으로 나누어야 합니다.', '500시간을 버틸 확률 $P(X>500)$입니다.', '앞으로 1,000시간 안에 꺼질 확률입니다.'],
        explain: '$P(X>1500|X>500)=\\dfrac{e^{-1500/1000}}{e^{-500/1000}}=e^{-1}\\approx0.368$입니다. 무기억성 때문에 새 전구가 1,000시간 넘게 켜져 있을 확률 $P(X>1000)=e^{-1}$과 같습니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 3,
        q: '$X$가 정규분포 $N(\\mu, \\sigma^{2})$을 따르고 $P(X\\ge80)=0.0228$, $P(X\\le50)=0.1587$입니다. $\\mu$를 구하세요. ($P(0\\le Z\\le1)=0.3413$, $P(0\\le Z\\le2)=0.4772$)',
        answer: '60',
        hint: '두 확률에서 80과 50의 z-값을 각각 찾으세요.',
        wrong: [{ a: '65', why: '두 값의 가운데를 평균으로 보았습니다. 두 확률이 다르므로 평균은 가운데가 아닙니다.' }, { a: '10', why: '$\\sigma$를 구했습니다. 문제는 $\\mu$를 묻습니다.' }],
        explain: '$P(Z\\ge2)=0.5-0.4772=0.0228$이므로 80은 $z=2$, 곧 $\\mu+2\\sigma=80$입니다. $P(Z\\le-1)=0.5-0.3413=0.1587$이므로 50은 $z=-1$, 곧 $\\mu-\\sigma=50$입니다. 두 식을 빼면 $3\\sigma=30$, $\\sigma=10$, $\\mu=60$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 4,
        q: '평균이 10분인 지수분포를 따르는 대기 시간 $X$의 **중앙값** $m$(곧 $P(X\\le m)=\\frac{1}{2}$인 값)은 무엇입니까?',
        choices: ['$10\\ln 2$', '10', '5', '$\\dfrac{10}{\\ln 2}$'],
        answer: 0,
        hint: '$P(X>m)=e^{-m/10}=\\dfrac{1}{2}$을 푸세요.',
        why: ['', '평균입니다. 지수분포는 오른쪽으로 꼬리가 길어 평균이 중앙값보다 큽니다.', '평균의 절반입니다. 균등분포처럼 생각했습니다.', '$e^{-m/10}=\\frac{1}{2}$을 풀 때 $\\ln 2$를 나누는 자리에 놓았습니다.'],
        explain: '$e^{-m/10}=\\dfrac{1}{2}$에서 $\\dfrac{m}{10}=\\ln 2$이므로 $m=10\\ln 2\\approx6.93$분입니다. 평균 10분보다 짧습니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', unit: '점', concept: 3,
        q: '어떤 시험의 점수가 정규분포 $N(70, 10^{2})$을 따릅니다. 상위 5%에 들려면 최소 몇 점 이상이어야 합니까? ($P(0\\le Z\\le1.645)=0.45$)',
        answer: '86.45',
        hint: '$P(Z\\ge z)=0.05$인 $z$를 먼저 찾으세요.',
        wrong: [{ a: '1.645', why: '표준화한 값에서 멈추었습니다. $x=\\mu+z\\sigma$로 되돌려야 합니다.' }, { a: '53.55', why: '하위 5%의 점수를 구했습니다. 상위는 평균보다 위쪽입니다.' }],
        explain: '$P(Z\\ge1.645)=0.5-0.45=0.05$이므로 $z=1.645$입니다. $x=70+1.645\\times10=86.45$점입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 1,
        q: '연속확률변수 $X$의 누적분포함수가 $x\\ge1$에서 $F(x)=1-\\dfrac{1}{x^{2}}$이고 $x<1$에서 0입니다. $E(X)$를 구하세요.',
        answer: '2',
        hint: '먼저 $f(x)=F^{\\prime}(x)$를 구한 뒤 이상적분을 계산하세요.',
        wrong: [{ a: '1', why: '$\\int_{1}^{\\infty}f(x)\\,dx$를 구했습니다. 기댓값은 $\\int x\\,f(x)\\,dx$입니다.' }],
        explain: '$f(x)=F^{\\prime}(x)=\\dfrac{2}{x^{3}}\\ (x\\ge1)$입니다. $E(X)=\\int_{1}^{\\infty}x\\cdot\\dfrac{2}{x^{3}}\\,dx=\\int_{1}^{\\infty}\\dfrac{2}{x^{2}}\\,dx=\\left[-\\dfrac{2}{x}\\right]_{1}^{\\infty}=2$입니다.',
      },
    ],

    deeper: [
      {
        title: '정규분포의 넓이가 1인 까닭',
        body: '$I=\\int_{-\\infty}^{\\infty}e^{-x^{2}/2}\\,dx$는 초등함수로 부정적분을 나타낼 수 없지만, 제곱하면 계산할 수 있습니다.\n\n' +
          '$I^{2}=\\int_{-\\infty}^{\\infty}\\int_{-\\infty}^{\\infty}e^{-(x^{2}+y^{2})/2}\\,dx\\,dy$\n\n' +
          '를 극좌표 $x=r\\cos\\theta$, $y=r\\sin\\theta$로 바꾸면\n\n' +
          '$I^{2}=\\int_{0}^{2\\pi}\\int_{0}^{\\infty}e^{-r^{2}/2}\\,r\\,dr\\,d\\theta=2\\pi$\n\n' +
          '이므로 $I=\\sqrt{2\\pi}$입니다. 표준정규분포의 밀도함수 앞에 $\\frac{1}{\\sqrt{2\\pi}}$가 붙는 이유가 여기에 있습니다. 1차원에서 풀리지 않던 적분이 2차원으로 넓히자 풀린다는 점이 아름다운 예입니다.',
      },
      {
        title: '다음 단원으로 — 왜 정규분포가 이렇게 자주 나올까',
        body: '서로 독립인 확률변수를 많이 더하면, 각 변수의 분포가 무엇이든 그 합(또는 평균)의 분포가 정규분포에 가까워진다는 놀라운 정리가 있습니다. 이것이 다음 단원에서 배울 **중심극한정리**입니다.\n\n' +
          '측정 오차나 키처럼 수많은 작은 요인이 더해져 만들어지는 양이 정규분포를 닮는 까닭, 그리고 표본평균으로 모평균을 추정할 때 정규분포표를 쓸 수 있는 까닭이 모두 이 정리에서 나옵니다. 이항분포 $B(n, p)$도 베르누이 변수 $n$개의 합이므로, $n$이 크면 정규분포로 근사할 수 있습니다.',
      },
    ],

    faq: [
      {
        q: '연속확률변수에서 P(X=a)가 0이면, 그 값은 절대 안 나오는 거예요?',
        a: '아닙니다. 확률이 0이라고 일어날 수 없는 것은 아닙니다. 키가 정확히 170.000…cm일 확률은 0이지만, 누군가의 키는 어떤 정확한 값입니다. 한 점은 폭이 없어 넓이가 0일 뿐이고, 의미 있는 확률은 언제나 구간에 대해 생각합니다.',
      },
      {
        q: '표준정규분포표에 음수 z가 없어요. 어떻게 하죠?',
        a: '표준정규분포는 0에 대하여 대칭이므로 $P(-z\\le Z\\le0)=P(0\\le Z\\le z)$, $P(Z\\le-z)=P(Z\\ge z)$입니다. 구하려는 넓이를 그림으로 그려 0을 기준으로 나누면 표에 있는 값만으로 계산할 수 있습니다.',
      },
      {
        q: '지수분포에서 λ랑 평균이 헷갈려요.',
        a: '$\\lambda$는 "단위 시간당 평균 몇 번 일어나는가"(비율)이고, 평균 대기 시간은 그 역수 $\\frac{1}{\\lambda}$입니다. 한 시간에 평균 6번 오면 $\\lambda=6$(시간당), 평균 대기 시간은 $\\frac{1}{6}$시간, 곧 10분입니다. 단위를 함께 적으면 헷갈리지 않습니다.',
      },
      {
        q: '확률밀도함수 값이 1보다 커도 정말 괜찮아요?',
        a: '괜찮습니다. 확률은 밀도 × 폭(넓이)입니다. 폭이 좁은 구간에 확률이 몰려 있으면 밀도가 높아집니다. 예를 들어 $U(0, 0.5)$의 밀도는 어디서나 2이지만 전체 넓이는 $2\\times0.5=1$입니다.',
      },
    ],

    mistakes: [
      '확률밀도함수의 값 $f(a)$를 $P(X=a)$로 생각하는 실수 — 연속형에서 확률은 넓이이고 $P(X=a)=0$입니다.',
      '표준화할 때 분산으로 나누는 실수 — $Z=\\frac{X-\\mu}{\\sigma}$는 **표준편차**로 나눕니다. $N(50, 100)$이면 $\\sigma=10$입니다.',
      '지수분포에서 평균 $\\theta$를 $\\lambda$ 자리에 넣는 실수 — 평균 10분이면 $\\lambda=\\frac{1}{10}$이고 $P(X>t)=e^{-t/10}$입니다.',
    ],

    gens: [
      {
        id: 'uniform',
        level: 1,
        title: '균등분포의 확률·평균·분산',
        make: function (R) {
          var a = R.int(0, 10), len = R.pick([4, 5, 6, 8, 10, 12, 15, 20]);
          var b = a + len;
          var kind = R.pick(['prob', 'prob', 'mean', 'var']);
          var U = '$U(' + a + ', ' + b + ')$' + R.josa(b, '을/를');
          if (kind === 'prob') {
            var c = R.int(a, b - 2), d = R.int(c + 1, b);
            if (c === a && d === b) d = b - 1;
            var ans = R.F(d - c, len);
            return {
              type: 'short', check: 'number', concept: 2,
              q: '$X$가 균등분포 ' + U + ' 따를 때 $P(' + c + '\\le X\\le' + d + ')$의 값을 구하세요.',
              answer: ansText(ans),
              wrong: W(ans, [[R.F(d - c, 1), '구간의 길이에서 멈추었습니다. 전체 길이 ' + len + R.josa(len, '으로/로') + ' 나누어야 합니다.'], [b === len ? null : R.F(d - c, b), '전체 길이를 ' + b + R.josa(b, '으로/로') + ' 보았습니다. 구간 $[' + a + ', ' + b + ']$의 길이는 ' + len + '입니다.'], [R.F(1, len), '밀도 $\\frac{1}{' + len + '}$에서 멈추었습니다. 밀도에 구간의 길이를 곱해야 합니다.']]),
              explain: '균등분포에서 확률은 길이의 비율이므로 $P=\\dfrac{' + d + '-' + c + '}{' + b + '-' + a + '}=\\dfrac{' + (d - c) + '}{' + len + '}' + (ans.num === d - c && ans.den === len && ans.toDecimal(8) === null ? '' : '=' + texOf(ans)) + '$입니다.',
            };
          }
          if (kind === 'mean') {
            var m = R.F(a + b, 2);
            return {
              type: 'short', check: 'number', concept: 2,
              q: '$X$가 균등분포 ' + U + ' 따를 때 $E(X)$를 구하세요.',
              answer: ansText(m),
              wrong: W(m, [[R.F(len, 2), '구간 길이의 절반을 구했습니다. 평균은 두 끝의 가운데 $\\frac{a+b}{2}$입니다.'], [R.F(len * len, 12), '분산을 구했습니다.']]),
              explain: '$E(X)=\\dfrac{' + a + '+' + b + '}{2}=' + texOf(m) + '$입니다.',
            };
          }
          var v = R.F(len * len, 12);
          return {
            type: 'short', check: 'number', concept: 2,
            q: '$X$가 균등분포 ' + U + ' 따를 때 $\\mathrm{Var}(X)$를 구하세요.',
            answer: ansText(v),
            wrong: W(v, [[R.F(len * len, 1), '12로 나누지 않았습니다. 분산은 $\\frac{(b-a)^{2}}{12}$입니다.'], [R.F(a + b, 2), '평균을 구했습니다.'], [R.F(len, 12), '$b-a$를 제곱하지 않았습니다.']]),
            explain: '$\\mathrm{Var}(X)=\\dfrac{(' + b + '-' + a + ')^{2}}{12}=\\dfrac{' + len * len + '}{12}=' + texOf(v) + '$입니다.',
          };
        },
      },
      {
        id: 'pdf-power',
        level: 2,
        title: '확률밀도함수의 상수·확률·기댓값',
        make: function (R) {
          var n = R.pick([1, 2]), c = R.pick([1, 2, 3, 4]);
          if (n === 2 && c === 4) c = 2;
          var k = R.F(n + 1, Math.pow(c, n + 1));
          var xn = n === 1 ? 'x' : 'x^{2}';
          var fdef = '$f(x)=k' + xn + '\\ (0\\le x\\le' + c + ')$, 그 밖에서는 0';
          var kind = R.pick(['k', 'prob', 'mean']);
          var kTex = k.toTex();
          var prim = n === 1 ? '\\dfrac{x^{2}}{2}' : '\\dfrac{x^{3}}{3}';
          var kLine = '$\\int_{0}^{' + c + '}k' + xn + '\\,dx=k\\left[' + prim + '\\right]_{0}^{' + c + '}=' + (function (f) { return f.isInt() ? f.toString() : '\\dfrac{' + f.num + '}{' + f.den + '}'; })(R.F(Math.pow(c, n + 1), n + 1)) + 'k=1$이므로 $k=' + kTex + '$입니다.';
          if (kind === 'k') {
            return {
              type: 'short', check: 'number', concept: 0,
              q: '확률변수 $X$의 확률밀도함수가 ' + fdef + '일 때 상수 $k$를 구하세요.',
              answer: k.toString(),
              hint: '그래프 아래의 넓이가 1이어야 합니다.',
              wrong: W(k, [[R.F(1, Math.pow(c, n)), '$f(' + c + ')=1$이 되도록 정했습니다. 밀도의 값이 아니라 넓이가 1이어야 합니다.'], [R.F(1, Math.pow(c, n + 1)), '적분할 때 $' + (n + 1) + '$' + R.josa(n + 1, '으로/로') + ' 나누는 것을 빠뜨렸습니다.']]),
              explain: kLine,
            };
          }
          if (kind === 'prob') {
            var t = R.F(R.int(1, 2 * c - 1), 2);
            var p = t.div(c).pow(n + 1);
            var tT = texOf(t);
            return {
              type: 'short', check: 'number', concept: 0,
              q: '확률변수 $X$의 확률밀도함수가 ' + fdef + '입니다. $P(X\\le' + tT + ')$의 값을 구하세요.',
              answer: ansText(p),
              hint: '먼저 $k$를 구하세요.',
              wrong: W(p, [[t.div(c), '구간 길이의 비율로 계산했습니다. 밀도가 일정하지 않으므로 적분해야 합니다.'], [k.mul(t.pow(n)).cmp(1) < 0 ? k.mul(t.pow(n)) : null, '밀도함수의 값 $f(' + tT + ')$를 답했습니다. 확률은 넓이입니다.'], [R.F(1, 1).sub(p), '$P(X>' + tT + ')$를 구했습니다.']]),
              explain: kLine + '\n\n$P(X\\le' + tT + ')=\\int_{0}^{' + tT + '}' + kTex + xn + '\\,dx=' + kTex + '\\left[' + prim + '\\right]_{0}^{' + tT + '}=' + texOf(p) + '$입니다.',
            };
          }
          var E = R.F((n + 1) * c, n + 2);
          return {
            type: 'short', check: 'number', concept: 1,
            q: '확률변수 $X$의 확률밀도함수가 ' + fdef + '입니다. $E(X)$를 구하세요.',
            answer: ansText(E),
            hint: '먼저 $k$를 구하고 $\\int x\\,f(x)\\,dx$를 계산하세요.',
            wrong: W(E, [[R.F(c, 2), '구간의 가운데를 답했습니다. 밀도가 오른쪽으로 갈수록 커지므로 평균은 더 오른쪽입니다.'], [R.F((n + 1) * c * c, n + 3), '$E(X^{2})$을 구했습니다.']]),
            explain: kLine + '\n\n$E(X)=\\int_{0}^{' + c + '}x\\cdot' + kTex + xn + '\\,dx=' + kTex + '\\left[\\dfrac{x^{' + (n + 2) + '}}{' + (n + 2) + '}\\right]_{0}^{' + c + '}=' + texOf(E) + '$입니다.',
          };
        },
      },
      {
        id: 'normal',
        level: 2,
        title: '정규분포의 표준화와 확률',
        make: function (R) {
          var sd = R.pick([2, 4, 5, 6, 8, 10, 12, 20]);
          var mu = R.int(20, 90) + (sd >= 10 ? 30 : 0);
          var zs = sd === 5 ? [10, 20] : [5, 10, 15, 20, 25];
          function T(z10) { return TBL[Math.abs(z10)]; }
          function xOf(z10) { return mu + z10 * sd / 10; }
          function zt(z10) { return String(z10 / 10); }
          var kind = R.pick(['le', 'ge', 'between']);
          var ans, q, ex, wr;
          var z = R.pick(zs) * (R.bool() ? 1 : -1);
          var dist = '$X$가 정규분포 $N(' + mu + ', ' + sd + '^{2})$을 따를 때 ';
          var std = function (x, z10) { return '\\dfrac{' + x + '-' + mu + '}{' + sd + '}=' + zt(z10); };
          if (kind === 'le' || kind === 'ge') {
            var x = xOf(z);
            var le = z > 0 ? 5000 + T(z) : 5000 - T(z);
            var v = kind === 'le' ? le : 10000 - le;
            ans = R.F(v, 10000);
            q = dist + '$P(X' + (kind === 'le' ? '\\le' : '\\ge') + x + ')$의 값을 구하세요.';
            ex = '$Z=' + std(x, z) + '$이므로 $P(X' + (kind === 'le' ? '\\le' : '\\ge') + x + ')=P(Z' + (kind === 'le' ? '\\le' : '\\ge') + zt(z) + ')$입니다. ' +
              ((kind === 'le') === (z > 0) ? '0을 넘어가는 쪽이므로 $0.5+' + R.fmt.dec(T(z) / 10000, 4) + '=' : '꼬리 쪽이므로 $0.5-' + R.fmt.dec(T(z) / 10000, 4) + '=') + texOf(ans) + '$입니다.';
            wr = [[R.F(T(z), 10000), '$P(0\\le Z\\le' + zt(Math.abs(z)) + ')$를 그대로 답했습니다. 0.5를 더하거나 빼야 합니다.'], [R.F(10000 - v, 10000), '부등호 방향(또는 부호)을 반대로 보았습니다.']];
          } else {
            var z2 = R.pick(zs.filter(function (w) { return w !== Math.abs(z); }).concat([Math.abs(z)])) * (R.bool() ? 1 : -1);
            if (z2 === z) z2 = -z;
            var lo = Math.min(z, z2), hi = Math.max(z, z2);
            var val = lo < 0 && hi > 0 ? T(lo) + T(hi) : Math.abs(T(hi) - T(lo));
            ans = R.F(val, 10000);
            var xa = xOf(lo), xb = xOf(hi);
            q = dist + '$P(' + xa + '\\le X\\le' + xb + ')$의 값을 구하세요.';
            ex = '$' + std(xa, lo) + '$, $' + std(xb, hi) + '$이므로 $P(' + zt(lo) + '\\le Z\\le' + zt(hi) + ')$입니다. ' +
              (lo < 0 && hi > 0
                ? '0을 사이에 두므로 $' + R.fmt.dec(T(lo) / 10000, 4) + '+' + R.fmt.dec(T(hi) / 10000, 4) + '=' + texOf(ans) + '$입니다.'
                : '같은 쪽에 있으므로 $' + R.fmt.dec(Math.max(T(lo), T(hi)) / 10000, 4) + '-' + R.fmt.dec(Math.min(T(lo), T(hi)) / 10000, 4) + '=' + texOf(ans) + '$입니다.');
            wr = [
              [lo < 0 && hi > 0 ? R.F(Math.abs(T(hi) - T(lo)), 10000) : R.F(T(lo) + T(hi), 10000), lo < 0 && hi > 0 ? '두 값이 0의 양쪽에 있는데 뺐습니다. 0을 기준으로 두 넓이를 더합니다.' : '두 값이 0의 같은 쪽에 있는데 더했습니다. 큰 넓이에서 작은 넓이를 뺍니다.'],
              [R.F(T(hi), 10000), '한쪽 넓이만 구했습니다.'],
            ];
          }
          return {
            type: 'short', check: 'number', concept: 3,
            q: q + '\n\n' + TABLE,
            answer: ansText(ans),
            hint: '$Z=\\dfrac{X-\\mu}{\\sigma}$로 표준화하고 그림을 그려 보세요.',
            wrong: W(ans, wr),
            explain: ex,
          };
        },
      },
      {
        id: 'exponential',
        level: 2,
        title: '지수분포의 확률',
        make: function (R) {
          var th = R.pick([2, 4, 5, 10, 20, 30]);
          var t = R.pick([1, 2, 3, 5, 10, 15, 20, 30, 40].filter(function (v) { return v !== th; }));
          var r = R.F(t, th);
          var ctx = R.pick([
            ['어느 상점에 손님이 오는 간격 $X$(분)', '분', '다음 손님이 오기까지', '손님이 오지 않았을'],
            ['어떤 부품이 고장 날 때까지의 시간 $X$(시간)', '시간', '부품이 고장 나기까지', '고장 나지 않았을'],
            ['콜센터에 전화가 걸려 오는 간격 $X$(분)', '분', '다음 전화가 오기까지', '전화가 오지 않았을'],
          ]);
          var kind = R.pick(['gt', 'gt', 'le', 'memo']);
          var intro = ctx[0] + '가 평균 ' + th + ctx[1] + '인 지수분포를 따릅니다. ';
          var E = ePow(r);
          var correct, q, cands, ex;
          var inv = R.F(th, t);
          // 약분 전 지수 t/θ 를 보여 줄 필요가 있을 때만 중간 단계를 쓴다
          var mid = r.num === t && r.den === th ? '' : (kind === 'le' ? 'e^{-' + t + '/' + th + '}=1-' : 'e^{-' + t + '/' + th + '}=');
          if (kind === 'le') {
            correct = '$1-' + E + '$';
            q = intro + ctx[2] + ' ' + t + ctx[1] + ' **이내**일 확률 $P(X\\le' + t + ')$는 무엇입니까?';
            cands = [['$' + E + '$', '$P(X>' + t + ')$입니다. 이내일 확률은 1에서 빼야 합니다.'], ['$1-' + ePow(inv) + '$', '$\\lambda t$를 $' + inv.toTex() + '$' + R.josa(inv, '으로/로') + ' 거꾸로 계산했습니다. $\\lambda=\\frac{1}{' + th + '}$입니다.'], ['$1-e^{-' + t * th + '}$', '$\\lambda$ 자리에 평균 ' + th + R.josa(th, '을/를') + ' 넣었습니다.'], ['$' + ePow(inv) + '$', '부등호 방향을 반대로 보았고, $\\lambda t$도 거꾸로 계산했습니다.']];
            ex = '$\\lambda=\\frac{1}{' + th + '}$이므로 $P(X\\le' + t + ')=1-' + mid + E + '$입니다.';
          } else if (kind === 'gt') {
            correct = '$' + E + '$';
            q = intro + ctx[2] + ' ' + t + ctx[1] + ' **넘게** 걸릴 확률 $P(X>' + t + ')$는 무엇입니까?';
            cands = [['$1-' + E + '$', '$P(X\\le' + t + ')$입니다.'], ['$' + ePow(inv) + '$', '$\\lambda t$를 $' + inv.toTex() + '$' + R.josa(inv, '으로/로') + ' 거꾸로 계산했습니다. $\\lambda=\\frac{1}{' + th + '}$입니다.'], ['$e^{-' + t * th + '}$', '$\\lambda$ 자리에 평균 ' + th + R.josa(th, '을/를') + ' 넣었습니다.'], ['$1-' + ePow(inv) + '$', '부등호 방향을 반대로 보았고, $\\lambda t$도 거꾸로 계산했습니다.']];
            ex = '$\\lambda=\\frac{1}{' + th + '}$이므로 $P(X>' + t + ')=' + mid + E + '$입니다.';
          } else {
            var s = R.pick([5, 10, 20, 50].filter(function (v) { return v !== t; }));
            var Es = ePow(R.F(s + t, th));
            correct = '$' + E + '$';
            q = intro + '이미 ' + s + ctx[1] + ' 동안 ' + ctx[3] + ' 때, 앞으로 ' + t + ctx[1] + ' 넘게 더 걸릴 확률 $P(X>' + (s + t) + '|X>' + s + ')$는 무엇입니까?';
            cands = [['$' + Es + '$', '조건 없이 $P(X>' + (s + t) + ')$를 구했습니다. $P(X>' + s + ')$로 나누어야 합니다.'], ['$1-' + E + '$', '앞으로 ' + t + ctx[1] + ' 안에 일어날 확률입니다.'], ['$' + ePow(R.F(s, th)) + '$', '이미 지난 ' + s + ctx[1] + '의 확률 $P(X>' + s + ')$입니다.'], ['$' + ePow(inv) + '$', '$\\lambda t$를 거꾸로 계산했습니다.']];
            ex = '$P(X>' + (s + t) + '|X>' + s + ')=\\dfrac{P(X>' + (s + t) + ')}{P(X>' + s + ')}=\\dfrac{' + Es + '}{' + ePow(R.F(s, th)) + '}=' + E + '$입니다. 무기억성 때문에 처음부터 ' + t + ctx[1] + ' 넘게 걸릴 확률과 같습니다.';
          }
          var reason = {};
          cands.forEach(function (cd) { if (cd[0] !== correct && !(cd[0] in reason)) reason[cd[0]] = cd[1]; });
          var pick = R.choices(correct, R.shuffle(Object.keys(reason)));
          return {
            type: 'choice', concept: 4,
            q: q,
            choices: pick.choices,
            answer: pick.answer,
            hint: '평균이 ' + th + ctx[1] + '이면 $\\lambda=\\frac{1}{' + th + '}$이고 $P(X>t)=e^{-\\lambda t}$입니다.',
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: ex,
          };
        },
      },
    ],
  });
})();
