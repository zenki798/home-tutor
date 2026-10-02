/* 중3 영어 · 이어 온 일 말하기 (완료 시제 심화) */
Tutor.registerUnit({
  id: 'eng-m3-02',
  course: 'eng-m3',
  title: '이어 온 일 말하기 (완료 시제 심화)',
  summary: '현재완료진행형으로 지금까지 이어 온 일을, 과거완료로 과거보다 먼저 일어난 일을 나타내요.',
  goals: [
    '현재완료진행형(have/has been + -ing)으로 지금까지 이어 온 동작을 말할 수 있어요.',
    'How long have you been ~ing?로 묻고 for·since로 답할 수 있어요.',
    '과거완료(had + 과거분사)로 과거의 어느 때보다 먼저 일어난 일을 나타낼 수 있어요.',
    '이야기 글에서 사건이 일어난 앞뒤 순서를 파악할 수 있어요.',
  ],
  standards: ['[9영01-04]', '[9영02-04]', '[9영02-05]'],

  concepts: [
    {
      title: '현재완료진행형: have/has been + -ing',
      body: '과거에 시작한 동작이 **지금까지 쭉 이어지고 있을 때** **현재완료진행형**을 써요.\n\n> 💡 형태: **have / has + been + 동사-ing** — "(지금까지) 계속 ~해 오고 있다"\n\n- I **have been waiting** for you for an hour. (나는 한 시간 동안 너를 기다리고 있어.)\n- It **has been raining** since this morning. (아침부터 계속 비가 오고 있어요.)\n\n주어가 3인칭 단수(he, she, it, Minsu …)이면 **has**, 나머지는 **have**예요. 줄여서 I\'ve been, she\'s been이라고도 해요.\n\n중2에서 배운 현재완료(have + 과거분사)의 "계속" 뜻과 비슷하지만, 현재완료진행형은 **동작이 지금도 진행 중**이라는 느낌을 더 살려 줘요.\n\n> ⚠️ know, like, have(가지다), want처럼 **상태**를 나타내는 동사는 진행형으로 쓰지 않아요. 이때는 현재완료를 써요: I **have known** him for five years. (I have been knowing ✗)',
      easy: '아침 9시에 비가 오기 시작해서 지금(12시)도 오고 있다고 생각해 보세요.\n\n- 9시: 시작 → 12시(지금): 아직 오는 중\n\n이렇게 "그때부터 지금까지 쭉 ~하는 중"이 현재완료진행형이에요. **have(has)**는 "지금까지", **been + -ing**는 "계속하는 중"이라고 나누어 기억하면 쉬워요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nShe [[빈칸]] the piano for two hours.',
        choices: ['has been playing', 'have been playing', 'has been play'],
        answer: 0,
        why: [
          '',
          '주어 She는 3인칭 단수라서 have가 아니라 has를 써요.',
          'been 뒤에는 동사원형이 아니라 -ing형이 와요: been playing',
        ],
        explain: '3인칭 단수 주어이므로 **has been + -ing**를 써요. She has been playing the piano for two hours.(그녀는 두 시간 동안 피아노를 치고 있어요.)',
      },
    },
    {
      title: 'How long ~?과 for · since',
      body: '어떤 일을 얼마나 오래 해 왔는지 물을 때는 **How long have(has) + 주어 + been + -ing?**로 물어요.\n\n- A: **How long have you been learning** taekwondo? (태권도를 얼마나 오래 배워 왔니?)\n- B: I\'ve been learning it **for three years**. / **Since I was ten**.\n\n답할 때 쓰는 **for**와 **since**는 뒤에 오는 말이 달라요.\n\n| | 뜻 | 뒤에 오는 말 | 예 |\n|---|---|---|---|\n| **for** | ~ 동안 | **기간**(얼마 동안) | for two hours, for a week, for a long time |\n| **since** | ~ 이후로, ~부터 | **시작한 때**(언제부터) | since 2020, since last Monday, since this morning, since I was ten |\n\n> ⚠️ since 뒤에 기간을 쓰지 않아요: since three years(✗) → for three years',
      easy: '자를 떠올려 보세요.\n\n- **since**는 자의 **눈금 하나**(출발점)를 가리켜요: "2020년부터", "월요일부터"\n- **for**는 자로 잰 **길이**를 말해요: "3년 동안", "두 시간 동안"\n\n"언제부터?"에 답하면 since, "얼마 동안?"에 답하면 for예요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nI have been learning the guitar [[빈칸]] 2022.',
        choices: ['since', 'for', 'ago'],
        answer: 0,
        why: [
          '',
          'for 뒤에는 기간(three years처럼 "얼마 동안")이 와요. 2022는 시작한 때예요.',
          'ago는 "~ 전에"라는 뜻으로 과거시제와 쓰고, 2022 같은 연도 앞에 오지 않아요.',
        ],
        explain: '2022는 기타를 배우기 시작한 **때**이므로 **since**를 써요. "나는 2022년부터 기타를 배워 오고 있어요."',
      },
    },
    {
      title: '과거완료: had + 과거분사',
      body: '과거의 어느 때를 기준으로, **그보다 먼저** 일어난 일을 말할 때 **과거완료**를 써요.\n\n> 💡 형태: **had + 과거분사** — 주어가 무엇이든 늘 **had**예요.\n\n- When I got home, my brother **had eaten** all the cookies.\n  (내가 집에 왔을 때, 남동생은 쿠키를 다 먹어 버린 뒤였어요.)\n\n기준이 되는 때는 "내가 집에 온" 과거예요. 쿠키를 먹은 일은 그보다 **더 먼저**라서 had eaten으로 써요.\n\n| 시제 | 기준 시점 | 형태 |\n|---|---|---|\n| 현재완료 | 지금 | have / has + 과거분사 |\n| 과거완료 | 과거의 어느 때 | had + 과거분사 |\n\n줄여서 I\'d, she\'d처럼 쓰기도 해요. 부정은 had not(hadn\'t) + 과거분사예요.',
      easy: '과거완료는 "**한 칸 더 과거**"예요.\n\n시간을 줄로 그려 보세요. 맨 오른쪽이 지금, 그 왼쪽에 "내가 집에 온 때(과거)", 그보다 더 왼쪽에 "동생이 쿠키를 먹은 때(더 과거)"가 있어요.\n\n더 왼쪽에 있는 일, 곧 먼저 일어난 일에 had를 붙여요.',
      check: {
        type: 'ox',
        q: '과거완료는 주어가 3인칭 단수이면 has + 과거분사로 써요.',
        answer: false,
        explain: 'has + 과거분사는 현재완료예요. 과거완료는 주어와 상관없이 늘 **had + 과거분사**예요. 예: She **had** finished her homework.',
      },
    },
    {
      title: '두 사건의 순서: 과거완료와 과거',
      body: '과거에 일어난 두 일 가운데 **먼저 일어난 일은 과거완료**, **나중에 일어난 일은 과거**로 써서 순서를 분명히 할 수 있어요.\n\n- When I arrived, the bus **had left**. (내가 도착했을 때, 버스는 이미 떠나 버렸어요.)\n  → 버스가 떠남(먼저) → 내가 도착함(나중). 그래서 버스를 놓쳤어요.\n- When I arrived, the bus **left**. (내가 도착하자, 버스가 떠났어요.)\n  → 내가 도착함 → 그때 버스가 떠남. 거의 같은 때의 일이에요.\n\n동사 하나(had left / left)만 바뀌었는데 이야기가 달라졌지요.\n\n> 💡 already(이미)는 과거완료와 자주 함께 써요: The movie **had already started**.\n\n> 💡 before·after처럼 순서를 밝혀 주는 말이 있으면 과거시제만 써도 순서가 분명해요. 그래도 먼저 일어난 일에 과거완료를 쓸 수 있어요.',
      easy: '"버스 정류장에 갔더니 버스가 **떠나고 없었다**"와 "도착하자마자 버스가 **떠났다**"의 차이예요.\n\n앞의 경우 버스는 내가 오기 **전에** 이미 떠났어요. 이렇게 "와 보니 벌써 ~해 있었다"는 느낌일 때 had + 과거분사를 써요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nWhen I got to the theater, the movie [[빈칸]]. So I missed the beginning.',
        choices: ['had already started', 'has already started', 'already starts'],
        answer: 0,
        why: [
          '',
          '현재완료는 지금을 기준으로 해요. 기준이 과거(극장에 도착한 때)이므로 had를 써요.',
          '현재형이라 과거 이야기와 맞지 않아요. 영화는 내가 도착하기 전에 시작했어요.',
        ],
        explain: '영화가 시작한 일이 극장에 도착한 일(과거)보다 **먼저**이므로 과거완료 **had already started**를 써요. 그래서 앞부분을 놓쳤어요.',
      },
    },
    {
      title: '이야기 글에서 사건의 앞뒤 관계 파악하기',
      body: '이야기 글은 일어난 순서대로만 쓰지 않아요. 앞서 일어난 일을 나중에 떠올려 말할 때 **had + 과거분사**가 나와요. 그래서 이야기를 읽을 때는 이렇게 해 보세요.\n\n1. 과거시제 동사로 이야기의 **기준 흐름**을 잡아요.\n2. **had + 과거분사**를 찾아 "이 일은 그보다 **먼저**"라고 표시해요.\n3. 사건을 시간 순서대로 다시 늘어놓아요.\n\n예시 글 (직접 쓴 글)\n\n> Jiwoo opened the box and smiled. Her grandpa **had sent** it from Jeju. Inside, there were oranges that he **had grown** himself.\n\n글에 나온 순서: 상자를 열었다 → 할아버지가 보냈다 → 할아버지가 길렀다\n실제 순서: 할아버지가 귤을 **길렀다** → 상자를 **보냈다** → 지우가 상자를 **열었다**',
      easy: '이야기 속 had는 "**잠깐, 그 전에 있었던 일인데요**" 하고 끼어드는 신호예요.\n\n영화에서 화면이 흐려지며 옛날 장면이 나오는 것(회상 장면)과 비슷해요. had를 보면 "아, 이건 더 옛날 일이구나" 하고 시간 줄의 앞쪽에 놓으면 돼요.',
      check: {
        type: 'choice',
        q: '글을 읽고 물음에 답하세요.\n\nWhen Minho woke up, his mom had already made breakfast.\n\n두 일 가운데 먼저 일어난 일은 무엇일까요?',
        choices: ['엄마가 아침을 만든 일', '민호가 잠에서 깬 일', '두 일이 동시에 일어났어요'],
        answer: 0,
        why: [
          '',
          'woke up은 과거, had made는 과거완료예요. 과거완료로 쓴 일이 더 먼저예요.',
          'had already made(이미 만들어 두었다)는 민호가 깨기 전에 끝난 일이에요.',
        ],
        explain: 'had already made가 과거완료이므로 엄마가 아침을 만든 일이 **먼저**예요. 민호가 깼을 때는 아침이 이미 다 되어 있었어요.',
      },
    },
  ],

  examples: [
    {
      q: '두 문장을 현재완료진행형을 써서 한 문장으로 나타내세요.\n\nJia started cleaning her room at 2 o\'clock. She is still cleaning it now.',
      steps: [
        '2시에 시작한 동작(cleaning)이 지금도 이어지고 있으니 현재완료진행형을 써요.',
        '주어 Jia는 3인칭 단수라서 **has been + -ing**: has been cleaning',
        '2 o\'clock은 시작한 때이므로 since를 써요: since 2 o\'clock',
      ],
      answer: 'Jia **has been cleaning** her room **since** 2 o\'clock.',
    },
    {
      q: '두 일 가운데 먼저 일어난 일을 과거완료로 써서 한 문장으로 나타내세요.\n\n(먼저) The concert started. → (나중에) We arrived at the hall.',
      steps: [
        '기준이 되는 나중 일(우리가 도착함)은 과거시제로 써요: When we arrived at the hall,',
        '먼저 일어난 일(콘서트가 시작함)은 과거완료 had + 과거분사로 써요: the concert had started',
        '"이미"를 넣으면 뜻이 더 분명해져요: had already started',
      ],
      answer: 'When we arrived at the hall, the concert **had (already) started**.',
    },
  ],

  terms: [
    { term: '현재완료진행형', def: 'have/has been + -ing 꼴로, 과거에 시작한 동작이 지금까지 계속되고 있음을 나타내요. 예: I have been reading for an hour.' },
    { term: '과거완료', def: 'had + 과거분사 꼴로, 과거의 어느 때보다 먼저 일어난 일을 나타내요. 예: When I arrived, the bus had left.' },
    { term: 'for', def: '"~ 동안"이라는 뜻으로 뒤에 기간이 와요. 예: for two years, for a week' },
    { term: 'since', def: '"~ 이후로, ~부터"라는 뜻으로 뒤에 시작한 때가 와요. 예: since 2020, since last Monday, since I was ten' },
    { term: '과거분사', def: '동사의 세 번째 모양이에요. 규칙 동사는 -ed(played), 불규칙 동사는 따로 외워요(go - went - gone, eat - ate - eaten).' },
    { term: '상태동사', def: 'know, like, have(가지다), want처럼 동작이 아닌 상태를 나타내는 동사예요. 진행형으로 잘 쓰지 않아요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nThey [[빈칸]] soccer since 3 o\'clock.',
      choices: ['have been playing', 'has been playing', 'are been playing', 'have been play'],
      answer: 0,
      why: [
        '',
        '주어 They는 복수라서 has가 아니라 have를 써요.',
        '현재완료진행형은 are가 아니라 have(has) + been + -ing예요.',
        'been 뒤에는 동사원형이 아니라 -ing형이 와요.',
      ],
      explain: '3시부터 지금까지 계속하고 있는 일이므로 현재완료진행형이고, 주어가 복수이므로 **have been playing**이에요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
      q: '빈칸에 for와 since 가운데 알맞은 말을 쓰세요.\n\nWe have been living here [[빈칸]] five years.',
      answer: ['for'],
      wrong: [{ a: 'since', why: 'since 뒤에는 시작한 때가 와요. five years는 "얼마 동안"을 나타내는 기간이라 for를 써요.' }],
      explain: 'five years(5년)는 기간이므로 **for**를 써요. "우리는 5년 동안 여기에서 살아 오고 있어요."',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 1,
      q: '빈칸에 for와 since 가운데 알맞은 말을 쓰세요.\n\nIt has been snowing [[빈칸]] last night.',
      answer: ['since'],
      wrong: [{ a: 'for', why: 'for 뒤에는 기간이 와요. last night(어젯밤)은 눈이 오기 시작한 때라서 since를 써요.' }],
      explain: 'last night(어젯밤)은 시작한 때이므로 **since**를 써요. "어젯밤부터 계속 눈이 오고 있어요."',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 0,
      q: 'I have been knowing Seojun for ten years.는 바른 문장이에요.',
      answer: false,
      explain: 'know(알다)는 상태를 나타내는 동사라서 진행형으로 쓰지 않아요. 현재완료로 써서 I **have known** Seojun for ten years.(나는 서준이를 10년 동안 알아 왔어요.)라고 해요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르세요.\n\nWhen we got to the station, the train had already [[빈칸]].',
      choices: ['left', 'leave', 'leaving', 'leaved'],
      answer: 0,
      why: [
        '',
        'had 뒤에는 동사원형이 아니라 과거분사가 와요.',
        'had 뒤에 -ing형을 쓰면 과거완료가 되지 않아요.',
        'leave는 불규칙 동사예요: leave - left - left',
      ],
      explain: '과거완료는 had + 과거분사예요. leave의 과거분사는 **left**예요. "우리가 역에 도착했을 때 기차는 이미 떠나 버렸어요."',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '다음 문장에서 **먼저** 일어난 일을 고르세요.\n\nWhen Mom came home, I had cleaned my room.',
      choices: ['내가 방을 청소한 일', '엄마가 집에 오신 일', '엄마가 방을 청소한 일'],
      answer: 0,
      why: [
        '',
        'came은 과거, had cleaned는 과거완료예요. 과거완료로 쓴 일이 먼저예요.',
        '방을 청소한 사람은 엄마가 아니라 "나(I)"예요.',
      ],
      explain: 'had cleaned가 과거완료이므로 내가 방을 청소한 일이 **먼저**예요. 엄마가 오셨을 때 방은 이미 깨끗했어요.',
    },
    {
      id: 'p7', level: 2, type: 'short', check: 'text', concept: 2,
      q: '괄호 안의 동사를 **과거완료**로 바꾸어 빈칸에 쓰세요.\n\nSeojun wasn\'t hungry at lunch because he [[빈칸]] a big breakfast. (eat)',
      answer: ['had eaten'],
      hint: '과거완료는 had + 과거분사예요. eat의 과거분사를 떠올려 보세요.',
      wrong: [
        { a: 'had ate', why: 'ate는 과거형이에요. had 뒤에는 과거분사 eaten을 써요.' },
        { a: 'has eaten', why: 'has eaten은 현재완료예요. 기준이 과거(점심때)이므로 had를 써요.' },
        { a: 'ate', why: '과거완료로 바꾸라고 했어요. 아침을 먹은 일이 점심때보다 먼저이므로 had eaten이에요.' },
      ],
      explain: '아침을 많이 먹은 일이 점심때(과거)보다 먼저이므로 과거완료 **had eaten**이에요. eat - ate - eaten',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 1,
      q: '우리말에 맞게 낱말을 바르게 배열하세요.\n\n너는 얼마나 오랫동안 버스를 기다리고 있었니?',
      choices: ['How long', 'have', 'you', 'been waiting', 'for the bus'],
      answer: [0, 1, 2, 3, 4],
      hint: '의문문이므로 have가 주어 앞으로 나와요.',
      explain: '**How long have you been waiting for the bus?** How long + have + 주어 + been + -ing 순서예요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 1,
      q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: How long have you been learning Chinese?\nB: [[빈칸]]',
      choices: ['For two years.', 'Two years ago.', 'Since two years.', 'I learned it yesterday.'],
      answer: 0,
      why: [
        '',
        'ago는 "~ 전에"로 한 번 일어난 때를 말해요. 얼마 동안 해 왔는지 묻는 말에는 for + 기간으로 답해요.',
        'since 뒤에는 기간이 아니라 시작한 때가 와요.',
        '얼마 동안 배워 왔는지 물었는데 언제 배웠는지로 답했어요.',
      ],
      explain: 'How long ~?은 "얼마 동안"을 묻는 말이에요. **For two years.**(2년 동안이요.)가 알맞아요. Since I was twelve.(열두 살 때부터요.)처럼 since + 시작한 때로 답해도 돼요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '두 문장의 차이를 바르게 설명한 것을 고르세요.\n\n(A) When I arrived, the bus had left.\n(B) When I arrived, the bus left.',
      choices: [
        '(A)에서는 내가 도착하기 전에 버스가 이미 떠났어요.',
        '(B)에서는 내가 도착하기 전에 버스가 이미 떠났어요.',
        '(A)와 (B)는 뜻이 완전히 같아요.',
        '(A)에서는 내가 도착한 뒤 한참 있다가 버스가 떠났어요.',
      ],
      answer: 0,
      why: [
        '',
        '(B)의 left는 과거시제예요. 내가 도착한 그때 버스가 떠난 거예요.',
        'had left와 left는 사건의 순서가 달라요.',
        'had left는 내가 도착한 때보다 먼저 떠났다는 뜻이에요.',
      ],
      hint: 'had + 과거분사는 기준이 되는 과거보다 먼저 일어난 일이에요.',
      explain: '(A)의 had left는 과거완료라서 버스가 **먼저** 떠났고, 나는 버스를 놓쳤어요. (B)는 내가 도착하자 그때 버스가 떠났다는 뜻이에요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '글을 읽고 물음에 답하세요.\n\nYuna was very excited on the morning of the school festival. She had practiced her dance for a month. But when she got to school, she found that she had left her dance shoes at home. Her friend Jiho, who lived near the school, ran home and brought his sister\'s shoes for her.\n\n글의 내용과 일치하는 것을 고르세요.',
      choices: [
        '유나는 학교에 도착하기 전에 춤 신발을 집에 두고 왔어요.',
        '유나는 축제 날 아침에 처음으로 춤 연습을 시작했어요.',
        '지호는 유나의 집에 가서 신발을 가져왔어요.',
        '유나는 신발을 학교에 두고 집에 갔어요.',
      ],
      answer: 0,
      why: [
        '',
        'had practiced ~ for a month는 축제 전에 한 달 동안 연습해 왔다는 뜻이에요.',
        '지호는 자기 집에 가서 누나(여동생)의 신발을 가져왔어요.',
        'had left her dance shoes at home은 신발을 집에 두고 왔다는 뜻이에요.',
      ],
      hint: 'had + 과거분사로 쓴 일은 학교에 도착한 일보다 먼저예요.',
      explain: 'she had left her dance shoes at home은 학교에 도착하기 **전에** 신발을 집에 두고 왔다는 뜻이에요. 그래서 학교에 와서야 그 사실을 알게 되었어요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'order', concept: 4,
      q: '글을 읽고, 일이 실제로 일어난 순서대로 놓으세요.\n\nLast Sunday, Doyun took his new kite to the park. His uncle had given it to him on his birthday last month. But when he arrived at the park, the wind had stopped. He waited for an hour, and then he went home and read a book.',
      choices: [
        '삼촌이 도윤이에게 연을 선물했어요.',
        '바람이 멈췄어요.',
        '도윤이가 공원에 도착했어요.',
        '도윤이가 한 시간 동안 기다렸어요.',
        '도윤이가 집에 가서 책을 읽었어요.',
      ],
      answer: [0, 1, 2, 3, 4],
      hint: 'had given, had stopped는 각각 어느 일보다 먼저인지 생각해 보세요.',
      explain: 'had given(생일에 선물함)은 공원에 간 일요일보다 먼저, had stopped(바람이 멈춤)는 공원에 도착한 일보다 먼저예요. 그다음은 과거시제 순서대로: 도착했다 → 한 시간 기다렸다 → 집에 가서 책을 읽었다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: '두 문장을 한 문장으로 바르게 나타낸 것을 고르세요.\n\nMinsu started reading the book two hours ago. He is still reading it.',
      choices: [
        'Minsu has been reading the book for two hours.',
        'Minsu has been reading the book since two hours.',
        'Minsu had been reading the book two hours ago.',
        'Minsu is reading the book for two hours.',
      ],
      answer: 0,
      why: [
        '',
        'two hours는 기간이라 since가 아니라 for를 써요.',
        '지금도 읽고 있으니 기준은 현재예요. 또 ago는 완료 시제와 함께 쓰지 않아요.',
        '현재진행형만으로는 "두 시간 동안 이어 왔다"를 나타내지 못해요.',
      ],
      hint: '두 시간 전에 시작해서 지금도 하고 있는 일이에요.',
      explain: '과거에 시작해 지금까지 이어지는 동작이므로 현재완료진행형 has been reading을 쓰고, 기간 two hours 앞에는 for를 써요. → **Minsu has been reading the book for two hours.**',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'text', concept: 2,
      q: '다음 문장에서 어법상 틀린 낱말 하나를 찾아 바르게 고친 낱말만 쓰세요.\n\nYesterday I lost the umbrella that my dad has bought for me the week before.',
      answer: ['had'],
      hint: '우산을 산 일은 어제 잃어버린 일보다 먼저예요.',
      wrong: [
        { a: 'have', why: 'have bought도 현재완료예요. 기준이 과거(어제)이므로 had를 써요.' },
        { a: 'lose', why: 'lost(잃어버렸다)는 어제 일이니 과거형이 맞아요. 틀린 곳은 has예요.' },
      ],
      explain: '아빠가 우산을 사 주신 일은 어제 잃어버린 일보다 **먼저**예요. 그래서 현재완료 has bought가 아니라 과거완료 **had** bought로 고쳐요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 1,
      q: '다음 중 어법상 **옳지 않은** 문장을 고르세요.',
      choices: [
        'We have been waiting for you since an hour.',
        'She has been studying since this morning.',
        'I have known him since I was five.',
        'When I woke up, my brother had already gone out.',
      ],
      answer: 0,
      why: [
        '',
        '바른 문장이에요. this morning은 시작한 때라서 since를 써요.',
        '바른 문장이에요. know는 상태동사라서 진행형 대신 현재완료를 썼어요.',
        '바른 문장이에요. 형이 나간 일이 내가 깬 일보다 먼저라서 과거완료를 썼어요.',
      ],
      hint: 'since 뒤에 기간이 온 문장을 찾아보세요.',
      explain: 'an hour(한 시간)는 기간이므로 since가 아니라 for를 써야 해요: We have been waiting for you **for** an hour.',
    },
  ],

  deeper: [
    {
      title: '시제를 시간 줄 위에 놓아 보기',
      body: '지금까지 배운 시제를 시간 줄에 놓으면 한눈에 정리돼요.\n\n| 시제 | 기준 | 뜻 | 예 |\n|---|---|---|---|\n| 과거 | 과거의 한때 | 그때 ~했다 | I **lost** my key. |\n| 과거완료 | 과거의 한때 | 그때보다 먼저 ~했다 | I **had lost** my key before the trip. |\n| 현재완료 | 지금 | 지금까지 ~했다(경험·완료·계속·결과) | I **have lost** my key. (그래서 지금 없다) |\n| 현재완료진행 | 지금 | 지금까지 계속 ~하는 중 | I **have been looking** for my key all day. |\n\n고등학교에서는 과거완료진행형(had been + -ing: 과거의 어느 때까지 계속하던 동작)과 같은 더 다양한 시제를 배워요.',
    },
  ],

  faq: [
    {
      q: '현재완료랑 현재완료진행형은 뭐가 달라요?',
      a: 'I have lived here for five years.와 I have been living here for five years.는 뜻이 거의 같아요. 다만 현재완료진행형은 "지금도 그 동작을 하고 있다"는 느낌을 더 강하게 줘요.\n\n또 know, like처럼 상태를 나타내는 동사는 진행형으로 쓰지 않으니 현재완료로만 써요.',
    },
    {
      q: '과거완료는 꼭 써야 해요? 그냥 과거로 쓰면 안 돼요?',
      a: 'after, before처럼 순서를 알려 주는 말이 있으면 과거시제만 써도 돼요. 예: I went out after I finished my homework.\n\n하지만 When I arrived, the bus had left.처럼 순서를 동사로만 나타낼 때는 과거완료를 써야 뜻이 분명해요. left로 쓰면 "도착하자 그때 떠났다"는 다른 뜻이 돼요.',
    },
    {
      q: 'since 뒤에 문장이 와도 돼요?',
      a: '네. since 뒤에는 시작한 때를 나타내는 말이 오는데, 문장(주어 + 과거시제 동사)도 올 수 있어요. 예: I have lived in Daegu since I was born.(나는 태어났을 때부터 대구에 살아 왔어요.)',
    },
  ],

  mistakes: [
    'since 뒤에 기간을 쓰는 실수 — since three years(✗). 기간에는 for, 시작한 때에는 since예요.',
    '과거완료에 has를 쓰는 실수 — 과거완료는 주어와 상관없이 늘 had + 과거분사예요.',
    '상태동사를 진행형으로 쓰는 실수 — I have been knowing him(✗) → I have known him.',
  ],

  gens: [
    {
      id: 'for-since',
      level: 1,
      title: 'for와 since 고르기',
      make: function (R) {
        // [문장 앞부분, 뜻]
        var acts = [
          ['I have been studying English', '나는 영어를 공부해 오고 있어요'],
          ['Minsu has been playing computer games', '민수는 컴퓨터 게임을 하고 있어요'],
          ['We have been waiting for the bus', '우리는 버스를 기다리고 있어요'],
          ['It has been raining', '비가 계속 오고 있어요'],
          ['Jia has been practicing the violin', '지아는 바이올린을 연습해 오고 있어요'],
          ['They have been working on the project', '그들은 그 과제를 해 오고 있어요'],
          ['My dad has been cooking', '아빠는 요리를 하고 계세요'],
          ['Seojun has been learning taekwondo', '서준이는 태권도를 배워 오고 있어요'],
        ];
        // [시간 표현, for/since, 뜻]
        var times = [
          ['two hours', 'for', '두 시간 동안'], ['three years', 'for', '3년 동안'], ['a long time', 'for', '오랫동안'],
          ['ten minutes', 'for', '10분 동안'], ['five days', 'for', '닷새 동안'], ['a week', 'for', '일주일 동안'],
          ['2021', 'since', '2021년부터'], ['last Monday', 'since', '지난 월요일부터'], ['this morning', 'since', '오늘 아침부터'],
          ['9 o\'clock', 'since', '9시부터'], ['I was eight', 'since', '내가 여덟 살 때부터'], ['last summer', 'since', '지난여름부터'],
        ];
        var a = R.pick(acts);
        var t = R.pick(times);
        var ans = t[1];
        var other = ans === 'for' ? 'since' : 'for';
        var sentence = a[0] + ' [[빈칸]] ' + t[0] + '.';
        return {
          type: 'short', check: 'text', concept: 1,
          q: '빈칸에 for와 since 가운데 알맞은 말을 쓰세요.\n\n' + sentence,
          answer: [ans],
          // 영어 낱말 뒤에는 조사를 붙이지 않는 꼴로 쓴다('2021은'·'this morning은' 처럼 읽는 소리에 따라 달라진다)
          wrong: [{ a: other, why: ans === 'for'
            ? '"' + t[0] + '" 같은 기간("얼마 동안") 앞에는 for를 써요.'
            : '"' + t[0] + '" 같은 시작한 때("언제부터") 앞에는 since를 써요.' }],
          explain: (ans === 'for' ? '"' + t[0] + '"(' + t[2] + ') 같은 기간 앞에는 **for**를 써요.' : '"' + t[0] + '"(' + t[2] + ') 같은 시작한 때 앞에는 **since**를 써요.') +
            '\n\n' + sentence.replace('[[빈칸]]', '**' + ans + '**') + '\n(' + t[2] + ' ' + a[1] + '.)',
        };
      },
    },
    {
      id: 'pres-perf-prog-form',
      level: 1,
      title: '현재완료진행형의 형태 고르기',
      make: function (R) {
        // [주어, 3인칭 단수인가]
        var subjects = [
          ['I', false], ['You', false], ['We', false], ['They', false], ['My parents', false],
          ['He', true], ['She', true], ['Hayun', true], ['My brother', true], ['The baby', true],
        ];
        // [원형, -ing, 뒷말]
        var verbs = [
          ['run', 'running', 'in the park for an hour'],
          ['swim', 'swimming', 'in the pool since 10 o\'clock'],
          ['write', 'writing', 'a story since this morning'],
          ['read', 'reading', 'comic books for two hours'],
          ['sleep', 'sleeping', 'for ten hours'],
          ['dance', 'dancing', 'since lunchtime'],
          ['play', 'playing', 'outside for a long time'],
          ['study', 'studying', 'math since 7 o\'clock'],
          ['watch', 'watching', 'TV for three hours'],
        ];
        var s = R.pick(subjects);
        var v = R.pick(verbs);
        var aux = s[1] ? 'has' : 'have';
        var badAux = s[1] ? 'have' : 'has';
        var correct = aux + ' been ' + v[1];
        var cands = [
          [badAux + ' been ' + v[1], s[1] ? '주어(' + s[0] + ')가 3인칭 단수라서 have가 아니라 has를 써요.' : '주어(' + s[0] + ')가 3인칭 단수가 아니라서 has가 아니라 have를 써요.'],
          [aux + ' been ' + v[0], 'been 뒤에는 동사원형이 아니라 -ing형이 와요.'],
          [aux + ' ' + v[1], 'have(has)와 -ing 사이에 been이 빠졌어요.'],
          [(s[0] === 'I' ? 'am' : (s[1] ? 'is' : 'are')) + ' been ' + v[1], '현재완료진행형은 be동사가 아니라 have(has) + been + -ing예요.'],
        ];
        var reason = {};
        cands.forEach(function (c) { reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }), 4);
        var sentence = s[0] + ' [[빈칸]] ' + v[2] + '.';
        return {
          type: 'choice', concept: 0,
          q: '빈칸에 알맞은 말을 고르세요.\n\n' + sentence,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: '지금까지 이어지는 동작이므로 현재완료진행형(have/has + been + -ing)을 써요. 주어 ' + s[0] + (s[1] ? '는 3인칭 단수라서 has' : '에는 have') + '를 써요.\n\n' + sentence.replace('[[빈칸]]', '**' + correct + '**'),
        };
      },
    },
    {
      id: 'past-perfect-form',
      level: 2,
      title: '과거완료로 먼저 일어난 일 나타내기',
      make: function (R) {
        // [나중 일(과거), 주어, 원형, 과거형, 과거분사, 뒷말, 뜻]
        var items = [
          ['When I got home,', 'my brother', 'eat', 'ate', 'eaten', 'all the cookies', '내가 집에 왔을 때, 남동생은 쿠키를 다 먹어 버린 뒤였어요.'],
          ['When we arrived at the station,', 'the train', 'leave', 'left', 'left', 'already', '우리가 역에 도착했을 때, 기차는 이미 떠났어요.'],
          ['When Jia called me,', 'I', 'finish', 'finished', 'finished', 'my homework', '지아가 전화했을 때, 나는 숙제를 끝낸 뒤였어요.'],
          ['When the teacher came in,', 'the students', 'clean', 'cleaned', 'cleaned', 'the classroom', '선생님이 들어오셨을 때, 학생들은 교실을 청소해 두었어요.'],
          ['When I got to the theater,', 'the movie', 'start', 'started', 'started', 'already', '내가 극장에 도착했을 때, 영화는 이미 시작했어요.'],
          ['When Mom opened the fridge,', 'someone', 'drink', 'drank', 'drunk', 'all the milk', '엄마가 냉장고를 열었을 때, 누군가 우유를 다 마셔 버린 뒤였어요.'],
          ['When Minsu found his bag,', 'he', 'lose', 'lost', 'lost', 'it for two days', '민수가 가방을 찾았을 때, 그는 이틀 동안 그것을 잃어버린 상태였어요.'],
          ['When we reached the top,', 'the sun', 'rise', 'rose', 'risen', 'already', '우리가 꼭대기에 닿았을 때, 해는 이미 떠 있었어요.'],
          ['When Hayun woke up,', 'her dad', 'go', 'went', 'gone', 'to work', '하윤이가 깼을 때, 아빠는 일하러 가신 뒤였어요.'],
          ['When I saw Doyun,', 'he', 'cut', 'cut', 'cut', 'his hair short', '내가 도윤이를 봤을 때, 그는 머리를 짧게 자른 뒤였어요.'],
          ['When the guests arrived,', 'we', 'prepare', 'prepared', 'prepared', 'the food', '손님들이 도착했을 때, 우리는 음식을 준비해 두었어요.'],
          ['When I opened the box,', 'the ice cream', 'melt', 'melted', 'melted', 'already', '내가 상자를 열었을 때, 아이스크림은 이미 녹아 있었어요.'],
        ];
        var it = R.pick(items);
        var pp = it[4];
        var correct = 'had ' + pp;
        var third = /^(my brother|the train|the movie|someone|he|the sun|her dad|the ice cream)$/i.test(it[1]);
        var presPerf = (third ? 'has ' : 'have ') + pp;
        var cands = [
          [presPerf, presPerf + '은 현재완료라서 지금이 기준이에요. 기준이 과거(' + it[0].replace(/,$/, '') + ')이므로 had를 써요.'],
          ['had ' + it[2], 'had 뒤에는 동사원형이 아니라 과거분사(' + pp + ')가 와요.'],
        ];
        if (it[3] !== pp) cands.push(['had ' + it[3], it[3] + '는 과거형이에요. had 뒤에는 과거분사 ' + pp + '를 써요.']);
        else cands.push([it[2] + 's', '현재형은 과거 이야기와 맞지 않아요. 먼저 일어난 일은 had + 과거분사로 써요.']);
        // 원형·과거형·과거분사가 같은 동사(cut 등)는 위 후보가 정답과 겹친다 — 늘 다른 후보를 하나 더 둔다
        cands.push(['had been ' + pp, 'had been + 과거분사는 "~되어 있었다"는 수동의 뜻이에요. 여기서는 주어가 직접 한 일이므로 had + 과거분사를 써요.']);
        var reason = {};
        cands.forEach(function (c) { reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }), 4);
        var tail = it[5] === 'already' ? '' : ' ' + it[5];
        var pre = it[5] === 'already' ? ' already' : '';
        var blankLine = it[0] + ' ' + it[1] + ' [[빈칸]]' + tail + '.';
        var full = it[0] + ' ' + it[1] + ' **had' + pre + ' ' + pp + '**' + tail + '.';
        return {
          type: 'choice', concept: 3,
          q: '빈칸에 알맞은 말을 고르세요. (빈칸의 일이 더 먼저 일어났어요.)\n\n' + blankLine,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: '빈칸의 일이 "' + it[0].replace(/,$/, '') + '"보다 먼저 일어났으므로 과거완료 had + 과거분사를 써요. ' + it[2] + '의 과거분사는 ' + pp + '예요.\n\n' + full + '\n(' + it[6] + ')',
        };
      },
    },
  ],

  vocab: [
    { w: 'arrive', m: '도착하다', ex: 'When we arrived, the show had already started.', exm: '우리가 도착했을 때 공연은 이미 시작했어요.' },
    { w: 'already', m: '이미, 벌써', ex: 'I had already eaten lunch.', exm: '나는 이미 점심을 먹은 뒤였어요.' },
    { w: 'still', m: '아직도, 여전히', ex: 'She is still sleeping.', exm: '그녀는 아직도 자고 있어요.' },
    { w: 'practice', m: '연습하다', ex: 'I have been practicing the drums for a year.', exm: '나는 1년 동안 드럼을 연습해 오고 있어요.' },
    { w: 'wait', m: '기다리다', ex: 'How long have you been waiting?', exm: '얼마나 오래 기다리고 있었니?' },
    { w: 'leave', m: '떠나다; 두고 오다', ex: 'I left my umbrella on the bus.', exm: '나는 버스에 우산을 두고 내렸어요.' },
    { w: 'miss', m: '놓치다; 그리워하다', ex: 'We missed the first part of the movie.', exm: '우리는 영화의 앞부분을 놓쳤어요.' },
    { w: 'realize', m: '깨닫다, 알아차리다', ex: 'Then I realized that I had lost my key.', exm: '그때 나는 열쇠를 잃어버렸다는 것을 깨달았어요.' },
    { w: 'festival', m: '축제', ex: 'Our school festival is in October.', exm: '우리 학교 축제는 10월에 있어요.' },
    { w: 'prepare', m: '준비하다', ex: 'Dad had prepared dinner before we came home.', exm: '아빠는 우리가 집에 오기 전에 저녁을 준비해 두셨어요.' },
    { w: 'recently', m: '최근에', ex: 'I have been reading a lot recently.', exm: '나는 최근에 책을 많이 읽고 있어요.' },
    { w: 'project', m: '과제, 프로젝트', ex: 'We have been working on this project since March.', exm: '우리는 3월부터 이 과제를 해 오고 있어요.' },
    { w: 'melt', m: '녹다', ex: 'The snow had melted by noon.', exm: '정오쯤에는 눈이 다 녹아 있었어요.' },
    { w: 'borrow', m: '빌리다', ex: 'I returned the book that I had borrowed.', exm: '나는 빌렸던 책을 돌려주었어요.' },
  ],
});
