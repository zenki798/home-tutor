/* 5학년 영어 · 사람의 모습 묘사하기 */
Tutor.registerUnit({
  id: 'eng-e5-09',
  course: 'eng-e5',
  title: '사람의 모습 묘사하기',
  summary: 'What does she look like?로 생김새를 묻고, 외모와 성격을 나타내는 말로 사람을 소개해요.',
  goals: [
    'What does he(she) look like?로 생김새를 묻고 답할 수 있어요.',
    '외모를 말할 때 is와 has를 알맞게 골라 쓸 수 있어요.',
    '성격을 나타내는 낱말(kind, funny, brave, shy, smart)을 알고 쓸 수 있어요.',
    '사람을 소개하는 짧은 글을 읽고, 같은 꼴로 소개하는 글을 쓸 수 있어요.',
  ],
  standards: ['[6영02-04]', '[6영02-02]', '[6영01-04]'],

  concepts: [
    {
      title: '생김새 묻기: What does he look like?',
      body: '어떤 사람의 **생김새(외모)**가 궁금할 때는 이렇게 물어요.\n\n- **What does he look like?** — 그는 어떻게 생겼어요?\n- **What does she look like?** — 그녀는 어떻게 생겼어요?\n- **What does your sister look like?** — 너희 언니(누나)는 어떻게 생겼어?\n\n**look like** 는 "~처럼 보이다"라는 뜻이에요. 그래서 "무엇처럼 보여요?", 곧 "어떻게 생겼어요?"가 돼요.\n\n대답은 생김새를 말하는 문장으로 해요.\n\n- **He is tall.** 그는 키가 커요.\n- **She has long hair.** 그녀는 머리가 길어요.\n\n> ⚠️ **What does she like?** 는 "그녀는 무엇을 좋아해요?"라는 전혀 다른 질문이에요. **look** 이 있는지 꼭 확인하세요.',
      easy: '친구가 "우리 형 데리러 가 줄래?" 하고 부탁했다고 생각해 보세요. 형을 한 번도 본 적이 없다면 "형이 어떻게 생겼는데?" 하고 묻겠지요.\n\n영어로는 **What does your brother look like?** 라고 물어요. look(보다)과 like(~처럼)가 붙어서 "어떻게 보이니?"가 되는 거예요.\n\n그러면 친구가 "키가 크고 안경을 썼어." 하고 알려 주겠지요. 그 대답을 영어로 하는 방법을 다음 카드에서 배워요.',
      check: {
        type: 'choice',
        q: '"그는 어떻게 생겼어요?"를 영어로 바르게 쓴 것은 무엇일까요?',
        choices: ['What does he look like?', 'What does he like?', 'Where does he live?'],
        answer: 0,
        why: [
          '',
          'look 이 빠졌어요. What does he like? 는 "그는 무엇을 좋아해요?"라는 뜻이에요.',
          '사는 곳을 묻는 말이에요. 생김새는 look like 로 물어요.',
        ],
        explain: '생김새는 **What does he look like?** 로 물어요. look like 가 함께 있어야 "어떻게 생겼어요?"라는 뜻이 돼요.',
      },
    },
    {
      title: '키와 몸: He is tall.',
      body: '키나 몸집처럼 **그 사람 자체가 어떤지**를 말할 때는 **is** 뒤에 꾸며 주는 말을 써요.\n\n| 영어 | 뜻 |\n|---|---|\n| He is **tall**. | 그는 키가 커요. |\n| She is **short**. | 그녀는 키가 작아요. |\n| My dad is **strong**. | 우리 아빠는 힘이 세요. |\n\n"키가 크다"는 **tall** 이고, 키가 작다는 **short** 예요.\n\n> 💡 두 가지를 함께 말할 때는 and 로 이어요. **She is tall and strong.** (그녀는 키가 크고 힘이 세요.)\n\n> ⚠️ 키가 큰 사람에게 big 을 쓰면 "덩치가 크다"는 느낌이 돼요. 키는 **tall** 로 말해요.',
      easy: '"그 사람은 ○○해요."라고 말하는 문장이에요. 우리말 "~해요" 자리에 **is** 가 들어간다고 생각하면 쉬워요.\n\n- 그는 / 키가 커요 → He / **is tall**.\n- 그녀는 / 키가 작아요 → She / **is short**.\n\nis 다음에 그 사람이 어떤지 나타내는 낱말 하나를 붙이면 끝이에요.',
      check: {
        type: 'choice',
        q: '"그녀는 키가 커요."를 영어로 바르게 쓴 것은 무엇일까요?',
        choices: ['She is tall.', 'She is short.', 'She has tall.'],
        answer: 0,
        why: [
          '',
          'short 는 "키가 작은"이라는 뜻이에요. 키가 큰 것은 tall 이에요.',
          '키는 그 사람 자체가 어떤지를 말하므로 has 가 아니라 is 를 써요.',
        ],
        explain: '키가 큰 것은 **tall**, 그 사람 자체가 어떤지는 **is** 로 말하므로 **She is tall.** 이에요.',
      },
    },
    {
      title: '머리 모양과 안경: She has long hair.',
      body: '머리카락이나 눈처럼 **그 사람이 가진 것**을 말할 때는 **has**(가지고 있다)를 써요. he, she, 내 친구처럼 한 사람을 말할 때는 have 가 아니라 **has** 예요.\n\n| 영어 | 뜻 |\n|---|---|\n| She has **long hair**. | 그녀는 머리가 길어요. |\n| He has **short hair**. | 그는 머리가 짧아요. |\n| She has **curly hair**. | 그녀는 곱슬머리예요. |\n| He has **straight hair**. | 그는 생머리(곧은 머리)예요. |\n| She has **big eyes**. | 그녀는 눈이 커요. |\n\n안경을 썼다는 말은 **He wears glasses.** 라고 해요. 안경알이 두 개라서 **glasses** 처럼 끝에 es 가 붙어요.\n\n> 💡 같은 short 라도 **He is short.** 는 "키가 작다", **He has short hair.** 는 "머리가 짧다"예요. 뒤에 hair 가 있는지 보세요.',
      easy: '우리말로 바꿔 보면 차이가 잘 보여요.\n\n- 그는 키가 커요. → 그 사람이 **어떤지** → **is** tall\n- 그는 긴 머리를 **가지고 있어요**. → 그 사람이 **가진 것** → **has** long hair\n\n"가지고 있어요"라고 바꿔 말할 수 있으면 has, 그렇지 않으면 is 라고 기억하세요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nShe [[blank]] curly hair.',
        choices: ['has', 'is', 'have'],
        answer: 0,
        why: [
          '',
          'curly hair 는 그녀가 가진 것이에요. 가진 것을 말할 때는 has 를 써요.',
          'she 처럼 한 사람을 말할 때는 have 가 아니라 has 를 써요.',
        ],
        explain: '곱슬머리(curly hair)는 그녀가 가진 것이므로 **has** 를 써요. 주어가 she 이니 have 가 아니라 has 예요.',
      },
    },
    {
      title: '성격을 나타내는 말',
      body: '생김새가 아니라 **마음씨나 성격**을 말할 때도 **is** 를 써요.\n\n| 영어 | 뜻 | 이런 사람이에요 |\n|---|---|---|\n| **kind** | 친절한 | 친구를 잘 도와줘요. |\n| **funny** | 재미있는, 웃기는 | 친구들을 잘 웃게 해요. |\n| **brave** | 용감한 | 무서워도 겁내지 않고 나서요. |\n| **shy** | 수줍음을 타는 | 처음 만난 사람 앞에서 말을 잘 못 해요. |\n| **smart** | 똑똑한 | 어려운 문제도 잘 풀어요. |\n\n- **My brother is funny.** 우리 형은 재미있어요.\n- **She is kind and smart.** 그녀는 친절하고 똑똑해요.\n\n> 💡 외모(tall, long hair)는 눈으로 보이는 것, 성격(kind, brave)은 행동을 보고 알 수 있는 것이에요.',
      easy: '친구를 떠올려 보세요. "키가 커", "머리가 길어"는 눈으로 보고 말할 수 있지요. 그런데 "착해", "웃겨"는 함께 지내 봐야 알 수 있어요.\n\n이렇게 함께 지내 보고 아는 것이 **성격**이에요. 영어로도 똑같이 **She is kind.** 처럼 is 뒤에 성격 낱말을 붙여요.\n\n- 잘 도와줘요 → kind\n- 잘 웃겨요 → funny\n- 겁이 없어요 → brave\n- 수줍어해요 → shy\n- 똑똑해요 → smart',
      check: {
        type: 'ox',
        q: 'brave 는 "수줍음을 타는"이라는 뜻이에요.',
        answer: false,
        explain: 'brave 는 "용감한"이에요. "수줍음을 타는"은 **shy** 예요.',
      },
    },
    {
      title: '사람을 소개하는 글',
      body: '사람을 소개하는 글은 보통 이런 순서로 써요.\n\n1. 누구인지: **This is my friend, Mina.**\n2. 생김새: **She is tall. She has short hair.**\n3. 성격: **She is kind and funny.**\n4. 좋아하는 것이나 하고 싶은 말: **She likes dogs. I like her very much.**\n\n남자는 **He**, 여자는 **She** 로 받아요. 처음에 이름을 말한 뒤에는 같은 사람을 He 나 She 로 가리켜요.\n\n> 💡 글을 읽을 때는 **is 뒤**와 **has 뒤**를 보면 생김새를, kind·funny 같은 낱말을 보면 성격을 빨리 찾을 수 있어요.',
      easy: '친구를 소개하는 글은 사진을 보여 주며 말하는 것과 같아요.\n\n"이 사람은 내 친구 민아야. → 키가 크고 머리가 짧아. → 친절하고 재미있어. → 강아지를 좋아해."\n\n이 순서를 그대로 영어로 바꾸면 소개하는 글이 돼요. 두 번째 문장부터는 Mina 대신 **She** 라고 쓰면 돼요.',
      check: {
        type: 'choice',
        q: '다음 글에서 성격을 말한 문장은 무엇일까요?\n\nThis is my brother, Junho. He is tall. He has curly hair. He is brave.',
        choices: ['He is brave.', 'He is tall.', 'He has curly hair.'],
        answer: 0,
        why: [
          '',
          'tall 은 키, 곧 눈에 보이는 생김새예요.',
          'curly hair 는 머리 모양, 곧 생김새예요.',
        ],
        explain: '**brave**(용감한)는 성격을 나타내는 말이에요. tall 과 curly hair 는 생김새예요.',
      },
    },
  ],

  examples: [
    {
      q: '글을 읽고 물음에 답하세요.\n\nThis is my aunt. She is tall. She has long straight hair. She wears glasses. She is smart and kind.\n\nWhat does she look like? 에 대한 대답을 글에서 모두 찾아보세요.',
      steps: [
        '질문 What does she look like? 는 생김새를 묻는 말이에요. 그래서 생김새 문장만 찾아요.',
        '**She is tall.** — 키가 크다는 생김새예요.',
        '**She has long straight hair.** — 길고 곧은 머리, 생김새예요.',
        '**She wears glasses.** — 안경을 썼다는 것도 눈에 보이는 생김새예요.',
        '**She is smart and kind.** 는 성격이라서 생김새 질문의 대답이 아니에요.',
      ],
      answer: 'She is tall. She has long straight hair. She wears glasses.',
    },
    {
      q: '우리말에 맞게 영어 문장을 만들어 보세요.\n\n"우리 아빠는 키가 작고 머리가 짧아요. 아빠는 재미있어요."',
      steps: [
        '"우리 아빠는 키가 작아요"는 아빠 자체가 어떤지이므로 is 를 써요: **My dad is short.**',
        '"머리가 짧아요"는 아빠가 가진 머리 이야기이므로 has 를 써요: **He has short hair.**',
        '"재미있어요"는 성격이에요. 성격도 is 로 말해요: **He is funny.**',
      ],
      answer: 'My dad is short. He has short hair. He is funny.',
    },
  ],

  terms: [
    { term: '외모', def: '눈으로 볼 수 있는 사람의 생김새예요. 예: 키(tall, short), 머리 모양(long hair, curly hair), 안경(glasses)' },
    { term: '성격', def: '그 사람의 마음씨나 행동하는 모습이에요. 예: kind(친절한), funny(재미있는), brave(용감한), shy(수줍음을 타는), smart(똑똑한)' },
    { term: 'look like', def: '"~처럼 보이다"라는 뜻이에요. What does he look like? 는 "그는 어떻게 생겼어요?"라는 질문이에요.' },
    { term: 'is 와 has', def: '그 사람 자체가 어떤지(키, 성격)는 is, 그 사람이 가진 것(머리, 눈)은 has 로 말해요. 예: He is tall. He has short hair.' },
    { term: '꾸며 주는 말', def: 'tall, kind 처럼 사람이나 물건이 어떤지 나타내는 낱말이에요. long hair 처럼 낱말 앞에 붙기도 하고, She is tall. 처럼 is 뒤에 오기도 해요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '친구의 생김새를 묻는 말로 알맞은 것은 무엇일까요?',
      choices: ['What does she look like?', 'What does she like?', 'Where is she?', 'How old is she?'],
      answer: 0,
      why: [
        '',
        '좋아하는 것을 묻는 말이에요. 생김새는 look like 로 물어요.',
        '있는 곳을 묻는 말이에요.',
        '나이를 묻는 말이에요.',
      ],
      explain: '생김새는 **What does she look like?** 로 물어요. What does she like? 는 좋아하는 것을 묻는 말이라 헷갈리기 쉬워요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
      q: '우리말에 맞게 빈칸에 알맞은 낱말을 쓰세요.\n\n그는 키가 커요. → He is [[blank]].',
      answer: ['tall'],
      wrong: [
        { a: 'short', why: 'short 는 "키가 작은"이에요. 키가 큰 것은 tall 이에요.' },
        { a: 'big', why: 'big 은 "덩치가 큰"이라는 느낌이에요. 키가 큰 것은 tall 이에요.' },
      ],
      explain: '키가 큰 것은 **tall** 이에요. He is tall.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nMy brother [[blank]] short hair.',
      choices: ['has', 'is', 'have', 'are'],
      answer: 0,
      why: [
        '',
        'short hair 는 형이 가진 것이에요. 가진 것은 has 로 말해요.',
        'my brother 는 한 사람이라서 have 가 아니라 has 를 써요.',
        'are 는 여러 사람이나 you 와 함께 쓰는 말이에요. 머리 모양은 has 로 말해요.',
      ],
      explain: '머리 모양은 그 사람이 가진 것이라서 **has** 를 써요. my brother 는 한 사람이니 have 가 아니라 has 예요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 3,
      q: 'shy 는 성격을 나타내는 말이에요.',
      answer: true,
      explain: 'shy(수줍음을 타는)는 성격을 나타내는 말이에요. 눈으로 보이는 생김새가 아니라 행동을 보고 알 수 있어요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '"용감한"이라는 뜻의 낱말은 무엇일까요?',
      choices: ['brave', 'funny', 'smart', 'shy'],
      answer: 0,
      why: [
        '',
        'funny 는 "재미있는"이에요.',
        'smart 는 "똑똑한"이에요.',
        'shy 는 "수줍음을 타는"이에요.',
      ],
      explain: '"용감한"은 **brave** 예요. funny 는 "재미있는", smart 는 "똑똑한", shy 는 "수줍음을 타는"이라는 뜻이에요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 2,
      q: '우리말에 맞게 빈칸에 알맞은 낱말을 쓰세요.\n\n그녀는 안경을 썼어요. → She wears [[blank]].',
      answer: ['glasses'],
      wrong: [{ a: 'glass', why: '안경은 알이 두 개라서 끝에 es 를 붙여 glasses 라고 써요. glass 는 "유리, 유리컵"이에요.' }],
      explain: '안경은 **glasses** 예요. 안경알이 두 개라서 끝에 es 가 붙어요.',
    },
    {
      id: 'p7', level: 2, type: 'order', concept: 0,
      q: '낱말을 바르게 늘어놓아 "그는 어떻게 생겼어요?"라는 질문을 만드세요.',
      choices: ['What', 'does', 'he', 'look', 'like?'],
      answer: [0, 1, 2, 3, 4],
      hint: '의문문은 What 으로 시작하고, does 가 he 앞에 와요.',
      explain: '**What does he look like?** — What 다음에 does, 그다음에 묻는 사람(he), 마지막에 look like 를 써요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 0,
      q: '대화의 빈칸에 들어갈 말로 알맞은 것은 무엇일까요?\n\nA: What does your sister look like?\nB: [[blank]]',
      choices: ['She has long curly hair.', 'She likes cats.', 'She is ten years old.', 'Yes, she does.'],
      answer: 0,
      why: [
        '',
        '좋아하는 것을 말했어요. 질문은 생김새를 묻고 있어요.',
        '나이를 말했어요. 질문은 생김새를 묻고 있어요.',
        'What 으로 묻는 질문에는 Yes 나 No 로 답하지 않아요.',
      ],
      hint: 'look like 는 무엇을 묻는 말인지 떠올려 보세요.',
      explain: 'What does your sister look like? 는 생김새를 묻는 말이에요. 그래서 머리 모양을 말한 **She has long curly hair.** 가 알맞아요.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 3,
      q: '낱말을 바르게 늘어놓아 "우리 언니는 친절하고 재미있어요."를 만드세요.',
      choices: ['My sister', 'is', 'kind', 'and', 'funny.'],
      answer: [0, 1, 2, 3, 4],
      hint: '누가(My sister) → 어때요(is) → 성격 두 가지를 and 로 이어요.',
      explain: '**My sister is kind and funny.** — 성격 두 가지를 말할 때는 and 로 이어요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '글을 읽고, 빈칸에 들어갈 낱말로 가장 알맞은 것을 고르세요.\n\nJiho always helps his friends. He shares his snacks, too. He is very [[blank]].',
      choices: ['kind', 'shy', 'tall', 'brave'],
      answer: 0,
      why: [
        '',
        'shy 는 수줍음을 탄다는 뜻이에요. 친구를 돕고 간식을 나누는 모습과 맞지 않아요.',
        'tall 은 키가 크다는 생김새예요. 글은 행동, 곧 성격을 말하고 있어요.',
        'brave 는 겁내지 않고 나서는 모습이에요. 돕고 나누는 모습에는 kind 가 더 알맞아요.',
      ],
      hint: '지호가 한 행동(돕기, 나누기)을 보고 어떤 성격인지 생각해 보세요.',
      explain: '친구를 돕고(helps) 간식을 나누는(shares) 사람은 **kind**(친절한) 사람이에요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '글을 읽고 물음에 답하세요.\n\nThis is my friend, Sujin. She is short. She has long straight hair. She is smart. She likes books.\n\n수진이에 대해 **알 수 없는** 것은 무엇일까요?',
      choices: ['수진이가 안경을 썼는지', '수진이의 키', '수진이의 머리 모양', '수진이가 좋아하는 것'],
      answer: 0,
      why: [
        '',
        'She is short. 에서 키가 작다는 것을 알 수 있어요.',
        'She has long straight hair. 에서 길고 곧은 머리라는 것을 알 수 있어요.',
        'She likes books. 에서 책을 좋아한다는 것을 알 수 있어요.',
      ],
      explain: '글에 glasses 라는 말이 없으니 안경을 썼는지는 알 수 없어요. 키(short), 머리 모양(long straight hair), 성격(smart), 좋아하는 것(books)은 글에 나와요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 4,
      q: '표를 보고, 글이 소개하는 사람을 고르세요.\n\n| 이름 | 키 | 머리 | 안경 |\n|---|---|---|---|\n| Minho | tall | short curly | 씀 |\n| Seojun | tall | short straight | 안 씀 |\n| Doyun | short | short curly | 씀 |\n| Hajun | tall | long straight | 씀 |\n\nMy friend is tall. He has short hair. His hair is curly. He wears glasses.',
      choices: ['Minho', 'Seojun', 'Doyun', 'Hajun'],
      answer: 0,
      why: [
        '',
        '서준이는 머리가 곧고(straight) 안경을 쓰지 않아요.',
        '도윤이는 키가 작아요(short). 글의 친구는 tall 이에요.',
        '하준이는 머리가 길어요(long). 글의 친구는 short hair 예요.',
      ],
      hint: '조건을 하나씩 확인하며 맞지 않는 사람을 지워 보세요: tall → short hair → curly → glasses.',
      explain: '키가 크고(tall), 머리가 짧고(short hair), 곱슬머리(curly)이며, 안경을 쓴(wears glasses) 사람은 **Minho** 예요. 도윤이는 키가 작고, 서준이는 곧은 머리에 안경을 안 쓰고, 하준이는 머리가 길어요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '빈칸 두 곳에 들어갈 말을 차례대로 짝지은 것은 무엇일까요?\n\nMy mom [[blank]] tall. She [[blank]] big eyes.',
      choices: ['is - has', 'has - is', 'is - is', 'has - has'],
      fixed: true,
      answer: 0,
      why: [
        '',
        '거꾸로 골랐어요. 키(tall)는 is, 눈(big eyes)은 가진 것이라 has 예요.',
        '눈(big eyes)은 엄마가 가진 것이므로 두 번째 빈칸은 has 예요.',
        '키(tall)는 엄마 자체가 어떤지이므로 첫 번째 빈칸은 is 예요.',
      ],
      hint: '"가지고 있어요"로 바꿔 말할 수 있는지 하나씩 생각해 보세요.',
      explain: '키가 큰 것은 엄마 자체가 어떤지이므로 **is** tall, 큰 눈은 엄마가 가진 것이므로 **has** big eyes 예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'text', concept: 2,
      q: '글을 읽고, 빈칸에 알맞은 낱말을 한 낱말로 쓰세요.\n\nMy cousin has long hair. Her hair is not straight. It is [[blank]].',
      answer: ['curly', 'wavy'],
      wrong: [
        { a: 'straight', why: '글에서 "곧지 않다(not straight)"고 했어요. 곧은 머리의 반대를 써요.' },
        { a: 'long', why: '머리가 긴 것은 이미 나왔어요. 곧지 않은 머리 모양을 나타내는 말을 써요.' },
      ],
      hint: 'not straight(곧지 않은) 머리는 어떤 머리일까요?',
      explain: '곧지 않은 머리는 곱슬머리, **curly** 예요. (물결 모양 머리를 뜻하는 wavy 도 정답이에요.)',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '다음은 하윤이가 쓴 소개 글이에요. 바르지 **않은** 문장은 무엇일까요?\n\n(가) This is my brother, Siwoo.\n(나) He is tall.\n(다) He is short curly hair.\n(라) He is funny.',
      choices: ['(가)', '(나)', '(다)', '(라)'],
      fixed: true,
      answer: 2,
      why: [
        '누구인지 소개하는 바른 문장이에요.',
        '키는 is 로 말하니 바른 문장이에요.',
        '',
        '성격은 is 로 말하니 바른 문장이에요.',
      ],
      hint: '머리 모양은 그 사람이 가진 것이에요.',
      explain: '머리 모양은 시우가 가진 것이므로 is 가 아니라 has 를 써야 해요. 바르게 고치면 **He has short curly hair.** 예요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 3,
      q: '글을 읽고, 수아의 성격으로 가장 알맞은 것을 고르세요.\n\nSua is a new student. She does not talk much in class. Her face turns red when she speaks to new friends.',
      choices: ['shy', 'funny', 'brave', 'tall'],
      answer: 0,
      why: [
        '',
        'funny 는 친구들을 잘 웃기는 사람이에요. 수아는 말을 별로 하지 않아요.',
        'brave 는 겁 없이 나서는 사람이에요. 수아는 새 친구 앞에서 얼굴이 빨개져요.',
        'tall 은 생김새예요. 문제는 성격을 묻고 있어요.',
      ],
      hint: '말을 많이 하지 않고, 새 친구와 말할 때 얼굴이 빨개지는 사람은 어떤 성격일까요?',
      explain: '수업 시간에 말을 많이 하지 않고(does not talk much), 새 친구와 말할 때 얼굴이 빨개지는(turns red) 모습은 **shy**(수줍음을 타는)에 가장 알맞아요.',
    },
  ],

  deeper: [
    {
      title: '사람을 묘사할 때의 예절',
      body: '영어에도 생김새를 말하는 낱말이 아주 많아요. 그런데 어떤 말은 듣는 사람의 기분을 상하게 할 수 있어요. 예를 들어 몸무게나 얼굴을 놀리는 말은 영어로 해도 우리말로 해도 실례예요.\n\n그래서 영어권 사람들은 사람을 소개할 때 키, 머리 모양, 옷, 안경처럼 **누가 들어도 기분 나쁘지 않은 것**을 주로 말해요. 그리고 kind, funny, smart 처럼 **좋은 성격**을 함께 말해 주지요.\n\n친구를 소개하는 글을 쓸 때도 "이 글을 친구가 읽으면 기분이 어떨까?"를 한 번 생각해 보세요.',
    },
    {
      title: 'look like 의 또 다른 쓰임: 닮았어요',
      body: 'look like 뒤에 사람을 쓰면 "~와 닮았다"라는 뜻이 돼요.\n\n- **You look like your mom.** 너는 엄마를 닮았구나.\n- **He looks like his dad.** 그는 아빠를 닮았어요.\n\n두 번째 문장에서 look 이 아니라 **looks** 인 것도 눈여겨보세요. he, she 처럼 한 사람이 주어이면 동사 끝에 s 가 붙어요(has, wears, likes 와 같아요). 그래서 질문에서는 does 가 앞에 나오고, 대답에서는 동사에 s 가 붙는 거예요.',
    },
  ],

  faq: [
    {
      q: 'What does she look like? 랑 What does she like? 는 뭐가 달라요?',
      a: 'look 하나 차이인데 뜻이 완전히 달라요. **What does she look like?** 는 "그녀는 어떻게 생겼어요?"(생김새), **What does she like?** 는 "그녀는 무엇을 좋아해요?"(좋아하는 것)예요. 대답도 She is tall. 과 She likes dogs. 처럼 달라져요.',
    },
    {
      q: '언제 is 를 쓰고 언제 has 를 써요?',
      a: '그 사람 자체가 어떤지(키, 성격)는 **is**: She is tall. She is kind.\n\n그 사람이 가진 것(머리, 눈)은 **has**: She has long hair. She has big eyes.\n\n헷갈리면 우리말 "가지고 있어요"를 붙여 보세요. "긴 머리를 가지고 있어요"는 자연스러우니 has, "키 큼을 가지고 있어요"는 어색하니 is 예요.',
    },
    {
      q: 'long hair 앞에는 왜 a 를 안 붙여요?',
      a: '머리 전체를 말하는 hair 는 하나, 둘 세지 않는 낱말이에요. 그래서 a 를 붙이지 않고 hairs 라고도 하지 않아요. **She has long hair.** 가 바른 문장이에요. 반면 big eyes 의 eye 는 하나, 둘 셀 수 있어서 눈 두 개를 말할 때 eyes 라고 써요.',
    },
    {
      q: '안경을 썼다는 말은 어떻게 해요?',
      a: '**He wears glasses.** 라고 해요. wear 는 옷·모자·안경처럼 몸에 걸치는 것에 쓰는 말이에요. 안경은 알이 두 개라서 항상 **glasses** 처럼 끝에 es 를 붙여요.',
    },
  ],

  mistakes: [
    '머리 모양에 is 를 쓰는 실수 — She is long hair.(X) → She has long hair.(O) 머리는 그 사람이 가진 것이라 has 예요.',
    'he·she 다음에 have 를 쓰는 실수 — He have short hair.(X) → He has short hair.(O)',
    'What does she look like? 에서 look 을 빠뜨리는 실수 — What does she like? 는 좋아하는 것을 묻는 다른 질문이 돼요.',
  ],

  gens: [
    {
      id: 'is-or-has',
      level: 1,
      title: '외모·성격 문장에 is 와 has 고르기',
      make: function (R) {
        var who = R.pick([
          ['He', '그는'], ['She', '그녀는'], ['My brother', '우리 형은'], ['My sister', '우리 언니는'],
          ['My dad', '우리 아빠는'], ['My mom', '우리 엄마는'], ['My friend', '내 친구는'],
        ]);
        var feat = R.bool() ? R.pick([
          ['is', 'tall', '키가 커요', '키'], ['is', 'short', '키가 작아요', '키'], ['is', 'strong', '힘이 세요', '몸'],
          ['is', 'kind', '친절해요', '성격'], ['is', 'funny', '재미있어요', '성격'], ['is', 'brave', '용감해요', '성격'],
          ['is', 'shy', '수줍음을 타요', '성격'], ['is', 'smart', '똑똑해요', '성격'],
        ]) : R.pick([
          ['has', 'long hair', '머리가 길어요', '머리'], ['has', 'short hair', '머리가 짧아요', '머리'],
          ['has', 'curly hair', '곱슬머리예요', '머리'], ['has', 'straight hair', '생머리예요', '머리'],
          ['has', 'big eyes', '눈이 커요', '눈'], ['has', 'long straight hair', '머리가 길고 곧아요', '머리'],
          ['has', 'short curly hair', '머리가 짧고 곱슬곱슬해요', '머리'],
        ]);
        var ans = feat[0];
        var choices = ['is', 'has', 'have', 'are'];
        var why;
        if (ans === 'is') {
          why = ['', feat[3] + '처럼 그 사람 자체가 어떤지는 has 가 아니라 is 로 말해요.',
            'have 는 가진 것을 말할 때 쓰고, 한 사람이 주어면 has 예요. 여기는 is 자리예요.',
            'are 는 여러 사람이나 you 와 함께 써요. 한 사람이면 is 예요.'];
        } else {
          why = [feat[3] + R.josa(feat[3], '은/는') + ' 그 사람이 가진 것이에요. 가진 것은 is 가 아니라 has 로 말해요.', '',
            '한 사람(' + who[0] + ')이 주어일 때는 have 가 아니라 has 를 써요.',
            'are 는 여러 사람이나 you 와 함께 써요. 가진 것을 말하니 has 예요.'];
        }
        return {
          type: 'choice', concept: ans === 'is' ? (feat[3] === '성격' ? 3 : 1) : 2,
          q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + who[1] + ' ' + feat[2] + '.\n\n' + who[0] + ' [[blank]] ' + feat[1] + '.',
          choices: choices,
          answer: ans === 'is' ? 0 : 1,
          fixed: true,
          why: why,
          explain: (ans === 'is'
            ? feat[3] + R.josa(feat[3], '은/는') + ' 그 사람 자체가 어떤지를 말하므로 **is** 를 써요.'
            : feat[3] + R.josa(feat[3], '은/는') + ' 그 사람이 가진 것이므로 **has** 를 써요. 한 사람이 주어라서 have 가 아니라 has 예요.') +
            ' → **' + who[0] + ' ' + ans + ' ' + feat[1] + '.**',
        };
      },
    },
  ],

  vocab: [
    { w: 'look like', m: '~처럼 보이다, ~하게 생기다', ex: 'What does your teacher look like?', exm: '너희 선생님은 어떻게 생기셨니?' },
    { w: 'tall', m: '키가 큰', ex: 'My uncle is very tall.', exm: '우리 삼촌은 키가 아주 커요.' },
    { w: 'short', m: '키가 작은, 짧은', ex: 'She has short hair.', exm: '그녀는 머리가 짧아요.' },
    { w: 'long', m: '긴', ex: 'My sister has long hair.', exm: '우리 언니는 머리가 길어요.' },
    { w: 'hair', m: '머리카락', ex: 'His hair is brown.', exm: '그의 머리카락은 갈색이에요.' },
    { w: 'curly', m: '곱슬곱슬한', ex: 'The baby has curly hair.', exm: '그 아기는 곱슬머리예요.' },
    { w: 'straight', m: '곧은, 곧게 뻗은', ex: 'Mina has long straight hair.', exm: '미나는 길고 곧은 머리예요.' },
    { w: 'glasses', m: '안경', ex: 'My grandpa wears glasses.', exm: '우리 할아버지는 안경을 쓰세요.' },
    { w: 'eye', m: '눈', ex: 'The cat has big green eyes.', exm: '그 고양이는 크고 초록색인 눈을 가졌어요.' },
    { w: 'strong', m: '힘이 센', ex: 'My dad is strong.', exm: '우리 아빠는 힘이 세요.' },
    { w: 'kind', m: '친절한', ex: 'Our teacher is kind to everyone.', exm: '우리 선생님은 모두에게 친절하세요.' },
    { w: 'funny', m: '재미있는, 웃기는', ex: 'Seojun tells funny stories.', exm: '서준이는 재미있는 이야기를 해요.' },
    { w: 'brave', m: '용감한', ex: 'The brave girl helped the lost puppy.', exm: '그 용감한 소녀는 길 잃은 강아지를 도왔어요.' },
    { w: 'shy', m: '수줍음을 타는', ex: 'I am shy with new friends.', exm: '나는 새 친구 앞에서 수줍음을 타요.' },
    { w: 'smart', m: '똑똑한', ex: 'Dolphins are smart animals.', exm: '돌고래는 똑똑한 동물이에요.' },
    { w: 'wear', m: '(옷·안경 등을) 입다, 쓰다', ex: 'I wear a cap in summer.', exm: '나는 여름에 모자를 써요.' },
  ],
});
