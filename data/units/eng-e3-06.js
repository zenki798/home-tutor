/* 3학년 영어 · 행동을 지시하는 말
 * Stand up. 같은 지시하는 말, please 로 공손하게 말하기, 교실 지시, Okay./All right. 로 대답하기 */
(function () {
  // 손을 든 사람 (막대 그림)
  var RAISE = '<svg viewBox="0 0 240 200"><g fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round">' +
    '<circle cx="120" cy="42" r="18" fill="var(--fig-1)"/>' +
    '<line x1="120" y1="60" x2="120" y2="125"/>' +
    '<line x1="120" y1="125" x2="100" y2="180"/><line x1="120" y1="125" x2="140" y2="180"/>' +
    '<line x1="120" y1="78" x2="95" y2="112"/><line x1="120" y1="78" x2="150" y2="18"/></g></svg>';
  // 의자에 앉은 사람 (막대 그림)
  var SIT = '<svg viewBox="0 0 240 200"><g fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round">' +
    '<line x1="150" y1="60" x2="150" y2="185"/><line x1="95" y1="125" x2="150" y2="125"/><line x1="95" y1="125" x2="95" y2="185"/>' +
    '<circle cx="130" cy="40" r="18" fill="var(--fig-1)"/>' +
    '<line x1="130" y1="58" x2="133" y2="118"/>' +
    '<line x1="133" y1="118" x2="85" y2="118"/><line x1="85" y1="118" x2="85" y2="180"/>' +
    '<line x1="131" y1="75" x2="105" y2="105"/></g></svg>';

  // 생성기용 지시: [영어, 뜻]
  var CMDS = [
    ['Stand up.', '일어서세요.', 'stand(서다) + up(위로)'], ['Sit down.', '앉으세요.', 'sit(앉다) + down(아래로)'],
    ['Open the door.', '문을 여세요.', 'open(열다) + the door(문)'], ['Close the door.', '문을 닫으세요.', 'close(닫다) + the door(문)'],
    ['Open the window.', '창문을 여세요.', 'open(열다) + the window(창문)'], ['Close the window.', '창문을 닫으세요.', 'close(닫다) + the window(창문)'],
    ['Open your book.', '책을 펴세요.', 'open(펴다) + your book(네 책)'], ['Close your book.', '책을 덮으세요.', 'close(덮다) + your book(네 책)'],
    ['Look at the board.', '칠판을 보세요.', 'look at(~을 보다) + the board(칠판)'], ['Raise your hand.', '손을 드세요.', 'raise(들어 올리다) + your hand(네 손)'],
    ['Line up.', '줄을 서세요.', 'line(줄) + up'], ['Come here.', '이리 오세요.', 'come(오다) + here(여기로)'],
  ];

  Tutor.registerUnit({
    id: 'eng-e3-06',
    course: 'eng-e3',
    title: '행동을 지시하는 말',
    summary: 'Stand up.처럼 행동을 지시하는 말과 please를 붙인 공손한 말을 익히고, 교실에서 자주 듣는 지시를 알아들어요.',
    goals: [
      '행동을 지시하는 말을 듣고 알맞게 움직일 수 있어요.',
      'please를 붙여 공손하게 지시하는 말을 할 수 있어요.',
      '교실에서 자주 듣는 지시를 알아듣고 Okay.나 All right.로 대답할 수 있어요.',
    ],
    standards: [],

    concepts: [
      {
        title: '행동을 지시하는 말',
        body: '다른 사람에게 "이렇게 하세요"라고 말할 때는 **행동을 나타내는 낱말**로 문장을 시작해요.\n\n| 영어 | 뜻 |\n|---|---|\n| **Stand** up. | 일어서세요. |\n| **Sit** down. | 앉으세요. |\n| **Come** here. | 이리 오세요. |\n\nStand up.과 Sit down.은 서로 반대되는 짝이에요. up은 "위로", down은 "아래로"라는 느낌이 있어서 일어설 때는 up, 앉을 때는 down을 써요.\n\n> 💡 지시하는 말에는 **You**(너는)를 따로 말하지 않아요. 듣는 사람에게 바로 말하는 것이라서 행동 낱말부터 시작해요.',
        easy: '몸으로 기억해 보세요. "Stand up!" 하면서 의자에서 일어나고, "Sit down!" 하면서 다시 앉아요.\n\nup은 몸이 위로 올라가고, down은 몸이 아래로 내려가요. 몇 번 따라 하면 소리만 들어도 몸이 먼저 움직일 거예요.',
        fig: { type: 'svg', svg: SIT, alt: '의자에 앉아 있는 사람 그림' },
        check: {
          type: 'choice',
          q: '"앉으세요."를 영어로 바르게 말한 것은 무엇일까요?',
          choices: ['Sit down.', 'Stand up.', 'Come here.'],
          answer: 0,
          why: ['', 'Stand up.은 "일어서세요."예요. 앉을 때와 반대예요.', 'Come here.는 "이리 오세요."예요.'],
          explain: '앉으라고 할 때는 Sit down.이라고 해요. 몸이 아래로(down) 내려가지요.',
        },
      },
      {
        title: '무엇을 열고 닫을까: open과 close',
        body: '**open**은 "열다, 펴다", **close**는 "닫다, 덮다"예요. 뒤에 무엇을 열고 닫는지 말해요.\n\n| 영어 | 뜻 |\n|---|---|\n| **Open** the door. | 문을 여세요. |\n| **Close** the door. | 문을 닫으세요. |\n| **Open** the window. | 창문을 여세요. |\n| **Open** your book. | 책을 펴세요. |\n| **Close** your book. | 책을 덮으세요. |\n\n책은 "연다"보다 "편다", "닫는다"보다 "덮는다"고 하지만 영어로는 똑같이 open과 close를 써요.\n\n> 💡 **your**는 "너의"라는 뜻이에요. Close your book.은 "(네) 책을 덮으세요."예요.',
        easy: '문을 손으로 여는 흉내를 내면서 "Open!", 닫는 흉내를 내면서 "Close!" 해 보세요.\n\n책도 똑같아요. 책을 펴면서 "Open your book.", 덮으면서 "Close your book." 하고 말해 보세요. 문이든 창문이든 책이든 여는 것은 open, 닫는 것은 close예요.',
        check: {
          type: 'ox',
          q: '**Close your book.**은 "책을 펴세요."라는 뜻이에요.',
          answer: false,
          explain: 'close는 "닫다, 덮다"예요. Close your book.은 "책을 덮으세요."이고, 책을 펴라고 할 때는 Open your book.이라고 해요.',
        },
      },
      {
        title: 'please를 붙여 공손하게',
        body: '지시하는 말에 **please**를 붙이면 "~해 주세요"처럼 부드럽고 공손한 말이 돼요.\n\n- Open the window, **please**. (창문을 열어 주세요.)\n- **Please** open the window. (창문을 열어 주세요.)\n\nplease는 문장 **끝**에 붙여도 되고 **맨 앞**에 붙여도 돼요. 끝에 붙일 때는 please 앞에 쉼표(,)를 찍어요.\n\n> 💡 친구나 가족에게 무엇을 부탁할 때도 please를 붙이면 훨씬 듣기 좋아요.',
        easy: 'please는 말에 붙이는 "마법의 낱말"이에요.\n\n"Open the window."만 말하면 조금 딱딱하게 들려요. 여기에 please를 붙여 "Open the window, please."라고 하면 "창문 좀 열어 줄래요?"처럼 부드러워져요.',
        check: {
          type: 'choice',
          q: '창문을 열어 달라고 **공손하게** 말한 것은 무엇일까요?',
          choices: ['Open the window, please.', 'Open the window.', 'Close the window, please.'],
          answer: 0,
          why: ['', '뜻은 맞지만 please가 없어서 공손함이 덜해요.', 'close는 "닫다"예요. 창문을 닫아 달라는 말이에요.'],
          explain: 'please를 붙이면 공손한 말이 돼요. 그래서 Open the window, please.가 알맞아요.',
        },
      },
      {
        title: '교실에서 자주 듣는 지시',
        body: '선생님이 수업 시간에 자주 하는 말이에요. 듣고 바로 움직일 수 있게 익혀 두세요.\n\n| 영어 | 뜻 |\n|---|---|\n| **Look** at the board. | 칠판을 보세요. |\n| **Raise** your hand. | 손을 드세요. |\n| **Line** up. | 줄을 서세요. |\n| **Listen** carefully. | 잘 들으세요. |\n| **Come** here. | 이리 오세요. |\n\nLook at the board.에서 **look at**은 "~을 보다"예요. 보는 대상 앞에 at을 꼭 써요.\n\n> ⚠️ Line up.과 Stand up.은 둘 다 up으로 끝나지만 뜻이 달라요. Line up.은 "줄을 서세요.", Stand up.은 "일어서세요."예요.',
        easy: '교실 장면을 떠올려 보세요.\n\n- 선생님이 칠판을 가리켜요 → Look at the board.\n- 질문이 있는 사람은 손을 들어요 → Raise your hand.\n- 급식실에 가기 전에 줄을 서요 → Line up.',
        fig: { type: 'svg', svg: RAISE, alt: '한 손을 높이 든 사람 그림' },
        check: {
          type: 'choice',
          q: '손을 들라고 할 때 하는 말은 무엇일까요?',
          choices: ['Raise your hand.', 'Line up.', 'Look at the board.'],
          answer: 0,
          why: ['', 'Line up.은 "줄을 서세요."예요.', 'Look at the board.는 "칠판을 보세요."예요.'],
          explain: 'raise는 "들어 올리다", hand는 "손"이에요. Raise your hand.는 "손을 드세요."예요.',
        },
      },
      {
        title: '지시에 대답하기',
        body: '누군가 지시하거나 부탁하면 "알겠어요"라고 대답하고 그대로 행동해요.\n\n- **Okay.** (알겠어요.)\n- **All right.** (좋아요, 알겠어요.)\n- **Sure.** (물론이죠.)\n\n예)\nA: Close the door, please.\nB: **Okay.** (문을 닫는다.)\n\n> 💡 Okay.와 All right.는 뜻이 거의 같아서 어느 것을 써도 돼요. OK.라고 써도 같은 말이에요.',
        easy: '지시를 들으면 "네, 알겠어요!" 하고 대답하는 것과 같아요.\n\n선생님이 "Line up, please." 하시면 "Okay." 하고 줄을 서면 돼요. 짧은 대답 하나면 충분해요.',
        check: {
          type: 'choice',
          q: 'A: Sit down, please.\nB: [[대답]]\n\n빈칸에 알맞은 대답은 무엇일까요?',
          choices: ['All right.', 'Goodbye.', 'Stand up.'],
          answer: 0,
          why: ['', 'Goodbye.는 헤어질 때 하는 인사예요.', 'Stand up.은 대답이 아니라 "일어서세요."라는 지시예요.'],
          explain: '지시를 들으면 Okay.나 All right.로 "알겠어요"라고 대답해요.',
        },
      },
    ],

    examples: [
      {
        q: '교실이 너무 더워요. 친구에게 창문을 열어 달라고 **공손하게** 부탁하는 말을 만들어 보세요.',
        steps: [
          '"열다"는 open, "창문"은 the window예요. 지시하는 말은 행동 낱말로 시작하니 Open the window.가 돼요.',
          '공손하게 말하려면 please를 붙여요. 끝에 붙일 때는 앞에 쉼표를 찍어요.',
          '그래서 Open the window, please.예요. Please open the window.라고 해도 좋아요.',
        ],
        answer: '**Open the window, please.** (또는 **Please open the window.**)',
      },
      {
        q: '선생님이 "Look at the board, please."라고 하셨어요. 무엇을 하고, 뭐라고 대답하면 될까요?',
        steps: [
          'look at은 "~을 보다", the board는 "칠판"이에요. 칠판을 보라는 말이에요.',
          'please가 붙어서 "칠판을 봐 주세요."처럼 공손한 말이에요.',
          '"알겠어요"라는 뜻으로 Okay.나 All right.라고 대답하고 칠판을 봐요.',
        ],
        answer: '칠판을 보고 **Okay.** 또는 **All right.**라고 대답해요.',
      },
    ],

    terms: [
      { term: '지시하는 말', def: '다른 사람에게 어떤 행동을 하라고 하는 말이에요. 행동을 나타내는 낱말로 시작해요. 예: Stand up.' },
      { term: 'please', def: '"~해 주세요"처럼 말을 공손하게 만들어 주는 낱말이에요. 문장 끝이나 맨 앞에 붙여요. 예: Sit down, please.' },
      { term: 'open / close', def: 'open은 "열다, 펴다", close는 "닫다, 덮다"예요. 예: Open the door. / Close your book.' },
      { term: 'up / down', def: 'up은 "위로", down은 "아래로"라는 느낌의 낱말이에요. 예: Stand up. / Sit down.' },
      { term: 'Okay. / All right.', def: '지시나 부탁을 듣고 "알겠어요"라고 대답하는 말이에요.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '"일어서세요."를 영어로 바르게 말한 것은 무엇일까요?',
        choices: ['Stand up.', 'Sit down.', 'Line up.', 'Come here.'],
        answer: 0,
        why: [
          '',
          'Sit down.은 "앉으세요."예요. 일어서는 것과 반대예요.',
          'Line up.은 "줄을 서세요."예요. up으로 끝나는 것은 같지만 뜻이 달라요.',
          'Come here.는 "이리 오세요."예요.',
        ],
        explain: '일어서라고 할 때는 Stand up.이라고 해요. 몸이 위로(up) 올라가지요.',
      },
      {
        id: 'p2', level: 1, type: 'short', concept: 0,
        q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nSit [[down]]. (앉으세요.)',
        answer: ['down'],
        wrong: [{ a: 'up', why: 'up은 "위로"라는 느낌이에요. 앉을 때는 몸이 아래로 내려가니 down을 써요.' }],
        explain: '앉으라고 할 때는 Sit down.이라고 해요. down은 "아래로"라는 느낌이에요.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 3,
        q: '그림 속 친구는 선생님의 어떤 말을 듣고 움직였을까요?',
        fig: { type: 'svg', svg: RAISE, alt: '한 손을 높이 든 사람 그림' },
        choices: ['Raise your hand.', 'Sit down.', 'Close your book.', 'Line up.'],
        answer: 0,
        why: [
          '',
          'Sit down.은 "앉으세요."예요. 그림의 친구는 서서 손을 들고 있어요.',
          'Close your book.은 "책을 덮으세요."예요. 그림에는 책이 없어요.',
          'Line up.은 "줄을 서세요."예요. 그림의 친구는 손을 들고 있어요.',
        ],
        explain: '그림의 친구는 손을 높이 들고 있어요. "손을 드세요."는 Raise your hand.예요.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: '**Open the door.**는 "문을 닫으세요."라는 뜻이에요.',
        answer: false,
        explain: 'open은 "열다"예요. Open the door.는 "문을 여세요."이고, 문을 닫으라고 할 때는 Close the door.라고 해요.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '**Open the window, please.**의 뜻으로 알맞은 것은 무엇일까요?',
        choices: ['창문을 열어 주세요.', '창문을 닫아 주세요.', '문을 열어 주세요.', '창밖을 보세요.'],
        answer: 0,
        why: [
          '',
          'open은 "열다"예요. "닫다"는 close예요.',
          'window는 "창문"이에요. "문"은 door예요.',
          '창밖을 보라는 말이 아니에요. open은 "열다"예요.',
        ],
        explain: 'open은 "열다", window는 "창문"이에요. please가 붙어서 "창문을 열어 주세요."라는 공손한 말이에요.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 4,
        q: '선생님: Line up, please.\n\n알맞은 대답은 무엇일까요?',
        choices: ['Okay.', 'Goodbye.', 'Nice to meet you.', 'Sit down.'],
        answer: 0,
        why: [
          '',
          'Goodbye.는 헤어질 때 하는 인사예요.',
          'Nice to meet you.는 처음 만났을 때 하는 인사예요.',
          'Sit down.은 대답이 아니라 "앉으세요."라는 지시예요.',
        ],
        explain: '지시를 들으면 Okay.나 All right.로 "알겠어요"라고 대답하고 줄을 서요.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '줄을 서라고 할 때 선생님이 하는 말은 무엇일까요?',
        choices: ['Line up.', 'Stand up.', 'Look at the board.', 'Come here.'],
        answer: 0,
        why: [
          '',
          'Stand up.은 "일어서세요."예요. up으로 끝나는 것은 같지만 뜻이 달라요.',
          'Look at the board.는 "칠판을 보세요."예요.',
          'Come here.는 "이리 오세요."예요.',
        ],
        explain: 'line은 "줄"이에요. Line up.은 "줄을 서세요."예요.',
      },
      {
        id: 'p8', level: 2, type: 'order', concept: 2,
        q: '낱말을 순서대로 놓아 "문을 열어 주세요."라는 공손한 말을 만드세요.',
        choices: ['Open', 'the', 'door,', 'please.'],
        answer: [0, 1, 2, 3],
        hint: '지시하는 말은 행동 낱말로 시작해요. 쉼표가 붙은 낱말을 잘 보세요.',
        explain: '행동 낱말 Open으로 시작하고, 무엇을 여는지(the door) 말한 다음, 쉼표 뒤에 please를 붙여요. Open the door, please.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 2,
        q: '교실이 추워요. 친구에게 창문을 닫아 달라고 **공손하게** 말하려면 어떻게 말할까요?',
        choices: ['Close the window, please.', 'Open the window, please.', 'Close the window.', 'Close your book, please.'],
        answer: 0,
        why: [
          '',
          'open은 "열다"예요. 추울 때는 창문을 닫아야 하지요.',
          '뜻은 맞지만 please가 없어서 공손함이 덜해요.',
          'your book은 "(네) 책"이에요. 닫아야 하는 것은 창문(the window)이에요.',
        ],
        hint: '"닫다"와 "창문"을 영어로 떠올리고, 공손하게 만드는 낱말을 붙여 보세요.',
        explain: '"닫다"는 close, "창문"은 the window예요. please를 붙이면 공손한 말이 되어 Close the window, please.예요.',
      },
      {
        id: 'p10', level: 2, type: 'short', concept: 3,
        q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nLook [[at]] the board. (칠판을 보세요.)',
        answer: ['at'],
        hint: '"~을 보다"라고 할 때 look 뒤에 붙는 짧은 낱말이에요.',
        wrong: [
          { a: 'on', why: '"~을 보다"는 look at이에요. 보는 대상 앞에 at을 써요.' },
          { a: 'the', why: 'the는 이미 board 앞에 있어요. look 뒤에는 at이 와요.' },
        ],
        explain: '"~을 보다"는 look at이에요. 그래서 Look at the board.예요.',
      },
      {
        id: 'p11', level: 2, type: 'short', concept: 1,
        q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nClose [[your]] book. ((네) 책을 덮으세요.)',
        answer: ['your'],
        hint: '"너의"라는 뜻의 낱말이에요.',
        wrong: [
          { a: 'you', why: 'you는 "너"예요. "너의 책"이라고 할 때는 your를 써요.' },
          { a: 'the', why: 'Close the book.도 영어 문장은 되지만, 이 문제는 "(네) 책"이라고 했어요. "너의"는 your예요.' },
        ],
        explain: '"너의"는 your예요. Close your book.은 "책을 덮으세요."라는 말이에요.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 4,
        q: 'A: It\'s cold. (추워요.) [[지시]]\nB: Okay.\n\n빈칸에 들어갈 A의 말로 가장 알맞은 것은 무엇일까요?',
        choices: ['Close the window, please.', 'Open the window, please.', 'Raise your hand, please.', 'Look at the board, please.'],
        answer: 0,
        why: [
          '',
          '추운데 창문을 열면 더 추워져요. open은 "열다"예요.',
          '손을 드는 것은 추운 것과 관계가 없어요.',
          '칠판을 보는 것은 추운 것과 관계가 없어요.',
        ],
        hint: '추울 때 창문을 어떻게 해 달라고 부탁할지 생각해 보세요.',
        explain: '추우니까 창문을 닫아 달라고 부탁하는 Close the window, please.가 알맞아요. B는 Okay.로 "알겠어요"라고 대답했어요.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 3,
        q: '영어 지시와 뜻이 **바르지 않게** 짝지어진 것은 무엇일까요?',
        choices: ['Sit down. – 일어서세요.', 'Line up. – 줄을 서세요.', 'Come here. – 이리 오세요.', 'Look at the board. – 칠판을 보세요.'],
        answer: 0,
        why: [
          '',
          '바르게 짝지어졌어요. Line up.은 "줄을 서세요."예요.',
          '바르게 짝지어졌어요. Come here.는 "이리 오세요."예요.',
          '바르게 짝지어졌어요. Look at the board.는 "칠판을 보세요."예요.',
        ],
        hint: '하나씩 뜻을 확인해 보세요. up과 down을 잘 보세요.',
        explain: 'Sit down.은 "앉으세요."예요. "일어서세요."는 Stand up.이에요. 나머지는 모두 바르게 짝지어졌어요.',
      },
      {
        id: 'a3', level: 3, type: 'short', concept: 1,
        q: '낱말 하나만 바꾸어 반대 뜻의 지시를 만들려고 해요. 빈칸에 알맞은 낱말을 쓰세요.\n\nOpen the door. (문을 여세요.)\n→ [[낱말]] the door. (문을 닫으세요.)',
        answer: ['close', 'shut'],
        hint: 'open과 반대되는 행동 낱말이에요.',
        wrong: [
          { a: 'closed', why: '지시하는 말은 행동 낱말의 기본 모양으로 시작해요. close에 아무것도 붙이지 않아요.' },
          { a: 'down', why: 'down은 Sit down.처럼 쓰는 말이에요. "닫다"는 close예요.' },
        ],
        explain: 'open(열다)의 반대는 close(닫다)예요. 그래서 Close the door.예요. (shut도 "닫다"라는 뜻이라 Shut the door.라고 해도 돼요.)',
      },
      {
        id: 'a4', level: 3, type: 'order', concept: 2,
        q: '낱말을 순서대로 놓아 **please를 맨 앞에 쓴** 공손한 말을 만드세요. (칠판을 봐 주세요.)',
        choices: ['look', 'Please', 'the board.', 'at'],
        answer: [1, 0, 3, 2],
        hint: '대문자로 시작하는 낱말이 문장의 맨 앞이에요.',
        explain: 'please를 맨 앞에 쓰면 Please look at the board.가 돼요. 맨 앞 낱말은 대문자로 시작하고, look at the board는 그대로 이어져요.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 3,
        q: '다음 글을 읽고 물음에 답하세요.\n\nTeacher: Good morning, class. Stand up, please.\nStudents: Okay.\nTeacher: Look at the board. Raise your hand.\n\n선생님이 **맨 처음에** 하라고 한 것은 무엇일까요?',
        choices: ['일어서기', '칠판 보기', '손 들기', '줄 서기'],
        answer: 0,
        why: [
          '',
          'Look at the board.는 두 번째 지시예요.',
          'Raise your hand.는 마지막 지시예요.',
          '줄을 서라는 말(Line up.)은 글에 없어요.',
        ],
        hint: 'Good morning 다음에 나온 지시를 찾아보세요.',
        explain: '선생님은 인사를 한 뒤 맨 처음에 Stand up, please.(일어서 주세요.)라고 했어요. 그다음에 칠판을 보라고(Look at the board.), 마지막으로 손을 들라고(Raise your hand.) 했어요.',
      },
    ],

    deeper: [
      {
        title: '지시하는 말에는 왜 "너는"이 없을까?',
        body: '우리말로도 "앉으세요."라고 하지 "너는 앉으세요."라고는 잘 하지 않지요. 지금 내 앞에 있는 사람에게 하는 말이라서 누구에게 하는 말인지 다 알기 때문이에요.\n\n영어도 같아요. Sit down.에는 You(너는)가 없어도 듣는 사람에게 하는 말이라는 것을 모두 알아요.\n\n4학년에서는 **Don\'t** run.(뛰지 마세요.)처럼 "하지 말라"고 하는 말과, **Let\'s** play.(같이 놀자.)처럼 "함께 하자"고 하는 말도 배워요. 이 말들도 행동 낱말을 중심으로 만들어져요.',
      },
    ],

    faq: [
      {
        q: 'please는 앞에 붙여요, 뒤에 붙여요?',
        a: '둘 다 돼요. Please open the door.처럼 맨 앞에 붙여도 되고, Open the door, please.처럼 끝에 붙여도 돼요. 끝에 붙일 때는 please 앞에 쉼표(,)를 찍어요.',
      },
      {
        q: 'Open the door.랑 Open your book.에서 the랑 your는 뭐가 달라요?',
        a: 'the는 "그"처럼 서로 알고 있는 것을 가리킬 때 써요. 교실에서 "그 문"이라고 하면 어느 문인지 서로 다 아니까 the door라고 해요.\n\nyour는 "너의"라는 뜻이에요. 책은 사람마다 따로 있으니 "네 책"이라는 뜻으로 your book이라고 해요.',
      },
      {
        q: '지시를 들으면 꼭 대답해야 해요?',
        a: '꼭 말로 대답하지 않아도 지시대로 움직이면 돼요. 하지만 Okay.나 All right.라고 짧게 대답하면 "잘 알아들었어요"라는 뜻이 전해져서 더 좋아요.',
      },
    ],

    mistakes: [
      'Stand up.과 Sit down.을 반대로 쓰는 실수 — 몸이 위로 올라가면 up(일어서기), 아래로 내려가면 down(앉기)이에요.',
      'Line up.을 "일어서세요."로 알아듣는 실수 — up으로 끝나는 것은 같지만 Line up.은 "줄을 서세요."예요.',
      'please를 끝에 붙일 때 쉼표를 빠뜨리는 실수 — Open the door, please.처럼 please 앞에 쉼표를 찍어요.',
    ],

    gens: [
      {
        id: 'command-meaning',
        level: 1,
        title: '지시하는 말과 뜻 짝짓기',
        make: function (R) {
          var i = R.int(0, CMDS.length - 1);
          var c = CMDS[i];
          var concept = i <= 1 ? 0 : (i <= 7 ? 1 : 3);
          var others = R.shuffle(CMDS.filter(function (x, k) { return k !== i; }));
          var meanOf = {};
          var engOf = {};
          CMDS.forEach(function (x) { meanOf[x[0]] = x[1]; engOf[x[1]] = x[0]; });
          if (R.bool()) {
            // 뜻 → 영어
            var pick = R.choices(c[0], others.map(function (x) { return x[0]; }));
            return {
              type: 'choice', concept: concept,
              q: '"' + c[1] + '"를 영어로 바르게 말한 것은 무엇일까요?',
              choices: pick.choices,
              answer: pick.answer,
              why: pick.choices.map(function (x) { return x === c[0] ? '' : '이 말은 "' + meanOf[x] + '"라는 뜻이에요.'; }),
              explain: '"' + c[1] + '" → **' + c[0] + '**\n\n' + c[2],
            };
          }
          // 영어 → 뜻
          var pick2 = R.choices(c[1], others.map(function (x) { return x[1]; }));
          return {
            type: 'choice', concept: concept,
            q: '**' + c[0] + '**의 뜻으로 알맞은 것은 무엇일까요?',
            choices: pick2.choices,
            answer: pick2.answer,
            why: pick2.choices.map(function (x) { return x === c[1] ? '' : '이 뜻의 영어 지시: **' + engOf[x] + '**'; }),
            explain: '**' + c[0] + '** → "' + c[1] + '"\n\n' + c[2],
          };
        },
      },
    ],

    vocab: [
      { w: 'stand', m: '서다', ex: 'Please **stand** up.', exm: '일어서 주세요.' },
      { w: 'sit', m: '앉다', ex: '**Sit** down, please.', exm: '앉아 주세요.' },
      { w: 'open', m: '열다, 펴다', ex: '**Open** your book.', exm: '책을 펴세요.' },
      { w: 'close', m: '닫다, 덮다', ex: '**Close** the door, please.', exm: '문을 닫아 주세요.' },
      { w: 'door', m: '문', ex: 'Open the **door**.', exm: '문을 여세요.' },
      { w: 'window', m: '창문', ex: 'Close the **window**, please.', exm: '창문을 닫아 주세요.' },
      { w: 'book', m: '책', ex: 'Close your **book**.', exm: '책을 덮으세요.' },
      { w: 'board', m: '칠판', ex: 'Look at the **board**.', exm: '칠판을 보세요.' },
      { w: 'hand', m: '손', ex: 'Raise your **hand**.', exm: '손을 드세요.' },
      { w: 'raise', m: '들어 올리다', ex: 'Please **raise** your hand.', exm: '손을 들어 주세요.' },
      { w: 'look', m: '보다', ex: '**Look** at the board.', exm: '칠판을 보세요.' },
      { w: 'line', m: '줄', ex: '**Line** up, please.', exm: '줄을 서 주세요.' },
      { w: 'come', m: '오다', ex: '**Come** here, please.', exm: '이리 와 주세요.' },
      { w: 'please', m: '~해 주세요 (공손하게 말할 때)', ex: 'Sit down, **please**.', exm: '앉아 주세요.' },
    ],
  });
})();
