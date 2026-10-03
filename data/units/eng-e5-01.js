/* 5학년 영어 · 나를 소개하는 글 쓰기 */
Tutor.registerUnit({
  id: 'eng-e5-01',
  course: 'eng-e5',
  title: '나를 소개하는 글 쓰기',
  summary: 'Where are you from?으로 출신을 묻고, 대문자와 마침표를 바르게 써서 나를 소개하는 글을 써요.',
  goals: [
    "Where are you from?으로 출신을 묻고 I'm from Korea.처럼 답할 수 있어요.",
    '나라 이름과 사람 이름의 첫 글자를 대문자로 쓸 수 있어요.',
    'How do you spell your name?으로 철자를 묻고 알파벳을 한 글자씩 말할 수 있어요.',
    '이름·나이·출신·좋아하는 것을 담아 나를 소개하는 글을 읽고 쓸 수 있어요.',
  ],
  standards: ['[6영02-04]', '[6영02-03]', '[6영02-07]', '[6영01-10]'],

  concepts: [
    {
      title: '어디에서 왔는지 묻고 답하기',
      body: "다른 나라에서 온 친구를 만나면 어느 나라에서 왔는지 물어볼 수 있어요.\n\n| 묻는 말 | 답하는 말 |\n|---|---|\n| **Where are you from?** (어디에서 왔어요?) | **I'm from** Canada. (캐나다에서 왔어요.) |\n| **Where is he from?** (그는 어디에서 왔어요?) | **He's from** Kenya. (그는 케냐에서 왔어요.) |\n| **Where is she from?** (그녀는 어디에서 왔어요?) | **She's from** Brazil. (그녀는 브라질에서 왔어요.) |\n\n**from** 은 '~에서'라는 뜻이에요. I'm은 I am을, He's는 He is를 줄인 말이에요.\n\n> 💡 답할 때 from 뒤에는 나라 이름을 넣어요. I'm from Korea.",
      easy: "편지 봉투에는 '보내는 사람'과 '받는 사람'이 있지요? 영어의 **from** 은 '보내는 곳', 곧 '어디에서 왔는지'를 알려 주는 말이에요.\n\n- Where are you from? → '너는 어디에서 왔니?'\n- I'm from Korea. → '나는 한국에서 왔어.'\n\n물을 때도 답할 때도 from이 들어가요.",
      check: {
        type: 'choice',
        q: '**Where are you from?** 에 알맞은 대답은 무엇일까요?',
        choices: ["I'm from Brazil.", "I'm eleven years old.", "I'm fine, thank you."],
        answer: 0,
        why: ['', '나이를 말했어요. 나이는 How old are you?에 답하는 말이에요.', '기분을 말했어요. 기분은 How are you?에 답하는 말이에요.'],
        explain: "Where are you from?은 어디에서 왔는지 묻는 말이라서 I'm from 뒤에 나라 이름을 넣어 답해요.",
      },
    },
    {
      title: '나라 이름은 대문자로 시작해요',
      body: "나라 이름은 세상에 하나뿐인 **이름**이라서 첫 글자를 언제나 **대문자**로 써요. 문장 가운데에 있어도 마찬가지예요.\n\n| 나라 | 영어 |\n|---|---|\n| 한국 | **K**orea |\n| 캐나다 | **C**anada |\n| 케냐 | **K**enya |\n| 브라질 | **B**razil |\n| 중국 | **C**hina |\n| 호주 | **A**ustralia |\n\n사람 이름(Jiho, Emma)과 도시 이름(Seoul, Busan)도 첫 글자를 대문자로 써요. 하지만 apple, soccer 같은 보통 낱말은 문장 가운데에서 소문자로 써요.\n\n> ⚠️ I'm from korea. (틀림) → I'm from Korea. (맞음)",
      easy: '이름표를 떠올려 보세요. 이름은 그 사람만의 것이라 눈에 띄게 써 주지요.\n\n영어에서는 이런 **특별한 이름**의 첫 글자를 크게, 곧 대문자로 써서 표시해요. 나라도 하나뿐인 이름이니까 Korea, Canada처럼 첫 글자를 크게 써요. 사과(apple)는 세상에 아주 많으니 특별한 이름이 아니에요.',
      check: {
        type: 'ox',
        q: '문장 가운데에 오는 나라 이름은 korea, canada처럼 소문자로 시작해도 돼요.',
        answer: false,
        explain: "나라 이름은 문장 어디에 있어도 첫 글자를 대문자로 써요. I'm from Korea. / She's from Canada.",
      },
    },
    {
      title: '이름 철자 묻고 답하기',
      body: "이름을 들었는데 어떻게 쓰는지 모를 때는 **철자**를 물어요.\n\nA: **How do you spell your name?** (이름 철자가 어떻게 돼요?)\nB: **J-I-H-O.** Jiho.\n\n**spell** 은 '철자를 말하다'라는 뜻이에요. 답할 때는 알파벳 이름을 **한 글자씩 끊어서** 말해요. 글로 적을 때는 글자 사이에 하이픈(-)을 넣어 J-I-H-O처럼 나타내요.\n\n> 💡 철자를 다 말한 뒤 이름을 한 번 더 이어서 말해 주면(Jiho.) 듣는 사람이 알아듣기 쉬워요.",
      easy: "받아쓰기를 할 때 처음 보는 낱말은 한 글자씩 불러 주지요? 철자 말하기가 바로 그거예요.\n\n'지호'라는 이름은 영어 알파벳 J, I, H, O 네 개로 써요. 그래서 친구가 'How do you spell your name?' 하고 물으면 'J-I-H-O' 하고 한 글자씩 또박또박 말해 주면 돼요.",
      check: {
        type: 'choice',
        q: '친구 이름을 **어떻게 쓰는지** 물을 때 알맞은 말은 무엇일까요?',
        choices: ['How do you spell your name?', "What's your name?", 'Where are you from?'],
        answer: 0,
        why: ['', '이름이 무엇인지 묻는 말이에요. 쓰는 법(철자)을 물을 때는 spell을 써요.', '어디에서 왔는지 묻는 말이에요.'],
        explain: 'spell은 철자를 말한다는 뜻이에요. How do you spell your name?은 이름 철자를 묻는 말이에요.',
      },
    },
    {
      title: '문장의 첫 글자와 끝 부호',
      body: "영어 문장을 쓸 때는 두 가지를 꼭 지켜요.\n\n1. 문장의 **첫 글자는 대문자**로 써요. → **M**y name is Jiho.\n2. 문장 끝에는 **마침표(.)** 를 쓰고, 묻는 문장 끝에는 **물음표(?)** 를 써요. → I'm from Korea. / Where are you from?\n\n그리고 '나'를 뜻하는 **I** 는 문장 어디에 있어도 언제나 대문자예요. → Jiho and **I** like soccer.\n\n> 💡 다 쓴 뒤 '첫 글자, 끝 부호, I, 이름' 네 곳을 점검해 보세요.",
      easy: "문장은 기차와 같아요. 맨 앞 기관차(첫 글자)는 크게, 곧 대문자로 쓰고, 맨 끝 칸에는 '여기서 끝!' 표시를 달아요.\n\n- 그냥 말하는 문장이면 끝 표시는 마침표(.)\n- 묻는 문장이면 끝 표시는 물음표(?)\n\n기차 머리와 꼬리를 꼭 챙기면 바른 문장이 돼요.",
      check: {
        type: 'choice',
        q: '바르게 쓴 문장은 무엇일까요?',
        choices: ["I'm from Canada.", "i'm from Canada.", "I'm from Canada"],
        answer: 0,
        why: ['', "문장의 첫 글자를 소문자로 썼어요. 첫 글자이면서 '나'를 뜻하는 I는 대문자로 써요.", '문장 끝에 마침표(.)가 빠졌어요.'],
        explain: '첫 글자는 대문자, 나라 이름도 대문자, 끝에는 마침표를 써요.',
      },
    },
    {
      title: '나를 소개하는 글의 짜임',
      body: "나를 소개하는 글은 보통 이런 순서로 써요. (나이와 출신은 순서를 바꿔도 괜찮아요.)\n\n| 순서 | 내용 | 예 |\n|---|---|---|\n| 1 | 인사와 이름 | Hello! My name is Jiho. |\n| 2 | 나이 | I'm eleven years old. |\n| 3 | 출신 | I'm from Korea. |\n| 4 | 좋아하는 것 | I like soccer. |\n| 5 | 끝인사 | Nice to meet you. |\n\n이어 쓰면 한 편의 자기소개 글이 돼요.\n\n> Hello! My name is Jiho. I'm eleven years old. I'm from Korea. I like soccer. Nice to meet you.\n\n나이는 **I'm ○○ years old.** 처럼 수를 영어 낱말로 써요. 문장마다 대문자로 시작하고 마침표로 끝났는지 다시 확인해요.",
      easy: "자기소개 글은 처음 만난 친구에게 건네는 이름표 같아요. 이름표에 적을 내용을 문장 하나에 하나씩 담아 차례로 쓰면 돼요.\n\n- 이름 → My name is [[Jiho]].\n- 나이 → I'm [[eleven]] years old.\n- 출신 → I'm from [[Korea]].\n- 좋아하는 것 → I like [[soccer]].\n\n빈칸에 내 이야기를 넣으면 나만의 소개 글이 완성돼요.",
      check: {
        type: 'choice',
        q: '자기소개 글에서 **나이**를 말하는 문장은 무엇일까요?',
        choices: ["I'm eleven years old.", "I'm from Korea.", 'I like soccer.'],
        answer: 0,
        why: ['', '출신(어디에서 왔는지)을 말하는 문장이에요.', '좋아하는 것을 말하는 문장이에요.'],
        explain: "나이는 I'm ○○ years old.로 말해요. eleven은 11이에요.",
      },
    },
  ],

  examples: [
    {
      q: "대문자와 문장 부호가 바르도록 고쳐 써 보세요.\n\ni'm from kenya",
      steps: [
        "문장의 첫 글자는 대문자로 써요. 게다가 i는 '나'를 뜻하는 I라서 언제나 대문자예요. → I'm",
        '케냐는 나라 이름이라 첫 글자를 대문자로 써요. → Kenya',
        '묻는 문장이 아니므로 끝에 마침표(.)를 찍어요.',
      ],
      answer: "I'm from Kenya.",
    },
    {
      q: "Emma의 메모를 보고 자기소개 글을 완성해 보세요.\n\n| 이름 | 나이 | 나라 | 좋아하는 것 |\n|---|---|---|---|\n| Emma | 12살 | 캐나다 | skating |",
      steps: [
        '인사와 이름: Hello! My name is Emma.',
        "나이: 12는 twelve예요. → I'm twelve years old.",
        "출신: 캐나다는 Canada, 첫 글자는 대문자예요. → I'm from Canada.",
        '좋아하는 것: I like skating.',
        '끝인사를 붙이고, 문장마다 첫 글자 대문자와 마침표를 확인해요.',
      ],
      answer: "Hello! My name is Emma. I'm twelve years old. I'm from Canada. I like skating. Nice to meet you.",
    },
  ],

  terms: [
    { term: '대문자', def: 'A, B, C처럼 크게 쓰는 알파벳이에요. 문장의 첫 글자, 사람·나라 이름의 첫 글자, 나를 뜻하는 I를 대문자로 써요.' },
    { term: '소문자', def: 'a, b, c처럼 작게 쓰는 알파벳이에요. 문장 가운데의 보통 낱말은 소문자로 써요.' },
    { term: '마침표', def: "문장이 끝났음을 알리는 점(.)이에요. 예: I'm from Korea." },
    { term: '물음표', def: '묻는 문장 끝에 쓰는 부호(?)예요. 예: Where are you from?' },
    { term: '철자', def: '낱말을 이루는 알파벳과 그 차례예요. 예: Jiho의 철자는 J-I-H-O예요.' },
    { term: '자기소개 글', def: '이름·나이·출신·좋아하는 것 등을 담아 나를 알리는 글이에요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: "대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: Where are you from?\nB: [[I'm from Korea.]]",
      choices: ["I'm from Korea.", "I'm ten years old.", "I'm good.", 'My name is Jiho.'],
      answer: 0,
      why: ['', '나이를 말했어요. 나이는 How old are you?에 답하는 말이에요.', '기분을 말했어요. 기분은 How are you?에 답하는 말이에요.', "이름을 말했어요. 이름은 What's your name?에 답하는 말이에요."],
      explain: "Where are you from?은 어디에서 왔는지 묻는 말이에요. I'm from 뒤에 나라 이름을 넣어 답해요.",
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '문장 가운데에 오더라도 **첫 글자를 대문자로** 써야 하는 낱말은 무엇일까요?',
      choices: ['kenya', 'apple', 'soccer', 'pizza'],
      answer: 0,
      why: ['', '사과는 세상에 많은 보통 낱말이라 문장 가운데에서는 소문자로 써요.', '운동 이름은 보통 낱말이라 문장 가운데에서는 소문자로 써요.', '음식 이름은 보통 낱말이라 문장 가운데에서는 소문자로 써요.'],
      explain: '케냐는 나라 이름이라서 언제나 Kenya처럼 첫 글자를 대문자로 써요.',
    },
    {
      id: 'p3', level: 1, type: 'short', concept: 0,
      q: "빈칸에 알맞은 낱말을 쓰세요.\n\nA: Where are you [[from]]?\nB: I'm from China.",
      answer: ['from'],
      wrong: [{ a: 'form', why: "철자 순서가 바뀌었어요. '~에서'는 f-r-o-m, from이에요." }],
      explain: "어디에서 왔는지 물을 때는 Where are you from?이라고 해요. 대답 I'm from China.에도 from이 들어 있어요.",
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 3,
      q: '다음 문장은 바르게 쓴 문장이에요.\n\nWhere are you from.',
      answer: false,
      explain: '묻는 문장이라서 끝에 물음표(?)를 써야 해요. 바르게 쓰면 Where are you from?이에요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: "대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: How do you spell your name?\nB: [[S-U-A.]] Sua.",
      choices: ['S-U-A.', "I'm Sua.", "I'm from Korea.", 'Nice to meet you.'],
      answer: 0,
      why: ['', '이름만 말했어요. 철자를 물었으니 알파벳을 한 글자씩 말해요.', '어디에서 왔는지 말했어요. 묻는 말은 철자예요.', '만나서 반갑다는 인사예요. 철자를 한 글자씩 말해야 해요.'],
      explain: 'How do you spell your name?은 이름 철자를 묻는 말이라서 S-U-A처럼 알파벳을 한 글자씩 말해요.',
    },
    {
      id: 'p6', level: 1, type: 'order', concept: 0,
      q: "'어디에서 왔어요?'라는 뜻이 되도록 낱말을 순서대로 놓으세요.",
      choices: ['are', 'from?', 'Where', 'you'],
      answer: [2, 0, 3, 1],
      explain: '묻는 말 Where가 맨 앞에 오고, are you from?이 이어져요. → Where are you from?',
    },
    {
      id: 'p7', level: 1, type: 'short', concept: 2,
      q: '친구가 이름 철자를 이렇게 말했어요. 친구의 이름을 영어로 쓰세요.\n\nM-I-N-A.',
      answer: ['Mina'],
      wrong: [{ a: 'Mian', why: '마지막 두 글자의 순서가 바뀌었어요. 들은 차례대로 M, I, N, A를 이어 써요.' }],
      explain: '들은 알파벳을 차례대로 이어 쓰면 Mina예요. 사람 이름이니까 첫 글자 M은 대문자로 써요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 3,
      q: '대문자와 문장 부호를 **모두** 바르게 쓴 문장은 무엇일까요?',
      choices: ['My name is Lucas.', 'my name is Lucas.', 'My name is lucas.', 'My name is Lucas'],
      answer: 0,
      why: ['', '문장의 첫 글자 m을 소문자로 썼어요.', '사람 이름 Lucas의 첫 글자를 소문자로 썼어요.', '문장 끝에 마침표(.)가 빠졌어요.'],
      hint: '첫 글자, 이름, 끝 부호를 하나씩 살펴보세요.',
      explain: '문장 첫 글자 M, 사람 이름 첫 글자 L은 대문자이고, 끝에는 마침표를 찍어요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: "글을 읽고 물음에 답하세요.\n\n> Hi! My name is Emma. I'm eleven years old. I'm from Canada. I like ice hockey. Nice to meet you.\n\nEmma는 어느 나라에서 왔나요?",
      choices: ['캐나다', '브라질', '케냐', '호주'],
      answer: 0,
      why: ['', '브라질은 Brazil이에요. 글에 나온 나라 이름을 다시 찾아보세요.', '케냐는 Kenya예요. 글에 나온 나라 이름을 다시 찾아보세요.', '호주는 Australia예요. 글에 나온 나라 이름을 다시 찾아보세요.'],
      hint: "I'm from으로 시작하는 문장을 찾아보세요.",
      explain: "I'm from Canada.라고 했으니 Emma는 캐나다에서 왔어요.",
    },
    {
      id: 'p10', level: 2, type: 'short', concept: 4,
      q: "글을 읽고 물음에 답하세요.\n\n> Hello. I'm Daniel. I'm twelve years old. I'm from Kenya. I like running.\n\nDaniel은 몇 살인가요? 글에 나온 영어 낱말로 쓰세요.",
      answer: ['twelve', 'twelve years old', "I'm twelve years old", 'I am twelve years old'],
      wrong: [
        { a: 'Kenya', why: "출신 나라를 썼어요. 나이는 I'm ○○ years old. 문장에 있어요." },
        { a: '12', why: '나이는 맞게 찾았어요. 숫자 대신 글에 나온 영어 낱말 twelve로 써요.' },
      ],
      hint: 'years old가 들어 있는 문장을 찾아보세요.',
      explain: "I'm twelve years old.라고 했으니 Daniel은 twelve(12)살이에요.",
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: "자기소개 글을 읽고, 이름·나이·출신·좋아하는 것 가운데 **빠진** 내용을 고르세요.\n\n> Hi! My name is Ana. I'm from Brazil. I like dancing. Nice to meet you.",
      choices: ['나이', '이름', '출신', '좋아하는 것'],
      answer: 0,
      why: ['', 'My name is Ana.에 이름이 있어요.', "I'm from Brazil.에 출신이 있어요.", 'I like dancing.에 좋아하는 것이 있어요.'],
      hint: '네 가지 내용을 하나씩 글에서 찾아 지워 보세요.',
      explain: "이름(Ana), 출신(Brazil), 좋아하는 것(dancing)은 있지만 I'm ○○ years old. 같은 나이 문장이 없어요.",
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 0,
      q: "대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: [[Where are you from?]]\nB: I'm from Kenya.",
      choices: ['Where are you from?', 'How old are you?', "What's your name?", 'How do you spell your name?'],
      answer: 0,
      why: ['', "나이를 묻는 말이에요. 대답이 I'm from ~이니 출신을 물어야 해요.", "이름을 묻는 말이에요. 대답이 I'm from ~이니 출신을 물어야 해요.", '철자를 묻는 말이에요. 대답에 알파벳이 아니라 나라 이름이 있어요.'],
      hint: '대답을 먼저 읽고, 무엇을 물었을지 거꾸로 생각해 보세요.',
      explain: "I'm from Kenya.는 어디에서 왔는지에 대한 대답이므로 Where are you from?이 알맞아요.",
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: '대문자와 문장 부호를 **모두** 바르게 쓴 글은 무엇일까요?',
      choices: ['My friend is from Brazil. Her name is Ana.', 'My friend is from brazil. Her name is Ana.', 'My friend is from Brazil. her name is Ana.', 'My friend is from Brazil. Her name is Ana'],
      answer: 0,
      why: ['', '나라 이름 brazil의 첫 글자를 소문자로 썼어요.', '두 번째 문장의 첫 글자 her를 소문자로 썼어요. 마침표 뒤에 새 문장이 시작돼요.', '두 번째 문장 끝에 마침표(.)가 빠졌어요.'],
      hint: '문장이 두 개예요. 문장마다 첫 글자와 끝 부호를 확인하세요.',
      explain: '문장 두 개 모두 첫 글자가 대문자(My, Her)이고 끝에 마침표가 있어야 해요. 나라 이름 Brazil과 사람 이름 Ana도 대문자로 시작해요.',
    },
    {
      id: 'a2', level: 3, type: 'short', concept: 2,
      q: '친구가 이름 철자를 한 글자씩 말하고 있어요. **다섯 번째**로 말하는 알파벳을 쓰세요.\n\nA: How do you spell your name?\nB: D-A-N-I-E-L. Daniel.',
      answer: ['E'],
      wrong: [
        { a: 'I', why: '네 번째 글자를 썼어요. D, A, N, I 다음 다섯 번째는 E예요.' },
        { a: 'L', why: '마지막 글자를 썼어요. Daniel은 여섯 글자라서 마지막 L은 여섯 번째예요.' },
      ],
      hint: '하이픈(-)으로 끊긴 글자를 하나씩 세어 보세요.',
      explain: 'D(첫째), A(둘째), N(셋째), I(넷째), E(다섯째), L(여섯째)이므로 다섯 번째는 E예요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: "글을 읽고, 내용과 **맞지 않는** 것을 고르세요.\n\n> Hello! My name is Leo. L-E-O. I'm eleven years old. I'm from Canada, but I live in Korea now. I like taekwondo.",
      choices: ['Leo는 지금 캐나다에 살아요.', 'Leo의 이름은 알파벳 세 글자로 써요.', 'Leo는 열한 살이에요.', 'Leo는 태권도를 좋아해요.'],
      answer: 0,
      why: ['', 'L-E-O, 세 글자가 맞아요.', "I'm eleven years old.라고 했으니 맞아요.", 'I like taekwondo.라고 했으니 맞아요.'],
      hint: 'but 뒤의 문장을 꼼꼼히 읽어 보세요.',
      explain: "Leo는 캐나다에서 왔지만(I'm from Canada) 지금은 한국에 살아요(I live in Korea now). 그래서 '지금 캐나다에 살아요'는 맞지 않아요.",
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 0,
      q: "대화의 빈칸에 들어갈 말로 알맞은 것은 무엇일까요?\n\nA: This is my friend Tom.\nB: Where is he from?\nA: [[He's from Kenya.]]",
      choices: ["He's from Kenya.", "I'm from Kenya.", "He's from kenya.", 'He from Kenya.'],
      answer: 0,
      why: ['', "Tom에 대해 물었는데 '나'의 출신을 말했어요. 그(he)에 대해 답해요.", '나라 이름 kenya의 첫 글자를 소문자로 썼어요.', "is가 빠졌어요. He's는 He is를 줄인 말이에요."],
      hint: '누구에 대해 묻고 있는지, 그리고 대문자까지 확인하세요.',
      explain: "Where is he from?은 그(Tom)가 어디에서 왔는지 묻는 말이에요. He's(He is) from 뒤에 대문자로 시작하는 나라 이름을 써요.",
    },
  ],

  deeper: [
    {
      title: '나라 이름과 그 나라 사람',
      body: "I'm from Korea.(나는 한국에서 왔어요.) 말고 **I'm Korean.**(나는 한국 사람이에요.)이라고도 말할 수 있어요. 나라 이름에서 '그 나라 사람'을 뜻하는 낱말이 생겨요.\n\n| 나라 | 그 나라 사람 |\n|---|---|\n| Korea | Korean |\n| Canada | Canadian |\n| Brazil | Brazilian |\n| Kenya | Kenyan |\n| China | Chinese |\n\n이런 낱말도 나라 이름에서 나왔기 때문에 첫 글자를 대문자로 써요. Korean에는 '한국어'라는 뜻도 있어요.",
    },
    {
      title: '대문자로 시작하는 낱말 더 알아보기',
      body: "나라 이름 말고도 첫 글자를 언제나 대문자로 쓰는 낱말이 있어요.\n\n- 사람 이름: Jiho, Emma, Daniel\n- 도시 이름: Seoul, Busan\n- 요일: Monday, Sunday\n- 나를 뜻하는 말: I\n\n공통점은 '하나뿐인 이름'이거나 '약속으로 정한 낱말'이라는 거예요. 글을 다 쓴 뒤에 이런 낱말을 찾아 첫 글자를 점검하는 습관을 들이면 좋아요.",
    },
  ],

  faq: [
    {
      q: "I'm from Korea.랑 I'm Korean.은 뭐가 달라요?",
      a: "I'm from Korea.는 '한국에서 왔어요', I'm Korean.은 '한국 사람이에요'라는 뜻이에요. 한국에서 태어나 자란 사람이라면 둘 다 쓸 수 있어요. 이 단원에서는 출신을 묻는 Where are you from?에 I'm from ~.으로 답하는 것을 익혀요.",
    },
    {
      q: '왜 I는 문장 가운데에서도 대문자로 써요?',
      a: "영어를 쓰는 사람들이 그렇게 쓰기로 정한 약속이에요. 그렇게 된 까닭에는 여러 이야기가 있지만, '나를 뜻하는 I는 언제나 대문자'라고 규칙으로 기억해 두면 돼요. 예: Jiho and I like soccer.",
    },
    {
      q: '철자를 말할 때 하이픈(-)도 읽어요?',
      a: '아니요. 하이픈은 글로 적을 때 글자를 하나씩 끊어 보여 주려고 쓰는 표시예요. 말할 때는 J, I, H, O처럼 알파벳 이름만 또박또박 끊어서 말해요.',
    },
  ],

  mistakes: [
    "나라 이름을 소문자로 쓰는 실수: I'm from korea. → I'm from Korea.",
    '묻는 문장 끝에 마침표를 찍는 실수: Where are you from. → Where are you from?',
    "am을 빠뜨리는 실수: I from Korea. → I'm from Korea. (I'm은 I am을 줄인 말이에요.)",
  ],

  gens: [
    {
      id: 'from-sentence',
      level: 1,
      title: '출신을 말하는 문장 바르게 쓰기',
      make: function (R) {
        var nations = [
          ['Korea', '한국'], ['Canada', '캐나다'], ['Kenya', '케냐'], ['Brazil', '브라질'],
          ['China', '중국'], ['Australia', '호주'], ['France', '프랑스'], ['Japan', '일본'],
        ];
        var subjects = [
          { s: "I'm", low: "i'm", bare: 'I', ko: '나는', other: "He's" },
          { s: "He's", low: "he's", bare: 'He', ko: '그는', other: "I'm" },
          { s: "She's", low: "she's", bare: 'She', ko: '그녀는', other: "I'm" },
        ];
        var n = R.pick(nations);
        var sub = R.pick(subjects);
        var C = n[0];
        var correct = sub.s + ' from ' + C + '.';
        var cands = [
          [sub.s + ' from ' + C.toLowerCase() + '.', '나라 이름의 첫 글자를 소문자로 썼어요. 나라 이름은 대문자로 시작해요.'],
          [sub.low + ' from ' + C + '.', '문장의 첫 글자를 소문자로 썼어요. 문장은 대문자로 시작해요.'],
          [sub.s + ' from ' + C, '문장 끝에 마침표(.)가 빠졌어요.'],
          [sub.bare + ' from ' + C + '.', sub.bare === 'I' ? 'am이 빠졌어요. I am을 줄이면 I\'m이에요.' : 'is가 빠졌어요. ' + sub.bare + ' is를 줄이면 ' + sub.s + '예요.'],
          [sub.other + ' from ' + C + '.', "누구에 대한 문장인지 다시 보세요. '" + sub.ko + "'에 맞는 말로 시작해야 해요. → " + sub.s],
        ];
        var reason = {};
        cands.forEach(function (c) { reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: 3,
          q: "'" + sub.ko + ' ' + n[1] + "에서 왔어요.'를 영어로 바르게 쓴 문장은 무엇일까요?",
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: sub.s + ' from 뒤에 나라 이름을 써요. 문장 첫 글자와 나라 이름 첫 글자는 대문자, 끝에는 마침표를 찍어요. → ' + correct,
        };
      },
    },
    {
      id: 'spell-name',
      level: 1,
      title: '철자를 듣고 이름 쓰기',
      make: function (R) {
        var names = [
          'Jiho', 'Mina', 'Sua', 'Minsu', 'Seojun', 'Hayun', 'Doyun', 'Jia', 'Emma', 'Tom',
          'Leo', 'Ana', 'Lucas', 'Daniel', 'Sora', 'Yuna', 'Ben', 'Mia', 'Noah', 'Lily',
          'Jun', 'Hana', 'Eric', 'Kate', 'Juwon', 'Nari', 'Oliver', 'Grace', 'Ryan', 'Chloe',
        ];
        var name = R.pick(names);
        var letters = name.toUpperCase().split('');
        var L = name.length;
        var swapped = name.slice(0, L - 2) + name.charAt(L - 1) + name.charAt(L - 2);
        var wrong = swapped.toLowerCase() === name.toLowerCase() ? [] : [{ a: swapped, why: '마지막 두 글자의 순서가 바뀌었어요. 들은 차례대로 이어 써요.' }];
        return {
          type: 'short', concept: 2,
          q: '친구가 이름 철자를 말했어요. 친구의 이름을 영어로 쓰세요.\n\nA: How do you spell your name?\nB: ' + letters.join('-') + '.',
          answer: [name],
          wrong: wrong,
          explain: '알파벳을 들은 차례대로 이어 쓰면 이름이 돼요: ' + name + '. 사람 이름이니까 첫 글자는 대문자로 써요.',
        };
      },
    },
  ],

  vocab: [
    { w: 'Korea', m: '한국', ex: "I'm from Korea.", exm: '나는 한국에서 왔어요.' },
    { w: 'Canada', m: '캐나다', ex: 'Emma is from Canada.', exm: 'Emma는 캐나다에서 왔어요.' },
    { w: 'Kenya', m: '케냐', ex: 'Daniel is from Kenya.', exm: 'Daniel은 케냐에서 왔어요.' },
    { w: 'Brazil', m: '브라질', ex: 'Ana is from Brazil.', exm: 'Ana는 브라질에서 왔어요.' },
    { w: 'China', m: '중국', ex: 'Is he from China?', exm: '그는 중국에서 왔나요?' },
    { w: 'Australia', m: '호주', ex: 'Kangaroos live in Australia.', exm: '캥거루는 호주에 살아요.' },
    { w: 'country', m: '나라', ex: 'Korea is a beautiful country.', exm: '한국은 아름다운 나라예요.' },
    { w: 'from', m: '~에서(온)', ex: 'Where are you from?', exm: '너는 어디에서 왔니?' },
    { w: 'spell', m: '철자를 말하다', ex: 'How do you spell your name?', exm: '네 이름 철자가 어떻게 되니?' },
    { w: 'name', m: '이름', ex: 'My name is Jiho.', exm: '내 이름은 지호예요.' },
    { w: 'introduce', m: '소개하다', ex: 'Let me introduce my friend Tom.', exm: '내 친구 Tom을 소개할게요.' },
    { w: 'capital letter', m: '대문자', ex: 'Start a sentence with a capital letter.', exm: '문장은 대문자로 시작하세요.' },
    { w: 'period', m: '마침표', ex: 'Put a period at the end.', exm: '끝에 마침표를 찍으세요.' },
    { w: 'question mark', m: '물음표', ex: 'Put a question mark after a question.', exm: '묻는 문장 뒤에는 물음표를 쓰세요.' },
  ],
});
