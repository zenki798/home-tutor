/* 5학년 수학 · 약분과 통분 */
Tutor.registerUnit({
  id: 'math-e5-04',
  course: 'math-e5',
  title: '약분과 통분',
  summary: '크기가 같은 분수를 만들어 약분과 통분을 하고, 분모가 다른 분수와 소수의 크기를 비교해요.',
  goals: [
    '크기가 같은 분수를 만들 수 있어요.',
    '분수를 약분하고 기약분수로 나타낼 수 있어요.',
    '분모가 다른 분수를 통분하여 크기를 비교할 수 있어요.',
    '분수를 소수로, 소수를 분수로 나타내어 크기를 비교할 수 있어요.',
  ],
  standards: ['[6수01-06]', '[6수01-07]', '[6수01-12]'],

  concepts: [
    {
      title: '크기가 같은 분수',
      body: '$\\frac{1}{2}$, $\\frac{2}{4}$, $\\frac{3}{6}$은 모양은 달라도 **크기가 같은 분수**예요. 막대를 2칸으로 나눈 것 중 1칸, 4칸으로 나눈 것 중 2칸, 6칸으로 나눈 것 중 3칸은 모두 같은 길이지요.\n\n크기가 같은 분수는 이렇게 만들어요.\n\n- 분모와 분자에 **0이 아닌 같은 수를 곱해요.** $\\frac{2}{3}=\\frac{2\\times2}{3\\times2}=\\frac{4}{6}$\n- 분모와 분자를 **0이 아닌 같은 수로 나눠요.** $\\frac{12}{16}=\\frac{12\\div4}{16\\div4}=\\frac{3}{4}$\n\n> ⚠️ 분모와 분자에 같은 수를 **더하거나 빼면** 크기가 달라져요. $\\frac{1}{2}$과 $\\frac{2}{3}$는 크기가 달라요.',
      easy: '피자 한 판을 2조각으로 잘라 1조각을 먹는 것과, 4조각으로 잘라 2조각을 먹는 것은 먹은 양이 같아요.\n\n조각을 2배로 잘게 자르면 조각 수(분모)도 2배, 먹은 조각 수(분자)도 2배가 되지요. 그래서 분모와 분자에 같은 수를 곱해도 크기는 그대로예요.',
      fig: { type: 'fraction', shape: 'bar', n: 2, d: 4, alt: '4칸 중 2칸을 색칠한 막대 — 2칸 중 1칸과 같은 길이' },
      check: {
        type: 'choice',
        q: '$\\frac{3}{5}$과 크기가 같은 분수는 무엇일까요?',
        choices: ['$\\frac{9}{15}$', '$\\frac{6}{8}$', '$\\frac{5}{7}$'],
        answer: 0,
        why: ['', '분모와 분자에 3을 더했어요. 더하면 크기가 달라져요. 같은 수를 곱해야 해요.', '분모와 분자에 2를 더했어요. 더하면 크기가 달라져요.'],
        explain: '분모와 분자에 3을 곱하면 $\\frac{3\\times3}{5\\times3}=\\frac{9}{15}$예요. 그래서 $\\frac{3}{5}$과 $\\frac{9}{15}$는 크기가 같아요.',
      },
    },
    {
      title: '약분과 기약분수',
      body: '분모와 분자를 **공약수로 나누어** 간단한 분수로 만드는 것을 **약분**한다고 해요.\n\n$\\frac{18}{24}$에서 18과 24의 공약수는 1, 2, 3, 6이에요. 1이 아닌 공약수로 나누면\n\n- 2로 나누면 $\\frac{9}{12}$\n- 3으로 나누면 $\\frac{6}{8}$\n- 6으로 나누면 $\\frac{3}{4}$\n\n$\\frac{3}{4}$처럼 분모와 분자의 공약수가 **1뿐인** 분수를 **기약분수**라고 해요. 더는 약분할 수 없는 가장 간단한 분수예요.\n\n> 💡 분모와 분자를 **최대공약수로** 나누면 한 번에 기약분수가 돼요. 18과 24의 최대공약수 6으로 나누면 바로 $\\frac{3}{4}$이에요.',
      easy: '약분은 "같은 크기를 더 간단한 이름으로 부르기"예요.\n\n$\\frac{18}{24}$은 24조각 중 18조각이에요. 조각을 6개씩 묶으면 4묶음 중 3묶음, 곧 $\\frac{3}{4}$이지요. 더 크게 묶을 수 없으면 기약분수예요.',
      check: {
        type: 'ox',
        q: '$\\frac{6}{9}$은 기약분수예요.',
        answer: false,
        explain: '6과 9의 공약수에는 1 말고 3도 있어요. 3으로 약분하면 $\\frac{2}{3}$가 되니 $\\frac{6}{9}$은 기약분수가 아니에요.',
      },
    },
    {
      title: '통분과 공통분모',
      body: '분모가 다른 분수들의 분모를 같게 만드는 것을 **통분**한다고 하고, 같게 만든 분모를 **공통분모**라고 해요. 공통분모는 두 분모의 공배수예요.\n\n$\\frac{3}{4}$과 $\\frac{5}{6}$를 통분해 볼까요?\n\n| 방법 | 공통분모 | 결과 |\n|---|---|---|\n| 두 분모의 곱 | $4\\times6=24$ | $\\frac{18}{24}$, $\\frac{20}{24}$ |\n| 두 분모의 최소공배수 | 12 | $\\frac{9}{12}$, $\\frac{10}{12}$ |\n\n두 방법 모두 맞아요. 두 분모의 곱은 찾기 쉽고, 최소공배수를 쓰면 수가 작아서 계산이 간단해요.\n\n> ⚠️ 분모에 곱한 수만큼 분자에도 꼭 곱해요. $\\frac{3}{4}=\\frac{3\\times3}{4\\times3}=\\frac{9}{12}$',
      easy: '4칸 막대와 6칸 막대는 칸의 크기가 달라서 바로 비교하기 어려워요. 두 막대를 모두 12칸으로 다시 나누면 칸의 크기가 같아져요.\n\n4칸 막대는 한 칸을 3개로, 6칸 막대는 한 칸을 2개로 나누면 둘 다 12칸이 되지요. 이것이 통분이에요.',
      check: {
        type: 'short', check: 'number',
        q: '$\\frac{1}{4}$과 $\\frac{1}{6}$을 두 분모의 최소공배수를 공통분모로 하여 통분하려고 해요. 공통분모는 얼마일까요?',
        answer: '12',
        wrong: [
          { a: '24', why: '24는 두 분모의 곱이에요. 24도 공통분모가 될 수 있지만, 최소공배수는 12예요.' },
          { a: '10', why: '두 분모를 더했어요. 공통분모는 두 분모의 공배수여야 해요.' },
        ],
        explain: '4의 배수는 4, 8, 12, …이고 6의 배수는 6, 12, …이므로 최소공배수는 12예요. $\\frac{1}{4}=\\frac{3}{12}$, $\\frac{1}{6}=\\frac{2}{12}$로 통분할 수 있어요.',
      },
    },
    {
      title: '분모가 다른 분수의 크기 비교',
      body: '분모가 다르면 조각의 크기가 달라서 분자끼리 바로 비교할 수 없어요. **통분한 뒤 분자를 비교**해요.\n\n$\\frac{2}{3}$와 $\\frac{3}{5}$ → $\\frac{10}{15}$과 $\\frac{9}{15}$ → $10>9$이므로 $\\frac{2}{3}>\\frac{3}{5}$\n\n세 분수는 **두 개씩** 차례로 비교하거나, 셋을 한꺼번에 통분해서 비교해요.\n\n> 💡 분자가 같으면 분모가 작을수록 큰 분수예요. $\\frac{3}{7}>\\frac{3}{8}$ (조각이 클수록 같은 개수의 양이 많아요.)',
      easy: '길이가 같은 두 막대가 있어요. 하나는 3칸, 하나는 5칸으로 나누어져 있어 칸의 크기가 달라요.\n\n둘 다 15칸으로 다시 나누면 $\\frac{2}{3}$는 10칸, $\\frac{3}{5}$은 9칸이 돼요. 칸의 크기가 같아졌으니 칸 수가 많은 $\\frac{2}{3}$가 더 커요.',
      check: {
        type: 'choice', fixed: true,
        q: '두 분수의 크기를 바르게 비교한 것은 무엇일까요?',
        choices: ['$\\frac{3}{4}>\\frac{5}{7}$', '$\\frac{3}{4}=\\frac{5}{7}$', '$\\frac{3}{4}<\\frac{5}{7}$'],
        answer: 0,
        why: ['', '통분하면 $\\frac{21}{28}$과 $\\frac{20}{28}$으로 분자가 달라요.', '분자 3과 5만 비교했어요. 분모가 다르면 통분한 뒤 비교해요.'],
        explain: '28로 통분하면 $\\frac{3}{4}=\\frac{21}{28}$, $\\frac{5}{7}=\\frac{20}{28}$이에요. $21>20$이므로 $\\frac{3}{4}>\\frac{5}{7}$예요.',
      },
    },
    {
      title: '분수를 소수로, 소수를 분수로',
      body: '소수 한 자리 수는 분모가 10인 분수, 두 자리 수는 분모가 100인 분수, 세 자리 수는 분모가 1000인 분수로 나타낼 수 있어요.\n\n$0.7=\\frac{7}{10}$, $0.35=\\frac{35}{100}$, $0.125=\\frac{125}{1000}$\n\n**분수를 소수로** 나타낼 때는 크기가 같은 분수 가운데 분모가 10, 100, 1000인 분수를 찾아요.\n\n- $\\frac{3}{5}=\\frac{6}{10}=0.6$\n- $\\frac{3}{4}=\\frac{75}{100}=0.75$\n- $\\frac{3}{8}=\\frac{375}{1000}=0.375$\n\n**소수를 분수로** 나타낸 뒤에는 약분해서 기약분수로 나타낼 수 있어요. $0.35=\\frac{35}{100}=\\frac{7}{20}$',
      easy: '1을 100원이라고 생각해 보세요. 0.01은 1원, 0.1은 10원이에요.\n\n100원을 4명이 똑같이 나누면 한 명이 25원이니, $\\frac{3}{4}$은 3명 몫인 75원이에요. 100원 중 75원은 $\\frac{75}{100}$, 곧 0.75예요.',
      check: {
        type: 'choice',
        q: '$\\frac{2}{5}$를 소수로 나타낸 것은 무엇일까요?',
        choices: ['0.4', '0.25', '2.5'],
        answer: 0,
        why: ['', '분자 2와 분모 5를 이어 쓴 것 같아요. 분모를 10으로 만들어 보세요: $\\frac{2}{5}=\\frac{4}{10}$', '$5\\div2$를 생각했어요. $\\frac{2}{5}$는 1보다 작은 수예요.'],
        explain: '분모와 분자에 2를 곱하면 $\\frac{2}{5}=\\frac{4}{10}$이고, 이것은 0.4예요.',
      },
    },
    {
      title: '분수와 소수의 크기 비교',
      body: '분수와 소수를 비교할 때는 **둘 중 하나로 맞춰서** 비교해요.\n\n$\\frac{3}{4}$과 0.7을 비교해 볼까요?\n\n- 분수를 소수로: $\\frac{3}{4}=0.75$이고 $0.75>0.7$\n- 소수를 분수로: $0.7=\\frac{7}{10}$이고, 20으로 통분하면 $\\frac{15}{20}>\\frac{14}{20}$\n\n어느 방법이든 $\\frac{3}{4}>0.7$이에요. 분모를 10, 100, 1000으로 쉽게 바꿀 수 있으면 소수로, 그렇지 않으면 분수로 맞추는 것이 편해요.',
      easy: '키를 비교할 때 한 사람은 cm로, 한 사람은 m로 말하면 바로 비교하기 어렵지요? 단위를 하나로 맞추면 쉬워요.\n\n분수와 소수도 같아요. 둘 다 소수로, 또는 둘 다 분수로 "같은 말"로 바꾼 뒤 비교해요.',
      check: {
        type: 'ox',
        q: '0.6과 $\\frac{3}{5}$은 크기가 같아요.',
        answer: true,
        explain: '$\\frac{3}{5}=\\frac{6}{10}=0.6$이므로 두 수는 크기가 같아요.',
      },
    },
  ],

  examples: [
    {
      q: '$\\frac{24}{36}$를 기약분수로 나타내세요.',
      steps: [
        '24와 36의 최대공약수를 구해요. 24의 약수는 1, 2, 3, 4, 6, 8, 12, 24이고 36의 약수는 1, 2, 3, 4, 6, 9, 12, 18, 36이므로 최대공약수는 12예요.',
        '분모와 분자를 12로 나눠요. $\\frac{24\\div12}{36\\div12}=\\frac{2}{3}$',
        '2와 3의 공약수는 1뿐이므로 $\\frac{2}{3}$는 기약분수예요.',
      ],
      answer: '$\\frac{2}{3}$',
    },
    {
      q: '$\\frac{5}{6}$, $\\frac{7}{9}$, 0.8을 큰 수부터 차례대로 쓰세요.',
      steps: [
        '0.8을 분수로 나타내면 $\\frac{8}{10}=\\frac{4}{5}$예요. ($\\frac{5}{6}$, $\\frac{7}{9}$은 분모를 10, 100, 1000으로 바꾸기 어려우니 분수로 맞춰요.)',
        '$\\frac{5}{6}$와 $\\frac{7}{9}$: 18로 통분하면 $\\frac{15}{18}>\\frac{14}{18}$이므로 $\\frac{5}{6}>\\frac{7}{9}$',
        '$\\frac{4}{5}$와 $\\frac{7}{9}$: 45로 통분하면 $\\frac{36}{45}>\\frac{35}{45}$이므로 $0.8>\\frac{7}{9}$',
        '$\\frac{5}{6}$와 $\\frac{4}{5}$: 30으로 통분하면 $\\frac{25}{30}>\\frac{24}{30}$이므로 $\\frac{5}{6}>0.8$',
      ],
      answer: '$\\frac{5}{6}$, 0.8, $\\frac{7}{9}$',
    },
  ],

  terms: [
    { term: '크기가 같은 분수', def: '모양은 달라도 나타내는 크기가 같은 분수예요. 예: $\\frac{1}{2}=\\frac{2}{4}=\\frac{3}{6}$' },
    { term: '약분', def: '분모와 분자를 공약수로 나누어 간단한 분수로 만드는 것이에요. 예: $\\frac{6}{8}=\\frac{3}{4}$' },
    { term: '기약분수', def: '분모와 분자의 공약수가 1뿐인 분수예요. 더 약분할 수 없어요. 예: $\\frac{3}{4}$, $\\frac{5}{7}$' },
    { term: '통분', def: '분모가 다른 분수들의 분모를 같게 만드는 것이에요. 예: $\\frac{1}{2}$, $\\frac{1}{3}$ → $\\frac{3}{6}$, $\\frac{2}{6}$' },
    { term: '공통분모', def: '통분하여 같게 만든 분모예요. 두 분모의 공배수이고, 흔히 두 분모의 곱이나 최소공배수를 써요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
      q: '$\\square$ 안에 알맞은 수를 구하세요.\n\n$\\frac{2}{3}=\\frac{\\square}{12}$',
      answer: '8',
      wrong: [{ a: '11', why: '분모에 9를 더했다고 분자에도 9를 더했어요. 분모에 4를 곱했으니 분자에도 4를 곱해요.' }],
      explain: '분모 3에 4를 곱하면 12이므로 분자 2에도 4를 곱해요. $\\frac{2\\times4}{3\\times4}=\\frac{8}{12}$',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '$\\frac{12}{18}$를 약분한 분수가 **아닌** 것은 무엇일까요?',
      choices: ['$\\frac{4}{9}$', '$\\frac{6}{9}$', '$\\frac{4}{6}$', '$\\frac{2}{3}$'],
      answer: 0,
      why: [
        '',
        '분모와 분자를 2로 나눈 것이니 약분한 분수가 맞아요.',
        '분모와 분자를 3으로 나눈 것이니 약분한 분수가 맞아요.',
        '분모와 분자를 6으로 나눈 것이니 약분한 분수가 맞아요.',
      ],
      explain: '12와 18의 공약수 2, 3, 6으로 나누면 $\\frac{6}{9}$, $\\frac{4}{6}$, $\\frac{2}{3}$예요. $\\frac{4}{9}$는 분자는 3으로, 분모는 2로 나눈 것이라 크기가 달라요.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 1,
      q: '$\\frac{7}{10}$은 기약분수예요.',
      answer: true,
      explain: '7의 약수는 1, 7이고 10의 약수는 1, 2, 5, 10이에요. 공약수가 1뿐이므로 $\\frac{7}{10}$은 기약분수예요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', concept: 1,
      q: '$\\frac{16}{24}$을 한 번에 기약분수로 만들려면 분모와 분자를 어떤 수로 나누어야 할까요?',
      answer: '8',
      wrong: [
        { a: '2', why: '2로 나누면 $\\frac{8}{12}$로 아직 더 약분할 수 있어요. 최대공약수로 나누어야 한 번에 기약분수가 돼요.' },
        { a: '4', why: '4로 나누면 $\\frac{4}{6}$로 아직 더 약분할 수 있어요. 최대공약수로 나누어야 해요.' },
      ],
      explain: '16과 24의 최대공약수는 8이에요. 8로 나누면 $\\frac{16\\div8}{24\\div8}=\\frac{2}{3}$로 한 번에 기약분수가 돼요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 1,
      q: '다음 가운데 기약분수는 무엇일까요?',
      choices: ['$\\frac{5}{8}$', '$\\frac{6}{8}$', '$\\frac{9}{15}$', '$\\frac{4}{14}$'],
      answer: 0,
      why: [
        '',
        '6과 8은 2로 약분할 수 있어요. $\\frac{3}{4}$이 돼요.',
        '9와 15는 3으로 약분할 수 있어요. $\\frac{3}{5}$이 돼요.',
        '4와 14는 2로 약분할 수 있어요. $\\frac{2}{7}$가 돼요.',
      ],
      explain: '5와 8의 공약수는 1뿐이라서 $\\frac{5}{8}$는 기약분수예요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 2,
      q: '$\\frac{5}{6}$와 $\\frac{3}{4}$을 두 분모의 최소공배수를 공통분모로 하여 바르게 통분한 것은 무엇일까요?',
      choices: ['$\\frac{10}{12}$, $\\frac{9}{12}$', '$\\frac{5}{12}$, $\\frac{3}{12}$', '$\\frac{10}{12}$, $\\frac{6}{12}$', '$\\frac{11}{12}$, $\\frac{11}{12}$'],
      answer: 0,
      why: [
        '',
        '분모만 바꾸고 분자는 그대로 두었어요. 분모에 곱한 수만큼 분자에도 곱해요.',
        '$\\frac{3}{4}$의 분자에 2를 곱했어요. 분모 4에는 3을 곱했으니 분자에도 3을 곱해요.',
        '분모가 늘어난 만큼 분자에 더했어요. 더하지 말고 곱해야 해요.',
      ],
      explain: '6과 4의 최소공배수는 12예요. $\\frac{5}{6}=\\frac{5\\times2}{6\\times2}=\\frac{10}{12}$, $\\frac{3}{4}=\\frac{3\\times3}{4\\times3}=\\frac{9}{12}$예요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', fixed: true, concept: 3,
      q: '○ 안에 $>$, $=$, $<$ 중 알맞은 것을 고르세요.\n\n$\\frac{2}{3}$ ○ $\\frac{3}{5}$',
      choices: ['$>$', '$=$', '$<$'],
      answer: 0,
      why: ['', '통분하면 $\\frac{10}{15}$과 $\\frac{9}{15}$로 분자가 달라요.', '분자 2와 3만 비교했어요. 분모가 다르면 통분한 뒤 비교해요.'],
      explain: '15로 통분하면 $\\frac{2}{3}=\\frac{10}{15}$, $\\frac{3}{5}=\\frac{9}{15}$예요. $10>9$이므로 $\\frac{2}{3}>\\frac{3}{5}$이에요.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 4,
      q: '0.45를 기약분수로 나타낸 것은 무엇일까요?',
      choices: ['$\\frac{9}{20}$', '$\\frac{45}{10}$', '$\\frac{45}{1000}$', '$\\frac{9}{25}$'],
      answer: 0,
      why: [
        '',
        '소수 두 자리 수는 분모가 100인 분수예요. $\\frac{45}{10}$는 4.5예요.',
        '소수 두 자리 수는 분모가 100인 분수예요. $\\frac{45}{1000}$는 0.045예요.',
        '분자는 5로, 분모는 4로 나누었어요. 분모와 분자를 같은 수로 나누어야 해요.',
      ],
      explain: '$0.45=\\frac{45}{100}$예요. 45와 100의 최대공약수 5로 나누면 $\\frac{9}{20}$예요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: '$\\frac{7}{25}$을 소수로 나타낸 것은 무엇일까요?',
      choices: ['0.28', '0.7', '0.725', '2.8'],
      answer: 0,
      hint: '분모를 100으로 만들어 보세요.',
      why: [
        '',
        '분자 7만 보고 0.7이라고 했어요. 분모가 10일 때만 0.7이에요.',
        '분자와 분모를 이어 썼어요. 분모를 100으로 만들어 보세요.',
        '분모를 10으로 보았어요. $\\frac{28}{100}$은 소수 두 자리 수예요.',
      ],
      explain: '분모와 분자에 4를 곱하면 $\\frac{7}{25}=\\frac{28}{100}$이고, 이것은 0.28이에요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 5,
      q: '가장 큰 수는 무엇일까요?',
      choices: ['$\\frac{4}{5}$', '0.75', '$\\frac{7}{10}$', '0.79'],
      answer: 0,
      hint: '분수를 모두 소수로 바꾸어 비교해 보세요.',
      why: [
        '',
        '0.75는 $\\frac{4}{5}=0.8$보다 작아요.',
        '$\\frac{7}{10}=0.7$이라서 가장 작아요.',
        '0.79는 $\\frac{4}{5}=0.8$보다 0.01 작아요.',
      ],
      explain: '$\\frac{4}{5}=\\frac{8}{10}=0.8$, $\\frac{7}{10}=0.7$이에요. 0.8, 0.75, 0.7, 0.79 가운데 가장 큰 수는 0.8, 곧 $\\frac{4}{5}$예요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'text', concept: 3,
      q: '민수는 우유를 $\\frac{3}{4}$ L, 지아는 $\\frac{5}{6}$ L 마셨어요. 우유를 더 많이 마신 사람은 누구일까요?',
      answer: ['지아', '지아가'],
      hint: '두 분수를 통분해서 비교해요.',
      wrong: [{ a: '민수', why: '분모가 작은 $\\frac{3}{4}$이 크다고 생각했어요. 분자가 다르니 통분해서 비교해요: $\\frac{9}{12}<\\frac{10}{12}$' }],
      explain: '12로 통분하면 $\\frac{3}{4}=\\frac{9}{12}$, $\\frac{5}{6}=\\frac{10}{12}$이에요. $9<10$이므로 지아가 더 많이 마셨어요.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '분모가 7인 진분수 가운데 $\\frac{1}{2}$보다 큰 분수는 모두 몇 개일까요?',
      answer: '3',
      hint: '14로 통분해서 비교해 보세요.',
      wrong: [{ a: '4', why: '$\\frac{3}{7}$도 넣었어요. $\\frac{3}{7}=\\frac{6}{14}$은 $\\frac{1}{2}=\\frac{7}{14}$보다 작아요.' }],
      explain: '$\\frac{1}{2}=\\frac{7}{14}$이고 $\\frac{\\square}{7}=\\frac{\\square\\times2}{14}$예요. $\\square\\times2$가 7보다 커야 하니 $\\square$는 4, 5, 6이에요. 그래서 $\\frac{4}{7}$, $\\frac{5}{7}$, $\\frac{6}{7}$으로 3개예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 1,
      q: '분모와 분자의 합이 40이고, 기약분수로 나타내면 $\\frac{3}{5}$이 되는 분수가 있어요. 이 분수의 분자를 구하세요.',
      answer: '15',
      hint: '$\\frac{3}{5}$과 크기가 같은 분수를 차례대로 써 보며 분모와 분자의 합을 살펴보세요.',
      wrong: [{ a: '25', why: '분모를 구했어요. 문제는 분자를 물어요.' }, { a: '3', why: '기약분수의 분자예요. 분모와 분자의 합이 40인 분수의 분자를 구해요.' }],
      explain: '$\\frac{3}{5}$과 크기가 같은 분수는 $\\frac{6}{10}$, $\\frac{9}{15}$, $\\frac{12}{20}$, $\\frac{15}{25}$, …이고, 분모와 분자의 합은 8, 16, 24, 32, 40, …으로 8씩 커져요. 합이 40인 분수는 $\\frac{15}{25}$이므로 분자는 15예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', concept: 3,
      q: '$\\square$ 안에 들어갈 수 있는 자연수를 구하세요.\n\n$\\frac{1}{2}<\\frac{\\square}{8}<\\frac{3}{4}$',
      answer: '5',
      hint: '세 분수를 분모 8로 통분해 보세요.',
      wrong: [{ a: '6', why: '$\\frac{6}{8}=\\frac{3}{4}$이라서 $\\frac{3}{4}$보다 작지 않아요.' }, { a: '4', why: '$\\frac{4}{8}=\\frac{1}{2}$이라서 $\\frac{1}{2}$보다 크지 않아요.' }],
      explain: '분모 8로 통분하면 $\\frac{4}{8}<\\frac{\\square}{8}<\\frac{6}{8}$이에요. 그래서 $\\square$는 4보다 크고 6보다 작은 5예요.',
    },
    {
      id: 'a3', level: 3, type: 'order', concept: 5,
      q: '큰 수부터 차례대로 놓으세요.',
      choices: ['$\\frac{3}{4}$', '0.7', '$\\frac{5}{8}$'],
      answer: [0, 1, 2],
      hint: '분수를 소수로 바꾸어 보세요. 분모를 100이나 1000으로 만들 수 있어요.',
      explain: '$\\frac{3}{4}=\\frac{75}{100}=0.75$, $\\frac{5}{8}=\\frac{625}{1000}=0.625$예요. $0.75>0.7>0.625$이므로 $\\frac{3}{4}$, 0.7, $\\frac{5}{8}$ 순서예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: '개', concept: 2,
      q: '$\\frac{5}{12}$와 $\\frac{7}{18}$을 통분할 때, 공통분모가 될 수 있는 수 가운데 100보다 작은 수는 모두 몇 개일까요?',
      answer: '2',
      hint: '공통분모는 두 분모의 공배수예요. 먼저 최소공배수를 구해요.',
      wrong: [{ a: '36', why: '36은 최소공배수예요. 100보다 작은 공배수의 개수를 물어요.' }, { a: '1', why: '최소공배수 36만 세었어요. 36의 배수 72도 공통분모가 될 수 있어요.' }],
      explain: '12와 18의 최소공배수는 36이에요. 공통분모가 될 수 있는 수는 공배수 36, 72, 108, …이므로 100보다 작은 수는 36, 72로 2개예요.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'number', concept: 0,
      q: '$\\frac{2}{7}$와 크기가 같은 분수 가운데, 분모와 분자의 차가 25인 분수의 분모를 구하세요.',
      answer: '35',
      hint: '분모와 분자에 같은 수를 곱하면 차도 그 수만큼 배가 돼요.',
      wrong: [{ a: '10', why: '분자를 구했어요. 문제는 분모를 물어요.' }],
      explain: '$\\frac{2}{7}$의 분모와 분자의 차는 5예요. 분모와 분자에 같은 수를 곱하면 차도 그 수의 배가 되므로, 차가 25가 되려면 5를 곱해요. $\\frac{2\\times5}{7\\times5}=\\frac{10}{35}$이므로 분모는 35예요.',
    },
  ],

  deeper: [
    {
      title: '모든 분수를 소수로 바꿀 수 있을까?',
      body: '$\\frac{3}{4}$, $\\frac{3}{8}$처럼 분모를 10, 100, 1000으로 바꿀 수 있는 분수는 소수로 쉽게 나타낼 수 있어요. 이런 분수는 기약분수로 나타냈을 때 분모가 2와 5만 곱해서 만들어진 수(2, 4, 5, 8, 10, 20, 25, …)예요.\n\n그런데 $\\frac{1}{3}$은 어떨까요? 3에 무엇을 곱해도 10, 100, 1000이 되지 않아요. 6학년에서 분수를 나눗셈으로 보는 방법($\\frac{1}{3}=1\\div3$)을 배우고, 중학교 2학년에서는 $0.333\\cdots$처럼 끝없이 이어지는 소수를 배워요.',
    },
    {
      title: '통분은 왜 필요할까?',
      body: '다음 단원에서는 $\\frac{1}{2}+\\frac{1}{3}$처럼 분모가 다른 분수를 더하고 빼요. 분모가 다르면 조각의 크기가 달라서 분자끼리 바로 더할 수 없지요. 통분해서 $\\frac{3}{6}+\\frac{2}{6}=\\frac{5}{6}$처럼 조각의 크기를 맞춘 뒤 더해요.\n\n최소공배수로 통분하면 수가 작아져서 계산도 약분도 쉬워요. 오늘 배운 약분과 통분이 바로 그 준비예요.',
    },
  ],

  faq: [
    {
      q: '약분은 꼭 최대공약수로 해야 해요?',
      a: '아니에요. 공약수라면 어떤 수로 나누어도 약분이에요. $\\frac{18}{24}$을 2로 나누고, 다시 3으로 나누어도 $\\frac{3}{4}$이 돼요. 다만 최대공약수로 나누면 **한 번에** 기약분수가 되어 편해요.',
    },
    {
      q: '공통분모는 두 분모를 곱하면 안 돼요?',
      a: '돼요. 두 분모의 곱은 언제나 공배수라서 공통분모가 될 수 있어요. 다만 최소공배수를 쓰면 수가 작아서 계산이 간단해요. $\\frac{3}{4}$과 $\\frac{5}{6}$는 24보다 12로 통분하는 것이 편해요.',
    },
    {
      q: '분모끼리 비교하면 안 돼요? 분모가 작으면 큰 거 아니에요?',
      a: '분자가 같을 때만 그래요. $\\frac{3}{7}>\\frac{3}{8}$은 맞지만, $\\frac{2}{3}$와 $\\frac{3}{5}$처럼 분자가 다르면 분모만 보고 알 수 없어요. 통분해서 분자를 비교해요.',
    },
  ],

  mistakes: [
    '분모와 분자에 같은 수를 더해서 크기가 같은 분수를 만드는 실수 — $\\frac{1}{2}$과 $\\frac{2}{3}$는 크기가 달라요. 곱하거나 나눠야 해요.',
    '통분할 때 분모에만 곱하고 분자에는 곱하지 않는 실수 — $\\frac{3}{4}=\\frac{9}{12}$예요($\\frac{3}{12}$이 아니에요).',
    '약분을 끝까지 하지 않고 기약분수라고 하는 실수 — $\\frac{8}{12}$은 4로 한 번 더 약분하면 $\\frac{2}{3}$예요.',
  ],

  gens: [
    {
      id: 'equiv-fill',
      level: 1,
      title: '크기가 같은 분수 만들기',
      make: function (R) {
        function gcd(x, y) { while (y) { var t = x % y; x = y; y = t; } return x; }
        var b, a;
        do { b = R.int(2, 9); a = R.int(1, b - 1); } while (gcd(a, b) !== 1);
        var k = R.int(2, 9);
        var t = R.int(0, 2);
        var fr = function (x, y) { return '\\frac{' + x + '}{' + y + '}'; };
        var q, ans, wrong = [], explain;
        if (t === 0) {
          q = '$' + fr(a, b) + '=' + fr('\\square', b * k) + '$';
          ans = a * k;
          wrong.push({ a: String(a + (b * k - b)), why: '분모가 ' + (b * k - b) + ' 커졌다고 분자에도 ' + (b * k - b) + R.josa(b * k - b, '을/를') + ' 더했어요. 분모에 ' + k + R.josa(k, '을/를') + ' 곱했으니 분자에도 ' + k + R.josa(k, '을/를') + ' 곱해요.' });
          explain = '분모 ' + b + '에 ' + k + R.josa(k, '을/를') + ' 곱해서 ' + (b * k) + R.josa(b * k, '이/가') + ' 되었으니 분자에도 ' + k + R.josa(k, '을/를') + ' 곱해요. $' + fr(a + '\\times' + k, b + '\\times' + k) + '=' + fr(ans, b * k) + '$';
        } else if (t === 1) {
          q = '$' + fr(a, b) + '=' + fr(a * k, '\\square') + '$';
          ans = b * k;
          wrong.push({ a: String(b + (a * k - a)), why: '분자가 ' + (a * k - a) + ' 커졌다고 분모에도 ' + (a * k - a) + R.josa(a * k - a, '을/를') + ' 더했어요. 분자에 ' + k + R.josa(k, '을/를') + ' 곱했으니 분모에도 ' + k + R.josa(k, '을/를') + ' 곱해요.' });
          explain = '분자 ' + a + '에 ' + k + R.josa(k, '을/를') + ' 곱해서 ' + (a * k) + R.josa(a * k, '이/가') + ' 되었으니 분모에도 ' + k + R.josa(k, '을/를') + ' 곱해요. $' + fr(a + '\\times' + k, b + '\\times' + k) + '=' + fr(a * k, ans) + '$';
        } else {
          q = '$' + fr(a * k, b * k) + '=' + fr('\\square', b) + '$';
          ans = a;
          var w = a * k - (b * k - b);
          if (w > 0) wrong.push({ a: String(w), why: '분모에서 ' + (b * k - b) + R.josa(b * k - b, '을/를') + ' 뺐다고 분자에서도 ' + (b * k - b) + R.josa(b * k - b, '을/를') + ' 뺐어요. 분모를 ' + k + R.josa(k, '으로/로') + ' 나누었으니 분자도 ' + k + R.josa(k, '으로/로') + ' 나눠요.' });
          explain = '분모 ' + (b * k) + R.josa(b * k, '을/를') + ' ' + k + R.josa(k, '으로/로') + ' 나누어 ' + b + R.josa(b, '이/가') + ' 되었으니 분자도 ' + k + R.josa(k, '으로/로') + ' 나눠요. $' + fr((a * k) + '\\div' + k, (b * k) + '\\div' + k) + '=' + fr(a, b) + '$';
        }
        return {
          type: 'short', check: 'number', concept: 0,
          q: '$\\square$ 안에 알맞은 수를 구하세요.\n\n' + q,
          answer: String(ans),
          wrong: wrong.filter(function (x) { return x.a !== String(ans); }),
          explain: explain,
        };
      },
    },
    {
      id: 'irreducible',
      level: 1,
      title: '약분과 기약분수',
      make: function (R) {
        function gcd(x, y) { while (y) { var t = x % y; x = y; y = t; } return x; }
        var fr = function (x, y) { return '$\\frac{' + x + '}{' + y + '}$'; };
        var a, b, g, n, d, reason = {}, cands = [], seenVal = {};
        function addCand(x, y, why) {
          if (!(x >= 1) || x >= y) return;
          var G = gcd(x, y), key = (x / G) + '/' + (y / G);
          if (key === (a + '/' + b) || seenVal[key]) return;
          seenVal[key] = 1;
          var s = fr(x, y);
          reason[s] = why;
          cands.push(s);
        }
        do { b = R.int(3, 12); a = R.int(1, b - 1); } while (gcd(a, b) !== 1);
        var correct = fr(a, b);
        if (R.bool()) {
          // 기약분수 고르기: 오답은 약분할 수 있는 분수
          for (var tries = 0; tries < 80 && cands.length < 6; tries++) {
            var q = R.int(2, 7), p = R.int(1, q - 1), h = R.int(2, 5);
            var x = p * h, y = q * h, G = gcd(x, y);
            addCand(x, y, x + R.josa(x, '과/와') + ' ' + y + '의 공약수에 ' + G + R.josa(G, '이/가') + ' 있어서 약분할 수 있어요. ' + G + R.josa(G, '으로/로') + ' 나누면 $\\frac{' + (x / G) + '}{' + (y / G) + '}$' + R.josa(x / G, '이/가') + ' 돼요.');
          }
          var pick = R.choices(correct, cands);
          return {
            type: 'choice', concept: 1,
            q: '다음 가운데 기약분수는 무엇일까요?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: a + R.josa(a, '과/와') + ' ' + b + '의 공약수는 1뿐이라서 ' + correct + R.josa(a, '은/는') + ' 기약분수예요. 다른 분수는 1이 아닌 공약수로 약분할 수 있어요.',
          };
        }
        // 기약분수로 나타내기: 분모와 분자를 최대공약수로 나눈다
        do { g = R.int(2, 9); } while (b * g > 60);
        n = a * g; d = b * g;
        addCand(a, d, '분자만 ' + g + R.josa(g, '으로/로') + ' 나누었어요. 분모도 같은 수로 나누어야 해요.');
        for (var h2 = 2; h2 < d; h2++) {
          if (h2 !== g && d % h2 === 0) addCand(a, d / h2, '분자는 ' + g + R.josa(g, '으로/로') + ', 분모는 ' + h2 + R.josa(h2, '으로/로') + ' 나누었어요. 분모와 분자를 같은 수로 나누어야 해요.');
          if (h2 !== g && n % h2 === 0) addCand(n / h2, b, '분자는 ' + h2 + R.josa(h2, '으로/로') + ', 분모는 ' + g + R.josa(g, '으로/로') + ' 나누었어요. 분모와 분자를 같은 수로 나누어야 해요.');
        }
        addCand(a + 1, b + 1, '분모와 분자에 1씩 더했어요. 약분은 분모와 분자를 같은 수로 나누는 것이에요.');
        addCand(a, b + 1, '분모를 다시 확인해 보세요. $' + d + '\\div' + g + '=' + b + '$' + R.josa(b, '이에요/예요') + '.');
        addCand(a + 1, b, '분자를 다시 확인해 보세요. $' + n + '\\div' + g + '=' + a + '$' + R.josa(a, '이에요/예요') + '.');
        var pick2 = R.choices(correct, R.shuffle(cands));
        return {
          type: 'choice', concept: 1,
          q: '$\\frac{' + n + '}{' + d + '}$' + R.josa(n, '을/를') + ' 기약분수로 나타낸 것은 무엇일까요?',
          choices: pick2.choices,
          answer: pick2.answer,
          why: pick2.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          hint: '분모와 분자의 최대공약수를 구해 보세요.',
          explain: n + R.josa(n, '과/와') + ' ' + d + '의 최대공약수는 ' + g + R.josa(g, '이에요/예요') + '. 분모와 분자를 ' + g + R.josa(g, '으로/로') + ' 나누면 $\\frac{' + n + '\\div' + g + '}{' + d + '\\div' + g + '}=\\frac{' + a + '}{' + b + '}$' + R.josa(a, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'common-den',
      level: 2,
      title: '최소공배수로 통분하기',
      make: function (R) {
        function gcd(x, y) { while (y) { var t = x % y; x = y; y = t; } return x; }
        var b, d, L, tries = 0;
        do { b = R.int(2, 12); d = R.int(2, 12); L = b * d / gcd(b, d); tries++; } while ((b === d || L > 72 || b % d === 0 || d % b === 0) && tries < 200);
        var a, c;
        do { a = R.int(1, b - 1); } while (gcd(a, b) !== 1);
        do { c = R.int(1, d - 1); } while (gcd(c, d) !== 1);
        var A = a * (L / b), C = c * (L / d);
        var head = '$\\frac{' + a + '}{' + b + '}$' + R.josa(a, '과/와') + ' $\\frac{' + c + '}{' + d + '}$' + R.josa(c, '을/를') + ' 두 분모의 최소공배수를 공통분모로 하여 통분하려고 해요.';
        var how = b + R.josa(b, '과/와') + ' ' + d + '의 최소공배수는 ' + L + R.josa(L, '이에요/예요') + '.\n\n$\\frac{' + a + '}{' + b + '}=\\frac{' + a + '\\times' + (L / b) + '}{' + b + '\\times' + (L / b) + '}=\\frac{' + A + '}{' + L + '}$\n\n$\\frac{' + c + '}{' + d + '}=\\frac{' + c + '\\times' + (L / d) + '}{' + d + '\\times' + (L / d) + '}=\\frac{' + C + '}{' + L + '}$';
        var t = R.int(0, 2);
        if (t === 0) {
          var w0 = [];
          if (b * d !== L) w0.push({ a: String(b * d), why: '두 분모의 곱이에요. 공통분모가 될 수는 있지만 최소공배수는 ' + L + R.josa(L, '이에요/예요') + '.' });
          w0.push({ a: String(b + d), why: '두 분모를 더했어요. 공통분모는 두 분모의 공배수예요.' });
          return {
            type: 'short', check: 'number', concept: 2,
            q: head + ' 공통분모는 얼마일까요?',
            answer: String(L),
            wrong: w0.filter(function (w) { return w.a !== String(L); }),
            explain: how,
          };
        }
        var first = t === 1;
        var num = first ? a : c, den = first ? b : d, ans = first ? A : C;
        var w = [{ a: String(num + (L - den)), why: '분모가 ' + (L - den) + ' 커졌다고 분자에 ' + (L - den) + R.josa(L - den, '을/를') + ' 더했어요. 분모에 ' + (L / den) + R.josa(L / den, '을/를') + ' 곱했으니 분자에도 곱해요.' }];
        w.push({ a: String(num), why: '분자를 그대로 두었어요. 분모에 곱한 수만큼 분자에도 곱해요.' });
        return {
          type: 'short', check: 'number', concept: 2,
          q: head + ' $\\square$ 안에 알맞은 수를 구하세요.\n\n$\\frac{' + num + '}{' + den + '}=\\frac{\\square}{' + L + '}$',
          answer: String(ans),
          wrong: w.filter(function (x) { return x.a !== String(ans); }),
          explain: how,
        };
      },
    },
    {
      id: 'compare',
      level: 2,
      title: '분모가 다른 분수, 분수와 소수의 크기 비교',
      make: function (R) {
        function gcd(x, y) { while (y) { var t = x % y; x = y; y = t; } return x; }
        function dec(th) { // 1000분의 th → 소수 글자 (0 < th < 1000)
          var s = String(th);
          while (s.length < 3) s = '0' + s;
          s = '0.' + s;
          while (s.charAt(s.length - 1) === '0') s = s.slice(0, -1);
          return s;
        }
        var ops = ['>', '=', '<'];
        var sym = ['$>$', '$=$', '$<$'];
        var left, right, rel, explain, concept, lastNum, numerOnly = null;
        if (R.bool()) {
          var b, d, a, c, L, tries = 0;
          do {
            b = R.int(2, 12); d = R.int(2, 12); a = R.int(1, b - 1); c = R.int(1, d - 1); tries++;
            L = b * d / gcd(b, d);
          } while ((b === d || L > 60 || gcd(a, b) !== 1 || gcd(c, d) !== 1 || a * d === c * b) && tries < 300);
          var A = a * (L / b), C = c * (L / d);
          rel = A > C ? 0 : A === C ? 1 : 2;
          left = '\\frac{' + a + '}{' + b + '}'; right = '\\frac{' + c + '}{' + d + '}';
          explain = L + R.josa(L, '으로/로') + ' 통분하면 $' + left + '=\\frac{' + A + '}{' + L + '}$, $' + right + '=\\frac{' + C + '}{' + L + '}$' + R.josa(C, '이에요/예요') + '. 분자를 비교하면 $' + A + ops[rel] + C + '$' + R.josa(C, '이에요/예요') + '.';
          lastNum = c;
          var nrel = a > c ? 0 : a === c ? 1 : 2;
          if (nrel !== rel) numerOnly = nrel;
          concept = 3;
        } else {
          var bb = R.pick([2, 4, 5, 8, 10, 20, 25, 50]), aa;
          do { aa = R.int(1, bb - 1); } while (gcd(aa, bb) !== 1);
          var V = aa * 1000 / bb;
          var X, t2 = 0;
          do { X = V + R.pick([-100, -50, -30, -20, -10, -5, 0, 5, 10, 20, 30, 50, 100]); t2++; } while ((X <= 0 || X >= 1000) && t2 < 50);
          if (X <= 0 || X >= 1000) X = V;
          var pow = 10; while (pow % bb !== 0) pow *= 10;
          var m = pow / bb;
          var fracTex = '\\frac{' + aa + '}{' + bb + '}';
          var flip = R.bool();
          left = flip ? dec(X) : fracTex; right = flip ? fracTex : dec(X);
          var lv = flip ? X : V, rv = flip ? V : X;
          rel = lv > rv ? 0 : lv === rv ? 1 : 2;
          lastNum = flip ? aa : Number(dec(X).slice(-1));
          explain = '분수를 소수로 바꾸어 비교해요. $' + fracTex + (m === 1 ? '' : '=\\frac{' + (aa * m) + '}{' + pow + '}') + '=' + dec(V) + '$' + R.josa(Number(dec(V).slice(-1)), '이에요/예요') + '.';
          concept = 5;
        }
        explain += ' 그래서 $' + left + ops[rel] + right + '$' + R.josa(lastNum, '이에요/예요') + '.';
        var why = sym.map(function (s, i) {
          if (i === rel) return '';
          if (numerOnly !== null && i === numerOnly) return '분자만 비교했어요. 분모가 다르면 통분한 뒤 비교해요.';
          if (i === 1) return '두 수는 크기가 달라요. 같은 꼴로 바꾸어 다시 비교해 보세요.';
          if (rel === 1) return '두 수는 크기가 같아요. 같은 꼴로 바꾸어 보세요.';
          return '크기를 거꾸로 비교했어요. 같은 꼴로 바꾼 뒤 다시 비교해 보세요.';
        });
        return {
          type: 'choice', fixed: true, concept: concept,
          q: '○ 안에 $>$, $=$, $<$ 중 알맞은 것을 고르세요.\n\n$' + left + '$ ○ $' + right + '$',
          choices: sym,
          answer: rel,
          why: why,
          explain: explain,
        };
      },
    },
  ],
});
