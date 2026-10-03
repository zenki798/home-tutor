/* 중1 영어 · 일상생활 말하기 (일반동사 현재형) */
Tutor.registerUnit({
  id: 'eng-m1-02',
  course: 'eng-m1',
  title: '일상생활 말하기 (일반동사 현재형)',
  summary: '일반동사 현재형의 3인칭 단수 규칙과 부정문·의문문, 빈도부사를 익혀 매일 하는 일과 습관을 말하고 써요.',
  goals: [
    '주어가 3인칭 단수일 때 일반동사에 -s, -es를 바르게 붙일 수 있어요.',
    "don't/doesn't로 부정문을, Do/Does로 의문문을 만들 수 있어요.",
    '빈도부사(always, usually, often, sometimes, never)를 알맞은 자리에 쓸 수 있어요.',
    '하루 일과를 소개하는 글에서 일이 일어나는 순서를 찾을 수 있어요.',
  ],
  standards: ['[9영02-03]', '[9영01-02]', '[9영01-04]'],

  concepts: [
    {
      title: '일반동사와 3인칭 단수 현재형',
      body: '**일반동사**는 be동사를 뺀 나머지 동사예요(play, go, like, study …). 현재형은 늘 하는 일, 습관, 사실을 말할 때 써요.\n\n주어가 **3인칭 단수**(he, she, it, Minsu, my dog처럼 나와 너를 뺀 한 사람·한 개)이면 동사 끝에 -s나 -es를 붙여요.\n\n| 동사의 끝 | 규칙 | 예 |\n|---|---|---|\n| 대부분 | -s | play → plays, read → reads |\n| s, x, sh, ch, o | -es | watch → watches, wash → washes, go → goes, do → does |\n| 자음 + y | y를 i로 바꾸고 -es | study → studies, fly → flies |\n| 모음 + y | -s | play → plays, buy → buys |\n| have | 모양이 바뀜 | have → **has** |\n\n> 💡 I, you, we, they, 복수 명사가 주어이면 동사원형 그대로 써요. I play. / They play. / She **plays**.',
      easy: '3인칭 단수는 "나도 아니고 너도 아닌, 딱 한 사람(한 개)"이에요. 이 주어가 오면 동사가 꼬리(-s)를 하나 달아요.\n\n- I like music. (나 → 꼬리 없음)\n- My sister **likes** music. (언니 한 명 → 꼬리 -s)\n\n꼬리를 붙이기 어려운 끝소리(watch, wash, go)에는 -es를, 자음 + y로 끝나면(study, fly) y를 i로 바꾸어 -ies를 달아요. play처럼 모음 + y면 -s만 달아요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nMy brother [[blank]] TV every evening.',
        choices: ['watches', 'watch', 'watchs'],
        answer: 0,
        why: ['', '주어 My brother는 3인칭 단수예요. 동사 끝에 -s나 -es를 붙여요.', 'ch로 끝나는 동사에는 -s가 아니라 -es를 붙여요.'],
        explain: 'My brother는 3인칭 단수이고, watch는 ch로 끝나므로 -es를 붙여 watches예요.',
      },
    },
    {
      title: "일반동사의 부정문 (don't / doesn't)",
      body: '일반동사 문장을 부정문으로 만들 때는 동사 앞에 **don\'t(do not)**나 **doesn\'t(does not)**를 써요. 그 뒤의 동사는 늘 **동사원형**이에요.\n\n| 주어 | 부정문 |\n|---|---|\n| I, you, we, they, 복수 | I **don\'t like** carrots. |\n| he, she, it, 3인칭 단수 | She **doesn\'t like** carrots. |\n\n3인칭 단수의 -s는 does가 대신 가져가요. 그래서 doesn\'t 뒤의 동사에는 -s를 붙이지 않아요.\n\nShe likes carrots. → She doesn\'t **like** carrots. (likes ✕)\n\n> ⚠️ 일반동사 문장에는 be동사를 쓰지 않아요. I am not like carrots.는 틀린 문장이에요.',
      easy: '"-s 꼬리"는 한 문장에 한 번만 달 수 있다고 생각해 보세요.\n\nShe likes → She doe**s**n\'t like\n\ndoes가 꼬리 s를 가져갔으니 like는 꼬리 없이 원래 모습으로 돌아가요.',
      check: {
        type: 'ox',
        q: '"He doesn\'t plays soccer."는 바른 문장이에요.',
        answer: false,
        explain: 'doesn\'t 뒤에는 동사원형을 써요. 바른 문장은 He doesn\'t **play** soccer.예요.',
      },
    },
    {
      title: '일반동사의 의문문과 의문사 의문문',
      body: '"~하니?"라고 물을 때는 문장 앞에 **Do**나 **Does**를 쓰고, 동사는 **동사원형**으로 써요.\n\n| 질문 | 대답 |\n|---|---|\n| **Do** you **walk** to school? | Yes, I do. / No, I don\'t. |\n| **Does** she **walk** to school? | Yes, she does. / No, she doesn\'t. |\n\n대답할 때도 do/does를 다시 써요.\n\n**의문사**(what, where, when, how, what time …)로 물을 때는 의문사를 맨 앞에 두고 그 뒤는 Do/Does 의문문과 같아요.\n\n- **Where** do you live? — I live in Incheon.\n- **What time** does he get up? — He gets up at seven.\n\n의문사 의문문에는 Yes/No로 대답하지 않고, 물은 내용을 알려 줘요.',
      easy: '일반동사 의문문은 문장 앞에 "물어보는 깃발" Do/Does를 꽂는 거예요.\n\nYou like pizza. → **Do** you like pizza?\nHe likes pizza. → **Does** he like pizza?\n\n깃발 Does가 -s를 가져가니 like는 원래 모습이에요. 궁금한 것이 "어디"면 Where, "몇 시"면 What time을 깃발 앞에 붙여요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇일까요?\n\n[[blank]] your sister play the piano?',
        choices: ['Does', 'Do', 'Is'],
        answer: 0,
        why: ['', 'your sister는 3인칭 단수예요. 3인칭 단수 주어에는 Does를 써요.', 'play는 일반동사예요. 일반동사 의문문에는 Do/Does를 써요.'],
        explain: '주어 your sister가 3인칭 단수이므로 Does를 써요. Does your sister play the piano?',
      },
    },
    {
      title: '빈도부사와 그 자리',
      body: '**빈도부사**는 어떤 일을 얼마나 자주 하는지 나타내는 말이에요.\n\n| 빈도부사 | 뜻 | 대략의 정도 |\n|---|---|---|\n| always | 항상 | 100% |\n| usually | 보통, 대개 | 80~90% |\n| often | 자주 | 60~70% |\n| sometimes | 가끔 | 30~50% |\n| never | 결코 ~ 않다 | 0% |\n\n빈도부사의 자리는 정해져 있어요.\n\n- **be동사 뒤**: She **is always** kind.\n- **일반동사 앞**: She **always walks** to school.\n\n> 💡 never에는 이미 "않다"는 뜻이 있으니 not과 함께 쓰지 않아요. I never eat breakfast. (I don\'t never eat ✕)',
      easy: '빈도부사는 "얼마나 자주"를 알려 주는 눈금이에요. always(늘)부터 never(전혀)까지 있어요.\n\n자리를 기억하는 방법: be동사(am, are, is)는 앞에 서고 빈도부사가 뒤따라가요. 일반동사는 빈도부사가 앞에서 길을 안내해요.\n\nI **am usually** happy. / I **usually eat** rice.',
      check: {
        type: 'choice',
        q: 'usually가 들어갈 자리로 알맞은 것은 무엇일까요?\n\nHe (①) gets (②) up (③) at seven.',
        choices: ['①', '②', '③'],
        fixed: true,
        answer: 0,
        why: ['', '일반동사 gets 뒤가 아니라 앞에 써요.', 'get up 사이나 뒤에 쓰지 않아요. 일반동사 앞에 써요.'],
        explain: '빈도부사는 일반동사 앞에 와요. He usually gets up at seven.',
      },
    },
    {
      title: '일과를 소개하는 글 읽기',
      body: '하루 일과 글은 보통 **시간 순서**대로 쓰여요. 순서를 알려 주는 말에 표시하면서 읽으면 흐름이 잘 보여요.\n\n| 순서를 나타내는 말 | 뜻 |\n|---|---|\n| at 7:00, at noon | 7시에, 정오에 |\n| in the morning / afternoon / evening | 아침에 / 오후에 / 저녁에 |\n| first, then, after that | 먼저, 그다음에, 그 후에 |\n| before dinner, after school | 저녁 전에, 방과 후에 |\n| finally | 마지막으로 |\n\n주의할 점: 글에 쓰인 순서와 실제 일어난 순서가 다를 수 있어요. before와 after를 꼭 확인해요.\n\nShe reads a book **before** she goes to bed. → 책 읽기가 먼저, 잠자기가 나중이에요.',
      easy: '일과 글은 하루를 찍은 사진을 시간 순서로 줄 세운 앨범 같아요.\n\n"7시 → 아침 → 학교 → 방과 후 → 저녁 → 잠"\n\n글을 읽으면서 시각(at 7:00)과 순서 말(then, after that)에 동그라미를 치면 사진의 순서가 보여요.',
      check: {
        type: 'ox',
        q: '"Minsu does his homework before he eats dinner."에서 민수는 저녁을 먹은 뒤에 숙제를 해요.',
        answer: false,
        explain: 'before는 "~ 전에"라는 뜻이에요. 민수는 저녁을 먹기 **전에** 숙제를 해요.',
      },
    },
  ],

  examples: [
    {
      q: '다음 문장을 부정문과 의문문으로 바꾸어 보세요.\n\nMinsu watches TV after dinner.',
      steps: [
        '주어 Minsu는 3인칭 단수이고 watches는 일반동사예요. 그래서 doesn\'t / Does를 써요.',
        '부정문: 동사 앞에 doesn\'t를 쓰고 watches를 원형 watch로 바꿔요. → Minsu doesn\'t watch TV after dinner.',
        '의문문: 문장 앞에 Does를 쓰고 동사를 원형으로 바꿔요. → Does Minsu watch TV after dinner?',
        '대답은 Yes, he does. / No, he doesn\'t.예요.',
      ],
      answer: "부정문: Minsu doesn't watch TV after dinner. / 의문문: Does Minsu watch TV after dinner?",
    },
    {
      q: 'sometimes를 알맞은 자리에 넣어 문장을 다시 쓰세요.\n\n(1) She plays tennis.\n(2) She is busy.',
      steps: [
        '(1)의 plays는 일반동사예요. 빈도부사는 일반동사 앞에 와요. → She sometimes plays tennis.',
        '(2)의 is는 be동사예요. 빈도부사는 be동사 뒤에 와요. → She is sometimes busy.',
      ],
      answer: '(1) She sometimes plays tennis. (2) She is sometimes busy.',
    },
  ],

  terms: [
    { term: '일반동사', def: 'be동사(am, are, is)와 조동사를 뺀 나머지 동사예요. 동작이나 상태를 나타내요. 예: play, eat, like, have' },
    { term: '3인칭 단수', def: '말하는 나(1인칭)와 듣는 너(2인칭)를 뺀 나머지 가운데 하나인 것이에요. 예: he, she, it, Minsu, my cat' },
    { term: '동사원형', def: '-s, -ed, -ing 같은 것이 붙지 않은 동사의 원래 모양이에요. 예: plays의 원형은 play' },
    { term: 'do/does', def: '일반동사의 부정문과 의문문을 만들 때 돕는 말이에요. 주어가 3인칭 단수이면 does를 써요. 예: Does he swim?' },
    { term: '빈도부사', def: '얼마나 자주 하는지 나타내는 말이에요. be동사 뒤, 일반동사 앞에 써요. 예: always, usually, often, sometimes, never' },
    { term: '의문사', def: '무엇·어디·언제·어떻게처럼 구체적인 정보를 묻는 말이에요. 예: what, where, when, how, what time' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', concept: 0,
      q: '주어가 she일 때, 동사 study의 현재형을 쓰세요.',
      answer: ['studies'],
      wrong: [
        { a: 'studys', why: '자음 + y로 끝나는 동사는 y를 i로 바꾸고 -es를 붙여요.' },
        { a: 'studyes', why: 'y를 i로 바꾸는 것을 빠뜨렸어요. study → studies예요.' },
        { a: 'study', why: '주어 she는 3인칭 단수예요. 동사에 -s, -es를 붙여요.' },
      ],
      explain: 'study는 자음(d) + y로 끝나므로 y를 i로 바꾸고 -es를 붙여 studies예요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '동사원형과 3인칭 단수 현재형을 **잘못** 짝지은 것은 무엇일까요?',
      choices: ['have — haves', 'play — plays', 'go — goes', 'watch — watches'],
      answer: 0,
      why: [
        '',
        'play는 모음(a) + y로 끝나므로 -s만 붙여요. 바르게 짝지었어요.',
        'o로 끝나는 동사는 -es를 붙여요. 바르게 짝지었어요.',
        'ch로 끝나는 동사는 -es를 붙여요. 바르게 짝지었어요.',
      ],
      explain: 'have의 3인칭 단수 현재형은 모양이 바뀌어 **has**예요. haves라고 쓰지 않아요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\nHe [[blank]] like carrots.',
      choices: ["doesn't", "don't", "isn't", 'not'],
      answer: 0,
      why: [
        '',
        "주어 He는 3인칭 단수예요. 3인칭 단수에는 don't가 아니라 doesn't를 써요.",
        "like는 일반동사예요. 일반동사 부정문에는 be동사 대신 don't/doesn't를 써요.",
        "일반동사 앞에 not만 쓰지 않아요. doesn't(does not)로 써요.",
      ],
      explain: "주어 He가 3인칭 단수이므로 doesn't를 써요. He doesn't like carrots.",
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: '"My parents don\'t drink coffee."는 바른 문장이에요.',
      answer: true,
      explain: "My parents는 복수이므로 don't를 쓰고, 그 뒤에 동사원형 drink를 썼어요. 바른 문장이에요.",
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\n[[blank]] they eat lunch at school?',
      choices: ['Do', 'Does', 'Are', 'Is'],
      answer: 0,
      why: [
        '',
        'they는 복수예요. Does는 3인칭 단수 주어에만 써요.',
        'eat은 일반동사예요. 일반동사 의문문에는 Do/Does를 써요.',
        'eat은 일반동사이고, they에는 Is를 쓰지 않아요.',
      ],
      explain: '주어 they가 복수이고 eat이 일반동사이므로 Do를 써요. Do they eat lunch at school?',
    },
    {
      id: 'p6', level: 1, type: 'short', concept: 2,
      q: '대화의 빈칸에 알맞은 한 낱말을 쓰세요.\n\nA: Do you walk to school?\nB: Yes, I [[blank]].',
      answer: ['do'],
      wrong: [
        { a: 'am', why: 'Do로 물었으니 be동사가 아니라 do로 대답해요.' },
        { a: 'does', why: '대답의 주어가 I예요. I에는 do를 써요.' },
      ],
      explain: 'Do you ~? 질문에는 Yes, I do. / No, I don\'t.로 대답해요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: 'never를 넣어 바르게 쓴 문장은 무엇일까요?\n\nShe is late for school.',
      choices: [
        'She is never late for school.',
        'She never is late for school.',
        'She is late never for school.',
        'Never she is late for school.',
      ],
      answer: 0,
      why: [
        '',
        'is는 be동사예요. 빈도부사는 be동사 뒤에 써요.',
        '빈도부사는 be동사 바로 뒤에 와요. late 뒤가 아니에요.',
        '빈도부사를 문장 맨 앞에 두면 이런 문장이 되지 않아요. be동사 뒤에 써요.',
      ],
      explain: '빈도부사는 be동사 뒤에 써요. She is never late for school.(그녀는 결코 학교에 늦지 않아요.)',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 3,
      q: '"우리 아빠는 아침에 항상 커피를 마셔요."를 영어로 바르게 옮긴 것은 무엇일까요?',
      choices: [
        'My dad always drinks coffee in the morning.',
        'My dad drinks always coffee in the morning.',
        'My dad always drink coffee in the morning.',
        'My dad is always drink coffee in the morning.',
      ],
      answer: 0,
      why: [
        '',
        '빈도부사는 일반동사 뒤가 아니라 앞에 써요.',
        'My dad는 3인칭 단수예요. drink에 -s를 붙여 drinks로 써요.',
        'drink는 일반동사라 be동사 is를 함께 쓰지 않아요.',
      ],
      hint: '빈도부사의 자리와 동사의 -s, 두 가지를 모두 확인해요.',
      explain: '빈도부사 always는 일반동사 앞에 오고, 주어 My dad가 3인칭 단수이므로 drinks예요. My dad always drinks coffee in the morning.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 2,
      q: '"너의 이모는 어디에 사시니?"라는 뜻이 되게 순서대로 놓으세요.',
      choices: ['Where', 'does', 'your aunt', 'live?'],
      answer: [0, 1, 2, 3],
      hint: '의문사를 맨 앞에 두고, 그 뒤는 Does 의문문 순서예요.',
      explain: '의문사 의문문은 "의문사 + do/does + 주어 + 동사원형?" 순서예요. Where does your aunt live?',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 2,
      q: '대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: What time [[blank]] Minho get up?\nB: He gets up at seven.',
      choices: ['does', 'do', 'is', 'gets'],
      answer: 0,
      why: [
        '',
        'Minho는 3인칭 단수예요. do가 아니라 does를 써요.',
        'get up은 일반동사예요. 일반동사 의문문에는 do/does를 써요.',
        '동사 get이 뒤에 있어요. 빈칸에는 의문문을 만드는 does가 들어가요.',
      ],
      explain: '의문사 What time 뒤에 does + 주어 + 동사원형을 써요. What time does Minho get up?',
    },
    {
      id: 'p11', level: 2, type: 'order', concept: 4,
      q: '글을 읽고, 지아가 하는 일을 일어나는 순서대로 놓으세요.\n\nJia gets up at 6:30. First, she takes a shower. Then she eats breakfast with her family. She goes to school at 7:50. After school, she plays badminton with her friends. After that, she does her homework before dinner. She goes to bed at 10:30.',
      choices: ['takes a shower', 'eats breakfast', 'plays badminton', 'does her homework', 'goes to bed'],
      answer: [0, 1, 2, 3, 4],
      hint: 'First, Then, After school, After that 같은 말에 표시해 보세요.',
      explain: '샤워(First) → 아침 식사(Then) → 방과 후 배드민턴(After school) → 그 후 저녁 전에 숙제(After that, before dinner) → 10시 30분 잠자기 순서예요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 4,
      q: '글을 읽고 물음에 답하세요.\n\nI\'m Seojun. I get up at seven. I eat breakfast and leave home at eight. After school, I go to the library. I usually read books there for an hour. Then I go home and help my mom with dinner.\n\nWhat does Seojun do right after school?',
      choices: ['He goes to the library.', 'He eats breakfast.', 'He helps his mom with dinner.', 'He leaves home.'],
      answer: 0,
      why: [
        '',
        '아침 식사는 학교에 가기 전의 일이에요.',
        '저녁 준비를 돕는 일은 도서관에 다녀온 뒤(Then)의 일이에요.',
        '집을 나서는 것은 8시, 학교 가기 전의 일이에요.',
      ],
      explain: 'After school, I go to the library.라고 했으니 방과 후 바로 도서관에 가요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', concept: 1,
      q: '다음 문장을 부정문으로 바꿀 때 빈칸에 알맞은 말을 쓰세요.\n\nShe has a bike. → She [[blank]] a bike.',
      answer: ["doesn't have", 'does not have'],
      wrong: [
        { a: "doesn't has", why: "doesn't 뒤에는 동사원형을 써요. has의 원형은 have예요." },
        { a: "don't have", why: "주어 She는 3인칭 단수라서 don't가 아니라 doesn't를 써요." },
        { a: "isn't have", why: "have는 일반동사예요. 일반동사 부정문에는 doesn't를 써요." },
      ],
      hint: 'has는 have의 3인칭 단수형이에요. 부정문에서는 원형으로 돌아가요.',
      explain: "3인칭 단수 주어의 부정문은 doesn't + 동사원형이에요. has의 원형은 have이므로 She doesn't have a bike.",
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: Does your sister like cats?\nB: [[blank]] She is afraid of them.',
      choices: ["No, she doesn't.", "No, she isn't.", 'Yes, she does.', "No, she don't."],
      answer: 0,
      why: [
        '',
        'Does로 물었으니 be동사가 아니라 does로 대답해요.',
        '뒤에서 고양이를 무서워한다고 했으니 "아니요"가 알맞아요.',
        "she는 3인칭 단수예요. don't가 아니라 doesn't를 써요.",
      ],
      hint: '뒤 문장이 무슨 뜻인지 먼저 보고, 질문의 첫 낱말을 확인해요.',
      explain: "언니가 고양이를 무서워한다(afraid of)고 했으니 부정의 대답이에요. Does 질문이므로 No, she doesn't.예요.",
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '다음 중 문장이 **바른** 것은 무엇일까요?',
      choices: [
        'He usually walks to school.',
        'She is sometimes go to the park.',
        'They play often soccer.',
        'My cat never eat fish.',
      ],
      answer: 0,
      why: [
        '',
        'go는 일반동사라 is를 함께 쓰지 않아요. She sometimes goes to the park.예요.',
        '빈도부사는 일반동사 앞에 와요. They often play soccer.예요.',
        'My cat은 3인칭 단수예요. eat에 -s를 붙여 eats로 써요.',
      ],
      explain: '빈도부사 usually가 일반동사 walks 앞에 있고, 3인칭 단수 He에 맞게 walks를 썼어요.',
    },
    {
      id: 'a4', level: 3, type: 'short', concept: 2,
      q: '대화의 빈칸에 알맞은 의문사 한 낱말을 쓰세요.\n\nA: [[blank]] do you go to school?\nB: I go to school by bus.',
      answer: ['How'],
      wrong: [
        { a: 'Where', why: 'B는 장소가 아니라 학교에 가는 방법(by bus)을 말했어요.' },
        { a: 'What', why: 'B는 방법(by bus)을 대답했어요. 방법은 How로 물어요.' },
        { a: 'When', why: 'B는 시간이 아니라 방법(by bus)을 말했어요.' },
      ],
      hint: 'B의 대답 by bus는 무엇에 대한 정보일까요?',
      explain: 'by bus(버스를 타고)는 방법이에요. 방법은 How로 물어요. How do you go to school?',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: '글을 읽고, 내용과 **맞는** 것을 고르세요.\n\nMy grandpa is a farmer. He always gets up before the sun rises. First, he feeds the cows. After that, he has breakfast with my grandma. He works in the field in the afternoon. He never works on Sundays. On Sundays, he goes fishing.',
      choices: [
        '할아버지는 아침을 먹은 뒤에 소에게 먹이를 줘요.',
        '할아버지는 해가 뜬 뒤에 일어나요.',
        '할아버지는 소에게 먹이를 준 뒤에 아침을 먹어요.',
        '할아버지는 일요일에도 밭에서 일해요.',
      ],
      answer: 2,
      why: [
        'First(먼저) 소에게 먹이를 주고, After that(그 후에) 아침을 먹어요. 순서가 반대예요.',
        'before the sun rises는 "해가 뜨기 전에"라는 뜻이에요.',
        '',
        'He never works on Sundays.라고 했어요. 일요일에는 낚시를 가요.',
      ],
      hint: 'First, After that, before, never에 표시하며 읽어 보세요.',
      explain: 'First, he feeds the cows. After that, he has breakfast.이므로 소에게 먹이를 준 뒤에 아침을 먹어요.',
    },
  ],

  deeper: [
    {
      title: '현재형은 "지금"이 아니라 "늘"',
      body: '이름이 "현재형"이라서 지금 이 순간의 일을 말하는 것 같지만, 일반동사 현재형은 주로 **늘 하는 일·습관·변하지 않는 사실**을 말해요.\n\n- I walk to school. (나는 걸어서 학교에 다녀요. — 습관)\n- Water boils at 100°C. (물은 100°C에서 끓어요. — 사실)\n- The museum opens at nine. (박물관은 9시에 문을 열어요. — 정해진 일정)\n\n그래서 지금 막 하고 있는 일은 현재형으로 말하지 않아요. "나는 지금 걷고 있어요"는 I am walking now.처럼 **현재진행형**으로 말하는데, 다음 단원에서 배워요.',
    },
  ],

  faq: [
    {
      q: '왜 3인칭 단수일 때만 -s를 붙여요?',
      a: '옛날 영어에는 주어에 따라 동사 끝이 여러 가지로 바뀌었어요. 오랜 시간이 지나며 대부분 사라지고 3인칭 단수 현재의 -s만 남았어요. 그래서 지금은 "3인칭 단수 + 현재"일 때만 -s를 붙이면 돼요.',
    },
    {
      q: "doesn't 뒤에는 왜 동사원형을 써요?",
      a: "doesn't의 does가 이미 3인칭 단수 표시(-s)를 가져갔기 때문이에요. 한 문장에 그 표시를 두 번 하지 않아요. 그래서 She doesn't likes가 아니라 She doesn't like예요. 의문문 Does she like ~?도 마찬가지예요.",
    },
    {
      q: '빈도부사 자리가 헷갈려요. 쉽게 기억하는 방법이 있어요?',
      a: '"be는 앞, 일반동사는 뒤"를 떠올려 보세요. be동사가 먼저 나오고 빈도부사가 따라가요(I am always happy). 일반동사는 빈도부사가 먼저 나와요(I always eat breakfast).',
    },
  ],

  mistakes: [
    "doesn't나 Does 뒤에 -s가 붙은 동사를 쓰는 실수 — She doesn't likes (✕) → She doesn't like (○)",
    '일반동사 문장에 be동사를 함께 쓰는 실수 — I am play soccer. (✕) → I play soccer. (○)',
    'y로 끝나는 동사에 -s만 붙이는 실수 — studys (✕) → studies (○). 단, play처럼 모음 + y면 plays예요.',
  ],

  gens: [
    {
      id: 'third-person-s',
      level: 1,
      title: '3인칭 단수 현재형 쓰기',
      make: function (R) {
        // [동사원형, 3인칭 단수형, 문장(빈칸), 규칙 종류]
        var verbs = [
          ['watch', 'watches', 'My brother [[blank]] TV after dinner.', 'es'],
          ['wash', 'washes', 'Jia [[blank]] the dishes every evening.', 'es'],
          ['go', 'goes', 'Minsu [[blank]] to bed at ten.', 'es'],
          ['do', 'does', 'She [[blank]] her homework after school.', 'es'],
          ['fix', 'fixes', 'My dad [[blank]] bikes on weekends.', 'es'],
          ['teach', 'teaches', 'Our aunt [[blank]] math at a middle school.', 'es'],
          ['brush', 'brushes', 'He [[blank]] his teeth after lunch.', 'es'],
          ['finish', 'finishes', 'The class [[blank]] at four.', 'es'],
          ['mix', 'mixes', 'The cook [[blank]] eggs and milk.', 'es'],
          ['study', 'studies', 'Seojun [[blank]] English every day.', 'ies'],
          ['cry', 'cries', 'The baby [[blank]] at night.', 'ies'],
          ['fly', 'flies', 'The bird [[blank]] high in the sky.', 'ies'],
          ['carry', 'carries', 'Jiho [[blank]] a heavy bag.', 'ies'],
          ['try', 'tries', 'Hayun always [[blank]] her best.', 'ies'],
          ['play', 'plays', 'Hayun [[blank]] the piano on Fridays.', 's'],
          ['enjoy', 'enjoys', 'My grandma [[blank]] long walks.', 's'],
          ['buy', 'buys', 'Mom [[blank]] fruit at the market.', 's'],
          ['read', 'reads', 'My sister [[blank]] comics before bed.', 's'],
          ['walk', 'walks', 'Doyun [[blank]] to school.', 's'],
          ['eat', 'eats', 'Our dog [[blank]] twice a day.', 's'],
          ['like', 'likes', 'Sua [[blank]] spicy food.', 's'],
          ['have', 'has', 'He [[blank]] breakfast at 7:30.', 'has'],
        ];
        var v = R.pick(verbs);
        var rule = {
          es: v[0] + '처럼 s, x, sh, ch, o로 끝나는 동사에는 -es를 붙여요.',
          ies: v[0] + '처럼 자음 + y로 끝나는 동사는 y를 i로 바꾸고 -es를 붙여요.',
          s: v[0] + '에는 -s만 붙여요.',
          has: 'have의 3인칭 단수 현재형은 모양이 바뀌어 has예요.',
        }[v[3]];
        var wrong = [{ a: v[0], why: '주어가 3인칭 단수예요. 동사원형 그대로 쓰지 않고 -s, -es를 붙여요.' }];
        if (v[3] === 'es') wrong.push({ a: v[0] + 's', why: 's, x, sh, ch, o로 끝나는 동사에는 -s가 아니라 -es를 붙여요.' });
        if (v[3] === 'ies') wrong.push({ a: v[0] + 's', why: '자음 + y로 끝나는 동사는 y를 i로 바꾸고 -es를 붙여요.' });
        if (v[3] === 'has') wrong.push({ a: 'haves', why: 'have는 규칙대로 바뀌지 않아요. 3인칭 단수 현재형은 has예요.' });
        if (v[3] === 's' && /y$/.test(v[0])) wrong.push({ a: v[0].slice(0, -1) + 'ies', why: v[0] + '는 모음 + y로 끝나요. 모음 + y면 -s만 붙여요.' });
        return {
          type: 'short', check: 'text', concept: 0,
          q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 빈칸에 쓰세요.\n\n' + v[2] + ' (' + v[0] + ')',
          answer: [v[1]],
          wrong: wrong,
          explain: '주어가 3인칭 단수이므로 동사에 -s나 -es를 붙여요. ' + rule + '\n\n' + v[2].replace('[[blank]]', '**' + v[1] + '**'),
        };
      },
    },
    {
      id: 'neg-question',
      level: 2,
      title: '일반동사의 부정문·의문문 고르기',
      make: function (R) {
        // [주어, 3인칭 단수인가]
        var subjects = [
          ['You', false], ['We', false], ['They', false], ['My parents', false], ['The twins', false],
          ['He', true], ['She', true], ['Minsu', true], ['My sister', true], ['Our teacher', true],
        ];
        // [원형, 3인칭 단수형, 뒷말]
        var phrases = [
          ['play', 'plays', 'tennis after school'],
          ['watch', 'watches', 'TV in the evening'],
          ['study', 'studies', 'math on Mondays'],
          ['have', 'has', 'lunch at noon'],
          ['go', 'goes', 'to the library on Saturdays'],
          ['live', 'lives', 'near the park'],
          ['like', 'likes', 'spicy food'],
        ];
        var s = R.pick(subjects);
        var v = R.pick(phrases);
        var mode = R.pick(['neg', 'q']);
        var S = s[0];
        var low = (S === 'He' || S === 'She' || S === 'You' || S === 'We' || S === 'They' || /^(My|Our|The) /.test(S)) ? S.charAt(0).toLowerCase() + S.slice(1) : S;
        var third = s[1];
        var base = v[0], s3 = v[1], rest = v[2];
        var original = S + ' ' + (third ? s3 : base) + ' ' + rest + '.';
        var correct, cands;
        if (mode === 'neg') {
          correct = third ? S + " doesn't " + base + ' ' + rest + '.' : S + " don't " + base + ' ' + rest + '.';
          cands = third ? [
            [S + " doesn't " + s3 + ' ' + rest + '.', "doesn't 뒤에는 동사원형을 써요. " + s3 + '가 아니라 ' + base + '예요.'],
            [S + " don't " + base + ' ' + rest + '.', "주어가 3인칭 단수예요. don't가 아니라 doesn't를 써요."],
            [S + " isn't " + base + ' ' + rest + '.', "일반동사 부정문에는 be동사가 아니라 doesn't를 써요."],
            [S + ' not ' + s3 + ' ' + rest + '.', "동사 앞에 not만 쓰지 않아요. doesn't + 동사원형으로 써요."],
          ] : [
            [S + " doesn't " + base + ' ' + rest + '.', "doesn't는 3인칭 단수 주어에만 써요. 이 주어에는 don't를 써요."],
            [S + " aren't " + base + ' ' + rest + '.', "일반동사 부정문에는 be동사가 아니라 don't를 써요."],
            [S + ' not ' + base + ' ' + rest + '.', "동사 앞에 not만 쓰지 않아요. don't + 동사원형으로 써요."],
          ];
        } else {
          correct = (third ? 'Does ' : 'Do ') + low + ' ' + base + ' ' + rest + '?';
          cands = third ? [
            ['Does ' + low + ' ' + s3 + ' ' + rest + '?', 'Does 뒤의 동사는 원형으로 써요. ' + s3 + '가 아니라 ' + base + '예요.'],
            ['Do ' + low + ' ' + base + ' ' + rest + '?', '주어가 3인칭 단수예요. Do가 아니라 Does를 써요.'],
            ['Is ' + low + ' ' + base + ' ' + rest + '?', '일반동사 의문문에는 be동사가 아니라 Does를 써요.'],
          ] : [
            ['Does ' + low + ' ' + base + ' ' + rest + '?', 'Does는 3인칭 단수 주어에만 써요. 이 주어에는 Do를 써요.'],
            ['Are ' + low + ' ' + base + ' ' + rest + '?', '일반동사 의문문에는 be동사가 아니라 Do를 써요.'],
            ['Do ' + low + ' ' + s3 + ' ' + rest + '?', '의문문의 동사는 원형으로 써요. 원래 문장의 동사도 ' + base + '예요.'],
          ];
        }
        var reason = {};
        cands.forEach(function (c) { reason[c[0]] = c[1]; });
        var pick = R.choices(correct, R.shuffle(cands).map(function (c) { return c[0]; }), 4);
        var how = mode === 'neg'
          ? (third ? "주어가 3인칭 단수이므로 doesn't + 동사원형(" + base + ')을 써요.' : "주어가 3인칭 단수가 아니므로 don't + 동사원형(" + base + ')을 써요.')
          : (third ? '주어가 3인칭 단수이므로 Does를 문장 앞에 쓰고 동사는 원형(' + base + ')으로 써요.' : '주어가 3인칭 단수가 아니므로 Do를 문장 앞에 쓰고 동사는 원형(' + base + ')으로 써요.');
        return {
          type: 'choice', concept: mode === 'neg' ? 1 : 2,
          q: '다음 문장을 ' + (mode === 'neg' ? '부정문' : '의문문') + '으로 바르게 바꾼 것은 무엇일까요?\n\n' + original,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: how + '\n\n' + correct,
        };
      },
    },
  ],

  vocab: [
    { w: 'get up', m: '일어나다', ex: 'I get up at seven every morning.', exm: '나는 매일 아침 7시에 일어나요.' },
    { w: 'take a shower', m: '샤워하다', ex: 'He takes a shower after soccer practice.', exm: '그는 축구 연습 뒤에 샤워해요.' },
    { w: 'breakfast', m: '아침 식사', ex: 'We eat breakfast together.', exm: '우리는 함께 아침을 먹어요.' },
    { w: 'leave', m: '떠나다, 출발하다', ex: 'She leaves home at eight.', exm: '그녀는 8시에 집을 나서요.' },
    { w: 'homework', m: '숙제', ex: "I do my homework before dinner.", exm: '나는 저녁 먹기 전에 숙제를 해요.' },
    { w: 'always', m: '항상', ex: 'My mom always smiles.', exm: '우리 엄마는 항상 웃어요.' },
    { w: 'usually', m: '보통, 대개', ex: 'I usually walk to school.', exm: '나는 보통 걸어서 학교에 가요.' },
    { w: 'often', m: '자주', ex: 'They often play badminton.', exm: '그들은 자주 배드민턴을 쳐요.' },
    { w: 'sometimes', m: '가끔', ex: 'He sometimes cooks dinner.', exm: '그는 가끔 저녁을 요리해요.' },
    { w: 'never', m: '결코 ~ 않다', ex: 'My cat never drinks milk.', exm: '우리 고양이는 우유를 전혀 마시지 않아요.' },
    { w: 'weekend', m: '주말', ex: 'What do you do on weekends?', exm: '너는 주말에 뭐 하니?' },
    { w: 'practice', m: '연습하다', ex: 'Jia practices the violin every day.', exm: '지아는 매일 바이올린을 연습해요.' },
    { w: 'feed', m: '먹이를 주다', ex: 'I feed my dog in the morning.', exm: '나는 아침에 개에게 먹이를 줘요.' },
    { w: 'early', m: '일찍', ex: 'My grandpa goes to bed early.', exm: '우리 할아버지는 일찍 주무세요.' },
  ],
});
