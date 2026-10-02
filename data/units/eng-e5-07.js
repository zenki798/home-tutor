/* 5학년 영어 · 방학 계획 말하기 */
Tutor.registerUnit({
  id: 'eng-e5-07',
  course: 'eng-e5',
  title: '방학 계획 말하기',
  summary: 'What will you do this winter?로 계획을 묻고 I will ~.로 방학 동안 할 일을 말해요.',
  goals: [
    'What will you do ~?로 계획을 묻고 I will ~.로 답할 수 있어요.',
    "I'll, won't 같은 줄임말을 알고 쓸 수 있어요.",
    'Jiho will go camping.처럼 다른 사람의 계획을 말할 수 있어요.',
    'tomorrow, next week처럼 앞으로의 때를 나타내는 말을 쓸 수 있어요.',
  ],
  standards: ['[6영02-06]', '[6영02-08]', '[6영01-04]'],

  concepts: [
    {
      title: 'will로 계획 묻고 답하기',
      body: "앞으로 할 일(계획)을 말할 때는 **will**을 써요. will은 '~할 거예요'라는 뜻이에요.\n\n- **What will you do this winter?** 너는 이번 겨울에 무엇을 할 거니?\n- **I will go skiing.** 나는 스키를 타러 갈 거야.\n\nwill 뒤에는 **동사의 원래 모양(동사원형)**을 써요: will **go**, will **visit**, will **read**.\n\n**go + -ing**는 '~하러 가다'라는 뜻으로 놀이·운동 계획에 자주 써요.\n\n| 영어 | 뜻 |\n|---|---|\n| go skiing | 스키 타러 가다 |\n| go camping | 캠핑하러 가다 |\n| go swimming | 수영하러 가다 |\n| go fishing | 낚시하러 가다 |",
      easy: "will은 '앞으로'라는 표지판이라고 생각해 보세요. 지금 하는 일 앞에 will을 붙이면 앞으로 할 일이 돼요.\n\nI go skiing. (나는 스키를 타러 가.)\n→ I **will** go skiing. (나는 스키를 타러 **갈 거야**.)\n\n묻는 말도 will을 앞에 꺼내면 돼요: What **will** you do?(무엇을 **할 거니**?)",
      check: {
        type: 'choice',
        q: '**What will you do this winter?**에 알맞은 대답은 무엇일까요?',
        choices: ['I will go skiing.', 'Yes, I will.', 'I like winter.'],
        answer: 0,
        why: ['', 'What으로 물었으니 Yes/No가 아니라 할 일을 말해요.', '좋아하는 계절을 말했어요. 질문은 앞으로 할 일을 물어요.'],
        explain: '이번 겨울에 무엇을 할 거냐고 물었으니 I will ~.로 할 일을 말해요. I will go skiing.(스키를 타러 갈 거야.)',
      },
    },
    {
      title: "줄임말 I'll과 부정 won't",
      body: "말할 때는 will을 줄여 쓰는 일이 많아요. 줄인 자리에는 **'**(어퍼스트로피)를 찍어요.\n\n| 원래 | 줄임말 |\n|---|---|\n| I will | **I'll** |\n| you will | you'll |\n| he will / she will | he'll / she'll |\n| we will | we'll |\n| will not | **won't** |\n\n'~하지 않을 거예요'라고 할 때는 **will not**이나 **won't**를 써요.\n\n- I **won't** stay home this summer. 나는 이번 여름에 집에만 있지 않을 거야.\n\n계획을 물을 때는 Will you ~?라고 해요. 대답은 **Yes, I will.** / **No, I won't.**\n\n> ⚠️ will not의 줄임말은 willn't가 아니라 **won't**예요. 모양이 특별하니 꼭 기억해요.",
      easy: "줄임말은 글자 몇 개를 빼고 그 자리에 작은 점 '를 찍은 말이에요.\n\nI + will → I'll (wi가 빠졌어요)\n\nwill not만은 특별해서 won't로 모양이 바뀌어요. '원트'처럼 짧게 말해요.",
      check: {
        type: 'short', check: 'text',
        q: '**will not**을 줄여 쓴 말을 쓰세요.',
        answer: ["won't"],
        wrong: [
          { a: "willn't", why: "will not은 모양이 특별하게 바뀌어 won't가 돼요." },
          { a: 'wont', why: "줄인 자리에 '를 찍어야 해요: won't" },
          { a: "don't", why: "don't는 do not의 줄임말이에요. will not은 won't예요." },
        ],
        explain: "will not의 줄임말은 won't예요. 예: I won't stay home.",
      },
    },
    {
      title: '다른 사람의 계획 말하기',
      body: "다른 사람이 앞으로 할 일도 **will + 동사원형**으로 말해요.\n\n- **Jiho will go camping.** 지호는 캠핑하러 갈 거야.\n- **She will visit her grandparents.** 그녀는 조부모님 댁을 방문할 거야.\n- **We will learn taekwondo.** 우리는 태권도를 배울 거야.\n\n하루 일과를 말할 때는 He goes처럼 동사에 -s를 붙였지요? **will 뒤에서는 -s를 붙이지 않아요.** will도 wills가 되지 않아요. 누가 하든 will과 동사원형은 그대로예요.\n\n| 틀린 말 | 바른 말 |\n|---|---|\n| He will goes | He will **go** |\n| She wills visit | She **will** visit |\n| Jia will reading | Jia will **read** |\n\n다른 사람의 계획은 What will **Jiho** do this summer?처럼 물어요.",
      easy: "will은 '모양을 그대로 두는 마법 낱말'이라고 기억하세요.\n\nwill 뒤에 오는 동사는 누가 하든 원래 모양이에요.\n\nI will go. / She will go. / Jiho will go.\n\n셋 다 go예요. goes가 아니에요.",
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nJiho will [[빈칸]] camping this summer.',
        choices: ['go', 'goes', 'going'],
        answer: 0,
        why: ['', 'will 뒤에는 -es를 붙이지 않아요. 누가 하든 동사원형이에요.', 'will 뒤에는 -ing 모양을 쓰지 않아요. go camping처럼 써요.'],
        explain: 'will 뒤에는 동사원형을 써요. Jiho will go camping this summer.(지호는 이번 여름에 캠핑하러 갈 거야.)',
      },
    },
    {
      title: '앞으로의 때를 나타내는 말',
      body: "계획을 말할 때는 **언제** 할지도 함께 말해요. 이런 말은 보통 문장 끝에 와요.\n\n| 영어 | 뜻 |\n|---|---|\n| tomorrow | 내일 |\n| this weekend | 이번 주말 |\n| next week | 다음 주 |\n| next month | 다음 달 |\n| this summer | 이번 여름 |\n| this winter | 이번 겨울 |\n\n- I will go fishing **this weekend**. 나는 이번 주말에 낚시하러 갈 거야.\n- She will read many books **next week**. 그녀는 다음 주에 책을 많이 읽을 거야.\n\n> 💡 **this**는 '이번', **next**는 '다음'이에요. this weekend는 이번 주말, next weekend는 다음 주말이에요.",
      easy: "달력을 떠올려 보세요. 오늘 바로 다음 날은 tomorrow(내일)예요.\n\n이번 주의 토요일·일요일은 this weekend(이번 주말), 이번 주가 끝나고 오는 주는 next week(다음 주)예요.\n\n'이번'은 this, '다음'은 next라고만 기억하면 여러 말을 만들 수 있어요.",
      check: {
        type: 'choice',
        q: "**next week**의 뜻은 무엇일까요?",
        choices: ['다음 주', '이번 주', '이번 주말'],
        answer: 0,
        why: ['', "'이번 주'는 this week예요. next는 '다음'이에요.", "'이번 주말'은 this weekend예요."],
        explain: "next는 '다음', week는 '주'예요. 그래서 next week는 다음 주예요.",
      },
    },
    {
      title: '방학 계획표를 읽고 글로 쓰기',
      body: "방학 계획표를 보면서 계획을 글로 써 봐요. 표의 **때**와 **할 일**을 I will 문장에 넣으면 돼요.\n\n| 때 | 할 일 |\n|---|---|\n| 7월 | 수영 배우기 (learn to swim) |\n| 8월 첫째 주 | 할머니 댁 방문하기 (visit my grandma) |\n| 8월 둘째 주 | 캠핑하러 가기 (go camping) |\n\n> In July, I will learn to swim. In August, I will visit my grandma. Then I will go camping with my family. It will be a great vacation!\n\n- 달 이름 앞에는 **in**을 써요: in July(7월에), in August(8월에)\n- 순서를 이어 줄 때는 **then**(그다음에)을 써요.\n- 끝에 기대하는 마음을 한 문장 덧붙이면 글이 더 좋아져요.",
      easy: "계획표 한 줄 = 문장 한 개라고 생각하세요.\n\n'때' 칸을 문장 맨 앞이나 맨 끝에, '할 일' 칸을 I will 뒤에 넣어요.\n\n7월 | 수영 배우기 → In July, I will learn to swim.",
      check: {
        type: 'ox',
        q: "계획표에 '8월 | 캠핑하러 가기'라고 쓰여 있으면 **In August, I will go camping.**이라고 쓸 수 있어요.",
        answer: true,
        explain: 'August는 8월이고, 달 이름 앞에는 in을 써요. 할 일(go camping)을 I will 뒤에 넣으면 In August, I will go camping.이 돼요.',
      },
    },
  ],

  examples: [
    {
      q: "우리말에 맞게 영어로 말해 보세요.\n\n'나는 이번 주말에 조부모님 댁을 방문할 거야.'",
      steps: [
        '앞으로 할 일이니 will을 써요: I will',
        '방문하다는 visit이고, will 뒤에는 동사원형을 써요: I will visit',
        '조부모님은 grandparents, 나의 조부모님은 my grandparents예요.',
        '이번 주말(this weekend)은 문장 끝에 붙여요.',
      ],
      answer: 'I will visit my grandparents this weekend. (줄여서 I\'ll visit my grandparents this weekend.)',
    },
    {
      q: "대화를 완성해 보세요.\n\nA: Will you go swimming tomorrow?\nB: No, [[빈칸]]. I will go fishing with my dad.",
      steps: [
        'Will you ~?로 물으면 Yes, I will. 또는 No, I won\'t.로 답해요.',
        'B는 수영 대신 낚시를 하러 간다고 했으니 No로 답해요.',
        'No 뒤에는 I won\'t가 와요. won\'t는 will not을 줄인 말이에요.',
      ],
      answer: "No, I won't.",
    },
  ],

  terms: [
    { term: 'will', def: "'~할 거예요'라는 뜻으로 앞으로 할 일을 말할 때 써요. 뒤에는 동사원형이 와요. 예: I will go camping." },
    { term: '동사원형', def: '-s, -es, -ing 같은 꼬리를 붙이지 않은 동사의 원래 모양이에요. 예: go, visit, read' },
    { term: "I'll", def: "I will을 줄여 쓴 말이에요. 예: I'll go skiing." },
    { term: "won't", def: "will not을 줄여 쓴 말로, '~하지 않을 거예요'라는 뜻이에요. 예: I won't stay home." },
    { term: '줄임말', def: "두 낱말을 하나로 줄여 쓴 말이에요. 빠진 글자 자리에 '(어퍼스트로피)를 찍어요. 예: I'll, won't" },
    { term: 'go + -ing', def: "'~하러 가다'라는 뜻이에요. 예: go skiing(스키 타러 가다), go fishing(낚시하러 가다)" },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '**What will you do this summer?**에 알맞은 대답은 무엇일까요?',
      choices: ['I will go swimming.', 'Yes, I will.', "It's summer.", 'I like swimming.'],
      answer: 0,
      why: [
        '',
        'What으로 물으면 Yes/No가 아니라 할 일을 말해요.',
        '지금 계절을 말했어요. 질문은 앞으로 할 일을 물어요.',
        '좋아하는 것을 말했어요. 앞으로 할 일은 I will ~.로 말해요.',
      ],
      explain: '이번 여름에 무엇을 할 거냐고 물었으니 I will go swimming.(수영하러 갈 거야.)이 알맞아요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
      q: '**I will**을 줄여 쓴 말을 쓰세요.',
      answer: ["I'll"],
      wrong: [
        { a: 'ill', why: "줄인 자리에 '를 찍어야 해요: I'll" },
        { a: "I'l", why: "l을 두 번 써요: I'll" },
      ],
      explain: "I will을 줄이면 I'll이에요. wi 자리에 '를 찍어요.",
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '**will not**을 줄여 쓴 말은 무엇일까요?',
      choices: ["won't", "willn't", "don't", "wouldn't"],
      answer: 0,
      why: [
        '',
        "will not은 특별하게 won't로 바뀌어요.",
        "don't는 do not의 줄임말이에요.",
        "wouldn't는 would not의 줄임말이에요. will not은 won't예요.",
      ],
      explain: "will not의 줄임말은 won't예요.",
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nMina will [[빈칸]] her aunt next week.',
      choices: ['visit', 'visits', 'visiting', 'to visit'],
      answer: 0,
      why: [
        '',
        'will 뒤에는 -s를 붙이지 않아요.',
        'will 뒤에는 -ing 모양을 쓰지 않아요.',
        'will 뒤에는 to 없이 동사원형만 써요.',
      ],
      explain: 'will 뒤에는 누가 하든 동사원형을 써요. Mina will visit her aunt next week.(미나는 다음 주에 이모 댁을 방문할 거야.)',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 3,
      q: "**tomorrow**는 '어제'라는 뜻이에요.",
      answer: false,
      explain: "tomorrow는 '내일'이에요. 앞으로의 때를 나타내므로 I will go to the park tomorrow.처럼 will과 함께 써요.",
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: "'이번 주말'을 영어로 바르게 나타낸 것은 무엇일까요?",
      choices: ['this weekend', 'next week', 'tomorrow', 'this winter'],
      answer: 0,
      why: ['', "next week는 '다음 주'예요.", "tomorrow는 '내일'이에요.", "this winter는 '이번 겨울'이에요."],
      explain: "'이번'은 this, '주말'은 weekend예요. 그래서 이번 주말은 this weekend예요.",
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 0,
      q: "우리말에 맞게 빈칸에 알맞은 낱말 하나를 쓰세요.\n\n'나는 이번 여름에 수영하러 갈 거야.'\nI will go [[빈칸]] this summer.",
      answer: ['swimming'],
      wrong: [
        { a: 'swim', why: "'~하러 가다'는 go 뒤에 -ing를 붙인 말을 써요: go swimming" },
        { a: 'swiming', why: 'swim에 -ing를 붙일 때는 m을 한 번 더 써요: swimming' },
      ],
      explain: "'~하러 가다'는 go + -ing예요. swim은 m을 하나 더 쓰고 -ing를 붙여 swimming이 돼요. I will go swimming this summer.",
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 0,
      q: "우리말에 맞게 순서대로 놓으세요.\n\n'나는 이번 주말에 조부모님 댁을 방문할 거야.'",
      choices: ['I', 'will', 'visit', 'my grandparents', 'this weekend'],
      answer: [0, 1, 2, 3, 4],
      hint: '누가 → will → 무엇을 한다 → 누구를 → 언제 순서예요.',
      explain: 'I(나는) + will visit(방문할 거야) + my grandparents(조부모님을) + this weekend(이번 주말에). 때를 나타내는 말은 끝에 와요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'text', concept: 1,
      q: "우리말에 맞게 빈칸에 알맞은 말을 쓰세요.\n\n'나는 이번 여름에 집에만 있지 않을 거야.'\nI [[빈칸]] stay home this summer.",
      answer: ["won't", 'will not'],
      wrong: [
        { a: "don't", why: "don't는 지금·늘 하지 않는 일이에요. 앞으로 하지 않을 일은 won't(will not)예요." },
        { a: 'not', why: 'not만으로는 부족해요. will not 또는 won\'t를 써요.' },
      ],
      hint: '앞으로 하지 않을 일을 말하는 줄임말을 떠올려 보세요.',
      explain: "'~하지 않을 거야'는 will not 또는 won't예요. I won't stay home this summer.",
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 2,
      q: '바른 문장은 무엇일까요?',
      choices: ['She will learn taekwondo.', 'She will learns taekwondo.', 'She wills learn taekwondo.', 'She will learning taekwondo.'],
      answer: 0,
      why: [
        '',
        'will 뒤에서는 -s를 붙이지 않아요.',
        'will은 누가 하든 wills로 바뀌지 않아요.',
        'will 뒤에는 -ing 모양을 쓰지 않아요.',
      ],
      explain: 'will과 그 뒤의 동사는 모양이 그대로예요. She will learn taekwondo.(그녀는 태권도를 배울 거야.)',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: "준서의 방학 계획표를 보고, 내용과 **맞는** 문장을 고르세요.\n\n| 때 | 할 일 |\n|---|---|\n| this weekend | go fishing with my dad |\n| next week | read three books |\n| in August | visit my uncle in Busan |",
      choices: [
        'I will go fishing this weekend.',
        'I will read three books this weekend.',
        'I will visit my uncle next week.',
        'I will go fishing in August.',
      ],
      answer: 0,
      why: [
        '',
        '책 세 권 읽기는 다음 주(next week) 계획이에요.',
        '삼촌 댁 방문은 8월(in August) 계획이에요.',
        '낚시는 이번 주말(this weekend) 계획이에요.',
      ],
      hint: '표에서 때와 할 일을 한 줄씩 짝지어 보세요.',
      explain: '표의 첫 줄을 보면 이번 주말(this weekend)에 아빠와 낚시하러 가요. 그래서 I will go fishing this weekend.가 맞아요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 1,
      q: "대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: Will you go camping this summer?\nB: [[빈칸]] I don't like camping. I will stay home and read books.",
      choices: ["No, I won't.", 'Yes, I will.', "No, I don't.", 'Yes, I do.'],
      answer: 0,
      why: [
        '',
        'B는 캠핑을 좋아하지 않고 집에 있을 거라고 했어요. 그러니 No예요.',
        'Will you ~?로 물으면 do가 아니라 will로 답해요: No, I won\'t.',
        'Will you ~?로 물었으니 do로 답하지 않아요. 내용도 No예요.',
      ],
      hint: '질문에 쓰인 낱말(Will)로 대답해요.',
      explain: "Will you ~?에는 Yes, I will. / No, I won't.로 답해요. B는 캠핑을 좋아하지 않아 집에 있을 거라고 했으니 No, I won't.예요.",
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 4,
      q: "글을 읽고 물음에 답하세요.\n\nHi, I'm Yuna. My winter vacation will be busy. In December, I will go skiing with my family. In January, I will learn to play the guitar. I will also read ten books. I won't play computer games too much.\n\n유나의 겨울 방학 계획이 **아닌** 것은 무엇일까요?",
      choices: ['컴퓨터 게임 많이 하기', '가족과 스키 타러 가기', '기타 배우기', '책 열 권 읽기'],
      answer: 0,
      why: [
        '',
        'In December, I will go skiing with my family.에 나와요. 계획이 맞아요.',
        'In January, I will learn to play the guitar.에 나와요. 계획이 맞아요.',
        'I will also read ten books.에 나와요. 계획이 맞아요.',
      ],
      hint: "won't가 들어 있는 문장을 찾아보세요.",
      explain: "I won't play computer games too much.는 '컴퓨터 게임을 너무 많이 하지 않을 거야.'라는 뜻이에요. won't(will not)는 하지 않을 일이니 계획이 아니에요.",
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '**틀린** 문장은 무엇일까요?',
      choices: ['Mina will visits her aunt.', "I'll go camping tomorrow.", "He won't play computer games.", 'We will go fishing next week.'],
      answer: 0,
      why: [
        '',
        "I'll은 I will의 줄임말이고, 뒤에 동사원형 go가 와서 맞아요.",
        "won't 뒤에 동사원형 play가 와서 맞아요.",
        'will 뒤에 동사원형 go가 와서 맞아요.',
      ],
      hint: 'will(또는 won\'t) 바로 뒤의 낱말이 원래 모양인지 살펴보세요.',
      explain: 'will 뒤에는 누가 하든 동사원형을 써요. 바른 문장은 Mina will visit her aunt.예요.',
    },
    {
      id: 'a3', level: 3, type: 'order', concept: 0,
      q: '자연스러운 대화가 되도록 순서대로 놓으세요.',
      choices: ['What will you do this summer?', 'I will go to Jeju Island.', 'Great! What will you do there?', 'I will go hiking on Hallasan.'],
      answer: [0, 1, 2, 3],
      hint: 'there(거기에서)가 가리키는 곳이 먼저 나와야 해요.',
      explain: '여름 계획을 묻고 → 제주도에 갈 거라고 답하고 → 거기(there, 제주도)에서 무엇을 할지 묻고 → 한라산에 등산하러 갈 거라고 답해요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      q: "오늘은 금요일이에요. 민수는 토요일에 동물원에 갈 거예요. 빈칸에 알맞은 말을 고르세요.\n\nMinsu will go to the zoo [[빈칸]].",
      choices: ['tomorrow', 'next week', 'today', 'next month'],
      answer: 0,
      why: [
        '',
        '토요일은 이번 주예요. 다음 주가 아니에요.',
        '오늘은 금요일이고 동물원은 토요일에 가요.',
        '다음 달이 아니라 바로 다음 날이에요.',
      ],
      hint: '금요일의 바로 다음 날은 무슨 요일일까요?',
      explain: '금요일의 바로 다음 날이 토요일이에요. 오늘의 다음 날은 tomorrow(내일)예요. Minsu will go to the zoo tomorrow.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'text', concept: 1,
      q: "지호(Jiho)의 여름 방학 계획표예요. 표를 보고 빈칸에 알맞은 말을 쓰세요.\n\n| 할 일 | 할까요? |\n|---|---|\n| go camping | ○ |\n| go swimming | ✕ |\n\nJiho will go camping. But he [[빈칸]] go swimming.",
      answer: ["won't", 'will not'],
      wrong: [
        { a: "doesn't", why: "doesn't는 늘 하지 않는 일이에요. 앞으로 하지 않을 일은 won't(will not)예요." },
        { a: 'will', why: '수영은 ✕예요. 하지 않을 일이니 will not(won\'t)으로 써요.' },
      ],
      hint: '✕는 하지 않을 일이에요. 앞으로 하지 않을 일은 어떻게 말할까요?',
      explain: "수영하러 가기는 ✕이니 하지 않을 일이에요. 앞으로 하지 않을 일은 won't(will not)로 말해요. But he won't go swimming.",
    },
  ],

  deeper: [
    {
      title: 'will의 여러 쓰임',
      body: "will은 계획만이 아니라 앞으로 일어날 것 같은 일을 말할 때도 써요.\n\n- It **will** be sunny tomorrow. 내일은 맑을 거야.\n- You **will** like this book. 너는 이 책을 좋아하게 될 거야.\n\n또 그 자리에서 마음먹은 일을 말할 때도 써요: The phone is ringing. I**'ll** get it!(전화가 울리네. 내가 받을게!)\n\n6학년에서는 앞으로의 계획을 말하는 다른 표현도 배우며 계획을 더 자세히 말해 봐요.",
    },
  ],

  faq: [
    {
      q: '왜 He will goes가 아니에요? He 뒤에는 -es를 붙이잖아요.',
      a: "He goes처럼 -s/-es를 붙이는 것은 늘 하는 일을 말할 때예요. will이 들어가면 will이 '앞으로'를 맡고, 뒤의 동사는 원래 모양으로 돌아가요. 그래서 He will go.예요.",
    },
    {
      q: "won't는 왜 willn't가 아니에요?",
      a: "옛날 영어에서 will not을 줄여 말하던 소리가 이어져 내려와 won't라는 특별한 모양이 되었어요. 규칙으로 만들 수 없는 말이니 그대로 외워 두세요.",
    },
    {
      q: '시간을 나타내는 말은 문장 어디에 써요?',
      a: 'tomorrow, this weekend, next week 같은 말은 보통 문장 끝에 써요. I will go fishing this weekend. 처럼요. 강조하고 싶으면 맨 앞에 쓰기도 해요: This weekend, I will go fishing.',
    },
  ],

  mistakes: [
    'He will goes.처럼 will 뒤에 -s/-es를 붙이는 실수 — will 뒤에는 누가 하든 동사원형: He will go.',
    "will not을 willn't로 줄이는 실수 — 줄임말은 won't예요.",
    "I will go swim.처럼 go 뒤에 -ing를 빼는 실수 — '~하러 가다'는 go swimming이에요.",
  ],

  gens: [
    {
      id: 'will-verb',
      level: 1,
      title: 'will 뒤에 동사원형 쓰기',
      make: function (R) {
        var who = R.pick(['I', 'You', 'We', 'They', 'He', 'She', 'Jiho', 'Mina', 'My sister', 'My brother']);
        // [동사원형, -s 모양, -ing 모양, 뒤에 오는 말, 때 목록]
        var acts = [
          ['go', 'goes', 'going', 'skiing', ['this winter', 'next week', 'this weekend']],
          ['go', 'goes', 'going', 'camping', ['this summer', 'this weekend', 'next month']],
          ['visit', 'visits', 'visiting', 'the museum', ['tomorrow', 'this weekend', 'next week']],
          ['read', 'reads', 'reading', 'many books', ['this summer', 'this winter', 'next month']],
          ['learn', 'learns', 'learning', 'taekwondo', ['this summer', 'next month', 'this winter']],
          ['play', 'plays', 'playing', 'badminton', ['tomorrow', 'this weekend', 'next week']],
          ['make', 'makes', 'making', 'a snowman', ['this winter', 'tomorrow', 'this weekend']],
          ['watch', 'watches', 'watching', 'a movie', ['tomorrow', 'this weekend', 'next week']],
        ];
        var a = R.pick(acts);
        var when = R.pick(a[4]);
        var correct = 'will ' + a[0];
        var reason = {};
        reason['will ' + a[1]] = 'will 뒤에는 -s/-es를 붙이지 않아요. 누가 하든 동사원형이에요.';
        reason['wills ' + a[0]] = 'will은 누가 하든 wills로 바뀌지 않아요.';
        reason['will ' + a[2]] = 'will 뒤에는 -ing 모양을 쓰지 않아요.';
        reason['will to ' + a[0]] = 'will 뒤에는 to 없이 동사원형만 써요.';
        var pick = R.choices(correct, R.shuffle(Object.keys(reason)));
        return {
          type: 'choice', concept: 2,
          q: '빈칸에 알맞은 말을 고르세요.\n\n' + who + ' [[빈칸]] ' + a[3] + ' ' + when + '.',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '앞으로 할 일은 will + 동사원형으로 말해요. 누가 하든 will과 ' + a[0] + '의 모양은 그대로예요.\n\n' + who + ' will ' + a[0] + ' ' + a[3] + ' ' + when + '.',
        };
      },
    },
    {
      id: 'short-form',
      level: 2,
      title: "줄임말 쓰기 (I'll, won't)",
      make: function (R) {
        var forms = [
          ['I will', "I'll", "Ill"], ['You will', "You'll", 'Youll'], ['He will', "He'll", null],
          ['She will', "She'll", 'Shell'], ['We will', "We'll", 'Well'], ['They will', "They'll", 'Theyll'],
        ];
        var acts = ['go camping', 'go fishing', 'visit the zoo', 'read many books', 'learn taekwondo', 'play badminton', 'watch a movie'];
        var times = ['tomorrow', 'this weekend', 'next week', 'this summer', 'this winter'];
        var act = R.pick(acts);
        var when = R.pick(times);
        if (R.int(1, 4) === 1) {
          var subj = R.pick(['I', 'He', 'She', 'We', 'They', 'Jiho', 'Mina']);
          return {
            type: 'short', check: 'text', concept: 1,
            q: '밑줄 친 말을 줄여 쓰세요.\n\n' + subj + ' __will not__ ' + act + ' ' + when + '.',
            answer: ["won't"],
            wrong: [
              { a: "willn't", why: "will not은 특별하게 won't로 바뀌어요." },
              { a: 'wont', why: "줄인 자리에 '를 찍어야 해요: won't" },
              { a: "don't", why: "don't는 do not의 줄임말이에요. will not은 won't예요." },
            ],
            explain: "will not의 줄임말은 won't예요. " + subj + " won't " + act + ' ' + when + '.',
          };
        }
        var f = R.pick(forms);
        return {
          type: 'short', check: 'text', concept: 1,
          q: '밑줄 친 말을 줄여 쓰세요.\n\n__' + f[0] + '__ ' + act + ' ' + when + '.',
          answer: [f[1]],
          wrong: (f[2] ? [{ a: f[2], why: "줄인 자리에 '(어퍼스트로피)를 찍어야 해요: " + f[1] }] : []).concat([{ a: f[1].slice(0, -1), why: 'l을 두 번 써요: ' + f[1] }]),
          explain: f[0] + "에서 will의 wi를 빼고 그 자리에 '를 찍어요. " + f[1] + ' ' + act + ' ' + when + '.',
        };
      },
    },
  ],

  vocab: [
    { w: 'vacation', m: '방학, 휴가', ex: 'Summer vacation starts next week.', exm: '여름 방학은 다음 주에 시작해.' },
    { w: 'plan', m: '계획', ex: 'What is your plan for this winter?', exm: '이번 겨울 네 계획은 뭐니?' },
    { w: 'will', m: '~할 것이다', ex: 'I will read many books.', exm: '나는 책을 많이 읽을 거야.' },
    { w: "won't", m: '~하지 않을 것이다 (will not)', ex: "I won't get up late.", exm: '나는 늦게 일어나지 않을 거야.' },
    { w: 'tomorrow', m: '내일', ex: 'I will go to the library tomorrow.', exm: '나는 내일 도서관에 갈 거야.' },
    { w: 'weekend', m: '주말', ex: 'We will go camping this weekend.', exm: '우리는 이번 주말에 캠핑하러 갈 거야.' },
    { w: 'next week', m: '다음 주', ex: 'She will visit her aunt next week.', exm: '그녀는 다음 주에 이모 댁을 방문할 거야.' },
    { w: 'go skiing', m: '스키 타러 가다', ex: 'My family will go skiing this winter.', exm: '우리 가족은 이번 겨울에 스키 타러 갈 거야.' },
    { w: 'go camping', m: '캠핑하러 가다', ex: 'Jiho will go camping with his dad.', exm: '지호는 아빠와 캠핑하러 갈 거야.' },
    { w: 'go swimming', m: '수영하러 가다', ex: 'Let\'s go swimming in the pool.', exm: '수영장에 수영하러 가자.' },
    { w: 'go fishing', m: '낚시하러 가다', ex: 'We will go fishing at the lake.', exm: '우리는 호수에 낚시하러 갈 거야.' },
    { w: 'visit', m: '방문하다, 찾아가다', ex: 'I will visit my grandparents.', exm: '나는 조부모님 댁을 방문할 거야.' },
    { w: 'grandparents', m: '조부모님 (할아버지와 할머니)', ex: 'My grandparents live in the country.', exm: '우리 조부모님은 시골에 사셔.' },
    { w: 'learn', m: '배우다', ex: 'I will learn to play the guitar.', exm: '나는 기타 치는 것을 배울 거야.' },
    { w: 'stay home', m: '집에 있다', ex: 'I will stay home and rest.', exm: '나는 집에서 쉴 거야.' },
  ],
});
