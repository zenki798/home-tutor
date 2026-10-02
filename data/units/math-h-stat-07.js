/* 확률과 통계 · 사건의 독립과 종속
 * 독립과 종속의 뜻, 독립 판정 P(A∩B)=P(A)P(B), 배반과 독립의 구별, 독립인 사건의 확률 계산,
 * 독립시행의 확률 nCr p^r (1-p)^(n-r). */
(function () {
  function C(n, r) {
    if (r < 0 || r > n) return 0;
    var x = 1;
    for (var i = 0; i < r; i++) x = x * (n - i) / (i + 1);
    return Math.round(x);
  }
  function cT(n, r) { return '{}_{' + n + '}\\mathrm{C}_{' + r + '}'; }
  // 독립시행에서 n번 중 r번 일어날 확률 (p: Frac)
  function bin(F, n, r, p) {
    var q = F(1).sub(p);
    return F(C(n, r)).mul(p.pow(r)).mul(q.pow(n - r));
  }
  // TeX: nCr (p)^r (q)^(n-r)
  function binTex(R, n, r, p) {
    var q = R.F(1).sub(p);
    function pw(f, k) {
      if (k === 0) return '';
      var t = '\\left(' + R.fmt.frac(f) + '\\right)';
      return k === 1 ? t : t + '^{' + k + '}';
    }
    return cT(n, r) + pw(p, r) + pw(q, n - r);
  }

  Tutor.registerUnit({
    id: 'math-h-stat-07',
    course: 'math-h-stat',
    title: '사건의 독립과 종속',
    summary: '한 사건이 다른 사건의 확률에 영향을 주는지로 독립과 종속을 판단하고, 독립시행의 확률을 구합니다.',
    goals: [
      '사건의 독립과 종속의 뜻을 알고, 두 사건이 서로 독립인지 판정할 수 있다.',
      '서로 배반인 사건과 서로 독립인 사건을 구별할 수 있다.',
      '독립인 사건의 확률을 계산할 수 있다.',
      '독립시행의 확률을 구할 수 있다.',
    ],
    standards: ['[12확통02-05]'],

    concepts: [
      {
        title: '사건의 독립과 종속',
        body: '두 사건 $A$, $B$에서 한 사건이 일어나는 것이 다른 사건이 일어날 확률에 영향을 주지 않을 때, 곧\n\n' +
          '$P(B|A)=P(B)$ (또한 $P(B|A^{C})=P(B)$)\n\n' +
          '일 때 $A$와 $B$는 서로 **독립**이라고 합니다. 독립이 아닌 두 사건은 서로 **종속**이라고 합니다.\n\n' +
          '예: 빨간 공 2개, 흰 공 3개가 든 주머니에서 공을 한 개씩 두 번 꺼낼 때, 첫 번째에 빨간 공이 나오는 사건을 $A$, 두 번째에 빨간 공이 나오는 사건을 $B$라 합니다.\n\n' +
          '- 꺼낸 공을 **다시 넣으면** 두 번째는 늘 처음과 같은 상태이므로 $P(B|A)=\\frac{2}{5}=P(B)$ → 독립\n' +
          '- 꺼낸 공을 **다시 넣지 않으면** $P(B|A)=\\frac{1}{4}$인데 $P(B)=\\frac{2}{5}$ → 종속\n\n' +
          '$A$가 $B$에 대해 독립이면 $B$도 $A$에 대해 독립이므로 "$A$와 $B$는 서로 독립"이라고 합니다.',
        easy: '오늘 아침 동전을 던져 앞면이 나왔다고 해서, 주사위를 던져 6이 나올 확률이 바뀌지는 않습니다. 이렇게 "서로 상관없는" 두 사건이 독립입니다.\n\n' +
          '반대로 제비를 다시 넣지 않고 뽑으면, 앞사람이 무엇을 뽑았는지가 내 확률을 바꿉니다. 이런 두 사건은 종속입니다.',
        check: {
          type: 'ox',
          q: '공을 꺼낸 뒤 다시 넣지 않고 두 번째 공을 꺼낼 때, "첫 번째에 빨간 공"인 사건과 "두 번째에 빨간 공"인 사건은 서로 독립입니다. (주머니에는 빨간 공과 흰 공이 2개 이상씩 들어 있습니다.)',
          answer: false,
          explain: '첫 번째에 빨간 공이 나오면 두 번째에 빨간 공이 나올 확률이 줄어듭니다. 첫 번째 결과가 두 번째 확률을 바꾸므로 두 사건은 서로 종속입니다.',
        },
      },
      {
        title: '독립의 판정',
        body: '$P(A)>0$, $P(B)>0$일 때, 곱셈정리 $P(A\\cap B)=P(A)P(B|A)$에서 $P(B|A)=P(B)$이면 $P(A\\cap B)=P(A)P(B)$입니다. 거꾸로도 성립하므로\n\n' +
          '**두 사건 $A$, $B$가 서로 독립 $\\iff$ $P(A\\cap B)=P(A)P(B)$**\n\n' +
          '입니다. 독립인지 판정할 때는 $P(A)$, $P(B)$, $P(A\\cap B)$를 각각 구해 이 식이 성립하는지 확인합니다.\n\n' +
          '예: 주사위 한 개를 던질 때\n\n' +
          '- $A$: 짝수의 눈, $B$: 3의 배수의 눈 → $P(A\\cap B)=P(\\{6\\})=\\frac{1}{6}$, $P(A)P(B)=\\frac{1}{2}\\times\\frac{1}{3}=\\frac{1}{6}$ → 독립\n' +
          '- $A$: 짝수의 눈, $C$: 4 이상의 눈 → $P(A\\cap C)=P(\\{4,6\\})=\\frac{1}{3}$, $P(A)P(C)=\\frac{1}{4}$ → 종속\n\n' +
          '> 💡 $A$와 $B$가 서로 독립이면 $A$와 $B^{C}$, $B$와 $A^{C}$, 그리고 두 여사건 $A^{C}$, $B^{C}$도 각각 서로 독립입니다.',
        easy: '짝수 눈 3개 중 3의 배수는 6 하나로 $\\frac{1}{3}$, 전체 6개 중 3의 배수는 3, 6 둘로 역시 $\\frac{1}{3}$입니다. 짝수라는 정보를 알든 모르든 3의 배수일 확률이 똑같으니 독립입니다.\n\n' +
          '"정보를 알기 전과 후의 확률이 같은가"를 계산으로 확인하는 것이 $P(A\\cap B)=P(A)P(B)$입니다.',
        check: {
          type: 'ox',
          q: '주사위 한 개를 던질 때, 짝수의 눈이 나오는 사건과 2 이하의 눈이 나오는 사건은 서로 독립입니다.',
          answer: true,
          explain: '$A=\\{2,4,6\\}$, $B=\\{1,2\\}$이므로 $P(A\\cap B)=P(\\{2\\})=\\frac{1}{6}$이고, $P(A)P(B)=\\frac{1}{2}\\times\\frac{1}{3}=\\frac{1}{6}$입니다. 두 값이 같으므로 서로 독립입니다.',
        },
      },
      {
        title: '배반과 독립은 다르다',
        body: '**서로 배반**: $A\\cap B=\\varnothing$, 곧 두 사건이 동시에 일어나지 않는다 → $P(A\\cap B)=0$\n\n' +
          '**서로 독립**: 한 사건이 다른 사건의 확률에 영향을 주지 않는다 → $P(A\\cap B)=P(A)P(B)$\n\n' +
          '$P(A)>0$, $P(B)>0$인 두 사건이 서로 배반이면 $P(A\\cap B)=0$이지만 $P(A)P(B)>0$이므로 **독립이 아니라 종속**입니다. 실제로 $A$가 일어났다는 것을 알면 $B$는 절대 일어나지 않으므로 $P(B|A)=0$이 되어, 큰 영향을 받습니다.\n\n' +
          '| | 서로 배반 | 서로 독립 |\n|---|---|---|\n| 뜻 | 동시에 일어나지 않음 | 서로 확률에 영향 없음 |\n| 식 | $P(A\\cap B)=0$ | $P(A\\cap B)=P(A)P(B)$ |\n| 확률을 더할 때 | $P(A\\cup B)=P(A)+P(B)$ | $P(A\\cup B)=P(A)+P(B)-P(A)P(B)$ |\n\n' +
          '예: 주사위 한 번에서 "짝수"와 "홀수"는 서로 배반이고, 그래서 서로 종속입니다.',
        easy: '"짝수"와 "홀수"는 함께 나올 수 없습니다(배반). 그런데 "짝수가 나왔다"고 들으면 홀수일 확률은 단번에 0이 됩니다. 정보가 확률을 크게 바꾸었으니 둘은 오히려 강하게 얽힌, 종속인 사건입니다.\n\n' +
          '배반은 "겹치지 않는다", 독립은 "서로 상관없다"로 기억하십시오.',
        check: {
          type: 'ox',
          q: '$P(A)>0$, $P(B)>0$인 두 사건 $A$, $B$가 서로 배반이면 $A$와 $B$는 서로 독립입니다.',
          answer: false,
          explain: '서로 배반이면 $P(A\\cap B)=0$인데 $P(A)P(B)>0$이므로 $P(A\\cap B)\\ne P(A)P(B)$입니다. 따라서 서로 종속입니다.',
        },
      },
      {
        title: '독립인 사건의 확률 계산',
        body: '두 사건 $A$, $B$가 서로 독립이면 다음과 같이 계산합니다.\n\n' +
          '- 둘 다 일어날 확률: $P(A\\cap B)=P(A)P(B)$\n' +
          '- 둘 다 일어나지 않을 확률: $P(A^{C}\\cap B^{C})=\\{1-P(A)\\}\\{1-P(B)\\}$\n' +
          '- 적어도 하나가 일어날 확률: $P(A\\cup B)=1-\\{1-P(A)\\}\\{1-P(B)\\}$\n' +
          '- $A$만 일어날 확률: $P(A\\cap B^{C})=P(A)\\{1-P(B)\\}$\n\n' +
          '예: 민수와 지아가 각각 과녁을 한 번씩 맞힐 확률이 $0.8$, $0.7$이고 두 사람의 결과는 서로 독립입니다.\n\n' +
          '- 두 사람 모두 맞힐 확률: $0.8\\times0.7=0.56$\n' +
          '- 적어도 한 사람이 맞힐 확률: $1-0.2\\times0.3=0.94$\n' +
          '- 한 사람만 맞힐 확률: $0.8\\times0.3+0.2\\times0.7=0.38$',
        easy: '독립이면 "그리고"는 곱하기입니다. 민수가 맞히는 것과 지아가 맞히는 것이 서로 상관없으니, 둘 다 맞힐 확률은 $0.8\\times0.7$입니다.\n\n' +
          '"적어도 한 명"은 여사건 "둘 다 못 맞힘"($0.2\\times0.3=0.06$)을 1에서 빼면 쉽습니다.',
        check: {
          type: 'short', check: 'number',
          q: '서로 독립인 두 사건 $A$, $B$에 대하여 $P(A)=0.3$, $P(B)=0.5$일 때, $P(A\\cap B)$를 구하십시오.',
          answer: '0.15',
          wrong: [{ a: '0.8', why: '두 확률을 더했습니다. 서로 독립이면 $P(A\\cap B)=P(A)P(B)$로 곱합니다.' }],
          explain: '서로 독립이므로 $P(A\\cap B)=P(A)P(B)=0.3\\times0.5=0.15$입니다.',
        },
      },
      {
        title: '독립시행의 확률',
        body: '동전이나 주사위를 여러 번 던질 때처럼, 같은 시행을 되풀이하고 각 시행의 결과가 서로 영향을 주지 않으면 이 시행을 **독립시행**이라고 합니다.\n\n' +
          '한 번의 시행에서 사건 $A$가 일어날 확률이 $p$일 때, $n$번의 독립시행에서 $A$가 정확히 $r$번 일어날 확률은\n\n' +
          '$' + cT('n', 'r') + 'p^{r}(1-p)^{n-r}$ (단, $r=0,1,2,\\cdots,n$)\n\n' +
          '입니다. $A$가 일어나는 특정한 순서 하나(예: ○○×○×)의 확률은 독립이므로 $p^{r}(1-p)^{n-r}$이고, $n$번 중 $A$가 일어날 $r$번의 자리를 고르는 방법이 $' + cT('n', 'r') + '$가지이기 때문입니다.\n\n' +
          '예: 주사위 한 개를 4번 던질 때 1의 눈이 정확히 2번 나올 확률은\n\n' +
          '$' + cT(4, 2) + '\\left(\\frac{1}{6}\\right)^{2}\\left(\\frac{5}{6}\\right)^{2}=6\\times\\frac{25}{1296}=\\frac{25}{216}$\n\n' +
          '> ⚠️ "$r$번 이상"이면 $r$번, $r+1$번, …, $n$번인 경우의 확률을 모두 더합니다(서로 배반). 더할 것이 많으면 여사건을 씁니다.',
        easy: '동전 3번 중 앞면이 2번 나오는 순서는 앞앞뒤, 앞뒤앞, 뒤앞앞의 3가지입니다. 하나하나의 확률은 모두 $\\frac{1}{2}\\times\\frac{1}{2}\\times\\frac{1}{2}=\\frac{1}{8}$이니, 전부 더하면 $3\\times\\frac{1}{8}=\\frac{3}{8}$입니다.\n\n' +
          '"순서 하나의 확률"에 "그런 순서의 개수 ${}_{3}\\mathrm{C}_{2}=3$"을 곱한 것이 공식입니다.',
        check: {
          type: 'short', check: 'number',
          q: '동전 한 개를 3번 던질 때, 앞면이 정확히 2번 나올 확률을 구하십시오.',
          answer: '3/8',
          wrong: [{ a: '1/8', why: '앞앞뒤처럼 순서 하나의 확률만 구했습니다. 앞면이 나오는 2번의 자리를 고르는 ${}_{3}\\mathrm{C}_{2}=3$가지를 곱합니다.' }],
          explain: '${}_{3}\\mathrm{C}_{2}\\left(\\frac{1}{2}\\right)^{2}\\left(\\frac{1}{2}\\right)^{1}=3\\times\\frac{1}{8}=\\frac{3}{8}$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '주사위 한 개를 던질 때, 3 이하의 눈이 나오는 사건을 $A$, 소수의 눈이 나오는 사건을 $B$라 합니다. 두 사건 $A$, $B$는 서로 독립인지 판정하십시오.',
        steps: [
          '$A=\\{1,2,3\\}$, $B=\\{2,3,5\\}$이므로 $P(A)=\\frac{1}{2}$, $P(B)=\\frac{1}{2}$입니다.',
          '$A\\cap B=\\{2,3\\}$이므로 $P(A\\cap B)=\\frac{2}{6}=\\frac{1}{3}$입니다.',
          '$P(A)P(B)=\\frac{1}{4}$이고 $\\frac{1}{3}\\ne\\frac{1}{4}$이므로 $P(A\\cap B)\\ne P(A)P(B)$입니다.',
          '따라서 $A$와 $B$는 서로 종속입니다. ($P(B|A)=\\frac{2}{3}$로 $P(B)=\\frac{1}{2}$보다 커집니다.)',
        ],
        answer: '서로 종속',
      },
      {
        q: '자유투 성공률이 $\\frac{2}{3}$인 선수가 자유투를 3번 던질 때, 2번 이상 성공할 확률을 구하십시오. (각 자유투의 결과는 서로 독립입니다.)',
        steps: [
          '"2번 이상"은 2번 성공하는 경우와 3번 성공하는 경우입니다. 두 경우는 서로 배반입니다.',
          '2번 성공: ${}_{3}\\mathrm{C}_{2}\\left(\\frac{2}{3}\\right)^{2}\\left(\\frac{1}{3}\\right)=3\\times\\frac{4}{27}=\\frac{12}{27}$',
          '3번 성공: ${}_{3}\\mathrm{C}_{3}\\left(\\frac{2}{3}\\right)^{3}=\\frac{8}{27}$',
          '더하면 $\\frac{12}{27}+\\frac{8}{27}=\\frac{20}{27}$입니다.',
        ],
        answer: '$\\frac{20}{27}$',
      },
    ],

    terms: [
      { term: '독립', def: '한 사건이 일어나는 것이 다른 사건이 일어날 확률에 영향을 주지 않는 것입니다. $P(A\\cap B)=P(A)P(B)$이면 $A$와 $B$는 서로 독립입니다.' },
      { term: '종속', def: '두 사건이 서로 독립이 아닌 것입니다. 한 사건이 일어났다는 정보가 다른 사건의 확률을 바꿉니다.' },
      { term: '독립시행', def: '같은 시행을 되풀이할 때 각 시행의 결과가 서로 영향을 주지 않는 시행입니다. 예: 동전을 여러 번 던지기, 꺼낸 공을 다시 넣고 꺼내기' },
      { term: '독립시행의 확률', def: '한 번에 일어날 확률이 $p$인 사건이 $n$번의 독립시행에서 정확히 $r$번 일어날 확률로, ${}_{n}\\mathrm{C}_{r}p^{r}(1-p)^{n-r}$입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 3,
        q: '서로 독립인 두 사건 $A$, $B$에 대하여 $P(A)=\\frac{1}{3}$, $P(B)=\\frac{3}{5}$일 때, $P(A\\cap B)$를 구하십시오.',
        answer: '1/5',
        wrong: [{ a: '14/15', why: '두 확률을 더했습니다. 서로 독립이면 $P(A\\cap B)=P(A)P(B)$로 곱합니다.' }],
        explain: '$P(A\\cap B)=P(A)P(B)=\\frac{1}{3}\\times\\frac{3}{5}=\\frac{1}{5}$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 1,
        q: '주사위 한 개를 던질 때, 홀수의 눈이 나오는 사건과 소수의 눈이 나오는 사건은 서로 독립입니다.',
        answer: false,
        explain: '$A=\\{1,3,5\\}$, $B=\\{2,3,5\\}$이므로 $P(A\\cap B)=P(\\{3,5\\})=\\frac{1}{3}$이고 $P(A)P(B)=\\frac{1}{2}\\times\\frac{1}{2}=\\frac{1}{4}$입니다. 두 값이 다르므로 서로 종속입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 0,
        q: '다음 중 두 사건 $A$, $B$가 서로 독립인 것은 무엇입니까?',
        choices: [
          '주사위 한 개를 던질 때, $A$: 짝수의 눈, $B$: 홀수의 눈',
          '주사위 한 개를 던질 때, $A$: 짝수의 눈, $B$: 3 이하의 눈',
          '동전과 주사위를 함께 던질 때, $A$: 앞면, $B$: 6의 눈',
          '주사위 한 개를 던질 때, $A$: 4 이상의 눈, $B$: 5 이상의 눈',
        ],
        answer: 2,
        why: [
          '두 사건은 서로 배반입니다. 짝수가 나오면 홀수일 확률이 0이 되므로 종속입니다.',
          '$P(A\\cap B)=P(\\{2\\})=\\frac{1}{6}$이지만 $P(A)P(B)=\\frac{1}{4}$이므로 종속입니다.',
          '',
          '$B\\subset A$이므로 $P(A\\cap B)=\\frac{1}{3}$이지만 $P(A)P(B)=\\frac{1}{2}\\times\\frac{1}{3}=\\frac{1}{6}$입니다. 종속입니다.',
        ],
        explain: '동전의 결과는 주사위의 결과에 영향을 주지 않으므로 서로 독립입니다. 실제로 $P(A\\cap B)=\\frac{1}{12}=\\frac{1}{2}\\times\\frac{1}{6}$입니다. 나머지는 모두 $P(A\\cap B)\\ne P(A)P(B)$인 종속입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 2,
        q: '$P(A)=\\frac{1}{2}$, $P(B)=\\frac{1}{3}$인 두 사건 $A$, $B$가 서로 배반일 때, $P(A\\cap B)$의 값은 무엇입니까?',
        choices: ['$0$', '$\\frac{1}{6}$', '$\\frac{5}{6}$', '$\\frac{2}{3}$'],
        answer: 0,
        why: [
          '',
          '서로 독립일 때의 계산 $P(A)P(B)$를 했습니다. 서로 배반이면 두 사건이 동시에 일어나지 않으므로 $P(A\\cap B)=0$입니다.',
          '$P(A\\cup B)=P(A)+P(B)$를 구했습니다.',
          '서로 독립일 때의 $P(A\\cup B)=P(A)+P(B)-P(A)P(B)$를 구했습니다. 구하는 것은 $P(A\\cap B)$이고, 서로 배반이면 두 사건이 동시에 일어나지 않으므로 0입니다.',
        ],
        explain: '서로 배반이면 $A\\cap B=\\varnothing$이므로 $P(A\\cap B)=0$입니다. $P(A)P(B)=\\frac{1}{6}\\ne0$이므로 두 사건은 서로 종속이기도 합니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 4,
        q: '동전 한 개를 4번 던질 때, 앞면이 정확히 2번 나올 확률을 구하십시오.',
        answer: '3/8',
        wrong: [
          { a: '1/16', why: '앞앞뒤뒤처럼 순서 하나의 확률만 구했습니다. 앞면이 나올 2번의 자리를 고르는 ${}_{4}\\mathrm{C}_{2}=6$가지를 곱합니다.' },
          { a: '1/2', why: '4번 중 2번이 절반이라 $\\frac{1}{2}$로 생각했습니다. 앞면이 0, 1, 3, 4번 나오는 경우도 있습니다.' },
        ],
        explain: '${}_{4}\\mathrm{C}_{2}\\left(\\frac{1}{2}\\right)^{2}\\left(\\frac{1}{2}\\right)^{2}=6\\times\\frac{1}{16}=\\frac{3}{8}$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 3,
        q: '서로 독립인 두 사건 $A$, $B$에 대하여 $P(A)=0.4$, $P(B)=0.5$일 때, $P(A\\cup B)$를 구하십시오.',
        answer: '0.7',
        wrong: [
          { a: '0.9', why: '$P(A\\cap B)$를 빼지 않았습니다. 서로 독립이면 $P(A\\cap B)=0.4\\times0.5=0.2$입니다.' },
          { a: '0.2', why: '$P(A\\cap B)$를 구했습니다. 합사건의 확률은 덧셈정리로 구합니다.' },
        ],
        explain: '$P(A\\cap B)=P(A)P(B)=0.2$이므로 $P(A\\cup B)=0.4+0.5-0.2=0.7$입니다. 여사건으로 $1-0.6\\times0.5=0.7$로 구해도 됩니다.',
      },
      {
        id: 'p7', level: 2, type: 'short', check: 'number', concept: 3,
        q: '민수와 지아가 과녁을 한 번씩 쏩니다. 민수가 맞힐 확률은 $\\frac{3}{4}$, 지아가 맞힐 확률은 $\\frac{2}{3}$이고 두 사람의 결과는 서로 독립입니다. 두 사람 중 한 사람만 맞힐 확률을 구하십시오.',
        answer: '5/12',
        hint: '"민수만 맞힘"과 "지아만 맞힘"으로 나눕니다.',
        wrong: [
          { a: '1/2', why: '두 사람 모두 맞힐 확률 $\\frac{3}{4}\\times\\frac{2}{3}$를 구했습니다.' },
          { a: '11/12', why: '적어도 한 사람이 맞힐 확률을 구했습니다. 두 사람 모두 맞히는 경우는 빼야 합니다.' },
        ],
        explain: '민수만 맞힘: $\\frac{3}{4}\\times\\frac{1}{3}=\\frac{3}{12}$, 지아만 맞힘: $\\frac{1}{4}\\times\\frac{2}{3}=\\frac{2}{12}$입니다. 두 경우는 서로 배반이므로 $\\frac{3}{12}+\\frac{2}{12}=\\frac{5}{12}$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 3,
        q: '서로 독립인 두 사건 $A$, $B$에 대하여 $P(A)=\\frac{1}{2}$, $P(A\\cup B)=\\frac{2}{3}$일 때, $P(B)$를 구하십시오.',
        answer: '1/3',
        hint: '$P(B)=p$로 놓고 $P(A\\cap B)=\\frac{1}{2}p$를 덧셈정리에 넣습니다.',
        wrong: [{ a: '1/6', why: '$P(A\\cup B)-P(A)$로 계산해 $P(A\\cap B)$를 빠뜨렸습니다.' }],
        explain: '$P(B)=p$라 하면 독립이므로 $P(A\\cap B)=\\frac{1}{2}p$입니다. $\\frac{2}{3}=\\frac{1}{2}+p-\\frac{1}{2}p$에서 $\\frac{1}{2}p=\\frac{1}{6}$, $p=\\frac{1}{3}$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
        q: '주사위 한 개를 3번 던질 때, 3의 배수의 눈이 2번 이상 나올 확률을 구하십시오.',
        answer: '7/27',
        hint: '2번 나오는 경우와 3번 나오는 경우를 더합니다.',
        wrong: [
          { a: '2/9', why: '정확히 2번 나오는 경우만 구했습니다. 3번 모두 나오는 경우 $\\frac{1}{27}$도 더합니다.' },
          { a: '1/27', why: '3번 모두 나오는 경우만 구했습니다.' },
        ],
        explain: '한 번 던질 때 3의 배수의 눈이 나올 확률은 $\\frac{1}{3}$입니다.\n\n2번: ${}_{3}\\mathrm{C}_{2}\\left(\\frac{1}{3}\\right)^{2}\\left(\\frac{2}{3}\\right)=\\frac{6}{27}$, 3번: $\\left(\\frac{1}{3}\\right)^{3}=\\frac{1}{27}$\n\n더하면 $\\frac{7}{27}$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 1,
        q: '어느 학교 학생 100명에게 새 규칙에 대한 찬반을 물은 가상의 결과입니다. 임의로 뽑은 학생이 남학생인 사건과 찬성한 학생인 사건에 대하여 옳은 것은 무엇입니까?\n\n| 구분 | 찬성 | 반대 | 합계 |\n|---|---|---|---|\n| 남학생 | 36 | 24 | 60 |\n| 여학생 | 24 | 16 | 40 |\n| 합계 | 60 | 40 | 100 |',
        choices: [
          '서로 독립이다. 남학생일 때 찬성할 확률이 전체의 찬성 확률과 같으므로',
          '서로 종속이다. 찬성한 남학생이 찬성한 여학생보다 많으므로',
          '서로 종속이다. 남학생 수와 여학생 수가 서로 다르므로',
          '서로 독립이다. 남학생이면서 여학생인 학생은 없으므로',
        ],
        answer: 0,
        why: [
          '',
          '개수를 비교하면 안 됩니다. 남학생이 더 많으니 찬성한 남학생 수도 많을 수 있습니다. 비율($P(\\text{찬성}|\\text{남})$)을 비교해야 합니다.',
          '두 집단의 크기는 독립 여부와 관계가 없습니다. 조건부확률과 확률을 비교합니다.',
          '남학생과 여학생이 배반이라는 것은 이 두 사건(남학생, 찬성)의 독립 여부와 관계가 없습니다.',
        ],
        hint: '$P(\\text{찬성}|\\text{남학생})$과 $P(\\text{찬성})$을 비교해 보십시오.',
        explain: '$P(\\text{찬성})=\\frac{60}{100}=\\frac{3}{5}$, $P(\\text{찬성}|\\text{남학생})=\\frac{36}{60}=\\frac{3}{5}$으로 같으므로 서로 독립입니다. $P(\\text{남}\\cap\\text{찬성})=\\frac{36}{100}=\\frac{60}{100}\\times\\frac{60}{100}$으로 확인할 수도 있습니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 4,
        q: '어떤 게임에서 한 번 도전할 때 성공할 확률이 $\\frac{1}{5}$입니다. 이 게임에 4번 도전할 때, 적어도 한 번 성공할 확률을 구하십시오. (각 도전의 결과는 서로 독립입니다.)',
        answer: '369/625',
        hint: '여사건은 "4번 모두 실패"입니다.',
        wrong: [
          { a: '256/625', why: '여사건 "4번 모두 실패"의 확률을 구했습니다.' },
          { a: '4/5', why: '$\\frac{1}{5}$을 4번 더했습니다. 여러 번 성공하는 경우가 겹쳐 세어집니다.' },
        ],
        explain: '4번 모두 실패할 확률은 $\\left(\\frac{4}{5}\\right)^{4}=\\frac{256}{625}$이므로, 적어도 한 번 성공할 확률은 $1-\\frac{256}{625}=\\frac{369}{625}$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 3,
        q: '서로 독립인 두 사건 $A$, $B$에 대하여 $P(A)=P(B)$이고 $P(A\\cup B)=\\frac{3}{4}$일 때, $P(A)$를 구하십시오.',
        answer: '1/2',
        hint: '$P(A)=p$로 놓으면 $P(A\\cup B)=2p-p^{2}$입니다.',
        wrong: [{ a: '3/8', why: '$P(A\\cup B)=2p$로 놓아 $P(A\\cap B)=p^{2}$을 빠뜨렸습니다.' }],
        explain: '$P(A)=P(B)=p$라 하면 $P(A\\cap B)=p^{2}$이므로 $2p-p^{2}=\\frac{3}{4}$, 곧 $4p^{2}-8p+3=0$, $(2p-1)(2p-3)=0$입니다. $0\\le p\\le1$이므로 $p=\\frac{1}{2}$입니다. 여사건으로 $(1-p)^{2}=\\frac{1}{4}$에서 구해도 됩니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 4,
        q: 'A팀과 B팀이 경기를 하여 먼저 3번 이긴 팀이 우승합니다. 한 경기에서 A팀이 이길 확률은 $\\frac{2}{3}$이고, 비기는 경우는 없으며 각 경기의 결과는 서로 독립입니다. A팀이 우승할 확률을 구하십시오.',
        answer: '64/81',
        hint: 'A팀이 3승 0패, 3승 1패, 3승 2패로 우승하는 경우로 나눕니다. 마지막 경기는 반드시 A팀이 이깁니다.',
        wrong: [
          { a: '8/27', why: '3연승으로 우승하는 경우만 구했습니다. 3승 1패, 3승 2패로 우승하는 경우도 더합니다.' },
          { a: '16/27', why: '3승 0패와 3승 1패만 구했습니다. 3승 2패로 우승하는 경우도 더합니다.' },
        ],
        explain: '- 3승 0패: $\\left(\\frac{2}{3}\\right)^{3}=\\frac{8}{27}=\\frac{24}{81}$\n' +
          '- 3승 1패: 앞의 3경기에서 2승 1패, 넷째 경기 승리: ${}_{3}\\mathrm{C}_{2}\\left(\\frac{2}{3}\\right)^{2}\\left(\\frac{1}{3}\\right)\\times\\frac{2}{3}=\\frac{24}{81}$\n' +
          '- 3승 2패: 앞의 4경기에서 2승 2패, 다섯째 경기 승리: ${}_{4}\\mathrm{C}_{2}\\left(\\frac{2}{3}\\right)^{2}\\left(\\frac{1}{3}\\right)^{2}\\times\\frac{2}{3}=\\frac{16}{81}$\n\n' +
          '서로 배반이므로 더하면 $\\frac{64}{81}$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 4,
        q: '수직선의 원점에 점 P가 있습니다. 동전 한 개를 던져 앞면이 나오면 P를 양의 방향으로 2만큼, 뒷면이 나오면 음의 방향으로 1만큼 옮깁니다. 동전을 5번 던진 뒤 점 P의 좌표가 4일 확률을 구하십시오.',
        answer: '5/16',
        hint: '앞면이 나온 횟수를 $x$로 놓고 좌표를 $x$로 나타내 보십시오.',
        wrong: [
          { a: '1/32', why: '앞면 3번, 뒷면 2번이 나오는 순서 하나의 확률만 구했습니다. ${}_{5}\\mathrm{C}_{3}=10$가지 순서가 있습니다.' },
          { a: '5/32', why: '앞면이 4번 나오는 경우로 계산했습니다. 앞면 4번이면 좌표는 $8-1=7$입니다.' },
        ],
        explain: '앞면이 $x$번 나오면 뒷면은 $5-x$번이므로 좌표는 $2x-(5-x)=3x-5$입니다. $3x-5=4$에서 $x=3$입니다.\n\n구하는 확률은 ${}_{5}\\mathrm{C}_{3}\\left(\\frac{1}{2}\\right)^{3}\\left(\\frac{1}{2}\\right)^{2}=\\frac{10}{32}=\\frac{5}{16}$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', unit: '개', concept: 1,
        q: '주사위 한 개를 던지는 시행에서 표본공간은 $S=\\{1,2,3,4,5,6\\}$이고 사건 $A=\\{1,2,3\\}$입니다. $A$와 서로 독립이면서 원소가 2개인 사건 $B$는 모두 몇 개입니까?',
        answer: '9',
        hint: '$P(A\\cap B)=P(A)P(B)$에서 $n(A\\cap B)$가 얼마여야 하는지 구합니다.',
        wrong: [
          { a: '15', why: '원소가 2개인 사건을 모두 세었습니다. 독립 조건 $P(A\\cap B)=P(A)P(B)$를 만족하는 것만 셉니다.' },
          { a: '6', why: '$B\\subset A$이거나 $B\\subset A^{C}$인 경우를 세었습니다. 이 경우는 $n(A\\cap B)$가 2 또는 0이라 독립이 아닙니다.' },
        ],
        explain: '$P(B)=\\frac{2}{6}=\\frac{1}{3}$이므로 독립이려면 $P(A\\cap B)=\\frac{1}{2}\\times\\frac{1}{3}=\\frac{1}{6}$, 곧 $n(A\\cap B)=1$이어야 합니다. $B$의 원소 하나는 $A$에서(3가지), 다른 하나는 $A^{C}=\\{4,5,6\\}$에서(3가지) 고르므로 $3\\times3=9$개입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 1,
        q: '서로 독립인 두 사건 $A$, $B$에 대하여 $P(A)=0.3$, $P(B)=0.6$일 때, $P(A^{C}\\cup B^{C})$를 구하십시오.',
        answer: '0.82',
        hint: '$A\\cap B$의 여사건이 바로 $A^{C}\\cup B^{C}$입니다.',
        wrong: [
          { a: '0.28', why: '$P(A^{C}\\cap B^{C})=0.7\\times0.4$를 구했습니다. 구하는 것은 합사건입니다.' },
          { a: '0.18', why: '$P(A\\cap B)$를 구했습니다. 구하는 사건은 그 여사건입니다.' },
          { a: '1.1', why: '$P(A^{C})+P(B^{C})$로 그냥 더했습니다. 확률은 1보다 클 수 없습니다.' },
        ],
        explain: '"$A$, $B$가 동시에 일어나지는 않는다"는 사건, 곧 $A\\cap B$의 여사건이 $A^{C}\\cup B^{C}$입니다. $P(A\\cap B)=0.3\\times0.6=0.18$이므로 $1-0.18=0.82$입니다.\n\n$A^{C}$, $B^{C}$도 서로 독립임을 이용해 $0.7+0.4-0.7\\times0.4=0.82$로 구해도 같습니다.',
      },
    ],

    deeper: [
      {
        title: '\'적어도 하나\'는 왜 생각보다 클까',
        body: '한 번 해서 성공할 확률이 $p$로 작아도, 독립적으로 여러 번 하면 적어도 한 번 성공할 확률 $1-(1-p)^{n}$은 빠르게 커집니다. 예를 들어 $p=\\frac{1}{6}$(주사위의 6)일 때\n\n' +
          '| 던진 횟수 $n$ | 1 | 4 | 10 | 20 |\n|---|---|---|---|---|\n| 적어도 한 번 6 | 약 0.17 | 약 0.52 | 약 0.84 | 약 0.97 |\n\n' +
          '4번만 던져도 절반을 넘습니다. 17세기에 도박사들이 "주사위 4번에 6이 한 번이라도 나오는 쪽에 거는 내기"가 유리하다는 것을 경험으로 알았고, 파스칼과 페르마가 편지를 주고받으며 이런 문제를 풀어 확률론의 기초를 놓았다고 전해집니다.',
      },
      {
        title: '다음 단원과의 연결 — 이항분포',
        body: '독립시행에서 사건 $A$가 일어나는 횟수를 $X$라 하면, $X$가 $r$일 확률은 ${}_{n}\\mathrm{C}_{r}p^{r}(1-p)^{n-r}$입니다. 이처럼 횟수 $X$의 값마다 확률을 대응시킨 것을 다음 단원들에서 **확률분포**라 하고, 특히 이 꼴의 분포를 **이항분포**라고 부릅니다. 이름은 $(q+p)^{n}$을 이항정리로 전개했을 때의 각 항이 바로 이 확률들이라는 데서 왔습니다.',
      },
    ],

    faq: [
      {
        q: '배반이면 독립 아니에요? 둘 다 "상관없다"는 느낌인데요.',
        a: '반대입니다. 배반은 "동시에 일어날 수 없다"는 뜻이라, 한 사건이 일어나면 다른 사건은 확률이 0이 됩니다. 정보가 확률을 크게 바꾸므로 종속입니다(두 확률이 모두 0보다 클 때). 독립은 "한 사건이 일어나든 말든 다른 사건의 확률이 그대로"라는 뜻입니다.',
      },
      {
        q: '독립인지 어떻게 알아요? 문제에 안 쓰여 있으면요?',
        a: '동전·주사위를 여러 번 던지기, 꺼낸 것을 다시 넣고 꺼내기처럼 시행이 서로 영향을 주지 않는 상황이면 독립으로 봅니다. 확실하지 않으면 $P(A)$, $P(B)$, $P(A\\cap B)$를 직접 구해 $P(A\\cap B)=P(A)P(B)$인지 확인하십시오. 계산으로 판정하는 것이 가장 정확합니다.',
      },
      {
        q: '독립시행 공식에서 nCr은 왜 곱해요?',
        a: '$n$번 중 $r$번 성공하는 결과는 성공하는 자리를 어디에 두느냐에 따라 여러 가지입니다. 자리마다 확률은 모두 $p^{r}(1-p)^{n-r}$으로 같고, 자리를 고르는 방법이 ${}_{n}\\mathrm{C}_{r}$가지이므로 곱합니다. 동전 3번 중 앞면 2번이면 앞앞뒤, 앞뒤앞, 뒤앞앞의 3가지입니다.',
      },
    ],

    mistakes: [
      '서로 배반인 사건을 서로 독립이라고 생각하는 실수 — 확률이 0보다 큰 두 사건이 배반이면 오히려 종속입니다.',
      '독립시행의 확률에서 ${}_{n}\\mathrm{C}_{r}$를 빠뜨리고 $p^{r}(1-p)^{n-r}$만 쓰는 실수 — 그것은 순서 하나의 확률입니다.',
      '"$r$번 이상"을 "정확히 $r$번"으로 계산하는 실수 — $r$번부터 $n$번까지의 확률을 모두 더합니다.',
    ],

    gens: [
      {
        id: 'indep-calc',
        level: 1,
        title: '독립인 두 사건의 확률 계산',
        make: function (R) {
          var F = R.F;
          var b = R.int(2, 6), d = R.int(2, 6);
          var p = F(R.int(1, b - 1), b), q = F(R.int(1, d - 1), d);
          var pc = F(1).sub(p), qc = F(1).sub(q);
          var fp = R.fmt.frac(p), fq = R.fmt.frac(q);
          var kind = R.pick(['and', 'or', 'only', 'none']);
          var ans, ask, ex, cands = [];
          if (kind === 'and') {
            ans = p.mul(q); ask = 'P(A\\cap B)';
            ex = 'P(A\\cap B)=P(A)P(B)=' + fp + '\\times' + fq + '=' + R.fmt.frac(ans);
            cands.push([p.add(q), '두 확률을 더했습니다. 서로 독립이면 곱합니다.']);
          } else if (kind === 'or') {
            ans = p.add(q).sub(p.mul(q)); ask = 'P(A\\cup B)';
            ex = 'P(A\\cup B)=P(A)+P(B)-P(A)P(B)=' + fp + '+' + fq + '-' + R.fmt.frac(p.mul(q)) + '=' + R.fmt.frac(ans);
            cands.push([p.add(q), '$P(A\\cap B)=P(A)P(B)$를 빼지 않았습니다.']);
            cands.push([p.mul(q), '$P(A\\cap B)$를 구했습니다. 합사건의 확률은 덧셈정리로 구합니다.']);
          } else if (kind === 'only') {
            ans = p.mul(qc); ask = 'P(A\\cap B^{C})';
            ex = '$A$와 $B^{C}$도 서로 독립이므로 $P(A\\cap B^{C})=P(A)\\{1-P(B)\\}=' + fp + '\\times' + R.fmt.frac(qc) + '=' + R.fmt.frac(ans) + '$입니다.';
            cands.push([p.mul(q), '$P(A\\cap B)$를 구했습니다. $B^{C}$의 확률은 $1-P(B)$입니다.']);
            cands.push([p.sub(q), '$P(A)-P(B)$로 계산했습니다. $P(A\\cap B^{C})=P(A)-P(A\\cap B)$입니다.']);
          } else {
            ans = pc.mul(qc); ask = 'P(A^{C}\\cap B^{C})';
            ex = '두 여사건도 서로 독립이므로 $P(A^{C}\\cap B^{C})=\\{1-P(A)\\}\\{1-P(B)\\}=' + R.fmt.frac(pc) + '\\times' + R.fmt.frac(qc) + '=' + R.fmt.frac(ans) + '$입니다.';
            cands.push([F(1).sub(p.mul(q)), '$1-P(A)P(B)$, 곧 $A\\cap B$의 여사건의 확률을 구했습니다. 구하는 사건은 $A\\cup B$의 여사건입니다.']);
            cands.push([F(1).sub(p).sub(q), '$1-P(A)-P(B)$로 계산해 $P(A\\cap B)$를 빠뜨렸습니다.']);
          }
          if (kind === 'and' || kind === 'or') ex = '서로 독립이므로 $' + ex + '$입니다.';
          var wrong = [];
          cands.forEach(function (c) { if (!c[0].eq(ans)) wrong.push({ a: c[0].toString(), why: c[1] }); });
          return {
            type: 'short', check: 'number', concept: 3,
            q: '서로 독립인 두 사건 $A$, $B$에 대하여 $P(A)=' + fp + '$, $P(B)=' + fq + '$일 때, $' + ask + '$를 구하십시오.',
            answer: ans.toString(),
            wrong: wrong,
            hint: '서로 독립이면 $P(A\\cap B)=P(A)P(B)$이고, 여사건끼리도 서로 독립입니다.',
            explain: ex,
          };
        },
      },
      {
        id: 'binom-exact',
        level: 1,
        title: '독립시행에서 정확히 r번 일어날 확률',
        make: function (R) {
          var F = R.F;
          var ctx = R.pick([
            { t: '동전 한 개를 {n}번 던질 때, 앞면이 정확히 {r}번 나올', p: F(1, 2), one: '앞면이 나올 확률은 $\\frac{1}{2}$' },
            { t: '주사위 한 개를 {n}번 던질 때, 1의 눈이 정확히 {r}번 나올', p: F(1, 6), one: '1의 눈이 나올 확률은 $\\frac{1}{6}$' },
            { t: '주사위 한 개를 {n}번 던질 때, 3의 배수의 눈이 정확히 {r}번 나올', p: F(1, 3), one: '3의 배수의 눈이 나올 확률은 $\\frac{2}{6}=\\frac{1}{3}$' },
            { t: '주사위 한 개를 {n}번 던질 때, 짝수의 눈이 정확히 {r}번 나올', p: F(1, 2), one: '짝수의 눈이 나올 확률은 $\\frac{3}{6}=\\frac{1}{2}$' },
            { t: '주사위 한 개를 {n}번 던질 때, 4 이하의 눈이 정확히 {r}번 나올', p: F(2, 3), one: '4 이하의 눈이 나올 확률은 $\\frac{4}{6}=\\frac{2}{3}$' },
            { t: '성공률이 $\\frac{3}{4}$인 선수가 자유투를 {n}번 던질 때, 정확히 {r}번 성공할', p: F(3, 4), one: '한 번 성공할 확률은 $\\frac{3}{4}$' },
          ]);
          var n = R.int(3, ctx.p.den === 6 ? 4 : 5);
          var r = R.int(1, n - 1);
          var ans = bin(F, n, r, ctx.p);
          var q = F(1).sub(ctx.p);
          var wrong = [];
          var noC = ctx.p.pow(r).mul(q.pow(n - r));
          if (!noC.eq(ans)) wrong.push({ a: noC.toString(), why: '순서 하나의 확률만 구했습니다. ' + r + '번의 자리를 고르는 $' + cT(n, r) + '=' + C(n, r) + '$가지를 곱합니다.' });
          var noQ = F(C(n, r)).mul(ctx.p.pow(r));
          if (!noQ.eq(ans) && noQ.cmp(1) <= 0) wrong.push({ a: noQ.toString(), why: '일어나지 않는 ' + (n - r) + '번의 확률 $' + R.fmt.frac(q) + '$' + R.josa(q.toString(), '을/를') + ' 곱하지 않았습니다.' });
          return {
            type: 'short', check: 'number', concept: 4,
            q: ctx.t.replace('{n}', n).replace('{r}', r) + ' 확률을 구하십시오.' + (ctx.p.den === 4 ? ' (각 자유투의 결과는 서로 독립입니다.)' : ''),
            answer: ans.toString(),
            wrong: wrong,
            hint: '$' + cT('n', 'r') + 'p^{r}(1-p)^{n-r}$',
            explain: '한 번의 시행에서 ' + ctx.one + '입니다. 독립시행의 확률로\n\n$' + binTex(R, n, r, ctx.p) + '=' + R.fmt.frac(ans) + '$입니다.',
          };
        },
      },
      {
        id: 'binom-range',
        level: 2,
        title: '독립시행에서 \'이상\'·\'적어도\'의 확률',
        make: function (R) {
          var F = R.F;
          var ctx = R.pick([
            { s: '동전 한 개를 {n}번 던질 때, 앞면이', p: F(1, 2), v: '나올' },
            { s: '주사위 한 개를 {n}번 던질 때, 6의 눈이', p: F(1, 6), v: '나올' },
            { s: '주사위 한 개를 {n}번 던질 때, 3의 배수의 눈이', p: F(1, 3), v: '나올' },
            { s: '명중률이 $\\frac{2}{3}$인 선수가 화살을 {n}번 쏠 때, 과녁을', p: F(2, 3), v: '맞힐' },
            { s: '성공률이 $\\frac{1}{4}$인 도전을 {n}번 할 때, 성공이', p: F(1, 4), v: '일어날' },
          ]);
          var n = R.int(3, ctx.p.den === 6 ? 4 : 5);
          var mode = R.pick(['atleast1', 'atleastNm1', 'atmost1']);
          var ans = F(0), parts = [], cond, exactWrong, why1;
          var lo, hi;
          if (mode === 'atleast1') { lo = 1; hi = n; cond = '적어도 한 번'; }
          else if (mode === 'atleastNm1') { lo = n - 1; hi = n; cond = (n - 1) + '번 이상'; }
          else { lo = 0; hi = 1; cond = '많아야 한 번(1번 이하)'; }
          for (var k = lo; k <= hi; k++) { ans = ans.add(bin(F, n, k, ctx.p)); parts.push(k); }
          var wrong = [];
          function add(x, why) { if (!x.eq(ans) && !wrong.some(function (w) { return F.apply(null, w.a.split('/').map(Number)).eq(x); })) wrong.push({ a: x.toString(), why: why }); }
          var expl;
          var qq = F(1).sub(ctx.p);
          if (mode === 'atleast1') {
            var none = qq.pow(n);
            add(none, '여사건 "' + n + '번 모두 일어나지 않음"의 확률을 구했습니다.');
            add(bin(F, n, 1, ctx.p), '정확히 한 번인 경우만 구했습니다. 2번 이상인 경우도 \'적어도 한 번\'에 들어갑니다.');
            expl = '여사건은 "' + n + '번 모두 일어나지 않음"이고 그 확률은 $\\left(' + R.fmt.frac(qq) + '\\right)^{' + n + '}=' + R.fmt.frac(none) + '$입니다.\n\n따라서 구하는 확률은 $1-' + R.fmt.frac(none) + '=' + R.fmt.frac(ans) + '$입니다.';
          } else {
            var a0 = bin(F, n, parts[0], ctx.p), a1 = bin(F, n, parts[1], ctx.p);
            add(a0, (mode === 'atleastNm1' ? '정확히 ' + (n - 1) + '번' : '한 번도 일어나지 않는 경우') + '만 구했습니다. ' + (mode === 'atleastNm1' ? n + '번 모두 일어나는 경우도 더합니다.' : '정확히 한 번인 경우도 더합니다.'));
            add(a1, (mode === 'atleastNm1' ? n + '번 모두 일어나는 경우' : '정확히 한 번인 경우') + '만 구했습니다. 두 경우를 더합니다.');
            add(F(1).sub(ans), '구하는 사건의 여사건의 확률을 구했습니다.');
            expl = parts[0] + '번인 경우와 ' + parts[1] + '번인 경우를 더합니다(서로 배반).\n\n' +
              '$' + binTex(R, n, parts[0], ctx.p) + '=' + R.fmt.frac(a0) + '$\n\n' +
              '$' + binTex(R, n, parts[1], ctx.p) + '=' + R.fmt.frac(a1) + '$\n\n' +
              '더하면 $' + R.fmt.frac(ans) + '$입니다.';
          }
          return {
            type: 'short', check: 'number', concept: 4,
            q: ctx.s.replace('{n}', n) + ' ' + cond + ' ' + ctx.v + ' 확률을 구하십시오. (각 시행의 결과는 서로 독립입니다.)',
            answer: ans.toString(),
            wrong: wrong,
            hint: mode === 'atleast1' ? '여사건을 이용합니다.' : '해당하는 횟수마다 독립시행의 확률을 구해 더합니다.',
            explain: expl,
          };
        },
      },
      {
        id: 'indep-judge',
        level: 2,
        title: '카드 뽑기에서 독립·종속 판정',
        make: function (R) {
          var F = R.F;
          var N = R.pick([6, 8, 10, 12]);
          function evs() {
            var k1 = R.int(2, N - 2), k2 = R.int(3, N - 1);
            return [
              { t: '짝수', f: function (x) { return x % 2 === 0; } },
              { t: '홀수', f: function (x) { return x % 2 === 1; } },
              { t: '3의 배수', f: function (x) { return x % 3 === 0; } },
              { t: '4의 배수', f: function (x) { return x % 4 === 0; } },
              { t: '소수', f: function (x) { return R.isPrime(x); } },
              { t: k1 + ' 이하', f: function (x) { return x <= k1; } },
              { t: k2 + ' 이상', f: function (x) { return x >= k2; } },
            ];
          }
          var want = R.bool(), A, B, sa, sb, sab, indep, tries = 0;
          do {
            var list = evs();
            var pair = R.sample(list, 2);
            A = pair[0]; B = pair[1];
            sa = []; sb = []; sab = [];
            for (var x = 1; x <= N; x++) {
              if (A.f(x)) sa.push(x);
              if (B.f(x)) sb.push(x);
              if (A.f(x) && B.f(x)) sab.push(x);
            }
            var ok = sa.length > 0 && sa.length < N && sb.length > 0 && sb.length < N && !(/짝수|홀수/.test(A.t) && /짝수|홀수/.test(B.t));
            indep = sab.length * N === sa.length * sb.length;
            tries++;
          } while ((!ok || indep !== want) && tries < 60);
          var pa = F(sa.length, N), pb = F(sb.length, N), pab = F(sab.length, N);
          var set = function (s) { return s.length ? '\\{' + s.join(',') + '\\}' : '\\varnothing'; };
          return {
            type: 'ox', concept: 1,
            q: '1부터 ' + N + '까지의 자연수가 하나씩 적힌 카드 ' + N + '장 중에서 한 장을 뽑을 때, 뽑은 수가 ' + A.t + '인 사건을 $A$, ' + B.t + '인 사건을 $B$라 합니다. 두 사건 $A$, $B$는 서로 독립입니다.',
            answer: indep,
            explain: '$A=' + set(sa) + '$, $B=' + set(sb) + '$, $A\\cap B=' + set(sab) + '$입니다.\n\n' +
              '$P(A)P(B)=' + R.fmt.frac(pa) + '\\times' + R.fmt.frac(pb) + '=' + R.fmt.frac(pa.mul(pb)) + '$, $P(A\\cap B)=' + R.fmt.frac(pab) + '$\n\n' +
              (indep ? '두 값이 같으므로 서로 독립입니다(O).' : '두 값이 다르므로 서로 종속입니다(X).'),
          };
        },
      },
    ],
  });
})();
