/* 5학년 수학 · 분수의 곱셈 */
Tutor.registerUnit({
  id: 'math-e5-08',
  course: 'math-e5',
  title: '분수의 곱셈',
  summary: '(분수)×(자연수), (자연수)×(분수), (분수)×(분수)의 계산 원리를 알고 계산해요.',
  goals: [
    '(분수)×(자연수)와 (자연수)×(분수)를 계산할 수 있어요.',
    '(진분수)×(진분수)와 (대분수)×(대분수)를 계산할 수 있어요.',
    '세 분수의 곱셈을 하고, 곱셈 결과의 크기를 어림할 수 있어요.',
  ],
  standards: ['[6수01-09]'],

  concepts: [
    {
      title: '(분수)×(자연수)',
      body: '분수에 자연수를 곱하는 것은 같은 분수를 여러 번 더하는 것과 같아요.\n\n$\\frac{2}{5}\\times3=\\frac{2}{5}+\\frac{2}{5}+\\frac{2}{5}=\\frac{2\\times3}{5}=\\frac{6}{5}=1\\frac{1}{5}$\n\n그래서 **분모는 그대로 두고, 분자에 자연수를 곱해요.**\n\n약분할 수 있으면 곱하기 전에 분모와 자연수를 약분하면 계산이 쉬워요. $\\frac{5}{6}\\times4$에서 분모 6과 자연수 4를 모두 2로 나누면 $\\frac{5\\times2}{3}=\\frac{10}{3}=3\\frac{1}{3}$이에요.\n\n**대분수**에 자연수를 곱할 때는 대분수를 가분수로 바꾸어 계산해요. $1\\frac{1}{4}\\times3=\\frac{5}{4}\\times3=\\frac{15}{4}=3\\frac{3}{4}$',
      easy: '피자 $\\frac{2}{5}$판짜리 접시가 3개 있다고 생각해 보세요. $\\frac{1}{5}$조각이 접시마다 2개씩, 모두 $2\\times3=6$조각이에요.\n\n조각의 크기($\\frac{1}{5}$)는 변하지 않으니 분모는 그대로, 조각 수만 3배가 돼요. 그래서 $\\frac{6}{5}$판이에요.',
      fig: { type: 'fraction', shape: 'bar', n: 6, d: 5, alt: '5칸짜리 막대 2개에서 6칸을 색칠한 그림' },
      check: {
        type: 'choice',
        q: '$\\frac{3}{8}\\times5$의 값은 무엇일까요?',
        choices: ['$1\\frac{7}{8}$', '$\\frac{15}{40}$', '$\\frac{3}{40}$'],
        answer: 0,
        why: [
          '',
          '분모에도 5를 곱했어요. 분모는 조각의 크기라서 그대로 두고 분자에만 곱해요.',
          '분모에만 5를 곱했어요. 분모는 그대로 두고 분자에 곱해요.',
        ],
        explain: '분모는 그대로 두고 분자에 5를 곱해요. $\\frac{3\\times5}{8}=\\frac{15}{8}=1\\frac{7}{8}$',
      },
    },
    {
      title: '(자연수)×(분수)',
      body: '$6\\times\\frac{2}{3}$는 "6의 $\\frac{2}{3}$"라는 뜻이에요. 6을 똑같이 3묶음으로 나누면 한 묶음은 2이고, 그중 2묶음은 4예요.\n\n계산할 때는 **자연수와 분자를 곱하고, 분모는 그대로** 둬요.\n\n$6\\times\\frac{2}{3}=\\frac{6\\times2}{3}=\\frac{12}{3}=4$\n\n> 💡 1보다 작은 분수를 곱하면 결과는 처음 수보다 **작아져요.** $6\\times\\frac{2}{3}=4$는 6보다 작아요. 1보다 큰 수를 곱하면 커져요.\n\n대분수를 곱할 때는 가분수로 바꾸어요. $2\\times1\\frac{1}{3}=2\\times\\frac{4}{3}=\\frac{8}{3}=2\\frac{2}{3}$',
      easy: '사탕 6개의 $\\frac{2}{3}$를 먹는다고 해 봐요. 사탕 6개를 똑같이 세 무더기로 나누면 한 무더기에 2개씩이에요.\n\n그중 두 무더기를 먹으면 4개를 먹은 거예요. 그래서 $6\\times\\frac{2}{3}=4$예요. 전부가 아니라 일부만 먹었으니 6보다 작지요.',
      check: {
        type: 'ox',
        q: '$10\\times\\frac{3}{5}$의 값은 10보다 커요.',
        answer: false,
        explain: '$\\frac{3}{5}$은 1보다 작아서 곱하면 10보다 작아져요. $10\\times\\frac{3}{5}=\\frac{30}{5}=6$이에요.',
      },
    },
    {
      title: '(진분수)×(진분수)',
      body: '진분수끼리 곱할 때는 **분자는 분자끼리, 분모는 분모끼리** 곱해요.\n\n$\\frac{2}{3}\\times\\frac{4}{5}=\\frac{2\\times4}{3\\times5}=\\frac{8}{15}$\n\n**단위분수**(분자가 1인 분수)끼리 곱하면 분모끼리만 곱하면 돼요. $\\frac{1}{2}\\times\\frac{1}{3}=\\frac{1}{6}$\n\n그림처럼 전체의 $\\frac{1}{2}$(위 한 줄)을 다시 3으로 나눈 것 중 하나는 전체를 6칸으로 나눈 것 중 1칸이에요.\n\n약분할 수 있으면 곱하기 전에 약분해요. $\\frac{2}{3}\\times\\frac{3}{4}$에서 3과 3, 2와 4를 약분하면 $\\frac{1\\times1}{1\\times2}=\\frac{1}{2}$이에요.\n\n> 💡 분수의 곱셈은 덧셈과 달리 **통분하지 않아요.**',
      easy: '초콜릿 한 판의 반($\\frac{1}{2}$)이 남았는데, 그 반을 다시 세 사람이 똑같이 나눠 먹어요. 한 사람이 먹은 양은 "반의 $\\frac{1}{3}$"이에요.\n\n초콜릿 한 판 전체로 보면 6조각 중 1조각과 같아요. 그래서 $\\frac{1}{2}\\times\\frac{1}{3}=\\frac{1}{6}$이에요.',
      fig: { type: 'svg', svg: '<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="180" height="55" fill="var(--fig-2)" fill-opacity="0.35"/><rect x="10" y="10" width="60" height="55" fill="var(--fig-1)" fill-opacity="0.65"/><rect x="10" y="10" width="180" height="110" fill="none" stroke="currentColor" stroke-width="2"/><line x1="10" y1="65" x2="190" y2="65" stroke="currentColor" stroke-width="1.5"/><line x1="70" y1="10" x2="70" y2="120" stroke="currentColor" stroke-width="1.5"/><line x1="130" y1="10" x2="130" y2="120" stroke="currentColor" stroke-width="1.5"/></svg>', alt: '직사각형을 위아래 2줄, 좌우 3칸으로 나누어 모두 6칸으로 만든 그림. 위 한 줄(전체의 2분의 1)이 연하게 색칠되어 있고, 그중 왼쪽 1칸이 진하게 색칠되어 있다.' },
      check: {
        type: 'short', check: 'number',
        q: '계산해 보세요.\n\n$\\frac{1}{4}\\times\\frac{1}{5}$',
        answer: '1/20',
        wrong: [
          { a: '2/9', why: '분자끼리, 분모끼리 더했어요. 곱셈은 분자끼리, 분모끼리 곱해요.' },
          { a: '1/9', why: '분모끼리 더했어요. 분모끼리도 곱해요: $4\\times5=20$' },
        ],
        explain: '단위분수끼리의 곱이에요. 분자는 $1\\times1=1$, 분모는 $4\\times5=20$이므로 $\\frac{1}{20}$이에요.',
      },
    },
    {
      title: '(대분수)×(대분수)',
      body: '대분수끼리 곱할 때는 **대분수를 가분수로 바꾼 뒤** 분자끼리, 분모끼리 곱해요.\n\n$1\\frac{1}{2}\\times2\\frac{1}{3}=\\frac{3}{2}\\times\\frac{7}{3}=\\frac{21}{6}=\\frac{7}{2}=3\\frac{1}{2}$\n\n> ⚠️ 자연수끼리, 분수끼리 따로 곱하면 안 돼요. $1\\times2=2$, $\\frac{1}{2}\\times\\frac{1}{3}=\\frac{1}{6}$로 $2\\frac{1}{6}$이라고 하면 틀려요.\n\n대분수 $1\\frac{1}{2}$은 $1+\\frac{1}{2}$이에요. $2\\frac{1}{3}$의 각 부분에 1도 곱하고 $\\frac{1}{2}$도 곱해야 하는데, 따로 곱하면 그중 일부를 빠뜨리게 돼요.',
      easy: '가로 $1\\frac{1}{2}$ m, 세로 $2\\frac{1}{3}$ m인 꽃밭의 넓이를 생각해 보세요. 가로를 1 m와 $\\frac{1}{2}$ m로, 세로를 2 m와 $\\frac{1}{3}$ m로 나누면 꽃밭이 네 조각으로 나뉘어요.\n\n자연수끼리, 분수끼리만 곱하면 네 조각 중 두 조각만 센 거예요. 가분수로 바꾸어 곱하면 네 조각을 한 번에 모두 셀 수 있어요.',
      check: {
        type: 'choice',
        q: '$1\\frac{1}{3}\\times1\\frac{1}{2}$의 값은 무엇일까요?',
        choices: ['2', '$1\\frac{1}{6}$', '$2\\frac{1}{6}$'],
        answer: 0,
        why: [
          '',
          '자연수끼리($1\\times1$), 분수끼리($\\frac{1}{3}\\times\\frac{1}{2}$) 따로 곱했어요. 가분수로 바꾸어 곱해요.',
          '자연수끼리 더하고 분수끼리 곱했어요. 가분수로 바꾸어 곱해요.',
        ],
        explain: '가분수로 바꾸면 $\\frac{4}{3}\\times\\frac{3}{2}=\\frac{12}{6}=2$예요.',
      },
    },
    {
      title: '세 분수의 곱셈',
      body: '세 분수를 곱할 때는 앞에서부터 두 개씩 차례로 곱해도 되고, **분자는 분자끼리, 분모는 분모끼리 한꺼번에** 곱해도 돼요.\n\n$\\frac{1}{2}\\times\\frac{2}{3}\\times\\frac{3}{4}=\\frac{1\\times2\\times3}{2\\times3\\times4}=\\frac{6}{24}=\\frac{1}{4}$\n\n한꺼번에 곱할 때는 곱하기 전에 약분하면 수가 작아져서 편해요. 위 식에서 분자의 2·3과 분모의 2·3을 약분하면 바로 $\\frac{1}{4}$이에요.\n\n자연수나 대분수가 섞여 있으면 자연수는 $3=\\frac{3}{1}$처럼, 대분수는 가분수로 바꾸어 곱해요.',
      easy: '세 수의 곱셈은 순서를 바꾸어 곱해도 결과가 같아요. 그래서 분자들은 위에 모두 모아 곱하고, 분모들은 아래에 모두 모아 곱하면 돼요.\n\n위와 아래에 같은 수가 있으면 서로 지워(약분해) 버리면 계산이 아주 간단해져요.',
      check: {
        type: 'ox',
        q: '$\\frac{1}{2}\\times\\frac{1}{3}\\times\\frac{1}{5}=\\frac{1}{30}$이에요.',
        answer: true,
        explain: '분자는 $1\\times1\\times1=1$, 분모는 $2\\times3\\times5=30$이므로 $\\frac{1}{30}$이 맞아요.',
      },
    },
  ],

  examples: [
    {
      q: '계산해 보세요.\n\n$\\frac{5}{6}\\times9$',
      steps: [
        '분모는 그대로 두고 분자에 9를 곱해요. $\\frac{5\\times9}{6}$',
        '분모 6과 자연수 9를 최대공약수 3으로 약분하면 $\\frac{5\\times3}{2}=\\frac{15}{2}$예요.',
        '대분수로 나타내면 $7\\frac{1}{2}$이에요.',
      ],
      answer: '$7\\frac{1}{2}$',
    },
    {
      q: '계산해 보세요.\n\n$2\\frac{1}{4}\\times1\\frac{1}{3}$',
      steps: [
        '대분수를 가분수로 바꿔요. $2\\frac{1}{4}=\\frac{9}{4}$, $1\\frac{1}{3}=\\frac{4}{3}$',
        '$\\frac{9}{4}\\times\\frac{4}{3}$에서 9와 3을 3으로, 4와 4를 4로 약분하면 $\\frac{3\\times1}{1\\times1}$이에요.',
        '그래서 답은 3이에요.',
      ],
      answer: '3',
    },
    {
      q: '길이가 4 m인 리본의 $\\frac{3}{8}$을 잘라 썼어요. 잘라 쓴 리본은 몇 m일까요?',
      steps: [
        '4 m의 $\\frac{3}{8}$은 $4\\times\\frac{3}{8}$이에요.',
        '$\\frac{4\\times3}{8}=\\frac{12}{8}$이고, 4로 약분하면 $\\frac{3}{2}$이에요.',
        '$\\frac{3}{2}=1\\frac{1}{2}$이므로 $1\\frac{1}{2}$ m예요.',
      ],
      answer: '$1\\frac{1}{2}$ m',
    },
  ],

  terms: [
    { term: '단위분수', def: '분자가 1인 분수예요. 예: $\\frac{1}{2}$, $\\frac{1}{3}$, $\\frac{1}{10}$' },
    { term: '진분수', def: '분자가 분모보다 작은 분수예요. 1보다 작아요. 예: $\\frac{3}{4}$' },
    { term: '가분수', def: '분자가 분모와 같거나 분모보다 큰 분수예요. 예: $\\frac{7}{4}$' },
    { term: '대분수', def: '자연수와 진분수로 이루어진 분수예요. 예: $1\\frac{3}{4}$은 $\\frac{7}{4}$과 같아요.' },
    { term: '약분', def: '분모와 분자를 공약수로 나누어 간단하게 하는 것이에요. 곱셈에서는 곱하기 전에 분자와 분모를 약분할 수 있어요.' },
    { term: '기약분수', def: '분모와 분자의 공약수가 1뿐이라서 더 약분할 수 없는 분수예요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
      q: '계산해 보세요.\n\n$\\frac{2}{7}\\times3$',
      answer: '6/7',
      wrong: [{ a: '6/21', why: '분모에도 3을 곱했어요. 분모는 그대로 두고 분자에만 곱해요.' }],
      explain: '분모는 그대로 두고 분자에 3을 곱해요. $\\frac{2\\times3}{7}=\\frac{6}{7}$',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', concept: 1,
      q: '계산해 보세요.\n\n$8\\times\\frac{3}{4}$',
      answer: '6',
      wrong: [{ a: '24', why: '자연수와 분자만 곱하고 분모로 나누는 것을 빠뜨렸어요. $\\frac{24}{4}$예요.' }],
      explain: '$8\\times\\frac{3}{4}=\\frac{8\\times3}{4}=\\frac{24}{4}=6$이에요. 8을 4묶음으로 나눈 한 묶음이 2이고, 그 3묶음이 6이라고 생각해도 돼요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: '$\\frac{1}{3}\\times\\frac{1}{4}$의 값은 무엇일까요?',
      choices: ['$\\frac{1}{12}$', '$\\frac{2}{7}$', '$\\frac{1}{7}$', '$\\frac{2}{12}$'],
      answer: 0,
      why: [
        '',
        '분자끼리, 분모끼리 더했어요. 곱셈은 분자끼리, 분모끼리 곱해요.',
        '분모끼리 더했어요. 분모끼리도 곱해요: $3\\times4=12$',
        '분자끼리 더했어요. 분자끼리도 곱해요: $1\\times1=1$',
      ],
      explain: '단위분수끼리의 곱은 분모끼리 곱하면 돼요. $\\frac{1}{3\\times4}=\\frac{1}{12}$',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', concept: 2,
      q: '계산해 보세요.\n\n$\\frac{3}{5}\\times\\frac{2}{7}$',
      answer: '6/35',
      wrong: [{ a: '5/12', why: '분자끼리, 분모끼리 더했어요. 곱셈은 분자끼리, 분모끼리 곱해요.' }],
      explain: '분자끼리 $3\\times2=6$, 분모끼리 $5\\times7=35$이므로 $\\frac{6}{35}$이에요.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 2,
      q: '단위분수끼리 곱하면 그 결과도 단위분수예요.',
      answer: true,
      explain: '단위분수는 분자가 1이에요. 분자끼리 곱하면 $1\\times1=1$이므로 결과도 분자가 1인 단위분수예요. 예: $\\frac{1}{2}\\times\\frac{1}{5}=\\frac{1}{10}$',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', concept: 0,
      q: '계산해 보세요. 답은 대분수로 써도 되고 가분수로 써도 돼요.\n\n$1\\frac{2}{3}\\times4$',
      answer: '6 2/3',
      wrong: [{ a: '4 2/3', why: '자연수 부분에만 4를 곱했어요. 대분수를 가분수 $\\frac{5}{3}$로 바꾸어 곱해요.' }],
      explain: '$1\\frac{2}{3}=\\frac{5}{3}$이므로 $\\frac{5}{3}\\times4=\\frac{20}{3}=6\\frac{2}{3}$예요.',
    },
    {
      id: 'p7', level: 2, type: 'choice', concept: 1,
      q: '계산 결과가 6보다 **작은** 것은 무엇일까요?',
      choices: ['$6\\times\\frac{3}{4}$', '$6\\times1\\frac{1}{5}$', '$6\\times\\frac{7}{4}$', '$6\\times\\frac{5}{5}$'],
      answer: 0,
      why: [
        '',
        '$1\\frac{1}{5}$은 1보다 커요. 1보다 큰 수를 곱하면 6보다 커져요.',
        '$\\frac{7}{4}$은 1보다 큰 가분수예요. 곱하면 6보다 커져요.',
        '$\\frac{5}{5}$는 1이에요. 1을 곱하면 6 그대로예요.',
      ],
      hint: '곱하는 분수가 1보다 작은지, 같은지, 큰지 살펴보세요.',
      explain: '1보다 작은 수를 곱해야 6보다 작아져요. $\\frac{3}{4}$만 1보다 작아요. $6\\times\\frac{3}{4}=\\frac{18}{4}=4\\frac{1}{2}$',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'number', concept: 3,
      q: '계산해 보세요.\n\n$1\\frac{1}{2}\\times2\\frac{2}{3}$',
      answer: '4',
      hint: '두 대분수를 가분수로 바꾸어 보세요.',
      wrong: [{ a: '2 1/3', why: '자연수끼리($1\\times2$), 분수끼리($\\frac{1}{2}\\times\\frac{2}{3}$) 따로 곱했어요. 가분수로 바꾸어 곱해요.' }],
      explain: '$1\\frac{1}{2}=\\frac{3}{2}$, $2\\frac{2}{3}=\\frac{8}{3}$이에요. $\\frac{3}{2}\\times\\frac{8}{3}=\\frac{24}{6}=4$예요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
      q: '계산해 보세요.\n\n$\\frac{3}{4}\\times\\frac{2}{5}\\times\\frac{5}{6}$',
      answer: '1/4',
      hint: '분자끼리, 분모끼리 한꺼번에 모은 뒤 약분해 보세요.',
      wrong: [{ a: '10/15', why: '분자끼리, 분모끼리 더했어요. 곱셈은 분자끼리, 분모끼리 곱해요.' }],
      explain: '$\\frac{3\\times2\\times5}{4\\times5\\times6}=\\frac{30}{120}$이에요. 약분하면 $\\frac{1}{4}$이에요. (곱하기 전에 3과 6, 2와 4, 5와 5를 약분해도 $\\frac{1}{4}$이에요.)',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: 'km', concept: 3,
      q: '한 시간에 $3\\frac{1}{3}$ km를 걷는 빠르기로 $1\\frac{1}{2}$시간 동안 걸었어요. 걸은 거리는 모두 몇 km일까요?',
      answer: '5',
      hint: '한 시간에 걷는 거리에 걸은 시간을 곱해요.',
      wrong: [{ a: '3 1/6', why: '자연수끼리, 분수끼리 따로 곱했어요. 대분수를 가분수로 바꾸어 곱해요.' }],
      explain: '$3\\frac{1}{3}\\times1\\frac{1}{2}=\\frac{10}{3}\\times\\frac{3}{2}=\\frac{30}{6}=5$이므로 5 km예요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: '명', concept: 1,
      q: '어느 반 학생 28명 가운데 $\\frac{3}{7}$이 안경을 써요. 안경을 쓴 학생은 몇 명일까요?',
      answer: '12',
      hint: '28명의 $\\frac{3}{7}$은 $28\\times\\frac{3}{7}$이에요.',
      wrong: [
        { a: '84', why: '분자 3만 곱하고 분모 7로 나누는 것을 빠뜨렸어요.' },
        { a: '4', why: '28명의 $\\frac{1}{7}$까지만 구했어요. $\\frac{3}{7}$은 그 3배예요.' },
      ],
      explain: '$28\\times\\frac{3}{7}=\\frac{28\\times3}{7}=\\frac{84}{7}=12$이므로 12명이에요. 28을 7묶음으로 나눈 한 묶음은 4명이고, 그 3묶음이 12명이에요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 2,
      q: '가로가 $\\frac{4}{5}$ m, 세로가 $\\frac{5}{8}$ m인 직사각형의 넓이는 몇 m²일까요?',
      choices: ['$\\frac{1}{2}$ m²', '$\\frac{9}{13}$ m²', '$1\\frac{17}{40}$ m²'],
      answer: 0,
      why: [
        '',
        '분자끼리, 분모끼리 더했어요. 넓이는 가로와 세로를 곱해요.',
        '가로와 세로를 더했어요. 직사각형의 넓이는 (가로) × (세로)예요.',
      ],
      hint: '직사각형의 넓이는 (가로) × (세로)예요.',
      explain: '$\\frac{4}{5}\\times\\frac{5}{8}=\\frac{20}{40}=\\frac{1}{2}$이므로 넓이는 $\\frac{1}{2}$ m²예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 2,
      q: '어떤 수에 $\\frac{3}{4}$을 곱해야 할 것을 잘못하여 더했더니 $1\\frac{1}{4}$이 되었어요. 바르게 계산한 값은 얼마일까요?',
      answer: '3/8',
      hint: '먼저 거꾸로 생각해서 어떤 수를 구해요.',
      wrong: [{ a: '1/2', why: '$\\frac{1}{2}$은 어떤 수예요. 어떤 수에 $\\frac{3}{4}$을 곱한 값까지 구해야 해요.' }],
      explain: '어떤 수는 $1\\frac{1}{4}-\\frac{3}{4}=\\frac{5}{4}-\\frac{3}{4}=\\frac{2}{4}=\\frac{1}{2}$이에요. 바르게 계산하면 $\\frac{1}{2}\\times\\frac{3}{4}=\\frac{3}{8}$이에요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', fixed: true, concept: 2,
      q: '$\\square$ 안에 들어갈 수 있는 자연수 가운데 가장 큰 수는 무엇일까요?\n\n$\\frac{1}{4}\\times\\frac{1}{\\square}>\\frac{1}{30}$',
      choices: ['6', '7', '8', '29'],
      answer: 1,
      why: [
        '7도 들어갈 수 있어요. $\\frac{1}{4}\\times\\frac{1}{7}=\\frac{1}{28}$은 $\\frac{1}{30}$보다 커요.',
        '',
        '8을 넣으면 $\\frac{1}{32}$이 되어 $\\frac{1}{30}$보다 작아요.',
        '분모끼리의 곱을 생각하지 않았어요. 왼쪽은 $\\frac{1}{4\\times\\square}$이에요.',
      ],
      hint: '단위분수는 분모가 작을수록 커요.',
      explain: '왼쪽은 $\\frac{1}{4\\times\\square}$이에요. 단위분수는 분모가 작을수록 크므로 $4\\times\\square<30$이어야 해요. $4\\times7=28$, $4\\times8=32$이므로 가장 큰 수는 7이에요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: 'm', concept: 4,
      q: '길이가 $2\\frac{1}{4}$ m인 끈이 있어요. 전체의 $\\frac{2}{3}$를 사용하고, 남은 끈의 $\\frac{1}{2}$을 또 사용했어요. 남은 끈은 몇 m일까요?',
      answer: '3/8',
      hint: '처음에 쓰고 남은 끈은 전체의 $\\frac{1}{3}$이에요.',
      wrong: [{ a: '3/4', why: '처음에 쓰고 남은 끈까지만 구했어요. 그 끈의 $\\frac{1}{2}$을 또 사용했어요.' }],
      explain: '처음에 쓰고 남은 끈은 전체의 $\\frac{1}{3}$이고, 그 가운데 $\\frac{1}{2}$이 남았어요. 남은 끈은 $2\\frac{1}{4}\\times\\frac{1}{3}\\times\\frac{1}{2}=\\frac{9}{4}\\times\\frac{1}{3}\\times\\frac{1}{2}=\\frac{9}{24}=\\frac{3}{8}$ (m)예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: 'm', concept: 1,
      q: '어떤 공은 떨어진 높이의 $\\frac{3}{5}$만큼 튀어 올라요. 이 공을 25 m 높이에서 떨어뜨렸을 때, 두 번째로 튀어 오른 높이는 몇 m일까요?',
      answer: '9',
      hint: '첫 번째로 튀어 오른 높이를 먼저 구해요.',
      wrong: [{ a: '15', why: '첫 번째로 튀어 오른 높이까지만 구했어요. 그 높이의 $\\frac{3}{5}$을 한 번 더 구해요.' }],
      explain: '첫 번째: $25\\times\\frac{3}{5}=15$ (m), 두 번째: $15\\times\\frac{3}{5}=9$ (m)예요. 한꺼번에 $25\\times\\frac{3}{5}\\times\\frac{3}{5}=9$로 계산해도 돼요.',
    },
  ],

  deeper: [
    {
      title: '곱했는데 왜 작아질까?',
      body: '자연수끼리 곱하면 결과가 커지는 것에 익숙해서, 곱했는데 작아지는 것이 이상하게 느껴질 수 있어요.\n\n"×$\\frac{1}{2}$"은 "~의 반"이라는 뜻이에요. 10의 반은 5, 곧 $10\\times\\frac{1}{2}=5$이니 작아지는 게 당연하지요.\n\n- 1보다 작은 수를 곱하면 → 작아져요.\n- 1을 곱하면 → 그대로예요.\n- 1보다 큰 수를 곱하면 → 커져요.\n\n계산하기 전에 이렇게 어림해 보면 답이 맞는지 스스로 확인할 수 있어요.',
    },
    {
      title: '6학년과의 연결 — 분수의 나눗셈',
      body: '6학년에서는 분수를 나누는 방법을 배워요. 분수의 나눗셈은 곱셈과 아주 가까운 사이라서, 이 단원에서 익힌 "분자끼리, 분모끼리 곱하기"와 "곱하기 전에 약분하기"가 그대로 쓰여요.\n\n지금 곱셈을 정확하고 빠르게 익혀 두면 6학년 분수 단원이 훨씬 쉬워져요.',
    },
  ],

  faq: [
    {
      q: '분수의 곱셈은 왜 통분을 안 해요?',
      a: '덧셈·뺄셈은 같은 크기의 조각끼리 모아야 해서 통분이 필요해요. 곱셈은 "~의 몇 분의 몇"을 구하는 것이라 조각 크기를 맞출 필요가 없어요.\n\n분자끼리, 분모끼리 곱하면 바로 답이 나와요. 예: $\\frac{1}{2}\\times\\frac{1}{3}=\\frac{1}{6}$',
    },
    {
      q: '대분수는 꼭 가분수로 바꿔야 해요?',
      a: '대분수끼리의 곱셈에서는 가분수로 바꾸는 것이 가장 안전해요. 자연수끼리, 분수끼리 따로 곱하면 일부를 빠뜨려서 틀려요.\n\n(대분수)×(자연수)는 자연수 부분과 분수 부분에 각각 곱해서 더해도 돼요. 예: $1\\frac{1}{4}\\times3=3+\\frac{3}{4}=3\\frac{3}{4}$',
    },
    {
      q: '약분은 곱하기 전에 해요, 곱한 뒤에 해요?',
      a: '둘 다 돼요. 답은 같아요. 곱하기 전에 분자와 분모를 약분하면 수가 작아져서 계산이 쉬워요.\n\n곱한 뒤에 약분해도 되지만 수가 커져서 최대공약수를 찾기가 어려울 수 있어요. 마지막에 기약분수인지 꼭 확인해요.',
    },
  ],

  mistakes: [
    '(분수)×(자연수)에서 분모에도 자연수를 곱하는 실수 — $\\frac{2}{7}\\times3$은 $\\frac{6}{7}$이에요. 분모는 그대로예요.',
    '대분수끼리 곱할 때 자연수끼리, 분수끼리 따로 곱하는 실수 — 가분수로 바꾸어 곱해요.',
    '분수의 곱셈에서도 통분하려는 실수 — 곱셈은 통분하지 않고 분자끼리, 분모끼리 곱해요.',
  ],

  gens: [
    {
      id: 'frac-times-whole',
      level: 1,
      title: '(분수)×(자연수), (자연수)×(분수)',
      make: function (R) {
        function gcd(x, y) { while (y) { var t = x % y; x = y; y = t; } return x; }
        var b = R.int(3, 12), a = R.int(1, b - 1);
        while (gcd(a, b) !== 1) a = R.int(1, b - 1);
        var n = R.int(2, 9);
        var F = R.F(a * n, b);
        var tex = R.fmt.frac(F, { mixed: true });
        var key = F.isInt() ? F.num : F.toMixed().num;
        var fracFirst = R.bool();
        var expr = fracFirst ? '\\frac{' + a + '}{' + b + '}\\times' + n : n + '\\times\\frac{' + a + '}{' + b + '}';
        var mid = fracFirst ? '\\frac{' + a + '\\times' + n + '}{' + b + '}' : '\\frac{' + n + '\\times' + a + '}{' + b + '}';
        var raw = '\\frac{' + (a * n) + '}{' + b + '}';
        var steps = '$' + expr + '=' + mid + '=' + raw + (raw === tex ? '' : '=' + tex) + '$';
        var wrong = fracFirst
          ? [{ a: (a * n) + '/' + (b * n), why: '분모에도 ' + n + R.josa(n, '을/를') + ' 곱했어요. 분모는 그대로 두고 분자에만 곱해요.' }]
          : [{ a: String(a * n), why: '자연수와 분자만 곱하고 분모로 나누는 것을 빠뜨렸어요. 분모 ' + b + R.josa(b, '은/는') + ' 그대로 두어요.' }];
        return {
          type: 'short', check: 'number', concept: fracFirst ? 0 : 1,
          q: '계산해 보세요. 답은 대분수로 써도 되고 가분수로 써도 돼요.\n\n$' + expr + '$',
          answer: F.toString(),
          wrong: wrong,
          explain: '분모는 그대로 두고 분자와 자연수를 곱해요. ' + steps + R.josa(key, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'frac-times-frac',
      level: 1,
      title: '(진분수)×(진분수)',
      make: function (R) {
        function gcd(x, y) { while (y) { var t = x % y; x = y; y = t; } return x; }
        var unit = R.bool(0.3);
        var b = R.int(2, 9), d = R.int(2, 9), a = 1, c = 1;
        if (!unit) {
          b = R.int(3, 9); d = R.int(3, 9);
          a = R.int(1, b - 1); c = R.int(1, d - 1);
          while (gcd(a, b) !== 1) a = R.int(1, b - 1);
          while (gcd(c, d) !== 1) c = R.int(1, d - 1);
          if (a === 1 && c === 1) a = b - 1; // 단위분수끼리는 위에서 따로
        }
        var P = a * c, Q = b * d, F = R.F(P, Q);
        var tex = R.fmt.frac(F), raw = '\\frac{' + P + '}{' + Q + '}';
        return {
          type: 'short', check: 'number', concept: 2,
          q: '계산해 보세요.\n\n$\\frac{' + a + '}{' + b + '}\\times\\frac{' + c + '}{' + d + '}$',
          answer: F.toString(),
          wrong: [{ a: (a + c) + '/' + (b + d), why: '분자끼리, 분모끼리 더했어요. 곱셈은 분자끼리, 분모끼리 곱해요.' }],
          explain: '분자끼리 $' + a + '\\times' + c + '=' + P + '$, 분모끼리 $' + b + '\\times' + d + '=' + Q + '$' + R.josa(Q, '이에요/예요') + '. ' +
            (raw === tex ? '답은 $' + tex + '$' + R.josa(P, '이에요/예요') + '.' : '$' + raw + '$' + R.josa(P, '을/를') + ' 약분하면 $' + tex + '$' + R.josa(F.num, '이에요/예요') + '.'),
        };
      },
    },
    {
      id: 'mixed-or-three',
      level: 2,
      title: '(대분수)×(대분수), 세 분수의 곱셈',
      make: function (R) {
        function gcd(x, y) { while (y) { var t = x % y; x = y; y = t; } return x; }
        function prop(lo, hi) {
          var d = R.int(lo, hi), n = R.int(1, d - 1);
          while (gcd(n, d) !== 1) n = R.int(1, d - 1);
          return [n, d];
        }
        if (R.bool(0.6)) {
          var f1 = prop(2, 6), f2 = prop(2, 6), w1 = R.int(1, 3), w2 = R.int(1, 3);
          var i1 = w1 * f1[1] + f1[0], i2 = w2 * f2[1] + f2[0];
          var F = R.F(i1 * i2, f1[1] * f2[1]);
          var tex = R.fmt.frac(F, { mixed: true }), key = F.isInt() ? F.num : F.toMixed().num;
          var wrongV = R.F(w1 * w2, 1).add(R.F(f1[0] * f2[0], f1[1] * f2[1]));
          var raw = '\\frac{' + (i1 * i2) + '}{' + (f1[1] * f2[1]) + '}';
          return {
            type: 'short', check: 'number', concept: 3,
            q: '계산해 보세요. 답은 대분수로 써도 되고 가분수로 써도 돼요.\n\n$' + w1 + '\\frac{' + f1[0] + '}{' + f1[1] + '}\\times' + w2 + '\\frac{' + f2[0] + '}{' + f2[1] + '}$',
            answer: F.toString(),
            hint: '두 대분수를 가분수로 바꾸어 보세요.',
            wrong: [{ a: wrongV.toString(), why: '자연수끼리, 분수끼리 따로 곱했어요. 대분수를 가분수로 바꾸어 곱해요.' }],
            explain: '가분수로 바꾸면 $' + w1 + '\\frac{' + f1[0] + '}{' + f1[1] + '}=\\frac{' + i1 + '}{' + f1[1] + '}$, $' + w2 + '\\frac{' + f2[0] + '}{' + f2[1] + '}=\\frac{' + i2 + '}{' + f2[1] + '}$' + R.josa(i2, '이에요/예요') + '. ' +
              '$\\frac{' + i1 + '}{' + f1[1] + '}\\times\\frac{' + i2 + '}{' + f2[1] + '}=' + raw + (raw === tex ? '' : '=' + tex) + '$' + R.josa(key, '이에요/예요') + '.',
          };
        }
        var g1 = prop(2, 9), g2 = prop(2, 9), g3 = prop(2, 9);
        var N = g1[0] * g2[0] * g3[0], D = g1[1] * g2[1] * g3[1], G = R.F(N, D);
        var tx = R.fmt.frac(G), rw = '\\frac{' + N + '}{' + D + '}';
        var e = '\\frac{' + g1[0] + '}{' + g1[1] + '}\\times\\frac{' + g2[0] + '}{' + g2[1] + '}\\times\\frac{' + g3[0] + '}{' + g3[1] + '}';
        return {
          type: 'short', check: 'number', concept: 4,
          q: '계산해 보세요.\n\n$' + e + '$',
          answer: G.toString(),
          hint: '분자끼리, 분모끼리 한꺼번에 모은 뒤 약분해 보세요.',
          wrong: [{ a: (g1[0] + g2[0] + g3[0]) + '/' + (g1[1] + g2[1] + g3[1]), why: '분자끼리, 분모끼리 더했어요. 곱셈은 분자끼리, 분모끼리 곱해요.' }],
          explain: '분자끼리, 분모끼리 곱하면 $\\frac{' + g1[0] + '\\times' + g2[0] + '\\times' + g3[0] + '}{' + g1[1] + '\\times' + g2[1] + '\\times' + g3[1] + '}=' + rw + '$' + R.josa(N, '이에요/예요') + '.' +
            (rw === tx ? '' : ' 약분하면 $' + tx + '$' + R.josa(G.num, '이에요/예요') + '.'),
        };
      },
    },
    {
      id: 'unit-frac-compare',
      level: 3,
      title: '단위분수의 곱과 크기 비교',
      make: function (R) {
        var a = R.int(2, 6), ans = R.int(3, 9);
        var N = a * ans + R.int(1, a); // a×ans < N ≤ a×(ans+1)
        var tight = N === a * (ans + 1);
        var w2 = [{ a: String(ans + 1), why: (tight ? '같아지는 경우를 넣었어요. ' : '') + '$\\square=' + (ans + 1) + '$이면 분모가 $' + a + '\\times' + (ans + 1) + '=' + (a * (ans + 1)) + '$' + R.josa(a * (ans + 1), '이/가') + ' 되어 $\\frac{1}{' + N + '}$보다 크지 않아요.' }];
        if (N - 1 !== ans) w2.push({ a: String(N - 1), why: '분모끼리의 곱을 생각하지 않았어요. 왼쪽은 $\\frac{1}{' + a + '\\times\\square}$이에요.' });
        return {
          type: 'short', check: 'number', concept: 2,
          q: '$\\square$ 안에 들어갈 수 있는 자연수 가운데 가장 큰 수를 구해 보세요.\n\n$\\frac{1}{' + a + '}\\times\\frac{1}{\\square}>\\frac{1}{' + N + '}$',
          answer: String(ans),
          hint: '단위분수는 분모가 작을수록 커요.',
          wrong: w2,
          explain: '왼쪽은 $\\frac{1}{' + a + '\\times\\square}$이에요. 단위분수는 분모가 작을수록 크므로 $' + a + '\\times\\square<' + N + '$이어야 해요. ' +
            '$' + a + '\\times' + ans + '=' + (a * ans) + '$' + R.josa(a * ans, '은/는') + ' ' + N + '보다 작고, $' + a + '\\times' + (ans + 1) + '=' + (a * (ans + 1)) + '$' + R.josa(a * (ans + 1), '은/는') + ' ' + N + '보다 작지 않아요. 그래서 가장 큰 수는 ' + ans + R.josa(ans, '이에요/예요') + '.',
        };
      },
    },
  ],
});
