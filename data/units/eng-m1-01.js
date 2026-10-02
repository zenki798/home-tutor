/* 중1 영어 · 나를 소개하기 (be동사) */
Tutor.registerUnit({
  id: 'eng-m1-01',
  course: 'eng-m1',
  title: '나를 소개하기 (be동사)',
  summary: '주어에 맞는 be동사와 인칭대명사를 정리하고, 이름·나이·관심사를 담아 나를 소개하는 글을 읽고 써요.',
  goals: [
    '주어에 맞게 be동사 am·are·is를 고르고 줄임말로 쓸 수 있어요.',
    'be동사의 부정문과 의문문을 만들고, 의문문에 알맞게 대답할 수 있어요.',
    '인칭대명사의 격(I-my-me-mine)과 재귀대명사(myself 등)를 구별해 쓸 수 있어요.',
    '자기소개 글의 짜임을 알고, 글에서 필요한 정보를 찾을 수 있어요.',
  ],
  standards: [],

  concepts: [
    {
      title: '주어에 맞는 be동사 고르기',
      body: '**be동사**는 "~이다, ~에 있다"라는 뜻으로 주어와 뒤의 말을 이어 주는 동사예요. 현재형은 주어에 따라 세 가지로 모양이 바뀌어요.\n\n| 주어 | be동사 | 예문 |\n|---|---|---|\n| I | am | I **am** a student. |\n| you, we, they, 복수 명사 | are | You **are** kind. / My friends **are** funny. |\n| he, she, it, 단수 명사 | is | She **is** my sister. / Seoul **is** a big city. |\n\n주어가 "나(I)"면 am, "한 사람·한 개(he, she, it, Minsu, my bag)"면 is, "너(you)나 여럿(we, they, Jia and Minsu)"이면 are예요.\n\n> 💡 **you**는 한 사람이든 여러 사람이든 늘 are와 함께 써요.',
      easy: 'be동사는 문장의 "연결 고리"라고 생각해 보세요. 고리의 모양이 주어에 따라 달라져요.\n\n- 나 혼자(I) → **am**\n- 다른 사람 한 명이나 물건 하나(he, she, it) → **is**\n- 너(you), 또는 둘 이상(we, they) → **are**\n\n"Jia and I"처럼 두 사람이 함께 주어가 되면 여럿이니까 are예요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nMy brother [[blank]] eleven years old.',
        choices: ['is', 'am', 'are'],
        answer: 0,
        why: ['', 'am은 주어가 I일 때만 써요.', '주어 My brother는 한 사람이에요. 한 사람(3인칭 단수)에는 is를 써요.'],
        explain: 'My brother는 한 사람(3인칭 단수)이므로 is를 써요. My brother **is** eleven years old.',
      },
    },
    {
      title: 'be동사의 부정문과 줄임말',
      body: '"~이 아니다"라고 말할 때는 **be동사 뒤에 not**을 붙여요.\n\nShe is a teacher. → She **is not** a teacher.\n\n말할 때는 흔히 **줄임말**을 써요. 빠진 글자 자리에 아포스트로피(\')를 찍어요.\n\n| 원래 | 줄임말 |\n|---|---|\n| I am | I\'m |\n| you are / we are / they are | you\'re / we\'re / they\'re |\n| he is / she is / it is | he\'s / she\'s / it\'s |\n| is not / are not | isn\'t / aren\'t |\n\n부정문은 두 가지로 줄일 수 있어요: She **isn\'t** tall. = She**\'s not** tall.\n\n> ⚠️ am not은 amn\'t로 줄이지 않아요. **I\'m not**으로 줄여요.',
      easy: '줄임말은 두 낱말을 하나로 붙이고, 빠진 글자 자리에 작은 점(\')을 찍는 거예요.\n\n- is + not → is**n\'t** (not의 o가 빠졌어요)\n- I + am → I**\'m** (am의 a가 빠졌어요)\n\n점은 "여기 글자가 빠졌어요"라는 표시예요.',
      check: {
        type: 'ox',
        q: '"I am not"을 줄여 쓰면 "I\'m not"이에요.',
        answer: true,
        explain: 'I am을 I\'m으로 줄이고 not은 그대로 둬요. am not을 한 낱말로 줄인 꼴은 쓰지 않아요.',
      },
    },
    {
      title: 'be동사의 의문문과 대답',
      body: '"~이니?"라고 물을 때는 **be동사를 주어 앞으로** 옮기고 끝에 물음표를 써요.\n\nShe is your sister. → **Is she** your sister?\n\n대답할 때는 질문의 주어를 알맞은 대명사로 바꾸고, **be동사를 다시 써요.**\n\n| 질문 | 긍정 대답 | 부정 대답 |\n|---|---|---|\n| Is she your sister? | Yes, she is. | No, she isn\'t. |\n| Are you a new student? | Yes, I am. | No, I\'m not. |\n| Are they in the gym? | Yes, they are. | No, they aren\'t. |\n\n> ⚠️ 긍정의 짧은 대답은 줄여 쓰지 않아요. "Yes, she is."는 맞고 "Yes, she\'s."는 틀려요.',
      easy: '의문문은 "자리 바꾸기 놀이"예요. 주어와 be동사가 자리를 바꾸면 질문이 돼요.\n\nYou **are** happy. → **Are** you happy?\n\n대답은 질문에 쓰인 be동사를 그대로 가져와 써요. Are you ~? 라고 물으면 "나"에 대한 질문이니 I am으로 답해요.',
      check: {
        type: 'choice',
        q: '"Is he your teacher?"에 "아니요"라고 바르게 대답한 것은 무엇일까요?',
        choices: ["No, he isn't.", "No, he doesn't.", "No, I'm not."],
        answer: 0,
        why: ['', 'be동사(Is)로 물었으니 be동사로 대답해요. doesn\'t는 일반동사 질문에 쓰는 말이에요.', '질문의 주어는 he예요. 대답의 주어도 he로 써요.'],
        explain: 'Is he ~? 로 물었으니 주어 he와 be동사 is를 그대로 써서 No, he isn\'t.라고 대답해요.',
      },
    },
    {
      title: '인칭대명사의 격',
      body: '**인칭대명사**는 사람이나 물건의 이름 대신 쓰는 말이에요. 문장에서 하는 일(격)에 따라 모양이 바뀌어요.\n\n| 주격 (~은/는) | 소유격 (~의) | 목적격 (~을/를) | 소유대명사 (~의 것) |\n|---|---|---|---|\n| I | my | me | mine |\n| you | your | you | yours |\n| he | his | him | his |\n| she | her | her | hers |\n| it | its | it | - |\n| we | our | us | ours |\n| they | their | them | theirs |\n\n- 주격은 문장의 주어: **She** is my friend.\n- 소유격은 명사 앞: This is **my** bag.\n- 목적격은 동사나 전치사(for, with, to …) 뒤: I like **him**. / This is for **you**.\n- 소유대명사는 혼자 써서 "~의 것": The bag is **mine**.',
      easy: '같은 사람도 문장에서 맡은 역할에 따라 옷을 갈아입는다고 생각해 보세요.\n\n- 문장 맨 앞의 주인공이면 → I\n- 뒤에 오는 물건의 주인이면 → my (my bag)\n- 무언가를 받는 쪽이면 → me (Call me.)\n- "내 것"이라고 혼자 말하면 → mine\n\n뒤에 명사가 오면 my, 혼자 서 있으면 mine이에요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nThis is Jia. I like [[blank]] very much.',
        choices: ['her', 'she', 'hers'],
        answer: 0,
        why: ['', 'she는 주어 자리에 쓰는 꼴이에요. like 뒤(목적어 자리)에는 목적격을 써요.', 'hers는 "그녀의 것"이라는 뜻이에요. "그녀를"은 목적격 her예요.'],
        explain: 'like 뒤에서 "그녀를"이라는 뜻이므로 목적격 her를 써요.',
      },
    },
    {
      title: '재귀대명사 (myself, yourself …)',
      body: '**재귀대명사**는 "~ 자신"이라는 뜻의 말이에요. 소유격이나 목적격에 **-self(단수), -selves(복수)**를 붙여 만들어요.\n\n| 주어 | 재귀대명사 | 주어 | 재귀대명사 |\n|---|---|---|---|\n| I | myself | we | ourselves |\n| you (한 명) | yourself | you (여럿) | yourselves |\n| he | himself | they | themselves |\n| she | herself | it | itself |\n\n주어와 목적어가 **같은 사람**일 때 목적어 자리에 써요.\n\n- She is proud of **herself**. (그녀는 자기 자신을 자랑스러워해요.)\n- She is proud of **her**. (그녀는 다른 여자를 자랑스러워해요.)\n\n자기소개를 시작할 때 쓰는 "Let me introduce **myself**."도 "나 자신을 소개할게요"라는 뜻이에요.',
      easy: '거울을 떠올려 보세요. 거울 속에서 나를 보는 사람은 바로 나 자신이지요. 이렇게 행동이 자기에게 되돌아올 때 재귀대명사를 써요.\n\n"재귀"는 "다시 돌아온다"는 뜻이에요. I → myself, she → herself처럼 "자기"에게 돌아오는 말이에요.',
      check: {
        type: 'ox',
        q: '"they"의 재귀대명사는 "themselves"예요.',
        answer: true,
        explain: 'they는 여럿이므로 목적격 them에 -selves를 붙여 themselves라고 써요.',
      },
    },
    {
      title: '자기소개 글의 짜임',
      body: '자기소개 글은 보통 네 부분으로 짜여 있어요.\n\n1. **인사**: Hello, everyone. / Hi, I\'m Seojun.\n2. **소개**: 이름, 나이, 사는 곳, 학년 — I am thirteen years old. I\'m from Busan.\n3. **관심사**: 좋아하는 것, 취미, 동아리, 꿈 — I\'m interested in music. My favorite subject is art.\n4. **끝인사**: Nice to meet you. / Thank you for listening.\n\n글에서 **세부 정보**를 찾을 때는 질문의 핵심 낱말(나이면 years old, 사는 곳이면 from, 관심사면 interested in, favorite)을 먼저 정하고, 그 낱말이 있는 문장을 찾아 읽어요.',
      easy: '자기소개는 처음 만난 친구에게 하는 짧은 인사 편지 같아요.\n\n"안녕!(인사) → 나는 누구야(소개) → 나는 이런 걸 좋아해(관심사) → 만나서 반가워(끝인사)"\n\n이 순서를 기억하면 글을 읽을 때도, 쓸 때도 길을 잃지 않아요.',
      check: {
        type: 'choice',
        q: '자기소개 글에서 "관심사" 부분에 들어가기에 가장 알맞은 문장은 무엇일까요?',
        choices: ["I'm interested in soccer.", 'Hello, everyone.', 'Thank you for listening.'],
        answer: 0,
        why: ['', '이 문장은 글을 시작하는 인사예요.', '이 문장은 글을 마치는 끝인사예요.'],
        explain: '관심사 부분에는 좋아하는 것·취미를 말해요. I\'m interested in soccer.(나는 축구에 관심이 있어요.)가 알맞아요.',
      },
    },
  ],

  examples: [
    {
      q: '다음 문장을 부정문과 의문문으로 바꾸어 보세요.\n\nShe is a good dancer.',
      steps: [
        '부정문은 be동사 is 뒤에 not을 붙여요: She is not a good dancer.',
        'is not은 isn\'t로 줄일 수 있어요: She isn\'t a good dancer.',
        '의문문은 be동사 Is를 주어 she 앞으로 옮기고 끝에 물음표를 써요: Is she a good dancer?',
        '대답은 Yes, she is. 또는 No, she isn\'t.예요.',
      ],
      answer: "부정문: She isn't a good dancer. / 의문문: Is she a good dancer?",
    },
    {
      q: '빈칸에 알맞은 대명사를 차례대로 쓰세요.\n\nThis is Minho. (가) is my classmate. I sit next to (나) in class.',
      steps: [
        '(가)는 문장의 주어 자리예요. Minho는 남자 한 명이므로 주격 He를 써요.',
        '(나)는 전치사 to 뒤, 곧 목적어 자리예요. 목적격 him을 써요.',
      ],
      answer: '(가) He, (나) him',
    },
  ],

  terms: [
    { term: 'be동사', def: '"~이다, ~에 있다"라는 뜻으로 주어와 뒷말을 이어 주는 동사예요. 현재형은 am, are, is가 있어요. 예: I **am** a student.' },
    { term: '줄임말(축약형)', def: '두 낱말을 하나로 줄여 쓴 말이에요. 빠진 글자 자리에 아포스트로피(\')를 찍어요. 예: I am → I\'m, is not → isn\'t' },
    { term: '인칭대명사', def: '사람이나 물건의 이름 대신 쓰는 말이에요. 예: I, you, he, she, it, we, they' },
    { term: '주격', def: '문장의 주어로 쓰이는 대명사의 꼴이에요("~은/는"). 예: **She** is kind.' },
    { term: '소유격', def: '명사 앞에서 "~의"라는 뜻을 나타내는 꼴이에요. 예: **my** bag, **their** house' },
    { term: '목적격', def: '동사나 전치사 뒤에서 "~을/를, ~에게"라는 뜻을 나타내는 꼴이에요. 예: I like **him**. This is for **you**.' },
    { term: '소유대명사', def: '"~의 것"이라는 뜻으로 혼자 쓰는 대명사예요. 예: The pen is **mine**.' },
    { term: '재귀대명사', def: '"~ 자신"이라는 뜻의 대명사예요. 주어와 목적어가 같은 사람일 때 써요. 예: myself, herself, themselves' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nMy parents [[blank]] doctors.',
      choices: ['are', 'is', 'am'],
      answer: 0,
      why: ['', '주어 My parents는 부모님 두 분, 곧 복수예요. 복수 주어에는 are를 써요.', 'am은 주어가 I일 때만 써요.'],
      explain: 'parents는 두 사람(복수)이므로 are를 써요. My parents **are** doctors.',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 0,
      q: '빈칸에 알맞은 be동사를 쓰세요.\n\nSeojun [[blank]] my best friend.',
      answer: ['is'],
      wrong: [
        { a: 'are', why: 'Seojun은 한 사람이에요. 한 사람(3인칭 단수)에는 is를 써요.' },
        { a: 'am', why: 'am은 주어가 I일 때만 써요.' },
      ],
      explain: 'Seojun은 한 사람(3인칭 단수)이므로 is예요. Seojun **is** my best friend.',
    },
    {
      id: 'p3', level: 1, type: 'short', concept: 1,
      q: '밑줄 친 두 낱말을 **한 낱말의 줄임말**로 쓰세요.\n\nThe library __is not__ open today.',
      answer: ["isn't"],
      wrong: [
        { a: "is'nt", why: '아포스트로피는 빠진 글자 자리에 찍어요. not의 o가 빠지므로 isn\'t예요.' },
        { a: 'isnt', why: '빠진 글자 자리에 아포스트로피(\')를 꼭 찍어요: isn\'t' },
      ],
      explain: 'is not은 not의 o를 빼고 아포스트로피를 찍어 isn\'t로 줄여요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: '"They are not in the classroom."을 줄여 쓰면 "They aren\'t in the classroom."이에요.',
      answer: true,
      explain: 'are not은 aren\'t로 줄여요. They\'re not in the classroom.처럼 줄일 수도 있어요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '"Are you a new student?"에 대한 대답으로 알맞은 것은 무엇일까요?',
      choices: ['Yes, I am.', 'Yes, you are.', "Yes, I'm.", 'Yes, I do.'],
      answer: 0,
      why: [
        '',
        'you로 물으면 "나"에 대해 묻는 것이니 I로 대답해요.',
        '긍정의 짧은 대답은 줄여 쓰지 않아요. Yes, I am.이라고 해요.',
        'be동사(Are)로 물었으니 be동사로 대답해요.',
      ],
      explain: 'Are you ~? 는 "너는 ~이니?"라는 질문이므로 Yes, I am. 또는 No, I\'m not.으로 대답해요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nThis is [[blank]] bike. It is new.',
      choices: ['my', 'I', 'me', 'mine'],
      answer: 0,
      why: [
        '',
        'I는 주어 자리에 쓰는 꼴이에요. 명사(bike) 앞에는 소유격을 써요.',
        'me는 "나를"이라는 목적격이에요. "나의"는 my예요.',
        'mine은 "나의 것"이라 뒤에 명사 없이 혼자 써요. bike 앞에는 my를 써요.',
      ],
      explain: '명사 bike 앞에서 "나의"라는 뜻이므로 소유격 my를 써요. This is **my** bike.',
    },
    {
      id: 'p7', level: 1, type: 'short', concept: 4,
      q: '"그들은 자기 자신을 자랑스러워해요."라는 뜻이 되게 빈칸에 알맞은 낱말을 쓰세요.\n\nThey are proud of [[blank]].',
      answer: ['themselves'],
      wrong: [
        { a: 'them', why: 'them을 쓰면 "다른 사람들을" 자랑스러워한다는 뜻이 돼요. 주어 자신이면 재귀대명사를 써요.' },
        { a: 'theirselves', why: 'they의 재귀대명사는 목적격 them에 -selves를 붙인 themselves예요.' },
        { a: 'themself', why: 'they는 여럿이므로 -self가 아니라 -selves를 붙여요.' },
      ],
      explain: '주어 They와 목적어가 같은 사람들이므로 재귀대명사 themselves를 써요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 2,
      q: '대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: Is your brother tall?\nB: [[blank]] He is short.',
      choices: ["No, he isn't.", "No, she isn't.", "No, he doesn't.", 'Yes, he is.'],
      answer: 0,
      why: [
        '',
        'your brother는 남자이므로 he로 받아요.',
        'be동사(Is)로 물었으니 be동사로 대답해요.',
        '뒤에서 He is short.(키가 작아요)라고 했으니 "아니요"라고 해야 해요.',
      ],
      hint: '뒤 문장 He is short.를 보고 "예"인지 "아니요"인지 먼저 정해요.',
      explain: '형이 키가 작다고 했으니 부정의 대답이에요. your brother는 he로 받아 No, he isn\'t.라고 해요.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 2,
      q: '"너의 언니는 간호사니?"라는 뜻이 되게 낱말을 순서대로 놓으세요.',
      choices: ['Is', 'your', 'sister', 'a', 'nurse?'],
      answer: [0, 1, 2, 3, 4],
      hint: '의문문은 be동사가 주어보다 먼저 나와요.',
      explain: 'be동사 의문문은 "be동사 + 주어 + 나머지?" 순서예요. Is + your sister + a nurse? → Is your sister a nurse?',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '다음 중 문장이 **옳지 않은** 것은 무엇일까요?',
      choices: ['I like he very much.', 'This book is mine.', 'Her name is Jia.', 'Our school is big.'],
      answer: 0,
      why: [
        '',
        'mine(나의 것)이 혼자 쓰여 바른 문장이에요.',
        'Her는 name 앞의 소유격이라 바른 문장이에요.',
        'Our는 school 앞의 소유격이라 바른 문장이에요.',
      ],
      explain: 'like 뒤는 목적어 자리이므로 he가 아니라 목적격 him을 써야 해요: I like **him** very much.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 5,
      q: '글을 읽고, 글의 내용과 **맞지 않는** 것을 고르세요.\n\nHi, everyone. I\'m Haeun. I\'m thirteen years old. I\'m from Mokpo, but now I live in Seoul. I\'m interested in robots. My favorite club is the science club. My best friend is Jiwoo. She is in my class. Nice to meet you all!',
      choices: ['해은이는 지금 목포에 살아요.', '해은이는 열세 살이에요.', '해은이는 로봇에 관심이 있어요.', '해은이의 가장 친한 친구는 같은 반이에요.'],
      answer: 0,
      why: [
        '',
        'I\'m thirteen years old.라고 했으니 글과 맞아요.',
        'I\'m interested in robots.라고 했으니 글과 맞아요.',
        'She is in my class.라고 했으니 글과 맞아요.',
      ],
      hint: '사는 곳은 from과 live in이 들어간 문장을 찾아 읽어요.',
      explain: 'I\'m from Mokpo, but now I live in Seoul.은 "목포 출신이지만 지금은 서울에 살아요"라는 뜻이에요. 지금 사는 곳은 서울이에요.',
    },
    {
      id: 'p12', level: 2, type: 'order', concept: 5,
      q: '자기소개 글이 되도록 문장을 순서대로 놓으세요.',
      choices: ['Hello, everyone.', "My name is Doyun, and I'm thirteen.", "I'm interested in cartoons.", 'Thank you for listening.'],
      answer: [0, 1, 2, 3],
      explain: '인사(Hello, everyone.) → 소개(이름·나이) → 관심사(만화) → 끝인사(Thank you for listening.) 순서예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 2,
      q: '대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: Are you and your brother in the same school?\nB: [[blank]] He is a high school student.',
      choices: ["No, we aren't.", 'Yes, we are.', "No, they aren't.", "No, I'm not."],
      answer: 0,
      why: [
        '',
        '뒤에서 형은 고등학생이라고 했으니 같은 학교가 아니에요. "아니요"로 대답해요.',
        '"너와 네 형"은 대답하는 사람 자신이 들어 있으니 they가 아니라 we로 받아요.',
        '질문의 주어는 "너와 네 형" 두 사람이에요. I가 아니라 we로 대답해요.',
      ],
      hint: '질문의 주어 you and your brother를 대답하는 사람의 입장에서 대명사로 바꾸어 보세요.',
      explain: '"너와 네 형"은 대답하는 사람에게는 "우리(we)"예요. 형이 고등학생이니 같은 학교가 아니므로 No, we aren\'t.예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', concept: 0,
      q: '다음 문장에서 **틀린 낱말 하나**를 찾아 바르게 고쳐 쓰세요. (고친 낱말만 쓰세요)\n\nMy sister and I is in the same club.',
      answer: ['are'],
      wrong: [
        { a: 'am', why: 'I 바로 뒤라서 am을 떠올렸지만 주어는 My sister and I, 곧 두 사람이에요. 복수 주어에는 are를 써요.' },
        { a: 'we', why: '주어는 고치지 않아도 돼요. 틀린 곳은 be동사예요.' },
      ],
      hint: '주어가 몇 사람인지 세어 보세요.',
      explain: '주어 My sister and I는 두 사람(복수)이므로 is가 아니라 are를 써요. My sister and I **are** in the same club.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '(A), (B)에 들어갈 말로 바르게 짝지은 것은 무엇일까요?\n\nThis is my cat. (A) name is Coco. I love (B) very much.',
      choices: ['Its — it', "It's — it", 'Its — its', "It's — its"],
      answer: 0,
      why: [
        '',
        "It's는 It is의 줄임말이에요. name 앞에는 소유격 Its를 써요.",
        'love 뒤는 목적어 자리라서 목적격 it을 써요. its는 소유격이에요.',
        "It's는 It is의 줄임말이고, its는 소유격이에요. (A)는 Its, (B)는 it이에요.",
      ],
      hint: '(A)는 명사 name 앞, (B)는 동사 love 뒤예요.',
      explain: '(A)는 "그것의 이름"이므로 소유격 Its, (B)는 love의 목적어이므로 목적격 it이에요. It\'s는 It is를 줄인 말이라 소유격으로 쓸 수 없어요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '빈칸에 **himself**가 들어가기에 알맞은 문장은 무엇일까요?',
      choices: [
        'Minho is angry at [[blank]] for his mistake.',
        'I know [[blank]] very well.',
        '[[blank]] is my cousin.',
        'This cap is [[blank]].',
      ],
      answer: 0,
      why: [
        '',
        '주어가 I이고 목적어는 다른 사람이에요. 주어와 목적어가 다르면 목적격 him을 써요.',
        '주어 자리에는 주격 He를 써요.',
        '"그의 것"이라는 뜻이므로 소유대명사 his를 써요.',
      ],
      hint: '주어와 목적어가 같은 사람인 문장을 찾아보세요.',
      explain: '주어 Minho와 화가 난 대상이 같은 사람이므로 재귀대명사 himself를 써요. "민호는 자기 실수 때문에 자신에게 화가 나 있어요."',
    },
    {
      id: 'a5', level: 3, type: 'short', concept: 5,
      q: '글을 읽고, 지호가 관심 있는 것을 **영어 두 낱말**로 쓰세요.\n\nHello! My name is Jiho. I\'m thirteen. I\'m a member of the cooking club. I\'m interested in Korean food. My favorite dish is bibimbap. It is healthy and colorful. Thank you!',
      answer: ['Korean food'],
      wrong: [
        { a: 'cooking club', why: '요리 동아리는 지호가 속한 동아리예요. 관심사는 interested in 뒤에 나와요.' },
        { a: 'bibimbap', why: '비빔밥은 가장 좋아하는 요리예요. 관심 있는 것은 interested in 뒤의 두 낱말이에요.' },
      ],
      hint: '"관심이 있다"는 be interested in이에요. 그 뒤를 보세요.',
      explain: 'I\'m interested in Korean food.(나는 한국 음식에 관심이 있어요.)라고 했으므로 답은 Korean food예요.',
    },
  ],

  deeper: [
    {
      title: '한국어에는 없는데 영어에는 있는 "연결 고리"',
      body: '한국어로는 "나는 행복해."라고 말하지요. 그런데 영어로 I happy.라고 하면 틀린 문장이에요. 영어 문장에는 주어 다음에 **동사가 꼭 하나** 있어야 하는데, happy는 동사가 아니라 상태를 나타내는 말(형용사)이기 때문이에요. 그래서 둘을 이어 줄 be동사가 필요해요: I **am** happy.\n\n반대로 동사가 이미 있으면 be동사를 또 쓰지 않아요. "나는 축구를 좋아해."는 I like soccer.예요. I am like soccer.는 동사가 두 개라서 틀려요.\n\n다음 단원에서는 like, play, go처럼 be동사가 아닌 **일반동사**의 현재형을 배워요. be동사와 일반동사를 구별하는 것이 중1 영어의 첫걸음이에요.',
    },
  ],

  faq: [
    {
      q: 'I am not은 왜 amn\'t로 안 줄여요?',
      a: '표준 영어에서는 am not을 한 낱말로 줄인 꼴을 쓰지 않아요. 대신 I am을 줄여 I\'m not이라고 해요. is not → isn\'t, are not → aren\'t는 줄일 수 있어요.',
    },
    {
      q: 'Yes, she\'s.라고 짧게 대답하면 안 돼요?',
      a: '안 돼요. 짧은 대답의 끝에 오는 be동사는 줄여 쓰지 않아요. Yes, she is.라고 해요. 부정의 대답은 No, she isn\'t. 또는 No, she\'s not.처럼 줄여도 돼요.',
    },
    {
      q: 'its랑 it\'s는 뭐가 달라요?',
      a: 'its는 "그것의"라는 소유격이고(its name), it\'s는 it is를 줄인 말이에요(It\'s my cat.). 헷갈리면 it is로 풀어 읽어 보세요. 말이 되면 it\'s, 안 되면 its예요.',
    },
    {
      q: 'my와 mine은 어떻게 구별해요?',
      a: 'my 뒤에는 꼭 명사가 와요(my bag). mine은 "나의 것"이라는 뜻이라 뒤에 명사 없이 혼자 써요(The bag is mine.). 뒤에 명사가 있는지 보면 돼요.',
    },
  ],

  mistakes: [
    '"My sister and I"처럼 두 사람이 주어인데 I만 보고 am이나 is를 쓰는 실수 — 주어가 여럿이면 are예요.',
    '긍정의 짧은 대답을 "Yes, I\'m."처럼 줄여 쓰는 실수 — Yes, I am.으로 줄이지 않고 써요.',
    'like, for 같은 말 뒤에 주격(he, she)을 쓰는 실수 — 동사·전치사 뒤에는 목적격(him, her)을 써요.',
  ],

  gens: [
    {
      id: 'be-verb-pick',
      level: 1,
      title: '주어에 맞는 be동사 고르기',
      make: function (R) {
        var subjects = [
          ['I', 'am', 'I'],
          ['You', 'are', 'you'],
          ['He', 'is', 'he'],
          ['She', 'is', 'she'],
          ['We', 'are', 'we'],
          ['They', 'are', 'they'],
          ['My mom', 'is', 'one'],
          ['Minsu', 'is', 'one'],
          ['Our teacher', 'is', 'one'],
          ['Jia and Seojun', 'are', 'many'],
          ['My friends', 'are', 'many'],
          ['The students', 'are', 'many'],
          ['My sister and I', 'are', 'many'],
          ['You and Hayun', 'are', 'many'],
        ];
        var rests = ['in the music room now.', 'very hungry.', 'from Gwangju.', 'at the bus stop.', 'good at English.', 'in the same club.'];
        var s = R.pick(subjects);
        var rest = R.pick(rests);
        var why = {
          am: 'am은 주어가 I일 때만 써요.',
          is: 'is는 주어가 한 사람·한 개(he, she, it, 단수 명사)일 때 써요.',
          are: 'are는 주어가 you이거나 여럿(we, they, 복수)일 때 써요.',
        };
        var reason;
        if (s[2] === 'I') reason = '주어가 I이므로 am을 써요.';
        else if (s[2] === 'you') reason = '주어가 you이므로 are를 써요.';
        else if (s[1] === 'is') reason = '주어(' + s[0] + ')가 한 사람(3인칭 단수)이므로 is를 써요.';
        else reason = '주어(' + s[0] + ')가 여럿(복수)이므로 are를 써요.';
        var pick = R.choices(s[1], ['am', 'are', 'is'].filter(function (x) { return x !== s[1]; }), 3);
        return {
          type: 'choice', concept: 0,
          q: '빈칸에 알맞은 말은 무엇일까요?\n\n' + s[0] + ' [[blank]] ' + rest,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === s[1] ? '' : why[c]; }),
          explain: reason + ' ' + s[0] + ' **' + s[1] + '** ' + rest,
        };
      },
    },
    {
      id: 'pronoun-case',
      level: 2,
      title: '인칭대명사의 알맞은 격 고르기',
      make: function (R) {
        var forms = {
          I: { subj: 'I', poss: 'my', obj: 'me', own: 'mine', self: 'myself', be: 'am', ko: '나' },
          he: { subj: 'he', poss: 'his', obj: 'him', own: 'his', self: 'himself', be: 'is', ko: '그' },
          she: { subj: 'she', poss: 'her', obj: 'her', own: 'hers', self: 'herself', be: 'is', ko: '그녀' },
          we: { subj: 'we', poss: 'our', obj: 'us', own: 'ours', self: 'ourselves', be: 'are', ko: '우리' },
          they: { subj: 'they', poss: 'their', obj: 'them', own: 'theirs', self: 'themselves', be: 'are', ko: '그들' },
        };
        var base = R.pick(['I', 'he', 'she', 'we', 'they']);
        var f = forms[base];
        var slots = [
          { kind: 'subj', text: 'I think [[blank]] ' + f.be + ' right.', ex: 'I think ' + f.subj + ' ' + f.be + ' right.', why: '문장의 주어 자리이므로 주격을 써요.' },
          { kind: 'subj', text: 'Now [[blank]] ' + f.be + ' in the library.', ex: 'Now ' + f.subj + ' ' + f.be + ' in the library.', why: '문장의 주어 자리이므로 주격을 써요.' },
          { kind: 'poss', text: 'Science is [[blank]] favorite subject.', ex: 'Science is ' + f.poss + ' favorite subject.', why: '명사(favorite subject) 앞에서 "~의"라는 뜻이므로 소유격을 써요.' },
          { kind: 'poss', text: 'This is [[blank]] new phone.', ex: 'This is ' + f.poss + ' new phone.', why: '명사(new phone) 앞에서 "~의"라는 뜻이므로 소유격을 써요.' },
          { kind: 'obj', text: 'This letter is for [[blank]].', ex: 'This letter is for ' + f.obj + '.', why: '전치사 for 뒤(목적어 자리)이므로 목적격을 써요.' },
          { kind: 'obj', text: 'Jia is kind to [[blank]].', ex: 'Jia is kind to ' + f.obj + '.', why: '전치사 to 뒤(목적어 자리)이므로 목적격을 써요.' },
          { kind: 'own', text: 'That blue umbrella is [[blank]].', ex: 'That blue umbrella is ' + f.own + '.', why: '뒤에 명사 없이 "~의 것"이라는 뜻이므로 소유대명사를 써요.' },
          { kind: 'own', text: 'These seats are [[blank]].', ex: 'These seats are ' + f.own + '.', why: '뒤에 명사 없이 "~의 것"이라는 뜻이므로 소유대명사를 써요.' },
        ];
        var slot = R.pick(slots);
        var correct = f[slot.kind];
        var all = [f.subj, f.poss, f.obj, f.own, f.self];
        var wrongs = R.shuffle(all.filter(function (x) { return x !== correct; }));
        var pick = R.choices(correct, wrongs, 4);
        var label = { subj: '주격', poss: '소유격', obj: '목적격', own: '소유대명사', self: '재귀대명사' };
        function labelOf(w) {
          // her(소유격·목적격), his(소유격·소유대명사)처럼 한 낱말이 두 격을 맡기도 한다
          return ['subj', 'poss', 'obj', 'own', 'self'].filter(function (k) { return f[k] === w; }).map(function (k) { return label[k]; }).join('·');
        }
        return {
          type: 'choice', concept: 3,
          q: '괄호 안의 낱말을 알맞은 꼴로 바꿀 때, 빈칸에 들어갈 말은 무엇일까요?\n\n' + slot.text + ' (' + base + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            if (c === correct) return '';
            var k = labelOf(c);
            return k + '(' + c + ')' + R.josa(k, '이에요/예요') + '. ' + slot.why;
          }),
          explain: slot.why + '\n\n' + base + ' → ' + label[slot.kind] + ': **' + correct + '**\n\n' + slot.ex,
        };
      },
    },
  ],

  vocab: [
    { w: 'introduce', m: '소개하다', ex: 'Let me introduce myself.', exm: '제 소개를 할게요.' },
    { w: 'favorite', m: '가장 좋아하는', ex: 'My favorite subject is music.', exm: '내가 가장 좋아하는 과목은 음악이에요.' },
    { w: 'hobby', m: '취미', ex: 'What is your hobby?', exm: '너의 취미는 뭐니?' },
    { w: 'interested', m: '관심 있는', ex: 'I am interested in space.', exm: '나는 우주에 관심이 있어요.' },
    { w: 'classmate', m: '반 친구', ex: 'Jia is my classmate.', exm: '지아는 우리 반 친구예요.' },
    { w: 'grade', m: '학년', ex: 'I am in the first grade of middle school.', exm: '나는 중학교 1학년이에요.' },
    { w: 'club', m: '동아리', ex: 'Are you in the art club?', exm: '너는 미술 동아리에 있니?' },
    { w: 'member', m: '회원, 구성원', ex: 'She is a member of the soccer team.', exm: '그녀는 축구팀의 구성원이에요.' },
    { w: 'shy', m: '수줍어하는', ex: "I'm a little shy, but I'm friendly.", exm: '나는 조금 수줍음이 많지만 친절해요.' },
    { w: 'friendly', m: '친절한, 다정한', ex: 'My new classmates are friendly.', exm: '우리 반 새 친구들은 다정해요.' },
    { w: 'honest', m: '정직한', ex: 'He is an honest boy.', exm: '그는 정직한 소년이에요.' },
    { w: 'dream', m: '꿈', ex: 'I have a big dream.', exm: '나는 큰 꿈이 있어요.' },
    { w: 'proud', m: '자랑스러워하는', ex: 'We are proud of ourselves.', exm: '우리는 우리 자신이 자랑스러워요.' },
    { w: 'hometown', m: '고향', ex: 'My hometown is Jeonju.', exm: '내 고향은 전주예요.' },
  ],
});
