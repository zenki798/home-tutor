/* 중2 영어 · 사람과 사물 설명하기 (관계대명사) */
(function () {
  // 직접 쓴 소개 글 (역사 인물·가상 인물)
  var SEJONG = '**King Sejong**\n\nKing Sejong was a king who many Koreans still respect. He created Hangeul, the writing system that we use every day. Before Hangeul, people had to use Chinese characters which were very hard to learn. Sejong wanted letters that everyone could learn easily. He also supported scientists who made useful things like a rain gauge and a water clock.';
  var JIA = '**A Young Inventor**\n\nJia is a middle school student who loves inventing things. Last year, she made a special umbrella that lights up at night. With this umbrella, drivers can easily see people who are walking in the dark. The umbrella has a small battery which lasts for ten hours. Jia\'s friends say the umbrella is the most useful thing that she has made.';

Tutor.registerUnit({
  id: 'eng-m2-03',
  course: 'eng-m2',
  title: '사람과 사물 설명하기 (관계대명사)',
  summary: '관계대명사 who·which·that으로 사람과 사물을 꾸며 자세히 설명하고, 생략할 수 있는 경우를 알아봐요.',
  goals: [
    '관계대명사로 두 문장을 이어 앞의 명사(선행사)를 꾸밀 수 있어요.',
    '선행사에 맞게 주격 관계대명사 who·which·that을 고르고, 뒤의 동사를 선행사의 수에 맞출 수 있어요.',
    '목적격 관계대명사 who(m)·which·that을 쓰고, 생략할 수 있는 경우를 알 수 있어요.',
    '인물이나 발명품을 소개하는 글에서 꾸밈을 받는 말과 꾸미는 말을 찾을 수 있어요.',
  ],
  standards: ['[9영02-03]', '[9영01-02]', '[9영01-03]'],

  concepts: [
    {
      title: '관계대명사의 역할과 선행사',
      body: '**관계대명사**는 두 문장을 하나로 **이어 주면서**, 앞에 나온 명사를 **뒤에서 꾸미는** 말을 이끌어요. 이때 꾸밈을 받는 앞의 명사를 **선행사**라고 해요.\n\n- I have a friend. + **She** lives in Canada.\n- → I have **a friend** **who** lives in Canada. (나에게는 캐나다에 사는 친구가 있어요.)\n\n두 번째 문장의 She가 앞 문장의 a friend와 같은 사람이지요? 그래서 She를 관계대명사 who로 바꾸고, a friend 바로 뒤에 붙였어요. 이렇게 하면 **who lives in Canada**가 a friend를 꾸미는 덩어리가 돼요.\n\n| 선행사 | 관계대명사 | 꾸미는 덩어리 |\n|---|---|---|\n| a friend | who | who lives in Canada |\n| the bag | which | which is on the desk |\n\n> 💡 우리말은 꾸미는 말이 앞에 오지만("캐나다에 사는 친구"), 영어는 **명사를 먼저 말하고 뒤에서 설명**해요(a friend who lives in Canada).',
      easy: '관계대명사는 명사 뒤에 붙이는 **"설명 꼬리표"의 고리**예요.\n\n- a friend → 어떤 친구? → a friend **who** lives in Canada\n\n명사(친구)를 먼저 말하고, 고리(who)를 건 다음, 그 고리에 설명(캐나다에 산다)을 매다는 거예요. 고리 바로 앞에 있는 명사가 바로 설명을 받는 주인공, 곧 **선행사**예요.',
      check: {
        type: 'choice',
        q: 'The boy who is singing on the stage is my brother.에서 선행사는 무엇일까요?',
        choices: ['The boy', 'the stage', 'my brother'],
        answer: 0,
        why: ['', 'the stage는 꾸미는 덩어리(who is singing on the stage) 안에 있는 말이에요. 선행사는 관계대명사 바로 앞의 명사예요.', 'my brother는 문장 끝의 보어예요. who 바로 앞에 있는 명사를 찾아보세요.'],
        explain: '관계대명사 who 바로 앞의 명사 **The boy**가 선행사예요. who is singing on the stage(무대에서 노래하고 있는)가 The boy를 꾸며요.',
      },
    },
    {
      title: '주격 관계대명사 who·which·that',
      body: '관계대명사가 꾸미는 덩어리 안에서 **주어** 역할을 하면 **주격 관계대명사**예요. 그래서 바로 뒤에 **동사**가 와요.\n\n| 선행사 | 주격 관계대명사 | 예문 |\n|---|---|---|\n| 사람 | **who** 또는 that | I know a girl **who plays** the drums. |\n| 사물·동물 | **which** 또는 that | This is the bus **which goes** to the airport. |\n\n**that**은 사람과 사물 모두에 쓸 수 있어요.\n\n**동사의 수 일치**: 관계대명사 뒤의 동사는 **선행사**에 맞춰요.\n- I have **a friend** who **lives** in Jeju. (선행사 a friend가 단수 → lives)\n- I have **two friends** who **live** in Jeju. (선행사 two friends가 복수 → live)\n- **The books** which **are** on the table are mine.\n\n> ⚠️ 관계대명사 뒤에 주어를 또 쓰지 않아요. I know a girl who **she** plays the drums.(✗)',
      easy: '주격 관계대명사는 "그 사람은/그것은"을 대신하는 말이에요.\n\n- I know a girl. **She** plays the drums. → She 자리에 who를 넣어 이어요.\n\n고르는 방법은 간단해요. 선행사가 **사람이면 who**, **사물이나 동물이면 which**, 헷갈리면 둘 다 되는 **that**.\n\n동사는 선행사의 "머릿수"를 따라가요. 한 명이면 -s를 붙이고(lives), 여러 명이면 안 붙여요(live).',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nI know a boy who [[빈칸]] three languages.',
        choices: ['speaks', 'speak', 'speaking'],
        answer: 0,
        why: ['', '선행사 a boy는 한 명(단수)이에요. 현재형이면 동사에 -s를 붙여요.', 'who 뒤에는 동사가 와야 해요. speaking만으로는 동사가 되지 못해요.'],
        explain: 'who 뒤의 동사는 선행사 a boy(단수)에 맞춰 **speaks**를 써요. "나는 3개 언어를 말하는 소년을 알아요."',
      },
    },
    {
      title: '목적격 관계대명사 who(m)·which·that',
      body: '관계대명사가 꾸미는 덩어리 안에서 **목적어** 역할을 하면 **목적격 관계대명사**예요. 그래서 뒤에 **주어 + 동사**가 오고, 동사 뒤의 **목적어 자리가 비어 있어요**.\n\n- This is the cake. + My mom made **it**.\n- → This is **the cake** **which** my mom made. (이것은 엄마가 만든 케이크예요.)\n\n| 선행사 | 목적격 관계대명사 | 예문 |\n|---|---|---|\n| 사람 | **who(m)** 또는 that | She is the teacher **whom** everyone likes. |\n| 사물·동물 | **which** 또는 that | I lost the pen **which** I bought yesterday. |\n\n사람 선행사의 목적격은 원래 **whom**인데, 말할 때는 **who**를 더 많이 써요.\n\n> ⚠️ 관계대명사가 목적어(it, him …)를 대신했으니 뒤에 목적어를 또 쓰지 않아요. This is the cake which my mom made **it**.(✗)\n\n**주격과 목적격 구별하기**: 관계대명사 바로 뒤를 보세요.\n- 바로 뒤에 **동사** → 주격 (a girl who **plays** …)\n- 바로 뒤에 **주어 + 동사** → 목적격 (the cake which **my mom made**)',
      easy: '목적격 관계대명사는 "그것을/그 사람을"을 대신하는 말이에요.\n\n- This is the cake. My mom made **it**. → it(그것을)을 which로 바꿔 앞으로 보내요.\n\nit이 which가 되어 앞으로 이사 갔으니, 원래 자리(made 뒤)는 **빈 집**이 돼요. 빈 집에 it을 또 넣으면 같은 것이 두 번 나오는 셈이라 틀려요.',
      check: {
        type: 'ox',
        q: 'This is the cake which my mom made it.은 바른 문장이에요.',
        answer: false,
        explain: 'which가 이미 목적어 it을 대신하고 있어요. 목적어를 또 쓰면 안 되니 **This is the cake which my mom made.**로 써야 해요.',
      },
    },
    {
      title: '목적격 관계대명사의 생략',
      body: '**목적격 관계대명사**는 **생략할 수 있어요**. 생략해도 "명사 + 주어 + 동사"의 모양만 보고 꾸미는 말이라는 것을 알 수 있기 때문이에요.\n\n- The movie **which** I watched yesterday was fun.\n- = The movie **I watched yesterday** was fun. (내가 어제 본 영화는 재미있었어요.)\n- She is the girl **who(m)** I met at the library. = She is the girl **I met** at the library.\n\n**주격 관계대명사**는 혼자 생략할 수 **없어요**. 빼면 문장의 동사가 둘이 되어 뜻이 엉켜요.\n- I know a girl **who** speaks French. → I know a girl speaks French.(✗)\n\n**생략된 관계대명사 찾기**: **명사 바로 뒤에 주어 + 동사**가 이어지면, 그 사이에 목적격 관계대명사가 숨어 있어요.\n- The cake [ ] **Sua made** was delicious. → The cake (which/that) Sua made …',
      easy: '목적격 관계대명사는 "눈에 안 보여도 되는 연결 고리"예요. 명사 바로 뒤에 "누가 ~한"이 오면, 사이에 고리가 숨어 있다고 생각하세요.\n\n- the pizza **we ordered** → 우리가 주문한 피자 (the pizza **that** we ordered)\n\n하지만 주격 관계대명사는 꼬리표의 첫 글자라서 빼면 안 돼요. a girl **who** speaks French에서 who를 빼면 "a girl speaks French"가 되어 마치 새 문장처럼 보이거든요.',
      check: {
        type: 'choice',
        q: '관계대명사를 **생략할 수 있는** 문장을 고르세요.',
        choices: ['This is the book which I borrowed.', 'I have a dog which barks a lot.', 'He is the boy who won the race.'],
        answer: 0,
        why: ['', 'which 바로 뒤에 동사 barks가 와요. 주격 관계대명사라서 생략할 수 없어요.', 'who 바로 뒤에 동사 won이 와요. 주격 관계대명사라서 생략할 수 없어요.'],
        explain: 'which 뒤에 주어 I + 동사 borrowed가 오니 목적격이에요. **This is the book I borrowed.**처럼 생략할 수 있어요.',
      },
    },
    {
      title: '소개하는 글에서 꾸밈을 받는 말 찾기',
      body: '인물이나 발명품을 소개하는 글에는 관계대명사가 자주 나와요. "어떤 사람인지, 어떤 물건인지"를 자세히 설명해야 하기 때문이에요.\n\n**긴 문장 읽는 순서**\n1. **who, which, that**을 찾아요.\n2. 바로 앞의 명사가 **꾸밈을 받는 말**(선행사)이에요.\n3. 관계대명사부터 **문장의 진짜 동사 앞까지**가 꾸미는 덩어리예요. 그 덩어리를 괄호로 묶고 읽으면 문장의 뼈대가 보여요.\n\n예: The robot [**that** Jia made] **can clean** the floor.\n- 꾸밈을 받는 말: The robot\n- 꾸미는 덩어리: that Jia made (지아가 만든)\n- 문장의 뼈대: The robot can clean the floor. (그 로봇은 바닥을 청소할 수 있어요.)\n\n> 💡 문장의 진짜 동사(can clean)와 덩어리 안의 동사(made)를 헷갈리지 않는 것이 중요해요.',
      easy: '긴 문장은 **괄호 치기**로 짧게 만들어요.\n\nThe robot [that Jia made] can clean the floor.\n\n괄호 속은 "어떤 로봇?"에 대한 설명일 뿐이에요. 괄호를 가리고 읽으면 The robot can clean the floor.라는 짧은 문장만 남지요. 괄호 속 설명은 그다음에 붙여서 "지아가 만든 로봇은 바닥을 청소할 수 있어요."라고 읽어요.',
      check: {
        type: 'choice',
        q: 'The robot that Jia made can clean the floor.에서 문장 전체의 동사(뼈대의 동사)는 무엇일까요?',
        choices: ['can clean', 'made', 'that'],
        answer: 0,
        why: ['', 'made는 꾸미는 덩어리(that Jia made) 안의 동사예요. 괄호로 묶고 남은 부분을 보세요.', 'that은 관계대명사예요. 동사가 아니에요.'],
        explain: '[that Jia made]를 괄호로 묶으면 The robot **can clean** the floor.가 남아요. 그래서 문장 전체의 동사는 can clean이에요.',
      },
    },
  ],

  examples: [
    {
      q: '관계대명사를 써서 두 문장을 한 문장으로 만들어 보세요.\n\nI have a cousin. He plays baseball very well.',
      steps: [
        '두 문장에서 같은 사람을 찾아요: a cousin = He',
        'He는 두 번째 문장의 주어이고 사람이므로 주격 관계대명사 **who**(또는 that)로 바꿔요.',
        'who 덩어리를 선행사 a cousin 바로 뒤에 붙여요. 선행사가 단수이므로 동사는 plays 그대로예요.',
      ],
      answer: 'I have a cousin **who plays** baseball very well.',
    },
    {
      q: '관계대명사를 써서 두 문장을 한 문장으로 만들어 보세요.\n\nThe pizza was cold. We ordered it last night.',
      steps: [
        '같은 것을 찾아요: The pizza = it',
        'it은 ordered의 목적어이고 사물이므로 목적격 관계대명사 **which**(또는 that)로 바꿔요.',
        'which we ordered last night을 선행사 The pizza 바로 뒤에 넣어요. it은 지워요.',
        '목적격이므로 which를 생략해도 돼요: The pizza we ordered last night was cold.',
      ],
      answer: 'The pizza **which we ordered** last night was cold.',
    },
  ],

  terms: [
    { term: '관계대명사', def: '두 문장을 이으면서 앞의 명사를 뒤에서 꾸미는 덩어리를 이끄는 말이에요. 예: who, which, that' },
    { term: '선행사', def: '관계대명사 바로 앞에서 꾸밈을 받는 명사예요. 예: a friend who lives in Canada에서 a friend' },
    { term: '주격 관계대명사', def: '꾸미는 덩어리 안에서 주어 역할을 하는 관계대명사예요. 바로 뒤에 동사가 와요. 예: a girl who plays the drums' },
    { term: '목적격 관계대명사', def: '꾸미는 덩어리 안에서 목적어 역할을 하는 관계대명사예요. 뒤에 주어 + 동사가 오고 생략할 수 있어요. 예: the cake (which) my mom made' },
    { term: 'who', def: '선행사가 사람일 때 쓰는 관계대명사예요. 목적격으로는 whom도 써요.' },
    { term: 'which', def: '선행사가 사물이나 동물일 때 쓰는 관계대명사예요.' },
    { term: 'that', def: '선행사가 사람이든 사물이든 쓸 수 있는 관계대명사예요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말을 고르세요.\n\nI have an uncle [[빈칸]] works at a hospital.',
      choices: ['who', 'which', 'he', 'whom'],
      answer: 0,
      why: ['', 'which는 사물이나 동물을 꾸밀 때 써요. an uncle은 사람이에요.', 'he 같은 대명사는 두 문장을 이어 주지 못해요. 관계대명사를 써야 해요.', 'whom은 목적격이에요. 빈칸 뒤에 동사 works가 바로 오니 주어 역할을 하는 주격이 필요해요.'],
      explain: '선행사 an uncle이 사람이고, 빈칸 바로 뒤에 동사 works가 오니 주격 관계대명사 **who**를 써요. "나에게는 병원에서 일하는 삼촌이 있어요."',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말을 고르세요.\n\nThis is the bus [[빈칸]] goes to the airport.',
      choices: ['which', 'who', 'it', 'they'],
      answer: 0,
      why: ['', 'who는 사람을 꾸밀 때 써요. the bus는 사물이에요.', 'it은 대명사라서 두 문장을 이어 주지 못해요.', 'they는 대명사이고 복수예요. 두 문장을 이으려면 관계대명사가 필요해요.'],
      explain: '선행사 the bus가 사물이니 **which**(또는 that)를 써요. "이것은 공항으로 가는 버스예요."',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 0,
      q: 'The girl who is talking to Minsu is my cousin.에서 who is talking to Minsu는 The girl을 꾸며요.',
      answer: true,
      explain: 'who 바로 앞의 명사 The girl이 선행사예요. "민수와 이야기하고 있는 소녀는 내 사촌이에요."',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'text', concept: 1,
      q: '괄호 안의 동사를 알맞은 꼴로 바꿔 빈칸에 쓰세요. (현재형)\n\nThe students who [[빈칸]] in the library are quiet. (study)',
      answer: ['study'],
      wrong: [
        { a: 'studies', why: '선행사 The students는 복수예요. 복수에 맞는 동사는 -s를 붙이지 않은 study예요.' },
        { a: 'studying', why: 'who 뒤에는 동사가 와야 해요. 현재형 동사를 써요.' },
      ],
      explain: 'who 뒤의 동사는 선행사에 맞춰요. 선행사 The students가 복수이므로 **study**예요. "도서관에서 공부하는 학생들은 조용해요."',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르세요.\n\nThe cookies [[빈칸]] my mom baked were delicious.',
      choices: ['which', 'who', 'they', 'it'],
      answer: 0,
      why: ['', 'who는 사람을 꾸밀 때 써요. The cookies는 사물이에요.', 'they는 대명사라서 두 문장을 이어 주지 못해요.', 'it은 대명사이고 단수예요. 관계대명사가 필요해요.'],
      explain: '선행사 The cookies가 사물이고, 빈칸 뒤에 주어(my mom) + 동사(baked)가 오니 목적격 관계대명사 **which**(또는 that)를 써요. "엄마가 구운 쿠키는 맛있었어요."',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 3,
      q: 'The man I met yesterday was kind.에는 목적격 관계대명사가 생략되어 있어요.',
      answer: true,
      explain: '명사 The man 바로 뒤에 주어 I + 동사 met이 이어져요. The man (who(m)/that) I met yesterday에서 목적격 관계대명사가 생략됐어요. "내가 어제 만난 남자는 친절했어요."',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 관계대명사 한 낱말을 쓰세요.\n\nThis is the movie [[빈칸]] I watched last week.',
      answer: ['which', 'that'],
      wrong: [
        { a: 'who', why: 'who는 사람을 꾸밀 때 써요. the movie는 사물이에요.' },
        { a: 'it', why: 'it은 대명사라서 두 문장을 이어 주지 못해요.' },
      ],
      explain: '선행사 the movie가 사물이고 뒤에 주어 + 동사(I watched)가 오니 목적격 관계대명사 **which** 또는 **that**을 써요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 2,
      q: '우리말에 맞게 순서대로 놓으세요.\n\n이것은 내 남동생이 그린 그림이에요.',
      choices: ['This is', 'the picture', 'that', 'my brother', 'drew.'],
      answer: [0, 1, 2, 3, 4],
      hint: '"그림"을 먼저 말하고, 그 뒤에 "내 남동생이 그린"을 붙여요.',
      explain: 'This is(이것은 ~이에요) + the picture(그림) + that my brother drew(내 남동생이 그린). 선행사 the picture 뒤에 목적격 관계대명사 that + 주어 + 동사가 와요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '관계대명사를 빼면 **틀린 문장이 되는** 것을 고르세요.',
      choices: ['I know a girl who speaks French.', 'This is the book which I bought.', 'The pizza that we ordered was cold.', 'She is the teacher whom everyone likes.'],
      answer: 0,
      why: ['', 'which 뒤에 주어 I + 동사가 오는 목적격이에요. This is the book I bought.처럼 뺄 수 있어요.', 'that 뒤에 주어 we + 동사가 오는 목적격이에요. The pizza we ordered was cold.처럼 뺄 수 있어요.', 'whom은 목적격이에요. She is the teacher everyone likes.처럼 뺄 수 있어요.'],
      hint: '관계대명사 바로 뒤에 동사가 오는지, 주어 + 동사가 오는지 보세요.',
      explain: 'who 바로 뒤에 동사 speaks가 오니 **주격** 관계대명사예요. 주격은 혼자 생략할 수 없어요. 나머지는 모두 목적격이라 생략할 수 있어요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'text', concept: 2,
      q: '두 문장을 한 문장으로 만들 때 빈칸에 알맞은 관계대명사 한 낱말을 쓰세요.\n\nSeojun is the friend. I trust him the most.\n= Seojun is the friend [[빈칸]] I trust the most.',
      answer: ['who', 'whom', 'that'],
      wrong: [
        { a: 'him', why: 'him은 대명사라서 두 문장을 이어 주지 못해요. him을 관계대명사로 바꿔요.' },
        { a: 'which', why: 'which는 사물이나 동물에 써요. the friend는 사람이에요.' },
      ],
      hint: 'him은 trust의 목적어예요. 사람을 대신하는 목적격 관계대명사를 생각해 보세요.',
      explain: 'him(사람, 목적어)을 목적격 관계대명사 **who(m)** 또는 **that**으로 바꿔요. "서준이는 내가 가장 믿는 친구예요."',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '다음 글을 읽고 물음에 답하세요.\n\n' + SEJONG + '\n\n글에서 scientists를 꾸미는 말은 무엇일까요?',
      choices: ['who made useful things like a rain gauge and a water clock', 'He also supported', 'which were very hard to learn', 'that we use every day'],
      answer: 0,
      why: ['', 'He also supported는 scientists 앞에 있는 문장의 뼈대예요. 꾸미는 말은 관계대명사로 시작해요.', 'which were very hard to learn은 Chinese characters를 꾸며요.', 'that we use every day는 the writing system을 꾸며요.'],
      hint: 'scientists 바로 뒤에 오는 관계대명사를 찾아보세요.',
      explain: 'scientists 바로 뒤의 **who made useful things like a rain gauge and a water clock**(측우기와 물시계 같은 쓸모 있는 것들을 만든)이 scientists를 꾸며요.',
    },
    {
      id: 'p12', level: 2, type: 'ox', concept: 4,
      q: '다음 글을 읽고 맞으면 O, 틀리면 X를 고르세요.\n\n' + SEJONG + '\n\n한글이 만들어지기 전에 사람들은 배우기 쉬운 글자를 썼어요.',
      answer: false,
      explain: 'Before Hangeul, people had to use Chinese characters **which were very hard to learn**.(한글 이전에 사람들은 배우기 매우 어려운 한자를 써야 했어요.) 꾸미는 덩어리 which were very hard to learn이 한자가 어떤 글자였는지 알려 줘요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      q: '어법상 **어색한** 문장을 고르세요.',
      choices: ['The boys who plays soccer are my classmates.', 'I like stories that have happy endings.', 'The woman who lives next door is a nurse.', 'The book which is on the desk is mine.'],
      answer: 0,
      why: ['', '선행사 stories가 복수라서 have가 맞아요.', '선행사 The woman이 단수라서 lives가 맞아요.', '선행사 The book이 단수라서 is가 맞아요.'],
      hint: '관계대명사 뒤의 동사가 선행사의 수와 맞는지 보세요.',
      explain: '선행사 The boys가 복수이므로 who 뒤의 동사는 **play**여야 해요. The boys who **play** soccer are my classmates.(축구를 하는 소년들은 내 반 친구들이에요.)',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '다음 문장을 바르게 고치는 방법을 고르세요.\n\nThis is the pen which I lost it yesterday.',
      choices: ['lost 뒤의 대명사를 지운다.', 'which를 who로 바꾼다.', 'lost를 lose로 바꾼다.', 'which를 지운다.'],
      answer: 0,
      why: ['', 'the pen은 사물이라 which가 맞아요.', 'yesterday가 있으니 과거형 lost가 맞아요.', 'which를 지워도 뒤에 목적어가 또 있어서 여전히 틀린 문장이에요.'],
      hint: 'which가 무엇을 대신하고 있는지 생각해 보세요.',
      explain: 'which가 lost의 목적어(the pen)를 대신하므로 목적어를 다시 쓰면 안 돼요. **This is the pen which I lost yesterday.**(이것은 내가 어제 잃어버린 펜이에요.)',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'text', concept: 3,
      q: '다음 문장에는 목적격 관계대명사가 생략되어 있어요. 생략된 관계대명사가 들어갈 자리 **바로 앞의 낱말** 하나를 쓰세요.\n\nThe cake Sua made for her dad was delicious.',
      answer: ['cake'],
      wrong: [
        { a: 'Sua', why: 'Sua는 꾸미는 덩어리의 주어예요. 관계대명사는 주어 Sua 앞, 곧 선행사 바로 뒤에 들어가요.' },
        { a: 'made', why: 'made 뒤에는 관계대명사가 들어가지 않아요. 명사 바로 뒤에 주어 + 동사가 이어지는 곳을 찾아보세요.' },
        { a: 'dad', why: 'for her dad 뒤에는 문장의 진짜 동사 was가 와요. 관계대명사 자리가 아니에요.' },
      ],
      hint: '명사 바로 뒤에 "주어 + 동사"가 이어지는 곳을 찾아보세요.',
      explain: 'The cake (which/that) Sua made for her dad was delicious. 명사 **cake** 바로 뒤에 주어 Sua + 동사 made가 이어지니, 그 사이에 목적격 관계대명사가 숨어 있어요. "수아가 아빠를 위해 만든 케이크는 맛있었어요."',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '다음 글의 내용과 **일치하는** 것을 고르세요.\n\n' + JIA,
      choices: ['우산의 배터리는 10시간 동안 쓸 수 있다.', '지아는 운전하는 사람들을 위해 자동차를 만들었다.', '지아가 만든 우산은 낮에만 빛이 난다.', '지아의 친구들은 그 우산이 쓸모없다고 말한다.'],
      answer: 0,
      why: ['', '지아가 만든 것은 자동차가 아니라 밤에 빛이 나는 우산이에요(a special umbrella that lights up at night).', 'that lights up at night라고 했어요. 우산은 밤에 빛이 나요.', 'the most useful thing that she has made라고 했어요. 친구들은 가장 쓸모 있는 물건이라고 말해요.'],
      hint: '보기마다 핵심 낱말(배터리, 자동차, 빛, 친구들)이 나오는 문장을 찾아 읽어 보세요.',
      explain: 'The umbrella has a small battery **which lasts for ten hours**.(그 우산에는 10시간 동안 가는 작은 배터리가 있어요.)와 일치해요. which lasts for ten hours가 battery를 꾸며요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 1,
      q: '두 문장을 한 문장으로 **바르게** 나타낸 것을 고르세요.\n\nThe man is a chef. He is wearing a white hat.',
      choices: ['The man who is wearing a white hat is a chef.', 'The man which is wearing a white hat is a chef.', 'The man who he is wearing a white hat is a chef.', 'The man who are wearing a white hat is a chef.'],
      answer: 0,
      why: ['', 'The man은 사람이라 which가 아니라 who(또는 that)를 써요.', '관계대명사 who가 이미 주어 He를 대신했어요. 주어를 또 쓰지 않아요.', '선행사 The man이 단수라서 are가 아니라 is를 써요.'],
      explain: 'He를 주격 관계대명사 who로 바꾸어 The man 바로 뒤에 붙여요. **The man who is wearing a white hat is a chef.**(흰 모자를 쓰고 있는 남자는 요리사예요.)',
    },
  ],

  deeper: [
    {
      title: '더 알아보기: 중3에서 만나는 관계대명사 what',
      body: '이 단원의 who·which·that은 모두 앞에 **선행사**가 있어요. 중3에서는 선행사를 품고 있는 관계대명사 **what**을 배워요. what은 "~하는 것"이라는 뜻으로, the thing which와 같아요.\n\n- This is **the thing which** I wanted. = This is **what** I wanted. (이것이 내가 원했던 것이에요.)\n\n그리고 사람의 소유를 나타내는 **whose**(누구의)도 관계대명사로 쓰여요. I have a friend **whose** father is a pilot.(나에게는 아버지가 조종사인 친구가 있어요.)\n\n지금 배운 "선행사 + 관계대명사 + 꾸미는 덩어리"의 틀을 확실히 익혀 두면, 새로운 관계대명사도 같은 틀에 끼워 이해할 수 있어요.',
    },
  ],

  faq: [
    {
      q: 'who랑 whom은 어떻게 달라요?',
      a: 'who는 주격(뒤에 동사), whom은 목적격(뒤에 주어 + 동사)이에요. a girl **who** plays the drums / the teacher **whom** everyone likes.\n\n다만 말할 때는 목적격에도 who를 많이 써요. 그래서 목적격 자리라면 who, whom, that이 모두 맞아요. 반대로 주격 자리에 whom을 쓰면 틀려요.',
    },
    {
      q: 'that은 아무 때나 써도 돼요?',
      a: '이 단원에서 배우는 주격·목적격 자리에서는 사람이든 사물이든 that을 쓸 수 있어요. 헷갈리면 that을 쓰는 것도 좋은 방법이에요. 다만 중3에서 배우는 쉼표 뒤의 관계대명사(계속적 용법)에는 that을 쓰지 않아요.',
    },
    {
      q: '의문사 who랑 관계대명사 who는 어떻게 구별해요?',
      a: '의문사 who는 "누구?"라고 묻는 말이라 주로 문장 맨 앞에 오고 물음표로 끝나요(Who is she?). 관계대명사 who는 문장 가운데에서 **앞의 사람 명사 바로 뒤**에 와서 그 사람을 설명해요(the girl who is singing). 바로 앞에 사람 명사가 있는지 보세요.',
    },
  ],

  mistakes: [
    '관계대명사 뒤에 주어나 목적어를 또 쓰는 실수 — a girl who **she** plays(✗), the cake which my mom made **it**(✗)',
    '관계대명사 뒤의 동사를 바로 앞 낱말에 맞추는 실수 — 동사는 선행사에 맞춰요. The boys who **play** soccer …',
    '주격 관계대명사를 생략하는 실수 — I know a girl speaks French.(✗) → I know a girl **who** speaks French.',
  ],

  gens: [
    {
      id: 'who-which',
      level: 1,
      title: '선행사에 맞는 관계대명사 고르기',
      make: function (R) {
        // [문장, 사람인가, 대명사 오답, 우리말]
        var bank = [
          ['I have a friend [[빈칸]] lives in Canada.', true, 'she', '나에게는 캐나다에 사는 친구가 있어요.'],
          ['The woman [[빈칸]] teaches us music is very kind.', true, 'she', '우리에게 음악을 가르치는 여자분은 매우 친절해요.'],
          ['Do you know the boy [[빈칸]] is standing by the door?', true, 'he', '문 옆에 서 있는 소년을 아니?'],
          ['He is the player [[빈칸]] scored the goal.', true, 'he', '그가 골을 넣은 선수예요.'],
          ['We need someone [[빈칸]] can speak Chinese.', true, 'he', '우리는 중국어를 할 수 있는 사람이 필요해요.'],
          ['The doctor [[빈칸]] helped my grandpa was very busy.', true, 'she', '할아버지를 도와준 의사 선생님은 매우 바빴어요.'],
          ['I met a girl [[빈칸]] wants to be a pilot.', true, 'she', '나는 비행기 조종사가 되고 싶어 하는 소녀를 만났어요.'],
          ['The children [[빈칸]] are playing in the park look happy.', true, 'they', '공원에서 놀고 있는 아이들은 행복해 보여요.'],
          ['Seojun is the student [[빈칸]] won the singing contest.', true, 'he', '서준이가 노래 대회에서 우승한 학생이에요.'],
          ['The man [[빈칸]] sells fruit here is my neighbor.', true, 'he', '여기서 과일을 파는 남자는 우리 이웃이에요.'],
          ['This is the bus [[빈칸]] goes to the museum.', false, 'it', '이것은 박물관으로 가는 버스예요.'],
          ['I bought a book [[빈칸]] has many pictures.', false, 'it', '나는 그림이 많은 책을 샀어요.'],
          ['The tree [[빈칸]] stands in front of the school is very old.', false, 'it', '학교 앞에 서 있는 나무는 아주 오래되었어요.'],
          ['She has a bike [[빈칸]] has a red basket.', false, 'it', '그녀에게는 빨간 바구니가 달린 자전거가 있어요.'],
          ['The shoes [[빈칸]] are under the bed are mine.', false, 'they', '침대 밑에 있는 신발은 내 것이에요.'],
          ['Look at the bird [[빈칸]] is singing in the tree.', false, 'it', '나무에서 노래하고 있는 새를 보세요.'],
          ['This is a machine [[빈칸]] makes ice cream.', false, 'it', '이것은 아이스크림을 만드는 기계예요.'],
          ['I like songs [[빈칸]] make me happy.', false, 'they', '나는 나를 행복하게 하는 노래를 좋아해요.'],
          ['The train [[빈칸]] leaves at nine is full.', false, 'it', '9시에 떠나는 기차는 꽉 찼어요.'],
          ['We visited a museum [[빈칸]] has old maps.', false, 'it', '우리는 옛날 지도가 있는 박물관에 갔어요.'],
          ['The movie [[빈칸]] won the prize was very sad.', false, 'it', '그 상을 받은 영화는 매우 슬펐어요.'],
          ['He found a box [[빈칸]] was full of old toys.', false, 'it', '그는 옛날 장난감으로 가득 찬 상자를 찾았어요.'],
        ];
        var it = R.pick(bank);
        var person = it[1];
        var correct = person ? 'who' : 'which';
        var other = person ? 'which' : 'who';
        var pron = it[2];
        var words = it[0].split(' [[')[0].split(' ');
        var ante = /^(a|an|the)$/i.test(words[words.length - 2]) ? words.slice(-2).join(' ') : words[words.length - 1];
        var reason = {};
        reason[other] = person
          ? 'which는 사물이나 동물을 꾸밀 때 써요. 선행사(' + ante + ')는 사람이에요.'
          : 'who는 사람을 꾸밀 때 써요. 선행사(' + ante + ')는 사물이나 동물이에요.';
        reason[pron] = '대명사(' + pron + ')는 두 문장을 이어 주지 못해요. 관계대명사를 써야 해요.';
        var pick = R.choices(correct, [other, pron], 3);
        return {
          type: 'choice', concept: 1,
          q: '빈칸에 알맞은 관계대명사를 고르세요.\n\n' + it[0] + '\n(' + it[3] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '선행사(' + ante + ')가 ' + (person ? '사람이라서 **who**' : '사물이나 동물이라서 **which**') + '를 써요(that도 돼요). 빈칸 바로 뒤에 동사가 오니 주격 관계대명사예요.\n\n' + it[0].replace('[[빈칸]]', '**' + correct + '**'),
        };
      },
    },
    {
      id: 'verb-agree',
      level: 2,
      title: '주격 관계대명사 뒤 동사의 수 일치',
      make: function (R) {
        // [선행사 앞부분, 선행사, 복수인가, 관계대명사, 나머지, 원형, 3인칭 단수형, -ing형, 우리말]
        var bank = [
          ['I have', 'a friend', false, 'who', 'in Jeju.', 'live', 'lives', 'living', '나에게는 제주에 사는 친구가 있어요.'],
          ['I have', 'two friends', true, 'who', 'in Jeju.', 'live', 'lives', 'living', '나에게는 제주에 사는 친구가 두 명 있어요.'],
          ['I know', 'a boy', false, 'who', 'three languages.', 'speak', 'speaks', 'speaking', '나는 3개 언어를 말하는 소년을 알아요.'],
          ['I know', 'some people', true, 'who', 'three languages.', 'speak', 'speaks', 'speaking', '나는 3개 언어를 말하는 사람들을 알아요.'],
          ['This is', 'the bus', false, 'which', 'to the zoo.', 'go', 'goes', 'going', '이것은 동물원으로 가는 버스예요.'],
          ['These are', 'the buses', true, 'which', 'to the zoo.', 'go', 'goes', 'going', '이것들은 동물원으로 가는 버스들이에요.'],
          ['She has', 'a dog', false, 'which', 'very fast.', 'run', 'runs', 'running', '그녀에게는 매우 빨리 달리는 개가 있어요.'],
          ['She has', 'two dogs', true, 'which', 'very fast.', 'run', 'runs', 'running', '그녀에게는 매우 빨리 달리는 개가 두 마리 있어요.'],
          ['We met', 'a girl', false, 'who', 'the violin well.', 'play', 'plays', 'playing', '우리는 바이올린을 잘 켜는 소녀를 만났어요.'],
          ['We met', 'the girls', true, 'who', 'the violin well.', 'play', 'plays', 'playing', '우리는 바이올린을 잘 켜는 소녀들을 만났어요.'],
          ['I want', 'a robot', false, 'that', 'the dishes.', 'wash', 'washes', 'washing', '나는 설거지를 하는 로봇을 원해요.'],
          ['They sell', 'robots', true, 'that', 'the dishes.', 'wash', 'washes', 'washing', '그들은 설거지를 하는 로봇들을 팔아요.'],
          ['He is', 'a teacher', false, 'who', 'science at our school.', 'teach', 'teaches', 'teaching', '그는 우리 학교에서 과학을 가르치는 선생님이에요.'],
          ['They are', 'the teachers', true, 'who', 'science at our school.', 'teach', 'teaches', 'teaching', '그분들은 우리 학교에서 과학을 가르치는 선생님들이에요.'],
          ['I read', 'a story', false, 'that', 'me laugh.', 'make', 'makes', 'making', '나는 나를 웃게 하는 이야기를 읽어요.'],
          ['I like', 'stories', true, 'that', 'me laugh.', 'make', 'makes', 'making', '나는 나를 웃게 하는 이야기들을 좋아해요.'],
          ['Look at', 'the baby', false, 'who', 'at everyone.', 'smile', 'smiles', 'smiling', '모두에게 웃어 주는 아기를 보세요.'],
          ['Look at', 'the babies', true, 'who', 'at everyone.', 'smile', 'smiles', 'smiling', '모두에게 웃어 주는 아기들을 보세요.'],
          ['There is', 'a shop', false, 'which', 'fresh bread.', 'sell', 'sells', 'selling', '신선한 빵을 파는 가게가 하나 있어요.'],
          ['There are', 'two shops', true, 'which', 'fresh bread.', 'sell', 'sells', 'selling', '신선한 빵을 파는 가게가 두 곳 있어요.'],
          ['Minsu has', 'an uncle', false, 'who', 'in a hospital.', 'work', 'works', 'working', '민수에게는 병원에서 일하는 삼촌이 있어요.'],
          ['Minsu has', 'two uncles', true, 'who', 'in a hospital.', 'work', 'works', 'working', '민수에게는 병원에서 일하는 삼촌이 두 분 있어요.'],
        ];
        var it = R.pick(bank);
        var plural = it[2];
        var base = it[5], s3 = it[6], ing = it[7];
        var correct = plural ? base : s3;
        var reason = {};
        reason[plural ? s3 : base] = plural
          ? '선행사(' + it[1] + ')는 복수예요. 복수에 맞는 현재형은 -s를 붙이지 않은 꼴이에요.'
          : '선행사(' + it[1] + ')는 단수예요. 단수에 맞는 현재형은 -s(-es)를 붙인 꼴이에요.';
        reason[ing] = '관계대명사 뒤에는 동사가 와야 해요. -ing 꼴만으로는 동사가 되지 못해요.';
        reason['to ' + base] = '관계대명사 뒤에는 동사가 와야 해요. to부정사는 동사 자리에 올 수 없어요.';
        var pick = R.choices(correct, [plural ? s3 : base, ing, 'to ' + base]);
        var sent = it[0] + ' ' + it[1] + ' ' + it[3] + ' [[빈칸]] ' + it[4];
        return {
          type: 'choice', concept: 1,
          q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + sent + '\n(' + it[8] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '관계대명사 뒤의 동사는 선행사에 맞춰요. 선행사 ' + it[1] + ' — ' + (plural ? '복수' : '단수') + ' → **' + correct + '**\n\n' + sent.replace('[[빈칸]]', '**' + correct + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'inventor', m: '발명가', ex: 'An inventor is a person who makes new things.', exm: '발명가는 새로운 것을 만드는 사람이에요.' },
    { w: 'invent', m: '발명하다', ex: 'She wants to invent a robot that cleans the house.', exm: '그녀는 집을 청소하는 로봇을 발명하고 싶어 해요.' },
    { w: 'invention', m: '발명품', ex: 'The light bulb was a great invention.', exm: '전구는 훌륭한 발명품이었어요.' },
    { w: 'respect', m: '존경하다', ex: 'He is a teacher whom all the students respect.', exm: '그는 모든 학생이 존경하는 선생님이에요.' },
    { w: 'create', m: '만들어 내다, 창조하다', ex: 'King Sejong created Hangeul.', exm: '세종대왕은 한글을 만들었어요.' },
    { w: 'character', m: '글자, 문자', ex: 'Chinese characters are hard to learn.', exm: '한자는 배우기 어려워요.' },
    { w: 'support', m: '지원하다, 돕다', ex: 'My parents support my dream.', exm: '부모님은 내 꿈을 지원해 주세요.' },
    { w: 'scientist', m: '과학자', ex: 'I want to be a scientist who studies the ocean.', exm: '나는 바다를 연구하는 과학자가 되고 싶어요.' },
    { w: 'useful', m: '쓸모 있는, 유용한', ex: 'This is a useful app that helps me study.', exm: '이것은 내 공부를 도와주는 유용한 앱이에요.' },
    { w: 'battery', m: '건전지, 배터리', ex: 'The battery lasts for ten hours.', exm: '그 배터리는 10시간 동안 가요.' },
    { w: 'last', m: '(얼마 동안) 계속되다, 가다', ex: 'The movie lasts for two hours.', exm: '그 영화는 두 시간 동안 해요.' },
    { w: 'neighbor', m: '이웃', ex: 'The man who lives next door is my neighbor.', exm: '옆집에 사는 남자는 우리 이웃이에요.' },
    { w: 'cousin', m: '사촌', ex: 'I have a cousin who lives in Canada.', exm: '나에게는 캐나다에 사는 사촌이 있어요.' },
    { w: 'introduce', m: '소개하다', ex: 'Let me introduce a friend who loves science.', exm: '과학을 좋아하는 친구를 소개할게요.' },
  ],
});
})();
