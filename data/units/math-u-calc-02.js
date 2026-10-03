/* 미적분학 · 초월함수의 미분
 * 역함수의 연속성·도함수, 역삼각함수(arcsin·arccos·arctan)의 정의역·치역과 도함수,
 * 쌍곡선함수(sinh·cosh·tanh)와 도함수, 로그 미분법(x^x 꼴).
 * 쌍곡선함수 이름은 렌더러에 함수 명령이 없어 \operatorname{sinh} 로 쓴다. */
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
  // π 의 유리수배 → TeX.  F(-1,6) → '-\frac{\pi}{6}', F(2,3) → '\frac{2\pi}{3}', F(1) → '\pi', 0 → '0'
  function piTex(f) {
    if (f.isZero()) return '0';
    var s = f.sign() < 0 ? '-' : '', n = Math.abs(f.num), d = f.den;
    var top = (n === 1 ? '' : n) + '\\pi';
    return s + (d === 1 ? top : '\\frac{' + top + '}{' + d + '}');
  }

  Tutor.registerUnit({
    id: 'math-u-calc-02',
    course: 'math-u-calc',
    title: '초월함수의 미분',
    summary: '역함수의 미분을 바탕으로 역삼각함수와 쌍곡선함수를 정의해 미분하고, 로그 미분법을 익힙니다.',
    goals: [
      '역함수의 연속성을 이해하고, 역함수의 미분계수를 원래 함수의 미분계수로 구할 수 있다.',
      '역삼각함수의 정의역과 치역을 알고 그 값과 도함수를 구할 수 있다.',
      '쌍곡선함수를 정의하고 그 도함수를 구할 수 있다.',
      '로그 미분법으로 $x^x$ 꼴의 함수와 여러 인수의 곱·몫을 미분할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '역함수의 연속성과 역함수의 도함수',
        body: '함수 $f$가 구간 $I$에서 연속이고 **순증가**(또는 순감소)이면 일대일이므로 역함수가 있고, 그 역함수 $f^{-1}$도 연속이며 순증가(순감소)입니다. 그래프로 보면 $y=f^{-1}(x)$는 $y=f(x)$를 직선 $y=x$에 대하여 뒤집은 것이라 끊긴 곳이 생기지 않습니다.\n\n**역함수의 도함수**: $f$가 $a$에서 미분가능하고 $f\'(a) \\ne 0$, $b=f(a)$이면 $f^{-1}$도 $b$에서 미분가능하고\n\n$\\left(f^{-1}\\right)^{\\prime}(b)=\\dfrac{1}{f\'(a)}$\n\n입니다. 미분가능함을 받아들이면 $f\\left(f^{-1}(x)\\right)=x$의 양변을 미분해 $f\'\\left(f^{-1}(x)\\right) \\cdot \\left(f^{-1}\\right)^{\\prime}(x)=1$에서 바로 얻습니다. 뒤집으면 가로와 세로가 바뀌므로 접선의 기울기도 역수가 됩니다.\n\n**예**: $f(x)=x^3+x$는 $f\'(x)=3x^2+1>0$이라 순증가합니다. $f(1)=2$이므로\n\n$\\left(f^{-1}\\right)^{\\prime}(2)=\\dfrac{1}{f\'(1)}=\\dfrac{1}{4}$\n\n> ⚠️ $f\'(a)=0$이면 역함수의 그래프는 그 점에서 접선이 세로로 서서 미분가능하지 않습니다. 예: $y=x^3$의 역함수 $y=\\sqrt[3]{x}$는 $x=0$에서 미분가능하지 않습니다.',
        easy: '그림의 두 곡선 $y=e^x$과 $y=\\ln x$는 직선 $y=x$를 거울로 삼아 서로 비친 모습입니다. 점 $(1, e)$와 점 $(e, 1)$은 서로 비친 짝입니다.\n\n거울에 비치면 "오른쪽으로 1 갈 때 위로 $e$ 오른다"가 "오른쪽으로 $e$ 갈 때 위로 1 오른다"로 바뀝니다. 그래서 $(1, e)$에서 기울기가 $e$이면 짝인 $(e, 1)$에서 기울기는 $\\frac{1}{e}$입니다.',
        fig: {
          type: 'coord', xmin: -2, xmax: 4, ymin: -2, ymax: 4,
          fns: [
            { expr: 'exp(x)', from: -2, to: 1.38, label: 'y=e^x' },
            { expr: 'ln(x)', from: 0.14, to: 4, label: 'y=ln x' },
            { expr: 'x', from: -2, to: 4 },
          ],
          points: [{ x: 1, y: 2.718, label: '(1, e)' }, { x: 2.718, y: 1, label: '(e, 1)' }],
          alt: '곡선 y=e^x와 y=ln x, 직선 y=x. 두 곡선은 직선 y=x에 대하여 대칭이고, 점 (1, e)와 (e, 1)이 서로 대칭인 짝으로 표시되어 있다',
        },
        check: {
          type: 'short', check: 'number',
          q: '$f(x)=x^3+2x+1$의 역함수를 $g$라 할 때, $g\'(4)$의 값을 구하십시오.',
          answer: '1/5',
          wrong: [
            { a: '5', why: '$f\'(1)$을 그대로 답했습니다. 역함수의 미분계수는 그 역수입니다.' },
            { a: '1/50', why: '$f\'(4)$를 썼습니다. $g(4)=a$, 곧 $f(a)=4$인 $a=1$에서의 $f\'(a)$를 써야 합니다.' },
          ],
          explain: '$f(1)=1+2+1=4$이므로 $g(4)=1$입니다. $f\'(x)=3x^2+2$에서 $f\'(1)=5$이므로 $g\'(4)=\\dfrac{1}{f\'(1)}=\\dfrac{1}{5}$입니다.',
        },
      },
      {
        title: '역삼각함수의 정의역과 치역',
        body: '삼각함수는 주기함수라 일대일이 아니므로, 정의역을 일대일이 되는 구간으로 **제한**한 뒤 역함수를 만듭니다.\n\n| 함수 | 제한한 원래 함수 | 정의역 | 치역 |\n|---|---|---|---|\n| $y=\\arcsin x$ | $\\sin x$, $-\\frac{\\pi}{2} \\le x \\le \\frac{\\pi}{2}$ | $[-1, 1]$ | $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$ |\n| $y=\\arccos x$ | $\\cos x$, $0 \\le x \\le \\pi$ | $[-1, 1]$ | $[0, \\pi]$ |\n| $y=\\arctan x$ | $\\tan x$, $-\\frac{\\pi}{2}<x<\\frac{\\pi}{2}$ | 실수 전체 | $\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$ |\n\n$y=\\arcsin x$는 "사인값이 $x$인 각 가운데 $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$에 있는 것"을 뜻합니다. 예: $\\arcsin\\frac{1}{2}=\\frac{\\pi}{6}$, $\\arccos\\left(-\\frac{1}{2}\\right)=\\frac{2\\pi}{3}$, $\\arctan 1=\\frac{\\pi}{4}$\n\n- $\\sin(\\arcsin x)=x$는 $-1 \\le x \\le 1$에서 늘 성립하지만, $\\arcsin(\\sin x)=x$는 $-\\frac{\\pi}{2} \\le x \\le \\frac{\\pi}{2}$에서만 성립합니다. 예: $\\arcsin\\left(\\sin\\frac{5\\pi}{6}\\right)=\\frac{\\pi}{6}$\n- $\\lim_{x \\to \\infty}\\arctan x=\\frac{\\pi}{2}$, $\\lim_{x \\to -\\infty}\\arctan x=-\\frac{\\pi}{2}$이므로 $y=\\arctan x$의 그래프는 두 수평점근선 $y=\\pm\\frac{\\pi}{2}$를 가집니다.\n\n> ⚠️ $\\sin^{-1}x$로도 쓰지만 이것은 $\\arcsin x$이지 $\\dfrac{1}{\\sin x}$이 아닙니다.',
        easy: '$\\arcsin$은 "각도 찾기 기계"입니다. 사인값을 넣으면 각을 돌려주는데, 사인값이 같은 각은 끝없이 많으므로 기계는 미리 정한 범위 $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$(오른쪽 반원)에서만 답을 고릅니다.\n\n$\\arccos$은 위쪽 반원 $[0, \\pi]$에서 답을 고릅니다. 사인은 위아래(높이)를, 코사인은 좌우(가로 위치)를 재므로, 각 값이 한 번씩만 나오는 반원이 서로 다릅니다.',
        check: {
          type: 'choice',
          q: '$\\arccos\\left(-\\frac{1}{2}\\right)$의 값은 무엇입니까?',
          choices: ['$\\frac{2\\pi}{3}$', '$-\\frac{\\pi}{3}$', '$\\frac{4\\pi}{3}$'],
          answer: 0,
          why: ['', '$\\arccos$의 치역은 $[0, \\pi]$라서 음수가 나올 수 없습니다. 게다가 $\\cos\\left(-\\frac{\\pi}{3}\\right)=\\frac{1}{2}$입니다.', '$\\cos\\frac{4\\pi}{3}=-\\frac{1}{2}$이 맞지만 $\\frac{4\\pi}{3}$는 치역 $[0, \\pi]$ 밖에 있습니다.'],
          explain: '$[0, \\pi]$에서 코사인값이 $-\\frac{1}{2}$인 각은 $\\frac{2\\pi}{3}$ 하나뿐입니다.',
        },
      },
      {
        title: '역삼각함수의 도함수',
        body: '$y=\\arcsin x$ ($-1<x<1$)이면 $\\sin y=x$, $-\\frac{\\pi}{2}<y<\\frac{\\pi}{2}$입니다. 양변을 $x$에 대하여 미분하면 $\\cos y \\cdot \\dfrac{dy}{dx}=1$입니다. 이 범위에서 $\\cos y>0$이므로 $\\cos y=\\sqrt{1-\\sin^2 y}=\\sqrt{1-x^2}$입니다.\n\n| 함수 | 도함수 | 범위 |\n|---|---|---|\n| $\\arcsin x$ | $\\dfrac{1}{\\sqrt{1-x^2}}$ | $-1<x<1$ |\n| $\\arccos x$ | $-\\dfrac{1}{\\sqrt{1-x^2}}$ | $-1<x<1$ |\n| $\\arctan x$ | $\\dfrac{1}{1+x^2}$ | 실수 전체 |\n\n$\\arctan$은 $\\tan y=x$를 미분하면 $\\dfrac{1}{\\cos^2 y} \\cdot \\dfrac{dy}{dx}=1$이고 $\\dfrac{1}{\\cos^2 y}=1+\\tan^2 y=1+x^2$이라서 얻습니다.\n\n합성함수에는 연쇄법칙을 함께 씁니다: $\\dfrac{d}{dx}\\arctan(3x)=\\dfrac{3}{1+9x^2}$\n\n> 💡 $\\arcsin x+\\arccos x=\\frac{\\pi}{2}$(상수)이므로 두 도함수는 부호만 다릅니다.',
        easy: '외우기 전에 모양을 봅니다. $\\arctan x$의 그래프는 가운데($x=0$)에서 가장 가파르고(기울기 1), 양옆으로 갈수록 점근선에 붙으며 평평해집니다. 그래서 도함수 $\\dfrac{1}{1+x^2}$은 $x=0$에서 1이고 $x$가 커질수록 0에 가까워집니다.\n\n$\\arcsin x$는 양 끝 $x=\\pm1$에서 그래프가 세로로 서므로, 도함수의 분모 $\\sqrt{1-x^2}$이 그곳에서 0이 됩니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\dfrac{d}{dx}\\arctan x$의 $x=2$에서의 값을 구하십시오.',
          answer: '1/5',
          wrong: [
            { a: '-1/3', why: '분모를 $1-x^2$으로 썼습니다. 역탄젠트의 도함수는 $\\dfrac{1}{1+x^2}$입니다.' },
            { a: '1/3', why: '분모에서 $x$를 제곱하지 않았습니다. $1+x^2=1+4=5$입니다.' },
          ],
          explain: '$\\dfrac{d}{dx}\\arctan x=\\dfrac{1}{1+x^2}$이므로 $x=2$에서 $\\dfrac{1}{1+4}=\\dfrac{1}{5}$입니다.',
        },
      },
      {
        title: '쌍곡선함수와 그 도함수',
        body: '지수함수로 다음 세 함수를 정의합니다.\n\n$\\operatorname{sinh}\\,x=\\dfrac{e^x-e^{-x}}{2}, \\quad \\operatorname{cosh}\\,x=\\dfrac{e^x+e^{-x}}{2}, \\quad \\operatorname{tanh}\\,x=\\dfrac{\\operatorname{sinh}\\,x}{\\operatorname{cosh}\\,x}$\n\n읽을 때는 하이퍼볼릭 사인, 하이퍼볼릭 코사인, 하이퍼볼릭 탄젠트라 합니다. $\\operatorname{cosh}^2\\,x-\\operatorname{sinh}^2\\,x=1$이 성립하므로 점 $(\\operatorname{cosh}\\,t, \\operatorname{sinh}\\,t)$는 쌍곡선 $x^2-y^2=1$ 위에 있습니다. 원 $x^2+y^2=1$ 위의 점 $(\\cos t, \\sin t)$와 닮아서 이런 이름이 붙었습니다.\n\n**도함수**: $(e^x)\'=e^x$, $(e^{-x})\'=-e^{-x}$을 쓰면\n\n$\\dfrac{d}{dx}\\,\\operatorname{sinh}\\,x=\\operatorname{cosh}\\,x, \\quad \\dfrac{d}{dx}\\,\\operatorname{cosh}\\,x=\\operatorname{sinh}\\,x, \\quad \\dfrac{d}{dx}\\,\\operatorname{tanh}\\,x=\\dfrac{1}{\\operatorname{cosh}^2\\,x}$\n\n삼각함수와 달리 $\\operatorname{cosh}$의 도함수에 **마이너스가 붙지 않습니다**.\n\n- $\\operatorname{sinh}$는 기함수, $\\operatorname{cosh}$는 우함수이고 $\\operatorname{cosh}\\,x \\ge 1$입니다.\n- $\\operatorname{tanh}$의 치역은 $(-1, 1)$이고 두 수평점근선 $y=\\pm1$을 가집니다.\n\n예: $\\operatorname{cosh}(\\ln 2)=\\dfrac{2+\\frac{1}{2}}{2}=\\dfrac{5}{4}$',
        easy: '$\\operatorname{cosh}\\,x$는 $e^x$과 $e^{-x}$의 평균, $\\operatorname{sinh}\\,x$는 둘의 차의 절반입니다. 그림에서 오른쪽으로 가면 $e^{-x}$은 거의 0이 되므로 두 곡선 모두 $\\frac{e^x}{2}$에 가까워집니다.\n\n$\\operatorname{cosh}$의 그래프는 양 끝을 잡고 늘어뜨린 줄의 모양(현수선)입니다. 포물선과 비슷해 보이지만 다른 곡선입니다.',
        fig: {
          type: 'coord', xmin: -3, xmax: 3, ymin: -4, ymax: 5,
          fns: [
            { expr: '(exp(x)+exp(-x))/2', from: -2.6, to: 2.6, label: 'y=cosh x' },
            { expr: '(exp(x)-exp(-x))/2', from: -2.6, to: 2.6, label: 'y=sinh x' },
          ],
          alt: '곡선 y=cosh x는 점 (0, 1)을 가장 낮은 점으로 하는 U자 모양이고, 곡선 y=sinh x는 원점을 지나며 증가하는 S자 모양이다',
        },
        check: {
          type: 'ox',
          q: '$\\dfrac{d}{dx}\\,\\operatorname{cosh}\\,x=-\\operatorname{sinh}\\,x$입니다.',
          answer: false,
          explain: '$\\dfrac{d}{dx}\\dfrac{e^x+e^{-x}}{2}=\\dfrac{e^x-e^{-x}}{2}=\\operatorname{sinh}\\,x$입니다. 코사인과 달리 마이너스가 붙지 않습니다.',
        },
      },
      {
        title: '로그 미분법',
        body: '$y=x^x$ ($x>0$)는 밑도 지수도 변하므로 거듭제곱의 미분($nx^{n-1}$)도, 지수함수의 미분($a^x\\ln a$)도 그대로 쓸 수 없습니다. 이럴 때 양변에 자연로그를 취한 뒤 미분합니다.\n\n$\\ln y=x\\ln x$\n\n양변을 $x$에 대하여 미분하면 (왼쪽은 연쇄법칙)\n\n$\\dfrac{y\'}{y}=\\ln x+1 \\quad \\Rightarrow \\quad y\'=x^x(\\ln x+1)$\n\n일반적으로 $y=f(x)^{g(x)}$ ($f(x)>0$)이면 $\\ln y=g(x)\\ln f(x)$를 미분해\n\n$y\'=f(x)^{g(x)}\\left(g\'(x)\\ln f(x)+\\dfrac{g(x)f\'(x)}{f(x)}\\right)$\n\n**여러 인수의 곱·몫**에도 쓸모가 있습니다. 로그를 취하면 곱은 합, 몫은 차, 거듭제곱은 계수가 되어 미분이 쉬워집니다.\n\n$y=\\dfrac{(x+1)^2(x+2)^3}{x+3}$이면 $\\dfrac{y\'}{y}=\\dfrac{2}{x+1}+\\dfrac{3}{x+2}-\\dfrac{1}{x+3}$\n\n> 💡 $x^x(\\ln x+1)=x \\cdot x^{x-1}+x^x\\ln x$입니다. "밑만 변할 때의 미분"과 "지수만 변할 때의 미분"을 더한 꼴입니다.',
        easy: '로그는 곱셈을 덧셈으로, 거듭제곱을 곱셈으로 바꾸는 도구입니다. 미분하기 어려운 "탑 모양" 식($x^x$)이나 "여러 층 분수"를 로그로 납작하게 편 다음 미분하고, 마지막에 $y$를 곱해 되돌립니다.\n\n순서: 로그 취하기 → 미분하기 → 양변에 $y$ 곱하기',
        check: {
          type: 'choice',
          q: '$y=x^x$ ($x>0$)의 도함수는 무엇입니까?',
          choices: ['$x^x(\\ln x+1)$', '$x \\cdot x^{x-1}$', '$x^x\\ln x$'],
          answer: 0,
          why: ['', '지수 $x$를 상수처럼 보고 거듭제곱의 미분을 썼습니다. 지수도 변하므로 로그 미분법을 씁니다.', '밑 $x$를 상수처럼 보고 지수함수의 미분을 썼습니다. 밑도 변하는 부분이 빠졌습니다.'],
          explain: '$\\ln y=x\\ln x$를 미분하면 $\\dfrac{y\'}{y}=\\ln x+1$이므로 $y\'=x^x(\\ln x+1)$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '$y=\\arctan(x^2)$의 도함수를 구하고, $x=1$에서의 미분계수를 구하십시오.',
        steps: [
          '$u=x^2$으로 놓으면 $y=\\arctan u$이고 $\\dfrac{dy}{du}=\\dfrac{1}{1+u^2}$입니다.',
          '연쇄법칙: $\\dfrac{dy}{dx}=\\dfrac{1}{1+u^2} \\cdot \\dfrac{du}{dx}=\\dfrac{1}{1+x^4} \\cdot 2x=\\dfrac{2x}{1+x^4}$',
          '$x=1$을 대입하면 $\\dfrac{2}{1+1}=1$입니다.',
        ],
        answer: '$y\'=\\dfrac{2x}{1+x^4}$, $x=1$에서 1',
      },
      {
        q: '$y=x^{\\sin x}$ ($x>0$)의 도함수를 구하십시오.',
        steps: [
          '양변에 자연로그를 취합니다: $\\ln y=\\sin x\\ln x$',
          '양변을 $x$에 대하여 미분합니다(오른쪽은 곱의 미분법): $\\dfrac{y\'}{y}=\\cos x\\ln x+\\sin x \\cdot \\dfrac{1}{x}$',
          '양변에 $y=x^{\\sin x}$을 곱합니다: $y\'=x^{\\sin x}\\left(\\cos x\\ln x+\\dfrac{\\sin x}{x}\\right)$',
        ],
        answer: '$y\'=x^{\\sin x}\\left(\\cos x\\ln x+\\dfrac{\\sin x}{x}\\right)$',
      },
      {
        q: '$\\dfrac{d}{dx}\\,\\operatorname{tanh}\\,x=\\dfrac{1}{\\operatorname{cosh}^2\\,x}$임을 보이십시오.',
        steps: [
          '$\\operatorname{tanh}\\,x=\\dfrac{\\operatorname{sinh}\\,x}{\\operatorname{cosh}\\,x}$에 몫의 미분법을 씁니다.',
          '$\\dfrac{(\\operatorname{sinh}\\,x)\'\\operatorname{cosh}\\,x-\\operatorname{sinh}\\,x(\\operatorname{cosh}\\,x)\'}{\\operatorname{cosh}^2\\,x}=\\dfrac{\\operatorname{cosh}^2\\,x-\\operatorname{sinh}^2\\,x}{\\operatorname{cosh}^2\\,x}$',
          '$\\operatorname{cosh}^2\\,x-\\operatorname{sinh}^2\\,x=1$이므로 $\\dfrac{1}{\\operatorname{cosh}^2\\,x}$입니다.',
        ],
        answer: '$\\dfrac{d}{dx}\\,\\operatorname{tanh}\\,x=\\dfrac{1}{\\operatorname{cosh}^2\\,x}$',
      },
    ],

    terms: [
      { term: '역함수의 미분법', def: '$f(a)=b$, $f\'(a) \\ne 0$이면 $\\left(f^{-1}\\right)^{\\prime}(b)=\\dfrac{1}{f\'(a)}$라는 공식입니다.' },
      { term: '역사인함수', def: '정의역을 $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$로 제한한 사인함수의 역함수 $y=\\arcsin x$입니다. 정의역은 $[-1, 1]$입니다. $\\sin^{-1}x$로도 씁니다.' },
      { term: '역코사인함수', def: '정의역을 $[0, \\pi]$로 제한한 코사인함수의 역함수 $y=\\arccos x$입니다. 정의역은 $[-1, 1]$, 치역은 $[0, \\pi]$입니다.' },
      { term: '역탄젠트함수', def: '정의역을 $\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$로 제한한 탄젠트함수의 역함수 $y=\\arctan x$입니다. 정의역은 실수 전체입니다.' },
      { term: '쌍곡선사인', def: '$\\operatorname{sinh}\\,x=\\dfrac{e^x-e^{-x}}{2}$로 정의한 함수입니다. 도함수는 $\\operatorname{cosh}\\,x$입니다.' },
      { term: '쌍곡선코사인', def: '$\\operatorname{cosh}\\,x=\\dfrac{e^x+e^{-x}}{2}$로 정의한 함수입니다. 도함수는 $\\operatorname{sinh}\\,x$이고, 그래프는 현수선 모양입니다.' },
      { term: '쌍곡선탄젠트', def: '$\\operatorname{tanh}\\,x=\\dfrac{\\operatorname{sinh}\\,x}{\\operatorname{cosh}\\,x}$입니다. 치역은 $(-1, 1)$이고 도함수는 $\\dfrac{1}{\\operatorname{cosh}^2\\,x}$입니다.' },
      { term: '로그 미분법', def: '양변에 자연로그를 취한 뒤 미분하는 방법입니다. $x^x$ 꼴이나 여러 인수의 곱·몫을 미분할 때 씁니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 1,
        q: '$\\arcsin\\left(-\\frac{1}{2}\\right)$의 값은 무엇입니까?',
        choices: ['$-\\frac{\\pi}{6}$', '$\\frac{7\\pi}{6}$', '$\\frac{11\\pi}{6}$', '$-\\frac{\\pi}{3}$'],
        answer: 0,
        why: [
          '',
          '사인값은 $-\\frac{1}{2}$이 맞지만 $\\frac{7\\pi}{6}$는 치역 $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$ 밖에 있습니다.',
          '사인값은 맞지만 치역 밖입니다. $\\frac{11\\pi}{6}$와 같은 방향의 각 가운데 치역 안의 것은 $-\\frac{\\pi}{6}$입니다.',
          '$\\sin\\left(-\\frac{\\pi}{3}\\right)=-\\frac{\\sqrt{3}}{2}$입니다. 사인값이 $-\\frac{1}{2}$인 각을 다시 찾아보십시오.',
        ],
        explain: '$\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$에서 사인값이 $-\\frac{1}{2}$인 각은 $-\\frac{\\pi}{6}$ 하나뿐입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 0,
        q: '$f(x)=x^5+3x-2$의 역함수를 $g$라 할 때, $g\'(2)$의 값을 구하십시오.',
        answer: '1/8',
        hint: '먼저 $f(a)=2$인 $a$를 찾으십시오.',
        wrong: [
          { a: '8', why: '$f\'(1)$을 그대로 답했습니다. 역함수의 미분계수는 그 역수입니다.' },
          { a: '1/83', why: '$f\'(2)$를 썼습니다. $g(2)=1$이므로 $f\'(1)$을 써야 합니다.' },
        ],
        explain: '$f(1)=1+3-2=2$이므로 $g(2)=1$입니다. $f\'(x)=5x^4+3$에서 $f\'(1)=8$이므로 $g\'(2)=\\dfrac{1}{8}$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 1,
        q: '$\\arcsin\\left(\\sin\\dfrac{3\\pi}{4}\\right)=\\dfrac{3\\pi}{4}$입니다.',
        answer: false,
        explain: '$\\sin\\frac{3\\pi}{4}=\\frac{\\sqrt{2}}{2}$이고, $\\arcsin\\frac{\\sqrt{2}}{2}$는 $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$ 안의 각 $\\frac{\\pi}{4}$입니다. $\\frac{3\\pi}{4}$는 치역 밖이라 돌아오지 않습니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', concept: 2,
        q: '$\\dfrac{d}{dx}\\arccos x$의 $x=\\dfrac{3}{5}$에서의 값을 구하십시오.',
        answer: '-5/4',
        wrong: [
          { a: '5/4', why: '부호를 빠뜨렸습니다. 역코사인의 도함수는 $-\\dfrac{1}{\\sqrt{1-x^2}}$입니다.' },
          { a: '-25/16', why: '근호를 빠뜨렸습니다. $\\sqrt{1-\\frac{9}{25}}=\\frac{4}{5}$입니다.' },
        ],
        explain: '$-\\dfrac{1}{\\sqrt{1-x^2}}$에 $x=\\dfrac{3}{5}$을 넣으면 $\\sqrt{1-\\frac{9}{25}}=\\sqrt{\\frac{16}{25}}=\\frac{4}{5}$이므로 값은 $-\\dfrac{5}{4}$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 3,
        q: '$\\dfrac{d}{dx}\\,\\operatorname{sinh}\\,x$는 무엇입니까?',
        choices: ['$\\operatorname{cosh}\\,x$', '$-\\operatorname{cosh}\\,x$', '$\\operatorname{sinh}\\,x$', '$\\dfrac{1}{\\operatorname{cosh}^2\\,x}$'],
        answer: 0,
        why: [
          '',
          '삼각함수의 미분 규칙($\\cos$의 도함수에 마이너스)과 섞었습니다. $\\frac{e^x-e^{-x}}{2}$를 직접 미분해 보십시오.',
          '$e^{-x}$을 미분하면 $-e^{-x}$이 되어 부호가 바뀝니다. 결과는 $\\frac{e^x+e^{-x}}{2}$입니다.',
          '$\\operatorname{tanh}\\,x$의 도함수입니다.',
        ],
        explain: '$\\dfrac{d}{dx}\\dfrac{e^x-e^{-x}}{2}=\\dfrac{e^x+e^{-x}}{2}=\\operatorname{cosh}\\,x$입니다.',
      },
      {
        id: 'p6', level: 2, type: 'short', check: 'number', concept: 3,
        q: '$\\operatorname{cosh}(\\ln 3)$의 값을 구하십시오.',
        answer: '5/3',
        hint: '$e^{\\ln 3}=3$, $e^{-\\ln 3}=\\frac{1}{3}$입니다.',
        wrong: [
          { a: '4/3', why: '$\\operatorname{sinh}(\\ln 3)=\\dfrac{3-\\frac{1}{3}}{2}$을 구했습니다. $\\operatorname{cosh}$는 두 값을 더합니다.' },
          { a: '10/3', why: '2로 나누는 것을 빠뜨렸습니다.' },
        ],
        explain: '$\\operatorname{cosh}(\\ln 3)=\\dfrac{e^{\\ln 3}+e^{-\\ln 3}}{2}=\\dfrac{3+\\frac{1}{3}}{2}=\\dfrac{\\frac{10}{3}}{2}=\\dfrac{5}{3}$입니다.',
      },
      {
        id: 'p7', level: 2, type: 'choice', concept: 2,
        q: '$x \\ne 0$일 때 $\\dfrac{d}{dx}\\arctan\\dfrac{1}{x}$은 무엇입니까?',
        choices: ['$-\\dfrac{1}{1+x^2}$', '$\\dfrac{1}{1+x^2}$', '$\\dfrac{x^2}{1+x^2}$', '$\\dfrac{1}{x^2+1}+\\dfrac{1}{x^2}$'],
        answer: 0,
        hint: '$u=\\frac{1}{x}$로 놓고 연쇄법칙을 쓰십시오.',
        why: [
          '',
          '$\\frac{1}{x}$의 도함수 $-\\frac{1}{x^2}$에서 부호를 빠뜨렸습니다.',
          '연쇄법칙을 빠뜨려 $\\dfrac{1}{1+\\frac{1}{x^2}}$에서 멈추었습니다. $u\'=-\\frac{1}{x^2}$을 곱해야 합니다.',
          '연쇄법칙의 곱을 더하기로 바꾸었습니다. 두 값을 곱해야 합니다.',
        ],
        explain: '$\\dfrac{1}{1+\\frac{1}{x^2}} \\cdot \\left(-\\dfrac{1}{x^2}\\right)=-\\dfrac{1}{x^2+1}$입니다. 그래서 $x>0$에서 $\\arctan x+\\arctan\\frac{1}{x}$의 도함수는 0입니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 4,
        q: '$y=x^{\\sin x}$ ($x>0$)의 도함수는 무엇입니까?',
        choices: [
          '$x^{\\sin x}\\left(\\cos x\\ln x+\\dfrac{\\sin x}{x}\\right)$',
          '$\\sin x \\cdot x^{\\sin x-1}$',
          '$x^{\\sin x}\\cos x\\ln x$',
          '$x^{\\sin x}\\left(\\cos x\\ln x-\\dfrac{\\sin x}{x}\\right)$',
        ],
        answer: 0,
        hint: '$\\ln y=\\sin x\\ln x$를 미분하십시오.',
        why: [
          '',
          '지수 $\\sin x$를 상수처럼 보고 거듭제곱의 미분을 썼습니다.',
          '밑 $x$가 변하는 부분($\\sin x \\cdot \\frac{1}{x}$)을 빠뜨렸습니다. 곱의 미분법을 끝까지 쓰십시오.',
          '곱의 미분법에서 두 항을 빼었습니다. 곱의 미분은 두 항을 더합니다.',
        ],
        explain: '$\\ln y=\\sin x\\ln x$의 양변을 미분하면 $\\dfrac{y\'}{y}=\\cos x\\ln x+\\dfrac{\\sin x}{x}$이므로 $y\'=x^{\\sin x}\\left(\\cos x\\ln x+\\dfrac{\\sin x}{x}\\right)$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 0,
        q: '$f(x)=e^x+x$의 역함수를 $g$라 할 때, $g\'(1)$의 값을 구하십시오.',
        answer: '1/2',
        hint: '$f(a)=1$인 $a$는 어렵지 않게 찾을 수 있습니다.',
        wrong: [
          { a: '2', why: '$f\'(0)$을 그대로 답했습니다. 역수를 취해야 합니다.' },
          { a: '1', why: '$g(1)$과 $g\'(1)$을 헷갈렸을 수 있습니다. $g(1)=0$이고 구하는 것은 접선의 기울기 $\\frac{1}{f\'(0)}$입니다.' },
        ],
        explain: '$f(0)=e^0+0=1$이므로 $g(1)=0$입니다. $f\'(x)=e^x+1$에서 $f\'(0)=2$이므로 $g\'(1)=\\dfrac{1}{2}$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 1,
        q: '$y=\\arctan x$의 그래프의 점근선을 바르게 쓴 것은 무엇입니까?',
        choices: [
          '$y=\\frac{\\pi}{2}$, $y=-\\frac{\\pi}{2}$',
          '$x=\\frac{\\pi}{2}$, $x=-\\frac{\\pi}{2}$',
          '$y=\\pi$, $y=0$',
          '점근선이 없다',
        ],
        answer: 0,
        why: [
          '',
          '$y=\\tan x$의 점근선입니다. 역함수로 뒤집으면 가로·세로가 바뀌어 수평점근선이 됩니다.',
          '치역을 $(0, \\pi)$로 착각했습니다. $\\arctan$의 치역은 $\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$입니다.',
          '$\\arctan x$는 정의역이 실수 전체이지만 값은 $\\pm\\frac{\\pi}{2}$에 한없이 가까워지므로 수평점근선이 있습니다.',
        ],
        explain: '$\\lim_{x \\to \\infty}\\arctan x=\\frac{\\pi}{2}$, $\\lim_{x \\to -\\infty}\\arctan x=-\\frac{\\pi}{2}$이므로 수평점근선은 $y=\\pm\\frac{\\pi}{2}$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 2,
        q: '$x>0$일 때 $\\arctan x+\\arctan\\dfrac{1}{x}$의 값은 무엇입니까?',
        choices: ['$\\dfrac{\\pi}{2}$', '$\\dfrac{\\pi}{4}$', '$\\pi$', '$x$에 따라 달라진다'],
        answer: 0,
        hint: '이 식을 미분해 보고, 편한 $x$ 하나를 넣어 보십시오.',
        why: [
          '',
          '$x=1$일 때 한 항의 값입니다. 두 항을 더하면 $\\frac{\\pi}{4}+\\frac{\\pi}{4}$입니다.',
          '두 각의 합이 $\\pi$가 되려면 각각이 $\\frac{\\pi}{2}$에 가까워야 하는데, 두 항은 모두 $\\frac{\\pi}{2}$보다 작고 하나가 커지면 다른 하나는 작아집니다.',
          '도함수가 $\\frac{1}{1+x^2}-\\frac{1}{1+x^2}=0$이므로 $x>0$에서 상수입니다.',
        ],
        explain: '도함수는 $\\dfrac{1}{1+x^2}+\\left(-\\dfrac{1}{1+x^2}\\right)=0$이므로 구간 $(0, \\infty)$에서 상수입니다(고등학교에서 배운 평균값 정리에 의해, 도함수가 0인 구간에서 함수는 상수입니다). $x=1$을 넣으면 $\\frac{\\pi}{4}+\\frac{\\pi}{4}=\\frac{\\pi}{2}$입니다. ($x<0$에서는 $-\\frac{\\pi}{2}$가 됩니다.)',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 0,
        q: '$f(x)=x^3+3x+1$의 역함수를 $g$라 할 때, $g\'\'(5)$의 값을 구하십시오.',
        answer: '-1/36',
        hint: '$g\'(x)=\\dfrac{1}{f\'(g(x))}$을 한 번 더 미분하십시오.',
        wrong: [
          { a: '1/36', why: '부호를 빠뜨렸습니다. $\\frac{1}{u}$을 미분하면 $-\\frac{u\'}{u^2}$입니다.' },
          { a: '-1/6', why: '$g\'(5)$를 한 번 더 곱하는 연쇄법칙을 빠뜨렸습니다. 분모가 $\\{f\'(1)\\}^3$이 됩니다.' },
        ],
        explain: '$g\'(x)=\\dfrac{1}{f\'(g(x))}$을 미분하면 $g\'\'(x)=-\\dfrac{f\'\'(g(x)) \\cdot g\'(x)}{\\{f\'(g(x))\\}^2}=-\\dfrac{f\'\'(g(x))}{\\{f\'(g(x))\\}^3}$입니다.\n\n$f(1)=5$이므로 $g(5)=1$, $f\'(1)=3+3=6$, $f\'\'(1)=6$입니다. 따라서 $g\'\'(5)=-\\dfrac{6}{6^3}=-\\dfrac{1}{36}$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 3,
        q: '$\\operatorname{sinh}\\,x=\\dfrac{3}{4}$일 때 $\\operatorname{tanh}\\,x$의 값을 구하십시오.',
        answer: '3/5',
        hint: '$\\operatorname{cosh}^2\\,x-\\operatorname{sinh}^2\\,x=1$과 $\\operatorname{cosh}\\,x \\ge 1$을 쓰십시오.',
        wrong: [
          { a: '5/3', why: '$\\frac{\\operatorname{cosh}\\,x}{\\operatorname{sinh}\\,x}$를 구했습니다. $\\operatorname{tanh}$는 $\\operatorname{sinh}$를 $\\operatorname{cosh}$로 나눕니다.' },
          { a: '3/4', why: '$\\operatorname{cosh}\\,x$를 1로 보았습니다. $\\operatorname{cosh}\\,x=\\sqrt{1+\\operatorname{sinh}^2\\,x}$입니다.' },
        ],
        explain: '$\\operatorname{cosh}^2\\,x=1+\\frac{9}{16}=\\frac{25}{16}$이고 $\\operatorname{cosh}\\,x>0$이므로 $\\operatorname{cosh}\\,x=\\frac{5}{4}$입니다. $\\operatorname{tanh}\\,x=\\dfrac{3/4}{5/4}=\\dfrac{3}{5}$입니다. (실제로 $x=\\ln 2$입니다.)',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 4,
        q: '$x>0$에서 함수 $y=x^{\\frac{1}{x}}$이 최댓값을 가지는 $x$의 값은 무엇입니까?',
        choices: ['$x=e$', '$x=1$', '$x=\\dfrac{1}{e}$', '$x=e^2$'],
        answer: 0,
        hint: '로그 미분법으로 $y\'$를 구해 부호를 보십시오.',
        why: [
          '',
          '$x=1$에서 $y=1$이지만 $x=2$에서 $y=\\sqrt{2}>1$입니다. $y\'$가 0이 되는 곳을 찾으십시오.',
          '$1-\\ln x=0$을 $\\ln x=-1$로 잘못 풀었습니다.',
          '$1-\\ln x=0$이면 $\\ln x=1$입니다. $\\ln x=2$가 아닙니다.',
        ],
        explain: '$\\ln y=\\dfrac{\\ln x}{x}$를 미분하면 $\\dfrac{y\'}{y}=\\dfrac{1-\\ln x}{x^2}$입니다. $y>0$이므로 $y\'$의 부호는 $1-\\ln x$의 부호와 같아, $0<x<e$에서 증가하고 $x>e$에서 감소합니다. 최댓값은 $x=e$에서 $e^{\\frac{1}{e}}$입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 2,
        q: '$y=\\arctan\\dfrac{1+x}{1-x}$ ($x \\ne 1$)일 때, $x=2$에서의 미분계수를 구하십시오.',
        answer: '1/5',
        hint: '$u=\\frac{1+x}{1-x}$로 놓고 $\\frac{u\'}{1+u^2}$를 간단히 하십시오.',
        wrong: [
          { a: '1/10', why: '연쇄법칙의 $u\'$를 빠뜨렸습니다. $x=2$에서 $u=-3$, $u\'=2$이므로 $\\frac{2}{1+9}$입니다.' },
          { a: '-1/5', why: '$u\'$의 부호를 잘못 구했습니다. $u\'=\\frac{(1-x)+(1+x)}{(1-x)^2}=\\frac{2}{(1-x)^2}>0$입니다.' },
        ],
        explain: '$u=\\dfrac{1+x}{1-x}$이면 $u\'=\\dfrac{2}{(1-x)^2}$, $1+u^2=\\dfrac{(1-x)^2+(1+x)^2}{(1-x)^2}=\\dfrac{2(1+x^2)}{(1-x)^2}$입니다. 따라서 $y\'=\\dfrac{u\'}{1+u^2}=\\dfrac{1}{1+x^2}$이고, $x=2$에서 $\\dfrac{1}{5}$입니다. (이 함수와 $\\arctan x$는 도함수가 같아서 각 구간에서 상수만큼 차이 납니다.)',
      },
    ],

    deeper: [
      {
        title: '현수선: 늘어뜨린 줄은 포물선이 아니다',
        body: '양 끝을 잡고 늘어뜨린 쇠사슬이나 전깃줄은 포물선처럼 보입니다. 갈릴레이도 그렇게 생각했지만, 1691년에 라이프니츠·하위헌스·요한 베르누이가 각각 이 곡선이 포물선이 아님을 밝혔습니다. 이 곡선이 오늘날 $y=a\\operatorname{cosh}\\dfrac{x}{a}$로 쓰는 **현수선**입니다.\n\n현수선을 위아래로 뒤집은 아치는 무게를 압축력만으로 버티므로 건축에 쓰입니다. 쌍곡선함수는 이 밖에도 특수상대성이론의 속도 덧셈($\\operatorname{tanh}$), 공기 저항을 받으며 떨어지는 물체의 속도 등에 나타납니다.',
      },
      {
        title: '역쌍곡선함수와 적분으로 가는 길',
        body: '$\\operatorname{sinh}$는 순증가하므로 역함수가 있습니다. $y=\\operatorname{sinh}\\,x$를 $x$에 대하여 풀면($e^x$에 대한 이차방정식) 역함수는\n\n$\\operatorname{arsinh}\\,x=\\ln\\left(x+\\sqrt{x^2+1}\\right)$\n\n이고, 이를 미분하면 $\\dfrac{1}{\\sqrt{x^2+1}}$입니다.\n\n이 단원의 도함수들을 거꾸로 읽으면 적분 공식이 됩니다. $\\displaystyle\\int\\frac{1}{1+x^2}dx=\\arctan x+C$, $\\displaystyle\\int\\frac{1}{\\sqrt{1-x^2}}dx=\\arcsin x+C$처럼 유리함수·무리함수의 적분에서 역삼각함수가 나타나며, 이것이 뒤의 적분 기법 단원의 삼각치환으로 이어집니다.',
      },
    ],

    faq: [
      {
        q: 'sin⁻¹x는 1/sin x 아닌가요?',
        a: '아닙니다. $\\sin^{-1}x$는 역함수 $\\arcsin x$를 뜻합니다. $\\dfrac{1}{\\sin x}$은 코시컨트 $\\csc x$ 또는 $(\\sin x)^{-1}$으로 씁니다. 헷갈리지 않도록 이 단원에서는 $\\arcsin$ 표기를 씁니다.',
      },
      {
        q: '왜 arcsin의 치역을 -π/2부터 π/2까지로 정하나요?',
        a: '사인함수가 일대일이 되면서 사인값 $-1$부터 1까지를 모두 한 번씩 가지는 구간 가운데, 0을 포함하고 증가하는 가장 자연스러운 구간이기 때문입니다. 다른 구간을 골라도 역함수는 만들 수 있지만, 모두가 같은 약속을 써야 값이 하나로 정해지므로 이 구간을 표준(주치)으로 씁니다.',
      },
      {
        q: '쌍곡선함수의 미분에는 왜 마이너스가 안 붙나요?',
        a: '삼각함수의 마이너스는 $(\\cos x)\'=-\\sin x$처럼 원을 돌 때 방향이 바뀌는 데서 나옵니다. 쌍곡선함수는 $e^x$과 $e^{-x}$으로 만들었고, 미분하면 $e^{-x}$의 부호만 바뀌어 $\\operatorname{sinh}$와 $\\operatorname{cosh}$가 서로 자리를 바꿀 뿐입니다. 그래서 둘 다 마이너스 없이 서로의 도함수가 됩니다.',
      },
    ],

    mistakes: [
      '$\\dfrac{d}{dx}x^x=x \\cdot x^{x-1}$처럼 거듭제곱의 미분을 쓰는 실수 — 밑과 지수가 모두 변하므로 로그 미분법으로 $x^x(\\ln x+1)$을 얻습니다.',
      '$\\arcsin(\\sin x)=x$가 언제나 성립한다고 보는 실수 — $-\\frac{\\pi}{2} \\le x \\le \\frac{\\pi}{2}$에서만 성립합니다.',
      '역함수의 미분계수를 $\\frac{1}{f\'(b)}$로 계산하는 실수 — $f(a)=b$인 $a$를 먼저 찾아 $\\frac{1}{f\'(a)}$을 구합니다.',
    ],

    gens: [
      {
        id: 'inverse-derivative',
        level: 1,
        title: '역함수의 미분계수',
        make: function (R) {
          var p = R.int(1, 6), q = R.int(-5, 5), a = R.pick([-2, -1, 1, 2, 0]);
          var b = a * a * a + p * a + q;
          var fa = 3 * a * a + p;
          var ans = R.F(1, fa);
          var poly = R.fmt.poly([1, 0, p, q]);
          return {
            type: 'short', check: 'number', concept: 0,
            q: '$f(x)=' + poly + '$의 역함수를 $g$라 할 때, $g\'(' + b + ')$의 값을 구하십시오.',
            answer: ans.toString(),
            hint: '$f(x)=' + b + '$' + R.josa(b, '이/가') + ' 되는 정수 $x$를 먼저 찾으십시오.',
            wrong: dedupe(ans, [
              [R.F(fa), '$f\'(' + a + ')$' + R.josa(fa, '을/를') + ' 그대로 답했습니다. 역함수의 미분계수는 그 역수입니다.'],
              [R.F(1, 3 * b * b + p), '$f\'(' + b + ')$' + R.josa(3 * b * b + p, '을/를') + ' 썼습니다. $g(' + b + ')=' + a + '$이므로 $f\'(' + a + ')$의 역수를 구해야 합니다.'],
              [R.F(a), '$g(' + b + ')$의 값을 답했습니다. 구하는 것은 $g$의 미분계수입니다.'],
            ]),
            explain: '$f(' + a + ')=' + b + '$이므로 $g(' + b + ')=' + a + '$입니다. $f\'(x)=3x^2+' + p + '$에서 $f\'(' + a + ')=' + fa + '$이므로 $g\'(' + b + ')=\\dfrac{1}{f\'(' + a + ')}=' + R.fmt.frac(ans) + '$입니다.',
          };
        },
      },
      {
        id: 'arc-value',
        level: 1,
        title: '역삼각함수의 값',
        make: function (R) {
          var S2 = '\\frac{\\sqrt{2}}{2}', S3 = '\\frac{\\sqrt{3}}{2}';
          // [인수 TeX, 음수인가, 값(π 의 몇 배)]
          var table = {
            arcsin: [['\\frac{1}{2}', 0, R.F(1, 6)], [S2, 0, R.F(1, 4)], [S3, 0, R.F(1, 3)], ['1', 0, R.F(1, 2)],
              ['\\frac{1}{2}', 1, R.F(-1, 6)], [S2, 1, R.F(-1, 4)], [S3, 1, R.F(-1, 3)], ['1', 1, R.F(-1, 2)]],
            arccos: [['\\frac{1}{2}', 0, R.F(1, 3)], [S2, 0, R.F(1, 4)], [S3, 0, R.F(1, 6)], ['0', 0, R.F(1, 2)],
              ['\\frac{1}{2}', 1, R.F(2, 3)], [S2, 1, R.F(3, 4)], [S3, 1, R.F(5, 6)], ['1', 1, R.F(1)]],
            arctan: [['1', 0, R.F(1, 4)], ['\\sqrt{3}', 0, R.F(1, 3)], ['\\frac{\\sqrt{3}}{3}', 0, R.F(1, 6)],
              ['1', 1, R.F(-1, 4)], ['\\sqrt{3}', 1, R.F(-1, 3)], ['\\frac{\\sqrt{3}}{3}', 1, R.F(-1, 6)]],
          };
          var range = { arcsin: '\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]', arccos: '[0, \\pi]', arctan: '\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)' };
          var trig = { arcsin: '\\sin', arccos: '\\cos', arctan: '\\tan' };
          var fn = R.pick(['arcsin', 'arccos', 'arctan']);
          var row = R.pick(table[fn]);
          var th = row[2];
          var argTex = row[1] ? '\\left(-' + row[0] + '\\right)' : ' ' + row[0];
          var valArg = (row[1] ? '-' : '') + row[0];
          var half = R.F(1, 2), pi = R.F(1);
          var cands = [
            [pi.sub(th), '삼각함수 값은 같지만 치역 $' + range[fn] + '$ 밖의 각입니다.'],
            [th.neg(), '부호를 잘못 골랐습니다. 치역 안에서 $' + trig[fn] + '$ 값의 부호를 확인하십시오.'],
            [half.sub(th), fn === 'arccos' ? '$\\arcsin$의 값을 구했습니다. $\\arccos$의 치역은 $[0, \\pi]$입니다.' : '다른 삼각함수(사인과 코사인)를 헷갈렸습니다.'],
            [th.add(pi), '주기를 더한 각입니다. 치역 $' + range[fn] + '$ 밖에 있습니다.'],
            [th.sub(pi), '주기를 뺀 각입니다. 치역 $' + range[fn] + '$ 밖에 있습니다.'],
          ];
          var correct = '$' + piTex(th) + '$';
          var reason = {}, wrongs = [];
          cands.forEach(function (c) {
            var t = '$' + piTex(c[0]) + '$';
            if (t !== correct && !(t in reason)) { reason[t] = c[1]; wrongs.push(t); }
          });
          var pick = R.choices(correct, wrongs);
          return {
            type: 'choice', concept: 1,
            q: '$\\' + fn + argTex + '$의 값은 무엇입니까?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
            explain: '$\\' + fn + '$의 치역은 $' + range[fn] + '$입니다. 이 범위에서 $' + trig[fn] + '\\theta=' + valArg + '$인 각 $\\theta$는 $' + piTex(th) + '$ 하나뿐입니다.',
          };
        },
      },
      {
        id: 'arc-derivative-value',
        level: 2,
        title: '역삼각함수의 미분계수 (연쇄법칙)',
        make: function (R) {
          var kind = R.pick(['atan', 'asin', 'acos']);
          var ans, wrongs, q, explain;
          if (kind === 'atan') {
            var a = R.int(2, 4), b = R.pick([1, -1, 2, -2]);
            var den = 1 + a * a * b * b;
            ans = R.F(a, den);
            q = '$y=\\arctan ' + a + 'x$의 $x=' + b + '$에서의 미분계수를 구하십시오.';
            wrongs = [
              [R.F(1, den), '연쇄법칙을 빠뜨렸습니다. 안쪽 함수 $' + a + 'x$의 도함수 ' + a + R.josa(a, '을/를') + ' 곱해야 합니다.'],
              [R.F(a, 1 + a * b * b), '$(' + a + 'x)^2$에서 계수 ' + a + '도 제곱해야 합니다.'],
              [R.F(a, 1 - a * a * b * b), '분모를 $1-u^2$으로 썼습니다. 역탄젠트의 도함수는 $\\dfrac{1}{1+u^2}$입니다.'],
            ];
            explain = '$\\dfrac{d}{dx}\\arctan ' + a + 'x=\\dfrac{' + a + '}{1+(' + a + 'x)^2}$이므로 $x=' + b + '$에서 $\\dfrac{' + a + '}{1+' + (a * a * b * b) + '}=' + R.fmt.frac(ans) + '$입니다.';
          } else {
            var tri = R.pick([[5, 3, 4], [5, 4, 3], [13, 5, 12], [13, 12, 5], [10, 6, 8], [10, 8, 6], [25, 7, 24], [17, 8, 15], [17, 15, 8]]);
            var c = tri[0], bb = tri[1] * (R.bool() ? 1 : -1), rt = tri[2];
            var sg = kind === 'asin' ? 1 : -1;
            var name = kind === 'asin' ? '\\arcsin' : '\\arccos';
            ans = R.F(sg, rt);
            q = '$y=' + name + '\\dfrac{x}{' + c + '}$의 $x=' + bb + '$에서의 미분계수를 구하십시오.';
            wrongs = [
              [R.F(sg * c, rt), '연쇄법칙을 빠뜨렸습니다. 안쪽 함수 $\\frac{x}{' + c + '}$의 도함수 $\\frac{1}{' + c + '}$' + R.josa(1, '을/를') + ' 곱해야 합니다.'],
              [R.F(-sg, rt), kind === 'asin' ? '부호가 바뀌었습니다. 마이너스는 $\\arccos$의 도함수에 붙습니다.' : '부호를 빠뜨렸습니다. $\\arccos$의 도함수에는 마이너스가 붙습니다.'],
              [R.F(sg, rt * rt), '근호를 빠뜨렸습니다. $\\sqrt{' + c + '^2-' + R.fmt.paren(bb) + '^2}=' + rt + '$입니다.'],
            ];
            explain = '$\\dfrac{d}{dx}' + name + '\\dfrac{x}{' + c + '}=' + (sg < 0 ? '-' : '') + '\\dfrac{1}{\\sqrt{1-\\left(\\frac{x}{' + c + '}\\right)^2}} \\cdot \\dfrac{1}{' + c + '}=' + (sg < 0 ? '-' : '') + '\\dfrac{1}{\\sqrt{' + c + '^2-x^2}}$입니다. $x=' + bb + '$이면 $\\sqrt{' + (c * c) + '-' + (bb * bb) + '}=\\sqrt{' + (rt * rt) + '}=' + rt + '$이므로 값은 $' + R.fmt.frac(ans) + '$입니다.';
          }
          return {
            type: 'short', check: 'number', concept: 2,
            q: q,
            answer: ans.toString(),
            hint: '바깥 함수의 도함수에 안쪽 함수의 도함수를 곱하십시오.',
            wrong: dedupe(ans, wrongs),
            explain: explain,
          };
        },
      },
      {
        id: 'log-diff',
        level: 2,
        title: '로그 미분법 (곱과 몫)',
        make: function (R) {
          var abc = R.sample([1, 2, 3, 4], 3);
          var a = abc[0], b = abc[1], c = abc[2];
          var m = R.int(1, 3), n = R.int(1, 3), p = R.int(1, 2);
          function pw(k, e) { return '(x+' + k + ')' + (e === 1 ? '' : '^{' + e + '}'); }
          function co(k) { return k === 1 ? '' : String(k); }
          var y0 = R.F(Math.pow(a, m) * Math.pow(b, n), Math.pow(c, p));
          var ratio = R.F(m, a).add(R.F(n, b)).sub(R.F(p, c));
          var ans = y0.mul(ratio);
          var termTex = '\\dfrac{' + m + '}{x+' + a + '}+\\dfrac{' + n + '}{x+' + b + '}-\\dfrac{' + p + '}{x+' + c + '}';
          return {
            type: 'short', check: 'number', concept: 4,
            q: '$y=\\dfrac{' + pw(a, m) + pw(b, n) + '}{' + pw(c, p) + '}$일 때, 로그 미분법으로 $x=0$에서의 미분계수 $y\'(0)$을 구하십시오.',
            answer: ans.toString(),
            hint: '$\\ln y=' + co(m) + '\\ln(x+' + a + ')+' + co(n) + '\\ln(x+' + b + ')-' + co(p) + '\\ln(x+' + c + ')$의 양변을 미분하십시오.',
            wrong: dedupe(ans, [
              [ratio, '$\\dfrac{y\'}{y}$의 값에서 멈추었습니다. 마지막에 $y(0)=' + R.fmt.frac(y0) + '$' + R.josa(y0, '을/를') + ' 곱해야 합니다.'],
              [y0.mul(R.F(m, a).add(R.F(n, b)).add(R.F(p, c))), '분모의 인수는 로그를 취하면 빼야 합니다. $-' + p + '\\ln(x+' + c + ')$의 부호를 확인하십시오.'],
              [y0, '$y(0)$의 값을 답했습니다. 구하는 것은 미분계수입니다.'],
            ]),
            explain: '양변에 로그를 취해 미분하면 $\\dfrac{y\'}{y}=' + termTex + '$입니다.\n\n$x=0$에서 $\\dfrac{y\'}{y}=' + R.fmt.frac(R.F(m, a)) + '+' + R.fmt.frac(R.F(n, b)) + '-' + R.fmt.frac(R.F(p, c)) + '=' + R.fmt.frac(ratio) + '$이고, $y(0)=\\dfrac{' + a + (m === 1 ? '' : '^{' + m + '}') + ' \\cdot ' + b + (n === 1 ? '' : '^{' + n + '}') + '}{' + c + (p === 1 ? '' : '^{' + p + '}') + '}=' + R.fmt.frac(y0) + '$입니다.\n\n따라서 $y\'(0)=' + R.fmt.frac(y0) + ' \\times ' + (ratio.sign() < 0 ? '\\left(' + R.fmt.frac(ratio) + '\\right)' : R.fmt.frac(ratio)) + '=' + R.fmt.frac(ans) + '$입니다.',
          };
        },
      },
    ],
  });
})();
