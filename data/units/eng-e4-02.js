/* 4학년 영어 · 친구와 가족 소개하기 */
Tutor.registerUnit({
  id: 'eng-e4-02',
  course: 'eng-e4',
  title: '친구와 가족 소개하기',
  summary: 'This is my friend ~.로 사람을 소개하고, Who is he?와 How old is he?로 누구인지와 나이를 묻고 답해요.',
  goals: [
    'This is my friend, Mina. 처럼 사람을 소개하고, 소개받으면 Nice to meet you. 하고 인사할 수 있어요.',
    '남자는 he, 여자는 she 로 가리켜 말할 수 있어요.',
    '가족 낱말(mom, dad, brother, sister, grandma, grandpa, uncle, aunt)을 알고 Who is she? 에 답할 수 있어요.',
    'How old are you? / How old is he? 로 나이를 묻고 답할 수 있어요.',
  ],
  standards: ['[4영02-05]', '[4영01-06]', '[4영02-08]', '[4영02-09]'],

  concepts: [
    {
      title: '사람 소개하기',
      body: '옆에 있는 사람을 소개할 때는 **This is** 다음에 그 사람을 써요.\n- **This is my friend, Mina.** 이 아이는 내 친구 미나야.\n- **This is my brother.** 이 아이는 내 남동생이야.\n\n소개를 받은 사람끼리는 이렇게 인사해요.\n\n| 먼저 하는 인사 | 받는 인사 |\n|---|---|\n| **Nice to meet you.** 만나서 반가워. | **Nice to meet you, too.** 나도 만나서 반가워. |\n\n> 💡 too 는 "~도"라는 뜻이에요. 상대가 먼저 반갑다고 했으니 "나도"를 붙여 대답해요.',
      easy: '친구 둘을 서로 인사시킨다고 생각해 보세요. 손으로 친구를 가리키며 "이 아이는 내 친구 미나야." 하고 말하지요. 영어로는 This is my friend, Mina. 예요.\n\n그러면 두 친구가 서로 "반가워!" "나도 반가워!" 하고 인사해요.\n- 반가워! → Nice to meet you.\n- 나도 반가워! → Nice to meet you, too.',
      check: {
        type: 'choice',
        q: 'Nice to meet you. 하고 인사를 받았을 때 알맞은 대답을 고르세요.',
        choices: ['Nice to meet you, too.', 'This is my friend.', 'I\'m fine, thank you.'],
        answer: 0,
        why: ['', 'This is my friend. 는 다른 사람을 소개하는 말이에요. 인사에 대한 대답이 아니에요.', 'I\'m fine, thank you. 는 How are you? 에 대한 대답이에요.'],
        explain: '처음 만나 반갑다는 인사에는 "나도"를 붙여 Nice to meet you, too. 하고 대답해요.',
      },
    },
    {
      title: '남자는 he, 여자는 she',
      body: '앞에서 말한 사람을 다시 가리킬 때 이름 대신 **he** 나 **she** 를 써요.\n\n| 가리키는 사람 | 낱말 | 예 |\n|---|---|---|\n| 남자 한 사람 | **he** (그, 그 남자) | **He** is my brother. |\n| 여자 한 사람 | **she** (그녀, 그 여자) | **She** is my sister. |\n\n**He is** 는 **He\'s**, **She is** 는 **She\'s** 로 줄여 쓸 수 있어요.\n- This is Minsu. **He\'s** my friend.\n- This is Jia. **She\'s** my friend.\n\n> ⚠️ he·she 다음에는 is 를 써요. He are, She am 이라고 하지 않아요.',
      easy: '우리말로 "민수는 내 친구야. 걔는 열 살이야." 할 때 "걔"처럼 다시 가리키는 말이 he 와 she 예요.\n\n- 남자 친구, 아빠, 할아버지, 삼촌 → he\n- 여자 친구, 엄마, 할머니, 이모 → she\n\n남자인지 여자인지만 보고 고르면 돼요.',
      check: {
        type: 'ox',
        q: 'She is my brother. 는 바른 문장이에요.',
        answer: false,
        explain: 'brother 는 남자 형제라서 he 로 가리켜요. 바르게 고치면 He is my brother. 예요. (여자 형제라면 She is my sister.)',
      },
    },
    {
      title: '가족을 나타내는 낱말',
      body: '가족을 소개할 때 쓰는 낱말이에요.\n\n| he 로 가리켜요 | 뜻 | she 로 가리켜요 | 뜻 |\n|---|---|---|---|\n| **dad** | 아빠 | **mom** | 엄마 |\n| **grandpa** | 할아버지 | **grandma** | 할머니 |\n| **brother** | 형, 오빠, 남동생 | **sister** | 누나, 언니, 여동생 |\n| **uncle** | 삼촌, 이모부, 고모부 | **aunt** | 이모, 고모, 숙모 |\n\n우리말은 형·오빠·남동생처럼 나이와 말하는 사람에 따라 다르게 부르지만, 영어는 남자 형제를 모두 **brother**, 여자 형제를 모두 **sister** 라고 해요.\n\n> 💡 mom 과 dad 는 집에서 친근하게 부르는 말이에요. 예의를 갖춰 말할 때는 mother(어머니), father(아버지)라고 해요.',
      easy: '가족을 남자 칸과 여자 칸으로 나누어 보세요.\n- 남자 칸: dad(아빠), grandpa(할아버지), brother(남자 형제), uncle(삼촌)\n- 여자 칸: mom(엄마), grandma(할머니), sister(여자 형제), aunt(이모, 고모)\n\n짝을 지어 외우면 쉬워요. dad와 mom, grandpa와 grandma, brother와 sister, uncle과 aunt.',
      check: {
        type: 'choice',
        q: '다음 낱말의 뜻으로 알맞은 것을 고르세요.\n\n**aunt**',
        choices: ['이모, 고모', '삼촌', '할머니'],
        answer: 0,
        why: ['', '삼촌은 uncle 이에요. aunt 는 uncle 의 짝인 여자 어른이에요.', '할머니는 grandma 예요.'],
        explain: 'aunt 는 이모, 고모, 숙모처럼 부모님의 여자 형제나 친척 어른이에요. 그래서 she 로 가리켜요.',
      },
    },
    {
      title: 'Who is she? 누구인지 묻고 답하기',
      body: '사진이나 그림 속 사람이 누구인지 물을 때 **Who is** 다음에 he 나 she 를 써요.\n- **Who is he?** 그는 누구니?\n- **Who is she?** 그녀는 누구니?\n\n대답할 때도 같은 낱말로 시작해요.\n- Who is **he**? — **He\'s** my grandpa.\n- Who is **she**? — **She\'s** my aunt.\n\n> 💡 who 는 "누구"라는 뜻이에요. Who is 는 줄여서 Who\'s 라고도 해요.',
      easy: '친구가 내 가족사진을 보며 손가락으로 한 사람을 가리켜요. "이분은 누구셔?" 하고 묻지요.\n\n남자를 가리키면 Who is he?, 여자를 가리키면 Who is she? 예요.\n\n대답은 질문에 나온 he 나 she 를 그대로 받아서 He\'s my ~. 나 She\'s my ~. 로 해요.',
      check: {
        type: 'choice',
        q: 'Who is she? 에 대한 대답으로 알맞은 것을 고르세요.',
        choices: ['She\'s my grandma.', 'He\'s my grandpa.', 'She\'s seven.'],
        answer: 0,
        why: ['', '질문은 여자(she)를 물었어요. 대답도 She 로 시작하고 여자 가족을 말해요.', 'She\'s seven. 은 나이를 말하는 대답이에요. Who 는 누구인지를 물어요.'],
        explain: 'Who is she? 는 "그녀는 누구니?"예요. 그래서 She\'s my grandma.(할머니야.)처럼 누구인지 대답해요.',
      },
    },
    {
      title: 'How old 나이 묻고 답하기',
      body: '나이를 물을 때는 **How old** 를 써요. old 는 "나이가 ~인"이라는 뜻이에요.\n\n| 묻는 말 | 대답 |\n|---|---|\n| **How old are you?** 너는 몇 살이니? | **I\'m** ten. 나는 열 살이야. |\n| **How old is he?** 그는 몇 살이니? | **He\'s** seven. 그는 일곱 살이야. |\n| **How old is she?** 그녀는 몇 살이니? | **She\'s** nine. 그녀는 아홉 살이야. |\n\n나이는 수를 나타내는 낱말로 말해요.\none(1) two(2) three(3) four(4) five(5) six(6) seven(7) eight(8) nine(9) ten(10)\n\n> ⚠️ you 에게 물으면 are, he·she 에게 물으면 is 를 써요. 대답은 I\'m / He\'s / She\'s 로 질문에 맞춰요.',
      easy: '"몇 살이야?"를 영어로는 "얼마나 나이 들었니?"처럼 How old 라고 물어요.\n\n대답은 간단해요. 나는 I\'m, 남자는 He\'s, 여자는 She\'s 다음에 나이를 나타내는 수 낱말 하나만 붙이면 돼요.\n- 나는 열 살 → I\'m ten.\n- 남동생은 일곱 살 → He\'s seven.',
      check: {
        type: 'short', check: 'text',
        q: '빈칸에 알맞은 낱말을 영어로 쓰세요. (아홉 살)\n\nA: How old is he?\nB: He\'s [[nine]].',
        answer: ['nine'],
        wrong: [{ a: 'five', why: 'five 는 다섯(5)이에요. 아홉(9)은 nine 이에요.' }],
        explain: '아홉 살이니까 He\'s nine. 이에요. nine 은 9 를 나타내는 낱말이에요.',
      },
    },
    {
      title: '가족 소개 카드 만들기',
      body: '가족 그림에 이름과 가족 낱말을 써 넣고, 배운 말로 한 사람씩 소개해 보세요.\n\n1. 가족 그림을 그려요.\n2. 사람마다 아래에 가족 낱말과 이름을 써요. (예: dad, sister Yuna)\n3. **This is my ~.** 로 한 사람씩 소개해요.\n4. **He\'s / She\'s** 로 나이 같은 것을 덧붙여요.\n\n| 소개 카드 |\n|---|\n| This is my family. |\n| This is my dad. This is my mom. |\n| This is my sister, Yuna. She\'s five. |\n| And this is me, Jiho. I\'m ten. |\n\n> 💡 나를 소개할 때는 this is me 라고 해요. me 는 "나"라는 뜻이에요.',
      easy: '소개 카드는 "가족 그림 + 이름표"예요. 그림 속 사람 아래에 이름표를 붙인다고 생각해 보세요. 엄마 그림 아래에는 mom, 여동생 그림 아래에는 sister Yuna.\n\n그다음 이름표를 보면서 This is my mom. This is my sister, Yuna. 하고 읽으면 소개가 끝나요.',
      check: {
        type: 'choice',
        q: '소개 카드에서 할아버지를 소개하는 문장으로 알맞은 것을 고르세요.',
        choices: ['This is my grandpa.', 'This is my grandma.', 'Who is my grandpa?'],
        answer: 0,
        why: ['', 'grandma 는 할머니예요. 할아버지는 grandpa 예요.', 'Who is ~? 는 누구인지 묻는 말이에요. 소개할 때는 This is ~. 를 써요.'],
        explain: '소개할 때는 This is my ~. 를 쓰고, 할아버지는 grandpa 예요. 그래서 This is my grandpa. 예요.',
      },
    },
  ],

  examples: [
    {
      q: '지아가 친구 도윤을 엄마에게 소개해요. 대화를 완성해 보세요.\n\nJia: Mom, [[this is my friend]], Doyun.\nMom: Hi, Doyun. Nice to meet you.\nDoyun: [[nice to meet you, too]]',
      steps: [
        '친구를 소개할 때는 This is my friend, 다음에 이름을 써요: This is my friend, Doyun.',
        '엄마가 Nice to meet you.(만나서 반가워.) 하고 먼저 인사했어요.',
        '도윤은 "저도 반가워요"라고 해야 하니 too 를 붙여요: Nice to meet you, too.',
      ],
      answer: 'Jia: Mom, **this is my friend**, Doyun.\nDoyun: **Nice to meet you, too.**',
    },
    {
      q: '지호의 가족 그림에 이렇게 적혀 있어요.\n\n- 할아버지: grandpa\n- 남동생: brother Minho, 6살\n\n지호가 두 사람을 소개하는 말을 만들어 보세요.',
      steps: [
        '할아버지는 grandpa 예요. 소개하는 말은 This is my grandpa.',
        '남동생은 brother, 이름은 Minho 예요. This is my brother, Minho.',
        '남동생은 남자이니 he 로 가리켜요. 여섯 살은 six 이니 He\'s six.',
      ],
      answer: 'This is my grandpa. This is my brother, Minho. He\'s six.',
    },
  ],

  terms: [
    { term: 'he', def: '남자 한 사람을 가리키는 말이에요. "그, 그 남자". 예: He is my dad.' },
    { term: 'she', def: '여자 한 사람을 가리키는 말이에요. "그녀, 그 여자". 예: She is my mom.' },
    { term: 'who', def: '"누구"라는 뜻으로 사람이 누구인지 물을 때 써요. 예: Who is he?' },
    { term: 'How old', def: '"몇 살"이라는 뜻으로 나이를 물을 때 써요. 예: How old are you? — I\'m ten.' },
    { term: '줄임말', def: '두 낱말을 줄여 하나로 쓴 말이에요. 예: He is → He\'s, She is → She\'s, I am → I\'m' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 들어갈 말로 알맞은 것을 고르세요.\n\nA: This is my friend, Mina.\nB: Hi, Mina. Nice to meet you.\nMina: [[Nice to meet you, too.]]',
      choices: ['Nice to meet you, too.', 'This is my friend.', 'I\'m ten.', 'That\'s too bad.'],
      answer: 0,
      why: [
        '',
        'This is my friend. 는 다른 사람을 소개하는 말이에요. 인사를 받았으니 인사로 대답해요.',
        'I\'m ten. 은 나이를 말하는 대답이에요. 아무도 나이를 묻지 않았어요.',
        'That\'s too bad. 는 좋지 않은 일에 하는 말이에요. 반갑다는 인사에는 알맞지 않아요.',
      ],
      explain: 'B가 Nice to meet you.(만나서 반가워.) 하고 인사했으니 미나는 Nice to meet you, too.(나도 반가워.) 하고 대답해요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 들어갈 말로 알맞은 것을 고르세요.\n\n[[She]] is my sister.',
      choices: ['She', 'He', 'I', 'It'],
      answer: 0,
      why: [
        '',
        'He 는 남자를 가리켜요. sister 는 여자 형제예요.',
        'I 다음에는 is 가 아니라 am 이 와요. 그리고 나는 나의 sister 가 아니에요.',
        'It 은 사람이 아닌 물건이나 동물을 가리킬 때 써요.',
      ],
      explain: 'sister 는 누나·언니·여동생이에요. 여자 한 사람은 She 로 가리켜요: She is my sister.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 2,
      q: '우리말 뜻에 맞는 영어 낱말을 쓰세요.\n\n할머니',
      answer: ['grandma', 'grandmother'],
      wrong: [{ a: 'grandpa', why: 'grandpa 는 할아버지예요. 할머니는 grandma 예요.' }],
      explain: '할머니는 grandma 예요. grandmother 라고도 하니 이것도 정답이에요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: 'uncle(삼촌)을 다시 가리킬 때는 she 를 써요.',
      answer: false,
      explain: 'uncle 은 남자 어른이라서 he 를 써요. 예: This is my uncle. He\'s nice. (she 는 aunt 처럼 여자를 가리켜요.)',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: 'Who is he? 에 대한 대답으로 알맞은 것을 고르세요.',
      choices: ['He\'s my dad.', 'She\'s my mom.', 'I\'m ten.', 'Nice to meet you.'],
      answer: 0,
      why: [
        '',
        '질문은 남자(he)가 누구인지 물었어요. She 로 대답하면 여자 이야기가 돼요.',
        'I\'m ten. 은 내 나이예요. 질문은 그 남자가 누구인지 물어요.',
        'Nice to meet you. 는 처음 만났을 때 하는 인사예요.',
      ],
      explain: 'Who is he? 는 "그는 누구니?"예요. He 로 시작해서 He\'s my dad.(우리 아빠야.)처럼 대답해요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 4,
      q: 'How old are you? 에 대한 대답으로 알맞은 것을 고르세요.',
      choices: ['I\'m ten.', 'I\'m fine.', 'He\'s ten.', 'Yes, I am.'],
      answer: 0,
      why: [
        '',
        'I\'m fine. 은 How are you? 에 대한 대답이에요. How old 는 나이를 물어요.',
        '질문은 너(you)의 나이를 물었어요. 내 나이는 I\'m 으로 말해요.',
        'Yes, I am. 은 Are you ~? 처럼 예/아니오로 묻는 질문의 대답이에요.',
      ],
      explain: 'How old are you? 는 "너는 몇 살이니?"예요. I\'m ten.(나는 열 살이야.)처럼 I\'m 다음에 나이를 말해요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 4,
      q: '빈칸에 알맞은 낱말을 숫자가 아닌 영어로 쓰세요. (여덟 살)\n\nA: How old is she?\nB: She\'s [[eight]].',
      answer: ['eight'],
      wrong: [
        { a: '8', why: '숫자도 뜻은 맞지만 이 문제는 영어 낱말로 쓰는 연습이에요. 8 은 eight 예요.' },
        { a: 'eigth', why: '철자를 다시 보세요. e-i-g-h-t 순서예요.' },
      ],
      explain: '여덟은 eight 예요. She\'s eight. 는 "그녀는 여덟 살이야."라는 뜻이에요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 4,
      q: '낱말을 바르게 늘어놓아 "그는 몇 살이니?" 하는 질문을 만드세요.',
      choices: ['How', 'old', 'is', 'he?'],
      answer: [0, 1, 2, 3],
      hint: '나이를 묻는 두 낱말로 시작해요.',
      explain: '나이를 물을 때는 How old 로 시작하고, he 에 대해 물으니 is 를 써요: How old is he?',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '빈칸에 들어갈 말로 알맞은 것을 고르세요.\n\nA: Who is she?\nB: [[She\'s my aunt.]]',
      choices: ['She\'s my aunt.', 'He\'s my uncle.', 'She\'s seven.', 'I\'m Mina.'],
      answer: 0,
      hint: 'Who 는 "누구"예요. 질문에 나온 she 도 살펴보세요.',
      why: [
        '',
        '질문은 여자(she)를 물었어요. He\'s my uncle. 은 남자를 소개하는 말이에요.',
        'She\'s seven. 은 나이를 말해요. Who 는 누구인지를 물어요.',
        'I\'m Mina. 는 내 이름을 말하는 것이에요. 질문은 그 여자가 누구인지 물어요.',
      ],
      explain: 'Who is she? 는 그녀가 누구인지 묻는 말이라서 She\'s my aunt.(우리 이모야.)처럼 대답해요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 5,
      q: '지호의 소개 카드를 읽고 물음에 답하세요.\n\nThis is my family.\nThis is my dad. This is my mom.\nThis is my sister, Yuna. She\'s five.\nAnd this is me, Jiho. I\'m ten.\n\nYuna 는 몇 살일까요?',
      choices: ['다섯 살', '열 살', '네 살', '여섯 살'],
      answer: 0,
      hint: 'Yuna 를 소개한 문장 다음 문장을 보세요.',
      why: [
        '',
        '열 살(ten)은 지호의 나이예요. I\'m ten. 은 지호가 자기를 소개한 말이에요.',
        '네 살은 four 예요. 카드에는 five 라고 쓰여 있어요.',
        '여섯 살은 six 예요. 카드에는 five 라고 쓰여 있어요.',
      ],
      explain: 'This is my sister, Yuna. 다음에 She\'s five. 라고 했어요. five 는 5 이니 Yuna 는 다섯 살이에요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'text', concept: 2,
      q: '알맞은 영어 낱말을 쓰세요.\n\n아빠의 남동생, 엄마의 남동생처럼 부모님의 남자 형제를 부르는 말',
      answer: ['uncle'],
      hint: 'he 로 가리키는 가족 낱말이에요.',
      wrong: [
        { a: 'aunt', why: 'aunt 는 이모·고모처럼 여자 어른이에요. 남자 어른은 uncle 이에요.' },
        { a: 'brother', why: 'brother 는 나의 형제예요. 부모님의 남자 형제는 uncle 이에요.' },
      ],
      explain: '삼촌, 외삼촌처럼 부모님의 남자 형제는 uncle 이에요. 여자 형제는 aunt 예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: '미나가 사진 속 할아버지를 가리키며 물었어요. 빈칸 ㉠, ㉡에 들어갈 말을 차례대로 고르세요.\n\nMina: Who is ㉠?\nJiho: ㉡\'s my grandpa.',
      choices: ['he — He', 'she — She', 'he — She', 'she — He'],
      answer: 0,
      hint: '할아버지는 남자예요. 묻는 말과 대답에 같은 사람을 가리키는 말이 와요.',
      why: [
        '',
        'she 는 여자를 가리켜요. 할아버지는 남자예요.',
        '묻는 말은 맞았지만 대답에서 She 로 바뀌었어요. 같은 사람이니 대답도 He 예요.',
        '묻는 말에서 she 를 썼어요. 할아버지는 남자라서 he 로 물어요.',
      ],
      explain: '할아버지는 남자라서 묻는 말도 Who is he?, 대답도 He\'s my grandpa. 예요.',
    },
    {
      id: 'a2', level: 3, type: 'order', concept: 0,
      q: '대화가 자연스럽게 이어지도록 순서대로 놓으세요.',
      choices: ['Hi, Jia. This is my friend, Doyun.', 'Hi, Doyun. Nice to meet you.', 'Nice to meet you, too.', 'How old are you, Doyun?', 'I\'m ten.'],
      answer: [0, 1, 2, 3, 4],
      hint: '먼저 소개하고, 인사를 주고받은 다음, 나이를 묻고 답해요.',
      explain: '소개(This is my friend, Doyun.) → 지아의 인사(Nice to meet you.) → 도윤의 대답(Nice to meet you, too.) → 나이 묻기(How old are you, Doyun?) → 대답(I\'m ten.) 순서예요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 5,
      q: '글을 읽고 물음에 답하세요.\n\nThis is my brother, Minho. He\'s nine.\nThis is my sister, Suji. She\'s six.\nAnd this is me. I\'m ten.\n\n글의 내용과 **맞지 않는** 것을 고르세요.',
      choices: ['Minho 는 여자예요.', 'Suji 는 여섯 살이에요.', '글쓴이는 열 살이에요.', 'Minho 는 아홉 살이에요.'],
      answer: 0,
      hint: 'he 와 she 가 누구를 가리키는지 살펴보세요.',
      why: [
        '',
        'She\'s six. 라고 했으니 Suji 는 여섯 살이 맞아요.',
        'I\'m ten. 이라고 했으니 글쓴이는 열 살이 맞아요.',
        'He\'s nine. 이라고 했으니 Minho 는 아홉 살이 맞아요.',
      ],
      explain: 'Minho 는 brother 라고 소개했고 He 로 가리켰으니 남자예요. 그래서 "Minho 는 여자예요."가 글과 맞지 않아요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'text', concept: 1,
      q: '빈칸에 알맞은 낱말을 한 개 쓰세요.\n\nA: How old is your sister?\nB: [[She]]\'s eight.',
      answer: ['she'],
      hint: 'sister 를 다시 가리키는 말이에요.',
      wrong: [
        { a: 'he', why: 'he 는 남자를 가리켜요. sister 는 여자 형제라서 she 예요.' },
        { a: 'I', why: '질문은 너의 sister 를 물었어요. 내 나이가 아니라 sister 의 나이를 말해요.' },
      ],
      explain: 'your sister(너의 여자 형제)를 다시 가리키니 She 를 써요: She\'s eight.(그녀는 여덟 살이야.)',
    },
  ],

  deeper: [
    {
      title: '형인지 남동생인지 영어로 구별하려면?',
      body: '영어는 형·오빠·남동생을 모두 brother, 누나·언니·여동생을 모두 sister 라고 해요. 그래도 꼭 구별하고 싶을 때는 앞에 낱말을 하나 붙여요.\n\n| 말 | 뜻 |\n|---|---|\n| big brother | 형, 오빠 |\n| little brother | 남동생 |\n| big sister | 누나, 언니 |\n| little sister | 여동생 |\n\n큰(big)과 작은(little)이라는 낱말로 나이가 많고 적음을 나타내는 거예요. 5학년에서는 사람의 모습(키, 머리 모양)을 묘사하는 말도 배워요.',
    },
  ],

  faq: [
    {
      q: 'brother 는 형이에요, 남동생이에요?',
      a: '둘 다예요. 영어는 나이와 상관없이 남자 형제를 brother 라고 해요. 그래서 형도, 오빠도, 남동생도 brother 예요. 여자 형제는 모두 sister 예요.',
    },
    {
      q: 'He\'s 랑 He is 는 같은 말이에요?',
      a: '네, 같은 말이에요. He\'s 는 He is 를 줄여 쓴 것이에요. 말할 때는 줄인 꼴을 많이 써요. She\'s(She is), I\'m(I am)도 마찬가지예요.',
    },
    {
      q: '처음 만난 사람이 Nice to meet you. 하면 똑같이 말하면 안 돼요?',
      a: '똑같이 말해도 뜻은 통하지만, 끝에 too(~도)를 붙여 Nice to meet you, too. 라고 하면 "나도 반가워"가 되어 더 자연스러워요.',
    },
  ],

  mistakes: [
    'brother 나 uncle 을 she 로 가리키는 실수 — 남자는 he, 여자는 she 예요. He is my brother.',
    'How old is he? 에 I\'m seven. 하고 대답하는 실수 — he 에 대해 물었으니 He\'s seven. 이에요.',
    'Nice to meet you. 에 대답할 때 too 를 빠뜨리는 실수 — Nice to meet you, too. 라고 해요.',
  ],

  gens: [
    {
      id: 'he-or-she',
      level: 1,
      title: 'he 와 she 고르기',
      make: function (R) {
        var fam = [
          { w: 'dad', k: '아빠', he: true }, { w: 'grandpa', k: '할아버지', he: true }, { w: 'brother', k: '남자 형제', he: true }, { w: 'uncle', k: '삼촌', he: true },
          { w: 'mom', k: '엄마', he: false }, { w: 'grandma', k: '할머니', he: false }, { w: 'sister', k: '여자 형제', he: false }, { w: 'aunt', k: '이모나 고모', he: false },
        ];
        var kids = [
          { n: 'Minsu', k: '민수', he: true }, { n: 'Seojun', k: '서준', he: true }, { n: 'Doyun', k: '도윤', he: true },
          { n: 'Mina', k: '미나', he: false }, { n: 'Jia', k: '지아', he: false }, { n: 'Sua', k: '수아', he: false },
        ];
        var form = R.int(0, 2);
        var q, isHe, who;
        if (form === 2) {
          var kid = R.pick(kids);
          var age = R.pick(['eight', 'nine', 'ten']);
          isHe = kid.he;
          who = kid.k + R.josa(kid.k, '은/는') + ' ' + (kid.he ? '남자아이' : '여자아이') + '예요.';
          q = '빈칸에 들어갈 말로 알맞은 것을 고르세요. (' + who + ')\n\nThis is my friend, ' + kid.n + '. [[빈칸]] is ' + age + '.';
        } else {
          var f = R.pick(fam);
          isHe = f.he;
          who = '가리키는 사람은 ' + f.k + '(' + f.w + ')' + R.josa(f.k, '이에요/예요') + '. ' + (f.he ? '남자' : '여자') + ' 가족이에요.';
          q = form === 0
            ? '빈칸에 들어갈 말로 알맞은 것을 고르세요.\n\n[[빈칸]] is my ' + f.w + '.'
            : '빈칸에 들어갈 말로 알맞은 것을 고르세요.\n\nA: Who is she?\nB: [[빈칸]]\'s my ' + f.w + '.';
          if (form === 1 && f.he) {
            // 질문이 she 이면 대답도 she 여야 하므로, 남자 가족은 he 로 묻는다
            q = '빈칸에 들어갈 말로 알맞은 것을 고르세요.\n\nA: Who is he?\nB: [[빈칸]]\'s my ' + f.w + '.';
          }
        }
        var correct = isHe ? 'He' : 'She';
        var reason = {
          He: 'He 는 남자를 가리켜요. 여기서 가리키는 사람은 여자예요.',
          She: 'She 는 여자를 가리켜요. 여기서 가리키는 사람은 남자예요.',
          I: 'I 는 "나"예요. 나를 말할 때는 I\'m 을 쓰고, 다른 사람을 가리킬 때는 he 나 she 를 써요.',
          It: 'It 은 물건이나 동물을 가리킬 때 써요. 사람은 he 나 she 로 가리켜요.',
        };
        var pick = R.choices(correct, ['He', 'She', 'I', 'It']);
        return {
          type: 'choice', concept: 1,
          q: q,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: who + ' 그래서 ' + (isHe ? '남자 한 사람을 가리키는 He' : '여자 한 사람을 가리키는 She') + '를 써요.',
        };
      },
    },
    {
      id: 'how-old',
      level: 2,
      title: '나이를 영어 낱말로 대답하기',
      make: function (R) {
        var words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
        var kor = ['한', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉', '열'];
        var form = R.int(0, 1);
        var age, he, q, info;
        if (form === 0) {
          he = R.bool();
          age = R.int(1, 9);
          info = (he ? '남동생' : '여동생') + '은 ' + kor[age - 1] + ' 살이에요.';
          q = '빈칸에 알맞은 낱말을 숫자가 아닌 영어로 쓰세요. (B의 ' + info + ')\n\nA: Who is ' + (he ? 'he' : 'she') + '?\nB: ' + (he ? 'He' : 'She') + '\'s my ' + (he ? 'brother' : 'sister') + '.\nA: How old is ' + (he ? 'he' : 'she') + '?\nB: ' + (he ? 'He' : 'She') + '\'s [[빈칸]].';
        } else {
          var kid = R.pick([
            { n: 'Minsu', k: '민수', he: true }, { n: 'Seojun', k: '서준', he: true }, { n: 'Doyun', k: '도윤', he: true },
            { n: 'Mina', k: '미나', he: false }, { n: 'Jia', k: '지아', he: false }, { n: 'Sua', k: '수아', he: false },
          ]);
          he = kid.he;
          age = R.int(8, 10);
          info = kid.k + R.josa(kid.k, '은/는') + ' ' + kor[age - 1] + ' 살이에요.';
          q = '빈칸에 알맞은 낱말을 숫자가 아닌 영어로 쓰세요. (' + info + ')\n\nA: This is my friend, ' + kid.n + '.\nB: How old is ' + (he ? 'he' : 'she') + '?\nA: ' + (he ? 'He' : 'She') + '\'s [[빈칸]].';
        }
        var w = words[age - 1];
        var near = age < 10 ? words[age] : words[age - 2];
        return {
          type: 'short', check: 'text', concept: 4,
          q: q,
          answer: [w],
          wrong: [
            { a: String(age), why: '숫자도 뜻은 맞지만 이 문제는 영어 낱말로 쓰는 연습이에요. ' + age + ' → ' + w },
            { a: near, why: '수를 다시 확인해 보세요. ' + near + ' → ' + (words.indexOf(near) + 1) + ', ' + w + ' → ' + age },
          ],
          explain: kor[age - 1] + ' 살은 영어 낱말로 ' + w + '(' + age + ')' + R.josa(age, '이에요/예요') + '.\n\n' + (he ? 'He' : 'She') + '\'s ' + w + '. — ' + (he ? '그는 ' : '그녀는 ') + kor[age - 1] + ' 살이야.',
        };
      },
    },
  ],

  vocab: [
    { w: 'mom', m: '엄마', ex: 'This is my mom.', exm: '이분은 우리 엄마예요.' },
    { w: 'dad', m: '아빠', ex: 'Who is he? He\'s my dad.', exm: '그는 누구니? 우리 아빠야.' },
    { w: 'brother', m: '형, 오빠, 남동생', ex: 'He is my brother.', exm: '그는 내 남동생이에요.' },
    { w: 'sister', m: '누나, 언니, 여동생', ex: 'She is my sister.', exm: '그녀는 내 언니예요.' },
    { w: 'grandma', m: '할머니', ex: 'My grandma is nice.', exm: '우리 할머니는 다정하세요.' },
    { w: 'grandpa', m: '할아버지', ex: 'This is my grandpa.', exm: '이분은 우리 할아버지예요.' },
    { w: 'uncle', m: '삼촌, 이모부, 고모부', ex: 'Who is he? He\'s my uncle.', exm: '그는 누구니? 우리 삼촌이야.' },
    { w: 'aunt', m: '이모, 고모, 숙모', ex: 'She\'s my aunt.', exm: '그녀는 우리 이모예요.' },
    { w: 'friend', m: '친구', ex: 'This is my friend, Mina.', exm: '이 아이는 내 친구 미나야.' },
    { w: 'family', m: '가족', ex: 'This is my family.', exm: '이 사람들은 우리 가족이에요.' },
    { w: 'he', m: '그, 그 남자', ex: 'How old is he?', exm: '그는 몇 살이니?' },
    { w: 'she', m: '그녀, 그 여자', ex: 'She\'s nine.', exm: '그녀는 아홉 살이야.' },
    { w: 'meet', m: '만나다', ex: 'Nice to meet you.', exm: '만나서 반가워.' },
    { w: 'old', m: '나이가 ~인, 나이 든', ex: 'How old are you?', exm: '너는 몇 살이니?' },
  ],
});
