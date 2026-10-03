/* 중2 영어 · 사실 전달하기 (수동태) */
(function () {
  // 직접 쓴 설명문 (실제 문화유산 · 가상의 학교 도서관)
  var CHEOM = '**Cheomseongdae**\n\nCheomseongdae is located in Gyeongju. It was built about 1,400 years ago, during the Silla Kingdom. It was made of hundreds of stones. Many people think it was used to watch the stars. It is known as one of the oldest observatories in Asia. Today, it is visited by many tourists every year.';
  var LIB = '**Our New School Library**\n\nOur school has a new library. It was built last summer and was opened in September. The walls are made of wood, so the room smells nice. The shelves are filled with more than 5,000 books. The library is used by students every day. Many students are interested in the reading club which meets there on Fridays.';

Tutor.registerUnit({
  id: 'eng-m2-04',
  course: 'eng-m2',
  title: '사실 전달하기 (수동태)',
  summary: 'be동사 + 과거분사로 나타내는 수동태를 익혀, 행동한 사람보다 대상에 초점을 두고 사실을 설명해요.',
  goals: [
    'be동사 + 과거분사로 수동태를 만들고 "~되다, ~받다"의 뜻을 알 수 있어요.',
    '능동태 문장을 수동태로 바꾸고, by + 행위자를 쓰지 않는 경우를 알 수 있어요.',
    '수동태의 현재·과거 시제와 부정문·의문문을 만들 수 있어요.',
    'be made of, be interested in, be covered with 같은 표현을 쓰고, 설명문의 중심 내용을 찾을 수 있어요.',
  ],
  standards: ['[9영02-03]', '[9영01-03]', '[9영01-02]'],

  concepts: [
    {
      title: '수동태의 형태와 뜻: be + 과거분사',
      body: '문장의 주어가 어떤 일을 **하는** 것이면 **능동태**, 주어가 어떤 일을 **당하는(받는)** 것이면 **수동태**예요.\n\n- 능동태: Minsu **cleans** the room. (민수가 방을 청소해요.)\n- 수동태: The room **is cleaned** by Minsu. (방이 민수에 의해 청소돼요.)\n\n수동태는 **be동사 + 과거분사**로 쓰고, "~되다, ~받다, ~당하다"라는 뜻이에요. be동사는 **주어**에 맞춰요.\n\n| 주어 | 수동태 | 예문 |\n|---|---|---|\n| I | am + 과거분사 | I **am loved** by my family. |\n| 3인칭 단수 | is + 과거분사 | English **is spoken** in Canada. |\n| 복수, you | are + 과거분사 | These cars **are made** in Korea. |\n\n**왜 수동태를 쓸까요?** 누가 했는지보다 **무엇이 그렇게 되었는지**가 더 중요할 때 써요. 건물, 발명품, 작품을 소개할 때 자주 써요.\n\n> 💡 과거분사는 현재완료(have + 과거분사)에서 배운 바로 그 "세 번째 모양"이에요. make – made – **made**, speak – spoke – **spoken**',
      easy: '같은 일을 **카메라를 어디에 두고 찍느냐**의 차이라고 생각해 보세요.\n\n- 카메라가 **민수**를 비추면: Minsu cleans the room. (민수가 청소해요)\n- 카메라가 **방**을 비추면: The room is cleaned. (방이 청소돼요)\n\n방을 주인공으로 삼으면 방은 스스로 청소하지 못하니 "청소된다"고 말해야 하지요. 그래서 is cleaned처럼 be + 과거분사를 써요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nEnglish [[빈칸]] in many countries.\n(영어는 많은 나라에서 쓰여요.)',
        choices: ['is spoken', 'speaks', 'is speaking'],
        answer: 0,
        why: ['', 'English가 스스로 말하는 것이 아니에요. "쓰인다, 말해진다"이니 수동태로 써요.', 'is speaking은 "말하고 있다"는 진행형이에요. 영어는 말하는 주체가 아니라 말해지는 대상이에요.'],
        explain: '영어는 사람들에 의해 "말해지는" 것이니 수동태 **is spoken**(be + 과거분사)를 써요. speak – spoke – spoken',
      },
    },
    {
      title: '능동태를 수동태로 바꾸기',
      body: '능동태를 수동태로 바꾸는 순서는 세 단계예요.\n\n예: **Jia** painted **this picture**. (지아가 이 그림을 그렸어요.)\n\n1. 능동태의 **목적어**를 수동태의 **주어**로: This picture\n2. 동사를 **be + 과거분사**로. 시제는 그대로, be동사는 새 주어에 맞춰요: painted(과거) → **was painted**\n3. 능동태의 **주어**를 **by + 목적격**으로 맨 뒤에: **by Jia**\n\n→ This picture **was painted by Jia**. (이 그림은 지아에 의해 그려졌어요.)\n\n대명사는 꼴이 바뀌어요: He wrote it. → It was written **by him**. (he → him, she → her, they → them)\n\n**by + 행위자를 쓰지 않는 경우**\n- 행위자가 **일반 사람들**일 때: People speak English in Canada. → English is spoken in Canada.\n- 행위자를 **모르거나 중요하지 않을** 때: My bike was stolen. (누가 훔쳤는지 몰라요)\n\n> ⚠️ 목적어가 없는 동사(happen, arrive, appear …)는 수동태로 쓸 수 없어요. The accident was happened.(✗) → The accident **happened**.',
      easy: '수동태로 바꾸기는 **자리 바꾸기 놀이**예요.\n\n- 뒤에 있던 것(목적어)이 앞으로 나와 주인공이 되고,\n- 앞에 있던 것(주어)은 뒤로 가서 **by** 뒤에 서요.\n- 가운데 동사는 "be + 과거분사" 옷으로 갈아입어요.\n\nJia painted this picture. → This picture was painted by Jia.\n\n누가 했는지 모르거나 모두가 다 아는 사람들(people)이면, 뒤로 간 친구는 아예 빼도 돼요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nShe wrote the letter.\n= The letter was written by [[빈칸]].',
        choices: ['her', 'she', 'hers'],
        answer: 0,
        why: ['', 'by 같은 전치사 뒤에는 목적격을 써요. she는 주격이에요.', 'hers는 "그녀의 것"이라는 뜻이에요. "그녀에 의해"는 by her예요.'],
        explain: '능동태의 주어 She를 by 뒤로 보낼 때는 목적격 **her**로 바꿔요. The letter was written by her.',
      },
    },
    {
      title: '수동태의 시제와 부정문·의문문',
      body: '수동태의 시제는 **be동사**가 나타내요. 과거분사는 그대로예요.\n\n| 시제 | 형태 | 예문 |\n|---|---|---|\n| 현재 | am/is/are + 과거분사 | Cheese **is made** from milk. |\n| 과거 | was/were + 과거분사 | This bridge **was built** in 2010. |\n\n**부정문**: be동사 뒤에 **not**\n- The door **was not(wasn\'t) locked**. (문이 잠겨 있지 않았어요.)\n- These toys **aren\'t sold** here.\n\n**의문문**: **be동사를 주어 앞**으로\n- **Was** this house **built** by your grandfather? — Yes, it **was**. / No, it **wasn\'t**.\n- 의문사가 있으면 의문사 + be동사 + 주어 + 과거분사: **When was** the tower **built**? / **Where are** these shoes **made**?\n\n> ⚠️ 수동태 문장에는 do/did를 쓰지 않아요. Did the house built?(✗) → **Was** the house built?',
      easy: '수동태에서 be동사는 **시계와 스위치** 역할을 해요.\n\n- 시계: is는 지금, was는 예전 — 언제 일어난 일인지 알려 줘요.\n- 스위치: be동사 뒤에 not을 붙이면 부정, be동사를 맨 앞으로 옮기면 질문.\n\n과거분사(built, made)는 시간이 바뀌어도, 질문이 되어도 그대로 자리를 지켜요.',
      check: {
        type: 'choice',
        q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\nThis photo [[빈칸]] last week.\n(이 사진은 지난주에 찍혔어요.)',
        choices: ['was taken', 'is taken', 'took'],
        answer: 0,
        why: ['', 'last week는 과거예요. 현재형 is 대신 과거형 was를 써요.', 'took은 "찍었다"라는 능동태예요. 사진은 찍힌 대상이라 수동태를 써요.'],
        explain: '지난주의 일이니 과거, 사진은 찍히는 대상이니 수동태예요. **was taken**(was + 과거분사). take – took – taken',
      },
    },
    {
      title: 'by 이외의 전치사를 쓰는 수동태',
      body: '어떤 수동태는 by가 아닌 **다른 전치사**와 짝을 지어 하나의 표현처럼 써요. 덩어리째 외워 두세요.\n\n| 표현 | 뜻 | 예문 |\n|---|---|---|\n| be made **of** | ~으로 만들어지다(재료가 보임) | This desk **is made of** wood. |\n| be interested **in** | ~에 관심이 있다 | I **am interested in** science. |\n| be covered **with** | ~으로 덮여 있다 | The mountain **is covered with** snow. |\n| be filled **with** | ~으로 가득 차 있다 | The box **is filled with** toys. |\n| be known **for** | ~으로 유명하다 | Jeonju **is known for** bibimbap. |\n| be surprised **at** | ~에 놀라다 | We **were surprised at** the news. |\n| be pleased **with** | ~에 기뻐하다 | Mom **was pleased with** my gift. |\n\n> 💡 재료의 모양이 그대로 남아 있으면 be made **of**(나무 책상), 재료가 다른 것으로 바뀌어 원래 모습이 안 보이면 be made **from**을 써요. Cheese is made **from** milk.\n\n> 💡 be interested in, be surprised at처럼 **감정**을 나타내는 표현이 많아요. 감정은 무엇인가에 의해 "생기는" 것이라 수동태 꼴로 써요.',
      easy: '이 표현들은 **짝꿍 전치사**가 정해져 있어요. 그림으로 기억해 보세요.\n\n- 산 위에 눈 이불: covered **with** (~을 덮고)\n- 상자 속 가득: filled **with**\n- 나무 결이 보이는 책상: made **of**\n- 마음이 쏙 들어가 있는 관심: interested **in** (안으로 in)\n- 깜짝 놀란 그 순간: surprised **at**\n\n짝꿍을 바꾸면 틀린 표현이 되니 통째로 소리 내어 외워요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nThe box is filled [[빈칸]] old toys.',
        choices: ['with', 'of', 'at'],
        answer: 0,
        why: ['', 'be made of(~으로 만들어지다)와 헷갈렸어요. "~으로 가득 차 있다"는 be filled with예요.', 'be surprised at(~에 놀라다)의 짝꿍 전치사예요.'],
        explain: '"~으로 가득 차 있다"는 **be filled with**예요. "그 상자는 낡은 장난감으로 가득 차 있어요."',
      },
    },
    {
      title: '설명문에서 중심 내용 찾기',
      body: '건축물이나 발명품을 소개하는 **설명문**에는 수동태가 많이 나와요. 누가 만들었는지보다 **그 대상이 언제, 무엇으로, 어떻게** 만들어졌는지가 중요하기 때문이에요.\n\n- It **was built** in 1990. (언제)\n- It **is made of** glass. (무엇으로)\n- It **is visited** by many people. (지금 어떤지)\n\n**중심 내용**(main idea)은 글 전체가 말하려는 한 가지예요. 찾는 방법:\n1. **제목**과 **첫 문장**을 봐요. 무엇에 대한 글인지 알려 줘요.\n2. 글에서 **되풀이되는 대상**(It, the tower …)을 찾아요.\n3. 세부 정보(연도, 재료, 수)는 중심 내용을 뒷받침하는 말이에요.\n\n예: The tower was built in 1950. It is made of steel. It is visited by many tourists. → 중심 내용: 그 탑에 대한 소개',
      easy: '설명문은 **박물관 안내판**과 비슷해요. 맨 위에 큰 글씨로 이름이 있고, 아래에 "언제 지어졌는지, 무엇으로 만들었는지, 지금 어떤지"가 적혀 있지요.\n\n중심 내용을 물으면 안내판의 **큰 글씨(제목)**가 무엇인지 떠올리면 돼요. 작은 글씨의 숫자나 재료는 세부 정보예요.',
      check: {
        type: 'ox',
        q: '설명문에서 연도나 재료 같은 세부 정보는 중심 내용을 뒷받침하는 말이에요.',
        answer: true,
        explain: '중심 내용은 글 전체가 말하려는 한 가지(예: 그 건물에 대한 소개)이고, 연도·재료·수는 그것을 자세히 설명하는 **세부 정보**예요.',
      },
    },
  ],

  examples: [
    {
      q: '능동태를 수동태로 바꿔 보세요.\n\nMy grandfather built this house in 1985.',
      steps: [
        '목적어 this house를 주어로 보내요: This house',
        '동사 built는 과거이고 새 주어 This house는 단수이므로 was + 과거분사: **was built**',
        '주어 My grandfather는 by 뒤로: by my grandfather',
        '때를 나타내는 in 1985는 그대로 둬요.',
      ],
      answer: 'This house **was built by my grandfather** in 1985.',
    },
    {
      q: '다음 문장을 의문문으로 바꾸고, Yes로 답해 보세요.\n\nThese cookies were made by Hayun.',
      steps: [
        '수동태의 의문문은 be동사를 주어 앞으로 보내요: **Were** these cookies made by Hayun?',
        '대답은 be동사로 해요. 주어 these cookies는 대명사 they로 바꿔요.',
      ],
      answer: '**Were** these cookies made by Hayun? — Yes, they **were**.',
    },
  ],

  terms: [
    { term: '능동태', def: '주어가 어떤 일을 하는 것을 나타내는 문장이에요. 예: Minsu cleans the room.' },
    { term: '수동태', def: '주어가 어떤 일을 당하는(받는) 것을 나타내는 문장이에요. be동사 + 과거분사로 써요. 예: The room is cleaned.' },
    { term: '행위자', def: '수동태 문장에서 실제로 그 일을 한 사람이나 것이에요. by 뒤에 써요. 예: by Jia' },
    { term: 'by + 행위자의 생략', def: '행위자가 일반 사람들이거나, 누구인지 모르거나 중요하지 않을 때 by + 행위자를 쓰지 않아요.' },
    { term: 'be made of', def: '"~으로 만들어지다"라는 뜻으로, 재료의 모양이 그대로 남아 있을 때 써요. 예: This desk is made of wood.' },
    { term: 'be interested in', def: '"~에 관심이 있다"라는 뜻이에요. 예: I am interested in music.' },
    { term: 'be covered with', def: '"~으로 덮여 있다"라는 뜻이에요. 예: The ground is covered with snow.' },
    { term: '중심 내용', def: '글 전체가 말하려는 한 가지 생각이에요. 제목과 첫 문장, 되풀이되는 말에서 찾을 수 있어요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nThis room [[빈칸]] every day.\n(이 방은 매일 청소돼요.)',
      choices: ['is cleaned', 'cleans', 'is cleaning', 'clean'],
      answer: 0,
      why: ['', '방이 스스로 청소하는 것이 아니에요. 청소되는 대상이니 수동태로 써요.', 'is cleaning은 "청소하고 있다"는 진행형이에요. 방은 청소를 받는 쪽이에요.', 'clean은 동사원형이고, 주어 This room 뒤라면 수동태 is cleaned가 필요해요.'],
      explain: '방은 "청소되는" 대상이니 **is cleaned**(is + 과거분사)를 써요. 주어 This room이 단수라서 is예요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 build의 과거분사를 쓰세요.\n\nThe bridge was [[빈칸]] in 2010.\n(그 다리는 2010년에 지어졌어요.)',
      answer: ['built'],
      wrong: [
        { a: 'builded', why: 'build는 불규칙 동사라서 -ed를 붙이지 않아요. build – built – built예요.' },
        { a: 'build', why: 'was 뒤에는 과거분사가 와야 해요. build의 과거분사는 built예요.' },
      ],
      explain: 'build – built – **built**예요. The bridge was built in 2010.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 1,
      q: 'Jia painted this picture.를 수동태로 바꾸면 This picture was painted by Jia.예요.',
      answer: true,
      explain: '목적어 this picture를 주어로, 과거 동사 painted를 was painted로, 주어 Jia를 by Jia로 옮겼어요. 바르게 바꾼 문장이에요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말을 고르세요.\n\nHe wrote these songs.\n= These songs were written by [[빈칸]].',
      choices: ['him', 'he', 'his', 'them'],
      answer: 0,
      why: ['', 'by 뒤에는 목적격을 써요. he는 주격이에요.', 'his는 "그의"라는 소유격이에요. by 뒤에는 목적격 him을 써요.', 'them은 "그들을"이에요. 노래를 쓴 사람은 He 한 사람이에요.'],
      explain: '능동태의 주어 He를 by 뒤로 보낼 때 목적격 **him**으로 바꿔요. "이 노래들은 그에 의해 쓰였어요."',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\nThe door [[빈칸]] locked last night.\n(그 문은 어젯밤에 잠겨 있지 않았어요.)',
      choices: ['wasn\'t', 'didn\'t', 'isn\'t', 'weren\'t'],
      answer: 0,
      why: ['', '수동태의 부정문은 do/did가 아니라 be동사 뒤에 not을 붙여요.', 'last night는 과거예요. isn\'t는 현재예요.', '주어 The door는 단수라서 weren\'t가 아니라 wasn\'t를 써요.'],
      explain: '과거의 수동태 부정문은 **was not(wasn\'t) + 과거분사**예요. The door wasn\'t locked last night.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 3,
      q: '빈칸에 알맞은 전치사 한 낱말을 쓰세요.\n\nSeojun is interested [[빈칸]] science.\n(서준이는 과학에 관심이 있어요.)',
      answer: ['in'],
      wrong: [
        { a: 'by', why: 'be interested는 by가 아니라 in과 짝을 지어 써요.' },
        { a: 'at', why: 'at은 be surprised at(~에 놀라다)의 짝꿍이에요. "~에 관심이 있다"는 be interested in이에요.' },
        { a: 'about', why: '"~에 관심이 있다"는 be interested in으로 외워 두어요.' },
      ],
      explain: '"~에 관심이 있다"는 **be interested in**이에요.',
    },
    {
      id: 'p7', level: 1, type: 'ox', concept: 3,
      q: 'This table is made of wood.는 "이 탁자는 나무로 만들어졌어요."라는 뜻이에요.',
      answer: true,
      explain: 'be made of는 "~으로 만들어지다"라는 뜻이에요. 나무 결이 그대로 보이니 of를 썼어요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 2,
      q: '우리말에 맞게 순서대로 놓으세요.\n\n이 다리는 언제 지어졌나요?',
      choices: ['When', 'was', 'this bridge', 'built?'],
      answer: [0, 1, 2, 3],
      hint: '의문사 + be동사 + 주어 + 과거분사 순서예요.',
      explain: '의문사(When) + be동사(was) + 주어(this bridge) + 과거분사(built). 수동태 의문문에는 did를 쓰지 않아요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 1,
      q: '다음 문장을 수동태로 **바르게** 바꾼 것을 고르세요.\n\nMany people visit Gyeongju.',
      choices: ['Gyeongju is visited by many people.', 'Gyeongju visits many people.', 'Gyeongju is visit by many people.', 'Gyeongju was visited by many people.'],
      answer: 0,
      why: ['', '능동태 그대로 주어만 바꾸면 "경주가 많은 사람을 방문한다"는 엉뚱한 뜻이 돼요.', 'be동사 뒤에는 동사원형이 아니라 과거분사(visited)를 써요.', '원래 문장은 현재(visit)예요. 시제는 그대로 두어 is를 써요.'],
      explain: '목적어 Gyeongju를 주어로, 현재 동사 visit를 **is visited**로, 주어 many people을 by many people로 옮겨요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'text', concept: 2,
      q: '괄호 안의 동사를 알맞은 꼴로 바꿔 빈칸에 쓰세요. (두 낱말)\n\nThe Eiffel Tower [[빈칸]] in 1889. (build)',
      answer: ['was built'],
      wrong: [
        { a: 'is built', why: '1889년은 과거예요. be동사를 과거형 was로 써요.' },
        { a: 'built', why: '탑은 스스로 짓는 것이 아니라 지어진 대상이에요. was + 과거분사로 써요.' },
        { a: 'was build', why: 'was 뒤에는 과거분사 built를 써요.' },
        { a: 'were built', why: '주어 The Eiffel Tower는 단수라서 was를 써요.' },
      ],
      hint: '탑은 짓는 쪽일까요, 지어지는 쪽일까요? 그리고 언제 일어난 일인가요?',
      explain: '탑은 지어지는 대상이고 1889년은 과거이니 **was built**예요. "에펠탑은 1889년에 지어졌어요."',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '다음 글을 읽고 물음에 답하세요.\n\n' + CHEOM + '\n\n이 글의 중심 내용으로 알맞은 것은 무엇일까요?',
      choices: ['첨성대가 어떤 건축물인지 소개하는 글', '신라 왕들의 이야기를 들려주는 글', '별을 관찰하는 방법을 알려 주는 글', '경주로 가는 교통편을 안내하는 글'],
      answer: 0,
      why: ['', '신라는 첨성대가 지어진 때를 알려 주는 세부 정보로만 나와요.', '별을 보는 데 쓰였다는 말은 있지만, 관찰 방법은 나오지 않아요.', '교통편은 글에 나오지 않아요. 경주는 첨성대가 있는 곳으로만 나와요.'],
      hint: '제목과 글에서 되풀이되는 대상(It)을 보세요.',
      explain: '제목이 Cheomseongdae이고, 모든 문장이 첨성대가 어디에 있는지, 언제·무엇으로 지어졌는지, 어디에 쓰였는지를 설명해요. 그래서 중심 내용은 **첨성대 소개**예요.',
    },
    {
      id: 'p12', level: 2, type: 'ox', concept: 4,
      q: '다음 글을 읽고 맞으면 O, 틀리면 X를 고르세요.\n\n' + CHEOM + '\n\n첨성대는 나무로 만들어졌어요.',
      answer: false,
      explain: 'It **was made of hundreds of stones**.(그것은 수백 개의 돌로 만들어졌어요.)라고 했어요. 첨성대는 나무가 아니라 돌로 만들어졌어요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      q: '어법상 **어색한** 문장을 고르세요.',
      choices: ['The accident was happened last night.', 'This house was built in 1990.', 'Are these cookies made by your dad?', 'The box is filled with old letters.'],
      answer: 0,
      why: ['', 'was built(지어졌다)로 바른 과거 수동태예요.', 'be동사를 주어 앞에 둔 바른 수동태 의문문이에요.', 'be filled with(~으로 가득 차 있다)를 바르게 썼어요.'],
      hint: '목적어를 가질 수 없는 동사가 있는지 보세요.',
      explain: 'happen(일어나다)은 목적어가 없는 동사라 수동태로 쓸 수 없어요. **The accident happened last night.**(그 사고는 어젯밤에 일어났어요.)로 고쳐야 해요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 2,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 두 낱말을 쓰세요.\n\nMy grandfather planted this tree ten years ago.\n= This tree [[빈칸]] by my grandfather ten years ago.',
      answer: ['was planted'],
      wrong: [
        { a: 'is planted', why: 'ten years ago(10년 전)는 과거예요. be동사도 과거형 was로 써요.' },
        { a: 'planted', why: '나무는 심는 쪽이 아니라 심어진 대상이에요. was + 과거분사로 써요.' },
        { a: 'were planted', why: '새 주어 This tree는 단수라서 was를 써요.' },
      ],
      hint: '시제는 원래 문장 그대로, be동사는 새 주어에 맞춰요.',
      explain: '능동태가 과거(planted)이고 새 주어 This tree가 단수이므로 **was planted**예요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '빈칸에 들어갈 말이 **나머지와 다른** 하나를 고르세요.',
      choices: ['This chair is made [[빈칸]] plastic.', 'The basket is filled [[빈칸]] fresh apples.', 'The glass is filled [[빈칸]] orange juice.', 'Mom was pleased [[빈칸]] my report card.'],
      answer: 0,
      why: ['', 'be filled with(~으로 가득 차 있다)라서 with가 들어가요. 다른 두 보기와 같아요.', 'be filled with(~으로 가득 차 있다)라서 with가 들어가요.', 'be pleased with(~에 기뻐하다)라서 with가 들어가요.'],
      hint: '각 표현의 짝꿍 전치사를 떠올려 보세요.',
      explain: '나머지 셋은 모두 **with**가 들어가요(be filled with 둘, be pleased with). 재료를 나타내는 be made 뒤에는 **of**가 들어가요. This chair is made of plastic.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '다음 글의 내용과 **일치하는** 것을 고르세요.\n\n' + LIB,
      choices: ['도서관의 벽은 나무로 만들어졌다.', '도서관은 9월에 짓기 시작했다.', '책장에는 책이 500권쯤 꽂혀 있다.', '독서 동아리는 월요일마다 모인다.'],
      answer: 0,
      why: ['', 'It was built last summer and was opened in September.라고 했어요. 지난여름에 지어졌고 9월에 문을 열었어요.', 'more than 5,000 books라고 했어요. 5,000권이 넘어요.', 'the reading club which meets there on Fridays라고 했어요. 금요일마다 모여요.'],
      hint: '보기마다 핵심 낱말(벽, 9월, 책 수, 동아리)이 나오는 문장을 찾아보세요.',
      explain: 'The walls **are made of wood**.(벽은 나무로 만들어졌어요.)와 일치해요. 그래서 방에서 좋은 냄새가 난다고 했어요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 2,
      q: '대화의 빈칸에 알맞은 질문을 고르세요.\n\nA: [[빈칸]]\nB: It was invented by a Korean student.',
      choices: ['Who invented this machine?', 'When was this machine invented?', 'Where is this machine made?', 'What is this machine made of?'],
      answer: 0,
      why: ['', 'When은 때를 묻는 말이에요. B는 때가 아니라 만든 사람을 말했어요.', 'Where는 장소를 묻는 말이에요. B의 대답에 장소는 없어요.', 'made of는 재료를 묻는 말이에요. B는 재료가 아니라 만든 사람을 말했어요.'],
      hint: 'B의 대답에서 by 뒤에 무엇이 나왔는지 보세요.',
      explain: 'B가 by a Korean student(한국 학생에 의해)라고 만든 사람을 알려 주었으니, A는 **누가** 발명했는지 물었어요.',
    },
  ],

  deeper: [
    {
      title: '중3에서 이어지는 수동태',
      body: '이 단원에서는 현재(is made)와 과거(was built)의 수동태를 배웠어요. 중3의 "수동태 심화"에서는 더 다양한 수동태를 만나요.\n\n- 조동사가 있는 수동태: The work **can be done** today. (그 일은 오늘 끝낼 수 있어요.)\n- 진행형·완료형 수동태: The bridge **is being built**. (다리가 지어지고 있어요.)\n\n모두 "be + 과거분사"라는 뼈대는 같고, be의 모양만 바뀌어요(be, being, been). 지금 배운 기본 꼴을 확실히 익혀 두면 이어지는 내용이 쉬워져요.',
    },
  ],

  faq: [
    {
      q: '수동태는 언제 써요? 능동태로 말하면 안 돼요?',
      a: '능동태도 틀리지 않아요. 다만 **누가 했는지보다 무엇이 그렇게 되었는지**를 말하고 싶을 때 수동태가 더 자연스러워요. 건물·발명품을 소개하거나, 누가 했는지 모를 때(My bike was stolen.), 일반 사람들이 하는 일일 때(English is spoken in Canada.) 수동태를 써요.',
    },
    {
      q: 'by 뒤에는 왜 him, her처럼 써요?',
      a: 'by는 전치사이고, 전치사 뒤에는 목적격이 와요. 그래서 He → by **him**, She → by **her**, They → by **them**처럼 바꿔요.',
    },
    {
      q: 'be made of랑 be made from은 어떻게 달라요?',
      a: '만든 뒤에도 재료의 모습이 그대로 보이면 of(나무 책상: made of wood), 재료가 완전히 다른 것으로 바뀌어 원래 모습이 안 보이면 from(우유로 만든 치즈: made from milk)을 써요.',
    },
  ],

  mistakes: [
    'be동사를 빠뜨리는 실수 — The house built in 1990.(✗) → The house **was** built in 1990.',
    '수동태 의문문·부정문에 do/did를 쓰는 실수 — Did the house built?(✗) → **Was** the house built?',
    '목적어가 없는 동사를 수동태로 쓰는 실수 — The accident was happened.(✗) → The accident **happened**.',
  ],

  gens: [
    {
      id: 'passive-form',
      level: 1,
      title: '수동태의 be동사와 과거분사 고르기',
      make: function (R) {
        // [문장, 복수인가, 과거인가, 원형, 과거형, 과거분사, 우리말]
        var bank = [
          ['This room [[빈칸]] by Minsu every day.', false, false, 'clean', 'cleaned', 'cleaned', '이 방은 매일 민수가 청소해요.'],
          ['The windows [[빈칸]] by Jia yesterday.', true, true, 'clean', 'cleaned', 'cleaned', '창문들은 어제 지아가 닦았어요.'],
          ['English [[빈칸]] in many countries.', false, false, 'speak', 'spoke', 'spoken', '영어는 많은 나라에서 쓰여요.'],
          ['These cars [[빈칸]] in Korea.', true, false, 'make', 'made', 'made', '이 자동차들은 한국에서 만들어져요.'],
          ['This bridge [[빈칸]] in 2010.', false, true, 'build', 'built', 'built', '이 다리는 2010년에 지어졌어요.'],
          ['The letters [[빈칸]] by my grandma.', true, true, 'write', 'wrote', 'written', '그 편지들은 우리 할머니가 쓰셨어요.'],
          ['The song [[빈칸]] by many people.', false, false, 'love', 'loved', 'loved', '그 노래는 많은 사람에게 사랑받아요.'],
          ['The photos [[빈칸]] by Seojun last week.', true, true, 'take', 'took', 'taken', '그 사진들은 지난주에 서준이가 찍었어요.'],
          ['My bike [[빈칸]] yesterday.', false, true, 'steal', 'stole', 'stolen', '내 자전거를 어제 도둑맞았어요.'],
          ['These cookies [[빈칸]] by my dad.', true, true, 'bake', 'baked', 'baked', '이 쿠키들은 우리 아빠가 구우셨어요.'],
          ['The museum [[빈칸]] by many tourists every day.', false, false, 'visit', 'visited', 'visited', '그 박물관에는 매일 많은 관광객이 찾아와요.'],
          ['The dishes [[빈칸]] after dinner every night.', true, false, 'wash', 'washed', 'washed', '설거지는 매일 밤 저녁 식사 뒤에 해요.'],
          ['The window [[빈칸]] by a baseball.', false, true, 'break', 'broke', 'broken', '창문이 야구공에 깨졌어요.'],
          ['Rice [[빈칸]] by farmers in many Asian countries.', false, false, 'grow', 'grew', 'grown', '쌀은 많은 아시아 나라에서 농부들이 재배해요.'],
          ['The tickets [[빈칸]] by my mom last month.', true, true, 'buy', 'bought', 'bought', '그 표들은 지난달에 엄마가 사셨어요.'],
          ['This book [[빈칸]] by students all over the world.', false, false, 'read', 'read', 'read', '이 책은 전 세계 학생들이 읽어요.'],
          ['The rooms [[빈칸]] by the students last Friday.', true, true, 'paint', 'painted', 'painted', '그 방들은 지난 금요일에 학생들이 칠했어요.'],
          ['The new library [[빈칸]] last summer.', false, true, 'build', 'built', 'built', '새 도서관은 지난여름에 지어졌어요.'],
          ['These toys [[빈칸]] by hand.', true, false, 'make', 'made', 'made', '이 장난감들은 손으로 만들어져요.'],
          ['The dog [[빈칸]] by my brother every morning.', false, false, 'walk', 'walked', 'walked', '그 개는 매일 아침 내 남동생이 산책시켜요.'],
          ['The boxes [[빈칸]] to Busan two days ago.', true, true, 'send', 'sent', 'sent', '그 상자들은 이틀 전에 부산으로 보내졌어요.'],
          ['The story [[빈칸]] by a famous writer.', false, true, 'write', 'wrote', 'written', '그 이야기는 한 유명한 작가가 썼어요.'],
        ];
        var it = R.pick(bank);
        var plural = it[1], isPast = it[2], base = it[3], past = it[4], pp = it[5];
        var be = isPast ? (plural ? 'were' : 'was') : (plural ? 'are' : 'is');
        var beNum = isPast ? (plural ? 'was' : 'were') : (plural ? 'is' : 'are');
        var beTense = isPast ? (plural ? 'are' : 'is') : (plural ? 'were' : 'was');
        var correct = be + ' ' + pp;
        var reason = {};
        function add(c, why) { if (c !== correct && !(c in reason)) reason[c] = why; }
        add(beNum + ' ' + pp, 'be동사를 주어의 수에 맞춰요. 주어가 ' + (plural ? '복수' : '단수') + '예요.');
        add(beTense + ' ' + pp, 'be동사로 시제를 나타내요. 이 문장은 ' + (isPast ? '과거의 일' : '지금 되풀이되는 일') + '이에요.');
        add(be + ' ' + base, 'be동사 뒤에는 동사원형이 아니라 과거분사를 써요.');
        add(isPast ? past : base + (plural ? '' : 's'), '주어는 그 일을 하는 쪽이 아니라 당하는 쪽이에요. be + 과거분사로 써요.');
        var pick = R.choices(correct, Object.keys(reason));
        return {
          type: 'choice', concept: isPast ? 2 : 0,
          q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + it[0] + '\n(' + it[6] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '주어는 그 일을 당하는 쪽이라 수동태(be + 과거분사)를 써요. ' + (isPast ? '과거' : '현재') + ' · 주어 ' + (plural ? '복수' : '단수') + ' → be동사 **' + be + '**, 과거분사: ' + base + ' – ' + past + ' – **' + pp + '**\n\n' + it[0].replace('[[빈칸]]', '**' + correct + '**'),
        };
      },
    },
    {
      id: 'passive-prep',
      level: 2,
      title: 'by 이외의 전치사를 쓰는 수동태',
      make: function (R) {
        // [문장, 전치사, 과거분사, 우리말]
        var bank = [
          ['The mountain is covered [[빈칸]] snow.', 'with', 'covered', '산이 눈으로 덮여 있어요.'],
          ['The street was covered [[빈칸]] fallen leaves.', 'with', 'covered', '거리가 낙엽으로 덮여 있었어요.'],
          ['The table was covered [[빈칸]] a white cloth.', 'with', 'covered', '탁자가 하얀 천으로 덮여 있었어요.'],
          ['The box is filled [[빈칸]] old toys.', 'with', 'filled', '상자가 낡은 장난감으로 가득 차 있어요.'],
          ['The glass was filled [[빈칸]] orange juice.', 'with', 'filled', '유리잔이 오렌지 주스로 가득 차 있었어요.'],
          ['The room is filled [[빈칸]] sunlight in the morning.', 'with', 'filled', '아침에는 방이 햇빛으로 가득 차요.'],
          ['This desk is made [[빈칸]] wood.', 'of', 'made', '이 책상은 나무로 만들어졌어요.'],
          ['These bags are made [[빈칸]] paper.', 'of', 'made', '이 가방들은 종이로 만들어졌어요.'],
          ['The old bridge is made [[빈칸]] stone.', 'of', 'made', '그 옛 다리는 돌로 만들어졌어요.'],
          ['The house was made [[빈칸]] bricks.', 'of', 'made', '그 집은 벽돌로 만들어졌어요.'],
          ['Minsu is interested [[빈칸]] robots.', 'in', 'interested', '민수는 로봇에 관심이 있어요.'],
          ['Are you interested [[빈칸]] Korean history?', 'in', 'interested', '너는 한국 역사에 관심이 있니?'],
          ['My sister is interested [[빈칸]] drawing cartoons.', 'in', 'interested', '우리 언니는 만화 그리기에 관심이 있어요.'],
          ['The students were interested [[빈칸]] the science show.', 'in', 'interested', '학생들은 과학 쇼에 관심을 보였어요.'],
          ['We were surprised [[빈칸]] the news.', 'at', 'surprised', '우리는 그 소식에 놀랐어요.'],
          ['Jia was surprised [[빈칸]] the big present.', 'at', 'surprised', '지아는 큰 선물에 놀랐어요.'],
          ['I was surprised [[빈칸]] his answer.', 'at', 'surprised', '나는 그의 대답에 놀랐어요.'],
          ['Jeonju is known [[빈칸]] its bibimbap.', 'for', 'known', '전주는 비빔밥으로 유명해요.'],
          ['This town is known [[빈칸]] its beautiful beaches.', 'for', 'known', '이 마을은 아름다운 해변으로 유명해요.'],
          ['The island is known [[빈칸]] its strong winds.', 'for', 'known', '그 섬은 강한 바람으로 유명해요.'],
        ];
        var meaning = { with: 'be covered with(~으로 덮여 있다), be filled with(~으로 가득 차 있다)', of: 'be made of(~으로 만들어지다)', in: 'be interested in(~에 관심이 있다)', at: 'be surprised at(~에 놀라다)', for: 'be known for(~으로 유명하다)' };
        // 다른 전치사로도 맞는 표현이 되는 경우는 오답 후보에서 뺀다 (covered in, made with, surprised with 등)
        var avoid = { covered: ['in'], made: ['with'], surprised: ['with'], filled: [], interested: [], known: [] };
        var it = R.pick(bank);
        var correct = it[1], pp = it[2];
        var pool = ['with', 'of', 'in', 'at', 'for'].filter(function (p) { return p !== correct && avoid[pp].indexOf(p) < 0; });
        var pick = R.choices(correct, pool);
        return {
          type: 'choice', concept: 3,
          q: '우리말에 맞게 빈칸에 알맞은 전치사를 고르세요.\n\n' + it[0] + '\n(' + it[3] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            return c === correct ? '' : '이 전치사는 ' + meaning[c] + '의 짝꿍이에요. 이 문장의 be ' + pp + '에는 다른 짝꿍이 와요.';
          }),
          explain: 'be ' + pp + ' **' + correct + '** — 짝꿍 전치사를 덩어리째 외워요.\n\n' + it[0].replace('[[빈칸]]', '**' + correct + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'build', m: '짓다, 세우다', ex: 'This bridge was built in 2010.', exm: '이 다리는 2010년에 지어졌어요.' },
    { w: 'bridge', m: '다리', ex: 'The old bridge is made of stone.', exm: '그 옛 다리는 돌로 만들어졌어요.' },
    { w: 'tower', m: '탑', ex: 'The tower is visited by many people.', exm: '그 탑에는 많은 사람이 찾아와요.' },
    { w: 'design', m: '설계하다, 디자인하다', ex: 'The house was designed by my aunt.', exm: '그 집은 우리 이모가 설계했어요.' },
    { w: 'stone', m: '돌', ex: 'The wall was made of stones.', exm: '그 벽은 돌로 만들어졌어요.' },
    { w: 'wood', m: '나무, 목재', ex: 'This desk is made of wood.', exm: '이 책상은 나무로 만들어졌어요.' },
    { w: 'cover', m: '덮다', ex: 'The ground is covered with snow.', exm: '땅이 눈으로 덮여 있어요.' },
    { w: 'fill', m: '채우다', ex: 'The shelves are filled with books.', exm: '책장이 책으로 가득 차 있어요.' },
    { w: 'locate', m: '(be located로) ~에 위치하다', ex: 'The museum is located in Seoul.', exm: '그 박물관은 서울에 있어요.' },
    { w: 'tourist', m: '관광객', ex: 'The palace is visited by many tourists.', exm: '그 궁궐에는 관광객이 많이 찾아와요.' },
    { w: 'steal', m: '훔치다', ex: 'My bike was stolen yesterday.', exm: '내 자전거를 어제 도둑맞았어요.' },
    { w: 'observatory', m: '천문대, 관측소', ex: 'We watched the stars at the observatory.', exm: '우리는 천문대에서 별을 보았어요.' },
    { w: 'century', m: '세기, 100년', ex: 'This temple was built in the 8th century.', exm: '이 절은 8세기에 지어졌어요.' },
    { w: 'surprised', m: '놀란', ex: 'We were surprised at the news.', exm: '우리는 그 소식에 놀랐어요.' },
  ],
});
})();
