/* 5학년 영어 · 좋아하는 것과 이유 말하기 */
Tutor.registerUnit({
  id: 'eng-e5-05',
  course: 'eng-e5',
  title: '좋아하는 것과 이유 말하기',
  summary: "What's your favorite ~?으로 가장 좋아하는 과목을 묻고, 좋아하는 계절과 그 이유를 because로 말해요.",
  goals: [
    "What's your favorite subject?로 가장 좋아하는 과목을 묻고 답할 수 있어요.",
    '과목과 계절을 나타내는 낱말을 읽고 쓸 수 있어요.',
    'Why do you like it?에 Because ~.로 이유를 말할 수 있어요.',
    'Which do you like better, A or B?로 둘 중에서 더 좋아하는 것을 묻고 답할 수 있어요.',
  ],
  standards: ['[6영02-06]', '[6영02-07]', '[6영01-03]'],

  concepts: [
    {
      title: '가장 좋아하는 것 묻고 답하기',
      body: "**favorite**은 '가장 좋아하는'이라는 뜻이에요. 친구가 가장 좋아하는 것을 물을 때는 이렇게 말해요.\n\n- **What's your favorite subject?** 네가 가장 좋아하는 과목은 뭐니?\n- **My favorite subject is music.** 내가 가장 좋아하는 과목은 음악이야.\n\nWhat's는 What is를 줄인 말이에요. subject 자리에 다른 낱말을 넣으면 무엇이든 물을 수 있어요: What's your favorite **color**? / What's your favorite **food**?\n\n> 💡 대답할 때는 My favorite ~ is 뒤에 좋아하는 것을 넣어요. 짧게 **Music.** 이라고만 말해도 돼요.",
      easy: "친구에게 \"제일 좋아하는 거 뭐야?\" 하고 묻는 말이에요.\n\n질문: What's your favorite **subject**?\n대답: My favorite **subject** is **art**.\n\n질문과 대답에 같은 낱말(subject)이 들어가요. 질문의 낱말을 그대로 따라 쓰고, 맨 끝에 내가 좋아하는 것만 바꿔 넣으면 돼요.",
      check: {
        type: 'choice',
        q: "**What's your favorite subject?**에 알맞은 대답은 무엇일까요?",
        choices: ['My favorite subject is art.', "I'm fine, thank you.", 'Yes, it is.'],
        answer: 0,
        why: ['', '기분을 물을 때(How are you?) 하는 대답이에요.', 'Yes/No로 답하는 질문이 아니에요. What으로 물으면 무엇인지 말해요.'],
        explain: 'What으로 "무엇이니?" 하고 물었으니 가장 좋아하는 과목을 말해요. My favorite subject is art.(가장 좋아하는 과목은 미술이야.)',
      },
    },
    {
      title: '과목을 나타내는 낱말',
      body: "학교에서 배우는 **과목(subject)** 이름을 영어로 알아봐요.\n\n| 영어 | 뜻 |\n|---|---|\n| Korean | 국어 |\n| math | 수학 |\n| science | 과학 |\n| social studies | 사회 |\n| music | 음악 |\n| art | 미술 |\n| P.E. | 체육 |\n\n**Korean**은 '한국어'라는 말이라서 문장 가운데에 와도 항상 첫 글자를 대문자로 써요. **P.E.**는 physical education(체육)을 줄인 말이에요. **social studies**는 두 낱말이 한 과목 이름이고, 끝에 s가 붙어요.\n\n> ⚠️ social study라고 쓰지 않아요. studies까지 써야 사회 과목이에요.",
      easy: "시간표를 떠올려 보세요. 국어 시간은 Korean, 수학 시간은 math, 과학 시간은 science예요.\n\n노래를 부르는 음악 시간은 music, 그림을 그리는 미술 시간은 art, 운동장에서 뛰는 체육 시간은 P.E.예요. 사회 시간은 조금 길게 social studies라고 해요.",
      check: {
        type: 'choice',
        q: "'사회' 과목을 영어로 바르게 쓴 것은 무엇일까요?",
        choices: ['social studies', 'social study', 'science'],
        answer: 0,
        why: ['', '사회 과목 이름은 studies로 끝나요.', 'science는 과학이에요.'],
        explain: '사회 과목은 social studies예요. 두 낱말이 한 과목 이름이고, 끝이 studies예요.',
      },
    },
    {
      title: '좋아하는 계절 말하기',
      body: "**계절(season)**은 네 개예요: **spring**(봄), **summer**(여름), **fall**(가을), **winter**(겨울).\n\n좋아하는 계절은 이렇게 묻고 답해요.\n\n- **What season do you like?** 너는 어떤 계절을 좋아하니?\n- **I like fall.** 나는 가을을 좋아해.\n\nWhat 바로 뒤에 season을 붙이면 '어떤 계절'이라는 뜻이 돼요. 대답은 I like 뒤에 계절 이름을 넣으면 돼요.\n\n> 💡 가을은 **autumn**이라고도 해요. fall과 뜻이 같아요.",
      easy: "꽃이 피는 봄은 spring, 바다에서 수영하는 여름은 summer, 낙엽이 떨어지는 가을은 fall, 눈사람을 만드는 겨울은 winter예요.\n\nfall에는 '떨어지다'라는 뜻도 있어요. 나뭇잎이 떨어지는 계절이라고 기억하면 쉬워요.",
      check: {
        type: 'short', check: 'text',
        q: "'가을'을 나타내는 영어 낱말을 쓰세요.",
        answer: ['fall', 'autumn'],
        wrong: [
          { a: 'winter', why: 'winter는 겨울이에요. 가을은 fall이에요.' },
          { a: 'spring', why: 'spring은 봄이에요. 가을은 fall이에요.' },
        ],
        explain: '가을은 fall이에요. autumn이라고 써도 맞아요.',
      },
    },
    {
      title: 'Why로 이유 묻고 because로 답하기',
      body: "**Why**는 '왜'라는 뜻이에요. 좋아하는 이유를 물을 때는 이렇게 말해요.\n\n- **Why do you like it?** 너는 그것을 왜 좋아하니?\n- **Because I like singing.** 왜냐하면 나는 노래하는 것을 좋아하기 때문이야.\n\n**because**는 '왜냐하면 ~하기 때문이야'라는 뜻이에요. because 뒤에는 이유를 문장으로 이어 써요.\n\n- Because **I can swim** in the sea. (바다에서 수영할 수 있기 때문이야.)\n- Because **it's** snowy. (눈이 오기 때문이야.)\n\n한 문장으로 이어 말할 수도 있어요: I like winter **because** I can make a snowman.",
      easy: "\"왜?\"라고 물으면 \"왜냐하면…\" 하고 대답하지요? 영어도 똑같아요.\n\n왜? = Why?\n왜냐하면 = Because\n\nWhy로 물었는데 Yes나 No로 답하면 이상해요. Because로 시작해서 이유를 말해 주세요.",
      check: {
        type: 'choice',
        q: '**Why do you like summer?**에 알맞은 대답은 무엇일까요?',
        choices: ['Because I can swim in the sea.', 'Yes, I do.', 'I like summer.'],
        answer: 0,
        why: ['', 'Why로 물으면 Yes/No가 아니라 이유를 말해요.', '좋아한다는 말만 했어요. 왜 좋아하는지 이유가 없어요.'],
        explain: 'Why는 이유를 묻는 말이에요. Because 뒤에 이유(바다에서 수영할 수 있어서)를 말한 것이 알맞아요.',
      },
    },
    {
      title: '둘 중에서 더 좋아하는 것 고르기',
      body: "두 가지 가운데 무엇을 더 좋아하는지 물을 때는 **Which**와 **better**를 써요.\n\n- **Which do you like better, dogs or cats?** 너는 개와 고양이 중에서 무엇을 더 좋아하니?\n- **I like cats better.** 나는 고양이를 더 좋아해.\n\n**Which**는 '어느 것'이라는 뜻이고, **better**는 '더(더 좋게)'라는 뜻이에요. 쉼표 뒤에 고를 것 두 개를 **or**(또는)로 이어 말해요.\n\n> 💡 dogs, cats, apples처럼 동물이나 과일을 말할 때는 보통 끝에 s를 붙여요. '개라는 동물 전체'를 좋아한다는 뜻이에요.",
      easy: "엄마가 \"사과랑 바나나 중에 뭐 먹을래?\" 하고 물을 때처럼, 두 개를 보여 주고 하나를 고르게 하는 질문이에요.\n\nWhich do you like better, **apples** or **bananas**?\n\n대답은 고른 것을 넣어서 I like **bananas** better. 라고 하면 돼요.",
      check: {
        type: 'ox',
        q: '**Which do you like better, apples or bananas?**에 **I like apples better.**라고 답하면 사과를 더 좋아한다는 뜻이에요.',
        answer: true,
        explain: 'I like apples better.는 "나는 사과를 더 좋아해."라는 뜻이에요. 두 개 중에서 고른 것을 I like 뒤에 넣고 better를 붙여요.',
      },
    },
  ],

  examples: [
    {
      q: "대화의 빈칸에 알맞은 말을 넣어 보세요.\n\nA: What's your favorite subject?\nB: My favorite subject is [[빈칸]]. (미술)\nA: Why do you like it?\nB: [[빈칸]] I like drawing.",
      steps: [
        "첫 번째 질문은 가장 좋아하는 과목을 묻고 있어요. 미술은 영어로 art예요.",
        '그래서 B는 My favorite subject is art.라고 대답해요.',
        'A의 두 번째 질문은 Why(왜)로 이유를 묻고 있어요.',
        '이유를 말할 때는 Because로 시작해요. Because I like drawing.(그림 그리는 것을 좋아하기 때문이야.)',
      ],
      answer: 'art, Because',
    },
    {
      q: '우리말에 맞게 영어로 말해 보세요.\n\n"너는 여름과 겨울 중에서 무엇을 더 좋아하니?" — "나는 겨울을 더 좋아해."',
      steps: [
        '두 가지 중에서 고르게 하는 질문이니 Which ~ better를 써요.',
        '고를 두 가지는 쉼표 뒤에 or로 이어요: summer or winter',
        '질문: Which do you like better, summer or winter?',
        '대답은 고른 것을 I like 뒤에 넣고 better를 붙여요: I like winter better.',
      ],
      answer: 'Which do you like better, summer or winter? — I like winter better.',
    },
  ],

  terms: [
    { term: 'favorite', def: "'가장 좋아하는'이라는 뜻이에요. 예: My favorite color is blue.(내가 가장 좋아하는 색은 파란색이야.)" },
    { term: 'subject', def: '과목이에요. 국어, 수학, 과학 같은 학교 공부의 갈래를 말해요.' },
    { term: 'season', def: '계절이에요. spring(봄), summer(여름), fall(가을), winter(겨울)이 있어요.' },
    { term: 'Why', def: "'왜'라는 뜻으로, 이유를 물을 때 써요. 예: Why do you like it?" },
    { term: 'because', def: "'왜냐하면 ~하기 때문이야'라는 뜻으로, 이유를 말할 때 써요. 예: Because I like singing." },
    { term: 'Which ~ better?', def: '두 가지 중에서 무엇을 더 좋아하는지 묻는 말이에요. 예: Which do you like better, dogs or cats?' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: "**What's your favorite subject?**에 알맞은 대답은 무엇일까요?",
      choices: ['My favorite subject is science.', "I'm fine, thank you.", "It's sunny.", 'Yes, it is.'],
      answer: 0,
      why: ['', '기분을 물을 때 하는 대답이에요.', '날씨를 물을 때 하는 대답이에요.', 'What으로 물으면 Yes/No가 아니라 무엇인지 말해요.'],
      explain: '가장 좋아하는 과목을 물었으니 My favorite subject is science.(가장 좋아하는 과목은 과학이야.)가 알맞아요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
      q: "'음악' 과목을 나타내는 영어 낱말을 쓰세요.",
      answer: ['music'],
      wrong: [{ a: 'song', why: 'song은 노래 한 곡을 말해요. 음악 과목은 music이에요.' }],
      explain: '음악은 music이에요. 예: My favorite subject is music.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '다음 중 과목을 나타내는 낱말이 **아닌** 것은 무엇일까요?',
      choices: ['summer', 'science', 'art', 'math'],
      answer: 0,
      why: ['', 'science는 과학이라는 과목이에요.', 'art는 미술이라는 과목이에요.', 'math는 수학이라는 과목이에요.'],
      explain: 'summer는 여름이라는 계절 낱말이에요. science(과학), art(미술), math(수학)는 모두 과목이에요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: "계절을 말할 때 **fall**은 '가을'이라는 뜻이에요.",
      answer: true,
      explain: "계절 낱말 fall은 가을이에요. autumn이라고도 해요. (fall에는 '떨어지다'라는 뜻도 있어요.)",
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'text', concept: 3,
      q: '빈칸에 알맞은 낱말을 쓰세요.\n\nA: Why do you like summer?\nB: [[빈칸]] I can swim in the sea.',
      answer: ['because'],
      wrong: [
        { a: 'why', why: 'Why는 묻는 말이에요. 이유를 대답할 때는 Because로 시작해요.' },
        { a: 'yes', why: 'Why로 물으면 Yes/No로 답하지 않아요. Because로 이유를 말해요.' },
      ],
      explain: '이유를 묻는 Why에는 Because(왜냐하면)로 시작해서 대답해요. Because I can swim in the sea.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 4,
      q: '**Which do you like better, apples or bananas?**에 알맞은 대답은 무엇일까요?',
      choices: ['I like bananas better.', 'Yes, I do.', 'Because it is red.', 'I like grapes better.'],
      answer: 0,
      why: [
        '',
        '둘 중 하나를 고르는 질문이라 Yes/No로 답하지 않아요.',
        '이유를 말했어요. 이 질문은 무엇을 더 좋아하는지 물어요.',
        'grapes(포도)는 질문의 두 가지(apples, bananas)에 없어요.',
      ],
      explain: '사과와 바나나 중에서 고르는 질문이니 고른 것을 넣어 I like bananas better.라고 답해요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 낱말은 무엇일까요?\n\nA: What [[빈칸]] do you like?\nB: I like winter.',
      choices: ['season', 'subject', 'color', 'food'],
      answer: 0,
      why: [
        '',
        'subject는 과목이에요. winter는 과목이 아니에요.',
        'color는 색깔이에요. winter는 색깔이 아니에요.',
        'food는 음식이에요. winter는 음식이 아니에요.',
      ],
      explain: 'winter(겨울)는 계절이에요. 그래서 What season do you like?(어떤 계절을 좋아하니?)가 알맞아요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 0,
      q: "우리말에 맞게 낱말을 순서대로 놓으세요.\n\n'내가 가장 좋아하는 과목은 체육이야.'",
      choices: ['My', 'favorite', 'subject', 'is', 'P.E.'],
      answer: [0, 1, 2, 3, 4],
      hint: 'My favorite 다음에 무엇이 가장 좋은지(과목)를 써요.',
      explain: 'My favorite subject(내가 가장 좋아하는 과목) + is(~이다) + P.E.(체육) 순서예요. My favorite subject is P.E.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '대화의 빈칸에 가장 알맞은 말은 무엇일까요?\n\nA: Why do you like spring?\nB: [[빈칸]]',
      choices: ['Because I like flowers.', 'Yes, I like spring.', 'Spring is a season.', 'My favorite subject is art.'],
      answer: 0,
      why: [
        '',
        'Why로 물으면 Yes/No로 답하지 않아요. 좋아하는 이유를 말해요.',
        '봄이 계절이라는 사실만 말했어요. 좋아하는 이유가 아니에요.',
        '과목 이야기를 했어요. 질문은 봄을 좋아하는 이유를 물어요.',
      ],
      hint: 'Why는 이유를 묻는 말이에요.',
      explain: '봄을 왜 좋아하는지 물었으니 Because I like flowers.(꽃을 좋아하기 때문이야.)처럼 이유를 말해요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '빈칸에 알맞은 낱말은 무엇일까요?\n\nA: Which do you like better, soccer or baseball?\nB: I like soccer [[빈칸]].',
      choices: ['better', 'good', 'very', 'is'],
      answer: 0,
      why: [
        '',
        "good은 '좋은'이에요. 둘 중에서 더 좋아한다고 할 때는 better를 써요.",
        'very는 혼자 문장 끝에 오지 않아요. 더 좋아한다고 할 때는 better예요.',
        'is는 문장 끝에 오지 않아요. I like soccer better.가 알맞아요.',
      ],
      hint: '질문 끝부분의 낱말을 대답에도 써요.',
      explain: 'Which ~ better?로 물으면 I like ~ better.로 답해요. I like soccer better.(나는 축구를 더 좋아해.)',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 0,
      q: '바른 문장은 무엇일까요?',
      choices: ['My favorite season is summer.', 'My favorite season summer.', 'I favorite summer.', 'My favorite is season summer.'],
      answer: 0,
      why: [
        '',
        'is가 빠졌어요. My favorite season **is** summer.',
        'favorite은 "가장 좋아하는"이라는 꾸미는 말이라 혼자 동사처럼 쓰지 않아요.',
        '낱말 순서가 바뀌었어요. favorite 바로 뒤에 season이 와요.',
      ],
      explain: 'My favorite season(내가 가장 좋아하는 계절) + is + summer 순서예요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 3,
      q: "글을 읽고 물음에 답하세요.\n\nHi, I'm Seoyun. My favorite subject is science. I like doing experiments. My favorite season is winter. I like winter because I can make a snowman.\n\n서윤이가 겨울을 좋아하는 이유는 무엇일까요?",
      choices: ['눈사람을 만들 수 있어서', '실험을 할 수 있어서', '바다에서 수영할 수 있어서', '꽃을 볼 수 있어서'],
      answer: 0,
      why: [
        '',
        '실험(experiments)은 과학을 좋아하는 이유예요.',
        '글에 수영 이야기는 없어요.',
        '글에 꽃 이야기는 없어요.',
      ],
      hint: 'because 뒤를 찾아 읽어 보세요.',
      explain: 'I like winter because I can make a snowman.에서 because 뒤가 이유예요. 눈사람(snowman)을 만들 수 있어서 겨울을 좋아해요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: "글을 읽고 물음에 답하세요.\n\nJiho: My favorite season is summer. I can swim in the sea.\nHana: I like fall. I like the red and yellow leaves.\nMinjun: I like winter. I can go skiing with my dad.\n\n하나가 가을을 좋아하는 이유는 무엇일까요?",
      choices: ['빨갛고 노란 나뭇잎을 좋아해서', '바다에서 수영할 수 있어서', '아빠와 스키를 탈 수 있어서', '눈사람을 만들 수 있어서'],
      answer: 0,
      why: [
        '',
        '지호가 여름을 좋아하는 이유예요.',
        '민준이가 겨울을 좋아하는 이유예요.',
        '글에 눈사람 이야기는 없어요.',
      ],
      hint: 'Hana가 말한 부분만 찾아 읽어 보세요.',
      explain: 'Hana는 I like fall. I like the red and yellow leaves.라고 했어요. 빨갛고 노란 나뭇잎(leaves)을 좋아해서 가을을 좋아해요.',
    },
    {
      id: 'a2', level: 3, type: 'order', concept: 3,
      q: '자연스러운 대화가 되도록 순서대로 놓으세요.',
      choices: ["What's your favorite season?", 'I like spring.', 'Why do you like spring?', 'Because I like flowers.'],
      answer: [0, 1, 2, 3],
      hint: '먼저 무엇을 좋아하는지 묻고, 그다음 이유를 물어요.',
      explain: '좋아하는 계절을 묻고(What\'s your favorite season?) → 봄이라고 답하고(I like spring.) → 이유를 묻고(Why do you like spring?) → 이유를 말해요(Because I like flowers.).',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '대화의 빈칸에 들어갈 말로 **알맞지 않은** 것은 무엇일까요?\n\nA: Why do you like music?\nB: [[빈칸]]',
      choices: ['Because I like math.', 'Because I like singing.', 'Because I can play the piano.', "Because it's fun."],
      answer: 0,
      why: [
        '',
        '노래하기를 좋아하는 것은 음악을 좋아하는 이유로 알맞아요.',
        '피아노를 칠 수 있는 것은 음악을 좋아하는 이유로 알맞아요.',
        '재미있다는 것은 음악을 좋아하는 이유로 알맞아요.',
      ],
      hint: '음악을 좋아하는 이유가 될 수 없는 것을 찾아요.',
      explain: '수학을 좋아한다(Because I like math.)는 것은 음악을 좋아하는 이유가 될 수 없어요. 나머지는 모두 음악과 관계있는 이유예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'text', concept: 3,
      q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nA: Which do you like better, summer or winter?\nB: I like winter better.\nA: [[빈칸]] do you like winter?\nB: Because I can make a snowman.',
      answer: ['why'],
      wrong: [
        { a: 'what', why: 'B가 Because로 이유를 말했어요. 이유를 묻는 말은 Why예요.' },
        { a: 'which', why: 'Which는 고르게 할 때 써요. B가 Because로 답했으니 이유를 묻는 Why예요.' },
      ],
      hint: 'B의 대답이 무엇으로 시작하는지 보세요.',
      explain: 'B가 Because(왜냐하면)로 이유를 말했으니, A는 이유를 묻는 Why로 물었어요. Why do you like winter?',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 0,
      q: "표를 보고, 내용과 **맞는** 문장을 고르세요.\n\n| 이름 | 가장 좋아하는 과목 | 좋아하는 계절 |\n|---|---|---|\n| Minsu | P.E. | summer |\n| Jia | Korean | fall |\n| Doyun | social studies | spring |",
      choices: [
        "Jia's favorite subject is Korean.",
        "Minsu's favorite subject is music.",
        'Doyun likes winter.',
        "Jia's favorite subject is social studies.",
      ],
      answer: 0,
      why: [
        '',
        '민수가 가장 좋아하는 과목은 P.E.(체육)예요.',
        '도윤이가 좋아하는 계절은 spring(봄)이에요.',
        'social studies(사회)는 도윤이가 가장 좋아하는 과목이에요.',
      ],
      hint: "Jia's는 '지아의'라는 뜻이에요. 이름과 칸을 하나씩 맞춰 보세요.",
      explain: "표에서 지아(Jia)가 가장 좋아하는 과목은 Korean(국어)이에요. 그래서 Jia's favorite subject is Korean.이 맞아요.",
    },
  ],

  deeper: [
    {
      title: 'favorite과 favourite, fall과 autumn',
      body: "영어는 나라마다 조금씩 다르게 쓰기도 해요.\n\n- 미국에서는 **favorite**, 영국에서는 **favourite**이라고 써요. 뜻과 소리는 같아요.\n- 가을을 미국에서는 주로 **fall**, 영국에서는 주로 **autumn**이라고 해요.\n\n둘 다 바른 영어예요. 우리 교과서는 주로 미국식(favorite, fall)을 써요.",
    },
    {
      title: '좋아하는 활동을 말할 때 붙는 -ing',
      body: "Because I like **singing**.에서 singing은 sing(노래하다)에 **-ing**를 붙인 말이에요. like 뒤에 '~하는 것'을 말하고 싶을 때 이렇게 써요.\n\n- I like **drawing**. (그림 그리는 것을 좋아해.)\n- I like **reading** books. (책 읽는 것을 좋아해.)\n- I like **doing** experiments. (실험하는 것을 좋아해.)\n\n좋아하는 과목의 이유를 말할 때 아주 많이 쓰니 함께 익혀 두면 좋아요.",
    },
  ],

  faq: [
    {
      q: "What's랑 What is는 뜻이 달라요?",
      a: "뜻은 같아요. What's는 What is를 줄여 쓴 말이에요. 말할 때는 What's를 더 자주 써요.",
    },
    {
      q: 'fall은 떨어지다라는 뜻 아니에요?',
      a: "맞아요. fall에는 '떨어지다'라는 뜻도 있어요. 하지만 계절을 말할 때는 '가을'이라는 뜻이에요. 나뭇잎이 떨어지는 계절이라고 기억하면 좋아요.",
    },
    {
      q: 'Korean은 왜 첫 글자를 대문자로 써요?',
      a: "Korean은 '한국어, 한국의'라는 뜻으로 나라 이름(Korea)에서 나온 말이에요. 영어에서는 나라와 언어 이름을 문장 어디에 쓰든 첫 글자를 대문자로 써요. math, music 같은 다른 과목은 문장 가운데에서 소문자로 써요.",
    },
    {
      q: 'Why로 물었는데 Yes라고 하면 안 돼요?',
      a: 'Why는 "왜?"라고 이유를 묻는 말이라 Yes/No로 답할 수 없어요. Because로 시작해서 이유를 말해요. 예: Why do you like art? — Because I like drawing.',
    },
  ],

  mistakes: [
    'Why 질문에 Yes, I do.처럼 대답하는 실수 — Why에는 Because로 이유를 말해요.',
    'My favorite subject music.처럼 is를 빠뜨리는 실수 — My favorite subject **is** music.',
    '국어를 korean처럼 소문자로 쓰는 실수 — 언어 이름은 항상 Korean처럼 대문자로 시작해요.',
  ],

  gens: [
    {
      id: 'word-meaning',
      level: 1,
      title: '과목·계절 낱말 고르기',
      make: function (R) {
        var words = [
          ['Korean', '국어', 1], ['math', '수학', 1], ['science', '과학', 1], ['social studies', '사회', 1],
          ['music', '음악', 1], ['art', '미술', 1], ['P.E.', '체육', 1],
          ['spring', '봄', 2], ['summer', '여름', 2], ['fall', '가을', 2], ['winter', '겨울', 2],
        ];
        var meaning = {};
        words.forEach(function (w) { meaning[w[0]] = w[1]; });
        var item = R.pick(words);
        var others = words.filter(function (w) { return w[0] !== item[0]; }).map(function (w) { return w[0]; });
        var pick = R.choices(item[0], R.shuffle(others).slice(0, 6));
        return {
          type: 'choice', concept: item[2],
          q: "'" + item[1] + "'" + R.josa(item[1], '을/를') + ' 나타내는 영어 낱말은 무엇일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            return c === item[0] ? '' : '이 낱말의 뜻은 \'' + meaning[c] + '\'' + R.josa(meaning[c], '이에요/예요') + '.';
          }),
          explain: '영어 낱말 **' + item[0] + "**의 뜻이 '" + item[1] + "'" + R.josa(item[1], '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'why-because',
      level: 2,
      title: '좋아하는 이유 고르기',
      make: function (R) {
        var seasons = [
          ['spring', 'Because I like flowers.', '꽃을 좋아해서'],
          ['summer', 'Because I can swim in the sea.', '바다에서 수영할 수 있어서'],
          ['fall', 'Because I like the red and yellow leaves.', '빨갛고 노란 나뭇잎을 좋아해서'],
          ['winter', 'Because I can make a snowman.', '눈사람을 만들 수 있어서'],
        ];
        var subjects = [
          ['Korean', 'Because I like reading stories.', '이야기 읽기를 좋아해서'],
          ['math', 'Because I like numbers.', '수를 좋아해서'],
          ['science', 'Because I like doing experiments.', '실험하기를 좋아해서'],
          ['music', 'Because I like singing.', '노래하기를 좋아해서'],
          ['art', 'Because I like drawing.', '그림 그리기를 좋아해서'],
          ['P.E.', 'Because I like running.', '달리기를 좋아해서'],
        ];
        var isSeason = R.bool();
        var list = isSeason ? seasons : subjects;
        var item = R.pick(list);
        var others = list.filter(function (x) { return x[0] !== item[0]; });
        var info = {};
        list.forEach(function (x) { info[x[1]] = x; });
        var pick = R.choices(item[1], R.shuffle(others).map(function (x) { return x[1]; }));
        var name = R.pick(['Jia', 'Minsu', 'Seoyun', 'Doyun', 'Haeun']);
        return {
          type: 'choice', concept: 3,
          q: '대화의 빈칸에 가장 알맞은 말은 무엇일까요?\n\nA: Why do you like ' + item[0] + ', ' + name + '?\nB: [[빈칸]]',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            return c === item[1] ? '' : '이 이유(' + info[c][2] + ')는 ' + info[c][0] + '에 더 어울려요. 질문은 ' + item[0] + '에 대해 물어요.';
          }),
          explain: 'Why do you like ' + item[0] + '?는 그것을 좋아하는 이유를 묻는 말이에요. ' + item[1] + '(' + item[2] + ')가 가장 알맞아요.',
        };
      },
    },
  ],

  vocab: [
    { w: 'favorite', m: '가장 좋아하는', ex: 'My favorite color is green.', exm: '내가 가장 좋아하는 색은 초록색이야.' },
    { w: 'subject', m: '과목', ex: 'What is your favorite subject?', exm: '네가 가장 좋아하는 과목은 뭐니?' },
    { w: 'Korean', m: '국어, 한국어', ex: 'We have Korean class on Monday.', exm: '우리는 월요일에 국어 수업이 있어.' },
    { w: 'math', m: '수학', ex: 'Math is fun for me.', exm: '나에게는 수학이 재미있어.' },
    { w: 'science', m: '과학', ex: 'I like doing experiments in science class.', exm: '나는 과학 시간에 실험하는 것을 좋아해.' },
    { w: 'social studies', m: '사회 (과목)', ex: 'We learn about maps in social studies.', exm: '우리는 사회 시간에 지도에 대해 배워.' },
    { w: 'music', m: '음악', ex: 'My favorite subject is music.', exm: '내가 가장 좋아하는 과목은 음악이야.' },
    { w: 'art', m: '미술', ex: 'I draw a cat in art class.', exm: '나는 미술 시간에 고양이를 그려.' },
    { w: 'P.E.', m: '체육', ex: 'We play soccer in P.E. class.', exm: '우리는 체육 시간에 축구를 해.' },
    { w: 'season', m: '계절', ex: 'What season do you like?', exm: '너는 어떤 계절을 좋아하니?' },
    { w: 'spring', m: '봄', ex: 'Flowers come out in spring.', exm: '봄에는 꽃이 피어.' },
    { w: 'summer', m: '여름', ex: 'I can swim in the sea in summer.', exm: '나는 여름에 바다에서 수영할 수 있어.' },
    { w: 'fall', m: '가을', ex: 'The leaves turn red in fall.', exm: '가을에는 나뭇잎이 빨갛게 변해.' },
    { w: 'winter', m: '겨울', ex: 'I make a snowman in winter.', exm: '나는 겨울에 눈사람을 만들어.' },
    { w: 'why', m: '왜', ex: 'Why do you like spring?', exm: '너는 왜 봄을 좋아하니?' },
    { w: 'because', m: '왜냐하면, ~ 때문에', ex: 'I like winter because I can ski.', exm: '나는 스키를 탈 수 있어서 겨울을 좋아해.' },
    { w: 'better', m: '더 (좋게)', ex: 'I like dogs better.', exm: '나는 개를 더 좋아해.' },
    { w: 'which', m: '어느 것', ex: 'Which do you like better, milk or juice?', exm: '너는 우유와 주스 중에서 무엇을 더 좋아하니?' },
  ],
});
