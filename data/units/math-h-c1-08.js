/* 공통수학1 · 연립일차부등식 */
Tutor.registerUnit({
  id: 'math-h-c1-08',
  course: 'math-h-c1',
  title: '연립일차부등식',
  summary: '연립일차부등식의 해를 수직선으로 구하고, 절댓값 기호가 들어 있는 일차부등식을 범위를 나누어 풉니다.',
  goals: [
    'ax>b 꼴의 부등식을 a의 부호에 따라 풀 수 있다.',
    '연립일차부등식의 해를 수직선 위에서 공통부분으로 구할 수 있다.',
    'A<B<C 꼴의 부등식과 해가 없거나 하나뿐인 연립부등식을 이해하고 풀 수 있다.',
    '절댓값 기호를 포함한 일차부등식을 풀 수 있다.',
  ],
  standards: ['[10공수1-02-09]', '[10공수1-02-10]'],

  concepts: [
    {
      title: 'ax>b 꼴 부등식의 해',
      body: '일차부등식은 정리하면 $ax>b$ (또는 $ax<b$, $ax\\ge b$, $ax\\le b$) 꼴이 됩니다. 이때 $x$의 계수 $a$의 부호에 따라 해가 달라집니다.\n\n| $a$의 부호 | $ax>b$의 해 |\n|---|---|\n| $a>0$ | $x>\\dfrac{b}{a}$ |\n| $a<0$ | $x<\\dfrac{b}{a}$ (부등호 방향이 바뀜) |\n| $a=0$ | $0\\times x>b$ → $b<0$이면 **모든 실수**, $b\\ge0$이면 **해가 없다** |\n\n$a<0$일 때 양변을 음수로 나누면 대소 관계가 뒤집히므로 부등호 방향을 바꿉니다. 예: $-2x>6$이면 $x<-3$\n\n$a=0$일 때는 $x$에 무엇을 넣어도 좌변이 0입니다. 그래서 "0이 $b$보다 큰가?"만 따지면 됩니다. 예: $0\\times x>-1$은 항상 참이므로 해는 모든 실수, $0\\times x>2$는 항상 거짓이므로 해가 없습니다.\n\n> ⚠️ $x$의 계수에 문자가 있으면($(k-1)x>3$ 등) 계수가 양수·음수·0인 경우로 나누어 생각합니다.',
      easy: '음수를 곱하거나 나누면 순서가 뒤집힙니다. $2<3$에 $-1$을 곱하면 $-2$와 $-3$이 되는데, 이번에는 $-2>-3$이지요.\n\n계수가 0이면 $x$가 사라져 "$0>2$"처럼 $x$와 상관없는 문장이 남습니다. 그 문장이 참이면 모든 $x$가 해이고, 거짓이면 해가 하나도 없습니다.',
      check: {
        type: 'choice',
        q: '부등식 $0\\times x>2$의 해는 무엇입니까?',
        choices: ['해가 없다', '모든 실수', '$x>2$'],
        answer: 0,
        why: [
          '',
          '$0\\times x$는 항상 0이고 $0>2$는 거짓입니다. 모든 실수가 해가 되려면 부등식이 항상 참이어야 합니다.',
          '$x$의 계수가 0이므로 양변을 0으로 나눌 수 없습니다. 좌변은 항상 0입니다.',
        ],
        explain: '어떤 $x$를 넣어도 좌변은 0이고 $0>2$는 거짓이므로 해가 없습니다.',
      },
    },
    {
      title: '연립일차부등식과 수직선',
      body: '두 개 이상의 부등식을 함께 묶은 것을 **연립부등식**이라 하고, 각 부등식이 일차부등식이면 **연립일차부등식**이라고 합니다. 연립부등식의 해는 **각 부등식의 해의 공통부분**입니다.\n\n푸는 순서\n1. 각 부등식을 따로 푼다.\n2. 해를 한 수직선 위에 나타낸다.\n3. 겹치는 부분(공통부분)을 읽는다.\n\n예: $\\begin{cases} 2x-1>3 \\\\ x+4\\le9 \\end{cases}$에서 $x>2$, $x\\le5$이므로 해는 $2<x\\le5$입니다.\n\n수직선에서 $<$, $>$의 끝점은 빈 동그라미(포함하지 않음), $\\le$, $\\ge$의 끝점은 채운 동그라미(포함함)로 나타냅니다.',
      easy: '두 친구의 조건을 동시에 만족하는 날을 고른다고 생각해 보세요. 한 친구는 "2일 뒤부터", 다른 친구는 "5일까지"만 된다면 함께 만날 수 있는 날은 2일 뒤부터 5일까지입니다.\n\n수직선에 두 해를 층으로 그려서 두 선이 **모두** 지나가는 구간을 찾으면 됩니다.',
      fig: { type: 'numberline', min: -1, max: 7, step: 1, ranges: [{ from: 2, to: Infinity, fromOpen: true }, { from: -Infinity, to: 5 }], alt: 'x>2와 x≤5를 수직선 위에 층으로 나타낸 그림. 겹치는 부분은 2<x≤5' },
      check: {
        type: 'choice',
        q: '연립부등식 $\\begin{cases} x>1 \\\\ x\\le4 \\end{cases}$의 해는 무엇입니까?',
        choices: ['$1<x\\le4$', '$1\\le x<4$', '$x>1$'],
        answer: 0,
        why: [
          '',
          '끝점의 포함 여부가 바뀌었습니다. $x>1$은 1을 포함하지 않고, $x\\le4$는 4를 포함합니다.',
          '한 부등식의 해만 썼습니다. 두 해의 공통부분을 구해야 합니다.',
        ],
        explain: '$x>1$과 $x\\le4$의 공통부분은 $1<x\\le4$입니다.',
      },
    },
    {
      title: 'A<B<C 꼴의 부등식',
      body: '$A<B<C$는 "$A<B$이고 $B<C$"라는 뜻입니다. 그래서 다음 연립부등식으로 바꾸어 풉니다.\n\n$\\begin{cases} A<B \\\\ B<C \\end{cases}$\n\n예: $x+2<3x<x+8$\n- $x+2<3x$에서 $2x>2$, $x>1$\n- $3x<x+8$에서 $2x<8$, $x<4$\n- 해: $1<x<4$\n\n가운데에만 $x$가 있으면 세 변에 같은 수를 더하거나 빼고, 같은 양수로 나누어 한 번에 풀 수 있습니다.\n예: $-1<2x+3\\le7$ → 세 변에서 3을 빼면 $-4<2x\\le4$ → 세 변을 2로 나누면 $-2<x\\le2$\n\n> ⚠️ $\\begin{cases} A<B \\\\ A<C \\end{cases}$로 나누면 안 됩니다. $A<C$에는 $B$에 대한 조건이 없습니다.',
      easy: '$A<B<C$는 $B$가 $A$와 $C$ 사이에 끼어 있다는 뜻입니다. 그러니 "$B$는 $A$보다 크다"와 "$B$는 $C$보다 작다" 두 조건으로 나누어 생각하면 됩니다. 두 조건 모두 가운데 $B$가 주인공입니다.',
      check: {
        type: 'ox',
        q: '부등식 $x-1<2x+1<x+5$는 연립부등식 $\\begin{cases} x-1<2x+1 \\\\ 2x+1<x+5 \\end{cases}$로 바꾸어 풀 수 있습니다.',
        answer: true,
        explain: '$A<B<C$는 $A<B$이고 $B<C$이므로 맞습니다. 풀면 $x>-2$, $x<4$이므로 해는 $-2<x<4$입니다.',
      },
    },
    {
      title: '해가 없거나 하나뿐인 연립부등식',
      body: '두 부등식의 해가 수직선에서 겹치지 않으면 연립부등식의 **해가 없습니다.** 끝점에서만 겹치면 **해가 하나뿐**입니다.\n\n| 연립부등식 | 해 |\n|---|---|\n| $x\\ge3$, $x\\le3$ | $x=3$ (해가 하나뿐) |\n| $x>3$, $x\\le3$ | 해가 없다 |\n| $x>5$, $x<2$ | 해가 없다 |\n\n끝점이 같을 때는 두 부등호에 **모두 등호가 있어야** 그 점이 해가 됩니다. 하나라도 등호가 없으면 그 점은 빠지므로 해가 없습니다.',
      easy: '"3 이상"과 "3 이하"를 동시에 만족하는 수는 3 하나뿐입니다. 그런데 "3 초과"와 "3 이하"라면 3은 첫째 조건에서 빠지고, 3보다 큰 수는 둘째 조건에서 빠지니 남는 수가 없습니다.\n\n그림처럼 두 해가 끝점 하나에서만 만나면 그 점이 유일한 해입니다.',
      fig: { type: 'numberline', min: 0, max: 6, step: 1, ranges: [{ from: 3, to: Infinity }, { from: -Infinity, to: 3 }], alt: 'x≥3과 x≤3이 3에서만 겹치는 수직선' },
      check: {
        type: 'choice',
        q: '연립부등식 $\\begin{cases} x\\ge2 \\\\ x<2 \\end{cases}$의 해는 무엇입니까?',
        choices: ['해가 없다', '$x=2$', '모든 실수'],
        answer: 0,
        why: [
          '',
          '$x<2$에는 등호가 없으므로 2는 둘째 부등식의 해가 아닙니다.',
          '두 해가 겹치는 부분이 없습니다. 모든 실수는 두 해를 합친 것입니다.',
        ],
        explain: '$x\\ge2$와 $x<2$는 겹치는 부분이 없으므로 해가 없습니다. 2는 $x<2$를 만족시키지 않습니다.',
      },
    },
    {
      title: '절댓값 기호를 포함한 일차부등식',
      body: '$|x|$는 수직선에서 원점과 $x$ 사이의 거리이므로, $a>0$일 때\n\n- $|x|<a$ ⇔ $-a<x<a$ (원점에서 거리가 $a$보다 작은 곳)\n- $|x|>a$ ⇔ $x<-a$ 또는 $x>a$ (원점에서 거리가 $a$보다 큰 곳)\n\n같은 방법으로 $|x-p|$는 $x$와 $p$ 사이의 거리입니다.\n\n- $|x-p|<a$ ⇔ $-a<x-p<a$ ⇔ $p-a<x<p+a$\n- $|x-p|>a$ ⇔ $x-p<-a$ 또는 $x-p>a$\n\n예: $|x-3|<2$ → $-2<x-3<2$ → $1<x<5$\n예: $|2x-1|\\ge5$ → $2x-1\\le-5$ 또는 $2x-1\\ge5$ → $x\\le-2$ 또는 $x\\ge3$',
      easy: '$|x-3|<2$는 "$x$가 3에서 2보다 가까이 있다"는 뜻입니다. 3에서 왼쪽으로 2 가면 1, 오른쪽으로 2 가면 5이니 그 사이 $1<x<5$가 해입니다.\n\n"멀리 있다"($>$)이면 반대로 그 바깥쪽 두 부분이 해가 됩니다.',
      fig: { type: 'numberline', min: -1, max: 7, step: 1, ranges: [{ from: 1, to: 5, fromOpen: true, toOpen: true }], points: [{ x: 3, label: '3' }], alt: '3을 중심으로 거리가 2보다 작은 범위 1<x<5를 나타낸 수직선' },
      check: {
        type: 'choice',
        q: '부등식 $|x-3|<2$의 해는 무엇입니까?',
        choices: ['$1<x<5$', '$-5<x<-1$', '$x<1$ 또는 $x>5$'],
        answer: 0,
        why: [
          '',
          '$|x-3|$은 $x$와 3 사이의 거리입니다. $-3$이 아니라 3이 중심입니다.',
          '이것은 $|x-3|>2$의 해입니다. 거리가 2보다 **작은** 곳을 찾아야 합니다.',
        ],
        explain: '$-2<x-3<2$이므로 각 변에 3을 더하면 $1<x<5$입니다.',
      },
    },
    {
      title: '범위를 나누어 푸는 절댓값 부등식',
      body: '절댓값 기호 밖에도 $x$가 있거나 절댓값이 두 개이면, 절댓값 기호 안의 식이 0이 되는 $x$의 값을 기준으로 **범위를 나누어** 기호를 없앱니다.\n\n$|A|=\\begin{cases} A & (A\\ge0) \\\\ -A & (A<0) \\end{cases}$\n\n예: $|x+1|+|x-2|<5$ — 기준은 $x=-1$, $x=2$\n1. $x<-1$: $-(x+1)-(x-2)<5$, $-2x+1<5$, $x>-2$ → $-2<x<-1$\n2. $-1\\le x<2$: $(x+1)-(x-2)<5$, $3<5$ (항상 참) → $-1\\le x<2$\n3. $x\\ge2$: $(x+1)+(x-2)<5$, $2x-1<5$, $x<3$ → $2\\le x<3$\n\n세 범위의 해를 **합치면** $-2<x<3$입니다.\n\n> ⚠️ 각 범위에서 구한 해는 그 범위와의 공통부분만 인정합니다. 마지막에는 각 범위의 해를 모두 합칩니다.',
      easy: '절댓값은 "안이 양수면 그대로, 음수면 부호를 바꿔서" 꺼내는 기호입니다. 그런데 안이 양수인지 음수인지는 $x$에 따라 달라지니, $x$가 사는 동네를 나누어 동네마다 따로 풉니다.\n\n동네마다 답을 구한 뒤, 그 동네 안에 있는 답만 남기고 마지막에 모두 모읍니다.',
      check: {
        type: 'ox',
        q: '$|x+1|+|x-2|$에서 절댓값 기호를 없애려면 $x=-1$, $x=2$를 기준으로 범위를 나눕니다.',
        answer: true,
        explain: '$x+1=0$, $x-2=0$이 되는 $x=-1$, $x=2$에서 절댓값 안의 부호가 바뀌므로 이 두 값을 기준으로 $x<-1$, $-1\\le x<2$, $x\\ge2$로 나눕니다.',
      },
    },
  ],

  examples: [
    {
      q: '연립부등식 $\\begin{cases} 3x-1\\ge2x+1 \\\\ 2(x-1)<x+3 \\end{cases}$을 푸시오.',
      steps: [
        '첫째 부등식: $3x-2x\\ge1+1$, 곧 $x\\ge2$',
        '둘째 부등식: $2x-2<x+3$, 곧 $x<5$',
        '수직선에서 공통부분을 찾으면 $2\\le x<5$입니다.',
      ],
      answer: '$2\\le x<5$',
    },
    {
      q: '$a<2$일 때, $x$에 대한 부등식 $ax+2>2x+a$를 푸시오.',
      steps: [
        '$x$가 있는 항을 왼쪽으로 모으면 $(a-2)x>a-2$입니다.',
        '$a<2$이므로 $a-2<0$입니다. 음수로 나누면 부등호 방향이 바뀝니다.',
        '양변을 $a-2$로 나누면 $x<1$입니다.',
      ],
      answer: '$x<1$',
    },
    {
      q: '부등식 $|2x-1|\\le5$를 푸시오.',
      steps: [
        '$|A|\\le5$이면 $-5\\le A\\le5$이므로 $-5\\le2x-1\\le5$입니다.',
        '세 변에 1을 더하면 $-4\\le2x\\le6$입니다.',
        '세 변을 2로 나누면 $-2\\le x\\le3$입니다.',
      ],
      answer: '$-2\\le x\\le3$',
    },
  ],

  terms: [
    { term: '연립부등식', def: '두 개 이상의 부등식을 함께 묶어 놓은 것입니다. 해는 각 부등식의 해의 공통부분입니다.' },
    { term: '연립일차부등식', def: '연립부등식을 이루는 부등식이 모두 일차부등식인 것입니다.' },
    { term: '연립부등식의 해', def: '연립부등식의 모든 부등식을 동시에 만족시키는 $x$의 값 또는 범위입니다. 공통부분이 없으면 "해가 없다"고 합니다.' },
    { term: '절댓값', def: '수직선에서 원점과 어떤 수 사이의 거리입니다. $|x-p|$는 $x$와 $p$ 사이의 거리입니다.' },
    { term: '공통부분', def: '수직선에 나타낸 여러 해가 모두 겹치는 부분입니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '부등식 $-3x>6$의 해는 무엇입니까?',
      choices: ['$x<-2$', '$x>-2$', '$x<2$', '$x>2$'],
      answer: 0,
      why: [
        '',
        '음수 $-3$으로 나누었으니 부등호 방향을 바꾸어야 합니다.',
        '$6\\div(-3)=-2$입니다. 부호를 다시 확인해 보세요.',
        '부등호 방향과 부호를 모두 다시 확인해 보세요. $6\\div(-3)=-2$입니다.',
      ],
      explain: '양변을 음수 $-3$으로 나누면 부등호 방향이 바뀌므로 $x<-2$입니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '부등식 $3x+2>3x-1$의 해는 무엇입니까?',
      choices: ['모든 실수', '해가 없다', '$x>0$', '$x>-3$'],
      answer: 0,
      why: [
        '',
        '정리하면 $0\\times x>-3$이고, $0>-3$은 참입니다. 항상 참이면 모든 실수가 해입니다.',
        '$x$가 지워지므로 $x$에 대한 조건이 남지 않습니다.',
        '$x$의 계수가 0이 되어 $x$가 지워집니다. 남는 것은 $0>-3$입니다.',
      ],
      explain: '정리하면 $0\\times x>-3$입니다. 어떤 $x$를 넣어도 $0>-3$은 참이므로 해는 모든 실수입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '연립부등식 $\\begin{cases} x+3>5 \\\\ 2x-1\\le7 \\end{cases}$의 해는 무엇입니까?',
      choices: ['$2<x\\le4$', '$2\\le x<4$', '$x>2$', '$x\\le4$'],
      answer: 0,
      why: [
        '',
        '끝점의 포함 여부가 바뀌었습니다. $x>2$는 2를 빼고, $x\\le4$는 4를 넣습니다.',
        '첫째 부등식의 해만 썼습니다. 두 해의 공통부분을 구해야 합니다.',
        '둘째 부등식의 해만 썼습니다. 두 해의 공통부분을 구해야 합니다.',
      ],
      explain: '$x+3>5$에서 $x>2$, $2x-1\\le7$에서 $2x\\le8$, $x\\le4$입니다. 공통부분은 $2<x\\le4$입니다.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '연립부등식 $\\begin{cases} 2x+1\\ge5 \\\\ 3x-4<11 \\end{cases}$을 만족시키는 정수 $x$는 모두 몇 개입니까?',
      answer: '3',
      wrong: [
        { a: '4', why: '$3x<15$에서 $x<5$이므로 5는 해가 아닙니다. 등호가 없는 끝점은 빼야 합니다.' },
        { a: '2', why: '$x\\ge2$이므로 2도 해에 들어갑니다.' },
      ],
      explain: '$2x+1\\ge5$에서 $x\\ge2$, $3x-4<11$에서 $x<5$이므로 해는 $2\\le x<5$입니다. 정수는 2, 3, 4로 3개입니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '부등식 $-1<2x+1\\le7$의 해는 무엇입니까?',
      choices: ['$-1<x\\le3$', '$-1\\le x<3$', '$0<x\\le4$', '$-2<x\\le6$'],
      answer: 0,
      why: [
        '',
        '부등호를 옮겨 쓸 때 등호의 위치가 바뀌었습니다. 세 변에 같은 계산을 하면 부등호는 그대로입니다.',
        '1을 빼기 전에 2로 나누었거나 1을 더했습니다. 먼저 세 변에서 1을 뺍니다.',
        '세 변에서 1을 뺀 뒤 2로 나누는 것을 빠뜨렸습니다.',
      ],
      explain: '세 변에서 1을 빼면 $-2<2x\\le6$, 세 변을 2로 나누면 $-1<x\\le3$입니다.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 3,
      q: '연립부등식 $\\begin{cases} x\\ge4 \\\\ x\\le4 \\end{cases}$의 해는 $x=4$뿐입니다.',
      answer: true,
      explain: '두 부등식에 모두 등호가 있으므로 4는 두 부등식을 모두 만족시키고, 4가 아닌 수는 둘 중 하나를 만족시키지 못합니다. 해는 $x=4$뿐입니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '연립부등식 $\\begin{cases} 2x-1>5 \\\\ x+2<4 \\end{cases}$의 해는 무엇입니까?',
      choices: ['해가 없다', '$2<x<3$', '모든 실수', '$x>3$'],
      answer: 0,
      why: [
        '',
        '$x>3$과 $x<2$를 거꾸로 읽었습니다. 3보다 크면서 2보다 작은 수는 없습니다.',
        '두 해를 합친 것이 아니라 공통부분을 구해야 합니다. $x>3$, $x<2$는 겹치지 않습니다.',
        '첫째 부등식의 해만 썼습니다. 둘째 부등식의 해 $x<2$와 겹치는지 확인해 보세요.',
      ],
      explain: '$2x-1>5$에서 $x>3$, $x+2<4$에서 $x<2$입니다. 두 해는 겹치지 않으므로 해가 없습니다.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 4,
      q: '부등식 $|x+1|\\ge3$의 해는 무엇입니까?',
      choices: ['$x\\le-4$ 또는 $x\\ge2$', '$-4\\le x\\le2$', '$x\\le-2$ 또는 $x\\ge4$', '$x\\ge2$'],
      answer: 0,
      why: [
        '',
        '이것은 $|x+1|\\le3$의 해입니다. 거리가 3 **이상**인 바깥쪽을 찾아야 합니다.',
        '$|x+1|$은 $x$와 $-1$ 사이의 거리입니다. 중심은 1이 아니라 $-1$입니다.',
        '$x+1\\le-3$인 경우를 빠뜨렸습니다.',
      ],
      explain: '$x+1\\le-3$ 또는 $x+1\\ge3$이므로 $x\\le-4$ 또는 $x\\ge2$입니다.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '개', concept: 4,
      q: '부등식 $|2x-3|\\le5$를 만족시키는 정수 $x$는 모두 몇 개입니까?',
      answer: '6',
      hint: '$-5\\le2x-3\\le5$로 바꾸어 보세요.',
      wrong: [
        { a: '5', why: '해는 $-1\\le x\\le4$입니다. 양 끝 $-1$과 4가 모두 들어가므로 $-1,\\ 0,\\ 1,\\ 2,\\ 3,\\ 4$를 세어 보세요.' },
        { a: '11', why: '$-5\\le2x-3\\le5$에서 $2x-3$이 될 수 있는 정수를 센 것 같습니다. $x$의 범위를 먼저 구해야 합니다.' },
      ],
      explain: '$-5\\le2x-3\\le5$에서 $-2\\le2x\\le8$, $-1\\le x\\le4$입니다. 정수는 $-1,\\ 0,\\ 1,\\ 2,\\ 3,\\ 4$로 6개입니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 2,
      q: '부등식 $x+2<3x<x+8$의 해는 무엇입니까?',
      choices: ['$1<x<4$', '$x>1$', '$x<4$', '$-1<x<4$'],
      answer: 0,
      why: [
        '',
        '$x+2<3x$, $x+2<x+8$로 나누었습니다. 둘째 부등식은 $3x<x+8$이어야 합니다.',
        '$3x<x+8$만 풀었습니다. $x+2<3x$도 함께 풀어야 합니다.',
        '$x+2<3x$에서 $2<2x$, $x>1$입니다. 부호를 다시 확인해 보세요.',
      ],
      hint: '$x+2<3x$와 $3x<x+8$로 나누어 보세요.',
      explain: '$x+2<3x$에서 $x>1$, $3x<x+8$에서 $x<4$이므로 해는 $1<x<4$입니다.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', concept: 5,
      q: '부등식 $|x-3|<2x$를 만족시키는 정수 $x$ 가운데 가장 작은 값을 구하시오.',
      answer: '2',
      hint: '$x\\ge3$일 때와 $x<3$일 때로 나누어 풉니다.',
      wrong: [
        { a: '1', why: '$x<3$일 때 $-(x-3)<2x$에서 $x>1$이므로 1은 해가 아닙니다. 등호가 없습니다.' },
        { a: '-2', why: '$x\\ge3$일 때 얻은 $x>-3$은 범위 $x\\ge3$과의 공통부분만 인정합니다.' },
      ],
      explain: '1. $x\\ge3$: $x-3<2x$에서 $x>-3$ → 범위와의 공통부분은 $x\\ge3$\n2. $x<3$: $-(x-3)<2x$에서 $3<3x$, $x>1$ → $1<x<3$\n\n합치면 해는 $x>1$이므로 가장 작은 정수는 2입니다.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', concept: 3,
      q: '연립부등식 $\\begin{cases} 3x-a\\ge x+2 \\\\ 2x+1\\le9 \\end{cases}$의 해가 $x=4$뿐일 때, 상수 $a$의 값을 구하시오.',
      answer: '6',
      hint: '첫째 부등식의 해는 $x\\ge\\dfrac{a+2}{2}$입니다.',
      wrong: [
        { a: '2', why: '첫째 부등식은 $2x\\ge a+2$입니다. 양변을 2로 나누는 것을 빠뜨렸습니다.' },
        { a: '4', why: '4는 해 $x$의 값입니다. $\\dfrac{a+2}{2}=4$에서 $a$를 구해야 합니다.' },
      ],
      explain: '첫째 부등식에서 $2x\\ge a+2$, $x\\ge\\dfrac{a+2}{2}$이고, 둘째 부등식에서 $x\\le4$입니다.\n\n해가 $x=4$뿐이려면 $\\dfrac{a+2}{2}=4$이어야 하므로 $a=6$입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '$x$에 대한 부등식 $ax+1>x+a$의 해가 $x<1$일 때, 실수 $a$의 값의 범위는 무엇입니까?',
      choices: ['$a<1$', '$a>1$', '$a=1$', '$a\\le1$'],
      answer: 0,
      why: [
        '',
        '$a>1$이면 $a-1>0$이므로 해가 $x>1$이 됩니다.',
        '$a=1$이면 $0\\times x>0$이 되어 해가 없습니다.',
        '$a=1$일 때는 해가 없으므로 등호를 넣을 수 없습니다.',
      ],
      hint: '$(a-1)x>a-1$로 정리한 뒤, 부등호 방향이 바뀌는 경우를 생각합니다.',
      explain: '정리하면 $(a-1)x>a-1$입니다. 해가 $x<1$이 되려면 양변을 $a-1$로 나눌 때 부등호 방향이 바뀌어야 하므로 $a-1<0$, 곧 $a<1$입니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: '연립부등식 $\\begin{cases} 2x-1\\ge3 \\\\ x<a \\end{cases}$를 만족시키는 정수 $x$가 3개뿐일 때, 실수 $a$의 값의 범위는 무엇입니까?',
      choices: ['$4<a\\le5$', '$4\\le a<5$', '$4<a<5$', '$4\\le a\\le5$'],
      answer: 0,
      why: [
        '',
        '$a=4$이면 해가 $2\\le x<4$로 정수가 2, 3의 2개뿐입니다. $a=5$이면 $2\\le x<5$로 3개입니다.',
        '$a=5$이면 해가 $2\\le x<5$로 정수가 2, 3, 4의 3개이므로 5도 포함됩니다.',
        '$a=4$이면 정수가 2, 3의 2개뿐이므로 4는 빠집니다.',
      ],
      hint: '첫째 부등식의 해 $x\\ge2$에서 정수 2, 3, 4가 들어가고 5는 빠져야 합니다. 경계에 $a=4$, $a=5$를 넣어 확인해 보세요.',
      explain: '첫째 부등식에서 $x\\ge2$이므로 해는 $2\\le x<a$입니다. 정수가 2, 3, 4의 3개뿐이려면 4는 포함되고 5는 빠져야 하므로 $4<a\\le5$입니다.\n\n확인: $a=5$이면 $2\\le x<5$(정수 3개), $a=4$이면 $2\\le x<4$(정수 2개)',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 5,
      q: '부등식 $|x+1|+|x-2|<5$의 해는 무엇입니까?',
      choices: ['$-2<x<3$', '$-1\\le x<2$', '$x<3$', '$-3<x<2$'],
      answer: 0,
      why: [
        '',
        '가운데 범위의 해만 썼습니다. $x<-1$, $x\\ge2$인 범위의 해도 합쳐야 합니다.',
        '$x<-1$일 때 구한 $x>-2$와 범위의 공통부분을 확인해 보세요.',
        '$x<-1$일 때 $-(x+1)-(x-2)=-2x+1$입니다. 부호를 다시 확인해 보세요.',
      ],
      hint: '$x=-1$, $x=2$를 기준으로 세 범위로 나눕니다.',
      explain: '1. $x<-1$: $-2x+1<5$, $x>-2$ → $-2<x<-1$\n2. $-1\\le x<2$: $3<5$ (항상 참) → $-1\\le x<2$\n3. $x\\ge2$: $2x-1<5$, $x<3$ → $2\\le x<3$\n\n세 범위의 해를 합치면 $-2<x<3$입니다.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', concept: 4,
      q: '부등식 $|x-a|<3$의 해가 $-1<x<b$일 때, 상수 $a$, $b$에 대하여 $a+b$의 값을 구하시오.',
      answer: '7',
      hint: '$|x-a|<3$의 해는 $a-3<x<a+3$입니다.',
      wrong: [
        { a: '3', why: '$|x-a|$의 중심은 $-a$가 아니라 $a$입니다. 해는 $a-3<x<a+3$입니다.' },
        { a: '4', why: '해의 양 끝 $-1$과 $b=5$를 더했습니다. 구하는 것은 $a+b$이고, $a-3=-1$에서 $a=2$입니다.' },
      ],
      explain: '$|x-a|<3$의 해는 $a-3<x<a+3$입니다. $a-3=-1$이므로 $a=2$이고, $b=a+3=5$입니다. 따라서 $a+b=7$입니다.',
    },
  ],

  deeper: [
    {
      title: '절댓값은 거리다',
      body: '$|x-p|$를 "$x$와 $p$ 사이의 거리"로 읽으면 많은 부등식을 계산 없이 풀 수 있습니다.\n\n예를 들어 $|x+1|+|x-2|$는 "$x$에서 $-1$까지의 거리와 2까지의 거리의 합"입니다. $x$가 $-1$과 2 사이에 있으면 이 합은 언제나 두 점 사이의 거리 3이고, 바깥으로 나가면 커집니다. 그래서 $|x+1|+|x-2|<5$의 해는 양쪽으로 1씩 더 나간 $-2<x<3$입니다.',
    },
    {
      title: '다음 단원과의 연결: 이차부등식',
      body: '다음 단원에서는 $x^2-x-6<0$ 같은 이차부등식을 이차함수의 그래프로 풀고, 일차부등식과 이차부등식을 묶은 연립부등식도 다룹니다. 해를 수직선에 나타내고 공통부분을 찾는 방법은 이 단원에서 배운 것과 같습니다.',
    },
  ],

  faq: [
    {
      q: 'A<B<C를 A<B와 A<C로 나누면 왜 안 돼요?',
      a: '$A<B<C$는 "$A<B$이고 $B<C$"라는 뜻이라서, $B$가 양쪽 조건에 모두 들어가야 합니다. $A<C$는 $A<B$와 $B<C$에서 따라 나오는 결과일 뿐 $B<C$를 대신하지 못합니다. 그래서 $A<B$, $A<C$로 풀면 $B<C$라는 조건이 빠져 해가 넓어집니다.',
    },
    {
      q: '음수로 나누면 부등호 방향이 왜 바뀌어요?',
      a: '음수를 곱하면 수직선에서 원점을 기준으로 뒤집히기 때문입니다. $1<3$에 $-1$을 곱하면 $-1$과 $-3$인데, 이제 $-1$이 오른쪽에 있으므로 $-1>-3$입니다. 순서가 뒤집히니 부등호도 바꿉니다.',
    },
    {
      q: '"해가 없다"와 "모든 실수"는 어떻게 구별해요?',
      a: '$x$가 지워져 $0\\times x>b$ 꼴이 되면 남은 문장 $0>b$가 참인지 봅니다. 참이면 어떤 $x$를 넣어도 성립하므로 모든 실수, 거짓이면 어떤 $x$를 넣어도 성립하지 않으므로 해가 없습니다. 연립부등식에서는 두 해가 겹치지 않을 때 해가 없습니다.',
    },
  ],

  mistakes: [
    '음수로 양변을 나누고 부등호 방향을 바꾸지 않는 실수 — $-3x>6$의 해는 $x>-2$가 아니라 $x<-2$입니다.',
    '$A<B<C$를 $A<B$, $A<C$로 나누어 푸는 실수 — $A<B$와 $B<C$로 나눕니다.',
    '절댓값 부등식을 범위를 나누어 풀 때 각 범위와의 공통부분을 확인하지 않는 실수 — 구한 해가 그 범위 안에 있는지 확인한 뒤 합칩니다.',
  ],

  gens: [
    {
      id: 'lin-system',
      level: 1,
      title: '연립일차부등식 풀기',
      make: function (R) {
        var L = R.int(-5, 3);
        var U = L + R.int(2, 6);
        var openL = R.bool(), openU = R.bool();
        // 부등식 하나 만들기: 계수 k 가 음수면 부등호를 반대로 써서 같은 해가 되게
        function ineq(bound, lower, open) {
          var k = R.pick([1, 2, 3, -1, -2, -3]);
          var m = R.int(-6, 6);
          var rhs = k * bound + m;
          var gt = lower ? k > 0 : k < 0; // 좌변 > 우변 꼴인가
          var op = gt ? (open ? '>' : '\\ge ') : (open ? '<' : '\\le ');
          return { tex: R.fmt.poly([k, m]) + op + rhs, k: k, m: m, rhs: rhs };
        }
        var i1 = ineq(L, true, openL), i2 = ineq(U, false, openU);
        var iv = function (oL, oU) { return '$' + L + (oL ? '<' : '\\le ') + 'x' + (oU ? '<' : '\\le ') + U + '$'; };
        var correct = iv(openL, openU);
        var onlyFirst = ['$x' + (openL ? '>' : '\\ge ') + L + '$', '첫째 부등식의 해만 썼습니다. 두 해의 공통부분을 구해야 합니다.'];
        var onlySecond = ['$x' + (openU ? '<' : '\\le ') + U + '$', '둘째 부등식의 해만 썼습니다. 두 해의 공통부분을 구해야 합니다.'];
        var firstPick = R.bool();
        // R.choices 는 앞에서부터 고르므로: 끝점 실수 2개 + 한 부등식만 쓴 실수 1개가 나오게 섞어 둔다
        var cands = [
          [iv(!openL, openU), '$x=' + L + '$' + R.josa(L, '이/가') + ' 해에 들어가는지 다시 확인해 보세요. 등호가 있어야 끝점을 포함합니다.'],
          firstPick ? onlyFirst : onlySecond,
          [iv(openL, !openU), '$x=' + U + '$' + R.josa(U, '이/가') + ' 해에 들어가는지 다시 확인해 보세요. 등호가 있어야 끝점을 포함합니다.'],
          [iv(!openL, !openU), '양 끝점의 포함 여부를 모두 다시 확인해 보세요.'],
          firstPick ? onlySecond : onlyFirst,
        ];
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        var solve = function (i, bound, lower, open) {
          var res = 'x' + (lower ? (open ? '>' : '\\ge ') : (open ? '<' : '\\le ')) + bound;
          var flip = i.k < 0 ? ' (음수 $' + i.k + '$' + R.josa(Math.abs(i.k), '으로/로') + ' 나누어 부등호 방향이 바뀜)' : '';
          return '$' + i.tex + '$에서 $' + res + '$' + flip;
        };
        return {
          type: 'choice', concept: 1,
          q: '연립부등식 $\\begin{cases} ' + i1.tex + ' \\\\ ' + i2.tex + ' \\end{cases}$의 해는 무엇입니까?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: solve(i1, L, true, openL) + '\n' + solve(i2, U, false, openU) + '\n\n공통부분은 ' + correct + '입니다.',
        };
      },
    },
    {
      id: 'abs-basic',
      level: 1,
      title: '|x-p|<a, |x-p|>a 꼴의 부등식',
      make: function (R) {
        var p = R.int(-5, 5);
        var a = R.int(1, 6);
        var kind = R.int(0, 3); // 0: <, 1: ≤, 2: >, 3: ≥
        var strict = kind === 0 || kind === 2;
        var inside = kind <= 1;
        var lt = strict ? '<' : '\\le ', gt = strict ? '>' : '\\ge ';
        var lt2 = strict ? '\\le ' : '<', gt2 = strict ? '\\ge ' : '>'; // 끝점 포함 여부를 바꾼 오답용
        var ops = ['<', '\\le ', '>', '\\ge '];
        var absTex = '|' + (p === 0 ? 'x' : R.fmt.poly([1, -p])) + '|';
        var lo = p - a, hi = p + a;
        var inT = function (l, h) { return '$' + l + lt + 'x' + lt + h + '$'; };
        var outT = function (l, h) { return '$x' + lt + l + '$ 또는 $x' + gt + h + '$'; };
        var correct = inside ? inT(lo, hi) : outT(lo, hi);
        var shiftObj = p >= 0 ? '각 변에 $' + p + '$' + R.josa(p, '을/를') : '각 변에서 $' + (-p) + '$' + R.josa(-p, '을/를');
        var shiftMust = shiftObj + (p >= 0 ? ' 더해야' : ' 빼야');
        var shiftIf = shiftObj + (p >= 0 ? ' 더하면' : ' 빼면');
        var cands = [
          [inside ? outT(lo, hi) : inT(lo, hi), inside ? '이것은 거리가 ' + a + '보다 먼 곳입니다. 부등호 방향을 확인해 보세요.' : '이것은 거리가 ' + a + '보다 가까운 곳입니다. 부등호 방향을 확인해 보세요.'],
          [inside ? inT(-p - a, -p + a) : outT(-p - a, -p + a), '$' + absTex + '$' + R.josa(p === 0 ? 'x' : Math.abs(p), '은/는') + ' $x$와 $' + p + '$ 사이의 거리입니다. 중심의 부호를 확인해 보세요.'],
          [inside ? '$x' + lt + hi + '$' : '$x' + gt + hi + '$', inside ? '$-' + a + lt + (p === 0 ? 'x' : R.fmt.poly([1, -p])) + '$인 조건을 빠뜨렸습니다.' : '$' + (p === 0 ? 'x' : R.fmt.poly([1, -p])) + lt + '-' + a + '$인 경우를 빠뜨렸습니다.'],
          [inside ? inT(-a, a) : outT(-a, a), '중심을 0으로 보았습니다. ' + shiftMust + ' 합니다.'],
          [inside ? '$' + lo + lt2 + 'x' + lt2 + hi + '$' : '$x' + lt2 + lo + '$ 또는 $x' + gt2 + hi + '$', strict ? '부등호에 등호가 없으므로 끝점 $' + lo + '$, $' + hi + '$' + R.josa(hi, '은/는') + ' 해에 들어가지 않습니다.' : '부등호에 등호가 있으므로 끝점 $' + lo + '$, $' + hi + '$도 해에 들어갑니다.'],
        ];
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        var inner = p === 0 ? 'x' : R.fmt.poly([1, -p]);
        var step = inside
          ? '$-' + a + lt + inner + lt + a + '$이므로 ' + (p === 0 ? '' : shiftIf + ' ') + correct + '입니다.'
          : '$' + inner + lt + '-' + a + '$ 또는 $' + inner + gt + a + '$이므로 ' + correct + '입니다.';
        return {
          type: 'choice', concept: 4,
          q: '부등식 $' + absTex + ops[kind] + a + '$의 해는 무엇입니까?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: (p === 0 ? '' : '$' + absTex + '$' + R.josa(Math.abs(p), '은/는') + ' $x$와 $' + p + '$ 사이의 거리입니다. ') + step,
        };
      },
    },
    {
      id: 'abc-int',
      level: 2,
      title: 'A<B<C 꼴 부등식의 정수인 해',
      make: function (R) {
        var k = R.pick([2, 3, -2, -3]);
        var c = R.nonzero(-6, 6);
        var L = R.int(-4, 2);
        var U = L + R.int(2, 6);
        var op1 = R.bool() ? '<' : '\\le ', op2 = R.bool() ? '<' : '\\le ';
        // m (op1) kx+c (op2) n 이 L~U 의 범위가 되게
        var m, n, loOpen, hiOpen;
        if (k > 0) { m = k * L + c; n = k * U + c; loOpen = op1 === '<'; hiOpen = op2 === '<'; }
        else { m = k * U + c; n = k * L + c; loOpen = op2 === '<'; hiOpen = op1 === '<'; }
        var count = (U - L + 1) - (loOpen ? 1 : 0) - (hiOpen ? 1 : 0);
        var mid = R.fmt.poly([k, c]);
        var iv = '$' + L + (loOpen ? '<' : '\\le ') + 'x' + (hiOpen ? '<' : '\\le ') + U + '$';
        var wrong = [];
        var both = U - L + 1, none = U - L - 1;
        if (both !== count) wrong.push({ a: String(both), why: '등호가 없는 끝점까지 세었습니다. 해 ' + iv + '에서 끝점이 포함되는지 확인해 보세요.' });
        if (none !== count) wrong.push({ a: String(none), why: '등호가 있는 끝점을 빠뜨렸습니다. 해 ' + iv + '에서 끝점이 포함되는지 확인해 보세요.' });
        var steps = (c > 0 ? '세 변에서 $' + c + '$' + R.josa(c, '을/를') + ' 빼면 $' : '세 변에 $' + (-c) + '$' + R.josa(-c, '을/를') + ' 더하면 $') + (m - c) + op1 + k + 'x' + op2 + (n - c) + '$\n' +
          '세 변을 $' + k + '$' + R.josa(Math.abs(k), '으로/로') + ' 나누면' + (k < 0 ? ' (음수이므로 부등호 방향이 바뀝니다)' : '') + ' ' + iv;
        return {
          type: 'short', check: 'number', unit: '개', concept: 2,
          q: '부등식 $' + m + op1 + mid + op2 + n + '$' + R.josa(n, '을/를') + ' 만족시키는 정수 $x$는 모두 몇 개입니까?',
          answer: String(count),
          hint: '세 변에 같은 계산을 하여 가운데에 $x$만 남깁니다.',
          wrong: wrong,
          explain: steps + '\n\n이 범위의 정수는 ' + count + '개입니다.',
        };
      },
    },
    {
      id: 'int-count-param',
      level: 3,
      title: '정수인 해의 개수가 주어진 연립부등식',
      make: function (R) {
        var cnt = R.int(2, 4);
        var b = R.int(-3, 3);
        var upper = R.bool(); // true: { x >= b, x < a }, false: { x > a, x <= b }
        var k = R.pick([1, 2, 3]);
        var m = R.int(-5, 5);
        var first, explain1, correct, lo, hi, list = [];
        var rng = function (lc, l, hc, h) { return '$' + l + (lc ? '<' : '\\le ') + 'a' + (hc ? '<' : '\\le ') + h + '$'; };
        if (upper) {
          first = R.fmt.poly([k, m]) + '\\ge ' + (k * b + m);
          explain1 = '$x\\ge ' + b + '$';
          for (var i = 0; i < cnt; i++) list.push(b + i);
          lo = b + cnt - 1; hi = b + cnt; // lo < a <= hi
          correct = rng(true, lo, false, hi);
        } else {
          first = R.fmt.poly([k, m]) + '\\le ' + (k * b + m);
          explain1 = '$x\\le ' + b + '$';
          for (var j = cnt - 1; j >= 0; j--) list.push(b - j);
          lo = b - cnt; hi = b - cnt + 1; // lo <= a < hi
          correct = rng(false, lo, true, hi);
        }
        var others = [rng(true, lo, true, hi), rng(false, lo, false, hi), upper ? rng(false, lo, true, hi) : rng(true, lo, false, hi)];
        var why = '경계 값 $a=' + lo + '$, $a=' + hi + '$' + R.josa(hi, '을/를') + ' 직접 넣어 정수인 해가 몇 개인지 세어 보세요.';
        var pick = R.choices(correct, others);
        var second = upper ? 'x<a' : 'x>a';
        var check1 = upper ? 'a=' + hi + '$이면 $' + b + '\\le x<' + hi + '$' + R.josa(hi, '으로/로') + ' ' + cnt + '개, $a=' + lo + '$이면 ' + (cnt - 1) + '개'
          : 'a=' + lo + '$이면 $' + lo + '<x\\le ' + b + '$' + R.josa(b, '으로/로') + ' ' + cnt + '개, $a=' + hi + '$이면 ' + (cnt - 1) + '개';
        return {
          type: 'choice', concept: 1,
          q: '연립부등식 $\\begin{cases} ' + first + ' \\\\ ' + second + ' \\end{cases}$' + '를 만족시키는 정수 $x$가 ' + cnt + '개뿐일 때, 실수 $a$의 값의 범위는 무엇입니까?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : why; }),
          hint: '첫째 부등식을 풀고, 정수인 해가 어디까지 들어가야 하는지 생각합니다.',
          explain: '첫째 부등식의 해는 ' + explain1 + '입니다. 정수인 해가 ' + cnt + '개뿐이려면 정수 $' + list.join(',\\ ') + '$만 해가 되어야 합니다.\n\n' +
            '확인: $' + check1 + '\n\n따라서 ' + correct + '입니다.',
        };
      },
    },
  ],
});
