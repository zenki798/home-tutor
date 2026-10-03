/* 공통영어1 · 경험 쓰기와 고쳐 쓰기
 * 예시 글·예문은 모두 직접 쓴 글이다(가상의 인물). */
(function () {
  // 경험 글 견본 (직접 쓴 글)
  var LIBRARY = 'Last summer, I volunteered at a small library near my house for two weeks. First, I sorted the returned books and put them back on the shelves. Then I helped young children find picture books. After that, I read stories aloud to them every afternoon. At first, I was nervous because the children kept moving around. Soon, however, they began to listen carefully. Finally, on my last day, a little girl gave me a thank-you card. I realized that small acts of kindness can make someone happy. It taught me the joy of helping others. I\'m planning to volunteer there again next summer.';
  // 고쳐 쓰기 연습용 초고 (일부러 틀린 곳을 넣은 글)
  var HIKE = 'Last spring, my friends and I **goes** hiking on a mountain near our town. We **climbs** to the top and **ate** kimbap together. The view from the top was **beatiful**.';
  var CAMP = 'Last weekend, my family went camping near a lake. We set up our tent and cooked dinner over a small fire. After dinner, my brother and I look at the stars for a long time. It was the best night of the summer.';

Tutor.registerUnit({
  id: 'eng-h-c1-07',
  course: 'eng-h-c1',
  title: '경험 쓰기와 고쳐 쓰기',
  summary: '겪은 일을 시간 순서로 쓰고 느낀 점과 계획을 덧붙인 뒤, 시제와 표현을 점검해 고쳐 씁니다.',
  goals: [
    'first, then, after that, finally 같은 연결어로 겪은 일을 시간 순서대로 쓸 수 있다.',
    '지난 경험을 쓴 글에서 시제를 과거로 일관되게 유지할 수 있다.',
    'I realized that ~, It taught me ~, I\'m planning to ~ 로 느낀 점과 앞으로의 계획을 덧붙일 수 있다.',
    '시제·주어와 동사의 수 일치·철자·같은 낱말 반복을 점검해 글을 고쳐 쓸 수 있다.',
  ],
  standards: ['[10공영1-02-03]', '[10공영1-02-06]'],

  concepts: [
    {
      title: '경험 글의 짜임과 시간 순서 연결어',
      body: '경험을 쓰는 글은 보통 다음 순서로 짭니다.\n\n1. **언제·어디서·무엇을** 했는지 소개 (Last summer, I volunteered at ~)\n2. 겪은 일을 **일어난 순서대로** (First → Then → After that → Finally)\n3. **느낀 점·배운 점** (I realized that ~)\n4. **앞으로의 계획** (I\'m planning to ~)\n\n시간 순서를 보여 주는 연결어는 문장 맨 앞에 두고, 대개 쉼표를 찍습니다.\n\n| 연결어 | 뜻 | 자리 |\n|---|---|---|\n| **First** | 먼저, 첫째로 | 처음 한 일 |\n| **Then** / **Next** | 그다음에 | 이어서 한 일 |\n| **After that** | 그 후에 | 앞의 일이 끝난 뒤 |\n| **Finally** | 마지막으로, 마침내 | 마지막에 한 일 |\n\n> ⚠️ **At first**는 "처음에는 (그랬지만 나중에는 달라졌다)"라는 뜻입니다. 순서를 매기는 First와 다릅니다. At first, I was nervous. (처음에는 긴장했다 → 나중에는 괜찮아졌다)',
      easy: '연결어는 요리 순서를 알려 주는 번호표와 같습니다. 라면 끓이는 법을 말할 때 "먼저 물을 끓이고, 그다음 면을 넣고, 그 후에 수프를 넣고, 마지막으로 달걀을 넣는다"라고 하지요.\n\n영어로 바꾸면 **First**, **Then**, **After that**, **Finally**입니다. 이 번호표만 붙여도 읽는 사람이 순서를 헷갈리지 않습니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nFirst, we bought the tickets. Then we found our seats. [[blank]], the movie started and we enjoyed it.',
        choices: ['Finally', 'First', 'At first'],
        answer: 0,
        why: ['', 'First는 처음 한 일에 씁니다. 이미 앞 문장에서 First를 썼고, 이 문장은 마지막 일입니다.', 'At first는 "처음에는 (그랬지만)"이라는 뜻으로, 나중에 달라진 일과 대비할 때 씁니다.'],
        explain: '표를 사고(First) → 자리를 찾고(Then) → 마지막으로 영화가 시작된 순서이므로 **Finally**가 알맞습니다.',
      },
    },
    {
      title: '한 글 안에서 시제를 일관되게 쓰기',
      body: '이미 지난 경험을 쓰는 글은 **과거 시제로 일관되게** 씁니다. Last summer, Yesterday, Two weeks ago 처럼 지난 때를 밝혔다면 그 뒤의 동사도 모두 과거형입니다.\n\n✗ Yesterday, I **go** to the park and **saw** my friend.\n○ Yesterday, I **went** to the park and **saw** my friend.\n\n과거형이 불규칙한 동사는 따로 익혀 둡니다.\n\n| 동사 | 과거형 | 동사 | 과거형 |\n|---|---|---|---|\n| go | **went** | buy | **bought** |\n| eat | **ate** | bring | **brought** |\n| take | **took** | teach | **taught** |\n| make | **made** | feel | **felt** |\n\n다만 **지금도 사실인 것**은 현재 시제를 씁니다. I visited Jeju last year. It **is** a beautiful island. (제주도가 아름다운 것은 지금도 사실)\n\n> 💡 yesterday, last ~, ~ ago 처럼 **지난 때를 콕 집는 말**은 현재완료(have p.p.)와 함께 쓰지 않습니다. I **have visited** Jeju last year. (✗) → I **visited** Jeju last year. (○)',
      easy: '일기를 쓸 때 "어제 나는 공원에 간다. 그리고 친구를 만났다."라고 쓰면 어색하지요? 영어도 같습니다. 이야기가 "어제"에 머물러 있으면 동사도 모두 "어제"의 모양, 곧 과거형을 입어야 합니다.\n\n글을 다 쓴 뒤 동사에만 동그라미를 쳐 보십시오. 과거 이야기 속에 현재형이 섞여 있으면 바로 눈에 띕니다.',
      check: {
        type: 'ox',
        q: 'Last Sunday, I visit my grandmother and helped her in the garden. 은 시제가 바르게 쓰인 문장이다.',
        answer: false,
        explain: 'Last Sunday는 지난 때이므로 visit도 과거형 **visited**로 써야 합니다. 뒤의 helped와 시제를 맞춥니다. → Last Sunday, I visited my grandmother and helped her in the garden.',
      },
    },
    {
      title: '느낀 점과 배운 점 표현하기',
      body: '경험 글은 "무엇을 했다"로 끝나지 않고, 그 경험에서 **느끼고 배운 것**을 덧붙일 때 힘이 생깁니다.\n\n| 표현 | 뜻 | 뒤에 오는 말 |\n|---|---|---|\n| **I realized that** ~ | ~라는 것을 깨달았다 | 주어 + 동사 |\n| **I learned that** ~ | ~라는 것을 배웠다 | 주어 + 동사 |\n| **It taught me** ~ | 그것은 나에게 ~을 가르쳐 주었다 | 명사 / to부정사 / that절 |\n| **I felt** ~ | ~라고 느꼈다 | 형용사 (proud, thankful …) |\n\nI **realized that** practice is more important than talent.\nThe trip **taught me the importance of** teamwork.\nIt **taught me to be** more patient with others.\n\n> 💡 teach는 **teach + 사람 + to부정사**(~에게 …하는 것을 가르치다)로 씁니다. It taught me **being** patient. (✗) → It taught me **to be** patient. (○)\n\n> 💡 realized that 뒤의 내용이 **지금도 변함없는 사실**이면 현재 시제로 써도 됩니다. I realized that small acts of kindness **can** make someone happy.',
      easy: '친구에게 여행 이야기를 하고 나서 "그래서 어땠는데?"라는 질문을 받는다고 생각해 보십시오. 그 대답이 바로 느낀 점입니다.\n\n- 새로 알게 된 것 → **I realized that** ~ / **I learned that** ~\n- 그 일이 나를 가르쳐 준 것 → **It taught me** ~\n\n이 두 틀만 기억해도 경험 글의 마무리가 훨씬 단단해집니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nThe soccer match taught me [[blank]] my teammates.',
        choices: ['to trust', 'trusting', 'trust'],
        answer: 0,
        why: ['', 'teach + 사람 뒤에는 to부정사를 씁니다. taught me trusting 은 틀린 꼴입니다.', 'teach + 사람 뒤에 동사원형을 바로 쓰지 않습니다. to를 붙여야 합니다.'],
        explain: '**teach + 사람 + to부정사**이므로 taught me **to trust** my teammates(팀 동료를 믿는 것을 가르쳐 주었다)가 됩니다.',
      },
    },
    {
      title: '앞으로의 계획 덧붙이기',
      body: '느낀 점 뒤에 **앞으로 하고 싶은 일**을 한 문장 덧붙이면 글이 자연스럽게 마무리됩니다.\n\n| 표현 | 뜻 |\n|---|---|\n| **I\'m planning to** + 동사원형 | ~할 계획이다 |\n| **I hope to** + 동사원형 | ~하기를 바란다 |\n| **I\'m going to** + 동사원형 | ~할 것이다 (정해 둔 계획) |\n| **I will** + 동사원형 | ~하겠다 (다짐) |\n| **I\'m looking forward to** + **-ing** | ~하기를 고대한다 |\n\nI\'m planning to **join** a volunteer club next semester.\nI hope to **visit** the library again someday.\n\n> ⚠️ plan과 hope는 뒤에 **to부정사**를 씁니다. I hope **seeing** you again. (✗) → I hope **to see** you again. (○)\n\n> ⚠️ look forward to의 to는 전치사라서 뒤에 **-ing**가 옵니다. I\'m looking forward to **meet** you. (✗) → I\'m looking forward to **meeting** you. (○)',
      easy: '계획 문장은 "앞으로"를 향한 화살표입니다. plan(계획하다)과 hope(바라다)는 아직 하지 않은 일을 가리키므로, "앞으로 ~할"이라는 느낌의 **to**를 붙여 to + 동사원형으로 씁니다.\n\nI\'m planning **to** join ~ = "~에 가입하는 쪽으로 계획하고 있다"',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nI enjoyed the cooking class a lot. I\'m planning [[blank]] another class next month.',
        choices: ['to take', 'taking', 'took'],
        answer: 0,
        why: ['', 'plan 뒤에는 to부정사를 씁니다. planning taking 은 틀린 꼴입니다.', 'took은 과거형 동사입니다. 앞으로의 계획에는 to + 동사원형을 씁니다.'],
        explain: '**plan + to부정사**이므로 I\'m planning **to take** another class(수업을 하나 더 들을 계획이다)가 알맞습니다.',
      },
    },
    {
      title: '고쳐 쓰기 ① 주어와 동사의 수 일치',
      body: '초고를 다 쓰면 **고쳐 쓰기(revising)**를 합니다. 먼저 주어와 동사의 **수 일치**를 봅니다. 주어가 3인칭 단수이면 현재 시제 동사에 -s를 붙이고, be동사는 is(과거는 was)를 씁니다.\n\n수 일치에서 자주 틀리는 곳은 **주어가 길 때**입니다. 진짜 주어(핵심 명사)를 찾아 그 수에 맞춥니다.\n\n| 문장 | 진짜 주어 | 동사 |\n|---|---|---|\n| **One** of my friends ___ in Busan. | One (하나) | **lives** |\n| **Each** of the students ___ a locker. | Each (각각) | **has** |\n| The **books** on the desk ___ mine. | books (여럿) | **are** |\n| **Everyone** in my class ___ music. | Everyone (단수 취급) | **likes** |\n| The **number** of visitors ___ increasing. | number (수, 하나) | **is** |\n\n> 💡 of ~, on the desk, in my class 처럼 주어 뒤에 붙은 말은 괄호로 묶어 지우고 봅니다. One (of my friends) **lives** in Busan.\n\n> 💡 a number of + 복수 명사는 "많은 ~"이라는 뜻이라 복수 동사를 씁니다. A number of students **are** absent.',
      easy: '긴 주어는 "짐을 든 사람"과 같습니다. One of my friends는 "친구들을 데리고 온 **한 사람**"이지, 친구들 여럿이 아닙니다. 동사는 짐(of my friends)이 아니라 **사람(One)**을 보고 정합니다.\n\n그래서 주어에 연필로 괄호를 쳐서 꾸미는 말을 지워 보면, 남는 낱말 하나가 동사의 짝이 됩니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nThe students in my class [[blank]] very friendly.',
        choices: ['are', 'is', 'be'],
        answer: 0,
        why: ['', 'class(단수)를 보고 is를 골랐습니다. in my class는 꾸미는 말이고, 진짜 주어는 The students(복수)입니다.', 'be는 동사원형이라 주어 바로 뒤에서 그대로 쓰지 않습니다.'],
        explain: '진짜 주어는 **The students**(복수)이고 in my class는 꾸미는 말입니다. 그래서 **are**를 씁니다.',
      },
    },
    {
      title: '고쳐 쓰기 ② 철자와 같은 낱말 반복',
      body: '수 일치와 시제를 본 뒤에는 **철자**와 **같은 낱말의 반복**을 점검합니다.\n\n**자주 틀리는 철자**\n\n| 틀리기 쉬운 꼴 | 바른 철자 | 뜻 |\n|---|---|---|\n| beatiful | **beautiful** | 아름다운 |\n| untill | **until** | ~까지 |\n| recieve | **receive** | 받다 |\n| tommorow | **tomorrow** | 내일 |\n| freind | **friend** | 친구 |\n| beleive | **believe** | 믿다 |\n\n**같은 낱말 반복 줄이기**: 같은 명사가 계속 나오면 **대명사(it, they)**나 장소를 가리키는 **there**로 바꾸거나 두 문장을 **and로 합칩니다.** 같은 형용사(very good, very good …)가 반복되면 더 알맞은 낱말(amazing, helpful, delicious)로 바꿉니다.\n\nThe museum was big. **The museum** had many old maps. I liked **the museum**.\n→ The museum was big **and** had many old maps. I liked **it**.\n\n**고쳐 쓰기 점검표**\n\n1. 시제가 일관된가? (지난 일 → 과거형)\n2. 주어와 동사의 수가 맞는가?\n3. 철자가 바른가?\n4. 같은 낱말이 너무 자주 반복되지 않는가?',
      easy: '고쳐 쓰기는 옷을 입고 거울을 보는 일과 같습니다. 단추(시제), 지퍼(수 일치), 얼룩(철자), 같은 색만 잔뜩 입었는지(반복)를 하나씩 확인하는 것이지요.\n\n한 번에 모두 보려 하지 말고 **점검표 한 줄씩** 글을 다시 읽으십시오. 첫 번에는 동사만, 두 번째는 주어만 보는 식입니다.',
      check: {
        type: 'choice',
        q: '철자가 **바른** 것은 무엇입니까?',
        choices: ['receive', 'recieve', 'receeve'],
        answer: 0,
        why: ['', 'e와 i의 순서가 바뀌었습니다. c 뒤에서는 ei 순서로 receive라고 씁니다.', 'ei 대신 ee를 썼습니다. 바른 철자는 receive입니다.'],
        explain: '바른 철자는 **receive**(받다)입니다. c 뒤에서는 ei 순서가 많습니다(receive, ceiling).',
      },
    },
  ],

  examples: [
    {
      q: '다음 경험 글에서 시간 순서를 나타내는 연결어와, 느낀 점·계획을 나타내는 문장을 찾아보십시오.\n\n' + LIBRARY,
      steps: [
        '첫 문장 Last summer, I volunteered at ~ 이 **언제·어디서·무엇을** 했는지 소개합니다. 지난 일이므로 동사는 과거형(volunteered)입니다.',
        '겪은 일은 **First → Then → After that → Finally** 순서로 이어집니다. 책 정리 → 그림책 찾아 주기 → 이야기 읽어 주기 → 마지막 날 감사 카드를 받음.',
        'At first, I was nervous 는 순서가 아니라 "처음에는 긴장했다(나중에는 나아졌다)"는 뜻입니다. 이어지는 Soon, however ~ 가 달라진 모습을 보여 줍니다.',
        '느낀 점·배운 점: **I realized that** small acts of kindness can make someone happy. / **It taught me** the joy of helping others.',
        '앞으로의 계획: **I\'m planning to** volunteer there again next summer.',
      ],
      answer: '순서: First, Then, After that, Finally / 느낀 점: I realized that ~, It taught me ~ / 계획: I\'m planning to ~',
    },
    {
      q: '다음 초고를 고쳐 쓰기 점검표(시제·수 일치·철자·반복)에 따라 고쳐 보십시오. 굵은 글씨가 점검할 낱말입니다.\n\n' + HIKE,
      steps: [
        'Last spring 은 지난 때이므로 동사는 모두 과거형이어야 합니다.',
        '**goes** → **went**: 현재형이고 주어(my friends and I)와 수도 맞지 않습니다. 과거형 went로 고칩니다.',
        '**climbs** → **climbed**: 과거형으로 고칩니다. **ate**는 이미 과거형이므로 그대로 둡니다.',
        '**beatiful** → **beautiful**: 철자를 고칩니다. u가 빠졌습니다.',
      ],
      answer: 'Last spring, my friends and I went hiking on a mountain near our town. We climbed to the top and ate kimbap together. The view from the top was beautiful.',
    },
  ],

  terms: [
    { term: '시간 순서 연결어', def: '일이 일어난 순서를 보여 주는 말입니다. 예: First, Then, After that, Finally' },
    { term: '시제 일관성', def: '한 글 안에서 같은 때의 일은 같은 시제로 쓰는 것입니다. 지난 경험을 쓰면 동사를 과거형으로 맞춥니다.' },
    { term: '고쳐 쓰기 (revising)', def: '초고를 다시 읽으며 시제·수 일치·철자·표현을 점검해 더 나은 글로 다듬는 일입니다.' },
    { term: '수 일치', def: '주어가 단수이면 단수 동사, 복수이면 복수 동사를 쓰는 것입니다. 예: One of my friends lives in Busan.' },
    { term: '불규칙 동사', def: '-ed를 붙이지 않고 모양이 바뀌어 과거형이 되는 동사입니다. 예: go → went, buy → bought' },
    { term: '초고', def: '처음 쓴, 아직 고치지 않은 글입니다. 고쳐 쓰기를 거쳐 완성된 글이 됩니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nWe made a cake for Mom\'s birthday. [[blank]], we mixed flour, eggs, and sugar. Then we baked it for thirty minutes.',
      choices: ['First', 'Finally', 'At first', 'After that'],
      answer: 0,
      why: ['', 'Finally는 마지막 일에 씁니다. 반죽을 섞는 것은 가장 처음 한 일입니다.', 'At first는 "처음에는 (그랬지만 나중에는 달라졌다)"라는 대비의 뜻입니다. 순서의 첫째를 매길 때는 First를 씁니다.', 'After that은 앞의 일이 끝난 뒤에 씁니다. 이 문장은 첫 번째 일입니다.'],
      explain: '케이크를 만드는 과정의 **첫 번째** 일(재료 섞기)이고, 다음 문장이 Then으로 이어지므로 **First**가 알맞습니다.',
    },
    {
      id: 'p2', level: 1, type: 'order', concept: 0,
      q: '시간 순서에 맞게 문장을 놓으십시오.',
      choices: [
        'First, we packed our bags and checked the weather.',
        'Then we took the train to the beach.',
        'After that, we swam in the sea until lunchtime.',
        'Finally, we watched the sunset and went home.',
      ],
      answer: [0, 1, 2, 3],
      hint: 'First, Then, After that, Finally 의 차례를 떠올려 보십시오.',
      explain: '**First**(가방을 싸고 날씨 확인) → **Then**(기차를 탐) → **After that**(점심때까지 수영) → **Finally**(해 지는 것을 보고 집에 감) 순서입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nTwo days ago, I [[blank]] my old friend at the bookstore.',
      choices: ['met', 'meet', 'have met', 'will meet'],
      answer: 0,
      why: ['', 'meet은 현재형입니다. Two days ago(이틀 전)는 지난 때이므로 과거형을 씁니다.', '~ ago 처럼 지난 때를 콕 집는 말은 현재완료와 함께 쓰지 않습니다.', 'will meet은 앞으로의 일입니다. 이틀 전의 일과 맞지 않습니다.'],
      explain: 'Two days ago는 지난 때이므로 meet의 과거형 **met**을 씁니다.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'text', concept: 1,
      q: '밑줄 친 동사를 시제에 맞게 고쳐 쓰십시오(고친 낱말만).\n\nYesterday, I __buy__ a new notebook for my history class.',
      answer: ['bought'],
      wrong: [
        { a: 'buyed', why: 'buy는 불규칙 동사라서 -ed를 붙이지 않습니다. 과거형은 bought입니다.' },
        { a: 'brought', why: 'brought는 bring(가져오다)의 과거형입니다. buy(사다)의 과거형은 bought입니다.' },
      ],
      explain: 'Yesterday는 지난 때이므로 buy의 과거형 **bought**로 고칩니다. brought(bring의 과거형)와 철자가 비슷하니 주의합니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nAfter the long hike, I realized [[blank]] I needed to exercise more.',
      choices: ['that', 'to', 'what', 'for'],
      answer: 0,
      why: ['', 'realize 뒤에 깨달은 내용(주어 + 동사)이 올 때는 that을 씁니다. to 뒤에는 동사원형이 옵니다.', 'what은 "~하는 것"이라는 뜻으로 뒤에 빠진 자리가 있어야 합니다. I needed to exercise more 는 완전한 문장입니다.', 'for는 전치사라서 뒤에 주어 + 동사를 바로 이어 쓰지 않습니다.'],
      explain: '깨달은 내용 I needed to exercise more 가 완전한 문장이므로 **I realized that** ~ 이 알맞습니다.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 2,
      q: 'The experience taught me being honest with my friends. 는 바른 문장이다.',
      answer: false,
      explain: 'teach는 **teach + 사람 + to부정사**로 씁니다. 바른 문장은 The experience taught me **to be** honest with my friends. 입니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nI really liked working with animals. I hope [[blank]] at the animal shelter again next year.',
      choices: ['to volunteer', 'volunteering', 'volunteered', 'volunteer'],
      answer: 0,
      why: ['', 'hope 뒤에는 -ing가 아니라 to부정사를 씁니다.', 'volunteered는 과거형입니다. 앞으로 바라는 일에는 to + 동사원형을 씁니다.', 'hope 뒤에 동사원형을 바로 쓰지 않습니다. to가 필요합니다.'],
      explain: '**hope + to부정사**이므로 I hope **to volunteer** ~ (다시 봉사하기를 바란다)가 알맞습니다.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 4,
      q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nOne of my cousins [[blank]] in Canada.',
      choices: ['lives', 'live', 'living', 'are living'],
      answer: 0,
      why: ['', 'cousins(복수)를 보고 live를 골랐습니다. 진짜 주어는 One(하나)이라 단수 동사를 씁니다.', 'living만으로는 문장의 동사가 될 수 없습니다.', 'are는 복수 주어에 씁니다. 진짜 주어 One은 단수입니다.'],
      explain: 'of my cousins를 괄호로 묶으면 진짜 주어는 **One**(단수)입니다. 그래서 **lives**를 씁니다.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'text', concept: 5,
      q: '밑줄 친 낱말의 철자를 바르게 고쳐 쓰십시오.\n\nWe waited __untill__ the rain stopped.',
      answer: ['until'],
      wrong: [{ a: 'untill', why: '그대로 썼습니다. until은 끝에 l이 하나뿐입니다. (till은 l이 둘입니다.)' }, { a: 'untile', why: 'until에는 끝에 e가 없습니다.' }],
      explain: '바른 철자는 **until**(~까지)입니다. 비슷한 뜻의 till은 l이 둘이라 헷갈리기 쉽습니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 5,
      hint: '같은 명사를 대명사로 바꾸거나, 두 문장을 and로 합쳤는지 보십시오.',
      q: '다음 글에서 같은 낱말의 반복을 가장 잘 줄여 고쳐 쓴 것은 무엇입니까?\n\nThe festival was fun. The festival had many food trucks. I want to go to the festival again.',
      choices: [
        'The festival was fun and had many food trucks. I want to go there again.',
        'The festival was fun. The festival had many food trucks. I want to go to the festival again and again.',
        'It was fun. It had many food trucks. I want to go to it festival again.',
        'The festival was fun. Festival had many food trucks. I want to go festival again.',
      ],
      answer: 0,
      why: ['', '반복이 그대로 남아 있고, again and again으로 오히려 더 길어졌습니다.', '처음부터 It으로 시작하면 무엇을 가리키는지 알 수 없고, it festival은 틀린 표현입니다.', 'the를 빼기만 했을 뿐 반복이 줄지 않았고, 관사가 빠져 틀린 문장이 되었습니다.'],
      explain: '첫 두 문장을 **and**로 합치고, 마지막 the festival을 장소를 가리키는 **there**로 바꾸었습니다. 뜻은 그대로이면서 반복이 줄었습니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 1,
      hint: '이야기 전체가 언제 일어난 일인지 먼저 확인하십시오.',
      q: '다음 글에서 시제가 **어긋난** 동사는 무엇입니까?\n\n' + CAMP,
      choices: ['look', 'went', 'set up', 'was'],
      answer: 0,
      why: ['', 'went는 go의 과거형으로 Last weekend와 맞습니다.', 'set은 과거형도 set입니다(set - set - set). 여기서는 과거형입니다.', 'was는 be동사의 과거형으로 바르게 쓰였습니다.'],
      explain: 'Last weekend의 일을 쓴 글이므로 모두 과거형이어야 합니다. 현재형 **look**을 과거형 **looked**로 고칩니다. set은 현재형과 과거형의 모양이 같아서 여기서는 과거형입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 3,
      q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nOur school band will play at the town festival next month. I\'m looking forward to [[blank]] on a big stage.',
      choices: ['playing', 'play', 'played', 'be played'],
      answer: 0,
      why: ['', 'look forward to의 to는 전치사라서 동사원형이 아니라 -ing가 옵니다.', 'played는 과거형입니다. 전치사 to 뒤에는 -ing를 씁니다.', '밴드가 직접 연주하는 것이므로 수동형을 쓰지 않고, 전치사 뒤에는 -ing가 옵니다.'],
      explain: '**look forward to + -ing**(~하기를 고대하다)입니다. to가 전치사이므로 **playing**을 씁니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 5,
      hint: '고친 뒤의 낱말이 정말 바른지 하나씩 확인하십시오.',
      q: '다음 초고를 고쳐 쓴 것 가운데 **바르지 않은** 것은 무엇입니까?\n\n' + HIKE,
      choices: ['goes → went', 'climbs → climbed', 'ate → eat', 'beatiful → beautiful'],
      answer: 2,
      why: ['Last spring의 일이므로 goes를 과거형 went로 고친 것은 바릅니다.', 'climbs를 과거형 climbed로 고친 것은 바릅니다.', '', 'beatiful을 바른 철자 beautiful로 고친 것은 바릅니다.'],
      explain: 'ate는 이미 eat의 과거형이라 고칠 필요가 없습니다. 오히려 현재형 **eat**으로 바꾸면 시제가 어긋납니다. 나머지는 모두 바르게 고친 것입니다.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 1,
      hint: 'Last Saturday의 일인데 현재형인 동사를 찾으십시오.',
      q: '다음 글에서 시제가 어긋난 동사 하나를 찾아 바르게 고쳐 쓰십시오(고친 낱말만).\n\nLast Saturday, my class visited a science museum. We saw a huge dinosaur skeleton. Then a guide shows us a robot dog. It was an exciting day.',
      answer: ['showed'],
      wrong: [{ a: 'shows', why: '어긋난 낱말을 그대로 썼습니다. Last Saturday의 일이므로 과거형으로 고쳐야 합니다.' }, { a: 'shown', why: 'shown은 과거분사입니다. 혼자서 문장의 동사가 될 수 없습니다. 과거형은 showed입니다.' }],
      explain: '글 전체가 Last Saturday의 일이므로 현재형 shows를 과거형 **showed**로 고칩니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 2,
      hint: '앞의 경험과 이어지면서 "배운 점"을 말하는 문장을 고르십시오.',
      q: '다음 글의 빈칸에 들어갈 문장으로 가장 알맞은 것은 무엇입니까?\n\nLast month, our team lost the final game of the basketball tournament. At first, I was very upset and blamed my teammates. But after a few days, I watched the video of the game and saw my own mistakes. [[blank]] Next season, I\'m planning to practice my passing every day.',
      choices: [
        'I realized that I should look at my own mistakes before blaming others.',
        'The final game was held in a big gym downtown.',
        'I\'m looking forward to buy new basketball shoes.',
        'My teammates was very tall and fast.',
      ],
      answer: 0,
      why: ['', '경기 장소에 대한 정보일 뿐, 앞의 경험에서 배운 점이 아닙니다.', 'look forward to 뒤에는 -ing(buying)를 써야 하고, 내용도 글의 흐름과 맞지 않습니다.', '주어 teammates(복수)에는 were를 써야 하고, 내용도 배운 점이 아닙니다.'],
      explain: '처음에는 팀원을 탓했지만 영상을 보고 자기 실수를 발견한 경험 뒤이므로, **I realized that** ~ 으로 "남을 탓하기 전에 내 실수를 봐야 한다는 것을 깨달았다"는 배운 점이 오고, 이어서 계획(I\'m planning to ~)으로 마무리됩니다.',
    },
    {
      id: 'a4', level: 3, type: 'order', concept: 0,
      q: '경험 글의 짜임(경험 소개 → 겪은 일 → 느낀 점 → 계획)에 맞게 문장을 놓으십시오.',
      choices: [
        'Last month, I joined a weekend cooking class.',
        'First, the teacher showed us how to cut vegetables safely.',
        'I realized that cooking takes a lot of patience.',
        'I\'m planning to make dinner for my family this Friday.',
      ],
      answer: [0, 1, 2, 3],
      explain: '언제·무엇을 했는지 소개(Last month, I joined ~) → 겪은 일(First, ~) → 느낀 점(I realized that ~) → 앞으로의 계획(I\'m planning to ~) 순서입니다.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      hint: '각 문장에서 꾸미는 말을 괄호로 묶고 진짜 주어를 찾으십시오.',
      q: '주어와 동사의 수 일치가 **바른** 문장은 무엇입니까?',
      choices: [
        'Each of the members has a locker.',
        'The books on the shelf is very old.',
        'Everyone in my family like spicy food.',
        'The number of visitors are increasing.',
      ],
      answer: 0,
      why: ['', '진짜 주어는 The books(복수)이므로 are를 써야 합니다.', 'Everyone은 단수 취급하므로 likes를 써야 합니다.', 'The number of ~ 는 "~의 수"로 단수이므로 is를 써야 합니다.'],
      explain: 'Each of ~ 의 진짜 주어 **Each**는 단수이므로 **has**가 맞습니다. 나머지는 각각 are, likes, is로 고쳐야 합니다.',
    },
  ],

  deeper: [
    {
      title: '좋은 경험 글은 "한 장면"을 크게 보여 준다',
      body: '경험 글에서 하루 동안 한 일을 모두 나열하면 일기장의 목록처럼 됩니다. 좋은 경험 글은 **가장 기억에 남는 한 장면**을 골라 자세히 보여 줍니다.\n\n예를 들어 도서관 봉사 글이라면 "책을 정리했다, 아이들을 도왔다, 책을 읽어 주었다"를 짧게 지나가고, 마지막 날 아이가 카드를 건넨 순간을 그때의 표정과 말까지 담아 쓰는 것입니다. 그 장면이 뒤에 오는 "I realized that ~"의 근거가 되기 때문입니다.\n\n고쳐 쓰기도 문법만 고치는 일이 아닙니다. 다시 읽으며 "이 문장이 꼭 필요한가?", "느낀 점과 이어지는가?"를 묻고 빼거나 보태는 것까지가 고쳐 쓰기입니다.',
    },
    {
      title: '현재 시제로 쓰는 경험 글도 있다',
      body: '영어 소설이나 수필 가운데에는 지난 일을 일부러 **현재 시제**로 쓰는 글도 있습니다. 독자가 그 장면 한가운데 있는 것처럼 생생하게 느끼게 하려는 것입니다. 이것을 "역사적 현재"라고 부르기도 합니다.\n\n중요한 것은 **한 글 안에서 하나로 정해 지키는 것**입니다. 과거로 시작했다면 과거로, 현재로 시작했다면 현재로 끝까지 갑니다. 시험과 수행평가의 경험 글에서는 과거 시제로 쓰는 것이 기본입니다.',
    },
  ],

  faq: [
    {
      q: 'First랑 At first는 뭐가 달라요?',
      a: '**First**는 순서를 매기는 말로 "먼저, 첫째로"입니다. **At first**는 "처음에는 (그랬지만 나중에는 달랐다)"라는 뜻으로, 뒤에 바뀐 상황이 이어집니다. 예: First, I washed the rice. (먼저 쌀을 씻었다) / At first, I was nervous, but soon I felt comfortable. (처음에는 긴장했지만 곧 편해졌다)',
    },
    {
      q: '과거 이야기인데 현재형을 써도 되는 때가 있어요?',
      a: '지금도 변하지 않는 사실이나 일반적인 진리는 현재형으로 씁니다. 예: I visited Gyeongju last year. It **has** many old temples. 경주에 옛 절이 많은 것은 지금도 사실이기 때문입니다. 하지만 그때 내가 한 행동과 겪은 일은 과거형으로 씁니다.',
    },
    {
      q: 'I hope to와 I\'m looking forward to는 왜 뒤의 모양이 달라요?',
      a: 'hope to의 to는 **to부정사**의 to라서 동사원형이 옵니다(I hope to see you). look forward to의 to는 **전치사**라서 명사나 -ing가 옵니다(I\'m looking forward to seeing you). 전치사 to 뒤에 -ing가 오는 표현으로는 be used to -ing(~에 익숙하다)도 있습니다.',
    },
    {
      q: '고쳐 쓰기를 할 때 무엇부터 봐야 해요?',
      a: '점검표를 한 줄씩 따로 보는 것이 좋습니다. ① 동사만 보며 시제 확인 → ② 주어와 동사를 짝지어 수 일치 확인 → ③ 철자 확인 → ④ 같은 낱말이 반복되는지 확인. 한 번에 모두 보려 하면 놓치기 쉽습니다.',
    },
  ],

  mistakes: [
    '지난 경험을 쓰다가 현재형을 섞는 실수 — Yesterday I go ~ (✗) → Yesterday I went ~ (○). 글을 다 쓴 뒤 동사만 따로 확인합니다.',
    'I hope seeing ~, It taught me being ~ 처럼 -ing를 쓰는 실수 — hope·plan·teach + 사람 뒤에는 to부정사를 씁니다. 반대로 look forward to 뒤에는 -ing입니다.',
    'One of my friends live ~ 처럼 가까운 명사에 동사를 맞추는 실수 — 꾸미는 말(of my friends)을 괄호로 묶고 진짜 주어(One)에 맞춥니다.',
  ],

  gens: [
    {
      id: 'past-tense-verb',
      level: 1,
      title: '지난 경험 쓰기 — 불규칙 동사의 과거형',
      make: function (R) {
        var verbs = [
          { v: 'go', p: 'went', rest: 'to the library with my sister', bad: 'goed' },
          { v: 'buy', p: 'bought', rest: 'a birthday present for my dad', bad: 'buyed', mix: 'brought', mixWhy: 'brought는 bring(가져오다)의 과거형입니다. buy(사다)의 과거형은 bought입니다.' },
          { v: 'bring', p: 'brought', rest: 'some snacks to the picnic', bad: 'bringed', mix: 'bought', mixWhy: 'bought는 buy(사다)의 과거형입니다. bring(가져오다)의 과거형은 brought입니다.' },
          { v: 'eat', p: 'ate', rest: 'spicy rice cakes with my friends', bad: 'eated' },
          { v: 'see', p: 'saw', rest: 'a beautiful rainbow over the river', bad: 'seed' },
          { v: 'take', p: 'took', rest: 'a lot of pictures at the zoo', bad: 'taked' },
          { v: 'write', p: 'wrote', rest: 'a letter to my grandmother', bad: 'writed' },
          { v: 'make', p: 'made', rest: 'pancakes for my family', bad: 'maked' },
          { v: 'meet', p: 'met', rest: 'my old teacher at the station', bad: 'meeted' },
          { v: 'find', p: 'found', rest: 'an old coin under the sofa', bad: 'finded' },
          { v: 'teach', p: 'taught', rest: 'my little brother how to ride a bike', bad: 'teached' },
          { v: 'catch', p: 'caught', rest: 'a big fish at the lake', bad: 'catched' },
          { v: 'feel', p: 'felt', rest: 'very proud of my team', bad: 'feeled' },
          { v: 'leave', p: 'left', rest: 'my umbrella on the bus', bad: 'leaved' },
          { v: 'think', p: 'thought', rest: 'about my future for a long time', bad: 'thinked' },
          { v: 'win', p: 'won', rest: 'first prize in the drawing contest', bad: 'winned' },
          { v: 'lose', p: 'lost', rest: 'my wallet at the shopping mall', bad: 'losed' },
          { v: 'give', p: 'gave', rest: 'my seat to an old man on the subway', bad: 'gived' },
          { v: 'swim', p: 'swam', rest: 'in the sea for the first time', bad: 'swimmed' },
          { v: 'begin', p: 'began', rest: 'to learn the guitar', bad: 'beginned' },
        ];
        var times = ['Yesterday', 'Last weekend', 'Two days ago', 'Last summer', 'Last Friday'];
        var t = R.pick(times);
        var x = R.pick(verbs);
        var wrong = [
          { a: x.v, why: '동사원형(현재형)을 그대로 썼습니다. 이 문장은 지난 때(' + t + ')의 일이므로 과거형을 씁니다.' },
          { a: x.bad, why: '불규칙 동사(' + x.v + ')라서 -ed를 붙이지 않습니다. 과거형은 ' + x.p + '입니다.' },
        ];
        if (x.mix) wrong.push({ a: x.mix, why: x.mixWhy });
        return {
          type: 'short', check: 'text', concept: 1,
          q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 빈칸에 쓰십시오.\n\n' + t + ', I [[blank]] ' + x.rest + '. (' + x.v + ')',
          answer: [x.p],
          wrong: wrong,
          explain: '문장 첫머리의 ' + t + '(지난 때) 때문에 과거형을 씁니다. 동사 ' + x.v + '의 과거형은 **' + x.p + '**입니다. → ' + t + ', I ' + x.p + ' ' + x.rest + '.',
        };
      },
    },
  ],

  vocab: [
    { w: 'experience', m: '경험; 경험하다', ex: 'Volunteering abroad was a great experience for me.', exm: '해외 봉사는 나에게 멋진 경험이었다.' },
    { w: 'volunteer', m: '자원봉사하다; 자원봉사자', ex: 'I volunteered at the animal shelter last winter.', exm: '나는 지난겨울 동물 보호소에서 자원봉사를 했다.' },
    { w: 'realize', m: '깨닫다', ex: 'I realized that I had left my phone at home.', exm: '나는 휴대 전화를 집에 두고 왔다는 것을 깨달았다.' },
    { w: 'nervous', m: '긴장한, 불안한', ex: 'I was nervous before my first speech.', exm: '나는 첫 발표 전에 긴장했다.' },
    { w: 'proud', m: '자랑스러워하는', ex: 'My parents were proud of me.', exm: '부모님은 나를 자랑스러워하셨다.' },
    { w: 'memorable', m: '기억에 남는', ex: 'The school trip was the most memorable event of the year.', exm: '수학여행은 그해 가장 기억에 남는 일이었다.' },
    { w: 'challenge', m: '도전, 어려운 일', ex: 'Running ten kilometers was a real challenge for me.', exm: '10킬로미터를 달리는 것은 나에게 정말 어려운 일이었다.' },
    { w: 'improve', m: '나아지다, 향상시키다', ex: 'I want to improve my writing skills.', exm: '나는 글쓰기 실력을 키우고 싶다.' },
    { w: 'patient', m: '참을성 있는', ex: 'Teaching children taught me to be patient.', exm: '아이들을 가르치면서 참을성을 배웠다.' },
    { w: 'revise', m: '(글을) 고쳐 쓰다, 수정하다', ex: 'Please revise your essay before you submit it.', exm: '제출하기 전에 에세이를 고쳐 쓰세요.' },
    { w: 'draft', m: '초고, 초안', ex: 'My first draft had many spelling mistakes.', exm: '내 첫 초고에는 철자 실수가 많았다.' },
    { w: 'consistent', m: '일관된', ex: 'Keep the tense consistent in your writing.', exm: '글에서 시제를 일관되게 유지하세요.' },
    { w: 'repeat', m: '반복하다', ex: 'Try not to repeat the same word too often.', exm: '같은 낱말을 너무 자주 반복하지 않도록 하세요.' },
    { w: 'spelling', m: '철자', ex: 'Check the spelling of every word.', exm: '모든 낱말의 철자를 확인하세요.' },
    { w: 'look forward to', m: '~을 고대하다', ex: 'I am looking forward to seeing you again.', exm: '당신을 다시 만나기를 고대합니다.' },
  ],
});
})();
