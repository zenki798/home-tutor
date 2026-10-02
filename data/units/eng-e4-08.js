/* 4학년 영어 · 물건 값 묻고 답하기 */
Tutor.registerUnit({
  id: 'eng-e4-08',
  course: 'eng-e4',
  title: '물건 값 묻고 답하기',
  summary: "How much is it?으로 물건값을 묻고 It's 500 won.처럼 답하며, 가게에서 주고받는 말을 익혀요.",
  goals: [
    "How much is it?으로 값을 묻고 It's ~ won.으로 답할 수 있어요.",
    'hundred, thousand를 써서 값을 영어로 읽을 수 있어요.',
    '문구점 물건 낱말(pen, notebook, ball, cap, robot)을 알고 쓸 수 있어요.',
    '물건을 사고팔 때 Here you are./Thank you.를 주고받을 수 있어요.',
  ],
  standards: ['[4영02-08]', '[4영01-06]', '[4영02-04]'],

  concepts: [
    {
      title: 'How much is it? — 값 묻고 답하기',
      body: "물건값을 물을 때는 **How much is it?** (얼마예요?)이라고 해요. 물건 이름을 넣어 **How much is this pen?** (이 펜은 얼마예요?)처럼 물을 수도 있어요.\n\n대답은 **It's ~ won.** (~원이에요.)으로 해요.\n\n- A: **How much is it?**\n- B: **It's 500 won.** (500원이에요.)\n\n> ⚠️ 우리나라 돈 단위 **won** 은 값이 커도 -s 를 붙이지 않아요. 500 wons 가 아니라 **500 won** 이에요.\n\n> 💡 3학년 때 배운 How many ~? 는 \"몇 개\"를 묻는 말이고, How much ~? 는 \"얼마\"를 묻는 말이에요.",
      easy: '가게에서 마음에 드는 물건을 들고 "이거 얼마예요?"라고 묻는 장면을 떠올려 보세요.\n\n- "얼마예요?" → **How much is it?**\n- "500원이에요." → **It\'s 500 won.**\n\nwon 은 우리말 "원"과 소리도 뜻도 같아요.',
      check: {
        type: 'choice',
        q: 'How much is it? 의 뜻은 무엇일까요?',
        choices: ['얼마예요?', '몇 개예요?', '몇 시예요?'],
        answer: 0,
        why: ['', '몇 개인지는 How many ~? 로 물어요.', '몇 시인지는 What time is it? 으로 물어요.'],
        explain: 'How much is it? 은 "얼마예요?"라고 값을 묻는 말이에요. It\'s 500 won. 처럼 답해요.',
      },
    },
    {
      title: '값을 나타내는 수 — hundred 와 thousand',
      body: "백은 **hundred**, 천은 **thousand** 예요. 앞에 수 낱말을 붙여 몇 백, 몇 천을 말해요.\n\n| 값 | 영어 |\n|---|---|\n| 100원 | **one hundred** won |\n| 500원 | **five hundred** won |\n| 1,000원 | **one thousand** won |\n| 2,000원 | **two thousand** won |\n\n천과 백이 함께 있으면 **천을 먼저, 백을 나중에** 말해요.\n\n- 1,500원 = **one thousand five hundred** won\n\n> ⚠️ five hundred, two thousand 처럼 앞의 수가 둘 이상이어도 hundred, thousand 에는 **-s 를 붙이지 않아요.**",
      easy: '우리말로 "오백"이라고 할 때 "오"와 "백"을 붙여 말하지요? 영어도 똑같아요.\n\n- 오(five) + 백(hundred) → five hundred\n- 이(two) + 천(thousand) → two thousand\n\n"백"은 hundred, "천"은 thousand 라는 이름표만 기억하면 돼요.',
      check: {
        type: 'ox',
        q: '2,000원은 two thousand won 이라고 읽어요.',
        answer: true,
        explain: '2(two) + 천(thousand)이라서 two thousand won 이에요. thousand 에 -s 를 붙이지 않는 것도 기억해요.',
      },
    },
    {
      title: '문구점 물건 낱말',
      body: "문구점에서 자주 보는 물건 낱말이에요.\n\n| 낱말 | 뜻 | 값 묻기 |\n|---|---|---|\n| pen | 펜 | How much is this **pen**? |\n| notebook | 공책 | How much is this **notebook**? |\n| ball | 공 | How much is this **ball**? |\n| cap | (앞에 챙이 있는) 모자 | How much is this **cap**? |\n| robot | 로봇 | How much is this **robot**? |\n\n**this** 는 \"이\"라는 뜻으로, 가까이 있는 물건을 가리켜요. 3학년 때 배운 pencil(연필), eraser(지우개)로도 바꾸어 말할 수 있어요.",
      easy: '문구점 진열대에 영어 이름표가 붙어 있다고 상상해 보세요.\n\n펜에는 pen, 공책에는 notebook, 공에는 ball, 모자에는 cap, 로봇에는 robot.\n\n이름표만 바꿔 끼우면 How much is this ~? 로 무엇이든 값을 물을 수 있어요.',
      check: {
        type: 'choice',
        q: 'notebook 의 뜻은 무엇일까요?',
        choices: ['공책', '펜', '로봇'],
        answer: 0,
        why: ['', '펜은 pen 이에요.', '로봇은 robot 이에요.'],
        explain: 'notebook 은 공책이에요. How much is this notebook? 은 "이 공책은 얼마예요?"라는 뜻이에요.',
      },
    },
    {
      title: '물건을 사고팔 때 주고받는 말',
      body: "물건값을 듣고 돈을 건넬 때는 **Here you are.** (여기 있어요.)라고 말해요. 돈이나 물건을 받은 사람은 **Thank you.** (고맙습니다.)라고 해요.\n\n- 손님: How much is this cap?\n- 주인: It's 3,000 won.\n- 손님: **Here you are.** (돈을 건네며)\n- 주인: **Thank you.**\n\n> 💡 Here you are. 는 가게에서뿐 아니라 친구에게 물건을 건넬 때도 쓰는 말이에요. 3학년 때 학용품을 빌려줄 때도 썼지요.",
      easy: '손에서 손으로 무언가를 건네는 순간에 하는 말이 **Here you are.** 예요.\n\n돈을 내밀면서 Here you are., 받은 사람은 고개를 숙이며 Thank you.\n\n"주는 사람 말", "받는 사람 말"로 나누어 기억해요.',
      check: {
        type: 'choice',
        q: '가게에서 값을 듣고 돈을 건네며 하는 말은 무엇일까요?',
        choices: ['Here you are.', 'How much is it?', "You're welcome."],
        answer: 0,
        why: ['', '값을 묻는 말이에요. 돈을 건넬 때는 Here you are. 라고 해요.', "고맙다는 말에 \"천만에.\"라고 답하는 말이에요."],
        explain: 'Here you are. 는 "여기 있어요."라는 뜻으로, 돈이나 물건을 건넬 때 써요.',
      },
    },
    {
      title: '가격표를 보고 값 말하기',
      body: "가격표의 수를 영어로 읽을 때는 쉼표(,)를 보면 쉬워요. **쉼표 앞은 thousand(천), 쉼표 뒤의 첫 자리는 hundred(백)** 예요.\n\n| 가격표 | 영어 |\n|---|---|\n| 800원 | It's **eight hundred** won. |\n| 3,000원 | It's **three thousand** won. |\n| 2,500원 | It's **two thousand five hundred** won. |\n\n2,500원은 쉼표 앞의 2 → two thousand, 쉼표 뒤의 5 → five hundred, 그리고 won 을 붙여요.",
      easy: '가격표를 쉼표에서 둘로 나눈다고 생각해 보세요.\n\n**2 , 500**\n\n- 왼쪽 2 → two thousand\n- 오른쪽 500 → five hundred\n\n두 조각을 왼쪽부터 이어 읽고 끝에 won 을 붙이면 돼요.',
      fig: {
        type: 'svg',
        alt: '2,500원이라고 쓰인 가격표',
        svg: '<svg viewBox="0 0 240 110"><path d="M40 15 L220 15 L220 95 L40 95 L10 55 Z" fill="var(--fig-1)" stroke="currentColor" stroke-width="2"/><circle cx="34" cy="55" r="5" fill="none" stroke="currentColor" stroke-width="2"/><text x="130" y="66" text-anchor="middle" font-size="30" fill="currentColor">2,500원</text></svg>',
      },
      check: {
        type: 'choice',
        q: '가격표에 3,000원이라고 쓰여 있어요. 값을 영어로 바르게 말한 것은 무엇일까요?',
        choices: ["It's three thousand won.", "It's three hundred won.", "It's thirty won."],
        answer: 0,
        why: ['', 'three hundred 는 300 이에요. 쉼표 앞의 3은 천의 자리예요.', 'thirty 는 30 이에요.'],
        explain: '쉼표 앞의 3은 천의 자리라서 three thousand 예요. 그래서 It\'s three thousand won. 이에요.',
      },
    },
  ],

  examples: [
    {
      q: '연필 가격표에 700원이라고 쓰여 있어요. 친구가 How much is this pencil? 이라고 물으면 어떻게 대답할까요?',
      steps: [
        '700은 7(seven)과 백(hundred)이에요. 그래서 seven hundred 예요.',
        'hundred 에는 -s 를 붙이지 않고, 끝에 won 을 붙여요.',
        "값은 It's ~ won. 으로 말해요.",
      ],
      answer: "**It's seven hundred won.**",
    },
    {
      q: '문구점에서 1,500원짜리 공책을 사요. 값을 묻고, 듣고, 돈을 건네는 대화를 만들어 보세요.',
      steps: [
        '값을 물을 때: How much is this notebook?',
        "주인의 대답: 1,500원은 쉼표 앞 1 → one thousand, 쉼표 뒤 5 → five hundred 이므로 It's one thousand five hundred won.",
        '돈을 건넬 때: Here you are.',
        '주인이 돈을 받으며: Thank you.',
      ],
      answer: "**How much is this notebook?** → **It's one thousand five hundred won.** → **Here you are.** → **Thank you.**",
    },
  ],

  terms: [
    { term: 'How much is it?', def: '"얼마예요?"라고 물건값을 묻는 말이에요. 예: How much is this pen?' },
    { term: 'won', def: '우리나라 돈의 단위 "원"이에요. 값이 커도 -s 를 붙이지 않아요. 예: 500 won' },
    { term: 'hundred', def: '100, 곧 "백"이에요. five hundred 는 500 이에요.' },
    { term: 'thousand', def: '1,000, 곧 "천"이에요. two thousand 는 2,000 이에요.' },
    { term: 'Here you are.', def: '"여기 있어요."라는 뜻으로, 돈이나 물건을 건넬 때 쓰는 말이에요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '"얼마예요?"라고 값을 물을 때 쓰는 말은 무엇일까요?',
      choices: ['How much is it?', 'How many apples?', 'What time is it?', "What's this?"],
      answer: 0,
      why: [
        '',
        '"사과가 몇 개예요?"라고 개수를 묻는 말이에요.',
        '"몇 시예요?"라고 시각을 묻는 말이에요.',
        '"이것은 무엇이에요?"라고 물건 이름을 묻는 말이에요.',
      ],
      explain: '값을 물을 때는 How much is it? 이라고 해요. 개수를 물을 때 쓰는 How many 와 헷갈리지 않게 해요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: 'one thousand 는 어떤 수일까요?',
      choices: ['1,000', '100', '10,000', '1,100'],
      answer: 0,
      why: ['', '100 은 one hundred 예요.', '10,000 은 ten thousand 예요. one thousand 의 10배예요.', '1,100 은 one thousand one hundred 예요.'],
      explain: 'thousand 는 천이에요. 그래서 one thousand 는 1,000 이에요.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 2,
      q: '"공책"을 영어로 쓰세요.',
      answer: ['notebook'],
      wrong: [
        { a: 'note', why: 'note 는 짧은 쪽지나 메모예요. 공책은 note 와 book 을 붙인 notebook 이에요.' },
        { a: 'book', why: 'book 은 책이에요. 공책은 notebook 이에요.' },
      ],
      explain: '공책은 notebook 이에요. note(메모)와 book(책)을 붙여 한 낱말로 써요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: '500원은 five hundreds won 이라고 읽어요.',
      answer: false,
      explain: 'hundred 에는 -s 를 붙이지 않아요. 500원은 five hundred won 이에요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: 'Here you are. 는 언제 하는 말일까요?',
      choices: ['돈이나 물건을 건넬 때', '값을 물을 때', '시각을 물을 때', '헤어질 때'],
      answer: 0,
      why: [
        '',
        '값을 물을 때는 How much is it? 이라고 해요.',
        '시각을 물을 때는 What time is it? 이라고 해요.',
        '헤어질 때는 Goodbye. 나 See you later. 라고 해요.',
      ],
      explain: 'Here you are. 는 "여기 있어요."라는 뜻으로, 돈이나 물건을 건넬 때 써요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 4,
      q: '가격표를 보고 물음에 알맞은 대답을 고르세요.\n\n연필 가격표: **300원**\n\nHow much is this pencil?',
      choices: ["It's three hundred won.", "It's thirty won.", "It's three thousand won.", "It's three hundreds won."],
      answer: 0,
      why: [
        '',
        'thirty 는 30 이에요. 300 은 three hundred 예요.',
        'three thousand 는 3,000 이에요. 300 은 백이 세 개예요.',
        'hundred 에는 -s 를 붙이지 않아요.',
      ],
      explain: '300은 3(three)과 백(hundred)이므로 It\'s three hundred won. 이에요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 1,
      q: '빈칸에 알맞은 낱말을 쓰세요. (500원이에요.)\n\nIt\'s five [[hundred]] won.',
      answer: ['hundred'],
      wrong: [
        { a: 'hundreds', why: 'hundred 에는 -s 를 붙이지 않아요.' },
        { a: 'thousand', why: 'thousand 는 천이에요. 500 은 백이 다섯 개라서 hundred 를 써요.' },
      ],
      explain: '500은 5(five)와 백(hundred)이에요. 그래서 It\'s five hundred won. 이에요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 0,
      q: '"이 로봇은 얼마예요?"가 되도록 낱말을 순서대로 놓으세요.',
      choices: ['How', 'much', 'is', 'this robot?'],
      answer: [0, 1, 2, 3],
      hint: 'How much(얼마)가 한 덩어리로 맨 앞에 와요.',
      explain: 'How much(얼마) + is(이에요) + this robot(이 로봇)? 그래서 How much is this robot? 이에요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: "A: How much is this ball?\nB: It's 1,000 won.\nA: [[Here you are.]]\nB: Thank you.\n\n빈칸에 들어갈 말로 알맞은 것은 무엇일까요?",
      choices: ['Here you are.', "You're welcome.", 'How much is it?', "It's 1,000 won."],
      answer: 0,
      why: [
        '',
        '고맙다는 말에 대답하는 말이에요. 여기서는 돈을 건네는 말이 와야 해요.',
        '값은 이미 들었어요. 이제 돈을 건넬 차례예요.',
        '값을 알려 주는 주인의 말이에요. 손님은 돈을 건네야 해요.',
      ],
      hint: 'B가 바로 다음에 Thank you. 라고 한 까닭을 생각해 보세요.',
      explain: '값(1,000원)을 들은 손님이 돈을 건네며 Here you are. 라고 하자 주인이 Thank you. 라고 했어요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: '원', concept: 1,
      q: "가게 주인이 이렇게 말했어요. 물건값은 몇 원일까요?\n\nIt's two thousand won.",
      answer: '2000',
      wrong: [{ a: '200', why: 'thousand 는 천이에요. 200 은 two hundred 예요.' }],
      explain: 'two(2) + thousand(천)이므로 2,000원이에요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 0,
      q: "대화를 읽고 답하세요.\n\nSuah: How much is this cap?\nMan: It's 3,000 won.\nSuah: How much is this robot?\nMan: It's 5,000 won.\n\n로봇은 얼마일까요?",
      choices: ['5,000원', '3,000원', '500원', '8,000원'],
      answer: 0,
      why: [
        '',
        '3,000원은 모자(cap)의 값이에요.',
        '대화에서 로봇은 5,000 won 이에요. 쉼표를 확인해 보세요.',
        '모자와 로봇의 값을 더한 금액이에요. 로봇 하나의 값을 물었어요.',
      ],
      hint: 'How much is this robot? 바로 다음 대답을 보세요.',
      explain: 'How much is this robot? 에 It\'s 5,000 won. 이라고 답했어요. 그래서 로봇은 5,000원이에요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 0,
      q: '공책의 값을 묻고 싶어요. 알맞은 말은 무엇일까요?',
      choices: ['How much is this notebook?', 'How many notebooks?', 'Is this your notebook?', 'Where is my notebook?'],
      answer: 0,
      why: [
        '',
        '공책이 몇 권인지 개수를 묻는 말이에요.',
        '공책의 주인을 묻는 말이에요.',
        '공책이 어디 있는지 묻는 말이에요.',
      ],
      explain: '값은 How much 로 물어요. How much is this notebook? 은 "이 공책은 얼마예요?"라는 뜻이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '원', concept: 1,
      q: "문구점 주인이 이렇게 말했어요.\n\n- pen: It's five hundred won.\n- notebook: It's one thousand won.\n\n펜 하나와 공책 하나를 사면 모두 몇 원일까요?",
      answer: '1500',
      hint: '먼저 두 값을 각각 숫자로 바꾸어 보세요.',
      wrong: [
        { a: '600', why: 'one thousand 는 1,000 이에요. 100 이 아니에요.' },
        { a: '6000', why: 'five hundred 는 500 이에요. 5,000 이 아니에요.' },
      ],
      explain: 'five hundred 는 500원, one thousand 는 1,000원이에요. 모두 더하면 500 + 1,000 = 1,500원이에요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: '가격표에 1,500원이라고 쓰여 있어요. 값을 영어로 바르게 읽은 것은 무엇일까요?',
      choices: ['one thousand five hundred won', 'one hundred five thousand won', 'fifteen won', 'one thousand five won'],
      answer: 0,
      why: [
        '',
        '천과 백의 자리가 바뀌었어요. 쉼표 앞이 천(thousand), 쉼표 뒤 첫 자리가 백(hundred)이에요.',
        'fifteen 은 15 예요.',
        '500 은 five 가 아니라 five hundred 예요. hundred 가 빠졌어요.',
      ],
      hint: '쉼표 앞의 1, 쉼표 뒤의 5를 차례로 읽어요.',
      explain: '쉼표 앞의 1은 one thousand, 쉼표 뒤의 5는 five hundred 예요. 천을 먼저, 백을 나중에 읽어 one thousand five hundred won 이에요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 1,
      q: '바르지 **않은** 문장은 무엇일까요?',
      choices: ["It's two thousand won.", "It's five hundred won.", "It's three thousands won.", "It's one hundred won."],
      answer: 2,
      why: [
        "It's two thousand won. 은 바른 문장이에요.",
        "It's five hundred won. 은 바른 문장이에요.",
        '',
        "It's one hundred won. 은 바른 문장이에요.",
      ],
      explain: 'thousand 에는 -s 를 붙이지 않아요. 3,000원은 It\'s three thousand won. 이라고 해요.',
    },
    {
      id: 'a4', level: 3, type: 'order', concept: 3,
      q: '가게에서 펜을 사는 자연스러운 대화가 되도록 순서대로 놓으세요.',
      choices: ['How much is this pen?', "It's 800 won.", 'Here you are.', 'Thank you.'],
      answer: [0, 1, 2, 3],
      hint: '값 묻기 → 값 알려 주기 → 돈 건네기 → 고마워하기 순서예요.',
      explain: '손님이 값을 묻고(How much is this pen?), 주인이 답하고(It\'s 800 won.), 손님이 돈을 건네고(Here you are.), 주인이 고마워해요(Thank you.).',
    },
  ],

  deeper: [
    {
      title: '나라마다 다른 돈 단위',
      body: "우리나라 돈 단위는 **won**(원)이에요. 다른 나라는 다른 단위를 써요. 미국은 dollar(달러), 일본은 yen(엔), 중국은 yuan(위안)을 써요.\n\n재미있게도 won 과 yen 은 늘 -s 없이 써요(500 won, 500 yen). 하지만 dollar 는 둘 이상이면 dollars 라고 해요. 단위마다 습관이 달라요.\n\n5학년에서는 음식을 주문하고 물건을 사는 말을 더 배워요.",
    },
    {
      title: '더 큰 값은 어떻게 읽을까?',
      body: "10,000원은 영어로 **ten thousand** won 이에요. 우리말에는 \"만\"이라는 단위가 있지만, 영어에는 따로 없어서 \"천이 열 개\"라고 말해요.\n\n그래서 50,000원은 fifty thousand won 이 돼요. 쉼표 앞의 수를 읽고 thousand 를 붙이면 된다는 점은 같아요.",
    },
  ],

  faq: [
    {
      q: 'How much 랑 How many 는 뭐가 달라요?',
      a: 'How many 는 "몇 개"를 물어요(How many apples?). How much 는 "얼마"를 물어요(How much is it?). 값을 물을 때는 How much 를 써요.',
    },
    {
      q: 'five hundred 인데 왜 hundreds 라고 안 해요?',
      a: '수를 말할 때 hundred 와 thousand 는 앞에 어떤 수가 와도 모양이 그대로예요. 500 은 five hundred, 3,000 은 three thousand 예요.',
    },
    {
      q: '값을 말할 때 숫자로 써도 돼요?',
      a: "네. 글로 쓸 때는 It's 500 won. 처럼 숫자로 써도 돼요. 소리 내어 말할 때 five hundred won 이라고 읽으면 돼요.",
    },
  ],

  mistakes: [
    '500 wons 처럼 won 에 -s 를 붙이는 실수 — won 은 값이 커도 그대로 써요: 500 won.',
    'five hundreds, two thousands 처럼 -s 를 붙이는 실수 — hundred, thousand 는 그대로 써요.',
    '값을 How many 로 묻는 실수 — 값은 How much is it? 으로 물어요.',
  ],

  gens: [
    {
      id: 'price-to-words',
      level: 1,
      title: '가격표의 값을 영어로 말하기',
      make: function (R) {
        var W = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        var TY = { 1: 'ten', 2: 'twenty', 3: 'thirty', 4: 'forty', 5: 'fifty', 6: 'sixty' };
        function words(t, h, sT, sH) {
          var parts = [];
          if (t) parts.push(W[t] + ' thousand' + (sT ? 's' : ''));
          if (h) parts.push(W[h] + ' hundred' + (sH ? 's' : ''));
          return parts.join(' ');
        }
        function say(w, wons) { return "It's " + w + (wons ? ' wons.' : ' won.'); }
        var kind = R.pick(['h', 't', 'th']);
        var t = 0, h = 0;
        if (kind === 'h') h = R.int(1, 9);
        else if (kind === 't') t = R.int(1, 5);
        else { t = R.int(1, 2); h = R.int(1, 9); }
        var price = t * 1000 + h * 100;
        var item = R.pick([['pen', '펜'], ['notebook', '공책'], ['ball', '공'], ['cap', '모자'], ['robot', '로봇']]);
        var correct = say(words(t, h));
        var cands = [];
        cands.push([say(words(t, h), true), 'won 은 값이 커도 -s 를 붙이지 않아요.']);
        if (t > 1 || h > 1) cands.push([say(words(t, h, t > 1, h > 1)), 'hundred, thousand 에는 -s 를 붙이지 않아요.']);
        if (kind === 'h') {
          cands.push([say(words(h, 0)), 'hundred(백)와 thousand(천)를 헷갈렸어요. 쉼표가 없으면 백의 자리부터 읽어요.']);
          if (TY[h]) cands.push([say(TY[h]), TY[h] + '(' + (h * 10) + ')처럼 몇십을 나타내는 낱말과 헷갈렸어요. 백의 자리는 hundred 를 붙여요.']);
          cands.push([say(words(0, h === 9 ? 8 : h + 1)), '백의 자리 수를 다시 보세요.']);
        } else if (kind === 't') {
          cands.push([say(words(0, t)), 'thousand(천)와 hundred(백)를 헷갈렸어요. 쉼표 앞의 수는 천의 자리예요.']);
          cands.push([say(words(t === 1 ? 2 : t - 1, 0)), '천의 자리 수를 다시 보세요.']);
        } else {
          cands.push([say(W[t] + ' thousand ' + W[h]), '쉼표 뒤의 수는 백의 자리라서 hundred 를 붙여요.']);
          cands.push([say(W[h] + ' thousand ' + W[t] + ' hundred'), '천과 백의 자리를 바꾸어 읽었어요. 쉼표 앞이 천(thousand)이에요.']);
          cands.push([say(words(t, h === 9 ? 8 : h + 1)), '백의 자리 수를 다시 보세요.']);
        }
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        var how;
        if (kind === 'h') how = h + '00원은 백이 ' + h + '개라서 ' + W[h] + ' hundred.';
        else if (kind === 't') how = t + ',000원은 천이 ' + t + '개라서 ' + W[t] + ' thousand.';
        else how = '쉼표 앞의 ' + t + ' → ' + W[t] + ' thousand, 쉼표 뒤의 ' + h + ' → ' + W[h] + ' hundred.';
        return {
          type: 'choice', concept: 4,
          q: '가격표를 보고 How much is this ' + item[0] + '? 에 알맞은 대답을 고르세요.\n\n' + item[1] + ' 가격표: **' + R.fmt.num(price) + '원**',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: how + ' 끝에 won 을 붙여요: ' + correct,
        };
      },
    },
    {
      id: 'words-to-price',
      level: 2,
      title: '영어로 들은 값을 숫자로 쓰기',
      make: function (R) {
        var W = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        var kind = R.pick(['h', 't', 'th']);
        var t = 0, h = 0;
        if (kind === 'h') h = R.int(1, 9);
        else if (kind === 't') t = R.int(1, 5);
        else { t = R.int(1, 2); h = R.int(1, 9); }
        var price = t * 1000 + h * 100;
        var parts = [];
        if (t) parts.push(W[t] + ' thousand');
        if (h) parts.push(W[h] + ' hundred');
        var said = "It's " + parts.join(' ') + ' won.';
        var item = R.pick([['pen', '펜'], ['notebook', '공책'], ['ball', '공'], ['cap', '모자'], ['robot', '로봇']]);
        var wrong = [];
        var how;
        if (kind === 'h') {
          wrong.push({ a: String(h * 1000), why: 'hundred 는 백이에요. thousand(천)와 헷갈렸어요.' });
          how = W[h] + ' hundred → ' + h + '×100 = ' + R.fmt.num(price);
        } else if (kind === 't') {
          wrong.push({ a: String(t * 100), why: 'thousand 는 천이에요. hundred(백)와 헷갈렸어요.' });
          how = W[t] + ' thousand → ' + t + '×1,000 = ' + R.fmt.num(price);
        } else {
          wrong.push({ a: String(t * 1000), why: 'thousand 뒤에 오는 ' + W[h] + ' hundred(' + (h * 100) + ')까지 더해요.' });
          wrong.push({ a: String(t * 1000 + h), why: W[h] + ' hundred 는 ' + (h * 100) + R.josa(h * 100, '을/를') + ' 나타내요. ' + h + R.josa(h, '이/가') + ' 아니에요.' });
          how = W[t] + ' thousand(' + R.fmt.num(t * 1000) + ') + ' + W[h] + ' hundred(' + (h * 100) + ') = ' + R.fmt.num(price);
        }
        return {
          type: 'short', check: 'number', unit: '원', concept: 1,
          q: '문구점에서 ' + item[1] + '(' + item[0] + ')의 값을 물었더니 주인이 이렇게 답했어요. 값은 몇 원일까요?\n\n**' + said + '**',
          answer: String(price),
          wrong: wrong,
          explain: how + '\n\n그래서 ' + R.fmt.num(price) + '원이에요.',
        };
      },
    },
  ],

  vocab: [
    { w: 'pen', m: '펜', ex: 'How much is this pen?', exm: '이 펜은 얼마예요?' },
    { w: 'notebook', m: '공책', ex: 'This notebook is one thousand won.', exm: '이 공책은 1,000원이에요.' },
    { w: 'cap', m: '(앞에 챙이 있는) 모자', ex: 'I like this blue cap.', exm: '나는 이 파란 모자가 좋아요.' },
    { w: 'robot', m: '로봇', ex: 'How much is the robot?', exm: '그 로봇은 얼마예요?' },
    { w: 'ball', m: '공', ex: "The ball is five hundred won.", exm: '그 공은 500원이에요.' },
    { w: 'eraser', m: '지우개', ex: 'This eraser is three hundred won.', exm: '이 지우개는 300원이에요.' },
    { w: 'hundred', m: '100, 백', ex: "It's two hundred won.", exm: '200원이에요.' },
    { w: 'thousand', m: '1,000, 천', ex: "It's two thousand won.", exm: '2,000원이에요.' },
    { w: 'won', m: '원(우리나라 돈의 단위)', ex: "It's 500 won.", exm: '500원이에요.' },
    { w: 'how much', m: '얼마', ex: 'How much is it?', exm: '얼마예요?' },
    { w: 'here', m: '여기에', ex: 'Here you are.', exm: '여기 있어요.' },
    { w: 'store', m: '가게', ex: 'I go to the store with my mom.', exm: '나는 엄마와 가게에 가요.' },
  ],
});
