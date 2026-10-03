/* 공통영어1 · 세부 정보 찾아 읽기
 * 지문은 모두 직접 쓴 글이다(가상의 기관·인물). */
(function () {
  // 안내문 (직접 쓴 글)
  var LIB = '**Riverside Library Summer Reading Challenge**\n\nThe Riverside Library invites students aged 13 to 18 to join this year\'s Summer Reading Challenge. The challenge runs from July 22 to August 16. Participants must read at least five books and write a short review of each one. Reviews can be sent online or handed in at the front desk. Everyone who completes the challenge will receive a certificate and a free tote bag. Registration costs nothing, but only the first 100 students can take part. To sign up, bring your library card to the front desk.';
  // 기사 (직접 쓴 글, 가상의 인물)
  var HANA = 'Hana Kim, a second-year high school student, started a book exchange at her school last spring. She and two friends set up a small shelf near the cafeteria. Students can leave a book they have finished and take a different one for free. The shelf is open every Friday during lunch break. At first, only a few students used it, but now more than 300 books have been exchanged. Hana hopes that other schools will start their own book exchanges.';
  // 요금 안내 (직접 쓴 글, 가상의 박물관)
  var MUSEUM = '**Green Valley Science Museum: Ticket Prices**\n\n- Adults: 9,000 won\n- Students (ages 13 to 18): 6,000 won\n- Children (ages 7 to 12): 4,000 won\n- Children under 7: free\n\nThe museum is open from 10 a.m. to 6 p.m. every day except Mondays. On the last Sunday of every month, all tickets are half price.';
  // 수영장 안내 (직접 쓴 글)
  var POOL = '**Sunrise Community Pool**\n\nOn weekday mornings, the pool is for adults only. Children may swim in the afternoons and on weekends, but those under 10 must be with an adult at all times. Swimming lessons for beginners are held every other Saturday. Towels are not provided, so please bring your own.';

Tutor.registerUnit({
  id: 'eng-h-c1-01',
  course: 'eng-h-c1',
  title: '세부 정보 찾아 읽기',
  summary: '질문의 핵심어를 먼저 확인하고, 글에서 필요한 정보를 빠르고 정확하게 찾아 읽는 방법을 익힙니다.',
  goals: [
    '질문과 선택지에서 핵심어를 골라 글에서 찾아 읽을 부분을 정할 수 있다.',
    '글과 선택지가 같은 뜻을 다른 말로 쓴 표현(바꿔 쓰기)을 알아볼 수 있다.',
    '선택지마다 글의 근거를 찾아 내용 일치·불일치를 판단할 수 있다.',
    'only, at least, up to, every other 같은 수량·빈도·조건 표현을 정확히 읽을 수 있다.',
  ],
  standards: ['[10공영1-01-01]', '[10공영1-01-07]'],

  concepts: [
    {
      title: '질문과 선택지의 핵심어 먼저 확인하기',
      body: '세부 정보를 묻는 문제는 **글보다 질문을 먼저** 읽는 것이 효율적입니다. 무엇을 찾아야 하는지 알고 읽으면 필요 없는 부분에 시간을 덜 씁니다.\n\n**핵심어**는 글에서 답이 있는 자리를 찾게 해 주는 낱말입니다. 다음과 같은 말이 좋은 핵심어가 됩니다.\n\n| 핵심어의 종류 | 예 |\n|---|---|\n| 고유명사·이름 | Riverside Library, Hana |\n| 수·날짜·시각 | July 22, 9 a.m., 100 |\n| 질문에만 나오는 특정 낱말 | children, refund, Friday |\n\n반대로 글 전체에 되풀이되는 낱말(글의 주제어)이나 What, How much 같은 의문사는 위치를 알려 주지 못합니다. 의문사는 **찾을 정보의 종류**(How much → 가격, When → 때)를 알려 줍니다.\n\n> 💡 How much does a ticket for **children** cost? → 위치를 찾는 핵심어는 children, 찾을 정보는 가격(수)입니다.',
      easy: '마트에서 장을 볼 때를 떠올려 보십시오. 사야 할 목록(질문)을 먼저 보고 들어가면 "우유 코너"만 찾아가면 됩니다. 목록 없이 들어가면 진열대를 처음부터 끝까지 다 둘러보게 됩니다.\n\n질문의 핵심어는 바로 그 "코너 이름"입니다. 이름·숫자·날짜처럼 눈에 잘 띄는 낱말을 골라 두면 글에서 금방 찾을 수 있습니다.',
      check: {
        type: 'choice',
        q: '글이 박물관 요금 안내일 때, 다음 질문의 답을 찾으려면 글에서 어떤 낱말을 따라가는 것이 가장 좋습니까?\n\nHow much does a ticket for children cost?',
        choices: ['children', 'ticket', 'How much'],
        answer: 0,
        why: ['', 'ticket은 요금 안내 글 전체에 나오는 말이라 답의 위치를 좁혀 주지 못합니다.', 'How much는 찾을 정보가 "가격"이라는 것을 알려 주지만, 글에서 위치를 찾게 해 주는 낱말은 아닙니다.'],
        explain: '요금 안내에는 ticket이 여러 번 나옵니다. 질문에만 있는 특정 낱말 **children**을 따라가면 어린이 요금이 적힌 줄을 바로 찾을 수 있습니다.',
      },
    },
    {
      title: '핵심어를 따라 필요한 부분만 찾아 읽기 (스캐닝)',
      body: '**스캐닝(scanning)**은 글 전체를 꼼꼼히 읽지 않고, 핵심어가 있는 곳을 눈으로 훑어 찾은 뒤 **그 부분만 자세히** 읽는 방법입니다.\n\n1. 핵심어를 정합니다. (예: Friday)\n2. 글을 빠르게 훑으며 그 낱말이나 그 낱말을 바꿔 쓴 말을 찾습니다. 숫자·대문자·기호는 눈에 잘 띄는 표지입니다.\n3. 찾은 문장과 **앞뒤 한 문장**을 정확히 읽습니다. 조건이나 예외(but, except, only)는 그 근처에 붙어 있는 경우가 많습니다.\n4. 답이 정말 그 문장에서 나오는지 확인합니다.\n\n> ⚠️ 핵심어가 있는 문장만 보고 바로 답을 고르면, 바로 뒤의 but이나 except를 놓칠 수 있습니다. 찾은 다음에는 반드시 천천히 읽습니다.',
      easy: '스캐닝은 전화번호부에서 이름 하나를 찾는 것과 같습니다. 모든 이름을 읽지 않고 "김"으로 시작하는 쪽을 훑다가, 찾는 이름이 보이면 그 줄만 자세히 봅니다.\n\n글에서도 숫자나 대문자로 시작하는 이름은 멀리서도 잘 보입니다. 그런 낱말을 이정표로 삼아 "여기다!" 싶은 곳에서 속도를 늦추면 됩니다.',
      check: {
        type: 'ox',
        q: '스캐닝을 할 때는 글의 첫 문장부터 끝 문장까지 모든 문장을 같은 속도로 꼼꼼히 읽는다.',
        answer: false,
        explain: '스캐닝은 핵심어가 있는 곳을 **빠르게 훑어 찾고**, 찾은 부분과 그 앞뒤만 **자세히** 읽는 방법입니다. 읽는 속도가 부분마다 다릅니다.',
      },
    },
    {
      title: '같은 뜻을 다르게 쓴 표현 알아보기 (바꿔 쓰기)',
      body: '선택지는 글의 문장을 그대로 옮기지 않고 **같은 뜻을 다른 말로** 쓰는 경우가 많습니다. 이것을 **바꿔 쓰기(paraphrase)**라고 합니다. 자주 쓰이는 방법은 다음과 같습니다.\n\n| 방법 | 글 | 선택지 |\n|---|---|---|\n| 비슷한 낱말 | The event was **postponed**. | The event was **moved to a later date**. |\n| 부정 + 반대말 | The shop is **not open** on Sundays. | The shop is **closed** on Sundays. |\n| 품사 바꾸기 | **Registration** is free. | You can **register** for free. |\n| 능동↔수동 | Volunteers **will check** your bike. | Your bike **will be checked** by volunteers. |\n| 풀어 쓰기 | It **costs nothing**. | It is **free**. |\n\n그래서 글과 **똑같은 낱말**이 있는 선택지가 꼭 정답인 것은 아닙니다. 똑같은 낱말을 쓰면서 내용 한 군데를 바꾼 선택지가 오히려 함정인 경우가 많습니다. 낱말이 아니라 **뜻**을 맞춰 봅니다.',
      easy: '친구가 "나 내일 못 가."라고 한 말을 다른 친구에게 전할 때 "걔 내일 안 온대."라고 바꿔 말해도 뜻은 같습니다. 낱말은 달라도 내용이 같지요.\n\n영어 문제의 선택지도 이렇게 글의 말을 "전해 주는" 문장입니다. 낱말이 같은지보다 **뜻이 같은지**를 보십시오.',
      check: {
        type: 'choice',
        q: '다음 문장과 뜻이 같은 것을 고르십시오.\n\nThe concert was **postponed**.',
        choices: ['The concert was moved to a later date.', 'The concert was canceled.', 'The concert started earlier than planned.'],
        answer: 0,
        why: ['', 'canceled는 "취소되었다"는 뜻입니다. postponed는 없어진 것이 아니라 뒤로 미뤄진 것입니다.', 'postponed는 "미뤄졌다"는 뜻이라 더 일찍 시작한 것과 반대입니다.'],
        explain: '**postpone**은 "(날짜를) 뒤로 미루다"입니다. 그래서 moved to a later date(더 나중 날짜로 옮겨졌다)와 뜻이 같습니다.',
      },
    },
    {
      title: '내용 일치·불일치 판단하기',
      body: '"글의 내용과 일치하는(일치하지 않는) 것은?" 문제는 **선택지 하나하나를 글과 맞춰 보는** 문제입니다.\n\n1. 질문이 **일치**인지 **불일치(NOT true)**인지 먼저 표시합니다. 반대로 고르는 실수가 가장 흔합니다.\n2. 선택지마다 핵심어를 하나씩 정합니다.\n3. 핵심어로 글의 근거 문장을 찾아 비교하고, 맞으면 O, 틀리면 X를 붙입니다.\n\n판단할 때 세 가지를 기억합니다.\n\n- **부분만 맞는 선택지는 틀린 것**입니다. 대부분 맞아도 한 군데(수, 때, 사람, 조건)가 다르면 X입니다.\n- **글에 나오지 않은 내용**은 그럴듯하고 상식적으로 맞더라도 **일치하지 않는 것**입니다. 근거는 오직 글입니다.\n- 선택지의 순서는 보통 글의 순서를 따르므로, 앞에서부터 차례로 맞춰 가면 빠릅니다.',
      easy: '친구가 "어제 영화 7시에 민수랑 봤어."라고 했습니다. 다른 사람이 "어제 8시에 민수랑 영화 봤대."라고 전하면 틀린 말입니다. 거의 다 맞아도 시각 하나가 다르니까요.\n\n또 "어제 팝콘도 먹었대."라고 하면, 실제로 먹었을 수도 있지만 친구는 그런 말을 하지 않았습니다. 들은 말(글)에 없는 내용은 "일치한다"고 할 수 없습니다.',
      check: {
        type: 'ox',
        q: '내용 일치 문제에서 글에 나오지 않는 내용을 말하는 선택지는 상식적으로 맞더라도 "글의 내용과 일치하지 않는 것"으로 본다.',
        answer: true,
        explain: '내용 일치의 근거는 오직 글입니다. 글에 없는 내용은 확인할 수 없으므로 일치한다고 할 수 없습니다.',
      },
    },
    {
      title: '수량·빈도·조건 표현 정확히 읽기',
      body: '세부 정보 문제의 함정은 대부분 **수량·빈도·조건**을 나타내는 짧은 말에 있습니다.\n\n| 표현 | 뜻 | 예 |\n|---|---|---|\n| **at least** five | 적어도 다섯(5 이상) | 5, 6, 7 … 모두 됨 |\n| **at most / up to / no more than** three | 많아야 셋(3 이하) | 1, 2, 3 |\n| **only** the first 100 | 처음 100명만 | 101번째는 안 됨 |\n| **every other** day | 하루걸러, 이틀에 한 번 | 1일, 3일, 5일 … |\n| **every other** week | 2주에 한 번 | 3일, 17일, 31일 … |\n| **except** Mondays | 월요일을 빼고 | 월요일은 닫음 |\n| **unless** it rains | 비가 오지 않으면 | 비가 오면 안 함 |\n\n**only**는 놓인 자리에 따라 뜻이 달라집니다.\n\n- **Only adults** can use the pool in the morning. → 아침에 쓸 수 있는 사람은 어른뿐\n- Adults can use the pool **only in the morning**. → 어른은 아침에만 쓸 수 있음\n\n> ⚠️ every other day를 "매일" 또는 "가끔"으로 읽지 않도록 합니다. other는 "하나 건너"라는 뜻입니다.',
      easy: '**every other**는 "하나씩 건너뛰며"라고 생각하면 쉽습니다. 계단을 한 칸씩 건너뛰며 오르면 1칸, 3칸, 5칸을 밟지요. every other day도 하루를 건너뛰며 1일, 3일, 5일입니다.\n\n**at least**는 "최소한", **up to**는 "최대"입니다. "at least 5"는 5부터 위로, "up to 5"는 5부터 아래로 생각하면 헷갈리지 않습니다.',
      check: {
        type: 'choice',
        q: '다음 안내를 읽고, 9 a.m. 다음에 투어가 시작하는 시각을 고르십시오.\n\nTours start **every other hour** from 9 a.m.',
        choices: ['11 a.m.', '10 a.m.', '12 p.m.'],
        answer: 0,
        why: ['', '10 a.m.은 한 시간마다(every hour) 시작할 때의 다음 시각입니다. every other hour는 두 시간마다입니다.', '12 p.m.은 세 시간 뒤입니다. every other hour는 한 시간을 건너뛰어 두 시간마다입니다.'],
        explain: 'every other hour는 "한 시간 걸러", 곧 두 시간마다입니다. 9 a.m. → 11 a.m. → 1 p.m. 순서로 시작합니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 안내문의 내용과 **일치하지 않는** 것을 고르십시오.\n\n**Free Bike Repair Day**\n\nBring your bike to Central Park on Saturday, May 10, from 9 a.m. to 1 p.m. Our volunteers will check your brakes and tires for free. Only basic repairs are available, so parts such as new tires are not included. Each person can bring up to two bikes.\n\n1. The event lasts four hours.\n2. Checking the brakes costs nothing.\n3. New tires are given out for free.\n4. One person may bring two bikes.',
      steps: [
        '질문이 "일치하지 **않는** 것"임을 먼저 표시합니다.',
        '선택지마다 핵심어를 정합니다: 1 → four hours(시간), 2 → brakes, 3 → new tires, 4 → two bikes.',
        '1: from 9 a.m. to 1 p.m.은 네 시간이므로 일치합니다. 2: check your brakes and tires **for free**를 costs nothing으로 바꿔 쓴 것이므로 일치합니다.',
        '3: parts such as new tires are **not included**(새 타이어 같은 부품은 포함되지 않는다)이므로 일치하지 않습니다. tires라는 같은 낱말이 있어도 뜻은 반대입니다.',
        '4: up to two bikes(두 대까지)이므로 두 대를 가져와도 됩니다. 일치합니다.',
      ],
      answer: '3. New tires are given out for free.',
    },
    {
      q: '다음 규칙을 읽고 물음에 답하십시오.\n\nTo pass the course, students must attend **at least** three of the five workshops and submit **no more than** two late assignments.\n\n지우는 워크숍 다섯 번 가운데 네 번 참석했고, 늦게 낸 과제가 세 개입니다. 지우는 과정을 통과합니까?',
      steps: [
        '조건이 두 개입니다. 조건 표현에 표시합니다: at least three(적어도 세 번), no more than two(많아야 두 개).',
        '참석: 네 번은 "세 번 이상"이므로 첫째 조건을 만족합니다.',
        '늦게 낸 과제: 세 개는 "두 개 이하"가 아니므로 둘째 조건을 만족하지 못합니다.',
        'and로 이어진 두 조건을 모두 만족해야 하므로 통과하지 못합니다.',
      ],
      answer: '통과하지 못합니다. (늦게 낸 과제가 두 개를 넘었기 때문입니다.)',
    },
  ],

  terms: [
    { term: '세부 정보', def: '글에 나오는 구체적인 사실입니다. 날짜, 시각, 장소, 가격, 수량, 조건, 사람이 한 일 따위입니다.' },
    { term: '핵심어', def: '질문이나 선택지에서 답이 있는 자리를 찾게 해 주는 낱말입니다. 이름·수·날짜처럼 눈에 띄고 글에 한두 번만 나오는 낱말이 좋습니다.' },
    { term: '스캐닝(scanning)', def: '핵심어가 있는 곳을 빠르게 훑어 찾은 뒤 그 부분만 자세히 읽는 방법입니다. 세부 정보를 찾을 때 씁니다.' },
    { term: '스키밍(skimming)', def: '글 전체를 빠르게 훑어 대강의 내용(무엇에 관한 글인지)을 파악하는 방법입니다. 주제를 잡을 때 씁니다.' },
    { term: '바꿔 쓰기(paraphrase)', def: '같은 뜻을 다른 낱말이나 다른 문장 구조로 나타내는 것입니다. 예: costs nothing → free' },
    { term: '내용 일치·불일치', def: '선택지가 글의 내용과 맞는지 하나씩 근거를 찾아 판단하는 문제 유형입니다. 부분만 맞거나 글에 없는 내용은 일치하지 않는 것입니다.' },
    { term: '수량·조건 표현', def: '수의 범위나 조건을 정하는 말입니다. 예: at least(적어도), up to(최대), only(~만), every other(하나 걸러), except(~을 빼고), unless(~하지 않으면)' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '공원 행사 안내문을 읽고 다음 질문에 답하려고 합니다. 글에서 먼저 찾아야 할 핵심어로 가장 알맞은 것을 고르십시오.\n\nWhat time does the park close on **Saturdays**?',
      choices: ['Saturdays', 'park', 'What', 'does'],
      answer: 0,
      why: ['', 'park는 공원 안내문 전체에 나오는 말이라 위치를 좁혀 주지 못합니다.', 'What은 의문사입니다. 찾을 정보의 종류는 알려 주지만 글에서 위치를 찾는 데는 쓰이지 않습니다.', 'does는 질문을 만드는 조동사라 글에서 찾을 낱말이 아닙니다.'],
      explain: '질문에만 있는 특정 낱말 **Saturdays**를 따라가면 토요일 운영 시간이 적힌 곳을 바로 찾을 수 있습니다. What time은 찾을 정보가 "시각"이라는 것을 알려 줍니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 4,
      q: 'The library bus visits our village **every other day**.\n\n굵게 표시한 말의 뜻으로 알맞은 것을 고르십시오.',
      choices: ['이틀에 한 번(하루걸러)', '매일', '가끔, 정해지지 않은 날에', '하루 종일'],
      answer: 0,
      why: ['', '매일은 every day입니다. other가 들어가면 하루씩 건너뜁니다.', 'other를 "다른"으로 읽었습니다. every other는 "하나 걸러"라는 정해진 간격입니다.', '하루 종일은 all day입니다.'],
      explain: '**every other day**는 하루를 건너뛰며 오는 것, 곧 이틀에 한 번입니다. 1일에 왔다면 3일, 5일, 7일에 옵니다.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 4,
      q: 'Participants must read **at least** five books.\n\n이 문장은 "다섯 권까지만 읽을 수 있다"는 뜻이다.',
      answer: false,
      explain: '**at least**는 "적어도"입니다. 다섯 권 이상 읽어야 한다는 뜻이므로 여섯 권, 일곱 권을 읽어도 됩니다. "다섯 권까지"는 up to five 또는 no more than five입니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '다음 문장과 뜻이 같은 것을 고르십시오.\n\nRegistration costs nothing.',
      choices: ['You can sign up for free.', 'You must sign up in advance.', 'Anyone can sign up at any time.', 'Signing up takes a long time.'],
      answer: 0,
      why: ['', '미리 신청해야 한다는 말은 글에 없습니다. costs nothing은 비용에 관한 말입니다.', '누구나 언제든 신청할 수 있다는 말은 글에 없습니다. costs nothing은 돈이 들지 않는다는 뜻입니다.', 'costs를 시간이 걸린다는 뜻으로 읽었습니다. 여기서는 비용이 든다는 뜻입니다.'],
      explain: 'Registration(등록)은 sign up(신청하다)으로, costs nothing(비용이 들지 않는다)은 for free(무료로)로 바꿔 썼습니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '다음 글의 내용과 **일치하지 않는** 것을 고르십시오.\n\n' + LIB,
      choices: [
        'Students aged 13 to 18 can take part.',
        'Participants should read five or more books.',
        'Reviews must be handed in at the front desk.',
        'Students pay nothing to register.',
      ],
      answer: 2,
      why: [
        'invites students aged 13 to 18이라고 했으므로 일치합니다. 질문은 일치하지 **않는** 것을 묻습니다.',
        'at least five books를 five or more books로 바꿔 쓴 것이므로 일치합니다.',
        '',
        'Registration costs nothing을 바꿔 쓴 것이므로 일치합니다.',
      ],
      explain: '글에서는 Reviews can be sent **online or** handed in at the front desk라고 했습니다. 온라인으로도 낼 수 있으므로 "안내 데스크에 내야만 한다(must)"는 일치하지 않습니다.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', unit: '명', concept: 1,
      q: '다음 글을 읽고, 이 행사에 참가할 수 있는 학생은 최대 몇 명인지 수로 쓰십시오.\n\n' + LIB,
      answer: '100',
      wrong: [
        { a: '5', why: '5는 읽어야 할 책의 수입니다. 핵심어 students와 수를 함께 찾아보십시오.' },
        { a: '18', why: '18은 참가할 수 있는 나이의 끝입니다. 사람 수를 나타내는 문장을 찾아보십시오.' },
      ],
      explain: 'only the first 100 students can take part(처음 100명의 학생만 참가할 수 있다)라고 했으므로 최대 100명입니다.',
    },
    {
      id: 'p7', level: 2, type: 'choice', concept: 4,
      q: '다음 안내를 읽고, 동아리가 모이는 날을 고르십시오.\n\nThe robotics club meets **every other Wednesday**, starting on Wednesday, March 6.',
      choices: ['March 20', 'March 13', 'March 27', 'March 8'],
      answer: 0,
      hint: 'Wednesday를 하나씩 건너뛰어 보십시오. 수요일은 7일마다 돌아옵니다.',
      why: ['', 'March 13은 바로 다음 수요일입니다. 매주(every Wednesday) 모일 때의 날짜입니다.', 'March 27은 세 주 뒤입니다. every other는 하나만 건너뜁니다.', 'March 8은 이틀 뒤입니다. every other day로 읽었습니다. 이 글은 수요일을 하나씩 건너뜁니다.'],
      explain: '3월 6일이 수요일이면 다음 수요일은 13일, 그다음은 20일입니다. 수요일을 하나 걸러 모이므로 6일 → 20일 → 4월 3일 순서입니다.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 2,
      q: '다음 문장의 내용과 일치하는 것을 고르십시오.\n\nThe café does not allow pets inside, except for guide dogs.',
      choices: [
        'Guide dogs are the only animals allowed inside.',
        'No animals, including guide dogs, may come inside.',
        'Small pets are welcome inside the café.',
        'Guide dogs must wait outside the café.',
      ],
      answer: 0,
      hint: 'except for 뒤에 오는 것은 규칙에서 빠지는 것입니다.',
      why: [
        '',
        'except for를 놓쳤습니다. 안내견은 금지에서 빠지므로 들어갈 수 있습니다.',
        '반려동물은 크기와 관계없이 들어갈 수 없습니다. 크기에 관한 말은 글에 없습니다.',
        '안내견은 예외이므로 안에 들어갈 수 있습니다. 거꾸로 읽었습니다.',
      ],
      explain: '"안내견을 빼고는(except for) 반려동물을 안에 들이지 않는다"는 말을 "안에 들어갈 수 있는 동물은 안내견뿐이다"로 바꿔 쓴 것이 첫째 선택지입니다.',
    },
    {
      id: 'p9', level: 2, type: 'short', concept: 1,
      q: '다음 글을 읽고, 책 교환 책장이 열리는 요일을 영어로 쓰십시오.\n\n' + HANA,
      answer: ['Friday', 'Fridays', 'on Friday', 'on Fridays', 'every Friday'],
      hint: '요일 이름은 대문자로 시작하므로 훑어보면 잘 보입니다.',
      wrong: [{ a: 'spring', why: 'last spring은 책 교환을 시작한 때입니다. 책장이 열리는 요일을 찾아보십시오.' }],
      explain: 'The shelf is open **every Friday** during lunch break라고 했으므로 금요일(Friday)입니다.',
    },
    {
      id: 'p10', level: 2, type: 'ox', concept: 3,
      q: '다음 글을 읽고, 마지막 문장이 글의 내용과 일치하는지 판단하십시오.\n\n' + HANA + '\n\n**Hana started the book exchange on her own.**',
      answer: false,
      hint: 'Hana가 누구와 함께 책장을 놓았는지 찾아보십시오.',
      explain: 'She and **two friends** set up a small shelf라고 했으므로 혼자(on her own) 시작한 것이 아니라 친구 두 명과 함께 시작했습니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: 'Visitors may borrow **up to** three books at a time.\n\n이 문장의 뜻으로 알맞은 것을 고르십시오.',
      choices: ['한 번에 세 권까지 빌릴 수 있다.', '한 번에 적어도 세 권은 빌려야 한다.', '한 번에 세 권보다 많이 빌릴 수 있다.', '모두 합해 세 번까지만 빌릴 수 있다.'],
      answer: 0,
      why: ['', '"적어도"는 at least입니다. up to는 최대를 나타냅니다.', 'up to three는 셋을 넘지 않는다는 뜻입니다.', 'three는 책의 수이고 at a time은 "한 번에"라는 뜻입니다. 빌리는 횟수가 아닙니다.'],
      explain: '**up to** three는 "최대 셋까지"입니다. at a time(한 번에)과 합치면 "한 번에 세 권까지"입니다.',
    },
    {
      id: 'p12', level: 1, type: 'short', concept: 2,
      q: '다음 두 문장의 뜻이 같아지도록 빈칸에 알맞은 영어 낱말을 한 개 쓰십시오. (f로 시작합니다.)\n\nThe tote bag costs nothing.\n= The tote bag is [[빈칸]].',
      answer: ['free'],
      wrong: [{ a: 'cheap', why: 'cheap은 "싸다"는 뜻이라 돈이 조금은 듭니다. costs nothing은 돈이 전혀 들지 않는다는 뜻입니다.' }],
      explain: 'costs nothing(돈이 전혀 들지 않는다)은 **free**(무료의)로 바꿔 쓸 수 있습니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '원', concept: 4,
      q: '다음 안내를 읽고 물음에 답하십시오.\n\n' + MUSEUM + '\n\n어른 두 명, 15살 학생 한 명, 6살 어린이 한 명이 어느 토요일에 함께 박물관에 갑니다. 내야 할 입장료는 모두 몇 원입니까?',
      answer: '24000',
      hint: '사람마다 나이에 맞는 줄을 찾고, under 7과 last Sunday라는 조건을 확인하십시오.',
      wrong: [
        { a: '28000', why: '6살 어린이에게 4,000원을 매겼습니다. under 7(7살 미만)은 무료입니다.' },
        { a: '27000', why: '15살 학생에게 어른 요금을 매겼습니다. 13살부터 18살까지는 학생 요금 6,000원입니다.' },
        { a: '12000', why: '반값은 매달 마지막 일요일에만 적용됩니다. 이 가족은 토요일에 갑니다.' },
      ],
      explain: '어른 9,000원 × 2 = 18,000원, 15살은 학생(ages 13 to 18) 6,000원, 6살은 Children under 7이므로 무료입니다. 토요일이라 반값 조건(last Sunday)도 해당하지 않습니다. 모두 18,000 + 6,000 = 24,000원입니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: '다음 안내의 내용과 일치하는 것을 고르십시오.\n\n' + POOL,
      choices: [
        'On weekday mornings, only adults can use the pool.',
        'Adults can use the pool only on weekday mornings.',
        'Children cannot swim at the pool on weekends.',
        'Lessons for beginners are held every Saturday.',
      ],
      answer: 0,
      hint: 'only가 어느 말을 꾸미는지에 따라 뜻이 달라집니다.',
      why: [
        '',
        'only의 자리가 바뀌어 "어른은 평일 아침에만 쓸 수 있다"가 되었습니다. 글은 평일 아침에 쓸 수 있는 사람이 어른뿐이라는 뜻이고, 어른이 다른 때에 못 온다는 말은 없습니다.',
        'Children may swim ... on weekends라고 했으므로 주말에도 수영할 수 있습니다.',
        'every other Saturday는 토요일을 하나 걸러, 곧 2주에 한 번입니다.',
      ],
      explain: 'the pool is for adults only(그 수영장은 어른만을 위한 것이다)는 "평일 아침에는 어른만 쓸 수 있다"와 같은 뜻입니다. only가 adults를 꾸미는지 weekday mornings를 꾸미는지 구별해야 합니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '다음 안내의 내용과 일치하는 것을 고르십시오.\n\n' + MUSEUM,
      choices: [
        'The regular ticket price for a seven-year-old is 4,000 won.',
        'Tickets are half price on every Sunday.',
        'The museum is open seven days a week.',
        'A 13-year-old pays the same price as a 12-year-old.',
      ],
      answer: 0,
      why: [
        '',
        '반값은 매달 마지막 일요일(the last Sunday of every month)에만 적용됩니다. 부분만 맞는 선택지입니다.',
        'every day except Mondays라고 했으므로 월요일에는 문을 닫습니다. 일주일에 엿새 엽니다.',
        '13살은 학생 요금 6,000원, 12살은 어린이 요금 4,000원으로 다릅니다.',
      ],
      explain: 'Children under 7은 7살 **미만**이라 7살은 들어가지 않습니다. 7살은 Children (ages 7 to 12) 줄에 해당하므로 4,000원을 냅니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 2,
      q: '다음 문장의 내용과 일치하는 것을 고르십시오.\n\nNo tickets will be refunded **unless** the concert is canceled.',
      choices: [
        'You can get your money back only if the concert is canceled.',
        'You can get your money back if you cannot go to the concert.',
        'Even if the concert is canceled, you cannot get your money back.',
        'You can get your money back at any time before the concert.',
      ],
      answer: 0,
      hint: 'unless는 "~하지 않으면"입니다. "공연이 취소되지 않으면 환불이 없다"를 거꾸로 생각해 보십시오.',
      why: [
        '',
        '내가 못 가는 경우는 조건이 아닙니다. 환불이 되는 경우는 공연이 취소될 때뿐입니다.',
        'unless를 놓쳤습니다. 공연이 취소되면 환불을 받을 수 있습니다.',
        '공연 전이라도 취소되지 않았다면 환불이 되지 않습니다.',
      ],
      explain: '"공연이 취소되지 않는 한(unless) 표는 환불되지 않는다"는 "공연이 취소될 때만(only if) 환불받을 수 있다"와 같은 뜻입니다. 부정어 No와 unless가 함께 나오면 바꿔 쓴 긍정 문장으로 정리해 보면 정확합니다.',
    },
  ],

  deeper: [
    {
      title: '세부 정보 문제의 함정은 세 가지로 정리됩니다',
      body: '내용 일치·불일치 문제의 오답 선택지는 대부분 다음 세 가지 방법으로 만들어집니다. 함정의 모양을 알면 근거를 찾는 눈이 빨라집니다.\n\n1. **한 군데 바꾸기**: 글의 문장을 거의 그대로 쓰고 수·날짜·사람·조건 하나만 바꿉니다. (two friends → on her own, every other Saturday → every Saturday)\n2. **범위 바꾸기**: some을 all로, can을 must로, the last Sunday를 every Sunday로 넓히거나 좁힙니다. 이런 낱말(all, every, always, must, only)이 선택지에 있으면 글의 범위와 꼭 비교합니다.\n3. **글에 없는 내용 넣기**: 상식적으로 그럴듯하지만 글이 말하지 않은 내용을 넣습니다.\n\n다음 단원에서는 반대로 세부 내용을 지나 **글 전체가 말하려는 것(주제와 요지)**을 잡는 법을 배웁니다. 세부 정보는 "나무", 주제는 "숲"입니다. 숲을 볼 때는 오늘 익힌 핵심어 찾기가 "반복되는 낱말 찾기"로 이어집니다.',
    },
  ],

  faq: [
    {
      q: '글을 먼저 읽어야 해요, 문제를 먼저 읽어야 해요?',
      a: '세부 정보 문제는 질문과 선택지를 먼저 읽는 편이 효율적입니다. 무엇을 찾을지 정해 두면 스캐닝으로 필요한 부분만 정확히 읽을 수 있습니다. 반면 주제·요지를 묻는 문제는 글 전체를 훑어 흐름을 잡는 것이 먼저입니다.',
    },
    {
      q: '선택지에 글과 똑같은 낱말이 있으면 정답 아닌가요?',
      a: '아닙니다. 똑같은 낱말을 쓰면서 수나 조건 하나를 바꾼 선택지가 대표적인 함정입니다. 반대로 정답은 글의 말을 바꿔 쓴(paraphrase) 경우가 많습니다. 낱말이 같은지가 아니라 뜻이 같은지 비교하십시오.',
    },
    {
      q: 'every other day는 왜 이틀에 한 번이에요?',
      a: 'other는 여기서 "하나 건너"라는 뜻입니다. 날을 하나씩 건너뛰며 1일, 3일, 5일처럼 오는 것이므로 이틀에 한 번입니다. every other week는 2주에 한 번, every other line은 한 줄 걸러를 뜻합니다.',
    },
    {
      q: 'at least와 at most가 자꾸 헷갈려요.',
      a: 'least는 "가장 적은", most는 "가장 많은"입니다. at least five는 "가장 적게 잡아도 다섯", 곧 5 이상이고, at most five는 "가장 많이 잡아도 다섯", 곧 5 이하입니다. up to five와 no more than five도 5 이하입니다.',
    },
  ],

  mistakes: [
    '질문이 "일치하지 **않는** 것"인데 일치하는 것을 고르는 실수 — 질문을 읽자마자 NOT, 않는, 틀린에 표시해 둡니다.',
    '핵심어가 있는 문장만 보고 바로 뒤의 but, except, only를 놓치는 실수 — 찾은 문장의 앞뒤 한 문장까지 천천히 읽습니다.',
    'every other day를 "매일"이나 "가끔"으로, at least를 "많아야"로 읽는 실수 — 수량·빈도 표현은 수를 직접 대입해 확인합니다.',
  ],

  gens: [
    {
      id: 'every-other-dates',
      level: 2,
      title: '빈도 표현(every other, every third)으로 날짜 찾기',
      make: function (R) {
        var kinds = [
          { p: 'every other day', k: 2, ko: '하루걸러(이틀에 한 번)' },
          { p: 'every third day', k: 3, ko: '이틀 걸러(사흘에 한 번)' },
          { p: 'every other week', k: 14, ko: '한 주 걸러(2주에 한 번)' },
        ];
        var t = R.pick(kinds);
        var club = R.pick(['book club', 'science club', 'chess club', 'cooking club', 'photo club']);
        var month = R.pick(['May', 'July', 'October', 'December']);
        var start = R.int(1, 8);
        var n = t.k === 14 ? 1 : R.int(2, 4);
        var correct = start + t.k * n;
        // 오답: 모이지 않는 날만 (간격과 맞지 않는 날)
        var offs = t.k === 2 ? [2 * n - 1, 2 * n + 1, 1, 2 * n + 3, 2 * n - 3]
          : t.k === 3 ? [3 * n - 1, 3 * n + 1, 2, 4, 3 * n + 2]
          : [7, 21, 2, 13, 15];
        var wrongDays = offs.filter(function (o) { return o > 0 && o % t.k !== 0 && start + o <= 31; })
          .map(function (o) { return start + o; });
        var label = function (d) { return month + ' ' + d; };
        var pick = R.choices(label(correct), wrongDays.map(label));
        var meet = [];
        for (var d = start; d <= 31 && meet.length < 5; d += t.k) meet.push(d);
        var why = pick.choices.map(function (c) {
          if (c === label(correct)) return '';
          var d = Number(c.split(' ')[1]);
          if (t.k === 14 && d - start === 7) return '바로 다음 주입니다. 매주(every week) 모일 때의 날짜입니다. every other week는 한 주를 건너뜁니다.';
          if (t.k === 2 && d - start === 1) return '바로 다음 날입니다. 매일(every day) 모일 때의 날짜입니다.';
          return '첫 모임 날부터 ' + (t.k === 14 ? '14일' : t.k + '일') + '씩 더한 날만 모임 날입니다. 이 날은 간격이 맞지 않습니다.';
        });
        return {
          type: 'choice', concept: 4,
          q: '다음 안내를 읽고, 동아리가 모이는 날을 고르십시오.\n\nThe ' + club + ' meets **' + t.p + '**, starting on ' + month + ' ' + start + '.',
          choices: pick.choices,
          answer: pick.answer,
          why: why,
          explain: '**' + t.p + '**는 ' + t.ko + '입니다. 그래서 ' + month + ' ' + meet.join(', ') + ' … 에 모입니다. 보기 가운데 모임 날은 ' + label(correct) + '입니다.',
        };
      },
    },
  ],

  vocab: [
    { w: 'detail', m: '세부 사항', ex: 'Read the notice carefully and check every detail.', exm: '안내문을 꼼꼼히 읽고 세부 사항을 모두 확인하세요.' },
    { w: 'scan', m: '(필요한 것을 찾으려고) 훑어보다', ex: 'She scanned the list for her name.', exm: '그녀는 자기 이름을 찾으려고 명단을 훑어보았다.' },
    { w: 'participant', m: '참가자', ex: 'Each participant will get a certificate.', exm: '참가자는 모두 수료증을 받게 됩니다.' },
    { w: 'register', m: '등록하다', ex: 'You need to register before the first class.', exm: '첫 수업 전에 등록해야 합니다.' },
    { w: 'submit', m: '제출하다', ex: 'Please submit your report by Friday.', exm: '금요일까지 보고서를 제출해 주세요.' },
    { w: 'available', m: '이용할 수 있는', ex: 'Free water is available at the entrance.', exm: '입구에서 무료로 물을 마실 수 있습니다.' },
    { w: 'admission', m: '입장(료)', ex: 'Admission is free for children under 7.', exm: '7세 미만 어린이는 입장이 무료입니다.' },
    { w: 'refund', m: '환불하다; 환불', ex: 'The store will refund your money if the item is broken.', exm: '물건이 망가져 있으면 가게에서 돈을 환불해 줄 것이다.' },
    { w: 'postpone', m: '미루다, 연기하다', ex: 'The game was postponed because of the heavy rain.', exm: '폭우 때문에 경기가 연기되었다.' },
    { w: 'at least', m: '적어도, 최소한', ex: 'Drink at least six glasses of water a day.', exm: '하루에 적어도 물 여섯 잔을 마시세요.' },
    { w: 'up to', m: '(최대) ~까지', ex: 'Each student can borrow up to three books.', exm: '학생마다 책을 세 권까지 빌릴 수 있다.' },
    { w: 'every other', m: '하나 걸러(하나씩 건너뛰어)', ex: 'We clean the classroom every other day.', exm: '우리는 하루걸러 교실을 청소한다.' },
    { w: 'except', m: '~을 제외하고', ex: 'The shop is open every day except Sunday.', exm: '그 가게는 일요일을 빼고 매일 문을 연다.' },
    { w: 'unless', m: '~하지 않으면', ex: 'The picnic will be held outside unless it rains.', exm: '비가 오지 않으면 소풍은 밖에서 열린다.' },
    { w: 'include', m: '포함하다', ex: 'The price includes lunch and a T-shirt.', exm: '그 가격에는 점심과 티셔츠가 포함되어 있다.' },
    { w: 'deadline', m: '마감일', ex: 'The deadline for the essay is next Monday.', exm: '에세이 마감일은 다음 주 월요일이다.' },
  ],
});
})();
