/* 4학년 영어 · 하지 말라고 말하기 */
(function () {
  // 금지 표지판 그림: 가운데 그림 위에 동그라미와 빗금을 겹쳐 그린다
  var LINE = ' fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"';
  var ICON = {
    swim: '<circle cx="80" cy="56" r="7" fill="currentColor"/>' +
      '<path d="M88 60 Q104 44 120 58"' + LINE + '/>' +
      '<path d="M58 76 Q68 68 78 76 Q88 84 98 76 Q108 68 118 76 Q128 84 138 76"' + LINE.replace('currentColor', 'var(--fig-2)') + '/>' +
      '<path d="M62 92 Q72 84 82 92 Q92 100 102 92 Q112 84 122 92 Q132 100 140 92"' + LINE.replace('currentColor', 'var(--fig-2)') + '/>',
    eat: '<polygon points="86,72 114,72 100,108" fill="var(--fig-4)" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<circle cx="100" cy="60" r="15" fill="var(--fig-2)" stroke="currentColor" stroke-width="2.5"/>',
    shout: '<circle cx="96" cy="70" r="24" fill="var(--fig-1)" stroke="currentColor" stroke-width="2.5"/>' +
      '<circle cx="88" cy="62" r="3" fill="currentColor"/><circle cx="104" cy="62" r="3" fill="currentColor"/>' +
      '<ellipse cx="96" cy="80" rx="7" ry="9" fill="currentColor"/>' +
      '<line x1="126" y1="58" x2="138" y2="52"' + LINE + '/><line x1="128" y1="70" x2="142" y2="70"' + LINE + '/><line x1="126" y1="82" x2="138" y2="88"' + LINE + '/>',
    run: '<circle cx="110" cy="38" r="7" fill="currentColor"/>' +
      '<line x1="107" y1="46" x2="98" y2="72"' + LINE + '/>' +
      '<line x1="104" y1="54" x2="120" y2="62"' + LINE + '/><line x1="104" y1="54" x2="86" y2="58"' + LINE + '/>' +
      '<polyline points="98,72 114,84 112,100"' + LINE + '/><polyline points="98,72 86,86 74,90"' + LINE + '/>',
    bed: '<rect x="62" y="84" width="76" height="12" rx="3" fill="var(--fig-4)" stroke="currentColor" stroke-width="2.5"/>' +
      '<rect x="62" y="70" width="8" height="34" rx="2" fill="var(--fig-4)" stroke="currentColor" stroke-width="2.5"/>' +
      '<circle cx="104" cy="34" r="6" fill="currentColor"/>' +
      '<line x1="104" y1="40" x2="104" y2="58"' + LINE + '/>' +
      '<polyline points="94,38 104,46 114,38"' + LINE + '/>' +
      '<polyline points="96,72 104,58 112,72"' + LINE + '/>' +
      '<line x1="122" y1="70" x2="122" y2="78"' + LINE + '/><line x1="86" y1="70" x2="86" y2="78"' + LINE + '/>',
    touch: '<rect x="84" y="68" width="32" height="32" rx="8" fill="var(--fig-1)" stroke="currentColor" stroke-width="2.5"/>' +
      '<rect x="85" y="44" width="7" height="30" rx="3.5" fill="var(--fig-1)" stroke="currentColor" stroke-width="2.5"/>' +
      '<rect x="93" y="38" width="7" height="34" rx="3.5" fill="var(--fig-1)" stroke="currentColor" stroke-width="2.5"/>' +
      '<rect x="101" y="40" width="7" height="32" rx="3.5" fill="var(--fig-1)" stroke="currentColor" stroke-width="2.5"/>' +
      '<rect x="109" y="46" width="7" height="28" rx="3.5" fill="var(--fig-1)" stroke="currentColor" stroke-width="2.5"/>' +
      '<rect x="70" y="74" width="20" height="8" rx="4" fill="var(--fig-1)" stroke="currentColor" stroke-width="2.5" transform="rotate(-30 80 78)"/>',
  };
  function sign(kind) {
    return '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">' + ICON[kind] +
      '<circle cx="100" cy="70" r="52" fill="none" stroke="var(--fig-3)" stroke-width="8"/>' +
      '<line x1="63" y1="33" x2="137" y2="107" stroke="var(--fig-3)" stroke-width="8"/></svg>';
  }

  Tutor.registerUnit({
    id: 'eng-e4-03',
    course: 'eng-e4',
    title: '하지 말라고 말하기',
    summary: 'Don\'t shout.처럼 하지 말라고 말하고, please를 붙여 부드럽게 말하며 장소에 맞는 규칙을 알아봐요.',
    goals: [
      'Don\'t 다음에 행동을 나타내는 말을 써서 하지 말라고 말할 수 있어요.',
      'please 를 붙여 부드럽게 말할 수 있어요.',
      '도서관·수영장·박물관 같은 장소에 맞는 규칙을 말할 수 있어요.',
      'I\'m sorry. 하고 사과하고, That\'s okay. 하고 받아 줄 수 있어요.',
    ],
    standards: ['[4영02-06]', '[4영01-05]', '[4영02-10]'],

    concepts: [
      {
        title: 'Don\'t 로 하지 말라고 말하기',
        body: '3학년 때 Stand up. Sit down. 처럼 행동을 시키는 말을 배웠지요. 그 앞에 **Don\'t** 를 붙이면 "~하지 마"라는 뜻이 돼요.\n\n| 시키는 말 | 하지 말라는 말 |\n|---|---|\n| Shout. 소리쳐. | **Don\'t shout.** 소리치지 마. |\n| Run. 뛰어. | **Don\'t run.** 뛰지 마. |\n| Jump on the bed. 침대 위에서 뛰어. | **Don\'t jump on the bed.** 침대 위에서 뛰지 마. |\n\n**Don\'t** 는 **Do not** 을 줄인 말이에요. Don\'t 다음에는 행동을 나타내는 낱말(shout, run, jump, touch, eat, swim)을 바로 써요.\n\n> ⚠️ Don\'t 다음 낱말은 모양을 바꾸지 않아요. Don\'t swimming. 이 아니라 Don\'t swim. 이에요.',
        easy: '행동 카드 앞에 "멈춤" 카드를 하나 붙인다고 생각해 보세요.\n\n- run(뛰다) 카드 앞에 Don\'t 카드 → Don\'t run.(뛰지 마.)\n- shout(소리치다) 카드 앞에 Don\'t 카드 → Don\'t shout.(소리치지 마.)\n\nDon\'t 카드 하나로 어떤 행동이든 "하지 마"로 바꿀 수 있어요.',
        fig: { type: 'svg', alt: '입을 크게 벌리고 소리치는 얼굴 위에 동그라미와 빗금이 그려진 금지 표지', svg: sign('shout') },
        check: {
          type: 'choice',
          q: '"뛰지 마."를 영어로 바르게 말한 것을 고르세요.',
          choices: ['Don\'t run.', 'Run.', 'Don\'t running.'],
          answer: 0,
          why: ['', 'Run. 은 "뛰어."라는 뜻이에요. 하지 말라고 할 때는 앞에 Don\'t 를 붙여요.', 'Don\'t 다음 낱말은 모양을 바꾸지 않아요. running 이 아니라 run 이에요.'],
          explain: '"뛰다"는 run 이고, 하지 말라고 할 때는 앞에 Don\'t 를 붙여요. 그래서 Don\'t run. 이에요.',
        },
      },
      {
        title: 'please 로 부드럽게 말하기',
        body: '**please** 를 붙이면 "~해 주세요, ~하지 말아 주세요"처럼 부드럽고 공손한 말이 돼요.\n\n- Don\'t touch it, **please**. 그것을 만지지 말아 주세요.\n- **Please** don\'t touch it. 그것을 만지지 말아 주세요.\n\nplease 는 문장 끝에 붙여도 되고 맨 앞에 붙여도 돼요. 끝에 붙일 때는 please 앞에 쉼표(,)를 찍어요.\n\n> 💡 어른이나 처음 보는 사람에게, 또는 친구에게도 부탁할 때는 please 를 붙이면 듣는 사람의 기분이 좋아요.',
        easy: '우리말 "만지지 마!"와 "만지지 말아 주세요."를 소리 내어 비교해 보세요. 뒤의 말이 훨씬 부드럽지요?\n\n영어에서 그 부드러운 말투를 만드는 마법의 낱말이 please 예요. 문장 맨 앞이나 맨 끝에 살짝 붙이기만 하면 돼요.',
        check: {
          type: 'choice',
          q: 'please 를 넣어 부드럽게 말한 문장을 고르세요.',
          choices: ['Don\'t shout, please.', 'Don\'t shout.', 'Shout, please.'],
          answer: 0,
          why: ['', '하지 말라는 뜻은 맞지만 please 가 없어서 부드러운 말이 아니에요.', 'please 는 있지만 Don\'t 가 없어서 "소리쳐 주세요."라는 뜻이 돼요.'],
          explain: 'Don\'t shout, please. 는 "소리치지 말아 주세요."예요. Please don\'t shout. 라고 해도 같아요.',
        },
      },
      {
        title: '장소에 맞는 규칙',
        body: '장소마다 지켜야 할 규칙이 있어요. 규칙을 말할 때는 끝에 **here**(여기에서)를 붙이기도 해요.\n\n| 장소 | 규칙 | 뜻 |\n|---|---|---|\n| 도서관 (library) | **Don\'t shout here.** | 여기에서 소리치지 마세요. |\n| 도서관 (library) | **Don\'t eat here.** | 여기에서 먹지 마세요. |\n| 박물관 (museum) | **Don\'t touch it.** | 그것을 만지지 마세요. |\n| 수영장 옆 (pool) | **Don\'t run here.** | 여기에서 뛰지 마세요. |\n| 깊은 강 (river) | **Don\'t swim here.** | 여기에서 수영하지 마세요. |\n\n> 💡 규칙은 왜 있을까요? 도서관에서는 다른 사람이 책을 읽어야 하고, 수영장 옆은 바닥이 미끄러워 넘어지기 쉽기 때문이에요. 이유를 생각하면 규칙이 쉽게 떠올라요.',
        easy: '장소를 떠올리고 "여기서 하면 위험하거나 남에게 방해가 되는 일"을 찾아보세요.\n\n- 조용히 책 읽는 곳 → 소리치면 방해 → Don\'t shout here.\n- 바닥이 젖은 곳 → 뛰면 위험 → Don\'t run here.\n- 물이 깊은 곳 → 수영하면 위험 → Don\'t swim here.',
        check: {
          type: 'choice',
          q: '도서관에서 지켜야 할 규칙으로 알맞은 것을 고르세요.',
          choices: ['Don\'t shout here.', 'Shout here.', 'Don\'t read here.'],
          answer: 0,
          why: ['', 'Shout here. 는 "여기에서 소리쳐."라는 뜻이에요. 도서관에서는 조용히 해야 해요.', '도서관은 책을 읽는 곳이에요. 읽지 말라고 할 까닭이 없어요.'],
          explain: '도서관에서는 다른 사람이 조용히 책을 읽을 수 있게 소리치지 않아요. 그래서 Don\'t shout here. 예요.',
        },
      },
      {
        title: '금지 표지판 읽기',
        body: '빨간 동그라미 안에 그림이 있고 그 위에 **빗금**이 그어져 있으면 "그것을 하지 마세요"라는 금지 표지판이에요.\n\n| 표지판 속 그림 | 알맞은 말 |\n|---|---|\n| 물결과 수영하는 사람 | Don\'t swim here. |\n| 아이스크림 | Don\'t eat here. |\n| 손 | Don\'t touch it. |\n| 소리치는 얼굴 | Don\'t shout. |\n| 뛰는 사람 | Don\'t run. |\n| 침대 위에서 뛰는 사람 | Don\'t jump on the bed. |\n\n그림이 나타내는 **행동**을 먼저 찾고, 그 앞에 Don\'t 를 붙이면 돼요.',
        easy: '표지판은 그림으로 된 말이에요. 빗금은 "안 돼!"라는 뜻이고, 그 아래 그림은 "무엇을"이에요.\n\n물결 그림 + 빗금 = 수영 안 돼! → Don\'t swim here.\n\n빗금을 Don\'t 로, 그림을 행동 낱말로 바꿔 읽으면 돼요.',
        fig: { type: 'svg', alt: '물결 위에서 수영하는 사람 그림에 동그라미와 빗금이 그려진 금지 표지', svg: sign('swim') },
        check: {
          type: 'choice',
          q: '그림의 표지판이 뜻하는 말로 알맞은 것을 고르세요.',
          fig: { type: 'svg', alt: '아이스크림 그림에 동그라미와 빗금이 그려진 금지 표지', svg: sign('eat') },
          choices: ['Don\'t eat here.', 'Don\'t swim here.', 'Eat here.'],
          answer: 0,
          why: ['', '수영 금지 표지에는 물결과 사람이 그려져 있어요. 이 표지에는 아이스크림이 있어요.', '빗금은 "하지 마세요"라는 뜻이에요. 그래서 Don\'t 를 붙여야 해요.'],
          explain: '아이스크림 그림에 빗금이 있으니 "여기에서 먹지 마세요", 곧 Don\'t eat here. 예요.',
        },
      },
      {
        title: '사과하고 받아 주기',
        body: '규칙을 어기거나 실수했을 때는 **I\'m sorry.**(미안해.) 하고 사과해요. 사과를 받은 사람은 **That\'s okay.**(괜찮아.) 하고 받아 줘요.\n\n- A: Don\'t run, please.\nB: Oh, **I\'m sorry.**\nA: **That\'s okay.**\n\n> 💡 That\'s okay. 대신 It\'s okay. 라고 해도 같은 뜻이에요.\n\n> ⚠️ That\'s okay. 와 That\'s too bad. 를 헷갈리지 마세요. 사과를 받아 줄 때는 That\'s okay. 예요.',
        easy: '친구 발을 실수로 밟았을 때 "미안해!" 하면 친구가 "괜찮아." 하지요.\n\n- 미안해 → I\'m sorry.\n- 괜찮아 → That\'s okay.\n\n사과하는 말과 받아 주는 말을 한 쌍으로 외워 두세요.',
        check: {
          type: 'ox',
          q: '친구가 I\'m sorry. 하고 사과하면 That\'s okay. 하고 받아 줄 수 있어요.',
          answer: true,
          explain: 'That\'s okay. 는 "괜찮아."라는 뜻으로 사과를 받아 주는 말이에요.',
        },
      },
    ],

    examples: [
      {
        q: '도서관에서 친구 서준이 큰 소리로 친구를 불러요. 부드럽게 하지 말라고 말하고, 서준의 사과를 받아 주는 대화를 만들어 보세요.',
        steps: [
          '"소리치다"는 shout 예요. 하지 말라고 할 때는 앞에 Don\'t 를 붙여요: Don\'t shout.',
          '부드럽게 말하려고 끝에 please 를 붙여요: Don\'t shout, please.',
          '서준은 I\'m sorry.(미안해.) 하고 사과해요.',
          '사과를 받아 줄 때는 That\'s okay.(괜찮아.) 하고 말해요.',
        ],
        answer: 'A: Don\'t shout, please.\nSeojun: I\'m sorry.\nA: That\'s okay.',
      },
      {
        q: '그림의 표지판을 보고 알맞은 말을 해 보세요.',
        fig: { type: 'svg', alt: '손바닥 그림에 동그라미와 빗금이 그려진 금지 표지', svg: sign('touch') },
        steps: [
          '빗금이 있으니 "하지 마세요"라는 표지예요. 문장을 Don\'t 로 시작해요.',
          '빗금 아래에 손이 그려져 있어요. 손으로 하는 행동은 touch(만지다)예요.',
          '박물관의 물건처럼 가리키는 것이 있으면 it(그것)을 붙여요: Don\'t touch it.',
        ],
        answer: 'Don\'t touch it. (부드럽게: Don\'t touch it, please.)',
      },
    ],

    terms: [
      { term: 'Don\'t', def: 'Do not 을 줄인 말이에요. 행동을 나타내는 말 앞에 붙여 "~하지 마"라는 뜻을 만들어요. 예: Don\'t run.' },
      { term: 'please', def: '부탁하거나 부드럽게 말할 때 붙이는 말이에요. 문장 맨 앞이나 끝에 써요. 예: Don\'t shout, please.' },
      { term: '규칙', def: '여러 사람이 함께 지키기로 한 약속이에요. 영어로 rule 이라고 해요. 예: Don\'t eat here.' },
      { term: '금지 표지판', def: '빨간 동그라미 안 그림에 빗금을 그어 "이것을 하지 마세요"라고 알려 주는 표지예요.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '"소리치지 마."를 영어로 바르게 말한 것을 고르세요.',
        choices: ['Don\'t shout.', 'Shout.', 'Don\'t run.', 'I\'m sorry.'],
        answer: 0,
        why: [
          '',
          'Shout. 는 "소리쳐."라는 뜻이에요. 하지 말라고 할 때는 앞에 Don\'t 를 붙여요.',
          'Don\'t run. 은 "뛰지 마."예요. "소리치다"는 shout 예요.',
          'I\'m sorry. 는 "미안해."라는 사과의 말이에요.',
        ],
        explain: '"소리치다"는 shout, "하지 마"는 Don\'t 예요. 합치면 Don\'t shout. 예요.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 3,
        q: '그림의 표지판이 뜻하는 말로 알맞은 것을 고르세요.',
        fig: { type: 'svg', alt: '물결 위에서 수영하는 사람 그림에 동그라미와 빗금이 그려진 금지 표지', svg: sign('swim') },
        choices: ['Don\'t swim here.', 'Don\'t eat here.', 'Swim here.', 'Don\'t shout.'],
        answer: 0,
        why: [
          '',
          '먹지 말라는 표지에는 음식이 그려져 있어요. 이 표지에는 물결과 수영하는 사람이 있어요.',
          '빗금은 "하지 마세요"라는 뜻이에요. Swim here. 는 "여기서 수영해."예요.',
          '소리치지 말라는 표지에는 입을 크게 벌린 얼굴이 그려져 있어요.',
        ],
        explain: '물결과 수영하는 사람 위에 빗금이 있으니 "여기에서 수영하지 마세요", 곧 Don\'t swim here. 예요.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'text', concept: 0,
        q: '빈칸에 알맞은 말을 쓰세요. (침대 위에서 뛰지 마.)\n\n[[Don\'t]] jump on the bed.',
        answer: ['Don\'t', 'Do not'],
        wrong: [
          { a: 'dont', why: 'Don\'t 에는 n 과 t 사이에 작은 따옴표(\')가 있어요. Do not 을 줄이면서 o 가 빠진 자리예요.' },
          { a: 'not', why: '하지 말라고 할 때는 Not 이 아니라 Don\'t 로 시작해요.' },
        ],
        explain: '"~하지 마"는 Don\'t 로 시작해요. Don\'t jump on the bed. (Do not jump on the bed. 도 맞아요.)',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 4,
        q: 'That\'s okay. 는 친구가 I\'m sorry. 하고 사과할 때 받아 주는 말이에요.',
        answer: true,
        explain: 'That\'s okay. 는 "괜찮아."라는 뜻이에요. 사과를 받아 줄 때 써요.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 1,
        q: '"그것을 만지지 말아 주세요."처럼 please 를 넣어 부드럽게 말한 문장을 고르세요.',
        choices: ['Don\'t touch it, please.', 'Don\'t touch it.', 'Touch it, please.', 'Don\'t eat it, please.'],
        answer: 0,
        why: [
          '',
          '하지 말라는 뜻은 맞지만 please 가 없어서 부드러운 말이 아니에요.',
          'please 는 있지만 Don\'t 가 없어서 "그것을 만져 주세요."라는 뜻이 돼요.',
          'eat 은 "먹다"예요. "만지다"는 touch 예요.',
        ],
        explain: 'touch 는 "만지다"예요. Don\'t touch it 끝에 please 를 붙이면 부드러운 말이 돼요.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: '그림의 표지판이 뜻하는 말로 알맞은 것을 고르세요.',
        fig: { type: 'svg', alt: '뛰어가는 사람 그림에 동그라미와 빗금이 그려진 금지 표지', svg: sign('run') },
        choices: ['Don\'t run.', 'Run.', 'Don\'t swim.', 'Don\'t touch it.'],
        answer: 0,
        why: [
          '',
          '빗금은 "하지 마세요"라는 뜻이에요. Run. 은 "뛰어."예요.',
          '수영 금지 표지에는 물결이 그려져 있어요.',
          '만지지 말라는 표지에는 손이 그려져 있어요.',
        ],
        explain: '뛰어가는 사람 위에 빗금이 있으니 "뛰지 마세요", 곧 Don\'t run. 이에요.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 4,
        q: '빈칸에 들어갈 말로 알맞은 것을 고르세요.\n\nA: Oh, I\'m sorry.\nB: [[That\'s okay.]]',
        choices: ['That\'s okay.', 'That\'s great!', 'I\'m sorry.', 'Nice to meet you.'],
        answer: 0,
        why: [
          '',
          'That\'s great! 는 좋은 소식에 기뻐하는 말이에요. 사과를 받아 줄 때는 That\'s okay. 예요.',
          'A가 사과했으니 B는 사과를 받아 주는 말을 해요.',
          'Nice to meet you. 는 처음 만났을 때 하는 인사예요.',
        ],
        explain: 'I\'m sorry.(미안해.)에는 That\'s okay.(괜찮아.) 하고 받아 줘요.',
      },
      {
        id: 'p8', level: 1, type: 'short', check: 'text', concept: 0,
        q: 'Do not 을 줄여서 한 낱말로 쓰세요.',
        answer: ['don\'t'],
        wrong: [{ a: 'dont', why: '빠진 o 자리에 작은 따옴표(\')를 찍어요. don\'t 예요.' }],
        explain: 'Do not 에서 not 의 o 를 빼고 그 자리에 작은 따옴표를 찍으면 don\'t 가 돼요.',
      },
      {
        id: 'p9', level: 2, type: 'order', concept: 0,
        q: '낱말을 바르게 늘어놓아 "침대 위에서 뛰지 마." 하는 문장을 만드세요.',
        choices: ['Don\'t', 'jump', 'on', 'the', 'bed.'],
        answer: [0, 1, 2, 3, 4],
        hint: 'Don\'t 로 시작하고, 그다음에 행동 낱말을 써요.',
        explain: 'Don\'t + jump(뛰다) + on the bed(침대 위에서) 순서예요: Don\'t jump on the bed.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 2,
        q: '수영장 옆 바닥은 물에 젖어 미끄러워요. 이곳에 붙일 규칙으로 가장 알맞은 것을 고르세요.',
        choices: ['Don\'t run here.', 'Run here.', 'Don\'t read here.', 'Don\'t sit here.'],
        answer: 0,
        hint: '미끄러운 바닥에서 하면 위험한 행동을 떠올려 보세요.',
        why: [
          '',
          'Run here. 는 "여기에서 뛰어."라는 뜻이에요. 미끄러운 곳에서 뛰면 넘어질 수 있어요.',
          '책을 읽는 것은 미끄러운 바닥과 관계가 없어요.',
          '앉는 것은 미끄러운 바닥에서도 위험하지 않아요.',
        ],
        explain: '젖은 바닥에서 뛰면 넘어지기 쉬워요. 그래서 Don\'t run here.(여기에서 뛰지 마세요.)가 알맞아요.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'text', concept: 2,
        q: '물이 깊은 강가에 붙은 안내문이에요. 빈칸에 알맞은 낱말을 쓰세요. (여기에서 수영하지 마세요.)\n\nDon\'t [[swim]] here.',
        answer: ['swim'],
        hint: '"수영하다"를 뜻하는 낱말이에요.',
        wrong: [
          { a: 'swimming', why: 'Don\'t 다음 낱말은 모양을 바꾸지 않아요. swimming 이 아니라 swim 이에요.' },
          { a: 'run', why: 'run 은 "뛰다"예요. "수영하다"는 swim 이에요.' },
        ],
        explain: '"수영하다"는 swim 이에요. Don\'t 다음에는 낱말을 그대로 써서 Don\'t swim here. 예요.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 3,
        q: '그림의 표지판이 뜻하는 말로 알맞은 것을 고르세요.',
        fig: { type: 'svg', alt: '침대 위에서 두 팔을 들고 뛰는 사람 그림에 동그라미와 빗금이 그려진 금지 표지', svg: sign('bed') },
        choices: ['Don\'t jump on the bed.', 'Jump on the bed.', 'Don\'t run.', 'Don\'t touch it.'],
        answer: 0,
        hint: '사람이 어디 위에 있는지 살펴보세요.',
        why: [
          '',
          '빗금은 "하지 마세요"라는 뜻이에요. Don\'t 를 붙여야 해요.',
          '사람이 침대 위에서 뛰어오르고 있어요. 그냥 달리는 그림이 아니에요.',
          '만지지 말라는 표지에는 손이 그려져 있어요.',
        ],
        explain: '침대 위에서 뛰는 사람에 빗금이 있으니 Don\'t jump on the bed.(침대 위에서 뛰지 마.)예요.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'order', concept: 4,
        q: '대화가 자연스럽게 이어지도록 순서대로 놓으세요.',
        choices: ['Don\'t run, please.', 'Oh, I\'m sorry.', 'That\'s okay.'],
        answer: [0, 1, 2],
        hint: '사과는 무엇 때문에 하게 되는지 생각해 보세요.',
        explain: '먼저 뛰지 말아 달라고 부탁하고(Don\'t run, please.) → 상대가 사과하고(Oh, I\'m sorry.) → 사과를 받아 줘요(That\'s okay.).',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 2,
        q: '수영장 안내문을 읽고 물음에 답하세요.\n\nPool Rules\n1. Don\'t run.\n2. Don\'t eat here.\n3. Don\'t shout.\n\n이 수영장에서 **해도 되는** 일을 고르세요.',
        choices: ['수영하기', '뛰어다니기', '음식 먹기', '소리치기'],
        answer: 0,
        hint: '안내문에 Don\'t 로 나온 행동은 하면 안 되는 일이에요.',
        why: [
          '',
          'Don\'t run. 이 있으니 뛰면 안 돼요.',
          'Don\'t eat here. 가 있으니 여기에서 먹으면 안 돼요.',
          'Don\'t shout. 가 있으니 소리치면 안 돼요.',
        ],
        explain: '안내문은 뛰기(run), 먹기(eat), 소리치기(shout)를 하지 말라고 해요. 수영하지 말라는 말(Don\'t swim)은 없으니 수영장에서 수영은 해도 돼요.',
      },
      {
        id: 'a3', level: 3, type: 'ox', concept: 1,
        q: 'Please don\'t shout. 와 Don\'t shout, please. 는 둘 다 "소리치지 말아 주세요."라는 바른 문장이에요.',
        answer: true,
        explain: 'please 는 문장 맨 앞에 써도 되고 맨 끝에 써도 돼요. 끝에 쓸 때는 앞에 쉼표를 찍어요. 두 문장 모두 바르고 뜻도 같아요.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 3,
        q: '표지판 그림과 말이 **알맞지 않게** 짝 지어진 것을 고르세요.',
        choices: [
          '아이스크림 그림에 빗금 — Don\'t eat here.',
          '물결 그림에 빗금 — Don\'t swim here.',
          '손 그림에 빗금 — Don\'t run.',
          '소리치는 얼굴에 빗금 — Don\'t shout.',
        ],
        answer: 2,
        hint: '그림이 나타내는 행동을 영어 낱말로 바꿔 보세요.',
        why: [
          '아이스크림은 먹는 것이니 Don\'t eat here. 가 알맞아요.',
          '물결은 수영을 나타내니 Don\'t swim here. 가 알맞아요.',
          '',
          '소리치는 얼굴이니 Don\'t shout. 가 알맞아요.',
        ],
        explain: '손 그림은 "만지다(touch)"를 나타내요. 그래서 Don\'t touch it. 이 알맞고, Don\'t run. 은 뛰는 사람 그림에 어울려요.',
      },
    ],

    deeper: [
      {
        title: '표지판에는 No 로 시작하는 말도 많아요',
        body: '실제 표지판에서는 Don\'t 대신 **No** 로 시작하는 짧은 말을 자주 볼 수 있어요.\n\n| 표지판 | 뜻 | 같은 뜻의 말 |\n|---|---|---|\n| No swimming | 수영 금지 | Don\'t swim here. |\n| No running | 뛰기 금지 | Don\'t run. |\n| No food | 음식 금지 | Don\'t eat here. |\n\n표지판은 멀리서도 빨리 읽어야 해서 낱말 수를 줄여 쓰는 거예요. 사람에게 직접 말할 때는 이 단원에서 배운 Don\'t ~, please. 처럼 말해요.',
      },
    ],

    faq: [
      {
        q: 'Don\'t 랑 Do not 은 같은 말이에요?',
        a: '네, 뜻이 같아요. Don\'t 는 Do not 을 줄인 말이에요. 말할 때는 주로 Don\'t 를 쓰고, 안내문처럼 또박또박 쓸 때는 Do not 을 쓰기도 해요.',
      },
      {
        q: 'please 는 앞에 붙여요, 뒤에 붙여요?',
        a: '둘 다 돼요. Please don\'t touch it. 처럼 맨 앞에 써도 되고, Don\'t touch it, please. 처럼 맨 끝에 써도 돼요. 끝에 쓸 때는 please 앞에 쉼표(,)를 찍어요.',
      },
      {
        q: 'I\'m sorry. 에는 That\'s okay. 말고 다른 대답도 있어요?',
        a: '있어요. It\'s okay.(괜찮아.)도 많이 써요. 둘 다 사과를 받아 주는 말이에요.',
      },
    ],

    mistakes: [
      'Not run. 처럼 Don\'t 대신 Not 을 쓰는 실수 — 하지 말라고 할 때는 Don\'t run. 이에요.',
      'Don\'t swimming. 처럼 Don\'t 다음 낱말에 -ing 를 붙이는 실수 — 낱말을 그대로 써서 Don\'t swim. 이에요.',
      '사과를 받았는데 That\'s too bad. 라고 하는 실수 — 사과를 받아 줄 때는 That\'s okay. 예요.',
    ],

    gens: [
      {
        id: 'dont-situation',
        level: 1,
        title: '상황에 맞게 하지 말라고 말하기',
        make: function (R) {
          var acts = [
            { w: 'shout', k: '소리치다', s: ['도서관에서 친구가 큰 소리로 떠들어요.', '아기가 자고 있는데 동생이 큰 소리를 질러요.'] },
            { w: 'run', k: '뛰다', s: ['복도에서 친구가 뛰어가요.', '수영장 옆 젖은 바닥에서 동생이 뛰어요.'] },
            { w: 'eat', k: '먹다', s: ['도서관에서 친구가 과자를 먹으려고 해요.', '컴퓨터실에서 친구가 빵을 먹으려고 해요.'] },
            { w: 'swim', k: '수영하다', s: ['물이 깊은 강에서 친구가 수영하려고 해요.', '수영 금지 표지가 있는 호수에 동생이 들어가려고 해요.'] },
            { w: 'touch it', k: '만지다', s: ['박물관에서 친구가 오래된 그릇을 만지려고 해요.', '동생이 뜨거운 냄비를 만지려고 해요.'] },
            { w: 'jump on the bed', k: '침대 위에서 뛰다', s: ['동생이 침대 위에서 펄쩍펄쩍 뛰어요.'] },
          ];
          var act = R.pick(acts);
          var sit = R.pick(act.s);
          var other = R.pick(acts.filter(function (a) { return a !== act; }));
          var polite = R.bool();
          var cap = act.w.charAt(0).toUpperCase() + act.w.slice(1);
          var plain = 'Don\'t ' + act.w + '.';
          var soft = 'Don\'t ' + act.w + ', please.';
          var reason = {};
          var correct, wrongs;
          if (polite) {
            correct = soft;
            wrongs = [cap + ', please.', 'Don\'t ' + other.w + ', please.', plain];
            reason[cap + ', please.'] = 'Don\'t 가 없어서 "' + act.k + '" 하고 부탁하는 말이 돼요. 하지 말라고 할 때는 앞에 Don\'t 를 붙여요.';
            reason['Don\'t ' + other.w + ', please.'] = other.w + ' → "' + other.k + '". 이 상황에 맞는 행동이 아니에요.';
            reason[plain] = '하지 말라는 뜻은 맞지만 please 가 없어서 부드러운 말이 아니에요.';
          } else {
            correct = plain;
            wrongs = [cap + '.', 'Don\'t ' + other.w + '.', 'Not ' + act.w + '.'];
            reason[cap + '.'] = 'Don\'t 가 없어서 "' + act.k + '" 하고 시키는 말이 돼요.';
            reason['Don\'t ' + other.w + '.'] = other.w + ' → "' + other.k + '". 이 상황에 맞는 행동이 아니에요.';
            reason['Not ' + act.w + '.'] = '하지 말라고 할 때는 Not 이 아니라 Don\'t 로 시작해요.';
          }
          var pick = R.choices(correct, wrongs);
          return {
            type: 'choice', concept: polite ? 1 : 0,
            q: sit + '\n\n' + (polite ? 'please 를 넣어 부드럽게 하지 말라고 말한 것을 고르세요.' : '하지 말라고 말할 때 알맞은 것을 고르세요.'),
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
            explain: '"' + act.k + '"는 ' + act.w + ', 하지 말라고 할 때는 앞에 Don\'t 를 붙여요. ' +
              (polite ? '끝에 please 를 붙이면 부드러운 말이 돼요: ' + soft : '그래서 ' + plain),
          };
        },
      },
    ],

    vocab: [
      { w: 'shout', m: '소리치다', ex: 'Don\'t shout in the library.', exm: '도서관에서 소리치지 마.' },
      { w: 'run', m: '뛰다, 달리다', ex: 'Don\'t run here, please.', exm: '여기서 뛰지 말아 주세요.' },
      { w: 'jump', m: '뛰어오르다, 점프하다', ex: 'Don\'t jump on the bed.', exm: '침대 위에서 뛰지 마.' },
      { w: 'touch', m: '만지다', ex: 'Don\'t touch it, please.', exm: '그것을 만지지 말아 주세요.' },
      { w: 'eat', m: '먹다', ex: 'Don\'t eat here.', exm: '여기서 먹지 마세요.' },
      { w: 'swim', m: '수영하다', ex: 'Don\'t swim here.', exm: '여기서 수영하지 마세요.' },
      { w: 'bed', m: '침대', ex: 'This is my bed.', exm: '이것은 내 침대예요.' },
      { w: 'here', m: '여기에서, 여기에', ex: 'Don\'t shout here.', exm: '여기서 소리치지 마세요.' },
      { w: 'please', m: '(부탁할 때) 제발, ~해 주세요', ex: 'Please don\'t run.', exm: '뛰지 말아 주세요.' },
      { w: 'sorry', m: '미안한', ex: 'Oh, I\'m sorry.', exm: '아, 미안해.' },
      { w: 'okay', m: '괜찮은', ex: 'That\'s okay.', exm: '괜찮아.' },
      { w: 'library', m: '도서관', ex: 'Don\'t eat in the library.', exm: '도서관에서 먹지 마세요.' },
      { w: 'museum', m: '박물관', ex: 'Don\'t touch it in the museum.', exm: '박물관에서 그것을 만지지 마세요.' },
    ],
  });
})();
