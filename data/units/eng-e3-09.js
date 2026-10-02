/* 3학년 영어 · 가진 물건 묻고 답하기 */
Tutor.registerUnit({
  id: 'eng-e3-09',
  course: 'eng-e3',
  title: '가진 물건 묻고 답하기',
  summary: "Do you have ~?로 가진 물건을 묻고 Yes, I do./No, I don't.로 답하며, 친구에게 학용품을 빌리는 말을 익혀요.",
  goals: [
    "Do you have ~?로 친구가 가진 물건을 묻고 Yes, I do. / No, I don't.로 답할 수 있어요.",
    'I have ~.로 내가 가진 물건과 그 개수를 말할 수 있어요.',
    '학용품 낱말 crayon, glue, notebook, marker, brush를 듣고 읽을 수 있어요.',
    '물건을 건넬 때 Here you are., 받을 때 Thank you.라고 말할 수 있어요.',
  ],
  standards: ['[4영02-08]', '[4영01-06]', '[4영02-10]'],

  concepts: [
    {
      title: '학용품 낱말',
      body: '필통과 가방 속 학용품을 영어로 불러 봐요.\n\n| 영어 | 뜻 |\n|---|---|\n| **crayon** | 크레용 |\n| **glue** | 풀 |\n| **notebook** | 공책 |\n| **marker** | 마커(굵은 사인펜) |\n| **brush** | 붓 |\n\n앞에서 배운 **pencil**(연필), **eraser**(지우개), **ruler**(자)도 함께 기억해요.\n\n> 💡 **notebook**은 **note**(적다)와 **book**(책)이 합쳐진 낱말이에요. "적는 책", 곧 공책이지요.',
      easy: '내 필통을 열어 하나씩 꺼내며 이름을 불러 보세요.\n\n그림을 그릴 때 쓰는 것은 **crayon**, 종이를 붙일 때 쓰는 것은 **glue**, 글씨를 쓰는 책은 **notebook**, 굵게 칠하는 펜은 **marker**, 물감을 칠하는 것은 **brush**예요.\n\n물건을 손에 들고 영어 이름을 소리 내어 말하면 훨씬 잘 기억나요.',
      check: {
        type: 'choice',
        q: "'풀'을 뜻하는 영어 낱말은 무엇일까요?",
        choices: ['glue', 'brush', 'notebook'],
        answer: 0,
        why: ['', 'brush는 물감을 칠하는 붓이에요.', 'notebook은 글씨를 쓰는 공책이에요.'],
        explain: '종이를 붙이는 풀은 **glue**예요. brush는 붓, notebook은 공책이에요.',
      },
    },
    {
      title: 'Do you have ~? — 가지고 있는지 묻기',
      body: '친구에게 어떤 물건이 있는지 물을 때는 **Do you have ~?**라고 말해요. "너는 ~을 가지고 있니?"라는 뜻이에요.\n\n- **Do you have a crayon?** 너는 크레용을 가지고 있니?\n- **Do you have a marker?** 너는 마커를 가지고 있니?\n\n물건 이름 앞의 **a**는 "하나"라는 뜻이에요. 크레용 하나, 마커 하나를 묻는 거예요.\n\n> 💡 **glue**(풀)는 하나, 둘 세지 않는 낱말이라서 a 없이 **Do you have glue?**라고 물어요.',
      easy: '"Do you have"는 "너 ~ 있어?"라고 묻는 말 덩어리라고 생각하세요. 뒤에 물건 이름만 바꿔 끼우면 돼요.\n\n- Do you have **a pencil**? 너 연필 있어?\n- Do you have **a ruler**? 너 자 있어?\n\n앞부분은 그대로, 물건만 바꿔 넣는 놀이처럼 연습해 보세요.',
      check: {
        type: 'ox',
        q: "'Do you have a brush?'는 '너는 붓을 가지고 있니?'라는 뜻이에요.",
        answer: true,
        explain: 'Do you have ~?는 "너는 ~을 가지고 있니?"라고 묻는 말이고, brush는 붓이에요. 그래서 "너는 붓을 가지고 있니?"라는 뜻이 맞아요.',
      },
    },
    {
      title: "Yes, I do. / No, I don't. — 대답하기",
      body: "Do you have ~?라는 물음에는 이렇게 대답해요.\n\n| 가지고 있을 때 | 가지고 있지 않을 때 |\n|---|---|\n| **Yes, I do.** | **No, I don't.** |\n\n질문이 **Do**로 시작했으니 대답에도 **do**를 써요. **don't**는 **do not**을 줄인 말이에요.\n\n- A: Do you have a notebook? B: **Yes, I do.** (응, 있어.)\n- A: Do you have a crayon? B: **No, I don't.** (아니, 없어.)\n\n> ⚠️ 'Yes, I have.'라고 대답하지 않아요. 짧게 대답할 때는 **Yes, I do.**예요.",
      easy: "질문의 첫 낱말 **Do**를 대답에서 다시 꺼내 쓴다고 생각하세요.\n\n- Do you have ~? → Yes, I **do**.\n- 없으면 do에 not을 붙인 **don't**를 써서 No, I **don't**.\n\n공을 받아서 그대로 다시 던져 주는 것처럼, 질문의 do를 받아서 대답에 넣는 거예요.",
      check: {
        type: 'choice',
        q: '민수는 공책이 **없어요**. 친구가 "Do you have a notebook?"이라고 물었을 때 민수의 대답으로 알맞은 것은 무엇일까요?',
        choices: ["No, I don't.", 'Yes, I do.', 'No, I have.'],
        answer: 0,
        why: ['', 'Yes, I do.는 "응, 있어."라는 뜻이에요. 민수는 공책이 없어요.', "Do로 물었으니 대답도 do로 해요. 없을 때는 No, I don't.예요."],
        explain: "공책이 없으니 \"아니, 없어.\"라는 뜻의 **No, I don't.**로 대답해요.",
      },
    },
    {
      title: 'I have ~. — 가진 것 말하기',
      body: '내가 가진 물건을 말할 때는 **I have ~.**라고 해요. "나는 ~을 가지고 있어요."라는 뜻이에요.\n\n- **I have a notebook.** 나는 공책 한 권이 있어요.\n- **I have two markers.** 나는 마커 두 개가 있어요.\n\n하나일 때는 물건 이름 앞에 **a**를 쓰고, **두 개 이상**일 때는 수를 말한 뒤 물건 이름 끝에 **s**를 붙여요.\n\n| 하나 | 여러 개 |\n|---|---|\n| a crayon | three crayons |\n| a marker | two markers |\n\n> ⚠️ 여러 개일 때는 a를 쓰지 않아요. a two markers(X), two markers(O)',
      easy: '영어에서는 물건이 여러 개면 낱말 끝에 꼬리 **s**를 달아 줘요.\n\n크레용 하나는 **a crayon**, 크레용 셋은 **three crayons**예요. s 꼬리가 "여러 개예요!" 하고 알려 주는 표시라고 생각하세요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nI have two [[........]].',
        choices: ['markers', 'marker', 'a marker'],
        answer: 0,
        why: ['', '두 개 이상이면 낱말 끝에 s를 붙여요.', 'a는 하나라는 뜻이에요. two와 함께 쓰지 않아요.'],
        explain: 'two는 둘이니 물건 이름 끝에 s를 붙여 **two markers**라고 해요.',
      },
    },
    {
      title: 'Here you are. / Thank you. — 빌리고 건네기',
      body: '친구에게 물건을 빌릴 때도 **Do you have ~?**로 먼저 물어요. 친구가 물건을 건네주면서, 받으면서 하는 말이 있어요.\n\n- A: Do you have a brush? (붓 있니?)\n- B: Yes, I do. **Here you are.** (응, 있어. 여기 있어.)\n- A: **Thank you.** (고마워.)\n- B: **You\'re welcome.** (천만에.)\n\n**Here you are.**는 물건을 **건네는 사람**이 하는 말이고, **Thank you.**는 물건을 **받는 사람**이 하는 말이에요.\n\n> 💡 Here you are.는 낱말 하나하나의 뜻보다 "여기 있어."라는 한 덩어리로 기억해요.',
      easy: '물건이 손에서 손으로 넘어가는 순간을 떠올려 보세요.\n\n- 내 손에서 물건이 **나갈 때**: Here you are.\n- 내 손으로 물건이 **들어올 때**: Thank you.\n\n선물을 줄 때와 받을 때 하는 말이 다른 것과 같아요.',
      check: {
        type: 'ox',
        q: "친구에게 물건을 건네줄 때 'Thank you.'라고 말해요.",
        answer: false,
        explain: '물건을 건네줄 때는 **Here you are.**라고 말해요. Thank you.는 물건을 받는 사람이 하는 말이에요.',
      },
    },
  ],

  examples: [
    {
      q: "대화의 빈칸에 알맞은 말을 써 보세요.\n\nA: Do you have a marker?\nB: [[........]] Here you are.\nA: Thank you.",
      steps: [
        'A는 "너는 마커를 가지고 있니?"라고 물었어요.',
        'B가 이어서 Here you are.(여기 있어.)라고 하며 마커를 건네요. 그러니 B는 마커를 가지고 있어요.',
        '가지고 있을 때의 대답은 Yes, I do.예요.',
      ],
      answer: 'Yes, I do.',
    },
    {
      q: "'나는 크레용 세 개가 있어요.'를 영어로 말해 보세요.",
      steps: [
        '가진 것을 말할 때는 I have로 시작해요.',
        '세 개는 three예요.',
        '두 개 이상이니 crayon 끝에 s를 붙여 crayons라고 해요.',
        '모두 이으면 I have three crayons.예요.',
      ],
      answer: 'I have three crayons.',
    },
  ],

  terms: [
    { term: 'Do you have ~?', def: '"너는 ~을 가지고 있니?"라고 묻는 말이에요. 예: Do you have a crayon?' },
    { term: 'Yes, I do.', def: 'Do you have ~?에 "응, 있어."라고 대답하는 말이에요.' },
    { term: "No, I don't.", def: "Do you have ~?에 \"아니, 없어.\"라고 대답하는 말이에요. don't는 do not을 줄인 말이에요." },
    { term: 'I have ~.', def: '"나는 ~을 가지고 있어요."라고 말하는 문장이에요. 예: I have a notebook.' },
    { term: 'Here you are.', def: '물건을 건네주면서 "여기 있어."라고 하는 말이에요.' },
    { term: '여러 개를 나타내는 s', def: '물건이 두 개 이상일 때 낱말 끝에 붙이는 s예요. 예: a marker → two markers' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: "'crayon'의 뜻은 무엇일까요?",
      choices: ['크레용', '공책', '붓', '풀'],
      answer: 0,
      why: ['', '공책은 notebook이에요.', '붓은 brush예요.', '풀은 glue예요.'],
      explain: 'crayon은 그림을 그릴 때 쓰는 **크레용**이에요.',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 0,
      q: "'공책'을 뜻하는 영어 낱말을 써 보세요. n으로 시작해요.",
      answer: ['notebook'],
      wrong: [
        { a: 'book', why: 'book은 "책"이에요. 공책은 note와 book을 이어 쓴 notebook이에요.' },
        { a: 'note', why: 'note만 쓰면 "짧은 메모"라는 뜻이에요. 뒤에 book을 붙여요.' },
      ],
      explain: '공책은 **notebook**이에요. note(적다)와 book(책)이 합쳐진 낱말이에요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: "'Do you have a brush?'의 뜻으로 알맞은 것은 무엇일까요?",
      choices: ['너는 붓을 가지고 있니?', '나는 붓을 가지고 있어.', '너는 붓을 좋아하니?', '이것은 붓이니?'],
      answer: 0,
      why: ['', '"나는 붓을 가지고 있어."는 I have a brush.예요.', '"좋아하니?"는 Do you like ~?예요. have는 "가지고 있다"예요.', '"이것은 ~이니?"는 Is this ~?예요.'],
      explain: 'Do you have ~?는 "너는 ~을 가지고 있니?"라고 묻는 말이에요. brush는 붓이에요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: "'Do you have a crayon?'에 크레용이 있다고 대답할 때 'Yes, I have.'라고 말해요.",
      answer: false,
      explain: 'Do로 물었으니 대답도 do로 해요. 크레용이 있으면 **Yes, I do.**라고 대답해요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '지아는 마커가 **없어요**. 대화의 빈칸에 알맞은 지아의 대답은 무엇일까요?\n\nA: Do you have a marker?\n지아: [[........]]',
      choices: ["No, I don't.", 'Yes, I do.', 'Here you are.', 'Thank you.'],
      answer: 0,
      why: ['', 'Yes, I do.는 "응, 있어."예요. 지아는 마커가 없어요.', 'Here you are.는 물건을 건네줄 때 하는 말이에요.', 'Thank you.는 고마울 때 하는 말이에요.'],
      explain: "가지고 있지 않을 때는 **No, I don't.**라고 대답해요.",
    },
    {
      id: 'p6', level: 1, type: 'short', concept: 3,
      q: '괄호 안의 낱말을 알맞은 꼴로 바꾸어 빈칸에 써 보세요.\n\nI have two [[........]]. (crayon)',
      answer: ['crayons'],
      wrong: [{ a: 'crayon', why: 'two는 둘이에요. 두 개 이상이면 낱말 끝에 s를 붙여 crayons라고 써요.' }],
      explain: '크레용이 두 개이니 crayon 끝에 s를 붙여 **two crayons**라고 해요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '친구에게 물건을 **건네줄 때** 하는 말로 알맞은 것은 무엇일까요?',
      choices: ['Here you are.', 'Thank you.', 'Yes, I do.', 'Do you have a brush?'],
      answer: 0,
      why: ['', 'Thank you.는 물건을 받는 사람이 하는 말이에요.', 'Yes, I do.는 "응, 있어."라고 대답하는 말이에요.', 'Do you have ~?는 가지고 있는지 묻는 말이에요.'],
      explain: '물건을 건네줄 때는 **Here you are.**(여기 있어.)라고 말해요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 3,
      q: "낱말을 바르게 늘어놓아 '나는 공책 한 권이 있어요.'라는 문장을 만드세요.",
      choices: ['I', 'have', 'a', 'notebook'],
      answer: [0, 1, 2, 3],
      hint: '"나는"이 먼저, 그다음 "가지고 있다"가 와요.',
      explain: '영어는 "나는 → 가지고 있다 → 공책 한 권" 순서로 말해요. **I have a notebook.**',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 4,
      q: '서준이가 하윤이에게 붓을 빌리는 대화예요. 대화가 이어지는 순서대로 늘어놓으세요.',
      choices: ['Do you have a brush?', 'Yes, I do. Here you are.', 'Thank you.', "You're welcome."],
      answer: [0, 1, 2, 3],
      hint: '먼저 붓이 있는지 물어야 빌릴 수 있어요.',
      explain: '붓이 있는지 묻고(Do you have a brush?) → 있다고 하며 건네고(Yes, I do. Here you are.) → 받은 사람이 고마워하고(Thank you.) → 천만에(You\'re welcome.)라고 답해요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '대화를 읽고 물음에 답하세요.\n\nMinsu: Do you have a crayon?\nJia: No, I don\'t. I have two markers.\nMinsu: Oh, OK.\n\nJia가 가지고 있는 것은 무엇일까요?',
      choices: ['마커 두 개', '크레용 두 개', '크레용 한 개', '마커 한 개'],
      answer: 0,
      why: ['', 'Jia는 크레용이 있느냐는 물음에 No, I don\'t.라고 했어요.', 'Jia는 크레용이 없다고 했어요.', 'two markers는 마커 두 개예요. s가 붙어 있어요.'],
      hint: 'Jia가 I have 뒤에 한 말을 찾아보세요.',
      explain: 'Jia는 크레용이 없다고(No, I don\'t.) 하고, I have two markers.(나는 마커 두 개가 있어.)라고 했어요.',
    },
    {
      id: 'p11', level: 2, type: 'short', concept: 2,
      q: '빈칸에 알맞은 말을 써 보세요.\n\nA: Do you have a notebook?\nB: No, I [[........]].',
      answer: ["don't", 'do not'],
      wrong: [{ a: 'do', why: 'No로 시작했으니 "없다"는 뜻이 되도록 do에 not을 붙인 don\'t를 써요.' }],
      hint: '가지고 있지 않다는 대답이에요.',
      explain: "없을 때의 대답은 **No, I don't.**예요. don't는 do not을 줄인 말이라 do not이라고 써도 맞아요.",
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 2,
      q: '대화가 **자연스럽지 않은** 것을 고르세요.',
      choices: [
        'A: Do you have a notebook? B: Yes, I am.',
        'A: Do you have a marker? B: Yes, I do.',
        "A: Do you have a brush? B: No, I don't.",
        'A: Here you are. B: Thank you.',
      ],
      answer: 0,
      why: ['', 'marker가 있다고 바르게 대답했어요.', 'brush가 없다고 바르게 대답했어요.', '건네주는 말에 고맙다고 바르게 답했어요.'],
      explain: 'Do you have ~?에는 Yes, I do. 또는 No, I don\'t.로 대답해요. Yes, I am.은 이 물음에 맞지 않아요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 2,
      q: '서준이의 말을 읽고 물음에 답하세요.\n\nSeojun: I have a notebook. I have three markers. I have a brush, too.\n\n하윤이가 서준이에게 "Do you have a crayon?"이라고 물으면 서준이는 어떻게 대답할까요?',
      choices: ["No, I don't.", 'Yes, I do.', 'I have three crayons.', 'Here you are.'],
      answer: 0,
      why: ['', '서준이가 말한 물건에 crayon은 없어요.', '서준이가 가진 것은 three markers(마커 세 개)예요.', '서준이는 크레용이 없으니 건네줄 수 없어요.'],
      hint: '서준이가 가진 물건을 하나씩 우리말로 적어 보세요.',
      explain: '서준이는 공책(notebook), 마커 세 개(three markers), 붓(brush)을 가지고 있어요. 크레용은 없으니 **No, I don\'t.**라고 대답해요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: '지아는 서준이에게 풀을 빌리고 싶어요. 지아가 **가장 먼저** 할 말로 알맞은 것은 무엇일까요?',
      choices: ['Do you have glue?', 'Here you are.', 'Thank you.', 'I have glue.'],
      answer: 0,
      why: ['', 'Here you are.는 물건을 건네주는 사람이 하는 말이에요.', 'Thank you.는 물건을 받은 뒤에 하는 말이에요.', 'I have glue.는 "나는 풀이 있어."라는 뜻이에요. 지아는 풀이 없어서 빌리려는 거예요.'],
      hint: '빌리기 전에 먼저 친구에게 그 물건이 있는지 알아야 해요.',
      explain: '먼저 **Do you have glue?**로 풀이 있는지 물어요. 서준이가 Yes, I do. Here you are.라며 건네주면 지아는 Thank you.라고 말해요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '대화를 읽고 물음에 답하세요.\n\nMinsu: I have two markers.\nJia: I have three markers.\n\n민수와 지아가 가진 마커는 모두 몇 개일까요?',
      answer: '5',
      wrong: [
        { a: '2', why: 'two는 민수의 마커예요. 지아의 three도 더해요.' },
        { a: '3', why: 'three는 지아의 마커예요. 민수의 two도 더해요.' },
      ],
      hint: 'two와 three가 각각 몇인지 먼저 떠올려 보세요.',
      explain: 'two는 2, three는 3이에요. 그래서 마커는 모두 2+3=5, 5개예요.',
    },
    {
      id: 'a4', level: 3, type: 'ox', concept: 2,
      q: '하윤이가 말했어요.\n\nHayun: I have a notebook and a brush.\n\n민수가 하윤이에게 "Do you have a brush?"라고 물으면 하윤이는 "No, I don\'t."라고 대답해요.',
      answer: false,
      hint: '하윤이가 가진 물건에 brush가 있는지 찾아보세요.',
      explain: '하윤이는 공책(notebook)과 붓(brush)을 가지고 있어요. 붓이 있으니 **Yes, I do.**라고 대답해요.',
    },
  ],

  deeper: [
    {
      title: 'Do로 묻고 do로 답해요',
      body: "앞 단원에서 배운 **Do you like ~?**(너는 ~을 좋아하니?)와 이번에 배운 **Do you have ~?**(너는 ~을 가지고 있니?)는 모두 **Do**로 시작해요.\n\n그래서 대답하는 방법도 똑같아요.\n\n| 질문 | 그렇다 | 아니다 |\n|---|---|---|\n| Do you like apples? | Yes, I do. | No, I don't. |\n| Do you have a ruler? | Yes, I do. | No, I don't. |\n\nDo로 시작하는 질문을 들으면 대답에도 do를 꺼내 쓰면 돼요. 4학년에서는 잃어버린 물건을 찾으며 \"이것이 네 것이니?\"처럼 묻는 말도 배워요.",
    },
  ],

  faq: [
    {
      q: 'Yes, I have.라고 대답하면 안 돼요?',
      a: "Do you have ~?처럼 Do로 물은 질문에는 짧게 대답할 때 **Yes, I do.** 또는 **No, I don't.**라고 해요. 질문의 do를 대답에서 다시 쓰는 거예요. 'Yes, I have.'는 이 질문의 대답으로 쓰지 않아요.",
    },
    {
      q: '물건 이름 앞에 a는 언제 붙여요?',
      a: '물건이 **하나**일 때 붙여요. a crayon은 "크레용 하나"예요. eraser처럼 a, e, i, o, u 같은 소리로 시작하는 낱말 앞에서는 a 대신 **an**을 써요(an eraser). 두 개 이상이면 a 대신 two, three 같은 수를 쓰고 낱말 끝에 s를 붙여요(two crayons). glue(풀)처럼 하나, 둘 세지 않는 낱말에는 a를 붙이지 않아요.',
    },
    {
      q: 'Here you are.는 왜 "여기 있어."라는 뜻이에요?',
      a: '낱말 하나하나를 풀면 "여기 네가 있다"처럼 이상하게 들리지만, 영어에서는 물건을 건넬 때 늘 쓰는 **한 덩어리 말**이에요. "안녕하세요"를 낱말로 나누어 생각하지 않는 것처럼, 통째로 "여기 있어."라고 기억하면 돼요.',
    },
  ],

  mistakes: [
    "Do you have ~?에 'Yes, I have.'라고 대답하는 실수 — 있으면 **Yes, I do.**, 없으면 **No, I don't.**예요.",
    "'I have two marker.'처럼 s를 빠뜨리는 실수 — 두 개 이상이면 **two markers**처럼 낱말 끝에 s를 붙여요.",
    "물건을 건네주면서 'Thank you.'라고 하는 실수 — 건네는 사람은 **Here you are.**, 받는 사람이 **Thank you.**예요.",
  ],

  gens: [
    {
      id: 'answer-do-you-have',
      level: 1,
      title: 'Do you have ~?에 알맞게 대답하기',
      make: function (R) {
        var items = [
          ['crayon', '크레용'], ['marker', '마커'], ['notebook', '공책'], ['brush', '붓'],
          ['pencil', '연필'], ['eraser', '지우개'], ['ruler', '자'],
        ];
        var names = ['민수', '지아', '서준', '하윤', '도윤', '수아'];
        var it = R.pick(items);
        var name = R.pick(names);
        var has = R.bool();
        var article = it[0] === 'eraser' ? 'an' : 'a';
        var correct = has ? 'Yes, I do.' : "No, I don't.";
        var other = has ? "No, I don't." : 'Yes, I do.';
        var reason = {};
        reason[other] = has
          ? name + R.josa(name, '은/는') + ' ' + it[1] + R.josa(it[1], '이/가') + " 있어요. No, I don't.는 \"아니, 없어.\"라는 뜻이에요."
          : name + R.josa(name, '은/는') + ' ' + it[1] + R.josa(it[1], '이/가') + ' 없어요. Yes, I do.는 "응, 있어."라는 뜻이에요.';
        reason[has ? 'Yes, I have.' : 'No, I have.'] = 'Do로 물었으니 대답에도 do를 써요.';
        reason['Here you are.'] = 'Here you are.는 물건을 건네줄 때 하는 말이에요. 먼저 물음에 대답해요.';
        reason['Thank you.'] = 'Thank you.는 물건을 받았을 때 하는 말이에요.';
        var pick = R.choices(correct, [other, has ? 'Yes, I have.' : 'No, I have.', 'Here you are.', 'Thank you.']);
        return {
          type: 'choice', concept: 2,
          q: name + R.josa(name, '은/는') + ' ' + it[1] + R.josa(it[1], '이/가') + ' ' + (has ? '**있어요**' : '**없어요**') + '. 친구가 이렇게 물었어요.\n\nDo you have ' + article + ' ' + it[0] + '?\n\n' + name + '의 대답으로 알맞은 것은 무엇일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: it[0] + R.josa(it[0], '은/는') + ' ' + it[1] + R.josa(it[1], '이에요/예요') + '. ' + name + R.josa(name, '은/는') + ' ' + it[1] + R.josa(it[1], '이/가') + ' ' + (has ? '있으니' : '없으니') + ' **' + correct + '**라고 대답해요.',
        };
      },
    },
    {
      id: 'i-have-count',
      level: 2,
      title: 'I have ~.에서 하나와 여러 개 구별하기',
      make: function (R) {
        var items = [
          ['crayon', '크레용', '개'], ['marker', '마커', '개'], ['notebook', '공책', '권'],
          ['pencil', '연필', '자루'], ['ruler', '자', '개'],
        ];
        var nums = [['two', '두', '둘'], ['three', '세', '셋'], ['four', '네', '넷'], ['five', '다섯', '다섯']];
        var it = R.pick(items);
        var one = R.bool(0.3);
        if (one) {
          return {
            type: 'short', concept: 3,
            q: "'나는 " + it[1] + ' 한 ' + it[2] + R.josa(it[2], '이/가') + ' 있어요.\'를 영어로 나타내요. 빈칸에 알맞은 낱말을 써 보세요.\n\nI have a [[........]].',
            answer: [it[0]],
            wrong: [{ a: it[0] + 's', why: '하나일 때는 a를 쓰고 s를 붙이지 않아요. s는 두 개 이상일 때 붙여요.' }],
            explain: '하나이니 a 뒤에 낱말을 그대로 써요. **I have a ' + it[0] + '.**',
          };
        }
        var n = R.pick(nums);
        return {
          type: 'short', concept: 3,
          q: "'나는 " + it[1] + ' ' + n[1] + ' ' + it[2] + R.josa(it[2], '이/가') + ' 있어요.\'를 영어로 나타내요. 빈칸에 알맞은 낱말을 써 보세요.\n\nI have ' + n[0] + ' [[........]].',
          answer: [it[0] + 's'],
          wrong: [{ a: it[0], why: n[0] + R.josa(n[0], '은/는') + ' ' + n[2] + '이에요. 두 개 이상이면 낱말 끝에 s를 붙여요.' }],
          explain: n[0] + R.josa(n[0], '은/는') + ' ' + n[2] + '이에요. 두 개 이상이니 낱말 끝에 s를 붙여요. **I have ' + n[0] + ' ' + it[0] + 's.**',
        };
      },
    },
  ],

  vocab: [
    { w: 'crayon', m: '크레용', ex: 'I draw a cat with a **crayon**.', exm: '나는 크레용으로 고양이를 그려요.' },
    { w: 'glue', m: '풀', ex: 'Do you have **glue**?', exm: '너는 풀을 가지고 있니?' },
    { w: 'notebook', m: '공책', ex: 'I have a **notebook**.', exm: '나는 공책 한 권이 있어요.' },
    { w: 'marker', m: '마커(굵은 사인펜)', ex: 'I have two **markers**.', exm: '나는 마커 두 개가 있어요.' },
    { w: 'brush', m: '붓', ex: 'Do you have a **brush**?', exm: '너는 붓을 가지고 있니?' },
    { w: 'pencil', m: '연필', ex: 'This is my **pencil**.', exm: '이것은 내 연필이에요.' },
    { w: 'eraser', m: '지우개', ex: 'I have an **eraser**.', exm: '나는 지우개 한 개가 있어요.' },
    { w: 'ruler', m: '자', ex: 'Do you have a **ruler**? Yes, I do.', exm: '너는 자를 가지고 있니? 응, 있어.' },
    { w: 'have', m: '가지고 있다', ex: 'I **have** three crayons.', exm: '나는 크레용 세 개를 가지고 있어요.' },
    { w: 'thank you', m: '고마워요', ex: 'Here you are. **Thank you.**', exm: '여기 있어. 고마워.' },
  ],
});
