/* 영어Ⅱ · 구·절 빈칸 추론
 * 지문·예문은 모두 직접 쓴 글이다(가상의 인물). */
(function () {
  // 글 A: 잘 듣는 사람 (재진술, 직접 쓴 글)
  var LISTEN = 'Good listeners do more than stay quiet while others talk. They [[빈칸]]. For example, they nod, ask questions about what the speaker has just said, and repeat key points to check that they have understood. In other words, listening well is an active process, not a passive one.';
  // 글 B: 창의성 (통념-반박 + 대조, 직접 쓴 글)
  var CREATIVE = 'Creativity is often seen as a sudden flash of inspiration that comes from nowhere. However, most creative ideas do not appear out of thin air. Instead, they [[빈칸]]. A new recipe, for instance, usually mixes familiar ingredients in an unfamiliar way, and many inventions improve on machines that already exist.';
  // 글 C: 기회비용 (추상 개념 → 구체 예, 직접 쓴 글)
  var COST = 'Every choice has a hidden price. When you spend an afternoon playing games, the cost is not only the money you might spend but also [[빈칸]], such as reading a book, meeting a friend, or getting some rest. Economists call this the opportunity cost of a decision.';
  // 글 D: 바쁨과 생산성 (지나친 일반화 걸러 내기, 직접 쓴 글)
  var BUSY = 'Some people think that being busy is the same as being productive. But a full schedule does not always mean that important work is getting done. A student who spends hours copying notes neatly may feel busy, yet learn less than a classmate who spends thirty minutes testing herself on the material. What matters is [[빈칸]].';
  // 글 E: 습관과 환경 (직접 쓴 글)
  var HABIT = 'We often blame a lack of willpower when we fail to keep a good habit. Yet our surroundings may matter more than we think. A person who keeps a bowl of fruit on the kitchen table tends to eat more fruit, and a student who leaves her phone in another room checks it less often. In short, one of the easiest ways to change a habit is to [[빈칸]].';

Tutor.registerUnit({
  id: 'eng-h-e2-04',
  course: 'eng-h-e2',
  title: '구·절 빈칸 추론',
  summary: '긴 어구나 절이 빈칸인 글에서 추상적인 개념을 풀어 이해하고, 재진술과 대조로 답을 좁힙니다.',
  goals: [
    '추상적인 개념어를 구체적인 예로 바꾸어 이해할 수 있다.',
    '빈칸을 다시 설명하는 문장(재진술)을 찾아 빈칸의 뜻을 정할 수 있다.',
    'not A but B, rather than, unless 같은 부정어·대조가 섞인 빈칸 문장을 바르게 읽을 수 있다.',
    '선택지를 보기 전에 빈칸을 내 말로 채우고, 글과 반대되거나 지나치게 일반화한 선택지를 걸러 낼 수 있다.',
  ],
  standards: ['[12영Ⅱ-01-04]'],

  concepts: [
    {
      title: '추상적인 개념어를 구체적인 예로 바꾸기',
      body: '구·절 빈칸 글은 흔히 **추상적인 말**(눈에 보이지 않는 생각·개념)로 요지를 말하고, **구체적인 예**로 그것을 보여 줍니다. 빈칸이 추상적인 쪽에 있으면 예를 읽고 "이 예들이 공통으로 보여 주는 것은 무엇인가?"를 물어 빈칸을 채웁니다.\n\n' +
        '| 추상적인 말 | 구체적인 예 |\n|---|---|\n' +
        '| opportunity cost (기회비용) | 게임을 하느라 하지 못한 독서·친구 만나기·휴식 |\n' +
        '| delayed gratification (만족 지연) | 새 자전거를 사려고 몇 달 동안 간식비를 모으기 |\n' +
        '| social influence (사회적 영향) | 줄이 긴 식당을 보고 그 식당을 고르기 |\n\n' +
        '거꾸로 빈칸이 **예** 쪽에 있으면, 앞에 나온 추상적인 말을 정확히 풀어 그 뜻에 맞는 예를 고릅니다.\n\n' +
        '> 💡 추상적인 말을 만나면 머릿속에서 "예를 들면 어떤 장면일까?"를 하나 떠올려 보십시오. 장면이 그려지면 뜻을 이해한 것입니다.',
      easy: '"우정"이라는 말은 눈에 보이지 않습니다. 하지만 "친구가 아플 때 숙제를 챙겨 주는 것", "비 오는 날 우산을 같이 쓰는 것"을 보면 우정이 무엇인지 알 수 있지요.\n\n' +
        '빈칸 글도 같습니다. 어려운 낱말 대신 글에 나온 **장면**들을 보고, 그 장면들을 한 낱말로 묶으면 무엇일지 생각하면 됩니다.',
      check: {
        type: 'choice',
        q: '다음 정의에 맞는 구체적인 예는 무엇입니까?\n\nDelayed gratification refers to giving up a small reward now in order to get a bigger one later.',
        choices: [
          '새 자전거를 사려고 몇 달 동안 간식비를 모으는 것',
          '배가 고파서 용돈으로 곧바로 간식을 사 먹는 것',
          '친구가 새로 산 자전거를 부러워하는 것',
        ],
        answer: 0,
        why: ['', '지금의 작은 즐거움을 바로 누린 것이라 정의와 반대입니다.', '부러워하는 마음일 뿐, 지금의 보상을 참고 나중의 더 큰 보상을 얻는 행동이 아닙니다.'],
        explain: '지금의 작은 보상(간식)을 참고 나중의 더 큰 보상(자전거)을 얻으려 하는 것이 **delayed gratification**의 구체적인 예입니다.',
      },
    },
    {
      title: '빈칸을 다시 설명하는 문장 찾기 (재진술)',
      body: '빈칸 글에서 가장 강력한 단서는 **빈칸의 내용을 다른 말로 다시 말하는 문장**입니다. 글쓴이는 중요한 생각을 한 번만 말하지 않고, 예를 들거나 바꿔 말하며 되풀이합니다.\n\n' +
        '| 재진술 신호 | 어디를 보나 |\n|---|---|\n' +
        '| In other words, ~ / That is, ~ / To put it simply, ~ | 바로 뒤가 빈칸의 바꿔 말하기 |\n' +
        '| In short, ~ / In sum, ~ / Simply put, ~ | 앞 내용을 줄여 다시 말함 |\n' +
        '| For example, ~ / For instance, ~ | 빈칸의 내용을 장면으로 보여 줌 |\n' +
        '| 같은 뜻의 낱말 사슬 | active → nod, ask, repeat → not passive |\n\n' +
        '빈칸이 글 앞쪽에 있으면 **뒤에서**, 뒤쪽에 있으면 **앞에서** 재진술을 찾습니다. 재진술 문장을 찾으면 그 문장의 핵심어와 **같은 뜻**인 선택지가 정답입니다.\n\n' +
        '> ⚠️ 재진술 문장의 낱말이 선택지에 **그대로** 나온다고 정답인 것은 아닙니다. 같은 낱말을 쓰고 뜻을 비튼 함정 선택지가 흔합니다. 낱말이 아니라 뜻을 맞추십시오.',
      easy: '친구가 "그 영화 진짜 [[빈칸]]. 그러니까, 처음부터 끝까지 한 번도 하품을 안 했어."라고 말했다고 해 봅시다. 빈칸에 들어갈 말은 "재미있었어"겠지요?\n\n' +
        '"그러니까" 뒤의 말이 빈칸을 다시 설명해 주었기 때문입니다. 영어 글의 In other words, In short가 바로 이 "그러니까"입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nOur team was [[빈칸]] on the day of the final match. In other words, nobody was late, everyone wore the right uniform, and we had all practiced our plays.',
        choices: ['fully prepared', 'very nervous', 'too tired to play'],
        answer: 0,
        why: ['', '떨렸다는 내용은 In other words 뒤에 없습니다. 재진술 문장은 준비가 잘 되었다는 장면들뿐입니다.', '지쳤다는 단서는 없습니다. 모두 제시간에 오고 연습을 마쳤다는 것은 준비가 되었다는 뜻입니다.'],
        explain: '**In other words** 뒤에 아무도 늦지 않았고, 모두 알맞은 유니폼을 입었고, 작전을 모두 연습했다는 장면이 나옵니다. 이것을 묶으면 **fully prepared**(완전히 준비된)입니다.',
      },
    },
    {
      title: '부정어·대조가 섞인 빈칸 문장 읽기',
      body: '빈칸 문장에 **부정어나 대조 표현**이 있으면 빈칸에 들어갈 뜻의 방향이 뒤집힙니다. 이 표현들을 놓치면 정반대의 선택지를 고르게 됩니다.\n\n' +
        '| 표현 | 뜻 | 빈칸이 B 자리일 때 |\n|---|---|---|\n' +
        '| **not A but B** / B, **not** A | A가 아니라 B | A와 반대되는 내용 |\n' +
        '| **rather than** A, B / **instead of** A, B | A 대신 B | 빈칸이 A 자리면 B와 반대되는 내용 |\n' +
        '| **few / little** | 거의 없는 | "거의 없다"가 되어도 말이 되는 내용 |\n' +
        '| **unless** ~ | ~하지 않으면 (= if not) | 조건의 방향을 뒤집어 확인 |\n' +
        '| **fail to** ~ | ~하지 못하다 | 하지 못한 일 |\n' +
        '| **far from** ~ing | 전혀 ~이 아닌 | 실제 결과와 반대되는 내용 |\n\n' +
        '읽는 방법: 빈칸 문장을 **부정의 뜻이 드러나게 풀어** 한 번 더 읽어 봅니다. 예를 들어 "Few students [[빈칸]]"은 "대부분의 학생은 [[빈칸]]하지 않았다"로 바꾸면 방향이 분명해집니다.\n\n' +
        '> 💡 However, Yet, Instead 같은 연결어로 문장 사이에 대조가 있으면, 빈칸은 **대조되는 앞 문장과 반대 방향**입니다. 글 B에서 "갑자기 아무 데서나 나온다"는 통념과 반대되는 내용이 Instead 뒤 빈칸에 들어갑니다.',
      easy: '"나는 피자를 **먹지 않고** [[빈칸]]을 먹었다."라는 문장에서 빈칸에 "피자"가 들어가면 이상하지요? 피자가 아닌 다른 음식이 들어가야 합니다.\n\n' +
        '영어의 not A but B, instead of도 같습니다. "A가 아니라" 뒤에는 A와 다른 것, A와 반대되는 것이 옵니다. 부정어를 보면 동그라미를 쳐 두고 방향을 한 번 더 확인하십시오.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nThe purpose of the quiz is not to rank students but to [[빈칸]].',
        choices: ['show them what they still need to learn', 'find out who is the best student in the class', 'make every student feel nervous'],
        answer: 0,
        why: ['', '"가장 잘하는 학생을 가리는 것"은 rank students와 같은 뜻입니다. not A but B에서 B는 A와 달라야 합니다.', '학생을 긴장하게 만드는 것은 퀴즈의 목적이라고 보기 어렵고, 글에 단서도 없습니다.'],
        explain: '**not A but B**: 퀴즈의 목적은 순위를 매기는 것(A)이 **아니라** B입니다. B에는 A와 다른, 학생에게 도움이 되는 목적, 곧 아직 더 배워야 할 것을 알려 주는 것이 들어갑니다.',
      },
    },
    {
      title: '글과 반대되거나 지나치게 일반화한 선택지 걸러 내기',
      body: '구·절 빈칸 문제의 오답은 대개 몇 가지 꼴로 만들어집니다. 꼴을 알면 남은 선택지를 빠르게 줄일 수 있습니다.\n\n' +
        '| 오답의 꼴 | 알아보는 법 | 예 (글 D) |\n|---|---|---|\n' +
        '| **반대** | 글쓴이가 비판한 생각(통념)과 같은 뜻 | that we fill every hour with tasks |\n' +
        '| **지나친 일반화** | always, never, all, only, completely 같은 말로 글보다 넓게 말함 | that busy people are always less successful |\n' +
        '| **세부에 갇힘** | 예시 속 낱말만 옮겨 와 요지를 놓침 | how neatly we can copy our notes |\n' +
        '| **글에 없음** | 그럴듯하지만 글에 근거가 없음 | that we sleep at least eight hours |\n\n' +
        '정답은 대개 **글의 요지와 같은 방향**이면서, 글이 말한 **범위만큼만** 말합니다. 글에 may, often, tend to 같은 말이 있는데 선택지가 always, never로 단정하면 의심하십시오.\n\n' +
        '> ⚠️ 지나친 일반화를 고르는 학생의 생각은 "방향은 맞잖아?"입니다. 방향이 맞아도 **정도**가 글보다 세면 오답입니다.',
      easy: '친구가 "이 식당 김치찌개가 맛있어"라고 했는데, 다른 친구에게 "걔가 그러는데 이 식당 음식은 **전부 다** 세상에서 **제일** 맛있대"라고 전하면 틀린 말이 되지요.\n\n' +
        '방향(맛있다)은 같아도 범위(김치찌개 → 전부)와 정도(맛있다 → 세상에서 제일)를 부풀렸기 때문입니다. 빈칸 선택지에서 all, always, only, never를 보면 "부풀린 건 아닐까?" 하고 글과 다시 맞춰 보십시오.',
      check: {
        type: 'ox',
        q: '글에 "Reading before bed helps some people fall asleep faster."라고 나왔다면, "Reading before bed makes everyone fall asleep immediately."는 글과 같은 방향이므로 알맞은 선택지이다.',
        answer: false,
        explain: '방향은 같아 보여도 some people → **everyone**, faster → **immediately**로 범위와 정도를 부풀린 **지나친 일반화**입니다. 정답은 글이 말한 범위만큼만 말합니다.',
      },
    },
    {
      title: '선택지를 보기 전에 빈칸을 내 말로 먼저 채우기',
      body: '구·절 빈칸 선택지는 모두 길고 그럴듯해서, 선택지부터 읽으면 쉽게 흔들립니다. 그래서 **선택지를 가린 채** 빈칸을 먼저 내 말로 채우는 것이 가장 안전한 순서입니다.\n\n' +
        '1. **빈칸 문장**을 읽고 무엇을 찾아야 하는지 정합니다. (빈칸이 주어인가? 방법인가? 원인인가? 부정어가 있는가?)\n' +
        '2. 글을 읽으며 **재진술·예시·대조** 단서에 표시합니다.\n' +
        '3. 단서를 바탕으로 빈칸을 **우리말 한 구절**로 채워 봅니다. 완벽한 영어일 필요는 없습니다.\n' +
        '4. 선택지를 읽고 **내 말과 뜻이 가장 가까운 것**을 고릅니다. 비슷한 것이 둘이면 반대·지나친 일반화·세부 꼴을 걸러 냅니다.\n' +
        '5. 고른 선택지를 빈칸에 넣고 **글 전체를 다시 읽어** 흐름이 자연스러운지 확인합니다.\n\n' +
        '예: 글 A의 빈칸을 내 말로 채우면 "대화에 적극적으로 참여한다"입니다. 그다음 선택지에서 이 뜻을 영어로 나타낸 것을 찾으면 됩니다.\n\n' +
        '> 💡 내 말로 채우기가 어렵다면 빈칸 주변의 핵심어(active, not passive)만이라도 먼저 적어 두십시오. 그 낱말과 같은 방향의 선택지가 후보가 됩니다.',
      easy: '시험 문제를 풀 때 보기를 먼저 보면 "이것도 맞는 것 같고 저것도 맞는 것 같고…" 하며 헷갈리지요?\n\n' +
        '그래서 보기를 손으로 가리고 "내가 글쓴이라면 여기에 무슨 말을 썼을까?"를 먼저 정합니다. 장보기 전에 살 것을 적어 가면 이것저것 사지 않게 되는 것처럼, 내 답을 먼저 정해 두면 그럴듯한 오답에 흔들리지 않습니다.',
      check: {
        type: 'choice',
        q: '구·절 빈칸 문제를 푸는 순서로 가장 알맞은 것은 무엇입니까?',
        choices: [
          '단서를 찾아 빈칸을 내 말로 먼저 채운 뒤 선택지와 비교한다.',
          '선택지를 먼저 모두 읽고, 글에서 같은 낱말이 많이 나오는 것을 고른다.',
          '빈칸 바로 앞 낱말만 보고 어법상 이어지는 선택지를 고른다.',
        ],
        answer: 0,
        why: ['', '같은 낱말이 많이 나온다고 정답은 아닙니다. 글의 낱말을 쓰고 뜻을 비튼 함정 선택지가 흔합니다.', '구·절 빈칸은 글 전체의 흐름과 요지를 묻는 문제라서 바로 앞 낱말만으로는 풀 수 없습니다.'],
        explain: '단서(재진술·예시·대조)로 빈칸의 뜻을 **내 말로 먼저** 정한 뒤 선택지와 비교하면 그럴듯한 오답에 흔들리지 않습니다.',
      },
    },
  ],

  examples: [
    {
      q: '글 A의 빈칸에 들어갈 말을 순서대로 찾아보십시오.\n\n' + LISTEN,
      steps: [
        '빈칸 문장: They [[빈칸]]. — 잘 듣는 사람이 "무엇을 하는지"가 빈칸입니다. 앞 문장의 do more than stay quiet(가만히 있는 것 이상을 한다)가 방향을 알려 줍니다.',
        '예시 단서: **For example**, they nod, ask questions, and repeat key points. — 고개를 끄덕이고, 질문하고, 요점을 되풀이합니다.',
        '재진술 단서: **In other words**, listening well is an **active** process, **not a passive** one.',
        '내 말로 채우기: "대화에 적극적으로 참여한다."',
        '선택지 가운데 이 뜻인 take an active part in the conversation을 고르고, 가만히 기다린다(반대)·늘 동의한다(글에 없음) 같은 선택지를 걸러 냅니다.',
      ],
      answer: 'take an active part in the conversation (대화에 적극적으로 참여한다)',
    },
    {
      q: '글 B의 빈칸을 부정어·대조에 주의하여 채워 보십시오.\n\n' + CREATIVE,
      steps: [
        '첫 문장은 통념입니다: 창의성은 아무 데서나 갑자기 번쩍 떠오르는 영감이다.',
        '**However**, most creative ideas **do not** appear out of thin air. — 통념을 부정합니다.',
        '**Instead**, they [[빈칸]]. — Instead는 "그 대신"이므로 빈칸에는 "갑자기 아무 데서나 나온다"와 반대되는 내용이 들어갑니다.',
        '예시 단서: 익숙한 재료를 새롭게 섞은 요리법, 이미 있는 기계를 고친 발명품 → 이미 있는 것들을 엮어서 나온다.',
        '내 말로 채우기: "이미 있는 것들을 새롭게 결합해서 생겨난다."',
      ],
      answer: 'grow out of combining things that already exist (이미 있는 것들을 결합하는 데서 생겨난다)',
    },
  ],

  terms: [
    { term: '구·절 빈칸 추론', def: '글의 한 부분이 낱말 하나가 아니라 긴 어구나 절로 비어 있을 때, 글의 흐름과 단서로 알맞은 말을 찾는 문제입니다.' },
    { term: '추상적인 말', def: '눈에 보이지 않는 생각·개념을 가리키는 말입니다. 예: creativity, opportunity cost, willpower' },
    { term: '구체적인 예', def: '추상적인 말을 실제 장면으로 보여 주는 내용입니다. 예: 익숙한 재료를 새롭게 섞은 요리법(창의성의 예)' },
    { term: '재진술', def: '앞에서 한 말을 다른 말로 다시 하는 것입니다. 신호: In other words, That is, In short' },
    { term: '대조', def: '두 내용을 반대 방향으로 맞세우는 것입니다. 신호: However, Instead, not A but B, rather than' },
    { term: '지나친 일반화', def: '글이 말한 것보다 범위나 정도를 부풀려 말하는 것입니다. always, never, all, only 같은 말이 자주 붙습니다.' },
    { term: '기회비용 (opportunity cost)', def: '어떤 것을 고르느라 포기한 다른 선택의 가치입니다. 예: 게임을 하느라 하지 못한 독서와 휴식' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 1,
      q: '앞 내용을 **같은 뜻의 다른 말로 다시** 설명할 때 쓰는 표현은 무엇입니까?',
      choices: ['In other words', 'However', 'As a result', 'On the other hand'],
      answer: 0,
      why: [
        '',
        'However는 앞 내용과 반대되는 내용을 이끄는 대조 표현입니다.',
        'As a result는 앞 내용의 결과를 이끄는 표현입니다.',
        'On the other hand는 다른 측면이나 반대 입장을 이끄는 표현입니다.',
      ],
      explain: '**In other words**(다시 말해)는 앞 내용을 다른 말로 다시 설명하는 재진술 신호입니다. 빈칸 앞뒤에 이 표현이 있으면 가장 강력한 단서가 됩니다.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
      q: '빈칸에 알맞은 영어 낱말 한 개를 쓰십시오.\n\nWater expands when it freezes. In other [[빈칸]], ice takes up more space than the water it came from.',
      answer: ['words'],
      wrong: [
        { a: 'word', why: '이 표현은 늘 복수형으로 씁니다: In other words' },
        { a: 'ways', why: 'in other ways는 "다른 면에서"라는 뜻입니다. 같은 내용을 바꿔 말하는 표현은 In other words입니다.' },
      ],
      explain: '**In other words**(다시 말해)는 앞 문장(물은 얼면 부피가 늘어난다)을 다른 말(얼음은 원래 물보다 자리를 더 차지한다)로 다시 설명합니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '글 A의 빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + LISTEN,
      choices: [
        'take an active part in the conversation',
        'wait silently until the speaker has completely finished',
        'always agree with whatever the speaker says',
        'avoid asking questions so that they do not interrupt',
      ],
      answer: 0,
      why: [
        '',
        '첫 문장에서 잘 듣는 사람은 가만히 있는 것(stay quiet) 이상을 한다고 했습니다. 반대 방향입니다.',
        '늘 동의한다는 내용은 글에 없고, always로 부풀린 말입니다.',
        '예시에서 잘 듣는 사람은 질문을 한다(ask questions)고 했습니다. 반대 방향입니다.',
      ],
      hint: 'In other words 뒤의 문장이 빈칸을 다시 설명합니다.',
      explain: '**In other words, listening well is an active process, not a passive one.** 재진술 문장의 active와 예시(끄덕이기, 질문하기, 요점 되풀이하기)를 묶으면 "대화에 적극적으로 참여한다"입니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 0,
      q: '다음 정의를 읽고, 이 개념의 구체적인 예로 가장 알맞은 것을 고르십시오.\n\nSocial influence refers to the way people change their thoughts or actions because of other people.',
      choices: [
        '친구들이 모두 그 노래를 좋아해서 나도 그 노래를 자주 듣게 되는 것',
        '혼자 산책하다가 날씨가 좋아서 기분이 밝아지는 것',
        '배가 고파서 냉장고에서 우유를 꺼내 마시는 것',
        '시험 범위를 확인하려고 교과서 차례를 살펴보는 것',
      ],
      answer: 0,
      why: [
        '',
        '날씨 때문에 기분이 바뀐 것이지, 다른 사람 때문이 아닙니다.',
        '배고픔 때문에 한 행동으로, 다른 사람의 영향과 상관없습니다.',
        '스스로 필요해서 한 행동입니다. because of other people이 빠졌습니다.',
      ],
      explain: '정의의 핵심은 **because of other people**(다른 사람 때문에) 생각이나 행동이 바뀌는 것입니다. 친구들 때문에 내 음악 취향이 바뀐 첫 번째가 구체적인 예입니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nThe test was so difficult that few students [[빈칸]].',
      choices: ['got a perfect score', 'found it hard', 'made mistakes on it', 'needed more time'],
      answer: 0,
      why: [
        '',
        'few students found it hard는 "어렵다고 느낀 학생이 거의 없었다"는 뜻이 되어 시험이 매우 어려웠다는 앞 내용과 어긋납니다.',
        '"실수한 학생이 거의 없었다"가 되어 시험이 어려웠다는 내용과 맞지 않습니다.',
        '"시간이 더 필요한 학생이 거의 없었다"가 되어 어려운 시험과 어울리지 않습니다.',
      ],
      hint: 'few는 "거의 없는"입니다. 빈칸을 넣어 "~한 학생이 거의 없었다"로 읽어 보십시오.',
      explain: '**few**는 "거의 없는"이라는 부정의 뜻입니다. 시험이 매우 어려웠으므로 "만점을 받은 학생이 **거의 없었다**"가 자연스럽습니다.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 2,
      q: '"Unless you water the seeds, they will not sprout."는 "씨앗에 물을 주면 싹이 트지 않는다"는 뜻이다.',
      answer: false,
      explain: '**unless**는 "~하지 않으면"(= if not)입니다. "씨앗에 물을 **주지 않으면** 싹이 트지 않는다"는 뜻입니다. unless를 if로 읽으면 뜻이 정반대가 됩니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '글에 "Reading before bed helps some people fall asleep faster."라고 나왔습니다. 이 글을 바탕으로 할 때 **지나치게 일반화한** 문장은 무엇입니까?',
      choices: [
        'Reading before bed makes everyone fall asleep immediately.',
        'Some people find it easier to fall asleep after reading.',
        'Reading can be part of a relaxing bedtime routine for some people.',
        'Not everyone may fall asleep faster after reading.',
      ],
      answer: 0,
      why: [
        '',
        '글의 some people을 그대로 지킨 문장입니다.',
        'for some people로 범위를 지켰습니다.',
        '글이 some people이라고 했으므로 모든 사람에게 해당하지는 않을 수 있다는 말은 글과 맞습니다.',
      ],
      explain: 'some people → **everyone**, faster → **immediately**로 범위와 정도를 모두 부풀렸습니다. 정답 선택지는 글이 말한 범위만큼만 말합니다.',
    },
    {
      id: 'p8', level: 1, type: 'order', concept: 4,
      q: '구·절 빈칸 문제를 푸는 순서대로 배열하십시오.',
      choices: [
        '글을 읽으며 재진술·예시·대조 단서에 표시한다.',
        '단서를 바탕으로 빈칸을 내 말로 먼저 채운다.',
        '선택지를 읽고 내 말과 뜻이 가장 가까운 것을 고른다.',
        '고른 선택지를 빈칸에 넣고 글 전체를 다시 읽어 확인한다.',
      ],
      answer: [0, 1, 2, 3],
      hint: '선택지는 내 답을 정한 다음에 봅니다.',
      explain: '단서 찾기 → 내 말로 채우기 → 선택지와 비교하기 → 넣어서 다시 읽기. 선택지를 보기 전에 내 답을 정해 두는 것이 핵심입니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 2,
      q: '글 B의 빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + CREATIVE,
      choices: [
        'grow out of combining things that already exist',
        'come suddenly, with no connection to any earlier ideas',
        'are produced only by a few gifted people',
        'depend entirely on luck and good timing',
      ],
      answer: 0,
      why: [
        '',
        '첫 문장의 통념(a sudden flash ~ from nowhere)과 같은 뜻입니다. However와 Instead로 이 생각을 뒤집었으므로 반대 방향입니다.',
        '재능 있는 몇 사람만 창의적이라는 내용은 글에 없고, only로 범위를 좁혀 단정했습니다.',
        '운에 달렸다는 것은 "갑자기 아무 데서나 나온다"는 통념에 가깝습니다. 예시와도 맞지 않습니다.',
      ],
      hint: 'Instead는 "그 대신"입니다. 무엇의 대신인지, 그리고 For instance 뒤의 예가 무엇을 보여 주는지 확인하십시오.',
      explain: '**However** ~ **do not** appear out of thin air. **Instead**, they [[빈칸]]. — 빈칸은 "아무 데서나 갑자기"와 반대입니다. 익숙한 재료를 새롭게 섞은 요리법, 이미 있는 기계를 고친 발명품이라는 예를 묶으면 "이미 있는 것들을 결합하는 데서 생겨난다"입니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 0,
      q: '글 C의 빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + COST,
      choices: [
        'the other things you could have done with that time',
        'the price of the game that you are playing',
        'the fun you get from winning the game',
        'the time that other people spend on games',
      ],
      answer: 0,
      why: [
        '',
        '게임에 드는 돈은 not only the money you might spend에서 이미 말했습니다. but also 뒤에는 돈 말고 다른 비용이 와야 합니다.',
        '게임에서 얻는 즐거움은 비용이 아니라 얻는 것입니다.',
        '다른 사람의 시간은 내 선택의 비용과 상관없습니다.',
      ],
      hint: 'such as 뒤의 예(독서, 친구 만나기, 휴식)를 하나로 묶어 보십시오.',
      explain: '**not only A but also B**: 비용은 돈(A)뿐 아니라 B입니다. such as 뒤의 예(책 읽기, 친구 만나기, 쉬기)는 게임을 하느라 **하지 못한 다른 일들**입니다. 이것이 기회비용이라는 추상적인 개념의 구체적인 모습입니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '글 D의 빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + BUSY,
      choices: [
        'not how much time we spend but how we use it',
        'that we fill every hour of the day with tasks',
        'that busy people are always less successful than others',
        'how neatly and carefully we can copy our notes',
      ],
      answer: 0,
      why: [
        '',
        '바쁜 것이 곧 생산적이라는 통념과 같은 뜻입니다. 글은 이 생각을 But으로 뒤집었습니다.',
        '방향은 비슷해 보이지만 always로 부풀린 지나친 일반화입니다. 글은 바쁘다고 늘 중요한 일을 하는 것은 아니라고 했을 뿐입니다.',
        '예시 속 낱말(copying notes neatly)만 옮겨 왔습니다. 글은 오히려 깔끔하게 베껴 쓴 학생이 덜 배울 수 있다고 했습니다.',
      ],
      hint: '두 학생의 예에서 무엇이 차이를 만들었는지 생각해 보십시오.',
      explain: '몇 시간 동안 필기를 베낀 학생보다 30분 동안 스스로 시험해 본 학생이 더 많이 배울 수 있다는 예는 **시간의 양이 아니라 쓰는 방법**이 중요하다는 것을 보여 줍니다.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 영어 낱말 한 개를 쓰십시오. (f로 시작합니다.)\n\nMina studied very hard, but she [[빈칸]] to pass the test because she misread the instructions.',
      answer: ['failed'],
      wrong: [
        { a: 'managed', why: 'managed to pass는 "가까스로 통과했다"는 뜻이라 but과 because 뒤의 내용(지시문을 잘못 읽음)과 맞지 않습니다.' },
        { a: 'fail', why: '과거의 일이므로 과거형 failed로 씁니다.' },
      ],
      explain: '**fail to** ~는 "~하지 못하다"입니다. 열심히 공부했지만(but) 지시문을 잘못 읽어서(because) 시험에 **통과하지 못했다(failed to pass)**는 흐름입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      q: '글 E의 빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + HABIT,
      choices: [
        'change the space around us',
        'try much harder to control ourselves',
        'stop keeping food anywhere in the kitchen',
        'make a promise to ourselves and never break it',
      ],
      answer: 0,
      why: [
        '',
        '첫 문장의 "의지력 부족 탓"과 같은 방향입니다. 글은 Yet으로 이 생각을 뒤집었습니다.',
        '예시 속 부엌을 지나치게 넓혀 엉뚱한 결론을 냈습니다. 글은 과일을 눈에 띄게 두면 더 먹는다고 했습니다.',
        '스스로의 다짐(의지력)에 기대는 방법이라 글의 요지(주변 환경)와 반대 방향이고, never로 단정했습니다.',
      ],
      hint: 'Yet 뒤의 문장과 두 가지 예(과일 그릇, 다른 방에 둔 휴대 전화)가 공통으로 바꾼 것이 무엇인지 보십시오.',
      explain: '**Yet our surroundings may matter more than we think.** 과일을 식탁에 두기, 휴대 전화를 다른 방에 두기는 모두 **주변 환경을 바꾼** 예입니다. **In short** 뒤의 빈칸은 이것을 다시 말하므로 change the space around us가 알맞습니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nMuseums today increasingly want visitors to [[빈칸]]. Rather than simply looking at objects behind glass, visitors can now touch copies of ancient tools, try on traditional clothes, or build simple machines themselves.',
      choices: [
        'learn by doing things with their own hands',
        'look at objects quietly from a safe distance',
        'avoid touching anything inside the building',
        'buy copies of ancient tools in the gift shop to take home with them',
      ],
      answer: 0,
      why: [
        '',
        'Rather than simply looking at objects behind glass(유리 너머로 보기만 하는 것 대신)의 "보기만 하는 것"에 해당합니다. 박물관이 바라는 것과 반대입니다.',
        '방문객이 도구 복제품을 만지고 옷을 입어 본다고 했으므로 반대입니다.',
        '선물 가게나 물건 사기는 글에 나오지 않습니다. tools, copies 같은 낱말만 빌려 온 함정입니다.',
      ],
      hint: 'Rather than A, B에서 A와 B 가운데 빈칸과 같은 쪽은 어느 것입니까?',
      explain: '**Rather than** simply looking(보기만 하는 것 **대신**), 만지고, 입어 보고, 직접 만듭니다. 이 예들을 묶으면 "직접 손으로 해 보며 배운다"입니다. 빈칸은 rather than 뒤의 내용과 반대 방향입니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 0,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nWhen people are unsure how to act, they often [[빈칸]]. For instance, a traveler choosing between two restaurants may pick the one with a long line, assuming that so many diners cannot be wrong. Similarly, people are more likely to give to a charity when they hear that many of their neighbors already have.',
      choices: [
        'look at what others are doing and follow them',
        'choose the option that the fewest people have picked',
        'trust only their own past experience',
        'always end up making the wisest possible choice',
      ],
      answer: 0,
      why: [
        '',
        '줄이 긴 식당을 고르는 예와 정반대입니다.',
        '두 예 모두 자기 경험이 아니라 다른 사람들의 행동(긴 줄, 이웃의 기부)을 보고 결정했습니다.',
        '많은 사람을 따른 선택이 늘 가장 현명하다는 말은 글에 없습니다. always로 부풀린 지나친 일반화입니다.',
      ],
      hint: 'For instance와 Similarly 뒤의 두 예에서 사람들이 결정을 내린 근거가 무엇인지 찾으십시오.',
      explain: '두 예(줄이 긴 식당 고르기, 이웃이 이미 기부했다는 말을 듣고 기부하기)는 모두 **다른 사람들의 행동을 보고 따라 하는** 장면입니다. 추상적인 빈칸을 예에서 끌어내는 문제입니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nSome say that people who make many mistakes are simply careless. But mistakes are not always a sign of carelessness. Often, they are a sign that someone is [[빈칸]]. A child learning to ride a bike falls many times precisely because she is trying something she cannot do yet.',
      choices: [
        'attempting something beyond their present ability',
        'not paying attention to what they are doing',
        'unable to learn anything from experience',
        'too afraid to try anything new or difficult',
      ],
      answer: 0,
      why: [
        '',
        '주의를 기울이지 않는 것은 carelessness(부주의)와 같은 뜻입니다. 글은 But으로 이 생각을 뒤집었습니다.',
        '경험에서 배울 수 없다는 말은 글에 없고, 자전거를 배우는 아이의 예와도 맞지 않습니다.',
        '아이는 아직 못 하는 일에 도전하고 있습니다. 새로운 일을 두려워하는 것과 반대입니다.',
      ],
      hint: 'not always ~ 로 무엇을 부정했는지, 자전거 예의 because 뒤가 무엇인지 보십시오.',
      explain: '**not always a sign of carelessness**로 "실수 = 부주의"라는 생각을 부정한 뒤, 자전거 예에서 아이가 넘어지는 까닭을 **trying something she cannot do yet**이라고 했습니다. 이것을 다시 말한 attempting something beyond their present ability가 알맞습니다.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: '한 학생이 선택지를 보기 전에 다음 글의 빈칸을 "책을 보지 않고 스스로 떠올려 보기"라고 채웠습니다. 이 생각과 뜻이 가장 가까운 선택지는 무엇입니까?\n\nMany students reread their textbooks again and again before a test. Rereading feels comfortable, but it can create a false sense of knowing the material. A more effective method is to close the book and [[빈칸]]. When you try to recall answers on your own, you quickly discover what you really know and what you do not.',
      choices: [
        'try to bring the key points back to mind without looking',
        'read the same pages once more, this time very slowly',
        'highlight every important sentence in bright colors',
        'ask a friend to read the whole chapter aloud to you',
      ],
      answer: 0,
      why: [
        '',
        '다시 읽기(reread)는 글쓴이가 편하지만 착각을 줄 수 있다고 한 방법입니다. 천천히 읽어도 다시 읽기입니다.',
        '책을 덮은(close the book) 뒤에 할 수 없는 일이고, 스스로 떠올리기와도 다릅니다.',
        '친구가 읽어 주는 것을 듣는 것은 스스로 떠올리는 것(recall on your own)이 아닙니다.',
      ],
      hint: '빈칸 뒤 문장의 recall answers on your own이 빈칸을 다시 설명합니다.',
      explain: '빈칸 뒤의 **When you try to recall answers on your own** ~ 이 빈칸의 재진술입니다. 내 말로 채운 "스스로 떠올려 보기"와 같은 뜻인 첫 번째가 정답입니다. close the book과 without looking도 서로 맞습니다.',
    },
  ],

  deeper: [
    {
      title: '빈칸은 왜 늘 요지 근처에 있을까',
      body: '구·절 빈칸 문제를 많이 풀어 보면 빈칸이 대개 **글의 요지를 담은 문장**에 있다는 것을 알게 됩니다. 출제자는 글을 정말 이해했는지 확인하려고 가장 중요한 생각을 비워 두기 때문입니다.\n\n' +
        '그래서 빈칸 문제는 결국 **요지 찾기 문제**이기도 합니다. 앞 단원들에서 익힌 것이 모두 쓰입니다.\n\n' +
        '- 통념-반박 구조라면 빈칸은 반박 쪽 → 통념과 반대 방향\n' +
        '- 일화 → 주장 구조라면 빈칸은 일반화된 주장 → 일화를 한 문장으로 묶은 내용\n' +
        '- 여러 관점이 나오는 글이라면 빈칸은 글쓴이의 관점 → 인용된 관점과 구별\n\n' +
        '빈칸 문장이 글 맨 앞이나 맨 뒤에 있다면 특히 요지일 가능성이 큽니다. 이때는 글 전체가 빈칸의 재진술이라고 생각하고 읽으십시오.',
    },
    {
      title: '추상과 구체를 오가는 연습',
      body: '빈칸 추론을 잘하는 사람은 **추상적인 말 ↔ 구체적인 장면**을 빠르게 오갑니다. 평소에 다음 연습을 해 보십시오.\n\n' +
        '1. 어려운 개념어(sustainability, empathy, efficiency …)를 만나면 그 뜻을 보여 주는 장면을 하나씩 떠올려 적습니다.\n' +
        '2. 거꾸로, 신문이나 글에서 본 구체적인 사례(일회용 컵 대신 텀블러 쓰기)를 한 낱말의 개념으로 묶어 봅니다(sustainability).\n' +
        '3. 영어 글을 읽은 뒤 글 전체를 우리말 한 구절로 줄여 봅니다. 이것이 "빈칸을 내 말로 채우기"의 바탕이 됩니다.\n\n' +
        '이 연습은 시험뿐 아니라 대학과 직장에서 긴 보고서를 읽고 핵심을 정리할 때도 그대로 쓰입니다.',
    },
  ],

  faq: [
    {
      q: '선택지 두 개가 다 맞는 것 같으면 어떻게 골라요?',
      a: '두 선택지를 빈칸에 하나씩 넣고 글 전체를 다시 읽어 보십시오. 그리고 각 선택지가 글보다 넓게 말하지 않는지(always, only, all), 글에 근거가 없는 내용을 더하지 않았는지, 예시 속 낱말만 빌려 온 것은 아닌지 확인합니다. 대개 하나는 이 가운데 한 가지 꼴의 함정입니다.',
    },
    {
      q: '빈칸을 내 말로 먼저 채우는 게 시간이 더 걸리지 않나요?',
      a: '처음에는 그렇게 느껴지지만, 선택지 다섯 개를 하나하나 글과 맞춰 보며 흔들리는 것보다 오히려 빠른 경우가 많습니다. 완벽한 문장이 아니라 "적극적으로 참여한다", "환경을 바꾼다"처럼 짧은 우리말 구절이면 충분합니다.',
    },
    {
      q: 'few랑 a few는 뭐가 달라요?',
      a: 'few는 "거의 없는"이라는 부정의 뜻이고, a few는 "몇몇의, 조금 있는"이라는 긍정의 뜻입니다. Few students passed.는 "통과한 학생이 거의 없었다", A few students passed.는 "몇몇 학생은 통과했다"입니다. 빈칸 문장에 few가 있으면 부정문으로 바꾸어 읽어 보십시오.',
    },
  ],

  mistakes: [
    '빈칸 문장의 부정어(not, few, unless, fail to)를 놓쳐 정반대의 선택지를 고르는 실수 — 빈칸 문장을 부정의 뜻이 드러나게 풀어 다시 읽습니다.',
    '방향은 맞지만 always, only, all로 부풀린 선택지를 고르는 실수 — 정답은 글이 말한 범위만큼만 말합니다.',
    '글에 나온 낱말이 많이 들어 있다는 까닭만으로 선택지를 고르는 실수 — 낱말이 아니라 뜻이 재진술 문장과 같은지 확인합니다.',
  ],

  gens: [
    {
      id: 'negation-blank',
      level: 2,
      title: '부정어·대조가 있는 빈칸 채우기',
      make: function (R) {
        var items = [
          { s: 'Rather than [[빈칸]], the new library encourages people to talk and work together.',
            ok: 'asking everyone to stay silent',
            bad: [['inviting people to share their ideas', '주절(이야기하고 함께 일하기)과 같은 방향입니다. Rather than A, B에서 A는 B와 반대여야 합니다.'],
              ['helping people work in groups', '주절과 같은 방향입니다. rather than 뒤에는 도서관이 하지 않는 일이 옵니다.'],
              ['letting people chat freely', '자유롭게 이야기하게 하는 것은 주절과 같은 방향입니다.']],
            why: '**Rather than A, B** = A 대신 B. B가 "이야기하고 함께 일하기"이므로 A에는 그 반대인 **모두에게 조용히 하라고 하는 것**이 들어갑니다.' },
          { s: 'The test was so difficult that few students [[빈칸]].',
            ok: 'finished it in time',
            bad: [['found it hard', '"어렵다고 느낀 학생이 거의 없었다"가 되어 시험이 어려웠다는 앞 내용과 어긋납니다.'],
              ['made mistakes on it', '"실수한 학생이 거의 없었다"가 되어 어려운 시험과 맞지 않습니다.'],
              ['needed extra time', '"시간이 더 필요한 학생이 거의 없었다"가 되어 어려운 시험과 맞지 않습니다.']],
            why: '**few** = 거의 없는. 시험이 매우 어려웠으므로 "제시간에 다 푼 학생이 **거의 없었다**"가 자연스럽습니다.' },
          { s: 'Unless you [[빈칸]], the seeds will not sprout.',
            ok: 'water them regularly',
            bad: [['forget to water them', 'unless는 "~하지 않으면"입니다. "물 주기를 잊지 않으면 싹이 트지 않는다"는 말이 되어 뜻이 거꾸로입니다.'],
              ['stop giving them water', '"물을 끊지 않으면 싹이 트지 않는다"가 되어 뜻이 거꾸로입니다.'],
              ['leave the soil completely dry', '"흙을 바싹 말려 두지 않으면 싹이 트지 않는다"가 되어 뜻이 거꾸로입니다.']],
            why: '**unless** = if not. "씨앗에 **물을 꾸준히 주지 않으면** 싹이 트지 않는다"가 되어야 자연스럽습니다.' },
          { s: 'Instead of [[빈칸]], Jiwoo walked to school and enjoyed the fresh morning air.',
            ok: 'taking the bus',
            bad: [['going on foot', '걸어가기는 주절(walked)과 같은 행동입니다. Instead of A, B에서 A는 B 대신 하지 않은 일입니다.'],
              ['walking the whole way', '주절의 walked와 같은 행동입니다.'],
              ['enjoying the morning air', '주절에서 실제로 한 일입니다. instead of 뒤에는 하지 않은 일이 옵니다.']],
            why: '**Instead of A, B** = A 대신 B. 지우는 걸어갔으므로 A에는 걷기 대신 하지 않은 일, **버스 타기**가 들어갑니다.' },
          { s: 'Success in a team sport depends not on one star player but on [[빈칸]].',
            ok: 'how well all the players work together',
            bad: [['the skill of the best player alone', 'not A but B에서 A(한 명의 뛰어난 선수)와 같은 뜻입니다.'],
              ['how famous the team captain is', '한 사람(주장)에게 달렸다는 뜻이라 not 뒤의 내용과 같은 방향입니다.'],
              ['the color of the team uniforms', '팀 경기의 성공과 상관없는 내용입니다.']],
            why: '**not A but B**: 성공은 한 명의 스타 선수(A)가 **아니라** B에 달렸습니다. B에는 A와 반대인 "모든 선수가 얼마나 잘 협력하는가"가 들어갑니다.' },
          { s: 'Far from [[빈칸]], the new rule made the hallways even more crowded.',
            ok: 'solving the problem',
            bad: [['making the problem worse', 'far from은 "전혀 ~이 아닌"입니다. "문제를 전혀 악화시키지 않고 더 붐비게 했다"가 되어 앞뒤가 맞지 않습니다.'],
              ['causing more crowding', '"전혀 더 붐비게 하지 않고 더 붐비게 했다"가 되어 앞뒤가 맞지 않습니다.'],
              ['adding to the crowds', '실제 결과(더 붐빔)와 같은 내용이라 far from과 어울리지 않습니다.']],
            why: '**Far from ~ing** = 전혀 ~이 아닌. 새 규칙은 복도를 더 붐비게 했으므로 "문제를 **해결하기는커녕**"이 되어야 합니다.' },
          { s: 'It is not the size of a gift but [[빈칸]] that matters most.',
            ok: 'the thought behind it',
            bad: [['how expensive it looks', '선물의 겉모습·값은 크기(the size)와 같은 방향입니다. not A but B에서 B는 A와 달라야 합니다.'],
              ['how big the box is', '상자의 크기는 not 뒤의 the size of a gift와 같은 뜻입니다.'],
              ['the price written on the tag', '값은 선물의 크기처럼 겉으로 드러나는 것이라 not A와 같은 방향입니다.']],
            why: '**not A but B**: 중요한 것은 선물의 크기(A)가 **아니라** B입니다. 겉으로 보이는 크기·값과 반대인 **선물에 담긴 마음**이 들어갑니다.' },
          { s: 'Hardly anyone [[빈칸]] the old mountain road anymore, so grass has grown over it.',
            ok: 'uses',
            bad: [['avoids', '"그 길을 피하는 사람이 거의 없다"가 되면 많은 사람이 다닌다는 뜻이라 풀이 자랐다는 결과와 맞지 않습니다.'],
              ['stays away from', '"멀리하는 사람이 거의 없다"가 되면 많은 사람이 다닌다는 뜻이 됩니다.'],
              ['refuses to take', '"그 길로 가기를 거부하는 사람이 거의 없다"가 되면 거의 모두가 그 길로 다닌다는 뜻이라 풀이 자랐다는 결과와 맞지 않습니다.']],
            why: '**hardly anyone** = 거의 아무도 ~ 않다. 풀이 자랐으므로 "그 길을 **쓰는** 사람이 거의 없다"가 자연스럽습니다.' },
        ];
        var it = R.pick(items);
        var reason = {};
        it.bad.forEach(function (b) { reason[b[0]] = b[1]; });
        var pick = R.choices(it.ok, it.bad.map(function (b) { return b[0]; }));
        return {
          type: 'choice', concept: 2,
          q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + it.s,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (x) { return x === it.ok ? '' : reason[x]; }),
          explain: it.why,
        };
      },
    },
  ],

  vocab: [
    { w: 'infer', m: '추론하다', ex: 'From her smile, I inferred that she had passed the test.', exm: '그녀의 미소로 보아 나는 그녀가 시험에 붙었다고 추론했습니다.' },
    { w: 'abstract', m: '추상적인', ex: 'Love and freedom are abstract ideas.', exm: '사랑과 자유는 추상적인 개념입니다.' },
    { w: 'concrete', m: '구체적인', ex: 'Can you give me a concrete example?', exm: '구체적인 예를 하나 들어 줄 수 있습니까?' },
    { w: 'restate', m: '다시 말하다, 바꾸어 말하다', ex: 'Let me restate the question in simpler words.', exm: '그 질문을 더 쉬운 말로 다시 말해 보겠습니다.' },
    { w: 'passive', m: '수동적인', ex: 'Watching TV is a passive activity.', exm: 'TV 보기는 수동적인 활동입니다.' },
    { w: 'active', m: '적극적인, 활동적인', ex: 'She plays an active role in the student council.', exm: '그녀는 학생회에서 적극적인 역할을 합니다.' },
    { w: 'creativity', m: '창의성', ex: 'The art class helps students develop their creativity.', exm: '미술 수업은 학생들이 창의성을 기르도록 돕습니다.' },
    { w: 'inspiration', m: '영감', ex: 'The writer found inspiration in her grandmother\'s stories.', exm: '그 작가는 할머니의 이야기에서 영감을 얻었습니다.' },
    { w: 'combine', m: '결합하다, 섞다', ex: 'Combine the flour and the milk in a bowl.', exm: '그릇에 밀가루와 우유를 섞으십시오.' },
    { w: 'productive', m: '생산적인', ex: 'We had a short but productive meeting.', exm: '우리는 짧지만 생산적인 회의를 했습니다.' },
    { w: 'willpower', m: '의지력', ex: 'It takes willpower to get up early every day.', exm: '날마다 일찍 일어나려면 의지력이 필요합니다.' },
    { w: 'surroundings', m: '주변 환경', ex: 'It took the puppy a few days to get used to its new surroundings.', exm: '강아지가 새로운 환경에 익숙해지는 데 며칠이 걸렸습니다.' },
    { w: 'recall', m: '기억해 내다, 떠올리다', ex: 'I can\'t recall the name of that song.', exm: '그 노래 제목이 떠오르지 않습니다.' },
    { w: 'attempt', m: '시도하다; 시도', ex: 'He attempted to climb the wall but failed.', exm: '그는 벽을 오르려고 시도했지만 실패했습니다.' },
    { w: 'exaggerate', m: '과장하다', ex: 'Don\'t exaggerate; the fish wasn\'t that big.', exm: '과장하지 마십시오. 그 물고기는 그렇게 크지 않았습니다.' },
    { w: 'overlook', m: '간과하다, 못 보고 넘어가다', ex: 'It is easy to overlook small mistakes in a long report.', exm: '긴 보고서에서는 작은 실수를 간과하기 쉽습니다.' },
  ],
});
})();
