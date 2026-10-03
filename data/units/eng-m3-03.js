/* 중3 영어 · 명사 꾸며 말하기 (분사) */
Tutor.registerUnit({
  id: 'eng-m3-03',
  course: 'eng-m3',
  title: '명사 꾸며 말하기 (분사)',
  summary: '현재분사와 과거분사의 뜻 차이를 익히고, 분사로 명사를 꾸며 사람과 사물을 생생하게 묘사해요.',
  goals: [
    '현재분사(-ing)와 과거분사(-ed)의 뜻 차이(능동·진행 / 수동·완료)를 구별할 수 있어요.',
    '분사를 명사 앞이나 뒤에 써서 명사를 꾸밀 수 있어요.',
    'exciting과 excited처럼 감정을 나타내는 분사를 알맞게 쓸 수 있어요.',
    '분사를 써서 사진 속 인물의 모습과 감정을 묘사할 수 있어요.',
  ],
  standards: ['[9영02-02]', '[9영02-03]', '[9영01-05]'],

  concepts: [
    {
      title: '현재분사와 과거분사: 능동과 수동',
      body: '**분사**는 동사를 형용사처럼 쓰는 꼴이에요. 명사를 꾸미거나 설명해 줘요. 분사에는 두 가지가 있어요.\n\n| 이름 | 꼴 | 뜻 | 예 |\n|---|---|---|---|\n| **현재분사** | 동사원형 + -ing | 능동·진행: "~하는, ~하고 있는" | a **sleeping** baby (자고 있는 아기) |\n| **과거분사** | 동사원형 + -ed (불규칙 동사는 따로) | 수동·완료: "~된, ~당한, ~해 버린" | a **broken** window (깨진 창문) |\n\n어느 것을 쓸지는 **꾸밈을 받는 명사와 동작의 관계**로 정해요.\n\n- 아기는 **스스로 자고 있어요** → 능동·진행 → sleeping\n- 창문은 스스로 깨지 않았어요. **누군가에 의해 깨졌어요** → 수동 → broken\n\n> 💡 중1에서 배운 진행형(be + -ing), 중2에서 배운 수동태(be + 과거분사), 현재완료(have + 과거분사)에 쓰인 바로 그 -ing와 과거분사예요. 동사의 뜻은 그대로이고, 문장 속에서 하는 일만 형용사로 바뀐 거예요.',
      easy: '명사에게 "네가 직접 했니, 아니면 당했니?" 하고 물어보세요.\n\n- 아기에게: "네가 자고 있니?" → "네, 제가 자요." → 직접 함 → **-ing** (sleeping)\n- 창문에게: "네가 깼니?" → "아니요, 누가 저를 깼어요." → 당함 → **과거분사** (broken)\n\n직접 하면 -ing, 당하면 과거분사예요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nI bought a [[빈칸]] car. (그 차는 전에 다른 사람이 타던 차예요.)',
        choices: ['used', 'using', 'use'],
        answer: 0,
        why: [
          '',
          '차가 스스로 무언가를 쓰는 것이 아니라 사람이 쓴(사용된) 차예요. 수동이므로 과거분사를 써요.',
          '명사를 꾸밀 때는 동사원형이 아니라 분사(-ing 또는 과거분사)를 써요.',
        ],
        explain: '차는 사람에 의해 **사용된** 것이므로 수동의 과거분사 **used**를 써요. a used car는 "중고차"라는 뜻이에요.',
      },
    },
    {
      title: '명사 앞에서 꾸미는 분사',
      body: '분사가 **혼자(한 낱말)** 명사를 꾸밀 때는 보통 **명사 앞**에 와요. 형용사(a **happy** baby)와 같은 자리예요.\n\n| 현재분사 (능동·진행) | 과거분사 (수동·완료) |\n|---|---|\n| a **sleeping** baby 자고 있는 아기 | a **broken** window 깨진 창문 |\n| a **crying** child 울고 있는 아이 | a **stolen** bike 도둑맞은 자전거 |\n| **boiling** water 끓고 있는 물 | **fried** rice 볶은 밥 |\n| a **smiling** girl 웃고 있는 소녀 | **fallen** leaves 떨어진 잎 |\n\n과거분사의 "완료" 뜻도 알아 두세요. fall(떨어지다)은 누가 떨어뜨리는 것이 아니지만, **fallen** leaves는 "이미 떨어져 버린 잎"이에요. 지금 떨어지는 중이면 **falling** leaves예요.\n\n> ⚠️ 불규칙 동사의 과거분사는 따로 외워요: break - broke - **broken**, steal - stole - **stolen**, write - wrote - **written**, make - made - **made**',
      easy: '분사 한 낱말은 형용사처럼 명사 바로 앞에 앉아요.\n\n- a **red** apple (빨간 사과) — 형용사\n- a **sleeping** baby (자고 있는 아기) — 분사\n\n우리말로도 "자고 있는 아기", "깨진 창문"처럼 꾸미는 말이 명사 앞에 오지요? 영어도 한 낱말일 때는 똑같아요.',
      check: {
        type: 'choice',
        q: '"도둑맞은 자전거"를 영어로 바르게 나타낸 것을 고르세요.',
        choices: ['a stolen bike', 'a stealing bike', 'a steal bike'],
        answer: 0,
        why: [
          '',
          'stealing은 "훔치고 있는"이라는 능동의 뜻이에요. 자전거는 도둑맞은(수동) 것이에요.',
          '명사를 꾸밀 때는 동사원형이 아니라 분사를 써요.',
        ],
        explain: '자전거는 누군가에게 **도둑맞은** 것이므로 수동의 과거분사 stolen을 써요. steal - stole - **stolen** → **a stolen bike**',
      },
    },
    {
      title: '명사 뒤에서 꾸미는 분사구',
      body: '분사 뒤에 다른 말(목적어, 장소, 때 …)이 붙어 **두 낱말 이상의 덩어리(분사구)**가 되면 **명사 뒤**에서 꾸며요.\n\n- the boy **playing the guitar** (기타를 치고 있는 소년)\n- the girl **sitting next to me** (내 옆에 앉아 있는 소녀)\n- a car **made in Korea** (한국에서 만들어진 자동차)\n- a letter **written in English** (영어로 쓰인 편지)\n\n문장에 넣으면 이렇게 돼요.\n\n- **The boy playing the guitar** is my brother. (기타를 치고 있는 소년은 내 남동생이에요.)\n\n주어가 The boy playing the guitar까지 한 덩어리이고, 문장의 동사는 **is**예요.\n\n> 💡 중2에서 배운 관계대명사와 비교해 보세요. the boy **who is** playing the guitar에서 "주격 관계대명사 + be동사(who is)"를 빼면 the boy playing the guitar가 돼요.',
      easy: '꾸미는 말이 길면 명사 뒤로 보내요. 우리말과 순서가 반대라서 처음엔 헷갈려요.\n\n- 우리말: [기타를 치고 있는] 소년\n- 영어: the boy [playing the guitar]\n\n영어 문장을 읽다가 명사 뒤에 -ing나 과거분사로 시작하는 덩어리가 나오면, "아, 앞의 명사를 꾸미는구나" 하고 괄호로 묶어 보세요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nWho is the girl [[빈칸]] a yellow dress?',
        choices: ['wearing', 'worn', 'wears'],
        answer: 0,
        why: [
          '',
          '여자아이가 직접 원피스를 입고 있으니 능동이에요. worn(입혀진)은 수동의 뜻이에요.',
          '이 문장에는 이미 동사 is가 있어요. 명사를 꾸미는 자리에는 분사를 써요.',
        ],
        explain: '여자아이가 노란 원피스를 **입고 있는** 것이므로 현재분사 **wearing**이에요. wearing a yellow dress가 뒤에서 the girl을 꾸며요. "노란 원피스를 입고 있는 여자아이는 누구니?"',
      },
    },
    {
      title: '감정을 나타내는 분사: exciting과 excited',
      body: 'excite(신나게 하다), bore(지루하게 하다), surprise(놀라게 하다)처럼 감정을 나타내는 동사는 대부분 "**~한 감정을 일으키다**"라는 뜻이에요. 그래서 분사의 뜻이 이렇게 나뉘어요.\n\n- **-ing**: 감정을 **일으키는** 쪽 → "~하게 하는, ~한"\n- **과거분사(-ed)**: 감정을 **느끼는** 쪽 → "~한 감정을 느끼는"\n\n| -ing (감정을 주는 쪽) | -ed (감정을 느끼는 쪽) |\n|---|---|\n| exciting 신나는 | excited 신이 난 |\n| boring 지루한 | bored 지루해하는 |\n| surprising 놀라운 | surprised 놀란 |\n| interesting 흥미로운 | interested 흥미를 느끼는 |\n| tiring 피곤하게 하는 | tired 피곤한 |\n| disappointing 실망스러운 | disappointed 실망한 |\n\n- The game was **exciting**. (경기가 신나게 했어요 → 신나는 경기)\n- The fans were **excited**. (팬들이 신이 났어요)\n\n> ⚠️ 사람에게도 -ing를 쓸 수 있어요. 그러면 뜻이 달라져요. He is **bored**.(그는 지루해해요.) / He is **boring**.(그는 남을 지루하게 하는 사람이에요.)',
      easy: '"누가 느끼나?"를 따져 보세요.\n\n재미없는 영화를 봤어요. 영화는 지루함을 **주었고**, 나는 지루함을 **받았어요**.\n\n- 주는 쪽(영화) → **boring**: The movie was boring.\n- 받는 쪽(나) → **bored**: I was bored.\n\n느낌을 **받은** 쪽에 -ed를 붙인다고 기억하세요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nThe movie was so long that I felt [[빈칸]].',
        choices: ['bored', 'boring', 'bore'],
        answer: 0,
        why: [
          '',
          '지루함을 느끼는 쪽은 "나(I)"예요. 감정을 느끼는 쪽에는 과거분사(-ed)를 써요.',
          'felt 뒤에는 상태를 나타내는 말(형용사)이 와요. 동사원형은 올 수 없어요.',
        ],
        explain: '지루함을 **느끼는** 사람은 나이므로 **bored**를 써요. "영화가 너무 길어서 나는 지루했어요." 영화 쪽을 말하면 The movie was boring.이에요.',
      },
    },
    {
      title: '분사로 사진 속 인물 묘사하기',
      body: '사진을 설명하는 글에서 분사는 아주 쓸모가 많아요. 사람이 여럿일 때 **누가 누구인지** 분사구로 구별하고, **어떤 기분인지** 감정 분사로 나타내요.\n\n> In this photo, I can see a park on a sunny day. **A girl wearing a red cap** is flying a kite. **A boy holding an ice cream** is sitting on a bench. He looks very **excited**. Under a tree, an old man is reading a newspaper. **A dog lying on the grass** looks **bored**.\n\n쓰는 순서를 정리하면 이래요.\n\n1. 어디서 무엇을 하는 사진인지 말해요: In this photo, I can see ~.\n2. 사람을 분사구로 구별해요: the girl **wearing** ~, the boy **holding** ~\n3. 무엇을 하고 있는지 진행형으로: is flying a kite\n4. 기분을 감정 분사로: He looks **excited**. / They look **surprised**.\n\n> 💡 look + 형용사(~해 보이다)는 중1에서 배운 감각동사예요. 사진 속 사람의 기분은 직접 알 수 없으니 looks를 쓰면 자연스러워요.',
      easy: '사진 속에 사람이 다섯 명 있다고 해 봐요. "소년이 웃어요"라고만 쓰면 어느 소년인지 몰라요.\n\n그래서 "**아이스크림을 들고 있는** 소년", "**빨간 모자를 쓴** 소녀"처럼 이름표를 붙여 줘요. 영어로는 the boy **holding an ice cream**, the girl **wearing a red cap**이에요. 분사구가 이름표 역할을 하는 거예요.',
      check: {
        type: 'choice',
        q: '사진 설명 글에서 "빨간 모자를 쓴 여자아이"를 바르게 나타낸 것을 고르세요.',
        choices: ['a girl wearing a red cap', 'a girl worn a red cap', 'a wearing girl a red cap'],
        answer: 0,
        why: [
          '',
          '여자아이가 직접 모자를 쓰고 있으니 능동의 현재분사 wearing을 써요.',
          '분사 뒤에 a red cap이 붙어 두 낱말 이상이 되면 명사 뒤에서 꾸며요.',
        ],
        explain: '여자아이가 모자를 **쓰고 있는**(능동) 것이고, 분사구 wearing a red cap이 길어서 명사 뒤에 와요. → **a girl wearing a red cap**',
      },
    },
  ],

  examples: [
    {
      q: '두 문장을 분사를 써서 한 문장으로 나타내세요.\n\nThe boy is my brother. He is playing the guitar on the stage.',
      steps: [
        '두 번째 문장은 첫 문장의 The boy가 무엇을 하고 있는지 알려 줘요. 소년이 직접 기타를 치고 있으니 능동 → 현재분사 playing',
        '분사 뒤에 the guitar on the stage가 붙어 덩어리가 길어요. 그래서 명사 뒤에 놓아요: The boy playing the guitar on the stage',
        '이 덩어리 전체가 주어이고, 그 뒤에 원래 문장의 동사 is를 이어요.',
      ],
      answer: '**The boy playing the guitar on the stage** is my brother. (무대에서 기타를 치고 있는 소년은 내 남동생이에요.)',
    },
    {
      q: '괄호 안에서 알맞은 말을 고르세요.\n\nThe news was (surprising / surprised). Everyone in the class was (surprising / surprised).',
      steps: [
        '첫 문장의 주어 The news(소식)는 놀라움을 **일으키는** 쪽이에요 → surprising',
        '둘째 문장의 주어 Everyone(모두)은 놀라움을 **느끼는** 쪽이에요 → surprised',
      ],
      answer: 'The news was **surprising**. Everyone in the class was **surprised**. (그 소식은 놀라웠어요. 반 아이들 모두 놀랐어요.)',
    },
  ],

  terms: [
    { term: '분사', def: '동사를 형용사처럼 쓰는 꼴이에요. 현재분사(-ing)와 과거분사가 있고, 명사를 꾸미거나 설명해요.' },
    { term: '현재분사', def: '동사원형 + -ing 꼴이에요. "~하는, ~하고 있는"이라는 능동·진행의 뜻이에요. 예: a sleeping baby(자고 있는 아기)' },
    { term: '과거분사', def: '동사의 세 번째 꼴(규칙 동사는 -ed)이에요. "~된, ~당한"이라는 수동이나 "~해 버린"이라는 완료의 뜻이에요. 예: a broken window(깨진 창문)' },
    { term: '능동', def: '주어나 꾸밈을 받는 명사가 동작을 **직접 하는** 관계예요. 분사로는 -ing를 써요.' },
    { term: '수동', def: '주어나 꾸밈을 받는 명사가 동작을 **당하는(받는)** 관계예요. 분사로는 과거분사를 써요.' },
    { term: '분사구', def: '분사 뒤에 목적어나 장소·때를 나타내는 말이 붙은 덩어리예요. 명사 뒤에서 꾸며요. 예: the boy playing the guitar' },
    { term: '감정을 나타내는 분사', def: 'exciting/excited처럼 감정 동사에서 나온 분사예요. -ing는 감정을 일으키는 쪽, -ed는 감정을 느끼는 쪽에 써요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nBe careful! There is [[빈칸]] glass on the floor.',
      choices: ['broken', 'breaking', 'break', 'broke'],
      answer: 0,
      why: [
        '',
        '유리는 스스로 깨는 것이 아니라 깨진(수동) 것이에요. 수동은 과거분사를 써요.',
        '명사를 꾸밀 때는 동사원형을 쓰지 않아요.',
        'broke는 과거형이에요. 명사를 꾸미는 수동의 뜻은 과거분사 broken이에요.',
      ],
      explain: '유리는 누군가에 의해 **깨진** 것이므로 수동의 과거분사 **broken**을 써요. break - broke - broken. "조심해! 바닥에 깨진 유리가 있어."',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '"웃고 있는 아이"를 영어로 바르게 나타낸 것을 고르세요.',
      choices: ['a smiling child', 'a smiled child', 'a smile child', 'a smiles child'],
      answer: 0,
      why: [
        '',
        '아이가 직접 웃고 있으니 능동·진행이에요. 과거분사가 아니라 -ing를 써요.',
        '명사를 꾸밀 때는 동사원형이 아니라 분사를 써요.',
        'smiles는 현재형 동사예요. 명사를 꾸미는 자리에는 분사가 와요.',
      ],
      explain: '아이가 **웃고 있는**(능동·진행) 것이므로 현재분사 smiling을 명사 앞에 써요. → **a smiling child**',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 3,
      q: '괄호 안의 낱말을 알맞은 꼴로 바꾸어 빈칸에 쓰세요.\n\nThe soccer game was really [[빈칸]]. (excite)',
      answer: ['exciting'],
      wrong: [
        { a: 'excited', why: 'excited는 신이 난 "사람"의 기분이에요. 경기(game)는 신나게 하는 쪽이라 exciting을 써요.' },
        { a: 'excite', why: 'be동사(was) 뒤에 동사원형은 쓸 수 없어요. 감정을 나타내는 분사로 바꾸어요.' },
      ],
      explain: '경기는 사람을 **신나게 하는** 쪽이므로 **exciting**이에요. "그 축구 경기는 정말 신났어요."',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'text', concept: 3,
      q: '괄호 안의 낱말을 알맞은 꼴로 바꾸어 빈칸에 쓰세요.\n\nI was very [[빈칸]] at the news. (surprise)',
      answer: ['surprised'],
      wrong: [
        { a: 'surprising', why: '놀라움을 느끼는 쪽은 "나(I)"예요. 감정을 느끼는 쪽에는 과거분사 surprised를 써요.' },
        { a: 'surprise', why: 'be동사(was) 뒤에 동사원형은 쓸 수 없어요. 감정을 나타내는 분사로 바꾸어요.' },
      ],
      explain: '내가 그 소식에 놀라움을 **느낀** 것이므로 **surprised**예요. "나는 그 소식에 몹시 놀랐어요." 소식 쪽을 말하면 The news was surprising.이에요.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 2,
      q: '다음 문장을 읽고 답하세요.\n\nThe girl sitting next to me is Jia.\n\n이 문장에서 sitting next to me는 The girl을 꾸며 주는 말이에요.',
      answer: true,
      explain: '맞아요. 분사구 sitting next to me(내 옆에 앉아 있는)가 뒤에서 The girl을 꾸며요. 문장의 동사는 is예요. "내 옆에 앉아 있는 소녀는 지아예요."',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르세요.\n\nDo you know the man [[빈칸]] a black hat?',
      choices: ['wearing', 'worn', 'wears', 'wear'],
      answer: 0,
      why: [
        '',
        '남자가 직접 모자를 쓰고 있으니 능동이에요. worn(입혀진)은 수동의 뜻이에요.',
        '이 문장에는 이미 동사 know가 있어요. 명사를 꾸미는 자리에는 분사를 써요.',
        '명사를 꾸밀 때는 동사원형이 아니라 분사를 써요.',
      ],
      explain: '남자가 검은 모자를 **쓰고 있는** 것이므로 현재분사 **wearing**이에요. wearing a black hat이 뒤에서 the man을 꾸며요. "검은 모자를 쓴 남자를 아니?"',
    },
    {
      id: 'p7', level: 1, type: 'ox', concept: 1,
      q: 'fallen leaves는 "지금 떨어지고 있는 잎"이라는 뜻이에요.',
      answer: false,
      explain: '과거분사 fallen은 "이미 ~해 버린"이라는 **완료**의 뜻이라서 fallen leaves는 "(이미) 떨어진 잎, 낙엽"이에요. 지금 떨어지고 있는 잎은 현재분사를 써서 **falling** leaves라고 해요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 2,
      q: '우리말에 맞게 낱말을 바르게 배열하세요.\n\n피아노를 치고 있는 소녀는 내 여동생이에요.',
      choices: ['The girl', 'playing', 'the piano', 'is', 'my sister'],
      answer: [0, 1, 2, 3, 4],
      hint: '분사구(피아노를 치고 있는)는 꾸밈을 받는 명사 뒤에 와요.',
      explain: '**The girl playing the piano is my sister.** 분사구 playing the piano가 The girl 뒤에서 꾸미고, 문장의 동사 is가 그 뒤에 와요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'text', concept: 2,
      q: '두 문장을 한 문장으로 나타낼 때 빈칸에 알맞은 **한 낱말**을 쓰세요.\n\nI have a book. It was written in English.\n→ I have a book [[빈칸]] in English.',
      answer: ['written'],
      hint: '책은 쓰는 쪽일까요, 쓰인 쪽일까요?',
      wrong: [
        { a: 'writing', why: '책이 무언가를 직접 쓰는 것이 아니에요. 책은 영어로 "쓰인" 것이므로 과거분사를 써요.' },
        { a: 'wrote', why: 'wrote는 과거형이에요. 수동의 뜻으로 꾸밀 때는 과거분사 written을 써요. write - wrote - written' },
      ],
      explain: '책은 영어로 **쓰인**(수동) 것이므로 과거분사 **written**이에요. written in English가 뒤에서 a book을 꾸며요. "나는 영어로 쓰인 책을 한 권 가지고 있어요."',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '우리말 뜻에 맞는 문장을 고르세요.\n\n나는 그 결과에 실망했어요.',
      choices: [
        'I was disappointed with the result.',
        'I was disappointing with the result.',
        'The result was disappointed.',
        'I disappointing the result.',
      ],
      answer: 0,
      why: [
        '',
        'disappointing은 "실망스럽게 하는"이에요. 실망을 느끼는 쪽(나)에는 disappointed를 써요.',
        '결과는 실망을 느끼는 쪽이 아니라 주는 쪽이에요. 결과를 주어로 하면 The result was disappointing.이에요.',
        '문장에 동사가 없어요. 분사만으로는 문장의 동사가 될 수 없어요.',
      ],
      explain: '실망을 **느낀** 사람은 나이므로 **I was disappointed** with the result.예요. 결과를 주어로 쓰면 The result was disappointing.(그 결과는 실망스러웠어요.)이에요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '글을 읽고 물음에 답하세요.\n\nThis is a photo of my family at the beach. The man wearing sunglasses is my dad. He is lying on a towel. My little brother is building a sandcastle. He looks excited. My mom is taking a picture of him. I am the girl holding a big watermelon.\n\n글의 내용과 일치하는 것을 고르세요.',
      choices: [
        '선글라스를 쓴 사람은 아빠예요.',
        '남동생이 커다란 수박을 들고 있어요.',
        '엄마는 모래성을 쌓고 있어요.',
        '남동생은 지루해 보여요.',
      ],
      answer: 0,
      why: [
        '',
        'the girl holding a big watermelon(커다란 수박을 들고 있는 소녀)은 글쓴이 "나(I)"예요.',
        '모래성을 쌓는 사람은 남동생이에요. 엄마는 남동생의 사진을 찍고 있어요.',
        'He looks excited.는 "신이 나 보인다"는 뜻이에요.',
      ],
      hint: '분사구가 꾸미는 사람이 누구인지 찾아보세요.',
      explain: 'The man wearing sunglasses is my dad.에서 wearing sunglasses가 The man을 꾸며요. "선글라스를 쓴 남자는 우리 아빠예요." 수박을 든 사람은 글쓴이, 모래성을 쌓는 사람은 남동생이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '다음 중 어법상 **옳지 않은** 문장을 고르세요.',
      choices: [
        'This is a picture painting by my grandfather.',
        'The girl talking to Minsu is my cousin.',
        'I found my lost key in my bag.',
        'Look at the boy jumping rope over there.',
      ],
      answer: 0,
      why: [
        '',
        '바른 문장이에요. 소녀가 직접 이야기하고 있으니 현재분사 talking이 맞아요.',
        '바른 문장이에요. 열쇠는 잃어버려진 것이니 과거분사 lost가 맞아요.',
        '바른 문장이에요. 소년이 직접 줄넘기를 하고 있으니 현재분사 jumping이 맞아요.',
      ],
      hint: '꾸밈을 받는 명사가 동작을 직접 하는지, 당하는지 하나씩 따져 보세요.',
      explain: '그림은 할아버지에 **의해 그려진** 것(수동)이므로 painting이 아니라 과거분사 **painted**를 써야 해요: This is a picture **painted** by my grandfather.(이것은 우리 할아버지가 그리신 그림이에요.)',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 3,
      q: '다음 문장에서 어법상 틀린 낱말 하나를 찾아 바르게 고친 낱말만 쓰세요.\n\nThe students were exciting about the school trip to Jeju.',
      answer: ['excited'],
      hint: '신나는 감정을 느끼는 쪽은 누구일까요?',
      wrong: [
        { a: 'exciting', why: '틀린 낱말을 그대로 썼어요. 학생들은 신이 난(감정을 느끼는) 쪽이에요.' },
        { a: 'excite', why: 'be동사(were) 뒤에 동사원형은 쓸 수 없어요. 감정을 느끼는 쪽에는 과거분사를 써요.' },
      ],
      explain: '학생들은 제주도 수학여행 때문에 신나는 감정을 **느끼는** 쪽이에요. 그래서 exciting이 아니라 **excited**로 고쳐요. "학생들은 제주도 수학여행에 신이 났어요." (The students were exciting.이라고 하면 "학생들이 남을 신나게 했다"는 뜻이 돼요.)',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 2,
      q: '두 문장을 한 문장으로 바르게 나타낸 것을 고르세요.\n\nThe man is my uncle. He is standing at the door.',
      choices: [
        'The man standing at the door is my uncle.',
        'The standing at the door man is my uncle.',
        'The man stood at the door is my uncle.',
        'The man is standing at the door is my uncle.',
      ],
      answer: 0,
      why: [
        '',
        '분사 뒤에 at the door가 붙어 길어졌으니 명사 뒤에서 꾸며요.',
        'stood는 과거형 동사예요. 한 문장에 동사가 둘(stood, is)이 되어 틀려요. 꾸미는 말은 분사 standing이에요.',
        'is가 두 번 나와 한 문장에 동사가 둘이에요. 꾸미는 덩어리에서는 is를 빼요.',
      ],
      hint: '한 문장에 동사는 하나(is)만 남아야 해요.',
      explain: '남자가 문 앞에 **서 있는**(능동·진행) 것이므로 standing at the door가 The man 뒤에서 꾸며요. → **The man standing at the door is my uncle.** (문 앞에 서 있는 남자는 우리 삼촌이에요.)',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '사진 설명 글의 (A), (B)에 들어갈 말로 알맞은 것을 고르세요.\n\nIn this photo, a boy (A) a blue shirt is running to the finish line. He is smiling, and he looks very (B).',
      choices: ['wearing - excited', 'wearing - exciting', 'worn - excited', 'worn - exciting'],
      answer: 0,
      why: [
        '',
        '(B) 소년은 신나는 감정을 느끼는 쪽이라 excited예요. exciting이면 "남을 신나게 하는 사람"처럼 보인다는 뜻이 돼요.',
        '(A) 소년이 직접 셔츠를 입고 있으니 능동의 wearing이에요.',
        '(A)는 능동이라 wearing, (B)는 감정을 느끼는 쪽이라 excited예요. 둘 다 바꿔야 해요.',
      ],
      hint: '(A)는 소년과 입는 동작의 관계, (B)는 감정을 느끼는 사람이 누구인지 생각해 보세요.',
      explain: '(A) 소년이 파란 셔츠를 **입고 있는**(능동) 것이므로 **wearing**. (B) 소년이 신나는 감정을 **느끼는** 쪽이므로 **excited**. "이 사진에서 파란 셔츠를 입은 소년이 결승선으로 달려가고 있어요. 그는 웃고 있고, 무척 신나 보여요."',
    },
    {
      id: 'a5', level: 3, type: 'order', concept: 2,
      q: '우리말에 맞게 낱말을 바르게 배열하세요.\n\n한국에서 만들어진 자동차들은 인기가 많아요.',
      choices: ['Cars', 'made', 'in Korea', 'are', 'popular'],
      answer: [0, 1, 2, 3, 4],
      hint: '자동차는 만드는 쪽일까요, 만들어진 쪽일까요? 꾸미는 덩어리는 명사 뒤에 와요.',
      explain: '**Cars made in Korea are popular.** 자동차는 한국에서 **만들어진**(수동) 것이므로 과거분사 made를 쓰고, made in Korea가 Cars 뒤에서 꾸며요. 문장의 동사는 are예요.',
    },
  ],

  deeper: [
    {
      title: '분사와 동명사, 그리고 다음 단원의 분사구문',
      body: '-ing 꼴은 두 가지 일을 해요. 겉모습은 같아도 하는 일이 달라요.\n\n| | 하는 일 | 예 |\n|---|---|---|\n| **현재분사** | 형용사처럼 명사를 꾸밈 ("~하고 있는") | a **sleeping** baby (자고 있는 아기) |\n| **동명사** | 명사처럼 쓰임 ("~하는 것, ~하기 위한") | a **sleeping** bag (잠자기 위한 가방 → 침낭) |\n\na sleeping baby는 아기가 자고 있지만, a sleeping bag은 가방이 자는 게 아니라 "잠잘 때 쓰는 가방"이에요. 명사가 그 동작을 하는지 따져 보면 구별할 수 있어요.\n\n다음 단원에서는 분사가 명사를 꾸미는 데서 한 걸음 더 나아가, **문장 전체에 때·이유를 덧붙이는 분사구문**을 배워요. 예: **Walking** home, I met Jia.(집에 걸어가다가 나는 지아를 만났어요.) 오늘 배운 "능동이면 -ing" 원리가 그대로 쓰여요.',
    },
  ],

  faq: [
    {
      q: 'excited랑 exciting은 어떻게 구별해요?',
      a: '"그 감정을 누가 느끼나?"를 따져요. 감정을 느끼는 쪽(주로 사람)은 -ed, 감정을 일으키는 쪽(주로 사물·일)은 -ing 꼴이에요.\n\n예: The concert was exciting.(콘서트가 신났어요.) / I was excited.(나는 신이 났어요.)',
    },
    {
      q: '분사는 언제 명사 앞에 오고 언제 뒤에 와요?',
      a: '분사 한 낱말만 꾸미면 명사 앞(a crying baby), 분사 뒤에 다른 말이 붙어 덩어리가 되면 명사 뒤(a baby crying in the room)에 와요.',
    },
    {
      q: 'The boy playing the guitar is my brother.에서 동사는 playing이에요?',
      a: '아니에요. playing the guitar는 The boy를 꾸미는 말이고, 문장의 동사는 is예요. 분사는 혼자서 문장의 동사가 될 수 없어요. 주어가 "기타를 치고 있는 소년"이라는 긴 덩어리라고 생각하면 돼요.',
    },
  ],

  mistakes: [
    '감정을 느끼는 사람에게 -ing를 쓰는 실수 — I was boring.(✗, "나는 지루한 사람이었다") → I was bored.(나는 지루했어요.)',
    '수동인데 현재분사를 쓰는 실수 — a car making in Korea(✗) → a car made in Korea. 자동차는 만들어진 쪽이에요.',
    '분사구를 명사 앞에 두는 실수 — the playing the guitar boy(✗) → the boy playing the guitar',
  ],

  gens: [
    {
      id: 'emotion-participle',
      level: 1,
      title: '감정을 나타내는 분사 고르기 (-ing / -ed)',
      make: function (R) {
        // 감정 동사: 원형, -ing, -ed, 감정을 주는 쪽 문장 2개, 느끼는 쪽 문장 2개 ([문장, 뜻])
        var emotions = [
          { base: 'excite', ing: 'exciting', ed: 'excited',
            thing: [['The soccer game was really [[빈칸]].', '그 축구 경기는 정말 신났어요.'], ['The roller coaster ride was [[빈칸]].', '롤러코스터 타기는 신났어요.']],
            person: [['The fans were [[빈칸]] about the game.', '팬들은 그 경기에 신이 났어요.'], ['Hayun was [[빈칸]] to see the snow.', '하윤이는 눈을 보고 신이 났어요.']] },
          { base: 'bore', ing: 'boring', ed: 'bored',
            thing: [['The long speech was [[빈칸]].', '그 긴 연설은 지루했어요.'], ['This TV show is [[빈칸]].', '이 TV 프로그램은 지루해요.']],
            person: [['The students looked [[빈칸]] in the long meeting.', '학생들은 긴 회의에서 지루해 보였어요.'], ['I felt [[빈칸]] at home all day.', '나는 하루 종일 집에서 지루했어요.']] },
          { base: 'surprise', ing: 'surprising', ed: 'surprised',
            thing: [['The ending of the story was [[빈칸]].', '그 이야기의 결말은 놀라웠어요.'], ['The test result was [[빈칸]].', '시험 결과는 놀라웠어요.']],
            person: [['Minsu was [[빈칸]] at the gift.', '민수는 그 선물에 놀랐어요.'], ['We were [[빈칸]] to hear the news.', '우리는 그 소식을 듣고 놀랐어요.']] },
          { base: 'interest', ing: 'interesting', ed: 'interested',
            thing: [['The science class was very [[빈칸]].', '과학 수업은 무척 흥미로웠어요.'], ['This book about space is [[빈칸]].', '우주에 관한 이 책은 흥미로워요.']],
            person: [['Jia is [[빈칸]] in old coins.', '지아는 옛날 동전에 관심이 있어요.'], ['My brother is [[빈칸]] in robots.', '우리 형은 로봇에 관심이 있어요.']] },
          { base: 'tire', ing: 'tiring', ed: 'tired',
            thing: [['The long walk was [[빈칸]].', '오래 걷는 것은 피곤했어요.'], ['Cleaning the whole house is [[빈칸]].', '집 전체를 청소하는 것은 피곤한 일이에요.']],
            person: [['Dad was [[빈칸]] after work.', '아빠는 일을 마치고 피곤하셨어요.'], ['I felt [[빈칸]] after the long trip.', '나는 긴 여행 뒤에 피곤했어요.']] },
          { base: 'disappoint', ing: 'disappointing', ed: 'disappointed',
            thing: [['The weather on our trip was [[빈칸]].', '여행 때 날씨는 실망스러웠어요.'], ['The movie was a little [[빈칸]].', '그 영화는 조금 실망스러웠어요.']],
            person: [['Seojun was [[빈칸]] with his score.', '서준이는 자기 점수에 실망했어요.'], ['The fans were [[빈칸]] when the game was canceled.', '경기가 취소되자 팬들은 실망했어요.']] },
          { base: 'confuse', ing: 'confusing', ed: 'confused',
            thing: [['The map was [[빈칸]].', '그 지도는 헷갈렸어요.'], ['These rules are [[빈칸]].', '이 규칙들은 헷갈려요.']],
            person: [['Doyun looked [[빈칸]] by the question.', '도윤이는 그 질문에 헷갈려 보였어요.'], ['I was [[빈칸]] about the time of the meeting.', '나는 모임 시간이 헷갈렸어요.']] },
        ];
        var e = R.pick(emotions);
        var feel = R.bool();
        var s = R.pick(feel ? e.person : e.thing);
        var correct = feel ? e.ed : e.ing;
        var other = feel ? e.ing : e.ed;
        var reason = {};
        reason[other] = feel
          ? '이 보기는 감정을 "일으키는" 쪽에 써요. 이 문장의 주어는 감정을 느끼는 쪽이라 과거분사(-ed)를 써요.'
          : '이 보기는 감정을 "느끼는" 쪽에 써요. 이 문장의 주어는 감정을 일으키는 쪽이라 현재분사(-ing)를 써요.';
        reason[e.base] = '이 자리에는 상태를 나타내는 말(형용사)이 와야 해요. 동사원형은 올 수 없어요.';
        var pick = R.choices(correct, [other, e.base], 3);
        return {
          type: 'choice', concept: 3,
          q: '빈칸에 알맞은 말을 고르세요.\n\n' + s[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: (feel
            ? '주어가 그 감정을 **느끼는** 쪽이므로 과거분사를 써요: **' + correct + '**'
            : '주어가 그 감정을 **일으키는** 쪽이므로 현재분사를 써요: **' + correct + '**') +
            '\n\n' + s[0].replace('[[빈칸]]', '**' + correct + '**') + '\n(' + s[1] + ')',
        };
      },
    },
    {
      id: 'participle-modify',
      level: 2,
      title: '명사를 꾸미는 현재분사와 과거분사 고르기',
      make: function (R) {
        // [문장, 원형, -ing, 과거분사, 정답이 -ing 인가, 이유(꾸밈받는 명사와의 관계), 뜻]
        var items = [
          ['Look at the [[빈칸]] baby in the bed.', 'sleep', 'sleeping', 'slept', true, '아기가 직접 자고 있어요(능동·진행).', '침대에서 자고 있는 아기를 보세요.'],
          ['Don\'t touch the [[빈칸]] window.', 'break', 'breaking', 'broken', false, '창문은 누군가에 의해 깨진 것이에요(수동).', '깨진 창문을 만지지 마세요.'],
          ['I found my [[빈칸]] wallet under the sofa.', 'lose', 'losing', 'lost', false, '지갑은 잃어버려진 것이에요(수동).', '나는 잃어버린 지갑을 소파 밑에서 찾았어요.'],
          ['The boy [[빈칸]] the drums is my cousin.', 'play', 'playing', 'played', true, '소년이 직접 드럼을 치고 있어요(능동·진행).', '드럼을 치고 있는 소년은 내 사촌이에요.'],
          ['This is a bag [[빈칸]] in Italy.', 'make', 'making', 'made', false, '가방은 이탈리아에서 만들어진 것이에요(수동).', '이것은 이탈리아에서 만들어진 가방이에요.'],
          ['The girl [[빈칸]] next to Minsu is Jia.', 'sit', 'sitting', 'sat', true, '소녀가 직접 앉아 있어요(능동·진행).', '민수 옆에 앉아 있는 소녀는 지아예요.'],
          ['I read a letter [[빈칸]] in Chinese.', 'write', 'writing', 'written', false, '편지는 중국어로 쓰인 것이에요(수동).', '나는 중국어로 쓰인 편지를 읽었어요.'],
          ['The man [[빈칸]] a red cap is my uncle.', 'wear', 'wearing', 'worn', true, '남자가 직접 모자를 쓰고 있어요(능동·진행).', '빨간 모자를 쓴 남자는 우리 삼촌이에요.'],
          ['We ate [[빈칸]] rice for lunch.', 'fry', 'frying', 'fried', false, '밥은 누군가가 볶은 것이에요(수동).', '우리는 점심으로 볶음밥을 먹었어요.'],
          ['Look at the children [[빈칸]] in the pool.', 'swim', 'swimming', 'swum', true, '아이들이 직접 수영하고 있어요(능동·진행).', '수영장에서 수영하고 있는 아이들을 보세요.'],
          ['She showed me a photo [[빈칸]] by her dad.', 'take', 'taking', 'taken', false, '사진은 아빠에 의해 찍힌 것이에요(수동).', '그녀는 아빠가 찍은 사진을 나에게 보여 주었어요.'],
          ['The dog [[빈칸]] at the door is Max.', 'bark', 'barking', 'barked', true, '개가 직접 짖고 있어요(능동·진행).', '문 앞에서 짖고 있는 개는 맥스예요.'],
          ['Who is the woman [[빈칸]] to our teacher?', 'talk', 'talking', 'talked', true, '여자가 직접 이야기하고 있어요(능동·진행).', '우리 선생님과 이야기하고 있는 여자는 누구니?'],
          ['He fixed the [[빈칸]] chair.', 'break', 'breaking', 'broken', false, '의자는 부서진 것이에요(수동).', '그는 부서진 의자를 고쳤어요.'],
          ['There is a cat [[빈칸]] on the roof.', 'lie', 'lying', 'lain', true, '고양이가 직접 누워 있어요(능동·진행).', '지붕 위에 누워 있는 고양이가 있어요.'],
          ['English is a language [[빈칸]] in many countries.', 'speak', 'speaking', 'spoken', false, '영어는 사람들에 의해 쓰이는(말해지는) 언어예요(수동).', '영어는 많은 나라에서 쓰이는 언어예요.'],
          ['The [[빈칸]] bike was found in the park.', 'steal', 'stealing', 'stolen', false, '자전거는 도둑맞은 것이에요(수동).', '도둑맞은 자전거가 공원에서 발견되었어요.'],
          ['Do you know the boy [[빈칸]] a kite over there?', 'fly', 'flying', 'flown', true, '소년이 직접 연을 날리고 있어요(능동·진행).', '저기에서 연을 날리고 있는 소년을 아니?'],
          ['I like the cookies [[빈칸]] by my grandma.', 'bake', 'baking', 'baked', false, '쿠키는 할머니가 구우신 것이에요(수동).', '나는 할머니가 구워 주신 쿠키를 좋아해요.'],
        ];
        var it = R.pick(items);
        var correct = it[4] ? it[2] : it[3];
        var other = it[4] ? it[3] : it[2];
        var reason = {};
        reason[other] = it[4]
          ? '이 보기는 수동·완료의 뜻이에요. ' + it[5] + ' 그래서 현재분사를 써요.'
          : '이 보기는 능동·진행의 뜻이에요. ' + it[5] + ' 그래서 과거분사를 써요.';
        reason[it[1]] = '명사를 꾸밀 때는 동사원형을 쓰지 않아요. 분사(-ing 또는 과거분사)를 써요.';
        var pick = R.choices(correct, [other, it[1]], 3);
        return {
          type: 'choice', concept: 0,
          q: '빈칸에 알맞은 말을 고르세요.\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: it[5] + ' 그래서 ' + (it[4] ? '현재분사' : '과거분사') + '를 써요: **' + correct + '**\n\n' + it[0].replace('[[빈칸]]', '**' + correct + '**') + '\n(' + it[6] + ')',
        };
      },
    },
  ],

  vocab: [
    { w: 'excited', m: '신이 난, 들뜬', ex: 'The kids were excited about the trip.', exm: '아이들은 여행 때문에 신이 났어요.' },
    { w: 'exciting', m: '신나는, 흥미진진한', ex: 'It was an exciting game.', exm: '그것은 신나는 경기였어요.' },
    { w: 'bored', m: '지루해하는', ex: 'I was bored, so I called my friend.', exm: '나는 지루해서 친구에게 전화했어요.' },
    { w: 'boring', m: '지루한', ex: 'The movie was long and boring.', exm: '그 영화는 길고 지루했어요.' },
    { w: 'surprised', m: '놀란', ex: 'She looked surprised at the gift.', exm: '그녀는 선물을 보고 놀란 것 같았어요.' },
    { w: 'confused', m: '혼란스러운, 헷갈리는', ex: 'I was confused by the long question.', exm: '나는 긴 질문 때문에 헷갈렸어요.' },
    { w: 'broken', m: '깨진, 고장 난', ex: 'Be careful with the broken cup.', exm: '깨진 컵을 조심하세요.' },
    { w: 'stolen', m: '도둑맞은', ex: 'The police found the stolen bike.', exm: '경찰이 도둑맞은 자전거를 찾았어요.' },
    { w: 'wear', m: '입다, 쓰다, 신다', ex: 'The girl wearing glasses is my sister.', exm: '안경을 쓴 소녀는 내 여동생이에요.' },
    { w: 'hold', m: '들고 있다, 잡다', ex: 'The boy holding a ball is Doyun.', exm: '공을 들고 있는 소년은 도윤이에요.' },
    { w: 'photo', m: '사진', ex: 'This photo was taken in Jeju.', exm: '이 사진은 제주에서 찍었어요.' },
    { w: 'describe', m: '묘사하다, 설명하다', ex: 'Can you describe the man in the photo?', exm: '사진 속 남자를 묘사해 줄 수 있니?' },
    { w: 'stage', m: '무대', ex: 'The girl singing on the stage is my friend.', exm: '무대에서 노래하고 있는 소녀는 내 친구예요.' },
    { w: 'crowd', m: '군중, 사람들', ex: 'The crowd cheering for the team was loud.', exm: '팀을 응원하는 사람들은 시끄러웠어요.' },
    { w: 'smile', m: '미소 짓다, 웃다', ex: 'Look at the smiling baby.', exm: '웃고 있는 아기를 보세요.' },
  ],
});
