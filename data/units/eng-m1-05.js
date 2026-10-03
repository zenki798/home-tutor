/* 중1 영어 · 계획과 의무 말하기 (조동사) */
Tutor.registerUnit({
  id: 'eng-m1-05',
  course: 'eng-m1',
  title: '계획과 의무 말하기 (조동사)',
  summary: 'will·be going to로 계획을, must·have to·should로 의무와 충고를 나타내는 조동사 문장을 익혀요.',
  goals: [
    '조동사 뒤에 동사원형을 쓰고, 조동사의 부정문과 의문문을 만들 수 있어요.',
    'will과 be going to로 미래의 계획을 말할 수 있어요.',
    'must, have to로 의무를 말하고, must not과 don\'t have to의 차이를 구별할 수 있어요.',
    'should로 충고하고, 규칙 안내문을 읽고 글의 목적을 파악할 수 있어요.',
  ],
  standards: [],

  concepts: [
    {
      title: '조동사의 공통 규칙',
      body: '**조동사**는 동사 앞에서 "~할 것이다(will), ~할 수 있다(can), ~해야 한다(must), ~하는 게 좋다(should)" 같은 뜻을 더해 주는 말이에요. 모든 조동사에 통하는 규칙이 세 가지 있어요.\n\n1. **조동사 + 동사원형**: She **can swim**. (can swims ✕, can swimming ✕)\n2. 주어가 3인칭 단수여도 조동사에 **-s를 붙이지 않아요**: He **will** come. (wills ✕)\n3. 부정문은 **조동사 + not**, 의문문은 **조동사를 주어 앞으로**\n\n| | 예 |\n|---|---|\n| 부정문 | You **should not(shouldn\'t)** run here. / I **will not(won\'t)** be late. |\n| 의문문 | **Can** you help me? — Yes, I can. / **Should** I wait? — Yes, you should. |\n\n> 💡 조동사가 있으면 do/does/did를 쓰지 않아요. Does he can swim? (✕) → Can he swim? (○)',
      easy: '조동사는 동사를 "도와주는" 말이에요. 도우미가 앞에 서면 동사는 아무것도 붙이지 않은 원래 모습으로 돌아가요.\n\nHe **plays** the piano. → He **can play** the piano.\n\n도우미(can)가 앞에 왔으니 plays의 -s가 사라졌어요. 부정문·의문문도 도우미가 다 해 줘요: can\'t play / Can he play?',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nMy sister can [[blank]] three languages.',
        choices: ['speak', 'speaks', 'speaking'],
        answer: 0,
        why: ['', '조동사 뒤에는 동사원형을 써요. 주어가 3인칭 단수여도 -s를 붙이지 않아요.', '조동사 뒤에는 -ing가 아니라 동사원형을 써요.'],
        explain: '조동사 can 뒤에는 동사원형을 써요. My sister can speak three languages.',
      },
    },
    {
      title: 'will과 be going to로 계획 말하기',
      body: '앞으로의 일은 **will**이나 **be going to**로 말해요. 둘 다 뒤에 **동사원형**이 와요.\n\n| | will | be going to |\n|---|---|---|\n| 긍정 | I **will** call you. | I **am going to** visit Jeju. |\n| 부정 | I **won\'t(will not)** be late. | She **isn\'t going to** come. |\n| 의문 | **Will** you join us? — Yes, I will. | **Are you going to** join the club? — Yes, I am. |\n\n- **be going to**는 미리 정해 둔 계획에 많이 써요: I\'m going to visit my grandma this weekend. be동사는 주어에 맞게 골라요(am/are/is).\n- **will**은 말하는 순간 정한 일이나 약속에 많이 써요: It\'s cold. I **will** close the window. / I **won\'t** forget.\n\n> ⚠️ won\'t는 will not의 줄임말이에요(willn\'t ✕). be going to에서 be동사를 빼먹지 않아요: I going to (✕)',
      easy: '미래를 말하는 방법은 두 가지예요.\n\n- **will**: "그래, 내가 할게!" 하고 그 자리에서 정하거나 약속할 때\n- **be going to**: 달력에 이미 적어 둔 계획을 말할 때\n\n다만 둘 다 "~할 것이다"라는 미래의 뜻이라서, 많은 문장에서 어느 것을 써도 돼요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nThey [[blank]] going to watch a movie tonight.',
        choices: ['are', 'is', 'will'],
        answer: 0,
        why: ['', 'be going to의 be동사는 주어에 맞춰요. They에는 are를 써요.', 'will 뒤에는 동사원형이 와요. going to 앞에는 be동사가 필요해요.'],
        explain: 'be going to에서 be동사는 주어 They에 맞춰 are를 써요. They are going to watch a movie tonight.',
      },
    },
    {
      title: 'must · have to와 must not · don\'t have to',
      body: '"~해야 한다"는 의무는 **must**나 **have to**로 말해요. 긍정문에서는 뜻이 거의 같아요.\n\n- You **must** wear a helmet. = You **have to** wear a helmet.\n- 주어가 3인칭 단수면 have to는 **has to**가 돼요: She **has to** get up early.\n\n그런데 **부정문이 되면 뜻이 완전히 달라져요.**\n\n| 표현 | 뜻 | 예 |\n|---|---|---|\n| **must not** (mustn\'t) | ~하면 안 된다 (**금지**) | You **must not** run in the hall. |\n| **don\'t have to** | ~할 필요가 없다 (**불필요**) | You **don\'t have to** bring lunch. |\n\n주어가 3인칭 단수면 **doesn\'t have to**예요: He **doesn\'t have to** wear a uniform.\n\n> 💡 must에는 과거형이 따로 없어서, "~해야 했다"는 had to로 말해요: I had to wait an hour.',
      easy: '두 표지판을 떠올려 보세요.\n\n- 빨간 금지 표지판 = **must not** — "하면 안 돼요!"\n- "안 해도 괜찮아요" 안내판 = **don\'t have to** — 하고 싶으면 해도 되지만, 꼭 할 필요는 없어요.\n\nYou must not eat here. (여기서 먹으면 안 돼요.)\nYou don\'t have to eat here. (여기서 먹지 않아도 돼요. — 먹어도 괜찮아요.)',
      check: {
        type: 'ox',
        q: '"You don\'t have to come early."는 "일찍 오면 안 돼요."라는 뜻이에요.',
        answer: false,
        explain: 'don\'t have to는 "~할 필요가 없다"예요. "일찍 오지 않아도 돼요."라는 뜻이에요. "~하면 안 된다"는 must not이에요.',
      },
    },
    {
      title: 'should로 충고하기',
      body: '**should**는 "~하는 게 좋겠다, ~해야 한다"라는 뜻으로, 상대에게 **충고·조언**을 할 때 써요. must보다 부드러운 말이에요.\n\n- You **should** drink more water. (물을 더 마시는 게 좋겠어.)\n- You **shouldn\'t(should not)** stay up late. (늦게까지 깨어 있지 않는 게 좋겠어.)\n- **Should I** take an umbrella? — Yes, you should. / No, you don\'t have to.\n\n충고를 주고받는 대화는 보통 이렇게 흘러가요.\n\nA: I have a headache. (문제 말하기)\nB: That\'s too bad. You **should** take a rest. (공감 + 충고)\n\n> 💡 세기를 비교하면: must(꼭 해야 함, 규칙) > should(하는 게 좋음, 충고)',
      easy: '친구가 감기에 걸렸다고 하면 뭐라고 말해 줄까요? "약 먹는 게 좋겠어." 이게 바로 should예요.\n\nYou **should** take some medicine.\n\n반대로 "찬 음료는 안 마시는 게 좋겠어"는 shouldn\'t를 써요: You **shouldn\'t** drink cold drinks.',
      check: {
        type: 'choice',
        q: '대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: I have a toothache.\nB: You [[blank]] eat too much candy.',
        choices: ["shouldn't", 'should', 'will'],
        answer: 0,
        why: ['', '이가 아픈 친구에게 사탕을 많이 먹으라고 하는 것은 알맞은 충고가 아니에요.', 'will은 미래의 일이나 의지를 말해요. 충고는 should/shouldn\'t로 해요.'],
        explain: '이가 아픈 친구에게는 "사탕을 너무 많이 먹지 않는 게 좋겠어."라고 충고해요. You shouldn\'t eat too much candy.',
      },
    },
    {
      title: '규칙 안내문 읽기와 글의 목적',
      body: '수영장, 도서관, 박물관 같은 곳의 **규칙 안내문**에는 조동사가 많이 쓰여요.\n\n| 표현 | 안내문에서의 뜻 |\n|---|---|\n| You must / have to ~ | 꼭 지켜야 할 것 |\n| You must not ~ | 금지된 것 |\n| You don\'t have to ~ | 하지 않아도 되는 것 |\n| You should ~ | 권하는 것 |\n| You can ~ | 해도 되는 것 |\n\n**글의 목적**은 "글쓴이가 왜 이 글을 썼을까?"예요. 제목(Pool Rules, Field Trip Notice)과 첫 문장·마지막 문장에 목적이 잘 드러나요. 규칙을 나열한 안내문의 목적은 대개 "규칙을 알리기 위해서"예요.\n\n세부 내용을 확인할 때는 must not과 don\'t have to를 특히 조심해서 읽어요.',
      easy: '안내문은 그곳의 "약속 목록"이에요. 읽을 때 문장 앞에 표시를 해 보세요.\n\n- must, have to → 꼭 해요\n- must not → 하면 안 돼요\n- don\'t have to → 안 해도 돼요\n\n표시만 해 두어도 무엇을 해야 하고 무엇을 하면 안 되는지 한눈에 보여요.',
      check: {
        type: 'choice',
        q: '안내문에 "You must not take pictures in the gallery."라고 쓰여 있어요. 무슨 뜻일까요?',
        choices: ['전시실에서 사진을 찍으면 안 돼요.', '전시실에서 사진을 찍지 않아도 돼요.', '전시실에서 사진을 꼭 찍어야 해요.'],
        answer: 0,
        why: ['', '"찍지 않아도 된다"는 don\'t have to예요. must not은 금지예요.', 'must는 "~해야 한다"지만 must not은 "~하면 안 된다"예요.'],
        explain: 'must not은 금지를 나타내요. 전시실(gallery)에서 사진 촬영이 금지되어 있다는 뜻이에요.',
      },
    },
  ],

  examples: [
    {
      q: '다음 문장을 부정문과 의문문으로 바꾸어 보세요.\n\n(1) She will join the club.\n(2) He is going to visit Busan.',
      steps: [
        '(1) 조동사 will 뒤에 not을 붙여요. will not은 won\'t로 줄여요. → She won\'t join the club.',
        '(1) 의문문은 Will을 주어 앞으로 옮겨요. → Will she join the club?',
        '(2) be going to는 be동사 is 뒤에 not을 붙여요. → He isn\'t going to visit Busan.',
        '(2) 의문문은 Is를 주어 앞으로 옮겨요. → Is he going to visit Busan?',
      ],
      answer: "(1) She won't join the club. / Will she join the club? (2) He isn't going to visit Busan. / Is he going to visit Busan?",
    },
    {
      q: '빈칸에 must not과 don\'t have to 가운데 알맞은 말을 쓰세요.\n\n(1) 이 물은 마시면 안 돼요. → You (   ) drink this water.\n(2) 오늘은 우산을 가져가지 않아도 돼요. → You (   ) take an umbrella today.',
      steps: [
        '(1) "~하면 안 된다"는 금지예요. 금지는 must not으로 말해요.',
        '(2) "~하지 않아도 된다"는 필요가 없다는 뜻이에요. don\'t have to로 말해요.',
      ],
      answer: "(1) must not (2) don't have to",
    },
  ],

  terms: [
    { term: '조동사', def: '동사 앞에서 미래·능력·의무·충고 같은 뜻을 더하는 말이에요. 뒤에는 늘 동사원형이 와요. 예: will, can, must, should' },
    { term: 'will', def: '"~할 것이다"라는 미래·의지·약속을 나타내요. 부정은 won\'t(will not)예요. 예: I will help you.' },
    { term: 'be going to', def: '"~할 예정이다"라는 뜻으로, 미리 정한 계획을 말할 때 많이 써요. be동사는 주어에 맞춰요. 예: We are going to visit Jeju.' },
    { term: 'must', def: '"~해야 한다"라는 강한 의무를 나타내요. 부정 must not은 "~하면 안 된다"(금지)예요.' },
    { term: 'have to', def: '"~해야 한다"라는 의무를 나타내요. 3인칭 단수 주어에는 has to를 써요. 부정 don\'t have to는 "~할 필요가 없다"예요.' },
    { term: 'should', def: '"~하는 게 좋겠다"라는 충고·조언을 나타내요. 부정은 shouldn\'t(should not)예요. 예: You should rest.' },
    { term: '글의 목적', def: '글쓴이가 그 글을 쓴 까닭이에요. 안내, 초대, 감사, 광고처럼 제목과 첫 문장·끝 문장에 잘 드러나요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nMinsu can [[blank]] very fast.',
      choices: ['swim', 'swims', 'swimming', 'to swim'],
      answer: 0,
      why: [
        '',
        '조동사 뒤에는 동사원형을 써요. 주어가 3인칭 단수여도 -s를 붙이지 않아요.',
        '조동사 뒤에는 -ing가 아니라 동사원형을 써요.',
        'can 뒤에는 to 없이 동사원형을 바로 써요.',
      ],
      explain: '조동사 can 뒤에는 동사원형 swim을 써요. Minsu can swim very fast.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: '"She will goes to the park tomorrow."는 바른 문장이에요.',
      answer: false,
      explain: '조동사 will 뒤에는 동사원형을 써요. 바른 문장은 She will **go** to the park tomorrow.예요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nI [[blank]] be late again. I promise.',
      choices: ["won't", "willn't", "don't will", "will don't"],
      answer: 0,
      why: [
        '',
        "will not의 줄임말은 willn't가 아니라 won't예요.",
        '조동사의 부정문은 do를 쓰지 않고 조동사 뒤에 not을 붙여요.',
        '조동사 뒤에 not을 붙여요. will not → won\'t',
      ],
      explain: 'will not의 줄임말은 won\'t예요. I won\'t be late again.(다시는 늦지 않을게요.)',
    },
    {
      id: 'p4', level: 1, type: 'short', concept: 1,
      q: '빈칸에 알맞은 be동사를 쓰세요.\n\nWe [[blank]] going to visit Gyeongju next week.',
      answer: ['are'],
      wrong: [
        { a: 'is', why: '주어 We는 복수예요. be going to의 be동사는 주어에 맞춰 are를 써요.' },
        { a: 'am', why: 'am은 주어가 I일 때만 써요. We에는 are를 써요.' },
        { a: 'will', why: 'will 뒤에는 동사원형이 와요. going to 앞에는 be동사를 써요.' },
      ],
      explain: 'be going to의 be동사는 주어에 맞춰요. We에는 are를 써요. We are going to visit Gyeongju next week.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '"박물관 안에서 음식을 먹으면 안 돼요."라는 뜻이 되게 빈칸에 알맞은 말을 고르세요.\n\nYou [[blank]] eat food in the museum.',
      choices: ['must not', "don't have to", 'should', 'will'],
      answer: 0,
      why: [
        '',
        "don't have to는 \"~할 필요가 없다\"예요. 금지는 must not이에요.",
        'should는 "~하는 게 좋겠다"라는 충고예요. 금지의 뜻이 아니에요.',
        'will은 미래의 일을 말해요. 금지의 뜻이 아니에요.',
      ],
      explain: '"~하면 안 된다"는 금지이므로 must not을 써요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 2,
      q: '"내일은 휴일이라 학교에 갈 필요가 없어요."라는 뜻이 되게 빈칸에 알맞은 말을 고르세요.\n\nWe [[blank]] go to school tomorrow.',
      choices: ["don't have to", 'must not', 'have to', 'must'],
      answer: 0,
      why: [
        '',
        'must not은 "가면 안 된다"는 금지예요. 휴일이라 갈 필요가 없다는 뜻과 달라요.',
        'have to는 "가야 한다"는 뜻이에요.',
        'must는 "가야 한다"는 뜻이에요.',
      ],
      explain: '"~할 필요가 없다"는 don\'t have to예요. We don\'t have to go to school tomorrow.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: I have a bad cold.\nB: That\'s too bad. You [[blank]] see a doctor.',
      choices: ['should', "shouldn't", "won't", "don't have to"],
      answer: 0,
      why: [
        '',
        '심한 감기에 걸린 친구에게 병원에 가지 말라고 하는 것은 알맞은 충고가 아니에요.',
        'won\'t는 "~하지 않을 것이다"예요. 충고가 아니에요.',
        '"갈 필요가 없다"는 감기에 걸린 친구에게 알맞은 충고가 아니에요.',
      ],
      explain: '아픈 친구에게 "병원에 가 보는 게 좋겠어."라고 충고해요. You should see a doctor.',
    },
    {
      id: 'p8', level: 2, type: 'short', concept: 2,
      q: '괄호 안의 낱말을 알맞은 꼴로 바꾸어 빈칸에 쓰세요.\n\nJia [[blank]] to clean her room today. (have)',
      answer: ['has'],
      wrong: [
        { a: 'have', why: '주어 Jia는 3인칭 단수예요. have to는 has to가 돼요.' },
        { a: 'haves', why: 'have의 3인칭 단수형은 has예요.' },
      ],
      hint: 'have to의 have는 주어에 따라 모양이 바뀌어요.',
      explain: '주어 Jia가 3인칭 단수이므로 have to → has to예요. Jia has to clean her room today.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 1,
      q: '"너는 그 동아리에 가입할 예정이니?"라는 뜻이 되게 순서대로 놓으세요.',
      choices: ['Are', 'you', 'going to', 'join', 'the club?'],
      answer: [0, 1, 2, 3, 4],
      hint: 'be going to의 의문문은 be동사가 맨 앞에 와요.',
      explain: 'be going to의 의문문은 "be동사 + 주어 + going to + 동사원형 ~?"이에요. Are you going to join the club?',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 0,
      q: '대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: Should I bring my own lunch?\nB: [[blank]] We don\'t have a cafeteria here.',
      choices: ['Yes, you should.', 'Yes, I should.', 'Yes, you do.', "No, you shouldn't."],
      answer: 0,
      why: [
        '',
        '"내가 ~해야 하니?"라는 질문에는 you로 대답해요.',
        'Should로 물었으니 should로 대답해요.',
        '식당이 없다고 했으니 도시락을 가져오는 게 좋아요. "예"가 알맞아요.',
      ],
      hint: '뒤 문장 We don\'t have a cafeteria here.의 뜻을 먼저 보세요.',
      explain: '구내식당이 없으니 도시락을 가져오는 게 좋다는 대답이에요. Should I ~? 에는 Yes, you should.로 대답해요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '안내문을 읽고, 이 글의 목적으로 알맞은 것을 고르세요.\n\nSwimming Pool Rules\n- You must take a shower before you swim.\n- You must wear a swimming cap.\n- You must not run near the pool.\n- Children under 10 have to swim with an adult.\n- You don\'t have to bring a towel. We have towels for you.\nHave a safe and fun time!',
      choices: ['수영장 이용 규칙을 알리려고', '수영 강습생을 모집하려고', '수영장 여는 시간이 바뀐 것을 알리려고', '수영 모자를 팔려고'],
      answer: 0,
      why: [
        '',
        '강습이나 모집에 대한 말은 없어요.',
        '여는 시간에 대한 말은 없어요.',
        '수영 모자를 써야 한다는 규칙은 있지만 판다는 말은 없어요.',
      ],
      explain: '제목이 Swimming Pool Rules이고 must, must not, have to로 지켜야 할 것을 나열했어요. 수영장 이용 규칙을 알리는 글이에요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 4,
      q: '안내문을 읽고, 내용과 **맞지 않는** 것을 고르세요.\n\nWelcome to Sunny Library\n- You can borrow five books for two weeks.\n- You must not eat or drink in the reading room.\n- You should talk quietly.\n- You have to return books on time.\n- You don\'t have to show your card when you read books in the library.',
      choices: [
        '열람실에서 음료를 마셔도 돼요.',
        '책은 다섯 권까지 2주 동안 빌릴 수 있어요.',
        '책은 기한에 맞춰 돌려줘야 해요.',
        '도서관 안에서 책을 읽을 때는 카드를 보여 주지 않아도 돼요.',
      ],
      answer: 0,
      why: [
        '',
        'You can borrow five books for two weeks.라고 했으니 맞아요.',
        'You have to return books on time.이라고 했으니 맞아요.',
        "You don't have to show your card ~라고 했으니 맞아요.",
      ],
      hint: 'must not이 들어간 문장을 찾아보세요.',
      explain: 'You must not eat or drink in the reading room.은 "열람실에서 먹거나 마시면 안 돼요."라는 뜻이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 2,
      q: '다음 문장의 뜻으로 알맞은 것은 무엇일까요?\n\nYou don\'t have to wear a school uniform on Fridays.',
      choices: [
        '금요일에는 교복을 입지 않아도 돼요.',
        '금요일에는 교복을 입으면 안 돼요.',
        '금요일에는 교복을 꼭 입어야 해요.',
        '금요일에는 교복을 입을 거예요.',
      ],
      answer: 0,
      why: [
        '',
        '"입으면 안 된다"는 must not이에요. don\'t have to는 "입을 필요가 없다"예요.',
        '"꼭 입어야 한다"는 must나 have to의 긍정문이에요.',
        '"입을 것이다"는 will이나 be going to예요.',
      ],
      hint: 'must not과 don\'t have to의 차이를 떠올려 보세요.',
      explain: 'don\'t have to는 "~할 필요가 없다"예요. 금요일에는 교복을 입지 않아도 된다는 뜻이고, 입어도 괜찮아요.',
    },
    {
      id: 'a2', level: 3, type: 'short', concept: 0,
      q: '다음 문장에서 **틀린 낱말 하나**를 찾아 바르게 고쳐 쓰세요. (고친 낱말만 쓰세요)\n\nMinho musts wear a helmet when he rides a bike.',
      answer: ['must', 'has to'],
      wrong: [
        { a: 'rides', why: 'when he rides의 rides는 3인칭 단수 현재형으로 바르게 썼어요. 틀린 곳은 조동사예요.' },
        { a: 'wears', why: '조동사 뒤에는 동사원형을 써요. wear는 그대로 두고 조동사를 고쳐요.' },
      ],
      hint: '조동사에는 3인칭 단수 -s를 붙이지 않아요.',
      explain: '조동사는 주어가 3인칭 단수여도 -s를 붙이지 않아요. musts를 must로 고쳐요. Minho must wear a helmet when he rides a bike.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 1,
      q: '대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: What are you going to do this weekend?\nB: [[blank]]',
      choices: [
        "I'm going to visit my aunt.",
        'I visited my aunt.',
        "I'm going to visited my aunt.",
        'I going to visit my aunt.',
      ],
      answer: 0,
      why: [
        '',
        '이번 주말의 계획을 물었어요. 과거형 visited는 지난 일이에요.',
        'be going to 뒤에는 동사원형을 써요. visited가 아니라 visit이에요.',
        'be going to에서 be동사를 빼먹었어요. I\'m going to예요.',
      ],
      explain: '앞으로의 계획을 물었으니 be going to + 동사원형으로 대답해요. I\'m going to visit my aunt.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      q: '친구가 "I always feel tired in the morning."이라고 말했어요. 알맞은 충고는 무엇일까요?',
      choices: [
        'You should go to bed earlier.',
        'You should stay up late.',
        "You shouldn't sleep at night.",
        'You must not go to bed early.',
      ],
      answer: 0,
      why: [
        '',
        '늦게까지 깨어 있으면 아침에 더 피곤해요. 알맞은 충고가 아니에요.',
        '밤에 자지 말라는 것은 피곤한 친구에게 맞지 않는 충고예요.',
        '일찍 자면 안 된다는 금지는 피곤한 친구에게 맞지 않아요.',
      ],
      explain: '아침마다 피곤한 친구에게는 "더 일찍 자는 게 좋겠어."라는 충고가 알맞아요. You should go to bed earlier.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: '안내문을 읽고, 학생들이 **꼭** 가져와야 하는 것을 고르세요.\n\nField Trip Notice\nWe are going to visit the science museum on Friday. All students have to come to school by 8:30. You must bring your student card. You don\'t have to bring lunch. The museum will give us lunch. You should wear comfortable shoes.',
      choices: ['학생증', '점심 도시락', '편한 신발', '과학 공책'],
      answer: 0,
      why: [
        '',
        "You don't have to bring lunch.라고 했어요. 가져오지 않아도 돼요.",
        'should는 권하는 말이에요. 편한 신발은 신고 오면 좋은 것이지, 꼭 가져와야 하는 물건은 아니에요.',
        '안내문에 공책에 대한 말은 없어요.',
      ],
      hint: 'must나 have to와 함께 쓰인 물건을 찾아보세요.',
      explain: 'You must bring your student card.라고 했으니 학생증은 꼭 가져와야 해요.',
    },
  ],

  deeper: [
    {
      title: 'must와 have to, 정말 똑같을까?',
      body: '긍정문에서 must와 have to는 둘 다 "~해야 한다"라서 거의 바꿔 쓸 수 있어요. 그래도 작은 차이가 있어요.\n\n- **must**는 말하는 사람이 "꼭 해야 한다"고 느끼는 의무, 또는 안내문·규칙처럼 딱 잘라 말하는 경우에 많이 써요: Visitors must wear a mask.\n- **have to**는 바깥 사정(규칙, 일정) 때문에 해야 하는 일에 많이 써요: I have to get up early. My bus leaves at seven.\n\n또 must는 과거형이 따로 없어요. 그래서 "~해야 했다"는 have to의 과거형 **had to**를 빌려 써요: Yesterday I had to wait for an hour.\n\n앞으로 어떤 조동사를 새로 만나더라도 "조동사 + 동사원형" 규칙은 그대로예요. 이 규칙을 단단히 익혀 두세요.',
    },
  ],

  faq: [
    {
      q: 'will이랑 be going to는 뭐가 달라요?',
      a: '둘 다 미래를 말해요. be going to는 미리 정해 둔 계획(I\'m going to visit Jeju next month.)에, will은 말하는 순간 정한 일이나 약속(I\'ll help you.)에 많이 써요. 많은 문장에서는 어느 것을 써도 뜻이 통해요.',
    },
    {
      q: "must not이랑 don't have to는 왜 뜻이 달라요?",
      a: "must not은 \"~하면 안 된다\"는 금지이고, don't have to는 \"~할 필요가 없다\"예요. 긍정문에서는 must와 have to가 비슷하지만, 부정문이 되면 이렇게 뜻이 갈라져요. 표지판으로 기억해요: must not은 금지 표지판, don't have to는 \"안 해도 괜찮아요\" 안내판이에요.",
    },
    {
      q: '조동사 뒤에는 왜 늘 동사원형을 써요?',
      a: '한 문장에서 시제를 나타내는 동사 자리는 하나뿐인데, 조동사가 그 자리를 차지하기 때문이에요. 그래서 뒤의 동사는 아무것도 붙이지 않은 원형으로 써요: He will plays가 아니라 He will play예요. 조동사 자신도 주어에 따라 모양이 바뀌지 않아요(wills ✕). 부정문·의문문도 조동사가 맡아서 do/does를 쓰지 않아요.',
    },
    {
      q: 'should와 must 중에 어느 쪽이 더 강해요?',
      a: 'must가 더 강해요. must는 꼭 지켜야 하는 의무나 규칙, should는 "~하는 게 좋겠다"는 충고예요. 친구에게 조언할 때는 보통 should를 써요.',
    },
  ],

  mistakes: [
    '조동사 뒤에 -s, -ing, to를 붙이는 실수 — She can sings / will going / must to go (✕) → She can sing / will go / must go (○)',
    "must not(금지)과 don't have to(불필요)를 같은 뜻으로 생각하는 실수 — You don't have to run.은 \"뛰지 않아도 돼요\"예요.",
    'be going to에서 be동사를 빼먹는 실수 — I going to visit (✕) → I am going to visit (○)',
  ],

  gens: [
    {
      id: 'modal-base',
      level: 1,
      title: '조동사 뒤의 동사원형 고르기',
      make: function (R) {
        var subjects = ['She', 'He', 'Minsu', 'My sister', 'My brother', 'Jia'];
        var modals = [['will', '~할 것이다'], ['can', '~할 수 있다'], ['must', '~해야 한다'], ['should', '~하는 게 좋겠다']];
        // [원형, 3인칭 단수형, -ing, 뒷말]
        var verbs = [
          ['play', 'plays', 'playing', 'the guitar'],
          ['finish', 'finishes', 'finishing', 'the work today'],
          ['go', 'goes', 'going', 'to bed early'],
          ['study', 'studies', 'studying', 'for the exam'],
          ['wash', 'washes', 'washing', 'the dishes'],
          ['come', 'comes', 'coming', 'to the party'],
          ['read', 'reads', 'reading', 'this book'],
          ['have', 'has', 'having', 'a snack'],
        ];
        var s = R.pick(subjects);
        var m = R.pick(modals);
        var v = R.pick(verbs);
        var correct = v[0];
        var cands = [
          [v[1], '조동사 뒤에는 동사원형을 써요. 주어가 3인칭 단수여도 -s를 붙이지 않아요.'],
          [v[2], '조동사 뒤에는 -ing가 아니라 동사원형을 써요.'],
          ['to ' + v[0], m[0] + ' 뒤에는 to 없이 동사원형을 바로 써요.'],
        ];
        var reason = {};
        cands.forEach(function (c) { reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }), 4);
        var sentence = s + ' ' + m[0] + ' [[blank]] ' + v[3] + '.';
        return {
          type: 'choice', concept: 0,
          q: '빈칸에 알맞은 말은 무엇일까요?\n\n' + sentence,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: '조동사 ' + m[0] + '(' + m[1] + ') 뒤에는 동사원형을 써요. 주어가 3인칭 단수여도 -s를 붙이지 않아요.\n\n' + sentence.replace('[[blank]]', '**' + correct + '**'),
        };
      },
    },
    {
      id: 'going-to',
      level: 1,
      title: 'be going to의 be동사 고르기',
      make: function (R) {
        var subjects = [
          ['I', 'am'], ['You', 'are'], ['We', 'are'], ['They', 'are'], ['My parents', 'are'], ['Jia and Doyun', 'are'],
          ['He', 'is'], ['She', 'is'], ['Minsu', 'is'], ['My cousin', 'is'], ['Our class', 'is'],
        ];
        var plans = [
          'visit the museum this Saturday', 'learn taekwondo next month', 'have a picnic tomorrow',
          'clean the classroom after school', 'watch a musical tonight', 'travel to Jeju next summer',
        ];
        var s = R.pick(subjects);
        var plan = R.pick(plans);
        var all = ['am', 'are', 'is', 'will'];
        var pick = R.choices(s[1], all.filter(function (x) { return x !== s[1]; }), 4);
        var why = {
          am: 'am은 주어가 I일 때만 써요.',
          are: 'are는 주어가 you이거나 복수일 때 써요.',
          is: 'is는 주어가 3인칭 단수일 때 써요.',
          will: 'will 뒤에는 동사원형이 와요. going to 앞에는 be동사를 써요.',
        };
        var sentence = s[0] + ' [[blank]] going to ' + plan + '.';
        var who = s[1] === 'am' ? '주어가 I이므로' : (s[1] === 'is' ? '주어(' + s[0] + ')가 3인칭 단수이므로' : (s[0] === 'You' ? '주어가 you이므로' : '주어(' + s[0] + ')가 복수이므로'));
        return {
          type: 'choice', concept: 1,
          q: '빈칸에 알맞은 말은 무엇일까요?\n\n' + sentence,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === s[1] ? '' : why[c]; }),
          explain: 'be going to의 be동사는 주어에 맞춰요. ' + who + ' ' + s[1] + (s[1] === 'am' ? '을' : '를') + ' 써요.\n\n' + sentence.replace('[[blank]]', '**' + s[1] + '**'),
        };
      },
    },
    {
      id: 'mustnot-donthaveto',
      level: 2,
      title: 'must not과 don\'t have to 구별하기',
      make: function (R) {
        // [뜻(한국어), 동사구, 정답 종류]  종류: no(금지) | need(불필요) | must(의무)
        var cases = [
          ['도서관에서 큰 소리로 떠들면 안 된다', 'talk loudly in the library', 'no'],
          ['수업 중에 휴대 전화를 쓰면 안 된다', 'use phones during class', 'no'],
          ['빨간불에 길을 건너면 안 된다', 'cross the street at a red light', 'no'],
          ['수영장 옆에서 뛰면 안 된다', 'run near the pool', 'no'],
          ['박물관의 그림을 만지면 안 된다', 'touch the paintings in the museum', 'no'],
          ['내일은 휴일이라 일찍 일어날 필요가 없다', 'get up early tomorrow', 'need'],
          ['입장료가 무료라서 돈을 낼 필요가 없다', 'pay for the tickets', 'need'],
          ['수건이 준비되어 있어서 가져올 필요가 없다', 'bring towels', 'need'],
          ['비가 오지 않으니 우산을 챙길 필요가 없다', 'take umbrellas today', 'need'],
          ['자전거를 탈 때는 헬멧을 꼭 써야 한다', 'wear helmets when riding bikes', 'must'],
          ['숙제를 금요일까지 꼭 내야 한다', 'hand in the homework by Friday', 'must'],
          ['수영하기 전에 꼭 샤워해야 한다', 'take a shower before swimming', 'must'],
        ];
        var subjects = ['You', 'We', 'Students'];
        var c = R.pick(cases);
        var S = R.pick(subjects);
        var right = { no: 'must not', need: "don't have to", must: 'have to' }[c[2]];
        var opts = ['must not', "don't have to", 'have to'];
        var pick = R.choices(right, opts.filter(function (o) { return o !== right; }), 3);
        var why = {
          'must not': 'must not은 "~하면 안 된다"(금지)예요.',
          "don't have to": "don't have to는 \"~할 필요가 없다\"(불필요)예요.",
          'have to': 'have to는 "~해야 한다"(의무)예요.',
        };
        var sentence = S + ' [[blank]] ' + c[1] + '.';
        return {
          type: 'choice', concept: 2,
          q: '"' + c[0] + '"라는 뜻이 되게 빈칸에 알맞은 말을 고르세요.\n\n' + sentence,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (o) { return o === right ? '' : why[o] + ' 문장의 뜻과 맞지 않아요.'; }),
          explain: why[right] + '\n\n' + sentence.replace('[[blank]]', '**' + right + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'plan', m: '계획; 계획하다', ex: 'What is your plan for the vacation?', exm: '방학 계획이 뭐니?' },
    { w: 'join', m: '가입하다, 함께하다', ex: 'I am going to join the dance club.', exm: '나는 댄스 동아리에 가입할 거예요.' },
    { w: 'promise', m: '약속; 약속하다', ex: "I promise I won't be late.", exm: '늦지 않겠다고 약속할게요.' },
    { w: 'rule', m: '규칙', ex: 'We must follow the school rules.', exm: '우리는 학교 규칙을 따라야 해요.' },
    { w: 'follow', m: '따르다', ex: 'Please follow the guide.', exm: '안내자를 따라오세요.' },
    { w: 'helmet', m: '헬멧, 안전모', ex: 'You have to wear a helmet.', exm: '헬멧을 써야 해요.' },
    { w: 'borrow', m: '빌리다', ex: 'Can I borrow your pencil?', exm: '네 연필 좀 빌려도 될까?' },
    { w: 'return', m: '돌려주다', ex: 'I should return these books today.', exm: '나는 오늘 이 책들을 돌려줘야 해요.' },
    { w: 'quietly', m: '조용히', ex: 'Please talk quietly in the library.', exm: '도서관에서는 조용히 말해 주세요.' },
    { w: 'uniform', m: '교복, 제복', ex: "We don't have to wear a uniform today.", exm: '우리는 오늘 교복을 입지 않아도 돼요.' },
    { w: 'bring', m: '가져오다', ex: 'You should bring some water.', exm: '물을 좀 가져오는 게 좋겠어요.' },
    { w: 'safe', m: '안전한', ex: 'Have a safe trip!', exm: '안전한 여행 되세요!' },
    { w: 'visitor', m: '방문객', ex: 'Visitors must not feed the animals.', exm: '방문객은 동물에게 먹이를 주면 안 돼요.' },
    { w: 'comfortable', m: '편안한', ex: 'Wear comfortable shoes for the hike.', exm: '등산에는 편한 신발을 신으세요.' },
    { w: 'rest', m: '휴식; 쉬다', ex: 'You should take a rest.', exm: '너는 좀 쉬는 게 좋겠어.' },
  ],
});
