/* 6학년 영어 · 우리 문화 소개하기 */
Tutor.registerUnit({
  id: 'eng-e6-09',
  course: 'eng-e6',
  title: '우리 문화 소개하기',
  summary: 'Do you know anything about ~?으로 알고 있는지 묻고, 한옥이나 윷놀이 같은 우리 문화를 쉬운 문장으로 소개해요.',
  goals: [
    'Do you know anything about ~?으로 묻고 Yes, I do. / No, I don\'t.로 답할 수 있어요.',
    '"○○ is a traditional Korean ~." 틀로 우리 문화를 소개할 수 있어요.',
    'Who made ~?로 누가 만들었는지 묻고 "~ did."로 답할 수 있어요.',
    '다른 나라 친구의 문화 소개 글을 읽고 서로의 문화를 존중하는 말을 할 수 있어요.',
  ],
  standards: ['[6영02-04]', '[6영01-10]', '[6영01-04]'],

  concepts: [
    {
      title: '알고 있는지 묻고 답하기',
      body: '상대가 어떤 것을 알고 있는지 물을 때는 **Do you know anything about ~?** 라고 말해요. "~에 대해 뭐라도 알고 있니?"라는 뜻이에요.\n\n- A: Do you know anything about **Chuseok**?\n- B: **Yes, I do.** It\'s a big holiday in Korea.\n- B: **No, I don\'t.** Tell me about it.\n\n알면 **Yes, I do.**, 모르면 **No, I don\'t.**로 답해요. 질문이 Do로 시작했으니 대답에도 do를 그대로 받아 써요.\n\n> 💡 모를 때 "Tell me about it.(그것에 대해 말해 줘.)"이나 "What is it?(그게 뭐야?)"을 덧붙이면 대화가 자연스럽게 이어져요.',
      easy: '친구가 "너 추석에 대해 좀 알아?"라고 물으면 "응, 알아." 아니면 "아니, 몰라."라고 대답하지요? 영어도 똑같아요.\n\n- 물을 때: Do you know anything about ~?\n- "응, 알아.": Yes, I do.\n- "아니, 몰라.": No, I don\'t.\n\n질문 맨 앞의 **Do**를 대답에서 다시 쓴다고 기억하면 쉬워요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nA: Do you know anything about Seollal?\nB: [[빈칸]] We eat tteokguk on that day.',
        choices: ['Yes, I do.', 'No, I don\'t.', 'Yes, I am.'],
        answer: 0,
        why: [
          '',
          '모른다고 해 놓고 바로 설날에 하는 일을 말하면 어색해요. 뒤의 설명을 보면 B는 설날을 알고 있어요.',
          'Do로 물었으니 do로 답해요. "Yes, I am."은 Are you ~?에 답하는 말이에요.',
        ],
        explain: 'B가 "We eat tteokguk on that day.(그날 우리는 떡국을 먹어.)"라고 설명하니 설날을 알고 있어요. 그래서 "Yes, I do."가 알맞아요.',
      },
    },
    {
      title: '우리 문화 소개하기',
      body: '우리 문화를 소개할 때는 **"○○ is a traditional Korean ~."** 라는 틀을 쓰면 편해요.\n\n| 영어 문장 | 뜻 |\n|---|---|\n| **Hanok is a traditional Korean house.** | 한옥은 한국의 전통 집이에요. |\n| **Tuho is a traditional Korean game.** | 투호는 한국의 전통 놀이예요. |\n| **Songpyeon is a traditional Korean rice cake.** | 송편은 한국의 전통 떡이에요. |\n\n**traditional**은 "전통의, 옛날부터 이어져 온"이라는 뜻이에요. 영어에서는 꾸며 주는 말이 이름 낱말 앞에 오니까 **a traditional Korean house** 순서로 말해요.\n\n무엇인지 말한 다음 한 문장을 더 붙이면 좋은 소개가 돼요. 예: Hanok is a traditional Korean house. **It is cool in summer.**',
      easy: '소개 문장은 퍼즐 조각 세 개를 이어 붙인다고 생각하세요.\n\n1. 무엇을 소개하나요? → **Hanok**\n2. 무엇이에요? → **is a traditional Korean**\n3. 어떤 종류예요? → **house** (집) / **game** (놀이) / **rice cake** (떡)\n\n1번과 3번 조각만 바꾸면 여러 가지를 소개할 수 있어요. "Yunnori is a traditional Korean game."처럼요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nYunnori is a traditional Korean [[빈칸]].',
        choices: ['game', 'food', 'house'],
        answer: 0,
        why: [
          '',
          '윷놀이는 먹는 것이 아니라 하는 놀이예요. food는 "음식"이에요.',
          '윷놀이는 사는 곳이 아니라 놀이예요. house는 "집"이에요.',
        ],
        explain: '윷놀이(yunnori)는 한국의 전통 놀이예요. 놀이는 game이에요: "Yunnori is a traditional Korean game."',
      },
    },
    {
      title: '누가 만들었는지 묻고 답하기',
      body: '어떤 것을 **누가 만들었는지** 물을 때는 **Who made ~?** 라고 해요. made는 make(만들다)의 지난 일 모양이에요.\n\n- A: **Who made Hangeul?** (한글은 누가 만들었니?)\n- B: **King Sejong did.** (세종대왕이 만들었어.)\n\n대답의 **did**는 "made Hangeul"을 대신하는 말이에요. "King Sejong made Hangeul."이라고 길게 말해도 되지만, 짧게 "King Sejong did."라고 하는 것이 자연스러워요.\n\n- A: Who made Jagyeongnu? (자격루는 누가 만들었니?)\n- B: Jang Yeong-sil did. It is a water clock. (장영실이 만들었어. 그것은 물시계야.)\n\n> 💡 Who(누구)로 묻는 질문에는 Yes나 No로 답하지 않아요. **사람**을 말해 줘요.',
      easy: '"누가 만들었어?"라고 물으면 "세종대왕이 만들었어."라고 사람을 말하지요? 영어에서는 "만들었어"를 매번 다 말하지 않고 **did** 한 낱말로 줄여요.\n\n- 길게: King Sejong **made Hangeul**.\n- 짧게: King Sejong **did**.\n\n**did**가 "made Hangeul"을 통째로 대신하는 거예요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 대답을 고르세요.\n\nA: Who made Hangeul?\nB: [[빈칸]]',
        choices: ['King Sejong did.', 'Yes, he did.', 'King Sejong is.'],
        answer: 0,
        why: [
          '',
          'Who(누구)로 물었으니 Yes/No가 아니라 만든 사람을 말해야 해요.',
          '만든 것은 지난 일이라 made를 대신하는 did를 써요. is는 쓰지 않아요.',
        ],
        explain: '누가 만들었는지 물었으니 사람을 말하고, made Hangeul을 did로 줄여 "King Sejong did."라고 답해요.',
      },
    },
    {
      title: '전통 놀이·음식·옷 낱말',
      body: '우리 문화 이름은 꼭 맞는 영어 낱말이 없어서 **소리 나는 대로 영어 글자로** 써요. 이렇게 쓰면 다른 나라 친구도 우리말 이름을 그대로 배울 수 있어요.\n\n| 영어 글자 | 뜻 | 함께 쓰는 문장 |\n|---|---|---|\n| yunnori | 윷놀이 | We **play** yunnori on Seollal. |\n| tuho | 투호 | We **play** tuho. We throw sticks into a jar. |\n| songpyeon | 송편 | We **eat** songpyeon on Chuseok. |\n| tteokguk | 떡국 | We **eat** tteokguk on Seollal. |\n| hanbok | 한복 | We **wear** hanbok on holidays. |\n\n놀이는 **play**(하다), 음식은 **eat**(먹다), 옷은 **wear**(입다)와 짝을 지어 말해요.\n\n> 💡 명절 이름(Chuseok, Seollal)과 Hangeul은 이름이라서 문장 가운데에서도 첫 글자를 대문자로 써요. hanbok, songpyeon 같은 물건 이름은 문장 첫머리가 아니면 소문자로 써요.',
      easy: '놀이·음식·옷마다 어울리는 움직임 낱말이 따로 있어요.\n\n- 윷놀이, 투호 → 하고 놀아요 → **play**\n- 송편, 떡국 → 먹어요 → **eat**\n- 한복 → 입어요 → **wear**\n\n"한복을 먹어요"가 이상하듯이 "eat hanbok"도 이상해요. 짝꿍 낱말을 기억하세요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nWe [[빈칸]] hanbok on Chuseok.',
        choices: ['wear', 'eat', 'play'],
        answer: 0,
        why: [
          '',
          'hanbok(한복)은 먹는 것이 아니라 입는 옷이에요.',
          'play는 윷놀이 같은 놀이와 함께 써요. 옷은 입어요.',
        ],
        explain: '한복(hanbok)은 옷이니까 "입다"라는 뜻의 wear와 함께 써요: "We wear hanbok on Chuseok."',
      },
    },
    {
      title: '다른 나라 문화 읽고 존중하기',
      body: '다른 나라 친구가 자기 문화를 소개한 글을 읽어 봐요.\n\n> Hi, Jiwoo! I\'m Sofia from Mexico. Do you know anything about piñatas? A piñata is a paper toy with candy inside. At birthday parties, we hit it with a stick. Then the candy falls out! What do you do on your birthday in Korea?\n\n읽을 때는 **무엇을 소개하는지**(piñata), **언제 하는지**(at birthday parties), **어떻게 하는지**(hit it with a stick)를 찾아요.\n\n다른 나라 문화는 우리와 **다를 수 있어요. 다른 것이지 틀린 것이 아니에요.** 친구의 문화를 들으면 이렇게 존중하는 말로 답해요.\n\n- **That\'s interesting!** (그거 재미있다!)\n- **I want to try it.** (나도 해 보고 싶어.)\n- **Thank you for telling me.** (알려 줘서 고마워.)',
      easy: '친구가 "우리 집은 생일에 이렇게 해!"라고 말하면 "이상해."보다 "우아, 재미있다!"라는 말이 듣기 좋지요?\n\n나라마다 생일, 명절, 음식이 달라요. 우리가 생일에 미역국을 먹는 것도 다른 나라 친구에게는 새롭고 신기한 문화예요.\n\n그래서 다른 문화를 들으면 "That\'s interesting!"이라고 관심을 보여 줘요.',
      check: {
        type: 'ox',
        q: '다른 나라의 문화가 우리 문화와 다르면 그 문화는 틀린 거예요.',
        answer: false,
        explain: '문화는 나라마다 다를 뿐, 맞고 틀린 것이 없어요. 다른 문화를 들으면 "That\'s interesting!"처럼 존중하는 말로 답해요.',
      },
    },
  ],

  examples: [
    {
      q: '다음 우리말을 영어 두 문장으로 나타내 보세요.\n\n"한옥은 한국의 전통 집이에요. 그것은 여름에 시원해요."',
      steps: [
        '소개할 것을 맨 앞에 써요: **Hanok**',
        '"~이에요"는 is, "한국의 전통 집"은 a traditional Korean house예요. 꾸며 주는 말(traditional, Korean)이 house 앞에 와요.',
        '첫 문장: **Hanok is a traditional Korean house.**',
        '둘째 문장에서는 Hanok을 다시 쓰지 않고 It(그것)으로 바꿔요. "여름에 시원해요"는 is cool in summer예요.',
      ],
      answer: '**Hanok is a traditional Korean house. It is cool in summer.**',
    },
    {
      q: '대화를 완성해 보세요.\n\nA: Do you know anything about Hangeul?\nB: [[빈칸]] It\'s the Korean alphabet.\nA: Who made Hangeul?\nB: [[빈칸]]',
      steps: [
        '첫 빈칸: B가 뒤에서 "It\'s the Korean alphabet.(그것은 한국의 글자야.)"라고 설명하니 알고 있어요. Do로 물었으니 **Yes, I do.**',
        '둘째 빈칸: Who(누구)로 물었으니 만든 사람을 말해요. 한글을 만든 사람은 세종대왕이에요.',
        'made Hangeul을 did로 줄여서 **King Sejong did.**',
      ],
      answer: 'Yes, I do. / King Sejong did.',
    },
  ],

  terms: [
    { term: 'Do you know anything about ~?', def: '"~에 대해 뭐라도 알고 있니?"라고 묻는 말이에요. 알면 Yes, I do., 모르면 No, I don\'t.로 답해요.' },
    { term: 'traditional', def: '"전통의, 옛날부터 이어져 온"이라는 뜻이에요. 예: a traditional Korean house(한국의 전통 집)' },
    { term: 'Who made ~?', def: '"~은 누가 만들었니?"라고 묻는 말이에요. 예: Who made Hangeul? — King Sejong did.' },
    { term: 'did (대신하는 말)', def: '대답에서 앞에 나온 움직임을 대신하는 말이에요. "King Sejong did."의 did는 made Hangeul을 대신해요.' },
    { term: '로마자로 쓴 우리말', def: '영어 낱말이 없는 우리 문화 이름을 소리 나는 대로 영어 글자로 쓴 것이에요. 예: hanbok(한복), yunnori(윷놀이)' },
    { term: '문화 존중', def: '다른 나라 문화가 우리와 달라도 "틀렸다"고 하지 않고 관심과 예의를 보이는 것이에요. 예: That\'s interesting!' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nA: Do you know anything about tuho?\nB: [[빈칸]] What is it?',
      choices: ['No, I don\'t.', 'Yes, I do.', 'No, I\'m not.', 'Yes, it is.'],
      answer: 0,
      why: [
        '',
        '안다고 해 놓고 "What is it?(그게 뭐야?)"이라고 물으면 어색해요.',
        'Do로 물었으니 do로 답해요. 모를 때는 No, I don\'t.예요.',
        '"Yes, it is."는 Is it ~?으로 물을 때의 대답이에요.',
      ],
      explain: 'B가 "What is it?(그게 뭐야?)"이라고 되묻는 것을 보면 투호를 몰라요. Do로 물었으니 "No, I don\'t."로 답해요.',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 2,
      q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nA: Who made Hangeul?\nB: King Sejong [[빈칸]].',
      answer: ['did'],
      wrong: [
        { a: 'do', why: '한글을 만든 것은 지난 일이에요. do의 지난 모양 did를 써요.' },
        { a: 'made', why: 'made 뒤에는 만든 것(Hangeul)이 와야 해요. 짧게 답할 때는 made Hangeul을 did로 바꿔요.' },
      ],
      explain: '"King Sejong did."의 did는 made Hangeul을 대신해요. 그래서 빈칸에는 did가 들어가요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말을 고르세요.\n\nSongpyeon is a traditional Korean [[빈칸]].',
      choices: ['rice cake', 'house', 'game', 'holiday'],
      answer: 0,
      why: [
        '',
        '송편은 집이 아니에요. 집(house)은 hanok을 소개할 때 써요.',
        '송편은 놀이가 아니라 먹는 떡이에요.',
        '송편은 명절에 먹는 음식이지 명절 이름이 아니에요. 명절은 Chuseok이에요.',
      ],
      explain: '송편(songpyeon)은 추석에 먹는 한국의 전통 떡이에요. 떡은 rice cake예요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 3,
      q: '"yunnori"는 한국의 전통 놀이인 윷놀이를 소리 나는 대로 영어 글자로 쓴 말이에요.',
      answer: true,
      explain: '윷놀이는 꼭 맞는 영어 낱말이 없어서 소리 나는 대로 yunnori라고 써요. 놀이라서 "We play yunnori."처럼 play와 함께 써요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말을 고르세요.\n\nWe [[빈칸]] songpyeon on Chuseok.',
      choices: ['eat', 'wear', 'play', 'read'],
      answer: 0,
      why: [
        '',
        'wear는 "입다"예요. 송편은 입는 옷이 아니에요.',
        'play는 놀이와 함께 써요. 송편은 먹는 떡이에요.',
        'read는 "읽다"예요. 송편은 책이 아니에요.',
      ],
      explain: '송편은 음식이니까 "먹다"라는 뜻의 eat를 써요: "We eat songpyeon on Chuseok.(우리는 추석에 송편을 먹어요.)"',
    },
    {
      id: 'p6', level: 1, type: 'order', concept: 1,
      q: '낱말을 바르게 늘어놓아 문장을 만드세요.\n\n"투호는 한국의 전통 놀이예요."',
      choices: ['Tuho', 'is', 'a', 'traditional', 'Korean', 'game'],
      answer: [0, 1, 2, 3, 4, 5],
      explain: '"Tuho is a traditional Korean game." 소개할 것(Tuho) → is → a → 꾸며 주는 말(traditional, Korean) → 종류(game) 순서예요.',
    },
    {
      id: 'p7', level: 1, type: 'short', concept: 3,
      q: '빈칸에 "입다"라는 뜻의 영어 낱말을 쓰세요.\n\nWe [[빈칸]] hanbok on Seollal.',
      answer: ['wear'],
      wrong: [
        { a: 'were', why: 'were는 "~이었다"라는 뜻이에요. "입다"는 w-e-a-r 순서로 써요.' },
        { a: 'eat', why: 'eat는 "먹다"예요. 한복은 입는 옷이라 wear를 써요.' },
      ],
      explain: '"입다"는 wear예요. "We wear hanbok on Seollal.(우리는 설날에 한복을 입어요.)"',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 질문을 고르세요.\n\nA: [[빈칸]]\nB: Jang Yeong-sil did. It is a water clock.',
      choices: ['Who made Jagyeongnu?', 'Do you know Jang Yeong-sil?', 'What did Jang Yeong-sil make?', 'Where is Jagyeongnu?'],
      answer: 0,
      why: [
        '',
        'Do you know ~?로 물으면 Yes 또는 No로 답해요. B는 사람 이름으로 답했어요.',
        '무엇을 만들었는지 물으면 만든 물건을 답해야 해요. B는 만든 사람을 말했어요.',
        'Where는 장소를 묻는 말이에요. B는 장소가 아니라 사람을 말했어요.',
      ],
      hint: 'B의 대답 "Jang Yeong-sil did."는 무엇을 알려 주나요?',
      explain: '"Jang Yeong-sil did."는 누가 만들었는지 알려 주는 대답이에요. 그래서 질문은 "Who made Jagyeongnu?(자격루는 누가 만들었니?)"예요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: '글을 읽고 물음에 답하세요.\n\n> Hello, I\'m Ken from Japan. Do you know anything about Children\'s Day in Japan? It\'s on May 5. We hang fish-shaped flags outside. They are called koinobori. They mean "Grow up strong!"\n\nKen이 소개한 것은 무엇일까요?',
      choices: ['일본 어린이날에 다는 물고기 모양 깃발', '일본 어린이날에 먹는 물고기 요리', '일본의 전통 옷', '일본 설날에 하는 놀이'],
      answer: 0,
      why: [
        '',
        'fish-shaped flags는 "물고기 모양 깃발"이에요. 먹는 음식이 아니에요.',
        '글에 옷 이야기는 없어요. 깃발(flags)을 매단다(hang)고 했어요.',
        'May 5(5월 5일) 어린이날 이야기예요. 설날이 아니에요.',
      ],
      hint: 'We hang ~ outside.에서 무엇을 다는지 찾아보세요.',
      explain: 'Ken은 일본 어린이날(5월 5일)에 바깥에 다는 물고기 모양 깃발(koinobori)을 소개했어요. "튼튼하게 자라라!"라는 뜻이 담겨 있대요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '친구가 자기 나라 문화를 소개했을 때, 대답으로 알맞지 **않은** 것은 무엇일까요?',
      choices: ['That\'s interesting!', 'I want to try it.', 'That\'s strange. I don\'t like it.', 'Thank you for telling me.'],
      answer: 2,
      why: [
        '"그거 재미있다!"는 관심을 보이는 좋은 대답이에요. 알맞지 않은 것을 찾아요.',
        '"나도 해 보고 싶어."는 친구의 문화를 존중하는 대답이에요. 알맞지 않은 것을 찾아요.',
        '',
        '"알려 줘서 고마워."는 예의 바른 대답이에요. 알맞지 않은 것을 찾아요.',
      ],
      explain: '"That\'s strange. I don\'t like it.(이상해. 마음에 안 들어.)"은 친구의 문화를 무시하는 말이에요. 다른 문화는 틀린 것이 아니라 다른 것이니 존중하는 말로 답해요.',
    },
    {
      id: 'p11', level: 2, type: 'short', concept: 1,
      q: '빈칸에 "전통의"라는 뜻의 영어 낱말을 쓰세요.\n\nHanok is a [[빈칸]] Korean house.',
      answer: ['traditional'],
      wrong: [
        { a: 'tradition', why: 'tradition은 "전통"이라는 이름 낱말이에요. house를 꾸며 주는 말은 traditional이에요.' },
        { a: 'tradisional', why: '철자를 확인해 보세요. 가운데는 s가 아니라 t예요: tradi-t-ional.' },
      ],
      hint: 'tradition(전통)에 무엇을 붙이면 꾸며 주는 말이 될까요?',
      explain: '"전통의"는 traditional이에요. tradition(전통)에 -al을 붙여 house를 꾸며 줘요: "Hanok is a traditional Korean house."',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'order', concept: 0,
      q: '대화가 자연스럽게 이어지도록 순서대로 놓으세요.',
      choices: [
        'Do you know anything about Chuseok?',
        'No, I don\'t. What is it?',
        'It\'s a big Korean holiday in fall.',
        'What do you do on Chuseok?',
        'We eat songpyeon.',
      ],
      answer: [0, 1, 2, 3, 4],
      hint: '먼저 아는지 묻고, 모르면 무엇인지 설명해 줘요.',
      explain: '아는지 묻기(Do you know ~?) → 모른다며 되묻기(No, I don\'t. What is it?) → 설명(가을의 큰 명절) → 그날 무엇을 하는지 묻기 → 송편을 먹는다고 답하기 순서예요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 3,
      q: '글을 읽고 물음에 답하세요.\n\n> Hi, Emma. Do you know anything about yunnori? It\'s a traditional Korean game. We play it on Seollal. We throw four sticks. The sticks are called yut. My grandfather is very good at yunnori!\n\n글의 내용과 맞지 **않는** 것은 무엇일까요?',
      choices: ['윷놀이는 한국의 전통 놀이예요.', '설날에 윷놀이를 해요.', '막대기 다섯 개를 던져요.', '글쓴이의 할아버지는 윷놀이를 아주 잘해요.'],
      answer: 2,
      why: [
        '"It\'s a traditional Korean game."과 맞는 내용이에요.',
        '"We play it on Seollal."과 맞는 내용이에요.',
        '',
        '"My grandfather is very good at yunnori!"와 맞는 내용이에요.',
      ],
      hint: 'We throw [[빈칸]] sticks.에서 수를 나타내는 낱말을 확인해 보세요.',
      explain: '"We throw four sticks."라고 했으니 막대기(윷)는 네 개예요. four는 넷, five가 다섯이에요.',
    },
    {
      id: 'a3', level: 3, type: 'short', concept: 2,
      q: '두 대답이 같은 뜻이 되도록 빈칸에 알맞은 낱말 하나를 쓰세요.\n\nA: Who made Hangeul?\nB: King Sejong did. = King Sejong [[빈칸]] Hangeul.',
      answer: ['made'],
      wrong: [
        { a: 'make', why: '한글을 만든 것은 지난 일이에요. make의 지난 모양 made를 써요.' },
        { a: 'did', why: 'did는 "made Hangeul" 전체를 대신해요. 뒤에 Hangeul이 그대로 있으면 made를 써요.' },
      ],
      hint: '짧은 대답의 did는 어떤 말을 대신할까요?',
      explain: '"King Sejong did."의 did는 made Hangeul을 대신해요. 줄이지 않고 쓰면 "King Sejong made Hangeul."이에요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 0,
      q: '묻고 답하는 말이 **자연스러운** 것을 고르세요.',
      choices: [
        'A: Who made Hangeul? / B: Yes, I do.',
        'A: Do you know anything about hanok? / B: King Sejong did.',
        'A: Do you know anything about tuho? / B: Yes, I do. It\'s a traditional Korean game.',
        'A: What is songpyeon? / B: No, I don\'t.',
      ],
      answer: 2,
      why: [
        'Who로 물었으니 Yes/No가 아니라 만든 사람을 말해야 해요.',
        '한옥을 아는지 물었는데 만든 사람을 답했어요. Yes, I do. 또는 No, I don\'t.로 답해요.',
        '',
        'What is ~?는 무엇인지 묻는 말이라 "It\'s a rice cake."처럼 설명해야 해요.',
      ],
      explain: '투호를 아는지 물었고 "Yes, I do."로 답한 뒤 투호가 무엇인지 설명했으니 자연스러워요. 질문에 따라 대답이 달라요: Do you know ~? → Yes/No, Who ~? → 사람, What ~? → 설명.',
    },
  ],

  deeper: [
    {
      title: '한글은 왜 만들었을까요?',
      body: '옛날 우리나라에서는 글을 쓸 때 중국의 한자를 빌려 썼어요. 한자는 글자 수가 아주 많아서 배우기 어려웠고, 많은 백성이 글을 읽고 쓰지 못했어요.\n\n세종대왕은 백성이 쉽게 배워 쓸 수 있는 글자를 만들었어요. 1443년에 만들고 1446년에 **훈민정음**이라는 이름으로 널리 알렸어요. 이것이 오늘날의 한글이에요. 10월 9일 한글날은 이 일을 기념하는 날이에요.\n\n영어로는 이렇게 소개할 수 있어요.\n\n> Hangeul is the Korean alphabet. King Sejong made it. It is easy to learn.',
    },
    {
      title: '좋은 문화 소개 글의 비결',
      body: '다른 나라 친구에게 우리 문화를 소개할 때는 세 가지를 담으면 좋아요.\n\n1. **무엇인지**: Tteokguk is a traditional Korean soup.\n2. **언제 하는지**: We eat it on Seollal.\n3. **어떤 점이 특별한지**: 떡국을 먹으면 한 살을 더 먹는다는 이야기가 있어요.\n\n마지막에 "Do you have a special food on New Year\'s Day?"처럼 친구에게 질문하면 서로의 문화를 나누는 대화가 이어져요.',
    },
  ],

  faq: [
    {
      q: 'hanbok이나 yunnori는 왜 영어 낱말로 안 바꾸고 소리대로 써요?',
      a: '우리 문화에만 있는 것이라 꼭 맞는 영어 낱말이 없기 때문이에요. 억지로 바꾸면 뜻이 달라질 수 있어요. 그래서 소리 나는 대로 영어 글자로 쓰고, 처음 소개할 때 "Hanbok is traditional Korean clothing."처럼 무엇인지 설명을 붙여 줘요.',
    },
    {
      q: 'Who made Hangeul?에 왜 King Sejong did.라고 대답해요? made를 써야 하지 않아요?',
      a: '"King Sejong made Hangeul."이라고 해도 맞아요. 하지만 질문에 이미 made Hangeul이 나왔으니 대답에서는 did 한 낱말로 줄여 말하는 것이 자연스러워요. 이때 did는 made Hangeul을 대신해요.',
    },
    {
      q: 'Chuseok은 대문자로 쓰는데 hanbok은 왜 소문자로 써요?',
      a: 'Chuseok, Seollal 같은 명절 이름과 Hangeul은 하나뿐인 고유한 이름이라서 언제나 첫 글자를 대문자로 써요. hanbok, songpyeon 같은 물건 이름은 보통 소문자로 쓰고, 문장 첫머리에 올 때만 대문자로 시작해요.',
    },
  ],

  mistakes: [
    'Do you know anything about ~?에 "Yes, I am."이라고 답하는 실수 — Do로 물었으니 "Yes, I do." / "No, I don\'t."로 답해요.',
    'Who made ~?에 "Yes, he did."라고 답하는 실수 — Who는 사람을 묻는 말이라 "King Sejong did."처럼 사람을 말해요.',
    '"a Korean traditional house"처럼 꾸며 주는 말의 순서를 바꾸는 실수 — "a traditional Korean house"가 자연스러워요.',
  ],

  vocab: [
    { w: 'culture', m: '문화', ex: 'I want to learn about Korean culture.', exm: '나는 한국 문화에 대해 배우고 싶어요.' },
    { w: 'traditional', m: '전통의, 전통적인', ex: 'Hanok is a traditional Korean house.', exm: '한옥은 한국의 전통 집이에요.' },
    { w: 'holiday', m: '명절, 휴일', ex: 'Chuseok is a big holiday in Korea.', exm: '추석은 한국의 큰 명절이에요.' },
    { w: 'hanok', m: '한옥', ex: 'My grandmother lives in a hanok.', exm: '우리 할머니는 한옥에 사세요.' },
    { w: 'hanbok', m: '한복', ex: 'We wear hanbok on Seollal.', exm: '우리는 설날에 한복을 입어요.' },
    { w: 'songpyeon', m: '송편', ex: 'We make songpyeon with our family.', exm: '우리는 가족과 함께 송편을 만들어요.' },
    { w: 'yunnori', m: '윷놀이', ex: 'Let\'s play yunnori together.', exm: '함께 윷놀이를 하자.' },
    { w: 'tuho', m: '투호', ex: 'In tuho, we throw sticks into a jar.', exm: '투호에서는 막대기를 항아리에 던져 넣어요.' },
    { w: 'rice cake', m: '떡', ex: 'Songpyeon is a rice cake.', exm: '송편은 떡이에요.' },
    { w: 'wear', m: '입다', ex: 'I wear a coat in winter.', exm: '나는 겨울에 외투를 입어요.' },
    { w: 'king', m: '왕', ex: 'King Sejong made Hangeul.', exm: '세종대왕이 한글을 만들었어요.' },
    { w: 'made', m: '만들었다 (make의 지난 일 모양)', ex: 'Who made this cake?', exm: '이 케이크는 누가 만들었어요?' },
    { w: 'interesting', m: '재미있는, 흥미로운', ex: 'Your story is very interesting.', exm: '네 이야기는 아주 재미있어.' },
    { w: 'different', m: '다른', ex: 'Our cultures are different.', exm: '우리의 문화는 서로 달라요.' },
    { w: 'try', m: '해 보다', ex: 'I want to try tuho.', exm: '나는 투호를 해 보고 싶어요.' },
  ],
});
