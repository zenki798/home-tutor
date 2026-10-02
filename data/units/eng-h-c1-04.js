/* 공통영어1 · 글의 짜임과 요약하기
 * 지문은 모두 직접 쓴 글이다(가상의 인물·가게). */
(function () {
  // 나열 구조: 주제문 → First/Second/Finally → 맺음 문장 (직접 쓴 글)
  var BEES = 'Bees are important to people in several ways. First, they help many plants produce fruit by carrying pollen from flower to flower. Without bees, we would have fewer apples, strawberries, and pumpkins. Second, bees make honey, which people have enjoyed as food for thousands of years. Finally, bees are a sign of a healthy environment. When the number of bees falls, it often means that something is wrong with the land around them. Clearly, protecting bees means protecting ourselves.';
  // 시간 순서 구조: 만드는 과정
  var SALAD = 'Making a simple cucumber salad is easy. First, wash two cucumbers and cut them into thin slices. Then, put the slices in a bowl and add a little salt. After ten minutes, pour out the water that has come out of the cucumbers. Finally, mix in some vinegar, sugar, and sesame seeds, and your salad is ready.';
  // 시간 순서 구조: 한 사람의 이야기 (가상의 인물·가게)
  var BAKERY = 'Mrs. Oh has always loved baking. When she was a child, she often baked cookies with her grandmother. After high school, she studied baking at a cooking school for two years. In 2012, she opened a tiny bakery near a bus stop. At first, only a few customers came each day. Five years later, her bread had become so popular that she moved to a bigger shop. Today, people wait in line every morning to buy her bread.';
  // 요약 연습: 빛 공해
  var LIGHT = 'At night, many cities are filled with bright lights from streetlamps, signs, and buildings. This artificial light makes it hard for people to see the stars. It can also confuse animals. For example, baby sea turtles move toward the brightest light to find the ocean, so lights from beach hotels can lead them in the wrong direction. Some birds that fly at night also crash into brightly lit buildings. Turning off unnecessary lights can help both people and wildlife enjoy a darker, healthier night.';
  // 요약 연습: 온라인 후기 (역접 포함)
  var REVIEWS = 'Before buying something online, many people read reviews. Reviews can be helpful because they show how a product works in real life. However, not all reviews can be trusted. Some sellers pay people to write good reviews, and some angry customers write unfairly bad ones. So it is wise to read many reviews and to look for comments that give specific details rather than just strong feelings.';
  // 시간 순서(과정) 구조: 물의 순환
  var WATER = 'Water on Earth moves in a never-ending cycle. First, the sun heats water in oceans and lakes, and it rises into the air as vapor. Next, the vapor cools high in the sky and forms clouds. When the clouds become heavy, the water falls back to the ground as rain or snow. Finally, this water flows into rivers and returns to the sea, and the cycle begins again.';

Tutor.registerUnit({
  id: 'eng-h-c1-04',
  course: 'eng-h-c1',
  title: '글의 짜임과 요약하기',
  summary: '주제문·뒷받침 문장·맺음 문장으로 이루어진 글의 짜임을 살피고, 핵심만 골라 짧게 요약합니다.',
  goals: [
    '문단에서 주제문·뒷받침 문장·맺음 문장을 구별할 수 있다.',
    '시간 순서 구조와 나열 구조를 연결어로 알아볼 수 있다.',
    '핵심 문장과 덜 중요한 세부 내용을 구별할 수 있다.',
    '핵심어를 이어 글의 내용을 내 말로 한두 문장으로 요약할 수 있다.',
  ],
  standards: ['[10공영1-01-06]', '[10공영1-02-05]'],

  concepts: [
    {
      title: '문단의 구성: 주제문·뒷받침 문장·맺음 문장',
      body: '영어의 설명문·논설문 문단은 보통 세 부분으로 이루어집니다.\n\n| 부분 | 하는 일 | 자주 쓰는 표현 |\n|---|---|---|\n| **주제문** (topic sentence) | 문단의 중심 생각을 밝힘 | ~ in several ways, There are many reasons why ~ |\n| **뒷받침 문장** (supporting sentences) | 이유·예시·설명으로 주제문을 받쳐 줌 | First, Second, For example, In addition |\n| **맺음 문장** (concluding sentence) | 중심 생각을 다른 말로 다시 정리 | In short, Clearly, For these reasons, In conclusion |\n\n예를 들어 "Bees are important to people in several ways."(주제문) 뒤에 꽃가루 옮기기·꿀·건강한 환경의 표시라는 이유(뒷받침 문장)가 오고, 마지막에 "Clearly, protecting bees means protecting ourselves."(맺음 문장)가 옵니다.\n\n맺음 문장은 **새로운 내용을 꺼내지 않고** 주제문을 다른 말로 되풀이하거나 정리합니다. 그리고 좋은 문단은 모든 뒷받침 문장이 주제문과 관련됩니다(**통일성**).',
      easy: '문단은 햄버거와 비슷합니다. 위쪽 빵이 **주제문**, 가운데 고기·채소가 **뒷받침 문장**, 아래쪽 빵이 **맺음 문장**입니다.\n\n위아래 빵은 같은 재료(같은 중심 생각)이고, 가운데 재료들이 맛(이유·예시)을 채웁니다. 가운데에 엉뚱한 재료(주제와 관계없는 문장)가 들어가면 맛이 이상해집니다.',
      check: {
        type: 'ox',
        q: '맺음 문장은 앞에서 다루지 않은 새로운 이유를 처음으로 소개하는 문장이다.',
        answer: false,
        explain: '맺음 문장은 새 내용을 꺼내지 않고, 주제문의 중심 생각을 **다른 말로 다시 정리**합니다. 새로운 이유는 뒷받침 문장에서 다룹니다.',
      },
    },
    {
      title: '시간 순서 구조와 나열 구조',
      body: '뒷받침 문장을 늘어놓는 방법에 따라 글의 짜임이 달라집니다.\n\n**시간 순서 구조**는 일이 일어난 차례, 또는 무엇을 하는 과정을 순서대로 씁니다. 순서를 바꾸면 내용이 틀려집니다.\n- 신호: First, Then, Next, After that, After ten minutes, Later, Finally / In 2012, Five years later, Today\n- 쓰임: 요리법·실험 과정·한 사람의 일생·역사 이야기\n\n**나열 구조**는 주제문을 받쳐 주는 이유·예·특징을 **대등하게** 늘어놓습니다. 순서를 바꿔도 내용은 대체로 맞습니다.\n- 신호: First, Second, Also, In addition, Moreover, Another ~ is, Finally\n- 쓰임: 장점·이유·방법을 여러 개 드는 글\n\n| 구분 | 시간 순서 | 나열 |\n|---|---|---|\n| 무엇을 늘어놓나 | 사건·단계 | 이유·예·특징 |\n| 순서를 바꾸면 | 내용이 틀림 | 대체로 괜찮음 |\n\n> ⚠️ First, Finally는 두 구조에 모두 쓰입니다. 연결어 하나만 보지 말고, 늘어놓은 것이 **단계**인지 **이유**인지를 보십시오.',
      easy: '라면 끓이는 법을 설명할 때는 "물 끓이기 → 면 넣기 → 스프 넣기" 순서를 바꾸면 안 됩니다. 이것이 **시간 순서**입니다.\n\n"라면이 좋은 이유: 빠르다, 싸다, 맛있다"는 어느 것을 먼저 말해도 됩니다. 이것이 **나열**입니다. 순서를 바꿔도 되는지 떠올려 보면 둘을 쉽게 구별할 수 있습니다.',
      check: {
        type: 'choice',
        q: '다음 글의 짜임으로 알맞은 것은 무엇입니까?\n\n' + SALAD,
        choices: ['시간 순서(과정) 구조', '나열 구조', '주제문 없이 예시만 있는 구조'],
        answer: 0,
        why: ['', '이 글이 늘어놓은 것은 이유가 아니라 샐러드를 만드는 단계입니다. 단계의 순서를 바꾸면 요리가 되지 않습니다.', '첫 문장 "Making a simple cucumber salad is easy."가 주제문입니다.'],
        explain: 'First → Then → After ten minutes → Finally로 샐러드를 만드는 **단계**를 차례대로 설명합니다. 순서를 바꾸면 안 되므로 **시간 순서(과정) 구조**입니다.',
      },
    },
    {
      title: '핵심 문장과 덜 중요한 세부 내용',
      body: '뒷받침 문장에도 무게가 다릅니다.\n\n- **주요 뒷받침 문장**: 주제문을 직접 받쳐 주는 이유·단계. (First, bees help plants produce fruit.)\n- **덜 중요한 세부 내용**: 주요 뒷받침 문장을 다시 받쳐 주는 예·숫자·이름. (Without bees, we would have fewer apples, strawberries, and pumpkins.)\n\n요약할 때는 **주제문과 주요 뒷받침 문장**을 남기고, 세부 내용은 줄이거나 뺍니다. 다음과 같은 것은 대개 덜 중요한 세부 내용입니다.\n\n| 덜 중요한 세부 내용의 신호 | 예 |\n|---|---|\n| For example, For instance, such as 뒤의 구체적 예 | apples, strawberries, and pumpkins |\n| 정확한 숫자·날짜·이름 | for thousands of years |\n| 앞 문장을 덧붙여 설명하는 말 | which ~, that is ~ |\n\n> 💡 어떤 문장을 지웠을 때 글의 중심 생각이 그대로 전달되면 그 문장은 세부 내용입니다. 지웠더니 이유 하나가 통째로 사라진다면 주요 뒷받침 문장입니다.',
      easy: '친구에게 영화 줄거리를 1분 안에 알려 준다고 생각해 보십시오. 주인공이 무엇을 했는지(핵심)는 말하지만, 주인공의 옷 색깔이나 식당 이름(세부 내용)은 빼겠지요.\n\n글을 요약할 때도 똑같습니다. "이게 빠지면 이야기가 안 통하나?"라고 물어보고, 통한다면 빼도 되는 세부 내용입니다.',
      check: {
        type: 'choice',
        q: '다음 글을 요약할 때 빼도 되는 **덜 중요한 세부 내용**은 무엇입니까?\n\n' + BEES,
        choices: ['Without bees, we would have fewer apples, strawberries, and pumpkins.', 'Bees are important to people in several ways.', 'Second, bees make honey, which people have enjoyed as food for thousands of years.'],
        answer: 0,
        why: ['', '글 전체의 중심 생각을 밝히는 주제문입니다. 요약에 꼭 들어가야 합니다.', '"꿀을 만든다"는 두 번째 이유를 밝히는 주요 뒷받침 문장입니다. 빼면 이유 하나가 사라집니다.'],
        explain: '"Without bees, ~"는 첫 번째 이유(열매 맺기를 도움)를 사과·딸기·호박이라는 예로 다시 받쳐 주는 **세부 내용**입니다. 빼도 "벌은 식물이 열매를 맺도록 돕는다"는 이유는 그대로 남습니다.',
      },
    },
    {
      title: '핵심어를 이어 한두 문장으로 요약하기',
      body: '**요약(summary)**은 글의 핵심만 짧게 다시 쓰는 것입니다. 다음 순서로 만들면 쉽습니다.\n\n1. **주제문**을 찾습니다. (없으면 글 전체를 아우르는 생각을 정합니다.)\n2. **주요 뒷받침 문장**마다 핵심어를 한두 개 고릅니다.\n3. 핵심어를 and, but, because, so 같은 말로 **이어** 한두 문장으로 만듭니다.\n\n예: 빛 공해 글\n- 주제: artificial light at night\n- 핵심어: hard to see the stars / confuse animals / turn off unnecessary lights\n- 요약: Artificial light at night hides the stars and confuses animals, so we should turn off lights we do not need.\n\n시험에서는 요약문의 빈칸 (A)·(B)에 알맞은 말을 고르는 꼴로 자주 나옵니다. 이때 정답은 글의 낱말을 **바꿔 쓴 말**인 경우가 많습니다.\n\n> ⚠️ 요약문에는 글에 없는 내용이나 내 의견을 넣지 않습니다.',
      easy: '요약은 "긴 글을 문자 메시지 한 통으로 줄이기"입니다. 친구가 "그 글 뭐래?"라고 물으면 두 문장 안에 답해야 한다고 생각해 보십시오.\n\n먼저 글의 중심 생각을 한 줄로 쓰고, 이유나 단계의 핵심 낱말만 뒤에 붙이면 됩니다. 예시·숫자·이름은 문자 메시지에 넣지 않습니다.',
      check: {
        type: 'choice',
        q: '다음 글의 요약문입니다. 빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\n' + LIGHT + '\n\n→ Bright lights at night block our view of the stars and [[blank]] animals.',
        choices: ['confuse', 'protect', 'feed'],
        answer: 0,
        why: ['', '글은 빛이 동물을 보호한다고 하지 않습니다. 바다거북과 새가 길을 잃거나 건물에 부딪힌다고 합니다.', '빛이 동물에게 먹이를 준다는 내용은 없습니다.'],
        explain: '글은 "It can also **confuse** animals."라고 말하고, 바다거북과 새의 예로 뒷받침합니다. 요약문에는 예(바다거북·새)를 빼고 핵심어 confuse만 남깁니다.',
      },
    },
    {
      title: '내 말로 요약하기 (바꿔 쓰기)',
      body: '좋은 요약은 글의 문장을 **그대로 옮기지 않고 내 말로** 씁니다. 그대로 옮기면 길어지고, 내가 이해했는지도 확인할 수 없습니다.\n\n내 말로 바꾸는 방법:\n\n| 방법 | 원래 글 | 바꾼 말 |\n|---|---|---|\n| 비슷한 낱말 쓰기 | make it **hard** to see | **hide** the stars |\n| 여러 예를 묶는 말 쓰기 | apples, strawberries, and pumpkins | **fruit** |\n| 품사·문장 구조 바꾸기 | not all reviews can be trusted | some reviews are **unreliable** |\n| 문장 여러 개를 하나로 | First, ~. Then, ~. Finally, ~. | ~ by A, B, and C |\n\n바꿔 쓸 때 지킬 것:\n- **뜻이 같아야** 합니다. 더 강하게(all, never) 또는 더 약하게 바꾸지 않습니다.\n- 글에 없는 내용, 내 의견(I think ~)을 넣지 않습니다.\n- 고유명사·전문 용어처럼 바꿀 수 없는 말은 그대로 써도 됩니다.',
      easy: '선생님 설명을 듣고 공책에 정리할 때, 선생님 말씀을 한 글자도 빠짐없이 받아 적지는 않지요. 이해한 것을 **내 말로** 짧게 씁니다.\n\n요약도 같습니다. "사과, 딸기, 호박"은 "과일"로, "보기 어렵게 만든다"는 "가린다"로 바꾸면 짧아지면서 뜻은 그대로입니다.',
      check: {
        type: 'choice',
        q: '다음 문장을 뜻은 그대로 두고 내 말로 가장 잘 바꾼 것은 무엇입니까?\n\nWithout bees, we would have fewer apples, strawberries, and pumpkins.',
        choices: ['Bees help us get more fruit.', 'Bees make all the fruit in the world.', 'I think bees are cute.'],
        answer: 0,
        why: ['', '"세상의 모든 과일"은 원래 글보다 지나치게 강한 말입니다. 뜻이 바뀌었습니다.', '원래 문장에 없는 내 의견입니다. 요약에 의견을 넣지 않습니다.'],
        explain: '사과·딸기·호박을 묶어 fruit로 바꾸고, "벌이 없으면 줄어든다"를 "벌이 더 많은 과일을 얻게 돕는다"로 바꾼 **Bees help us get more fruit.**가 뜻을 그대로 지킨 바꿔 쓰기입니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 글의 짜임을 분석하고 한 문장으로 요약하십시오.\n\n' + BEES,
      steps: [
        '주제문: 첫 문장 "Bees are important to people in several ways." — in several ways가 이유를 여러 개 늘어놓겠다는 신호입니다.',
        '주요 뒷받침 문장(나열): First(열매 맺기를 도움), Second(꿀을 만듦), Finally(건강한 환경의 표시). 세 이유는 순서를 바꿔도 되므로 나열 구조입니다.',
        '세부 내용: "Without bees, ~"(과일의 예), "When the number of bees falls, ~"(설명)는 요약에서 뺍니다.',
        '맺음 문장: "Clearly, protecting bees means protecting ourselves." — 주제문을 다른 말로 정리합니다.',
        '핵심어를 이어 요약합니다: Bees are important because they help plants produce fruit, make honey, and show that the environment is healthy.',
      ],
      answer: 'Bees are important because they help plants produce fruit, make honey, and show that the environment is healthy.',
    },
    {
      q: '다음 글의 요약문 빈칸 (A), (B)에 들어갈 말을 정하십시오.\n\n' + REVIEWS + '\n\n→ Online reviews can be useful, but because some of them are (A) ___, readers should compare many reviews and focus on (B) ___ comments.',
      steps: [
        'However 앞은 후기의 장점(helpful), 뒤는 "not all reviews can be trusted"입니다. (A)에는 "믿을 수 없는"이라는 뜻의 말이 필요합니다 → unreliable',
        '마지막 문장은 "specific details rather than just strong feelings"를 담은 후기를 보라고 합니다. (B)에는 "구체적인"이라는 뜻의 말이 필요합니다 → detailed',
        '글의 낱말(trusted, specific)을 그대로 쓰지 않고 unreliable, detailed로 바꿔 썼다는 점을 확인합니다.',
      ],
      answer: '(A) unreliable  (B) detailed',
    },
  ],

  terms: [
    { term: '주제문 (topic sentence)', def: '문단의 중심 생각을 밝히는 문장입니다. 설명문에서는 처음에 오는 경우가 많습니다.' },
    { term: '뒷받침 문장 (supporting sentence)', def: '이유·예시·설명으로 주제문을 받쳐 주는 문장입니다.' },
    { term: '맺음 문장 (concluding sentence)', def: '문단 끝에서 중심 생각을 다른 말로 다시 정리하는 문장입니다. In short, Clearly, For these reasons 같은 말로 시작하곤 합니다.' },
    { term: '시간 순서 구조', def: '사건이나 과정의 단계를 일어난 차례대로 쓰는 짜임입니다. First, Then, Next, After that, Finally, 연도 같은 신호가 쓰입니다.' },
    { term: '나열 구조', def: '주제문을 받쳐 주는 이유·예·특징을 대등하게 늘어놓는 짜임입니다. First, Second, Also, In addition 같은 신호가 쓰입니다.' },
    { term: '요약 (summary)', def: '글의 핵심만 골라 짧게 다시 쓴 것입니다. 주제문과 주요 뒷받침 내용을 내 말로 씁니다.' },
    { term: '통일성 (unity)', def: '문단의 모든 문장이 하나의 중심 생각과 관련되어 있는 성질입니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '다음 글에서 **맺음 문장**은 무엇입니까?\n\n' + BEES,
      choices: ['Clearly, protecting bees means protecting ourselves.', 'Bees are important to people in several ways.', 'Finally, bees are a sign of a healthy environment.', 'Second, bees make honey, which people have enjoyed as food for thousands of years.'],
      answer: 0,
      why: ['', '글을 여는 주제문입니다. 맺음 문장은 끝에서 이것을 다른 말로 정리합니다.', '세 번째 이유를 밝히는 뒷받침 문장입니다. Finally는 마지막 이유라는 신호입니다.', '두 번째 이유를 밝히는 뒷받침 문장입니다.'],
      explain: '마지막 문장 **Clearly, protecting bees means protecting ourselves.**는 새 이유를 더하지 않고, "벌은 사람에게 중요하다"는 주제문을 "벌을 지키는 것은 우리를 지키는 것"이라는 다른 말로 정리합니다.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 2,
      q: '다음 글에서 "Without bees, we would have fewer apples, strawberries, and pumpkins."는 첫 번째 이유를 구체적인 예로 받쳐 주는 세부 내용이다.\n\n' + BEES,
      answer: true,
      explain: '첫 번째 이유는 "벌이 꽃가루를 옮겨 식물이 열매를 맺도록 돕는다"입니다. 사과·딸기·호박은 그 이유를 받쳐 주는 **구체적인 예**, 곧 세부 내용입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '다음 중 **나열 구조**에서 이유나 예를 하나 더 보탤 때 쓰는 연결어가 **아닌** 것은 무엇입니까?',
      choices: ['Five years later', 'In addition', 'Moreover', 'Another reason is that'],
      answer: 0,
      why: ['', 'In addition(게다가)은 이유나 예를 하나 더 보탤 때 쓰는 나열의 신호입니다.', 'Moreover(더욱이)는 이유를 덧붙이는 나열의 신호입니다.', 'Another reason is that ~은 다른 이유를 더하는 나열의 신호입니다.'],
      explain: '**Five years later**(5년 뒤)는 시간이 흐른 것을 나타내는 **시간 순서**의 신호입니다. 나머지는 모두 대등한 이유를 덧붙이는 나열의 신호입니다.',
    },
    {
      id: 'p4', level: 1, type: 'order', concept: 1,
      q: '오이 샐러드를 만드는 순서대로 문장을 놓으십시오.',
      choices: [
        'First, wash two cucumbers and cut them into thin slices.',
        'Then, put the slices in a bowl and add a little salt.',
        'After ten minutes, pour out the water from the bowl.',
        'Finally, mix in some vinegar, sugar, and sesame seeds.',
      ],
      answer: [0, 1, 2, 3],
      explain: '씻고 썰기(First) → 소금 넣기(Then) → 10분 뒤 물 따라 내기(After ten minutes) → 양념 섞기(Finally). 과정을 설명하는 **시간 순서 구조**는 순서를 바꾸면 요리가 되지 않습니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 0,
      q: '다음 문단에서 주제와 관계**없는** 문장은 무엇입니까?\n\n(A) Reading paper books has some advantages over reading on a screen. (B) Paper books do not need batteries, so you can read them anywhere. (C) They are also easier on your eyes during long reading. (D) Many smartphones today have very large screens. (E) For these reasons, some people still prefer paper books.',
      choices: ['(D)', '(B)', '(C)', '(E)'],
      answer: 0,
      why: ['', '배터리가 필요 없다는 것은 종이책의 장점입니다. 주제문을 받쳐 줍니다.', '눈이 덜 피로하다는 것은 종이책의 또 다른 장점입니다.', '"For these reasons"로 시작해 중심 생각을 정리하는 맺음 문장입니다.'],
      explain: '주제는 "종이책의 장점"입니다. **(D)** "요즘 많은 스마트폰은 화면이 아주 크다"는 종이책의 장점과 관계없어 문단의 **통일성**을 깨뜨립니다.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 3,
      q: '다음 글의 요약문입니다. 빈칸에 알맞은 낱말 하나를 글에서 찾아 쓰십시오.\n\n' + BEES + '\n\n→ Bees help plants produce fruit, make honey, and show that the environment is [[blank]].',
      answer: ['healthy'],
      wrong: [{ a: 'health', why: 'health는 명사(건강)입니다. "the environment is ___"의 보어 자리에는 형용사 healthy(건강한)가 와야 합니다.' }, { a: 'important', why: 'important는 주제문에 나온 말이지만, 세 번째 이유는 벌이 "건강한 환경"의 표시라는 것입니다.' }],
      explain: '세 번째 이유 "bees are a sign of a **healthy** environment"를 바꿔 써서 "환경이 건강하다는 것을 보여 준다"로 정리했습니다. 빈칸에는 형용사 **healthy**가 들어갑니다.',
    },
    {
      id: 'p7', level: 2, type: 'order', concept: 1,
      hint: '어린 시절 → 학교 → 가게를 연 해 → 그 뒤의 일 순서로 생각해 보십시오.',
      q: '다음 글을 읽고, Mrs. Oh에게 일어난 일을 시간 순서대로 놓으십시오.\n\n' + BAKERY,
      choices: ['할머니와 쿠키를 구웠다', '요리 학교에서 제빵을 배웠다', '버스 정류장 근처에 작은 빵집을 열었다', '더 큰 가게로 옮겼다'],
      answer: [0, 1, 2, 3],
      explain: 'When she was a child(어린 시절) → After high school(고등학교 졸업 뒤 2년 동안) → In 2012(빵집을 엶) → Five years later(더 큰 가게로 옮김). 시간을 나타내는 표현을 따라가면 순서가 드러납니다.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 3,
      hint: '두 빈칸 모두 글의 낱말을 바꿔 쓴 말일 수 있습니다.',
      q: '다음 글의 요약문입니다. 빈칸 (A), (B)에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + LIGHT + '\n\n→ Artificial light at night (A) ___ the stars and misleads animals, so we should (B) ___ unnecessary lights.',
      choices: ['(A) hides — (B) switch off', '(A) shows — (B) switch off', '(A) hides — (B) add', '(A) brightens — (B) repair'],
      answer: 0,
      why: ['', '빛 때문에 별을 보기 어렵다고 했으므로 (A)는 "보여 준다"가 아니라 "가린다"입니다.', '글은 불필요한 불을 끄라고(turning off) 합니다. 불을 더하라는 말과 반대입니다.', '빛이 별을 밝게 만든다는 내용은 없고, 등을 고치라는 말도 없습니다.'],
      explain: '"makes it hard for people to see the stars"를 **hides**(가리다)로, "Turning off unnecessary lights"를 **switch off**(끄다)로 바꿔 썼습니다. confuse도 misleads로 바꿔 쓴 것을 확인하십시오.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      hint: '뜻을 지키는지, 글에 없는 말이 들어갔는지 보십시오.',
      q: '다음 문장을 내 말로 바꿔 쓴 것으로 가장 알맞은 것은 무엇입니까?\n\nHowever, not all reviews can be trusted.',
      choices: ['But some reviews are not reliable.', 'But no review can ever be trusted.', 'But all reviews are written by sellers.', 'But I never read reviews.'],
      answer: 0,
      why: ['', '"not all"(모두가 ~은 아니다)을 "no review"(어떤 후기도 ~ 않다)로 바꾸면 뜻이 지나치게 강해집니다.', '글은 "일부" 판매자가 후기를 쓰게 한다고 했을 뿐입니다. all은 글에 없는 내용입니다.', '글에 없는 내 이야기입니다. 바꿔 쓰기에는 내 의견이나 경험을 넣지 않습니다.'],
      explain: '**not all ~ can be trusted**는 "모든 후기를 믿을 수 있는 것은 아니다", 곧 "**일부** 후기는 믿을 만하지 않다"는 뜻입니다. 그래서 But some reviews are not reliable.이 뜻을 지킨 바꿔 쓰기입니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 1,
      hint: '글이 늘어놓은 것이 사건인지 이유인지 보십시오.',
      q: '다음 글의 짜임을 바르게 설명한 것은 무엇입니까?\n\n' + BAKERY,
      choices: ['한 사람의 일을 시간 순서대로 이야기한다.', '빵집의 장점을 대등하게 나열한다.', '두 빵집을 비교한다.', '문제를 제시하고 해결책을 내놓는다.'],
      answer: 0,
      why: ['', '빵집의 장점을 늘어놓는 글이 아닙니다. 어린 시절부터 지금까지의 일을 차례로 씁니다.', '빵집은 하나뿐이고, 비교하는 내용이 없습니다.', '해결해야 할 문제가 제시되지 않습니다.'],
      explain: 'When she was a child → After high school → In 2012 → Five years later → Today처럼 **시간을 나타내는 표현**이 이어집니다. 한 사람의 일을 일어난 차례대로 쓰는 시간 순서 구조입니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      hint: '너무 긴 것, 의견이 섞인 것, 글과 다른 것을 지워 보십시오.',
      q: '다음 글의 요약으로 가장 알맞은 것은 무엇입니까?\n\n' + SALAD,
      choices: [
        'To make a cucumber salad, slice and salt the cucumbers, drain the water, and add the seasonings.',
        'First, wash two cucumbers and cut them into thin slices. Then, put the slices in a bowl and add a little salt.',
        'Cucumber salad is the most delicious side dish, and everyone should eat it.',
        'To make a cucumber salad, you need to cook the cucumbers in hot water for ten minutes.',
      ],
      answer: 0,
      why: [
        '',
        '글의 앞 두 문장을 그대로 옮겨 적었고, 뒤의 단계도 빠졌습니다. 요약은 전체 단계를 짧게, 내 말로 씁니다.',
        '글에 없는 의견입니다. 글은 맛이나 "모두 먹어야 한다"는 말을 하지 않습니다.',
        '글과 다릅니다. 오이는 익히지 않고, 10분은 소금에 절여 두는 시간입니다.',
      ],
      explain: '썰기·소금 넣기(slice and salt), 물 따라 내기(drain the water), 식초·설탕·깨 넣기(add the seasonings)를 **내 말로 묶어** 한 문장에 담은 첫째 보기가 가장 알맞은 요약입니다. vinegar, sugar, and sesame seeds를 seasonings(양념)로 묶었습니다.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'text', concept: 2,
      hint: '나열 구조에서 이유가 몇 개인지 신호(First, Second, Finally)를 세어 보십시오.',
      q: '다음 글에서 주제문을 받쳐 주는 **주요 이유**는 모두 몇 개입니까? 숫자를 영어 낱말로 쓰십시오. (예: two)\n\n' + BEES,
      answer: ['three'],
      wrong: [{ a: 'four', why: '"Without bees, ~"나 "When the number of bees falls, ~"는 새 이유가 아니라 앞 이유를 받쳐 주는 세부 내용입니다.' }, { a: 'two', why: 'Finally 뒤의 "건강한 환경의 표시"도 이유입니다. First, Second, Finally를 모두 세어 보십시오.' }],
      explain: 'First(열매 맺기를 도움), Second(꿀을 만듦), Finally(건강한 환경의 표시)로 **세 개**입니다. 나머지 문장은 이 이유들을 받쳐 주는 세부 내용입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      hint: 'However 앞과 뒤, 그리고 마지막 문장의 조언을 나누어 보십시오.',
      q: '다음 글의 요약문입니다. 빈칸 (A), (B)에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + REVIEWS + '\n\n→ Online reviews can be useful, but because some of them are (A) ___, readers should compare many reviews and focus on (B) ___ comments.',
      choices: ['(A) unreliable — (B) detailed', '(A) helpful — (B) emotional', '(A) unreliable — (B) emotional', '(A) expensive — (B) detailed'],
      answer: 0,
      why: ['', '(A) 앞에 but이 있어 후기의 단점이 와야 합니다. helpful은 장점입니다. 또 글은 감정(strong feelings)보다 구체적인 내용을 보라고 합니다.', '(A)는 맞지만, 글은 "strong feelings"만 담은 후기가 아니라 구체적인 내용을 담은 후기를 보라고 합니다.', '후기가 비싸다는 내용은 글에 없습니다. 문제는 믿을 수 있느냐입니다.'],
      explain: '"not all reviews can be trusted"를 (A) **unreliable**(믿을 수 없는)로, "comments that give specific details"를 (B) **detailed**(구체적인)로 바꿔 쓴 것입니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      hint: '과정의 네 단계를 모두 담으면서 짧고, 글과 다르지 않은 것을 고르십시오.',
      q: '다음 글의 요약으로 가장 알맞은 것은 무엇입니까?\n\n' + WATER,
      choices: [
        'Water keeps moving: it rises as vapor, forms clouds, falls as rain or snow, and flows back to the sea.',
        'The sun heats water in oceans and lakes, and it rises into the air as vapor.',
        'Rain and snow are the most important part of nature because people need water.',
        'Water rises into the air only once and then stays in the clouds forever.',
      ],
      answer: 0,
      why: [
        '',
        '첫 단계만 옮겨 적었습니다. 요약은 과정 전체를 담아야 합니다.',
        '글에 없는 의견("가장 중요하다")과 이유가 들어 있습니다.',
        '글과 반대입니다. 글은 물이 끝없이(never-ending) 돌고 돈다고 합니다.',
      ],
      explain: '주제문(물은 끝없이 순환한다)과 네 단계(증발 → 구름 → 비·눈 → 바다로 돌아감)를 모두 담고, 문장들을 하나로 묶어 내 말로 쓴 첫째 보기가 가장 알맞습니다.',
    },
    {
      id: 'a3', level: 3, type: 'order', concept: 0,
      hint: '주제문 → 첫째 이유 → 그 예 → 둘째 이유 → 맺음 문장 순서입니다.',
      q: '짜임이 잘 갖춰진 문단이 되도록 문장을 순서대로 놓으십시오.',
      choices: [
        'There are two good reasons to ride a bike to school.',
        'First, it is a great way to exercise every day.',
        'For example, a 20-minute ride each way adds up to over three hours of exercise a week.',
        'Second, bikes do not pollute the air like cars do.',
        'For these reasons, more students should choose bikes over cars.',
      ],
      answer: [0, 1, 2, 3, 4],
      explain: '주제문(이유가 두 가지) → First(운동) → For example(첫째 이유의 세부 예: 하루 왕복 40분 × 5일 = 200분, 곧 3시간이 넘음) → Second(공기 오염이 없음) → For these reasons(맺음 문장). 예는 그것이 받쳐 주는 이유 바로 뒤에 와야 합니다.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'text', concept: 3,
      hint: '첫 문장(주제문)에서 과정 전체를 한 낱말로 부르는 말을 찾으십시오.',
      q: '다음 글의 요약문입니다. 빈칸에 알맞은 낱말 하나를 글에서 찾아 쓰십시오.\n\n' + WATER + '\n\n→ Water moves in a [[blank]]: it rises as vapor, forms clouds, falls as rain or snow, and returns to the sea.',
      answer: ['cycle'],
      wrong: [{ a: 'vapor', why: 'vapor(수증기)는 과정의 한 단계에 나오는 말입니다. 빈칸에는 과정 전체를 부르는 말이 필요합니다.' }, { a: 'circle', why: '뜻은 비슷하지만 글에서 찾아 쓰는 문제입니다. 글의 첫 문장에 나온 낱말을 찾아보십시오.' }],
      explain: '첫 문장 "Water on Earth moves in a never-ending **cycle**."이 주제문입니다. 요약문은 이 핵심어 cycle에 네 단계를 이어 붙였습니다.',
    },
  ],

  deeper: [
    {
      title: '요약과 베껴 쓰기의 차이',
      body: '대학이나 직장에서 보고서를 쓸 때 다른 사람의 글을 그대로 옮겨 쓰고 출처를 밝히지 않으면 **표절**이 됩니다. 그래서 영어권 학교에서는 일찍부터 summarizing(요약)과 paraphrasing(바꿔 쓰기)을 연습시킵니다.\n\n좋은 요약을 쓰는 실용적인 방법이 있습니다. 글을 다 읽은 뒤 **원래 글을 덮고**, 기억나는 핵심만 내 말로 써 봅니다. 그다음 원래 글과 비교해 빠진 핵심이 없는지, 뜻이 바뀐 곳이 없는지 확인합니다. 글을 보면서 쓰면 문장을 그대로 옮기기 쉽기 때문입니다.\n\n요약은 "내가 이 글을 정말 이해했는가"를 확인하는 가장 좋은 방법이기도 합니다.',
    },
    {
      title: '다른 글의 짜임 미리 보기',
      body: '이 단원에서 배운 시간 순서 구조와 나열 구조 말고도 영어 글에는 여러 짜임이 있습니다.\n\n- **비교·대조**: 두 대상의 같은 점과 다른 점 (similarly, on the other hand, while)\n- **원인·결과**: 어떤 일이 일어난 까닭과 그 결과 (because, as a result, therefore)\n- **문제·해결**: 문제를 제시하고 해결 방법을 내놓음 (One solution is ~)\n\n공통영어2의 "글의 전개 방식과 요약"에서 이런 짜임을 자세히 배웁니다. 어떤 짜임이든 주제문을 찾고, 주요 뒷받침 내용과 세부 내용을 나누어 요약하는 방법은 같습니다.',
    },
  ],

  faq: [
    {
      q: '요약할 때 글에 나온 낱말을 그대로 쓰면 안 돼요?',
      a: '핵심어나 고유명사, 바꿀 수 없는 전문 용어는 그대로 써도 됩니다. 다만 문장 전체를 그대로 옮기면 요약이 아니라 베껴 쓰기가 됩니다. 여러 예를 묶는 말(apples, bananas → fruit)이나 비슷한 낱말을 써서 짧게 다시 쓰는 것이 좋습니다.',
    },
    {
      q: 'First가 나오면 무조건 나열 구조예요?',
      a: '아닙니다. First는 요리 과정 같은 시간 순서 구조에도 쓰입니다. 늘어놓은 것이 순서를 바꾸면 안 되는 **단계**인지, 순서를 바꿔도 되는 **이유·예**인지를 보고 판단하십시오.',
    },
    {
      q: '요약문 빈칸 문제는 어떻게 풀어요?',
      a: '먼저 요약문을 읽고 빈칸에 어떤 뜻의 말이 필요한지 정합니다. 그다음 글에서 그 뜻에 해당하는 부분을 찾고, 선택지에서 그 말을 바꿔 쓴 표현을 고릅니다. 정답은 글의 낱말과 철자가 다른 경우가 많으니 뜻으로 맞춰 보십시오.',
    },
  ],

  mistakes: [
    '요약에 예시·숫자·이름 같은 세부 내용까지 다 넣는 실수 — 주제문과 주요 뒷받침 내용만 남깁니다.',
    '글의 문장을 그대로 옮겨 요약이라고 하는 실수 — 묶는 말·비슷한 낱말로 내 말로 바꿔 씁니다.',
    '요약에 글에 없는 내 의견이나 지나치게 강한 말(all, never)을 넣는 실수 — 뜻은 원래 글과 같아야 합니다.',
  ],

  gens: [
    {
      id: 'signal-words',
      level: 1,
      title: '연결어가 보내는 신호 알아보기',
      make: function (R) {
        var groups = [
          { k: '시간 순서', d: '일이나 단계가 일어난 차례를 따라감', w: ['After that', 'Two years later', 'Then', 'Later that day', 'In 2015', 'Soon afterward', 'Before that'] },
          { k: '나열(더하기)', d: '이유·예를 대등하게 하나 더 보탬', w: ['In addition', 'Moreover', 'Another reason is that', 'Besides', 'Also'] },
          { k: '예시', d: '앞 내용을 구체적인 예로 보여 줌', w: ['For example', 'For instance', 'To give an example'] },
          { k: '맺음(정리)', d: '중심 생각을 다시 정리함', w: ['In short', 'In conclusion', 'To sum up', 'For these reasons', 'All in all'] },
        ];
        var g = R.pick(groups);
        var word = R.pick(g.w);
        var labels = groups.map(function (x) { return x.k + ' — ' + x.d; });
        var correct = g.k + ' — ' + g.d;
        var pick = R.choices(correct, labels.filter(function (l) { return l !== correct; }), 4);
        var why = pick.choices.map(function (c) {
          if (c === correct) return '';
          return '이 연결어는 ' + g.k + '의 신호입니다. 고른 보기는 다른 연결어가 하는 일입니다.';
        });
        return {
          type: 'choice', concept: g.k === '시간 순서' || g.k === '나열(더하기)' ? 1 : g.k === '예시' ? 2 : 0,
          q: '글에서 다음 연결어가 문장 앞에 나왔습니다. 이 연결어가 보내는 신호로 알맞은 것은 무엇입니까?\n\n**' + word + '**, …',
          choices: pick.choices,
          answer: pick.answer,
          why: why,
          explain: '연결어 **' + word + '** → ' + g.k + '의 신호입니다(' + g.d + ').\n\n같은 무리의 연결어: ' + g.w.join(', ') + '.',
        };
      },
    },
  ],

  vocab: [
    { w: 'support', m: '뒷받침하다, 지지하다', ex: 'Each example should support the main idea.', exm: '각 예시는 중심 생각을 뒷받침해야 한다.' },
    { w: 'conclude', m: '결론을 내리다, 끝맺다', ex: 'She concluded her speech with a short story.', exm: '그녀는 짧은 이야기로 연설을 끝맺었다.' },
    { w: 'summary', m: '요약', ex: 'Write a two-sentence summary of the article.', exm: '그 기사를 두 문장으로 요약하십시오.' },
    { w: 'process', m: '과정', ex: 'Learning a language is a long process.', exm: '언어를 배우는 것은 긴 과정이다.' },
    { w: 'produce', m: '생산하다, 만들어 내다', ex: 'This farm produces fresh milk every day.', exm: '이 농장은 매일 신선한 우유를 생산한다.' },
    { w: 'environment', m: '환경', ex: 'We must keep our environment clean.', exm: '우리는 환경을 깨끗하게 지켜야 한다.' },
    { w: 'artificial', m: '인공의', ex: 'The plant grows well under artificial light.', exm: '그 식물은 인공 조명 아래에서 잘 자란다.' },
    { w: 'confuse', m: '혼란스럽게 하다', ex: 'The new road signs confused many drivers.', exm: '새 도로 표지판은 많은 운전자를 혼란스럽게 했다.' },
    { w: 'wildlife', m: '야생 동물', ex: 'The park is home to a lot of wildlife.', exm: '그 공원에는 많은 야생 동물이 산다.' },
    { w: 'reliable', m: '믿을 만한', ex: 'This website is a reliable source of information.', exm: '이 웹사이트는 믿을 만한 정보원이다.' },
    { w: 'specific', m: '구체적인', ex: 'Please give me a specific example.', exm: '구체적인 예를 하나 들어 주십시오.' },
    { w: 'cycle', m: '순환, 주기', ex: 'Spring, summer, fall, and winter make a yearly cycle.', exm: '봄, 여름, 가을, 겨울은 한 해의 주기를 이룬다.' },
  ],
});
})();
