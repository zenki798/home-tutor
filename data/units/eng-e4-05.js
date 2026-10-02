/* 4학년 영어 · 함께 하자고 제안하기 */
Tutor.registerUnit({
  id: 'eng-e4-05',
  course: 'eng-e4',
  title: '함께 하자고 제안하기',
  summary: "Let's ~.로 함께 하자고 제안하고 Sounds good.이나 Sorry, I can't.로 알맞게 대답해요.",
  goals: [
    "Let's ~.로 친구에게 함께 하자고 말할 수 있어요.",
    "제안에 Okay./Sounds good./Great!로 좋다고 답할 수 있어요.",
    "Sorry, I can't.로 정중하게 거절할 수 있어요.",
    '운동과 놀이 낱말(soccer, baseball, badminton, tag, jump rope)을 알고 쓸 수 있어요.',
  ],
  standards: ['[4영02-08]', '[4영02-10]', '[4영01-05]'],

  concepts: [
    {
      title: "Let's ~. 로 함께 하자고 말하기",
      body: "친구에게 \"우리 같이 ~하자.\"라고 말할 때는 **Let's** 로 시작해요.\n\n- **Let's** go to the park. (공원에 가자.)\n- **Let's** sing. (노래하자.)\n- **Let's** dance. (춤추자.)\n\n**Let's** 바로 뒤에는 **동작을 나타내는 말**(go, play, sing, dance, jump …)이 와요. 이 말들은 모양을 바꾸지 않고 그대로 써요.\n\n> 💡 Let's 는 Let us 를 줄인 말이에요. 그래서 Let 과 s 사이에 작은 점(')을 꼭 찍어요.",
      easy: "\"같이 하자!\" 버튼이 있다고 생각해 보세요. 그 버튼의 이름이 **Let's** 예요.\n\n버튼을 누르고(Let's) 하고 싶은 일을 붙이면 돼요.\n\n- Let's + **sing** → 같이 노래하자.\n- Let's + **dance** → 같이 춤추자.\n- Let's + **go to the park** → 같이 공원에 가자.",
      check: {
        type: 'choice',
        q: '친구에게 "공원에 가자."라고 말하려고 해요. 알맞은 문장은 무엇일까요?',
        choices: ["Let's go to the park.", "Let's to the park.", 'I like the park.'],
        answer: 0,
        why: [
          '',
          "Let's 뒤에 동작을 나타내는 말이 빠졌어요. \"가다\"는 go 예요.",
          '"나는 공원을 좋아해."라는 뜻이에요. 함께 하자고 할 때는 Let\'s 로 시작해요.',
        ],
        explain: "함께 하자고 할 때는 Let's + 동작을 나타내는 말이에요. \"가다\"는 go 이므로 Let's go to the park. 예요.",
      },
    },
    {
      title: '운동과 놀이 낱말',
      body: "운동이나 놀이를 하자고 할 때는 **Let's play ~.** 를 많이 써요.\n\n| 낱말 | 뜻 | 제안하는 말 |\n|---|---|---|\n| soccer | 축구 | Let's **play soccer**. |\n| baseball | 야구 | Let's **play baseball**. |\n| badminton | 배드민턴 | Let's **play badminton**. |\n| tag | 술래잡기 | Let's **play tag**. |\n| jump rope | 줄넘기(하다) | Let's **jump rope**. |\n\n운동 이름 앞에는 a 나 the 를 붙이지 않아요. Let's play soccer. 처럼 써요.\n\n> ⚠️ 줄넘기는 play 없이 **Let's jump rope.** 라고 말해요. jump rope 자체가 \"줄넘기하다\"라는 동작이에요.",
      easy: "play 는 \"(운동·놀이를) 하다\"예요. 놀이 이름을 play 뒤에 끼워 넣기만 하면 돼요.\n\n- play + soccer = 축구를 하다\n- play + tag = 술래잡기를 하다\n\n줄넘기는 다르게 기억해요. jump(뛰다) + rope(줄) = 줄을 뛰어넘다, 그래서 Let's jump rope. 예요.",
      check: {
        type: 'ox',
        q: "Let's play a soccer. 는 바른 문장이에요.",
        answer: false,
        explain: "운동 이름 앞에는 a 를 붙이지 않아요. 바른 문장은 Let's play soccer. 예요.",
      },
    },
    {
      title: '좋다고 대답하기',
      body: "친구의 제안이 마음에 들면 이렇게 대답해요.\n\n- **Okay.** (그래.)\n- **Sounds good.** (좋아.)\n- **Great!** (아주 좋아!)\n\n예를 들어 친구가 Let's play badminton. 이라고 하면 Sounds good. 이라고 답할 수 있어요.\n\n> 💡 Great! 처럼 끝에 느낌표(!)를 붙이면 신나는 마음이 더 잘 드러나요.",
      easy: '친구가 "같이 하자!"라고 했을 때 엄지를 척 들어 주는 말이 세 가지 있다고 생각해요.\n\n- 고개를 끄덕 → **Okay.**\n- 엄지를 척 → **Sounds good.**\n- 두 팔을 번쩍 → **Great!**\n\n셋 다 "좋아!"라는 뜻이에요.',
      check: {
        type: 'choice',
        q: "친구가 Let's play badminton. 이라고 했어요. 좋다고 대답한 말은 무엇일까요?",
        choices: ['Sounds good.', "Sorry, I can't.", "I'm sorry."],
        answer: 0,
        why: [
          '',
          '"미안하지만 못 해."라는 뜻으로, 거절하는 말이에요.',
          '"미안해."라고 사과하는 말이에요. 제안에 좋다고 할 때는 Sounds good. 이나 Okay. 를 써요.',
        ],
        explain: 'Sounds good. 은 "좋아."라는 뜻이에요. 제안을 받아들이는 말이에요.',
      },
    },
    {
      title: '정중하게 거절하기',
      body: "함께 할 수 없을 때는 **Sorry, I can't.** (미안하지만 못 해.)라고 말해요.\n\n**can't** 는 can not(할 수 없다)을 줄인 말이에요. 앞에 Sorry 를 붙이면 친구의 마음이 덜 상해요.\n\n이유를 한 문장 덧붙이면 더 친절해요.\n\n- Sorry, I can't. **I'm tired.** (피곤해.)\n- Sorry, I can't. **I'm sleepy.** (졸려.)\n\n> ⚠️ 그냥 No. 라고만 하면 퉁명스럽게 들릴 수 있어요.",
      easy: '친구가 놀자고 했는데 오늘은 힘들어요. 그럴 때 "싫어!"보다 "미안, 오늘은 못 해."가 더 따뜻하지요?\n\n영어도 똑같아요. **Sorry**(미안해) + **I can\'t**(나는 못 해)를 붙여서 Sorry, I can\'t. 라고 해요.',
      check: {
        type: 'ox',
        q: "Sorry, I can't. 는 제안을 받아들이는 말이에요.",
        answer: false,
        explain: "Sorry, I can't. 는 \"미안하지만 못 해.\"라는 뜻으로, 정중하게 거절하는 말이에요. 받아들일 때는 Okay. 나 Sounds good. 을 써요.",
      },
    },
    {
      title: '제안하는 대화 이어 가기',
      body: "제안하는 대화는 보통 이렇게 흘러가요.\n\n1. 제안하기: **Let's play soccer.**\n2. 대답하기: **Sorry, I can't. I'm tired.**\n3. 다른 것을 제안하기: **Okay. Let's sing.**\n4. 대답하기: **Great!**\n\n거절을 들었을 때는 Okay. 라고 받아 준 뒤 다른 것을 제안하면 대화가 부드럽게 이어져요.",
      easy: '공 주고받기처럼 생각해 보세요. 한 사람이 "하자!"를 던지면 다른 사람이 "좋아!"나 "미안, 못 해."로 받아요.\n\n"못 해."를 받으면 다시 다른 "하자!"를 던지면 돼요. 그렇게 공을 주고받으며 같이 할 일을 정해요.',
      check: {
        type: 'choice',
        q: "A: Let's play tag.\nB: Sorry, I can't. I'm tired.\nA: [[Okay. Let's sing.]]\n\n빈칸에 들어갈 A의 말로 알맞은 것은 무엇일까요?",
        choices: ["Okay. Let's sing.", "Okay. Let's play tag.", "Sorry, I can't."],
        answer: 0,
        why: [
          '',
          'B는 피곤해서 술래잡기를 못 한다고 했어요. 같은 놀이를 또 하자고 하면 대화가 맞지 않아요.',
          '제안을 받은 사람이 하는 거절의 말이에요. A는 다른 것을 제안해야 해요.',
        ],
        explain: '거절을 들으면 Okay. 라고 받아 주고 다른 것을 제안해요. 피곤한 친구에게 노래하자고 하는 Okay. Let\'s sing. 이 알맞아요.',
      },
    },
  ],

  examples: [
    {
      q: '친구에게 "배드민턴 치자."라고 영어로 말해 보세요.',
      steps: [
        "함께 하자고 할 때는 Let's 로 시작해요.",
        '배드민턴은 badminton, 운동을 하다는 play 예요. 그래서 play badminton 이에요.',
        "둘을 이으면 Let's play badminton. 이에요. 운동 이름 앞에 a 는 붙이지 않아요.",
      ],
      answer: "**Let's play badminton.**",
    },
    {
      q: "친구가 Let's go to the park. 라고 했는데, 졸려서 갈 수 없어요. 정중하게 거절해 보세요.",
      steps: [
        "거절할 때는 Sorry, I can't. 라고 말해요.",
        "이유를 덧붙이면 더 친절해요. 졸리다는 I'm sleepy. 예요.",
        "그래서 Sorry, I can't. I'm sleepy. 라고 말해요.",
      ],
      answer: "**Sorry, I can't. I'm sleepy.**",
    },
  ],

  terms: [
    { term: "Let's", def: '"우리 함께 ~하자"라는 뜻으로 제안할 때 쓰는 말이에요. Let us 를 줄인 말이에요. 예: Let\'s play tag.' },
    { term: '제안', def: '어떤 일을 함께 하자고 말하는 것이에요. 영어로는 Let\'s ~. 로 해요.' },
    { term: '거절', def: '제안을 받아들이지 않는 것이에요. 정중하게 거절할 때는 Sorry, I can\'t. 라고 해요.' },
    { term: "can't", def: 'can not 을 줄인 말로 "~할 수 없다"는 뜻이에요. 예: Sorry, I can\'t.' },
    { term: 'Sounds good.', def: '"좋아."라는 뜻으로, 제안을 받아들일 때 쓰는 말이에요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 1,
      q: '친구에게 "축구하자."라고 말하려고 해요. 알맞은 문장은 무엇일까요?',
      choices: ["Let's play soccer.", "Let's play baseball.", "Let's play tag.", "Let's jump rope."],
      answer: 0,
      why: ['', 'baseball 은 야구예요. 축구는 soccer 예요.', 'tag 는 술래잡기예요. 축구는 soccer 예요.', 'jump rope 는 줄넘기예요. 축구는 soccer 예요.'],
      explain: "축구는 soccer 예요. 그래서 \"축구하자.\"는 Let's play soccer. 예요.",
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 알맞은 말을 쓰세요. (같이 공원에 가자.)\n\n[[Let\'s]] go to the park.',
      answer: ["Let's", 'Let us'],
      hint: '"함께 ~하자"라고 할 때 문장 맨 앞에 오는 말이에요.',
      wrong: [{ a: 'Lets', why: 'Let 과 s 사이에 작은 점(\')이 빠졌어요. Let us 를 줄인 말이라 Let\'s 로 써요.' }],
      explain: "함께 하자고 할 때는 Let's 로 시작해요. Let's go to the park. 는 \"같이 공원에 가자.\"라는 뜻이에요.",
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 2,
      q: 'Sounds good. 은 친구의 제안에 좋다고 대답하는 말이에요.',
      answer: true,
      explain: 'Sounds good. 은 "좋아."라는 뜻이에요. Okay. 나 Great! 도 같은 때에 쓸 수 있어요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 3,
      q: "친구가 Let's play tag. 라고 했어요. 정중하게 거절하는 말은 무엇일까요?",
      choices: ["Sorry, I can't.", 'Okay.', 'Great!', 'Sounds good.'],
      answer: 0,
      why: ['', 'Okay. 는 "그래."라는 뜻으로, 받아들이는 말이에요.', 'Great! 는 "아주 좋아!"라는 뜻으로, 받아들이는 말이에요.', 'Sounds good. 은 "좋아."라는 뜻으로, 받아들이는 말이에요.'],
      explain: "Sorry, I can't. 는 \"미안하지만 못 해.\"라는 뜻이에요. 나머지는 모두 좋다고 답하는 말이에요.",
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 1,
      q: 'badminton 의 뜻은 무엇일까요?',
      choices: ['배드민턴', '야구', '축구', '술래잡기'],
      answer: 0,
      why: ['', '야구는 baseball 이에요.', '축구는 soccer 예요.', '술래잡기는 tag 예요.'],
      explain: 'badminton 은 배드민턴이에요. Let\'s play badminton. 은 "배드민턴 치자."라는 뜻이에요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 1,
      q: '"야구"를 영어로 쓰세요.',
      answer: ['baseball'],
      wrong: [
        { a: 'basketball', why: 'basketball 은 농구예요. 야구는 base(베이스) + ball(공)이에요.' },
        { a: 'soccer', why: 'soccer 는 축구예요. 야구는 baseball 이에요.' },
      ],
      explain: '야구는 baseball 이에요. base(베이스)와 ball(공)이 합쳐진 낱말이에요. 붙여서 한 낱말로 써요.',
    },
    {
      id: 'p7', level: 1, type: 'ox', concept: 1,
      q: "Let's play a baseball. 은 바른 문장이에요.",
      answer: false,
      explain: "운동 이름 앞에는 a 를 붙이지 않아요. 바른 문장은 Let's play baseball. 이에요.",
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 0,
      q: '"같이 공원에 가자."가 되도록 낱말을 순서대로 놓으세요.',
      choices: ["Let's", 'go', 'to', 'the park.'],
      answer: [0, 1, 2, 3],
      hint: "Let's 다음에는 동작을 나타내는 말이 와요.",
      explain: "Let's(같이 ~하자) + go(가다) + to(~로) + the park(공원). 그래서 Let's go to the park. 예요.",
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: "A: Let's play soccer.\nB: [[Sorry, I can't.]] I'm tired.\n\n빈칸에 들어갈 B의 말로 알맞은 것은 무엇일까요?",
      choices: ["Sorry, I can't.", 'Sounds good.', 'Great!', 'Okay.'],
      answer: 0,
      why: [
        '',
        "좋다고 해 놓고 바로 \"피곤해.\"라고 하면 말이 맞지 않아요. 피곤해서 못 한다는 뜻이 되어야 해요.",
        "\"아주 좋아!\" 다음에 \"피곤해.\"는 어울리지 않아요. 피곤해서 못 한다는 뜻이 되어야 해요.",
        "\"그래.\" 다음에 \"피곤해.\"는 어울리지 않아요. 피곤해서 못 한다는 뜻이 되어야 해요.",
      ],
      hint: "B가 덧붙인 말 I'm tired. 의 뜻을 생각해 보세요.",
      explain: "I'm tired. 는 \"피곤해.\"라는 뜻이에요. 피곤해서 축구를 못 한다는 대답이므로 Sorry, I can't. 가 알맞아요.",
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: "대화를 읽고 답하세요.\n\nJia: Let's play baseball.\nMinsu: Sorry, I can't. I'm sleepy.\nJia: Okay. Let's play tag.\nMinsu: Sounds good!\n\n두 친구는 무엇을 하기로 했나요?",
      choices: ['술래잡기', '야구', '축구', '줄넘기'],
      answer: 0,
      why: [
        '',
        '지아가 처음에 야구를 하자고 했지만 민수가 졸려서 못 한다고 거절했어요.',
        '대화에 soccer(축구)는 나오지 않아요.',
        '대화에 jump rope(줄넘기)는 나오지 않아요.',
      ],
      hint: 'Minsu 가 Sounds good! 이라고 대답한 제안을 찾아보세요.',
      explain: "민수는 야구(baseball)는 거절했지만, Let's play tag. 에는 Sounds good! 이라고 했어요. 그래서 술래잡기(tag)를 하기로 했어요.",
    },
    {
      id: 'p11', level: 2, type: 'order', concept: 4,
      q: '자연스러운 대화가 되도록 순서대로 놓으세요.',
      choices: ["Let's play badminton.", "Sorry, I can't. I'm tired.", "Okay. Let's sing.", 'Great!'],
      answer: [0, 1, 2, 3],
      hint: '제안 → 대답 → 다른 제안 → 대답 순서예요.',
      explain: '배드민턴을 치자고 제안하자 피곤해서 못 한다고 거절했어요. 그래서 노래하자고 다시 제안했고, 아주 좋다고 대답했어요.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'text', concept: 1,
      q: "빈칸에 알맞은 낱말을 쓰세요. (같이 줄넘기하자.)\n\nLet's [[jump]] rope.",
      answer: ['jump'],
      wrong: [{ a: 'play', why: '줄넘기는 play 를 쓰지 않고 jump rope 로 말해요. jump 는 "뛰다"예요.' }],
      explain: "줄넘기하다는 jump rope 예요. 그래서 Let's jump rope. 라고 해요.",
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 2,
      q: "A: Let's play tag.\nB: [[Sounds good.]]\n\n빈칸에 들어갈 말로 알맞지 **않은** 것은 무엇일까요?",
      choices: ['Okay.', 'Sounds good.', 'Great!', 'Nice to meet you.'],
      answer: 3,
      why: [
        'Okay. 는 제안에 "그래."라고 답하는 알맞은 말이에요.',
        'Sounds good. 은 제안에 "좋아."라고 답하는 알맞은 말이에요.',
        'Great! 는 제안에 "아주 좋아!"라고 답하는 알맞은 말이에요.',
        '',
      ],
      explain: 'Nice to meet you. 는 처음 만났을 때 하는 인사예요. 제안에 대한 대답으로는 알맞지 않아요. 나머지 셋은 모두 좋다고 답하는 말이에요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 0,
      q: '바르게 쓴 문장은 무엇일까요?',
      choices: ["Let's play badminton.", "Let's plays badminton.", 'Lets play badminton.', "Let's play a badminton."],
      answer: 0,
      why: [
        '',
        "Let's 뒤에 오는 동작을 나타내는 말은 모양을 바꾸지 않아요. plays 가 아니라 play 예요.",
        "Let 과 s 사이에 작은 점(')이 빠졌어요. Let's 로 써요.",
        '운동 이름 앞에는 a 를 붙이지 않아요.',
      ],
      hint: "Let's 의 모양, Let's 뒤의 낱말, 운동 이름 앞을 하나씩 살펴보세요.",
      explain: "Let's 는 작은 점(')을 찍어 쓰고, 뒤에는 play 를 그대로 쓰며, 운동 이름 앞에는 a 를 붙이지 않아요. 그래서 Let's play badminton. 이 바른 문장이에요.",
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: "대화를 읽고 답하세요.\n\nSeojun: Let's play soccer, Hayun.\nHayun: Sorry, I can't. It's raining.\nSeojun: Okay. Let's dance.\nHayun: Great!\n\n하윤이가 축구를 하지 못한다고 한 까닭은 무엇일까요?",
      choices: ['비가 와서', '졸려서', '피곤해서', '축구를 싫어해서'],
      answer: 0,
      why: [
        '',
        "졸리다는 I'm sleepy. 예요. 하윤이는 그렇게 말하지 않았어요.",
        "피곤하다는 I'm tired. 예요. 하윤이는 그렇게 말하지 않았어요.",
        "축구를 싫어한다는 말은 대화에 없어요. Sorry, I can't. 다음 문장에 까닭이 있어요.",
      ],
      hint: "Sorry, I can't. 바로 다음 문장을 읽어 보세요.",
      explain: "하윤이는 Sorry, I can't. 다음에 It's raining.(비가 와.)이라고 했어요. 비가 와서 밖에서 축구를 할 수 없다는 뜻이에요. 그래서 서준이는 춤추자고 다시 제안했어요.",
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'text', concept: 4,
      q: "대화의 빈칸에 알맞은 낱말 하나를 쓰세요.\n\nA: Let's play badminton.\nB: Sorry, I [[can't]]. I'm sleepy.",
      answer: ["can't", 'cannot'],
      hint: '"미안하지만 못 해."라는 거절의 말이에요.',
      wrong: [
        { a: 'can', why: 'can 은 "할 수 있다"예요. 졸려서 못 한다는 뜻이므로 "할 수 없다"인 can\'t 를 써요.' },
        { a: 'cant', why: "can 과 t 사이에 작은 점(')이 빠졌어요. can't 로 써요." },
      ],
      explain: "졸려서(I'm sleepy) 못 한다는 뜻이므로 Sorry, I can't. 가 알맞아요. can't 는 can not 을 줄인 말이에요.",
    },
  ],

  deeper: [
    {
      title: "Let's 말고도 제안하는 말이 있어요",
      body: "영어에는 함께 하자고 말하는 방법이 여러 가지 있어요. 지금은 가장 쉽고 많이 쓰는 **Let's ~.** 를 배웠어요.\n\n고학년과 중학교에서는 How about ~?(~하는 게 어때?)처럼 묻는 꼴로 제안하는 말도 배워요. 묻는 꼴로 말하면 상대에게 고를 기회를 주는 느낌이 들어요.\n\n어떤 말을 쓰든 제안을 받으면 받아들이거나 정중하게 거절하는 대답을 하는 것은 같아요.",
    },
    {
      title: 'soccer 와 football',
      body: '우리가 축구라고 부르는 운동을 미국에서는 **soccer** 라고 하고, 영국을 비롯한 많은 나라에서는 **football** 이라고 해요.\n\n미국에서 football 이라고 하면 보통 공을 손으로 들고 달리기도 하는 다른 운동(미식축구)을 말해요. 같은 영어라도 나라에 따라 낱말이 조금씩 다를 수 있어요.',
    },
  ],

  faq: [
    {
      q: "Let's 다음에는 무엇이 와요?",
      a: "Let's 다음에는 동작을 나타내는 말(go, play, sing, dance, jump …)이 와요. 모양을 바꾸지 않고 그대로 써요. 예: Let's sing. Let's go to the park.",
    },
    {
      q: '거절할 때 그냥 No. 라고 하면 안 돼요?',
      a: "틀린 말은 아니지만 퉁명스럽게 들릴 수 있어요. 친구의 마음을 생각해서 Sorry, I can't. 라고 하고, 이유를 덧붙이면(I'm tired.) 더 친절해요.",
    },
    {
      q: '줄넘기는 왜 play 를 안 써요?',
      a: "jump rope 가 \"줄을 뛰어넘다\", 곧 \"줄넘기하다\"라는 동작이기 때문이에요. 그래서 Let's jump rope. 라고 말해요. soccer, baseball, badminton, tag 같은 운동·놀이 이름은 play 와 함께 써요.",
    },
  ],

  mistakes: [
    "Let's 의 작은 점(')을 빼고 Lets 로 쓰는 실수 — Let us 를 줄인 말이라 Let's 로 써요.",
    "Let's play a soccer. 처럼 운동 이름 앞에 a 를 붙이는 실수 — Let's play soccer. 로 써요.",
    "Let's plays tag. 처럼 Let's 뒤의 말을 바꾸는 실수 — Let's 뒤에는 play 를 그대로 써요.",
  ],

  vocab: [
    { w: 'soccer', m: '축구', ex: "Let's play soccer.", exm: '축구하자.' },
    { w: 'baseball', m: '야구', ex: "Let's play baseball after school.", exm: '방과 후에 야구하자.' },
    { w: 'badminton', m: '배드민턴', ex: "Let's play badminton in the park.", exm: '공원에서 배드민턴 치자.' },
    { w: 'tag', m: '술래잡기', ex: "Let's play tag.", exm: '술래잡기하자.' },
    { w: 'jump rope', m: '줄넘기(하다)', ex: "Let's jump rope together.", exm: '같이 줄넘기하자.' },
    { w: 'play', m: '(운동·놀이를) 하다', ex: 'I play soccer with my friends.', exm: '나는 친구들과 축구를 해요.' },
    { w: 'park', m: '공원', ex: "Let's go to the park.", exm: '공원에 가자.' },
    { w: 'together', m: '함께, 같이', ex: "Let's sing together.", exm: '함께 노래하자.' },
    { w: 'great', m: '아주 좋은, 멋진', ex: 'Great! I like tag.', exm: '아주 좋아! 나는 술래잡기가 좋아.' },
    { w: 'sorry', m: '미안한', ex: "Sorry, I can't. I'm tired.", exm: '미안하지만 못 해. 나는 피곤해.' },
    { w: 'tired', m: '피곤한', ex: "I'm tired. I can't play soccer.", exm: '나는 피곤해. 축구를 할 수 없어.' },
  ],
});
