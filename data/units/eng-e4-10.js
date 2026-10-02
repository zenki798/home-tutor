/* 4학년 영어 · 지금 하는 일 말하기 */
Tutor.registerUnit({
  id: 'eng-e4-10',
  course: 'eng-e4',
  title: '지금 하는 일 말하기',
  summary: 'What are you doing?으로 지금 하는 일을 묻고 I\'m reading.처럼 -ing를 붙여 답해요.',
  goals: [
    'What are you doing?으로 묻고 I\'m reading a book.처럼 답할 수 있어요.',
    '동작 낱말에 -ing를 바르게 붙일 수 있어요(reading, dancing, swimming).',
    'He\'s sleeping., She\'s singing.처럼 다른 사람이 하는 일을 말할 수 있어요.',
    'Are you ~ing?로 묻고 Yes, I am. / No, I\'m not.으로 답할 수 있어요.',
  ],
  standards: [],

  concepts: [
    {
      title: '지금 무엇을 하고 있어요?',
      body: '지금 무엇을 하고 있는지 물을 때는 이렇게 말해요.\n\n**What are you doing?** (너는 지금 무엇을 하고 있니?)\n\n대답은 **I\'m** 다음에 **동작 낱말 + ing**를 써요.\n\n- **I\'m reading** a book. (나는 책을 읽고 있어요.)\n- **I\'m singing** a song. (나는 노래를 부르고 있어요.)\n- **I\'m cooking.** (나는 요리를 하고 있어요.)\n\n**I\'m**은 **I am**을 줄인 말이에요. 동작 낱말에 **-ing**를 붙이면 "~하고 있는 중"이라는 뜻이 돼요. 우리말 "읽**고 있어요**"가 영어로는 **am reading**인 셈이에요.\n\n> ⚠️ I reading.처럼 am(\'m)을 빼먹으면 안 돼요. I\'m과 -ing가 늘 짝꿍으로 함께 다녀요.',
      easy: '사진을 찍는다고 생각해 보세요. "찰칵!" 하는 바로 그 순간에 하고 있는 일이 -ing예요.\n\n- 찰칵! 책을 읽는 중 → I\'m read**ing**.\n- 찰칵! 춤추는 중 → I\'m danc**ing**.\n\nI\'m을 먼저 말하고, 하고 있는 동작 뒤에 ing를 붙이면 돼요.',
      check: {
        type: 'choice',
        q: 'What are you doing?에 알맞은 대답은 무엇일까요?',
        choices: ['I\'m reading a book.', 'I like books.', 'It\'s Monday.'],
        answer: 0,
        why: ['', '좋아하는 것을 말했어요. 질문은 지금 하고 있는 일을 묻고 있어요.', '요일을 말했어요. 요일은 What day is it today?에 대한 대답이에요.'],
        explain: 'What are you doing?은 지금 하고 있는 일을 묻는 말이에요. I\'m reading a book.(책을 읽고 있어요.)처럼 I\'m + -ing로 답해요.',
      },
    },
    {
      title: '-ing 붙이기 ① 그냥 붙이기, e 빼고 붙이기',
      body: '대부분의 동작 낱말은 끝에 **ing를 그냥 붙여요**.\n\n| 낱말 | -ing 꼴 |\n|---|---|\n| read | read**ing** |\n| sing | sing**ing** |\n| sleep | sleep**ing** |\n| play | play**ing** |\n\n그런데 **e로 끝나는 낱말**은 **e를 빼고** ing를 붙여요.\n\n| 낱말 | -ing 꼴 |\n|---|---|\n| danc**e** | danc**ing** |\n| rid**e** | rid**ing** |\n| mak**e** | mak**ing** |\n| writ**e** | writ**ing** |\n\n끝의 e는 소리가 나지 않는 글자라서, ing가 오면 자리를 비켜 주는 거예요.',
      easy: 'e로 끝나는 낱말에서 e는 "조용한 글자"예요. 소리를 내지 않고 맨 끝에 앉아 있지요.\n\ning가 오면 e가 의자를 내주고 떠나요.\n\ndance → danc + ing → **dancing**\n\n그래서 danceing처럼 e와 i가 나란히 붙는 일은 없어요.',
      check: {
        type: 'choice',
        q: '**ride**에 -ing를 붙인 꼴로 바른 것은 무엇일까요?',
        choices: ['riding', 'rideing', 'ridding'],
        answer: 0,
        why: ['', 'e로 끝나는 낱말은 e를 빼고 ing를 붙여요.', 'ride는 e로 끝나는 낱말이라서 d를 두 번 쓰지 않고 e만 빼요.'],
        explain: 'ride는 e로 끝나니까 e를 빼고 ing를 붙여요. rid + ing → **riding**',
      },
    },
    {
      title: '-ing 붙이기 ② 끝 글자를 한 번 더',
      body: '**swim, run, sit**처럼 짧은 낱말 가운데 **모음 글자 하나 + 자음 글자 하나**로 끝나는 낱말은 **끝 자음을 한 번 더 쓰고** ing를 붙여요.\n\n| 낱말 | -ing 꼴 |\n|---|---|\n| swi**m** | swi**mm**ing |\n| ru**n** | ru**nn**ing |\n| si**t** | si**tt**ing |\n| cu**t** | cu**tt**ing |\n\n모음 글자는 a, e, i, o, u예요. swim은 끝이 i(모음 하나) + m(자음 하나)이라서 m을 한 번 더 써요.\n\nread는 끝이 ea(모음 둘) + d라서 그냥 ing만 붙여요(reading). sing은 끝이 자음 둘(ng)이라서 그냥 붙여요(singing).',
      easy: '짧은 모음 소리를 지켜 주는 "울타리"를 하나 더 세운다고 생각해 보세요.\n\nswim의 i는 짧은 소리예요. ing만 붙이면 그 소리가 바뀌기 쉬워서, m을 하나 더 세워 i의 짧은 소리를 지켜 줘요.\n\nswim → swi**mm**ing, run → ru**nn**ing, sit → si**tt**ing',
      check: {
        type: 'ox',
        q: 'swim에 -ing를 붙이면 swiming이에요.',
        answer: false,
        explain: 'swim은 모음 하나(i) + 자음 하나(m)로 끝나는 짧은 낱말이라서 m을 한 번 더 써요. 바른 꼴은 **swimming**이에요.',
      },
    },
    {
      title: '다른 사람이 하는 일 말하기',
      body: '다른 사람이 지금 하고 있는 일을 말할 때는 그 사람을 가리키는 말을 바꿔요.\n\n| 누가 | 말하는 법 | 뜻 |\n|---|---|---|\n| 나 | **I\'m** reading. | 나는 읽고 있어요. |\n| 남자 한 사람 | **He\'s** sleeping. | 그는 자고 있어요. |\n| 여자 한 사람 | **She\'s** singing. | 그녀는 노래하고 있어요. |\n\n- **He\'s** = He is, **She\'s** = She is를 줄인 말이에요.\n- 남자아이·아빠·형은 **he**, 여자아이·엄마·언니는 **she**로 가리켜요.\n\n다른 사람이 하는 일을 물을 때는 **What is he doing?**, **What is she doing?**이라고 해요.',
      easy: '누구 이야기인지에 따라 앞의 말만 갈아 끼우면 돼요. 뒤의 -ing 낱말은 그대로예요.\n\n- 내가 → I\'m dancing.\n- 민수가 → He\'s dancing.\n- 지아가 → She\'s dancing.\n\n민수는 남자아이라서 he, 지아는 여자아이라서 she예요.',
      check: {
        type: 'choice',
        q: '지아가 지금 노래하고 있어요. 지아가 하는 일을 바르게 말한 것은 무엇일까요?',
        choices: ['She\'s singing.', 'He\'s singing.', 'I\'m singing.'],
        answer: 0,
        why: ['', 'He는 남자 한 사람을 가리켜요. 지아는 여자아이라서 She를 써요.', 'I\'m은 "나는"이에요. 다른 사람 이야기는 He\'s나 She\'s로 말해요.'],
        explain: '지아는 여자아이라서 **She\'s**를 써요. She\'s singing.(그녀는 노래하고 있어요.)',
      },
    },
    {
      title: 'Are you ~ing?로 묻고 답하기',
      body: '"너 지금 ~하고 있니?"라고 물을 때는 **Are you**로 시작해요.\n\n**Are you reading?** (너 지금 책 읽고 있니?)\n\n- 맞으면: **Yes, I am.** (응, 그래.)\n- 아니면: **No, I\'m not.** (아니, 그렇지 않아.)\n\n아니라고 답한 뒤에는 지금 하는 일을 덧붙이면 좋아요.\n\nA: Are you sleeping?\nB: No, I\'m not. **I\'m drawing.** (아니, 그림 그리고 있어.)\n\n> ⚠️ 맞다고 할 때 **Yes, I\'m.**이라고 줄여서 끝내면 안 돼요. 문장 끝에서는 줄이지 않고 **Yes, I am.**이라고 해요.',
      easy: '질문의 앞부분 Are you를 뒤집어서 대답한다고 생각해 보세요.\n\n- Are you … ? → **I am**. → 앞에 Yes를 붙여 **Yes, I am.**\n- 아니면 not을 넣어 **No, I\'m not.**\n\n질문에 you(너)가 있으면 대답에는 I(나)가 나와요.',
      check: {
        type: 'choice',
        q: 'A: Are you cooking?\nB: [[?]] I\'m eating.\n\n빈칸에 알맞은 말은 무엇일까요?',
        choices: ['No, I\'m not.', 'Yes, I am.', 'Yes, I\'m.'],
        answer: 0,
        why: ['', 'Yes라고 하면 요리를 하고 있다는 뜻인데, 뒤에서 먹고 있다고 했어요.', 'Yes, I\'m.처럼 줄여서 끝내지 않아요. 그리고 B는 요리가 아니라 먹고 있어요.'],
        explain: 'B는 뒤에서 I\'m eating.(먹고 있어요.)이라고 했으니 요리는 하고 있지 않아요. 그래서 **No, I\'m not.**이 알맞아요.',
      },
    },
  ],

  examples: [
    {
      q: '대화를 완성해 보세요.\n\nA: What are you doing?\nB: [[?]] (나는 수영을 하고 있어요.)',
      steps: [
        '지금 하고 있는 일은 I\'m + -ing 꼴로 말해요.',
        '"수영하다"는 swim이에요. swim은 모음 하나(i) + 자음 하나(m)로 끝나는 짧은 낱말이라서 m을 한 번 더 쓰고 ing를 붙여요: swimming',
        '그래서 I\'m swimming.이라고 답해요.',
      ],
      answer: 'I\'m swimming.',
    },
    {
      q: '대화를 읽고 답해 보세요.\n\nMom: Minsu, are you sleeping?\nMinsu: No, I\'m not. I\'m reading a book.\n\n민수는 지금 무엇을 하고 있나요?',
      steps: [
        'Mom이 Are you sleeping?(자고 있니?)이라고 물었어요.',
        '민수는 No, I\'m not.이라고 했으니 자고 있지 않아요.',
        '이어서 I\'m reading a book.이라고 했어요. reading은 "읽고 있는"이에요.',
      ],
      answer: '민수는 책을 읽고 있어요.',
    },
  ],

  terms: [
    { term: '-ing 꼴', def: '동작 낱말 끝에 ing를 붙인 꼴이에요. I\'m 같은 말과 함께 써서 "지금 ~하고 있다"는 뜻을 나타내요. 예: reading, dancing' },
    { term: 'I\'m', def: 'I am을 줄인 말이에요. 예: I\'m reading.(나는 읽고 있어요.)' },
    { term: 'He\'s / She\'s', def: 'He is(그는 ~이에요) / She is(그녀는 ~이에요)를 줄인 말이에요. 예: He\'s sleeping. She\'s singing.' },
    { term: '모음 글자', def: 'a, e, i, o, u 다섯 글자예요. 나머지 글자는 자음 글자라고 해요.' },
    { term: '동작 낱말', def: 'read(읽다), dance(춤추다), swim(수영하다)처럼 몸이나 마음의 움직임을 나타내는 낱말이에요.' },
    { term: '줄인 말(축약형)', def: '두 낱말을 하나로 줄여 쓴 말이에요. 빠진 글자 자리에 \'(아포스트로피)를 찍어요. 예: I am → I\'m, I\'m not' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'text', concept: 1,
      q: '**read**에 -ing를 붙인 꼴을 써 보세요.',
      answer: ['reading'],
      wrong: [
        { a: 'readding', why: 'read는 끝이 ea(모음 둘) + d라서 d를 두 번 쓰지 않아요. 그냥 ing만 붙여요.' },
        { a: 'reding', why: 'read의 a를 빠뜨렸어요. read 그대로 두고 ing만 붙여요.' },
      ],
      explain: 'read는 그냥 ing를 붙여요. read + ing → **reading**',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '**dance**에 -ing를 붙인 꼴로 바른 것은 무엇일까요?',
      choices: ['dancing', 'danceing', 'dancting', 'dance'],
      answer: 0,
      why: [
        '',
        'e로 끝나는 낱말은 e를 빼고 ing를 붙여요.',
        't는 dance에 없는 글자예요. e만 빼고 ing를 붙여요.',
        'ing를 붙이지 않았어요. 지금 하는 일은 -ing 꼴로 써요.',
      ],
      explain: 'dance는 e로 끝나니까 e를 빼고 ing를 붙여요. danc + ing → **dancing**',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 2,
      q: '**run**에 -ing를 붙인 꼴을 써 보세요.',
      answer: ['running'],
      wrong: [{ a: 'runing', why: 'run은 모음 하나(u) + 자음 하나(n)로 끝나는 짧은 낱말이라서 n을 한 번 더 써요.' }],
      explain: 'run은 u(모음 하나) + n(자음 하나)으로 끝나요. n을 한 번 더 쓰고 ing를 붙여요. → **running**',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 0,
      q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: What are you doing?\nB: [[?]]',
      choices: ['I\'m drawing a picture.', 'I like pictures.', 'It\'s three o\'clock.', 'Yes, I am.'],
      answer: 0,
      why: [
        '',
        '좋아하는 것을 말했어요. 질문은 지금 하고 있는 일을 묻고 있어요.',
        '시각을 말했어요. What time is it?에 대한 대답이에요.',
        'Yes나 No로 답하는 질문이 아니에요. What으로 물으면 하는 일을 말해요.',
      ],
      explain: 'What are you doing?에는 I\'m + -ing로 지금 하는 일을 말해요. I\'m drawing a picture.(그림을 그리고 있어요.)',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '"그는 자고 있어요."를 영어로 바르게 말한 것은 무엇일까요?',
      choices: ['He\'s sleeping.', 'She\'s sleeping.', 'He\'s singing.', 'I\'m sleeping.'],
      answer: 0,
      why: [
        '',
        'She는 여자 한 사람(그녀)을 가리켜요. "그"는 He예요.',
        'singing은 "노래하고 있는"이에요. "자고 있는"은 sleeping이에요.',
        'I\'m은 "나는"이에요. "그는"은 He\'s예요.',
      ],
      explain: '"그는"은 **He\'s**, "자고 있는"은 **sleeping**이에요. He\'s sleeping.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 4,
      q: 'Are you swimming?이라는 물음에 "응, 그래."라고 할 때 Yes, I\'m.이라고 답해요.',
      answer: false,
      explain: '문장 끝에서는 줄이지 않아요. 바른 대답은 **Yes, I am.**이에요. 아니라면 No, I\'m not.이라고 해요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말을 고르세요.\n\nShe\'s [[singing]] a song.',
      choices: ['singing', 'sing', 'singging', 'sings'],
      answer: 0,
      why: [
        '',
        'She\'s 다음에 지금 하는 일을 말할 때는 -ing 꼴을 써요.',
        'sing은 끝이 자음 둘(ng)이라서 g를 두 번 쓰지 않아요.',
        'She\'s 다음에 지금 하는 일을 말할 때는 -ing 꼴을 써요.',
      ],
      explain: 'She\'s(= She is) 다음에는 -ing 꼴이 와요. sing + ing → **singing**. She\'s singing a song.(그녀는 노래를 부르고 있어요.)',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 0,
      q: '낱말을 바르게 늘어놓아 "너는 지금 무엇을 하고 있니?"라는 문장을 만들어 보세요.',
      choices: ['What', 'are', 'you', 'doing?'],
      answer: [0, 1, 2, 3],
      hint: '묻는 말 What으로 시작해요.',
      explain: '**What are you doing?** — What(무엇을)으로 시작하고, are you(너는), doing(하고 있는)으로 끝나요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: '대화를 읽고, 준호가 지금 하고 있는 일을 고르세요.\n\nMom: Junho, are you sleeping?\nJunho: No, I\'m not. I\'m drawing a picture.',
      choices: ['그림 그리기', '잠자기', '책 읽기', '요리하기'],
      answer: 0,
      why: [
        '',
        '엄마가 Are you sleeping?이라고 물었지만, 준호는 No, I\'m not.이라고 답했어요.',
        '책 읽기(reading)는 대화에 나오지 않아요.',
        '요리하기(cooking)는 대화에 나오지 않아요.',
      ],
      hint: 'No, I\'m not. 다음 문장을 잘 읽어 보세요.',
      explain: '준호는 No, I\'m not.(아니요.)이라고 한 뒤 I\'m drawing a picture.(그림을 그리고 있어요.)라고 했어요. 그래서 그림을 그리고 있어요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 sit의 -ing 꼴을 써 보세요.\n\nHe\'s [[sitting]] on the chair.',
      answer: ['sitting'],
      hint: 'sit은 모음 하나 + 자음 하나로 끝나는 짧은 낱말이에요.',
      wrong: [{ a: 'siting', why: 'sit은 i(모음 하나) + t(자음 하나)로 끝나는 짧은 낱말이라서 t를 한 번 더 써요.' }],
      explain: 'sit은 t를 한 번 더 쓰고 ing를 붙여요. → **sitting**. He\'s sitting on the chair.(그는 의자에 앉아 있어요.)',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 1,
      q: '지아가 지금 자전거를 타고 있어요. 바르게 말한 것은 무엇일까요?',
      choices: ['She\'s riding a bike.', 'She\'s rideing a bike.', 'He\'s riding a bike.', 'She\'s ride a bike.'],
      answer: 0,
      why: [
        '',
        'ride는 e로 끝나니까 e를 빼고 ing를 붙여요(riding).',
        '지아는 여자아이라서 He가 아니라 She로 가리켜요.',
        'She\'s 다음에 지금 하는 일은 -ing 꼴로 써요(riding).',
      ],
      hint: '누구를 가리키는지, -ing 꼴의 철자가 맞는지 둘 다 확인해요.',
      explain: '지아는 **She\'s**, ride는 e를 빼고 ing를 붙여 **riding**이에요. She\'s riding a bike.(그녀는 자전거를 타고 있어요.)',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 2,
      q: '-ing 꼴을 **바르게 쓰지 않은** 것은 무엇일까요?',
      choices: ['runing', 'making', 'sitting', 'playing'],
      answer: 0,
      why: [
        '',
        'make는 e로 끝나서 e를 빼고 ing를 붙인 making이 바른 꼴이에요.',
        'sit은 t를 한 번 더 쓴 sitting이 바른 꼴이에요.',
        'play는 그냥 ing를 붙인 playing이 바른 꼴이에요.',
      ],
      explain: 'run은 모음 하나(u) + 자음 하나(n)로 끝나는 짧은 낱말이라서 n을 한 번 더 써야 해요. 바른 꼴은 **running**이에요.',
    },
    {
      id: 'a2', level: 3, type: 'order', concept: 4,
      q: '낱말을 바르게 늘어놓아 "너는 편지를 쓰고 있니?"라는 문장을 만들어 보세요.',
      choices: ['Are', 'you', 'writing', 'a', 'letter?'],
      answer: [0, 1, 2, 3, 4],
      hint: '"~하고 있니?"라고 물을 때는 Are you로 시작해요.',
      explain: '**Are you writing a letter?** — Are you로 묻고, writing(쓰고 있는) 다음에 a letter(편지 한 통)가 와요. write는 e를 빼고 ing를 붙여 writing이에요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'text', concept: 3,
      q: '글을 읽고 물음에 답해 보세요.\n\nIt\'s Sunday. My family is at home. Dad is cooking. Mom is reading a book. My sister is dancing. I\'m drawing a picture.\n\n아빠가 지금 하고 있는 일을 글에 나온 -ing 꼴 낱말 하나로 써 보세요.',
      answer: ['cooking'],
      hint: 'Dad로 시작하는 문장을 찾아요.',
      wrong: [
        { a: 'cook', why: '지금 하고 있는 일이므로 -ing 꼴로 써요. cook + ing → cooking' },
        { a: 'reading', why: 'reading은 엄마(Mom)가 하고 있는 일이에요. Dad로 시작하는 문장을 다시 보세요.' },
        { a: 'dancing', why: 'dancing은 언니(누나)가 하고 있는 일이에요. Dad로 시작하는 문장을 다시 보세요.' },
      ],
      explain: 'Dad is cooking.(아빠는 요리를 하고 있어요.)이라고 했으니 답은 **cooking**이에요. Dad is는 He\'s(He is)와 같은 모양이에요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '대화를 읽고, 빈칸에 알맞은 말을 고르세요.\n\nA: Are you dancing?\nB: [[?]] I\'m dancing with my sister.',
      choices: ['Yes, I am.', 'No, I\'m not.', 'Yes, I\'m.', 'No, I am.'],
      answer: 0,
      why: [
        '',
        'B는 뒤에서 I\'m dancing(춤추고 있어요)이라고 했어요. 춤을 추고 있으니 No가 아니에요.',
        '문장 끝에서는 I\'m으로 줄여 끝내지 않아요. Yes, I am.이라고 해요.',
        'No라고 하면서 I am이라고 하면 뜻이 맞지 않아요. 아니라면 No, I\'m not.이에요.',
      ],
      hint: 'B가 빈칸 뒤에서 한 말을 보면 맞는지 아닌지 알 수 있어요.',
      explain: 'B는 I\'m dancing with my sister.(언니와 춤추고 있어요.)라고 했으니 맞다는 대답 **Yes, I am.**이 알맞아요.',
    },
  ],

  deeper: [
    {
      title: '-ing 낱말은 다른 곳에서도 만나요',
      body: '-ing 꼴은 "지금 하고 있다"는 말 말고도 여러 곳에 나와요.\n\n- **a swimming pool**: 수영(swimming)을 하는 수영장\n- **a reading room**: 책을 읽는(reading) 방\n- I like **swimming**.: 나는 수영하는 것을 좋아해요.\n\n3학년 때 배운 I like 다음에 -ing 꼴을 쓰면 "~하는 것을 좋아해요"가 돼요. 5학년이 되면 좋아하는 일과 그 이유를 말하면서 이런 표현을 더 많이 만나요.\n\n이번 단원에서 익힌 철자 규칙(e 빼기, 끝 글자 한 번 더)은 어디에서 -ing를 쓰든 똑같이 지켜요.',
    },
  ],

  faq: [
    {
      q: 'dance는 왜 e를 빼고 ing를 붙여요?',
      a: 'dance의 끝 e는 소리가 나지 않는 글자예요. ing의 i가 그 자리를 채워도 소리가 그대로라서 e를 빼요. make → making, write → writing도 같아요.',
    },
    {
      q: 'swim은 m을 두 번 쓰는데 read는 왜 d를 두 번 안 써요?',
      a: '끝 글자를 한 번 더 쓰는 것은 **모음 글자 하나 + 자음 글자 하나**로 끝나는 짧은 낱말이에요. swim은 i + m이라서 m을 한 번 더 써요. read는 ea처럼 모음 글자가 둘이라서 그냥 ing만 붙여 reading이에요.',
    },
    {
      q: 'I read a book이랑 I\'m reading a book은 뭐가 달라요?',
      a: 'I\'m reading a book.은 **바로 지금** 책을 읽고 있는 중이라는 뜻이에요. I read books.처럼 -ing가 없으면 평소에 하는 일을 말할 때가 많아요. 지금 하는 일을 물으면 I\'m + -ing로 답해요.',
    },
  ],

  mistakes: [
    'I reading.처럼 am(\'m)을 빠뜨리는 실수 — 지금 하는 일은 I\'m reading.처럼 I\'m과 -ing를 함께 써요.',
    'swiming, danceing처럼 철자를 틀리는 실수 — swim은 m을 한 번 더(swimming), dance는 e를 빼고(dancing) ing를 붙여요.',
    'Are you ~ing?에 Yes, I\'m.이라고 답하는 실수 — 문장 끝에서는 줄이지 않고 Yes, I am.이라고 해요.',
  ],

  gens: [
    {
      id: 'ing-spelling',
      level: 1,
      title: '-ing 꼴 철자 고르기',
      make: function (R) {
        // kind: plain(그냥 붙이기) · e(e 빼기) · dbl(끝 자음 한 번 더)
        var verbs = [
          ['read', 'plain'], ['sing', 'plain'], ['eat', 'plain'], ['sleep', 'plain'], ['cook', 'plain'],
          ['jump', 'plain'], ['walk', 'plain'], ['help', 'plain'], ['look', 'plain'],
          ['dance', 'e'], ['ride', 'e'], ['make', 'e'], ['write', 'e'], ['bake', 'e'], ['smile', 'e'], ['skate', 'e'],
          ['swim', 'dbl'], ['run', 'dbl'], ['sit', 'dbl'], ['cut', 'dbl'], ['hop', 'dbl'], ['clap', 'dbl'],
        ];
        var v = R.pick(verbs);
        var w = v[0];
        var kind = v[1];
        var last = w.charAt(w.length - 1);
        var correct;
        var cands;
        var how;
        if (kind === 'plain') {
          correct = w + 'ing';
          how = '그냥 ing를 붙이는 낱말이에요.';
          cands = [
            [w + last + 'ing', '끝 글자를 한 번 더 쓰는 낱말이 아니에요. 그냥 ing만 붙여요.'],
            [w, 'ing를 붙이지 않았어요.'],
            [w + 's', 's가 아니라 ing를 붙여요.'],
          ];
        } else if (kind === 'e') {
          var stem = w.slice(0, -1);
          correct = stem + 'ing';
          how = 'e로 끝나는 낱말이라서 e를 빼고 ing를 붙여요.';
          cands = [
            [w + 'ing', 'e로 끝나는 낱말은 e를 빼고 ing를 붙여요.'],
            [stem + stem.charAt(stem.length - 1) + 'ing', 'e만 빼면 돼요. 앞 글자를 한 번 더 쓰지 않아요.'],
            [w, 'ing를 붙이지 않았어요.'],
            [w + 's', 's가 아니라 ing를 붙여요.'],
          ];
        } else {
          correct = w + last + 'ing';
          how = '모음 하나 + 자음 하나로 끝나는 짧은 낱말이라서 끝 글자를 한 번 더 쓰고(' + last + last + ') ing를 붙여요.';
          cands = [
            [w + 'ing', '모음 하나 + 자음 하나로 끝나는 짧은 낱말은 끝 글자를 한 번 더 써요.'],
            [w, 'ing를 붙이지 않았어요.'],
            [w + 's', 's가 아니라 ing를 붙여요.'],
          ];
        }
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: kind === 'dbl' ? 2 : 1,
          q: '**' + w + '**에 -ing를 붙인 꼴로 바른 것은 무엇일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || '철자를 다시 확인해요.'; }),
          explain: how + '\n\n' + w + ' → **' + correct + '**',
        };
      },
    },
    {
      id: 'who-is-doing',
      level: 2,
      title: '누가 무엇을 하고 있는지 말하기',
      make: function (R) {
        var subs = [
          { en: 'I\'m', ko: '나는', why: 'I\'m은 "나는"이에요.' },
          { en: 'He\'s', ko: '그는', why: 'He\'s는 "그는"(남자 한 사람)이에요.' },
          { en: 'She\'s', ko: '그녀는', why: 'She\'s는 "그녀는"(여자 한 사람)이에요.' },
        ];
        var acts = [
          { b: 'read', ing: 'reading', bad: 'readding', obj: ' a book', ko: '책을 읽고' },
          { b: 'sing', ing: 'singing', bad: 'singging', obj: ' a song', ko: '노래를 부르고' },
          { b: 'dance', ing: 'dancing', bad: 'danceing', obj: '', ko: '춤을 추고' },
          { b: 'swim', ing: 'swimming', bad: 'swiming', obj: '', ko: '수영을 하고' },
          { b: 'sleep', ing: 'sleeping', bad: 'sleepping', obj: '', ko: '자고' },
          { b: 'run', ing: 'running', bad: 'runing', obj: '', ko: '달리고' },
          { b: 'ride', ing: 'riding', bad: 'rideing', obj: ' a bike', ko: '자전거를 타고' },
          { b: 'eat', ing: 'eating', bad: 'eatting', obj: ' lunch', ko: '점심을 먹고' },
          { b: 'make', ing: 'making', bad: 'makeing', obj: ' a cake', ko: '케이크를 만들고' },
          { b: 'cook', ing: 'cooking', bad: 'cookking', obj: '', ko: '요리를 하고' },
          { b: 'write', ing: 'writing', bad: 'writeing', obj: ' a letter', ko: '편지를 쓰고' },
          { b: 'draw', ing: 'drawing', bad: 'draw', obj: ' a picture', ko: '그림을 그리고' },
          { b: 'play', ing: 'playing', bad: 'play', obj: ' soccer', ko: '축구를 하고' },
        ];
        var si = R.int(0, 2);
        var s = subs[si];
        var a = R.pick(acts);
        var others = subs.filter(function (x, k) { return k !== si; });
        var correct = s.en + ' ' + a.ing + a.obj + '.';
        var cands = [
          [others[0].en + ' ' + a.ing + a.obj + '.', '"' + s.ko + '"' + '에 맞는 말이 아니에요. ' + others[0].why],
          [others[1].en + ' ' + a.ing + a.obj + '.', '"' + s.ko + '"' + '에 맞는 말이 아니에요. ' + others[1].why],
          [s.en + ' ' + a.b + a.obj + '.', '지금 하고 있는 일은 ' + s.en + ' 다음에 -ing 꼴을 써요.'],
          [s.en + ' ' + a.bad + a.obj + '.', '-ing 꼴의 철자를 다시 확인해요. 바른 꼴: ' + a.b + ' → ' + a.ing],
        ];
        // He's read / She's run 은 다른 뜻(has read·has run)으로 맞는 영어가 될 수 있어 오답에서 뺀다
        if ((a.b === 'read' || a.b === 'run') && si !== 0) cands.splice(2, 1);
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: 3,
          q: '"' + s.ko + ' ' + a.ko + ' 있어요."를 영어로 바르게 말한 것은 무엇일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || '다시 확인해요.'; }),
          explain: '"' + s.ko + '" → **' + s.en + '**\n\n' + a.b + ' → **' + a.ing + '** (-ing 꼴)\n\n그래서 ' + correct,
        };
      },
    },
  ],

  vocab: [
    { w: 'read', m: '읽다', ex: 'I\'m **reading** a book.', exm: '나는 책을 읽고 있어요.' },
    { w: 'sing', m: '노래하다', ex: 'She\'s **singing** a song.', exm: '그녀는 노래를 부르고 있어요.' },
    { w: 'dance', m: '춤추다', ex: 'Mina is **dancing** on the stage.', exm: '미나가 무대에서 춤추고 있어요.' },
    { w: 'swim', m: '수영하다', ex: 'He\'s **swimming** in the pool.', exm: '그는 수영장에서 수영하고 있어요.' },
    { w: 'sleep', m: '자다', ex: 'The baby is **sleeping**.', exm: '아기가 자고 있어요.' },
    { w: 'cook', m: '요리하다', ex: 'Dad is **cooking** dinner.', exm: '아빠가 저녁을 요리하고 있어요.' },
    { w: 'draw', m: '그리다', ex: 'I\'m **drawing** a cat.', exm: '나는 고양이를 그리고 있어요.' },
    { w: 'ride', m: '(자전거 등을) 타다', ex: 'She\'s **riding** a bike.', exm: '그녀는 자전거를 타고 있어요.' },
    { w: 'write', m: '쓰다', ex: 'I\'m **writing** a letter.', exm: '나는 편지를 쓰고 있어요.' },
    { w: 'run', m: '달리다', ex: 'The dog is **running** fast.', exm: '개가 빠르게 달리고 있어요.' },
    { w: 'eat', m: '먹다', ex: 'I\'m **eating** lunch.', exm: '나는 점심을 먹고 있어요.' },
    { w: 'sit', m: '앉다', ex: 'He\'s **sitting** on the chair.', exm: '그는 의자에 앉아 있어요.' },
    { w: 'now', m: '지금', ex: 'What are you doing **now**?', exm: '너는 지금 무엇을 하고 있니?' },
  ],
});
