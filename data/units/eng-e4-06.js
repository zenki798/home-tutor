/* 4학년 영어 · 잃어버린 물건 찾기 */
Tutor.registerUnit({
  id: 'eng-e4-06',
  course: 'eng-e4',
  title: '잃어버린 물건 찾기',
  summary: 'Where is my ball?로 물건이 어디 있는지 묻고 in, on, under로 답하며, Is this your ~?로 주인을 확인해요.',
  goals: [
    'Where is my ~?로 물건이 어디 있는지 묻고 It\'s in/on/under ~.로 답할 수 있어요.',
    'Is this your ~?로 내 물건인지 묻고 Yes, it is./No, it isn\'t.로 답할 수 있어요.',
    'my, your, his, her를 알맞게 쓸 수 있어요.',
    '물건을 찾아 준 친구에게 Thank you.라고 하고 You\'re welcome.으로 답할 수 있어요.',
  ],
  standards: ['[4영02-08]', '[4영01-06]', '[4영01-07]', '[4영02-10]'],

  concepts: [
    {
      title: 'Where is ~? 로 위치 묻기',
      body: "물건이 어디 있는지 물을 때는 **Where is ~?** (~은 어디에 있어?)라고 해요.\n\n- **Where is** my ball? (내 공은 어디에 있어?)\n- **Where is** my umbrella? (내 우산은 어디에 있어?)\n\n대답은 **It's ~.** (그것은 ~에 있어.)로 해요. 물건 이름을 다시 말하지 않고 It(그것)으로 받아요.\n\n- **It's** under the chair. (의자 아래에 있어.)\n\n> 💡 It's 는 It is 를, Where's 는 Where is 를 줄인 말이에요.",
      easy: '보물찾기를 떠올려 보세요. "보물 어디 있어?"라고 물으면 친구가 "의자 밑에 있어!"라고 알려 주지요.\n\n- "어디 있어?" → **Where is ~?**\n- "~에 있어!" → **It\'s ~.**\n\n묻는 말과 답하는 말을 짝으로 기억해요.',
      check: {
        type: 'choice',
        q: 'Where is my ball? 에 알맞은 대답은 무엇일까요?',
        choices: ["It's under the chair.", 'Yes, it is.', "You're welcome."],
        answer: 0,
        why: [
          '',
          'Yes, it is. 는 Is this ~? 처럼 "예/아니요"로 답하는 질문의 대답이에요. Where 는 "어디"를 묻고 있어요.',
          "You're welcome. 은 고맙다는 말에 \"천만에.\"라고 답하는 말이에요.",
        ],
        explain: 'Where is ~? 는 "어디에 있어?"라는 뜻이라 위치를 알려 주는 It\'s under the chair.(의자 아래에 있어.)가 알맞아요.',
      },
    },
    {
      title: 'in, on, under — 위치를 나타내는 말',
      body: "물건이 놓인 자리를 말할 때는 **in, on, under** 를 써요.\n\n| 말 | 뜻 | 예 |\n|---|---|---|\n| **in** | ~ 안에 | It's **in** the basket. (바구니 안에 있어.) |\n| **on** | ~ 위에 | It's **on** the bed. (침대 위에 있어.) |\n| **under** | ~ 아래에 | It's **under** the table. (탁자 아래에 있어.) |\n\n이 말들은 늘 장소를 나타내는 낱말 **앞**에 와요. the basket in 이 아니라 **in the basket** 이에요.\n\n> 💡 on 은 물건이 그 위에 **닿아서** 얹혀 있을 때 써요.",
      easy: '손으로 따라 해 보세요.\n\n- **in**: 한 손을 컵처럼 오므리고, 다른 손 손가락을 그 안에 쏙 → 안에\n- **on**: 손바닥 위에 다른 손을 톡 얹기 → 위에\n- **under**: 손바닥 밑으로 다른 손을 쑥 → 아래에\n\n그림에서도 공이 어디 있는지 보고 in, on, under 를 말해 보세요.',
      fig: {
        type: 'svg',
        alt: '왼쪽부터 탁자 위의 공(on), 바구니 안의 공(in), 탁자 아래의 공(under)',
        svg: '<svg viewBox="0 0 480 185"><line x1="5" y1="150" x2="475" y2="150" stroke="currentColor" stroke-width="2"/><rect x="20" y="70" width="120" height="10" fill="var(--fig-1)" stroke="currentColor" stroke-width="2"/><rect x="28" y="80" width="8" height="70" fill="var(--fig-1)" stroke="currentColor" stroke-width="2"/><rect x="124" y="80" width="8" height="70" fill="var(--fig-1)" stroke="currentColor" stroke-width="2"/><circle cx="80" cy="57" r="13" fill="var(--fig-2)" stroke="currentColor" stroke-width="2"/><circle cx="240" cy="92" r="15" fill="var(--fig-2)" stroke="currentColor" stroke-width="2"/><path d="M190 96 L290 96 L280 150 L200 150 Z" fill="var(--fig-1)" stroke="currentColor" stroke-width="2"/><path d="M200 96 Q240 40 280 96" fill="none" stroke="currentColor" stroke-width="2"/><rect x="340" y="70" width="120" height="10" fill="var(--fig-1)" stroke="currentColor" stroke-width="2"/><rect x="348" y="80" width="8" height="70" fill="var(--fig-1)" stroke="currentColor" stroke-width="2"/><rect x="444" y="80" width="8" height="70" fill="var(--fig-1)" stroke="currentColor" stroke-width="2"/><circle cx="400" cy="137" r="13" fill="var(--fig-2)" stroke="currentColor" stroke-width="2"/><text x="80" y="176" text-anchor="middle" font-size="18" fill="currentColor">on</text><text x="240" y="176" text-anchor="middle" font-size="18" fill="currentColor">in</text><text x="400" y="176" text-anchor="middle" font-size="18" fill="currentColor">under</text></svg>',
      },
      check: {
        type: 'choice',
        q: '"침대 위에 있어."를 영어로 바르게 말한 것은 무엇일까요?',
        choices: ["It's on the bed.", "It's under the bed.", "It's in the bed."],
        answer: 0,
        why: ['', 'under 는 "~ 아래에"예요. "위에"는 on 이에요.', 'in 은 "~ 안에"예요. "위에"는 on 이에요.'],
        explain: '"~ 위에"는 on 이에요. 그래서 "침대 위에 있어."는 It\'s on the bed. 예요.',
      },
    },
    {
      title: '집과 교실 물건 낱말',
      body: "물건을 찾을 때 자주 나오는 낱말이에요.\n\n| 낱말 | 뜻 | 낱말 | 뜻 |\n|---|---|---|---|\n| ball | 공 | bed | 침대 |\n| umbrella | 우산 | sofa | 소파 |\n| basket | 바구니 | table | 탁자 |\n| chair | 의자 | | |\n\n위치를 말할 때는 장소 낱말 앞에 **the** 를 붙여요. 서로 알고 있는 \"그\" 의자, \"그\" 침대라는 뜻이에요.\n\n- It's under **the chair**. / It's on **the sofa**.\n\n> 💡 3학년 때 배운 것처럼 umbrella 는 모음 소리로 시작해서 하나를 말할 때 **an umbrella** 라고 해요.",
      easy: '집 안을 한 바퀴 돌며 물건마다 영어 이름표를 붙인다고 생각해 보세요.\n\n침대에는 bed, 소파에는 sofa, 탁자에는 table, 의자에는 chair 이름표를 붙여요.\n\n그리고 "그 침대 위", "그 의자 아래"처럼 말할 때는 이름표 앞에 the 를 붙여 the bed, the chair 라고 해요.',
      check: {
        type: 'choice',
        q: 'basket 의 뜻은 무엇일까요?',
        choices: ['바구니', '우산', '소파'],
        answer: 0,
        why: ['', '우산은 umbrella 예요.', '소파는 sofa 예요.'],
        explain: 'basket 은 바구니예요. It\'s in the basket. 은 "바구니 안에 있어."라는 뜻이에요.',
      },
    },
    {
      title: 'Is this your ~? 로 주인 확인하기',
      body: "찾은 물건이 친구의 것인지 물을 때는 **Is this your ~?** (이것은 네 ~이니?)라고 해요.\n\n- **Is this your** umbrella? (이거 네 우산이니?)\n\n대답은 이렇게 해요.\n\n- 내 것이면: **Yes, it is.** (응, 그래.)\n- 내 것이 아니면: **No, it isn't.** (아니, 그렇지 않아.)\n\n**isn't** 는 is not 을 줄인 말이에요.\n\n> 💡 \"예/아니요\"로 답하는 질문이라서 묻는 말의 끝을 올려 말해요.",
      easy: '분실물 상자에서 우산을 꺼내 친구에게 보여 준다고 생각해 보세요. "이거 네 거야?"\n\n친구가 고개를 끄덕이면 **Yes, it is.**, 고개를 저으면 **No, it isn\'t.** 예요.\n\nIs 로 시작하는 질문에는 is(isn\'t)로 짧게 답한다고 기억해요.',
      check: {
        type: 'ox',
        q: "Is this your umbrella? 에 No, it isn't. 라고 답하면 \"응, 내 우산이야.\"라는 뜻이에요.",
        answer: false,
        explain: "No, it isn't. 는 \"아니, 그렇지 않아.\", 곧 내 우산이 아니라는 뜻이에요. 내 우산이면 Yes, it is. 라고 해요.",
      },
    },
    {
      title: 'my, your, his, her — 누구의 것인지 말하기',
      body: "물건 이름 앞에 붙여서 **누구의 것인지** 나타내는 말이에요.\n\n| 말 | 뜻 | 예 |\n|---|---|---|\n| **my** | 나의 | my ball (내 공) |\n| **your** | 너의 | your ball (네 공) |\n| **his** | 그의(남자) | his ball (그의 공) |\n| **her** | 그녀의(여자) | her ball (그녀의 공) |\n\n앞에서 배운 he(그)와 she(그녀)처럼, 남자의 것은 **his**, 여자의 것은 **her** 예요.\n\n예: 서준이(남자)의 공 → **his** ball, 지아(여자)의 공 → **her** ball",
      easy: '물건에 이름 스티커를 붙인다고 생각해 보세요.\n\n- 내 거 → **my** 스티커\n- 지금 내 말을 듣는 친구 거 → **your** 스티커\n- 남자아이 거 → **his** 스티커\n- 여자아이 거 → **her** 스티커\n\n스티커는 늘 물건 이름 앞에 붙여요: my bag, his cap.',
      check: {
        type: 'choice',
        q: '지아(여자)의 우산을 가리키며 다른 친구에게 말해요. 알맞은 것은 무엇일까요?\n\nThis is [[her]] umbrella.',
        choices: ['her', 'his', 'my'],
        answer: 0,
        why: ['', 'his 는 남자의 것을 나타내요. 지아는 여자예요.', 'my 는 "나의"예요. 지아의 우산이니 her 를 써요.'],
        explain: '여자의 것을 나타낼 때는 her 를 써요. 그래서 This is her umbrella. 예요.',
      },
    },
    {
      title: '고마움 표현하기',
      body: "친구가 잃어버린 물건을 찾아 주면 **Thank you.** (고마워.)라고 말해요.\n\n고맙다는 말을 들으면 **You're welcome.** (천만에.)이라고 대답해요.\n\n- A: Here is your ball. (네 공 여기 있어.)\n- B: **Thank you.**\n- A: **You're welcome.**\n\n**You're** 는 You are 를 줄인 말이에요.",
      easy: '고마움은 탁구공처럼 주고받아요.\n\n친구가 "고마워!"(Thank you.)를 보내면, 나는 "천만에!"(You\'re welcome.)로 받아 줘요.\n\n"Thank you."를 들었는데 "Thank you."로 똑같이 돌려주면 공이 엉뚱한 곳으로 가는 셈이에요.',
      check: {
        type: 'choice',
        q: '친구가 Thank you. 라고 했어요. 알맞은 대답은 무엇일까요?',
        choices: ["You're welcome.", 'Yes, it is.', "It's on the sofa."],
        answer: 0,
        why: [
          '',
          'Yes, it is. 는 Is this ~? 질문에 답하는 말이에요.',
          '위치를 알려 주는 말이에요. 고맙다는 말에는 "천만에."라고 답해요.',
        ],
        explain: "고맙다는 말에는 You're welcome.(천만에.)이라고 답해요.",
      },
    },
  ],

  examples: [
    {
      q: '그림을 보고 물음에 답해 보세요.\n\nWhere is my ball?',
      fig: {
        type: 'svg',
        alt: '탁자와 공이 있는 그림',
        svg: '<svg viewBox="0 0 220 150"><line x1="10" y1="140" x2="210" y2="140" stroke="currentColor" stroke-width="2"/><rect x="40" y="60" width="140" height="10" fill="var(--fig-1)" stroke="currentColor" stroke-width="2"/><rect x="50" y="70" width="8" height="70" fill="var(--fig-1)" stroke="currentColor" stroke-width="2"/><rect x="162" y="70" width="8" height="70" fill="var(--fig-1)" stroke="currentColor" stroke-width="2"/><circle cx="110" cy="127" r="13" fill="var(--fig-2)" stroke="currentColor" stroke-width="2"/></svg>',
      },
      steps: [
        'Where is my ball? 은 "내 공은 어디에 있어?"라는 뜻이에요.',
        '그림에서 공은 탁자(table) 아래 바닥에 있어요. "~ 아래에"는 under 예요.',
        "공을 It(그것)으로 받아 It's under the table. 이라고 답해요.",
      ],
      answer: "**It's under the table.**",
    },
    {
      q: '친구 하윤이가 우산을 찾고 있어요. 소파 위에 있는 우산을 보여 주며 하윤이의 것인지 물어보세요.',
      steps: [
        '"이것은 네 ~이니?"는 Is this your ~? 예요.',
        '우산은 umbrella 예요.',
        '그래서 Is this your umbrella? 라고 물어요. 하윤이의 것이면 Yes, it is. 라고 답할 거예요.',
      ],
      answer: '**Is this your umbrella?**',
    },
  ],

  terms: [
    { term: 'Where is ~?', def: '"~은 어디에 있어?"라고 물건이 있는 곳을 묻는 말이에요. 예: Where is my ball?' },
    { term: 'in, on, under', def: '물건이 있는 자리를 나타내는 말이에요. in 은 ~ 안에, on 은 ~ 위에, under 는 ~ 아래에예요.' },
    { term: 'Is this your ~?', def: '"이것은 네 ~이니?"라고 물건의 주인을 확인하는 말이에요. Yes, it is. 나 No, it isn\'t. 로 답해요.' },
    { term: 'my, your, his, her', def: '물건 이름 앞에서 누구의 것인지 나타내는 말이에요. 나의, 너의, 그의, 그녀의라는 뜻이에요.' },
    { term: "You're welcome.", def: '"천만에."라는 뜻으로, 고맙다는 말(Thank you.)에 대답하는 말이에요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 1,
      q: '그림을 보고 빈칸에 알맞은 말을 고르세요.\n\nWhere is my ball?\nIt\'s [[on]] the table.',
      fig: {
        type: 'svg',
        alt: '탁자와 공이 있는 그림',
        svg: '<svg viewBox="0 0 220 150"><line x1="10" y1="140" x2="210" y2="140" stroke="currentColor" stroke-width="2"/><rect x="40" y="60" width="140" height="10" fill="var(--fig-1)" stroke="currentColor" stroke-width="2"/><rect x="50" y="70" width="8" height="70" fill="var(--fig-1)" stroke="currentColor" stroke-width="2"/><rect x="162" y="70" width="8" height="70" fill="var(--fig-1)" stroke="currentColor" stroke-width="2"/><circle cx="110" cy="47" r="13" fill="var(--fig-2)" stroke="currentColor" stroke-width="2"/></svg>',
      },
      choices: ['on', 'under', 'in'],
      answer: 0,
      why: ['', 'under 는 "~ 아래에"예요. 그림의 공은 탁자 위에 있어요.', 'in 은 "~ 안에"예요. 그림의 공은 탁자 위에 얹혀 있어요.'],
      explain: '공이 탁자 위에 얹혀 있으니 "~ 위에"인 on 을 써요. It\'s on the table.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '그림을 보고 빈칸에 알맞은 말을 고르세요.\n\nWhere is my ball?\nIt\'s [[in]] the basket.',
      fig: {
        type: 'svg',
        alt: '바구니와 공이 있는 그림',
        svg: '<svg viewBox="0 0 220 150"><line x1="10" y1="140" x2="210" y2="140" stroke="currentColor" stroke-width="2"/><circle cx="110" cy="82" r="15" fill="var(--fig-2)" stroke="currentColor" stroke-width="2"/><path d="M60 86 L160 86 L150 140 L70 140 Z" fill="var(--fig-1)" stroke="currentColor" stroke-width="2"/><path d="M70 86 Q110 30 150 86" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
      },
      choices: ['in', 'on', 'under'],
      answer: 0,
      why: ['', 'on 은 "~ 위에"예요. 그림의 공은 바구니 안에 들어 있어요.', 'under 는 "~ 아래에"예요. 그림의 공은 바구니 안에 들어 있어요.'],
      explain: '공이 바구니 안에 들어 있으니 "~ 안에"인 in 을 써요. It\'s in the basket.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 1,
      q: '"~ 아래에"를 뜻하는 영어 낱말을 쓰세요.\n\nIt\'s [[under]] the chair. (의자 아래에 있어.)',
      answer: ['under'],
      wrong: [
        { a: 'on', why: 'on 은 "~ 위에"예요. "~ 아래에"는 under 예요.' },
        { a: 'in', why: 'in 은 "~ 안에"예요. "~ 아래에"는 under 예요.' },
      ],
      explain: '"~ 아래에"는 under 예요. It\'s under the chair. 는 "의자 아래에 있어."라는 뜻이에요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: 'umbrella 의 뜻은 무엇일까요?',
      choices: ['우산', '바구니', '소파', '침대'],
      answer: 0,
      why: ['', '바구니는 basket 이에요.', '소파는 sofa 예요.', '침대는 bed 예요.'],
      explain: 'umbrella 는 우산이에요. 비 오는 날 쓰는 물건이지요.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 3,
      q: "Is this your bag? 에 Yes, it is. 라고 답하면 \"응, 내 가방이야.\"라는 뜻이에요.",
      answer: true,
      explain: 'Yes, it is. 는 "응, 그래."라는 뜻이에요. 그러니 내 가방이 맞다는 대답이에요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 4,
      q: '"그녀의 가방"을 영어로 바르게 나타낸 것은 무엇일까요?',
      choices: ['her bag', 'his bag', 'my bag', 'your bag'],
      answer: 0,
      why: ['', 'his 는 "그의(남자)"예요.', 'my 는 "나의"예요.', 'your 는 "너의"예요.'],
      explain: '"그녀의"는 her 예요. 그래서 "그녀의 가방"은 her bag 이에요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 5,
      q: "A: Here is your umbrella.\nB: Thank you.\nA: [[You're welcome.]]\n\n빈칸에 들어갈 말로 알맞은 것은 무엇일까요?",
      choices: ["You're welcome.", 'No, it isn\'t.', "Sorry, I can't.", "It's on the bed."],
      answer: 0,
      why: [
        '',
        'Is this ~? 질문에 아니라고 답하는 말이에요.',
        '함께 하자는 제안을 거절하는 말이에요.',
        '위치를 알려 주는 말이에요. 고맙다는 말에는 "천만에."라고 답해요.',
      ],
      explain: "Thank you.(고마워.)에는 You're welcome.(천만에.)이라고 답해요.",
    },
    {
      id: 'p8', level: 1, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 알맞은 낱말을 쓰세요. (내 공은 어디에 있어?)\n\n[[Where]] is my ball?',
      answer: ['Where'],
      wrong: [
        { a: 'What', why: 'What 은 "무엇"이에요. "어디"를 물을 때는 Where 를 써요.' },
        { a: 'Who', why: 'Who 는 "누구"예요. "어디"를 물을 때는 Where 를 써요.' },
      ],
      explain: '"어디"를 물을 때는 Where 를 써요. Where is my ball? 은 "내 공은 어디에 있어?"라는 뜻이에요.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 0,
      q: '"내 우산은 어디에 있어?"가 되도록 낱말을 순서대로 놓으세요.',
      choices: ['Where', 'is', 'my', 'umbrella?'],
      answer: [0, 1, 2, 3],
      hint: '묻는 말 Where 가 맨 앞에 와요.',
      explain: 'Where(어디) + is(있니) + my umbrella(내 우산). 그래서 Where is my umbrella? 예요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '서준이(남자)가 공을 찾고 있어요. 민수가 서준이의 공을 찾아서 지아에게 보여 주며 말해요.\n\nThis is [[his]] ball.\n\n빈칸에 알맞은 말은 무엇일까요?',
      choices: ['his', 'her', 'my', 'your'],
      answer: 0,
      why: [
        '',
        'her 는 여자의 것을 나타내요. 서준이는 남자예요.',
        'my 는 "나의"예요. 말하는 민수의 공이 아니라 서준이의 공이에요.',
        'your 는 "너의"예요. 지금 말을 듣는 지아의 공이 아니라 서준이의 공이에요.',
      ],
      hint: '서준이는 남자예요. he(그)의 것은 무엇이라고 할까요?',
      explain: '남자인 서준이의 것이므로 "그의"인 his 를 써요. This is his ball.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 1,
      q: "글을 읽고 답하세요.\n\nI can't find my bag. (find: 찾다)\nIt isn't on the bed.\nIt isn't under the table.\nOh, it's on the sofa!\n\n가방은 어디에 있었나요?",
      choices: ['소파 위', '침대 위', '탁자 아래', '바구니 안'],
      answer: 0,
      why: [
        '',
        'It isn\'t on the bed. 는 "침대 위에 없어."라는 뜻이에요.',
        'It isn\'t under the table. 은 "탁자 아래에 없어."라는 뜻이에요.',
        '글에 basket(바구니)은 나오지 않아요.',
      ],
      hint: "isn't 가 있는 문장은 \"거기에 없다\"는 뜻이에요. 마지막 문장을 보세요.",
      explain: "침대 위(on the bed)와 탁자 아래(under the table)에는 없었고, 마지막에 it's on the sofa! 라고 했어요. 그래서 가방은 소파 위에 있었어요.",
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 3,
      q: "A: Is this your umbrella?\nB: [[Yes, it is.]] Thank you!\n\n빈칸에 들어갈 말로 알맞은 것은 무엇일까요?",
      choices: ['Yes, it is.', "No, it isn't.", "You're welcome.", "It's under the chair."],
      answer: 0,
      why: [
        '',
        '내 것이 아니라고 해 놓고 고맙다고 하면 말이 맞지 않아요.',
        '고맙다는 말에 대답하는 말이에요. 여기서는 Is this your ~? 에 답해야 해요.',
        '위치를 알려 주는 말이에요. Is this your ~? 는 "예/아니요"로 답해요.',
      ],
      hint: 'B가 Thank you! 라고 한 까닭을 생각해 보세요.',
      explain: 'B가 우산을 받고 고맙다고 했으니 자기 우산이 맞다는 뜻이에요. 그래서 Yes, it is. 가 알맞아요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'order', concept: 5,
      q: '자연스러운 대화가 되도록 순서대로 놓으세요.',
      choices: ['Where is my cap?', "It's under the bed.", 'Oh, thank you.', "You're welcome."],
      answer: [0, 1, 2, 3],
      hint: '묻기 → 알려 주기 → 고마워하기 → 대답하기 순서예요.',
      explain: '모자가 어디 있는지 묻고(Where is my cap?), 침대 아래에 있다고 알려 주고(It\'s under the bed.), 고맙다고 하고(Oh, thank you.), 천만에라고 답해요(You\'re welcome.).',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: "글을 읽고 답하세요.\n\nThe basket is on the table.\nMy ball is in the basket.\n\n공은 어디에 있나요?",
      choices: ['탁자 위에 놓인 바구니 안', '탁자 아래 바구니 안', '바구니 아래', '탁자 아래'],
      answer: 0,
      why: [
        '',
        '바구니는 탁자 위(on the table)에 있어요. 탁자 아래가 아니에요.',
        '공은 바구니 안(in the basket)에 있어요. under 가 아니에요.',
        '공은 바구니 안(in)에 있고, 바구니는 탁자 위(on)에 있어요.',
      ],
      hint: '두 문장을 차례로 읽어요. 먼저 바구니가 어디 있는지, 그다음 공이 어디 있는지 찾아요.',
      explain: '첫 문장에서 바구니가 탁자 위(on the table)에 있고, 둘째 문장에서 공이 바구니 안(in the basket)에 있어요. 그래서 공은 탁자 위에 놓인 바구니 안에 있어요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 0,
      q: '바르게 쓴 문장은 무엇일까요?',
      choices: ["It's under the chair.", "It's the chair under.", "Its under the chair.", "It's under chair."],
      answer: 0,
      why: [
        '',
        'under 는 장소를 나타내는 낱말 앞에 와요. under the chair 로 써요.',
        "It is 를 줄인 말은 작은 점(')을 찍어 It's 로 써요.",
        '서로 알고 있는 그 의자이므로 chair 앞에 the 를 붙여요.',
      ],
      hint: "It's 의 모양, under 의 자리, chair 앞을 하나씩 살펴보세요.",
      explain: "It is 를 줄인 It's, 장소 낱말 앞에 오는 under, 그리고 the chair. 그래서 It's under the chair. 가 바른 문장이에요.",
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'text', concept: 4,
      q: '하윤이가 잃어버린 우산을 지아가 찾았어요. 지아가 하윤이에게 물어요. 빈칸에 알맞은 낱말 하나를 쓰세요.\n\nJia: Is this [[your]] umbrella, Hayun?\nHayun: Yes, it is. Thank you!',
      answer: ['your'],
      hint: '지아가 하윤이에게 직접 "네 우산이니?"라고 묻고 있어요.',
      wrong: [
        { a: 'my', why: 'my 는 "나의"예요. 지아는 하윤이에게 "네 우산이니?"라고 묻고 있으니 your 를 써요.' },
        { a: 'her', why: 'her 는 말을 듣는 사람이 아닌 다른 여자의 것을 말할 때 써요. 하윤이에게 직접 묻는 말이니 your 를 써요.' },
      ],
      explain: '지아가 하윤이에게 직접 "네 우산이니?"라고 묻는 말이므로 "너의"인 your 를 써요. Is this your umbrella?',
    },
  ],

  deeper: [
    {
      title: '위치를 나타내는 말은 더 있어요',
      body: 'in, on, under 말고도 위치를 나타내는 말이 많아요. 5학년에서 장소와 위치를 말하는 단원에서 next to(~ 옆에)처럼 더 많은 말을 배워요.\n\n이런 말들은 모두 장소를 나타내는 낱말 **앞**에 온다는 점이 같아요. in the box, on the desk, under the bed 처럼요. 우리말은 "상자 안에"처럼 뒤에 붙이니 순서가 반대예요.',
    },
  ],

  faq: [
    {
      q: 'Where is 랑 Where are 는 뭐가 달라요?',
      a: '물건 하나를 물을 때는 Where is ~?(Where is my ball?)를 써요. 이 단원에서는 물건 하나를 찾는 말을 배워요. 여러 개를 물을 때 쓰는 말은 나중에 배워요.',
    },
    {
      q: 'his 랑 her 는 어떻게 구별해요?',
      a: '남자의 것은 his, 여자의 것은 her 예요. 앞에서 배운 he(그)와 she(그녀)를 떠올려 보세요. he 의 것은 his, she 의 것은 her 예요.',
    },
    {
      q: '대답할 때 왜 물건 이름 대신 It 을 써요?',
      a: '질문에서 이미 물건 이름(my ball)을 말했으니, 대답에서는 It(그것)으로 짧게 받아요. It\'s under the chair. 처럼요. 우리말에서도 "그거 의자 밑에 있어."라고 하지요.',
    },
  ],

  mistakes: [
    "the chair under 처럼 위치를 나타내는 말을 뒤에 쓰는 실수 — in, on, under 는 장소 낱말 앞에 와요: under the chair.",
    '여자의 물건을 his 로 말하는 실수 — 남자의 것은 his, 여자의 것은 her 예요.',
    "Thank you. 에 Thank you. 로 답하는 실수 — 고맙다는 말에는 You're welcome. 으로 답해요.",
  ],

  vocab: [
    { w: 'ball', m: '공', ex: 'Where is my ball?', exm: '내 공은 어디에 있어?' },
    { w: 'umbrella', m: '우산', ex: 'Is this your umbrella?', exm: '이거 네 우산이니?' },
    { w: 'basket', m: '바구니', ex: "It's in the basket.", exm: '그것은 바구니 안에 있어.' },
    { w: 'chair', m: '의자', ex: "It's under the chair.", exm: '그것은 의자 아래에 있어.' },
    { w: 'bed', m: '침대', ex: 'My cap is on the bed.', exm: '내 모자는 침대 위에 있어.' },
    { w: 'sofa', m: '소파', ex: 'The cat is on the sofa.', exm: '고양이가 소파 위에 있어.' },
    { w: 'table', m: '탁자', ex: "It's under the table.", exm: '그것은 탁자 아래에 있어.' },
    { w: 'in', m: '~ 안에', ex: 'The pencil is in the bag.', exm: '연필은 가방 안에 있어.' },
    { w: 'on', m: '~ 위에', ex: 'The book is on the desk.', exm: '책은 책상 위에 있어.' },
    { w: 'under', m: '~ 아래에', ex: 'The dog is under the bed.', exm: '개가 침대 아래에 있어.' },
    { w: 'where', m: '어디에', ex: 'Where is my bag?', exm: '내 가방은 어디에 있어?' },
    { w: 'welcome', m: '환영받는 (You\'re welcome. 천만에.)', ex: "A: Thank you. B: You're welcome.", exm: 'A: 고마워. B: 천만에.' },
  ],
});
