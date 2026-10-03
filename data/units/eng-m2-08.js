/* 중2 영어 · 의견 주장하기 (가주어 it) */
Tutor.registerUnit({
  id: 'eng-m2-08',
  course: 'eng-m2',
  title: '의견 주장하기 (가주어 it)',
  summary: '가주어 it과 to부정사, 의미상 주어를 익혀 의견을 분명하게 주장하고 다른 관점도 존중하며 읽어요.',
  goals: [
    '가주어 it과 진주어 to부정사로 "~하는 것은 …하다"를 말할 수 있어요.',
    'to부정사의 의미상 주어를 for + 목적격, of + 목적격으로 구별해 쓸 수 있어요.',
    '가목적어 it(find/make/think it + 형용사 + to부정사)을 쓸 수 있어요.',
    '동의·반대 표현을 쓰고, 주장하는 글의 짜임과 필자의 의도를 파악할 수 있어요.',
  ],
  standards: ['[9영02-06]', '[9영01-06]', '[9영01-09]'],

  concepts: [
    {
      title: '가주어 it과 진주어 to부정사',
      body: '"재활용하는 것은 중요해요."를 영어로 쓰면 To recycle is important.예요. 문법은 맞지만 주어(To recycle)가 길어지면 문장의 머리가 무거워져서 영어에서는 잘 쓰지 않아요.\n\n그래서 주어 자리에 **it**을 대신 세우고, 진짜 주어인 to부정사는 문장 **뒤로** 보내요.\n\n- To recycle is important. → **It** is important **to recycle**.\n- **It** is fun **to learn** new things. (새로운 것을 배우는 것은 재미있어요.)\n- **It** is not easy **to wake up** early. (일찍 일어나는 것은 쉽지 않아요.)\n\n이때 it을 **가주어**(가짜 주어), 뒤의 to부정사를 **진주어**(진짜 주어)라고 해요. 가주어 it은 자리만 채우는 말이라서 **"그것"이라고 해석하지 않아요.** 해석은 진주어부터: "~하는 것은 …하다".\n\n> 💡 It is + 형용사 + to + 동사원형. 의견을 말할 때 아주 많이 쓰는 꼴이에요: It is important/necessary/dangerous/easy/hard to ~.',
      easy: '버스 맨 앞자리를 맡아 두는 "자리 맡기 가방"을 떠올려 보세요.\n\n진짜 주인(to recycle)이 길어서 늦게 오니, 가방(it)이 먼저 앞자리에 앉아 자리를 맡아 둬요. 진짜 주인은 문장 맨 뒤에 와요.\n\nIt is important to recycle. — 가방 it은 "그것"이 아니에요. 그냥 "재활용하는 것은 중요해요."라고 읽으면 돼요.',
      check: {
        type: 'ox',
        q: 'It is important to recycle.에서 It은 "그것"이라고 해석해요.',
        answer: false,
        explain: '이 It은 가주어예요. 자리만 채우는 말이라서 해석하지 않아요. 진짜 주어 to recycle부터 해석해서 "재활용하는 것은 중요해요."예요.',
      },
    },
    {
      title: '의미상 주어 ① for + 목적격',
      body: 'It is hard to get up early.는 "일찍 일어나는 것은 어려워요."예요. 그런데 **누구에게** 어려운지, 곧 to부정사의 동작을 **누가** 하는지 밝히고 싶으면 to부정사 바로 앞에 **for + 목적격**을 넣어요. 이것을 to부정사의 **의미상 주어**라고 해요.\n\n- It is hard **for me** to get up early. (내가 일찍 일어나는 것은 어려워요.)\n- It is easy **for him** to solve this puzzle. (그가 이 퍼즐을 푸는 것은 쉬워요.)\n- It is important **for students** to get enough sleep. (학생들이 잠을 충분히 자는 것은 중요해요.)\n\nfor 뒤에 대명사가 오면 **목적격**(me, you, him, her, us, them)을 써요.\n\n> ⚠️ for I(✗) → for me(○), for they(✗) → for them(○)\n\nhard, easy, difficult, important, necessary, dangerous, possible, impossible, fun처럼 **일의 성질**(쉽다·어렵다·중요하다 …)을 나타내는 형용사 뒤에는 for를 써요.',
      easy: 'It is hard to get up early.만 들으면 "누구한테?"라는 궁금증이 생기지요.\n\n그 "누구"를 to 바로 앞에 for로 끼워 넣는 거예요. for me = "나에게는", for him = "그에게는".\n\nfor 뒤에는 "나를, 그를"처럼 쓰는 목적격(me, him, her, us, them)이 와요. I나 he를 쓰지 않아요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nIt is difficult [[빈칸]] to speak in front of many people.',
        choices: ['for me', 'for I', 'of me'],
        answer: 0,
        why: ['', 'for 뒤의 대명사는 목적격으로 써요. I가 아니라 me예요.', 'difficult는 사람의 성격이 아니라 일의 성질(어렵다)을 나타내요. 이럴 때는 for를 써요.'],
        explain: '일의 성질을 나타내는 difficult 뒤에는 **for + 목적격**이 의미상 주어예요. "내가 많은 사람 앞에서 말하는 것은 어려워요."',
      },
    },
    {
      title: '의미상 주어 ② of + 목적격',
      body: '형용사가 **사람의 성격이나 태도**를 나타낼 때는 의미상 주어를 **of + 목적격**으로 써요.\n\n- It is kind **of you** to help me. (나를 도와주다니 너는 친절하구나.)\n- It was careless **of him** to leave the door open. (문을 열어 둔 채로 두다니 그는 부주의했어요.)\n- It was brave **of her** to save the cat. (그 고양이를 구하다니 그녀는 용감했어요.)\n\nof와 함께 쓰는 형용사: kind, nice, polite(예의 바른), rude(무례한), careless(부주의한), smart, wise(현명한), foolish(어리석은), brave(용감한), generous(너그러운) …\n\n**for와 of를 구별하는 방법**: "사람 + be + 형용사"로 바꾸어 말이 되는지 보세요.\n\n| 문장 | 바꾸어 보기 | 의미상 주어 |\n|---|---|---|\n| It is kind ___ you to help me. | You are kind. (○ 말이 돼요) | **of** you |\n| It is hard ___ me to get up early. | I am hard. (✗ 뜻이 달라져요) | **for** me |',
      easy: '"친절하다, 무례하다, 용감하다"는 일이 아니라 **사람**을 칭찬하거나 꾸짖는 말이에요.\n\n- "너 참 친절하다!" → 친절한 건 너(you) → kind **of** you\n- "일찍 일어나는 건 힘들어." → 힘든 건 일(일찍 일어나기) → hard **for** me\n\n사람을 칭찬하거나 꾸짖는 말이면 of, 일이 쉽다·어렵다를 말하면 for라고 기억하세요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nIt was very nice [[빈칸]] you to invite me.',
        choices: ['of', 'for', 'to'],
        answer: 0,
        why: ['', 'nice는 여기서 사람의 태도(친절하다)를 나타내요. 이럴 때는 for가 아니라 of를 써요.', '의미상 주어는 to가 아니라 for나 of로 나타내요.'],
        explain: 'You were very nice.(너는 참 친절했어.)가 말이 되므로 **of** you예요. "나를 초대해 주다니 너는 참 친절했어."',
      },
    },
    {
      title: '가목적어 it',
      body: 'find(알게 되다, 생각하다), make(만들다), think(생각하다) 같은 동사 뒤에서 목적어가 to부정사처럼 길면, 목적어 자리에 **it**을 두고 진짜 목적어인 to부정사는 뒤로 보내요. 이 it을 **가목적어**, 뒤의 to부정사를 **진목적어**라고 해요.\n\n동사 + **it** + 형용사 + **to부정사**\n\n- I **found it** easy **to make** friends. (나는 친구를 사귀는 것이 쉽다는 것을 알게 되었어요.)\n- The rain **made it** hard **to play** soccer. (비 때문에 축구를 하기가 어려웠어요.)\n- I **think it** important **to listen** to others. (나는 다른 사람의 말을 듣는 것이 중요하다고 생각해요.)\n\n가목적어 it도 가주어 it처럼 해석하지 않아요.\n\n> ⚠️ it을 빠뜨리지 않아요. I found easy to make friends.(✗) → I found **it** easy to make friends.(○)\n\n> 💡 의미상 주어도 넣을 수 있어요. The noise made it hard **for me** to sleep.',
      easy: '가주어 it이 주어 자리를 맡아 두었던 것처럼, 가목적어 it은 **목적어 자리**를 맡아 두는 가방이에요.\n\nI found [무엇을?] easy. — "무엇을"에 to make friends가 들어가야 하는데 길어요. 그래서 그 자리에 it을 두고 to make friends는 맨 뒤로 보내요.\n\nI found **it** easy **to make friends**.',
      check: {
        type: 'ox',
        q: 'I found easy to make friends.는 바른 문장이에요.',
        answer: false,
        explain: 'found 뒤 목적어 자리에 가목적어 **it**이 있어야 해요. 바른 문장은 I found **it** easy to make friends.예요.',
      },
    },
    {
      title: '동의하고 반대하는 표현',
      body: '의견을 나눌 때는 상대의 말에 동의하거나 반대하는 표현이 필요해요.\n\n**동의할 때**\n- I agree (with you). / You\'re right. / That\'s a good point.\n- **So + 동사 + I.** (나도 그래.) — 앞 문장의 동사에 맞춰요.\n\n| 앞 문장 | 동의 |\n|---|---|\n| I **like** pizza. (일반동사 현재) | So **do** I. |\n| I **am** hungry. (be동사) | So **am** I. |\n| I **can** swim. (조동사 can) | So **can** I. |\n| I **watched** the game. (일반동사 과거) | So **did** I. |\n\n**반대할 때**\n- I don\'t agree. / I don\'t think so.\n- **I see your point, but** ~. (네 말도 일리가 있지만 ~) — 상대의 생각을 먼저 인정한 뒤 내 생각을 말하는 공손한 표현이에요.\n\n> 💡 반대할 때도 이유를 함께 말하면 설득력이 생겨요. I see your point, but I think it is better to walk. It is good for our health.',
      easy: '"나도!"라고 맞장구칠 때 영어는 앞 사람이 쓴 동사를 따라 해요.\n\n- 앞 사람이 like(일반동사)를 쓰면 do를 빌려 → So do I.\n- am을 쓰면 → So am I.\n- can을 쓰면 → So can I.\n\n반대할 때는 "네 말도 맞아, 그런데…" 하고 부드럽게 시작하는 I see your point, but ~이 좋아요.',
      check: {
        type: 'choice',
        q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: I think it is important to exercise every day.\nB: [[빈칸]] Exercise keeps us healthy.',
        choices: ['I agree with you.', "I don't think so.", "I see your point, but I don't agree."],
        answer: 0,
        why: ['', 'B는 운동이 건강에 좋다며 A의 생각을 뒷받침하고 있어요. 반대 표현은 어울리지 않아요.', '공손한 반대 표현이에요. B는 A의 의견에 동의하고 있어요.'],
        explain: 'B가 "운동은 우리를 건강하게 해 줘요."라고 A의 생각을 뒷받침하므로 동의 표현 **I agree with you.**가 알맞아요.',
      },
    },
    {
      title: '주장하는 글의 짜임과 필자의 의도',
      body: '주장하는 글은 보통 네 부분으로 짜여 있어요.\n\n1. **주장**: 필자가 말하고 싶은 의견 — I think ~. / We should ~. / It is important to ~.\n2. **이유**: 왜 그렇게 생각하는지 — First, ~. Second, ~.\n3. **근거**: 이유를 뒷받침하는 예·경험·자료 — For example, ~.\n4. **마무리**: 주장을 다시 강조하거나 함께하자고 권함 — So let\'s ~. / That\'s why ~.\n\n**필자의 의도**(글을 쓴 목적)는 주장 문장과 마무리 문장에 가장 잘 드러나요. 그래서 글의 첫 부분과 마지막 부분을 특히 꼼꼼히 읽어요.\n\n좋은 주장하는 글은 **다른 의견도 존중**해요. Some people think ~. I see their point, but ~.처럼 반대 의견을 먼저 소개하고 자기 생각을 밝히면 더 공정하고 설득력 있는 글이 돼요.',
      easy: '친구에게 "주말에 같이 자전거 타자!"라고 설득하는 장면을 떠올려 보세요.\n\n1. 주장: 자전거 타자!\n2. 이유: 건강에 좋거든.\n3. 근거: 지난달에 매일 30분씩 탔더니 덜 피곤했어.\n4. 마무리: 그러니까 토요일에 같이 타자!\n\n영어 글도 이 순서예요. 필자가 진짜 바라는 것은 1번과 4번에 있어요.',
      check: {
        type: 'choice',
        q: '주장하는 글의 짜임을 순서대로 바르게 나타낸 것을 고르세요.',
        choices: ['주장 → 이유 → 근거 → 마무리', '근거 → 마무리 → 이유 → 주장', '마무리 → 주장 → 근거 → 이유'],
        answer: 0,
        why: ['', '근거는 이유를 뒷받침하는 부분이라 이유 뒤에 와요. 주장은 글의 처음에 밝혀요.', '마무리는 글의 끝에서 주장을 다시 강조하는 부분이에요.'],
        explain: '먼저 **주장**을 밝히고, **이유**를 들고, 이유를 뒷받침하는 **근거**(예·경험·자료)를 보인 뒤, **마무리**에서 주장을 다시 강조해요.',
      },
    },
  ],

  examples: [
    {
      q: '가주어 it을 써서 같은 뜻의 문장으로 바꾸세요.\n\nTo speak English well is not easy.',
      steps: [
        '진짜 주어를 찾아요: To speak English well (영어를 잘 말하는 것)',
        '주어 자리에 가주어 It을 세워요: It is not easy',
        '진짜 주어 to부정사를 문장 뒤로 보내요: to speak English well.',
      ],
      answer: '**It** is not easy **to speak English well**. (영어를 잘 말하는 것은 쉽지 않아요.)',
    },
    {
      q: '빈칸에 for와 of 중 알맞은 말을 쓰세요.\n\nIt was brave [[빈칸]] him to save the cat.',
      steps: [
        'brave(용감한)가 일의 성질인지, 사람의 성격인지 봐요.',
        'He was brave.(그는 용감했다.)로 바꾸면 말이 돼요. 사람의 성격이에요.',
        '사람의 성격·태도를 나타내는 형용사 뒤에는 of + 목적격을 써요.',
      ],
      answer: 'It was brave **of** him to save the cat. (그 고양이를 구하다니 그는 용감했어요.)',
    },
  ],

  terms: [
    { term: '가주어 it', def: '길어진 진짜 주어(to부정사)를 뒤로 보내고 주어 자리에 대신 세우는 it이에요. 해석하지 않아요. 예: **It** is fun to swim.' },
    { term: '진주어', def: '가주어 it 대신 뒤로 간 진짜 주어예요. It is fun **to swim**.에서 to swim이에요.' },
    { term: '의미상 주어', def: 'to부정사의 동작을 실제로 하는 사람이에요. to부정사 앞에 for + 목적격(일의 성질) 또는 of + 목적격(사람의 성격)으로 나타내요.' },
    { term: '가목적어 it', def: 'find, make, think 뒤에서 길어진 진짜 목적어(to부정사)를 뒤로 보내고 목적어 자리에 대신 두는 it이에요. 예: I found **it** easy to make friends.' },
    { term: '목적격', def: '동사나 전치사 뒤에 오는 대명사의 꼴이에요: me, you, him, her, us, them. for/of 뒤에도 목적격을 써요.' },
    { term: '주장하는 글', def: '필자의 의견을 밝히고 이유와 근거를 들어 읽는 사람을 설득하는 글이에요. 주장 → 이유 → 근거 → 마무리로 짜여요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\n[[빈칸]] is fun to play board games with friends.',
      choices: ['It', 'They', 'Its', 'There'],
      answer: 0,
      why: [
        '',
        'They는 여러 사람이나 물건을 가리켜요. 진짜 주어 to play ~를 대신하는 가주어는 It이에요.',
        'Its는 "그것의"라는 소유격이에요. 주어 자리에 쓸 수 없어요.',
        'There is는 "~이 있다"는 뜻이에요. "~하는 것은 재미있다"는 It is ~ to …예요.',
      ],
      explain: '진짜 주어 to play board games with friends가 뒤로 가고, 주어 자리에 가주어 **It**을 써요. "친구들과 보드게임을 하는 것은 재미있어요."',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '두 문장이 같은 뜻이 되도록 빈칸에 알맞은 한 낱말을 쓰세요.\n\nTo learn a new language is exciting.\n= It is exciting [[빈칸]] learn a new language.',
      answer: ['to'],
      wrong: [
        { a: 'for', why: '진주어는 to부정사(to + 동사원형)예요. for는 의미상 주어 앞에 써요.' },
        { a: 'of', why: '진주어는 to부정사(to + 동사원형)예요. learn 앞에는 to가 와야 해요.' },
      ],
      explain: '가주어 It을 앞에 세우고 진주어 **to** learn a new language를 뒤로 보냈어요. "새로운 언어를 배우는 것은 신나요."',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말을 고르세요.\n\nIt is hard [[빈칸]] to get up early on Mondays.',
      choices: ['for me', 'for I', 'of me', 'to me'],
      answer: 0,
      why: [
        '',
        'for 뒤의 대명사는 목적격으로 써요. I가 아니라 me예요.',
        'hard는 일의 성질(어렵다)을 나타내요. 사람의 성격이 아니므로 of가 아니라 for를 써요.',
        '의미상 주어는 to가 아니라 for로 나타내요.',
      ],
      explain: '일의 성질을 나타내는 hard 뒤에는 **for + 목적격**을 써요. "내가 월요일마다 일찍 일어나는 것은 힘들어요."',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르세요.\n\nIt is kind [[빈칸]] you to help me with my homework.',
      choices: ['of', 'for', 'to', 'with'],
      answer: 0,
      why: [
        '',
        'kind는 사람의 성격(친절하다)을 나타내요. You are kind.가 말이 되므로 of를 써요.',
        '의미상 주어는 to가 아니라 for나 of로 나타내요.',
        'with는 "~와 함께"예요. 의미상 주어는 for나 of로 나타내요.',
      ],
      explain: '사람의 성격을 나타내는 kind 뒤에는 **of + 목적격**을 써요. "내 숙제를 도와주다니 너는 친절하구나."',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 2,
      q: 'It was careless for him to leave the door open.은 바른 문장이에요.',
      answer: false,
      explain: 'careless(부주의한)는 사람의 태도를 나타내는 형용사예요(He was careless. ○). 그래서 for가 아니라 **of**를 써요: It was careless **of him** to leave the door open.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 1,
      q: '우리말에 맞게 빈칸에 알맞은 한 낱말을 쓰세요.\n\n그들이 그 상자를 옮기는 것은 쉽지 않았어요.\nIt wasn\'t easy for [[빈칸]] to carry the box.',
      answer: ['them'],
      wrong: [
        { a: 'they', why: 'for 뒤의 대명사는 목적격으로 써요. they가 아니라 them이에요.' },
        { a: 'their', why: 'their는 "그들의"라는 소유격이에요. for 뒤에는 목적격 them을 써요.' },
      ],
      explain: '의미상 주어 for 뒤에는 목적격을 써요. "그들"의 목적격은 **them**이에요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: I think it is better to study in the morning.\nB: [[빈칸]] I can focus better at night.',
      choices: ["I see your point, but I don't agree.", 'I agree with you.', 'So do I.', "You're right."],
      answer: 0,
      why: [
        '',
        'B는 밤에 더 집중이 잘된다고 했어요. A의 의견에 동의하는 말은 어울리지 않아요.',
        'So do I.는 "나도 그래."라는 동의 표현이에요. B는 다른 생각을 말하고 있어요.',
        "You're right.는 동의 표현이에요. B는 밤에 공부하는 것이 낫다고 생각해요.",
      ],
      explain: 'B는 "나는 밤에 더 잘 집중할 수 있어."라며 다른 의견을 말해요. 상대의 생각을 인정하면서 공손하게 반대하는 **I see your point, but I don\'t agree.**가 알맞아요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 3,
      q: '우리말에 맞게 순서대로 놓으세요.\n\n나는 새 친구를 사귀는 것이 쉽다는 것을 알게 되었어요.',
      choices: ['I found', 'it', 'easy', 'to make', 'new friends.'],
      answer: [0, 1, 2, 3, 4],
      hint: '동사 + 가목적어 it + 형용사 + to부정사 순서예요.',
      explain: 'I found + **it**(가목적어) + easy + **to make new friends**(진목적어). it은 해석하지 않아요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'text', concept: 4,
      q: '대화의 빈칸에 알맞은 한 낱말을 쓰세요.\n\nA: I really like spicy food.\nB: So [[빈칸]] I. Let\'s go to that new restaurant!',
      answer: ['do'],
      wrong: [
        { a: 'am', why: 'A는 be동사가 아니라 일반동사 like를 썼어요. 일반동사 현재형에는 So do I.로 답해요.' },
        { a: 'like', why: '"나도 그래"는 So + 동사 + I 꼴인데, 일반동사는 그대로 쓰지 않고 do로 받아요.' },
        { a: 'did', why: 'did는 과거형이에요. A는 현재형 like를 썼으므로 do로 받아요.' },
      ],
      hint: 'A의 문장에 쓰인 동사(like)의 종류와 시제를 보세요.',
      explain: 'A가 일반동사 현재형 like를 썼으므로 "나도 그래"는 So **do** I.예요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n그 소음 때문에 나는 잠들기가 힘들었어요.\nThe noise made [[빈칸]] hard for me to sleep.',
      choices: ['it', 'me', 'that', 'to'],
      answer: 0,
      why: [
        '',
        'me를 넣으면 "나를 힘들게 만들었다"처럼 되고 뒤의 for me와 겹쳐요. 진목적어 to sleep의 자리를 맡는 가목적어 it이 필요해요.',
        'that은 가목적어로 쓰지 않아요. 가목적어는 it이에요.',
        'to는 목적어 자리에 올 수 없어요. 목적어 자리에는 가목적어 it을 둬요.',
      ],
      hint: 'made 뒤 목적어 자리에 진짜로 오고 싶은 것은 to sleep이에요.',
      explain: 'made + **it**(가목적어) + hard + for me(의미상 주어) + to sleep(진목적어). "그 소음은 내가 잠드는 것을 힘들게 만들었어요."',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 5,
      q: '글을 읽고, 필자가 이 글을 쓴 **의도**로 가장 알맞은 것을 고르세요.\n\nI think we should bring our own bags when we go shopping. First, plastic bags are bad for the environment. They take hundreds of years to break down. Second, it is easy to carry a small cloth bag. It fits in any backpack. So let\'s use our own bags from today!',
      choices: [
        '장 보러 갈 때 자기 가방을 가져가자고 설득하려고',
        '비닐봉지를 만드는 방법을 알려 주려고',
        '천 가방을 파는 가게를 소개하려고',
        '가방을 잃어버린 경험을 이야기하려고',
      ],
      answer: 0,
      why: [
        '',
        '비닐봉지가 환경에 나쁘다고 했을 뿐, 만드는 방법은 나오지 않아요.',
        '가게나 상품을 소개하는 내용은 없어요.',
        '가방을 잃어버린 경험은 글에 없어요.',
      ],
      hint: '첫 문장(I think ~)과 마지막 문장(So let\'s ~)을 보세요.',
      explain: '주장(I think we should bring our own bags) → 이유 두 가지(환경, 들고 다니기 쉬움) → 마무리(So let\'s use our own bags)로 짜인 주장하는 글이에요. 필자는 자기 가방을 쓰자고 **설득**하려고 이 글을 썼어요.\n\n(나는 우리가 장 보러 갈 때 자기 가방을 가져가야 한다고 생각해요. 첫째, 비닐봉지는 환경에 나빠요. 분해되는 데 수백 년이 걸려요. 둘째, 작은 천 가방은 들고 다니기 쉬워요. 어느 배낭에나 들어가요. 그러니 오늘부터 우리 가방을 씁시다!)',
    },
    {
      id: 'p12', level: 2, type: 'order', concept: 5,
      q: '주장하는 글의 짜임(주장 → 이유 → 근거 → 마무리)에 맞게 순서대로 놓으세요.',
      choices: [
        'I think we should use the stairs more often.',
        'It is good for our health.',
        'Climbing stairs for ten minutes a day makes our legs stronger.',
        'So let\'s take the stairs today!',
      ],
      answer: [0, 1, 2, 3],
      hint: 'I think ~가 주장, So let\'s ~가 마무리예요. 이유와 근거 중 더 자세한 예는 어느 쪽일까요?',
      explain: '주장(계단을 더 자주 이용하자) → 이유(건강에 좋다) → 근거(하루 10분 계단 오르기가 다리를 튼튼하게 한다는 구체적인 내용) → 마무리(오늘 계단을 이용하자).',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 2,
      q: '빈칸에 들어갈 말이 나머지 셋과 **다른** 것을 고르세요.',
      choices: [
        'It is impossible ___ me to finish it today.',
        'It is wise ___ her to say sorry first.',
        'It was rude ___ him to shout at the waiter.',
        'It is polite ___ you to say thank you.',
      ],
      answer: 0,
      why: [
        '',
        'wise(현명한)는 사람의 성격이에요(She is wise. ○). 빈칸에 of가 들어가서 나머지 둘과 같아요.',
        'rude(무례한)는 사람의 태도예요(He was rude. ○). 빈칸에 of가 들어가요.',
        'polite(예의 바른)는 사람의 태도예요(You are polite. ○). 빈칸에 of가 들어가요.',
      ],
      hint: '각 형용사 앞에 사람을 주어로 세워 "사람 + be + 형용사"가 말이 되는지 보세요.',
      explain: 'impossible은 일의 성질(불가능하다)이라 **for** me예요. wise, rude, polite는 사람의 성격·태도라서 모두 **of**를 써요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 3,
      q: '두 문장이 같은 뜻이 되도록 빈칸에 알맞은 한 낱말을 쓰세요.\n\nIt was easy for me to solve the puzzle.\n= I found [[빈칸]] easy to solve the puzzle.',
      answer: ['it'],
      wrong: [
        { a: 'that', why: 'that은 가목적어로 쓰지 않아요. 진목적어 to solve the puzzle의 자리를 맡는 말은 it이에요.' },
        { a: 'to', why: 'found 바로 뒤는 목적어 자리예요. 가목적어 it을 두고, to부정사는 형용사 뒤에 와요.' },
      ],
      hint: '첫 문장의 가주어 It이 둘째 문장에서는 어느 자리로 옮겨 갔을까요?',
      explain: '첫 문장은 가주어 it, 둘째 문장은 가목적어 **it**을 쓴 문장이에요. found + it + easy + to solve the puzzle. "나는 그 퍼즐을 푸는 것이 쉽다는 것을 알았어요."',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 1,
      q: '어법상 **어색한** 문장을 고르세요.',
      choices: [
        'It is necessary of us to drink enough water.',
        'It is dangerous to swim in this river.',
        'It was nice of her to share her umbrella.',
        'It is not easy for him to give a speech.',
      ],
      answer: 0,
      why: [
        '',
        '가주어 It + dangerous + 진주어 to swim — 바른 문장이에요.',
        'nice는 사람의 태도(친절하다)라서 of her — 바른 문장이에요.',
        'easy는 일의 성질이라서 for him — 바른 문장이에요.',
      ],
      hint: '형용사마다 for와 of 중 무엇과 어울리는지 확인해 보세요.',
      explain: 'necessary(필요한)는 일의 성질이에요(We are necessary. ✗). 그래서 of가 아니라 **for**를 써야 해요: It is necessary **for us** to drink enough water.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 5,
      q: '글을 읽고, 필자의 **주장**으로 가장 알맞은 것을 고르세요.\n\nSome people say that it is good for students to have their phones on their desks during class. They can find information quickly. I see their point, but I think it is better to keep our phones in our lockers during class. When phones are on our desks, it is hard for us to focus. Last month, our class tried a "No Phone Week," and many students said they listened to the teacher better. Let\'s put our phones away in class.',
      choices: [
        '수업 시간에는 휴대 전화를 사물함에 넣어 두자.',
        '학생은 휴대 전화를 가지고 다니면 안 된다.',
        '수업 시간에 휴대 전화로 정보를 빨리 찾자.',
        '"No Phone Week"를 한 달 내내 하자.',
      ],
      answer: 0,
      why: [
        '',
        '필자는 수업 시간에만 사물함에 두자고 했어요. 휴대 전화를 갖는 것 자체를 반대하지는 않았어요.',
        '이것은 필자가 소개한 다른 사람들의 의견이에요. 필자는 I see their point, but ~ 뒤에 자기 생각을 밝혔어요.',
        '"No Phone Week"는 주장을 뒷받침하는 근거(경험)예요. 한 달 내내 하자는 말은 없어요.',
      ],
      hint: 'I see their point, but ~ 뒤에 필자 자신의 생각이 나와요. 마지막 문장도 보세요.',
      explain: '필자는 먼저 다른 의견(수업 중 정보를 빨리 찾을 수 있다)을 인정하고, but 뒤에 자기 주장(수업 중에는 사물함에 두는 것이 낫다)을 밝혔어요. 이유(집중하기 어렵다)와 근거("No Phone Week" 경험)를 들고, 마지막 문장에서 주장을 다시 강조했어요.\n\n(어떤 사람들은 수업 중에 학생들이 책상 위에 휴대 전화를 두는 것이 좋다고 말해요. 정보를 빨리 찾을 수 있으니까요. 그 말도 일리가 있지만, 나는 수업 중에는 휴대 전화를 사물함에 두는 것이 낫다고 생각해요. 휴대 전화가 책상 위에 있으면 우리가 집중하기 어려워요. 지난달 우리 반은 "휴대 전화 없는 주간"을 해 보았는데, 많은 학생이 선생님 말씀을 더 잘 들었다고 말했어요. 수업 중에는 휴대 전화를 치워 둡시다.)',
    },
  ],

  deeper: [
    {
      title: '영어는 머리가 무거운 문장을 싫어해요',
      body: '가주어 it과 가목적어 it은 모두 같은 생각에서 나왔어요. 영어는 **짧고 가벼운 것을 앞에, 길고 무거운 것을 뒤에** 두는 것을 좋아해요. 듣는 사람이 "It is important"까지 들으면 벌써 핵심(중요하다)을 알고, 무엇이 중요한지는 뒤에서 천천히 들을 수 있지요.\n\n의견을 말할 때 이 꼴이 특히 쓸모 있어요.\n\n- It is important to protect animals. (주장)\n- It is necessary for us to save water. (누가 해야 하는지까지)\n- It was wise of you to tell the truth. (상대의 행동 칭찬)\n\n앞으로 영어 공부를 계속하면 to부정사뿐 아니라 that으로 시작하는 긴 문장도 It is true that ~처럼 가주어 it 뒤로 보내는 것을 보게 돼요. 원리는 오늘 배운 것과 똑같아요.',
    },
  ],

  faq: [
    {
      q: 'It is ~ to …에서 it은 왜 해석 안 해요?',
      a: '이 it은 진짜 주어(to부정사)가 길어서 뒤로 가는 동안 주어 자리를 대신 지키는 가짜 주어예요. 가리키는 대상이 없으니 "그것"이라고 해석하지 않아요. 진주어부터 "~하는 것은"으로 해석하면 돼요.',
    },
    {
      q: 'for랑 of는 어떻게 구별해요?',
      a: '형용사 앞에 사람을 세워 보세요. You are kind.처럼 "사람 + be + 형용사"가 말이 되면 사람의 성격을 나타내는 것이라 of, I am hard.처럼 뜻이 이상해지면 일의 성질을 나타내는 것이라 for예요.',
    },
    {
      q: 'So do I랑 Me too는 같은 뜻이에요?',
      a: '둘 다 "나도 그래."라는 동의 표현이에요. Me too는 짧고 편한 말이고, So do I는 앞 문장의 동사에 맞춰 do, am, can, did 등을 골라 써야 해요. 시험에서는 앞 문장의 동사에 맞는 꼴을 고르는 문제가 자주 나와요.',
    },
    {
      q: '반대할 때 그냥 No라고 하면 안 돼요?',
      a: '틀린 말은 아니지만 상대가 기분이 상할 수 있어요. I see your point, but ~이나 I don\'t think so, because ~처럼 상대 생각을 인정하거나 이유를 붙이면 더 공손하고 설득력 있게 반대할 수 있어요.',
    },
  ],

  mistakes: [
    '의미상 주어에 주격을 쓰는 실수 — It is hard for I to ~(✗) → It is hard for me to ~(○)',
    '사람의 성격을 나타내는 형용사에 for를 쓰는 실수 — It is kind for you to ~(✗) → It is kind of you to ~(○)',
    '가목적어 it을 빠뜨리는 실수 — I found easy to make friends(✗) → I found it easy to make friends(○)',
  ],

  gens: [
    {
      id: 'for-or-of',
      level: 1,
      title: '의미상 주어 for와 of 구별하기',
      make: function (R) {
        // [be동사, 형용사, of 를 쓰는가, 목적격, to 뒤의 말, 우리말]
        var items = [
          ['is', 'kind', true, 'you', 'help me', '나를 도와주다니 너는 친절하구나'],
          ['was', 'nice', true, 'her', 'invite us', '우리를 초대해 주다니 그녀는 친절했어요'],
          ['was', 'polite', true, 'him', 'say thank you', '고맙다고 말하다니 그는 예의 발랐어요'],
          ['was', 'rude', true, 'them', 'talk loudly in the library', '도서관에서 시끄럽게 떠들다니 그들은 무례했어요'],
          ['was', 'careless', true, 'me', 'lose my key again', '열쇠를 또 잃어버리다니 나는 부주의했어요'],
          ['was', 'brave', true, 'the boy', 'save the cat', '고양이를 구하다니 그 소년은 용감했어요'],
          ['is', 'wise', true, 'you', 'save money', '돈을 모으다니 너는 현명하구나'],
          ['was', 'smart', true, 'Jia', 'find the answer so fast', '그렇게 빨리 답을 찾다니 지아는 똑똑했어요'],
          ['was', 'generous', true, 'him', 'share his snacks with everyone', '모두와 간식을 나누다니 그는 너그러웠어요'],
          ['is', 'hard', false, 'me', 'get up early', '내가 일찍 일어나는 것은 힘들어요'],
          ['was', 'easy', false, 'him', 'answer the question', '그가 그 질문에 답하는 것은 쉬웠어요'],
          ['is', 'important', false, 'us', 'drink enough water', '우리가 물을 충분히 마시는 것은 중요해요'],
          ['was', 'difficult', false, 'them', 'finish the work in an hour', '그들이 한 시간 안에 그 일을 끝내는 것은 어려웠어요'],
          ['is', 'necessary', false, 'students', 'wear helmets', '학생들이 헬멧을 쓰는 것은 필요해요'],
          ['was', 'impossible', false, 'me', 'sleep last night', '어젯밤 내가 잠을 자는 것은 불가능했어요'],
          ['is', 'dangerous', false, 'children', 'swim here alone', '아이들이 여기서 혼자 수영하는 것은 위험해요'],
          ['was', 'fun', false, 'us', 'play soccer in the rain', '우리가 빗속에서 축구를 하는 것은 재미있었어요'],
        ];
        var it = R.pick(items);
        var correct = it[2] ? 'of' : 'for';
        var reason = {
          of: '형용사 ' + it[1] + ': 사람의 성격이 아니라 일의 성질(쉽다·어렵다·중요하다 등)을 나타내요. 이럴 때는 for + 목적격을 써요.',
          for: '형용사 ' + it[1] + ': 사람의 성격·태도를 나타내요. 이럴 때는 of + 목적격을 써요.',
          by: 'by는 "~에 의해, ~ 옆에"예요. 의미상 주어는 for나 of로 나타내요.',
          with: 'with는 "~와 함께"예요. 의미상 주어는 for나 of로 나타내요.',
        };
        var wrongs = ['of', 'for', 'by', 'with'].filter(function (w) { return w !== correct; });
        var pick = R.choices(correct, wrongs, 4);
        return {
          type: 'choice', concept: it[2] ? 2 : 1,
          q: '빈칸에 알맞은 말을 고르세요.\n\nIt ' + it[0] + ' ' + it[1] + ' [[빈칸]] ' + it[3] + ' to ' + it[4] + '.\n(뜻: ' + it[5] + '.)',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: it[2]
            ? '형용사 ' + it[1] + ': 사람의 성격·태도를 나타내요. 그래서 의미상 주어는 **of** + 목적격이에요.'
            : '형용사 ' + it[1] + ': 일의 성질을 나타내요. 그래서 의미상 주어는 **for** + 목적격이에요.',
        };
      },
    },
    {
      id: 'dummy-it',
      level: 1,
      title: '가주어 it 문장으로 바르게 바꾸기',
      make: function (R) {
        // [to 뒤의 말, be동사, 형용사(보어), 우리말]
        var items = [
          ['learn a new language', 'is', 'exciting', '새로운 언어를 배우는 것은 신나요'],
          ['recycle plastic bottles', 'is', 'important', '플라스틱 병을 재활용하는 것은 중요해요'],
          ['swim in this river', 'is', 'dangerous', '이 강에서 수영하는 것은 위험해요'],
          ['wake up early on Sundays', 'is', 'not easy', '일요일에 일찍 일어나는 것은 쉽지 않아요'],
          ['keep a diary in English', 'is', 'helpful', '영어로 일기를 쓰는 것은 도움이 돼요'],
          ['watch the stars at night', 'was', 'wonderful', '밤에 별을 본 것은 멋졌어요'],
          ['finish the project in a day', 'was', 'impossible', '그 과제를 하루 만에 끝내는 것은 불가능했어요'],
          ['ride a bike without a helmet', 'is', 'dangerous', '헬멧 없이 자전거를 타는 것은 위험해요'],
          ['help people in need', 'is', 'important', '어려움에 처한 사람들을 돕는 것은 중요해요'],
          ['make new friends', 'was', 'easy', '새 친구를 사귀는 것은 쉬웠어요'],
          ['save money for the future', 'is', 'wise', '미래를 위해 돈을 모으는 것은 현명해요'],
          ['read books every day', 'is', 'fun', '매일 책을 읽는 것은 재미있어요'],
        ];
        var it = R.pick(items);
        var correct = 'It ' + it[1] + ' ' + it[2] + ' to ' + it[0] + '.';
        var w1 = 'It ' + it[1] + ' ' + it[2] + ' ' + it[0] + '.';
        var w2 = 'This ' + it[1] + ' ' + it[2] + ' to ' + it[0] + '.';
        var w3 = 'It ' + it[1] + ' to ' + it[0] + ' ' + it[2] + '.';
        var reason = {};
        reason[w1] = '진주어는 to부정사예요. to를 빼면 한 문장에 동사가 두 개가 되어 틀려요.';
        reason[w2] = '가주어로는 it만 써요. this는 "이것"이라는 뜻이 있어서 자리만 맡는 가주어가 될 수 없어요.';
        reason[w3] = 'It ' + it[1] + ' 바로 뒤에 형용사가 오고, 진주어 to부정사는 문장 맨 뒤로 가요.';
        var pick = R.choices(correct, [w1, w2, w3], 4);
        return {
          type: 'choice', concept: 0,
          q: '다음 문장을 가주어 it을 써서 바르게 바꾼 것을 고르세요.\n\nTo ' + it[0] + ' ' + it[1] + ' ' + it[2] + '.',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: '진주어(To ' + it[0] + ')를 뒤로 보내고 주어 자리에 가주어 It을 세워요: **' + correct + '** 뜻: ' + it[3] + '.',
        };
      },
    },
    {
      id: 'so-do-i',
      level: 2,
      title: '"나도 그래" So + 동사 + I',
      make: function (R) {
        // [A의 말, 알맞은 동사, 우리말]
        var items = [
          ['I like spicy food.', 'do', '나는 매운 음식을 좋아해.'],
          ['I am hungry.', 'am', '나는 배고파.'],
          ['I went to the beach last summer.', 'did', '나는 지난여름에 바닷가에 갔어.'],
          ['I can swim well.', 'can', '나는 수영을 잘할 수 있어.'],
          ['I was tired yesterday.', 'was', '나는 어제 피곤했어.'],
          ['I want to visit Jeju Island.', 'do', '나는 제주도에 가 보고 싶어.'],
          ["I'm interested in science.", 'am', '나는 과학에 관심이 있어.'],
          ['I watched the soccer game last night.', 'did', '나는 어젯밤에 축구 경기를 봤어.'],
          ['I can play the guitar.', 'can', '나는 기타를 칠 수 있어.'],
          ['I was late for school today.', 'was', '나는 오늘 학교에 늦었어.'],
          ['I enjoy reading comic books.', 'do', '나는 만화책 읽는 것을 즐겨.'],
          ["I'm excited about the school trip.", 'am', '나는 수학여행이 기대돼.'],
          ['I finished my homework early.', 'did', '나는 숙제를 일찍 끝냈어.'],
          ['I can ride a horse.', 'can', '나는 말을 탈 수 있어.'],
          ['I was at home all day.', 'was', '나는 하루 종일 집에 있었어.'],
        ];
        var kind = {
          do: '일반동사 현재형',
          am: 'be동사 현재형(am)',
          did: '일반동사 과거형',
          can: '조동사 can',
          was: 'be동사 과거형(was)',
        };
        var it = R.pick(items);
        var correct = it[1];
        var wrongs = ['do', 'am', 'did', 'can', 'was'].filter(function (w) { return w !== correct; });
        var pick = R.choices(correct, R.sample(wrongs, 3), 4);
        return {
          type: 'choice', concept: 4,
          q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: ' + it[0] + '\nB: So [[빈칸]] I.\n(A의 말 뜻: ' + it[2] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            return c === correct ? '' : 'So ' + c + ' I.는 앞 문장에 ' + kind[c] + '이 있을 때 써요. A의 문장에는 ' + kind[correct] + '이 쓰였어요.';
          }),
          explain: 'A의 문장에 ' + kind[correct] + '이 쓰였으므로 "나도 그래."는 **So ' + correct + ' I.**예요.',
        };
      },
    },
  ],

  vocab: [
    { w: 'important', m: '중요한', ex: 'It is important to keep your promises.', exm: '약속을 지키는 것은 중요해요.' },
    { w: 'necessary', m: '필요한', ex: 'It is necessary for us to save water.', exm: '우리가 물을 아끼는 것은 필요해요.' },
    { w: 'dangerous', m: '위험한', ex: 'It is dangerous to play near the road.', exm: '도로 근처에서 노는 것은 위험해요.' },
    { w: 'impossible', m: '불가능한', ex: 'It was impossible for me to sleep.', exm: '나는 잠을 잘 수가 없었어요.' },
    { w: 'polite', m: '예의 바른, 공손한', ex: 'It is polite of you to say thank you.', exm: '고맙다고 말하다니 너는 예의 바르구나.' },
    { w: 'rude', m: '무례한', ex: 'It is rude to talk with your mouth full.', exm: '입에 음식을 가득 넣고 말하는 것은 무례해요.' },
    { w: 'careless', m: '부주의한', ex: 'It was careless of me to leave my bag on the bus.', exm: '버스에 가방을 두고 내리다니 나는 부주의했어요.' },
    { w: 'brave', m: '용감한', ex: 'It was brave of him to tell the truth.', exm: '사실을 말하다니 그는 용감했어요.' },
    { w: 'wise', m: '현명한', ex: 'It is wise to plan your day.', exm: '하루를 계획하는 것은 현명해요.' },
    { w: 'recycle', m: '재활용하다', ex: 'We recycle cans and bottles every week.', exm: '우리는 매주 캔과 병을 재활용해요.' },
    { w: 'opinion', m: '의견', ex: 'What is your opinion about school uniforms?', exm: '교복에 대한 너의 의견은 뭐니?' },
    { w: 'agree', m: '동의하다', ex: 'I agree with you.', exm: '나는 네 말에 동의해.' },
    { w: 'disagree', m: '동의하지 않다, 반대하다', ex: 'Some students disagree with the new rule.', exm: '몇몇 학생은 새 규칙에 반대해요.' },
    { w: 'point', m: '(말하고자 하는) 요점, 일리', ex: 'I see your point, but I have a different idea.', exm: '네 말도 일리가 있지만 나는 생각이 달라.' },
    { w: 'focus', m: '집중하다', ex: 'It is hard to focus when it is noisy.', exm: '시끄러울 때는 집중하기 어려워요.' },
    { w: 'environment', m: '환경', ex: 'Plastic bags are bad for the environment.', exm: '비닐봉지는 환경에 나빠요.' },
  ],
});
