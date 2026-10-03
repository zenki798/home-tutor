/* 3학년 영어 · 인사하고 이름 말하기 */
Tutor.registerUnit({
  id: 'eng-e3-02',
  course: 'eng-e3',
  title: '인사하고 이름 말하기',
  summary: "Hello.로 인사하고 I'm ~.으로 이름을 말하는 법과 헤어질 때 하는 인사를 배워요.",
  goals: [
    '만날 때 Hello., Hi., Good morning.으로 인사할 수 있어요.',
    "I'm ~. 또는 My name is ~.로 내 이름을 말하고, What's your name?으로 이름을 물을 수 있어요.",
    '처음 만난 사람에게 Nice to meet you.라고 말하고 알맞게 답할 수 있어요.',
    '헤어질 때 Goodbye., See you later.로 인사하고, 나라마다 다른 인사 몸짓을 알 수 있어요.',
  ],
  standards: ['[4영02-05]', '[4영02-10]', '[4영01-10]'],

  concepts: [
    {
      title: '만날 때 하는 인사',
      body: '사람을 만나면 먼저 인사를 해요. 영어로 만날 때 하는 인사는 이렇게 해요.\n\n| 인사 | 언제 써요? |\n|---|---|\n| **Hello.** | 언제든, 누구에게나 쓸 수 있어요. |\n| **Hi.** | 친구나 가까운 사람에게 편하게 해요. |\n| **Good morning.** | 아침(낮 12시 전)에 만났을 때 해요. |\n\n누가 Hello.라고 인사하면 나도 **Hello.**나 **Hi.**로 답하면 돼요. **Hi, Mina.**처럼 뒤에 이름을 붙이면 더 다정하게 들려요.',
      easy: '인사는 공 주고받기와 같아요. 친구가 "Hi!" 하고 공을 던지면 나도 "Hi!" 하고 공을 돌려줘요.\n\n아침에 학교에 가서 선생님을 만나면 "안녕하세요" 대신 **Good morning.**이라고 해 보세요. morning은 "아침"이라는 뜻이에요.',
      check: {
        type: 'choice',
        q: '아침에 학교에서 선생님을 만났어요. 알맞은 인사는 무엇일까요?',
        choices: ['Good morning.', 'Goodbye.', 'See you later.'],
        answer: 0,
        why: ['', 'Goodbye.는 헤어질 때 하는 인사예요.', 'See you later.는 헤어질 때 "나중에 봐."라고 하는 말이에요.'],
        explain: '아침에 만났을 때는 Good morning.이라고 인사해요. Hello.라고 해도 괜찮아요.',
      },
    },
    {
      title: '내 이름 말하기',
      body: "내 이름을 말할 때는 두 가지 방법이 있어요.\n\n- **I'm** Jiho. (나는 지호예요.)\n- **My name is** Jiho. (내 이름은 지호예요.)\n\n두 문장은 뜻이 같아요. 이름 자리만 바꾸면 누구나 자기를 소개할 수 있어요.\n\n**I'm**은 **I am**을 줄인 말이에요. I와 m 사이 위쪽에 찍은 작은 표시(')를 **아포스트로피**라고 하는데, 글자가 빠졌다는 표시예요. 여기서는 a가 빠졌어요.\n\n> 💡 이름의 첫 글자는 늘 대문자로 써요: **J**iho, **M**ina. \"나\"를 뜻하는 **I**도 늘 대문자예요.",
      easy: "자기소개는 이름만 바꿔 끼우는 퍼즐이에요.\n\n**I'm** + 내 이름 + 마침표(.)\n\n지호라면 I'm Jiho. 미나라면 I'm Mina. 내 이름이 서준이라면 I'm Seojun. 이렇게요.",
      check: {
        type: 'choice',
        q: '"내 이름은 소라예요."를 영어로 바르게 말한 것은 무엇일까요?',
        choices: ['My name is Sora.', "I'm name Sora.", 'Name my is Sora.'],
        answer: 0,
        why: ['', "I'm 뒤에는 이름만 와요. I'm Sora. 또는 My name is Sora.라고 해요.", '낱말 순서가 바뀌었어요. My name is 순서로 말해요.'],
        explain: '"내 이름은 ~예요."는 My name is ~.라고 해요. 그래서 My name is Sora.예요.',
      },
    },
    {
      title: '이름 묻기와 처음 만났을 때 인사',
      body: "상대의 이름을 물을 때는 **What's your name?**(이름이 뭐니?)이라고 해요. **What's**는 **What is**를 줄인 말이에요. 대답은 I'm ~. 또는 My name is ~.로 해요.\n\n처음 만난 사람과 이름을 주고받은 뒤에는 **Nice to meet you.**(만나서 반가워.)라고 말해요. 이 말을 들으면 **Nice to meet you, too.**(나도 만나서 반가워.)라고 답해요. **too**는 \"~도\"라는 뜻이에요.\n\nMina: Hi. What's your name?\nJiho: I'm Jiho.\nMina: Nice to meet you.\nJiho: Nice to meet you, too.",
      easy: "What's your name?은 상대의 이름이 궁금할 때 여는 \"이름 상자\"예요. 상대가 이름을 알려 주면 Nice to meet you.라고 반가운 마음을 전해요.\n\n친구가 먼저 Nice to meet you.라고 하면, 똑같이 말하고 끝에 **too**만 붙여서 돌려주면 돼요.",
      check: {
        type: 'ox',
        q: "What's your name?은 상대의 이름을 묻는 말이에요.",
        answer: true,
        explain: "What's your name?은 \"이름이 뭐니?\"라는 뜻이에요. I'm ~. 또는 My name is ~.로 답해요.",
      },
    },
    {
      title: '헤어질 때 하는 인사',
      body: "헤어질 때는 **Goodbye.** 또는 줄여서 **Bye.**라고 해요. 나중에 또 만날 사람에게는 **See you later.**(나중에 봐.)라고도 해요.\n\n상대가 Goodbye.라고 하면 나도 **Goodbye.**나 **Bye.**로 답해요. See you later.라고 하면 **See you.**나 **Bye.**로 답하면 돼요.\n\n> ⚠️ 우리말 \"안녕\"은 만날 때와 헤어질 때 모두 쓰지만, 영어는 달라요. **Hello., Hi.는 만날 때**, **Goodbye., Bye.는 헤어질 때** 써요.",
      easy: '"안녕"을 영어로 말하기 전에 먼저 생각해요. 만나는 "안녕"일까, 헤어지는 "안녕"일까?\n\n학교에 도착해서 친구에게 하는 "안녕"은 Hello., 집에 가면서 친구에게 하는 "안녕"은 Goodbye.예요.',
      check: {
        type: 'ox',
        q: '수업이 끝나 친구와 헤어질 때 Hello.라고 인사해요.',
        answer: false,
        explain: 'Hello.는 만날 때 하는 인사예요. 헤어질 때는 Goodbye., Bye., See you later.라고 해요.',
      },
    },
    {
      title: '인사 예절과 나라마다 다른 몸짓',
      body: '인사할 때는 말과 함께 몸짓도 해요. **상대의 눈을 보고 웃으며** 인사하면 반가운 마음이 잘 전해져요.\n\n나라마다 인사 몸짓이 조금씩 달라요.\n\n| 몸짓 | 볼 수 있는 곳 |\n|---|---|\n| 고개(허리)를 숙여 인사하기 | 우리나라, 일본 등 |\n| 악수하기(손을 마주 잡고 가볍게 흔들기) | 미국, 영국 등 여러 나라, 특히 처음 만났을 때 |\n| 두 손을 가슴 앞에 모으고 고개 숙이기 | 태국, 인도 등 |\n\n어느 몸짓이 더 좋은 것이 아니에요. 나라마다 반가움을 나타내는 방법이 다를 뿐이에요. 다른 나라 사람의 인사 방법도 존중해요.',
      easy: '인사 몸짓은 나라마다 쓰는 "반가워요 신호"예요.\n\n우리는 고개를 숙이고, 미국 사람들은 처음 만나면 손을 마주 잡고 흔들어요(악수). 태국에서는 두 손을 가슴 앞에 모으고 고개를 숙여요. 모양은 달라도 모두 "만나서 반가워요"라는 뜻이에요.',
      check: {
        type: 'choice',
        q: '미국에서 처음 만난 사람과 Nice to meet you.라고 말하며 흔히 하는 몸짓은 무엇일까요?',
        choices: ['악수하기', '두 손을 가슴 앞에 모으고 고개 숙이기', '손뼉 치기'],
        answer: 0,
        why: ['', '두 손을 가슴 앞에 모으는 인사는 태국, 인도 등에서 볼 수 있어요.', '손뼉 치기는 인사 몸짓이 아니에요.'],
        explain: '미국, 영국 등에서는 처음 만난 사람과 손을 마주 잡고 가볍게 흔드는 악수를 많이 해요.',
      },
    },
  ],

  examples: [
    {
      q: "대화의 빈칸에 알맞은 말을 넣어 보세요.\n\nSora: Hello. What's your name?\nMinsu: [[빈칸]]\nSora: Nice to meet you.\nMinsu: [[빈칸]]",
      steps: [
        "소라가 What's your name?으로 이름을 물었어요. 민수는 자기 이름을 말해야 해요: I'm Minsu. (또는 My name is Minsu.)",
        '소라가 Nice to meet you.라고 했어요. 처음 만나서 반갑다는 말이에요.',
        '이 말에는 끝에 too를 붙여 답해요: Nice to meet you, too.',
      ],
      answer: "I'm Minsu. / Nice to meet you, too.",
    },
    {
      q: '방과 후에 집에 가면서 친구 지아와 헤어져요. 영어로 어떻게 인사할까요?',
      steps: [
        '만나는 인사일까, 헤어지는 인사일까 먼저 생각해요. 지금은 헤어지는 때예요.',
        '헤어질 때는 Goodbye. 또는 Bye.라고 해요. 내일 또 만날 친구라면 See you later.도 좋아요.',
        '이름을 붙이면 더 다정해요: Bye, Jia.',
      ],
      answer: 'Goodbye. / Bye, Jia. / See you later.',
    },
  ],

  terms: [
    { term: '인사', def: '만나거나 헤어질 때 반가움이나 예의를 나타내는 말과 몸짓이에요. 예: Hello., Goodbye.' },
    { term: '자기소개', def: "다른 사람에게 나를 알리는 것이에요. 영어로는 I'm Jiho.나 My name is Jiho.처럼 이름부터 말해요." },
    { term: '줄임말', def: "두 낱말을 하나로 줄여 쓴 말이에요. I'm은 I am, What's는 What is를 줄인 말이에요." },
    { term: '아포스트로피', def: "I'm, What's에서 글자가 빠진 자리에 위쪽으로 찍는 작은 표시(')예요." },
    { term: '악수', def: '두 사람이 손을 마주 잡고 가볍게 흔드는 인사예요. 미국, 영국 등에서 처음 만났을 때 많이 해요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '친구를 **만났을 때** 하는 인사가 **아닌** 것은 무엇일까요?',
      choices: ['Goodbye.', 'Hello.', 'Hi.', 'Good morning.'],
      answer: 0,
      why: ['', 'Hello.는 만날 때 하는 인사예요.', 'Hi.는 친구를 만날 때 편하게 하는 인사예요.', 'Good morning.은 아침에 만날 때 하는 인사예요.'],
      explain: 'Goodbye.는 헤어질 때 하는 인사예요. Hello., Hi., Good morning.은 모두 만날 때 하는 인사예요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
      q: "빈칸에 알맞은 말을 쓰세요.\n\n[[I'm]] Jiho. (나는 지호예요.)",
      answer: ["I'm", 'I am'],
      wrong: [
        { a: 'Im', why: "I와 m 사이에 아포스트로피(')를 찍어요: I'm" },
        { a: 'My', why: 'My는 "나의"라는 뜻이라 My Jiho.는 말이 되지 않아요. "나는 ~예요"는 I\'m이에요.' },
      ],
      explain: "\"나는 ~예요\"는 I'm ~.이라고 해요. I'm은 I am을 줄인 말이라서 I am이라고 써도 맞아요.",
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: '처음 만난 친구의 **이름을 물을 때** 하는 말은 무엇일까요?',
      choices: ["What's your name?", 'Nice to meet you.', 'See you later.', "I'm Mina."],
      answer: 0,
      why: ['', 'Nice to meet you.는 "만나서 반가워."라는 뜻이에요.', 'See you later.는 헤어질 때 하는 말이에요.', "I'm Mina.는 내 이름을 말하는 문장이에요."],
      explain: "What's your name?은 \"이름이 뭐니?\"라는 뜻이에요. What's는 What is를 줄인 말이에요.",
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 3,
      q: 'See you later.는 헤어질 때 하는 인사예요.',
      answer: true,
      explain: 'See you later.는 "나중에 봐."라는 뜻으로, 헤어질 때 해요. See you.나 Bye.로 답하면 돼요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: Nice to meet you.\nB: [[빈칸]]',
      choices: ['Nice to meet you, too.', 'Good morning.', 'Goodbye.', "What's your name?"],
      answer: 0,
      why: [
        '',
        'Good morning.은 아침에 만나 처음 하는 인사예요. 반갑다는 말에는 too를 붙여 똑같이 답해요.',
        'Goodbye.는 헤어질 때 하는 인사예요.',
        "What's your name?은 이름을 묻는 말이에요. 반갑다는 말에는 too를 붙여 똑같이 반갑다고 답해요.",
      ],
      explain: 'Nice to meet you.(만나서 반가워.)에는 Nice to meet you, too.(나도 만나서 반가워.)라고 답해요.',
    },
    {
      id: 'p6', level: 1, type: 'order', concept: 1,
      q: '"내 이름은 미나예요."가 되도록 낱말을 순서대로 놓으세요.',
      choices: ['My', 'name', 'is', 'Mina.'],
      answer: [0, 1, 2, 3],
      explain: '"내 이름은 ~예요."는 My name is ~.예요. 그래서 My name is Mina.예요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '우리나라에서 웃어른께 인사할 때 흔히 하는 몸짓은 무엇일까요?',
      choices: ['고개(허리)를 숙여 인사하기', '두 손을 가슴 앞에 모으기', '손뼉 치기'],
      answer: 0,
      why: ['', '두 손을 가슴 앞에 모으는 인사는 태국, 인도 등에서 볼 수 있어요.', '손뼉 치기는 인사 몸짓이 아니에요.'],
      explain: '우리나라에서는 웃어른께 고개나 허리를 숙여 인사해요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 2,
      q: "대화의 빈칸에 알맞은 말은 무엇일까요?\n\nJiho: Hi. I'm Jiho. What's your name?\nSora: [[빈칸]]",
      choices: ['My name is Sora.', 'Your name is Sora.', "I'm Jiho.", 'Nice to meet you, too.'],
      answer: 0,
      why: [
        '',
        'Your name은 "너의 이름"이에요. 내 이름을 말할 때는 My name이에요.',
        '지호의 이름을 말했어요. 소라는 자기 이름 Sora를 말해야 해요.',
        '지호는 아직 Nice to meet you.라고 하지 않았어요. 먼저 이름을 묻는 말에 답해요.',
      ],
      hint: '지호가 마지막에 무엇을 물었는지 보세요.',
      explain: "지호가 What's your name?으로 이름을 물었으니 소라는 My name is Sora.(또는 I'm Sora.)라고 답해요.",
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 낱말을 쓰세요.\n\nA: Nice to meet you.\nB: Nice to meet you, [[too]].',
      answer: ['too'],
      hint: '"나도 만나서 반가워."의 "~도"에 해당하는 낱말이에요.',
      wrong: [
        { a: 'to', why: 'to는 Nice to meet you 안에 있는 다른 낱말이에요. "~도"라는 뜻은 o가 두 개인 too예요.' },
        { a: 'two', why: 'two는 숫자 2예요. 소리는 비슷하지만 "~도"는 too라고 써요.' },
      ],
      explain: 'Nice to meet you, too.는 "나도 만나서 반가워."라는 뜻이에요. too는 "~도"예요.',
    },
    {
      id: 'p10', level: 2, type: 'order', concept: 2,
      q: '이름을 묻는 말이 되도록 순서대로 놓으세요.',
      choices: ["What's", 'your', 'name?'],
      answer: [0, 1, 2],
      explain: "\"이름이 뭐니?\"는 What's your name?이에요. 묻는 말이라 끝에 물음표(?)를 써요.",
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '대화의 빈칸에 알맞은 말은 무엇일까요?\n\nMina: See you later, Jiho.\nJiho: [[빈칸]]',
      choices: ['Bye, Mina.', 'Hello, Mina.', 'Nice to meet you, Mina.', 'Good morning, Mina.'],
      answer: 0,
      why: [
        '',
        'Hello.는 만날 때 하는 인사예요. 미나는 헤어지는 인사를 했어요.',
        'Nice to meet you.는 처음 만났을 때 하는 말이에요.',
        'Good morning.은 아침에 만날 때 하는 인사예요.',
      ],
      hint: 'See you later.가 만날 때 하는 말인지, 헤어질 때 하는 말인지 생각해 보세요.',
      explain: 'See you later.는 헤어질 때 하는 말이에요. 그래서 헤어지는 인사 Bye, Mina.로 답해요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'order', concept: 2,
      q: '처음 만난 두 친구의 대화가 되도록 순서대로 놓으세요.',
      choices: ["Hello. What's your name?", "I'm Jiho.", 'Nice to meet you.', 'Nice to meet you, too.'],
      answer: [0, 1, 2, 3],
      hint: '인사와 이름 묻기 → 이름 말하기 → 반가움 나타내기 순서예요.',
      explain: '먼저 인사하며 이름을 묻고(Hello. What\'s your name?), 이름을 말해요(I\'m Jiho.). 그다음 Nice to meet you.라고 하면 Nice to meet you, too.로 답해요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 3,
      q: '**헤어질 때** 하는 말끼리만 묶은 것은 무엇일까요?',
      choices: ['Goodbye. / See you later.', 'Hello. / Goodbye.', 'Hi. / Good morning.', 'Nice to meet you. / Bye.'],
      answer: 0,
      why: [
        '',
        'Hello.는 만날 때 하는 인사예요.',
        'Hi.와 Good morning.은 둘 다 만날 때 하는 인사예요.',
        'Nice to meet you.는 처음 만났을 때 하는 말이에요.',
      ],
      hint: '두 말이 모두 헤어질 때 하는 말인지 하나씩 확인해 보세요.',
      explain: 'Goodbye.와 See you later.는 둘 다 헤어질 때 하는 말이에요. 다른 묶음에는 만날 때 하는 말이 하나씩 섞여 있어요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 1,
      q: '대문자를 **바르게** 쓴 문장은 무엇일까요?',
      choices: ["I'm Jiho.", "i'm Jiho.", "I'm jiho.", "i'm jiho."],
      answer: 0,
      why: [
        '',
        '"나"를 뜻하는 I는 늘 대문자로 써요.',
        '이름의 첫 글자는 대문자로 써요: Jiho',
        'I와 이름의 첫 글자를 모두 대문자로 써야 해요.',
      ],
      hint: '"나"를 뜻하는 낱말과 이름의 첫 글자를 살펴보세요.',
      explain: "\"나\"를 뜻하는 I와 이름의 첫 글자 J는 늘 대문자로 써요. 그래서 I'm Jiho.가 바른 문장이에요.",
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'text', concept: 1,
      q: "**I'm**을 줄이지 않은 두 낱말로 바꾸어 쓰세요.",
      answer: ['I am'],
      hint: "아포스트로피(')는 글자가 빠진 자리예요. 어떤 글자가 빠졌을까요?",
      wrong: [
        { a: "I'm", why: '줄인 말을 그대로 썼어요. 빠진 글자 a를 되살려 두 낱말로 써요.' },
        { a: 'Im', why: '아포스트로피만 지웠어요. 빠진 글자 a를 되살려 I am으로 써요.' },
      ],
      explain: "I'm은 I am을 줄인 말이에요. 아포스트로피 자리에 a가 빠져 있었어요.",
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: '아침 8시, 미국에서 온 새 친구 Tom을 처음 만났어요. 가장 알맞은 말과 몸짓은 무엇일까요?',
      choices: [
        'Good morning. Nice to meet you. + 악수하기',
        'Goodbye. Nice to meet you. + 악수하기',
        'See you later. + 고개 숙이기',
        'Good morning. See you later. + 손뼉 치기',
      ],
      answer: 0,
      why: [
        '',
        'Goodbye.는 헤어질 때 하는 인사예요.',
        'See you later.는 헤어질 때 하는 말이에요. 처음 만났을 때는 Nice to meet you.라고 해요.',
        'See you later.는 헤어질 때 하는 말이고, 손뼉 치기는 인사 몸짓이 아니에요.',
      ],
      hint: '때(아침), 상황(처음 만남), 나라(미국)를 하나씩 생각해 보세요.',
      explain: '아침이니 Good morning., 처음 만났으니 Nice to meet you.예요. 미국에서는 처음 만난 사람과 악수를 많이 해요.',
    },
  ],

  deeper: [
    {
      title: '하루의 때에 따라 달라지는 인사',
      body: '영어에는 하루의 때에 맞춰 하는 인사가 더 있어요.\n\n| 인사 | 언제 |\n|---|---|\n| Good morning. | 아침(낮 12시 전)에 만났을 때 |\n| Good afternoon. | 낮 12시가 지나 오후에 만났을 때 |\n| Good evening. | 저녁에 만났을 때 |\n| Good night. | 밤에 헤어지거나 잠자리에 들 때 |\n\nGood night.만 헤어질 때 하는 말이라는 점이 재미있지요? 4학년이 되면 How are you?로 상대의 기분을 묻고 답하는 인사도 배워요.',
    },
  ],

  faq: [
    {
      q: "I'm이랑 My name is는 뭐가 달라요?",
      a: "뜻은 같아요. I'm Jiho.는 \"나는 지호예요.\", My name is Jiho.는 \"내 이름은 지호예요.\"예요. 어느 쪽으로 말해도 자기 이름을 알려 줄 수 있어요.",
    },
    {
      q: '"안녕"은 영어로 Hello예요, Goodbye예요?',
      a: '둘 다예요. 우리말 "안녕"은 만날 때도 헤어질 때도 쓰지만, 영어는 나누어 써요. 만날 때는 Hello. 또는 Hi., 헤어질 때는 Goodbye. 또는 Bye.라고 해요.',
    },
    {
      q: 'Hi랑 Hello는 뭐가 달라요?',
      a: '둘 다 만날 때 하는 인사예요. Hi.는 친구나 가까운 사람에게 하는 조금 더 편한 말이고, Hello.는 누구에게나 쓸 수 있어요.',
    },
  ],

  mistakes: [
    '헤어질 때 Hello.라고 하는 실수 — 만날 때는 Hello./Hi., 헤어질 때는 Goodbye./Bye.예요.',
    'Nice to meet you, too.의 too를 to나 two로 쓰는 실수 — "~도"라는 뜻은 o가 두 개인 too예요.',
    "I'm에서 아포스트로피를 빼고 Im으로 쓰거나, 이름의 첫 글자를 소문자로 쓰는 실수 — I'm Jiho.처럼 써요.",
  ],

  gens: [
    {
      id: 'greeting-reply',
      level: 1,
      title: '대화의 빈칸에 알맞은 인사 고르기',
      make: function (R) {
        var names = ['Mina', 'Jiho', 'Sora', 'Minsu', 'Yuna', 'Tom', 'Amy', 'Doyun'];
        var two = R.sample(names, 2);
        var A = two[0];
        var B = two[1];
        function eun(n) { return n === 'Tom' || n === 'Doyun' ? '은' : '는'; } // 받침 있는 이름(톰·도윤)
        var kinds = [
          {
            concept: 2,
            dialog: A + ": Hi. What's your name?\n" + B + ': [[빈칸]]',
            ans: "I'm " + B + '.',
            wrongs: [
              ["I'm " + A + '.', A + '의 이름을 말했어요. ' + B + eun(B) + ' 자기 이름을 말해야 해요.'],
              ['Nice to meet you, too.', '먼저 이름을 묻는 말에 답해야 해요.'],
              ['Goodbye.', 'Goodbye.는 헤어질 때 하는 인사예요.'],
              ['See you later.', 'See you later.는 헤어질 때 하는 말이에요.'],
            ],
            why: "What's your name?으로 이름을 물었으니 " + B + eun(B) + " I'm " + B + '.(또는 My name is ' + B + '.)라고 자기 이름을 말해요.',
          },
          {
            concept: 2,
            dialog: A + ": I'm " + A + '. Nice to meet you.\n' + B + ': [[빈칸]]',
            ans: 'Nice to meet you, too.',
            wrongs: [
              ['Goodbye.', 'Goodbye.는 헤어질 때 하는 인사예요.'],
              ['See you later.', 'See you later.는 헤어질 때 하는 말이에요.'],
              ["What's your name?", A + eun(A) + ' 이미 이름을 말했어요.'],
              ['Good morning, too.', 'Good morning.에는 too를 붙이지 않아요. 반갑다는 말에 too를 붙여 답해요.'],
            ],
            why: 'Nice to meet you.(만나서 반가워.)에는 Nice to meet you, too.(나도 만나서 반가워.)라고 답해요.',
          },
          {
            concept: 3,
            dialog: A + ': Goodbye, ' + B + '.\n' + B + ': [[빈칸]]',
            ans: 'Bye, ' + A + '.',
            wrongs: [
              ['Hello, ' + A + '.', 'Hello.는 만날 때 하는 인사예요. ' + A + eun(A) + ' 헤어지는 인사를 했어요.'],
              ['Nice to meet you, ' + A + '.', 'Nice to meet you.는 처음 만났을 때 하는 말이에요.'],
              ['Good morning, ' + A + '.', 'Good morning.은 아침에 만날 때 하는 인사예요.'],
              ['Hi, ' + A + '.', 'Hi.는 만날 때 하는 인사예요.'],
            ],
            why: 'Goodbye.는 헤어질 때 하는 인사라서 Bye.나 Goodbye.로 답해요.',
          },
          {
            concept: 0,
            dialog: '(아침에 교실에서 짝꿍을 만났어요.)\n' + A + ': Good morning, ' + B + '.\n' + B + ': [[빈칸]]',
            ans: 'Good morning, ' + A + '.',
            wrongs: [
              ['Goodbye, ' + A + '.', 'Goodbye.는 헤어질 때 하는 인사예요.'],
              ['See you later, ' + A + '.', 'See you later.는 헤어질 때 하는 말이에요.'],
              ['Nice to meet you, too.', '짝꿍은 처음 만난 사람이 아니에요. 아침 인사에는 아침 인사로 답해요.'],
              ['Bye, ' + A + '.', 'Bye.는 헤어질 때 하는 인사예요.'],
            ],
            why: '아침에 만났을 때 Good morning.이라고 인사하면 나도 Good morning.으로 답해요.',
          },
          {
            concept: 3,
            dialog: A + ': See you later, ' + B + '.\n' + B + ': [[빈칸]]',
            ans: 'See you, ' + A + '.',
            wrongs: [
              ['Hello, ' + A + '.', 'Hello.는 만날 때 하는 인사예요. See you later.는 헤어질 때 하는 말이에요.'],
              ['Good morning, ' + A + '.', 'Good morning.은 아침에 만날 때 하는 인사예요.'],
              ["I'm " + B + '.', '이름을 묻지 않았어요. 헤어지는 인사에는 헤어지는 인사로 답해요.'],
              ['Nice to meet you, ' + A + '.', 'Nice to meet you.는 처음 만났을 때 하는 말이에요.'],
            ],
            why: 'See you later.(나중에 봐.)는 헤어질 때 하는 말이라서 See you.나 Bye.로 답해요.',
          },
        ];
        var k = R.pick(kinds);
        var reason = {};
        k.wrongs.forEach(function (w) { reason[w[0]] = w[1]; });
        var pick = R.choices(k.ans, k.wrongs.map(function (w) { return w[0]; }));
        return {
          type: 'choice', concept: k.concept,
          q: '대화의 빈칸에 알맞은 말을 고르세요.\n\n' + k.dialog,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === k.ans ? '' : reason[c]; }),
          explain: k.why,
        };
      },
    },
  ],

  vocab: [
    { w: 'hello', m: '안녕(만날 때), 안녕하세요', ex: "Hello, I'm Mina.", exm: '안녕, 나는 미나야.' },
    { w: 'hi', m: '안녕(만날 때 친구끼리 편하게)', ex: 'Hi, Jiho!', exm: '안녕, 지호야!' },
    { w: 'goodbye', m: '잘 가, 안녕히 가세요(헤어질 때)', ex: 'Goodbye, Minsu.', exm: '잘 가, 민수야.' },
    { w: 'morning', m: '아침', ex: 'Good morning, Sora.', exm: '안녕, 소라야. (아침 인사)' },
    { w: 'name', m: '이름', ex: 'My name is Sora.', exm: '내 이름은 소라야.' },
    { w: 'nice', m: '좋은, 반가운', ex: 'Nice to meet you.', exm: '만나서 반가워.' },
    { w: 'meet', m: '만나다', ex: 'I meet Jiho at school.', exm: '나는 학교에서 지호를 만나.' },
    { w: 'later', m: '나중에', ex: 'See you later.', exm: '나중에 봐.' },
    { w: 'too', m: '~도, 또한', ex: 'Nice to meet you, too.', exm: '나도 만나서 반가워.' },
    { w: 'friend', m: '친구', ex: 'Jiho is my friend.', exm: '지호는 내 친구야.' },
  ],
});
