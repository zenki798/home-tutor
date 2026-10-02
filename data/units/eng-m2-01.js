/* 중2 영어 · 할 일 말하기 (형용사적 to부정사) */
(function () {
  // 방법 안내 글 (직접 쓴 글)
  var SPROUT = '**How to Grow Bean Sprouts**\n\nThings to prepare: a cup of beans, a plastic bowl with small holes, a dark cloth, and water.\n\nFirst, put the beans in water for one night. Next, put the beans in the bowl and cover it with the dark cloth. Then, pour water on the beans four or five times a day. Do not take off the cloth, because the sprouts need a dark place to grow. After about five days, you will have fresh bean sprouts to eat!';
  var CUP = '**How to Make a Cup Phone**\n\nThings to prepare: two paper cups, a long string, two paper clips, and a pencil.\n\nFirst, make a small hole in the bottom of each cup with the pencil. Ask an adult to help you with this step. Next, put one end of the string through the hole. Tie that end to a paper clip inside the cup. Then, do the same thing with the other cup. Finally, pull the string tight and talk into one cup. Your friend can hear you through the other cup!';

Tutor.registerUnit({
  id: 'eng-m2-01',
  course: 'eng-m2',
  title: '할 일 말하기 (형용사적 to부정사)',
  summary: '명사를 꾸미는 to부정사와 \'의문사 + to부정사\'를 익혀 할 일, 필요한 것, 하는 방법을 말해요.',
  goals: [
    '명사 뒤에 to부정사를 써서 "~할 (명사)"를 말할 수 있어요.',
    '-thing + 형용사 + to부정사의 순서로 필요한 것을 말할 수 있어요.',
    '의문사 + to부정사로 "무엇을/어떻게/어디서/언제 ~할지"를 말할 수 있어요.',
    'to부정사의 명사적·형용사적·부사적 쓰임을 구별하고, 방법 안내 글에서 세부 정보를 찾을 수 있어요.',
  ],
  standards: ['[9영01-02]', '[9영02-03]', '[9영01-08]'],

  concepts: [
    {
      title: '명사를 뒤에서 꾸미는 to부정사',
      body: '**to부정사**(to + 동사원형)가 명사 **바로 뒤**에 와서 "~할, ~하는"이라는 뜻으로 앞의 명사를 꾸밀 수 있어요. 형용사처럼 명사를 꾸미기 때문에 이것을 **형용사적 용법**이라고 해요.\n\n| 영어 | 뜻 |\n|---|---|\n| homework **to do** | 해야 할 숙제 |\n| time **to go** | 갈 시간 |\n| a book **to read** | 읽을 책 |\n| water **to drink** | 마실 물 |\n| many places **to visit** | 방문할 많은 곳 |\n\n- I have a lot of **homework to do**. (나는 해야 할 숙제가 많아요.)\n- It\'s **time to go** to bed. (잘 시간이에요.)\n\n우리말은 꾸미는 말이 앞에 오지만("읽을 책"), 영어는 to부정사가 **명사 뒤**에 와요(a book to read). to 뒤에는 언제나 동사원형을 써요.\n\n> 💡 동사 뒤에 전치사가 필요한 말은 전치사까지 함께 써요. sit **on** a chair(의자에 앉다) → a chair **to sit on**(앉을 의자), write **with** a pen(펜으로 쓰다) → a pen **to write with**(쓸 펜)',
      easy: '영어에서 to부정사는 명사 뒤에 붙는 "설명 꼬리표"라고 생각해 보세요.\n\n- a book → 어떤 책? → a book **to read** (읽을 책)\n- water → 어떤 물? → water **to drink** (마실 물)\n\n명사를 먼저 말하고, "무엇을 할 거냐면…" 하고 뒤에 꼬리표를 다는 거예요. 우리말로 옮길 때는 꼬리표를 앞으로 가져와 "~할"로 읽으면 돼요.',
      check: {
        type: 'choice',
        q: '우리말 "읽을 책"을 영어로 바르게 나타낸 것을 고르세요.',
        choices: ['a book to read', 'to read a book', 'a read book'],
        answer: 0,
        why: ['', 'to read a book은 "책을 읽는 것" 또는 "책을 읽기 위해"라는 뜻이에요. "읽을 책"은 명사 book이 먼저 오고 to read가 뒤에서 꾸며요.', '동사원형 read는 명사 앞에서 꾸밀 수 없어요. to read로 명사 뒤에서 꾸며요.'],
        explain: '명사 book을 먼저 쓰고, to read가 뒤에서 "읽을"이라고 꾸며요. **a book to read**',
      },
    },
    {
      title: '-thing + 형용사 + to부정사',
      body: 'something, anything, nothing, everything처럼 **-thing으로 끝나는 말**은 형용사가 **뒤에서** 꾸며요. 여기에 to부정사까지 함께 쓰면 순서는 이렇게 돼요.\n\n**-thing + 형용사 + to부정사**\n\n| 영어 | 뜻 |\n|---|---|\n| something **cold to drink** | 마실 차가운 것 |\n| something **sweet to eat** | 먹을 달콤한 것 |\n| anything **interesting to read** | 읽을 재미있는 것(무엇이든) |\n| nothing **special to do** | 할 특별한 것이 없음 |\n\n- I want **something cold to drink**. (나는 마실 차가운 것을 원해요.)\n- Do you have **anything interesting to read**? (읽을 재미있는 것이 있나요?)\n- I have **nothing special to do** today. (나는 오늘 특별히 할 일이 없어요.)\n\n> ⚠️ cold something(✗), something to drink cold(✗) — 형용사는 -thing 바로 뒤, to부정사는 그 뒤예요.\n\n> 💡 something은 주로 긍정문에, anything은 주로 부정문·의문문에 써요. 다만 Would you like something to drink?처럼 권할 때는 의문문에도 something을 써요.',
      easy: '줄 서기 순서를 외워 보세요. **"것 → 어떤 → 할"**\n\n1. 것: something\n2. 어떤 것?: cold (차가운)\n3. 무엇을 할 것?: to drink (마실)\n\n그래서 something cold to drink예요. 우리말 "마실 차가운 것"은 순서가 정반대라서, 영어로는 맨 끝의 "것"부터 거꾸로 말한다고 생각하면 쉬워요.',
      check: {
        type: 'ox',
        q: 'I want cold something to drink.는 바른 문장이에요.',
        answer: false,
        explain: '-thing으로 끝나는 말은 형용사가 뒤에서 꾸며요. 바른 문장은 I want **something cold to drink**.(나는 마실 차가운 것을 원해요.)예요.',
      },
    },
    {
      title: '의문사 + to부정사',
      body: '**의문사(what, how, where, when) + to부정사**는 "무엇을/어떻게/어디서/언제 ~할지"라는 뜻의 덩어리가 돼요. 이 덩어리는 명사처럼 쓰여서 주로 know, learn, tell, decide, show 같은 동사의 목적어 자리에 와요.\n\n| 형태 | 뜻 | 예문 |\n|---|---|---|\n| **what to** + 동사원형 | 무엇을 ~할지 | I don\'t know **what to do**. |\n| **how to** + 동사원형 | 어떻게 ~할지, ~하는 방법 | She learned **how to cook** pasta. |\n| **where to** + 동사원형 | 어디서(어디로) ~할지 | Tell me **where to go**. |\n| **when to** + 동사원형 | 언제 ~할지 | We decided **when to start**. |\n\n의문사 + to부정사는 **의문사 + 주어 + should + 동사원형**으로 바꿔 쓸 수 있어요.\n\n- I don\'t know **what to do**. = I don\'t know **what I should do**. (나는 무엇을 해야 할지 모르겠어요.)\n\n> 💡 which(어느 것을)도 쓸 수 있어요: I can\'t decide **which to buy**. (어느 것을 살지 못 정하겠어요.) 하지만 why는 보통 이렇게 쓰지 않아요.',
      easy: '의문사는 "질문 낱말"이에요. 질문 낱말에 to부정사를 붙이면 "~할지"라는 고민이 하나 생긴다고 생각해 보세요.\n\n- what(무엇) + to eat → 무엇을 먹을지\n- how(어떻게) + to swim → 어떻게 수영할지 = 수영하는 법\n- where(어디) + to sit → 어디에 앉을지\n\n"모르겠다(don\'t know)", "알려 줘(tell me)" 뒤에 이 고민 덩어리를 그대로 넣으면 돼요.',
      check: {
        type: 'choice',
        q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\nI don\'t know [[빈칸]] to cook pasta.\n(나는 파스타를 어떻게 요리하는지 몰라요.)',
        choices: ['how', 'what', 'where'],
        answer: 0,
        why: ['', 'what to cook은 "무엇을 요리할지"라는 뜻이에요. 요리할 것(pasta)이 이미 나와 있으니 "어떻게"를 나타내는 how가 맞아요.', 'where to cook은 "어디서 요리할지"라는 뜻이에요. 우리말은 "어떻게"예요.'],
        explain: '"어떻게 ~할지, ~하는 방법"은 **how to** + 동사원형이에요. I don\'t know **how to cook** pasta.',
      },
    },
    {
      title: 'to부정사의 세 가지 쓰임 구별하기',
      body: 'to부정사는 모양이 늘 **to + 동사원형**으로 같지만, 문장에서 하는 일에 따라 세 가지로 나눠요.\n\n| 쓰임 | 뜻 | 하는 일 | 예문 |\n|---|---|---|---|\n| **명사적** | ~하는 것 | 주어·목적어·보어 자리 | I want **to travel**. / My dream is **to be** a vet. |\n| **형용사적** | ~할, ~하는 | 앞의 명사를 꾸밈 | I have no time **to play**. |\n| **부사적** | ~하기 위해, ~해서 | 동사·형용사·문장에 덧붙임 | I went to the store **to buy** milk. / I\'m glad **to see** you. |\n\n**구별하는 순서**\n1. to부정사를 빼 보세요. 문장의 목적어나 보어가 사라져 말이 안 끝나면 → **명사적** (I want. → 무엇을?)\n2. 바로 앞에 명사가 있고 "~할 (명사)"로 자연스러우면 → **형용사적** (no time to play → 놀 시간)\n3. 빼도 문장이 완전하고 "~하기 위해, ~해서"가 자연스러우면 → **부사적**\n\n> ⚠️ 앞에 명사가 있다고 모두 형용사적은 아니에요. I went to **the store to buy** milk.는 "우유를 살 가게"가 아니라 "우유를 사려고 가게에 갔다"예요. 뜻을 넣어 보고 판단해요.',
      easy: '세 가지 쓰임을 세 가지 "직업"이라고 생각해 보세요.\n\n- **명사적**: 이름표 — "~하는 것" (want 뒤, is 뒤 같은 빈자리를 채워요)\n- **형용사적**: 꾸밈 꼬리표 — "~할" (명사 뒤에 붙어 어떤 명사인지 알려 줘요)\n- **부사적**: 덧붙임 메모 — "~하려고, ~해서" (이미 끝난 문장 뒤에 이유나 목적을 붙여요)\n\n문장에서 to부정사를 가리고 읽어 보세요. 빈자리가 생기면 이름표, 명사가 "어떤?" 하고 묻고 있으면 꼬리표, 문장이 멀쩡하면 메모예요.',
      check: {
        type: 'choice',
        q: 'I have a lot of homework to do.에서 **to do**의 쓰임은 무엇일까요?',
        choices: ['형용사적 용법', '명사적 용법', '부사적 용법'],
        answer: 0,
        why: ['', 'to do가 "하는 것"이라는 뜻으로 목적어나 보어 자리에 온 것이 아니에요. homework 뒤에서 "해야 할"이라고 꾸며요.', '"하기 위해"라는 목적으로 읽으면 "숙제를 하기 위해 숙제가 많다"가 되어 어색해요.'],
        explain: 'to do가 바로 앞의 명사 homework를 꾸며 "해야 할 숙제"라는 뜻이에요. 그래서 **형용사적 용법**이에요.',
      },
    },
    {
      title: '방법을 안내하는 글에서 세부 정보 찾기',
      body: '"How to ~"로 시작하는 **방법 안내 글**은 보통 이런 차례로 써요.\n\n1. 제목: **How to** + 동사원형 (~하는 방법)\n2. 준비물: **Things to prepare** / You need … (형용사적 to부정사: 준비할 것들)\n3. 순서: **First, Next, Then, Finally**\n4. 주의할 점: Don\'t ~, Be careful ~\n\n**세부 정보**(details)를 찾을 때는\n- 질문의 핵심 낱말(얼마나? 무엇으로? 몇 번째?)을 먼저 정해요.\n- 글 전체를 다 해석하지 말고, 그 낱말이 나오는 문장을 찾아 그 문장만 꼼꼼히 읽어요.\n- "몇 번째로 하는 일"은 First, Next, Then, Finally 같은 순서 낱말을 따라가요.\n\n예: How to Make Fruit Salad — Things to prepare: two bananas, an apple, and yogurt. First, wash the fruit. Next, cut the fruit into small pieces. Then, put it in a bowl. Finally, add yogurt and mix well.\n\n→ "두 번째로 하는 일"은 Next 문장, 곧 "과일을 작게 자르기"예요.',
      easy: '방법 안내 글은 "요리책 한 쪽"과 같아요. 맨 위에 요리 이름, 그 아래 재료, 그 아래 1, 2, 3 순서가 있지요.\n\n"설탕은 몇 숟가락?"이 궁금하면 요리책을 처음부터 다 읽지 않고 "설탕"이라는 낱말만 눈으로 찾지요? 영어 글도 똑같아요. 질문에서 찾을 낱말을 정하고, 그 낱말이 있는 곳만 자세히 읽어요.',
      check: {
        type: 'choice',
        q: '다음 글에서 **두 번째로** 하는 일은 무엇일까요?\n\nHow to Make Fruit Salad — First, wash the fruit. Next, cut the fruit into small pieces. Then, put it in a bowl. Finally, add yogurt and mix well.',
        choices: ['과일을 작게 자르기', '과일을 씻기', '요구르트를 넣고 섞기'],
        answer: 0,
        why: ['', '과일 씻기는 First, 곧 첫 번째로 하는 일이에요.', '요구르트를 넣는 것은 Finally, 곧 마지막에 하는 일이에요.'],
        explain: '순서 낱말을 따라가요. First(씻기) → **Next(작게 자르기)** → Then(그릇에 담기) → Finally(요구르트 넣고 섞기). 두 번째는 Next 문장이에요.',
      },
    },
  ],

  examples: [
    {
      q: '우리말에 맞게 영어로 나타내 보세요.\n\n나는 마실 차가운 것이 필요해요.',
      steps: [
        '주어와 동사부터 써요: I need',
        '"것"은 -thing 말로: something',
        '-thing은 형용사가 뒤에서 꾸며요: something **cold**',
        '"마실"은 to부정사로 그 뒤에서 꾸며요: something cold **to drink**',
      ],
      answer: 'I need **something cold to drink**.',
    },
    {
      q: '밑줄 친 to부정사의 쓰임을 말해 보세요.\n\n(1) My plan is __to visit__ my grandma.\n(2) I have no time __to rest__.\n(3) She went to the library __to borrow__ books.',
      steps: [
        '(1) to visit를 빼면 My plan is.로 말이 안 끝나요. is 뒤의 보어 "방문하는 것" → **명사적**',
        '(2) 바로 앞 명사 time을 꾸며 "쉴 시간" → **형용사적**',
        '(3) She went to the library.만으로 완전한 문장이고, "책을 빌리려고"라는 목적 → **부사적**',
      ],
      answer: '(1) 명사적 (2) 형용사적 (3) 부사적',
    },
    {
      q: '의문사 + to부정사를 써서 같은 뜻으로 바꿔 보세요.\n\nI don\'t know where I should go.',
      steps: [
        '의문사 + 주어 + should + 동사원형은 의문사 + to부정사로 바꿀 수 있어요.',
        'where I should go → where **to go**',
      ],
      answer: 'I don\'t know **where to go**.',
    },
  ],

  terms: [
    { term: 'to부정사', def: 'to + 동사원형 꼴이에요. 문장에서 명사·형용사·부사처럼 쓰여요. 예: to read, to go' },
    { term: '형용사적 용법', def: 'to부정사가 명사 바로 뒤에서 "~할, ~하는"이라는 뜻으로 그 명사를 꾸미는 쓰임이에요. 예: a book to read(읽을 책)' },
    { term: '명사적 용법', def: 'to부정사가 "~하는 것"이라는 뜻으로 주어·목적어·보어 자리에 오는 쓰임이에요. 예: I want to travel.' },
    { term: '부사적 용법', def: 'to부정사가 문장이나 동사·형용사에 덧붙어 목적("~하기 위해")이나 감정의 원인("~해서")을 나타내는 쓰임이에요.' },
    { term: '의문사 + to부정사', def: 'what/how/where/when + to + 동사원형으로 "무엇을/어떻게/어디서/언제 ~할지"를 나타내요. 의문사 + 주어 + should + 동사원형과 뜻이 같아요.' },
    { term: '-thing 대명사', def: 'something, anything, nothing, everything처럼 -thing으로 끝나는 말이에요. 형용사가 뒤에서 꾸며요. 예: something cold' },
    { term: '세부 정보', def: '글에 나오는 구체적인 사실(준비물, 시간, 횟수, 순서 등)이에요. 질문의 핵심 낱말을 찾아 그 문장을 꼼꼼히 읽어 찾아요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nIt\'s time [[빈칸]] to bed.\n(잘 시간이에요.)',
      choices: ['to go', 'going', 'go', 'goes'],
      answer: 0,
      why: ['', 'time을 뒤에서 꾸며 "갈 시간"을 나타낼 때는 to부정사를 써요.', '동사원형 go는 명사 time을 바로 꾸밀 수 없어요. to를 붙여요.', 'goes는 주어 뒤에 오는 동사 모양이에요. 명사를 꾸미려면 to + 동사원형을 써요.'],
      explain: '명사 time을 뒤에서 꾸며 "(잠자리에) 갈 시간"이 되도록 to부정사 **to go**를 써요. It\'s time to go to bed.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '우리말에 맞게 빈칸에 알맞은 두 낱말을 쓰세요.\n\nI have a lot of homework [[빈칸]] today.\n(나는 오늘 해야 할 숙제가 많아요.)',
      answer: ['to do'],
      wrong: [
        { a: 'do', why: '동사원형만으로는 명사를 꾸밀 수 없어요. "해야 할"은 to + 동사원형으로 써요.' },
        { a: 'doing', why: '"해야 할 숙제"는 앞으로 할 일이라 to부정사로 꾸며요. to do를 써요.' },
      ],
      explain: '명사 homework를 뒤에서 꾸며 "해야 할 숙제"가 되게 **to do**를 써요.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 1,
      q: 'Do you have anything hot to eat?은 바른 문장이에요.',
      answer: true,
      explain: '-thing 말(anything) + 형용사(hot) + to부정사(to eat)의 순서가 맞아요. "먹을 뜨거운 것이 있나요?"라는 뜻이에요. 의문문이라 anything을 썼어요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\nI don\'t know [[빈칸]] to wear to the party.\n(나는 파티에 무엇을 입고 가야 할지 모르겠어요.)',
      choices: ['what', 'how', 'where', 'when'],
      answer: 0,
      why: ['', 'how to wear는 "어떻게 입을지"예요. 우리말은 "무엇을"이에요.', 'where to wear는 "어디서 입을지"예요. 우리말은 "무엇을"이에요.', 'when to wear는 "언제 입을지"예요. 우리말은 "무엇을"이에요.'],
      explain: '"무엇을 ~할지"는 **what to** + 동사원형이에요. I don\'t know **what to wear** to the party.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'text', concept: 2,
      q: '우리말에 맞게 빈칸에 알맞은 한 낱말을 쓰세요.\n\nCan you show me [[빈칸]] to use this machine?\n(이 기계를 사용하는 방법을 보여 줄 수 있나요?)',
      answer: ['how'],
      wrong: [
        { a: 'what', why: 'what to use는 "무엇을 사용할지"예요. 사용할 것(this machine)이 이미 나와 있으니 "방법"을 나타내는 how를 써요.' },
        { a: 'where', why: 'where to use는 "어디서 사용할지"예요. "~하는 방법"은 how to예요.' },
      ],
      explain: '"~하는 방법, 어떻게 ~할지"는 **how to** + 동사원형이에요. Can you show me **how to use** this machine?',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '밑줄 친 to부정사가 **형용사적 용법**으로 쓰인 문장을 고르세요.',
      choices: ['I need a pen __to write__ with.', 'I want __to write__ a letter.', 'I came here __to write__ a report.', 'My plan is __to write__ a story.'],
      answer: 0,
      why: ['', 'want의 목적어 자리에서 "쓰는 것"이라는 뜻이에요. 명사적 용법이에요.', 'I came here.로 문장이 끝나고, "보고서를 쓰기 위해"라는 목적이에요. 부사적 용법이에요.', 'is 뒤 보어 자리에서 "쓰는 것"이라는 뜻이에요. 명사적 용법이에요.'],
      explain: 'to write가 바로 앞의 명사 pen을 꾸며 "(그것으로) 쓸 펜"이라는 뜻이에요. write with a pen(펜으로 쓰다)이라서 with까지 함께 썼어요.',
    },
    {
      id: 'p7', level: 1, type: 'ox', concept: 0,
      q: 'There are many places to visit in Gyeongju.에서 to visit는 places를 꾸며 "방문할 곳"이라는 뜻이에요.',
      answer: true,
      explain: 'to visit가 바로 앞의 명사 places를 뒤에서 꾸며요. "경주에는 방문할 곳이 많아요."라는 뜻이에요(형용사적 용법).',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 1,
      q: '우리말에 맞게 순서대로 놓으세요.\n\n나는 읽을 재미있는 것을 찾고 있어요.',
      choices: ['I am looking for', 'something', 'interesting', 'to read.'],
      answer: [0, 1, 2, 3],
      hint: '-thing 말 → 형용사 → to부정사 순서예요.',
      explain: 'I am looking for(나는 찾고 있어요) + something(것) + interesting(재미있는) + to read(읽을). -thing 말은 형용사가 뒤에서 꾸미고, to부정사는 그 뒤에 와요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: 'My dream is __to become__ a pilot.의 to become과 쓰임이 **같은** 것을 고르세요.',
      choices: ['I hope __to visit__ Canada someday.', 'Here is a map __to help__ you.', 'He ran fast __to catch__ the bus.', 'I was glad __to hear__ the news.'],
      answer: 0,
      why: ['', 'to help가 명사 map을 꾸며 "너를 도와줄 지도"라는 뜻이에요. 형용사적 용법이에요.', '"버스를 잡으려고"라는 목적을 나타내요. 부사적 용법이에요.', '"그 소식을 들어서"라는 감정의 원인을 나타내요. 부사적 용법이에요.'],
      hint: '먼저 to become의 쓰임을 정해 보세요. is 뒤에서 무슨 역할을 하나요?',
      explain: 'to become은 is 뒤 보어 자리에서 "되는 것"이라는 뜻이라 **명사적 용법**이에요. I hope to visit의 to visit도 hope의 목적어("방문하는 것")라서 명사적 용법이에요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'text', concept: 2,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 두 낱말을 쓰세요.\n\nI don\'t know where I should put this box.\n= I don\'t know where [[빈칸]] this box.',
      answer: ['to put'],
      wrong: [
        { a: 'put', why: '의문사 뒤에 동사원형만 쓰면 안 돼요. where + to + 동사원형으로 써요.' },
        { a: 'should put', why: '주어 I 없이 should만 남길 수 없어요. "어디에 ~할지"는 where to put이에요.' },
      ],
      hint: '의문사 + 주어 + should + 동사원형 = 의문사 + to부정사',
      explain: 'where I should put = **where to put**(어디에 놓아야 할지). I don\'t know where to put this box.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '다음 글을 읽고 물음에 답하세요.\n\n' + SPROUT + '\n\n콩을 처음에 물에 얼마 동안 담가 두나요?',
      choices: ['하룻밤', '약 5일', '하루에 네다섯 번', '한 시간'],
      answer: 0,
      why: ['', '약 5일(about five days)은 콩나물을 먹을 수 있게 되기까지 걸리는 시간이에요.', '하루에 네다섯 번은 물을 부어 주는 횟수예요. 담가 두는 시간이 아니에요.', '글에 "한 시간"은 나오지 않아요. First 문장을 다시 읽어 보세요.'],
      hint: 'First로 시작하는 문장을 찾아보세요.',
      explain: 'First, put the beans in water **for one night**.(먼저 콩을 하룻밤 동안 물에 담가요.) 질문의 핵심 낱말 "물에 담그다(put ~ in water)"가 있는 문장만 읽으면 돼요.',
    },
    {
      id: 'p12', level: 2, type: 'ox', concept: 4,
      q: '다음 글을 읽고 맞으면 O, 틀리면 X를 고르세요.\n\n' + SPROUT + '\n\n콩나물이 자라는 동안 천을 벗겨 햇빛을 보여 주어야 해요.',
      answer: false,
      explain: 'Do not take off the cloth, because the sprouts need a **dark place to grow**.(천을 벗기지 마세요. 콩나물은 자랄 어두운 곳이 필요하거든요.) 천을 벗기지 않고 어둡게 두어야 해요. 여기서 to grow도 place를 꾸미는 형용사적 용법이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: '밑줄 친 to부정사 가운데 쓰임이 나머지와 **다른** 하나를 고르세요.',
      choices: ['I have some letters __to write__.', 'Give me something __to drink__.', 'It\'s time __to say__ goodbye.', 'We went to the park __to play__ badminton.'],
      answer: 3,
      why: ['to write가 명사 letters를 꾸며 "써야 할 편지"라는 뜻이에요(형용사적). 다른 두 보기와 같은 쓰임이에요.', 'to drink가 something을 꾸며 "마실 것"이라는 뜻이에요(형용사적).', 'to say가 time을 꾸며 "작별 인사를 할 시간"이라는 뜻이에요(형용사적).', ''],
      hint: '앞에 명사가 있다고 모두 꾸미는 것은 아니에요. "~할 (명사)"로 읽어 보세요.',
      explain: '앞의 세 문장은 모두 앞의 명사를 꾸미는 **형용사적 용법**이에요. We went to the park to play badminton.은 We went to the park.로 문장이 끝나고, to play badminton은 "배드민턴을 치려고"라는 목적을 나타내는 **부사적 용법**이에요. "배드민턴을 칠 공원"으로 읽으면 뜻이 어색해요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 2,
      q: '대화를 읽고 빈칸에 알맞은 한 낱말을 쓰세요.\n\nA: Excuse me. Do you know [[빈칸]] to buy the tickets?\nB: Yes. You can buy them at the ticket office next to the gate.',
      answer: ['where'],
      wrong: [
        { a: 'how', why: 'B는 표를 사는 방법이 아니라 장소(the ticket office next to the gate)를 알려 주고 있어요.' },
        { a: 'when', why: 'B의 대답에는 시간이 아니라 장소가 나와요.' },
        { a: 'what', why: '살 것(the tickets)은 이미 나와 있어요. B가 알려 준 것은 장소예요.' },
      ],
      hint: 'B의 대답이 무엇을 알려 주는지 보세요.',
      explain: 'B가 "문 옆 매표소에서 살 수 있어요."라고 장소를 알려 주었으니, A는 **where to buy**(어디서 살지)를 물었어요.',
    },
    {
      id: 'a3', level: 3, type: 'order', concept: 1,
      q: '우리말에 맞게 순서대로 놓으세요.\n\n나는 친구들에게 줄 특별한 것을 만드는 방법을 배웠어요.',
      choices: ['I learned', 'how to make', 'something special', 'to give', 'to my friends.'],
      answer: [0, 1, 2, 3, 4],
      hint: '"~하는 방법"이 learned의 목적어예요. 그 안에서 -thing 말을 꾸미는 순서를 생각해 보세요.',
      explain: 'I learned(나는 배웠어요) + how to make(만드는 방법) + something special(특별한 것) + to give to my friends(친구들에게 줄). 의문사 + to부정사와 -thing + 형용사 + to부정사를 함께 썼어요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '다음 글의 내용과 **일치하는** 것을 고르세요.\n\n' + CUP,
      choices: ['종이컵 바닥에 연필로 작은 구멍을 낸다.', '실은 느슨하게 늘어뜨린 채로 말한다.', '종이컵은 한 개만 있으면 된다.', '클립은 컵 바깥쪽에서 실 끝에 묶는다.'],
      answer: 0,
      why: ['', 'Finally, pull the string **tight**라고 했어요. 실을 팽팽하게 당겨야 해요.', 'Things to prepare에 two paper cups가 있어요. 컵이 두 개 필요해요.', 'Tie that end to a paper clip **inside** the cup이라고 했어요. 클립은 컵 안쪽에 있어요.'],
      hint: '보기마다 핵심 낱말(구멍, 실, 컵 개수, 클립)을 정하고 그 낱말이 나오는 문장을 찾아보세요.',
      explain: 'First, make a small hole in the bottom of each cup with the pencil.(먼저 연필로 컵마다 바닥에 작은 구멍을 내요.)과 일치해요. 구멍을 낼 때는 어른에게 도와 달라고 하라는 말도 있어요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 1,
      q: '어법상 **어색한** 문장을 고르세요.',
      choices: ['I need warm something to wear.', 'She has nothing special to do today.', 'Do you know how to ride a bike?', 'Tell me where to put the bag.'],
      answer: 0,
      why: ['', '-thing 말(nothing) + 형용사(special) + to부정사(to do)로 바른 순서예요.', 'how to ride(타는 법)로 바른 문장이에요.', 'where to put(어디에 놓을지)으로 바른 문장이에요.'],
      explain: '-thing으로 끝나는 말은 형용사가 뒤에서 꾸며요. I need **something warm to wear**.(나는 입을 따뜻한 것이 필요해요.)로 고쳐야 해요.',
    },
  ],

  deeper: [
    {
      title: '중3에서 만나는 다른 꾸밈말: 분사',
      body: '이 단원에서는 to부정사가 명사를 뒤에서 꾸미는 것을 배웠어요(a book **to read**: 읽을 책). 중3에서는 동사의 -ing 형이나 과거분사가 명사를 꾸미는 **분사**를 배워요. 예를 들어 a **sleeping** baby(자고 있는 아기)처럼요.\n\n둘을 비교하면, to부정사 꾸밈말은 주로 **앞으로 할 일**(읽을, 마실, 해야 할)을 나타내고, -ing 꾸밈말은 **지금 하고 있는 일**을 나타내는 경우가 많아요. 지금은 "to부정사 꾸밈 = ~할"을 확실히 익혀 두면 다음 학년 내용이 훨씬 쉬워져요.',
    },
  ],

  faq: [
    {
      q: '형용사적 용법이랑 부사적 용법은 어떻게 구별해요?',
      a: '먼저 to부정사 바로 앞에 명사가 있는지 보고, "~할 (명사)"로 읽어 보세요. 뜻이 자연스러우면 형용사적이에요(no time to play: 놀 시간).\n\n앞에 명사가 있어도 "~할 (명사)"가 어색하고 "~하기 위해, ~해서"가 자연스러우면 부사적이에요. I went to the store to buy milk.는 "우유를 살 가게"가 아니라 "우유를 사려고 갔다"예요.',
    },
    {
      q: '왜 cold something이 아니라 something cold라고 해요?',
      a: 'something, anything, nothing처럼 -thing으로 끝나는 말은 영어에서 형용사를 뒤에 두는 약속이 있어요. 그래서 something cold, nothing special처럼 써요. to부정사까지 쓰면 something cold to drink처럼 맨 뒤에 둬요.',
    },
    {
      q: 'how to랑 what to는 언제 써요?',
      a: 'how to는 "어떻게 ~할지, ~하는 방법"이라서 뒤에 할 일의 대상이 함께 나와요(how to cook pasta). what to는 "무엇을 ~할지"라서 what이 이미 대상 역할을 해요(what to cook). 그래서 what to cook pasta처럼 쓰면 대상이 두 번 나온 셈이라 틀려요.',
    },
  ],

  mistakes: [
    '명사 앞에 to부정사를 두는 실수 — "읽을 책"은 to read book이 아니라 a book **to read**예요.',
    '-thing 말 앞에 형용사를 쓰는 실수 — cold something(✗) → **something cold** to drink',
    '앞에 명사만 있으면 형용사적이라고 판단하는 실수 — I went to the store to buy milk.의 to buy는 목적을 나타내는 부사적 용법이에요.',
  ],

  gens: [
    {
      id: 'wh-to',
      level: 1,
      title: '의문사 + to부정사 고르기',
      make: function (R) {
        var mean = { what: '무엇을 ~할지', how: '어떻게 ~할지', where: '어디서(어디로) ~할지', when: '언제 ~할지' };
        // [의문사, 문장, 우리말]
        var bank = [
          ['what', 'I don\'t know [[빈칸]] to say.', '나는 무슨 말을 해야 할지 모르겠어요.'],
          ['what', 'Let\'s decide [[빈칸]] to eat for lunch.', '점심으로 무엇을 먹을지 정하자.'],
          ['what', 'Sua asked me [[빈칸]] to buy for Mom\'s birthday.', '수아는 엄마 생신에 무엇을 사야 할지 나에게 물었어요.'],
          ['what', 'Please tell me [[빈칸]] to bring to the picnic.', '소풍에 무엇을 가져가야 할지 알려 주세요.'],
          ['what', 'He couldn\'t decide [[빈칸]] to draw.', '그는 무엇을 그릴지 정하지 못했어요.'],
          ['how', 'I learned [[빈칸]] to ride a bike last year.', '나는 작년에 자전거 타는 법을 배웠어요.'],
          ['how', 'Can you teach me [[빈칸]] to play chess?', '체스 두는 법을 가르쳐 줄 수 있나요?'],
          ['how', 'Do you know [[빈칸]] to make pancakes?', '팬케이크 만드는 법을 아나요?'],
          ['how', 'This video shows [[빈칸]] to fold a paper crane.', '이 영상은 종이학을 접는 법을 보여 줘요.'],
          ['how', 'Minsu explained [[빈칸]] to use the new app.', '민수는 새 앱을 사용하는 법을 설명했어요.'],
          ['where', 'We didn\'t know [[빈칸]] to go next.', '우리는 다음에 어디로 가야 할지 몰랐어요.'],
          ['where', 'Tell me [[빈칸]] to put these books.', '이 책들을 어디에 놓아야 할지 말해 주세요.'],
          ['where', 'I can\'t decide [[빈칸]] to sit.', '나는 어디에 앉을지 못 정하겠어요.'],
          ['where', 'Jia asked [[빈칸]] to wait for the bus.', '지아는 어디서 버스를 기다려야 할지 물었어요.'],
          ['where', 'Let\'s talk about [[빈칸]] to travel this summer.', '이번 여름에 어디로 여행할지 이야기해 보자.'],
          ['when', 'Please tell me [[빈칸]] to start.', '언제 시작해야 할지 알려 주세요.'],
          ['when', 'He didn\'t know [[빈칸]] to leave the party.', '그는 언제 파티에서 떠나야 할지 몰랐어요.'],
          ['when', 'The coach told us [[빈칸]] to take a break.', '코치는 우리에게 언제 쉬어야 할지 말해 주었어요.'],
          ['when', 'Let me know [[빈칸]] to call you.', '언제 너에게 전화해야 할지 알려 줘.'],
          ['when', 'We must decide [[빈칸]] to meet tomorrow.', '우리는 내일 언제 만날지 정해야 해요.'],
        ];
        var it = R.pick(bank);
        var ans = it[0];
        var others = ['what', 'how', 'where', 'when'].filter(function (w) { return w !== ans; });
        var pick = R.choices(ans, others);
        return {
          type: 'choice', concept: 2,
          q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + it[1] + '\n(' + it[2] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            return c === ans ? '' : c + ' to는 "' + mean[c] + '"라는 뜻이라 우리말과 맞지 않아요. 우리말은 "' + mean[ans] + '"예요.';
          }),
          explain: '"' + mean[ans] + '"는 **' + ans + ' to** + 동사원형이에요.\n\n' + it[1].replace('[[빈칸]]', '**' + ans + '**'),
        };
      },
    },
    {
      id: 'thing-adj-to',
      level: 2,
      title: '-thing + 형용사 + to부정사의 순서',
      make: function (R) {
        // [형용사, 우리말 형용사, 동사, 우리말 동사]
        var bank = [
          ['cold', '차가운', 'drink', '마실'],
          ['hot', '뜨거운', 'drink', '마실'],
          ['sweet', '달콤한', 'eat', '먹을'],
          ['spicy', '매운', 'eat', '먹을'],
          ['salty', '짠', 'eat', '먹을'],
          ['warm', '따뜻한', 'wear', '입을'],
          ['fun', '재미있는', 'do', '할'],
          ['interesting', '흥미로운', 'read', '읽을'],
          ['new', '새로운', 'watch', '볼'],
          ['special', '특별한', 'give', '줄'],
        ];
        var frames = [
          ['I want [[빈칸]].', '나는 ', '을 원해요.'],
          ['I need [[빈칸]].', '나는 ', '이 필요해요.'],
          ['Let\'s find [[빈칸]].', '', '을 찾아보자.'],
        ];
        var it = R.pick(bank);
        var fr = R.pick(frames);
        var adj = it[0], verb = it[2];
        var correct = 'something ' + adj + ' to ' + verb;
        var cands = [
          ['' + adj + ' something to ' + verb, '-thing 말은 형용사가 뒤에서 꾸며요. 형용사를 something 앞에 두면 안 돼요.'],
          ['something ' + adj + ' ' + verb, 'to가 빠졌어요. 명사를 꾸미는 말은 to + 동사원형이에요.'],
          ['something ' + adj + ' ' + verb.replace(/e$/, '') + 'ing', '-ing 형이 아니라 to부정사로 "~할"을 나타내요.'],
          ['' + adj + ' to ' + verb + ' something', '순서가 뒤섞였어요. -thing 말 → 형용사 → to부정사 순서예요.'],
        ];
        var reason = {};
        cands.forEach(function (c) { reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        var ko = fr[1] + it[3] + ' ' + it[1] + ' 것' + fr[2];
        return {
          type: 'choice', concept: 1,
          q: '우리말에 맞게 빈칸에 알맞은 것을 고르세요.\n\n' + fr[0] + '\n(' + ko + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '순서는 **-thing 말 + 형용사 + to부정사**예요. something(것) + ' + adj + '(' + it[1] + ') + to ' + verb + '(' + it[3] + ')\n\n' + fr[0].replace('[[빈칸]]', '**' + correct + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'homework', m: '숙제', ex: 'I have a lot of homework to do tonight.', exm: '나는 오늘 밤 해야 할 숙제가 많아요.' },
    { w: 'prepare', m: '준비하다', ex: 'We need to prepare some food for the picnic.', exm: '우리는 소풍에 쓸 음식을 좀 준비해야 해요.' },
    { w: 'recipe', m: '요리법', ex: 'This recipe shows how to make kimchi fried rice.', exm: '이 요리법은 김치볶음밥 만드는 법을 보여 줘요.' },
    { w: 'step', m: '단계', ex: 'Read each step carefully.', exm: '각 단계를 주의 깊게 읽으세요.' },
    { w: 'decide', m: '결정하다, 정하다', ex: 'We decided where to go for the field trip.', exm: '우리는 현장 체험 학습으로 어디에 갈지 정했어요.' },
    { w: 'borrow', m: '빌리다', ex: 'Can I borrow a pen to write with?', exm: '쓸 펜을 빌려도 될까요?' },
    { w: 'special', m: '특별한', ex: 'I have nothing special to do this weekend.', exm: '나는 이번 주말에 특별히 할 일이 없어요.' },
    { w: 'cover', m: '덮다', ex: 'Cover the bowl with a cloth.', exm: '그릇을 천으로 덮으세요.' },
    { w: 'pour', m: '붓다, 따르다', ex: 'Pour some water into the cup.', exm: '컵에 물을 좀 부으세요.' },
    { w: 'tie', m: '묶다', ex: 'Tie the string to the paper clip.', exm: '실을 종이 클립에 묶으세요.' },
    { w: 'tight', m: '팽팽한, 꽉 조인', ex: 'Pull the rope tight.', exm: '밧줄을 팽팽하게 당기세요.' },
    { w: 'place', m: '장소, 곳', ex: 'Jeonju has many places to visit.', exm: '전주에는 방문할 곳이 많아요.' },
    { w: 'machine', m: '기계', ex: 'Do you know how to use this machine?', exm: '이 기계를 사용하는 법을 아나요?' },
    { w: 'explain', m: '설명하다', ex: 'Please explain how to solve this problem.', exm: '이 문제를 푸는 법을 설명해 주세요.' },
  ],
});
})();
