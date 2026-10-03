/* 중3 영어 · 상상하여 말하기 (가정법 과거) */
Tutor.registerUnit({
  id: 'eng-m3-05',
  course: 'eng-m3',
  title: '상상하여 말하기 (가정법 과거)',
  summary: '가정법 과거와 I wish 문장을 익혀 현재 사실과 반대되는 일을 상상하고 바라는 일을 말해요.',
  goals: [
    '가정법 과거(If + 주어 + 과거형, 주어 + would/could + 동사원형)로 현재 사실과 반대되는 일을 말할 수 있어요.',
    'If I were you, I would ~로 충고할 수 있어요.',
    '일어날 수 있는 일을 말하는 조건문과 가정법을 구별할 수 있어요.',
    'I wish + 가정법 과거로 이루기 어려운 바람을 말하고, 상상을 담은 글에서 필자의 바람을 찾을 수 있어요.',
  ],
  standards: ['[9영02-06]', '[9영01-06]', '[9영01-07]'],

  concepts: [
    {
      title: '가정법 과거의 형태와 뜻',
      body: '**가정법 과거**는 **지금 사실과 반대되는 일**이나 **일어날 가능성이 거의 없는 일**을 상상해서 말할 때 써요.\n\n> 💡 형태: **If + 주어 + 동사의 과거형 ~, 주어 + would / could + 동사원형 …**\n> 뜻: "(지금) 만약 ~라면, …할 텐데 / …할 수 있을 텐데"\n\n- If I **had** a dog, I **would walk** it every day. (내가 개가 있다면 날마다 산책을 시킬 텐데.)\n- If I **lived** near the sea, I **could swim** every day. (내가 바닷가 근처에 산다면 날마다 수영할 수 있을 텐데.)\n\n**동사는 과거형이지만 뜻은 현재**예요. 첫 문장의 속뜻은 "나는 지금 개가 없어서 날마다 산책을 시키지 못한다"예요.\n\n- **would** + 동사원형: "~할 텐데" (하고 싶은 일, 할 일)\n- **could** + 동사원형: "~할 수 있을 텐데" (할 수 있는 일)\n\n> ⚠️ would, could 뒤에는 늘 **동사원형**이 와요: would walk (would walked ✗)',
      easy: '"만약에 놀이"를 생각해 보세요. "내가 투명 인간이라면?" 같은 놀이요.\n\n영어는 이렇게 현실이 아닌 상상을 할 때 동사를 한 칸 **과거 쪽으로 밀어요**. "지금 진짜가 아니야"라는 신호예요.\n\n- 현실: I don\'t have a dog. (지금 개가 없어요.)\n- 상상: If I **had** a dog, … (개가 있다면 …)\n\n과거형이 나왔다고 옛날 이야기가 아니라, "지금 이게 현실이 아니에요"라는 뜻이에요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nIf I [[빈칸]] a lot of free time, I would learn to play the drums.',
        choices: ['had', 'have', 'will have'],
        answer: 0,
        why: [
          '',
          '주절에 would가 있으니 지금 사실과 반대되는 상상이에요. if절에는 동사의 과거형을 써요.',
          'if절에는 will을 쓰지 않아요. 가정법 과거의 if절은 동사의 과거형이에요.',
        ],
        explain: '주절이 would + 동사원형이니 가정법 과거예요. if절에는 과거형 **had**를 써요. "내가 자유 시간이 많다면 드럼 치는 것을 배울 텐데." (실제로는 자유 시간이 많지 않아요.)',
      },
    },
    {
      title: 'be동사는 were: If I were you',
      body: '가정법 과거의 if절에서 be동사는 주어가 무엇이든 **were**를 쓰는 것이 원칙이에요.\n\n- If I **were** a bird, I could fly to you. (내가 새라면 너에게 날아갈 수 있을 텐데.)\n- If Minsu **were** here, he would help us. (민수가 여기 있다면 우리를 도와줄 텐데.)\n\n특히 **If I were you, I would ~.**(내가 너라면 ~할 텐데.)는 상대에게 **충고**할 때 자주 쓰는 표현이에요. 내가 상대가 될 수는 없으니 가정법이에요.\n\n- A: I have a terrible headache. (머리가 너무 아파.)\n- B: **If I were you, I would** take some rest. (내가 너라면 좀 쉴 텐데.)\n\n> 💡 일상 대화에서는 If I was ~라고 말하는 사람도 있지만, 글이나 시험에서는 were가 바른 형태예요. If I were you는 굳어진 표현이니 꼭 were로 기억하세요.',
      easy: '친구가 고민을 말할 때 "너 그거 해!"라고 하면 좀 딱딱하지요? 대신 "나라면 그렇게 할 것 같아"라고 하면 부드러워요.\n\n영어의 If I were you, I would ~.가 바로 그 말이에요. "내가 너라면 ~할 텐데" → 부드러운 충고.\n\nI 뒤인데도 was가 아니라 **were**인 것만 조심하면 돼요.',
      check: {
        type: 'choice',
        q: '친구에게 충고하는 말로 알맞은 것을 고르세요.\n\nA: I lost my bag on the bus.\nB: [[빈칸]]',
        choices: [
          'If I were you, I would call the bus company.',
          'If I am you, I will call the bus company.',
          'If I were you, I would called the bus company.',
        ],
        answer: 0,
        why: [
          '',
          '내가 너일 수는 없으니 사실과 반대되는 상상이에요. 가정법 과거로 If I were you, I would ~를 써요.',
          'would 뒤에는 동사원형이 와요: would call',
        ],
        explain: '충고하는 표현은 **If I were you, I would + 동사원형**이에요. "내가 너라면 버스 회사에 전화할 텐데."',
      },
    },
    {
      title: '조건문과 가정법 구별하기',
      body: 'if 문장은 두 가지가 있어요. **일어날 수 있는 일**인지, **현재 사실과 반대되는 일**인지에 따라 형태가 달라요.\n\n| | 조건문 (중2) | 가정법 과거 |\n|---|---|---|\n| 언제 | 실제로 일어날 수 있는 일 | 지금 사실과 반대 / 거의 불가능한 일 |\n| if절 | 현재형 | **과거형** (be동사는 were) |\n| 주절 | will / can + 동사원형 | **would / could** + 동사원형 |\n| 예 | If it **rains** tomorrow, I **will stay** home. | If I **were** a bird, I **could fly**. |\n\n가정법 문장은 **현재 사실을 말하는 문장(직설법)**으로 바꿔 볼 수 있어요. 긍정과 부정이 뒤집히고, 시제는 현재가 돼요.\n\n- If I **had** time, I **could** help you.\n  = As I **don\'t have** time, I **can\'t** help you. (시간이 없어서 너를 도와줄 수 없어.)\n- If it **were not** raining, we **could** go out.\n  = As it **is** raining, we **can\'t** go out. (비가 오고 있어서 우리는 나갈 수 없어요.)',
      easy: '두 문장을 비교해 보세요.\n\n- If it rains tomorrow, … → 내일 비가 올 수도 있어요. 진짜 일어날 수 있는 일!\n- If I were a bird, … → 나는 새가 될 수 없어요. 상상일 뿐!\n\n진짜 가능하면 현재형 + will, 상상이면 과거형 + would. 그리고 가정법 문장의 속뜻은 늘 **반대**예요: "새라면 날 텐데" = "새가 아니라서 못 날아".',
      check: {
        type: 'ox',
        q: 'If I had a bike, I would ride it to school.\n\n이 문장의 속뜻은 "나는 지금 자전거가 없어서 학교에 타고 가지 못한다"예요.',
        answer: true,
        explain: '가정법 과거는 현재 사실과 반대예요. 속뜻은 As I don\'t have a bike, I don\'t ride it to school.(자전거가 없어서 타고 가지 않아요.)이에요.',
      },
    },
    {
      title: 'I wish + 가정법 과거',
      body: '**I wish + 주어 + 과거형**은 "~라면 좋을 텐데"라는 뜻으로, **지금 이루어지지 않은 일**을 바랄 때 써요.\n\n- I wish I **could** fly. (내가 날 수 있다면 좋을 텐데.) → 나는 날 수 없어요.\n- I wish I **were** taller. (내가 키가 더 크면 좋을 텐데.) → 나는 키가 크지 않아요.\n- I wish I **had** a sister. (나에게 언니가 있으면 좋을 텐데.) → 나에게는 언니가 없어요.\n\n현재 사실로 바꾸면 I\'m sorry (that) ~ 또는 It\'s a pity that ~ 처럼 아쉬움을 나타내는 말이 돼요.\n\n- I wish I had a sister. = I\'m sorry that I **don\'t have** a sister.\n\n> ⚠️ I wish 뒤에는 **과거형**을 써요(be동사는 were). I wish I can fly.(✗) → I wish I **could** fly.',
      easy: '생일 케이크 촛불을 끄면서 비는 소원은 대개 지금은 아닌 것을 바라지요?\n\nI wish는 "지금은 아니지만 ~라면 좋겠다"는 소원의 말이에요. 그래서 뒤의 동사가 한 칸 과거 쪽으로 밀려요. can → could, have → had, am → were.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nI\'m sorry that I can\'t speak Spanish.\n= I wish I [[빈칸]] speak Spanish.',
        choices: ['could', 'can', 'couldn\'t'],
        answer: 0,
        why: [
          '',
          'I wish 뒤에는 과거형을 써요. can → could',
          '스페인어를 할 수 "있기를" 바라는 거예요. couldn\'t면 뜻이 반대가 돼요.',
        ],
        explain: '지금 스페인어를 할 수 없어서 아쉬우니 I wish + 과거형으로 "~할 수 있다면 좋을 텐데"라고 해요. → I wish I **could** speak Spanish.',
      },
    },
    {
      title: '상상을 담은 글에서 필자의 바람 찾기',
      body: '"If I were ~", "I wish ~"로 시작하는 상상 글에는 **필자의 진짜 바람과 걱정**이 숨어 있어요. 가정법 문장을 뒤집어 보면 필자가 지금 무엇을 아쉬워하는지 알 수 있어요.\n\n> If I were the mayor of my town, I would build a big library. Our town has only one small library, and it is always crowded. I wish children could read books in a quiet place.\n\n1. 가정법 문장을 찾아요: If I were the mayor ~, I would build a big library. / I wish children could read ~\n2. 뒤집어 현재 사실을 찾아요: 필자는 시장이 아니에요. 아이들이 조용한 곳에서 책을 읽지 **못해요**.\n3. 그 까닭을 찾아요: 도서관이 하나뿐이고 늘 붐벼요.\n4. 필자의 바람을 정리해요: **동네에 아이들이 편하게 책을 읽을 큰 도서관이 생기기를 바라요.**\n\n> 💡 상상 글은 "만약에" 이야기처럼 보이지만, 대부분 지금의 문제를 알리고 바뀌기를 바라는 마음을 담고 있어요.',
      easy: '"내가 엄마라면 숙제를 없앨 텐데!"라는 말을 들으면, 말한 사람이 진짜 바라는 게 뭔지 알겠지요? 숙제가 너무 많아서 줄었으면 하는 거예요.\n\n영어 상상 글도 같아요. If I were ~ 뒤에 나오는 "할 텐데"가 바로 필자가 진짜 원하는 것이에요.',
      check: {
        type: 'choice',
        q: '글을 읽고 물음에 답하세요.\n\nIf I were the principal of our school, I would plant more trees on the playground. In summer, the playground is too hot, and there is no shade.\n\n필자가 바라는 것은 무엇일까요?',
        choices: ['운동장에 그늘이 생기는 것', '여름 방학이 길어지는 것', '자신이 교장 선생님이 되는 것'],
        answer: 0,
        why: [
          '',
          '방학 이야기는 글에 나오지 않아요. 필자는 운동장이 덥고 그늘이 없다고 했어요.',
          'If I were the principal은 상상의 상황일 뿐이에요. 진짜 바람은 그 뒤의 "나무를 더 심을 텐데"에 있어요.',
        ],
        explain: '필자는 운동장이 덥고 그늘(shade)이 없어서 나무를 더 심고 싶어 해요. 진짜 바람은 **운동장에 그늘이 생기는 것**이에요.',
      },
    },
  ],

  examples: [
    {
      q: '다음 문장을 가정법 과거 문장으로 바꾸세요.\n\nAs I don\'t know his phone number, I can\'t call him.',
      steps: [
        '현재 사실과 반대되는 상상이므로 가정법 과거로 써요. 긍정과 부정을 뒤집어요: don\'t know → know, can\'t → can',
        'if절의 동사는 과거형으로: know → knew',
        '주절은 could + 동사원형으로: can call → could call',
      ],
      answer: '**If I knew** his phone number, I **could call** him. (내가 그의 전화번호를 안다면 전화할 수 있을 텐데.)',
    },
    {
      q: '빈칸에 알맞은 말을 쓰세요.\n\nI\'m sorry that I am not good at swimming.\n= I wish I [[빈칸]] good at swimming.',
      steps: [
        '지금 이루어지지 않은 일을 바라니 I wish + 가정법 과거예요.',
        '바라는 것은 "수영을 잘하는 것"이에요. 부정(not)은 빼요.',
        'be동사 am은 가정법에서 were로 써요.',
      ],
      answer: 'I wish I **were** good at swimming. (내가 수영을 잘하면 좋을 텐데.)',
    },
  ],

  terms: [
    { term: '가정법 과거', def: 'If + 주어 + 과거형, 주어 + would/could + 동사원형 꼴로, 지금 사실과 반대되는 일을 상상해요. 예: If I were a bird, I could fly.' },
    { term: '조건문', def: '실제로 일어날 수 있는 일을 말하는 if 문장이에요. if절은 현재형, 주절은 will/can을 써요. 예: If it rains, I will stay home.' },
    { term: '직설법', def: '사실을 있는 그대로 말하는 문장이에요. 가정법 문장을 직설법으로 바꾸면 긍정·부정이 뒤집히고 시제는 현재가 돼요.' },
    { term: 'I wish', def: '"~라면 좋을 텐데"라는 뜻으로, 지금 이루어지지 않은 일을 바랄 때 써요. 뒤에 과거형이 와요. 예: I wish I could fly.' },
    { term: 'would', def: '가정법 주절에서 "~할 텐데"라는 뜻으로 쓰여요. 뒤에 동사원형이 와요.' },
    { term: 'could', def: '가정법 주절이나 I wish 뒤에서 "~할 수 있을 텐데"라는 뜻으로 쓰여요. 뒤에 동사원형이 와요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nIf I [[빈칸]] a lot of money, I would travel around the world.',
      choices: ['had', 'have', 'will have', 'having'],
      answer: 0,
      why: [
        '',
        '주절에 would가 있으니 지금 사실과 반대되는 상상이에요. if절에는 과거형을 써요.',
        'if절에는 will을 쓰지 않아요.',
        'if절에는 주어 뒤에 동사가 와야 해요. -ing형만으로는 동사가 될 수 없어요.',
      ],
      explain: '주절이 would + 동사원형이니 가정법 과거예요. if절은 과거형 **had**를 써요. "내가 돈이 많다면 세계 여행을 할 텐데." (실제로는 돈이 많지 않아요.)',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
      q: '빈칸에 알맞은 be동사를 쓰세요.\n\nIf I [[빈칸]] you, I would take a rest.',
      answer: ['were'],
      wrong: [
        { a: 'am', why: '내가 상대가 될 수는 없으니 가정법이에요. 가정법 과거에서 be동사는 were를 써요.' },
        { a: 'was', why: '말할 때 was를 쓰는 사람도 있지만, 가정법에서는 주어와 상관없이 were가 바른 형태예요. If I were you는 굳어진 표현이에요.' },
      ],
      explain: '충고하는 표현 **If I were you**, I would ~.예요. 가정법 과거에서 be동사는 주어가 I여도 **were**를 써요. "내가 너라면 좀 쉴 텐데."',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: I have a bad cold.\nB: [[빈칸]]',
      choices: [
        'If I were you, I would see a doctor.',
        'If I am you, I will see a doctor.',
        'If I were you, I will see a doctor.',
        'If I were you, I would saw a doctor.',
      ],
      answer: 0,
      why: [
        '',
        '내가 상대가 될 수는 없으니 가정법 과거로 써요: If I were you, I would ~',
        'if절이 가정법(were)이면 주절도 would를 써요. will과 짝을 이루지 않아요.',
        'would 뒤에는 동사원형이 와요: would see',
      ],
      explain: '충고할 때는 **If I were you, I would + 동사원형**을 써요. "내가 너라면 병원에 가 볼 텐데."',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: 'If it rains tomorrow, we will stay home.\n\n이 문장은 현재 사실과 반대되는 일을 상상하는 가정법 과거 문장이에요.',
      answer: false,
      explain: '내일 비가 오는 것은 **실제로 일어날 수 있는 일**이에요. 그래서 if절은 현재형(rains), 주절은 will을 쓴 **조건문**이에요. 가정법 과거라면 if절에 과거형, 주절에 would를 써요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말을 고르세요.\n\nI wish I [[빈칸]] fly like a bird.',
      choices: ['could', 'can', 'will', 'am'],
      answer: 0,
      why: [
        '',
        'I wish 뒤에는 과거형을 써요. can → could',
        'I wish 뒤에는 will을 쓰지 않아요. 지금 이룰 수 없는 일이라 과거형 could를 써요.',
        'am 뒤에 동사원형 fly가 올 수 없어요. "날 수 있다면"이니 could fly예요.',
      ],
      explain: '사람은 새처럼 날 수 없으니 I wish + 가정법 과거예요. can의 과거형 **could**를 써서 I wish I could fly like a bird.(새처럼 날 수 있으면 좋을 텐데.)예요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 3,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 **한 낱말**을 쓰세요.\n\nI\'m sorry that I don\'t have a brother.\n= I wish I [[빈칸]] a brother.',
      answer: ['had'],
      wrong: [
        { a: 'have', why: 'I wish 뒤에는 과거형을 써요. have → had' },
        { a: 'has', why: 'I wish 뒤에는 과거형을 써요. 주어가 I이니 has도 맞지 않아요. 과거형은 had예요.' },
      ],
      explain: '지금 남자 형제(형·오빠·남동생)가 없어서 아쉬우니 I wish + 과거형이에요. → I wish I **had** a brother.(나에게 남자 형제가 있으면 좋을 텐데.)',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 2,
      q: '다음 문장의 속뜻으로 알맞은 것을 고르세요.\n\nIf I had a car, I would drive you home.',
      choices: [
        '나는 차가 없어서 너를 집에 데려다줄 수 없어.',
        '나는 차가 있어서 너를 집에 데려다줄게.',
        '나는 예전에 차가 있어서 너를 집에 데려다주었어.',
        '나는 내일 차를 사서 너를 집에 데려다줄 거야.',
      ],
      answer: 0,
      why: [
        '',
        '가정법은 현재 사실과 반대예요. had는 "지금 차가 없다"는 신호예요.',
        '가정법 과거는 과거형을 쓰지만 뜻은 현재예요. 옛날 이야기가 아니에요.',
        '차를 살 계획은 문장에 나오지 않아요. 지금 차가 없다는 것이 속뜻이에요.',
      ],
      explain: '가정법 과거는 현재 사실과 반대이므로 속뜻은 "**지금 차가 없어서** 너를 집에 데려다줄 수 없다"예요. = As I don\'t have a car, I can\'t drive you home.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 0,
      q: '우리말에 맞게 낱말을 바르게 배열하세요.\n\n민수가 여기 있다면 우리는 축구를 할 수 있을 텐데.',
      choices: ['If', 'Minsu were here,', 'we', 'could play', 'soccer'],
      answer: [0, 1, 2, 3, 4],
      hint: 'If + 주어 + were ~, 주어 + could + 동사원형 순서예요.',
      explain: '**If Minsu were here, we could play soccer.** if절은 과거형(were), 주절은 could + 동사원형(could play)이에요. 속뜻은 "민수가 여기 없어서 축구를 할 수 없다"예요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'text', concept: 2,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 말을 쓰세요.\n\nIf I knew her name, I could call her.\n= As I [[빈칸]] her name, I can\'t call her.',
      answer: ['don\'t know', 'do not know'],
      hint: '가정법 문장을 사실로 바꾸면 긍정과 부정이 뒤집히고, 시제는 현재가 돼요.',
      wrong: [
        { a: 'didn\'t know', why: '가정법 과거는 과거형이지만 뜻은 현재예요. 사실로 바꾸면 현재형 don\'t know예요.' },
        { a: 'know', why: '가정법 문장을 사실로 바꾸면 긍정과 부정이 뒤집혀요. "이름을 안다면" → 사실은 "모른다"예요.' },
      ],
      explain: '"그녀의 이름을 안다면 전화할 수 있을 텐데"의 사실은 "이름을 **모르기** 때문에 전화할 수 없다"예요. 시제는 현재이므로 **don\'t know**(do not know)예요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 2,
      q: '다음 문장과 뜻이 같은 것을 고르세요.\n\nAs it is raining, we can\'t go hiking.',
      choices: [
        'If it were not raining, we could go hiking.',
        'If it is not raining, we can go hiking.',
        'If it were raining, we could go hiking.',
        'If it were not raining, we can go hiking.',
      ],
      answer: 0,
      why: [
        '',
        '현재형과 can을 쓰면 일어날 수 있는 조건을 말하는 조건문이에요. 지금 사실과 반대인 상상은 가정법 과거로 써요.',
        '사실을 가정법으로 바꿀 때는 긍정·부정을 뒤집어요. 비가 "오지 않는다면"이어야 해요.',
        '가정법 과거의 주절에는 can이 아니라 could를 써요.',
      ],
      hint: '사실(비가 온다, 갈 수 없다)과 반대로 상상해 보세요.',
      explain: '사실은 "비가 와서 등산을 갈 수 없다"예요. 반대로 상상하면 "비가 오지 않는다면 등산을 갈 수 있을 텐데" → **If it were not raining, we could go hiking.**',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '글을 읽고 물음에 답하세요.\n\nIf I had a magic lamp, I would make three wishes. First, I would ask for a big park in my town. There is no place for kids to play here. Second, I would wish for my grandma\'s knees to get better. Then she could walk with me again. Last, I would ask for a time machine. I would love to see what my town looked like 100 years ago.\n\n글쓴이가 바라는 일이 **아닌** 것을 고르세요.',
      choices: [
        '요술 램프를 팔아 돈을 버는 것',
        '동네에 큰 공원이 생기는 것',
        '할머니의 무릎이 낫는 것',
        '100년 전 동네의 모습을 보는 것',
      ],
      answer: 0,
      why: [
        '',
        '첫 번째 소원이 동네의 큰 공원이에요. 지금은 아이들이 놀 곳이 없어요.',
        '두 번째 소원이에요. 무릎이 나으면 할머니가 다시 함께 걸을 수 있어요.',
        '세 번째 소원인 타임머신으로 100년 전 동네를 보고 싶어 해요.',
      ],
      hint: 'First, Second, Last로 시작하는 문장에서 세 가지 소원을 찾아보세요.',
      explain: '글쓴이의 세 가지 소원은 ① 동네의 큰 공원 ② 할머니 무릎이 낫는 것 ③ 타임머신으로 100년 전 동네 보기예요. 램프를 팔아 돈을 번다는 내용은 없어요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '다음 중 어법상 **옳지 않은** 문장을 고르세요.',
      choices: [
        'If I have wings, I would fly to Jeju.',
        'If I were taller, I could reach the top shelf.',
        'I wish I knew the answer.',
        'If it rains tomorrow, I will stay at home.',
      ],
      answer: 0,
      why: [
        '',
        '바른 문장이에요. 가정법 과거로 if절에 were, 주절에 could + 동사원형을 썼어요.',
        '바른 문장이에요. I wish 뒤에 과거형 knew를 썼어요.',
        '바른 문장이에요. 일어날 수 있는 일이라 현재형 + will을 쓴 조건문이에요.',
      ],
      hint: 'if절과 주절의 짝(현재형 + will / 과거형 + would)이 맞는지 보세요.',
      explain: '사람에게 날개가 있는 것은 사실과 반대되는 상상이므로 if절도 과거형이어야 해요: If I **had** wings, I would fly to Jeju.(나에게 날개가 있다면 제주도로 날아갈 텐데.) have와 would는 짝이 맞지 않아요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 2,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 말을 쓰세요.\n\nI can\'t go to the party because I am sick.\n= If I [[빈칸]] sick, I could go to the party.',
      answer: ['weren\'t', 'were not'],
      hint: '사실(아프다)을 반대로 상상하면 "아프지 않다면"이에요. be동사는 가정법에서 어떻게 쓰나요?',
      wrong: [
        { a: 'were', why: '사실을 가정법으로 바꿀 때는 긍정·부정을 뒤집어요. "아프다면"이 아니라 "아프지 않다면"이에요.' },
        { a: 'am not', why: '현재 사실과 반대되는 상상이니 가정법 과거로 써요. be동사는 were예요.' },
        { a: 'don\'t', why: 'sick은 형용사라서 be동사와 함께 써요. "아프지 않다면" → were not sick이에요.' },
      ],
      explain: '사실은 "아파서 파티에 갈 수 없다"예요. 반대로 상상하면 "아프지 않다면 파티에 갈 수 있을 텐데" → If I **weren\'t**(were not) sick, I could go to the party.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '다음 문장과 뜻이 가장 가까운 것을 고르세요.\n\nI wish I were good at drawing.',
      choices: [
        'I\'m sorry that I am not good at drawing.',
        'I\'m glad that I am good at drawing.',
        'I\'m sorry that I was not good at drawing.',
        'I\'m sorry that I am good at drawing.',
      ],
      answer: 0,
      why: [
        '',
        'I wish 문장은 지금 이루어지지 않은 일을 아쉬워하는 말이에요. 그림을 잘 그리는 것이 아니에요.',
        'I wish + 가정법 과거는 과거형을 써도 뜻은 현재예요. 지금 그림을 잘 못 그려서 아쉬운 거예요.',
        '바라는 것(잘 그리기)과 사실은 반대예요. 사실은 "잘 그리지 못한다"예요.',
      ],
      hint: 'I wish + 가정법 과거의 사실은 "지금, 반대로"예요.',
      explain: '"그림을 잘 그리면 좋을 텐데"의 사실은 "지금 그림을 잘 못 그려서 아쉽다"예요. → **I\'m sorry that I am not good at drawing.**',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 2,
      q: '대화의 (A), (B)에 들어갈 말로 알맞은 것을 고르세요.\n\nA: What will you do this Saturday?\nB: The weather report says it will be sunny. If it (A) sunny, I (B) go to the beach with my family.',
      choices: ['is - will', 'were - would', 'is - would', 'were - will'],
      answer: 0,
      why: [
        '',
        '일기 예보에서 맑을 거라고 했으니 실제로 일어날 수 있는 일이에요. 가정법이 아니라 조건문을 써요.',
        'if절이 현재형이면 주절은 will과 짝을 이뤄요.',
        'if절에 were를 쓰면 가정법인데, 주절의 will과 짝이 맞지 않아요. 여기서는 조건문이에요.',
      ],
      hint: '토요일에 맑을 가능성이 있는지 대화에서 찾아보세요.',
      explain: '일기 예보가 맑을 거라고 했으니 토요일에 맑은 것은 **실제로 일어날 수 있는 일**이에요. 그래서 조건문 If it **is** sunny, I **will** go to the beach.(맑으면 가족과 바닷가에 갈 거야.)를 써요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: '글을 읽고 물음에 답하세요.\n\nIf I were the principal of our school, I would make lunchtime longer. Now we have only forty minutes for lunch. Many students eat too fast and have no time to play with friends. I wish we could enjoy our lunch slowly and talk more with each other.\n\n이 글을 쓴 목적으로 가장 알맞은 것을 고르세요.',
      choices: [
        '점심시간을 늘려야 한다고 바라는 마음을 알리려고',
        '교장 선생님이 되는 방법을 설명하려고',
        '빨리 먹는 습관이 건강에 좋다고 알리려고',
        '친구들과 노는 놀이를 소개하려고',
      ],
      answer: 0,
      why: [
        '',
        'If I were the principal은 상상의 상황일 뿐이에요. 글쓴이가 진짜 하고 싶은 말은 그 뒤에 있어요.',
        '글쓴이는 학생들이 너무 빨리 먹는 것을 문제로 보고 있어요.',
        '놀이를 소개하는 내용은 없어요. 놀 시간이 없다는 것이 문제예요.',
      ],
      hint: '가정법 문장 뒤의 "~할 텐데", I wish 뒤의 바람을 찾아보세요.',
      explain: '글쓴이는 점심시간이 40분뿐이라 학생들이 급하게 먹고 놀 시간도 없다고 해요. 그래서 "점심시간을 더 길게 할 텐데", "천천히 먹고 더 이야기할 수 있으면 좋을 텐데"라고 말하며 **점심시간이 늘어나기를 바라는 마음**을 알리고 있어요.',
    },
  ],

  deeper: [
    {
      title: '왜 과거형으로 "지금"을 상상할까? 그리고 고등학교에서 배울 가정법',
      body: '영어에서 과거형은 "지금에서 멀리 떨어져 있다"는 느낌을 줘요. 시간이 멀면 과거 이야기가 되고, **현실에서 멀면** 상상이 돼요. 그래서 지금 사실과 반대되는 상상을 할 때 동사를 과거형으로 밀어 "이건 현실이 아니에요"라고 표시하는 거예요.\n\n같은 원리로 Could you help me?(도와주실 수 있을까요?)처럼 과거형 조동사가 공손한 부탁에 쓰이기도 해요. 상대와 거리를 두어 부드럽게 말하는 거예요.\n\n고등학교에서는 **과거 사실과 반대되는 상상**도 배워요. 이때는 한 칸 더 과거로 밀어서 had + 과거분사를 써요.\n\n- 지금 반대: If I **had** time, I **would help** you. (지금 시간이 있다면 도와줄 텐데.)\n- 과거 반대: If I **had had** time, I **would have helped** you. (그때 시간이 있었다면 도와주었을 텐데.)\n\n오늘 배운 "현실과 반대면 한 칸 과거로"가 그대로 이어져요.',
    },
  ],

  faq: [
    {
      q: '가정법 과거는 과거형을 쓰는데 왜 지금 이야기예요?',
      a: '과거형이 "현실에서 멀다"는 신호로 쓰이기 때문이에요. If I had a dog는 "옛날에 개가 있었다면"이 아니라 "지금 개가 있다면(실제로는 없지만)"이라는 뜻이에요. 주절에 would/could가 함께 나오면 가정법이라고 알아보면 돼요.',
    },
    {
      q: 'If I were you에서 I 뒤인데 왜 was가 아니라 were예요?',
      a: '가정법 과거에서는 be동사를 주어와 상관없이 were로 쓰는 것이 원칙이에요. 일상 대화에서는 was를 쓰는 사람도 있지만, 글과 시험에서는 were가 바른 형태예요. 특히 If I were you는 굳어진 표현이에요.',
    },
    {
      q: 'I wish랑 I hope는 뭐가 달라요?',
      a: 'I hope는 실제로 이루어질 수 있는 일을 바랄 때 써요. I hope it will be sunny tomorrow.(내일 맑으면 좋겠어요.)\n\nI wish + 과거형은 지금 이루어지지 않은 일, 이루기 어려운 일을 바랄 때 써요. I wish I could fly.(날 수 있으면 좋을 텐데.)',
    },
  ],

  mistakes: [
    'if절에 현재형을 쓰고 주절에 would를 쓰는 실수 — If I have wings, I would fly.(✗) → If I had wings, I would fly.',
    'would/could 뒤에 과거형을 쓰는 실수 — I would went(✗) → I would go. would, could 뒤에는 늘 동사원형이에요.',
    'I wish 뒤에 현재형을 쓰는 실수 — I wish I can swim.(✗) → I wish I could swim.',
  ],

  gens: [
    {
      id: 'if-clause-form',
      level: 1,
      title: '가정법 과거의 if절 동사 고르기',
      make: function (R) {
        // [문장(빈칸), 원형, 과거형(정답), 현재형, 뜻]
        var items = [
          ['If I [[빈칸]] a million won, I would buy a new bike.', 'have', 'had', 'have', '내가 백만 원이 있다면 새 자전거를 살 텐데.'],
          ['If I [[빈칸]] a bird, I could fly to you.', 'be', 'were', 'am', '내가 새라면 너에게 날아갈 수 있을 텐데.'],
          ['If Minsu [[빈칸]] here, he would help us.', 'be', 'were', 'is', '민수가 여기 있다면 우리를 도와줄 텐데.'],
          ['If we [[빈칸]] near the sea, we could swim every day.', 'live', 'lived', 'live', '우리가 바닷가 근처에 산다면 날마다 수영할 수 있을 텐데.'],
          ['If I [[빈칸]] his address, I would send him a card.', 'know', 'knew', 'know', '내가 그의 주소를 안다면 카드를 보낼 텐데.'],
          ['If she [[빈칸]] faster, she could win the race.', 'run', 'ran', 'runs', '그녀가 더 빨리 달린다면 경주에서 이길 수 있을 텐데.'],
          ['If I [[빈칸]] free today, I would go to the movies with you.', 'be', 'were', 'am', '내가 오늘 한가하다면 너와 영화를 보러 갈 텐데.'],
          ['If my dad [[빈칸]] a car, he could drive us to the beach.', 'have', 'had', 'has', '아빠에게 차가 있다면 우리를 바닷가에 태워다 주실 수 있을 텐데.'],
          ['If Jia [[빈칸]] Chinese, she could talk with the new student.', 'speak', 'spoke', 'speaks', '지아가 중국어를 할 줄 안다면 새로 온 학생과 이야기할 수 있을 텐데.'],
          ['If it [[빈칸]] warm, we could have a picnic.', 'be', 'were', 'is', '날씨가 따뜻하다면 우리는 소풍을 갈 수 있을 텐데.'],
          ['If I [[빈칸]] you, I would say sorry to him.', 'be', 'were', 'am', '내가 너라면 그에게 사과할 텐데.'],
          ['If we [[빈칸]] a bigger house, we could get a dog.', 'have', 'had', 'have', '우리에게 더 큰 집이 있다면 개를 기를 수 있을 텐데.'],
          ['If he [[빈칸]] more, he would know the answer.', 'read', 'read', 'reads', '그가 책을 더 읽는다면 답을 알 텐데.'],
          ['If Seojun [[빈칸]] to bed earlier, he wouldn\'t be tired.', 'go', 'went', 'goes', '서준이가 더 일찍 잔다면 피곤하지 않을 텐데.'],
          ['If I [[빈칸]] how to cook, I would make dinner for my family.', 'know', 'knew', 'know', '내가 요리할 줄 안다면 가족을 위해 저녁을 만들 텐데.'],
          ['If my grandma [[빈칸]] with us, we could see her every day.', 'live', 'lived', 'lives', '할머니가 우리와 함께 사신다면 날마다 뵐 수 있을 텐데.'],
        ];
        var it = R.pick(items);
        var correct = it[2];
        var reason = {};
        var wrongs = [];
        function add(w, why) { if (w !== correct && !(w in reason)) { reason[w] = why; wrongs.push(w); } }
        add(it[3], '현재형을 쓰면 실제로 일어날 수 있는 조건이 돼요. 주절에 would/could가 있으니 if절은 과거형이에요.');
        add('will ' + it[1], 'if절에는 will을 쓰지 않아요. 가정법 과거의 if절은 과거형이에요.');
        if (it[1] === 'be') add('be', 'if절에는 주어 뒤에 동사원형 be를 쓰지 않아요. 가정법 과거에서 be동사는 were예요.');
        else add('would ' + it[1], 'would는 주절에 써요. if절에는 동사의 과거형이 와요.');
        var pick = R.choices(correct, wrongs, wrongs.length + 1);
        var pastNote = it[1] === 'be'
          ? '가정법 과거에서 be동사는 주어와 상관없이 were를 써요.'
          : (it[1] === 'read' ? 'read의 과거형은 철자가 같은 read예요(읽는 소리만 달라요).' : it[1] + '의 과거형: ' + correct);
        return {
          type: 'choice', concept: it[1] === 'be' ? 1 : 0,
          q: '빈칸에 알맞은 말을 고르세요.\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: '주절에 would/could + 동사원형이 있으니 지금 사실과 반대되는 상상(가정법 과거)이에요. if절에는 과거형을 써요. ' + pastNote +
            '\n\n' + it[0].replace('[[빈칸]]', '**' + correct + '**') + '\n(' + it[4] + ')',
        };
      },
    },
    {
      id: 'i-wish-form',
      level: 2,
      title: 'I wish + 가정법 과거로 바꾸기',
      make: function (R) {
        // [사실 문장, I wish 문장(빈칸), 정답, 현재형, 부정형, 바람의 뜻]
        var items = [
          ['I\'m sorry that I don\'t have a pet.', 'I wish I [[빈칸]] a pet.', 'had', 'have', 'didn\'t have', '반려동물이 있으면 좋을 텐데.'],
          ['I\'m sorry that I can\'t swim.', 'I wish I [[빈칸]] swim.', 'could', 'can', 'couldn\'t', '수영을 할 수 있으면 좋을 텐데.'],
          ['I\'m sorry that I am not tall.', 'I wish I [[빈칸]] tall.', 'were', 'am', 'weren\'t', '키가 크면 좋을 텐데.'],
          ['I\'m sorry that I don\'t know her phone number.', 'I wish I [[빈칸]] her phone number.', 'knew', 'know', 'didn\'t know', '그녀의 전화번호를 알면 좋을 텐데.'],
          ['I\'m sorry that my brother doesn\'t live near me.', 'I wish my brother [[빈칸]] near me.', 'lived', 'lives', 'didn\'t live', '형이 내 가까이에 살면 좋을 텐데.'],
          ['I\'m sorry that I can\'t speak French.', 'I wish I [[빈칸]] speak French.', 'could', 'can', 'couldn\'t', '프랑스어를 할 수 있으면 좋을 텐데.'],
          ['I\'m sorry that it is not sunny today.', 'I wish it [[빈칸]] sunny today.', 'were', 'is', 'weren\'t', '오늘 날씨가 맑으면 좋을 텐데.'],
          ['I\'m sorry that I don\'t have more time.', 'I wish I [[빈칸]] more time.', 'had', 'have', 'didn\'t have', '시간이 더 있으면 좋을 텐데.'],
          ['I\'m sorry that we don\'t have a garden.', 'I wish we [[빈칸]] a garden.', 'had', 'have', 'didn\'t have', '우리에게 정원이 있으면 좋을 텐데.'],
          ['I\'m sorry that I can\'t go to the concert.', 'I wish I [[빈칸]] go to the concert.', 'could', 'can', 'couldn\'t', '콘서트에 갈 수 있으면 좋을 텐데.'],
          ['I\'m sorry that Jia isn\'t in my class.', 'I wish Jia [[빈칸]] in my class.', 'were', 'is', 'weren\'t', '지아가 우리 반이면 좋을 텐데.'],
          ['I\'m sorry that I can\'t play the guitar.', 'I wish I [[빈칸]] play the guitar.', 'could', 'can', 'couldn\'t', '기타를 칠 수 있으면 좋을 텐데.'],
          ['I\'m sorry that my house isn\'t near the school.', 'I wish my house [[빈칸]] near the school.', 'were', 'is', 'weren\'t', '우리 집이 학교 가까이에 있으면 좋을 텐데.'],
          ['I\'m sorry that I don\'t know the answer.', 'I wish I [[빈칸]] the answer.', 'knew', 'know', 'didn\'t know', '답을 알면 좋을 텐데.'],
        ];
        var it = R.pick(items);
        var correct = it[2];
        var reason = {};
        reason[it[3]] = 'I wish 뒤에는 현재형이 아니라 과거형을 써요(지금 이루어지지 않은 바람).';
        reason[it[4]] = '부정으로 쓰면 바람이 사실과 같아져요. 지금 "~하지 못해서" 아쉬우니 긍정의 과거형으로 바라요.';
        var willForm = 'will ' + (correct === 'were' ? 'be' : correct === 'could' ? 'be able to' : it[3].replace(/s$/, ''));
        reason[willForm] = 'I wish 뒤에는 will을 쓰지 않아요. 지금 이루어지지 않은 일은 과거형으로 바라요.';
        var pick = R.choices(correct, [it[3], it[4], willForm], 4);
        return {
          type: 'choice', concept: 3,
          q: '두 문장의 뜻이 같도록 빈칸에 알맞은 말을 고르세요.\n\n' + it[0] + '\n= ' + it[1],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: '지금 이루어지지 않아 아쉬운 일은 I wish + 과거형으로 바라요. 부정(not)은 빼고 긍정으로 써요' + (correct === 'were' ? '(be동사는 were).' : '.') +
            '\n\n' + it[1].replace('[[빈칸]]', '**' + correct + '**') + '\n(' + it[5] + ')',
        };
      },
    },
  ],

  vocab: [
    { w: 'wish', m: '바라다; 소원', ex: 'I wish I could fly.', exm: '날 수 있으면 좋을 텐데.' },
    { w: 'imagine', m: '상상하다', ex: 'Imagine you were a bird.', exm: '여러분이 새라고 상상해 보세요.' },
    { w: 'magic', m: '마법의; 마법', ex: 'If I had a magic lamp, I would make three wishes.', exm: '요술 램프가 있다면 소원 세 가지를 빌 텐데.' },
    { w: 'wing', m: '날개', ex: 'If I had wings, I would fly to my grandma\'s house.', exm: '나에게 날개가 있다면 할머니 댁으로 날아갈 텐데.' },
    { w: 'advice', m: '충고, 조언', ex: 'Thank you for your advice.', exm: '충고해 줘서 고마워요.' },
    { w: 'rest', m: '휴식; 쉬다', ex: 'If I were you, I would take a rest.', exm: '내가 너라면 좀 쉴 텐데.' },
    { w: 'principal', m: '교장 선생님', ex: 'If I were the principal, I would plant more trees.', exm: '내가 교장 선생님이라면 나무를 더 심을 텐데.' },
    { w: 'mayor', m: '시장(도시의 대표)', ex: 'The mayor opened a new library.', exm: '시장이 새 도서관을 열었어요.' },
    { w: 'invisible', m: '눈에 보이지 않는', ex: 'If I were invisible, I would surprise my friends.', exm: '내가 투명 인간이라면 친구들을 깜짝 놀라게 할 텐데.' },
    { w: 'travel', m: '여행하다', ex: 'If I had a lot of money, I would travel around the world.', exm: '돈이 많다면 세계 여행을 할 텐데.' },
    { w: 'lonely', m: '외로운', ex: 'If I had a sister, I wouldn\'t be lonely.', exm: '나에게 언니가 있다면 외롭지 않을 텐데.' },
    { w: 'shade', m: '그늘', ex: 'We sat in the shade of a big tree.', exm: '우리는 큰 나무 그늘에 앉았어요.' },
    { w: 'crowded', m: '붐비는, 혼잡한', ex: 'The library is always crowded.', exm: '그 도서관은 늘 붐벼요.' },
    { w: 'pity', m: '유감, 안타까운 일', ex: 'It\'s a pity that you can\'t come.', exm: '네가 올 수 없다니 안타까워요.' },
  ],
});
