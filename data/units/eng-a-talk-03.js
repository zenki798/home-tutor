/* 생활 영어 표현 · 부탁·감사·사과하기
 * 예문·대화는 모두 직접 쓴 것이다(가상의 인물). 영어 낱말·문장 바로 뒤에는 받침에 따라 바뀌는 조사를 되도록 붙이지 않는다. */
(function () {
  // 알맞은 대답 고르기 생성기 ------------------------------------------------------
  // [상대가 한 말, 알맞은 대답, [[어색한 대답, 이유] × 3 이상], 개념 카드 번호]
  var LINES = [
    ['Thank you so much for your help.', 'You\'re welcome.', [
      ['Sure, go ahead.', '허락을 구하는 말(May I ~?)에 하는 대답입니다. 고맙다는 말에는 You\'re welcome. / No problem. 으로 답합니다.'],
      ['I\'m afraid I can\'t.', '부탁을 거절하는 말입니다. 상대는 고맙다고 했습니다.'],
      ['Me too.', '"나도 그래"라는 뜻입니다. 고맙다는 말에 맞지 않습니다.'],
    ], 2],
    ['Thanks for the ride home.', 'No problem. Anytime.', [
      ['Don\'t worry about it. It happens.', '실수를 사과한 사람을 안심시키는 말입니다. 상대는 태워 줘서 고맙다고 했습니다.'],
      ['Yes, you may.', '허락을 구하는 말(May I ~?)에 하는 대답입니다.'],
      ['I\'m sorry to hear that.', '안 좋은 소식에 위로하는 말입니다.'],
    ], 2],
    ['I\'m sorry I\'m late.', 'That\'s okay. We just started.', [
      ['You\'re welcome. We just started.', '고맙다는 말에 하는 대답입니다. 상대는 늦어서 미안하다고 했습니다.'],
      ['My pleasure.', '고맙다는 말에 "제가 좋아서 한 일인걸요"라고 답하는 말입니다.'],
      ['Sure, go ahead.', '허락을 구하는 말에 하는 대답입니다.'],
    ], 3],
    ['Oh no, I spilled coffee on your desk. I\'m so sorry.', 'Don\'t worry about it. I\'ll get a towel.', [
      ['You\'re welcome. I\'ll get a towel.', '고맙다는 말에 하는 대답입니다. 상대는 사과했습니다.'],
      ['Good for you!', '좋은 일을 축하하는 말입니다. 상대는 실수를 사과했습니다.'],
      ['Not at all. Go ahead.', 'Do you mind if I ~? 처럼 허락을 구하는 말에 하는 대답입니다.'],
    ], 3],
    ['Could you help me carry these boxes?', 'Sure, no problem.', [
      ['Yes, I could.', '부탁하는 Could you ~? 에 Yes, I could. 로 답하지 않습니다. 들어주겠다면 Sure. / Of course. 라고 합니다.'],
      ['You\'re welcome.', '고맙다는 말에 하는 대답입니다. 상대는 부탁을 했습니다.'],
      ['That\'s okay.', '사과를 받아 줄 때 하는 말입니다. 부탁을 들어줄 때는 Sure. 라고 합니다.'],
    ], 0],
    ['Would you mind turning down the music?', 'Not at all. Sorry about that.', [
      ['Yes, I would. Sorry about that.', 'mind 는 "꺼리다"라서 Yes, I would. 는 "네, 싫어요"라는 거절이 됩니다.'],
      ['You\'re welcome.', '고맙다는 말에 하는 대답입니다.'],
      ['Me neither.', '부정문에 동의하는 맞장구입니다. 부탁에 대한 대답이 아닙니다.'],
    ], 0],
    ['Do you mind if I sit here?', 'No, not at all. Go ahead.', [
      ['Yes, I do. Go ahead.', 'Do you mind ~? 는 "꺼리세요?"라는 뜻이라 Yes, I do. 는 "네, 꺼려요"가 되어 뒤의 Go ahead 와 맞지 않습니다.'],
      ['I\'m sorry for sitting here.', '앉으려는 사람은 상대입니다. 허락할지 말지를 답해야 합니다.'],
      ['Thank you for your help.', '고맙다는 말입니다. 상대는 허락을 구했습니다.'],
    ], 1],
    ['Can you come to my birthday party on Saturday?', 'I\'d love to, but I can\'t. I\'m visiting my parents.', [
      ['No. I don\'t want to come.', '틀린 문장은 아니지만 매우 퉁명스럽게 들립니다. 아쉬움과 이유를 함께 말하면 부드럽게 거절할 수 있습니다.'],
      ['You\'re welcome. I\'m visiting my parents.', '고맙다는 말에 하는 대답입니다. 상대는 초대를 했습니다.'],
      ['That\'s okay. I\'m visiting my parents.', '사과를 받아 줄 때 하는 말입니다. 상대는 초대를 했습니다.'],
    ], 4],
  ];

  // 빈칸 채우기 생성기 ------------------------------------------------------------
  // [문장(빈칸 ___), 정답, [[오답, 이유] × 2], 개념 카드 번호, 해설]
  var BLANKS = [
    ['Would you mind ___ the window?', 'closing', [
      ['to close', 'mind 뒤에는 to부정사가 아니라 -ing 꼴이 옵니다.'],
      ['close', 'mind 뒤에 동사원형을 바로 쓰지 않습니다. -ing 꼴로 씁니다.'],
    ], 0, 'Would you mind + -ing ~? 는 "~해 주시겠어요?"라는 공손한 부탁입니다.'],
    ['Thank you ___ inviting me.', 'for', [
      ['to', '고마운 까닭을 말할 때는 Thank you for ~ 입니다.'],
      ['about', 'Thank you about ~ 이라고 하지 않습니다. 까닭은 for 뒤에 씁니다.'],
    ], 2, '고마운 까닭은 Thank you for 뒤에 명사나 -ing 꼴로 말합니다.'],
    ['I\'m sorry ___ the mistake.', 'for', [
      ['to', 'I\'m sorry to ~ 뒤에는 동사가 옵니다. 명사(the mistake) 앞에서는 for 를 씁니다.'],
      ['with', 'I\'m sorry with ~ 라고 하지 않습니다. 미안한 까닭은 for 뒤에 씁니다.'],
    ], 3, '미안한 까닭은 I\'m sorry for 뒤에 명사나 -ing 꼴로 말합니다.'],
    ['___ I use your phone charger for a minute?', 'May', [
      ['Would', 'Would I use ~? 라고 하지 않습니다. 내가 해도 되는지 물을 때는 May I / Can I / Could I 입니다.'],
      ['Do', 'Do I use ~? 는 "내가 쓰나요?"라는 사실을 묻는 말이 되어 허락을 구하는 뜻이 없습니다.'],
    ], 1, 'May I ~? 는 "~해도 될까요?"라고 공손하게 허락을 구하는 말입니다.'],
    ['Is it okay ___ I leave a little early today?', 'if', [
      ['what', 'Is it okay what ~ 이라고 하지 않습니다. "내가 ~해도 괜찮을까요?"는 Is it okay if I ~? 입니다.'],
      ['when', 'Is it okay when ~ 은 허락을 구하는 꼴이 아닙니다. Is it okay if ~? 를 씁니다.'],
    ], 1, 'Is it okay if I ~? 는 "~해도 괜찮을까요?"라고 허락을 구하는 말입니다.'],
    ['I\'m ___ I can\'t join you tonight. I have to work late.', 'afraid', [
      ['scared', 'scared 는 실제로 무서울 때 씁니다. 거절을 부드럽게 할 때는 I\'m afraid ~ 입니다.'],
      ['sorry to', 'I\'m sorry to 뒤에는 동사원형이 옵니다. I can\'t 처럼 문장이 이어지려면 I\'m afraid ~ 를 씁니다.'],
    ], 4, 'I\'m afraid ~ 는 "유감스럽지만 ~"이라는 뜻으로, 거절을 부드럽게 해 줍니다.'],
  ];

  Tutor.registerUnit({
    id: 'eng-a-talk-03',
    course: 'eng-a-talk',
    title: '부탁·감사·사과하기',
    summary: '정중하게 부탁하고 허락을 구하며, 고마움과 미안함을 상황에 맞게 표현하고 대답하는 법을 익힙니다.',
    goals: [
      'Could you ~? / Would you mind -ing? 같은 표현으로 정중하게 부탁하고 알맞게 대답할 수 있다.',
      'May I ~? / Is it okay if I ~? 로 허락을 구할 수 있다.',
      '고마움과 미안함을 표현하고, 그 말에 알맞게 대답할 수 있다.',
      '아쉬움과 이유를 담아 부드럽게 거절할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '정중하게 부탁하기',
        body: '부탁은 **누구에게 하느냐**에 따라 말의 온도를 고릅니다.\n\n| 표현 | 느낌 | 예 |\n|---|---|---|\n| Can you ~? | 편한 사이 | Can you pass me the salt? |\n| Could you ~? | 공손함 | Could you send me the file? |\n| Could you please ~? | 더 공손함 | Could you please check this? |\n| Would you mind + -ing? | 아주 공손함 | Would you mind waiting a moment? |\n\nCould 는 can 의 과거형이지만, 부탁할 때는 과거의 뜻이 아니라 **한 걸음 물러선 공손함**을 나타냅니다.\n\n부탁을 들어줄 때는 **Sure. / Of course. / No problem.** 이라고 답합니다.\n\n> ⚠️ mind 는 "꺼리다"라는 뜻입니다. Would you mind ~? 는 "~하는 것이 꺼려지세요?"라고 묻는 꼴이라, 들어주겠다면 **Not at all.**(전혀요) / **No, of course not.** 처럼 부정으로 답합니다. Yes, I would. 는 "네, 싫어요"가 됩니다.\n\n> ⚠️ mind 뒤에는 -ing 꼴이 옵니다: Would you mind **closing** the door? (to close ✗)',
        easy: '부탁 표현은 문을 두드리는 세기와 비슷합니다.\n\n- 친한 친구 방: 똑똑 — Can you ~?\n- 직장 상사 방: 조심스럽게 똑똑 — Could you ~?\n- 처음 가는 사무실: 아주 조심스럽게 — Would you mind -ing?\n\nWould you mind ~? 에는 "괜찮아요, 안 꺼려요"라는 뜻으로 Not at all. 이라고 답한다는 것만 기억해 두십시오.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nWould you mind ___ the door?',
          choices: ['opening', 'to open', 'open'],
          answer: 0,
          why: ['', 'mind 뒤에는 to부정사를 쓰지 않습니다. -ing 꼴로 씁니다.', 'mind 뒤에 동사원형을 바로 쓰지 않습니다. -ing 꼴로 씁니다.'],
          explain: 'mind 뒤에는 -ing 꼴이 옵니다: **Would you mind opening the door?**(문 좀 열어 주시겠어요?)',
        },
      },
      {
        title: '허락 구하기',
        body: '부탁이 "상대가 해 주는 것"이라면, 허락 구하기는 "**내가** 해도 되는지" 묻는 것입니다. 그래서 주어가 **I** 입니다.\n\n| 표현 | 느낌 | 예 |\n|---|---|---|\n| Can I ~? | 편함 | Can I sit here? |\n| May I ~? / Could I ~? | 공손함 | May I use your pen? |\n| Is it okay if I ~? | 부드럽게 확인 | Is it okay if I open the window? |\n| Do you mind if I ~? | 아주 공손함 | Do you mind if I take a photo? |\n\n- Could **you** close the window? → 상대에게 닫아 달라는 **부탁**\n- Could **I** close the window? → 내가 닫아도 되는지 묻는 **허락 구하기**\n\n허락할 때는 **Sure, go ahead. / Of course. / Yes, you may.** 라고 답합니다.\n\n> ⚠️ Do you mind if I ~? 도 "꺼리세요?"라는 꼴이라, 허락할 때는 **No, not at all. Go ahead.** 처럼 부정으로 답합니다.',
        easy: '허락 구하기는 남의 집에서 "이 의자에 앉아도 될까요?" 하고 묻는 것입니다. 앉는 사람은 나(I)이지요.\n\n그래서 May **I** sit here? / Is it okay if **I** sit here? 처럼 I 가 들어갑니다. 상대에게 무언가를 해 달라고 할 때(Could **you** ~?)와 주어가 다릅니다.',
        check: {
          type: 'choice',
          q: '"May I use your pen?"은 어떤 말일까요?',
          choices: ['내가 펜을 써도 되는지 허락을 구하는 말', '상대에게 펜을 써 달라고 부탁하는 말', '펜을 빌려줘서 고맙다는 말'],
          answer: 0,
          why: ['', '상대에게 해 달라는 부탁은 Could you ~? 처럼 you 를 주어로 씁니다. 이 문장의 주어는 I 입니다.', '고마움은 Thank you for ~ 로 말합니다. 이 문장은 질문입니다.'],
          explain: 'May I ~? 는 "제가 ~해도 될까요?"라고 **허락을 구하는** 공손한 말입니다. 주어가 I 라는 점을 보십시오.',
        },
      },
      {
        title: '감사 표현과 대답',
        body: '고마움은 크기와 까닭을 담아 표현합니다.\n\n| 표현 | 쓰임 |\n|---|---|\n| Thanks. / Thank you. | 가장 기본 |\n| Thanks a lot. / Thank you so much. | 더 크게 고마울 때 |\n| Thank you for + 명사·-ing | 까닭까지: Thank you for your help. / Thanks for coming. |\n| I really appreciate it. | 정중하게 깊이 고마울 때 |\n| That\'s very kind of you. | 친절에 감동했을 때 |\n\n고맙다는 말에는 이렇게 답합니다.\n\n| 대답 | 느낌 |\n|---|---|\n| You\'re welcome. | 가장 기본 |\n| No problem. / Sure. / Anytime. | 편하게 |\n| My pleasure. | "제가 좋아서 한 일인걸요" — 정중함 |\n| Don\'t mention it. | "별말씀을요" |\n\n> ⚠️ Thank you for 뒤에는 명사나 -ing 꼴이 옵니다. Thank you for help. (✗) → Thank you for **your** help. / Thank you for **helping** me. (○)',
        easy: '감사 표현은 선물의 포장과 같습니다. Thanks. 는 종이봉투, Thank you so much. 는 리본 단 상자, Thank you for helping me with the report. 는 카드까지 넣은 선물입니다. 무엇이 고마운지(for ~) 말할수록 마음이 잘 전해집니다.\n\n받는 쪽은 You\'re welcome. / No problem. 으로 "별것 아니에요" 하고 받아 줍니다.',
        check: {
          type: 'short', check: 'text',
          q: '빈칸에 알맞은 전치사 하나를 쓰세요.\n\nThank you ___ your help.',
          answer: ['for'],
          wrong: [
            { a: 'to', why: '고마운 까닭은 to 가 아니라 for 뒤에 씁니다: Thank you for ~.' },
            { a: 'about', why: 'Thank you about ~ 이라고 하지 않습니다. 고마운 까닭은 for 뒤에 씁니다.' },
          ],
          explain: '고마운 까닭은 for 뒤에 씁니다: **Thank you for your help.**(도와주셔서 고맙습니다.)',
        },
      },
      {
        title: '사과 표현과 대답',
        body: '미안할 때는 무엇이 미안한지까지 말하면 진심이 잘 전해집니다.\n\n| 표현 | 예 |\n|---|---|\n| I\'m sorry. / I\'m so sorry. | 기본 |\n| I\'m sorry for + 명사·-ing | I\'m sorry for the mistake. / I\'m sorry for being late. |\n| I\'m sorry + 문장 | I\'m sorry I\'m late. / I\'m sorry I forgot. |\n| I apologize for ~ | 격식 있는 사과(업무 메일·공식 자리): I apologize for the delay. |\n\n사과를 받아 줄 때는 이렇게 답합니다.\n\n- **That\'s okay. / That\'s all right.** (괜찮아요)\n- **No worries. / Don\'t worry about it.** (걱정하지 마세요)\n- **It happens.** (그럴 수도 있지요)\n\n> ⚠️ 사과에 You\'re welcome. 으로 답하지 않습니다. You\'re welcome. 은 고맙다는 말에 대한 대답입니다.\n\n> 💡 Excuse me. 는 지나가거나 말을 걸기 전에 "실례합니다"라고 할 때, I\'m sorry. 는 잘못을 한 뒤 사과할 때 주로 씁니다. 앞 단원의 I\'m sorry to hear that. 은 사과가 아니라 "안됐네요"라는 위로입니다.',
        easy: '사과와 대답은 공을 주고받는 짝입니다.\n\n- 고맙다(Thank you.) ↔ 별말씀을요(You\'re welcome.)\n- 미안하다(I\'m sorry.) ↔ 괜찮아요(That\'s okay.)\n\n짝을 엇갈려 쓰면 어색해집니다. 미안하다는 사람에게 "천만에요"라고 하면 이상하지요.',
        check: {
          type: 'choice',
          q: '동료가 "I\'m sorry I\'m late."라고 말했습니다. 가장 알맞은 대답을 고르세요.',
          choices: ['You\'re welcome.', 'That\'s okay. We just started.', 'My pleasure.'],
          answer: 1,
          why: ['고맙다는 말에 하는 대답입니다. 동료는 늦어서 미안하다고 했습니다.', '', '고맙다는 말에 "제가 좋아서 한 일이에요"라고 답하는 말입니다.'],
          explain: '사과에는 **That\'s okay.**(괜찮아요)로 받아 주고, We just started.(이제 막 시작했어요)처럼 덧붙이면 상대가 마음을 놓습니다.',
        },
      },
      {
        title: '부드럽게 거절하기',
        body: '부탁이나 초대를 거절할 때 No. 한마디만 하면 차갑게 들립니다. **아쉬움 → 거절 → 이유 → (대안)** 순서로 말하면 부드럽습니다.\n\n| 단계 | 표현 |\n|---|---|\n| 아쉬움 | I\'d love to, but … / Thanks for asking, but … / I wish I could, but … |\n| 거절 | I\'m afraid I can\'t. / I don\'t think I can. |\n| 이유 | I have a meeting then. / I\'m busy this weekend. |\n| 대안 | Maybe next time? / How about Friday instead? |\n\n예: I\'d love to, but I\'m afraid I can\'t. I have a dentist appointment. Maybe next time?\n\n**I\'m afraid ~** 는 여기서 "무섭다"가 아니라 **"유감스럽지만 ~"**이라는 뜻입니다. 안 좋은 소식이나 거절을 전할 때 앞에 붙여 말을 부드럽게 합니다.\n\n> 💡 이유는 짧게 하나면 충분합니다. 이유를 길게 늘어놓으면 오히려 변명처럼 들릴 수 있습니다.',
        easy: '거절은 문을 닫는 일이지만, 쾅 닫지 않고 "다음에 또 오세요" 하며 살며시 닫을 수 있습니다.\n\nI\'d love to(가고 싶어요) → but I can\'t(그런데 못 가요) → I have to work(일이 있어서요) → Maybe next time?(다음에요?) 네 칸을 차례로 채우면 됩니다.',
        check: {
          type: 'ox',
          q: '"I\'m afraid I can\'t."는 "무서워서 못 하겠어요"라는 뜻입니다.',
          answer: false,
          explain: '여기서 I\'m afraid ~ 는 "유감스럽지만 ~"이라는 뜻입니다. I\'m afraid I can\'t. 는 "죄송하지만 어렵겠어요"라고 부드럽게 거절하는 말입니다.',
        },
      },
    ],

    examples: [
      {
        q: '사무실에서 옆자리 동료에게 서류 확인을 부탁하려고 합니다. 공손한 부탁 → 대답 → 감사 → 대답의 흐름으로 대화를 만들어 보세요.',
        steps: [
          '부탁: 동료에게 공손하게 부탁하므로 Could you ~? 를 씁니다. Could you check this document for me?',
          '대답: 들어줄 때는 Sure. / Of course. / No problem. 이라고 합니다. Sure. Give me a minute.',
          '감사: 다 봐 준 뒤에는 무엇이 고마운지까지 말합니다. Thank you for your help. (또는 Thanks for checking it.)',
          '대답: 고맙다는 말에는 You\'re welcome. / No problem. / Anytime. 으로 답합니다.',
        ],
        answer: 'A: Could you check this document for me? B: Sure. Give me a minute. … A: Thank you for your help. B: You\'re welcome.',
      },
      {
        q: '동료가 금요일 저녁 회식에 오라고 했지만, 그날은 부모님 댁에 가야 합니다. 부드럽게 거절해 보세요.\n\nA: Can you come to the team dinner on Friday?',
        steps: [
          '먼저 아쉬움을 말합니다: I\'d love to, but …',
          '거절을 부드럽게 합니다: I\'m afraid I can\'t.',
          '이유를 짧게 하나 말합니다: I\'m visiting my parents that day.',
          '다음을 기약하면 관계가 부드럽게 이어집니다: Maybe next time?',
        ],
        answer: 'I\'d love to, but I\'m afraid I can\'t. I\'m visiting my parents that day. Maybe next time?',
      },
    ],

    terms: [
      { term: 'Could you ~?', def: '"~해 주시겠어요?" 상대에게 공손하게 부탁하는 말입니다. 예: Could you send me the file?' },
      { term: 'Would you mind -ing?', def: '"~해 주시겠어요?" 아주 공손한 부탁입니다. mind 는 "꺼리다"라서 들어줄 때는 Not at all. 처럼 부정으로 답합니다.' },
      { term: 'May I ~?', def: '"제가 ~해도 될까요?" 공손하게 허락을 구하는 말입니다. 주어가 I 입니다.' },
      { term: 'Is it okay if I ~?', def: '"~해도 괜찮을까요?" 허락을 구하는 말입니다. 예: Is it okay if I open the window?' },
      { term: 'Thank you for ~', def: '고마운 까닭까지 말하는 감사 표현입니다. for 뒤에는 명사나 -ing 꼴이 옵니다. 예: Thank you for waiting.' },
      { term: 'My pleasure.', def: '"제가 좋아서 한 일인걸요." 고맙다는 말에 정중하게 답하는 말입니다.' },
      { term: 'No worries.', def: '"걱정하지 마세요, 괜찮아요." 사과나 감사에 편하게 답하는 말입니다.' },
      { term: 'I\'m afraid ~', def: '"유감스럽지만 ~." 거절이나 안 좋은 소식을 부드럽게 전할 때 앞에 붙입니다. 예: I\'m afraid I can\'t.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '팀장님께 보고서를 검토해 달라고 부탁하려고 합니다. 가장 공손한 말을 고르세요.',
        choices: ['Check my report.', 'Could you please check my report?', 'Check my report now. I need it by noon.', 'I check your report.'],
        answer: 1,
        why: [
          '명령문이라 윗사람에게 하기에는 퉁명스럽게 들립니다.',
          '',
          '명령문에 재촉까지 더해져 공손하지 않습니다.',
          '"제가 당신의 보고서를 확인합니다"라는 뜻이라 부탁이 아닙니다.',
        ],
        explain: '**Could you please ~?** 는 공손한 부탁입니다. 윗사람이나 잘 모르는 사람에게 부탁할 때 알맞습니다.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 0,
        q: '"Would you mind waiting a moment?"라는 부탁에 "Not at all."이라고 답하면 기다려 주겠다는 뜻입니다.',
        answer: true,
        explain: 'mind 는 "꺼리다"입니다. Not at all.(전혀 꺼리지 않아요)은 "기꺼이 기다릴게요"라는 뜻입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '회의실이 더워서 **내가** 창문을 열어도 되는지 묻고 싶습니다. 가장 알맞은 말을 고르세요.',
        choices: ['Could you open the window?', 'Could I open the window?', 'Would you mind opening the window?', 'Thank you for opening the window.'],
        answer: 1,
        why: [
          '상대에게 창문을 열어 달라는 부탁입니다. 내가 열어도 되는지 물으려면 주어가 I 여야 합니다.',
          '',
          '상대에게 열어 달라는 공손한 부탁입니다. 문 여는 사람이 상대가 됩니다.',
          '열어 줘서 고맙다는 말입니다. 아직 묻기 전입니다.',
        ],
        explain: '내가 해도 되는지 묻는 허락 구하기는 주어가 I 입니다: **Could I open the window?** (May I ~? / Is it okay if I ~? 도 됩니다.)',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'text', concept: 1,
        q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nIs it okay ___ I bring a friend to the party?',
        answer: ['if', 'that'],
        hint: '"~해도 괜찮을까요?"는 Is it okay ___ I ~? 꼴입니다.',
        wrong: [
          { a: 'when', why: 'Is it okay when ~ 은 허락을 구하는 꼴이 아닙니다. Is it okay if I ~? 를 씁니다.' },
          { a: 'what', why: 'Is it okay what ~ 이라고 하지 않습니다. 허락을 구할 때는 if 를 씁니다.' },
        ],
        explain: '**Is it okay if I ~?** 는 "~해도 괜찮을까요?"라는 뜻입니다. "파티에 친구를 데려가도 괜찮을까요?" (Is it okay that I ~? 라고 하는 사람도 있지만, 허락을 구할 때 가장 흔하고 자연스러운 꼴은 if 입니다.)',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '동료가 "Thanks a lot for the coffee."라고 말했습니다. 가장 알맞은 대답을 고르세요.',
        choices: ['My pleasure.', 'I\'m sorry for the coffee.', 'I\'m afraid I can\'t.', 'Me neither.'],
        answer: 0,
        why: [
          '',
          '사과하는 말입니다. 상대는 커피를 사 줘서 고맙다고 했습니다.',
          '부탁을 거절하는 말입니다. 상대는 고마움을 전했습니다.',
          '부정문에 동의하는 맞장구입니다. 고맙다는 말에 맞지 않습니다.',
        ],
        explain: '고맙다는 말에는 **My pleasure.**(제가 좋아서 한 일인걸요) / You\'re welcome. / No problem. 처럼 답합니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'text', concept: 2,
        q: '빈칸에 help 를 알맞은 꼴로 바꾸어 쓰세요.\n\nThanks for ___ me with the move.',
        answer: ['helping'],
        hint: 'for 같은 전치사 뒤에는 동사를 어떤 꼴로 쓸까요?',
        wrong: [
          { a: 'help', why: 'for 뒤에 동사원형을 바로 쓰지 않습니다. 전치사 뒤의 동사는 -ing 꼴입니다.' },
          { a: 'to help', why: 'for 뒤에 to부정사를 쓰지 않습니다. Thanks for + -ing 입니다.' },
        ],
        explain: '전치사 for 뒤에는 명사나 -ing 꼴이 옵니다: **Thanks for helping me with the move.**(이사 도와줘서 고마워요.)',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '친구가 "I\'m so sorry. I forgot to call you back."이라고 말했습니다. 가장 알맞은 대답을 고르세요.',
        choices: ['You\'re welcome.', 'No worries. It happens.', 'Sure, go ahead.', 'Thank you so much for calling me back.'],
        answer: 1,
        why: [
          '고맙다는 말에 하는 대답입니다. 친구는 사과했습니다.',
          '',
          '허락을 구하는 말에 하는 대답입니다.',
          '친구는 전화를 다시 하지 못했다고 사과했습니다. 고마워할 일이 아닙니다.',
        ],
        explain: '사과에는 **No worries. It happens.**(괜찮아요, 그럴 수도 있죠)처럼 받아 줍니다. That\'s okay. / Don\'t worry about it. 도 좋습니다.',
      },
      {
        id: 'p8', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 말을 고르세요.\n\nI\'m sorry for ___ late this morning.',
        choices: ['be', 'being', 'been', 'was'],
        answer: 1,
        why: [
          '전치사 for 뒤에 동사원형을 바로 쓰지 않습니다.',
          '',
          'been 은 과거분사로, 혼자서는 for 뒤에 오지 못합니다.',
          'for 뒤에 과거형 동사를 쓰지 않습니다. 전치사 뒤의 동사는 -ing 꼴입니다.',
        ],
        explain: '전치사 for 뒤의 동사는 -ing 꼴입니다: **I\'m sorry for being late this morning.** 같은 뜻으로 I\'m sorry I was late this morning. 처럼 문장을 이어도 됩니다.',
      },
      {
        id: 'p9', level: 1, type: 'choice', concept: 4,
        q: '동료가 "Do you want to join us for lunch?"라고 물었지만, 이미 다른 약속이 있습니다. 가장 부드러운 거절을 고르세요.',
        choices: ['Thanks for asking, but I already have plans.', 'No.', 'No. I don\'t want to have lunch with you today.', 'You\'re welcome.'],
        answer: 0,
        why: [
          '',
          '틀린 말은 아니지만 한마디로 끊어 차갑게 들립니다.',
          '거절하는 까닭이 "같이 먹기 싫어서"처럼 들려 상대가 서운할 수 있습니다.',
          '고맙다는 말에 하는 대답입니다. 상대는 함께 먹자고 했습니다.',
        ],
        explain: '**Thanks for asking, but …**(물어봐 줘서 고마워요, 그런데 …)로 시작하면 거절이 부드러워집니다. 이유(I already have plans.)도 짧게 덧붙였습니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 0,
        q: '빈칸에 들어갈 말로 알맞은 것을 고르세요. B 는 창문을 닫아 주려고 합니다.\n\nA: Would you mind closing the window? It\'s a bit cold.\nB: ___',
        choices: ['Yes, I would.', 'Not at all. I\'ll close it now.', 'Yes, you may.', 'You\'re welcome.'],
        answer: 1,
        hint: 'mind 의 뜻(꺼리다)을 떠올려 보십시오.',
        why: [
          '"네, 꺼려요", 곧 닫기 싫다는 거절이 됩니다.',
          '',
          '허락을 구하는 May I ~? 에 하는 대답입니다. A 는 부탁을 했습니다.',
          '고맙다는 말에 하는 대답입니다. A 는 아직 고맙다고 하지 않았습니다.',
        ],
        explain: 'Would you mind ~? 는 "~하는 것이 꺼려지세요?"라는 꼴이므로, 들어줄 때는 **Not at all.**(전혀요)처럼 부정으로 답합니다.',
      },
      {
        id: 'p11', level: 2, type: 'order', concept: 4,
        q: '초대를 부드럽게 거절하는 말이 되도록 순서대로 놓으세요.',
        choices: ['I\'d love to,', 'but I\'m afraid I can\'t.', 'I have a meeting then.', 'Maybe next time?'],
        answer: [0, 1, 2, 3],
        hint: '아쉬움 → 거절 → 이유 → 대안 순서입니다.',
        explain: '**I\'d love to, but I\'m afraid I can\'t. I have a meeting then. Maybe next time?** 아쉬움(가고 싶어요) → 거절(유감스럽지만 못 가요) → 이유(그때 회의가 있어요) → 대안(다음에요?)의 흐름입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 1,
        q: '빈칸에 들어갈 말로 알맞은 것을 고르세요. B 는 A 가 앉아도 좋다고 허락하려고 합니다.\n\nA: Do you mind if I sit here?\nB: ___',
        choices: ['Yes, I do. Please don\'t.', 'No, not at all. Go ahead.', 'Sure, I mind.', 'Thank you for sitting here.'],
        answer: 1,
        hint: 'Do you mind ~? 는 "꺼리세요?"라고 묻는 말입니다.',
        why: [
          '"네, 꺼려요. 앉지 마세요"라는 거절입니다.',
          '',
          '"물론, 꺼려요"라는 이상한 말이 됩니다. 허락하려면 꺼리지 않는다고 답합니다.',
          '앉아 줘서 고맙다는 말입니다. A 는 허락을 구했습니다.',
        ],
        explain: 'Do you mind if I ~? 에 허락할 때는 **No, not at all. Go ahead.**(전혀요, 앉으세요)처럼 부정으로 답합니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 2,
        q: '다음 메시지를 읽고, 내용과 **일치하는** 것을 고르세요.\n\nHi Minji,\nThank you so much for covering my shift last Saturday. I really appreciate it. I\'m also sorry for not replying to your message sooner. I was sick for a few days. Let me buy you lunch this week!\nSeoyeon',
        choices: [
          '서연은 지난 토요일 근무를 대신해 준 민지에게 고마워한다.',
          '민지가 서연의 메시지에 늦게 답장해서 서연에게 미안하다고 사과하고 있다.',
          '서연은 이번 주에 민지에게 점심을 얻어먹을 것이다.',
          '서연은 민지의 메시지에 바로 답장을 보냈다.',
        ],
        answer: 0,
        hint: '메시지를 쓴 사람은 누구이고, 누가 누구에게 고마워하고 사과하는지 보십시오.',
        why: [
          '',
          '사과하는 사람은 메시지를 쓴 서연입니다(I\'m sorry for not replying).',
          'Let me buy you lunch 는 "제가 점심 살게요"라는 뜻입니다. 사는 사람은 서연입니다.',
          'not replying to your message sooner, 곧 더 빨리 답하지 못했다고 사과했습니다.',
        ],
        explain: '서연은 근무를 대신해 준 것에 고마워하고(Thank you so much for covering my shift), 답장이 늦은 것을 사과한 뒤(I\'m sorry for not replying sooner), 점심을 사겠다고 했습니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 0,
        q: 'A 가 "Would you mind lending me your stapler?"라고 물었더니 B 가 "Yes, I would."라고 답했습니다. B 의 대답은 무슨 뜻일까요?',
        choices: ['부탁을 거절하는 말이다.', '부탁을 기꺼이 들어주겠다는 말이다.', '빌려줘서 고맙다는 말이다.', '자기도 빌려 달라고 하는 말이다.'],
        answer: 0,
        hint: 'mind 는 "꺼리다"입니다. Yes 는 무엇에 대한 Yes 일까요?',
        why: [
          '',
          'Would you mind ~? 에 Yes 로 답하면 "네, 꺼려요"가 됩니다. 들어줄 때는 Not at all. 이라고 합니다.',
          '고마움은 Thank you for ~ 로 말합니다.',
          'B 는 새 부탁을 하지 않았습니다.',
        ],
        explain: 'Would you mind ~? = "~하는 것이 꺼려지세요?" 여기에 Yes, I would. 는 "네, 꺼려요", 곧 **거절**입니다. 실제로는 퉁명스럽게 들리므로 거절할 때는 I\'m afraid I need it right now. 처럼 이유를 말하는 편이 좋습니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 1,
        q: '다음 가운데 **허락을 구하는** 말을 고르세요.',
        choices: ['Could you lend me your umbrella?', 'Is it okay if I borrow your umbrella?', 'Would you mind lending me your umbrella?', 'Thank you for lending me your umbrella.'],
        answer: 1,
        hint: '주어가 I 인지 you 인지 보십시오.',
        why: [
          '상대에게 빌려 달라는 부탁입니다(주어 you).',
          '',
          '상대에게 빌려 달라는 공손한 부탁입니다(lending 하는 사람이 상대).',
          '빌려준 것에 대한 감사입니다.',
        ],
        explain: 'Is it okay if **I** borrow ~? 는 "제가 빌려 가도 괜찮을까요?"라고 내가 할 일의 허락을 구합니다. 나머지 둘은 상대가 해 주는 일(lend 빌려주다)을 부탁하는 말입니다.',
      },
      {
        id: 'a4', level: 3, type: 'order', concept: 0,
        q: '여행지에서 사진을 부탁하는 대화입니다. 자연스럽게 이어지도록 순서대로 놓으세요.',
        choices: [
          'Excuse me. Could you take a photo of us?',
          'Sure. Do I just press this button?',
          'Yes, that\'s right. Thank you so much!',
          'My pleasure. Enjoy your trip!',
        ],
        answer: [0, 1, 2, 3],
        hint: '부탁 → 들어주며 확인 → 확인에 답하며 감사 → 감사에 대한 대답 순서입니다.',
        explain: 'Excuse me 로 말을 걸고 Could you ~? 로 부탁 → Sure 로 들어주며 방법을 확인 → Yes 로 답하고 Thank you so much! 로 감사 → My pleasure. 로 감사에 답하며 인사합니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'text', concept: 2,
        q: '"정말 감사합니다"라는 뜻이 되도록 빈칸에 알맞은 동사 하나를 쓰세요.\n\nI really ___ your help.',
        answer: ['appreciate'],
        hint: '고마운 "일"을 목적어로 받는 동사입니다(a 로 시작).',
        wrong: [
          { a: 'thank', why: 'thank 는 고마운 사람을 목적어로 받습니다(Thank you). your help 처럼 고마운 일을 받으려면 appreciate 를 씁니다.' },
          { a: 'thanks', why: 'thanks 는 명사나 인사말로 씁니다. I really thanks ~ 라고 하지 않습니다.' },
        ],
        explain: 'appreciate 는 "고맙게 여기다"라는 뜻으로 고마운 일을 목적어로 받습니다: **I really appreciate your help.** 사람에게는 Thank you for your help. 처럼 thank 를 씁니다.',
      },
    ],

    deeper: [
      {
        title: '영어의 부탁은 왜 질문 꼴일까?',
        body: '우리말에서는 "이것 좀 확인해 주세요"처럼 부탁을 서술문으로 많이 합니다. 영어에서는 Could you check this? 처럼 **질문**으로 부탁하는 일이 흔합니다.\n\n질문은 상대에게 "아니요"라고 말할 여지를 남겨 둡니다. 그래서 명령문보다 부담을 덜 주고 공손하게 들립니다. Please check this. 처럼 please 를 붙여도 꼴은 여전히 명령문이라, 윗사람에게는 Could you please check this? 가 더 알맞습니다.\n\n같은 원리로 can → could, will → would 처럼 과거형 조동사를 쓰면 한 걸음 물러선 느낌이 나서 더 공손해집니다.',
      },
      {
        title: '감사와 사과의 대답 짝 정리',
        body: '| 상대의 말 | 알맞은 대답 |\n|---|---|\n| Thank you. | You\'re welcome. / No problem. / My pleasure. / Anytime. |\n| I\'m sorry. | That\'s okay. / No worries. / Don\'t worry about it. |\n| Could you ~? | Sure. / Of course. / I\'m afraid I can\'t. |\n| May I ~? / Can I ~? | Sure, go ahead. / Of course. |\n| Would you mind ~? / Do you mind if I ~? | Not at all. / No, go ahead. |\n\n짝이 어긋나면(사과에 You\'re welcome.) 상대가 당황할 수 있습니다. 특히 mind 가 들어간 질문은 **No** 가 승낙이라는 점을 기억해 두십시오. 다음 단원에서는 길을 묻고 대중교통을 이용할 때 이 부탁 표현(Could you ~?)을 그대로 씁니다.',
      },
    ],

    faq: [
      {
        q: '"Would you mind ~?"에 그냥 "Sure."라고 답해도 되나요?',
        a: '일상 대화에서는 Sure. / No problem. 이라고 답해도 "해 드릴게요"라는 뜻으로 잘 통합니다. 다만 Yes, I would. / Yes, I do. 처럼 mind 에 대한 Yes 를 분명히 말하면 "꺼려요", 곧 거절이 됩니다. 가장 확실한 승낙은 Not at all. / No, not at all. 입니다.',
      },
      {
        q: 'borrow 와 lend 는 어떻게 달라요?',
        a: 'borrow 는 "빌리다"(내가 받음), lend 는 "빌려주다"(내가 줌)입니다. 그래서 Can I borrow your pen?(펜 좀 빌려도 될까요?)과 Can you lend me your pen?(펜 좀 빌려주실래요?)은 같은 부탁을 다른 쪽에서 말한 것입니다.',
      },
      {
        q: '"Excuse me"와 "I\'m sorry"는 언제 써요?',
        a: '대체로 Excuse me. 는 지나가거나 말을 걸기 전에 "실례합니다", I\'m sorry. 는 잘못한 뒤 "죄송합니다"입니다. 사람 많은 곳을 지나갈 때는 Excuse me. 라고 하고, 실수로 발을 밟았다면 I\'m so sorry! 라고 합니다.',
      },
    ],

    mistakes: [
      'Would you mind ~? 에 들어주겠다면서 Yes, I would. 라고 답하는 실수 — 그러면 "싫어요"가 됩니다. **Not at all.** 처럼 부정으로 답합니다.',
      '사과에 You\'re welcome. 으로 답하는 실수 — 사과에는 **That\'s okay. / No worries.** 로 답합니다.',
      'Thank you for 뒤에 동사원형을 쓰는 실수 — Thank you for help me. (✗) → **Thank you for helping me.** (○)',
    ],

    gens: [
      {
        id: 'pick-answer',
        level: 1,
        title: '부탁·감사·사과에 알맞은 대답 고르기',
        make: function (R) {
          var it = R.pick(LINES);
          var bad = R.sample(it[2], 3);
          var reason = {};
          bad.forEach(function (b) { reason[b[0]] = b[1]; });
          var pick = R.choices(it[1], bad.map(function (b) { return b[0]; }));
          return {
            type: 'choice', concept: it[3],
            q: '상대가 이렇게 말했습니다. 가장 알맞은 대답을 고르세요.\n\n"' + it[0] + '"',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === it[1] ? '' : reason[c]; }),
            explain: '상대의 말: ' + it[0] + '\n\n알맞은 대답: **' + it[1] + '**',
          };
        },
      },
      {
        id: 'pick-blank',
        level: 2,
        title: '부탁·허락·감사·사과 표현의 빈칸 채우기',
        make: function (R) {
          var it = R.pick(BLANKS);
          var reason = {};
          it[2].forEach(function (w) { reason[w[0]] = w[1]; });
          var pick = R.choices(it[1], it[2].map(function (w) { return w[0]; }), 3);
          return {
            type: 'choice', concept: it[3],
            q: '빈칸에 알맞은 말을 고르세요.\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === it[1] ? '' : reason[c]; }),
            explain: it[4] + '\n\n바른 문장: ' + it[0].replace('___', it[1]),
          };
        },
      },
    ],

    vocab: [
      { w: 'favor', m: '부탁, 호의', ex: 'Can I ask you a favor?', exm: '부탁 하나 드려도 될까요?' },
      { w: 'appreciate', m: '고맙게 여기다', ex: 'I really appreciate your advice.', exm: '조언해 주셔서 정말 감사합니다.' },
      { w: 'apologize', m: '사과하다', ex: 'We apologize for the delay.', exm: '늦어져서 죄송합니다.' },
      { w: 'mind', m: '꺼리다, 언짢아하다', ex: 'Would you mind waiting outside?', exm: '밖에서 기다려 주시겠어요?' },
      { w: 'borrow', m: '빌리다', ex: 'Can I borrow your charger?', exm: '충전기 좀 빌려도 될까요?' },
      { w: 'lend', m: '빌려주다', ex: 'Could you lend me some money?', exm: '돈 좀 빌려주실 수 있나요?' },
      { w: 'invitation', m: '초대', ex: 'Thank you for the invitation.', exm: '초대해 주셔서 감사합니다.' },
      { w: 'afraid', m: '(I\'m afraid ~) 유감스럽지만, 죄송하지만', ex: 'I\'m afraid the store is closed today.', exm: '죄송하지만 가게가 오늘은 문을 닫았습니다.' },
      { w: 'kind', m: '친절한', ex: 'That\'s very kind of you.', exm: '정말 친절하시네요.' },
      { w: 'mistake', m: '실수', ex: 'Sorry, that was my mistake.', exm: '죄송합니다, 제 실수였어요.' },
      { w: 'delay', m: '지연, 늦어짐', ex: 'Sorry for the delay in my reply.', exm: '답장이 늦어 죄송합니다.' },
      { w: 'appointment', m: '(병원 등의) 예약, 약속', ex: 'I have a dentist appointment at three.', exm: '세 시에 치과 예약이 있습니다.' },
    ],
  });
})();
