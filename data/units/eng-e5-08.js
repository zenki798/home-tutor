/* 5학년 영어 · 지난 일 말하기 */
Tutor.registerUnit({
  id: 'eng-e5-08',
  course: 'eng-e5',
  title: '지난 일 말하기',
  summary: 'What did you do last weekend?로 지난 일을 묻고 played, went처럼 과거를 나타내는 말로 답하며 그때의 느낌을 말해요.',
  goals: [
    'What did you do last weekend?로 지난 일을 묻고 답할 수 있어요.',
    'played, visited처럼 -ed를 붙이거나 went, ate처럼 모양이 바뀌는 지난 일의 말을 쓸 수 있어요.',
    "Did you ~?로 묻고 Yes, I did. / No, I didn't.로 답할 수 있어요.",
    'How was it?에 It was fun.처럼 느낌을 말하고, 일기를 읽고 일의 순서를 찾을 수 있어요.',
  ],
  standards: ['[6영02-06]', '[6영01-06]', '[6영02-02]'],

  concepts: [
    {
      title: '지난 일 묻고 답하기',
      body: "이미 지나간 일을 물을 때는 **did**를 써요.\n\n- **What did you do last weekend?** 너는 지난 주말에 무엇을 했니?\n- **I visited my grandma.** 나는 할머니 댁에 갔어(할머니를 방문했어).\n\n대답할 때는 동사를 **지난 일을 나타내는 모양(과거형)**으로 바꿔요: visit → **visited**.\n\n지난 때를 나타내는 말도 함께 알아 둬요.\n\n| 영어 | 뜻 |\n|---|---|\n| yesterday | 어제 |\n| last weekend | 지난 주말 |\n| last Sunday | 지난 일요일 |\n| last summer | 지난여름 |\n\n> 💡 앞으로의 일에는 next(다음), 지난 일에는 **last**(지난)를 써요.",
      easy: "\"어제 뭐 했어?\" 하고 묻는 말이에요.\n\nWhat **did** you do yesterday?\n\n대답할 때는 동사 꼬리에 -ed를 달아서 '했어'라는 뜻을 만들어요.\n\nI play. (나는 놀아.) → I play**ed**. (나는 놀았어.)",
      check: {
        type: 'choice',
        q: '**What did you do last weekend?**에 알맞은 대답은 무엇일까요?',
        choices: ['I visited my uncle.', 'I visit my uncle.', 'Yes, I did.'],
        answer: 0,
        why: ['', '지난 일인데 지금의 모양(visit)을 썼어요. visited로 바꿔요.', 'What으로 물었으니 Yes/No가 아니라 한 일을 말해요.'],
        explain: '지난 주말에 한 일을 물었으니 지난 일의 모양으로 답해요. I visited my uncle.(나는 삼촌 댁에 갔어.)',
      },
    },
    {
      title: '-ed를 붙여 지난 일 나타내기',
      body: "많은 동사는 끝에 **-ed**를 붙이면 지난 일을 나타내요.\n\n| 지금 | 지난 일 |\n|---|---|\n| play | play**ed** |\n| watch | watch**ed** |\n| visit | visit**ed** |\n| clean | clean**ed** |\n| help | help**ed** |\n\n**e로 끝나는 동사**에는 **-d**만 붙여요: like → like**d**, bake → bake**d**, dance → dance**d**.\n\n- I **watched** a movie yesterday. 나는 어제 영화를 봤어.\n- We **played** badminton in the park. 우리는 공원에서 배드민턴을 쳤어.\n\n> 💡 study처럼 '자음 + y'로 끝나면 y를 i로 바꾸고 -ed를 붙여요: study → studied.",
      easy: "-ed는 '이미 끝났어요'라는 꼬리표예요.\n\n오늘 하는 일: I clean my room.\n어제 한 일: I clean**ed** my room.\n\n동사가 이미 e로 끝나면 e를 또 쓰지 않고 d만 붙여요: dance → danced.",
      check: {
        type: 'short', check: 'text',
        q: '**watch**를 지난 일을 나타내는 모양으로 바꾸어 쓰세요.',
        answer: ['watched'],
        wrong: [
          { a: 'watch', why: '지금의 모양 그대로예요. 끝에 -ed를 붙여요.' },
          { a: 'watchd', why: 'watch는 e로 끝나지 않아서 -d가 아니라 -ed를 붙여요.' },
        ],
        explain: 'watch에 -ed를 붙이면 watched예요. 예: I watched TV yesterday.',
      },
    },
    {
      title: '모양이 바뀌는 지난 일의 말',
      body: "어떤 동사는 -ed를 붙이지 않고 **모양이 아예 바뀌어요.** 규칙이 없으니 하나씩 외워야 해요.\n\n| 지금 | 지난 일 | 뜻 |\n|---|---|---|\n| go | **went** | 갔다 |\n| eat | **ate** | 먹었다 |\n| see | **saw** | 보았다 |\n| make | **made** | 만들었다 |\n| have | **had** | 가졌다, 먹었다 |\n| do | **did** | 했다 |\n\n- I **went** to the zoo. 나는 동물원에 갔어.\n- We **ate** pizza for lunch. 우리는 점심으로 피자를 먹었어.\n- I **saw** a big elephant. 나는 큰 코끼리를 봤어.\n\n> ⚠️ goed, eated, seed라고 쓰지 않아요.",
      easy: "-ed 꼬리를 거부하는 고집쟁이 낱말들이에요. 대신 옷을 갈아입어요.\n\ngo는 went로, eat은 ate로, see는 saw로, make는 made로 갈아입어요.\n\n소리 내어 짝으로 외워 보세요: go-went, eat-ate, see-saw, make-made.",
      check: {
        type: 'choice',
        q: '**go**의 지난 일을 나타내는 모양은 무엇일까요?',
        choices: ['went', 'goed', 'goes'],
        answer: 0,
        why: ['', 'go는 -ed를 붙이지 않고 모양이 바뀌어요.', 'goes는 다른 한 사람이 늘 하는 일을 말할 때의 모양이에요.'],
        explain: 'go의 지난 일 모양은 went예요. I went to the park.(나는 공원에 갔어.)',
      },
    },
    {
      title: 'Did you ~?로 묻고 답하기',
      body: "지난 일을 했는지 안 했는지 물을 때는 **Did you ~?**를 써요.\n\n- **Did you go fishing?** 너는 낚시하러 갔니?\n- **Yes, I did.** 응, 갔어. / **No, I didn't.** 아니, 안 갔어.\n\ndidn't는 **did not**을 줄인 말이에요.\n\n> ⚠️ Did가 이미 '지난 일'을 나타내니까 뒤의 동사는 **원래 모양(동사원형)**으로 써요. Did you **go**? (O) / Did you went? (X)\n\nNo로 답한 뒤에는 실제로 한 일을 덧붙이면 좋아요: No, I didn't. I **went** swimming.",
      easy: "Did는 '지난 일 질문'이라는 깃발이에요. 깃발이 이미 '지난 일'이라고 알려 주니까, 뒤의 동사는 옷을 갈아입지 않아요.\n\nDid you **eat** breakfast? (O)\n\n대답도 Did로 물었으니 did로 해요: Yes, I did. / No, I didn't.",
      check: {
        type: 'choice',
        q: '**Did you clean your room?**에 알맞은 대답은 무엇일까요?',
        choices: ['Yes, I did.', 'Yes, I do.', 'Yes, I am.'],
        answer: 0,
        why: ['', 'Did로 물었으니 do가 아니라 did로 답해요.', 'Did로 물었으니 am이 아니라 did로 답해요.'],
        explain: 'Did you ~?로 물으면 Yes, I did. 또는 No, I didn\'t.로 답해요.',
      },
    },
    {
      title: '지난 일의 느낌 말하기',
      body: "지난 일이 어땠는지 물을 때는 **How was it?**(어땠니?)이라고 해요. was는 is의 지난 일 모양이에요.\n\n- **How was it?** 어땠니?\n- **It was fun.** 재미있었어.\n- **The food was delicious.** 음식이 아주 맛있었어.\n\n| 느낌 | 뜻 |\n|---|---|\n| fun | 재미있는 |\n| great | 아주 좋은 |\n| exciting | 신나는 |\n| interesting | 흥미로운 |\n| delicious | 아주 맛있는 |\n| boring | 지루한 |\n\n> 💡 How was your weekend?(주말 어땠어?)처럼 it 대신 다른 말을 넣어도 돼요.",
      easy: "놀이공원에 다녀온 친구에게 \"어땠어?\"라고 묻는 말이 How was it?이에요.\n\n좋았으면 It was **fun**. / It was **great**.\n맛있었으면 It was **delicious**.\n심심했으면 It was **boring**.",
      check: {
        type: 'choice',
        q: '**How was it?**에 알맞은 대답은 무엇일까요?',
        choices: ['It was fun.', 'I went camping.', 'Yes, I did.'],
        answer: 0,
        why: ['', '한 일을 말했어요. How was it?은 어땠는지(느낌)를 물어요.', 'How로 물으면 Yes/No로 답하지 않아요.'],
        explain: 'How was it?은 "어땠니?"라는 뜻이에요. It was fun.(재미있었어.)처럼 느낌을 말해요.',
      },
    },
    {
      title: '일기를 읽고 일어난 순서 찾기',
      body: "일기(diary)는 지난 일을 쓴 글이라 동사가 대부분 **지난 일의 모양**이에요. 일어난 순서는 **때를 나타내는 말**을 단서로 찾아요.\n\n- **in the morning**(아침에) → **in the afternoon**(오후에) → **in the evening**(저녁에)\n- **after lunch**(점심을 먹은 뒤에), **then**(그다음에)\n\n> Saturday, May 10\nIn the morning, I cleaned my room. Then I went to the park with my sister. We had gimbap for lunch. In the evening, I watched a movie. It was a great day!\n\n순서: 방 청소하기 → 공원에 가기 → 김밥 먹기 → 영화 보기",
      easy: "일기를 읽을 때 in the morning, then, in the evening 같은 말에 밑줄을 그어 보세요.\n\n밑줄 친 말이 하루의 시계 역할을 해요. 아침 → 점심 → 저녁 순서로 늘어놓으면 돼요.",
      check: {
        type: 'ox',
        q: '하루의 일을 쓴 일기에서 **in the evening**에 한 일은 **in the morning**에 한 일보다 먼저 일어난 일이에요.',
        answer: false,
        explain: 'in the morning은 아침, in the evening은 저녁이에요. 아침에 한 일이 저녁에 한 일보다 먼저예요.',
      },
    },
  ],

  examples: [
    {
      q: "우리말에 맞게 영어로 말해 보세요.\n\n'나는 지난 주말에 가족과 동물원에 갔어.'",
      steps: [
        '지난 일이니 동사를 지난 일의 모양으로 바꿔요.',
        'go(가다)는 -ed를 붙이지 않고 went로 바뀌어요.',
        '동물원에: to the zoo, 가족과: with my family',
        '지난 주말(last weekend)은 문장 끝에 붙여요: I went to the zoo with my family last weekend.',
      ],
      answer: 'I went to the zoo with my family last weekend.',
    },
    {
      q: "대화를 완성해 보세요.\n\nA: Did you watch the soccer game yesterday?\nB: Yes, [[빈칸]]. It was exciting!",
      steps: [
        'Did you ~?로 물었으니 did로 답해요.',
        'B는 경기가 신났다고(exciting) 했으니 경기를 봤어요. 그래서 Yes예요.',
        'Yes, I did. It was exciting!',
      ],
      answer: 'Yes, I did.',
    },
  ],

  terms: [
    { term: '과거형', def: '이미 지나간 일을 나타내는 동사의 모양이에요. 예: played, went' },
    { term: '-ed', def: '많은 동사 끝에 붙여 지난 일을 나타내는 꼬리예요. 예: play → played, visit → visited' },
    { term: 'did', def: "do의 과거형이에요. Did you ~?처럼 지난 일을 물을 때도 써요." },
    { term: "didn't", def: "did not을 줄인 말이에요. 예: No, I didn't." },
    { term: 'was', def: "is의 과거형이에요. '~이었다'라는 뜻이에요. 예: It was fun." },
    { term: 'last', def: "'지난'이라는 뜻으로 지난 때를 나타내요. 예: last weekend(지난 주말)" },
    { term: '일기 (diary)', def: '하루에 있었던 일과 느낌을 적은 글이에요. 지난 일을 쓰므로 동사가 대부분 과거형이에요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '**What did you do last weekend?**에 알맞은 대답은 무엇일까요?',
      choices: ['I played soccer with my friends.', 'I play soccer with my friends.', 'Yes, I did.', 'It was fun.'],
      answer: 0,
      why: [
        '',
        '지난 일인데 지금의 모양(play)을 썼어요. played로 바꿔요.',
        'What으로 물었으니 Yes/No가 아니라 한 일을 말해요.',
        '느낌을 말했어요. 질문은 무엇을 했는지 물어요.',
      ],
      explain: '지난 주말에 한 일을 물었으니 I played soccer with my friends.(친구들과 축구를 했어.)가 알맞아요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
      q: '**play**를 지난 일을 나타내는 모양으로 바꾸어 쓰세요.',
      answer: ['played'],
      wrong: [
        { a: 'plaied', why: 'play는 모음(a) 다음에 y가 와서 y를 바꾸지 않아요. 그대로 -ed를 붙여 played예요.' },
        { a: 'play', why: '지금의 모양 그대로예요. 끝에 -ed를 붙여요.' },
      ],
      explain: 'play에 -ed를 붙이면 played예요. I played badminton yesterday.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 2,
      q: '**go**를 지난 일을 나타내는 모양으로 바꾸어 쓰세요.',
      answer: ['went'],
      wrong: [
        { a: 'goed', why: 'go는 -ed를 붙이지 않고 모양이 바뀌어요.' },
        { a: 'goes', why: 'goes는 다른 한 사람이 늘 하는 일의 모양이에요. 지난 일은 went예요.' },
      ],
      explain: 'go의 지난 일 모양은 went예요. I went to the library.(나는 도서관에 갔어.)',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nI [[빈칸]] a rainbow yesterday.',
      choices: ['saw', 'see', 'seed', 'seeing'],
      answer: 0,
      why: [
        '',
        'yesterday(어제)는 지난 때예요. 지난 일의 모양으로 바꿔요.',
        'see는 -ed를 붙이지 않고 saw로 바뀌어요.',
        '-ing 모양은 이 문장에 혼자 쓸 수 없어요.',
      ],
      explain: 'see의 지난 일 모양은 saw예요. I saw a rainbow yesterday.(나는 어제 무지개를 봤어.)',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '**Did you go fishing?**에 알맞은 대답은 무엇일까요?',
      choices: ['Yes, I did.', 'Yes, I do.', 'Yes, I am.', 'Yes, it was.'],
      answer: 0,
      why: [
        '',
        'Did로 물었으니 do가 아니라 did로 답해요.',
        'Did로 물었으니 am이 아니라 did로 답해요.',
        '내가 했는지 물었으니 I로 답하고, Did로 물었으니 did를 써요.',
      ],
      explain: 'Did you ~?로 물으면 Yes, I did. 또는 No, I didn\'t.로 답해요.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 2,
      q: '**eat**의 지난 일을 나타내는 모양은 **eated**예요.',
      answer: false,
      explain: 'eat은 -ed를 붙이지 않고 모양이 바뀌어요. 지난 일 모양은 ate예요. I ate pizza.(나는 피자를 먹었어.)',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: I went to the beach yesterday.\nB: How was it?\nA: [[빈칸]]',
      choices: ['It was great.', 'I went to the beach.', 'Yes, I did.', "It's Sunday."],
      answer: 0,
      why: [
        '',
        '한 일을 또 말했어요. How was it?은 어땠는지 물어요.',
        'How로 물으면 Yes/No로 답하지 않아요.',
        '요일을 말했어요. 질문은 느낌을 물어요.',
      ],
      explain: 'How was it?(어땠니?)에는 It was great.(아주 좋았어.)처럼 느낌을 말해요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 1,
      q: "우리말에 맞게 순서대로 놓으세요.\n\n'나는 아빠와 축구 경기를 봤어.'",
      choices: ['I', 'watched', 'a soccer game', 'with', 'my dad'],
      answer: [0, 1, 2, 3, 4],
      hint: '누가 → 했다 → 무엇을 → 누구와 순서예요.',
      explain: 'I(나는) + watched(봤다) + a soccer game(축구 경기를) + with my dad(아빠와). I watched a soccer game with my dad.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'text', concept: 3,
      q: "빈칸에 알맞은 말을 쓰세요.\n\nA: Did you clean your room?\nB: No, I [[빈칸]]. I was very busy.",
      answer: ["didn't", 'did not'],
      wrong: [
        { a: "don't", why: "Did로 물었으니 don't가 아니라 didn't로 답해요." },
        { a: 'did', why: 'No로 답했으니 not을 붙여 didn\'t(did not)로 써요.' },
      ],
      hint: 'No로 답할 때 did에 무엇을 붙일까요?',
      explain: "Did you ~?에 No로 답할 때는 No, I didn't.(did not)라고 해요.",
    },
    {
      id: 'p10', level: 2, type: 'order', concept: 5,
      q: "일기를 읽고 하은이가 한 일을 순서대로 놓으세요.\n\nLast Saturday, I went to the beach with my family. In the morning, I played in the sand. We had gimbap for lunch. After lunch, I made a sandcastle. In the evening, we went home. It was a great day!",
      choices: ['played in the sand', 'had gimbap', 'made a sandcastle', 'went home'],
      answer: [0, 1, 2, 3],
      hint: 'in the morning, for lunch, after lunch, in the evening을 찾아보세요.',
      explain: '아침에(in the morning) 모래에서 놀고 → 점심으로(for lunch) 김밥을 먹고 → 점심 뒤에(after lunch) 모래성을 만들고 → 저녁에(in the evening) 집에 갔어요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: "빈칸에 가장 알맞은 낱말은 무엇일까요?\n\nI ate chicken soup at my grandma's house. It was really good. The soup was [[빈칸]].",
      choices: ['delicious', 'boring', 'sad', 'sleepy'],
      answer: 0,
      why: [
        '',
        '수프가 정말 좋았다고(really good) 했어요. boring은 지루한이라는 뜻이에요.',
        'sad는 슬픈이라는 뜻이라 음식에 어울리지 않아요.',
        'sleepy는 졸린이라는 뜻이라 음식에 어울리지 않아요.',
      ],
      hint: '음식이 정말 좋았다는 말을 떠올려 보세요.',
      explain: "음식이 정말 좋았다고 했으니 delicious(아주 맛있는)가 알맞아요. The soup was delicious.",
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 3,
      q: '바른 문장은 무엇일까요?',
      choices: ['Did you visit your grandma?', 'Did you visited your grandma?', 'Do you visited your grandma?', 'Did you visits your grandma?'],
      answer: 0,
      why: [
        '',
        'Did가 이미 지난 일을 나타내요. 뒤의 동사는 원래 모양(visit)으로 써요.',
        '지난 일을 물을 때는 Do가 아니라 Did를 쓰고, 뒤에는 원래 모양을 써요.',
        'Did 뒤의 동사에는 -s를 붙이지 않아요.',
      ],
      explain: 'Did you 뒤에는 동사원형을 써요. Did you visit your grandma?(할머니 댁에 갔었니?)',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: "글을 읽고 물음에 답하세요.\n\nMinsu: Last weekend, I went fishing with my dad. It was fun!\nJia: I visited my grandma. We made dumplings together.\nDoyun: I stayed home. I watched TV all day.\n\n지난 주말에 할머니와 함께 만두를 만든 사람은 누구일까요?",
      choices: ['지아 (Jia)', '민수 (Minsu)', '도윤 (Doyun)', '지아의 할머니만'],
      answer: 0,
      why: [
        '',
        '민수는 아빠와 낚시하러 갔어요(went fishing).',
        '도윤이는 집에 있으면서 하루 종일 텔레비전을 봤어요.',
        'We made dumplings together.의 we는 지아와 할머니예요. 함께(together) 만들었어요.',
      ],
      hint: 'made(만들었다)와 dumplings(만두)가 나오는 사람을 찾아요.',
      explain: 'Jia가 I visited my grandma. We made dumplings together.라고 했어요. 지아가 할머니 댁에 가서 함께 만두를 만들었어요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '**틀린** 문장은 무엇일까요?',
      choices: ['I eated ice cream at the park.', 'I went to the park with Jia.', 'We saw a big dog there.', 'We played badminton.'],
      answer: 0,
      why: [
        '',
        'go의 지난 일 모양 went를 바르게 썼어요.',
        'see의 지난 일 모양 saw를 바르게 썼어요.',
        'play에 -ed를 붙인 played를 바르게 썼어요.',
      ],
      hint: '모양이 바뀌는 동사를 -ed로 쓴 문장을 찾아요.',
      explain: 'eat은 모양이 바뀌는 동사라 eated가 아니라 ate예요. 바른 문장은 I ate ice cream at the park.예요.',
    },
    {
      id: 'a3', level: 3, type: 'order', concept: 5,
      q: "일기를 읽고 일어난 순서대로 놓으세요.\n\nLast Sunday was my mom's birthday. In the evening, we ate a big cake together. In the morning, I made a birthday card for her. In the afternoon, my dad and I cleaned the house.",
      choices: ['made a birthday card', 'cleaned the house', 'ate a big cake'],
      answer: [0, 1, 2],
      hint: '글의 문장 순서가 아니라 in the morning, in the afternoon, in the evening을 비교해요.',
      explain: '아침에(in the morning) 생일 카드를 만들고 → 오후에(in the afternoon) 집을 청소하고 → 저녁에(in the evening) 케이크를 먹었어요. 글에서 케이크가 먼저 나오지만 일어난 순서는 가장 마지막이에요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'text', concept: 3,
      q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nA: Did you go to the zoo last Saturday?\nB: No, I didn\'t. I [[빈칸]] to the museum.',
      answer: ['went'],
      wrong: [
        { a: 'go', why: '질문의 Did 뒤에서는 go를 쓰지만, B의 문장에는 did가 없어요. 지난 일이니 went로 써요.' },
        { a: 'goed', why: 'go는 -ed를 붙이지 않고 went로 바뀌어요.' },
      ],
      hint: 'B의 두 번째 문장에는 did가 없어요. 그럼 동사의 모양은 어떻게 될까요?',
      explain: 'B는 동물원 대신 박물관에 갔다고 말해요. 지난 일이고 문장에 did가 없으니 go를 went로 바꿔요. I went to the museum.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: "글을 읽고 물음에 답하세요.\n\nYesterday, I went to the amusement park with my cousin. We went on a roller coaster three times. We ate hot dogs and ice cream. I didn't want to go home!\n\n'How was your day?'라고 물으면 글쓴이는 어떻게 대답할까요?",
      choices: ['It was exciting!', 'It was boring.', 'It was sad.', "I didn't go out."],
      answer: 0,
      why: [
        '',
        '집에 가기 싫을 만큼 즐거웠어요. 지루하지(boring) 않았어요.',
        '슬픈 일은 글에 없어요.',
        '글쓴이는 놀이공원에 갔어요.',
      ],
      hint: "I didn't want to go home!(집에 가고 싶지 않았어!)에서 글쓴이의 마음을 짐작해 보세요.",
      explain: '롤러코스터를 세 번 타고 집에 가기 싫을 만큼 즐거웠어요. 그래서 It was exciting!(신났어!)이 알맞아요.',
    },
  ],

  deeper: [
    {
      title: '-ed의 세 가지 소리',
      body: "-ed는 쓸 때는 같지만 소리는 세 가지예요. 앞 소리에 따라 달라져요.\n\n- helped, watched, danced: 짧은 [t] 소리\n- played, cleaned, lived: [d] 소리\n- visited, wanted: t나 d로 끝나는 동사는 [id] 소리가 나서 한 음절이 늘어나요\n\n소리를 다 외우지 않아도 괜찮아요. 원어민의 말을 들을 때 끝소리에 귀를 기울여 보면 지난 일인지 알아차리기 쉬워져요.\n\n6학년에서는 지난 일을 더 길게 이어 말하고, 일기나 편지로 써 보는 연습을 해요.",
    },
  ],

  faq: [
    {
      q: '왜 Did you went?가 아니라 Did you go?예요?',
      a: "Did가 이미 '지난 일'이라는 뜻을 맡고 있어요. 그래서 뒤의 동사는 원래 모양으로 써요. 지난 일을 두 번 나타낼 필요가 없는 거예요.",
    },
    {
      q: 'went, ate 같은 말은 어떻게 외워요?',
      a: 'go-went, eat-ate, see-saw, make-made처럼 짝으로 소리 내어 외우면 좋아요. 일기를 쓸 때 직접 써 보면 더 오래 기억나요.',
    },
    {
      q: 'It was fun.에서 was는 뭐예요?',
      a: "was는 is의 지난 일 모양이에요. 지금 재미있으면 It is fun., 지난 일이 재미있었으면 It was fun.이라고 해요.",
    },
  ],

  mistakes: [
    'goed, eated처럼 모양이 바뀌는 동사에 -ed를 붙이는 실수 — went, ate로 써요.',
    'Did you went?처럼 Did 뒤에 지난 일 모양을 쓰는 실수 — Did 뒤에는 동사원형: Did you go?',
    "Did you ~?에 Yes, I do.로 답하는 실수 — Yes, I did. / No, I didn't.",
  ],

  gens: [
    {
      id: 'past-form',
      level: 1,
      title: '동사를 지난 일의 모양으로 바꾸기',
      make: function (R) {
        // [동사원형, 지난 일 모양, 흔한 틀린 모양(없으면 null), 뒤에 오는 말 목록, 개념 카드]
        var verbs = [
          ['play', 'played', null, ['soccer', 'badminton', 'with my dog'], 1],
          ['watch', 'watched', null, ['TV', 'a movie', 'a baseball game'], 1],
          ['visit', 'visited', null, ['my grandma', 'the museum', 'my uncle'], 1],
          ['clean', 'cleaned', null, ['my room', 'the house'], 1],
          ['help', 'helped', null, ['my mom', 'my dad', 'my friend'], 1],
          ['bake', 'baked', 'bakeed', ['cookies', 'a cake', 'bread'], 1],
          ['dance', 'danced', 'danceed', ['with my sister', 'at the party'], 1],
          ['go', 'went', 'goed', ['to the park', 'to the zoo', 'fishing', 'camping'], 2],
          ['eat', 'ate', 'eated', ['pizza', 'gimbap', 'ice cream'], 2],
          ['see', 'saw', 'seed', ['a rainbow', 'a big elephant', 'my friends'], 2],
          ['make', 'made', 'maked', ['a cake', 'a snowman', 'a card'], 2],
          ['have', 'had', 'haved', ['a party', 'lunch with my family'], 2],
          ['do', 'did', 'doed', ['my homework', 'yoga with my mom'], 2],
        ];
        var v = R.pick(verbs);
        var rest = R.pick(v[3]);
        var when = R.pick(['yesterday', 'last weekend', 'last Sunday', 'last Saturday', 'last summer']);
        var who = R.pick(['I', 'We']);
        var wrong = [{ a: v[0], why: when + '는 지난 때예요. 동사를 지난 일의 모양으로 바꿔요.' }];
        if (v[2]) {
          wrong.push({
            a: v[2],
            why: v[4] === 2 ? '-ed를 붙이지 않고 모양이 바뀌는 동사예요: ' + v[0] + ' → ' + v[1] : 'e로 끝나는 동사에는 -d만 붙여요: ' + v[0] + ' → ' + v[1],
          });
        }
        var rule = v[4] === 2 ? '모양이 바뀌는 동사예요: ' + v[0] + ' → ' + v[1] + '.' : (v[2] ? 'e로 끝나는 동사라 -d만 붙여요: ' + v[0] + ' → ' + v[1] + '.' : '끝에 -ed를 붙여요: ' + v[0] + ' → ' + v[1] + '.');
        return {
          type: 'short', check: 'text', concept: v[4],
          q: '괄호 안의 낱말을 지난 일을 나타내는 모양으로 바꾸어 빈칸에 쓰세요.\n\n' + who + ' [[빈칸]] (' + v[0] + ') ' + rest + ' ' + when + '.',
          answer: [v[1]],
          wrong: wrong,
          explain: when + '는 지난 때이므로 지난 일의 모양을 써요. ' + rule + '\n\n' + who + ' ' + v[1] + ' ' + rest + ' ' + when + '.',
        };
      },
    },
    {
      id: 'did-answer',
      level: 2,
      title: 'Did you ~?에 답하기',
      make: function (R) {
        // [묻는 말, 했을 때 우리말, 안 했을 때 우리말]
        var acts = [
          ['go fishing', '낚시하러 갔어요', '낚시하러 가지 않았어요'],
          ['visit your grandma', '할머니 댁에 갔어요', '할머니 댁에 가지 않았어요'],
          ['watch the soccer game', '축구 경기를 봤어요', '축구 경기를 보지 않았어요'],
          ['clean your room', '방을 청소했어요', '방을 청소하지 않았어요'],
          ['make a cake', '케이크를 만들었어요', '케이크를 만들지 않았어요'],
          ['eat pizza', '피자를 먹었어요', '피자를 먹지 않았어요'],
          ['play badminton', '배드민턴을 쳤어요', '배드민턴을 치지 않았어요'],
          ['go to the library', '도서관에 갔어요', '도서관에 가지 않았어요'],
        ];
        var times = [['yesterday', '어제'], ['last weekend', '지난 주말에'], ['last Saturday', '지난 토요일에'], ['last night', '어젯밤에']];
        var a = R.pick(acts);
        var t = R.pick(times);
        var yes = R.bool();
        var correct = yes ? 'Yes, I did.' : "No, I didn't.";
        var reason = {
          'Yes, I did.': 'B는 ' + t[1] + ' ' + a[2] + '. 안 했으니 No로 답해요.',
          "No, I didn't.": 'B는 ' + t[1] + ' ' + a[1] + '. 했으니 Yes로 답해요.',
          'Yes, I do.': 'Did로 물었으니 do가 아니라 did로 답해요.',
          "No, I don't.": "Did로 물었으니 don't가 아니라 didn't로 답해요.",
          'Yes, I was.': 'Did로 물었으니 was가 아니라 did로 답해요.',
        };
        var wrongs = R.shuffle(Object.keys(reason).filter(function (k) { return k !== correct; }));
        var pick = R.choices(correct, wrongs);
        return {
          type: 'choice', concept: 3,
          q: '대화를 읽고 빈칸에 알맞은 대답을 고르세요. (B는 ' + t[1] + ' ' + (yes ? a[1] : a[2]) + '.)\n\nA: Did you ' + a[0] + ' ' + t[0] + '?\nB: [[빈칸]]',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: "Did you ~?로 물으면 did로 답해요. 했으면 Yes, I did., 안 했으면 No, I didn't.예요. B는 " + (yes ? '했으니 ' : '안 했으니 ') + correct,
        };
      },
    },
  ],

  vocab: [
    { w: 'yesterday', m: '어제', ex: 'I played with my dog yesterday.', exm: '나는 어제 강아지와 놀았어.' },
    { w: 'last weekend', m: '지난 주말', ex: 'What did you do last weekend?', exm: '너는 지난 주말에 무엇을 했니?' },
    { w: 'visited', m: '방문했다 (visit의 과거형)', ex: 'I visited my aunt in Daejeon.', exm: '나는 대전에 사는 이모 댁에 갔어.' },
    { w: 'watched', m: '보았다 (watch의 과거형)', ex: 'We watched a funny movie.', exm: '우리는 재미있는 영화를 봤어.' },
    { w: 'played', m: '놀았다, 경기를 했다 (play의 과거형)', ex: 'They played soccer after school.', exm: '그들은 방과 후에 축구를 했어.' },
    { w: 'went', m: '갔다 (go의 과거형)', ex: 'I went to the beach last summer.', exm: '나는 지난여름에 바닷가에 갔어.' },
    { w: 'ate', m: '먹었다 (eat의 과거형)', ex: 'We ate tteokbokki for lunch.', exm: '우리는 점심으로 떡볶이를 먹었어.' },
    { w: 'saw', m: '보았다 (see의 과거형)', ex: 'I saw a rainbow in the sky.', exm: '나는 하늘에서 무지개를 봤어.' },
    { w: 'made', m: '만들었다 (make의 과거형)', ex: 'She made a card for her dad.', exm: '그녀는 아빠께 드릴 카드를 만들었어.' },
    { w: 'had', m: '가졌다, 먹었다 (have의 과거형)', ex: 'We had a party at home.', exm: '우리는 집에서 파티를 했어.' },
    { w: 'fun', m: '재미있는, 재미', ex: 'The camping trip was fun.', exm: '캠핑 여행은 재미있었어.' },
    { w: 'exciting', m: '신나는', ex: 'The baseball game was exciting.', exm: '야구 경기는 신났어.' },
    { w: 'delicious', m: '아주 맛있는', ex: 'The soup was delicious.', exm: '그 수프는 아주 맛있었어.' },
    { w: 'boring', m: '지루한', ex: 'The long trip was boring.', exm: '긴 여행은 지루했어.' },
    { w: 'diary', m: '일기', ex: 'I write in my diary every night.', exm: '나는 밤마다 일기를 써.' },
    { w: 'museum', m: '박물관', ex: 'We saw old pots at the museum.', exm: '우리는 박물관에서 옛날 항아리를 봤어.' },
  ],
});
