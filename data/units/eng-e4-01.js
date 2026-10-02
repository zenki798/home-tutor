/* 4학년 영어 · 기분 묻고 답하기 */
(function () {
  // 얼굴 그림: 기분마다 눈·입 모양을 다르게 그린다 (색은 화면 테마를 따른다)
  function face(kind) {
    var cx = 100;
    var s = '<circle cx="' + cx + '" cy="62" r="44" fill="var(--fig-1)" stroke="currentColor" stroke-width="3"/>';
    var dots = '<circle cx="84" cy="54" r="4" fill="currentColor"/><circle cx="116" cy="54" r="4" fill="currentColor"/>';
    if (kind === 'happy') {
      s += dots + '<path d="M78 72 Q100 96 122 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
    } else if (kind === 'sad') {
      s += dots + '<path d="M80 88 Q100 70 120 88" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
        '<path d="M116 62 Q112 70 116 74 Q120 70 116 62 Z" fill="var(--fig-3)" stroke="currentColor" stroke-width="1.5"/>';
    } else if (kind === 'angry') {
      s += '<line x1="74" y1="40" x2="92" y2="48" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
        '<line x1="126" y1="40" x2="108" y2="48" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' + dots +
        '<path d="M84 84 Q100 74 116 84" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
    } else if (kind === 'sleepy') {
      s += '<path d="M76 54 Q84 60 92 54" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
        '<path d="M108 54 Q116 60 124 54" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
        '<ellipse cx="100" cy="80" rx="6" ry="8" fill="none" stroke="currentColor" stroke-width="3"/>' +
        '<text x="146" y="30" font-size="18" font-weight="bold" fill="currentColor">Z</text><text x="162" y="18" font-size="13" font-weight="bold" fill="currentColor">z</text>';
    } else if (kind === 'scared') {
      s += '<path d="M74 38 Q84 30 94 38" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
        '<path d="M106 38 Q116 30 126 38" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
        '<circle cx="84" cy="54" r="8" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="116" cy="54" r="8" fill="none" stroke="currentColor" stroke-width="2.5"/>' +
        '<circle cx="84" cy="55" r="3" fill="currentColor"/><circle cx="116" cy="55" r="3" fill="currentColor"/>' +
        '<path d="M82 82 Q86 76 91 82 Q96 88 100 82 Q104 76 109 82 Q114 88 118 82" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
    }
    return '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">' + s + '</svg>';
  }

  Tutor.registerUnit({
    id: 'eng-e4-01',
    course: 'eng-e4',
    title: '기분 묻고 답하기',
    summary: 'How are you?로 기분을 묻고 I\'m great.처럼 내 기분을 말하며 친구의 기분에 알맞게 반응해요.',
    goals: [
      '기분을 나타내는 낱말(happy, sad, angry, tired, sleepy, scared)의 뜻을 알 수 있어요.',
      'How are you? 하고 기분을 묻고, I\'m great. 처럼 내 기분을 말할 수 있어요.',
      'Are you sad? 같은 질문에 Yes, I am. 또는 No, I\'m not. 하고 답할 수 있어요.',
      '친구의 기분에 맞게 That\'s great! 또는 That\'s too bad. 하고 반응할 수 있어요.',
    ],
    standards: ['[4영02-07]', '[4영01-03]', '[4영02-01]'],

    concepts: [
      {
        title: '기분을 나타내는 낱말',
        body: '**기분**은 지금 마음이 어떤지를 말해요. 영어에는 기분을 나타내는 낱말이 많아요.\n\n| 낱말 | 뜻 |\n|---|---|\n| **happy** | 행복한, 기쁜 |\n| **sad** | 슬픈 |\n| **angry** | 화가 난 |\n| **tired** | 피곤한 |\n| **sleepy** | 졸린 |\n| **scared** | 무서운, 겁이 난 |\n\n내 기분을 말할 때는 **I\'m** 다음에 기분 낱말을 써요.\n- I\'m **happy**. 나는 기뻐요.\n- I\'m **sleepy**. 나는 졸려요.\n\n> 💡 tired 는 많이 움직여서 몸이 지친 것, sleepy 는 잠이 와서 눈이 감기는 것이에요.',
        easy: '얼굴 표정을 떠올려 보세요. 활짝 웃는 얼굴은 happy, 눈물이 나는 얼굴은 sad, 눈썹이 올라가고 씩씩대는 얼굴은 angry 예요.\n\n하품하며 눈이 감기는 얼굴은 sleepy, 달리기를 하고 나서 축 늘어진 얼굴은 tired, 깜짝 놀라 떨리는 얼굴은 scared 예요.\n\n거울을 보고 표정을 지으면서 낱말을 소리 내어 말해 보세요.',
        fig: { type: 'svg', alt: '눈이 감기고 하품을 하며 머리 위에 Z 글자가 있는 얼굴', svg: face('sleepy') },
        check: {
          type: 'choice',
          q: '다음 낱말의 뜻으로 알맞은 것을 고르세요.\n\n**sleepy**',
          choices: ['졸린', '피곤한', '무서운'],
          answer: 0,
          why: ['', '"피곤한"은 tired 예요. sleepy 는 잠이 오는 것이에요.', '"무서운"은 scared 예요.'],
          explain: 'sleepy 는 "졸린"이에요. I\'m sleepy. 는 "나는 졸려요."라는 뜻이에요.',
        },
      },
      {
        title: 'How are you? 기분 묻고 답하기',
        body: '친구에게 기분이나 안부를 물을 때 **How are you?** 하고 말해요. "기분이 어때?", "잘 지내?" 하는 뜻이에요.\n\n대답할 때는 **I\'m** 다음에 지금 기분을 넣어요.\n- I\'m **great**. 아주 좋아요.\n- I\'m **good**. 좋아요.\n- I\'m **fine**, thank you. 잘 지내요, 고마워요.\n- I\'m **tired**. 피곤해요.\n\n**I\'m** 은 **I am** 을 줄인 말이에요. 둘 다 "나는 ~이에요"라는 뜻이에요.\n\n> 💡 대답한 다음 **And you?**(너는?) 하고 되물으면 더 다정한 대화가 돼요.',
        easy: '아침에 친구를 만나면 "잘 지내?" 하고 묻지요. 영어로는 How are you? 라고 해요.\n\n대답은 "나는 ○○해." 꼴이에요. I\'m 다음 빈자리에 기분 낱말 하나만 넣으면 돼요.\n- 기분이 아주 좋으면: I\'m great.\n- 그냥 괜찮으면: I\'m fine.\n- 졸리면: I\'m sleepy.',
        check: {
          type: 'choice',
          q: 'How are you? 하고 물었을 때 알맞은 대답을 고르세요.',
          choices: ['I\'m fine, thank you.', 'I\'m ten.', 'Yes, I am.'],
          answer: 0,
          why: ['', 'I\'m ten. 은 나이를 말하는 대답이에요. 기분을 말해야 해요.', 'Yes, I am. 은 Are you ~? 처럼 예/아니오로 묻는 질문의 대답이에요.'],
          explain: 'How are you? 는 기분을 묻는 말이라서 I\'m fine, thank you. 처럼 기분으로 대답해요.',
        },
      },
      {
        title: 'Are you ~? 로 묻고 답하기',
        body: '친구의 기분을 짐작해서 물을 때는 **Are you** 다음에 기분 낱말을 넣어요.\n- **Are you sad?** 너 슬프니?\n- **Are you tired?** 너 피곤하니?\n\n이 질문에는 예나 아니오로 대답해요.\n\n| 맞을 때 (예) | 아닐 때 (아니오) |\n|---|---|\n| **Yes, I am.** | **No, I\'m not.** |\n\n아니라고 대답한 다음에는 진짜 기분을 덧붙이면 좋아요.\n- Are you sad? — No, I\'m not. I\'m happy.\n\n> ⚠️ Yes 다음에는 I am, No 다음에는 I\'m not 을 써요. Yes, I\'m not. 처럼 섞지 않아요.',
        easy: '"너 슬프니?" 하고 물으면 우리말로 "응, 슬퍼." 또는 "아니, 안 슬퍼."라고 하지요.\n\n영어도 똑같아요.\n- "응" → Yes, I am.\n- "아니" → No, I\'m not.\n\nYes 는 "응", No 는 "아니"예요. 대답의 첫 낱말을 먼저 정하고 뒤를 이어 말해요.',
        check: {
          type: 'choice',
          q: 'Are you happy? 하고 물었어요. "아니"라고 대답하는 말을 고르세요.',
          choices: ['No, I\'m not.', 'Yes, I am.', 'No, I am.'],
          answer: 0,
          why: ['', 'Yes, I am. 은 "응, 맞아."예요. 아니라고 할 때는 No 로 시작해요.', 'No 다음에는 I\'m not 이 와요. No, I am. 은 앞뒤가 맞지 않아요.'],
          explain: '아니라고 할 때는 No, I\'m not. 이에요. 맞을 때는 Yes, I am. 이에요.',
        },
      },
      {
        title: '묻는 말의 억양',
        body: '**억양**은 말할 때 목소리가 올라가고 내려가는 높낮이예요.\n\nAre you ~? 처럼 **예/아니오로 답하는 질문은 끝을 올려** 말해요.\n- Are you tired? ↗\n- Are you scared? ↗\n\n기분을 알려 주는 말은 끝을 내려 말해요.\n- I\'m tired. ↘\n- I\'m fine, thank you. ↘\n\n> 💡 끝을 올리면 듣는 사람이 "나한테 묻는구나" 하고 알아차려요. 그래서 대답할 준비를 하지요.',
        easy: '우리말로 소리 내어 비교해 보세요.\n- "졸려." — 끝이 내려가요. 내 기분을 알려 주는 말이에요.\n- "졸려?" — 끝이 올라가요. 친구에게 묻는 말이에요.\n\n영어도 같아요. Are you sleepy? 를 말할 때 마지막 낱말 sleepy 에서 목소리를 쭉 올려 보세요.',
        check: {
          type: 'ox',
          q: 'Are you sleepy? 는 끝을 올려 말해요.',
          answer: true,
          explain: 'Are you sleepy? 는 Yes 나 No 로 답하는 질문이라서 끝을 올려 말해요. ↗',
        },
      },
      {
        title: '친구의 기분에 반응하기',
        body: '친구가 기분을 말하면 그 기분에 맞게 대꾸해 줘요.\n\n| 친구의 말 | 알맞은 반응 | 뜻 |\n|---|---|---|\n| I\'m happy. / I\'m great. | **That\'s great!** | 잘됐다! |\n| I\'m sad. / I\'m tired. | **That\'s too bad.** | 안됐구나. |\n\n좋은 기분에는 함께 기뻐하고, 좋지 않은 기분에는 걱정해 주는 말을 해요.\n\n> ⚠️ 친구가 I\'m sad. 하고 말했는데 That\'s great! 하고 답하면 친구가 더 속상할 수 있어요.',
        easy: '친구가 "나 오늘 기분 최고야!" 하면 "와, 잘됐다!" 하고, "나 오늘 슬퍼." 하면 "저런, 안됐다." 하지요.\n\n- 잘됐다! → That\'s great!\n- 안됐다. → That\'s too bad.\n\n친구 얼굴이 웃고 있으면 great, 웃고 있지 않으면 too bad 를 떠올려요.',
        check: {
          type: 'choice',
          q: '친구가 I\'m tired. 하고 말했어요. 알맞은 반응을 고르세요.',
          choices: ['That\'s too bad.', 'That\'s great!', 'Yes, I am.'],
          answer: 0,
          why: ['', 'That\'s great! 는 좋은 소식에 하는 말이에요. 피곤한 친구에게는 걱정하는 말을 해요.', 'Yes, I am. 은 질문에 대한 대답이에요. 친구는 묻지 않았어요.'],
          explain: '피곤한 것은 좋지 않은 기분이라서 That\'s too bad.(안됐구나.) 하고 반응해요.',
        },
      },
    ],

    examples: [
      {
        q: '대화를 읽고 빈칸에 들어갈 알맞은 낱말을 찾아보세요.\n\nA: How are you, Jia?\nB: I\'m [[great]]. I have a new bike.\nA: That\'s great!',
        steps: [
          'A의 How are you? 는 기분을 묻는 말이에요. 그러니 B는 I\'m 다음에 기분 낱말을 써요.',
          'B는 새 자전거(new bike)가 생겼다고 했어요. 기분이 좋겠지요.',
          'A도 That\'s great!(잘됐다!) 하고 기뻐했으니 좋은 기분 낱말이 알맞아요.',
        ],
        answer: 'I\'m **great**. (I\'m **happy**. 도 알맞아요.)',
      },
      {
        q: '민수는 무섭지 않고 졸려요. 친구가 Are you scared? 하고 물었어요. 민수는 어떻게 대답하면 좋을까요?',
        steps: [
          'Are you scared? 는 "너 무섭니?" 하고 묻는 말이에요. 끝을 올려 말하는 예/아니오 질문이에요.',
          '민수는 무섭지 않으니 No 로 대답해요: No, I\'m not.',
          '진짜 기분을 덧붙이면 더 좋아요. 졸리니까 I\'m sleepy. 를 이어 말해요.',
        ],
        answer: 'No, I\'m not. I\'m sleepy.',
      },
    ],

    terms: [
      { term: '기분', def: '지금 마음이 어떤지를 나타내는 상태예요. 영어로는 happy, sad, angry 같은 낱말로 말해요.' },
      { term: '억양', def: '말할 때 목소리가 올라가고 내려가는 높낮이예요. 예/아니오로 답하는 질문은 끝을 올려 말해요.' },
      { term: '줄임말', def: '두 낱말을 줄여 하나로 쓴 말이에요. 빠진 글자 자리에 작은 따옴표(\')를 찍어요. 예: I am → I\'m, That is → That\'s' },
      { term: '예/아니오 질문', def: 'Yes 나 No 로 대답하는 질문이에요. 예: Are you sad? — Yes, I am. / No, I\'m not.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '다음 낱말의 뜻으로 알맞은 것을 고르세요.\n\n**angry**',
        choices: ['화가 난', '슬픈', '무서운', '졸린'],
        answer: 0,
        why: ['', '"슬픈"은 sad 예요.', '"무서운"은 scared 예요.', '"졸린"은 sleepy 예요.'],
        explain: 'angry 는 "화가 난"이에요. I\'m angry. 는 "나는 화가 났어요."라는 뜻이에요.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
        q: '우리말 뜻에 맞는 영어 낱말을 쓰세요.\n\n피곤한',
        answer: ['tired'],
        wrong: [{ a: 'sleepy', why: 'sleepy 는 "졸린"이에요. 몸이 지쳐서 힘든 "피곤한"은 tired 예요.' }],
        explain: '"피곤한"은 tired 예요. 많이 뛰어놀고 나면 I\'m tired. 하고 말해요.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '친구의 기분을 묻는 말로 알맞은 것을 고르세요.',
        choices: ['How are you?', 'What\'s this?', 'What\'s your name?', 'How many apples?'],
        answer: 0,
        why: ['', 'What\'s this? 는 물건이 무엇인지 묻는 말이에요.', 'What\'s your name? 은 이름을 묻는 말이에요.', 'How many apples? 는 사과가 몇 개인지 묻는 말이에요.'],
        explain: 'How are you? 는 "기분이 어때?", "잘 지내?" 하고 묻는 말이에요.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 2,
        q: 'Are you sad? 하고 물었을 때, 슬프지 않다면 Yes, I am. 하고 대답해요.',
        answer: false,
        explain: '슬프지 않으면 "아니"라고 해야 하니 No, I\'m not. 하고 대답해요. Yes, I am. 은 슬플 때 하는 대답이에요.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 4,
        q: '빈칸에 들어갈 말로 알맞은 것을 고르세요.\n\nA: I\'m happy today.\nB: [[That\'s great!]]',
        choices: ['That\'s great!', 'That\'s too bad.', 'No, I\'m not.', 'Yes, I am.'],
        answer: 0,
        why: [
          '',
          'That\'s too bad. 는 슬프거나 피곤한 친구에게 하는 말이에요. A는 기분이 좋아요.',
          'No, I\'m not. 은 질문에 대한 대답이에요. A는 묻지 않았어요.',
          'Yes, I am. 은 질문에 대한 대답이에요. A는 묻지 않았어요.',
        ],
        explain: 'A가 오늘 기분이 좋다고 했으니 함께 기뻐하는 That\'s great!(잘됐다!)가 알맞아요.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'text', concept: 2,
        q: '빈칸에 알맞은 낱말을 한 개 쓰세요.\n\nA: Are you tired?\nB: No, I\'m [[not]]. I\'m happy.',
        answer: ['not'],
        wrong: [{ a: 'am', why: 'No 로 대답할 때는 No, I\'m not. 이에요. I am 은 Yes 와 함께 써요.' }],
        explain: '피곤하지 않으니 No, I\'m not. 하고 대답해요. 그리고 진짜 기분 I\'m happy. 를 덧붙였어요.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 0,
        q: '그림 속 얼굴의 기분을 나타내는 낱말을 고르세요.',
        fig: { type: 'svg', alt: '눈썹이 안쪽으로 내려가 있고 입꼬리가 내려간 얼굴', svg: face('angry') },
        choices: ['angry', 'happy', 'sleepy', 'scared'],
        answer: 0,
        why: [
          '',
          'happy 는 웃는 얼굴이에요. 이 얼굴은 입꼬리가 내려가 있어요.',
          'sleepy 는 눈이 감기는 얼굴이에요. 이 얼굴은 눈을 뜨고 있어요.',
          'scared 는 눈을 동그랗게 뜨고 놀란 얼굴이에요. 이 얼굴은 눈썹이 안쪽으로 내려가 있어요.',
        ],
        explain: '눈썹이 안쪽으로 내려가고 입꼬리도 내려간 얼굴은 화가 난 얼굴이에요. 그래서 angry 예요.',
      },
      {
        id: 'p8', level: 2, type: 'order', concept: 2,
        q: '낱말을 바르게 늘어놓아 "너 졸리니?" 하는 질문을 만드세요.',
        choices: ['Are', 'you', 'sleepy?'],
        answer: [0, 1, 2],
        explain: '예/아니오로 묻는 질문은 Are you 다음에 기분 낱말을 써요. Are you sleepy? ↗',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 3,
        q: '끝을 올려 말하는 문장을 고르세요.',
        choices: ['Are you angry?', 'I\'m sleepy.', 'I\'m fine, thank you.', 'That\'s too bad.'],
        answer: 0,
        hint: 'Yes 나 No 로 대답하는 질문을 찾아보세요.',
        why: [
          '',
          'I\'m sleepy. 는 내 기분을 알려 주는 말이라 끝을 내려요.',
          'I\'m fine, thank you. 는 대답하는 말이라 끝을 내려요.',
          'That\'s too bad. 는 반응하는 말이라 끝을 내려요.',
        ],
        explain: 'Are you angry? 는 Yes 나 No 로 대답하는 질문이라서 끝을 올려 말해요. 나머지는 묻는 말이 아니에요.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 1,
        q: '대화를 읽고 Seojun 의 기분을 고르세요.\n\nJia: How are you, Seojun?\nSeojun: I\'m not good. I\'m sleepy.\nJia: That\'s too bad.',
        choices: ['졸려요.', '행복해요.', '화가 났어요.', '무서워요.'],
        answer: 0,
        hint: 'Seojun 이 I\'m 다음에 쓴 낱말을 찾아보세요.',
        why: [
          '',
          'Seojun 은 I\'m not good.(좋지 않아.) 하고 말했어요. 행복하지 않아요.',
          '"화가 난"은 angry 예요. 대화에 angry 는 없어요.',
          '"무서운"은 scared 예요. 대화에 scared 는 없어요.',
        ],
        explain: 'Seojun 은 I\'m sleepy. 하고 말했어요. sleepy 는 "졸린"이니 졸린 기분이에요. 그래서 Jia가 That\'s too bad. 하고 걱정해 주었어요.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'text', concept: 0,
        q: '빈칸에 알맞은 낱말을 한 개 쓰세요.\n\n밤에 천둥소리가 너무 커서 겁이 나요.\nI\'m [[scared]].',
        answer: ['scared', 'afraid'],
        hint: '"무서운, 겁이 난"을 뜻하는 낱말이에요.',
        wrong: [
          { a: 'scary', why: 'scary 는 "무섭게 하는"이라는 뜻이라 무서운 대상(천둥, 괴물)에 써요. 내가 겁이 날 때는 I\'m scared. 예요.' },
          { a: 'sad', why: 'sad 는 "슬픈"이에요. 겁이 나는 기분은 scared 예요.' },
        ],
        explain: '겁이 나는 기분은 scared 예요. I\'m scared. 는 "나는 무서워요."라는 뜻이에요. (afraid 도 같은 뜻이라 정답이에요.)',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'order', concept: 4,
        q: '대화가 자연스럽게 이어지도록 순서대로 놓으세요.',
        choices: ['Hi, Doyun. How are you?', 'I\'m great. And you?', 'I\'m not good. I\'m sad.', 'That\'s too bad.'],
        answer: [0, 1, 2, 3],
        hint: '먼저 묻는 말을 찾고, And you? 다음에 누가 대답하는지 생각해 보세요.',
        explain: '처음 사람이 How are you? 하고 묻고 → 도윤이 I\'m great. And you? 하고 대답하며 되물어요 → 처음 사람이 I\'m not good. I\'m sad. 하고 답하고 → 도윤이 That\'s too bad. 하고 걱정해 줘요.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 2,
        q: '하윤은 화가 나지 않았고, 기분이 아주 좋아요. 친구가 Are you angry? 하고 물었어요. 하윤의 대답으로 가장 알맞은 것을 고르세요.',
        choices: ['No, I\'m not. I\'m great.', 'Yes, I am. I\'m great.', 'No, I\'m not. I\'m sad.', 'Yes, I\'m not. I\'m happy.'],
        answer: 0,
        hint: '먼저 Yes 인지 No 인지 정하고, 그다음 진짜 기분을 골라요.',
        why: [
          '',
          'Yes, I am. 은 "응, 화났어."라는 뜻이에요. 하윤은 화가 나지 않았어요.',
          'No, I\'m not. 은 맞지만 하윤은 슬프지 않고 기분이 아주 좋아요.',
          'Yes 와 I\'m not 은 함께 쓰지 않아요. 아니라고 할 때는 No, I\'m not. 이에요.',
        ],
        explain: '화가 나지 않았으니 No, I\'m not. 이고, 기분이 아주 좋으니 I\'m great. 를 덧붙여요.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 0,
        q: '기분이 **좋지 않을 때** 쓰는 낱말끼리만 묶은 것을 고르세요.',
        choices: ['sad, angry, tired', 'happy, great, fine', 'sad, happy, scared', 'great, sleepy, angry'],
        answer: 0,
        why: [
          '',
          '모두 기분이 좋을 때 쓰는 낱말이에요.',
          'happy 는 기분이 좋을 때 쓰는 낱말이에요.',
          'great 는 기분이 아주 좋을 때 쓰는 낱말이에요.',
        ],
        explain: 'sad(슬픈), angry(화가 난), tired(피곤한)는 모두 기분이 좋지 않을 때 써요. happy, great, fine 은 기분이 좋을 때 써요.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 4,
        q: '글을 읽고 물음에 답하세요.\n\nHi, I\'m Jia. I have a cat. Her name is Nabi. Nabi is sick today. I\'m sad.\n\n(sick: 아픈)\n\nJia 에게 해 줄 말로 알맞은 것을 고르세요.',
        choices: ['That\'s too bad.', 'That\'s great!', 'Yes, I am.', 'I\'m fine, thank you.'],
        answer: 0,
        hint: 'Jia 의 기분을 나타내는 낱말을 먼저 찾아보세요.',
        why: [
          '',
          'Jia 는 고양이가 아파서 슬퍼요. 슬픈 친구에게 That\'s great! 는 알맞지 않아요.',
          'Yes, I am. 은 질문에 대한 대답이에요. Jia 는 묻지 않았어요.',
          'I\'m fine, thank you. 는 How are you? 에 대한 대답이에요.',
        ],
        explain: 'Jia 는 고양이 Nabi 가 아파서 I\'m sad. 하고 말했어요. 슬픈 친구에게는 That\'s too bad.(안됐구나.) 하고 걱정해 줘요.',
      },
    ],

    deeper: [
      {
        title: '기분 낱말을 더 알아봐요',
        body: '이 단원에서 배운 낱말 말고도 기분을 나타내는 낱말은 많아요.\n\n| 낱말 | 뜻 |\n|---|---|\n| excited | 신이 난 |\n| bored | 심심한 |\n| hungry | 배고픈 |\n\nI\'m excited. (나는 신이 나요.)처럼 지금까지 배운 꼴에 그대로 넣어 쓸 수 있어요.\n\nHow are you? 에도 여러 가지로 대답할 수 있어요. 아주 좋으면 I\'m great., 그저 그러면 I\'m okay. 하고 말해요. 정답이 하나만 있는 것이 아니라 **내 진짜 기분을 말하는 것**이 가장 좋은 대답이에요.',
      },
    ],

    faq: [
      {
        q: 'Yes, I am. 을 Yes, I\'m. 으로 줄여 말하면 안 돼요?',
        a: '안 돼요. Yes, I am. 처럼 am 으로 끝나는 짧은 대답은 줄여 쓰지 않아요. 반대로 No, I\'m not. 은 줄여 써요. (No, I am not. 도 맞아요.)',
      },
      {
        q: 'tired 랑 sleepy 는 뭐가 달라요?',
        a: 'tired 는 운동을 많이 하거나 일을 많이 해서 몸이 지친 것이에요. sleepy 는 잠이 와서 눈이 감기는 것이에요. 밤늦게 졸릴 때는 I\'m sleepy., 오래 달리기를 하고 나서 힘들 때는 I\'m tired. 하고 말해요.',
      },
      {
        q: 'How are you? 에는 꼭 I\'m fine, thank you. 라고 해야 해요?',
        a: '아니에요. 지금 진짜 기분을 말하면 돼요. I\'m great., I\'m good., I\'m tired., I\'m sleepy. 모두 좋은 대답이에요. 대답한 다음 And you? 하고 되물어 보세요.',
      },
    ],

    mistakes: [
      'Are you sad? 에 Yes, I\'m not. 처럼 Yes 와 not 을 섞어 대답하는 실수 — 맞으면 Yes, I am., 아니면 No, I\'m not. 이에요.',
      '짧은 대답을 Yes, I\'m. 으로 줄이는 실수 — Yes, I am. 은 줄이지 않아요.',
      '친구가 슬프다고 했는데 That\'s great! 하고 답하는 실수 — 좋지 않은 기분에는 That\'s too bad. 예요.',
    ],

    gens: [
      {
        id: 'are-you-answer',
        level: 1,
        title: 'Are you ~? 에 예/아니오로 대답하기',
        make: function (R) {
          var feel = [
            { w: 'happy', now: '기뻐요', ask: '기쁘니', not: '기쁘지 않아요' },
            { w: 'sad', now: '슬퍼요', ask: '슬프니', not: '슬프지 않아요' },
            { w: 'angry', now: '화가 났어요', ask: '화가 났니', not: '화가 나지 않았어요' },
            { w: 'tired', now: '피곤해요', ask: '피곤하니', not: '피곤하지 않아요' },
            { w: 'sleepy', now: '졸려요', ask: '졸리니', not: '졸리지 않아요' },
            { w: 'scared', now: '무서워요', ask: '무섭니', not: '무섭지 않아요' },
          ];
          var name = R.pick(['민수', '지아', '서준', '하윤', '도윤', '수아']);
          var real = R.pick(feel);
          var same = R.bool();
          var asked = same ? real : R.pick(feel.filter(function (f) { return f !== real; }));
          var yes = 'Yes, I am.';
          var no = 'No, I\'m not.';
          var correct = same ? yes : no;
          var reason = {};
          reason[yes] = name + R.josa(name, '은/는') + ' ' + asked.not + '. 아닐 때는 No, I\'m not. 이에요.';
          reason[no] = name + R.josa(name, '은/는') + ' 정말 ' + asked.now + '. 맞을 때는 Yes, I am. 이에요.';
          reason['Yes, I\'m not.'] = 'Yes 와 I\'m not 은 함께 쓰지 않아요. 맞으면 Yes, I am., 아니면 No, I\'m not. 이에요.';
          reason['No, I am.'] = 'No 다음에는 I\'m not 이 와요. No, I am. 은 앞뒤가 맞지 않아요.';
          var pick = R.choices(correct, [yes, no, 'Yes, I\'m not.', 'No, I am.']);
          return {
            type: 'choice', concept: 2,
            q: name + R.josa(name, '은/는') + ' 지금 ' + real.now + '. 친구가 **Are you ' + asked.w + '?** 하고 물었어요.\n\n' + name + '의 대답으로 알맞은 것을 고르세요.',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
            explain: 'Are you ' + asked.w + '? 는 "너 ' + asked.ask + '?" 하고 묻는 말이에요. ' + name + R.josa(name, '은/는') + ' 지금 ' + real.now + '. ' +
              (same ? '질문이 맞으니 Yes, I am. 하고 대답해요.' : '질문과 기분이 다르니 No, I\'m not. 하고 대답하고, 진짜 기분 I\'m ' + real.w + '. 를 덧붙이면 좋아요.'),
          };
        },
      },
      {
        id: 'react-feeling',
        level: 1,
        title: '친구의 기분에 알맞게 반응하기',
        make: function (R) {
          var feel = R.pick([
            { w: 'happy', good: true }, { w: 'great', good: true }, { w: 'good', good: true },
            { w: 'sad', good: false }, { w: 'tired', good: false }, { w: 'angry', good: false },
            { w: 'sleepy', good: false }, { w: 'scared', good: false },
          ]);
          var name = R.pick(['Minsu', 'Jia', 'Seojun', 'Hayun', 'Doyun', 'Sua']);
          var great = 'That\'s great!';
          var bad = 'That\'s too bad.';
          var correct = feel.good ? great : bad;
          var reason = {};
          reason[great] = 'That\'s great! 는 좋은 기분에 함께 기뻐하는 말이에요. 친구는 기분이 좋지 않아요.';
          reason[bad] = 'That\'s too bad. 는 좋지 않은 기분에 걱정하는 말이에요. 친구는 기분이 좋아요.';
          reason['Yes, I am.'] = 'Yes, I am. 은 Are you ~? 질문에 대한 대답이에요. 친구는 묻지 않았어요.';
          reason['No, I\'m not.'] = 'No, I\'m not. 은 Are you ~? 질문에 대한 대답이에요. 친구는 묻지 않았어요.';
          var pick = R.choices(correct, [great, bad, 'Yes, I am.', 'No, I\'m not.']);
          return {
            type: 'choice', concept: 4,
            q: '빈칸에 들어갈 말로 알맞은 것을 고르세요.\n\nA: How are you, ' + name + '?\nB: I\'m ' + feel.w + '.\nA: [[빈칸에 들어갈 말]]',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
            explain: 'B는 I\'m ' + feel.w + '. 하고 말했어요. ' +
              (feel.good ? '기분이 좋으니 함께 기뻐하는 That\'s great!(잘됐다!)가 알맞아요.' : '기분이 좋지 않으니 걱정해 주는 That\'s too bad.(안됐구나.)가 알맞아요.'),
          };
        },
      },
    ],

    vocab: [
      { w: 'happy', m: '행복한, 기쁜', ex: 'I\'m happy today.', exm: '나는 오늘 기뻐요.' },
      { w: 'sad', m: '슬픈', ex: 'Are you sad?', exm: '너 슬프니?' },
      { w: 'angry', m: '화가 난', ex: 'I\'m not angry.', exm: '나는 화나지 않았어요.' },
      { w: 'tired', m: '피곤한', ex: 'I\'m tired. I can\'t run.', exm: '나는 피곤해요. 달릴 수 없어요.' },
      { w: 'sleepy', m: '졸린', ex: 'Are you sleepy? Yes, I am.', exm: '너 졸리니? 응, 졸려.' },
      { w: 'scared', m: '무서운, 겁이 난', ex: 'Are you scared? No, I\'m not.', exm: '너 무섭니? 아니, 안 무서워.' },
      { w: 'great', m: '아주 좋은, 멋진', ex: 'I\'m great, thank you.', exm: '나는 아주 좋아요, 고마워요.' },
      { w: 'fine', m: '괜찮은, 좋은', ex: 'I\'m fine. And you?', exm: '나는 잘 지내. 너는?' },
      { w: 'good', m: '좋은', ex: 'I\'m good today.', exm: '나는 오늘 기분이 좋아요.' },
      { w: 'bad', m: '나쁜, 안 좋은', ex: 'That\'s too bad.', exm: '그것참 안됐구나.' },
    ],
  });
})();
