/* 중3 영어 · 과정 설명하기 (수동태 심화) */
Tutor.registerUnit({
  id: 'eng-m3-09',
  course: 'eng-m3',
  title: '과정 설명하기 (수동태 심화)',
  summary: '조동사가 있는 수동태, 4형식 수동태, \'have + 목적어 + 과거분사\'로 일이 이루어지는 과정을 설명해요.',
  goals: [
    '조동사가 있는 수동태(조동사 + be + 과거분사)를 쓰고 해석할 수 있어요.',
    '4형식 문장을 두 가지 수동태로 바꾸고 알맞은 전치사를 쓸 수 있어요.',
    'have + 목적어 + 과거분사로 남이 해 준 일을 말할 수 있어요.',
    '능동태와 수동태 중 알맞은 것을 고르고, 과정을 설명하는 글을 순서대로 정리할 수 있어요.',
  ],
  standards: ['[9영02-03]', '[9영01-02]', '[9영01-04]'],

  concepts: [
    {
      title: '조동사가 있는 수동태',
      body: '중2에서 배운 수동태는 **be + 과거분사**예요. 여기에 will, can, must, should 같은 **조동사**가 붙으면 이렇게 돼요.\n\n**조동사 + be + 과거분사**\n\n| 능동태 | 수동태 |\n|---|---|\n| We **will hold** the festival in May. | The festival **will be held** in May. |\n| You **can see** the stars at night. | The stars **can be seen** at night. |\n| You **must do** this work today. | This work **must be done** today. |\n\n조동사 뒤에는 언제나 **동사원형**이 오므로 be동사도 원형 **be** 그대로 써요. 주어가 단수든 복수든 be는 바뀌지 않아요.\n\n- 부정문: 조동사 뒤에 not → The rule **should not be broken**.\n- 의문문: 조동사를 맨 앞으로 → **Can** the stars **be seen** from here?\n\n> ⚠️ will is held(✗), can seen(✗), must be do(✗) — be를 빼거나, be를 바꾸거나, 과거분사를 빼먹지 않아요.',
      easy: '조동사 수동태는 **세 칸짜리 기차**라고 생각해 보세요.\n\n[ 조동사 ] + [ be ] + [ 과거분사 ]\n[ will ] + [ be ] + [ held ] → 열릴 것이다\n[ can ] + [ be ] + [ seen ] → 보일 수 있다\n\n가운데 칸 **be**는 언제나 그대로예요. is나 are로 바꾸지 않아요. 조동사 뒤에는 원형이 와야 하니까요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nThe concert will [[빈칸]] in the park next Friday.',
        choices: ['be held', 'is held', 'held'],
        answer: 0,
        why: [
          '',
          '조동사 will 뒤에는 동사원형이 와요. is가 아니라 원형 be를 써요.',
          'will held는 "콘서트가 열린다"는 수동의 뜻이 되지 않아요. will 뒤에 be + 과거분사를 써요.',
        ],
        explain: '콘서트는 "열리는" 것이므로 수동태예요. 조동사가 있으니 **will be held**(조동사 + be + 과거분사)로 써요.',
      },
    },
    {
      title: '4형식 문장의 수동태',
      body: '4형식 문장에는 목적어가 두 개 있어요. **간접목적어(~에게)**와 **직접목적어(~을)**예요.\n\nThe principal **gave** her **a prize**. (교장 선생님이 그녀에게 상을 주었어요.)\n\n목적어가 둘이라서 수동태도 **두 가지**로 만들 수 있어요.\n\n1. 간접목적어(her)가 주어: **She was given** a prize (by the principal).\n2. 직접목적어(a prize)가 주어: **A prize was given to** her (by the principal).\n\n직접목적어를 주어로 쓰면 남은 간접목적어 앞에 **전치사**를 붙여요.\n\n| 전치사 | 동사 |\n|---|---|\n| **to** | give, send, show, teach, tell, bring, lend |\n| **for** | make, buy, cook |\n\n- A letter **was sent to** me. / A cake **was made for** me.\n\n> ⚠️ make, buy, cook 같은 동사는 보통 직접목적어만 주어로 써요. A cake was made for me.(○) / I was made a cake.(✗)',
      easy: '"민수가 지아에게 책을 주었다"를 수동태로 바꾸면, 주인공을 **지아**로 할 수도, **책**으로 할 수도 있어요.\n\n- 지아가 주인공: Jia **was given** a book. (지아는 책을 받았어요.)\n- 책이 주인공: A book **was given to** Jia. (책이 지아에게 주어졌어요.)\n\n책이 주인공일 때는 "누구에게" 갔는지 알려 주려고 **to**를 붙여요. 만들어 주거나 사 주는 동사(make, buy)는 "누구를 위해"라서 **for**를 붙여요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nA nice watch was given [[빈칸]] my brother on his birthday.',
        choices: ['to', 'for', 'by'],
        answer: 0,
        why: [
          '',
          'for는 make, buy, cook처럼 "~을 위해" 해 주는 동사에 써요. give는 to를 써요.',
          'by는 그 일을 한 사람(행위자) 앞에 써요. 형은 시계를 받은 사람이에요.',
        ],
        explain: 'give의 직접목적어(a nice watch)가 주어가 되었으므로, 받은 사람 앞에 **to**를 붙여요. "멋진 시계가 생일에 형에게 주어졌어요."',
      },
    },
    {
      title: 'have + 목적어 + 과거분사',
      body: '머리를 내가 직접 자르지 않고 미용사가 잘라 주었을 때, 영어로는 이렇게 말해요.\n\nI **had my hair cut**. (나는 머리를 잘랐어요. = 머리가 잘리게 했어요.)\n\n**have + 목적어 + 과거분사**는 "(남을 시켜서) 목적어가 ~되게 하다"라는 뜻이에요. 목적어와 과거분사는 **수동 관계**(머리가 잘리다)예요.\n\n- I **had my bike fixed**. (자전거를 고쳤어요 — 수리점에서)\n- She **had her photo taken**. (그녀는 사진을 찍었어요 — 사진사가 찍어 줌)\n- We **will have the house painted**. (우리는 집을 페인트칠할 거예요 — 업체에 맡겨서)\n\n| 문장 | 누가 했나 |\n|---|---|\n| I **cut** my hair. | 내가 직접 |\n| I **had** my hair **cut**. | 다른 사람이 |\n\n> 💡 get + 목적어 + 과거분사도 비슷한 뜻이에요. I **got** my bike **fixed**.\n\n> ⚠️ 중2에서 배운 have + 목적어 + **동사원형**(I had him fix my bike. 그에게 고치게 했다)과 구별해요. 목적어가 **하는** 쪽이면 동사원형, **당하는** 쪽이면 과거분사예요.',
      easy: '미용실에서 "머리 잘랐어!"라고 말하지만, 사실 가위를 든 사람은 미용사예요.\n\n영어는 이걸 정확하게 말해요. I **had** my hair **cut**. — "내 머리가 잘리게 했다"\n\n- 내 자전거가 **고쳐지게** 했다 → I had my bike **fixed**.\n- 내 사진이 **찍히게** 했다 → I had my photo **taken**.\n\n목적어(머리, 자전거, 사진)가 **당하는** 쪽이니 과거분사를 써요.',
      check: {
        type: 'ox',
        q: 'Jia had her computer repaired.는 "지아가 컴퓨터를 직접 고쳤다"라는 뜻이에요.',
        answer: false,
        explain: 'have + 목적어 + 과거분사는 **다른 사람을 시켜서** 목적어가 ~되게 했다는 뜻이에요. "지아는 (수리 기사에게 맡겨) 컴퓨터를 수리받았어요." 직접 고쳤다면 Jia repaired her computer.예요.',
      },
    },
    {
      title: '능동태와 수동태, 무엇을 고를까?',
      body: '같은 일도 **무엇에 초점을 두느냐**에 따라 능동태와 수동태를 골라요.\n\n**능동태**: 누가 했는지(행위자)가 중요할 때\n- **Seojun** painted this picture. (서준이가 그렸다는 것이 중요)\n\n**수동태**: 무엇이 그 일을 당했는지가 중요하고, 행위자가\n- 모르거나: My bike **was stolen** last night. (누가 훔쳤는지 몰라요)\n- 뻔하거나: The thief **was arrested**. (경찰이 체포한 게 뻔해요)\n- 중요하지 않을 때: Rice **is grown** in many parts of Asia.\n\n이럴 때는 **by + 행위자**를 빼는 경우가 많아요. 그래서 실제 글에서는 by가 없는 수동태가 훨씬 많아요.\n\n또 하나, 주어가 그 일을 **하는** 쪽이면 능동태, **당하는** 쪽이면 수동태예요.\n- The letter **was written** in 1950. (편지는 쓰이는 쪽)\n- The boy **wrote** a letter. (소년은 쓰는 쪽)',
      easy: '사진을 찍을 때 **누구를 가운데에 세울지** 고르는 것과 같아요.\n\n- 그린 사람을 가운데에: **Seojun** painted this picture.\n- 그림을 가운데에: **This picture** was painted by Seojun.\n\n누가 했는지 모르거나 말할 필요가 없으면 그림만 찍으면 돼요. 그래서 수동태에서는 by ~를 자주 빼요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nThis bridge [[빈칸]] about 100 years ago.',
        choices: ['was built', 'built', 'is building'],
        answer: 0,
        why: [
          '',
          '다리는 짓는 쪽이 아니라 지어지는 쪽이에요. 주어가 당하는 쪽이면 수동태를 써요.',
          '다리가 무엇을 짓고 있는 것이 아니에요. 그리고 about 100 years ago는 과거예요.',
        ],
        explain: '다리는 사람들에 의해 **지어진** 것이고, 지은 사람은 중요하지 않아요. 과거의 일이므로 **was built**를 써요.',
      },
    },
    {
      title: '과정을 설명하는 글 읽기',
      body: '물건이 만들어지는 **과정**을 설명하는 글에는 수동태가 많이 나와요. 누가 만드는지보다 **물건이 어떻게 되는지**가 중요하니까요.\n\n순서를 알려 주는 말에 주목해요: **First**, **Then / Next**, **After that**, **Finally**\n\n예) How is strawberry jam made?\n\n**First**, the strawberries **are washed** and **cut** into small pieces. **Then** sugar **is added** to them. **After that**, the mixture **is boiled** for about 30 minutes. **Finally**, the jam **is put** into clean jars.\n\n→ 씻고 자르기 → 설탕 넣기 → 끓이기 → 병에 담기\n\n> 💡 순서를 정리할 때는 ① 순서를 알려 주는 말에 표시하고 ② 수동태 동사(are washed, is added …)에 밑줄을 그은 뒤 ③ 동사만 차례로 이어 보면 과정이 한눈에 보여요.',
      easy: '과정 글은 **요리 순서표**와 같아요. 요리사가 누구인지는 중요하지 않고 재료가 **어떻게 되는지**만 알면 돼요.\n\n딸기가 씻긴다 → 설탕이 넣어진다 → 끓여진다 → 병에 담긴다\n\n그래서 영어로는 "딸기**가** ~된다"라는 수동태(are washed, is added)를 쓰고, First → Then → After that → Finally로 순서를 알려 줘요.',
      check: {
        type: 'choice',
        q: '다음 글에서 가장 **마지막**에 하는 일을 고르세요.\n\nFirst, the milk is heated. Then a little lemon juice is added. After that, the milk is cooled slowly. Finally, the cheese is pressed into a round shape.',
        choices: ['치즈를 둥근 모양으로 누른다.', '레몬즙을 조금 넣는다.', '우유를 데운다.'],
        answer: 0,
        why: [
          '',
          'Then 뒤에 나오는 일이라 두 번째 단계예요.',
          'First 뒤에 나오는 일이라 첫 번째 단계예요.',
        ],
        explain: '**Finally** 뒤의 일이 마지막이에요. the cheese **is pressed** into a round shape — 치즈를 둥근 모양으로 눌러요.',
      },
    },
  ],

  examples: [
    {
      q: '능동태 문장을 두 가지 수동태로 바꿔 보세요.\n\nMr. Kim taught us English.',
      steps: [
        '간접목적어는 us(우리에게), 직접목적어는 English(영어를)예요.',
        'us를 주어로: 주격 **We**로 바꾸고, 주어가 복수이고 과거이니 **were taught**. → We were taught English by Mr. Kim.',
        'English를 주어로: 단수이고 과거이니 **was taught**. 남은 us 앞에 teach에 맞는 전치사 **to**를 붙여요. → English was taught to us by Mr. Kim.',
      ],
      answer: 'We were taught English by Mr. Kim. / English was taught to us by Mr. Kim.',
    },
    {
      q: '우리말에 맞게 영어로 써 보세요.\n\n그 숙제는 내일까지 끝내져야 해요. (must, finish 이용)',
      steps: [
        '숙제는 끝내는 쪽이 아니라 **끝내지는** 쪽이므로 수동태예요.',
        '조동사 must가 있으니 **must + be + 과거분사**로 써요.',
        'finish의 과거분사는 finished. → must be finished',
      ],
      answer: 'The homework must be finished by tomorrow.',
    },
  ],

  terms: [
    { term: '수동태', def: '주어가 동작을 당하는 쪽일 때 쓰는 문장 형태예요. be + 과거분사. 예: The window was broken.' },
    { term: '조동사가 있는 수동태', def: '조동사 + be + 과거분사로 써요. be는 언제나 원형이에요. 예: will be held, can be seen, must be done' },
    { term: '간접목적어', def: '4형식 문장에서 "~에게"에 해당하는 목적어예요. 예: She gave **me** a pen.의 me' },
    { term: '직접목적어', def: '4형식 문장에서 "~을/를"에 해당하는 목적어예요. 예: She gave me **a pen**.의 a pen' },
    { term: '행위자', def: '동작을 하는 사람이나 사물이에요. 수동태에서는 by + 행위자로 나타내고, 모르거나 중요하지 않으면 빼요.' },
    { term: '과거분사', def: '동사의 한 꼴로, 수동태와 완료 시제에 써요. 예: make → made, see → seen, cut → cut' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nThe stars can [[빈칸]] clearly from the top of the mountain.',
      choices: ['be seen', 'is seen', 'seen', 'be saw'],
      answer: 0,
      why: [
        '',
        '조동사 can 뒤에는 동사원형이 와요. is가 아니라 원형 be를 써요.',
        'can seen에는 be가 빠졌어요. 수동태는 can + be + 과거분사예요.',
        'saw는 과거형이에요. 수동태에는 과거분사 seen을 써요.',
      ],
      explain: '별은 "보이는" 쪽이므로 수동태, 조동사 can이 있으니 **can be seen**이에요. "산꼭대기에서 별이 또렷하게 보일 수 있어요."',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 0,
      q: '빈칸에 알맞은 한 낱말을 쓰세요.\n\nThis work must [[빈칸]] done by Friday.\n(이 일은 금요일까지 끝내져야 해요.)',
      answer: ['be'],
      wrong: [
        { a: 'is', why: '조동사 must 뒤에는 동사원형이 와요. is가 아니라 be를 써요.' },
        { a: 'been', why: 'been은 완료형(have been)에 써요. 조동사 뒤에는 원형 be를 써요.' },
      ],
      explain: '조동사가 있는 수동태는 **조동사 + be + 과거분사**예요. must **be** done',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말을 고르세요.\n\nA birthday cake was made [[빈칸]] my mother by my sister.',
      choices: ['for', 'to', 'by', 'of'],
      answer: 0,
      why: [
        '',
        'to는 give, send, show처럼 받는 사람에게 "건너가는" 동사에 써요. make는 "~을 위해" 만들어 주는 것이라 for를 써요.',
        'by는 그 일을 한 사람 앞에 써요. 케이크를 만든 사람은 my sister이고, 엄마는 케이크를 받은 사람이에요.',
        'of는 ask처럼 묻는 동사에 쓰는 경우가 있어요. make는 for를 써요.',
      ],
      explain: 'make는 "~을 위해 만들어 주다"라는 뜻이라 직접목적어가 주어가 된 수동태에서 받는 사람 앞에 **for**를 써요. "언니가 엄마를 위해 생일 케이크를 만들었어요."',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: 'She was given a prize.와 A prize was given to her.는 같은 일을 나타내요.',
      answer: true,
      explain: '둘 다 4형식 문장 (Someone) gave her a prize.의 수동태예요. 앞 문장은 간접목적어 her를, 뒤 문장은 직접목적어 a prize를 주어로 했어요. 뒤 문장에서는 her 앞에 **to**를 붙여요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르세요.\n\nI [[빈칸]] my hair cut at the hair shop yesterday.',
      choices: ['had', 'was', 'did', 'am'],
      answer: 0,
      why: [
        '',
        'I was my hair cut은 문장이 되지 않아요. "머리를 (남이) 자르게 했다"는 had my hair cut이에요.',
        'did는 이런 꼴로 쓰지 않아요. have + 목적어 + 과거분사를 써요.',
        'yesterday는 과거이고, am은 이런 꼴로 쓰지 않아요.',
      ],
      explain: '미용실에서 남이 잘라 준 것이므로 **have + 목적어 + 과거분사**를 써요. 과거이니 **had** my hair cut이에요.',
    },
    {
      id: 'p6', level: 1, type: 'short', concept: 2,
      q: '괄호 안의 낱말을 알맞은 꼴로 바꿔 쓰세요.\n\nI had my bike [[빈칸]] at the shop. (fix)\n(나는 가게에 맡겨 자전거를 고쳤어요.)',
      answer: ['fixed'],
      wrong: [
        { a: 'fix', why: '자전거는 고치는 쪽이 아니라 고쳐지는 쪽이에요. 목적어가 당하는 쪽이면 과거분사 fixed를 써요.' },
        { a: 'fixing', why: '자전거가 무엇을 고치고 있는 것이 아니에요. 고쳐지는 것이니 과거분사 fixed를 써요.' },
      ],
      explain: '자전거는 **고쳐지는** 쪽이므로 have + 목적어 + **과거분사**, 곧 had my bike **fixed**예요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말을 고르세요.\n\nEnglish [[빈칸]] in many countries around the world.',
      choices: ['is spoken', 'speaks', 'is speaking', 'spoke'],
      answer: 0,
      why: [
        '',
        '영어가 무엇을 말하는 것이 아니에요. 영어는 사람들에 의해 "말해지는" 쪽이에요.',
        '영어가 지금 무엇을 말하고 있는 것이 아니에요. 수동태를 써요.',
        '영어가 무엇을 말한 것이 아니에요. 그리고 지금도 쓰이는 사실이니 현재형이 알맞아요.',
      ],
      explain: '영어는 사람들이 **말하는 것**, 곧 말해지는 쪽이에요. 누가 말하는지는 뻔하니 by ~ 없이 **is spoken**을 써요. "영어는 세계 여러 나라에서 쓰여요."',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 3,
      q: '대화의 빈칸에 가장 알맞은 대답을 고르세요.\n\nA: What a beautiful picture! Who painted it?\nB: [[빈칸]]',
      choices: ['Seojun painted it.', 'It was painted.', 'It painted Seojun.', 'Seojun was painted.'],
      answer: 0,
      why: [
        '',
        '"누가" 그렸는지 물었는데 그린 사람(행위자)이 빠졌어요. 행위자가 중요할 때는 능동태로 말해요.',
        '그림이 서준이를 그렸다는 뜻이 되어 거꾸로예요.',
        '서준이가 그려졌다는 뜻이 되어요. 그림 속 인물이 아니라 그린 사람을 물었어요.',
      ],
      hint: '질문이 무엇을 알고 싶어 하는지 보세요.',
      explain: '"누가 그렸니?"라고 **행위자**를 물었으므로, 행위자를 주어로 한 능동태 **Seojun painted it.**이 가장 알맞아요.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 0,
      q: '우리말에 맞게 배열하세요.\n\n그 축제는 다음 달에 열릴 거예요.',
      choices: ['The festival', 'will', 'be', 'held', 'next month'],
      answer: [0, 1, 2, 3, 4],
      hint: '조동사 + be + 과거분사 순서예요.',
      explain: '주어(The festival) → 조동사(will) → be → 과거분사(held) → 때(next month). → The festival will be held next month.',
    },
    {
      id: 'p10', level: 2, type: 'short', concept: 1,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 한 낱말을 쓰세요.\n\nMy uncle showed me some old photos.\n→ Some old photos were shown [[빈칸]] me by my uncle.',
      answer: ['to'],
      wrong: [
        { a: 'for', why: 'for는 make, buy, cook처럼 "~을 위해" 해 주는 동사에 써요. show는 to를 써요.' },
        { a: 'by', why: 'by는 행위자 앞에 써요. 사진을 보여 준 사람은 my uncle이고, me는 본 사람이에요.' },
      ],
      hint: '직접목적어가 주어가 되면 남은 간접목적어 앞에 전치사를 붙여요.',
      explain: 'show는 받는 쪽으로 "건너가는" 동사라 간접목적어 앞에 **to**를 써요. → Some old photos were shown **to** me by my uncle.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '글을 읽고, 물음에 답하세요.\n\nHow is paper made? First, trees are cut down and taken to a factory. Then the wood is cut into very small pieces. After that, the pieces are mixed with water to make a soft mixture. Next, the mixture is spread thin and pressed. Finally, it is dried and rolled into big sheets of paper.\n\n잘게 자른 나무 조각을 물과 섞은 **바로 다음**에 하는 일은 무엇일까요?',
      choices: ['혼합물을 얇게 펴서 누른다.', '나무를 공장으로 옮긴다.', '말려서 큰 종이로 만다.', '나무를 아주 작게 자른다.'],
      answer: 0,
      why: [
        '',
        '나무를 공장으로 옮기는 것은 First의 일로, 물과 섞기보다 훨씬 앞이에요.',
        '말리고 마는 것은 Finally의 일이에요. 그 사이에 한 단계가 더 있어요.',
        '작게 자르는 것은 물과 섞기 바로 앞(Then)의 일이에요.',
      ],
      hint: 'After that 다음에 오는 순서 말을 찾아보세요.',
      explain: 'After that(물과 섞기) 다음은 **Next**: the mixture **is spread** thin and **pressed** — 혼합물을 얇게 펴서 눌러요. 순서: 자르고 옮기기 → 잘게 자르기 → 물과 섞기 → 펴서 누르기 → 말려서 말기.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'order', concept: 4,
      q: '빵이 만들어지는 과정이 되도록 순서대로 놓으세요.',
      choices: [
        'Flour, water, and yeast are mixed together.',
        'The dough is left in a warm place to rise.',
        'The risen dough is shaped into small rolls.',
        'The rolls are baked in a hot oven.',
      ],
      answer: [0, 1, 2, 3],
      hint: '순서 말이 없으니 무엇이 먼저 있어야 다음 일을 할 수 있는지 따져 보세요. dough는 "반죽", risen dough는 "부푼 반죽"이에요.',
      explain: '재료를 섞어야 반죽(dough)이 생기고 → 반죽을 따뜻한 곳에 두어 부풀리고 → 부푼 반죽(the risen dough)을 작은 빵 모양으로 빚은 뒤 → 오븐에 구워요. 수동태 동사(are mixed, is left, is shaped, are baked)만 이어 봐도 과정이 보여요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: '어법상 **틀린** 문장을 고르세요.',
      choices: [
        'I was bought a new bag by my dad.',
        'A new bag was bought for me by my dad.',
        'I was sent a letter by Jia.',
        'A letter was sent to me by Jia.',
      ],
      answer: 0,
      why: [
        '',
        'buy는 직접목적어(a new bag)를 주어로 하고 받는 사람 앞에 for를 써요. 바른 문장이에요.',
        'send는 간접목적어(I)를 주어로 한 수동태도 쓸 수 있어요. 바른 문장이에요.',
        'send는 직접목적어를 주어로 하고 받는 사람 앞에 to를 써요. 바른 문장이에요.',
      ],
      hint: 'make, buy, cook 같은 동사는 어느 목적어를 주어로 쓰는지 떠올려 보세요.',
      explain: 'buy는 보통 **직접목적어만** 주어로 써요. 그래서 I was bought …는 어색하고, **A new bag was bought for me** by my dad.로 써요. send는 두 가지 수동태가 모두 가능해요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 2,
      q: '(A), (B)에 알맞은 말을 짝 지은 것을 고르세요.\n\nI had the mechanic (A) [[빈칸]] my car.\n= I had my car (B) [[빈칸]] by the mechanic.',
      choices: ['(A) fix — (B) fixed', '(A) fixed — (B) fix', '(A) fixed — (B) fixed', '(A) fix — (B) fix'],
      answer: 0,
      why: [
        '',
        '거꾸로예요. 정비사는 고치는 쪽이라 동사원형, 차는 고쳐지는 쪽이라 과거분사예요.',
        '(A)의 정비사는 직접 고치는 쪽이에요. 목적어가 하는 쪽이면 동사원형을 써요.',
        '(B)의 차는 스스로 고치지 않아요. 목적어가 당하는 쪽이면 과거분사를 써요.',
      ],
      hint: '목적어가 그 일을 "하는" 쪽인지 "당하는" 쪽인지 보세요.',
      explain: '(A) 목적어 the mechanic은 고치는 쪽 → 동사원형 **fix**. (B) 목적어 my car는 고쳐지는 쪽 → 과거분사 **fixed**. 둘 다 "정비사에게 맡겨 차를 고쳤다"는 뜻이에요.',
    },
    {
      id: 'a4', level: 3, type: 'short', concept: 0,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 두 낱말을 쓰세요.\n\nYou can\'t use your phones in the library.\n→ Your phones can\'t [[빈칸]] in the library.',
      answer: ['be used'],
      wrong: [
        { a: 'is used', why: '조동사 can\'t 뒤에는 원형이 와요. is가 아니라 be를 써요.' },
        { a: 'be use', why: 'be 뒤에는 동사원형이 아니라 과거분사 used를 써요.' },
        { a: 'been used', why: '조동사 뒤에는 원형 be를 써요. been은 완료형에 써요.' },
      ],
      hint: '전화기가 주어가 되었으니 "사용되는" 쪽이에요.',
      explain: '목적어 your phones가 주어가 되었으니 수동태, 조동사 can\'t가 있으니 can\'t **be used**예요. 일반 사람(you)이 행위자라서 by you는 빼요.',
    },
  ],

  deeper: [
    {
      title: '"당했다"는 뜻의 have + 목적어 + 과거분사',
      body: 'have + 목적어 + 과거분사는 "시켜서 ~되게 하다" 말고, **원하지 않은 일을 당했다**는 뜻으로도 써요.\n\n- I **had my bag stolen** on the bus. (버스에서 가방을 도둑맞았어요.)\n- She **had her window broken** by a baseball. (그녀는 야구공에 창문이 깨졌어요.)\n\n가방을 도둑에게 훔치게 시킨 것은 아니지요. 목적어(가방)가 **당한** 일을 주어(나)의 입장에서 말하는 거예요. 어느 뜻인지는 앞뒤 내용으로 판단해요.\n\n또 과정 글에서는 수동태 외에도 순서를 나타내는 말이 중요해요. First, Second, Then, Next, After that, Finally 외에 **Once** the water boils, … (일단 물이 끓으면)처럼 접속사로 순서를 나타내기도 해요.',
    },
  ],

  faq: [
    {
      q: '조동사 수동태에서 왜 is나 are가 아니라 be를 써요?',
      a: '조동사 뒤에는 언제나 **동사원형**이 오기 때문이에요. can **swim**, will **go**처럼요. 수동태의 be동사도 조동사 뒤에서는 원형 be가 돼요. 그래서 주어가 단수든 복수든 will **be** held, can **be** seen이에요.',
    },
    {
      q: '4형식 수동태에서 to를 쓸지 for를 쓸지 어떻게 알아요?',
      a: '물건이 받는 사람에게 **건너가는** 동사(give, send, show, teach, tell, lend)는 **to**, 받는 사람을 **위해** 만들거나 사 주는 동사(make, buy, cook)는 **for**예요. "엄마에게 보냈다"는 to, "엄마를 위해 만들었다"는 for로 생각하면 쉬워요.',
    },
    {
      q: 'I cut my hair.랑 I had my hair cut.은 뭐가 달라요?',
      a: 'I cut my hair.는 **내가 직접** 잘랐다는 뜻이고, I had my hair cut.은 미용사처럼 **다른 사람이** 잘라 주었다는 뜻이에요. 우리말로는 둘 다 "머리를 잘랐다"라고 해서 헷갈리기 쉬워요.',
    },
    {
      q: '수동태에서 by ~는 언제 빼요?',
      a: '행위자를 **모르거나**(My wallet was stolen.), **뻔하거나**(The thief was arrested.), **중요하지 않을 때**(Rice is grown in Asia.) 빼요. 실제 글에서는 by가 없는 수동태가 더 많아요.',
    },
  ],

  mistakes: [
    '조동사 뒤에 be를 바꾸거나 빼는 실수 — will is held(✗), can seen(✗) → will be held, can be seen',
    '4형식 수동태에서 전치사를 빼거나 잘못 쓰는 실수 — A cake was made to me.(✗) → A cake was made for me. / A letter was sent me.(✗) → A letter was sent to me.',
    'have + 목적어 다음에 동사원형을 쓰는 실수 — I had my hair cut은 맞지만 I had my bike fix.(✗) → I had my bike fixed.',
  ],

  gens: [
    {
      id: 'modal-passive',
      level: 1,
      title: '조동사가 있는 수동태 고르기',
      make: function (R) {
        // [주어, 복수?, 조동사, 동사원형, 과거분사, 뒤의 말, 우리말 뜻]
        var items = [
          ['The festival', false, 'will', 'hold', 'held', 'in May', '축제는 5월에 열릴 거예요.'],
          ['The stars', true, 'can', 'see', 'seen', 'from the roof at night', '밤에 옥상에서 별이 보일 수 있어요.'],
          ['This homework', false, 'must', 'do', 'done', 'by Friday', '이 숙제는 금요일까지 해야 해요.'],
          ['These books', true, 'should', 'return', 'returned', 'by next week', '이 책들은 다음 주까지 반납되어야 해요.'],
          ['The windows', true, 'should', 'clean', 'cleaned', 'once a week', '창문은 일주일에 한 번 닦여야 해요.'],
          ['Dinner', false, 'will', 'serve', 'served', 'at seven', '저녁 식사는 7시에 나올 거예요.'],
          ['The rules', true, 'must', 'follow', 'followed', 'by everyone', '규칙은 모두가 지켜야 해요.'],
          ['The song', false, 'can', 'hear', 'heard', 'on the radio', '그 노래는 라디오에서 들을 수 있어요.'],
          ['Plastic bottles', true, 'can', 'recycle', 'recycled', 'into new clothes', '플라스틱 병은 새 옷으로 재활용될 수 있어요.'],
          ['The results', true, 'will', 'announce', 'announced', 'tomorrow', '결과는 내일 발표될 거예요.'],
          ['The old house', false, 'will', 'rebuild', 'rebuilt', 'next year', '그 오래된 집은 내년에 다시 지어질 거예요.'],
          ['This medicine', false, 'must', 'keep', 'kept', 'in a cool place', '이 약은 서늘한 곳에 보관해야 해요.'],
        ];
        var it = R.pick(items);
        var correct = 'be ' + it[4];
        var bev = it[1] ? 'are' : 'is';
        var wr = [
          [bev + ' ' + it[4], '조동사 ' + it[2] + ' 뒤에는 동사원형이 와요. 그래서 ' + bev + ' 대신 원형 be를 써요.'],
          [it[4], 'be가 빠졌어요. 수동태는 조동사 + be + 과거분사예요.'],
          ['be ' + it[3], 'be 뒤에는 동사원형이 아니라 과거분사(' + it[4] + ')를 써요.'],
          ['been ' + it[4], 'been은 완료형(have been)에 써요. 조동사 뒤에는 원형 be를 써요.'],
          [it[3], '주어가 그 일을 하는 쪽이 아니라 당하는 쪽이에요. 수동태로 써요.'],
        ];
        var reason = {};
        wr.forEach(function (w) { if (!(w[0] in reason)) reason[w[0]] = w[1]; });
        var pick = R.choices(correct, wr.map(function (w) { return w[0]; }), 4);
        var sent = it[0] + ' ' + it[2] + ' [[빈칸]] ' + it[5] + '.';
        return {
          type: 'choice', concept: 0,
          q: '빈칸에 알맞은 말을 고르세요.\n\n' + sent,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: '주어(' + it[0] + ')는 그 일을 당하는 쪽이고 조동사(' + it[2] + ')가 있으니 **조동사 + be + 과거분사**로 써요.\n\n' + sent.replace('[[빈칸]]', '**' + correct + '**') + ' (' + it[6] + ')',
        };
      },
    },
    {
      id: 'dative-prep',
      level: 2,
      title: '4형식 수동태의 전치사 (to / for)',
      make: function (R) {
        // [능동태, 수동태(빈칸), 정답 전치사]
        var items = [
          ['My aunt sent me a postcard.', 'A postcard was sent [[빈칸]] me by my aunt.', 'to'],
          ['Dad made us pancakes.', 'Pancakes were made [[빈칸]] us by Dad.', 'for'],
          ['Ms. Lee teaches the children music.', 'Music is taught [[빈칸]] the children by Ms. Lee.', 'to'],
          ['Grandma cooked me a big dinner.', 'A big dinner was cooked [[빈칸]] me by Grandma.', 'for'],
          ['Minsu showed her his drawings.', 'His drawings were shown [[빈칸]] her by Minsu.', 'to'],
          ['Jia bought her brother a toy car.', 'A toy car was bought [[빈칸]] her brother by Jia.', 'for'],
          ['The guide told us an interesting story.', 'An interesting story was told [[빈칸]] us by the guide.', 'to'],
          ['Seojun lent me his umbrella.', 'His umbrella was lent [[빈칸]] me by Seojun.', 'to'],
          ['My parents bought me a new desk.', 'A new desk was bought [[빈칸]] me by my parents.', 'for'],
          ['The chef made the guests a special cake.', 'A special cake was made [[빈칸]] the guests by the chef.', 'for'],
          ['The principal gave Hayun a prize.', 'A prize was given [[빈칸]] Hayun by the principal.', 'to'],
        ];
        var it = R.pick(items);
        var correct = it[2];
        var WHY = {
          to: 'to는 give, send, show, teach, tell, lend처럼 받는 사람에게 "건너가는" 동사에 써요. 이 동사는 "~을 위해" 해 주는 것이라 for를 써요.',
          for: 'for는 make, buy, cook처럼 "~을 위해" 해 주는 동사에 써요. 이 동사는 받는 사람에게 건너가는 것이라 to를 써요.',
          by: 'by는 그 일을 한 사람(행위자) 앞에 써요. 행위자는 문장 끝의 by 뒤에 이미 있어요.',
          with: 'with는 4형식 수동태에서 받는 사람 앞에 쓰지 않아요.',
        };
        var pick = R.choices(correct, ['to', 'for', 'by', 'with'].filter(function (x) { return x !== correct; }), 4);
        var rule = correct === 'to' ? '받는 사람에게 건너가는 동사라 **to**' : '"~을 위해" 해 주는 동사라 **for**';
        return {
          type: 'choice', concept: 1,
          q: '두 문장의 뜻이 같도록 빈칸에 알맞은 말을 고르세요.\n\n' + it[0] + '\n→ ' + it[1],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : WHY[c]; }),
          explain: '직접목적어가 주어가 되었으니 남은 간접목적어 앞에 전치사를 붙여요. ' + rule + '를 써요.\n\n' + it[1].replace('[[빈칸]]', '**' + correct + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'process', m: '과정', ex: 'This video shows the process of making glass.', exm: '이 영상은 유리를 만드는 과정을 보여 줘요.' },
    { w: 'step', m: '단계', ex: 'The first step is to wash the fruit.', exm: '첫 번째 단계는 과일을 씻는 거예요.' },
    { w: 'mixture', m: '혼합물, 섞은 것', ex: 'Pour the mixture into a bowl.', exm: '섞은 것을 그릇에 부으세요.' },
    { w: 'add', m: '더하다, 넣다', ex: 'A little salt is added to the soup.', exm: '수프에 소금이 조금 넣어져요.' },
    { w: 'boil', m: '끓다, 끓이다', ex: 'The water is boiled for ten minutes.', exm: '물을 10분 동안 끓여요.' },
    { w: 'jar', m: '(유리)병, 단지', ex: 'The jam is kept in a glass jar.', exm: '잼은 유리병에 보관돼요.' },
    { w: 'flour', m: '밀가루', ex: 'Bread is made from flour.', exm: '빵은 밀가루로 만들어져요.' },
    { w: 'dough', m: '반죽', ex: 'The dough is left to rise for an hour.', exm: '반죽을 한 시간 동안 부풀게 둬요.' },
    { w: 'hold', m: '(행사를) 열다, 개최하다', ex: 'The school festival will be held in October.', exm: '학교 축제는 10월에 열릴 거예요.' },
    { w: 'announce', m: '발표하다, 알리다', ex: 'The winners will be announced tomorrow.', exm: '우승자는 내일 발표될 거예요.' },
    { w: 'recycle', m: '재활용하다', ex: 'Cans can be recycled many times.', exm: '캔은 여러 번 재활용될 수 있어요.' },
    { w: 'repair', m: '수리하다', ex: 'I had my watch repaired.', exm: '나는 시계를 수리받았어요.' },
    { w: 'prize', m: '상, 상품', ex: 'She was given a prize for her poem.', exm: '그녀는 시로 상을 받았어요.' },
    { w: 'factory', m: '공장', ex: 'The cars are made in a factory.', exm: '그 자동차들은 공장에서 만들어져요.' },
  ],
});
