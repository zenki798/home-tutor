/* 미적분Ⅱ · 급수와 등비급수
 * 급수와 부분합, 급수의 합, 수렴하면 aₙ→0(역은 거짓), 급수의 성질, 등비급수의 수렴 조건과 합,
 * 순환소수, 닮은 도형이 한없이 반복되는 문제. (수열의 극한은 앞 단원 math-h-calc2-01) */
(function () {
  // 정사각형의 각 변의 중점을 이어 정사각형을 거듭 그린 그림 (한 변 4 → 넓이 16, 8, 4, 2)
  var FIG_SQUARES = {
    type: 'svg',
    svg: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="2">' +
      '<rect x="10" y="10" width="180" height="180"/>' +
      '<polygon points="100,10 190,100 100,190 10,100"/>' +
      '<rect x="55" y="55" width="90" height="90"/>' +
      '<polygon points="100,55 145,100 100,145 55,100"/>' +
      '</g><polygon points="100,55 145,100 100,145 55,100" fill="var(--fig-1)" fill-opacity="0.35"/></svg>',
    alt: '한 변의 길이가 4인 정사각형 안에, 각 변의 중점을 이어 만든 정사각형을 거듭 그려 넣은 그림. 정사각형이 네 개 겹쳐 있고 가장 안쪽 정사각형이 색칠되어 있다',
  };
  // 정사각형 → 내접원 → 그 원에 내접하는 정사각형 → 내접원 … (한 변 1)
  var FIG_CIRCLES = {
    type: 'svg',
    svg: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="2">' +
      '<rect x="10" y="10" width="180" height="180"/>' +
      '<rect x="36.4" y="36.4" width="127.2" height="127.2"/>' +
      '<rect x="55" y="55" width="90" height="90"/>' +
      '</g><g fill="var(--fig-1)" fill-opacity="0.25" stroke="currentColor" stroke-width="2">' +
      '<circle cx="100" cy="100" r="90"/><circle cx="100" cy="100" r="63.6"/><circle cx="100" cy="100" r="45"/>' +
      '</g></svg>',
    alt: '한 변의 길이가 1인 정사각형에 내접하는 원을 그리고, 그 원에 내접하는 정사각형, 다시 그 정사각형에 내접하는 원을 차례로 그린 그림. 원 세 개가 색칠되어 있다',
  };

  function dedupe(R, ans, wrongs) {
    var wr = [], seen = {};
    wrongs.forEach(function (w) {
      if (!w[0] || w[0].eq(ans) || seen[w[0].toString()]) return;
      seen[w[0].toString()] = true;
      wr.push({ a: w[0].toString(), why: w[1] });
    });
    return wr;
  }

  Tutor.registerUnit({
    id: 'math-h-calc2-02',
    course: 'math-h-calc2',
    title: '급수와 등비급수',
    summary: '한없이 더한 급수의 수렴과 발산을 판정하고, 등비급수의 합을 구해 순환소수와 도형 문제에 활용합니다.',
    goals: [
      '급수와 부분합의 뜻을 알고, 부분합의 극한으로 급수의 합을 구할 수 있다.',
      '급수가 수렴하면 일반항이 0에 수렴함을 알고, 이를 이용하여 급수의 발산을 판정할 수 있다.',
      '등비급수의 수렴 조건을 알고 그 합을 구할 수 있다.',
      '등비급수를 이용하여 순환소수와 한없이 반복되는 도형 문제를 해결할 수 있다.',
    ],
    standards: ['[12미적Ⅱ-01-04]', '[12미적Ⅱ-01-05]'],

    concepts: [
      {
        title: '급수와 부분합',
        body: '수열 $\\{a_n\\}$의 각 항을 차례로 한없이 더한 식\n\n$a_1+a_2+a_3+\\cdots+a_n+\\cdots$\n\n을 **급수**라 하고 $\\sum_{n=1}^{\\infty} a_n$으로 나타냅니다. 첫째항부터 제$n$항까지의 합 $S_n=\\sum_{k=1}^{n} a_k$를 이 급수의 **부분합**이라고 합니다.\n\n부분합의 수열 $\\{S_n\\}$이 일정한 값 $S$에 수렴하면 급수는 $S$에 **수렴**한다고 하고, $S$를 **급수의 합**이라고 합니다.\n\n$\\sum_{n=1}^{\\infty} a_n=\\lim_{n \\to \\infty} S_n=S$\n\n$\\{S_n\\}$이 발산하면 급수도 **발산**합니다.\n\n예: $\\frac{1}{k(k+1)}=\\frac{1}{k}-\\frac{1}{k+1}$이므로\n\n$S_n=\\left(1-\\frac{1}{2}\\right)+\\left(\\frac{1}{2}-\\frac{1}{3}\\right)+\\cdots+\\left(\\frac{1}{n}-\\frac{1}{n+1}\\right)=1-\\frac{1}{n+1}$\n\n따라서 $\\sum_{n=1}^{\\infty}\\frac{1}{n(n+1)}=\\lim_{n \\to \\infty}\\left(1-\\frac{1}{n+1}\\right)=1$입니다.\n\n> ⚠️ 끝없이 더하는 계산은 실제로 할 수 없습니다. 그래서 급수의 합은 **부분합의 극한**으로 정의합니다. 급수는 반드시 부분합 $S_n$을 먼저 구하고 그 극한을 봅니다.',
        easy: '종이 한 장의 절반을 잘라 모으고, 남은 종이의 절반을 또 잘라 모은다고 생각해 보십시오. 모은 양은 $\\frac{1}{2}$, $\\frac{3}{4}$, $\\frac{7}{8}$, $\\frac{15}{16}$, … 장이 됩니다.\n\n이렇게 "지금까지 모은 양"이 부분합입니다. 부분합이 1장에 한없이 가까워지므로, 끝없이 모은 양(급수의 합)은 1장이라고 정합니다.',
        fig: {
          type: 'coord', xmin: 0, xmax: 9, ymin: 0, ymax: 1.4,
          points: [
            { x: 1, y: 0.5 }, { x: 2, y: 0.667 }, { x: 3, y: 0.75 }, { x: 4, y: 0.8 },
            { x: 5, y: 0.833 }, { x: 6, y: 0.857 }, { x: 7, y: 0.875 }, { x: 8, y: 0.889 },
          ],
          segments: [{ from: [0, 1], to: [9, 1], dashed: true }],
          alt: '가로축이 n, 세로축이 부분합 S_n인 좌표평면에 S_n=1-1/(n+1)의 값 8개를 점으로 찍은 그림. 점들이 아래에서 점선 y=1에 다가간다',
        },
        check: {
          type: 'short', check: 'number',
          q: '급수 $\\sum_{n=1}^{\\infty} a_n$의 부분합이 $S_n=\\dfrac{3n}{n+2}$일 때, 이 급수의 합을 구하십시오.',
          answer: '3',
          wrong: [{ a: '0', why: '일반항 $a_n$의 극한을 생각했습니다. 급수의 합은 부분합 $S_n$의 극한입니다.' }],
          explain: '급수의 합은 $\\lim_{n \\to \\infty} S_n=\\lim_{n \\to \\infty}\\dfrac{3n}{n+2}=3$입니다.',
        },
      },
      {
        title: '급수가 수렴하면 aₙ→0',
        body: '급수 $\\sum_{n=1}^{\\infty} a_n$이 $S$에 수렴하면 $a_n=S_n-S_{n-1}$ ($n \\ge 2$)이므로\n\n$\\lim_{n \\to \\infty} a_n=\\lim_{n \\to \\infty} S_n-\\lim_{n \\to \\infty} S_{n-1}=S-S=0$\n\n입니다. 즉 **급수 $\\sum a_n$이 수렴하면 $\\lim_{n \\to \\infty} a_n=0$** 입니다.\n\n이것을 거꾸로(대우로) 쓰면 발산을 판정하는 데 쓸 수 있습니다.\n\n> 💡 $\\{a_n\\}$이 0에 수렴하지 않으면(0이 아닌 값에 수렴하거나 발산하면) 급수 $\\sum a_n$은 발산합니다.\n\n예: $\\sum_{n=1}^{\\infty}\\frac{n}{2n+1}$은 $\\frac{n}{2n+1} \\to \\frac{1}{2} \\ne 0$이므로 발산합니다.\n\n> ⚠️ **역은 성립하지 않습니다.** $a_n \\to 0$이어도 급수가 발산할 수 있습니다. $a_n=\\sqrt{n+1}-\\sqrt{n}=\\dfrac{1}{\\sqrt{n+1}+\\sqrt{n}}$은 0에 수렴하지만, $S_n=\\sqrt{n+1}-1$이므로 급수는 양의 무한대로 발산합니다.',
        easy: '매번 더하는 양이 0으로 줄어들지 않으면, 예를 들어 늘 $\\frac{1}{2}$ 가까이 더하면 합은 끝없이 커집니다. 그러니 수렴하는 급수라면 더하는 양이 반드시 0으로 줄어들어야 합니다.\n\n하지만 더하는 양이 0으로 줄어드는 것만으로는 부족합니다. 너무 천천히 줄면 조금씩 더한 것이 쌓여 끝없이 커질 수 있습니다. "0으로 간다"는 수렴의 **필요조건**일 뿐입니다.',
        check: {
          type: 'ox',
          q: '$\\lim_{n \\to \\infty} a_n=0$이면 급수 $\\sum_{n=1}^{\\infty} a_n$은 반드시 수렴합니다.',
          answer: false,
          explain: '역은 성립하지 않습니다. $a_n=\\sqrt{n+1}-\\sqrt{n}$은 0에 수렴하지만 부분합 $S_n=\\sqrt{n+1}-1$이 발산하므로 급수는 발산합니다.',
        },
      },
      {
        title: '급수의 성질',
        body: '두 급수 $\\sum_{n=1}^{\\infty} a_n$, $\\sum_{n=1}^{\\infty} b_n$이 **모두 수렴**하고 그 합이 각각 $S$, $T$일 때 다음이 성립합니다. 부분합에 수열의 극한의 성질을 쓰면 바로 얻어집니다.\n\n1. $\\sum_{n=1}^{\\infty} ca_n=cS$ (단, $c$는 상수)\n2. $\\sum_{n=1}^{\\infty}(a_n+b_n)=S+T$\n3. $\\sum_{n=1}^{\\infty}(a_n-b_n)=S-T$\n\n예: $\\sum a_n=4$, $\\sum b_n=-1$이면 $\\sum(2a_n-3b_n)=2 \\times 4-3 \\times (-1)=11$입니다.\n\n> ⚠️ $\\sum a_nb_n$은 $ST$가 아닙니다. 예를 들어 $a_n=b_n=\\left(\\frac{1}{2}\\right)^n$이면 $\\sum a_n=\\sum b_n=1$이지만 $\\sum a_nb_n=\\sum\\left(\\frac{1}{4}\\right)^n=\\frac{1}{3}$입니다.',
        easy: '두 사람이 각자 끝없이 모은 돈의 합계를 알면, 둘이 함께 모은 돈의 합계는 두 합계를 더한 것입니다. 각자 두 배씩 모았다면 합계도 두 배이고요.\n\n하지만 "날마다 두 사람이 모은 돈을 곱한 것"의 합계는 각자의 합계를 곱한 것과 다릅니다. 곱셈은 이렇게 나누어 계산할 수 없습니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\sum_{n=1}^{\\infty} a_n=5$, $\\sum_{n=1}^{\\infty} b_n=2$일 때, $\\sum_{n=1}^{\\infty}(a_n+3b_n)$의 값을 구하십시오.',
          answer: '11',
          wrong: [{ a: '7', why: '$b_n$ 앞의 상수 3을 곱하지 않았습니다. $\\sum 3b_n=3 \\times 2=6$입니다.' }],
          explain: '두 급수가 모두 수렴하므로 $\\sum(a_n+3b_n)=5+3 \\times 2=11$입니다.',
        },
      },
      {
        title: '등비급수',
        body: '첫째항이 $a$, 공비가 $r$인 등비수열의 급수\n\n$\\sum_{n=1}^{\\infty} ar^{n-1}=a+ar+ar^2+\\cdots$\n\n를 **등비급수**라고 합니다. $r \\ne 1$이면 부분합은 $S_n=\\dfrac{a(1-r^n)}{1-r}$입니다.\n\n$a \\ne 0$일 때\n- $-1<r<1$이면 $r^n \\to 0$이므로 **수렴**하고, 그 합은 $\\dfrac{a}{1-r}$입니다.\n- $r \\le -1$ 또는 $r \\ge 1$이면 **발산**합니다. ($r=1$이면 $S_n=na$이므로 발산합니다.)\n\n$a=0$이면 모든 항이 0이므로 0에 수렴합니다.\n\n예: $3+1+\\frac{1}{3}+\\frac{1}{9}+\\cdots$은 $a=3$, $r=\\frac{1}{3}$이므로 합은 $\\dfrac{3}{1-\\frac{1}{3}}=\\frac{9}{2}$입니다.\n\n> ⚠️ $\\sum_{n=1}^{\\infty}\\left(\\frac{1}{2}\\right)^n$의 첫째항은 1이 아니라 $\\frac{1}{2}$입니다. 합은 $\\dfrac{\\frac{1}{2}}{1-\\frac{1}{2}}=1$입니다. 첫째항은 $n=1$을 넣어 확인합니다.\n\n> 💡 수열 $\\{r^n\\}$은 $r=1$일 때 수렴하지만, 등비급수는 $r=1$이면 $a+a+a+\\cdots$가 되어 발산합니다. 급수의 수렴 조건은 $-1<r<1$입니다.',
        easy: '피자 한 판의 절반, 남은 것의 절반, 또 남은 것의 절반 … 을 계속 먹으면 $\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{8}+\\cdots$판을 먹게 됩니다. 아무리 먹어도 한 판을 넘지 않고 한 판에 한없이 가까워지므로 합은 1입니다.\n\n공식으로도 첫째항 $\\frac{1}{2}$, 공비 $\\frac{1}{2}$이니 $\\dfrac{\\frac{1}{2}}{1-\\frac{1}{2}}=1$입니다. 공비의 절댓값이 1보다 작아야 더하는 양이 빠르게 줄어 합이 정해집니다.',
        check: {
          type: 'short', check: 'number',
          q: '등비급수 $\\sum_{n=1}^{\\infty} 4\\left(\\frac{1}{3}\\right)^{n-1}$의 합을 구하십시오.',
          answer: '6',
          wrong: [
            { a: '2', why: '첫째항을 $4 \\times \\frac{1}{3}$로 보았습니다. $n=1$이면 $\\left(\\frac{1}{3}\\right)^0=1$이므로 첫째항은 4입니다.' },
            { a: '3', why: '$1-r$ 대신 $1+r$로 나누었습니다. 합은 $\\frac{a}{1-r}$입니다.' },
          ],
          explain: '첫째항 4, 공비 $\\frac{1}{3}$이고 $-1<\\frac{1}{3}<1$이므로 합은 $\\dfrac{4}{1-\\frac{1}{3}}=\\dfrac{4}{\\frac{2}{3}}=6$입니다.',
        },
      },
      {
        title: '등비급수로 순환소수 나타내기',
        body: '순환소수는 등비급수로 볼 수 있습니다.\n\n$0.272727\\cdots=0.27+0.0027+0.000027+\\cdots$\n\n첫째항이 $\\frac{27}{100}$, 공비가 $\\frac{1}{100}$인 등비급수이므로\n\n$0.272727\\cdots=\\dfrac{\\frac{27}{100}}{1-\\frac{1}{100}}=\\frac{27}{99}=\\frac{3}{11}$\n\n순환하지 않는 부분이 있으면 그 부분을 따로 떼어 냅니다.\n\n$0.1666\\cdots=\\frac{1}{10}+\\left(\\frac{6}{100}+\\frac{6}{1000}+\\cdots\\right)=\\frac{1}{10}+\\dfrac{\\frac{6}{100}}{1-\\frac{1}{10}}=\\frac{1}{10}+\\frac{1}{15}=\\frac{1}{6}$\n\n같은 방법으로 $0.999\\cdots=\\dfrac{\\frac{9}{10}}{1-\\frac{1}{10}}=1$입니다.\n\n> 💡 중학교에서 순환소수를 분수로 고칠 때 쓴 "순환마디를 9로 이루어진 수로 나눈다"는 방법은 바로 이 등비급수의 합에서 나옵니다.',
        easy: '$0.272727\\cdots$은 "0.27을 놓고, 그 100분의 1을 놓고, 또 그 100분의 1을 놓고 …" 한 것을 모두 더한 것입니다. 같은 비율로 계속 줄어드는 양을 더하니 등비급수이지요.\n\n그래서 첫째항 $\\frac{27}{100}$과 공비 $\\frac{1}{100}$만 찾으면 공식 $\\frac{a}{1-r}$로 한 번에 분수가 됩니다.',
        check: {
          type: 'choice',
          q: '순환소수 $0.444\\cdots$를 분수로 나타낸 것은 무엇입니까?',
          choices: ['$\\frac{4}{9}$', '$\\frac{2}{5}$', '$\\frac{4}{11}$'],
          answer: 0,
          why: ['', '$\\frac{2}{5}=0.4$로 첫째항만 더한 값입니다. 뒤에 이어지는 $0.04+0.004+\\cdots$도 더해야 합니다.', '$\\frac{4}{11}=0.3636\\cdots$입니다. 순환마디가 한 자리이므로 공비는 $\\frac{1}{10}$입니다.'],
          explain: '$0.444\\cdots=0.4+0.04+0.004+\\cdots$는 첫째항 $\\frac{4}{10}$, 공비 $\\frac{1}{10}$인 등비급수이므로 $\\dfrac{\\frac{4}{10}}{1-\\frac{1}{10}}=\\frac{4}{9}$입니다.',
        },
      },
      {
        title: '닮은 도형이 한없이 반복될 때',
        body: '같은 규칙으로 닮은 도형을 한없이 그려 나가면, 도형의 길이나 넓이가 등비수열을 이룹니다. 그 합은 등비급수로 구합니다.\n\n1. 첫 번째 도형의 길이(또는 넓이)를 구해 **첫째항**으로 합니다.\n2. 앞 도형과 다음 도형의 **닮음비**를 구합니다. 길이의 공비는 닮음비 $k$, 넓이의 공비는 $k^2$입니다.\n3. 공비가 $-1<r<1$이면 합은 $\\frac{a}{1-r}$입니다.\n\n예: 한 변의 길이가 4인 정사각형의 각 변의 중점을 이어 새 정사각형을 만드는 일을 한없이 되풀이합니다. 새 정사각형의 한 변은 $2\\sqrt{2}$이므로 닮음비는 $\\frac{2\\sqrt{2}}{4}=\\frac{\\sqrt{2}}{2}$, 넓이의 공비는 $\\left(\\frac{\\sqrt{2}}{2}\\right)^2=\\frac{1}{2}$입니다. 모든 정사각형의 넓이의 합은 $\\dfrac{16}{1-\\frac{1}{2}}=32$입니다.\n\n> ⚠️ 닮음비가 $k$일 때 넓이의 비는 $k$가 아니라 $k^2$입니다.',
        easy: '복사기로 그림을 계속 축소 복사한다고 생각해 보십시오. 가로와 세로가 매번 절반이 되면, 넓이는 절반의 절반, 곧 $\\frac{1}{4}$배가 됩니다.\n\n그래서 길이를 더할 때는 공비가 $\\frac{1}{2}$, 넓이를 더할 때는 공비가 $\\frac{1}{4}$인 등비급수가 됩니다.',
        fig: FIG_SQUARES,
        check: {
          type: 'choice',
          q: '반복되는 닮은 도형에서 앞 도형과 다음 도형의 길이의 닮음비가 $1:\\frac{1}{3}$일 때, 넓이의 공비는 무엇입니까?',
          choices: ['$\\frac{1}{9}$', '$\\frac{1}{3}$', '$\\frac{2}{3}$'],
          answer: 0,
          why: ['', '길이의 공비를 그대로 썼습니다. 넓이의 비는 닮음비의 제곱입니다.', '$1-\\frac{1}{3}$을 계산했습니다. 넓이의 공비는 $\\left(\\frac{1}{3}\\right)^2$입니다.'],
          explain: '넓이의 비는 닮음비의 제곱이므로 공비는 $\\left(\\frac{1}{3}\\right)^2=\\frac{1}{9}$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '급수 $\\sum_{n=1}^{\\infty}\\dfrac{1}{(2n-1)(2n+1)}$의 합을 구하십시오.',
        steps: [
          '일반항을 두 분수의 차로 나눕니다. $\\dfrac{1}{(2n-1)(2n+1)}=\\dfrac{1}{2}\\left(\\dfrac{1}{2n-1}-\\dfrac{1}{2n+1}\\right)$',
          '부분합을 구하면 가운데 항이 서로 지워집니다. $S_n=\\frac{1}{2}\\left\\{\\left(1-\\frac{1}{3}\\right)+\\left(\\frac{1}{3}-\\frac{1}{5}\\right)+\\cdots+\\left(\\frac{1}{2n-1}-\\frac{1}{2n+1}\\right)\\right\\}=\\frac{1}{2}\\left(1-\\frac{1}{2n+1}\\right)$',
          '급수의 합은 $\\lim_{n \\to \\infty} S_n=\\frac{1}{2}(1-0)=\\frac{1}{2}$입니다.',
        ],
        answer: '$\\frac{1}{2}$',
      },
      {
        q: '급수 $\\sum_{n=1}^{\\infty}\\dfrac{2^n-1}{3^n}$의 합을 구하십시오.',
        steps: [
          '$\\dfrac{2^n-1}{3^n}=\\left(\\frac{2}{3}\\right)^n-\\left(\\frac{1}{3}\\right)^n$으로 나눕니다.',
          '$\\sum\\left(\\frac{2}{3}\\right)^n$은 첫째항 $\\frac{2}{3}$, 공비 $\\frac{2}{3}$이므로 합이 $\\dfrac{\\frac{2}{3}}{1-\\frac{2}{3}}=2$입니다.',
          '$\\sum\\left(\\frac{1}{3}\\right)^n$은 첫째항 $\\frac{1}{3}$, 공비 $\\frac{1}{3}$이므로 합이 $\\dfrac{\\frac{1}{3}}{1-\\frac{1}{3}}=\\frac{1}{2}$입니다.',
          '두 급수가 모두 수렴하므로 급수의 성질에 의해 합은 $2-\\frac{1}{2}=\\frac{3}{2}$입니다.',
        ],
        answer: '$\\frac{3}{2}$',
      },
      {
        q: '순환소수 $0.2333\\cdots$를 등비급수를 이용하여 분수로 나타내십시오.',
        steps: [
          '순환하지 않는 부분 $0.2$를 떼어 냅니다. $0.2333\\cdots=\\frac{2}{10}+(0.03+0.003+\\cdots)$',
          '괄호 안은 첫째항 $\\frac{3}{100}$, 공비 $\\frac{1}{10}$인 등비급수이므로 합이 $\\dfrac{\\frac{3}{100}}{1-\\frac{1}{10}}=\\frac{3}{90}=\\frac{1}{30}$입니다.',
          '따라서 $\\frac{2}{10}+\\frac{1}{30}=\\frac{6}{30}+\\frac{1}{30}=\\frac{7}{30}$입니다.',
        ],
        answer: '$\\frac{7}{30}$',
      },
    ],

    terms: [
      { term: '급수', def: '수열의 각 항을 차례로 한없이 더한 식입니다. $\\sum_{n=1}^{\\infty} a_n$으로 나타냅니다.' },
      { term: '부분합', def: '급수에서 첫째항부터 제$n$항까지의 합 $S_n$입니다. 급수의 합은 부분합의 극한으로 정합니다.' },
      { term: '급수의 합', def: '부분합의 수열 $\\{S_n\\}$이 수렴할 때의 극한값 $S$입니다. $\\sum_{n=1}^{\\infty} a_n=S$로 씁니다.' },
      { term: '급수의 발산', def: '부분합의 수열 $\\{S_n\\}$이 발산하는 것입니다. 일반항이 0에 수렴하지 않는 급수는 발산합니다.' },
      { term: '등비급수', def: '등비수열의 급수 $a+ar+ar^2+\\cdots$입니다. $a \\ne 0$이면 $-1<r<1$일 때만 수렴하고 합은 $\\frac{a}{1-r}$입니다.' },
      { term: '순환소수', def: '소수점 아래에서 같은 숫자의 배열이 끝없이 되풀이되는 소수입니다. 등비급수의 합으로 분수로 나타낼 수 있습니다. 예: $0.333\\cdots=\\frac{1}{3}$' },
      { term: '닮음비', def: '닮은 두 도형에서 대응하는 길이의 비입니다. 닮음비가 $k$이면 넓이의 비는 $k^2$입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '급수 $\\sum_{n=1}^{\\infty} a_n$의 첫째항부터 제$n$항까지의 합이 $S_n=\\dfrac{2n}{n+1}$일 때, 이 급수의 합을 구하십시오.',
        answer: '2',
        wrong: [{ a: '0', why: '일반항 $a_n$의 극한을 생각했습니다. 급수의 합은 부분합 $S_n$의 극한입니다.' }],
        explain: '급수의 합은 $\\lim_{n \\to \\infty} S_n=\\lim_{n \\to \\infty}\\dfrac{2n}{n+1}=2$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 0,
        q: '급수 $\\sum_{n=1}^{\\infty} 3\\left(\\frac{1}{n}-\\frac{1}{n+1}\\right)$의 합을 구하십시오.',
        answer: '3',
        wrong: [{ a: '0', why: '$\\frac{1}{n}$과 $\\frac{1}{n+1}$이 0으로 가는 것은 일반항이 0으로 간다는 뜻일 뿐입니다. 부분합을 먼저 구해야 합니다.' }],
        hint: '부분합을 써 보면 가운데 항이 서로 지워집니다.',
        explain: '부분합은 $S_n=3\\left\\{\\left(1-\\frac{1}{2}\\right)+\\left(\\frac{1}{2}-\\frac{1}{3}\\right)+\\cdots+\\left(\\frac{1}{n}-\\frac{1}{n+1}\\right)\\right\\}=3\\left(1-\\frac{1}{n+1}\\right)$이므로 급수의 합은 $3$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 1,
        q: '급수 $\\sum_{n=1}^{\\infty}\\dfrac{n}{2n+1}$은 발산합니다.',
        answer: true,
        explain: '$\\lim_{n \\to \\infty}\\dfrac{n}{2n+1}=\\frac{1}{2} \\ne 0$입니다. 일반항이 0에 수렴하지 않으므로 급수는 발산합니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 1,
        q: '다음 중 **발산하는** 급수는 무엇입니까?',
        choices: [
          '$\\sum_{n=1}^{\\infty}\\frac{n+1}{n}$',
          '$\\sum_{n=1}^{\\infty}\\left(\\frac{1}{2}\\right)^n$',
          '$\\sum_{n=1}^{\\infty}\\left(\\frac{1}{n}-\\frac{1}{n+1}\\right)$',
          '$\\sum_{n=1}^{\\infty}\\left(-\\frac{1}{3}\\right)^n$',
        ],
        answer: 0,
        why: [
          '',
          '공비가 $\\frac{1}{2}$인 등비급수이므로 1에 수렴합니다.',
          '부분합이 $1-\\frac{1}{n+1}$이므로 1에 수렴합니다.',
          '공비가 $-\\frac{1}{3}$이고 $-1<-\\frac{1}{3}<1$이므로 수렴합니다.',
        ],
        explain: '$\\frac{n+1}{n} \\to 1 \\ne 0$이므로 $\\sum\\frac{n+1}{n}$은 발산합니다. 나머지는 모두 수렴합니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 3,
        q: '등비급수 $\\sum_{n=1}^{\\infty} 3\\left(\\frac{1}{2}\\right)^{n-1}$의 합을 구하십시오.',
        answer: '6',
        wrong: [
          { a: '3', why: '첫째항을 $3 \\times \\frac{1}{2}$로 보았습니다. $n=1$이면 $\\left(\\frac{1}{2}\\right)^0=1$이므로 첫째항은 3입니다.' },
          { a: '2', why: '$1-r$ 대신 $1+r$로 나누었습니다. 합은 $\\frac{a}{1-r}$입니다.' },
        ],
        explain: '첫째항 3, 공비 $\\frac{1}{2}$이므로 합은 $\\dfrac{3}{1-\\frac{1}{2}}=6$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 3,
        q: '등비급수 $\\sum_{n=1}^{\\infty}\\left(\\frac{2}{3}\\right)^n$의 합을 구하십시오.',
        answer: '2',
        wrong: [{ a: '3', why: '첫째항을 1로 보았습니다. $n=1$을 넣으면 첫째항은 $\\frac{2}{3}$입니다.' }],
        explain: '첫째항 $\\frac{2}{3}$, 공비 $\\frac{2}{3}$이므로 합은 $\\dfrac{\\frac{2}{3}}{1-\\frac{2}{3}}=\\dfrac{\\frac{2}{3}}{\\frac{1}{3}}=2$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 4,
        q: '순환소수 $0.272727\\cdots$를 분수로 나타낸 것은 무엇입니까?',
        choices: ['$\\frac{3}{11}$', '$\\frac{27}{100}$', '$\\frac{3}{10}$', '$\\frac{27}{999}$'],
        answer: 0,
        why: [
          '',
          '첫째항 $0.27$만 나타냈습니다. 뒤에 이어지는 $0.0027+0.000027+\\cdots$도 더해야 합니다.',
          '$\\frac{3}{10}=0.3$입니다. 순환마디가 27인 두 자리이므로 공비는 $\\frac{1}{100}$입니다.',
          '순환마디가 두 자리이므로 공비는 $\\frac{1}{1000}$이 아니라 $\\frac{1}{100}$입니다. 분모는 99입니다.',
        ],
        explain: '$0.272727\\cdots=0.27+0.0027+\\cdots$는 첫째항 $\\frac{27}{100}$, 공비 $\\frac{1}{100}$인 등비급수이므로 $\\dfrac{\\frac{27}{100}}{1-\\frac{1}{100}}=\\frac{27}{99}=\\frac{3}{11}$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 3,
        q: '급수 $\\sum_{n=1}^{\\infty}\\left(\\frac{x-2}{3}\\right)^n$이 수렴하도록 하는 실수 $x$의 값의 범위는 무엇입니까?',
        choices: ['$-1<x<5$', '$-1<x \\le 5$', '$-1 \\le x \\le 5$', '$-5<x<1$'],
        answer: 0,
        why: [
          '',
          '$x=5$이면 공비가 1이 되어 $1+1+1+\\cdots$로 발산합니다. 등비수열과 달리 등비급수는 $r=1$에서 발산합니다.',
          '공비가 1 또는 $-1$이면 등비급수는 발산합니다. 양 끝은 빼야 합니다.',
          '부등식 $-3<x-2<3$의 각 변에 2를 더해야 하는데 뺐습니다.',
        ],
        hint: '첫째항과 공비가 모두 $\\frac{x-2}{3}$입니다. 첫째항이 0인 경우도 생각해 보십시오.',
        explain: '첫째항과 공비가 모두 $\\frac{x-2}{3}$입니다. 첫째항이 0이면($x=2$) 0에 수렴하고, 0이 아니면 $-1<\\frac{x-2}{3}<1$이어야 합니다. $-3<x-2<3$에서 $-1<x<5$이고, $x=2$도 이 범위에 들어 있으므로 답은 $-1<x<5$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 2,
        q: '두 급수 $\\sum_{n=1}^{\\infty}(a_n+b_n)$, $\\sum_{n=1}^{\\infty}(a_n-b_n)$이 각각 5, 1에 수렴할 때, $\\sum_{n=1}^{\\infty}(3a_n-b_n)$의 값을 구하십시오.',
        answer: '7',
        hint: '$a_n=\\frac{1}{2}\\{(a_n+b_n)+(a_n-b_n)\\}$으로 나타내 보십시오.',
        wrong: [{ a: '11', why: '$\\sum b_n$을 $-2$로 보았습니다. $\\sum b_n=\\frac{5-1}{2}=2$입니다.' }],
        explain: '$a_n=\\frac{1}{2}\\{(a_n+b_n)+(a_n-b_n)\\}$이므로 $\\sum a_n=\\frac{5+1}{2}=3$, 같은 방법으로 $\\sum b_n=\\frac{5-1}{2}=2$입니다(수렴하는 급수의 합과 차이므로 수렴합니다). 따라서 $\\sum(3a_n-b_n)=9-2=7$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 1,
        q: '급수 $\\sum_{n=1}^{\\infty}(a_n-3)$이 수렴할 때, $\\lim_{n \\to \\infty}\\dfrac{2a_n+1}{a_n-1}$의 값을 구하십시오.',
        answer: '7/2',
        hint: '급수가 수렴하면 일반항은 0에 수렴합니다.',
        wrong: [{ a: '-1', why: '$a_n \\to 0$으로 보았습니다. 0에 수렴하는 것은 일반항 $a_n-3$이므로 $a_n \\to 3$입니다.' }],
        explain: '급수가 수렴하므로 $\\lim(a_n-3)=0$, 곧 $\\lim a_n=3$입니다. 따라서 $\\dfrac{2 \\times 3+1}{3-1}=\\frac{7}{2}$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 5,
        q: '한 변의 길이가 4인 정사각형이 있습니다. 이 정사각형의 각 변의 중점을 이어 새 정사각형을 그리고, 새 정사각형의 각 변의 중점을 이어 또 정사각형을 그리는 과정을 한없이 되풀이합니다. 처음 정사각형을 포함하여 그려진 모든 정사각형의 넓이의 합을 구하십시오.',
        fig: FIG_SQUARES,
        answer: '32',
        hint: '두 번째 정사각형의 넓이는 첫 번째 정사각형의 넓이의 몇 배인지 구해 보십시오.',
        wrong: [
          { a: '64/3', why: '넓이의 공비를 $\\frac{1}{4}$로 보았습니다. 새 정사각형의 한 변은 $2\\sqrt{2}$이므로 넓이는 8, 공비는 $\\frac{1}{2}$입니다.' },
          { a: '16', why: '처음 정사각형을 빼고 더했습니다. 첫째항은 처음 정사각형의 넓이 16입니다.' },
        ],
        explain: '처음 정사각형의 넓이는 16입니다. 각 변의 중점을 이은 정사각형의 한 변은 $\\sqrt{2^2+2^2}=2\\sqrt{2}$이므로 넓이는 8, 곧 넓이의 공비는 $\\frac{1}{2}$입니다. 넓이의 합은 $\\dfrac{16}{1-\\frac{1}{2}}=32$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 3,
        q: '급수 $\\sum_{n=1}^{\\infty}\\dfrac{2^n+3^n}{6^n}$의 합을 구하십시오.',
        answer: '3/2',
        hint: '분수를 둘로 나누면 등비급수 두 개가 됩니다.',
        wrong: [{ a: '7/2', why: '두 등비급수의 첫째항을 1로 보았습니다. $n=1$부터이므로 첫째항은 각각 $\\frac{1}{3}$, $\\frac{1}{2}$입니다.' }],
        explain: '$\\dfrac{2^n+3^n}{6^n}=\\left(\\frac{1}{3}\\right)^n+\\left(\\frac{1}{2}\\right)^n$입니다. $\\sum\\left(\\frac{1}{3}\\right)^n=\\dfrac{\\frac{1}{3}}{1-\\frac{1}{3}}=\\frac{1}{2}$, $\\sum\\left(\\frac{1}{2}\\right)^n=\\dfrac{\\frac{1}{2}}{1-\\frac{1}{2}}=1$이고 둘 다 수렴하므로 합은 $\\frac{1}{2}+1=\\frac{3}{2}$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 3,
        q: '첫째항이 $a$, 공비가 $r$인 등비수열 $\\{a_n\\}$에 대하여 $\\sum_{n=1}^{\\infty} a_n=6$, $\\sum_{n=1}^{\\infty} a_n^{\\,2}=12$일 때, $a$의 값을 구하십시오.',
        answer: '3',
        hint: '$\\{a_n^{\\,2}\\}$은 첫째항이 $a^2$, 공비가 $r^2$인 등비수열입니다.',
        wrong: [{ a: '1/2', why: '공비 $r$의 값을 구했습니다. 문제는 첫째항 $a$를 묻습니다.' }],
        explain: '$\\frac{a}{1-r}=6$, $\\frac{a^2}{1-r^2}=12$입니다. $1-r^2=(1-r)(1+r)$이므로 둘째 식을 첫째 식으로 나누면 $\\frac{a}{1+r}=2$입니다.\n\n$a=6(1-r)$, $a=2(1+r)$에서 $6-6r=2+2r$, $r=\\frac{1}{2}$이고 $a=3$입니다. (확인: $\\frac{3}{1-\\frac{1}{2}}=6$, $\\frac{9}{1-\\frac{1}{4}}=12$)',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 5,
        q: '한 변의 길이가 1인 정사각형에 내접하는 원을 그리고, 그 원에 내접하는 정사각형, 다시 그 정사각형에 내접하는 원을 그리는 과정을 한없이 되풀이합니다. 그려진 모든 원의 넓이의 합은 무엇입니까?',
        fig: FIG_CIRCLES,
        choices: ['$\\frac{\\pi}{2}$', '$\\frac{\\pi}{4}$', '$\\frac{\\pi}{3}$', '$2\\pi$'],
        answer: 0,
        why: [
          '',
          '첫 번째 원의 넓이만 구했습니다. 다음 원들의 넓이도 모두 더해야 합니다.',
          '넓이의 공비를 $\\frac{1}{4}$로 보았습니다. 원에 내접하는 정사각형의 한 변은 $\\frac{\\sqrt{2}}{2}$이므로 길이의 닮음비가 $\\frac{\\sqrt{2}}{2}$, 넓이의 공비는 $\\frac{1}{2}$입니다.',
          '첫 번째 원의 반지름을 1로 보았습니다. 한 변이 1인 정사각형에 내접하는 원의 반지름은 $\\frac{1}{2}$입니다.',
        ],
        hint: '원에 내접하는 정사각형의 대각선은 원의 지름과 같습니다.',
        explain: '첫 번째 원의 반지름은 $\\frac{1}{2}$이므로 넓이는 $\\frac{\\pi}{4}$입니다. 이 원에 내접하는 정사각형은 대각선이 1이므로 한 변이 $\\frac{\\sqrt{2}}{2}$이고, 처음 정사각형과의 닮음비는 $\\frac{\\sqrt{2}}{2}$입니다. 따라서 원의 넓이의 공비는 $\\left(\\frac{\\sqrt{2}}{2}\\right)^2=\\frac{1}{2}$이고, 넓이의 합은 $\\dfrac{\\frac{\\pi}{4}}{1-\\frac{1}{2}}=\\frac{\\pi}{2}$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 3,
        q: '$\\sum_{n=1}^{\\infty}(2x-1)^n=\\frac{1}{3}$을 만족시키는 실수 $x$의 값을 구하십시오.',
        answer: '5/8',
        hint: '공비를 $r=2x-1$로 놓고 급수의 합을 $r$로 나타냅니다. 수렴 조건도 확인합니다.',
        wrong: [{ a: '1/4', why: '공비 $r=2x-1$의 값을 구했습니다. $2x-1=\\frac{1}{4}$에서 $x$를 구해야 합니다.' }],
        explain: '$r=2x-1$이라 하면 첫째항과 공비가 모두 $r$이므로, $-1<r<1$일 때 합은 $\\frac{r}{1-r}$입니다. $\\frac{r}{1-r}=\\frac{1}{3}$에서 $3r=1-r$, $r=\\frac{1}{4}$이고 이 값은 수렴 조건을 만족시킵니다. $2x-1=\\frac{1}{4}$이므로 $x=\\frac{5}{8}$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', unit: 'm', concept: 3,
        q: '높이가 10 m인 곳에서 공을 떨어뜨렸습니다. 공은 땅에 닿을 때마다 직전 높이의 $\\frac{3}{5}$만큼 튀어 오르는 일을 한없이 되풀이합니다. 공이 움직인 거리의 합은 몇 m입니까?',
        answer: '40',
        hint: '처음 떨어진 거리를 뺀 나머지는 "올라갔다 내려오는" 거리이므로 두 번씩 셉니다.',
        wrong: [
          { a: '25', why: '떨어지는 거리만 더했습니다. 튀어 오른 공은 같은 거리를 다시 내려오므로 튀어 오른 거리는 두 번씩 셉니다.' },
          { a: '50', why: '처음 떨어진 10 m까지 두 번 세었습니다. 처음에는 떨어지기만 합니다.' },
        ],
        explain: '처음에 10 m를 떨어지고, 그 뒤로는 $6$ m, $3.6$ m, … 만큼 올라갔다가 같은 거리를 내려옵니다. 튀어 오르는 높이의 합은 첫째항 6, 공비 $\\frac{3}{5}$인 등비급수이므로 $\\dfrac{6}{1-\\frac{3}{5}}=15$입니다. 따라서 움직인 거리의 합은 $10+2 \\times 15=40$ (m)입니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 1,
        q: '급수 $\\sum_{n=1}^{\\infty}\\dfrac{1}{\\sqrt{n+1}+\\sqrt{n}}$의 수렴, 발산을 바르게 말한 것은 무엇입니까?',
        choices: ['양의 무한대로 발산합니다.', '0에 수렴합니다.', '1에 수렴합니다.', '진동합니다.'],
        answer: 0,
        why: [
          '',
          '일반항이 0에 수렴한다고 급수가 0에 수렴하는 것은 아닙니다. 모든 항이 양수이므로 합은 0이 될 수 없습니다.',
          '부분합을 구해 보면 $S_n=\\sqrt{n+1}-1$입니다. 이 값은 1에 가까워지지 않습니다.',
          '모든 항이 양수이므로 부분합은 계속 커지기만 합니다. 진동하지 않습니다.',
        ],
        hint: '일반항의 분모를 유리화한 뒤 부분합을 구해 보십시오.',
        explain: '$\\dfrac{1}{\\sqrt{n+1}+\\sqrt{n}}=\\sqrt{n+1}-\\sqrt{n}$이므로 부분합은 $S_n=(\\sqrt{2}-1)+(\\sqrt{3}-\\sqrt{2})+\\cdots+(\\sqrt{n+1}-\\sqrt{n})=\\sqrt{n+1}-1$입니다. $S_n \\to \\infty$이므로 양의 무한대로 발산합니다. 일반항은 0에 수렴하지만 급수는 발산하는 예입니다.',
      },
    ],

    deeper: [
      {
        title: '조화급수는 왜 발산할까?',
        body: '$1+\\frac{1}{2}+\\frac{1}{3}+\\frac{1}{4}+\\cdots$을 **조화급수**라고 합니다. 일반항 $\\frac{1}{n}$은 0에 수렴하지만 이 급수는 발산합니다. 항을 다음과 같이 묶어 보면 알 수 있습니다.\n\n$1+\\frac{1}{2}+\\left(\\frac{1}{3}+\\frac{1}{4}\\right)+\\left(\\frac{1}{5}+\\frac{1}{6}+\\frac{1}{7}+\\frac{1}{8}\\right)+\\cdots$\n\n괄호 안의 각 항은 괄호의 마지막 항보다 크거나 같으므로, 괄호 하나의 합은 $\\frac{1}{4}+\\frac{1}{4}=\\frac{1}{2}$, $\\frac{1}{8} \\times 4=\\frac{1}{2}$처럼 늘 $\\frac{1}{2}$ 이상입니다. 괄호는 끝없이 만들 수 있으므로 $\\frac{1}{2}$을 끝없이 더한 것보다 크고, 부분합은 한없이 커집니다.\n\n이 결과는 14세기 무렵 유럽의 학자 오렘이 처음 보였다고 알려져 있습니다. "더하는 양이 0으로 간다"만으로는 수렴하지 않는다는 가장 유명한 예입니다.',
      },
      {
        title: '0.999…는 정말 1일까?',
        body: '$0.999\\cdots$는 "1보다 아주 조금 작은 수"처럼 보이지만, 정확히 1과 같습니다. 순환소수 $0.999\\cdots$는 급수 $0.9+0.09+0.009+\\cdots$이고, 이 급수의 합은 부분합 $0.9, 0.99, 0.999, \\cdots$의 극한입니다. 부분합은 $1-\\left(\\frac{1}{10}\\right)^n$이므로 그 극한은 정확히 1입니다.\n\n"끝없이 이어지는 소수"는 하나하나의 부분합이 아니라 그 극한을 나타내는 기호라는 점이 핵심입니다. 그래서 $0.999\\cdots=1$, $0.333\\cdots=\\frac{1}{3}$은 근삿값이 아니라 등식입니다.',
      },
    ],

    faq: [
      {
        q: 'aₙ이 0으로 가는데 왜 급수가 발산할 수 있나요?',
        a: '일반항이 0으로 가는 것은 급수가 수렴하기 위한 필요조건일 뿐입니다. 더하는 양이 0으로 줄어도 너무 천천히 줄면 조금씩 쌓여 한없이 커질 수 있습니다. $\\sum(\\sqrt{n+1}-\\sqrt{n})$이나 조화급수 $\\sum\\frac{1}{n}$이 그런 예입니다. 수렴 여부는 부분합의 극한으로 판단합니다.',
      },
      {
        q: '등비수열은 r=1일 때 수렴하는데 등비급수는 왜 발산하나요?',
        a: '수열 $\\{r^n\\}$은 $r=1$이면 $1, 1, 1, \\cdots$로 각 항이 1에 머물러 수렴합니다. 하지만 등비급수는 그 항들을 더하는 것이라서 $r=1$이면 $a+a+a+\\cdots$가 되고, 부분합 $na$가 한없이 커지거나 작아집니다($a \\ne 0$). 그래서 등비급수의 수렴 조건은 $-1<r<1$입니다.',
      },
      {
        q: '등비급수의 합 공식에서 첫째항은 어떻게 찾나요?',
        a: '시그마 기호 아래의 시작 번호를 일반항에 넣으면 됩니다. $\\sum_{n=1}^{\\infty} 3\\left(\\frac{1}{2}\\right)^{n-1}$의 첫째항은 $n=1$을 넣은 3이고, $\\sum_{n=1}^{\\infty}\\left(\\frac{1}{2}\\right)^n$의 첫째항은 $\\frac{1}{2}$입니다. 공비는 거듭제곱의 밑입니다.',
      },
      {
        q: '0.999…와 1은 정말 같은 수인가요?',
        a: '네, 같습니다. $0.999\\cdots=0.9+0.09+0.009+\\cdots$는 첫째항 $\\frac{9}{10}$, 공비 $\\frac{1}{10}$인 등비급수이므로 합은 $\\dfrac{\\frac{9}{10}}{1-\\frac{1}{10}}=1$입니다. 끝없는 소수는 부분합의 극한을 나타내므로 근삿값이 아니라 정확히 1입니다.',
      },
    ],

    mistakes: [
      '$\\sum_{n=1}^{\\infty}\\left(\\frac{1}{2}\\right)^n$의 첫째항을 1로 보아 합을 2라고 하는 실수 — $n=1$을 넣으면 첫째항은 $\\frac{1}{2}$이고 합은 1입니다.',
      '$\\lim a_n=0$이므로 급수 $\\sum a_n$이 수렴한다고 판단하는 실수 — 역은 성립하지 않습니다. 부분합을 구해 확인합니다.',
      '등비급수의 수렴 조건을 등비수열처럼 $-1<r \\le 1$로 쓰는 실수 — 등비급수는 $r=1$이면 발산하므로 $-1<r<1$입니다(첫째항이 0이 아닐 때).',
    ],

    gens: [
      {
        id: 'geo-series-sum',
        level: 1,
        title: '등비급수의 합',
        make: function (R) {
          var q = R.int(2, 5), p = R.nonzero(1 - q, q - 1);
          var r = R.F(p, q);
          var a = R.nonzero(-4, 9);
          var kind = R.pick(['n-1', 'n', 'terms']);
          var rTex = R.fmt.frac(r);
          var rP = '\\left(' + rTex + '\\right)';
          var aTex = a === 1 ? '' : a === -1 ? '-' : String(a);
          var first = kind === 'n' ? r.mul(a) : R.F(a);
          var one = R.F(1);
          var ans = first.div(one.sub(r));
          function sg(f, lead) { var t = R.fmt.frac(f); return lead || t.charAt(0) === '-' ? t : '+' + t; }
          var series;
          // 이어지는 넷째 항의 부호에 맞춰 +⋯ 또는 −⋯ 로 쓴다 (예: −1−1/2−1/4−⋯)
          if (kind === 'terms') series = sg(R.F(a), true) + sg(r.mul(a)) + sg(r.mul(r).mul(a)) + (r.mul(r).mul(r).mul(a).sign() < 0 ? '-' : '+') + '\\cdots';
          else series = '\\sum_{n=1}^{\\infty}' + aTex + rP + '^{' + kind + '}';
          var wrongs = [];
          if (kind === 'n') wrongs.push([R.F(a).div(one.sub(r)), '첫째항을 $' + a + '$' + R.josa(Math.abs(a), '으로/로') + ' 보았습니다. $n=1$을 넣으면 첫째항은 $' + R.fmt.frac(first) + '$입니다.']);
          if (kind === 'n-1') wrongs.push([r.mul(a).div(one.sub(r)), '첫째항을 $' + a + ' \\times ' + rP + '$' + R.josa(Math.abs(r.num), '으로/로') + ' 보았습니다. $n=1$이면 지수가 0이므로 첫째항은 $' + a + '$입니다.']);
          if (p > 0) wrongs.push([first.div(one.add(r)), '$1-r$ 대신 $1+r$로 나누었습니다. 합은 $\\frac{a}{1-r}$입니다.']);
          else wrongs.push([first.div(one.sub(r.abs())), '공비의 부호를 놓쳤습니다. 공비가 $' + rTex + '$이므로 분모는 $1-\\left(' + rTex + '\\right)$입니다.']);
          var den = '1' + (p < 0 ? '+' + R.fmt.frac(r.abs()) : '-' + rTex);
          return {
            type: 'short', check: 'number', concept: 3,
            q: '등비급수 $' + series + '$의 합을 구하십시오.',
            answer: ans.toString(),
            wrong: dedupe(R, ans, wrongs),
            explain: '첫째항 $' + R.fmt.frac(first) + '$, 공비 $' + rTex + '$이고 $-1<' + rTex + '<1$이므로 수렴합니다. 합은 $\\dfrac{' + R.fmt.frac(first) + '}{' + den + '}=' + R.fmt.frac(ans) + '$입니다.',
          };
        },
      },
      {
        id: 'repeating-decimal',
        level: 2,
        title: '등비급수로 순환소수를 분수로 나타내기',
        make: function (R) {
          var kind = R.pick(['one', 'two', 'two', 'mixed', 'mixed']);
          var dec, ans, wrongs = [], explain;
          if (kind === 'one') {
            var d = R.int(1, 8);
            dec = '0.' + d + d + d + d + d + d;
            ans = R.F(d, 9);
            wrongs.push([R.F(d, 10), '첫째항 $0.' + d + '$만 나타냈습니다. 뒤에 이어지는 항도 모두 더해야 합니다.']);
            wrongs.push([R.F(d, 90), '첫째항을 $\\frac{' + d + '}{100}$' + R.josa(d, '으로/로') + ' 보았습니다. 첫째항은 $\\frac{' + d + '}{10}$입니다.']);
            explain = '$' + dec + '\\cdots=\\frac{' + d + '}{10}+\\frac{' + d + '}{100}+\\cdots$는 첫째항 $\\frac{' + d + '}{10}$, 공비 $\\frac{1}{10}$인 등비급수이므로 $\\dfrac{\\frac{' + d + '}{10}}{1-\\frac{1}{10}}=\\frac{' + d + '}{9}' + (R.F(d, 9).den === 9 ? '' : '=' + R.fmt.frac(ans)) + '$입니다.';
          } else if (kind === 'two') {
            var ab = R.int(10, 98);
            if (ab % 11 === 0) ab += 1;
            dec = '0.' + ab + ab + ab;
            ans = R.F(ab, 99);
            wrongs.push([R.F(ab, 100), '첫째항 $0.' + ab + '$만 나타냈습니다. 뒤에 이어지는 항도 모두 더해야 합니다.']);
            wrongs.push([R.F(ab, 90), '공비를 $\\frac{1}{10}$로 보았습니다. 순환마디가 두 자리이므로 공비는 $\\frac{1}{100}$입니다.']);
            explain = '$' + dec + '\\cdots=\\frac{' + ab + '}{100}+\\frac{' + ab + '}{10000}+\\cdots$는 첫째항 $\\frac{' + ab + '}{100}$, 공비 $\\frac{1}{100}$인 등비급수이므로 $\\dfrac{\\frac{' + ab + '}{100}}{1-\\frac{1}{100}}=\\frac{' + ab + '}{99}' + (R.F(ab, 99).den === 99 ? '' : '=' + R.fmt.frac(ans)) + '$입니다.';
          } else {
            var a = R.int(1, 9), b = R.int(1, 8);
            if (b === a) b = a === 8 ? 7 : a + 1;
            if (b === 9) b = 7;
            dec = '0.' + a + b + b + b + b + b;
            ans = R.F(9 * a + b, 90);
            wrongs.push([R.F(10 * a + b, 90), '순환하지 않는 부분 $\\frac{' + a + '}{10}$' + R.josa(a, '을/를') + ' 따로 떼어 내지 않고 계산했습니다.']);
            wrongs.push([R.F(10 * a + b, 99), '$0.' + a + b + a + b + '\\cdots$처럼 두 자리가 순환한다고 보았습니다. 순환하는 것은 ' + b + '뿐입니다.']);
            wrongs.push([R.F(10 * a + b, 100), '처음 두 자리 $0.' + a + b + '$만 나타냈습니다.']);
            explain = '순환하지 않는 부분을 떼어 내면 $' + dec + '\\cdots=\\frac{' + a + '}{10}+\\left(\\frac{' + b + '}{100}+\\frac{' + b + '}{1000}+\\cdots\\right)$입니다. 괄호 안은 첫째항 $\\frac{' + b + '}{100}$, 공비 $\\frac{1}{10}$인 등비급수이므로 합은 $\\dfrac{\\frac{' + b + '}{100}}{1-\\frac{1}{10}}=\\frac{' + b + '}{90}$입니다.\n\n따라서 $\\frac{' + a + '}{10}+\\frac{' + b + '}{90}=\\frac{' + (9 * a + b) + '}{90}' + (R.F(9 * a + b, 90).den === 90 ? '' : '=' + R.fmt.frac(ans)) + '$입니다.';
          }
          return {
            type: 'short', check: 'number', concept: 4,
            q: '다음 순환소수를 등비급수를 이용하여 분수로 나타내십시오.\n\n$' + dec + '\\cdots$',
            answer: ans.toString(),
            wrong: dedupe(R, ans, wrongs),
            explain: explain,
          };
        },
      },
      {
        id: 'telescoping',
        level: 2,
        title: '부분분수로 급수의 합 구하기',
        make: function (R) {
          var kind = R.pick(['A', 'A', 'B', 'C']);
          var c = R.int(1, 6);
          var cTex = c === 1 ? '' : String(c);
          function nT(k) { return k === 0 ? 'n' : 'n+' + k; }
          var den, ans, wrongs = [], explain;
          // B·C형의 앞 계수 c/2 를 약분해 보인다 (2/2 → 생략, 4/2 → 2)
          var half = R.F(c, 2), halfTex = half.eq(R.F(1)) ? '' : R.fmt.frac(half);
          if (kind === 'A') {
            var p = R.int(0, 3);
            den = p === 0 ? 'n(n+1)' : '(' + nT(p) + ')(' + nT(p + 1) + ')';
            ans = R.F(c, p + 1);
            if (p > 0) wrongs.push([R.F(c), '부분합에서 남는 첫 항은 $n=1$을 넣은 $\\frac{1}{' + (p + 1) + '}$입니다. 1로 보면 안 됩니다.']);
            wrongs.push([R.F(0), '일반항이 0으로 가는 것과 급수의 합을 혼동했습니다. 부분합을 먼저 구합니다.']);
            explain = '$\\dfrac{' + c + '}{' + den + '}=' + cTex + '\\left(\\dfrac{1}{' + nT(p) + '}-\\dfrac{1}{' + nT(p + 1) + '}\\right)$이므로 부분합은 가운데 항이 지워져 $S_n=' + cTex + '\\left(\\dfrac{1}{' + (p + 1) + '}-\\dfrac{1}{' + nT(p + 1) + '}\\right)$입니다. 따라서 합은 $' + R.fmt.frac(ans) + '$입니다.';
            explain = explain.replace('\\dfrac{1}{1}-', '1-');
          } else if (kind === 'B') {
            den = 'n(n+2)';
            ans = R.F(3 * c, 4);
            wrongs.push([R.F(c, 2), '지워지지 않고 남는 앞쪽 항은 $1$과 $\\frac{1}{2}$ 두 개입니다. $\\frac{1}{2}$을 빠뜨렸습니다.']);
            wrongs.push([R.F(3 * c, 2), '$\\frac{1}{n(n+2)}=\\frac{1}{2}\\left(\\frac{1}{n}-\\frac{1}{n+2}\\right)$에서 앞의 $\\frac{1}{2}$을 곱하지 않았습니다.']);
            explain = '$\\dfrac{' + c + '}{n(n+2)}=' + halfTex + '\\left(\\dfrac{1}{n}-\\dfrac{1}{n+2}\\right)$입니다. 부분합을 쓰면 두 칸씩 떨어진 항이 지워져\n\n$S_n=' + halfTex + '\\left(1+\\dfrac{1}{2}-\\dfrac{1}{n+1}-\\dfrac{1}{n+2}\\right)$\n\n이므로 합은 $' + (halfTex === '' ? '1+\\frac{1}{2}=' : halfTex + ' \\times \\frac{3}{2}=') + R.fmt.frac(ans) + '$입니다.';
          } else {
            den = '(2n-1)(2n+1)';
            ans = R.F(c, 2);
            wrongs.push([R.F(c), '$\\frac{1}{(2n-1)(2n+1)}=\\frac{1}{2}\\left(\\frac{1}{2n-1}-\\frac{1}{2n+1}\\right)$에서 앞의 $\\frac{1}{2}$을 곱하지 않았습니다.']);
            wrongs.push([R.F(0), '일반항이 0으로 가는 것과 급수의 합을 혼동했습니다. 부분합을 먼저 구합니다.']);
            explain = '$\\dfrac{' + c + '}{(2n-1)(2n+1)}=' + halfTex + '\\left(\\dfrac{1}{2n-1}-\\dfrac{1}{2n+1}\\right)$이므로 부분합은 $S_n=' + halfTex + '\\left(1-\\dfrac{1}{2n+1}\\right)$입니다. 따라서 합은 $' + R.fmt.frac(ans) + '$입니다.';
          }
          return {
            type: 'short', check: 'number', concept: 0,
            q: '급수 $\\sum_{n=1}^{\\infty}\\dfrac{' + c + '}{' + den + '}$의 합을 구하십시오.',
            answer: ans.toString(),
            hint: '일반항을 두 분수의 차로 나눈 뒤 부분합을 구합니다.',
            wrong: dedupe(R, ans, wrongs),
            explain: explain,
          };
        },
      },
      {
        id: 'bounce-ratio',
        level: 3,
        title: '튀어 오르는 공: 움직인 거리로 비율 구하기',
        make: function (R) {
          var pq = R.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [4, 5]]);
          var p = pq[0], q = pq[1];
          var k = R.int(2, 8);
          var h = (q - p) * k;
          var T = k * (q + p);
          var ans = R.F(p, q);
          var wrongs = [[R.F(T - h, T), '튀어 오른 공이 같은 거리를 다시 내려오는 것을 빠뜨렸습니다. 튀어 오른 거리는 두 번씩 셉니다.']];
          var w2 = R.F(T - 2 * h, T);
          if (w2.sign() > 0) wrongs.push([w2, '처음 떨어진 거리까지 두 번 세었습니다. 처음에는 떨어지기만 합니다.']);
          return {
            type: 'short', check: 'number', concept: 3,
            q: '높이가 ' + h + ' m인 곳에서 공을 떨어뜨렸습니다. 공은 땅에 닿을 때마다 직전 높이의 $r$배만큼 튀어 오르는 일을 한없이 되풀이합니다 ($0<r<1$). 공이 움직인 거리의 합이 ' + T + ' m일 때, $r$의 값을 구하십시오.',
            answer: ans.toString(),
            hint: '움직인 거리의 합을 $r$로 나타내 보십시오. 처음 떨어진 거리를 뺀 나머지는 두 번씩 셉니다.',
            wrong: dedupe(R, ans, wrongs),
            explain: '처음에 ' + h + ' m를 떨어지고, 그 뒤로 $' + h + 'r$, $' + h + 'r^2$, … 만큼 올라갔다가 같은 거리를 내려옵니다. 튀어 오른 높이의 합은 $\\frac{' + h + 'r}{1-r}$이므로 움직인 거리의 합은\n\n$' + h + '+\\dfrac{' + (2 * h) + 'r}{1-r}=\\dfrac{' + h + '(1+r)}{1-r}$\n\n입니다. $\\dfrac{' + h + '(1+r)}{1-r}=' + T + '$에서 $' + h + '+' + h + 'r=' + T + '-' + T + 'r$, $' + (h + T) + 'r=' + (T - h) + '$이므로 $r=' + R.fmt.frac(ans) + '$입니다.',
          };
        },
      },
    ],
  });
})();
