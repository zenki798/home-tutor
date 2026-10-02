/* 5학년 영어 · 허락 구하고 답하기 */
Tutor.registerUnit({
  id: 'eng-e5-02',
  course: 'eng-e5',
  title: '허락 구하고 답하기',
  summary: "May I ~?나 Can I ~?로 허락을 구하고, Sure.나 Sorry, you can't.로 알맞게 답해요.",
  goals: [
    'May I ~?나 Can I ~?로 허락을 구할 수 있어요.',
    "Sure., Of course., Go ahead.로 허락하고 Sorry, you can't.로 거절할 수 있어요.",
    "You can ~ here.와 You can't ~ here.로 장소의 규칙을 말할 수 있어요.",
    '공공장소의 안내 표지를 읽고 뜻을 알 수 있어요.',
  ],
  standards: ['[6영02-07]', '[6영01-08]', '[6영01-03]'],

  concepts: [
    {
      title: '허락 구하기: May I ~? / Can I ~?',
      body: "어떤 일을 해도 되는지 물을 때는 **May I ~?** 나 **Can I ~?** 를 써요. 뒤에는 하고 싶은 일을 그대로 이어 붙여요.\n\n- **May I** come in? (들어가도 될까요?)\n- **Can I** open the window? (창문을 열어도 돼요?)\n- **Can I** use your pencil? (네 연필 써도 돼?)\n\nMay I ~?가 조금 더 공손한 말이라서 선생님이나 어른께 여쭐 때 잘 어울려요. Can I ~?는 친구나 가족 사이에서 편하게 써요.\n\n> ⚠️ I can open the window.는 '나는 창문을 열 수 있어요'라는 말이에요. 물을 때는 Can I로 순서를 바꾸고 끝에 물음표를 붙여요.",
      easy: "교실 문 앞에서 똑똑 노크하고 '들어가도 돼요?' 하고 묻는 장면을 떠올려 보세요. 영어로는 May I come in?이에요.\n\n'May I' 또는 'Can I' 뒤에 하고 싶은 일을 붙이기만 하면 돼요.\n\n- come in(들어가다) → May I come in?\n- sit here(여기 앉다) → Can I sit here?",
      check: {
        type: 'choice',
        q: "'창문을 열어도 돼요?'라고 허락을 구하는 말은 무엇일까요?",
        choices: ['Can I open the window?', 'I can open the window.', 'Open the window, please.'],
        answer: 0,
        why: ['', "'나는 창문을 열 수 있어요'라는 말이에요. 물을 때는 Can I로 시작해요.", '창문을 열어 달라고 부탁하는 말이에요. 내가 열어도 되는지 묻는 말이 아니에요.'],
        explain: 'Can I 뒤에 하고 싶은 일을 붙이고 끝에 물음표를 써요: Can I open the window?',
      },
    },
    {
      title: '허락하는 말',
      body: "허락을 구하는 말에 '좋아요, 해도 돼요'라고 답할 때는 이렇게 말해요.\n\n- **Sure.** (그럼.)\n- **Of course.** (물론이에요.)\n- **Go ahead.** (그렇게 하세요.)\n- **Yes, you can.** (응, 해도 돼.)\n\nA: May I come in?\nB: **Of course.** Come in, please.\n\n물건을 빌려줄 때는 Sure. Here you are.(그럼. 여기 있어.)처럼 이어서 말하기도 해요.",
      easy: "친구가 '네 지우개 써도 돼?' 하고 물으면 우리말로 '그럼!', '물론이지!', '써!'라고 답하지요? 영어에도 이런 말이 여러 개 있어요.\n\n- Sure. → 그럼!\n- Of course. → 물론이지!\n- Go ahead. → 어서 해!\n\n셋 다 '좋아, 해도 돼'라는 뜻이에요.",
      check: {
        type: 'ox',
        q: '**Go ahead.** 는 허락하는 말이에요.',
        answer: true,
        explain: "Go ahead.는 '그렇게 하세요, 어서 해요'라는 뜻으로 허락할 때 써요. Sure., Of course.도 허락하는 말이에요.",
      },
    },
    {
      title: '거절하는 말',
      body: "허락할 수 없을 때는 **Sorry, you can't.** (미안하지만 안 돼요.)라고 해요. 더 공손하게 **I'm sorry, but you can't.** 라고도 해요.\n\n거절할 때 **까닭을 덧붙이면** 듣는 사람이 덜 서운해요.\n\nA: Can I open the window?\nB: Sorry, you can't. It's too cold.\n\nA: Can I play outside?\nB: Sorry, you can't. It's raining.\n\n**can't** 는 cannot을 줄인 말이에요.\n\n> ⚠️ Sure.로 허락해 놓고 뒤에 '안 되는 까닭'을 붙이면 말이 어색해요. 까닭이 '안 돼요' 쪽이면 Sorry, you can't.로 답해요.",
      easy: "'안 돼!'라고만 하면 친구가 서운하겠지요? '미안, 안 돼. 지금 추워서.'처럼 말하면 훨씬 부드러워요.\n\n영어도 같아요.\n\n1. Sorry(미안해)로 시작하고\n2. you can't(안 돼)를 말한 뒤\n3. 까닭을 덧붙여요. → It's too cold.",
      check: {
        type: 'choice',
        q: "대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: Can I watch TV now?\nB: [[Sorry, you can't.]] Do your homework first.",
        choices: ["Sorry, you can't.", 'Sure.', 'Go ahead.'],
        answer: 0,
        why: ['', '허락하는 말이에요. 뒤에 숙제를 먼저 하라고 했으니 거절해야 어울려요.', '허락하는 말이에요. 뒤에 숙제를 먼저 하라고 했으니 거절해야 어울려요.'],
        explain: "B가 숙제를 먼저 하라고 했으니 지금은 안 된다는 뜻이에요. 그래서 거절하는 말 Sorry, you can't.가 알맞아요.",
      },
    },
    {
      title: '규칙 말하기: You can ~ / You can\'t ~',
      body: "**can** 과 **can't** 를 쓰면 어떤 곳의 규칙을 말할 수 있어요.\n\n| 해도 되는 일 | 하면 안 되는 일 |\n|---|---|\n| You **can** take pictures here. (여기서 사진을 찍어도 돼요.) | You **can't** run here. (여기서 뛰면 안 돼요.) |\n| You **can** sit here. (여기 앉아도 돼요.) | You **can't** eat here. (여기서 먹으면 안 돼요.) |\n\nYou can ~ here.는 '여기서 ~해도 돼요', You can't ~ here.는 '여기서 ~하면 안 돼요'라는 뜻이에요.\n\n> 💡 can과 can't는 끝소리 하나 차이로 뜻이 반대가 돼요. 끝까지 잘 듣고 읽어요. 4학년 때 배운 Don't run.도 비슷한 뜻이에요.",
      easy: "학교 복도에는 '뛰지 않기', 도서관에는 '조용히 하기' 같은 약속이 있지요?\n\n그런 약속을 영어로 말할 때는 '해도 돼요'에 You can, '하면 안 돼요'에 You can't를 써요.\n\n- You can read here. → 여기서 읽어도 돼요.\n- You can't run here. → 여기서 뛰면 안 돼요.",
      check: {
        type: 'choice',
        q: "**You can't swim here.** 의 뜻은 무엇일까요?",
        choices: ['여기서 수영하면 안 돼요.', '여기서 수영해도 돼요.', '여기서 수영할 수 있어요?'],
        answer: 0,
        why: ['', "can't를 can으로 읽었어요. can't는 '하면 안 돼요'예요.", '묻는 말이 아니에요. 물음표가 아니라 마침표로 끝났어요.'],
        explain: "You can't ~ here.는 '여기서 ~하면 안 돼요'라는 규칙이에요. swim은 '수영하다'예요.",
      },
    },
    {
      title: '공공장소의 안내 표지 읽기',
      body: "도서관, 박물관, 수영장 같은 **공공장소**에는 규칙을 짧게 적은 **안내 표지**가 있어요.\n\n| 표지 | 뜻 | 같은 뜻의 문장 |\n|---|---|---|\n| **No food.** | 음식 금지 | You can't eat here. |\n| **No pets.** | 반려동물 금지 | You can't bring pets here. |\n| **No running.** | 뛰기 금지 | You can't run here. |\n| **Quiet, please.** | 조용히 해 주세요 | You can't talk loudly here. |\n\nNo 뒤에 낱말이 오면 '~ 안 돼요, ~ 금지'라는 뜻이에요. Quiet, please.는 '조용히 해 주세요'라는 부탁이에요.",
      easy: "표지는 바쁜 사람도 한눈에 알아보게 만든 아주 짧은 말이에요.\n\n'No'를 보면 '안 돼요!'를 떠올리세요. No 뒤에 오는 낱말이 하면 안 되는 것이에요.\n\n- No food. → 음식 안 돼요!\n- No pets. → 반려동물 안 돼요!",
      check: {
        type: 'choice',
        q: '**No pets.** 표지가 뜻하는 것은 무엇일까요?',
        choices: ['반려동물을 데려오면 안 돼요.', '음식을 먹으면 안 돼요.', '반려동물을 데려와도 돼요.'],
        answer: 0,
        why: ['', '음식 금지는 No food.예요. pet은 반려동물이에요.', "No는 '안 돼요'라는 뜻이에요. 해도 된다는 뜻이 아니에요."],
        explain: "pet은 반려동물이고 No는 '안 돼요'예요. 그래서 No pets.는 반려동물을 데려오면 안 된다는 표지예요.",
      },
    },
  ],

  examples: [
    {
      q: '도서관에서 친구가 이렇게 물었어요. 알맞게 답해 보세요.\n\nA: Can I eat my sandwich here?',
      steps: [
        'Can I ~?는 허락을 구하는 말이에요. 친구는 여기서 샌드위치를 먹어도 되는지 묻고 있어요.',
        '도서관에서는 음식을 먹으면 안 되니 거절해야 해요.',
        "Sorry, you can't.로 부드럽게 거절하고 까닭(규칙)을 덧붙여요.",
      ],
      answer: "Sorry, you can't. You can't eat in the library.",
    },
    {
      q: '안내 표지를 보고 같은 뜻의 문장으로 바꿔 보세요.\n\n**No running.**',
      steps: [
        "No 뒤에 오는 낱말 running은 '뛰기'라는 뜻이에요. 뛰기가 하면 안 되는 일이에요.",
        "하면 안 되는 일은 You can't ~ here.로 말해요.",
        'running을 run으로 바꾸어 넣어요.',
      ],
      answer: "You can't run here.",
    },
  ],

  terms: [
    { term: '허락', def: '어떤 일을 해도 된다고 받아들여 주는 것이에요. 허락을 구할 때는 May I ~?나 Can I ~?를 써요.' },
    { term: '거절', def: "부탁이나 요청을 받아들이지 않는 것이에요. 예: Sorry, you can't." },
    { term: '안내 표지', def: '공공장소의 규칙을 짧은 말이나 그림으로 알려 주는 판이에요. 예: No food. / Quiet, please.' },
    { term: '공공장소', def: '도서관, 박물관, 수영장처럼 여러 사람이 함께 쓰는 곳이에요.' },
    { term: '줄임말', def: "두 낱말을 줄여 한 낱말처럼 쓴 말이에요. 빠진 글자 자리에 ' 표시를 해요. 예: can't = cannot, I'm = I am" },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: "교실 문 앞에서 선생님께 '들어가도 될까요?'라고 여쭐 때 알맞은 말은 무엇일까요?",
      choices: ['May I come in?', 'May I go out?', 'Can you come in?', 'Come in, please.'],
      answer: 0,
      why: [
        '',
        "'나가도 될까요?'라는 뜻이에요. come in이 '들어가다'예요.",
        '상대에게 들어올 수 있는지 묻는 말이에요. 내가 해도 되는지 물을 때는 May I나 Can I로 시작해요.',
        "'들어오세요'라고 권하는 말이에요. 선생님이 하실 말이에요.",
      ],
      explain: 'May I 뒤에 come in(들어가다)을 붙인 May I come in?이 알맞아요. May I는 어른께 여쭐 때 잘 어울려요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '허락하는 말이 **아닌** 것은 무엇일까요?',
      choices: ["Sorry, you can't.", 'Sure.', 'Of course.', 'Go ahead.'],
      answer: 0,
      why: ['', "'그럼'이라는 뜻으로 허락하는 말이에요.", "'물론이에요'라는 뜻으로 허락하는 말이에요.", "'그렇게 하세요'라는 뜻으로 허락하는 말이에요."],
      explain: "Sure., Of course., Go ahead.는 모두 허락하는 말이고, Sorry, you can't.는 거절하는 말이에요.",
    },
    {
      id: 'p3', level: 1, type: 'short', concept: 0,
      q: '빈칸에 알맞은 낱말을 쓰세요.\n\nA: [[May]] I use your pencil?\nB: Sure. Here you are.',
      answer: ['May', 'Can'],
      wrong: [{ a: 'Do', why: 'Do I ~?는 허락을 구하는 말이 아니에요. May나 Can으로 시작해요.' }],
      explain: '허락을 구할 때는 May I ~?나 Can I ~?를 써요. 그래서 May와 Can 모두 정답이에요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 3,
      q: "**You can't run here.** 는 '여기서 뛰어도 돼요'라는 뜻이에요.",
      answer: false,
      explain: "can't는 '하면 안 돼요'라는 뜻이에요. You can't run here.는 '여기서 뛰면 안 돼요'예요. '뛰어도 돼요'는 You can run here.예요.",
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 4,
      q: '**Quiet, please.** 표지가 있는 곳에서 알맞은 행동은 무엇일까요?',
      choices: ['조용히 책을 읽어요.', '큰 소리로 노래해요.', '친구를 큰 소리로 불러요.', '공을 차며 놀아요.'],
      answer: 0,
      why: ['', "Quiet, please.는 '조용히 해 주세요'라는 뜻이에요. 큰 소리는 안 돼요.", "Quiet, please.는 '조용히 해 주세요'라는 뜻이에요. 큰 소리로 부르면 안 돼요.", '조용히 해야 하는 곳에서 공놀이는 어울리지 않아요.'],
      explain: "quiet는 '조용한'이라는 뜻이에요. Quiet, please. 표지가 있는 곳에서는 조용히 지내야 해요.",
    },
    {
      id: 'p6', level: 1, type: 'order', concept: 0,
      q: "'창문을 열어도 돼요?'라는 뜻이 되도록 순서대로 놓으세요.",
      choices: ['open', 'Can', 'the window?', 'I'],
      answer: [1, 3, 0, 2],
      explain: 'Can I로 시작하고, 하고 싶은 일 open the window를 이어 붙여요. → Can I open the window?',
    },
    {
      id: 'p7', level: 1, type: 'short', concept: 2,
      q: '빈칸에 알맞은 낱말을 쓰세요.\n\nA: Can I play soccer in the classroom?\nB: Sorry, you [[can\'t]].',
      answer: ["can't", 'cannot'],
      wrong: [{ a: 'can', why: "Sorry로 시작했으니 거절하는 말이에요. '안 돼요'라는 뜻의 can't를 써요." }],
      explain: "거절할 때는 Sorry, you can't.라고 해요. 교실에서 축구를 하면 안 되니까요. can't 대신 cannot이라고 써도 돼요.",
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 2,
      q: "대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: Can I play the piano now?\nB: [[Sorry, you can't.]] It's very late.",
      choices: ["Sorry, you can't.", 'Sure.', 'Yes, you can.', 'Go ahead.'],
      answer: 0,
      why: [
        '',
        '허락하는 말이에요. 뒤에 너무 늦었다는 까닭이 있으니 거절해야 어울려요.',
        '허락하는 말이에요. 뒤에 너무 늦었다는 까닭이 있으니 거절해야 어울려요.',
        '허락하는 말이에요. 뒤에 너무 늦었다는 까닭이 있으니 거절해야 어울려요.',
      ],
      hint: "빈칸 뒤의 It's very late.(아주 늦었어.)를 먼저 읽어 보세요.",
      explain: "It's very late.는 피아노를 치면 안 되는 까닭이에요. 그래서 거절하는 말 Sorry, you can't.가 알맞아요.",
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: '**No pets.** 표지와 뜻이 같은 문장은 무엇일까요?',
      choices: ["You can't bring your dog here.", 'You can bring your dog here.', "You can't eat here.", "You can't take pictures here."],
      answer: 0,
      why: ['', "can은 '해도 돼요'예요. No pets.는 반려동물을 데려오면 안 된다는 뜻이에요.", '음식 금지(No food.)와 같은 뜻이에요.', '사진 찍기 금지와 같은 뜻이에요.'],
      hint: 'pet은 반려동물이에요. 개도 반려동물이지요.',
      explain: "No pets.는 반려동물 금지예요. 강아지는 반려동물이니 '여기 개를 데려오면 안 돼요'라는 You can't bring your dog here.와 뜻이 같아요.",
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: "글을 읽고 물음에 답하세요.\n\n> Welcome to the art museum. You can take pictures here. You can't touch the paintings. You can't eat or drink here.\n\n이 미술관에서 **할 수 있는** 일은 무엇일까요?",
      choices: ['사진 찍기', '그림 만지기', '음료수 마시기', '간식 먹기'],
      answer: 0,
      why: ['', "You can't touch the paintings.라고 했어요. 그림을 만지면 안 돼요.", "You can't eat or drink here.라고 했어요. 마시면 안 돼요.", "You can't eat or drink here.라고 했어요. 먹으면 안 돼요."],
      hint: "can으로 쓴 문장과 can't로 쓴 문장을 나누어 보세요.",
      explain: "You can take pictures here.라고 했으니 사진은 찍어도 돼요. 그림 만지기, 먹기, 마시기는 can't로 쓴 하면 안 되는 일이에요.",
    },
    {
      id: 'p11', level: 2, type: 'short', concept: 0,
      q: "'창문을 닫아도 될까요?'라는 뜻이 되도록 빈칸에 알맞은 낱말을 쓰세요.\n\nCan I [[close]] the window?",
      answer: ['close', 'shut'],
      wrong: [{ a: 'open', why: "open은 '열다'예요. '닫다'는 close예요." }],
      hint: "'열다'의 반대말을 떠올려 보세요.",
      explain: "'닫다'는 close예요. Can I close the window?는 '창문을 닫아도 될까요?'라는 뜻이에요. shut도 '닫다'라는 뜻이라 정답이에요.",
    },
    {
      id: 'p12', level: 1, type: 'ox', concept: 0,
      q: 'May I ~?와 Can I ~?는 둘 다 허락을 구할 때 쓰는 말이에요.',
      answer: true,
      explain: 'May I ~?와 Can I ~? 모두 허락을 구하는 말이에요. May I ~?가 조금 더 공손해요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: "수영장 안내문을 읽고, 안내문에 맞는 대화를 고르세요.\n\n**POOL RULES**\nYou can swim here.\nYou can't run here.\nNo food.",
      choices: [
        "A: Can I eat a sandwich here? / B: Sorry, you can't.",
        'A: Can I run here? / B: Sure.',
        "A: Can I swim here? / B: Sorry, you can't.",
        'A: May I eat some cookies here? / B: Go ahead.',
      ],
      answer: 0,
      why: [
        '',
        "You can't run here.라고 했으니 뛰어도 된다고 허락하면 안 돼요.",
        'You can swim here.라고 했으니 수영은 해도 돼요. 거절하면 안 맞아요.',
        'No food.라고 했으니 과자를 먹어도 된다고 허락하면 안 돼요.',
      ],
      hint: '대화마다 묻는 일이 안내문에서 되는 일인지 안 되는 일인지 확인하세요.',
      explain: "No food.는 음식 금지예요. 그래서 샌드위치를 먹어도 되는지 묻는 말에 Sorry, you can't.로 거절한 대화가 안내문에 맞아요.",
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: '**어색한** 대화를 고르세요.',
      choices: [
        'A: May I go to the bathroom? / B: Yes, I can.',
        'A: May I come in? / B: Of course.',
        'A: Can I use your eraser? / B: Sure. Here you are.',
        "A: Can I watch TV? / B: Sorry, you can't. Do your homework first.",
      ],
      answer: 0,
      why: ['', '자연스러운 대화예요. Of course.로 허락했어요.', '자연스러운 대화예요. 허락하고 지우개를 건넸어요.', '자연스러운 대화예요. 거절하고 까닭을 말했어요.'],
      hint: '허락하는 말에 주어가 누구로 되어 있는지 보세요.',
      explain: "Yes, I can.은 '나는 할 수 있어'라는 뜻이라 허락하는 말이 아니에요. 화장실에 가도 되느냐고 물으면 Yes, you can.이나 Sure.로 답해요.",
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 1,
      q: '**Go ahead.** 와 뜻이 가장 비슷한 대답은 무엇일까요?',
      choices: ['Yes, you can.', "No, you can't.", 'Here you are.', 'Me, too.'],
      answer: 0,
      why: ['', '반대로 거절하는 말이에요.', "물건을 건넬 때 하는 '여기 있어'라는 말이에요.", "'나도 그래'라는 뜻이에요."],
      explain: "Go ahead.는 '그렇게 하세요'라는 허락의 말이에요. 같은 허락의 말인 Yes, you can.과 뜻이 가장 비슷해요.",
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '도서관 입구에 세 가지 표지가 있어요.\n\n**No food.** / **No pets.** / **Quiet, please.**\n\n표지를 **지키지 않은** 사람은 누구일까요?',
      choices: ['지아: 강아지를 안고 들어갔어요.', '민수: 조용히 책을 골랐어요.', '서준: 책을 빌려서 집으로 갔어요.', '하윤: 천천히 걸어서 책장으로 갔어요.'],
      answer: 0,
      why: ['', '조용히 했으니 Quiet, please.를 지켰어요.', '음식도, 반려동물도, 시끄러운 소리도 없었어요.', '세 표지 어디에도 걷기를 막는 말은 없어요.'],
      hint: '표지 세 개를 우리말로 바꾼 다음, 사람마다 비교해 보세요.',
      explain: 'No pets.는 반려동물을 데려오면 안 된다는 뜻이에요. 강아지를 안고 들어간 지아가 표지를 지키지 않았어요.',
    },
    {
      id: 'a5', level: 3, type: 'short', concept: 4,
      q: "안내 표지와 같은 뜻이 되도록 빈칸에 알맞은 낱말을 쓰세요.\n\n표지: **No food.**\n문장: You can't [[eat]] here.",
      answer: ['eat'],
      wrong: [{ a: 'food', why: "You can't 뒤에는 하는 일(동사)이 와요. 음식을 '먹다'는 eat이에요." }],
      hint: '음식으로 무엇을 하는지 떠올려 보세요.',
      explain: "No food.는 음식 금지, 곧 여기서 먹으면 안 된다는 뜻이에요. 그래서 You can't eat here.예요.",
    },
  ],

  deeper: [
    {
      title: 'May I와 Can I, 무엇이 다를까?',
      body: "둘 다 허락을 구하는 말이지만 느낌이 조금 달라요.\n\n- **May I ~?** : 공손하고 정중한 느낌. 선생님, 처음 만난 어른, 가게 점원에게 잘 어울려요.\n- **Can I ~?** : 편하고 친근한 느낌. 친구, 가족 사이에서 많이 써요.\n\n어른께도 Can I ~?를 많이 쓰지만, 예의를 갖춰야 할 때는 May I ~?를 쓰면 좋아요. 중학교에 가면 Could I ~?처럼 더 공손한 말도 배워요.",
    },
    {
      title: '그림으로 된 안내 표지',
      body: "공공장소에는 글자 없이 그림만 있는 표지도 많아요. 말이 달라도 누구나 알아볼 수 있게 만든 거예요.\n\n- **빨간 동그라미에 빗금(사선)** 이 그어져 있으면 '하면 안 돼요'라는 뜻이에요. 그 안의 그림(개, 햄버거, 카메라)이 금지된 것이에요.\n- **초록색 표지**는 비상구처럼 '이쪽으로 가요, 여기 있어요'를 알려 줄 때가 많아요.\n\n영어 표지를 만나면 No 뒤의 낱말과 그림을 함께 보세요. 뜻을 훨씬 쉽게 알 수 있어요.",
    },
  ],

  faq: [
    {
      q: 'May I랑 Can I는 뭐가 달라요?',
      a: '둘 다 허락을 구하는 말이에요. May I ~?가 더 공손해서 선생님이나 어른께 여쭐 때 잘 어울리고, Can I ~?는 친구나 가족에게 편하게 써요.',
    },
    {
      q: "Sorry, you can't.라고만 하면 버릇없어 보여요?",
      a: "Sorry로 시작하니 무례한 말은 아니에요. 그래도 It's too cold.처럼 까닭을 덧붙이면 훨씬 부드럽고 친절하게 들려요.",
    },
    {
      q: 'No running.에서는 왜 run이 아니라 running이에요?',
      a: "No 뒤에는 '뛰기', '수영하기'처럼 이름 같은 말이 와요. 그래서 run에 -ing를 붙여 running으로 써요. 수영 금지를 뜻하는 No swimming.도 같은 모양이에요.",
    },
  ],

  mistakes: [
    'I can open the window?처럼 순서를 바꾸지 않고 묻는 실수 → Can I open the window?',
    '허락할 때 Yes, I can.이라고 답하는 실수 → Yes, you can. (해도 되는 사람은 묻는 사람, 곧 you예요.)',
    "can과 can't를 헷갈리는 실수 — You can't run here.는 '여기서 뛰면 안 돼요'예요.",
  ],

  gens: [
    {
      id: 'sign-rule',
      level: 1,
      title: '안내 표지와 같은 뜻의 문장 고르기',
      make: function (R) {
        var signs = [
          ['No food.', "You can't eat here.", 'You can eat here.'],
          ['No pets.', "You can't bring pets here.", 'You can bring pets here.'],
          ['No running.', "You can't run here.", 'You can run here.'],
          ['No swimming.', "You can't swim here.", 'You can swim here.'],
          ['No photos.', "You can't take pictures here.", 'You can take pictures here.'],
          ['Quiet, please.', "You can't talk loudly here.", 'You can talk loudly here.'],
          ['No bikes.', "You can't ride a bike here.", 'You can ride a bike here.'],
          ['No ball games.', "You can't play ball here.", 'You can play ball here.'],
        ];
        var i = R.int(0, signs.length - 1);
        var s = signs[i];
        var others = signs.filter(function (x, k) { return k !== i; });
        var two = R.sample(others, 2);
        var reason = {};
        reason[s[2]] = "can은 '해도 돼요'라는 뜻이에요. 표지는 '하면 안 돼요'를 알려 줘요.";
        two.forEach(function (o) { reason[o[1]] = '다른 표지(' + o[0] + ')와 같은 뜻이에요.'; });
        var pick = R.choices(s[1], [s[2], two[0][1], two[1][1]]);
        return {
          type: 'choice', concept: 4,
          q: '다음 안내 표지와 뜻이 같은 문장은 무엇일까요?\n\n**' + s[0] + '**',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === s[1] ? '' : reason[c] || ''; }),
          explain: "이 표지는 하면 안 되는 일을 알려 줘요. 하면 안 되는 일은 You can't ~ here.로 말해요. → " + s[1],
        };
      },
    },
    {
      id: 'ask-permission',
      level: 1,
      title: '허락을 구하는 말 고르기',
      make: function (R) {
        var acts = [
          ['open the window', '창문을 열어도'], ['close the door', '문을 닫아도'], ['sit here', '여기 앉아도'],
          ['use your eraser', '네 지우개를 써도'], ['come in', '들어가도'], ['go to the bathroom', '화장실에 가도'],
          ['drink some water', '물을 마셔도'], ['take a picture', '사진을 찍어도'], ['borrow your book', '네 책을 빌려도'],
          ['play outside', '밖에서 놀아도'], ['watch TV', '텔레비전을 봐도'], ['turn on the light', '불을 켜도'],
        ];
        var i = R.int(0, acts.length - 1);
        var a = acts[i];
        var other = R.pick(acts.filter(function (x, k) { return k !== i; }));
        var modal = R.pick(['May I', 'Can I']);
        var correct = modal + ' ' + a[0] + '?';
        var cap = a[0].charAt(0).toUpperCase() + a[0].slice(1);
        var cands = [
          ['I can ' + a[0] + '.', "'나는 ~할 수 있어요'라는 말이에요. 물을 때는 May I나 Can I로 시작하고 물음표를 붙여요."],
          [cap + ', please.', '해 달라고 부탁하는 말이에요. 내가 해도 되는지 묻는 말이 아니에요.'],
          ['Can you ' + a[0] + '?', '상대에게 해 줄 수 있는지 묻는 말이에요. 내가 해도 되는지 물을 때는 I를 써요.'],
          [modal + ' ' + other[0] + '?', "허락을 구하는 말이지만 뜻이 달라요. '" + other[1] + " 될까요?'라는 말이에요."],
        ];
        var reason = {};
        cands.forEach(function (c) { reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: 0,
          q: "'" + a[1] + " 될까요?'라고 허락을 구하는 말은 무엇일까요?",
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '허락을 구할 때는 May I ~?나 Can I ~? 뒤에 하고 싶은 일을 붙여요. → ' + correct,
        };
      },
    },
  ],

  vocab: [
    { w: 'come in', m: '들어오다, 들어가다', ex: 'May I come in?', exm: '들어가도 될까요?' },
    { w: 'open', m: '열다', ex: 'Can I open the window?', exm: '창문을 열어도 돼요?' },
    { w: 'close', m: '닫다', ex: 'Please close the door.', exm: '문을 닫아 주세요.' },
    { w: 'window', m: '창문', ex: 'The window is open.', exm: '창문이 열려 있어요.' },
    { w: 'sure', m: '그럼, 물론', ex: 'Sure. Here you are.', exm: '그럼. 여기 있어.' },
    { w: 'of course', m: '물론이에요', ex: 'Of course. Come in.', exm: '물론이에요. 들어오세요.' },
    { w: 'go ahead', m: '그렇게 하세요', ex: 'Go ahead. You can sit here.', exm: '그렇게 하세요. 여기 앉아도 돼요.' },
    { w: 'rule', m: '규칙', ex: "Let's follow the rules.", exm: '규칙을 지키자.' },
    { w: 'sign', m: '표지, 표지판', ex: 'Look at the sign.', exm: '표지판을 보세요.' },
    { w: 'pet', m: '반려동물', ex: 'My pet is a cat.', exm: '내 반려동물은 고양이예요.' },
    { w: 'quiet', m: '조용한', ex: 'Be quiet in the library.', exm: '도서관에서는 조용히 하세요.' },
    { w: 'take pictures', m: '사진을 찍다', ex: 'You can take pictures here.', exm: '여기서 사진을 찍어도 돼요.' },
    { w: 'museum', m: '박물관, 미술관', ex: 'We went to the museum.', exm: '우리는 박물관에 갔어요.' },
    { w: 'touch', m: '만지다', ex: "You can't touch the paintings.", exm: '그림을 만지면 안 돼요.' },
    { w: 'bathroom', m: '화장실', ex: 'May I go to the bathroom?', exm: '화장실에 가도 될까요?' },
  ],
});
