/* 미적분Ⅱ · 정적분과 급수의 합
 * 구분구적법(직사각형으로 나누어 넓이 구하기), 정적분과 급수의 합 사이의 관계,
 * 급수의 합(리만 합의 극한)을 정적분으로 바꾸어 계산하기. */
(function () {
  // 곡선과 직사각형 그림 SVG. o: { x:[min,max], y:[min,max], f, a, b, n, right(true=오른쪽 끝 높이), text:[[x,y,글자]] }
  function rects(o) {
    var W = 280, H = 200, pl = 14, pr = 14, pt = 14, pb = 18;
    var x0 = o.x[0], x1 = o.x[1], y0 = o.y[0], y1 = o.y[1];
    function X(x) { return pl + (x - x0) / (x1 - x0) * (W - pl - pr); }
    function Y(y) { return pt + (y1 - y) / (y1 - y0) * (H - pt - pb); }
    function r1(v) { return Math.round(v * 10) / 10; }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">';
    var dx = (o.b - o.a) / o.n, k;
    for (k = 0; k < o.n; k++) {
      var xl = o.a + k * dx, xr = xl + dx;
      var h = o.f(o.right ? xr : xl);
      s += '<rect x="' + r1(X(xl)) + '" y="' + r1(Y(h)) + '" width="' + r1(X(xr) - X(xl)) + '" height="' + r1(Y(0) - Y(h)) + '" fill="var(--fig-' + (o.c || 1) + ')" fill-opacity="0.35" stroke="currentColor" stroke-width="1"/>';
    }
    var ax = r1(Y(0)), ay = r1(X(0));
    s += '<g stroke="currentColor" stroke-width="1.3" fill="none">';
    s += '<line x1="4" y1="' + ax + '" x2="' + (W - 5) + '" y2="' + ax + '"/>';
    s += '<line x1="' + ay + '" y1="' + (H - 4) + '" x2="' + ay + '" y2="5"/>';
    s += '</g><g fill="currentColor">';
    s += '<polygon points="' + (W - 2) + ',' + ax + ' ' + (W - 9) + ',' + r1(ax - 3.5) + ' ' + (W - 9) + ',' + r1(ax + 3.5) + '"/>';
    s += '<polygon points="' + ay + ',2 ' + r1(ay - 3.5) + ',9 ' + r1(ay + 3.5) + ',9"/>';
    s += '</g>';
    var d = '', on = false, i, x, y;
    for (i = 0; i <= 120; i++) {
      x = x0 + (x1 - x0) * i / 120;
      y = o.f(x);
      if (y < y0 || y > y1) { on = false; continue; }
      d += (on ? 'L' : 'M') + r1(X(x)) + ',' + r1(Y(y));
      on = true;
    }
    s += '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2.2"/>';
    s += '<g fill="currentColor" font-family="sans-serif" font-size="13" text-anchor="middle">';
    (o.text || []).forEach(function (t) { s += '<text x="' + r1(X(t[0])) + '" y="' + r1(Y(t[1])) + '">' + t[2] + '</text>'; });
    s += '</g></svg>';
    return s;
  }
  function sq(x) { return x * x; }
  function lin(x) { return x; }

  function tex(f) { return f.toTex(); }
  function dedup(ans, cands) {
    var out = [], seen = {};
    seen[ans.toString()] = true;
    cands.forEach(function (w) { var k = w[0].toString(); if (!seen[k]) { seen[k] = true; out.push({ a: k, why: w[1] }); } });
    return out;
  }
  // ∫_a^b x^p dx (p 자연수) → Frac
  function powInt(R, p, a, b) {
    return R.F(Math.pow(b, p + 1) - Math.pow(a, p + 1), p + 1);
  }
  function xp(p) { return p === 1 ? 'x' : 'x^{' + p + '}'; }

  Tutor.registerUnit({
    id: 'math-h-calc2-11',
    course: 'math-h-calc2',
    title: '정적분과 급수의 합',
    summary: '도형을 잘게 나누어 넓이를 구하는 구분구적법을 이해하고, 급수의 합을 정적분으로 나타내어 계산합니다.',
    goals: [
      '구분구적법으로 곡선으로 둘러싸인 도형의 넓이를 구할 수 있다.',
      '정적분과 급수의 합 사이의 관계를 이해할 수 있다.',
      '급수의 합을 정적분으로 나타내어 그 값을 구할 수 있다.',
    ],
    standards: ['[12미적Ⅱ-03-04]'],

    concepts: [
      {
        title: '구분구적법',
        body: '곡선으로 둘러싸인 도형의 넓이는 공식으로 바로 구할 수 없습니다. 그래서 도형을 폭이 같은 $n$개의 가는 직사각형으로 나누어 넓이의 합을 구하고, $n$을 한없이 크게 할 때의 극한으로 넓이를 구합니다. 이런 방법을 **구분구적법**이라고 합니다.\n\n' +
          '예: 곡선 $y=x^2$과 $x$축, 직선 $x=1$로 둘러싸인 도형의 넓이 $S$\n\n' +
          '구간 $[0, 1]$을 $n$등분하면 직사각형의 폭은 $\\dfrac{1}{n}$입니다. $k$번째 직사각형의 높이를 오른쪽 끝의 함숫값 $\\left(\\dfrac{k}{n}\\right)^2$으로 하면 넓이의 합은\n\n' +
          '$S_n=\\sum_{k=1}^{n}\\left(\\dfrac{k}{n}\\right)^2\\dfrac{1}{n}=\\dfrac{1}{n^3}\\cdot\\dfrac{n(n+1)(2n+1)}{6}=\\dfrac{(n+1)(2n+1)}{6n^2}$\n\n' +
          '이고, $S=\\lim_{n\\to\\infty}S_n=\\dfrac{2}{6}=\\dfrac{1}{3}$입니다.\n\n' +
          '> 💡 왼쪽 끝의 함숫값을 높이로 하면 직사각형들이 곡선 아래에 들어가고(부족한 넓이), 오른쪽 끝을 쓰면 곡선 위로 삐져나옵니다(넘치는 넓이). $n$이 커지면 두 합의 차가 0에 가까워져 같은 극한값 $\\dfrac{1}{3}$을 가집니다.',
        easy: '울퉁불퉁한 땅의 넓이를 재고 싶을 때, 땅을 폭이 같은 길쭉한 띠로 잘라 각 띠를 직사각형이라고 생각하고 더하면 넓이를 어림할 수 있습니다.\n\n' +
          '띠를 더 가늘게 자를수록 직사각형이 곡선에 꼭 맞게 되어 어림이 정확해집니다. 띠의 개수 $n$을 한없이 늘렸을 때 다가가는 값이 진짜 넓이입니다. 그림은 $y=x^2$ 아래를 직사각형 6개로 덮은 모습입니다.',
        fig: {
          type: 'svg',
          alt: '곡선 y=x² 아래 구간 0 부터 1 까지를 폭이 같은 직사각형 6개로 나눈 그림. 각 직사각형의 높이는 오른쪽 끝의 함숫값이어서 곡선 위로 조금씩 삐져나온다',
          svg: rects({ x: [-0.1, 1.2], y: [-0.12, 1.15], f: sq, a: 0, b: 1, n: 6, right: true, text: [[1, -0.1, '1'], [-0.05, -0.1, 'O'], [0.62, 0.95, 'y=x²']] }),
        },
        check: {
          type: 'short', check: 'number',
          q: '곡선 $y=x$와 $x$축, 직선 $x=1$로 둘러싸인 도형의 넓이를 구분구적법으로 구할 때, 직사각형 넓이의 합은 $S_n=\\sum_{k=1}^{n}\\dfrac{k}{n}\\cdot\\dfrac{1}{n}=\\dfrac{n+1}{2n}$입니다. 넓이 $\\lim_{n\\to\\infty}S_n$의 값을 구하십시오.',
          answer: '1/2',
          wrong: [{ a: '1', why: '분자 $n+1$과 분모 $2n$에서 $n$의 계수를 비교하면 $\\dfrac{1}{2}$입니다. 분모의 2를 빠뜨렸습니다.' }],
          explain: '$\\dfrac{n+1}{2n}=\\dfrac{1}{2}+\\dfrac{1}{2n}$이므로 $n\\to\\infty$일 때 $\\dfrac{1}{2}$입니다. 밑변과 높이가 1인 직각삼각형의 넓이 $\\dfrac{1}{2}$과 같습니다.',
        },
      },
      {
        title: '정적분과 급수의 합',
        body: '함수 $f(x)$가 닫힌구간 $[a, b]$에서 연속일 때, 구간을 $n$등분하여\n\n' +
          '$\\Delta x=\\dfrac{b-a}{n}$, $x_k=a+k\\Delta x$ ($k=0, 1, \\cdots, n$)\n\n' +
          '로 놓으면 직사각형 넓이의 합의 극한은 정적분과 같습니다.\n\n' +
          '$\\lim_{n\\to\\infty}\\sum_{k=1}^{n}f(x_k)\\Delta x=\\int_{a}^{b}f(x)\\,dx$\n\n' +
          '$f(x)\\ge0$이면 이것이 곡선 아래의 넓이이고, $f(x)$가 음수인 곳에서는 $f(x_k)\\Delta x$가 음수가 되어 정적분의 부호 약속과도 맞습니다. 이 관계 덕분에 **급수의 합의 극한을 정적분으로 계산**할 수 있습니다.\n\n' +
          '- 오른쪽 끝 대신 왼쪽 끝($k=0$부터 $n-1$까지)을 써도 $f$가 연속이면 극한값은 같습니다.\n' +
          '- $\\sum_{k=1}^{n}$의 각 항은 "높이 $f(x_k)$ × 폭 $\\Delta x$", $\\lim$은 "폭을 0으로", $\\int$는 "모두 더하기"에 대응합니다.',
        easy: '정적분 기호 $\\int_{a}^{b}f(x)\\,dx$는 사실 "합"을 나타내는 기호입니다. $\\int$는 "합"을 뜻하는 라틴어 summa의 첫 글자 S를 길게 늘인 모양이고, $f(x)\\,dx$는 "높이 × 아주 작은 폭"인 가는 직사각형 하나의 넓이입니다.\n\n' +
          '그래서 $\\sum f(x_k)\\Delta x$(직사각형 넓이의 합)에서 폭 $\\Delta x$를 한없이 작게 하면 $\\int f(x)\\,dx$가 됩니다. 시그마 $\\sum$이 적분 기호 $\\int$로, $\\Delta x$가 $dx$로 바뀐다고 생각하면 됩니다.',
        fig: {
          type: 'svg',
          alt: '구간 a 부터 b 까지를 n 등분하여 곡선 아래에 폭 Δx 인 직사각형들을 세운 그림. k 번째 직사각형의 오른쪽 끝이 x_k 이다',
          svg: rects({ x: [-0.3, 4.6], y: [-0.5, 3.2], f: function (x) { return 0.12 * (x - 2) * (x - 2) * (x - 2) - 0.3 * (x - 2) + 1.9; }, a: 0.6, b: 4, n: 8, right: true, c: 2,
            text: [[0.6, -0.38, 'a'], [4, -0.38, 'b'], [-0.15, -0.38, 'O'], [2.3, -0.38, 'Δx']] }),
        },
        check: {
          type: 'ox',
          q: '구간 $[1, 4]$를 $n$등분할 때, 직사각형의 폭은 $\\Delta x=\\dfrac{3}{n}$이고 $k$번째 분점은 $x_k=1+\\dfrac{3k}{n}$입니다.',
          answer: true,
          explain: '구간의 길이는 $4-1=3$이므로 $\\Delta x=\\dfrac{3}{n}$이고, 시작점 1에서 폭을 $k$번 더하면 $x_k=1+\\dfrac{3k}{n}$입니다.',
        },
      },
      {
        title: '급수의 합을 정적분으로 — 구간 $[0, 1]$',
        body: '가장 자주 쓰는 꼴은 $a=0$, $b=1$일 때입니다. 이때 $\\Delta x=\\dfrac{1}{n}$, $x_k=\\dfrac{k}{n}$이므로\n\n' +
          '$\\lim_{n\\to\\infty}\\sum_{k=1}^{n}f\\left(\\dfrac{k}{n}\\right)\\dfrac{1}{n}=\\int_{0}^{1}f(x)\\,dx$\n\n' +
          '급수에서 $\\dfrac{k}{n}$를 $x$로, $\\dfrac{1}{n}$을 $dx$로, $\\lim\\sum_{k=1}^{n}$ 기호를 $\\int_{0}^{1}$ 기호로 바꾸면 됩니다.\n\n' +
          '예:\n\n' +
          '- $\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{1}{n}\\left(\\dfrac{k}{n}\\right)^3=\\int_{0}^{1}x^3\\,dx=\\dfrac{1}{4}$\n' +
          '- $\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{k^2}{n^3}=\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\left(\\dfrac{k}{n}\\right)^2\\dfrac{1}{n}=\\int_{0}^{1}x^2\\,dx=\\dfrac{1}{3}$\n' +
          '- $\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{1}{n}e^{\\frac{k}{n}}=\\int_{0}^{1}e^x\\,dx=e-1$\n\n' +
          '> 💡 $\\dfrac{k^2}{n^3}$처럼 섞여 있으면 먼저 $\\left(\\dfrac{k}{n}\\right)^2\\times\\dfrac{1}{n}$ 꼴로 나누어 봅니다. 분모의 $n$ 하나는 반드시 $dx$ 몫으로 남겨야 합니다.',
        easy: '번역 규칙 세 가지만 기억하면 됩니다.\n\n' +
          '| 급수 | 정적분 |\n|---|---|\n| $\\dfrac{k}{n}$ | $x$ |\n| $\\dfrac{1}{n}$ | $dx$ |\n| $\\lim\\sum_{k=1}^{n}$ | $\\int_{0}^{1}$ |\n\n' +
          '$k$가 1부터 $n$까지 변하면 $\\dfrac{k}{n}$는 $\\dfrac{1}{n}$부터 $1$까지 변합니다. $n$이 한없이 커지면 $\\dfrac{1}{n}$은 0에 가까워지니 $x$는 0부터 1까지, 그래서 적분 구간이 $[0, 1]$입니다.',
        check: {
          type: 'short', check: 'number',
          q: '다음 극한값을 구하십시오.\n\n$\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{1}{n}\\left(\\dfrac{k}{n}\\right)^3$',
          answer: '1/4',
          wrong: [
            { a: '1', why: '$\\dfrac{1}{n}$을 $dx$로 바꾸지 않고 $\\left(\\dfrac{k}{n}\\right)^3$의 끝값 1만 보았습니다. $\\int_{0}^{1}x^3\\,dx$를 계산합니다.' },
            { a: '3', why: '$x^3$을 적분하지 않고 미분했습니다.' },
          ],
          explain: '$\\dfrac{k}{n}$를 $x$로, $\\dfrac{1}{n}$을 $dx$로 바꾸면 $\\int_{0}^{1}x^3\\,dx=\\left[\\dfrac{1}{4}x^4\\right]_{0}^{1}=\\dfrac{1}{4}$입니다.',
        },
      },
      {
        title: '급수의 합을 정적분으로 — 일반 구간',
        body: '구간이 $[a, b]$이면 $\\Delta x=\\dfrac{b-a}{n}$, $x_k=a+\\dfrac{(b-a)k}{n}$이므로\n\n' +
          '$\\lim_{n\\to\\infty}\\sum_{k=1}^{n}f\\left(a+\\dfrac{(b-a)k}{n}\\right)\\dfrac{b-a}{n}=\\int_{a}^{b}f(x)\\,dx$\n\n' +
          '급수를 보고 **시작점 $a$**와 **폭 $\\dfrac{b-a}{n}$**을 찾으면 구간이 정해집니다.\n\n' +
          '예: $\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{2}{n}\\left(1+\\dfrac{2k}{n}\\right)^2$에서 시작점은 1, 폭은 $\\dfrac{2}{n}$이므로 구간은 $[1, 3]$입니다.\n\n' +
          '$\\int_{1}^{3}x^2\\,dx=\\left[\\dfrac{1}{3}x^3\\right]_{1}^{3}=\\dfrac{27-1}{3}=\\dfrac{26}{3}$\n\n' +
          '같은 급수를 $\\dfrac{2k}{n}$를 $x$로 보아 $\\int_{0}^{2}(1+x)^2\\,dx$로 나타내도 됩니다(값은 같습니다).\n\n' +
          '> ⚠️ 폭과 함수 속의 $\\dfrac{(b-a)k}{n}$가 맞아야 합니다. $\\sum\\dfrac{1}{n}f\\left(1+\\dfrac{2k}{n}\\right)$처럼 폭이 $\\dfrac{1}{n}$뿐이면 $\\dfrac{1}{2}\\sum\\dfrac{2}{n}f\\left(1+\\dfrac{2k}{n}\\right)=\\dfrac{1}{2}\\int_{1}^{3}f(x)\\,dx$로 맞추어 줍니다.',
        easy: '구간 $[0, 1]$일 때는 "$\\dfrac{k}{n}$ → $x$"였습니다. 일반 구간에서는 출발점과 걸음 폭을 읽으면 됩니다.\n\n' +
          '$1+\\dfrac{2k}{n}$는 "1에서 출발해 한 걸음에 $\\dfrac{2}{n}$씩 $n$걸음" 걷는다는 뜻입니다. $n$걸음을 다 걸으면 $1+2=3$에 도착하니 구간은 $[1, 3]$입니다. 앞에 곱해진 $\\dfrac{2}{n}$가 걸음 폭 $dx$입니다.',
        check: {
          type: 'choice',
          q: '$\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{3}{n}\\left(2+\\dfrac{3k}{n}\\right)^2$을 정적분으로 바르게 나타낸 것은 무엇입니까?',
          choices: ['$\\int_{2}^{5}x^2\\,dx$', '$\\int_{0}^{3}x^2\\,dx$', '$\\int_{2}^{3}x^2\\,dx$'],
          answer: 0,
          why: [
            '',
            '시작점 2를 빠뜨렸습니다. $x$는 2부터 $2+3=5$까지입니다.',
            '끝점을 3으로 보았습니다. 폭 $\\dfrac{3}{n}$으로 $n$걸음 가면 $2+3=5$에 도착합니다.',
          ],
          explain: '시작점은 2, 폭은 $\\dfrac{3}{n}$이므로 구간은 $[2, 2+3]=[2, 5]$입니다. 따라서 $\\int_{2}^{5}x^2\\,dx$입니다.',
        },
      },
      {
        title: '여러 가지 급수를 정적분으로',
        body: '급수의 꼴이 바로 보이지 않을 때는 **분모와 분자를 $n$으로 나누어** $\\dfrac{k}{n}$가 드러나게 바꿉니다.\n\n' +
          '- $\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{1}{n+k}=\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{1}{1+\\frac{k}{n}}\\cdot\\dfrac{1}{n}=\\int_{0}^{1}\\dfrac{1}{1+x}\\,dx=\\ln 2$\n' +
          '- $\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{\\pi}{n}\\sin\\dfrac{k\\pi}{n}=\\int_{0}^{\\pi}\\sin x\\,dx=2$ (시작점 0, 폭 $\\dfrac{\\pi}{n}$)\n' +
          '- $\\lim_{n\\to\\infty}\\dfrac{1}{n^{4}}(1^3+2^3+\\cdots+n^3)=\\int_{0}^{1}x^3\\,dx=\\dfrac{1}{4}$\n\n' +
          '$k$의 범위가 1부터 $n$이 아닐 때도 있습니다. $\\sum_{k=1}^{2n}\\dfrac{1}{n}f\\left(\\dfrac{k}{n}\\right)$에서는 $\\dfrac{k}{n}$가 0부터 2까지 변하므로 $\\int_{0}^{2}f(x)\\,dx$입니다.\n\n' +
          '> 💡 마지막 예는 $\\sum k^3=\\left\\{\\dfrac{n(n+1)}{2}\\right\\}^2$ 공식으로 구해도 $\\dfrac{1}{4}$입니다. 정적분을 쓰면 합의 공식을 몰라도 극한값을 구할 수 있습니다.',
        easy: '$\\dfrac{1}{n+k}$에는 $\\dfrac{k}{n}$가 보이지 않습니다. 분모와 분자를 똑같이 $n$으로 나누면 $\\dfrac{1}{n+k}=\\dfrac{\\frac{1}{n}}{1+\\frac{k}{n}}$이 되어 $\\dfrac{k}{n}$($\\to x$)과 $\\dfrac{1}{n}$($\\to dx$)이 나타납니다.\n\n' +
          '이렇게 "$\\dfrac{k}{n}$ 덩어리와 $\\dfrac{1}{n}$ 하나"가 보이게 모양을 고치는 것이 이 꼴 문제의 핵심입니다.',
        check: {
          type: 'choice',
          q: '$\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{1}{n+k}$을 정적분으로 바르게 나타낸 것은 무엇입니까?',
          choices: ['$\\int_{0}^{1}\\dfrac{1}{1+x}\\,dx$', '$\\int_{0}^{1}\\dfrac{1}{x}\\,dx$', '$\\int_{1}^{2}\\dfrac{1}{1+x}\\,dx$'],
          answer: 0,
          why: [
            '',
            '분모의 $n$을 빠뜨렸습니다. 분모와 분자를 $n$으로 나누면 분모는 $1+\\dfrac{k}{n}$입니다.',
            '$\\dfrac{k}{n}$가 $x$이므로 구간은 $[0, 1]$입니다. $1+x$를 $x$로 보았다면 $\\int_{1}^{2}\\dfrac{1}{x}\\,dx$가 되어야 합니다.',
          ],
          explain: '$\\dfrac{1}{n+k}=\\dfrac{1}{1+\\frac{k}{n}}\\cdot\\dfrac{1}{n}$이므로 $\\int_{0}^{1}\\dfrac{1}{1+x}\\,dx$이고, 값은 $\\left[\\ln(1+x)\\right]_{0}^{1}=\\ln 2$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '구분구적법으로 곡선 $y=x^2$과 $x$축, 직선 $x=2$로 둘러싸인 도형의 넓이를 구하십시오.',
        steps: [
          '구간 $[0, 2]$를 $n$등분하면 폭은 $\\dfrac{2}{n}$, $k$번째 오른쪽 끝은 $\\dfrac{2k}{n}$입니다.',
          '직사각형 넓이의 합은 $S_n=\\sum_{k=1}^{n}\\left(\\dfrac{2k}{n}\\right)^2\\cdot\\dfrac{2}{n}=\\dfrac{8}{n^3}\\sum_{k=1}^{n}k^2$입니다.',
          '$\\sum_{k=1}^{n}k^2=\\dfrac{n(n+1)(2n+1)}{6}$이므로 $S_n=\\dfrac{8(n+1)(2n+1)}{6n^2}$입니다.',
          '$n\\to\\infty$이면 $S_n\\to\\dfrac{8\\times2}{6}=\\dfrac{8}{3}$입니다. (확인: $\\int_{0}^{2}x^2\\,dx=\\dfrac{8}{3}$)',
        ],
        answer: '$\\dfrac{8}{3}$',
      },
      {
        q: '다음 극한값을 구하십시오.\n\n$\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{1}{n}\\left(1+\\dfrac{k}{n}\\right)^2$',
        steps: [
          '시작점은 1, 폭은 $\\dfrac{1}{n}$이므로 구간은 $[1, 2]$입니다.',
          '급수는 $\\int_{1}^{2}x^2\\,dx$입니다.',
          '$\\left[\\dfrac{1}{3}x^3\\right]_{1}^{2}=\\dfrac{8-1}{3}=\\dfrac{7}{3}$',
        ],
        answer: '$\\dfrac{7}{3}$',
      },
      {
        q: '다음 극한값을 구하십시오.\n\n$\\lim_{n\\to\\infty}\\left(\\dfrac{1}{n+1}+\\dfrac{1}{n+2}+\\cdots+\\dfrac{1}{2n}\\right)$',
        steps: [
          '시그마로 쓰면 $\\sum_{k=1}^{n}\\dfrac{1}{n+k}$입니다.',
          '분모와 분자를 $n$으로 나누면 $\\sum_{k=1}^{n}\\dfrac{1}{1+\\frac{k}{n}}\\cdot\\dfrac{1}{n}$입니다.',
          '$\\int_{0}^{1}\\dfrac{1}{1+x}\\,dx=\\left[\\ln(1+x)\\right]_{0}^{1}=\\ln 2$',
        ],
        answer: '$\\ln 2$',
      },
    ],

    terms: [
      { term: '구분구적법', def: '도형을 잘게 나누어 직사각형(또는 기둥) 넓이의 합을 구하고, 그 극한으로 넓이나 부피를 구하는 방법입니다.' },
      { term: '분점', def: '구간 $[a, b]$를 $n$등분하는 점 $x_k=a+k\\cdot\\dfrac{b-a}{n}$ ($k=0, 1, \\cdots, n$)입니다.' },
      { term: '급수의 합과 정적분', def: '$\\lim_{n\\to\\infty}\\sum_{k=1}^{n}f(x_k)\\Delta x=\\int_{a}^{b}f(x)\\,dx$라는 관계입니다. $\\Delta x=\\dfrac{b-a}{n}$' },
      { term: '리만 합', def: '$\\sum_{k=1}^{n}f(x_k)\\Delta x$처럼 함숫값과 폭을 곱해 더한 합입니다. 수학자 리만의 이름을 딴 말입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '그림은 곡선 $y=x$ 아래의 구간 $[0, 2]$를 4등분하여, 각 작은 구간의 **오른쪽 끝**의 함숫값을 높이로 하는 직사각형 4개를 그린 것입니다. 직사각형 4개의 넓이의 합을 구하십시오.',
        fig: {
          type: 'svg',
          alt: '직선 y=x 아래 구간 0 부터 2 까지를 폭 0.5 인 직사각형 4개로 덮은 그림. 각 직사각형의 높이는 오른쪽 끝의 함숫값이다',
          svg: rects({ x: [-0.2, 2.4], y: [-0.25, 2.3], f: lin, a: 0, b: 2, n: 4, right: true, text: [[2, -0.2, '2'], [1, -0.2, '1'], [-0.1, -0.2, 'O'], [2.1, 2.15, 'y=x']] }),
        },
        answer: '5/2',
        wrong: [
          { a: '3/2', why: '왼쪽 끝의 함숫값을 높이로 했습니다. 오른쪽 끝의 높이는 $\\dfrac{1}{2}, 1, \\dfrac{3}{2}, 2$입니다.' },
          { a: '5', why: '높이만 더하고 폭 $\\dfrac{1}{2}$을 곱하지 않았습니다.' },
        ],
        explain: '폭은 $\\dfrac{2}{4}=\\dfrac{1}{2}$이고 높이는 $\\dfrac{1}{2}, 1, \\dfrac{3}{2}, 2$입니다. 넓이의 합은 $\\dfrac{1}{2}\\times\\left(\\dfrac{1}{2}+1+\\dfrac{3}{2}+2\\right)=\\dfrac{1}{2}\\times5=\\dfrac{5}{2}$입니다. 실제 넓이 2보다 큰 것은 직사각형이 직선 위로 삐져나오기 때문입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 0,
        q: '다음 극한값을 구하십시오.\n\n$\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{k}{n^2}$',
        answer: '1/2',
        wrong: [{ a: '0', why: '각 항 $\\dfrac{k}{n^2}$가 0에 가까워진다고 합까지 0이라고 보았습니다. 항의 개수 $n$도 함께 늘어납니다.' }],
        explain: '$\\sum_{k=1}^{n}\\dfrac{k}{n^2}=\\dfrac{1}{n^2}\\cdot\\dfrac{n(n+1)}{2}=\\dfrac{n+1}{2n}\\to\\dfrac{1}{2}$입니다. 정적분으로 보면 $\\int_{0}^{1}x\\,dx=\\dfrac{1}{2}$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 1,
        q: '$f(x)$가 구간 $[0, 1]$에서 연속일 때, $\\lim_{n\\to\\infty}\\sum_{k=1}^{n}f\\left(\\dfrac{k}{n}\\right)\\dfrac{1}{n}$과 $\\lim_{n\\to\\infty}\\sum_{k=0}^{n-1}f\\left(\\dfrac{k}{n}\\right)\\dfrac{1}{n}$의 값은 같습니다.',
        answer: true,
        explain: '오른쪽 끝을 높이로 하든 왼쪽 끝을 높이로 하든, $n$이 커지면 두 합의 차 $\\{f(1)-f(0)\\}\\dfrac{1}{n}$이 0에 가까워집니다. 둘 다 $\\int_{0}^{1}f(x)\\,dx$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 2,
        q: '다음 극한값은 무엇입니까?\n\n$\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{1}{n}e^{\\frac{k}{n}}$',
        choices: ['$e-1$', '$e$', '$1$', '$e+1$'],
        answer: 0,
        why: [
          '',
          '아래끝 값 $e^{0}=1$을 빼는 것을 빠뜨렸습니다.',
          '$e^{\\frac{k}{n}}$이 1에 가까워진다고 보았습니다. 합 전체는 $\\int_{0}^{1}e^x\\,dx$입니다.',
          '아래끝 값을 빼야 하는데 더했습니다.',
        ],
        explain: '$\\dfrac{k}{n}$를 $x$로, $\\dfrac{1}{n}$을 $dx$로 바꾸면 $\\int_{0}^{1}e^x\\,dx=\\left[e^x\\right]_{0}^{1}=e-1$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 2,
        q: '다음 극한값을 구하십시오.\n\n$\\lim_{n\\to\\infty}\\dfrac{1}{n}\\left\\{\\left(\\dfrac{1}{n}\\right)^2+\\left(\\dfrac{2}{n}\\right)^2+\\cdots+\\left(\\dfrac{n}{n}\\right)^2\\right\\}$',
        answer: '1/3',
        wrong: [{ a: '1', why: '마지막 항 $\\left(\\dfrac{n}{n}\\right)^2=1$만 보았습니다. 합 전체는 $\\int_{0}^{1}x^2\\,dx$입니다.' }],
        explain: '시그마로 쓰면 $\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\left(\\dfrac{k}{n}\\right)^2\\dfrac{1}{n}=\\int_{0}^{1}x^2\\,dx=\\dfrac{1}{3}$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 3,
        q: '다음 극한값을 구하십시오.\n\n$\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{2}{n}\\left(1+\\dfrac{2k}{n}\\right)$',
        answer: '4',
        wrong: [
          { a: '2', why: '구간을 $[0, 2]$로 보았습니다. 시작점이 1이므로 구간은 $[1, 3]$입니다.' },
          { a: '3/2', why: '구간을 $[1, 2]$로 보았습니다. 폭이 $\\dfrac{2}{n}$이므로 끝점은 $1+2=3$입니다.' },
        ],
        explain: '시작점 1, 폭 $\\dfrac{2}{n}$이므로 $\\int_{1}^{3}x\\,dx=\\left[\\dfrac{1}{2}x^2\\right]_{1}^{3}=\\dfrac{9-1}{2}=4$입니다.',
      },
      {
        id: 'p7', level: 2, type: 'short', check: 'number', concept: 4,
        q: '다음 극한값을 구하십시오.\n\n$\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{\\pi}{n}\\sin\\dfrac{k\\pi}{n}$',
        answer: '2',
        hint: '시작점은 0, 폭은 $\\dfrac{\\pi}{n}$입니다.',
        wrong: [
          { a: '0', why: '$\\left[-\\cos x\\right]_{0}^{\\pi}$에서 $\\cos\\pi=-1$을 1로 셈했습니다.' },
          { a: '-2', why: '$\\int\\sin x\\,dx=-\\cos x$의 부호를 놓쳤습니다.' },
        ],
        explain: '$x_k=\\dfrac{k\\pi}{n}$, $\\Delta x=\\dfrac{\\pi}{n}$이므로 구간은 $[0, \\pi]$입니다. $\\int_{0}^{\\pi}\\sin x\\,dx=\\left[-\\cos x\\right]_{0}^{\\pi}=1-(-1)=2$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 4,
        q: '다음 극한값은 무엇입니까?\n\n$\\lim_{n\\to\\infty}\\left(\\dfrac{1}{n+1}+\\dfrac{1}{n+2}+\\cdots+\\dfrac{1}{n+n}\\right)$',
        choices: ['$\\ln 2$', '$0$', '$1$', '$\\ln 3$'],
        answer: 0,
        hint: '각 항의 분모와 분자를 $n$으로 나누어 봅니다.',
        why: [
          '',
          '각 항이 0에 가까워진다고 합까지 0으로 보았습니다. 항의 개수 $n$도 늘어납니다.',
          '항이 $n$개이고 각 항이 대략 $\\dfrac{1}{n}$이라고 어림했습니다. 실제 항은 $\\dfrac{1}{n}$보다 작습니다($\\dfrac{1}{2n}$부터 $\\dfrac{1}{n+1}$까지).',
          '구간을 $[1, 3]$으로 보았습니다. $\\int_{0}^{1}\\dfrac{1}{1+x}\\,dx=\\ln 2$입니다.',
        ],
        explain: '$\\sum_{k=1}^{n}\\dfrac{1}{n+k}=\\sum_{k=1}^{n}\\dfrac{1}{1+\\frac{k}{n}}\\cdot\\dfrac{1}{n}\\to\\int_{0}^{1}\\dfrac{1}{1+x}\\,dx=\\ln 2$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 2,
        q: '다음 극한값을 구하십시오.\n\n$\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{1}{n}\\sqrt{\\dfrac{k}{n}}$',
        answer: '2/3',
        wrong: [{ a: '3/2', why: '$\\int\\sqrt{x}\\,dx$에서 새 지수 $\\dfrac{3}{2}$을 곱했습니다. 나누어야 하므로 $\\dfrac{2}{3}$를 곱합니다.' }],
        explain: '$\\int_{0}^{1}\\sqrt{x}\\,dx=\\left[\\dfrac{2}{3}x\\sqrt{x}\\right]_{0}^{1}=\\dfrac{2}{3}$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 3,
        q: '연속함수 $f(x)$에 대하여 $\\int_{1}^{3}f(x)\\,dx=8$일 때, 다음 극한값을 구하십시오.\n\n$\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{1}{n}f\\left(1+\\dfrac{2k}{n}\\right)$',
        answer: '4',
        hint: '폭이 $\\dfrac{2}{n}$가 되도록 $\\dfrac{1}{n}=\\dfrac{1}{2}\\cdot\\dfrac{2}{n}$로 바꿉니다.',
        wrong: [
          { a: '8', why: '폭을 $\\dfrac{2}{n}$로 맞추지 않았습니다. $\\dfrac{1}{n}=\\dfrac{1}{2}\\cdot\\dfrac{2}{n}$이므로 $\\dfrac{1}{2}$을 곱해야 합니다.' },
          { a: '16', why: '$\\dfrac{1}{2}$을 곱해야 하는데 2를 곱했습니다.' },
        ],
        explain: '$\\sum_{k=1}^{n}\\dfrac{1}{n}f\\left(1+\\dfrac{2k}{n}\\right)=\\dfrac{1}{2}\\sum_{k=1}^{n}\\dfrac{2}{n}f\\left(1+\\dfrac{2k}{n}\\right)\\to\\dfrac{1}{2}\\int_{1}^{3}f(x)\\,dx=4$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 0,
        q: '곡선 $y=x$ 아래의 구간 $[0, 2]$를 $n$등분하여, 오른쪽 끝의 함숫값으로 만든 직사각형 넓이의 합을 $S_n$, 왼쪽 끝의 함숫값으로 만든 합을 $s_n$이라 할 때, $S_n-s_n$은 무엇입니까?',
        choices: ['$\\dfrac{4}{n}$', '$\\dfrac{2}{n}$', '$0$', '$2$'],
        answer: 0,
        hint: '두 합에서 겹치는 항을 지우면 끝의 두 직사각형만 남습니다.',
        why: [
          '',
          '폭 $\\dfrac{2}{n}$에 높이 차 $f(2)-f(0)=2$를 곱해야 합니다. 높이 차를 1로 보았습니다.',
          '$n$이 한없이 커질 때의 극한이 0입니다. $n$이 정해져 있으면 차는 0이 아닙니다.',
          '높이 차 2만 보고 폭 $\\dfrac{2}{n}$를 곱하지 않았습니다.',
        ],
        explain: '$S_n=\\sum_{k=1}^{n}f(x_k)\\Delta x$, $s_n=\\sum_{k=0}^{n-1}f(x_k)\\Delta x$이므로 $S_n-s_n=\\{f(2)-f(0)\\}\\Delta x=2\\times\\dfrac{2}{n}=\\dfrac{4}{n}$입니다. $n\\to\\infty$이면 0이 되어 두 합의 극한이 같아집니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 4,
        q: '다음 극한값을 구하십시오.\n\n$\\lim_{n\\to\\infty}\\dfrac{1^3+2^3+3^3+\\cdots+n^3}{n^4}$',
        answer: '1/4',
        wrong: [{ a: '1', why: '분자의 최고차항을 $n^4$으로 보았습니다. $\\sum k^3=\\left\\{\\dfrac{n(n+1)}{2}\\right\\}^2$의 최고차항은 $\\dfrac{n^4}{4}$입니다.' }],
        explain: '$\\dfrac{1}{n^4}\\sum_{k=1}^{n}k^3=\\sum_{k=1}^{n}\\left(\\dfrac{k}{n}\\right)^3\\dfrac{1}{n}\\to\\int_{0}^{1}x^3\\,dx=\\dfrac{1}{4}$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 4,
        q: '다음 극한값을 구하십시오.\n\n$\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{k}{n^2}e^{\\frac{k}{n}}$',
        answer: '1',
        hint: '$\\dfrac{k}{n^2}=\\dfrac{k}{n}\\cdot\\dfrac{1}{n}$입니다. 부분적분법을 씁니다.',
        wrong: [{ a: '0', why: '$\\left[e^x\\right]_{0}^{1}$을 $e$로 셈했습니다. $e-1$입니다.' }],
        explain: '$\\sum_{k=1}^{n}\\dfrac{k}{n}e^{\\frac{k}{n}}\\cdot\\dfrac{1}{n}\\to\\int_{0}^{1}xe^x\\,dx=\\left[xe^x\\right]_{0}^{1}-\\int_{0}^{1}e^x\\,dx=e-(e-1)=1$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 4,
        q: '다음 극한값은 무엇입니까?\n\n$\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{2k}{n^2+k^2}$',
        choices: ['$\\ln 2$', '$2\\ln 2$', '$\\dfrac{1}{2}\\ln 2$', '$1$'],
        answer: 0,
        hint: '분모와 분자를 $n^2$으로 나누면 $\\dfrac{2\\cdot\\frac{k}{n}}{1+\\left(\\frac{k}{n}\\right)^2}\\cdot\\dfrac{1}{n}$입니다.',
        why: [
          '',
          '분자 $2x$가 분모 $1+x^2$의 도함수 그대로이므로 2를 더 곱하지 않습니다.',
          '분자 $2x$가 분모의 도함수 그대로이므로 $\\dfrac{1}{2}$을 곱하지 않습니다.',
          '분모를 $1$로 어림했습니다. $\\int_{0}^{1}\\dfrac{2x}{1+x^2}\\,dx$를 계산합니다.',
        ],
        explain: '$\\dfrac{2k}{n^2+k^2}=\\dfrac{2\\cdot\\frac{k}{n}}{1+\\left(\\frac{k}{n}\\right)^2}\\cdot\\dfrac{1}{n}$이므로 극한은 $\\int_{0}^{1}\\dfrac{2x}{1+x^2}\\,dx=\\left[\\ln(1+x^2)\\right]_{0}^{1}=\\ln 2$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 4,
        q: '다음 극한값을 구하십시오.\n\n$\\lim_{n\\to\\infty}\\sum_{k=1}^{3n}\\dfrac{1}{n}\\left(\\dfrac{k}{n}\\right)^2$',
        answer: '9',
        hint: '$k$가 $3n$까지이므로 $\\dfrac{k}{n}$는 3까지 변합니다.',
        wrong: [
          { a: '1/3', why: '$k$의 범위를 $n$까지로 보았습니다. $\\dfrac{k}{n}$는 0부터 3까지 변합니다.' },
          { a: '3', why: '구간은 $[0, 3]$으로 맞게 보았지만 위끝 3을 세제곱하지 않고 $\\dfrac{3^{2}}{3}$으로 계산했습니다. $\\left[\\dfrac{1}{3}x^3\\right]_{0}^{3}=\\dfrac{27}{3}=9$입니다.' },
        ],
        explain: '$\\dfrac{k}{n}$를 $x$, $\\dfrac{1}{n}$을 $dx$로 보면 $k=1$부터 $3n$까지에서 $x$는 0부터 3까지입니다. $\\int_{0}^{3}x^2\\,dx=\\dfrac{27}{3}=9$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 3,
        q: '다음 극한값을 구하십시오.\n\n$\\lim_{n\\to\\infty}\\sum_{k=n+1}^{2n}\\dfrac{k^2}{n^3}$',
        answer: '7/3',
        hint: '$\\dfrac{k^2}{n^3}=\\left(\\dfrac{k}{n}\\right)^2\\dfrac{1}{n}$이고, $k=n+1$부터 $2n$까지이면 $\\dfrac{k}{n}$는 1부터 2까지 변합니다.',
        wrong: [
          { a: '8/3', why: '구간을 $[0, 2]$로 보았습니다. $k$가 $n+1$부터 시작하므로 구간은 $[1, 2]$입니다.' },
          { a: '1/3', why: '구간을 $[0, 1]$로 보았습니다.' },
        ],
        explain: '$\\sum_{k=n+1}^{2n}\\left(\\dfrac{k}{n}\\right)^2\\dfrac{1}{n}\\to\\int_{1}^{2}x^2\\,dx=\\dfrac{8-1}{3}=\\dfrac{7}{3}$입니다.',
      },
    ],

    deeper: [
      {
        title: '아르키메데스와 포물선 아래의 넓이',
        body: '고대 그리스의 아르키메데스는 포물선과 직선으로 둘러싸인 넓이를 구하려고, 그 안에 삼각형을 끝없이 채워 넣고 넓이를 더했습니다. 삼각형 넓이가 공비 $\\dfrac{1}{4}$인 등비수열을 이루어 합이 처음 삼각형의 $\\dfrac{4}{3}$배가 된다는 것을 보였습니다. "잘게 나누어 더하고 끝까지 간다"는 구분구적법의 생각은 이처럼 2000년도 더 전부터 있었습니다.\n\n' +
          '17세기에 미적분의 기본정리가 발견되면서, 이런 무한한 합을 부정적분 하나로 계산할 수 있게 되었습니다. 이 단원에서 급수를 정적분으로 바꾸는 것은 그 거꾸로의 길을 걷는 것입니다.',
      },
      {
        title: '컴퓨터는 정적분을 어떻게 계산할까?',
        body: '$e^{-x^2}$처럼 부정적분을 기본 함수로 나타낼 수 없는 함수도 정적분의 값은 필요합니다(정규분포의 확률이 그 예입니다). 컴퓨터나 계산기는 구간을 아주 잘게 나누어 직사각형(또는 사다리꼴) 넓이를 더하는 방법으로 정적분의 근삿값을 구합니다.\n\n' +
          '다음 단원에서는 정적분을 넓이와 부피, 움직인 거리를 구하는 데 씁니다. 그때 "잘게 나누어 더한다"는 이 단원의 생각이 왜 그 식이 성립하는지를 설명해 줍니다.',
      },
    ],

    faq: [
      {
        q: '오른쪽 끝으로 하든 왼쪽 끝으로 하든 답이 같은 이유가 뭔가요?',
        a: '두 합의 차는 맨 끝의 직사각형 하나와 맨 앞의 직사각형 하나의 차이, 곧 $\\{f(b)-f(a)\\}\\Delta x$뿐입니다. $n$이 커지면 $\\Delta x$가 0에 가까워지므로 차도 0에 가까워집니다. 그래서 $f$가 연속이면 두 합의 극한은 같습니다.',
      },
      {
        q: '급수를 정적분으로 바꿀 때 구간은 어떻게 정하나요?',
        a: '$x$로 바꿀 덩어리(보통 $a+\\dfrac{(b-a)k}{n}$)에 $k=0$과 $k=n$을 넣어 봅니다. 그 두 값이 아래끝과 위끝입니다. 그리고 앞에 곱해진 $\\Delta x$가 $\\dfrac{b-a}{n}$와 맞는지 꼭 확인합니다. 맞지 않으면 상수를 곱하고 나누어 맞춥니다.',
      },
      {
        q: '각 항이 0으로 가는데 왜 합은 0이 아니에요?',
        a: '항 하나하나는 0에 가까워지지만 더하는 항의 개수 $n$이 한없이 늘어나기 때문입니다. 폭이 0에 가까운 직사각형도 무수히 많이 모이면 넓이가 생기는 것과 같습니다. 그래서 "0에 가까운 수 × 아주 많은 개수"의 극한을 정적분으로 정확히 계산하는 것입니다.',
      },
    ],

    mistakes: [
      '$\\dfrac{1}{n}$(폭)을 남기지 않고 $\\dfrac{k}{n}$만 $x$로 바꾸는 실수 — 분모의 $n$ 하나는 반드시 $dx$가 됩니다.',
      '시작점이 있는 급수 $\\sum\\dfrac{2}{n}f\\left(1+\\dfrac{2k}{n}\\right)$의 구간을 $[0, 2]$로 보는 실수 — 구간은 $[1, 3]$입니다(또는 $\\int_{0}^{2}f(1+x)\\,dx$).',
      '폭이 $\\dfrac{1}{n}$인데 함수 속은 $\\dfrac{2k}{n}$인 경우 상수를 맞추지 않는 실수 — $\\dfrac{1}{n}=\\dfrac{1}{2}\\cdot\\dfrac{2}{n}$로 고쳐 씁니다.',
    ],

    gens: [
      {
        id: 'riemann-01',
        level: 1,
        title: '구간 [0, 1] 꼴 급수의 극한',
        make: function (R) {
          var p = R.int(1, 3), c = R.pick([1, 2, 3, 4, 6]), d = R.int(0, 3);
          var form = R.int(0, 1);
          var ans = R.F(c, p + 1).add(d);
          var q, inner;
          if (form === 0 || d !== 0) {
            var kp = p === 1 ? '\\dfrac{k}{n}' : '\\left(\\dfrac{k}{n}\\right)^{' + p + '}';
            inner = (c === 1 ? '' : c) + kp + (d ? '+' + d : '');
            q = '\\lim_{n\\to\\infty}\\sum_{k=1}^{n}' + (d ? '\\dfrac{1}{n}\\left(' + inner + '\\right)' : '\\dfrac{' + c + '}{n}' + kp);
          } else {
            q = '\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{' + (c === 1 ? '' : c) + (p === 1 ? 'k' : 'k^{' + p + '}') + '}{n^{' + (p + 1) + '}}';
          }
          var integ = (c === 1 ? '' : c) + xp(p) + (d ? '+' + d : '');
          var antider = (R.F(c, p + 1).eq(1) ? '' : tex(R.F(c, p + 1))) + 'x^{' + (p + 1) + '}' + (d ? '+' + (d === 1 ? '' : d) + 'x' : '');
          return {
            type: 'short', check: 'number', concept: 2,
            q: '다음 극한값을 구하십시오.\n\n$' + q + '$',
            answer: ans.toString(),
            hint: '$\\dfrac{k}{n}$를 $x$로, $\\dfrac{1}{n}$을 $dx$로 바꿉니다.',
            wrong: dedup(ans, [
              [R.F(c + d), '적분하지 않고 $x=1$을 넣은 값을 답했습니다. $\\int_{0}^{1}(' + integ + ')\\,dx$를 계산합니다.'],
              [R.F(c, p + 1), d ? '상수 $' + d + '$의 정적분 $\\int_{0}^{1}' + d + '\\,dx=' + d + '$' + R.josa(d, '을/를') + ' 빠뜨렸습니다.' : '계산을 다시 확인해 보십시오.'],
              [R.F(c * (p + 1)).add(d), '$x^{' + p + '}$' + '의 적분에서 $' + (p + 1) + '$' + R.josa(p + 1, '으로/로') + ' 나누지 않고 곱했습니다.'],
            ]),
            explain: '$\\dfrac{k}{n}$를 $x$로, $\\dfrac{1}{n}$을 $dx$로 바꾸면 $\\int_{0}^{1}(' + integ + ')\\,dx=\\left[' + antider + '\\right]_{0}^{1}=' + tex(ans) + '$입니다.',
          };
        },
      },
      {
        id: 'riemann-to-integral',
        level: 1,
        title: '급수를 정적분으로 나타내기',
        make: function (R) {
          var a = R.int(1, 3), m = R.int(2, 4);
          var fs = [
            { t: function (u) { return '\\left(' + u + '\\right)^{2}'; }, x: 'x^{2}' },
            { t: function (u) { return '\\left(' + u + '\\right)^{3}'; }, x: 'x^{3}' },
            { t: function (u) { return '\\sqrt{' + u + '}'; }, x: '\\sqrt{x}' },
            { t: function (u) { return 'e^{' + u + '}'; }, x: 'e^{x}' },
            { t: function (u) { return '\\dfrac{1}{' + u + '}'; }, x: '\\dfrac{1}{x}' },
          ];
          var f = R.pick(fs);
          var u = a + '+\\frac{' + m + 'k}{n}';
          var q = '\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{' + m + '}{n}' + f.t(u);
          function I(lo, hi, coef) { return '$' + (coef || '') + '\\int_{' + lo + '}^{' + hi + '}' + f.x + '\\,dx$'; }
          var correct = I(a, a + m);
          var cands = [
            [I(0, m), '시작점 $' + a + '$' + R.josa(a, '을/를') + ' 빠뜨렸습니다. $x$는 $' + a + '$부터 $' + (a + m) + '$까지입니다.'],
            [I(a, a + 1), '폭을 $\\dfrac{1}{n}$로 보았습니다. 폭이 $\\dfrac{' + m + '}{n}$이므로 끝점은 $' + a + '+' + m + '=' + (a + m) + '$입니다.'],
            [I(a, a + m, m), '앞의 $\\dfrac{' + m + '}{n}$' + R.josa(m, '이/가') + ' 그대로 $dx$입니다. $' + m + '$' + R.josa(m, '을/를') + ' 따로 곱하지 않습니다.'],
            [I(a, m), '끝점을 $' + m + '$' + R.josa(m, '으로/로') + ' 보았습니다. 시작점 $' + a + '$에서 폭 $\\dfrac{' + m + '}{n}$으로 $n$걸음 가면 $' + (a + m) + '$입니다.'],
            [I(0, 1), '구간을 $[0, 1]$로 보았습니다. $x_k=' + a + '+\\dfrac{' + m + 'k}{n}$이므로 구간은 $[' + a + ', ' + (a + m) + ']$입니다.'],
          ];
          var reason = {};
          cands.forEach(function (w) { if (!(w[0] in reason)) reason[w[0]] = w[1]; });
          var pick = R.choices(correct, cands.map(function (w) { return w[0]; }));
          return {
            type: 'choice', concept: 3,
            q: '다음 극한을 정적분으로 바르게 나타낸 것을 고르십시오.\n\n$' + q + '$',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (s) { return s === correct ? '' : reason[s] || ''; }),
            explain: '시작점은 $' + a + '$, 폭은 $\\Delta x=\\dfrac{' + m + '}{n}$입니다. $k=0$이면 $x=' + a + '$, $k=n$이면 $x=' + (a + m) + '$이므로 답은 ' + correct + '입니다.',
          };
        },
      },
      {
        id: 'riemann-ab',
        level: 2,
        title: '일반 구간 꼴 급수의 극한',
        make: function (R) {
          var a = R.int(0, 3), m = R.int(1, 3), p = R.int(1, 2);
          if (a === 0 && m === 1) a = 1;                  // [0, 1] 꼴은 riemann-01 이 맡는다
          var widthIsM = m === 1 ? true : R.bool(0.6);   // 폭이 m/n 인가, 1/n 인가
          var full = powInt(R, p, a, a + m);              // ∫_a^{a+m} x^p dx
          var ans = widthIsM ? full : full.mul(R.F(1, m));
          var inner = (a === 0 ? '' : a + '+') + (m === 1 ? '\\frac{k}{n}' : '\\frac{' + m + 'k}{n}');
          var fx = p === 1 ? '\\left(' + inner + '\\right)' : '\\left(' + inner + '\\right)^{2}';
          var w = widthIsM ? (m === 1 ? '\\dfrac{1}{n}' : '\\dfrac{' + m + '}{n}') : '\\dfrac{1}{n}';
          var q = '\\lim_{n\\to\\infty}\\sum_{k=1}^{n}' + w + fx;
          var cands = [
            [powInt(R, p, 0, m).mul(widthIsM ? R.F(1) : R.F(1, m)), '시작점을 빠뜨려 구간을 $[0, ' + m + ']$' + R.josa(m, '으로/로') + ' 보았습니다.'],
            [widthIsM ? full.mul(R.F(1, m)) : full, widthIsM ? '폭 $\\dfrac{' + m + '}{n}$' + R.josa(m, '이/가') + ' 그대로 $dx$인데 $\\dfrac{1}{' + m + '}$을 더 곱했습니다.' : '폭이 $\\dfrac{1}{n}$뿐이므로 $\\dfrac{1}{n}=\\dfrac{1}{' + m + '}\\cdot\\dfrac{' + m + '}{n}$' + R.josa(m, '으로/로') + ' 맞추어 $\\dfrac{1}{' + m + '}$을 곱해야 합니다.'],
            [powInt(R, p, a, a + 1).mul(widthIsM ? R.F(1) : R.F(1, m)), '구간의 끝을 $' + (a + 1) + '$' + R.josa(a + 1, '으로/로') + ' 보았습니다.'],
          ];
          if (!widthIsM) cands.push([full.mul(m), '$\\dfrac{1}{' + m + '}$을 곱해야 하는데 $' + m + '$' + R.josa(m, '을/를') + ' 곱했습니다.']);
          var lo = a, hi = a + m;
          var anti = p === 1 ? '\\dfrac{1}{2}x^{2}' : '\\dfrac{1}{3}x^{3}';
          var pre = widthIsM ? '' : '\\dfrac{1}{' + m + '}';
          return {
            type: 'short', check: 'number', concept: 3,
            q: '다음 극한값을 구하십시오.\n\n$' + q + '$',
            answer: ans.toString(),
            hint: '시작점과 폭 $\\Delta x$를 찾아 구간을 정합니다.',
            wrong: dedup(ans, cands),
            explain: '시작점은 $' + a + '$, 함수 속 걸음은 $\\dfrac{' + m + '}{n}$이므로 구간은 $[' + lo + ', ' + hi + ']$입니다.' +
              (widthIsM ? '' : ' 앞의 폭이 $\\dfrac{1}{n}$이므로 $\\dfrac{1}{n}=\\dfrac{1}{' + m + '}\\cdot\\dfrac{' + m + '}{n}$' + R.josa(m, '으로/로') + ' 고쳐 씁니다.') + '\n\n' +
              '$' + pre + '\\int_{' + lo + '}^{' + hi + '}' + xp(p) + '\\,dx=' + pre + '\\left[' + anti + '\\right]_{' + lo + '}^{' + hi + '}=' + (widthIsM ? '' : pre + '\\times' + tex(full) + '=') + tex(ans) + '$',
          };
        },
      },
      {
        id: 'sum-reshape',
        level: 3,
        title: '모양을 바꾸어 정적분으로 (항의 범위·여러 항)',
        make: function (R) {
          var t = R.int(0, 2), q, ans, cands, explain, p;
          if (t === 0) {          // Σ (k² + c n k + d n²)/n³ = 1/3 + c/2 + d
            var c = R.int(1, 4), d = R.int(0, 3);
            ans = R.F(1, 3).add(R.F(c, 2)).add(d);
            var num = 'k^{2}+' + (c === 1 ? '' : c) + 'nk' + (d ? '+' + (d === 1 ? '' : d) + 'n^{2}' : '');
            q = '\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{' + num + '}{n^{3}}';
            var integ = 'x^{2}+' + (c === 1 ? '' : c) + 'x' + (d ? '+' + d : '');
            cands = [
              [R.F(1 + c + d), '적분하지 않고 $x=1$을 넣었습니다.'],
              [R.F(1, 3).add(R.F(c, 2)), d ? '$\\dfrac{' + (d === 1 ? '' : d) + 'n^{2}}{n^{3}}=' + (d === 1 ? '' : d) + '\\cdot\\dfrac{1}{n}$의 합(극한 $' + d + '$)을 빠뜨렸습니다.' : '계산을 다시 확인해 보십시오.'],
              [R.F(1, 3).add(c).add(d), '$' + (c === 1 ? '' : c) + 'x$의 적분에서 $\\dfrac{1}{2}$을 빠뜨렸습니다.'],
            ];
            explain = '분모와 분자를 $n^{2}$으로 나누면 $\\dfrac{' + num + '}{n^{3}}=\\left\\{\\left(\\dfrac{k}{n}\\right)^{2}+' + (c === 1 ? '' : c + '\\cdot ') + '\\dfrac{k}{n}' + (d ? '+' + d : '') + '\\right\\}\\dfrac{1}{n}$입니다.\n\n' +
              '$\\int_{0}^{1}(' + integ + ')\\,dx=\\dfrac{1}{3}+' + tex(R.F(c, 2)) + (d ? '+' + d : '') + '=' + tex(ans) + '$';
          } else if (t === 1) {   // Σ_{k=1}^{mn} (1/n)(k/n)^p = m^{p+1}/(p+1)
            var mm = R.int(2, 3); p = R.int(1, 3);
            ans = powInt(R, p, 0, mm);
            q = '\\lim_{n\\to\\infty}\\sum_{k=1}^{' + mm + 'n}\\dfrac{1}{n}' + (p === 1 ? '\\cdot\\dfrac{k}{n}' : '\\left(\\dfrac{k}{n}\\right)^{' + p + '}');
            cands = [
              [R.F(1, p + 1), '$k$의 범위를 $n$까지로 보았습니다. $\\dfrac{k}{n}$는 $0$부터 $' + mm + '$까지 변합니다.'],
              [R.F(mm, p + 1), '구간 $[0, ' + mm + ']$에서 $\\int_{0}^{' + mm + '}' + xp(p) + '\\,dx$를 계산할 때 위끝을 거듭제곱하지 않았습니다.'],
              [R.F(Math.pow(mm, p + 1)), '$' + (p + 1) + '$' + R.josa(p + 1, '으로/로') + ' 나누는 것을 빠뜨렸습니다.'],
            ];
            explain = '$\\dfrac{k}{n}$를 $x$, $\\dfrac{1}{n}$을 $dx$로 보면 $k=1$부터 $' + mm + 'n$까지에서 $x$는 0부터 $' + mm + '$까지 변합니다.\n\n' +
              '$\\int_{0}^{' + mm + '}' + xp(p) + '\\,dx=\\dfrac{' + mm + '^{' + (p + 1) + '}}{' + (p + 1) + '}=' + tex(ans) + '$';
          } else {                // Σ_{k=n+1}^{2n} k^p/n^{p+1} = ∫_1^2 x^p dx
            p = R.int(1, 3);
            var top = R.int(2, 3);
            ans = powInt(R, p, 1, top);
            q = '\\lim_{n\\to\\infty}\\sum_{k=n+1}^{' + top + 'n}\\dfrac{' + (p === 1 ? 'k' : 'k^{' + p + '}') + '}{n^{' + (p + 1) + '}}';
            cands = [
              [powInt(R, p, 0, top), '구간을 $[0, ' + top + ']$' + R.josa(top, '으로/로') + ' 보았습니다. $k$가 $n+1$부터 시작하므로 $x$는 1부터입니다.'],
              [powInt(R, p, 0, top - 1), '구간의 길이만 보고 $[0, ' + (top - 1) + ']$' + R.josa(top - 1, '으로/로') + ' 보았습니다.'],
              [R.F(Math.pow(top, p + 1) - 1), '$' + (p + 1) + '$' + R.josa(p + 1, '으로/로') + ' 나누는 것을 빠뜨렸습니다.'],
            ];
            explain = '$\\dfrac{' + (p === 1 ? 'k' : 'k^{' + p + '}') + '}{n^{' + (p + 1) + '}}=' + (p === 1 ? '\\dfrac{k}{n}' : '\\left(\\dfrac{k}{n}\\right)^{' + p + '}') + '\\cdot\\dfrac{1}{n}$이고, $k=n+1$부터 $' + top + 'n$까지이면 $\\dfrac{k}{n}$는 1부터 $' + top + '$까지 변합니다.\n\n' +
              '$\\int_{1}^{' + top + '}' + xp(p) + '\\,dx=\\dfrac{' + top + '^{' + (p + 1) + '}-1}{' + (p + 1) + '}=' + tex(ans) + '$';
          }
          return {
            type: 'short', check: 'number', concept: 4,
            q: '다음 극한값을 구하십시오.\n\n$' + q + '$',
            answer: ans.toString(),
            hint: '$\\dfrac{k}{n}$ 덩어리와 $\\dfrac{1}{n}$ 하나가 보이게 고친 뒤, $k$의 범위로 구간을 정합니다.',
            wrong: dedup(ans, cands),
            explain: explain,
          };
        },
      },
    ],
  });
})();
