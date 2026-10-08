/* 미적분학 · 이상적분과 적분의 응용
 * 무한 구간·발산하는 피적분함수의 이상적분, 비교 판정법, 회전체의 부피(원판법·와셔법·원통껍질법), 곡선의 길이와 회전체의 겉넓이. */
(function () {
  // 계수 c 와 본체 → TeX (c=1 이면 생략)
  function cx(c, body) { return (c === 1 ? '' : String(c)) + body; }
  // (양의 Frac 계수) × x^p → TeX. 약분된 꼴로 (예: 9/3 → 3x³, 1/5 → x⁵/5)
  function fx(fr, p) {
    var xp = 'x^{' + p + '}';
    if (fr.isInt()) return (fr.num === 1 ? '' : String(fr.num)) + xp;
    if (fr.num === 1) return '\\dfrac{' + xp + '}{' + fr.den + '}';
    return '\\dfrac{' + fr.num + '}{' + fr.den + '}' + xp;
  }
  // 수렴·발산 판단을 묻는 보기에서 쓰는 '거듭제곱 x^p' 글자 (p 는 Frac)
  function texPow(p) {
    if (p.isInt()) return p.eq(1) ? 'x' : 'x^{' + p.num + '}';
    return 'x^{' + p.num + '/' + p.den + '}';
  }

  Tutor.registerUnit({
    id: 'math-u-calc-06',
    course: 'math-u-calc',
    title: '이상적분과 적분의 응용',
    summary: '적분 구간이 무한하거나 피적분함수가 발산하는 이상적분을 극한으로 정의하고 수렴을 판정하며, 회전체의 부피·곡선의 길이·회전체의 겉넓이를 적분으로 구합니다.',
    goals: [
      '적분 구간이 무한하거나 피적분함수가 발산하는 이상적분을 극한으로 계산할 수 있다.',
      'p-적분과 비교 판정법으로 이상적분의 수렴과 발산을 판정할 수 있다.',
      '원판법·와셔법·원통껍질법으로 회전체의 부피를 구할 수 있다.',
      '곡선의 길이와 회전체의 겉넓이를 적분으로 나타내고 계산할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '적분 구간이 무한한 이상적분',
        body: '정적분은 유한한 구간에서 정의했습니다. 구간이 무한하면 극한으로 정의하고, 이것을 **이상적분**이라 합니다.\n\n' +
          '$\\int_{a}^{\\infty}f(x)\\,dx=\\lim_{t\\to\\infty}\\int_{a}^{t}f(x)\\,dx$\n\n' +
          '극한이 실수로 존재하면 **수렴**한다고 하고 그 값을 적분값으로 삼으며, 그렇지 않으면 **발산**한다고 합니다. $\\int_{-\\infty}^{b}$도 같은 방법으로 정의하고, $\\int_{-\\infty}^{\\infty}f(x)\\,dx$는 한 점 $c$에서 나눈 $\\int_{-\\infty}^{c}f(x)\\,dx$와 $\\int_{c}^{\\infty}f(x)\\,dx$가 **둘 다** 수렴할 때만 수렴합니다.\n\n' +
          '**p-적분** 가장 중요한 기준입니다.\n\n' +
          '$\\int_{1}^{\\infty}\\dfrac{1}{x^p}\\,dx=\\begin{cases}\\dfrac{1}{p-1} & (p>1)\\\\ \\text{발산} & (p\\le 1)\\end{cases}$\n\n' +
          '$p\\ne 1$이면 $\\int_{1}^{t}x^{-p}\\,dx=\\dfrac{t^{1-p}-1}{1-p}$이고, $p>1$일 때 $t^{1-p}\\to 0$이므로 $\\dfrac{1}{p-1}$, $p<1$이면 $\\infty$입니다. $p=1$이면 $\\ln t\\to\\infty$입니다.\n\n' +
          '- $\\int_{0}^{\\infty}e^{-x}\\,dx=\\lim_{t\\to\\infty}(1-e^{-t})=1$\n' +
          '- $\\int_{-\\infty}^{\\infty}\\dfrac{dx}{1+x^2}=\\lim_{s\\to-\\infty}(0-\\arctan s)+\\lim_{t\\to\\infty}(\\arctan t-0)=\\dfrac{\\pi}{2}+\\dfrac{\\pi}{2}=\\pi$',
        easy: '그림에서 $y=\\dfrac{1}{x^2}$과 $y=\\dfrac{1}{x}$은 둘 다 오른쪽으로 갈수록 0에 가까워집니다. 그런데 아래 넓이는 다릅니다. $\\dfrac{1}{x^2}$은 빨리 줄어들어 넓이가 1에서 멈추지만, $\\dfrac{1}{x}$은 천천히 줄어들어 넓이가 끝없이 커집니다.\n\n' +
          '"끝없는 구간의 넓이"는 끝을 $t$로 잘라 넓이를 구한 뒤 $t$를 한없이 키워 보는 것입니다. 넓이가 어떤 값에 다가가면 수렴, 한없이 커지면 발산입니다.',
        fig: {
          type: 'coord', xmin: 0, xmax: 6, ymin: 0, ymax: 1.6,
          fns: [{ expr: '1/x^2', from: 0.8, to: 6, label: 'y=1/x²' }, { expr: '1/x', from: 0.7, to: 6, label: 'y=1/x' }],
          segments: [{ from: [1, 0], to: [1, 1], dashed: true }],
          alt: 'x=1부터 오른쪽으로 y=1/x²과 y=1/x의 그래프. 둘 다 0에 가까워지지만 1/x²이 더 빨리 줄어든다',
        },
        check: {
          type: 'short', check: 'number',
          q: '다음 이상적분의 값을 구하십시오.\n\n$\\int_{1}^{\\infty}\\dfrac{1}{x^3}\\,dx$',
          answer: '1/2',
          wrong: [
            { a: '1/4', why: '지수를 하나 올리지 않고 내렸습니다. $x^{-3}$의 원시함수는 $\\dfrac{x^{-2}}{-2}$입니다.' },
            { a: '-1/2', why: '부호를 확인하십시오. $\\left[-\\dfrac{1}{2x^2}\\right]_{1}^{t}=-\\dfrac{1}{2t^2}+\\dfrac{1}{2}$입니다.' },
          ],
          explain: '$\\int_{1}^{t}x^{-3}\\,dx=\\left[-\\dfrac{1}{2x^2}\\right]_{1}^{t}=\\dfrac{1}{2}-\\dfrac{1}{2t^2}\\to\\dfrac{1}{2}$ $(t\\to\\infty)$입니다. p-적분 공식 $\\dfrac{1}{p-1}$에 $p=3$을 넣은 것과 같습니다.',
        },
      },
      {
        title: '피적분함수가 발산하는 이상적분',
        body: '$f$가 $(a,b]$에서 연속이고 $x\\to a^{+}$일 때 한없이 커지면, 위험한 끝을 피해서 적분한 뒤 극한을 취합니다.\n\n' +
          '$\\int_{a}^{b}f(x)\\,dx=\\lim_{t\\to a^{+}}\\int_{t}^{b}f(x)\\,dx$\n\n' +
          '오른쪽 끝에서 발산하면 $\\lim_{t\\to b^{-}}\\int_{a}^{t}f(x)\\,dx$로, 구간 **안쪽** 점 $c$에서 발산하면 $\\int_{a}^{c}f(x)\\,dx$와 $\\int_{c}^{b}f(x)\\,dx$로 나누어 둘 다 수렴해야 수렴합니다.\n\n' +
          '$\\int_{0}^{1}\\dfrac{1}{x^p}\\,dx=\\begin{cases}\\dfrac{1}{1-p} & (p<1)\\\\ \\text{발산} & (p\\ge 1)\\end{cases}$\n\n' +
          '무한 구간일 때와 **부등호 방향이 반대**입니다. 0 근처에서는 $p$가 작을수록 덜 가파르게 솟아 넓이가 유한합니다.\n\n' +
          '예: $\\int_{0}^{1}\\ln x\\,dx=\\lim_{t\\to 0^{+}}\\left[x\\ln x-x\\right]_{t}^{1}=-1-\\lim_{t\\to 0^{+}}(t\\ln t-t)=-1$ (로피탈 정리로 $t\\ln t\\to 0$)\n\n' +
          '> ⚠️ $\\int_{-1}^{1}\\dfrac{1}{x^2}\\,dx$를 $\\left[-\\dfrac{1}{x}\\right]_{-1}^{1}=-2$로 계산하면 틀립니다. 양수 함수의 적분이 음수일 수는 없습니다. $x=0$에서 발산하므로 나누어 보면 $\\int_{0}^{1}\\dfrac{1}{x^2}\\,dx$가 발산하여 전체가 발산합니다.',
        easy: '$y=\\dfrac{1}{\\sqrt{x}}$은 $x=0$ 근처에서 한없이 높아지는 "기둥"이지만 아주 가늘어서 넓이는 유한합니다($\\int_{0}^{1}=2$). $y=\\dfrac{1}{x}$은 그보다 굵게 솟아 넓이가 무한합니다.\n\n' +
          '계산은 무한 구간 때와 같습니다. 문제가 되는 끝을 $t$로 바꾸어 보통의 정적분을 구하고, $t$를 그 끝으로 보냅니다. 적분 구간 **한가운데**에 문제가 되는 점이 숨어 있지 않은지 먼저 살피는 습관이 중요합니다.',
        check: {
          type: 'ox',
          q: '$\\int_{-1}^{1}\\dfrac{1}{x^2}\\,dx=-2$입니다.',
          answer: false,
          explain: '$\\dfrac{1}{x^2}$은 $x=0$에서 정의되지 않고 한없이 커지므로 미적분학의 기본정리를 바로 쓸 수 없습니다. $\\int_{0}^{1}\\dfrac{1}{x^2}\\,dx=\\lim_{t\\to 0^{+}}\\left(\\dfrac{1}{t}-1\\right)=\\infty$이므로 이 이상적분은 발산합니다.',
        },
      },
      {
        title: '비교 판정법',
        body: '적분을 정확히 계산할 수 없어도 수렴 여부는 알 수 있습니다. $x\\ge a$에서 $0\\le f(x)\\le g(x)$이면\n\n' +
          '- $\\int_{a}^{\\infty}g(x)\\,dx$가 수렴하면 $\\int_{a}^{\\infty}f(x)\\,dx$도 수렴합니다. (큰 쪽이 유한하면 작은 쪽도 유한)\n' +
          '- $\\int_{a}^{\\infty}f(x)\\,dx$가 발산하면 $\\int_{a}^{\\infty}g(x)\\,dx$도 발산합니다. (작은 쪽이 무한하면 큰 쪽도 무한)\n\n' +
          '예: $x\\ge 1$에서 $x^2\\ge x$이므로 $0<e^{-x^2}\\le e^{-x}$이고 $\\int_{1}^{\\infty}e^{-x}\\,dx$가 수렴하므로 $\\int_{1}^{\\infty}e^{-x^2}\\,dx$도 수렴합니다.\n\n' +
          '예: $\\dfrac{2+\\sin x}{\\sqrt{x}}\\ge\\dfrac{1}{\\sqrt{x}}$이고 $\\int_{1}^{\\infty}\\dfrac{dx}{\\sqrt{x}}$가 발산($p=\\dfrac{1}{2}\\le 1$)하므로 $\\int_{1}^{\\infty}\\dfrac{2+\\sin x}{\\sqrt{x}}\\,dx$도 발산합니다.\n\n' +
          '**극한 비교 판정법** $f,g>0$이고 $\\lim_{x\\to\\infty}\\dfrac{f(x)}{g(x)}=L$ $(0<L<\\infty)$이면 두 이상적분은 함께 수렴하거나 함께 발산합니다. 유리식은 최고차항끼리의 비로 비교할 $\\dfrac{1}{x^p}$을 찾습니다. 예: $\\dfrac{x+1}{x^3+2}$은 $\\dfrac{1}{x^2}$처럼 행동하므로 $\\int_{1}^{\\infty}\\dfrac{x+1}{x^3+2}\\,dx$가 수렴합니다.\n\n' +
          '> ⚠️ "작은 쪽이 수렴"이나 "큰 쪽이 발산"으로는 아무것도 알 수 없습니다.',
        easy: '두 그릇에 물을 붓는다고 생각해 보십시오. 큰 그릇에 담긴 물이 유한하면 그보다 작은 그릇의 물도 유한합니다. 작은 그릇의 물이 끝없이 많다면 큰 그릇의 물도 끝없이 많습니다.\n\n' +
          '그래서 수렴을 보이려면 **더 큰** 수렴하는 함수를, 발산을 보이려면 **더 작은** 발산하는 함수를 찾아야 합니다. 비교 대상으로는 결과를 이미 아는 $\\dfrac{1}{x^p}$과 $e^{-x}$을 주로 씁니다.',
        check: {
          type: 'choice',
          q: '$\\int_{1}^{\\infty}\\dfrac{dx}{x^3+1}$의 수렴 여부를 바르게 판정한 것은 무엇입니까?',
          choices: [
            '$\\dfrac{1}{x^3+1}\\le\\dfrac{1}{x^3}$이고 $\\int_{1}^{\\infty}\\dfrac{dx}{x^3}$가 수렴하므로 수렴한다',
            '$\\dfrac{1}{x^3+1}\\le\\dfrac{1}{x}$이고 $\\int_{1}^{\\infty}\\dfrac{dx}{x}$가 발산하므로 발산한다',
            '$x\\to\\infty$일 때 $\\dfrac{1}{x^3+1}\\to 0$이므로 수렴한다',
          ],
          answer: 0,
          why: [
            '',
            '발산하는 함수보다 **작다**는 것으로는 아무것도 알 수 없습니다. 발산을 보이려면 더 작은 발산 함수가 필요합니다.',
            '결론은 맞지만 이유가 틀립니다. $\\dfrac{1}{x}\\to 0$이어도 $\\int_{1}^{\\infty}\\dfrac{dx}{x}$는 발산합니다.',
          ],
          explain: '$x\\ge 1$에서 $0<\\dfrac{1}{x^3+1}\\le\\dfrac{1}{x^3}$이고 $p=3>1$이므로 $\\int_{1}^{\\infty}\\dfrac{dx}{x^3}$가 수렴합니다. 비교 판정법에 따라 주어진 적분도 수렴합니다.',
        },
      },
      {
        title: '회전체의 부피: 원판법과 와셔법',
        body: '$y=f(x)\\ge 0$ $(a\\le x\\le b)$의 그래프와 $x$축 사이의 영역을 $x$축 둘레로 돌리면, $x$에서 자른 단면은 반지름 $f(x)$인 원(**원판**)입니다. 단면의 넓이 $\\pi f(x)^2$을 적분하면\n\n' +
          '$V=\\pi\\int_{a}^{b}f(x)^2\\,dx$\n\n' +
          '두 곡선 $y=f(x)$(바깥), $y=g(x)$(안쪽) $(0\\le g\\le f)$ 사이의 영역을 돌리면 단면은 가운데가 뚫린 원(**와셔**)이므로\n\n' +
          '$V=\\pi\\int_{a}^{b}\\left(f(x)^2-g(x)^2\\right)dx$\n\n' +
          '예: $y=\\sqrt{x}$ $(0\\le x\\le 4)$를 $x$축 둘레로 돌리면 $V=\\pi\\int_{0}^{4}x\\,dx=8\\pi$입니다.\n\n' +
          '예: $y=x$와 $y=x^2$ $(0\\le x\\le 1)$ 사이의 영역을 $x$축 둘레로 돌리면 $V=\\pi\\int_{0}^{1}(x^2-x^4)\\,dx=\\pi\\left(\\dfrac{1}{3}-\\dfrac{1}{5}\\right)=\\dfrac{2\\pi}{15}$입니다.\n\n' +
          '> ⚠️ 와셔의 넓이는 $\\pi(R^2-r^2)$입니다. $\\pi(R-r)^2$이 아닙니다.',
        easy: '오이를 얇게 썬 조각을 떠올려 보십시오. 조각 하나는 두께가 $dx$인 동전 모양이고, 부피는 (원의 넓이)×(두께) $=\\pi f(x)^2\\,dx$입니다. 오이 전체의 부피는 이 조각들을 모두 더한 것, 곧 적분입니다.\n\n' +
          '가운데가 빈 파이프라면 조각이 반지 모양입니다. 큰 원의 넓이에서 작은 원의 넓이를 빼면 됩니다.',
        fig: {
          type: 'coord', xmin: -0.5, xmax: 4.5, ymin: -2.5, ymax: 2.5,
          fns: [{ expr: 'sqrt(x)', from: 0, to: 4, label: 'y=√x' }, { expr: '-sqrt(x)', from: 0, to: 4 }],
          segments: [{ from: [2, -1.414], to: [2, 1.414] }, { from: [4, -2], to: [4, 2], dashed: true }],
          alt: 'y=√x와 그 대칭인 y=−√x의 그래프. x=2에서 자른 단면은 반지름 √2인 원판이다',
        },
        check: {
          type: 'short', check: 'number',
          q: '직선 $y=x$ $(0\\le x\\le 3)$와 $x$축 사이의 영역을 $x$축 둘레로 돌린 회전체(원뿔)의 부피를 $V=k\\pi$라 할 때, $k$의 값을 구하십시오.',
          answer: '9',
          wrong: [
            { a: '9/2', why: '$f(x)$를 제곱하지 않았습니다. 단면의 넓이는 $\\pi f(x)^2=\\pi x^2$입니다.' },
            { a: '27', why: '$x^2$의 원시함수 $\\dfrac{x^3}{3}$에서 3으로 나누는 것을 빠뜨렸습니다.' },
          ],
          explain: '$V=\\pi\\int_{0}^{3}x^2\\,dx=\\pi\\left[\\dfrac{x^3}{3}\\right]_{0}^{3}=9\\pi$이므로 $k=9$입니다. 원뿔 공식 $\\dfrac{1}{3}\\pi r^2h=\\dfrac{1}{3}\\pi\\cdot 9\\cdot 3=9\\pi$와 같습니다.',
        },
      },
      {
        title: '회전체의 부피: 원통껍질법',
        body: '$y=f(x)\\ge 0$ $(0\\le a\\le x\\le b)$ 아래 영역을 **$y$축** 둘레로 돌릴 때, 원판법을 쓰려면 $x$를 $y$의 식으로 풀어야 해서 어려울 때가 많습니다. 이때는 $x$에서 세운 폭 $dx$의 가는 띠를 돌려 생기는 얇은 원통(**원통껍질**)을 더합니다.\n\n' +
          '껍질을 펼치면 가로 $2\\pi x$(둘레), 세로 $f(x)$(높이), 두께 $dx$인 얇은 판이므로 부피는 $2\\pi x f(x)\\,dx$입니다.\n\n' +
          '$V=2\\pi\\int_{a}^{b}x f(x)\\,dx$\n\n' +
          '예: $y=2x-x^2$ $(0\\le x\\le 2)$과 $x$축 사이의 영역을 $y$축 둘레로 돌리면\n\n' +
          '$V=2\\pi\\int_{0}^{2}x(2x-x^2)\\,dx=2\\pi\\left[\\dfrac{2x^3}{3}-\\dfrac{x^4}{4}\\right]_{0}^{2}=2\\pi\\left(\\dfrac{16}{3}-4\\right)=\\dfrac{8\\pi}{3}$\n\n' +
          '> 💡 회전축과 **평행**하게 자르면 원통껍질법, **수직**으로 자르면 원판법입니다. 자르는 방향에 따라 적분 변수가 정해집니다.',
        easy: '양파나 나무의 나이테처럼, 회전체를 속이 빈 원통 여러 겹으로 나누어 생각합니다. 반지름 $x$인 껍질 하나를 세로로 잘라 펼치면 가로 $2\\pi x$, 세로 $f(x)$, 두께 $dx$인 얇은 종이가 됩니다.\n\n' +
          '그 종이의 부피 $2\\pi x f(x)\\,dx$를 안쪽 껍질부터 바깥 껍질까지 모두 더하면 전체 부피입니다.',
        fig: {
          type: 'coord', xmin: -2.5, xmax: 2.5, ymin: -0.5, ymax: 1.5,
          fns: [{ expr: '2x-x^2', from: 0, to: 2, label: 'y=2x−x²' }, { expr: '-2x-x^2', from: -2, to: 0 }],
          segments: [{ from: [1.2, 0], to: [1.2, 0.96] }, { from: [-1.2, 0], to: [-1.2, 0.96], dashed: true }],
          alt: 'y=2x−x²의 그래프와 y축에 대칭인 모양. x=1.2의 세로 띠를 y축 둘레로 돌리면 반지름 1.2인 원통껍질이 된다',
        },
        check: {
          type: 'choice',
          q: '$y=f(x)\\ge 0$ $(0\\le a\\le x\\le b)$ 아래 영역을 $y$축 둘레로 돌린 회전체의 부피를 원통껍질법으로 나타낸 것은 무엇입니까?',
          choices: ['$\\pi\\int_{a}^{b}f(x)^2\\,dx$', '$2\\pi\\int_{a}^{b}x f(x)\\,dx$', '$2\\pi\\int_{a}^{b}f(x)\\,dx$'],
          answer: 1,
          why: [
            '$x$축 둘레로 돌릴 때의 원판법입니다.',
            '',
            '껍질의 둘레 $2\\pi x$에서 반지름 $x$를 빠뜨렸습니다.',
          ],
          explain: '반지름 $x$, 높이 $f(x)$, 두께 $dx$인 원통껍질의 부피는 $2\\pi x f(x)\\,dx$이므로 $V=2\\pi\\int_{a}^{b}x f(x)\\,dx$입니다.',
        },
      },
      {
        title: '곡선의 길이와 회전체의 겉넓이',
        body: '곡선 $y=f(x)$ $(a\\le x\\le b)$를 짧은 선분들로 나누면, 한 조각의 길이는 피타고라스 정리로 $\\sqrt{(\\Delta x)^2+(\\Delta y)^2}=\\sqrt{1+\\left(\\dfrac{\\Delta y}{\\Delta x}\\right)^2}\\,\\Delta x$입니다. 조각을 한없이 잘게 하면 ($f\'$이 연속일 때)\n\n' +
          '$L=\\int_{a}^{b}\\sqrt{1+f\'(x)^2}\\,dx$\n\n' +
          '예: $y=\\dfrac{2}{3}x^{3/2}$ $(0\\le x\\le 3)$이면 $f\'(x)=\\sqrt{x}$이므로 $L=\\int_{0}^{3}\\sqrt{1+x}\\,dx=\\left[\\dfrac{2}{3}(1+x)^{3/2}\\right]_{0}^{3}=\\dfrac{2}{3}(8-1)=\\dfrac{14}{3}$\n\n' +
          '**회전체의 겉넓이** $f(x)\\ge 0$인 곡선을 $x$축 둘레로 돌리면, 길이 $ds=\\sqrt{1+f\'(x)^2}\\,dx$인 조각이 반지름 $f(x)$인 띠를 만듭니다. 띠의 넓이는 (둘레)×(폭) $=2\\pi f(x)\\,ds$이므로\n\n' +
          '$S=2\\pi\\int_{a}^{b}f(x)\\sqrt{1+f\'(x)^2}\\,dx$\n\n' +
          '예: 반원 $y=\\sqrt{r^2-x^2}$은 $f(x)\\sqrt{1+f\'(x)^2}=r$이 되어 $S=2\\pi\\int_{-r}^{r}r\\,dx=4\\pi r^2$, 곧 구의 겉넓이입니다.\n\n' +
          '> 💡 근호 안이 완전제곱식이 되도록 만든 곡선($y=\\dfrac{x^3}{6}+\\dfrac{1}{2x}$ 등)이 아니면 길이 적분은 손으로 계산하기 어려워 수치적분을 씁니다.',
        easy: '곡선 위를 개미가 걷는다고 생각하십시오. 아주 짧은 순간에 옆으로 $dx$, 위로 $dy$만큼 가면 실제로 걸은 거리는 직각삼각형의 빗변 $\\sqrt{dx^2+dy^2}$입니다. $dy=f\'(x)\\,dx$를 넣으면 $\\sqrt{1+f\'(x)^2}\\,dx$가 되고, 이것을 처음부터 끝까지 더한 것이 곡선의 길이입니다.\n\n' +
          '겉넓이는 이 짧은 조각을 축 둘레로 돌려 생긴 가는 리본의 넓이(둘레 $2\\pi f(x)$ × 폭 $ds$)를 모두 더한 것입니다.',
        check: {
          type: 'short', check: 'number',
          q: '곡선 $y=\\dfrac{2}{3}x^{3/2}$ $(0\\le x\\le 8)$의 길이를 구하십시오.',
          answer: '52/3',
          wrong: [
            { a: '18', why: '아래끝 $x=0$에서의 값 $\\dfrac{2}{3}\\cdot 1^{3/2}=\\dfrac{2}{3}$를 빼지 않았습니다.' },
            { a: '26', why: '$\\sqrt{1+x}$의 원시함수 $\\dfrac{2}{3}(1+x)^{3/2}$에서 $\\dfrac{2}{3}$를 빠뜨렸습니다.' },
          ],
          explain: '$f\'(x)=\\sqrt{x}$이므로 $L=\\int_{0}^{8}\\sqrt{1+x}\\,dx=\\left[\\dfrac{2}{3}(1+x)^{3/2}\\right]_{0}^{8}=\\dfrac{2}{3}(27-1)=\\dfrac{52}{3}$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '이상적분 $\\int_{1}^{\\infty}\\dfrac{\\ln x}{x^2}\\,dx$의 값을 구하십시오.',
        steps: [
          '$\\int_{1}^{t}\\dfrac{\\ln x}{x^2}\\,dx$를 먼저 구합니다. $u=\\ln x$, $dv=x^{-2}dx$로 부분적분하면 $du=\\dfrac{dx}{x}$, $v=-\\dfrac{1}{x}$입니다.',
          '$\\int\\dfrac{\\ln x}{x^2}\\,dx=-\\dfrac{\\ln x}{x}+\\int\\dfrac{1}{x^2}\\,dx=-\\dfrac{\\ln x}{x}-\\dfrac{1}{x}+C$',
          '$\\int_{1}^{t}\\dfrac{\\ln x}{x^2}\\,dx=\\left(-\\dfrac{\\ln t}{t}-\\dfrac{1}{t}\\right)-(0-1)=1-\\dfrac{\\ln t}{t}-\\dfrac{1}{t}$',
          '로피탈 정리로 $\\lim_{t\\to\\infty}\\dfrac{\\ln t}{t}=\\lim_{t\\to\\infty}\\dfrac{1/t}{1}=0$이므로 극한은 1입니다. 이상적분은 수렴하고 값은 1입니다.',
        ],
        answer: '$1$',
      },
      {
        q: '$y=\\sqrt{x}$와 $y=x$ $(0\\le x\\le 1)$ 사이의 영역을 $x$축 둘레로 돌린 회전체의 부피를 구하십시오.',
        steps: [
          '$0\\le x\\le 1$에서 $\\sqrt{x}\\ge x$이므로 바깥 반지름은 $\\sqrt{x}$, 안쪽 반지름은 $x$입니다.',
          '와셔법: $V=\\pi\\int_{0}^{1}\\left((\\sqrt{x})^2-x^2\\right)dx=\\pi\\int_{0}^{1}(x-x^2)\\,dx$',
          '$=\\pi\\left(\\dfrac{1}{2}-\\dfrac{1}{3}\\right)=\\dfrac{\\pi}{6}$입니다.',
        ],
        answer: '$\\dfrac{\\pi}{6}$',
      },
      {
        q: '곡선 $y=\\dfrac{x^3}{6}+\\dfrac{1}{2x}$ $(1\\le x\\le 2)$의 길이를 구하십시오.',
        steps: [
          '$f\'(x)=\\dfrac{x^2}{2}-\\dfrac{1}{2x^2}$이므로 $1+f\'(x)^2=1+\\dfrac{x^4}{4}-\\dfrac{1}{2}+\\dfrac{1}{4x^4}=\\left(\\dfrac{x^2}{2}+\\dfrac{1}{2x^2}\\right)^2$입니다.',
          '$L=\\int_{1}^{2}\\left(\\dfrac{x^2}{2}+\\dfrac{1}{2x^2}\\right)dx=\\left[\\dfrac{x^3}{6}-\\dfrac{1}{2x}\\right]_{1}^{2}$',
          '$=\\left(\\dfrac{8}{6}-\\dfrac{1}{4}\\right)-\\left(\\dfrac{1}{6}-\\dfrac{1}{2}\\right)=\\dfrac{13}{12}+\\dfrac{1}{3}=\\dfrac{17}{12}$입니다.',
        ],
        answer: '$\\dfrac{17}{12}$',
      },
    ],

    terms: [
      { term: '이상적분', def: '적분 구간이 무한하거나 피적분함수가 구간에서 한없이 커질 때, 보통의 정적분의 극한으로 정의한 적분입니다.' },
      { term: '이상적분의 수렴', def: '이상적분을 정의하는 극한이 실수로 존재하는 것입니다. 극한이 없거나 무한대이면 발산한다고 합니다.' },
      { term: 'p-적분', def: '$\\int_{1}^{\\infty}\\dfrac{dx}{x^p}$는 $p>1$일 때, $\\int_{0}^{1}\\dfrac{dx}{x^p}$는 $p<1$일 때 수렴합니다. 다른 이상적분과 비교하는 기준으로 씁니다.' },
      { term: '비교 판정법', def: '$0\\le f\\le g$일 때 $\\int g$가 수렴하면 $\\int f$도 수렴하고, $\\int f$가 발산하면 $\\int g$도 발산한다는 판정법입니다.' },
      { term: '원판법', def: '회전축에 수직으로 자른 단면(원)의 넓이 $\\pi f(x)^2$을 적분하여 회전체의 부피를 구하는 방법입니다. 가운데가 빈 경우는 와셔법이라 합니다.' },
      { term: '원통껍질법', def: '회전축과 평행한 띠를 돌려 생긴 얇은 원통의 부피 $2\\pi x f(x)\\,dx$를 적분하여 부피를 구하는 방법입니다.' },
      { term: '곡선의 길이', def: '$y=f(x)$ $(a\\le x\\le b)$의 길이는 $L=\\int_{a}^{b}\\sqrt{1+f\'(x)^2}\\,dx$입니다.' },
      { term: '회전체의 겉넓이', def: '$y=f(x)\\ge 0$을 $x$축 둘레로 돌린 곡면의 넓이는 $S=2\\pi\\int_{a}^{b}f(x)\\sqrt{1+f\'(x)^2}\\,dx$입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '다음 이상적분의 값을 구하십시오.\n\n$\\int_{1}^{\\infty}\\dfrac{1}{x^4}\\,dx$',
        answer: '1/3',
        wrong: [
          { a: '1/5', why: '원시함수를 $\\dfrac{x^{-5}}{-5}$처럼 지수를 내려 잡았습니다. $x^{-4}$의 원시함수는 $\\dfrac{x^{-3}}{-3}$입니다.' },
          { a: '-1/3', why: '아래끝의 값을 빼는 부호를 확인하십시오. $0-\\left(-\\dfrac{1}{3}\\right)=\\dfrac{1}{3}$입니다.' },
        ],
        explain: '$\\int_{1}^{t}x^{-4}\\,dx=\\left[-\\dfrac{1}{3x^3}\\right]_{1}^{t}=\\dfrac{1}{3}-\\dfrac{1}{3t^3}\\to\\dfrac{1}{3}$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 0,
        q: '다음 이상적분 가운데 **수렴하는** 것은 무엇입니까?',
        choices: [
          '$\\int_{1}^{\\infty}\\dfrac{dx}{\\sqrt{x}}$',
          '$\\int_{1}^{\\infty}\\dfrac{dx}{x}$',
          '$\\int_{1}^{\\infty}\\dfrac{dx}{x\\sqrt{x}}$',
          '$\\int_{1}^{\\infty}\\dfrac{dx}{x^{0.9}}$',
        ],
        answer: 2,
        why: [
          '$p=\\dfrac{1}{2}\\le 1$이므로 발산합니다.',
          '$p=1$이면 $\\ln t\\to\\infty$로 발산합니다.',
          '',
          '$p=0.9$는 1에 가깝지만 1보다 작으므로 발산합니다.',
        ],
        explain: '$x\\sqrt{x}=x^{3/2}$이고 $p=\\dfrac{3}{2}>1$이므로 수렴합니다(값은 $\\dfrac{1}{p-1}=2$). 나머지는 모두 $p\\le 1$이라 발산합니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 1,
        q: '다음 이상적분의 값을 구하십시오.\n\n$\\int_{0}^{4}\\dfrac{1}{\\sqrt{x}}\\,dx$',
        answer: '4',
        wrong: [{ a: '2', why: '$x^{-1/2}$의 원시함수는 $\\dfrac{x^{1/2}}{1/2}=2\\sqrt{x}$입니다. 2를 빠뜨렸습니다.' }],
        explain: '$x=0$에서 발산하므로 $\\lim_{t\\to 0^{+}}\\int_{t}^{4}x^{-1/2}\\,dx=\\lim_{t\\to 0^{+}}\\left(2\\sqrt{4}-2\\sqrt{t}\\right)=4$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: '이상적분 $\\int_{0}^{1}\\dfrac{1}{x}\\,dx$는 수렴합니다.',
        answer: false,
        explain: '$\\int_{t}^{1}\\dfrac{1}{x}\\,dx=-\\ln t\\to\\infty$ $(t\\to 0^{+})$이므로 발산합니다. $\\int_{0}^{1}\\dfrac{dx}{x^p}$는 $p<1$일 때만 수렴하고, $p=1$은 경계로 발산합니다.',
      },
      {
        id: 'p5', level: 1, type: 'ox', concept: 0,
        q: '$\\int_{0}^{\\infty}e^{-2x}\\,dx=\\dfrac{1}{2}$입니다.',
        answer: true,
        explain: '$\\int_{0}^{t}e^{-2x}\\,dx=\\left[-\\dfrac{1}{2}e^{-2x}\\right]_{0}^{t}=\\dfrac{1}{2}-\\dfrac{1}{2}e^{-2t}\\to\\dfrac{1}{2}$이므로 맞습니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 3,
        q: '곡선 $y=x^2$ $(0\\le x\\le 1)$과 $x$축 사이의 영역을 $x$축 둘레로 돌린 회전체의 부피를 $V=k\\pi$라 할 때, $k$의 값을 구하십시오.',
        answer: '1/5',
        wrong: [{ a: '1/3', why: '$f(x)$를 제곱하지 않고 $\\pi\\int_{0}^{1}x^2\\,dx$를 계산했습니다. 단면의 넓이는 $\\pi(x^2)^2=\\pi x^4$입니다.' }],
        explain: '$V=\\pi\\int_{0}^{1}(x^2)^2\\,dx=\\pi\\int_{0}^{1}x^4\\,dx=\\dfrac{\\pi}{5}$이므로 $k=\\dfrac{1}{5}$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 4,
        q: '곡선 $y=\\sqrt{x}$ $(0\\le x\\le 4)$와 $x$축 사이의 영역을 $y$축 둘레로 돌린 회전체의 부피를 원통껍질법으로 바르게 나타낸 것은 무엇입니까?',
        choices: [
          '$\\pi\\int_{0}^{4}x\\,dx$',
          '$2\\pi\\int_{0}^{4}\\sqrt{x}\\,dx$',
          '$\\pi\\int_{0}^{4}x^2\\sqrt{x}\\,dx$',
          '$2\\pi\\int_{0}^{4}x\\sqrt{x}\\,dx$',
        ],
        answer: 3,
        why: [
          '$x$축 둘레로 돌린 원판법 $\\pi\\int f(x)^2\\,dx$입니다.',
          '껍질의 반지름 $x$를 빠뜨렸습니다.',
          '원통껍질법은 $2\\pi\\times$(반지름)$\\times$(높이)이고, 반지름을 제곱하지 않습니다.',
          '',
        ],
        explain: '반지름 $x$, 높이 $\\sqrt{x}$인 껍질이므로 $V=2\\pi\\int_{0}^{4}x\\sqrt{x}\\,dx=2\\pi\\left[\\dfrac{2}{5}x^{5/2}\\right]_{0}^{4}=2\\pi\\cdot\\dfrac{64}{5}=\\dfrac{128\\pi}{5}$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 2,
        q: '$\\int_{1}^{\\infty}\\dfrac{2+\\cos x}{x^2}\\,dx$에 대한 설명으로 옳은 것은 무엇입니까?',
        choices: [
          '$\\cos x$가 계속 진동하므로 발산한다',
          '$0<\\dfrac{2+\\cos x}{x^2}\\le\\dfrac{3}{x^2}$이므로 수렴한다',
          '$\\dfrac{2+\\cos x}{x^2}\\ge\\dfrac{1}{x^2}$이므로 수렴한다',
          '원시함수를 구할 수 없으므로 판정할 수 없다',
        ],
        answer: 1,
        why: [
          '분자는 1과 3 사이에서 움직일 뿐이고, 분모 $x^2$ 때문에 함수 전체는 빠르게 0에 가까워집니다. 진동만으로 발산하지는 않습니다.',
          '',
          '수렴하는 함수보다 **크다**는 것으로는 수렴을 알 수 없습니다.',
          '원시함수를 몰라도 비교 판정법으로 판정할 수 있습니다.',
        ],
        hint: '$-1\\le\\cos x\\le 1$을 써서 분자를 위아래로 묶어 보십시오.',
        explain: '$1\\le 2+\\cos x\\le 3$이므로 $0<\\dfrac{2+\\cos x}{x^2}\\le\\dfrac{3}{x^2}$입니다. $\\int_{1}^{\\infty}\\dfrac{3}{x^2}\\,dx=3$이 수렴하므로 비교 판정법에 따라 수렴합니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
        q: '곡선 $y=3x-x^2$ $(0\\le x\\le 3)$과 $x$축 사이의 영역을 $y$축 둘레로 돌린 회전체의 부피를 $V=k\\pi$라 할 때, $k$의 값을 구하십시오.',
        answer: '27/2',
        hint: '원통껍질법 $V=2\\pi\\int x f(x)\\,dx$를 쓰십시오.',
        wrong: [
          { a: '27/4', why: '$2\\pi$에서 2를 빠뜨렸습니다. 껍질의 둘레는 $2\\pi x$입니다.' },
          { a: '81/10', why: '$x$축 둘레로 돌린 원판법 $\\pi\\int f(x)^2\\,dx$를 계산했습니다. 회전축은 $y$축입니다.' },
          { a: '9', why: '반지름 $x$를 곱하지 않고 $2\\pi\\int_{0}^{3}(3x-x^2)\\,dx$를 계산했습니다.' },
        ],
        explain: '$V=2\\pi\\int_{0}^{3}x(3x-x^2)\\,dx=2\\pi\\left[x^3-\\dfrac{x^4}{4}\\right]_{0}^{3}=2\\pi\\left(27-\\dfrac{81}{4}\\right)=2\\pi\\cdot\\dfrac{27}{4}=\\dfrac{27\\pi}{2}$이므로 $k=\\dfrac{27}{2}$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 3,
        q: '두 곡선 $y=x$와 $y=x^2$ $(0\\le x\\le 1)$ 사이의 영역을 $x$축 둘레로 돌린 회전체의 부피를 $V=k\\pi$라 할 때, $k$의 값을 구하십시오.',
        answer: '2/15',
        hint: '$0\\le x\\le 1$에서 어느 쪽이 바깥 반지름인지 먼저 정하십시오.',
        wrong: [
          { a: '1/30', why: '반지름의 차를 제곱했습니다. 와셔의 넓이는 $\\pi(R^2-r^2)$이지 $\\pi(R-r)^2$이 아닙니다.' },
          { a: '1/6', why: '제곱하지 않고 $\\pi\\int_{0}^{1}(x-x^2)\\,dx$를 계산했습니다.' },
        ],
        explain: '$0\\le x\\le 1$에서 $x\\ge x^2$이므로 바깥 반지름 $x$, 안쪽 반지름 $x^2$입니다.\n\n$V=\\pi\\int_{0}^{1}(x^2-x^4)\\,dx=\\pi\\left(\\dfrac{1}{3}-\\dfrac{1}{5}\\right)=\\dfrac{2\\pi}{15}$이므로 $k=\\dfrac{2}{15}$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 5,
        q: '곡선 $y=\\dfrac{x^3}{6}+\\dfrac{1}{2x}$ $(1\\le x\\le 3)$의 길이를 구하십시오.',
        answer: '14/3',
        hint: '$1+f\'(x)^2$이 완전제곱식이 됩니다.',
        wrong: [{ a: '4', why: '$\\sqrt{1+f\'(x)^2}$ 대신 $f\'(x)$를 적분하여 $f(3)-f(1)$을 구했습니다.' }],
        explain: '$f\'(x)=\\dfrac{x^2}{2}-\\dfrac{1}{2x^2}$이고 $1+f\'(x)^2=\\left(\\dfrac{x^2}{2}+\\dfrac{1}{2x^2}\\right)^2$입니다.\n\n$L=\\left[\\dfrac{x^3}{6}-\\dfrac{1}{2x}\\right]_{1}^{3}=\\left(\\dfrac{9}{2}-\\dfrac{1}{6}\\right)-\\left(\\dfrac{1}{6}-\\dfrac{1}{2}\\right)=\\dfrac{13}{3}+\\dfrac{1}{3}=\\dfrac{14}{3}$',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 1,
        q: '$\\int_{0}^{3}\\dfrac{dx}{(x-1)^2}$에 대한 설명으로 옳은 것은 무엇입니까?',
        choices: [
          '$\\left[-\\dfrac{1}{x-1}\\right]_{0}^{3}=-\\dfrac{3}{2}$이다',
          '$x=1$에서 발산하므로 이상적분 전체가 발산한다',
          '$\\left[\\dfrac{1}{x-1}\\right]_{0}^{3}=\\dfrac{3}{2}$이다',
          '$x=1$의 앞뒤가 서로 상쇄되어 0이다',
        ],
        answer: 1,
        why: [
          '구간 안의 $x=1$에서 함수가 한없이 커지므로 기본정리를 바로 쓸 수 없습니다. 양수 함수의 적분이 음수가 나온 것도 이상한 점입니다.',
          '',
          '원시함수의 부호도 틀렸고, 무엇보다 $x=1$에서 발산하는 것을 확인하지 않았습니다.',
          '피적분함수는 항상 양수이므로 상쇄될 것이 없습니다.',
        ],
        hint: '적분 구간 안에 피적분함수가 정의되지 않는 점이 있는지 보십시오.',
        explain: '$x=1$에서 한없이 커지므로 적분 구간을 $[0,1]$과 $[1,3]$으로 나눕니다. $\\int_{0}^{t}\\dfrac{dx}{(x-1)^2}=\\left[-\\dfrac{1}{x-1}\\right]_{0}^{t}=-\\dfrac{1}{t-1}-1\\to\\infty$ $(t\\to 1^{-})$이므로 전체가 발산합니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 1,
        q: '이상적분 $\\int_{0}^{\\infty}\\dfrac{dx}{x^p}$가 수렴하는 실수 $p$의 범위는 무엇입니까?',
        choices: ['$p>1$', '$p<1$', '$p=1$', '이 적분이 수렴하는 $p$는 없다'],
        answer: 3,
        fixed: true,
        why: [
          '$p>1$이면 $\\int_{1}^{\\infty}\\dfrac{dx}{x^p}$는 수렴하지만 $\\int_{0}^{1}\\dfrac{dx}{x^p}$가 발산합니다.',
          '$p<1$이면 $\\int_{0}^{1}\\dfrac{dx}{x^p}$는 수렴하지만 $\\int_{1}^{\\infty}\\dfrac{dx}{x^p}$가 발산합니다.',
          '$p=1$이면 두 부분이 모두 발산합니다.',
          '',
        ],
        hint: '$x=0$ 근처와 무한대 쪽 두 부분으로 나누어 보십시오.',
        explain: '$\\int_{0}^{\\infty}=\\int_{0}^{1}+\\int_{1}^{\\infty}$입니다. 앞부분은 $p<1$, 뒷부분은 $p>1$이어야 수렴하는데 두 조건을 함께 만족하는 $p$는 없습니다. 따라서 어떤 $p$에서도 발산합니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 1,
        q: '이상적분 $\\int_{0}^{1}\\ln x\\,dx$의 값을 구하십시오.',
        answer: '-1',
        hint: '$\\int\\ln x\\,dx=x\\ln x-x+C$이고, $\\lim_{t\\to 0^{+}}t\\ln t$는 로피탈 정리로 구합니다.',
        wrong: [{ a: '1', why: '부호를 확인하십시오. $0<x<1$에서 $\\ln x<0$이므로 적분값은 음수입니다.' }],
        explain: '$\\int_{t}^{1}\\ln x\\,dx=\\left[x\\ln x-x\\right]_{t}^{1}=-1-t\\ln t+t$입니다. $t\\ln t=\\dfrac{\\ln t}{1/t}$에 로피탈 정리를 쓰면 $\\dfrac{1/t}{-1/t^2}=-t\\to 0$이므로 값은 $-1$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 2,
        q: '다음 이상적분 가운데 **발산하는** 것은 무엇입니까?',
        choices: [
          '$\\int_{1}^{\\infty}\\dfrac{x}{x^3+1}\\,dx$',
          '$\\int_{1}^{\\infty}\\dfrac{dx}{\\sqrt{x^4+1}}$',
          '$\\int_{1}^{\\infty}\\dfrac{x^2}{x^3+1}\\,dx$',
          '$\\int_{1}^{\\infty}\\sqrt{x}\\,e^{-x}\\,dx$',
        ],
        answer: 2,
        why: [
          '$\\dfrac{x}{x^3+1}$는 $\\dfrac{1}{x^2}$처럼 행동하므로(비의 극한 1) 수렴합니다.',
          '$\\dfrac{1}{\\sqrt{x^4+1}}\\le\\dfrac{1}{x^2}$이므로 수렴합니다.',
          '',
          '지수함수 $e^{-x}$이 어떤 거듭제곱보다도 빨리 줄어듭니다. 큰 $x$에서 $\\sqrt{x}e^{-x}\\le\\dfrac{1}{x^2}$이 되어 수렴합니다.',
        ],
        hint: '최고차항끼리 비교하여 어떤 $\\dfrac{1}{x^p}$처럼 행동하는지 보십시오.',
        explain: '$\\lim_{x\\to\\infty}\\dfrac{x^2/(x^3+1)}{1/x}=\\lim_{x\\to\\infty}\\dfrac{x^3}{x^3+1}=1$이고 $\\int_{1}^{\\infty}\\dfrac{dx}{x}$가 발산하므로, 극한 비교 판정법에 따라 $\\int_{1}^{\\infty}\\dfrac{x^2}{x^3+1}\\,dx$는 발산합니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 5,
        q: '곡선 $y=\\dfrac{1}{x}$ $(x\\ge 1)$을 $x$축 둘레로 돌린 나팔 모양 입체에 대한 설명으로 옳은 것은 무엇입니까?',
        choices: [
          '부피는 $\\pi$이고 겉넓이는 $2\\pi$이다',
          '부피와 겉넓이가 모두 무한대이다',
          '부피는 $\\pi$이고 겉넓이는 무한대이다',
          '부피는 무한대이고 겉넓이는 $2\\pi$이다',
        ],
        answer: 2,
        why: [
          '겉넓이 적분은 $2\\pi\\int_{1}^{\\infty}\\dfrac{1}{x}\\sqrt{1+\\dfrac{1}{x^4}}\\,dx\\ge 2\\pi\\int_{1}^{\\infty}\\dfrac{dx}{x}$이므로 발산합니다.',
          '부피는 $\\pi\\int_{1}^{\\infty}\\dfrac{dx}{x^2}=\\pi$로 유한합니다.',
          '',
          '부피와 겉넓이를 바꾸어 생각했습니다. 부피 쪽이 $\\dfrac{1}{x^2}$이라 수렴합니다.',
        ],
        hint: '부피는 $\\pi\\int f^2$, 겉넓이는 $2\\pi\\int f\\sqrt{1+f\'^2}$입니다. 각각을 p-적분과 비교하십시오.',
        explain: '부피 $V=\\pi\\int_{1}^{\\infty}\\dfrac{dx}{x^2}=\\pi$로 수렴합니다. 겉넓이는 $\\sqrt{1+\\dfrac{1}{x^4}}\\ge 1$이므로 $S\\ge 2\\pi\\int_{1}^{\\infty}\\dfrac{dx}{x}=\\infty$, 비교 판정법에 따라 발산합니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 4,
        q: '원 $(x-2)^2+y^2\\le 1$의 내부를 $y$축 둘레로 돌린 입체(도넛 모양)의 부피를 $V=k\\pi^2$이라 할 때, $k$의 값을 구하십시오.',
        answer: '4',
        hint: '원통껍질법에서 높이는 $2\\sqrt{1-(x-2)^2}$입니다. $u=x-2$로 치환하고, 홀함수와 반원의 넓이를 이용하십시오.',
        wrong: [
          { a: '2', why: '껍질의 높이를 $\\sqrt{1-(x-2)^2}$로 두어 원의 위쪽 절반만 돌렸습니다. 높이는 위아래를 합한 $2\\sqrt{1-(x-2)^2}$입니다.' },
          { a: '8', why: '$\\int_{-1}^{1}\\sqrt{1-u^2}\\,du$는 반원의 넓이 $\\dfrac{\\pi}{2}$입니다. $\\pi$로 계산했는지 확인하십시오.' },
        ],
        explain: '$V=2\\pi\\int_{1}^{3}x\\cdot 2\\sqrt{1-(x-2)^2}\\,dx$이고 $u=x-2$로 놓으면\n\n$V=4\\pi\\int_{-1}^{1}(u+2)\\sqrt{1-u^2}\\,du=4\\pi\\left(0+2\\cdot\\dfrac{\\pi}{2}\\right)=4\\pi^2$\n\n($u\\sqrt{1-u^2}$은 홀함수라 적분이 0이고, $\\int_{-1}^{1}\\sqrt{1-u^2}\\,du$는 반원의 넓이입니다.) 따라서 $k=4$입니다.',
      },
      {
        id: 'a6', level: 3, type: 'short', check: 'number', concept: 5,
        q: '곡선 $y=\\sqrt{x}$ $(0\\le x\\le 2)$를 $x$축 둘레로 돌린 곡면의 넓이를 $S=k\\pi$라 할 때, $k$의 값을 구하십시오.',
        answer: '13/3',
        hint: '$f(x)\\sqrt{1+f\'(x)^2}$을 먼저 간단히 하십시오.',
        wrong: [{ a: '13/6', why: '겉넓이 공식 앞의 $2\\pi$에서 2를 빠뜨렸습니다.' }],
        explain: '$f\'(x)=\\dfrac{1}{2\\sqrt{x}}$이므로 $f(x)\\sqrt{1+f\'(x)^2}=\\sqrt{x}\\sqrt{1+\\dfrac{1}{4x}}=\\sqrt{x+\\dfrac{1}{4}}$입니다.\n\n$S=2\\pi\\int_{0}^{2}\\sqrt{x+\\dfrac{1}{4}}\\,dx=2\\pi\\cdot\\dfrac{2}{3}\\left[\\left(x+\\dfrac{1}{4}\\right)^{3/2}\\right]_{0}^{2}=\\dfrac{4\\pi}{3}\\left(\\dfrac{27}{8}-\\dfrac{1}{8}\\right)=\\dfrac{13\\pi}{3}$\n\n따라서 $k=\\dfrac{13}{3}$입니다.',
      },
    ],

    deeper: [
      {
        title: '물감은 유한한데 칠할 수는 없다: 가브리엘의 나팔',
        body: '17세기 이탈리아의 수학자 토리첼리는 $y=\\dfrac{1}{x}$ $(x\\ge 1)$을 돌린 나팔 모양 입체의 부피가 유한($\\pi$)하다는 것을 보였습니다. 그런데 겉넓이는 무한대입니다.\n\n' +
          '"부피 $\\pi$만큼의 물감을 부으면 나팔 안이 가득 차는데, 겉면을 칠하려면 물감이 무한히 필요하다"는 역설처럼 들립니다. 실제로는 수학의 물감은 두께가 0까지 얇아질 수 있지만 현실의 물감은 그럴 수 없다는 차이에서 생기는 착시입니다. 이상적분의 수렴이 우리의 직관과 다를 수 있다는 좋은 예입니다.',
      },
      {
        title: '확률과 이상적분',
        body: '확률밀도함수 $f(x)\\ge 0$은 $\\int_{-\\infty}^{\\infty}f(x)\\,dx=1$을 만족해야 하므로, 연속확률분포는 이상적분 위에 세워져 있습니다. 예를 들어 지수분포 $f(x)=\\lambda e^{-\\lambda x}$ $(x\\ge 0)$의 평균은 부분적분으로 $\\int_{0}^{\\infty}x\\lambda e^{-\\lambda x}\\,dx=\\dfrac{1}{\\lambda}$입니다.\n\n' +
          '정규분포에 쓰이는 $\\int_{-\\infty}^{\\infty}e^{-x^2}\\,dx$는 비교 판정법으로 수렴함을 알 수 있지만, 원시함수를 식으로 쓸 수 없어 값 $\\sqrt{\\pi}$를 구하려면 이중적분과 극좌표를 쓰는 기발한 방법이 필요합니다. 다변수 미적분에서 그 방법을 만나게 됩니다.',
      },
    ],

    faq: [
      {
        q: '함수가 0으로 가면 이상적분은 수렴하는 거 아니에요?',
        a: '아닙니다. $\\dfrac{1}{x}$은 0으로 가지만 $\\int_{1}^{\\infty}\\dfrac{dx}{x}$는 발산합니다. 0으로 **얼마나 빨리** 가는지가 중요합니다. $\\dfrac{1}{x^p}$에서 $p>1$일 만큼 빨라야 넓이가 유한합니다.',
      },
      {
        q: '$\\int_{-\\infty}^{\\infty}f(x)\\,dx$를 $\\lim_{t\\to\\infty}\\int_{-t}^{t}f(x)\\,dx$로 계산하면 안 돼요?',
        a: '안 됩니다. 예를 들어 $\\int_{-t}^{t}x\\,dx=0$이라 그 극한은 0이지만, $\\int_{0}^{\\infty}x\\,dx$가 발산하므로 $\\int_{-\\infty}^{\\infty}x\\,dx$는 발산합니다. 양쪽 끝을 **따로** 보내 둘 다 수렴할 때만 수렴한다고 합니다.',
      },
      {
        q: '원판법과 원통껍질법 중 어느 것을 써야 해요?',
        a: '둘 다 같은 부피를 줍니다. 회전축과 수직으로 자른 단면이 간단하면 원판법, 함수를 다른 변수로 풀기 어렵거나 회전축과 평행한 띠가 자연스러우면 원통껍질법이 편합니다. $y=2x-x^2$을 $y$축 둘레로 돌릴 때 원판법을 쓰려면 $x=1\\pm\\sqrt{1-y}$로 풀어야 해서 껍질법이 훨씬 쉽습니다.',
      },
    ],

    mistakes: [
      '적분 구간 안에서 발산하는 점을 못 보고 $\\int_{-1}^{1}\\dfrac{dx}{x^2}=-2$처럼 계산하는 실수 — 양수 함수의 적분이 음수가 나오면 의심하고, 발산하는 점에서 나누어 극한으로 계산합니다.',
      '와셔법에서 $\\pi(R-r)^2$을 적분하는 실수 — 단면은 큰 원에서 작은 원을 뺀 것이므로 $\\pi(R^2-r^2)$입니다.',
      '비교 판정법을 거꾸로 쓰는 실수 — 발산하는 함수보다 작거나, 수렴하는 함수보다 크다는 것으로는 아무것도 알 수 없습니다.',
    ],

    gens: [
      {
        id: 'improper-p',
        level: 1,
        title: 'p-적분 꼴의 이상적분 계산',
        make: function (R) {
          var c = R.int(1, 6);
          if (R.bool()) {
            // ∫_1^∞ c/x^p dx = c/(p-1)
            var kind = R.pick(['2', '3', '4', '5', '3/2']);
            var p = R.F(kind);
            var ans = R.F(c).div(p.sub(1));
            var den = kind === '3/2' ? 'x\\sqrt{x}' : 'x^{' + kind + '}';
            var wrongA = [], seenA = {};
            seenA[ans.toString()] = true;
            [[R.F(c).div(p.add(1)), '원시함수의 지수를 하나 내렸습니다. $x^{-p}$의 원시함수는 $\\dfrac{x^{1-p}}{1-p}$입니다.'],
              [ans.neg(), '부호를 확인하십시오. 양수 함수의 적분이므로 값은 양수입니다.'],
              [R.F(c), '극한 $t^{1-p}\\to 0$은 맞게 구했지만 $p-1$' + '로 나누는 것을 빠뜨렸습니다.'],
            ].forEach(function (w) {
              var k = w[0].toString();
              if (!seenA[k]) { seenA[k] = true; wrongA.push({ a: k, why: w[1] }); }
            });
            var q1 = p.sub(1);
            return {
              type: 'short', check: 'number', concept: 0,
              q: '다음 이상적분의 값을 구하십시오.\n\n$\\int_{1}^{\\infty}\\dfrac{' + c + '}{' + den + '}\\,dx$',
              answer: ans.toString(),
              wrong: wrongA,
              explain: '$p=' + R.fmt.frac(p) + '>1$이므로 수렴합니다. $\\int_{1}^{t}' + cx(c, 'x^{-' + (p.isInt() ? p.num : p.num + '/' + p.den) + '}') + '\\,dx=' + (c === 1 ? '' : c + '\\cdot') + '\\dfrac{1-t^{-' + (q1.isInt() ? q1.num : q1.num + '/' + q1.den) + '}}{' + R.fmt.frac(q1) + '}$이고 $t\\to\\infty$이면 $t^{-' + (q1.isInt() ? q1.num : q1.num + '/' + q1.den) + '}\\to 0$입니다.\n\n' +
                '따라서 값은 $\\dfrac{' + c + '}{p-1}=' + R.fmt.frac(ans) + '$입니다.',
            };
          }
          // ∫_0^b c/x^p dx = c b^{1-p}/(1-p),  p<1
          var opt = R.pick([
            { p: '1/2', den: '\\sqrt{x}', bs: [1, 4, 9], root: function (b) { return Math.round(Math.sqrt(b)); }, pw: '\\sqrt{t}', top: function (b) { return '2\\sqrt{' + b + '}'; } },
            { p: '1/3', den: '\\sqrt[3]{x}', bs: [1, 8, 27], root: function (b) { var r = Math.round(Math.cbrt(b)); return r * r; }, pw: 't^{2/3}', top: function (b) { return '\\dfrac{3}{2}\\cdot ' + b + '^{2/3}'; } },
            { p: '2/3', den: '\\sqrt[3]{x^{2}}', bs: [1, 8, 27], root: function (b) { return Math.round(Math.cbrt(b)); }, pw: 't^{1/3}', top: function (b) { return '3\\cdot ' + b + '^{1/3}'; } },
          ]);
          var b = R.pick(opt.bs);
          var P = R.F(opt.p);
          var oneMinus = R.F(1).sub(P);
          var val = R.F(c).mul(opt.root(b)).div(oneMinus);   // c · b^{1-p} / (1-p)
          var wrongB = [], seenB = {};
          seenB[val.toString()] = true;
          [[R.F(c).mul(opt.root(b)), '$1-p=' + R.fmt.frac(oneMinus) + '$' + '로 나누는 것을 빠뜨렸습니다.'],
            [R.F(c).mul(opt.root(b)).mul(oneMinus), '$1-p$' + '로 나누어야 하는데 곱했습니다.'],
            [val.neg(), '부호를 확인하십시오. 양수 함수의 적분이므로 값은 양수입니다.'],
          ].forEach(function (w) {
            var k = w[0].toString();
            if (!seenB[k]) { seenB[k] = true; wrongB.push({ a: k, why: w[1] }); }
          });
          return {
            type: 'short', check: 'number', concept: 1,
            q: '다음 이상적분의 값을 구하십시오.\n\n$\\int_{0}^{' + b + '}\\dfrac{' + c + '}{' + opt.den + '}\\,dx$',
            answer: val.toString(),
            wrong: wrongB,
            explain: '$x=0$에서 피적분함수가 한없이 커지므로 구간 $[t,' + b + ']$에서 적분한 뒤 $t\\to 0^{+}$인 극한을 구합니다. $p=' + R.fmt.frac(P) + '<1$이므로 수렴합니다.\n\n' +
              '$\\int_{t}^{' + b + '}' + cx(c, 'x^{-' + opt.p + '}') + '\\,dx=' + (c === 1 ? '' : c + '\\cdot') + '\\dfrac{' + b + '^{' + R.fmt.frac(oneMinus) + '}-t^{' + R.fmt.frac(oneMinus) + '}}{' + R.fmt.frac(oneMinus) + '}$이고 $t\\to 0^{+}$이면 $t^{' + R.fmt.frac(oneMinus) + '}\\to 0$이므로 값은 $' + R.fmt.frac(val) + '$입니다.',
          };
        },
      },
      {
        id: 'disk-volume',
        level: 1,
        title: '원판법으로 회전체의 부피 구하기',
        make: function (R) {
          var useRoot = R.int(0, 3) === 0;
          var c, n, a, f, sq, ans, noSq, k;
          a = R.int(1, 3);
          if (useRoot) {
            c = R.int(1, 3);
            f = (c === 1 ? '' : c) + '\\sqrt{x}';
            // π ∫ c² x dx = π c² a²/2
            ans = R.F(c * c * a * a, 2);
            sq = (c * c === 1 ? '' : c * c) + 'x';
            noSq = R.F(2 * c * Math.pow(a, 1.5) === Math.round(2 * c * Math.pow(a, 1.5)) ? Math.round(2 * c * Math.pow(a, 1.5)) : 1, 3);
            k = null;
          } else {
            n = R.int(1, 3);
            c = R.int(1, 3);
            if (n === 3 && a === 3) a = 2;
            while (a > 1 && c * c * Math.pow(a, 2 * n + 1) > 300) a--;   // 1152/7 같은 너무 큰 답을 피한다
            f = (c === 1 ? '' : c) + (n === 1 ? 'x' : 'x^{' + n + '}');
            ans = R.F(c * c * Math.pow(a, 2 * n + 1), 2 * n + 1);
            sq = (c * c === 1 ? '' : c * c) + 'x^{' + (2 * n) + '}';
            noSq = R.F(c * Math.pow(a, n + 1), n + 1);
            k = n;
          }
          var wrong = [], seen = {};
          seen[ans.toString()] = true;
          var cand = [[ans.mul(2), '원판의 넓이 $\\pi r^2$ 대신 $2\\pi r^2$처럼 2를 더 곱했습니다.']];
          if (!useRoot) cand.push([noSq, '$f(x)$를 제곱하지 않았습니다. 단면의 넓이는 $\\pi f(x)^2$입니다.']);
          if (!useRoot) cand.push([R.F(c * c * Math.pow(a, 2 * n + 1)), '원시함수에서 $' + (2 * n + 1) + '$' + R.josa(2 * n + 1, '으로/로') + ' 나누는 것을 빠뜨렸습니다.']);
          else cand.push([R.F(c * c * a * a), '$x$의 원시함수 $\\dfrac{x^2}{2}$에서 2로 나누는 것을 빠뜨렸습니다.']);
          cand.forEach(function (w) {
            var key = w[0].toString();
            if (!seen[key]) { seen[key] = true; wrong.push({ a: key, why: w[1] }); }
          });
          var anti = useRoot ? fx(R.F(c * c, 2), 2) : fx(R.F(c * c, 2 * k + 1), 2 * k + 1);
          return {
            type: 'short', check: 'number', concept: 3,
            q: (!useRoot && n === 1 ? '직선' : '곡선') + ' $y=' + f + '$ $(0\\le x\\le ' + a + ')$' + (!useRoot && n > 1 ? '과' : '와') + ' $x$축 사이의 영역을 $x$축 둘레로 돌린 회전체의 부피를 $V=k\\pi$라 할 때, $k$의 값을 구하십시오.',
            answer: ans.toString(),
            wrong: wrong,
            explain: '원판법: $V=\\pi\\int_{0}^{' + a + '}\\left(' + f + '\\right)^{2}dx=\\pi\\int_{0}^{' + a + '}' + sq + '\\,dx=\\pi\\left[' + anti + '\\right]_{0}^{' + a + '}=' + R.fmt.frac(ans) + '\\pi$\n\n' +
              '따라서 $k=' + R.fmt.frac(ans) + '$입니다.',
          };
        },
      },
      {
        id: 'shell-volume',
        level: 2,
        title: '원통껍질법으로 회전체의 부피 구하기',
        make: function (R) {
          var kind = R.int(0, 2);
          var f, a, ans, disk, noX, integrand, anti;
          if (kind === 0) {
            // y = b x - x^2, 0..b : V = 2π ∫ (b x^2 - x^3) = π b^4 / 6
            var b = R.int(1, 4);
            f = (b === 1 ? '' : b) + 'x-x^{2}';
            a = b;
            ans = R.F(Math.pow(b, 4), 6);
            disk = R.F(Math.pow(b, 5), 30);                 // π ∫ (bx-x²)² dx = π b^5/30
            noX = R.F(Math.pow(b, 3), 3);                   // 2π ∫ (bx-x²) = 2π b³/6
            integrand = (b === 1 ? '' : b) + 'x^{2}-x^{3}';
            anti = fx(R.F(b, 3), 3) + '-\\dfrac{x^{4}}{4}';
          } else {
            // y = c x^n, 0..a : V = 2π c a^{n+2}/(n+2)
            var n = kind;  // 1 또는 2
            var c = R.int(1, 3);
            a = R.int(1, 3);
            f = (c === 1 ? '' : c) + (n === 1 ? 'x' : 'x^{2}');
            ans = R.F(2 * c * Math.pow(a, n + 2), n + 2);
            disk = R.F(c * c * Math.pow(a, 2 * n + 1), 2 * n + 1);
            noX = R.F(2 * c * Math.pow(a, n + 1), n + 1);
            integrand = (c === 1 ? '' : c) + 'x^{' + (n + 1) + '}';
            anti = fx(R.F(c, n + 2), n + 2);
          }
          var wrong = [], seen = {};
          seen[ans.toString()] = true;
          [[ans.div(2), '$2\\pi$에서 2를 빠뜨렸습니다. 껍질의 둘레는 $2\\pi x$입니다.'],
            [disk, '$x$축 둘레로 돌린 원판법 $\\pi\\int f(x)^2\\,dx$를 계산했습니다. 회전축은 $y$축입니다.'],
            [noX, '껍질의 반지름 $x$를 곱하지 않고 $2\\pi\\int f(x)\\,dx$를 계산했습니다.'],
          ].forEach(function (w) {
            var key = w[0].toString();
            if (!seen[key]) { seen[key] = true; wrong.push({ a: key, why: w[1] }); }
          });
          return {
            type: 'short', check: 'number', concept: 4,
            q: (kind === 1 ? '직선' : '곡선') + ' $y=' + f + '$ $(0\\le x\\le ' + a + ')$' + (kind === 1 ? '와' : '과') + ' $x$축 사이의 영역을 $y$축 둘레로 돌린 회전체의 부피를 $V=k\\pi$라 할 때, $k$의 값을 구하십시오.',
            answer: ans.toString(),
            hint: '원통껍질법 $V=2\\pi\\int_{a}^{b}x f(x)\\,dx$를 쓰십시오.',
            wrong: wrong,
            explain: '원통껍질법: $V=2\\pi\\int_{0}^{' + a + '}x\\left(' + f + '\\right)dx=2\\pi\\int_{0}^{' + a + '}\\left(' + integrand + '\\right)dx=2\\pi\\left[' + anti + '\\right]_{0}^{' + a + '}=' + R.fmt.frac(ans) + '\\pi$\n\n' +
              '따라서 $k=' + R.fmt.frac(ans) + '$입니다.',
          };
        },
      },
      {
        id: 'arc-length',
        level: 2,
        title: '곡선의 길이 구하기',
        make: function (R) {
          if (R.bool()) {
            // y = (2/3) x^{3/2}, a..b,  1+a, 1+b 는 제곱수
            var sq = [0, 3, 8, 15, 24, 35], pairs = [], i1, i2;
            for (i1 = 0; i1 < sq.length; i1++) for (i2 = i1 + 1; i2 < sq.length; i2++) pairs.push([sq[i1], sq[i2]]);
            var pr = R.pick(pairs);
            var a = pr[0], b = pr[1];
            var sa = Math.round(Math.sqrt(1 + a)), sb = Math.round(Math.sqrt(1 + b));
            var ans = R.F(2 * (sb * sb * sb - sa * sa * sa), 3);
            var wrong = [], seen = {};
            seen[ans.toString()] = true;
            [[R.F(2 * sb * sb * sb, 3), '아래끝 $x=' + a + '$에서의 값 $\\dfrac{2}{3}\\cdot ' + sa + '^{3}$을 빼지 않았습니다.'],
              [R.F(sb * sb * sb - sa * sa * sa), '$\\sqrt{1+x}$의 원시함수 $\\dfrac{2}{3}(1+x)^{3/2}$에서 $\\dfrac{2}{3}$를 빠뜨렸습니다.'],
            ].forEach(function (w) {
              var key = w[0].toString();
              if (!seen[key]) { seen[key] = true; wrong.push({ a: key, why: w[1] }); }
            });
            return {
              type: 'short', check: 'number', concept: 5,
              q: '곡선 $y=\\dfrac{2}{3}x^{3/2}$ $(' + a + '\\le x\\le ' + b + ')$의 길이를 구하십시오.',
              answer: ans.toString(),
              wrong: wrong,
              explain: '$f\'(x)=\\sqrt{x}$이므로 $\\sqrt{1+f\'(x)^2}=\\sqrt{1+x}$입니다.\n\n' +
                '$L=\\int_{' + a + '}^{' + b + '}\\sqrt{1+x}\\,dx=\\left[\\dfrac{2}{3}(1+x)^{3/2}\\right]_{' + a + '}^{' + b + '}=\\dfrac{2}{3}\\left(' + sb + '^{3}-' + sa + '^{3}\\right)=' + R.fmt.frac(ans) + '$',
            };
          }
          // y = x^3/6 + 1/(2x),  L = [x^3/6 - 1/(2x)]_a^b
          var lo = R.int(1, 3), hi = R.int(lo + 1, 4);
          function G(x) { return R.F(x * x * x, 6).sub(R.F(1, 2 * x)); }
          function Fv(x) { return R.F(x * x * x, 6).add(R.F(1, 2 * x)); }
          var L = G(hi).sub(G(lo));
          var dF = Fv(hi).sub(Fv(lo));
          var wrong2 = [];
          if (!dF.eq(L)) wrong2.push({ a: dF.toString(), why: '$\\sqrt{1+f\'(x)^2}$ 대신 $f\'(x)$를 적분하여 $f(' + hi + ')-f(' + lo + ')$' + R.josa(lo, '을/를') + ' 구했습니다.' });
          return {
            type: 'short', check: 'number', concept: 5,
            q: '곡선 $y=\\dfrac{x^3}{6}+\\dfrac{1}{2x}$ $(' + lo + '\\le x\\le ' + hi + ')$의 길이를 구하십시오.',
            answer: L.toString(),
            hint: '$1+f\'(x)^2$이 완전제곱식이 됩니다.',
            wrong: wrong2,
            explain: '$f\'(x)=\\dfrac{x^2}{2}-\\dfrac{1}{2x^2}$이므로 $1+f\'(x)^2=\\left(\\dfrac{x^2}{2}+\\dfrac{1}{2x^2}\\right)^2$입니다.\n\n' +
              '$L=\\int_{' + lo + '}^{' + hi + '}\\left(\\dfrac{x^2}{2}+\\dfrac{1}{2x^2}\\right)dx=\\left[\\dfrac{x^3}{6}-\\dfrac{1}{2x}\\right]_{' + lo + '}^{' + hi + '}=\\left(' + R.fmt.frac(G(hi)) + '\\right)-\\left(' + R.fmt.frac(G(lo)) + '\\right)=' + R.fmt.frac(L) + '$',
          };
        },
      },
    ],
  });
})();
