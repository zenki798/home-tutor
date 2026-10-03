/* 대학 영어: 문법과 독해 · 학술 독해 전략
 * 지문·표·그래프는 모두 직접 쓴 글과 가상의 자료다(실제 통계가 아니다). 실제 논문·교재의 문장을 옮기지 않았다.
 * 영어 낱말 바로 뒤에는 조사를 붙이지 않는다(낱말 뒤에 '쪽·꼴·문장·표현' 같은 우리말을 둔다). */
(function () {
  // 가상의 자료: 한 도시의 연간 자전거 이용자 수(천 명)
  var BIKE_FIG = { type: 'line', labels: ['2019', '2020', '2021', '2022', '2023'], values: [40, 45, 60, 58, 58], unit: '천 명', title: '가상의 자료: 한 도시의 자전거 이용자 수', alt: '2019년 40, 2020년 45, 2021년 60, 2022년 58, 2023년 58(천 명)을 이은 꺾은선그래프' };
  // 훑어 읽기용 글
  var FOREST = 'Urban Forests and Summer Heat\n\nCities are often several degrees warmer than the countryside around them, especially on summer afternoons. This difference is caused mainly by roads and buildings, which absorb heat during the day and release it slowly at night.\n\nTrees can reduce this effect in two ways. Their leaves block sunlight before it reaches the ground, and the water that evaporates from them cools the air. In one hypothetical neighborhood study, streets with many trees were about 3 degrees cooler at 3 p.m. than streets with none.\n\nFor these reasons, many city planners now treat trees not as decoration but as part of the city\'s basic equipment for dealing with heat.';
  // 개요 정리용 글
  var WATER = 'Cities can save water in three main ways. First, they can repair leaking pipes, which in some cities lose a large share of clean water before it reaches homes. Second, they can encourage residents to use less water, for example by charging lower prices to households that use little. Finally, they can reuse treated wastewater to water parks and to cool machines in factories.';

Tutor.registerUnit({
  id: 'eng-u-grammar-08',
  course: 'eng-u-grammar',
  title: '학술 독해 전략',
  summary: '훑어 읽기와 찾아 읽기, 문맥으로 어휘 추론하기, 메모하며 읽기로 긴 전공 글을 효율적으로 읽습니다.',
  goals: [
    '목적에 따라 훑어 읽기(skimming)와 찾아 읽기(scanning)를 골라 쓸 수 있다.',
    '정의·바꿔 말하기·대조·예시 단서와 낱말의 구성으로 낯선 전공 어휘의 뜻을 추론할 수 있다.',
    'i.e., e.g., refers to 같은 신호와 그래프·표를 설명하는 문장을 정확히 해석할 수 있다.',
    '여백 메모와 개요로 긴 글의 핵심과 세부를 위계 있게 정리할 수 있다.',
  ],
  standards: [],

  concepts: [
    {
      title: '훑어 읽기와 찾아 읽기 (skimming · scanning)',
      body: '전공 글을 처음부터 끝까지 같은 속도로 읽을 필요는 없습니다. **읽는 목적**에 따라 방법을 고릅니다.\n\n' +
        '| | 훑어 읽기 (skimming) | 찾아 읽기 (scanning) |\n|---|---|---|\n' +
        '| 목적 | 글 전체의 **요지·구성** 파악 | **특정 정보**(수치·이름·날짜·핵심어) 찾기 |\n' +
        '| 읽는 곳 | 제목·소제목, 각 문단의 첫 문장, 마지막 문단, 굵은 글씨, 그림·표 설명 | 찾는 정보가 있을 만한 곳만 |\n' +
        '| 방법 | 세부는 건너뛰고 뼈대만 빠르게 | 찾는 낱말·숫자의 **모양**을 머리에 두고 눈으로 훑다가 멈춤 |\n' +
        '| 언제 | 읽을 가치가 있는지 판단할 때, 꼼꼼히 읽기 전에 지도를 그릴 때 | 과제의 질문에 답할 자료를 찾을 때 |\n\n' +
        '훑어 읽기가 가능한 까닭은 앞 단원에서 본 것처럼 학술 글의 **구조가 예측 가능**하기 때문입니다. 주제문은 대개 문단 앞에, 논지는 서론 끝에, 정리는 결론에 있습니다.\n\n' +
        '> 💡 찾아 읽기를 할 때는 찾는 말을 **다른 꼴로도** 떠올려 두십시오. "2019년 수치"를 찾는다면 2019 숫자뿐 아니라 that year, the previous year 같은 표현도 단서가 됩니다.',
      easy: '신문을 펼쳤을 때를 생각해 보십시오. 오늘 무슨 일이 있었는지 알고 싶으면 **큰 제목만 죽 훑어봅니다**(훑어 읽기). 반대로 내일 날씨만 알고 싶으면 날씨 칸을 찾아 **기온 숫자에서 눈을 멈춥니다**(찾아 읽기).\n\n' +
        '둘 다 "모든 글자를 다 읽지 않는" 읽기지만, 하나는 **큰 그림**을, 다른 하나는 **한 점**을 찾습니다.',
      check: {
        type: 'choice',
        q: '긴 보고서에서 "2019년의 전기 사용량" 수치 하나만 빨리 확인하려고 합니다. 가장 알맞은 읽기 방법은 무엇입니까?',
        choices: ['처음부터 끝까지 꼼꼼히 읽기', '찾아 읽기(scanning)', '훑어 읽기(skimming)'],
        answer: 1,
        why: [
          '수치 하나를 찾는 데 글 전체를 꼼꼼히 읽는 것은 시간이 너무 듭니다.',
          '',
          '훑어 읽기는 글 전체의 요지를 파악하는 방법입니다. 특정 수치를 찾는 데는 찾아 읽기가 알맞습니다.',
        ],
        explain: '**특정 정보**(2019, 전기 사용량)를 찾는 것이 목적이므로 **찾아 읽기**입니다. 2019 숫자와 electricity, energy 같은 낱말의 모양을 머리에 두고 훑다가 그곳에서 멈춰 읽습니다.',
      },
    },
    {
      title: '문맥으로 낯선 전공 어휘의 뜻 추론하기',
      body: '전공 글에는 사전 없이 처음 보는 낱말이 계속 나옵니다. 모든 낱말을 찾아보는 대신 **문맥 단서**로 뜻을 짐작하며 읽어 나갑니다.\n\n' +
        '| 단서의 종류 | 신호 | 예 (굵은 낱말의 뜻을 추론) |\n|---|---|---|\n' +
        '| 정의 | is defined as, refers to, means | **Erosion** refers to the wearing away of soil by wind or water. |\n' +
        '| 바꿔 말하기 | or, that is, 쉼표·괄호 | the **larvae**, or young insects, … |\n' +
        '| 대조 | unlike, whereas, but, instead of | Unlike **nocturnal** animals, squirrels are active during the day. → 밤에 활동하는 |\n' +
        '| 예시 | such as, for example, including | **Legumes** such as beans and peas … → 콩류 |\n' +
        '| 원인·결과 | because, so, as a result | The soil was **arid**, so few plants could grow without river water. → 메마른 |\n\n' +
        '문맥 단서가 없으면 **낱말의 구성**을 봅니다. 영어 전공 어휘는 고대 그리스어·라틴어에서 온 부분이 많습니다.\n\n' +
        '| 부분 | 뜻 | 예 |\n|---|---|---|\n' +
        '| bio- | 생명 | biology, biodiversity |\n' +
        '| hydro- | 물 | hydroelectric |\n' +
        '| -logy | ~학 | geology, ecology |\n' +
        '| un-, in-, non- | 부정 | unstable, invisible, nonverbal |\n' +
        '| -able, -ible | ~할 수 있는 | renewable, flexible |\n\n' +
        '> ⚠️ 추론한 뜻은 **잠정적인 뜻**입니다. 그 낱말이 글의 핵심어(제목에 있거나 여러 번 나오는 말)라면 뒤에서 전공 사전이나 용어집으로 확인하십시오.',
      easy: '처음 보는 사람이 친구 무리에 끼어 있을 때, 우리는 그 사람이 무엇을 하고 누구와 이야기하는지 보고 "아, 저 사람은 축구부구나" 하고 짐작합니다.\n\n' +
        '낯선 낱말도 마찬가지입니다. 낱말 자체를 노려보기보다 **그 낱말 주변**(앞뒤 문장, unlike·such as·so 같은 신호)을 보면 어떤 뜻인지 대부분 짐작할 수 있습니다.',
      check: {
        type: 'choice',
        q: '굵은 낱말의 뜻으로 가장 알맞은 것은 무엇입니까?\n\nThe soil was **arid**, so few plants could grow there without water from the river.',
        choices: ['비옥한', '물에 잠긴', '메마른'],
        answer: 2,
        why: [
          '땅이 비옥하다면 강물 없이도 식물이 잘 자랄 것입니다. so 뒤의 결과(식물이 거의 자라지 못함)와 맞지 않습니다.',
          '물에 잠긴 땅이라면 강물이 없어서 식물이 못 자란다는 결과가 어색합니다.',
          '',
        ],
        explain: 'so(그래서) 뒤의 결과 "강물이 없으면 식물이 거의 자랄 수 없다"에서 거꾸로 추론하면 땅에 물기가 없다는 뜻입니다. arid 낱말의 뜻은 **메마른, 건조한**입니다.',
      },
    },
    {
      title: '정의·예시·부연 신호: i.e., e.g., refers to',
      body: '학술 글은 낯선 개념을 소개할 때 **정의·예시·부연**의 신호를 함께 씁니다. 신호를 알면 그 뒤에 무엇이 올지 예측할 수 있습니다.\n\n' +
        '| 신호 | 뜻 | 뒤에 오는 것 |\n|---|---|---|\n' +
        '| i.e. (= that is) | 즉, 다시 말해 | 앞의 말을 **정확히 바꿔 말한 것**(전부) |\n' +
        '| e.g. (= for example) | 예를 들어 | 앞의 말에 해당하는 **예 몇 개**(일부) |\n' +
        '| refers to, is defined as, means | ~을 가리킨다, ~로 정의된다 | **정의** |\n' +
        '| known as, called | ~로 알려진, ~라고 불리는 | 개념의 **이름** |\n' +
        '| in other words, that is to say | 다시 말해 | 쉬운 말로 **부연** |\n' +
        '| such as, including | ~ 같은, ~을 포함하여 | **예** |\n\n' +
        '- Mammals that live in the sea, **e.g.**, whales and dolphins, breathe air. (바다 포유류의 예 둘 — 전부가 아님)\n' +
        '- The study used a small sample, **i.e.**, only twelve participants. (작은 표본 = 정확히 12명)\n' +
        '- **Biodiversity refers to** the variety of living things in an area. (정의)\n\n' +
        'i.e. 줄임말은 라틴어 id est(그것은 ~이다), e.g. 줄임말은 exempli gratia(예를 들면)에서 왔습니다. 쉼표·괄호·줄표(—) 안에 든 말도 앞말을 풀어 주는 부연인 경우가 많습니다.\n\n' +
        '> ⚠️ i.e. 뒤의 목록은 **그것이 전부**이고, e.g. 뒤의 목록은 **일부 예**입니다. 이 차이로 정답이 갈리는 문제가 많습니다.',
      easy: '친구가 "우리 반 반장, **즉** 지아가 발표할 거야."라고 하면 반장과 지아는 **같은 사람**입니다. 이것이 i.e.입니다.\n\n' +
        '"과일, **예를 들어** 사과나 배를 가져와."라고 하면 사과와 배는 과일의 **몇 가지 예**일 뿐, 귤을 가져와도 됩니다. 이것이 e.g.입니다.\n\n' +
        'i.e. → "곧 그것", e.g. → "이를테면 이런 것들"로 기억하십시오.',
      check: {
        type: 'ox',
        q: '다음 문장에서 e.g. 뒤에 나온 oranges and lemons 부분은 감귤류 과일의 **전부**를 나열한 것이다.\n\nCitrus fruits, e.g., oranges and lemons, are rich in vitamin C.',
        answer: false,
        explain: 'e.g. 줄임말은 "예를 들어"라는 뜻이므로 그 뒤에는 **몇 가지 예**만 옵니다. 감귤류에는 귤, 라임, 자몽 등도 있습니다. 전부를 정확히 바꿔 말할 때는 i.e. 줄임말을 씁니다.',
      },
    },
    {
      title: '그래프·표를 설명하는 문장 읽기',
      body: '연구 글은 그래프·표의 내용을 문장으로 다시 설명합니다. 이런 문장은 **변화의 방향 + 정도 + 수치 + 기간**으로 짜입니다.\n\n' +
        '| 무엇을 | 표현 |\n|---|---|\n' +
        '| 오르다 / 내리다 | rise, increase, grow, climb / fall, drop, decline, decrease |\n' +
        '| 정도 | sharply·dramatically(급격히), steadily·gradually(꾸준히), slightly(조금) |\n' +
        '| 멈춤·정점 | remain stable, level off(제자리에 머물다), peak at(최고점에 이르다) |\n' +
        '| 비중 | account for 40% of, make up half of, the largest share |\n' +
        '| 기간 | between 2019 and 2023, over the period, by 2022 |\n\n' +
        '전치사 하나로 수치의 뜻이 바뀌니 주의합니다.\n\n' +
        '- Prices rose **by** 20 percent. → **변화량**이 20퍼센트\n' +
        '- Prices rose **to** 20 percent. → 변화 **뒤의 값**이 20퍼센트\n' +
        '- The share rose from 20 percent to 30 percent. → 10 **percentage points** 올랐다(퍼센트포인트). 같은 변화를 비율로 말하면 **50 percent** 늘었다.\n\n' +
        '그래프의 예(가상의 자료): The number of cyclists **rose sharply** between 2020 and 2021 and then **remained** almost **stable**.\n\n' +
        '> 💡 그래프를 설명하는 문장을 읽을 때는 문장의 수치를 그래프에서 직접 찾아 손가락으로 짚어 보십시오. 방향·정도·기간 가운데 하나라도 어긋나면 틀린 설명입니다.',
      easy: '키 재기 기록표를 생각해 보십시오. "키가 **5 cm만큼** 컸다"(by)와 "키가 **150 cm까지** 컸다"(to)는 전혀 다른 말입니다.\n\n' +
        '그래프 설명도 같습니다. 선이 가파르게 올라가면 sharply, 천천히 올라가면 gradually, 평평하면 remained stable. 선의 모양을 말로 옮긴 것뿐입니다.',
      fig: BIKE_FIG,
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇입니까?\n\nThe price of the ticket rose ___ 20 percent, from 50,000 won to 60,000 won.',
        choices: ['to', 'at', 'by'],
        answer: 2,
        why: [
          'to 20 percent 꼴은 "20퍼센트**까지**"라는 도달값입니다. 가격은 원 단위이므로 퍼센트에 "도달"할 수 없습니다.',
          'at 낱말은 변화의 크기를 나타내지 않습니다.',
          '',
        ],
        explain: '50,000원에서 60,000원으로 10,000원 올랐고, 이는 처음 값의 20퍼센트입니다. **변화량**을 나타내므로 **by** 20 percent 꼴입니다.',
      },
    },
    {
      title: '메모하며 읽기와 개요 정리',
      body: '긴 전공 글은 읽으면서 **표시하고 메모해야** 다 읽은 뒤에도 남습니다.\n\n' +
        '**여백 메모(annotation)**의 기본은 다음과 같습니다.\n\n' +
        '1. 논지와 각 문단의 주제문에만 밑줄 — 모든 문장에 밑줄을 그으면 아무것도 표시하지 않은 것과 같습니다.\n' +
        '2. 여백에 문단마다 **요지 한 줄**을 **자기 말로** 씁니다. (화살표·약어 사용: → 결과, ↔ 대조, ex 예)\n' +
        '3. 담화 표지(however, thus)와 정의 신호(refers to, i.e.)에 동그라미를 칩니다.\n' +
        '4. 이해가 안 되는 곳에는 ?, 중요한 근거에는 * 같은 자기만의 기호를 씁니다.\n\n' +
        '다 읽은 뒤에는 메모를 모아 **개요(outline)**로 정리합니다. 개요는 **넓은 것에서 좁은 것으로** 내려가는 계층입니다.\n\n' +
        '| 단계 | 담는 것 | 예 |\n|---|---|---|\n' +
        '| I. | 논지 | Cities can save water in three ways. |\n' +
        '| A. B. C. | 주요 생각(문단 주제문) | A. Repair leaking pipes |\n' +
        '| 1. 2. | 세부(근거·예·수치) | 1. Some cities lose much clean water through leaks |\n\n' +
        '> 💡 개요에서 같은 단계에 놓인 항목은 **같은 무게**여야 합니다. 주요 생각과 그 예를 같은 단계에 두면 구조가 흐트러집니다.',
      easy: '이사할 짐을 싸는 일과 닮았습니다. 먼저 **큰 상자**(논지)에 "부엌 물건"이라고 쓰고, 그 안에 **작은 상자**(주요 생각) "그릇", "냄비"를 넣고, 다시 그 안에 **물건 하나하나**(세부)를 넣습니다.\n\n' +
        '냄비 하나를 "부엌 물건" 상자 옆에 따로 두면 정리가 엉망이 되듯, 세부를 주요 생각과 같은 단계에 두면 개요가 흐트러집니다.',
      check: {
        type: 'choice',
        q: '글의 개요를 정리할 때 **가장 높은 단계(I.)**에 놓을 것은 무엇입니까?',
        choices: ['문단 하나에 나온 구체적인 예', '글 전체의 논지', '본문에 나온 수치 자료'],
        answer: 1,
        why: [
          '구체적인 예는 가장 낮은 세부 단계에 놓습니다.',
          '',
          '수치 자료는 주요 생각을 받치는 세부 근거입니다.',
        ],
        explain: '개요는 넓은 것에서 좁은 것으로 내려갑니다. 가장 높은 단계에는 **글 전체의 논지**, 그 아래에 문단별 주요 생각, 맨 아래에 예·수치 같은 세부를 둡니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 글을 1분 안에 훑어 읽어 요지를 잡은 뒤, 찾아 읽기로 "나무가 많은 거리는 몇 도 더 시원했는가"를 확인해 보십시오.\n\n' + FOREST,
      steps: [
        '훑어 읽기 ① 제목: Urban Forests and Summer Heat — 도시의 숲(나무)과 여름 더위의 관계를 다룹니다.',
        '훑어 읽기 ② 문단 첫 문장: 도시가 주변보다 덥다 → 나무가 그 효과를 두 가지 방법으로 줄인다 → 그래서 계획자들이 나무를 기본 설비로 본다.',
        '요지: 나무는 도시의 여름 더위를 줄이는 기본 설비로 다루어야 한다.',
        '찾아 읽기: "몇 도"를 찾으므로 숫자와 degrees, cooler 낱말을 찾아 훑습니다. 둘째 문단의 about 3 degrees cooler at 3 p.m. 부분에서 멈춥니다.',
        '확인: 이 수치는 hypothetical(가상의) 연구의 값이라고 밝혀져 있습니다. 찾아 읽기에서도 수치의 출처와 조건(오후 3시)을 함께 읽습니다.',
      ],
      answer: '요지: 나무는 도시의 더위를 줄이는 기본 설비이다. 수치: 오후 3시에 약 3도 더 시원했다(가상의 연구).',
    },
    {
      q: '다음 글에서 처음 보는 낱말의 뜻을 신호와 낱말 구성으로 추론해 보십시오.\n\nBioluminescence, i.e., the production of light by living things, is common in the deep sea, where sunlight cannot reach. Many deep-sea fish, e.g., anglerfish, use it to attract prey.',
      steps: [
        '낱말 구성: bio-(생명) + lumin-(빛, luminous 낱말과 같은 뿌리) + -escence(~하는 상태·현상).',
        '신호 i.e.: 바로 뒤의 the production of light by living things 부분이 정확한 정의입니다. "생물이 빛을 내는 것"입니다.',
        '신호 e.g.: anglerfish(아귀류 물고기) 부분은 그런 물고기의 한 예일 뿐입니다.',
        '맥락: where sunlight cannot reach(햇빛이 닿지 않는 곳) 부분이 왜 깊은 바다에서 이런 능력이 흔한지 알려 줍니다.',
      ],
      answer: 'bioluminescence = 생물 발광(생물이 스스로 빛을 내는 현상). anglerfish 부분은 그 예 가운데 하나.',
    },
  ],

  terms: [
    { term: '훑어 읽기 (skimming)', def: '제목·첫 문장·결론 등 뼈대만 빠르게 읽어 글 전체의 요지와 구성을 파악하는 읽기입니다.' },
    { term: '찾아 읽기 (scanning)', def: '수치·이름·날짜 같은 특정 정보를 찾을 때, 그 모양을 머리에 두고 훑다가 멈춰 읽는 읽기입니다.' },
    { term: '문맥 단서', def: '낯선 낱말 주변에서 뜻을 짐작하게 해 주는 정보입니다. 정의, 바꿔 말하기, 대조, 예시, 원인·결과 단서가 있습니다.' },
    { term: 'i.e.', def: '"즉, 다시 말해"라는 뜻의 줄임말(라틴어 id est)입니다. 뒤에 앞말을 정확히 바꿔 말한 내용이 옵니다.' },
    { term: 'e.g.', def: '"예를 들어"라는 뜻의 줄임말(라틴어 exempli gratia)입니다. 뒤에 몇 가지 예가 옵니다.' },
    { term: '퍼센트포인트 (percentage point)', def: '퍼센트로 나타낸 두 값의 차이입니다. 20%에서 30%로 오르면 10퍼센트포인트 오른 것이고, 비율로는 50% 늘어난 것입니다.' },
    { term: '여백 메모 (annotation)', def: '읽으면서 밑줄·기호·한 줄 요지를 글 옆에 적어 두는 것입니다.' },
    { term: '개요 (outline)', def: '논지 → 주요 생각 → 세부의 계층으로 글의 내용을 정리한 틀입니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '긴 보고서의 요지를 5분 안에 파악하려고 할 때, 먼저 읽을 곳으로 **알맞지 않은** 것은 무엇입니까?',
      choices: ['제목과 소제목', '각 문단의 첫 문장', '결론 문단', '방법 부분의 세부 수치'],
      answer: 3,
      why: [
        '제목과 소제목은 글 전체의 화제와 구성을 가장 빨리 보여 줍니다. 훑어 읽기에서 먼저 볼 곳입니다.',
        '문단의 첫 문장은 대개 주제문이라 요지를 잡는 데 알맞습니다.',
        '결론 문단은 글의 핵심을 다시 정리해 주므로 훑어 읽기에서 꼭 봅니다.',
        '',
      ],
      explain: '요지를 빨리 잡는 **훑어 읽기**에서는 제목·첫 문장·결론처럼 뼈대를 읽습니다. **방법 부분의 세부 수치**는 특정 정보가 필요할 때 찾아 읽기로 확인할 곳입니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '다음 안내문을 찾아 읽기로 읽고 답하십시오. 마지막으로 입장할 수 있는 시각은 언제입니까?\n\nThe museum opens at 9 a.m. on weekdays and at 10 a.m. on weekends. Guided tours start every hour from 11 a.m. Visitors can enter until one hour before closing, and the museum closes at 6 p.m. every day.',
      choices: ['오후 6시', '오전 11시', '오후 5시', '오전 10시'],
      answer: 2,
      why: [
        '오후 6시는 문을 닫는 시각입니다. 입장은 닫기 한 시간 전까지입니다.',
        '오전 11시는 안내 관람(guided tours)이 처음 시작하는 시각입니다.',
        '',
        '오전 10시는 주말에 문을 여는 시각입니다.',
      ],
      explain: 'enter, closing 낱말을 찾아 멈추면 Visitors can enter until one hour before closing(닫기 한 시간 전까지 입장) 부분과 closes at 6 p.m. 부분이 나옵니다. 6시에서 한 시간 전이므로 **오후 5시**입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '굵은 낱말의 뜻으로 가장 알맞은 것은 무엇입니까?\n\nThe new medicine had an **adverse** effect on some patients: instead of feeling better, they developed headaches and felt dizzy.',
      choices: ['뜻밖에 좋은', '해로운', '아무 영향이 없는', '오래가는'],
      answer: 1,
      why: [
        'instead of feeling better(나아지기는커녕) 부분과 반대입니다.',
        '',
        '두통과 어지럼증이라는 분명한 영향이 있었습니다.',
        '얼마나 오래갔는지는 문장에 단서가 없습니다.',
      ],
      explain: '쌍점(:) 뒤가 앞말을 풀어 줍니다. 나아지기는커녕 두통이 생기고 어지러웠다는 것은 **해로운** 영향이므로 adverse 낱말은 "해로운, 불리한"이라는 뜻입니다.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'text', concept: 2,
      q: '"예를 들어"라는 뜻으로 쓰는 라틴어 줄임말을 쓰십시오. (알파벳 두 글자와 마침표)',
      answer: ['e.g.', 'e.g', 'eg'],
      wrong: [
        { a: 'i.e.', why: 'i.e. 줄임말은 "즉, 다시 말해"라는 뜻으로, 앞말을 정확히 바꿔 말할 때 씁니다.' },
        { a: 'etc.', why: 'etc. 줄임말은 "기타 등등"이라는 뜻으로 목록 끝에 붙습니다. 예를 들기 시작할 때는 e.g. 줄임말을 씁니다.' },
      ],
      explain: '**e.g.** 줄임말은 라틴어 exempli gratia(예를 들면)에서 왔고 for example 표현과 같은 뜻입니다.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 2,
      q: '다음 문장에서 i.e. 뒤의 red, blue, and yellow 부분은 전통 회화의 원색 가운데 **일부 예**만 든 것이다.\n\nIn traditional painting, the primary colors, i.e., red, blue, and yellow, cannot be made by mixing other colors.',
      answer: false,
      explain: 'i.e. 줄임말은 "즉"이라는 뜻이므로 그 뒤의 목록은 앞말(전통 회화의 원색)을 **정확히 바꿔 말한 것**, 곧 원색의 **전부**입니다. 일부 예만 들 때는 e.g. 줄임말을 씁니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '그래프(가상의 자료)를 바르게 설명한 문장은 무엇입니까?',
      fig: BIKE_FIG,
      choices: [
        'The number of cyclists fell steadily over the whole period.',
        'The number of cyclists rose sharply between 2020 and 2021.',
        'The number of cyclists peaked in 2019.',
        'The number of cyclists doubled between 2019 and 2023.',
      ],
      answer: 1,
      why: [
        '전체 기간 동안 꾸준히 줄지 않았습니다. 2021년까지는 늘었고 그 뒤로는 거의 그대로입니다.',
        '',
        '2019년(40)은 가장 낮은 해입니다. 가장 높은 해는 2021년(60)입니다.',
        '40에서 58로 늘었으므로 두 배(80)에 이르지 못했습니다.',
      ],
      explain: '2020년 45에서 2021년 60으로 한 해에 15(천 명), 3분의 1이 늘었으므로 **rose sharply**(급격히 늘었다)라는 설명이 맞습니다. 그 뒤로는 58에서 거의 그대로입니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말은 무엇입니까?\n\nThe price of a bus ticket rose ___ 1,500 won, from 1,200 won.',
      choices: ['by', 'to', 'at', 'for'],
      answer: 1,
      why: [
        'by 1,500 won 꼴은 "1,500원만큼" 올랐다는 변화량입니다. 실제로 오른 폭은 300원입니다.',
        '',
        'at 낱말은 변화 뒤의 값을 나타내지 않습니다.',
        'for 낱말은 값의 변화를 나타내는 데 쓰지 않습니다.',
      ],
      explain: '1,200원에서 1,500원이 되었으므로 1,500원은 **변화 뒤의 값**입니다. 도달값은 **to** 꼴로 씁니다. 변화량으로 말하면 rose by 300 won 꼴입니다.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 1,
      q: '굵은 낱말의 뜻으로 가장 알맞은 것은 무엇입니까?\n\nUnlike his **gregarious** sister, who loves parties and talks to everyone she meets, Seojun prefers to spend his evenings alone with a book.',
      choices: ['수줍음을 많이 타는', '책을 좋아하는', '사교적인', '게으른'],
      answer: 2,
      why: [
        'Unlike(~와 달리) 표지 때문에 누나와 서준은 반대입니다. 수줍음은 서준 쪽에 가까운 성격입니다.',
        '책을 좋아하는 것은 서준의 모습입니다. gregarious 낱말은 누나를 꾸밉니다.',
        '',
        '게으르다는 단서는 문장에 없습니다.',
      ],
      hint: '누나를 설명하는 관계절 who loves parties and talks to everyone 부분을 보십시오.',
      explain: '관계절 who loves parties and talks to everyone she meets(파티를 좋아하고 만나는 사람 누구와도 이야기함)가 gregarious 낱말을 풀어 줍니다. Unlike 표지는 혼자 책 읽기를 좋아하는 서준과의 **대조**를 알립니다. 그래서 gregarious 낱말의 뜻은 **사교적인**입니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: '다음 글을 읽고 만든 개요의 빈칸에 가장 알맞은 것은 무엇입니까?\n\n' + WATER + '\n\nI. Cities can save water in three ways.\nA. Repair leaking pipes\nB. ___\nC. Reuse treated wastewater',
      choices: [
        'Charge lower prices to households that use little',
        'Encourage residents to use less water',
        'Clean water is lost before it reaches homes',
        'Build more factories that use water',
      ],
      answer: 1,
      why: [
        '"적게 쓰는 가정에 낮은 요금"은 B의 **예**(for example)입니다. 주요 생각보다 한 단계 낮은 세부입니다.',
        '',
        'A(새는 관 고치기)의 까닭을 설명한 세부입니다. 다른 항목과 같은 단계가 아닙니다.',
        '본문에 없는 내용이며, 물을 아끼는 방법도 아닙니다.',
      ],
      hint: 'A·B·C 항목은 First·Second·Finally 낱말로 시작하는 문장의 주요 생각입니다. 같은 단계, 같은 무게인지 보십시오.',
      explain: 'Second, they can **encourage residents to use less water** 부분이 둘째 주요 생각입니다. 낮은 요금(for example 뒤)은 그 아래 세부(1.)로 들어가야 합니다. A·B·C는 모두 "방법" 하나씩으로 같은 무게입니다.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'text', concept: 1,
      q: 'hydro- 부분은 "물"이라는 뜻입니다. 다음 문장의 hydroelectric power 표현은 무엇으로 만든 전기입니까? 영어 **한 낱말**로 쓰십시오.\n\nThe dam on the river produces hydroelectric power for the whole region.',
      answer: ['water'],
      wrong: [
        { a: 'wind', why: '바람으로 만든 전기는 wind power 표현입니다. hydro- 부분은 물을 뜻하며, 문장의 dam, river 낱말도 단서입니다.' },
        { a: 'dam', why: '댐(dam)은 전기를 만드는 시설입니다. 무엇의 힘으로 전기를 만드는지, 곧 hydro- 부분이 뜻하는 것을 쓰십시오.' },
      ],
      explain: 'hydro-(물) + electric(전기의). 강의 댐에서 흐르는 **물**의 힘으로 만든 전기, 곧 수력 발전입니다. 낱말 구성과 문맥(dam, river)이 같은 답을 가리킵니다.',
    },
    {
      id: 'p11', level: 2, type: 'order', concept: 4,
      q: '물 절약에 관한 글의 개요입니다. **가장 넓은 단계부터 가장 좁은 단계** 차례로 늘어놓으십시오.',
      choices: [
        '도시는 세 가지 방법으로 물을 아낄 수 있다.',
        '주민이 물을 덜 쓰도록 이끈다.',
        '물을 적게 쓰는 가정에 낮은 요금을 매긴다.',
      ],
      answer: [0, 1, 2],
      explain: '논지(세 가지 방법) → 주요 생각(주민이 덜 쓰게 하기) → 세부(낮은 요금이라는 구체적인 방법) 차례입니다. 개요는 넓은 것에서 좁은 것으로 내려갑니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: '다음 표(가상의 자료: 한 대학 도서관의 자료 유형별 대출 비율)의 내용과 **맞지 않는** 문장은 무엇입니까?\n\n| 해 | 종이책 | 전자책 | 오디오북 |\n|---|---|---|---|\n| 2020 | 70% | 25% | 5% |\n| 2024 | 55% | 30% | 15% |',
      choices: [
        'The share of printed books fell by 15 percentage points.',
        'The share of audiobooks tripled between 2020 and 2024.',
        'In both years, printed books made up more than half of all loans.',
        'E-books accounted for the largest share of loans in 2024.',
      ],
      answer: 3,
      why: [
        '70%에서 55%로 15퍼센트포인트 내렸으므로 맞는 설명입니다.',
        '5%에서 15%로 세 배가 되었으므로 맞는 설명입니다.',
        '70%와 55% 모두 절반(50%)을 넘으므로 맞는 설명입니다.',
        '',
      ],
      hint: '문장마다 수치를 표에서 하나씩 짚어 보십시오. percentage points, tripled, more than half, the largest share 표현의 뜻을 정확히 따지십시오.',
      explain: '2024년 전자책 비율은 30%로, 종이책(55%)보다 낮습니다. 가장 큰 비중(the largest share)은 여전히 **종이책**이므로 이 문장이 표와 맞지 않습니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '다음 글에서 salinization 낱말의 뜻으로 가장 알맞은 것은 무엇입니까?\n\nMany coastal towns now face salinization, i.e., the build-up of salt in soil and fresh water, as sea levels rise. Farmers there have begun planting crops that can grow in salty ground, e.g., certain types of barley.',
      choices: [
        '바닷물의 높이가 올라가는 현상',
        '짠 땅에서도 자라는 작물',
        '흙과 민물에 소금이 쌓이는 현상',
        '바닷가 마을이 늘어나는 현상',
      ],
      answer: 2,
      why: [
        'as sea levels rise 부분은 염류화의 원인(때)을 말합니다. 낱말의 뜻 자체가 아닙니다.',
        '짠 땅에서 자라는 작물(보리 등)은 e.g. 뒤에 나온 대응 방법의 예입니다.',
        '',
        '마을이 늘어난다는 내용은 본문에 없습니다.',
      ],
      hint: 'i.e. 줄임말 바로 뒤가 정의입니다.',
      explain: 'i.e. 바로 뒤의 the build-up of salt in soil and fresh water(흙과 민물에 소금이 쌓이는 것)가 정확한 정의입니다. 낱말 안의 salin-(소금) 부분도 같은 뜻을 가리킵니다. 해수면 상승은 원인, 보리는 대응의 예입니다.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '가구', concept: 0,
      q: '다음 글(가상의 조사)을 찾아 읽기로 읽고, **세 번째 단계**에서 응답한 가구 수를 쓰십시오.\n\nThe survey of 2,400 households was carried out in three stages. In the first stage, 800 households answered questions about energy use; in the second, 950 households were asked about water; and in the third, the remaining households answered questions about waste.',
      answer: '650',
      hint: 'the remaining households(나머지 가구) 표현은 전체에서 앞의 두 단계를 뺀 것입니다.',
      wrong: [
        { a: '950', why: '950가구는 두 번째 단계(물에 관한 질문)의 응답 수입니다.' },
        { a: '1750', why: '첫째와 둘째 단계를 더한 수입니다. 세 번째 단계는 전체 2,400가구에서 이것을 뺀 나머지입니다.' },
      ],
      explain: '숫자를 찾아 멈추면 전체 2,400, 첫 단계 800, 둘째 단계 950 수치가 나옵니다. 셋째 단계는 the remaining households(나머지 가구)이므로 2,400 − 800 − 950 = **650**가구입니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '다음 문단 옆에 적을 **여백 메모**로 가장 알맞은 것은 무엇입니까?\n\nSome people believe that multitasking saves time. In fact, switching between tasks forces the brain to refocus each time, and these small delays add up. Studies in which people answer emails while writing reports often find that both tasks take longer and contain more mistakes. Doing one task at a time is therefore usually faster in the end.',
      choices: [
        '이메일이 보고서보다 중요하다',
        '여러 일을 동시에 하면 시간이 절약된다',
        '일 전환마다 지연이 쌓임 → 하나씩 하는 편이 대개 빠름',
        '뇌는 어떤 일을 하든지 언제나 오직 한 가지 생각만 할 수 있다',
      ],
      answer: 2,
      why: [
        '이메일과 보고서는 연구 상황의 예일 뿐, 어느 쪽이 중요한지 말하지 않았습니다.',
        '첫 문장에서 소개한 뒤 In fact 표현으로 반박하는 통념입니다. 글쓴이의 주장과 반대입니다.',
        '',
        '본문은 일을 바꿀 때 다시 집중하는 데 시간이 든다고 했을 뿐입니다. "언제나 한 가지만"은 지나친 일반화입니다.',
      ],
      hint: 'In fact 뒤가 글쓴이의 생각이고, therefore 뒤가 결론입니다.',
      explain: '문단은 통념(멀티태스킹이 시간을 아낀다)을 소개한 뒤 In fact 표현으로 반박하고(전환 때마다 지연이 쌓인다), 연구 예를 들고, therefore 뒤에서 결론(한 번에 하나가 대개 더 빠르다)을 냅니다. 좋은 여백 메모는 이 **흐름을 자기 말로 짧게** 담고, 본문의 조심스러운 말(usually)도 지킵니다.',
    },
  ],

  deeper: [
    {
      title: '읽기 전에 묻고, 읽은 뒤에 되새기기',
      body: '1940년대에 미국에서 소개된 **SQ3R** 방법은 지금도 널리 쓰이는 학습 읽기 방법입니다. 다섯 단계의 머리글자를 땄습니다.\n\n' +
        '1. **Survey**(훑어보기) — 제목·소제목·그림·요약을 훑어 지도를 그립니다.\n' +
        '2. **Question**(질문하기) — 소제목을 질문으로 바꿉니다. 예: Urban Forests and Summer Heat → 나무는 어떻게 더위를 줄이는가?\n' +
        '3. **Read**(읽기) — 그 질문의 답을 찾으며 읽고 메모합니다.\n' +
        '4. **Recite**(되뇌기) — 책을 덮고 답을 자기 말로 말하거나 씁니다.\n' +
        '5. **Review**(복습하기) — 개요와 메모로 전체를 다시 봅니다.\n\n' +
        '이 단원의 훑어 읽기·메모·개요가 각 단계에 그대로 들어 있습니다. 질문을 품고 읽으면 찾아 읽기와 꼼꼼히 읽기를 오가는 판단도 쉬워집니다.',
    },
    {
      title: '전공마다 뜻이 달라지는 낱말',
      body: '일상 낱말이 전공 글에서 전혀 다른 뜻으로 쓰이는 경우가 있습니다. 문맥 추론과 함께 **그 분야의 용어집**을 확인해야 하는 까닭입니다.\n\n' +
        '| 낱말 | 일상의 뜻 | 전공 글의 뜻 |\n|---|---|---|\n' +
        '| significant | 중요한 | (통계) 통계적으로 유의한 |\n' +
        '| culture | 문화 | (생물) 배양 |\n' +
        '| theory | 추측, 짐작 | (과학) 많은 증거로 뒷받침된 체계적 설명 |\n' +
        '| interest | 관심 | (경제) 이자 |\n\n' +
        '특히 연구 논문의 significant 낱말은 "중요하다"가 아니라 통계 검정의 결과를 말하는 경우가 많습니다. 이를 일상의 뜻으로 읽으면 연구의 주장을 크게 부풀려 이해하게 됩니다.',
    },
  ],

  faq: [
    {
      q: '모르는 낱말이 나올 때마다 사전을 찾아야 하나요?',
      a: '아닙니다. 먼저 문맥 단서와 낱말 구성으로 뜻을 짐작하고 계속 읽으십시오. 다만 그 낱말이 제목에 있거나, 여러 번 되풀이되거나, refers to 같은 정의 신호와 함께 나온 핵심어라면 반드시 전공 사전이나 용어집으로 확인합니다. 지나가는 낱말 하나 때문에 읽기의 흐름을 끊지 않는 것이 요령입니다.',
    },
    {
      q: 'i.e.·e.g. 두 줄임말이 자꾸 헷갈려요.',
      a: 'i.e. 줄임말은 "즉(그것이 전부)", e.g. 줄임말은 "예를 들어(그중 몇 개)"입니다. 외우기 어렵다면 i.e. 자리에는 in other words, e.g. 자리에는 for example 표현을 넣어 읽어 보십시오. 자연스럽게 읽히는 쪽이 맞는 표현입니다.',
    },
    {
      q: '훑어 읽기만 하면 중요한 내용을 놓치지 않나요?',
      a: '훑어 읽기는 꼼꼼히 읽기를 대신하는 것이 아니라 그 앞 단계입니다. 먼저 훑어서 글의 지도를 그리면, 꼼꼼히 읽을 때 지금 읽는 문장이 전체에서 어디쯤인지 알 수 있어 이해와 기억이 더 좋아집니다. 시험이나 과제에 필요한 부분은 반드시 다시 꼼꼼히 읽으십시오.',
    },
  ],

  mistakes: [
    'e.g. 뒤의 목록을 전부로 읽는 실수 — e.g. 뒤는 몇 가지 예일 뿐입니다. 전부를 말할 때는 i.e. 줄임말을 씁니다.',
    'rose by 표현과 rose to 표현을 헷갈리는 실수 — by 뒤는 변화량, to 뒤는 변화 뒤의 값입니다.',
    '퍼센트와 퍼센트포인트를 섞는 실수 — 20%에서 30%로 오른 것은 10퍼센트포인트 오른 것이고, 비율로는 50% 늘어난 것입니다.',
  ],

  gens: [
    {
      id: 'percent-change',
      level: 2,
      title: '그래프 설명 문장의 수치 읽기',
      make: function (R) {
        var subjects = [
          ['The number of visitors', '방문객 수'],
          ['Monthly sales', '한 달 판매량'],
          ['The number of cyclists', '자전거 이용자 수'],
          ['Daily water use', '하루 물 사용량'],
          ['The number of library loans', '도서관 대출 건수'],
        ];
        var s = R.pick(subjects);
        if (R.bool(0.35)) {
          // 퍼센트포인트
          var p1 = R.int(2, 8) * 5;
          var gap = R.int(1, 4) * 5;
          var up = R.bool();
          var p2 = up ? p1 + gap : p1 - gap;
          if (p2 <= 0) { p2 = p1 + gap; up = true; }
          var rel = R.F(gap * 100, p1);
          var relStr = rel.den === 1 ? String(rel.num) : rel.num + "/" + rel.den;
          var verbPP = up ? 'rose' : 'fell';
          return {
            type: 'short', check: 'number', concept: 3,
            q: '빈칸에 알맞은 수를 쓰십시오. (가상의 자료)\n\nThe share of ' + R.pick(['students who walk to school', 'households with solar panels', 'workers who cycle to work', 'adults who read e-books']) + ' ' + verbPP + ' from ' + p1 + ' percent to ' + p2 + ' percent. In other words, it ' + verbPP + ' by ___ percentage points.',
            answer: String(gap),
            wrong: [{ a: relStr, why: '처음 값 대비 비율(퍼센트)로 계산했습니다. 퍼센트포인트는 두 퍼센트 값의 단순한 차이입니다.' }],
            explain: '퍼센트포인트는 두 퍼센트 값의 차이입니다: ' + Math.max(p1, p2) + ' − ' + Math.min(p1, p2) + ' = ' + gap + '\n\n(같은 변화를 처음 값 대비 비율로 말하면 percent 단위가 되어 값이 달라집니다.)',
          };
        }
        var A = R.pick([200, 400, 500, 800, 1000, 1200, 1500, 2000]);
        var pct = R.pick([10, 20, 25, 30, 40, 50, 60, 75]);
        var rise = R.bool();
        var change = A * pct / 100;
        var B = rise ? A + change : A - change;
        var verb = rise ? 'rose' : 'fell';
        var wrongs = [{ a: String(change), why: '변화량 자체를 썼습니다. "몇 퍼센트"는 변화량을 처음 값으로 나눈 뒤 100을 곱해 구합니다.' }];
        var badBase = R.F(change * 100, B);
        var badStr = badBase.den === 1 ? String(badBase.num) : badBase.num + "/" + badBase.den;
        wrongs.push({ a: badStr, why: '나중 값을 기준으로 나누었습니다. 변화율은 처음 값(' + R.fmt.num(A) + ')을 기준으로 구합니다.' });
        return {
          type: 'short', check: 'number', concept: 3,
          q: '빈칸에 알맞은 수를 쓰십시오. (가상의 자료)\n\n' + s[0] + ' ' + verb + ' by ___ percent, from ' + R.fmt.num(A) + ' to ' + R.fmt.num(B) + '.',
          answer: String(pct),
          wrong: wrongs,
          explain: 'by 뒤는 변화량을 처음 값 대비 비율로 나타낸 것입니다.\n\n변화량: ' + R.fmt.num(Math.max(A, B)) + ' − ' + R.fmt.num(Math.min(A, B)) + ' = ' + R.fmt.num(change) + '\n\n처음 값 기준 비율: ' + R.fmt.num(change) + ' ÷ ' + R.fmt.num(A) + ' × 100 = ' + pct + ' (퍼센트)',
        };
      },
    },
    {
      id: 'signal-word',
      level: 1,
      title: '정의·예시·부연 신호 고르기',
      make: function (R) {
        var WHY = {
          'i.e.': 'i.e. 줄임말은 "즉" — 앞말을 정확히 바꿔 말한 것(전부)이 뒤에 옵니다.',
          'e.g.': 'e.g. 줄임말은 "예를 들어" — 몇 가지 예(일부)가 뒤에 옵니다.',
          'refers to': 'refers to 표현은 "~을 가리킨다"는 동사로, 주어인 용어의 정의를 이끕니다.',
          whereas: 'whereas 낱말은 "~인 반면"이라는 대조의 접속사입니다.',
        };
        // [문장, 정답]
        var items = [
          ['Citrus fruits, ___, oranges, lemons, and limes, are rich in vitamin C.', 'e.g.'],
          ['The study used a small sample, ___, only twelve participants.', 'i.e.'],
          ['Many root vegetables, ___, carrots and radishes, can be stored for months.', 'e.g.'],
          ['The term "biodiversity" ___ the variety of living things in a particular area.', 'refers to'],
          ['"Photosynthesis" ___ the process by which green plants make food from light.', 'refers to'],
          ['Some renewable energy sources, ___, wind and solar power, have become cheaper.', 'e.g.'],
          ['The meeting is held on the last day of the month, ___, on 31 May this month.', 'i.e.'],
          ['Mammals that live in the sea, ___, whales and dolphins, must breathe air.', 'e.g.'],
          ['The country has a bicameral parliament, ___, a parliament with two chambers.', 'i.e.'],
          ['Large animals, ___, elephants and giraffes, need a lot of food every day.', 'e.g.'],
          ['The word "migrate" ___ moving from one place to another, usually with the seasons.', 'refers to'],
          ['Water freezes at 0 degrees Celsius, ___, 32 degrees Fahrenheit.', 'i.e.'],
        ];
        var it = R.pick(items);
        var correct = it[1];
        var others = ['i.e.', 'e.g.', 'refers to', 'whereas'].filter(function (w) { return w !== correct; });
        var pick = R.choices(correct, others);
        return {
          type: 'choice', concept: 2,
          q: '빈칸에 가장 알맞은 말은 무엇입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : WHY[c] + ' 이 자리와 맞지 않습니다.'; }),
          explain: WHY[correct] + '\n\n' + it[0].replace('___', '**' + correct + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'skim', m: '훑어 읽다', ex: 'Skim the article first to find its main idea.', exm: '먼저 기사를 훑어 읽어 중심 생각을 찾으십시오.' },
    { w: 'scan', m: '(특정 정보를) 찾아 훑어보다', ex: 'She scanned the table for the 2019 figures.', exm: '그녀는 2019년 수치를 찾으려고 표를 훑어보았습니다.' },
    { w: 'infer', m: '추론하다', ex: 'You can infer the meaning of the word from the next sentence.', exm: '다음 문장에서 그 낱말의 뜻을 추론할 수 있습니다.' },
    { w: 'context', m: '문맥, 맥락', ex: 'The context makes the meaning clear.', exm: '문맥이 그 뜻을 분명하게 해 줍니다.' },
    { w: 'term', m: '용어; 학기', ex: 'This term is used only in biology.', exm: '이 용어는 생물학에서만 쓰입니다.' },
    { w: 'definition', m: '정의, 뜻풀이', ex: 'The definition is given in the first paragraph.', exm: '정의는 첫 문단에 나와 있습니다.' },
    { w: 'refer to', m: '~을 가리키다, 언급하다', ex: 'The word "habitat" refers to the place where an animal lives.', exm: '"habitat"이라는 낱말은 동물이 사는 곳을 가리킵니다.' },
    { w: 'annotate', m: '주석을 달다, 메모하다', ex: 'Annotate the text as you read it.', exm: '글을 읽으면서 메모를 다십시오.' },
    { w: 'outline', m: '개요; 개요를 짜다', ex: 'Make an outline before you write your summary.', exm: '요약을 쓰기 전에 개요를 짜십시오.' },
    { w: 'margin', m: '(종이의) 여백; 차이', ex: 'Write a short note in the margin next to each paragraph.', exm: '각 문단 옆 여백에 짧은 메모를 적으십시오.' },
    { w: 'steadily', m: '꾸준히', ex: 'The number of users grew steadily over five years.', exm: '사용자 수는 5년 동안 꾸준히 늘었습니다.' },
    { w: 'sharply', m: '급격히', ex: 'Prices rose sharply in the second half of the year.', exm: '물가는 그해 하반기에 급격히 올랐습니다.' },
    { w: 'peak', m: '정점; 정점에 이르다', ex: 'Visitor numbers peaked in August.', exm: '방문객 수는 8월에 정점에 이르렀습니다.' },
    { w: 'glossary', m: '용어집, 용어 풀이', ex: 'Check the glossary at the back of the book.', exm: '책 뒤쪽의 용어집을 확인하십시오.' },
    { w: 'percentage point', m: '퍼센트포인트', ex: 'The rate fell by two percentage points.', exm: '그 비율은 2퍼센트포인트 내렸습니다.' },
  ],
});
})();