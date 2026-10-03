/* 중2 영어 · 정중하게 묻기 (간접의문문) */
Tutor.registerUnit({
  id: 'eng-m2-09',
  course: 'eng-m2',
  title: '정중하게 묻기 (간접의문문)',
  summary: '의문문을 문장 속에 넣는 간접의문문과 부가의문문을 익혀 공손하게 묻고 내용을 확인해요.',
  goals: [
    '의문사가 있는 간접의문문을 "의문사 + 주어 + 동사" 어순으로 쓸 수 있어요.',
    'do/does/did가 있는 의문문을 간접의문문으로 바꿀 수 있어요.',
    'Can you tell me ~? / I wonder ~로 공손하게 묻고, 부가의문문으로 내용을 확인할 수 있어요.',
    '인터뷰 글을 읽고 질문과 답을 알맞게 연결할 수 있어요.',
  ],
  standards: [],

  concepts: [
    {
      title: '의문사가 있는 간접의문문의 어순',
      body: '"그가 어디에 사니?"(Where does he live?) 같은 질문을 다른 문장 **속에** 넣은 것을 **간접의문문**이라고 해요.\n\n- Do you know **where he lives**? (너는 그가 어디에 사는지 아니?)\n- I don\'t know **what time it is**. (나는 지금 몇 시인지 몰라요.)\n\n간접의문문은 더 이상 질문이 아니라 문장의 한 부분(목적어)이라서, 어순이 **의문사 + 주어 + 동사**로 바뀌어요.\n\n| 직접 질문 | 간접의문문 |\n|---|---|\n| Where **is** the bank? | Do you know where **the bank is**? |\n| What time **is it**? | Can you tell me what time **it is**? |\n| Why **is** Minsu angry? | I wonder why **Minsu is** angry. |\n\n> 💡 의문사가 **주어**인 질문은 이미 "의문사 + 동사" 순서라서 그대로 넣어요. Who broke the window? → Do you know **who broke the window**?\n\n> ⚠️ Do you know where **is the bank**?(✗) → Do you know where **the bank is**?(○)',
      easy: '질문을 다른 문장 안에 "넣는" 순간, 그 질문은 질문 모양을 벗고 평범한 문장 모양으로 돌아가요.\n\n- 질문 모양: Where **is the bank**? (동사가 주어 앞)\n- 평범한 문장 모양: the bank **is** there (주어가 동사 앞)\n\n그래서 Do you know + where + **the bank is**가 돼요. 의문사(where)만 맨 앞에 남고, 뒤는 평범한 문장 순서예요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nDo you know [[빈칸]]?',
        choices: ['where the bank is', 'where is the bank', 'the bank where is'],
        answer: 0,
        why: ['', '질문 어순(동사 + 주어) 그대로예요. 간접의문문은 의문사 + 주어 + 동사 순서예요.', '의문사는 맨 앞에 와요. 의문사 + 주어 + 동사 순서로 써요.'],
        explain: '간접의문문은 **의문사 + 주어 + 동사**: where + the bank + is. "너는 은행이 어디에 있는지 아니?"',
      },
    },
    {
      title: 'do/does/did가 있는 의문문 바꾸기',
      body: '일반동사 의문문에는 do, does, did가 들어 있어요. 이런 질문을 간접의문문으로 바꿀 때는 **do/does/did를 빼고**, 그것이 나타내던 **인칭과 시제를 동사에 옮겨요.**\n\n| 직접 질문 | 간접의문문 | 동사의 변화 |\n|---|---|---|\n| Where **do** you live? | where you **live** | do를 빼고 원형 그대로 |\n| Where **does** he live? | where he **lives** | does를 빼고 -s를 붙임 |\n| Where **did** she go? | where she **went** | did를 빼고 과거형으로 |\n\n- Can you tell me **when the movie starts**? (When does the movie start?)\n- I wonder **what Jia bought** yesterday. (What did Jia buy yesterday?)\n\n> ⚠️ do/does/did를 빼 놓고 동사를 바꾸지 않는 실수를 조심해요. where he **live**(✗) → where he **lives**(○), where she **go**(✗) → where she **went**(○)',
      easy: 'does와 did는 "시간·사람 표시 스티커"를 들고 있는 도우미예요.\n\n- does는 "현재, 3인칭 단수" 스티커 → 도우미가 빠지면 그 스티커(-s)를 동사에 붙여요: live → lives\n- did는 "과거" 스티커 → 도우미가 빠지면 동사를 과거형으로: go → went\n\n도우미는 떠나도 스티커는 동사에 남는다고 기억하세요.',
      check: {
        type: 'choice',
        q: 'Where did she go?를 간접의문문으로 바꾸어 빈칸에 알맞은 말을 고르세요.\n\nCan you tell me [[빈칸]]?',
        choices: ['where she went', 'where did she go', 'where she go'],
        answer: 0,
        why: ['', '질문 어순 그대로이고 did도 남아 있어요. did를 빼고 의문사 + 주어 + 동사로 써요.', 'did를 뺐는데 과거 시제를 동사에 옮기지 않았어요. go를 과거형 went로 바꿔요.'],
        explain: 'did를 빼고 그 시제(과거)를 동사에 옮겨요: go → **went**. where + she + went. "그녀가 어디에 갔는지 말해 줄 수 있어?"',
      },
    },
    {
      title: 'Can you tell me ~? / I wonder ~로 공손하게 묻기',
      body: '모르는 사람에게 길을 묻거나 어른께 여쭐 때 질문을 바로 던지기보다 간접의문문으로 감싸면 훨씬 **공손하게** 들려요.\n\n| 바로 묻기 | 공손하게 묻기 |\n|---|---|\n| Where is the station? | **Can you tell me** where the station is? |\n| What time does the store open? | **Do you know** what time the store opens? |\n| Why is the bus late? | **I wonder** why the bus is late. |\n\n- **Can/Could you tell me** ~? : ~을 말씀해 주실 수 있나요? (Could가 조금 더 공손해요)\n- **Do you know** ~? : ~을 아세요?\n- **I wonder** ~. : ~인지 궁금해요. (물음표 없이 마침표로 끝나요)\n\n> 💡 I wonder ~는 질문이 아니라 "궁금하다"는 말이라서 끝에 마침표를 찍어요. 듣는 사람이 자연스럽게 대답해 주게 하는 부드러운 표현이에요.',
      easy: '친구에게는 "역 어디야?" 해도 되지만, 처음 보는 어른께는 "실례지만, 역이 어디에 있는지 알려 주실 수 있나요?"라고 하지요.\n\n영어도 똑같아요. 질문 앞에 Can you tell me를 붙이고 뒤를 평범한 문장 순서로 바꾸면 공손한 말이 돼요.',
      check: {
        type: 'choice',
        q: '길을 묻는 말로 가장 **공손한** 것을 고르세요.',
        choices: ['Can you tell me where the station is?', 'Tell me where the station is.', 'Where the station is?'],
        answer: 0,
        why: ['', '"말해."라고 시키는 명령문이에요. 처음 보는 사람에게는 무례하게 들릴 수 있어요.', '물음표만 붙였을 뿐 질문도 문장도 아닌 틀린 어순이에요.'],
        explain: '**Can you tell me** + 간접의문문(where the station is)으로 묻는 것이 가장 공손해요.',
      },
    },
    {
      title: '부가의문문으로 확인하기',
      body: '문장 끝에 짧은 질문을 붙여 "그렇지?", "그렇지 않니?" 하고 상대에게 **확인하거나 동의를 구하는** 것을 **부가의문문**이라고 해요.\n\n**만드는 규칙**\n1. 앞 문장이 **긍정이면 부정**, **부정이면 긍정**으로 붙여요.\n2. 앞 문장의 동사에 맞춰요: be동사 → be동사, 조동사(can, will …) → 그 조동사, 일반동사 → **do/does/did**\n3. 주어는 **대명사**로 바꿔요(Minsu → he, the students → they). 부정은 줄임말(don\'t, isn\'t …)로 써요.\n\n| 문장 | 부가의문문 |\n|---|---|\n| You like it, | **don\'t you**? |\n| She isn\'t here, | **is she**? |\n| Minsu can swim, | **can\'t he**? |\n| They went home, | **didn\'t they**? |\n\n**대답하기**: 질문 모양과 상관없이 **사실이 긍정이면 Yes, 부정이면 No**예요.\n\nA: You aren\'t hungry, are you? (배 안 고프지, 그렇지?)\nB: **Yes, I am.** (아니, 배고파.) / **No, I\'m not.** (응, 안 고파.)\n\n> ⚠️ 우리말 "응/아니"와 거꾸로처럼 느껴질 수 있어요. 영어는 뒤에 오는 내용(I am / I\'m not)에 Yes/No를 맞춘다고 생각하세요.',
      easy: '부가의문문은 문장 뒤에 붙이는 "그치?" 꼬리예요. 꼬리는 앞 문장과 **반대 색깔**로 붙여요.\n\n- 앞이 긍정(You like it) → 꼬리는 부정(don\'t you?)\n- 앞이 부정(She isn\'t here) → 꼬리는 긍정(is she?)\n\n꼬리에 쓰는 동사는 앞 문장에서 빌려 와요. like 같은 일반동사는 직접 못 빌려 오니 do가 대신 와요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 부가의문문을 고르세요.\n\nShe isn\'t at home, [[빈칸]]?',
        choices: ['is she', "isn't she", 'does she'],
        answer: 0,
        why: ['', '앞 문장이 부정(isn\'t)이면 부가의문문은 긍정으로 붙여요.', '앞 문장의 동사가 be동사(is)이므로 부가의문문도 be동사로 받아요.'],
        explain: '앞 문장이 부정(isn\'t)이고 be동사이므로 긍정 be동사로 받아요: **is she**? "그녀는 집에 없지, 그렇지?"',
      },
    },
    {
      title: '인터뷰 글 읽고 질문과 답 연결하기',
      body: '인터뷰 글은 **질문(Q)과 답(A)**이 번갈아 나와요. 질문과 답을 바르게 연결하려면 **질문의 의문사**가 무엇을 묻는지 보고, 답에서 그 정보를 찾아요.\n\n| 의문사 | 묻는 것 | 답에 나오는 말의 예 |\n|---|---|---|\n| when | 때 | when I was ten, last year, in 2020 |\n| where | 곳 | at a school, in Busan |\n| why | 까닭 | because ~, to + 동사원형 |\n| how | 방법·상태 | by bus, by practicing every day |\n| what | 무엇 | 사물·일의 이름 |\n\n인터뷰에서는 질문이 Can you tell me ~?, I wonder ~ 같은 간접의문문으로 나오는 일이 많아요. 그럴 때도 **안에 들어 있는 의문사**를 찾으면 돼요.\n\nQ: Can you tell me **when** you started painting?\nA: I started **when I was eight**.',
      easy: '인터뷰는 "짝 맞추기 놀이"예요. 질문 카드의 의문사가 열쇠예요.\n\n- when 카드 → 답에서 시간(언제)을 찾아요.\n- why 카드 → 답에서 because(왜냐하면)를 찾아요.\n\n질문이 Can you tell me ~?처럼 길어도 그 안의 의문사 하나만 찾으면 짝이 보여요.',
      check: {
        type: 'choice',
        q: '다음 질문에 알맞은 답을 고르세요.\n\nQ: Can you tell me why you became a chef?',
        choices: ['Because I loved cooking for my family.', 'I became a chef in 2019.', 'I work at a small restaurant.'],
        answer: 0,
        why: ['', '이 답은 "언제" 요리사가 되었는지예요. 질문은 why(왜)를 물었어요.', '이 답은 "어디서" 일하는지예요. 질문은 why(왜)를 물었어요.'],
        explain: '질문 속 의문사는 **why**(왜)예요. 까닭을 말하는 Because ~가 알맞은 답이에요. "왜 요리사가 되셨는지 말씀해 주실 수 있나요?" — "가족을 위해 요리하는 것을 아주 좋아했기 때문이에요."',
      },
    },
  ],

  examples: [
    {
      q: '두 문장을 한 문장으로 바꾸세요.\n\nDo you know? + What time does the movie start?',
      steps: [
        '의문사 what time을 그대로 앞에 둬요.',
        'does를 빼요. does가 나타내던 "현재, 3인칭 단수"를 동사에 옮겨 start → starts로 바꿔요.',
        '의문사 + 주어 + 동사 순서로 이어요: what time + the movie + starts',
      ],
      answer: 'Do you know **what time the movie starts**? (영화가 몇 시에 시작하는지 아니?)',
    },
    {
      q: '빈칸에 알맞은 부가의문문을 쓰세요.\n\nMinsu can\'t swim, [[빈칸]]?',
      steps: [
        '앞 문장이 부정(can\'t)이므로 부가의문문은 긍정으로 붙여요.',
        '앞 문장의 동사가 조동사 can이므로 can으로 받아요.',
        '주어 Minsu는 대명사 he로 바꿔요.',
      ],
      answer: 'Minsu can\'t swim, **can he**? (민수는 수영을 못하지, 그렇지?)',
    },
  ],

  terms: [
    { term: '간접의문문', def: '의문문이 다른 문장의 한 부분(주로 목적어)으로 들어간 것이에요. 의문사 + 주어 + 동사 순서로 써요. 예: Do you know **where he lives**?' },
    { term: '직접의문문', def: '상대에게 바로 묻는 보통의 의문문이에요. 동사(또는 do/does/did)가 주어 앞에 와요. 예: Where does he live?' },
    { term: '의문사', def: '무엇을 묻는지 나타내는 말이에요: who, what, when, where, why, how 등.' },
    { term: '부가의문문', def: '문장 끝에 붙여 "그렇지?" 하고 확인하는 짧은 질문이에요. 앞이 긍정이면 부정, 부정이면 긍정으로 붙여요. 예: You like it, **don\'t you**?' },
    { term: 'I wonder ~', def: '"~인지 궁금해요"라는 뜻으로, 뒤에 간접의문문이 와요. 질문이 아니라서 끝에 마침표를 찍어요. 예: I wonder why the bus is late.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n너는 그가 어디에 사는지 아니?\nDo you know [[빈칸]]?',
      choices: ['where he lives', 'where does he live', 'where lives he', 'he lives where'],
      answer: 0,
      why: [
        '',
        '질문 어순 그대로예요. 간접의문문에서는 does를 빼고 의문사 + 주어 + 동사로 써요.',
        '동사가 주어 앞에 있어요. 의문사 + 주어 + 동사 순서예요.',
        '의문사는 맨 앞에 와요.',
      ],
      explain: 'Where does he live?에서 does를 빼고 -s를 동사에 옮겨요: **where he lives**.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 3,
      q: '빈칸에 알맞은 부가의문문을 쓰세요. (두 낱말)\n\nYour brother is a soccer player, [[빈칸]]?',
      answer: ["isn't he", 'is he not'],
      wrong: [
        { a: 'is he', why: '앞 문장이 긍정이면 부가의문문은 부정으로 붙여요: isn\'t he.' },
        { a: "doesn't he", why: '앞 문장의 동사가 be동사(is)이므로 부가의문문도 be동사로 받아요: isn\'t he.' },
        { a: "isn't your brother", why: '부가의문문의 주어는 대명사로 써요. your brother → he' },
      ],
      explain: '앞 문장이 긍정이고 be동사(is)이므로 부정 be동사로 받고, 주어 your brother는 he로 바꿔요: **isn\'t he**? "네 형은 축구 선수지, 그렇지?"',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: 'Where did Mina put her bag?을 간접의문문으로 바꾸어 빈칸에 알맞은 말을 고르세요.\n\nI wonder [[빈칸]].',
      choices: ['where Mina put her bag', 'where did Mina put her bag', 'where Mina puts her bag', 'where Mina did put her bag'],
      answer: 0,
      why: [
        '',
        '질문 어순 그대로예요. did를 빼고 의문사 + 주어 + 동사로 써요.',
        '원래 질문은 did가 있는 과거예요. puts는 현재형이에요. put의 과거형은 put이에요.',
        'did를 빼야 해요. 간접의문문에서는 did 대신 동사를 과거형으로 바꿔요.',
      ],
      hint: 'put은 현재형과 과거형의 모양이 같아요.',
      explain: 'did를 빼고 동사를 과거형으로 바꿔요. put의 과거형은 put(모양이 같음)이므로 **where Mina put her bag**. "미나가 가방을 어디에 두었는지 궁금해요."',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 0,
      q: 'I wonder what is his name.은 바른 문장이에요.',
      answer: false,
      explain: '간접의문문은 의문사 + 주어 + 동사 순서예요. 주어 his name이 동사 is 앞에 와야 해요: I wonder **what his name is**.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 부가의문문을 고르세요.\n\nYou like pizza, [[빈칸]]?',
      choices: ["don't you", 'do you', "aren't you", "didn't you"],
      answer: 0,
      why: [
        '',
        '앞 문장이 긍정이면 부가의문문은 부정으로 붙여요.',
        'like는 일반동사예요. 일반동사는 be동사가 아니라 do로 받아요.',
        '앞 문장은 현재(like)예요. 과거 didn\'t가 아니라 don\'t로 받아요.',
      ],
      explain: '긍정 문장 + 일반동사 현재(like) → 부정 **don\'t you**? "너 피자 좋아하지, 그렇지?"',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 1,
      q: 'What does Jia want?를 간접의문문으로 바꾸려고 해요. 빈칸에 알맞은 한 낱말을 쓰세요.\n\nI wonder what Jia [[빈칸]].',
      answer: ['wants'],
      wrong: [
        { a: 'want', why: 'does를 빼면서 "3인칭 단수 현재"의 -s를 동사에 옮겨야 해요: wants.' },
        { a: 'does want', why: '간접의문문에서는 does를 빼고 동사에 -s를 붙여요: wants.' },
        { a: 'wanted', why: '원래 질문은 현재(does)예요. 과거형으로 바꾸지 않아요.' },
      ],
      explain: 'does를 빼고 그 표시(3인칭 단수 현재)를 동사에 옮겨요: want → **wants**. "지아가 무엇을 원하는지 궁금해요."',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 2,
      q: '처음 보는 어른께 도서관이 어디에 있는지 여쭐 때 가장 알맞은 말을 고르세요.',
      choices: [
        'Could you tell me where the library is?',
        'Tell me where the library is.',
        'Do you know where is the library?',
        'Where the library is?',
      ],
      answer: 0,
      why: [
        '',
        '"말해."라고 시키는 명령문이라 어른께는 무례하게 들려요.',
        '간접의문문의 어순이 틀렸어요. where the library is로 써야 해요.',
        '질문도 문장도 아닌 틀린 어순이에요.',
      ],
      explain: '**Could you tell me** + 간접의문문(where the library is)이 공손하고 어순도 바른 표현이에요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 0,
      q: '우리말에 맞게 순서대로 놓으세요.\n\n지금 몇 시인지 아세요?',
      choices: ['Do you know', 'what time', 'it is', 'now?'],
      answer: [0, 1, 2, 3],
      hint: '의문사(what time) 뒤에 주어 + 동사 순서예요.',
      explain: 'Do you know + **what time**(의문사) + **it is**(주어 + 동사) + now? 질문 어순(is it)이 아니라 평범한 문장 순서(it is)예요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '부가의문문이 **잘못된** 것을 고르세요.',
      choices: [
        'Junho can swim, can he?',
        "It was cold yesterday, wasn't it?",
        "They didn't come, did they?",
        "Your sister plays the piano, doesn't she?",
      ],
      answer: 0,
      why: [
        '',
        '긍정(was) → 부정(wasn\'t), be동사로 받았어요. 바른 문장이에요.',
        '부정(didn\'t) → 긍정(did), 주어 they — 바른 문장이에요.',
        '긍정 일반동사 현재(plays) → doesn\'t, 주어 she — 바른 문장이에요.',
      ],
      hint: '앞 문장이 긍정인지 부정인지, 꼬리가 반대인지 확인해 보세요.',
      explain: 'Junho can swim은 긍정이므로 부가의문문은 부정이어야 해요: Junho can swim, **can\'t he**?',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '인터뷰를 읽고, 빈칸 (A)에 알맞은 질문을 고르세요.\n\nReporter: (A) [[빈칸]]\nYuna: I started baking when I was ten. My grandmother taught me.\nReporter: What is your favorite thing to bake?\nYuna: Carrot cake! It is sweet and healthy.',
      choices: [
        'Can you tell me when you started baking?',
        'Can you tell me why you like carrot cake?',
        'Do you know where the bakery is?',
        'I wonder what your grandmother likes.',
      ],
      answer: 0,
      why: [
        '',
        '당근 케이크 이야기는 다음 질문의 답이에요. (A)의 답은 "열 살 때 시작했다"예요.',
        '빵집의 위치를 묻는 질문인데, 답에는 장소가 없어요.',
        '할머니가 좋아하는 것을 묻는 질문인데, 답은 언제 빵 굽기를 시작했는지예요.',
      ],
      hint: '(A) 바로 뒤의 답이 무엇에 대해 말하고 있나요? when, where, why 중 하나를 골라 보세요.',
      explain: '답 "I started baking **when I was ten**."은 때(언제)를 말해요. 그래서 when을 품은 **Can you tell me when you started baking?**이 알맞아요.\n\n(기자: (A) / 유나: 열 살 때 빵 굽기를 시작했어요. 할머니께서 가르쳐 주셨어요. / 기자: 가장 좋아하는 굽는 음식은 뭔가요? / 유나: 당근 케이크요! 달고 건강에 좋아요.)',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'text', concept: 3,
      q: '대화의 빈칸에 알맞은 부가의문문을 쓰세요. (두 낱말)\n\nA: You didn\'t finish your homework, [[빈칸]]?\nB: No, I didn\'t. I\'ll finish it tonight.',
      answer: ['did you'],
      wrong: [
        { a: "didn't you", why: '앞 문장이 부정(didn\'t)이면 부가의문문은 긍정으로 붙여요: did you.' },
        { a: 'do you', why: '앞 문장은 과거(didn\'t)예요. 과거에 맞춰 did로 받아요.' },
      ],
      hint: '앞 문장은 부정이고 과거예요.',
      explain: '부정 과거(didn\'t) → 긍정 과거 **did you**? "너 숙제 안 끝냈지, 그렇지?" — "응, 안 끝냈어. 오늘 밤에 끝낼 거야."',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 3,
      q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: You aren\'t hungry, are you?\nB: [[빈칸]] I skipped lunch today.',
      choices: ['Yes, I am.', 'No, I am.', "No, I'm not.", "Yes, I'm not."],
      answer: 0,
      why: [
        '',
        'No 뒤에는 부정(I\'m not)이 와야 해요. No와 I am은 짝이 맞지 않아요.',
        '"배고프지 않다"는 뜻이에요. 점심을 걸렀다는 B는 배가 고파요.',
        'Yes 뒤에는 긍정(I am)이 와야 해요. Yes와 I\'m not은 짝이 맞지 않아요.',
      ],
      hint: 'B는 점심을 걸렀어요. 배가 고픈 것이 사실이면 Yes, 아니면 No예요.',
      explain: 'B는 점심을 걸러서 배가 고파요. 사실이 긍정(I am hungry)이므로 **Yes, I am.**이에요. 우리말로는 "아니, 배고파."처럼 옮겨져서 헷갈리기 쉬워요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      q: '어법상 **바른** 문장을 고르세요.',
      choices: [
        'Can you tell me when the store opens?',
        'Do you know where does she live?',
        'I wonder why was he late.',
        'Can you tell me what time did the bus leave?',
      ],
      answer: 0,
      why: [
        '',
        'does가 남아 있고 질문 어순이에요. → where she lives',
        '질문 어순(was he)이에요. → why he was late',
        'did가 남아 있고 질문 어순이에요. → what time the bus left',
      ],
      hint: '간접의문문 안에 do/does/did가 남아 있거나, 동사가 주어 앞에 있으면 틀린 문장이에요.',
      explain: 'When does the store open?의 does를 빼고 open에 -s를 붙인 **when the store opens**가 바른 간접의문문이에요. 나머지는 모두 질문 어순이 그대로 남은 문장이에요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 1,
      q: 'Why did Jiho leave early?를 간접의문문으로 바꾸려고 해요. 빈칸에 알맞은 한 낱말을 쓰세요.\n\nI wonder why Jiho [[빈칸]] early.',
      answer: ['left'],
      wrong: [
        { a: 'leave', why: 'did를 뺐으면 그 과거 시제를 동사에 옮겨야 해요: leave → left.' },
        { a: 'did leave', why: '간접의문문에서는 did를 빼고 동사를 과거형으로 써요: left.' },
        { a: 'leaves', why: '원래 질문은 과거(did)예요. 현재형 leaves가 아니라 과거형 left를 써요.' },
        { a: 'leaved', why: 'leave는 불규칙 동사예요. 과거형은 left예요.' },
      ],
      hint: 'leave의 과거형은 불규칙이에요.',
      explain: 'did를 빼고 leave를 과거형 **left**로 바꿔요. "지호가 왜 일찍 떠났는지 궁금해요."',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 0,
      q: 'Who broke the window?를 간접의문문으로 바꾸어 빈칸에 알맞은 말을 고르세요.\n\nDo you know [[빈칸]]?',
      choices: ['who broke the window', 'who did break the window', 'who the window broke', 'the window who broke'],
      answer: 0,
      why: [
        '',
        '원래 질문에 did가 없어요. 의문사 who가 주어이므로 그대로 써요.',
        '이렇게 쓰면 "창문이 누구를 깨뜨렸는지"라는 뜻이 돼요. who가 주어예요.',
        '의문사는 맨 앞에 와요.',
      ],
      hint: '이 질문에서 깨뜨린 사람, 곧 주어는 누구인가요?',
      explain: 'Who broke the window?에서는 의문사 who가 **주어**예요. 이미 "의문사(주어) + 동사" 순서이므로 그대로 넣어요: Do you know **who broke the window**?',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '인터뷰를 읽고, 알 수 **없는** 것을 고르세요.\n\nReporter: Can you tell me what you do at the zoo, Mr. Han?\nMr. Han: I take care of the elephants. I feed them and wash them every day.\nReporter: I wonder how much food an elephant eats.\nMr. Han: An adult elephant eats more than 100 kilograms of food a day.\nReporter: Wow! You love your job, don\'t you?\nMr. Han: Yes, I do. The elephants are like my family.',
      choices: [
        'Mr. Han이 동물원에서 일한 기간',
        'Mr. Han이 돌보는 동물',
        '다 자란 코끼리가 하루에 먹는 먹이의 양',
        'Mr. Han이 자기 일을 좋아하는지',
      ],
      answer: 0,
      why: [
        '',
        'I take care of the elephants.에서 코끼리를 돌본다는 것을 알 수 있어요.',
        'more than 100 kilograms of food a day — 하루에 100킬로그램이 넘는 먹이를 먹어요.',
        'You love your job, don\'t you?에 Yes, I do.라고 답했어요. 일을 좋아해요.',
      ],
      hint: '기자가 한 질문 세 개를 찾아 보세요. 질문하지 않은 것은 답도 없어요.',
      explain: '기자는 ① 하는 일(what you do) ② 먹이 양(how much food) ③ 일을 좋아하는지(부가의문문)를 물었어요. 일한 기간(how long)은 묻지도 답하지도 않았어요.\n\n(기자: 한 선생님, 동물원에서 무슨 일을 하시는지 말씀해 주시겠어요? / 한 선생님: 저는 코끼리를 돌봐요. 매일 먹이를 주고 씻겨 줘요. / 기자: 코끼리가 먹이를 얼마나 먹는지 궁금해요. / 한 선생님: 다 자란 코끼리는 하루에 100킬로그램이 넘는 먹이를 먹어요. / 기자: 와! 일을 정말 좋아하시지요? / 한 선생님: 네, 그래요. 코끼리들은 제 가족 같아요.)',
    },
  ],

  deeper: [
    {
      title: '왜 간접의문문이 더 공손할까요?',
      body: 'Where is the station?은 상대에게 "대답해야 하는" 부담을 바로 줘요. 반면 Can you tell me where the station is?는 "알려 줄 수 있는지"를 먼저 묻기 때문에, 상대에게 **거절할 여지**를 남겨 줘요. I wonder ~는 아예 질문이 아니라 "나는 궁금해요"라는 혼잣말 같은 문장이라 더 부드러워요.\n\n이렇게 상대의 부담을 줄여 주는 말투는 영어뿐 아니라 여러 언어에서 공손함을 나타내는 방법이에요. 우리말에서도 "역 어디예요?"보다 "역이 어디에 있는지 여쭤봐도 될까요?"가 더 공손하지요.\n\n부가의문문도 비슷한 역할을 해요. It\'s a nice day, isn\'t it?처럼 상대의 동의를 구하면 대화를 부드럽게 시작할 수 있어요. 영어권에서 날씨 이야기에 부가의문문이 자주 붙는 것도 그래서예요.',
    },
  ],

  faq: [
    {
      q: '간접의문문에서는 왜 어순이 바뀌어요?',
      a: '간접의문문은 더 이상 질문이 아니라 큰 문장의 한 부분(목적어)이 되기 때문이에요. 질문이 아닌 부분은 평범한 문장처럼 주어 + 동사 순서로 써요. 전체가 질문인지 아닌지는 앞부분(Do you know ~? / I wonder ~.)이 정해요.',
    },
    {
      q: 'I wonder 문장 끝에는 왜 물음표를 안 써요?',
      a: 'I wonder ~는 "나는 ~이 궁금해요"라는 평서문이에요. 묻는 모양이 아니므로 마침표를 찍어요. 반면 Do you know ~?, Can you tell me ~?는 문장 전체가 질문이라서 물음표를 찍어요.',
    },
    {
      q: '부가의문문 대답에서 Yes/No가 왜 헷갈려요?',
      a: '우리말은 상대 말이 맞으면 "응"이라고 하지만, 영어는 내용이 긍정이면 Yes, 부정이면 No예요. You aren\'t hungry, are you?에 배가 고프면 Yes, I am.(아니, 배고파), 안 고프면 No, I\'m not.(응, 안 고파)이에요. Yes 뒤에는 긍정, No 뒤에는 부정이 온다고 기억하세요.',
    },
    {
      q: '부가의문문에 주어 이름을 그대로 쓰면 안 돼요?',
      a: '부가의문문의 주어는 항상 대명사로 써요. Minsu is kind, isn\'t he?, The students are here, aren\'t they?처럼 앞 문장 주어를 가리키는 대명사(he, she, it, they …)로 바꿔요.',
    },
  ],

  mistakes: [
    '간접의문문에 질문 어순을 그대로 쓰는 실수 — Do you know where is the bank?(✗) → Do you know where the bank is?(○)',
    'do/does/did를 빼고 동사를 바꾸지 않는 실수 — I wonder where she go.(✗) → I wonder where she went.(○)',
    '부가의문문을 앞 문장과 같은 긍정·부정으로 붙이는 실수 — You like it, do you?(✗) → You like it, don\'t you?(○)',
  ],

  gens: [
    {
      id: 'indirect-question',
      level: 1,
      title: '직접의문문을 간접의문문으로 바꾸기',
      make: function (R) {
        var reasons = {
          Q: '질문 어순 그대로예요. 간접의문문은 의문사 + 주어 + 동사 순서예요.',
          DO: 'do/does/did가 남아 있어요. 간접의문문에서는 do/does/did를 빼고 그 시제·인칭을 동사에 옮겨요.',
          S: 'does를 빼면서 3인칭 단수 현재의 -s/-es를 동사에 붙여야 해요.',
          PAST: '원래 질문에 did가 있어요. did를 빼면서 동사를 과거형으로 바꿔요.',
          PRES: '원래 질문은 현재예요. 동사의 시제를 바꾸지 않아요.',
          ORD: '어순이 틀렸어요. 의문사를 맨 앞에 두고 주어 + 동사 순서로 써요.',
          BE: 'be동사가 빠졌어요. 의문사 + 주어 + be동사 순서로 써요.',
          BEPOS: 'be동사 자리가 틀렸어요. be동사는 주어 바로 뒤에 와요.',
          NOTDO: '원래 질문의 동사는 be동사예요. do/does로 바꾸지 않고 be동사를 주어 뒤에 써요.',
          SPLIT: 'how old는 "몇 살"을 묻는 한 덩어리 의문사예요. 떼지 말고 함께 맨 앞에 둔 뒤 주어 + 동사를 써요.',
        };
        // [직접의문문, 정답, [[오답, 이유]…], 우리말]
        var items = [
          ['Where does he live?', 'where he lives', [['where does he live', 'Q'], ['where he live', 'S'], ['where lives he', 'ORD']], '그가 어디에 사는지'],
          ['What time is it?', 'what time it is', [['what time is it', 'Q'], ['it is what time', 'ORD'], ['what time it does', 'NOTDO']], '지금 몇 시인지'],
          ['Where did she go?', 'where she went', [['where did she go', 'Q'], ['where she go', 'PAST'], ['where she goes', 'PAST']], '그녀가 어디에 갔는지'],
          ['Why is Minsu angry?', 'why Minsu is angry', [['why is Minsu angry', 'Q'], ['why Minsu angry is', 'BEPOS'], ['why does Minsu angry', 'NOTDO']], '민수가 왜 화가 났는지'],
          ['How old is your brother?', 'how old your brother is', [['how old is your brother', 'Q'], ['how your brother is old', 'SPLIT'], ['how old your brother', 'BE']], '너의 형이 몇 살인지'],
          ['What does Jia want for her birthday?', 'what Jia wants for her birthday', [['what does Jia want for her birthday', 'Q'], ['what Jia want for her birthday', 'S'], ['what wants Jia for her birthday', 'ORD']], '지아가 생일에 무엇을 원하는지'],
          ['When does the movie start?', 'when the movie starts', [['when does the movie start', 'Q'], ['when the movie start', 'S'], ['when starts the movie', 'ORD']], '영화가 언제 시작하는지'],
          ['How did you solve this problem?', 'how you solved this problem', [['how did you solve this problem', 'Q'], ['how you solve this problem', 'PAST'], ['how you did solve this problem', 'DO']], '네가 이 문제를 어떻게 풀었는지'],
          ['Where is the bus stop?', 'where the bus stop is', [['where is the bus stop', 'Q'], ['where the bus stop', 'BE'], ['the bus stop is where', 'ORD']], '버스 정류장이 어디에 있는지'],
          ['What did they eat for lunch?', 'what they ate for lunch', [['what did they eat for lunch', 'Q'], ['what they eat for lunch', 'PAST'], ['what they did eat for lunch', 'DO']], '그들이 점심으로 무엇을 먹었는지'],
          ['Why is the baby crying?', 'why the baby is crying', [['why is the baby crying', 'Q'], ['why the baby crying is', 'BEPOS'], ['why does the baby crying', 'NOTDO']], '아기가 왜 울고 있는지'],
          ['How much is this cap?', 'how much this cap is', [['how much is this cap', 'Q'], ['how much this cap', 'BE'], ['this cap is how much', 'ORD']], '이 모자가 얼마인지'],
          ['When did the class end?', 'when the class ended', [['when did the class end', 'Q'], ['when the class end', 'PAST'], ['when the class ends', 'PAST']], '수업이 언제 끝났는지'],
          ['Where do you buy your books?', 'where you buy your books', [['where do you buy your books', 'Q'], ['where you bought your books', 'PRES'], ['where buy you your books', 'ORD']], '네가 책을 어디에서 사는지'],
        ];
        var leads = [['Do you know', '?'], ['Can you tell me', '?'], ['I wonder', '.']];
        var it = R.pick(items);
        var lead = R.pick(leads);
        var reason = {};
        var wrongs = it[2].map(function (w) { reason[w[0]] = reasons[w[1]]; return w[0]; });
        var pick = R.choices(it[1], wrongs, 4);
        return {
          type: 'choice', concept: /\b(do|does|did)\b/.test(it[0]) ? 1 : 0,
          q: '다음 질문을 간접의문문으로 바꾸어 빈칸에 알맞은 말을 고르세요.\n\n' + it[0] + '\n→ ' + lead[0] + ' [[빈칸]]' + lead[1],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === it[1] ? '' : reason[c]; }),
          explain: '간접의문문은 **의문사 + 주어 + 동사** 순서예요: ' + lead[0] + ' **' + it[1] + '**' + lead[1] + ' (뜻: ' + it[3] + ')',
        };
      },
    },
    {
      id: 'tag-question',
      level: 2,
      title: '알맞은 부가의문문 고르기',
      make: function (R) {
        var reasons = {
          POL: '앞 문장이 긍정이면 부정, 부정이면 긍정으로 붙여요.',
          AUX: '앞 문장의 동사에 맞춰요. be동사는 be동사, 조동사는 그 조동사, 일반동사는 do/does/did로 받아요.',
          TEN: '앞 문장의 시제(현재·과거)에 맞춰요.',
          PRO: '부가의문문의 주어는 앞 문장 주어를 가리키는 대명사로 써요.',
          AGR: '주어가 3인칭 단수이고 현재이므로 does로 받아요.',
        };
        // [앞 문장, 정답, [[오답, 이유]…]]
        var items = [
          ['You like it', "don't you", [['do you', 'POL'], ["aren't you", 'AUX'], ["didn't you", 'TEN']]],
          ["She isn't here", 'is she', [["isn't she", 'POL'], ['does she', 'AUX'], ['was she', 'TEN']]],
          ['Minsu can swim', "can't he", [['can he', 'POL'], ["doesn't he", 'AUX'], ["can't Minsu", 'PRO']]],
          ['It was cold yesterday', "wasn't it", [['was it', 'POL'], ["isn't it", 'TEN'], ["didn't it", 'AUX']]],
          ["They didn't come to the party", 'did they', [["didn't they", 'POL'], ['do they', 'TEN'], ['were they', 'AUX']]],
          ['Your sister plays the piano', "doesn't she", [['does she', 'POL'], ["isn't she", 'AUX'], ["don't she", 'AGR']]],
          ["You aren't tired", 'are you', [["aren't you", 'POL'], ['do you', 'AUX'], ['were you', 'TEN']]],
          ['Jia went to the library', "didn't she", [['did she', 'POL'], ["doesn't she", 'TEN'], ["wasn't she", 'AUX']]],
          ["He won't be late", 'will he', [["won't he", 'POL'], ['is he', 'AUX'], ['does he', 'AUX']]],
          ['The students are in the gym', "aren't they", [['are they', 'POL'], ["don't they", 'AUX'], ["aren't the students", 'PRO']]],
          ["You can't ride a bike", 'can you', [["can't you", 'POL'], ['do you', 'AUX'], ['are you', 'AUX']]],
          ['Seojun has a dog', "doesn't he", [['does he', 'POL'], ["isn't he", 'AUX'], ["don't he", 'AGR']]],
          ['This soup is delicious', "isn't it", [['is it', 'POL'], ["doesn't it", 'AUX'], ["isn't this", 'PRO']]],
          ['We should leave now', "shouldn't we", [['should we', 'POL'], ["don't we", 'AUX'], ["shouldn't you", 'PRO']]],
        ];
        var it = R.pick(items);
        var reason = {};
        var wrongs = it[2].map(function (w) { reason[w[0]] = reasons[w[1]]; return w[0]; });
        var pick = R.choices(it[1], wrongs, 4);
        return {
          type: 'choice', concept: 3,
          q: '빈칸에 알맞은 부가의문문을 고르세요.\n\n' + it[0] + ', [[빈칸]]?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === it[1] ? '' : reason[c]; }),
          explain: '앞 문장과 반대(긍정 ↔ 부정)로, 앞 문장의 동사와 시제에 맞춰, 주어는 대명사로 써요: ' + it[0] + ', **' + it[1] + '**?',
        };
      },
    },
  ],

  vocab: [
    { w: 'wonder', m: '궁금해하다', ex: 'I wonder why the sky is blue.', exm: '나는 하늘이 왜 파란지 궁금해요.' },
    { w: 'interview', m: '인터뷰, 면담; 인터뷰하다', ex: 'We read an interview with a famous baker.', exm: '우리는 한 유명한 제빵사와의 인터뷰를 읽었어요.' },
    { w: 'reporter', m: '기자', ex: 'The reporter asked many questions.', exm: '기자는 많은 질문을 했어요.' },
    { w: 'station', m: '역, 정거장', ex: 'Can you tell me where the station is?', exm: '역이 어디에 있는지 알려 주실 수 있나요?' },
    { w: 'direction', m: '방향; (길) 안내', ex: 'Could you give me directions to the museum?', exm: '박물관 가는 길을 알려 주실 수 있나요?' },
    { w: 'information', m: '정보', ex: 'You can find information on the website.', exm: '웹사이트에서 정보를 찾을 수 있어요.' },
    { w: 'guess', m: '추측하다', ex: 'Can you guess how old my grandma is?', exm: '우리 할머니가 몇 살이신지 맞혀 볼래?' },
    { w: 'feed', m: '먹이를 주다', ex: 'I feed my cat twice a day.', exm: '나는 하루에 두 번 고양이에게 먹이를 줘요.' },
    { w: 'explain', m: '설명하다', ex: 'Can you explain how this machine works?', exm: '이 기계가 어떻게 작동하는지 설명해 줄 수 있어?' },
    { w: 'favorite', m: '가장 좋아하는', ex: 'Do you know what her favorite color is?', exm: '그녀가 가장 좋아하는 색이 무엇인지 아니?' },
    { w: 'schedule', m: '일정, 시간표', ex: 'I wonder what time the bus leaves. Let\'s check the schedule.', exm: '버스가 몇 시에 떠나는지 궁금해. 시간표를 확인해 보자.' },
    { w: 'prepare', m: '준비하다', ex: 'How did you prepare for the contest?', exm: '대회를 어떻게 준비했나요?' },
    { w: 'adult', m: '어른, 다 자란', ex: 'An adult elephant is very heavy.', exm: '다 자란 코끼리는 아주 무거워요.' },
  ],
});
