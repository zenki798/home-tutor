/* 미적분학 · 거듭제곱급수와 테일러 급수
 * 수렴 반지름·수렴 구간, 항별 미분·적분, 테일러·매클로린 급수(eˣ, sin x, cos x, 1/(1-x)), 테일러 다항식의 근삿값과 오차 한계, 급수로 극한·적분 계산. */
(function () {
  function fact(n) { var r = 1; for (var i = 2; i <= n; i++) r *= i; return r; }
  // m x → TeX (m: 정수, 0 아님)
  function mx(m) { return m === 1 ? 'x' : (m === -1 ? '-x' : m + 'x'); }
  // 구간 글자
  function iv(lo, hi, lc, rc) { return '$' + (lc ? '[' : '(') + lo + ',\\ ' + hi + (rc ? ']' : ')') + '$'; }

  Tutor.registerUnit({
    id: 'math-u-calc-08',
    course: 'math-u-calc',
    title: '거듭제곱급수와 테일러 급수',
    summary: '거듭제곱급수의 수렴 반지름과 수렴 구간을 구하고, 함수를 테일러 급수로 나타내어 근삿값과 오차, 극한과 적분을 계산합니다.',
    goals: [
      '거듭제곱급수의 수렴 반지름과 수렴 구간(끝점 포함)을 구할 수 있다.',
      '거듭제곱급수를 항별로 미분·적분하여 새로운 급수와 급수의 합을 구할 수 있다.',
      '$e^x$, $\\sin x$, $\\cos x$, $\\dfrac{1}{1-x}$의 매클로린 급수를 이용하여 여러 함수의 급수를 만들 수 있다.',
      '테일러 다항식으로 근삿값을 구하고 오차 한계를 어림하며, 급수로 극한과 적분을 계산할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '거듭제곱급수와 수렴 반지름·수렴 구간',
        body: '$\\sum_{n=0}^{\\infty}c_n(x-a)^n=c_0+c_1(x-a)+c_2(x-a)^2+\\cdots$ 꼴의 급수를 $a$를 중심으로 하는 **거듭제곱급수**라 합니다. $x$에 따라 수렴하기도, 발산하기도 하며, 수렴하는 $x$의 범위는 다음 셋 중 하나입니다.\n\n' +
          '1. $x=a$에서만 수렴 (수렴 반지름 $R=0$)\n' +
          '2. 모든 실수 $x$에서 수렴 ($R=\\infty$)\n' +
          '3. $|x-a|<R$에서 절대수렴하고 $|x-a|>R$에서 발산하는 양수 $R$이 있음\n\n' +
          '$R$을 **수렴 반지름**, 수렴하는 $x$ 전체를 **수렴 구간**이라 합니다. $R$은 대개 비 판정법으로 구합니다. $\\lim_{n\\to\\infty}\\left|\\dfrac{c_{n+1}}{c_n}\\right|=L$이면 $L|x-a|<1$일 때 수렴하므로 $R=\\dfrac{1}{L}$입니다.\n\n' +
          '**끝점** $x=a\\pm R$에서는 비 판정법의 값이 1이 되어 판정할 수 없으므로 따로 확인합니다.\n\n' +
          '예: $\\sum_{n=1}^{\\infty}\\dfrac{x^n}{n}$은 $\\left|\\dfrac{c_{n+1}}{c_n}\\right|=\\dfrac{n}{n+1}\\to 1$이므로 $R=1$입니다. $x=1$이면 조화급수로 발산, $x=-1$이면 교대 조화급수로 수렴하므로 수렴 구간은 $[-1,\\ 1)$입니다.\n\n' +
          '- $\\sum\\dfrac{x^n}{n!}$: $R=\\infty$ $\\qquad$ - $\\sum n!\\,x^n$: $R=0$',
        easy: '거듭제곱급수는 "끝없이 긴 다항식"입니다. 중심 $a$ 가까이에서는 $(x-a)^n$이 작아서 항들이 금방 줄어 수렴하지만, 중심에서 멀어지면 $(x-a)^n$이 커져서 발산합니다. 그 경계까지의 거리가 수렴 반지름 $R$입니다.\n\n' +
          '경계선 위(끝점)는 애매한 곳이라 수렴할 수도, 발산할 수도 있습니다. 그래서 끝점 두 개는 반드시 하나씩 넣어서 확인합니다.',
        fig: {
          type: 'numberline', min: -2, max: 2, step: 0.5, labelEvery: 2,
          ranges: [{ from: -1, to: 1, toOpen: true }],
          points: [{ x: -1 }, { x: 1, open: true }],
          alt: '수직선에서 −1(포함)부터 1(제외)까지 칠한 구간. Σxⁿ/n 의 수렴 구간 [−1, 1)',
        },
        check: {
          type: 'short', check: 'number',
          q: '거듭제곱급수 $\\sum_{n=0}^{\\infty}\\dfrac{x^n}{5^n}$의 수렴 반지름 $R$을 구하십시오.',
          answer: '5',
          wrong: [{ a: '1/5', why: '비의 극한 $L=\\dfrac{1}{5}$을 그대로 썼습니다. 수렴 반지름은 $R=\\dfrac{1}{L}$입니다.' }],
          explain: '$\\left|\\dfrac{c_{n+1}}{c_n}\\right|=\\dfrac{5^n}{5^{n+1}}=\\dfrac{1}{5}$이므로 $R=5$입니다. 공비가 $\\dfrac{x}{5}$인 등비급수이므로 $\\left|\\dfrac{x}{5}\\right|<1$, 곧 $|x|<5$에서 수렴한다고 보아도 됩니다.',
        },
      },
      {
        title: '거듭제곱급수의 항별 미분과 적분',
        body: '$f(x)=\\sum_{n=0}^{\\infty}c_n(x-a)^n$의 수렴 반지름이 $R>0$이면, $f$는 $(a-R,\\ a+R)$에서 미분가능하고 **다항식처럼 항별로** 미분·적분할 수 있습니다.\n\n' +
          '$f\'(x)=\\sum_{n=1}^{\\infty}nc_n(x-a)^{n-1},\\qquad \\int f(x)\\,dx=C+\\sum_{n=0}^{\\infty}\\dfrac{c_n}{n+1}(x-a)^{n+1}$\n\n' +
          '두 급수의 수렴 반지름은 그대로 $R$입니다(끝점에서의 수렴은 달라질 수 있습니다).\n\n' +
          '등비급수 $\\dfrac{1}{1-x}=\\sum_{n=0}^{\\infty}x^n$ $(|x|<1)$에서 출발하면 많은 급수를 얻습니다.\n\n' +
          '- 미분: $\\dfrac{1}{(1-x)^2}=\\sum_{n=1}^{\\infty}nx^{n-1}$\n' +
          '- $x$ 대신 $-x$를 넣고 적분: $\\ln(1+x)=x-\\dfrac{x^2}{2}+\\dfrac{x^3}{3}-\\cdots=\\sum_{n=1}^{\\infty}\\dfrac{(-1)^{n-1}x^n}{n}$\n' +
          '- $x$ 대신 $-x^2$을 넣고 적분: $\\arctan x=x-\\dfrac{x^3}{3}+\\dfrac{x^5}{5}-\\cdots=\\sum_{n=0}^{\\infty}\\dfrac{(-1)^nx^{2n+1}}{2n+1}$\n\n' +
          '적분할 때 상수 $C$는 $x=0$을 넣어 정합니다($\\ln 1=0$, $\\arctan 0=0$이므로 $C=0$).\n\n' +
          '예: $\\sum_{n=1}^{\\infty}\\dfrac{n}{2^n}=\\dfrac{1}{2}\\sum_{n=1}^{\\infty}n\\left(\\dfrac{1}{2}\\right)^{n-1}=\\dfrac{1}{2}\\cdot\\dfrac{1}{(1-1/2)^2}=2$',
        easy: '거듭제곱급수는 다항식이 끝없이 이어진 것이므로, 수렴 반지름 안에서는 다항식처럼 한 항씩 미분하고 적분해도 됩니다. $x^n$을 미분하면 $nx^{n-1}$, 적분하면 $\\dfrac{x^{n+1}}{n+1}$이 되는 것을 항마다 하면 됩니다.\n\n' +
          '등비급수 $1+x+x^2+\\cdots=\\dfrac{1}{1-x}$ 하나만 알면, 미분·적분·대입으로 $\\ln$이나 $\\arctan$의 급수까지 만들어 낼 수 있습니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\dfrac{1}{(1-x)^2}=\\sum_{n=1}^{\\infty}nx^{n-1}$ $(|x|<1)$을 이용하여 $\\sum_{n=1}^{\\infty}n\\left(\\dfrac{1}{3}\\right)^{n-1}$의 값을 구하십시오.',
          answer: '9/4',
          wrong: [{ a: '3/2', why: '등비급수의 합 $\\dfrac{1}{1-x}$을 썼습니다. 이 급수는 그것을 미분한 $\\dfrac{1}{(1-x)^2}$입니다.' }],
          explain: '$x=\\dfrac{1}{3}$을 넣으면 $\\dfrac{1}{(1-1/3)^2}=\\dfrac{1}{4/9}=\\dfrac{9}{4}$입니다.',
        },
      },
      {
        title: '테일러 급수와 매클로린 급수',
        body: '$f$가 $a$를 중심으로 하는 거듭제곱급수 $\\sum c_n(x-a)^n$으로 나타내어진다면, 항별로 $n$번 미분하고 $x=a$를 넣어 $f^{(n)}(a)=n!\\,c_n$을 얻습니다. 따라서 계수는 반드시\n\n' +
          '$c_n=\\dfrac{f^{(n)}(a)}{n!}$\n\n' +
          '입니다. 이 계수로 만든 급수 $\\sum_{n=0}^{\\infty}\\dfrac{f^{(n)}(a)}{n!}(x-a)^n$을 $a$에서의 **테일러 급수**, $a=0$일 때를 **매클로린 급수**라 합니다.\n\n' +
          '| 함수 | 매클로린 급수 | 수렴 반지름 |\n|---|---|---|\n' +
          '| $e^x$ | $1+x+\\dfrac{x^2}{2!}+\\dfrac{x^3}{3!}+\\cdots=\\sum\\dfrac{x^n}{n!}$ | $\\infty$ |\n' +
          '| $\\sin x$ | $x-\\dfrac{x^3}{3!}+\\dfrac{x^5}{5!}-\\cdots=\\sum\\dfrac{(-1)^nx^{2n+1}}{(2n+1)!}$ | $\\infty$ |\n' +
          '| $\\cos x$ | $1-\\dfrac{x^2}{2!}+\\dfrac{x^4}{4!}-\\cdots=\\sum\\dfrac{(-1)^nx^{2n}}{(2n)!}$ | $\\infty$ |\n' +
          '| $\\dfrac{1}{1-x}$ | $1+x+x^2+x^3+\\cdots=\\sum x^n$ | $1$ |\n\n' +
          '예: $e^x$은 모든 도함수가 $e^x$이므로 $f^{(n)}(0)=1$, $c_n=\\dfrac{1}{n!}$입니다. $\\sin x$의 도함수는 $\\sin,\\cos,-\\sin,-\\cos$가 되풀이되어 $x=0$에서 $0,1,0,-1,\\cdots$이므로 홀수 차수 항만 부호를 바꾸며 남습니다.\n\n' +
          '> ⚠️ 테일러 급수를 만들 수 있다고 해서 늘 원래 함수와 같은 것은 아닙니다. 위 표의 함수들은 나머지가 0으로 가는 것을 보일 수 있어서 수렴 구간에서 함수와 같습니다.',
        easy: '테일러 급수는 한 점 $a$에서 함수의 "값, 기울기, 휘어짐, …"을 모두 똑같이 맞춘 다항식을 끝없이 늘린 것입니다. $n$차 항의 계수에 $n!$로 나누는 것은, $x^n$을 $n$번 미분하면 $n!$이 튀어나오기 때문에 그만큼 미리 나누어 두는 것입니다.\n\n' +
          '그림에서 $\\sin x$ 곁에 $x$, $x-\\dfrac{x^3}{6}$, $x-\\dfrac{x^3}{6}+\\dfrac{x^5}{120}$을 그리면, 차수가 올라갈수록 더 넓은 범위에서 $\\sin x$에 달라붙습니다.',
        fig: {
          type: 'coord', xmin: -4, xmax: 4, ymin: -2.5, ymax: 2.5,
          fns: [
            { expr: 'sin(x)', label: 'y=sin x' },
            { expr: 'x', from: -2.4, to: 2.4, label: 'T₁' },
            { expr: 'x-x^3/6', from: -3.6, to: 3.6, label: 'T₃' },
            { expr: 'x-x^3/6+x^5/120', from: -4, to: 4, label: 'T₅' },
          ],
          alt: 'y=sin x 와 매클로린 다항식 T₁=x, T₃=x−x³/6, T₅=x−x³/6+x⁵/120 의 그래프. 차수가 높을수록 원점에서 먼 곳까지 sin x 에 가깝다',
        },
        check: {
          type: 'choice',
          q: '$\\cos x$의 매클로린 급수는 무엇입니까?',
          choices: [
            '$1+\\dfrac{x^2}{2!}+\\dfrac{x^4}{4!}+\\cdots$',
            '$x-\\dfrac{x^3}{3!}+\\dfrac{x^5}{5!}-\\cdots$',
            '$1-\\dfrac{x^2}{2!}+\\dfrac{x^4}{4!}-\\cdots$',
          ],
          answer: 2,
          why: [
            '부호가 번갈아 바뀌어야 합니다. $\\cos x$의 이계도함수는 $-\\cos x$이므로 $x^2$항의 계수는 $-\\dfrac{1}{2!}$입니다.',
            '$\\sin x$의 급수입니다. $\\cos 0=1$이므로 상수항이 1이어야 합니다.',
            '',
          ],
          explain: '$\\cos x$의 도함수를 $x=0$에서 차례로 구하면 $1,0,-1,0,1,\\cdots$이므로 $\\cos x=1-\\dfrac{x^2}{2!}+\\dfrac{x^4}{4!}-\\cdots$입니다. 짝수 차수 항만 있고 부호가 번갈아 바뀝니다.',
        },
      },
      {
        title: '알려진 급수로 새 급수 만들기',
        body: '테일러 급수를 매번 도함수로 구할 필요는 없습니다. 이미 아는 급수에 **대입하기, 곱하기, 미분·적분하기**를 하면 빠르게 얻습니다. 거듭제곱급수 표현은 하나뿐이므로 어떤 방법으로 얻든 테일러 급수와 같습니다.\n\n' +
          '- $e^{-x^2}$: $e^t$에 $t=-x^2$을 넣어 $1-x^2+\\dfrac{x^4}{2!}-\\dfrac{x^6}{3!}+\\cdots=\\sum\\dfrac{(-1)^nx^{2n}}{n!}$\n' +
          '- $x\\cos x$: $\\cos x$의 급수에 $x$를 곱해 $x-\\dfrac{x^3}{2!}+\\dfrac{x^5}{4!}-\\cdots$\n' +
          '- $\\dfrac{\\sin x}{x}$ $(x\\ne 0)$: $1-\\dfrac{x^2}{3!}+\\dfrac{x^4}{5!}-\\cdots$\n' +
          '- $e^{2x}$: $\\sum\\dfrac{(2x)^n}{n!}=\\sum\\dfrac{2^n}{n!}x^n$\n\n' +
          '**거꾸로 쓰기** 급수의 계수에서 고계도함수를 바로 읽을 수 있습니다. $c_n=\\dfrac{f^{(n)}(0)}{n!}$이므로 $f^{(n)}(0)=n!\\,c_n$입니다.\n\n' +
          '예: $f(x)=x^2e^x=x^2+x^3+\\dfrac{x^4}{2!}+\\dfrac{x^5}{3!}+\\cdots$에서 $x^5$의 계수는 $\\dfrac{1}{3!}$이므로 $f^{(5)}(0)=5!\\cdot\\dfrac{1}{3!}=20$입니다. 다섯 번 미분하는 것보다 훨씬 빠릅니다.',
        easy: '요리할 때 기본 육수를 미리 만들어 두면 여러 국을 빨리 끓일 수 있는 것과 같습니다. $e^x$, $\\sin x$, $\\cos x$, $\\dfrac{1}{1-x}$의 급수가 기본 육수이고, $x$ 자리에 다른 식을 넣거나 $x$를 곱하는 것은 재료를 더하는 일입니다.\n\n' +
          '$e^{-x^2}$을 직접 여러 번 미분하면 식이 점점 복잡해지지만, $e^t$의 급수에 $t=-x^2$을 넣으면 한 줄로 끝납니다.',
        check: {
          type: 'short', check: 'number',
          q: '$e^{-x^2}$의 매클로린 급수에서 $x^4$의 계수를 구하십시오.',
          answer: '1/2',
          wrong: [
            { a: '1/24', why: '$x^4$이 나왔다고 $4!$로 나누었습니다. $e^t$의 $t^2$항 $\\dfrac{t^2}{2!}$에 $t=-x^2$을 넣은 것이므로 $2!$로 나눕니다.' },
            { a: '-1/2', why: '$(-x^2)^2=x^4$이므로 부호는 $+$입니다.' },
          ],
          explain: '$e^t=1+t+\\dfrac{t^2}{2!}+\\cdots$에 $t=-x^2$을 넣으면 $\\dfrac{(-x^2)^2}{2!}=\\dfrac{x^4}{2}$이므로 계수는 $\\dfrac{1}{2}$입니다.',
        },
      },
      {
        title: '테일러 다항식을 이용한 근삿값과 오차 한계',
        body: '테일러 급수를 $n$차 항까지 자른 다항식\n\n' +
          '$T_n(x)=\\sum_{k=0}^{n}\\dfrac{f^{(k)}(a)}{k!}(x-a)^k$\n\n' +
          '을 $n$차 **테일러 다항식**이라 하고, $f(x)\\approx T_n(x)$로 근삿값을 구합니다. $n=1$이면 접선을 이용한 선형 근사와 같습니다. 나머지 $R_n(x)=f(x)-T_n(x)$는 다음으로 어림합니다.\n\n' +
          '**테일러 부등식** $a$와 $x$ 사이의 모든 $t$에서 $|f^{(n+1)}(t)|\\le M$이면\n\n' +
          '$|R_n(x)|\\le\\dfrac{M}{(n+1)!}|x-a|^{n+1}$\n\n' +
          '예: $e^{0.1}\\approx T_2(0.1)=1+0.1+\\dfrac{0.01}{2}=1.105$입니다. $0\\le t\\le 0.1$에서 $e^t\\le e^{0.1}<2$이므로 오차는 $\\dfrac{2}{3!}(0.1)^3=\\dfrac{0.002}{6}\\approx 0.00033$ 이하입니다.\n\n' +
          '급수가 교대급수이면 교대급수의 오차 어림(다음 항의 절댓값 이하)을 써도 됩니다. 예: $\\sin 0.1\\approx 0.1-\\dfrac{0.1^3}{6}$의 오차는 $\\dfrac{0.1^5}{120}$ 이하입니다.',
        easy: '테일러 다항식은 "중심 근처에서 함수를 흉내 내는 다항식"입니다. 중심에서 가깝고 차수가 높을수록 흉내가 정확합니다.\n\n' +
          '오차 한계 공식은 "다음 항이 얼마나 클 수 있는가"를 어림한 것입니다. 다음 항은 $\\dfrac{f^{(n+1)}}{(n+1)!}(x-a)^{n+1}$ 꼴인데, $f^{(n+1)}$ 자리에 그 최댓값 $M$을 넣어 넉넉하게 잡습니다. $(n+1)!$이 빠르게 커지므로 몇 항만으로도 오차가 아주 작아집니다.',
        check: {
          type: 'short', check: 'number',
          q: '$e^x$의 2차 매클로린 다항식 $T_2(x)$로 $e^{0.2}$의 근삿값을 구하십시오.',
          answer: '1.22',
          wrong: [
            { a: '1.24', why: '$x^2$항을 2로 나누지 않았습니다. $T_2(x)=1+x+\\dfrac{x^2}{2}$입니다.' },
            { a: '1.2', why: '1차 다항식 $1+x$까지만 썼습니다.' },
          ],
          explain: '$T_2(0.2)=1+0.2+\\dfrac{0.2^2}{2}=1+0.2+0.02=1.22$입니다. (실제 값은 $1.2214\\cdots$입니다.)',
        },
      },
      {
        title: '급수를 이용한 극한·적분 계산',
        body: '**극한** $x\\to 0$일 때 부정형이 되는 극한은 함수를 급수로 바꾸면 가장 낮은 차수의 항이 답을 정해 줍니다. 로피탈 정리를 여러 번 쓰는 것보다 간단할 때가 많습니다.\n\n' +
          '$\\lim_{x\\to 0}\\dfrac{\\sin x-x}{x^3}=\\lim_{x\\to 0}\\dfrac{-\\dfrac{x^3}{6}+\\dfrac{x^5}{120}-\\cdots}{x^3}=\\lim_{x\\to 0}\\left(-\\dfrac{1}{6}+\\dfrac{x^2}{120}-\\cdots\\right)=-\\dfrac{1}{6}$\n\n' +
          '$\\lim_{x\\to 0}\\dfrac{1-\\cos x}{x^2}=\\lim_{x\\to 0}\\left(\\dfrac{1}{2!}-\\dfrac{x^2}{4!}+\\cdots\\right)=\\dfrac{1}{2}$\n\n' +
          '**적분** 원시함수를 식으로 쓸 수 없는 함수도 급수로 바꾸어 항별로 적분하면 원하는 정확도로 계산할 수 있습니다.\n\n' +
          '$\\int_{0}^{1}e^{-x^2}\\,dx=\\int_{0}^{1}\\left(1-x^2+\\dfrac{x^4}{2!}-\\dfrac{x^6}{3!}+\\cdots\\right)dx=1-\\dfrac{1}{3}+\\dfrac{1}{10}-\\dfrac{1}{42}+\\dfrac{1}{216}-\\cdots$\n\n' +
          '교대급수이므로 다섯 항까지 더한 값 $0.74748\\cdots$의 오차는 다음 항 $\\dfrac{1}{1320}<0.001$ 이하입니다. (참값은 $0.7468\\cdots$)',
        easy: '$x$가 0에 아주 가까우면 $x^3$은 $x$보다, $x^5$은 $x^3$보다 훨씬 작습니다. 그래서 급수로 바꾸면 "가장 낮은 차수의 항"이 식의 모양을 결정합니다. 분자와 분모에서 가장 낮은 차수끼리 비교하면 극한이 보입니다.\n\n' +
          '적분도 같습니다. 복잡한 함수를 다항식의 합으로 바꾸면, 다항식은 누구나 적분할 수 있으니 한 항씩 적분해서 더하면 됩니다.',
        check: {
          type: 'short', check: 'number',
          q: '급수를 이용하여 다음 극한값을 구하십시오.\n\n$\\lim_{x\\to 0}\\dfrac{e^x-1-x}{x^2}$',
          answer: '1/2',
          wrong: [{ a: '1', why: '$e^x$의 $x^2$항 계수를 1로 보았습니다. $\\dfrac{x^2}{2!}$이므로 계수는 $\\dfrac{1}{2}$입니다.' }],
          explain: '$e^x-1-x=\\dfrac{x^2}{2!}+\\dfrac{x^3}{3!}+\\cdots$이므로 $x^2$으로 나누면 $\\dfrac{1}{2}+\\dfrac{x}{6}+\\cdots\\to\\dfrac{1}{2}$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '거듭제곱급수 $\\sum_{n=1}^{\\infty}\\dfrac{(x-2)^n}{3^n n}$의 수렴 구간을 구하십시오.',
        steps: [
          '$\\left|\\dfrac{c_{n+1}}{c_n}\\right|=\\dfrac{3^n n}{3^{n+1}(n+1)}=\\dfrac{n}{3(n+1)}\\to\\dfrac{1}{3}$이므로 $R=3$입니다. $|x-2|<3$, 곧 $-1<x<5$에서 수렴합니다.',
          '$x=5$이면 $\\sum\\dfrac{3^n}{3^n n}=\\sum\\dfrac{1}{n}$로 조화급수이므로 발산합니다.',
          '$x=-1$이면 $\\sum\\dfrac{(-3)^n}{3^n n}=\\sum\\dfrac{(-1)^n}{n}$으로 교대급수 판정법에 따라 수렴합니다.',
          '따라서 수렴 구간은 $[-1,\\ 5)$입니다.',
        ],
        answer: '$[-1,\\ 5)$',
      },
      {
        q: '$\\ln(1+x)$의 매클로린 급수를 구하고, 이를 이용하여 교대 조화급수 $1-\\dfrac{1}{2}+\\dfrac{1}{3}-\\cdots$의 합을 말하십시오.',
        steps: [
          '$\\dfrac{1}{1+t}=1-t+t^2-t^3+\\cdots$ $(|t|<1)$입니다.',
          '0부터 $x$까지 항별로 적분하면 $\\ln(1+x)=x-\\dfrac{x^2}{2}+\\dfrac{x^3}{3}-\\cdots=\\sum_{n=1}^{\\infty}\\dfrac{(-1)^{n-1}x^n}{n}$ $(|x|<1)$입니다.',
          '이 급수는 끝점 $x=1$에서도 (교대급수로) 수렴하고, 그때의 합은 함수값 $\\ln 2$와 같다는 것이 알려져 있습니다(아벨 정리).',
          '따라서 $1-\\dfrac{1}{2}+\\dfrac{1}{3}-\\dfrac{1}{4}+\\cdots=\\ln 2$입니다.',
        ],
        answer: '$\\ln(1+x)=\\sum_{n=1}^{\\infty}\\dfrac{(-1)^{n-1}x^n}{n}$, 합은 $\\ln 2$',
      },
      {
        q: '$\\int_{0}^{1}\\sin(x^2)\\,dx$를 급수의 처음 세 항으로 어림하고, 오차의 상한을 말하십시오.',
        steps: [
          '$\\sin t=t-\\dfrac{t^3}{3!}+\\dfrac{t^5}{5!}-\\cdots$에 $t=x^2$을 넣으면 $\\sin(x^2)=x^2-\\dfrac{x^6}{6}+\\dfrac{x^{10}}{120}-\\cdots$입니다.',
          '항별로 적분하면 $\\int_{0}^{1}\\sin(x^2)\\,dx=\\dfrac{1}{3}-\\dfrac{1}{42}+\\dfrac{1}{1320}-\\cdots$입니다.',
          '처음 세 항의 합은 $0.33333-0.02381+0.00076=0.31028\\cdots$입니다.',
          '교대급수이므로 오차는 다음 항 $\\dfrac{1}{7!\\cdot 15}=\\dfrac{1}{75600}$ 이하입니다.',
        ],
        answer: '약 $0.3103$ (오차 $\\dfrac{1}{75600}$ 이하)',
      },
    ],

    terms: [
      { term: '거듭제곱급수', def: '$\\sum_{n=0}^{\\infty}c_n(x-a)^n$ 꼴의 급수입니다. $a$를 중심, $c_n$을 계수라 합니다.' },
      { term: '수렴 반지름', def: '$|x-a|<R$이면 수렴하고 $|x-a|>R$이면 발산하는 수 $R$입니다. $0$이나 $\\infty$일 수도 있습니다.' },
      { term: '수렴 구간', def: '거듭제곱급수가 수렴하는 $x$ 전체의 구간입니다. 끝점 $a\\pm R$의 포함 여부는 따로 확인합니다.' },
      { term: '테일러 급수', def: '$\\sum_{n=0}^{\\infty}\\dfrac{f^{(n)}(a)}{n!}(x-a)^n$입니다. $f$를 $a$ 근처에서 거듭제곱급수로 나타낸 것입니다.' },
      { term: '매클로린 급수', def: '중심이 $a=0$인 테일러 급수입니다. 예: $e^x=\\sum\\dfrac{x^n}{n!}$' },
      { term: '테일러 다항식', def: '테일러 급수를 $n$차 항까지 자른 다항식 $T_n(x)$입니다. 함수의 근삿값을 구하는 데 씁니다.' },
      { term: '테일러 부등식', def: '$|f^{(n+1)}(t)|\\le M$이면 $|f(x)-T_n(x)|\\le\\dfrac{M}{(n+1)!}|x-a|^{n+1}$이라는 오차 어림입니다.' },
      { term: '항별 미분·적분', def: '수렴 반지름 안에서 거듭제곱급수를 한 항씩 미분하거나 적분하는 것입니다. 수렴 반지름은 바뀌지 않습니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '거듭제곱급수 $\\sum_{n=1}^{\\infty}\\dfrac{n\\,x^n}{2^n}$의 수렴 반지름 $R$을 구하십시오.',
        answer: '2',
        wrong: [{ a: '1/2', why: '비의 극한 $L=\\dfrac{1}{2}$을 그대로 썼습니다. $R=\\dfrac{1}{L}$입니다.' }],
        explain: '$\\left|\\dfrac{c_{n+1}}{c_n}\\right|=\\dfrac{n+1}{2^{n+1}}\\cdot\\dfrac{2^n}{n}=\\dfrac{n+1}{2n}\\to\\dfrac{1}{2}$이므로 $R=2$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 0,
        q: '거듭제곱급수 $\\sum_{n=1}^{\\infty}\\dfrac{x^n}{n^2}$의 수렴 구간은 무엇입니까?',
        choices: ['$(-1,\\ 1)$', '$[-1,\\ 1)$', '$(-1,\\ 1]$', '$[-1,\\ 1]$'],
        answer: 3,
        fixed: true,
        why: [
          '끝점을 확인하지 않았습니다. $x=\\pm 1$에서 $\\sum\\dfrac{1}{n^2}$과 $\\sum\\dfrac{(-1)^n}{n^2}$은 모두 수렴합니다.',
          '$x=1$에서 $\\sum\\dfrac{1}{n^2}$은 $p=2$인 p-급수로 수렴합니다. $\\sum\\dfrac{x^n}{n}$과 혼동했습니다.',
          '$x=-1$에서 $\\sum\\dfrac{(-1)^n}{n^2}$은 절대수렴합니다.',
          '',
        ],
        explain: '$\\dfrac{n^2}{(n+1)^2}\\to 1$이므로 $R=1$입니다. $x=1$이면 $\\sum\\dfrac{1}{n^2}$(수렴), $x=-1$이면 $\\sum\\dfrac{(-1)^n}{n^2}$(절대수렴)이므로 수렴 구간은 $[-1,\\ 1]$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 0,
        q: '거듭제곱급수 $\\sum_{n=0}^{\\infty}\\dfrac{x^n}{n!}$의 수렴 반지름은 $0$입니다.',
        answer: false,
        explain: '$\\left|\\dfrac{c_{n+1}}{c_n}\\right|=\\dfrac{n!}{(n+1)!}=\\dfrac{1}{n+1}\\to 0$이므로 모든 $x$에서 수렴하고 $R=\\infty$입니다. (이 급수는 $e^x$입니다.) $R=0$인 것은 $\\sum n!\\,x^n$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 2,
        q: '$e^x$의 3차 매클로린 다항식 $T_3(x)$는 무엇입니까?',
        choices: [
          '$1+x+x^2+x^3$',
          '$1+x+\\dfrac{x^2}{2}+\\dfrac{x^3}{6}$',
          '$1+x+\\dfrac{x^2}{2}+\\dfrac{x^3}{3}$',
          '$x+\\dfrac{x^2}{2}+\\dfrac{x^3}{6}$',
        ],
        answer: 1,
        why: [
          '$\\dfrac{1}{1-x}$의 다항식입니다. $e^x$은 $n!$로 나눕니다.',
          '',
          '$x^3$항은 $3$이 아니라 $3!=6$으로 나눕니다.',
          '상수항 $e^0=1$을 빠뜨렸습니다.',
        ],
        explain: '$f^{(k)}(0)=e^0=1$이므로 $c_k=\\dfrac{1}{k!}$입니다. $T_3(x)=1+x+\\dfrac{x^2}{2!}+\\dfrac{x^3}{3!}=1+x+\\dfrac{x^2}{2}+\\dfrac{x^3}{6}$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 2,
        q: '$\\sin x$의 매클로린 급수에서 $x^5$의 계수를 구하십시오.',
        answer: '1/120',
        wrong: [
          { a: '-1/120', why: '부호를 확인하십시오. $x-\\dfrac{x^3}{3!}+\\dfrac{x^5}{5!}$에서 $x^5$항은 $+$입니다.' },
          { a: '1/5', why: '$5$가 아니라 $5!=120$으로 나눕니다.' },
        ],
        explain: '$\\sin x=x-\\dfrac{x^3}{3!}+\\dfrac{x^5}{5!}-\\cdots$이므로 $x^5$의 계수는 $\\dfrac{1}{5!}=\\dfrac{1}{120}$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 4,
        q: '$\\cos x$의 2차 매클로린 다항식으로 $\\cos 0.2$의 근삿값을 구하십시오.',
        answer: '0.98',
        wrong: [
          { a: '1.02', why: '부호를 확인하십시오. $\\cos x\\approx 1-\\dfrac{x^2}{2}$입니다.' },
          { a: '0.96', why: '$x^2$항을 2로 나누지 않았습니다.' },
        ],
        explain: '$T_2(x)=1-\\dfrac{x^2}{2}$이므로 $T_2(0.2)=1-\\dfrac{0.04}{2}=0.98$입니다. (실제 값은 $0.98007\\cdots$입니다.)',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'number', concept: 5,
        q: '급수를 이용하여 다음 극한값을 구하십시오.\n\n$\\lim_{x\\to 0}\\dfrac{1-\\cos x}{x^2}$',
        answer: '1/2',
        wrong: [
          { a: '-1/2', why: '$1-\\cos x=\\dfrac{x^2}{2!}-\\cdots$이므로 부호는 $+$입니다.' },
          { a: '1', why: '$\\cos x$의 $x^2$항을 $2!$로 나누지 않았습니다.' },
        ],
        explain: '$1-\\cos x=\\dfrac{x^2}{2!}-\\dfrac{x^4}{4!}+\\cdots$이므로 $x^2$으로 나누면 $\\dfrac{1}{2}-\\dfrac{x^2}{24}+\\cdots\\to\\dfrac{1}{2}$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 1,
        q: '거듭제곱급수를 이용하여 $\\sum_{n=1}^{\\infty}\\dfrac{n}{3^n}$의 값을 구하십시오.',
        answer: '3/4',
        hint: '$\\sum_{n=1}^{\\infty}nx^n=x\\sum_{n=1}^{\\infty}nx^{n-1}=\\dfrac{x}{(1-x)^2}$를 쓰십시오.',
        wrong: [
          { a: '9/4', why: '$\\sum nx^{n-1}$의 값을 구했습니다. 문제의 급수는 $x^n$이므로 $x=\\dfrac{1}{3}$을 한 번 더 곱합니다.' },
          { a: '1/2', why: '등비급수 $\\sum\\left(\\dfrac{1}{3}\\right)^n$의 합을 구했습니다. 계수 $n$이 있으므로 미분한 급수를 씁니다.' },
        ],
        explain: '$\\dfrac{1}{1-x}=\\sum x^n$을 미분하면 $\\dfrac{1}{(1-x)^2}=\\sum nx^{n-1}$이고, $x$를 곱하면 $\\sum nx^n=\\dfrac{x}{(1-x)^2}$입니다. $x=\\dfrac{1}{3}$을 넣으면 $\\dfrac{1/3}{4/9}=\\dfrac{3}{4}$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 1,
        q: '$\\dfrac{1}{1+x}=1-x+x^2-x^3+\\cdots$ $(|x|<1)$을 항별로 적분하여 얻은 $\\ln(1+x)$의 급수는 무엇입니까?',
        choices: [
          '$x+\\dfrac{x^2}{2}+\\dfrac{x^3}{3}+\\cdots$',
          '$x-\\dfrac{x^3}{3}+\\dfrac{x^5}{5}-\\cdots$',
          '$x-\\dfrac{x^2}{2}+\\dfrac{x^3}{3}-\\cdots$',
          '$-1+2x-3x^2+\\cdots$',
        ],
        answer: 2,
        why: [
          '부호가 모두 $+$인 것은 $-\\ln(1-x)$의 급수입니다.',
          '$\\arctan x$의 급수입니다. $\\dfrac{1}{1+x^2}$을 적분한 것입니다.',
          '',
          '적분하지 않고 미분했습니다.',
        ],
        hint: '항마다 $x^n$을 $\\dfrac{x^{n+1}}{n+1}$으로 바꾸고, $x=0$을 넣어 상수를 정하십시오.',
        explain: '$\\int_{0}^{x}(1-t+t^2-\\cdots)\\,dt=x-\\dfrac{x^2}{2}+\\dfrac{x^3}{3}-\\cdots$이고, $\\ln(1+0)=0$이므로 적분상수는 0입니다. 따라서 $\\ln(1+x)=\\sum_{n=1}^{\\infty}\\dfrac{(-1)^{n-1}x^n}{n}$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 3,
        q: '$e^{-x^2}$의 매클로린 급수는 무엇입니까?',
        choices: [
          '$1-x^2+\\dfrac{x^4}{4!}-\\dfrac{x^6}{6!}+\\cdots$',
          '$1-x^2+\\dfrac{x^4}{2!}-\\dfrac{x^6}{3!}+\\cdots$',
          '$1+x^2+\\dfrac{x^4}{2!}+\\dfrac{x^6}{3!}+\\cdots$',
          '$1-\\dfrac{x^2}{2!}+\\dfrac{x^4}{4!}-\\cdots$',
        ],
        answer: 1,
        why: [
          '$x$의 차수로 계승을 정했습니다. $e^t$의 $t^n$항이므로 $n!$로 나눕니다($t=-x^2$).',
          '',
          '$e^{x^2}$의 급수입니다. $(-x^2)^n$의 부호가 번갈아 바뀝니다.',
          '$\\cos x$의 급수입니다.',
        ],
        hint: '$e^t=\\sum\\dfrac{t^n}{n!}$에 $t=-x^2$을 넣으십시오.',
        explain: '$e^t=1+t+\\dfrac{t^2}{2!}+\\dfrac{t^3}{3!}+\\cdots$에 $t=-x^2$을 넣으면 $1-x^2+\\dfrac{x^4}{2!}-\\dfrac{x^6}{3!}+\\cdots=\\sum\\dfrac{(-1)^nx^{2n}}{n!}$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 4,
        q: '$e^x$의 3차 매클로린 다항식 $T_3$으로 $e^{0.5}$을 어림합니다. $0\\le t\\le 0.5$에서 $e^t\\le 2$임을 이용할 때, 테일러 부등식이 주는 오차 $|R_3(0.5)|$의 상한을 구하십시오.',
        answer: '1/192',
        hint: '$|R_3(x)|\\le\\dfrac{M}{4!}|x|^4$입니다.',
        wrong: [
          { a: '1/24', why: '$(n+1)$ 대신 $n=3$을 써서 $\\dfrac{M}{3!}|x|^3$을 계산했습니다.' },
          { a: '1/384', why: '$M=2$를 곱하지 않았습니다.' },
        ],
        explain: '$f^{(4)}(t)=e^t\\le 2=M$이므로 $|R_3(0.5)|\\le\\dfrac{2}{4!}(0.5)^4=\\dfrac{2}{24}\\cdot\\dfrac{1}{16}=\\dfrac{1}{192}$입니다. (약 $0.0052$)',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 5,
        q: '급수를 이용하여 다음 극한값을 구하십시오.\n\n$\\lim_{x\\to 0}\\dfrac{\\sin x-x}{x^3}$',
        answer: '-1/6',
        hint: '$\\sin x$의 급수에서 $x$를 빼면 가장 낮은 차수의 항은 무엇입니까?',
        wrong: [
          { a: '1/6', why: '$\\sin x=x-\\dfrac{x^3}{6}+\\cdots$이므로 $\\sin x-x$의 첫 항은 $-\\dfrac{x^3}{6}$입니다.' },
          { a: '0', why: '분자의 가장 낮은 차수 항이 분모와 같은 $x^3$이므로 극한은 0이 아닙니다.' },
        ],
        explain: '$\\sin x-x=-\\dfrac{x^3}{3!}+\\dfrac{x^5}{5!}-\\cdots$이므로 $x^3$으로 나누면 $-\\dfrac{1}{6}+\\dfrac{x^2}{120}-\\cdots\\to-\\dfrac{1}{6}$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 0,
        q: '거듭제곱급수 $\\sum_{n=1}^{\\infty}\\dfrac{(x-2)^n}{3^n\\sqrt{n}}$의 수렴 구간은 무엇입니까?',
        choices: ['$(-1,\\ 5)$', '$[-1,\\ 5)$', '$(-1,\\ 5]$', '$[-1,\\ 5]$'],
        answer: 1,
        fixed: true,
        why: [
          '$x=-1$에서 $\\sum\\dfrac{(-1)^n}{\\sqrt{n}}$은 교대급수 판정법으로 수렴합니다.',
          '',
          '두 끝점을 바꾸어 판정했습니다. $x=5$에서는 $\\sum\\dfrac{1}{\\sqrt{n}}$이 됩니다.',
          '$x=5$에서 $\\sum\\dfrac{1}{\\sqrt{n}}$은 $p=\\dfrac{1}{2}$인 p-급수로 발산합니다.',
        ],
        hint: '먼저 $R$을 구하고, 두 끝점을 넣어 각각 p-급수와 교대급수로 판정하십시오.',
        explain: '$\\left|\\dfrac{c_{n+1}}{c_n}\\right|=\\dfrac{1}{3}\\sqrt{\\dfrac{n}{n+1}}\\to\\dfrac{1}{3}$이므로 $R=3$, 중심 2입니다. $x=5$이면 $\\sum\\dfrac{1}{\\sqrt{n}}$(발산), $x=-1$이면 $\\sum\\dfrac{(-1)^n}{\\sqrt{n}}$(수렴)이므로 수렴 구간은 $[-1,\\ 5)$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 3,
        q: '$f(x)=x^2e^x$일 때, $f^{(5)}(0)$의 값을 구하십시오.',
        answer: '20',
        hint: '$x^2e^x$의 매클로린 급수에서 $x^5$의 계수 $c_5$를 찾고, $f^{(5)}(0)=5!\\,c_5$를 쓰십시오.',
        wrong: [
          { a: '1/6', why: '$x^5$의 계수 $c_5$를 구했습니다. 도함수의 값은 $5!\\,c_5$입니다.' },
          { a: '120', why: '$x^5$의 계수를 1로 보았습니다. $x^2\\cdot\\dfrac{x^3}{3!}$이므로 계수는 $\\dfrac{1}{3!}$입니다.' },
          { a: '1', why: '$x^5$의 계수를 $\\dfrac{1}{5!}$로 보았습니다. $x^2$이 곱해져 있으므로 $e^x$의 $x^3$항에서 나옵니다.' },
        ],
        explain: '$x^2e^x=x^2\\left(1+x+\\dfrac{x^2}{2!}+\\dfrac{x^3}{3!}+\\cdots\\right)$에서 $x^5$의 계수는 $\\dfrac{1}{3!}=\\dfrac{1}{6}$입니다. 따라서 $f^{(5)}(0)=5!\\cdot\\dfrac{1}{6}=20$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 5,
        q: '$\\int_{0}^{1}e^{-x^2}\\,dx$를 급수로 나타낼 때, 0이 아닌 처음 세 항의 합을 구하십시오.',
        answer: '23/30',
        hint: '$e^{-x^2}=1-x^2+\\dfrac{x^4}{2!}-\\cdots$을 항별로 적분하십시오.',
        wrong: [
          { a: '13/15', why: '$\\dfrac{x^4}{2!}$의 $2!$을 빠뜨려 $\\dfrac{1}{5}$을 더했습니다. 셋째 항은 $\\dfrac{1}{2!\\cdot 5}=\\dfrac{1}{10}$입니다.' },
          { a: '2/3', why: '두 항 $1-\\dfrac{1}{3}$까지만 더했습니다.' },
        ],
        explain: '$\\int_{0}^{1}\\left(1-x^2+\\dfrac{x^4}{2}-\\cdots\\right)dx=1-\\dfrac{1}{3}+\\dfrac{1}{10}-\\cdots$이므로 처음 세 항의 합은 $\\dfrac{30-10+3}{30}=\\dfrac{23}{30}\\approx 0.767$입니다. 교대급수이므로 참값과의 차는 다음 항 $\\dfrac{1}{42}$ 이하입니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 1,
        q: '$\\arctan x=\\sum_{n=0}^{\\infty}\\dfrac{(-1)^nx^{2n+1}}{2n+1}$이 끝점 $x=1$에서도 수렴하여 함수값과 같다는 사실을 이용하면, $1-\\dfrac{1}{3}+\\dfrac{1}{5}-\\dfrac{1}{7}+\\cdots$의 값은 무엇입니까?',
        choices: ['$\\ln 2$', '$\\dfrac{\\pi}{4}$', '$\\dfrac{\\pi}{2}$', '$1$'],
        answer: 1,
        why: [
          '$\\ln 2$는 $1-\\dfrac{1}{2}+\\dfrac{1}{3}-\\cdots$(모든 자연수의 역수)의 합입니다.',
          '',
          '$\\arctan 1$은 $\\tan\\theta=1$인 각 $\\dfrac{\\pi}{4}$입니다. $\\dfrac{\\pi}{2}$는 $\\arctan$의 극한값입니다.',
          '첫 항만 보았습니다. 뒤의 항들이 합을 바꿉니다.',
        ],
        hint: '주어진 급수는 $\\arctan x$의 급수에 $x=1$을 넣은 것입니다.',
        explain: '$x=1$을 넣으면 $\\arctan 1=1-\\dfrac{1}{3}+\\dfrac{1}{5}-\\cdots$이고 $\\arctan 1=\\dfrac{\\pi}{4}$입니다. 이것을 라이프니츠 급수라 합니다. 수렴이 매우 느려서 실제로 $\\pi$를 계산할 때는 다른 급수를 씁니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 4,
        q: '$e^x$의 $n$차 매클로린 다항식으로 $e=e^1$을 어림합니다. $0\\le t\\le 1$에서 $e^t\\le 3$임을 이용할 때, 테일러 부등식이 오차를 $0.001$보다 작게 보장하는 가장 작은 $n$을 구하십시오.',
        answer: '6',
        hint: '$\\dfrac{3}{(n+1)!}<0.001$, 곧 $(n+1)!>3000$인 가장 작은 $n$을 찾으십시오.',
        wrong: [
          { a: '7', why: '$(n+1)!=7!$에서 $n+1=7$인데 $n$으로 답했습니다. $n=6$입니다.' },
          { a: '5', why: '$6!=720$은 3000보다 작으므로 $n+1=6$으로는 부족합니다.' },
        ],
        explain: '$|R_n(1)|\\le\\dfrac{3}{(n+1)!}\\cdot 1^{n+1}<0.001$이려면 $(n+1)!>3000$이어야 합니다. $6!=720$, $7!=5040$이므로 $n+1=7$, 곧 $n=6$입니다.',
      },
      {
        id: 'a6', level: 3, type: 'choice', concept: 5,
        q: '급수를 이용하여 $\\lim_{x\\to 0}\\dfrac{x-\\arctan x}{x^3}$의 값을 구한 것은 무엇입니까?',
        choices: ['$-\\dfrac{1}{3}$', '$\\dfrac{1}{6}$', '$0$', '$\\dfrac{1}{3}$'],
        answer: 3,
        why: [
          '부호를 확인하십시오. $x-\\left(x-\\dfrac{x^3}{3}+\\cdots\\right)=+\\dfrac{x^3}{3}-\\cdots$입니다.',
          '$\\sin x$의 급수($\\dfrac{x^3}{3!}$)와 혼동했습니다. $\\arctan x$의 $x^3$항은 $-\\dfrac{x^3}{3}$입니다.',
          '분자의 가장 낮은 차수가 $x^3$이므로 극한은 0이 아닙니다.',
          '',
        ],
        hint: '$\\arctan x=x-\\dfrac{x^3}{3}+\\dfrac{x^5}{5}-\\cdots$입니다.',
        explain: '$x-\\arctan x=\\dfrac{x^3}{3}-\\dfrac{x^5}{5}+\\cdots$이므로 $x^3$으로 나누면 $\\dfrac{1}{3}-\\dfrac{x^2}{5}+\\cdots\\to\\dfrac{1}{3}$입니다.',
      },
    ],

    deeper: [
      {
        title: '테일러 급수가 함수와 다른 경우',
        body: '$f(x)=e^{-1/x^2}$ $(x\\ne 0)$, $f(0)=0$으로 정의한 함수는 모든 차수로 미분가능하고, 놀랍게도 $f^{(n)}(0)=0$이 모든 $n$에서 성립합니다. 그래서 매클로린 급수는 $0+0x+0x^2+\\cdots=0$인데, $x\\ne 0$이면 $f(x)>0$입니다. 급수는 모든 $x$에서 수렴하지만 함수와 같지 않습니다.\n\n' +
          '이 예는 "테일러 급수를 만들 수 있다"와 "테일러 급수가 함수와 같다"가 다른 말임을 보여 줍니다. 그래서 나머지 $R_n(x)\\to 0$을 확인하는 테일러 부등식이 중요합니다. $e^x$, $\\sin x$, $\\cos x$는 이 확인을 통과하므로 안심하고 급수로 바꿀 수 있습니다.',
      },
      {
        title: '급수로 이어지는 수학: 오일러 공식',
        body: '$e^x$의 급수에 형식적으로 $x=i\\theta$ ($i^2=-1$)를 넣고 실수 부분과 허수 부분을 나누면\n\n' +
          '$e^{i\\theta}=\\left(1-\\dfrac{\\theta^2}{2!}+\\dfrac{\\theta^4}{4!}-\\cdots\\right)+i\\left(\\theta-\\dfrac{\\theta^3}{3!}+\\dfrac{\\theta^5}{5!}-\\cdots\\right)=\\cos\\theta+i\\sin\\theta$\n\n' +
          '라는 **오일러 공식**을 얻습니다. 지수함수와 삼각함수가 같은 뿌리에서 나왔음을 보여 주는 식으로, 교류 회로·신호 처리·양자역학 같은 전공에서 매일 쓰입니다.\n\n' +
          '또 계산기와 컴퓨터가 $\\sin$, $e^x$, $\\ln$ 같은 값을 계산할 때도 다항식 근사와 같은 생각이 바탕에 있습니다. 이 단원에서 배운 오차 한계가 "몇 항이면 충분한가"를 정해 줍니다.',
      },
    ],

    faq: [
      {
        q: '$\\dfrac{1}{1+x^2}$은 모든 실수에서 매끄러운데 왜 수렴 반지름이 1이에요?',
        a: '실수만 보면 이상해 보이지만, 복소수까지 넓히면 $x=\\pm i$에서 분모가 0이 됩니다. 거듭제곱급수의 수렴 반지름은 중심에서 가장 가까운 "문제가 되는 점"(복소평면에서)까지의 거리로 정해지는데, 0에서 $\\pm i$까지의 거리가 1입니다. 실수 범위에서는 일단 "등비급수 $\\sum(-x^2)^n$은 $|x^2|<1$에서만 수렴한다"고 이해하면 됩니다.',
      },
      {
        q: '테일러 다항식의 차수를 높이면 항상 더 정확해져요?',
        a: '수렴 구간 안이라면 차수를 높일수록 나머지가 0으로 가므로 결국 정확해집니다. 하지만 수렴 구간 밖에서는 아닙니다. 예를 들어 $\\ln(1+x)$의 급수에 $x=2$를 넣으면 $2-2+\\dfrac{8}{3}-4+\\cdots$처럼 항이 커져서 차수를 높일수록 더 엉망이 됩니다.',
      },
      {
        q: '수렴 구간을 구할 때 끝점은 왜 따로 봐야 해요?',
        a: '끝점에서는 비 판정법(또는 근 판정법)의 값이 정확히 1이 되어 판정이 안 되기 때문입니다. 그래서 끝점을 급수에 직접 넣고, p-급수·교대급수·비교 판정법 같은 앞 단원의 방법으로 하나씩 판정합니다. 같은 $R$이라도 끝점의 결과는 $(-1,1)$, $[-1,1)$, $[-1,1]$처럼 달라집니다.',
      },
    ],

    mistakes: [
      '수렴 반지름을 구한 뒤 끝점을 확인하지 않고 열린구간으로 답하는 실수 — 끝점 두 개를 직접 넣어 따로 판정합니다.',
      '테일러 계수에서 $n!$을 빠뜨리는 실수 — $c_n=\\dfrac{f^{(n)}(a)}{n!}$입니다. $e^x$의 $x^3$항은 $\\dfrac{x^3}{3}$이 아니라 $\\dfrac{x^3}{6}$입니다.',
      '$e^{-x^2}$처럼 대입한 급수에서 $x$의 차수로 계승을 정하는 실수 — $e^t$의 $t^n$항이므로 $\\dfrac{(-x^2)^n}{n!}$, 곧 $x^{2n}$항에 $n!$입니다.',
    ],

    gens: [
      {
        id: 'radius',
        level: 1,
        title: '거듭제곱급수의 수렴 반지름',
        make: function (R) {
          var a = R.int(-3, 3);
          var b = R.int(2, 6);
          var k = R.int(0, 3);
          var inv = R.bool(0.35);         // 계수가 b^n/n^k 꼴이면 R=1/b
          var xa = a === 0 ? 'x' : '(x' + (a > 0 ? '-' + a : '+' + (-a)) + ')';
          var nk = k === 0 ? '' : (k === 1 ? 'n' : 'n^{' + k + '}');
          var term, Rv;
          if (inv) {
            term = '\\dfrac{' + b + '^{n}' + xa + '^{n}}{' + (nk || '1') + '}';
            if (!nk) term = b + '^{n}' + xa + '^{n}';
            Rv = R.F(1, b);
          } else {
            term = '\\dfrac{' + (nk ? nk + '\\,' : '') + xa + '^{n}}{' + b + '^{n}}';
            Rv = R.F(b);
          }
          var wrong = [], seen = {};
          seen[Rv.toString()] = true;
          [[Rv.inv(), '비의 극한 $L$을 그대로 답했습니다. 수렴 반지름은 $R=\\dfrac{1}{L}$입니다.'],
            [R.F(a), '중심 $a=' + a + '$' + R.josa(a, '을/를') + ' 답했습니다. 수렴 반지름은 중심에서 경계까지의 거리입니다.'],
            ].concat(k ? [[R.F(1), '다항식 부분 $\\dfrac{(n+1)^{' + k + '}}{n^{' + k + '}}\\to 1$만 보았습니다.']] : []).forEach(function (w) {
            var key = w[0].toString();
            if (!seen[key]) { seen[key] = true; wrong.push({ a: key, why: w[1] }); }
          });
          var ratio = inv ? b + (k ? '\\cdot\\left(\\dfrac{n}{n+1}\\right)' + (k === 1 ? '' : '^{' + k + '}') : '') : '\\dfrac{1}{' + b + '}' + (k ? '\\cdot\\left(\\dfrac{n+1}{n}\\right)' + (k === 1 ? '' : '^{' + k + '}') : '');
          return {
            type: 'short', check: 'number', concept: 0,
            q: '거듭제곱급수 $\\sum_{n=1}^{\\infty}' + term + '$의 수렴 반지름 $R$을 구하십시오.',
            answer: Rv.toString(),
            wrong: wrong,
            explain: '계수의 비는 $\\left|\\dfrac{c_{n+1}}{c_n}\\right|=' + ratio + '\\to' + R.fmt.frac(Rv.inv()) + '$이므로 $R=\\dfrac{1}{L}=' + R.fmt.frac(Rv) + '$입니다.\n\n' +
              '(중심은 $x=' + a + '$이고, $|x' + (a === 0 ? '' : (a > 0 ? '-' + a : '+' + (-a))) + '|<' + R.fmt.frac(Rv) + '$에서 수렴합니다.)',
          };
        },
      },
      {
        id: 'interval',
        level: 2,
        title: '수렴 구간 (끝점 판정 포함)',
        make: function (R) {
          var a = R.int(-2, 3);
          var b = R.int(1, 4);
          var p = R.int(0, 2);
          var alt = R.bool();          // (-1)^n 이 붙으면 끝점의 역할이 바뀐다
          var lo = a - b, hi = a + b;
          var xa = a === 0 ? 'x' : '(x' + (a > 0 ? '-' + a : '+' + (-a)) + ')';
          var den = (b === 1 ? '' : b + '^{n}') + (p === 0 ? '' : (p === 1 ? 'n' : 'n^{2}'));
          var num = (alt ? '(-1)^{n}' : '') + xa + '^{n}';
          var term = den ? '\\dfrac{' + num + '}{' + den + '}' : num;
          // 끝점에서의 급수: 같은 부호가 되는 쪽은 Σ1/n^p, 번갈아 바뀌는 쪽은 Σ(-1)^n/n^p
          var plainAt = alt ? lo : hi;          // Σ 1/n^p 가 되는 끝점
          var plainConv = p === 2;
          var altConv = p >= 1;
          var loIn = (plainAt === lo) ? plainConv : altConv;
          var hiIn = (plainAt === hi) ? plainConv : altConv;
          var correct = iv(lo, hi, loIn, hiIn);
          var all = [[false, false], [true, false], [false, true], [true, true]];
          function verdict(conv) { return conv ? '수렴' : '발산'; }
          function serTex(plain) { return plain ? (p === 0 ? '\\sum 1' : '\\sum\\dfrac{1}{' + (p === 1 ? 'n' : 'n^{2}') + '}') : (p === 0 ? '\\sum(-1)^{n}' : '\\sum\\dfrac{(-1)^{n}}{' + (p === 1 ? 'n' : 'n^{2}') + '}'); }
          var loSer = serTex(plainAt === lo), hiSer = serTex(plainAt === hi);
          var why = {};
          all.forEach(function (c) {
            var t = iv(lo, hi, c[0], c[1]);
            if (t === correct) return;
            var msgs = [];
            if (c[0] !== loIn) msgs.push('$x=' + lo + '$에서는 급수가 $' + loSer + '$ 꼴이 되어 ' + verdict(loIn) + '합니다');
            if (c[1] !== hiIn) msgs.push('$x=' + hi + '$에서는 급수가 $' + hiSer + '$ 꼴이 되어 ' + verdict(hiIn) + '합니다');
            why[t] = '끝점 판정이 틀렸습니다. ' + msgs.join('. ') + '.';
          });
          var pick = R.choices(correct, all.map(function (c) { return iv(lo, hi, c[0], c[1]); }).filter(function (t) { return t !== correct; }));
          function reason(plain) {
            if (p === 0) return '일반항이 0으로 가지 않으므로 발산';
            if (plain) return p === 1 ? '조화급수이므로 발산' : 'p-급수($p=2$)이므로 수렴';
            return p === 1 ? '교대급수 판정법으로 수렴' : '절대수렴하므로 수렴';
          }
          return {
            type: 'choice', concept: 0,
            q: '거듭제곱급수 $\\sum_{n=1}^{\\infty}' + term + '$의 수렴 구간은 무엇입니까?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (t) { return t === correct ? '' : why[t] || ''; }),
            hint: '수렴 반지름을 구한 뒤, 두 끝점을 넣어 각각 판정하십시오.',
            explain: '계수의 비가 $' + (b === 1 ? '1' : '\\dfrac{1}{' + b + '}') + '$로 가므로 $R=' + b + '$, 중심은 $' + a + '$입니다. $' + lo + '<x<' + hi + '$에서 수렴합니다.\n\n' +
              '- $x=' + hi + '$: $' + hiSer + '$ — ' + reason(plainAt === hi) + '\n' +
              '- $x=' + lo + '$: $' + loSer + '$ — ' + reason(plainAt === lo) + '\n\n' +
              '따라서 수렴 구간은 ' + correct + '입니다.',
          };
        },
      },
      {
        id: 'maclaurin-coef',
        level: 1,
        title: '매클로린 급수의 계수',
        make: function (R) {
          var kind = R.pick(['exp', 'exp', 'sin', 'cos', 'geo', 'ln']);
          var m = R.pick([2, 3, -1, -2]);
          var k, ans, f, wrongs = [], form, tc;
          if (kind === 'exp') {
            k = R.int(2, 5);
            ans = R.F(Math.pow(m, k), fact(k));
            f = 'e^{' + mx(m) + '}';
            form = 'e^t=\\sum\\dfrac{t^n}{n!}';
            tc = R.F(1, fact(k));
            wrongs = [[R.F(Math.pow(m, k)), '$' + k + '!$로 나누는 것을 빠뜨렸습니다.'], [R.F(1, fact(k)), '$x$ 대신 $' + mx(m) + '$' + R.josa('x', '을/를') + ' 넣은 것을 잊고 $' + R.fmt.paren(m) + '^{' + k + '}$을 곱하지 않았습니다.'], [R.F(Math.pow(m, k), k), '$' + k + '$' + R.josa(k, '이/가') + ' 아니라 $' + k + '!$로 나눕니다.']];
          } else if (kind === 'sin') {
            k = R.pick([3, 5]);
            var sg = ((k - 1) / 2) % 2 === 0 ? 1 : -1;
            ans = R.F(sg * Math.pow(m, k), fact(k));
            f = '\\sin(' + mx(m) + ')';
            form = '\\sin t=t-\\dfrac{t^3}{3!}+\\dfrac{t^5}{5!}-\\cdots';
            tc = R.F(sg, fact(k));
            wrongs = [[ans.neg(), '부호를 확인하십시오. $\\sin t$의 급수는 $+,-,+,\\cdots$이고 $' + R.fmt.paren(m) + '^{' + k + '}$의 부호도 함께 봅니다.'], [R.F(sg * Math.pow(m, k)), '$' + k + '!$로 나누는 것을 빠뜨렸습니다.'], [R.F(sg, fact(k)), '$t=' + mx(m) + '$' + R.josa('x', '을/를') + ' 넣었으므로 $' + R.fmt.paren(m) + '^{' + k + '}$을 곱해야 합니다.']];
          } else if (kind === 'cos') {
            m = Math.abs(m);   // cos 는 짝함수라 음수 m 은 같은 문제
            k = R.pick([2, 4]);
            var sc = (k / 2) % 2 === 0 ? 1 : -1;
            ans = R.F(sc * Math.pow(m, k), fact(k));
            f = '\\cos(' + mx(m) + ')';
            form = '\\cos t=1-\\dfrac{t^2}{2!}+\\dfrac{t^4}{4!}-\\cdots';
            tc = R.F(sc, fact(k));
            wrongs = [[ans.neg(), '부호를 확인하십시오. $\\cos t$의 급수는 $1-\\dfrac{t^2}{2!}+\\dfrac{t^4}{4!}-\\cdots$입니다.'], [R.F(sc * Math.pow(m, k)), '$' + k + '!$로 나누는 것을 빠뜨렸습니다.'], [R.F(sc, fact(k)), '$t=' + mx(m) + '$' + R.josa('x', '을/를') + ' 넣었으므로 $' + R.fmt.paren(m) + '^{' + k + '}$을 곱해야 합니다.']];
          } else if (kind === 'geo') {
            k = R.int(2, 4);
            ans = R.F(Math.pow(m, k));
            f = '\\dfrac{1}{1' + (m > 0 ? '-' + mx(m) : '+' + mx(-m)) + '}';
            form = '\\dfrac{1}{1-t}=\\sum t^n';
            tc = R.F(1);
            wrongs = [[R.F(Math.pow(m, k), fact(k)), '$\\dfrac{1}{1-t}$의 급수에는 계승이 없습니다. 계수는 $t^n$의 1입니다.'], [R.F(-Math.pow(m, k)), '부호를 확인하십시오. $t=' + mx(m) + '$일 때 $t^{' + k + '}=(' + mx(m) + ')^{' + k + '}$입니다.'], [R.F(1), '$t=' + mx(m) + '$에서 $' + R.fmt.paren(m) + '^{' + k + '}$을 곱하지 않았습니다.']];
          } else {
            k = R.int(2, 4);
            var sl = k % 2 === 1 ? 1 : -1;
            ans = R.F(sl * Math.pow(m, k), k);
            f = '\\ln(1' + (m > 0 ? '+' + mx(m) : '-' + mx(-m)) + ')';
            form = '\\ln(1+t)=t-\\dfrac{t^2}{2}+\\dfrac{t^3}{3}-\\cdots';
            tc = R.F(sl, k);
            wrongs = [[R.F(sl * Math.pow(m, k), fact(k)), '$\\ln(1+t)$의 급수는 $n!$이 아니라 $n$으로 나눕니다.'], [ans.neg(), '부호를 확인하십시오. $\\ln(1+t)$의 급수는 $+,-,+,\\cdots$이고 $' + R.fmt.paren(m) + '^{' + k + '}$의 부호도 함께 봅니다.'], [R.F(sl, k), '$t=' + mx(m) + '$' + R.josa('x', '을/를') + ' 넣었으므로 $' + R.fmt.paren(m) + '^{' + k + '}$을 곱해야 합니다.']];
          }
          var wrong = [], seen = {};
          seen[ans.toString()] = true;
          wrongs.forEach(function (w) {
            var key = w[0].toString();
            if (!seen[key]) { seen[key] = true; wrong.push({ a: key, why: w[1] }); }
          });
          return {
            type: 'short', check: 'number', concept: 3,
            q: '$' + f + '$의 매클로린 급수에서 $x^{' + k + '}$의 계수를 구하십시오.',
            answer: ans.toString(),
            hint: '$' + form + '$에 $t=' + mx(m) + '$' + R.josa('x', '을/를') + ' 넣으십시오.',
            wrong: wrong,
            explain: '$' + form + '$에 $t=' + mx(m) + '$' + R.josa('x', '을/를') + ' 넣으면 $x^{' + k + '}$항은 $t^{' + k + '}$항에서 나옵니다. $t^{' + k + '}$의 계수는 $' + R.fmt.frac(tc) + '$이고 $(' + mx(m) + ')^{' + k + '}=' + (Math.pow(m, k) === 1 ? '' : (Math.pow(m, k) === -1 ? '-' : Math.pow(m, k))) + 'x^{' + k + '}$이므로 계수는 $' + R.fmt.frac(tc) + '\\times' + R.fmt.paren(Math.pow(m, k)) + '=' + R.fmt.frac(ans) + '$입니다.',
          };
        },
      },
      {
        id: 'series-limit',
        level: 2,
        title: '급수를 이용한 극한',
        make: function (R) {
          var m = R.int(1, 5);
          var kind = R.int(0, 4);
          var M = m === 1 ? '' : String(m);
          var num, k, ans, expand, wrongs;
          if (kind === 0) {
            num = 'e^{' + M + 'x}-1-' + M + 'x';
            k = 2; ans = R.F(m * m, 2);
            expand = 'e^{' + M + 'x}=1+' + M + 'x+\\dfrac{(' + M + 'x)^2}{2!}+\\cdots';
            wrongs = [[R.F(m * m), '$2!$로 나누는 것을 빠뜨렸습니다.'], [R.F(m, 2), '$(' + M + 'x)^2$에서 $' + m + '$도 제곱해야 합니다.']];
          } else if (kind === 1) {
            num = '1-\\cos ' + M + 'x';
            k = 2; ans = R.F(m * m, 2);
            expand = '\\cos ' + M + 'x=1-\\dfrac{(' + M + 'x)^2}{2!}+\\cdots';
            wrongs = [[R.F(-m * m, 2), '부호를 확인하십시오. $1-\\cos ' + M + 'x=\\dfrac{(' + M + 'x)^2}{2}-\\cdots$입니다.'], [R.F(m * m), '$2!$로 나누는 것을 빠뜨렸습니다.'], [R.F(m, 2), '$(' + M + 'x)^2$에서 $' + m + '$도 제곱해야 합니다.']];
          } else if (kind === 2) {
            num = '\\sin ' + M + 'x-' + M + 'x';
            k = 3; ans = R.F(-m * m * m, 6);
            expand = '\\sin ' + M + 'x=' + M + 'x-\\dfrac{(' + M + 'x)^3}{3!}+\\cdots';
            wrongs = [[R.F(m * m * m, 6), '부호를 확인하십시오. $\\sin t-t=-\\dfrac{t^3}{6}+\\cdots$입니다.'], [R.F(-m * m * m, 3), '$3!=6$이 아니라 3으로 나누었습니다.'], [R.F(-m, 6), '$(' + M + 'x)^3$에서 $' + m + '$도 세제곱해야 합니다.']];
          } else if (kind === 3) {
            num = '\\ln(1+' + M + 'x)-' + M + 'x';
            k = 2; ans = R.F(-m * m, 2);
            expand = '\\ln(1+' + M + 'x)=' + M + 'x-\\dfrac{(' + M + 'x)^2}{2}+\\cdots';
            wrongs = [[R.F(m * m, 2), '부호를 확인하십시오. $\\ln(1+t)=t-\\dfrac{t^2}{2}+\\cdots$입니다.'], [R.F(-m * m), '2로 나누는 것을 빠뜨렸습니다.'], [R.F(-m, 2), '$(' + M + 'x)^2$에서 $' + m + '$도 제곱해야 합니다.']];
          } else {
            num = '\\cos ' + M + 'x-1+\\dfrac{' + (m * m === 1 ? '' : m * m) + 'x^{2}}{2}';
            k = 4; ans = R.F(Math.pow(m, 4), 24);
            expand = '\\cos ' + M + 'x=1-\\dfrac{(' + M + 'x)^2}{2!}+\\dfrac{(' + M + 'x)^4}{4!}-\\cdots';
            wrongs = [[R.F(-Math.pow(m, 4), 24), '부호를 확인하십시오. $\\cos t$의 $t^4$항은 $+\\dfrac{t^4}{4!}$입니다.'], [R.F(Math.pow(m, 4), 4), '$4!=24$가 아니라 4로 나누었습니다.'], [R.F(m, 24), '$(' + M + 'x)^4$에서 $' + m + '$도 네제곱해야 합니다.']];
          }
          if (m === 1) num = num.replace(/\(1\+x\)/, '(1+x)');
          var wrong = [], seen = {};
          seen[ans.toString()] = true;
          wrongs.forEach(function (w) {
            var key = w[0].toString();
            if (!seen[key]) { seen[key] = true; wrong.push({ a: key, why: w[1] }); }
          });
          var expandShow = m === 1 ? expand.replace(/\(x\)/g, 'x') : expand;
          return {
            type: 'short', check: 'number', concept: 5,
            q: '급수를 이용하여 다음 극한값을 구하십시오.\n\n$\\lim_{x\\to 0}\\dfrac{' + num + '}{x^{' + k + '}}$',
            answer: ans.toString(),
            hint: '분자를 급수로 바꾸어 가장 낮은 차수의 항을 찾으십시오.',
            wrong: wrong,
            explain: '$' + expandShow + '$이므로 분자의 가장 낮은 차수 항은 $' + R.fmt.frac(ans) + 'x^{' + k + '}$입니다.\n\n' +
              '$x^{' + k + '}$으로 나누면 상수항 $' + R.fmt.frac(ans) + '$만 남고 나머지 항은 0으로 가므로 극한값은 $' + R.fmt.frac(ans) + '$입니다.',
          };
        },
      },
    ],
  });
})();
