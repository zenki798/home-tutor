/* 중1 영어 · 취미 소개하기 (동명사·to부정사) */
Tutor.registerUnit({
  id: 'eng-m1-06',
  course: 'eng-m1',
  title: '취미 소개하기 (동명사·to부정사)',
  summary: '동명사와 to부정사를 명사처럼 써서 좋아하는 활동과 하고 싶은 일을 말하고 취미를 소개해요.',
  goals: [
    '동명사(-ing)와 to부정사(to + 동사원형)를 주어·목적어·보어 자리에 쓸 수 있어요.',
    '동사에 따라 목적어로 동명사를 쓸지 to부정사를 쓸지 고를 수 있어요.',
    '전치사 뒤에 동명사를 써서 잘하는 것과 관심 있는 것을 말할 수 있어요.',
    '취미를 소개하는 글을 읽고 중심 내용을 찾을 수 있어요.',
  ],
  standards: [],

  concepts: [
    {
      title: '동명사: 동사에 -ing를 붙여 명사처럼',
      body: '**동명사**는 동사원형에 **-ing**를 붙여 "~하는 것, ~하기"라는 뜻의 **명사처럼** 쓰는 말이에요. 명사처럼 쓰이니 문장에서 주어·목적어·보어 자리에 올 수 있어요.\n\n| 자리 | 예문 | 뜻 |\n|---|---|---|\n| 주어 | **Playing soccer** is fun. | 축구 하는 것은 재미있어요. |\n| 목적어 | I like **drawing** cartoons. | 나는 만화 그리기를 좋아해요. |\n| 보어 | My hobby is **collecting** stamps. | 내 취미는 우표를 모으는 것이에요. |\n\n동명사가 주어일 때는 "~하는 것" **한 가지 일**로 보기 때문에 **단수**로 취급해요. 그래서 Playing soccer **is** fun.처럼 is를 써요(soccer 뒤라고 are를 쓰지 않아요).\n\n> 💡 -ing를 붙이는 법은 현재진행형과 같아요: make → making, swim → swimming, play → playing',
      easy: '동사는 "움직임"이고, 명사는 "이름"이에요. 움직임에 -ing라는 이름표를 붙이면 그 움직임 자체가 하나의 "일"이 돼요.\n\n- swim(헤엄치다) → **swimming**(수영, 헤엄치기)\n- read(읽다) → **reading**(독서, 읽기)\n\n"수영"이나 "독서"처럼 한 덩어리 이름이 되었으니, 문장 맨 앞(주어)에도 올 수 있고 like 뒤(목적어)에도 올 수 있어요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\n[[빈칸]] soccer is fun.',
        choices: ['Playing', 'Play', 'Plays'],
        answer: 0,
        why: ['', '동사원형은 문장의 주어 자리에 올 수 없어요. "~하는 것"이 되려면 -ing를 붙여요.', 'plays는 동사의 3인칭 단수 현재형이에요. 주어 자리에는 명사처럼 쓰는 동명사가 와요.'],
        explain: '주어 자리에 "축구 하는 것"이 와야 하므로 동명사 **Playing**을 써요. Playing soccer is fun.(축구 하는 것은 재미있어요.)',
      },
    },
    {
      title: 'to부정사의 명사적 용법: to + 동사원형',
      body: '**to부정사**는 **to + 동사원형** 꼴이에요. 동명사처럼 "~하는 것, ~하기"라는 뜻으로 명사 자리에 쓸 수 있는데, 이것을 **명사적 용법**이라고 해요.\n\n| 자리 | 예문 | 뜻 |\n|---|---|---|\n| 주어 | **To learn** a new language is exciting. | 새 언어를 배우는 것은 신나요. |\n| 목적어 | I want **to visit** Jeju Island. | 나는 제주도를 방문하고 싶어요. |\n| 보어 | My dream is **to be** a cook. | 내 꿈은 요리사가 되는 것이에요. |\n\nto 뒤에는 **항상 동사원형**이 와요. 주어가 3인칭 단수여도, 과거 이야기여도 to 뒤는 바뀌지 않아요. She wants **to be** a doctor.(to is ✗), He wanted **to go** home.(to went ✗)\n\n> 💡 꿈이나 계획을 말할 때 "My dream is to + 동사원형", "My plan is to + 동사원형"을 많이 써요.',
      easy: 'to부정사는 "to + 동사원형"이라는 한 세트예요. 세트를 통째로 "~하는 것"이라고 읽으면 돼요.\n\n- to be a cook → 요리사가 되는 것\n- to visit Jeju → 제주를 방문하는 것\n\n그래서 My dream is to be a cook.은 "내 꿈은 / ~이다 / 요리사가 되는 것"이에요. 세트 안의 동사는 언제나 원래 모양 그대로예요.',
      check: {
        type: 'ox',
        q: 'My dream is to be a cook.에서 **to be a cook**은 "요리사가 되는 것"이라는 뜻이에요.',
        answer: true,
        explain: 'to부정사(to + 동사원형)가 is 뒤의 보어 자리에서 "~하는 것"이라는 뜻으로 쓰였어요. 그래서 "내 꿈은 요리사가 되는 것이에요."라고 해석해요.',
      },
    },
    {
      title: '목적어로 무엇을 쓸까: 동사가 정해요',
      body: '동사 뒤 목적어 자리에 "~하는 것"을 쓸 때, **동명사를 쓸지 to부정사를 쓸지는 앞의 동사가 정해요.**\n\n| 동사 | 목적어 | 예문 |\n|---|---|---|\n| enjoy, finish, keep, practice | **동명사만** | I **enjoy** read**ing**. / She **finished** clean**ing** her room. |\n| want, hope, decide, plan, need | **to부정사만** | I **want to** travel. / We **decided to** join the club. |\n| like, love, start, begin | **둘 다** | I **like** swimm**ing**. = I **like to** swim. |\n\n외울 때 도움이 되는 느낌이 있어요. want, hope, decide, plan은 **아직 하지 않은, 앞으로 할 일**을 바라거나 정하는 말이라 "앞으로 나아가는" to와 잘 어울려요. enjoy, finish, keep은 **지금 하고 있거나 이미 하고 있던 일**을 즐기고, 끝내고, 계속하는 말이라 -ing와 어울려요.\n\n> ⚠️ 이 느낌은 기억을 돕는 요령일 뿐 규칙은 아니에요. 동사마다 짝을 꼭 외워 두세요. I enjoy to read.(✗) I want reading.(✗)',
      easy: '동사마다 "단짝 친구"가 정해져 있다고 생각해 보세요.\n\n- enjoy, finish는 **-ing**하고만 놀아요: enjoy dancing, finish eating\n- want, hope, decide는 **to**하고만 놀아요: want to dance, hope to win\n- like, start는 둘 다와 친해요: like dancing = like to dance\n\n문장을 보면 먼저 앞의 동사가 누구와 단짝인지 떠올려 보세요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nI enjoy [[빈칸]] mystery books.',
        choices: ['reading', 'to read', 'read'],
        answer: 0,
        why: ['', 'enjoy는 목적어로 to부정사를 쓰지 않아요. enjoy 뒤에는 동명사가 와요.', '동사 enjoy 뒤에 동사원형을 바로 이어 쓸 수 없어요. "~하는 것"이 되도록 -ing를 붙여요.'],
        explain: 'enjoy는 목적어로 **동명사**만 써요. I enjoy **reading** mystery books.(나는 추리 소설 읽는 것을 즐겨요.)',
      },
    },
    {
      title: '전치사 뒤에는 동명사',
      body: 'at, in, about, for 같은 **전치사** 뒤에는 명사가 와요. 그래서 "~하는 것"을 전치사 뒤에 쓰려면 **동명사**를 써요. to부정사나 동사원형은 쓰지 않아요.\n\n| 표현 | 뜻 | 예문 |\n|---|---|---|\n| be good at **-ing** | ~하는 것을 잘하다 | Jia **is good at singing**. |\n| be interested in **-ing** | ~하는 것에 관심이 있다 | I**\'m interested in making** robots. |\n| How about **-ing**? | ~하는 게 어때? | **How about going** to the park? |\n| Thank you for **-ing**. | ~해 줘서 고마워. | **Thank you for helping** me. |\n\n취미를 소개할 때 "나는 ~을 잘해요", "나는 ~에 관심이 있어요"를 이 표현으로 말할 수 있어요.\n\n> ⚠️ I\'m good at **to swim**.(✗) I\'m interested in **cook**.(✗) → at swimming, in cooking',
      easy: '전치사는 "문 앞의 경비원"이라고 생각해 보세요. 이 경비원은 **명사만** 들여보내요.\n\n동사 swim은 그냥은 못 들어가지만, -ing 이름표를 붙인 swimming(수영)은 명사처럼 쓰이니 통과예요. 그래서 good at swimming, interested in swimming이라고 해요.',
      check: {
        type: 'ox',
        q: 'I am good at to swim.은 바른 문장이에요.',
        answer: false,
        explain: '전치사 at 뒤에는 동명사를 써요. 바른 문장은 I am good at **swimming**.(나는 수영을 잘해요.)이에요.',
      },
    },
    {
      title: '취미 소개 글에서 중심 내용 찾기',
      body: '**중심 내용**(main idea)은 글쓴이가 그 글에서 가장 하고 싶은 말이에요. 취미 소개 글은 보통 이런 차례로 써요.\n\n1. 내 취미는 무엇인가 (My hobby is …)\n2. 언제, 어떻게, 누구와 하는가\n3. 왜 좋은가, 앞으로 하고 싶은 것\n\n중심 내용을 찾을 때는 **첫 문장과 마지막 문장**을 먼저 보고, 글에 **여러 번 나오는 낱말**을 찾아요. 세부 내용 하나(언제 하는지, 무엇을 샀는지)는 중심 내용이 아니에요. 모든 문장을 아우르는 말을 고르세요.\n\n> 💡 관심 있는 주제의 글을 골라 읽으면 모르는 낱말이 있어도 내용을 짐작하기 쉬워요.',
      easy: '글은 "우산"과 같아요. 중심 내용은 우산 전체이고, 세부 내용은 우산살 하나하나예요.\n\n"토요일마다 한다", "작년에 시작했다"는 우산살이에요. 이 우산살을 모두 덮는 말, 예를 들어 "나는 자전거 타기를 정말 좋아한다"가 우산, 곧 중심 내용이에요.',
      check: {
        type: 'choice',
        q: '다음 글의 중심 내용으로 가장 알맞은 것을 고르세요.\n\nMy hobby is riding my bike. I ride it along the river every Saturday. Riding a bike makes me strong and happy. I love my hobby.',
        choices: ['글쓴이는 자전거 타기를 취미로 즐겨요.', '글쓴이는 토요일마다 강가에 가요.', '강가에는 자전거 길이 있어요.'],
        answer: 0,
        why: ['', '토요일마다 강가에서 탄다는 것은 세부 내용이에요. 모든 문장을 아우르는 말을 골라요.', '글에 나오지 않는 내용이에요. 글쓴이는 자기 취미를 이야기하고 있어요.'],
        explain: '첫 문장(My hobby is riding my bike.)과 마지막 문장(I love my hobby.)이 모두 자전거 타기라는 취미를 말하고, riding/ride가 여러 번 나와요. 중심 내용은 "자전거 타기를 취미로 즐긴다"예요.',
      },
    },
  ],

  examples: [
    {
      q: '괄호 안의 동사를 알맞은 형태로 바꾸어 빈칸을 채우세요.\n\nMinsu decided [[빈칸]] the drama club. (join)',
      steps: [
        '빈칸 앞의 동사를 봐요. decided(결심했다)예요.',
        'decide는 목적어로 to부정사만 쓰는 동사예요. "앞으로 할 일"을 정하는 말이지요.',
        'to 뒤에는 동사원형을 쓰므로 **to join**이에요. 과거 이야기여도 to joined로 쓰지 않아요.',
        '해석: 민수는 연극 동아리에 들어가기로 결심했어요.',
      ],
      answer: 'to join',
    },
    {
      q: '어법상 틀린 곳을 찾아 바르게 고치세요.\n\nI\'m interested in learn Chinese, so I practice to speak it every day.',
      steps: [
        'interested in의 in은 전치사예요. 전치사 뒤에는 동명사를 써야 하므로 learn → **learning**.',
        'practice는 목적어로 동명사를 쓰는 동사예요. to speak → **speaking**.',
        '고친 문장: I\'m interested in **learning** Chinese, so I practice **speaking** it every day.',
        '해석: 나는 중국어 배우기에 관심이 있어서 매일 그것을 말하는 연습을 해요.',
      ],
      answer: 'learn → learning, to speak → speaking',
    },
  ],

  terms: [
    { term: '동명사', def: '동사원형에 -ing를 붙여 "~하는 것, ~하기"라는 뜻의 명사처럼 쓰는 말이에요. 예: Swimming is fun.' },
    { term: 'to부정사', def: 'to + 동사원형 꼴의 말이에요. 문장에서 명사처럼 "~하는 것"이라는 뜻으로 쓰일 수 있어요. 예: I want to swim.' },
    { term: '명사적 용법', def: 'to부정사가 문장에서 명사처럼 주어·목적어·보어 자리에 쓰이는 것이에요. "~하는 것, ~하기"로 해석해요.' },
    { term: '목적어', def: '동사가 나타내는 행동의 대상이 되는 말이에요. "~을/를"로 해석해요. 예: I like music.에서 music' },
    { term: '보어', def: 'be동사 같은 동사 뒤에서 주어가 무엇인지, 어떤지를 보충해 주는 말이에요. 예: My hobby is cooking.에서 cooking' },
    { term: '전치사', def: 'at, in, on, about, for처럼 명사(또는 동명사) 앞에 놓여 장소·시간·대상 등을 나타내는 말이에요.' },
    { term: '중심 내용', def: '글쓴이가 글 전체에서 가장 하고 싶은 말이에요. 영어로 main idea라고 해요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르세요.\n\nI enjoy [[빈칸]] pictures of flowers.',
      choices: ['taking', 'to take', 'take', 'took'],
      answer: 0,
      why: ['', 'enjoy는 목적어로 to부정사를 쓰지 않아요.', '동사 enjoy 뒤에 동사원형을 바로 쓸 수 없어요.', 'took는 과거형 동사예요. 동사 두 개를 그냥 이어 쓸 수 없어요.'],
      explain: 'enjoy는 목적어로 동명사만 써요. I enjoy **taking** pictures of flowers.(나는 꽃 사진 찍는 것을 즐겨요.)',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르세요.\n\nWe want [[빈칸]] a new bike.',
      choices: ['to buy', 'buying', 'buys', 'bought'],
      answer: 0,
      why: ['', 'want는 목적어로 동명사를 쓰지 않아요. want 뒤에는 to부정사가 와요.', 'buys는 동사의 3인칭 단수형이에요. 동사 뒤에 동사를 바로 이어 쓸 수 없어요.', 'bought는 과거형 동사예요. want 뒤에는 to + 동사원형을 써요.'],
      explain: 'want는 목적어로 to부정사만 써요. We want **to buy** a new bike.(우리는 새 자전거를 사고 싶어요.)',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 2,
      q: '괄호 안의 동사를 알맞은 형태로 바꾸어 빈칸에 쓰세요.\n\nDid you finish [[빈칸]] the dishes? (wash)',
      answer: ['washing'],
      wrong: [
        { a: 'to wash', why: 'finish는 목적어로 to부정사를 쓰지 않아요. finish 뒤에는 동명사를 써요.' },
        { a: 'wash', why: 'finish 뒤에 동사원형을 바로 쓸 수 없어요. -ing를 붙여 동명사로 바꿔요.' },
      ],
      explain: 'finish는 목적어로 동명사만 써요. Did you finish **washing** the dishes?(설거지 다 했니?)',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 0,
      q: 'Reading comic books are my hobby.는 바른 문장이에요.',
      answer: false,
      explain: '주어는 Reading comic books(만화책 읽는 것)라는 **한 가지 일**이에요. 동명사 주어는 단수로 취급하므로 are가 아니라 **is**를 써요. 바른 문장: Reading comic books **is** my hobby.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말을 고르세요.\n\nMy dream is [[빈칸]] a famous singer.',
      choices: ['to become', 'become', 'becomes', 'became'],
      answer: 0,
      why: ['', 'is 뒤에 동사원형을 바로 쓸 수 없어요. "~가 되는 것"은 to + 동사원형으로 나타내요.', 'becomes는 동사예요. 한 문장에 is와 becomes를 함께 동사로 쓸 수 없어요.', 'became은 과거형 동사예요. "되는 것"이라는 뜻의 to become을 써요.'],
      explain: '보어 자리에 "유명한 가수가 되는 것"이 와야 하므로 to부정사 **to become**을 써요. My dream is to become a famous singer.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말을 고르세요.\n\nJiwoo is interested in [[빈칸]] robots.',
      choices: ['making', 'to make', 'make', 'made'],
      answer: 0,
      why: ['', '전치사 in 뒤에는 to부정사를 쓰지 않아요.', '전치사 in 뒤에 동사원형을 쓸 수 없어요.', 'made는 과거형 동사예요. 전치사 뒤에는 동명사를 써요.'],
      explain: 'in은 전치사이므로 뒤에 동명사를 써요. Jiwoo is interested in **making** robots.(지우는 로봇 만들기에 관심이 있어요.)',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 3,
      q: '괄호 안의 동사를 알맞은 형태로 바꾸어 빈칸에 쓰세요.\n\nHow about [[빈칸]] to the park after school? (go)',
      answer: ['going'],
      wrong: [
        { a: 'to go', why: 'How about의 about은 전치사예요. 전치사 뒤에는 to부정사가 아니라 동명사를 써요.' },
        { a: 'go', why: '전치사 about 뒤에 동사원형을 쓸 수 없어요. -ing를 붙여요.' },
      ],
      explain: 'How about -ing?는 "~하는 게 어때?"라는 제안이에요. How about **going** to the park after school?(방과 후에 공원에 가는 게 어때?)',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 2,
      q: '빈칸에 들어갈 수 **없는** 것을 고르세요.\n\nI [[빈칸]] to learn Chinese.',
      choices: ['enjoy', 'want', 'hope', 'decided'],
      answer: 0,
      why: ['', 'want는 to부정사를 목적어로 써요. I want to learn Chinese.는 바른 문장이에요.', 'hope는 to부정사를 목적어로 써요. I hope to learn Chinese.는 바른 문장이에요.', 'decide는 to부정사를 목적어로 써요. I decided to learn Chinese.는 바른 문장이에요.'],
      hint: '각 동사가 동명사와 to부정사 가운데 무엇과 짝인지 떠올려 보세요.',
      explain: 'want, hope, decide는 to부정사를 목적어로 쓰지만, **enjoy**는 동명사만 써요. enjoy를 쓰려면 I enjoy learning Chinese.라고 해야 해요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'text', concept: 2,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 한 낱말을 쓰세요.\n\nMinsu likes to play badminton.\n= Minsu likes [[빈칸]] badminton.',
      answer: ['playing'],
      wrong: [{ a: 'play', why: 'likes 뒤에 동사원형을 바로 쓸 수 없어요. 한 낱말로 "~하는 것"을 나타내려면 동명사를 써요.' }],
      hint: 'like는 동명사와 to부정사를 모두 목적어로 쓸 수 있어요.',
      explain: 'like는 목적어로 동명사와 to부정사를 둘 다 쓰고 뜻이 거의 같아요. to play를 한 낱말로 바꾸면 동명사 **playing**이에요.',
    },
    {
      id: 'p10', level: 2, type: 'order', concept: 0,
      q: '우리말에 맞게 순서대로 놓으세요.\n\n내 취미는 쿠키를 굽는 것이에요.',
      choices: ['My hobby', 'is', 'baking', 'cookies.'],
      answer: [0, 1, 2, 3],
      explain: 'My hobby(주어) + is(동사) + baking cookies(보어: 쿠키를 굽는 것). 동명사 baking이 보어 자리에 쓰였어요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '다음 글의 중심 내용으로 가장 알맞은 것을 고르세요.\n\nHi, I\'m Seojun. My hobby is growing plants. I started growing them last year. Every morning, I water my plants and check their leaves. Watching them grow makes me happy. Next spring, I want to grow tomatoes, too.',
      choices: ['서준이는 식물 기르기를 취미로 즐겨요.', '서준이는 내년 봄에 토마토를 기를 계획이에요.', '식물에는 아침마다 물을 주어야 해요.', '서준이는 작년에 새로운 운동을 시작했어요.'],
      answer: 0,
      why: ['', '마지막 문장의 세부 내용이에요. 글 전체를 아우르는 말이 아니에요.', '서준이가 하는 일 가운데 하나일 뿐, 모든 식물에 대한 규칙을 말하는 글이 아니에요.', '글에는 운동 이야기가 없어요. 작년에 시작한 것은 식물 기르기예요.'],
      hint: '첫 부분의 My hobby is …와 여러 번 나오는 낱말(grow, plants)을 찾아보세요.',
      explain: 'My hobby is growing plants.로 취미를 밝힌 뒤 언제 시작했는지, 매일 무엇을 하는지, 왜 좋은지, 앞으로 하고 싶은 것을 차례로 말해요. 모든 문장이 "식물 기르기라는 취미"에 대한 것이므로 이것이 중심 내용이에요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 2,
      q: '어법상 **틀린** 문장을 고르세요.',
      choices: ['I hope to see you again.', 'She finished cleaning her room.', 'They decided going camping.', 'He is good at drawing.'],
      answer: 2,
      why: ['hope는 to부정사를 목적어로 써요. 바른 문장이에요.', 'finish는 동명사를 목적어로 써요. 바른 문장이에요.', '', '전치사 at 뒤에 동명사를 썼어요. 바른 문장이에요.'],
      explain: 'decide는 목적어로 to부정사만 써요. They decided going camping.은 틀렸고, They decided **to go** camping.(그들은 캠핑을 가기로 결정했어요.)이 바른 문장이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '밑줄 친 부분의 쓰임이 나머지 셋과 **다른** 것을 고르세요.',
      choices: ['My hobby is __collecting__ stamps.', '__Swimming__ in the sea is exciting.', 'He is __reading__ a book in his room now.', 'I enjoy __watching__ old movies.'],
      answer: 2,
      why: ['is 뒤에서 "우표를 모으는 것"이라는 뜻의 동명사(보어)예요.', '"바다에서 수영하는 것"이라는 뜻의 동명사(주어)예요.', '', 'enjoy의 목적어로 쓰인 동명사(옛날 영화 보는 것)예요.'],
      hint: '"~하는 것"으로 해석되는지, "~하고 있다"로 해석되는지 따져 보세요.',
      explain: 'He is reading a book now.의 reading은 "읽고 있다"라는 **현재진행형**이에요. 나머지 셋은 모두 "~하는 것"이라는 뜻의 **동명사**예요. 모양은 같아도 is reading은 "책을 읽는 것이다"가 아니라 "읽고 있다"로 해석되지요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', fixed: true, concept: 2,
      q: '다음 중 어법상 바른 문장은 모두 몇 개일까요?\n\n- I want going home now.\n- Thank you for helping me.\n- She is interested in to cook.\n- Learning new words is fun.\n- We finished to paint the wall.',
      choices: ['1개', '2개', '3개', '4개'],
      answer: 1,
      why: ['바른 문장을 하나 빠뜨렸어요. 전치사 뒤 동명사와 동명사 주어를 다시 보세요.', '', '틀린 문장을 바르다고 보았어요. want와 finish의 목적어 짝을 확인해 보세요.', '틀린 문장이 셋이에요. 동사와 전치사 뒤의 형태를 하나씩 확인해 보세요.'],
      hint: '동사마다 목적어 짝(동명사·to부정사)을, 전치사 뒤의 형태를 하나씩 확인하세요.',
      explain: '바른 문장은 Thank you for helping me.(전치사 for + 동명사)와 Learning new words is fun.(동명사 주어 + is) 두 개예요.\n\n- want going → want **to go**\n- interested in to cook → interested in **cooking**\n- finished to paint → finished **painting**',
    },
    {
      id: 'a3', level: 3, type: 'order', concept: 3,
      q: '우리말에 맞게 순서대로 놓으세요.\n\n나는 피아노를 잘 치게 되고 싶어요.',
      choices: ['I want', 'to be', 'good at', 'playing', 'the piano.'],
      answer: [0, 1, 2, 3, 4],
      hint: 'want 뒤에는 to부정사, 전치사 at 뒤에는 동명사가 와요.',
      explain: 'I want + to be good at(~을 잘하게 되는 것을 원해요) + playing the piano(피아노 치는 것). want의 목적어로 to부정사를, 전치사 at 뒤에는 동명사를 썼어요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'text', concept: 2,
      q: '다음 글을 읽고, 괄호 안의 동사를 알맞은 형태로 바꾸어 빈칸에 쓰세요.\n\nMy name is Hayun. Baking bread is my favorite hobby. I started baking two years ago. On weekends, I bake bread for my family. They love my bread. I hope [[빈칸]] my own bakery someday. (open)',
      answer: ['to open'],
      wrong: [{ a: 'opening', why: 'hope는 목적어로 동명사를 쓰지 않아요. 앞으로 하고 싶은 일을 바라는 말이라 to부정사를 써요.' }, { a: 'open', why: 'hope 뒤에 동사원형만 쓸 수는 없어요. to를 함께 써요.' }],
      hint: 'hope는 동명사와 to부정사 가운데 무엇과 짝일까요?',
      explain: 'hope는 목적어로 to부정사만 써요. I hope **to open** my own bakery someday.(나는 언젠가 내 빵집을 열기를 바라요.) 글의 중심 내용은 "하윤이는 빵 굽기를 가장 좋아하는 취미로 즐긴다"예요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: '다음 글의 중심 내용으로 가장 알맞은 것을 고르세요.\n\nSome people think playing board games is just for fun. But board games teach us many things. When we play, we need to follow the rules. We also learn to wait for our turn. Sometimes we lose, and we learn to accept it. Playing board games helps us learn good habits.',
      choices: ['보드게임을 하면서 좋은 습관을 배울 수 있어요.', '보드게임은 재미로만 하는 놀이예요.', '보드게임을 할 때는 차례를 기다려야 해요.', '보드게임에서 지면 기분이 나빠요.'],
      answer: 0,
      why: ['', '글쓴이가 반대하려고 꺼낸 생각이에요. 바로 뒤에 But이 나오지요.', '좋은 습관의 예 가운데 하나인 세부 내용이에요.', '글에 나오지 않는 내용이에요. 글쓴이는 지는 것을 받아들이는 법을 배운다고 했어요.'],
      hint: 'But 뒤의 문장과 마지막 문장을 살펴보세요.',
      explain: '첫 문장은 글쓴이가 반박하려는 생각이고, **But** 뒤에서 보드게임이 많은 것을 가르쳐 준다고 말해요. 규칙 지키기, 차례 기다리기, 지는 것 받아들이기는 그 예이고, 마지막 문장이 이를 정리해요. 중심 내용은 "보드게임으로 좋은 습관을 배울 수 있다"예요.',
    },
  ],

  deeper: [
    {
      title: '뜻이 달라지는 동사도 있어요',
      body: 'like, start는 동명사를 써도 to부정사를 써도 뜻이 거의 같아요. 그런데 몇몇 동사는 무엇을 쓰느냐에 따라 **뜻이 달라져요.** 중학교 2~3학년에서 더 자세히 배워요.\n\n| 문장 | 뜻 |\n|---|---|\n| I **stopped eating** snacks. | 나는 과자 먹는 것을 **그만두었어요**. (eating이 stop의 목적어) |\n| I **stopped to eat** snacks. | 나는 과자를 **먹으려고** 멈추었어요. (to eat는 목적) |\n| Don\'t **forget to bring** your book. | 책 가져오는 것을 잊지 마. (앞으로 할 일) |\n| I **remember meeting** her. | 나는 그녀를 만났던 것을 기억해요. (이미 한 일) |\n\n이 단원에서 배운 느낌, 곧 **to부정사는 앞으로 할 일, 동명사는 이미 하고 있거나 한 일**과 잘 어울린다는 생각이 여기서도 도움이 돼요.',
    },
    {
      title: '주어 자리의 to부정사와 가주어 it',
      body: 'To learn a new language is exciting.처럼 to부정사를 주어로 쓸 수 있지만, 영어에서는 긴 주어를 문장 맨 앞에 두는 것을 그리 좋아하지 않아요. 그래서 실제로는 **It is exciting to learn a new language.**처럼 it을 앞에 두고 to부정사를 뒤로 보내는 경우가 많아요.\n\n이 it은 "그것"이라고 해석하지 않는 **가주어**예요. 중학교 2학년에서 자세히 배워요. 지금은 주어 자리에 동명사(Learning a new language is exciting.)를 쓰는 것이 자연스럽다는 것을 기억해 두세요.',
    },
  ],

  faq: [
    {
      q: '동명사랑 현재진행형은 둘 다 -ing인데 어떻게 구별해요?',
      a: '해석해 보면 알 수 있어요. "~하는 것, ~하기"로 해석되면 동명사, "~하고 있다"로 해석되면 현재진행형이에요.\n\nMy hobby is **dancing**.은 "내 취미는 춤추는 것이다"(동명사), She is **dancing** now.는 "그녀는 지금 춤추고 있다"(진행형)예요. 주어가 사람이고 그 사람이 지금 그 행동을 하는 중이면 진행형인 경우가 많아요.',
    },
    {
      q: 'like 뒤에는 동명사를 써도 되고 to부정사를 써도 되면 뜻이 완전히 같아요?',
      a: 'I like swimming.과 I like to swim.은 둘 다 "나는 수영하는 것을 좋아해요"로, 이 단계에서는 같은 뜻으로 보면 돼요. start, begin, love도 마찬가지예요. 다만 stop, remember, forget처럼 뜻이 달라지는 동사도 있으니 심화 학습을 읽어 보세요.',
    },
    {
      q: '왜 전치사 뒤에는 to부정사를 못 써요?',
      a: '전치사 뒤에는 명사가 와야 하는데, 동명사는 명사처럼 쓰이는 말이라 들어갈 수 있어요. to부정사도 명사처럼 쓰이긴 하지만 전치사 뒤에는 쓰지 않아요. 그래서 be good at swimming, be interested in drawing처럼 동명사를 써요.',
    },
    {
      q: 'enjoy는 동명사, want는 to부정사인 걸 어떻게 다 외워요?',
      a: '자주 쓰는 동사부터 예문째로 외우는 것이 가장 좋아요. "I enjoy reading. I want to travel."처럼 짧은 문장을 소리 내어 읽으면 귀에 익어요. 앞으로 할 일을 바라거나 정하는 동사(want, hope, decide, plan)는 to부정사와 어울린다는 느낌도 기억에 도움이 돼요.',
    },
  ],

  mistakes: [
    'enjoy, finish 뒤에 to부정사를 쓰는 실수 — I enjoy to read.(✗) → I enjoy **reading**.',
    '전치사 뒤에 동사원형이나 to부정사를 쓰는 실수 — I\'m good at to dance.(✗) → I\'m good at **dancing**.',
    '동명사 주어 뒤에 are를 쓰는 실수 — Playing games are fun.(✗) → Playing games **is** fun. (동명사 주어는 단수)',
  ],

  gens: [
    {
      id: 'verb-object-form',
      level: 1,
      title: '동사에 맞는 목적어 형태 고르기 (동명사·to부정사)',
      make: function (R) {
        // [과거형, 원형, 동명사를 쓰는가]
        var verbs = [
          ['enjoyed', 'enjoy', true], ['finished', 'finish', true], ['kept', 'keep', true], ['practiced', 'practice', true],
          ['wanted', 'want', false], ['hoped', 'hope', false], ['decided', 'decide', false], ['planned', 'plan', false], ['needed', 'need', false],
        ];
        // [동사원형, 동명사, 뒤에 오는 말, 뜻]
        var acts = [
          ['read', 'reading', 'the story', '그 이야기를 읽는 것'],
          ['play', 'playing', 'the piano', '피아노를 치는 것'],
          ['bake', 'baking', 'cookies', '쿠키를 굽는 것'],
          ['take', 'taking', 'pictures', '사진을 찍는 것'],
          ['learn', 'learning', 'Chinese', '중국어를 배우는 것'],
          ['draw', 'drawing', 'cartoons', '만화를 그리는 것'],
          ['practice', 'practicing', 'the song', '그 노래를 연습하는 것'],
        ];
        var subjects = ['Minsu', 'Jia', 'We', 'They', 'My sister'];
        var v = R.pick(verbs);
        var a = R.pick(acts);
        while (a[0] === v[1]) a = R.pick(acts); // practice practicing 같은 문장은 피한다
        var s = R.pick(subjects);
        var ing = a[1];
        var inf = 'to ' + a[0];
        var correct = v[2] ? ing : inf;
        var cands = [v[2] ? inf : ing, a[0], a[0] === 'read' ? 'reads' : (a[0] + 's')];
        var pick = R.choices(correct, cands, 3);
        var reasons = {};
        reasons[ing] = '동사 ' + v[1] + ' 뒤 목적어 자리에는 동명사가 아니라 to부정사를 써요.';
        reasons[inf] = '동사 ' + v[1] + ' 뒤 목적어 자리에는 to부정사가 아니라 동명사를 써요.';
        reasons[a[0]] = '동사 ' + v[0] + ' 뒤에 동사원형을 바로 이어 쓸 수 없어요.';
        reasons[cands[2]] = '동사의 3인칭 단수형이에요. 동사 두 개를 그냥 이어 쓸 수 없어요.';
        return {
          type: 'choice', concept: 2,
          q: '빈칸에 알맞은 말을 고르세요.\n\n' + s + ' ' + v[0] + ' [[빈칸]] ' + a[2] + '.',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reasons[c]; }),
          explain: '동사 ' + v[1] + ' 뒤 목적어 자리에는 ' + (v[2] ? '동명사' : 'to부정사') + '만 써요. ' + s + ' ' + v[0] + ' **' + correct + '** ' + a[2] + '.에서 ' + correct + ' ' + a[2] + '의 뜻은 "' + a[3] + '"이에요.',
        };
      },
    },
  ],

  vocab: [
    { w: 'hobby', m: '취미', ex: 'My hobby is collecting stamps.', exm: '내 취미는 우표를 모으는 것이에요.' },
    { w: 'collect', m: '모으다, 수집하다', ex: 'He collects old coins.', exm: '그는 옛날 동전을 모아요.' },
    { w: 'enjoy', m: '즐기다', ex: 'We enjoy playing board games.', exm: '우리는 보드게임 하는 것을 즐겨요.' },
    { w: 'finish', m: '끝내다, 마치다', ex: 'I finished writing my diary.', exm: '나는 일기 쓰기를 마쳤어요.' },
    { w: 'decide', m: '결정하다, 결심하다', ex: 'She decided to learn the guitar.', exm: '그녀는 기타를 배우기로 결심했어요.' },
    { w: 'hope', m: '바라다, 희망하다', ex: 'I hope to win the race.', exm: '나는 경주에서 이기기를 바라요.' },
    { w: 'dream', m: '꿈', ex: 'My dream is to be a pilot.', exm: '내 꿈은 비행기 조종사가 되는 것이에요.' },
    { w: 'bake', m: '(빵·과자를) 굽다', ex: 'Let\'s bake some bread together.', exm: '함께 빵을 좀 구워요.' },
    { w: 'grow', m: '기르다, 자라다', ex: 'My grandma grows vegetables in her garden.', exm: '우리 할머니는 정원에서 채소를 기르세요.' },
    { w: 'practice', m: '연습하다', ex: 'I practice playing the violin every day.', exm: '나는 매일 바이올린 연주를 연습해요.' },
    { w: 'join', m: '가입하다, 함께하다', ex: 'Do you want to join our club?', exm: '우리 동아리에 들어올래?' },
    { w: 'interested', m: '관심 있는', ex: 'I\'m interested in making videos.', exm: '나는 영상 만들기에 관심이 있어요.' },
    { w: 'favorite', m: '가장 좋아하는', ex: 'Drawing is my favorite activity.', exm: '그리기는 내가 가장 좋아하는 활동이에요.' },
    { w: 'free time', m: '여가 시간, 자유 시간', ex: 'What do you do in your free time?', exm: '너는 여가 시간에 무엇을 하니?' },
  ],
});
