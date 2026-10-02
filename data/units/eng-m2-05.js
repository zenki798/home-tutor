/* 중2 영어 · 부탁하고 시키기 (목적격 보어) */
(function () {
  // 직접 쓴 쪽지
  var NOTE = '**A Note from Mom**\n\nDear Minsu,\n\nI have to work late today. Could you do some things for me? Please walk Coco after school. Don\'t let her eat chocolate. It can make her sick. Ask your sister to help you with the dishes. Keep the windows closed because it may rain this evening. Thank you!\n\nLove, Mom';

Tutor.registerUnit({
  id: 'eng-m2-05',
  course: 'eng-m2',
  title: '부탁하고 시키기 (목적격 보어)',
  summary: 'want·tell + 목적어 + to부정사와 make·let + 목적어 + 동사원형으로 남에게 바라는 일을 말해요.',
  goals: [
    'want/ask/tell/advise + 목적어 + to부정사로 남에게 바라거나 부탁하는 일을 말할 수 있어요.',
    '사역동사 make/have/let + 목적어 + 동사원형, help + 목적어 + (to) 동사원형을 쓸 수 있어요.',
    'make/keep/find + 목적어 + 형용사, call/name + 목적어 + 명사를 쓸 수 있어요.',
    'Could you ~?로 공손하게 부탁하고, 알맞게 받아들이거나 거절할 수 있어요.',
  ],
  standards: ['[9영02-11]', '[9영02-10]', '[9영01-06]'],

  concepts: [
    {
      title: 'want/ask/tell/advise + 목적어 + to부정사',
      body: '"(누구)에게 ~하라고/~해 달라고 하다"처럼 남에게 바라는 일을 말할 때 **동사 + 목적어 + to부정사**를 써요. 이때 to부정사는 목적어가 **할 일**을 설명해요. 이렇게 목적어를 설명해 주는 말을 **목적격 보어**라고 해요.\n\n| 동사 | 뜻 | 예문 |\n|---|---|---|\n| want | (목적어)가 ~하기를 원하다 | I **want you to come** to my party. |\n| ask | (목적어)에게 ~해 달라고 부탁하다 | She **asked me to help** her. |\n| tell | (목적어)에게 ~하라고 말하다 | Mom **told me to clean** my room. |\n| advise | (목적어)에게 ~하라고 충고하다 | The doctor **advised him to rest**. |\n\n- I want **to go**. (내가 가고 싶어요.) ↔ I want **you to go**. (네가 가기를 원해요.)\n\n목적어가 있으면 **그 일을 하는 사람은 목적어**예요.\n\n> 💡 "~하지 말라고"는 to 앞에 **not**을 써요. Mom told me **not to run** in the house.',
      easy: '이 문장은 **"누가 → 누구에게 → 무엇을 하라고"** 순서로 말해요.\n\n- Mom(누가) told(말했다) me(나에게) to clean my room(방을 치우라고)\n\n가운데의 "누구에게(me)"가 실제로 그 일을 할 사람이에요. 그 사람이 할 일 앞에는 **to**를 붙여 "할 일 꼬리표"를 달아 준다고 생각하면 쉬워요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nMy teacher told us [[빈칸]] quiet.',
        choices: ['to be', 'be', 'being'],
        answer: 0,
        why: ['', 'tell + 목적어 뒤에는 동사원형이 아니라 to부정사를 써요.', 'tell + 목적어 뒤에는 -ing 꼴이 아니라 to부정사를 써요.'],
        explain: 'tell + 목적어 + **to부정사**예요. My teacher told us **to be** quiet.(선생님은 우리에게 조용히 하라고 말씀하셨어요.)',
      },
    },
    {
      title: '사역동사 make/have/let + 목적어 + 동사원형',
      body: '**사역동사**는 "남에게 어떤 일을 시키다"라는 뜻의 동사예요. make, have, let은 목적어 뒤에 to 없이 **동사원형**을 써요.\n\n| 동사 | 느낌 | 예문 |\n|---|---|---|\n| make | (억지로라도) ~하게 하다 | Mom **made me wash** the dishes. |\n| have | (부탁하거나 맡겨서) ~하게 하다 | I **had my brother carry** the box. |\n| let | ~하게 허락하다, ~하게 두다 | My dad **let me go** to the concert. |\n\n- **Let me introduce** myself. (제 소개를 할게요.)\n- The teacher **made us read** the story again.\n\n> ⚠️ 사역동사 뒤에 to부정사를 쓰지 않아요. My dad let me **to go**(✗) → let me **go**\n\n> 💡 want, tell(+ to부정사)과 make, let(+ 동사원형)을 짝지어 구별해 두세요.',
      easy: '사역동사 make, have, let은 **"to를 싫어하는 세 친구"**라고 외워 보세요.\n\n- make me **wash** — 씻게 만들었다\n- have him **carry** — 나르게 했다\n- let me **go** — 가게 해 주었다\n\n세 친구 뒤에서는 목적어 다음에 동사원형이 바로 와요. 뜻의 차이는 make(시킴) – have(맡김) – let(허락)이에요.',
      check: {
        type: 'ox',
        q: 'My dad let me to go to the concert.는 바른 문장이에요.',
        answer: false,
        explain: 'let은 사역동사라서 목적어 뒤에 동사원형을 써요. **My dad let me go to the concert.**(아빠는 내가 콘서트에 가게 해 주셨어요.)',
      },
    },
    {
      title: 'help + 목적어 + (to) 동사원형',
      body: '**help**는 목적어 뒤에 **동사원형**과 **to부정사**를 둘 다 쓸 수 있어요. 뜻은 같아요.\n\n- She **helped me find** my bag. = She **helped me to find** my bag. (그녀는 내가 가방을 찾는 것을 도와주었어요.)\n- Can you **help us move** this table?\n\n목적어 뒤에 명사가 올 때는 **help + 목적어 + with + 명사**로 써요.\n- He **helped me with** my homework. (그는 내 숙제를 도와주었어요.)\n\n> ⚠️ help + 목적어 뒤에 -ing 꼴은 쓰지 않아요. She helped me **finding** it.(✗)',
      easy: 'help는 **"to가 있어도 없어도 괜찮은 친구"**예요. 사역동사처럼 to 없이 써도 되고, want처럼 to를 붙여도 돼요.\n\n- help me **carry** = help me **to carry** (나르는 것을 돕다)\n\n돕는 일이 동작이면 동사를, 돕는 대상이 물건이나 일(숙제 등)이면 with를 써요.',
      check: {
        type: 'ox',
        q: 'Jia helped me find my key.와 Jia helped me to find my key.는 둘 다 바른 문장이에요.',
        answer: true,
        explain: 'help + 목적어 뒤에는 동사원형(find)과 to부정사(to find)를 모두 쓸 수 있어요. 둘 다 "지아는 내가 열쇠를 찾는 것을 도와주었어요."라는 뜻이에요.',
      },
    },
    {
      title: 'make/keep/find + 목적어 + 형용사, call/name + 목적어 + 명사',
      body: '목적격 보어 자리에 **형용사**나 **명사**가 와서 목적어의 상태나 이름을 설명하기도 해요.\n\n**동사 + 목적어 + 형용사**: 목적어가 어떤 **상태**인지\n\n| 동사 | 뜻 | 예문 |\n|---|---|---|\n| make | (목적어)를 ~하게 만들다 | The news **made me happy**. |\n| keep | (목적어)를 ~한 상태로 두다 | **Keep** your room **clean**. |\n| find | (목적어)가 ~하다고 알게 되다 | I **found the book easy**. |\n\n**동사 + 목적어 + 명사**: 목적어가 **누구·무엇**인지\n- We **call** him **Little Tiger**. (우리는 그를 꼬마 호랑이라고 불러요.)\n- They **named** the puppy **Coco**. (그들은 강아지 이름을 코코라고 지었어요.)\n\n> ⚠️ 목적격 보어 자리에는 **부사를 쓰지 않아요**. The news made me **happily**.(✗) → made me **happy**\n\n> 💡 목적어와 보어 사이에 "= (이다)" 관계가 있어요. made me happy → me = happy(내가 행복하다), call him Little Tiger → him = Little Tiger',
      easy: '목적격 보어는 목적어에게 붙이는 **이름표나 상태 표시**예요.\n\n- made me **happy** → 나에게 "행복함" 표시\n- keep the room **clean** → 방에 "깨끗함" 표시를 계속 붙여 두기\n- call him **Little Tiger** → 그에게 "꼬마 호랑이" 이름표\n\n표시는 "어떤 상태인지"를 말하는 형용사여야 해요. happily(행복하게)는 동작을 꾸미는 말이라 표시로 붙일 수 없어요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nThe movie made me [[빈칸]].',
        choices: ['sad', 'sadly', 'to sad'],
        answer: 0,
        why: ['', 'sadly는 부사예요. 목적어의 상태를 나타내는 자리에는 형용사를 써요.', 'to 뒤에는 동사원형이 와야 해요. 상태를 말할 때는 형용사만 써요.'],
        explain: 'make + 목적어 + **형용사**예요. The movie made me **sad**.(그 영화는 나를 슬프게 했어요.) — me = sad',
      },
    },
    {
      title: '공손하게 부탁하고 답하기',
      body: '남에게 무엇을 해 달라고 부탁할 때는 **Can you ~?**보다 **Could you ~?**가 더 공손해요. please를 넣으면 더 부드러워요.\n\n| 부탁하기 | 예문 |\n|---|---|\n| Can you ~? | Can you open the door? |\n| Could you ~? | **Could you** lend me your pen? |\n| Could you please ~? | **Could you please** turn down the music? |\n| Can you do me a favor? | 부탁 하나 들어줄 수 있어요? |\n\n| 받아들이기 | 거절하기 |\n|---|---|\n| Sure. / Of course. | **I\'m afraid I can\'t.** |\n| No problem. | Sorry, but I can\'t. |\n\n거절할 때는 **이유**를 덧붙이면 더 예의 바르게 들려요.\n- A: **Could you** help me carry these boxes?\n- B: **I\'m afraid I can\'t.** I have to go to the dentist now.\n\n> 💡 Could you ~?는 과거의 일을 묻는 말이 아니라 **지금 부탁하는 공손한 말**이에요. 그래서 대답도 Yes, I could.가 아니라 Sure.나 I\'m afraid I can\'t.로 해요.',
      easy: 'Could you ~?는 Can you ~?에 **"혹시"**를 붙인 말이라고 생각하세요.\n\n- Can you help me? → 도와줄 수 있어?\n- Could you help me? → 혹시 도와주실 수 있을까요?\n\n거절할 때 I\'m afraid는 "미안하지만, 아쉽게도"라는 뜻이에요. 무서워서(afraid)가 아니라 정중하게 거절하는 말이에요.',
      check: {
        type: 'choice',
        q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: Could you help me carry these boxes?\nB: [[빈칸]] I have to go to the dentist now.',
        choices: ['I\'m afraid I can\'t.', 'Sure, no problem.', 'Yes, I could.'],
        answer: 0,
        why: ['', '받아들이는 말 뒤에 "지금 치과에 가야 한다"는 말이 오면 앞뒤가 맞지 않아요.', 'Could you ~?는 지금 부탁하는 말이라 Yes, I could.로 답하지 않아요.'],
        explain: '뒤에 "지금 치과에 가야 해요"라는 거절의 이유가 나오니, 공손하게 거절하는 **I\'m afraid I can\'t.**가 알맞아요.',
      },
    },
  ],

  examples: [
    {
      q: '우리말에 맞게 영어로 나타내 보세요.\n\n엄마는 나에게 방을 청소하라고 말씀하셨어요.',
      steps: [
        '"누가 → 말했다": Mom told',
        '"누구에게": me',
        'tell + 목적어 뒤에는 to부정사: **to clean** my room',
      ],
      answer: 'Mom **told me to clean** my room.',
    },
    {
      q: '빈칸에 알맞은 말을 넣어 보세요.\n\n(1) The teacher made us [[빈칸]] (read) the story again.\n(2) I want you [[빈칸]] (read) this book.',
      steps: [
        '(1) made는 사역동사예요. 목적어 뒤에 동사원형: **read**',
        '(2) want + 목적어 뒤에는 to부정사: **to read**',
      ],
      answer: '(1) read (2) to read',
    },
  ],

  terms: [
    { term: '목적격 보어', def: '목적어 뒤에서 목적어가 하는 일이나 상태·이름을 설명해 주는 말이에요. 예: I want you **to come**. / The news made me **happy**.' },
    { term: '사역동사', def: '남에게 어떤 일을 시키는 뜻의 동사예요. make, have, let은 목적어 뒤에 동사원형을 써요. 예: Mom made me wash the dishes.' },
    { term: 'want + 목적어 + to부정사', def: '"(목적어)가 ~하기를 원하다"라는 뜻이에요. ask, tell, advise도 같은 꼴로 써요.' },
    { term: 'help + 목적어 + (to) 동사원형', def: 'help 뒤에는 동사원형과 to부정사를 모두 쓸 수 있어요. 예: help me (to) carry' },
    { term: 'Could you ~?', def: '"~해 주실 수 있을까요?"라는 공손한 부탁의 말이에요. Sure. / I\'m afraid I can\'t.로 답해요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nI want you [[빈칸]] to my birthday party.',
      choices: ['to come', 'come', 'coming', 'came'],
      answer: 0,
      why: ['', 'want + 목적어 뒤에는 동사원형이 아니라 to부정사를 써요.', 'want + 목적어 뒤에는 -ing 꼴이 아니라 to부정사를 써요.', 'came은 과거형이에요. want + 목적어 뒤에는 to부정사가 와요.'],
      explain: 'want + 목적어 + **to부정사**예요. I want you **to come** to my birthday party.(나는 네가 내 생일 파티에 오기를 원해.)',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '괄호 안의 동사를 알맞은 꼴로 바꿔 빈칸에 쓰세요. (두 낱말)\n\nThe doctor advised him [[빈칸]] some rest. (take)',
      answer: ['to take'],
      wrong: [
        { a: 'take', why: 'advise + 목적어 뒤에는 to부정사를 써요. take 앞에 to를 붙여요.' },
        { a: 'taking', why: 'advise + 목적어 뒤에는 -ing 꼴이 아니라 to부정사를 써요.' },
      ],
      explain: 'advise + 목적어 + **to부정사**예요. The doctor advised him **to take** some rest.(의사는 그에게 좀 쉬라고 충고했어요.)',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말을 고르세요.\n\nMom made me [[빈칸]] the dishes.',
      choices: ['wash', 'to wash', 'washing', 'washed'],
      answer: 0,
      why: ['', 'make는 사역동사라서 목적어 뒤에 to 없이 동사원형을 써요.', '사역동사 make + 목적어 뒤에는 -ing 꼴을 쓰지 않아요.', '내가 하는 일이니 동사원형을 써요. washed는 과거형이에요.'],
      explain: '사역동사 make + 목적어 + **동사원형**이에요. Mom made me **wash** the dishes.(엄마는 나에게 설거지를 하게 하셨어요.)',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: 'The teacher had us to write a report.는 바른 문장이에요.',
      answer: false,
      explain: 'have가 "~하게 하다"라는 사역동사로 쓰이면 목적어 뒤에 동사원형을 써요. **The teacher had us write a report.**(선생님은 우리에게 보고서를 쓰게 하셨어요.)',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말을 고르세요.\n\nThis song always makes me [[빈칸]].',
      choices: ['happy', 'happily', 'to happy', 'happiness'],
      answer: 0,
      why: ['', 'happily는 부사예요. 목적어의 상태를 나타내는 자리에는 형용사를 써요.', 'to 뒤에는 동사원형이 와야 해요. 상태는 형용사로 나타내요.', 'happiness는 "행복"이라는 명사예요. me = happiness가 아니라 me = happy(내가 행복하다)예요.'],
      explain: 'make + 목적어 + **형용사**예요. This song always makes me **happy**.(이 노래는 언제나 나를 행복하게 해요.)',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 3,
      q: '우리말에 맞게 빈칸에 알맞은 한 낱말을 쓰세요.\n\nKeep your room [[빈칸]].\n(방을 깨끗하게 유지하세요.)',
      answer: ['clean', 'tidy', 'neat'],
      wrong: [
        { a: 'cleanly', why: '목적격 보어 자리에는 부사를 쓰지 않아요. 방의 상태를 나타내는 형용사 clean을 써요.' },
        { a: 'cleaning', why: '방이 청소를 하는 것이 아니에요. 방의 상태(깨끗한)를 나타내는 형용사를 써요.' },
      ],
      explain: 'keep + 목적어 + **형용사**예요. Keep your room **clean**.(your room = clean) tidy, neat도 "깔끔한"이라는 뜻이라 맞아요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: Could you lend me your umbrella?\nB: [[빈칸]] I need it to go home.',
      choices: ['Sorry, but I can\'t.', 'Sure. Here you are.', 'No problem.', 'Yes, I could.'],
      answer: 0,
      why: ['', '우산을 빌려주겠다고 하고서 "집에 가는 데 필요하다"고 하면 앞뒤가 맞지 않아요.', 'No problem.은 받아들이는 말이에요. 뒤의 이유와 맞지 않아요.', 'Could you ~?는 지금 부탁하는 말이라 Yes, I could.로 답하지 않아요.'],
      explain: '뒤에 "집에 가는 데 필요하다"는 거절의 이유가 나오니, **Sorry, but I can\'t.**로 거절해요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 0,
      q: '우리말에 맞게 순서대로 놓으세요.\n\n엄마는 나에게 일찍 자라고 말씀하셨어요.',
      choices: ['Mom', 'told', 'me', 'to go to bed', 'early.'],
      answer: [0, 1, 2, 3, 4],
      hint: '"누가 → 말했다 → 누구에게 → 무엇을 하라고" 순서예요.',
      explain: 'Mom(누가) + told(말했다) + me(나에게) + to go to bed early(일찍 자라고). tell + 목적어 + to부정사예요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 1,
      q: 'I had my brother carry the box.의 뜻으로 알맞은 것을 고르세요.',
      choices: ['나는 남동생에게 상자를 나르게 했다.', '남동생이 나에게 상자를 나르게 했다.', '나는 남동생의 상자를 날라 주었다.', '나는 남동생과 함께 상자를 날랐다.'],
      answer: 0,
      why: ['', '시킨 사람은 주어 I이고, 상자를 나른 사람은 목적어 my brother예요.', 'had는 "가지고 있었다"가 아니라 "~하게 했다"는 사역의 뜻이에요. 나른 사람은 남동생이에요.', '"함께"라는 말은 문장에 없어요. 나는 시키고 남동생이 날랐어요.'],
      hint: '목적어 뒤의 동사원형(carry)을 하는 사람은 누구일까요?',
      explain: 'have + 목적어 + 동사원형은 "(목적어)에게 ~하게 하다"예요. 상자를 나른 사람은 목적어 **my brother**예요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'text', concept: 0,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 두 낱말을 쓰세요.\n\nThe teacher said to us, "Be quiet."\n= The teacher told us [[빈칸]] quiet.',
      answer: ['to be'],
      wrong: [
        { a: 'be', why: 'tell + 목적어 뒤에는 to부정사를 써요. be 앞에 to를 붙여요.' },
        { a: 'are', why: '목적어 뒤에서 할 일을 나타낼 때는 to + 동사원형을 써요. are가 아니라 to be예요.' },
      ],
      hint: '"~하라고 말하다"는 tell + 목적어 + to부정사예요.',
      explain: '"조용히 해."라고 말한 것은 "우리에게 조용히 하라고 말했다"는 뜻이니 told us **to be** quiet예요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 2,
      q: '빈칸에 들어갈 수 **없는** 것을 고르세요.\n\nSua helped me [[빈칸]] my homework.',
      choices: ['finishing', 'finish', 'to finish', 'with'],
      answer: 0,
      why: ['', 'help + 목적어 + 동사원형으로 쓸 수 있어요. Sua helped me finish my homework.', 'help + 목적어 + to부정사로 쓸 수 있어요. Sua helped me to finish my homework.', 'help + 목적어 + with + 명사로 쓸 수 있어요. Sua helped me with my homework.'],
      hint: 'help + 목적어 뒤에 올 수 있는 꼴을 떠올려 보세요.',
      explain: 'help + 목적어 뒤에는 동사원형, to부정사, 또는 with + 명사가 올 수 있어요. **-ing 꼴(finishing)**은 쓰지 않아요.',
    },
    {
      id: 'p12', level: 2, type: 'ox', concept: 4,
      q: 'Could you ~?는 Can you ~?보다 더 공손하게 부탁하는 말이에요.',
      answer: true,
      explain: 'Could you ~?는 "~해 주실 수 있을까요?"라는 뜻으로 Can you ~?보다 정중해요. 처음 보는 사람이나 어른께 부탁할 때 쓰면 좋아요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      q: '어법상 **어색한** 문장을 고르세요.',
      choices: ['She made me to clean the room.', 'I want you to be happy.', 'Let me help you.', 'The news made everyone sad.'],
      answer: 0,
      why: ['', 'want + 목적어 + to부정사로 바른 문장이에요.', '사역동사 let + 목적어 + 동사원형(help)으로 바른 문장이에요.', 'make + 목적어 + 형용사(sad)로 바른 문장이에요.'],
      hint: '사역동사 뒤에 to부정사를 쓴 문장이 있는지 보세요.',
      explain: '사역동사 make는 목적어 뒤에 동사원형을 써요. **She made me clean the room.**(그녀는 나에게 방을 청소하게 했어요.)',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 0,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 세 낱말을 쓰세요.\n\nDad said to me, "Don\'t play games too long."\n= Dad told me [[빈칸]] games too long.',
      answer: ['not to play'],
      wrong: [
        { a: 'to play', why: 'Don\'t play(하지 마)라는 말이니 부정의 뜻을 살려야 해요. to 앞에 not을 써요.' },
        { a: 'don\'t play', why: 'tell + 목적어 뒤에는 to부정사를 써요. "~하지 말라고"는 not to + 동사원형이에요.' },
        { a: 'to not play', why: '말할 때 가끔 들리지만, 학교 문법에서는 not을 to 앞에 두어 not to play로 써요.' },
      ],
      hint: '"~하지 말라고 말하다"는 tell + 목적어 + not + to부정사예요.',
      explain: '"게임을 너무 오래 하지 마."는 "게임을 너무 오래 하지 말라고 말했다"는 뜻이에요. to부정사의 부정은 to 앞에 not을 써서 **not to play**예요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 1,
      q: '두 문장의 뜻을 바르게 비교한 것을 고르세요.\n\n(A) The coach made us run.\n(B) The coach let us run.',
      choices: ['(A)는 코치가 달리라고 시킨 것이고, (B)는 달리게 허락한 것이다.', '(A)와 (B)는 뜻이 완전히 같다.', '(A)는 코치가 달린 것이고, (B)는 우리가 달린 것이다.', '(A)는 틀린 문장이고, (B)만 바른 문장이다.'],
      answer: 0,
      why: ['', 'make는 "억지로라도 ~하게 하다", let은 "~하게 허락하다"라서 느낌이 달라요.', '두 문장 모두 달린 사람은 목적어 us예요. 코치는 시키거나 허락한 사람이에요.', '두 문장 모두 사역동사 + 목적어 + 동사원형으로 바른 문장이에요.'],
      explain: 'make + 목적어 + 동사원형은 "~하게 시키다", let + 목적어 + 동사원형은 "~하게 허락하다"예요. 두 문장에서 달린 사람은 모두 **us**(우리)예요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      q: '다음 쪽지를 읽고, 민수가 해야 할 일이 **아닌** 것을 고르세요.\n\n' + NOTE,
      choices: ['창문을 열어 두기', '방과 후에 코코 산책시키기', '설거지할 때 누나에게 도와 달라고 하기', '코코가 초콜릿을 먹지 못하게 하기'],
      answer: 0,
      why: ['', 'Please walk Coco after school.이라고 했어요. 민수가 해야 할 일이에요.', 'Ask your sister to help you with the dishes.라고 했어요. 민수가 해야 할 일이에요.', 'Don\'t let her eat chocolate.이라고 했어요. 코코가 초콜릿을 먹게 두지 말라는 뜻이에요.'],
      hint: 'Keep the windows로 시작하는 문장을 꼼꼼히 읽어 보세요.',
      explain: 'Keep the windows **closed** because it may rain this evening.(저녁에 비가 올지 모르니 창문을 닫아 두렴.)이라고 했어요. 창문은 닫아 두어야 해요. keep + 목적어 + 형용사(closed: 닫힌)예요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 3,
      q: '두 빈칸에 공통으로 들어갈 말을 고르세요.\n\nThe funny joke [[빈칸]] everyone laugh.\nThe cold weather [[빈칸]] me sick.',
      choices: ['made', 'let', 'wanted', 'told'],
      answer: 0,
      why: ['', 'let everyone laugh는 되지만, let me sick처럼 let 뒤에 형용사를 써서 "아프게 하다"라는 뜻을 나타내지 않아요.', 'want + 목적어 뒤에는 to부정사가 와야 해요. wanted everyone laugh는 틀려요.', 'tell + 목적어 뒤에는 to부정사가 와야 하고, told me sick이라는 표현도 없어요.'],
      hint: '목적어 뒤에 동사원형도 오고 형용사도 올 수 있는 동사를 찾아보세요.',
      explain: '**make**는 목적어 뒤에 동사원형(made everyone laugh: 모두를 웃게 했다)도, 형용사(made me sick: 나를 아프게 했다)도 쓸 수 있어요.',
    },
  ],

  deeper: [
    {
      title: '다음에 배울 지각동사와의 연결',
      body: '사역동사 make, have, let처럼 목적어 뒤에 **동사원형**을 쓰는 동사가 또 있어요. 다음 단원에서 배울 **지각동사**(see, watch, hear, feel)예요.\n\n- I **saw** him **cross** the street. (나는 그가 길을 건너는 것을 보았어요.)\n- I **heard** someone **call** my name. (나는 누군가 내 이름을 부르는 것을 들었어요.)\n\n"동사 + 목적어 + 목적격 보어"라는 틀은 같고, 동사에 따라 보어의 꼴(to부정사, 동사원형, 형용사, 명사)이 달라져요. 동사마다 짝을 지어 기억해 두면 문장을 정확하게 만들 수 있어요.',
    },
  ],

  faq: [
    {
      q: 'want 뒤에는 to를 쓰는데 make 뒤에는 왜 안 써요?',
      a: '영어에서 동사마다 뒤에 오는 꼴이 정해져 있기 때문이에요. want, ask, tell, advise는 목적어 뒤에 to부정사를, 사역동사 make, have, let은 동사원형을 써요. 이유를 따지기보다 "make/have/let은 to를 안 쓴다"고 짝지어 외우는 것이 가장 확실해요.',
    },
    {
      q: 'help는 to를 써도 되고 안 써도 된다면서요? 그럼 뭐가 맞아요?',
      a: '둘 다 맞아요. help me carry와 help me to carry는 뜻도 같아요. 다만 -ing 꼴(help me carrying)은 틀려요.',
    },
    {
      q: '"I\'m afraid I can\'t."는 무섭다는 뜻이에요?',
      a: '아니에요. 여기서 I\'m afraid는 "미안하지만, 유감스럽게도"라는 뜻으로 거절이나 안 좋은 소식을 부드럽게 전하는 말이에요. 거절할 때 이유를 덧붙이면 더 예의 바르게 들려요.',
    },
  ],

  mistakes: [
    '사역동사 뒤에 to부정사를 쓰는 실수 — Mom made me **to** clean(✗) → Mom made me **clean**',
    'want·tell 뒤에 동사원형을 쓰는 실수 — I want you come(✗) → I want you **to come**',
    '목적격 보어 자리에 부사를 쓰는 실수 — The news made me happily(✗) → made me **happy**',
  ],

  gens: [
    {
      id: 'to-or-bare',
      level: 2,
      title: 'to부정사와 동사원형 고르기',
      make: function (R) {
        // [문장, 동사원형, -ing형, 과거형, 우리말, 종류] 종류: to = to부정사, bare = 사역동사(동사원형), help = help
        var bank = [
          ['I want you [[빈칸]] my new friend.', 'meet', 'meeting', 'met', '나는 네가 내 새 친구를 만나기를 원해.', 'to'],
          ['Mom told me [[빈칸]] my room.', 'clean', 'cleaning', 'cleaned', '엄마는 나에게 방을 청소하라고 말씀하셨어요.', 'to'],
          ['Jia asked me [[빈칸]] the window.', 'open', 'opening', 'opened', '지아는 나에게 창문을 열어 달라고 부탁했어요.', 'to'],
          ['The doctor advised him [[빈칸]] more water.', 'drink', 'drinking', 'drank', '의사는 그에게 물을 더 마시라고 충고했어요.', 'to'],
          ['My parents want me [[빈칸]] a good person.', 'become', 'becoming', 'became', '부모님은 내가 좋은 사람이 되기를 원하세요.', 'to'],
          ['The teacher told us [[빈칸]] in line.', 'stand', 'standing', 'stood', '선생님은 우리에게 줄을 서라고 말씀하셨어요.', 'to'],
          ['Seojun asked his dad [[빈칸]] him a bike.', 'buy', 'buying', 'bought', '서준이는 아빠에게 자전거를 사 달라고 부탁했어요.', 'to'],
          ['The coach advised us [[빈칸]] enough sleep.', 'get', 'getting', 'got', '코치는 우리에게 잠을 충분히 자라고 충고했어요.', 'to'],
          ['Mom made me [[빈칸]] the dishes.', 'wash', 'washing', 'washed', '엄마는 나에게 설거지를 하게 하셨어요.', 'bare'],
          ['My dad let me [[빈칸]] to the concert.', 'go', 'going', 'went', '아빠는 내가 콘서트에 가게 해 주셨어요.', 'bare'],
          ['I had my brother [[빈칸]] the box.', 'carry', 'carrying', 'carried', '나는 남동생에게 상자를 나르게 했어요.', 'bare'],
          ['The teacher made us [[빈칸]] the classroom.', 'clean', 'cleaning', 'cleaned', '선생님은 우리에게 교실을 청소하게 하셨어요.', 'bare'],
          ['Please let me [[빈칸]] myself.', 'introduce', 'introducing', 'introduced', '제 소개를 하게 해 주세요.', 'bare'],
          ['She had the students [[빈칸]] their names.', 'write', 'writing', 'wrote', '그녀는 학생들에게 이름을 쓰게 했어요.', 'bare'],
          ['The sad story made me [[빈칸]].', 'cry', 'crying', 'cried', '그 슬픈 이야기는 나를 울게 했어요.', 'bare'],
          ['My mom doesn\'t let me [[빈칸]] games at night.', 'play', 'playing', 'played', '엄마는 내가 밤에 게임을 하게 두지 않으세요.', 'bare'],
          ['Hayun helped me [[빈칸]] my lost cat.', 'find', 'finding', 'found', '하윤이는 내가 잃어버린 고양이를 찾는 것을 도와주었어요.', 'help'],
          ['Can you help us [[빈칸]] this table?', 'move', 'moving', 'moved', '우리가 이 탁자를 옮기는 것을 도와줄 수 있어요?', 'help'],
          ['My brother helped me [[빈칸]] my bike.', 'fix', 'fixing', 'fixed', '형은 내가 자전거를 고치는 것을 도와주었어요.', 'help'],
          ['The map helped them [[빈칸]] the way.', 'find', 'finding', 'found', '그 지도는 그들이 길을 찾는 데 도움이 되었어요.', 'help'],
          ['Dad helped me [[빈칸]] a birdhouse.', 'build', 'building', 'built', '아빠는 내가 새집을 만드는 것을 도와주셨어요.', 'help'],
          ['Minsu asked her [[빈칸]] the song again.', 'sing', 'singing', 'sang', '민수는 그녀에게 그 노래를 다시 불러 달라고 부탁했어요.', 'to'],
        ];
        var it = R.pick(bank);
        var base = it[1], ing = it[2], past = it[3], kind = it[5];
        var verb = it[0].split(' ').filter(function (w) { return /^(want|told|asked|advised|made|let|had|help|helped)$/.test(w); })[0] || '';
        var correct, wrongs = [], reason = {};
        if (kind === 'to') {
          correct = 'to ' + base;
          wrongs = [base, ing, past];
          reason[base] = verb + ' + 목적어 뒤에는 동사원형이 아니라 to부정사를 써요.';
        } else if (kind === 'bare') {
          correct = base;
          wrongs = ['to ' + base, ing, past];
          reason['to ' + base] = '사역동사(' + verb + ') + 목적어 뒤에는 to 없이 동사원형을 써요.';
        } else {
          correct = base;
          wrongs = [ing, past, 'for ' + ing];
          reason['for ' + ing] = 'help + 목적어 뒤에는 동사원형이나 to부정사를 써요. for + -ing 꼴은 쓰지 않아요.';
        }
        reason[ing] = '목적어 뒤의 목적격 보어 자리에는 -ing 꼴을 쓰지 않아요.';
        reason[past] = '목적어가 할 일을 나타내는 자리라서 과거형을 쓰지 않아요.';
        var pick = R.choices(correct, wrongs);
        var rule = kind === 'to'
          ? verb + ' + 목적어 + **to부정사**'
          : kind === 'bare'
            ? '사역동사 ' + verb + ' + 목적어 + **동사원형**'
            : 'help + 목적어 + **동사원형** (to부정사도 돼요: to ' + base + ')';
        return {
          type: 'choice', concept: kind === 'to' ? 0 : kind === 'bare' ? 1 : 2,
          q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + it[0] + '\n(' + it[4] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: rule + '\n\n' + it[0].replace('[[빈칸]]', '**' + correct + '**'),
        };
      },
    },
    {
      id: 'complement-adj',
      level: 1,
      title: '목적격 보어 자리의 형용사',
      make: function (R) {
        // [문장, 형용사, 부사, 명사, 우리말]
        var bank = [
          ['The good news made me [[빈칸]].', 'happy', 'happily', 'happiness', '그 좋은 소식은 나를 행복하게 했어요.'],
          ['The sad movie made us [[빈칸]].', 'sad', 'sadly', 'sadness', '그 슬픈 영화는 우리를 슬프게 했어요.'],
          ['His rude words made her [[빈칸]].', 'angry', 'angrily', 'anger', '그의 무례한 말은 그녀를 화나게 했어요.'],
          ['The big test made Minsu [[빈칸]].', 'nervous', 'nervously', 'nervousness', '큰 시험 때문에 민수는 긴장했어요.'],
          ['This jacket keeps me [[빈칸]] in winter.', 'warm', 'warmly', 'warmth', '이 재킷은 겨울에 나를 따뜻하게 해 줘요.'],
          ['Please keep the classroom [[빈칸]].', 'quiet', 'quietly', 'quietness', '교실을 조용하게 해 주세요.'],
          ['A seat belt keeps you [[빈칸]] in a car.', 'safe', 'safely', 'safety', '안전띠는 차 안에서 여러분을 안전하게 지켜 줘요.'],
          ['I found the math test [[빈칸]].', 'easy', 'easily', 'ease', '나는 그 수학 시험이 쉽다는 것을 알았어요.'],
          ['We found the book [[빈칸]].', 'interesting', 'interestingly', 'interest', '우리는 그 책이 재미있다는 것을 알았어요.'],
          ['Fruit and vegetables keep you [[빈칸]].', 'healthy', 'healthily', 'health', '과일과 채소는 여러분을 건강하게 해 줘요.'],
          ['The long walk made everyone [[빈칸]].', 'tired', 'tiredly', 'tiredness', '오래 걸어서 모두가 피곤해졌어요.'],
          ['The trip to the zoo made the children [[빈칸]].', 'excited', 'excitedly', 'excitement', '동물원 나들이는 아이들을 신나게 했어요.'],
          ['Jia found the new sofa [[빈칸]].', 'comfortable', 'comfortably', 'comfort', '지아는 새 소파가 편안하다는 것을 알았어요.'],
          ['The fridge keeps food [[빈칸]].', 'fresh', 'freshly', 'freshness', '냉장고는 음식을 신선하게 지켜 줘요.'],
          ['I found this app very [[빈칸]].', 'useful', 'usefully', 'usefulness', '나는 이 앱이 아주 쓸모 있다는 것을 알았어요.'],
          ['Exercise makes your body [[빈칸]].', 'strong', 'strongly', 'strength', '운동은 여러분의 몸을 튼튼하게 만들어요.'],
          ['The soft music made me [[빈칸]].', 'calm', 'calmly', 'calmness', '부드러운 음악은 나를 차분하게 했어요.'],
          ['I found the story very [[빈칸]].', 'sad', 'sadly', 'sadness', '나는 그 이야기가 아주 슬프다는 것을 알았어요.'],
          ['These boots keep my feet [[빈칸]].', 'dry', 'dryly', 'dryness', '이 장화는 내 발을 마른 상태로 지켜 줘요.'],
          ['The surprise party made Dad [[빈칸]].', 'happy', 'happily', 'happiness', '깜짝 파티는 아빠를 행복하게 했어요.'],
          ['Wash your hands and keep them [[빈칸]].', 'clean', 'cleanly', 'cleanliness', '손을 씻고 깨끗하게 유지하세요.'],
        ];
        var it = R.pick(bank);
        var adj = it[1], adv = it[2], noun = it[3];
        var reason = {};
        reason[adv] = '부사예요. 목적어의 상태를 나타내는 목적격 보어 자리에는 형용사를 써요.';
        reason[noun] = '명사예요. 목적어가 "어떤 상태인지"를 말해야 하니 형용사를 써요.';
        var pick = R.choices(adj, [adv, noun], 3);
        return {
          type: 'choice', concept: 3,
          q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + it[0] + '\n(' + it[4] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === adj ? '' : reason[c] || ''; }),
          explain: 'make/keep/find + 목적어 + **형용사** — 목적어의 상태를 형용사로 나타내요.\n\n' + it[0].replace('[[빈칸]]', '**' + adj + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'advise', m: '충고하다, 조언하다', ex: 'The doctor advised me to drink more water.', exm: '의사는 나에게 물을 더 마시라고 충고했어요.' },
    { w: 'allow', m: '허락하다', ex: 'My parents allowed me to go camping.', exm: '부모님은 내가 캠핑을 가도록 허락해 주셨어요.' },
    { w: 'rest', m: '휴식; 쉬다', ex: 'You need some rest after the game.', exm: '경기가 끝나면 좀 쉬어야 해요.' },
    { w: 'lend', m: '빌려주다', ex: 'Could you lend me your pen?', exm: '펜을 좀 빌려주실 수 있을까요?' },
    { w: 'carry', m: '나르다, 들고 가다', ex: 'Can you help me carry this bag?', exm: '이 가방 드는 것을 도와줄 수 있어요?' },
    { w: 'favor', m: '부탁, 호의', ex: 'Can you do me a favor?', exm: '부탁 하나 들어줄 수 있어요?' },
    { w: 'afraid', m: '(I\'m afraid ~) 유감이지만 ~이다', ex: 'I\'m afraid I can\'t come to your party.', exm: '미안하지만 네 파티에 못 갈 것 같아.' },
    { w: 'dish', m: '접시; (the dishes) 설거지거리', ex: 'Mom made me wash the dishes.', exm: '엄마는 나에게 설거지를 하게 하셨어요.' },
    { w: 'quiet', m: '조용한', ex: 'Please keep the library quiet.', exm: '도서관을 조용하게 해 주세요.' },
    { w: 'nervous', m: '긴장한, 불안한', ex: 'The test made me nervous.', exm: '시험 때문에 나는 긴장했어요.' },
    { w: 'comfortable', m: '편안한', ex: 'These shoes keep my feet comfortable.', exm: '이 신발은 내 발을 편안하게 해 줘요.' },
    { w: 'puppy', m: '강아지', ex: 'We named our puppy Coco.', exm: '우리는 강아지 이름을 코코라고 지었어요.' },
    { w: 'dentist', m: '치과 의사, 치과', ex: 'I have to go to the dentist today.', exm: '나는 오늘 치과에 가야 해요.' },
    { w: 'turn down', m: '(소리를) 줄이다', ex: 'Could you please turn down the music?', exm: '음악 소리 좀 줄여 주실 수 있을까요?' },
  ],
});
})();
