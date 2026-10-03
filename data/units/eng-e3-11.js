/* 3학년 영어 · 할 수 있는 일 말하기 */
Tutor.registerUnit({
  id: 'eng-e3-11',
  course: 'eng-e3',
  title: '할 수 있는 일 말하기',
  summary: "I can ~.으로 할 수 있는 일을, I can't ~.으로 못 하는 일을 말하고 Can you ~?로 물어요.",
  goals: [
    '동작을 나타내는 낱말 swim, run, jump, dance, sing, skate를 듣고 읽을 수 있어요.',
    "I can ~.으로 할 수 있는 일을, I can't ~.으로 할 수 없는 일을 말할 수 있어요.",
    "Can you ~?로 묻고 Yes, I can. / No, I can't.로 대답할 수 있어요.",
  ],
  standards: ['[4영02-04]', '[4영02-08]', '[4영01-07]'],

  concepts: [
    {
      title: '동작을 나타내는 낱말',
      body: '몸을 움직여 하는 일을 영어로 말해 봐요.\n\n| 영어 | 뜻 |\n|---|---|\n| **swim** | 수영하다 |\n| **run** | 달리다 |\n| **jump** | 뛰어오르다(점프하다) |\n| **dance** | 춤추다 |\n| **sing** | 노래하다 |\n| **skate** | 스케이트를 타다 |\n\n이 낱말들은 "무엇을 하는지"를 나타내요. 그래서 "~하다"로 뜻을 기억해요.\n\n> 💡 **skate**는 "스케이트"라는 물건이 아니라 "스케이트를 타다"라는 동작이에요.',
      easy: '낱말을 말하면서 몸으로 흉내 내 보세요.\n\n- **swim**: 두 팔로 물을 젓는 흉내\n- **run**: 제자리에서 달리기\n- **jump**: 폴짝 뛰기\n- **dance**: 몸을 흔들며 춤추기\n- **sing**: "라라라" 노래하기\n- **skate**: 얼음 위를 미끄러지듯 발 밀기\n\n몸이 기억하면 낱말도 오래 기억나요.',
      check: {
        type: 'choice',
        q: "'sing'의 뜻은 무엇일까요?",
        choices: ['노래하다', '춤추다', '수영하다'],
        answer: 0,
        why: ['', '춤추다는 dance예요.', '수영하다는 swim이에요.'],
        explain: 'sing은 **노래하다**라는 뜻이에요.',
      },
    },
    {
      title: 'I can ~. — 할 수 있는 일 말하기',
      body: '내가 할 수 있는 일을 말할 때는 **I can** 뒤에 동작 낱말을 붙여요. **can**은 "~할 수 있다"라는 뜻이에요.\n\n- **I can dance.** 나는 춤출 수 있어요.\n- **I can swim.** 나는 수영할 수 있어요.\n- **I can jump.** 나는 점프할 수 있어요.\n\n> ⚠️ can 뒤에는 동작 낱말을 **그대로** 써요. I can swims.(X), I can swim.(O)',
      easy: '**can**은 "할 수 있어!" 하고 자신 있게 말하는 낱말이에요.\n\n"I can" 뒤에 동작 낱말을 끼우면 문장이 완성돼요.\n\n- I can + run → 나는 달릴 수 있어요.\n- I can + sing → 나는 노래할 수 있어요.',
      check: {
        type: 'ox',
        q: "'I can swim.'은 '나는 수영할 수 있어요.'라는 뜻이에요.",
        answer: true,
        explain: 'can은 "~할 수 있다", swim은 "수영하다"예요. 그래서 "나는 수영할 수 있어요."라는 뜻이 맞아요.',
      },
    },
    {
      title: "I can't ~. — 할 수 없는 일 말하기",
      body: "할 수 없는 일을 말할 때는 **I can't** 뒤에 동작 낱말을 붙여요. **can't**는 \"~할 수 없다\"라는 뜻이에요.\n\n- **I can't skate.** 나는 스케이트를 탈 수 없어요.\n- **I can't sing.** 나는 노래할 수 없어요.\n\n**can't**는 **cannot**을 줄인 말이에요. cannot은 보통 띄어 쓰지 않고 한 낱말로 붙여 써요.\n\n| 할 수 있어요 | 할 수 없어요 |\n|---|---|\n| I can swim. | I can't swim. |\n| I can dance. | I can't dance. |",
      easy: "can 끝에 꼬리 **'t**가 붙으면 뜻이 반대로 바뀌어요.\n\n- can: 할 수 있어요\n- can**'t**: 할 수 없어요\n\n소리를 잘 들어 보세요. can't는 끝에 짧은 t 소리가 나요. 이 작은 소리 하나로 뜻이 반대가 되니 귀를 쫑긋 세워요.",
      check: {
        type: 'choice',
        q: "'나는 스케이트를 탈 수 없어요.'를 영어로 바르게 나타낸 것은 무엇일까요?",
        choices: ["I can't skate.", 'I can skate.', "I don't skate."],
        answer: 0,
        why: ['', 'I can skate.는 "나는 스케이트를 탈 수 있어요."예요.', "don't는 \"~하지 않아요\"예요. \"할 수 없다\"는 can't예요."],
        explain: "할 수 없는 일은 **I can't** 뒤에 동작 낱말을 붙여요. **I can't skate.**",
      },
    },
    {
      title: "Can you ~? — 할 수 있는지 묻고 답하기",
      body: "친구가 무엇을 할 수 있는지 물을 때는 **Can you** 뒤에 동작 낱말을 붙여요.\n\n- A: **Can you sing?** (너는 노래할 수 있니?)\n- B: **Yes, I can.** (응, 할 수 있어.) / **No, I can't.** (아니, 할 수 없어.)\n\n질문이 **Can**으로 시작했으니 대답에도 **can**을 써요.\n\n| 질문 | 그렇다 | 아니다 |\n|---|---|---|\n| Do you have ~? | Yes, I do. | No, I don't. |\n| Can you ~? | Yes, I can. | No, I can't. |\n\n> 💡 질문의 첫 낱말(Do, Can)을 대답에서 다시 쓴다고 기억해요.",
      easy: '"Can you ~?"는 "너 ~할 수 있어?"라고 묻는 말이에요.\n\n질문의 첫 낱말 **Can**을 받아서 그대로 대답에 넣어요.\n\n- Can you jump? → Yes, I **can**.\n- 못 하면 → No, I **can\'t**.\n\n앞 단원에서 Do로 물으면 do로 대답한 것과 똑같아요.',
      check: {
        type: 'choice',
        q: '지아는 노래를 잘 불러요. 친구가 "Can you sing?"이라고 물었을 때 지아의 대답으로 알맞은 것은 무엇일까요?',
        choices: ['Yes, I can.', 'Yes, I do.', "No, I can't."],
        answer: 0,
        why: ['', 'Can으로 물었으니 대답에도 can을 써요.', "No, I can't.는 \"아니, 할 수 없어.\"예요. 지아는 노래를 잘 불러요."],
        explain: '노래할 수 있으니 **Yes, I can.**이라고 대답해요. Can으로 물으면 can으로 대답해요.',
      },
    },
  ],

  examples: [
    {
      q: "서준이는 점프를 잘해요. 대화의 빈칸에 알맞은 말을 써 보세요.\n\nA: Can you jump?\n서준: [[........]]",
      steps: [
        'Can you jump?는 "너는 점프할 수 있니?"라고 묻는 말이에요.',
        '서준이는 점프를 잘하니 할 수 있다고 대답해요.',
        'Can으로 물었으니 대답에도 can을 써요. 그래서 Yes, I can.이에요.',
      ],
      answer: 'Yes, I can.',
    },
    {
      q: "'나는 달릴 수 있어요. 나는 수영할 수 없어요.'를 영어로 말해 보세요.",
      steps: [
        '"달리다"는 run, "수영하다"는 swim이에요.',
        "할 수 있는 일은 I can 뒤에 붙여요: I can run.",
        "할 수 없는 일은 I can't 뒤에 붙여요: I can't swim.",
      ],
      answer: "I can run. I can't swim.",
    },
  ],

  terms: [
    { term: 'can', def: '"~할 수 있다"라는 뜻이에요. 뒤에 동작 낱말이 와요. 예: I can dance.' },
    { term: "can't", def: "\"~할 수 없다\"라는 뜻이에요. cannot을 줄인 말이에요. 예: I can't skate." },
    { term: 'Can you ~?', def: '"너는 ~할 수 있니?"라고 묻는 말이에요. Yes, I can. 또는 No, I can\'t.로 대답해요.' },
    { term: '동작을 나타내는 낱말', def: '무엇을 하는지 나타내는 낱말이에요. 예: swim(수영하다), run(달리다), dance(춤추다)' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: "'swim'의 뜻은 무엇일까요?",
      choices: ['수영하다', '달리다', '춤추다', '노래하다'],
      answer: 0,
      why: ['', '달리다는 run이에요.', '춤추다는 dance예요.', '노래하다는 sing이에요.'],
      explain: 'swim은 **수영하다**라는 뜻이에요.',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 0,
      q: "'춤추다'를 뜻하는 영어 낱말을 써 보세요. d로 시작해요.",
      answer: ['dance'],
      wrong: [{ a: 'sing', why: 'sing은 "노래하다"예요. 춤추다는 dance예요.' }],
      explain: '춤추다는 **dance**예요. I can dance.(나는 춤출 수 있어요.)처럼 써요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: "'I can jump.'의 뜻으로 알맞은 것은 무엇일까요?",
      choices: ['나는 점프할 수 있어요.', '나는 점프할 수 없어요.', '너는 점프할 수 있니?', '나는 점프를 좋아해요.'],
      answer: 0,
      why: ['', "\"할 수 없어요\"는 can't예요. 여기에는 can이 있어요.", '"너는 ~할 수 있니?"는 Can you ~?예요.', '"좋아해요"는 like예요. can은 "할 수 있다"예요.'],
      explain: 'can은 "~할 수 있다", jump는 "점프하다"예요. 그래서 "나는 점프할 수 있어요."예요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: "'I can't skate.'는 '나는 스케이트를 탈 수 있어요.'라는 뜻이에요.",
      answer: false,
      explain: "can't는 \"~할 수 없다\"예요. I can't skate.는 \"나는 스케이트를 탈 수 **없어요**.\"라는 뜻이에요.",
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '민수는 노래를 못 불러요. 친구가 물었을 때 민수의 대답으로 알맞은 것은 무엇일까요?\n\nA: Can you sing?\n민수: [[........]]',
      choices: ["No, I can't.", 'Yes, I can.', "No, I don't.", 'Yes, I do.'],
      answer: 0,
      why: ['', 'Yes, I can.은 "응, 할 수 있어."예요. 민수는 노래를 못 불러요.', "Can으로 물었으니 대답에도 can을 써요. No, I can't.예요.", 'Can으로 물었으니 대답에도 can을 써요. 또 민수는 노래를 못 불러요.'],
      explain: "할 수 없을 때는 **No, I can't.**라고 대답해요.",
    },
    {
      id: 'p6', level: 1, type: 'short', concept: 3,
      q: '빈칸에 알맞은 낱말을 써 보세요.\n\nA: Can you run?\nB: Yes, I [[........]].',
      answer: ['can'],
      wrong: [{ a: 'do', why: 'Do로 물을 때 do로 대답해요. 이 질문은 Can으로 물었으니 can으로 대답해요.' }],
      explain: 'Can you ~?에 할 수 있다고 대답할 때는 **Yes, I can.**이에요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: "'Can you dance?'의 뜻으로 알맞은 것은 무엇일까요?",
      choices: ['너는 춤출 수 있니?', '나는 춤출 수 있어.', '너는 춤을 좋아하니?', '너는 춤출 수 없어.'],
      answer: 0,
      why: ['', '"나는 춤출 수 있어."는 I can dance.예요. Can you로 시작하면 묻는 말이에요.', '"좋아하니?"는 Do you like ~?예요.', "\"할 수 없어\"는 can't예요. 이 문장은 묻는 말이에요."],
      explain: 'Can you ~?는 "너는 ~할 수 있니?"라고 묻는 말이에요. dance는 "춤추다"예요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 3,
      q: "낱말을 바르게 늘어놓아 '너는 스케이트를 탈 수 있니?'라는 문장을 만드세요.",
      choices: ['Can', 'you', 'skate'],
      answer: [0, 1, 2],
      hint: '묻는 말은 Can이 맨 앞에 와요.',
      explain: '할 수 있는지 물을 때는 Can → you → 동작 낱말 순서예요. **Can you skate?**',
    },
    {
      id: 'p9', level: 2, type: 'short', concept: 2,
      q: "can't를 줄이지 않은 모양으로 써 보세요.",
      answer: ['cannot'],
      wrong: [{ a: 'can', why: "can은 \"할 수 있다\"예요. can't는 \"할 수 없다\"이니 not이 들어가야 해요." }],
      hint: "can't의 't는 not을 줄인 거예요.",
      explain: "can't는 **cannot**을 줄인 말이에요. cannot은 보통 한 낱말로 붙여 써요.",
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 2,
      q: "서준이의 말을 읽고 물음에 답하세요.\n\nSeojun: I can swim. I can run. I can't sing.\n\n서준이가 **할 수 없다고** 말한 것은 무엇일까요?",
      choices: ['노래하기', '수영하기', '달리기'],
      answer: 0,
      why: ['', 'I can swim.은 수영할 수 있다는 말이에요.', 'I can run.은 달릴 수 있다는 말이에요.'],
      hint: "can't가 들어 있는 문장을 찾아보세요.",
      explain: "I can't sing.은 \"나는 노래할 수 없어요.\"예요. 수영과 달리기는 할 수 있다고(I can) 했어요.",
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '대화가 **자연스럽지 않은** 것을 고르세요.',
      choices: [
        'A: Can you dance? B: Yes, I do.',
        'A: Can you swim? B: Yes, I can.',
        "A: Can you jump? B: No, I can't.",
        'A: Do you have a brush? B: Yes, I do.',
      ],
      answer: 0,
      why: ['', 'Can으로 묻고 can으로 바르게 대답했어요.', "Can으로 묻고 can't로 바르게 대답했어요.", 'Do로 묻고 do로 바르게 대답했어요.'],
      explain: 'Can you ~?에는 Yes, I can. 또는 No, I can\'t.로 대답해요. Yes, I do.는 Do로 물을 때의 대답이에요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 2,
      q: "표를 보고 지아가 할 말로 알맞은 것을 고르세요. (O: 할 수 있어요, X: 할 수 없어요)\n\n| | swim | skate |\n|---|---|---|\n| 지아 | O | X |",
      choices: ["I can swim. I can't skate.", "I can skate. I can't swim.", 'I can swim. I can skate.', "I can't swim. I can't skate."],
      answer: 0,
      why: ['', '거꾸로 말했어요. 지아는 수영은 할 수 있고 스케이트는 못 타요.', '지아는 스케이트를 탈 수 없어요(X).', '지아는 수영을 할 수 있어요(O).'],
      hint: 'O는 I can, X는 I can\'t로 바꾸어 보세요.',
      explain: "swim은 O이니 I can swim., skate는 X이니 I can't skate.예요.",
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: "표를 보고 물음에 답하세요. (O: 할 수 있어요, X: 할 수 없어요)\n\n| | swim | skate | dance |\n|---|---|---|---|\n| 민수 | O | X | O |\n| 하윤 | X | O | O |\n\n하윤이에게 \"Can you swim?\"이라고 물으면 하윤이는 어떻게 대답할까요?",
      choices: ["No, I can't.", 'Yes, I can.', "No, I don't.", 'I can swim.'],
      answer: 0,
      why: ['', '하윤이의 swim 칸은 X예요. 민수의 칸과 헷갈리지 않았는지 확인해 보세요.', "Can으로 물었으니 can으로 대답해요.", '하윤이는 수영을 할 수 없어요(X).'],
      hint: '하윤이의 줄에서 swim 칸을 찾아보세요.',
      explain: "하윤이의 swim 칸은 X이므로 수영을 할 수 없어요. 그래서 **No, I can't.**라고 대답해요.",
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: "표를 보고 물음에 답하세요. (O: 할 수 있어요, X: 할 수 없어요)\n\n| | swim | skate | dance |\n|---|---|---|---|\n| 민수 | O | X | O |\n| 하윤 | X | O | O |\n\n민수와 하윤이가 **둘 다** \"I can ~.\"이라고 말할 수 있는 것은 무엇일까요?",
      choices: ['dance', 'swim', 'skate'],
      answer: 0,
      why: ['', 'swim은 민수만 할 수 있어요. 하윤이는 X예요.', 'skate는 하윤이만 할 수 있어요. 민수는 X예요.'],
      hint: '두 사람 모두 O인 칸을 찾아보세요.',
      explain: '두 사람 모두 O인 것은 dance예요. 둘 다 **I can dance.**라고 말할 수 있어요.',
    },
    {
      id: 'a3', level: 3, type: 'short', concept: 1,
      q: "민수의 말을 읽고, 민수가 **할 수 있는** 일을 영어 낱말 하나로 써 보세요.\n\nMinsu: I can't swim. I can't skate. I can dance.",
      answer: ['dance'],
      wrong: [
        { a: 'swim', why: "I can't swim.은 수영할 수 없다는 말이에요. can't를 잘 보세요." },
        { a: 'skate', why: "I can't skate.는 스케이트를 탈 수 없다는 말이에요. can't를 잘 보세요." },
      ],
      hint: "can과 can't를 구별해서 읽어 보세요.",
      explain: "can't가 붙은 swim과 skate는 할 수 없는 일이에요. I can dance.이므로 민수가 할 수 있는 일은 **dance**(춤추다)예요.",
    },
    {
      id: 'a4', level: 3, type: 'ox', concept: 3,
      q: "'Can you sing?'과 'Do you like apples?'에는 똑같이 'Yes, I can.'으로 대답해요.",
      answer: false,
      hint: '질문의 첫 낱말이 무엇인지 보세요.',
      explain: "Can으로 물으면 Yes, I can.으로, Do로 물으면 **Yes, I do.**로 대답해요. Do you like apples?(너는 사과를 좋아하니?)에는 Yes, I do. 또는 No, I don't.로 대답해요.",
    },
  ],

  deeper: [
    {
      title: 'can 하나로 많은 것을 말해요',
      body: "can 뒤에 동작 낱말만 바꿔 끼우면 할 수 있는 일을 얼마든지 말할 수 있어요.\n\n- I can **swim**. / I can **skate**. / I can **sing**.\n\n동물 이야기에도 쓸 수 있어요.\n\n- **A fish can swim.** 물고기는 헤엄칠 수 있어요.\n- **A rabbit can jump.** 토끼는 뛰어오를 수 있어요.\n\nI 대신 A fish, A rabbit이 와도 can 뒤의 동작 낱말은 모양이 바뀌지 않아요. 할 수 있는 일을 말하는 can은 4학년이 되어서도 계속 쓰는 중요한 낱말이에요.",
    },
  ],

  faq: [
    {
      q: "can't랑 cannot은 같은 말이에요?",
      a: "네, 뜻이 같아요. **can't**는 **cannot**을 줄인 말이에요. 친구와 말할 때는 줄인 can't를 많이 써요. cannot은 보통 띄어 쓰지 않고 한 낱말로 붙여 써요.",
    },
    {
      q: 'Can you ~?에 Yes, I do.라고 하면 왜 틀려요?',
      a: "영어에서는 질문의 첫 낱말을 대답에서 다시 써요. **Can**으로 물으면 Yes, I **can**. / No, I **can't**., **Do**로 물으면 Yes, I **do**. / No, I **don't**.예요. 첫 낱말을 짝 맞추듯 기억하세요.",
    },
    {
      q: 'can이랑 can\'t는 소리가 비슷해서 헷갈려요.',
      a: "can't는 끝에 짧은 t 소리가 붙어요. 문장에서 can't는 조금 더 힘주어 말하는 경우가 많아요. 잘 들리지 않으면 뒤에 오는 Yes나 No, 또는 앞뒤 이야기를 함께 보고 판단해요.",
    },
  ],

  mistakes: [
    'Can you ~?에 Yes, I do.라고 대답하는 실수 — Can으로 물으면 **Yes, I can.** / **No, I can\'t.**예요.',
    "can't를 \"할 수 있다\"로 읽는 실수 — 끝의 't가 붙으면 **할 수 없다**예요.",
    'I can swims.처럼 can 뒤의 동작 낱말에 s를 붙이는 실수 — can 뒤에는 **I can swim.**처럼 그대로 써요.',
  ],

  gens: [
    {
      id: 'answer-can-you',
      level: 1,
      title: 'Can you ~?에 알맞게 대답하기',
      make: function (R) {
        var acts = [
          ['swim', '수영을 할'], ['run', '달리기를 할'], ['jump', '점프를 할'],
          ['dance', '춤을 출'], ['sing', '노래를 부를'], ['skate', '스케이트를 탈'],
        ];
        var names = ['민수', '지아', '서준', '하윤', '도윤', '수아'];
        var a = R.pick(acts);
        var name = R.pick(names);
        var can = R.bool();
        var correct = can ? 'Yes, I can.' : "No, I can't.";
        var other = can ? "No, I can't." : 'Yes, I can.';
        var reason = {};
        reason[other] = can
          ? name + R.josa(name, '은/는') + ' ' + a[1] + ' 수 있어요. No, I can\'t.는 "아니, 할 수 없어."예요.'
          : name + R.josa(name, '은/는') + ' ' + a[1] + ' 수 없어요. Yes, I can.은 "응, 할 수 있어."예요.';
        reason['Yes, I do.'] = 'Can으로 물었으니 대답에도 can을 써요.';
        reason["No, I don't."] = 'Can으로 물었으니 대답에도 can을 써요.';
        var pick = R.choices(correct, [other, 'Yes, I do.', "No, I don't."]);
        return {
          type: 'choice', concept: 3,
          q: name + R.josa(name, '은/는') + ' ' + a[1] + ' ' + (can ? '**수 있어요**' : '**수 없어요**') + '. 친구가 이렇게 물었어요.\n\nCan you ' + a[0] + '?\n\n' + name + '의 대답으로 알맞은 것은 무엇일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: 'Can으로 물었으니 can으로 대답해요. ' + name + R.josa(name, '은/는') + ' ' + a[1] + ' ' + (can ? '수 있으니' : '수 없으니') + ' **' + correct + '**' + (can ? '이라고' : '라고') + ' 대답해요.',
        };
      },
    },
    {
      id: 'can-and-cant',
      level: 2,
      title: "I can ~. / I can't ~. 구별하기",
      make: function (R) {
        var acts = [
          ['swim', '수영할'], ['run', '달릴'], ['jump', '점프할'],
          ['dance', '춤출'], ['sing', '노래할'], ['skate', '스케이트를 탈'],
        ];
        var two = R.sample(acts, 2);
        var x = two[0], y = two[1];
        var correct = 'I can ' + x[0] + ". I can't " + y[0] + '.';
        var swapped = 'I can ' + y[0] + ". I can't " + x[0] + '.';
        var both = 'I can ' + x[0] + '. I can ' + y[0] + '.';
        var none = "I can't " + x[0] + ". I can't " + y[0] + '.';
        var reason = {};
        reason[swapped] = '거꾸로 말했어요. 할 수 있는 일에 can, 할 수 없는 일에 can\'t를 써요.';
        reason[both] = y[1] + ' 수 없다는 말이 빠졌어요. 할 수 없는 일에는 can\'t를 써요.';
        reason[none] = x[1] + ' 수 있다는 말이 빠졌어요. 할 수 있는 일에는 can을 써요.';
        var pick = R.choices(correct, [swapped, both, none]);
        return {
          type: 'choice', concept: 2,
          q: "'나는 " + x[1] + ' 수 있어요. 나는 ' + y[1] + " 수 없어요.'를 영어로 바르게 나타낸 것은 무엇일까요?",
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '할 수 있는 일은 I can 뒤에, 할 수 없는 일은 I can\'t 뒤에 붙여요. **' + correct + '**',
        };
      },
    },
  ],

  vocab: [
    { w: 'swim', m: '수영하다', ex: 'I can **swim**.', exm: '나는 수영할 수 있어요.' },
    { w: 'run', m: '달리다', ex: 'Can you **run**? Yes, I can.', exm: '너는 달릴 수 있니? 응, 할 수 있어.' },
    { w: 'jump', m: '뛰어오르다, 점프하다', ex: 'A rabbit can **jump**.', exm: '토끼는 뛰어오를 수 있어요.' },
    { w: 'dance', m: '춤추다', ex: 'I can **dance**.', exm: '나는 춤출 수 있어요.' },
    { w: 'sing', m: '노래하다', ex: 'Can you **sing**?', exm: '너는 노래할 수 있니?' },
    { w: 'skate', m: '스케이트를 타다', ex: "I can't **skate**.", exm: '나는 스케이트를 탈 수 없어요.' },
    { w: 'can', m: '~할 수 있다', ex: 'I **can** swim.', exm: '나는 수영할 수 있어요.' },
    { w: "can't", m: '~할 수 없다 (cannot을 줄인 말)', ex: "I **can't** sing.", exm: '나는 노래할 수 없어요.' },
  ],
});
