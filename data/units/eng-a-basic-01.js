/* 다시 시작하는 영어 기초 문법 · 영어 어순과 문장 성분
 * 예문은 모두 직접 쓴 문장이다(가상의 인물). 영어 낱말 바로 뒤에는 받침에 따라 바뀌는 조사를 붙이지 않는다. */
(function () {
  // 때·장소 전치사 생성기 ------------------------------------------------------
  // 때: [표현, 정답 전치사]
  var TIMES = [
    ['seven', 'at'], ['noon', 'at'], ['6:30', 'at'], ['midnight', 'at'], ['nine o\'clock', 'at'],
    ['Monday', 'on'], ['Friday', 'on'], ['May 5', 'on'], ['my birthday', 'on'], ['Sunday morning', 'on'],
    ['October', 'in'], ['the morning', 'in'], ['the evening', 'in'], ['summer', 'in'], ['March', 'in'], ['winter', 'in'],
  ];
  var TIME_FRAMES = ['There is a concert ___ {X}.', 'We have a meeting ___ {X}.', 'The library is closed ___ {X}.'];
  // 장소: [문장, 정답 전치사]
  var PLACES = [
    ['Your keys are ___ the table.', 'on'],
    ['There is a picture ___ the wall.', 'on'],
    ['My mother is ___ the kitchen.', 'in'],
    ['The children are ___ the classroom.', 'in'],
    ['Please meet me ___ the bus stop.', 'at'],
    ['Someone is ___ the door.', 'at'],
    ['There is some milk ___ the fridge.', 'in'],
    ['Put the cups ___ the shelf, please.', 'on'],
  ];
  var PREP_RULE = {
    time: {
      at: 'at — 시각이나 한 시점(일곱 시, 정오, 자정)에 씁니다.',
      on: 'on — 요일·날짜처럼 "하루"에 씁니다.',
      in: 'in — 달·계절·하루 중의 때(아침·저녁)처럼 긴 기간에 씁니다.',
    },
    place: {
      at: 'at — 정류장·문 앞처럼 콕 찍은 한 지점에 씁니다.',
      on: 'on — 탁자·벽·선반처럼 표면에 붙어 있을 때 씁니다.',
      in: 'in — 부엌·교실·냉장고처럼 공간 안에 있을 때 씁니다.',
    },
  };

  // 주어·동사 찾기 생성기 ------------------------------------------------------
  // [문장, 괄호로 묶은 문장, [[낱말, 역할] × 4]] — 역할: S 주어, V 동사, mod 수식어 안, obj 목적어, comp 보어
  var SV = [
    ['The woman next to the door reads a newspaper every morning.', 'The woman (next to the door) reads a newspaper (every morning).',
      [['woman', 'S'], ['reads', 'V'], ['door', 'mod'], ['newspaper', 'obj']]],
    ['The keys in my bag open the front door.', 'The keys (in my bag) open the front door.',
      [['keys', 'S'], ['open', 'V'], ['bag', 'mod'], ['door', 'obj']]],
    ['The coffee at this cafe tastes great.', 'The coffee (at this cafe) tastes great.',
      [['coffee', 'S'], ['tastes', 'V'], ['cafe', 'mod'], ['great', 'comp']]],
    ['My friends from Busan visit me in summer.', 'My friends (from Busan) visit me (in summer).',
      [['friends', 'S'], ['visit', 'V'], ['Busan', 'mod'], ['summer', 'mod']]],
    ['The bus to the airport leaves at noon.', 'The bus (to the airport) leaves (at noon).',
      [['bus', 'S'], ['leaves', 'V'], ['airport', 'mod'], ['noon', 'mod']]],
    ['The man with the big dog lives next door.', 'The man (with the big dog) lives (next door).',
      [['man', 'S'], ['lives', 'V'], ['dog', 'mod'], ['door', 'mod']]],
    ['The students in the library study quietly.', 'The students (in the library) study (quietly).',
      [['students', 'S'], ['study', 'V'], ['library', 'mod'], ['quietly', 'mod']]],
    ['The flowers in the garden need water.', 'The flowers (in the garden) need water.',
      [['flowers', 'S'], ['need', 'V'], ['garden', 'mod'], ['water', 'obj']]],
    ['The children in the park play soccer after school.', 'The children (in the park) play soccer (after school).',
      [['children', 'S'], ['play', 'V'], ['park', 'mod'], ['soccer', 'obj']]],
    ['The manager of the shop opens the door at nine.', 'The manager (of the shop) opens the door (at nine).',
      [['manager', 'S'], ['opens', 'V'], ['shop', 'mod'], ['door', 'obj']]],
    ['Every room in this hotel has a large window.', 'Every room (in this hotel) has a large window.',
      [['room', 'S'], ['has', 'V'], ['hotel', 'mod'], ['window', 'obj']]],
    ['The price of these apples seems high.', 'The price (of these apples) seems high.',
      [['price', 'S'], ['seems', 'V'], ['apples', 'mod'], ['high', 'comp']]],
  ];
  var ROLE_WHY = {
    S: '주어의 중심 낱말입니다. 동사는 주어 뒤에서 "~한다·~이다"에 해당하는 말입니다.',
    V: '동사입니다. 주어는 동사 앞에서 "누가·무엇이"에 해당하는 말입니다.',
    mod: '꾸며 주는 말(수식어) 묶음 안의 낱말입니다. 전치사 묶음과 때·장소를 나타내는 말을 괄호로 묶어 가리고 다시 보세요.',
    obj: '동사 뒤에서 동작을 받는 목적어입니다.',
    comp: '동사 뒤에서 주어가 어떤지 설명하는 보어입니다.',
  };

  Tutor.registerUnit({
    id: 'eng-a-basic-01',
    course: 'eng-a-basic',
    title: '영어 어순과 문장 성분',
    summary: '주어 다음에 동사가 오는 영어 어순과 품사, 문장 성분을 익혀 영어 문장의 뼈대를 잡습니다.',
    goals: [
      '우리말과 다른 영어 어순(주어 + 동사 + 목적어)으로 문장을 만들 수 있다.',
      '명사·대명사·동사·형용사·부사·전치사가 하는 일을 구별할 수 있다.',
      '문장에서 주어·동사·목적어·보어·수식어를 찾을 수 있다.',
      '때와 장소를 전치사(at·on·in)로 덧붙일 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '우리말과 다른 영어 어순',
        body: '우리말은 "저는 커피를 마십니다"처럼 **주어 → 목적어 → 동사** 순서로 말합니다. 영어는 **주어 + 동사 + 목적어** 순서입니다.\n\n| 우리말 | 영어 |\n|---|---|\n| 저는 / 커피를 / 마십니다 | I / drink / coffee. |\n| 민수가 / 지아를 / 부릅니다 | Minsu / calls / Jia. |\n\n우리말은 "-는, -를" 같은 조사가 역할을 알려 주므로 "커피를 저는 마십니다"처럼 순서를 바꿔도 뜻이 통합니다. 영어에는 조사가 없어서 **자리가 곧 역할**입니다.\n\n- Minsu calls Jia. → 민수가 지아를 부릅니다.\n- Jia calls Minsu. → 지아가 민수를 부릅니다.\n\n낱말은 같아도 자리가 바뀌니 부르는 사람이 반대가 되었습니다.\n\n> 💡 영어 문장을 만들 때는 먼저 "누가 + 한다"를 정하고, 그다음에 "무엇을"을 붙인다고 생각하면 편합니다.',
        easy: '영어 문장은 칸이 정해진 기차와 비슷합니다. 맨 앞 칸에는 **주인공(주어)**, 바로 다음 칸에는 **하는 일(동사)**, 그다음 칸에는 **대상(목적어)**이 탑니다.\n\n칸의 순서가 정해져 있어서 같은 낱말도 어느 칸에 타느냐에 따라 역할이 달라집니다.\n\n"저는 / 커피를 / 마십니다"를 기차에 태우면 → I / drink / coffee.',
        check: {
          type: 'choice',
          q: '"저는 점심을 먹습니다."를 영어 어순대로 바르게 쓴 것을 고르세요.',
          choices: ['I eat lunch.', 'I lunch eat.', 'Lunch eat I.'],
          answer: 0,
          why: ['', '우리말 순서(주어 → 목적어 → 동사)를 그대로 따랐습니다. 영어는 동사가 주어 바로 뒤에 옵니다.', '주어와 목적어 자리가 바뀌었습니다. 영어 문장은 주어로 시작합니다.'],
          explain: '영어는 주어 + 동사 + 목적어 순서입니다. 저는(I) → 먹습니다(eat) → 점심을(lunch), 곧 **I eat lunch.** 입니다.',
        },
      },
      {
        title: '품사 — 낱말이 하는 일',
        body: '낱말은 하는 일에 따라 **품사**로 나뉩니다. 문장의 뼈대를 세우려면 먼저 다음 여섯 가지를 알아 두면 좋습니다.\n\n| 품사 | 하는 일 | 예 |\n|---|---|---|\n| 명사 | 사람·물건·장소·생각의 이름 | Jia, coffee, office, idea |\n| 대명사 | 명사를 대신하는 말 | I, you, she, it, they |\n| 동사 | 움직임이나 상태 | run, eat, like, is |\n| 형용사 | 명사를 꾸미거나 설명함 | new, happy, tall |\n| 부사 | 동사·형용사·문장 전체를 꾸밈 | quickly, very, often |\n| 전치사 | 명사 앞에서 때·장소·방향을 나타냄 | at, on, in, to, with |\n\n같은 낱말도 쓰임에 따라 품사가 달라질 수 있습니다.\n\n- I drink **water**. → 명사(물)\n- Please **water** the plants. → 동사(물을 주다)\n\n> 💡 끝이 -ly 인 낱말은 부사인 경우가 많습니다(quickly, carefully). 다만 friendly(친절한)처럼 형용사인 것도 있으니 문장 속 쓰임을 함께 봅니다.',
        easy: '품사는 회사의 직무와 비슷합니다. 이름표를 단 사람(명사), 그 이름 대신 부르는 호칭(대명사), 실제로 일하는 사람(동사), 사람을 소개하는 말(형용사), 일하는 방식을 덧붙이는 말(부사), 위치·시간을 안내하는 표지판(전치사)이 있습니다.\n\nMy sister has a **red** car. 에서 red(빨간) — car(차)를 소개하는 말이므로 형용사입니다.',
        check: {
          type: 'choice',
          q: '다음 문장에서 **형용사**를 고르세요.\n\nMy sister has a red car.',
          choices: ['sister', 'has', 'red', 'car'],
          answer: 2,
          why: ['사람을 가리키는 명사입니다.', '"가지고 있다"라는 뜻의 동사입니다.', '', '물건의 이름인 명사입니다. 형용사는 이 명사를 꾸미는 말입니다.'],
          explain: 'red(빨간) — 뒤의 명사 car(차)를 꾸며 "빨간 차"를 만듭니다. 명사를 꾸미는 말은 형용사입니다.',
        },
      },
      {
        title: '문장 성분 — 문장 안에서 맡은 역할',
        body: '품사가 "낱말의 종류"라면 **문장 성분**은 "문장 안에서 맡은 역할"입니다.\n\n| 성분 | 역할 | 예 (굵은 부분) |\n|---|---|---|\n| 주어 | 누가·무엇이 | **Jia** opens the window. |\n| 동사 | 한다·이다 | Jia **opens** the window. |\n| 목적어 | 무엇을·누구를 (동작을 받는 대상) | Jia opens **the window**. |\n| 보어 | 주어가 무엇인지·어떤지 보충 | Jia is **a nurse**. / Jia is **tired**. |\n| 수식어 | 때·장소·방법 등을 덧붙임 | Jia opens the window **in the morning**. |\n\n주어·동사·목적어·보어는 문장의 **뼈대**이고, 수식어는 빼도 문장이 성립하는 **살**입니다.\n\n목적어와 보어는 이렇게 구별합니다.\n\n- Jia is a nurse. → Jia = a nurse (같은 사람이므로 **보어**)\n- Jia meets a nurse. → Jia ≠ a nurse (만나는 대상이므로 **목적어**)',
        easy: '문장을 연극이라고 생각해 봅니다. 주어는 주인공, 동사는 주인공의 행동, 목적어는 그 행동을 받는 상대, 보어는 주인공을 소개하는 이름표, 수식어는 무대 배경(언제·어디서)입니다.\n\n배경(수식어)을 치워도 연극은 진행되지만, 주인공과 행동이 없으면 연극이 되지 않습니다.',
        check: {
          type: 'ox',
          q: '다음 문장에서 밑줄 친 말은 목적어입니다.\n\nMy brother is __tired__.',
          answer: false,
          explain: 'tired(피곤한) — 주어 My brother의 상태를 설명하는 **보어**입니다. 동작을 받는 대상이 아니므로 목적어가 아닙니다.',
        },
      },
      {
        title: '수식어로 때·장소 더하기',
        body: '뼈대 문장 뒤에 **때**와 **장소**를 붙이면 말이 풍부해집니다. 이런 말은 보통 **전치사 + 명사** 묶음으로 만듭니다.\n\n| 전치사 | 때 | 장소 |\n|---|---|---|\n| at | 시각·한 시점: at seven, at noon, at night | 한 지점: at the bus stop, at the door |\n| on | 요일·날짜: on Monday, on May 5 | 표면 위: on the table, on the wall |\n| in | 달·계절·하루 중의 때: in October, in summer, in the morning | 공간 안: in the kitchen, in Seoul |\n\n때와 장소를 함께 쓸 때는 보통 **장소 → 때** 순서로 문장 끝에 둡니다.\n\nI have breakfast **in the kitchen** **at seven**.\n\n때를 나타내는 말은 문장 맨 앞에 둘 수도 있습니다.\n\n**On Monday**, I go to the gym.\n\n> 💡 at → on → in 순서로 범위가 넓어진다고 기억하면 쉽습니다(시각 → 하루 → 달·계절).',
        easy: '전치사는 "시간·장소의 크기"를 알려 주는 표지판입니다.\n\n- 콕 찍은 한 점이면 **at** (일곱 시 정각, 버스 정류장)\n- 하루나 평평한 면이면 **on** (월요일, 탁자 위)\n- 넓게 감싸는 기간이나 공간이면 **in** (10월, 부엌 안)\n\n"월요일에"는 하루이므로 on Monday, "10월에"는 한 달이라는 긴 기간이므로 in October입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nI go swimming ___ Saturday.',
          choices: ['at', 'on', 'in'],
          answer: 1,
          why: ['at — 일곱 시처럼 한 시각에 씁니다. 요일은 하루이므로 다른 전치사를 씁니다.', '', 'in — 달·계절처럼 긴 기간에 씁니다. 요일 앞에 쓰는 전치사는 on 입니다.'],
          explain: '요일·날짜처럼 "하루" 앞에 오는 전치사는 on 입니다: on Saturday(토요일에).',
        },
      },
      {
        title: '문장에서 주어와 동사 찾기',
        body: '긴 문장도 뼈대는 짧습니다. 주어와 동사는 이 순서로 찾습니다.\n\n1. **전치사 묶음**(in the kitchen, of the shop, with a red cap …)과 때·장소를 나타내는 말을 괄호로 묶습니다.\n2. 괄호 밖에서 맨 앞의 명사(또는 대명사)가 **주어**입니다.\n3. 주어 뒤에서 "~한다·~이다"에 해당하는 말이 **동사**입니다.\n\n예: The woman (with a red cap) works (at the bank).\n→ 주어: The woman · 동사: works\n\n> ⚠️ 동사 바로 앞의 명사가 주어라고 생각하기 쉽지만, 괄호 안의 명사는 주어가 될 수 없습니다. The keys (on the table) are mine. → 주어: The keys (the table 아님)',
        easy: '긴 문장에서 주어를 찾는 일은 단체 사진에서 주인공을 찾는 일과 비슷합니다. 먼저 배경(때·장소·꾸미는 말)을 손으로 가리면 주인공과 그 행동만 남습니다.\n\nThe man (in the blue shirt) drinks tea (every morning).\n→ 배경을 가리면 The man drinks tea. 주인공은 The man, 행동은 drinks입니다.',
        check: {
          type: 'choice',
          q: '다음 문장의 주어(중심 낱말)를 고르세요.\n\nThe window in the living room is open.',
          choices: ['window', 'room', 'open'],
          answer: 0,
          why: ['', '전치사 in 뒤의 명사로, 꾸며 주는 묶음(in the living room) 안에 있습니다. 괄호로 묶으면 주어가 보입니다.', '창문의 상태(열려 있는)를 설명하는 보어입니다.'],
          explain: 'The window (in the living room) is open. 괄호를 치우면 The window is open. 이므로 주어의 중심 낱말은 window입니다.',
        },
      },
    ],

    examples: [
      {
        q: '우리말을 영어 어순으로 바꾸어 보세요.\n\n저는 토요일에 공원에서 친구를 만납니다.',
        steps: [
          '뼈대부터 찾습니다. 누가? 저는(I) — 한다? 만납니다(meet) — 누구를? 친구를(my friend).',
          '영어 어순(주어 + 동사 + 목적어)으로 놓습니다: I meet my friend.',
          '수식어를 준비합니다. 장소 "공원에서"는 in the park, 때 "토요일에"는 on Saturday입니다.',
          '장소 → 때 순서로 문장 끝에 붙입니다.',
        ],
        answer: 'I meet my friend in the park on Saturday.',
      },
      {
        q: '다음 문장의 주어와 동사를 찾아보세요.\n\nThe coffee from this small cafe tastes really good.',
        steps: [
          '전치사 묶음을 괄호로 묶습니다: The coffee (from this small cafe) tastes really good.',
          '괄호 밖 맨 앞의 명사 묶음이 주어입니다: The coffee',
          '주어 뒤에서 "~하다"에 해당하는 말이 동사입니다: tastes(맛이 나다)',
          '나머지 really good: 커피의 맛을 설명하는 보어입니다. 이 가운데 really(정말) — good(좋은)을 꾸미는 부사입니다.',
        ],
        answer: '주어: The coffee · 동사: tastes',
      },
    ],

    terms: [
      { term: '어순', def: '문장에서 낱말이 놓이는 순서입니다. 영어는 주어 + 동사 + 목적어 순서이고, 자리가 곧 역할을 정합니다.' },
      { term: '품사', def: '낱말을 하는 일에 따라 나눈 갈래입니다. 명사·대명사·동사·형용사·부사·전치사 등이 있습니다.' },
      { term: '주어', def: '문장에서 "누가·무엇이"에 해당하는 말입니다. 예: **Jia** works hard.' },
      { term: '동사', def: '주어의 움직임이나 상태를 나타내는 말입니다. 영어에서는 주어 바로 뒤에 옵니다. 예: Jia **works** hard.' },
      { term: '목적어', def: '동사의 동작을 받는 대상으로, 우리말의 "~을·~를"에 해당합니다. 예: I like **coffee**.' },
      { term: '보어', def: '주어가 무엇인지·어떤지 보충해 주는 말입니다. 주어와 같은 대상이거나 주어의 상태입니다. 예: She is **a doctor**. / She is **busy**.' },
      { term: '수식어', def: '때·장소·방법 등을 덧붙이는 말입니다. 빼도 문장의 뼈대는 남습니다. 예: I work **in Seoul**.' },
      { term: '전치사', def: '명사 앞에 붙어 때·장소·방향 등을 나타내는 말입니다. 예: at seven, on Monday, in the kitchen' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '"민수는 사과를 좋아합니다."를 영어로 바르게 옮긴 것을 고르세요.',
        choices: ['Minsu apples likes.', 'Minsu likes apples.', 'Apples likes Minsu.', 'Likes Minsu apples.'],
        answer: 1,
        why: [
          '우리말 순서를 그대로 따랐습니다. 영어는 주어 바로 뒤에 동사가 옵니다.',
          '',
          '주어와 목적어 자리가 바뀌어 "사과가 민수를 좋아한다"는 뜻이 됩니다.',
          '동사가 맨 앞에 왔습니다. 영어의 평서문은 주어로 시작합니다.',
        ],
        explain: '주어(Minsu) + 동사(likes) + 목적어(apples) 순서입니다. 그래서 **Minsu likes apples.** 입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1,
        q: '밑줄 친 낱말의 품사를 고르세요.\n\nPlease drive __carefully__.',
        choices: ['명사', '동사', '형용사', '부사'],
        answer: 3,
        why: [
          '사람·물건·장소의 이름이 아닙니다.',
          '이 문장에서 움직임을 나타내는 동사는 drive입니다.',
          '형용사는 명사를 꾸밉니다. 이 낱말은 "운전하다"라는 동작을 어떻게 하는지 꾸밉니다.',
          '',
        ],
        explain: 'carefully(조심스럽게)는 동사 drive(운전하다)를 꾸며 "조심해서 운전하세요"라는 뜻을 만듭니다. 동사를 꾸미는 말은 부사입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 말을 고르세요.\n\nWe need a ___ sofa.',
        choices: ['newly', 'new', 'news', 'renew'],
        answer: 1,
        why: [
          '"새로이"라는 부사입니다. 명사 sofa 앞에서 꾸미는 자리에는 형용사가 옵니다.',
          '',
          '"소식"이라는 명사입니다. 명사 앞에서 꾸미는 말은 형용사입니다.',
          '"새롭게 하다"라는 동사입니다. 이 자리(a ___ sofa)에는 명사를 꾸미는 형용사가 옵니다.',
        ],
        explain: '빈칸(a ___ sofa)은 명사를 꾸미는 형용사 자리입니다. new(새)를 넣어 "새 소파가 필요합니다"가 됩니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 0,
        q: '다음 문장은 영어 어순에 맞는 바른 문장입니다.\n\nI coffee drink every morning.',
        answer: false,
        explain: '영어는 주어 바로 뒤에 동사가 옵니다. 우리말 순서를 따라 목적어를 동사 앞에 두면 안 됩니다. 바르게 고치면 **I drink coffee every morning.** 입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '밑줄 친 부분의 문장 성분을 고르세요.\n\nJia reads __a newspaper__ every morning.',
        choices: ['주어', '목적어', '보어', '수식어'],
        answer: 1,
        why: [
          '이 문장의 주어는 맨 앞의 Jia입니다.',
          '',
          '보어는 주어가 무엇인지·어떤지 설명합니다. 신문은 지아와 같은 것이 아니라 읽는 대상입니다.',
          '수식어는 때·장소·방법을 덧붙이는 말입니다. 신문은 "무엇을" 읽는지 알려 주는 대상입니다.',
        ],
        explain: 'a newspaper(신문) — 동사 reads(읽는다)의 동작을 받는 대상, 곧 "무엇을"에 해당하므로 목적어입니다. 때를 더하는 수식어는 every morning 입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 말을 고르세요.\n\nThe meeting starts ___ ten o\'clock.',
        choices: ['in', 'on', 'at'],
        answer: 2,
        why: [
          'in — 달·계절처럼 긴 기간에 씁니다. 열 시는 한 시각입니다.',
          'on — 요일·날짜처럼 하루에 씁니다. 열 시는 한 시각입니다.',
          '',
        ],
        explain: '시각(ten o\'clock, 열 시) 앞에 오는 전치사는 at 입니다: at ten o\'clock(열 시에).',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'text', concept: 4,
        q: '다음 문장의 동사를 그대로 쓰세요.\n\nThe students in my class study hard.',
        answer: ['study'],
        hint: '전치사 묶음(in my class)을 괄호로 묶어 보세요.',
        wrong: [
          { a: 'students', why: '주어입니다. 동사는 주어 뒤에서 "~한다"에 해당하는 말입니다.' },
          { a: 'class', why: '전치사 묶음(in my class) 안의 명사입니다. 괄호로 묶고 그 뒤를 보세요.' },
          { a: 'hard', why: '"열심히"라는 부사로, 동사를 꾸미는 말입니다.' },
        ],
        explain: 'The students (in my class) study hard. 괄호를 치우면 주어 The students 뒤에 오는 study(공부한다)가 동사입니다.',
      },
      {
        id: 'p8', level: 2, type: 'order', concept: 0,
        q: '우리말에 맞게 배열하세요.\n\n제 남동생은 일요일마다 저녁을 요리합니다.',
        choices: ['My brother', 'cooks', 'dinner', 'on Sundays'],
        answer: [0, 1, 2, 3],
        hint: '주어 → 동사 → 목적어를 먼저 놓고, 때는 끝에 붙입니다.',
        explain: '주어(My brother) + 동사(cooks) + 목적어(dinner) + 때(on Sundays) 순서입니다. **My brother cooks dinner on Sundays.**\n\n참고: on Sunday = 일요일에, on Sundays = 일요일마다',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 4,
        q: '다음 문장의 주어(중심 낱말)를 고르세요.\n\nThe price of these shoes seems too high.',
        choices: ['price', 'shoes', 'seems', 'high'],
        answer: 0,
        hint: '"of + 명사" 묶음을 괄호로 묶어 보세요.',
        why: [
          '',
          '전치사 묶음(of these shoes) 안의 명사입니다. "신발의" 가격이라고 꾸며 줄 뿐 주어가 아닙니다.',
          '"~해 보이다"라는 동사입니다.',
          '주어가 어떤지 설명하는 보어 부분입니다.',
        ],
        explain: 'The price (of these shoes) seems too high. 괄호를 치우면 The price seems too high. 이므로 주어의 중심 낱말은 price(가격)입니다. "이 신발의 가격이 너무 비싸 보입니다."',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 2,
        q: '다음 문장에서 **보어**를 고르세요.\n\nMy father is a bus driver.',
        choices: ['My father', 'is', 'a bus driver'],
        answer: 2,
        why: [
          '"누가"에 해당하는 주어입니다.',
          '주어와 보어를 이어 주는 동사입니다.',
          '',
        ],
        explain: 'My father = a bus driver(버스 기사) — 주어가 누구인지 보충하는 말이므로 보어입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'text', concept: 3,
        q: '빈칸에 알맞은 전치사를 쓰세요.\n\nWe usually go camping ___ October.',
        answer: ['in'],
        hint: '10월은 하루일까요, 긴 기간일까요?',
        wrong: [
          { a: 'on', why: 'on — 요일·날짜처럼 하루에 씁니다. 10월은 한 달이라는 긴 기간입니다.' },
          { a: 'at', why: 'at — 시각처럼 한 시점에 씁니다. 10월은 한 달이라는 긴 기간입니다.' },
        ],
        explain: '달(October) 앞에 오는 전치사는 in 입니다: in October(10월에). "저희는 보통 10월에 캠핑을 갑니다."',
      },
      {
        id: 'p12', level: 2, type: 'ox', concept: 2,
        q: '다음 문장에서 밑줄 친 부분을 빼도 문장의 뼈대는 그대로 남습니다.\n\nI read a book __in the library__.',
        answer: true,
        explain: '밑줄 친 부분은 장소를 덧붙이는 수식어입니다. 빼도 I read a book.(나는 책을 읽는다)이라는 뼈대가 남습니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 4,
        q: '다음 문장의 동사를 고르세요.\n\nThe woman with the red umbrella waits for the bus every morning.',
        choices: ['woman', 'umbrella', 'waits', 'bus'],
        answer: 2,
        hint: '전치사 묶음과 때를 나타내는 말을 먼저 괄호로 묶어 보세요.',
        why: [
          '주어의 중심 낱말입니다. 동사는 주어 뒤에 옵니다.',
          '전치사 묶음(with the red umbrella) 안의 명사입니다.',
          '',
          '전치사 묶음(for the bus) 안의 명사입니다.',
        ],
        explain: 'The woman (with the red umbrella) waits (for the bus) (every morning). 괄호를 치우면 The woman waits. 이므로 동사는 waits(기다린다)입니다.',
      },
      {
        id: 'a2', level: 3, type: 'order', concept: 3,
        q: '우리말에 맞게 배열하세요. 장소를 나타내는 말을 때를 나타내는 말보다 먼저 놓습니다.\n\n지아는 금요일 저녁에 회사 근처 식당에서 동료들을 만납니다.',
        choices: ['Jia', 'meets', 'her coworkers', 'at a restaurant near her office', 'on Friday evening'],
        answer: [0, 1, 2, 3, 4],
        hint: '뼈대(주어 + 동사 + 목적어)를 먼저 세우고, 장소 → 때 순서로 붙입니다.',
        explain: '뼈대 Jia meets her coworkers(지아는 동료들을 만난다) 뒤에 장소(at a restaurant near her office) → 때(on Friday evening)를 붙입니다. 요일이 들어간 때이므로 전치사는 on 입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 2,
        q: '**목적어**가 있는 문장을 고르세요.',
        choices: ['The baby sleeps in the afternoon.', 'My mother is a nurse.', 'Seojun opens the door.', 'The train arrives on time.'],
        answer: 2,
        why: [
          '"아기가 잔다"로 뼈대가 끝납니다. 뒤의 말(in the afternoon)은 때를 더하는 수식어입니다.',
          '동사 뒤의 말(a nurse)이 주어와 같은 사람이므로 보어입니다.',
          '',
          '동사 뒤의 말(on time)은 "제시간에"라는 뜻의 수식어입니다.',
        ],
        explain: 'Seojun opens the door.에서 the door(문) — 여는 동작을 받는 대상, 곧 "무엇을"이므로 목적어입니다. 나머지 문장의 동사 뒤에는 수식어나 보어만 있습니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 1,
        q: '밑줄 친 낱말이 **동사**로 쓰인 문장을 고르세요.',
        choices: ['I drink __water__ every day.', 'Please __water__ the plants.', 'The __water__ in this lake is clean.', 'I need a bottle of __water__.'],
        answer: 1,
        why: [
          '동사 drink 뒤에서 "무엇을" 마시는지 나타내는 명사(물)입니다.',
          '',
          'The 뒤에서 주어로 쓰인 명사(물)입니다.',
          '전치사 of 뒤의 명사(물)입니다.',
        ],
        explain: 'Please water the plants.(식물에 물을 주세요)에서는 water — "물을 주다"라는 동작을 나타내는 동사이고, 뒤에 목적어(the plants)도 있습니다. 같은 낱말도 자리에 따라 품사가 바뀝니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'text', concept: 3,
        q: '빈칸에 알맞은 전치사를 쓰세요.\n\nMy birthday is ___ May 5.',
        answer: ['on'],
        hint: '"5월"이 아니라 "5월 5일"이라는 하루입니다.',
        wrong: [
          { a: 'in', why: '달만 말할 때는 in May 이지만, 날짜까지 말하면 하루이므로 전치사는 on 입니다.' },
          { a: 'at', why: 'at — 시각처럼 한 시점에 씁니다. 날짜는 하루입니다.' },
        ],
        explain: '날짜(May 5) 앞에 오는 전치사는 on 입니다. 달만 있으면 in May(5월에), 날짜까지 있으면 on May 5(5월 5일에)입니다.',
      },
    ],

    deeper: [
      {
        title: '영어는 왜 어순이 엄격할까?',
        body: '천 년쯤 전의 옛 영어는 우리말의 조사처럼 **낱말 끝의 모양**으로 주어인지 목적어인지를 표시했습니다. 그래서 어순이 지금보다 비교적 자유로웠습니다.\n\n시간이 흐르면서 이런 낱말 끝이 대부분 사라지자, 역할을 주로 **자리**(그리고 전치사)로 알려 주게 되었습니다. 그 결과 "주어 + 동사 + 목적어"라는 순서가 굳어졌습니다.\n\n지금도 흔적이 남아 있습니다. I / me, he / him처럼 대명사는 주어일 때와 목적어일 때 모양이 다릅니다. 이 내용은 "명사·관사·대명사" 단원에서 자세히 다룹니다.',
      },
      {
        title: '다음 단원과의 연결 — 동사 뒤에 무엇이 오나',
        body: '이 단원에서 문장 성분(주어·동사·목적어·보어·수식어)을 익혔습니다. 영어 문장은 **동사 뒤에 어떤 성분이 오느냐**에 따라 다섯 가지 꼴로 나눌 수 있는데, 이것을 "문장의 5형식"이라고 합니다.\n\n- 동사로 끝나는 문장: The baby sleeps.\n- 동사 뒤에 보어: My mother is a nurse.\n- 동사 뒤에 목적어: Seojun opens the door.\n\n오늘 배운 성분 이름이 그 단원의 열쇠가 됩니다.',
      },
    ],

    faq: [
      {
        q: '품사랑 문장 성분은 뭐가 달라요?',
        a: '품사는 낱말 자체의 종류(명사·동사·형용사 …)이고, 문장 성분은 그 낱말이 문장 안에서 맡은 역할(주어·목적어·보어 …)입니다.\n\n예를 들어 명사 coffee — "Coffee is hot."에서는 주어, "I like coffee."에서는 목적어입니다. 품사는 같아도 역할은 자리에 따라 바뀝니다.',
      },
      {
        q: '때랑 장소를 같이 쓰면 뭘 먼저 써요?',
        a: '보통 **장소 → 때** 순서로 문장 끝에 둡니다. I work in Seoul on weekdays.(저는 평일에 서울에서 일합니다.)\n\n때를 강조하거나 문장이 길어질 때는 때를 맨 앞으로 옮길 수도 있습니다. On weekdays, I work in Seoul.',
      },
      {
        q: '우리말은 주어를 자주 빼는데 영어도 빼도 되나요?',
        a: '영어는 평서문에서 주어를 거의 빼지 않습니다. 날씨나 시간을 말할 때처럼 마땅한 주어가 없으면 It 하나를 주어로 세웁니다. It is cold today.(오늘은 춥습니다.)\n\n다만 명령문은 주어(you)를 빼고 동사로 시작합니다. Please sit down.(앉으세요.)',
      },
    ],

    mistakes: [
      '우리말 순서대로 동사를 맨 끝에 두는 실수 — I coffee drink. (✗) → **I drink coffee.** (○) 동사를 주어 바로 뒤에 둡니다.',
      '전치사 묶음 안의 명사를 주어로 착각하는 실수 — The keys (on the table) are mine. 에서 주어는 The keys입니다. 괄호로 묶고 찾습니다.',
      '요일·날짜 앞에 엉뚱한 전치사(in)를 쓰는 실수 — 하루(on Monday, on May 5)에는 on, 달·계절(in May, in summer)에는 in 입니다.',
    ],

    gens: [
      {
        id: 'prep-time-place',
        level: 1,
        title: '때·장소 앞의 at·on·in',
        make: function (R) {
          var kind, sentence, ans, plain;
          if (R.int(1, 3) === 1) {
            var pl = R.pick(PLACES);
            kind = 'place';
            sentence = pl[0];
            ans = pl[1];
          } else {
            var tm = R.pick(TIMES);
            kind = 'time';
            sentence = R.pick(TIME_FRAMES).replace('{X}', tm[0]);
            ans = tm[1];
          }
          plain = sentence.replace('___', ans);
          var rule = PREP_RULE[kind];
          var opts = ['at', 'on', 'in'];
          return {
            type: 'choice', concept: 3,
            q: '빈칸에 알맞은 말을 고르세요.\n\n' + sentence,
            choices: opts,
            answer: opts.indexOf(ans),
            why: opts.map(function (o) { return o === ans ? '' : rule[o] + ' 이 빈칸에는 맞지 않습니다.'; }),
            explain: rule[ans] + '\n\n바른 문장: ' + plain,
          };
        },
      },
      {
        id: 'find-subject-verb',
        level: 2,
        title: '긴 문장에서 주어·동사 찾기',
        make: function (R) {
          var item = R.pick(SV);
          var askVerb = R.bool();
          var target = askVerb ? 'V' : 'S';
          var words = R.shuffle(item[2]);
          var ansIdx = -1;
          words.forEach(function (w, i) { if (w[1] === target) ansIdx = i; });
          var subj = '', verb = '';
          item[2].forEach(function (w) { if (w[1] === 'S') subj = w[0]; if (w[1] === 'V') verb = w[0]; });
          return {
            type: 'choice', concept: 4,
            q: (askVerb ? '다음 문장의 **동사**를 고르세요.' : '다음 문장의 **주어**(중심 낱말)를 고르세요.') + '\n\n' + item[0],
            choices: words.map(function (w) { return w[0]; }),
            answer: ansIdx,
            hint: '전치사 묶음과 때·장소를 나타내는 말을 괄호로 묶어 보세요.',
            why: words.map(function (w) { return w[1] === target ? '' : ROLE_WHY[w[1]]; }),
            explain: '꾸며 주는 말을 괄호로 묶으면\n\n' + item[1] + '\n\n괄호 밖 맨 앞의 명사 묶음이 주어이고(중심 낱말: ' + subj + '), 주어 바로 뒤에 오는 동사는 ' + verb + '입니다.',
          };
        },
      },
    ],

    vocab: [
      { w: 'kitchen', m: '부엌', ex: 'My father cooks in the kitchen.', exm: '아버지는 부엌에서 요리를 합니다.' },
      { w: 'breakfast', m: '아침 식사', ex: 'I have breakfast at seven.', exm: '저는 일곱 시에 아침을 먹습니다.' },
      { w: 'coworker', m: '직장 동료', ex: 'My coworker helps me every day.', exm: '제 동료는 매일 저를 도와줍니다.' },
      { w: 'restaurant', m: '식당', ex: 'We meet at a restaurant near the station.', exm: '우리는 역 근처 식당에서 만납니다.' },
      { w: 'newspaper', m: '신문', ex: 'Jia reads a newspaper on the bus.', exm: '지아는 버스에서 신문을 읽습니다.' },
      { w: 'umbrella', m: '우산', ex: 'Take an umbrella with you.', exm: '우산을 가져가세요.' },
      { w: 'library', m: '도서관', ex: 'The library opens at nine.', exm: '도서관은 아홉 시에 문을 엽니다.' },
      { w: 'meeting', m: '회의', ex: 'We have a meeting on Monday.', exm: '우리는 월요일에 회의가 있습니다.' },
      { w: 'price', m: '가격', ex: 'The price of this bag is high.', exm: '이 가방의 가격은 비쌉니다.' },
      { w: 'carefully', m: '조심스럽게, 주의 깊게', ex: 'Please read the form carefully.', exm: '서류를 주의 깊게 읽어 주세요.' },
      { w: 'usually', m: '보통, 대개', ex: 'I usually walk to work.', exm: '저는 보통 걸어서 출근합니다.' },
      { w: 'quietly', m: '조용히', ex: 'The students study quietly.', exm: '학생들은 조용히 공부합니다.' },
    ],
  });
})();
