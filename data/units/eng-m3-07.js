/* 중3 영어 · 목적과 정도 말하기 (so that·too ~ to) */
Tutor.registerUnit({
  id: 'eng-m3-07',
  course: 'eng-m3',
  title: '목적과 정도 말하기 (so that·too ~ to)',
  summary: 'so that으로 목적을, too ~ to와 enough to로 정도를 나타내며 같은 뜻의 문장으로 바꿔 써요.',
  goals: [
    'so that + 주어 + can ~으로 "~하기 위해서, ~하도록"이라는 목적을 말할 수 있어요.',
    'too ~ to와 ~ enough to로 "너무 ~해서 …할 수 없다", "…할 만큼 충분히 ~하다"를 말할 수 있어요.',
    'too ~ to를 so ~ that ... can\'t로, enough to를 so ~ that ... can으로 바꿔 쓸 수 있어요.',
    '설명문에서 목적과 결과를 나타내는 표현을 찾을 수 있어요.',
  ],
  standards: ['[9영02-05]', '[9영01-04]', '[9영01-03]'],

  concepts: [
    {
      title: 'so that + 주어 + can: ~하기 위해서, ~하도록',
      body: '**so that + 주어 + can(could) + 동사원형**은 앞의 행동을 하는 **목적**을 나타내요. "~하기 위해서, ~하도록"이라는 뜻이에요.\n\n- I got up early **so that I could catch** the first bus. (나는 첫 버스를 탈 수 있도록 일찍 일어났어요.)\n- Speak louder **so that everyone can hear** you. (모두가 들을 수 있도록 더 크게 말하세요.)\n\n앞 문장이 과거면 **could**, 현재나 명령문이면 **can**을 주로 써요.\n\n중1에서 배운 to부정사(목적)와 뜻이 같아요.\n\n- I got up early **to catch** the first bus.\n- I got up early **in order to catch** the first bus.\n\nso that을 쓰면 **목적의 주어를 따로 밝힐 수 있다**는 점이 좋아요. Speak louder so that **everyone** can hear you.에서 듣는 사람은 말하는 사람이 아니라 everyone이에요.\n\n> ⚠️ 중2에서 배운 **so + 형용사 + that**(너무 ~해서 …하다, 결과)과 헷갈리지 마세요. so와 that이 **붙어 있으면 목적**, 사이에 형용사·부사가 있으면 결과예요.',
      easy: 'so that 뒤에는 "왜 그렇게 했는지"가 와요.\n\n- 일찍 일어났어요 → 왜? → 첫 버스를 **타려고** (so that I could catch the first bus)\n\nso that을 "~하려고, ~하도록"이라는 꼬리표라고 생각하세요. 꼬리표 안에는 주어와 can(could)이 들어가요.',
      check: {
        type: 'choice',
        q: '밑줄 친 부분의 뜻으로 알맞은 것을 고르세요.\n\nI saved money __so that I could buy a new bike__.',
        choices: ['새 자전거를 살 수 있도록', '새 자전거를 사서', '새 자전거를 살 수 없어서'],
        answer: 0,
        why: [
          '',
          'so that은 결과가 아니라 목적을 나타내요. 돈을 모은 목적이 자전거를 사는 것이에요.',
          '문장에 부정(not)이 없어요. so that ~ could는 "~할 수 있도록"이에요.',
        ],
        explain: 'so that + 주어 + could는 목적을 나타내요. "나는 새 자전거를 **살 수 있도록** 돈을 모았어요." (= I saved money to buy a new bike.)',
      },
    },
    {
      title: 'too + 형용사/부사 + to부정사: 너무 ~해서 …할 수 없다',
      body: '**too + 형용사/부사 + to + 동사원형**은 "**너무 ~해서 …할 수 없다**"는 뜻이에요. 정도가 지나쳐서 어떤 일을 못 하게 되는 거예요.\n\n- This box is **too heavy to lift**. (이 상자는 너무 무거워서 들 수 없어요.)\n- Minsu was **too tired to walk** any more. (민수는 너무 피곤해서 더 걸을 수 없었어요.)\n- She spoke **too fast to understand**. (그녀는 너무 빨리 말해서 알아들을 수 없었어요.)\n\nto부정사의 행동을 하는 사람을 밝히고 싶으면 to 앞에 **for + 사람**을 넣어요.\n\n- This box is too heavy **for me** to lift. (이 상자는 너무 무거워서 내가 들 수 없어요.)\n\n> ⚠️ too ~ to 안에 이미 "할 수 없다"는 뜻이 있어요. not을 또 넣지 않아요. too heavy **not** to lift(✗)',
      easy: 'too는 "넘치는" 느낌이에요. 컵에 물을 너무 많이 부으면 넘쳐서 못 마시지요?\n\n- 상자 무게가 **넘쳐서** → 들 수 없다: too heavy to lift\n- 피곤함이 **넘쳐서** → 걸을 수 없다: too tired to walk\n\nto 뒤의 동사는 "못 하는 일"이에요. 문장에 not이 없어도 "못 한다"로 읽어요.',
      check: {
        type: 'ox',
        q: 'The tea is too hot to drink.\n\n이 문장은 "차가 너무 뜨거워서 마실 수 없다"는 뜻이에요.',
        answer: true,
        explain: '맞아요. too + 형용사 + to부정사는 "너무 ~해서 …할 수 없다"예요. 차가 너무 **뜨거워서** 마실 **수 없어요**.',
      },
    },
    {
      title: '형용사/부사 + enough + to부정사: …할 만큼 충분히 ~하다',
      body: '**형용사/부사 + enough + to + 동사원형**은 "**…할 만큼 충분히 ~하다**", "충분히 ~해서 …할 수 있다"는 뜻이에요.\n\n- She is **old enough to drive** a car. (그녀는 운전할 만큼 충분히 나이가 들었어요.)\n- He ran **fast enough to catch** the bus. (그는 버스를 탈 수 있을 만큼 빨리 달렸어요.)\n- The ice is **thick enough to walk** on. (얼음은 위를 걸을 만큼 충분히 두꺼워요.)\n\n**enough는 형용사·부사 뒤**에 와요. enough old(✗) → old enough\n\ntoo ~ to와 반대로 생각하면 쉬워요.\n\n| 표현 | 뜻 | 예 |\n|---|---|---|\n| too ~ to | 너무 ~해서 …할 수 **없다** | He is **too young to** drive. |\n| ~ enough to | 충분히 ~해서 …할 수 **있다** | She is **old enough to** drive. |',
      easy: 'enough는 "딱 필요한 만큼 채웠다"는 느낌이에요.\n\n놀이 기구 앞에 "키 130 cm 이상"이라는 표지판이 있다고 해 봐요. 키가 140 cm인 지아는 기준을 채웠으니 탈 수 있어요.\n\n→ Jia is **tall enough to ride** it. (지아는 그것을 탈 만큼 키가 커요.)\n\n순서는 "얼마나(tall) + 충분히(enough)"예요.',
      check: {
        type: 'choice',
        q: '어순이 바른 문장을 고르세요.',
        choices: ['He is strong enough to carry the box.', 'He is enough strong to carry the box.', 'He is strong to enough carry the box.'],
        answer: 0,
        why: [
          '',
          'enough는 형용사 뒤에 와요: strong enough',
          'enough는 to 앞, 형용사 바로 뒤에 와요: strong enough to carry',
        ],
        explain: '형용사 + enough + to부정사 순서예요. → He is **strong enough to carry** the box. (그는 그 상자를 옮길 만큼 충분히 힘이 세요.)',
      },
    },
    {
      title: 'too ~ to ↔ so ~ that ... can\'t 바꿔 쓰기',
      body: '중2에서 배운 **so + 형용사/부사 + that**(너무 ~해서 …하다)으로 too ~ to와 enough to를 바꿔 쓸 수 있어요.\n\n| | 바꿔 쓰기 |\n|---|---|\n| too ~ to | **so ~ that + 주어 + can\'t(couldn\'t)** |\n| ~ enough to | **so ~ that + 주어 + can(could)** |\n\n- This box is too heavy for me to lift.\n  = This box is **so heavy that I can\'t lift it**.\n- Minsu was too tired to walk any more.\n  = Minsu was **so tired that he couldn\'t walk** any more.\n- He ran fast enough to catch the bus.\n  = He ran **so fast that he could catch** the bus.\n\n바꿀 때 세 가지를 확인해요.\n\n1. **주어**: for + 사람이 있으면 그 사람이 that절의 주어(for me → I). 없으면 문장의 주어(Minsu → he).\n2. **시제**: 문장이 과거면 couldn\'t / could.\n3. **목적어**: 문장의 주어가 동사의 대상이면 that절에 대명사를 다시 넣어요. lift **it**(it = this box)\n\n> 💡 거꾸로 too ~ to로 바꿀 때는 그 대명사를 빼요. This box is too heavy for me to lift.(lift it ✗)',
      easy: '두 문장은 같은 이야기를 다르게 말하는 거예요.\n\n- 짧게: too heavy to lift (너무 무거워 들 수 없음)\n- 길게: so heavy that I can\'t lift it (너무 무거워서 **내가** 그것을 들 수 **없다**)\n\n길게 말할 때는 "누가(I)", "못 한다(can\'t)", "무엇을(it)"을 다 써 줘야 해요. 짧게 말할 때는 그것들이 숨어 있어요.',
      check: {
        type: 'choice',
        q: '두 문장의 뜻이 같도록 빈칸에 알맞은 말을 고르세요.\n\nThe river was too deep for us to cross.\n= The river was so deep that we [[빈칸]] cross it.',
        choices: ['couldn\'t', 'could', 'can\'t'],
        answer: 0,
        why: [
          '',
          'too ~ to는 "할 수 없다"는 뜻이에요. so ~ that 뒤에는 부정(couldn\'t)이 와야 해요.',
          '문장의 시제가 과거(was)이므로 can\'t가 아니라 couldn\'t를 써요.',
        ],
        explain: 'too ~ to = so ~ that ... can\'t예요. 시제가 과거(was)이므로 **couldn\'t**를 써요. "강이 너무 깊어서 우리는 건널 수 없었어요."',
      },
    },
    {
      title: '설명문에서 목적과 결과의 표현 찾기',
      body: '설명문은 "**왜** 그런지", "**그래서 어떻게 되는지**"를 알려 주는 글이라서 목적과 결과의 표현이 많이 나와요.\n\n| 목적 (~하기 위해서) | 결과·정도 (그래서 ~하다) |\n|---|---|\n| so that + 주어 + can | so ~ that … |\n| to + 동사원형, in order to | too ~ to, ~ enough to |\n| | so (그래서) |\n\n> Camels live in hot, dry deserts. They have long eyelashes **so that** sand **can\'t** get into their eyes easily. They are **strong enough to** carry heavy things across the desert. A camel can drink a lot of water at one time, **so** it can go for days without drinking.\n\n- 긴 속눈썹의 **목적**: 모래가 눈에 쉽게 들어가지 **못하도록** (so that ~ can\'t)\n- 낙타의 힘의 **정도**: 무거운 짐을 나를 만큼 힘이 세다 (enough to)\n- 물을 한 번에 많이 마시는 것의 **결과**: 며칠 동안 마시지 않고도 지낼 수 있다 (so)\n\n> 💡 so that 뒤에 can\'t가 오면 "~하지 못하도록"이라는 목적이 돼요.',
      easy: '설명문을 읽을 때 "왜?"라는 질문을 던져 보세요.\n\n- 낙타는 왜 속눈썹이 길까? → so that 뒤에 답이 있어요.\n- 그래서 어떻게 될까? → so, too ~ to, enough to 뒤에 답이 있어요.\n\n이 표현들은 글 속의 "답이 있는 곳"을 가리키는 화살표예요.',
      check: {
        type: 'choice',
        q: '글을 읽고 물음에 답하세요.\n\nMany stores put their sweets near the counter so that children can see them easily.\n\n가게들이 사탕을 계산대 근처에 두는 목적은 무엇일까요?',
        choices: ['아이들이 쉽게 볼 수 있도록', '사탕이 녹지 않도록', '계산대가 너무 좁아서'],
        answer: 0,
        why: [
          '',
          '사탕이 녹는 이야기는 글에 없어요. so that 뒤를 보세요.',
          '계산대가 좁다는 말은 없어요. so that 뒤에 목적이 나와요.',
        ],
        explain: 'so that children can see them easily는 "아이들이 그것들을 **쉽게 볼 수 있도록**"이라는 목적이에요.',
      },
    },
  ],

  examples: [
    {
      q: '두 문장의 뜻이 같도록 바꾸세요.\n\nThe soup was too hot for me to eat.\n= The soup was so hot that ___.',
      steps: [
        'too ~ to는 so ~ that ... can\'t로 바꿔요.',
        'for me가 있으니 that절의 주어는 I예요.',
        '시제가 과거(was)이므로 couldn\'t를 써요.',
        '먹지 못한 대상은 문장의 주어 the soup예요. that절에 대명사 it을 넣어요.',
      ],
      answer: 'The soup was so hot that **I couldn\'t eat it**. (수프가 너무 뜨거워서 나는 그것을 먹을 수 없었어요.)',
    },
    {
      q: 'so that을 써서 한 문장으로 나타내세요.\n\nJia studied hard. She wanted to pass the test. (지아는 시험에 합격하려고 열심히 공부했어요.)',
      steps: [
        '열심히 공부한 목적이 시험 합격이에요. 목적은 so that + 주어 + can으로 나타내요.',
        '앞 문장이 과거(studied)이므로 could를 써요: so that she could pass the test',
      ],
      answer: 'Jia studied hard **so that she could pass** the test.',
    },
  ],

  terms: [
    { term: 'so that', def: '"~하기 위해서, ~하도록"이라는 목적을 나타내요. 뒤에 주어 + can(could) + 동사원형이 와요. 예: I left early so that I could get a good seat.' },
    { term: 'too ~ to', def: '"너무 ~해서 …할 수 없다"는 뜻이에요. too 뒤에 형용사·부사, to 뒤에 동사원형이 와요. 예: It is too cold to swim.' },
    { term: 'enough to', def: '"…할 만큼 충분히 ~하다"는 뜻이에요. enough는 형용사·부사 뒤에 와요. 예: He is tall enough to reach it.' },
    { term: 'so ~ that', def: '"너무(아주) ~해서 …하다"라는 결과를 나타내요. so와 that 사이에 형용사·부사가 와요. 예: It was so cold that we stayed home.' },
    { term: '목적', def: '어떤 행동을 하는 까닭, 이루려는 것이에요. so that, to부정사, in order to로 나타내요.' },
    { term: '결과', def: '어떤 일 때문에 일어난 일이에요. so ~ that, too ~ to, so(그래서) 등으로 나타내요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nI got up early [[빈칸]] I could catch the first bus.',
      choices: ['so that', 'too', 'enough', 'such'],
      answer: 0,
      why: [
        '',
        'too 뒤에는 형용사·부사가 와요. 뒤에 주어 + could가 오는 목적의 표현은 so that이에요.',
        'enough는 형용사·부사 뒤에 붙어 정도를 나타내요. 주어 + could를 이끌지 못해요.',
        'such는 명사 앞에서 "그런, 그렇게 ~한"이라는 뜻이에요. 목적을 나타내지 못해요.',
      ],
      explain: '일찍 일어난 **목적**이 첫 버스를 타는 것이에요. 목적은 **so that** + 주어 + could로 나타내요. "나는 첫 버스를 탈 수 있도록 일찍 일어났어요."',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
      q: '빈칸에 알맞은 **한 낱말**을 쓰세요.\n\nThis bag is [[빈칸]] heavy to carry. (이 가방은 너무 무거워서 들고 다닐 수 없어요.)',
      answer: ['too'],
      wrong: [
        { a: 'so', why: 'so 뒤에는 that절이 와요(so heavy that ~). to부정사와 짝을 이루는 말은 too예요.' },
        { a: 'very', why: 'very heavy to carry로는 "너무 무거워서 ~할 수 없다"는 뜻이 되지 않아요. too ~ to를 써요.' },
        { a: 'enough', why: 'enough는 형용사 뒤에 오고 "충분히 ~해서 할 수 있다"는 뜻이에요. 들고 다닐 수 "없다"는 too예요.' },
      ],
      explain: '"너무 ~해서 …할 수 없다"는 **too** + 형용사 + to부정사예요. → This bag is **too** heavy to carry.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: '어순이 바른 문장을 고르세요.',
      choices: ['She is old enough to drive.', 'She is enough old to drive.', 'She is old to enough drive.', 'She enough is old to drive.'],
      answer: 0,
      why: [
        '',
        'enough는 형용사 뒤에 와요: old enough',
        'enough는 형용사 바로 뒤, to 앞에 와요: old enough to drive',
        'enough는 형용사 old 뒤에 와요. be동사 앞에 오지 않아요.',
      ],
      explain: '형용사 + **enough** + to부정사 순서예요. → She is **old enough to drive**. (그녀는 운전할 만큼 충분히 나이가 들었어요.)',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: 'He is too young not to watch this movie.\n\n"그는 너무 어려서 이 영화를 볼 수 없다"는 뜻을 바르게 나타낸 문장이에요.',
      answer: false,
      explain: 'too ~ to 안에 이미 "할 수 없다"는 뜻이 있어서 not을 넣지 않아요. 바른 문장은 He is **too young to watch** this movie.예요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 0,
      q: '다음 문장의 뜻으로 알맞은 것을 고르세요.\n\nSpeak louder so that everyone can hear you.',
      choices: [
        '모두가 들을 수 있도록 더 크게 말하세요.',
        '모두가 들을 수 있어서 더 크게 말하세요.',
        '너무 크게 말해서 모두가 들을 수 없어요.',
        '모두가 더 크게 말하면 너도 들을 수 있어요.',
      ],
      answer: 0,
      why: [
        '',
        'so that은 이유가 아니라 목적이에요. "~할 수 있도록"이라고 해석해요.',
        '이 문장에는 too ~ to나 can\'t가 없어요. 크게 말하라는 명령문이에요.',
        '크게 말하는 사람은 "너"이고, 듣는 사람이 everyone이에요.',
      ],
      explain: 'so that + 주어 + can은 "~할 수 있도록"이라는 목적이에요. "**모두가 들을 수 있도록** 더 크게 말하세요."',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 **한 낱말**을 쓰세요.\n\nMy dad is tall [[빈칸]] to touch the ceiling. (아빠는 천장에 손이 닿을 만큼 키가 커요.)',
      answer: ['enough'],
      wrong: [
        { a: 'too', why: 'too ~ to는 "너무 ~해서 할 수 없다"는 뜻이에요. 천장에 손이 "닿을 만큼"이니 enough예요. 또 too는 형용사 앞에 와요.' },
        { a: 'so', why: 'so 뒤에는 형용사가 오고, 그 뒤에 that절이 와요. "~할 만큼 충분히"는 형용사 뒤의 enough예요.' },
      ],
      explain: '"…할 만큼 충분히 ~하다"는 형용사 + **enough** + to부정사예요. → My dad is tall **enough** to touch the ceiling.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 말을 고르세요.\n\nThe box was too heavy for me to lift.\n= The box was so heavy that I [[빈칸]] lift it.',
      choices: ['couldn\'t', 'could', 'can\'t', 'can'],
      answer: 0,
      why: [
        '',
        'too ~ to는 "할 수 없다"는 뜻이에요. 부정(couldn\'t)으로 바꿔요.',
        '문장의 시제가 과거(was)이므로 couldn\'t를 써요.',
        'too ~ to는 "할 수 없다"는 뜻이고, 시제가 과거이므로 couldn\'t예요.',
      ],
      explain: 'too ~ to = so ~ that ... can\'t예요. 시제가 과거(was)이므로 **couldn\'t**예요. "상자가 너무 무거워서 나는 그것을 들 수 없었어요."',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 0,
      q: '우리말에 맞게 낱말을 바르게 배열하세요.\n\n지아는 시험에 합격할 수 있도록 열심히 공부했어요.',
      choices: ['Jia studied', 'hard', 'so that', 'she could pass', 'the test'],
      answer: [0, 1, 2, 3, 4],
      hint: '먼저 "누가 무엇을 했는지", 그다음 so that 뒤에 목적을 써요.',
      explain: '**Jia studied hard so that she could pass the test.** 앞 문장이 과거(studied)이므로 so that 뒤에 could를 써요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'text', concept: 3,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 **한 낱말**을 쓰세요.\n\nThis question is so easy that I can solve it.\n= This question is easy [[빈칸]] for me to solve.',
      answer: ['enough'],
      hint: 'so ~ that ... can은 "할 수 있다"는 뜻이에요.',
      wrong: [
        { a: 'too', why: 'too ~ to는 "너무 ~해서 할 수 없다"예요. 원래 문장은 풀 수 "있다(can)"예요. 또 too는 형용사 앞에 와요.' },
        { a: 'so', why: 'so 뒤에는 that절이 와요. to부정사로 바꿀 때 "할 수 있다"는 enough를 써요.' },
      ],
      explain: 'so ~ that ... can = ~ **enough** to예요. → This question is easy **enough** for me to solve.(이 문제는 내가 풀 수 있을 만큼 쉬워요.) to부정사로 바꿀 때는 it을 빼요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '다음 문장과 뜻이 같은 것을 고르세요.\n\nSeojun was so sick that he couldn\'t go to school.',
      choices: [
        'Seojun was too sick to go to school.',
        'Seojun was sick enough to go to school.',
        'Seojun was too sick not to go to school.',
        'Seojun was so sick to go to school.',
      ],
      answer: 0,
      why: [
        '',
        'enough to는 "충분히 ~해서 할 수 있다"는 뜻이에요. 서준이는 학교에 갈 수 "없었어요".',
        'too ~ to에 이미 "할 수 없다"는 뜻이 있어서 not을 넣지 않아요.',
        'so 뒤에는 that절이 와요. to부정사와 짝을 이루는 말은 too예요.',
      ],
      hint: 'so ~ that ... couldn\'t는 too ~ to로 바꿀 수 있어요.',
      explain: 'so ~ that ... can\'t(couldn\'t) = too ~ to예요. → **Seojun was too sick to go to school.** (서준이는 너무 아파서 학교에 갈 수 없었어요.)',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '글을 읽고 물음에 답하세요.\n\nCamels live in hot, dry deserts. They have long eyelashes so that sand can\'t get into their eyes easily. They are strong enough to carry heavy things across the desert. A camel can drink a lot of water at one time, so it can go for days without drinking.\n\n낙타의 속눈썹이 긴 목적은 무엇일까요?',
      choices: [
        '모래가 눈에 쉽게 들어가지 못하도록',
        '무거운 짐을 나를 수 있도록',
        '물을 한 번에 많이 마시려고',
        '더운 사막의 햇빛을 즐기려고',
      ],
      answer: 0,
      why: [
        '',
        '짐을 나르는 것은 낙타의 힘이 세다는 내용(strong enough to)이에요.',
        '물을 많이 마시는 것은 며칠 동안 물 없이 지낼 수 있는 까닭이에요.',
        '햇빛을 즐긴다는 내용은 글에 없어요.',
      ],
      hint: 'eyelashes(속눈썹) 뒤의 so that을 찾아보세요.',
      explain: 'They have long eyelashes **so that sand can\'t get into their eyes easily**. → 낙타는 **모래가 눈에 쉽게 들어가지 못하도록** 속눈썹이 길어요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: '다음 중 어법상 **옳지 않은** 문장을 고르세요.',
      choices: [
        'This soup is too hot for me to eat it.',
        'The river was too deep for us to cross.',
        'She is brave enough to sing on the stage.',
        'He saved money so that he could buy a new bike.',
      ],
      answer: 0,
      why: [
        '',
        '바른 문장이에요. 건너는 대상(the river)이 문장의 주어라서 to cross 뒤에 it을 쓰지 않았어요.',
        '바른 문장이에요. 형용사(brave) + enough + to부정사 순서예요.',
        '바른 문장이에요. 과거(saved)이므로 so that 뒤에 could를 썼어요.',
      ],
      hint: 'too ~ to 문장에서 문장의 주어가 to부정사 동사의 대상일 때 무엇을 빼는지 떠올려 보세요.',
      explain: '먹는 대상이 문장의 주어 This soup이므로 to eat 뒤에 it을 다시 쓰지 않아요: This soup is too hot for me **to eat**. it은 so ~ that으로 바꿀 때만 넣어요: This soup is so hot that I can\'t eat **it**.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 3,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 말을 쓰세요.\n\nI was too tired to finish my homework.\n= I was so tired that I [[빈칸]] finish my homework.',
      answer: ['couldn\'t', 'could not'],
      hint: 'too ~ to의 숨은 뜻과 문장의 시제를 함께 생각해 보세요.',
      wrong: [
        { a: 'can\'t', why: '문장의 시제가 과거(was)이므로 can\'t가 아니라 couldn\'t를 써요.' },
        { a: 'could', why: 'too ~ to는 "할 수 없다"는 뜻이에요. 부정으로 써야 해요.' },
        { a: 'can not', why: '문장의 시제가 과거(was)이므로 could not을 써요.' },
      ],
      explain: 'too ~ to = so ~ that ... can\'t인데, 시제가 과거(was)이므로 **couldn\'t**(또는 could not)를 써요. "나는 너무 피곤해서 숙제를 끝낼 수 없었어요."',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 0, fixed: true,
      q: '다음 두 문장 가운데 **목적**("~하도록")을 나타내는 문장을 모두 고르세요.\n\n(A) He talked quietly so that the baby could sleep.\n(B) He talked so quietly that I couldn\'t hear him.',
      choices: ['(A)만', '(B)만', '(A)와 (B) 모두', '둘 다 아니에요'],
      answer: 0,
      why: [
        '',
        '(B)의 so quietly that은 so와 that 사이에 부사가 있어서 "너무 조용히 말해서 들을 수 없었다"는 결과예요.',
        '(B)는 목적이 아니라 결과예요. so와 that이 떨어져 있어요.',
        '(A)는 so that이 붙어 있어 "아기가 잘 수 있도록"이라는 목적이에요.',
      ],
      hint: 'so와 that이 붙어 있는지, 사이에 다른 말이 있는지 보세요.',
      explain: '(A) so that이 붙어 있으니 **목적**: "그는 아기가 잘 수 있도록 조용히 말했어요." (B) so quietly that은 **결과**: "그는 너무 조용히 말해서 나는 들을 수 없었어요." 그래서 목적은 (A)만이에요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '글을 읽고 물음에 답하세요.\n\nBees are very important for plants. They carry pollen from flower to flower, and this helps plants make seeds. But in some places, there are too few bees to visit all the flowers. So some towns plant many kinds of flowers so that bees can find food easily all year round.\n\n어떤 마을들이 여러 가지 꽃을 심는 목적은 무엇일까요?',
      choices: [
        '벌이 일 년 내내 먹이를 쉽게 찾을 수 있도록',
        '마을을 아름답게 꾸미려고',
        '벌이 너무 많아서 줄이려고',
        '꽃씨를 팔아 돈을 벌려고',
      ],
      answer: 0,
      why: [
        '',
        '마을을 꾸민다는 내용은 글에 없어요. so that 뒤에 목적이 있어요.',
        'too few bees는 벌이 "너무 적다"는 뜻이에요. 많은 것이 아니에요.',
        '꽃씨를 판다는 내용은 글에 없어요.',
      ],
      hint: 'plant many kinds of flowers 뒤의 so that을 찾아보세요.',
      explain: 'some towns plant many kinds of flowers **so that bees can find food easily all year round** → 벌이 **일 년 내내 먹이를 쉽게 찾을 수 있도록** 꽃을 심어요. 앞 문장의 too few bees to visit all the flowers(벌이 너무 적어서 모든 꽃을 찾아가지 못한다)가 그 까닭이에요.',
    },
    {
      id: 'a5', level: 3, type: 'order', concept: 2,
      q: '우리말에 맞게 낱말을 바르게 배열하세요.\n\n이 상자는 내가 들 수 있을 만큼 가벼워요.',
      choices: ['This box', 'is', 'light enough', 'for me', 'to carry'],
      answer: [0, 1, 2, 3, 4],
      hint: '형용사 + enough + (for + 사람) + to부정사 순서예요.',
      explain: '**This box is light enough for me to carry.** enough는 형용사 light 뒤에 오고, 드는 사람은 to 앞에 for me로 밝혀요. 상자가 문장의 주어이니 carry 뒤에 it을 쓰지 않아요.',
    },
  ],

  deeper: [
    {
      title: '목적을 나타내는 여러 표현과 so의 세 얼굴',
      body: '"~하기 위해서"는 여러 가지로 말할 수 있어요.\n\n| 표현 | 예 |\n|---|---|\n| to + 동사원형 | I went to the library **to borrow** a book. |\n| in order to + 동사원형 | I went to the library **in order to borrow** a book. |\n| so that + 주어 + can | I went to the library **so that I could borrow** a book. |\n\nto와 in order to는 목적의 주어가 문장의 주어와 같을 때 써요. 주어가 다르면 so that이 편해요: I lent Jia my notes **so that she could study**.\n\n또 so는 쓰임에 따라 뜻이 달라요.\n\n- **so that** (붙어 있음) → 목적: ~하도록\n- **so + 형용사/부사 + that** → 결과: 너무 ~해서 …하다\n- **, so** (문장 사이) → 결과: 그래서\n\n고등학교에서는 not을 넣은 in order not to, so as not to(~하지 않도록) 같은 표현도 배워요.',
    },
  ],

  faq: [
    {
      q: 'so that이랑 so ~ that은 뭐가 달라요?',
      a: 'so that은 붙어 있고 "~하도록"이라는 목적이에요. so ~ that은 사이에 형용사·부사가 있고 "너무 ~해서 …하다"라는 결과예요.\n\n예: I ran so that I could catch the bus.(버스를 타려고 뛰었다) / I ran so fast that I caught the bus.(너무 빨리 뛰어서 버스를 탔다)',
    },
    {
      q: 'too ~ to 문장에는 not이 없는데 왜 "할 수 없다"예요?',
      a: 'too가 "지나치게"라는 뜻이라서, 정도가 지나쳐서 그 일을 할 수 없다는 뜻이 이미 들어 있어요. 그래서 not을 또 넣으면 틀려요. so ~ that으로 바꿀 때만 can\'t를 써요.',
    },
    {
      q: 'enough money처럼 enough가 앞에 올 때도 있던데요?',
      a: '맞아요. enough가 **명사**를 꾸밀 때는 명사 앞에 와요: enough money(충분한 돈), enough time(충분한 시간). **형용사·부사**와 쓸 때는 뒤에 와요: old enough, fast enough.\n\n예: I have enough money to buy it. / She is old enough to drive.',
    },
  ],

  mistakes: [
    'too ~ to에 not을 넣는 실수 — too young not to watch(✗) → too young to watch',
    'enough를 형용사 앞에 쓰는 실수 — enough old(✗) → old enough',
    'too ~ to로 바꾸면서 목적어를 남기는 실수 — too heavy for me to lift it(✗) → too heavy for me to lift',
  ],

  gens: [
    {
      id: 'too-to-so-that',
      level: 2,
      title: 'too ~ to를 so ~ that ... can\'t로 바꾸기',
      make: function (R) {
        // [주어, be동사, 형용사, 동사구({o} = 목적어 자리), that절 주어, for + 사람(없으면 null), 목적어 대명사('' 이면 없음), 뜻]
        var items = [
          ['The soup', 'was', 'hot', 'eat{o}', 'I', 'me', 'it', '수프가 너무 뜨거워서 나는 먹을 수 없었어요.'],
          ['This box', 'is', 'heavy', 'lift{o}', 'I', 'me', 'it', '이 상자는 너무 무거워서 나는 들 수 없어요.'],
          ['Minsu', 'was', 'tired', 'walk any more', 'he', null, '', '민수는 너무 피곤해서 더 걸을 수 없었어요.'],
          ['The question', 'was', 'difficult', 'answer{o}', 'we', 'us', 'it', '그 질문은 너무 어려워서 우리는 답할 수 없었어요.'],
          ['My sister', 'is', 'young', 'ride the roller coaster', 'she', null, '', '내 여동생은 너무 어려서 롤러코스터를 탈 수 없어요.'],
          ['The shelf', 'is', 'high', 'reach{o}', 'Jia', 'Jia', 'it', '그 선반은 너무 높아서 지아는 손이 닿지 않아요.'],
          ['The movie', 'was', 'scary', 'watch{o} alone', 'I', 'me', 'it', '그 영화는 너무 무서워서 나는 혼자 볼 수 없었어요.'],
          ['It', 'was', 'cold', 'swim in the sea', 'we', 'us', '', '너무 추워서 우리는 바다에서 수영할 수 없었어요.'],
          ['The music', 'was', 'loud', 'hear each other', 'we', 'us', '', '음악이 너무 시끄러워서 우리는 서로의 말을 들을 수 없었어요.'],
          ['Seojun', 'was', 'sick', 'go to school', 'he', null, '', '서준이는 너무 아파서 학교에 갈 수 없었어요.'],
          ['This book', 'is', 'difficult', 'read{o}', 'children', 'children', 'it', '이 책은 너무 어려워서 아이들이 읽을 수 없어요.'],
          ['The water', 'is', 'dirty', 'drink{o}', 'we', 'us', 'it', '그 물은 너무 더러워서 우리가 마실 수 없어요.'],
          ['Hayun', 'was', 'excited', 'sleep', 'she', null, '', '하윤이는 너무 들떠서 잠을 잘 수 없었어요.'],
          ['The bag', 'was', 'expensive', 'buy{o}', 'I', 'me', 'it', '그 가방은 너무 비싸서 나는 살 수 없었어요.'],
          ['The river', 'was', 'deep', 'cross{o}', 'we', 'us', 'it', '그 강은 너무 깊어서 우리는 건널 수 없었어요.'],
          ['These shoes', 'are', 'small', 'wear{o}', 'I', 'me', 'them', '이 신발은 너무 작아서 나는 신을 수 없어요.'],
        ];
        var it = R.pick(items);
        var past = it[1] === 'was' || it[1] === 'were';
        var neg = past ? 'couldn\'t' : 'can\'t';
        var negOther = past ? 'can\'t' : 'couldn\'t';
        var pos = past ? 'could' : 'can';
        var vpBare = it[3].replace('{o}', '');
        var vpObj = it[3].replace('{o}', it[6] ? ' ' + it[6] : '');
        var tooS = it[0] + ' ' + it[1] + ' too ' + it[2] + (it[5] ? ' for ' + it[5] : '') + ' to ' + vpBare + '.';
        var head = it[0] + ' ' + it[1] + ' so ' + it[2] + ' that ' + it[4] + ' ';
        var correct = head + neg + ' ' + vpObj + '.';
        var reason = {};
        var wrongs = [];
        function add(w, why) { if (w !== correct && !(w in reason)) { reason[w] = why; wrongs.push(w); } }
        add(head + pos + ' ' + vpObj + '.', 'too ~ to는 "너무 ~해서 할 수 없다"는 뜻이에요. so ~ that 뒤에는 부정(' + neg + ')을 써요.');
        add(head + negOther + ' ' + vpObj + '.', '시제를 맞춰요. 문장의 동사가 ' + it[1] + (past ? '(과거)이므로 couldn\'t' : '(현재)이므로 can\'t') + '를 써요.');
        add(it[0] + ' ' + it[1] + ' too ' + it[2] + ' that ' + it[4] + ' ' + neg + ' ' + vpObj + '.', 'too 뒤에는 that절이 오지 않아요. that절과 짝을 이루는 말은 so예요.');
        var pick = R.choices(correct, wrongs, 4);
        var steps = 'too ~ to는 so ~ that ... ' + neg + '로 바꿔요. that절의 주어는 ' + (it[5] ? 'for ' + it[5] + '에서 온 ' + it[4] : '문장의 주어를 대신하는 ' + it[4]) + ', 시제는 ' + (past ? '과거' : '현재') + (it[6] ? ', 동사 뒤에는 대상을 가리키는 ' + it[6] + ' 대명사를 넣어요.' : '예요.');
        return {
          type: 'choice', concept: 3,
          q: '두 문장의 뜻이 같도록 할 때 빈칸에 알맞은 문장을 고르세요.\n\n' + tooS + '\n= [[빈칸]]',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: steps + '\n\n**' + correct + '**\n(' + it[7] + ')',
        };
      },
    },
    {
      id: 'too-or-enough',
      level: 1,
      title: 'too ~ to와 ~ enough to 고르기',
      make: function (R) {
        // [문장(빈칸), 형용사/부사, 'too' 또는 'enough', 뜻]
        var items = [
          ['Minsu is [[빈칸]] to reach the top shelf.', 'tall', 'enough', '민수는 맨 위 선반에 손이 닿을 만큼 키가 커요.'],
          ['My brother is [[빈칸]] to ride this ride.', 'short', 'too', '남동생은 너무 키가 작아서 이 놀이 기구를 탈 수 없어요.'],
          ['The water is [[빈칸]] to swim in.', 'warm', 'enough', '물은 들어가 수영할 만큼 따뜻해요.'],
          ['It is [[빈칸]] to play outside.', 'cold', 'too', '너무 추워서 밖에서 놀 수 없어요.'],
          ['Jia is [[빈칸]] to win the race.', 'fast', 'enough', '지아는 경주에서 이길 만큼 빨라요.'],
          ['The tea is [[빈칸]] to drink.', 'hot', 'too', '차가 너무 뜨거워서 마실 수 없어요.'],
          ['This bag is [[빈칸]] to hold all my books.', 'big', 'enough', '이 가방은 내 책을 모두 넣을 만큼 커요.'],
          ['He spoke [[빈칸]] for everyone to hear.', 'loudly', 'enough', '그는 모두가 들을 수 있을 만큼 크게 말했어요.'],
          ['She ran [[빈칸]] to catch the bus.', 'fast', 'enough', '그녀는 버스를 탈 수 있을 만큼 빨리 달렸어요.'],
          ['The box is [[빈칸]] for me to carry.', 'heavy', 'too', '그 상자는 너무 무거워서 내가 옮길 수 없어요.'],
          ['I was [[빈칸]] to stay awake.', 'sleepy', 'too', '나는 너무 졸려서 깨어 있을 수 없었어요.'],
          ['The ice is [[빈칸]] to walk on.', 'thick', 'enough', '얼음은 위를 걸을 수 있을 만큼 두꺼워요.'],
          ['He is [[빈칸]] to watch this movie.', 'young', 'too', '그는 너무 어려서 이 영화를 볼 수 없어요.'],
          ['The room was [[빈칸]] to see anything.', 'dark', 'too', '방이 너무 어두워서 아무것도 볼 수 없었어요.'],
          ['Doyun is [[빈칸]] to lift the table.', 'strong', 'enough', '도윤이는 탁자를 들 만큼 힘이 세요.'],
          ['The rope was [[빈칸]] to reach the ground.', 'short', 'too', '밧줄이 너무 짧아서 땅에 닿지 않았어요.'],
        ];
        var it = R.pick(items);
        var a = it[1];
        var tooF = 'too ' + a;
        var enF = a + ' enough';
        var correct = it[2] === 'too' ? tooF : enF;
        var reason = {};
        if (it[2] === 'too') {
          reason[enF] = 'enough to는 "충분히 ~해서 할 수 있다"는 뜻이에요. 우리말 뜻은 "너무 ~해서 할 수 없다"예요.';
        } else {
          reason[tooF] = 'too ~ to는 "너무 ~해서 할 수 없다"는 뜻이에요. 우리말 뜻은 "~할 만큼 충분히"예요.';
        }
        reason['enough ' + a] = 'enough는 형용사·부사 뒤에 와요: ' + enF;
        reason['so ' + a] = 'so 뒤에는 that절이 와요. to부정사와는 too 또는 enough를 써요.';
        var wrongs = [it[2] === 'too' ? enF : tooF, 'enough ' + a, 'so ' + a];
        var pick = R.choices(correct, wrongs, 4);
        return {
          type: 'choice', concept: it[2] === 'too' ? 1 : 2,
          q: '우리말 뜻에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + it[0] + '\n(' + it[3] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: (it[2] === 'too'
            ? '"너무 ~해서 …할 수 없다"는 too + 형용사/부사 + to부정사예요.'
            : '"…할 만큼 충분히 ~하다"는 형용사/부사 + enough + to부정사예요. enough는 뒤에 와요.') +
            '\n\n' + it[0].replace('[[빈칸]]', '**' + correct + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'purpose', m: '목적', ex: 'What is the purpose of your trip?', exm: '여행의 목적이 무엇인가요?' },
    { w: 'result', m: '결과', ex: 'The result of the test was good.', exm: '시험 결과가 좋았어요.' },
    { w: 'enough', m: '충분한; 충분히', ex: 'She is old enough to ride a bike alone.', exm: '그녀는 혼자 자전거를 탈 만큼 나이가 들었어요.' },
    { w: 'lift', m: '들어 올리다', ex: 'The box is too heavy to lift.', exm: '그 상자는 너무 무거워서 들 수 없어요.' },
    { w: 'reach', m: '(손이) 닿다, 이르다', ex: 'I can\'t reach the top shelf.', exm: '나는 맨 위 선반에 손이 닿지 않아요.' },
    { w: 'shelf', m: '선반', ex: 'Put the books on the shelf.', exm: '책을 선반에 올려놓으세요.' },
    { w: 'ceiling', m: '천장', ex: 'There is a fan on the ceiling.', exm: '천장에 선풍기가 있어요.' },
    { w: 'carry', m: '나르다, 들고 다니다', ex: 'He is strong enough to carry the boxes.', exm: '그는 그 상자들을 나를 만큼 힘이 세요.' },
    { w: 'desert', m: '사막', ex: 'It rarely rains in the desert.', exm: '사막에는 비가 거의 오지 않아요.' },
    { w: 'sand', m: '모래', ex: 'The children played in the sand.', exm: '아이들은 모래에서 놀았어요.' },
    { w: 'eyelash', m: '속눈썹', ex: 'Long eyelashes keep dust out of your eyes.', exm: '긴 속눈썹은 먼지가 눈에 들어가지 않게 막아 줘요.' },
    { w: 'protect', m: '보호하다', ex: 'Wear a helmet so that you can protect your head.', exm: '머리를 보호할 수 있도록 헬멧을 쓰세요.' },
    { w: 'brave', m: '용감한', ex: 'She was brave enough to speak first.', exm: '그녀는 먼저 말할 만큼 용감했어요.' },
    { w: 'pollen', m: '꽃가루', ex: 'Bees carry pollen from flower to flower.', exm: '벌은 꽃에서 꽃으로 꽃가루를 옮겨요.' },
  ],
});
