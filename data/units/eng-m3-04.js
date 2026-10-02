/* 중3 영어 · 상황 설명하기 (분사구문) */
Tutor.registerUnit({
  id: 'eng-m3-04',
  course: 'eng-m3',
  title: '상황 설명하기 (분사구문)',
  summary: '접속사와 주어를 줄여 쓰는 분사구문을 익혀 때·이유·동시 동작을 간결하게 나타내요.',
  goals: [
    '접속사가 있는 문장을 분사구문으로 바꿀 수 있어요.',
    '분사구문이 때·이유·동시 동작 가운데 어떤 뜻인지 알 수 있어요.',
    'Being이 생략된 분사구문을 알아보고 뜻을 이해할 수 있어요.',
    '이야기 글에서 분사구문으로 나타낸 인물의 행동과 상황을 파악할 수 있어요.',
  ],
  standards: ['[9영01-04]', '[9영01-02]', '[9영02-05]'],

  concepts: [
    {
      title: '분사구문 만들기',
      body: '**분사구문**은 접속사가 있는 부사절(when, because, while …로 시작하는 덩어리)을 **분사로 시작하는 짧은 덩어리**로 줄인 거예요. 세 단계로 만들어요.\n\n**When I opened the door**, I saw a cat.\n\n1. **접속사를 빼요**: When ✂\n2. 주절과 **주어가 같으면 주어를 빼요**: I ✂ (주절의 주어도 I)\n3. **동사를 -ing로** 바꿔요: opened → **opening**\n\n→ **Opening the door**, I saw a cat. (문을 열었을 때, 나는 고양이를 보았어요.)\n\n> 💡 시제는 주절이 알려 줘요. 주절이 과거(saw)이니 Opening the door도 "열었을 때"로 읽어요.\n\n> ⚠️ 부사절과 주절의 **주어가 같을 때만** 주어를 뺄 수 있어요. 주어가 다른데 빼면 뜻이 이상해져요.',
      easy: '분사구문은 문장을 **줄여 쓰는 기술**이에요. 문자 메시지를 짧게 줄여 보내는 것처럼요.\n\n- 긴 문장: When I opened the door, I saw a cat.\n- 줄이기: When(접속사) ✂, I(같은 주어) ✂, opened → opening\n- 짧은 문장: Opening the door, I saw a cat.\n\n뒤 문장(주절)에 주어가 남아 있으니, 앞에서 주어를 빼도 누가 했는지 알 수 있어요.',
      check: {
        type: 'choice',
        q: '밑줄 친 부분을 분사구문으로 바르게 바꾼 것을 고르세요.\n\n__When I heard the news__, I called my mom.',
        choices: ['Hearing the news', 'Heard the news', 'I hearing the news'],
        answer: 0,
        why: [
          '',
          '동사를 과거형으로 두면 분사구문이 아니에요. 동사를 -ing로 바꿔요.',
          '부사절과 주절의 주어(I)가 같으니 주어도 빼요.',
        ],
        explain: '접속사 When을 빼고, 같은 주어 I를 빼고, 동사 heard를 -ing로 바꿔요. → **Hearing the news**, I called my mom. (그 소식을 들었을 때 나는 엄마에게 전화했어요.)',
      },
    },
    {
      title: '분사구문의 뜻 ① 때와 동시 동작',
      body: '분사구문에는 접속사가 없어서, 뜻은 **앞뒤 내용으로** 알아내요. 가장 흔한 뜻은 "때"와 "동시 동작"이에요.\n\n**때** — "~할 때, ~하다가" (when, while)\n\n- **Arriving at the station**, we called Mom.\n  = When we arrived at the station, we called Mom. (역에 도착했을 때 우리는 엄마에게 전화했어요.)\n\n**동시 동작** — "~하면서" (while, as)\n\n- **Listening to music**, I cleaned my room.\n  = While I was listening to music, I cleaned my room. (음악을 들으면서 나는 방을 청소했어요.)\n- She waved at us, **smiling brightly**. (그녀는 밝게 웃으면서 우리에게 손을 흔들었어요.)\n\n> 💡 마지막 예처럼 분사구문은 **문장 뒤**에 쉼표와 함께 올 수도 있어요. 두 동작이 한꺼번에 일어나는 장면을 그릴 때 자주 써요.',
      easy: '영화 장면을 떠올려 보세요.\n\n- 장면 1: 역에 **도착하는 순간** → 엄마에게 전화 (때)\n- 장면 2: 음악을 **들으면서** 동시에 → 방 청소 (동시 동작)\n\n분사구문은 이렇게 "그때", "그러면서"를 짧게 붙여 장면을 생생하게 보여 줘요.',
      check: {
        type: 'choice',
        q: '밑줄 친 부분의 뜻으로 알맞은 것을 고르세요.\n\nMy dad sang a song, __driving the car__.',
        choices: ['차를 운전하면서', '차를 운전하기 위해서', '차를 운전했지만'],
        answer: 0,
        why: [
          '',
          '"~하기 위해서"(목적)는 to부정사로 나타내요. 이 분사구문은 동시 동작이에요.',
          '분사구문은 "~했지만"보다 때·이유·동시 동작으로 주로 쓰여요. 노래하는 일과 운전하는 일이 함께 일어나고 있어요.',
        ],
        explain: '아빠가 노래를 부르는 일과 차를 운전하는 일이 **동시에** 일어나요. 그래서 "차를 **운전하면서** 노래를 불렀어요"예요.',
      },
    },
    {
      title: '분사구문의 뜻 ② 이유',
      body: '분사구문은 "**~해서, ~하기 때문에**"라는 **이유**도 나타내요. 접속사로 바꾸면 because, as예요.\n\n- **Feeling sick**, Minsu stayed home.\n  = Because Minsu felt sick, he stayed home. (아파서 민수는 집에 있었어요.)\n- **Knowing the answer**, Seojun raised his hand.\n  = Because Seojun knew the answer, he raised his hand. (답을 알아서 서준이는 손을 들었어요.)\n\n때인지 이유인지는 두 일의 관계로 정해요. "아파서 → 집에 있었다"처럼 앞의 일이 뒤의 일의 **원인**이면 이유예요.\n\n> 💡 주절의 주어가 이름(Minsu)이고 부사절 주어가 he일 때, 분사구문으로 바꾸면 이름을 주절에 남겨요. Feeling sick, **Minsu** stayed home.',
      easy: '"왜?" 하고 물어보세요.\n\nFeeling sick, Minsu stayed home.\n\n- 민수는 왜 집에 있었어? → 아파서!\n\n"왜?"에 분사구문이 답이 되면 이유예요. 답이 "언제?"에 맞으면 때예요.',
      check: {
        type: 'ox',
        q: 'Being very hungry, the children ate all the cookies.\n\n이 문장에서 분사구문은 "몹시 배가 고팠기 때문에"라는 이유를 나타내요.',
        answer: true,
        explain: '아이들이 쿠키를 다 먹은 **까닭**이 배가 고팠기 때문이에요. 접속사로 바꾸면 Because the children were very hungry, they ate all the cookies.예요.',
      },
    },
    {
      title: 'Being이 생략된 분사구문',
      body: '부사절의 동사가 **be동사**이면 분사구문은 **Being**으로 시작해요. 그런데 이 **Being은 흔히 생략**해요. 그러면 형용사나 과거분사로 시작하는 분사구문이 돼요.\n\n- Because he was tired, he went to bed early.\n  → (Being) **Tired**, he went to bed early. (피곤해서 그는 일찍 잤어요.)\n- When she was surprised at the noise, she dropped her cup.\n  → (Being) **Surprised at the noise**, she dropped her cup. (그 소리에 놀라서 그녀는 컵을 떨어뜨렸어요.)\n- Because it is written in easy English, this book is good for beginners.\n  → (Being) **Written in easy English**, this book is good for beginners. (쉬운 영어로 쓰여 있어서 이 책은 초보자에게 좋아요.)\n\n> 💡 문장이 형용사나 과거분사로 시작하고 쉼표가 이어지면, 앞에 Being이 숨어 있다고 생각하고 읽어 보세요.',
      easy: '분사구문 맨 앞의 Being은 "~인 상태로, ~이어서"라는 뜻이라 빼도 뜻이 거의 그대로예요. 그래서 자주 빼요.\n\n(Being) Tired, he went to bed.\n\n괄호 속 Being을 머릿속으로 다시 넣어 보면 "피곤한 상태여서 → 피곤해서"라고 읽을 수 있어요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\n[[빈칸]] in 1950, this bridge is very old.\n(= Because it was built in 1950, this bridge is very old.)',
        choices: ['Built', 'Building', 'Builds'],
        answer: 0,
        why: [
          '',
          '다리는 직접 짓는 쪽이 아니라 지어진 쪽이에요. Being built에서 Being이 빠진 꼴이므로 과거분사를 써요.',
          '분사구문은 동사의 현재형으로 시작하지 않아요.',
        ],
        explain: 'was built(지어졌다)를 분사구문으로 바꾸면 Being built이고, Being을 빼면 **Built** in 1950이에요. "1950년에 지어져서 이 다리는 아주 오래되었어요."',
      },
    },
    {
      title: '분사구문을 접속사가 있는 문장으로 바꿔 이해하기',
      body: '분사구문의 뜻이 헷갈리면 **거꾸로** 접속사가 있는 문장으로 바꿔 보세요. 만들 때의 순서를 되돌리면 돼요.\n\n**Walking along the beach**, we found a pretty shell.\n\n1. **주어 되찾기**: 주절의 주어 → we\n2. **시제 되찾기**: 주절의 시제(found, 과거) → were walking / walked\n3. **접속사 고르기**: 두 일의 관계를 보고 → 해변을 걷던 **때**에 조개를 찾음 → When(While)\n\n→ **While we were walking** along the beach, we found a pretty shell. (해변을 따라 걷다가 우리는 예쁜 조개껍데기를 찾았어요.)\n\n| 두 일의 관계 | 접속사 | 뜻 |\n|---|---|---|\n| 그때 | when, while | ~할 때, ~하다가 |\n| 원인 → 결과 | because, as | ~해서, ~ 때문에 |\n| 함께 일어남 | while, as | ~하면서 |',
      easy: '분사구문은 압축 파일이고, 접속사 문장은 압축을 푼 파일이라고 생각해 보세요.\n\n압축을 풀 때 필요한 것은 세 가지예요: **누가**(주어), **언제 일**(시제), **어떤 관계**(접속사). 주어와 시제는 뒤 문장(주절)을 보면 바로 알 수 있고, 접속사만 내용을 보고 고르면 돼요.',
      check: {
        type: 'choice',
        q: '분사구문을 접속사가 있는 문장으로 바르게 바꾼 것을 고르세요.\n\nSeeing the dog, the little boy ran away.',
        choices: [
          'When the little boy saw the dog, he ran away.',
          'When the dog saw the little boy, he ran away.',
          'When the little boy sees the dog, he ran away.',
        ],
        answer: 0,
        why: [
          '',
          '개를 본 사람은 주절의 주어인 the little boy예요. 분사구문의 주어는 주절의 주어와 같아요.',
          '주절이 과거(ran)이므로 부사절도 과거(saw)로 써요.',
        ],
        explain: '주어는 주절과 같은 the little boy, 시제는 주절과 같은 과거예요. → **When the little boy saw the dog**, he ran away. (그 어린 소년은 개를 보았을 때 달아났어요.)',
      },
    },
    {
      title: '이야기 글에서 인물의 행동과 상황 파악하기',
      body: '이야기 글에는 분사구문이 자주 나와요. 인물이 **무엇을 하면서**, **어떤 상황에서**, **왜** 행동했는지를 짧게 덧붙이기 때문이에요.\n\n> Minji got up late on Monday. **Looking at the clock**, she jumped out of bed. She ran to the bus stop, **holding a piece of toast**. **Arriving at school**, she found the gate closed. Then she remembered something. It was a holiday!\n\n분사구문마다 "누가, 무엇을, 어떤 관계로"를 확인해요.\n\n- Looking at the clock → 민지가 시계를 **보고(보았을 때)** 벌떡 일어났어요. (때)\n- holding a piece of toast → 토스트 한 조각을 **든 채로** 달렸어요. (동시 동작)\n- Arriving at school → 학교에 **도착했을 때** 문이 닫혀 있었어요. (때)\n\n> 💡 분사구문의 주어는 주절의 주어예요. 이야기에서 분사구문을 만나면 "이 행동을 한 사람은 쉼표 뒤의 주어"라고 짚어 보세요.',
      easy: '이야기를 만화 칸으로 나눠 그려 보세요.\n\n1. 민지가 시계를 **보고** → 벌떡 일어남\n2. 토스트를 **든 채** → 버스 정류장으로 뜀\n3. 학교에 **도착하니** → 문이 닫혀 있음\n4. 알고 보니 → 휴일!\n\n분사구문은 한 칸 안에 "그러면서", "그때"를 같이 그려 넣는 역할이에요.',
      check: {
        type: 'choice',
        q: '글을 읽고 물음에 답하세요.\n\nSitting on the bench, Hayun read a letter from her grandma. Feeling happy, she smiled.\n\n하윤이가 웃은 까닭은 무엇일까요?',
        choices: ['기분이 좋아서', '벤치에 앉아 있어서', '할머니를 만나서'],
        answer: 0,
        why: [
          '',
          '벤치에 앉은 것은 편지를 읽은 때의 상황이에요. 웃은 까닭은 Feeling happy예요.',
          '하윤이는 할머니를 만난 것이 아니라 할머니가 보낸 편지를 읽었어요.',
        ],
        explain: 'Feeling happy, she smiled.는 "기분이 좋아서 그녀는 웃었어요"라는 **이유**의 분사구문이에요. (= Because she felt happy, she smiled.)',
      },
    },
  ],

  examples: [
    {
      q: '밑줄 친 부분을 분사구문으로 바꾸세요.\n\n__Because Minsu felt tired__, he went to bed early.',
      steps: [
        '접속사 Because를 빼요.',
        '부사절의 주어 Minsu와 주절의 주어 he는 같은 사람이에요. 주어를 빼고, 이름 Minsu는 주절에 남겨요.',
        '동사 felt를 -ing로 바꿔요: feel → feeling',
      ],
      answer: '**Feeling tired**, Minsu went to bed early. (피곤해서 민수는 일찍 잤어요.)',
    },
    {
      q: '분사구문을 접속사가 있는 문장으로 바꾸세요.\n\nWalking home, Jia met an old friend.',
      steps: [
        '주어는 주절의 주어와 같아요: Jia (부사절에서는 she)',
        '시제는 주절(met, 과거)과 같아요: was walking',
        '집에 걸어가던 "때"에 친구를 만난 것이므로 접속사는 When(While)이에요.',
      ],
      answer: '**While Jia was walking home**, she met an old friend. (집에 걸어가다가 지아는 옛 친구를 만났어요.)',
    },
  ],

  terms: [
    { term: '분사구문', def: '접속사가 있는 부사절에서 접속사와 같은 주어를 빼고 동사를 분사(-ing)로 바꾼 덩어리예요. 예: Opening the door, I saw a cat.' },
    { term: '부사절', def: 'when, because, while 같은 접속사로 시작해서 때·이유·조건 등을 나타내는 문장 덩어리예요. 예: When I opened the door' },
    { term: '주절', def: '문장의 중심이 되는 덩어리예요. 분사구문이나 부사절이 덧붙는 쪽이에요. 예: Opening the door, **I saw a cat**.' },
    { term: '동시 동작', def: '두 동작이 한꺼번에 일어나는 것이에요. 분사구문으로 "~하면서"라고 나타내요. 예: She waved, smiling.' },
    { term: '접속사', def: '두 문장을 이어 주는 말이에요. 분사구문의 뜻을 풀 때 when(때), because(이유), while(동시 동작) 등을 써요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '다음 문장을 분사구문을 써서 바르게 바꾼 것을 고르세요.\n\nWhen I opened the box, I found a letter.',
      choices: [
        'Opening the box, I found a letter.',
        'Opened the box, I found a letter.',
        'Open the box, I found a letter.',
        'I opening the box, I found a letter.',
      ],
      answer: 0,
      why: [
        '',
        '동사를 과거형(opened)으로 두면 분사구문이 아니에요. -ing로 바꿔요.',
        'Open the box는 "상자를 열어라"라는 명령문이 돼요. 동사를 -ing로 바꿔요.',
        '부사절과 주절의 주어(I)가 같으니 주어를 빼요.',
      ],
      explain: '접속사 When과 같은 주어 I를 빼고, opened를 -ing로 바꿔요. → **Opening the box**, I found a letter. (상자를 열었을 때 나는 편지를 발견했어요.)',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 **한 낱말**을 쓰세요.\n\nWhen he saw the bear, he ran away.\n= [[빈칸]] the bear, he ran away.',
      answer: ['Seeing'],
      wrong: [
        { a: 'Saw', why: '과거형을 그대로 두면 분사구문이 아니에요. 동사를 -ing로 바꿔요.' },
        { a: 'Seen', why: 'seen은 과거분사라서 "보여진"이라는 수동의 뜻이에요. 그가 직접 본 것이니 -ing를 써요.' },
        { a: 'See', why: '동사원형으로 시작하면 명령문처럼 돼요. 동사를 -ing로 바꿔요.' },
      ],
      explain: '접속사 When과 주어 he를 빼고, saw(see의 과거)를 -ing로 바꿔요. → **Seeing** the bear, he ran away. (곰을 보았을 때 그는 달아났어요.)',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: '밑줄 친 부분의 뜻으로 알맞은 것을 고르세요.\n\n__Feeling sick__, Jia stayed home from school.',
      choices: ['몸이 아파서', '몸이 아플 때까지', '몸이 아프지 않게', '몸이 아프기 전에'],
      answer: 0,
      why: [
        '',
        '"~할 때까지"는 until로 나타내요. 이 분사구문은 학교에 안 간 이유예요.',
        '"~하지 않게"는 목적을 나타내는 말이에요. 아픈 것이 집에 있었던 까닭이에요.',
        '분사구문은 "~하기 전에"라는 뜻으로 쓰지 않아요. 아픈 것과 집에 있던 일은 같은 때예요.',
      ],
      explain: '아픈 것이 집에 있었던 **까닭**이에요. "**몸이 아파서** 지아는 학교에 가지 않고 집에 있었어요." (= Because Jia felt sick, she stayed home from school.)',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 3,
      q: 'Tired after the long trip, he went to bed early.\n\n이 문장은 Being tired after the long trip, ~에서 Being을 생략한 분사구문이에요.',
      answer: true,
      explain: '맞아요. Because he was tired after the long trip → Being tired after the long trip → Being을 빼면 **Tired after the long trip**이에요. "긴 여행 뒤에 피곤해서 그는 일찍 잤어요."',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 1,
      q: '다음 문장의 뜻으로 알맞은 것을 고르세요.\n\nSmiling brightly, she waved at us.',
      choices: [
        '그녀는 밝게 웃으면서 우리에게 손을 흔들었어요.',
        '그녀는 밝게 웃기 위해서 우리에게 손을 흔들었어요.',
        '그녀는 밝게 웃었지만 우리에게 손을 흔들지 않았어요.',
        '우리가 밝게 웃자 그녀가 손을 흔들었어요.',
      ],
      answer: 0,
      why: [
        '',
        '"~하기 위해서"(목적)는 to부정사로 나타내요. 웃는 것과 손을 흔드는 것은 동시 동작이에요.',
        '문장에 부정(not)이 없어요. 그녀는 손을 흔들었어요(waved).',
        '분사구문의 주어는 주절의 주어(she)예요. 웃은 사람도 그녀예요.',
      ],
      explain: '웃는 동작과 손을 흔드는 동작이 **동시에** 일어나요. "그녀는 밝게 **웃으면서** 우리에게 손을 흔들었어요."',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 4,
      q: '분사구문을 접속사가 있는 문장으로 바르게 바꾼 것을 고르세요.\n\nWalking to school, I met my teacher.',
      choices: [
        'When I was walking to school, I met my teacher.',
        'When my teacher was walking to school, I met her.',
        'Although I walked to school, I met my teacher.',
        'If I walk to school, I will meet my teacher.',
      ],
      answer: 0,
      why: [
        '',
        '분사구문의 주어는 주절의 주어(I)예요. 학교에 걸어가던 사람은 선생님이 아니라 나예요.',
        'although(~이지만)는 두 일이 반대될 때 써요. 걸어가다가 선생님을 만난 것은 반대되는 일이 아니에요.',
        '주절의 시제가 과거(met)예요. 미래의 조건으로 바꾸면 뜻이 달라져요.',
      ],
      explain: '주어는 주절과 같은 I, 시제는 주절과 같은 과거, 관계는 "~하던 때"예요. → **When I was walking to school**, I met my teacher. (학교에 걸어가다가 나는 선생님을 만났어요.)',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 0,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 **한 낱말**을 쓰세요.\n\nAs she listened to music, she cleaned her room.\n= [[빈칸]] to music, she cleaned her room.',
      answer: ['Listening'],
      wrong: [
        { a: 'Listened', why: '과거형을 그대로 두면 분사구문이 아니에요. 동사를 -ing로 바꿔요.' },
        { a: 'Listen', why: '동사원형으로 시작하면 명령문처럼 돼요. 동사를 -ing로 바꿔요.' },
      ],
      explain: '접속사 As와 주어 she를 빼고, listened를 -ing로 바꿔요. → **Listening** to music, she cleaned her room. (음악을 들으면서 그녀는 방을 청소했어요.)',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 1,
      q: '우리말에 맞게 낱말을 바르게 배열하세요.\n\n음악을 들으면서 나는 숙제를 했어요.',
      choices: ['Listening', 'to music,', 'I', 'did', 'my homework'],
      answer: [0, 1, 2, 3, 4],
      hint: '분사구문을 맨 앞에 두고, 쉼표 뒤에 주절(주어 + 동사)을 써요.',
      explain: '**Listening to music, I did my homework.** 분사구문 Listening to music이 동시 동작("~하면서")을 나타내고, 쉼표 뒤에 주절 I did my homework가 와요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'text', concept: 3,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 **한 낱말**을 쓰세요. (Being은 생략해요.)\n\nBecause he was surprised at the noise, he woke up.\n= [[빈칸]] at the noise, he woke up.',
      answer: ['Surprised'],
      hint: 'was surprised → Being surprised → Being을 빼 보세요.',
      wrong: [
        { a: 'Surprising', why: 'surprising은 "놀라게 하는"이라는 뜻이에요. 그는 놀란 쪽이므로 Being surprised에서 Being을 뺀 Surprised예요.' },
        { a: 'Being surprised', why: '뜻은 맞지만 한 낱말로 쓰라고 했어요. Being은 생략할 수 있어요.' },
        { a: 'Was surprised', why: '분사구문은 be동사를 Being으로 바꾸고, 그 Being을 생략해요.' },
      ],
      explain: 'Because와 he를 빼고 was를 Being으로 바꾸면 Being surprised at the noise예요. Being을 생략하면 **Surprised** at the noise, he woke up.(그 소리에 놀라서 그는 잠에서 깼어요.)',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 접속사를 고르세요.\n\nBeing very hungry, he ate three bowls of rice.\n= [[빈칸]] he was very hungry, he ate three bowls of rice.',
      choices: ['Because', 'Although', 'If', 'Before'],
      answer: 0,
      why: [
        '',
        'although(~이지만)는 반대되는 일을 이어요. 배가 고픈 것과 밥을 많이 먹은 것은 원인과 결과예요.',
        'if(만약 ~하면)는 조건이에요. 이미 배가 고팠고 밥을 먹은 과거의 일이에요.',
        '배가 고픈 것은 밥을 먹기 전의 일이 아니라 밥을 먹은 까닭이에요.',
      ],
      explain: '몹시 배가 고팠던 것이 밥을 세 그릇이나 먹은 **이유**예요. 그래서 **Because**를 써요. "몹시 배가 고파서 그는 밥을 세 그릇 먹었어요."',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 5,
      q: '글을 읽고 물음에 답하세요.\n\nMinji got up late on Monday. Looking at the clock, she jumped out of bed. She ran to the bus stop, holding a piece of toast. Arriving at school, she found the gate closed. Then she remembered something. It was a holiday!\n\n글의 내용과 일치하는 것을 고르세요.',
      choices: [
        '민지는 시계를 보고 침대에서 벌떡 일어났어요.',
        '민지는 토스트를 다 먹은 뒤에 버스 정류장으로 뛰어갔어요.',
        '민지가 학교에 도착했을 때 문이 열려 있었어요.',
        '그날은 학교에 가야 하는 날이었어요.',
      ],
      answer: 0,
      why: [
        '',
        'holding a piece of toast는 토스트를 "든 채로" 뛰었다는 동시 동작이에요. 다 먹은 뒤가 아니에요.',
        'she found the gate closed는 문이 닫혀 있는 것을 보았다는 뜻이에요.',
        '마지막 문장 It was a holiday!에서 그날은 휴일이었어요.',
      ],
      hint: '분사구문마다 "~하면서", "~할 때" 중 어떤 뜻인지 생각하며 읽어 보세요.',
      explain: 'Looking at the clock, she jumped out of bed.는 "시계를 **보고(보았을 때)** 그녀는 침대에서 벌떡 일어났어요"예요. 토스트는 든 채로 뛰었고, 학교 문은 닫혀 있었고, 그날은 휴일이었어요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '다음 중 어법상 **옳지 않은** 문장을 고르세요.',
      choices: [
        'Walking home, the rain started to fall.',
        'Hearing the news, she began to cry.',
        'Tired from work, Dad fell asleep on the sofa.',
        'He sat by the window, reading a comic book.',
      ],
      answer: 0,
      why: [
        '',
        '바른 문장이에요. 소식을 들은 사람과 운 사람이 모두 she예요.',
        '바른 문장이에요. (Being) Tired from work에서 Being이 생략되었고, 피곤한 사람은 Dad예요.',
        '바른 문장이에요. 창가에 앉은 사람과 만화책을 읽은 사람이 모두 he예요(동시 동작).',
      ],
      hint: '분사구문의 주어는 주절의 주어와 같아야 해요. 각 문장에서 "누가 그 동작을 했는지" 따져 보세요.',
      explain: 'Walking home의 주어는 주절의 주어 the rain이 되어 "비가 집에 걸어가다가"라는 이상한 뜻이 돼요. 걸어간 사람을 주절의 주어로 써야 해요: Walking home, **I** got caught in the rain.(집에 걸어가다가 나는 비를 만났어요.) 또는 When I was walking home, the rain started to fall.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 0,
      q: '다음 문장에서 어법상 틀린 낱말 하나를 찾아 바르게 고친 낱말만 쓰세요.\n\nOpened the window, Seojun felt the cool wind.',
      answer: ['Opening'],
      hint: '창문을 연 사람은 서준이예요. 서준이가 직접 한 동작이에요.',
      wrong: [
        { a: 'Opened', why: '틀린 낱말을 그대로 썼어요. 서준이가 직접 창문을 연 것이니 능동의 -ing로 고쳐요.' },
        { a: 'Open', why: '동사원형으로 시작하면 명령문처럼 돼요. 분사구문은 -ing로 시작해요.' },
        { a: 'Being opened', why: 'Being opened는 "열려서"라는 수동의 뜻이에요. 서준이가 직접 창문을 열었어요.' },
      ],
      explain: '서준이가 **직접** 창문을 연 것(능동)이므로 Opened가 아니라 **Opening**이에요. "창문을 열자 서준이는 시원한 바람을 느꼈어요." (Opened로 시작하면 Being opened, 곧 "서준이가 열려서"라는 이상한 뜻이 돼요.)',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말을 고르세요.\n\n[[빈칸]] in easy English, this book is good for beginners.',
      choices: ['Written', 'Writing', 'Wrote', 'Write'],
      answer: 0,
      why: [
        '',
        '책은 직접 쓰는 쪽이 아니라 쓰인 쪽이에요. Writing으로 시작하면 "책이 무언가를 쓰면서"라는 뜻이 돼요.',
        'wrote는 과거형 동사예요. 분사구문은 분사로 시작해요.',
        '동사원형으로 시작하면 명령문처럼 돼요.',
      ],
      hint: '주절의 주어 this book과 write의 관계를 생각해 보세요.',
      explain: 'Because it is written in easy English → (Being) Written in easy English. 책은 쉬운 영어로 **쓰인**(수동) 것이므로 과거분사 **Written**이에요. "쉬운 영어로 쓰여 있어서 이 책은 초보자에게 좋아요."',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 5,
      q: '글을 읽고 물음에 답하세요.\n\nDoyun was walking in the park. Hearing a strange sound, he looked around. A small cat was crying under a bench. Feeling sorry for it, Doyun gave it some water. Then, carrying the cat carefully, he walked to the animal hospital near the park.\n\n도윤이가 고양이에게 물을 준 까닭은 무엇일까요?',
      choices: [
        '고양이가 불쌍하다고 느껴서',
        '이상한 소리가 무서워서',
        '동물 병원에서 그렇게 하라고 해서',
        '공원을 걷다가 목이 말라서',
      ],
      answer: 0,
      why: [
        '',
        '이상한 소리를 듣고 한 일은 주위를 둘러본 것(looked around)이에요.',
        '도윤이는 물을 준 다음에 동물 병원으로 갔어요.',
        '목이 마른 것은 글에 나오지 않아요. 물을 준 까닭은 Feeling sorry for it이에요.',
      ],
      hint: '물을 준 문장 바로 앞의 분사구문을 보세요.',
      explain: 'Feeling sorry for it, Doyun gave it some water.는 "고양이가 **불쌍해서** 도윤이는 물을 주었어요"라는 이유의 분사구문이에요. (= Because Doyun felt sorry for it, he gave it some water.)',
    },
    {
      id: 'a5', level: 3, type: 'order', concept: 4,
      q: '분사구문을 접속사가 있는 문장으로 바꾸어 배열하세요.\n\nArriving at the station, we called Mom.',
      choices: ['When', 'we arrived', 'at the station,', 'we called', 'Mom'],
      answer: [0, 1, 2, 3, 4],
      hint: '주어와 시제는 주절(we called)을 보고 정해요.',
      explain: '**When we arrived at the station, we called Mom.** 주어는 주절과 같은 we, 시제는 주절과 같은 과거(arrived), 관계는 "도착했을 때"라서 When을 써요.',
    },
  ],

  deeper: [
    {
      title: '분사구문은 언제 쓰고, 고등학교에서는 무엇을 더 배울까?',
      body: '분사구문은 주로 **글**(이야기, 설명문, 기사)에서 써요. 같은 내용을 짧고 매끄럽게 이어 주기 때문이에요. 친구와 말할 때는 When I ~, Because I ~처럼 접속사가 있는 문장이 더 자연스러워요.\n\n고등학교 영어에서는 분사구문을 더 넓게 배워요.\n\n- 부정: **Not** knowing the way, ~ (길을 몰라서) — not을 분사 앞에 둬요.\n- 먼저 일어난 일: **Having finished** my homework, ~ (숙제를 끝낸 뒤에)\n- 주어가 다를 때: 분사 앞에 주어를 남기는 꼴\n\n오늘 배운 "접속사와 같은 주어를 빼고 동사를 -ing로"라는 기본 원리가 모두의 출발점이에요.',
    },
  ],

  faq: [
    {
      q: '분사구문은 왜 써요? 접속사를 쓰면 더 쉬운데요.',
      a: '뜻은 같지만 분사구문이 더 짧고 매끄러워요. 이야기 글에서 인물의 행동을 이어서 보여 줄 때 특히 자주 써요. 읽을 때 이해할 수 있으면 충분하고, 쓸 때는 접속사 문장으로 써도 틀리지 않아요.',
    },
    {
      q: '분사구문이 "때"인지 "이유"인지 어떻게 알아요?',
      a: '두 일의 관계를 보세요. 앞의 일이 뒤의 일의 원인이면 이유(~해서), 그냥 그때 일어난 일이면 때(~할 때), 두 동작이 함께 일어나면 동시 동작(~하면서)이에요. 때와 이유가 둘 다 자연스러운 문장도 있는데, 그럴 때는 글의 흐름에 더 잘 맞는 쪽으로 읽으면 돼요.',
    },
    {
      q: 'Tired, he went to bed.처럼 형용사로 시작하는 문장도 분사구문이에요?',
      a: '네. Being tired에서 Being이 생략된 분사구문이에요. 형용사나 과거분사로 시작하고 쉼표가 이어지면 앞에 Being을 넣어 "~해서, ~한 상태로"라고 읽어 보세요.',
    },
  ],

  mistakes: [
    '주어가 다른데 분사구문으로 만드는 실수 — Walking home, the rain started.(✗) 분사구문의 주어는 주절의 주어와 같아야 해요.',
    '동사를 과거형으로 남겨 두는 실수 — Saw the dog, he ran away.(✗) → Seeing the dog, he ran away.',
    '수동의 뜻인데 -ing로 시작하는 실수 — Writing in easy English, this book ~(✗) → (Being) Written in easy English, this book ~',
  ],

  gens: [
    {
      id: 'make-participle-clause',
      level: 1,
      title: '접속사가 있는 문장을 분사구문으로 바꾸기',
      make: function (R) {
        // [접속사, 부사절 주어, 과거형 동사, 나머지, 주절, 원형, -ing, 뜻]
        var items = [
          ['When', 'I', 'opened', 'the door', 'I saw a cat', 'open', 'Opening', '문을 열었을 때 나는 고양이를 보았어요.'],
          ['When', 'she', 'heard', 'the news', 'she called her mom', 'hear', 'Hearing', '그 소식을 들었을 때 그녀는 엄마에게 전화했어요.'],
          ['Because', 'he', 'felt', 'sick', 'he stayed in bed', 'feel', 'Feeling', '몸이 아파서 그는 침대에 누워 있었어요.'],
          ['When', 'we', 'arrived', 'at the station', 'we called Dad', 'arrive', 'Arriving', '역에 도착했을 때 우리는 아빠에게 전화했어요.'],
          ['Because', 'I', 'knew', 'the answer', 'I raised my hand', 'know', 'Knowing', '답을 알아서 나는 손을 들었어요.'],
          ['When', 'he', 'saw', 'the bear', 'he ran away', 'see', 'Seeing', '곰을 보았을 때 그는 달아났어요.'],
          ['As', 'she', 'listened', 'to music', 'she cleaned her room', 'listen', 'Listening', '음악을 들으면서 그녀는 방을 청소했어요.'],
          ['When', 'they', 'entered', 'the room', 'they turned on the light', 'enter', 'Entering', '방에 들어갔을 때 그들은 불을 켰어요.'],
          ['Because', 'she', 'lived', 'near the school', 'she walked to school', 'live', 'Living', '학교 근처에 살아서 그녀는 걸어서 학교에 다녔어요.'],
          ['While', 'I', 'walked', 'along the beach', 'I found a pretty shell', 'walk', 'Walking', '해변을 따라 걷다가 나는 예쁜 조개껍데기를 찾았어요.'],
          ['When', 'he', 'got', 'off the bus', 'he dropped his phone', 'get', 'Getting', '버스에서 내릴 때 그는 휴대 전화를 떨어뜨렸어요.'],
          ['Because', 'we', 'had', 'no umbrella', 'we waited inside', 'have', 'Having', '우산이 없어서 우리는 안에서 기다렸어요.'],
          ['As', 'she', 'sang', 'a song', 'she washed the dishes', 'sing', 'Singing', '노래를 부르면서 그녀는 설거지를 했어요.'],
          ['When', 'I', 'looked', 'out of the window', 'I saw a rainbow', 'look', 'Looking', '창밖을 보았을 때 나는 무지개를 보았어요.'],
          ['Because', 'he', 'wanted', 'a new bike', 'he saved his money', 'want', 'Wanting', '새 자전거를 갖고 싶어서 그는 돈을 모았어요.'],
          ['When', 'she', 'found', 'her lost key', 'she shouted with joy', 'find', 'Finding', '잃어버린 열쇠를 찾았을 때 그녀는 기뻐서 소리쳤어요.'],
          ['As', 'they', 'talked', 'about the movie', 'they walked home', 'talk', 'Talking', '그 영화에 대해 이야기하면서 그들은 집으로 걸어갔어요.'],
        ];
        var it = R.pick(items);
        var cap = function (w) { return w.charAt(0).toUpperCase() + w.slice(1); };
        var rest = ' ' + it[3] + ', ' + it[4] + '.';
        var original = it[0] + ' ' + it[1] + ' ' + it[2] + ' ' + it[3] + ', ' + it[4] + '.';
        var correct = it[6] + rest;
        var cands = [
          [cap(it[2]) + rest, '동사를 과거형으로 두면 분사구문이 아니에요. 동사를 -ing로 바꿔요.'],
          [cap(it[5]) + rest, '동사원형으로 시작하면 명령문처럼 돼요. 동사를 -ing로 바꿔요.'],
          [cap(it[1]) + ' ' + it[6].toLowerCase() + rest, '부사절과 주절의 주어가 같으니 주어도 빼요.'],
          [it[0] + ' ' + it[1] + ' ' + it[6].toLowerCase() + rest, '접속사와 주어를 그대로 두고 동사만 -ing로 바꾸면 틀린 문장이 돼요. 접속사와 같은 주어를 빼요.'],
        ];
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }), 4);
        return {
          type: 'choice', concept: 0,
          q: '다음 문장을 분사구문을 써서 바르게 바꾼 것을 고르세요.\n\n' + original,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: '접속사 ' + it[0] + ', 주절과 같은 주어 ' + it[1] + ' 두 가지를 빼고, 동사 ' + it[2] + ' 대신 -ing 꼴을 써요(' + it[5] + ' → ' + it[6].toLowerCase() + ').\n\n**' + correct + '**\n(' + it[7] + ')',
        };
      },
    },
    {
      id: 'participle-meaning',
      level: 2,
      title: '분사구문의 뜻에 맞는 접속사 고르기',
      make: function (R) {
        // [분사구문 문장, 알맞은 접속사, 접속사 뒤 부사절(접속사 뺀 것), 주절, 관계, 뜻]
        var items = [
          ['Arriving at the station, we called Mom.', 'When', 'we arrived at the station', 'we called Mom', '때', '역에 도착했을 때 우리는 엄마에게 전화했어요.'],
          ['Opening the door, I found a box on the floor.', 'When', 'I opened the door', 'I found a box on the floor', '때', '문을 열었을 때 나는 바닥에 있는 상자를 발견했어요.'],
          ['Entering the room, he turned on the light.', 'When', 'he entered the room', 'he turned on the light', '때', '방에 들어갔을 때 그는 불을 켰어요.'],
          ['Looking out of the window, Jia saw a rainbow.', 'When', 'she looked out of the window', 'Jia saw a rainbow', '때', '창밖을 보았을 때 지아는 무지개를 보았어요.'],
          ['Feeling sick, Minsu stayed home.', 'Because', 'he felt sick', 'Minsu stayed home', '이유', '몸이 아파서 민수는 집에 있었어요.'],
          ['Knowing the answer, Seojun raised his hand.', 'Because', 'he knew the answer', 'Seojun raised his hand', '이유', '답을 알아서 서준이는 손을 들었어요.'],
          ['Being very tired, she went to bed early.', 'Because', 'she was very tired', 'she went to bed early', '이유', '몹시 피곤해서 그녀는 일찍 잤어요.'],
          ['Having no umbrella, we waited inside.', 'Because', 'we had no umbrella', 'we waited inside', '이유', '우산이 없어서 우리는 안에서 기다렸어요.'],
          ['Living near the school, Hayun walked to school every day.', 'Because', 'she lived near the school', 'Hayun walked to school every day', '이유', '학교 근처에 살아서 하윤이는 날마다 걸어서 학교에 갔어요.'],
          ['Listening to music, I cleaned my room.', 'While', 'I was listening to music', 'I cleaned my room', '동시 동작', '음악을 들으면서 나는 방을 청소했어요.'],
          ['Singing a song, Doyun washed the dishes.', 'While', 'he was singing a song', 'Doyun washed the dishes', '동시 동작', '노래를 부르면서 도윤이는 설거지를 했어요.'],
          ['Talking about the movie, they walked home.', 'While', 'they were talking about the movie', 'they walked home', '동시 동작', '그 영화에 대해 이야기하면서 그들은 집으로 걸어갔어요.'],
          ['Eating popcorn, we watched the game.', 'While', 'we were eating popcorn', 'we watched the game', '동시 동작', '팝콘을 먹으면서 우리는 경기를 보았어요.'],
        ];
        var it = R.pick(items);
        var ans = it[1];
        var reason = {
          Although: 'although(~이지만)는 서로 반대되는 일을 이어요. 두 일은 반대되는 관계가 아니에요.',
          If: 'if(만약 ~하면)는 아직 일어나지 않은 조건을 말해요. 이 문장은 이미 일어난 과거의 일이에요.',
        };
        var pick = R.choices(ans, ['Although', 'If'], 3);
        var meaning = { '때': '"~할 때"(때)', '이유': '"~해서"(이유)', '동시 동작': '"~하면서"(동시 동작)' }[it[4]];
        var rewritten = '[[빈칸]] ' + it[2] + ', ' + it[3] + '.';
        return {
          type: 'choice', concept: 4,
          q: '두 문장의 뜻이 같도록 빈칸에 알맞은 접속사를 고르세요.\n\n' + it[0] + '\n= ' + rewritten,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === ans ? '' : reason[c]; }),
          explain: '분사구문이 ' + meaning + '의 뜻이에요. 그래서 알맞은 접속사: **' + ans + '**\n\n' + rewritten.replace('[[빈칸]]', '**' + ans + '**') + '\n(' + it[5] + ')',
        };
      },
    },
  ],

  vocab: [
    { w: 'enter', m: '들어가다', ex: 'Entering the room, she said hello.', exm: '방에 들어가면서 그녀는 인사를 했어요.' },
    { w: 'notice', m: '알아차리다', ex: 'I noticed a strange sound.', exm: '나는 이상한 소리를 알아차렸어요.' },
    { w: 'remember', m: '기억하다, 생각해 내다', ex: 'Then she remembered her homework.', exm: '그때 그녀는 숙제가 생각났어요.' },
    { w: 'wave', m: '손을 흔들다', ex: 'He waved at me, smiling.', exm: '그는 웃으면서 나에게 손을 흔들었어요.' },
    { w: 'shout', m: '소리치다', ex: 'Seeing the bus, he shouted, "Wait!"', exm: '버스를 보고 그는 "기다려요!"라고 소리쳤어요.' },
    { w: 'strange', m: '이상한', ex: 'We heard a strange noise at night.', exm: '우리는 밤에 이상한 소리를 들었어요.' },
    { w: 'noise', m: '소리, 소음', ex: 'Surprised at the noise, the baby cried.', exm: '그 소리에 놀라서 아기가 울었어요.' },
    { w: 'gate', m: '정문, 대문', ex: 'The school gate was closed.', exm: '학교 정문이 닫혀 있었어요.' },
    { w: 'holiday', m: '휴일, 공휴일', ex: 'Monday was a holiday.', exm: '월요일은 휴일이었어요.' },
    { w: 'hurry', m: '서두르다', ex: 'Hurrying to school, I dropped my bag.', exm: '학교에 서둘러 가다가 나는 가방을 떨어뜨렸어요.' },
    { w: 'carefully', m: '조심스럽게', ex: 'She carried the cake carefully.', exm: '그녀는 케이크를 조심스럽게 옮겼어요.' },
    { w: 'sorry', m: '불쌍한, 안된; 미안한', ex: 'I felt sorry for the lost puppy.', exm: '나는 길 잃은 강아지가 불쌍했어요.' },
    { w: 'tired', m: '피곤한', ex: 'Tired after school, he took a nap.', exm: '학교를 마치고 피곤해서 그는 낮잠을 잤어요.' },
    { w: 'raise', m: '들어 올리다', ex: 'Knowing the answer, she raised her hand.', exm: '답을 알아서 그녀는 손을 들었어요.' },
  ],
});
