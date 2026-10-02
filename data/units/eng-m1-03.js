/* 중1 영어 · 장면 묘사하기 (현재진행형) */
Tutor.registerUnit({
  id: 'eng-m1-03',
  course: 'eng-m1',
  title: '장면 묘사하기 (현재진행형)',
  summary: '현재진행형과 There is/are, 수량을 나타내는 말을 써서 사진이나 그림 속 장면을 묘사해요.',
  goals: [
    '현재진행형(be + 동사-ing)의 긍정문·부정문·의문문을 만들 수 있어요.',
    '늘 하는 일(현재형)과 지금 하고 있는 일(현재진행형)을 구별해 쓸 수 있어요.',
    'There is/are와 셀 수 있는·셀 수 없는 명사에 맞는 수량 표현을 쓸 수 있어요.',
    '사진 속 장면을 묘사하는 글을 읽고 내용을 파악할 수 있어요.',
  ],
  standards: [],

  concepts: [
    {
      title: '현재진행형 만들기 (be + 동사-ing)',
      body: '**현재진행형**은 "지금 ~하고 있다"는 뜻으로, 말하는 순간에 하고 있는 일을 나타내요.\n\n**am/are/is + 동사-ing**\n\nI **am reading** a book. / They **are playing** soccer. / She **is cooking** now.\n\n동사에 -ing를 붙이는 규칙은 이래요.\n\n| 동사의 끝 | 규칙 | 예 |\n|---|---|---|\n| 대부분 | -ing | play → playing, read → reading |\n| 발음하지 않는 e | e를 빼고 -ing | make → making, ride → riding |\n| ie | ie를 y로 바꾸고 -ing | lie → lying, tie → tying |\n| 모음 하나 + 자음 하나 (한 음절) | 자음을 하나 더 쓰고 -ing | run → running, swim → swimming, sit → sitting |\n\n> 💡 be동사는 주어에 맞게 골라요(I am, you/we/they are, he/she/it is). 1단원에서 배운 규칙 그대로예요.',
      easy: '현재진행형은 "지금 이 순간"을 찍은 사진이에요. 사진 속 사람은 무언가를 하는 중이지요.\n\n"하는 중" = **be동사 + -ing**\n\n- 민수는 달리는 중이에요. → Minsu **is running**.\n- 우리는 노래하는 중이에요. → We **are singing**.\n\nbe동사가 "~이다"를, -ing가 "~하는 중"을 맡아요. 둘 중 하나라도 빠지면 안 돼요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nLook! The children [[blank]] in the pool.',
        choices: ['are swimming', 'are swiming', 'is swimming'],
        answer: 0,
        why: ['', 'swim은 모음 하나 + 자음 하나로 끝나는 한 음절 동사라서 m을 하나 더 써요: swimming', '주어 The children은 복수예요. are를 써요.'],
        explain: 'The children은 복수라서 are를 쓰고, swim은 m을 하나 더 써서 swimming이에요. The children are swimming in the pool.',
      },
    },
    {
      title: '현재진행형의 부정문과 의문문',
      body: '현재진행형에는 be동사가 있으니, 부정문과 의문문도 **be동사 규칙**을 그대로 따라요.\n\n- 부정문: be동사 뒤에 **not** → She **isn\'t sleeping**. / They **aren\'t playing**.\n- 의문문: **be동사를 주어 앞으로** → **Are they playing**? / **Is he studying**?\n\n| 질문 | 대답 |\n|---|---|\n| Is she sleeping? | Yes, she is. / No, she isn\'t. |\n| Are they playing? | Yes, they are. / No, they aren\'t. |\n\n> ⚠️ do/does는 쓰지 않아요. Does she sleeping? (✕) → Is she sleeping? (○)\n\n의문사를 쓰려면 맨 앞에 두면 돼요: **What are you doing?** — I\'m drawing a picture.',
      easy: '현재진행형 문장 안에는 be동사가 숨어 있어요. 그래서 부정문·의문문을 만들 때 그 be동사만 움직이면 돼요.\n\n- 부정: is 뒤에 not을 붙이기 → is not sleeping\n- 질문: is를 맨 앞으로 데려오기 → Is she sleeping?\n\n-ing가 붙은 동사는 그대로 두어요.',
      check: {
        type: 'ox',
        q: '"Are you watching TV?"에 "아니요"라고 대답할 때는 "No, I\'m not."이라고 해요.',
        answer: true,
        explain: 'Are you ~? 로 물었으니 I am으로 대답해요. 부정은 No, I\'m not.이에요.',
      },
    },
    {
      title: '현재형과 현재진행형의 차이',
      body: '두 시제는 쓰임이 달라요.\n\n| | 현재형 | 현재진행형 |\n|---|---|---|\n| 뜻 | 늘 하는 일, 습관, 사실 | 지금 하고 있는 일 |\n| 함께 쓰는 말 | every day, usually, on Sundays | now, right now, Look!, Listen! |\n| 예 | He **plays** soccer every Saturday. | Look! He **is playing** soccer now. |\n\n문장 안의 **때를 나타내는 말**이 가장 좋은 힌트예요. every day가 있으면 현재형, now나 Look!이 있으면 현재진행형을 떠올려요.\n\n> ⚠️ like, love, know, want처럼 **마음·상태**를 나타내는 동사는 보통 진행형으로 쓰지 않아요. I know the answer. (I am knowing ✕)',
      easy: '현재형은 "동영상의 반복 재생"이고, 현재진행형은 "지금 이 순간의 사진"이에요.\n\n- "나는 매일 아침 우유를 마셔요." → 날마다 반복되는 일 → I **drink** milk every morning.\n- "나는 지금 우유를 마시는 중이에요." → 지금 이 순간 → I **am drinking** milk now.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nMy dad [[blank]] to work every day.',
        choices: ['walks', 'is walking', 'walking'],
        answer: 0,
        why: ['', 'every day는 날마다 반복되는 일이에요. 늘 하는 일은 현재형으로 써요.', '-ing만으로는 동사가 되지 않아요. 그리고 every day가 있으니 현재형을 써요.'],
        explain: 'every day(매일)는 습관을 나타내므로 현재형을 써요. 주어가 3인칭 단수라서 walks예요.',
      },
    },
    {
      title: 'There is / There are',
      body: '"~이 있다"라고 말할 때는 **There is / There are**를 써요. 여기서 there는 "거기"라는 뜻이 아니라 문장을 여는 말이에요.\n\n- **There is + 단수 명사 / 셀 수 없는 명사**: There **is** a cat on the sofa. / There **is** some milk in the glass.\n- **There are + 복수 명사**: There **are** two cats on the sofa.\n\nbe동사는 **뒤에 오는 명사**에 맞춰요.\n\n| | 문장 |\n|---|---|\n| 부정문 | There **isn\'t** a bank near here. / There **aren\'t** any chairs. |\n| 의문문 | **Is there** a bank near here? — Yes, there is. / No, there isn\'t. |\n| | **Are there** any chairs? — Yes, there are. / No, there aren\'t. |\n\n줄임말 There\'s도 자주 써요: There\'s a cat on the sofa.',
      easy: 'There is/are는 "여기 봐, ~이 있어!" 하고 손가락으로 가리키는 말이에요.\n\n가리키는 것이 하나면 is, 여럿이면 are예요.\n\n- 고양이 한 마리 → There **is** a cat.\n- 고양이 세 마리 → There **are** three cats.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nThere [[blank]] three apples in the basket.',
        choices: ['are', 'is', 'am'],
        answer: 0,
        why: ['', 'be동사는 뒤의 명사에 맞춰요. three apples는 복수라서 are예요.', 'am은 주어가 I일 때만 써요.'],
        explain: '뒤에 오는 three apples가 복수이므로 There are를 써요.',
      },
    },
    {
      title: '셀 수 있는 명사, 셀 수 없는 명사와 수량 표현',
      body: '**셀 수 있는 명사**는 하나, 둘 셀 수 있어서 a/an을 붙이거나 복수형(-s)을 만들어요: an apple, two chairs.\n\n**셀 수 없는 명사**는 모양이 정해져 있지 않거나(water, milk, bread, rice), 덩어리로 생각하는 것(money, homework)이에요. a/an을 붙이지 않고 복수형도 없어요.\n\n수량을 나타내는 말은 명사의 종류에 따라 골라요.\n\n| 뜻 | 셀 수 있는 명사(복수) | 셀 수 없는 명사 |\n|---|---|---|\n| 많은 | **many** books | **much** water |\n| 조금 있는 | **a few** books | **a little** water |\n| 둘 다 쓰는 말 | a lot of, some, any | a lot of, some, any |\n\n- **some**은 주로 긍정문: There are **some** eggs.\n- **any**는 주로 부정문·의문문: There aren\'t **any** eggs. / Are there **any** eggs?\n\n> 💡 much는 주로 부정문·의문문에 써요. 긍정문에서 "많은"은 a lot of를 더 많이 써요: I drink a lot of water.',
      easy: '사과는 한 개, 두 개 셀 수 있지만, 물은 "물 하나, 물 둘"이라고 세지 않지요? 물은 컵에 담아 "물 한 컵"이라고 세요.\n\n- 셀 수 있는 것(사과, 의자, 책) → many, a few\n- 셀 수 없는 것(물, 우유, 돈) → much, a little\n\n짝 맞추기로 기억해요: **many·a few는 개수**, **much·a little은 양**이에요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nThere isn\'t [[blank]] juice in the bottle.',
        choices: ['much', 'many', 'a few'],
        answer: 0,
        why: ['', 'many는 셀 수 있는 명사의 복수형 앞에 써요. juice는 셀 수 없어요.', 'a few는 셀 수 있는 명사 앞에 써요. juice는 셀 수 없어요.'],
        explain: 'juice는 셀 수 없는 명사이므로 much를 써요. There isn\'t much juice in the bottle.(병에 주스가 많지 않아요.)',
      },
    },
    {
      title: '사진 속 장면을 묘사하는 글',
      body: '사진이나 그림을 묘사하는 글은 보통 이렇게 써요.\n\n1. **장소와 분위기**: This is a picture of a park. It is a sunny day.\n2. **무엇이 있는지** — There is/are: There are many trees. There is a small pond.\n3. **사람들이 하고 있는 일** — 현재진행형: A boy is flying a kite. Two girls are riding bikes.\n4. **위치를 나타내는 말**로 자세하게: next to(~ 옆에), behind(~ 뒤에), in front of(~ 앞에), under(~ 아래에)\n\n사진 속은 "지금 이 순간"이므로 사람들의 동작은 현재진행형으로 써요. 글을 읽을 때는 "누가 — 무엇을 하고 있는지"를 짝지어 표시하면 내용이 잘 정리돼요.',
      easy: '사진 묘사는 친구에게 전화로 사진을 설명해 주는 것과 같아요. 친구는 사진을 볼 수 없으니 차례대로 알려 줘야 해요.\n\n"여기는 공원이야 → 나무랑 연못이 있어 → 남자아이가 연을 날리고 있어."\n\n있는 것은 There is/are, 하고 있는 일은 be + -ing로 말해요.',
      check: {
        type: 'choice',
        q: '사진 속 사람이 지금 하고 있는 일을 묘사하는 문장으로 알맞은 것은 무엇일까요?',
        choices: ['A woman is reading a book under the tree.', 'A woman reads a book every night.', 'There is a woman reading every night.'],
        answer: 0,
        why: ['', 'every night는 늘 하는 습관이에요. 사진 속 지금의 동작은 현재진행형으로 써요.', 'every night는 사진 속 한순간과 맞지 않아요. 지금의 동작은 현재진행형으로 써요.'],
        explain: '사진 속 동작은 지금 이 순간의 일이므로 현재진행형(is reading)으로 묘사해요.',
      },
    },
  ],

  examples: [
    {
      q: '다음 문장을 현재진행형으로 바꾼 뒤, 다시 부정문과 의문문으로 바꾸어 보세요.\n\nHe swims in the pool.',
      steps: [
        '현재진행형은 be동사 + 동사-ing예요. 주어 He에는 is를 써요.',
        'swim은 모음 하나 + 자음 하나로 끝나는 한 음절 동사라서 m을 하나 더 쓰고 -ing를 붙여요: swimming → He is swimming in the pool.',
        '부정문은 is 뒤에 not을 붙여요: He isn\'t swimming in the pool.',
        '의문문은 Is를 주어 앞으로 옮겨요: Is he swimming in the pool?',
      ],
      answer: "He is swimming in the pool. / He isn't swimming in the pool. / Is he swimming in the pool?",
    },
    {
      q: '빈칸에 many와 much 가운데 알맞은 말을 쓰세요.\n\n(1) There aren\'t (   ) people in the park.\n(2) I don\'t have (   ) money.',
      steps: [
        '(1) people(사람들)은 셀 수 있는 명사의 복수형이에요. 그래서 many를 써요.',
        '(2) money(돈)는 셀 수 없는 명사예요. 그래서 much를 써요.',
      ],
      answer: '(1) many (2) much',
    },
  ],

  terms: [
    { term: '현재진행형', def: '"지금 ~하고 있다"는 뜻의 시제예요. am/are/is + 동사-ing로 써요. 예: She **is singing**.' },
    { term: '동사-ing', def: '동사원형에 -ing를 붙인 꼴이에요. 진행형에서 "~하는 중"이라는 뜻을 나타내요. 예: running, making, lying' },
    { term: 'There is/are', def: '"~이 있다"라는 뜻의 표현이에요. 뒤에 단수·셀 수 없는 명사가 오면 is, 복수 명사가 오면 are를 써요.' },
    { term: '셀 수 있는 명사', def: '하나, 둘 셀 수 있어서 a/an이나 복수형(-s)을 쓸 수 있는 명사예요. 예: apple, chair, student' },
    { term: '셀 수 없는 명사', def: '하나, 둘 셀 수 없어서 a/an을 붙이지 않고 복수형도 없는 명사예요. 예: water, milk, bread, money' },
    { term: '수량 표현', def: '얼마나 많은지 나타내는 말이에요. 셀 수 있는 명사에는 many, a few, 셀 수 없는 명사에는 much, a little을 써요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', concept: 0,
      q: '동사 run의 -ing 형을 쓰세요.',
      answer: ['running'],
      wrong: [
        { a: 'runing', why: 'run은 모음 하나(u) + 자음 하나(n)로 끝나는 한 음절 동사예요. n을 하나 더 써서 running이에요.' },
        { a: 'runeing', why: 'run에는 e가 없어요. n을 하나 더 쓰고 -ing를 붙여요.' },
      ],
      explain: 'run은 "모음 하나 + 자음 하나"로 끝나므로 마지막 자음 n을 하나 더 쓰고 -ing를 붙여요: running',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '동사원형과 -ing 형을 **잘못** 짝지은 것은 무엇일까요?',
      choices: ['sit — siting', 'make — making', 'swim — swimming', 'lie — lying'],
      answer: 0,
      why: [
        '',
        'make처럼 발음하지 않는 e로 끝나면 e를 빼고 -ing를 붙여요. 바르게 짝지었어요.',
        'swim은 m을 하나 더 써요. 바르게 짝지었어요.',
        'ie로 끝나는 동사는 ie를 y로 바꾸고 -ing를 붙여요. 바르게 짝지었어요.',
      ],
      explain: 'sit은 모음 하나 + 자음 하나로 끝나므로 t를 하나 더 써서 **sitting**이에요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '다음 문장을 부정문으로 바르게 바꾼 것은 무엇일까요?\n\nThey are playing soccer.',
      choices: ["They aren't playing soccer.", "They don't playing soccer.", "They aren't play soccer.", 'They not playing soccer.'],
      answer: 0,
      why: [
        '',
        "현재진행형에는 be동사가 있으니 don't가 아니라 be동사 뒤에 not을 붙여요.",
        '부정문에서도 -ing는 그대로 둬요. playing이에요.',
        'be동사를 빼면 안 돼요. are 뒤에 not을 붙여요.',
      ],
      explain: '현재진행형의 부정문은 be동사 뒤에 not을 붙여요. They are not playing → They aren\'t playing soccer.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: '"Is she reading a book?"에 "네"라고 짧게 대답하면 "Yes, she does."예요.',
      answer: false,
      explain: 'Is로 물었으니 be동사로 대답해요. 바른 대답은 Yes, she is.예요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nShh! The baby [[blank]] now.',
      choices: ['is sleeping', 'sleeps', 'sleep', 'are sleeping'],
      answer: 0,
      why: [
        '',
        'now(지금)가 있어요. 지금 하고 있는 일은 현재진행형으로 써요.',
        '주어가 3인칭 단수이고, now가 있으니 현재진행형으로 써요.',
        'The baby는 한 명이라서 are가 아니라 is를 써요.',
      ],
      explain: 'now가 있으니 지금 하는 일이에요. The baby에 맞게 is sleeping이에요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nThere [[blank]] two cats under the table.',
      choices: ['are', 'is', 'am'],
      answer: 0,
      why: ['', 'be동사는 뒤의 명사에 맞춰요. two cats는 복수라서 are예요.', 'am은 주어가 I일 때만 써요.'],
      explain: 'two cats가 복수이므로 There are를 써요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nWe don\'t have [[blank]] milk.',
      choices: ['much', 'many', 'a few', 'two'],
      answer: 0,
      why: [
        '',
        'many는 셀 수 있는 명사의 복수형 앞에 써요. milk는 셀 수 없어요.',
        'a few는 셀 수 있는 명사 앞에 써요. milk에는 a little을 써요.',
        'milk는 하나, 둘 셀 수 없어서 수를 바로 붙이지 않아요.',
      ],
      explain: 'milk는 셀 수 없는 명사라서 much를 써요. We don\'t have much milk.(우유가 많지 않아요.)',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 2,
      q: '다음 중 문장이 **어색한** 것은 무엇일까요?',
      choices: ['I am knowing the answer.', 'She plays the guitar every day.', 'Look! He is running fast.', 'They usually eat lunch at noon.'],
      answer: 0,
      why: [
        '',
        'every day와 현재형 plays가 잘 어울려요. 바른 문장이에요.',
        'Look!과 현재진행형이 잘 어울려요. 바른 문장이에요.',
        'usually와 현재형 eat이 잘 어울려요. 바른 문장이에요.',
      ],
      hint: '마음·상태를 나타내는 동사가 있는지 보세요.',
      explain: 'know(알다)는 상태를 나타내는 동사라서 보통 진행형으로 쓰지 않아요. I know the answer.가 바른 문장이에요.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 1,
      q: '"그들은 지금 농구를 하고 있니?"라는 뜻이 되게 순서대로 놓으세요.',
      choices: ['Are', 'they', 'playing', 'basketball', 'now?'],
      answer: [0, 1, 2, 3, 4],
      hint: '현재진행형 의문문은 be동사가 맨 앞에 와요.',
      explain: '현재진행형 의문문은 "be동사 + 주어 + 동사-ing ~?" 순서예요. Are they playing basketball now?',
    },
    {
      id: 'p10', level: 2, type: 'short', concept: 4,
      q: '빈칸에 some과 any 가운데 알맞은 말을 쓰세요.\n\nI don\'t have [[blank]] money with me.',
      answer: ['any'],
      wrong: [{ a: 'some', why: '부정문(don\'t)이에요. some은 주로 긍정문에, any는 부정문·의문문에 써요.' }],
      hint: '문장이 긍정문인지 부정문인지 먼저 보세요.',
      explain: 'don\'t가 있는 부정문이므로 any를 써요. I don\'t have any money with me.(나는 지금 돈이 하나도 없어요.)',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: Is there a bank near here?\nB: No, [[blank]]. But there is one near the station.',
      choices: ["there isn't", "it isn't", "there aren't", "there doesn't"],
      answer: 0,
      why: [
        '',
        'Is there ~? 로 물으면 there로 대답해요.',
        'a bank는 단수예요. aren\'t가 아니라 isn\'t를 써요.',
        'There is 문장에는 be동사가 있으니 doesn\'t를 쓰지 않아요.',
      ],
      explain: 'Is there ~? 에는 Yes, there is. / No, there isn\'t.로 대답해요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 5,
      q: '글을 읽고 물음에 답하세요.\n\nThis is a picture of a park. It is a sunny day, and there are many people. A man is walking his dog. Two girls are riding bikes. There is a small pond, and some ducks are swimming in it. A boy is sitting on a bench next to the pond. He is eating ice cream.\n\nWhat is the boy doing?',
      choices: ['He is eating ice cream.', 'He is riding a bike.', 'He is walking his dog.', 'He is swimming in the pond.'],
      answer: 0,
      why: [
        '',
        '자전거를 타고 있는 사람은 두 여자아이예요.',
        '개를 산책시키는 사람은 남자 어른(A man)이에요.',
        '연못에서 헤엄치고 있는 것은 오리들이에요.',
      ],
      explain: 'A boy is sitting on a bench … He is eating ice cream.이라고 했어요. 남자아이는 벤치에 앉아 아이스크림을 먹고 있어요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 2,
      q: '(A), (B)에 들어갈 말로 바르게 짝지은 것은 무엇일까요?\n\n(A) My sister ___ to music every night.\n(B) Shh! She ___ to music now.',
      choices: ['listens — is listening', 'is listening — listens', 'listens — listens', 'listen — is listening'],
      answer: 0,
      why: [
        '',
        '거꾸로예요. every night(습관)는 현재형, now(지금)는 현재진행형이에요.',
        '(B)에는 now가 있어요. 지금 하고 있는 일은 현재진행형으로 써요.',
        'My sister는 3인칭 단수예요. listen에 -s를 붙여 listens로 써요.',
      ],
      hint: '두 문장에서 때를 나타내는 말을 찾아보세요.',
      explain: '(A)는 every night(매일 밤)의 습관이므로 현재형 listens, (B)는 now(지금)의 일이므로 현재진행형 is listening이에요.',
    },
    {
      id: 'a2', level: 3, type: 'short', concept: 0,
      q: '다음 문장에서 **틀린 낱말 하나**를 찾아 바르게 고쳐 쓰세요. (고친 낱말만 쓰세요)\n\nMy grandpa is siting on the sofa.',
      answer: ['sitting'],
      wrong: [
        { a: 'sit', why: 'be동사 is 뒤에는 동사-ing를 써서 진행형을 만들어요. sit을 원형으로 쓰면 안 돼요.' },
        { a: 'sits', why: 'is가 있으니 진행형(is + -ing)이에요. sit의 -ing 형을 써요.' },
      ],
      hint: 'sit은 모음 하나 + 자음 하나로 끝나요.',
      explain: 'sit은 t를 하나 더 써서 sitting이에요. My grandpa is sitting on the sofa.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '(A), (B)에 들어갈 말로 바르게 짝지은 것은 무엇일까요?\n\nI have (A) ___ cookies and (B) ___ juice. Let\'s share them.',
      choices: ['a few — a little', 'a little — a few', 'a few — a few', 'a little — a little'],
      answer: 0,
      why: [
        '',
        '거꾸로예요. cookies는 셀 수 있고 juice는 셀 수 없어요.',
        'juice는 셀 수 없는 명사예요. a few가 아니라 a little을 써요.',
        'cookies는 셀 수 있는 명사의 복수형이에요. a little이 아니라 a few를 써요.',
      ],
      hint: 'cookies와 juice 가운데 어느 것을 하나, 둘 셀 수 있을까요?',
      explain: 'cookies는 셀 수 있으므로 a few, juice는 셀 수 없으므로 a little을 써요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      q: '다음 중 문장이 **바른** 것은 무엇일까요?',
      choices: [
        'There is some bread on the plate.',
        'There are much water in the bottle.',
        'There is three pencils in my bag.',
        'There are a cat on the roof.',
      ],
      answer: 0,
      why: [
        '',
        'water는 셀 수 없는 명사라서 There is를 써요. 그리고 긍정문에서는 much보다 a lot of를 많이 써요.',
        'three pencils는 복수라서 There are를 써요.',
        'a cat은 단수라서 There is를 써요.',
      ],
      explain: 'bread는 셀 수 없는 명사라서 단수 취급하여 There is를 써요. 셀 수 없는 명사 앞에 some을 쓸 수 있어요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 5,
      q: '공원 사진을 묘사하는 글에 들어가기에 알맞지 **않은** 문장은 무엇일까요?',
      choices: ['I usually get up at seven.', 'A girl is flying a kite.', 'There are two big trees behind her.', 'Some children are playing on the grass.'],
      answer: 0,
      why: [
        '',
        '사진 속 사람의 지금 동작을 현재진행형으로 묘사했어요. 알맞은 문장이에요.',
        'There are로 사진 속에 있는 것을 말했어요. 알맞은 문장이에요.',
        '사진 속 아이들의 동작을 현재진행형으로 묘사했어요. 알맞은 문장이에요.',
      ],
      explain: 'I usually get up at seven.은 글쓴이의 습관이라 공원 사진의 장면과 관계가 없어요.',
    },
  ],

  deeper: [
    {
      title: '셀 수 없는 명사는 어떻게 셀까?',
      body: '물이나 빵은 하나, 둘 셀 수 없지만, 담는 그릇이나 자른 모양을 단위로 쓰면 셀 수 있어요.\n\n| 표현 | 뜻 |\n|---|---|\n| a glass of water / milk | 물·우유 한 잔 |\n| a bowl of rice | 밥 한 그릇 |\n| a slice of bread / cheese | 빵·치즈 한 조각(얇게 썬 것) |\n| a piece of cake / paper | 케이크 한 조각, 종이 한 장 |\n| a bottle of juice | 주스 한 병 |\n\n둘 이상이면 단위 쪽을 복수로 바꿔요: two glasses of milk, three slices of bread. milk나 bread에는 -s를 붙이지 않는 것이 핵심이에요.',
    },
  ],

  faq: [
    {
      q: '현재형이랑 현재진행형은 뭐가 달라요?',
      a: '현재형은 늘 하는 일·습관·사실(I play soccer every Sunday.)을, 현재진행형은 말하는 지금 하고 있는 일(I am playing soccer now.)을 말해요. every day, usually가 있으면 현재형, now, Look!이 있으면 현재진행형을 떠올려요.',
    },
    {
      q: 'There is 뒤에 two apples가 오면 왜 are로 바꿔요?',
      a: 'There is/are 문장에서 be동사는 뒤에 오는 명사에 맞춰요. 명사가 단수(a cat)나 셀 수 없는 것(some milk)이면 is, 복수(two apples)면 are예요.',
    },
    {
      q: 'a few랑 few는 같은 말이에요?',
      a: '뜻이 달라요. a few는 "조금 있는"(긍정적), few는 "거의 없는"(부정적)이에요. I have a few friends.는 친구가 몇 명 있다는 뜻이고, I have few friends.는 친구가 거의 없다는 뜻이에요. a little과 little도 같은 관계예요.',
    },
  ],

  mistakes: [
    '현재진행형에서 be동사를 빼먹는 실수 — She reading a book. (✕) → She is reading a book. (○)',
    '현재진행형의 부정문·의문문에 do/does를 쓰는 실수 — Does he sleeping? (✕) → Is he sleeping? (○)',
    '셀 수 없는 명사에 many나 -s를 붙이는 실수 — many waters (✕) → a lot of water, much water (○)',
  ],

  gens: [
    {
      id: 'ing-form',
      level: 1,
      title: '동사의 -ing 형 쓰기',
      make: function (R) {
        // [원형, -ing, 규칙, 문장]
        var verbs = [
          ['make', 'making', 'e', 'Look! Jia is [[blank]] a sandwich.'],
          ['ride', 'riding', 'e', 'Two boys are [[blank]] their bikes.'],
          ['write', 'writing', 'e', 'Seojun is [[blank]] a letter now.'],
          ['dance', 'dancing', 'e', 'The girls are [[blank]] on the stage.'],
          ['bake', 'baking', 'e', 'Mom is [[blank]] cookies in the kitchen.'],
          ['take', 'taking', 'e', 'Hayun is [[blank]] pictures of the flowers.'],
          ['smile', 'smiling', 'e', 'Everyone in the picture is [[blank]].'],
          ['run', 'running', 'double', 'The dog is [[blank]] after the ball.'],
          ['swim', 'swimming', 'double', 'Some ducks are [[blank]] in the pond.'],
          ['sit', 'sitting', 'double', 'A man is [[blank]] on the bench.'],
          ['cut', 'cutting', 'double', 'Dad is [[blank]] the watermelon.'],
          ['stop', 'stopping', 'double', 'Look! The bus is [[blank]] at the corner.'],
          ['shop', 'shopping', 'double', 'We are [[blank]] for new shoes.'],
          ['put', 'putting', 'double', 'Minsu is [[blank]] the books on the shelf.'],
          ['lie', 'lying', 'ie', 'The cat is [[blank]] on the sofa.'],
          ['tie', 'tying', 'ie', 'Doyun is [[blank]] his shoes.'],
          ['play', 'playing', 'plain', 'The kids are [[blank]] tag in the yard.'],
          ['read', 'reading', 'plain', 'Grandpa is [[blank]] a newspaper.'],
          ['study', 'studying', 'plain', 'Sua is [[blank]] for the test.'],
          ['watch', 'watching', 'plain', 'They are [[blank]] a movie.'],
          ['draw', 'drawing', 'plain', 'Jiho is [[blank]] a map.'],
          ['fly', 'flying', 'plain', 'A girl is [[blank]] a kite.'],
          ['rain', 'raining', 'plain', 'Take your umbrella. It is [[blank]] now.'],
        ];
        var v = R.pick(verbs);
        var base = v[0], ing = v[1], kind = v[2];
        var rule = {
          e: base + '처럼 발음하지 않는 e로 끝나는 동사는 e를 빼고 -ing를 붙여요.',
          double: base + '처럼 모음 하나 + 자음 하나로 끝나는 한 음절 동사는 마지막 자음을 하나 더 쓰고 -ing를 붙여요.',
          ie: base + '처럼 ie로 끝나는 동사는 ie를 y로 바꾸고 -ing를 붙여요.',
          plain: base + '에는 -ing만 붙이면 돼요.',
        }[kind];
        var wrong = [];
        if (kind === 'e') wrong.push({ a: base + 'ing', why: '발음하지 않는 e는 빼고 -ing를 붙여요.' });
        if (kind === 'double') wrong.push({ a: base + 'ing', why: '모음 하나 + 자음 하나로 끝나는 한 음절 동사는 마지막 자음을 하나 더 써요.' });
        if (kind === 'ie') wrong.push({ a: base + 'ing', why: 'ie로 끝나는 동사는 ie를 y로 바꾸고 -ing를 붙여요.' });
        if (kind === 'plain' && /y$/.test(base)) wrong.push({ a: base.slice(0, -1) + 'ing', why: 'y는 그대로 두고 -ing를 붙여요. y를 빼지 않아요.' });
        return {
          type: 'short', check: 'text', concept: 0,
          q: '괄호 안의 동사를 -ing 형으로 바꾸어 빈칸에 쓰세요.\n\n' + v[3] + ' (' + base + ')',
          answer: [ing],
          wrong: wrong,
          explain: rule + '\n\n' + v[3].replace('[[blank]]', '**' + ing + '**'),
        };
      },
    },
    {
      id: 'there-be',
      level: 1,
      title: 'There is / There are 고르기',
      make: function (R) {
        // [평서문의 명사, 의문문의 명사, 장소, 'is'|'are', 종류]
        var items = [
          ['a cat', 'a cat', 'under the table', 'is', 'one'],
          ['an old piano', 'a piano', 'in the living room', 'is', 'one'],
          ['a big tree', 'a big tree', 'in front of the school', 'is', 'one'],
          ['a clock', 'a clock', 'on the wall', 'is', 'one'],
          ['a bakery', 'a bakery', 'near my house', 'is', 'one'],
          ['two dogs', 'any dogs', 'in the yard', 'are', 'many'],
          ['many books', 'any books', 'on the shelf', 'are', 'many'],
          ['five chairs', 'any chairs', 'in the room', 'are', 'many'],
          ['some cookies', 'any cookies', 'in the jar', 'are', 'many'],
          ['three students', 'any students', 'in the gym', 'are', 'many'],
          ['a lot of people', 'many people', 'in the park', 'are', 'many'],
          ['some milk', 'any milk', 'in the glass', 'is', 'unc'],
          ['a lot of snow', 'much snow', 'on the road', 'is', 'unc'],
          ['some bread', 'any bread', 'on the plate', 'is', 'unc'],
          ['a little juice', 'any juice', 'in the bottle', 'is', 'unc'],
        ];
        var it = R.pick(items);
        var ask = R.bool();
        var correct = it[3];
        var reason = {
          one: '뒤에 오는 명사가 단수(하나)예요.',
          many: '뒤에 오는 명사가 복수(여럿)예요.',
          unc: '뒤에 오는 명사가 셀 수 없는 명사라서 단수로 취급해요.',
        }[it[4]];
        var cap = function (w) { return w.charAt(0).toUpperCase() + w.slice(1); };
        var opts = ask ? ['Is', 'Are', 'Am'] : ['is', 'are', 'am'];
        var right = ask ? cap(correct) : correct;
        var pick = R.choices(right, opts.filter(function (o) { return o !== right; }), 3);
        var full = ask
          ? right + ' there ' + it[1] + ' ' + it[2] + '?'
          : 'There ' + right + ' ' + it[0] + ' ' + it[2] + '.';
        var whyOf = function (c) {
          if (c === right) return '';
          if (/^am$/i.test(c)) return 'am은 주어가 I일 때만 써요. There 문장에는 is나 are를 써요.';
          return correct === 'is'
            ? 'be동사는 뒤의 명사에 맞춰요. ' + reason + ' 그래서 is예요.'
            : 'be동사는 뒤의 명사에 맞춰요. ' + reason + ' 그래서 are예요.';
        };
        return {
          type: 'choice', concept: 3,
          q: '빈칸에 알맞은 말은 무엇일까요?\n\n' + (ask
            ? '[[blank]] there ' + it[1] + ' ' + it[2] + '?'
            : 'There [[blank]] ' + it[0] + ' ' + it[2] + '.'),
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(whyOf),
          explain: reason + ' 그래서 ' + (ask ? (correct === 'is' ? 'Is there' : 'Are there') : (correct === 'is' ? 'There is' : 'There are')) + '를 써요.\n\n' + full,
        };
      },
    },
    {
      id: 'countable',
      level: 1,
      title: '셀 수 있는 명사와 셀 수 없는 명사 구별하기',
      make: function (R) {
        var cnt = [
          ['apple', 'apples'], ['chair', 'chairs'], ['egg', 'eggs'], ['cookie', 'cookies'], ['pencil', 'pencils'],
          ['bottle', 'bottles'], ['coin', 'coins'], ['sandwich', 'sandwiches'], ['banana', 'bananas'], ['tree', 'trees'],
          ['student', 'students'], ['box', 'boxes'], ['dish', 'dishes'],
        ];
        var unc = [
          ['water', 'a glass of water'], ['milk', 'a glass of milk'], ['bread', 'a slice of bread'], ['rice', 'a bowl of rice'],
          ['money', ''], ['juice', 'a bottle of juice'], ['sugar', 'a spoonful of sugar'], ['cheese', 'a slice of cheese'], ['homework', ''],
        ];
        var findUnc = R.bool();
        var correct, wrongs, why = {}, explain;
        if (findUnc) {
          var u = R.pick(unc);
          var cs = R.sample(cnt, 3);
          correct = u[0];
          wrongs = cs.map(function (c) { return c[0]; });
          cs.forEach(function (c) { why[c[0]] = c[0] + ' — 하나, 둘 셀 수 있어요(two ' + c[1] + ').'; });
          explain = u[0] + ' — 하나, 둘 셀 수 없어서 a/an을 붙이지 않고 복수형도 없어요.' + (u[1] ? ' 셀 때는 ' + u[1] + '처럼 단위를 써요.' : '');
        } else {
          var c = R.pick(cnt);
          var us = R.sample(unc, 3);
          correct = c[0];
          wrongs = us.map(function (x) { return x[0]; });
          us.forEach(function (x) { why[x[0]] = x[0] + ' — 하나, 둘 셀 수 없는 명사예요. a/an이나 -s를 붙이지 않아요.'; });
          explain = c[0] + ' — 하나, 둘 셀 수 있어서 a/an을 붙이거나 복수형(' + c[1] + ')을 만들 수 있어요.';
        }
        var pick = R.choices(correct, wrongs, 4);
        return {
          type: 'choice', concept: 4,
          q: '다음 중 ' + (findUnc ? '**셀 수 없는**' : '**셀 수 있는**') + ' 명사는 무엇일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (x) { return x === correct ? '' : why[x]; }),
          explain: explain,
        };
      },
    },
  ],

  vocab: [
    { w: 'picture', m: '사진, 그림', ex: 'Look at this picture.', exm: '이 사진을 보세요.' },
    { w: 'sunny', m: '화창한', ex: 'It is a sunny day.', exm: '화창한 날이에요.' },
    { w: 'pond', m: '연못', ex: 'Some ducks are swimming in the pond.', exm: '오리 몇 마리가 연못에서 헤엄치고 있어요.' },
    { w: 'bench', m: '긴 의자, 벤치', ex: 'An old man is sitting on the bench.', exm: '할아버지 한 분이 벤치에 앉아 계세요.' },
    { w: 'ride', m: '(탈것을) 타다', ex: 'They are riding bikes.', exm: '그들은 자전거를 타고 있어요.' },
    { w: 'kite', m: '연', ex: 'A boy is flying a kite.', exm: '한 남자아이가 연을 날리고 있어요.' },
    { w: 'grass', m: '풀, 잔디', ex: 'Children are playing on the grass.', exm: '아이들이 잔디밭에서 놀고 있어요.' },
    { w: 'behind', m: '~ 뒤에', ex: 'There is a tree behind the house.', exm: '집 뒤에 나무가 한 그루 있어요.' },
    { w: 'next to', m: '~ 옆에', ex: 'My bag is next to the door.', exm: '내 가방은 문 옆에 있어요.' },
    { w: 'in front of', m: '~ 앞에', ex: 'We are waiting in front of the museum.', exm: '우리는 박물관 앞에서 기다리고 있어요.' },
    { w: 'bottle', m: '병', ex: 'There is a little water in the bottle.', exm: '병에 물이 조금 있어요.' },
    { w: 'bread', m: '빵', ex: 'I eat some bread for breakfast.', exm: '나는 아침으로 빵을 조금 먹어요.' },
    { w: 'shelf', m: '선반, 책꽂이', ex: 'There are many books on the shelf.', exm: '책꽂이에 책이 많이 있어요.' },
    { w: 'wait', m: '기다리다', ex: 'Jia is waiting for the bus.', exm: '지아는 버스를 기다리고 있어요.' },
  ],
});
