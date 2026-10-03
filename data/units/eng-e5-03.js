/* 5학년 영어 · 물건 주인 묻고 답하기 */
Tutor.registerUnit({
  id: 'eng-e5-03',
  course: 'eng-e5',
  title: '물건 주인 묻고 답하기',
  summary: "Whose ~ is this?로 물건의 주인을 묻고 It's Mina's.나 It's mine.처럼 누구의 것인지 답해요.",
  goals: [
    "Whose ~ is this?로 물건의 주인을 묻고 It's Mina's.처럼 답할 수 있어요.",
    "사람 이름 뒤에 's를 붙여 누구의 것인지 나타낼 수 있어요.",
    "mine, yours, his, hers로 '~의 것'을 말할 수 있어요.",
    "여러 개인 물건은 Whose ~ are these?로 묻고 They're ~.로 답할 수 있어요.",
  ],
  standards: ['[6영02-07]', '[6영01-04]', '[6영01-03]'],

  concepts: [
    {
      title: '주인 묻고 답하기: Whose ~ is this?',
      body: "물건이 누구의 것인지 물을 때는 **Whose** 를 써요. whose는 '누구의'라는 뜻이에요.\n\nA: **Whose** cap **is this?** (이것은 누구의 모자예요?)\nB: **It's Mina's.** (미나의 것이에요.)\n\nWhose 바로 뒤에 물건 이름을 붙여요. → Whose bag / Whose pencil / Whose umbrella\n\n대답은 It's 뒤에 주인을 말해요. It's는 It is를 줄인 말이에요.\n\n> 💡 내 물건인지 확인할 때는 Is this your cap? 하고 묻고, Yes, it's mine. 또는 No, it isn't. 하고 답해요.",
      easy: "교실 바닥에 모자가 떨어져 있어요. '이거 누구 모자야?' 하고 묻고 싶지요?\n\n영어로는 '누구의'를 뜻하는 Whose를 맨 앞에 두고 물건 이름을 붙여요.\n\n- 누구의 모자 → Whose cap\n- 이것은 ~이니? → is this?\n\n합치면 Whose cap is this?예요.",
      check: {
        type: 'choice',
        q: "'이것은 누구의 가방이에요?'를 영어로 바르게 말한 것은 무엇일까요?",
        choices: ['Whose bag is this?', 'Who is this bag?', 'Where is this bag?'],
        answer: 0,
        why: ['', "Who는 '누구'라는 뜻이라 '이 가방은 누구니?'처럼 이상한 말이 돼요. '누구의'는 Whose예요.", "Where는 '어디'라는 뜻이라 가방이 어디 있는지 묻는 말이에요."],
        explain: "'누구의'는 Whose예요. Whose 뒤에 물건 이름 bag을 붙이고 is this?로 끝내요.",
      },
    },
    {
      title: "이름 뒤에 's를 붙여 '~의 것' 말하기",
      body: "사람 이름이나 사람을 나타내는 말 뒤에 **'s** 를 붙이면 '~의'라는 뜻이 돼요.\n\n| 쓰는 법 | 뜻 |\n|---|---|\n| Mina's bag | 미나의 가방 |\n| Tom's ball | Tom의 공 |\n| my brother's cap | 우리 형(오빠, 남동생)의 모자 |\n| my sister's shoes | 우리 언니(누나, 여동생)의 신발 |\n\n물건 이름을 빼고 **It's Mina's.** 라고만 해도 '미나의 것이에요'라는 뜻이 돼요.\n\n> ⚠️ 's를 쓸 때 위쪽 쉼표처럼 생긴 ' (아포스트로피)를 빠뜨리지 마세요. Minas (틀림) → Mina's (맞음)",
      easy: "물건에 이름표를 붙인다고 생각해 보세요. 영어에서는 주인 이름 뒤에 's라는 작은 이름표를 달아요.\n\n- Mina + 's → Mina's (미나의 것)\n- Mina's bag → 미나의 가방\n\n's만 보면 '아, 이건 그 사람의 것이구나!' 하고 알 수 있어요.",
      check: {
        type: 'choice',
        q: "'민수의 공'을 영어로 바르게 쓴 것은 무엇일까요?",
        choices: ["Minsu's ball", 'Minsu ball', 'Minsus ball'],
        answer: 0,
        why: ['', "이름 뒤에 's가 없어서 '~의'라는 뜻이 되지 않아요.", "아포스트로피(')가 빠졌어요. s 앞에 ' 를 써요."],
        explain: "'민수의'는 이름 Minsu 뒤에 's를 붙인 Minsu's예요. 그래서 Minsu's ball이에요.",
      },
    },
    {
      title: "'~의 것'을 한 낱말로: mine, yours, his, hers",
      body: "'~의 것'을 한 낱말로 말할 때는 이런 말을 써요.\n\n| 사람 | ~의 | ~의 것 |\n|---|---|---|\n| I (나) | my | **mine** (내 것) |\n| you (너) | your | **yours** (네 것) |\n| he (그) | his | **his** (그의 것) |\n| she (그녀) | her | **hers** (그녀의 것) |\n\nmy, your, her 뒤에는 물건 이름이 와야 하지만, mine, yours, hers 뒤에는 아무것도 오지 않아요.\n\n- It's **my** cap. = It's **mine**.\n- Is it **your** pencil? = Is it **yours**?\n- It's **her** bag. = It's **hers**.\n\nhis는 '그의'도 '그의 것'도 모두 his예요.",
      easy: "'내 모자'에서 '모자'를 빼면 '내 것'이 되지요? 영어도 my cap에서 cap을 빼면 mine이 돼요.\n\n- my cap → mine\n- your cap → yours\n- her cap → hers\n- his cap → his (그대로!)\n\n물건 이름이 사라지면 모양이 바뀐다고 기억해요.",
      check: {
        type: 'choice',
        q: "**It's my pencil.** 과 뜻이 같은 문장은 무엇일까요?",
        choices: ["It's mine.", "It's my.", "It's me."],
        answer: 0,
        why: ['', 'my 뒤에는 물건 이름이 와야 해요. 물건 이름이 없으면 mine을 써요.', "me는 '나를, 나에게'라는 뜻이에요. '내 것'은 mine이에요."],
        explain: "my pencil(내 연필)에서 pencil을 빼고 '내 것'이라고 하려면 mine을 써요. It's mine.",
      },
    },
    {
      title: '여러 개일 때: Whose ~ are these?',
      body: "물건이 **두 개 이상**이거나 신발·양말·장갑처럼 짝으로 된 것일 때는 말이 조금 바뀌어요.\n\n| 하나일 때 | 여러 개일 때 |\n|---|---|\n| Whose cap **is this**? | Whose shoes **are these**? |\n| **It's** Mina's. | **They're** Mina's. |\n| It's mine. | They're mine. |\n\n- this(이것) → **these**(이것들)\n- is → **are**\n- It's → **They're** (They are를 줄인 말)\n\nA: Whose socks are these?\nB: They're mine.\n\n> 💡 shoes, socks, gloves처럼 짝을 이루는 물건은 여러 개로 말해요. 안경을 뜻하는 glasses도 마찬가지예요.",
      easy: "모자 하나를 가리킬 때와 신발 한 켤레(두 짝)를 가리킬 때는 짝을 맞추어 말을 바꿔요.\n\n- 모자 하나 → this, is, It's\n- 신발 두 짝 → these, are, They're\n\nthis는 these와, It's는 They're와 짝이에요.",
      check: {
        type: 'ox',
        q: 'Whose shoes is this?는 바르게 쓴 문장이에요.',
        answer: false,
        explain: 'shoes는 신발 두 짝, 곧 여러 개이므로 is this가 아니라 are these를 써요. 바르게 쓰면 Whose shoes are these?예요.',
      },
    },
    {
      title: '분실물 안내문 읽고 주인 찾기',
      body: "학교나 공공장소에는 잃어버린 물건을 모아 두는 **분실물 보관소**가 있어요. 영어로는 **Lost and Found** 라고 해요.\n\n분실물 안내문에는 보통 **어떤 물건인지(색깔·무늬·이름표)** 와 **어디로 오면 되는지**가 적혀 있어요.\n\n> LOST AND FOUND: Is this your umbrella? It's blue. It has a yellow star on it. The name on it is Sora. Please come to the school office.\n\n- 어떤 물건: 노란 별 무늬가 있는 파란 우산\n- 이름표: Sora → 그래서 It's Sora's.\n- 어디로: 학교 사무실(the school office)\n\n안내문 속 색깔·무늬·이름을 내가 아는 물건과 비교하면 주인을 찾을 수 있어요.",
      easy: "학교 분실물 상자를 떠올려 보세요. 주인을 찾으려면 물건의 색깔, 무늬, 이름표를 살펴보지요?\n\n영어 안내문도 같아요. 색깔 낱말(blue, red), 무늬(star, flower), 이름을 찾아 밑줄을 그으며 읽으면 주인이 보여요.",
      check: {
        type: 'choice',
        q: "안내문을 읽고 답하세요.\n\n> LOST AND FOUND: Whose cap is this? It's red. The name on it is Jiho.\n\n이 모자의 주인을 바르게 말한 것은 무엇일까요?",
        choices: ["It's Jiho's.", "It's Jiho.", "They're Jiho's."],
        answer: 0,
        why: ['', "이름 뒤에 's가 빠졌어요. It's Jiho.는 '지호예요'라는 뜻이 돼요.", "모자는 하나라서 They're가 아니라 It's로 답해요."],
        explain: "이름표에 Jiho라고 적혀 있으니 지호의 모자예요. 하나이므로 It's Jiho's.라고 해요.",
      },
    },
  ],

  examples: [
    {
      q: "대화를 완성해 보세요. (가방의 주인은 지아예요.)\n\nA: Whose bag is this?\nB: [[It's Jia's.]]",
      steps: [
        'Whose bag is this?는 가방 하나의 주인을 묻는 말이에요.',
        "가방이 하나이므로 It's로 답해요.",
        "주인 이름 Jia 뒤에 's를 붙여요. → Jia's",
      ],
      answer: "It's Jia's.",
    },
    {
      q: "물건이 여러 개가 되도록 바꿔 보세요. (연필 한 자루 → 연필 여러 자루)\n\nWhose pencil is this? It's mine.",
      steps: [
        '연필이 여러 자루이므로 pencil에 s를 붙여요. → pencils',
        'is this를 are these로 바꿔요. → Whose pencils are these?',
        "대답의 It's를 They're로 바꿔요. mine은 그대로예요. → They're mine.",
      ],
      answer: "Whose pencils are these? They're mine.",
    },
  ],

  terms: [
    { term: 'Whose', def: "'누구의'라는 뜻으로 물건의 주인을 물을 때 써요. 예: Whose cap is this?" },
    { term: "'s (아포스트로피 에스)", def: "사람 이름 뒤에 붙여 '~의, ~의 것'을 나타내요. 예: Mina's bag(미나의 가방), It's Mina's.(미나의 것이에요.)" },
    { term: 'mine, yours, his, hers', def: "'내 것, 네 것, 그의 것, 그녀의 것'처럼 '~의 것'을 한 낱말로 나타내는 말이에요. 뒤에 물건 이름을 붙이지 않아요." },
    { term: 'this와 these', def: 'this는 가까이 있는 물건 하나, these는 가까이 있는 물건 여러 개를 가리켜요.' },
    { term: '분실물 보관소', def: '잃어버린 물건을 모아 두는 곳이에요. 영어로 Lost and Found라고 해요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 1,
      q: "대화의 빈칸에 알맞은 말은 무엇일까요? (대답하는 B는 지호이고, 가방의 주인은 미나예요.)\n\nA: Whose bag is this?\nB: [[It's Mina's.]]",
      choices: ["It's Mina's.", "It's Mina.", "They're Mina's.", "It's mine."],
      answer: 0,
      why: [
        '',
        "'미나예요'라는 뜻이 돼요. 이름 뒤에 's를 붙여야 '미나의 것'이에요.",
        "가방은 하나라서 They're가 아니라 It's로 답해요.",
        "'내 것', 곧 B(지호)의 것이라는 뜻이에요. 가방의 주인은 미나예요.",
      ],
      explain: "가방이 하나이니 It's로 답하고, 주인 이름 Mina 뒤에 's를 붙여요. → It's Mina's.",
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 1,
      q: "'지호의 공책'이 되도록 빈칸에 알맞은 말을 쓰세요.\n\n[[Jiho's]] notebook",
      answer: ["Jiho's"],
      wrong: [
        { a: 'Jiho', why: "이름만 썼어요. '~의'가 되려면 이름 뒤에 's를 붙여요." },
        { a: 'Jihos', why: "아포스트로피(')가 빠졌어요. s 앞에 ' 를 써서 Jiho's로 써요." },
      ],
      explain: "'지호의'는 이름 Jiho 뒤에 's를 붙여 Jiho's로 써요. Jiho's notebook은 '지호의 공책'이에요.",
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nThis is my pencil. = This pencil is [[mine]].',
      choices: ['mine', 'my', 'me', 'I'],
      answer: 0,
      why: ['', 'my 뒤에는 물건 이름이 와야 해요. 문장이 끝나는 자리에는 mine을 써요.', "me는 '나를, 나에게'라는 뜻이에요.", "I는 '나는'이라는 뜻이에요."],
      explain: "'내 것'은 mine이에요. This pencil is mine.은 '이 연필은 내 것이에요'라는 뜻이에요.",
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 3,
      q: '양말처럼 여러 개인 물건의 주인을 물을 때는 Whose socks are these?라고 해요.',
      answer: true,
      explain: "socks는 여러 개이므로 is this 대신 are these를 써요. 대답도 They're mine.처럼 They're로 해요.",
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: "대화의 빈칸에 알맞은 말은 무엇일까요? (미나는 여자아이예요.)\n\nA: Is this Mina's eraser?\nB: Yes, it's [[hers]].",
      choices: ['hers', 'her', 'his', 'she'],
      answer: 0,
      why: ['', "her는 '그녀의'라는 뜻이라 뒤에 물건 이름이 와야 해요. '그녀의 것'은 hers예요.", "his는 남자를 가리켜요. 미나는 여자아이예요.", "she는 '그녀는'이라는 뜻이에요."],
      explain: "미나의 것, 곧 '그녀의 것'은 hers예요. Yes, it's hers.",
    },
    {
      id: 'p6', level: 1, type: 'order', concept: 0,
      q: "'이것은 누구의 우산이에요?'라는 뜻이 되도록 순서대로 놓으세요.",
      choices: ['umbrella', 'this?', 'Whose', 'is'],
      answer: [2, 0, 3, 1],
      explain: "'누구의 우산'인 Whose umbrella가 앞에 오고 is this?가 이어져요. → Whose umbrella is this?",
    },
    {
      id: 'p7', level: 1, type: 'short', concept: 2,
      q: "'네 것'이라는 뜻의 낱말을 빈칸에 쓰세요.\n\nIs this pencil [[yours]]?",
      answer: ['yours'],
      wrong: [{ a: 'your', why: "your는 '너의'라는 뜻이라 뒤에 물건 이름이 와야 해요. '네 것'은 yours예요." }],
      explain: "your pencil(네 연필)에서 pencil을 빼고 '네 것'이라고 하면 yours예요. Is this pencil yours?",
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 3,
      q: "대화의 빈칸에 알맞은 말은 무엇일까요? (양말의 주인은 Tom이에요.)\n\nA: Whose socks are these?\nB: [[They're Tom's.]]",
      choices: ["They're Tom's.", "It's Tom's.", "They're Tom.", "It's Tom."],
      answer: 0,
      why: [
        '',
        "양말은 여러 개라서 It's가 아니라 They're로 답해요.",
        "이름 뒤에 's가 빠졌어요. 's를 붙여야 'Tom의 것'이에요.",
        "It's와 's 두 군데가 틀렸어요. 여러 개이니 They're, 주인은 Tom's예요.",
      ],
      hint: '물건이 하나인지 여러 개인지 먼저 보세요.',
      explain: "are these로 물었으니 여러 개예요. They're로 답하고 이름 뒤에 's를 붙여요. → They're Tom's.",
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: "안내문을 읽고 물음에 답하세요.\n\n**LOST AND FOUND**\nWe have these things.\n- a red umbrella (library)\n- black gloves (gym)\n- a green water bottle (music room)\n\nPlease come to the school office.\n\n체육관(gym)에서 찾은 물건은 무엇일까요?",
      choices: ['검은색 장갑', '빨간 우산', '초록색 물병', '검은색 우산'],
      answer: 0,
      why: ['', '빨간 우산은 도서관(library)에서 찾은 물건이에요.', '초록색 물병은 음악실(music room)에서 찾은 물건이에요.', '검은색(black)은 장갑의 색깔이에요. 우산은 빨간색이에요.'],
      hint: 'gym이 적힌 줄을 찾아보세요.',
      explain: 'black gloves (gym)이라고 적혀 있으니 체육관에서 찾은 물건은 검은색 장갑이에요.',
    },
    {
      id: 'p10', level: 2, type: 'short', concept: 2,
      q: '빈칸에 알맞은 낱말을 쓰세요.\n\nA: Is this your pencil case?\nB: Yes, it\'s [[mine]].',
      answer: ['mine'],
      wrong: [
        { a: 'my', why: 'my 뒤에는 물건 이름이 와야 해요. 문장이 끝나는 자리에는 mine을 써요.' },
        { a: 'yours', why: "'네 것이니?'라고 물었으니 대답하는 사람은 '내 것'이라고 해야 해요. → mine" },
      ],
      hint: "'네 거니?'라는 물음에 '응, 내 거야'라고 답하는 장면이에요.",
      explain: "your(너의)로 물으면 대답은 '내 것', 곧 mine으로 해요. Yes, it's mine.",
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 2,
      q: "'~의 것'을 나타내는 말을 짝지은 것 가운데 **바르지 않은** 것은 무엇일까요?",
      choices: ['그녀의 것 – her', '내 것 – mine', '네 것 – yours', '그의 것 – his'],
      answer: 0,
      why: ['', '바르게 짝지었어요. 내 것은 mine이에요.', '바르게 짝지었어요. 네 것은 yours예요.', "바르게 짝지었어요. his는 '그의'도 '그의 것'도 돼요."],
      hint: '표에서 마지막 줄(she)을 떠올려 보세요.',
      explain: "her는 '그녀의'라는 뜻이고, '그녀의 것'은 hers예요.",
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 1,
      q: "'우리 형의 모자'를 영어로 바르게 쓴 것은 무엇일까요?",
      choices: ["my brother's cap", 'my brothers cap', "my brother cap's", "brother's my cap"],
      answer: 0,
      why: ['', "아포스트로피(')가 빠졌어요. brother's처럼 써요.", "'s는 물건이 아니라 주인(brother) 뒤에 붙여요.", "my가 맨 앞에 와야 해요. 주인 my brother를 먼저 쓰고 뒤에 's를 붙여요."],
      hint: "주인은 'my brother'예요. 주인 뒤에 's를 붙여요.",
      explain: "주인인 my brother 뒤에 's를 붙이고 물건 cap을 써요. → my brother's cap",
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 4,
      q: "안내문을 읽고 대화의 빈칸에 알맞은 말을 고르세요. (A와 B는 소라가 아니에요.)\n\n**LOST AND FOUND**\nIs this your umbrella? It's yellow. The name on it is SORA.\n\nA: Whose umbrella is this?\nB: [[It's Sora's.]]",
      choices: ["It's Sora's.", "It's Sora.", "They're Sora's.", "It's yours."],
      answer: 0,
      why: [
        '',
        "이름 뒤에 's가 빠졌어요. 's를 붙여야 '소라의 것'이에요.",
        "우산은 하나라서 They're가 아니라 It's로 답해요.",
        "'네 것'이라는 뜻이에요. 안내문의 이름표에는 SORA라고 적혀 있어요.",
      ],
      hint: '안내문에서 이름을 찾고, 물건이 몇 개인지 확인하세요.',
      explain: "이름표에 SORA라고 적혀 있으니 소라의 우산이에요. 우산 하나이므로 It's, 주인은 Sora's예요.",
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: "빈칸에 알맞은 말을 고르세요. (민수는 남자아이예요.)\n\nThese are Minsu's shoes. = They're [[his]].",
      choices: ['his', 'him', 'hers', 'he'],
      answer: 0,
      why: ['', "him은 '그를, 그에게'라는 뜻이에요.", "민수는 남자아이라서 '그녀의 것'을 뜻하는 hers는 알맞지 않아요.", "he는 '그는'이라는 뜻이에요."],
      hint: "민수의 것을 뜻하는 Minsu's를 '그의 것'으로 바꾸어 보세요.",
      explain: "민수의 신발 Minsu's shoes를 '그의 것'으로 바꾸면 his예요. 신발은 여러 개라 They're his.예요.",
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '**어색한** 대화를 고르세요.',
      choices: [
        "A: Whose gloves are these? / B: It's mine.",
        "A: Whose glasses are these? / B: They're my sister's.",
        "A: Is this your bike? / B: No, it isn't. It's Tom's.",
        "A: Whose pencil is this? / B: It's hers.",
      ],
      answer: 0,
      why: ['', '자연스러운 대화예요. 여러 개(glasses)를 They\'re로 답했어요.', '자연스러운 대화예요. 아니라고 하고 주인을 알려 줬어요.', "자연스러운 대화예요. 연필 하나를 It's로 답했어요."],
      hint: '물을 때와 답할 때 하나·여러 개가 맞는지 보세요.',
      explain: "gloves는 여러 개라서 are these로 물었어요. 그러면 It's mine.이 아니라 They're mine.으로 답해야 해요.",
    },
    {
      id: 'a4', level: 3, type: 'short', concept: 1,
      q: "글을 읽고, 빨간 모자의 주인을 빈칸에 쓰세요.\n\n> There are two caps: a red cap and a blue cap. One is Mina's. The other is Jiho's. The blue cap is not Jiho's.\n\nThe red cap is [[Jiho's]].",
      answer: ["Jiho's", "Jiho's cap"],
      wrong: [
        { a: "Mina's", why: '파란 모자가 지호의 것이 아니니 파란 모자는 미나의 것이에요. 그러면 빨간 모자는 누구의 것일까요?' },
        { a: 'Jiho', why: "주인을 나타내려면 이름 뒤에 's를 붙여요. → Jiho's" },
        { a: 'Jihos', why: "아포스트로피(')가 빠졌어요. s 앞에 ' 를 써서 Jiho's로 써요." },
      ],
      hint: '먼저 파란 모자의 주인을 알아내 보세요.',
      explain: "모자 두 개는 미나의 것 하나, 지호의 것 하나예요. 파란 모자는 지호의 것이 아니니 미나의 것이고, 남은 빨간 모자가 지호의 것이에요. → The red cap is Jiho's.",
    },
  ],

  deeper: [
    {
      title: "모양은 같아도 뜻이 다른 's",
      body: "영어에는 's가 붙은 말이 많은데, 뜻이 두 가지예요.\n\n| 말 | 's의 정체 | 뜻 |\n|---|---|---|\n| **It's** a cap. | is를 줄인 것 (It is) | 그것은 모자예요. |\n| **What's** this? | is를 줄인 것 (What is) | 이것은 뭐예요? |\n| **Mina's** cap | '~의' | 미나의 모자 |\n| It's **Mina's**. | '~의 것' | 미나의 것이에요. |\n\n그래서 It's Mina's.라는 문장에는 's가 두 번 나오지만 뜻이 서로 달라요. 앞의 's는 is, 뒤의 's는 '~의 것'이에요. 사람 이름 뒤의 's는 대부분 '~의'라고 생각하면 돼요.",
    },
  ],

  faq: [
    {
      q: "It's의 's랑 Mina's의 's는 같은 거예요?",
      a: "아니에요. It's의 's는 is를 줄인 것이라 It's = It is예요. Mina's의 's는 '~의, ~의 것'이라는 뜻이에요. 모양만 같고 하는 일이 달라요.",
    },
    {
      q: 'his는 왜 바뀌지 않아요?',
      a: "my는 mine, your는 yours, her는 hers로 바뀌지만 his는 '그의'와 '그의 것'이 똑같이 his예요. This is his cap.(그의 모자) / This cap is his.(그의 것) 둘 다 맞아요. 규칙의 예외로 기억해 두세요.",
    },
    {
      q: '신발은 한 켤레인데 왜 are these를 써요?',
      a: '신발 한 켤레는 두 짝으로 되어 있어서 영어에서는 여러 개로 봐요. 그래서 shoes처럼 s를 붙이고 Whose shoes are these? They\'re mine.으로 말해요. 양말(socks), 장갑(gloves), 안경(glasses)도 같아요.',
    },
  ],

  mistakes: [
    "이름 뒤에 's를 빠뜨리는 실수: It's Mina. → It's Mina's. (It's Mina.는 '미나예요'라는 뜻이 돼요.)",
    "my 뒤에 물건 이름 없이 끝내는 실수: It's my. → It's mine.",
    'shoes처럼 여러 개인데 is this를 쓰는 실수: Whose shoes is this? → Whose shoes are these?',
  ],

  gens: [
    {
      id: 'whose-answer',
      level: 1,
      title: "주인을 묻는 말에 's로 답하기",
      make: function (R) {
        var owners = [
          ['Mina', '미나'], ['Jiho', '지호'], ['Tom', '톰'], ['Sora', '소라'], ['Minsu', '민수'],
          ['Emma', '에마'], ['Seojun', '서준'], ['Jia', '지아'], ['Daniel', '대니얼'], ['Yuna', '유나'],
        ];
        var singles = ['cap', 'bag', 'pencil', 'umbrella', 'ruler', 'notebook', 'eraser', 'ball', 'cup', 'book'];
        var plurals = ['shoes', 'socks', 'gloves', 'sneakers', 'crayons', 'glasses'];
        var two = R.sample(owners, 2);
        var o = two[0];
        var N = o[0];
        var ko = o[1];
        var rKo = two[1][1]; // 대답하는 B (주인이 아닌 친구) — It's mine.이 정답이 되지 않게
        var pl = R.bool(0.4);
        var item = pl ? R.pick(plurals) : R.pick(singles);
        var S = pl ? "They're" : "It's";
        var X = pl ? "It's" : "They're";
        var correct = S + ' ' + N + "'s.";
        var cands = [
          [X + ' ' + N + "'s.", pl ? "물건이 여러 개라서 It's가 아니라 They're로 답해요." : "물건이 하나라서 They're가 아니라 It's로 답해요."],
          [S + ' ' + N + '.', "이름 뒤에 's가 빠졌어요. 's를 붙여야 '" + ko + "의 것'이에요."],
          [S + ' mine.', "'내 것', 곧 대답하는 " + rKo + "의 것이라는 뜻이에요. 주인은 " + ko + R.josa(ko, '이에요/예요') + '.'],
          [X + ' ' + N + '.', "두 군데가 틀렸어요. 하나인지 여러 개인지 보고, 이름 뒤에 's도 붙여요."],
        ];
        var reason = {};
        cands.forEach(function (c) { reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: pl ? 3 : 1,
          q: '대화의 빈칸에 알맞은 말은 무엇일까요? (대답하는 B: ' + rKo + ' · 물건 주인: ' + ko + ')\n\nA: Whose ' + item + (pl ? ' are these?' : ' is this?') + '\nB: [[' + correct + ']]',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: (pl ? item + "는 여러 개로 말하는 물건이라서 are these로 묻고 They're로 답해요." : "물건이 하나라서 is this로 묻고 It's로 답해요.") + " 주인 이름 " + N + " 뒤에 's를 붙여요. → " + correct,
        };
      },
    },
    {
      id: 'possessive-pronoun',
      level: 1,
      title: "'~의 것'을 나타내는 말 고르기",
      make: function (R) {
        var P = [
          { det: 'my', pos: 'mine', ko: '나의', obj: 'me', objWhy: "me는 '나를, 나에게'라는 뜻이에요." },
          { det: 'your', pos: 'yours', ko: '너의', obj: 'you', objWhy: "you는 '너는, 너를'이라는 뜻이에요." },
          { det: 'his', pos: 'his', ko: '그의', obj: 'him', objWhy: "him은 '그를, 그에게'라는 뜻이에요." },
          { det: 'her', pos: 'hers', ko: '그녀의', obj: 'her', objWhy: '' },
        ];
        var items = ['cap', 'bag', 'pencil', 'book', 'ruler', 'eraser', 'umbrella', 'bike'];
        var k = R.int(0, P.length - 1);
        var p = P[k];
        var item = R.pick(items);
        var cands = [];
        if (p.det !== p.pos) cands.push([p.det, p.det + "는 '" + p.ko + "'라는 뜻이라 뒤에 물건 이름이 와야 해요. 문장이 끝나는 자리에는 '~의 것'을 나타내는 말을 써요."]);
        if (p.obj !== p.det && p.obj !== p.pos) cands.push([p.obj, p.objWhy]);
        P.forEach(function (o, j) {
          if (j !== k) cands.push([o.pos, '주인이 달라요. ' + p.det + "는 '" + p.ko + "'라는 뜻이니 그에 맞는 '~의 것'을 골라요."]);
        });
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(p.pos, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: 2,
          q: '빈칸에 알맞은 말은 무엇일까요?\n\nThis is ' + p.det + ' ' + item + '. = This ' + item + ' is [[' + p.pos + ']].',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === p.pos ? '' : reason[c] || ''; }),
          explain: p.det + ' ' + item + "에서 물건 이름을 빼고 '~의 것'으로 말하면 이렇게 돼요: " + p.pos + '. → This ' + item + ' is ' + p.pos + '.',
        };
      },
    },
  ],

  vocab: [
    { w: 'whose', m: '누구의', ex: 'Whose bag is this?', exm: '이것은 누구의 가방이에요?' },
    { w: 'mine', m: '내 것', ex: 'This pencil is mine.', exm: '이 연필은 내 것이에요.' },
    { w: 'yours', m: '네 것', ex: 'Is this cap yours?', exm: '이 모자는 네 것이니?' },
    { w: 'his', m: '그의, 그의 것', ex: 'This ball is his.', exm: '이 공은 그의 것이에요.' },
    { w: 'hers', m: '그녀의 것', ex: 'The red bag is hers.', exm: '그 빨간 가방은 그녀의 것이에요.' },
    { w: 'cap', m: '(앞에 챙이 달린) 모자', ex: 'Whose cap is this?', exm: '이것은 누구의 모자예요?' },
    { w: 'umbrella', m: '우산', ex: "It's raining. Take your umbrella.", exm: '비가 와요. 우산을 챙기세요.' },
    { w: 'glasses', m: '안경', ex: "These are my grandpa's glasses.", exm: '이것은 우리 할아버지의 안경이에요.' },
    { w: 'gloves', m: '장갑', ex: 'These gloves are warm.', exm: '이 장갑은 따뜻해요.' },
    { w: 'socks', m: '양말', ex: 'Whose socks are these?', exm: '이것은 누구의 양말이에요?' },
    { w: 'eraser', m: '지우개', ex: 'Can I use your eraser?', exm: '네 지우개 써도 돼?' },
    { w: 'water bottle', m: '물병', ex: 'My water bottle is blue.', exm: '내 물병은 파란색이에요.' },
    { w: 'lost and found', m: '분실물 보관소', ex: "Let's go to the lost and found.", exm: '분실물 보관소에 가 보자.' },
    { w: 'brother', m: '형, 오빠, 남동생', ex: "This is my brother's bike.", exm: '이것은 우리 형의 자전거예요.' },
  ],
});
