/* 중3 영어 · 덧붙여 설명하기 (관계대명사 what) */
Tutor.registerUnit({
  id: 'eng-m3-01',
  course: 'eng-m3',
  title: '덧붙여 설명하기 (관계대명사 what)',
  summary: '관계대명사 what과 whose, 쉼표로 덧붙이는 계속적 용법을 익혀 대상을 더 자세히 설명해요.',
  goals: [
    '관계대명사 what을 "~하는 것"이라는 뜻으로 쓰고 이해할 수 있어요.',
    '앞에 꾸밀 명사가 있는지 보고 that·which와 what을 구별할 수 있어요.',
    '소유격 관계대명사 whose와 쉼표로 덧붙이는 계속적 용법·동격을 쓸 수 있어요.',
    '인물을 소개하는 글에서 덧붙인 정보를 찾을 수 있어요.',
  ],
  standards: ['[9영02-03]', '[9영01-02]', '[9영01-03]'],

  concepts: [
    {
      title: '관계대명사 what: "~하는 것"',
      body: '관계대명사 **what**은 "**~하는 것**"이라는 뜻이에요. 중2에서 배운 who·which·that은 앞에 꾸며 줄 명사(**선행사**)가 꼭 있었지요. what은 선행사를 **자기 안에 품고 있어서** 앞에 명사 없이 써요.\n\n> 💡 what = the thing(s) which(that)\n\n- **What I want** is a new bike. (내가 원하는 것은 새 자전거예요.) — 주어\n- This is **what I want**. (이것이 내가 원하는 것이에요.) — 보어\n- I can\'t believe **what he said**. (나는 그가 말한 것을 믿을 수 없어요.) — 목적어\n\nwhat이 이끄는 덩어리(what절)는 문장 안에서 하나의 **명사**처럼 주어·목적어·보어 자리에 들어가요. 그래서 What I want is ~처럼 what절이 주어이면, 그 덩어리를 하나로 보고 동사는 단수(is)로 써요.',
      easy: 'what을 "**바로 그것**"이 든 상자라고 생각해 보세요.\n\nI want **the thing which** you have.(나는 네가 가진 그것을 원해.)에서 the thing which를 한 낱말로 줄이면 what이 돼요: I want **what** you have.\n\n그래서 what 앞에는 the thing 같은 명사를 또 쓰지 않아요. 이미 상자 안에 들어 있으니까요.',
      check: {
        type: 'choice',
        q: '밑줄 친 부분의 뜻으로 알맞은 것을 고르세요.\n\n__What I need__ is your help.',
        choices: ['내가 필요한 것', '나는 무엇이 필요한가', '내가 필요하기 때문에'],
        answer: 0,
        why: [
          '',
          '물음표가 있는 의문문이 아니에요. 뒤에 is your help가 이어지므로 What I need가 문장의 주어인 "~하는 것"이에요.',
          'what에는 "~ 때문에"라는 뜻이 없어요. 이유는 because로 나타내요.',
        ],
        explain: '관계대명사 what은 "~하는 것"이에요. What I need is your help.는 "내가 필요한 것은 너의 도움이야."라는 뜻이에요.',
      },
    },
    {
      title: 'that·which와 what 구별하기',
      body: '빈칸에 that(which)을 쓸지 what을 쓸지는 **바로 앞에 꾸밀 명사(선행사)가 있는지**로 정해요.\n\n| 앞에 선행사가 | 쓰는 말 | 예문 |\n|---|---|---|\n| **있다** | that / which (사람이면 who) | This is **the bag that** I want. |\n| **없다** | what | This is **what** I want. |\n\n두 문장은 뜻이 거의 같아요. the bag that을 "그것(what)" 하나로 줄였을 뿐이에요.\n\n> ⚠️ the bag what I want(✗)처럼 선행사 뒤에 what을 쓰지 않아요. what 안에 이미 선행사가 들어 있으니 명사가 두 번 들어간 꼴이 돼요.\n\n> 💡 접속사 that과도 헷갈리지 마세요. I know **that** he is honest.의 that 뒤는 빠진 것이 없는 완전한 문장이에요. 관계대명사 what 뒤는 주어나 목적어가 하나 **빠진** 문장이에요(I know what he wants.에서 wants의 목적어가 없지요).',
      easy: '빈칸 바로 앞을 손가락으로 짚어 보세요.\n\n- 손가락 밑에 **명사**(the book, the movie, the boy …)가 있으면 → that·which·who\n- 명사가 없고 is, believe, This is 같은 말이 있으면 → what\n\n"앞에 명사가 있나?" 이 질문 하나로 대부분 풀려요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nI lost the pen [[빈칸]] you gave me.',
        choices: ['that', 'what', 'whose'],
        answer: 0,
        why: [
          '',
          '앞에 선행사 the pen이 있어요. what은 선행사를 품고 있어서 명사 뒤에 쓰지 않아요.',
          'whose 뒤에는 명사가 바로 와야 해요(whose name, whose dream). 여기서는 you가 와요.',
        ],
        explain: '앞에 꾸밀 명사 the pen이 있으므로 that(또는 which)을 써요. I lost the pen **that** you gave me.(나는 네가 준 펜을 잃어버렸어.)',
      },
    },
    {
      title: '소유격 관계대명사 whose',
      body: '"**그 사람(것)의 ~**"를 이어 말할 때는 소유격 관계대명사 **whose**를 써요. whose 바로 뒤에는 **명사**가 와요.\n\n- I have a friend. + **His** dream is to be a pilot.\n- → I have a friend **whose dream** is to be a pilot. (나는 꿈이 비행기 조종사가 되는 것인 친구가 있어요.)\n\n두 번째 문장의 his(그의)가 whose로 바뀌어 앞 문장의 a friend에 붙었어요. 선행사가 사람이든 사물이든 whose를 써요.\n\n- Look at the house **whose roof** is blue. (지붕이 파란 집을 보세요.)\n\n> ⚠️ whose 뒤의 명사 앞에 his·her·the를 또 쓰지 않아요. a friend whose **his** dream(✗)',
      easy: 'whose는 "**누구의**"를 잇는 고리예요. my·his·her·its처럼 "~의"를 나타내는 말이 들어갈 자리에 whose를 넣고, 두 문장을 하나로 묶는다고 생각해 보세요.\n\n"나에게 친구가 있어. **그 친구의** 꿈은 조종사야." → "나에게 **꿈이 조종사인** 친구가 있어." 이렇게요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nI know a girl [[빈칸]] mother is a doctor.',
        choices: ['whose', 'who', 'what'],
        answer: 0,
        why: [
          '',
          'who 뒤에는 동사가 와요(a girl who lives here). 뒤에 mother라는 명사가 오고 "그 소녀의 엄마"라는 뜻이므로 whose예요.',
          '앞에 선행사 a girl이 있어서 what은 쓸 수 없어요.',
        ],
        explain: '"그 소녀의 엄마"이므로 소유격 관계대명사 whose를 써요. I know a girl **whose mother** is a doctor.(나는 엄마가 의사인 소녀를 알아요.)',
      },
    },
    {
      title: '쉼표로 덧붙이기: 계속적 용법과 동격',
      body: '관계대명사 앞에 **쉼표(,)**를 찍으면, 앞의 명사를 "골라내는" 것이 아니라 그 명사에 대해 **정보를 하나 더 덧붙여** 말해요. 이것을 **계속적 용법**이라고 해요.\n\n- My uncle, **who lives in Jeju**, grows oranges. (우리 삼촌은 제주에 사시는데, 귤을 기르세요.)\n- I visited Gyeongju, **which has many old temples**. (나는 경주에 갔는데, 그곳에는 오래된 절이 많아요.)\n\n| | 쉼표 없음 (한정적 용법) | 쉼표 있음 (계속적 용법) |\n|---|---|---|\n| 하는 일 | 여럿 가운데 **어떤** 것인지 골라 줌 | 이미 정해진 대상에 **정보를 덧붙임** |\n| 쓰는 말 | who, which, that, whose | who, which, whose (**that·what은 안 씀**) |\n\n**동격**은 관계대명사 없이 명사를 쉼표 사이에 넣어 "곧 ~인"이라고 덧붙이는 방법이에요.\n\n- **Ms. Kim, my teacher,** likes hiking. (우리 선생님이신 김 선생님은 등산을 좋아하세요.)\n\n> 💡 쉼표 사이의 말을 빼도 문장은 그대로 성립해요. Ms. Kim likes hiking. 덧붙인 정보는 괄호 속 설명이라고 생각하면 돼요.',
      easy: '쉼표 두 개는 **괄호**와 같아요.\n\nMy uncle (그런데 그는 제주에 살아요) grows oranges.\n\n괄호 안의 말은 "덤으로 알려 주는 정보"예요. 괄호를 빼도 "우리 삼촌은 귤을 길러요."라는 문장이 남지요. 괄호 안에서는 that을 쓰지 않는다는 것만 기억하세요.',
      check: {
        type: 'ox',
        q: 'My uncle, that lives in Jeju, is a farmer.는 바른 문장이에요.',
        answer: false,
        explain: '쉼표로 덧붙이는 계속적 용법에는 that을 쓰지 않아요. 사람이므로 who를 써서 My uncle, **who** lives in Jeju, is a farmer.라고 해야 해요.',
      },
    },
    {
      title: '인물 소개 글에서 덧붙인 정보 찾기',
      body: '인물을 소개하는 글에는 이름 뒤에 그 사람에 대한 정보가 덧붙어 있는 경우가 많아요. 다음 세 가지 표시를 찾으면 정보를 빠르게 모을 수 있어요.\n\n1. **쉼표 사이의 명사(동격)** — 직업·관계: Han Seojin, **a baker in Jeonju**, …\n2. **, who / , whose** — 하는 일·특징: …, **who** gets up at 4 a.m. every day.\n3. **what절** — 그 사람이 원하거나 좋아하는 것: **What she loves most** is …\n\n예시 글 (직접 쓴 글)\n\n> Han Seojin, a baker in Jeonju, opened her shop ten years ago. She has a son whose dream is to be a chef. What she loves most is the smell of fresh bread.\n\n- 직업: a baker in Jeonju (동격)\n- 아들의 꿈: to be a chef (whose)\n- 가장 좋아하는 것: the smell of fresh bread (what절)',
      easy: '글을 읽을 때 형광펜 세 개를 들었다고 생각해 보세요.\n\n- 노랑: 쉼표 사이에 낀 명사 → 그 사람이 **누구인지**\n- 초록: who·whose 덩어리 → 그 사람이 **어떤지**\n- 파랑: What으로 시작하는 덩어리 → 그 사람이 **좋아하거나 원하는 것**\n\n색칠한 곳만 모아도 인물 카드가 완성돼요.',
      check: {
        type: 'choice',
        q: '글을 읽고 물음에 답하세요.\n\nOh Minjae, a firefighter in Incheon, has saved many people. He has a daughter whose hobby is drawing.\n\nOh Minjae의 직업은 무엇일까요?',
        choices: ['소방관', '화가', '경찰관'],
        answer: 0,
        why: [
          '',
          '그림 그리기(drawing)는 딸의 취미예요. whose hobby는 "그 딸의 취미"라는 뜻이에요.',
          '경찰관은 police officer예요. 이름 뒤 쉼표 사이의 a firefighter를 다시 읽어 보세요.',
        ],
        explain: '이름 바로 뒤 쉼표 사이의 **a firefighter in Incheon**이 동격으로 덧붙인 정보예요. 그는 인천의 소방관이에요.',
      },
    },
  ],

  examples: [
    {
      q: '빈칸에 that과 what 가운데 알맞은 말을 쓰세요.\n\n(1) This is the cake [[빈칸]] my sister made.\n(2) This is [[빈칸]] my sister made.',
      steps: [
        '(1) 빈칸 바로 앞에 명사 the cake가 있어요. 꾸밀 선행사가 있으니 **that**(또는 which)을 써요.',
        '(2) 빈칸 앞은 This is뿐이고 명사가 없어요. "~하는 것"을 품은 **what**을 써요.',
        '두 문장 모두 뒤의 made에 목적어가 빠져 있어요. 관계대명사가 그 목적어 역할을 해요.',
      ],
      answer: '(1) that (2) what',
    },
    {
      q: '두 문장을 whose를 써서 한 문장으로 만드세요.\n\nI met a boy. + His father is a famous chef.',
      steps: [
        '두 문장에서 같은 사람을 찾아요. a boy와 His(그의)가 같은 사람이에요.',
        '"그의"를 뜻하는 His를 소유격 관계대명사 whose로 바꿔요.',
        'whose + 명사(father) 덩어리를 선행사 a boy 바로 뒤에 붙여요.',
      ],
      answer: 'I met a boy **whose father** is a famous chef.',
    },
  ],

  terms: [
    { term: '선행사', def: '관계대명사 앞에서 관계대명사가 꾸며 주는 명사예요. 예: the bag that I want에서 the bag' },
    { term: '관계대명사 what', def: '선행사를 품고 있는 관계대명사로 "~하는 것"이라는 뜻이에요. the thing which와 같아요. 예: This is what I want.' },
    { term: '소유격 관계대명사', def: '"그 사람(것)의"라는 뜻으로 두 문장을 잇는 whose예요. 뒤에 명사가 바로 와요. 예: a friend whose dream is to be a pilot' },
    { term: '계속적 용법', def: '관계대명사 앞에 쉼표를 찍어 앞의 명사에 정보를 덧붙이는 쓰임이에요. that은 쓰지 않아요. 예: My uncle, who lives in Jeju, grows oranges.' },
    { term: '동격', def: '명사 바로 뒤에 같은 대상을 가리키는 다른 명사를 쉼표로 덧붙이는 것이에요. 예: Ms. Kim, my teacher, likes hiking.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\n[[빈칸]] he said made me happy.',
      choices: ['What', 'That', 'Which', 'Whose'],
      answer: 0,
      why: [
        '',
        '접속사 That 뒤에는 빠진 것이 없는 문장이 와야 해요. he said에는 목적어가 빠져 있으니 "~하는 것"인 What이 알맞아요.',
        '앞에 꾸밀 명사가 없어서 Which는 쓸 수 없어요.',
        'Whose 뒤에는 명사가 와야 해요.',
      ],
      explain: '앞에 선행사가 없고, said의 목적어가 빠져 있으므로 "~하는 것"인 **What**이에요. What he said made me happy.(그가 한 말이 나를 기쁘게 했어요.)',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르세요.\n\nThis is the house [[빈칸]] roof is blue.',
      choices: ['whose', 'which', 'what', 'who'],
      answer: 0,
      why: [
        '',
        'which 뒤에는 명사 없이 동사가 이어져요. 여기는 "그 집의 지붕"이라는 뜻이라 명사 roof 앞에서 "그것의"를 나타내는 whose를 써요.',
        '앞에 선행사 the house가 있어서 what은 쓸 수 없어요.',
        'who는 사람을 꾸미고, 뒤에 동사가 와요.',
      ],
      explain: '"그 집의 지붕"이므로 소유격 관계대명사 **whose**를 써요. 선행사가 사물이어도 whose를 써요. This is the house whose roof is blue.(이것이 지붕이 파란 집이에요.)',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 1,
      q: 'This is the book what I bought yesterday.는 바른 문장이에요.',
      answer: false,
      explain: '앞에 선행사 the book이 있으므로 what이 아니라 that(또는 which)을 써요. This is the book **that** I bought yesterday. 또는 the book을 빼고 This is **what** I bought yesterday.라고 할 수 있어요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 알맞은 관계대명사 한 낱말을 쓰세요.\n\n[[빈칸]] I want for my birthday is a new bike.\n(내가 생일에 원하는 것은 새 자전거예요.)',
      answer: ['what'],
      wrong: [
        { a: 'that', why: 'That 뒤의 I want에는 목적어가 빠져 있어요. 선행사 없이 "~하는 것"을 나타내는 what을 써요.' },
        { a: 'which', why: 'which는 앞에 꾸밀 명사가 있어야 해요. 여기는 문장 맨 앞이라 선행사가 없어요.' },
      ],
      explain: '"내가 원하는 것"처럼 선행사 없이 "~하는 것"을 나타내므로 **what**이에요. What I want for my birthday가 문장의 주어예요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '다음 문장의 뜻으로 알맞은 것을 고르세요.\n\nI have a friend whose dream is to be a pilot.',
      choices: [
        '나에게는 꿈이 비행기 조종사가 되는 것인 친구가 있어요.',
        '나의 꿈은 비행기 조종사인 친구를 갖는 것이에요.',
        '나는 친구에게 비행기 조종사가 되는 꿈을 말했어요.',
        '비행기 조종사인 친구에게는 꿈이 있어요.',
      ],
      answer: 0,
      why: [
        '',
        '꿈을 가진 사람은 "나"가 아니라 친구예요. whose dream은 a friend의 꿈이에요.',
        '말했다(told)는 내용은 문장에 없어요.',
        '친구가 이미 조종사인 것이 아니라, 조종사가 되는 것이 꿈이에요.',
      ],
      explain: 'whose dream은 "그 친구의 꿈"이에요. a friend whose dream is to be a pilot은 "꿈이 비행기 조종사가 되는 것인 친구"예요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 2,
      q: '두 문장을 한 문장으로 만들 때 빈칸에 알맞은 한 낱말을 쓰세요.\n\nI met a boy. His name is Doyun.\n→ I met a boy [[빈칸]] name is Doyun.',
      answer: ['whose'],
      wrong: [
        { a: 'who', why: 'who 뒤에는 동사가 와요. 뒤에 name이라는 명사가 오고 "그의 이름"이라는 뜻이므로 whose예요.' },
        { a: 'his', why: 'his만 쓰면 두 문장이 이어지지 않아요. "그의"를 뜻하면서 문장을 잇는 관계대명사 whose를 써요.' },
      ],
      explain: '두 번째 문장의 His(그의)를 소유격 관계대명사 **whose**로 바꿔요. I met a boy whose name is Doyun.(나는 이름이 도윤인 소년을 만났어요.)',
    },
    {
      id: 'p7', level: 2, type: 'choice', concept: 1,
      q: '다음 중 어법상 **옳지 않은** 문장을 고르세요.',
      choices: [
        'The thing what I want is a cat.',
        'This is what I need.',
        'I like the song that she sang.',
        'Jia, who is my cousin, lives in Ulsan.',
      ],
      answer: 0,
      why: [
        '',
        '바른 문장이에요. 선행사가 없으니 what이 알맞아요.',
        '바른 문장이에요. 선행사 the song 뒤에 that을 썼어요.',
        '바른 문장이에요. 쉼표 뒤에 사람을 덧붙일 때 who를 써요.',
      ],
      hint: '각 문장에서 관계대명사 바로 앞에 명사가 있는지 확인해 보세요.',
      explain: 'The thing what I want ~는 선행사 The thing 뒤에 what을 써서 틀렸어요. **The thing that I want** is a cat. 또는 **What I want** is a cat.으로 고쳐요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 0,
      q: '우리말에 맞게 낱말을 바르게 배열하세요.\n\n이것이 내가 사고 싶었던 것이에요.',
      choices: ['This is', 'what', 'I', 'wanted', 'to buy'],
      answer: [0, 1, 2, 3, 4],
      hint: '"~하는 것"을 나타내는 말이 "이것이 ~이에요(This is)" 뒤에 와요.',
      explain: '**This is what I wanted to buy.** what I wanted to buy(내가 사고 싶었던 것)가 This is 뒤의 보어 자리에 들어가요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '두 문장의 차이를 바르게 설명한 것을 고르세요.\n\n(A) I have two cousins who live in Daegu.\n(B) I have two cousins, who live in Daegu.',
      choices: [
        '(B)는 사촌이 모두 두 명이고, 그 두 명이 대구에 산다는 정보를 덧붙인 말이에요.',
        '(A)와 (B)는 쉼표만 다를 뿐 뜻과 쓰임이 완전히 같아요.',
        '(B)의 who는 that으로 바꾸어 쓸 수 있어요.',
        '(A)는 사촌이 모두 두 명뿐이라는 뜻이에요.',
      ],
      answer: 0,
      why: [
        '',
        '쉼표가 있으면 "골라내기"가 아니라 "덧붙이기"가 되어 뜻이 달라져요.',
        '쉼표로 덧붙이는 계속적 용법에는 that을 쓰지 않아요.',
        '(A)는 "대구에 사는 사촌"을 골라 말한 것이라, 다른 곳에 사는 사촌이 더 있을 수도 있어요.',
      ],
      hint: '쉼표가 "골라내기"인지 "덧붙이기"인지 생각해 보세요.',
      explain: '(A)는 여러 사촌 가운데 "대구에 사는 사촌 두 명"을 골라낸 말이라 다른 사촌이 더 있을 수 있어요. (B)는 "나에게 사촌이 두 명 있는데, 그들은 대구에 살아요."라고 정보를 덧붙인 말이에요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '글을 읽고 물음에 답하세요.\n\nYoon Hana, a scientist in Daejeon, studies insects. She has a brother whose job is teaching music. What she enjoys most is walking in the forest.\n\n글의 내용과 일치하는 것을 고르세요.',
      choices: [
        'Yoon Hana는 숲속을 걷는 것을 가장 즐겨요.',
        'Yoon Hana는 음악을 가르쳐요.',
        'Yoon Hana의 남동생(오빠)은 곤충을 연구해요.',
        'Yoon Hana는 숲에서 일하는 과학자예요.',
      ],
      answer: 0,
      why: [
        '',
        '음악을 가르치는 사람은 그녀의 brother예요. whose job은 "그 형제의 직업"이에요.',
        '곤충을 연구하는 사람은 Yoon Hana 자신이에요.',
        '그녀는 대전의 과학자예요. 숲은 그녀가 걷기를 즐기는 곳이에요.',
      ],
      hint: '쉼표 사이의 말, whose 덩어리, What 덩어리가 각각 누구에 대한 정보인지 확인해 보세요.',
      explain: 'What she enjoys most is walking in the forest.는 "그녀가 가장 즐기는 것은 숲을 걷는 것이에요."라는 뜻이에요. a scientist in Daejeon은 동격(대전의 과학자), whose job is teaching music은 형제의 직업이에요.',
    },
    {
      id: 'p11', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말을 고르세요.\n\nMr. Lee, [[빈칸]] teaches us science, is very kind.',
      choices: ['who', 'that', 'what', 'which'],
      answer: 0,
      why: [
        '',
        '쉼표로 덧붙이는 계속적 용법에는 that을 쓰지 않아요.',
        '앞에 선행사 Mr. Lee가 있어서 what은 쓸 수 없어요.',
        'which는 사물이나 동물을 덧붙여 설명할 때 써요. Mr. Lee는 사람이에요.',
      ],
      explain: '사람(Mr. Lee)에 쉼표로 정보를 덧붙이므로 **who**를 써요. "우리에게 과학을 가르쳐 주시는 이 선생님은 매우 친절하세요."',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'text', concept: 1,
      q: '다음 문장에서 어법상 틀린 낱말 하나를 찾아 바르게 고친 낱말만 쓰세요.\n\nI can\'t understand that he is saying.',
      answer: ['what'],
      hint: 'saying 뒤에 무엇이 빠져 있는지 살펴보세요.',
      wrong: [
        { a: 'which', why: 'which는 앞에 꾸밀 명사가 있어야 해요. understand 뒤에는 선행사가 없어요.' },
        { a: 'say', why: 'is saying(말하고 있다)은 바른 진행형이에요. 틀린 곳은 that이에요.' },
      ],
      explain: '접속사 that 뒤에는 빠진 것이 없는 완전한 문장이 와야 해요. 그런데 he is saying에는 say의 목적어가 빠져 있어요. "그가 말하고 있는 것"이므로 **what**으로 고쳐요: I can\'t understand **what** he is saying.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: '빈칸 (A), (B)에 들어갈 말이 바르게 짝 지어진 것을 고르세요.\n\n(A) The movie [[빈칸]] I saw yesterday was boring.\n(B) [[빈칸]] I saw yesterday was a boring movie.',
      choices: ['that - What', 'what - That', 'what - What', 'whose - What'],
      answer: 0,
      why: [
        '',
        '(A)는 선행사 The movie가 있으니 that, (B)는 선행사가 없으니 What이에요. 순서가 거꾸로예요.',
        '(A)에는 선행사 The movie가 있어서 what을 쓸 수 없어요.',
        'whose 뒤에는 명사가 와야 해요. (A)의 빈칸 뒤에는 I가 와요.',
      ],
      hint: '두 빈칸 앞에 각각 꾸밀 명사가 있는지 보세요.',
      explain: '(A)는 선행사 The movie가 있으므로 **that**(또는 which), (B)는 선행사가 없고 "내가 어제 본 것"이므로 **What**이에요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', fixed: true, concept: 3,
      q: '다음 중 어법상 바른 문장은 모두 몇 개일까요?\n\n- What I like most is reading.\n- This is the bike what my dad bought.\n- I met a woman whose son is a pilot.\n- Seoul, that is the capital of Korea, is a big city.\n- I have a cat, which sleeps all day.',
      choices: ['2개', '3개', '4개', '5개'],
      answer: 1,
      why: [
        '바른 문장을 하나 빠뜨렸어요. 쉼표 뒤 which로 고양이에 정보를 덧붙인 문장도 바른 문장이에요.',
        '',
        '틀린 문장을 하나 더 바르다고 보았어요. the bike what과 Seoul, that을 다시 확인해 보세요.',
        '틀린 문장이 두 개 있어요. 선행사 뒤의 what, 계속적 용법의 that을 찾아보세요.',
      ],
      hint: '선행사 뒤에 what을 쓴 문장, 쉼표 뒤에 that을 쓴 문장을 찾아보세요.',
      explain: '바른 문장: What I like most is reading. / I met a woman whose son is a pilot. / I have a cat, which sleeps all day. → **3개**\n\n틀린 문장: the bike **what** → that(which), Seoul, **that** → which(계속적 용법에는 that을 쓰지 않아요).',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '글을 읽고 물음에 답하세요.\n\nKang Yuri, a carpenter in Gangneung, makes chairs for children. Her workshop, which is next to a small river, is always full of wood. She has a neighbor whose dog visits her every morning. What makes her happiest is seeing children sit on her chairs.\n\n글의 내용과 일치하지 **않는** 것을 고르세요.',
      choices: [
        'Kang Yuri의 개가 매일 아침 이웃을 찾아가요.',
        'Kang Yuri는 강릉의 목수예요.',
        'Kang Yuri의 작업장은 작은 강 옆에 있어요.',
        'Kang Yuri는 아이들이 자기 의자에 앉는 것을 볼 때 가장 행복해요.',
      ],
      answer: 0,
      why: [
        '',
        '맞는 내용이에요. 이름 뒤 동격 a carpenter in Gangneung을 보세요.',
        '맞는 내용이에요. Her workshop, which is next to a small river에서 알 수 있어요.',
        '맞는 내용이에요. What makes her happiest is ~ 문장의 뜻이에요.',
      ],
      hint: 'whose dog가 누구의 개인지 생각해 보세요.',
      explain: 'a neighbor whose dog visits her every morning은 "개가 매일 아침 그녀를 찾아오는 이웃"이에요. 개는 **이웃의 개**이고, 그 개가 Kang Yuri를 찾아와요. 그래서 첫 번째 보기가 글과 맞지 않아요.',
    },
  ],

  deeper: [
    {
      title: 'what절은 문장에서 명사 하나',
      body: 'what절은 아무리 길어도 문장 안에서 **명사 하나**처럼 움직여요. 그래서 명사가 들어갈 수 있는 자리라면 어디든 들어가요.\n\n| 자리 | 예문 |\n|---|---|\n| 주어 | **What you said** surprised me. |\n| 목적어 | I don\'t remember **what I ate**. |\n| 보어 | That is **what I mean**. |\n| 전치사 뒤 | Thank you for **what you did**. |\n\n고등학교 공통영어에서는 관계대명사를 더 깊이 배워요. 예를 들어 쉼표 뒤의 which가 앞 문장 **전체**를 받는 경우(He said nothing, which made me angry.)도 다뤄요.',
    },
  ],

  faq: [
    {
      q: 'what이 의문사인지 관계대명사인지 어떻게 알아요?',
      a: '물음표로 끝나는 질문의 첫머리에 있으면 의문사("무엇")예요. 문장 안에서 "~하는 것"으로 풀어서 자연스러우면 관계대명사예요.\n\nI know what you want.처럼 두 뜻(네가 무엇을 원하는지 / 네가 원하는 것)이 모두 통하는 문장도 있어요. 이럴 때는 전체 뜻이 크게 다르지 않으니 앞뒤 흐름에 맞게 옮기면 돼요.',
    },
    {
      q: '계속적 용법에서는 왜 that을 못 써요?',
      a: '영어에서 오래전부터 그렇게 쓰는 약속이에요. that은 주로 "어떤 것인지 골라내는" 한정적 용법에 써요. 쉼표 뒤에서 정보를 덧붙일 때는 사람이면 who, 사물이면 which를 써요.',
    },
    {
      q: 'whose는 사람한테만 쓰는 거 아니에요?',
      a: '아니에요. whose는 선행사가 사람이든 사물이든 "그것의"를 나타낼 수 있어요. a house whose roof is blue(지붕이 파란 집)처럼요.',
    },
  ],

  mistakes: [
    '선행사 뒤에 what을 쓰는 실수 — the book what I bought(✗). 선행사가 있으면 that·which, 없으면 what이에요.',
    '쉼표 뒤에 that을 쓰는 실수 — My uncle, that lives in Jeju(✗). 계속적 용법에는 who·which를 써요.',
    'whose 뒤에 소유격을 또 쓰는 실수 — a friend whose his dream(✗). whose가 이미 "그의"라는 뜻이에요.',
  ],

  gens: [
    {
      id: 'what-that-whose',
      level: 1,
      title: 'what · that · whose 고르기',
      make: function (R) {
        // [문장(빈칸 포함), 정답, 뜻]
        var items = [
          ['This is [[빈칸]] I want for Christmas.', 'what', '이것이 내가 크리스마스에 원하는 것이에요.'],
          ['[[빈칸]] she told me was true.', 'what', '그녀가 나에게 말한 것은 사실이었어요.'],
          ['I don\'t understand [[빈칸]] the teacher said.', 'what', '나는 선생님이 말씀하신 것을 이해하지 못해요.'],
          ['Show me [[빈칸]] you made in art class.', 'what', '미술 시간에 네가 만든 것을 보여 줘.'],
          ['[[빈칸]] I need now is a glass of water.', 'what', '내가 지금 필요한 것은 물 한 잔이에요.'],
          ['Thank you for [[빈칸]] you did for me.', 'what', '네가 나를 위해 해 준 것에 고마워.'],
          ['That is [[빈칸]] I wanted to say.', 'what', '그것이 내가 말하고 싶었던 것이에요.'],
          ['This is the bag [[빈칸]] I bought yesterday.', 'that', '이것이 내가 어제 산 가방이에요.'],
          ['I lost the cap [[빈칸]] my uncle gave me.', 'that', '나는 삼촌이 주신 모자를 잃어버렸어요.'],
          ['The pizza [[빈칸]] we ordered was cold.', 'that', '우리가 주문한 피자는 식어 있었어요.'],
          ['She is the singer [[빈칸]] I like most.', 'that', '그녀는 내가 가장 좋아하는 가수예요.'],
          ['Do you remember the song [[빈칸]] we sang together?', 'that', '우리가 함께 불렀던 노래를 기억하니?'],
          ['The book [[빈칸]] Minsu lent me was funny.', 'that', '민수가 나에게 빌려준 책은 재미있었어요.'],
          ['I have a friend [[빈칸]] dream is to be a vet.', 'whose', '나에게는 꿈이 수의사가 되는 것인 친구가 있어요.'],
          ['Look at the tree [[빈칸]] leaves are red.', 'whose', '잎이 빨간 저 나무를 보세요.'],
          ['I met a girl [[빈칸]] brother is a soccer player.', 'whose', '나는 오빠(남동생)가 축구 선수인 소녀를 만났어요.'],
          ['He is the boy [[빈칸]] bike was stolen.', 'whose', '그는 자전거를 도둑맞은 소년이에요.'],
          ['We stayed at a hotel [[빈칸]] pool was very big.', 'whose', '우리는 수영장이 아주 큰 호텔에 머물렀어요.'],
          ['Jia has a cat [[빈칸]] eyes are blue.', 'whose', '지아에게는 눈이 파란 고양이가 있어요.'],
        ];
        var it = R.pick(items);
        var ans = it[1];
        var pick = R.choices(ans, ['what', 'that', 'whose'].filter(function (x) { return x !== ans; }), 3);
        var reason = {
          what: ans === 'that'
            ? '빈칸 앞에 선행사(명사)가 있어요. what은 선행사를 품고 있어서 명사 뒤에 쓰지 않아요.'
            : '빈칸 뒤에 명사가 오고 "그것의 ~"라는 뜻이에요. 이때는 소유격 whose를 써요.',
          that: ans === 'what'
            ? '빈칸 앞에 꾸밀 명사가 없어요. 선행사 없이 "~하는 것"을 나타낼 때는 what을 써요.'
            : '빈칸 뒤 명사와 이어져 "그것의 ~"라는 뜻이에요. that이 아니라 소유격 whose를 써요.',
          whose: 'whose 뒤에는 명사가 바로 와야 해요. 빈칸 뒤 낱말을 다시 보세요.',
        };
        var rule = {
          what: '빈칸 앞에 꾸밀 명사가 없고 "~하는 것"이라는 뜻이므로 **what**이에요.',
          that: '빈칸 앞에 선행사(명사)가 있고 뒤 문장에 목적어가 빠져 있으므로 **that**(또는 which)이에요.',
          whose: '빈칸 뒤에 명사가 오고 "그것(그 사람)의 ~"라는 뜻이므로 소유격 관계대명사 **whose**예요.',
        }[ans];
        return {
          type: 'choice', concept: ans === 'whose' ? 2 : 1,
          q: '빈칸에 알맞은 말을 고르세요.\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === ans ? '' : reason[c]; }),
          explain: rule + '\n\n' + it[0].replace('[[빈칸]]', '**' + ans + '**') + '\n(' + it[2] + ')',
        };
      },
    },
    {
      id: 'nonrestrictive',
      level: 2,
      title: '쉼표 뒤 관계대명사 고르기 (계속적 용법)',
      make: function (R) {
        // [문장, 정답, 뜻]
        var items = [
          ['Jia, [[빈칸]] is my best friend, lives next door.', 'who', '지아는 내 가장 친한 친구인데, 옆집에 살아요.'],
          ['My aunt, [[빈칸]] works at a hospital, is very busy.', 'who', '우리 이모는 병원에서 일하시는데, 무척 바쁘세요.'],
          ['Mr. Park, [[빈칸]] teaches us math, has two cats.', 'who', '박 선생님은 우리에게 수학을 가르치시는데, 고양이 두 마리를 기르세요.'],
          ['I called Seojun, [[빈칸]] answered right away.', 'who', '나는 서준이에게 전화했는데, 그는 곧바로 받았어요.'],
          ['Gyeongju, [[빈칸]] has many old temples, is a popular city.', 'which', '경주에는 오래된 절이 많은데, 인기 있는 도시예요.'],
          ['I read this book, [[빈칸]] was written in 1900.', 'which', '나는 이 책을 읽었는데, 그것은 1900년에 쓰였어요.'],
          ['Our school, [[빈칸]] is near the river, is very old.', 'which', '우리 학교는 강 근처에 있는데, 아주 오래되었어요.'],
          ['We ate bibimbap, [[빈칸]] is my favorite food.', 'which', '우리는 비빔밥을 먹었는데, 그것은 내가 가장 좋아하는 음식이에요.'],
          ['Hayun, [[빈칸]] father is a pilot, travels a lot.', 'whose', '하윤이는 아버지가 조종사인데, 여행을 많이 다녀요.'],
          ['My grandma, [[빈칸]] garden is full of flowers, loves spring.', 'whose', '우리 할머니는 정원이 꽃으로 가득한데, 봄을 무척 좋아하세요.'],
          ['Doyun, [[빈칸]] sister is a nurse, wants to be a doctor.', 'whose', '도윤이는 누나가 간호사인데, 의사가 되고 싶어 해요.'],
          ['This old house, [[빈칸]] roof is red, belongs to my uncle.', 'whose', '지붕이 빨간 이 오래된 집은 우리 삼촌의 것이에요.'],
        ];
        var it = R.pick(items);
        var ans = it[1];
        var others = ['who', 'which', 'whose', 'that'].filter(function (x) { return x !== ans; });
        var pick = R.choices(ans, others, 4);
        var reason = {
          that: '쉼표로 덧붙이는 계속적 용법에는 that을 쓰지 않아요.',
          who: ans === 'which' ? 'who는 사람에 덧붙일 때 써요. 앞의 명사는 사람이 아니에요.' : '빈칸 뒤에 명사가 오고 "그 사람(것)의 ~"라는 뜻이라 whose를 써요.',
          which: ans === 'who' ? 'which는 사물·동물·장소에 덧붙일 때 써요. 앞의 명사는 사람이에요.' : '빈칸 뒤에 명사가 오고 "그 사람(것)의 ~"라는 뜻이라 whose를 써요.',
          whose: 'whose 뒤에는 명사가 바로 와야 해요. 이 문장의 빈칸 뒤에는 동사가 와요.',
        };
        var rule = {
          who: '앞의 명사가 사람이고 빈칸 뒤에 동사가 오므로 **who**예요.',
          which: '앞의 명사가 사물·장소이고 빈칸 뒤에 동사가 오므로 **which**예요.',
          whose: '빈칸 뒤에 명사가 오고 "그 사람(것)의 ~"라는 뜻이므로 **whose**예요.',
        }[ans];
        return {
          type: 'choice', concept: 3,
          q: '빈칸에 알맞은 말을 고르세요.\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === ans ? '' : reason[c]; }),
          explain: rule + ' 쉼표 뒤에서 정보를 덧붙이는 계속적 용법이라 that은 쓸 수 없어요.\n\n' + it[0].replace('[[빈칸]]', '**' + ans + '**') + '\n(' + it[2] + ')',
        };
      },
    },
  ],

  vocab: [
    { w: 'introduce', m: '소개하다', ex: 'Let me introduce my friend Jia.', exm: '내 친구 지아를 소개할게요.' },
    { w: 'pilot', m: '비행기 조종사', ex: 'My cousin wants to be a pilot.', exm: '내 사촌은 비행기 조종사가 되고 싶어 해요.' },
    { w: 'inventor', m: '발명가', ex: 'The inventor made a robot that cleans windows.', exm: '그 발명가는 창문을 닦는 로봇을 만들었어요.' },
    { w: 'volunteer', m: '자원봉사하다; 자원봉사자', ex: 'She volunteers at the library every Saturday.', exm: '그녀는 토요일마다 도서관에서 자원봉사를 해요.' },
    { w: 'neighbor', m: '이웃', ex: 'Our neighbor, who is a cook, gave us some soup.', exm: '요리사인 우리 이웃이 우리에게 수프를 조금 주셨어요.' },
    { w: 'author', m: '작가, 저자', ex: 'The author of this book lives in Busan.', exm: '이 책의 작가는 부산에 살아요.' },
    { w: 'award', m: '상', ex: 'He won an award for his drawing.', exm: '그는 그림으로 상을 받았어요.' },
    { w: 'believe', m: '믿다', ex: 'I can\'t believe what I saw.', exm: '나는 내가 본 것을 믿을 수 없어요.' },
    { w: 'explain', m: '설명하다', ex: 'Can you explain what this word means?', exm: '이 낱말이 무슨 뜻인지 설명해 줄 수 있니?' },
    { w: 'carpenter', m: '목수', ex: 'The carpenter built a wooden bench.', exm: '그 목수는 나무 벤치를 만들었어요.' },
    { w: 'firefighter', m: '소방관', ex: 'The firefighter saved a little dog.', exm: '소방관이 작은 개를 구했어요.' },
    { w: 'hobby', m: '취미', ex: 'My hobby is taking pictures.', exm: '내 취미는 사진 찍기예요.' },
    { w: 'proud', m: '자랑스러워하는', ex: 'I am proud of what we made together.', exm: '나는 우리가 함께 만든 것이 자랑스러워요.' },
    { w: 'workshop', m: '작업장, 공방', ex: 'His workshop is full of tools.', exm: '그의 작업장은 도구로 가득해요.' },
  ],
});
