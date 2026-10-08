/* 미적분학 · 리만 합과 미적분학의 기본정리
 * 분할·리만 합·정적분의 정의, 정적분의 성질과 적분의 평균값 정리, 기본정리 1(d/dx ∫ₐˣ f = f), 기본정리 2(∫ₐᵇ f = F(b)-F(a)),
 * 위끝이 함수인 적분의 미분. (치환적분·부분적분 같은 적분 기법은 다음 단원 — 여기서는 기본 공식만 쓴다) */
(function () {
  function dedupe(ans, wrongs) {
    var out = [], seen = {};
    wrongs.forEach(function (w) {
      if (!w[0] || w[0].eq(ans) || seen[w[0].toString()]) return;
      seen[w[0].toString()] = true;
      out.push({ a: w[0].toString(), why: w[1] });
    });
    return out;
  }
  function fr(f) { return f.toTex(); }
  // 괄호가 필요한 음수 분수: -\frac{1}{2} → \left(-\frac{1}{2}\right)
  function pfr(f) { var t = f.toTex(); return f.sign() < 0 ? '\\left(' + t + '\\right)' : t; }

  // 오른쪽 끝 리만 합 그림 (y=x^2, [0,1], 4등분)
  var rects = [];
  for (var k = 1; k <= 4; k++) {
    var x0 = (k - 1) / 4, x1 = k / 4, h = x1 * x1;
    rects.push({ from: [x0, 0], to: [x0, h] }, { from: [x0, h], to: [x1, h] }, { from: [x1, 0], to: [x1, h] });
  }

  Tutor.registerUnit({
    id: 'math-u-calc-04',
    course: 'math-u-calc',
    title: '리만 합과 미적분학의 기본정리',
    summary: '리만 합의 극한으로 정적분을 정의하고, 미적분학의 기본정리로 미분과 적분의 관계를 증명합니다.',
    goals: [
      '분할과 리만 합을 이용해 정적분을 정의하고, 간단한 리만 합을 계산할 수 있다.',
      '정적분의 성질과 적분의 평균값 정리를 쓸 수 있다.',
      '미적분학의 기본정리 1, 2의 내용과 증명의 흐름을 설명할 수 있다.',
      '위끝(아래끝)이 함수인 적분을 연쇄법칙과 함께 미분할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '리만 합과 정적분의 정의',
        body: '구간 $[a, b]$를 점 $a=x_0<x_1<\\cdots<x_n=b$로 나눈 것을 **분할**이라 하고, $k$번째 소구간의 길이를 $\\Delta x_k=x_k-x_{k-1}$이라 합니다. 각 소구간에서 점 $x_k^*$를 하나씩 골라 만든 합\n\n$S=\\sum_{k=1}^{n} f(x_k^*)\\,\\Delta x_k$\n\n를 **리만 합**이라 합니다. 직사각형 넓이(높이 $f(x_k^*)$, 밑변 $\\Delta x_k$)의 합입니다.\n\n가장 긴 소구간의 길이가 0으로 갈 때, 점을 어떻게 고르든 리만 합이 한 값 $I$에 가까워지면 $f$는 $[a, b]$에서 **적분가능**하다 하고\n\n$\\int_{a}^{b} f(x)\\,dx=I$\n\n로 씁니다. 닫힌구간에서 연속인 함수는 적분가능합니다.\n\n**등분할**하고 오른쪽 끝점을 고르면 $\\Delta x=\\dfrac{b-a}{n}$, $x_k=a+k\\Delta x$이므로\n\n$\\int_{a}^{b} f(x)\\,dx=\\lim_{n \\to \\infty}\\sum_{k=1}^{n} f(a+k\\Delta x)\\,\\Delta x$\n\n**예**: $\\int_{0}^{1}x^2\\,dx=\\lim_{n \\to \\infty}\\sum_{k=1}^{n}\\left(\\dfrac{k}{n}\\right)^2\\dfrac{1}{n}=\\lim_{n \\to \\infty}\\dfrac{n(n+1)(2n+1)}{6n^3}=\\dfrac{1}{3}$\n\n> 💡 $f(x)<0$인 부분에서는 $f(x_k^*)\\Delta x_k$가 음수이므로, 정적분은 $x$축 위의 넓이에서 아래의 넓이를 뺀 **부호 있는 넓이**입니다.',
        easy: '그림처럼 곡선 아래를 폭이 같은 직사각형 4개로 채워 넓이를 어림해 봅니다. 각 직사각형의 높이는 오른쪽 끝에서 잰 곡선의 높이입니다. 직사각형이 곡선 위로 조금씩 삐져나와 실제 넓이보다 조금 큽니다.\n\n직사각형을 더 가늘게 100개, 1000개로 나누면 삐져나온 부분이 거의 사라지고 합은 한 값($\\frac{1}{3}$)에 가까워집니다. 그 값이 정적분입니다.',
        fig: {
          type: 'coord', xmin: 0, xmax: 1.2, ymin: 0, ymax: 1.2, grid: false,
          fns: [{ expr: 'x^2', from: 0, to: 1.1, label: 'y=x^2' }],
          segments: rects,
          alt: '곡선 y=x^2 아래의 구간 [0, 1]을 폭 1/4인 직사각형 4개로 덮은 그림. 각 직사각형의 높이는 소구간 오른쪽 끝에서의 함숫값이라 곡선보다 조금 위로 나온다',
        },
        check: {
          type: 'short', check: 'number',
          q: '$f(x)=x$, 구간 $[0, 2]$를 4등분하고 각 소구간의 **오른쪽 끝점**을 고른 리만 합을 구하십시오.',
          answer: '5/2',
          wrong: [
            { a: '5', why: '함숫값만 더하고 소구간의 폭 $\\Delta x=\\frac{1}{2}$을 곱하지 않았습니다.' },
            { a: '3/2', why: '왼쪽 끝점($0$, $0.5$, $1$, $1.5$)을 골랐습니다. 오른쪽 끝점은 $0.5$, $1$, $1.5$, $2$입니다.' },
          ],
          explain: '$\\Delta x=\\frac{2}{4}=\\frac{1}{2}$이고 오른쪽 끝점은 $0.5$, $1$, $1.5$, $2$입니다. 리만 합은 $(0.5+1+1.5+2) \\times \\frac{1}{2}=5 \\times \\frac{1}{2}=\\frac{5}{2}$입니다.',
        },
      },
      {
        title: '정적분의 성질과 적분의 평균값 정리',
        body: '리만 합의 성질이 극한에서도 그대로 남아 다음이 성립합니다($f$, $g$는 적분가능).\n\n- $\\int_{a}^{b}\\{kf(x)+lg(x)\\}\\,dx=k\\int_{a}^{b}f(x)\\,dx+l\\int_{a}^{b}g(x)\\,dx$\n- $\\int_{a}^{c}f(x)\\,dx=\\int_{a}^{b}f(x)\\,dx+\\int_{b}^{c}f(x)\\,dx$\n- 약속: $\\int_{a}^{a}f(x)\\,dx=0$, $\\int_{b}^{a}f(x)\\,dx=-\\int_{a}^{b}f(x)\\,dx$\n- $[a, b]$에서 $f(x) \\le g(x)$이면 $\\int_{a}^{b}f(x)\\,dx \\le \\int_{a}^{b}g(x)\\,dx$\n- $[a, b]$에서 $m \\le f(x) \\le M$이면 $m(b-a) \\le \\int_{a}^{b}f(x)\\,dx \\le M(b-a)$\n\n**평균값**: $f$의 $[a, b]$에서의 평균값은 $\\dfrac{1}{b-a}\\int_{a}^{b}f(x)\\,dx$입니다.\n\n**적분의 평균값 정리**: $f$가 $[a, b]$에서 연속이면\n\n$f(c)=\\dfrac{1}{b-a}\\int_{a}^{b}f(x)\\,dx$\n\n인 $c$가 $[a, b]$에 있습니다. 까닭: 최대·최소 정리로 $f$의 최솟값 $m$과 최댓값 $M$이 있고, 평균값은 $m$과 $M$ 사이에 있으므로 중간값 정리로 그 값을 가지는 $c$가 있습니다.\n\n**예**: $f(x)=x^2$, $[0, 3]$에서 $\\int_{0}^{3}x^2\\,dx=9$이므로 평균값은 $\\frac{9}{3}=3$이고, $c^2=3$에서 $c=\\sqrt{3}$입니다.',
        easy: '울퉁불퉁한 모래 언덕을 평평하게 고르면 높이가 얼마가 될지 생각해 보십시오. 모래의 양(넓이 $\\int f$)은 그대로이고 폭은 $b-a$이니, 평평해진 높이는 넓이를 폭으로 나눈 값입니다. 이것이 평균값입니다.\n\n언덕의 가장 낮은 곳보다 높고 가장 높은 곳보다 낮으므로, 원래 언덕 어딘가에는 정확히 그 높이인 지점이 있습니다. 이것이 적분의 평균값 정리입니다.',
        check: {
          type: 'choice',
          q: '$f(x)=2x$의 구간 $[1, 3]$에서의 평균값은 무엇입니까?',
          choices: ['$4$', '$8$', '$6$'],
          answer: 0,
          why: ['', '정적분 $\\int_{1}^{3}2x\\,dx=8$에서 멈추었습니다. 구간의 길이 2로 나누어야 합니다.', '끝점 $x=3$에서의 함숫값입니다. 평균값은 정적분을 구간의 길이로 나눈 값입니다.'],
          explain: '$\\int_{1}^{3}2x\\,dx=[x^2]_{1}^{3}=9-1=8$이고 구간의 길이는 2이므로 평균값은 $\\frac{8}{2}=4$입니다.',
        },
      },
      {
        title: '미적분학의 기본정리 1',
        body: '$f$가 $[a, b]$에서 연속일 때 $F(x)=\\int_{a}^{x}f(t)\\,dt$ ($a \\le x \\le b$)로 정한 함수는 미분가능하고\n\n$\\dfrac{d}{dx}\\int_{a}^{x}f(t)\\,dt=f(x)$\n\n입니다. 넓이를 "쌓아 가는" 함수의 변화율은 그 자리의 높이와 같다는 뜻입니다.\n\n**증명의 흐름**: $h>0$이면\n\n$\\dfrac{F(x+h)-F(x)}{h}=\\dfrac{1}{h}\\int_{x}^{x+h}f(t)\\,dt=f(c_h)$\n\n인 $c_h$가 $[x, x+h]$에 있습니다(적분의 평균값 정리). $h \\to 0$이면 $c_h \\to x$이고 $f$가 연속이므로 $f(c_h) \\to f(x)$입니다. $h<0$일 때도 같습니다.\n\n**예**: $\\dfrac{d}{dx}\\int_{1}^{x}\\sin(t^2)\\,dt=\\sin(x^2)$\n\n$\\sin(t^2)$의 원시함수는 익숙한 함수들로 나타낼 수 없지만, 이 정리 덕분에 미분은 바로 할 수 있습니다. 또 이 정리는 **연속함수에는 언제나 원시함수가 있다**는 것도 알려 줍니다.\n\n> 💡 적분 안의 $t$는 이름만 빌린 변수(적분변수)입니다. 위끝 $x$와 헷갈리지 않도록 다른 문자를 씁니다.',
        easy: '수도꼭지에서 물이 나와 통에 쌓인다고 생각해 보십시오. $f(t)$는 시각 $t$에 1초 동안 나오는 물의 양(빠르기)이고, $F(x)$는 시각 $x$까지 통에 쌓인 물의 양입니다.\n\n"지금 이 순간 통의 물이 늘어나는 빠르기"는 당연히 "지금 수도꼭지에서 나오는 빠르기" $f(x)$와 같습니다. 이것이 기본정리 1입니다.',
        check: {
          type: 'choice',
          q: '$\\dfrac{d}{dx}\\int_{0}^{x}\\sqrt{1+t^3}\\,dt$는 무엇입니까?',
          choices: ['$\\sqrt{1+x^3}$', '$\\sqrt{1+x^3}-1$', '$\\dfrac{3x^2}{2\\sqrt{1+x^3}}$'],
          answer: 0,
          why: ['', '아래끝 0에서의 값을 뺄 필요가 없습니다. 아래끝이 상수이면 미분한 뒤 사라집니다.', '적분 안의 함수를 한 번 더 미분했습니다. 적분하고 미분하면 원래 함수로 돌아옵니다.'],
          explain: '기본정리 1에 의해 $\\dfrac{d}{dx}\\int_{0}^{x}f(t)\\,dt=f(x)$이므로 답은 $\\sqrt{1+x^3}$입니다.',
        },
      },
      {
        title: '미적분학의 기본정리 2',
        body: '$f$가 $[a, b]$에서 연속이고 $F$가 $f$의 원시함수($F\'=f$)이면\n\n$\\int_{a}^{b}f(x)\\,dx=F(b)-F(a)=\\Big[F(x)\\Big]_{a}^{b}$\n\n입니다.\n\n**증명**: $G(x)=\\int_{a}^{x}f(t)\\,dt$로 놓으면 기본정리 1에 의해 $G\'=f=F\'$입니다. 도함수가 같으므로(평균값 정리의 결과) $G(x)=F(x)+C$입니다. $x=a$를 넣으면 $0=F(a)+C$이므로 $C=-F(a)$이고, $x=b$를 넣으면\n\n$\\int_{a}^{b}f(t)\\,dt=G(b)=F(b)-F(a)$\n\n입니다.\n\n이 정리 덕분에 리만 합의 극한을 직접 계산하지 않고 원시함수의 값의 차로 정적분을 구합니다. 원시함수는 어느 것을 써도 상수 $C$가 빼면서 없어집니다.\n\n**예**\n\n- $\\int_{0}^{\\pi}\\sin x\\,dx=\\Big[-\\cos x\\Big]_{0}^{\\pi}=(-\\cos\\pi)-(-\\cos 0)=1+1=2$\n- $\\int_{0}^{1}\\dfrac{1}{1+x^2}\\,dx=\\Big[\\arctan x\\Big]_{0}^{1}=\\dfrac{\\pi}{4}$ (앞 단원의 역탄젠트)\n\n> 💡 기본정리 1은 "적분한 뒤 미분하면 제자리", 기본정리 2는 "미분한 것을 적분하면 변화량"입니다. 두 정리가 미분과 적분이 서로 거꾸로 된 연산임을 보여 줍니다.',
        easy: '자동차의 속도 그래프 아래의 넓이(정적분)는 움직인 거리입니다. 그런데 움직인 거리는 "도착 지점의 위치 − 출발 지점의 위치"로도 구할 수 있습니다.\n\n위치 $F$를 미분하면 속도 $f$이므로, 속도를 적분한 값은 위치의 차 $F(b)-F(a)$와 같습니다. 넓이를 직사각형으로 일일이 더하지 않고 두 번의 뺄셈으로 끝내는 셈입니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\int_{1}^{2}3x^2\\,dx$의 값을 구하십시오.',
          answer: '7',
          wrong: [
            { a: '-7', why: '$F(a)-F(b)$로 거꾸로 뺐습니다. 위끝에서의 값에서 아래끝에서의 값을 뺍니다.' },
            { a: '8', why: '아래끝에서의 값 $F(1)=1$을 빼지 않았습니다.' },
          ],
          explain: '$3x^2$의 원시함수는 $x^3$이므로 $\\int_{1}^{2}3x^2\\,dx=\\Big[x^3\\Big]_{1}^{2}=8-1=7$입니다.',
        },
      },
      {
        title: '위끝이 함수인 적분의 미분',
        body: '위끝이 $x$가 아니라 함수 $g(x)$이면 연쇄법칙이 함께 쓰입니다. $F(u)=\\int_{a}^{u}f(t)\\,dt$로 놓으면 $\\int_{a}^{g(x)}f(t)\\,dt=F(g(x))$이므로\n\n$\\dfrac{d}{dx}\\int_{a}^{g(x)}f(t)\\,dt=F\'(g(x))\\,g\'(x)=f(g(x))\\,g\'(x)$\n\n입니다. 아래끝도 함수 $h(x)$이면\n\n$\\dfrac{d}{dx}\\int_{h(x)}^{g(x)}f(t)\\,dt=f(g(x))\\,g\'(x)-f(h(x))\\,h\'(x)$\n\n입니다($\\int_{h}^{g}=\\int_{a}^{g}-\\int_{a}^{h}$으로 나누어 미분).\n\n**예**\n\n- $\\dfrac{d}{dx}\\int_{0}^{x^2}\\cos t\\,dt=\\cos(x^2) \\cdot 2x$\n- $\\dfrac{d}{dx}\\int_{x}^{5}e^{t^2}\\,dt=-e^{x^2}$ (아래끝에 $x$가 있으면 부호가 바뀝니다)\n- $\\dfrac{d}{dx}\\int_{x}^{2x}\\dfrac{1}{t}\\,dt=\\dfrac{1}{2x} \\cdot 2-\\dfrac{1}{x} \\cdot 1=0$ (실제로 이 적분은 $\\ln 2$로 일정합니다)\n\n> ⚠️ 위끝 $g(x)$를 $f$에 넣기만 하고 $g\'(x)$를 곱하지 않는 실수가 가장 많습니다.',
        easy: '물통 이야기로 돌아가 봅시다. 이번에는 시계가 2배 빠르게 돌아서, 실제 시각 $x$일 때 통에는 "시각 $2x$까지" 나온 물이 쌓여 있다고 합시다.\n\n그러면 통의 물이 늘어나는 빠르기는 그 시각의 수도꼭지 빠르기 $f(2x)$에, 시계가 빨리 가는 배율 2를 곱한 값이 됩니다. 이 배율이 $g\'(x)$입니다.',
        check: {
          type: 'choice',
          q: '$x>0$일 때 $\\dfrac{d}{dx}\\int_{1}^{x^3}\\dfrac{1}{t}\\,dt$는 무엇입니까?',
          choices: ['$\\dfrac{3}{x}$', '$\\dfrac{1}{x^3}$', '$3x^2$'],
          answer: 0,
          why: ['', '위끝 $x^3$을 넣기만 하고 $(x^3)\'=3x^2$을 곱하지 않았습니다.', '위끝의 도함수만 남겼습니다. $f(x^3)=\\frac{1}{x^3}$도 곱해야 합니다.'],
          explain: '$\\dfrac{1}{x^3} \\cdot 3x^2=\\dfrac{3}{x}$입니다. (실제로 $\\int_{1}^{x^3}\\frac{1}{t}\\,dt=\\ln x^3=3\\ln x$이고 미분하면 $\\frac{3}{x}$입니다.)',
        },
      },
    ],

    examples: [
      {
        q: '리만 합의 극한으로 $\\int_{0}^{2}x^2\\,dx$를 구하십시오. (등분할, 오른쪽 끝점)',
        steps: [
          '$n$등분하면 $\\Delta x=\\dfrac{2}{n}$, $x_k=\\dfrac{2k}{n}$입니다.',
          '리만 합은 $\\sum_{k=1}^{n}\\left(\\dfrac{2k}{n}\\right)^2\\dfrac{2}{n}=\\dfrac{8}{n^3}\\sum_{k=1}^{n}k^2=\\dfrac{8}{n^3} \\cdot \\dfrac{n(n+1)(2n+1)}{6}$입니다.',
          '$n \\to \\infty$이면 $\\dfrac{8}{6} \\cdot \\dfrac{n(n+1)(2n+1)}{n^3} \\to \\dfrac{8}{6} \\cdot 2=\\dfrac{8}{3}$입니다.',
          '확인: 기본정리 2로 $\\Big[\\frac{x^3}{3}\\Big]_{0}^{2}=\\frac{8}{3}$과 같습니다.',
        ],
        answer: '$\\dfrac{8}{3}$',
      },
      {
        q: '$g(x)=\\int_{1}^{x^2}\\ln t\\,dt$ ($x>0$)일 때 $g\'(x)$와 $g\'(e)$를 구하십시오.',
        steps: [
          '위끝이 $x^2$이므로 연쇄법칙을 씁니다: $g\'(x)=\\ln(x^2) \\cdot 2x$',
          '$\\ln(x^2)=2\\ln x$이므로 $g\'(x)=4x\\ln x$입니다.',
          '$x=e$를 넣으면 $g\'(e)=4e\\ln e=4e$입니다.',
        ],
        answer: '$g\'(x)=4x\\ln x$, $g\'(e)=4e$',
      },
      {
        q: '극한 $\\lim_{n \\to \\infty}\\sum_{k=1}^{n}\\dfrac{n}{n^2+k^2}$을 정적분으로 나타내어 구하십시오.',
        steps: [
          '분모·분자를 $n^2$으로 나누면 $\\dfrac{n}{n^2+k^2}=\\dfrac{1}{n} \\cdot \\dfrac{1}{1+\\left(\\frac{k}{n}\\right)^2}$입니다.',
          '$\\Delta x=\\frac{1}{n}$, $x_k=\\frac{k}{n}$로 보면 $[0, 1]$에서 $f(x)=\\dfrac{1}{1+x^2}$의 리만 합입니다.',
          '따라서 극한은 $\\int_{0}^{1}\\dfrac{1}{1+x^2}\\,dx=\\Big[\\arctan x\\Big]_{0}^{1}=\\dfrac{\\pi}{4}$입니다.',
        ],
        answer: '$\\dfrac{\\pi}{4}$',
      },
    ],

    terms: [
      { term: '분할', def: '구간 $[a, b]$를 점 $a=x_0<x_1<\\cdots<x_n=b$로 나눈 것입니다.' },
      { term: '리만 합', def: '각 소구간에서 고른 점의 함숫값에 소구간의 길이를 곱해 더한 합 $\\sum f(x_k^*)\\Delta x_k$입니다.' },
      { term: '정적분', def: '소구간의 길이가 0으로 갈 때 리만 합이 가까워지는 값 $\\int_{a}^{b}f(x)\\,dx$입니다. 부호 있는 넓이를 나타냅니다.' },
      { term: '적분가능', def: '점을 어떻게 고르든 리만 합이 한 값에 가까워지는 함수를 그 구간에서 적분가능하다고 합니다. 연속함수는 적분가능합니다.' },
      { term: '적분의 평균값 정리', def: '$[a, b]$에서 연속인 $f$에 대하여 $f(c)=\\frac{1}{b-a}\\int_{a}^{b}f(x)\\,dx$인 $c$가 $[a, b]$에 있다는 정리입니다.' },
      { term: '미적분학의 기본정리', def: '1: $\\frac{d}{dx}\\int_{a}^{x}f(t)\\,dt=f(x)$, 2: $\\int_{a}^{b}f(x)\\,dx=F(b)-F(a)$ ($F\'=f$). 미분과 적분이 서로 거꾸로 된 연산임을 보여 줍니다.' },
      { term: '원시함수', def: '$F\'=f$인 함수 $F$를 $f$의 원시함수(역도함수)라 합니다. 원시함수끼리는 상수만큼 차이 납니다.' },
      { term: '적분변수', def: '$\\int_{a}^{x}f(t)\\,dt$의 $t$처럼 적분 안에서만 쓰이는 변수입니다. 다른 문자로 바꾸어도 값이 같습니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '$f(x)=x^2$, 구간 $[0, 2]$를 4등분하고 각 소구간의 **왼쪽 끝점**을 고른 리만 합을 구하십시오.',
        answer: '7/4',
        wrong: [
          { a: '15/4', why: '오른쪽 끝점($0.5$, $1$, $1.5$, $2$)을 골랐습니다. 왼쪽 끝점은 $0$, $0.5$, $1$, $1.5$입니다.' },
          { a: '7/2', why: '함숫값의 합에 소구간의 폭 $\\Delta x=\\frac{1}{2}$을 곱하지 않았습니다.' },
        ],
        explain: '$\\Delta x=\\frac{1}{2}$, 왼쪽 끝점은 $0$, $0.5$, $1$, $1.5$이고 함숫값은 $0$, $0.25$, $1$, $2.25$입니다. 리만 합은 $(0+0.25+1+2.25) \\times \\frac{1}{2}=3.5 \\times \\frac{1}{2}=1.75=\\frac{7}{4}$입니다. (참값 $\\frac{8}{3}$보다 작습니다. 증가함수에서 왼쪽 끝점을 고르면 직사각형이 곡선 아래에 있기 때문입니다.)',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 3,
        q: '$\\int_{0}^{\\pi}\\sin x\\,dx$의 값을 구하십시오.',
        answer: '2',
        wrong: [
          { a: '-2', why: '$\\sin x$의 원시함수를 $\\cos x$로 썼습니다. $(\\cos x)\'=-\\sin x$이므로 원시함수는 $-\\cos x$입니다.' },
          { a: '0', why: '$\\sin\\pi-\\sin 0$을 계산했습니다. 함숫값이 아니라 원시함수의 값의 차를 구합니다.' },
        ],
        explain: '$\\int_{0}^{\\pi}\\sin x\\,dx=\\Big[-\\cos x\\Big]_{0}^{\\pi}=-\\cos\\pi+\\cos 0=1+1=2$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 2,
        q: '$\\dfrac{d}{dx}\\int_{2}^{x}e^{t^2}\\,dt$는 무엇입니까?',
        choices: ['$e^{x^2}$', '$e^{x^2}-e^4$', '$2xe^{x^2}$', '$0$'],
        answer: 0,
        why: [
          '',
          '아래끝에서의 값을 뺄 필요가 없습니다. 상수는 미분하면 사라집니다.',
          '적분 안의 함수를 미분했습니다. 기본정리 1에서는 적분 안의 함수가 그대로 나옵니다.',
          '정적분이 상수라고 보았습니다. 위끝이 $x$라서 $x$의 함수입니다.',
        ],
        explain: '기본정리 1에 의해 $\\dfrac{d}{dx}\\int_{2}^{x}e^{t^2}\\,dt=e^{x^2}$입니다. 아래끝이 상수이므로 어떤 수이든 결과는 같습니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: '모든 연속함수 $f$에 대하여 $\\int_{3}^{1}f(x)\\,dx=\\int_{1}^{3}f(x)\\,dx$입니다.',
        answer: false,
        explain: '위끝과 아래끝을 바꾸면 부호가 바뀝니다: $\\int_{3}^{1}f(x)\\,dx=-\\int_{1}^{3}f(x)\\,dx$. 두 값이 같은 것은 정적분이 0일 때뿐입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 1,
        q: '$f(x)=3x^2$의 구간 $[0, 2]$에서의 평균값을 구하십시오.',
        answer: '4',
        wrong: [
          { a: '8', why: '정적분 $\\int_{0}^{2}3x^2\\,dx=8$에서 멈추었습니다. 구간의 길이 2로 나눕니다.' },
          { a: '6', why: '양 끝 함숫값 $f(0)=0$, $f(2)=12$의 평균을 구했습니다. 곡선이므로 정적분을 써야 합니다.' },
        ],
        explain: '$\\int_{0}^{2}3x^2\\,dx=\\Big[x^3\\Big]_{0}^{2}=8$이고 구간의 길이가 2이므로 평균값은 $\\frac{8}{2}=4$입니다.',
      },
      {
        id: 'p6', level: 2, type: 'short', check: 'number', concept: 4,
        q: '$F(x)=\\int_{0}^{x^2}(t+1)\\,dt$일 때 $F\'(2)$의 값을 구하십시오.',
        answer: '20',
        hint: '위끝이 $x^2$이므로 연쇄법칙을 씁니다.',
        wrong: [
          { a: '5', why: '$f(x^2)=x^2+1$만 구하고 $(x^2)\'=2x$를 곱하지 않았습니다.' },
          { a: '3', why: '위끝 $x^2$ 대신 $x$를 넣었습니다. $f(2)$가 아니라 $f(4)$입니다.' },
        ],
        explain: '$F\'(x)=(x^2+1) \\cdot 2x$이므로 $F\'(2)=5 \\cdot 4=20$입니다. (확인: $F(x)=\\frac{x^4}{2}+x^2$, $F\'(x)=2x^3+2x$, $F\'(2)=16+4=20$)',
      },
      {
        id: 'p7', level: 2, type: 'choice', concept: 0,
        q: '$\\lim_{n \\to \\infty}\\sum_{k=1}^{n}\\dfrac{2}{n}\\left(1+\\dfrac{2k}{n}\\right)^2$과 같은 것은 무엇입니까?',
        choices: [
          '$\\int_{1}^{3}x^2\\,dx$',
          '$\\int_{0}^{2}x^2\\,dx$',
          '$\\int_{1}^{3}2x^2\\,dx$',
          '$\\int_{0}^{1}(1+2x)^2\\,dx$',
        ],
        answer: 0,
        hint: '$\\Delta x=\\frac{2}{n}$일 때 $x_k=1+\\frac{2k}{n}$는 어느 구간의 점입니까?',
        why: [
          '',
          '$x_k=1+\\frac{2k}{n}$는 1에서 3까지 움직입니다. 구간의 시작이 1입니다.',
          '$\\frac{2}{n}$는 $\\Delta x$이지 함수에 곱해진 계수가 아닙니다.',
          '$\\Delta x=\\frac{1}{n}$로 보면 앞의 $\\frac{2}{n}$에서 2가 남습니다. 이 적분은 구하는 값의 절반입니다.',
        ],
        explain: '$\\Delta x=\\frac{2}{n}$, $x_k=1+k\\Delta x$로 보면 $[1, 3]$을 $n$등분한 오른쪽 끝점이고, 함수는 $f(x)=x^2$입니다. 따라서 $\\int_{1}^{3}x^2\\,dx=\\frac{26}{3}$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 3,
        q: '$\\int_{0}^{\\ln 3}e^x\\,dx$의 값을 구하십시오.',
        answer: '2',
        wrong: [
          { a: '3', why: '아래끝에서의 값 $e^0=1$을 빼지 않았습니다.' },
          { a: '1', why: '위끝의 값 $e^{\\ln 3}=3$을 확인하십시오. $3-1=2$입니다.' },
        ],
        explain: '$\\int_{0}^{\\ln 3}e^x\\,dx=\\Big[e^x\\Big]_{0}^{\\ln 3}=e^{\\ln 3}-e^0=3-1=2$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
        q: '$x>0$에서 $G(x)=\\int_{x}^{3x}\\dfrac{1}{t}\\,dt$일 때 $G\'(2)$의 값을 구하십시오.',
        answer: '0',
        hint: '위끝과 아래끝이 모두 $x$의 함수입니다.',
        wrong: [
          { a: '1/2', why: '아래끝에서 생기는 항 $-\\frac{1}{x}$을 빠뜨렸습니다.' },
          { a: '-1/3', why: '위끝 $3x$의 도함수 3을 곱하지 않았습니다. $\\frac{1}{3x} \\cdot 3$입니다.' },
        ],
        explain: '$G\'(x)=\\dfrac{1}{3x} \\cdot 3-\\dfrac{1}{x} \\cdot 1=\\dfrac{1}{x}-\\dfrac{1}{x}=0$이므로 $G\'(2)=0$입니다. 실제로 $G(x)=\\ln 3x-\\ln x=\\ln 3$으로 일정합니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 1,
        q: '$\\int_{0}^{1}e^{x^2}\\,dx$의 값의 범위로 알맞은 것은 무엇입니까?',
        choices: ['$1$ 이상 $e$ 이하', '$0$ 이상 $1$ 이하', '$e$ 이상 $e^2$ 이하', '$\\frac{1}{e}$ 이상 $1$ 이하'],
        answer: 0,
        hint: '$[0, 1]$에서 $e^{x^2}$의 최솟값과 최댓값을 구하십시오.',
        why: [
          '',
          '$e^{x^2} \\ge 1$이므로 넓이는 1보다 작을 수 없습니다.',
          '$[0, 1]$에서 $e^{x^2} \\le e$이고 구간의 길이가 1이므로 $e$를 넘을 수 없습니다.',
          '$e^{-x^2}$의 범위와 헷갈렸습니다. 지수가 $x^2 \\ge 0$이므로 $e^{x^2} \\ge 1$입니다.',
        ],
        explain: '$0 \\le x \\le 1$이면 $0 \\le x^2 \\le 1$이므로 $1 \\le e^{x^2} \\le e$입니다. 구간의 길이가 1이므로 $1 \\le \\int_{0}^{1}e^{x^2}\\,dx \\le e$입니다. (원시함수를 몰라도 범위를 알 수 있습니다.)',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 4,
        q: '연속함수 $f$가 모든 $x>0$에 대하여 $\\int_{0}^{x^2}f(t)\\,dt=x^4+x^2$을 만족합니다. $f(4)$의 값을 구하십시오.',
        answer: '9',
        hint: '양변을 $x$에 대하여 미분하십시오. 왼쪽에는 연쇄법칙이 필요합니다.',
        wrong: [
          { a: '36', why: '오른쪽을 미분한 $4x^3+2x$에 $x=2$를 넣고 멈추었습니다. 왼쪽의 $f(x^2) \\cdot 2x$에서 $2x$로 나누어야 합니다.' },
          { a: '264', why: '$f(4)$를 $x=4$에서의 도함수로 보았습니다. $f(x^2)$이므로 $x^2=4$, 곧 $x=2$를 넣습니다.' },
        ],
        explain: '양변을 미분하면 $f(x^2) \\cdot 2x=4x^3+2x$이므로 $f(x^2)=2x^2+1$, 곧 $f(t)=2t+1$입니다. 따라서 $f(4)=9$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 2,
        q: '$F(x)=\\int_{0}^{x}(t^2-4t+3)\\,dt$가 극댓값을 가지는 $x$의 값을 구하십시오.',
        answer: '1',
        hint: '기본정리 1로 $F\'(x)$를 구한 뒤 부호의 변화를 보십시오.',
        wrong: [
          { a: '3', why: '$x=3$에서는 $F\'$의 부호가 $-$에서 $+$로 바뀌므로 극솟값입니다.' },
          { a: '2', why: '$F\'$이 최소인 점입니다. 극값은 $F\'=0$이고 부호가 바뀌는 곳에서 생깁니다.' },
        ],
        explain: '$F\'(x)=x^2-4x+3=(x-1)(x-3)$입니다. $x<1$에서 $+$, $1<x<3$에서 $-$, $x>3$에서 $+$이므로 $x=1$에서 극대, $x=3$에서 극소입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 0,
        q: '$\\lim_{n \\to \\infty}\\sum_{k=1}^{n}\\dfrac{n}{n^2+k^2}$의 값은 무엇입니까?',
        choices: ['$\\dfrac{\\pi}{4}$', '$\\ln 2$', '$\\dfrac{1}{2}$', '$\\dfrac{\\pi}{2}$'],
        answer: 0,
        hint: '$\\dfrac{1}{n}$을 묶어 내고 $\\dfrac{k}{n}$를 $x$로 보십시오.',
        why: [
          '',
          '$\\int_{0}^{1}\\frac{1}{1+x}\\,dx$와 헷갈렸습니다. 분모는 $1+x^2$입니다.',
          '$\\frac{1}{1+x^2}$의 끝점 $x=1$에서의 값입니다. 리만 합의 극한은 정적분입니다.',
          '구간을 $[0, \\infty)$로 보았습니다. $\\frac{k}{n}$는 0에서 1까지만 움직입니다.',
        ],
        explain: '$\\dfrac{n}{n^2+k^2}=\\dfrac{1}{n} \\cdot \\dfrac{1}{1+(k/n)^2}$이므로 극한은 $\\int_{0}^{1}\\dfrac{1}{1+x^2}\\,dx=\\Big[\\arctan x\\Big]_{0}^{1}=\\dfrac{\\pi}{4}$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 1,
        q: '$f(x)=\\dfrac{1}{x^2}$에 대하여 구간 $[1, 4]$에서 적분의 평균값 정리를 만족하는 $c$의 값을 구하십시오.',
        answer: '2',
        hint: '평균값을 먼저 구하고 $f(c)$가 그 값이 되는 $c$를 찾으십시오.',
        wrong: [
          { a: '1/4', why: '평균값 $f(c)$를 답했습니다. 구하는 것은 $c$입니다.' },
          { a: '5/2', why: '구간의 가운데 점을 답했습니다. $f$가 일차함수가 아니면 가운데 점이 아닐 수 있습니다.' },
        ],
        explain: '$\\int_{1}^{4}\\dfrac{1}{x^2}\\,dx=\\Big[-\\dfrac{1}{x}\\Big]_{1}^{4}=-\\dfrac{1}{4}+1=\\dfrac{3}{4}$이고 평균값은 $\\dfrac{3}{4} \\div 3=\\dfrac{1}{4}$입니다. $\\dfrac{1}{c^2}=\\dfrac{1}{4}$, $1 \\le c \\le 4$에서 $c=2$입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 1,
        q: '$\\int_{-1}^{2}|x|\\,dx$의 값을 구하십시오.',
        answer: '5/2',
        hint: '$x=0$에서 구간을 나누어 절댓값을 없애십시오.',
        wrong: [
          { a: '3/2', why: '절댓값을 무시하고 $\\int_{-1}^{2}x\\,dx$를 구했습니다. $x<0$인 부분은 $-x$로 바꾸어야 합니다.' },
          { a: '3', why: '$x<0$인 부분의 넓이를 1로 계산했습니다. $\\int_{-1}^{0}(-x)\\,dx=\\Big[-\\frac{x^2}{2}\\Big]_{-1}^{0}=\\frac{1}{2}$입니다.' },
        ],
        explain: '$\\int_{-1}^{2}|x|\\,dx=\\int_{-1}^{0}(-x)\\,dx+\\int_{0}^{2}x\\,dx=\\dfrac{1}{2}+2=\\dfrac{5}{2}$입니다. (두 삼각형의 넓이 $\\frac{1}{2}$과 2의 합입니다.)',
      },
    ],

    deeper: [
      {
        title: '적분할 수 없는 함수와 그 다음 이야기',
        body: '$[0, 1]$에서 $x$가 유리수이면 1, 무리수이면 0인 함수(디리클레 함수)를 생각해 봅시다. 어느 소구간에나 유리수와 무리수가 모두 있으므로, 점을 유리수로 고르면 리만 합은 언제나 1, 무리수로 고르면 언제나 0입니다. 분할을 아무리 잘게 해도 한 값으로 모이지 않으므로 이 함수는 **리만 적분가능하지 않습니다**.\n\n연속함수, 그리고 불연속점이 유한 개뿐인 유계함수는 적분가능합니다. 더 일반적으로는 "불연속점들의 집합이 길이 0으로 덮일 만큼 작은" 유계함수가 리만 적분가능합니다(르베그의 판정법).\n\n20세기 초 르베그는 $x$축이 아니라 $y$축을 나누는 새로운 적분을 만들어, 디리클레 함수의 적분을 0으로 정할 수 있게 했습니다. 확률론과 현대 해석학은 이 르베그 적분 위에 서 있습니다.',
      },
      {
        title: '접선과 넓이가 만나다',
        body: '넓이를 잘게 나누어 더하는 생각은 아르키메데스(기원전 3세기)가 포물선으로 둘러싸인 넓이를 구할 때부터 있었고, 접선을 구하는 문제는 17세기에 페르마와 데카르트가 다루었습니다. 두 문제는 오랫동안 따로 연구되었습니다.\n\n17세기 후반 뉴턴과 라이프니츠는 각자 이 두 문제가 서로 거꾸로 된 문제임을 알아차리고 체계적인 계산법을 만들었습니다. 오늘날 쓰는 $\\int$와 $dx$ 기호는 라이프니츠의 것입니다("합"을 뜻하는 라틴어 summa의 S를 길게 늘인 모양).\n\n정적분을 리만 합의 극한으로 엄밀하게 정의한 것은 19세기의 리만이며, 이 단원에서 배운 정의가 그것입니다.',
      },
    ],

    faq: [
      {
        q: '정적분과 넓이는 같은 건가요?',
        a: '$f(x) \\ge 0$이면 정적분은 곡선 아래의 넓이와 같습니다. 하지만 $f(x)<0$인 부분은 음수로 더해지므로, 정적분은 "$x$축 위의 넓이 − 아래의 넓이"입니다. 넓이를 구하려면 $\\int_{a}^{b}|f(x)|\\,dx$처럼 절댓값을 씌우거나 구간을 나누어 계산합니다.',
      },
      {
        q: '∫ₐˣ f(t)dt에서 왜 x 대신 t를 쓰나요?',
        a: '$x$는 위끝으로 이미 쓰고 있어서, 적분 안에서 움직이는 변수와 구별하려는 것입니다. 적분변수는 이름만 빌린 문자라 $t$, $s$, $u$ 무엇을 써도 값이 같습니다. $\\int_{a}^{x}f(x)\\,dx$처럼 쓰면 같은 $x$가 두 가지 뜻을 가져 헷갈립니다.',
      },
      {
        q: '원시함수를 모르는 함수도 정적분이 있나요?',
        a: '있습니다. 정적분은 리만 합의 극한으로 정의되므로 원시함수와 상관없이 존재합니다(연속이면). 예를 들어 $e^{-x^2}$은 원시함수를 익숙한 함수로 쓸 수 없지만 $\\int_{0}^{1}e^{-x^2}\\,dx$는 약 $0.7468$인 분명한 수입니다. 기본정리 1에 의해 $\\int_{0}^{x}e^{-t^2}\\,dt$ 자체가 원시함수가 됩니다.',
      },
    ],

    mistakes: [
      '$\\dfrac{d}{dx}\\int_{a}^{x^2}f(t)\\,dt=f(x^2)$처럼 연쇄법칙을 빠뜨리는 실수 — $2x$를 곱해 $f(x^2) \\cdot 2x$입니다.',
      '$\\int_{a}^{b}f(x)\\,dx$를 $F(a)-F(b)$로 계산하는 실수 — 위끝의 값에서 아래끝의 값을 뺍니다.',
      '리만 합에서 소구간의 폭 $\\Delta x$를 곱하지 않는 실수 — 직사각형의 넓이는 높이 × 폭입니다.',
    ],

    gens: [
      {
        id: 'riemann-sum',
        level: 1,
        title: '등분할 리만 합 계산',
        make: function (R) {
          var kind = R.pick(['sq', 'lin']);
          var b = R.int(1, 4), n = R.int(2, 4);
          var p = R.nonzero(-3, 3), q = R.int(0, 4);
          function f(x) { return kind === 'sq' ? x.mul(x) : x.mul(p).add(q); }
          var fTex = kind === 'sq' ? 'x^2' : R.fmt.poly([p, q]);
          var dx = R.F(b, n);
          var rule = R.pick(['left', 'right', 'mid']);
          var ruleName = { left: '왼쪽 끝점', right: '오른쪽 끝점', mid: '가운데 점' };
          function pts(r) {
            var out = [];
            for (var i = 1; i <= n; i++) {
              var x = r === 'left' ? dx.mul(i - 1) : r === 'right' ? dx.mul(i) : dx.mul(i).sub(dx.div(2));
              out.push(x);
            }
            return out;
          }
          function sumF(r) { return pts(r).reduce(function (s, x) { return s.add(f(x)); }, R.F(0)); }
          var ans = sumF(rule).mul(dx);
          var others = ['left', 'right', 'mid'].filter(function (r) { return r !== rule; });
          var P = pts(rule);
          return {
            type: 'short', check: 'number', concept: 0,
            q: '$f(x)=' + fTex + '$, 구간 $[0, ' + b + ']$' + R.josa(b, '을/를') + ' ' + n + '등분하고 각 소구간의 **' + ruleName[rule] + '**을 고른 리만 합을 구하십시오.',
            answer: ans.toString(),
            hint: '소구간의 폭은 $\\Delta x=' + b + ' \\div ' + n + '=' + fr(dx) + '$입니다.',
            wrong: dedupe(ans, [
              [sumF(rule), '함숫값의 합에 소구간의 폭 $\\Delta x=' + fr(dx) + '$' + R.josa(dx, '을/를') + ' 곱하지 않았습니다.'],
              [sumF(others[0]).mul(dx), ruleName[others[0]] + '을' + ' 골랐습니다. 문제는 ' + ruleName[rule] + '입니다.'],
              [sumF(others[1]).mul(dx), ruleName[others[1]] + '을' + ' 골랐습니다. 문제는 ' + ruleName[rule] + '입니다.'],
            ]),
            explain: '$\\Delta x=' + fr(dx) + '$이고 고르는 점은 $' + P.map(fr).join(', ') + '$입니다. 함숫값은 $' + P.map(function (x) { return fr(f(x)); }).join(', ') + '$이므로\n\n리만 합 $=(' + P.map(function (x) { return pfr(f(x)); }).join('+') + ') \\times ' + fr(dx) + '=' + fr(sumF(rule)) + ' \\times ' + fr(dx) + '=' + fr(ans) + '$입니다.',
          };
        },
      },
      {
        id: 'ftc2-poly',
        level: 1,
        title: '기본정리 2로 정적분 계산',
        make: function (R) {
          var c2 = R.int(-3, 3), c1 = R.int(-4, 4), c0 = R.int(-5, 5);
          if (c2 === 0 && c1 === 0) c1 = 2;
          var a = R.int(-2, 2), b = R.int(a + 1, 3);
          var Fc = [R.F(c2, 3), R.F(c1, 2), R.F(c0), R.F(0)];
          function F(x) { return Fc[0].mul(x * x * x).add(Fc[1].mul(x * x)).add(Fc[2].mul(x)); }
          function f(x) { return R.F(c2 * x * x + c1 * x + c0); }
          var ans = F(b).sub(F(a));
          var poly = R.fmt.poly([c2, c1, c0]);
          var Fpoly = R.fmt.poly(Fc);
          return {
            type: 'short', check: 'number', concept: 3,
            q: '$\\int_{' + a + '}^{' + b + '}(' + poly + ')\\,dx$의 값을 구하십시오.',
            answer: ans.toString(),
            hint: '원시함수 $F(x)$를 구해 $F(' + b + ')-F(' + a + ')$를 계산하십시오.',
            wrong: dedupe(ans, [
              [F(a).sub(F(b)), '$F(a)-F(b)$로 거꾸로 뺐습니다. 위끝에서의 값에서 아래끝에서의 값을 뺍니다.'],
              [f(b).sub(f(a)), '원시함수가 아니라 적분 안의 함수의 값 $f(' + b + ')-f(' + a + ')$를 구했습니다.'],
              [F(b), '아래끝에서의 값 $F(' + a + ')$' + R.josa(a, '을/를') + ' 빼지 않았습니다.'],
            ]),
            explain: '원시함수는 $F(x)=' + Fpoly + '$입니다.\n\n$F(' + b + ')=' + fr(F(b)) + '$, $F(' + a + ')=' + fr(F(a)) + '$이므로 정적분은 $' + fr(F(b)) + '-' + pfr(F(a)) + '=' + fr(ans) + '$입니다.',
          };
        },
      },
      {
        id: 'ftc-chain',
        level: 2,
        title: '위끝(아래끝)이 함수인 적분의 미분',
        make: function (R) {
          var kindF = R.pick(['sq', 'lin']);
          var p = R.nonzero(-3, 3), q = R.int(-4, 4);
          function f(t) { return kindF === 'sq' ? t * t + q : p * t + q; }
          var fTex = kindF === 'sq' ? R.fmt.poly([1, 0, q], 't') : R.fmt.poly([p, q], 't');
          var up = R.pick(['x2', 'x3', '2x', '3x']);
          var both = R.bool(0.35);
          var x0 = R.pick([1, 2, -1, -2]);
          if (up === 'x3' && Math.abs(x0) === 2) x0 = x0 / 2;
          var g = { x2: [x0 * x0, 2 * x0, 'x^2'], x3: [x0 * x0 * x0, 3 * x0 * x0, 'x^3'], '2x': [2 * x0, 2, '2x'], '3x': [3 * x0, 3, '3x'] }[up];
          var lower = both ? 'x' : String(R.int(0, 2));
          var ansN = f(g[0]) * g[1] - (both ? f(x0) : 0);
          var ans = R.F(ansN);
          var wrongs = [
            [R.F(f(g[0]) - (both ? f(x0) : 0)), '위끝을 $f$에 넣기만 하고 $x=' + x0 + '$에서의 $(' + g[2] + ')\'=' + g[1] + '$' + R.josa(g[1], '을/를') + ' 곱하지 않았습니다(연쇄법칙).'],
          ];
          // 위끝 대신 x 를 넣은 실수 (아래끝이 상수일 때만 f(x0) 하나로 나온다)
          if (!both) wrongs.push([R.F(f(x0)), '위끝 $' + g[2] + '$ 대신 $x$를 넣었습니다. $f(' + g[2] + ')$에 $x=' + x0 + '$' + R.josa(x0, '을/를') + ' 넣어야 합니다.']);
          if (both) wrongs.push([R.F(f(g[0]) * g[1] + f(x0)), '아래끝에서 생기는 항의 부호가 틀렸습니다. 아래끝이 $x$이면 $-f(x)$를 더합니다.']);
          wrongs.push([R.F(f(g[0]) * g[1] * -1 + (both ? f(x0) : 0)), '부호를 거꾸로 했습니다. 위끝 쪽 항이 $+$입니다.']);
          var expr = '\\int_{' + lower + '}^{' + g[2] + '}(' + fTex + ')\\,dt';
          return {
            type: 'short', check: 'number', concept: 4,
            q: '$F(x)=' + expr + '$일 때 $F\'(' + x0 + ')$의 값을 구하십시오.',
            answer: ans.toString(),
            hint: both ? '위끝과 아래끝이 모두 $x$의 함수입니다. $f(g(x))g\'(x)-f(h(x))h\'(x)$' : '위끝이 $' + g[2] + '$이므로 연쇄법칙을 씁니다.',
            wrong: dedupe(ans, wrongs),
            explain: '적분 안의 함수 $f(t)=' + fTex + '$에 대하여 $F\'(x)=f(' + g[2] + ') \\cdot (' + g[2] + ')\'' + (both ? '-f(x)' : '') + '$입니다.\n\n$x=' + x0 + '$에서 $' + g[2] + '=' + g[0] + '$, $(' + g[2] + ')\'=' + g[1] + '$이고 $f(' + g[0] + ')=' + f(g[0]) + '$' + (both ? ', $f(' + x0 + ')=' + f(x0) + '$' : '') + '이므로\n\n$F\'(' + x0 + ')=' + R.fmt.paren(f(g[0])) + ' \\cdot ' + R.fmt.paren(g[1]) + (both ? '-' + R.fmt.paren(f(x0)) : '') + '=' + ansN + '$입니다.',
          };
        },
      },
      {
        id: 'avg-value',
        level: 2,
        title: '함수의 평균값',
        make: function (R) {
          var p = R.nonzero(-3, 3), q = R.int(-3, 3), r = R.int(-4, 4);
          var a = R.int(-2, 1), b = R.int(a + 1, 3);
          function f(x) { return R.F(p * x * x + q * x + r); }
          var Fc = [R.F(p, 3), R.F(q, 2), R.F(r), R.F(0)];
          function F(x) { return Fc[0].mul(x * x * x).add(Fc[1].mul(x * x)).add(Fc[2].mul(x)); }
          var I = F(b).sub(F(a));
          var L = b - a;
          var ans = I.div(L);
          var mid = R.F(a + b, 2);
          var fmid = mid.mul(mid).mul(p).add(mid.mul(q)).add(r);
          return {
            type: 'short', check: 'number', concept: 1,
            q: '$f(x)=' + R.fmt.poly([p, q, r]) + '$의 구간 $[' + a + ', ' + b + ']$에서의 평균값을 구하십시오.',
            answer: ans.toString(),
            hint: '평균값 $=\\dfrac{1}{b-a}\\int_{a}^{b}f(x)\\,dx$',
            wrong: dedupe(ans, [
              [I, '정적분 값에서 멈추었습니다. 구간의 길이 ' + L + R.josa(L, '으로/로') + ' 나누어야 합니다.'],
              [f(a).add(f(b)).div(2), '양 끝 함숫값의 평균을 구했습니다. 곡선의 평균값은 정적분으로 구합니다.'],
              [fmid, '구간의 가운데 점에서의 함숫값입니다. 이차함수에서는 평균값과 다릅니다.'],
            ]),
            explain: '원시함수는 $F(x)=' + R.fmt.poly(Fc) + '$입니다. $\\int_{' + a + '}^{' + b + '}f(x)\\,dx=F(' + b + ')-F(' + a + ')=' + fr(F(b)) + '-' + pfr(F(a)) + '=' + fr(I) + '$입니다.\n\n구간의 길이 ' + L + R.josa(L, '으로/로') + ' 나누면 평균값은 $' + pfr(I) + ' \\div ' + L + '=' + fr(ans) + '$입니다.',
          };
        },
      },
    ],
  });
})();
