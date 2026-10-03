/* 공통영어2 · 함께 토의해 문제 해결하기
 * 예문·지문은 모두 직접 쓴 글이다(가상의 인물·가상의 학급 토의). */
(function () {
  // 짧은 글 1: 모둠 토의 (직접 쓴 대화)
  var MEETING = "Hayun: Our class garden has a problem. The plants dry out over the weekend.\n" +
    "Minsu: Why don't we water them on Friday afternoon?\n" +
    "Jia: That helps, but it won't be enough for two days. Building on Minsu's idea, we could also put plastic bottles with small holes next to the plants.\n" +
    'Doyun: I think we should buy an automatic watering system.\n' +
    'Hayun: That costs too much for our class. What if we try the bottles first and look for a cheaper system later?\n' +
    "Doyun: Okay, let's meet halfway. I'll search for prices online.\n" +
    "Jia: I'll bring the bottles on Monday.\n" +
    "Hayun: Great. So, we've agreed to water the plants on Fridays, set up the bottles, and compare prices for a system.";

  // 짧은 글 2: 토의 결과 발표 (직접 쓴 글)
  var REPORT = "Hello, everyone. Today, I'd like to share what our group decided about the problem in our class garden. " +
    'The problem was that the plants dried out over the weekend. We came up with two solutions. ' +
    'First, we will water the plants every Friday afternoon. Second, we will put water bottles with small holes next to the plants. ' +
    'Jia will bring the bottles, and Doyun will look for a watering system that our class can afford. ' +
    'Thank you for listening. Do you have any questions?';

  // 생성기 1: 제안 표현 뒤의 동사 꼴 [동사원형, -ing, 과거형, 뒷부분]
  var ACTS = [
    ['make', 'making', 'made', 'a poster for the festival'],
    ['ask', 'asking', 'asked', 'our teacher for advice'],
    ['plant', 'planting', 'planted', 'more trees in the schoolyard'],
    ['hold', 'holding', 'held', 'a book swap day'],
    ['start', 'starting', 'started', 'a recycling campaign'],
    ['use', 'using', 'used', 'both sides of the paper'],
    ['bring', 'bringing', 'brought', 'our own cups'],
    ['write', 'writing', 'wrote', 'a letter to the principal'],
    ['take', 'taking', 'took', 'turns cleaning the classroom'],
    ['divide', 'dividing', 'divided', 'the work into three parts'],
    ['choose', 'choosing', 'chose', 'a leader first'],
  ];
  // [앞부분, 오는 꼴(base | ing), 끝 문장부호]
  var FRAMES = [
    ["Why don't we", 'base', '?'],
    ['How about', 'ing', '?'],
    ['What about', 'ing', '?'],
    ["Let's", 'base', '.'],
    ['I suggest that we', 'base', '.'],
  ];

  // 생성기 2: 토의에서 말의 역할
  var ROLE = {
    suggest: '해결책 제안하기', build: '다른 의견에 덧붙여 보완하기', compromise: '의견 조율·타협하기',
    confirm: '합의한 내용 확인하기', assign: '역할 나누기', present: '토의 결과 발표하기',
  };
  var ROLE_CONCEPT = { suggest: 0, build: 1, compromise: 2, confirm: 3, assign: 3, present: 4 };
  // 헷갈릴 수 있는 역할끼리는 오답으로 함께 내지 않는다(제안·보완·타협은 모두 제안의 성격이 있다)
  var ROLE_WRONG = {
    suggest: ['confirm', 'assign', 'present'],
    build: ['confirm', 'assign', 'present'],
    compromise: ['confirm', 'assign', 'present'],
    confirm: ['suggest', 'build', 'compromise'],
    assign: ['suggest', 'build', 'compromise'],
    present: ['suggest', 'build', 'compromise'],
  };
  var LINES = [
    ["Why don't we ask the student council for help?", 'suggest'],
    ['How about having the meeting online?', 'suggest'],
    ['I suggest that we start with the easiest task.', 'suggest'],
    ["Let's make a list of all our ideas first.", 'suggest'],
    ['Building on that idea, we could also invite parents.', 'build'],
    ['Adding to what Jia said, we will need more volunteers.', 'build'],
    ["That's a good point. Also, we should think about the cost.", 'build'],
    ['I agree, and we could add a short quiz at the end.', 'build'],
    ["Let's meet halfway and make the video three minutes long.", 'compromise'],
    ['What if we do half of the work today and the rest tomorrow?', 'compromise'],
    ['I see your point. Maybe we can each give up a little.', 'compromise'],
    ['Can we find a middle ground between the two ideas?', 'compromise'],
    ["So, we've agreed to meet every Tuesday, right?", 'confirm'],
    ["Let me make sure I understand. We're going to use Minsu's design.", 'confirm'],
    ['Are we all on the same page about the deadline?', 'confirm'],
    ['Just to be clear, we decided not to buy new paint.', 'confirm'],
    ["I'll take care of the posters.", 'assign'],
    ['Could you be in charge of the music?', 'assign'],
    ['Seojun will contact the guest speaker, and Hayun will book the room.', 'assign'],
    ['Who wants to write the final report?', 'assign'],
    ["Today, I'd like to share what our group decided.", 'present'],
    ['To sum up, we chose the second plan because it costs less.', 'present'],
    ['Thank you for listening. Do you have any questions?', 'present'],
    ["First, I'll explain the problem we discussed.", 'present'],
  ];

Tutor.registerUnit({
  id: 'eng-h-c2-12',
  course: 'eng-h-c2',
  title: '함께 토의해 문제 해결하기',
  summary: '문제를 함께 해결하기 위해 해결책을 제안하고, 다른 의견에 덧붙이거나 조율해 합의에 이르며, 합의한 내용을 확인하고 발표하는 표현을 익힙니다.',
  goals: [
    "Why don't we ~?, How about ~?으로 해결책을 제안하고 뒤에 오는 동사의 꼴을 바르게 쓸 수 있다.",
    '다른 사람의 의견에 덧붙여 보완하고, 의견이 다를 때 타협안을 낼 수 있다.',
    '합의한 내용을 확인하고 역할을 나누는 말을 할 수 있다.',
    '토의 결과를 짜임새 있게 정리해 발표할 수 있다.',
  ],
  standards: ['[10공영2-02-09]'],

  concepts: [
    {
      title: '해결책 제안하기',
      body: '토의는 문제를 확인한 뒤 해결책을 내는 데서 시작합니다. 제안 표현은 **뒤에 오는 동사의 꼴**이 저마다 다르므로 함께 익힙니다.\n\n' +
        '| 표현 | 뒤에 오는 꼴 | 예 |\n|---|---|---|\n' +
        "| **Why don't we** ~? | 동사원형 | Why don't we **ask** the teacher? |\n" +
        "| **Let's** ~. | 동사원형 | Let's **make** a list first. |\n" +
        '| **How about** ~? / **What about** ~? | 동명사(-ing) 또는 명사 | How about **making** a poster? / How about a poster? |\n' +
        '| **I suggest that we** ~. | 동사원형 | I suggest that we **start** earlier. |\n' +
        '| We **could** ~. | 동사원형 | We could **use** both sides of the paper. |\n\n' +
        "Why don't we ~?는 이유를 묻는 질문이 아니라 \"우리 ~하는 게 어때?\"라는 **제안**입니다. 나를 빼고 상대에게만 권할 때는 Why don't **you** ~?를 씁니다.\n\n" +
        '> ⚠️ How about 뒤에 동사원형을 쓰지 않습니다. How about make a poster? (×) → How about **making** a poster? (○)\n\n' +
        '> 💡 제안할 때 이유를 한 문장 덧붙이면 설득력이 커집니다. Why don\'t we bring our own cups? **That way,** we can reduce plastic waste.',
      easy: '제안 표현을 문 모양으로 생각해 보십시오.\n\n' +
        "- Why don't we, Let's, I suggest that we, We could → 동사가 **그대로** 들어가는 문입니다. (ask, make, start)\n" +
        '- How about, What about → about이 전치사라서 **-ing 옷**을 입어야 들어가는 문입니다. (asking, making, starting)\n\n' +
        "그래서 \"포스터를 만들면 어때?\"는 Why don't we make a poster? 또는 How about making a poster?입니다.",
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nHow about [[빈칸]] our teacher for advice?',
        choices: ['asking', 'ask', 'to ask'],
        answer: 0,
        why: ['', 'How about의 about은 전치사라서 뒤에 동사원형을 쓸 수 없습니다. 동명사 asking으로 씁니다.', '전치사 about 뒤에는 to부정사가 아니라 동명사가 옵니다.'],
        explain: 'How about 뒤에는 동명사(-ing)가 옵니다. How about **asking** our teacher for advice?(선생님께 조언을 구하면 어때?)',
      },
    },
    {
      title: '다른 의견에 덧붙여 보완하기',
      body: '좋은 토의는 의견을 하나씩 따로 내는 것이 아니라 **앞사람의 생각 위에 쌓아 올리는** 것입니다. 상대의 의견을 인정한 뒤 빈 곳을 채우거나 더 발전시킵니다.\n\n' +
        '- **Building on that idea,** we could also invite parents. (그 생각을 바탕으로 덧붙이면 ~)\n' +
        "- **Adding to what Jia said,** we'll need more volunteers. (지아의 말에 덧붙이면 ~)\n" +
        "- **That's a good point. Also,** we should think about the cost.\n" +
        '- **I agree, and** we could add a short quiz at the end.\n\n' +
        '말할 차례를 얻거나 다른 사람의 말을 끌어낼 때는 다음과 같이 말합니다.\n\n' +
        '- **Can I add something?** / **Sorry to interrupt, but** ~\n' +
        '- **What do you think,** Doyun? (조용한 친구의 의견을 묻기)\n\n' +
        '> ⚠️ 덧붙이기(보완)와 반대는 다릅니다. Building on that idea ~ 뒤에는 앞 의견을 **살리면서 더하는** 내용이 와야 합니다. 앞 의견을 버리는 말(I don\'t think that will work.)은 보완이 아니라 반대입니다.',
      easy: '토의를 블록 쌓기라고 생각해 보십시오. 민수가 블록 하나(물 주기)를 놓으면, 지아는 그것을 치우지 않고 그 위에 블록(물병 꽂기)을 하나 더 올립니다.\n\n' +
        'Building on that idea는 말 그대로 "그 생각 위에 짓기"입니다. 앞사람의 블록을 인정하고 그 위에 내 블록을 얹는 말입니다.',
      check: {
        type: 'ox',
        q: '다음 대답은 A의 의견에 **덧붙여 보완하는** 말입니다.\n\nA: We could sell our old books to raise money.\nB: Building on that idea, we could also sell homemade bookmarks.',
        answer: true,
        explain: 'B는 A의 의견(헌책 팔기)을 그대로 살리면서 **책갈피도 함께 팔자**는 생각을 더했습니다. Building on that idea는 앞 의견 위에 덧붙일 때 쓰는 말입니다.',
      },
    },
    {
      title: '의견 조율과 타협',
      body: '의견이 부딪히면 한쪽이 이기는 것이 아니라, 서로 조금씩 양보해 **모두 받아들일 수 있는 안**을 찾습니다.\n\n' +
        '**먼저 상대의 생각을 인정하고, 그다음 내 걱정을 말합니다.**\n' +
        "- **I see your point, but** a long video takes too much time.\n" +
        "- **I understand what you mean. However,** we don't have enough money.\n\n" +
        '**그다음 타협안을 냅니다.**\n' +
        '- **What if we** make a short video instead? (~하면 어떨까?)\n' +
        "- **Let's meet halfway.** We can make a three-minute video. (서로 반씩 양보하자)\n" +
        '- **Can we find a middle ground?** (중간 지점을 찾아볼까?)\n\n' +
        'What if we ~? 뒤에는 현재형(What if we **try** …?)이나 과거형(What if we **tried** …?)을 씁니다. 과거형으로 쓰면 조금 더 조심스러운 느낌입니다.\n\n' +
        '> ⚠️ You\'re wrong. / That\'s a stupid idea.처럼 사람을 공격하는 말은 토의를 멈추게 합니다. 반대할 때도 **의견**에 대해 말하고, 이유를 붙입니다.',
      easy: '두 친구가 피자 토핑을 두고 다툰다고 해 봅시다. 한 명은 불고기, 한 명은 치즈만 원합니다. "반반 피자로 하자!" — 이것이 Let\'s meet halfway.입니다.\n\n' +
        'What if we ~?는 "이렇게 해 보면 어떨까?"라고 새 길을 슬쩍 내미는 말입니다. 누구의 생각도 버리지 않고 둘을 섞은 길을 찾을 때 씁니다.',
      check: {
        type: 'choice',
        q: '두 사람의 의견을 **조율하는** 말로 가장 알맞은 것은 무엇입니까?\n\nA: Let\'s have the party in the classroom.\nB: But the classroom is too small. Let\'s use the gym.',
        choices: [
          'What if we use the classroom for food and the gym for games?',
          "You're wrong. The classroom is fine.",
          "Let's not have a party at all.",
        ],
        answer: 0,
        why: ['', '상대의 의견을 무시하고 자기 주장만 되풀이했습니다. 조율이 아닙니다.', '문제를 해결하지 않고 피해 버렸습니다. 두 의견을 함께 살리는 안을 찾아야 합니다.'],
        explain: '**What if we ~?**로 두 의견을 함께 살리는 안(교실은 음식, 체육관은 게임)을 냈습니다. 서로 조금씩 양보하는 타협안입니다.',
      },
    },
    {
      title: '합의한 내용 확인하고 역할 나누기',
      body: '토의가 끝날 무렵에는 **무엇을 정했는지** 소리 내어 확인하고, **누가 언제까지 무엇을 할지** 나눕니다. 이 단계를 건너뛰면 "누가 하기로 했지?" 하는 혼란이 생깁니다.\n\n' +
        '**합의 확인**\n' +
        "- **So, we've agreed to** water the plants on Fridays, right?\n" +
        "- **Let me make sure I understand.** We're going to use Minsu's design.\n" +
        '- **Are we all on the same page?** (모두 같은 생각인가요?)\n' +
        '- **Just to be clear,** we decided not to buy new paint.\n\n' +
        '**역할 나누기**\n' +
        "- **I'll take care of** the posters. (내가 맡을게)\n" +
        '- **Could you be in charge of** the music? (~을 맡아 줄래?)\n' +
        '- **Who wants to** write the report?\n' +
        '- Seojun **will** contact the speaker **by** Thursday. (기한은 by)\n\n' +
        '> 💡 역할을 정할 때는 **사람 + 할 일 + 기한**을 한 문장에 담으면 분명합니다. Jia will bring the bottles by Monday.',
      easy: '모둠 활동이 끝날 때 칠판에 "누가 / 무엇을 / 언제까지"라는 세 칸짜리 표를 그린다고 생각해 보십시오.\n\n' +
        "So, we've agreed to ~는 그 표의 제목(우리가 정한 것)을 읽는 말이고, I'll take care of ~, Could you be in charge of ~?는 칸에 이름을 채우는 말입니다.",
      check: {
        type: 'short',
        q: '빈칸에 들어갈 한 낱말을 쓰십시오.\n\nCould you be in [[빈칸]] of the music for the festival? (축제 음악을 맡아 줄래?)',
        answer: ['charge'],
        wrong: [{ a: 'care', why: 'take care of(돌보다, 맡아 처리하다)와 섞였습니다. "~을 맡다"는 be in charge of입니다.' }],
        explain: '**be in charge of** ~ : ~을 맡다, ~의 책임을 지다. Could you be in **charge** of the music?',
      },
    },
    {
      title: '토의 결과 정리해 발표하기',
      body: '토의 결과를 발표할 때는 듣는 사람이 흐름을 따라올 수 있게 **정해진 짜임**에 맞추고, 순서를 알려 주는 **신호어**를 씁니다.\n\n' +
        '| 단계 | 표현 |\n|---|---|\n' +
        "| 시작 (주제 밝히기) | **Today, I'd like to share** what our group decided about ~. |\n" +
        '| 문제 | **The problem was that** ~. |\n' +
        '| 해결책과 이유 | We came up with two solutions. **First,** ~ **Second,** ~ |\n' +
        '| 역할·일정 | Jia will ~, and Doyun will ~. |\n' +
        '| 정리 | **To sum up,** ~ / **In conclusion,** ~ |\n' +
        '| 마무리 | **Thank you for listening.** Do you have any questions? |\n\n' +
        '발표는 토의를 그대로 옮기는 것이 아닙니다. 누가 무슨 말을 했는지보다 **최종으로 정한 것과 그 이유**를 중심으로 짧게 정리합니다.\n\n' +
        '> 💡 First, Second, Finally 같은 신호어는 듣는 사람에게 "지금 몇 번째 이야기인지" 알려 주는 표지판입니다.',
      easy: '발표는 샌드위치와 같습니다. 위의 빵(시작: 무엇에 대해 말할지), 속 재료(문제 → 해결책 → 역할), 아래 빵(정리와 감사 인사)입니다.\n\n' +
        '빵 없이 속 재료만 내밀면 듣는 사람이 무엇에 대한 이야기인지 모르고, 속 재료 없이 빵만 있으면 내용이 없습니다.',
      check: {
        type: 'choice',
        q: '토의 결과 발표를 **마무리할 때** 알맞은 말은 무엇입니까?',
        choices: ['Thank you for listening. Do you have any questions?', "Today, I'd like to share what our group decided.", 'The problem was that we had a small budget.'],
        answer: 0,
        why: ['', '발표를 시작하며 주제를 밝히는 말입니다.', '발표 앞부분에서 문제를 설명하는 말입니다.'],
        explain: '"들어 주셔서 감사합니다"라는 인사 **Thank you for listening.** 뒤에 질문을 받는 말을 붙여 발표를 마무리합니다.',
      },
    },
  ],

  examples: [
    {
      q: '학급에서 종이컵을 너무 많이 쓴다는 문제를 두고 토의합니다. 제안 → 덧붙이기 → 조율 → 합의 확인과 역할 나누기의 흐름으로 짧은 대화를 만들어 보십시오.',
      steps: [
        "해결책을 제안합니다. Why don't we 뒤에는 동사원형: Minsu: Why don't we bring our own cups?",
        '앞 의견을 살리면서 덧붙입니다: Jia: Building on that idea, we could put a cup shelf in the classroom.',
        '걱정을 인정하고 타협안을 냅니다. Doyun: I see your point, but some students will forget their cups. What if we keep a few extra cups on the shelf?',
        "합의한 내용을 확인하고 역할을 나눕니다: Hayun: So, we've agreed to bring our own cups and keep a few extra ones. I'll make a sign for the shelf.",
      ],
      answer: "Minsu: Why don't we bring our own cups?\nJia: Building on that idea, we could put a cup shelf in the classroom.\nDoyun: I see your point, but some students will forget their cups. What if we keep a few extra cups on the shelf?\nHayun: So, we've agreed to bring our own cups and keep a few extra ones. I'll make a sign for the shelf.",
    },
    {
      q: '앞의 토의 결과를 학급 친구들에게 발표하는 짧은 글로 정리해 보십시오.',
      steps: [
        "주제를 밝히며 시작합니다: Today, I'd like to share what our group decided about paper cups.",
        'The problem was that ~으로 문제를 짧게 말합니다: The problem was that our class used too many paper cups.',
        '신호어 First, Second로 해결책을 차례로 말합니다: First, everyone will bring their own cup. Second, we will keep a few extra cups on a shelf.',
        '역할을 밝힙니다: Hayun will make a sign for the shelf.',
        '감사 인사와 질문 받기로 마무리합니다: Thank you for listening. Do you have any questions?',
      ],
      answer: "Today, I'd like to share what our group decided about paper cups. The problem was that our class used too many paper cups. First, everyone will bring their own cup. Second, we will keep a few extra cups on a shelf. Hayun will make a sign for the shelf. Thank you for listening. Do you have any questions?",
    },
  ],

  terms: [
    { term: '토의', def: '여러 사람이 함께 의견을 나누며 가장 좋은 해결책을 찾는 말하기입니다. 이기고 지는 토론과 달리 협력이 목표입니다.' },
    { term: '제안', def: "해결책이나 할 일을 내놓는 말입니다. 예: Why don't we ~? / How about ~ing? / I suggest that we ~." },
    { term: '보완', def: '앞사람의 의견을 살리면서 모자란 점을 채우거나 더 발전시키는 것입니다. 예: Building on that idea, ~' },
    { term: '타협', def: "서로 조금씩 양보해 모두 받아들일 수 있는 안을 찾는 것입니다. 예: Let's meet halfway. / What if we ~?" },
    { term: '합의', def: "토의에 참여한 사람들이 의견을 하나로 모은 것입니다. 예: So, we've agreed to ~." },
    { term: '역할 분담', def: '누가 무엇을 언제까지 할지 나누는 것입니다. 예: Could you be in charge of the music?' },
    { term: '신호어', def: '글이나 발표의 순서와 흐름을 알려 주는 말입니다. 예: First, Second, Finally, To sum up' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: 'B가 해결책을 **제안하는** 말이 되도록 빈칸에 알맞은 것은 무엇입니까?\n\nA: We have too much trash in our classroom.\nB: [[빈칸]] put a recycling box by the door?',
      choices: ["Why don't we", 'Why did we', 'How about', 'What about'],
      answer: 0,
      why: [
        '',
        '이미 지난 일의 이유를 묻는 질문입니다. 앞으로 할 일을 제안하려면 Why don\'t we ~?를 씁니다.',
        'How about 뒤에는 동명사가 와야 합니다(How about putting ~?). 빈칸 뒤에 동사원형 put이 있습니다.',
        'What about 뒤에도 동명사가 와야 합니다(What about putting ~?). 빈칸 뒤에 동사원형 put이 있습니다.',
      ],
      explain: "빈칸 뒤에 동사원형 put이 있으므로 동사원형과 함께 쓰는 제안 표현 **Why don't we**가 알맞습니다. (문 옆에 재활용 상자를 두는 게 어때?)",
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 0,
      q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 빈칸에 쓰십시오.\n\nHow about [[빈칸]] (make) a poster for the event?',
      answer: ['making'],
      wrong: [
        { a: 'make', why: 'How about의 about은 전치사라서 동사원형을 쓸 수 없습니다. 동명사 making으로 씁니다.' },
        { a: 'to make', why: '전치사 about 뒤에는 to부정사가 아니라 동명사가 옵니다.' },
        { a: 'makeing', why: 'e로 끝나는 동사는 e를 빼고 -ing를 붙입니다: making' },
      ],
      explain: 'How about + 동명사: How about **making** a poster for the event? (행사 포스터를 만들면 어때?)',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '다른 사람의 의견에 **덧붙여 보완하는** 말은 무엇입니까?',
      choices: [
        'Building on that idea, we could also make a short video.',
        "I don't think that will work.",
        "Let's vote right now.",
        "That's not my problem.",
      ],
      answer: 0,
      why: [
        '',
        '앞 의견에 반대하는 말입니다. 보완은 앞 의견을 살리면서 더하는 것입니다.',
        '투표하자는 새 제안입니다. 앞 의견에 무언가를 덧붙이는 말이 아닙니다.',
        '토의에 참여하지 않겠다는 무례한 말입니다.',
      ],
      explain: '**Building on that idea**(그 생각을 바탕으로)는 앞사람의 의견을 인정하고 그 위에 새 내용(짧은 영상)을 더하는 말입니다.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: '다음 표현은 "서로 조금씩 양보하자"라는 뜻입니다.\n\nLet\'s meet halfway.',
      answer: true,
      explain: "Let's meet halfway.는 원래 \"중간 지점에서 만나자\"라는 뜻이고, 토의에서는 **서로 반씩 양보해 타협하자**는 뜻으로 씁니다.",
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '토의 끝에 **합의한 내용을 확인하는** 말은 무엇입니까?',
      choices: [
        "So, we've agreed to hold the event on Friday, right?",
        "Why don't we hold the event on Friday?",
        'I see your point, but Friday is too busy.',
        'Thank you for listening.',
      ],
      answer: 0,
      why: [
        '',
        '금요일에 하자고 새로 제안하는 말입니다. 이미 정한 것을 확인하는 말이 아닙니다.',
        '상대 의견을 인정하면서 걱정을 말하는 조율의 말입니다.',
        '발표를 마무리하는 인사입니다.',
      ],
      explain: "**So, we've agreed to ~, right?**(그럼 우리 ~하기로 한 거 맞지?)은 정한 내용을 다시 말해 모두 같은 생각인지 확인합니다.",
    },
    {
      id: 'p6', level: 1, type: 'short', concept: 3,
      q: '"우리 모두 같은 생각인가요?"라는 뜻이 되도록 빈칸에 한 낱말을 쓰십시오.\n\nAre we all on the same [[빈칸]]?',
      answer: ['page'],
      wrong: [{ a: 'side', why: 'on the same side는 "같은 편"이라는 뜻에 가깝습니다. 모두 같은 내용을 이해했는지 확인할 때는 on the same page를 씁니다.' }],
      explain: '**be on the same page**: 같은 내용을 이해하고 같은 생각을 하고 있다. 합의한 내용을 확인할 때 자주 씁니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '발표의 빈칸에 알맞은 말은 무엇입니까?\n\nWe came up with two solutions. [[빈칸]], we will water the plants every Friday. Second, we will put water bottles next to the plants.',
      choices: ['First', 'To sum up', 'However', 'Thank you for listening'],
      answer: 0,
      why: [
        '',
        'To sum up은 발표 끝에서 내용을 정리할 때 씁니다. 해결책을 하나씩 말하기 시작하는 자리가 아닙니다.',
        'However는 앞 내용과 반대되는 말을 이을 때 씁니다. 두 해결책은 서로 반대되지 않습니다.',
        '발표를 마무리하는 인사입니다.',
      ],
      explain: '뒤에 Second가 이어지므로 첫 번째 해결책을 알리는 신호어 **First**가 알맞습니다.',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 2,
      q: '다음 문장은 회의 시간을 바꾼 **이유를 묻는** 질문입니다.\n\nWhat if we change the meeting time?',
      answer: false,
      explain: 'What if we ~?는 "~하면 어떨까?"라는 **제안·타협**의 말입니다. 회의 시간을 바꿔 보자고 새 안을 내놓는 것이지, 이유를 묻는 것이 아닙니다.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 0,
      q: '"회의를 더 일찍 시작하자고 제안합니다."라는 뜻이 되도록 순서대로 놓으십시오.',
      choices: ['I suggest', 'that we', 'start', 'the meeting', 'earlier.'],
      answer: [0, 1, 2, 3, 4],
      hint: 'I suggest that + 주어 + 동사원형 순서입니다.',
      explain: 'I suggest that we start the meeting earlier. — suggest 뒤의 that절에는 주어(we) 다음에 동사원형(start)을 씁니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 2,
      q: "대화의 빈칸에 알맞은 것은 무엇입니까?\n\nA: Let's make a ten-minute video for our presentation.\nB: But that will take too much time. We only have one week.\nA: [[빈칸]]",
      choices: [
        'I see your point. What if we make a three-minute video instead?',
        "You're wrong. Ten minutes is not long.",
        "Why don't you make the video by yourself?",
        "Then let's not do the presentation.",
      ],
      answer: 0,
      hint: 'B의 걱정을 인정하면서 두 사람 모두 받아들일 수 있는 안을 찾아보십시오.',
      why: [
        '',
        '상대를 틀렸다고 몰아붙이는 말입니다. 걱정을 인정하고 타협안을 내야 합니다.',
        "Why don't you ~?는 상대에게만 떠넘기는 말이라 함께 해결하는 태도가 아닙니다.",
        '문제를 해결하지 않고 포기하는 말입니다.',
      ],
      explain: '**I see your point**로 B의 걱정(시간 부족)을 인정하고, **What if we ~?**로 영상을 짧게 만들자는 타협안을 냈습니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '다음 대화에서 물병을 가져오기로 한 사람은 누구입니까?\n\n' + MEETING,
      choices: ['Jia', 'Minsu', 'Doyun', 'Hayun'],
      answer: 0,
      hint: "I'll ~로 시작하는 말을 찾아보십시오.",
      why: [
        '',
        '민수는 금요일 오후에 물을 주자고 제안했습니다.',
        '도윤이는 급수 장치의 가격을 알아보기로 했습니다(I\'ll search for prices online.).',
        '하윤이는 문제를 꺼내고 마지막에 합의한 내용을 정리했습니다.',
      ],
      explain: "지아가 **I'll bring the bottles on Monday.**(월요일에 물병을 가져올게.)라고 맡았습니다. 역할을 맡을 때는 I'll ~로 말합니다.",
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 4,
      q: '다음 발표의 내용과 일치하는 것은 무엇입니까?\n\n' + REPORT,
      choices: [
        'The group came up with two solutions to the problem.',
        'Doyun will bring the water bottles.',
        'The plants will be watered every Monday.',
        'The class has already bought a watering system.',
      ],
      answer: 0,
      why: [
        '',
        '물병은 지아가 가져오고, 도윤이는 급수 장치를 알아봅니다.',
        '물은 매주 금요일 오후에 줍니다.',
        '급수 장치는 아직 사지 않았고, 도윤이가 학급이 살 수 있는 것을 알아볼 예정입니다.',
      ],
      explain: 'We came up with two solutions.라고 한 뒤 First(금요일 물 주기), Second(물병 꽂기)로 두 해결책을 차례로 말했습니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 2,
      q: "다음 대화에서 Doyun이 Let's meet halfway.라고 말하며 받아들인 안은 무엇입니까?\n\n" + MEETING,
      choices: [
        '물병을 먼저 써 보고, 더 싼 급수 장치는 나중에 알아본다.',
        '자동 급수 장치를 바로 산다.',
        '금요일마다 물을 주는 것으로만 해결한다.',
        '학급 정원 가꾸기를 그만둔다.',
      ],
      answer: 0,
      hint: 'Doyun의 말 바로 앞에 나온 What if we ~? 문장을 보십시오.',
      why: [
        '',
        '하윤이가 비용이 너무 많이 든다고 했고, 도윤이는 바로 사자는 생각을 양보했습니다.',
        '지아가 금요일 물 주기만으로는 이틀을 버티기 어렵다고 했습니다.',
        '정원 가꾸기를 그만두자는 말은 없습니다.',
      ],
      explain: "하윤이가 **What if we try the bottles first and look for a cheaper system later?**라고 타협안을 내자, 장치를 사자던 도윤이가 Let's meet halfway.로 받아들였습니다. 도윤이는 장치를 바로 사는 대신 가격을 알아보는 역할을 맡았습니다.",
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 3,
      q: '다음 대화의 마지막에 하윤이가 확인한 합의 내용에 **들어 있지 않은** 것은 무엇입니까?\n\n' + MEETING,
      choices: ['금요일마다 식물에 물 주기', '식물 옆에 물병 설치하기', '급수 장치 가격 비교하기', '자동 급수 장치 바로 사기'],
      answer: 3,
      hint: "So, we've agreed to 뒤에 나열된 세 가지를 찾아보십시오.",
      why: [
        'water the plants on Fridays — 합의 내용에 들어 있습니다.',
        'set up the bottles — 합의 내용에 들어 있습니다.',
        'compare prices for a system — 합의 내용에 들어 있습니다.',
        '',
      ],
      explain: "하윤이는 **So, we've agreed to** water the plants on Fridays, set up the bottles, and compare prices for a system.이라고 정리했습니다. 장치를 바로 사는 것은 비용 때문에 미루기로 했습니다.",
    },
    {
      id: 'a3', level: 3, type: 'order', concept: 4,
      q: '토의 결과 발표가 되도록 문장을 순서대로 놓으십시오.',
      choices: [
        "Today, I'd like to share our group's plan for the school festival.",
        'The problem was that we had only a small budget.',
        'First, we will make the decorations ourselves instead of buying them.',
        'To sum up, we can save money and still have a great festival.',
        'Thank you for listening.',
      ],
      answer: [0, 1, 2, 3, 4],
      hint: '시작 → 문제 → 해결책 → 정리 → 마무리 순서입니다.',
      explain: "Today, I'd like to share ~(주제) → The problem was that ~(문제) → First, ~(해결책) → To sum up, ~(정리) → Thank you for listening.(마무리) 순서입니다. 신호어가 각 문장의 자리를 알려 줍니다.",
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 1,
      q: '민수의 의견에 **덧붙여 보완하는** 대답은 무엇입니까?\n\nMinsu: We could sell our old books to raise money for the animal shelter.',
      choices: [
        'Building on that idea, we could also sell snacks at the book sale.',
        "I don't think selling books is a good idea.",
        "Why don't we just ask our parents for money?",
        'Selling books? That sounds boring.',
      ],
      answer: 0,
      hint: '민수의 생각(헌책 팔기)을 살리면서 무언가를 더한 대답을 찾으십시오.',
      why: [
        '',
        '민수의 의견에 반대하는 말입니다. 보완은 앞 의견을 살리며 더하는 것입니다.',
        '민수의 의견을 버리고 전혀 다른 방법을 제안했습니다. 앞 의견 위에 쌓은 것이 아닙니다.',
        '이유 없이 의견을 깎아내리는 말로, 보완도 정중한 반대도 아닙니다.',
      ],
      explain: '**Building on that idea**로 민수의 헌책 판매를 그대로 살리고, 같은 자리에서 간식도 팔자는 생각을 더했습니다.',
    },
    {
      id: 'a5', level: 3, type: 'short', concept: 0,
      q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 빈칸에 쓰십시오.\n\nI suggest that we [[빈칸]] (meet) earlier tomorrow.',
      answer: ['meet', 'should meet'],
      hint: 'suggest that 뒤의 절에서 동사가 어떤 꼴인지 떠올려 보십시오.',
      wrong: [
        { a: 'met', why: '제안하는 내용은 앞으로 할 일이므로 과거형을 쓰지 않습니다. 동사원형 meet을 씁니다.' },
        { a: 'meeting', why: 'that 뒤에는 주어(we) + 동사가 와야 합니다. -ing 꼴은 동사 자리에 올 수 없습니다.' },
        { a: 'to meet', why: 'that 뒤에는 주어(we) + 동사가 와야 합니다. to부정사는 동사 자리에 올 수 없습니다.' },
      ],
      explain: '제안을 나타내는 suggest 뒤의 that절에는 **동사원형**(또는 should + 동사원형)을 씁니다. I suggest that we **meet** earlier tomorrow.',
    },
  ],

  deeper: [
    {
      title: '토의와 토론은 어떻게 다를까?',
      body: '**토론(debate)**은 찬성과 반대로 나뉘어 상대를 설득하는 말하기입니다. 근거로 상대 주장의 약점을 짚고, 어느 쪽이 더 설득력 있었는지 판정하기도 합니다.\n\n' +
        '**토의(discussion)**는 같은 문제를 앞에 두고 **함께 가장 좋은 해결책을 찾는** 말하기입니다. 이기고 지는 사람이 없고, 남의 생각을 받아 더 좋게 만드는 것(Building on that idea)이 오히려 큰 기여입니다.\n\n' +
        '토의를 잘 이끄는 몇 가지 원칙이 있습니다.\n' +
        '- 처음에는 생각을 평가하지 말고 많이 꺼냅니다. (Let\'s make a list of all our ideas first.)\n' +
        '- 의견에 반대할 때는 사람이 아니라 의견을 말하고, 이유를 붙입니다.\n' +
        '- 끝날 때는 반드시 합의 내용과 역할을 확인합니다.\n\n' +
        '다음 과정(영어Ⅰ)에서는 문화가 다른 사람들과 협력하는 장면에서 이런 표현을 다시 쓰게 됩니다.',
    },
  ],

  faq: [
    {
      q: "Why don't we는 \"왜 안 해?\"인데 왜 제안이에요?",
      a: '글자 그대로는 "우리 왜 ~하지 않지?"이지만, 실제로는 "~하지 않을 이유가 없잖아, 하자"라는 뜻으로 굳어진 **제안 표현**입니다. 그래서 대답도 이유가 아니라 Sounds good. / Good idea.처럼 제안에 대한 반응으로 합니다.',
    },
    {
      q: 'How about이랑 What about은 똑같아요?',
      a: '제안할 때는 거의 같습니다(How about making a poster? = What about making a poster?). 둘 다 뒤에 명사나 동명사가 옵니다. What about은 "그럼 ~은 어떻게 하고?"처럼 빠진 점을 짚을 때도 자주 씁니다. 예: What about the cost?',
    },
    {
      q: '반대 의견은 어떻게 말해야 무례하지 않아요?',
      a: "먼저 상대의 생각을 인정하는 말(I see your point, / That's a good idea, but)로 시작하고, 반대하는 **이유**를 말한 뒤, 가능하면 다른 안(What if we ~?)을 함께 냅니다. You're wrong.처럼 사람을 평가하는 말은 피합니다.",
    },
    {
      q: "Let's meet halfway는 진짜로 중간에서 만나자는 말이에요?",
      a: '두 곳의 중간 지점에서 만나자는 뜻으로도 씁니다. 하지만 토의·협상에서는 "서로 반씩 양보하자", 곧 타협하자는 뜻으로 많이 씁니다. 앞뒤 상황을 보고 판단합니다.',
    },
  ],

  mistakes: [
    'How about·What about 뒤에 동사원형을 쓰는 실수 — How about make a poster? (×) → How about making a poster? (○)',
    'suggest that 뒤에 과거형이나 to부정사를 쓰는 실수 — I suggest that we met / to meet (×) → I suggest that we meet (○)',
    'Building on that idea 뒤에 앞 의견을 뒤집는 말을 하는 실수 — 보완은 앞 의견을 살리며 더하는 것입니다. 반대할 때는 I see your point, but ~으로 말합니다.',
  ],

  gens: [
    {
      id: 'suggest-form',
      level: 1,
      title: '제안 표현 뒤의 동사 꼴 고르기',
      make: function (R) {
        var a = R.pick(ACTS);
        var fr = R.pick(FRAMES);
        var base = a[0], ing = a[1], past = a[2], rest = a[3];
        var useBase = fr[1] === 'base';
        var correct = useBase ? base : ing;
        var reason = {};
        var wrongs;
        if (useBase) {
          reason[ing] = fr[0] + ' 뒤에는 동사원형이 옵니다. -ing를 붙이지 않습니다.';
          reason['to ' + base] = fr[0] + ' 뒤에는 to 없이 동사원형을 씁니다.';
          reason[past] = '제안하는 내용은 앞으로 할 일이므로 과거형을 쓰지 않습니다. ' + fr[0] + ' 뒤에는 동사원형이 옵니다.';
          wrongs = [ing, 'to ' + base, past];
        } else {
          var why = fr[0] + '의 about은 전치사라서 뒤에 동명사(-ing)를 씁니다.';
          reason[base] = why;
          reason['to ' + base] = why;
          reason[past] = why + ' 과거형도 쓰지 않습니다.';
          wrongs = [base, 'to ' + base, past];
        }
        var pick = R.choices(correct, wrongs);
        var kindText = useBase ? '동사원형이' : '동명사(-ing)가';
        return {
          type: 'choice', concept: 0,
          q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + fr[0] + ' [[빈칸]] ' + rest + fr[2],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: fr[0] + ' 뒤에는 ' + kindText + ' 옵니다. → **' + fr[0] + ' ' + correct + ' ' + rest + fr[2] + '**',
        };
      },
    },
    {
      id: 'discussion-role',
      level: 2,
      title: '토의에서 말의 역할 알아보기',
      make: function (R) {
        var HINT = {
          suggest: "Why don't we, How about, Let's, I suggest 같은 말로 새 해결책을 내놓고 있습니다.",
          build: 'Building on, Adding to, Also, I agree, and처럼 앞사람의 의견을 살리며 무언가를 더하고 있습니다.',
          compromise: 'What if we, meet halfway, middle ground, give up a little처럼 서로 양보하는 안을 찾고 있습니다.',
          confirm: "So, we've agreed, make sure, the same page, Just to be clear처럼 이미 정한 것을 다시 확인하고 있습니다.",
          assign: "I'll take care of, be in charge of, ~ will ~, Who wants to처럼 누가 무엇을 할지 정하고 있습니다.",
          present: "Today, I'd like to share, To sum up, Thank you for listening, First처럼 발표의 시작·순서·마무리를 알리고 있습니다.",
        };
        var L = R.pick(LINES);
        var r = L[1];
        var wrongKeys = R.sample(ROLE_WRONG[r], 3);
        var reason = {};
        wrongKeys.forEach(function (k) { reason[ROLE[k]] = '고른 역할(' + ROLE[k] + ')과 맞지 않습니다. ' + HINT[r]; });
        var pick = R.choices(ROLE[r], wrongKeys.map(function (k) { return ROLE[k]; }));
        return {
          type: 'choice', concept: ROLE_CONCEPT[r],
          q: '토의에서 다음 말은 어떤 역할을 합니까?\n\n' + L[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === ROLE[r] ? '' : reason[c] || ''; }),
          explain: HINT[r] + ' → **' + ROLE[r] + '**',
        };
      },
    },
  ],

  vocab: [
    { w: 'discuss', m: '토의하다, 논의하다', ex: 'We discussed the problem for an hour.', exm: '우리는 한 시간 동안 그 문제를 논의했다.' },
    { w: 'solution', m: '해결책', ex: 'We need a solution that everyone can accept.', exm: '우리는 모두가 받아들일 수 있는 해결책이 필요하다.' },
    { w: 'suggest', m: '제안하다', ex: 'I suggest that we take a short break.', exm: '잠깐 쉬자고 제안합니다.' },
    { w: 'compromise', m: '타협; 타협하다', ex: 'After a long talk, we reached a compromise.', exm: '긴 대화 끝에 우리는 타협에 이르렀다.' },
    { w: 'agreement', m: '합의, 동의', ex: 'The group finally came to an agreement.', exm: '모둠은 마침내 합의에 이르렀다.' },
    { w: 'disagree', m: '의견이 다르다, 동의하지 않다', ex: 'It is okay to disagree if you explain why.', exm: '이유를 설명한다면 의견이 달라도 괜찮다.' },
    { w: 'opinion', m: '의견', ex: 'Everyone shared an opinion about the plan.', exm: '모두가 그 계획에 대한 의견을 나누었다.' },
    { w: 'role', m: '역할', ex: 'Each member has a different role in the project.', exm: '구성원마다 프로젝트에서 맡은 역할이 다르다.' },
    { w: 'in charge of', m: '~을 맡은, ~의 책임을 진', ex: 'Seojun is in charge of the music.', exm: '서준이가 음악을 맡았다.' },
    { w: 'volunteer', m: '자원봉사자; 자원하다', ex: 'We need two more volunteers for the event.', exm: '행사에 자원봉사자가 두 명 더 필요하다.' },
    { w: 'budget', m: '예산', ex: 'Our club has a small budget this semester.', exm: '우리 동아리는 이번 학기 예산이 적다.' },
    { w: 'afford', m: '(비용을) 감당할 여유가 있다', ex: 'Our class cannot afford an expensive machine.', exm: '우리 반은 비싼 기계를 살 여유가 없다.' },
    { w: 'summarize', m: '요약하다', ex: 'Please summarize the main points of the meeting.', exm: '회의의 요점을 요약해 주세요.' },
    { w: 'cooperate', m: '협력하다', ex: 'We cooperated to clean the whole park.', exm: '우리는 협력해서 공원 전체를 청소했다.' },
    { w: 'interrupt', m: '(말을) 끼어들어 방해하다', ex: 'Sorry to interrupt, but can I add something?', exm: '말씀 중에 죄송하지만, 하나 덧붙여도 될까요?' },
  ],
});
})();
