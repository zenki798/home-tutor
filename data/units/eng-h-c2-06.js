/* 공통영어2 · 과정과 원리 설명하기
 * 지문·예문은 모두 직접 쓴 글이다(가상의 인물). */
(function () {
  // 글 A: 녹차가 만들어지는 과정 (직접 쓴 글)
  var TEA = 'Green tea is made in a few simple steps. First, young tea leaves are picked by hand in spring. Next, they are heated quickly with steam or in a hot pan. This step is important because heat stops the leaves from turning brown. Once the leaves are heated, they are rolled into thin shapes. Finally, the rolled leaves are dried until very little water is left in them. As a result, the tea can be stored for a long time without going bad.';
  // 글 B: 비가 내리는 원리 (직접 쓴 글)
  var RAIN = 'How does rain form? First, the sun heats the water in oceans, lakes, and rivers. Some of the water evaporates, which means it turns into an invisible gas called water vapor. This warm, wet air rises into the sky. As it rises, it cools down. Once the air is cool enough, the water vapor condenses. In other words, it changes from a gas back into tiny drops of liquid water. Millions of these drops gather to form a cloud. When the drops grow too heavy to float in the air, they fall to the ground as rain.';
  // 글 C: 종이 재활용 과정 (직접 쓴 글)
  var PAPER = 'Have you ever wondered what happens to the paper you recycle? First, used paper is collected and taken to a recycling center. There, it is sorted by type. Next, the paper is mixed with water and chopped into a soft, wet mixture called pulp. After that, the ink is removed from the pulp. Then the clean pulp is pressed flat and dried on large hot rollers. Finally, the new paper is rolled up and sent to factories, where it is made into boxes, notebooks, and other products.';

  // 흐름도 그림: 녹차 만드는 과정 4단계
  var FLOW_SVG = '<svg viewBox="0 0 460 90">' +
    '<g fill="none" stroke="currentColor" stroke-width="1.5">' +
    '<rect x="5" y="25" width="90" height="40" rx="6"/>' +
    '<rect x="125" y="25" width="90" height="40" rx="6"/>' +
    '<rect x="245" y="25" width="90" height="40" rx="6"/>' +
    '<rect x="365" y="25" width="90" height="40" rx="6"/>' +
    '<line x1="95" y1="45" x2="118" y2="45"/>' +
    '<line x1="215" y1="45" x2="238" y2="45"/>' +
    '<line x1="335" y1="45" x2="358" y2="45"/>' +
    '</g>' +
    '<g fill="currentColor">' +
    '<polygon points="125,45 117,41 117,49"/>' +
    '<polygon points="245,45 237,41 237,49"/>' +
    '<polygon points="365,45 357,41 357,49"/>' +
    '</g>' +
    '<g fill="currentColor" font-size="13" text-anchor="middle">' +
    '<text x="50" y="16">Step 1</text><text x="170" y="16">Step 2</text><text x="290" y="16">Step 3</text><text x="410" y="16">Step 4</text>' +
    '<text x="50" y="50">pick</text><text x="170" y="50">heat</text><text x="290" y="50">roll</text><text x="410" y="50">dry</text>' +
    '<text x="50" y="84">leaves</text><text x="170" y="84">(steam/pan)</text><text x="290" y="84">thin shapes</text><text x="410" y="84">store</text>' +
    '</g></svg>';

Tutor.registerUnit({
  id: 'eng-h-c2-06',
  course: 'eng-h-c2',
  title: '과정과 원리 설명하기',
  summary: '일이 일어나는 순서와 원리를 순서 표현과 수동태로 설명하고, 흐름도를 활용해 알기 쉽게 전합니다.',
  goals: [
    'First, Next, Once ~, Finally 같은 순서 표현으로 과정의 단계를 차례대로 설명할 수 있다.',
    '수동태(be + 과거분사)를 써서 무엇이 어떻게 처리되는지 설명할 수 있다.',
    'This happens because ~, As a result, ~ 같은 표현으로 원인과 결과, 원리를 설명할 수 있다.',
    '흐름도를 읽고 글로 옮기며, 듣는 사람에 맞게 어려운 용어를 쉬운 말로 풀어 말할 수 있다.',
  ],
  standards: ['[10공영2-02-01]', '[10공영2-02-02]', '[10공영2-02-08]'],

  concepts: [
    {
      title: '순서를 나타내는 표현',
      body: '과정을 설명할 때는 단계마다 **순서를 알려 주는 신호어**를 붙여 듣는 사람이 지금 몇 번째 단계인지 알게 합니다.\n\n' +
        '| 자리 | 표현 | 예 |\n|---|---|---|\n' +
        '| 시작 | First, / First of all, / To begin with, | **First**, the leaves are picked. |\n' +
        '| 중간 | Next, / Then / After that, / Second, Third, | **Next**, they are heated. |\n' +
        '| 앞 단계가 끝난 뒤 | **Once** + 주어 + 동사, / After + 명사(-ing), | **Once** the leaves are heated, they are rolled. |\n' +
        '| 마지막 | Finally, / Lastly, | **Finally**, the leaves are dried. |\n\n' +
        '**Once**는 접속사로 "일단 ~하면, ~하고 나면"이라는 뜻입니다. 앞 단계가 끝나야 다음 단계가 시작된다는 것을 분명히 보여 주므로 과정 설명에 아주 쓸모가 있습니다. 뒤에 반드시 **주어 + 동사**가 옵니다.\n\n' +
        '> ⚠️ **At last**는 "(오래 기다린 끝에) 마침내"라는 감정이 담긴 말이라 단계를 나열할 때의 마지막 단계에는 잘 쓰지 않습니다. 마지막 단계는 Finally나 Lastly로 씁니다.',
      easy: '라면 끓이는 법을 친구에게 알려 준다고 해 봅시다. "**먼저** 물을 끓여. **물이 끓으면** 면과 수프를 넣어. **그다음** 4분 기다려. **마지막으로** 불을 꺼."\n\n' +
        '먼저(First), 그다음(Next, Then), ~하면(Once ~), 마지막으로(Finally)가 바로 순서 신호어입니다. 이 말들만 들어도 단계가 몇 개이고 어디쯤인지 알 수 있습니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n[[빈칸]] the water boils, put the noodles in the pot.',
        choices: ['Once', 'Finally', 'First of all'],
        answer: 0,
        why: ['', 'Finally는 뒤에 쉼표와 문장이 오는 부사입니다. 뒤에 "the water boils, put …"처럼 두 절이 이어지려면 접속사가 필요합니다.', 'First of all은 첫 단계를 알리는 부사구라서 두 절을 이어 주지 못합니다.'],
        explain: '**Once** + 주어 + 동사(the water boils)는 "물이 끓고 나면"이라는 뜻으로, 앞 단계가 끝난 뒤 다음 단계를 한다는 것을 보여 줍니다. Once는 접속사라서 두 절을 이어 줄 수 있습니다.',
      },
    },
    {
      title: '수동태로 과정 설명하기',
      body: '공장이나 자연에서 일어나는 과정을 설명할 때는 **누가 하는지**보다 **무엇이 어떻게 되는지**가 중요합니다. 그래서 **수동태(be + 과거분사)**를 많이 씁니다.\n\n' +
        '- 능동태: Workers **collect** the leaves and **dry** them. (누가 하는지에 초점)\n' +
        '- 수동태: The leaves **are collected and dried**. (잎에 초점)\n\n' +
        '수동태를 쓰면 **처리되는 대상이 계속 주어 자리에** 있어서 글의 흐름이 매끄럽습니다. 녹차 글에서 주어가 leaves → they → they → the rolled leaves로 이어지는 것이 그 예입니다.\n\n' +
        '| 형태 | 예 |\n|---|---|\n' +
        '| be + p.p. | The paper **is sorted** by type. |\n' +
        '| 두 동작 이어 쓰기 | The leaves **are collected and dried**. (be는 한 번만) |\n' +
        '| 조동사 + be + p.p. | The tea **can be stored** for a long time. |\n\n' +
        '행위자(by ~)는 **중요하거나 새로운 정보일 때만** 씁니다. by workers, by people처럼 뻔한 행위자는 빼는 것이 자연스럽습니다. 다만 picked **by hand**(손으로)처럼 방법을 알려 주는 by는 중요한 정보입니다.\n\n' +
        '> ⚠️ be동사를 빠뜨리면 뜻이 바뀝니다. The leaves collected …는 "잎들이 (무언가를) 모았다"는 능동 과거로 읽힙니다.',
      easy: '요리 프로그램 자막을 떠올려 보십시오. "요리사가 양파를 썬다"보다 "양파가 썰린다 → 볶아진다 → 그릇에 담긴다"처럼 **양파를 주인공**으로 놓으면 양파가 어떻게 변하는지 한눈에 보입니다.\n\n' +
        '영어에서 이렇게 "~가 ~되다"라고 말하는 방법이 수동태 **be + 과거분사**입니다. The onions **are cut**. They **are fried**.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nAfter the bottles are washed, they [[빈칸]] into small pieces.',
        choices: ['are cut', 'cut', 'are cutting'],
        answer: 0,
        why: ['', 'be동사가 빠져 "병들이 (무언가를) 자른다"는 능동태가 됩니다. 병은 잘리는 대상입니다.', 'be + -ing는 진행형이라 "병들이 자르고 있다"는 뜻이 됩니다. 병은 스스로 자르지 않습니다.'],
        explain: '병(they)은 **잘리는** 대상이므로 수동태 **are cut**(be + 과거분사)을 씁니다. cut의 과거분사는 cut입니다.',
      },
    },
    {
      title: '원인과 원리 설명하기',
      body: '과정만 늘어놓으면 "왜 그렇게 하는지"를 알 수 없습니다. 좋은 설명은 단계마다 **원리(이유)**와 **결과**를 덧붙입니다.\n\n' +
        '| 무엇을 말하나 | 표현 | 뒤에 오는 것 |\n|---|---|---|\n' +
        '| 원인·이유 | **This happens because** ~ / **This is because** ~ | 원인 (주어 + 동사) |\n' +
        '| 원인·이유 | **because of** / **due to** | 원인 (명사) |\n' +
        '| 결과 | **As a result,** ~ / **so** ~ / **This is why** ~ | 결과 |\n' +
        '| 원리 덧붙이기 | ~, **which causes** … / ~, **which means** … | 앞 내용 때문에 생기는 일·앞 내용의 뜻 |\n\n' +
        '가장 헷갈리는 짝은 **This is because**와 **This is why**입니다.\n\n' +
        '- The leaves are heated. **This is because** heat stops them from turning brown. (뒤에 **원인**)\n' +
        '- Heat stops the leaves from turning brown. **This is why** they are heated. (뒤에 **결과**)\n\n' +
        '> 💡 This is because ~ = "그것은 ~ 때문이다", This is why ~ = "그래서 ~이다". 뒤 문장이 앞 문장의 **이유**인지 **결과**인지 먼저 따져 보십시오.',
      easy: '"우산을 챙겼어. **왜냐하면** 비가 온대." 와 "비가 온대. **그래서** 우산을 챙겼어." 는 같은 이야기를 순서만 바꿔 한 것입니다.\n\n' +
        '영어에서 "왜냐하면"이 This is because, "그래서"가 This is why·As a result입니다. 뒤에 이유가 오면 because, 뒤에 결과가 오면 why·As a result를 고르면 됩니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nThe leaves are dried until very little water is left. [[빈칸]], the tea can be kept for months.',
        choices: ['As a result', 'This is because', 'Because of'],
        answer: 0,
        why: ['', 'This is because 뒤에는 원인이 와야 합니다. "몇 달 보관할 수 있다"는 잎을 말린 결과입니다.', 'Because of 뒤에는 명사가 와야 하고, 뜻도 원인을 이끕니다. 뒤 문장은 결과입니다.'],
        explain: '잎을 바싹 말린 **결과** 차를 몇 달 동안 보관할 수 있게 됩니다. 뒤에 결과가 오므로 **As a result**(그 결과)가 알맞습니다.',
      },
    },
    {
      title: '흐름도·그림을 활용해 설명하기',
      body: '**흐름도(flowchart)**는 과정을 상자와 화살표로 나타낸 그림입니다. 상자 하나가 한 단계이고, **화살표는 "그다음"**을 뜻합니다. 마름모 모양 칸이 있으면 "예/아니요"로 갈라지는 **질문**입니다.\n\n' +
        '흐름도를 글로 옮길 때는 다음 순서를 따릅니다.\n\n' +
        '1. 상자의 낱말(pick, heat …)을 **문장**으로 바꿉니다: pick leaves → The leaves **are picked**.\n' +
        '2. 화살표마다 **순서 신호어**를 붙입니다: First, Next, Once ~, Finally\n' +
        '3. 단계 사이에 **이유**가 필요하면 because, so로 덧붙입니다.\n\n' +
        '그림을 보여 주며 말할 때 자주 쓰는 표현도 알아 둡시다.\n\n' +
        '- **As shown in the diagram**, the leaves are heated in Step 2. (그림에 나온 것처럼)\n' +
        '- **The arrow shows** that the vapor rises. (화살표는 ~을 보여 준다)\n' +
        '- **In the second step**, … / **At this stage**, … (이 단계에서)\n\n' +
        '> 💡 흐름도의 상자에는 보통 동사 원형이나 짧은 명사구만 적혀 있습니다. 글로 바꿀 때 시제·태(수동태)·순서 표현을 채워 넣는 것이 설명하는 사람의 몫입니다.',
      easy: '지하철 노선도를 보면 역(상자)과 선(화살표)만 있어도 어디서 어디로 가는지 알 수 있지요. 흐름도도 같습니다. 상자 = 할 일, 화살표 = 그다음.\n\n' +
        '흐름도를 말로 설명할 때는 상자를 하나씩 손가락으로 짚으며 "먼저 이것, 그다음 이것, 끝으로 이것"이라고 읽어 주면 됩니다.',
      fig: { type: 'svg', svg: FLOW_SVG, alt: '녹차를 만드는 과정 흐름도: Step 1 pick leaves → Step 2 heat (steam/pan) → Step 3 roll into thin shapes → Step 4 dry and store' },
      check: {
        type: 'ox',
        q: '이 카드에서 설명한 흐름도에서, 두 상자 사이의 화살표는 "그다음 단계로 넘어감"을 뜻한다.',
        answer: true,
        explain: '흐름도에서 상자 하나는 한 단계, **화살표는 다음 단계로 넘어감**을 뜻합니다. 글로 옮길 때 화살표 자리에 Next, Then, Once ~ 같은 순서 표현을 넣습니다.',
      },
    },
    {
      title: '듣는 사람에 맞게 어려운 용어 풀어 말하기',
      body: '같은 과정이라도 **누구에게** 설명하느냐에 따라 말이 달라져야 합니다. 과학 용어를 처음 듣는 사람에게는 용어를 쓰되 **바로 뒤에 쉬운 말로 풀어** 줍니다.\n\n' +
        '| 표현 | 예 |\n|---|---|\n' +
        '| **, which means** ~ | Water evaporates**, which means** it turns into a gas. |\n' +
        '| **In other words,** ~ | The vapor condenses. **In other words,** it becomes tiny drops. |\n' +
        '| **, or** ~ (같은 뜻 덧붙이기) | It condenses**, or** turns back into liquid. |\n' +
        '| **called** ~ (이름 붙이기) | a soft mixture **called** pulp |\n' +
        '| **It works like** ~ (비유) | A cloud works like a sponge that gets too full. |\n\n' +
        '풀어 말할 때 지켜야 할 것이 있습니다.\n\n' +
        '- **뜻은 정확하게**: 쉽게 말하려다 틀린 내용을 말하면 안 됩니다. "구름은 연기다"는 쉽지만 틀린 설명입니다.\n' +
        '- **익숙한 예**: 차가운 컵 겉에 맺히는 물방울은 응결(condense)의 좋은 예입니다.\n' +
        '- **짧은 문장**: 어린 학생에게는 한 문장에 한 가지 생각만 담습니다.\n\n' +
        '> 💡 전문가끼리 이야기할 때는 오히려 용어를 그대로 쓰는 것이 정확하고 빠릅니다. "듣는 사람에 맞게"가 핵심입니다.',
      easy: '할머니께 스마트폰 "앱 업데이트"를 설명한다고 생각해 보십시오. "앱 업데이트는, **그러니까** 휴대전화 안의 프로그램을 새것으로 바꾸는 거예요. 옷을 새 옷으로 갈아입는 것처럼요."\n\n' +
        '어려운 말(업데이트) 뒤에 "그러니까 ~"로 풀어 주고, 익숙한 것(옷 갈아입기)에 빗대었지요. 영어의 which means, In other words, It works like가 바로 이 역할을 합니다.',
      check: {
        type: 'choice',
        q: '어려운 용어를 쉬운 말로 풀어 줄 때 쓰는 표현이 **아닌** 것은 무엇입니까?',
        choices: ['As a result,', 'In other words,', ', which means'],
        answer: 0,
        why: ['', 'In other words는 "다시 말해"라는 뜻으로 앞의 말을 쉽게 바꿔 말할 때 씁니다.', ', which means는 "곧 ~라는 뜻이다"라며 앞의 말을 풀어 줄 때 씁니다.'],
        explain: '**As a result**는 "그 결과"라는 뜻으로 결과를 이끄는 표현입니다. In other words와 , which means는 앞의 어려운 말을 다른 말로 풀어 줍니다.',
      },
    },
  ],

  examples: [
    {
      q: '흐름도(pick leaves → heat → roll → dry)를 보고 녹차가 만들어지는 과정을 순서 표현과 수동태를 써서 영어로 설명해 보십시오.',
      fig: { type: 'svg', svg: FLOW_SVG, alt: '녹차를 만드는 과정 흐름도: pick → heat → roll → dry' },
      steps: [
        '첫 상자 pick leaves를 수동태 문장으로 바꾸고 First를 붙입니다: **First**, the young leaves **are picked**.',
        '둘째 상자에는 Next를 붙이고, 이유를 because로 덧붙입니다: **Next**, they **are heated** with steam **because** heat stops them from turning brown.',
        '셋째 단계는 앞 단계가 끝난 뒤 하는 일이므로 Once를 씁니다: **Once** the leaves are heated, they **are rolled** into thin shapes.',
        '마지막 상자에는 Finally를 붙이고, 결과를 As a result로 덧붙입니다: **Finally**, the leaves **are dried**. **As a result**, the tea can be stored for a long time.',
      ],
      answer: 'First, the young leaves are picked. Next, they are heated with steam because heat stops them from turning brown. Once the leaves are heated, they are rolled into thin shapes. Finally, the leaves are dried. As a result, the tea can be stored for a long time.',
    },
    {
      q: '초등학생 동생에게 다음 문장을 쉽게 풀어 설명하려고 합니다. 어떻게 바꾸면 좋을까요?\n\nWater vapor condenses when it cools.',
      steps: [
        '어려운 낱말을 찾습니다: water vapor(수증기), condense(응결하다).',
        '용어를 지우지 말고 바로 뒤에 뜻을 붙입니다: water vapor, **which is water in the form of a gas**',
        'condense는 In other words로 풀어 줍니다: **In other words**, it turns back into tiny drops of water.',
        '익숙한 예를 하나 듭니다: You can see this on the outside of a cold glass on a hot day.',
      ],
      answer: 'Water vapor, which is water in the form of a gas, condenses when it cools. In other words, it turns back into tiny drops of water. You can see this on the outside of a cold glass on a hot day.',
    },
  ],

  terms: [
    { term: '순서 신호어', def: '과정의 단계가 몇 번째인지 알려 주는 말입니다. 예: First, Next, Then, After that, Once ~, Finally' },
    { term: 'Once (접속사)', def: '"일단 ~하면, ~하고 나면"이라는 뜻의 접속사입니다. 뒤에 주어 + 동사가 옵니다. 예: Once the water boils, add the noodles.' },
    { term: '수동태', def: 'be + 과거분사(p.p.)로 "~되다, ~받다"를 나타내는 형태입니다. 과정 설명에서 처리되는 대상을 주어로 둘 때 씁니다. 예: The paper is sorted.' },
    { term: '원리', def: '어떤 일이 왜, 어떻게 일어나는지 설명하는 이치입니다. This happens because ~ 같은 표현으로 밝힙니다.' },
    { term: '흐름도 (flowchart)', def: '과정의 단계를 상자와 화살표로 나타낸 그림입니다. 상자는 단계, 화살표는 다음 단계로의 이동을 뜻합니다.' },
    { term: '풀어 말하기 (paraphrase)', def: '어려운 말을 같은 뜻의 쉬운 말로 바꾸어 말하는 것입니다. In other words, which means 등을 씁니다.' },
    { term: 'This is because / This is why', def: 'This is because 뒤에는 원인, This is why 뒤에는 결과가 옵니다. 예: This is because heat stops browning. / This is why the leaves are heated.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nFirst, put the eggs in cold water. [[빈칸]] the water starts to boil, wait ten minutes.',
      choices: ['Once', 'Finally,', 'First,', 'As a result,'],
      answer: 0,
      why: ['', 'Finally는 마지막 단계에 쓰는 부사라서 뒤의 두 절(the water starts to boil / wait ten minutes)을 이어 주지 못합니다.', 'First는 이미 첫 단계에 썼고, 두 절을 이어 주지 못합니다.', 'As a result는 결과를 이끄는 말이라 뜻도 맞지 않고, 두 절을 이어 주지 못합니다.'],
      explain: '**Once** + 주어 + 동사는 "물이 끓기 시작하면"이라는 뜻의 접속사 표현입니다. 앞 단계(물이 끓는 것)가 끝난 뒤 다음 일(10분 기다리기)을 하라는 흐름입니다.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
      q: '괄호 안의 동사를 알맞은 형태로 바꾸어 빈칸에 쓰십시오. (두 낱말)\n\nAt the recycling center, the paper [[빈칸]] by type. (sort)',
      answer: ['is sorted'],
      wrong: [
        { a: 'sorts', why: '능동태로 쓰면 "종이가 (무언가를) 분류한다"는 뜻이 됩니다. 종이는 분류되는 대상이므로 is sorted로 씁니다.' },
        { a: 'sorted', why: 'be동사가 빠졌습니다. 수동태는 be + 과거분사이므로 is sorted로 씁니다.' },
        { a: 'are sorted', why: '주어 the paper는 셀 수 없는 명사로 단수 취급합니다. be동사는 is를 씁니다.' },
      ],
      explain: '종이는 **분류되는** 대상이므로 수동태 be + 과거분사를 씁니다. 주어 the paper는 단수 취급이므로 **is sorted**입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nOnce the leaves are heated, they [[빈칸]] into thin shapes.',
      choices: ['are rolled', 'roll', 'is rolled', 'are rolling'],
      answer: 0,
      why: ['', '능동태가 되어 "잎들이 (스스로) 만다"는 뜻이 됩니다. 잎은 말리는 대상입니다.', '주어 they는 복수이므로 be동사는 are를 씁니다.', '진행형이 되어 "잎들이 말고 있다"는 뜻이 됩니다. 잎은 스스로 말지 않습니다.'],
      explain: '잎(they)은 **말리는** 대상이므로 수동태를 쓰고, 주어가 복수이므로 **are rolled**입니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nThe warm air cools as it rises. [[빈칸]], the water vapor in it turns into tiny drops.',
      choices: ['As a result', 'This is because', 'In other words', 'First of all'],
      answer: 0,
      why: ['', 'This is because 뒤에는 원인이 옵니다. 물방울이 생기는 것은 공기가 식은 결과입니다.', 'In other words는 앞 문장을 다른 말로 바꿔 말할 때 씁니다. 뒤 문장은 앞 문장을 바꿔 말한 것이 아니라 그 결과입니다.', 'First of all은 첫 단계를 알리는 말입니다. 이미 앞에서 과정이 진행되고 있습니다.'],
      explain: '공기가 식은 **결과** 수증기가 작은 물방울로 바뀝니다. 뒤 문장이 결과이므로 **As a result**(그 결과)가 알맞습니다.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 4,
      q: '"Some of the water evaporates, which means it turns into an invisible gas."에서 which means 뒤의 내용은 evaporate를 쉬운 말로 풀어 준 것이다.',
      answer: true,
      explain: '**, which means** ~ 는 "곧 ~라는 뜻이다"라며 앞의 낱말이나 내용을 풀어 줍니다. evaporate(증발하다)를 "보이지 않는 기체로 바뀐다"로 풀었습니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 0,
      q: '글 A에 따르면, 찻잎을 **가열한 바로 다음에** 하는 일은 무엇입니까?\n\n' + TEA,
      choices: ['잎을 가늘게 만다.', '잎을 손으로 딴다.', '잎을 말린다.', '잎을 갈색으로 만든다.'],
      answer: 0,
      why: ['', '잎을 따는 것은 첫 단계(First)로, 가열보다 앞입니다.', '말리는 것은 마지막 단계(Finally)입니다. 그 사이에 한 단계가 더 있습니다.', '가열은 오히려 잎이 갈색으로 변하는 것을 막습니다(stops the leaves from turning brown).'],
      explain: '**Once the leaves are heated, they are rolled into thin shapes.** — Once(~하고 나면)가 가열 다음 단계가 "가늘게 말기"임을 알려 줍니다. 순서는 따기 → 가열 → 말기(roll) → 말리기(dry)입니다.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 2,
      q: '글 A를 읽고 빈칸에 알맞은 영어 낱말 한 개를 쓰십시오.\n\n' + TEA + '\n\nThe leaves are heated because heat keeps them from turning [[빈칸]].',
      answer: ['brown'],
      wrong: [
        { a: 'green', why: '가열은 잎이 초록색에서 다른 색으로 변하는 것을 막습니다. 어떤 색으로 변하는 것을 막는지 글에서 찾아보십시오.' },
        { a: 'bad', why: 'going bad(상하다)는 마지막 문장의 보관 이야기입니다. 가열하는 이유를 밝힌 문장을 찾아보십시오.' },
      ],
      explain: 'This step is important **because heat stops the leaves from turning brown.** — 가열하는 이유(원리)는 잎이 **갈색으로(brown)** 변하는 것을 막기 위해서입니다. keep A from -ing와 stop A from -ing는 모두 "A가 ~하지 못하게 하다"라는 뜻입니다.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 1,
      q: '우리말에 맞게 영어 표현을 바르게 배열하십시오.\n\n마지막으로, 새 종이는 둘둘 말려 공장으로 보내집니다.',
      choices: ['Finally,', 'the new paper', 'is rolled up', 'and sent', 'to factories'],
      answer: [0, 1, 2, 3, 4],
      hint: '두 동작(말리다, 보내지다)을 수동태로 이을 때 be동사는 한 번만 씁니다.',
      explain: '**Finally, the new paper is rolled up and sent to factories.** is rolled up and (is) sent처럼 수동태 두 개를 and로 이을 때 뒤의 be동사는 생략할 수 있습니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '다음 흐름도의 내용과 **일치하는** 설명은 무엇입니까?\n\n[collect used paper] → [sort it by type] → [mix it with water to make pulp] → [remove the ink] → [press and dry the pulp]',
      choices: [
        'After the paper is sorted, it is mixed with water.',
        'The ink is removed before the paper is mixed with water.',
        'The pulp is pressed and dried before the ink is removed.',
        'The paper is sorted after it is made into pulp.',
      ],
      answer: 0,
      why: [
        '',
        '흐름도에서 잉크 제거는 물과 섞어 펄프를 만든 **다음** 단계입니다.',
        '누르고 말리는 것은 마지막 단계로, 잉크를 없앤 다음입니다.',
        '분류는 펄프를 만들기 **전** 단계입니다. 화살표 방향을 다시 보십시오.',
      ],
      hint: '화살표 방향대로 단계에 번호를 붙여 보십시오.',
      explain: '흐름도 순서는 ① 모으기 → ② 분류하기 → ③ 물과 섞어 펄프 만들기 → ④ 잉크 없애기 → ⑤ 누르고 말리기입니다. ②의 다음이 ③이므로 "분류된 뒤 물과 섞인다"가 맞습니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '여덟 살 동생에게 condense(응결하다)의 뜻을 설명하려고 합니다. 가장 알맞은 설명은 무엇입니까?',
      choices: [
        'It means a gas turns into tiny drops of water, like the drops on a cold glass.',
        'It means water turns into a gas when it gets hot, like steam from a pot.',
        'It means the process of condensation in which vapor changes phase.',
        'It means clouds are made of smoke from the ground.',
      ],
      answer: 0,
      why: [
        '',
        '이것은 evaporate(증발하다)의 설명입니다. condense는 반대로 기체가 액체로 바뀌는 것입니다.',
        '뜻은 맞지만 condensation, vapor, phase 같은 더 어려운 말로 설명해 여덟 살에게는 도움이 되지 않습니다.',
        '쉽지만 틀린 설명입니다. 구름은 연기가 아니라 아주 작은 물방울이 모인 것입니다.',
      ],
      hint: '뜻이 정확한지, 듣는 사람이 알아들을 수 있는지 두 가지를 모두 따져 보십시오.',
      explain: '첫 번째는 **뜻이 정확하고**(기체 → 작은 물방울), **익숙한 예**(차가운 컵에 맺힌 물방울)까지 들어 어린 동생에게 알맞습니다. 쉬운 말로 풀어 말하기는 정확성과 쉬움을 함께 갖춰야 합니다.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'text', concept: 1,
      q: '괄호 안의 말을 이용해 빈칸에 알맞은 말을 쓰십시오. (세 낱말)\n\nIf rice is kept dry, it [[빈칸]] for a long time. (can, store)',
      answer: ['can be stored'],
      wrong: [
        { a: 'can store', why: '능동태로 쓰면 "쌀이 (무언가를) 저장할 수 있다"는 뜻이 됩니다. 쌀은 저장되는 대상이므로 can be stored로 씁니다.' },
        { a: 'can stored', why: '조동사 뒤 수동태는 조동사 + be + 과거분사입니다. be가 빠졌습니다.' },
        { a: 'can be store', why: 'be 뒤에는 과거분사(stored)를 씁니다.' },
      ],
      hint: '조동사가 있는 수동태는 조동사 + be + 과거분사입니다.',
      explain: '쌀은 **저장되는** 대상이므로 수동태를 쓰고, 조동사 can이 있으므로 **can be stored**(조동사 + be + 과거분사)입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 2,
      q: '글 B에 따르면, 구름 속 물방울이 비가 되어 떨어지는 까닭은 무엇입니까?\n\n' + RAIN,
      choices: [
        '물방울이 너무 무거워져 공기 중에 떠 있을 수 없기 때문에',
        '공기가 위로 올라가며 식기 때문에',
        '태양이 바다의 물을 데우기 때문에',
        '수증기가 눈에 보이지 않는 기체이기 때문에',
      ],
      answer: 0,
      why: [
        '',
        '공기가 식는 것은 수증기가 물방울로 바뀌는(응결) 까닭입니다. 비가 떨어지는 까닭은 아닙니다.',
        '태양이 물을 데우는 것은 증발이 일어나는 첫 단계입니다.',
        '수증기가 보이지 않는다는 것은 증발 단계의 설명일 뿐, 비가 떨어지는 까닭과 관계가 없습니다.',
      ],
      explain: '마지막 문장 **When the drops grow too heavy to float in the air, they fall to the ground as rain.**에 답이 있습니다. too ~ to …는 "너무 ~해서 …할 수 없다"는 뜻입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'order', concept: 0,
      q: '씨앗이 싹트는 과정을 설명하는 문장들입니다. 순서 신호어를 단서로 바르게 배열하십시오.',
      choices: [
        'First, the seed takes in water and swells.',
        'Next, a tiny root pushes out and grows down into the soil.',
        'Once the root is in place, a shoot grows up toward the light.',
        'Finally, the first leaves open, and the young plant starts to make its own food.',
      ],
      answer: [0, 1, 2, 3],
      hint: 'Once the root is in place는 "뿌리가 자리를 잡고 나면"이라는 뜻입니다. 뿌리 이야기가 먼저 나와야 합니다.',
      explain: '**First**(씨앗이 물을 흡수해 부푼다) → **Next**(작은 뿌리가 나와 아래로 자란다) → **Once** the root is in place(뿌리가 자리 잡고 나면 싹이 빛 쪽으로 자란다) → **Finally**(첫 잎이 펴지고 스스로 양분을 만든다). Once 문장은 앞 문장에 뿌리가 나와 있어야 자연스럽게 이어집니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '다음 설명에서 원인과 결과를 잇는 말이 **잘못 쓰인** 문장은 무엇입니까?\n\n(A) In winter, salt is spread on icy roads. (B) This is why salt makes it harder for water to freeze. (C) As a result, the ice on the road melts more easily. (D) This is because salty water needs a lower temperature to freeze than pure water.',
      choices: ['(A)', '(B)', '(C)', '(D)'],
      fixed: true,
      answer: 1,
      why: [
        '(A)는 과정(소금을 뿌린다)을 수동태로 바르게 설명한 문장으로, 원인·결과를 잇는 말이 없습니다.',
        '',
        '(C)의 "얼음이 더 쉽게 녹는다"는 소금을 뿌린 결과이므로 As a result가 알맞습니다.',
        '(D)는 소금물이 더 낮은 온도에서 얼기 때문이라는 원인을 밝히므로 This is because가 알맞습니다.',
      ],
      hint: '각 연결어 뒤의 내용이 앞 문장의 원인인지 결과인지 따져 보십시오.',
      explain: '(B)의 "소금은 물이 얼기 어렵게 만든다"는 (A)에서 소금을 뿌리는 **이유(원인)**입니다. 원인을 이끌려면 **This is because**를 써야 하는데 결과를 이끄는 This is why를 썼으므로 어색합니다. (This is because salt makes it harder for water to freeze.)',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '다음 흐름도를 글로 바르게 옮긴 것은 무엇입니까? (◇ 칸은 "예/아니요"로 갈라지는 질문입니다.)\n\n- [empty the plastic bottle] → ◇ Is it clean? ◇\n- ◇ Yes → [put it in the recycling bin]\n- ◇ No → [rinse it with water] → [put it in the recycling bin]',
      choices: [
        'After the bottle is emptied, check whether it is clean. If it is not clean, it should be rinsed before it is put in the bin.',
        'After the bottle is emptied, it should always be rinsed with water and then put in the bin.',
        'If the bottle is clean, it should be rinsed before it is put in the bin.',
        'The bottle is put in the bin first. Then it is emptied and rinsed.',
      ],
      answer: 0,
      why: [
        '',
        '마름모(질문) 칸을 무시했습니다. 깨끗한 병은 헹구지 않고 바로 통에 넣습니다.',
        '"예/아니요" 갈래를 거꾸로 읽었습니다. 헹구는 것은 깨끗하지 않을 때(No)입니다.',
        '화살표 순서를 거꾸로 읽었습니다. 통에 넣는 것은 마지막 단계입니다.',
      ],
      hint: '마름모 칸은 "예/아니요"로 갈라지는 질문입니다. 두 갈래를 모두 글에 담아야 합니다.',
      explain: '병을 비운 뒤(After the bottle is emptied) 깨끗한지 확인하고, **깨끗하지 않을 때만**(If it is not clean) 헹군 다음 통에 넣습니다. 깨끗하면 바로 통에 넣습니다. 흐름도의 갈림길은 글에서 if 절로 옮기면 정확합니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '다음 문장을 초등학교 4학년 학생에게 설명하려고 합니다. 뜻을 바꾸지 않으면서 가장 알맞게 풀어 쓴 것은 무엇입니까?\n\nPlants convert light energy into chemical energy through photosynthesis.',
      choices: [
        'Plants use sunlight to make their own food, which is a kind of sugar. This is called photosynthesis.',
        'Plants eat sunlight through their roots. This is called photosynthesis.',
        'Plants get all of their food from the soil. This is called photosynthesis.',
        'Through photosynthesis, light energy is converted by plants into chemical energy stored in glucose.',
      ],
      answer: 0,
      why: [
        '',
        '쉽지만 틀렸습니다. 식물은 햇빛을 "먹지" 않고, 빛은 주로 잎에서 쓰입니다.',
        '틀린 설명입니다. 광합성의 핵심은 빛을 이용해 스스로 양분을 만드는 것입니다.',
        '뜻은 정확하지만 converted, chemical energy, glucose처럼 더 어려운 말이 남아 있어 4학년에게 알맞지 않습니다.',
      ],
      hint: '"정확한가?"와 "알아들을 수 있는가?"를 둘 다 만족하는 것을 고르십시오.',
      explain: '첫 번째는 빛 에너지를 화학 에너지로 바꾼다는 것을 "햇빛으로 자기 양분(당)을 만든다"로 **정확하게** 풀고, 용어 photosynthesis는 지우지 않고 **이름으로 알려 줍니다**(This is called ~). 풀어 말하기는 뜻을 바꾸지 않는 것이 먼저입니다.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'text', concept: 1,
      q: '괄호 안의 말을 이용해 빈칸에 알맞은 말을 쓰십시오. (두 낱말)\n\nThe tea leaves must [[빈칸]] before they grow too big and hard. (pick)',
      answer: ['be picked'],
      wrong: [
        { a: 'picked', why: '조동사 must 뒤에는 동사원형이 옵니다. 수동태이므로 be + 과거분사(be picked)로 씁니다.' },
        { a: 'pick', why: '능동태가 되어 "찻잎이 (무언가를) 따야 한다"는 뜻이 됩니다. 찻잎은 따지는 대상입니다.' },
        { a: 'be pick', why: 'be 뒤에는 과거분사(picked)를 씁니다.' },
      ],
      hint: '찻잎은 "따는" 쪽입니까, "따지는" 쪽입니까? 조동사 뒤 수동태의 꼴을 떠올리십시오.',
      explain: '찻잎은 **따지는** 대상이므로 수동태이고, 조동사 must 뒤에는 원형 be가 와서 **must be picked**(조동사 + be + 과거분사)가 됩니다. "찻잎은 너무 크고 질겨지기 전에 따야 한다."',
    },
  ],

  deeper: [
    {
      title: '같은 과정, 두 가지 말투: 명령문과 수동태',
      body: '과정을 영어로 쓰는 방법은 크게 두 가지입니다.\n\n' +
        '| 글의 종류 | 주로 쓰는 형태 | 예 |\n|---|---|---|\n' +
        '| 요리법·사용 설명서 (독자가 직접 따라 함) | **명령문** | **Pick** the leaves. **Heat** them for one minute. |\n' +
        '| 과학 설명문·공정 소개 (독자는 이해만 함) | **수동태** | The leaves **are picked**. They **are heated** for one minute. |\n\n' +
        '독자가 직접 해야 하는 일이면 명령문이 짧고 분명합니다. 독자가 "어떻게 만들어지는지" 이해하기만 하면 되는 글이라면 수동태가 대상(잎, 종이)에 초점을 맞춰 줍니다. 그래서 같은 녹차 이야기도 다도 교실 안내문과 백과사전에서는 문장 모양이 다릅니다.\n\n' +
        '과정을 설명하는 글을 쓰기 전에 "이 글을 읽는 사람은 따라 할 사람인가, 이해할 사람인가?"를 먼저 정해 보십시오.',
    },
    {
      title: '좋은 설명의 세 가지 점검',
      body: '과정과 원리를 설명한 뒤 스스로 다음 세 가지를 점검해 보십시오.\n\n' +
        '1. **순서**: 단계마다 순서 신호어가 있는가? 단계를 빠뜨리거나 뒤바꾸지 않았는가? 흐름도를 그려 보면 금방 드러납니다.\n' +
        '2. **이유**: "왜 그 단계가 필요한가?"에 답하는 문장(because, This is because ~)이 하나 이상 있는가? 과정만 있고 원리가 없으면 듣는 사람은 외울 수는 있어도 이해하지는 못합니다.\n' +
        '3. **눈높이**: 듣는 사람이 모를 낱말을 풀어 주었는가? 반대로, 이미 아는 사람에게 너무 길게 풀어서 지루하지 않은가?\n\n' +
        '이 점검법은 영어 발표뿐 아니라 과학 보고서, 국어 설명문 쓰기에도 그대로 쓸 수 있습니다.',
    },
  ],

  faq: [
    {
      q: 'Once랑 When은 뭐가 달라요?',
      a: '둘 다 접속사로 뒤에 주어 + 동사가 오고, 뜻도 비슷합니다. 다만 Once는 "일단 ~하고 나면"이라는 뜻이 강해서 **앞 단계가 완전히 끝나야** 다음 단계로 간다는 느낌을 줍니다. 그래서 과정 설명에서 단계 사이의 조건을 분명히 할 때 Once를 즐겨 씁니다. Once the leaves are heated, … = "잎이 다 가열되고 나면, …"',
    },
    {
      q: '과정을 설명할 때 왜 수동태를 많이 써요?',
      a: '과정 설명에서는 "누가" 하는지보다 "무엇이 어떻게 되는지"가 중요하기 때문입니다. 수동태를 쓰면 처리되는 대상(leaves, paper)이 계속 주어 자리에 있어서 흐름이 매끄럽고, 뻔한 행위자(workers, machines)를 반복하지 않아도 됩니다.',
    },
    {
      q: 'This is why랑 This is because가 자꾸 헷갈려요.',
      a: '뒤에 오는 내용을 보십시오. 뒤가 **이유(원인)**면 This is because, 뒤가 **결과**면 This is why입니다. 우리말로 바꿔 "그것은 ~ 때문이다"가 자연스러우면 because, "그래서 ~이다"가 자연스러우면 why입니다.',
    },
  ],

  mistakes: [
    '원인을 이끌면서 This is why를 쓰는 실수 — This is why 뒤에는 결과, This is because 뒤에는 원인이 옵니다.',
    '수동태에서 be동사를 빠뜨려 The leaves collected and dried.처럼 쓰는 실수 — 능동 과거로 읽혀 뜻이 바뀝니다. The leaves are collected and dried.로 씁니다.',
    '쉽게 설명하려다 뜻을 틀리게 바꾸는 실수 — "구름은 연기다"처럼 쉬운데 틀린 설명은 안 됩니다. 정확성이 먼저입니다.',
  ],

  vocab: [
    { w: 'process', m: '과정; 처리하다', ex: 'Making paper is a long process.', exm: '종이를 만드는 것은 긴 과정입니다.' },
    { w: 'step', m: '단계; 걸음', ex: 'The first step is to wash your hands.', exm: '첫 단계는 손을 씻는 것입니다.' },
    { w: 'collect', m: '모으다, 수거하다', ex: 'Used bottles are collected every Monday.', exm: '다 쓴 병은 월요일마다 수거됩니다.' },
    { w: 'sort', m: '분류하다', ex: 'We sort the trash into paper, plastic, and cans.', exm: '우리는 쓰레기를 종이, 플라스틱, 캔으로 분류합니다.' },
    { w: 'remove', m: '없애다, 제거하다', ex: 'The ink is removed with soap and water.', exm: '잉크는 비누와 물로 제거됩니다.' },
    { w: 'store', m: '저장하다, 보관하다', ex: 'Dried fruit can be stored for months.', exm: '말린 과일은 몇 달 동안 보관할 수 있습니다.' },
    { w: 'heat', m: '가열하다; 열', ex: 'The milk is heated slowly in a pot.', exm: '우유는 냄비에서 천천히 데워집니다.' },
    { w: 'evaporate', m: '증발하다', ex: 'The puddle evaporated in the afternoon sun.', exm: '오후 햇볕에 웅덩이 물이 증발했습니다.' },
    { w: 'condense', m: '응결하다(기체가 액체로 되다)', ex: 'Steam condenses on the cold window.', exm: '김이 차가운 창문에 응결합니다.' },
    { w: 'vapor', m: '증기, 수증기', ex: 'Water vapor is a gas you cannot see.', exm: '수증기는 눈에 보이지 않는 기체입니다.' },
    { w: 'flowchart', m: '흐름도', ex: 'This flowchart shows how a bill becomes a law.', exm: '이 흐름도는 법안이 법이 되는 과정을 보여 줍니다.' },
    { w: 'diagram', m: '도표, 도해(그림)', ex: 'Look at the diagram of the heart on page 20.', exm: '20쪽에 있는 심장 그림을 보십시오.' },
    { w: 'principle', m: '원리', ex: 'A bicycle pump works on a simple principle.', exm: '자전거 펌프는 간단한 원리로 작동합니다.' },
    { w: 'result', m: '결과; (~의 결과로) 생기다', ex: 'As a result, the ice melted quickly.', exm: '그 결과 얼음이 빨리 녹았습니다.' },
    { w: 'in other words', m: '다시 말해, 즉', ex: 'The plant is dormant. In other words, it is resting.', exm: '그 식물은 휴면 상태입니다. 다시 말해 쉬고 있는 것입니다.' },
  ],
});
})();
