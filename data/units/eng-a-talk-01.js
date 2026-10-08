/* 생활 영어 표현 · 인사와 자기소개
 * 예문·대화는 모두 직접 쓴 것이다(가상의 인물). 영어 낱말·문장 바로 뒤에는 받침에 따라 바뀌는 조사를 붙이지 않는다. */
(function () {
  // 상황에 맞는 대답 고르기 생성기 ------------------------------------------------
  // [상황 설명, 상대가 한 말, 알맞은 대답, [[어색한 대답, 이유] × 3 이상], 개념 카드 번호]
  var REPLIES = [
    ['회의에서 처음 만난 사람이 인사합니다.', 'Hi, I\'m Daniel. Nice to meet you.', 'Nice to meet you, too. I\'m Jia.', [
      ['Nice to see you again. I\'m Jia.', '"see you again"은 이미 아는 사람을 다시 만났을 때 씁니다. 처음 만났다면 meet 를 씁니다.'],
      ['I\'m fine, thank you. I\'m Jia.', '안부를 묻는 말(How are you?)에 하는 대답입니다. 상대는 처음 만나 반갑다고 인사했습니다.'],
      ['It was nice meeting you. I\'m Jia.', '헤어질 때 하는 인사입니다. 대화는 이제 막 시작되었습니다.'],
    ], 0],
    ['아는 동료를 복도에서 만났습니다.', 'Hey, how\'s it going?', 'Not bad. How about you?', [
      ['It\'s going to the office.', 'How\'s it going? 은 무엇이 어디로 가는지 묻는 말이 아니라 "잘 지내요?"라는 안부 인사입니다.'],
      ['Nice to meet you, too.', '처음 만났을 때 하는 대답입니다. 상대는 안부를 물었습니다.'],
      ['Yes, I\'m going.', '"가는 중이냐"는 질문으로 잘못 알아들었습니다. 안부 인사에는 Not bad. / Pretty good. 처럼 답합니다.'],
    ], 1],
    ['가까운 친구가 메시지를 보냈습니다.', 'What\'s up?', 'Not much. What about you?', [
      ['It\'s up there.', 'What\'s up? 은 위쪽에 무엇이 있는지 묻는 말이 아니라 "별일 없어?"라는 가벼운 인사입니다.'],
      ['Nice to meet you.', '처음 만났을 때 하는 인사입니다. 친구 사이의 안부에는 맞지 않습니다.'],
      ['Yes, I\'m up. I woke up at seven.','"일어났어?"라는 질문으로 잘못 알아들었습니다. 흔한 대답은 Not much.(별일 없어.)입니다.'],
    ], 1],
    ['오랜만에 옛 동료를 만났습니다.', 'Long time no see! How have you been?', 'I\'ve been great, thanks. And you?', [
      ['I\'ve been to Busan many times.','"가 본 적이 있다"라는 경험을 말했습니다. 상대는 그동안 잘 지냈는지 물었습니다.'],
      ['Nice to meet you, too.', '처음 만난 사람에게 하는 대답입니다. 오랜만에 다시 만난 사이입니다.'],
      ['I\'m a nurse.', '하는 일을 말했습니다. 상대는 그동안 어떻게 지냈는지 안부를 물었습니다.'],
    ], 1],
    ['처음 만난 사람이 하는 일을 묻습니다.', 'So, what do you do?', 'I\'m an accountant.', [
      ['I\'m reading a book.', '지금 하고 있는 동작을 말했습니다. What do you do? 는 직업을 묻는 말입니다.'],
      ['I do my best.', '"최선을 다한다"는 뜻입니다. 상대는 무슨 일을 하는지(직업) 물었습니다.'],
      ['I\'m from Daegu.', '출신지를 말했습니다. 상대는 하는 일을 물었습니다.'],
    ], 2],
    ['새로 사귄 이웃이 사는 곳을 묻습니다.', 'Where do you live?', 'I live near the park.', [
      ['I live for my family.', '"가족을 위해 산다"는 뜻이 됩니다. 사는 곳을 물었으니 장소를 말합니다.'],
      ['I work at a bank.', '하는 일을 말했습니다. 상대는 사는 곳을 물었습니다.'],
      ['I\'m doing well.', '안부에 대한 대답입니다. 상대는 사는 곳을 물었습니다.'],
    ], 2],
    ['상대가 처음 듣는 이름을 말해서 철자를 알고 싶습니다.', 'I\'m Bartholomew.', 'Sorry, how do you spell that?', [
      ['How do you do?', '격식 있는 첫인사입니다. 이름의 철자를 확인하려면 How do you spell that? 이라고 묻습니다.'],
      ['What do you do?', '직업을 묻는 말입니다. 이름을 확인하려는 상황에 맞지 않습니다.'],
      ['Sorry, what are you doing here today?','지금 무엇을 하고 있는지 묻는 말입니다. 이름을 다시 확인하는 말이 필요합니다.'],
    ], 3],
    ['처음 만난 사람과 이야기를 마치고 헤어집니다.', 'Well, I have to go now.', 'Okay. It was nice meeting you.', [
      ['Okay. Nice to see you again.', '이미 아는 사람을 다시 만났을 때 하는 인사입니다. 오늘 처음 만난 사이입니다.'],
      ['Okay. How\'s it going?', '만났을 때 하는 안부 인사입니다. 상대는 이제 가야 한다고 했습니다.'],
      ['Okay. By the way, what do you do for a living?','대화를 끝내려는 사람에게 새 질문을 던졌습니다. 헤어질 때는 인사로 마무리합니다.'],
    ], 4],
    ['금요일 퇴근길에 동료가 인사합니다.', 'Have a nice weekend!', 'Thanks, you too.', [
      ['Thanks, me too.', 'me too 는 "나도 그래"라는 뜻이라, 상대에게 같은 인사를 돌려주는 말이 되지 않습니다. you too 라고 합니다.'],
      ['Yes, I have.', 'Have a nice weekend! 는 질문이 아니라 "주말 잘 보내세요"라는 인사입니다.'],
      ['Nice to meet you.', '처음 만났을 때 하는 인사입니다. 헤어질 때의 인사에 맞지 않습니다.'],
    ], 4],
  ];

  // 표현의 쓰임 고르기 생성기 ------------------------------------------------------
  // [표현, 쓰임(한국어), 개념 카드 번호]
  var USES = [
    ['Nice to meet you.', '처음 만난 사람에게 하는 인사', 0],
    ['Good to see you again.', '아는 사람을 다시 만났을 때 하는 인사', 0],
    ['How\'s it going?', '잘 지내는지 묻는 가벼운 안부 인사', 1],
    ['What do you do?', '하는 일(직업)을 묻는 말', 2],
    ['Where are you from?', '출신지(고향·나라)를 묻는 말', 2],
    ['Sorry, what was your name again?', '들었던 이름을 다시 묻는 말', 3],
    ['How do you spell that?', '이름 같은 낱말의 철자를 묻는 말', 3],
    ['It was nice talking to you.', '대화를 마치고 헤어질 때 하는 인사', 4],
  ];

  Tutor.registerUnit({
    id: 'eng-a-talk-01',
    course: 'eng-a-talk',
    title: '인사와 자기소개',
    summary: '처음 만난 사람과 인사하고 이름·하는 일·사는 곳을 소개하며 자연스럽게 대화를 시작합니다.',
    goals: [
      '처음 만난 사람과 아는 사람에게 상황에 맞게 인사할 수 있다.',
      '안부를 묻는 여러 표현을 알아듣고 짧게 답한 뒤 되물을 수 있다.',
      '이름·하는 일·사는 곳을 영어로 소개할 수 있다.',
      '상대의 이름을 공손하게 다시 묻고, 대화를 마치며 인사할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '처음 만났을 때 인사',
        body: '처음 만난 사람에게는 **Nice to meet you.**(만나서 반갑습니다.)라고 인사합니다. 상대가 먼저 이렇게 말했다면 끝에 too 하나만 더해 **Nice to meet you, too.** 또는 짧게 **You too.** 라고 답합니다.\n\n| 상황 | 표현 |\n|---|---|\n| 이름을 밝히며 인사 | Hi, I\'m Minsu. Nice to meet you. |\n| 조금 격식 있게 | It\'s a pleasure to meet you. / Pleased to meet you. |\n| 다른 사람을 소개 | Jia, this is my coworker, Seojun. |\n| 아는 사람을 다시 만남 | Good to see you again. / Nice to see you. |\n\n다른 사람을 소개할 때는 He is ~ 대신 **This is ~** 를 씁니다. 바로 옆에 있는 사람을 "이쪽은 ~입니다" 하고 가리키는 말입니다.\n\n> ⚠️ meet 는 "처음 만나 알게 되다"라는 느낌이 있어서, 이미 아는 사람에게는 Nice to meet you 대신 **see** 를 써서 Good to see you again. 이라고 합니다.',
        easy: '인사말을 "처음 만남용"과 "다시 만남용" 두 서랍에 나눠 넣는다고 생각해 보십시오.\n\n- 처음 만남 서랍: Nice to meet you. → 대답은 Nice to meet you, too.\n- 다시 만남 서랍: Good to see you again.\n\n명함을 처음 주고받는 자리라면 meet, 지난주에 만난 거래처 담당자를 또 만났다면 see 입니다.',
        check: {
          type: 'choice',
          q: '회의에서 처음 만난 사람이 "Nice to meet you."라고 인사했습니다. 가장 알맞은 대답을 고르세요.',
          choices: ['Nice to meet you, too.', 'Nice to see you again.', 'I\'m fine, thank you.'],
          answer: 0,
          why: ['', '이미 아는 사람을 다시 만났을 때 하는 인사입니다. 오늘 처음 만난 사이입니다.', '안부(How are you?)에 하는 대답입니다. 상대는 만나서 반갑다고 인사했습니다.'],
          explain: '처음 만난 사람의 Nice to meet you. 에는 같은 말에 too 를 더해 **Nice to meet you, too.** 라고 답합니다.',
        },
      },
      {
        title: '안부 묻고 답하기',
        body: '만나면 인사와 함께 안부를 묻습니다. 영어의 안부 인사는 대개 **짧게 주고받는 인사말**입니다.\n\n| 묻는 말 | 느낌 | 흔한 대답 |\n|---|---|---|\n| How are you? / How are you doing? | 가장 무난함 | Good, thanks. / I\'m doing well. |\n| How\'s it going? | 편한 사이 | Not bad. / Pretty good. |\n| What\'s up? | 아주 가까운 사이 | Not much. |\n| How have you been? | 오랜만에 만났을 때 | I\'ve been great. / I\'ve been busy. |\n\n짧게 답한 다음에는 **And you?** / **How about you?** / **What about you?** 로 되묻는 것이 예의입니다.\n\nHow\'s it going? 의 it 은 특정한 물건이 아니라 "요즘 형편"을 막연히 가리킵니다. 그래서 "어디 가요?"가 아니라 "잘 지내요?"라는 뜻입니다.\n\n> 💡 Not bad. 는 "나쁘지 않아요", 곧 "그럭저럭 괜찮아요"라는 긍정적인 대답입니다.',
        easy: '안부 인사는 탁구공을 주고받는 것과 비슷합니다. 공이 오면(How\'s it going?) 가볍게 받아서(Not bad.) 바로 다시 넘겨 주면(How about you?) 됩니다.\n\n공을 받고 자기 사정을 길게 설명하기보다, 짧게 받고 되돌려 주는 것이 자연스럽습니다.',
        check: {
          type: 'ox',
          q: '"How\'s it going?"이라는 물음에 "Not bad."라고 답하면 기분이 나쁘다는 뜻입니다.',
          answer: false,
          explain: 'Not bad. 는 "나쁘지 않아요", 곧 "괜찮게 지내요"라는 긍정적인 대답입니다. Pretty good. 과 비슷하게 쓰입니다.',
        },
      },
      {
        title: '이름·하는 일·사는 곳 소개하기',
        body: '자기소개의 세 가지 뼈대는 **이름 · 하는 일 · 사는 곳**입니다.\n\n| 묻는 말 | 대답 |\n|---|---|\n| What\'s your name? | I\'m Jia Park. / My name is Jia. / Please call me Jia. |\n| What do you do? | I\'m a nurse. / I\'m an engineer. / I work at a bank. / I\'m retired. |\n| Where do you live? | I live in Suwon. / I live near the station. |\n| Where are you from? | I\'m from Busan. (출신지) |\n\n하는 일을 말하는 방법은 세 가지가 흔합니다.\n\n- **I\'m a(n) + 직업**: I\'m a teacher. / I\'m an accountant.\n- **I work at + 일하는 곳**, **I work for + 회사**: I work at a hospital. / I work for a food company.\n- **I work in + 분야**: I work in sales. / I work in marketing.\n\n> ⚠️ What do you do? 는 "지금 뭐 해요?"가 아니라 "무슨 일을 하세요?(직업)"라는 뜻입니다. 지금 하고 있는 동작은 What are you doing? 으로 묻습니다.\n\n> ⚠️ 직업 앞에는 a 나 an 을 씁니다. I\'m nurse. (✗) → I\'m a nurse. (○) 모음 소리로 시작하는 직업 앞에는 an: an engineer, an accountant.',
        easy: '자기소개는 명함 한 장을 말로 읽어 주는 것과 같습니다. 명함에는 이름, 회사·직함, 주소가 있지요.\n\n- 이름 → I\'m Minsu.\n- 회사·직함 → I work for a design company. / I\'m a designer.\n- 주소 → I live in Incheon.\n\n"어디 출신이에요?"는 명함에 없는 정보라서 따로 Where are you from? 으로 묻습니다.',
        check: {
          type: 'choice',
          q: '처음 만난 사람이 "What do you do?"라고 물었습니다. 무엇을 묻는 말일까요?',
          choices: ['하는 일(직업)', '지금 하고 있는 동작', '사는 곳'],
          answer: 0,
          why: ['', '지금 하는 동작은 What are you doing? 으로 묻습니다.', '사는 곳은 Where do you live? 로 묻습니다.'],
          explain: 'What do you do? 는 평소에 무슨 일을 하는지, 곧 **직업**을 묻는 말입니다. I\'m a nurse. / I work in sales. 처럼 답합니다.',
        },
      },
      {
        title: '상대 이름 다시 묻기',
        body: '처음 만난 사람의 이름은 금방 잊기 쉽습니다. 다시 묻는 것은 실례가 아니라 오히려 **상대를 존중하는 태도**입니다. 앞에 Sorry 를 붙이면 공손해집니다.\n\n| 상황 | 표현 |\n|---|---|\n| 들었던 이름을 잊었을 때 | Sorry, what was your name again? |\n| 처음부터 잘 못 알아들었을 때 | I\'m sorry, I didn\'t catch your name. |\n| 철자를 알고 싶을 때 | How do you spell that? |\n| 들은 이름이 맞는지 확인할 때 | Did you say Jiho? / Is it Jiho or Jiwoo? |\n\nwhat **was** your name again? 에서 과거형 was 를 쓰는 까닭은 "아까 말씀하셨는데 제가 놓쳤어요"라는 뜻을 담기 때문입니다. 끝의 again 도 "다시"라는 뜻을 더합니다.\n\ncatch 는 여기서 "공을 잡다"가 아니라 **"말을 알아듣다"**라는 뜻입니다.\n\n> 💡 대답할 때는 이름을 천천히 말하고 철자를 하나씩 불러 주면 좋습니다. It\'s Haeun. H-A-E-U-N.',
        easy: '모임에서 명함을 받았는데 잃어버렸다고 생각해 보십시오. 다시 달라고 할 때 "명함 다시 주세요"보다 "죄송한데 명함을 한 장 더 받을 수 있을까요?"가 부드럽지요.\n\n이름도 같습니다. What\'s your name? 보다 **Sorry, what was your name again?** 이 "아까 들었는데 제가 깜빡했어요"라는 마음을 전해 줍니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nI\'m sorry, I didn\'t ___ your name.',
          choices: ['catch', 'spell', 'call'],
          answer: 0,
          why: ['', 'spell 은 철자를 말하는 것입니다. "이름의 철자를 말하지 못했다"는 뜻이 되어 상황에 맞지 않습니다.', 'call 은 "부르다·전화하다"입니다. 이름을 알아듣지 못했다는 뜻이 되지 않습니다.'],
          explain: 'catch 는 "말을 알아듣다"라는 뜻입니다. I didn\'t catch your name. = 성함을 잘 못 들었습니다.',
        },
      },
      {
        title: '헤어질 때 인사',
        body: '대화를 마칠 때는 바로 "Bye."라고 하기보다, 먼저 가야 한다는 말로 신호를 주고 인사로 마무리합니다.\n\n1. **신호 주기**: I have to go now. / I should get going. / Oh, look at the time.\n2. **즐거웠다고 말하기**: It was nice talking to you. / It was nice meeting you. (오늘 처음 만난 사람에게)\n3. **작별 인사**: See you later. / See you next week. / Take care. / Have a nice day.\n\n처음 만났을 때는 Nice to meet you. 였지만, 헤어질 때는 만남이 끝났으니 흔히 과거형으로 **It was nice meeting you.** 라고 하거나 줄여서 Nice meeting you. 라고 합니다.\n\n상대가 Have a nice weekend! 처럼 좋은 시간을 빌어 주면 **You too.** / **Thanks, you too.** 라고 같은 인사를 돌려줍니다.\n\n> ⚠️ Have a nice weekend! 에 Me too. 라고 답하지 않습니다. me too 는 "나도 그래"라는 뜻이라 인사를 돌려주는 말이 되지 않습니다.',
        easy: '헤어지는 인사는 문을 천천히 닫는 것과 같습니다. 갑자기 쾅 닫지 않고, "이제 가 봐야겠어요"(I should get going.) → "즐거웠어요"(It was nice talking to you.) → "잘 가요"(Take care.) 순서로 살며시 닫습니다.',
        check: {
          type: 'choice',
          q: '금요일 저녁, 동료가 "Have a nice weekend!"라고 인사했습니다. 가장 알맞은 대답을 고르세요.',
          choices: ['Thanks, you too.', 'Thanks, me too.', 'Yes, I have.'],
          answer: 0,
          why: ['', 'me too 는 "나도 그래"라는 뜻이라 같은 인사를 돌려주는 말이 되지 않습니다.', '질문이 아니라 "주말 잘 보내세요"라는 인사입니다.'],
          explain: '좋은 시간을 빌어 주는 인사에는 **You too.** 또는 **Thanks, you too.**(당신도요)라고 돌려줍니다.',
        },
      },
    ],

    examples: [
      {
        q: '모임에서 처음 만난 사람과의 대화를 완성해 보세요.\n\nA: Hi, I\'m Daniel. Nice to meet you.\nB: (① 인사하고 이름 말하기)\nA: So, what do you do?\nB: (② 하는 일 말하기 — 회계 일을 함)',
        steps: [
          '①은 첫인사에 대한 대답입니다. 상대의 Nice to meet you. 에 too 를 더해 돌려주고 이름을 말합니다: Nice to meet you, too. I\'m Jia.',
          '②의 What do you do? 는 직업을 묻는 말입니다. 지금 하는 동작을 말하지 않도록 주의합니다.',
          '하는 일은 I\'m a(n) + 직업 / I work in + 분야로 말할 수 있습니다. 회계 일이므로 I work in accounting. 또는 I\'m an accountant.',
          '대화를 이어 가고 싶다면 같은 질문을 돌려줍니다: How about you?',
        ],
        answer: '① Nice to meet you, too. I\'m Jia. ② I work in accounting. (또는 I\'m an accountant.) How about you?',
      },
      {
        q: '다음 내용을 담아 짧게 자기소개를 해 보세요.\n\n이름: 박서준(서준으로 불러 주기를 바람) · 출신: 대구 · 사는 곳: 지금은 서울 · 하는 일: 작은 여행사에서 일함',
        steps: [
          '이름을 말하고 불러 줄 이름을 알려 줍니다: I\'m Seojun Park. Please call me Seojun.',
          '출신지는 I\'m from ~ 으로 말합니다: I\'m from Daegu.',
          '지금 사는 곳은 I live in ~ 으로 말합니다. 출신과 다르니 but 과 now 로 잇습니다: but I live in Seoul now.',
          '회사는 I work for ~ 으로 말합니다: I work for a small travel company.',
          '마지막에 첫인사를 덧붙입니다: Nice to meet you.',
        ],
        answer: 'I\'m Seojun Park. Please call me Seojun. I\'m from Daegu, but I live in Seoul now. I work for a small travel company. Nice to meet you.',
      },
    ],

    terms: [
      { term: 'Nice to meet you.', def: '"만나서 반갑습니다." 처음 만난 사람에게 하는 인사입니다. 대답은 Nice to meet you, too. 또는 You too.' },
      { term: 'Good to see you again.', def: '"다시 만나서 반가워요." 이미 아는 사람을 다시 만났을 때 하는 인사입니다.' },
      { term: 'How\'s it going?', def: '"잘 지내요?" 편한 사이의 안부 인사입니다. Not bad. / Pretty good. 처럼 짧게 답하고 How about you? 로 되묻습니다.' },
      { term: 'What do you do?', def: '"무슨 일을 하세요?" 직업을 묻는 말입니다. 지금 하는 동작을 묻는 What are you doing? 과 다릅니다.' },
      { term: 'catch', def: '대화에서 "말을 알아듣다"라는 뜻으로 씁니다. 예: I didn\'t catch your name.(성함을 잘 못 들었습니다.)' },
      { term: 'It was nice talking to you.', def: '"이야기 즐거웠어요." 대화를 마치고 헤어질 때 하는 인사입니다. 오늘 처음 만난 사람에게는 It was nice meeting you. 도 씁니다.' },
      { term: 'You too.', def: '"당신도요." Have a nice day! 처럼 상대가 빌어 준 인사를 그대로 돌려줄 때 씁니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '석 달 전에 함께 일했던 거래처 담당자를 다시 만났습니다. 가장 알맞은 인사를 고르세요.',
        choices: ['Nice to meet you.', 'Good to see you again.', 'Pleased to meet you.', 'It was nice meeting you.'],
        answer: 1,
        why: [
          '처음 만난 사람에게 하는 인사입니다. 이미 아는 사람에게는 see 를 씁니다.',
          '',
          '격식 있는 첫인사입니다. 이미 아는 사이에는 맞지 않습니다.',
          '처음 만난 사람과 헤어질 때 하는 인사입니다. 지금은 다시 만난 자리입니다.',
        ],
        explain: '이미 아는 사람을 다시 만났을 때는 meet 대신 see 를 써서 **Good to see you again.**(다시 뵈니 반갑습니다)이라고 합니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
        q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nA: Hi, I\'m Hayun. Nice to meet you.\nB: Nice to meet you, ___. I\'m Doyun.',
        answer: ['too'],
        hint: '상대와 같은 인사를 돌려줄 때 끝에 붙이는 말입니다.',
        wrong: [
          { a: 'to', why: 'to 는 "~에게·~로"라는 전치사입니다. "~도"라는 뜻의 낱말은 o 가 두 개인 too 입니다.' },
          { a: 'also', why: 'also 도 "또한"이라는 뜻이지만 문장 끝에 이렇게 붙이지 않습니다. 인사를 돌려줄 때는 too 를 씁니다.' },
        ],
        explain: '상대의 인사를 돌려줄 때는 같은 말 끝에 too(~도)를 붙입니다. **Nice to meet you, too.**',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '아는 동료가 "How\'s it going?"이라고 물었습니다. 가장 알맞은 대답을 고르세요.',
        choices: ['It\'s going to Busan.', 'Pretty good. How about you?', 'Nice to meet you, too.', 'Yes, I\'m going now.'],
        answer: 1,
        why: [
          '무엇이 어디로 가는지 묻는 말로 잘못 알아들었습니다. How\'s it going? 은 "잘 지내요?"라는 안부입니다.',
          '',
          '처음 만났을 때의 대답입니다. 상대는 안부를 물었습니다.',
          '"지금 가요?"라는 질문으로 잘못 알아들었습니다. 안부에는 짧게 답하고 되묻습니다.',
        ],
        explain: 'How\'s it going? 은 "잘 지내요?"라는 안부 인사입니다. **Pretty good.**(잘 지내요)처럼 짧게 답하고 How about you? 로 되묻습니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: '친구가 "What\'s up?"이라고 물었을 때 "Not much."라고 답하면 "별일 없어"라는 뜻입니다.',
        answer: true,
        explain: 'What\'s up? 은 "별일 없어? / 잘 지내?"라는 가벼운 인사이고, **Not much.** 는 "별일 없어"라는 흔한 대답입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 말을 고르세요.\n\nI\'m ___ engineer. I work for a car company.',
        choices: ['a', 'an', 'the', 'one of'],
        answer: 1,
        why: [
          'engineer 는 모음 소리로 시작하므로 a 가 아니라 an 을 씁니다.',
          '',
          'the 는 이미 누구인지 정해진 대상에 씁니다. 처음 직업을 말할 때는 a 나 an 을 씁니다.',
          'one of 뒤에는 engineers 처럼 여러 명을 나타내는 말이 와야 합니다.',
        ],
        explain: '직업 앞에는 a 나 an 을 씁니다. engineer 는 모음 소리로 시작하므로 **an engineer** 입니다. "저는 엔지니어입니다. 자동차 회사에서 일합니다."',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'text', concept: 2,
        q: '빈칸에 알맞은 전치사를 쓰세요.\n\nI work ___ marketing. (저는 마케팅 분야에서 일합니다.)',
        answer: ['in'],
        hint: '일하는 분야 앞에 쓰는 전치사를 떠올려 보십시오.',
        wrong: [
          { a: 'at', why: 'at 은 at a bank 처럼 일하는 장소 앞에 씁니다. 분야(marketing, sales) 앞에는 in 을 씁니다.' },
          { a: 'for', why: 'for 는 for a food company 처럼 회사 앞에 씁니다. 분야 앞에는 in 을 씁니다.' },
        ],
        explain: '일하는 분야 앞에는 in 을 씁니다: **I work in marketing.** / I work in sales. 회사 앞에는 for, 일하는 장소 앞에는 at 이 흔합니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '조금 전에 들은 상대의 이름이 생각나지 않습니다. 가장 공손하게 다시 묻는 말을 고르세요.',
        choices: ['Who are you again?', 'Sorry, what was your name again?', 'Hey, you. Tell me your name one more time.', 'What do you do?'],
        answer: 1,
        why: [
          '"당신 누구라고요?"처럼 들려 무례하게 느껴질 수 있습니다.',
          '',
          '명령하는 말투라 공손하지 않습니다. Sorry 로 시작해 질문으로 묻는 것이 좋습니다.',
          '직업을 묻는 말입니다. 이름을 다시 묻는 말이 아닙니다.',
        ],
        explain: '**Sorry, what was your name again?** 에는 "아까 말씀하셨는데 제가 놓쳤어요"라는 뜻이 담겨 있어 공손합니다.',
      },
      {
        id: 'p8', level: 1, type: 'ox', concept: 4,
        q: '"It was nice talking to you."는 대화를 마치고 헤어질 때 하는 말입니다.',
        answer: true,
        explain: '"이야기 즐거웠어요"라는 뜻으로, 대화를 마칠 때 하는 인사입니다. 대화가 끝났으니 과거형 was 를 씁니다.',
      },
      {
        id: 'p9', level: 2, type: 'order', concept: 2,
        q: '우리말에 맞게 배열하세요.\n\n저는 여행사에서 일하고, 대전에 삽니다.',
        choices: ['I work for', 'a travel company', 'and live', 'in Daejeon'],
        answer: [0, 1, 2, 3],
        hint: '하는 일(I work for + 회사)을 먼저 말하고, and 로 사는 곳을 잇습니다.',
        explain: '**I work for a travel company and live in Daejeon.** 회사 앞에는 for 를 쓰고(work for a travel company), 사는 곳은 live in + 지역으로 말합니다. 두 동사 work 와 live 의 주어는 모두 I 입니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 말을 고르세요.\n\nA: My name is Haeun.\nB: Sorry, ___\nA: H-A-E-U-N.',
        choices: ['how do you do?', 'how do you spell that?', 'how are you doing?', 'what do you do?'],
        answer: 1,
        hint: 'A 가 마지막에 무엇을 하나씩 불러 주었는지 보십시오.',
        why: [
          '격식 있는 첫인사입니다. A 가 철자를 불러 준 것과 맞지 않습니다.',
          '',
          '안부를 묻는 말입니다. A 는 안부 대신 철자를 불러 주었습니다.',
          '직업을 묻는 말입니다. A 는 직업이 아니라 이름의 철자를 말했습니다.',
        ],
        explain: 'A 가 이름을 한 글자씩(H-A-E-U-N) 불러 주었으므로 B 는 철자를 물었습니다: **How do you spell that?**',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 4,
        q: '빈칸에 들어갈 가장 알맞은 말을 고르세요.\n\nA: Oh, look at the time. I should get going.\nB: ___',
        choices: ['Sure. It was nice talking to you.', 'Nice to meet you. I\'m Jia.', 'How are you doing?', 'Okay. By the way, what do you do for a living?'],
        answer: 0,
        why: [
          '',
          '처음 만났을 때 하는 인사입니다. A 는 이제 가야 한다고 했습니다.',
          '만났을 때 하는 안부 인사입니다. 헤어지는 상황에 맞지 않습니다.',
          '가려는 사람에게 새 질문을 던졌습니다. 헤어질 때는 인사로 마무리합니다.',
        ],
        explain: 'I should get going. 은 "이제 가 봐야겠어요"라는 뜻입니다. **It was nice talking to you.**(이야기 즐거웠어요)로 마무리하는 것이 자연스럽습니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'text', concept: 1,
        q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nA: How are you doing?\nB: I\'m doing well, thanks. ___ about you?',
        answer: ['How', 'What'],
        hint: '안부를 되물을 때 "당신은요?"라는 뜻이 되는 말입니다.',
        wrong: [
          { a: 'And', why: 'And you? 는 그대로 쓰는 말이고, 빈칸 뒤에 about 이 있으면 How about you? 또는 What about you? 입니다.' },
          { a: 'Where', why: 'Where about you? 라는 말은 쓰지 않습니다. 되물을 때는 How about you? 입니다.' },
        ],
        explain: '짧게 답한 뒤에는 **How about you?**(또는 What about you?)로 되묻습니다. "당신은 어때요?"라는 뜻입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 2,
        q: '다음 자기소개를 읽고, 내용과 **일치하는** 것을 고르세요.\n\nHi, everyone. My name is Doyun Kang, but please call me Doyun. I\'m from Gangneung, but I live in Seoul now. I work for a small furniture company. I\'m in charge of online sales. Nice to meet you all.',
        choices: ['도윤 씨는 지금 서울에 산다.', '도윤 씨는 서울 출신이다.', '도윤 씨는 큰 가구 회사에서 일한다.', '도윤 씨는 Kang 이라고 불러 달라고 했다.'],
        answer: 0,
        hint: 'I\'m from ~ 과 I live in ~ 을 구별해 보십시오.',
        why: [
          '',
          'I\'m from Gangneung 이므로 출신은 강릉입니다. 서울은 지금 사는 곳입니다.',
          'a small furniture company, 곧 작은 가구 회사입니다.',
          'please call me Doyun 이라고 했으니 Doyun 으로 불러 달라고 했습니다.',
        ],
        explain: 'I live in Seoul now 이므로 지금은 서울에 삽니다. 출신(from)은 강릉, 일하는 곳은 작은 가구 회사이고, 온라인 판매를 맡고 있습니다(in charge of = ~을 맡은).',
      },
      {
        id: 'a2', level: 3, type: 'order', concept: 0,
        q: '처음 만난 두 사람의 대화가 자연스럽게 이어지도록 순서대로 놓으세요.',
        choices: [
          'Hi, I\'m Seojun. I just joined the team.',
          'Nice to meet you, Seojun. I\'m Hayun.',
          'Nice to meet you, too. Which department are you in?',
          'I work in accounting. Let me know if you need anything.',
        ],
        answer: [0, 1, 2, 3],
        hint: '먼저 자기 이름을 밝힌 사람, 그 인사에 답하는 사람, too 로 인사를 돌려주는 사람 순서를 찾아보십시오.',
        explain: '서준이 먼저 이름을 밝히고(Hi, I\'m Seojun.) → 하윤이 인사하며 이름을 말하고 → 서준이 too 를 붙여 인사를 돌려준 뒤 부서를 묻고 → 하윤이 하는 일을 말합니다(I work in accounting.).',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 3,
        q: '파티에서 한 사람과 인사했는데, 몇 분 뒤 그 사람의 이름이 Brian 이었는지 Ryan 이었는지 헷갈립니다. 가장 알맞은 말을 고르세요.',
        choices: ['Sorry, was it Brian or Ryan?', 'How do you do?', 'Nice to meet you, Ryan. I\'m from Seoul.', 'What do you do?'],
        answer: 0,
        why: [
          '',
          '격식 있는 첫인사입니다. 이름을 확인하는 말이 아닙니다.',
          '확인하지 않고 짐작으로 이름을 불렀습니다. 틀리면 더 어색해집니다.',
          '직업을 묻는 말입니다. 이름을 확인하지 못합니다.',
        ],
        explain: '헷갈리는 두 이름을 함께 말하며 확인하면 됩니다: **Sorry, was it Brian or Ryan?** 과거형 was 로 "아까 들었는데"라는 뜻을 담았습니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'text', concept: 1,
        q: '오랜만에 만난 친구에게 하는 말입니다. 빈칸에 알맞은 낱말 하나를 쓰세요.\n\nLong time no see! How have you ___?',
        answer: ['been'],
        hint: '"그동안 어떻게 지냈어요?"는 have 뒤에 be동사의 과거분사를 씁니다.',
        wrong: [
          { a: 'be', why: 'have 뒤에는 과거분사가 와야 합니다(현재완료). be 의 과거분사는 been 입니다.' },
          { a: 'done', why: 'How have you done? 이라고 하지 않습니다. 그동안 어떻게 지냈는지는 How have you been? 으로 묻습니다.' },
        ],
        explain: '**How have you been?** 은 "그동안 어떻게 지냈어요?"라는 뜻입니다. 지난번 만난 때부터 지금까지를 묻는 현재완료(have + been)입니다. 대답은 I\'ve been great. / I\'ve been busy. 처럼 합니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 4,
        q: '대화를 마무리하는 말이 **아닌** 것을 고르세요.',
        choices: ['I should get going.', 'How\'s it going?', 'Take care.', 'See you next week.'],
        answer: 1,
        why: [
          '"이제 가 봐야겠어요"라는 뜻으로, 대화를 끝내겠다는 신호입니다.',
          '',
          '"잘 지내요·몸조심해요"라는 작별 인사입니다.',
          '"다음 주에 봐요"라는 작별 인사입니다.',
        ],
        explain: 'How\'s it going? 은 만났을 때 하는 안부 인사입니다. 낱말 going 이 들어 있어도 get going(가 보다)와는 뜻이 전혀 다릅니다.',
      },
    ],

    deeper: [
      {
        title: '영어 이름의 순서와 호칭',
        body: '영어권에서는 보통 이름(first name)을 먼저, 성(last name)을 나중에 씁니다. 한국 이름은 Jia Park 처럼 바꾸어 쓰기도 하고 Park Jia 처럼 우리 순서대로 쓰기도 합니다. 그래서 상대가 헷갈리지 않게 **Please call me Jia.**(지아라고 불러 주세요)처럼 부를 이름을 알려 주면 좋습니다.\n\n격식을 갖춰 부를 때는 Mr.(남성), Ms.(여성) 뒤에 **성**을 붙입니다. 박지아 씨를 격식 있게 부를 때는 Ms. Park 처럼 성을 붙이고, Ms. Jia 처럼 이름을 붙이지 않습니다.\n\n직장에서는 처음부터 이름(first name)으로 부르는 경우도 많습니다. 어떻게 불러야 할지 모르겠다면 What should I call you? 라고 물어도 실례가 아닙니다.',
      },
      {
        title: '안부 인사는 "질문"보다 "인사"',
        body: '영어권에서 How are you? 는 계산대 직원이나 엘리베이터에서 만난 이웃도 건네는 인사말입니다. 대부분 상대의 형편을 자세히 알고 싶어서라기보다 "안녕하세요" 정도의 뜻입니다.\n\n그래서 짧게 답하고 같은 인사를 돌려주는 것이 예의입니다. Good, thanks. And you?\n\n반대로 가까운 친구가 진지하게 How have you been? 이라고 물으면 요즘 지낸 이야기를 조금 들려줘도 좋습니다. 다음 단원에서는 이렇게 가벼운 이야기를 이어 가는 방법을 익힙니다.',
      },
    ],

    faq: [
      {
        q: '"Fine, thank you. And you?"만 써도 되나요?',
        a: '틀린 말은 아닙니다. 다만 늘 같은 문장만 쓰면 외운 말처럼 들릴 수 있습니다. Good, thanks. / Pretty good. / Not bad. / I\'m doing well. 처럼 몇 가지를 섞어 쓰면 더 자연스럽습니다. 되묻는 말도 And you? / How about you? 를 번갈아 써 보십시오.',
      },
      {
        q: '"How do you do?"는 요즘도 쓰나요?',
        a: '아주 격식 있는 첫인사로, 요즘 일상 대화에서는 드물게 씁니다. 처음 만난 자리에서는 Nice to meet you. 가 가장 무난합니다. 누군가 How do you do? 라고 인사하면 안부를 설명하지 말고 같은 말(How do you do?)이나 Nice to meet you. 로 답하면 됩니다.',
      },
      {
        q: '이름을 다시 물으면 실례가 아닌가요?',
        a: '오히려 이름을 틀리게 부르는 것이 더 큰 실례입니다. Sorry, what was your name again? / I\'m sorry, I didn\'t catch your name. 처럼 공손하게 물으면 대부분 기꺼이 다시 알려 줍니다. 들은 뒤에는 Nice to meet you, Haeun. 처럼 이름을 한 번 불러 주면 기억하기도 쉽습니다.',
      },
    ],

    mistakes: [
      '이미 아는 사람에게 Nice to meet you. 라고 하는 실수 — 다시 만났을 때는 **Good to see you again.** 처럼 see 를 씁니다.',
      'What do you do? 에 지금 하는 동작으로 답하는 실수 — I\'m eating lunch. (✗) 직업을 묻는 말이므로 **I\'m a nurse. / I work in sales.** 처럼 답합니다.',
      'Have a nice weekend! 에 Me too. 라고 답하는 실수 — 인사를 돌려줄 때는 **You too.** 입니다.',
    ],

    gens: [
      {
        id: 'pick-reply',
        level: 2,
        title: '상황에 맞는 대답 고르기',
        make: function (R) {
          var it = R.pick(REPLIES);
          var bad = R.sample(it[3], 3);
          var reason = {};
          bad.forEach(function (b) { reason[b[0]] = b[1]; });
          var pick = R.choices(it[2], bad.map(function (b) { return b[0]; }));
          return {
            type: 'choice', concept: it[4],
            q: it[0] + ' 가장 알맞은 대답을 고르세요.\n\n"' + it[1] + '"',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === it[2] ? '' : reason[c]; }),
            explain: '상대의 말: ' + it[1] + '\n\n알맞은 대답: **' + it[2] + '**',
          };
        },
      },
      {
        id: 'pick-use',
        level: 1,
        title: '표현의 쓰임 고르기',
        make: function (R) {
          var it = R.pick(USES);
          var others = USES.filter(function (u) { return u[0] !== it[0]; });
          var wrongs = R.sample(others, 3);
          var reason = {};
          wrongs.forEach(function (w) { reason[w[1]] = '그 쓰임에 맞는 표현은 ' + w[0] + ' 입니다.'; });
          var pick = R.choices(it[1], wrongs.map(function (w) { return w[1]; }));
          return {
            type: 'choice', concept: it[2],
            q: '다음 표현은 언제 쓰는 말일까요?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === it[1] ? '' : reason[c]; }),
            explain: it[0] + ' — ' + it[1] + '입니다.',
          };
        },
      },
    ],

    vocab: [
      { w: 'introduce', m: '소개하다', ex: 'Let me introduce my coworker, Seojun.', exm: '제 동료 서준 씨를 소개하겠습니다.' },
      { w: 'pleasure', m: '기쁨, 즐거움', ex: 'It\'s a pleasure to meet you.', exm: '만나 뵙게 되어 기쁩니다.' },
      { w: 'coworker', m: '직장 동료', ex: 'My coworker sits next to me.', exm: '제 동료는 제 옆자리에 앉습니다.' },
      { w: 'company', m: '회사', ex: 'I work for a small design company.', exm: '저는 작은 디자인 회사에서 일합니다.' },
      { w: 'engineer', m: '기술자, 엔지니어', ex: 'My sister is an engineer.', exm: '제 언니는 엔지니어입니다.' },
      { w: 'accountant', m: '회계사, 회계 담당자', ex: 'He is an accountant at a bank.', exm: '그는 은행의 회계 담당자입니다.' },
      { w: 'retired', m: '은퇴한, 퇴직한', ex: 'My father is retired, so he travels a lot.', exm: '아버지는 퇴직하셔서 여행을 많이 하십니다.' },
      { w: 'originally', m: '원래, 본래', ex: 'I\'m originally from Jeju.', exm: '저는 원래 제주 출신입니다.' },
      { w: 'neighborhood', m: '동네, 이웃', ex: 'I live in a quiet neighborhood.', exm: '저는 조용한 동네에 삽니다.' },
      { w: 'spell', m: '철자를 말하다', ex: 'Could you spell your last name?', exm: '성의 철자를 말씀해 주시겠어요?' },
      { w: 'catch', m: '(말을) 알아듣다', ex: 'Sorry, I didn\'t catch that.', exm: '죄송합니다, 잘 못 알아들었어요.' },
      { w: 'department', m: '부서', ex: 'Which department are you in?', exm: '어느 부서에서 일하세요?' },
      { w: 'take care', m: '잘 지내, 몸조심해 (작별 인사)', ex: 'See you next week. Take care!', exm: '다음 주에 봐요. 잘 지내요!' },
    ],
  });
})();
