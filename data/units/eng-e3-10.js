/* 3학년 영어 · 색깔과 크기 말하기 */
Tutor.registerUnit({
  id: 'eng-e3-10',
  course: 'eng-e3',
  title: '색깔과 크기 말하기',
  summary: 'What color is it?으로 색깔을 묻고 big, small 같은 말로 물건의 크기와 모습을 말해요.',
  goals: [
    '색깔 낱말 red, blue, yellow, green, black, white, pink를 듣고 읽을 수 있어요.',
    "What color is it?으로 색깔을 묻고 It's blue.처럼 대답할 수 있어요.",
    '크기와 길이를 나타내는 big, small, long, short를 알고 쓸 수 있어요.',
    "It's big. It's red. / It's a small ball.처럼 물건의 모습을 말할 수 있어요.",
  ],
  standards: ['[4영02-04]', '[4영02-05]', '[4영01-06]'],

  concepts: [
    {
      title: '색깔 낱말',
      body: '여러 가지 색깔을 영어로 말해 봐요.\n\n| 영어 | 뜻 | 떠오르는 것 |\n|---|---|---|\n| **red** | 빨간색 | 딸기 |\n| **blue** | 파란색 | 맑은 하늘 |\n| **yellow** | 노란색 | 바나나 |\n| **green** | 초록색 | 여름 나뭇잎 |\n| **black** | 검은색 | 밤하늘 |\n| **white** | 흰색 | 눈 |\n| **pink** | 분홍색 | 벚꽃 |\n\n> 💡 색깔 낱말을 외울 때는 그 색을 가진 물건을 하나씩 짝지어 두면 오래 기억나요.',
      easy: '크레용 상자를 열었다고 생각해 보세요. 크레용마다 영어 이름표가 붙어 있어요.\n\n딸기를 칠하는 크레용은 **red**, 바나나를 칠하는 크레용은 **yellow**, 나뭇잎을 칠하는 크레용은 **green**이에요.\n\n주변의 물건을 보며 "red!", "white!" 하고 색깔 이름을 불러 보세요.',
      check: {
        type: 'choice',
        q: "'yellow'의 뜻은 무엇일까요?",
        choices: ['노란색', '초록색', '분홍색'],
        answer: 0,
        why: ['', '초록색은 green이에요.', '분홍색은 pink예요.'],
        explain: 'yellow는 바나나 같은 **노란색**이에요.',
      },
    },
    {
      title: "What color is it? — 색깔 묻고 답하기",
      body: "물건의 색깔을 물을 때는 **What color is it?**이라고 말해요. \"그것은 무슨 색이니?\"라는 뜻이에요.\n\n대답할 때는 **It's** 뒤에 색깔 낱말을 붙여요.\n\n- A: **What color is it?** (그것은 무슨 색이니?)\n- B: **It's blue.** (그것은 파란색이야.)\n\n**It's**는 **It is**를 줄인 말이에요. \"그것은 ~이에요\"라는 뜻이지요.\n\n> ⚠️ 색깔을 물었으니 색깔로 대답해요. What color is it?에 It's big.(그것은 커.)이라고 하면 묻는 말에 맞지 않아요.",
      easy: "**color**는 \"색깔\"이라는 뜻이에요. 그래서 What **color** is it?은 \"무슨 **색깔**이야?\"예요.\n\n대답은 늘 같은 틀이에요. **It's** + 색깔.\n\n- It's red.\n- It's green.\n\n틀은 그대로 두고 색깔 낱말만 바꿔 끼우면 돼요.",
      check: {
        type: 'ox',
        q: "'What color is it?'은 '그것은 무슨 색이니?'라는 뜻이에요.",
        answer: true,
        explain: 'color는 "색깔"이에요. What color is it?은 그것이 무슨 색인지 묻는 말이에요.',
      },
    },
    {
      title: '크기와 길이를 나타내는 말',
      body: '물건의 크기와 길이를 말하는 낱말이에요. 서로 **반대말**끼리 짝지어 기억해요.\n\n| 낱말 | 뜻 | 반대말 | 뜻 |\n|---|---|---|---|\n| **big** | 큰 | **small** | 작은 |\n| **long** | 긴 | **short** | 짧은 |\n\n- 코끼리는 **big**, 개미는 **small**이에요.\n- 기린의 목은 **long**, 토끼의 꼬리는 **short**예요.\n\n> 💡 **big·small**은 전체가 크고 작은 것, **long·short**는 길쭉한 것의 길이가 길고 짧은 것을 말해요.',
      easy: '두 손을 크게 벌리면서 "big!", 손가락을 오므리면서 "small!" 하고 말해 보세요.\n\n이번에는 두 팔을 양옆으로 쭉 펴면서 "long!", 두 손을 가깝게 모으면서 "short!" 하고 말해 보세요.\n\n몸으로 크기와 길이를 흉내 내면 낱말 뜻이 쉽게 떠올라요.',
      check: {
        type: 'choice',
        q: "'long'의 반대말은 무엇일까요?",
        choices: ['short', 'small', 'big'],
        answer: 0,
        why: ['', 'small은 big의 반대말이에요. "작은"이라는 뜻이에요.', 'big은 "큰"이에요. long(긴)의 반대말은 short(짧은)예요.'],
        explain: 'long(긴)의 반대말은 **short**(짧은)예요. big(큰)의 반대말은 small(작은)이에요.',
      },
    },
    {
      title: '물건의 모습 말하기',
      body: "물건의 모습은 두 가지 방법으로 말할 수 있어요.\n\n**1. It's + 꾸미는 말**\n\n- **It's big.** 그것은 커요.\n- **It's red.** 그것은 빨간색이에요.\n\n**2. It's a + 꾸미는 말 + 물건 이름**\n\n- **It's a small ball.** 그것은 작은 공이에요.\n- **It's a red bag.** 그것은 빨간 가방이에요.\n\n크기나 색깔을 나타내는 말은 **물건 이름 앞**에 와요. 우리말 \"작은 공\"과 순서가 같아요.\n\n> ⚠️ a ball small(X), a small ball(O)",
      easy: '우리말로 "빨간 가방"이라고 할 때 "빨간"이 "가방" 앞에 오지요? 영어도 똑같아요.\n\n- 빨간 + 가방 → **red** + **bag** → a red bag\n- 작은 + 공 → **small** + **ball** → a small ball\n\n꾸미는 말이 먼저, 물건 이름이 나중이에요.',
      check: {
        type: 'choice',
        q: "'빨간 가방'을 영어로 바르게 나타낸 것은 무엇일까요?",
        choices: ['a red bag', 'a bag red', 'red a bag'],
        answer: 0,
        why: ['', '색깔 낱말은 물건 이름 앞에 와요.', 'a는 꾸미는 말보다 앞에 와요. a red bag이에요.'],
        explain: '색깔을 나타내는 red는 물건 이름 bag 앞에 와요. 그래서 **a red bag**이에요.',
      },
    },
  ],

  examples: [
    {
      q: "노란 바나나를 보며 친구가 물었어요. 알맞게 대답해 보세요.\n\nA: What color is it?\nB: [[........]]",
      steps: [
        'What color is it?은 "그것은 무슨 색이니?"라고 묻는 말이에요.',
        '바나나는 노란색이고, 노란색은 yellow예요.',
        "색깔을 대답할 때는 It's 뒤에 색깔 낱말을 붙여요.",
      ],
      answer: "It's yellow.",
    },
    {
      q: "'그것은 작은 공이에요.'를 영어로 말해 보세요.",
      steps: [
        "\"그것은 ~이에요\"는 It's로 시작해요.",
        '공 하나이니 a를 써요.',
        '"작은"은 small이고, 물건 이름 ball 앞에 와요.',
        "모두 이으면 It's a small ball.이에요.",
      ],
      answer: "It's a small ball.",
    },
  ],

  terms: [
    { term: 'What color is it?', def: '"그것은 무슨 색이니?"라고 색깔을 묻는 말이에요.' },
    { term: "It's ~.", def: "\"그것은 ~이에요.\"라는 뜻이에요. It's는 It is를 줄인 말이에요. 예: It's blue." },
    { term: 'color', def: '"색깔"이라는 뜻의 낱말이에요. red, blue, yellow 같은 낱말이 색깔 낱말이에요.' },
    { term: '반대말', def: '뜻이 서로 반대인 낱말이에요. 예: big(큰) ↔ small(작은), long(긴) ↔ short(짧은)' },
    { term: '꾸미는 말', def: '물건이 어떤지 알려 주는 말이에요. 크기나 색깔을 나타내는 말은 물건 이름 앞에 와요. 예: a **small** ball' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: "'green'의 뜻은 무엇일까요?",
      choices: ['초록색', '파란색', '노란색', '검은색'],
      answer: 0,
      why: ['', '파란색은 blue예요.', '노란색은 yellow예요.', '검은색은 black이에요.'],
      explain: 'green은 여름 나뭇잎 같은 **초록색**이에요.',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 0,
      q: "'빨간색'을 뜻하는 영어 낱말을 써 보세요. r로 시작해요.",
      answer: ['red'],
      wrong: [{ a: 'pink', why: 'pink는 분홍색이에요. 빨간색은 red예요.' }],
      explain: '딸기 같은 빨간색은 **red**예요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '물건의 **색깔**을 물을 때 하는 말로 알맞은 것은 무엇일까요?',
      choices: ['What color is it?', 'What is it?', 'How many apples?', 'Do you have a crayon?'],
      answer: 0,
      why: ['', 'What is it?은 "그것은 무엇이니?"라고 물건 이름을 묻는 말이에요.', 'How many ~?는 개수를 묻는 말이에요.', 'Do you have ~?는 가지고 있는지 묻는 말이에요.'],
      explain: '색깔(color)을 물을 때는 **What color is it?**이라고 해요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: "'It's blue.'는 '그것은 파란색이에요.'라는 뜻이에요.",
      answer: true,
      explain: "It's는 \"그것은 ~이에요\", blue는 파란색이에요. 그래서 \"그것은 파란색이에요.\"라는 뜻이 맞아요.",
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: "'big'의 반대말은 무엇일까요?",
      choices: ['small', 'long', 'short', 'pink'],
      answer: 0,
      why: ['', 'long은 "긴"이에요. short의 반대말이에요.', 'short는 "짧은"이에요. long의 반대말이에요.', 'pink는 분홍색이에요. 크기를 나타내는 말이 아니에요.'],
      explain: 'big(큰)의 반대말은 **small**(작은)이에요.',
    },
    {
      id: 'p6', level: 1, type: 'short', concept: 0,
      q: '하얀 눈사람을 보며 친구가 물었어요. 빈칸에 알맞은 색깔 낱말을 써 보세요.\n\nA: What color is it?\nB: It\'s [[........]].',
      answer: ['white'],
      wrong: [{ a: 'black', why: 'black은 검은색이에요. 하얀색은 white예요.' }],
      explain: '눈사람은 흰색이에요. 흰색은 **white**이므로 It\'s white.라고 대답해요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 1,
      q: '분홍색 모자를 보며 친구가 물었어요. 알맞은 대답은 무엇일까요?\n\nA: What color is it?\nB: [[........]]',
      choices: ["It's pink.", "It's big.", "Yes, it's pink.", "It's a hat."],
      answer: 0,
      why: [
        '',
        "It's big.은 크기를 말한 거예요. 색깔을 물었으니 색깔로 대답해요.",
        'What으로 물은 질문에는 Yes로 대답하지 않아요.',
        "It's a hat.은 물건 이름을 말한 거예요. 색깔을 물었어요.",
      ],
      explain: "색깔을 물었으니 It's 뒤에 색깔 낱말을 붙여 **It's pink.**라고 대답해요.",
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 3,
      q: "낱말을 바르게 늘어놓아 '그것은 작은 공이에요.'라는 문장을 만드세요.",
      choices: ["It's", 'a', 'small', 'ball'],
      answer: [0, 1, 2, 3],
      hint: '"작은"은 "공" 앞에 와요.',
      explain: "It's(그것은 ~이에요) → a(하나) → small(작은) → ball(공) 순서로 **It's a small ball.**이에요.",
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '민수의 말을 읽고 물음에 답하세요.\n\nMinsu: I have a bag. It\'s big. It\'s green.\n\n민수의 가방은 어떤 가방일까요?',
      choices: ['크고 초록색인 가방', '작고 초록색인 가방', '크고 파란색인 가방', '작고 노란색인 가방'],
      answer: 0,
      why: ['', 'big은 "큰"이에요. "작은"은 small이에요.', 'green은 초록색이에요. 파란색은 blue예요.', 'big(큰)과 green(초록색)을 다시 확인해 보세요.'],
      hint: "It's 뒤에 오는 낱말 두 개의 뜻을 떠올려 보세요.",
      explain: "It's big.은 \"그것은 커요.\", It's green.은 \"그것은 초록색이에요.\"예요. 그래서 크고 초록색인 가방이에요.",
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: "'작은 고양이 한 마리'를 영어로 바르게 나타낸 것은 무엇일까요?",
      choices: ['a small cat', 'a cat small', 'small a cat', 'a small cats'],
      answer: 0,
      why: ['', '크기를 나타내는 말은 물건 이름 앞에 와요.', 'a는 꾸미는 말보다 앞에 와요.', '한 마리이니 cat 끝에 s를 붙이지 않아요.'],
      explain: 'a(하나) + small(작은) + cat(고양이) 순서로 **a small cat**이에요.',
    },
    {
      id: 'p11', level: 2, type: 'short', concept: 2,
      q: "'long'의 반대말을 영어로 써 보세요.",
      answer: ['short'],
      wrong: [{ a: 'small', why: 'small은 big의 반대말이에요. long(긴)의 반대말은 "짧은"이라는 뜻의 낱말이에요.' }],
      hint: '"긴"의 반대는 "짧은"이에요.',
      explain: 'long(긴)의 반대말은 **short**(짧은)예요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 1,
      q: '대화가 **자연스럽지 않은** 것을 고르세요.',
      choices: [
        "A: What color is it? B: It's small.",
        "A: What color is it? B: It's black.",
        "A: What is it? B: It's a ball.",
        "A: Do you have a marker? B: Yes, I do.",
      ],
      answer: 0,
      why: ['', '색깔을 묻고 검은색이라고 바르게 대답했어요.', '무엇인지 묻고 공이라고 바르게 대답했어요.', '가지고 있는지 묻고 있다고 바르게 대답했어요.'],
      explain: "What color is it?은 색깔을 묻는 말이에요. It's small.은 크기를 말한 것이라 알맞지 않아요.",
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: '수수께끼를 읽고 알맞은 것을 고르세요.\n\nIt\'s small. It\'s red.\n\n이것은 무엇일까요?',
      choices: ['딸기', '수박', '바나나', '코끼리'],
      answer: 0,
      why: ['', '수박은 커요. small은 "작은"이에요.', '바나나는 노란색(yellow)이에요.', '코끼리는 커요(big). 빨간색도 아니에요.'],
      hint: 'small과 red의 뜻을 먼저 떠올려 보세요.',
      explain: 'small은 "작은", red는 "빨간색"이에요. 작고 빨간 것은 **딸기**예요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '그림 대신 낱말로 설명했어요. 설명이 **맞지 않는** 것을 고르세요.',
      choices: ["개미 — It's big.", "코끼리 — It's big.", "기린의 목 — It's long.", "눈 — It's white."],
      answer: 0,
      why: ['', '코끼리는 커요. big이 맞아요.', '기린의 목은 길어요. long이 맞아요.', '눈은 흰색이에요. white가 맞아요.'],
      hint: '각 낱말의 뜻을 우리말로 바꾸어 보세요.',
      explain: "개미는 아주 작아요. 그러니 It's small.이라고 해야 맞아요. big은 \"큰\"이에요.",
    },
    {
      id: 'a3', level: 3, type: 'short', concept: 1,
      q: '지아의 말을 읽고 물음에 답하세요.\n\nJia: I have a ball. It\'s small. It\'s blue.\n\n친구가 지아의 공을 가리키며 "What color is it?"이라고 물었어요. 빈칸에 알맞은 낱말을 써 보세요.\n\nJia: It\'s [[........]].',
      answer: ['blue'],
      wrong: [{ a: 'small', why: 'small은 크기를 나타내는 말이에요. 색깔을 물었으니 색깔 낱말을 찾아요.' }],
      hint: '지아의 말에서 색깔 낱말을 찾아보세요.',
      explain: "What color is it?은 색깔을 묻는 말이에요. 지아의 공은 파란색(blue)이므로 **It's blue.**라고 대답해요.",
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      q: '대화를 읽고 물음에 답하세요.\n\nA: Do you have a ruler?\nB: Yes, I do. It\'s long. It\'s yellow.\n\nB가 가진 자는 어떤 자일까요?',
      choices: ['길고 노란색인 자', '짧고 노란색인 자', '길고 초록색인 자', '크고 흰색인 자'],
      answer: 0,
      why: ['', 'long은 "긴"이에요. "짧은"은 short예요.', 'yellow는 노란색이에요. 초록색은 green이에요.', 'long은 "긴", yellow는 노란색이에요. 다시 확인해 보세요.'],
      hint: 'Yes, I do. 다음에 오는 두 문장이 자의 모습이에요.',
      explain: "B는 자를 가지고 있어요(Yes, I do.). It's long.은 \"그것은 길어요.\", It's yellow.는 \"그것은 노란색이에요.\"이므로 **길고 노란색인 자**예요.",
    },
  ],

  deeper: [
    {
      title: '색깔과 크기를 함께 말하기',
      body: "크기와 색깔을 한꺼번에 말할 수도 있어요.\n\n- **It's a big red ball.** 그것은 크고 빨간 공이에요.\n- **It's a small white cat.** 그것은 작고 하얀 고양이예요.\n\n이때 영어에서는 보통 **크기 → 색깔 → 물건 이름** 순서로 말해요. a red big ball보다 a big red ball이 자연스러워요.\n\n지금은 It's big. It's red.처럼 한 문장에 하나씩 말해도 충분해요. 위로 올라가면 더 많은 꾸미는 말을 이어서 쓰는 법을 배워요.",
    },
  ],

  faq: [
    {
      q: "It's랑 It is는 달라요?",
      a: "뜻은 같아요. **It's**는 **It is**를 줄여 쓴 말이에요. 친구와 말할 때는 줄인 It's를 많이 써요. 줄인 자리에는 작은 점 같은 표시(')를 찍어요.",
    },
    {
      q: 'small이랑 short는 둘 다 "작다"는 뜻 아니에요?',
      a: '**small**은 물건 전체가 작을 때(작은 공, 작은 개미), **short**는 길쭉한 것의 길이가 짧을 때(짧은 연필, 짧은 꼬리) 써요. 반대말로 짝지으면 쉬워요. big ↔ small, long ↔ short.',
    },
    {
      q: "What color is it?에 Yes나 No로 대답해도 돼요?",
      a: "아니요. What(무엇)으로 묻는 질문은 \"무슨 색인지\"를 알고 싶은 거라서 Yes나 No로 대답하지 않아요. It's red.처럼 색깔을 말해 줘요.",
    },
  ],

  mistakes: [
    "What color is it?에 It's big.처럼 크기로 대답하는 실수 — 색깔을 물었으니 **It's red.**처럼 색깔로 대답해요.",
    '"작은 공"을 a ball small이라고 쓰는 실수 — 꾸미는 말은 물건 이름 앞에 와요. **a small ball**',
    'long의 반대말을 small이라고 하는 실수 — long ↔ **short**, big ↔ **small**이에요.',
  ],

  gens: [
    {
      id: 'answer-color',
      level: 1,
      title: 'What color is it?에 알맞게 대답하기',
      make: function (R) {
        var colors = [
          ['red', '빨간색', '는'], ['blue', '파란색', '는'], ['yellow', '노란색', '는'], ['green', '초록색', '은'],
          ['black', '검은색', '은'], ['white', '흰색', '는'], ['pink', '분홍색', '는'],
        ];
        var things = ['가방', '모자', '우산', '공', '상자', '컵'];
        var names = ['민수', '지아', '서준', '하윤', '도윤', '수아'];
        var c = R.pick(colors);
        var thing = R.pick(things);
        var name = R.pick(names);
        var correct = "It's " + c[0] + '.';
        var reason = {};
        var wrongs = R.sample(colors.filter(function (x) { return x[0] !== c[0]; }), 3).map(function (x) {
          var s = "It's " + x[0] + '.';
          reason[s] = x[0] + x[2] + ' ' + x[1] + '이에요. ' + thing + R.josa(thing, '은/는') + ' ' + c[1] + '이에요.';
          return s;
        });
        var size = R.pick(["It's big.", "It's small."]);
        reason[size] = '크기를 말했어요. 색깔을 물었으니 색깔로 대답해요.';
        var pick = R.choices(correct, wrongs.concat([size]));
        return {
          type: 'choice', concept: 1,
          q: name + '의 ' + thing + R.josa(thing, '은/는') + ' ' + c[1] + '이에요. 친구가 ' + thing + R.josa(thing, '을/를') + ' 가리키며 물었어요.\n\nWhat color is it?\n\n알맞은 대답은 무엇일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (x) { return x === correct ? '' : reason[x] || ''; }),
          explain: c[1] + '은 영어로 **' + c[0] + '**, 색깔을 물었으니 **' + correct + '**라고 대답해요.',
        };
      },
    },
    {
      id: 'order-describe',
      level: 2,
      title: "It's a ~ 문장 만들기",
      make: function (R) {
        var nouns = [['ball', '공'], ['bag', '가방'], ['hat', '모자'], ['box', '상자'], ['cat', '고양이'], ['dog', '개']];
        var longs = [['pencil', '연필'], ['ruler', '자']];
        var adjs = [
          ['big', '큰', 'size'], ['small', '작은', 'size'], ['long', '긴', 'len'], ['short', '짧은', 'len'],
          ['red', '빨간', 'color'], ['blue', '파란', 'color'], ['yellow', '노란', 'color'], ['green', '초록색', 'color'],
          ['black', '검은', 'color'], ['white', '하얀', 'color'], ['pink', '분홍색', 'color'],
        ];
        var adj = R.pick(adjs);
        var noun = adj[2] === 'len' ? R.pick(longs) : adj[2] === 'size' ? R.pick(nouns) : R.pick(nouns.concat(longs));
        var kor = adj[1] + ' ' + noun[1];
        return {
          type: 'order', concept: 3,
          q: "낱말을 바르게 늘어놓아 '그것은 " + kor + R.josa(noun[1], '이에요/예요') + ".'라는 문장을 만드세요.",
          choices: ["It's", 'a', adj[0], noun[0]],
          answer: [0, 1, 2, 3],
          hint: '꾸미는 말은 물건 이름 앞에 와요.',
          explain: "It's(그것은 ~이에요) → a(하나) → " + adj[0] + '(' + adj[1] + ') → ' + noun[0] + '(' + noun[1] + ") 순서예요. **It's a " + adj[0] + ' ' + noun[0] + '.**',
        };
      },
    },
  ],

  vocab: [
    { w: 'red', m: '빨간색', ex: 'The strawberry is **red**.', exm: '딸기는 빨간색이에요.' },
    { w: 'blue', m: '파란색', ex: "What color is it? It's **blue**.", exm: '그것은 무슨 색이니? 파란색이야.' },
    { w: 'yellow', m: '노란색', ex: 'I have a **yellow** hat.', exm: '나는 노란 모자가 있어요.' },
    { w: 'green', m: '초록색', ex: "It's a **green** bag.", exm: '그것은 초록색 가방이에요.' },
    { w: 'black', m: '검은색', ex: 'The cat is **black**.', exm: '그 고양이는 검은색이에요.' },
    { w: 'white', m: '흰색', ex: 'Snow is **white**.', exm: '눈은 흰색이에요.' },
    { w: 'pink', m: '분홍색', ex: "It's **pink**.", exm: '그것은 분홍색이에요.' },
    { w: 'color', m: '색깔', ex: 'What **color** is it?', exm: '그것은 무슨 색이니?' },
    { w: 'big', m: '큰', ex: "It's a **big** box.", exm: '그것은 큰 상자예요.' },
    { w: 'small', m: '작은', ex: "It's a **small** ball.", exm: '그것은 작은 공이에요.' },
    { w: 'long', m: '긴', ex: "It's a **long** pencil.", exm: '그것은 긴 연필이에요.' },
    { w: 'short', m: '짧은', ex: "It's **short**.", exm: '그것은 짧아요.' },
  ],
});
