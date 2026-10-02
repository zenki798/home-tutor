/* 공통영어2 · 글의 전개 방식과 요약
 * 지문·예문은 모두 직접 쓴 글이다(가상의 학교·인물). */
(function () {
  // 글 A: 꿀벌과 말벌 (비교·대조, 직접 쓴 글)
  var BEES = 'Bees and wasps may look alike, but they are quite different. Both are flying insects, and both can sting. However, a bee has a round, hairy body, whereas a wasp has a smooth body with a very thin waist. Their food is different, too. Bees feed on nectar and pollen from flowers. In contrast, many wasps hunt other insects to feed their young. They also differ in how they sting. A honeybee can usually sting only once, while a wasp can sting several times.';
  // 글 B: 나무 베기와 산사태 (원인·결과, 직접 쓴 글)
  var SLIDES = 'In some hilly areas, many trees have been cut down to build roads and houses. This has led to more landslides. Tree roots hold the soil in place, so when the trees are gone, the soil becomes loose. Heavy rain then washes the loose soil down the hill. Due to these landslides, roads are often blocked, and nearby homes can be damaged.';
  // 글 C: 점심 줄 (문제·해결, 직접 쓴 가상의 학교 이야기)
  var LUNCH = 'At our school, the line for lunch is very long. Many students wait more than 20 minutes, so they have little time left to eat. One solution is to let each grade start lunch at a different time. That way, fewer students would arrive at the cafeteria at once. To address the problem further, the school could open a second serving counter. With these two changes, most students could get their food within 10 minutes.';
  // 글 D: 종이책과 전자책 (비교·대조, 직접 쓴 글)
  var BOOKS = 'Paper books and e-books both let readers enjoy stories and learn new things. However, they differ in several ways. A paper book needs no battery, whereas an e-reader must be charged. On the other hand, one e-reader can hold thousands of books, while a paper book holds only one. Finally, the size of the letters in a paper book cannot be changed. In contrast, e-book readers can make the letters bigger or smaller.';

Tutor.registerUnit({
  id: 'eng-h-c2-07',
  course: 'eng-h-c2',
  title: '글의 전개 방식과 요약',
  summary: '비교·대조, 원인·결과, 문제·해결 같은 전개 방식을 알아보고, 구조에 맞춰 표로 정리해 요약합니다.',
  goals: [
    'similarly, in contrast, whereas 같은 신호어로 비교·대조 구조를 알아볼 수 있다.',
    'lead to, result in, due to의 방향을 정확히 알고 원인과 결과를 구별할 수 있다.',
    'One solution is ~, To address this, ~ 같은 표현으로 문제와 해결을 찾을 수 있다.',
    '글의 구조에 맞는 표·도식(그래픽 조직자)으로 내용을 정리하고, 그것을 바탕으로 요약문을 쓸 수 있다.',
  ],
  standards: ['[10공영2-01-06]', '[10공영2-01-08]', '[10공영2-02-05]'],

  concepts: [
    {
      title: '비교·대조 구조와 신호어',
      body: '두 대상을 나란히 놓고 **같은 점(비교)**과 **다른 점(대조)**을 밝히는 전개 방식입니다. 신호어를 보면 지금 같은 점을 말하는지 다른 점을 말하는지 바로 알 수 있습니다.\n\n' +
        '| 무엇을 말하나 | 신호어 | 예 |\n|---|---|---|\n' +
        '| 같은 점 | **similarly, likewise, in the same way, both A and B, like ~** | Bees can sting. **Similarly**, wasps can sting. |\n' +
        '| 다른 점 | **in contrast, on the other hand, however, unlike ~** | Bees eat nectar. **In contrast**, many wasps hunt insects. |\n' +
        '| 다른 점 (한 문장 안) | **whereas, while** | A bee is hairy, **whereas** a wasp is smooth. |\n\n' +
        '문법 자리를 구별해 두면 빈칸 문제에서 헷갈리지 않습니다.\n\n' +
        '- **whereas, while**은 **접속사**라서 한 문장 안에서 두 절을 잇습니다: A, **whereas** B.\n' +
        '- **in contrast, similarly, on the other hand**는 **부사(구)**라서 문장 앞에 쉼표와 함께 옵니다: A. **In contrast**, B.\n' +
        '- **unlike, like**는 **전치사**라서 뒤에 명사가 옵니다: **Unlike** bees, wasps can sting several times.\n\n' +
        '> 💡 비교·대조 글은 "기준"마다 두 대상을 견줍니다. 글 A의 기준은 생김새 → 먹이 → 쏘는 방식입니다.',
      easy: '두 친구를 소개한다고 해 봅시다. "민수와 지아는 **둘 다** 축구를 좋아해. **그런데** 민수는 공격수고, 지아는 골키퍼야."\n\n' +
        '"둘 다"가 같은 점의 신호(both, similarly), "그런데·반면에"가 다른 점의 신호(in contrast, whereas)입니다. 신호어만 찾아도 글이 어디서 같은 점을 말하고 어디서 다른 점을 말하는지 보입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nCats often like to spend time alone, [[빈칸]] dogs usually enjoy being with people.',
        choices: ['whereas', 'similarly', 'due to'],
        answer: 0,
        why: ['', 'similarly는 같은 점을 말할 때 쓰고, 두 절을 잇는 접속사도 아닙니다. 고양이와 개는 반대되는 성향입니다.', 'due to는 원인을 나타내고 뒤에 명사가 옵니다. 이 문장은 원인·결과가 아니라 대조입니다.'],
        explain: '혼자 있기를 좋아하는 고양이와 사람과 함께 있기를 즐기는 개를 **대조**합니다. 쉼표 뒤에서 두 절을 이으므로 접속사 **whereas**(반면에)가 알맞습니다.',
      },
    },
    {
      title: '원인·결과 구조와 신호어',
      body: '어떤 일이 **왜** 일어났고(원인) **그래서 무엇이** 생겼는지(결과)를 밝히는 전개 방식입니다. 이 구조에서는 신호어의 **방향**이 가장 중요합니다.\n\n' +
        '| 표현 | 방향 | 예 |\n|---|---|---|\n' +
        '| A **lead(s) to** B | 원인 → 결과 | Cutting down trees **led to** landslides. |\n' +
        '| A **result(s) in** B | 원인 → 결과 | Heavy rain **resulted in** floods. |\n' +
        '| A **cause(s)** B | 원인 → 결과 | Loose soil **causes** landslides. |\n' +
        '| B **result(s) from** A | 결과 ← 원인 | Floods **resulted from** heavy rain. |\n' +
        '| **due to / because of** + A(명사) | 원인 | **Due to** the storm, the road was closed. |\n' +
        '| **As a result,** / **Therefore,** / **so** | 앞이 원인, 뒤가 결과 | It rained hard. **As a result**, the road was closed. |\n\n' +
        '**result in**과 **result from**은 한 글자 차이로 방향이 반대입니다. "in = 결과를 **안에** 담아 내보낸다(→)", "from = 원인**에서** 나왔다(←)"로 기억해 두십시오.\n\n' +
        '> ⚠️ due to, because of 뒤에는 **명사(구)**가 옵니다. 주어 + 동사가 오면 because를 씁니다. Due to it rained (×) → Because it rained (○)',
      easy: '도미노를 떠올려 보십시오. 첫 도미노(원인)가 넘어지면 다음 도미노(결과)가 넘어집니다.\n\n' +
        '"첫 도미노 **lead to / result in** 다음 도미노"는 앞에서 뒤로, "다음 도미노 **result from** 첫 도미노"는 뒤에서 앞을 돌아보는 말입니다. 어느 쪽이 먼저 넘어졌는지만 잡으면 방향이 헷갈리지 않습니다.',
      check: {
        type: 'choice',
        q: '다음 문장에서 **원인**은 무엇입니까?\n\nThe flood resulted from three days of heavy rain.',
        choices: ['three days of heavy rain', 'the flood', '원인이 나오지 않는다'],
        answer: 0,
        why: ['', 'result from은 "~에서 비롯되다"라는 뜻이라 주어(the flood)가 결과입니다. 방향을 거꾸로 읽었습니다.', 'result from 뒤에 원인(사흘 동안의 폭우)이 나와 있습니다.'],
        explain: 'B **result from** A는 "B는 A에서 비롯되었다"는 뜻입니다. 결과는 the flood, 원인은 **three days of heavy rain**입니다.',
      },
    },
    {
      title: '문제·해결 구조와 신호어',
      body: '어떤 **문제**를 먼저 소개하고, 그 문제를 풀 **해결책**을 내놓는 전개 방식입니다. 해결책이 가져올 **기대 효과**로 마무리하는 경우가 많습니다.\n\n' +
        '| 단계 | 신호어 |\n|---|---|\n' +
        '| 문제 | The problem is that ~ / One challenge is ~ / ~ is a serious issue / Many people suffer from ~ |\n' +
        '| 해결 | **One solution is (to)** ~ / **To address this,** ~ / One way to deal with this is ~ / This can be solved by ~ / Another option is ~ |\n' +
        '| 효과 | That way, ~ / With these changes, ~ / This would help ~ |\n\n' +
        '**address**는 "주소"라는 뜻 말고도 "(문제를) 다루다, 해결하려 애쓰다"라는 동사로 자주 쓰입니다. To address this problem, … = "이 문제를 해결하려면, …"\n\n' +
        '문제·해결 글에는 문제가 왜 생겼는지(원인)가 함께 나오기도 합니다. 그래도 글 전체가 해결책을 내놓는 쪽으로 흘러간다면 중심 구조는 **문제·해결**입니다.\n\n' +
        '> 💡 해결책이 여러 개이면 One solution is ~ → Another way is ~ / To address the problem further, ~ 처럼 이어집니다. 개수를 세어 두면 요약할 때 빠뜨리지 않습니다.',
      easy: '병원에 간 장면을 떠올려 보십시오. 의사는 먼저 "어디가 아프세요?"(문제)를 묻고, "이 약을 드시고 푹 쉬세요"(해결)라고 말한 뒤, "그러면 사흘 안에 나을 거예요"(효과)라고 덧붙입니다.\n\n' +
        '문제·해결 글도 같은 순서입니다. The problem is ~ 가 "어디가 아프세요?", One solution is ~ 가 "이 약을 드세요"입니다.',
      check: {
        type: 'ox',
        q: '"To address this, the city added more buses during rush hour."에서 To address this는 앞에 나온 문제에 대한 해결책을 이끄는 표현이다.',
        answer: true,
        explain: '**To address this**는 "이 문제를 해결하려고"라는 뜻으로, 뒤에 해결책(출퇴근 시간에 버스를 늘렸다)이 옵니다. address는 여기서 "(문제를) 다루다"라는 동사입니다.',
      },
    },
    {
      title: '구조에 맞게 표·도식으로 정리하기 (그래픽 조직자)',
      body: '**그래픽 조직자(graphic organizer)**는 글의 내용을 구조에 맞는 표나 그림으로 정리한 것입니다. 구조마다 알맞은 모양이 있습니다.\n\n' +
        '| 전개 방식 | 알맞은 그래픽 조직자 | 정리하는 법 |\n|---|---|---|\n' +
        '| 비교·대조 | **벤 다이어그램** (겹친 두 원) / **비교표** | 겹친 부분 = 같은 점, 양쪽 = 각자만의 특징. 표라면 기준(생김새, 먹이 …)을 줄마다 둡니다 |\n' +
        '| 원인·결과 | **원인-결과 사슬** (A → B → C) | 화살표 방향 = 원인에서 결과로. 한 결과가 다음 원인이 되기도 합니다 |\n' +
        '| 문제·해결 | **문제-해결 표** | 문제 칸 하나, 해결책 칸 여러 개, 기대 효과 칸 |\n\n' +
        '정리할 때는 **문장을 통째로 옮기지 않고** 핵심 낱말만 적습니다. 예: 글 B → cut down trees → soil becomes loose → heavy rain washes soil down → landslides → roads blocked, homes damaged\n\n' +
        '> ⚠️ 정리표의 칸을 채울 때 두 대상을 **뒤바꿔** 적는 실수가 흔합니다. 표를 다 채운 뒤 글의 문장과 한 칸씩 다시 맞춰 보십시오.',
      easy: '옷장 정리를 생각해 보십시오. 겉옷은 옷걸이에, 양말은 서랍 칸에 넣지요. 물건마다 알맞은 수납 방법이 있듯이, 글도 구조마다 알맞은 정리 틀이 있습니다.\n\n' +
        '두 가지를 견주는 글은 **겹친 동그라미 두 개**, 원인과 결과가 이어지는 글은 **화살표 사슬**, 문제와 해결책이 나오는 글은 **두 칸짜리 표**에 담으면 깔끔하게 들어갑니다.',
      check: {
        type: 'choice',
        q: '두 나라의 음식 문화에서 **같은 점과 다른 점**을 설명한 글을 정리할 때 가장 알맞은 그래픽 조직자는 무엇입니까?',
        choices: ['벤 다이어그램', '원인-결과 사슬', '문제-해결 표'],
        answer: 0,
        why: ['', '원인-결과 사슬은 한 일이 다른 일을 일으키는 흐름을 정리할 때 씁니다.', '문제-해결 표는 문제와 해결책을 정리할 때 씁니다.'],
        explain: '같은 점과 다른 점을 견주는 **비교·대조** 글이므로, 겹친 부분에 같은 점, 양쪽에 다른 점을 적는 **벤 다이어그램**이 알맞습니다.',
      },
    },
    {
      title: '정리한 표를 바탕으로 요약문 쓰기',
      body: '그래픽 조직자를 만들었다면 요약문은 그것을 **문장으로 다시 잇는 일**입니다. 좋은 요약문은 다음을 지킵니다.\n\n' +
        '1. **화제 + 구조**가 드러나게 씁니다. 비교·대조 글이면 같은 점과 다른 점이, 원인·결과 글이면 원인과 결과가 모두 들어가야 합니다.\n' +
        '2. **세부 사항은 뺍니다**: 구체적인 수치, 예시, 되풀이되는 말은 넣지 않습니다.\n' +
        '3. **자기 말로 바꿔 씁니다(paraphrase)**: 글의 문장을 그대로 이어 붙이지 않습니다.\n' +
        '4. **자기 의견을 넣지 않습니다**: "I think wasps are scary." 같은 말은 요약이 아닙니다.\n\n' +
        '구조별 요약 틀은 다음과 같습니다.\n\n' +
        '| 구조 | 요약 틀 |\n|---|---|\n' +
        '| 비교·대조 | A and B are similar in that ~, but they differ in ~. |\n' +
        '| 원인·결과 | A leads to B, which in turn causes C. |\n' +
        '| 문제·해결 | The problem of ~ can be solved by ~ and ~. |\n\n' +
        '> 💡 요약문의 신호어(similar, but, leads to, solved by)가 글의 구조를 그대로 보여 주어야 합니다.',
      easy: '영화를 보고 온 친구에게 "어땠어?"라고 물으면, 친구는 장면 하나하나를 다 말하지 않고 "주인공이 ~하다가 결국 ~하는 이야기야"라고 줄여 말합니다.\n\n' +
        '요약문도 같습니다. 정리표에 적은 큰 줄기만 이어서 말하고, 작은 장면(수치·예시)과 "나는 재밌었어"(의견)는 빼면 됩니다.',
      check: {
        type: 'choice',
        q: '글 A(꿀벌과 말벌)를 요약할 때 **넣지 않아야 할** 문장은 무엇입니까?\n\n' + BEES,
        choices: [
          'I think wasps are scarier than bees.',
          'Bees and wasps can both sting.',
          'Bees and wasps differ in body shape, food, and the way they sting.',
        ],
        answer: 0,
        why: ['', '두 곤충의 같은 점으로, 비교·대조 요약에 들어가야 할 핵심입니다.', '다른 점의 기준 세 가지를 묶은 문장으로, 요약의 핵심입니다.'],
        explain: '"말벌이 더 무섭다고 생각한다"는 글에 없는 **자기 의견**입니다. 요약문에는 글의 핵심(같은 점과 다른 점)만 담고 의견을 넣지 않습니다.',
      },
    },
  ],

  examples: [
    {
      q: '글 B를 원인-결과 사슬로 정리한 뒤 한 문장으로 요약해 보십시오.\n\n' + SLIDES,
      steps: [
        '신호어를 찾습니다: **has led to**(원인 → 결과), **so**(앞이 원인), **then**(이어지는 일), **Due to**(원인).',
        '사슬로 정리합니다: cut down trees → soil becomes loose → heavy rain washes the soil down → more landslides → roads blocked, homes damaged',
        '세부 사항(to build roads and houses 같은 나무를 벤 까닭)은 요약의 중심이 아니므로 뺍니다.',
        '틀 "A leads to B, which in turn causes C."에 맞춰 자기 말로 잇습니다.',
      ],
      answer: 'Cutting down trees on hills loosens the soil, which leads to more landslides that block roads and damage homes.',
    },
    {
      q: '글 A를 벤 다이어그램으로 정리하고 요약문을 써 보십시오.\n\n' + BEES,
      steps: [
        '겹친 부분(같은 점)에는 **Both** 문장에서 찾은 내용을 적습니다: flying insects, can sting',
        '꿀벌 쪽: round and hairy body / nectar and pollen / usually stings only once',
        '말벌 쪽: smooth body, thin waist / hunts other insects / can sting several times',
        '다른 점의 기준을 묶어 이름 붙입니다: body shape, food, the way they sting',
        '틀 "A and B are similar in that ~, but they differ in ~."에 넣습니다.',
      ],
      answer: 'Bees and wasps are similar in that both are flying insects that can sting, but they differ in body shape, food, and the way they sting.',
    },
  ],

  terms: [
    { term: '전개 방식', def: '글쓴이가 내용을 펼쳐 나가는 짜임입니다. 비교·대조, 원인·결과, 문제·해결, 시간 순서 등이 있습니다.' },
    { term: '비교·대조', def: '두 대상의 같은 점(비교)과 다른 점(대조)을 밝히는 전개 방식입니다. 신호어: similarly, in contrast, whereas' },
    { term: '원인·결과', def: '어떤 일이 일어난 까닭과 그로 인해 생긴 일을 밝히는 전개 방식입니다. 신호어: lead to, result in, due to' },
    { term: '문제·해결', def: '문제를 소개하고 해결책을 내놓는 전개 방식입니다. 신호어: The problem is ~, One solution is ~, To address this' },
    { term: '신호어', def: '글의 구조나 문장 사이의 관계를 알려 주는 말입니다. 예: In contrast는 대조, As a result는 결과를 알립니다.' },
    { term: '그래픽 조직자', def: '글의 내용을 구조에 맞게 정리한 표나 그림입니다. 벤 다이어그램, 원인-결과 사슬, 문제-해결 표 등이 있습니다.' },
    { term: '벤 다이어그램', def: '두 원을 겹쳐 그려 겹친 부분에 같은 점, 나머지 부분에 각자의 특징을 적는 그림입니다. 비교·대조 글을 정리할 때 씁니다.' },
    { term: '요약문', def: '글의 핵심만 자기 말로 짧게 다시 쓴 글입니다. 세부 사항과 자기 의견은 넣지 않습니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nMy older brother loves loud rock music. [[빈칸]], I prefer quiet piano music.',
      choices: ['In contrast', 'Similarly', 'As a result', 'Due to'],
      answer: 0,
      why: [
        '',
        'Similarly는 같은 점을 말할 때 씁니다. 시끄러운 록 음악과 조용한 피아노 음악은 반대입니다.',
        'As a result는 결과를 이끕니다. 형이 록 음악을 좋아해서 내가 피아노 음악을 좋아하게 된 것이 아닙니다.',
        'Due to는 원인을 나타내는 말이고 뒤에 명사가 와야 합니다.',
      ],
      explain: '형의 취향(시끄러운 록)과 나의 취향(조용한 피아노)을 **대조**하므로 **In contrast**(그에 반해)가 알맞습니다. 문장 앞에서 쉼표와 함께 쓰는 부사구입니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '다음 문장에서 **원인**에 해당하는 것은 무엇입니까?\n\nDue to the heavy snow, the school was closed for two days.',
      choices: ['the heavy snow', 'the school was closed', 'two days', 'the school'],
      answer: 0,
      why: [
        '',
        '학교가 문을 닫은 것은 폭설 때문에 생긴 결과입니다.',
        '이틀은 학교가 문을 닫은 기간일 뿐, 원인이 아닙니다.',
        '학교는 결과 문장의 주어입니다. 원인은 Due to 뒤에 있습니다.',
      ],
      explain: '**Due to** + 명사는 "~ 때문에"라는 뜻으로 원인을 이끕니다. 원인은 **the heavy snow**(폭설), 결과는 학교가 이틀 동안 문을 닫은 것입니다.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 1,
      q: '"Air pollution results from too much car traffic."에서 원인은 air pollution이다.',
      answer: false,
      explain: 'B **result from** A는 "B가 A에서 비롯되다"라는 뜻입니다. 원인은 **too much car traffic**(지나친 자동차 통행), 결과가 air pollution입니다. result in이었다면 방향이 반대가 됩니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 0,
      q: '글 A에서 꿀벌과 말벌의 **같은 점**으로 나온 것은 무엇입니까?\n\n' + BEES,
      choices: ['둘 다 날아다니는 곤충이고 침을 쏠 수 있다.', '둘 다 몸이 둥글고 털이 많다.', '둘 다 다른 곤충을 사냥해 새끼를 먹인다.', '둘 다 침을 여러 번 쏠 수 있다.'],
      answer: 0,
      why: [
        '',
        '둥글고 털이 많은 몸은 꿀벌만의 특징입니다. 말벌은 몸이 매끄럽고 허리가 가늡니다(whereas).',
        '다른 곤충을 사냥하는 것은 많은 말벌의 특징입니다. 꿀벌은 꽃꿀과 꽃가루를 먹습니다(In contrast).',
        '여러 번 쏠 수 있는 것은 말벌입니다. 꿀벌은 대개 한 번만 쏩니다(while).',
      ],
      explain: '**Both** are flying insects, and **both** can sting. — both가 같은 점의 신호입니다. 나머지는 whereas, In contrast, while 뒤에 나온 다른 점입니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '글 C에서 **첫 번째로** 제시된 해결책은 무엇입니까?\n\n' + LUNCH,
      choices: ['학년마다 점심을 시작하는 시간을 다르게 한다.', '배식대를 하나 더 연다.', '점심시간을 20분 늘린다.', '학생들이 도시락을 싸 온다.'],
      answer: 0,
      why: [
        '',
        '배식대를 하나 더 여는 것은 To address the problem further(더 나아가 문제를 해결하려면) 뒤의 두 번째 해결책입니다.',
        '20분은 학생들이 줄을 서서 기다리는 시간입니다. 점심시간을 늘리자는 말은 없습니다.',
        '글에 나오지 않는 해결책입니다.',
      ],
      explain: '**One solution is** to let each grade start lunch at a different time. — One solution is ~ 가 첫 번째 해결책을 알리는 신호어입니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '"늦잠 → 아침을 거름 → 수업 중 배가 고픔 → 집중하지 못함"처럼 한 일이 다음 일을 일으키는 내용을 정리할 때 가장 알맞은 그래픽 조직자는 무엇입니까?',
      choices: ['원인-결과 사슬', '벤 다이어그램', '문제-해결 표', '비교표'],
      answer: 0,
      why: [
        '',
        '벤 다이어그램은 두 대상의 같은 점과 다른 점을 정리할 때 씁니다.',
        '해결책이 나오지 않으므로 문제-해결 표는 알맞지 않습니다.',
        '비교표는 두 대상을 기준별로 견줄 때 씁니다.',
      ],
      explain: '한 결과가 다음 일의 원인이 되어 이어지는 내용이므로, 화살표로 잇는 **원인-결과 사슬**이 알맞습니다.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 1,
      q: '빈칸에 알맞은 영어 낱말 한 개를 쓰십시오. (l로 시작합니다.)\n\nSpending too much time on screens can [[빈칸]] to eye problems.',
      answer: ['lead'],
      wrong: [
        { a: 'result', why: 'result는 to와 함께 쓰지 않습니다. "결과로 ~을 낳다"는 result in이고, 빈칸 뒤에 to가 있으므로 lead를 씁니다.' },
        { a: 'cause', why: 'cause는 뒤에 to 없이 바로 명사가 옵니다(cause eye problems). 빈칸 뒤에 to가 있으므로 lead를 씁니다.' },
        { a: 'led', why: '조동사 can 뒤에는 동사원형이 옵니다. lead로 씁니다.' },
      ],
      explain: 'A **lead to** B는 "A가 B로 이어지다(B를 일으키다)"라는 뜻입니다. 조동사 can 뒤이므로 원형 **lead**를 씁니다. "화면을 너무 오래 보면 눈 문제가 생길 수 있다."',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 4,
      q: '글 B를 가장 잘 요약한 것은 무엇입니까?\n\n' + SLIDES,
      choices: [
        'Cutting down trees on hills loosens the soil, which leads to more landslides that block roads and damage homes.',
        'Trees are cut down to build roads and houses in some hilly areas.',
        'Heavy rain is the only cause of landslides, so people should not live on hills.',
        'Landslides lead to cutting down trees because roads are blocked.',
      ],
      answer: 0,
      why: [
        '',
        '나무를 베는 까닭(세부 사항)만 옮기고, 결과(산사태)가 빠졌습니다.',
        '글은 비가 "유일한" 원인이라고 하지 않았고, 언덕에 살지 말라는 것은 글에 없는 의견입니다.',
        '원인과 결과의 방향이 거꾸로입니다. 나무를 벤 것이 산사태로 이어졌습니다.',
      ],
      hint: '원인-결과 사슬의 처음(나무 베기)과 끝(피해)이 모두 들어 있는지 보십시오.',
      explain: '원인(나무 베기) → 중간 과정(흙이 느슨해짐) → 결과(산사태, 도로·집 피해)를 **방향에 맞게** 자기 말로 이은 첫 번째가 가장 좋은 요약입니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '글 A를 벤 다이어그램으로 정리할 때, **말벌(wasps)만의 특징** 칸에 들어갈 내용은 무엇입니까?\n\n' + BEES,
      choices: ['can sting several times', 'are flying insects', 'feed on nectar and pollen', 'have a round, hairy body'],
      answer: 0,
      why: [
        '',
        '날아다니는 곤충이라는 것은 둘의 같은 점이라 겹친 부분에 들어갑니다.',
        '꽃꿀과 꽃가루를 먹는 것은 꿀벌 쪽에 들어갈 특징입니다.',
        '둥글고 털이 많은 몸은 꿀벌 쪽에 들어갈 특징입니다.',
      ],
      hint: 'whereas, In contrast, while 뒤에 말벌에 대해 무엇이라고 했는지 찾으십시오.',
      explain: '... **while a wasp can sting several times.** — 여러 번 쏠 수 있는 것은 말벌만의 특징입니다. 같은 점(flying insects)은 겹친 부분, 꿀벌의 특징(nectar and pollen, round hairy body)은 꿀벌 쪽에 들어갑니다.',
    },
    {
      id: 'p10', level: 2, type: 'order', concept: 3,
      q: '글 B의 내용을 원인-결과 사슬로 정리하려고 합니다. 일어나는 순서대로 배열하십시오.\n\n' + SLIDES,
      choices: [
        'Trees on the hills are cut down.',
        'Roots no longer hold the soil.',
        'Heavy rain washes the loose soil downhill.',
        'Landslides block roads and damage homes.',
      ],
      answer: [0, 1, 2, 3],
      hint: '앞 칸이 다음 칸의 원인이 되도록 놓으십시오.',
      explain: '나무를 벤다 → 뿌리가 흙을 붙잡지 못한다(흙이 느슨해진다) → 폭우가 느슨한 흙을 쓸어내린다 → 산사태로 도로가 막히고 집이 피해를 입는다. 사슬의 각 칸은 다음 칸의 원인입니다.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'text', concept: 1,
      q: '빈칸에 알맞은 영어 낱말 한 개를 쓰십시오. (d로 시작합니다.)\n\nThe soccer game was canceled [[빈칸]] to the storm.',
      answer: ['due'],
      wrong: [
        { a: 'because', why: 'because 뒤에는 주어 + 동사가 오고, 명사 앞에는 because of를 씁니다. 빈칸 뒤에 to가 있으므로 due를 씁니다.' },
        { a: 'lead', why: 'lead to는 "원인 lead to 결과" 꼴입니다. 경기 취소(결과) 뒤에 원인(폭풍)이 오므로 맞지 않습니다.' },
      ],
      explain: '**due to** + 명사는 "~ 때문에"라는 뜻으로 원인을 나타냅니다. 경기가 취소된 원인이 폭풍(the storm)입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 2,
      q: '문제·해결 구조의 글에서 **해결책**을 이끄는 문장은 무엇입니까?',
      choices: [
        'To address this, the town built a new bike path along the river.',
        'The problem is that the river road is too narrow for both cars and bikes.',
        'This has led to several accidents in the past year.',
        'In contrast, the mountain road is wide and safe.',
      ],
      answer: 0,
      why: [
        '',
        'The problem is that ~ 은 문제를 소개하는 신호어입니다.',
        'has led to는 원인 → 결과를 나타냅니다. 문제가 낳은 결과(사고)를 말하는 문장입니다.',
        'In contrast는 대조의 신호어입니다. 해결책이 아닙니다.',
      ],
      explain: '**To address this**(이 문제를 해결하려고)가 해결책을 이끄는 신호어입니다. 강변에 자전거 길을 새로 만든 것이 좁은 도로 문제의 해결책입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 4,
      q: '글 C를 가장 잘 요약한 것은 무엇입니까?\n\n' + LUNCH,
      choices: [
        'The long lunch line could be shortened by giving each grade a different lunch time and opening a second counter.',
        'Many students wait more than 20 minutes for lunch, so they have little time left to eat.',
        'I think the school should give students a longer lunch break.',
        'Opening a second serving counter would cost the school too much money.',
      ],
      answer: 0,
      why: [
        '',
        '문제만 옮기고 해결책이 빠졌습니다. 문제·해결 글의 요약에는 해결책이 들어가야 합니다.',
        '글에 없는 자기 의견이고, 해결책도 글과 다릅니다.',
        '비용 이야기는 글에 없습니다.',
      ],
      hint: '요약 틀 "The problem of ~ can be solved by ~ and ~."를 떠올리십시오.',
      explain: '문제(긴 점심 줄) + 해결책 두 가지(학년별 시간 나누기, 배식대 하나 더)를 모두 자기 말로 담은 첫 번째가 가장 좋은 요약입니다. 20분, 10분 같은 수치는 세부 사항이라 빼도 됩니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: '다음 문장과 **뜻이 같은** 것은 무엇입니까?\n\nCutting down trees has led to more landslides.',
      choices: [
        'More landslides have resulted from cutting down trees.',
        'Cutting down trees has resulted from more landslides.',
        'More landslides have led to cutting down trees.',
        'Due to more landslides, trees have been cut down.',
      ],
      answer: 0,
      why: [
        '',
        'result from은 "~에서 비롯되다"라서, 나무를 벤 것이 산사태의 결과라는 반대 뜻이 됩니다.',
        '산사태가 나무 베기로 이어졌다는 반대 뜻입니다.',
        'Due to 뒤가 원인이므로 산사태 때문에 나무를 베었다는 반대 뜻입니다.',
      ],
      hint: '주어진 문장의 원인과 결과를 먼저 정하고, 각 선택지에서도 원인과 결과를 찾아 비교하십시오.',
      explain: '주어진 문장: 원인 = 나무 베기, 결과 = 산사태 증가. **B result from A**(B는 A에서 비롯되다)로 바꾸면 More landslides(결과) have resulted from cutting down trees(원인)가 되어 뜻이 같습니다. 나머지는 모두 방향이 거꾸로입니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '글 D를 비교표로 정리했습니다. 글의 내용과 **맞지 않는** 줄은 무엇입니까?\n\n' + BOOKS + '\n\n| 기준 | Paper books | E-books |\n|---|---|---|\n| (가) What they let readers do | enjoy stories, learn | enjoy stories, learn |\n| (나) Battery | not needed | must be charged |\n| (다) Number of books | one | thousands |\n| (라) Letter size | can be changed | cannot be changed |',
      choices: ['(가)', '(나)', '(다)', '(라)'],
      fixed: true,
      answer: 3,
      why: [
        '(가)는 both로 소개한 같은 점이므로 두 칸이 같은 것이 맞습니다.',
        'A paper book needs no battery, whereas an e-reader must be charged.와 일치합니다.',
        'one e-reader can hold thousands of books, while a paper book holds only one.과 일치합니다.',
        '',
      ],
      hint: '표의 각 줄을 글의 문장과 한 칸씩 맞춰 보십시오. 두 대상이 뒤바뀐 줄이 있습니다.',
      explain: '글에 따르면 종이책은 글자 크기를 **바꿀 수 없고**(cannot be changed), 전자책은 **크게나 작게 할 수 있습니다**(In contrast, e-book readers can make the letters bigger or smaller). (라)는 두 대상을 뒤바꿔 적었습니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 2,
      q: '다음 글의 **중심 전개 방식**으로 가장 알맞은 것은 무엇입니까?\n\nMany people throw away clothes after wearing them only a few times. This creates a huge amount of waste. One solution is to hold clothing swap events, where people trade clothes they no longer wear. Another way to address the problem is to repair old clothes instead of buying new ones.',
      choices: ['문제·해결', '원인·결과', '비교·대조', '시간 순서'],
      answer: 0,
      why: [
        '',
        'This creates ~ 처럼 원인·결과 표현이 한 번 나오지만, 글 전체는 문제를 소개한 뒤 해결책 두 가지를 내놓는 쪽으로 흘러갑니다.',
        '두 대상의 같은 점과 다른 점을 견주는 부분이 없습니다.',
        '일이 일어난 차례를 따라가는 글이 아닙니다.',
      ],
      hint: '글의 앞부분과 뒷부분이 각각 무엇을 말하는지, 신호어를 따라가 보십시오.',
      explain: '옷을 쉽게 버려 쓰레기가 많아지는 **문제**를 소개하고, **One solution is** ~ 와 **Another way to address the problem is** ~ 로 해결책 두 가지를 내놓으므로 중심 구조는 **문제·해결**입니다. 문제 안에 원인·결과가 섞여 있어도 글 전체의 흐름으로 판단합니다.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'text', concept: 4,
      q: '글 A의 요약문을 완성하려고 합니다. 빈칸에 알맞은 영어 낱말 한 개를 쓰십시오.\n\n' + BEES + '\n\nSummary: Bees and wasps are similar in that both can sting, but they differ in body shape, [[빈칸]], and the way they sting.',
      answer: ['food', 'diet'],
      wrong: [
        { a: 'nectar', why: 'nectar(꽃꿀)는 꿀벌의 먹이 하나일 뿐입니다. 두 곤충이 다른 "기준"을 한 낱말로 묶어야 합니다.' },
        { a: 'insects', why: '말벌의 먹이(다른 곤충)라는 세부 사항입니다. 다른 점의 기준을 묶는 낱말을 쓰십시오.' },
        { a: 'color', why: '글은 색을 비교하지 않았습니다. 둘째 기준은 Their food is different, too.에 있습니다.' },
      ],
      hint: '글에서 생김새 다음에 견주는 기준은 Their ___ is different, too.에 나옵니다.',
      explain: '**Their food is different, too.** — 생김새 다음 기준은 **먹이(food)**입니다. 요약에서는 nectar, insects 같은 세부 사항 대신 기준 이름(food 또는 diet)으로 묶어 씁니다.',
    },
  ],

  deeper: [
    {
      title: '구조를 알면 다음 문장이 보인다',
      body: '숙련된 독자는 글을 읽으며 다음에 올 내용을 **예측**합니다. 그 예측의 단서가 바로 전개 방식입니다.\n\n' +
        '- 첫 문장에 "Bees and wasps may look alike, but …"이 보이면 → 같은 점과 다른 점이 기준별로 나오겠구나.\n' +
        '- "The problem is that …"이 보이면 → 곧 One solution is ~ 가 나오겠구나. 해결책이 몇 개일까?\n' +
        '- "This has led to …"가 보이면 → 결과가 또 다른 결과를 낳는 사슬이겠구나.\n\n' +
        '예측이 맞으면 읽기가 빨라지고, 틀리면 "어, 구조가 바뀌었네?" 하고 주의를 기울이게 됩니다. 긴 지문을 읽을 때 첫 두 문장에서 구조를 짐작하고 그래픽 조직자를 머릿속에 미리 그려 두는 습관을 들여 보십시오.',
    },
    {
      title: '한 글에 여러 구조가 섞일 때',
      body: '실제 글은 한 가지 구조만 쓰지 않는 경우가 많습니다. 문제·해결 글 안에 문제의 원인(원인·결과)이 들어가고, 해결책 두 개를 견주는 부분(비교·대조)이 덧붙기도 합니다.\n\n' +
        '이럴 때는 **글 전체가 결국 무엇을 하려고 하는가**를 묻습니다.\n\n' +
        '- 해결책을 내놓는 데서 끝난다 → 중심 구조는 문제·해결\n' +
        '- 어떤 현상이 왜 생겼는지 밝히는 데서 끝난다 → 원인·결과\n' +
        '- 두 대상 가운데 무엇이 어떻게 다른지 밝히는 데서 끝난다 → 비교·대조\n\n' +
        '중심 구조를 정하면 요약문의 뼈대(틀)가 정해지고, 나머지 구조는 그 뼈대 안의 세부 사항이 됩니다.',
    },
  ],

  faq: [
    {
      q: 'whereas랑 in contrast는 뜻이 같은데 아무 데나 써도 되나요?',
      a: '뜻은 비슷하지만 문법 자리가 다릅니다. whereas(while)는 접속사라서 한 문장 안에서 두 절을 잇고(A, whereas B), in contrast는 부사구라서 새 문장 앞에 쉼표와 함께 옵니다(A. In contrast, B). 빈칸 앞뒤가 한 문장인지 두 문장인지 먼저 보십시오.',
    },
    {
      q: 'result in이랑 result from이 자꾸 헷갈려요.',
      a: '원인 result in 결과, 결과 result from 원인입니다. "in = 결과를 낳아 내보낸다(→)", "from = 원인에서 나왔다(←)"로 기억하십시오. lead to, cause는 result in과 같은 방향입니다.',
    },
    {
      q: '요약문에 예시나 숫자를 넣으면 안 되나요?',
      a: '요약문은 핵심만 짧게 담는 글이라 예시와 수치는 대개 뺍니다. 다만 그 숫자 자체가 글의 핵심이라면(예: "학생의 절반이 아침을 거른다"는 것이 글의 요지라면) 넣을 수 있습니다. "이 정보를 빼도 글의 요점이 그대로인가?"를 기준으로 판단하십시오.',
    },
  ],

  mistakes: [
    'result from과 result in의 방향을 거꾸로 읽는 실수 — 원인 result in 결과, 결과 result from 원인입니다.',
    'due to, because of 뒤에 주어 + 동사를 쓰는 실수 — 뒤에는 명사(구)가 옵니다. 절이 오면 because를 씁니다.',
    '요약문에 세부 수치나 자기 의견을 넣는 실수 — 구조에 맞는 핵심(같은 점·다른 점, 원인·결과, 문제·해결)만 자기 말로 씁니다.',
  ],

  vocab: [
    { w: 'compare', m: '비교하다', ex: 'Let\'s compare the two maps.', exm: '두 지도를 비교해 봅시다.' },
    { w: 'contrast', m: '대조; 대조하다', ex: 'The white house stands in contrast to the dark forest.', exm: '하얀 집이 어두운 숲과 대조를 이룹니다.' },
    { w: 'similarly', m: '비슷하게, 마찬가지로', ex: 'Fish need clean water. Similarly, frogs need clean ponds.', exm: '물고기는 깨끗한 물이 필요합니다. 마찬가지로 개구리도 깨끗한 연못이 필요합니다.' },
    { w: 'whereas', m: '~인 반면에', ex: 'Jia likes math, whereas Seojun likes art.', exm: '지아는 수학을 좋아하는 반면 서준이는 미술을 좋아합니다.' },
    { w: 'cause', m: '원인; ~을 일으키다', ex: 'Strong winds can cause power cuts.', exm: '강한 바람은 정전을 일으킬 수 있습니다.' },
    { w: 'effect', m: '결과, 영향, 효과', ex: 'Exercise has a good effect on your mood.', exm: '운동은 기분에 좋은 영향을 줍니다.' },
    { w: 'lead to', m: '~로 이어지다, ~을 낳다', ex: 'Small habits can lead to big changes.', exm: '작은 습관이 큰 변화로 이어질 수 있습니다.' },
    { w: 'result in', m: '(결과로) ~을 낳다', ex: 'The new rule resulted in shorter lines.', exm: '새 규칙 덕분에 줄이 짧아졌습니다.' },
    { w: 'due to', m: '~ 때문에', ex: 'The train was late due to the snow.', exm: '눈 때문에 기차가 늦었습니다.' },
    { w: 'solution', m: '해결책', ex: 'We need a better solution to this problem.', exm: '우리는 이 문제에 더 나은 해결책이 필요합니다.' },
    { w: 'address', m: '(문제를) 다루다, 해결하려 애쓰다', ex: 'The club met to address the noise problem.', exm: '동아리는 소음 문제를 다루려고 모였습니다.' },
    { w: 'issue', m: '문제, 쟁점', ex: 'Food waste is a big issue in many schools.', exm: '음식물 쓰레기는 많은 학교에서 큰 문제입니다.' },
    { w: 'summarize', m: '요약하다', ex: 'Can you summarize the story in two sentences?', exm: '그 이야기를 두 문장으로 요약할 수 있나요?' },
    { w: 'organizer', m: '정리하는 틀(도구); 주최자', ex: 'A Venn diagram is a useful graphic organizer.', exm: '벤 다이어그램은 쓸모 있는 그래픽 조직자입니다.' },
    { w: 'structure', m: '구조, 짜임', ex: 'The structure of this essay is very clear.', exm: '이 글의 짜임은 아주 분명합니다.' },
  ],
});
})();
