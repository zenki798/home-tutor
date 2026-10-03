/* 중1 영어 · 지난 일 이야기하기 (과거시제) */
Tutor.registerUnit({
  id: 'eng-m1-04',
  course: 'eng-m1',
  title: '지난 일 이야기하기 (과거시제)',
  summary: 'be동사와 일반동사의 과거형, 때를 나타내는 접속사를 익혀 지난 일을 순서대로 이야기해요.',
  goals: [
    'be동사의 과거형 was, were로 긍정문·부정문·의문문을 만들 수 있어요.',
    '규칙 동사와 불규칙 동사의 과거형을 바르게 쓸 수 있어요.',
    "didn't와 Did를 써서 과거시제의 부정문과 의문문을 만들 수 있어요.",
    'when, before, after로 일의 순서를 나타내며 일기를 읽고 쓸 수 있어요.',
  ],
  standards: [],

  concepts: [
    {
      title: 'be동사의 과거형 (was, were)',
      body: '"~이었다, ~에 있었다"라고 지난 일을 말할 때는 be동사의 과거형을 써요.\n\n| 주어 | 현재 | 과거 |\n|---|---|---|\n| I | am | **was** |\n| he, she, it, 단수 명사 | is | **was** |\n| you, we, they, 복수 명사 | are | **were** |\n\n부정문과 의문문은 현재형과 만드는 법이 같아요.\n\n- 부정문: was/were 뒤에 not → I **wasn\'t** at home. / They **weren\'t** busy.\n- 의문문: was/were를 주어 앞으로 → **Were you** sick yesterday? — Yes, I was. / No, I wasn\'t.\n\n> 💡 yesterday, last night, last week, two days ago처럼 **지난 때를 나타내는 말**이 있으면 과거형을 써요.',
      easy: 'am과 is는 과거로 가면 둘 다 **was**가 되고, are는 **were**가 돼요.\n\n- I am → I **was**\n- She is → She **was**\n- They are → They **were**\n\n"am·is → was, are → were" 이 두 줄만 기억하면 돼요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nMy friends [[blank]] at the park yesterday.',
        choices: ['were', 'was', 'are'],
        answer: 0,
        why: ['', 'My friends는 복수예요. 복수 주어의 과거형은 were예요.', 'yesterday(어제)가 있으니 과거형을 써요.'],
        explain: 'yesterday가 있으니 과거형이고, 주어 My friends가 복수라서 were예요.',
      },
    },
    {
      title: '규칙 동사의 과거형 만들기',
      body: '일반동사의 과거형은 대부분 동사원형에 **-ed**를 붙여 만들어요. 이런 동사를 **규칙 동사**라고 해요. 과거형은 주어가 무엇이든 모양이 같아요(3인칭 단수 -s가 없어요).\n\n| 동사의 끝 | 규칙 | 예 |\n|---|---|---|\n| 대부분 | -ed | play → played, watch → watched |\n| e | -d만 | like → liked, dance → danced |\n| 자음 + y | y를 i로 바꾸고 -ed | study → studied, cry → cried |\n| 모음 + y | -ed | play → played, enjoy → enjoyed |\n| 모음 하나 + 자음 하나 (한 음절) | 자음을 하나 더 쓰고 -ed | stop → stopped, plan → planned |\n\n> 💡 -ing를 붙이는 규칙(3단원)과 비슷해요. 자음을 하나 더 쓰는 동사가 같아요: stop → stopping, stopped',
      easy: '과거형은 동사에 "지난 일 도장" -ed를 찍는 거예요.\n\nI **walk** to school. (지금 습관) → I **walked** to school yesterday. (어제 한 일)\n\n도장을 찍을 때 끝 글자에 따라 조금씩 모양을 다듬어요. e로 끝나면 d만, 자음 + y면 ied, stop처럼 "모음 하나 + 자음 하나"로 끝나는 한 음절 동사는 끝 자음을 하나 더 써요(help, rain은 그냥 -ed).',
      check: {
        type: 'ox',
        q: '"study"의 과거형은 "studied"예요.',
        answer: true,
        explain: 'study는 자음(d) + y로 끝나므로 y를 i로 바꾸고 -ed를 붙여 studied예요.',
      },
    },
    {
      title: '불규칙 동사의 과거형',
      body: '자주 쓰는 동사 가운데 많은 수가 -ed를 붙이지 않고 모양이 바뀌어요. 이런 동사를 **불규칙 동사**라고 해요. 하나씩 외워야 해요.\n\n| 바뀌는 모양 | 예 |\n|---|---|\n| 모음이 바뀜 | come → came, eat → ate, make → made, take → took, write → wrote, swim → swam, ride → rode, get → got |\n| 전혀 다른 모양 | go → **went**, do → did, have → had, see → saw, buy → bought |\n| 원형과 같은 모양 | put → put, cut → cut, read → read |\n\n> ⚠️ read의 과거형은 철자는 같지만 발음이 달라요. 과거형 read는 red(빨간색)와 같은 소리로 읽어요.\n\n불규칙 동사도 과거형은 주어에 상관없이 한 가지예요: I went / She went / They went.',
      easy: '불규칙 동사는 "-ed 도장을 거부하는 동사들"이에요. 대신 자기만의 과거 모습이 있어요.\n\n- go(가다) → went(갔다)\n- eat(먹다) → ate(먹었다)\n- put(놓다) → put(놓았다) — 모양이 그대로!\n\n자주 쓰는 동사일수록 불규칙인 경우가 많아요. 문장으로 소리 내어 읽으며 익히면 오래 기억돼요: I went to school. I ate lunch.',
      check: {
        type: 'choice',
        q: '"make"의 과거형은 무엇일까요?',
        choices: ['made', 'maked', 'makeed'],
        answer: 0,
        why: ['', 'make는 불규칙 동사라서 -ed를 붙이지 않아요.', 'make는 불규칙 동사예요. 과거형은 made예요.'],
        explain: 'make는 불규칙 동사로, 과거형은 made예요. I made a cake.',
      },
    },
    {
      title: "과거시제의 부정문과 의문문 (didn't, Did)",
      body: '일반동사의 과거 부정문과 의문문에는 do의 과거형 **did**를 써요. 주어가 무엇이든 did 하나로 충분해요.\n\n- 부정문: **didn\'t(did not) + 동사원형** → I **didn\'t watch** TV. / She **didn\'t go** to school.\n- 의문문: **Did + 주어 + 동사원형 ~?** → **Did you see** the movie? — Yes, I did. / No, I didn\'t.\n\n과거 표시는 did가 가져가요. 그래서 그 뒤의 동사는 **원형**으로 돌아가요.\n\nShe went to school. → She didn\'t **go** to school. (went ✕)\n\n의문사를 쓰면: **What did you do** yesterday? — I visited my uncle.',
      easy: '2단원에서 doesn\'t가 -s를 가져갔던 것, 기억나요? 과거에서는 did가 "과거 도장"을 가져가요.\n\nHe played → He **did**n\'t **play**\n\n과거 도장은 한 문장에 한 번만! did가 이미 찍었으니 동사는 원래 모습이에요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nI [[blank]] eat breakfast this morning.',
        choices: ["didn't", "don't", "wasn't"],
        answer: 0,
        why: ['', '오늘 아침(this morning)은 지난 때예요. 과거 부정문에는 didn\'t를 써요.', 'eat은 일반동사예요. 일반동사 과거 부정문에는 wasn\'t가 아니라 didn\'t를 써요.'],
        explain: '오늘 아침에 먹지 않은 지난 일이므로 didn\'t + 동사원형(eat)을 써요. I didn\'t eat breakfast this morning.',
      },
    },
    {
      title: '접속사 when · before · after로 순서 나타내기',
      body: '두 가지 일의 순서를 한 문장으로 말할 때 **접속사**를 써요.\n\n| 접속사 | 뜻 | 예 |\n|---|---|---|\n| when | ~할 때 | **When** I was ten, I lived in Busan. |\n| before | ~하기 전에 | I washed my hands **before** I ate lunch. |\n| after | ~한 후에 | **After** I finished my homework, I watched TV. |\n\n- 접속사가 이끄는 부분이 문장 앞에 오면 그 끝에 **쉼표(,)**를 찍어요.\n- 앞뒤를 바꾸어도 뜻은 같아요: I watched TV after I finished my homework.\n\n**일기**는 하루 동안 있었던 일을 과거형으로, 일어난 순서대로 써요. 날짜 → 있었던 일(순서대로) → 느낌 순서로 쓰면 좋아요. 느낌은 It was fun. / I was happy.처럼 써요.',
      easy: '순서가 헷갈리면 시간 줄을 그려 보세요.\n\n"Before I ate lunch, I washed my hands."\n\n손 씻기 → 점심 먹기\n\nbefore 뒤의 일(점심)이 나중, after 뒤의 일이 먼저예요. 문장에 쓰인 순서가 아니라 접속사의 뜻으로 순서를 정해요.',
      check: {
        type: 'ox',
        q: '"After I cleaned my room, I went out."에서 방 청소를 먼저 했어요.',
        answer: true,
        explain: 'after는 "~한 후에"예요. 방을 청소한 후에 밖에 나갔으니 청소가 먼저예요.',
      },
    },
  ],

  examples: [
    {
      q: '다음 문장을 부정문과 의문문으로 바꾸어 보세요.\n\nMinsu cleaned his room yesterday.',
      steps: [
        'cleaned는 일반동사 clean의 과거형이에요. 그래서 didn\'t / Did를 써요.',
        '부정문: 동사 앞에 didn\'t를 쓰고 cleaned를 원형 clean으로 바꿔요. → Minsu didn\'t clean his room yesterday.',
        '의문문: 문장 앞에 Did를 쓰고 동사를 원형으로 바꿔요. → Did Minsu clean his room yesterday?',
        '대답은 Yes, he did. / No, he didn\'t.예요.',
      ],
      answer: "Minsu didn't clean his room yesterday. / Did Minsu clean his room yesterday?",
    },
    {
      q: 'after를 써서 두 문장을 한 문장으로 이어 보세요.\n\nI ate dinner. Then I took a walk.',
      steps: [
        '먼저 한 일은 저녁 먹기(ate dinner), 나중에 한 일은 산책(took a walk)이에요.',
        'after는 "~한 후에"이므로 먼저 한 일 앞에 붙여요: after I ate dinner',
        '이 부분을 앞에 두면 끝에 쉼표를 찍어요. → After I ate dinner, I took a walk.',
        '뒤에 두어도 돼요. → I took a walk after I ate dinner.',
      ],
      answer: 'After I ate dinner, I took a walk. (= I took a walk after I ate dinner.)',
    },
  ],

  terms: [
    { term: '과거시제', def: '지난 일을 나타내는 시제예요. be동사는 was/were, 일반동사는 과거형(played, went)을 써요.' },
    { term: '규칙 동사', def: '동사원형에 -ed(-d)를 붙여 과거형을 만드는 동사예요. 예: play → played, like → liked' },
    { term: '불규칙 동사', def: '-ed를 붙이지 않고 모양이 바뀌어 과거형이 되는 동사예요. 예: go → went, eat → ate, put → put' },
    { term: "didn't", def: "did not의 줄임말이에요. 일반동사 과거 부정문에서 동사원형 앞에 써요. 예: I didn't go." },
    { term: '접속사', def: '낱말이나 문장을 이어 주는 말이에요. when(~할 때), before(~하기 전에), after(~한 후에)는 때와 순서를 나타내요.' },
    { term: '일기', def: '그날 있었던 일과 느낌을 적는 글이에요. 과거형으로, 일어난 순서대로 써요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nJia and I [[blank]] in the same class last year.',
      choices: ['were', 'was', 'are', 'is'],
      answer: 0,
      why: [
        '',
        'Jia and I는 두 사람(복수)이에요. 복수 주어의 과거형은 were예요.',
        'last year(작년)가 있으니 과거형을 써요.',
        'last year가 있으니 과거형이고, 주어도 복수예요.',
      ],
      explain: 'last year가 있으니 과거형이고, Jia and I는 복수이므로 were예요.',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 1,
      q: '동사 study의 과거형을 쓰세요.',
      answer: ['studied'],
      wrong: [
        { a: 'studyed', why: '자음 + y로 끝나는 동사는 y를 i로 바꾸고 -ed를 붙여요.' },
        { a: 'studies', why: 'studies는 3인칭 단수 현재형이에요. 과거형은 -ed를 붙여 studied예요.' },
      ],
      explain: 'study는 자음(d) + y로 끝나므로 y를 i로 바꾸고 -ed를 붙여 studied예요.',
    },
    {
      id: 'p3', level: 1, type: 'short', concept: 1,
      q: '동사 stop의 과거형을 쓰세요.',
      answer: ['stopped'],
      wrong: [
        { a: 'stoped', why: 'stop은 모음 하나(o) + 자음 하나(p)로 끝나는 한 음절 동사예요. p를 하나 더 써요.' },
        { a: 'stopt', why: '규칙 동사는 -ed를 붙여요. p를 하나 더 쓰고 -ed: stopped' },
      ],
      explain: 'stop은 모음 하나 + 자음 하나로 끝나므로 p를 하나 더 쓰고 -ed를 붙여 stopped예요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '동사원형과 과거형을 **잘못** 짝지은 것은 무엇일까요?',
      choices: ['eat — eated', 'go — went', 'make — made', 'put — put'],
      answer: 0,
      why: [
        '',
        'go의 과거형은 went예요. 바르게 짝지었어요.',
        'make의 과거형은 made예요. 바르게 짝지었어요.',
        'put은 과거형이 원형과 같아요. 바르게 짝지었어요.',
      ],
      explain: 'eat은 불규칙 동사로, 과거형은 **ate**예요. eated라고 쓰지 않아요.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 2,
      q: '동사 read의 과거형은 철자가 read로 원형과 같아요.',
      answer: true,
      explain: 'read의 과거형은 철자가 같은 read예요. 다만 발음이 달라서 red(빨간색)와 같은 소리로 읽어요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nI [[blank]] watch TV last night.',
      choices: ["didn't", "don't", "wasn't", 'not'],
      answer: 0,
      why: [
        '',
        'last night(어젯밤)는 지난 때예요. 과거 부정문에는 didn\'t를 써요.',
        'watch는 일반동사예요. 일반동사의 과거 부정문에는 didn\'t를 써요.',
        '동사 앞에 not만 쓰지 않아요. didn\'t + 동사원형으로 써요.',
      ],
      explain: 'last night의 일이므로 과거 부정문 didn\'t + 동사원형을 써요. I didn\'t watch TV last night.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: Did you clean your room?\nB: Yes, [[blank]].',
      choices: ['I did', 'I do', 'I was', 'you did'],
      answer: 0,
      why: [
        '',
        'Did로 물었으니 과거형 did로 대답해요.',
        'clean은 일반동사예요. Did 질문에는 did로 대답해요.',
        '"너는 ~했니?"라는 질문이니 I로 대답해요.',
      ],
      explain: 'Did you ~? 질문에는 Yes, I did. / No, I didn\'t.로 대답해요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 0,
      q: '대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: Were you at the library yesterday?\nB: No, [[blank]]. I was at home.',
      choices: ["I wasn't", "I weren't", "I didn't", "you weren't"],
      answer: 0,
      why: [
        '',
        'I의 과거형은 was예요. 부정은 wasn\'t예요.',
        'be동사(Were)로 물었으니 be동사로 대답해요.',
        '"너는 ~에 있었니?"라는 질문이니 I로 대답해요.',
      ],
      explain: 'Were you ~? 에는 I로 대답해요. I의 be동사 과거형은 was이므로 No, I wasn\'t.예요.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 3,
      q: '"그녀는 새 가방을 샀니?"라는 뜻이 되게 순서대로 놓으세요.',
      choices: ['Did', 'she', 'buy', 'a new bag?'],
      answer: [0, 1, 2, 3],
      hint: '과거 의문문은 Did + 주어 + 동사원형 순서예요.',
      explain: 'Did + 주어(she) + 동사원형(buy) + 나머지? → Did she buy a new bag?',
    },
    {
      id: 'p10', level: 2, type: 'short', concept: 3,
      q: '다음 문장을 부정문으로 바꿀 때 빈칸에 알맞은 말을 쓰세요.\n\nHe went to the zoo. → He [[blank]] to the zoo.',
      answer: ["didn't go", 'did not go'],
      wrong: [
        { a: "didn't went", why: "didn't 뒤에는 동사원형을 써요. went의 원형은 go예요." },
        { a: "doesn't go", why: '원래 문장이 과거(went)예요. 과거 부정문에는 didn\'t를 써요.' },
        { a: "wasn't go", why: "go는 일반동사예요. 일반동사 과거 부정문에는 didn't를 써요." },
      ],
      hint: 'went의 원형이 무엇인지 먼저 떠올려 보세요.',
      explain: "과거 부정문은 didn't + 동사원형이에요. went의 원형은 go이므로 He didn't go to the zoo.",
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '다음 문장에서 **먼저** 일어난 일은 무엇일까요?\n\nBefore I went to bed, I brushed my teeth.',
      choices: ['이를 닦은 일', '잠자리에 든 일', '두 일이 동시에 일어났어요.'],
      answer: 0,
      why: [
        '',
        'before는 "~하기 전에"예요. 잠자리에 들기 전에 이를 닦았으니 잠자리에 든 것은 나중이에요.',
        'before는 순서를 나타내요. 동시에 일어난 일이 아니에요.',
      ],
      explain: '"잠자리에 들기 전에 이를 닦았어요"라는 뜻이에요. 이 닦기 → 잠자리에 들기 순서예요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 4,
      q: '일기를 읽고, 내용과 **맞지 않는** 것을 고르세요.\n\nSaturday, May 10\nToday I visited my grandma in Jeonju with my family. We left home at 8 a.m. When we arrived, Grandma was in her garden. We had lunch together. After lunch, I helped her in the garden. Before we came home, we took a picture together. It was a great day.',
      choices: [
        '점심을 먹기 전에 할머니의 정원 일을 도왔어요.',
        '아침 8시에 집을 나섰어요.',
        '도착했을 때 할머니는 정원에 계셨어요.',
        '집에 오기 전에 함께 사진을 찍었어요.',
      ],
      answer: 0,
      why: [
        '',
        'We left home at 8 a.m.이라고 했으니 글과 맞아요.',
        'When we arrived, Grandma was in her garden.이라고 했으니 글과 맞아요.',
        'Before we came home, we took a picture together.라고 했으니 글과 맞아요.',
      ],
      hint: 'After lunch가 들어간 문장을 찾아보세요.',
      explain: 'After lunch, I helped her in the garden.은 "점심을 먹은 후에" 정원 일을 도왔다는 뜻이에요. 점심 전이 아니에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      q: '다음 중 과거형을 **바르게** 쓴 문장은 무엇일까요?',
      choices: ['She planned a trip to Jeju.', 'We enjoied the party.', 'He goed to the park.', 'They stoped at the store.'],
      answer: 0,
      why: [
        '',
        'enjoy는 모음 + y로 끝나므로 -ed만 붙여요: enjoyed',
        'go는 불규칙 동사예요. 과거형은 went예요.',
        'stop은 p를 하나 더 써서 stopped예요.',
      ],
      explain: 'plan은 모음 하나 + 자음 하나로 끝나는 한 음절 동사라서 n을 하나 더 쓰고 -ed를 붙여 planned예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', concept: 3,
      q: '다음 문장에서 **틀린 낱말 하나**를 찾아 바르게 고쳐 쓰세요. (고친 낱말만 쓰세요)\n\nDid you saw the movie last weekend?',
      answer: ['see'],
      wrong: [
        { a: 'Do', why: 'last weekend(지난 주말)의 일이라 Did가 맞아요. 틀린 곳은 동사예요.' },
        { a: 'seen', why: 'Did 뒤에는 동사원형을 써요. saw의 원형은 see예요.' },
      ],
      hint: 'Did 뒤의 동사 모양을 확인해 보세요.',
      explain: 'Did 의문문에서 동사는 원형으로 써요. saw를 see로 고쳐 Did you see the movie last weekend?',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '다음 두 문장과 뜻이 같은 것은 무엇일까요?\n\nI finished my homework. Then I played games.',
      choices: [
        'After I finished my homework, I played games.',
        'Before I finished my homework, I played games.',
        'After I played games, I finished my homework.',
        'Before I played games, I didn\'t finish my homework.',
      ],
      answer: 0,
      why: [
        '',
        '게임을 숙제보다 먼저 한 것이 되어 순서가 반대예요.',
        '게임을 먼저 하고 숙제를 나중에 한 것이 되어 순서가 반대예요.',
        '게임하기 전에 숙제를 끝내지 않았다는 뜻이라 원래 내용과 반대예요.',
      ],
      hint: '먼저 한 일과 나중에 한 일을 정한 뒤, after와 before의 뜻을 대어 보세요.',
      explain: '숙제 → 게임 순서예요. "숙제를 끝낸 후에 게임을 했어요"는 After I finished my homework, I played games.예요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 0,
      q: '대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: [[blank]] you tired yesterday?\nB: Yes, I was. I didn\'t sleep well.',
      choices: ['Were', 'Did', 'Was', 'Are'],
      answer: 0,
      why: [
        '',
        'tired(피곤한)는 동사가 아니에요. be동사 과거형으로 물어요.',
        'you의 be동사 과거형은 were예요.',
        'yesterday(어제)의 일이에요. 과거형으로 물어요.',
      ],
      hint: 'B가 Yes, I was.로 대답한 것을 보세요.',
      explain: 'tired는 상태를 나타내는 말이라 be동사와 함께 써요. 어제의 일이고 주어가 you이므로 Were you tired yesterday?',
    },
    {
      id: 'a5', level: 3, type: 'short', concept: 4,
      q: '글을 읽고, 글쓴이가 하나에게 준 것을 **영어 한 낱말**로 쓰세요.\n\nYesterday was Hana\'s birthday. After school, I went to a bakery and bought a cake for her. When I gave it to her, she smiled. Then we ate it together. It was really sweet.',
      answer: ['cake', 'a cake'],
      wrong: [
        { a: 'bakery', why: 'bakery(빵집)는 케이크를 산 곳이에요. 하나에게 준 것은 그곳에서 산 물건이에요.' },
        { a: 'birthday', why: '어제가 하나의 생일이었어요. 준 물건을 찾아보세요.' },
      ],
      hint: 'When I gave it to her의 it이 가리키는 것을 앞 문장에서 찾아보세요.',
      explain: 'bought a cake for her(하나를 위해 케이크를 샀다) → When I gave it to her(그것을 주었을 때). it은 cake예요.',
    },
  ],

  deeper: [
    {
      title: '불규칙 동사는 왜 불규칙일까?',
      body: '옛날 영어에는 모음을 바꾸어 과거를 나타내는 동사가 지금보다 훨씬 많았어요. sing → sang, swim → swam, ride → rode가 그 흔적이에요. 시간이 흐르면서 많은 동사가 -ed를 붙이는 쉬운 방법으로 바뀌었지요.\n\n그런데 go, come, eat, have, see처럼 **아주 자주 쓰는 동사**는 사람들이 늘 입에 올리니 옛 모양이 그대로 남았어요. 그래서 불규칙 동사는 대부분 기초 동사예요. 거꾸로 말하면, 기초 동사의 과거형만 잘 익혀도 일상 대화의 과거 표현은 거의 해결돼요.\n\n중2에서 배우는 **현재완료**(have + 과거분사)에서는 동사의 세 번째 모양(go - went - **gone**)을 배워요. 그때를 위해 지금부터 원형과 과거형을 짝으로 소리 내어 익혀 두세요.',
    },
  ],

  faq: [
    {
      q: '과거형에는 왜 3인칭 단수 -s를 안 붙여요?',
      a: '일반동사의 과거형은 주어가 무엇이든 모양이 하나예요. I played, She played, They played처럼요. -s는 "3인칭 단수 + 현재"일 때만 붙여요. 다만 be동사는 과거에도 was와 were로 나뉘어요.',
    },
    {
      q: "didn't 뒤에는 왜 동사원형을 써요?",
      a: "didn't의 did가 이미 과거라는 표시를 했기 때문이에요. 과거 표시는 한 번이면 충분해서 뒤의 동사는 원형으로 돌아가요. 그래서 She didn't went가 아니라 She didn't go예요.",
    },
    {
      q: 'when, before, after가 이끄는 부분은 앞에 써도 되고 뒤에 써도 돼요?',
      a: '네, 둘 다 돼요. 앞에 쓰면 그 부분 끝에 쉼표를 찍어요. After I ate lunch, I took a nap. = I took a nap after I ate lunch. 뜻은 같아요.',
    },
  ],

  mistakes: [
    "didn't나 Did 뒤에 과거형을 쓰는 실수 — I didn't went (✕) → I didn't go (○)",
    '불규칙 동사에 -ed를 붙이는 실수 — goed, eated, buyed (✕) → went, ate, bought (○)',
    '자음을 하나 더 쓰는 것을 빠뜨리는 실수 — stoped, planed (✕) → stopped, planned (○)',
  ],

  gens: [
    {
      id: 'past-form',
      level: 1,
      title: '동사의 과거형 쓰기',
      make: function (R) {
        // [원형, 과거형, 종류, 문장]
        var verbs = [
          ['watch', 'watched', 'ed', 'I [[blank]] a soccer game on TV last night.'],
          ['visit', 'visited', 'ed', 'We [[blank]] the science museum last Sunday.'],
          ['help', 'helped', 'ed', 'Minsu [[blank]] his mom yesterday.'],
          ['like', 'liked', 'd', 'Jia [[blank]] the movie very much.'],
          ['dance', 'danced', 'd', 'They [[blank]] at the school festival.'],
          ['move', 'moved', 'd', 'My family [[blank]] to Daegu two years ago.'],
          ['study', 'studied', 'ied', 'Seojun [[blank]] for the test last night.'],
          ['cry', 'cried', 'ied', 'The baby [[blank]] all night.'],
          ['carry', 'carried', 'ied', 'Dad [[blank]] the heavy boxes.'],
          ['enjoy', 'enjoyed', 'ed', 'We [[blank]] the trip to Gyeongju.'],
          ['play', 'played', 'ed', 'Hayun [[blank]] badminton after school.'],
          ['stop', 'stopped', 'double', 'The rain [[blank]] in the afternoon.'],
          ['plan', 'planned', 'double', 'We [[blank]] a surprise party for Sua.'],
          ['drop', 'dropped', 'double', 'Doyun [[blank]] his phone on the way home.'],
          ['go', 'went', 'irr', 'I [[blank]] to the beach last summer.'],
          ['eat', 'ate', 'irr', 'We [[blank]] pizza for dinner yesterday.'],
          ['make', 'made', 'irr', 'Mom [[blank]] gimbap for our picnic.'],
          ['buy', 'bought', 'irr', 'Jiho [[blank]] a new cap last week.'],
          ['see', 'saw', 'irr', 'I [[blank]] a rainbow this morning.'],
          ['take', 'took', 'irr', 'She [[blank]] many pictures in Jeju.'],
          ['write', 'wrote', 'irr', 'Sua [[blank]] a letter to her grandma.'],
          ['have', 'had', 'irr', 'We [[blank]] a great time at the camp.'],
          ['come', 'came', 'irr', 'My cousin [[blank]] to my house yesterday.'],
          ['get', 'got', 'irr', 'I [[blank]] a gift from my friend.'],
          ['put', 'put', 'same', 'He [[blank]] the book on the desk an hour ago.'],
          ['read', 'read', 'same', 'I [[blank]] a funny story last night.'],
          ['cut', 'cut', 'same', 'Grandma [[blank]] the cake into eight pieces.'],
        ];
        var v = R.pick(verbs);
        var base = v[0], past = v[1], kind = v[2];
        var rule = {
          ed: base + '에는 -ed를 붙여요.',
          d: base + '처럼 e로 끝나는 동사에는 -d만 붙여요.',
          ied: base + '처럼 자음 + y로 끝나는 동사는 y를 i로 바꾸고 -ed를 붙여요.',
          double: base + '처럼 모음 하나 + 자음 하나로 끝나는 한 음절 동사는 마지막 자음을 하나 더 쓰고 -ed를 붙여요.',
          irr: '불규칙 동사: ' + base + ' → ' + past + '\n\n-ed를 붙이지 않고 모양이 바뀌어요.',
          same: '불규칙 동사: ' + base + ' → ' + past + '\n\n과거형이 원형과 모양이 같아요.',
        }[kind];
        var wrong = [];
        if (kind === 'irr' || kind === 'same') wrong.push({ a: base + (/e$/.test(base) ? 'd' : 'ed'), why: '불규칙 동사라서 -ed를 붙이지 않아요. 과거형: ' + past });
        if (kind === 'd') wrong.push({ a: base + 'ed', why: 'e로 끝나는 동사에는 -d만 붙여요.' });
        if (kind === 'ied') wrong.push({ a: base + 'ed', why: '자음 + y로 끝나는 동사는 y를 i로 바꾸고 -ed를 붙여요.' });
        if (kind === 'double') wrong.push({ a: base + 'ed', why: '모음 하나 + 자음 하나로 끝나는 한 음절 동사는 마지막 자음을 하나 더 써요.' });
        if (kind === 'ed' && /y$/.test(base)) wrong.push({ a: base.slice(0, -1) + 'ied', why: base + '는 모음 + y로 끝나요. 모음 + y면 -ed만 붙여요.' });
        return {
          type: 'short', check: 'text', concept: (kind === 'irr' || kind === 'same') ? 2 : 1,
          q: '괄호 안의 동사를 과거형으로 바꾸어 빈칸에 쓰세요.\n\n' + v[3] + ' (' + base + ')',
          answer: [past],
          wrong: wrong,
          explain: rule + '\n\n' + v[3].replace('[[blank]]', '**' + past + '**'),
        };
      },
    },
    {
      id: 'was-were',
      level: 1,
      title: 'be동사의 과거형 고르기',
      make: function (R) {
        // [주어, 과거형, 현재형]
        var subjects = [
          ['I', 'was', 'am'], ['He', 'was', 'is'], ['She', 'was', 'is'], ['Minsu', 'was', 'is'], ['The weather', 'was', 'is'],
          ['My grandma', 'was', 'is'], ['You', 'were', 'are'], ['We', 'were', 'are'], ['They', 'were', 'are'],
          ['My parents', 'were', 'are'], ['Jia and Hayun', 'were', 'are'], ['The cookies', 'were', 'are'],
        ];
        var rests = [
          ['very tired', 'yesterday'], ['at the library', 'last Saturday'], ['in Busan', 'last week'],
          ['sick', 'two days ago'], ['really happy', 'last night'],
        ];
        var s = R.pick(subjects);
        var r = R.pick(rests);
        if (s[0] === 'The weather') r = R.pick([['cold', 'yesterday'], ['hot', 'last week'], ['nice', 'last Saturday']]);
        if (s[0] === 'The cookies') r = R.pick([['delicious', 'yesterday'], ['on the table', 'last night']]);
        var other = s[1] === 'was' ? 'were' : 'was';
        var pick = R.choices(s[1], [other, s[2]], 3);
        var why = {};
        why[other] = s[1] === 'was'
          ? (s[0] === 'I' ? '주어가 I예요. I의 be동사 과거형은 was예요.' : '주어(' + s[0] + ')가 3인칭 단수예요. 과거형은 was예요.')
          : (s[0] === 'You' ? '주어가 you예요. you의 be동사 과거형은 were예요.' : '주어(' + s[0] + ')가 복수예요. 과거형은 were예요.');
        why[s[2]] = r[1] + '처럼 지난 때를 나타내는 말이 있으니 과거형을 써요.';
        var sentence = s[0] + ' [[blank]] ' + r[0] + ' ' + r[1] + '.';
        return {
          type: 'choice', concept: 0,
          q: '빈칸에 알맞은 말은 무엇일까요?\n\n' + sentence,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === s[1] ? '' : why[c]; }),
          explain: r[1] + '가 있으니 과거형이에요. ' + (s[1] === 'was' ? 'I와 3인칭 단수 주어의 be동사 과거형은 was예요.' : 'you와 복수 주어의 be동사 과거형은 were예요.') + '\n\n' + sentence.replace('[[blank]]', '**' + s[1] + '**'),
        };
      },
    },
    {
      id: 'past-neg-question',
      level: 2,
      title: '과거시제의 부정문·의문문 고르기',
      make: function (R) {
        // [주어, 3인칭 단수인가]
        var subjects = [
          ['I', false], ['You', false], ['We', false], ['They', false], ['My parents', false],
          ['He', true], ['She', true], ['Minsu', true], ['My brother', true], ['Our class', true],
        ];
        // [원형, 과거형, 3인칭 단수 현재형, 뒷말]
        var phrases = [
          ['go', 'went', 'goes', 'to the museum last Friday'],
          ['eat', 'ate', 'eats', 'lunch at noon yesterday'],
          ['play', 'played', 'plays', 'soccer after school yesterday'],
          ['watch', 'watched', 'watches', 'a movie last night'],
          ['buy', 'bought', 'buys', 'a gift for Mom last week'],
          ['visit', 'visited', 'visits', 'the zoo two weeks ago'],
          ['make', 'made', 'makes', 'cookies last weekend'],
        ];
        var s = R.pick(subjects);
        var v = R.pick(phrases);
        var mode = R.pick(['neg', 'q']);
        var S = s[0];
        var low = S === 'I' || S === 'Minsu' ? S : S.charAt(0).toLowerCase() + S.slice(1);
        var base = v[0], past = v[1], rest = v[3];
        var beNeg = (S === 'I' || s[1]) ? "wasn't" : "weren't";
        var beQ = (S === 'I' || s[1]) ? 'Was' : 'Were';
        var original = S + ' ' + past + ' ' + rest + '.';
        var correct, cands;
        if (mode === 'neg') {
          correct = S + " didn't " + base + ' ' + rest + '.';
          cands = [
            [S + " didn't " + past + ' ' + rest + '.', "didn't 뒤에는 동사원형(" + base + ')을 써요.'],
            [S + ' ' + (s[1] ? "doesn't" : "don't") + ' ' + base + ' ' + rest + '.', '지난 때의 일이에요. 현재 부정문이 아니라 과거 부정문 didn\'t를 써요.'],
            [S + ' ' + beNeg + ' ' + base + ' ' + rest + '.', "일반동사 과거 부정문에는 be동사가 아니라 didn't를 써요."],
            [S + ' not ' + past + ' ' + rest + '.', "동사 앞에 not만 쓰지 않아요. didn't + 동사원형으로 써요."],
          ];
        } else {
          correct = 'Did ' + low + ' ' + base + ' ' + rest + '?';
          cands = [
            ['Did ' + low + ' ' + past + ' ' + rest + '?', 'Did 뒤에는 동사원형(' + base + ')을 써요.'],
            [(s[1] ? 'Does ' : 'Do ') + low + ' ' + base + ' ' + rest + '?', '지난 때의 일이에요. 과거 의문문은 Did로 시작해요.'],
            [beQ + ' ' + low + ' ' + base + ' ' + rest + '?', '일반동사 과거 의문문에는 be동사가 아니라 Did를 써요.'],
          ];
        }
        var reason = {};
        cands.forEach(function (c) { reason[c[0]] = c[1]; });
        var pick = R.choices(correct, R.shuffle(cands).map(function (c) { return c[0]; }), 4);
        return {
          type: 'choice', concept: 3,
          q: '다음 문장을 ' + (mode === 'neg' ? '부정문' : '의문문') + '으로 바르게 바꾼 것은 무엇일까요?\n\n' + original,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: (mode === 'neg'
            ? "과거 부정문은 주어에 상관없이 didn't + 동사원형이에요. (" + past + ' → 원형 ' + base + ')'
            : '과거 의문문은 주어에 상관없이 Did + 주어 + 동사원형이에요. (' + past + ' → 원형 ' + base + ')') + '\n\n' + correct,
        };
      },
    },
  ],

  vocab: [
    { w: 'yesterday', m: '어제', ex: 'I was very busy yesterday.', exm: '나는 어제 무척 바빴어요.' },
    { w: 'last', m: '지난', ex: 'We went camping last weekend.', exm: '우리는 지난 주말에 캠핑을 갔어요.' },
    { w: 'ago', m: '~ 전에', ex: 'She moved here two years ago.', exm: '그녀는 2년 전에 이곳으로 이사 왔어요.' },
    { w: 'visit', m: '방문하다', ex: 'We visited our uncle in Gangneung.', exm: '우리는 강릉에 계신 삼촌 댁을 방문했어요.' },
    { w: 'arrive', m: '도착하다', ex: 'The bus arrived at nine.', exm: '버스는 9시에 도착했어요.' },
    { w: 'leave', m: '떠나다 (과거형 left)', ex: 'We left home early in the morning.', exm: '우리는 아침 일찍 집을 나섰어요.' },
    { w: 'diary', m: '일기', ex: 'I write in my diary every night.', exm: '나는 매일 밤 일기를 써요.' },
    { w: 'trip', m: '여행', ex: 'How was your trip to Jeju?', exm: '제주 여행은 어땠니?' },
    { w: 'museum', m: '박물관', ex: 'We saw old coins at the museum.', exm: '우리는 박물관에서 옛날 동전을 봤어요.' },
    { w: 'festival', m: '축제', ex: 'The school festival was really fun.', exm: '학교 축제는 정말 재미있었어요.' },
    { w: 'delicious', m: '맛있는', ex: 'The noodles were delicious.', exm: '국수가 맛있었어요.' },
    { w: 'tired', m: '피곤한', ex: 'I was tired after the long walk.', exm: '오래 걸은 뒤에 나는 피곤했어요.' },
    { w: 'finish', m: '끝내다', ex: 'Did you finish your homework?', exm: '너는 숙제를 끝냈니?' },
    { w: 'take a picture', m: '사진을 찍다', ex: 'We took a picture in front of the tower.', exm: '우리는 탑 앞에서 사진을 찍었어요.' },
    { w: 'gift', m: '선물', ex: 'I bought a gift for my sister.', exm: '나는 여동생에게 줄 선물을 샀어요.' },
  ],
});
