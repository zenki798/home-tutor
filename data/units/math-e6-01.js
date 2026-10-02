/* 6학년 수학 · 분수의 나눗셈(÷자연수)
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy) */
Tutor.registerUnit({
  id: 'math-e6-01',
  course: 'math-e6',
  title: '분수의 나눗셈(÷자연수)',
  summary: '(자연수)÷(자연수)의 몫을 분수로 나타내고, (분수)÷(자연수)를 곱셈으로 바꾸어 계산해요.',
  goals: [
    '(자연수)÷(자연수)의 몫을 분수로 나타낼 수 있어요.',
    '(분수)÷(자연수)를 분자를 나누거나 $\\frac{1}{\\text{자연수}}$을 곱하여 계산할 수 있어요.',
    '(대분수)÷(자연수)를 가분수로 바꾸어 계산할 수 있어요.',
  ],
  standards: ['[6수01-10]', '[6수01-11]'],

  concepts: [
    {
      title: '몫이 1보다 작은 (자연수)÷(자연수)',
      body: '$1\\div3$은 1을 똑같이 3으로 나눈 것 가운데 하나예요. 그래서 몫은 $\\frac{1}{3}$이에요.\n\n' +
        '$2\\div3$은 2를 똑같이 3으로 나눈 것 가운데 하나예요. 1을 3으로 나누면 $\\frac{1}{3}$이고, 2는 1이 두 개이니 $\\frac{1}{3}$이 2개, 곧 $\\frac{2}{3}$예요.\n\n' +
        '$2\\div3=\\frac{2}{3}$\n\n' +
        '> 💡 (자연수)÷(자연수)의 몫은 **나누어지는 수를 분자, 나누는 수를 분모**로 하는 분수로 나타낼 수 있어요.',
      easy: '피자 2판을 3명이 똑같이 나누어 먹는다고 생각해 보세요. 한 판씩 3조각으로 자르면 조각이 모두 6개, 한 사람이 2조각씩 가져가요.\n\n' +
        '한 조각은 피자 $\\frac{1}{3}$판이니, 한 사람이 먹는 양은 $\\frac{1}{3}$판이 2개, 곧 $\\frac{2}{3}$판이에요. 그래서 $2\\div3=\\frac{2}{3}$예요.',
      fig: { type: 'fraction', shape: 'bar', n: 2, d: 3, alt: '3칸 중 2칸을 색칠한 막대' },
      check: {
        type: 'choice',
        q: '$3\\div5$의 몫을 분수로 나타낸 것은 무엇일까요?',
        choices: ['$\\frac{3}{5}$', '$\\frac{5}{3}$', '$\\frac{1}{5}$'],
        answer: 0,
        why: ['', '분자와 분모를 바꾸어 썼어요. 나누어지는 수 3이 분자, 나누는 수 5가 분모예요.', '$1\\div5$의 몫이에요. 3은 1이 3개이니 $\\frac{1}{5}$이 3개예요.'],
        explain: '나누어지는 수 3을 분자, 나누는 수 5를 분모로 써요. $3\\div5=\\frac{3}{5}$이에요.',
      },
    },
    {
      title: '몫이 1보다 큰 (자연수)÷(자연수)',
      body: '나누어지는 수가 나누는 수보다 커도 같은 방법으로 나타내요. $5\\div3$의 몫은 $\\frac{5}{3}$예요.\n\n' +
        '1을 3으로 나누면 $\\frac{1}{3}$이고, 5는 1이 다섯 개이니 $\\frac{1}{3}$이 5개, 곧 $\\frac{5}{3}$예요.\n\n' +
        '몫을 **대분수**로 나타낼 수도 있어요. $5\\div3=1$ … 나머지 $2$이고, 남은 2를 다시 3으로 나누면 $\\frac{2}{3}$예요. 그래서\n\n' +
        '$5\\div3=\\frac{5}{3}=1\\frac{2}{3}$\n\n' +
        '> 💡 몫은 가분수로 나타내도 되고, 대분수로 나타내도 돼요. 값이 같아요.',
      easy: '떡 5개를 3명이 똑같이 나누어 먹어요. 먼저 한 사람에게 1개씩 주면 2개가 남지요.\n\n' +
        '남은 2개는 다시 3명에게 똑같이 나누어요. 한 사람이 $\\frac{2}{3}$개씩 더 받아요. 그래서 한 사람이 먹는 떡은 $1\\frac{2}{3}$개예요.',
      fig: { type: 'fraction', shape: 'bar', n: 5, d: 3, alt: '3칸짜리 막대 2개에서 5칸을 색칠한 그림' },
      check: {
        type: 'ox',
        q: '$7\\div4$의 몫은 $1\\frac{3}{4}$이에요.',
        answer: true,
        explain: '$7\\div4=\\frac{7}{4}$이고, $7\\div4=1$ … 나머지 $3$이므로 대분수로 $1\\frac{3}{4}$이에요.',
      },
    },
    {
      title: '분자가 자연수의 배수인 (분수)÷(자연수)',
      body: '$\\frac{6}{7}\\div3$을 생각해 보아요. $\\frac{6}{7}$은 $\\frac{1}{7}$짜리 조각이 6개예요. 6개를 똑같이 3묶음으로 나누면 한 묶음에 2개씩이에요.\n\n' +
        '$\\frac{6}{7}\\div3=\\frac{6\\div3}{7}=\\frac{2}{7}$\n\n' +
        '이처럼 **분자가 나누는 자연수의 배수**이면 **분모는 그대로 두고 분자를 자연수로 나눠요.**\n\n' +
        '> 💡 분자가 나누어떨어지지 않으면 크기가 같은 분수로 바꾸어요. $\\frac{3}{5}\\div2$는 $\\frac{3}{5}=\\frac{6}{10}$으로 바꾸면 $\\frac{6}{10}\\div2=\\frac{3}{10}$이에요.',
      easy: '초콜릿 한 판이 7칸이에요. 6칸이 남아 있는데 3명이 똑같이 나누어 먹으면 한 사람이 2칸씩 먹지요.\n\n' +
        '한 칸은 $\\frac{1}{7}$판이니 한 사람이 먹는 양은 $\\frac{2}{7}$판이에요. 칸의 크기(분모 7)는 그대로이고, 칸 수(분자)만 나누어요.',
      fig: { type: 'fraction', shape: 'bar', n: 6, d: 7, alt: '7칸 중 6칸을 색칠한 막대' },
      check: {
        type: 'short', check: 'number',
        q: '계산해 보세요.\n\n$\\frac{8}{9}\\div4$',
        answer: '2/9',
        wrong: [
          { a: '32/9', why: '분자에 4를 곱했어요. 나눗셈이니 분자 8을 4로 나누어요.' },
        ],
        explain: '분자 8이 4의 배수이니 분모는 그대로 두고 분자를 나눠요. $\\frac{8}{9}\\div4=\\frac{8\\div4}{9}=\\frac{2}{9}$',
      },
    },
    {
      title: '(분수)÷(자연수)를 곱셈으로 바꾸기',
      body: '어떤 수를 3으로 나누는 것은 그 수를 똑같이 3으로 나눈 것 가운데 하나, 곧 그 수의 $\\frac{1}{3}$을 구하는 것과 같아요.\n\n' +
        '그래서 **÷(자연수)는 ×$\\frac{1}{\\text{자연수}}$로 바꾸어 계산할 수 있어요.**\n\n' +
        '$\\frac{3}{5}\\div2=\\frac{3}{5}\\times\\frac{1}{2}=\\frac{3}{10}$\n\n' +
        '결과를 보면 분자는 그대로이고 **분모에 자연수를 곱한** 것과 같아요. 분자가 나누어떨어지지 않을 때도 이 방법이면 바로 계산돼요.\n\n' +
        '> ⚠️ 바꾸는 것은 나누는 자연수뿐이에요. $\\frac{3}{5}$은 그대로 두고, $\\div2$만 $\\times\\frac{1}{2}$로 바꾸어요.',
      easy: '물 $\\frac{3}{5}$ L를 컵 2개에 똑같이 나누어 담는다고 해 보세요. 한 컵에 담기는 물은 $\\frac{3}{5}$ L의 절반이에요.\n\n' +
        '"절반"은 "$\\frac{1}{2}$배"이지요. 그래서 $\\frac{3}{5}\\div2$와 $\\frac{3}{5}\\times\\frac{1}{2}$은 같은 계산이에요. 분수의 곱셈은 5학년에서 배웠으니 그대로 계산하면 돼요.',
      check: {
        type: 'choice',
        q: '$\\frac{4}{7}\\div5$와 계산 결과가 같은 식은 무엇일까요?',
        choices: ['$\\frac{4}{7}\\times\\frac{1}{5}$', '$\\frac{4}{7}\\times5$', '$\\frac{7}{4}\\times\\frac{1}{5}$'],
        answer: 0,
        why: ['', '나눗셈을 곱셈으로 바꿀 때 5를 그대로 곱했어요. $\\div5$는 $\\times\\frac{1}{5}$이에요.', '나누어지는 분수 $\\frac{4}{7}$까지 뒤집었어요. 분수는 그대로 두어요.'],
        explain: '$\\div5$는 $\\times\\frac{1}{5}$과 같아요. 그래서 $\\frac{4}{7}\\div5=\\frac{4}{7}\\times\\frac{1}{5}=\\frac{4}{35}$예요.',
      },
    },
    {
      title: '(대분수)÷(자연수)',
      body: '대분수를 자연수로 나눌 때는 먼저 **대분수를 가분수로 바꾸어요.** 그다음은 (분수)÷(자연수)와 같아요.\n\n' +
        '$2\\frac{2}{5}\\div3=\\frac{12}{5}\\div3=\\frac{12\\div3}{5}=\\frac{4}{5}$\n\n' +
        '$1\\frac{3}{4}\\div2=\\frac{7}{4}\\div2=\\frac{7}{4}\\times\\frac{1}{2}=\\frac{7}{8}$\n\n' +
        '> ⚠️ 자연수 부분만, 또는 분수 부분만 나누면 안 돼요. 대분수 전체를 나누어야 해요.',
      easy: '$2\\frac{2}{5}$는 "2와 $\\frac{2}{5}$"가 붙어 있는 수예요. 이대로는 셋으로 나누기 어려우니, 모두 $\\frac{1}{5}$짜리 조각으로 바꾸어 봐요.\n\n' +
        '1은 $\\frac{1}{5}$이 5조각이니 2는 10조각, 여기에 2조각을 더하면 12조각, 곧 $\\frac{12}{5}$예요. 12조각을 3명이 나누면 한 사람이 4조각, $\\frac{4}{5}$예요.',
      check: {
        type: 'ox',
        q: '$2\\frac{1}{3}\\div7$을 계산하려면 먼저 $2\\frac{1}{3}$을 가분수 $\\frac{7}{3}$로 바꾸면 돼요.',
        answer: true,
        explain: '$2\\frac{1}{3}=\\frac{7}{3}$이에요. 그래서 $\\frac{7}{3}\\div7=\\frac{7\\div7}{3}=\\frac{1}{3}$이에요.',
      },
    },
  ],

  examples: [
    {
      q: '주스 3 L를 4명이 똑같이 나누어 마시려고 해요. 한 사람이 마시는 주스는 몇 L일까요?',
      steps: [
        '똑같이 나누니 나눗셈이에요. 식은 $3\\div4$예요.',
        '나누어지는 수 3을 분자, 나누는 수 4를 분모로 써요. $3\\div4=\\frac{3}{4}$',
        '그래서 한 사람이 마시는 주스는 $\\frac{3}{4}$ L예요.',
      ],
      answer: '$\\frac{3}{4}$ L',
    },
    {
      q: '계산해 보세요.\n\n$2\\frac{2}{3}\\div5$',
      steps: [
        '대분수를 가분수로 바꾸어요. $2\\frac{2}{3}=\\frac{8}{3}$',
        '분자 8은 5로 나누어떨어지지 않으니 곱셈으로 바꾸어요. $\\frac{8}{3}\\div5=\\frac{8}{3}\\times\\frac{1}{5}$',
        '분자끼리, 분모끼리 곱해요. $\\frac{8\\times1}{3\\times5}=\\frac{8}{15}$',
      ],
      answer: '$\\frac{8}{15}$',
    },
  ],

  terms: [
    { term: '몫', def: '나눗셈을 해서 얻은 답이에요. 예: $2\\div3$의 몫은 $\\frac{2}{3}$예요.' },
    { term: '나누어지는 수', def: '나눗셈에서 나뉘는 수예요. $2\\div3$에서 2예요. 몫을 분수로 나타내면 분자가 돼요.' },
    { term: '나누는 수', def: '나눗셈에서 몇으로 나누는지 나타내는 수예요. $2\\div3$에서 3이에요. 몫을 분수로 나타내면 분모가 돼요.' },
    { term: '단위분수', def: '분자가 1인 분수예요. 예: $\\frac{1}{3}$, $\\frac{1}{5}$. 어떤 수를 3으로 나누는 것은 그 수에 $\\frac{1}{3}$을 곱하는 것과 같아요.' },
    { term: '가분수', def: '분자가 분모와 같거나 분모보다 큰 분수예요. 예: $\\frac{5}{3}$' },
    { term: '대분수', def: '자연수와 진분수로 이루어진 분수예요. 예: $1\\frac{2}{3}$. 나눗셈을 할 때는 먼저 가분수로 바꾸어요.' },
    { term: '기약분수', def: '분자와 분모를 더 이상 약분할 수 없는 분수예요. 예: $\\frac{6}{10}$을 약분하면 기약분수 $\\frac{3}{5}$이 돼요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
      q: '$2\\div9$의 몫을 분수로 나타내어 보세요.',
      answer: '2/9',
      wrong: [{ a: '9/2', why: '분자와 분모를 바꾸어 썼어요. 나누어지는 수 2가 분자, 나누는 수 9가 분모예요.' }],
      explain: '나누어지는 수 2를 분자, 나누는 수 9를 분모로 써요. $2\\div9=\\frac{2}{9}$',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '$7\\div3$의 몫을 대분수로 바르게 나타낸 것은 무엇일까요?',
      choices: ['$2\\frac{1}{3}$', '$\\frac{3}{7}$', '$2\\frac{1}{7}$', '$1\\frac{1}{3}$'],
      answer: 0,
      why: [
        '',
        '분자와 분모를 바꾸어 썼어요. $7\\div3$의 몫은 1보다 커요.',
        '나머지 1을 나누는 수 3이 아니라 7로 나누었어요. 남은 1을 3명에게 나누면 $\\frac{1}{3}$이에요.',
        '몫의 자연수 부분을 잘못 구했어요. $7\\div3=2$ … 나머지 $1$이에요.',
      ],
      explain: '$7\\div3=2$ … 나머지 $1$이고, 남은 1을 다시 3으로 나누면 $\\frac{1}{3}$이에요. 그래서 $7\\div3=\\frac{7}{3}=2\\frac{1}{3}$이에요.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 0,
      q: '$5\\div8=\\frac{8}{5}$이에요.',
      answer: false,
      explain: '나누어지는 수 5가 분자, 나누는 수 8이 분모예요. 바르게 쓰면 $5\\div8=\\frac{5}{8}$예요. 5를 8로 나누니 몫은 1보다 작아야 해요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', concept: 2,
      q: '계산해 보세요.\n\n$\\frac{10}{11}\\div5$',
      answer: '2/11',
      wrong: [{ a: '50/11', why: '분자에 5를 곱했어요. 나눗셈이니 분자 10을 5로 나누어요.' }],
      explain: '분자 10이 5의 배수이니 분모는 그대로 두고 분자를 나눠요. $\\frac{10}{11}\\div5=\\frac{10\\div5}{11}=\\frac{2}{11}$',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '$\\frac{3}{4}\\div5$의 값은 무엇일까요?',
      choices: ['$\\frac{3}{20}$', '$\\frac{15}{4}$', '$\\frac{3}{9}$', '$\\frac{4}{15}$'],
      answer: 0,
      why: [
        '',
        '5를 곱했어요. $\\div5$는 $\\times\\frac{1}{5}$이에요.',
        '분모에 5를 더했어요. 분모에는 5를 곱해요: $4\\times5=20$',
        '$\\frac{3}{4}$을 뒤집었어요. 나누어지는 분수는 그대로 두어요.',
      ],
      explain: '$\\frac{3}{4}\\div5=\\frac{3}{4}\\times\\frac{1}{5}=\\frac{3}{20}$이에요. 분자 3은 5로 나누어떨어지지 않으니 곱셈으로 바꾸면 편해요.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 3,
      q: '$\\frac{2}{3}\\div4$와 $\\frac{2}{3}\\times\\frac{1}{4}$의 계산 결과는 같아요.',
      answer: true,
      explain: '4로 나누는 것은 $\\frac{1}{4}$을 곱하는 것과 같아요. 둘 다 $\\frac{2}{12}=\\frac{1}{6}$이에요.',
    },
    {
      id: 'p7', level: 2, type: 'short', check: 'number', concept: 4,
      q: '계산해 보세요.\n\n$1\\frac{4}{5}\\div3$',
      answer: '3/5',
      hint: '먼저 대분수를 가분수로 바꾸어 보세요.',
      wrong: [
        { a: '1 4/15', why: '분수 부분만 3으로 나누었어요. 대분수를 가분수 $\\frac{9}{5}$로 바꾼 뒤 나누어요.' },
        { a: '27/5', why: '3을 곱했어요. 나눗셈이니 분자 9를 3으로 나누어요.' },
      ],
      explain: '$1\\frac{4}{5}=\\frac{9}{5}$예요. 분자 9가 3의 배수이니 $\\frac{9}{5}\\div3=\\frac{9\\div3}{5}=\\frac{3}{5}$이에요.',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'number', unit: 'm', concept: 0,
      q: '철사 5 m를 똑같이 6도막으로 잘랐어요. 한 도막의 길이는 몇 m일까요?',
      answer: '5/6',
      hint: '전체 길이를 도막 수로 나누어요.',
      wrong: [{ a: '6/5', why: '분자와 분모를 바꾸어 썼어요. 식은 $5\\div6$이고, 5가 분자예요.' }],
      explain: '한 도막의 길이는 $5\\div6=\\frac{5}{6}$ (m)예요. 5 m를 6도막으로 나누니 한 도막은 1 m보다 짧아야 해요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: 'kg', concept: 2,
      q: '설탕 $\\frac{9}{10}$ kg을 통 3개에 똑같이 나누어 담았어요. 한 통에 담은 설탕은 몇 kg일까요?',
      answer: '3/10',
      hint: '전체 양을 통의 수로 나누어요.',
      wrong: [{ a: '27/10', why: '통의 수만큼 곱했어요. 똑같이 나누어 담으니 나눗셈이에요.' }],
      explain: '$\\frac{9}{10}\\div3=\\frac{9\\div3}{10}=\\frac{3}{10}$이므로 한 통에 $\\frac{3}{10}$ kg을 담았어요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 4,
      q: '둘레가 $3\\frac{1}{5}$ cm인 정사각형이 있어요. 이 정사각형의 한 변의 길이는 몇 cm일까요?',
      fig: { type: 'polygon', points: [[0, 0], [4, 0], [4, 4], [0, 4]], sides: ['?', null, null, null], angles: [{ at: 0, right: true }, { at: 1, right: true }, { at: 2, right: true }, { at: 3, right: true }], alt: '네 변의 길이가 같은 정사각형, 한 변에 물음표' },
      answer: '4/5',
      hint: '정사각형은 네 변의 길이가 같아요. 둘레를 4로 나누어요.',
      wrong: [
        { a: '3 1/20', why: '분수 부분만 4로 나누었어요. $3\\frac{1}{5}$을 가분수로 바꾼 뒤 나누어요.' },
        { a: '64/5', why: '둘레에 4를 곱했어요. 한 변은 둘레를 4로 나누어 구해요.' },
      ],
      explain: '정사각형의 둘레는 (한 변)×4이므로 한 변은 둘레÷4예요. $3\\frac{1}{5}\\div4=\\frac{16}{5}\\div4=\\frac{16\\div4}{5}=\\frac{4}{5}$ (cm)예요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 1,
      q: '몫이 **1보다 큰** 나눗셈은 무엇일까요?',
      choices: ['$9\\div4$', '$4\\div9$', '$3\\div8$', '$5\\div6$'],
      answer: 0,
      why: [
        '',
        '$4\\div9=\\frac{4}{9}$로 1보다 작아요. 나누어지는 수가 나누는 수보다 작아요.',
        '$3\\div8=\\frac{3}{8}$으로 1보다 작아요. 나누어지는 수가 나누는 수보다 작아요.',
        '$5\\div6=\\frac{5}{6}$로 1보다 작아요. 나누어지는 수가 나누는 수보다 작아요.',
      ],
      explain: '나누어지는 수가 나누는 수보다 크면 몫이 1보다 커요. $9\\div4=\\frac{9}{4}=2\\frac{1}{4}$이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 3,
      q: '어떤 분수를 4로 나누어야 할 것을 잘못하여 4를 곱했더니 $2\\frac{2}{3}$가 되었어요. 바르게 계산한 값은 얼마일까요?',
      answer: '1/6',
      hint: '먼저 거꾸로 생각해서 어떤 분수를 구해요.',
      wrong: [
        { a: '2/3', why: '$\\frac{2}{3}$는 어떤 분수예요. 이 분수를 4로 나눈 값까지 구해야 해요.' },
        { a: '32/3', why: '잘못 계산한 값에 4를 또 곱했어요. 어떤 분수는 $2\\frac{2}{3}\\div4$로 구해요.' },
      ],
      explain: '어떤 분수에 4를 곱한 것이 $2\\frac{2}{3}=\\frac{8}{3}$이므로 어떤 분수는 $\\frac{8}{3}\\div4=\\frac{2}{3}$예요. 바르게 계산하면 $\\frac{2}{3}\\div4=\\frac{2}{3}\\times\\frac{1}{4}=\\frac{2}{12}=\\frac{1}{6}$이에요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', fixed: true, concept: 3,
      q: '$\\square$ 안에 들어갈 수 있는 자연수는 모두 몇 개일까요?\n\n$\\frac{\\square}{5}\\div3<\\frac{1}{3}$',
      choices: ['3개', '4개', '5개', '14개'],
      answer: 1,
      why: [
        '4를 빠뜨렸어요. $\\frac{4}{5}\\div3=\\frac{4}{15}$는 $\\frac{5}{15}$보다 작아요.',
        '',
        '5를 넣으면 $\\frac{5}{15}=\\frac{1}{3}$이 되어 $\\frac{1}{3}$보다 작지 않아요.',
        '분모 15보다 작은 수를 모두 센 것 같아요. 오른쪽 $\\frac{1}{3}$도 분모가 15인 분수로 바꾸어 비교해요.',
      ],
      hint: '왼쪽을 계산하고, $\\frac{1}{3}$을 분모가 같은 분수로 바꾸어 보세요.',
      explain: '$\\frac{\\square}{5}\\div3=\\frac{\\square}{15}$이고, $\\frac{1}{3}=\\frac{5}{15}$예요. 그래서 $\\square<5$여야 해요. 들어갈 수 있는 자연수는 1, 2, 3, 4로 모두 4개예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: 'm', concept: 4,
      q: '길이가 $4\\frac{1}{2}$ m인 끈을 똑같이 3도막으로 잘랐어요. 그중 한 도막을 다시 똑같이 2도막으로 잘랐어요. 가장 짧은 도막 하나의 길이는 몇 m일까요?',
      answer: '3/4',
      hint: '두 번 나누어요. 먼저 3으로, 그다음 2로.',
      wrong: [
        { a: '3/2', why: '처음 3도막으로 자른 한 도막의 길이예요. 그 도막을 다시 2로 나누어요.' },
        { a: '9/4', why: '처음에 3으로 나누는 것을 빠뜨렸어요. $4\\frac{1}{2}\\div3$을 먼저 계산해요.' },
      ],
      explain: '$4\\frac{1}{2}=\\frac{9}{2}$예요. 3도막으로 자르면 한 도막은 $\\frac{9}{2}\\div3=\\frac{3}{2}$ (m), 다시 2도막으로 자르면 $\\frac{3}{2}\\div2=\\frac{3}{2}\\times\\frac{1}{2}=\\frac{3}{4}$ (m)예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', concept: 3,
      q: '수 카드 2, 5, 7을 한 번씩 모두 써서 (진분수)÷(자연수)의 나눗셈을 만들려고 해요. 몫이 **가장 작은** 나눗셈의 몫은 얼마일까요?\n\n$\\frac{\\square}{\\square}\\div\\square$',
      answer: '2/35',
      hint: '몫이 작아지려면 분자는 작게, 분모와 나누는 수는 크게 해야 해요.',
      wrong: [
        { a: '5/14', why: '분자에 5를 놓았어요. 분자가 가장 작은 2일 때 몫이 더 작아요.' },
        { a: '2/7', why: '나누기 전의 분수만 구했어요. $\\frac{2}{7}$를 5로 나누어야 해요.' },
      ],
      explain: '(진분수)÷(자연수)$=\\frac{\\text{분자}}{\\text{분모}\\times\\text{자연수}}$이므로 분자는 가장 작은 2로 하고, 분모와 나누는 수에 5와 7을 놓아요. $\\frac{2}{7}\\div5=\\frac{2}{35}$, $\\frac{2}{5}\\div7=\\frac{2}{35}$로 어느 쪽이든 몫은 $\\frac{2}{35}$예요.',
    },
  ],

  deeper: [
    {
      title: '분수의 가로선은 나눗셈 기호였다',
      body: '$2\\div3=\\frac{2}{3}$를 보면 분수의 가로선이 나눗셈 기호처럼 쓰였어요. 사실 나눗셈 기호 ÷를 잘 보면 가로선 위아래에 점이 하나씩 있어요. 점 자리에 수를 넣으면 분수 모양이 되지요.\n\n' +
        '그래서 분수 $\\frac{a}{b}$는 "$a$를 $b$로 똑같이 나눈 몫"이라고 생각해도 돼요. 중학교에 가면 나눗셈을 거의 모두 분수 꼴로 써요.',
    },
    {
      title: '다음에는 분수로 나누어요',
      body: '이번 단원에서는 분수를 **자연수**로 나누었어요. 2학기에는 $\\frac{3}{4}\\div\\frac{1}{8}$처럼 분수를 **분수**로 나누는 방법을 배워요.\n\n' +
        '그때도 "나눗셈을 곱셈으로 바꾸기"라는 오늘의 생각이 그대로 쓰여요. $\\div3$이 $\\times\\frac{1}{3}$이었던 것처럼요.',
    },
  ],

  faq: [
    {
      q: '나누는 수가 더 큰데 어떻게 나눌 수 있어요?',
      a: '자연수끼리만 나누면 $2\\div3$은 몫이 0이고 나머지가 2예요. 하지만 분수를 쓰면 남김없이 나눌 수 있어요.\n\n피자 2판을 3명이 나누면 한 사람이 $\\frac{2}{3}$판씩 먹지요. 그래서 $2\\div3=\\frac{2}{3}$예요.',
    },
    {
      q: '분자를 나누는 방법이랑 분모에 곱하는 방법 중 뭘 써야 해요?',
      a: '둘 다 맞는 방법이에요. 분자가 나누는 수로 나누어떨어지면 분자를 나누는 것이 간단해요($\\frac{6}{7}\\div3=\\frac{2}{7}$).\n\n나누어떨어지지 않으면 $\\frac{1}{\\text{자연수}}$을 곱하는 방법, 곧 분모에 자연수를 곱하는 방법을 쓰면 돼요($\\frac{3}{5}\\div2=\\frac{3}{10}$).',
    },
    {
      q: '대분수는 왜 꼭 가분수로 바꿔야 해요?',
      a: '대분수는 자연수와 분수가 더해진 수라서, 한 부분만 나누면 틀린 답이 나와요. 가분수로 바꾸면 수 하나가 되니 한 번에 나눌 수 있어요.\n\n예를 들어 $1\\frac{4}{5}\\div3$을 $1\\frac{4}{15}$로 계산하면 틀려요. $\\frac{9}{5}\\div3=\\frac{3}{5}$이 맞아요.',
    },
  ],

  mistakes: [
    '$5\\div8$을 $\\frac{8}{5}$로 쓰는 실수 — 나누어지는 수가 분자, 나누는 수가 분모예요. $5\\div8=\\frac{5}{8}$',
    '$\\frac{3}{4}\\div5$를 $\\frac{15}{4}$처럼 곱해 버리는 실수 — $\\div5$는 $\\times\\frac{1}{5}$이에요.',
    '대분수의 분수 부분만 나누는 실수 — $1\\frac{4}{5}\\div3$은 먼저 $\\frac{9}{5}$로 바꾸어 나눠요.',
  ],

  gens: [
    {
      id: 'nat-div-nat',
      level: 1,
      title: '(자연수)÷(자연수)의 몫을 분수로 나타내기',
      make: function (R) {
        var b = R.int(2, 12);
        var a = R.int(1, 20);
        while (a % b === 0) a = R.int(1, 20); // 나누어떨어지지 않게 (같은 수도 피한다)
        var q = Math.floor(a / b), r = a % b;
        var tail = q === 0
          ? '이므로 몫은 $\\frac{' + a + '}{' + b + '}$' + R.josa(a, '이에요/예요') + '.'
          : R.josa(a, '이에요/예요') + '. $' + a + '\\div' + b + '=' + q + '$ … 나머지 $' + r + '$, 남은 ' + r + R.josa(r, '을/를') + ' 다시 ' + b + R.josa(b, '으로/로') + ' 나누어 대분수로 나타내면 $' + q + '\\frac{' + r + '}{' + b + '}$' + R.josa(r, '이에요/예요') + '.';
        return {
          type: 'short', check: 'number', concept: a < b ? 0 : 1,
          q: '$' + a + '\\div' + b + '$의 몫을 분수로 나타내어 보세요.' + (a > b ? ' 가분수나 대분수로 써도 돼요.' : ''),
          answer: a + '/' + b,
          wrong: [{ a: b + '/' + a, why: '분자와 분모를 바꾸어 썼어요. 나누어지는 수 ' + a + R.josa(a, '이/가') + ' 분자, 나누는 수 ' + b + R.josa(b, '이/가') + ' 분모예요.' }],
          explain: '나누어지는 수를 분자, 나누는 수를 분모로 써요. $' + a + '\\div' + b + '=\\frac{' + a + '}{' + b + '}$' + tail,
        };
      },
    },
    {
      id: 'frac-div-nat-multiple',
      level: 1,
      title: '분자가 자연수의 배수인 (분수)÷(자연수)',
      make: function (R) {
        var k = R.int(2, 5);
        var m = R.int(1, 5);
        var n = m * k;
        var d = R.int(n + 1, n + 9);
        while (R.F(n, d).den !== d) d = R.int(n + 1, n + 9); // 나누어지는 분수는 기약분수로
        return {
          type: 'short', check: 'number', concept: 2,
          q: '계산해 보세요.\n\n$\\frac{' + n + '}{' + d + '}\\div' + k + '$',
          answer: m + '/' + d,
          wrong: [{ a: (n * k) + '/' + d, why: '분자에 ' + k + R.josa(k, '을/를') + ' 곱했어요. 나눗셈이니 분자 ' + n + R.josa(n, '을/를') + ' ' + k + R.josa(k, '으로/로') + ' 나누어요.' }],
          explain: '분자 ' + n + R.josa(n, '이/가') + ' ' + k + '의 배수이니 분모는 그대로 두고 분자를 나눠요. $\\frac{' + n + '}{' + d + '}\\div' + k + '=\\frac{' + n + '\\div' + k + '}{' + d + '}=\\frac{' + m + '}{' + d + '}$',
        };
      },
    },
    {
      id: 'frac-div-nat-times',
      level: 2,
      title: '(분수)÷(자연수)를 곱셈으로 계산하기',
      make: function (R) {
        var d = R.int(2, 9);
        var n = R.int(1, d - 1);
        while (R.F(n, d).den !== d) n = R.int(1, d - 1); // 나누어지는 분수는 기약분수로
        var k = R.int(2, 9);
        while (n % k === 0) k = R.int(2, 9); // 분자가 나누어떨어지지 않는 경우
        var correct = R.F(n, d * k);
        var tex = function (f) { return '$' + R.fmt.frac(f) + '$'; };
        var cands = [
          [R.F(n * k, d), '$\\div' + k + '$' + R.josa(k, '을/를') + ' $\\times' + k + '$' + R.josa(k, '으로/로') + ' 계산했어요. $\\div' + k + '$' + R.josa(k, '은/는') + ' $\\times\\frac{1}{' + k + '}$이에요.'],
          [R.F(n, d + k), '분모에 ' + k + R.josa(k, '을/를') + ' 더했어요. 분모에는 ' + k + R.josa(k, '을/를') + ' 곱해요.'],
          [R.F(d, n * k), '나누어지는 분수까지 뒤집었어요. 분수는 그대로 두고 $\\times\\frac{1}{' + k + '}$만 곱해요.'],
          [R.F(n, d), '분자와 분모에 모두 ' + k + R.josa(k, '을/를') + ' 곱했어요. 그러면 처음 분수와 크기가 같아져요.'],
          [R.F(d * k, n), '답을 뒤집어 썼어요. 분자는 그대로, 분모에 ' + k + R.josa(k, '을/를') + ' 곱해요.'],
        ];
        var reason = {};
        var wrongs = [];
        cands.forEach(function (c) {
          if (c[0].eq(correct)) return;
          var s = tex(c[0]);
          if (!(s in reason)) { reason[s] = c[1]; wrongs.push(s); }
        });
        var cs = tex(correct);
        var pick = R.choices(cs, wrongs);
        var raw = '\\frac{' + n + '}{' + (d * k) + '}';
        var reduced = R.fmt.frac(correct);
        var last = correct.num;
        return {
          type: 'choice', concept: 3,
          q: '$\\frac{' + n + '}{' + d + '}\\div' + k + '$의 값은 무엇일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === cs ? '' : reason[c] || ''; }),
          explain: '$\\div' + k + '$' + R.josa(k, '은/는') + ' $\\times\\frac{1}{' + k + '}$과 같아요. $\\frac{' + n + '}{' + d + '}\\div' + k + '=\\frac{' + n + '}{' + d + '}\\times\\frac{1}{' + k + '}=' + raw +
            (raw === reduced ? '' : '=' + reduced) + '$' + R.josa(last, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'mixed-div-nat',
      level: 2,
      title: '(대분수)÷(자연수)',
      make: function (R) {
        var w = R.int(1, 4);
        var d = R.int(2, 9);
        var n = R.int(1, d - 1);
        while (R.F(n, d).den !== d) n = R.int(1, d - 1);
        var k = R.int(2, 6);
        var P = w * d + n;
        var ans = R.F(P, d * k);
        var raw = P % k === 0
          ? '\\frac{' + P + '\\div' + k + '}{' + d + '}=\\frac{' + (P / k) + '}{' + d + '}'
          : '\\frac{' + P + '}{' + d + '}\\times\\frac{1}{' + k + '}=\\frac{' + P + '}{' + (d * k) + '}';
        var reduced = R.fmt.frac(ans);
        var shown = (P % k === 0 ? '\\frac{' + (P / k) + '}{' + d + '}' : '\\frac{' + P + '}{' + (d * k) + '}');
        var mixedNote = '';
        if (ans.num > ans.den) {
          var mx = ans.toMixed();
          mixedNote = ' 대분수로 나타내면 $' + R.fmt.frac(ans, { mixed: true }) + '$' + R.josa(mx.num, '이에요/예요') + '.';
        }
        var onlyFrac = R.F(w, 1).add(R.F(n, d * k));
        return {
          type: 'short', check: 'number', concept: 4,
          q: '계산해 보세요. 답은 가분수나 대분수로 써요.\n\n$' + w + '\\frac{' + n + '}{' + d + '}\\div' + k + '$',
          answer: ans.toString(),
          wrong: [
            { a: onlyFrac.toString(), why: '분수 부분만 ' + k + R.josa(k, '으로/로') + ' 나누었어요. 대분수를 가분수 $\\frac{' + P + '}{' + d + '}$' + R.josa(P, '으로/로') + ' 바꾼 뒤 나누어요.' },
            { a: R.F(P * k, d).toString(), why: k + R.josa(k, '을/를') + ' 곱했어요. 나눗셈이니 $\\times\\frac{1}{' + k + '}$' + R.josa(1, '을/를') + ' 해요.' },
          ],
          explain: '먼저 대분수를 가분수로 바꾸어요. $' + w + '\\frac{' + n + '}{' + d + '}=\\frac{' + P + '}{' + d + '}$\n\n' +
            '$\\frac{' + P + '}{' + d + '}\\div' + k + '=' + raw + (shown === reduced ? '' : '=' + reduced) + '$' + R.josa(ans.num, '이에요/예요') + '.' + mixedNote,
        };
      },
    },
    {
      id: 'wrong-calc-reverse',
      level: 3,
      title: '잘못 계산한 값에서 거꾸로 생각하기',
      make: function (R) {
        var d = R.int(2, 9);
        var a = R.int(1, d - 1);
        var k = R.int(2, 5);
        var x = R.F(a, d);          // 어떤 분수
        var X = x.mul(k);           // 잘못 곱한 값
        var ans = x.div(k);         // 바르게 나눈 값
        function readEnd(f) {       // 분수·대분수를 읽을 때 마지막 소리의 수
          if (f.isInt()) return f.num;
          return f.num > f.den ? f.toMixed().num : f.num;
        }
        var Xt = R.fmt.frac(X, { mixed: true });
        var xt = R.fmt.frac(x);
        return {
          type: 'short', check: 'number', concept: 3,
          q: '어떤 분수를 ' + k + R.josa(k, '으로/로') + ' 나누어야 할 것을 잘못하여 ' + k + R.josa(k, '을/를') + ' 곱했더니 $' + Xt + '$' + R.josa(readEnd(X), '이/가') + ' 되었어요. 바르게 계산한 값은 얼마일까요?',
          answer: ans.toString(),
          wrong: [
            { a: x.toString(), why: '$' + xt + '$' + R.josa(x.num, '은/는') + ' 어떤 분수예요. 이 분수를 ' + k + R.josa(k, '으로/로') + ' 나눈 값까지 구해야 해요.' },
            { a: X.mul(k).toString(), why: '잘못 계산한 값에 ' + k + R.josa(k, '을/를') + ' 또 곱했어요. 어떤 분수는 거꾸로 나누어서 구해요.' },
          ],
          explain: '어떤 분수에 ' + k + R.josa(k, '을/를') + ' 곱한 것이 $' + Xt + '$이므로 어떤 분수는 $' + Xt + '\\div' + k + '=' + xt + '$' + R.josa(x.num, '이에요/예요') + '.\n\n' +
            '바르게 계산하면 $' + xt + '\\div' + k + '=' + xt + '\\times\\frac{1}{' + k + '}=' + R.fmt.frac(ans) + '$' + R.josa(ans.num, '이에요/예요') + '.',
        };
      },
    },
  ],
});
