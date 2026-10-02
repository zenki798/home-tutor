/* 4학년 영어 · 시각 묻고 답하기 */
Tutor.registerUnit({
  id: 'eng-e4-07',
  course: 'eng-e4',
  title: '시각 묻고 답하기',
  summary: "What time is it?으로 시각을 묻고 It's seven o'clock.처럼 답하며 할 일을 시각과 함께 말해요.",
  goals: [
    "What time is it?으로 시각을 묻고 It's ~ o'clock.으로 답할 수 있어요.",
    "몇 시 몇 분을 It's seven thirty.처럼 말할 수 있어요.",
    '21~60을 나타내는 낱말을 읽고 쓰며, thirteen과 thirty처럼 헷갈리는 수를 구별할 수 있어요.',
    "It's time for ~.로 할 일을 시각과 함께 말할 수 있어요.",
  ],
  standards: ['[4영02-08]', '[4영01-06]', '[4영01-03]'],

  concepts: [
    {
      title: "What time is it? — 시각 묻고 답하기",
      body: "지금 몇 시인지 물을 때는 **What time is it?** (몇 시예요?)이라고 해요.\n\n정각일 때는 **It's ~ o'clock.** 으로 답해요.\n\n- It's **three o'clock**. (3시예요.)\n- It's **seven o'clock**. (7시예요.)\n\n**o'clock** 은 \"정각\"이라는 뜻으로, 분이 없을 때(긴바늘이 12를 가리킬 때)만 붙여요.\n\n> 💡 시각을 말할 때도 It(그것)을 주어로 써요. 이때 It 은 \"그것\"이라고 풀지 않아요.",
      easy: "시계를 보는 친구에게 \"몇 시야?\"라고 물으면 **What time is it?** 이에요.\n\n친구는 짧은바늘이 가리키는 수를 영어로 말하고, 끝에 o'clock 을 붙여 대답해요.\n\n짧은바늘이 3, 긴바늘이 12 → It's **three** o'clock.",
      fig: { type: 'clock', h: 3, m: 0, alt: '3시를 가리키는 시계' },
      check: {
        type: 'choice',
        q: "What time is it? 의 뜻은 무엇일까요?",
        choices: ['몇 시예요?', '오늘은 무슨 요일이에요?', '이것은 무엇이에요?'],
        answer: 0,
        why: ['', 'time 은 "시각, 시간"이에요. 요일을 묻는 말이 아니에요.', '"이것은 무엇이에요?"는 What\'s this? 예요.'],
        explain: "What time is it? 은 \"몇 시예요?\"라는 뜻이에요. It's three o'clock.(3시예요.)처럼 답해요.",
      },
    },
    {
      title: '몇 시 몇 분 말하기',
      body: "분이 있을 때는 **시를 먼저, 분을 나중에** 수 낱말로 이어서 말해요. 이때는 o'clock 을 쓰지 않아요.\n\n| 시각 | 영어 |\n|---|---|\n| 7:30 | It's **seven thirty**. |\n| 9:15 | It's **nine fifteen**. |\n| 4:45 | It's **four forty-five**. |\n\n디지털시계의 7:30 을 보면 쌍점(:) 앞의 7이 시, 뒤의 30이 분이에요. 보이는 순서대로 seven, thirty 라고 읽으면 돼요.",
      easy: '디지털시계의 숫자를 왼쪽부터 차례로 읽는다고 생각해요.\n\n**7 : 30** → seven ... thirty\n\n쌍점(:)은 소리 내지 않고 잠깐 쉬어요. 그래서 It\'s seven thirty. 예요.',
      fig: { type: 'clock', h: 7, m: 30, alt: '7시 30분을 가리키는 시계' },
      check: {
        type: 'choice',
        q: '9:15 를 영어로 바르게 말한 것은 무엇일까요?',
        choices: ["It's nine fifteen.", "It's fifteen nine.", "It's nine fifteen o'clock."],
        answer: 0,
        why: [
          '',
          '시와 분의 순서가 바뀌었어요. 시(nine)를 먼저 말해요.',
          "분이 있을 때는 o'clock 을 붙이지 않아요.",
        ],
        explain: "시(nine)를 먼저, 분(fifteen)을 나중에 말해요. 분이 있으니 o'clock 은 쓰지 않아요: It's nine fifteen.",
      },
    },
    {
      title: '21~60을 나타내는 낱말',
      body: "20, 30, 40, 50, 60 은 끝이 **-ty** 로 끝나요.\n\n| 수 | 낱말 | 수 | 낱말 |\n|---|---|---|---|\n| 20 | twenty | 50 | fifty |\n| 30 | thirty | 60 | sixty |\n| 40 | forty | | |\n\n그 사이의 수는 **-ty 낱말 + 1~9 낱말** 을 붙임표(-)로 이어요.\n\n- 21 = twenty**-**one\n- 35 = thirty**-**five\n- 45 = forty**-**five\n\n> ⚠️ 40 은 **forty** 예요. four 에는 u 가 있지만 forty 에는 u 가 없어요.",
      easy: '레고 블록 두 개를 끼우는 것처럼 생각해 보세요.\n\n큰 블록(twenty, thirty, forty, fifty)과 작은 블록(one ~ nine)을 고리(-)로 연결해요.\n\n- thirty + five → thirty-five (35)\n- forty + two → forty-two (42)',
      check: {
        type: 'choice',
        q: '45 를 영어로 바르게 쓴 것은 무엇일까요?',
        choices: ['forty-five', 'fourty-five', 'fourteen-five'],
        answer: 0,
        why: ['', '40 은 forty 로, u 가 없어요.', 'fourteen 은 14 예요. 40 은 forty 예요.'],
        explain: '45 는 40(forty)과 5(five)를 붙임표로 이은 forty-five 예요.',
      },
    },
    {
      title: 'thirteen 과 thirty 구별하기',
      body: "13~19 는 끝이 **-teen**, 30·40·50 은 끝이 **-ty** 예요. 소리가 비슷해서 헷갈리기 쉬워요.\n\n| -teen | -ty |\n|---|---|\n| 13 thirteen | 30 thirty |\n| 14 fourteen | 40 forty |\n| 15 fifteen | 50 fifty |\n\n구별하는 방법 두 가지:\n\n1. **철자**: 끝이 teen 이면 10대(13~19), ty 면 몇십이에요.\n2. **강세(세게 말하는 곳)**: -teen 낱말은 **뒤쪽 teen** 을 세게, -ty 낱말은 **앞쪽** 을 세게 말해요.\n\n> 💡 들을 때 끝소리가 길게 늘어나면 -teen, 짧게 끝나면 -ty 일 때가 많아요.",
      easy: '-teen 은 "꼬리가 긴 수", -ty 는 "꼬리가 짧은 수"라고 기억해 보세요.\n\n- thirTEEN: 꼬리(teen)를 길고 세게 → 13\n- THIRty: 머리를 세게, 꼬리는 짧게 → 30',
      check: {
        type: 'ox',
        q: 'thirty 는 13 이에요.',
        answer: false,
        explain: 'thirty 는 끝이 -ty 라서 30 이에요. 13 은 끝이 -teen 인 thirteen 이에요.',
      },
    },
    {
      title: "It's time for ~. — 할 일을 시각과 함께 말하기",
      body: "\"~할 시간이에요\"라고 말할 때는 **It's time for ~.** 를 써요. for 다음에는 할 일을 나타내는 낱말이 와요.\n\n- It's time for **breakfast**. (아침 먹을 시간이에요.)\n- It's time for **lunch**. (점심 먹을 시간이에요.)\n- It's time for **school**. (학교 갈 시간이에요.)\n- It's time for **bed**. (잘 시간이에요.)\n\n시각과 함께 말하면 이렇게 돼요.\n\n- A: What time is it?\n- B: It's twelve thirty. **It's time for lunch.**\n\n> 💡 It's time for bed. 의 bed 는 침대가 아니라 \"잠자리에 들기\"라는 뜻으로 쓰였어요.",
      easy: '알람시계가 울리면서 "~할 시간이야!"라고 외친다고 생각해 보세요.\n\n그 외침이 **It\'s time for ~!** 예요. 뒤에 할 일만 바꿔 끼우면 돼요.\n\n- 🍚 점심 → It\'s time for lunch.\n- 🛏 잠 → It\'s time for bed.',
      check: {
        type: 'choice',
        q: "It's time for lunch. 의 뜻은 무엇일까요?",
        choices: ['점심 먹을 시간이에요.', '잘 시간이에요.', '학교 갈 시간이에요.'],
        answer: 0,
        why: ['', '잘 시간은 It\'s time for bed. 예요.', '학교 갈 시간은 It\'s time for school. 이에요.'],
        explain: "lunch 는 점심이에요. It's time for lunch. 는 \"점심 먹을 시간이에요.\"라는 뜻이에요.",
      },
    },
  ],

  examples: [
    {
      q: '시계를 보고 What time is it? 에 영어로 답해 보세요.',
      fig: { type: 'clock', h: 9, m: 45, alt: '시계 그림' },
      steps: [
        '짧은바늘이 9와 10 사이에 있으니 9시, 긴바늘이 9를 가리키니 45분이에요.',
        '9는 nine, 45는 forty(40)와 five(5)를 이은 forty-five 예요.',
        "시를 먼저, 분을 나중에 말하고 o'clock 은 붙이지 않아요.",
      ],
      answer: "**It's nine forty-five.**",
    },
    {
      q: "12시 정각이 되어 점심을 먹으려고 해요. 시각과 할 일을 영어로 말해 보세요.",
      steps: [
        "12시 정각은 It's twelve o'clock. 이에요.",
        "점심 먹을 시간은 It's time for lunch. 예요.",
        '두 문장을 이어서 말해요.',
      ],
      answer: "**It's twelve o'clock. It's time for lunch.**",
    },
  ],

  terms: [
    { term: "o'clock", def: '"정각"이라는 뜻으로, 분이 없는 시각 뒤에 붙여요. 예: It\'s three o\'clock.(3시예요.)' },
    { term: '붙임표(-)', def: '21~99 의 수를 낱말로 쓸 때 몇십과 일의 자리 낱말 사이에 넣는 짧은 줄이에요. 예: twenty-one, forty-five' },
    { term: '-teen 과 -ty', def: '-teen 은 13~19 의 끝(thirteen), -ty 는 20, 30, 40 … 의 끝(thirty)이에요. 철자와 강세로 구별해요.' },
    { term: '강세', def: '낱말에서 다른 곳보다 세게 말하는 부분이에요. thirteen 은 뒤쪽, thirty 는 앞쪽에 강세가 있어요.' },
    { term: "It's time for ~.", def: '"~할 시간이에요."라는 뜻이에요. 예: It\'s time for bed.(잘 시간이에요.)' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '"몇 시예요?"라고 물을 때 쓰는 말은 무엇일까요?',
      choices: ['What time is it?', "What's this?", 'How are you?', "How's the weather?"],
      answer: 0,
      why: ['', '"이것은 무엇이에요?"라는 뜻이에요.', '"어떻게 지내?"라고 기분을 묻는 말이에요.', '"날씨가 어때요?"라고 날씨를 묻는 말이에요.'],
      explain: "시각을 물을 때는 What time is it? 이라고 해요. time 은 \"시각, 시간\"이에요.",
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: "시계를 보고 빈칸에 알맞은 말을 쓰세요.\n\nIt's three [[o'clock]].",
      fig: { type: 'clock', h: 3, m: 0, alt: '시계 그림' },
      answer: ["o'clock"],
      hint: '긴바늘이 12를 가리키면 "정각"이에요.',
      wrong: [
        { a: 'oclock', why: "o 와 clock 사이에 작은 점(')을 찍어 o'clock 으로 써요." },
        { a: 'thirty', why: '긴바늘이 12를 가리키니 정각이에요. thirty 는 긴바늘이 6을 가리킬 때예요.' },
      ],
      explain: "긴바늘이 12를 가리키니 정각이에요. 정각은 o'clock 으로 말해요: It's three o'clock.",
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 3,
      q: 'forty 는 어떤 수일까요?',
      choices: ['40', '14', '4', '44'],
      answer: 0,
      why: ['', '14 는 끝이 -teen 인 fourteen 이에요.', '4 는 four 예요.', '44 는 forty-four 예요.'],
      explain: 'forty 는 끝이 -ty 이므로 몇십이에요. 40 이에요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 3,
      q: 'fifteen 은 15 이고, fifty 는 50 이에요.',
      answer: true,
      explain: '끝이 -teen 인 fifteen 은 15, 끝이 -ty 인 fifty 는 50 이에요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 1,
      q: '7:30 을 영어로 바르게 말한 것은 무엇일까요?',
      choices: ["It's seven thirty.", "It's seven thirteen.", "It's thirty seven.", "It's seven o'clock."],
      answer: 0,
      why: [
        '',
        'thirteen 은 13 이에요. 30 은 thirty 예요.',
        '시와 분의 순서가 바뀌었어요. 시를 먼저 말해요.',
        "o'clock 은 정각(7:00)일 때 써요. 7:30 은 30분이 있어요.",
      ],
      explain: "7은 seven, 30은 thirty 예요. 시를 먼저, 분을 나중에: It's seven thirty.",
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 2,
      q: '50 을 영어 낱말로 쓰세요.',
      answer: ['fifty'],
      wrong: [
        { a: 'fifteen', why: 'fifteen 은 15 예요. 50 은 끝이 -ty 인 fifty 예요.' },
        { a: 'fivety', why: '50 은 five 에서 바로 오지 않고 fif 로 바뀌어 fifty 로 써요.' },
      ],
      explain: '50 은 fifty 예요. five 가 아니라 fif 로 시작하는 것에 주의해요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: "It's time for bed. 의 뜻은 무엇일까요?",
      choices: ['잘 시간이에요.', '점심 먹을 시간이에요.', '학교 갈 시간이에요.', '침대가 하나 있어요.'],
      answer: 0,
      why: [
        '',
        '점심 먹을 시간은 It\'s time for lunch. 예요.',
        '학교 갈 시간은 It\'s time for school. 이에요.',
        'It\'s time for bed. 의 bed 는 "잠자리에 들기"라는 뜻으로 쓰였어요.',
      ],
      explain: "It's time for bed. 는 \"잘 시간이에요.\"라는 뜻이에요.",
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 0,
      q: '"몇 시예요?"가 되도록 낱말을 순서대로 놓으세요.',
      choices: ['What', 'time', 'is', 'it?'],
      answer: [0, 1, 2, 3],
      hint: 'What time(몇 시)이 한 덩어리로 맨 앞에 와요.',
      explain: 'What time(몇 시) + is it(이에요)? 그래서 What time is it? 이에요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'text', concept: 2,
      q: '21 을 영어 낱말로 쓰세요. (붙임표에 주의하세요.)',
      answer: ['twenty-one'],
      hint: '20(twenty)과 1(one)을 짧은 줄(-)로 이어요.',
      wrong: [
        { a: 'twenty one', why: '두 낱말 사이에 붙임표(-)를 넣어 twenty-one 으로 써요.' },
        { a: 'twelve', why: 'twelve 는 12 예요. 21 은 twenty-one 이에요.' },
      ],
      explain: '21 은 20(twenty)과 1(one)을 붙임표로 이은 twenty-one 이에요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: "대화를 읽고 답하세요.\n\nJia: What time is it?\nMom: It's eight o'clock.\nJia: Oh! It's time for school.\n\n지아가 학교에 갈 시각은 몇 시일까요?",
      choices: ['8시', '7시', '8시 30분', '9시'],
      answer: 0,
      why: [
        '',
        'seven 은 7 이에요. 엄마는 eight(8)라고 했어요.',
        "o'clock 은 정각이에요. 30분이면 eight thirty 라고 해요.",
        'nine 은 9 예요. 엄마는 eight(8)라고 했어요.',
      ],
      hint: "엄마가 말한 It's ~ o'clock. 을 보세요.",
      explain: "엄마가 It's eight o'clock.(8시예요.)이라고 하자 지아가 학교 갈 시간이라고 했어요. 그래서 8시예요.",
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: "It's eleven fifteen. 을 디지털시계로 나타낸 것은 무엇일까요?",
      choices: ['11:15', '11:50', '12:15', '11:05'],
      answer: 0,
      why: [
        '',
        'fifty(50)와 fifteen(15)을 헷갈렸어요. 끝이 -teen 이면 15 예요.',
        'eleven 은 11 이에요. 12 는 twelve 예요.',
        'five 와 fifteen 을 헷갈렸어요. fifteen 은 15 예요.',
      ],
      explain: 'eleven 은 11, fifteen 은 끝이 -teen 이라 15 예요. 그래서 11:15 예요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 4,
      q: '"점심 먹을 시간이에요."를 영어로 바르게 말한 것은 무엇일까요?',
      choices: ["It's time for lunch.", "It's time for bed.", "It's lunch for time.", 'What time is it?'],
      answer: 0,
      why: [
        '',
        'bed 는 잘 시간을 말할 때 써요. 점심은 lunch 예요.',
        'time 과 lunch 의 자리가 바뀌었어요. It\'s time for 다음에 할 일을 써요.',
        '"몇 시예요?"라고 묻는 말이에요.',
      ],
      explain: "\"~할 시간이에요\"는 It's time for ~. 이고, 점심은 lunch 예요: It's time for lunch.",
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: '수와 낱말을 잘못 짝 지은 것은 무엇일까요?',
      choices: ['13 – thirteen', '40 – forty', '15 – fifty', '60 – sixty'],
      answer: 2,
      why: [
        '13 – thirteen 은 바르게 짝 지었어요.',
        '40 – forty 는 바르게 짝 지었어요.',
        '',
        '60 – sixty 는 바르게 짝 지었어요.',
      ],
      explain: '15 는 끝이 -teen 인 fifteen 이에요. fifty 는 50 이에요. 나머지는 모두 바르게 짝 지었어요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: "지금은 It's four thirty. 예요. 30분 뒤에 저녁을 먹어요. 저녁 먹는 시각을 영어로 바르게 말한 것은 무엇일까요?",
      choices: ["It's five o'clock.", "It's four sixty.", "It's five thirty.", "It's four o'clock."],
      answer: 0,
      why: [
        '',
        '60분은 1시간이에요. 4시 30분에서 30분이 지나면 5시 정각이 돼요.',
        '5시 30분은 지금보다 1시간 뒤예요. 30분 뒤를 구해야 해요.',
        '4시는 지금보다 30분 앞이에요.',
      ],
      hint: '4시 30분에서 30분이 지나면 몇 시인지 먼저 우리말로 생각해 보세요.',
      explain: "four thirty 는 4시 30분이에요. 30분 뒤는 5시 정각이므로 It's five o'clock. 이에요. 60분은 1시간이라 four sixty 라고는 말하지 않아요.",
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: "민수의 하루를 읽고 답하세요.\n\nIt's seven o'clock. It's time for breakfast.\nIt's eight twenty. It's time for school.\nIt's nine thirty. It's time for bed.\n\n민수가 학교에 가는 시각은 언제일까요?",
      choices: ['8:20', '7:00', '9:30', '8:12'],
      answer: 0,
      why: [
        '',
        '7시는 아침을 먹는 시각(breakfast)이에요.',
        '9시 30분은 잠자리에 드는 시각(bed)이에요.',
        'twenty(20)와 twelve(12)를 헷갈렸어요.',
      ],
      hint: 'It\'s time for school. 바로 앞 문장을 보세요.',
      explain: "It's time for school. 바로 앞에 It's eight twenty.(8시 20분이에요.)라고 했어요. 그래서 8:20 이에요.",
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'text', concept: 2,
      q: '45 를 영어 낱말로 쓰세요.',
      answer: ['forty-five'],
      hint: '40과 5를 붙임표로 이어요. 40의 철자에 주의하세요.',
      wrong: [
        { a: 'fourty-five', why: '40 은 forty 로, u 가 없어요.' },
        { a: 'forty five', why: '두 낱말 사이에 붙임표(-)를 넣어 forty-five 로 써요.' },
        { a: 'fourteen-five', why: 'fourteen 은 14 예요. 40 은 forty 예요.' },
      ],
      explain: '45 는 40(forty)과 5(five)를 붙임표로 이은 forty-five 예요. four 와 달리 forty 에는 u 가 없어요.',
    },
  ],

  deeper: [
    {
      title: '시각을 말하는 다른 방법',
      body: "이 단원에서는 7:30 을 seven thirty 처럼 수를 차례로 읽는 방법을 배웠어요. 가장 쉽고 많이 쓰는 방법이에요.\n\n영어에는 \"몇 분 지났다\"는 뜻의 past, \"몇 분 전\"이라는 뜻의 to 를 써서 시각을 말하는 방법도 있어요. 이런 말은 학년이 올라가면서 차차 만나게 돼요.\n\n또 시계가 12시간으로 돌기 때문에 아침 7시와 저녁 7시를 영어로 똑같이 seven o'clock 이라고 해요. 어느 쪽인지는 대화의 내용(breakfast 인지 dinner 인지)을 보고 알아요.",
    },
  ],

  faq: [
    {
      q: "o'clock 은 언제 붙여요?",
      a: "분이 없는 정각일 때만 붙여요. 3:00 은 It's three o'clock. 이지만, 3:30 은 It's three thirty. 라고 하고 o'clock 을 붙이지 않아요.",
    },
    {
      q: 'thirteen 이랑 thirty 는 들을 때 어떻게 구별해요?',
      a: 'thirteen 은 뒤쪽 teen 을 세고 길게, thirty 는 앞쪽을 세게 말하고 끝을 짧게 말해요. 쓸 때는 끝 철자(-teen, -ty)를 보면 돼요.',
    },
    {
      q: 'forty 는 왜 u 가 없어요?',
      a: 'four 에는 u 가 있지만 40 을 나타내는 낱말은 forty 로 써요. 철자가 바뀌는 낱말이라 따로 외워 두어야 해요. 14 는 fourteen 으로 u 가 그대로 있어요.',
    },
  ],

  mistakes: [
    "분이 있는데 o'clock 을 붙이는 실수 — 7:30 은 It's seven thirty. 예요.",
    'thirteen(13)과 thirty(30), fifteen(15)과 fifty(50)를 헷갈리는 실수 — 끝이 -teen 이면 10대, -ty 면 몇십이에요.',
    '40 을 fourty 로 쓰는 실수 — forty 에는 u 가 없어요.',
  ],

  gens: [
    {
      id: 'read-clock',
      level: 1,
      title: '시계를 보고 시각 말하기',
      make: function (R) {
        var W = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
          'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        var T = { 2: 'twenty', 3: 'thirty', 4: 'forty', 5: 'fifty', 6: 'sixty' };
        function num(n) { if (n < 20) return W[n]; var o = n % 10; return T[(n - o) / 10] + (o ? '-' + W[o] : ''); }
        function say(h, m) { return "It's " + num(h) + (m === 0 ? " o'clock." : ' ' + num(m) + '.'); }
        var h = R.int(1, 12);
        var m = R.pick([0, 15, 30, 45]);
        var nh = h === 12 ? 1 : h + 1;
        var ph = h === 1 ? 12 : h - 1;
        var correct = say(h, m);
        var hourWhy = '짧은바늘(시를 나타내는 바늘)을 다시 보세요. 짧은바늘이 가리키거나 막 지난 수가 시예요.';
        var cands = [];
        if (m === 0) {
          if (h !== 12) cands.push([say(12, 0), '긴바늘과 짧은바늘을 바꾸어 읽었어요. 짧은바늘이 가리키는 수가 시예요.']);
          cands.push([say(h, 30), "긴바늘이 12를 가리키면 정각이라 o'clock 을 써요. thirty 는 긴바늘이 6을 가리킬 때예요."]);
        } else {
          cands.push(["It's " + num(h) + ' ' + num(m / 5) + '.', '긴바늘이 가리키는 숫자를 그대로 읽었어요. 긴바늘은 숫자 한 칸에 5분씩 세요.']);
          cands.push([say(h, 0), "o'clock 은 긴바늘이 12를 가리키는 정각일 때만 써요."]);
          cands.push([say(nh, m), '짧은바늘이 ' + h + R.josa(h, '과/와') + ' ' + nh + ' 사이에 있으면 아직 ' + nh + '시가 되지 않았어요. 지나온 수를 읽어요.']);
          if (m === 30) cands.push(["It's " + num(h) + ' thirteen.', 'thirteen 은 13 이에요. 30분은 thirty 예요.']);
          if (m === 15) cands.push(["It's " + num(h) + ' fifty.', 'fifty 는 50 이에요. 15분은 fifteen 이에요.']);
        }
        cands.push([say(ph, m), hourWhy]);
        if (m === 0) cands.push([say(nh, m), hourWhy]);
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        var explain = m === 0
          ? '짧은바늘이 ' + h + R.josa(h, '을/를') + ' 가리키고 긴바늘이 12를 가리키니 ' + h + '시 정각이에요. 정각은 o\'clock 으로 말해요: ' + correct
          : '짧은바늘을 보면 ' + h + '시, 긴바늘이 ' + (m / 5) + R.josa(m / 5, '을/를') + ' 가리키니 ' + m + '분이에요. 시를 먼저, 분을 나중에 말해요: ' + correct;
        return {
          type: 'choice', concept: m === 0 ? 0 : 1,
          q: '시계를 보고 What time is it? 에 알맞은 대답을 고르세요.',
          fig: { type: 'clock', h: h, m: m, alt: '시계 그림' },
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: explain,
        };
      },
    },
    {
      id: 'digital-time',
      level: 2,
      title: '디지털시계의 시각을 영어로 말하기',
      make: function (R) {
        var W = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
          'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        var T = { 2: 'twenty', 3: 'thirty', 4: 'forty', 5: 'fifty', 6: 'sixty' };
        function num(n) { if (n < 20) return W[n]; var o = n % 10; return T[(n - o) / 10] + (o ? '-' + W[o] : ''); }
        function say(h, m) { return "It's " + num(h) + ' ' + num(m) + '.'; }
        var h = R.int(1, 12);
        var m = R.int(10, 59);
        var nh = h === 12 ? 1 : h + 1;
        var ph = h === 1 ? 12 : h - 1;
        var correct = say(h, m);
        var cands = [];
        var tenWhy = '-teen(13~19)과 -ty(30, 40, 50)를 헷갈렸어요. ' + m + '분 → ' + num(m);
        if (m >= 13 && m <= 15) cands.push([say(h, (m - 10) * 10), tenWhy]);
        if (m === 30 || m === 40 || m === 50) cands.push([say(h, m / 10 + 10), tenWhy]);
        var rev = (m % 10) * 10 + (m - (m % 10)) / 10;
        if (m % 10 !== 0 && rev >= 10 && rev <= 59 && rev !== m) cands.push([say(h, rev), '분을 나타내는 두 숫자의 순서를 바꾸어 읽었어요. 쌍점 뒤의 숫자를 차례로 읽어요.']);
        cands.push([say(nh, m), '시를 나타내는 수를 다시 보세요. 쌍점(:) 앞의 수가 시예요.']);
        cands.push([say(ph, m), '시를 나타내는 수를 다시 보세요. 쌍점(:) 앞의 수가 시예요.']);
        cands.push([say(h, m <= 49 ? m + 10 : m - 10), '분을 나타내는 수를 다시 보세요. 앞 낱말(몇십)이 맞는지 확인해요.']);
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        var shown = h + ':' + m;
        return {
          type: 'choice', concept: 1,
          q: '디지털시계의 시각을 영어로 바르게 말한 것은 무엇일까요?\n\n**' + shown + '**',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '쌍점 앞의 ' + h + '시 → ' + num(h) + ', 쌍점 뒤의 ' + m + '분 → ' + num(m) + '\n\n시를 먼저, 분을 나중에 말해요: ' + correct,
        };
      },
    },
    {
      id: 'word-to-number',
      level: 1,
      title: '21~60 낱말을 숫자로 쓰기',
      make: function (R) {
        var W = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        var T = { 2: 'twenty', 3: 'thirty', 4: 'forty', 5: 'fifty', 6: 'sixty' };
        var n = R.int(21, 60);
        var o = n % 10;
        var t = (n - o) / 10;
        var word = T[t] + (o ? '-' + W[o] : '');
        var wrong = [];
        if (o === 0 && t >= 3 && t <= 5) {
          wrong.push({ a: String(t + 10), why: '-ty 로 끝나면 몇십이에요. 끝이 -teen 인 낱말(13~19)과 헷갈렸어요.' });
        } else if (o !== 0 && o * 10 + t !== n) {
          wrong.push({ a: String(o * 10 + t), why: '앞 낱말(' + T[t] + ')은 몇십, 곧 십의 자리이고 뒤 낱말(' + W[o] + ')은 일의 자리예요.' });
        }
        var how = o === 0
          ? '끝이 -ty 인 낱말은 몇십이에요. ' + word + ' → ' + n + '.'
          : '붙임표 앞 낱말은 몇십, 뒤 낱말은 일의 자리예요. ' + T[t] + ' → ' + (t * 10) + ', ' + W[o] + ' → ' + o + '.';
        return {
          type: 'short', check: 'number', concept: 2,
          q: '다음 낱말이 나타내는 수를 숫자로 쓰세요.\n\n**' + word + '**',
          answer: String(n),
          wrong: wrong,
          explain: how + ' 그래서 ' + n + R.josa(n, '이에요/예요') + '.',
        };
      },
    },
  ],

  vocab: [
    { w: 'time', m: '시각, 시간', ex: 'What time is it?', exm: '몇 시예요?' },
    { w: 'clock', m: '시계(벽시계·탁상시계)', ex: 'Look at the clock.', exm: '시계를 보세요.' },
    { w: "o'clock", m: '~시 정각', ex: "It's seven o'clock.", exm: '7시예요.' },
    { w: 'twenty', m: '20, 스물', ex: "It's ten twenty.", exm: '10시 20분이에요.' },
    { w: 'thirty', m: '30, 서른', ex: "It's two thirty.", exm: '2시 30분이에요.' },
    { w: 'forty', m: '40, 마흔', ex: "It's six forty.", exm: '6시 40분이에요.' },
    { w: 'fifty', m: '50, 쉰', ex: "It's eleven fifty.", exm: '11시 50분이에요.' },
    { w: 'sixty', m: '60, 예순', ex: 'One hour is sixty minutes.', exm: '1시간은 60분이에요.' },
    { w: 'breakfast', m: '아침 식사', ex: "It's time for breakfast.", exm: '아침 먹을 시간이에요.' },
    { w: 'lunch', m: '점심 식사', ex: "It's twelve thirty. It's time for lunch.", exm: '12시 30분이에요. 점심 먹을 시간이에요.' },
    { w: 'dinner', m: '저녁 식사', ex: "It's six o'clock. It's time for dinner.", exm: '6시예요. 저녁 먹을 시간이에요.' },
    { w: 'school', m: '학교', ex: "It's time for school.", exm: '학교 갈 시간이에요.' },
  ],
});
