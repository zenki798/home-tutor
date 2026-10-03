/* 6학년 영어 · 키와 크기 비교하기 */
Tutor.registerUnit({
  id: 'eng-e6-05',
  course: 'eng-e6',
  title: '키와 크기 비교하기',
  summary: 'taller, bigger처럼 -er을 붙인 말과 than을 써서 두 사람이나 두 물건을 비교해 말해요.',
  goals: [
    '형용사에 -er을 붙여 비교하는 말을 바르게 만들 수 있어요.',
    '"A is taller than B."처럼 두 사람이나 물건을 비교해 말할 수 있어요.',
    'Who/Which로 누가(무엇이) 더 ~한지 묻고 답할 수 있어요.',
    '키·무게를 묻고 답하고, 표를 보고 알맞은 비교 문장을 고를 수 있어요.',
  ],
  standards: [],

  concepts: [
    {
      title: '-er을 붙여 비교하는 말 만들기',
      body: "두 가지를 견주어 \"더 ~한\"이라고 말할 때는 모양을 나타내는 말(**형용사**) 끝에 **-er**을 붙여요. 이렇게 만든 말을 **비교하는 말**이라고 해요.\n\n| 원래 말 | 비교하는 말 | 뜻 |\n|---|---|---|\n| tall | **taller** | 키가 더 큰 |\n| short | **shorter** | 키가 더 작은, 더 짧은 |\n| long | **longer** | 더 긴 |\n| fast | **faster** | 더 빠른 |\n| old | **older** | 나이가 더 많은 |\n\n**e**로 끝나는 말은 **r**만 붙여요: large → **larger**, nice → **nicer**\n\n> 💡 tall은 \"키가 큰\", taller는 \"키가 **더** 큰\"이에요. -er 하나가 \"더\"라는 뜻을 보태 줘요.",
      easy: "-er은 \"더\"라는 꼬리표라고 생각해 보세요.\n\n- tall(키가 큰) + 꼬리표 er → taller(키가 **더** 큰)\n- fast(빠른) + 꼬리표 er → faster(**더** 빠른)\n\n이미 e가 달려 있는 말(large, nice)은 꼬리표의 e를 빼고 r만 붙여요. 그래서 large는 larger예요.",
      check: {
        type: 'choice',
        q: 'long(긴)에 -er을 붙여 "더 긴"이라는 말을 만들면 무엇일까요?',
        choices: ['longer', 'longger', 'long'],
        answer: 0,
        why: ['', 'g를 한 번 더 쓸 필요가 없어요. long 끝은 자음이 두 개(n, g)라서 그냥 -er만 붙여요.', 'long은 "긴"이에요. "더 긴"이라고 하려면 -er을 붙여야 해요.'],
        explain: 'long 끝에 -er을 붙이면 longer(더 긴)예요.',
      },
    },
    {
      title: '철자가 바뀌는 비교하는 말',
      body: "어떤 말은 -er을 붙일 때 **철자가 조금 바뀌어요.**\n\n1. **모음 하나 + 자음 하나**로 끝나는 짧은 말은 마지막 자음을 **한 번 더** 쓰고 -er을 붙여요: big → **bigger**, hot → **hotter**, thin → **thinner** (단, w로 끝나는 말은 겹쳐 쓰지 않아요: slow → slower)\n2. **자음 + y**로 끝나는 말은 y를 **i**로 바꾸고 -er을 붙여요: heavy → **heavier**, easy → **easier**, happy → **happier**\n\n> ⚠️ tall, long, fast처럼 끝에 자음이 두 개 있는 말은 자음을 겹쳐 쓰지 않아요. tall → taller (talller ✗)",
      easy: "big을 소리 내어 읽어 보세요. 가운데 모음 i가 짧게 소리 나지요? 이런 짧은 말은 끝 글자 g를 **하나 더** 붙여 짧은 소리를 지켜 줘요: big → bigger\n\nheavy처럼 y로 끝나면 y가 꼬리표 앞에서 i로 옷을 갈아입어요: heavy → heavier",
      check: {
        type: 'choice',
        q: 'heavy(무거운)의 비교하는 말로 알맞은 것은 무엇일까요?',
        choices: ['heavier', 'heavyer', 'heavyier'],
        answer: 0,
        why: ['', 'y로 끝나고 그 앞이 자음(v)이면 y를 i로 바꾸어요.', 'y를 그대로 두고 i를 더했어요. y를 i로 바꾸는 거예요.'],
        explain: 'heavy는 자음 v 다음에 y로 끝나요. y를 i로 바꾸고 -er을 붙여 heavier예요.',
      },
    },
    {
      title: '두 대상 비교하기: A is taller than B.',
      body: "두 사람이나 두 물건을 비교할 때는 이렇게 말해요.\n\n**A + is + 비교하는 말 + than + B.** → \"A는 B보다 더 ~해요.\"\n\n- Jiho is **taller than** Mina. (지호는 민아보다 키가 더 커요.)\n- My bag is **bigger than** your bag. (내 가방은 네 가방보다 더 커요.)\n- The elephant is **heavier than** the horse. (코끼리는 말보다 더 무거워요.)\n\n**than**은 우리말 \"~보다\"예요. than 뒤에 비교하는 상대를 써요.\n\n> 💡 둘 이상이 주인공이면 is 대신 are: Cats **are** smaller than dogs.",
      easy: "시소를 떠올려 보세요. 무거운 쪽이 앞에 오고, than 뒤에는 상대가 와요.\n\n\"코끼리 > 말\" → The elephant is heavier **than** the horse.\n\n앞에 온 것이 \"더 ~한\" 쪽이에요. 순서를 바꾸면 뜻도 바뀌어요.",
      check: {
        type: 'ox',
        q: '"Mina is tall than Jiho."는 바른 문장이에요.',
        answer: false,
        explain: 'than과 함께 쓸 때는 비교하는 말을 써야 해요. 바른 문장은 "Mina is **taller** than Jiho."예요.',
      },
    },
    {
      title: '누가 더 ~한지 묻기: Who / Which',
      body: "둘 중 누가(무엇이) 더 ~한지 물을 때는 이렇게 말해요.\n\n- 사람: **Who** is taller, Jiho **or** Mina? (지호와 민아 중 누가 더 키가 커?)\n- 물건·동물: **Which** is heavier, the cat **or** the dog? (고양이와 개 중 어느 것이 더 무거워?)\n\n대답은 더 ~한 쪽을 말하면 돼요.\n\n- **Mina is.** 또는 **Mina is taller than Jiho.**\n- **The dog is.** 또는 **The dog is heavier than the cat.**\n\n> 💡 고를 것 두 개 사이에 **or**(또는)를 넣어요.",
      easy: "사람을 물을 때는 Who(누구), 물건이나 동물을 물을 때는 Which(어느 것)예요.\n\n두 개를 손에 하나씩 들고 \"이거야, 저거야?\" 하고 묻는 모습을 떠올려 보세요. 두 손 사이에 들어가는 말이 or예요.",
      check: {
        type: 'choice',
        q: "빈칸에 알맞은 말은 무엇일까요?\n\n[[Which]] is longer, the pencil or the ruler?",
        choices: ['Which', 'Who', 'How'],
        answer: 0,
        why: ['', 'Who는 사람을 물을 때 써요. 연필과 자는 물건이에요.', 'How는 "얼마나"를 물을 때 써요. 둘 중 하나를 고르게 할 때는 Which를 써요.'],
        explain: '연필과 자 같은 물건 중에서 고를 때는 Which를 써요. "연필과 자 중 어느 것이 더 길어?"라는 뜻이에요.',
      },
    },
    {
      title: '키와 무게 묻고 답하기: How tall / How heavy',
      body: "**How**는 \"얼마나\"라는 뜻이에요. 뒤에 붙는 말에 따라 묻는 것이 달라져요.\n\n| 묻는 말 | 대답 |\n|---|---|\n| **How tall** are you? (키가 얼마야?) | I'm 150 centimeters tall. |\n| **How heavy** is your bag? (가방이 얼마나 무거워?) | It's 3 kilograms. |\n| **How long** is the snake? (뱀이 얼마나 길어?) | It's 2 meters long. |\n\n- centimeter(센티미터, cm), meter(미터, m), kilogram(킬로그램, kg)을 써서 답해요.\n- 사람의 키를 말할 때 숫자 뒤에 **tall**을 붙여요: I'm 145 centimeters **tall**.",
      easy: "How tall은 \"키가 얼마나 커?\", How heavy는 \"얼마나 무거워?\"예요.\n\n자로 재면 centimeter, 저울에 올리면 kilogram으로 대답한다고 기억해요.",
      check: {
        type: 'choice',
        q: '"How heavy is your dog?"에 알맞은 대답은 무엇일까요?',
        choices: ["It's 8 kilograms.", "It's 80 centimeters tall.", "It's 8 years old."],
        answer: 0,
        why: ['', '키(길이)를 말했어요. How heavy는 무게를 묻는 말이에요.', '나이를 말했어요. How heavy는 무게를 묻는 말이에요.'],
        explain: 'How heavy는 무게를 묻는 말이라서 kilogram으로 답해요. "8킬로그램이야."',
      },
    },
    {
      title: '표를 보고 비교 문장 고르기',
      body: "표나 그래프를 보고 비교하는 문장을 고를 때는 차례대로 해요.\n\n1. 문장에 나온 **두 대상**을 표에서 찾아요.\n2. 비교하는 말이 **무엇**(키·무게·길이)을 비교하는지 봐요.\n3. 수를 견주어 **누가 더 큰지(무거운지)** 확인해요.\n\n| 이름 | 키 | 몸무게 |\n|---|---|---|\n| Jiho | 152 cm | 45 kg |\n| Mina | 148 cm | 47 kg |\n\n- Jiho is taller than Mina. (152 > 148) ✔\n- Mina is heavier than Jiho. (47 > 45) ✔\n- Jiho is heavier than Mina. ✘ — 45 kg은 47 kg보다 가벼워요.",
      easy: "표를 볼 때는 손가락으로 두 사람의 줄을 짚고, 같은 칸(키는 키끼리, 몸무게는 몸무게끼리)의 수를 비교해요.\n\n키가 더 크다고 몸무게도 더 무거운 것은 아니에요. 칸을 꼭 따로 봐요.",
      check: {
        type: 'ox',
        q: "| 이름 | 키 |\n|---|---|\n| Sua | 139 cm |\n| Doyun | 144 cm |\n\n표를 보면 \"Sua is taller than Doyun.\"은 맞는 문장이에요.",
        answer: false,
        explain: 'Doyun은 144 cm, Sua는 139 cm라서 Doyun이 키가 더 커요. 맞는 문장은 "Doyun is taller than Sua." 또는 "Sua is shorter than Doyun."이에요.',
      },
    },
  ],

  examples: [
    {
      q: "표를 보고 물음에 영어로 답해 보세요.\n\n| 이름 | 키 |\n|---|---|\n| Hayun | 141 cm |\n| Seojun | 149 cm |\n\nWho is taller, Hayun or Seojun?",
      steps: [
        '묻는 말을 먼저 읽어요. Who is taller는 "누가 키가 더 커?"라는 뜻이에요.',
        '표에서 두 사람의 키를 찾아요. Hayun은 141 cm, Seojun은 149 cm예요.',
        '수를 비교하면 149가 141보다 크니까 Seojun이 키가 더 커요.',
        '더 큰 사람을 주인공으로 대답해요. "Seojun is." 또는 "Seojun is taller than Hayun."',
      ],
      answer: 'Seojun is taller than Hayun. (짧게: Seojun is.)',
    },
    {
      q: '가방은 5 kg, 상자는 3 kg이에요. heavy를 써서 두 물건을 비교하는 문장을 만들어 보세요.',
      steps: [
        '더 무거운 것을 찾아요. 5 kg인 가방이 더 무거워요.',
        'heavy는 자음 v 다음에 y로 끝나니 y를 i로 바꾸고 -er을 붙여요: heavier',
        '"A is 비교하는 말 than B." 틀에 넣어요. A는 더 무거운 가방, B는 상자예요.',
      ],
      answer: 'The bag is heavier than the box.',
    },
  ],

  terms: [
    { term: '형용사', def: '사람이나 물건의 모양·크기·성질을 나타내는 말이에요. 예: tall(키가 큰), big(큰), heavy(무거운)' },
    { term: '비교하는 말(비교급)', def: '형용사에 -er을 붙여 "더 ~한"이라는 뜻을 만든 말이에요. 예: taller(키가 더 큰), bigger(더 큰), heavier(더 무거운)' },
    { term: 'than', def: '"~보다"라는 뜻이에요. 비교하는 말 뒤에 쓰고, 그 뒤에 비교하는 상대를 써요. 예: Jiho is taller than Mina.' },
    { term: 'Who / Which', def: '둘 중 하나를 고르게 물을 때 써요. 사람이면 Who(누구), 물건·동물이면 Which(어느 것). 예: Which is heavier, the cat or the dog?' },
    { term: 'How tall / How heavy', def: "\"키가 얼마나 커?\", \"얼마나 무거워?\"를 묻는 말이에요. 예: How tall are you? — I'm 150 centimeters tall." },
    { term: 'centimeter / kilogram', def: '길이와 무게의 단위예요. centimeter는 cm(센티미터), kilogram은 kg(킬로그램)으로 줄여 써요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: 'short(키가 작은)의 비교하는 말로 알맞은 것은 무엇일까요?',
      choices: ['shorter', 'shortter', 'shortier', 'short'],
      answer: 0,
      why: ['', 'short는 끝에 자음이 두 개(r, t)라서 t를 겹쳐 쓰지 않아요.', 'y로 끝나는 말이 아니라서 i를 넣지 않아요.', 'short는 "키가 작은"이에요. "더 작은"이라고 하려면 -er을 붙여요.'],
      explain: 'short 끝에 그대로 -er을 붙이면 shorter(키가 더 작은)예요.',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 1,
      q: 'big(큰)을 "더 큰"이라는 뜻의 비교하는 말로 바꾸어 쓰세요.',
      answer: ['bigger'],
      wrong: [
        { a: 'biger', why: 'big은 모음 하나(i)와 자음 하나(g)로 끝나는 짧은 말이라서 g를 한 번 더 써요.' },
        { a: 'big', why: '원래 말을 그대로 썼어요. -er을 붙여 "더 큰"을 만들어요.' },
      ],
      explain: 'big은 모음 하나 + 자음 하나로 끝나니 g를 한 번 더 쓰고 -er을 붙여요: big → bigger',
    },
    {
      id: 'p3', level: 1, type: 'short', concept: 1,
      q: 'easy(쉬운)를 "더 쉬운"이라는 뜻의 비교하는 말로 바꾸어 쓰세요.',
      answer: ['easier'],
      wrong: [
        { a: 'easyer', why: '자음 s 다음에 y로 끝나는 말은 y를 i로 바꾸고 -er을 붙여요.' },
        { a: 'easyier', why: 'y를 남겨 두었어요. y를 i로 "바꾸는" 거예요.' },
      ],
      explain: 'easy는 자음 s 다음에 y로 끝나요. y를 i로 바꾸고 -er을 붙여 easier예요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nA giraffe is [[taller]] than a zebra.',
      choices: ['taller', 'tall', 'talls', 'tallier'],
      answer: 0,
      why: ['', 'than 앞에는 -er을 붙인 비교하는 말을 써요.', '형용사에는 s를 붙이지 않아요. -er을 붙여요.', 'tall은 y로 끝나지 않아서 i를 넣지 않아요.'],
      explain: 'than(~보다)과 함께 두 동물을 비교하니 비교하는 말 taller를 써요. "기린은 얼룩말보다 키가 더 커요."',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 2,
      q: '"Jiho is older than Mina."는 "지호는 민아보다 나이가 더 많아요."라는 뜻이에요.',
      answer: true,
      explain: 'older는 "나이가 더 많은", than은 "~보다"예요. 앞에 나온 Jiho가 나이가 더 많은 사람이에요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '"Who is faster, Hayun or Doyun?"에 알맞은 대답은 무엇일까요?',
      choices: ['Hayun is.', 'Yes, she is.', "It's fast.", 'Hayun is fast than Doyun.'],
      answer: 0,
      why: [
        '',
        'Who로 묻는 말에는 Yes/No로 답하지 않아요. 둘 중 누구인지 말해요.',
        '누가 더 빠른지 사람을 골라 답해야 해요. it은 사람을 가리키지 않아요.',
        'than 앞에는 비교하는 말 faster를 써야 해요.',
      ],
      explain: '"하윤과 도윤 중 누가 더 빨라?"라는 물음이에요. 둘 중 한 사람을 골라 "Hayun is."처럼 답해요. "Hayun is faster than Doyun."이라고 길게 말해도 돼요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: "대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: [[How tall are you?]]\nB: I'm 147 centimeters tall.",
      choices: ['How tall are you?', 'How old are you?', 'How heavy is it?', 'Who is taller?'],
      answer: 0,
      why: [
        '',
        '나이를 묻는 말이에요. B는 키를 말했어요.',
        '물건의 무게를 묻는 말이에요. B는 자기 키를 말했어요.',
        '둘 중 누가 더 큰지 묻는 말이에요. 그러면 사람 이름으로 답해요.',
      ],
      explain: 'B가 "나는 키가 147센티미터야."라고 했으니 A는 키를 물었어요. 키를 묻는 말은 "How tall are you?"예요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 2,
      q: '"내 가방은 네 가방보다 더 무거워."라는 뜻이 되게 차례대로 놓으세요.',
      choices: ['My bag', 'is', 'heavier', 'than', 'your bag.'],
      answer: [0, 1, 2, 3, 4],
      hint: '"A is 비교하는 말 than B." 틀을 떠올려 보세요.',
      explain: 'A(My bag) + is + 비교하는 말(heavier) + than + B(your bag) 차례예요. "My bag is heavier than your bag."',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 5,
      q: '표를 보고 맞는 문장을 고르세요.\n\n| 동물 | 무게 |\n|---|---|\n| cat | 4 kg |\n| dog | 9 kg |\n| rabbit | 2 kg |',
      choices: ['The rabbit is heavier than the cat.', 'The dog is heavier than the cat.', 'The cat is heavier than the dog.', 'The rabbit is heavier than the dog.'],
      answer: 1,
      why: [
        '토끼(2 kg)는 고양이(4 kg)보다 가벼워요. 두 동물의 무게를 다시 비교해 보세요.',
        '',
        '고양이(4 kg)는 개(9 kg)보다 가벼워요. 무게를 다시 비교해 보세요.',
        '토끼(2 kg)는 개(9 kg)보다 가벼워요.',
      ],
      hint: '문장마다 두 동물을 찾아 무게를 비교해 보세요.',
      explain: '개는 9 kg, 고양이는 4 kg이니 "The dog is heavier than the cat."이 맞아요. 토끼는 셋 중에서 가장 가벼워서, 토끼가 더 무겁다는 문장은 모두 틀려요.',
    },
    {
      id: 'p10', level: 2, type: 'short', concept: 4,
      q: "대화의 빈칸에 알맞은 낱말 하나를 쓰세요.\n\nA: How [[tall]] is your brother?\nB: He is 160 centimeters tall.",
      answer: ['tall'],
      wrong: [
        { a: 'heavy', why: 'How heavy는 무게를 묻는 말이에요. B는 키(centimeters tall)를 말했어요.' },
        { a: 'old', why: 'How old는 나이를 묻는 말이에요. B는 키를 말했어요.' },
      ],
      hint: 'B의 대답이 키·무게·나이 중 무엇인지 살펴보세요.',
      explain: 'B가 "160센티미터야."라고 키를 말했으니 A는 "How tall is your brother?"(네 형[오빠, 남동생]은 키가 얼마야?)라고 물었어요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '"Which is bigger, the sun or the moon?"에 알맞은 대답은 무엇일까요?',
      choices: ['The sun is.', 'The moon is.', 'Yes, it is.', 'It is big.'],
      answer: 0,
      why: [
        '',
        '달은 해보다 훨씬 작아요. 더 큰 쪽을 골라 답해요.',
        'Which로 묻는 말에는 Yes/No로 답하지 않아요. 둘 중 하나를 골라요.',
        '무엇이 더 큰지 고르지 않았어요. 해와 달 중 하나를 말해요.',
      ],
      explain: '"해와 달 중 어느 것이 더 커?"라는 물음이에요. 해가 달보다 훨씬 크니 "The sun is."라고 답해요.',
    },
    {
      id: 'p12', level: 2, type: 'short', concept: 2,
      q: '"기차는 자전거보다 더 빨라요."라는 뜻이 되게 빈칸에 알맞은 낱말 하나를 쓰세요.\n\nThe train is faster [[than]] the bike.',
      answer: ['than'],
      wrong: [
        { a: 'then', why: '철자를 확인해 보세요. "~보다"는 than(t-h-a-n)이에요. then은 "그다음에"라는 뜻이에요.' },
        { a: 'and', why: 'and는 "그리고"예요. 비교하는 상대 앞에는 "~보다"라는 뜻의 than을 써요.' },
      ],
      hint: '우리말 "~보다"에 해당하는 영어 낱말이에요.',
      explain: '비교하는 말(faster) 뒤에 "~보다"라는 뜻의 than을 쓰고, 그 뒤에 비교하는 상대(the bike)를 써요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 5,
      q: '표를 보고 **옳지 않은** 문장을 고르세요.\n\n| 이름 | 키 | 몸무게 |\n|---|---|---|\n| Jiho | 152 cm | 44 kg |\n| Mina | 148 cm | 46 kg |\n| Seojun | 155 cm | 42 kg |',
      choices: ['Seojun is taller than Jiho.', 'Mina is heavier than Seojun.', 'Jiho is heavier than Mina.', 'Mina is shorter than Jiho.'],
      answer: 2,
      why: [
        '표와 맞는 문장이에요. Seojun(155 cm)이 Jiho(152 cm)보다 키가 커요.',
        '표와 맞는 문장이에요. Mina(46 kg)가 Seojun(42 kg)보다 무거워요.',
        '',
        '표와 맞는 문장이에요. Mina(148 cm)가 Jiho(152 cm)보다 키가 작아요.',
      ],
      hint: '문장마다 키를 비교하는지, 몸무게를 비교하는지 먼저 확인해요.',
      explain: 'Jiho는 44 kg, Mina는 46 kg이라서 Mina가 더 무거워요. 그래서 "Jiho is heavier than Mina."가 옳지 않아요. 바르게 고치면 "Jiho is lighter than Mina." 또는 "Mina is heavier than Jiho."예요. 키가 더 크다고 더 무거운 것은 아니에요.',
    },
    {
      id: 'a2', level: 3, type: 'short', concept: 2,
      q: '글을 읽고, 세 사람 가운데 키가 가장 큰 사람의 이름을 영어로 쓰세요.\n\nJiho is taller than Mina. Seojun is shorter than Mina.',
      answer: ['Jiho'],
      wrong: [
        { a: 'Seojun', why: 'shorter는 "키가 더 작은"이에요. Seojun은 Mina보다 작으니 셋 중 가장 작아요.' },
        { a: 'Mina', why: 'Mina보다 키가 큰 사람(Jiho)이 있어요. 첫 문장을 다시 읽어 보세요.' },
      ],
      hint: '한 문장씩 "누가 누구보다 큰지" 그림으로 줄을 세워 보세요.',
      explain: '첫 문장: Jiho > Mina. 둘째 문장: Seojun은 Mina보다 작으니 Mina > Seojun. 줄을 세우면 Jiho > Mina > Seojun이라서 가장 큰 사람은 Jiho예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', concept: 5,
      q: "글을 읽고 빈칸에 알맞은 낱말 하나를 쓰세요.\n\nMina's pencil is 15 centimeters long. Jiho's pencil is 12 centimeters long.\nJiho's pencil is [[shorter]] than Mina's pencil.",
      answer: ['shorter'],
      wrong: [
        { a: 'longer', why: '문장의 주인공은 Jiho의 연필(12 cm)이에요. 15 cm보다 짧으니 "더 짧은"이라는 말을 써요.' },
        { a: 'short', why: 'than과 함께 쓰려면 -er을 붙인 비교하는 말이 필요해요.' },
      ],
      hint: '문장 맨 앞에 나온 것이 누구의 연필인지 먼저 확인해요.',
      explain: "주인공은 Jiho의 연필(12 cm)이고, 비교하는 상대는 Mina의 연필(15 cm)이에요. 12 cm가 더 짧으니 shorter를 써요. \"Jiho's pencil is shorter than Mina's pencil.\"",
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 1,
      q: '비교하는 말이 **바르게** 쓰인 문장을 고르세요.',
      choices: ['The rope is longer than the ribbon.', 'The box is biger than the bag.', 'My cat is heavyer than my rabbit.', 'This book is thiner than that book.'],
      answer: 0,
      why: [
        '',
        'big은 g를 한 번 더 써서 bigger예요.',
        'heavy는 y를 i로 바꾸어 heavier예요.',
        'thin은 n을 한 번 더 써서 thinner예요.',
      ],
      hint: '철자가 바뀌는 규칙(자음 겹쳐 쓰기, y → i)을 하나씩 떠올려 보세요.',
      explain: 'long은 끝에 자음이 두 개라서 그대로 -er을 붙인 longer가 맞아요. 나머지는 bigger, heavier, thinner로 써야 해요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 3,
      q: "대화의 빈칸에 알맞은 말을 고르세요.\n\nA: Who is taller, you or your sister?\nB: [[I am.]] I'm 150 centimeters tall. She's 138 centimeters tall.",
      choices: ['I am.', 'She is.', 'Yes, I am.', "I'm taller than you."],
      answer: 0,
      why: [
        '',
        'sister(B의 누나·언니 또는 여동생)는 138 cm, B는 150 cm예요. 더 큰 사람은 B 자신이에요.',
        'Who로 묻는 말에는 Yes/No로 답하지 않아요.',
        'A가 비교한 것은 B와 B의 sister예요. A(you)와 비교한 것이 아니에요.',
      ],
      hint: 'B가 말한 두 사람의 키를 비교해 보세요.',
      explain: 'B는 150 cm, B의 sister(누나·언니 또는 여동생)는 138 cm예요. B가 더 크니 "I am."(내가 더 커.)이라고 답해요.',
    },
  ],

  deeper: [
    {
      title: '중학교에서 더 배우는 비교',
      body: '이번 단원에서는 두 가지를 비교하는 **-er**을 배웠어요. 중학교에 가면 비교를 더 넓게 배워요.\n\n- 셋 이상 가운데 "가장 ~한"을 나타내는 말: tall → **tallest** (가장 키가 큰)\n- 긴 말 앞에 **more**를 쓰는 비교: beautiful → **more beautiful**\n- 모양이 아주 달라지는 말: good → **better**\n\n지금 배운 "A is 비교하는 말 than B."라는 틀은 중학교에서도 그대로 써요. 틀을 확실히 익혀 두면 새 낱말만 바꿔 끼우면 돼요.',
    },
    {
      title: '센티미터와 인치',
      body: '우리나라는 길이를 centimeter(cm)와 meter(m), 무게를 kilogram(kg)으로 재요. 이런 단위는 세계 여러 나라에서 함께 써요.\n\n그런데 미국처럼 inch(인치)와 pound(파운드)를 많이 쓰는 나라도 있어요. 1 inch는 약 2.5 cm예요. 영어로 된 글에서 inch나 pound가 나오면 "다른 단위구나" 하고 알아보면 돼요.',
    },
  ],

  faq: [
    {
      q: 'taller 대신 more tall이라고 하면 안 돼요?',
      a: 'tall처럼 짧은 말은 -er을 붙여 taller라고만 해요. more tall은 틀린 표현이에요.\n\nmore는 beautiful처럼 긴 말을 비교할 때 쓰는데, 이건 중학교에서 자세히 배워요.',
    },
    {
      q: 'Who랑 Which는 언제 써요?',
      a: '둘 중 사람을 고를 때는 Who(누구), 물건이나 동물을 고를 때는 Which(어느 것)를 써요.\n\nWho is taller, Jiho or Mina? / Which is heavier, the cat or the dog?',
    },
    {
      q: "I'm 150 centimeters tall에서 tall은 왜 붙여요?",
      a: '"키로 따져서 150센티미터"라는 뜻을 분명히 하려고 붙여요. 키를 말할 때는 숫자 뒤에 tall을 붙이는 것이 자연스러워요.\n\n길이를 말할 때도 비슷하게 long을 붙여요: The snake is 2 meters long.',
    },
    {
      q: 'big은 왜 g를 두 번 써요?',
      a: 'big처럼 모음 하나와 자음 하나로 끝나는 짧은 말은 -er을 붙일 때 마지막 자음을 한 번 더 써요. 그래야 가운데 모음 i의 짧은 소리가 그대로 유지돼요.\n\nhot → hotter, thin → thinner도 같은 규칙이에요.',
    },
  ],

  mistakes: [
    '"Mina is tall than Jiho."처럼 than 앞에 원래 말을 쓰는 실수 — than과 함께 쓸 때는 taller처럼 -er을 붙인 말을 써요.',
    'biger, heavyer처럼 철자를 틀리는 실수 — big은 bigger(자음 겹쳐 쓰기), heavy는 heavier(y를 i로)예요.',
    '"Who is taller?"에 "Yes, he is."라고 답하는 실수 — Who·Which로 묻는 말에는 둘 중 하나를 골라 "Jiho is."처럼 답해요.',
  ],

  vocab: [
    { w: 'tall', m: '키가 큰, 높은', ex: 'My father is very tall.', exm: '우리 아빠는 키가 아주 커요.' },
    { w: 'short', m: '키가 작은, 짧은', ex: 'My little sister is short.', exm: '내 여동생은 키가 작아요.' },
    { w: 'big', m: '큰', ex: 'An elephant has big ears.', exm: '코끼리는 귀가 커요.' },
    { w: 'small', m: '작은', ex: 'The mouse is small.', exm: '그 쥐는 작아요.' },
    { w: 'heavy', m: '무거운', ex: 'This box is too heavy for me.', exm: '이 상자는 나한테 너무 무거워요.' },
    { w: 'light', m: '가벼운', ex: 'My new bag is light.', exm: '내 새 가방은 가벼워요.' },
    { w: 'long', m: '긴', ex: 'The giraffe has a long neck.', exm: '기린은 목이 길어요.' },
    { w: 'fast', m: '빠른', ex: 'Cheetahs are very fast.', exm: '치타는 아주 빨라요.' },
    { w: 'slow', m: '느린', ex: 'A turtle is slow.', exm: '거북은 느려요.' },
    { w: 'old', m: '나이가 많은, 오래된', ex: 'My grandmother is seventy years old.', exm: '우리 할머니는 일흔 살이에요.' },
    { w: 'young', m: '어린, 젊은', ex: 'The puppy is very young.', exm: '그 강아지는 아주 어려요.' },
    { w: 'strong', m: '힘이 센', ex: 'My uncle is strong.', exm: '우리 삼촌은 힘이 세요.' },
    { w: 'than', m: '~보다', ex: 'A bus is bigger than a car.', exm: '버스는 자동차보다 더 커요.' },
    { w: 'centimeter', m: '센티미터(cm)', ex: 'This pencil is 15 centimeters long.', exm: '이 연필은 길이가 15센티미터예요.' },
    { w: 'kilogram', m: '킬로그램(kg)', ex: 'The watermelon is 6 kilograms.', exm: '그 수박은 6킬로그램이에요.' },
    { w: 'giraffe', m: '기린', ex: 'A giraffe is taller than a horse.', exm: '기린은 말보다 키가 더 커요.' },
  ],
});
