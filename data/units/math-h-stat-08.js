/* 확률과 통계 · 확률변수와 확률분포
 * 확률변수와 확률분포의 뜻, 이산확률변수의 확률분포(표·확률질량함수), 기댓값(평균) E(X),
 * 분산 V(X)와 표준편차 σ(X), aX+b의 평균·분산·표준편차. */
(function () {
  // 확률분포 표 (values: 수 배열, probs: Frac 배열)
  function distTable(R, values, probs) {
    return '| $X$ | ' + values.join(' | ') + ' | 합계 |\n|' + values.map(function () { return '---|'; }).join('') + '---|---|\n' +
      '| $P(X=x)$ | ' + probs.map(function (p) { return '$' + R.fmt.frac(p) + '$'; }).join(' | ') + ' | 1 |';
  }
  // d 를 k 개의 양의 정수로 나누기 (합 d)
  function splitInto(R, d, k) {
    var cut = R.sample(range(1, d - 1), k - 1).sort(function (a, b) { return a - b; });
    var out = [], prev = 0;
    for (var i = 0; i < cut.length; i++) { out.push(cut[i] - prev); prev = cut[i]; }
    out.push(d - prev);
    return out;
  }
  function range(a, b) { var r = []; for (var i = a; i <= b; i++) r.push(i); return r; }
  // E·E(X^2)·V 계산 (Frac)
  function moments(F, values, probs) {
    var e = F(0), e2 = F(0);
    for (var i = 0; i < values.length; i++) {
      e = e.add(probs[i].mul(values[i]));
      e2 = e2.add(probs[i].mul(values[i] * values[i]));
    }
    return { e: e, e2: e2, v: e2.sub(e.mul(e)) };
  }
  function sumTex(R, values, probs, sq) {
    return values.map(function (x, i) {
      var xv = sq ? (x < 0 ? '(' + x + ')^{2}' : x + '^{2}') : R.fmt.paren(x);
      return xv + '\\times' + R.fmt.frac(probs[i]);
    }).join('+');
  }

  Tutor.registerUnit({
    id: 'math-h-stat-08',
    course: 'math-h-stat',
    title: '확률변수와 확률분포',
    summary: '시행 결과에 수를 대응시킨 확률변수와 확률분포를 알고, 이산확률변수의 평균·분산·표준편차를 구합니다.',
    goals: [
      '확률변수와 확률분포의 뜻을 안다.',
      '이산확률변수의 확률분포를 표나 확률질량함수로 나타낼 수 있다.',
      '이산확률변수의 기댓값(평균), 분산, 표준편차를 구할 수 있다.',
      '$aX+b$의 평균, 분산, 표준편차를 구할 수 있다.',
    ],
    standards: ['[12확통03-01]', '[12확통03-02]'],

    concepts: [
      {
        title: '확률변수와 확률분포',
        body: '어떤 시행에서 표본공간의 각 원소에 하나의 실수를 대응시킨 것을 **확률변수**라 하고, 보통 $X$, $Y$처럼 대문자로 나타냅니다. 확률변수가 가질 수 있는 값이 $0, 1, 2, \\cdots$처럼 **셀 수 있을 때** 이산확률변수라고 합니다.\n\n' +
          '확률변수 $X$가 가지는 값과 그 값을 가질 확률의 대응 관계를 $X$의 **확률분포**라고 합니다.\n\n' +
          '예: 동전 2개를 동시에 던질 때 앞면이 나온 개수를 $X$라 하면, $X$는 0, 1, 2 중 하나의 값을 가집니다. 표본공간 $\\{(\\text{앞},\\text{앞}),(\\text{앞},\\text{뒤}),(\\text{뒤},\\text{앞}),(\\text{뒤},\\text{뒤})\\}$에서\n\n' +
          '| $X$ | 0 | 1 | 2 | 합계 |\n|---|---|---|---|---|\n| $P(X=x)$ | $\\frac{1}{4}$ | $\\frac{2}{4}$ | $\\frac{1}{4}$ | 1 |\n\n' +
          '"$X=1$"은 앞면이 1개인 사건 $\\{(\\text{앞},\\text{뒤}),(\\text{뒤},\\text{앞})\\}$을 뜻하므로 $P(X=1)=\\frac{1}{2}$입니다.\n\n' +
          '> ⚠️ $X$가 가지는 값이 3가지라고 해서 각 확률이 $\\frac{1}{3}$인 것은 아닙니다.',
        easy: '확률변수는 "결과를 수로 바꾸는 규칙"입니다. 동전 두 개의 결과(앞뒤, 뒤앞 …)는 수가 아니지만, "앞면이 몇 개인가"로 바꾸면 0, 1, 2라는 수가 됩니다.\n\n' +
          '확률분포는 그 수마다 확률을 적어 둔 성적표라고 생각하면 됩니다.',
        fig: { type: 'bars', labels: ['X=0', 'X=1', 'X=2'], values: [0.25, 0.5, 0.25], title: '동전 2개를 던질 때 앞면의 개수의 확률분포', alt: 'X가 0, 1, 2일 확률이 각각 0.25, 0.5, 0.25인 막대그래프' },
        check: {
          type: 'choice',
          q: '동전 2개를 동시에 던질 때 앞면이 나온 개수를 $X$라 합니다. $P(X=1)$의 값은 무엇입니까?',
          choices: ['$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{1}{4}$'],
          answer: 0,
          why: ['', '$X$가 가지는 값 0, 1, 2가 일어날 가능성이 같다고 보았습니다. 앞면 1개인 경우는 (앞, 뒤), (뒤, 앞)의 2가지입니다.', '앞면 1개인 경우를 (앞, 뒤) 하나만 세었습니다. (뒤, 앞)도 있습니다.'],
          explain: '모든 경우 4가지 중 앞면이 1개인 경우는 (앞, 뒤), (뒤, 앞)의 2가지이므로 $P(X=1)=\\frac{2}{4}=\\frac{1}{2}$입니다.',
        },
      },
      {
        title: '확률질량함수와 그 성질',
        body: '이산확률변수 $X$가 $x_1, x_2, \\cdots, x_n$의 값을 가질 때, 각 값에 그 확률을 대응시킨 함수\n\n' +
          '$P(X=x_i)=p_i$ ($i=1,2,\\cdots,n$)\n\n' +
          '를 $X$의 **확률질량함수**라고 합니다. 확률분포는 표, 그래프, 확률질량함수의 식으로 나타낼 수 있고, 다음 성질이 성립합니다.\n\n' +
          '1. $0\\le p_i\\le1$\n' +
          '2. $p_1+p_2+\\cdots+p_n=1$\n' +
          '3. $P(x_i\\le X\\le x_j)=p_i+p_{i+1}+\\cdots+p_j$ (단, $x_1<x_2<\\cdots<x_n$, $i\\le j$)\n\n' +
          '예: $X$의 확률질량함수가 $P(X=x)=kx$ ($x=1,2,3,4$)이면, 확률의 합이 1이므로 $k(1+2+3+4)=10k=1$에서 $k=\\frac{1}{10}$입니다. 이때 $P(X\\ge3)=\\frac{3}{10}+\\frac{4}{10}=\\frac{7}{10}$입니다.',
        easy: '모든 경우의 확률을 다 더하면 반드시 1입니다. 그래서 확률 중 하나를 모르거나 식에 모르는 상수 $k$가 있으면 "합이 1"을 이용해 구합니다.\n\n' +
          '"$X$가 3 이상"처럼 범위의 확률은 그 범위에 들어가는 값들의 확률을 더하면 됩니다.',
        fig: { type: 'bars', labels: ['X=1', 'X=2', 'X=3', 'X=4'], values: [0.1, 0.2, 0.3, 0.4], title: 'P(X=x)=x/10 의 확률분포', alt: 'X가 1, 2, 3, 4일 확률이 각각 0.1, 0.2, 0.3, 0.4인 막대그래프' },
        check: {
          type: 'short', check: 'number',
          q: '확률변수 $X$의 확률질량함수가 $P(X=x)=kx$ ($x=1,2,3$)일 때, 상수 $k$의 값을 구하십시오.',
          answer: '1/6',
          wrong: [{ a: '1/3', why: '$X$가 가지는 값이 3개라서 $\\frac{1}{3}$로 생각했습니다. $k\\times1+k\\times2+k\\times3=1$을 풉니다.' }],
          explain: '확률의 합이 1이므로 $k+2k+3k=6k=1$, $k=\\frac{1}{6}$입니다.',
        },
      },
      {
        title: '기댓값(평균)',
        body: '이산확률변수 $X$의 확률분포가 $P(X=x_i)=p_i$ ($i=1,2,\\cdots,n$)일 때\n\n' +
          '$E(X)=x_1p_1+x_2p_2+\\cdots+x_np_n=\\sum_{i=1}^{n}x_ip_i$\n\n' +
          '를 $X$의 **기댓값** 또는 **평균**이라 하고 $E(X)$ 또는 $m$으로 나타냅니다.\n\n' +
          '기댓값은 각 값에 그 확률을 **가중치로 곱해 더한 평균**입니다. 시행을 아주 많이 되풀이했을 때 $X$의 값들의 평균이 이 값에 가까워집니다.\n\n' +
          '예: 주사위 한 개를 던져 나온 눈의 수를 $X$라 하면\n\n' +
          '$E(X)=1\\times\\frac{1}{6}+2\\times\\frac{1}{6}+\\cdots+6\\times\\frac{1}{6}=\\frac{21}{6}=\\frac{7}{2}$\n\n' +
          '기댓값 $\\frac{7}{2}$은 실제로 나올 수 없는 값이지만, 여러 번 던졌을 때 평균적으로 기대되는 값입니다.',
        easy: '시험 점수의 평균을 낼 때, 90점이 3명, 80점이 1명이면 $(90\\times3+80\\times1)\\div4$로 계산합니다. 이것을 $90\\times\\frac{3}{4}+80\\times\\frac{1}{4}$로 써도 같지요.\n\n' +
          '기댓값도 똑같습니다. "값 × 그 값이 차지하는 비율(확률)"을 모두 더한 것입니다.',
        check: {
          type: 'short', check: 'number',
          q: '확률변수 $X$의 확률분포가 $P(X=1)=\\frac{1}{2}$, $P(X=2)=\\frac{1}{3}$, $P(X=3)=\\frac{1}{6}$일 때, $E(X)$를 구하십시오.',
          answer: '5/3',
          wrong: [{ a: '2', why: '값 1, 2, 3을 그냥 평균했습니다. 각 값에 확률을 곱해 더합니다.' }],
          explain: '$E(X)=1\\times\\frac{1}{2}+2\\times\\frac{1}{3}+3\\times\\frac{1}{6}=\\frac{3}{6}+\\frac{4}{6}+\\frac{3}{6}=\\frac{10}{6}=\\frac{5}{3}$입니다.',
        },
      },
      {
        title: '분산과 표준편차',
        body: '확률변수 $X$의 값이 평균 $m=E(X)$로부터 얼마나 흩어져 있는지를 나타내기 위해, 편차 $X-m$의 제곱의 평균을 **분산**이라 합니다.\n\n' +
          '$V(X)=E((X-m)^{2})=\\sum_{i=1}^{n}(x_i-m)^{2}p_i$\n\n' +
          '분산의 양의 제곱근을 **표준편차**라 하고 $\\sigma(X)=\\sqrt{V(X)}$로 나타냅니다. 표준편차는 $X$와 단위가 같습니다.\n\n' +
          '식을 정리하면 계산이 편한 공식을 얻습니다.\n\n' +
          '$V(X)=E(X^{2})-\\{E(X)\\}^{2}$ (제곱의 평균 − 평균의 제곱)\n\n' +
          '예: 동전 2개를 던질 때 앞면의 개수 $X$는 $E(X)=0\\times\\frac{1}{4}+1\\times\\frac{1}{2}+2\\times\\frac{1}{4}=1$, $E(X^{2})=0+1\\times\\frac{1}{2}+4\\times\\frac{1}{4}=\\frac{3}{2}$이므로\n\n' +
          '$V(X)=\\frac{3}{2}-1^{2}=\\frac{1}{2}$, $\\sigma(X)=\\sqrt{\\frac{1}{2}}=\\frac{\\sqrt{2}}{2}$',
        easy: '평균이 같아도 흩어진 정도는 다를 수 있습니다. 늘 5점을 받는 학생과 0점, 10점을 번갈아 받는 학생은 평균이 같지만 들쭉날쭉한 정도가 다릅니다.\n\n' +
          '분산은 "평균에서 떨어진 거리"를 제곱해서 평균 낸 값이고, 제곱 때문에 단위가 바뀐 것을 되돌리려고 제곱근을 씌운 것이 표준편차입니다.',
        check: {
          type: 'short', check: 'number',
          q: '확률변수 $X$에 대하여 $E(X)=2$, $E(X^{2})=5$일 때, $V(X)$를 구하십시오.',
          answer: '1',
          wrong: [{ a: '3', why: '$E(X^{2})-E(X)$로 계산했습니다. 평균을 제곱해서 빼야 합니다.' }],
          explain: '$V(X)=E(X^{2})-\\{E(X)\\}^{2}=5-2^{2}=1$입니다.',
        },
      },
      {
        title: 'aX+b의 평균, 분산, 표준편차',
        body: '확률변수 $X$와 상수 $a$, $b$ ($a\\ne0$)에 대하여 $Y=aX+b$도 확률변수이고\n\n' +
          '- $E(aX+b)=aE(X)+b$\n' +
          '- $V(aX+b)=a^{2}V(X)$\n' +
          '- $\\sigma(aX+b)=|a|\\sigma(X)$\n\n' +
          '가 성립합니다. 모든 값에 $b$를 더하면 평균도 $b$만큼 옮겨지지만, 값들이 다 함께 움직이므로 **흩어진 정도는 그대로**입니다. 그래서 $b$는 분산에 영향을 주지 않습니다. 모든 값을 $a$배 하면 편차도 $a$배가 되므로 편차의 제곱의 평균인 분산은 $a^{2}$배, 표준편차는 $|a|$배가 됩니다.\n\n' +
          '예: $E(X)=3$, $V(X)=4$일 때 $Y=2X-1$이면 $E(Y)=2\\times3-1=5$, $V(Y)=4\\times4=16$, $\\sigma(Y)=2\\times2=4$입니다.\n\n' +
          '> ⚠️ $a$가 음수여도 표준편차는 음수가 되지 않습니다. $\\sigma(-3X)=3\\sigma(X)$입니다.',
        easy: '반 학생 모두의 점수에 5점씩 더해 주면 평균은 5점 오르지만, 학생들 사이의 점수 차이는 그대로입니다. 그래서 분산은 변하지 않습니다.\n\n' +
          '점수를 모두 2배로 하면 학생들 사이의 차이도 2배가 되어 표준편차는 2배, 그 제곱인 분산은 4배가 됩니다.',
        check: {
          type: 'short', check: 'number',
          q: '확률변수 $X$에 대하여 $V(X)=3$일 때, $V(2X+5)$를 구하십시오.',
          answer: '12',
          wrong: [
            { a: '6', why: '$a$를 제곱하지 않았습니다. $V(aX+b)=a^{2}V(X)$입니다.' },
            { a: '11', why: '$2\\times3+5$로 평균처럼 계산했습니다. 더하는 상수 5는 분산에 영향을 주지 않고, $a$는 제곱해서 곱합니다.' },
            { a: '17', why: '상수 5를 더했습니다. 모든 값에 같은 수를 더해도 흩어진 정도는 그대로입니다.' },
          ],
          explain: '$V(2X+5)=2^{2}V(X)=4\\times3=12$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '흰 공 3개, 검은 공 2개가 들어 있는 주머니에서 임의로 2개의 공을 동시에 꺼낼 때, 나온 흰 공의 개수를 $X$라 합니다. $X$의 확률분포를 구하고, $E(X)$와 $V(X)$를 구하십시오.',
        steps: [
          '$X$가 가질 수 있는 값은 0, 1, 2이고, 모든 경우는 ${}_{5}\\mathrm{C}_{2}=10$가지입니다.',
          '$P(X=0)=\\frac{{}_{2}\\mathrm{C}_{2}}{10}=\\frac{1}{10}$, $P(X=1)=\\frac{{}_{3}\\mathrm{C}_{1}\\times{}_{2}\\mathrm{C}_{1}}{10}=\\frac{6}{10}$, $P(X=2)=\\frac{{}_{3}\\mathrm{C}_{2}}{10}=\\frac{3}{10}$ (합이 1인지 확인)',
          '$E(X)=0\\times\\frac{1}{10}+1\\times\\frac{6}{10}+2\\times\\frac{3}{10}=\\frac{12}{10}=\\frac{6}{5}$',
          '$E(X^{2})=0+1\\times\\frac{6}{10}+4\\times\\frac{3}{10}=\\frac{18}{10}=\\frac{9}{5}$',
          '$V(X)=\\frac{9}{5}-\\left(\\frac{6}{5}\\right)^{2}=\\frac{45}{25}-\\frac{36}{25}=\\frac{9}{25}$',
        ],
        answer: '$E(X)=\\frac{6}{5}$, $V(X)=\\frac{9}{25}$',
      },
      {
        q: '확률변수 $X$에 대하여 $E(X)=3$, $\\sigma(X)=2$일 때, $Y=-3X+4$의 평균과 표준편차를 구하십시오.',
        steps: [
          '$E(Y)=-3E(X)+4=-9+4=-5$',
          '$\\sigma(Y)=|-3|\\sigma(X)=3\\times2=6$ (표준편차는 음수가 아닙니다.)',
          '참고로 $V(Y)=(-3)^{2}V(X)=9\\times4=36=6^{2}$입니다.',
        ],
        answer: '$E(Y)=-5$, $\\sigma(Y)=6$',
      },
    ],

    terms: [
      { term: '확률변수', def: '시행의 결과(표본공간의 각 원소)에 하나의 실수를 대응시킨 것입니다. 보통 $X$, $Y$ 같은 대문자로 나타냅니다.' },
      { term: '이산확률변수', def: '가질 수 있는 값이 유한개이거나 자연수처럼 셀 수 있는 확률변수입니다. 예: 주사위의 눈, 앞면의 개수' },
      { term: '확률분포', def: '확률변수가 가지는 값과 그 값을 가질 확률의 대응 관계입니다. 표, 그래프, 식으로 나타냅니다.' },
      { term: '확률질량함수', def: '이산확률변수 $X$의 각 값 $x_i$에 확률 $p_i$를 대응시킨 함수 $P(X=x_i)=p_i$입니다. 모든 $p_i$의 합은 1입니다.' },
      { term: '기댓값(평균)', def: '$E(X)=\\sum x_ip_i$로, 각 값에 그 확률을 곱해 더한 값입니다. 시행을 많이 되풀이할 때 기대되는 평균입니다.' },
      { term: '분산', def: '편차의 제곱의 평균 $V(X)=E((X-m)^{2})$입니다. $V(X)=E(X^{2})-\\{E(X)\\}^{2}$으로 계산할 수 있습니다.' },
      { term: '표준편차', def: '분산의 양의 제곱근 $\\sigma(X)=\\sqrt{V(X)}$입니다. $X$와 단위가 같아 흩어진 정도를 비교하기 좋습니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 1,
        q: '확률변수 $X$의 확률분포가 다음과 같을 때, $a$의 값을 구하십시오.\n\n| $X$ | 1 | 2 | 3 | 4 | 합계 |\n|---|---|---|---|---|---|\n| $P(X=x)$ | $\\frac{1}{8}$ | $a$ | $\\frac{3}{8}$ | $\\frac{1}{4}$ | 1 |',
        answer: '1/4',
        wrong: [{ a: '1/2', why: '$\\frac{1}{4}$을 빼는 것을 빠뜨렸습니다. 나머지 세 확률을 모두 더해 1에서 뺍니다.' }],
        explain: '확률의 합이 1이므로 $a=1-\\left(\\frac{1}{8}+\\frac{3}{8}+\\frac{2}{8}\\right)=1-\\frac{6}{8}=\\frac{1}{4}$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 2,
        q: '확률변수 $X$의 확률분포가 다음과 같을 때, $E(X)$를 구하십시오.\n\n| $X$ | 0 | 1 | 2 | 합계 |\n|---|---|---|---|---|\n| $P(X=x)$ | $\\frac{1}{5}$ | $\\frac{1}{2}$ | $\\frac{3}{10}$ | 1 |',
        answer: '11/10',
        wrong: [{ a: '1', why: '값 0, 1, 2를 그냥 평균했습니다. 각 값에 확률을 곱해 더합니다.' }],
        explain: '$E(X)=0\\times\\frac{1}{5}+1\\times\\frac{1}{2}+2\\times\\frac{3}{10}=\\frac{5}{10}+\\frac{6}{10}=\\frac{11}{10}$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '확률변수 $X$의 확률질량함수가 $P(X=x)=k(x+1)$ ($x=0,1,2,3$)일 때, 상수 $k$의 값은 무엇입니까?',
        choices: ['$\\frac{1}{10}$', '$\\frac{1}{6}$', '$\\frac{1}{4}$', '$10$'],
        answer: 0,
        why: [
          '',
          '$x$의 값만 더해 $0+1+2+3=6$으로 계산했습니다. $x+1$의 값 1, 2, 3, 4를 더해야 합니다.',
          '$X$가 가지는 값이 4개라서 $\\frac{1}{4}$로 생각했습니다. 확률의 합이 1이라는 식을 세웁니다.',
          '$10k=1$에서 $k$를 구할 때 거꾸로 곱했습니다. 확률은 1보다 클 수 없습니다.',
        ],
        explain: '확률의 합이 1이므로 $k(1+2+3+4)=10k=1$, $k=\\frac{1}{10}$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', concept: 4,
        q: '확률변수 $X$에 대하여 $E(X)=4$, $V(X)=9$일 때, $V(2X-3)$을 구하십시오.',
        answer: '36',
        wrong: [
          { a: '18', why: '$a=2$를 제곱하지 않았습니다. $V(aX+b)=a^{2}V(X)$입니다.' },
          { a: '33', why: '상수 $-3$까지 계산에 넣었습니다. 상수는 분산에 영향을 주지 않습니다.' },
          { a: '5', why: '평균 $E(2X-3)=2\\times4-3$을 구했습니다.' },
        ],
        explain: '$V(2X-3)=2^{2}V(X)=4\\times9=36$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'ox', concept: 4,
        q: '확률변수 $X$에 대하여 $V(X+3)=V(X)+3$입니다.',
        answer: false,
        explain: '모든 값에 3을 더하면 평균도 3만큼 커져 편차 $X-m$은 그대로입니다. 그래서 $V(X+3)=V(X)$입니다. 반면 평균은 $E(X+3)=E(X)+3$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 3,
        q: '확률변수 $X$에 대하여 $E(X)=3$, $E(X^{2})=13$일 때, 표준편차 $\\sigma(X)$를 구하십시오.',
        answer: '2',
        wrong: [
          { a: '4', why: '분산 $V(X)$까지만 구했습니다. 표준편차는 분산의 양의 제곱근입니다.' },
          { a: '10', why: '$E(X^{2})-E(X)$로 계산했습니다. 평균을 제곱해서 빼야 합니다.' },
        ],
        explain: '$V(X)=E(X^{2})-\\{E(X)\\}^{2}=13-9=4$이므로 $\\sigma(X)=\\sqrt{4}=2$입니다.',
      },
      {
        id: 'p7', level: 2, type: 'short', check: 'number', concept: 3,
        q: '동전 3개를 동시에 던질 때 앞면이 나온 개수를 $X$라 합니다. $V(X)$를 구하십시오.',
        answer: '3/4',
        hint: '먼저 $X$의 확률분포를 표로 만듭니다.',
        wrong: [
          { a: '3', why: '$E(X^{2})$까지만 구했습니다. $\\{E(X)\\}^{2}$을 빼야 합니다.' },
          { a: '3/2', why: '평균 $E(X)$를 구했습니다.' },
        ],
        explain: '$P(X=0)=\\frac{1}{8}$, $P(X=1)=\\frac{3}{8}$, $P(X=2)=\\frac{3}{8}$, $P(X=3)=\\frac{1}{8}$입니다.\n\n' +
          '$E(X)=\\frac{0+3+6+3}{8}=\\frac{3}{2}$, $E(X^{2})=\\frac{0+3+12+9}{8}=3$이므로 $V(X)=3-\\frac{9}{4}=\\frac{3}{4}$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 2,
        q: '흰 공 2개, 검은 공 3개가 들어 있는 주머니에서 임의로 2개의 공을 동시에 꺼낼 때, 나온 흰 공의 개수를 $X$라 합니다. $E(X)$를 구하십시오.',
        answer: '4/5',
        hint: '$X$는 0, 1, 2의 값을 가집니다. 각 확률을 조합으로 구합니다.',
        wrong: [{ a: '1', why: '값 0, 1, 2가 일어날 가능성이 같다고 보고 그냥 평균했습니다. 각 확률을 조합으로 구해 곱합니다.' }],
        explain: '모든 경우는 ${}_{5}\\mathrm{C}_{2}=10$가지입니다. $P(X=0)=\\frac{3}{10}$, $P(X=1)=\\frac{2\\times3}{10}=\\frac{6}{10}$, $P(X=2)=\\frac{1}{10}$이므로\n\n$E(X)=0\\times\\frac{3}{10}+1\\times\\frac{6}{10}+2\\times\\frac{1}{10}=\\frac{8}{10}=\\frac{4}{5}$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 2,
        q: '확률변수 $X$의 확률분포를 막대그래프로 나타낸 것입니다. $E(X)$의 값은 무엇입니까?',
        fig: { type: 'bars', labels: ['X=1', 'X=2', 'X=3', 'X=4'], values: [0.1, 0.3, 0.4, 0.2], title: 'X의 확률분포', alt: 'X가 1, 2, 3, 4일 확률이 각각 0.1, 0.3, 0.4, 0.2인 막대그래프' },
        choices: ['$2.7$', '$2.5$', '$3$', '$8.1$'],
        answer: 0,
        why: [
          '',
          '값 1, 2, 3, 4를 그냥 평균했습니다. 각 값에 확률을 곱해 더합니다.',
          '확률이 가장 큰 값을 골랐습니다. 기댓값은 모든 값에 확률을 곱해 더한 값입니다.',
          '$E(X^{2})=1\\times0.1+4\\times0.3+9\\times0.4+16\\times0.2$를 구했습니다.',
        ],
        explain: '$E(X)=1\\times0.1+2\\times0.3+3\\times0.4+4\\times0.2=0.1+0.6+1.2+0.8=2.7$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', unit: '원', concept: 2,
        q: '주사위 한 개를 던져 6의 눈이 나오면 1200원, 2 또는 4의 눈이 나오면 600원을 받고, 홀수의 눈이 나오면 받지 못하는 놀이가 있습니다. 이 놀이에서 받는 금액의 기댓값은 몇 원입니까?',
        answer: '400',
        hint: '받는 금액을 $X$라 하고 확률분포를 만들어 보십시오.',
        wrong: [{ a: '600', why: '1200원, 600원, 0원을 그냥 평균했습니다. 각 금액에 확률을 곱해 더합니다.' }],
        explain: '$P(X=1200)=\\frac{1}{6}$, $P(X=600)=\\frac{2}{6}$, $P(X=0)=\\frac{3}{6}$이므로\n\n$E(X)=1200\\times\\frac{1}{6}+600\\times\\frac{2}{6}+0\\times\\frac{3}{6}=200+200=400$(원)입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 4,
        q: '확률변수 $X$에 대하여 $E(X)=3$, $\\sigma(X)=2$일 때, 확률변수 $Y=-3X+4$의 표준편차를 구하십시오.',
        answer: '6',
        wrong: [
          { a: '-6', why: '표준편차는 음수가 될 수 없습니다. $\\sigma(aX+b)=|a|\\sigma(X)$입니다.' },
          { a: '18', why: '$a^{2}$을 곱했습니다. 분산은 $a^{2}$배, 표준편차는 $|a|$배입니다.' },
          { a: '-2', why: '상수 4까지 계산에 넣었습니다. 더하는 상수는 표준편차에 영향을 주지 않습니다.' },
        ],
        explain: '$\\sigma(Y)=|-3|\\sigma(X)=3\\times2=6$입니다. (평균은 $E(Y)=-3\\times3+4=-5$입니다.)',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 3,
        q: '확률변수 $X$는 1, 2, 3의 값을 가지고 $P(X=1)=a$, $P(X=2)=b$, $P(X=3)=\\frac{1}{4}$입니다. $E(X)=2$일 때, $V(X)$를 구하십시오.',
        answer: '1/2',
        hint: '확률의 합이 1이라는 식과 $E(X)=2$라는 식으로 $a$, $b$를 구합니다.',
        wrong: [{ a: '9/2', why: '$E(X^{2})$까지만 구했습니다. $\\{E(X)\\}^{2}=4$를 빼야 합니다.' }],
        explain: '$a+b+\\frac{1}{4}=1$, $a+2b+\\frac{3}{4}=2$에서 $a+b=\\frac{3}{4}$, $a+2b=\\frac{5}{4}$이므로 $b=\\frac{1}{2}$, $a=\\frac{1}{4}$입니다.\n\n' +
          '$E(X^{2})=1\\times\\frac{1}{4}+4\\times\\frac{1}{2}+9\\times\\frac{1}{4}=\\frac{9}{2}$이므로 $V(X)=\\frac{9}{2}-2^{2}=\\frac{1}{2}$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 4,
        q: '확률변수 $X$에 대하여 $E(X)=2$, $V(X)=3$입니다. 확률변수 $Y=aX+b$의 평균이 10, 분산이 27일 때, $a+b$의 값을 구하십시오. (단, $a>0$)',
        answer: '7',
        hint: '$V(Y)=a^{2}V(X)$에서 먼저 $a$를 구합니다.',
        wrong: [{ a: '1', why: '$V(Y)=aV(X)$로 보아 $a=9$로 구했습니다. 분산은 $a^{2}$배가 됩니다.' }],
        explain: '$V(Y)=a^{2}\\times3=27$에서 $a^{2}=9$, $a>0$이므로 $a=3$입니다. $E(Y)=3\\times2+b=10$에서 $b=4$입니다. 따라서 $a+b=7$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 2,
        q: '1부터 5까지의 자연수가 하나씩 적힌 카드 5장 중에서 임의로 2장을 동시에 뽑을 때, 뽑은 두 수 중 큰 수를 $X$라 합니다. $E(X)$를 구하십시오.',
        answer: '4',
        hint: '$X=k$인 경우는 $k$와, $k$보다 작은 수 하나를 뽑는 경우입니다.',
        wrong: [{ a: '7/2', why: '$X$가 가지는 값 2, 3, 4, 5를 그냥 평균했습니다. 큰 수일수록 그렇게 될 경우가 많습니다.' }],
        explain: '모든 경우는 ${}_{5}\\mathrm{C}_{2}=10$가지입니다. $X=k$이려면 $k$와 $k$보다 작은 수 $k-1$개 중 하나를 뽑으므로 $P(X=k)=\\frac{k-1}{10}$ ($k=2,3,4,5$)입니다.\n\n' +
          '$E(X)=\\frac{2\\times1+3\\times2+4\\times3+5\\times4}{10}=\\frac{40}{10}=4$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 4,
        q: '확률변수 $X$에 대하여 $E(X)=5$, $\\sigma(X)=2$입니다. 확률변수 $Z=\\frac{X-5}{2}$의 평균과 분산으로 옳은 것은 무엇입니까?',
        choices: ['$E(Z)=0$, $V(Z)=1$', '$E(Z)=0$, $V(Z)=2$', '$E(Z)=\\frac{5}{2}$, $V(Z)=1$', '$E(Z)=0$, $V(Z)=\\frac{1}{2}$'],
        answer: 0,
        why: [
          '',
          '$V(X)=4$에 $\\frac{1}{2}$을 그대로 곱했습니다. 분산은 $\\left(\\frac{1}{2}\\right)^{2}$배가 됩니다.',
          '평균을 구할 때 5를 빼는 것을 빠뜨렸습니다. $E(Z)=\\frac{1}{2}E(X)-\\frac{5}{2}$입니다.',
          '분산 대신 표준편차 2에 $\\left(\\frac{1}{2}\\right)^{2}$을 곱했습니다. $V(X)=2^{2}=4$입니다.',
        ],
        hint: '$Z=\\frac{1}{2}X-\\frac{5}{2}$로 보고 $aX+b$의 성질을 씁니다.',
        explain: '$Z=\\frac{1}{2}X-\\frac{5}{2}$이므로 $E(Z)=\\frac{1}{2}\\times5-\\frac{5}{2}=0$, $V(Z)=\\left(\\frac{1}{2}\\right)^{2}V(X)=\\frac{1}{4}\\times4=1$입니다. 이처럼 평균을 빼고 표준편차로 나누면 평균 0, 분산 1인 확률변수가 됩니다. 이것을 **표준화**라고 하며 정규분포 단원에서 다시 씁니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', unit: '원', concept: 2,
        q: '동전 2개를 동시에 던져 앞면이 2개 나오면 1000원, 1개 나오면 200원을 받고, 0개 나오면 받지 못하는 놀이가 있습니다. 참가비를 받는 금액의 기댓값과 같게 정하려면 참가비는 몇 원이어야 합니까?',
        answer: '350',
        hint: '앞면이 1개 나올 확률은 $\\frac{1}{2}$입니다.',
        wrong: [
          { a: '400', why: '1000원, 200원, 0원을 그냥 평균했습니다. 각 금액에 확률을 곱해 더합니다.' },
          { a: '300', why: '앞면이 1개 나올 확률을 $\\frac{1}{4}$로 계산했습니다. (앞, 뒤), (뒤, 앞)의 2가지입니다.' },
        ],
        explain: '받는 금액을 $X$라 하면 $P(X=1000)=\\frac{1}{4}$, $P(X=200)=\\frac{1}{2}$, $P(X=0)=\\frac{1}{4}$입니다.\n\n$E(X)=1000\\times\\frac{1}{4}+200\\times\\frac{1}{2}=250+100=350$(원)이므로 참가비는 350원입니다.',
      },
    ],

    deeper: [
      {
        title: '분산 공식 E(X²)−{E(X)}²는 어떻게 나올까',
        body: '$m=E(X)$라 하면\n\n' +
          '$V(X)=\\sum(x_i-m)^{2}p_i=\\sum x_i^{2}p_i-2m\\sum x_ip_i+m^{2}\\sum p_i$\n\n' +
          '입니다. 여기서 $\\sum x_i^{2}p_i=E(X^{2})$, $\\sum x_ip_i=m$, $\\sum p_i=1$이므로\n\n' +
          '$V(X)=E(X^{2})-2m^{2}+m^{2}=E(X^{2})-m^{2}$\n\n' +
          '이 됩니다. 같은 방법으로 $E(aX+b)=\\sum(ax_i+b)p_i=a\\sum x_ip_i+b\\sum p_i=aE(X)+b$도 보일 수 있습니다. 모두 "확률의 합은 1"이라는 성질을 쓴 것입니다.',
      },
      {
        title: '다음 단원과의 연결',
        body: '독립시행에서 사건이 일어나는 횟수 $X$의 확률분포 $P(X=r)={}_{n}\\mathrm{C}_{r}p^{r}(1-p)^{n-r}$을 **이항분포**라고 하며, 다음 단원에서 그 평균과 분산을 간단한 식으로 구합니다.\n\n' +
          '또 키·몸무게처럼 연속적인 값을 가지는 확률변수(연속확률변수)는 각 값의 확률 대신 **확률밀도함수**의 그래프 아래 넓이로 확률을 나타내며, 그 대표가 정규분포입니다. 이 단원의 평균·분산·표준편차와 표준화($Z=\\frac{X-m}{\\sigma}$)가 그곳에서 그대로 쓰입니다.',
      },
    ],

    faq: [
      {
        q: '기댓값이 실제로 나올 수 없는 값이어도 돼요?',
        a: '네. 주사위 눈의 기댓값 $\\frac{7}{2}$처럼 기댓값은 실제로 나오는 값이 아니라 "여러 번 되풀이했을 때의 평균"입니다. 주사위를 아주 많이 던지면 나온 눈의 평균이 $3.5$에 가까워진다는 뜻입니다.',
      },
      {
        q: '분산을 구할 때 두 공식 중 무엇을 써요?',
        a: '결과는 같습니다. 평균 $m$이 정수처럼 간단하면 $\\sum(x_i-m)^{2}p_i$도 편하지만, 평균이 분수이면 $E(X^{2})-\\{E(X)\\}^{2}$이 계산이 훨씬 쉽습니다. 다만 뺄 때 평균을 **제곱**해서 빼는 것을 잊지 마십시오.',
      },
      {
        q: 'V(aX+b)에서 b는 왜 사라져요?',
        a: '분산은 "평균에서 떨어진 정도"를 재는 값입니다. 모든 값에 $b$를 더하면 평균도 똑같이 $b$만큼 움직이므로 각 값과 평균의 차이(편차)는 그대로입니다. 그래서 $b$는 분산과 표준편차에 영향을 주지 않습니다.',
      },
    ],

    mistakes: [
      '$X$의 값들을 그냥 평균해서 기댓값이라고 하는 실수 — 각 값에 확률을 곱해 더해야 합니다.',
      '$V(X)=E(X^{2})-E(X)$로 계산하는 실수 — 평균을 제곱해서 뺍니다.',
      '$V(aX+b)=aV(X)+b$로 계산하는 실수 — $V(aX+b)=a^{2}V(X)$이고, $\\sigma(aX+b)=|a|\\sigma(X)$입니다.',
    ],

    gens: [
      {
        id: 'pmf-k',
        level: 1,
        title: '확률질량함수에서 상수 k 구하기',
        make: function (R) {
          var F = R.F;
          var kind = R.pick(['x', 'x+c', 'x2']);
          var n, xs, fx, form, S;
          if (kind === 'x') {
            n = R.int(3, 6); xs = range(1, n); fx = function (x) { return x; }; form = 'kx';
          } else if (kind === 'x+c') {
            var c = R.int(1, 3); n = R.int(3, 5); xs = range(0, n - 1); fx = function (x) { return x + c; }; form = 'k(x+' + c + ')';
          } else {
            n = R.int(3, 4); xs = range(1, n); fx = function (x) { return x * x; }; form = 'kx^{2}';
          }
          S = 0; xs.forEach(function (x) { S += fx(x); });
          var k = F(1, S);
          var dom = 'x=' + xs.join(',');
          var askP = R.bool();
          var top = xs[xs.length - 1];
          var ans = askP ? k.mul(fx(top)) : k;
          var wrong = [];
          function add(x, why) { if (!x.eq(ans)) wrong.push({ a: x.toString(), why: why }); }
          var sx = 0; xs.forEach(function (x) { sx += x; });
          if (askP) {
            add(F(1, xs.length), '$X$가 가지는 값이 ' + xs.length + '개라서 확률이 모두 같다고 보았습니다. 먼저 $k$를 구합니다.');
            add(k, '$k$의 값만 구했습니다. $P(X=' + top + ')=' + fx(top) + 'k$입니다.');
          } else {
            add(F(1, xs.length), '$X$가 가지는 값이 ' + xs.length + '개라서 $\\frac{1}{' + xs.length + '}$로 생각했습니다. 확률의 합이 1이라는 식을 세웁니다.');
            if (sx > 0) add(F(1, sx), '$x$의 값만 더했습니다. 각 $x$에서의 ' + (kind === 'x2' ? '$x^{2}$' : '$x+' + (fx(0)) + '$') + '의 값을 더해야 합니다.');
          }
          var terms = xs.map(function (x) { return fx(x); }).join('+');
          return {
            type: 'short', check: 'number', concept: 1,
            q: '확률변수 $X$의 확률질량함수가 $P(X=x)=' + form + '$ ($' + dom + '$)일 때, ' + (askP ? '$P(X=' + top + ')$의 값을 구하십시오.' : '상수 $k$의 값을 구하십시오.'),
            answer: ans.toString(),
            wrong: wrong,
            hint: '모든 확률의 합은 1입니다.',
            explain: '확률의 합이 1이므로 $k(' + terms + ')=' + S + 'k=1$, $k=' + R.fmt.frac(k) + '$입니다.' +
              (askP ? '\n\n따라서 $P(X=' + top + ')=' + fx(top) + '\\times' + R.fmt.frac(k) + '=' + R.fmt.frac(ans) + '$입니다.' : ''),
          };
        },
      },
      {
        id: 'expectation',
        level: 1,
        title: '확률분포 표에서 기댓값 구하기',
        make: function (R) {
          var F = R.F;
          var k = R.pick([3, 3, 4]);
          var start = R.int(0, 3);
          var step = R.pick([1, 1, 2]);
          var values = range(0, k - 1).map(function (i) { return start + step * i; });
          var d = R.pick(k === 3 ? [4, 5, 6, 8, 10] : [5, 6, 8, 10]);
          var nums = splitInto(R, d, k);
          var probs = nums.map(function (m) { return F(m, d); });
          var mo = moments(F, values, probs);
          var ans = mo.e;
          var wrong = [];
          function add(x, why) { if (!x.eq(ans) && !wrong.some(function (w) { return w.a === x.toString(); })) wrong.push({ a: x.toString(), why: why }); }
          var sum = 0; values.forEach(function (v) { sum += v; });
          add(F(sum, k), '값 ' + values.join(', ') + R.josa(values[k - 1], '을/를') + ' 그냥 평균했습니다. 각 값에 확률을 곱해 더합니다.');
          var maxI = 0; nums.forEach(function (m, i) { if (m > nums[maxI]) maxI = i; });
          var uniq = nums.filter(function (m) { return m === nums[maxI]; }).length === 1;
          if (uniq) add(F(values[maxI]), '확률이 가장 큰 값을 답했습니다. 기댓값은 모든 값에 확률을 곱해 더한 값입니다.');
          add(mo.e2, '$E(X^{2})$를 구했습니다. 각 값을 제곱하지 말고 그대로 확률과 곱해 더합니다.');
          return {
            type: 'short', check: 'number', concept: 2,
            q: '확률변수 $X$의 확률분포가 다음과 같을 때, $E(X)$를 구하십시오.\n\n' + distTable(R, values, probs),
            answer: ans.toString(),
            wrong: wrong,
            hint: '$E(X)=\\sum x_ip_i$',
            explain: '$E(X)=' + sumTex(R, values, probs, false) + '=' + R.fmt.frac(ans) + '$입니다.',
          };
        },
      },
      {
        id: 'variance',
        level: 2,
        title: '확률분포 표에서 분산 구하기',
        make: function (R) {
          var F = R.F;
          var start = R.int(0, 2);
          var values = [start, start + 1, start + 2];
          if (R.bool(0.3)) values = [start, start + 2, start + 4];
          var d = R.pick([4, 5, 6, 8, 10]);
          var nums = splitInto(R, d, 3);
          var probs = nums.map(function (m) { return F(m, d); });
          var mo = moments(F, values, probs);
          var ans = mo.v;
          var wrong = [];
          function add(x, why) { if (!x.eq(ans) && !wrong.some(function (w) { return w.a === x.toString(); })) wrong.push({ a: x.toString(), why: why }); }
          add(mo.e2, '$E(X^{2})$까지만 구했습니다. $\\{E(X)\\}^{2}$을 빼야 합니다.');
          add(mo.e2.sub(mo.e), '$E(X^{2})-E(X)$로 계산했습니다. 평균을 제곱해서 뺍니다.');
          add(mo.e, '평균 $E(X)$를 구했습니다. 분산은 $E(X^{2})-\\{E(X)\\}^{2}$입니다.');
          return {
            type: 'short', check: 'number', concept: 3,
            q: '확률변수 $X$의 확률분포가 다음과 같을 때, $V(X)$를 구하십시오.\n\n' + distTable(R, values, probs),
            answer: ans.toString(),
            wrong: wrong,
            hint: '$V(X)=E(X^{2})-\\{E(X)\\}^{2}$',
            explain: '$E(X)=' + sumTex(R, values, probs, false) + '=' + R.fmt.frac(mo.e) + '$\n\n' +
              '$E(X^{2})=' + sumTex(R, values, probs, true) + '=' + R.fmt.frac(mo.e2) + '$\n\n' +
              '$V(X)=' + R.fmt.frac(mo.e2) + '-\\left(' + R.fmt.frac(mo.e) + '\\right)^{2}=' + R.fmt.frac(ans) + '$입니다.',
          };
        },
      },
      {
        id: 'linear',
        level: 1,
        title: 'aX+b의 평균·분산·표준편차',
        make: function (R) {
          var a = R.pick([-4, -3, -2, 2, 3, 4, 5]);
          var b = R.nonzero(-6, 6);
          var m = R.int(-3, 8);
          var s = R.int(1, 5);
          var v = s * s;
          var Y = R.fmt.poly([a, b], 'X');
          var kind = R.pick(['E', 'V', 'S']);
          var ans, ask, ex, cands = [];
          if (kind === 'E') {
            ans = a * m + b; ask = 'E(' + Y + ')';
            ex = '$E(' + Y + ')=' + a + 'E(X)' + R.fmt.signed(b) + '=' + a + '\\times' + R.fmt.paren(m) + R.fmt.signed(b) + '=' + ans + '$입니다.';
            cands.push([a * m, '상수 $' + b + '$' + R.josa(b, '을/를') + ' 더하는 것을 빠뜨렸습니다.']);
            cands.push([m + b, '$E(X)$에 $' + a + '$' + R.josa(a, '을/를') + ' 곱하는 것을 빠뜨렸습니다.']);
          } else if (kind === 'V') {
            ans = a * a * v; ask = 'V(' + Y + ')';
            ex = '$V(' + Y + ')=' + R.fmt.paren(a) + '^{2}V(X)=' + (a * a) + '\\times' + v + '=' + ans + '$입니다. 더하는 상수는 분산에 영향을 주지 않습니다.';
            cands.push([a * v, '$a$를 제곱하지 않았습니다. $V(aX+b)=a^{2}V(X)$입니다.']);
            cands.push([a * a * v + b, '상수 $' + b + '$까지 더했습니다. 모든 값에 같은 수를 더해도 흩어진 정도는 그대로입니다.']);
            cands.push([a * v + b, '$aV(X)+b$로 평균처럼 계산했습니다. $V(aX+b)=a^{2}V(X)$입니다.']);
          } else {
            ans = Math.abs(a) * s; ask = '\\sigma(' + Y + ')';
            ex = '$\\sigma(' + Y + ')=|' + a + '|\\sigma(X)=' + Math.abs(a) + '\\times' + s + '=' + ans + '$입니다.';
            if (a < 0) cands.push([a * s, '표준편차는 음수가 될 수 없습니다. $\\sigma(aX+b)=|a|\\sigma(X)$입니다.']);
            cands.push([a * a * s, '$a^{2}$을 곱했습니다. 분산은 $a^{2}$배, 표준편차는 $|a|$배입니다.']);
            cands.push([Math.abs(a) * s + b, '상수 $' + b + '$까지 더했습니다. 더하는 상수는 표준편차에 영향을 주지 않습니다.']);
          }
          var wrong = [];
          cands.forEach(function (c) { if (c[0] !== ans && !wrong.some(function (w) { return w.a === String(c[0]); })) wrong.push({ a: String(c[0]), why: c[1] }); });
          var given = kind === 'S' ? '$E(X)=' + m + '$, $\\sigma(X)=' + s + '$' : '$E(X)=' + m + '$, $V(X)=' + v + '$';
          return {
            type: 'short', check: 'number', concept: 4,
            q: '확률변수 $X$에 대하여 ' + given + '일 때, $' + ask + '$의 값을 구하십시오.',
            answer: String(ans),
            wrong: wrong,
            hint: '$E(aX+b)=aE(X)+b$, $V(aX+b)=a^{2}V(X)$, $\\sigma(aX+b)=|a|\\sigma(X)$',
            explain: ex,
          };
        },
      },
    ],
  });
})();
