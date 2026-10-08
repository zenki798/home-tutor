/* 3학년 영어 · 물건 이름 묻고 답하기 */
Tutor.registerUnit({
  id: 'eng-e3-04',
  course: 'eng-e3',
  title: '물건 이름 묻고 답하기',
  summary: "What's this?로 물건 이름을 묻고 It's a ~.로 답하며 교실에 있는 물건 낱말을 익혀요.",
  goals: [
    "가까운 물건은 What's this?, 먼 물건은 What's that?으로 이름을 물을 수 있어요.",
    "It's a ~.로 답하고, 모음 소리 앞에서는 an을 쓸 수 있어요.",
    '교실 물건 낱말(book, pencil, eraser, ruler, bag, desk, chair)을 알 수 있어요.',
    "Is it a ~?로 확인하고 Yes, it is. / No, it isn't.로 답할 수 있어요.",
  ],
  standards: ['[4영01-05]', '[4영02-04]', '[4영02-08]'],

  concepts: [
    {
      title: "What's this?와 What's that?",
      body: "물건의 이름을 물을 때는 **What's this?** 또는 **What's that?**이라고 해요. What's는 What is를 줄인 말이에요.\n\n| 묻는 말 | 언제 써요? | 뜻 |\n|---|---|---|\n| **What's this?** | 가까이 있는 물건(손에 들었거나 바로 옆에 있을 때) | 이것은 뭐니? |\n| **What's that?** | 멀리 있는 물건(손가락으로 가리킬 만큼 떨어져 있을 때) | 저것은 뭐니? |\n\n> 💡 **this**는 \"이것\", **that**은 \"저것\"이에요. 손이 닿을 만큼 가까우면 this, 멀리 있으면 that이라고 기억해요.",
      easy: '우리말에도 "이것"과 "저것"이 있지요? 내 필통 속 연필은 "이것", 교실 저쪽 벽에 걸린 시계는 "저것"이에요.\n\n영어도 똑같아요. 이것은 this, 저것은 that이에요. 그래서 손에 든 물건은 What\'s this?, 멀리 있는 물건은 What\'s that?으로 물어요.',
      check: {
        type: 'choice',
        q: '**멀리 있는** 물건의 이름을 물을 때 하는 말은 무엇일까요?',
        choices: ["What's that?", "What's this?", "What's your name?"],
        answer: 0,
        why: ['', "What's this?는 가까이 있는 물건을 물을 때 써요.", "What's your name?은 사람의 이름을 묻는 말이에요."],
        explain: "멀리 있는 것은 that(저것)이에요. 그래서 What's that?(저것은 뭐니?)이라고 물어요.",
      },
    },
    {
      title: "It's a ~.로 답하기",
      body: "What's this?와 What's that?에는 모두 **It's a ~.**(그것은 ~야.)로 답해요. **It's**는 **It is**를 줄인 말이에요.\n\nA: What's this?\nB: It's a book.\n\nA: What's that?\nB: It's a chair.\n\n물건 하나를 말할 때는 낱말 앞에 **a**를 붙여요. a는 \"하나의\"라는 뜻이에요. 그래서 It's book.이 아니라 **It's a book.**이라고 해요.\n\n> ⚠️ this로 묻든 that으로 묻든 대답은 It's로 시작해요.",
      easy: "대답은 정해진 틀에 낱말만 넣으면 돼요.\n\nIt's a [[빈칸]].\n\n책이면 It's a book., 가방이면 It's a bag., 의자면 It's a chair.예요. 빈칸 앞의 a를 빠뜨리지 않게 조심해요.",
      check: {
        type: 'short', check: 'text',
        q: "빈칸에 알맞은 말을 쓰세요.\n\nA: What's this?\nB: [[It's]] a pencil.",
        answer: ["It's", 'It is'],
        wrong: [
          { a: 'Its', why: "It과 s 사이에 아포스트로피(')를 찍어요: It's" },
          { a: "I'm", why: "I'm은 \"나는 ~예요\"라는 뜻이에요. 물건을 말할 때는 It's(그것은 ~야)예요." },
        ],
        explain: "What's this?에는 It's a ~.로 답해요. It's는 It is를 줄인 말이라 It is라고 써도 맞아요.",
      },
    },
    {
      title: 'a와 an',
      body: "낱말이 **모음 소리**로 시작하면 a 대신 **an**을 써요. 모음 소리는 주로 a, e, i, o, u 글자가 내는 소리예요.\n\n| a를 쓰는 낱말 | an을 쓰는 낱말 |\n|---|---|\n| a book, a pencil, a ruler | an apple, an eraser, an orange |\n| a bag, a desk, a chair | an egg, an umbrella |\n\nIt's **an** apple. (그것은 사과야.)\nIt's **an** eraser. (그것은 지우개야.)\n\na 다음에 모음 소리가 바로 이어지면 소리가 부딪혀 말하기 불편해요. an을 쓰면 n 소리가 두 소리를 부드럽게 이어 줘요.\n\n> 💡 a, e, i, o, u로 시작하는 낱말은 대부분 모음 소리로 시작해서 an을 써요. 정확히는 첫 글자가 아니라 **첫소리**로 정해요(심화 학습에서 더 알아봐요).",
      easy: '"a apple"과 "an apple"을 소리 내어 차례로 말해 보세요. a 다음에 바로 apple의 첫소리가 오면 소리가 부딪혀서 끊어지지요?\n\nan을 쓰면 n이 두 소리 사이에 다리를 놓아 주어서 매끄럽게 이어져요. 그래서 apple, egg, eraser처럼 모음 소리로 시작하는 낱말 앞에는 an을 써요.',
      check: {
        type: 'choice',
        q: 'a와 an을 바르게 쓴 문장은 무엇일까요?',
        choices: ["It's an egg.", "It's a egg.", "It's an book."],
        answer: 0,
        why: ['', 'egg는 모음 소리로 시작하는 낱말이라서 a가 아니라 an을 써요.', "book은 자음 소리로 시작하는 낱말이라서 an이 아니라 a를 써요. It's a book.이라고 해요."],
        explain: "egg(달걀)는 모음 소리로 시작해서 an을 써요. 그래서 It's an egg.가 바른 문장이에요. book처럼 자음 소리로 시작하는 낱말 앞에는 a를 써요.",
      },
    },
    {
      title: '교실 물건 낱말',
      body: "교실에서 자주 보는 물건의 이름을 영어로 익혀 봐요.\n\n| 낱말 | 뜻 | 대답 |\n|---|---|---|\n| **book** | 책 | It's a book. |\n| **pencil** | 연필 | It's a pencil. |\n| **eraser** | 지우개 | It's **an** eraser. |\n| **ruler** | 자 | It's a ruler. |\n| **bag** | 가방 | It's a bag. |\n| **desk** | 책상 | It's a desk. |\n| **chair** | 의자 | It's a chair. |\n\n> ⚠️ eraser는 모음 소리로 시작해서 a가 아니라 **an**을 써요.",
      easy: '교실을 둘러보며 물건마다 영어 이름표를 붙인다고 생각해 보세요.\n\n책상 위에는 book(책), pencil(연필), eraser(지우개), ruler(자)가 있어요. 책상은 desk, 앉는 의자는 chair, 메고 다니는 가방은 bag이에요.',
      check: {
        type: 'choice',
        q: '"자"를 뜻하는 영어 낱말은 무엇일까요?',
        choices: ['ruler', 'eraser', 'pencil'],
        answer: 0,
        why: ['', 'eraser는 "지우개"예요.', 'pencil은 "연필"이에요.'],
        explain: '줄을 긋거나 길이를 재는 자는 ruler예요.',
      },
    },
    {
      title: "Is it a ~?로 확인하기",
      body: "무엇인지 짐작이 갈 때는 **Is it a ~?**(그것은 ~니?)라고 물어서 확인해요.\n\n맞으면 **Yes, it is.**(응, 그래.)\n틀리면 **No, it isn't.**(아니, 그렇지 않아.)라고 답해요. **isn't**는 **is not**을 줄인 말이에요.\n\nA: Is it a pencil?\nB: Yes, it is.\n\nA: Is it a ruler?\nB: No, it isn't. It's a pencil.\n\nNo라고 답할 때는 뒤에 It's a ~.로 무엇인지 알려 주면 더 친절해요.\n\n> ⚠️ Yes 뒤에는 it is, No 뒤에는 it isn't가 와요. Yes, it isn't.처럼 섞어 쓰지 않아요.",
      easy: "스무고개 놀이를 떠올려 보세요. \"그거 연필이야?\" 하고 물으면 친구가 \"응, 맞아!\" 또는 \"아니, 아니야!\"라고 하지요.\n\n영어로는 Is it a pencil?이라고 묻고, 맞으면 Yes, it is., 아니면 No, it isn't.라고 답해요.",
      check: {
        type: 'choice',
        q: "B가 든 물건은 정말 가방이에요. 빈칸에 알맞은 말은 무엇일까요?\n\nA: Is it a bag?\nB: [[빈칸]]",
        choices: ['Yes, it is.', "No, it isn't.", "Yes, it isn't."],
        answer: 0,
        why: ['', '가방이 맞으니 No가 아니라 Yes로 답해요.', 'Yes 뒤에는 it is가 와요. Yes와 isn\'t를 섞어 쓰지 않아요.'],
        explain: '맞으면 Yes, it is.라고 답해요.',
      },
    },
  ],

  examples: [
    {
      q: "교실 저쪽 멀리 있는 의자를 가리키며 묻는 대화예요. 빈칸에 알맞은 말을 넣어 보세요.\n\nA: [[빈칸]]\nB: It's a chair.",
      steps: [
        '물건이 멀리 있어요. 멀리 있는 것은 that(저것)이에요.',
        "물건의 이름을 물을 때는 What's ~?로 물어요.",
        "그래서 What's that?(저것은 뭐니?)이라고 물어요.",
      ],
      answer: "What's that?",
    },
    {
      q: "지아가 손에 든 물건은 지우개예요. What's this?에 알맞게 답해 보세요.",
      steps: [
        '지우개는 영어로 eraser예요.',
        'eraser는 모음 소리로 시작해요. 그래서 a가 아니라 an을 써요.',
        "물건 이름은 It's a(an) ~.로 말하니 It's an eraser.예요.",
      ],
      answer: "It's an eraser.",
    },
    {
      q: "B가 든 물건은 가방이에요. 대화를 완성해 보세요.\n\nA: Is it a book?\nB: [[빈칸]]",
      steps: [
        'A는 책(book)이냐고 물었어요.',
        "B의 물건은 가방이니 책이 아니에요. 그래서 No, it isn't.라고 답해요.",
        "무엇인지 알려 주면 더 친절해요: It's a bag.",
      ],
      answer: "No, it isn't. It's a bag.",
    },
  ],

  terms: [
    { term: 'this', def: '가까이 있는 것을 가리키는 말로, "이것"이라는 뜻이에요. 예: What\'s this?' },
    { term: 'that', def: '멀리 있는 것을 가리키는 말로, "저것"이라는 뜻이에요. 예: What\'s that?' },
    { term: 'a와 an', def: '물건 하나를 말할 때 낱말 앞에 붙이는 말이에요. 모음 소리로 시작하는 낱말 앞에는 an을 써요. 예: a book, an apple' },
    { term: '모음 소리', def: 'a, e, i, o, u 글자가 주로 내는 소리예요. apple, egg, eraser는 모음 소리로 시작해요.' },
    { term: '줄임말', def: "두 낱말을 하나로 줄인 말이에요. It's는 It is, isn't는 is not, What's는 What is를 줄인 말이에요." },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '**손에 든** 물건의 이름을 물을 때 하는 말은 무엇일까요?',
      choices: ["What's this?", "What's that?", 'Is it a book?', 'Nice to meet you.'],
      answer: 0,
      why: [
        '',
        "What's that?은 멀리 있는 물건을 물을 때 써요.",
        'Is it a book?은 이름을 묻는 말이 아니라 책인지 확인하는 말이에요.',
        'Nice to meet you.는 처음 만난 사람에게 하는 인사예요.',
      ],
      explain: "손에 든 물건은 가까이 있으니 this(이것)예요. 그래서 What's this?라고 물어요.",
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 3,
      q: '낱말 **eraser**의 뜻은 무엇일까요?',
      choices: ['지우개', '연필', '자', '가방'],
      answer: 0,
      why: ['', '연필은 pencil이에요.', '자는 ruler예요.', '가방은 bag이에요.'],
      explain: "eraser는 \"지우개\"예요. 모음 소리로 시작해서 It's an eraser.라고 해요.",
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 2,
      q: "빈칸에 a와 an 가운데 알맞은 말을 쓰세요.\n\nIt's [[an]] apple.",
      answer: ['an'],
      wrong: [{ a: 'a', why: 'apple은 모음 소리로 시작하는 낱말이라서 an을 써요.' }],
      explain: "apple(사과)은 모음 소리로 시작해요. 그래서 It's an apple.이에요.",
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: "What's that?이라고 물으면 It's a ~.로 답해요.",
      answer: true,
      explain: "What's this?와 What's that?에는 모두 It's a ~.로 답해요. 예: It's a chair.",
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 4,
      q: "B가 든 물건은 연필이에요. 빈칸에 알맞은 말은 무엇일까요?\n\nA: Is it a ruler?\nB: No, it isn't. [[빈칸]]",
      choices: ["It's a pencil.", "It's a ruler.", 'Yes, it is.', "It's an pencil."],
      answer: 0,
      why: [
        '',
        '자가 아니라고 했으니 무엇인지 알려 줘야 해요. 물건은 연필이에요.',
        "앞에서 No, it isn't.라고 했으니 Yes, it is.는 맞지 않아요.",
        'pencil은 모음 소리로 시작하지 않아서 a를 써요.',
      ],
      explain: "자가 아니니 No, it isn't.라고 한 뒤 It's a pencil.로 무엇인지 알려 줘요.",
    },
    {
      id: 'p6', level: 1, type: 'order', concept: 1,
      q: '"그것은 책상이야."가 되도록 순서대로 놓으세요.',
      choices: ["It's", 'a', 'desk.'],
      answer: [0, 1, 2],
      explain: "\"그것은 ~야.\"는 It's a ~.예요. 그래서 It's a desk.예요.",
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 2,
      q: '앞에 a가 아니라 **an**을 써야 하는 낱말은 무엇일까요?',
      choices: ['eraser', 'book', 'chair', 'bag'],
      answer: 0,
      why: [
        '',
        'book은 모음 소리로 시작하지 않아서 a book이에요.',
        'chair는 모음 소리로 시작하지 않아서 a chair예요.',
        'bag은 모음 소리로 시작하지 않아서 a bag이에요.',
      ],
      explain: 'eraser는 모음 소리로 시작해서 an eraser라고 해요.',
    },
    {
      id: 'p8', level: 1, type: 'short', check: 'text', concept: 3,
      q: '"가방"을 뜻하는 영어 낱말을 쓰세요.',
      answer: ['bag'],
      wrong: [
        { a: 'back', why: 'back은 "등, 뒤"라는 뜻의 다른 낱말이에요. 가방은 bag(끝 글자 g)이에요.' },
        { a: 'bak', why: '끝 글자가 달라요. 가방은 b, a, g로 써요.' },
      ],
      explain: "가방은 bag이에요. It's a bag.(그것은 가방이야.)",
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 0,
      q: "교실 뒤쪽 멀리 있는 가방을 가리키며 묻는 대화예요. 빈칸에 알맞은 말은 무엇일까요?\n\nA: [[빈칸]]\nB: It's a bag.",
      choices: ["What's that?", "What's this?", 'Is it a bag?', "What's your name?"],
      answer: 0,
      why: [
        '',
        "What's this?는 가까이 있는 물건을 물을 때 써요. 가방은 멀리 있어요.",
        "Is it a bag?에는 Yes, it is.나 No, it isn't.로 답해요. B는 It's a bag.이라고 답했어요.",
        "What's your name?은 사람의 이름을 묻는 말이에요.",
      ],
      hint: '물건이 가까이 있는지 멀리 있는지, B가 어떻게 답했는지 살펴보세요.',
      explain: "멀리 있는 물건의 이름은 What's that?으로 물어요. 그러면 It's a bag.이라고 답해요.",
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'text', concept: 4,
      q: "빈칸에 알맞은 말을 쓰세요.\n\nA: Is it a chair?\nB: No, it [[isn't]]. It's a desk.",
      answer: ["isn't", 'is not'],
      hint: 'No로 답했어요. "아니야"가 되려면 is 뒤에 무엇이 붙어야 할까요?',
      wrong: [
        { a: 'is', why: 'is만 쓰면 "맞아"라는 뜻이 돼요. No로 답할 때는 isn\'t를 써요(is not이라고 써도 돼요).' },
        { a: 'isnt', why: "n과 t 사이에 아포스트로피(')를 찍어요: isn't" },
      ],
      explain: "의자가 아니라 책상이니 No, it isn't.라고 답해요. isn't는 is not을 줄인 말이라 is not이라고 써도 맞아요.",
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 2,
      q: '바르게 쓴 문장은 무엇일까요?',
      choices: ["It's an eraser.", "It's a eraser.", "It's eraser.", "It's an ruler."],
      answer: 0,
      why: [
        '',
        'eraser는 모음 소리로 시작해서 a가 아니라 an을 써요.',
        '물건 하나를 말할 때는 낱말 앞에 a나 an을 붙여요.',
        'ruler는 모음 소리로 시작하지 않아서 a ruler라고 해요.',
      ],
      hint: '낱말의 첫소리가 모음 소리인지 살펴보세요.',
      explain: "eraser는 모음 소리로 시작하니 It's an eraser.가 맞아요. ruler라면 It's a ruler.예요.",
    },
    {
      id: 'p12', level: 2, type: 'order', concept: 4,
      q: '"그것은 연필이니?"가 되도록 순서대로 놓으세요.',
      choices: ['Is', 'it', 'a pencil?'],
      answer: [0, 1, 2],
      hint: '묻는 말은 Is로 시작해요.',
      explain: '"그것은 ~니?"는 Is it a ~?예요. 그래서 Is it a pencil?이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 2,
      q: 'a와 an을 **모두 바르게** 쓴 것은 무엇일까요?',
      choices: ['an apple, a desk, an egg', 'a apple, a desk, an egg', 'an apple, an desk, an egg', 'an apple, a desk, a egg'],
      answer: 0,
      why: [
        '',
        'apple은 모음 소리로 시작해서 an apple이에요.',
        'desk는 모음 소리로 시작하지 않아서 a desk예요.',
        'egg는 모음 소리로 시작해서 an egg예요.',
      ],
      hint: '세 낱말의 첫소리를 하나씩 확인해 보세요.',
      explain: 'apple과 egg는 모음 소리로 시작해서 an, desk는 아니어서 a를 써요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: "소라가 물건을 등 뒤에 숨기고 퀴즈를 내요. 대화를 읽고, 소라가 숨긴 물건을 고르세요.\n\nSora: What's this?\nJiho: Is it a ruler?\nSora: No, it isn't.\nJiho: Is it a pencil?\nSora: Yes, it is.",
      choices: ['연필', '자', '지우개', '책'],
      answer: 0,
      why: [
        '',
        "소라가 Is it a ruler?에 No, it isn't.라고 답했으니 자가 아니에요.",
        '지우개(eraser)는 대화에 나오지 않았어요.',
        '책(book)은 대화에 나오지 않았어요.',
      ],
      hint: 'Yes, it is.라고 답한 물음을 찾아보세요.',
      explain: "지호가 Is it a pencil?이라고 묻자 소라가 Yes, it is.라고 했어요. 그래서 숨긴 물건은 연필이에요.",
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 0,
      q: "지호가 멀리 있는 공을 가리키며 What's that?이라고 물었어요. 이번에는 그 공을 주워 손에 들고 다시 물어요. 알맞은 말은 무엇일까요?",
      choices: ["What's this?", "What's that?", "It's a ball.", 'Yes, it is.'],
      answer: 0,
      why: [
        '',
        '공이 이제 손에 있어서 가까워요. 가까운 것은 this예요.',
        "It's a ball.은 묻는 말이 아니라 대답이에요.",
        'Yes, it is.는 Is it a ~?에 답하는 말이에요.',
      ],
      hint: '공과 지호 사이의 거리가 어떻게 바뀌었는지 생각해 보세요.',
      explain: "멀리 있을 때는 that, 손에 들어 가까워지면 this예요. 그래서 What's this?라고 물어요.",
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 a와 an 가운데 알맞은 말을 쓰세요.\n\nA: Is it [[?]] umbrella?\nB: Yes, it is.',
      answer: ['an'],
      hint: 'umbrella(우산)의 첫소리를 생각해 보세요.',
      wrong: [{ a: 'a', why: 'umbrella는 모음 소리로 시작하는 낱말이라서 an을 써요.' }],
      explain: 'umbrella(우산)는 모음 소리로 시작해요. 묻는 말에서도 똑같이 an을 써서 Is it an umbrella?예요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: "A가 B 옆에 있는 물건을 보고 물어요. 그 물건은 정말 책상이에요. B의 대답으로 **옳지 않은** 것은 무엇일까요?\n\nA: Is it a desk?",
      choices: ["Yes, it's.", 'Yes, it is.', "Yes, it's a desk."],
      answer: 0,
      why: [
        '',
        'Yes, it is.는 맞는 대답이에요.',
        "Yes, it's a desk.는 뒤에 desk가 있어서 it's로 줄여도 맞는 대답이에요.",
      ],
      hint: '대답이 it is로 끝날 때 줄여 쓸 수 있는지 생각해 보세요.',
      explain: "짧은 대답이 it is로 끝날 때는 줄이지 않고 Yes, it is.라고 해요. 뒤에 낱말이 이어지는 Yes, it's a desk.는 줄여도 괜찮아요.",
    },
  ],

  deeper: [
    {
      title: 'a와 an은 글자가 아니라 소리로 정해요',
      body: "a와 an은 낱말의 **첫 글자**가 아니라 **첫소리**로 정해요. 대부분은 a, e, i, o, u로 시작하면 모음 소리이지만, 그렇지 않은 낱말도 있어요.\n\n- **hour**(1시간)는 h로 시작하지만 h 소리를 내지 않고 모음 소리로 시작해요. 그래서 **an hour**라고 해요.\n- **uniform**(교복)은 u로 시작하지만 첫소리가 you와 같은 소리라서 **a uniform**이라고 해요.\n\n그래서 처음 보는 낱말은 소리를 들어 보고 a와 an을 정하면 돼요. 4학년에서는 잃어버린 물건을 찾으며 물건이 무엇인지 묻고 답하는 말을 더 배워요.",
    },
  ],

  faq: [
    {
      q: 'this랑 that은 어떻게 구별해요?',
      a: '물건이 나와 가까이 있으면 this(이것), 멀리 있으면 that(저것)이에요. 손이 닿을 만큼 가까우면 this라고 기억하면 쉬워요.',
    },
    {
      q: '왜 apple 앞에는 a가 아니라 an을 써요?',
      a: 'apple은 모음 소리로 시작해요. a 다음에 모음 소리가 바로 오면 소리가 부딪혀서 말하기 불편해요. 그래서 a 대신 an을 써서 an apple이라고 해요. egg, eraser, orange, umbrella도 마찬가지예요.',
    },
    {
      q: "Is it a ~?에 No라고 답하면 그걸로 끝이에요?",
      a: "No, it isn't.만 말해도 틀린 대답은 아니에요. 하지만 뒤에 It's a ~.로 무엇인지 알려 주면 더 친절해요. 예: No, it isn't. It's a ruler.",
    },
  ],

  mistakes: [
    "It's a apple.처럼 모음 소리 앞에 a를 쓰는 실수 — It's an apple., It's an eraser.예요.",
    "It's book.처럼 a를 빠뜨리는 실수 — 물건 하나를 말할 때는 It's a book.처럼 a를 붙여요.",
    "Yes, it's.처럼 짧은 대답을 줄여 쓰는 실수 — 짧은 대답은 Yes, it is.로 줄이지 않고 써요.",
  ],

  gens: [
    {
      id: 'a-or-an',
      level: 1,
      title: "It's a ~. / It's an ~. 고르기",
      make: function (R) {
        // [낱말, 뜻, 모음 소리로 시작하는가]
        var items = [
          ['apple', '사과', true], ['egg', '달걀', true], ['eraser', '지우개', true], ['orange', '오렌지', true],
          ['umbrella', '우산', true], ['ant', '개미', true], ['octopus', '문어', true], ['elephant', '코끼리', true],
          ['onion', '양파', true], ['igloo', '이글루', true],
          ['book', '책', false], ['pencil', '연필', false], ['ruler', '자', false], ['bag', '가방', false],
          ['desk', '책상', false], ['chair', '의자', false], ['cat', '고양이', false], ['dog', '개', false],
          ['ball', '공', false], ['cup', '컵', false],
        ];
        var it = R.pick(items);
        var w = it[0];
        var art = it[2] ? 'an' : 'a';
        var other = it[2] ? 'a' : 'an';
        var ans = "It's " + art + ' ' + w + '.';
        var wrongA = "It's " + other + ' ' + w + '.';
        var wrongB = "It's " + w + '.';
        var reason = {};
        reason[wrongA] = it[2]
          ? '낱말 ' + w + '의 첫소리는 모음 소리라서 a가 아니라 an을 써요.'
          : '낱말 ' + w + '의 첫소리는 모음 소리가 아니라서 an이 아니라 a를 써요.';
        reason[wrongB] = '물건 하나를 말할 때는 낱말 앞에 a나 an을 붙여요.';
        var pick = R.choices(ans, [wrongA, wrongB], 3);
        return {
          type: 'choice', concept: 2,
          q: '지아가 그림 카드를 손에 들고 있어요. 카드 속 그림은 **' + it[1] + '**(' + w + ')' + R.josa(it[1], '이에요/예요') + ". What's this?에 알맞은 대답을 고르세요.",
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === ans ? '' : reason[c]; }),
          explain: '낱말 ' + w + '의 첫소리는 ' + (it[2] ? '모음 소리예요. 그래서 an을 써요.' : '모음 소리가 아니에요. 그래서 a를 써요.') + '\n\n답: ' + ans,
        };
      },
    },
    {
      id: 'this-or-that',
      level: 2,
      title: "What's this? / What's that? 고르기",
      make: function (R) {
        var people = ['민수', '지아', '서준', '하윤', '도윤', '수아'];
        var things = [['book', false], ['pencil', false], ['eraser', true], ['ruler', false], ['bag', false],
          ['desk', false], ['chair', false], ['apple', true], ['umbrella', true], ['clock', false]];
        var near = ['바로 옆에 있는 물건을 만지며', '바로 앞에 있는 물건에 손을 얹고'];
        var far = ['교실 저쪽 멀리 있는 물건을 가리키며', '교실 맨 뒤쪽 멀리 있는 물건을 가리키며'];
        var who = R.pick(people);
        var isNear = R.bool();
        var how = isNear ? R.pick(near) : R.pick(far);
        var th = R.pick(things);
        var art = th[1] ? 'an ' : 'a ';
        var reply = "It's " + art + th[0] + '.';
        var ans = isNear ? "What's this?" : "What's that?";
        var opp = isNear ? "What's that?" : "What's this?";
        var isIt = 'Is it ' + art + th[0] + '?';
        var reason = {};
        reason[opp] = isNear
          ? "What's that?은 멀리 있는 물건을 물을 때 써요. 이 물건은 가까이 있어요."
          : "What's this?는 가까이 있는 물건을 물을 때 써요. 이 물건은 멀리 있어요.";
        reason["What's your name?"] = "What's your name?은 사람의 이름을 묻는 말이에요.";
        reason[isIt] = "Is it ~?에는 Yes, it is.나 No, it isn't.로 답해요. 그런데 친구는 물건의 이름을 알려 주었어요.";
        var pick = R.choices(ans, [opp, "What's your name?", isIt]);
        return {
          type: 'choice', concept: 0,
          q: who + R.josa(who, '이/가') + ' ' + how + ' 물어요. 빈칸에 알맞은 말을 고르세요.\n\n' + who + ': [[빈칸]]\n친구: ' + reply,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === ans ? '' : reason[c]; }),
          explain: isNear
            ? "물건이 가까이 있으니 this(이것)를 써서 What's this?(이것은 뭐니?)라고 물어요."
            : "물건이 멀리 있으니 that(저것)을 써서 What's that?(저것은 뭐니?)이라고 물어요.",
        };
      },
    },
    {
      id: 'is-it',
      level: 2,
      title: 'Is it a ~?에 답하기',
      make: function (R) {
        var things = [['book', '책', false], ['pencil', '연필', false], ['eraser', '지우개', true], ['ruler', '자', false],
          ['bag', '가방', false], ['desk', '책상', false], ['chair', '의자', false]];
        var two = R.sample(things, 2);
        var real = two[0];
        var same = R.bool();
        var asked = same ? real : two[1];
        function an(t) { return (t[2] ? 'an ' : 'a ') + t[0]; }
        var realIs = real[1] + R.josa(real[1], '이에요/예요');
        var ans;
        var wrongs;
        var reason = {};
        if (same) {
          ans = 'Yes, it is.';
          wrongs = ["No, it isn't.", "Yes, it isn't.", "No, it isn't. It's " + an(two[1]) + '.'];
          reason[wrongs[0]] = '물건이 정말 ' + realIs + '. 맞으니 Yes로 답해요.';
          reason[wrongs[1]] = "Yes 뒤에는 it is가 와요. Yes와 isn't를 섞어 쓰지 않아요.";
          reason[wrongs[2]] = '물건이 정말 ' + realIs + '. 맞으니 Yes, it is.로 답해요.';
        } else {
          ans = "No, it isn't. It's " + an(real) + '.';
          wrongs = ['Yes, it is.', "No, it isn't. It's " + an(asked) + '.', "Yes, it isn't."];
          reason[wrongs[0]] = '물건은 ' + asked[1] + R.josa(asked[1], '이/가') + ' 아니라 ' + realIs + '. 아니니 No로 답해요.';
          reason[wrongs[1]] = 'No라고 한 뒤에는 진짜 물건의 이름을 알려 줘요. 물건은 ' + realIs + '.';
          reason[wrongs[2]] = "Yes 뒤에는 it is가 와요. Yes와 isn't를 섞어 쓰지 않아요.";
        }
        var pick = R.choices(ans, wrongs);
        return {
          type: 'choice', concept: 4,
          q: 'A가 B 옆에 있는 물건을 보고 물어요. 그 물건은 **' + real[1] + '**(' + real[0] + ')' + R.josa(real[1], '이에요/예요') + '. 빈칸에 알맞은 대답을 고르세요.\n\nA: Is it ' + an(asked) + '?\nB: [[빈칸]]',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === ans ? '' : reason[c]; }),
          explain: same
            ? '물건이 정말 ' + realIs + '. 맞으니 Yes, it is.라고 답해요.'
            : '물건은 ' + asked[1] + R.josa(asked[1], '이/가') + ' 아니라 ' + realIs + ". 그래서 No, it isn't.라고 한 뒤 It's " + an(real) + '.로 무엇인지 알려 줘요.',
        };
      },
    },
  ],

  vocab: [
    { w: 'book', m: '책', ex: "It's a book.", exm: '그것은 책이야.' },
    { w: 'pencil', m: '연필', ex: 'Is it a pencil?', exm: '그것은 연필이니?' },
    { w: 'eraser', m: '지우개', ex: "It's an eraser.", exm: '그것은 지우개야.' },
    { w: 'ruler', m: '자', ex: 'My ruler is long.', exm: '내 자는 길어.' },
    { w: 'bag', m: '가방', ex: 'This is my bag.', exm: '이것은 내 가방이야.' },
    { w: 'desk', m: '책상', ex: "It's a desk.", exm: '그것은 책상이야.' },
    { w: 'chair', m: '의자', ex: "What's that? It's a chair.", exm: '저것은 뭐니? 그것은 의자야.' },
    { w: 'apple', m: '사과', ex: "It's an apple.", exm: '그것은 사과야.' },
    { w: 'umbrella', m: '우산', ex: 'Is it an umbrella?', exm: '그것은 우산이니?' },
    { w: 'this', m: '이것(가까이 있는 것)', ex: "What's this?", exm: '이것은 뭐니?' },
    { w: 'that', m: '저것(멀리 있는 것)', ex: "What's that?", exm: '저것은 뭐니?' },
  ],
});
