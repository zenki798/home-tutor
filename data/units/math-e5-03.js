/* 5학년 수학 · 대응 관계 */
Tutor.registerUnit({
  id: 'math-e5-03',
  course: 'math-e5',
  title: '대응 관계',
  summary: '한 양이 변할 때 함께 변하는 다른 양과의 대응 관계를 표에서 찾고, □, △를 써서 식으로 나타내요.',
  goals: [
    '두 양 사이의 대응 관계를 찾아 말할 수 있어요.',
    '대응 관계를 표로 나타내고 규칙을 찾을 수 있어요.',
    '대응 관계를 □, △ 같은 기호를 써서 식으로 나타낼 수 있어요.',
    '생활 속에서 대응 관계를 찾아 식으로 나타낼 수 있어요.',
  ],
  standards: ['[6수02-01]'],

  concepts: [
    {
      title: '두 양 사이의 대응 관계',
      body: '한 양이 변할 때 다른 양이 **일정한 규칙에 따라 함께 변하면**, 두 양 사이에 **대응 관계**가 있다고 해요.\n\n세발자전거 한 대에는 바퀴가 3개 있어요.\n\n- 자전거 1대 → 바퀴 3개\n- 자전거 2대 → 바퀴 6개\n- 자전거 3대 → 바퀴 9개\n\n자전거 수가 변하면 바퀴 수도 함께 변하고, 바퀴 수는 언제나 자전거 수의 3배예요. 이렇게 하나가 정해지면 다른 하나도 짝으로 정해지는 것이 대응 관계예요.',
      easy: '삼각형을 하나씩 늘어놓아 보세요. 삼각형 1개에는 꼭짓점이 3개, 2개에는 6개, 3개에는 9개 있어요.\n\n삼각형 수가 정해지면 꼭짓점 수도 저절로 정해지지요? 이렇게 "짝이 정해지는" 두 양이 대응 관계에 있어요.',
      fig: { type: 'svg', svg: '<svg viewBox="0 0 300 90" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="3"><polygon points="20,75 80,75 50,18"/><polygon points="120,75 180,75 150,18"/><polygon points="220,75 280,75 250,18"/></g></svg>', alt: '따로 떨어진 삼각형 3개' },
      check: {
        type: 'choice',
        q: '두 양 사이에 대응 관계가 있는 것은 무엇일까요?',
        choices: ['세발자전거의 수와 바퀴의 수', '내가 읽은 책의 수와 내 키', '반 친구의 수와 오늘의 날씨'],
        answer: 0,
        why: ['', '책을 더 읽는다고 키가 정해진 규칙대로 변하지는 않아요.', '친구 수가 변해도 날씨가 그에 따라 변하지 않아요.'],
        explain: '세발자전거가 1대 늘 때마다 바퀴는 3개씩 늘어요. 바퀴 수는 언제나 자전거 수의 3배라서 대응 관계가 있어요.',
      },
    },
    {
      title: '대응 관계를 표로 나타내기',
      body: '대응 관계는 **표**로 나타내면 규칙을 찾기 쉬워요. 의자 한 개에 다리가 4개 있을 때\n\n| 의자 수(개) | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| 다리 수(개) | 4 | 8 | 12 | 16 | 20 |\n\n표를 **위아래 짝으로** 보면 다리 수는 언제나 의자 수의 4배예요. 그래서 의자가 10개이면 다리는 $10\\times4=40$개라는 것을 표를 끝까지 쓰지 않아도 알 수 있어요.\n\n> 💡 표를 옆으로 보면 "다리 수가 4씩 커진다"는 규칙도 보여요. 하지만 의자 수와 다리 수의 대응 관계는 위아래 짝 사이의 규칙이에요.',
      easy: '표는 짝꿍을 나란히 세워 둔 줄이에요. 위 칸과 아래 칸이 한 쌍이에요.\n\n1과 4, 2와 8, 3과 12 …를 짝으로 보면서 "위 수에 무엇을 하면 아래 수가 될까?" 하고 물어보세요. 모든 짝에 똑같이 맞는 계산이 대응 관계의 규칙이에요.',
      check: {
        type: 'short', check: 'number',
        q: '표를 보고 $\\square$가 10일 때 $\\triangle$의 값을 구하세요.\n\n| $\\square$ | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|\n| $\\triangle$ | 5 | 6 | 7 | 8 |',
        answer: '14',
        wrong: [
          { a: '50', why: '$\\square$에 5를 곱했어요. 1과 5만 보면 맞지만 2와 6은 5배가 아니에요. 모든 짝에 맞는 규칙은 "4를 더한다"예요.' },
          { a: '9', why: '표의 다음 칸을 썼어요. $\\square$가 10일 때를 구해야 해요.' },
        ],
        explain: '위아래 짝을 보면 $\\triangle$는 언제나 $\\square$보다 4 커요. 그래서 $\\square$가 10이면 $\\triangle$는 $10+4=14$예요.',
      },
    },
    {
      title: '대응 관계를 기호로 된 식으로 나타내기',
      body: '대응 관계는 **기호**를 써서 식으로 간단히 나타낼 수 있어요. 의자 수를 $\\square$, 다리 수를 $\\triangle$라고 하면\n\n$\\triangle=\\square\\times4$\n\n이 식 하나로 의자가 몇 개이든 다리 수를 구할 수 있어요. 의자 7개 → $\\triangle=7\\times4=28$\n\n- 기호는 $\\square$, $\\triangle$ 말고 ○, ☆ 같은 다른 기호를 써도 돼요.\n- 다만 **어떤 기호가 무엇을 나타내는지** 먼저 꼭 밝혀야 해요.',
      easy: '$\\square$와 $\\triangle$는 "빈 상자"라고 생각해 보세요. $\\square$ 상자에 의자 수를 넣으면, $\\triangle$ 상자에는 그 4배가 들어가요.\n\n$\\square$에 3을 넣으면 $\\triangle$에는 12, 5를 넣으면 20이 들어가요. 식은 이 약속을 짧게 적은 것이에요.',
      check: {
        type: 'choice',
        q: '세발자전거의 수를 $\\square$, 바퀴의 수를 $\\triangle$라고 할 때, 두 양의 대응 관계를 바르게 나타낸 식은 무엇일까요?',
        choices: ['$\\triangle=\\square\\times3$', '$\\triangle=\\square+3$', '$\\square=\\triangle\\times3$'],
        answer: 0,
        why: ['', '자전거 1대일 때만 맞아요. 2대이면 바퀴는 5개가 아니라 6개예요.', '거꾸로 썼어요. 바퀴 수가 자전거 수의 3배예요.'],
        explain: '바퀴 수는 언제나 자전거 수의 3배이므로 $\\triangle=\\square\\times3$이에요.',
      },
    },
    {
      title: '하나의 대응 관계, 두 가지 식',
      body: '같은 대응 관계도 어느 쪽을 기준으로 보느냐에 따라 두 가지 식으로 쓸 수 있어요.\n\n| 식 1 | 식 2 |\n|---|---|\n| $\\triangle=\\square\\times4$ | $\\square=\\triangle\\div4$ |\n| $\\triangle=\\square+3$ | $\\square=\\triangle-3$ |\n\n의자 수 $\\square$와 다리 수 $\\triangle$에서, 다리 수를 알 때 의자 수를 구하려면 거꾸로 4로 나누면 돼요. 다리가 36개이면 의자는 $36\\div4=9$개예요.\n\n> 💡 거꾸로 쓸 때는 계산을 반대로 바꿔요. 곱셈 ↔ 나눗셈, 덧셈 ↔ 뺄셈.',
      easy: '"내가 언니보다 3살 적다"와 "언니가 나보다 3살 많다"는 같은 말이지요?\n\n식도 마찬가지예요. $\\triangle=\\square+3$("$\\triangle$는 $\\square$보다 3 크다")은 $\\square=\\triangle-3$("$\\square$는 $\\triangle$보다 3 작다")과 같은 관계예요.',
      check: {
        type: 'ox',
        q: '$\\triangle=\\square+5$는 $\\square=\\triangle-5$로도 나타낼 수 있어요.',
        answer: true,
        explain: '$\\triangle$가 $\\square$보다 5 크면, $\\square$는 $\\triangle$보다 5 작아요. 그래서 $\\square=\\triangle-5$와 같은 관계예요.',
      },
    },
    {
      title: '생활 속 대응 관계',
      body: '우리 주변에도 대응 관계가 많아요. 두 양을 정하고 기호로 나타내 보세요.\n\n| 상황 | 기호 정하기 | 식 |\n|---|---|---|\n| 공책 한 권이 700원 | 공책 수 $\\square$, 값 $\\triangle$ | $\\triangle=\\square\\times700$ |\n| 언니가 나보다 3살 많음 | 내 나이 $\\square$, 언니 나이 $\\triangle$ | $\\triangle=\\square+3$ |\n| 막대를 한 번 자를 때마다 도막이 하나씩 늘어남 | 자른 횟수 $\\square$, 도막 수 $\\triangle$ | $\\triangle=\\square+1$ |\n\n> ⚠️ 모든 두 양이 식 하나로 나타나는 것은 아니에요. 대응 관계를 찾을 때는 먼저 **어떤 양과 어떤 양이 함께 변하는지**, 그 규칙이 늘 같은지 확인해요.\n\n나이 관계처럼 **두 양의 차가 변하지 않는** 경우도 대응 관계예요. 몇 년이 지나도 언니는 언제나 나보다 3살 많아요.',
      easy: '막대를 자르는 것을 떠올려 보세요. 한 번 자르면 2도막, 두 번 자르면 3도막, 세 번 자르면 4도막이에요.\n\n도막 수는 언제나 자른 횟수보다 1 많아요. 그래서 자른 횟수를 $\\square$, 도막 수를 $\\triangle$라고 하면 $\\triangle=\\square+1$이에요.',
      check: {
        type: 'choice',
        q: '한 권에 700원인 공책을 살 때, 공책 수를 $\\square$, 공책값을 $\\triangle$라고 하면 대응 관계를 나타내는 식은 무엇일까요?',
        choices: ['$\\triangle=\\square\\times700$', '$\\triangle=\\square+700$', '$\\triangle=\\square\\div700$'],
        answer: 0,
        why: ['', '공책이 1권 늘 때마다 값이 700원씩 늘어나니 더하기가 아니라 곱하기예요. 2권은 702원이 아니라 1400원이에요.', '공책값이 공책 수보다 훨씬 크니 나누기가 아니에요.'],
        explain: '공책값은 공책 수의 700배예요. 그래서 $\\triangle=\\square\\times700$이에요. 3권이면 $3\\times700=2100$원이에요.',
      },
    },
  ],

  examples: [
    {
      q: '긴 리본을 자르고 있어요. 자른 횟수와 리본 도막 수 사이의 대응 관계를 표로 나타내고, 자른 횟수를 $\\square$, 도막 수를 $\\triangle$로 하여 식으로 나타내세요. 또 10번 자르면 몇 도막이 되는지 구하세요.',
      steps: [
        '한 번 자르면 2도막, 두 번 자르면 3도막, 세 번 자르면 4도막이에요.\n\n| 자른 횟수(번) | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|\n| 도막 수(도막) | 2 | 3 | 4 | 5 |',
        '위아래 짝을 보면 도막 수는 언제나 자른 횟수보다 1 많아요.',
        '식으로 나타내면 $\\triangle=\\square+1$이에요.',
        '10번 자르면 $\\triangle=10+1=11$, 곧 11도막이에요.',
      ],
      answer: '$\\triangle=\\square+1$, 11도막',
    },
    {
      q: '서준이는 9살이고 형은 13살이에요. 서준이의 나이를 $\\square$, 형의 나이를 $\\triangle$라고 할 때 두 양의 대응 관계를 식으로 나타내고, 서준이가 15살이 되면 형은 몇 살인지 구하세요.',
      steps: [
        '형은 서준이보다 $13-9=4$살 많아요. 해가 지나도 두 사람 나이의 차는 4살로 변하지 않아요.',
        '그래서 $\\triangle=\\square+4$예요.',
        '서준이가 15살이면 $\\triangle=15+4=19$예요.',
      ],
      answer: '$\\triangle=\\square+4$, 19살',
    },
  ],

  terms: [
    { term: '대응 관계', def: '한 양이 변할 때 다른 양이 일정한 규칙에 따라 함께 변하는 관계예요. 예: 의자 수와 다리 수' },
    { term: '대응', def: '한 양의 값 하나에 다른 양의 값이 짝으로 정해지는 것이에요. 예: 의자 3개에는 다리 12개가 대응해요.' },
    { term: '기호', def: '수 대신 쓰는 표시예요. $\\square$, $\\triangle$, ○, ☆ 등을 쓰고, 각각 무엇을 나타내는지 먼저 정해요.' },
    { term: '규칙', def: '모든 짝에 똑같이 맞는 계산 방법이에요. 예: "다리 수는 의자 수의 4배"' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '거미 한 마리의 다리는 8개예요. 표를 보고, 거미가 7마리이면 다리는 모두 몇 개인지 구하세요.\n\n| 거미 수(마리) | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|\n| 다리 수(개) | 8 | 16 | 24 | 32 |',
      answer: '56',
      wrong: [{ a: '15', why: '거미 수 7에 8을 더했어요. 다리 수는 거미 수의 8배예요.' }],
      explain: '다리 수는 언제나 거미 수의 8배예요. 거미가 7마리이면 다리는 $7\\times8=56$개예요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 2,
      q: '표를 보고 $\\square$와 $\\triangle$ 사이의 대응 관계를 바르게 나타낸 식을 고르세요.\n\n| $\\square$ | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|\n| $\\triangle$ | 3 | 4 | 5 | 6 |',
      choices: ['$\\triangle=\\square+2$', '$\\triangle=\\square\\times3$', '$\\triangle=\\square+1$', '$\\square=\\triangle+2$'],
      answer: 0,
      why: [
        '',
        '1과 3만 보면 맞지만, 2와 4는 3배가 아니에요. 모든 짝에 맞는지 확인해요.',
        '표를 옆으로 보아 1씩 커지는 규칙을 썼어요. 대응 관계는 위아래 짝 사이의 규칙이에요.',
        '거꾸로 썼어요. $\\triangle$가 $\\square$보다 2 커요.',
      ],
      explain: '모든 짝에서 $\\triangle$는 $\\square$보다 2 커요(1과 3, 2와 4, 3과 5, 4와 6). 그래서 $\\triangle=\\square+2$예요.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 0,
      q: '두 양 사이에 대응 관계가 있으면, 한 양이 변해도 다른 양은 변하지 않아요.',
      answer: false,
      explain: '대응 관계에서는 한 양이 변하면 다른 양도 일정한 규칙에 따라 **함께** 변해요. 의자 수가 늘면 다리 수도 늘어나요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', concept: 2,
      q: '$\\triangle=\\square\\times6$이에요. $\\square$가 9일 때 $\\triangle$는 얼마일까요?',
      answer: '54',
      wrong: [{ a: '15', why: '9와 6을 더했어요. 식은 $\\square$에 6을 곱하라는 뜻이에요.' }],
      explain: '$\\square$에 9를 넣으면 $\\triangle=9\\times6=54$예요.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', concept: 3,
      q: '$\\triangle=\\square-4$예요. $\\triangle$가 10일 때 $\\square$는 얼마일까요?',
      answer: '14',
      hint: '$\\square$에서 4를 뺀 것이 10이에요.',
      wrong: [{ a: '6', why: '10에서 4를 뺐어요. $\\square$에서 4를 뺀 값이 10이므로 거꾸로 $\\square=\\triangle+4$예요.' }],
      explain: '$\\triangle=\\square-4$는 $\\square=\\triangle+4$와 같아요. $\\square=10+4=14$예요. (확인: $14-4=10$)',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 4,
      q: '한 상자에 연필이 12자루씩 들어 있어요. 상자 수를 ○, 연필 수를 ☆이라고 할 때 대응 관계를 바르게 나타낸 식은 무엇일까요?',
      choices: ['☆ = ○ × 12', '☆ = ○ + 12', '○ = ☆ × 12', '☆ = ○ ÷ 12'],
      answer: 0,
      why: [
        '',
        '상자가 1개 늘 때 연필은 12자루씩 늘어요. 그래서 더하기가 아니라 곱하기예요.',
        '거꾸로 썼어요. 연필 수가 상자 수의 12배예요.',
        '연필 수가 상자 수보다 많으니 나누기가 아니라 곱하기예요.',
      ],
      explain: '연필 수는 상자 수의 12배이므로 ☆ = ○ × 12예요. ○ = ☆ ÷ 12로 써도 같은 관계예요.',
    },
    {
      id: 'p7', level: 2, type: 'short', check: 'number', unit: '살', concept: 4,
      q: '올해 서준이는 11살이고 아버지는 43살이에요. 서준이가 20살이 되는 해에 아버지는 몇 살일까요?',
      answer: '52',
      hint: '두 사람의 나이 차는 해가 지나도 변하지 않아요.',
      wrong: [{ a: '63', why: '서준이 나이 20에 아버지의 올해 나이 43을 더했어요. 두 사람 나이의 차 32살을 더해야 해요.' }],
      explain: '아버지는 서준이보다 $43-11=32$살 많아요. 서준이 나이를 $\\square$, 아버지 나이를 $\\triangle$라고 하면 $\\triangle=\\square+32$이므로 $20+32=52$살이에요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 1,
      q: '꽃 한 송이의 꽃잎 수를 표로 나타냈어요. 대응 관계를 바르게 말한 것은 무엇일까요?\n\n| 꽃 수(송이) | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|\n| 꽃잎 수(장) | 5 | 10 | 15 | 20 |',
      choices: ['꽃잎 수는 꽃 수의 5배예요.', '꽃잎 수는 꽃 수보다 4 커요.', '꽃 수는 꽃잎 수의 5배예요.', '꽃잎 수는 5씩 줄어들어요.'],
      answer: 0,
      why: [
        '',
        '1과 5만 보면 맞지만, 2와 10은 4 차이가 아니에요. 모든 짝에 맞는지 확인해요.',
        '거꾸로 말했어요. 꽃 수가 꽃잎 수의 5분의 1이에요.',
        '꽃 수가 늘수록 꽃잎 수는 늘어나요.',
      ],
      explain: '모든 짝에서 꽃잎 수는 꽃 수의 5배예요(1과 5, 2와 10, 3과 15, 4와 20).',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '도막', concept: 4,
      q: '긴 막대를 한 번 자를 때마다 도막이 하나씩 늘어나요. 막대를 9번 자르면 몇 도막이 될까요?',
      answer: '10',
      hint: '1번, 2번, 3번 잘랐을 때의 도막 수를 표로 써 보세요.',
      wrong: [{ a: '9', why: '자른 횟수와 도막 수를 같다고 보았어요. 1번 자르면 2도막이니 도막 수는 자른 횟수보다 1 많아요.' }],
      explain: '1번 → 2도막, 2번 → 3도막, 3번 → 4도막이에요. 도막 수 = 자른 횟수 + 1이므로 $9+1=10$도막이에요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', concept: 2,
      q: '표를 보고 $\\square$가 30일 때 $\\triangle$의 값을 구하세요.\n\n| $\\square$ | 2 | 4 | 6 | 8 |\n|---|---|---|---|---|\n| $\\triangle$ | 1 | 2 | 3 | 4 |',
      answer: '15',
      hint: '$\\triangle$는 $\\square$를 어떻게 한 수인지 찾아보세요.',
      wrong: [{ a: '60', why: '거꾸로 2를 곱했어요. $\\triangle$는 $\\square$의 반이에요.' }, { a: '29', why: '2와 1만 보고 1을 뺐어요. 4와 2는 1 차이가 아니에요.' }],
      explain: '모든 짝에서 $\\triangle$는 $\\square$를 2로 나눈 수예요. $\\triangle=\\square\\div2$이므로 $30\\div2=15$예요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '$\\triangle=\\square\\times5$와 **같은** 대응 관계를 나타내는 식은 무엇일까요?',
      choices: ['$\\square=\\triangle\\div5$', '$\\square=\\triangle\\times5$', '$\\square=\\triangle-5$', '$\\triangle=\\square\\div5$'],
      answer: 0,
      why: [
        '',
        '거꾸로 쓸 때는 곱셈을 나눗셈으로 바꿔야 해요.',
        '곱셈의 반대는 뺄셈이 아니라 나눗셈이에요.',
        '$\\triangle$가 $\\square$의 5배인데, 이 식은 $\\triangle$가 $\\square$를 5로 나눈 수라는 뜻이에요.',
      ],
      explain: '$\\triangle$가 $\\square$의 5배이면, $\\square$는 $\\triangle$를 5로 나눈 수예요. 그래서 $\\square=\\triangle\\div5$예요. (예: $\\square=2$, $\\triangle=10$)',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 1,
      q: '표의 ㉠과 ㉡에 알맞은 수의 합을 구하세요.\n\n| $\\square$ | 3 | 5 | ㉠ | 12 |\n|---|---|---|---|---|\n| $\\triangle$ | 12 | 20 | 36 | ㉡ |',
      answer: '57',
      hint: '먼저 $\\square$와 $\\triangle$ 사이의 규칙을 찾아요.',
      wrong: [{ a: '48', why: '㉡만 구했어요. ㉠과 ㉡을 더해야 해요.' }],
      explain: '$\\triangle$는 언제나 $\\square$의 4배예요($3\\times4=12$, $5\\times4=20$). ㉠은 $36\\div4=9$, ㉡은 $12\\times4=48$이므로 합은 $9+48=57$이에요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: '시', concept: 4,
      q: '어떤 가상의 도시 가의 시각은 언제나 우리나라 시각보다 5시간 늦어요. 가 도시가 오후 1시일 때 우리나라는 오후 몇 시일까요? (오후 □시의 □에 들어갈 수를 쓰세요.)',
      answer: '6',
      hint: '가 도시가 5시간 늦으니, 우리나라는 가 도시보다 5시간 빨라요.',
      wrong: [{ a: '8', why: '5시간을 뺐어요. 가 도시가 늦으니 우리나라 시각은 가 도시 시각에 5시간을 더해야 해요.' }],
      explain: '우리나라 시각을 $\\square$, 가 도시 시각을 $\\triangle$라고 하면 $\\triangle=\\square-5$, 곧 $\\square=\\triangle+5$예요. 오후 1시에 5시간을 더하면 오후 6시예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '봉지', concept: 3,
      q: '쿠키를 한 봉지에 6개씩 담아요. 봉지 수를 $\\square$, 쿠키 수를 $\\triangle$라고 할 때, 쿠키 84개를 남김없이 담으려면 봉지는 몇 개 필요할까요?',
      answer: '14',
      hint: '$\\triangle=\\square\\times6$을 거꾸로 쓰면 $\\square=\\triangle\\div6$이에요.',
      wrong: [{ a: '504', why: '84에 6을 곱했어요. 쿠키 수를 알고 봉지 수를 구할 때는 6으로 나눠요.' }],
      explain: '$\\triangle=\\square\\times6$이므로 $\\square=\\triangle\\div6$이에요. $84\\div6=14$이므로 봉지는 14개 필요해요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', concept: 2,
      q: '$\\triangle=\\square+7$인 대응 관계에서 $\\square$와 $\\triangle$를 더했더니 31이 되었어요. 이때 $\\square$는 얼마일까요?',
      answer: '12',
      hint: '$\\square$에 여러 수를 넣어 보며 $\\square+\\triangle$를 표로 만들어 보세요.',
      wrong: [{ a: '19', why: '$\\triangle$의 값을 구했어요. 문제는 $\\square$를 물어요.' }, { a: '24', why: '31에서 7을 뺀 것은 $\\square$를 두 번 더한 값이에요. 2로 나누어야 해요.' }],
      explain: '표로 찾아보면 $\\square=10$이면 $10+17=27$, $\\square=11$이면 $11+18=29$, $\\square=12$이면 $12+19=31$이에요. 그래서 $\\square=12$예요.\n\n다른 방법: $\\triangle$는 $\\square$보다 7 크니, 31에서 7을 빼면 $\\square$ 두 개의 합 24가 남아요. $24\\div2=12$예요.',
    },
  ],

  deeper: [
    {
      title: '대응 관계는 어디로 이어질까?',
      body: '$\\triangle=\\square\\times4$처럼 한 양이 다른 양의 몇 배인 관계는 6학년의 **비와 비율**, **비례식**으로 이어져요. "공책 3권에 2100원이면 5권에는 얼마일까?" 같은 문제를 더 쉽게 풀 수 있게 돼요.\n\n중학교에서는 $\\square$, $\\triangle$ 대신 $x$, $y$ 같은 문자를 쓰고, 이런 관계를 **함수**라고 불러요. 그래프로 그려 변하는 모습을 한눈에 보기도 해요. 오늘 표에서 짝을 찾고 식으로 쓴 것이 함수의 첫걸음이에요.',
    },
  ],

  faq: [
    {
      q: '□, △ 말고 다른 기호를 써도 돼요?',
      a: '네. ○, ☆, ♡ 같은 기호를 써도 돼요. 대신 "○는 상자 수, ☆는 연필 수"처럼 **각 기호가 무엇을 나타내는지 먼저** 밝혀야 다른 사람이 식을 이해할 수 있어요.',
    },
    {
      q: '표를 옆으로 보는 규칙이랑 대응 관계는 뭐가 달라요?',
      a: '옆으로 보면 "다리 수가 4씩 커진다"처럼 한 양이 어떻게 변하는지 보여요. 대응 관계는 **위아래 짝 사이**의 규칙("다리 수는 의자 수의 4배")이에요. 대응 관계를 알면 표에 없는 큰 수도 바로 구할 수 있어요.',
    },
    {
      q: '$\\triangle=\\square\\times4$랑 $\\square=\\triangle\\div4$ 중에 뭐가 정답이에요?',
      a: '둘 다 맞아요. 같은 대응 관계를 어느 쪽을 기준으로 썼는지만 달라요. $\\square$를 알 때 $\\triangle$를 구하려면 앞의 식이, $\\triangle$를 알 때 $\\square$를 구하려면 뒤의 식이 편해요.',
    },
  ],

  mistakes: [
    '표의 첫 짝만 보고 규칙을 정하는 실수 — 1과 3만 보면 "3배"도 "2를 더함"도 맞아요. 모든 짝에 맞는지 확인해요.',
    '기호가 무엇을 나타내는지 정하지 않고 식을 쓰는 실수 — "$\\square$는 의자 수, $\\triangle$는 다리 수"를 먼저 써요.',
    '식을 거꾸로 쓸 때 계산을 바꾸지 않는 실수 — $\\triangle=\\square\\times5$는 $\\square=\\triangle\\div5$예요($\\square=\\triangle\\times5$가 아니에요).',
  ],

  gens: [
    {
      id: 'table-value',
      level: 1,
      title: '표에서 규칙을 찾아 값 구하기',
      make: function (R) {
        var op = R.pick(['+', '-', '*', '/']);
        var k, xs = [], ys = [], s, i, q, ans, rule, tex;
        if (op === '+') { k = R.int(2, 15); s = R.int(1, 6); for (i = 0; i < 4; i++) xs.push(s + i); q = R.int(12, 50); }
        else if (op === '-') { k = R.int(1, 9); s = R.int(k + 1, k + 6); for (i = 0; i < 4; i++) xs.push(s + i); q = R.int(15, 60); }
        else if (op === '*') { k = R.int(2, 9); s = R.int(1, 4); for (i = 0; i < 4; i++) xs.push(s + i); q = R.int(9, 15); }
        else { k = R.int(2, 9); s = R.int(1, 4); for (i = 0; i < 4; i++) xs.push(k * (s + i)); q = k * R.int(9, 15); }
        function f(x) { return op === '+' ? x + k : op === '-' ? x - k : op === '*' ? x * k : x / k; }
        for (i = 0; i < 4; i++) ys.push(f(xs[i]));
        ans = f(q);
        if (op === '+') { rule = '$\\triangle$는 $\\square$보다 ' + k + ' 큰 수'; tex = '\\triangle=\\square+' + k; }
        else if (op === '-') { rule = '$\\triangle$는 $\\square$보다 ' + k + ' 작은 수'; tex = '\\triangle=\\square-' + k; }
        else if (op === '*') { rule = '$\\triangle$는 $\\square$의 ' + k + '배'; tex = '\\triangle=\\square\\times' + k; }
        else { rule = '$\\triangle$는 $\\square$를 ' + k + R.josa(k, '으로/로') + ' 나눈 수'; tex = '\\triangle=\\square\\div' + k; }
        var x1 = xs[0], y1 = ys[0];
        var wrong = [];
        if (op !== '+' && y1 > x1) wrong.push({ a: String(q + (y1 - x1)), why: '첫 짝 ' + x1 + R.josa(x1, '과/와') + ' ' + y1 + '만 보고 ' + (y1 - x1) + R.josa(y1 - x1, '을/를') + ' 더하는 규칙으로 보았어요. 모든 짝에 맞는지 확인해요.' });
        if (op !== '*' && y1 % x1 === 0 && y1 / x1 > 1) wrong.push({ a: String(q * (y1 / x1)), why: '첫 짝 ' + x1 + R.josa(x1, '과/와') + ' ' + y1 + '만 보고 ' + (y1 / x1) + '배 하는 규칙으로 보았어요. 모든 짝에 맞는지 확인해요.' });
        var seen = {};
        wrong = wrong.filter(function (w) { if (w.a === String(ans) || seen[w.a]) return false; seen[w.a] = 1; return true; });
        var table = '| $\\square$ | ' + xs.join(' | ') + ' |\n|---|---|---|---|---|\n| $\\triangle$ | ' + ys.join(' | ') + ' |';
        return {
          type: 'short', check: 'number', concept: 1,
          q: '표를 보고 $\\square$가 ' + q + '일 때 $\\triangle$의 값을 구하세요.\n\n' + table,
          answer: String(ans),
          wrong: wrong,
          explain: '위아래 짝을 보면 ' + rule + '예요. 곧 $' + tex + '$' + R.josa(k, '이에요/예요') + '.\n\n$\\square$가 ' + q + '이면 $\\triangle$는 ' + ans + R.josa(ans, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'rule-formula',
      level: 2,
      title: '표를 보고 대응 관계를 식으로 나타내기',
      make: function (R) {
        var op = R.pick(['+', '-', '*', '/']);
        var k, xs = [], s, i;
        if (op === '+') { k = R.int(2, 9); s = R.int(1, 3); }
        else if (op === '-') { k = R.int(1, 6); s = R.int(k + 1, k + 4); }
        else if (op === '*') { k = R.int(2, 9); s = R.int(1, 3); }
        else { k = R.int(2, 6); s = R.int(1, 3); }
        for (i = 0; i < 4; i++) xs.push(op === '/' ? k * (s + i) : s + i);
        function ap(o, a, b) {
          var r = o === '+' ? a + b : o === '-' ? a - b : o === '*' ? a * b : a / b;
          return (r === Math.floor(r) && r >= 0) ? r : null;
        }
        var ys = xs.map(function (x) { return ap(op, x, k); });
        var sym = { '+': '+', '-': '-', '*': '\\times', '/': '\\div' };
        function texOf(rev, o, kk) { return '$' + (rev ? '\\square=\\triangle' : '\\triangle=\\square') + sym[o] + kk + '$'; }
        var correct = texOf(false, op, k);
        // 오답 후보: 연산·수·방향을 바꾼 식 가운데 표의 어떤 짝에서 틀리는 것
        var ks = [k, k - 1, k + 1, ys[0] - xs[0], xs[0] - ys[0]];
        if (xs[0] && ys[0] % xs[0] === 0) ks.push(ys[0] / xs[0]);
        var reason = {}, near = [], far = [];
        ['+', '-', '*', '/'].forEach(function (o) {
          ks.forEach(function (kk) {
            if (!(kk >= 1) || kk > 30 || (kk === 1 && (o === '*' || o === '/'))) return;
            [false, true].forEach(function (rev) {
              var t = texOf(rev, o, kk);
              if (t === correct || reason[t]) return;
              for (var j = 0; j < 4; j++) {
                var x = xs[j], y = ys[j];
                var got = rev ? ap(o, y, kk) : ap(o, x, kk);
                var want = rev ? x : y;
                if (got !== want) {
                  var msg = rev
                    ? '$\\triangle$가 ' + y + '일 때 이 식으로 구한 $\\square$' + '가' + ' 표의 ' + x + R.josa(x, '과/와') + ' 달라요.'
                    : '$\\square$가 ' + x + '일 때 이 식으로 구한 $\\triangle$' + '가' + ' 표의 ' + y + R.josa(y, '과/와') + ' 달라요.';
                  if (j > 0) msg = '첫 짝에만 맞아요. ' + msg;
                  reason[t] = msg + ' 모든 짝에 맞는지 확인해요.';
                  (j > 0 ? near : far).push(t); // 첫 짝에 맞는 식이 더 그럴듯한 오답
                  return;
                }
              }
            });
          });
        });
        var pick = R.choices(correct, R.shuffle(near).concat(R.shuffle(far)));
        var table = '| $\\square$ | ' + xs.join(' | ') + ' |\n|---|---|---|---|---|\n| $\\triangle$ | ' + ys.join(' | ') + ' |';
        var pairs = xs.map(function (x, j) { return x + '→' + ys[j]; }).join(', ');
        return {
          type: 'choice', concept: 2,
          q: '표를 보고 $\\square$와 $\\triangle$ 사이의 대응 관계를 바르게 나타낸 식을 고르세요.\n\n' + table,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '모든 짝(' + pairs + ')에 똑같이 맞는 규칙을 찾아요. 정답은 ' + correct + R.josa(k, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'life-relation',
      level: 2,
      title: '생활 속 대응 관계로 값 구하기',
      make: function (R) {
        var t = R.int(0, 3);
        var reverse = R.bool();
        if (t === 0) {
          var it = R.pick([['세발자전거', '대', '바퀴', '개', 3], ['거미', '마리', '다리', '개', 8], ['오리', '마리', '다리', '개', 2], ['네잎클로버', '장', '잎', '장', 4], ['꽃', '송이', '꽃잎', '장', 5], ['문어', '마리', '다리', '개', 8]]);
          var k = it[4];
          var n = R.int(6, 15);
          var m = n * k;
          if (!reverse) {
            return {
              type: 'short', check: 'number', unit: it[3], concept: 4,
              q: it[0] + ' 1' + it[1] + '에는 ' + it[2] + R.josa(it[2], '이/가') + ' ' + k + it[3] + ' 있어요. ' + it[0] + ' ' + n + it[1] + '에는 ' + it[2] + R.josa(it[2], '이/가') + ' 모두 몇 ' + it[3] + ' 있을까요?',
              answer: String(m),
              wrong: [{ a: String(n + k), why: n + R.josa(n, '과/와') + ' ' + k + R.josa(k, '을/를') + ' 더했어요. ' + it[2] + ' 수는 ' + it[0] + ' 수의 ' + k + '배예요.' }],
              explain: it[0] + ' 수를 $\\square$, ' + it[2] + ' 수를 $\\triangle$라고 하면 $\\triangle=\\square\\times' + k + '$' + R.josa(k, '이에요/예요') + '. $' + n + '\\times' + k + '=' + m + '$이므로 ' + m + it[3] + R.josa(it[3], '이에요/예요') + '.',
            };
          }
          return {
            type: 'short', check: 'number', unit: it[1], concept: 3,
            q: it[0] + ' 1' + it[1] + '에는 ' + it[2] + R.josa(it[2], '이/가') + ' ' + k + it[3] + ' 있어요. ' + it[2] + R.josa(it[2], '이/가') + ' 모두 ' + m + it[3] + '이면 ' + it[0] + R.josa(it[0], '은/는') + ' 몇 ' + it[1] + '일까요?',
            answer: String(n),
            wrong: [{ a: String(m * k), why: k + R.josa(k, '을/를') + ' 곱했어요. ' + it[2] + ' 수를 알고 ' + it[0] + ' 수를 구할 때는 ' + k + R.josa(k, '으로/로') + ' 나눠요.' }],
            explain: it[0] + ' 수를 $\\square$, ' + it[2] + ' 수를 $\\triangle$라고 하면 $\\triangle=\\square\\times' + k + '$, 곧 $\\square=\\triangle\\div' + k + '$' + R.josa(k, '이에요/예요') + '. $' + m + '\\div' + k + '=' + n + '$이므로 ' + n + it[1] + R.josa(it[1], '이에요/예요') + '.',
          };
        }
        if (t === 1) {
          var names = R.pick([['지아', '언니'], ['민수', '형'], ['서아', '오빠'], ['도현', '누나']]);
          var a = R.int(7, 12);
          var d = R.int(2, 6);
          var later = a + R.int(3, 10);
          if (!reverse) {
            return {
              type: 'short', check: 'number', unit: '살', concept: 4,
              q: '올해 ' + names[0] + '의 나이는 ' + a + '살이고 ' + names[1] + '의 나이는 ' + (a + d) + '살이에요. ' + names[0] + '의 나이가 ' + later + '살이 되는 해에 ' + names[1] + '의 나이는 몇 살일까요?',
              answer: String(later + d),
              hint: '두 사람의 나이 차는 해가 지나도 변하지 않아요.',
              wrong: [{ a: String(later + a + d), why: names[1] + '의 올해 나이를 그대로 더했어요. 두 사람 나이의 차 ' + d + '살만 더하면 돼요.' }],
              explain: names[1] + R.josa(names[1], '은/는') + ' ' + names[0] + '보다 $' + (a + d) + '-' + a + '=' + d + '$살 많아요. ' + names[0] + '의 나이를 $\\square$, ' + names[1] + '의 나이를 $\\triangle$라고 하면 $\\triangle=\\square+' + d + '$이므로 $' + later + '+' + d + '=' + (later + d) + '$살이에요.',
            };
          }
          return {
            type: 'short', check: 'number', unit: '살', concept: 3,
            q: '올해 ' + names[0] + '의 나이는 ' + a + '살이고 ' + names[1] + '의 나이는 ' + (a + d) + '살이에요. ' + names[1] + '의 나이가 ' + (later + d) + '살이 되는 해에 ' + names[0] + '의 나이는 몇 살일까요?',
            answer: String(later),
            hint: '두 사람의 나이 차는 해가 지나도 변하지 않아요.',
            wrong: [{ a: String(later + 2 * d), why: '나이 차를 더했어요. ' + names[0] + R.josa(names[0], '은/는') + ' ' + names[1] + '보다 어리니 나이 차를 빼야 해요.' }],
            explain: '두 사람의 나이 차는 ' + d + '살이에요. ' + names[0] + '의 나이를 $\\square$, ' + names[1] + '의 나이를 $\\triangle$라고 하면 $\\square=\\triangle-' + d + '$이므로 $' + (later + d) + '-' + d + '=' + later + '$살이에요.',
          };
        }
        if (t === 2) {
          var cut = R.int(5, 30);
          if (!reverse) {
            return {
              type: 'short', check: 'number', unit: '도막', concept: 4,
              q: '긴 끈을 한 번 자를 때마다 도막이 하나씩 늘어나요. 끈을 ' + cut + '번 자르면 몇 도막이 될까요?',
              answer: String(cut + 1),
              wrong: [{ a: String(cut), why: '자른 횟수와 도막 수를 같다고 보았어요. 1번 자르면 2도막이에요.' }],
              explain: '1번 → 2도막, 2번 → 3도막, …이므로 도막 수는 자른 횟수보다 1 많아요. 자른 횟수를 $\\square$, 도막 수를 $\\triangle$라고 하면 $\\triangle=\\square+1$, 곧 $' + cut + '+1=' + (cut + 1) + '$도막이에요.',
            };
          }
          return {
            type: 'short', check: 'number', unit: '번', concept: 3,
            q: '긴 끈을 한 번 자를 때마다 도막이 하나씩 늘어나요. 끈이 ' + (cut + 1) + '도막이 되었다면 몇 번 자른 것일까요?',
            answer: String(cut),
            wrong: [{ a: String(cut + 2), why: '1을 더했어요. 자른 횟수는 도막 수보다 1 적어요.' }, { a: String(cut + 1), why: '도막 수와 자른 횟수를 같다고 보았어요. 1번 자르면 2도막이에요.' }],
            explain: '도막 수는 자른 횟수보다 1 많아요. 자른 횟수를 $\\square$, 도막 수를 $\\triangle$라고 하면 $\\square=\\triangle-1$이므로 $' + (cut + 1) + '-1=' + cut + '$번이에요.',
          };
        }
        var price = R.pick([300, 400, 500, 600, 700, 800, 900, 1200, 1500]);
        var thing = R.pick([['공책', '권'], ['연필', '자루'], ['지우개', '개'], ['색종이 묶음', '묶음']]);
        var cnt = R.int(3, 12);
        var total = price * cnt;
        if (!reverse) {
          return {
            type: 'short', check: 'number', unit: '원', concept: 4,
            q: thing[0] + ' 한 ' + thing[1] + R.josa(thing[1], '이/가') + ' ' + R.fmt.num(price) + '원이에요. ' + thing[0] + ' ' + cnt + thing[1] + '의 값은 얼마일까요?',
            answer: String(total),
            wrong: [{ a: String(price + cnt), why: '값과 개수를 더했어요. 값은 개수에 한 ' + thing[1] + '의 값을 곱해요.' }],
            explain: thing[0] + ' 수를 $\\square$, 값을 $\\triangle$라고 하면 $\\triangle=\\square\\times' + price + '$' + R.josa(price, '이에요/예요') + '. $' + cnt + '\\times' + price + '=' + total + '$이므로 ' + R.fmt.num(total) + '원이에요.',
          };
        }
        return {
          type: 'short', check: 'number', unit: thing[1], concept: 3,
          q: thing[0] + ' 한 ' + thing[1] + R.josa(thing[1], '이/가') + ' ' + R.fmt.num(price) + '원이에요. ' + thing[0] + '값이 모두 ' + R.fmt.num(total) + '원이라면 ' + thing[0] + R.josa(thing[0], '을/를') + ' 몇 ' + thing[1] + ' 산 것일까요?',
          answer: String(cnt),
          wrong: [{ a: String(total - price), why: '뺄셈을 했어요. 전체 값을 한 ' + thing[1] + '의 값으로 나누어야 해요.' }],
          explain: thing[0] + ' 수를 $\\square$, 값을 $\\triangle$라고 하면 $\\triangle=\\square\\times' + price + '$, 곧 $\\square=\\triangle\\div' + price + '$' + R.josa(price, '이에요/예요') + '. $' + total + '\\div' + price + '=' + cnt + '$이므로 ' + cnt + thing[1] + R.josa(thing[1], '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'sum-condition',
      level: 3,
      title: '대응 관계와 두 양의 합',
      make: function (R) {
        var mul = R.bool();
        var x = R.int(4, 20);
        var k, y, S, explain, wrong;
        if (!mul) {
          k = R.int(2, 12); y = x + k; S = x + y;
          explain = '표로 찾아보면 $\\square=' + x + '$일 때 $\\triangle=' + y + '$이고 합이 ' + S + R.josa(S, '이에요/예요') + '.\n\n다른 방법: $\\triangle$는 $\\square$보다 ' + k + ' 크니, 합 ' + S + '에서 ' + k + R.josa(k, '을/를') + ' 빼면 $\\square$ 두 개의 합 ' + (S - k) + R.josa(S - k, '이/가') + ' 남아요. $' + (S - k) + '\\div2=' + x + '$' + R.josa(x, '이에요/예요') + '.';
          wrong = [{ a: String(y), why: '$\\triangle$의 값을 구했어요. 문제는 $\\square$를 물어요.' }, { a: String(S - k), why: '합에서 ' + k + R.josa(k, '을/를') + ' 뺀 값은 $\\square$ 두 개의 합이에요. 2로 나누어야 해요.' }];
        } else {
          k = R.int(2, 6); x = R.int(3, 15); y = x * k; S = x + y;
          explain = '표로 찾아보면 $\\square=' + x + '$일 때 $\\triangle=' + y + '$이고 합이 ' + S + R.josa(S, '이에요/예요') + '.\n\n다른 방법: $\\triangle$는 $\\square$ ' + k + '개와 같으니, 합은 $\\square$ ' + (k + 1) + '개와 같아요. $' + S + '\\div' + (k + 1) + '=' + x + '$' + R.josa(x, '이에요/예요') + '.';
          wrong = [{ a: String(y), why: '$\\triangle$의 값을 구했어요. 문제는 $\\square$를 물어요.' }, { a: String(S / k), why: k + R.josa(k, '으로/로') + ' 나누었어요. 합은 $\\square$가 ' + (k + 1) + '개 있는 것과 같아요.' }];
        }
        var tex = mul ? '\\triangle=\\square\\times' + k : '\\triangle=\\square+' + k;
        var seen = {};
        return {
          type: 'short', check: 'number', concept: 2,
          q: '$' + tex + '$인 대응 관계에서 $\\square$와 $\\triangle$를 더했더니 ' + S + R.josa(S, '이/가') + ' 되었어요. 이때 $\\square$는 얼마일까요?',
          answer: String(x),
          hint: '$\\square$에 여러 수를 넣어 보며 $\\square+\\triangle$를 표로 만들어 보세요.',
          wrong: wrong.filter(function (w) { if (w.a === String(x) || seen[w.a] || !(Number(w.a) === Math.floor(Number(w.a)))) return false; seen[w.a] = 1; return true; }),
          explain: explain,
        };
      },
    },
  ],
});
