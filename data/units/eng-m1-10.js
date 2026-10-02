/* 중1 영어 · 고마운 마음 전하기 (수여동사·감탄문) */
Tutor.registerUnit({
  id: 'eng-m1-10',
  course: 'eng-m1',
  title: '고마운 마음 전하기 (수여동사·감탄문)',
  summary: 'give, send 같은 수여동사와 감탄문을 익혀 고마운 마음을 전하는 편지나 이메일을 예의 바르게 써요.',
  goals: [
    '수여동사 + 사람 + 물건 문장으로 "누구에게 무엇을 주다"를 말할 수 있어요.',
    '수여동사 문장을 to나 for를 써서 바꾸어 쓸 수 있어요.',
    'What과 How로 감탄문을 만들 수 있어요.',
    '감사 편지·이메일의 짜임과 공손한 표현을 알고 알맞은 문장을 고를 수 있어요.',
  ],
  standards: [],

  concepts: [
    {
      title: '수여동사: 누구에게 무엇을 주다',
      body: 'give(주다), send(보내다), show(보여 주다), tell(말해 주다), teach(가르쳐 주다), buy(사 주다), make(만들어 주다)처럼 "누구에게 무엇을 ~해 주다"라는 뜻의 동사를 **수여동사**라고 해요.\n\n수여동사는 목적어를 두 개 가질 수 있어요. 순서는 **사람(~에게) + 물건(~을)**이에요.\n\n| 주어 | 수여동사 | 사람 (~에게) | 물건 (~을) |\n|---|---|---|---|\n| My aunt | gave | **me** | **a nice watch**. |\n| Jia | sent | **her grandpa** | **a card**. |\n| Mr. Kim | teaches | **us** | **science**. |\n\n"~에게"에 해당하는 사람을 **간접목적어**, "~을"에 해당하는 물건을 **직접목적어**라고 해요. 이런 문장을 흔히 **4형식** 문장이라고 불러요.\n\n> ⚠️ 사람 자리에 대명사를 쓸 때는 목적격(me, him, her, us, them)을 써요. gave I a watch(✗) → gave **me** a watch',
      easy: '선물 상자를 건네는 장면을 떠올려 보세요. 먼저 "누구에게"(받는 사람)를 보고, 그다음 "무엇을"(상자)을 건네지요.\n\nMy aunt gave **me** / **a watch**.\n이모가 줬어요 / 나에게 / 시계를.\n\n동사 바로 뒤에 받는 사람, 그 뒤에 물건 — 이 순서만 지키면 돼요.',
      check: {
        type: 'choice',
        q: '우리말에 맞는 문장을 고르세요.\n\n민수는 나에게 사진을 보여 주었어요.',
        choices: ['Minsu showed me a picture.', 'Minsu showed a picture me.', 'Minsu showed I a picture.'],
        answer: 0,
        why: ['', '수여동사 뒤에는 사람(~에게)을 먼저, 물건(~을)을 나중에 써요.', '사람 자리에는 목적격 me를 써요. I는 주어 자리에 쓰는 말이에요.'],
        explain: '수여동사 show 뒤에 사람(me) + 물건(a picture) 순서로 써요. Minsu showed **me a picture**.',
      },
    },
    {
      title: '물건을 먼저 쓰기: to와 for',
      body: '수여동사 문장은 **물건을 먼저** 쓰고 사람 앞에 **to**나 **for**를 넣어 바꿀 수 있어요. 이런 문장을 흔히 **3형식** 문장이라고 해요.\n\nMy aunt gave me a watch. → My aunt gave a watch **to** me.\n\n동사에 따라 to를 쓸지 for를 쓸지가 정해져요.\n\n| 전치사 | 동사 | 느낌 | 예문 |\n|---|---|---|---|\n| **to** | give, send, show, tell, teach, lend, write | 상대에게 **건네 가는** 일 | She sent a letter **to** me. |\n| **for** | buy, make, cook, get | 상대를 **위해** 해 주는 일 | Dad made a cake **for** us. |\n\ngive, send는 물건이 상대에게 "가는" 것이라서 방향의 to, buy, make는 상대를 "위해" 사고 만드는 것이라서 for와 어울려요.\n\n> ⚠️ 물건이 it, them 같은 대명사면 보통 to/for 문장으로 써요: Give it to me.(Give me it. ✗)',
      easy: 'to는 화살표(→), for는 하트(♡)라고 생각해 보세요.\n\n- give, send, show: 물건이 **→ 상대에게** 날아가요 → **to**\n- buy, make, cook: 상대를 **♡ 위해서** 사고 만들어요 → **for**\n\nI bought a hat **for** Mom.(엄마를 위해 모자를 샀어요.) / I gave the hat **to** Mom.(엄마에게 모자를 건넸어요.)',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nGrandma made a sweater [[빈칸]] me.',
        choices: ['for', 'to', 'of'],
        answer: 0,
        why: ['', 'make는 상대를 위해 만들어 주는 동사라서 to가 아니라 for를 써요.', '수여동사 문장을 바꿀 때 of는 이 동사들과 쓰지 않아요.'],
        explain: 'make는 상대를 **위해** 만들어 주는 동사라서 **for**를 써요. Grandma made a sweater for me.(할머니께서 나에게 스웨터를 만들어 주셨어요.)',
      },
    },
    {
      title: '감탄문: What과 How',
      body: '"정말 ~하구나!"라고 놀라움이나 기쁨을 크게 나타내는 문장을 **감탄문**이라고 해요. 끝에 느낌표(!)를 찍어요.\n\n| 꼴 | 강조하는 것 | 예문 |\n|---|---|---|\n| **What + a/an + 형용사 + 명사** (+ 주어 + 동사)! | 명사 | **What a nice day** (it is)! |\n| **How + 형용사/부사** (+ 주어 + 동사)! | 형용사·부사 | **How kind** you are! |\n\n- 뒤에 **명사**가 있으면 What, **형용사·부사만** 있으면 How예요.\n- 명사가 복수이거나 셀 수 없으면 a/an을 쓰지 않아요: **What beautiful flowers!** / **What nice weather!**\n- 주어 + 동사는 흔히 생략해요: What a nice day! / How kind!\n\n일반 문장에서 감탄문으로 바꿀 수도 있어요.\n\nYou are very kind. → **How kind you are!**\nIt is a very tall tree. → **What a tall tree it is!**',
      easy: '감탄문은 "와!" 하고 놀라는 문장이에요. 무엇에 놀랐는지 보세요.\n\n- **물건·사람 전체**(a nice day, a big dog)에 놀랐다 → **What** a big dog!\n- **성질 하나**(kind, fast)에 놀랐다 → **How** fast!\n\n뒤에 명사가 있는지 한 번만 확인하면 돼요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\n[[빈칸]] a beautiful garden it is!',
        choices: ['What', 'How', 'Very'],
        answer: 0,
        why: ['', '뒤에 명사(garden)가 있어요. How 뒤에는 형용사·부사만 와요.', 'Very는 감탄문을 이끌지 않아요. 감탄문은 What이나 How로 시작해요.'],
        explain: '뒤에 a + 형용사 + 명사(a beautiful garden)가 있으므로 **What**을 써요. What a beautiful garden it is!(정말 아름다운 정원이구나!)',
      },
    },
    {
      title: '감사 편지·이메일의 짜임',
      body: '고마운 마음을 전하는 편지나 이메일은 보통 이런 차례로 써요.\n\n1. **인사** — 받는 사람 부르기: Dear Ms. Park,\n2. **감사한 일** — 무엇이 고마운지 구체적으로: Thank you for the book. / Thank you for **helping** me.\n3. **느낌** — 그 일로 어떤 마음이 들었는지: I was so happy. / What a wonderful gift!\n4. **끝인사** — 앞날을 바라는 말과 이름: I hope to see you soon. / Best wishes, Jiwoo\n\n예시 이메일\n\n> Dear Ms. Park,\n> Thank you for your swimming lessons this summer. At first, I was scared of the water. But you were always kind and patient. Now I can swim 25 meters! How happy I am!\n> I hope you have a wonderful fall.\n> Sincerely, Doyun\n\nThank you for 뒤에는 **명사**나 **동명사(-ing)**를 써요(for는 전치사). 6단원에서 배웠지요.',
      easy: '감사 편지는 "누구에게 → 무엇이 → 어떤 마음 → 안녕" 네 칸짜리 상자라고 생각해 보세요.\n\n- 누구에게: Dear ○○,\n- 무엇이 고마운지: Thank you for ~\n- 어떤 마음이었는지: I was so happy.\n- 안녕: Best wishes, 내 이름\n\n특히 "무엇이" 고마운지를 구체적으로 쓰면 마음이 더 잘 전해져요.',
      check: {
        type: 'choice',
        q: '감사 편지에서 **감사한 일**에 해당하는 문장을 고르세요.',
        choices: ['Thank you for inviting me to your birthday party.', 'Dear Seojun,', 'Best wishes, Hayun'],
        answer: 0,
        why: ['', '받는 사람을 부르는 첫인사예요.', '편지를 마무리하는 끝인사와 이름이에요.'],
        explain: 'Thank you for ~는 무엇이 고마운지 밝히는 **감사한 일** 부분이에요. "생일 파티에 초대해 줘서 고마워."',
      },
    },
    {
      title: '상대를 배려하는 공손한 표현',
      body: '감사 편지나 부탁하는 글에서는 상대를 배려하는 **공손한 표현**을 써요. 같은 뜻이라도 말투에 따라 느낌이 크게 달라요.\n\n| 덜 공손함 | 더 공손함 |\n|---|---|\n| Give me the book. | **Could you** give me the book? |\n| I want to visit you. | **I\'d like to** visit you. |\n| Thanks. | **Thank you so much.** / **I really appreciate** your help. |\n| Send me the photos. | **Would you** send me the photos, **please**? |\n\n- **Could you ~? / Would you ~?** — 부탁할 때 (~해 주시겠어요?)\n- **I\'d like to ~** — 원하는 것을 부드럽게 (~하고 싶어요)\n- **please** — 부탁 문장에 붙이면 더 공손해요.\n- 어른께 쓰는 편지라면 Dear Mr./Ms. + 성, 끝인사는 Sincerely,처럼 격식 있게 써요.',
      easy: '같은 부탁도 "줘!"와 "주실 수 있을까요?"는 느낌이 다르지요? 영어도 마찬가지예요.\n\nGive me … (줘!) → **Could you** give me …? (주실 수 있나요?)\n\n물음표로 물어보고, please를 붙이고, I want 대신 I\'d like를 쓰면 훨씬 부드러워져요.',
      check: {
        type: 'ox',
        q: 'Could you send me the photos?는 Send me the photos.보다 더 공손한 표현이에요.',
        answer: true,
        explain: 'Could you ~?는 상대에게 "~해 주실 수 있나요?"라고 부드럽게 묻는 공손한 부탁이에요. 명령문 Send me the photos.보다 더 공손해요.',
      },
    },
  ],

  examples: [
    {
      q: '같은 뜻이 되도록 바꾸어 쓰세요.\n\nMy uncle bought me a soccer ball.\n→ My uncle bought a soccer ball [[빈칸]] me.',
      steps: [
        '물건(a soccer ball)을 먼저 쓰면 사람(me) 앞에 to나 for가 필요해요.',
        'buy는 상대를 위해 사 주는 동사예요. 그래서 for와 어울려요.',
        'My uncle bought a soccer ball **for** me. (삼촌이 나에게 축구공을 사 주셨어요.)',
      ],
      answer: 'for',
    },
    {
      q: '감탄문으로 바꾸어 쓰세요.\n\nThe puppy is very cute.',
      steps: [
        'very cute에서 강조할 것은 형용사 cute예요. 뒤에 명사가 없으니 How로 시작해요.',
        'How + 형용사 + 주어 + 동사! 순서로 써요. very는 빼요.',
        '**How cute the puppy is!** (강아지가 정말 귀엽구나!)',
      ],
      answer: 'How cute the puppy is!',
    },
  ],

  terms: [
    { term: '수여동사', def: '"누구에게 무엇을 ~해 주다"라는 뜻으로 목적어를 두 개(사람, 물건) 가질 수 있는 동사예요. 예: give, send, show, buy' },
    { term: '간접목적어', def: '수여동사 문장에서 "~에게"에 해당하는 말이에요. 주로 사람이에요. 예: She gave **me** a pen.의 me' },
    { term: '직접목적어', def: '수여동사 문장에서 "~을/를"에 해당하는 말이에요. 주로 물건이에요. 예: She gave me **a pen**.의 a pen' },
    { term: '감탄문', def: '"정말 ~하구나!"라고 놀라움이나 기쁨을 나타내는 문장이에요. What이나 How로 시작하고 느낌표를 찍어요.' },
    { term: '공손한 표현', def: '상대를 배려해 부드럽고 예의 바르게 말하는 표현이에요. 예: Could you ~?, I\'d like to ~, please' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n아빠가 나에게 재미있는 이야기를 해 주셨어요.\nDad told [[빈칸]] a funny story.',
      choices: ['me', 'I', 'my', 'mine'],
      answer: 0,
      why: ['', 'I는 주어 자리에 쓰는 말이에요. 사람(~에게) 자리에는 목적격 me를 써요.', 'my는 "나의"라는 뜻으로 명사 앞에 써요.', 'mine은 "나의 것"이라는 뜻이에요. 사람(~에게) 자리에는 me를 써요.'],
      explain: '수여동사 tell 뒤에 사람(~에게) + 물건(~을) 순서로 써요. 사람 자리에는 목적격 **me**를 써요. Dad told me a funny story.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말을 고르세요.\n\nSeojun sent an email [[빈칸]] his teacher.',
      choices: ['to', 'for', 'of', 'at'],
      answer: 0,
      why: ['', 'send는 물건이 상대에게 가는 동사라서 for가 아니라 to를 써요.', 'of는 수여동사 send와 함께 쓰지 않아요.', 'at은 장소나 시간을 나타낼 때 써요.'],
      explain: 'send는 물건(이메일)이 상대에게 **건너가는** 동사라서 **to**를 써요. Seojun sent an email to his teacher.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 1,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 한 낱말을 쓰세요.\n\nMom cooked us spaghetti.\n= Mom cooked spaghetti [[빈칸]] us.',
      answer: ['for'],
      wrong: [{ a: 'to', why: 'cook은 상대를 위해 요리해 주는 동사라서 to가 아니라 for를 써요.' }],
      explain: 'cook은 buy, make처럼 상대를 **위해** 해 주는 동사라서 **for**를 써요. (엄마가 우리에게 스파게티를 요리해 주셨어요.)',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르세요.\n\n[[빈칸]] fast the cheetah runs!',
      choices: ['How', 'What', 'What a', 'Which'],
      answer: 0,
      why: ['', 'What은 뒤에 명사가 있을 때 써요. fast는 부사예요.', 'What a 뒤에는 형용사 + 단수 명사가 와요. fast 뒤에 명사가 없어요.', 'Which는 "어느 것"을 묻는 의문사예요.'],
      explain: '빈칸 뒤에 부사 fast만 있고 명사가 없으므로 **How**를 써요. How fast the cheetah runs!(치타는 정말 빨리 달리는구나!)',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 2,
      q: 'What a nice shoes!는 바른 감탄문이에요.',
      answer: false,
      explain: 'shoes는 복수 명사이므로 a를 쓰지 않아요. 바른 감탄문은 **What nice shoes!**(정말 멋진 신발이구나!)예요.',
    },
    {
      id: 'p6', level: 1, type: 'order', concept: 0,
      q: '우리말에 맞게 순서대로 놓으세요.\n\n지아는 나에게 자기 그림을 보여 주었어요.',
      choices: ['Jia', 'showed', 'me', 'her drawing.'],
      answer: [0, 1, 2, 3],
      explain: 'Jia(주어) + showed(수여동사) + me(사람, ~에게) + her drawing(물건, ~을). 사람을 먼저, 물건을 나중에 써요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '선생님께 부탁할 때 가장 공손한 표현을 고르세요.',
      choices: ['Could you check my homework, please?', 'Check my homework.', 'You check my homework.', 'I want you check my homework.'],
      answer: 0,
      why: ['', '명령하는 말투라서 선생님께 쓰기에는 공손하지 않아요.', '"네가 내 숙제를 확인해"라는 뜻으로 공손하지 않아요.', '공손하지 않고, 어법에도 맞지 않아요.'],
      explain: '**Could you ~, please?**는 "~해 주시겠어요?"라는 공손한 부탁이에요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 1,
      q: '빈칸에 들어갈 말이 나머지 셋과 **다른** 것을 고르세요.',
      choices: ['I bought a scarf [[빈칸]] my mom.', 'He gave his old bike [[빈칸]] me.', 'She showed her new phone [[빈칸]] us.', 'They told the news [[빈칸]] everyone.'],
      answer: 0,
      why: ['', 'give는 to를 써요. 나머지 문장들과 같은 to예요.', 'show는 to를 써요. 나머지 문장들과 같은 to예요.', 'tell은 to를 써요. 나머지 문장들과 같은 to예요.'],
      hint: '동사가 상대에게 "건네는" 일인지, 상대를 "위해" 하는 일인지 생각해 보세요.',
      explain: 'buy는 상대를 위해 사 주는 동사라서 **for**를 써요(I bought a scarf for my mom.). give, show, tell은 모두 **to**를 써요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'text', concept: 2,
      q: '감탄문이 되도록 빈칸에 알맞은 두 낱말을 쓰세요.\n\nIt is a very exciting game.\n= [[빈칸]] exciting game it is!',
      answer: ['what an'],
      wrong: [
        { a: 'what a', why: 'exciting은 모음 소리로 시작하므로 a가 아니라 an을 써요.' },
        { a: 'how an', why: '뒤에 명사(game)가 있으므로 How가 아니라 What을 써요.' },
      ],
      hint: '뒤에 명사가 있는지, exciting이 어떤 소리로 시작하는지 보세요.',
      explain: '뒤에 형용사 + 명사(exciting game)가 있으므로 What을 쓰고, exciting이 모음 소리로 시작하므로 an을 써요. **What an** exciting game it is!',
    },
    {
      id: 'p10', level: 2, type: 'order', concept: 3,
      q: '감사 편지가 되도록 순서대로 놓으세요.',
      choices: ['Dear Grandpa,', 'Thank you for the nice bike.', 'I ride it every day, and I feel so happy.', 'Love, Minsu'],
      answer: [0, 1, 2, 3],
      explain: '인사(Dear Grandpa,) → 감사한 일(Thank you for the nice bike.) → 느낌(매일 타고, 정말 행복해요) → 끝인사와 이름(Love, Minsu) 순서예요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '다음 이메일을 읽고, 빈칸에 가장 알맞은 문장을 고르세요.\n\nDear Jiwoo,\nThank you for lending me your notebook last week. I was sick and missed two classes. [[빈칸]] Your notes were so clear and helpful.\nBest wishes,\nHayun',
      choices: ['Thanks to you, I could study for the test.', 'I want to borrow your bike, too.', 'What a boring class it was!', 'Please give me your notebook again.'],
      answer: 0,
      why: ['', '감사 편지에서 갑자기 다른 부탁을 하는 것은 흐름에 맞지 않아요.', '공책이 도움이 되었다는 앞뒤 흐름과 상관없는 감탄문이에요.', '고마움을 전하는 글에서 다시 달라고 하는 것은 흐름과 맞지 않아요.'],
      hint: '빈칸 뒤 문장은 공책이 도움이 되었다는 내용이에요.',
      explain: '아파서 수업을 빠졌는데(앞), 공책이 분명하고 도움이 되었다(뒤)는 흐름이므로 "네 덕분에 시험공부를 할 수 있었어."가 자연스러워요. 고마운 일의 결과를 구체적으로 말해 주는 문장이지요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 0,
      q: '어법상 **틀린** 문장을 고르세요.',
      choices: ['Mr. Lee teaches we English.', 'Can you lend me your eraser?', 'My friend wrote me a long letter.', 'Please pass me the salt.'],
      answer: 0,
      why: ['', 'lend + 사람(me) + 물건(your eraser) 순서가 바른 문장이에요.', 'write + 사람(me) + 물건(a long letter) 순서가 바른 문장이에요.', 'pass + 사람(me) + 물건(the salt) 순서가 바른 문장이에요.'],
      explain: '수여동사 뒤 사람 자리에는 목적격을 써야 하므로 we가 아니라 **us**예요. Mr. Lee teaches **us** English.(이 선생님은 우리에게 영어를 가르쳐 주세요.)',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', fixed: true, concept: 1,
      q: '다음 중 어법상 바른 문장은 모두 몇 개일까요?\n\n- She made a doll for her sister.\n- He gave a present for me.\n- I will send you a postcard.\n- Dad bought a new desk to me.\n- Can you show the map to us?',
      choices: ['1개', '2개', '3개', '4개'],
      answer: 2,
      why: ['바른 문장을 더 찾아보세요. 사람을 먼저 쓴 문장도 확인해요.', '바른 문장을 하나 빠뜨렸어요. show the map to us는 바른 문장이에요.', '', '틀린 문장을 바르다고 보았어요. give와 buy가 어떤 전치사와 짝인지 확인해 보세요.'],
      hint: '동사마다 to와 for 가운데 무엇과 짝인지 확인하세요.',
      explain: '바른 문장은 made a doll for her sister(make → for), send you a postcard(사람 + 물건), show the map to us(show → to) 세 개예요.\n\n- gave a present for me → give는 **to**: gave a present to me\n- bought a new desk to me → buy는 **for**: bought a new desk for me',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '감탄문으로 바르게 바꾼 것을 고르세요.\n\nThey are very beautiful flowers.',
      choices: ['What beautiful flowers they are!', 'What a beautiful flowers they are!', 'How beautiful flowers they are!', 'What beautiful flowers are they!'],
      answer: 0,
      why: ['', 'flowers는 복수 명사이므로 a를 쓰지 않아요.', '뒤에 명사(flowers)가 있으므로 How가 아니라 What을 써요.', '감탄문은 끝에 주어 + 동사 순서로 써요. are they가 아니라 they are예요.'],
      hint: '명사가 있는지, 복수인지, 주어와 동사의 순서는 어떤지 확인하세요.',
      explain: '명사 flowers가 있으니 What, 복수이니 a 없이, 끝은 주어 + 동사 순서로: **What beautiful flowers they are!**(정말 아름다운 꽃들이구나!)',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'text', concept: 1,
      q: '빈칸에 알맞은 한 낱말을 쓰세요. (두 빈칸에 같은 낱말이 들어가요.)\n\n- I got a ticket [[빈칸]] my brother.\n- Mom made sandwiches [[빈칸]] the whole family.',
      answer: ['for'],
      wrong: [{ a: 'to', why: 'get, make는 상대를 위해 해 주는 동사라서 for를 써요.' }],
      hint: 'get과 make는 상대에게 건네는 일인가요, 상대를 위해 하는 일인가요?',
      explain: 'get(구해 주다), make(만들어 주다)는 상대를 **위해** 해 주는 동사라서 둘 다 **for**를 써요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '다음은 지아가 담임 선생님께 쓴 감사 이메일이에요. 고쳐 쓰면 **더 공손해지는** 것을 고르세요.\n\nDear Ms. Han,\n(A) Thank you so much for your help with my speech.\n(B) Because of you, I was not nervous on the stage.\n(C) Give me some advice for my next speech.\n(D) Sincerely, Jia',
      choices: ['(C) → Could you give me some advice for my next speech?', '(A) → Thanks for help.', '(B) → You helped. I was okay.', '(D) → Bye, Jia'],
      answer: 0,
      why: ['', '오히려 짧고 덜 공손해졌어요. 원래 문장이 더 정중해요.', '감사한 결과를 구체적으로 말한 원래 문장이 더 좋아요.', '선생님께 쓰는 이메일이라 Sincerely 같은 격식 있는 끝인사가 더 알맞아요.'],
      hint: '명령문처럼 들리는 문장을 찾아보세요.',
      explain: '(C) Give me ~는 명령하는 말투라서 선생님께 쓰기에 공손하지 않아요. **Could you ~?**로 바꾸면 "~해 주실 수 있을까요?"라는 공손한 부탁이 돼요.',
    },
  ],

  deeper: [
    {
      title: '대명사 물건은 to/for 문장으로',
      body: '물건 자리에 it, them 같은 대명사가 오면 보통 사람을 먼저 쓰는 문장으로 쓰지 않아요.\n\n- Give me it.(✗) → Give **it to me**. (그거 나한테 줘.)\n- I bought her them.(✗) → I bought **them for her**.\n\n또 어떤 동사는 to, for가 아닌 다른 전치사와 짝을 이루기도 해요. 예를 들어 ask는 ask a question **of** him처럼 of를 쓰기도 해요(드물게 쓰여요).\n\n중학교 2학년에서는 "누구를 무엇이라고 부르다(call him Jimmy)", "누구에게 ~하라고 하다(ask him to come)"처럼 목적어 뒤에 보충하는 말이 오는 문장을 배워요.',
    },
  ],

  faq: [
    {
      q: 'give는 to, buy는 for인 걸 다 외워야 해요?',
      a: '자주 쓰는 동사부터 느낌으로 기억하면 쉬워요. 물건이 상대에게 "건너가면"(give, send, show, tell, teach, lend) to, 상대를 "위해서" 사거나 만들면(buy, make, cook, get) for예요. 예문을 소리 내어 읽으면 귀에 익어요.',
    },
    {
      q: '감탄문에서 What이랑 How는 어떻게 골라요?',
      a: '느낌표 앞의 덩어리에 **명사**가 있는지 보세요. What a big dog!처럼 명사가 있으면 What, How big!처럼 형용사·부사만 있으면 How예요.',
    },
    {
      q: 'Thank you for 뒤에는 뭘 써요?',
      a: 'for는 전치사라서 뒤에 명사(Thank you for the gift.)나 동명사(Thank you for helping me.)를 써요. Thank you for help me.처럼 동사원형을 쓰면 틀려요.',
    },
  ],

  mistakes: [
    '사람 자리에 주격을 쓰는 실수 — She gave I a pen.(✗) → She gave **me** a pen.',
    'buy, make에 to를 쓰는 실수 — I made a card to Mom.(✗) → I made a card **for** Mom.',
    '복수 명사 감탄문에 a를 쓰는 실수 — What a cute puppies!(✗) → **What cute puppies!**',
  ],

  gens: [
    {
      id: 'dative-to-for',
      level: 2,
      title: '수여동사 문장을 to/for 문장으로 바꾸기',
      make: function (R) {
        // [과거형, 원형, 전치사, 물건 목록]
        var verbs = [
          ['gave', 'give', 'to', ['a pencil case', 'some flowers', 'a birthday card']],
          ['sent', 'send', 'to', ['a letter', 'an email', 'a postcard']],
          ['showed', 'show', 'to', ['the photos', 'the map', 'a new game']],
          ['told', 'tell', 'to', ['a funny story', 'the news', 'the answer']],
          ['taught', 'teach', 'to', ['a Korean song', 'a magic trick', 'some English words']],
          ['lent', 'lend', 'to', ['an umbrella', 'a pen', 'a comic book']],
          ['bought', 'buy', 'for', ['a cap', 'some cookies', 'a new bag']],
          ['made', 'make', 'for', ['a cake', 'a paper crane', 'some sandwiches']],
          ['cooked', 'cook', 'for', ['dinner', 'fried rice', 'some soup']],
          ['got', 'get', 'for', ['a ticket', 'a glass of water', 'a chair']],
        ];
        var subjects = ['Jia', 'Minsu', 'My dad', 'Seojun', 'Grandma', 'Hayun'];
        var people = ['me', 'us', 'her', 'him', 'my brother', 'the kids'];
        var v = R.pick(verbs);
        var thing = R.pick(v[3]);
        var s = R.pick(subjects);
        var p = R.pick(people);
        var correct = v[2];
        var other = correct === 'to' ? 'for' : 'to';
        var pick = R.choices(correct, [other, 'at', 'with'], 4);
        var reasons = {};
        reasons[other] = correct === 'to'
          ? v[1] + '처럼 물건이 상대에게 건너가는 동사는 for가 아니라 to를 써요.'
          : v[1] + '처럼 상대를 위해 해 주는 동사는 to가 아니라 for를 써요.';
        reasons.at = 'at은 장소나 시간을 나타낼 때 써요. 사람 앞에는 to나 for를 써요.';
        reasons.with = 'with는 "~와 함께"라는 뜻이에요. 받는 사람 앞에는 to나 for를 써요.';
        return {
          type: 'choice', concept: 1,
          q: '두 문장의 뜻이 같도록 빈칸에 알맞은 말을 고르세요.\n\n' + s + ' ' + v[0] + ' ' + p + ' ' + thing + '.\n= ' + s + ' ' + v[0] + ' ' + thing + ' [[빈칸]] ' + p + '.',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reasons[c]; }),
          explain: (correct === 'to' ? '동사 ' + v[1] + ' 뒤에서는 물건이 상대에게 건너가므로' : '동사 ' + v[1] + ' 뒤에서는 상대를 위해 해 주는 일이므로') + ' 사람 앞에 **' + correct + '**를 써요.\n\n' + s + ' ' + v[0] + ' ' + thing + ' ' + correct + ' ' + p + '.',
        };
      },
    },
  ],

  vocab: [
    { w: 'give', m: '주다', ex: 'Please give this note to Minsu.', exm: '이 쪽지를 민수에게 전해 주세요.' },
    { w: 'send', m: '보내다', ex: 'I will send you a postcard from Busan.', exm: '부산에서 너에게 엽서를 보낼게.' },
    { w: 'show', m: '보여 주다', ex: 'Can you show me your new sneakers?', exm: '네 새 운동화 좀 보여 줄래?' },
    { w: 'lend', m: '빌려주다', ex: 'Could you lend me your ruler?', exm: '자 좀 빌려줄 수 있니?' },
    { w: 'present', m: '선물', ex: 'This present is for you.', exm: '이 선물은 너를 위한 거야.' },
    { w: 'thankful', m: '고맙게 여기는, 감사하는', ex: 'I\'m thankful for your kindness.', exm: '너의 친절에 감사해.' },
    { w: 'appreciate', m: '고마워하다, 감사하다', ex: 'I really appreciate your help.', exm: '도와주셔서 정말 감사합니다.' },
    { w: 'kindness', m: '친절', ex: 'I will never forget your kindness.', exm: '당신의 친절을 절대 잊지 않을게요.' },
    { w: 'helpful', m: '도움이 되는', ex: 'Your advice was very helpful.', exm: '네 조언은 아주 도움이 되었어.' },
    { w: 'invite', m: '초대하다', ex: 'Thank you for inviting me.', exm: '초대해 줘서 고마워.' },
    { w: 'advice', m: '조언, 충고', ex: 'Can you give me some advice?', exm: '나에게 조언을 좀 해 줄래?' },
    { w: 'polite', m: '공손한, 예의 바른', ex: 'Please be polite to older people.', exm: '어른들께 공손하게 대해 주세요.' },
    { w: 'wonderful', m: '아주 멋진, 훌륭한', ex: 'What a wonderful day!', exm: '정말 멋진 날이구나!' },
    { w: 'sincerely', m: '진심으로 (편지 끝인사)', ex: 'Sincerely, Doyun', exm: '진심을 담아, 도윤 드림' },
  ],
});
