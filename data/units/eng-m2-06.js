/* 중2 영어 · 보고 들은 일 말하기 (지각동사) */
Tutor.registerUnit({
  id: 'eng-m2-06',
  course: 'eng-m2',
  title: '보고 들은 일 말하기 (지각동사)',
  summary: 'see, hear + 목적어 + 동사원형/-ing로 보고 들은 것을, 과거진행형으로 그때 하던 일을 묘사해요.',
  goals: [
    '지각동사 + 목적어 + 동사원형/-ing로 보고 듣고 느낀 일을 말할 수 있어요.',
    '과거진행형(was/were + -ing)으로 과거의 어느 때에 하고 있던 일을 말할 수 있어요.',
    'when과 while로 동시에 일어난 두 일을 한 문장으로 이을 수 있어요.',
    '이야기를 읽고 사건의 흐름과 인물의 감정을 파악할 수 있어요.',
  ],
  standards: [],

  concepts: [
    {
      title: '지각동사 + 목적어 + 동사원형',
      body: '**지각동사**는 눈·귀·몸으로 알아차리는 것을 나타내는 동사예요: **see**(보다), **watch**(지켜보다), **hear**(듣다), **feel**(느끼다), listen to, look at 등.\n\n"누가 ~하는 것을 보았다/들었다"라고 할 때는 **지각동사 + 목적어 + 동사원형**으로 써요.\n\n- I **saw** Minsu **cross** the street. (나는 민수가 길을 건너는 것을 보았어요.)\n- We **heard** someone **knock** on the door. (우리는 누군가 문을 두드리는 소리를 들었어요.)\n- She **felt** the ground **shake**. (그녀는 땅이 흔들리는 것을 느꼈어요.)\n\n목적어 자리에 대명사가 오면 **목적격**(me, him, her, us, them)을 써요: I saw **him** run.\n\n> ⚠️ 목적어 뒤에 to부정사를 쓰지 않아요. I saw him **to cross**(✗) → I saw him **cross**(○)\n\n> ⚠️ 문장 전체가 과거여도 목적어 뒤의 동사는 원형 그대로예요. I saw him **crossed**(✗)',
      easy: '지각동사 문장은 "내가 본 장면"을 두 칸으로 나눠 말하는 거예요.\n\n- 첫째 칸: **누가 보았나** — I saw\n- 둘째 칸: **무엇이 무엇을 하는 장면이었나** — Minsu cross the street\n\n둘째 칸은 사진 설명처럼 아무 꼬리도 없는 맨 동사(원형)로 써요. 시간(과거)은 이미 saw가 알려 줬으니까 cross에는 -ed도 -s도 to도 붙이지 않아요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nI saw him [[빈칸]] the door.',
        choices: ['open', 'to open', 'opens'],
        answer: 0,
        why: ['', '지각동사의 목적어 뒤에는 to부정사를 쓰지 않아요. 동사원형을 써요.', '목적어 뒤의 동사에는 -s를 붙이지 않아요. 동사원형을 써요.'],
        explain: 'saw(지각동사) + him(목적어) + **open**(동사원형). "나는 그가 문을 여는 것을 보았어요."',
      },
    },
    {
      title: '지각동사 + 목적어 + -ing',
      body: '목적어 뒤에 동사원형 대신 **-ing**를 써도 돼요. 이때는 그 동작이 **한창 진행 중인 순간**을 보았다는 느낌이 강해져요.\n\n| 꼴 | 느낌 | 예 |\n|---|---|---|\n| 동사원형 | 동작을 처음부터 끝까지 다 본 것 | I saw her **cross** the road. (건너는 것을 다 보았다) |\n| -ing | 동작이 진행 중인 한 장면을 본 것 | I saw her **crossing** the road. (건너고 있는 중인 것을 보았다) |\n\n- I heard the baby **crying**. (아기가 울고 있는 소리를 들었어요.)\n- We watched the children **playing** in the snow.\n\n두 꼴 모두 **바른 문장**이에요. 시험에서 "알맞은 꼴"을 물으면 동사원형과 -ing가 둘 다 정답이 될 수 있어요.\n\n> ⚠️ -ing 만드는 법을 다시 확인해요: make → making(e 빼기), run → running(자음 한 번 더), lie → lying(ie → y)',
      easy: '동사원형은 **영상 전체**, -ing는 **멈춘 화면 한 장**이라고 생각해 보세요.\n\n친구가 노래 한 곡을 처음부터 끝까지 부르는 걸 들었다면 I heard her **sing**. 지나가다가 노래 부르는 중인 소리를 잠깐 들었다면 I heard her **singing**.\n\n둘 다 틀린 말이 아니고, 장면을 보는 방법만 달라요.',
      check: {
        type: 'ox',
        q: 'I heard her singing.과 I heard her sing.은 둘 다 바른 문장이에요.',
        answer: true,
        explain: '지각동사의 목적어 뒤에는 동사원형도, -ing도 쓸 수 있어요. singing은 노래하는 **중인** 순간을 들었다는 느낌이 더 강할 뿐 둘 다 바른 문장이에요.',
      },
    },
    {
      title: '과거진행형: was/were + -ing',
      body: '**과거진행형**은 과거의 어느 때에 "**~하고 있었다**"를 나타내요. 꼴은 **was/were + 동사-ing**예요.\n\n| 주어 | be동사 | 예 |\n|---|---|---|\n| I, he, she, it, 단수 명사 | **was** | I **was reading** a book at 9 p.m. |\n| you, we, they, 복수 명사 | **were** | They **were playing** soccer then. |\n\n- 부정문: was/were 뒤에 not — She **wasn\'t(was not) sleeping**.\n- 의문문: was/were를 주어 앞으로 — **Were** you **watching** TV? / Yes, I **was**. / No, I **wasn\'t**.\n\n과거시제(played)는 "했다"는 사실을, 과거진행형(was playing)은 그때 "하고 있던 중"이라는 장면을 보여 줘요.\n\n> ⚠️ know, like, want, have(가지다)처럼 상태를 나타내는 동사는 진행형으로 잘 쓰지 않아요. I was knowing(✗) → I knew(○)',
      easy: '과거진행형은 과거의 한 순간을 찍은 **사진**이에요.\n\n"어제 저녁 8시에 찰칵!" 사진 속에서 나는 책을 읽고 있었어요 → I **was reading** a book.\n\n중1 때 배운 현재진행형(am/is/are + -ing)에서 be동사만 과거(was/were)로 바꾸면 돼요. is → was, are → were.',
      check: {
        type: 'short', check: 'text',
        q: '우리말에 맞게 괄호 안의 낱말을 이용해 빈칸에 알맞은 말을 쓰세요.\n\n어제 오후 4시에 그들은 축구를 하고 있었어요.\nThey [[빈칸]] soccer at 4 p.m. yesterday. (play)',
        answer: ['were playing'],
        wrong: [
          { a: 'was playing', why: '주어 They는 복수라서 was가 아니라 were를 써요.' },
          { a: 'played', why: '"했다"가 아니라 "하고 있었다"예요. 과거진행형 were + playing으로 써요.' },
          { a: 'are playing', why: 'are는 현재예요. 어제의 일이므로 과거 be동사 were를 써요.' },
        ],
        explain: '주어 They는 복수이므로 **were** + playing. "그때 하고 있던 중"은 과거진행형으로 나타내요.',
      },
    },
    {
      title: 'when과 while: 동시에 일어난 일',
      body: '과거에 **긴 동작이 진행되는 도중에 짧은 일이 끼어든** 상황은 이렇게 말해요.\n\n- 긴 동작(배경) → **과거진행형**\n- 끼어든 짧은 일 → **과거시제**\n\n- I **was reading** a book **when** the phone **rang**. (내가 책을 읽고 있을 때 전화가 울렸어요.)\n- **While** I **was walking** home, I **saw** a rainbow. (집으로 걸어가는 동안 나는 무지개를 보았어요.)\n\n| 접속사 | 뜻 | 뒤에 자주 오는 것 |\n|---|---|---|\n| **when** | ~할 때 | 짧은 사건(과거시제)도, 진행 중인 동작도 |\n| **while** | ~하는 동안 | 진행 중인 긴 동작(주로 과거진행형) |\n\n접속사가 이끄는 부분이 문장 앞에 오면 그 뒤에 쉼표(,)를 찍어요: When the phone rang, I was reading a book.\n\n> ⚠️ during도 "~ 동안"이지만 뒤에 명사만 와요. during the movie(○), during I was sleeping(✗) → while I was sleeping(○)',
      easy: '긴 막대와 짧은 점을 떠올려 보세요.\n\n- 긴 막대: 책 읽기가 쭉 이어지는 중 → was reading\n- 짧은 점: 전화가 "따르릉" 하고 울린 순간 → rang\n\n막대 위에 점이 찍힌 그림이에요. 막대 쪽에는 "~하는 동안"의 while, 점 쪽에는 "~할 때"의 when을 붙이면 자연스러워요.',
      check: {
        type: 'choice',
        q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n내가 샤워를 하고 있을 때 초인종이 울렸어요.\nI was taking a shower [[빈칸]] the doorbell rang.',
        choices: ['when', 'during', 'because'],
        answer: 0,
        why: ['', 'during 뒤에는 명사만 와요. 주어와 동사가 있는 말 앞에는 when이나 while을 써요.', 'because는 "~ 때문에"예요. 우리말은 "~할 때"예요.'],
        explain: '긴 동작(샤워를 하고 있었다 — 과거진행형) 도중에 짧은 일(초인종이 울렸다 — 과거시제)이 끼어들었어요. "~할 때"는 **when**이에요.',
      },
    },
    {
      title: '이야기 읽기: 사건의 흐름과 인물의 감정',
      body: '이야기를 읽을 때는 두 가지를 찾아요.\n\n**1. 사건의 흐름** — 시간과 순서를 알려 주는 말이 단서예요.\n\n| 단서 | 뜻 |\n|---|---|\n| first, then, next | 먼저, 그다음에 |\n| suddenly | 갑자기 (새 사건이 시작됨) |\n| later, after that | 나중에, 그 뒤에 |\n| finally, in the end | 마침내, 결국 |\n\n**2. 인물의 감정** — 감정 낱말이 직접 나오기도 하지만, **행동과 몸의 반응**으로 알려 주는 경우가 많아요.\n\n- Her hands **were shaking**. → nervous(긴장한)\n- He **smiled** and **jumped** up. → happy, excited(신난)\n- She **let out a deep breath**. → relieved(안도한)\n\n이야기에서 과거진행형은 주로 **배경**(그때 하고 있던 일)을, 과거시제는 **일어난 사건**을 말해요. 과거시제 문장을 따라가면 사건의 순서가 보여요.',
      easy: '이야기를 영화라고 생각해 보세요. suddenly가 나오면 "음악이 바뀌는 장면", finally가 나오면 "마지막 장면"이에요.\n\n주인공의 마음은 얼굴과 몸을 보면 알 수 있어요. 손이 떨리면 긴장, 박수를 치며 웃으면 기쁨, 크게 숨을 내쉬면 "휴, 다행이다"예요.',
      check: {
        type: 'choice',
        q: '다음 글에서 미나의 감정으로 가장 알맞은 것을 고르세요.\n\nMina was waiting for her turn. Her hands were shaking, and her heart was beating fast.',
        choices: ['nervous', 'proud', 'sleepy'],
        answer: 0,
        why: ['', 'proud는 "자랑스러운"이에요. 손이 떨리고 가슴이 빨리 뛰는 것은 긴장한 모습이에요.', 'sleepy는 "졸린"이에요. 졸린 사람은 가슴이 빨리 뛰지 않아요.'],
        explain: '차례를 기다리며 손이 떨리고(shaking) 가슴이 빨리 뛰고(beating fast) 있어요. 긴장한 마음, **nervous**예요.',
      },
    },
  ],

  examples: [
    {
      q: '두 문장을 지각동사를 써서 한 문장으로 만드세요.\n\nI saw Jiho. He was riding a bike.',
      steps: [
        '"나는 지호를 보았다" + "지호는 자전거를 타고 있었다" → "나는 지호가 자전거를 타고 있는 것을 보았다"로 합쳐요.',
        '지각동사 saw 뒤에 목적어 Jiho를 써요: I saw Jiho',
        '목적어 뒤에 동사원형(ride) 또는 -ing(riding)를 써요. 타고 있는 중이었으니 -ing가 자연스러워요.',
        'was는 쓰지 않아요. I saw Jiho was riding(✗)',
      ],
      answer: 'I saw Jiho **riding** a bike. (I saw Jiho **ride** a bike.도 바른 문장이에요.)',
    },
    {
      q: '우리말에 맞게 영어로 나타내세요.\n\n내가 집에 왔을 때 남동생은 자고 있었어요.',
      steps: [
        '긴 동작(배경): 남동생이 자고 있었다 → 과거진행형 my brother was sleeping',
        '끼어든 짧은 일: 내가 집에 왔다 → 과거시제 I came home',
        '"~할 때"는 when으로 이어요. when이 이끄는 부분을 앞에 쓰면 뒤에 쉼표를 찍어요.',
      ],
      answer: '**When I came home**, my brother **was sleeping**. (= My brother was sleeping when I came home.)',
    },
  ],

  terms: [
    { term: '지각동사', def: '보고, 듣고, 느끼는 것을 나타내는 동사예요. see, watch, hear, feel, listen to, look at 등. 지각동사 + 목적어 + 동사원형/-ing로 써요.' },
    { term: '목적어', def: '동사가 나타내는 동작을 받는 말이에요. I saw **him** run.에서 him이에요. 대명사는 목적격(me, him, her, us, them)으로 써요.' },
    { term: '동사원형', def: '아무 꼬리(-s, -ed, -ing)도 붙지 않은 동사의 기본 모양이에요. 예: go, run, cross' },
    { term: '과거진행형', def: 'was/were + 동사-ing로, 과거의 어느 때에 "~하고 있었다"를 나타내요. 예: I was reading a book.' },
    { term: 'when', def: '"~할 때"를 뜻하는 접속사예요. I was reading when the phone rang.' },
    { term: 'while', def: '"~하는 동안"을 뜻하는 접속사예요. 뒤에 주로 진행 중인 긴 동작이 와요. While I was walking home, I saw a rainbow.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nI saw Jiho [[빈칸]] the street.',
      choices: ['cross', 'to cross', 'crosses', 'crossed'],
      answer: 0,
      why: ['', '지각동사의 목적어 뒤에는 to부정사를 쓰지 않아요.', '목적어 뒤의 동사에는 -s를 붙이지 않아요. 동사원형을 써요.', '과거는 saw가 이미 나타내요. 목적어 뒤에는 동사원형을 써요.'],
      explain: 'saw(지각동사) + Jiho(목적어) + **cross**(동사원형). "나는 지호가 길을 건너는 것을 보았어요."',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
      q: '괄호 안의 낱말을 알맞은 꼴로 바꾸어 빈칸에 쓰세요.\n\nI heard the baby [[빈칸]] in the next room. (cry)',
      answer: ['cry', 'crying'],
      wrong: [
        { a: 'to cry', why: '지각동사(heard)의 목적어 뒤에는 to부정사를 쓰지 않아요. cry나 crying을 써요.' },
        { a: 'cries', why: '목적어 뒤의 동사에는 -s를 붙이지 않아요. cry나 crying을 써요.' },
        { a: 'cried', why: '과거는 heard가 이미 나타내요. cry나 crying을 써요.' },
      ],
      explain: '지각동사 heard + 목적어 the baby 뒤에는 동사원형 **cry**나 **crying**을 써요. 둘 다 정답이에요. crying은 울고 있는 중인 소리를 들었다는 느낌이에요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nI watched [[빈칸]] play basketball after school.',
      choices: ['them', 'they', 'their', 'theirs'],
      answer: 0,
      why: ['', 'they는 주격이에요. 지각동사 뒤의 목적어 자리에는 목적격 them을 써요.', 'their는 "그들의"라는 소유격이라 뒤에 명사가 와야 해요.', 'theirs는 "그들의 것"이에요. 농구를 하는 사람이 와야 해요.'],
      explain: 'watched의 목적어 자리이므로 목적격 **them**을 써요. "나는 방과 후에 그들이 농구하는 것을 지켜보았어요."',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 0,
      q: 'I felt something to touch my arm.은 바른 문장이에요.',
      answer: false,
      explain: '지각동사 felt의 목적어 뒤에는 to부정사를 쓰지 않아요. 바른 문장은 I felt something **touch** my arm. 또는 I felt something **touching** my arm.(무언가 내 팔에 닿는 것을 느꼈어요.)이에요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n어제 저녁 7시에 부모님은 저녁을 드시고 계셨어요.\nAt 7 p.m. yesterday, my parents [[빈칸]] dinner.',
      choices: ['were having', 'was having', 'are having', 'have'],
      answer: 0,
      why: ['', 'my parents는 복수라서 was가 아니라 were를 써요.', 'are는 현재예요. 어제의 일이므로 were를 써요.', '현재시제예요. "드시고 계셨다"는 과거진행형이에요.'],
      explain: '어제(과거) 그때 하고 있던 일은 과거진행형으로 써요. 주어 my parents가 복수이므로 **were having**이에요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 2,
      q: '우리말에 맞게 빈칸에 알맞은 한 낱말을 쓰세요.\n\n그때 너는 무엇을 하고 있었니?\nWhat [[빈칸]] you doing then?',
      answer: ['were'],
      wrong: [
        { a: 'was', why: '주어가 you이면 was가 아니라 were를 써요.' },
        { a: 'are', why: 'are는 현재예요. "하고 있었니"는 과거라서 were를 써요.' },
        { a: 'did', why: 'did는 일반동사의 과거 의문문에 써요. doing(-ing)과 함께 쓰는 것은 be동사 were예요.' },
      ],
      explain: '과거진행형 의문문은 was/were를 주어 앞으로 보내요. 주어 you에는 **were**를 써요. What were you doing then?',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n미나는 집으로 걸어가는 동안 무지개를 보았어요.\n[[빈칸]] Mina was walking home, she saw a rainbow.',
      choices: ['While', 'During', 'Because', 'If'],
      answer: 0,
      why: ['', 'During 뒤에는 명사만 와요. 주어 + 동사(Mina was walking) 앞에는 While을 써요.', 'Because는 "~ 때문에"예요. 우리말은 "~하는 동안"이에요.', 'If는 "만약 ~하면"이에요. 우리말은 "~하는 동안"이에요.'],
      explain: '"~하는 동안"이고 뒤에 진행 중인 긴 동작(was walking)이 오므로 **While**을 써요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 3,
      q: '우리말에 맞게 순서대로 놓으세요.\n\n내가 책을 읽고 있을 때 전화가 울렸어요.',
      choices: ['I', 'was reading', 'a book', 'when', 'the phone rang.'],
      answer: [0, 1, 2, 3, 4],
      hint: '긴 동작(읽고 있었다)을 먼저 쓰고, 끼어든 일(전화가 울렸다)을 when으로 이어요.',
      explain: 'I was reading a book(긴 동작, 과거진행형) + when + the phone rang(끼어든 짧은 일, 과거시제).',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 2,
      q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: Were you sleeping when I called you?\nB: [[빈칸]] I was taking a shower.',
      choices: ["No, I wasn't.", 'Yes, I was.', "No, I didn't.", "No, you weren't."],
      answer: 0,
      why: [
        '',
        '자고 있었다고 해 놓고 샤워 중이었다고 하면 말이 맞지 않아요.',
        'Were you ~?로 물었으니 be동사 was로 답해요. did는 일반동사 의문문의 답이에요.',
        '나에 대해 물었으니 I로 답해요.',
      ],
      hint: '질문이 be동사 Were로 시작했어요. 그리고 B는 그때 샤워를 하고 있었어요.',
      explain: 'Were you ~?에는 Yes, I was. / No, I wasn\'t.로 답해요. B는 샤워 중이었으니 자고 있지 않았어요 → **No, I wasn\'t.**',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '글을 읽고, 마지막에 서준이가 느낀 감정으로 가장 알맞은 것을 고르세요.\n\nLast Saturday, Seojun was walking in the park with his dog. Suddenly, he heard someone crying near the pond. He saw a little girl standing alone. She was looking for her mom. Seojun stayed with her and called the park office. Ten minutes later, her mom came. The girl smiled, and Seojun smiled too.',
      choices: ['proud and happy', 'angry', 'bored', 'scared'],
      answer: 0,
      why: [
        '',
        '서준이가 화가 날 일은 없었어요. 마지막에 웃었어요.',
        '지루할 틈 없이 아이를 도왔고, 마지막에 웃었어요.',
        '처음에 우는 소리를 들었을 뿐, 무서워한 행동은 나오지 않아요. 마지막에는 웃었어요.',
      ],
      explain: '서준이는 길을 잃은 아이를 도와 엄마를 찾아 주었고, 아이가 웃자 서준이도 웃었어요. 좋은 일을 해낸 뒤의 **뿌듯하고 기쁜(proud and happy)** 마음이에요.\n\n(지난 토요일 서준이는 개와 공원을 걷고 있었어요. 갑자기 연못 근처에서 누군가 우는 소리를 들었어요. 어린 여자아이가 혼자 서 있는 것을 보았어요. 아이는 엄마를 찾고 있었어요. 서준이는 아이 곁에 있으면서 공원 관리 사무소에 전화했어요. 10분 뒤 아이의 엄마가 왔어요. 아이가 웃었고, 서준이도 웃었어요.)',
    },
    {
      id: 'p11', level: 2, type: 'order', concept: 4,
      q: '글을 읽고, 일어난 일을 순서대로 놓으세요.\n\nLast Saturday, Seojun was walking in the park with his dog. Suddenly, he heard someone crying near the pond. He saw a little girl standing alone. She was looking for her mom. Seojun stayed with her and called the park office. Ten minutes later, her mom came.',
      choices: ['Seojun heard someone crying.', 'Seojun saw a little girl.', 'Seojun called the park office.', "The girl's mom came."],
      answer: [0, 1, 2, 3],
      hint: 'Suddenly, Ten minutes later 같은 시간 단서를 따라가 보세요.',
      explain: '걷던 중 갑자기(Suddenly) 우는 소리를 들음 → 혼자 있는 아이를 봄 → 공원 관리 사무소에 전화함 → 10분 뒤(Ten minutes later) 엄마가 옴.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'text', concept: 2,
      q: '우리말에 맞게 괄호 안의 말을 이용해 빈칸에 알맞은 말을 쓰세요.\n\n선생님이 이름을 불렀을 때 지호는 듣고 있지 않았어요.\nJiho [[빈칸]] to the teacher when she called his name. (not, listen)',
      answer: ["wasn't listening", 'was not listening'],
      wrong: [
        { a: "didn't listen", why: '"듣지 않았다"가 아니라 "듣고 있지 않았다"예요. 과거진행형의 부정 wasn\'t listening으로 써요.' },
        { a: "weren't listening", why: '주어 Jiho는 단수라서 were가 아니라 was를 써요.' },
        { a: "wasn't listen", why: '진행형은 be동사 + -ing예요. listen에 -ing를 붙여요.' },
      ],
      explain: '과거진행형의 부정문은 was/were + not + -ing예요. 주어 Jiho는 단수이므로 **wasn\'t listening**(= was not listening)이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '어법상 **어색한** 문장을 고르세요.',
      choices: ['I watched the boys to play soccer.', 'I saw her dancing on the stage.', 'We heard the birds sing.', 'He felt the ground shaking.'],
      answer: 0,
      why: [
        '',
        'saw + her(목적어) + dancing(-ing)은 바른 문장이에요.',
        'heard + the birds(목적어) + sing(동사원형)은 바른 문장이에요.',
        'felt + the ground(목적어) + shaking(-ing)은 바른 문장이에요.',
      ],
      hint: '지각동사의 목적어 뒤에 올 수 있는 꼴은 두 가지예요.',
      explain: '지각동사의 목적어 뒤에는 동사원형이나 -ing만 와요. **to play**를 play나 playing으로 고쳐야 해요: I watched the boys play(playing) soccer.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 3,
      q: '우리말에 맞게 빈칸에 알맞은 한 낱말을 쓰세요.\n\n지아는 영화를 보는 동안 잠이 들었어요.\nJia fell asleep [[빈칸]] she was watching a movie.',
      answer: ['while', 'when'],
      wrong: [
        { a: 'during', why: 'during 뒤에는 명사만 와요. she was watching처럼 주어와 동사가 있으면 while을 써요.' },
        { a: 'because', why: 'because는 "~ 때문에"예요. 우리말은 "~하는 동안"이에요.' },
      ],
      hint: '빈칸 뒤에 주어(she)와 동사(was watching)가 있어요.',
      explain: '"~하는 동안"이고 뒤에 진행 중인 동작(she was watching)이 오므로 **while**이 가장 알맞아요. "~할 때"의 when도 쓸 수 있어요. during은 during the movie처럼 명사 앞에만 써요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '다음 상황을 바르게 나타낸 문장을 고르세요.\n\n민수는 피아노를 치고 있었어요. 피아노를 치는 도중에 갑자기 전기가 나갔어요.',
      choices: [
        'Minsu was playing the piano when the power went out.',
        'Minsu played the piano when the power was going out.',
        'Minsu is playing the piano when the power went out.',
        'While the power went out, Minsu was played the piano.',
      ],
      answer: 0,
      why: [
        '',
        '진행형이 거꾸로 붙었어요. 길게 이어진 동작은 피아노 치기이므로 was playing, 짧게 끼어든 일은 went out이에요.',
        'is playing은 현재진행형이에요. 과거의 일이므로 was playing이에요.',
        'was played는 진행형이 아니에요(be동사 + -ing가 아님). 또 while 뒤에는 긴 동작이 와야 자연스러워요.',
      ],
      hint: '길게 이어진 동작과 짧게 끼어든 일을 먼저 나누어 보세요.',
      explain: '긴 동작(피아노를 치고 있었다) → 과거진행형 **was playing**, 끼어든 짧은 일(전기가 나갔다) → 과거시제 **went out**, 둘을 when으로 이어요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '글을 읽고, 하윤이의 감정 변화로 가장 알맞은 것을 고르세요.\n\nHayun was standing behind the stage. Her hands were shaking, and her mouth was dry. Then she walked out and started to sing. When the song ended, she heard everyone clapping. She let out a deep breath and smiled.',
      choices: ['nervous → relieved', 'happy → sad', 'bored → excited', 'angry → calm'],
      answer: 0,
      why: [
        '',
        '처음에는 손이 떨렸으니 기쁜 마음이 아니었고, 끝에는 웃었으니 슬프지 않아요.',
        '손이 떨리고 입이 마른 것은 지루함이 아니라 긴장이에요.',
        '처음에 화가 났다는 단서는 없어요. 손이 떨리고 입이 마른 것은 긴장이에요.',
      ],
      hint: '처음의 몸 반응(shaking, dry)과 끝의 행동(deep breath, smiled)을 비교해 보세요.',
      explain: '무대 뒤에서 손이 떨리고 입이 말랐어요 → 긴장(**nervous**). 노래가 끝나고 박수 소리를 듣고 크게 숨을 내쉬며 웃었어요 → 안도(**relieved**).\n\n(하윤이는 무대 뒤에 서 있었어요. 손이 떨리고 입이 말랐어요. 그러다 무대로 걸어 나가 노래를 시작했어요. 노래가 끝나자 모두가 박수 치는 소리가 들렸어요. 하윤이는 깊게 숨을 내쉬고 웃었어요.)',
    },
  ],

  deeper: [
    {
      title: '이야기를 생생하게 만드는 과거진행형',
      body: '이야기를 쓰는 사람은 과거진행형으로 **무대(배경)**를 깔고, 과거시제로 **사건**을 일으켜요.\n\nIt **was raining**. People **were hurrying** home. Suddenly, a small cat **jumped** onto my bag.\n\n앞의 두 문장은 "그때의 모습"을 사진처럼 보여 주고, jumped에서 사건이 시작돼요. 여러분이 일기를 쓸 때도 "그때 나는 ~하고 있었다"로 시작하고 "그때 갑자기 ~했다"로 이으면 이야기가 살아나요.\n\n지각동사도 같은 역할을 해요. I **heard** the rain **hitting** the window.처럼 쓰면 읽는 사람이 그 소리를 함께 듣는 느낌이 들어요. 중3에서는 -ing가 명사를 꾸미는 **분사**를 배우는데, 여기서 익힌 -ing 감각이 그대로 이어져요.',
    },
  ],

  faq: [
    {
      q: 'I saw him cross랑 I saw him crossing은 뭐가 달라요?',
      a: '둘 다 바른 문장이에요. cross(동사원형)는 건너는 동작을 처음부터 끝까지 본 느낌이고, crossing(-ing)은 건너고 있는 중인 한 장면을 본 느낌이에요. 빈칸 문제에서 "알맞은 꼴"을 물으면 둘 다 정답일 수 있어요.',
    },
    {
      q: '지각동사 뒤에는 왜 to를 안 써요?',
      a: '영어에서 see, hear, feel 같은 지각동사는 목적어 뒤에 동사원형을 바로 쓰도록 정해져 있어요. "내가 본 장면 = 목적어가 ~하는 것"을 그대로 붙여 말한다고 생각하면 돼요. want him to go처럼 to를 쓰는 동사와 구별해서 외워 두세요.',
    },
    {
      q: 'when이랑 while은 뭐가 달라요?',
      a: 'while은 "~하는 동안"이라서 뒤에 길게 이어지는 동작(주로 과거진행형)이 와요. when은 "~할 때"라서 짧은 사건(The phone rang)도, 진행 중인 동작도 올 수 있어요. 긴 동작 쪽에는 while, 짧은 사건 쪽에는 when을 붙인다고 기억하면 쉬워요.',
    },
    {
      q: '과거시제랑 과거진행형은 언제 구별해서 써요?',
      a: '"했다"는 사실만 말하면 과거시제(I read a book.), 그때 "하고 있던 중"이라는 장면을 말하면 과거진행형(I was reading a book at 9.)이에요. at 9 p.m., when ~, while ~처럼 특정한 순간이 나오면 과거진행형이 잘 어울려요.',
    },
  ],

  mistakes: [
    '지각동사의 목적어 뒤에 to부정사나 과거형을 쓰는 실수 — I saw him to run(✗), I saw him ran(✗) → I saw him run(running)(○)',
    '주어에 맞지 않는 was/were — They was playing(✗) → They were playing(○). I·he·she·it·단수는 was, you·we·they·복수는 were예요.',
    'during 뒤에 주어와 동사를 쓰는 실수 — during I was sleeping(✗) → while I was sleeping(○), during the night(○)',
  ],

  gens: [
    {
      id: 'perception-base',
      level: 1,
      title: '지각동사 + 목적어 뒤의 동사 꼴 고르기',
      make: function (R) {
        // [지각동사(과거), 목적어, 동사원형, -s, 과거형, -ing, 뒷말, 우리말 장면]
        var items = [
          ['saw', 'Minsu', 'get on', 'gets on', 'got on', 'getting on', 'the bus', '민수가 버스에 타는 것을 보았어요'],
          ['heard', 'someone', 'knock', 'knocks', 'knocked', 'knocking', 'on the door', '누군가 문을 두드리는 소리를 들었어요'],
          ['watched', 'the kids', 'fly', 'flies', 'flew', 'flying', 'kites in the park', '아이들이 공원에서 연을 날리는 것을 지켜보았어요'],
          ['felt', 'the house', 'shake', 'shakes', 'shook', 'shaking', 'for a few seconds', '집이 몇 초 동안 흔들리는 것을 느꼈어요'],
          ['saw', 'a man', 'climb', 'climbs', 'climbed', 'climbing', 'the tree', '한 남자가 나무에 오르는 것을 보았어요'],
          ['heard', 'my mom', 'call', 'calls', 'called', 'calling', 'my name', '엄마가 내 이름을 부르는 소리를 들었어요'],
          ['saw', 'Jia', 'leave', 'leaves', 'left', 'leaving', 'the classroom', '지아가 교실을 나가는 것을 보았어요'],
          ['watched', 'the sun', 'go down', 'goes down', 'went down', 'going down', 'behind the hill', '해가 언덕 뒤로 지는 것을 지켜보았어요'],
          ['heard', 'the dog', 'bark', 'barks', 'barked', 'barking', 'loudly', '개가 크게 짖는 소리를 들었어요'],
          ['felt', 'something', 'touch', 'touches', 'touched', 'touching', 'my foot', '무언가 내 발에 닿는 것을 느꼈어요'],
          ['saw', 'the boys', 'run', 'runs', 'ran', 'running', 'across the field', '소년들이 운동장을 가로질러 달리는 것을 보았어요'],
          ['watched', 'my dad', 'cook', 'cooks', 'cooked', 'cooking', 'dinner', '아빠가 저녁을 요리하는 것을 지켜보았어요'],
          ['saw', 'a bird', 'build', 'builds', 'built', 'building', 'a nest', '새가 둥지를 짓는 것을 보았어요'],
          ['heard', 'the children', 'laugh', 'laughs', 'laughed', 'laughing', 'in the yard', '아이들이 마당에서 웃는 소리를 들었어요'],
          ['felt', 'the wind', 'blow', 'blows', 'blew', 'blowing', 'on my face', '바람이 얼굴에 부는 것을 느꼈어요'],
          ['watched', 'the players', 'practice', 'practices', 'practiced', 'practicing', 'on the court', '선수들이 코트에서 연습하는 것을 지켜보았어요'],
        ];
        var subj = R.pick(['I', 'We', 'Hayun', 'My brother']);
        var it = R.pick(items);
        var correct = it[2];
        var reason = {};
        reason['to ' + it[2]] = '지각동사의 목적어 뒤에는 to부정사를 쓰지 않아요. 동사원형을 써요.';
        reason[it[3]] = '목적어 뒤의 동사에는 -s를 붙이지 않아요. 동사원형을 써요.';
        reason[it[4]] = '과거는 ' + it[0] + '가 이미 나타내요. 목적어 뒤에는 동사원형을 써요.';
        var pick = R.choices(correct, ['to ' + it[2], it[3], it[4]], 4);
        return {
          type: 'choice', concept: 0,
          q: '빈칸에 알맞은 말을 고르세요.\n\n' + subj + ' ' + it[0] + ' ' + it[1] + ' [[빈칸]] ' + it[6] + '.',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: it[0] + '(지각동사) + ' + it[1] + '(목적어) + **' + it[2] + '**(동사원형). 뜻: ' + it[7] + '. 진행 중인 장면을 강조하면 -ing(' + it[5] + ')도 쓸 수 있어요.',
        };
      },
    },
    {
      id: 'past-progressive-be',
      level: 1,
      title: '과거진행형 was/were + -ing 고르기',
      make: function (R) {
        // [주어, was/were, 현재 be동사]
        var subjects = [['I', 'was', 'am'], ['She', 'was', 'is'], ['He', 'was', 'is'], ['My sister', 'was', 'is'], ['Doyun', 'was', 'is'],
          ['We', 'were', 'are'], ['They', 'were', 'are'], ['You', 'were', 'are'], ['The students', 'were', 'are'], ['My friends', 'were', 'are']];
        // [동사원형, -ing, 뒷말]
        var acts = [['read', 'reading', 'a comic book'], ['watch', 'watching', 'a movie'], ['clean', 'cleaning', 'the room'],
          ['play', 'playing', 'badminton'], ['do', 'doing', 'homework'], ['take', 'taking', 'a walk'],
          ['make', 'making', 'sandwiches'], ['swim', 'swimming', 'in the pool'], ['write', 'writing', 'a letter'],
          ['listen', 'listening', 'to music']];
        var times = ['at 8 p.m. yesterday', 'at that time', 'when it started to rain', 'at noon last Sunday'];
        var s = R.pick(subjects);
        var a = R.pick(acts);
        var t = R.pick(times);
        var other = s[1] === 'was' ? 'were' : 'was';
        var correct = s[1] + ' ' + a[1];
        var reason = {};
        reason[other + ' ' + a[1]] = s[1] === 'was'
          ? '주어 ' + s[0] + '에는 was를 써요. were는 you·we·they·복수 주어에 써요.'
          : '주어 ' + s[0] + '에는 were를 써요. was는 I·he·she·단수 주어에 써요.';
        reason[s[1] + ' ' + a[0]] = '진행형은 be동사 + -ing예요. ' + a[0] + '에 -ing를 붙여 ' + a[1] + '으로 써요.';
        reason[s[2] + ' ' + a[1]] = s[2] + R.josa(s[2], '은/는') + ' 현재 be동사예요. 과거의 그때 하고 있던 일에는 ' + s[1] + '를 써요.';
        var pick = R.choices(correct, [other + ' ' + a[1], s[1] + ' ' + a[0], s[2] + ' ' + a[1]], 4);
        return {
          type: 'choice', concept: 2,
          q: '빈칸에 들어갈 **과거진행형**으로 알맞은 것을 고르세요.\n\n' + s[0] + ' [[빈칸]] ' + a[2] + ' ' + t + '. (' + a[0] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: '과거진행형은 was/were + -ing예요. 주어 ' + s[0] + '에는 **' + s[1] + '**, ' + a[0] + '의 -ing형은 **' + a[1] + '**이므로 답은 ' + correct + '이에요.',
        };
      },
    },
  ],

  vocab: [
    { w: 'suddenly', m: '갑자기', ex: 'Suddenly, the lights went out.', exm: '갑자기 불이 꺼졌어요.' },
    { w: 'knock', m: '두드리다, 노크하다', ex: 'I heard someone knock on the door.', exm: '나는 누군가 문을 두드리는 소리를 들었어요.' },
    { w: 'shake', m: '흔들리다, 떨리다', ex: 'My legs were shaking before the race.', exm: '경주 전에 내 다리가 떨리고 있었어요.' },
    { w: 'ring', m: '(전화·종이) 울리다', ex: 'The phone rang while I was eating.', exm: '내가 먹고 있는 동안 전화가 울렸어요.' },
    { w: 'alone', m: '혼자', ex: 'The puppy was sitting alone under the bench.', exm: '강아지가 벤치 아래에 혼자 앉아 있었어요.' },
    { w: 'nervous', m: '긴장한, 불안한', ex: 'I was nervous before my speech.', exm: '나는 발표 전에 긴장했어요.' },
    { w: 'relieved', m: '안도한, 마음이 놓인', ex: 'We were relieved to find the lost key.', exm: '우리는 잃어버린 열쇠를 찾아서 마음이 놓였어요.' },
    { w: 'proud', m: '자랑스러운, 뿌듯한', ex: 'Dad was proud of my drawing.', exm: '아빠는 내 그림을 자랑스러워하셨어요.' },
    { w: 'clap', m: '박수를 치다', ex: 'Everyone clapped at the end of the show.', exm: '공연이 끝나자 모두가 박수를 쳤어요.' },
    { w: 'wave', m: '손을 흔들다', ex: 'I saw Jia waving at me from the bus.', exm: '나는 지아가 버스에서 나에게 손을 흔드는 것을 보았어요.' },
    { w: 'notice', m: '알아차리다', ex: 'Did you notice the new sign?', exm: '새 표지판을 알아차렸니?' },
    { w: 'rainbow', m: '무지개', ex: 'We saw a rainbow after the rain.', exm: '우리는 비가 온 뒤에 무지개를 보았어요.' },
    { w: 'pond', m: '연못', ex: 'Ducks were swimming in the pond.', exm: '오리들이 연못에서 헤엄치고 있었어요.' },
  ],
});
