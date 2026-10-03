/* 6학년 영어 · 앞으로의 계획 말하기 */
Tutor.registerUnit({
  id: 'eng-e6-06',
  course: 'eng-e6',
  title: '앞으로의 계획 말하기',
  summary: "What are you going to do?로 계획을 묻고 I'm going to ~.로 가까운 앞날에 할 일을 말해요.",
  goals: [
    "be going to를 써서 앞으로 할 일을 말할 수 있어요.",
    '주인공(I, he, they …)에 맞게 am·is·are를 골라 다른 사람의 계획을 말할 수 있어요.',
    'will과 be going to로 계획을 말하고, 앞으로의 때를 나타내는 말을 쓸 수 있어요.',
    '계획을 소개하는 글을 읽고 내용을 찾을 수 있어요.',
  ],
  standards: [],

  concepts: [
    {
      title: "be going to로 계획 말하기",
      body: "앞으로 하기로 마음먹은 일(**계획**)을 말할 때는 **be going to + 동사원형**을 써요. \"~할 거예요\"라는 뜻이에요.\n\n- I'm **going to clean** my room. (나는 내 방을 청소할 거예요.)\n- I'm **going to visit** my grandma. (나는 할머니 댁에 갈 거예요.)\n\n**동사원형**은 -s, -ed, -ing가 붙지 않은 동사의 원래 모양이에요. going to 뒤에는 꼭 원래 모양을 써요.\n\n> ⚠️ I'm going to visits ✗ / I'm going to visited ✗ → I'm going to **visit** ✔",
      easy: "going to를 \"앞날로 가는 기차\"라고 생각해 보세요. 기차에 타는 동사는 짐(-s, -ed, -ing)을 모두 내려놓고 맨몸(원래 모양)으로 타야 해요.\n\nI'm going to + **play** → \"나는 놀 거예요.\"",
      check: {
        type: 'choice',
        q: "빈칸에 알맞은 말은 무엇일까요?\n\nI'm going to [[visit]] my grandma this Sunday.",
        choices: ['visit', 'visits', 'visited'],
        answer: 0,
        why: ['', 'going to 뒤에는 -s를 붙이지 않은 원래 모양을 써요.', 'visited는 지난 일을 말할 때 써요. going to 뒤에는 원래 모양을 써요.'],
        explain: 'going to 뒤에는 동사원형을 써요. "I\'m going to visit my grandma."(나는 할머니 댁에 갈 거예요.)',
      },
    },
    {
      title: '주인공에 맞게 am·is·are 고르기',
      body: "be going to의 **be**는 주인공(주어)에 따라 **am, is, are**로 바뀌어요. going to와 동사원형은 그대로예요.\n\n| 주인공 | be | 줄임말 | 예 |\n|---|---|---|---|\n| I | am | I'm | I'm going to read a book. |\n| you, we, they | are | you're, we're, they're | They're going to play soccer. |\n| he, she, 한 사람 이름 | is | he's, she's | He's going to visit his uncle. |\n\n- Mina **is** going to bake cookies.\n- Jiho and Sua **are** going to watch a movie. (두 사람이니 are)\n\n하지 **않을** 계획은 be 뒤에 **not**을 넣어요: I'm **not** going to watch TV tonight.",
      easy: "be는 주인공 옆에서 옷을 갈아입는 친구예요.\n\n- I 옆에서는 am\n- he, she, Mina처럼 한 사람 옆에서는 is\n- you, we, they, 두 사람 이상 옆에서는 are\n\n그 뒤의 going to + 원래 모양은 언제나 똑같아요.",
      check: {
        type: 'short',
        q: '"민아는 책을 읽을 거예요."라는 뜻이 되게 빈칸에 알맞은 낱말 하나를 쓰세요.\n\nMina [[is]] going to read a book.',
        answer: ['is'],
        wrong: [
          { a: 'are', why: 'Mina는 한 사람이에요. 한 사람 주인공에는 is를 써요.' },
          { a: 'am', why: 'am은 I와 함께만 써요. Mina 같은 한 사람에는 is를 써요.' },
        ],
        explain: 'Mina는 한 사람(she)이라서 is를 써요. "Mina is going to read a book."',
      },
    },
    {
      title: '계획 묻고 답하기',
      body: "다른 사람의 계획을 물을 때는 이렇게 말해요.\n\n- **What are you going to do** this Saturday? (이번 토요일에 뭐 할 거야?) → I'm going to clean my room.\n- **What is he going to do** tomorrow? (그는 내일 뭐 할 거야?) → He's going to visit his uncle.\n\n어떤 일을 할 건지 **예/아니요**로 물을 때는 be를 맨 앞으로 보내요.\n\n- **Are you going to** go swimming? — Yes, I am. / No, I'm not.\n\n> 💡 What으로 물으면 할 일을 말하고, Are you로 물으면 Yes/No로 답해요.",
      easy: "What(무엇)으로 물으면 \"무엇을 할지\"를 대답해요. 그래서 대답에도 I'm going to ~가 들어가요.\n\nAre you going to ~?로 물으면 \"할 거야, 안 할 거야?\"를 묻는 거라서 Yes, I am. / No, I'm not.으로 짧게 답해요.",
      check: {
        type: 'choice',
        q: '"What are you going to do tomorrow?"에 알맞은 대답은 무엇일까요?',
        choices: ["I'm going to play badminton.", 'Yes, I am.', 'I played badminton.'],
        answer: 0,
        why: ['', 'What으로 묻는 말에는 Yes/No가 아니라 무엇을 할지 말해요.', '지난 일을 말했어요. 내일(tomorrow) 할 일을 물었어요.'],
        explain: '"내일 뭐 할 거야?"라는 물음에는 "I\'m going to ~."로 할 일을 말해요.',
      },
    },
    {
      title: 'will로도 계획을 말해요',
      body: "5학년에서 배운 **will**로도 앞으로의 일을 말할 수 있어요. **will + 동사원형**이에요.\n\n- I **will** go camping this summer. = I'm **going to** go camping this summer.\n- He **will** visit his uncle. = He's **going to** visit his uncle.\n\n| | will | be going to |\n|---|---|---|\n| 모양 | 주인공이 바뀌어도 will 그대로 | 주인공에 따라 am·is·are |\n| 줄임말 | I'll, he'll, they'll | I'm, he's, they're |\n| 부정 | won't (= will not) | I'm not going to |\n\n두 가지 모두 \"~할 거예요\"라는 계획을 말할 때 써요.\n\n> ⚠️ will 뒤에는 to를 쓰지 않아요: I will to go ✗ → I will go ✔",
      easy: "will과 be going to는 같은 곳으로 가는 두 갈래 길이에요. 둘 다 \"~할 거예요\"에 도착해요.\n\n- will 길: 주인공이 누구든 will + 원래 모양\n- be going to 길: 주인공에 맞게 am·is·are를 고른 다음 going to + 원래 모양",
      check: {
        type: 'ox',
        q: '"I will to visit my aunt."는 바른 문장이에요.',
        answer: false,
        explain: 'will 뒤에는 to 없이 바로 동사원형을 써요. 바른 문장은 "I will visit my aunt." 또는 "I\'m going to visit my aunt."예요.',
      },
    },
    {
      title: '앞으로의 때를 나타내는 말',
      body: "계획을 말할 때는 **언제** 할지도 함께 말하면 좋아요. 보통 문장 끝에 써요.\n\n| 영어 | 뜻 |\n|---|---|\n| this afternoon | 오늘 오후 |\n| this evening / tonight | 오늘 저녁 / 오늘 밤 |\n| tomorrow | 내일 |\n| this weekend | 이번 주말 |\n| next Saturday | 다음 (주) 토요일 |\n| next week | 다음 주 |\n| this winter | 이번 겨울 |\n\n- I'm going to play soccer **this afternoon**.\n- We're going to visit Jeju **this winter**.\n\n> ⚠️ yesterday(어제), last Sunday(지난 일요일)는 지난 때를 나타내는 말이라서 계획과 함께 쓰지 않아요.",
      easy: "this는 \"이번\", next는 \"다음\"이에요.\n\n- this + weekend → 이번 주말\n- next + week → 다음 주\n\n반대로 last는 \"지난\"이에요. last가 보이면 이미 지나간 때예요.",
      check: {
        type: 'choice',
        q: '앞으로의 계획을 말할 때 쓰기에 알맞지 **않은** 말은 무엇일까요?',
        choices: ['yesterday', 'tomorrow', 'next week'],
        answer: 0,
        why: ['', 'tomorrow(내일)는 앞으로의 때예요. 계획과 함께 쓸 수 있어요.', 'next week(다음 주)는 앞으로의 때예요. 계획과 함께 쓸 수 있어요.'],
        explain: 'yesterday(어제)는 지나간 때예요. 계획은 tomorrow, next week처럼 앞으로의 때와 함께 말해요.',
      },
    },
    {
      title: '계획을 소개하는 글 읽고 쓰기',
      body: "계획을 소개하는 글은 보통 **언제 → 무엇을 → (누구와·왜)** 차례로 써요.\n\n> This weekend, I'm going to be busy. On Saturday morning, I'm going to clean my room. In the afternoon, I'm going to play soccer with my friends. On Sunday, I'm going to visit my uncle.\n\n글을 읽을 때는\n1. 때를 나타내는 말(On Saturday morning, On Sunday …)에 표시하고,\n2. 그 뒤의 going to + 동사원형에서 **할 일**을 찾아요.\n\n글을 쓸 때도 같은 틀을 써요: **때 + I'm going to + 할 일.**",
      easy: "계획 글은 달력과 같아요. 날짜 칸(때)을 먼저 찾고, 그 칸에 적힌 할 일(going to 뒤의 말)을 읽으면 돼요.\n\n- On Saturday morning → clean my room\n- On Sunday → visit my uncle",
      check: {
        type: 'ox',
        q: "글을 읽고 답하세요.\n\nOn Saturday morning, I'm going to clean my room. On Sunday, I'm going to visit my uncle.\n\n글쓴이는 일요일에 방을 청소할 거예요.",
        answer: false,
        explain: '방 청소(clean my room)는 토요일 아침(On Saturday morning)에 할 일이에요. 일요일(On Sunday)에는 삼촌 댁에 갈 거예요(visit my uncle).',
      },
    },
  ],

  examples: [
    {
      q: "계획표를 보고 물음에 영어로 답해 보세요.\n\n| 때 | 할 일 |\n|---|---|\n| 토요일 오전 | clean my room |\n| 토요일 오후 | play soccer |\n\nWhat are you going to do this Saturday afternoon?",
      steps: [
        '묻는 말에서 때를 찾아요. this Saturday afternoon은 "이번 토요일 오후"예요.',
        '계획표에서 토요일 오후 칸을 찾아요. 할 일은 play soccer예요.',
        "주인공이 I이니 I'm going to를 쓰고, 그 뒤에 할 일을 원래 모양 그대로 붙여요.",
      ],
      answer: "I'm going to play soccer.",
    },
    {
      q: '"그는 내일 동물원에 갈 거예요."를 be going to를 써서 영어로 나타내 보세요. (동물원에 가다: go to the zoo)',
      steps: [
        '주인공은 he(그)예요. 한 사람이니 be는 is, 줄여서 He\'s예요.',
        'going to 뒤에 할 일을 원래 모양으로 써요: go to the zoo',
        '때를 나타내는 말 tomorrow(내일)를 끝에 붙여요.',
      ],
      answer: "He's going to go to the zoo tomorrow. (= He is going to go to the zoo tomorrow.)",
    },
  ],

  terms: [
    { term: 'be going to', def: "앞으로 할 계획을 말할 때 써요. \"~할 거예요\"라는 뜻이고, 뒤에 동사원형이 와요. 예: I'm going to clean my room." },
    { term: '동사원형', def: '-s, -ed, -ing가 붙지 않은 동사의 원래 모양이에요. 예: visit, play, go' },
    { term: '주어(주인공)', def: '문장에서 "누가"에 해당하는 말이에요. 주어에 따라 be가 am·is·are로 바뀌어요. 예: I → am, he → is, they → are' },
    { term: 'will', def: "앞으로의 일을 말할 때 써요. 주어가 바뀌어도 모양이 그대로이고, 뒤에 동사원형이 와요. 예: I will go camping. 줄여서 I'll, 부정은 won't." },
    { term: '줄임말(축약형)', def: "두 낱말을 줄여 쓴 말이에요. 빠진 글자 자리에 '를 써요. 예: I am → I'm, he is → he's, they are → they're, I will → I'll" },
    { term: '앞으로의 때를 나타내는 말', def: '계획이 언제인지 알려 주는 말이에요. 예: tomorrow(내일), this afternoon(오늘 오후), next Saturday(다음 토요일), this winter(이번 겨울)' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: "빈칸에 알맞은 말은 무엇일까요?\n\nI'm going to [[play]] soccer tomorrow.",
      choices: ['play', 'plays', 'played', 'playing'],
      answer: 0,
      why: [
        '',
        'going to 뒤에는 -s를 붙이지 않아요. 원래 모양을 써요.',
        'played는 지난 일을 말할 때 써요. tomorrow는 앞으로의 때예요.',
        'going to 뒤에는 -ing를 붙이지 않은 원래 모양을 써요.',
      ],
      explain: 'be going to 뒤에는 동사원형을 써요. "I\'m going to play soccer tomorrow."(나는 내일 축구를 할 거예요.)',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 1,
      q: '"그들은 박물관에 갈 거예요."라는 뜻이 되게 빈칸에 알맞은 낱말 하나를 쓰세요.\n\nThey [[are]] going to visit the museum.',
      answer: ['are'],
      wrong: [
        { a: 'is', why: 'They(그들)는 여러 사람이에요. they에는 are를 써요.' },
        { a: 'am', why: 'am은 I와 함께만 써요. they에는 are를 써요.' },
      ],
      explain: 'They는 여러 사람이라서 are를 써요. "They are going to visit the museum."(그들은 박물관에 갈 거예요.)',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: "\"He's going to visit his uncle.\"에서 He's는 무엇을 줄인 말일까요?",
      choices: ['He is', 'He was', 'He does'],
      answer: 0,
      why: [
        '',
        'He\'s는 He was를 줄인 말이 아니에요. was는 지난 일에 쓰고, 계획을 말하는 be going to에서는 is예요.',
        'He\'s는 He does를 줄인 말이 아니에요. 이 문장의 He\'s는 He is를 줄인 말이에요.',
      ],
      explain: "He's는 He is를 줄인 말이에요. 한 사람(he)이 주어라서 is를 써요. \"그는 삼촌 댁에 갈 거예요.\"",
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '"What are you going to do this Saturday?"에 알맞은 대답은 무엇일까요?',
      choices: ["I'm going to clean my room.", 'I cleaned my room.', 'Yes, I am.', 'I clean my room every day.'],
      answer: 0,
      why: [
        '',
        '지난 일을 말했어요. 이번 토요일에 할 일을 물었어요.',
        'What으로 묻는 말에는 Yes/No로 답하지 않아요. 할 일을 말해요.',
        '매일 하는 일을 말했어요. 이번 토요일의 계획을 물었어요.',
      ],
      explain: '"이번 토요일에 뭐 할 거야?"에는 "I\'m going to ~."로 계획을 말해요.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 4,
      q: 'next Saturday는 "지난 토요일"이라는 뜻이에요.',
      answer: false,
      explain: 'next는 "다음"이에요. next Saturday는 "다음 (주) 토요일"이에요. "지난 토요일"은 last Saturday예요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nI [[will]] go to the library tomorrow.',
      choices: ['will', 'wills', 'am', 'went'],
      answer: 0,
      why: [
        '',
        'will은 주어가 바뀌어도 모양이 그대로예요. s를 붙이지 않아요.',
        '"I am go"는 틀린 문장이에요. am을 쓰려면 "I am going to go"처럼 going to가 있어야 해요.',
        'went는 지난 일에 써요. tomorrow(내일)는 앞으로의 때예요.',
      ],
      explain: 'will 뒤에 동사원형 go를 쓰면 "I will go to the library tomorrow."(나는 내일 도서관에 갈 거예요.)가 돼요.',
    },
    {
      id: 'p7', level: 1, type: 'short', concept: 3,
      q: 'I will을 줄여서 쓰세요.',
      answer: ["I'll"],
      wrong: [
        { a: "I'm", why: "I'm은 I am을 줄인 말이에요. I will은 I'll로 줄여요." },
        { a: 'Ill', why: "줄인 자리에 '(아포스트로피)를 넣어야 해요: I'll" },
      ],
      explain: "I will에서 wi를 빼고 그 자리에 '를 써서 I'll이에요. 예: I'll go camping this summer.",
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 2,
      q: '"이번 주말에 뭐 할 거야?"라는 뜻이 되게 차례대로 놓으세요.',
      choices: ['What', 'are you', 'going to', 'do', 'this weekend?'],
      answer: [0, 1, 2, 3, 4],
      hint: 'What으로 시작하고, 그다음에 are you를 놓아요.',
      explain: '무엇(What) + are you + going to + do(하다) + 때(this weekend) 차례예요. "What are you going to do this weekend?"',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nSua and Doyun [[are]] going to play badminton after school.',
      choices: ['are', 'is', 'am', 'be'],
      answer: 0,
      why: [
        '',
        'Sua와 Doyun, 두 사람이에요. 두 사람 이상에는 are를 써요.',
        'am은 I와 함께만 써요.',
        'be는 주어에 맞게 am·is·are로 바꾸어 써야 해요.',
      ],
      hint: '주어가 몇 사람인지 세어 보세요.',
      explain: 'Sua and Doyun은 두 사람(they)이라서 are를 써요. "수아와 도윤이는 방과 후에 배드민턴을 칠 거예요."',
    },
    {
      id: 'p10', level: 2, type: 'short', concept: 4,
      q: '"오늘 오후"라는 뜻이 되게 빈칸에 알맞은 낱말 하나를 쓰세요.\n\nI\'m going to read a book this [[afternoon]].',
      answer: ['afternoon'],
      wrong: [
        { a: 'morning', why: 'morning은 "아침, 오전"이에요. "오후"는 afternoon이에요.' },
        { a: 'evening', why: 'evening은 "저녁"이에요. "오후"는 afternoon이에요.' },
      ],
      explain: 'this afternoon은 "오늘 오후"예요. "나는 오늘 오후에 책을 읽을 거예요."',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 5,
      q: "글을 읽고 물음에 답하세요.\n\nHi, I'm Seojun. This Saturday, I'm going to visit my grandparents. I'm going to make dumplings with my grandmother. On Sunday, I'm going to go hiking with my dad.\n\nWhat is Seojun going to do on Sunday?",
      choices: ['He is going to go hiking.', 'He is going to make dumplings.', 'He is going to visit his grandparents.', 'He is going to play soccer.'],
      answer: 0,
      why: [
        '',
        '만두 만들기는 토요일(This Saturday)에 할 일이에요.',
        '조부모님 댁 방문은 토요일(This Saturday)에 할 일이에요.',
        '글에 축구 이야기는 나오지 않아요.',
      ],
      hint: 'On Sunday 뒤에 나오는 할 일을 찾아보세요.',
      explain: 'On Sunday 다음 문장에 "I\'m going to go hiking with my dad."가 있어요. 서준이는 일요일에 아빠와 등산을 갈 거예요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 2,
      q: "대화의 빈칸에 알맞은 말을 고르세요.\n\nA: Are you going to watch a movie tonight?\nB: [[No, I'm not.]] I'm going to read a book.",
      choices: ["No, I'm not.", 'Yes, I am.', "No, I don't.", "No, he isn't."],
      answer: 0,
      why: [
        '',
        'B는 영화 대신 책을 읽을 거라고 했어요. 그러니 "아니"라고 답해야 해요.',
        'Are you로 물었으니 be를 써서 답해요: No, I\'m not.',
        'A가 B(you)에게 물었으니 I로 답해요.',
      ],
      hint: 'B의 둘째 문장을 보고 영화를 볼지 안 볼지 먼저 판단해요.',
      explain: 'Are you going to ~?로 물으면 Yes, I am. / No, I\'m not.으로 답해요. B는 책을 읽을 거라고 했으니 "No, I\'m not."이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 5,
      q: "글을 읽고, 하윤이의 이번 겨울 계획이 **아닌** 것을 고르세요.\n\nThis winter, I'm going to do three things. First, I'm going to go skiing with my family. Second, I'm going to read ten books. Third, I'm going to visit my cousin in Busan. I'm not going to play computer games too much. — Hayun",
      choices: ['가족과 스키 타러 가기', '책 열 권 읽기', '부산에 사는 사촌 만나러 가기', '컴퓨터 게임 많이 하기'],
      answer: 3,
      why: [
        'First 뒤에 "go skiing with my family"가 있어요. 하윤이의 계획이에요.',
        'Second 뒤에 "read ten books"가 있어요. 하윤이의 계획이에요.',
        'Third 뒤에 "visit my cousin in Busan"이 있어요. 하윤이의 계획이에요.',
        '',
      ],
      hint: "I'm not going to로 시작하는 문장의 뜻을 잘 살펴보세요.",
      explain: "마지막 문장 \"I'm not going to play computer games too much.\"는 \"컴퓨터 게임을 너무 많이 하지 않을 거예요.\"라는 뜻이에요. not이 있으니 하지 않을 일이에요.",
    },
    {
      id: 'a2', level: 3, type: 'short', concept: 0,
      q: '다음 문장에서 **틀린 낱말 하나**를 찾아 바르게 고쳐 쓰세요. (고친 낱말만 쓰세요.)\n\nShe is going to visits her aunt next Sunday.',
      answer: ['visit'],
      wrong: [
        { a: 'visits', why: '틀린 낱말을 그대로 썼어요. going to 뒤에는 -s 없는 원래 모양을 써요.' },
        { a: 'are', why: 'She는 한 사람이라서 is가 맞아요. 다른 곳을 찾아보세요.' },
        { a: 'visited', why: 'next Sunday는 앞으로의 때이고, going to 뒤에는 원래 모양을 써요.' },
      ],
      hint: 'going to 뒤에 오는 동사의 모양을 살펴보세요.',
      explain: '주어가 She라서 visits라고 쓰기 쉽지만, going to 뒤에는 언제나 동사원형을 써요. 바른 문장은 "She is going to visit her aunt next Sunday."예요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '"I\'ll ride my bike tomorrow."와 뜻이 가장 가까운 문장을 고르세요.',
      choices: ["I'm going to ride my bike tomorrow.", 'I rode my bike yesterday.', "I'm riding my bike now.", 'I ride my bike every day.'],
      answer: 0,
      why: [
        '',
        '어제 한 일(지난 일)이에요. 주어진 문장은 내일 할 일이에요.',
        '지금 하고 있는 일이에요. 주어진 문장은 내일 할 일이에요.',
        '매일 하는 일이에요. 주어진 문장은 내일 할 계획이에요.',
      ],
      hint: "I'll은 무엇을 줄인 말인지 먼저 떠올려 보세요.",
      explain: "I'll은 I will이에요. will과 be going to는 둘 다 계획을 말할 때 쓰니 \"I'm going to ride my bike tomorrow.\"와 뜻이 가까워요.",
    },
    {
      id: 'a4', level: 3, type: 'order', concept: 1,
      q: '"그는 다음 주 토요일에 삼촌 댁에 갈 거예요."라는 뜻이 되게 차례대로 놓으세요.',
      choices: ['He', 'is going to', 'visit', 'his uncle', 'next Saturday.'],
      answer: [0, 1, 2, 3, 4],
      hint: '누가 → 할 거예요 → 무엇을 → 언제 차례로 놓아 보세요.',
      explain: '주어(He) + is going to + 동사원형(visit) + 누구를(his uncle) + 때(next Saturday) 차례예요. "He is going to visit his uncle next Saturday."',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: "오늘은 금요일이에요. 민아가 이렇게 말했어요.\n\n\"I'm going to go swimming tomorrow.\"\n\n민아가 수영하러 갈 요일은 언제일까요?",
      choices: ['Saturday', 'Friday', 'Thursday', 'Sunday'],
      answer: 0,
      why: [
        '',
        'Friday는 오늘이에요. tomorrow는 "내일"이에요.',
        'Thursday는 어제(yesterday)예요. tomorrow는 "내일"이에요.',
        'Sunday는 모레예요. tomorrow는 오늘 바로 다음 날이에요.',
      ],
      hint: 'tomorrow의 뜻을 떠올리고, 금요일 다음 날을 생각해 보세요.',
      explain: 'tomorrow는 "내일"이에요. 오늘이 금요일(Friday)이니 내일은 토요일(Saturday)이에요.',
    },
  ],

  deeper: [
    {
      title: 'will과 be going to, 조금 더 알아보기',
      body: '이번 단원에서는 will과 be going to를 모두 "계획을 말할 때" 쓴다고 배웠어요. 초등학교에서는 이렇게 알아 두면 충분해요.\n\n조금 더 들여다보면 쓰임이 살짝 달라요. 미리 정해 둔 계획은 be going to로 자주 말하고, 말하는 그 자리에서 마음먹은 일은 will로 자주 말해요.\n\n- (전화벨이 울리자) I\'ll get it! — 내가 받을게!\n- (지난주부터 정해 둔 일) I\'m going to visit my uncle this Saturday.\n\n중학교에서 will과 be going to를 더 자세히 배워요.',
    },
    {
      title: '계획표로 나의 한 주 정리하기',
      body: '공부한 표현으로 나의 다음 주 계획표를 만들어 보세요.\n\n| 요일 | 계획 |\n|---|---|\n| Monday | I\'m going to practice the piano. |\n| Wednesday | I\'m going to go swimming. |\n| Saturday | I\'m going to clean my room. |\n\n요일만 바꾸고 going to 뒤의 할 일을 채우면 돼요. 한 주가 끝나면 지난 일 말하기(I practiced the piano.)로 바꾸어 일기를 써 볼 수도 있어요.',
    },
  ],

  faq: [
    {
      q: 'will이랑 be going to는 뭐가 달라요?',
      a: '둘 다 앞으로 할 일, 계획을 말할 때 써요. will은 주어가 바뀌어도 모양이 그대로이고, be going to는 주어에 따라 am·is·are를 골라요.\n\n아주 자세한 쓰임 차이는 중학교에서 배우니, 지금은 둘 다 "~할 거예요"라고 기억하면 돼요.',
    },
    {
      q: 'going to 다음에 왜 동사에 s를 안 붙여요?',
      a: 'going to 뒤에는 언제나 동사원형(원래 모양)을 쓰기로 정해져 있어요. 주어가 he나 she여도 마찬가지예요.\n\n주어에 맞추어 바뀌는 것은 앞의 am·is·are뿐이에요. 예: She is going to visit her aunt.',
    },
    {
      q: "I'm going to go라고 하면 go가 두 번 나와서 이상하지 않아요?",
      a: "이상하지 않아요. going to는 \"~할 거예요\"라는 덩어리이고, 뒤의 go는 \"가다\"라는 할 일이에요.\n\nI'm going to go swimming.(나는 수영하러 갈 거예요.)처럼 자주 쓰는 바른 문장이에요.",
    },
  ],

  mistakes: [
    '"She is going to visits her aunt."처럼 going to 뒤의 동사에 -s를 붙이는 실수 — going to 뒤에는 언제나 원래 모양(visit)을 써요.',
    '"They is going to play soccer."처럼 be를 주어에 맞추지 않는 실수 — I는 am, 한 사람은 is, 여러 사람·you는 are예요.',
    '"I will to go camping."처럼 will 뒤에 to를 넣는 실수 — will 뒤에는 바로 동사원형을 써요: I will go camping.',
  ],

  vocab: [
    { w: 'plan', m: '계획', ex: 'What is your plan for the weekend?', exm: '주말 계획이 뭐야?' },
    { w: 'weekend', m: '주말', ex: "I'm going to go fishing this weekend.", exm: '나는 이번 주말에 낚시하러 갈 거예요.' },
    { w: 'tomorrow', m: '내일', ex: "I'm going to visit the library tomorrow.", exm: '나는 내일 도서관에 갈 거예요.' },
    { w: 'afternoon', m: '오후', ex: 'We are going to play soccer this afternoon.', exm: '우리는 오늘 오후에 축구를 할 거예요.' },
    { w: 'next', m: '다음의', ex: "I'm going to start piano lessons next week.", exm: '나는 다음 주에 피아노 수업을 시작할 거예요.' },
    { w: 'visit', m: '방문하다, 찾아가다', ex: 'He is going to visit his uncle.', exm: '그는 삼촌 댁에 갈 거예요.' },
    { w: 'clean', m: '청소하다', ex: "I'm going to clean my room on Saturday.", exm: '나는 토요일에 내 방을 청소할 거예요.' },
    { w: 'uncle', m: '삼촌, 이모부, 고모부', ex: 'My uncle lives near the sea.', exm: '우리 삼촌은 바다 가까이에 사세요.' },
    { w: 'aunt', m: '이모, 고모, 숙모', ex: 'My aunt is going to bake a cake for me.', exm: '우리 이모가 나에게 케이크를 구워 주실 거예요.' },
    { w: 'cousin', m: '사촌', ex: 'My cousin is going to come to my house.', exm: '내 사촌이 우리 집에 올 거예요.' },
    { w: 'grandparents', m: '할아버지와 할머니, 조부모', ex: 'We are going to visit our grandparents this winter.', exm: '우리는 이번 겨울에 조부모님 댁에 갈 거예요.' },
    { w: 'museum', m: '박물관', ex: 'They are going to visit the science museum.', exm: '그들은 과학관에 갈 거예요.' },
    { w: 'hiking', m: '등산, 걷기 여행', ex: "Let's go hiking next Sunday.", exm: '다음 일요일에 등산 가자.' },
    { w: 'practice', m: '연습하다', ex: 'She is going to practice the violin.', exm: '그녀는 바이올린을 연습할 거예요.' },
    { w: 'vacation', m: '방학, 휴가', ex: "I'm going to visit Jeju during the vacation.", exm: '나는 방학 동안 제주에 갈 거예요.' },
    { w: 'winter', m: '겨울', ex: 'We are going to go skiing this winter.', exm: '우리는 이번 겨울에 스키를 타러 갈 거예요.' },
  ],
});
