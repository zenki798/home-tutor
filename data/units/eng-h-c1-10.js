/* 공통영어1 · 함축 의미와 비유 표현
 * 지문·예문은 모두 직접 쓴 글이다(가상의 인물). 관용 표현·속담은 널리 쓰이는 영어 표현이다. */
(function () {
  // 함축 의미 지문 (직접 쓴 글)
  var CLUB = 'On the first day of the photography club, nobody said a word. Everyone just stared at their phones. Then Jiho told a funny story about getting lost on his way to the club room. Everyone laughed, and soon we were all talking about our favorite photos. His story really __broke the ice__.';
  var EXAM = 'Before the final exam, Minsu spent every night playing games. Whenever his friends asked if he was worried, he just said, "It\'ll be fine." He never opened his textbook or checked the exam schedule. The night before the exam, he finally realized there were 200 pages to study. He had __buried his head in the sand__ for weeks.';
  var GARDEN = 'My grandfather has __a green thumb__. Every plant in his house grows tall and healthy, and his tomatoes are the biggest in the neighborhood. My plants, on the other hand, usually die within a month.';
  var FESTIVAL = 'The day before the school festival, the classroom was __a beehive__. Some students were painting signs, others were practicing songs, and a few were hanging balloons from the ceiling.';

Tutor.registerUnit({
  id: 'eng-h-c1-10',
  course: 'eng-h-c1',
  title: '함축 의미와 비유 표현',
  summary: '관용 표현과 비유에 담긴 속뜻을 문맥과 문화적 배경으로 짐작하고, 글자 그대로의 뜻과 구별합니다.',
  goals: [
    'break the ice, a piece of cake 같은 자주 쓰는 관용 표현의 뜻을 알 수 있다.',
    '직유(like, as)와 은유를 구별하고, 비유가 나타내는 속뜻을 설명할 수 있다.',
    '앞뒤 문맥의 단서로 낯선 낱말과 표현의 뜻을 짐작할 수 있다.',
    '속담·격언에 담긴 문화적 배경을 이해하고, 글자 그대로의 뜻과 속뜻을 구별할 수 있다.',
  ],
  standards: ['[10공영1-01-05]'],

  concepts: [
    {
      title: '자주 쓰는 관용 표현',
      body: '**관용 표현(idiom)**은 낱말 몇 개가 모여 **원래 낱말 뜻과 다른 새로운 뜻**을 갖게 된 표현입니다. 낱말 뜻을 하나씩 더해서는 전체 뜻이 나오지 않으므로 덩어리째 익힙니다.\n\n| 표현 | 글자 그대로 | 실제 뜻 |\n|---|---|---|\n| **break the ice** | 얼음을 깨다 | 어색한 분위기를 깨다 |\n| **a piece of cake** | 케이크 한 조각 | 아주 쉬운 일 |\n| **under the weather** | 날씨 아래에 | 몸이 좀 안 좋은 |\n| **hit the books** | 책을 때리다 | 열심히 공부하다 |\n| **cost an arm and a leg** | 팔 하나와 다리 하나가 들다 | 엄청나게 비싸다 |\n| **let the cat out of the bag** | 고양이를 자루에서 꺼내다 | 비밀을 무심코 말해 버리다 |\n| **once in a blue moon** | 푸른 달이 뜰 때 한 번 | 아주 드물게 |\n| **give ~ a hand** | ~에게 손을 주다 | ~을 도와주다 |\n\nThe science quiz was **a piece of cake**. (과학 퀴즈는 아주 쉬웠다.)\nCould you **give me a hand** with these boxes? (이 상자들 옮기는 것 좀 도와줄래?)\n\n> 💡 우리말에도 관용 표현이 많습니다. "발이 넓다"가 발 크기가 아니라 아는 사람이 많다는 뜻인 것처럼, 영어 관용 표현도 그림처럼 떠올리기보다 **쓰이는 상황**과 함께 기억합니다.',
      easy: '관용 표현은 친구들끼리 쓰는 **별명**과 같습니다. 반에서 "걸어 다니는 사전"이라고 불리는 친구가 진짜 사전은 아니지요. 그 반 친구들은 그 말이 "아는 것이 많은 아이"라는 뜻인 줄 압니다.\n\n영어를 쓰는 사람들도 "a piece of cake"라고 하면 케이크가 아니라 "식은 죽 먹기"를 떠올립니다. 그래서 낱말을 하나씩 해석하지 말고 **표현 전체에 붙은 별명**처럼 외워 두면 됩니다.',
      check: {
        type: 'choice',
        q: '밑줄 친 표현의 뜻으로 알맞은 것은 무엇입니까?\n\nThe new phone looks great, but it __costs an arm and a leg__.',
        choices: ['엄청나게 비싸다', '몸이 다칠 수 있다', '아주 쉽게 쓸 수 있다'],
        answer: 0,
        why: ['', '글자 그대로 팔과 다리를 떠올렸습니다. 이 표현은 다치는 것과 상관없이 "값이 매우 비싸다"는 관용 표현입니다.', '아주 쉬운 일은 a piece of cake입니다. but 앞뒤가 반대이므로 좋지 않은 점이 와야 합니다.'],
        explain: '**cost an arm and a leg**는 "팔 하나와 다리 하나만큼 든다", 곧 **엄청나게 비싸다**는 뜻의 관용 표현입니다. 휴대 전화가 멋지다(but) 그러나 값이 너무 비싸다는 흐름입니다.',
      },
    },
    {
      title: '직유: like, as ~ as 로 빗대기',
      body: '**직유(simile)**는 두 대상을 **like**(~처럼)나 **as ~ as**(~만큼 …한)로 **직접 견주어** 나타내는 비유입니다. 견주는 말이 겉으로 드러나 있어서 찾기 쉽습니다.\n\n| 직유 | 뜻 |\n|---|---|\n| as busy as a bee | 벌처럼 바쁜 → 매우 바쁜 |\n| as light as a feather | 깃털처럼 가벼운 → 매우 가벼운 |\n| as cold as ice | 얼음처럼 차가운 → 매우 차가운, 쌀쌀맞은 |\n| sleep like a log | 통나무처럼 자다 → 깊이 잠들다 |\n| run like the wind | 바람처럼 달리다 → 매우 빨리 달리다 |\n\n직유를 읽을 때는 "두 대상이 **어떤 점**에서 닮았는가?"를 찾습니다. as busy as a bee는 벌의 생김새가 아니라 쉬지 않고 일하는 **바쁜 점**을 빌려 온 것입니다.\n\n> ⚠️ like가 늘 직유는 아닙니다. I like apples.(좋아하다), It looks like rain.(~할 것 같다)처럼 비유가 아닌 like도 많습니다. **두 대상을 빗대어** 견줄 때만 직유입니다.',
      easy: '직유는 그림 옆에 **"~처럼"이라는 이름표**를 붙이는 것입니다. 친구가 정말 빨리 달렸다면 "바람처럼 달렸어!"라고 하지요. 영어로는 He ran **like the wind**.\n\n"얼마나?"를 생생하게 보여 주고 싶을 때, 누구나 아는 것(벌, 깃털, 얼음, 바람)을 끌어와 like나 as ~ as로 이어 붙이면 직유가 됩니다.',
      check: {
        type: 'choice',
        q: '밑줄 친 표현의 뜻으로 알맞은 것은 무엇입니까?\n\nThe new laptop is __as light as a feather__.',
        choices: ['매우 가볍다', '깃털로 만들어졌다', '쉽게 망가진다'],
        answer: 0,
        why: ['', '글자 그대로 읽었습니다. as ~ as a feather는 노트북이 깃털과 "가볍다는 점"에서 닮았다는 직유입니다.', '깃털이 약하다는 점을 떠올렸지만, 표현에 쓰인 형용사는 light(가벼운)입니다.'],
        explain: '**as light as a feather**는 깃털처럼 가볍다, 곧 **매우 가볍다**는 직유입니다. 두 대상이 닮은 점은 as와 as 사이의 형용사(light)에 드러납니다.',
      },
    },
    {
      title: '은유: A는 B이다',
      body: '**은유(metaphor)**는 like나 as 없이 **"A는 B이다"**처럼 한 대상을 다른 대상이라고 **바로 말해 버리는** 비유입니다.\n\n| 은유 | 속뜻 |\n|---|---|\n| **Time is money.** | 시간은 돈처럼 귀하니 낭비하지 마라 |\n| My brother is **a walking dictionary**. | 형은 아는 낱말(지식)이 아주 많다 |\n| The classroom was **a zoo**. | 교실이 동물원처럼 몹시 시끄럽고 어수선했다 |\n| Life is **a journey**. | 인생은 여러 일을 겪으며 나아가는 긴 과정이다 |\n\n직유와 은유를 견주어 보면 차이가 분명합니다.\n\n- 직유: The classroom was **like** a zoo. (교실이 동물원 **같았다**)\n- 은유: The classroom **was** a zoo. (교실은 동물원**이었다**)\n\n은유는 견주는 말이 없으므로 글자 그대로 읽으면 말이 안 됩니다(교실이 진짜 동물원일 리 없다). 이때 "두 대상의 **공통점**이 무엇인가?"를 찾으면 속뜻이 보입니다.',
      easy: '직유가 "너는 **해님 같아**"라고 말하는 것이라면, 은유는 그냥 "너는 **나의 해님이야**"라고 말하는 것입니다. 사람이 진짜 해일 리 없으니, 듣는 사람은 "밝고 따뜻하다는 뜻이구나" 하고 알아듣습니다.\n\n문장이 글자 그대로는 말이 안 되는데 "A is B" 꼴이면 은유를 의심하고, A와 B가 닮은 점을 찾으십시오.',
      check: {
        type: 'ox',
        q: 'Life is a journey. 는 like나 as가 없으므로 비유 표현이 아니다.',
        answer: false,
        explain: 'like나 as 없이 "인생은 여행이다"라고 바로 빗댄 **은유**입니다. 인생이 진짜 여행은 아니므로, 여러 일을 겪으며 나아간다는 **공통점**을 빌려 온 비유입니다.',
      },
    },
    {
      title: '문맥으로 낯선 낱말·표현의 뜻 짐작하기',
      body: '지문에 모르는 낱말이나 표현이 나와도 바로 사전을 찾을 필요는 없습니다. 주변 문장에 뜻을 알려 주는 **단서**가 있는 경우가 많습니다.\n\n| 단서 | 신호 | 예 |\n|---|---|---|\n| **정의·바꿔 말하기** | that is, in other words, 쉼표·줄표(—) | He was **exhausted** — that is, very tired. |\n| **예시** | such as, for example | **Citrus** fruits, such as oranges and lemons, ~ |\n| **대조** | but, unlike, while, on the other hand | **Unlike** his talkative sister, Junho is **reserved**. |\n| **상황·결과** | 앞뒤 내용 | She was **famished**, so she ate three bowls of rice. |\n\n짐작하는 순서는 다음과 같습니다.\n\n1. 모르는 낱말의 **품사와 좋고 나쁨**(긍정·부정)부터 정합니다.\n2. 앞뒤에서 단서 신호를 찾습니다.\n3. 짐작한 뜻을 넣어 문장을 다시 읽고 말이 되는지 확인합니다.\n\n관용 표현도 같은 방법으로 짐작할 수 있습니다. 위의 famished 예에서 "밥을 세 그릇 먹었다"는 결과가 "몹시 배고픈"이라는 뜻을 알려 줍니다.',
      easy: '모르는 낱말은 **탐정 놀이**로 풉니다. 범인(모르는 낱말)을 직접 보지 못해도 현장에 남은 발자국(앞뒤 문장)을 보면 누구인지 짐작할 수 있지요.\n\n"Unlike 수다쟁이 누나, 준호는 ___ 하다"라면, 빈칸은 수다쟁이와 **반대**인 "말이 적은"일 것입니다. unlike라는 발자국이 반대 방향을 가리키니까요.',
      check: {
        type: 'choice',
        q: '밑줄 친 낱말의 뜻으로 가장 알맞은 것은 무엇입니까?\n\nThe room was __spotless__. There was not a single speck of dust anywhere, and everything was in its place.',
        choices: ['아주 깨끗한', '몹시 어두운', '텅 비어 있는'],
        answer: 0,
        why: ['', '어둡다는 단서(빛, 불)는 글에 없습니다. 먼지가 하나도 없다는 것이 단서입니다.', '모든 물건이 제자리에 있다고 했으므로 비어 있는 방이 아닙니다.'],
        explain: '뒤 문장의 "먼지 한 점 없고 모든 것이 제자리에 있었다"가 단서입니다. 그래서 spotless는 **아주 깨끗한**(얼룩 하나 없는)이라는 뜻입니다.',
      },
    },
    {
      title: '속담·격언과 문화적 배경',
      body: '**속담(proverb)**과 격언은 오랜 경험에서 나온 교훈을 짧게 담은 말입니다. 영어 속담에는 영어권 사람들의 생활과 역사가 담겨 있어서, 배경을 알면 뜻이 쉽게 이해됩니다.\n\n| 속담 | 글자 그대로 | 속뜻 / 비슷한 우리 속담 |\n|---|---|---|\n| **The early bird catches the worm.** | 일찍 일어나는 새가 벌레를 잡는다 | 부지런한 사람이 기회를 얻는다 |\n| **Don\'t count your chickens before they hatch.** | 알이 깨기 전에 병아리를 세지 마라 | 김칫국부터 마시지 마라 |\n| **Too many cooks spoil the broth.** | 요리사가 많으면 국을 망친다 | 사공이 많으면 배가 산으로 간다 |\n| **When in Rome, do as the Romans do.** | 로마에서는 로마 사람처럼 하라 | 그 지역의 풍습을 따르라 |\n| **Actions speak louder than words.** | 행동이 말보다 크게 말한다 | 말보다 실천이 중요하다 |\n| **Every cloud has a silver lining.** | 모든 구름에는 은빛 테두리가 있다 | 나쁜 일에도 좋은 면이 있다 |\n\n닭을 기르던 농촌 생활(병아리), 옛 로마 제국, 햇빛을 등진 구름 가장자리가 은빛으로 빛나는 모습처럼 **생활 속 장면**이 교훈의 재료가 되었습니다.\n\n> 💡 비슷한 우리 속담이 있어도 뜻이 완전히 같지는 않을 수 있습니다. 반드시 **글의 상황**에 비추어 뜻을 확인합니다.',
      easy: '속담은 할머니가 들려주는 **한 줄짜리 이야기**입니다. "알이 깨기 전에 병아리를 세지 마라"는 장면을 떠올려 보십시오. 달걀 열 개를 보고 "병아리가 열 마리나 생기겠다!" 하고 들떴는데, 정작 몇 개는 깨어나지 않을 수 있지요.\n\n그래서 이 속담은 "아직 일어나지 않은 좋은 일을 확실한 것처럼 기대하지 마라"는 뜻이 됩니다. 장면을 그려 보면 교훈이 보입니다.',
      check: {
        type: 'choice',
        q: '다음 속담과 뜻이 가장 비슷한 우리 속담은 무엇입니까?\n\nToo many cooks spoil the broth.',
        choices: ['사공이 많으면 배가 산으로 간다', '백지장도 맞들면 낫다', '세 살 버릇 여든까지 간다'],
        answer: 0,
        why: ['', '백지장도 맞들면 낫다는 "함께하면 쉽다"는 뜻으로, 사람이 많으면 일을 망친다는 이 속담과 반대입니다.', '어릴 때 버릇이 오래간다는 뜻으로, 사람 수와 상관이 없습니다.'],
        explain: '요리사가 너무 많으면 저마다 간을 맞춰 국을 망친다는 말로, **간섭하는 사람이 많으면 일이 잘못된다**는 뜻입니다. 우리 속담 "사공이 많으면 배가 산으로 간다"와 비슷합니다.',
      },
    },
    {
      title: '글자 그대로의 뜻과 속뜻 구별하기',
      body: '같은 표현도 **글자 그대로의 뜻(literal meaning)**으로 쓰일 때가 있고, **속뜻(figurative meaning)**으로 쓰일 때가 있습니다. 어느 쪽인지는 **문맥**이 정합니다.\n\n- The children **broke the ice** on the frozen pond with a stick. → 글자 그대로 (진짜 얼음을 깼다)\n- Jiho told a joke to **break the ice** at the meeting. → 속뜻 (어색한 분위기를 풀었다)\n\n**판단 방법**: 글자 그대로 읽어서 **상황에 맞지 않거나 불가능하면** 속뜻입니다. It\'s raining cats and dogs.(고양이와 개가 내린다?) → 불가능하므로 속뜻, "비가 억수같이 온다"입니다.\n\n**함축 의미 문제**(밑줄 친 부분이 의미하는 바)는 이렇게 풉니다.\n\n1. 밑줄 친 표현을 글자 그대로 읽어 봅니다. 대개 말이 되지 않습니다.\n2. 밑줄 **앞뒤 문장**에서 그 표현이 가리키는 **구체적인 상황**을 찾습니다.\n3. 그 상황을 한 문장으로 요약한 선택지를 고릅니다. 글자 그대로의 뜻을 옮긴 선택지는 대부분 함정입니다.',
      easy: '"배가 산으로 간다"라는 말을 듣고 진짜 배가 산을 오르는 모습을 떠올리는 사람은 없지요. 상황(여러 사람이 서로 다른 지시를 함)을 보고 속뜻을 압니다.\n\n영어도 같습니다. 밑줄 친 말을 사진처럼 떠올렸을 때 **말이 안 되는 장면**이 나오면, 그 말은 속뜻으로 쓰인 것입니다. 그때는 글 속에서 그 말이 무엇을 가리키는지 찾으면 됩니다.',
      check: {
        type: 'ox',
        q: 'My little brother broke the ice on the frozen pond with a stick. 에서 broke the ice는 "어색한 분위기를 깼다"는 속뜻으로 쓰였다.',
        answer: false,
        explain: '얼어붙은 연못(frozen pond)의 얼음을 막대기로 깬 것이므로 **글자 그대로의 뜻**(진짜 얼음을 깼다)입니다. 속뜻은 사람들 사이의 어색함을 풀 때 씁니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 글의 밑줄 친 부분이 의미하는 바로 가장 알맞은 것은 무엇입니까?\n\n' + EXAM,
      steps: [
        '글자 그대로: "모래에 머리를 묻었다" → 시험 이야기에서 말이 되지 않으므로 **속뜻**으로 쓰였습니다.',
        '앞 문장에서 구체적인 상황을 찾습니다: 매일 밤 게임만 함, 걱정하느냐는 물음에 "괜찮을 거야"라고만 함, 교과서도 시험 일정도 보지 않음.',
        '이 상황을 한 줄로 요약하면 "다가오는 시험이라는 문제를 **보려 하지 않고 피했다**"입니다.',
        '그래서 buried his head in the sand는 "문제를 외면했다"는 뜻입니다. (위험을 피하려고 머리를 모래에 묻는다는 타조 이야기에서 나온 표현입니다.)',
      ],
      answer: '다가오는 시험 문제를 외면하고 준비를 미루었다',
    },
    {
      q: '다음 문장에서 비유 표현을 찾아 직유인지 은유인지 밝히고, 속뜻을 말해 보십시오.\n\nWhen I finished the marathon, my legs were as heavy as stones. But my heart was a balloon.',
      steps: [
        '**as heavy as stones**: as ~ as로 다리와 돌을 직접 견주었으므로 **직유**입니다. 공통점은 "무겁다" → 다리가 몹시 무겁고 지쳤다.',
        '**my heart was a balloon**: like·as 없이 "내 마음은 풍선이었다"라고 바로 말했으므로 **은유**입니다.',
        '마음이 진짜 풍선일 수는 없으니 공통점을 찾습니다. 풍선은 가볍게 떠오르고 부풀어 오릅니다 → 마음이 기쁨으로 들뜨고 가벼웠다.',
        'But을 사이에 두고 무거운 다리(몸은 지침)와 가벼운 마음(기쁨)이 대조됩니다.',
      ],
      answer: 'as heavy as stones는 직유(다리가 몹시 무거움), my heart was a balloon은 은유(마음이 기쁨으로 들뜸)',
    },
  ],

  terms: [
    { term: '관용 표현 (idiom)', def: '낱말들이 모여 원래 낱말 뜻과 다른 새 뜻을 갖게 된 표현입니다. 예: a piece of cake(아주 쉬운 일)' },
    { term: '비유', def: '어떤 대상을 그와 닮은 다른 대상에 빗대어 나타내는 표현 방법입니다. 직유와 은유가 대표적입니다.' },
    { term: '직유 (simile)', def: 'like, as ~ as 같은 말로 두 대상을 직접 견주는 비유입니다. 예: as busy as a bee' },
    { term: '은유 (metaphor)', def: '견주는 말 없이 "A는 B이다"처럼 바로 빗대는 비유입니다. 예: Time is money.' },
    { term: '속담 (proverb)', def: '오랜 경험에서 나온 교훈을 짧게 담아 전해 오는 말입니다. 예: Actions speak louder than words.' },
    { term: '글자 그대로의 뜻 (literal meaning)', def: '낱말이 원래 가진 뜻 그대로 읽은 뜻입니다. 예: break the ice → 진짜 얼음을 깨다' },
    { term: '속뜻 (figurative meaning)', def: '비유나 관용 표현으로 쓰여 겉뜻 너머에 담긴 뜻입니다. 예: break the ice → 어색한 분위기를 깨다' },
    { term: '함축 의미', def: '글 속의 표현이 문맥 안에서 실제로 가리키는 숨은 뜻입니다. 밑줄 친 부분의 앞뒤 상황으로 파악합니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '밑줄 친 표현의 뜻으로 알맞은 것은 무엇입니까?\n\nI was worried about the math quiz, but it was __a piece of cake__.',
      choices: ['아주 쉬운 일이었다', '케이크를 상으로 받았다', '시간이 아주 짧았다', '생각보다 어려웠다'],
      answer: 0,
      why: ['', '글자 그대로(케이크 한 조각) 읽었습니다. a piece of cake는 "아주 쉬운 일"이라는 관용 표현입니다.', '퀴즈 시간에 대한 말은 없습니다.', 'but 앞의 "걱정했다"와 반대되는 내용이 와야 합니다. 어려웠다면 but으로 이을 까닭이 없습니다.'],
      explain: '**a piece of cake**는 "식은 죽 먹기", 곧 **아주 쉬운 일**입니다. 걱정했지만(but) 아주 쉬웠다는 흐름입니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '밑줄 친 표현의 뜻으로 알맞은 것은 무엇입니까?\n\nI\'m feeling a little __under the weather__ today, so I\'ll stay home and rest.',
      choices: ['몸이 좀 안 좋은', '날씨 때문에 기분이 좋은', '비를 맞은', '할 일이 많은'],
      answer: 0,
      why: ['', '날씨(weather)라는 낱말에 끌렸습니다. 이 표현은 날씨와 상관없이 몸 상태를 말합니다.', '글자 그대로 "날씨 아래에 있었다"를 떠올렸습니다. 뒤의 "집에서 쉬겠다"가 단서입니다.', '할 일이 많다면 집에서 쉬겠다는 말과 어울리지 않습니다.'],
      explain: '**under the weather**는 **몸이 좀 안 좋은**이라는 관용 표현입니다. 그래서 집에서 쉬겠다(stay home and rest)는 말이 이어집니다.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 1,
      q: '빈칸에 알맞은 낱말을 쓰십시오.\n\nAfter the long hike, I was so tired that I slept like a [[blank]]. (l로 시작하는 낱말, 뜻: 통나무 — "깊이 잠들다"라는 직유)',
      answer: ['log'],
      wrong: [{ a: 'baby', why: 'sleep like a baby(아기처럼 푹 자다)도 쓰는 표현이지만, 문제는 l로 시작하는 "통나무"를 묻고 있습니다.' }, { a: 'rock', why: 'rock은 "바위"입니다. "통나무처럼 자다"는 sleep like a log입니다.' }],
      explain: '**sleep like a log**는 통나무처럼 꼼짝하지 않고 자다, 곧 **깊이 잠들다**는 직유입니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 1,
      q: '다음 가운데 **직유**가 쓰인 문장은 무엇입니까?',
      choices: ['She runs like the wind.', 'I like spicy food.', 'It looks like rain.', 'Time is money.'],
      answer: 0,
      why: ['', '여기서 like는 "좋아하다"라는 동사입니다. 무엇을 빗대지 않았습니다.', 'look like rain은 "비가 올 것 같다"는 뜻으로, 두 대상을 빗댄 비유가 아닙니다.', '견주는 말 없이 "시간은 돈이다"라고 바로 말한 은유입니다.'],
      explain: '**She runs like the wind.**는 그녀가 달리는 모습을 바람에 like로 견준 **직유**입니다(매우 빨리 달린다). like가 있다고 모두 직유는 아닙니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '다음 가운데 **은유**가 쓰인 문장은 무엇입니까?',
      choices: ['My brother is a walking dictionary.', 'She sings like a bird.', 'He is as brave as a lion.', 'The baby\'s skin was as soft as silk.'],
      answer: 0,
      why: ['', 'like로 두 대상을 견주었으므로 직유입니다.', 'as ~ as로 두 대상을 견주었으므로 직유입니다.', 'as ~ as로 두 대상을 견주었으므로 직유입니다.'],
      explain: '**My brother is a walking dictionary.**는 like·as 없이 "형은 걸어 다니는 사전이다"라고 바로 빗댄 **은유**입니다. 속뜻은 "아는 것이 아주 많다"입니다.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 2,
      q: 'During lunch, the cafeteria was a zoo. 는 like를 쓰지 않았으므로 직유가 아니라 은유이다.',
      answer: true,
      explain: '견주는 말(like, as) 없이 "급식실은 동물원이었다"라고 바로 빗댄 **은유**입니다. 속뜻은 "몹시 시끄럽고 어수선했다"입니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '밑줄 친 낱말의 뜻으로 가장 알맞은 것은 무엇입니까?\n\nThe hikers were __famished__. They had not eaten anything for ten hours, and they finished every dish on the table in minutes.',
      choices: ['몹시 배고픈', '몹시 화난', '아주 유명한', '매우 졸린'],
      answer: 0,
      why: ['', '화가 났다는 단서(소리 지름, 다툼)는 없습니다. 열 시간 동안 아무것도 먹지 못했다는 것이 단서입니다.', 'famous(유명한)와 생김새가 비슷해 고른 것 같습니다. 뒤 문장의 상황을 보십시오.', '졸렸다면 음식을 몇 분 만에 다 먹는 모습과 어울리지 않습니다.'],
      explain: '열 시간 동안 아무것도 먹지 않았고(원인), 음식을 몇 분 만에 다 먹었다(결과)는 단서로 famished가 **몹시 배고픈**이라는 뜻임을 짐작할 수 있습니다.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 4,
      q: '다음 속담의 뜻으로 가장 알맞은 것은 무엇입니까?\n\nDon\'t count your chickens before they hatch.',
      choices: ['아직 일어나지 않은 좋은 일을 확실한 것처럼 기대하지 마라.', '동물을 소중히 돌보아라.', '일은 서두르지 말고 천천히 하라.', '작은 것부터 하나씩 세어 아껴라.'],
      answer: 0,
      why: ['', '글자 그대로 병아리(동물)에 대한 말로 읽었습니다. 속담은 생활 장면을 빌려 교훈을 전합니다.', '서두르지 말라는 교훈과 비슷해 보이지만, 핵심은 "결과가 나오기 전에 미리 기대하지 말라"입니다.', '병아리를 "세다(count)"라는 낱말만 보고 고른 것 같습니다.'],
      explain: '알이 깨기도 전에 병아리 수를 세며 들뜨지 말라는 말로, **아직 확실하지 않은 좋은 결과를 미리 기대하지 마라**는 뜻입니다. 우리 속담 "김칫국부터 마시지 마라"와 비슷합니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      hint: '각 속담의 속뜻을 먼저 떠올린 뒤 상황과 맞춰 보십시오.',
      q: '다음 상황에 가장 잘 어울리는 속담은 무엇입니까?\n\nFive students planned the class party together. Each of them kept changing the menu, the music, and the games. In the end, the party was a mess.',
      choices: ['Too many cooks spoil the broth.', 'The early bird catches the worm.', 'Every cloud has a silver lining.', 'When in Rome, do as the Romans do.'],
      answer: 0,
      why: ['', '부지런한 사람이 기회를 얻는다는 뜻입니다. 일찍 준비했다는 내용은 없습니다.', '나쁜 일에도 좋은 면이 있다는 뜻입니다. 파티가 엉망이 된 데서 좋은 점을 찾는 내용은 없습니다.', '그 지역의 풍습을 따르라는 뜻으로, 상황과 관계가 없습니다.'],
      explain: '다섯 명이 저마다 메뉴·음악·놀이를 바꾸다가 파티가 엉망이 되었습니다. **간섭하는 사람이 많으면 일을 망친다**는 **Too many cooks spoil the broth.**가 알맞습니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 0,
      hint: '밑줄 앞에서 분위기가 어떻게 바뀌었는지 보십시오.',
      q: '다음 글의 밑줄 친 부분이 의미하는 바로 가장 알맞은 것은 무엇입니까?\n\n' + CLUB,
      choices: ['어색한 분위기를 풀어 주었다', '동아리 규칙을 깨뜨렸다', '사람들의 휴대 전화를 망가뜨렸다', '동아리 모임을 일찍 끝냈다'],
      answer: 0,
      why: ['', 'break를 "규칙을 어기다"로 읽었습니다. 글에는 규칙을 어긴 내용이 없습니다.', '글자 그대로 무언가를 깨뜨린 장면을 떠올렸습니다. 이야기를 들려준 것이 전부입니다.', '오히려 모두 이야기를 나누기 시작했으므로 모임이 끝난 것이 아닙니다.'],
      explain: '처음에는 아무도 말하지 않고 휴대 전화만 보았지만, 지호의 이야기 뒤 모두 웃으며 이야기를 나누었습니다. **broke the ice**는 **어색한 분위기를 풀었다**는 뜻입니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      hint: 'on the other hand 뒤의 대조 내용이 단서입니다.',
      q: '다음 글의 밑줄 친 부분이 의미하는 바로 가장 알맞은 것은 무엇입니까?\n\n' + GARDEN,
      choices: ['식물을 잘 기르는 재주가 있다', '엄지손가락이 초록색으로 물들었다', '채소를 사는 것을 좋아한다', '환경 보호 운동을 한다'],
      answer: 0,
      why: ['', '글자 그대로 읽었습니다. 뒤 문장은 손가락 색이 아니라 식물이 잘 자란다는 이야기입니다.', '할아버지는 토마토를 사는 것이 아니라 직접 길러 크게 키웁니다.', 'green이 "환경"을 떠올리게 하지만, 글에는 환경 운동에 대한 내용이 없습니다.'],
      explain: '할아버지의 식물은 모두 크고 건강하게 자라고, 대조(on the other hand)되는 "나"의 식물은 한 달 안에 죽습니다. 그래서 **a green thumb**은 **식물을 잘 기르는 재주**라는 뜻입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 5,
      q: '밑줄 친 부분이 의미하는 바로 가장 알맞은 것은 무엇입니까?\n\nWhen the principal walked into the noisy classroom, __you could hear a pin drop__.',
      choices: ['교실이 아주 조용해졌다', '누군가 핀을 떨어뜨렸다', '교실이 더 시끄러워졌다', '교장 선생님이 무언가를 잃어버렸다'],
      answer: 0,
      why: ['', '글자 그대로 읽었습니다. 실제로 핀이 떨어졌다는 말이 아닙니다.', '시끄럽던(noisy) 교실이 교장 선생님이 들어오자 바뀌었다는 흐름입니다. 반대로 읽었습니다.', '무언가를 잃어버렸다는 내용은 없습니다.'],
      explain: '"핀 떨어지는 소리까지 들릴 정도였다", 곧 **교실이 아주 조용해졌다**는 속뜻입니다. 시끄럽던(noisy) 교실이 교장 선생님이 들어오자 조용해진 장면입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 5,
      hint: '밑줄 앞에서 민수가 한 일과 하지 않은 일을 정리해 보십시오.',
      q: '다음 글의 밑줄 친 부분이 의미하는 바로 가장 알맞은 것은 무엇입니까?\n\n' + EXAM,
      choices: [
        '다가오는 문제를 외면하고 피하고 있었다',
        '시험공부를 위해 조용한 곳에 숨어 있었다',
        '밤마다 해변에서 놀며 시간을 보냈다',
        '친구들의 걱정에 화를 내고 있었다',
      ],
      answer: 0,
      why: ['', '조용한 곳에서 공부했다면 교과서를 펴 보지 않았을 리 없습니다. 오히려 공부를 하지 않았습니다.', '글자 그대로 모래(sand)를 떠올렸습니다. 민수는 해변이 아니라 집에서 게임을 했습니다.', '"괜찮을 거야"라고 답했을 뿐 화를 낸 내용은 없습니다.'],
      explain: '민수는 게임만 하고, 걱정하느냐는 물음에 "괜찮을 거야"라고만 하며, 교과서도 일정도 보지 않았습니다. **buried his head in the sand**는 다가오는 시험이라는 **문제를 외면하고 피했다**는 뜻입니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 5,
      hint: '글자 그대로 읽어도 상황에 맞는 문장을 찾으십시오.',
      q: '밑줄 친 표현이 **글자 그대로의 뜻**으로 쓰인 것은 무엇입니까?',
      choices: [
        'The kids __broke the ice__ on the pond with a big stone.',
        'Jiho told a joke to __break the ice__ at the meeting.',
        'Please don\'t __let the cat out of the bag__. It\'s a surprise party.',
        'This designer bag __costs an arm and a leg__.',
      ],
      answer: 0,
      why: ['', '회의(meeting)에 진짜 얼음은 없습니다. 농담으로 어색한 분위기를 풀었다는 속뜻입니다.', '깜짝 파티 이야기이므로 고양이가 아니라 "비밀을 말해 버리지 마라"는 속뜻입니다.', '가방값을 팔다리로 낼 수는 없습니다. "엄청나게 비싸다"는 속뜻입니다.'],
      explain: '연못(pond)의 얼음을 큰 돌로 깬 것은 실제로 일어날 수 있는 일이므로 **글자 그대로의 뜻**입니다. 나머지는 글자 그대로 읽으면 상황에 맞지 않아 모두 속뜻으로 쓰였습니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '다음 글의 내용을 가장 잘 나타내는 속담은 무엇입니까?\n\nEvery week, Dohyun says he will help clean the classroom, but he always leaves early. Sua rarely talks about it, but she stays after school every day to sweep the floor. Our teacher praised Sua at the end of the semester.',
      choices: [
        'Actions speak louder than words.',
        'Don\'t count your chickens before they hatch.',
        'Too many cooks spoil the broth.',
        'Every cloud has a silver lining.',
      ],
      answer: 0,
      why: ['', '결과가 나오기 전에 미리 기대하지 말라는 뜻입니다. 글에는 미리 기대한 사람이 없습니다.', '간섭하는 사람이 많아 일을 망친 내용이 아닙니다.', '나쁜 일 속의 좋은 면에 대한 이야기가 아닙니다.'],
      explain: '말만 하는 도현이와 말없이 실천하는 수아를 대조하고, 칭찬은 수아가 받았습니다. **말보다 행동이 중요하다**는 **Actions speak louder than words.**가 알맞습니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      hint: 'Unlike가 어떤 관계를 알려 주는 신호인지 생각하십시오.',
      q: '밑줄 친 낱말의 뜻으로 가장 알맞은 것은 무엇입니까?\n\nUnlike his talkative sister, Junho is __taciturn__. He rarely says more than a few words, even to his close friends.',
      choices: ['말수가 적은', '말이 많은', '친구가 많은', '목소리가 큰'],
      answer: 0,
      why: ['', 'Unlike(~와 달리)는 반대 관계의 신호입니다. 말이 많은 것은 누나(talkative sister)의 특징입니다.', '친구에 대한 내용은 친한 친구에게도 말을 적게 한다는 것뿐입니다.', '목소리 크기에 대한 단서는 없습니다.'],
      explain: '**Unlike**(~와 달리)는 대조의 단서입니다. 말이 많은(talkative) 누나와 반대이고, 뒤 문장에서 "친한 친구에게도 몇 마디 이상 거의 하지 않는다"고 했으므로 taciturn은 **말수가 적은**이라는 뜻입니다.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 2,
      hint: '벌집에 사는 벌들이 어떤 모습인지 떠올리고, 뒤 문장의 학생들 모습과 비교하십시오.',
      q: '다음 글의 밑줄 친 은유가 나타내는 교실의 모습으로 가장 알맞은 것은 무엇입니까?\n\n' + FESTIVAL,
      choices: [
        '많은 학생이 각자 바쁘게 일하고 있었다',
        '벌이 날아 들어와 위험했다',
        '학생들이 단 음식을 나누어 먹고 있었다',
        '아무도 없이 텅 비어 있었다',
      ],
      answer: 0,
      why: ['', '글자 그대로 진짜 벌을 떠올렸습니다. 뒤 문장에는 벌이 아니라 일하는 학생들이 나옵니다.', '벌집에서 꿀을 떠올렸지만, 글에는 음식을 먹는 내용이 없습니다.', '학생들이 칠하고, 연습하고, 풍선을 다는 모습과 반대입니다.'],
      explain: '벌집(beehive)은 수많은 벌이 쉬지 않고 저마다 일하는 곳입니다. 뒤 문장의 간판을 칠하고, 노래를 연습하고, 풍선을 다는 학생들의 모습이 그 공통점입니다. 그래서 **많은 학생이 각자 바쁘게 일하는 교실**을 나타낸 은유입니다.',
    },
  ],

  deeper: [
    {
      title: '관용 표현은 어디서 왔을까',
      body: '관용 표현 가운데에는 유래가 전해 오는 것이 있습니다. 다만 유래에 관한 이야기는 여러 설이 있는 경우가 많아, 뜻을 익히는 실마리 정도로 보면 좋습니다.\n\n- **break the ice**: 겨울에 얼어붙은 강의 얼음을 깨 배가 지나갈 길을 연다는 데서, "처음 만나는 사람들 사이의 굳은 분위기를 풀다"는 뜻이 되었다고 합니다.\n- **bury one\'s head in the sand**: 타조가 위험을 만나면 모래에 머리를 묻는다는 옛이야기에서 나왔습니다. 실제 타조는 그렇게 하지 않는다고 알려져 있지만, 표현은 "문제를 외면하다"는 뜻으로 굳어졌습니다.\n- **once in a blue moon**: 오늘날 blue moon은 한 달에 보름달이 두 번 뜨는 드문 일을 가리키기도 합니다. 그만큼 드물다는 느낌으로 "아주 드물게"라는 뜻으로 씁니다. (표현의 정확한 유래는 여러 설이 있습니다.)\n\n이처럼 표현의 유래가 사실과 다르더라도, 언어에서는 **사람들이 그 표현을 어떤 뜻으로 쓰는가**가 뜻을 정합니다.',
    },
    {
      title: '같은 동물, 다른 이미지',
      body: '비유에 쓰이는 동물의 이미지는 문화마다 다를 수 있습니다. 영어에서 **owl**(올빼미)은 a wise old owl처럼 지혜를 떠올리게 하고, 밤늦게까지 깨어 있는 사람을 **night owl**이라고 부릅니다.\n\n또 영어의 **as busy as a bee**와 우리말의 "개미처럼 부지런하다"처럼, 같은 뜻을 나타내는 데 서로 다른 동물을 쓰기도 합니다.\n\n그래서 영어 비유를 읽을 때는 우리말의 느낌을 그대로 옮기지 말고, **글의 문맥**과 그 표현이 영어에서 주로 쓰이는 뜻을 함께 확인해야 합니다. 이것이 이 단원의 목표인 "문화적 배경과 문맥으로 속뜻 짐작하기"입니다.',
    },
  ],

  faq: [
    {
      q: '관용 표현은 다 외워야 해요?',
      a: '자주 쓰는 것은 외워 두면 좋지만, 모든 표현을 외울 수는 없습니다. 처음 보는 표현은 ① 글자 그대로 읽어 상황에 맞는지 보고, ② 맞지 않으면 앞뒤 문장에서 그 표현이 가리키는 상황을 찾아 뜻을 짐작합니다. 시험의 함축 의미 문제도 대부분 문맥 속에 답의 단서가 있습니다.',
    },
    {
      q: '직유랑 은유는 어떻게 구별해요?',
      a: '두 대상을 견주는 말(**like**, **as ~ as**)이 있으면 직유, 없이 "A is B"처럼 바로 빗대면 은유입니다. She is like a sunflower. (직유) / She is a sunflower. (은유) 다만 like가 "좋아하다"나 "~할 것 같다"로 쓰이면 비유가 아닙니다.',
    },
    {
      q: '함축 의미 문제에서 자꾸 틀려요.',
      a: '선택지 가운데 밑줄 친 낱말을 **글자 그대로 옮긴 것**이 함정인 경우가 많습니다. 밑줄의 앞뒤 문장에서 그 표현이 가리키는 구체적인 상황(누가 무엇을 했나)을 먼저 한 줄로 요약하고, 그 요약과 같은 뜻의 선택지를 고르십시오.',
    },
  ],

  mistakes: [
    '관용 표현을 낱말 뜻 그대로 해석하는 실수 — It\'s a piece of cake는 "케이크 한 조각"이 아니라 "아주 쉬운 일"입니다. 글자 그대로 읽어 상황에 맞지 않으면 속뜻을 찾습니다.',
    'like가 들어가면 모두 직유라고 생각하는 실수 — I like music(좋아하다), It looks like rain(~할 것 같다)은 비유가 아닙니다. 두 대상을 빗대어 견줄 때만 직유입니다.',
    '함축 의미 문제에서 밑줄 친 낱말과 같은 낱말이 든 선택지를 고르는 실수 — 밑줄 앞뒤의 상황을 요약한 뒤 그 뜻을 담은 선택지를 고릅니다.',
  ],

  gens: [
    {
      id: 'idiom-meaning',
      level: 1,
      title: '문맥 속 관용 표현의 뜻 고르기',
      make: function (R) {
        var items = [
          { id: 'ice', p: 'break the ice', m: '어색한 분위기를 깨다', s: 'On the first day of class, our teacher played a name game to __break the ice__.' },
          { id: 'cake', p: 'a piece of cake', m: '아주 쉬운 일', s: 'Don\'t worry about the vocabulary test. It will be __a piece of cake__ for you.' },
          { id: 'weather', p: 'under the weather', m: '몸이 좀 안 좋은', s: 'Minji felt __under the weather__, so she stayed home from school.' },
          { id: 'books', p: 'hit the books', m: '열심히 공부하다', s: 'Final exams start next Monday, so I need to __hit the books__ this weekend.' },
          { id: 'arm', p: 'cost an arm and a leg', m: '엄청나게 비싸다', s: 'I wanted that camera, but it __costs an arm and a leg__.' },
          { id: 'cat', p: 'let the cat out of the bag', m: '비밀을 무심코 말해 버리다', s: 'We planned a surprise party for Mom, but my little brother __let the cat out of the bag__.' },
          { id: 'moon', p: 'once in a blue moon', m: '아주 드물게', s: 'My cousin lives far away, so we see her only __once in a blue moon__.' },
          { id: 'eye', p: 'see eye to eye', m: '의견이 일치하다', s: 'My sister and I don\'t always __see eye to eye__ about which movie to watch.' },
          { id: 'water', p: 'in hot water', m: '곤경에 빠진', s: 'Junho was __in hot water__ after he broke the classroom window.' },
          { id: 'butterflies', p: 'have butterflies in one\'s stomach', m: '긴장해서 조마조마하다', s: 'I __had butterflies in my stomach__ before my first piano recital.', g: 'nervous' },
          { id: 'feet', p: 'get cold feet', m: '겁이 나서 하려던 일을 망설이다', s: 'Seojun wanted to try the bungee jump, but he __got cold feet__ at the last minute.', g: 'nervous' },
          { id: 'hand', p: 'give ~ a hand', m: '~을 도와주다', s: 'These boxes are heavy. Could you __give me a hand__?' },
          { id: 'cloud', p: 'on cloud nine', m: '몹시 행복한', s: 'Sua was __on cloud nine__ when she heard she had passed the audition.' },
          { id: 'hay', p: 'hit the hay', m: '잠자리에 들다', s: 'It\'s already eleven o\'clock. I\'m going to __hit the hay__.' },
        ];
        var it = R.pick(items);
        var pool = items.filter(function (x) { return x.id !== it.id && !(it.g && x.g === it.g); });
        var others = R.sample(pool, 3);
        var reason = {};
        others.forEach(function (x) { reason[x.m] = '이 뜻(' + x.m + ')을 가진 표현은 ' + x.p + '입니다. 밑줄 친 표현의 앞뒤 상황과 맞지 않습니다.'; });
        var pick = R.choices(it.m, others.map(function (x) { return x.m; }));
        return {
          type: 'choice', concept: 0,
          q: '밑줄 친 표현의 뜻으로 알맞은 것은 무엇입니까?\n\n' + it.s,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === it.m ? '' : reason[c]; }),
          explain: '관용 표현 **' + it.p + '**의 뜻은 "' + it.m + '"입니다. 낱말을 하나씩 해석하지 말고 표현 전체의 뜻으로 읽습니다.',
        };
      },
    },
  ],

  vocab: [
    { w: 'idiom', m: '관용 표현, 숙어', ex: '"Hit the books" is a common English idiom.', exm: '"hit the books"는 흔히 쓰는 영어 관용 표현이다.' },
    { w: 'literal', m: '글자 그대로의', ex: 'The literal meaning of the phrase is different from its real meaning.', exm: '그 표현의 글자 그대로의 뜻은 실제 뜻과 다르다.' },
    { w: 'figurative', m: '비유적인', ex: 'Poems often use figurative language.', exm: '시는 비유적인 표현을 자주 쓴다.' },
    { w: 'simile', m: '직유', ex: '"As busy as a bee" is a simile.', exm: '"벌처럼 바쁜"은 직유이다.' },
    { w: 'metaphor', m: '은유', ex: 'The writer used a metaphor to describe the city.', exm: '작가는 그 도시를 묘사하려고 은유를 썼다.' },
    { w: 'proverb', m: '속담', ex: 'My grandmother often tells me old proverbs.', exm: '할머니는 나에게 옛 속담을 자주 들려주신다.' },
    { w: 'context', m: '문맥, 맥락', ex: 'You can guess the meaning of a word from its context.', exm: '낱말의 뜻은 문맥으로 짐작할 수 있다.' },
    { w: 'imply', m: '넌지시 나타내다, 함축하다', ex: 'Her smile implied that she was happy with the result.', exm: '그녀의 미소는 결과에 만족한다는 것을 넌지시 보여 주었다.' },
    { w: 'compare', m: '비교하다, 비유하다', ex: 'The poet compares life to a river.', exm: '시인은 인생을 강에 비유한다.' },
    { w: 'guess', m: '짐작하다, 추측하다', ex: 'Try to guess the meaning before you check the dictionary.', exm: '사전을 찾기 전에 뜻을 짐작해 보세요.' },
    { w: 'expression', m: '표현', ex: '"A piece of cake" is a useful expression.', exm: '"a piece of cake"는 쓸모 있는 표현이다.' },
    { w: 'culture', m: '문화', ex: 'Proverbs show the culture of a country.', exm: '속담은 한 나라의 문화를 보여 준다.' },
    { w: 'exaggerate', m: '과장하다', ex: 'He exaggerated when he said the fish was as big as a car.', exm: '그 물고기가 자동차만 하다고 했을 때 그는 과장한 것이다.' },
    { w: 'famished', m: '몹시 배고픈', ex: 'I was famished after soccer practice.', exm: '축구 연습 후에 나는 몹시 배가 고팠다.' },
    { w: 'talkative', m: '말이 많은, 수다스러운', ex: 'My talkative friend never stops telling stories.', exm: '말 많은 내 친구는 이야기를 멈추지 않는다.' },
  ],
});
})();
