/* 5학년 영어 · 하루 일과 말하기 */
Tutor.registerUnit({
  id: 'eng-e5-06',
  course: 'eng-e5',
  title: '하루 일과 말하기',
  summary: 'What time do you get up?으로 일과를 묻고, 하루 동안 하는 일과 얼마나 자주 하는지 말해요.',
  goals: [
    'What time do you ~?로 일과의 시각을 묻고 답할 수 있어요.',
    'get up, have breakfast처럼 일과를 나타내는 말을 쓸 수 있어요.',
    'She gets up at six.처럼 다른 사람의 일과를 말할 수 있어요.',
    'always, usually, sometimes, never로 얼마나 자주 하는지 말할 수 있어요.',
  ],
  standards: ['[6영01-06]', '[6영02-02]', '[6영02-07]'],

  concepts: [
    {
      title: '일과의 시각 묻고 답하기',
      body: "**일과**는 날마다 되풀이해서 하는 일이에요. 몇 시에 하는지 물을 때는 **What time**을 써요.\n\n- **What time do you get up?** 너는 몇 시에 일어나니?\n- **I get up at seven thirty.** 나는 7시 30분에 일어나.\n\n시각 앞에는 **at**을 붙여요. 시각은 '시'를 먼저, '분'을 나중에 말해요.\n\n| 시각 | 영어 |\n|---|---|\n| 7:00 | seven o'clock (또는 seven) |\n| 7:30 | seven thirty |\n| 8:20 | eight twenty |\n\n> ⚠️ 정각에만 o'clock을 붙여요. 7시 30분을 seven o'clock thirty라고 하지 않아요.",
      easy: "시계를 보고 짧은바늘이 가리키는 '시'를 먼저 읽고, 긴바늘이 가리키는 '분'을 나중에 읽어요.\n\n7시 30분이면 seven(7) → thirty(30), 그래서 **seven thirty**예요.\n\n\"몇 시에?\"는 What time, \"~시에\"는 at이에요. at seven thirty = 7시 30분에.",
      fig: { type: 'clock', h: 7, m: 30, alt: '7시 30분을 가리키는 시계' },
      check: {
        type: 'choice',
        q: '7시 30분을 영어로 바르게 말한 것은 무엇일까요?',
        choices: ['seven thirty', 'thirty seven', "seven o'clock"],
        answer: 0,
        why: ['', '시와 분의 순서가 바뀌었어요. 시(seven)를 먼저 말해요.', "o'clock은 정각(7시 00분)일 때만 써요."],
        explain: "시를 먼저, 분을 나중에 말해요. 7시 30분은 seven thirty예요.",
      },
    },
    {
      title: '일과를 나타내는 말',
      body: "하루 동안 하는 일을 영어로 알아봐요.\n\n| 영어 | 뜻 |\n|---|---|\n| get up | 일어나다 |\n| have breakfast | 아침을 먹다 |\n| go to school | 학교에 가다 |\n| have lunch | 점심을 먹다 |\n| come home | 집에 오다 |\n| do my homework | 숙제를 하다 |\n| have dinner | 저녁을 먹다 |\n| go to bed | 잠자리에 들다 |\n\n밥을 먹을 때는 eat 대신 **have**를 많이 써요: have breakfast, have lunch, have dinner.\n\n> 💡 go to school, go to bed에는 the를 붙이지 않아요.",
      easy: "아침부터 밤까지 내 하루를 차례로 떠올려 보세요.\n\n일어나요(get up) → 아침을 먹어요(have breakfast) → 학교에 가요(go to school) → 집에 와요(come home) → 숙제를 해요(do my homework) → 저녁을 먹어요(have dinner) → 잠자리에 들어요(go to bed).",
      check: {
        type: 'choice',
        q: "'아침을 먹다'를 영어로 바르게 나타낸 것은 무엇일까요?",
        choices: ['have breakfast', 'have dinner', 'go to bed'],
        answer: 0,
        why: ['', 'dinner는 저녁 식사예요.', 'go to bed는 잠자리에 들다예요.'],
        explain: 'breakfast는 아침 식사예요. 그래서 아침을 먹다는 have breakfast예요.',
      },
    },
    {
      title: '다른 사람의 일과 말하기',
      body: "나(I)나 너(you)가 아니라 **다른 한 사람**(he, she, Jia, my dad …)의 일과를 말할 때는 동사 끝에 **-s**나 **-es**를 붙여요.\n\n| I / you | he / she / Jia |\n|---|---|\n| get up | get**s** up |\n| come home | come**s** home |\n| go to bed | go**es** to bed |\n| watch TV | watch**es** TV |\n| do my homework | **does** her(his) homework |\n| have breakfast | **has** breakfast |\n\n- **She gets up at six.** 그녀는 6시에 일어나.\n- **He goes to bed at nine.** 그는 9시에 잠자리에 들어.\n\n묻는 말은 do 대신 **does**를 써요: What time **does** she get up? — She gets up at six.\n\n> ⚠️ have는 has, do는 does로 모양이 바뀌어요. haves, dos라고 쓰지 않아요.",
      easy: "\"나\"와 \"너\"는 그냥 말하고, \"그 사람\"(he, she, 친구 이름)이 하는 일에는 꼬리 s를 달아 준다고 기억하세요.\n\nI get up. → Jia get**s** up.\nI go to bed. → Minsu go**es** to bed.\n\no, ch, sh로 끝나는 말에는 -es를 붙여요(goes, watches). have와 do는 has, does로 바뀌어요.",
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nShe [[빈칸]] up at six.',
        choices: ['gets', 'get', 'getting'],
        answer: 0,
        why: ['', 'She는 다른 한 사람이라 동사 끝에 -s를 붙여요.', '-ing 모양은 이 문장에 혼자 쓸 수 없어요.'],
        explain: 'She(그녀)는 나도 너도 아닌 다른 한 사람이에요. 그래서 get에 -s를 붙여 gets라고 해요. She gets up at six.',
      },
    },
    {
      title: '얼마나 자주 하는지 나타내는 말',
      body: "어떤 일을 얼마나 자주 하는지는 이런 말로 나타내요.\n\n| 낱말 | 뜻 | 일주일에 (대략) |\n|---|---|---|\n| always | 항상 | ●●●●●●● |\n| usually | 대개, 보통 | ●●●●●○○ |\n| sometimes | 가끔, 때때로 | ●●○○○○○ |\n| never | 한 번도 ~ 않다 | ○○○○○○○ |\n\n이 말들은 보통 **동사 바로 앞**에 와요.\n\n- I **always** get up at seven. 나는 항상 7시에 일어나.\n- She **usually** walks to school. 그녀는 대개 걸어서 학교에 가.\n- He **never** watches TV in the morning. 그는 아침에 절대 텔레비전을 보지 않아.\n\n> 💡 never에는 '않다'라는 뜻이 들어 있어요. 그래서 never 하나만 쓰면 '한 번도 하지 않는다'는 뜻이 돼요.",
      easy: "일주일 7일 동안 몇 번 하는지 떠올려 보세요.\n\n날마다 하면 always, 거의 날마다 하면 usually, 가끔 하면 sometimes, 한 번도 안 하면 never예요.\n\n자리는 '누가' 다음, '무엇을 한다' 앞이에요: I **always** brush my teeth.",
      check: {
        type: 'ox',
        q: "**never**는 '한 번도 하지 않는다'는 뜻이에요.",
        answer: true,
        explain: "never는 '한 번도 ~ 않다'라는 뜻이에요. I never eat carrots.는 '나는 당근을 절대 먹지 않아.'라는 뜻이에요.",
      },
    },
    {
      title: '일과를 소개하는 글 읽기',
      body: "일과를 소개하는 글은 보통 **하루가 흐르는 순서**대로 써요. 순서를 찾을 때는 이런 말을 단서로 삼아요.\n\n- **시각**: at seven, at eight thirty …\n- **때를 나타내는 말**: in the morning(아침에), after school(방과 후에), in the evening(저녁에)\n- **순서를 나타내는 말**: then(그다음에)\n\n> I get up at seven. Then I have breakfast. I go to school at eight twenty. After school, I play soccer. I go to bed at ten.\n\n이 글의 순서는 일어나기 → 아침 먹기 → 학교 가기 → 축구하기 → 잠자리에 들기예요.\n\n> 💡 글의 문장 순서와 일이 일어난 순서가 다를 때도 있어요. 그럴 때는 시각을 비교해요.",
      easy: "글을 읽으면서 시각이나 then, after school 같은 말에 동그라미를 친다고 생각해 보세요.\n\n동그라미 친 말을 시계 순서대로 늘어놓으면 하루가 보여요.",
      check: {
        type: 'choice',
        q: '다음 글에서 가장 먼저 하는 일은 무엇일까요?\n\nI have breakfast at eight. I get up at seven thirty. I go to school at eight thirty.',
        choices: ['get up', 'have breakfast', 'go to school'],
        answer: 0,
        why: ['', '아침은 8시에 먹어요. 7시 30분에 하는 일이 더 먼저예요.', '학교는 8시 30분에 가요. 가장 늦어요.'],
        explain: '시각을 비교해요. 7:30(get up) → 8:00(have breakfast) → 8:30(go to school)이므로 가장 먼저 하는 일은 일어나기(get up)예요.',
      },
    },
  ],

  examples: [
    {
      q: '그림의 시계를 보고 대화를 완성해 보세요.\n\nA: What time do you go to school?\nB: I go to school at [[빈칸]].',
      fig: { type: 'clock', h: 8, m: 20, alt: '8시 20분을 가리키는 시계' },
      steps: [
        '짧은바늘이 8과 9 사이에 있으니 8시예요. 영어로 eight.',
        '긴바늘이 4를 가리키니 20분이에요. 영어로 twenty.',
        '시를 먼저, 분을 나중에 말해요: eight twenty.',
        '시각 앞에는 at을 붙여요: I go to school at eight twenty.',
      ],
      answer: 'I go to school at eight twenty.',
    },
    {
      q: "민수(Minsu)의 일과를 영어로 말해 보세요.\n\n'I do my homework at five.'를 Minsu로 바꾸어 쓰면?",
      steps: [
        'Minsu는 나(I)도 너(you)도 아닌 다른 한 사람이에요.',
        'do는 does로 바꿔요(dos라고 쓰지 않아요).',
        "my(나의)는 his(그의)로 바꿔요. Minsu의 숙제니까요.",
        '그래서 Minsu does his homework at five.예요.',
      ],
      answer: 'Minsu does his homework at five.',
    },
  ],

  terms: [
    { term: '일과', def: '날마다 되풀이해서 하는 일이에요. 일어나기, 학교 가기, 잠자리에 들기 같은 것이에요.' },
    { term: 'What time', def: "'몇 시에'라는 뜻으로 시각을 물을 때 써요. 예: What time do you have lunch?" },
    { term: 'at', def: "시각 앞에 붙여 '~시에'라는 뜻을 나타내요. 예: at nine(9시에)" },
    { term: "o'clock", def: "정각을 나타내요. 예: seven o'clock(7시 정각)" },
    { term: 'always', def: '항상. 날마다 빠짐없이 할 때 써요.' },
    { term: 'usually', def: '대개, 보통. 거의 날마다 할 때 써요.' },
    { term: 'sometimes', def: '가끔, 때때로. 할 때도 있고 안 할 때도 있을 때 써요.' },
    { term: 'never', def: '한 번도 ~ 않다. 전혀 하지 않을 때 써요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '그림의 시계를 보고 빈칸에 알맞은 말을 고르세요.\n\nA: What time do you get up?\nB: I get up at [[빈칸]].',
      fig: { type: 'clock', h: 6, m: 30, alt: '6시 30분을 가리키는 시계' },
      choices: ['six thirty', 'thirty six', 'seven thirty', "six o'clock"],
      answer: 0,
      why: [
        '',
        '시와 분의 순서가 바뀌었어요. 시를 먼저 말해요.',
        '짧은바늘이 6과 7 사이에 있으면 아직 6시예요.',
        "o'clock은 정각일 때만 써요. 긴바늘이 6을 가리키면 30분이에요.",
      ],
      explain: '짧은바늘이 6과 7 사이, 긴바늘이 6을 가리키니 6시 30분이에요. 시를 먼저 말해 six thirty예요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
      q: "우리말에 맞게 빈칸에 알맞은 낱말 하나를 쓰세요.\n\n'나는 7시에 아침을 먹어.'\nI have [[빈칸]] at seven.",
      answer: ['breakfast'],
      wrong: [
        { a: 'lunch', why: 'lunch는 점심 식사예요. 아침 식사는 breakfast예요.' },
        { a: 'dinner', why: 'dinner는 저녁 식사예요. 아침 식사는 breakfast예요.' },
      ],
      explain: '아침 식사는 breakfast예요. I have breakfast at seven.(나는 7시에 아침을 먹어.)',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nJia [[빈칸]] up at six.',
      choices: ['gets', 'get', 'getting', 'is get'],
      answer: 0,
      why: [
        '',
        'Jia는 다른 한 사람이라 get에 -s를 붙여요.',
        '-ing 모양은 이 문장에 혼자 쓸 수 없어요.',
        'is와 get을 함께 쓰지 않아요. gets 하나면 돼요.',
      ],
      explain: 'Jia는 나도 너도 아닌 다른 한 사람이에요. 그래서 gets를 써요. Jia gets up at six.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: '**He go to school at eight thirty.**는 바른 문장이에요.',
      answer: false,
      explain: 'He(그)는 다른 한 사람이라 go에 -es를 붙여야 해요. 바른 문장은 He goes to school at eight thirty.예요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '**Minsu never watches TV in the morning.**의 뜻은 무엇일까요?',
      choices: [
        '민수는 아침에 절대 텔레비전을 보지 않아요.',
        '민수는 아침에 항상 텔레비전을 봐요.',
        '민수는 아침에 가끔 텔레비전을 봐요.',
        '민수는 아침에 대개 텔레비전을 봐요.',
      ],
      answer: 0,
      why: ['', "'항상'은 always예요.", "'가끔'은 sometimes예요.", "'대개'는 usually예요."],
      explain: "never는 '한 번도 ~ 않다'라는 뜻이에요. 그래서 민수는 아침에 텔레비전을 절대 보지 않아요.",
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 3,
      q: "우리말에 맞게 빈칸에 알맞은 낱말 하나를 쓰세요.\n\n'나는 저녁을 먹은 뒤에 **항상** 숙제를 해.'\nI [[빈칸]] do my homework after dinner.",
      answer: ['always'],
      wrong: [
        { a: 'usually', why: "usually는 '대개'예요. '항상'은 always예요." },
        { a: 'sometimes', why: "sometimes는 '가끔'이에요. '항상'은 always예요." },
      ],
      explain: "'항상'은 always예요. 동사(do) 앞에 써요. I always do my homework after dinner.",
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 0,
      q: '**What time do you go to bed?**에 알맞은 대답은 무엇일까요?',
      choices: ['I go to bed at nine thirty.', 'I get up at nine thirty.', 'Yes, I do.', 'I go to school.'],
      answer: 0,
      why: [
        '',
        '일어나는 시각을 말했어요. 질문은 잠자리에 드는 시각(go to bed)을 물어요.',
        'What time으로 물으면 Yes/No가 아니라 시각을 말해요.',
        '시각이 없어요. What time으로 물으면 at과 함께 시각을 말해요.',
      ],
      explain: '잠자리에 드는 시각을 물었으니 I go to bed at nine thirty.(나는 9시 30분에 잠자리에 들어.)가 알맞아요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 3,
      q: "우리말에 맞게 순서대로 놓으세요.\n\n'그는 대개 10시에 잠자리에 들어.'",
      choices: ['He', 'usually', 'goes', 'to bed', 'at ten'],
      answer: [0, 1, 2, 3, 4],
      hint: '얼마나 자주를 나타내는 말은 동사 바로 앞에 와요.',
      explain: 'He(그는) + usually(대개) + goes to bed(잠자리에 든다) + at ten(10시에). usually는 동사 goes 바로 앞에 와요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'text', concept: 2,
      q: "빈칸에 알맞은 낱말 하나를 쓰세요.\n\nI do my homework at four.\n→ Minsu [[빈칸]] his homework at four.",
      answer: ['does'],
      wrong: [
        { a: 'do', why: 'Minsu는 다른 한 사람이라 do의 모양을 바꿔야 해요.' },
        { a: 'dos', why: 'do는 -es를 붙여 does로 써요. dos라고 쓰지 않아요.' },
      ],
      hint: 'do는 다른 한 사람이 할 때 모양이 바뀌어요.',
      explain: 'Minsu는 다른 한 사람이라 do가 does로 바뀌어요. Minsu does his homework at four.',
    },
    {
      id: 'p10', level: 2, type: 'order', concept: 4,
      q: "글을 읽고 도윤이가 한 일을 순서대로 놓으세요.\n\nMy name is Doyun. I get up at seven. Then I have breakfast. I go to school at eight twenty. After school, I play soccer with my friends. I do my homework at five. I go to bed at ten.",
      choices: ['have breakfast', 'go to school', 'play soccer', 'do my homework'],
      answer: [0, 1, 2, 3],
      hint: 'then, after school 같은 말과 시각을 단서로 삼아요.',
      explain: '일어나서(7시) 그다음에(then) 아침을 먹고 → 8시 20분에 학교에 가고 → 방과 후(after school)에 축구를 하고 → 5시에 숙제를 해요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '낱말이 바른 자리에 있는 문장은 무엇일까요?',
      choices: ['I always get up at seven.', 'I get always up at seven.', 'I get up always at seven.', 'I get up at always seven.'],
      answer: 0,
      why: [
        '',
        'always가 get과 up 사이에 끼었어요. 동사(get up) 앞에 와야 해요.',
        'always가 동사 뒤에 왔어요. 동사 앞에 와야 해요.',
        'always가 시각 사이에 끼었어요. 동사 앞에 와야 해요.',
      ],
      explain: 'always 같은 말은 동사 바로 앞에 와요. I always get up at seven.(나는 항상 7시에 일어나.)',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 4,
      q: "글을 읽고 물음에 답하세요.\n\nHi, I'm Haeun. I get up at six thirty. I usually walk to school. I have lunch at twelve thirty. I come home at three. I sometimes play the piano in the evening.\n\n하은이는 몇 시에 집에 오나요?",
      choices: ['3시', '6시 30분', '12시 30분', '3시 30분'],
      answer: 0,
      why: ['', '6시 30분은 일어나는 시각이에요.', '12시 30분은 점심을 먹는 시각이에요.', 'three는 3시 정각이에요. 30분이 아니에요.'],
      hint: 'come home(집에 오다)이 들어 있는 문장을 찾아요.',
      explain: 'I come home at three.에서 at three는 3시예요. 그래서 하은이는 3시에 집에 와요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: "지아(Jia)의 일주일을 나타낸 표를 보고 빈칸에 가장 알맞은 낱말을 고르세요.\n\n| 하는 일 | 월 | 화 | 수 | 목 | 금 | 토 | 일 |\n|---|---|---|---|---|---|---|---|\n| jump rope | ○ | ○ | ○ | ○ | ○ | ○ | ○ |\n| play the piano | ○ | ✕ | ✕ | ○ | ✕ | ✕ | ✕ |\n| watch TV | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |\n\nJia [[빈칸]] plays the piano.",
      choices: ['sometimes', 'always', 'never', 'usually'],
      answer: 0,
      why: [
        '',
        'always는 날마다 할 때 써요. 날마다 하는 것은 jump rope(줄넘기)예요.',
        'never는 한 번도 안 할 때 써요. 한 번도 안 하는 것은 watch TV예요.',
        'usually는 거의 날마다 할 때 써요. 피아노는 일주일에 두 번만 쳐요.',
      ],
      hint: 'play the piano 줄에서 ○가 몇 개인지 세어 보세요.',
      explain: '피아노는 일주일 7일 중 2일(월, 목)만 쳐요. 가끔 하는 일이니 sometimes가 알맞아요. Jia sometimes plays the piano.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '**틀린** 문장은 무엇일까요?',
      choices: ['Mina do her homework at five.', 'She has breakfast at eight.', 'He watches TV after dinner.', 'Jiho goes to school at eight thirty.'],
      answer: 0,
      why: [
        '',
        'have가 has로 바르게 바뀌었어요.',
        'watch에 -es를 붙인 watches가 맞아요.',
        'go에 -es를 붙인 goes가 맞아요.',
      ],
      hint: '주어가 다른 한 사람일 때 동사의 모양이 바뀌었는지 하나씩 살펴보세요.',
      explain: 'Mina는 다른 한 사람이라 do를 does로 써야 해요. 바른 문장은 Mina does her homework at five.예요.',
    },
    {
      id: 'a3', level: 3, type: 'order', concept: 4,
      q: "글을 읽고 서윤이가 하는 일을 **시각 순서대로** 놓으세요.\n\nSeoyun does her homework at four in the afternoon. She gets up at seven in the morning. She has dinner at six thirty in the evening. She goes to school at eight in the morning.",
      choices: ['gets up', 'goes to school', 'does her homework', 'has dinner'],
      answer: [0, 1, 2, 3],
      hint: '글의 문장 순서가 아니라 시각을 비교해요. in the morning(아침), in the afternoon(오후), in the evening(저녁)도 단서예요.',
      explain: '아침 7시 일어나기(gets up) → 아침 8시 학교 가기(goes to school) → 오후 4시 숙제하기(does her homework) → 저녁 6시 30분 저녁 먹기(has dinner) 순서예요. 글에서 처음 나온 숙제가 가장 먼저 하는 일은 아니에요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      q: "대화의 빈칸에 가장 알맞은 낱말을 고르세요.\n\nA: What time do you get up?\nB: I get up at six thirty.\nA: Do you always get up at six thirty?\nB: No. I [[빈칸]] get up at six thirty. On Sundays, I get up at eight.",
      choices: ['usually', 'always', 'never'],
      answer: 0,
      why: [
        '',
        'B가 No라고 했고 일요일에는 8시에 일어나요. 날마다는 아니니 always가 아니에요.',
        '6시 30분에 일어나는 날이 대부분이에요. 한 번도 안 하는 것이 아니에요.',
      ],
      hint: '일요일만 빼고 나머지 날에는 몇 시에 일어나는지 생각해 보세요.',
      explain: '일요일 하루만 8시에 일어나고 나머지 날은 6시 30분에 일어나요. 거의 날마다 하는 일이니 usually(대개)가 알맞아요.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nA: What time does your dad get up?\nB: He [[빈칸]] up at six.',
      answer: ['gets'],
      wrong: [
        { a: 'get', why: '질문에는 does가 있어서 get을 썼지만, 대답에는 does가 없어요. He 뒤에서는 gets로 써요.' },
        { a: 'does', why: 'does는 질문할 때 써요. 대답은 He gets up at six.처럼 해요.' },
      ],
      hint: '질문의 does는 대답에 나오지 않아요. 대신 동사 모양이 바뀌어요.',
      explain: '묻는 말에서는 does가 있어 get을 그대로 쓰지만, 대답에서는 does가 빠지고 get이 gets로 바뀌어요. He gets up at six.(그는 6시에 일어나.)',
    },
  ],

  deeper: [
    {
      title: '-s를 붙이는 여러 가지 방법',
      body: "다른 한 사람의 일을 말할 때 동사 끝에 붙이는 꼬리는 낱말의 끝 글자에 따라 조금씩 달라요.\n\n| 끝 글자 | 붙이는 방법 | 예 |\n|---|---|---|\n| 대부분 | -s | play → plays, read → reads |\n| o, s, x, ch, sh | -es | go → goes, watch → watches, wash → washes |\n| 자음 + y | y를 i로 바꾸고 -es | study → studies |\n| 특별한 것 | 모양이 바뀜 | have → has, do → does |\n\n6학년에서는 이 규칙으로 건강한 습관처럼 다른 사람의 생활을 더 길게 말해 봐요.",
    },
  ],

  faq: [
    {
      q: '왜 She get up이 아니라 She gets up이에요?',
      a: '영어에서는 나(I)나 너(you)가 아닌 다른 한 사람(he, she, 친구 이름)이 늘 하는 일을 말할 때 동사 끝에 -s나 -es를 붙여요. 그래서 She gets up, He goes to bed처럼 써요.',
    },
    {
      q: "seven o'clock이라고 해야 해요, seven이라고 해도 돼요?",
      a: "둘 다 돼요. 정각일 때는 I get up at seven. 또는 I get up at seven o'clock.이라고 해요. 하지만 7시 30분처럼 분이 있을 때는 o'clock을 붙이지 않고 seven thirty라고 해요.",
    },
    {
      q: 'always나 never는 문장 어디에 넣어요?',
      a: '보통 동사 바로 앞에 넣어요. I **always** get up at seven. / He **never** watches TV. 처럼 "누가" 다음, "무엇을 한다" 앞이에요.',
    },
  ],

  mistakes: [
    'He go to school.처럼 다른 한 사람의 일에 -s/-es를 빠뜨리는 실수 — He goes to school.',
    'have, do를 haves, dos로 쓰는 실수 — has, does로 모양이 바뀌어요.',
    '7시 30분을 thirty seven처럼 분을 먼저 말하는 실수 — 시를 먼저 말해 seven thirty예요.',
  ],

  gens: [
    {
      id: 'routine-time',
      level: 1,
      title: '시계 보고 일과 시각 말하기',
      make: function (R) {
        var nums = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
        var mins = { 10: 'ten', 20: 'twenty', 30: 'thirty', 40: 'forty', 50: 'fifty' };
        var acts = [
          ['get up', '일어나다', 6, 7],
          ['have breakfast', '아침을 먹다', 7, 8],
          ['go to school', '학교에 가다', 8, 8],
          ['come home', '집에 오다', 2, 4],
          ['do my homework', '숙제를 하다', 4, 5, 'do your homework'],
          ['have dinner', '저녁을 먹다', 6, 7],
          ['go to bed', '잠자리에 들다', 9, 10],
        ];
        var act = R.pick(acts);
        var h = R.int(act[2], act[3]);
        var m = R.pick([0, 10, 20, 30, 40, 50]);
        function say(hh, mm) { return mm === 0 ? nums[hh] + " o'clock" : nums[hh] + ' ' + mins[mm]; }
        var correct = say(h, m);
        var cands = [
          [say(h + 1, m), '짧은바늘이 가리키는 시를 다시 보세요. 짧은바늘이 두 숫자 사이에 있으면 앞의 숫자가 시예요.'],
          [say(h - 1, m), '짧은바늘이 가리키는 시를 다시 보세요.'],
          [say(h, m === 50 ? 40 : m + 10), '긴바늘이 가리키는 분을 다시 보세요. 긴바늘이 가리키는 숫자에 5를 곱하면 분이에요.'],
        ];
        if (m === 0) {
          cands.push([nums[h] + ' thirty', "긴바늘이 12를 가리키면 정각이에요. o'clock을 써요."]);
        } else {
          cands.push([mins[m] + ' ' + nums[h], '시와 분의 순서가 바뀌었어요. 시를 먼저 말해요.']);
          cands.push([nums[h] + " o'clock", "o'clock은 정각일 때만 써요. 분까지 말해야 해요."]);
        }
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, R.shuffle(cands.map(function (c) { return c[0]; })));
        var timeKo = h + '시' + (m === 0 ? ' 정각' : ' ' + m + '분');
        return {
          type: 'choice', concept: 0,
          fig: { type: 'clock', h: h, m: m, alt: '일과 시각을 가리키는 시계' },
          q: '그림의 시계를 보고 빈칸에 알맞은 말을 고르세요.\n\nA: What time do you ' + (act[4] || act[0]) + '?\nB: I ' + act[0] + ' at [[빈칸]].',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '시계는 ' + timeKo + '을 가리켜요. 시를 먼저, 분을 나중에 말해요: ' + correct + '. (' + act[0] + ': ' + act[1] + ')',
        };
      },
    },
    {
      id: 'third-person',
      level: 2,
      title: '다른 사람의 일과 말하기 (-s, -es)',
      make: function (R) {
        var people = [['Jia', 'her'], ['Minsu', 'his'], ['Seoyun', 'her'], ['Doyun', 'his'], ['My sister', 'her'], ['My brother', 'his'], ['She', 'her'], ['He', 'his']];
        var person = R.pick(people);
        // [바뀐 모양, 동사원형, 잘못 붙인 모양, -ing, 뒤에 오는 말, 때, 규칙]
        var acts = [
          ['gets', 'get', 'getes', 'getting', 'up', ['at six', 'at seven', 'at six thirty', 'at seven thirty'], 'get에는 -s를 붙여요'],
          ['has', 'have', 'haves', 'having', 'breakfast', ['at seven', 'at seven thirty', 'at eight'], 'have는 has로 모양이 바뀌어요'],
          ['goes', 'go', 'gos', 'going', 'to school', ['at eight', 'at eight twenty', 'at eight thirty'], 'go처럼 o로 끝나는 말에는 -es를 붙여요'],
          ['does', 'do', 'dos', 'doing', person[1] + ' homework', ['at four', 'at five', 'after dinner'], 'do는 does로 모양이 바뀌어요'],
          ['watches', 'watch', 'watchs', 'watching', 'TV', ['after dinner', 'in the evening', 'at seven'], 'ch로 끝나는 말에는 -es를 붙여요'],
          ['washes', 'wash', 'washs', 'washing', person[1] + ' face', ['in the morning', 'at seven', 'before breakfast'], 'sh로 끝나는 말에는 -es를 붙여요'],
          ['plays', 'play', 'plaies', 'playing', 'soccer', ['after school', 'at four', 'on Saturdays'], 'play에는 -s만 붙여요'],
          ['comes', 'come', 'comees', 'coming', 'home', ['at three', 'at four', 'after school'], 'come에는 -s를 붙여요'],
        ];
        var a = R.pick(acts);
        var when = R.pick(a[5]);
        var correct = a[0];
        var who = person[0] === 'She' ? 'She(그녀)' : person[0] === 'He' ? 'He(그)' : person[0];
        var reason = {};
        reason[a[1]] = '주어가 다른 한 사람이라 동사 모양을 바꿔야 해요. ' + a[6] + '.';
        reason[a[2]] = '꼬리를 잘못 붙였어요. ' + a[6] + '.';
        reason[a[3]] = '-ing 모양은 이 문장에 혼자 쓸 수 없어요.';
        reason['is ' + a[1]] = 'is와 동사를 함께 쓰지 않아요. ' + a[0] + ' 하나면 돼요.';
        var pick = R.choices(correct, R.shuffle([a[1], a[2], a[3], 'is ' + a[1]]));
        return {
          type: 'choice', concept: 2,
          q: '빈칸에 알맞은 말을 고르세요.\n\n' + person[0] + ' [[빈칸]] ' + a[4] + ' ' + when + '.',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '주어 ' + who + '처럼 나(I)도 너(you)도 아닌 다른 한 사람의 일을 말할 때는 동사 모양이 바뀌어요. ' + a[6] + '.\n\n' + person[0] + ' ' + a[0] + ' ' + a[4] + ' ' + when + '.',
        };
      },
    },
  ],

  vocab: [
    { w: 'get up', m: '일어나다', ex: 'I get up at seven every day.', exm: '나는 날마다 7시에 일어나.' },
    { w: 'have breakfast', m: '아침을 먹다', ex: 'We have breakfast together.', exm: '우리는 함께 아침을 먹어.' },
    { w: 'go to school', m: '학교에 가다', ex: 'I go to school at eight twenty.', exm: '나는 8시 20분에 학교에 가.' },
    { w: 'have lunch', m: '점심을 먹다', ex: 'We have lunch at twelve thirty.', exm: '우리는 12시 30분에 점심을 먹어.' },
    { w: 'come home', m: '집에 오다', ex: 'My brother comes home at four.', exm: '우리 형(오빠)은 4시에 집에 와.' },
    { w: 'do my homework', m: '(내) 숙제를 하다', ex: 'I do my homework after school.', exm: '나는 방과 후에 숙제를 해.' },
    { w: 'have dinner', m: '저녁을 먹다', ex: 'My family has dinner at six thirty.', exm: '우리 가족은 6시 30분에 저녁을 먹어.' },
    { w: 'go to bed', m: '잠자리에 들다', ex: 'She goes to bed at nine thirty.', exm: '그녀는 9시 30분에 잠자리에 들어.' },
    { w: 'always', m: '항상', ex: 'I always brush my teeth after lunch.', exm: '나는 점심을 먹은 뒤에 항상 이를 닦아.' },
    { w: 'usually', m: '대개, 보통', ex: 'He usually walks to school.', exm: '그는 대개 걸어서 학교에 가.' },
    { w: 'sometimes', m: '가끔, 때때로', ex: 'I sometimes ride my bike to the park.', exm: '나는 가끔 자전거를 타고 공원에 가.' },
    { w: 'never', m: '한 번도 ~ 않다', ex: 'My cat never gets up early.', exm: '우리 고양이는 절대 일찍 일어나지 않아.' },
    { w: "o'clock", m: '~시 (정각)', ex: "School starts at nine o'clock.", exm: '학교는 9시 정각에 시작해.' },
    { w: 'morning', m: '아침, 오전', ex: 'I wash my face in the morning.', exm: '나는 아침에 세수를 해.' },
    { w: 'evening', m: '저녁', ex: 'We read books in the evening.', exm: '우리는 저녁에 책을 읽어.' },
    { w: 'after school', m: '방과 후에', ex: 'I play soccer after school.', exm: '나는 방과 후에 축구를 해.' },
  ],
});
