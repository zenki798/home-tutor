/* 4학년 영어 · 요일 묻고 답하기 */
Tutor.registerUnit({
  id: 'eng-e4-09',
  course: 'eng-e4',
  title: '요일 묻고 답하기',
  summary: 'What day is it today?로 요일을 묻고 It\'s Tuesday.처럼 답하며, 요일마다 하는 일을 말해요.',
  goals: [
    '일곱 요일의 영어 이름을 알고, 첫 글자를 대문자로 쓸 수 있어요.',
    'What day is it today?로 요일을 묻고 답할 수 있어요.',
    'on Saturday처럼 요일마다 하는 일을 말할 수 있어요.',
    '주간 계획표를 보고 요일 정보를 찾을 수 있어요.',
  ],
  standards: [],

  concepts: [
    {
      title: '일곱 요일의 이름',
      body: '한 주(**week**)는 7일이에요. 영어 요일 이름은 모두 **-day**로 끝나요.\n\n| 영어 | 우리말 |\n|---|---|\n| **Monday** | 월요일 |\n| **Tuesday** | 화요일 |\n| **Wednesday** | 수요일 |\n| **Thursday** | 목요일 |\n| **Friday** | 금요일 |\n| **Saturday** | 토요일 |\n| **Sunday** | 일요일 |\n\n월요일 다음은 화요일이듯, 영어도 Monday 다음은 Tuesday예요. 토요일과 일요일은 묶어서 **weekend**(주말)라고 해요.\n\n> 💡 Tuesday와 Thursday는 둘 다 T로 시작해서 헷갈리기 쉬워요. **Tu**esday가 먼저(화요일), **Th**ursday가 나중(목요일)이에요.',
      easy: '요일 이름 뒤에는 모두 day가 붙어 있어요. 앞부분만 다르지요.\n\n- **Mon**day, **Tues**day, **Wednes**day, **Thurs**day, **Fri**day, **Satur**day, **Sun**day\n\n달력에서 월요일부터 손가락으로 하나씩 짚으며 영어 이름을 말해 보세요. 일곱 번 짚으면 한 주가 끝나고, 다시 Monday로 돌아와요.',
      check: {
        type: 'choice',
        q: '**목요일**을 영어로 바르게 쓴 것은 무엇일까요?',
        choices: ['Thursday', 'Tuesday', 'Wednesday'],
        answer: 0,
        why: ['', 'Tuesday는 화요일이에요. 목요일은 Th로 시작하는 Thursday예요.', 'Wednesday는 수요일이에요. 목요일은 수요일 바로 다음 날이에요.'],
        explain: '목요일은 **Thursday**예요. 화요일 Tuesday와 헷갈리지 않게 Th로 시작하는 것을 기억해요.',
      },
    },
    {
      title: '요일 이름은 대문자로 시작해요',
      body: '영어에서 요일 이름은 **언제나 첫 글자를 대문자로** 써요. 문장 가운데에 있어도 마찬가지예요.\n\n- I swim on **T**uesday. (O)\n- I swim on **t**uesday. (X)\n\n사람 이름(Mina, Junho)이나 나라 이름(Korea)처럼, 요일도 하나뿐인 특별한 이름이라서 대문자로 시작해요.\n\n달력이나 계획표에서는 짧게 줄여 쓰기도 해요. 줄여 쓸 때도 대문자로 시작하고, 끝에 점(.)을 찍어요.\n\n| Mon. | Tue. | Wed. | Thu. | Fri. | Sat. | Sun. |\n|---|---|---|---|---|---|---|\n| 월 | 화 | 수 | 목 | 금 | 토 | 일 |',
      easy: '요일 이름은 이름표를 단 친구라고 생각해 보세요. 친구 이름 Mina를 쓸 때 M을 크게 쓰지요? 요일도 이름이 있는 특별한 날이라서 첫 글자를 크게 써요.\n\nMonday의 M, Sunday의 S처럼 맨 앞 한 글자만 대문자예요. 나머지는 소문자예요.',
      check: {
        type: 'ox',
        q: '문장 가운데에 있는 요일 이름은 소문자로 시작해도 돼요. (예: I play on friday.)',
        answer: false,
        explain: '요일 이름은 문장 어디에 있든 첫 글자를 대문자로 써요. 바르게 고치면 I play on **F**riday.예요.',
      },
    },
    {
      title: '요일 묻고 답하기',
      body: '오늘이 무슨 요일인지 물을 때는 이렇게 말해요.\n\n**What day is it today?** (오늘은 무슨 요일이에요?)\n\n대답은 **It\'s** 다음에 요일 이름을 써요.\n\n**It\'s Tuesday.** (화요일이에요.)\n\n- **It\'s**는 **It is**를 줄인 말이에요. It is Tuesday.라고 해도 같은 뜻이에요.\n- **today**는 "오늘"이에요. 그래서 Today is Tuesday.라고 답해도 돼요.\n\n> ⚠️ **What day**는 요일을 묻는 말이에요. 시각을 물을 때는 What time is it?이라고 해요. 그러니 What day is it today?에 It\'s three o\'clock.이라고 답하면 안 돼요.',
      easy: '질문 속의 낱말 하나만 보면 무엇을 묻는지 알 수 있어요.\n\n- What **day** … ? → 요일이 궁금해요 → It\'s **Monday**.\n- What **time** … ? → 시각이 궁금해요 → It\'s **ten o\'clock**.\n\nday가 들리면 요일 이름으로, time이 들리면 몇 시인지로 대답해요.',
      check: {
        type: 'choice',
        q: 'What day is it today?에 알맞은 대답은 무엇일까요?',
        choices: ['It\'s Friday.', 'It\'s two o\'clock.', 'It\'s sunny.'],
        answer: 0,
        why: ['', '시각을 말했어요. 시각은 What time is it?에 대한 대답이에요.', '날씨를 말했어요. 날씨는 How\'s the weather?에 대한 대답이에요.'],
        explain: 'What **day**는 요일을 묻는 말이라서 요일 이름으로 답해요. It\'s Friday.(금요일이에요.)',
      },
    },
    {
      title: '요일마다 하는 일 말하기',
      body: '어느 요일에 무엇을 하는지 말할 때는 요일 이름 앞에 **on**을 붙여요.\n\n- I play soccer **on Saturday**. (나는 토요일에 축구를 해요.)\n- I have a piano lesson **on Monday**. (나는 월요일에 피아노 수업이 있어요.)\n- I swim **on Wednesday**. (나는 수요일에 수영을 해요.)\n\n**on + 요일**이 우리말 "○요일**에**"와 같아요. 영어에서는 요일 앞에 쓰고, 우리말에서는 요일 뒤에 붙이는 것만 달라요.\n\n친구에게 물어볼 때는 **What do you do on Saturday?**(토요일에 무엇을 해요?)라고 해요. 대답은 I play soccer.처럼 하는 일을 말해요.',
      easy: '우리말은 "토요일**에**"처럼 요일 뒤에 "에"를 붙이지요. 영어는 반대로 요일 **앞**에 on을 붙여요.\n\n토요일**에** → **on** Saturday\n\n"에"가 앞으로 뛰어가서 on으로 변했다고 생각하면 기억하기 쉬워요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nI play soccer [[on]] Sunday.',
        choices: ['on', 'in', 'at'],
        answer: 0,
        why: ['', 'in은 "~ 안에"라는 뜻으로, in the box처럼 써요. 요일 앞에는 on을 써요.', 'at은 at three o\'clock처럼 시각 앞에 써요. 요일 앞에는 on을 써요.'],
        explain: '요일 앞에는 **on**을 써요. I play soccer on Sunday.(나는 일요일에 축구를 해요.)',
      },
    },
    {
      title: '주간 계획표 읽기',
      body: '**주간 계획표**는 한 주 동안 요일마다 할 일을 적은 표예요. 표를 읽을 때는 먼저 **찾을 것**을 정하고, 그다음 줄을 따라가요.\n\n**Jia\'s Week** (지아의 한 주)\n\n| Day | Plan |\n|---|---|\n| Monday | piano lesson |\n| Tuesday | swimming |\n| Wednesday | piano lesson |\n| Thursday | library |\n| Friday | soccer |\n\n- **요일을 알고 할 일을 찾을 때**: Thursday 줄을 찾아 옆 칸을 봐요 → library(도서관 가기)\n- **할 일을 알고 요일을 찾을 때**: swimming이 있는 칸을 찾아 왼쪽을 봐요 → Tuesday\n\n> 💡 같은 일이 두 번 나올 수도 있어요. 표를 끝까지 읽어서 빠뜨린 요일이 없는지 확인해요.',
      easy: '계획표는 가로줄 하나가 하루예요. 손가락을 요일 이름에 대고 오른쪽으로 쭉 밀면 그날 할 일이 나와요.\n\n반대로 할 일을 먼저 찾았다면, 손가락을 왼쪽으로 밀어서 요일 이름을 읽으면 돼요.',
      check: {
        type: 'choice',
        q: '계획표를 보고, 지아가 수영(swimming)을 하는 요일을 고르세요.\n\n| Day | Plan |\n|---|---|\n| Monday | piano lesson |\n| Tuesday | swimming |\n| Wednesday | piano lesson |',
        choices: ['Tuesday', 'Monday', 'Wednesday'],
        answer: 0,
        why: ['', 'Monday 줄에는 piano lesson(피아노 수업)이 있어요.', 'Wednesday 줄에는 piano lesson(피아노 수업)이 있어요.'],
        explain: 'swimming이 있는 칸에서 왼쪽을 보면 **Tuesday**(화요일)예요.',
      },
    },
  ],

  examples: [
    {
      q: '대화를 완성해 보세요.\n\nA: What day is it today?\nB: [[?]] (화요일이에요.)',
      steps: [
        'What **day**로 물었으니 요일을 묻는 말이에요.',
        '화요일은 영어로 Tuesday예요. 첫 글자는 대문자 T로 써요.',
        '대답은 It\'s 다음에 요일 이름을 붙여요: It\'s Tuesday.',
      ],
      answer: 'It\'s Tuesday.',
    },
    {
      q: '계획표를 보고 물음에 답해 보세요.\n\n| Day | Plan |\n|---|---|\n| Monday | soccer |\n| Wednesday | piano lesson |\n| Saturday | swimming |\n\nWhat do you do on Wednesday?',
      steps: [
        '찾을 것은 Wednesday(수요일)에 하는 일이에요.',
        '표에서 Wednesday 줄을 찾아요.',
        '옆 칸에 piano lesson이 있어요.',
        '그래서 I have a piano lesson.(피아노 수업이 있어요.)이라고 답해요.',
      ],
      answer: 'I have a piano lesson.',
    },
  ],

  terms: [
    { term: '요일', def: '한 주를 이루는 일곱 날의 이름이에요. 영어로는 Monday부터 Sunday까지 모두 -day로 끝나요.' },
    { term: 'week', def: '한 주, 곧 7일이에요. 예: There are seven days in a week.(한 주는 7일이에요.)' },
    { term: 'weekend', def: '주말이에요. Saturday(토요일)와 Sunday(일요일)를 함께 부르는 말이에요.' },
    { term: '대문자', def: 'A, B, C처럼 큰 모양의 알파벳이에요. 요일 이름은 첫 글자를 언제나 대문자로 써요. 예: Monday' },
    { term: 'It\'s', def: 'It is를 줄인 말이에요. 요일을 말할 때 It\'s Monday.처럼 써요.' },
    { term: 'on + 요일', def: '"○요일에"라는 뜻이에요. 요일 이름 앞에 on을 써요. 예: on Friday(금요일에)' },
    { term: '주간 계획표', def: '한 주 동안 요일마다 할 일을 적은 표예요. 요일 줄을 따라가며 할 일을 찾아요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '**수요일**을 영어로 바르게 쓴 것은 무엇일까요?',
      choices: ['Wednesday', 'Thursday', 'Tuesday', 'Monday'],
      answer: 0,
      why: ['', 'Thursday는 목요일이에요.', 'Tuesday는 화요일이에요. 수요일은 W로 시작해요.', 'Monday는 월요일이에요.'],
      explain: '수요일은 **Wednesday**예요. 쓸 때 가운데의 d를 빠뜨리지 않게 조심해요(We**d**nesday).',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: 'Friday 바로 다음 요일을 영어로 써 보세요.',
      answer: ['Saturday'],
      wrong: [
        { a: 'Thursday', why: 'Thursday는 Friday 바로 앞 요일(목요일)이에요. 금요일 다음은 토요일이에요.' },
        { a: 'Sunday', why: 'Sunday는 이틀 뒤(일요일)예요. 금요일 바로 다음은 토요일이에요.' },
        { a: 'Saterday', why: '철자를 확인해요. 토요일은 Sat-ur-day, Saturday예요.' },
      ],
      explain: 'Friday(금요일) 다음은 토요일, **Saturday**예요.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 2,
      q: '\'What day is it today?\'는 오늘이 무슨 요일인지 묻는 말이에요.',
      answer: true,
      explain: 'What day는 요일을 묻는 말이고, today는 "오늘"이에요. 그래서 "오늘은 무슨 요일이에요?"라는 뜻이에요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: What day is it today?\nB: [[?]]',
      choices: ['It\'s Monday.', 'It\'s three o\'clock.', 'It\'s rainy.', 'I\'m happy.'],
      answer: 0,
      why: [
        '',
        '시각을 말했어요. What time is it?에 대한 대답이에요.',
        '날씨를 말했어요. How\'s the weather?에 대한 대답이에요.',
        '기분을 말했어요. How are you?에 대한 대답이에요.',
      ],
      explain: 'What day로 요일을 물었으니 요일 이름으로 답해요. It\'s Monday.(월요일이에요.)',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말을 고르세요.\n\nI play soccer [[on]] Saturday.',
      choices: ['on', 'in', 'at', 'to'],
      answer: 0,
      why: [
        '',
        'in은 in the box(상자 안에)처럼 "~ 안에"라는 뜻이에요. 요일 앞에는 on을 써요.',
        'at은 at three o\'clock처럼 시각 앞에 써요. 요일 앞에는 on을 써요.',
        'to는 "~로, ~에게"처럼 방향을 나타내요. 요일 앞에는 on을 써요.',
      ],
      explain: '"토요일에"는 **on Saturday**예요. 요일 앞에는 on을 써요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 1,
      q: '대문자를 **바르게** 쓴 문장은 무엇일까요?',
      choices: ['I swim on Tuesday.', 'I swim on tuesday.', 'i swim on Tuesday.', 'I Swim on tuesday.'],
      answer: 0,
      why: [
        '',
        '요일 이름 tuesday를 소문자로 썼어요. 요일은 Tuesday처럼 대문자로 시작해요.',
        '"나"를 뜻하는 I는 언제나 대문자로 써요.',
        'swim은 문장 가운데의 보통 낱말이라 소문자로 쓰고, 요일 Tuesday는 대문자로 시작해요.',
      ],
      explain: '문장의 첫 글자, "나"를 뜻하는 I, 요일 이름의 첫 글자는 대문자로 써요. 바른 문장은 I swim on **T**uesday.예요.',
    },
    {
      id: 'p7', level: 1, type: 'ox', concept: 0,
      q: 'Saturday와 Sunday를 함께 weekend(주말)라고 해요.',
      answer: true,
      explain: '토요일(Saturday)과 일요일(Sunday)을 묶어 **weekend**라고 해요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 2,
      q: '낱말을 바르게 늘어놓아 "오늘은 무슨 요일이에요?"라는 문장을 만들어 보세요.',
      choices: ['What', 'day', 'is', 'it', 'today?'],
      answer: [0, 1, 2, 3, 4],
      hint: '묻는 말 What day로 시작해요.',
      explain: '**What day is it today?** — What day(무슨 요일)로 시작하고, is it(이에요), today(오늘)로 끝나요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'text', concept: 4,
      q: '계획표를 보고, 민수가 도서관(library)에 가는 요일을 영어로 써 보세요.\n\n| Day | Plan |\n|---|---|\n| Monday | soccer |\n| Tuesday | piano lesson |\n| Wednesday | library |\n| Thursday | swimming |',
      answer: ['Wednesday'],
      hint: 'library가 있는 칸을 찾아 왼쪽을 보세요.',
      wrong: [
        { a: 'Wensday', why: '철자를 확인해요. 수요일은 가운데 d가 들어간 Wednesday예요.' },
        { a: 'Wendsday', why: '철자를 확인해요. 수요일은 W-e-d-n-e-s-d-a-y, Wednesday예요.' },
        { a: 'Thursday', why: 'Thursday 줄에는 swimming(수영)이 있어요. library 줄을 다시 찾아보세요.' },
      ],
      explain: 'library가 있는 줄의 왼쪽 칸은 **Wednesday**(수요일)예요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: What do you do on Sunday?\nB: [[?]]',
      choices: ['I play badminton.', 'It\'s Sunday.', 'It\'s ten o\'clock.', 'Yes, I do.'],
      answer: 0,
      why: [
        '',
        '요일을 말했어요. 질문은 일요일에 **무엇을 하는지** 묻고 있어요.',
        '시각을 말했어요. 질문은 일요일에 하는 일을 묻고 있어요.',
        'Yes나 No로 답하는 질문이 아니에요. What으로 물으면 하는 일을 말해요.',
      ],
      explain: 'What do you do on Sunday?는 "일요일에 무엇을 해요?"라는 뜻이에요. 하는 일을 말한 I play badminton.(배드민턴을 쳐요.)이 알맞아요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'text', concept: 0,
      q: '글을 읽고 물음에 답해 보세요.\n\nHi, I\'m Seojun. I play soccer on Tuesday. I swim on Thursday. I visit my grandma on Saturday.\n\n서준이가 축구를 하는 날의 **바로 다음 날**은 무슨 요일일까요? 영어로 써 보세요.',
      answer: ['Wednesday'],
      hint: '먼저 축구를 하는 요일을 찾고, 그다음 요일을 생각해요.',
      wrong: [
        { a: 'Tuesday', why: 'Tuesday는 축구를 하는 날이에요. 그 바로 다음 날을 물었어요.' },
        { a: 'Thursday', why: 'Thursday는 수영을 하는 날로, 축구를 하는 날의 이틀 뒤예요.' },
        { a: 'Wensday', why: '철자를 확인해요. 수요일은 Wednesday예요.' },
      ],
      explain: '서준이는 Tuesday(화요일)에 축구를 해요. 화요일 바로 다음 날은 수요일, **Wednesday**예요.',
    },
    {
      id: 'a2', level: 3, type: 'order', concept: 0,
      q: '요일을 월요일부터 순서대로 놓아 보세요.',
      choices: ['Thursday', 'Monday', 'Saturday', 'Tuesday', 'Friday'],
      answer: [1, 3, 0, 4, 2],
      hint: '우리말로 바꾸어 월·화·목·금·토 순서를 떠올려 보세요.',
      explain: 'Monday(월) → Tuesday(화) → Thursday(목) → Friday(금) → Saturday(토) 순서예요. 수요일(Wednesday)은 빠져 있어요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 1,
      q: '다음 문장에서 **고쳐 써야 할** 낱말은 무엇일까요?\n\nOn monday, I have a piano lesson.',
      choices: ['monday', 'On', 'I', 'piano'],
      answer: 0,
      why: [
        '',
        'On은 문장의 첫 낱말이라서 대문자로 시작하는 것이 맞아요.',
        '"나"를 뜻하는 I는 언제나 대문자로 쓰는 것이 맞아요.',
        'piano는 이름이 아닌 보통 낱말이라 소문자로 쓰는 것이 맞아요.',
      ],
      explain: '요일 이름은 대문자로 시작해야 해요. monday를 **Monday**로 고쳐요: On Monday, I have a piano lesson.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '계획표를 보고, 피아노 수업(piano lesson)이 있는 요일을 **모두** 고른 것을 찾으세요.\n\n| Day | Plan |\n|---|---|\n| Monday | piano lesson |\n| Tuesday | soccer |\n| Wednesday | swimming |\n| Thursday | piano lesson |\n| Friday | library |',
      choices: ['Monday, Thursday', 'Monday', 'Monday, Tuesday', 'Tuesday, Thursday'],
      answer: 0,
      why: [
        '',
        'Monday 하나만 찾았어요. 표를 끝까지 읽으면 piano lesson이 한 번 더 있어요.',
        'Tuesday 줄에는 soccer(축구)가 있어요.',
        'Tuesday 줄에는 soccer(축구)가 있어요. 맨 위 Monday 줄을 다시 보세요.',
      ],
      hint: 'piano lesson이 나오는 줄을 표 끝까지 모두 찾아요.',
      explain: 'piano lesson은 Monday(월요일)와 Thursday(목요일) 줄에 있어요. 같은 일이 두 번 나올 수 있으니 표를 끝까지 읽어요.',
    },
  ],

  deeper: [
    {
      title: '요일 이름은 어디에서 왔을까?',
      body: '영어 요일 이름에는 하늘의 천체와 옛이야기가 숨어 있어요.\n\n- **Sunday**: sun(해)의 날\n- **Monday**: moon(달)의 날\n- **Saturday**: Saturn(토성)의 날\n\nTuesday, Wednesday, Thursday, Friday는 옛날 북유럽 사람들이 믿던 신들의 이름에서 왔어요. 예를 들어 Thursday는 천둥의 신 Thor의 날이라는 뜻이에요.\n\n우리말 요일도 하늘에서 왔어요. 일(해)·월(달)과 화성·수성·목성·금성·토성의 첫 글자를 따서 일·월·화·수·목·금·토가 되었지요. Sunday가 일요일, Monday가 월요일, Saturday가 토요일인 것은 영어와 우리말이 같은 하늘을 보고 이름을 지었기 때문이에요.',
    },
  ],

  faq: [
    {
      q: '요일 이름은 왜 꼭 대문자로 써요?',
      a: '영어에서는 사람 이름, 나라 이름처럼 **하나뿐인 특별한 이름**을 대문자로 시작해요. 요일 이름도 그런 이름이라서 문장 가운데에 있어도 Monday처럼 첫 글자를 대문자로 써요.',
    },
    {
      q: 'What day랑 What time은 뭐가 달라요?',
      a: 'What **day** is it today?는 요일을 물어서 It\'s Monday.처럼 요일로 답해요. What **time** is it?은 시각을 물어서 It\'s three o\'clock.처럼 몇 시인지로 답해요. 질문 가운데의 낱말 day와 time을 잘 들어 보세요.',
    },
    {
      q: 'It\'s Tuesday 말고 Today is Tuesday라고 해도 돼요?',
      a: '네, 돼요. 둘 다 "오늘은 화요일이에요."라는 뜻이에요. It\'s는 It is를 줄인 말이라서 It is Tuesday.라고 해도 같아요.',
    },
    {
      q: 'on Saturday랑 on Saturdays는 달라요?',
      a: 'on Saturday는 "토요일에"예요. 끝에 s를 붙인 on Saturdays는 "토요일마다"라는 느낌이에요. 매주 토요일에 하는 일을 말할 때 둘 다 쓸 수 있으니, 지금은 on Saturday를 먼저 익혀 두면 충분해요.',
    },
  ],

  mistakes: [
    '요일 이름을 monday처럼 소문자로 쓰는 실수 — 요일은 문장 어디에 있든 Monday처럼 대문자로 시작해요.',
    'What day is it today?에 It\'s two o\'clock.처럼 시각으로 답하는 실수 — day는 요일을 묻는 말이라서 It\'s Friday.처럼 요일로 답해요.',
    'Wednesday를 Wensday로 쓰는 실수 — 가운데 d를 빠뜨리기 쉬워요. Wed-nes-day로 나누어 써 보세요.',
  ],

  gens: [
    {
      id: 'day-next-prev',
      level: 1,
      title: '앞뒤 요일 찾기',
      make: function (R) {
        var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        var ko = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
        var kinds = [
          { off: 1, say: '바로 다음 날' },
          { off: -1, say: '바로 전날' },
          { off: 2, say: '이틀 뒤' },
          { off: -2, say: '이틀 전' },
        ];
        var k = R.pick(kinds);
        var i = R.int(0, 6);
        function at(n) { return ((n % 7) + 7) % 7; }
        var c = at(i + k.off);
        var correct = days[c];
        var cands = [
          [days[at(i - k.off)], '방향을 거꾸로 셌어요. ' + (k.off > 0 ? '뒤(다음)' : '앞(전)') + ' 쪽으로 세어야 해요.'],
          [days[at(i + k.off + (k.off > 0 ? 1 : -1))], '하루를 더 셌어요. ' + days[i] + '에서 ' + Math.abs(k.off) + '칸만 움직여요.'],
          [days[at(i + k.off - (k.off > 0 ? 1 : -1))], Math.abs(k.off) === 1 ? '처음 요일을 그대로 골랐어요. 한 칸 움직여야 해요.' : '하루를 덜 셌어요. ' + days[i] + '에서 ' + Math.abs(k.off) + '칸 움직여요.'],
          [days[at(i + 3)], '요일 순서를 다시 확인해요. 월·화·수·목·금·토·일 순서예요.'],
          [days[at(i - 3)], '요일 순서를 다시 확인해요. 월·화·수·목·금·토·일 순서예요.'],
        ];
        var reason = {};
        cands.forEach(function (x) { if (x[0] !== correct && !(x[0] in reason)) reason[x[0]] = x[1]; });
        var pick = R.choices(correct, cands.map(function (x) { return x[0]; }));
        return {
          type: 'choice', concept: 0,
          q: '**' + days[i] + '**의 ' + k.say + R.josa(k.say, '은/는') + ' 무슨 요일일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (x) { return x === correct ? '' : reason[x] || '요일 순서를 다시 확인해요.'; }),
          explain: days[i] + '는 ' + ko[i] + '이에요. ' + ko[i] + '의 ' + k.say + R.josa(k.say, '은/는') + ' ' + ko[c] + ', 곧 **' + correct + '**예요.',
        };
      },
    },
  ],

  vocab: [
    { w: 'Monday', m: '월요일', ex: 'I have a piano lesson on **Monday**.', exm: '나는 월요일에 피아노 수업이 있어요.' },
    { w: 'Tuesday', m: '화요일', ex: 'It\'s **Tuesday** today.', exm: '오늘은 화요일이에요.' },
    { w: 'Wednesday', m: '수요일', ex: 'I swim on **Wednesday**.', exm: '나는 수요일에 수영을 해요.' },
    { w: 'Thursday', m: '목요일', ex: 'We go to the library on **Thursday**.', exm: '우리는 목요일에 도서관에 가요.' },
    { w: 'Friday', m: '금요일', ex: 'I play soccer on **Friday**.', exm: '나는 금요일에 축구를 해요.' },
    { w: 'Saturday', m: '토요일', ex: 'I visit my grandma on **Saturday**.', exm: '나는 토요일에 할머니 댁에 가요.' },
    { w: 'Sunday', m: '일요일', ex: 'I clean my room on **Sunday**.', exm: '나는 일요일에 내 방을 청소해요.' },
    { w: 'today', m: '오늘', ex: 'What day is it **today**?', exm: '오늘은 무슨 요일이에요?' },
    { w: 'week', m: '주, 한 주', ex: 'There are seven days in a **week**.', exm: '한 주는 7일이에요.' },
    { w: 'weekend', m: '주말', ex: 'I play with my dog on the **weekend**.', exm: '나는 주말에 내 강아지와 놀아요.' },
    { w: 'lesson', m: '수업, 레슨', ex: 'I have a piano **lesson** today.', exm: '나는 오늘 피아노 수업이 있어요.' },
    { w: 'library', m: '도서관', ex: 'I read books in the **library**.', exm: '나는 도서관에서 책을 읽어요.' },
  ],
});
