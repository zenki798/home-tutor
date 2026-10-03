/* 6학년 영어 · 아픈 곳 묻고 조언하기 */
Tutor.registerUnit({
  id: 'eng-e6-02',
  course: 'eng-e6',
  title: '아픈 곳 묻고 조언하기',
  summary: "What's wrong?으로 어디가 아픈지 묻고 I have a fever.처럼 답하며 알맞은 조언과 위로를 해요.",
  goals: [
    "What's wrong?, What's the matter?로 어디가 아픈지 물을 수 있어요.",
    'I have a fever., My leg hurts.처럼 아픈 곳을 말할 수 있어요.',
    'Get some rest.처럼 알맞은 조언을 할 수 있어요.',
    "That's too bad., Get well soon.으로 걱정하고 위로할 수 있어요.",
  ],
  standards: [],

  concepts: [
    {
      title: '어디가 아픈지 묻기',
      body: '친구가 아파 보이면 **What\'s wrong?** 또는 **What\'s the matter?**라고 물어요. 둘 다 "무슨 일이야? 어디 아프니?"라는 뜻이에요.\n\n- **What\'s wrong?** — wrong은 "잘못된, 탈이 난"이라는 뜻이에요.\n- **What\'s the matter?** — matter는 "문제, 일"이라는 뜻이에요.\n\n걱정하며 **Are you okay?**(괜찮니?)라고 먼저 물어볼 수도 있어요.\n\n> 💡 What\'s는 What is를 줄인 말이에요.',
      easy: '보건실 선생님을 떠올려 보세요. 학생이 들어오면 제일 먼저 "어디가 아파서 왔니?"라고 물으시지요.\n\n영어로는 이 말을 **What\'s wrong?** 또는 **What\'s the matter?**라고 해요. 두 질문은 쓰임이 같으니 둘 다 알아 두면 돼요.',
      check: {
        type: 'choice',
        q: 'What\'s wrong?과 뜻이 거의 같은 질문은 무엇일까요?',
        choices: ["What's the matter?", "What's your name?", 'What time is it?'],
        answer: 0,
        why: ['', '이름을 묻는 말이에요.', '시각을 묻는 말이에요.'],
        explain: 'What\'s wrong?과 **What\'s the matter?**는 둘 다 "무슨 일이야? 어디 아프니?"라는 뜻이에요.',
      },
    },
    {
      title: '몸의 부분 낱말과 -ache',
      body: '아픈 곳을 말하려면 먼저 몸의 부분 낱말을 알아야 해요.\n\n| 낱말 | 뜻 | 낱말 | 뜻 |\n|---|---|---|---|\n| **head** | 머리 | **arm** | 팔 |\n| **tooth** | 이(치아) | **leg** | 다리 |\n| **stomach** | 배 | | |\n\n**ache**는 "계속되는 아픔"이라는 뜻이에요. 몸의 부분 낱말 뒤에 ache를 붙이면 그곳이 아프다는 낱말이 돼요.\n\n- head + ache → **headache** (두통, 머리가 아픔)\n- tooth + ache → **toothache** (치통, 이가 아픔)\n- stomach + ache → **stomachache** (복통, 배가 아픔)\n\n> ⚠️ arm과 leg에는 ache를 붙여 쓰지 않아요. 팔·다리가 아플 때는 My leg hurts.처럼 말해요(다음 카드).',
      easy: '레고 블록 두 개를 끼우듯이 낱말 두 개를 붙여 보세요.\n\n머리(**head**) + 아픔(**ache**) = 머리 아픔(**headache**)\n\n이(**tooth**) + 아픔(**ache**) = 이 아픔(**toothache**)\n\n띄어 쓰지 않고 한 낱말로 붙여 쓰는 것이 중요해요.',
      check: {
        type: 'choice',
        q: '배가 아픈 것(복통)을 뜻하는 낱말은 무엇일까요?',
        choices: ['stomachache', 'headache', 'toothache'],
        answer: 0,
        why: ['', 'headache는 머리가 아픈 거예요. head는 머리예요.', 'toothache는 이가 아픈 거예요. tooth는 이예요.'],
        explain: '배는 stomach이므로 stomach + ache → **stomachache**예요.',
      },
    },
    {
      title: '아픈 곳 말하기',
      body: '아픈 곳을 말하는 방법은 두 가지예요.\n\n**1) I have a + 아픈 증상.**\n- I have a **fever**. (열이 나.)\n- I have a **cold**. (감기에 걸렸어.)\n- I have a **headache**. (머리가 아파.)\n- I have a **toothache**. (이가 아파.)\n\n**2) My + 몸의 부분 + hurts.**\n- My **leg** hurts. (다리가 아파.)\n- My **arm** hurts. (팔이 아파.)\n\n**hurt**는 "아프다"라는 뜻이에요. My leg처럼 하나를 말할 때는 hurts처럼 **s**를 붙여요. 5학년에서 배운 She gets up.의 s와 같은 규칙이에요.\n\n> 💡 I have a 다음의 a를 빠뜨리지 않도록 조심해요. I have **a** fever.',
      easy: '두 문장 틀을 상자라고 생각해 보세요.\n\n- 상자 1: I have a [[빈칸]]. → 빈칸에 **증상**(fever, cold, headache)을 넣어요.\n- 상자 2: My [[빈칸]] hurts. → 빈칸에 **몸의 부분**(leg, arm)을 넣어요.\n\n증상 낱말은 상자 1, 몸의 부분 낱말은 상자 2에 넣으면 돼요.',
      check: {
        type: 'ox',
        q: 'I have a fever.는 "나는 열이 나."라는 뜻이에요.',
        answer: true,
        explain: 'fever는 "열"이라는 뜻이에요. 그래서 I have a fever.는 "나는 열이 나."예요.',
      },
    },
    {
      title: '조언하기',
      body: '아픈 친구에게 도움이 되는 말을 **조언**이라고 해요. 조언은 **동사(움직임을 나타내는 말)로 시작하는 문장**으로 해요. 이런 문장을 **명령문**이라고 해요.\n\n| 조언 | 뜻 |\n|---|---|\n| **Get some rest.** | 좀 쉬어. |\n| **Drink warm water.** | 따뜻한 물을 마셔. |\n| **See a doctor.** | 병원에 가 봐(의사에게 진찰받아). |\n| **Go to bed early.** | 일찍 자. |\n\n아픈 곳에 맞게 조언해요. 예를 들어 감기에 걸린 친구에게는 Drink warm water.가 어울려요.\n\n> 💡 많이 아플 때는 혼자 참지 말고 꼭 어른께 말씀드려요.',
      easy: '친구가 아프다고 할 때 우리말로 "좀 쉬어!", "물 마셔!"라고 하지요? 영어도 똑같이 **하라는 일**부터 말해요.\n\n- 쉬어 → **Get** some rest.\n- 마셔 → **Drink** warm water.\n- 병원에 가 봐 → **See** a doctor.\n\n문장 맨 앞의 낱말(Get, Drink, See)이 "무엇을 하라는지" 알려 줘요.',
      check: {
        type: 'choice',
        q: '감기에 걸린 친구에게 해 줄 조언으로 알맞은 것은 무엇일까요?',
        choices: ['Drink warm water.', 'Eat a lot of ice cream.', 'Play outside all day.'],
        answer: 0,
        why: ['', '차가운 음식을 많이 먹는 것은 감기에 도움이 되지 않아요.', '감기에 걸렸을 때는 밖에서 오래 놀기보다 쉬어야 해요.'],
        explain: '감기에 걸렸을 때는 따뜻한 물을 마시고 쉬는 것이 좋아요. 그래서 **Drink warm water.**가 알맞아요.',
      },
    },
    {
      title: '걱정하고 위로하는 말',
      body: '친구가 아프다는 말을 들으면 먼저 걱정하는 마음을 표현해요.\n\n- **That\'s too bad.** — 그것참 안됐다.\n- **Get well soon.** — 빨리 나아.\n\n대화는 보통 이런 순서로 이어져요.\n\n1. A: What\'s wrong?\n2. B: I have a headache.\n3. A: **That\'s too bad.** Get some rest.\n4. B: Thank you.\n5. A: **Get well soon.**\n\n> 💡 That\'s too bad.는 4학년에서 친구의 기분에 반응할 때도 배웠어요. 안 좋은 소식을 들었을 때 쓰는 말이에요.',
      easy: '친구가 넘어져서 무릎이 아프다고 해요. 우리말로는 "어떡해, 많이 아프겠다." 하고 말한 뒤 "빨리 나아!" 하고 인사하지요.\n\n영어도 같아요. 걱정은 **That\'s too bad.**, 헤어질 때 인사는 **Get well soon.**이에요.',
      check: {
        type: 'choice',
        q: 'Get well soon.의 뜻으로 알맞은 것은 무엇일까요?',
        choices: ['빨리 나아.', '잘 자.', '다시 만나.'],
        answer: 0,
        why: ['', '"잘 자."는 Good night.이에요.', '"다시 만나."는 See you again.이에요.'],
        explain: 'Get well soon.은 아픈 사람에게 "빨리 나아."라고 위로하는 말이에요.',
      },
    },
  ],

  examples: [
    {
      q: '지아가 이가 아파요. 민수가 어디가 아픈지 묻고, 지아가 대답하고, 민수가 걱정하며 조언하는 대화를 영어로 만들어 보세요.',
      steps: [
        '민수가 어디가 아픈지 물어요: What\'s wrong? (What\'s the matter?도 돼요.)',
        '지아가 대답해요. 이(tooth)가 아프니 tooth에 ache를 붙여요: I have a toothache.',
        '민수가 걱정하는 말을 해요: That\'s too bad.',
        '이어서 조언을 해요. 동사로 시작하는 문장을 써요: See a doctor.',
      ],
      answer: "A: What's wrong?\nB: I have a toothache.\nA: That's too bad. See a doctor.",
    },
    {
      q: '"배가 아파."를 두 가지 방법으로 영어로 말해 보세요.',
      steps: [
        '배는 stomach이에요.',
        '방법 1: stomach에 ache를 붙이면 stomachache(복통)이므로 I have a stomachache.',
        '방법 2: 몸의 부분 낱말과 hurts를 써서 My stomach hurts.',
        'My stomach은 하나이므로 hurt 끝에 s를 붙여요.',
      ],
      answer: 'I have a stomachache. / My stomach hurts.',
    },
  ],

  terms: [
    { term: '-ache', def: '"계속되는 아픔"이라는 뜻이에요. 몸의 부분 낱말 뒤에 붙여요. 예: headache(두통), toothache(치통), stomachache(복통)' },
    { term: 'hurt', def: '"아프다"라는 뜻이에요. My leg hurts.처럼 아픈 몸의 부분과 함께 써요.' },
    { term: '조언', def: '어떻게 하면 좋을지 도와주는 말이에요. 예: Get some rest.(좀 쉬어.)' },
    { term: '명령문', def: '동사로 시작해서 "~해."라고 하라는 일을 말하는 문장이에요. 조언할 때도 써요. 예: Drink warm water.' },
    { term: '증상', def: '아플 때 몸에 나타나는 모습이에요. 예: fever(열), cold(감기), headache(두통)' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: 'What\'s wrong?과 뜻이 같은 질문은 무엇일까요?',
      choices: ["What's the matter?", "What's your name?", 'What time is it?', 'What grade are you in?'],
      answer: 0,
      why: ['', '이름을 묻는 말이에요.', '시각을 묻는 말이에요.', '몇 학년인지 묻는 말이에요.'],
      explain: '**What\'s the matter?**도 What\'s wrong?처럼 "무슨 일이야? 어디 아프니?"라는 뜻이에요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: 'stomach의 뜻으로 알맞은 것은 무엇일까요?',
      choices: ['배', '머리', '이(치아)', '다리'],
      answer: 0,
      why: ['', '머리는 head예요.', '이는 tooth예요.', '다리는 leg예요.'],
      explain: '**stomach**은 "배"예요. 배가 아플 때는 I have a stomachache.라고 말해요.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 1,
      q: '"치통(이가 아픔)"을 뜻하는 영어 낱말을 쓰세요.\n\n이(tooth) + 아픔(ache)',
      answer: ['toothache'],
      wrong: [
        { a: 'tooth', why: '"이"라는 낱말만 썼어요. 아픔을 뜻하는 ache를 붙여요.' },
        { a: 'headache', why: 'headache는 머리가 아픈 거예요. 이는 tooth예요.' },
      ],
      explain: 'tooth(이)에 ache(아픔)를 붙여 **toothache**예요. 띄어 쓰지 않고 한 낱말로 써요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: 'I have a cold.는 "나는 추워."라는 뜻이에요.',
      answer: false,
      explain: 'have a cold는 "감기에 걸리다"라는 뜻이에요. I have a cold.는 "나는 감기에 걸렸어."예요. "나는 추워."는 I\'m cold.예요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '다리가 아플 때 할 말로 알맞은 것은 무엇일까요?',
      choices: ['My leg hurts.', 'My arm hurts.', 'I have a headache.', 'I have a fever.'],
      answer: 0,
      why: ['', 'arm은 팔이에요. 다리는 leg예요.', '머리가 아프다는 말이에요.', '열이 난다는 말이에요.'],
      explain: '다리는 leg예요. 몸의 부분이 아플 때는 My + 몸의 부분 + hurts.로 말하니 **My leg hurts.**예요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '열이 나는 친구에게 해 줄 조언으로 알맞은 것은 무엇일까요?',
      choices: ['Get some rest.', 'Go swimming.', 'Play soccer outside.', 'Happy birthday!'],
      answer: 0,
      why: ['', '열이 날 때 수영을 하면 몸이 더 힘들어요.', '열이 날 때는 밖에서 뛰기보다 쉬어야 해요.', '생일을 축하하는 말이에요. 아픈 친구에게는 조언이나 위로를 해요.'],
      explain: '열이 날 때는 쉬는 것이 좋아요. 그래서 **Get some rest.**(좀 쉬어.)가 알맞아요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: 'That\'s too bad.의 뜻으로 알맞은 것은 무엇일까요?',
      choices: ['그것참 안됐다.', '정말 잘됐다.', '천만에.', '만나서 반가워.'],
      answer: 0,
      why: ['', '좋은 소식에 하는 말은 That\'s great!이에요.', '"천만에."는 You\'re welcome.이에요.', '"만나서 반가워."는 Nice to meet you.예요.'],
      explain: 'That\'s too bad.는 안 좋은 소식을 들었을 때 "그것참 안됐다."라고 걱정하는 말이에요.',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 낱말을 쓰세요.\n\nI have a [[빈칸]]. (나는 머리가 아파.)',
      answer: ['headache'],
      hint: '머리(head)에 아픔을 뜻하는 말을 붙여요.',
      wrong: [
        { a: 'head', why: '"머리"라는 낱말만 썼어요. I have a head.는 "나는 머리가 있어."가 돼요. ache를 붙여 headache로 써요.' },
        { a: 'headake', why: '철자를 확인해 보세요. ache는 a-c-h-e예요.' },
      ],
      explain: '머리가 아플 때는 head에 ache를 붙인 **headache**를 써서 I have a headache.라고 해요.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 2,
      q: '우리말 뜻에 맞게 낱말을 순서대로 놓으세요.\n\n"나는 이가 아파."',
      choices: ['I', 'have', 'a', 'toothache.'],
      answer: [0, 1, 2, 3],
      explain: 'I have a + 증상의 꼴이에요. **I have a toothache.**',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: What\'s the matter?\nB: I have a cold.\nA: [[빈칸]]',
      choices: ['Drink warm water and get some rest.', "That's great!", 'Eat a lot of ice cream.', "You're welcome."],
      answer: 0,
      why: ['', 'That\'s great!는 좋은 소식에 하는 말이에요. 감기에 걸린 친구에게는 어울리지 않아요.', '차가운 음식을 많이 먹는 것은 감기에 도움이 되지 않아요.', 'You\'re welcome.은 고맙다는 말에 대답할 때 써요.'],
      hint: '감기에 걸린 친구에게 도움이 되는 말을 찾아보세요.',
      explain: 'B가 감기에 걸렸다고 했으니 **Drink warm water and get some rest.**(따뜻한 물을 마시고 좀 쉬어.)라는 조언이 알맞아요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 1,
      q: '대화를 읽고 물음에 답하세요.\n\nMina: Hi, Jiho. Are you okay?\nJiho: No. I have a stomachache.\nMina: That\'s too bad. Get some rest.\nJiho: Okay. Thank you.\n\n지호는 어디가 아픈가요?',
      choices: ['배', '머리', '이(치아)', '다리'],
      answer: 0,
      why: ['', '머리가 아프면 headache예요. 지호가 말한 낱말을 다시 보세요.', '이가 아프면 toothache예요. 지호가 말한 낱말을 다시 보세요.', '다리가 아프면 My leg hurts.라고 말해요.'],
      hint: 'stomachache를 stomach와 ache로 나누어 보세요.',
      explain: '지호는 I have a stomachache.라고 했어요. stomach(배) + ache(아픔)이므로 배가 아파요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 4,
      q: '친구가 My arm hurts.라고 말했어요. 이어서 할 말로 가장 알맞은 것은 무엇일까요?',
      choices: ["That's too bad. Get well soon.", "That's great! Get well soon.", 'Happy birthday!', 'Nice to meet you.'],
      answer: 0,
      why: ['', 'That\'s great!는 좋은 소식에 하는 말이에요. 아프다는 말에는 That\'s too bad.로 걱정해요.', '생일을 축하하는 말이에요.', '처음 만난 사람에게 하는 인사예요.'],
      hint: '먼저 걱정하는 말, 그다음 위로하는 말을 찾아보세요.',
      explain: '팔이 아프다는 친구에게는 **That\'s too bad.**(그것참 안됐다.)로 걱정하고 **Get well soon.**(빨리 나아.)으로 위로해요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: '아픈 곳과 조언이 **어울리지 않는** 것은 무엇일까요?',
      choices: [
        'I have a fever. — Get some rest.',
        'I have a cold. — Drink warm water.',
        'My leg hurts. — Play soccer every day.',
        'I have a toothache. — See a doctor.',
      ],
      answer: 2,
      why: ['열이 날 때 쉬라는 조언은 어울려요.', '감기에 걸렸을 때 따뜻한 물을 마시라는 조언은 어울려요.', '', '이가 아플 때 의사에게 진찰받으라는 조언은 어울려요.'],
      hint: '각 조언의 뜻을 우리말로 바꾸어 보세요.',
      explain: '다리가 아픈데 날마다 축구를 하라는 것(Play soccer every day.)은 알맞은 조언이 아니에요. 다리가 아플 때는 Get some rest.처럼 쉬라고 하는 것이 어울려요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nMy [[빈칸]] hurts. (나는 배가 아파.)',
      answer: ['stomach'],
      hint: 'My ~ hurts.의 빈칸에는 아픔(ache)이 아니라 몸의 부분이 들어가요.',
      wrong: [
        { a: 'stomachache', why: 'hurts가 이미 "아프다"라는 뜻이에요. 빈칸에는 몸의 부분 낱말 stomach만 써요.' },
        { a: 'head', why: 'head는 머리예요. 배는 stomach예요.' },
      ],
      explain: 'My + 몸의 부분 + hurts.의 꼴이므로 배를 뜻하는 **stomach**을 써요. My stomach hurts.는 I have a stomachache.와 같은 뜻이에요.',
    },
    {
      id: 'a3', level: 3, type: 'order', concept: 4,
      q: '대화가 자연스럽게 이어지도록 순서대로 놓으세요.',
      choices: ["A: What's the matter?", 'B: I have a fever.', "A: That's too bad. Go to bed early.", 'B: Okay. Thank you.'],
      answer: [0, 1, 2, 3],
      hint: '묻기 → 아픈 곳 말하기 → 걱정과 조언 → 고마움의 순서예요.',
      explain: 'A가 어디가 아픈지 묻고(What\'s the matter?), B가 열이 난다고 답해요. A가 걱정하며 일찍 자라고 조언하면(That\'s too bad. Go to bed early.), B가 고맙다고 말해요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 2,
      q: '쪽지를 읽고 물음에 답하세요.\n\nDear Ms. Kim,\nHayun has a cold. She has a fever, too. She can\'t come to school today. She will see a doctor.\nFrom Hayun\'s mom\n\n쪽지의 내용과 **맞는** 것은 무엇일까요?',
      choices: ['하윤이는 감기에 걸렸어요.', '하윤이는 이가 아파요.', '하윤이는 오늘 학교에 와요.', '하윤이는 열이 나지 않아요.'],
      answer: 0,
      why: ['', 'toothache라는 말은 없어요. 쪽지에는 cold와 fever가 나와요.', 'She can\'t come to school today.는 오늘 학교에 올 수 없다는 뜻이에요.', 'She has a fever, too.는 열도 난다는 뜻이에요.'],
      hint: 'has a cold, has a fever가 무슨 뜻인지 떠올려 보세요. 하윤이는 한 사람이라 have 대신 has를 써요.',
      explain: 'Hayun has a cold.는 "하윤이는 감기에 걸렸다."라는 뜻이에요. 열도 나고(She has a fever, too.), 오늘 학교에 올 수 없고, 병원에 갈 거예요.',
    },
  ],

  deeper: [
    {
      title: 'I have a cold.와 I\'m cold.는 달라요',
      body: 'cold는 "추운"이라는 뜻도 있고 "감기"라는 뜻도 있어요.\n\n- **I\'m cold.** — 나는 추워. (몸이 차가운 느낌)\n- **I have a cold.** — 나는 감기에 걸렸어. (병)\n\nhave a를 붙이면 "감기를 가지고 있다", 곧 감기에 걸렸다는 뜻이 돼요. 그래서 I have a fever.(열이 나.), I have a headache.(머리가 아파.)도 모두 have를 써요.\n\n아픈 사람이 he, she, 민수처럼 나도 너도 아닌 **한 사람**일 때는 have 대신 **has**를 써요. 예: Minsu has a cold.(민수는 감기에 걸렸어.)',
    },
  ],

  faq: [
    {
      q: 'What\'s wrong?이랑 What\'s the matter?는 뭐가 달라요?',
      a: '둘 다 "무슨 일이야? 어디 아프니?"라는 뜻이라 바꾸어 써도 돼요. 대답도 똑같이 I have a headache.처럼 하면 돼요.',
    },
    {
      q: 'I have a headache.에서 a는 왜 붙여요?',
      a: '영어에서는 두통, 열, 감기를 "하나 가지고 있다"고 생각해서 a를 붙여 말해요. I have a fever., I have a cold.처럼 a를 함께 외워 두면 편해요.',
    },
    {
      q: 'My leg hurts.에서 hurts에 왜 s가 붙어요?',
      a: '주어 My leg가 나도 너도 아닌 "다리 하나"이기 때문이에요. 5학년에서 She gets up at six.처럼 he, she가 주어일 때 동사에 s를 붙인 것과 같은 규칙이에요.',
    },
    {
      q: '팔이 아플 때 armache라고 해도 돼요?',
      a: 'armache, legache는 잘 쓰지 않아요. ache를 붙여 쓰는 낱말은 headache, toothache, stomachache처럼 정해져 있어요. 팔이나 다리가 아플 때는 My arm hurts., My leg hurts.라고 말해요.',
    },
  ],

  mistakes: [
    'I have headache.처럼 a를 빠뜨리는 실수 — I have a headache.처럼 a를 넣어요.',
    'My leg hurt.처럼 s를 빠뜨리는 실수 — 다리 하나(My leg)가 주어이면 My leg hurts.처럼 s를 붙여요.',
    'I have a cold.를 "추워."로 아는 실수 — "감기에 걸렸어."예요. "추워."는 I\'m cold.예요.',
  ],

  gens: [
    {
      id: 'symptom-sentence',
      level: 1,
      title: '아픈 곳을 영어 문장으로 말하기',
      make: function (R) {
        var LIST = [
          ['머리가 아파요.', 'I have a headache.'],
          ['이가 아파요.', 'I have a toothache.'],
          ['배가 아파요.', 'I have a stomachache.'],
          ['열이 나요.', 'I have a fever.'],
          ['감기에 걸렸어요.', 'I have a cold.'],
          ['다리가 아파요.', 'My leg hurts.'],
          ['팔이 아파요.', 'My arm hurts.'],
        ];
        var pick = R.sample(LIST, 4);
        var target = pick[0];
        var korOf = {};
        LIST.forEach(function (x) { korOf[x[1]] = x[0]; });
        var c = R.choices(target[1], pick.slice(1).map(function (x) { return x[1]; }));
        return {
          type: 'choice', concept: 2,
          q: '우리말 뜻에 맞는 영어 문장을 고르세요.\n\n"' + target[0] + '"',
          choices: c.choices,
          answer: c.answer,
          why: c.choices.map(function (s) { return s === target[1] ? '' : '그 문장은 "' + korOf[s] + '"라는 뜻이에요.'; }),
          explain: '"' + target[0] + '"를 영어로 하면 **' + target[1] + '**\n\n증상은 I have a ~., 팔·다리처럼 몸의 부분이 아플 때는 My ~ hurts.로 말해요.',
        };
      },
    },
    {
      id: 'fill-body-word',
      level: 2,
      title: '빈칸에 몸의 부분·증상 낱말 넣기',
      make: function (R) {
        var MEAN = { headache: '두통', toothache: '치통', stomachache: '복통', fever: '열', cold: '감기', head: '머리', tooth: '이', stomach: '배', arm: '팔', leg: '다리' };
        var A = [['headache', '나는 머리가 아파.', 'head'], ['toothache', '나는 이가 아파.', 'tooth'], ['stomachache', '나는 배가 아파.', 'stomach'], ['fever', '나는 열이 나.', ''], ['cold', '나는 감기에 걸렸어.', '']];
        var B = [['head', '나는 머리가 아파.', 'headache'], ['tooth', '나는 이가 아파.', 'toothache'], ['stomach', '나는 배가 아파.', 'stomachache'], ['arm', '나는 팔이 아파.', ''], ['leg', '나는 다리가 아파.', '']];
        var frameA = R.bool();
        var list = frameA ? A : B;
        var t = R.pick(list);
        var others = R.shuffle(list.filter(function (x) { return x[0] !== t[0]; }).map(function (x) { return x[0]; }));
        var wrongs = (t[2] ? [t[2]] : []).concat(others);
        var c = R.choices(t[0], wrongs);
        var sentence = frameA ? 'I have a [[빈칸]].' : 'My [[빈칸]] hurts.';
        return {
          type: 'choice', concept: frameA && t[2] ? 1 : 2,
          q: '우리말 뜻에 맞게 빈칸에 알맞은 낱말을 고르세요.\n\n' + sentence + '\n(' + t[1] + ')',
          choices: c.choices,
          answer: c.answer,
          why: c.choices.map(function (w) {
            if (w === t[0]) return '';
            if (w === t[2]) {
              return frameA
                ? '몸의 부분 낱말만 골랐어요. I have a 다음에는 ache가 붙은 증상 낱말이 와요.'
                : 'hurts가 이미 "아프다"라는 뜻이라서 빈칸에는 ache가 없는 몸의 부분 낱말이 와요.';
            }
            return '그 낱말은 "' + MEAN[w] + '"' + R.josa(MEAN[w], '이라는/라는') + ' 뜻이에요.';
          }),
          explain: frameA
            ? '증상을 말할 때는 I have a + 증상.으로 말해요. ' + t[0] + '의 뜻은 "' + MEAN[t[0]] + '"이므로 답은 **I have a ' + t[0] + '.**'
            : '몸의 부분이 아플 때는 My + 몸의 부분 + hurts.로 말해요. ' + t[0] + '의 뜻은 "' + MEAN[t[0]] + '"이므로 답은 **My ' + t[0] + ' hurts.**',
        };
      },
    },
  ],

  vocab: [
    { w: 'head', m: '머리', ex: 'I hit my head on the door.', exm: '나는 문에 머리를 부딪혔어요.' },
    { w: 'tooth', m: '이, 치아', ex: 'I brush my teeth every day. One tooth is loose.', exm: '나는 날마다 이를 닦아요. 이 하나가 흔들려요.' },
    { w: 'stomach', m: '배, 위', ex: 'My stomach is full.', exm: '나는 배가 불러요.' },
    { w: 'arm', m: '팔', ex: 'My arm hurts.', exm: '나는 팔이 아파요.' },
    { w: 'leg', m: '다리', ex: 'A dog has four legs.', exm: '개는 다리가 네 개 있어요.' },
    { w: 'headache', m: '두통', ex: 'I have a headache.', exm: '나는 머리가 아파요.' },
    { w: 'toothache', m: '치통', ex: 'She has a toothache.', exm: '그 아이는 이가 아파요.' },
    { w: 'stomachache', m: '복통', ex: 'I have a stomachache.', exm: '나는 배가 아파요.' },
    { w: 'fever', m: '열', ex: 'He has a fever.', exm: '그 아이는 열이 나요.' },
    { w: 'cold', m: '감기', ex: 'I have a cold.', exm: '나는 감기에 걸렸어요.' },
    { w: 'hurt', m: '아프다', ex: 'My leg hurts.', exm: '나는 다리가 아파요.' },
    { w: 'rest', m: '휴식, 쉼', ex: 'Get some rest.', exm: '좀 쉬어.' },
    { w: 'warm', m: '따뜻한', ex: 'Drink warm water.', exm: '따뜻한 물을 마셔.' },
    { w: 'doctor', m: '의사', ex: 'See a doctor.', exm: '의사에게 진찰받아 봐.' },
    { w: 'wrong', m: '잘못된, 탈이 난', ex: "What's wrong?", exm: '무슨 일이야?' },
    { w: 'matter', m: '문제, 일', ex: "What's the matter?", exm: '무슨 일이야?' },
    { w: 'soon', m: '곧, 빨리', ex: 'Get well soon.', exm: '빨리 나아.' },
  ],
});
