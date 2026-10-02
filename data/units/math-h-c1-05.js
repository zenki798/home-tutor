/* 공통수학1 · 판별식과 근과 계수의 관계 */
Tutor.registerUnit({
  id: 'math-h-c1-05',
  course: 'math-h-c1',
  title: '판별식과 근과 계수의 관계',
  summary: '판별식으로 이차방정식의 근이 실근인지 허근인지 가리고, 근과 계수의 관계를 문제 해결에 활용합니다.',
  goals: [
    '계수가 실수인 이차방정식의 근을 복소수 범위에서 구하고 실근과 허근을 구별할 수 있다.',
    '판별식의 부호로 이차방정식의 근을 판별할 수 있다.',
    '근과 계수의 관계를 이용하여 두 근으로 만든 식의 값을 구하고, 두 수를 근으로 하는 이차방정식을 만들 수 있다.',
    '이차식을 복소수 범위에서 인수분해할 수 있다.',
  ],
  standards: ['[10공수1-02-02]', '[10공수1-02-03]'],

  concepts: [
    {
      title: '실근과 허근',
      body: '계수가 실수인 이차방정식 $ax^2+bx+c=0$ $(a\\ne0)$의 근은 근의 공식으로 구합니다.\n\n$x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}$\n\n중학교에서는 근호 안이 음수이면 "근이 없다"고 했지만, 복소수를 배운 지금은 $\\sqrt{-k}=\\sqrt{k}\\,i$ $(k>0)$로 계산할 수 있으므로 **복소수 범위에서 이차방정식은 항상 근을 가집니다.**\n\n- 근 가운데 실수인 것을 **실근**, 허수인 것을 **허근**이라고 합니다.\n- 예: $x^2+2x+5=0$에서 $x=\\dfrac{-2\\pm\\sqrt{-16}}{2}=\\dfrac{-2\\pm4i}{2}=-1\\pm2i$이므로 두 근은 모두 허근입니다.\n\n근의 공식에서 $\\pm$ 앞부분은 같고 근호 부분만 부호가 다르므로, 계수가 실수인 이차방정식이 허근을 가지면 두 허근은 **서로 켤레복소수**입니다($-1+2i$와 $-1-2i$).',
      easy: '근의 공식은 "가운데 값 $\\dfrac{-b}{2a}$에서 같은 거리만큼 양쪽으로 가면 두 근"이라는 뜻입니다. 그 거리를 정하는 것이 근호 안의 수입니다.\n\n근호 안이 양수이면 거리가 실수라서 두 근이 실수 직선 위에 있고, 음수이면 거리가 $i$가 붙은 허수가 되어 두 근이 허수가 됩니다. 이때 두 근은 $-1+2i$, $-1-2i$처럼 $i$ 앞의 부호만 다릅니다.',
      check: {
        type: 'ox',
        q: '계수가 실수인 이차방정식 $x^2+2x+5=0$은 복소수 범위에서 근을 갖지 않습니다.',
        answer: false,
        explain: '복소수 범위에서는 근호 안이 음수여도 계산할 수 있습니다. $x=-1\\pm2i$로 두 허근을 가집니다. 실수 범위에서 근이 없을 뿐입니다.',
      },
    },
    {
      title: '판별식으로 근 판별하기',
      body: '근의 공식에서 근호 안의 식을 이차방정식의 **판별식**이라 하고 $D$로 나타냅니다. 곧 $D=b^2-4ac$입니다. 근을 직접 구하지 않아도 $D$의 부호만으로 근의 종류를 알 수 있습니다.\n\n| $D=b^2-4ac$ | 근 |\n|---|---|\n| $D>0$ | 서로 다른 두 실근 |\n| $D=0$ | 중근 (서로 같은 두 실근) |\n| $D<0$ | 서로 다른 두 허근 |\n\n따라서 **실근을 가질 조건은 $D\\ge0$** 입니다.\n\n$x$의 계수가 짝수, 곧 $b=2b\'$이면 $\\dfrac{D}{4}$, 곧 $b\'^2-ac$의 부호를 보면 편합니다. $D$와 $\\dfrac{D}{4}$의 부호는 같습니다.\n\n- 예: $x^2-6x+9=0$에서 $\\dfrac{D}{4}=(-3)^2-9=0$이므로 중근을 가집니다.\n- 예: $x^2-3x+4=0$에서 $D=9-16=-7<0$이므로 서로 다른 두 허근을 가집니다.',
      easy: '두 근은 $\\dfrac{-b\\pm\\sqrt{D}}{2a}$입니다. 가운데 값에 $\\sqrt{D}$를 더한 것과 뺀 것이 두 근이라고 생각해 보세요.\n\n- $D$가 양수: 더한 것과 뺀 것이 다른 실수 → 서로 다른 두 실근\n- $D$가 0: 더해도 빼도 같음 → 두 근이 겹친 중근\n- $D$가 음수: $\\sqrt{D}$가 허수 → 서로 다른 두 허근',
      check: {
        type: 'choice', fixed: true,
        q: '이차방정식 $x^2-4x+7=0$의 근을 바르게 판별한 것은 무엇입니까?',
        choices: ['서로 다른 두 실근', '중근', '서로 다른 두 허근'],
        answer: 2,
        why: [
          '$D$의 부호를 다시 계산해 보세요. $\\dfrac{D}{4}=(-2)^2-7=-3$으로 음수입니다.',
          '$D=0$일 때가 중근입니다. 이 방정식은 $\\dfrac{D}{4}=4-7=-3$입니다.',
          '',
        ],
        explain: '$\\dfrac{D}{4}=(-2)^2-1\\times7=-3<0$이므로 서로 다른 두 허근을 가집니다.',
      },
    },
    {
      title: '근과 계수의 관계',
      body: '이차방정식 $ax^2+bx+c=0$의 두 근을 $\\alpha$, $\\beta$라 하면\n\n$\\alpha+\\beta=-\\dfrac{b}{a},\\quad \\alpha\\beta=\\dfrac{c}{a}$\n\n입니다. 이를 **근과 계수의 관계**라고 합니다.\n\n**이유**: 두 근 $\\dfrac{-b+\\sqrt{D}}{2a}$, $\\dfrac{-b-\\sqrt{D}}{2a}$를 더하면 근호 부분이 지워져 $\\dfrac{-2b}{2a}=-\\dfrac{b}{a}$이고, 곱하면 $\\dfrac{b^2-D}{4a^2}=\\dfrac{4ac}{4a^2}=\\dfrac{c}{a}$입니다. 이 계산은 $D<0$이어도 똑같이 성립하므로 **허근일 때도 근과 계수의 관계가 성립**합니다.\n\n- 예: $2x^2-6x+3=0$의 두 근의 합은 $-\\dfrac{-6}{2}=3$, 곱은 $\\dfrac{3}{2}$입니다.\n\n> ⚠️ 합에는 마이너스 부호가 붙고, 곱에는 붙지 않습니다. 또 이차항의 계수 $a$로 나누는 것을 잊지 마십시오.',
      easy: '$(x-\\alpha)(x-\\beta)$를 전개하면 $x^2-(\\alpha+\\beta)x+\\alpha\\beta$입니다.\n\n그러니 $x^2-5x+6=0$처럼 이차항의 계수가 1이면, $x$의 계수 $-5$의 부호를 바꾼 5가 두 근의 합, 상수항 6이 두 근의 곱입니다. 실제로 두 근 2와 3의 합은 5, 곱은 6입니다.',
      check: {
        type: 'short', check: 'number',
        q: '이차방정식 $x^2-5x+3=0$의 두 근을 $\\alpha$, $\\beta$라 할 때, $\\alpha+\\beta$의 값을 구하시오.',
        answer: '5',
        wrong: [
          { a: '-5', why: '합은 $-\\dfrac{b}{a}$입니다. $x$의 계수 $-5$의 부호를 바꾸어야 합니다.' },
          { a: '3', why: '3은 두 근의 곱입니다. 합은 $-\\dfrac{b}{a}$로 구합니다.' },
        ],
        explain: '$\\alpha+\\beta=-\\dfrac{-5}{1}=5$입니다.',
      },
    },
    {
      title: '근과 계수의 관계의 활용',
      body: '$\\alpha^2+\\beta^2$처럼 $\\alpha$와 $\\beta$를 바꾸어도 그대로인 식은 $\\alpha+\\beta$와 $\\alpha\\beta$로 나타낼 수 있습니다. 그러면 근을 직접 구하지 않고도 값을 알 수 있습니다.\n\n- $\\alpha^2+\\beta^2=(\\alpha+\\beta)^2-2\\alpha\\beta$\n- $(\\alpha-\\beta)^2=(\\alpha+\\beta)^2-4\\alpha\\beta$\n- $\\dfrac{1}{\\alpha}+\\dfrac{1}{\\beta}=\\dfrac{\\alpha+\\beta}{\\alpha\\beta}$\n- $\\alpha^3+\\beta^3=(\\alpha+\\beta)^3-3\\alpha\\beta(\\alpha+\\beta)$\n\n예: $x^2-3x+1=0$의 두 근을 $\\alpha$, $\\beta$라 하면 $\\alpha+\\beta=3$, $\\alpha\\beta=1$이므로\n$\\alpha^2+\\beta^2=3^2-2\\times1=7$, $\\dfrac{1}{\\alpha}+\\dfrac{1}{\\beta}=\\dfrac{3}{1}=3$입니다.\n\n> 💡 두 근이 $\\dfrac{3\\pm\\sqrt{5}}{2}$처럼 복잡해도, 합과 곱은 정수로 간단합니다. 그래서 근을 구하는 것보다 빠르고 정확합니다.',
      easy: '$(\\alpha+\\beta)^2=\\alpha^2+2\\alpha\\beta+\\beta^2$입니다. 여기서 원하는 것은 $\\alpha^2+\\beta^2$이니, 덤으로 붙은 $2\\alpha\\beta$를 빼 주면 됩니다.\n\n다른 식도 마찬가지로 "합의 거듭제곱을 만들고, 남는 부분을 곱으로 정리한다"고 생각하면 됩니다.',
      check: {
        type: 'short', check: 'number',
        q: '$\\alpha+\\beta=4$, $\\alpha\\beta=2$일 때, $\\alpha^2+\\beta^2$의 값을 구하시오.',
        answer: '12',
        wrong: [
          { a: '16', why: '$(\\alpha+\\beta)^2$만 구했습니다. $2\\alpha\\beta$를 빼야 합니다.' },
          { a: '14', why: '$\\alpha\\beta$를 한 번만 뺐습니다. $(\\alpha+\\beta)^2-2\\alpha\\beta$입니다.' },
        ],
        explain: '$\\alpha^2+\\beta^2=(\\alpha+\\beta)^2-2\\alpha\\beta=16-4=12$입니다.',
      },
    },
    {
      title: '두 수를 근으로 하는 이차방정식',
      body: '두 수 $\\alpha$, $\\beta$를 근으로 하고 이차항의 계수가 1인 이차방정식은 $(x-\\alpha)(x-\\beta)=0$, 곧\n\n$x^2-(\\alpha+\\beta)x+\\alpha\\beta=0$\n\n입니다. **두 근의 합과 곱만 알면** 이차방정식을 만들 수 있습니다. 이차항의 계수가 $a$이면 $a\\{x^2-(\\alpha+\\beta)x+\\alpha\\beta\\}=0$입니다.\n\n- 예: $2+\\sqrt{3}$, $2-\\sqrt{3}$은 합이 4, 곱이 $4-3=1$이므로 $x^2-4x+1=0$\n- 예: $1+2i$, $1-2i$는 합이 2, 곱이 $1-(2i)^2=1+4=5$이므로 $x^2-2x+5=0$',
      easy: '"근이 $\\alpha$이다"는 "$x=\\alpha$를 넣으면 0이 된다"는 뜻입니다. $(x-\\alpha)(x-\\beta)$는 $x=\\alpha$이든 $x=\\beta$이든 한쪽 괄호가 0이 되니 두 수를 근으로 갖는 식입니다. 이것을 전개한 것이 $x^2-(\\text{합})x+(\\text{곱})$입니다.',
      check: {
        type: 'choice',
        q: '두 수 3, $-2$를 근으로 하고 이차항의 계수가 1인 이차방정식은 무엇입니까?',
        choices: ['$x^2-x-6=0$', '$x^2+x-6=0$', '$x^2-x+6=0$'],
        answer: 0,
        why: [
          '',
          '$x$의 계수는 두 근의 합 1의 부호를 바꾼 $-1$입니다.',
          '상수항은 두 근의 곱 $3\\times(-2)=-6$입니다.',
        ],
        explain: '두 근의 합은 $3+(-2)=1$, 곱은 $3\\times(-2)=-6$이므로 $x^2-x-6=0$입니다.',
      },
    },
    {
      title: '복소수 범위에서의 인수분해',
      body: '이차방정식 $ax^2+bx+c=0$의 두 근이 $\\alpha$, $\\beta$이면, 근과 계수의 관계에서\n\n$ax^2+bx+c=a\\left(x^2+\\dfrac{b}{a}x+\\dfrac{c}{a}\\right)=a\\{x^2-(\\alpha+\\beta)x+\\alpha\\beta\\}=a(x-\\alpha)(x-\\beta)$\n\n입니다. 근이 허수여도 되므로, **복소수 범위에서는 모든 이차식을 일차식의 곱으로 인수분해**할 수 있습니다.\n\n- 예: $x^2+9=0$의 근은 $\\pm3i$이므로 $x^2+9=(x+3i)(x-3i)$\n- 예: $x^2-2x+3=0$의 근은 $1\\pm\\sqrt{2}i$이므로 $x^2-2x+3=(x-1-\\sqrt{2}i)(x-1+\\sqrt{2}i)$\n\n> ⚠️ 이차항의 계수가 1이 아니면 앞에 $a$를 꼭 곱합니다. $2x^2+8=2(x+2i)(x-2i)$',
      easy: '순서는 늘 같습니다. ① 이차식을 0으로 놓고 근을 구한다 ② "$x-$근" 꼴의 괄호 두 개를 곱한다 ③ 이차항의 계수를 앞에 붙인다.\n\n$x^2+9$ 자체는 실수 범위에서는 더 이상 인수분해되지 않지만, 근 $3i$, $-3i$를 쓰면 $(x-3i)(x+3i)$가 됩니다.',
      check: {
        type: 'ox',
        q: '복소수 범위에서 인수분해하면 $x^2+4=(x+2)(x-2)$입니다.',
        answer: false,
        explain: '$(x+2)(x-2)=x^2-4$입니다. $x^2+4=0$의 근은 $\\pm2i$이므로 $x^2+4=(x+2i)(x-2i)$입니다.',
      },
    },
  ],

  examples: [
    {
      q: '이차방정식 $x^2+2(k-1)x+k^2+3=0$이 실근을 갖도록 하는 실수 $k$의 값의 범위를 구하시오.',
      steps: [
        '실근을 가질 조건은 $D\\ge0$입니다. $x$의 계수가 $2(k-1)$로 짝수 꼴이므로 $\\dfrac{D}{4}$를 씁니다.',
        '$\\dfrac{D}{4}=(k-1)^2-(k^2+3)=k^2-2k+1-k^2-3=-2k-2$',
        '$-2k-2\\ge0$에서 $-2k\\ge2$, 양변을 $-2$로 나누면 부등호 방향이 바뀌어 $k\\le-1$입니다.',
      ],
      answer: '$k\\le-1$',
    },
    {
      q: '이차방정식 $x^2-4x+2=0$의 두 근을 $\\alpha$, $\\beta$라 할 때, $\\alpha^2+\\beta^2$과 $\\dfrac{1}{\\alpha}+\\dfrac{1}{\\beta}$의 값을 구하시오.',
      steps: [
        '근과 계수의 관계에서 $\\alpha+\\beta=4$, $\\alpha\\beta=2$입니다.',
        '$\\alpha^2+\\beta^2=(\\alpha+\\beta)^2-2\\alpha\\beta=16-4=12$',
        '$\\dfrac{1}{\\alpha}+\\dfrac{1}{\\beta}=\\dfrac{\\alpha+\\beta}{\\alpha\\beta}=\\dfrac{4}{2}=2$',
      ],
      answer: '$\\alpha^2+\\beta^2=12$, $\\dfrac{1}{\\alpha}+\\dfrac{1}{\\beta}=2$',
    },
    {
      q: '이차식 $x^2-4x+13$을 복소수 범위에서 인수분해하시오.',
      steps: [
        '$x^2-4x+13=0$의 근을 구합니다. $\\dfrac{D}{4}=4-13=-9$이므로 $x=2\\pm\\sqrt{-9}=2\\pm3i$입니다.',
        '이차항의 계수가 1이므로 $x^2-4x+13=\\{x-(2+3i)\\}\\{x-(2-3i)\\}$입니다.',
      ],
      answer: '$(x-2-3i)(x-2+3i)$',
    },
  ],

  terms: [
    { term: '실근', def: '방정식의 근 가운데 실수인 근입니다. 예: $x^2-4=0$의 근 $\\pm2$' },
    { term: '허근', def: '방정식의 근 가운데 허수인 근입니다. 예: $x^2+1=0$의 근 $\\pm i$' },
    { term: '중근', def: '이차방정식의 두 근이 서로 같을 때 그 근입니다. 판별식이 0일 때 생깁니다. 예: $x^2-2x+1=0$의 근 $x=1$' },
    { term: '판별식', def: '이차방정식 $ax^2+bx+c=0$에서 $D=b^2-4ac$입니다. 부호로 두 실근·중근·두 허근을 판별합니다.' },
    { term: '근과 계수의 관계', def: '$ax^2+bx+c=0$의 두 근 $\\alpha$, $\\beta$에 대하여 $\\alpha+\\beta=-\\dfrac{b}{a}$, $\\alpha\\beta=\\dfrac{c}{a}$가 성립한다는 것입니다.' },
    { term: '켤레근', def: '계수가 실수인 이차방정식의 두 허근처럼 서로 켤레복소수인 두 근입니다. 예: $1+2i$와 $1-2i$' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 1,
      q: '다음 이차방정식 가운데 **허근을 갖는** 것은 무엇입니까?',
      choices: ['$x^2-2x-1=0$', '$x^2+4x+4=0$', '$x^2-x+1=0$', '$2x^2+3x-1=0$'],
      answer: 2,
      why: [
        '$\\dfrac{D}{4}=1+1=2>0$이므로 서로 다른 두 실근입니다.',
        '$\\dfrac{D}{4}=4-4=0$이므로 중근입니다.',
        '',
        '$D=9+8=17>0$이므로 서로 다른 두 실근입니다. 상수항이 음수이면 $-4ac>0$이 됩니다.',
      ],
      explain: '$x^2-x+1=0$은 $D=1-4=-3<0$이므로 서로 다른 두 허근을 가집니다. 나머지는 $D\\ge0$입니다.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', concept: 1,
      q: '이차방정식 $x^2-6x+k=0$이 중근을 가질 때, 실수 $k$의 값을 구하시오.',
      answer: '9',
      wrong: [
        { a: '3', why: '3은 이때의 중근입니다. 묻는 것은 $k$의 값입니다.' },
        { a: '-9', why: '$\\dfrac{D}{4}=(-3)^2-k=9-k=0$에서 $k=9$입니다. 부호를 다시 확인해 보세요.' },
      ],
      explain: '중근을 가지려면 $\\dfrac{D}{4}=(-3)^2-k=0$이어야 하므로 $k=9$입니다. 이때 $x^2-6x+9=(x-3)^2=0$이 되어 중근 $x=3$을 가집니다.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'number', concept: 2,
      q: '이차방정식 $2x^2+6x-5=0$의 두 근의 곱을 구하시오.',
      answer: '-5/2',
      wrong: [
        { a: '-5', why: '이차항의 계수 2로 나누지 않았습니다. 곱은 $\\dfrac{c}{a}$입니다.' },
        { a: '5/2', why: '곱에는 마이너스 부호를 붙이지 않습니다. $\\dfrac{c}{a}=\\dfrac{-5}{2}$입니다.' },
        { a: '-3', why: '-3은 두 근의 합입니다.' },
      ],
      explain: '두 근의 곱은 $\\dfrac{c}{a}=\\dfrac{-5}{2}=-\\dfrac{5}{2}$입니다. (합은 $-\\dfrac{6}{2}=-3$입니다.)',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: '이차방정식 $x^2+3x+5=0$은 허근을 가지므로, 근과 계수의 관계로 두 근의 합을 구할 수 없습니다.',
      answer: false,
      explain: '근과 계수의 관계는 허근일 때도 성립합니다. 두 근의 합은 $-3$, 곱은 5입니다.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', concept: 3,
      q: '이차방정식 $x^2+2x-4=0$의 두 근을 $\\alpha$, $\\beta$라 할 때, $\\alpha^2+\\beta^2$의 값을 구하시오.',
      answer: '12',
      wrong: [
        { a: '-4', why: '$\\alpha\\beta=-4$이므로 $-2\\alpha\\beta=+8$입니다. 음수를 빼면 더하는 것이 됩니다.' },
        { a: '4', why: '$(\\alpha+\\beta)^2$만 구했습니다. $2\\alpha\\beta$를 빼야 합니다.' },
      ],
      explain: '$\\alpha+\\beta=-2$, $\\alpha\\beta=-4$이므로 $\\alpha^2+\\beta^2=(-2)^2-2\\times(-4)=4+8=12$입니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 4,
      q: '두 수 $1+\\sqrt{2}$, $1-\\sqrt{2}$를 근으로 하고 이차항의 계수가 1인 이차방정식은 무엇입니까?',
      choices: ['$x^2-2x-1=0$', '$x^2+2x-1=0$', '$x^2-2x+1=0$', '$x^2-2x+3=0$'],
      answer: 0,
      why: [
        '',
        '$x$의 계수는 두 근의 합 2의 부호를 바꾼 $-2$입니다.',
        '곱은 $1^2-(\\sqrt{2})^2=1-2=-1$입니다.',
        '곱을 $1+2$로 계산했습니다. 합차 공식에서는 빼야 합니다: $1-2=-1$',
      ],
      explain: '합은 $(1+\\sqrt{2})+(1-\\sqrt{2})=2$, 곱은 $1-2=-1$이므로 $x^2-2x-1=0$입니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 5,
      q: '$x^2+16$을 복소수 범위에서 인수분해한 것은 무엇입니까?',
      choices: ['$(x+4i)(x-4i)$', '$(x+4)(x-4)$', '$(x+4i)^2$', '$(x+16i)(x-16i)$'],
      answer: 0,
      why: [
        '',
        '$(x+4)(x-4)=x^2-16$입니다.',
        '$(x+4i)^2=x^2+8ix-16$입니다.',
        '$x^2+16=0$의 근은 $\\pm\\sqrt{-16}=\\pm4i$입니다. 16에 제곱근을 씌워야 합니다.',
      ],
      explain: '$x^2+16=0$의 근은 $x=\\pm4i$이므로 $x^2+16=(x+4i)(x-4i)$입니다. 전개하면 $x^2-16i^2=x^2+16$으로 확인됩니다.',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 0,
      q: '이차방정식 $x^2=-9$의 근은 $x=\\pm3i$입니다.',
      answer: true,
      explain: '$x=\\pm\\sqrt{-9}=\\pm3i$입니다. 확인: $(3i)^2=9i^2=-9$',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'set', concept: 1,
      q: '이차방정식 $x^2+2kx+3k+4=0$이 중근을 가질 때, 실수 $k$의 값을 모두 구하시오.',
      answer: ['4', '-1'],
      hint: '$\\dfrac{D}{4}=0$으로 놓으면 $k$에 대한 이차방정식이 됩니다.',
      wrong: [{ a: ['-4', '1'], why: '$k^2-3k-4=(k-4)(k+1)=0$에서 $k=4$ 또는 $k=-1$입니다. 인수분해한 뒤 부호를 다시 확인해 보세요.' }],
      explain: '$\\dfrac{D}{4}=k^2-(3k+4)=k^2-3k-4=(k-4)(k+1)=0$이므로 $k=4$ 또는 $k=-1$입니다.\n\n확인: $k=4$이면 $x^2+8x+16=(x+4)^2$, $k=-1$이면 $x^2-2x+1=(x-1)^2$입니다.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', concept: 3,
      q: '이차방정식 $x^2-3x+1=0$의 두 근을 $\\alpha$, $\\beta$라 할 때, $\\alpha^3+\\beta^3$의 값을 구하시오.',
      answer: '18',
      hint: '$\\alpha^3+\\beta^3=(\\alpha+\\beta)^3-3\\alpha\\beta(\\alpha+\\beta)$',
      wrong: [
        { a: '24', why: '$3\\alpha\\beta(\\alpha+\\beta)$에서 $(\\alpha+\\beta)$를 빠뜨렸습니다. $3\\times1\\times3=9$를 빼야 합니다.' },
        { a: '27', why: '$(\\alpha+\\beta)^3$만 구했습니다. $3\\alpha\\beta(\\alpha+\\beta)$를 빼야 합니다.' },
      ],
      explain: '$\\alpha+\\beta=3$, $\\alpha\\beta=1$이므로 $\\alpha^3+\\beta^3=3^3-3\\times1\\times3=27-9=18$입니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '이차방정식 $x^2-4x+5=0$의 두 근을 $\\alpha$, $\\beta$라 할 때, $\\alpha+1$, $\\beta+1$을 두 근으로 하고 이차항의 계수가 1인 이차방정식은 무엇입니까?',
      choices: ['$x^2-6x+10=0$', '$x^2-6x+6=0$', '$x^2+6x+10=0$', '$x^2-5x+10=0$'],
      answer: 0,
      why: [
        '',
        '곱을 $\\alpha\\beta+1$로 계산했습니다. $(\\alpha+1)(\\beta+1)=\\alpha\\beta+(\\alpha+\\beta)+1$입니다.',
        '$x$의 계수는 두 근의 합 6의 부호를 바꾼 $-6$입니다.',
        '합을 $\\alpha+\\beta+1$로 계산했습니다. 1이 두 번 더해지므로 $\\alpha+\\beta+2$입니다.',
      ],
      hint: '새 두 근의 합과 곱을 $\\alpha+\\beta$, $\\alpha\\beta$로 나타내 보세요.',
      explain: '$\\alpha+\\beta=4$, $\\alpha\\beta=5$입니다.\n\n합: $(\\alpha+1)+(\\beta+1)=4+2=6$\n곱: $(\\alpha+1)(\\beta+1)=\\alpha\\beta+(\\alpha+\\beta)+1=5+4+1=10$\n\n따라서 $x^2-6x+10=0$입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 5,
      q: '이차식 $x^2-6x+10$을 복소수 범위에서 인수분해한 것은 무엇입니까?',
      choices: ['$(x-3-i)(x-3+i)$', '$(x+3-i)(x+3+i)$', '$(x-3-2i)(x-3+2i)$', '$(x-1-3i)(x-1+3i)$'],
      answer: 0,
      why: [
        '',
        '근의 부호를 바꾸어 썼습니다. 근이 $3\\pm i$이면 인수는 $x-(3\\pm i)$입니다.',
        '$\\dfrac{D}{4}=9-10=-1$이므로 근은 $3\\pm\\sqrt{-1}=3\\pm i$입니다.',
        '전개하면 $x^2-2x+10$입니다. 두 근의 합이 6이어야 합니다.',
      ],
      hint: '먼저 $x^2-6x+10=0$의 근을 구해 보세요.',
      explain: '$x^2-6x+10=0$에서 $\\dfrac{D}{4}=9-10=-1$이므로 $x=3\\pm i$입니다. 따라서 $x^2-6x+10=(x-3-i)(x-3+i)$입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 2,
      q: '실수 $a$, $b$에 대하여 이차방정식 $x^2+ax+b=0$의 한 근이 $2-i$일 때, $a+b$의 값을 구하시오.',
      answer: '1',
      hint: '계수가 실수이므로 다른 한 근은 $2-i$의 켤레복소수입니다.',
      wrong: [
        { a: '9', why: '$a=-(\\text{두 근의 합})$입니다. 합이 4이므로 $a=-4$입니다.' },
        { a: '-1', why: '두 근의 곱은 $(2-i)(2+i)=4-i^2=5$입니다. $i^2=-1$을 다시 확인해 보세요.' },
      ],
      explain: '계수가 실수이므로 다른 한 근은 $2+i$입니다.\n\n두 근의 합 $(2-i)+(2+i)=4=-a$에서 $a=-4$, 곱 $(2-i)(2+i)=4+1=5=b$입니다. 따라서 $a+b=1$입니다.\n\n(다른 방법: $x=2-i$를 대입하면 $(3+2a+b)-(4+a)i=0$이므로 $a=-4$, $b=5$)',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', concept: 3,
      q: '이차방정식 $x^2-6x+k=0$의 두 근의 차가 2일 때, 실수 $k$의 값을 구하시오.',
      answer: '8',
      hint: '$(\\alpha-\\beta)^2=(\\alpha+\\beta)^2-4\\alpha\\beta$를 이용합니다.',
      wrong: [{ a: '17/2', why: '두 근의 차가 2이면 $(\\alpha-\\beta)^2=4$입니다. 2를 제곱하지 않았습니다.' }],
      explain: '두 근을 $\\alpha$, $\\beta$라 하면 $\\alpha+\\beta=6$, $\\alpha\\beta=k$입니다. $(\\alpha-\\beta)^2=36-4k=2^2=4$이므로 $k=8$입니다.\n\n확인: $x^2-6x+8=(x-2)(x-4)=0$의 두 근 2와 4의 차는 2입니다.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', concept: 4,
      q: '이차방정식 $x^2-2x+3=0$의 두 근을 $\\alpha$, $\\beta$라 할 때, $\\dfrac{1}{\\alpha}$, $\\dfrac{1}{\\beta}$을 두 근으로 하는 이차방정식이 $3x^2+px+q=0$입니다. 실수 $p$, $q$에 대하여 $p+q$의 값을 구하시오.',
      answer: '-1',
      hint: '새 두 근의 합 $\\dfrac{\\alpha+\\beta}{\\alpha\\beta}$와 곱 $\\dfrac{1}{\\alpha\\beta}$을 구한 뒤, 이차항의 계수 3을 곱합니다.',
      wrong: [
        { a: '3', why: '$x$의 계수는 합의 부호를 바꾼 것입니다. $p=-3\\times\\dfrac{2}{3}=-2$입니다.' },
        { a: '-1/3', why: '이차항의 계수가 1인 방정식의 계수를 더했습니다. 전체에 3을 곱해야 합니다.' },
      ],
      explain: '$\\alpha+\\beta=2$, $\\alpha\\beta=3$입니다.\n\n새 두 근의 합: $\\dfrac{1}{\\alpha}+\\dfrac{1}{\\beta}=\\dfrac{2}{3}$, 곱: $\\dfrac{1}{\\alpha\\beta}=\\dfrac{1}{3}$\n\n이차항의 계수가 3이므로 $3\\left(x^2-\\dfrac{2}{3}x+\\dfrac{1}{3}\\right)=3x^2-2x+1=0$입니다. $p=-2$, $q=1$이므로 $p+q=-1$입니다.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', concept: 1,
      q: '이차방정식 $x^2-2kx+k^2+k-2=0$이 서로 다른 두 허근을 갖도록 하는 정수 $k$ 가운데 가장 작은 값을 구하시오.',
      answer: '3',
      hint: '허근을 가질 조건은 $D<0$입니다. 등호가 들어가는지 살펴보세요.',
      wrong: [{ a: '2', why: '$k=2$이면 $\\dfrac{D}{4}=0$이 되어 중근을 가집니다. $D<0$에는 등호가 없습니다.' }],
      explain: '$\\dfrac{D}{4}=k^2-(k^2+k-2)=-k+2<0$이므로 $k>2$입니다. 이를 만족하는 가장 작은 정수는 3입니다.',
    },
  ],

  deeper: [
    {
      title: '켤레근과 무리수 근',
      body: '계수가 **실수**인 이차방정식이 허근 $p+qi$를 가지면 다른 근은 반드시 켤레복소수 $p-qi$입니다. 근의 공식에서 두 근이 $\\dfrac{-b}{2a}\\pm\\dfrac{\\sqrt{-D}}{2a}i$ 꼴이기 때문입니다.\n\n같은 이유로 계수가 **유리수**인 이차방정식이 무리수 근 $p+q\\sqrt{m}$ ($p$, $q$는 유리수, $\\sqrt{m}$은 무리수)을 가지면 다른 근은 $p-q\\sqrt{m}$입니다.\n\n> ⚠️ 계수에 허수가 있으면 이 성질은 성립하지 않습니다. 예를 들어 $x^2-ix=0$의 근은 $0$과 $i$입니다.',
    },
    {
      title: '다음 단원과의 연결',
      body: '이차방정식 $ax^2+bx+c=0$의 실근은 이차함수 $y=ax^2+bx+c$의 그래프가 $x$축과 만나는 점의 $x$좌표입니다. 다음 단원에서는 판별식의 부호가 그래프와 $x$축이 두 점에서 만나는지, 접하는지, 만나지 않는지를 알려 준다는 것을 배웁니다.',
    },
  ],

  faq: [
    {
      q: '판별식은 언제 D/4를 써요?',
      a: '$x$의 계수가 $2b\'$처럼 짝수 꼴일 때 씁니다. $D=4b\'^2-4ac=4(b\'^2-ac)$이므로 $\\dfrac{D}{4}=b\'^2-ac$만 계산하면 되어 수가 작아집니다. $D$와 부호가 같으니 근의 판별 결과도 같습니다.',
    },
    {
      q: '허근이어도 근과 계수의 관계가 성립해요?',
      a: '네. 근의 공식으로 두 근을 더하고 곱하는 계산에서 $D$의 부호를 쓰지 않으므로, 허근일 때도 $\\alpha+\\beta=-\\dfrac{b}{a}$, $\\alpha\\beta=\\dfrac{c}{a}$가 그대로 성립합니다. 예: $x^2+1=0$의 두 근 $i$, $-i$의 합은 0, 곱은 1입니다.',
    },
    {
      q: '근을 직접 구하면 되는데 왜 근과 계수의 관계를 써요?',
      a: '근이 $\\dfrac{3\\pm\\sqrt{5}}{2}$처럼 복잡하면 $\\alpha^2+\\beta^2$ 같은 식을 직접 계산하기가 번거롭고 실수하기 쉽습니다. 합과 곱은 계수에서 바로 나오므로 훨씬 빠르고 정확합니다.',
    },
  ],

  mistakes: [
    '두 근의 합을 $\\dfrac{b}{a}$로 쓰는 부호 실수 — 합은 $-\\dfrac{b}{a}$, 곱은 $\\dfrac{c}{a}$입니다.',
    '이차항의 계수가 1이 아닐 때 $a$로 나누는 것을 잊는 실수 — $2x^2+6x-5=0$의 두 근의 곱은 $-5$가 아니라 $-\\dfrac{5}{2}$입니다.',
    '허근을 가질 조건을 $D\\le0$으로 쓰는 실수 — $D=0$이면 중근(실근)이므로 허근의 조건은 $D<0$입니다.',
  ],

  gens: [
    {
      id: 'disc-type',
      level: 1,
      title: '판별식으로 근의 종류 판별하기',
      make: function (R) {
        var t = R.int(0, 2); // 0: 두 실근, 1: 중근, 2: 두 허근
        var a, b, c, D;
        if (t === 1) {
          if (R.bool()) {
            a = R.int(1, 3);
            var p = R.nonzero(-4, 4);
            b = -2 * a * p; c = a * p * p;
          } else {
            var q = R.pick([-5, -3, -1, 1, 3, 5]);
            a = 4; b = -4 * q; c = q * q;
          }
          D = 0;
        } else {
          for (var k = 0; k < 200; k++) {
            a = R.int(1, 3); b = R.int(-7, 7); c = R.nonzero(-9, 9);
            D = b * b - 4 * a * c;
            if ((t === 0 && D > 0) || (t === 2 && D < 0)) break;
          }
        }
        var names = ['서로 다른 두 실근', '중근', '서로 다른 두 허근'];
        var sign = D > 0 ? 'D>0' : D === 0 ? 'D=0' : 'D<0';
        var why = [
          '$D>0$일 때가 서로 다른 두 실근입니다. 이 방정식은 $' + sign + '$입니다.',
          '$D=0$일 때가 중근입니다. 이 방정식은 $' + sign + '$입니다.',
          '$D<0$일 때가 서로 다른 두 허근입니다. 이 방정식은 $' + sign + '$입니다.',
        ];
        why[t] = '';
        return {
          type: 'choice', fixed: true, concept: 1,
          q: '이차방정식 $' + R.fmt.poly([a, b, c]) + '=0$의 근을 바르게 판별한 것은 무엇입니까?',
          choices: names,
          answer: t,
          why: why,
          explain: '$D=' + R.fmt.paren(b) + '^2-4\\times' + a + '\\times' + R.fmt.paren(c) + '=' + D + '$이고 $' + sign + '$이므로 ' + names[t] + '을 가집니다.',
        };
      },
    },
    {
      id: 'make-eq',
      level: 1,
      title: '두 수를 근으로 하는 이차방정식 만들기',
      make: function (R) {
        var r1, r2, s, p;
        for (var k = 0; k < 200; k++) {
          r1 = R.nonzero(-6, 6); r2 = R.nonzero(-6, 6);
          s = r1 + r2; p = r1 * r2;
          if (r1 !== r2 && s !== 0) break;
        }
        var eq = function (c1, c0) { return '$' + R.fmt.poly([1, c1, c0]) + '=0$'; };
        var correct = eq(-s, p);
        var cands = [
          [eq(s, p), '$x$의 계수는 두 근의 합의 부호를 바꾼 것입니다. $-(\\alpha+\\beta)$를 확인해 보세요.'],
          [eq(-s, -p), '상수항은 두 근의 곱 그대로입니다. 곱의 부호를 다시 확인해 보세요.'],
          [eq(s, -p), '합과 곱의 부호를 모두 잘못 썼습니다. $x^2-(\\alpha+\\beta)x+\\alpha\\beta=0$입니다.'],
          [eq(-p, s), '합과 곱의 자리를 바꾸었습니다. $x$의 계수에는 합, 상수항에는 곱이 들어갑니다.'],
        ];
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: 4,
          q: '두 수 $' + r1 + '$, $' + r2 + '$' + R.josa(r2, '을/를') + ' 근으로 하고 이차항의 계수가 1인 이차방정식은 무엇입니까?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '두 근의 합은 $' + r1 + '+' + R.fmt.paren(r2) + '=' + s + '$, 곱은 $' + r1 + '\\times' + R.fmt.paren(r2) + '=' + p + '$입니다. $x^2-(\\text{합})x+(\\text{곱})=0$에 넣으면 ' + correct + '입니다.',
        };
      },
    },
    {
      id: 'vieta-sym',
      level: 2,
      title: '근과 계수의 관계로 식의 값 구하기',
      make: function (R) {
        var b = R.nonzero(-6, 6);
        var c = R.nonzero(-6, 6);
        var s = -b, p = c;
        var kind = R.int(0, 3);
        var expr, ans, formula, wrongs;
        if (kind === 0) {
          expr = '\\alpha^2+\\beta^2';
          ans = R.F(s * s - 2 * p);
          formula = '(\\alpha+\\beta)^2-2\\alpha\\beta=' + R.fmt.paren(s) + '^2-2\\times' + R.fmt.paren(p);
          wrongs = [
            [R.F(s * s), '$(\\alpha+\\beta)^2$만 구했습니다. $2\\alpha\\beta$를 빼야 합니다.'],
            [R.F(s * s + 2 * p), '$2\\alpha\\beta$를 더했습니다. $(\\alpha+\\beta)^2=\\alpha^2+2\\alpha\\beta+\\beta^2$이므로 빼야 합니다.'],
          ];
        } else if (kind === 1) {
          expr = '(\\alpha-\\beta)^2';
          ans = R.F(s * s - 4 * p);
          formula = '(\\alpha+\\beta)^2-4\\alpha\\beta=' + R.fmt.paren(s) + '^2-4\\times' + R.fmt.paren(p);
          wrongs = [
            [R.F(s * s - 2 * p), '$\\alpha^2+\\beta^2$을 구했습니다. $(\\alpha-\\beta)^2=\\alpha^2+\\beta^2-2\\alpha\\beta$이므로 $(\\alpha+\\beta)^2$에서 $4\\alpha\\beta$를 빼야 합니다.'],
            [R.F(s * s), '$(\\alpha+\\beta)^2$만 구했습니다. $4\\alpha\\beta$를 빼야 합니다.'],
          ];
        } else if (kind === 2) {
          expr = '\\dfrac{1}{\\alpha}+\\dfrac{1}{\\beta}';
          ans = R.F(s, p);
          formula = '\\dfrac{\\alpha+\\beta}{\\alpha\\beta}=\\dfrac{' + s + '}{' + p + '}';
          wrongs = [
            [R.F(-s, p), '두 근의 합은 $x$의 계수의 부호를 바꾼 것입니다. 합의 부호를 확인해 보세요.'],
            [R.F(p, s), '분모와 분자를 바꾸었습니다. $\\dfrac{1}{\\alpha}+\\dfrac{1}{\\beta}=\\dfrac{\\alpha+\\beta}{\\alpha\\beta}$입니다.'],
          ];
        } else {
          expr = '\\alpha^3+\\beta^3';
          ans = R.F(s * s * s - 3 * p * s);
          formula = '(\\alpha+\\beta)^3-3\\alpha\\beta(\\alpha+\\beta)=' + R.fmt.paren(s) + '^3-3\\times' + R.fmt.paren(p) + '\\times' + R.fmt.paren(s);
          wrongs = [
            [R.F(s * s * s - 3 * p), '$3\\alpha\\beta(\\alpha+\\beta)$에서 $(\\alpha+\\beta)$를 빠뜨렸습니다.'],
            [R.F(s * s * s), '$(\\alpha+\\beta)^3$만 구했습니다. $3\\alpha\\beta(\\alpha+\\beta)$를 빼야 합니다.'],
          ];
        }
        var wrong = [];
        wrongs.forEach(function (w) {
          if (!w[0].eq(ans) && !wrong.some(function (x) { return x.a === w[0].toString(); })) wrong.push({ a: w[0].toString(), why: w[1] });
        });
        return {
          type: 'short', check: 'number', concept: 3,
          q: '이차방정식 $' + R.fmt.poly([1, b, c]) + '=0$의 두 근을 $\\alpha$, $\\beta$라 할 때, $' + expr + '$의 값을 구하시오.',
          answer: ans.toString(),
          hint: '먼저 $\\alpha+\\beta$와 $\\alpha\\beta$를 구합니다.',
          wrong: wrong,
          explain: '근과 계수의 관계에서 $\\alpha+\\beta=' + s + '$, $\\alpha\\beta=' + p + '$입니다.\n\n$' + expr + '=' + formula + '=' + R.fmt.frac(ans) + '$',
        };
      },
    },
    {
      id: 'complex-root',
      level: 3,
      title: '한 허근이 주어진 이차방정식의 계수 구하기',
      make: function (R) {
        var p = R.int(-4, 4);
        var q = R.int(1, 4) * R.sign();
        function cplx(re, im) {
          var ims = (Math.abs(im) === 1 ? '' : String(Math.abs(im))) + 'i';
          if (re === 0) return (im < 0 ? '-' : '') + ims;
          return re + (im < 0 ? '-' : '+') + ims;
        }
        var a = -2 * p, b = p * p + q * q;
        var ask = R.int(0, 2);
        var target = ['a', 'b', 'a+b'][ask];
        var val = [a, b, a + b][ask];
        var aw = 2 * p, bw = p * p - q * q; // 합의 부호 실수, i^2=1 로 계산한 실수
        var cands = [
          [[aw, b, aw + b][ask], '$a$는 두 근의 합의 부호를 바꾼 값입니다. $a=-(\\text{두 근의 합})$을 확인해 보세요.'],
          [[a, bw, a + bw][ask], '켤레복소수의 곱은 $(p+qi)(p-qi)=p^2+q^2$입니다. $i^2=-1$을 확인해 보세요.'],
        ];
        var wrong = [];
        cands.forEach(function (w) {
          if (w[0] !== val && !wrong.some(function (x) { return x.a === String(w[0]); })) wrong.push({ a: String(w[0]), why: w[1] });
        });
        var r1 = cplx(p, q), r2 = cplx(p, -q);
        return {
          type: 'short', check: 'number', concept: 2,
          q: '실수 $a$, $b$에 대하여 이차방정식 $x^2+ax+b=0$의 한 근이 $' + r1 + '$일 때, $' + target + '$의 값을 구하시오.',
          answer: String(val),
          hint: '계수가 실수이므로 다른 한 근은 켤레복소수입니다.',
          wrong: wrong,
          explain: '계수가 실수이므로 다른 한 근은 $' + r2 + '$입니다.\n\n두 근의 합: $' + (2 * p) + '=-a$이므로 $a=' + a + '$\n두 근의 곱: $(' + r1 + ')(' + r2 + ')=' + (p * p) + '+' + (q * q) + '=' + b + '$이므로 $b=' + b + '$\n\n따라서 $' + target + '=' + val + '$입니다.',
        };
      },
    },
  ],
});
