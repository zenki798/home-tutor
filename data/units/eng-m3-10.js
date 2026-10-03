/* 중3 영어 · 추측하고 충고하기 (조동사 심화) */
Tutor.registerUnit({
  id: 'eng-m3-10',
  course: 'eng-m3',
  title: '추측하고 충고하기 (조동사 심화)',
  summary: '추측의 may·must, 충고의 had better, 과거 습관의 would·used to로 생각과 충고를 알맞게 표현해요.',
  goals: [
    '추측의 may·must와 의무의 must를 구별하여 쓸 수 있어요.',
    'had better와 had better not으로 충고하고, 상대에 따라 알맞은 충고 표현을 고를 수 있어요.',
    '과거의 습관을 would와 used to로 말하고, 강조의 do를 쓸 수 있어요.',
    '글이나 대화 속 표현의 숨은 뜻(함축 의미)을 추론할 수 있어요.',
  ],
  standards: ['[9영01-07]', '[9영02-06]', '[9영02-11]'],

  concepts: [
    {
      title: '추측의 may와 must',
      body: '조동사는 "해야 한다", "할 수 있다" 말고 **얼마나 확신하는지**(추측)를 나타내기도 해요.\n\n| 표현 | 뜻 | 확신 |\n|---|---|---|\n| **must** + 동사원형 | ~임에 틀림없다 | 아주 강함 |\n| **may** + 동사원형 | ~일지도 모른다 | 반반 |\n| **can\'t** + 동사원형 | ~일 리가 없다 | 아주 강한 부정 |\n\n- Jia hasn\'t eaten all day. She **must be** hungry. (지아는 배가 고픈 게 틀림없어요.)\n- I\'m not sure. Sua **may be** in the library. (수아는 도서관에 있을지도 몰라요.)\n- He just had lunch. He **can\'t be** hungry. (그가 배고플 리가 없어요.)\n\n**의무의 must와 구별하기**\n- You **must** wear a seat belt. (매야 한다 — 의무)\n- He **must** be tired. (피곤한 게 틀림없다 — 추측)\n\n추측의 must 뒤에는 **be**나 상태를 나타내는 동사가 자주 오고, 앞에 그렇게 판단한 **근거**가 함께 나와요.\n\n> ⚠️ "~일 리가 없다"는 must not이 아니라 **can\'t**로 써요. must not은 보통 "~하면 안 된다"(금지)예요.',
      easy: '탐정이 단서를 보고 말하는 장면을 떠올려 보세요.\n\n- 단서가 확실할 때: "범인은 이 사람**임에 틀림없어**!" → **must**\n- 단서가 애매할 때: "이 사람**일지도 몰라**." → **may**\n- 반대 증거가 확실할 때: "이 사람**일 리가 없어**!" → **can\'t**\n\n문장 앞에 근거(단서)가 있고, 그걸 보고 짐작하는 must는 "해야 한다"가 아니라 "틀림없다"예요.',
      check: {
        type: 'choice',
        q: '밑줄 친 must의 뜻으로 알맞은 것을 고르세요.\n\nSeojun ran ten kilometers this morning. He __must__ be tired now.',
        choices: ['~임에 틀림없다', '~해야 한다', '~일지도 모른다'],
        answer: 0,
        why: [
          '',
          '"~해야 한다"는 의무의 must예요. 서준이에게 피곤해야 할 의무가 있는 것이 아니라, 10km를 뛰었다는 근거로 짐작하는 말이에요.',
          '"~일지도 모른다"는 may의 뜻이에요. must는 그보다 훨씬 강한 확신이에요.',
        ],
        explain: '10km를 뛰었다는 **근거**를 보고 "지금 피곤한 게 **틀림없다**"고 강하게 추측하는 must예요.',
      },
    },
    {
      title: '충고의 had better',
      body: '**had better + 동사원형**은 "~하는 게 좋겠다"라는 **강한 충고**예요. 줄여서 **\'d better**로 자주 써요.\n\n- It\'s going to rain. You **had better take** an umbrella.\n- You**\'d better** see a doctor.\n\n부정은 better 뒤에 not을 붙여요: **had better not + 동사원형** (~하지 않는 게 좋겠다)\n- You **had better not** be late again.\n\n| 바른 꼴 | 틀린 꼴 |\n|---|---|\n| had better **go** | had better **to go** / had better **going** |\n| had better **not** go | had **not** better go / **don\'t** had better go |\n\nhad는 과거형처럼 보이지만 뜻은 **지금이나 앞으로**의 일이에요.\n\n> ⚠️ had better는 "안 하면 곤란해질 수 있다"는 느낌이 있는 **강한** 말이에요. 선생님이나 어른께는 쓰지 않는 것이 좋아요. 윗사람에게는 Maybe you should …, Why don\'t you …? 처럼 부드럽게 말해요.',
      easy: 'had better는 **경고등이 켜진 충고**예요. "그렇게 하는 게 좋을 거야, 안 그러면…"이라는 느낌이 숨어 있어요.\n\n- You\'d better hurry. (서두르는 게 좋겠어. 안 그러면 늦어!)\n\n그래서 친구나 동생에게는 괜찮지만, 선생님께 "You\'d better …"라고 하면 명령처럼 들려서 무례할 수 있어요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nYou have a test tomorrow. You had better [[빈칸]] to bed early.',
        choices: ['go', 'to go', 'going'],
        answer: 0,
        why: [
          '',
          'had better 뒤에는 to 없이 동사원형을 써요.',
          'had better 뒤에는 -ing가 아니라 동사원형을 써요.',
        ],
        explain: 'had better는 조동사처럼 쓰여서 뒤에 **동사원형**이 와요. → You had better **go** to bed early.',
      },
    },
    {
      title: '과거의 습관: would와 used to',
      body: '"예전에는 ~하곤 했다(지금은 아니다)"는 **used to + 동사원형**이나 **would + 동사원형**으로 말해요.\n\n- I **used to** play the piano every day. (예전에는 매일 피아노를 쳤어요. — 지금은 안 쳐요)\n- My grandpa **would** tell me stories every night. (할아버지는 밤마다 이야기를 들려주시곤 했어요.)\n\n**둘의 차이**\n\n| | used to | would |\n|---|---|---|\n| 과거의 반복 **행동** | ○ I used to swim. | ○ I would swim. |\n| 과거의 **상태** | ○ I used to live in Busan. | ✗ I would live in Busan. |\n\nlive, be, have, like처럼 **상태**를 나타내는 동사에는 used to만 써요.\n- There **used to be** a big tree here. (예전에 여기 큰 나무가 있었어요.)\n\n> 💡 used to는 "지금은 그렇지 않다"는 뜻을 품고 있어요. I used to be shy.라고 하면 지금은 수줍음을 타지 않는다는 뜻이 돼요.\n\n> ⚠️ used to + 동사원형(~하곤 했다)과 be used to + -ing(~에 익숙하다)는 다른 표현이에요. 심화 학습을 보세요.',
      easy: '**used to**는 옛날 사진첩을 펼치며 하는 말이에요. "예전엔 그랬는데, 지금은 아니야."\n\n- 옛날에 살던 곳(상태): I **used to** live in Busan.\n- 옛날에 자주 하던 일(행동): I **used to** / I **would** ride my bike every Sunday.\n\nwould는 **자주 하던 행동**에만 써요. "살았다, 있었다, 좋아했다" 같은 상태에는 used to만 쓸 수 있어요.',
      check: {
        type: 'ox',
        q: 'I would live in a small town when I was young.은 바른 문장이에요.',
        answer: false,
        explain: 'live는 **상태**를 나타내는 동사라서 would를 쓸 수 없어요. → I **used to live** in a small town when I was young. (어렸을 때 작은 마을에 살았어요.)',
      },
    },
    {
      title: '강조의 do',
      body: '동사의 뜻을 **강조**하고 싶을 때 동사 앞에 **do / does / did**를 써요. "정말 ~하다", "분명히 ~했다"라는 뜻이에요.\n\n- I **do like** your idea. (네 생각이 정말 좋아.)\n- She **does look** tired today. (그녀는 오늘 정말 피곤해 보여요.)\n- He **did call** me yesterday. (그는 어제 분명히 나에게 전화했어요.)\n\n**만드는 법**: 주어와 시제에 맞춰 do / does / did를 고르고, 뒤의 동사는 **원형**으로 써요.\n\n| 원래 문장 | 강조 |\n|---|---|\n| I like it. | I **do like** it. |\n| He looks happy. | He **does look** happy. |\n| They finished it. | They **did finish** it. |\n\n상대가 의심하거나 반대로 생각할 때 "아니야, 정말이야!"라는 느낌으로 자주 써요.\n- A: You didn\'t do your homework, did you? B: I **did** do it! I just left it at home.\n\n> ⚠️ does나 did를 쓰면 뒤 동사는 원형이에요. He does looks(✗), He did called(✗)',
      easy: '말할 때 목소리를 크게 해서 "**정말** 좋아!"라고 하듯, 영어는 동사 앞에 **do**를 넣어 힘을 줘요.\n\n- I like it. → I **do** like it! (정말 좋아!)\n- She looks happy. → She **does** look happy! (정말 행복해 보여!)\n\n주인공이 he·she면 does, 과거면 did. 그리고 do·does·did 뒤에는 동사를 원래 모양(원형)으로 써요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nMy brother [[빈칸]] like spicy food. He eats it every day.',
        choices: ['does', 'do', 'is'],
        answer: 0,
        why: [
          '',
          '주어 My brother는 3인칭 단수예요. 현재의 일이므로 does를 써요.',
          'like는 동사예요. 동사를 강조할 때는 be동사가 아니라 do/does/did를 써요.',
        ],
        explain: '주어가 3인칭 단수이고 현재이므로 **does**를 써서 동사 like를 강조해요. "형은 매운 음식을 정말 좋아해요."',
      },
    },
    {
      title: '숨은 뜻(함축 의미) 읽기',
      body: '사람들은 하고 싶은 말을 **돌려서** 말할 때가 많아요. 겉으로 한 말과 그 말로 **정말 전하고 싶은 뜻(함축 의미)**이 다를 수 있어요.\n\n- A: Can I borrow your bike? B: It **may rain** this afternoon.\n  → 겉말: 오후에 비가 올지도 몰라. / 숨은 뜻: 자전거 타기 좋지 않으니 다시 생각해 봐.\n- Mom: You**\'d better** turn off the TV. Your test is tomorrow.\n  → 숨은 뜻: 이제 공부해라.\n- A: How was the movie? B: Well, the popcorn **was** really good.\n  → 숨은 뜻: 영화는 별로였다(영화가 아니라 팝콘만 칭찬).\n\n**숨은 뜻을 찾는 순서**\n1. 상황(누가, 어디서, 무엇을 원하는지)을 파악해요.\n2. 대답이 질문에 **바로** 답하지 않았다면, 왜 그 말을 했는지 생각해요.\n3. 추측(must, may), 충고(had better), 강조(do) 같은 표현이 단서가 돼요.',
      easy: '친구에게 "같이 놀자!"라고 했는데 친구가 "나 내일 시험이야…"라고 하면, 친구는 "안 돼"라는 말을 한 번도 하지 않았지만 **못 논다는 뜻**이지요.\n\n영어 대화도 같아요. 대답이 질문과 딱 맞지 않으면 "왜 이 말을 했을까?"를 생각해 보세요. 그게 숨은 뜻이에요.',
      check: {
        type: 'choice',
        q: '대화에서 B가 전하려는 숨은 뜻으로 알맞은 것을 고르세요.\n\nA: Shall we go hiking tomorrow?\nB: I have a lot of homework to do this weekend.',
        choices: ['내일은 함께 등산을 가기 어렵다.', '내일 함께 등산을 가고 싶다.', '숙제를 도와 달라.'],
        answer: 0,
        why: [
          '',
          'B는 등산 이야기 대신 숙제가 많다고 했어요. 가고 싶다는 뜻이 아니라 갈 수 없는 까닭을 말한 거예요.',
          'B는 숙제가 많다고만 했고, 도와 달라는 부탁은 하지 않았어요.',
        ],
        explain: 'B는 "가자/안 가"로 직접 답하지 않고 **숙제가 많다는 까닭**을 말했어요. 돌려서 거절한 것이니 숨은 뜻은 "내일은 가기 어렵다"예요.',
      },
    },
  ],

  examples: [
    {
      q: '상황에 맞게 must, may, can\'t 중 알맞은 것을 골라 빈칸을 채워 보세요.\n\nThat [[빈칸]] be Minsu over there. He went to Jeju Island with his family yesterday.',
      steps: [
        '근거를 찾아요: 민수는 어제 가족과 제주도에 갔어요.',
        '그러니 저기 있는 사람이 민수일 가능성은 거의 없어요 — 강한 부정의 추측이에요.',
        '"~일 리가 없다"는 **can\'t**예요. (must not이 아니에요.)',
      ],
      answer: 'That can\'t be Minsu over there. (저기 있는 사람이 민수일 리가 없어요.)',
    },
    {
      q: '빈칸에 used to와 would 중 알맞은 것을 써 보세요. (둘 다 되면 둘 다)\n\n(1) There [[빈칸]] be a bakery on this corner.\n(2) Every summer, we [[빈칸]] go camping by the river.',
      steps: [
        '(1) be는 "있었다"라는 **상태**예요. 상태에는 would를 쓸 수 없으니 **used to**만 돼요.',
        '(2) go camping은 여름마다 되풀이한 **행동**이에요. 행동의 습관에는 **used to**와 **would** 둘 다 돼요.',
      ],
      answer: '(1) used to (2) used to / would',
    },
  ],

  terms: [
    { term: '추측', def: '근거를 보고 짐작하는 것이에요. must(틀림없다), may(~일지도 모른다), can\'t(~일 리가 없다)로 확신의 정도를 나타내요.' },
    { term: '의무', def: '꼭 해야 하는 일이에요. 의무의 must는 "~해야 한다"예요. 예: You must wear a helmet.' },
    { term: '충고', def: '상대에게 어떻게 하는 게 좋을지 말해 주는 것이에요. had better(강한 충고), should(부드러운 충고)를 써요.' },
    { term: '과거의 습관', def: '예전에 되풀이해서 하던 일이에요. used to나 would + 동사원형으로 나타내요. 과거의 상태에는 used to만 써요.' },
    { term: '강조의 do', def: '동사 앞에 do/does/did를 넣어 "정말 ~하다"라고 힘주어 말하는 것이에요. 뒤의 동사는 원형이에요. 예: I do like it.' },
    { term: '함축 의미', def: '겉으로 한 말 속에 숨어 있는, 말하는 사람이 정말 전하고 싶은 뜻이에요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\nJia has been studying all night. She [[빈칸]] be tired.\n(지아는 피곤한 게 틀림없어요.)',
      choices: ['must', 'may', 'can\'t', 'had better'],
      answer: 0,
      why: [
        '',
        'may는 "~일지도 모른다"는 약한 추측이에요. "틀림없다"는 must예요.',
        'can\'t는 "~일 리가 없다"예요. 뜻이 거꾸로예요.',
        'had better는 "~하는 게 좋겠다"는 충고예요. 추측이 아니에요.',
      ],
      explain: '밤새 공부했다는 근거로 강하게 확신하는 추측이므로 **must**(~임에 틀림없다)를 써요.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: 'You must wear a helmet.의 must와 He must be sick.의 must는 같은 뜻이에요.',
      answer: false,
      explain: '앞 문장의 must는 "헬멧을 **써야 한다**"는 **의무**, 뒤 문장의 must는 "아픈 게 **틀림없다**"는 **추측**이에요. 추측의 must 뒤에는 be가 자주 와요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 0,
      q: '다음 문장의 뜻으로 알맞은 것을 고르세요.\n\nIt may snow tonight.',
      choices: ['오늘 밤 눈이 올지도 몰라요.', '오늘 밤 눈이 오는 게 틀림없어요.', '오늘 밤 눈이 올 리가 없어요.', '오늘 밤 눈이 와야 해요.'],
      answer: 0,
      why: [
        '',
        '"틀림없다"는 must의 뜻이에요. may는 그보다 약한 추측이에요.',
        '"~일 리가 없다"는 can\'t의 뜻이에요.',
        '"~해야 한다"는 의무의 must나 have to의 뜻이에요.',
      ],
      explain: '추측의 **may**는 "~일지도 모른다"예요. 눈이 올 수도, 안 올 수도 있다는 반반의 추측이에요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 1,
      q: '어법상 바른 문장을 고르세요.',
      choices: [
        'You had better not be late again.',
        'You had not better be late again.',
        'You don\'t had better be late again.',
        'You had better not to be late again.',
      ],
      answer: 0,
      why: [
        '',
        'not의 자리가 틀렸어요. had better 뒤, 동사원형 앞에 not을 써요.',
        'had better의 부정은 don\'t를 쓰지 않고 better 뒤에 not을 붙여요.',
        'had better (not) 뒤에는 to 없이 동사원형을 써요.',
      ],
      explain: 'had better의 부정은 **had better not + 동사원형**이에요. → You had better not be late again. (또 늦지 않는 게 좋겠어.)',
    },
    {
      id: 'p5', level: 1, type: 'short', concept: 1,
      q: '괄호 안의 낱말을 알맞은 꼴로 바꿔 쓰세요.\n\nIt\'s going to rain. You\'d better [[빈칸]] an umbrella. (take)',
      answer: ['take'],
      wrong: [
        { a: 'to take', why: 'had better 뒤에는 to 없이 동사원형을 써요.' },
        { a: 'taking', why: 'had better 뒤에는 -ing가 아니라 동사원형을 써요.' },
        { a: 'took', why: '\'d better의 had는 과거형처럼 보여도 뒤에는 동사원형이 와요.' },
      ],
      explain: '\'d better는 had better를 줄인 말이고, 뒤에는 **동사원형** take를 써요. "우산을 가져가는 게 좋겠어."',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르세요.\n\nI [[빈칸]] live in Busan when I was a child. Now I live in Seoul.',
      choices: ['used to', 'would', 'am used to', 'use to'],
      answer: 0,
      why: [
        '',
        'live는 상태를 나타내는 동사라서 would를 쓸 수 없어요.',
        'be used to는 "~에 익숙하다"라는 다른 표현이고, 뒤에 -ing나 명사가 와요.',
        '긍정문에서는 used to로 써요. 과거의 일이에요.',
      ],
      explain: '예전에 부산에 살았던 것은 과거의 **상태**예요. 상태에는 would 말고 **used to**만 써요. "어렸을 때 부산에 살았어요. 지금은 서울에 살아요."',
    },
    {
      id: 'p7', level: 1, type: 'short', concept: 3,
      q: '빈칸에 강조의 do를 알맞은 꼴로 써서 동사를 강조하세요.\n\nI [[빈칸]] like this song. I listen to it every day!\n(나는 이 노래를 정말 좋아해요.)',
      answer: ['do'],
      wrong: [
        { a: 'really', why: 'really도 뜻은 통하지만, 이 문제는 동사 앞에 do / does / did를 넣는 강조의 do를 연습하는 문제예요.' },
        { a: 'am', why: 'like는 동사예요. 일반동사를 강조할 때는 be동사가 아니라 do를 써요.' },
        { a: 'does', why: '주어가 I이므로 does가 아니라 do를 써요.' },
      ],
      explain: '주어 I, 현재이므로 **do**를 동사 like 앞에 넣어 "정말 좋아한다"고 강조해요.',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 2,
      q: '과거의 습관을 나타내는 would는 되풀이한 행동뿐 아니라 과거의 상태에도 쓸 수 있어요.',
      answer: false,
      explain: 'would는 과거의 반복된 **행동**에만 써요. 과거의 **상태**(live, be, have, like …)에는 **used to**만 써요. There used to be a park here.(○) / There would be a park here.(✗ — 이 뜻으로는)',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: '대화에서 B가 전하려는 숨은 뜻으로 알맞은 것을 고르세요.\n\nA: Can we play soccer in the park after school?\nB: Look at those dark clouds. We\'d better stay inside today.',
      choices: [
        '곧 비가 올 것 같으니 오늘은 축구를 하지 말자.',
        '공원보다 운동장에서 축구를 하자.',
        '구름이 예뻐서 구경하고 싶다.',
        '방과 후에 숙제를 먼저 해야 한다.',
      ],
      answer: 0,
      why: [
        '',
        'B는 장소를 바꾸자는 것이 아니라 밖에 나가지 말자고 했어요.',
        'B가 구름을 말한 것은 날씨가 나빠질 것이라는 근거예요.',
        '숙제 이야기는 대화에 없어요.',
      ],
      hint: 'B가 왜 dark clouds를 말했는지, had better로 무엇을 충고했는지 보세요.',
      explain: '먹구름(dark clouds)은 비가 올 것 같다는 단서이고, **We\'d better stay inside**는 "안에 있는 게 좋겠다"는 충고예요. 숨은 뜻은 "비가 올 것 같으니 오늘은 축구를 하지 말자"예요.',
    },
    {
      id: 'p10', level: 2, type: 'order', concept: 3,
      q: '우리말에 맞게 배열하세요.\n\n그는 어제 분명히 나에게 전화했어요.',
      choices: ['He', 'did', 'call me', 'yesterday'],
      answer: [0, 1, 2, 3],
      hint: '강조의 did 뒤에는 동사원형이 와요.',
      explain: '주어(He) → 강조의 did → 동사원형(call me) → 때(yesterday). → He did call me yesterday.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 0,
      q: '앞뒤 내용으로 보아 **어색한** 문장을 고르세요.',
      choices: [
        'Minsu just ate three hamburgers. He must be hungry.',
        'Hayun got 100 points on every test. She must be a hard worker.',
        'Doyun isn\'t answering the phone. He may be asleep.',
        'Sua lives in Canada now. She can\'t be at our school today.',
      ],
      answer: 0,
      why: [
        '',
        '시험마다 100점을 받았다는 근거로 "열심히 하는 사람임에 틀림없다"고 추측하는 것은 자연스러워요.',
        '전화를 안 받으니 "자고 있을지도 모른다"는 자연스러운 약한 추측이에요.',
        '캐나다에 산다는 근거로 "오늘 우리 학교에 있을 리가 없다"는 자연스러워요.',
      ],
      hint: '근거와 추측이 서로 맞는지 하나씩 확인해 보세요.',
      explain: '햄버거를 세 개나 방금 먹었다면 배가 고플 리가 없어요. 근거와 추측이 맞지 않으니 어색해요. → He **can\'t be** hungry.로 고쳐야 자연스러워요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 1,
      q: '감기에 걸린 선생님께 쉬시라고 말씀드리려고 해요. 가장 알맞은 말을 고르세요.',
      choices: [
        'Ms. Kim, maybe you should get some rest.',
        'Ms. Kim, you had better rest.',
        'Ms. Kim, you must rest right now.',
        'Ms. Kim, you\'d better not work today.',
      ],
      answer: 0,
      why: [
        '',
        'had better는 강한 충고라서 윗사람에게는 명령처럼 들릴 수 있어요.',
        'must는 "반드시 ~해야 한다"는 강한 의무라서 선생님께 쓰기에는 지나쳐요.',
        '\'d better not도 had better처럼 강한 충고라서 윗사람에게는 피해요.',
      ],
      hint: '윗사람에게 쓰기에 부드러운 표현을 찾아보세요.',
      explain: 'had better와 must는 강한 말이라 윗사람에게는 피해요. **maybe you should …**처럼 부드럽게 권하는 말이 알맞아요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '다음 상황에서 가장 논리적인 추측을 고르세요.\n\nJia\'s bag is still on her desk, and her pencil case is open. But she isn\'t in the classroom right now.',
      choices: [
        'She can\'t be far away.',
        'She must be at home in bed.',
        'She can\'t be at school today.',
        'She must be absent today.',
      ],
      answer: 0,
      why: [
        '',
        '가방과 필통이 책상에 그대로 있으니 오늘 학교에 왔다는 근거예요. 집에 누워 있다는 추측과 맞지 않아요.',
        '가방이 책상 위에 있으니 오늘 학교에 온 것이에요. 근거와 반대되는 추측이에요.',
        '결석했다면 가방이 책상 위에 있을 수 없어요.',
      ],
      hint: '가방과 필통이 책상 위에 있다는 것이 무엇의 근거인지 생각해 보세요.',
      explain: '가방이 있고 필통이 열려 있으니 지아는 학교에 왔고 잠깐 자리를 비운 거예요. 그래서 "멀리 가지는 **않았을 거예요**(멀리 있을 리가 없어요)" — **She can\'t be far away.**가 가장 논리적이에요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '모두 과거의 일을 말하는 문장이에요. 어법상 **틀린** 것을 고르세요.',
      choices: [
        'There would be a big tree in front of my house.',
        'There used to be a big tree in front of my house.',
        'My dad would read me stories every night.',
        'I used to play with toy cars a lot.',
      ],
      answer: 0,
      why: [
        '',
        'There used to be …는 과거의 상태를 나타내는 바른 문장이에요.',
        '밤마다 이야기를 읽어 주신 것은 되풀이한 행동이라 would를 쓸 수 있어요.',
        '장난감 자동차를 가지고 논 것은 과거의 습관이라 used to를 쓸 수 있어요.',
      ],
      hint: '"있었다"는 행동일까요, 상태일까요?',
      explain: '나무가 "있었다"는 과거의 **상태**라서 would를 쓸 수 없어요. → There **used to be** a big tree in front of my house.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '글을 읽고, 엄마의 마지막 말에 담긴 숨은 뜻으로 알맞은 것을 고르세요.\n\nHayun came home and dropped her bag on the floor. Clothes and books were everywhere in her room. Her mom looked into the room and said, "Wow, you must really like living in a messy room. You haven\'t cleaned it for two weeks!"',
      choices: [
        '방을 청소해라.',
        '어지러운 방이 마음에 든다.',
        '방을 바꿔 주겠다.',
        '가방을 새로 사 주겠다.',
      ],
      answer: 0,
      why: [
        '',
        '엄마의 말은 겉으로는 칭찬처럼 들리지만, 2주 동안 청소하지 않았다는 말과 함께 보면 반대 뜻이에요.',
        '방을 바꾼다는 이야기는 글에 없어요.',
        '가방은 바닥에 던졌다는 장면에만 나와요. 새로 사 준다는 말은 없어요.',
      ],
      hint: '"2주 동안 청소를 안 했다"는 뒷말과 함께 엄마의 첫 말을 다시 읽어 보세요.',
      explain: '엄마는 "어지러운 방에 사는 게 정말 좋은가 보구나(must)"라고 겉으로 말했지만, 바로 뒤에 "2주 동안 청소를 안 했잖니!"라고 덧붙였어요. 진짜 하고 싶은 말은 **"방을 청소해라"**예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', concept: 3,
      q: '강조의 do를 이용하여 밑줄 친 부분을 강조하는 문장이 되도록 빈칸에 알맞은 두 낱말을 쓰세요.\n\nShe __called__ me last night.\n→ She [[빈칸]] me last night.',
      answer: ['did call'],
      wrong: [
        { a: 'really called', why: 'really도 뜻은 통하지만, 이 문제는 강조의 do를 쓰는 문제예요. 과거이니 did + 동사원형으로 써요.' },
        { a: 'did called', why: 'did 뒤에는 동사원형을 써요. called가 아니라 call이에요.' },
        { a: 'does call', why: 'last night은 과거이므로 does가 아니라 did를 써요.' },
        { a: 'do call', why: '과거의 일이에요. 주어와 상관없이 과거는 did를 써요.' },
      ],
      hint: '과거의 일을 강조할 때는 did를 쓰고, 그 뒤 동사의 꼴에 주의하세요.',
      explain: '과거형 called를 강조하면 **did + 동사원형**, 곧 **did call**이 돼요. "그녀는 어젯밤 분명히 나에게 전화했어요."',
    },
  ],

  deeper: [
    {
      title: 'used to + 동사원형과 be used to + -ing',
      body: '모양은 비슷하지만 뜻이 전혀 달라요.\n\n| 표현 | 뜻 | 예 |\n|---|---|---|\n| **used to** + 동사원형 | (예전에) ~하곤 했다 | I **used to get** up late. (예전엔 늦게 일어났어요.) |\n| **be used to** + -ing/명사 | ~에 익숙하다 | I **am used to getting** up early. (일찍 일어나는 데 익숙해요.) |\n\nbe used to의 to는 전치사라서 뒤에 동명사(-ing)나 명사가 와요. be동사가 있는지, to 뒤가 동사원형인지 -ing인지를 보면 구별할 수 있어요.\n\n또 하나, 추측의 말은 "그렇다"고 보는 정도가 강한 것부터 약한 것 순서로 이렇게 늘어놓을 수 있어요. (can\'t는 "아니다"라고 강하게 확신하는 말이라 맨 끝에 와요.)\n\nmust(틀림없다) > should(아마 ~일 것이다) > may / might(~일지도 모른다) > can\'t(~일 리가 없다)\n\n고등학교에서는 과거의 일을 추측하는 must have + 과거분사(~했음에 틀림없다)도 배워요.',
    },
  ],

  faq: [
    {
      q: 'must가 "해야 한다"인지 "틀림없다"인지 어떻게 알아요?',
      a: '앞에 **근거**가 있고 그걸 보고 짐작하는 말이면 추측(틀림없다)이에요. 추측의 must 뒤에는 be나 know, like 같은 상태 동사가 자주 와요. 반대로 규칙이나 할 일을 말하면 의무(해야 한다)예요. He ran all day. He must be tired.는 추측, You must wear a seat belt.는 의무예요.',
    },
    {
      q: 'had better랑 should는 뭐가 달라요?',
      a: '둘 다 충고지만 had better가 훨씬 **강해요**. "안 하면 곤란해질 거야"라는 느낌이 있어서 친구·동생에게는 괜찮지만 윗사람에게는 피해요. should는 "~하는 게 좋겠어요" 정도의 부드러운 충고라 더 넓게 써요.',
    },
    {
      q: 'would랑 used to는 언제나 바꿔 써도 돼요?',
      a: '과거에 되풀이한 **행동**(매주 등산을 갔다, 매일 피아노를 쳤다)에는 둘 다 써요. 하지만 과거의 **상태**(살았다, 있었다, 좋아했다)에는 used to만 써요. I used to live in Busan.(○) / I would live in Busan.(✗)',
    },
    {
      q: 'I do like it.에서 do는 왜 넣어요? 빼도 뜻은 같지 않아요?',
      a: '기본 뜻은 같지만 do를 넣으면 "**정말** 좋아해"라고 힘이 실려요. 상대가 내가 안 좋아한다고 오해할 때 "아니야, 정말 좋아해!"라고 바로잡는 느낌으로 자주 써요. 말할 때는 do를 세게 읽어요.',
    },
  ],

  mistakes: [
    '"~일 리가 없다"를 must not으로 쓰는 실수 — He must not be hungry.(✗ 이 뜻으로는) → He can\'t be hungry.',
    'had better 뒤에 to를 쓰거나 not의 자리를 틀리는 실수 — had better to go(✗), had not better go(✗) → had better go, had better not go',
    '강조의 does·did 뒤에 동사를 바꾸어 쓰는 실수 — He does looks tired.(✗) → He does look tired. / She did called.(✗) → She did call.',
  ],

  gens: [
    {
      id: 'guess-or-advice',
      level: 2,
      title: '추측과 충고의 조동사 고르기',
      make: function (R) {
        // [문장(빈칸), 정답, 우리말 뜻, 근거 설명]
        var items = [
          ['Jia hasn\'t eaten anything all day. She [[빈칸]] be very hungry.', 'must', '지아는 몹시 배가 고픈 게 틀림없어요.', '하루 종일 아무것도 먹지 않았다는 근거로 강하게 확신해요'],
          ['The lights are on in Doyun\'s room. He [[빈칸]] be at home.', 'must', '도윤이는 집에 있는 게 틀림없어요.', '방에 불이 켜져 있다는 근거로 강하게 확신해요'],
          ['Hayun got a perfect score again. She [[빈칸]] be really good at math.', 'must', '하윤이는 수학을 정말 잘하는 게 틀림없어요.', '또 만점을 받았다는 근거로 강하게 확신해요'],
          ['I\'m not sure where Sua is. She [[빈칸]] be in the library.', 'may', '수아는 도서관에 있을지도 몰라요.', '어디 있는지 확실히 모르니 약하게 추측해요'],
          ['Take an umbrella with you. It [[빈칸]] rain this afternoon.', 'may', '오후에 비가 올지도 몰라요.', '비가 올 수도 안 올 수도 있으니 약하게 추측해요'],
          ['Seojun didn\'t answer the phone. He [[빈칸]] be asleep.', 'may', '서준이는 자고 있을지도 몰라요.', '전화를 안 받은 까닭은 여러 가지일 수 있으니 약하게 추측해요'],
          ['Minsu just ate two bowls of rice. He [[빈칸]] be hungry already.', 'can\'t', '민수가 벌써 배고플 리가 없어요.', '방금 밥을 두 그릇 먹었다는 근거로 강하게 부정해요'],
          ['That [[빈칸]] be Jia over there. She is in Busan this week.', 'can\'t', '저기 있는 사람이 지아일 리가 없어요.', '지아는 이번 주에 부산에 있다는 근거로 강하게 부정해요'],
          ['The story [[빈칸]] be true. Fish don\'t climb trees.', 'can\'t', '그 이야기가 사실일 리가 없어요.', '물고기는 나무에 오르지 않는다는 근거로 강하게 부정해요'],
          ['The road is icy. You [[빈칸]] drive slowly.', 'had better', '천천히 운전하는 게 좋겠어요.', '길이 얼었다는 상황에서 강하게 충고해요'],
          ['You have a test tomorrow. You [[빈칸]] go to bed early tonight.', 'had better', '오늘 밤에는 일찍 자는 게 좋겠어요.', '내일 시험이 있다는 상황에서 강하게 충고해요'],
          ['It\'s very cold outside. You [[빈칸]] wear a warm coat.', 'had better', '따뜻한 외투를 입는 게 좋겠어요.', '밖이 몹시 춥다는 상황에서 강하게 충고해요'],
        ];
        var WHY = {
          'must': 'must는 "~임에 틀림없다"(강한 확신)예요. 우리말 뜻과 맞는지 다시 보세요.',
          'may': 'may는 "~일지도 모른다"(약한 추측)예요. 우리말 뜻과 맞는지 다시 보세요.',
          'can\'t': 'can\'t는 "~일 리가 없다"(강한 부정의 추측)예요. 우리말 뜻과 맞는지 다시 보세요.',
          'had better': 'had better는 "~하는 게 좋겠다"(충고)예요. 추측이 아니에요.',
          'used to': 'used to는 "예전에 ~하곤 했다"(과거의 습관)예요. 충고하는 말이 아니에요.',
        };
        var MEAN = { 'must': '~임에 틀림없다', 'may': '~일지도 모른다', 'can\'t': '~일 리가 없다', 'had better': '~하는 게 좋겠다' };
        var it = R.pick(items);
        var correct = it[1];
        // 충고 문장에서 must 는 의무(~해야 한다)로 읽혀 정답처럼 보일 수 있으니 보기에서 뺀다
        var pool = correct === 'had better' ? ['may', 'can\'t', 'used to'] : ['must', 'may', 'can\'t', 'had better'].filter(function (x) { return x !== correct; });
        var pick = R.choices(correct, pool, 4);
        return {
          type: 'choice', concept: correct === 'had better' ? 1 : 0,
          q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + it[0] + '\n(' + it[2] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : WHY[c]; }),
          explain: it[3] + '. "' + MEAN[correct] + '"의 뜻이므로 **' + correct + '**를 써요.\n\n' + it[0].replace('[[빈칸]]', '**' + correct + '**'),
        };
      },
    },
    {
      id: 'emphatic-do',
      level: 1,
      title: '강조의 do / does / did',
      make: function (R) {
        // [원래 문장, 강조 문장(빈칸), 정답, 근거] — 원래 문장을 보여 주어 시제(현재/과거)가 하나로 정해지게 한다
        var items = [
          ['I like your new hairstyle.', 'I [[빈칸]] like your new hairstyle.', 'do', '주어 I, 현재(like)'],
          ['She looks tired today.', 'She [[빈칸]] look tired today.', 'does', '주어 she(3인칭 단수), 현재(looks)'],
          ['He called me yesterday.', 'He [[빈칸]] call me yesterday.', 'did', '과거(called)'],
          ['We want to help you.', 'We [[빈칸]] want to help you.', 'do', '주어 we(복수), 현재(want)'],
          ['Minsu studies hard every day.', 'Minsu [[빈칸]] study hard every day.', 'does', '주어 Minsu(3인칭 단수), 현재(studies)'],
          ['I locked the door this morning.', 'I [[빈칸]] lock the door this morning.', 'did', '과거(locked)'],
          ['They enjoyed the trip last summer.', 'They [[빈칸]] enjoy the trip last summer.', 'did', '과거(enjoyed)'],
          ['This soup tastes good.', 'This soup [[빈칸]] taste good.', 'does', '주어 this soup(3인칭 단수), 현재(tastes)'],
          ['You sing well.', 'You [[빈칸]] sing well.', 'do', '주어 you, 현재(sing)'],
          ['Jia sent the email last night.', 'Jia [[빈칸]] send the email last night.', 'did', '과거(sent)'],
          ['My parents love old movies.', 'My parents [[빈칸]] love old movies.', 'do', '주어 my parents(복수), 현재(love)'],
          ['The baby slept well last night.', 'The baby [[빈칸]] sleep well last night.', 'did', '과거(slept)'],
        ];
        var WHY = {
          do: 'do는 주어가 I·you·복수이고 현재일 때 써요. 원래 문장의 주어와 시제를 다시 보세요.',
          does: 'does는 주어가 3인칭 단수이고 현재일 때 써요. 원래 문장의 주어와 시제를 다시 보세요.',
          did: 'did는 과거의 일을 강조할 때 써요. 원래 문장의 동사는 현재형이에요.',
        };
        var it = R.pick(items);
        var correct = it[2];
        var pick = R.choices(correct, ['do', 'does', 'did'].filter(function (x) { return x !== correct; }), 3);
        return {
          type: 'choice', concept: 3,
          q: '첫 문장의 동사를 강조하는 문장이 되도록 빈칸에 알맞은 말을 고르세요.\n\n' + it[0] + '\n→ ' + it[1],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : WHY[c]; }),
          explain: it[3] + ' → **' + correct + '** + 동사원형으로 "정말 ~하다"를 나타내요.\n\n' + it[1].replace('[[빈칸]]', '**' + correct + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'advice', m: '충고, 조언', ex: 'Thank you for your advice.', exm: '조언해 줘서 고마워요.' },
    { w: 'guess', m: '추측하다; 추측', ex: 'Can you guess who sent this card?', exm: '누가 이 카드를 보냈는지 짐작할 수 있어요?' },
    { w: 'certain', m: '확신하는, 확실한', ex: 'I\'m certain that he is at home.', exm: '나는 그가 집에 있다고 확신해요.' },
    { w: 'possible', m: '가능한, 있을 수 있는', ex: 'It is possible that it will snow.', exm: '눈이 올 수도 있어요.' },
    { w: 'probably', m: '아마', ex: 'She will probably be late.', exm: '그녀는 아마 늦을 거예요.' },
    { w: 'habit', m: '습관', ex: 'Reading before bed is a good habit.', exm: '자기 전에 책을 읽는 것은 좋은 습관이에요.' },
    { w: 'polite', m: '공손한, 예의 바른', ex: 'It is polite to say thank you.', exm: '고맙다고 말하는 것은 예의 바른 일이에요.' },
    { w: 'rude', m: '무례한', ex: 'It is rude to talk during the movie.', exm: '영화 중에 떠드는 것은 무례해요.' },
    { w: 'careful', m: '조심하는, 신중한', ex: 'You\'d better be careful on the stairs.', exm: '계단에서는 조심하는 게 좋겠어요.' },
    { w: 'messy', m: '지저분한, 어질러진', ex: 'My desk is always messy.', exm: '내 책상은 늘 어질러져 있어요.' },
    { w: 'absent', m: '결석한', ex: 'Minsu was absent from school yesterday.', exm: '민수는 어제 학교에 결석했어요.' },
    { w: 'clue', m: '단서, 실마리', ex: 'The wet floor was a clue that it had rained.', exm: '젖은 바닥은 비가 왔다는 단서였어요.' },
    { w: 'meaning', m: '뜻, 의미', ex: 'What is the hidden meaning of his words?', exm: '그의 말에 숨은 뜻은 뭘까요?' },
    { w: 'suggest', m: '제안하다', ex: 'I suggest that we leave early.', exm: '우리 일찍 떠나자고 제안해요.' },
  ],
});
