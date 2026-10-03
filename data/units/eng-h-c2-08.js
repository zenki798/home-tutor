/* 공통영어2 · 글의 흐름과 연결 고리
 * 지문·예문은 모두 직접 쓴 글이다(가상의 인물). */
(function () {
  // 글 A: 문어 (대명사·지시어·재진술, 직접 쓴 글)
  var OCTOPUS = 'The octopus is one of the smartest animals in the sea. This clever creature can open jars, solve simple puzzles, and even escape from its tank. Scientists believe that such skills help it find food and stay away from danger. An octopus has no bones, so it can squeeze through very small holes. Its eight arms are covered with suckers. These suckers can even taste the things they touch.';
  // 글 B: 걸어서 등교하기 (통일성, 직접 쓴 글)
  var WALK = '(1) Walking to school is good for students in many ways. (2) It gives them some exercise at the start of the day. (3) It also lets them talk with their friends on the way. (4) In some countries, school buses are painted bright yellow. (5) Most of all, students who walk to school often arrive feeling awake and ready to learn.';
  // 글 C: 꿀이 상하지 않는 까닭 (통일성, 직접 쓴 글)
  var HONEY = '(A) Honey can stay good for a very long time if it is kept in a closed jar. (B) This is mainly because honey contains very little water. (C) Germs need water to grow, so they cannot survive in such a dry, sugary food. (D) Many people like to put honey in their tea instead of sugar. (E) Honey is also slightly acidic, which helps keep germs away.';
  // 글 D: 스마트폰 (재진술, 직접 쓴 글)
  var PHONES = 'Smartphones have changed the way teenagers spend their free time. These small devices let them watch videos, play games, and chat with friends almost anywhere. However, the handy gadgets can also make it hard to fall asleep at night. For this reason, some students now leave the machines outside their bedrooms after 10 p.m.';

Tutor.registerUnit({
  id: 'eng-h-c2-08',
  course: 'eng-h-c2',
  title: '글의 흐름과 연결 고리',
  summary: '대명사와 지시어가 가리키는 대상을 따라가며 글의 흐름을 이해하고, 흐름에 맞지 않는 문장을 찾습니다.',
  goals: [
    'it, they 같은 대명사가 가리키는 대상을 수(단수·복수)와 뜻으로 찾을 수 있다.',
    'this, such 같은 지시어가 앞 문장의 낱말이나 내용 전체를 가리킨다는 것을 알고 그 대상을 찾을 수 있다.',
    '같은 대상을 다른 말로 바꿔 부른 재진술 표현을 알아볼 수 있다.',
    '주제에서 벗어난 문장을 찾고, 앞뒤 문장이 논리적으로 이어지는지 판단할 수 있다.',
  ],
  standards: ['[10공영2-01-04]'],

  concepts: [
    {
      title: '대명사가 가리키는 대상 찾기 (it, they)',
      body: '글쓴이는 같은 말을 되풀이하지 않으려고 **대명사**를 씁니다. 대명사가 무엇을 가리키는지 놓치면 문장은 읽혀도 글의 흐름을 잃습니다. 대명사의 대상을 찾는 순서는 다음과 같습니다.\n\n' +
        '1. **앞으로 돌아가** 가까운 명사부터 후보를 찾습니다.\n' +
        '2. **수를 맞춰 봅니다**: it·its는 단수, they·them·their는 복수입니다.\n' +
        '3. **뜻을 넣어 봅니다**: 대명사 자리에 후보를 넣어 문장이 말이 되는지 확인합니다.\n\n' +
        '예: My grandparents have a small farm. **They** grow apples there.\n' +
        '→ 복수 후보는 my grandparents뿐입니다. a small farm은 단수라 They가 될 수 없습니다. 넣어 보면 "조부모님이 사과를 기르신다" — 말이 됩니다.\n\n' +
        '> ⚠️ **가장 가까운 명사가 늘 답은 아닙니다.** An octopus has no bones, so **it** can squeeze through small holes.에서 it 바로 앞의 명사는 bones지만, 복수이고 뜻도 맞지 않습니다. it은 an octopus입니다.',
      easy: '연극 대본에서 "그가 문을 연다"라고 쓰여 있으면, 배우는 "그"가 누구인지 앞 장면을 보고 알아냅니다.\n\n' +
        '대명사도 같습니다. it, they를 만나면 "누구지?" 하고 앞 문장으로 손가락을 옮겨 보십시오. 하나(it)인지 여럿(they)인지만 맞춰도 후보가 확 줄어듭니다.',
      check: {
        type: 'choice',
        q: '다음 글에서 밑줄 친 __They__가 가리키는 것은 무엇입니까?\n\nMy cousins visited our house last weekend. __They__ brought a big box of strawberries.',
        choices: ['my cousins', 'our house', 'a big box'],
        answer: 0,
        why: ['', 'our house는 단수라서 They로 가리킬 수 없고, 집이 딸기를 가져올 수도 없습니다.', 'a big box는 단수이고, 상자는 They가 가져온 물건입니다.'],
        explain: '복수 명사는 **my cousins**뿐이고, 넣어 보면 "사촌들이 딸기 한 상자를 가져왔다"로 말이 됩니다.',
      },
    },
    {
      title: '지시어가 가리키는 대상 찾기 (this, such)',
      body: '**this, that, these, those, such**는 앞에 나온 것을 가리키는 **지시어**입니다. 대명사와 다른 점은 낱말 하나뿐 아니라 **앞 문장의 내용 전체**를 가리킬 수 있다는 것입니다.\n\n' +
        '| 지시어 | 가리키는 것 | 예 |\n|---|---|---|\n' +
        '| **this / that** (혼자 쓰임) | 앞 문장의 **내용 전체**인 경우가 많음 | Many students skip breakfast. **This** can make them tired. (This = 아침을 거르는 것) |\n' +
        '| **this / these + 명사** | 앞에 나온 같은 대상 | Its arms are covered with suckers. **These suckers** can taste things. |\n' +
        '| **such + (a) 명사** | 앞에서 말한 **그런 종류**의 것 | It can open jars and solve puzzles. **Such skills** help it find food. |\n\n' +
        '**such**는 "이와 같은, 그런"이라는 뜻이라 앞에 나온 **여러 예를 한데 묶는** 경우가 많습니다. 위 예에서 such skills는 병 열기·퍼즐 풀기·탈출하기를 모두 가리킵니다.\n\n' +
        '> 💡 This가 무엇을 가리키는지 헷갈리면 "앞 문장에서 일어난 일"을 우리말 한 구절(~하는 것)로 바꿔 넣어 보십시오. 대부분 그것이 답입니다.',
      easy: '친구가 "어제 숙제를 다 하고, 방 청소도 하고, 동생 공부도 봐 줬어." 하고 말하자 엄마가 "**그런 일**은 칭찬받을 만하지."라고 대답했다고 해 봅시다. "그런 일"은 앞에 말한 세 가지를 모두 가리킵니다.\n\n' +
        'such가 바로 이 "그런"입니다. this도 "**그것** 참 잘했다"처럼 앞에서 말한 일 전체를 가리킬 수 있습니다.',
      check: {
        type: 'ox',
        q: '"Many students skip breakfast. This can make them tired in class."에서 This는 breakfast(아침밥)를 가리킨다.',
        answer: false,
        explain: '피곤하게 만드는 것은 아침밥이 아니라 **아침을 거르는 것**입니다. This는 앞 문장의 내용 전체(많은 학생이 아침을 거른다)를 가리킵니다.',
      },
    },
    {
      title: '같은 대상을 다른 말로 바꿔 부르기 (재진술)',
      body: '영어 글은 같은 낱말을 되풀이하는 것을 피합니다. 그래서 한 대상을 **여러 다른 말로 바꿔 부르는데**, 이것을 **재진술(restatement)**이라고 합니다.\n\n' +
        '| 바꿔 부르는 방법 | 처음 이름 | 바꿔 부른 말 |\n|---|---|---|\n' +
        '| 더 넓은 종류의 말 | the octopus | **this creature**, the animal |\n' +
        '| 특징을 담은 말 | the octopus | **this clever creature**, the eight-armed hunter |\n' +
        '| 비슷한 말 | smartphones | **these devices**, the gadgets |\n\n' +
        '재진술을 알아보지 못하면 새로운 대상이 나온 줄 알고 흐름을 놓칩니다. 앞에 **this, these, the**가 붙은 낯선 명사가 나오면 "앞에 나온 무엇을 다르게 부른 것일까?"라고 물어보십시오.\n\n' +
        '재진술에는 **글쓴이의 생각**이 담기기도 합니다. 문어를 this clever creature라고 부르면 "영리하다"는 평가가 함께 전해집니다.\n\n' +
        '> 💡 재진술 표현 안의 형용사(clever, handy, small)는 앞에서 말한 특징을 다시 짚어 주는 경우가 많습니다.',
      easy: '이야기에서 "흥부"를 계속 "흥부"라고만 부르지 않고 "착한 동생", "가난한 아버지"라고도 부르지요. 모두 같은 사람입니다.\n\n' +
        '영어 글도 the octopus를 this clever creature, the animal로 바꿔 부릅니다. 이름이 바뀌어도 같은 대상이라는 것을 알아차리는 것이 흐름을 따라가는 비결입니다.',
      check: {
        type: 'choice',
        q: '글 A에서 __This clever creature__가 가리키는 것은 무엇입니까?\n\n' + OCTOPUS,
        choices: ['the octopus', 'scientists', 'its tank'],
        answer: 0,
        why: ['', 'scientists는 복수이고, 다음 문장에서 처음 나옵니다. 앞 문장의 대상을 보십시오.', '수조는 생물(creature)이 아닙니다. 수조는 문어가 빠져나오는 곳입니다.'],
        explain: '첫 문장의 **the octopus**(가장 영리한 바다 동물 가운데 하나)를 둘째 문장에서 **this clever creature**(이 영리한 생물)로 바꿔 불렀습니다.',
      },
    },
    {
      title: '글의 통일성: 주제에서 벗어난 문장 찾기',
      body: '**통일성(unity)**이란 글의 모든 문장이 **하나의 주제(중심 생각)**를 뒷받침하는 것입니다. 주제와 관계없는 문장이 끼어 있으면 흐름이 끊깁니다.\n\n' +
        '흐름에 맞지 않는 문장을 찾는 순서는 다음과 같습니다.\n\n' +
        '1. 첫 문장(또는 첫 두 문장)에서 **주제**를 한 구절로 정합니다. 예: 걸어서 등교하는 것의 좋은 점\n' +
        '2. 문장마다 "이 문장이 그 주제를 **뒷받침**하는가?"를 묻습니다.\n' +
        '3. 고른 문장을 빼고 앞뒤를 이어 읽어 봅니다. 흐름이 더 매끄러우면 정답입니다.\n\n' +
        '> ⚠️ 주제에서 벗어난 문장은 대개 **주제와 같은 낱말**을 담고 있어서 그럴듯해 보입니다. 걸어서 등교하기 글에 끼어든 "학교 버스는 노란색"은 school이라는 낱말이 겹치지만, 걷기의 좋은 점과는 관계가 없습니다. **낱말이 아니라 내용**이 주제를 뒷받침하는지 보십시오.',
      easy: '"우리 반 소풍 사진첩"에 다른 반 운동회 사진 한 장이 끼어 있다고 생각해 보십시오. 같은 학교, 같은 학생 옷차림이라 얼핏 보면 어울리지만, "우리 반 소풍"이라는 주제와는 맞지 않습니다.\n\n' +
        '글도 같습니다. 문장마다 "이게 이 글의 주제 사진첩에 들어갈 사진인가?"를 물어보면 끼어든 문장이 보입니다.',
      check: {
        type: 'choice',
        q: '글 B에서 전체 흐름과 관계**없는** 문장은 무엇입니까?\n\n' + WALK,
        choices: ['(2)', '(4)', '(5)'],
        fixed: true,
        answer: 1,
        why: ['(2)는 아침에 운동이 된다는, 걷기의 좋은 점입니다.', '', '(5)는 잠이 깨고 공부할 준비가 된다는, 걷기의 가장 큰 좋은 점입니다.'],
        explain: '주제는 "걸어서 등교하는 것의 좋은 점"입니다. (4) 학교 버스의 색깔은 school이라는 낱말만 겹칠 뿐 걷기의 좋은 점과 관계가 없습니다.',
      },
    },
    {
      title: '앞뒤 문장의 논리적 연결 확인하기',
      body: '통일성이 "주제에 맞는가"라면, 연결은 "**바로 앞 문장과 이어지는가**"입니다. 앞뒤 문장을 이어 줄 때 다음 세 가지를 확인합니다.\n\n' +
        '1. **연결어의 뜻이 맞는가?** 앞뒤가 반대면 However, 예를 들면 For example, 결과면 As a result, 덧붙이면 In addition.\n' +
        '   Octopuses are very smart. **However**, most of them live only one or two years. (영리하다 ↔ 짧게 산다: 기대와 반대)\n' +
        '2. **가리키는 말이 앞에 있는가?** These trees, such skills, This처럼 앞을 가리키는 말이 있으면, 그 대상이 **바로 앞 문장**에 나와 있어야 합니다.\n' +
        '3. **내용이 앞뒤로 어긋나지 않는가?** 도서관을 늦게까지 열었는데 "그 결과 방문 학생이 줄었다"면 논리가 맞지 않습니다.\n\n' +
        '> 💡 영어 글은 대개 **앞 문장 끝에 나온 새 정보가 다음 문장의 앞(주어)**으로 이어집니다. ~ are covered with **suckers**. **These suckers** can taste …처럼 이어지는 고리를 찾으면 흐름이 보입니다.',
      easy: '징검다리를 건널 때는 돌과 돌 사이가 너무 멀면 건널 수 없지요. 문장도 앞 문장과 다음 문장 사이에 **딛고 건널 돌**이 있어야 합니다.\n\n' +
        '그 돌이 바로 알맞은 연결어(However, For example)와 앞을 가리키는 말(this, these, such)입니다. 돌이 엉뚱한 곳에 놓여 있으면(연결어 뜻이 틀리면) 흐름에서 빠집니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nOctopuses are very smart animals. [[빈칸]], most of them live for only one or two years.',
        choices: ['However', 'For example', 'As a result'],
        answer: 0,
        why: ['', '뒤 문장은 영리하다는 것의 예가 아닙니다.', '짧게 사는 것은 영리해서 생긴 결과가 아닙니다.'],
        explain: '"아주 영리하다"와 "대부분 1~2년밖에 살지 못한다"는 기대와 반대되는 내용이므로 **However**(그러나)가 알맞습니다.',
      },
    },
  ],

  examples: [
    {
      q: '글 A에서 대명사와 지시어(it, such skills, its, These suckers)가 각각 무엇을 가리키는지 찾아보십시오.\n\n' + OCTOPUS,
      steps: [
        '둘째 문장의 **This clever creature**는 첫 문장의 the octopus를 바꿔 부른 재진술입니다.',
        '셋째 문장의 **such skills**는 앞 문장에 나온 여러 예(병 열기, 간단한 퍼즐 풀기, 수조 탈출)를 한데 묶어 가리킵니다.',
        '같은 문장의 **it**(help it find food)은 단수이고, 먹이를 찾는 주체이므로 the octopus입니다.',
        '넷째 문장의 **it**도 an octopus입니다. 바로 앞의 bones는 복수라서 it이 될 수 없습니다.',
        '**Its** eight arms의 Its도 문어의 것이고, **These suckers**는 바로 앞 문장 끝의 suckers를 다시 받아 이어 줍니다.',
      ],
      answer: 'This clever creature, it, Its → the octopus / such skills → 병 열기·퍼즐 풀기·탈출하기 / These suckers → 문어 다리의 빨판',
    },
    {
      q: '글 C에서 전체 흐름과 관계없는 문장을 찾아보십시오.\n\n' + HONEY,
      steps: [
        '첫 문장에서 주제를 정합니다: 꿀이 오랫동안 상하지 않는다(그 까닭).',
        '(B) 물이 아주 적어서 → 까닭 ①. (C) 세균은 물이 있어야 자라므로 그런 마른 음식에서 살 수 없다 → (B)를 풀어 줌. (E) 약한 산성이라 세균을 막는다 → 까닭 ②.',
        '(D) 많은 사람이 설탕 대신 꿀을 차에 넣는다 → honey라는 낱말은 같지만 "상하지 않는 까닭"과 관계가 없습니다.',
        '(D)를 빼고 (C) → (E)를 이어 읽으면 "또한(also) 산성이라…"로 까닭이 자연스럽게 이어집니다.',
      ],
      answer: '(D)',
    },
  ],

  terms: [
    { term: '대명사', def: '앞에 나온 명사를 대신하는 말입니다. 예: it, they, them, its, their' },
    { term: '지시어', def: '앞에 나온 낱말이나 내용을 가리키는 말입니다. 예: this, that, these, those, such' },
    { term: '지시 대상', def: '대명사나 지시어가 가리키는 대상입니다. 수(단수·복수)와 뜻이 맞아야 합니다.' },
    { term: '재진술', def: '같은 대상을 다른 말로 바꿔 부르는 것입니다. 예: the octopus → this clever creature' },
    { term: '통일성', def: '글의 모든 문장이 하나의 주제를 뒷받침하는 성질입니다. 주제와 관계없는 문장이 있으면 통일성이 깨집니다.' },
    { term: '연결어', def: '앞뒤 문장의 관계를 알려 주는 말입니다. 예: However(반대), For example(예시), As a result(결과), In addition(덧붙임)' },
    { term: 'such', def: '"그런, 이와 같은"이라는 뜻의 지시어로, 앞에서 말한 종류의 것을 가리킵니다. 여러 예를 한데 묶을 때 자주 씁니다. 예: such skills' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '밑줄 친 __They__가 가리키는 것은 무엇입니까?\n\nMy grandparents have a small farm in the country. __They__ grow apples and pears there.',
      choices: ['my grandparents', 'a small farm', 'the country', 'apples and pears'],
      answer: 0,
      why: [
        '',
        'a small farm은 단수라 They로 가리킬 수 없고, 농장이 과일을 기를 수도 없습니다.',
        'the country는 단수이고, 시골이 과일을 기르는 것이 아닙니다.',
        'apples and pears는 They가 기르는 대상(목적어)입니다. 자기가 자기를 기를 수는 없습니다.',
      ],
      explain: '복수이면서 과일을 기를 수 있는 대상은 **my grandparents**입니다. 넣어 보면 "조부모님이 그곳에서 사과와 배를 기르신다"가 됩니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '글 A의 셋째 문장 Scientists believe that such skills help __it__ find food에서 밑줄 친 __it__이 가리키는 것은 무엇입니까?\n\n' + OCTOPUS,
      choices: ['the octopus', 'its tank', 'food', 'a jar'],
      answer: 0,
      why: [
        '',
        '수조는 먹이를 찾을 수 없습니다. 뜻을 넣어 확인해 보십시오.',
        'food는 it이 찾는 대상입니다. 자기가 자기를 찾는 것은 말이 되지 않습니다.',
        '병은 문어가 여는 물건입니다. 먹이를 찾는 주체가 아닙니다.',
      ],
      explain: '먹이를 찾고 위험을 피하는 단수의 주체는 **the octopus**입니다. such skills(그런 능력)가 문어가 먹이를 찾도록 돕는다는 뜻입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '글 A에서 __such skills__가 가리키는 것은 무엇입니까?\n\n' + OCTOPUS,
      choices: [
        '병을 열고, 간단한 퍼즐을 풀고, 수조를 빠져나가는 능력',
        '뼈가 없어 작은 구멍을 지나가는 능력',
        '빨판으로 맛을 보는 능력',
        '바다에서 가장 빠르게 헤엄치는 능력',
      ],
      answer: 0,
      why: [
        '',
        '뼈가 없다는 이야기는 such skills보다 뒤(넷째 문장)에 나옵니다. 지시어는 대개 앞을 가리킵니다.',
        '빨판 이야기는 맨 끝에 나옵니다. such skills가 가리킬 수 없습니다.',
        '글에 나오지 않는 내용입니다.',
      ],
      explain: '**such**(그런)는 바로 앞 문장에서 말한 능력, 곧 open jars, solve simple puzzles, escape from its tank를 한데 묶어 가리킵니다.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: '"Some people leave their car engines running while they wait. This wastes fuel and pollutes the air."에서 This는 앞 문장의 내용 전체(기다리는 동안 자동차 시동을 켜 두는 것)를 가리킨다.',
      answer: true,
      explain: '연료를 낭비하고 공기를 오염시키는 것은 "기다리는 동안 시동을 켜 두는 것"입니다. 혼자 쓰인 **This**는 이처럼 앞 문장의 내용 전체를 가리키는 경우가 많습니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '글 D에서 smartphones를 바꿔 부른 말이 **아닌** 것은 무엇입니까?\n\n' + PHONES,
      choices: ['friends', 'these small devices', 'the handy gadgets', 'the machines'],
      answer: 0,
      why: [
        '',
        '스마트폰을 "이 작은 기기들"로 바꿔 부른 재진술입니다.',
        '스마트폰을 "그 편리한 기기들"로 바꿔 부른 재진술입니다.',
        '침실 밖에 두는 것은 스마트폰이므로, the machines도 스마트폰을 바꿔 부른 말입니다.',
      ],
      explain: '**friends**는 스마트폰으로 함께 이야기하는 사람들입니다. 나머지 셋(these small devices, the handy gadgets, the machines)은 모두 smartphones를 되풀이하지 않으려고 바꿔 부른 말입니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '글 C에서 전체 흐름과 관계**없는** 문장은 무엇입니까?\n\n' + HONEY,
      choices: ['(B)', '(C)', '(D)', '(E)'],
      fixed: true,
      answer: 2,
      why: [
        '(B)는 꿀이 오래가는 첫 번째 까닭(물이 아주 적다)입니다.',
        '(C)는 물이 적으면 왜 세균이 살 수 없는지 (B)를 풀어 줍니다.',
        '',
        '(E)는 꿀이 오래가는 또 다른 까닭(약한 산성)입니다.',
      ],
      explain: '글의 주제는 "꿀이 오랫동안 상하지 않는 까닭"입니다. (D) 차에 설탕 대신 꿀을 넣는다는 문장은 honey라는 낱말만 같을 뿐 그 까닭과 관계가 없습니다.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 two notebooks를 가리키는 인칭대명사 한 개를 쓰십시오.\n\nJiho bought two notebooks yesterday. [[빈칸]] were blue and very thin.',
      answer: ['they'],
      wrong: [
        { a: 'it', why: '가리키는 대상 two notebooks는 복수입니다. 또 동사가 were이므로 복수 대명사 They를 씁니다.' },
        { a: 'he', why: '파란색이고 얇은 것은 지호가 아니라 공책입니다.' },
        { a: 'them', why: 'them은 목적어 자리에 쓰는 꼴입니다. 문장의 주어 자리이므로 They를 씁니다.' },
      ],
      explain: '파랗고 얇은 것은 **two notebooks**(복수)이고, 빈칸은 주어 자리이므로 **They**를 씁니다. 동사 were도 복수 주어와 어울립니다.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 4,
      q: '다음 문장 바로 뒤에 이어질 문장으로 가장 자연스러운 것은 무엇입니까?\n\nMany cities are planting more trees along their streets.',
      choices: [
        'These trees give shade and help keep the streets cool in summer.',
        'However, trees give shade and help keep the streets cool in summer.',
        'For example, many cities have stopped planting trees.',
        'Such buildings are usually very tall and made of glass.',
      ],
      answer: 0,
      why: [
        '',
        'However는 앞과 반대되는 내용을 이끄는데, 그늘을 준다는 것은 나무를 심는 것과 반대되는 내용이 아닙니다.',
        'For example 뒤에는 앞 문장의 예가 와야 하는데, 오히려 앞 문장과 반대되는 내용입니다.',
        'Such buildings가 가리킬 건물이 앞 문장에 없습니다.',
      ],
      hint: '연결어의 뜻과, 앞을 가리키는 말의 대상이 앞 문장에 있는지 확인하십시오.',
      explain: '**These trees**가 앞 문장의 trees를 받아 이어 주고, 나무를 심는 까닭(그늘, 시원함)을 덧붙여 흐름이 자연스럽습니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nSome animals change color to stay safe. [[빈칸]], an arctic fox has white fur in winter and brown fur in summer.',
      choices: ['For example', 'However', 'As a result', 'In contrast'],
      answer: 0,
      why: [
        '',
        'However는 앞과 반대되는 내용을 이끕니다. 북극여우 이야기는 앞 문장과 반대가 아닙니다.',
        '북극여우의 털 색이 바뀌는 것은 앞 문장의 결과가 아니라 앞 문장의 한 예입니다.',
        'In contrast는 대조를 나타냅니다. 북극여우는 앞 문장과 대조되는 예가 아닙니다.',
      ],
      explain: '앞 문장(어떤 동물은 몸 색을 바꿔 안전하게 지낸다)의 **구체적인 예**로 북극여우가 나오므로 **For example**이 알맞습니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 2,
      q: '다음 글에서 밑줄 친 부분 가운데 가리키는 대상이 **나머지와 다른** 것은 무엇입니까?\n\nEvery night, __the Moon__ looks a little different. __Earth\'s only natural satellite__ does not make its own light. Instead, __this rocky world__ reflects light from __the Sun__.',
      choices: ['the Sun', 'the Moon', 'Earth\'s only natural satellite', 'this rocky world'],
      answer: 0,
      why: [
        '',
        '글의 화제인 달입니다.',
        '"지구의 하나뿐인 자연 위성"은 달을 바꿔 부른 말입니다.',
        '"이 암석으로 된 천체"는 달을 바꿔 부른 말입니다. 빛을 반사하는 주체가 달이기 때문입니다.',
      ],
      hint: '스스로 빛을 내지 않고 빛을 반사하는 것은 무엇인지, 빛을 주는 것은 무엇인지 나누어 보십시오.',
      explain: 'the Moon → Earth\'s only natural satellite → this rocky world는 모두 **달**을 바꿔 부른 재진술입니다. **the Sun**(태양)은 달이 반사하는 빛을 내는 다른 천체입니다.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'text', concept: 1,
      q: '빈칸에 알맞은 지시어 한 낱말을 쓰십시오. (s로 시작합니다.)\n\nSome people throw trash out of car windows or leave it on the beach. [[빈칸]] behavior is harmful to wild animals.',
      answer: ['such'],
      wrong: [
        { a: 'so', why: 'so는 명사 앞에서 "그런"이라는 뜻으로 쓰지 않습니다. 명사(behavior) 앞에서 "그런 ~"은 such입니다.' },
        { a: 'some', why: 'some behavior는 "어떤 행동"이라는 뜻이라 앞의 두 행동을 가리키지 못합니다.' },
      ],
      explain: '**Such** behavior는 "그런 행동"이라는 뜻으로, 앞에 나온 두 행동(차창 밖으로 쓰레기 던지기, 해변에 쓰레기 버려두기)을 한데 묶어 가리킵니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 3,
      q: '글 B에서 주제에서 벗어난 문장을 빼면, 원래는 떨어져 있다가 **새로 바로 이어지게 되는** 두 문장은 무엇입니까?\n\n' + WALK,
      choices: ['(3)과 (5)', '(2)와 (3)', '(4)와 (5)', '(1)과 (2)'],
      answer: 0,
      why: [
        '',
        '(2)와 (3)은 처음부터 맞닿아 있습니다. 빠지는 문장은 둘 사이에 있지 않습니다.',
        '(4)는 주제에서 벗어나 빠지는 문장입니다.',
        '(1)과 (2)는 처음부터 이어져 있습니다.',
      ],
      hint: '먼저 주제에서 벗어난 문장을 찾으십시오.',
      explain: '주제(걸어서 등교하기의 좋은 점)에서 벗어난 문장은 (4) 학교 버스 색깔입니다. (4)를 빼면 (3) 친구와 이야기한다 → (5) Most of all(무엇보다도) 잠이 깨고 공부할 준비가 된다로 자연스럽게 이어집니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      q: '밑줄 친 __This__가 가리키는 것으로 가장 알맞은 것은 무엇입니까?\n\nBees visit flowers to collect nectar. While they are doing so, pollen sticks to their bodies, and they carry it to the next flower. __This__ helps the plants make seeds.',
      choices: [
        '벌이 꽃가루를 몸에 묻혀 다른 꽃으로 옮기는 것',
        '벌이 꽃꿀을 모으는 것',
        '꽃가루 그 자체',
        '꽃이 씨앗을 만드는 것',
      ],
      answer: 0,
      why: [
        '',
        '꽃꿀을 모으는 것은 벌이 꽃을 찾는 까닭일 뿐, 식물이 씨앗을 만들도록 돕는 일은 꽃가루를 옮기는 것입니다.',
        'This는 낱말 하나(pollen)보다 바로 앞 문장의 일(꽃가루를 옮기는 것) 전체를 가리킵니다.',
        '씨앗을 만드는 것은 This가 돕는 결과입니다. 자기가 자기를 돕는다는 말이 됩니다.',
      ],
      hint: '"식물이 씨앗을 만들도록 돕는 일"이 무엇인지 바로 앞 문장에서 찾아 "~하는 것"으로 바꿔 보십시오.',
      explain: '바로 앞 문장의 내용 전체, 곧 **벌이 꽃가루를 몸에 묻혀 다음 꽃으로 옮기는 것**이 식물이 씨앗을 만들도록 돕습니다. 혼자 쓰인 This는 낱말보다 앞 문장의 일을 가리키는 경우가 많습니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 3,
      q: '다음 글에서 전체 흐름과 관계**없는** 문장은 무엇입니까?\n\n(A) Cats sleep for about 12 to 16 hours a day. (B) In the wild, their relatives hunt, and hunting uses a lot of energy in short bursts. (C) Sleeping for long hours helps cats save energy for these bursts. (D) Some cats like to sleep in boxes, while others prefer soft beds. (E) Even pet cats, which do not need to hunt, still follow this natural pattern.',
      choices: ['(A)', '(B)', '(C)', '(D)', '(E)'],
      fixed: true,
      answer: 3,
      why: [
        '(A)는 글의 화제(고양이가 오래 잔다)를 소개합니다.',
        '(B)는 오래 자는 까닭의 배경(사냥에 짧고 강한 힘이 든다)입니다.',
        '(C)는 오래 자는 까닭을 직접 밝힙니다. these bursts가 (B)의 short bursts를 받습니다.',
        '',
        '(E)는 집고양이도 그 습성(this natural pattern)을 따른다고 마무리합니다.',
      ],
      hint: '이 글이 고양이의 잠에 대해 "무엇"을 말하는 글인지 한 구절로 정해 보십시오.',
      explain: '주제는 "고양이가 오래 자는 **까닭**"입니다. (D) 상자나 푹신한 침대 중 어디서 자기를 좋아하는가는 sleep이라는 낱말이 겹쳐 그럴듯하지만 오래 자는 까닭과는 관계가 없습니다. (D)를 빼면 (C) → (E)가 this natural pattern으로 자연스럽게 이어집니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '다음 글에서 앞뒤 흐름이 **논리적으로 맞지 않는** 문장은 무엇입니까?\n\n(A) Our town library used to close at 6 p.m. (B) Many students said they had no time to visit after their classes. (C) To solve this, the library now stays open until 9 p.m. (D) As a result, fewer students are able to use the library after school. (E) The librarians say the reading room is busiest between 7 and 8 p.m.',
      choices: ['(A)', '(B)', '(C)', '(D)', '(E)'],
      fixed: true,
      answer: 3,
      why: [
        '(A)는 문제의 배경(6시에 문을 닫았다)입니다.',
        '(B)는 문제(방과 후에 갈 시간이 없다)입니다. (C)의 this가 이 문제를 가리킵니다.',
        '(C)는 문제에 대한 해결책(9시까지 연다)으로 자연스럽습니다.',
        '',
        '(E)는 저녁 7~8시가 가장 붐빈다는 것으로, 늦게 연 덕분에 학생이 많이 온다는 흐름에 맞습니다.',
      ],
      hint: 'As a result 뒤의 내용이 앞의 해결책에서 나올 수 있는 결과인지 따져 보십시오.',
      explain: '도서관을 9시까지 연 **결과**라면 방과 후에 이용하는 학생이 **늘어나야**(more students) 합니다. (D)는 fewer라고 해 앞뒤가 어긋나고, 저녁에 가장 붐빈다는 (E)와도 맞지 않습니다.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'text', concept: 0,
      q: '밑줄 친 두 개의 __it__이 공통으로 가리키는 것을 글에서 찾아 영어 낱말 한 개로 쓰십시오.\n\nThe museum has a famous painting of a ship. Visitors often stand in front of __it__ for a long time because __it__ shows the stormy sea in great detail.',
      answer: ['painting', 'the painting', 'a painting'],
      wrong: [
        { a: 'ship', why: '사람들이 오래 서서 보는 것, 그리고 폭풍 치는 바다를 자세히 보여 주는 것은 배가 아니라 배를 그린 그림입니다.' },
        { a: 'museum', why: '박물관 "앞에" 서서 본다거나 박물관이 바다를 자세히 보여 준다는 것은 뜻이 맞지 않습니다.' },
        { a: 'sea', why: 'the stormy sea는 it이 보여 주는 대상입니다. 자기가 자기를 보여 줄 수는 없습니다.' },
      ],
      hint: '두 자리에 후보를 하나씩 넣어 보십시오. 두 문장 모두 말이 되는 것이 답입니다.',
      explain: '관람객이 그 앞에 오래 서 있고, 폭풍 치는 바다를 자세히 보여 주는 것은 **painting**(그림)입니다. a ship은 가장 가까운 명사지만, 그림 속 배가 바다를 "보여 준다"는 것은 뜻이 맞지 않습니다.',
    },
  ],

  deeper: [
    {
      title: '글을 하나로 묶는 실: 응집성',
      body: '한 편의 글이 문장들의 단순한 모음이 아니라 하나의 글로 느껴지는 것은 문장 사이를 묶는 **실**이 있기 때문입니다. 이것을 **응집성(cohesion)**이라고 합니다.\n\n' +
        '이 단원에서 배운 것들이 모두 그 실입니다.\n\n' +
        '- **대명사·지시어**: it, they, this, such가 앞 문장과 뒤 문장을 붙잡아 맵니다.\n' +
        '- **재진술**: the octopus → this clever creature처럼 같은 대상을 이어 갑니다.\n' +
        '- **연결어**: However, For example이 문장 사이의 관계를 알려 줍니다.\n\n' +
        '그리고 **통일성**은 그 실로 묶인 문장들이 모두 **한 방향(주제)**을 향하게 합니다. 실(응집성)과 방향(통일성)이 함께 갖춰져야 흐름이 좋은 글이 됩니다. 영어 글을 쓸 때도 이 두 가지를 점검해 보십시오.',
    },
    {
      title: '가리키는 말이 애매할 때 글쓴이가 하는 일',
      body: '좋은 글쓴이는 대명사가 **둘 이상을 가리킬 수 있는 자리**를 피합니다. 예를 들어 "Its eight arms are covered with suckers, and they can taste things."라고 쓰면 they가 arms인지 suckers인지 헷갈립니다. 그래서 글 A에서는 문장을 나누고 **These suckers**라고 명사를 다시 써서 분명히 했습니다.\n\n' +
        '여러분이 영어로 글을 쓸 때도 대명사가 애매하면 **명사를 다시 쓰거나, this + 명사**로 바꾸어 보십시오. 반대로 읽을 때 애매한 대명사를 만나면, 수와 뜻에 더해 **글 전체의 화제**(이 글은 무엇에 대한 글인가)를 기준으로 삼으면 대개 풀립니다.',
    },
  ],

  faq: [
    {
      q: '대명사는 무조건 바로 앞 명사를 가리키나요?',
      a: '아닙니다. 가까운 명사부터 살펴보는 것은 좋은 출발이지만, 수(단수·복수)와 뜻이 맞지 않으면 더 앞으로 가야 합니다. An octopus has no bones, so it can squeeze …에서 it 바로 앞은 bones지만 답은 an octopus입니다.',
    },
    {
      q: 'this랑 it은 뭐가 달라요?',
      a: 'it은 주로 앞에 나온 명사 하나를 가리킵니다. this는 명사 하나를 가리킬 수도 있지만, 앞 문장의 내용 전체(~하는 것)를 가리키는 경우가 많습니다. Many students skip breakfast. This can make them tired.의 This는 "아침을 거르는 것"입니다.',
    },
    {
      q: '흐름과 관계없는 문장은 어떻게 빨리 찾아요?',
      a: '첫 문장에서 주제를 한 구절로 정한 다음, 낱말이 아니라 내용이 그 주제를 뒷받침하는지 문장마다 확인하십시오. 끼어든 문장은 주제와 같은 낱말(school, honey, sleep)을 담고 있어 그럴듯해 보이는 경우가 많습니다. 고른 문장을 빼고 앞뒤를 이어 읽어 보면 확인할 수 있습니다.',
    },
  ],

  mistakes: [
    '대명사를 무조건 가장 가까운 명사로 읽는 실수 — 수(it은 단수, they는 복수)와 뜻을 넣어 확인합니다.',
    '혼자 쓰인 This를 앞 문장의 낱말 하나로 읽는 실수 — 앞 문장의 내용 전체(~하는 것)를 가리키는 경우가 많습니다.',
    '주제와 같은 낱말이 들어 있다고 흐름에 맞는 문장으로 보는 실수 — 낱말이 아니라 내용이 주제를 뒷받침하는지 봅니다.',
  ],

  vocab: [
    { w: 'refer to', m: '~을 가리키다, 언급하다', ex: 'What does "it" refer to in this sentence?', exm: '이 문장에서 "it"은 무엇을 가리킵니까?' },
    { w: 'mention', m: '언급하다, 말하다', ex: 'The writer mentions three reasons.', exm: '글쓴이는 세 가지 까닭을 언급합니다.' },
    { w: 'creature', m: '생물, 동물', ex: 'This tiny creature lives under rocks.', exm: '이 작은 생물은 바위 밑에 삽니다.' },
    { w: 'clever', m: '영리한', ex: 'The clever dog opened the gate by itself.', exm: '그 영리한 개는 혼자서 문을 열었습니다.' },
    { w: 'escape', m: '탈출하다, 빠져나가다', ex: 'The bird escaped from its cage.', exm: '새가 새장에서 빠져나갔습니다.' },
    { w: 'squeeze', m: '비집고 들어가다; 짜다', ex: 'The cat squeezed through the gap in the fence.', exm: '고양이가 울타리 틈으로 비집고 지나갔습니다.' },
    { w: 'device', m: '기기, 장치', ex: 'Please turn off all electronic devices.', exm: '모든 전자 기기를 꺼 주십시오.' },
    { w: 'topic', m: '주제, 화제', ex: 'The topic of today\'s talk is healthy sleep.', exm: '오늘 강연의 주제는 건강한 잠입니다.' },
    { w: 'relevant', m: '관련 있는', ex: 'Only include relevant details in your report.', exm: '보고서에는 관련 있는 세부 사항만 넣으십시오.' },
    { w: 'irrelevant', m: '관련 없는', ex: 'His answer was interesting but irrelevant to the question.', exm: '그의 대답은 흥미로웠지만 질문과 관련이 없었습니다.' },
    { w: 'logical', m: '논리적인', ex: 'Her plan is clear and logical.', exm: '그녀의 계획은 분명하고 논리적입니다.' },
    { w: 'connect', m: '잇다, 연결하다', ex: 'This bridge connects the two villages.', exm: '이 다리는 두 마을을 잇습니다.' },
    { w: 'reflect', m: '반사하다; 반영하다', ex: 'The lake reflects the blue sky.', exm: '호수가 파란 하늘을 비춥니다(반사합니다).' },
    { w: 'behavior', m: '행동', ex: 'Good behavior in class helps everyone learn.', exm: '수업 시간의 바른 행동은 모두의 배움을 돕습니다.' },
  ],
});
})();
