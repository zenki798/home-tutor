/* 영어Ⅱ · 다양한 글의 구조
 * 지문·예문은 모두 직접 쓴 글이다(가상의 인물). */
(function () {
  // 글 A: 어두운 곳에서 책 읽기 (통념-반박, 직접 쓴 글)
  var MYTH = 'Many people believe that reading in dim light can damage the eyes for good. However, there is no evidence that it causes lasting harm. Reading in poor light can make your eyes feel tired, and you may even get a headache. But after you rest, your eyes go back to normal. In fact, what matters more for your eyes is taking regular breaks from close work.';
  // 글 B: 하늘은 왜 파란가 (질문-답, 직접 쓴 글)
  var SKY = 'Why does the sky look blue on a clear day? The answer lies in the way sunlight travels through the air. Sunlight looks white, but it is actually a mix of many colors. When sunlight hits the tiny particles of gas in the air, blue light is scattered in all directions much more than red light. As a result, blue light reaches our eyes from every part of the sky.';
  // 글 C: 암석의 세 종류 (분류·정의, 직접 쓴 글)
  var ROCKS = 'Rocks fall into three main types according to how they form. The first type, igneous rock, forms when hot melted rock cools and becomes hard. The second type is sedimentary rock. It forms when layers of sand, mud, and tiny pieces of shell are pressed together over a very long time. The third type, metamorphic rock, refers to rock that has been changed by great heat and pressure deep underground.';
  // 글 D: 민수의 바이올린 (일화 → 주장, 직접 쓴 가상의 이야기)
  var VIOLIN = 'When Minsu joined the school orchestra, he could barely play a single song on the violin. Every evening, he practiced for just fifteen minutes. A year later, he played a solo at the school concert. His story shows that small efforts, repeated every day, can lead to great results. We do not need to wait for a perfect chance to begin; we only need to take a small step today.';
  // 글 E: 서준의 쪽지 (일화 → 주장, 직접 쓴 가상의 이야기)
  var NOTE = 'Last winter, Seojun noticed that the lights in his school hallway were often left on all night. He wrote a short note and stuck it next to the switch: "Last one out, please turn off the lights." Within a week, the hallway was dark every night. As this example shows, a small action by one person can change the habits of a whole group. We should not think that our efforts are too small to matter.';

Tutor.registerUnit({
  id: 'eng-h-e2-01',
  course: 'eng-h-e2',
  title: '다양한 글의 구조',
  summary: '통념과 반박, 질문과 답, 분류처럼 다양한 글의 짜임을 알아보고 구조 신호어로 흐름을 예측합니다.',
  goals: [
    '통념-반박 구조와 질문-답 구조에서 글쓴이의 주장이 놓이는 자리를 찾을 수 있다.',
    'fall into, can be divided into, refers to 같은 표현으로 분류·정의 구조를 알아볼 수 있다.',
    '일화로 시작하는 글에서 일화가 끝나고 주장이 시작되는 곳을 찾을 수 있다.',
    '구조 신호어를 보고 다음에 올 내용을 예측할 수 있다.',
  ],
  standards: ['[12영Ⅱ-01-06]'],

  concepts: [
    {
      title: '통념-반박 구조',
      body: '**통념-반박 구조**는 많은 사람이 믿는 생각(**통념**)을 먼저 소개한 뒤, 그 생각이 틀렸거나 부족하다고 **반박**하며 글쓴이의 주장을 펼치는 짜임입니다.\n\n' +
        '| 단계 | 자주 쓰는 표현 |\n|---|---|\n' +
        '| 통념 | Many people believe (that) ~ / It is commonly thought that ~ / Most of us assume ~ / You may have heard that ~ |\n' +
        '| 반박(전환) | However, ~ / But ~ / In fact, ~ / Actually, ~ / The truth is that ~ / This is not the case. |\n' +
        '| 근거 | Studies show that ~ / For example, ~ |\n\n' +
        '이 구조에서 **글쓴이의 주장은 반박 쪽**에 있습니다. 첫 문장의 통념을 요지로 고르는 것이 가장 흔한 함정입니다. 통념 문장은 글쓴이가 "이제부터 뒤집겠다"고 세워 둔 과녁일 뿐입니다.\n\n' +
        '> 💡 **Contrary to popular belief, ~**(널리 퍼진 믿음과 달리)는 통념과 반박을 한 문장에 담은 표현입니다. 쉼표 뒤가 글쓴이의 주장입니다.',
      easy: '친구가 "토마토는 채소잖아"라고 말하자 다른 친구가 "다들 그렇게 생각하지? **그런데 사실은** 식물학에서는 열매로 분류해"라고 대답하는 장면을 떠올려 보십시오.\n\n' +
        '"다들 그렇게 생각하지?"가 통념(Many people believe ~), "그런데 사실은"이 반박의 신호(However, In fact)입니다. 말하는 사람이 정말 하고 싶은 말은 늘 "그런데 사실은" 뒤에 있습니다.',
      check: {
        type: 'choice',
        q: '통념-반박 구조의 글에서 글쓴이의 주장이 주로 나오는 곳은 어디입니까?',
        choices: ['However, In fact 같은 전환 표현 뒤', 'Many people believe로 시작하는 첫 문장', '글의 맨 끝에 덧붙인 예시 하나'],
        answer: 0,
        why: ['', '첫 문장은 글쓴이가 뒤집으려고 소개한 통념입니다. 주장이 아닙니다.', '예시는 주장을 뒷받침하는 세부 내용입니다. 주장 자체는 전환 표현 뒤에 나옵니다.'],
        explain: '통념-반박 구조에서는 통념을 소개한 뒤 **However, In fact, Actually** 같은 전환 표현으로 방향을 바꾸고, 그 뒤에 글쓴이의 주장이 나옵니다.',
      },
    },
    {
      title: '질문-답 구조',
      body: '**질문-답 구조**는 글 앞부분에서 독자에게 질문을 던지고, 이어지는 문장에서 그 답을 밝히는 짜임입니다. 질문으로 호기심을 끈 뒤 설명을 시작하므로 설명문에 자주 쓰입니다.\n\n' +
        '| 단계 | 자주 쓰는 표현 |\n|---|---|\n' +
        '| 질문 | Why do we ~? / Have you ever wondered why ~? / What makes ~? / How can we ~? |\n' +
        '| 답 | The answer lies in ~ / The reason is that ~ / It is because ~ / The key is ~ / One reason is ~ |\n\n' +
        '**lie in**은 "~에 있다"라는 뜻이라, The answer lies in the way sunlight travels.는 "답은 햇빛이 나아가는 방식에 있다"입니다.\n\n' +
        '이 구조에서 **질문은 글의 화제**(무엇에 대한 글인가)이고, **답이 글의 요지**(그래서 무엇이라는 말인가)입니다. 질문 문장을 요지로 고르지 않도록 주의합니다.\n\n' +
        '> 💡 질문이 글 중간에 나오면 화제가 바뀌는 신호일 수 있습니다. "But why does this happen?"처럼 앞 내용의 원인을 묻는 질문이 나오면 곧 원인 설명이 이어집니다.',
      easy: '퀴즈 프로그램을 떠올려 보십시오. 진행자가 "하늘은 왜 파랄까요?"라고 묻고, 잠시 뒤 "정답은 바로 ~입니다!"라고 말합니다.\n\n' +
        '시청자가 기억해야 할 것은 문제가 아니라 **정답**이지요. 질문-답 구조의 글도 같습니다. 질문은 "오늘의 문제", The answer lies in ~ 뒤가 "정답", 곧 글의 요지입니다.',
      check: {
        type: 'ox',
        q: '질문-답 구조의 글에서는 첫 문장의 질문 자체가 글의 요지이다.',
        answer: false,
        explain: '질문은 글의 **화제**를 보여 줄 뿐입니다. 글의 요지는 The answer lies in ~, The reason is that ~ 같은 표현 뒤에 나오는 **답**입니다.',
      },
    },
    {
      title: '분류·정의 구조',
      body: '**분류**는 대상을 기준에 따라 몇 갈래로 나누는 것이고, **정의**는 어떤 낱말이나 개념이 무엇을 뜻하는지 밝히는 것입니다. 설명문에서 둘이 함께 나오는 일이 많습니다.\n\n' +
        '| 하는 일 | 표현 | 예 |\n|---|---|---|\n' +
        '| 분류 | A **fall(s) into** + 수 + groups | Rocks **fall into** three main types. |\n' +
        '| 분류 | A **can be divided into** ~ / **can be classified into** ~ | Clouds **can be divided into** several groups. |\n' +
        '| 분류 | There are + 수 + **kinds/types of** A | There are two kinds of energy sources. |\n' +
        '| 정의 | A **refers to** B | The term "habitat" **refers to** the place where an animal lives. |\n' +
        '| 정의 | A **is defined as** B / A **means** B | A desert **is defined as** a place that gets very little rain. |\n\n' +
        '어법도 함께 익혀 둡니다.\n\n' +
        '- **fall into**는 자동사라서 수동태로 쓰지 않습니다. Rocks are fallen into (×) → Rocks fall into (○)\n' +
        '- **divide, classify**는 타동사라서 "나뉜다"는 뜻일 때 **be divided into, be classified into**처럼 수동태로 씁니다.\n' +
        '- **refer** 뒤에는 **to**가 꼭 붙고, **mean** 뒤에는 to 없이 바로 명사가 옵니다.\n\n' +
        '> 💡 "three types"를 보았다면 The first ~, The second ~, The third ~ 또는 Another type ~ 처럼 유형이 하나씩 나올 것을 예측하고, 개수를 세며 읽습니다.',
      easy: '분리수거함을 생각해 보십시오. 쓰레기를 "종이, 플라스틱, 캔" 세 칸으로 나누는 것이 **분류**이고, "페트병은 플라스틱 칸에 넣는 물건이다"처럼 무엇이 무엇인지 밝히는 것이 **정의**입니다.\n\n' +
        '글에서 fall into three types를 보면 "칸이 세 개구나", refers to를 보면 "이 낱말의 뜻을 알려 주는구나" 하고 알아차리면 됩니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nMusical instruments can be [[빈칸]] into four main groups.',
        choices: ['divided', 'fallen', 'referred'],
        answer: 0,
        why: ['', 'fall into는 자동사라서 수동태(be fallen)로 쓰지 않습니다. Musical instruments fall into ~ 라고 해야 합니다.', 'refer는 "~을 가리키다"라는 정의 표현이고 뒤에 to가 옵니다. 나누는 뜻이 아닙니다.'],
        explain: '**can be divided into**는 "~으로 나뉠 수 있다"라는 분류 표현입니다. 악기가 네 무리로 나뉜다는 뜻입니다.',
      },
    },
    {
      title: '일화로 시작해 주장으로 이어지는 글',
      body: '어떤 글은 한 사람의 짧은 이야기(**일화**)로 시작한 뒤, 그 이야기에서 끌어낸 **일반적인 주장**으로 끝납니다. 이야기는 독자의 관심을 끌고, 주장을 실감 나게 만드는 역할을 합니다.\n\n' +
        '일화가 끝나고 주장이 시작되는 곳에는 대개 세 가지 변화가 함께 일어납니다.\n\n' +
        '1. **전환 표현**: This story shows (that) ~ / As this example shows, ~ / The lesson here is ~ / What can we learn from this? / Like Minsu, we ~\n' +
        '2. **시제**: 이야기는 과거 시제(joined, practiced), 주장은 현재 시제나 조동사(shows, can, should)\n' +
        '3. **주어**: 특정 인물(Minsu, he)에서 일반적인 사람(we, people, everyone)으로\n\n' +
        '그래서 이 구조에서 **요지는 일화 자체가 아니라, 일화 뒤에 나오는 일반화된 주장**입니다. "민수는 1년 뒤 독주를 했다"는 이야기의 한 장면일 뿐이고, "작은 노력이 매일 쌓이면 큰 결과로 이어진다"가 글쓴이가 말하려는 것입니다.\n\n' +
        '> ⚠️ 일화 속 인물이 한 말이나 행동을 글의 주제로 고르는 실수가 많습니다. 일화는 주장을 위한 "예"라는 것을 기억하십시오.',
      easy: '선생님이 조회 시간에 "어제 한 학생이 복도에 떨어진 휴지를 줍더군요." 하고 이야기를 시작했다고 해 봅시다. 이야기 끝에 선생님은 "**이처럼** 작은 행동 하나가 학교를 깨끗하게 만듭니다. **우리 모두** 하나씩 실천해 봅시다."라고 말합니다.\n\n' +
        '선생님이 정말 전하고 싶은 것은 휴지를 주운 학생 이야기가 아니라 "우리 모두 실천하자"는 말입니다. "이처럼", "우리 모두"가 들리는 곳부터가 주장입니다.',
      check: {
        type: 'choice',
        q: '글 D에서 글쓴이의 **주장**이 시작되는 문장은 무엇입니까?\n\n' + VIOLIN,
        choices: [
          'His story shows that small efforts, repeated every day, can lead to great results.',
          'A year later, he played a solo at the school concert.',
          'When Minsu joined the school orchestra, he could barely play a single song on the violin.',
        ],
        answer: 0,
        why: ['', '1년 뒤 독주를 했다는 것은 일화의 결말입니다. 아직 과거 시제의 이야기 속 장면입니다.', '일화의 첫 장면입니다. 이야기를 시작하는 문장이지 주장이 아닙니다.'],
        explain: '**His story shows that ~**이 전환 표현이고, 시제가 현재(shows, can)로 바뀌며 민수 한 사람의 이야기가 "작은 노력"이라는 일반적인 주장으로 넓어집니다.',
      },
    },
    {
      title: '구조 신호어로 다음 내용 예측하기',
      body: '능숙한 독자는 문장 하나를 읽고 **다음에 무엇이 나올지** 짐작하며 읽습니다. 그 단서가 구조 신호어입니다. 예측이 맞으면 빠르게 읽고, 어긋나면 그곳을 더 꼼꼼히 봅니다.\n\n' +
        '| 지금 읽은 표현 | 다음에 올 내용 |\n|---|---|\n' +
        '| Many people believe ~ / It is commonly thought ~ | However ~ 로 시작하는 **반박**과 글쓴이의 주장 |\n' +
        '| Why ~? / Have you ever wondered ~? | The answer lies in ~ 같은 **답** |\n' +
        '| ~ can be divided into three types. | 첫째·둘째·셋째 **유형의 설명**이 차례로 |\n' +
        '| The term X refers to ~ | 정의를 돕는 **예**(For example, such as ~) |\n' +
        '| One day, ~ / When I was ~ (과거 시제 이야기) | This story shows ~ 같은 **교훈·주장** |\n' +
        '| For example, ~ | 앞 문장 주장을 뒷받침하는 **구체적인 사례** |\n\n' +
        '예측은 문장 삽입·순서 배열·빈칸 문제에도 그대로 쓰입니다. 예를 들어 Many people believe ~ 다음에 곧바로 "This is why ~"처럼 통념을 받아들이는 문장이 온다면 흐름이 어색하다고 판단할 수 있습니다.',
      easy: '드라마 예고편을 볼 때 "그런데 그때…!"라는 말이 나오면 무언가 반전이 있을 거라고 짐작하지요?\n\n' +
        '글의 신호어도 예고편 같은 역할을 합니다. Many people believe가 나오면 "반전(However)이 오겠구나", Why ~?가 나오면 "답이 오겠구나" 하고 미리 마음의 준비를 하는 것입니다.',
      check: {
        type: 'choice',
        q: '다음 문장 바로 뒤에 올 내용으로 가장 알맞은 것은 무엇입니까?\n\nMany people think that bats are blind.',
        choices: ['박쥐도 눈으로 볼 수 있다는 반박', '박쥐가 앞을 보지 못한다는 다른 예', '박쥐와 새를 나누는 분류 기준'],
        answer: 0,
        why: ['', 'Many people think ~ 는 통념을 소개하는 신호입니다. 통념을 더 뒷받침하기보다 뒤집는 내용이 이어질 가능성이 큽니다.', '분류 신호어(fall into, can be divided into)가 없습니다. 통념 다음에는 반박이 오기 쉽습니다.'],
        explain: '**Many people think ~**는 통념을 소개하는 신호어입니다. 다음에는 However, In fact 같은 말과 함께 "사실 박쥐도 볼 수 있다"는 반박이 오리라고 예측할 수 있습니다.',
      },
    },
  ],

  examples: [
    {
      q: '글 A의 구조를 밝히고, 글쓴이의 주장을 한 문장으로 정리해 보십시오.\n\n' + MYTH,
      steps: [
        '첫 문장 **Many people believe that ~**은 통념을 소개하는 신호어입니다. 통념: 어두운 곳에서 책을 읽으면 눈이 영영 상한다.',
        '둘째 문장 **However**에서 방향이 바뀝니다. 여기부터 글쓴이의 생각입니다: 오래가는 해가 있다는 근거는 없다.',
        '다음 두 문장은 근거입니다. 눈이 피곤하고 머리가 아플 수는 있지만 쉬면 돌아온다.',
        '**In fact**로 시작하는 마지막 문장은 반박을 한 걸음 더 밀고 나가, 정말 중요한 것(가까이 보는 일을 할 때 규칙적으로 쉬기)을 알려 줍니다.',
        '그래서 구조는 **통념-반박**이고, 주장은 반박 쪽에서 찾습니다.',
      ],
      answer: 'Reading in dim light may tire your eyes, but it does not harm them for good; taking regular breaks matters more.',
    },
    {
      q: '글 C의 짜임을 정리해 보십시오.\n\n' + ROCKS,
      steps: [
        '첫 문장 **fall into three main types**에서 분류 구조임을 알 수 있습니다. 기준은 according to how they form(만들어지는 방식)입니다.',
        '세 가지 유형이 차례로 나올 것을 예측하고 개수를 셉니다: The first type, The second type, The third type.',
        '각 유형의 뜻을 밝히는 정의 표현을 찾습니다: forms when ~, **refers to** rock that ~.',
        '정리: 화성암(녹은 암석이 식어 굳음) / 퇴적암(모래·진흙·조개껍데기 조각이 오랜 시간 눌림) / 변성암(땅속 깊은 곳의 높은 열과 압력으로 변함)',
      ],
      answer: '분류·정의 구조: 암석을 만들어지는 방식에 따라 세 종류로 나누고, 각 종류가 어떻게 생기는지 정의한다.',
    },
  ],

  terms: [
    { term: '통념', def: '많은 사람이 사실이라고 널리 믿는 생각입니다. 영어 글에서는 Many people believe ~, It is commonly thought ~ 같은 표현으로 소개됩니다.' },
    { term: '반박', def: '앞에서 소개한 생각이 틀렸거나 부족하다고 따져 말하는 것입니다. However, In fact, Actually 같은 표현이 신호입니다.' },
    { term: '통념-반박 구조', def: '통념을 먼저 소개하고 그것을 뒤집으며 글쓴이의 주장을 펼치는 짜임입니다. 주장은 반박 쪽에 있습니다.' },
    { term: '질문-답 구조', def: '글 앞부분에서 질문을 던지고 이어서 답을 밝히는 짜임입니다. 질문은 화제, 답은 요지입니다.' },
    { term: '분류', def: '대상을 어떤 기준에 따라 몇 갈래로 나누는 것입니다. 표현: fall into, can be divided into, can be classified into' },
    { term: '정의', def: '낱말이나 개념의 뜻을 밝히는 것입니다. 표현: refers to, is defined as, means' },
    { term: '일화', def: '어떤 사람에게 실제로 있었던(또는 있을 법한) 짧은 이야기입니다. 글 앞부분에 두어 주장을 실감 나게 만듭니다.' },
    { term: '구조 신호어', def: '글의 짜임과 다음 내용을 알려 주는 표현입니다. 예: Many people believe(통념), The answer lies in(답), This story shows(주장)' },
    { term: '요지', def: '글쓴이가 글 전체에서 말하고자 하는 핵심 생각입니다. 화제(무엇에 대한 글인가)와 달리 "그래서 무엇이라는 말인가"에 대한 답입니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '글 A에서 글쓴이가 말하려는 것으로 가장 알맞은 것은 무엇입니까?\n\n' + MYTH,
      choices: [
        '어두운 곳에서 책을 읽어도 눈이 오래도록 상하지는 않는다.',
        '어두운 곳에서 책을 읽으면 시력이 영영 나빠진다.',
        '어두운 곳에서 책을 읽으면 머리가 아프므로 책 읽는 시간을 크게 줄여야 한다.',
        '눈 건강을 지키려면 밝은 곳에서 쉬지 않고 오래 읽어야 한다.',
      ],
      answer: 0,
      why: [
        '',
        '첫 문장의 통념입니다. 글쓴이는 However 뒤에서 이 생각을 뒤집습니다.',
        '두통은 근거 속 세부 내용이고, 책 읽는 시간을 줄이라는 말은 글에 없습니다.',
        '글쓴이는 오히려 규칙적으로 쉬는 것(taking regular breaks)이 중요하다고 했습니다.',
      ],
      explain: 'Many people believe ~ 문장은 통념이고, **However, there is no evidence that it causes lasting harm.**이 글쓴이의 주장입니다. 통념-반박 구조에서는 반박 쪽이 요지입니다.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 알맞은 영어 낱말 한 개를 쓰십시오.\n\nContrary [[빈칸]] popular belief, bats are not blind.',
      answer: ['to'],
      wrong: [
        { a: 'of', why: 'contrary는 to와 짝을 이룹니다: contrary to ~ (~와 반대로).' },
        { a: 'with', why: '"~와 달리"라고 해서 with를 쓰지 않습니다. contrary to로 기억하십시오.' },
      ],
      explain: '**Contrary to popular belief**는 "널리 퍼진 믿음과 달리"라는 뜻으로, 통념과 반박을 한 문장에 담는 표현입니다. 쉼표 뒤(bats are not blind)가 글쓴이의 주장입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '글 B에서 첫 문장의 질문에 대한 답은 무엇입니까?\n\n' + SKY,
      choices: [
        '파란빛이 공기 중에서 빨간빛보다 훨씬 많이 흩어지기 때문이다.',
        '바다의 파란색이 하늘에 그대로 비쳐 보이기 때문이다.',
        '빨간빛이 파란빛보다 더 많이 흩어져 하늘 곳곳으로 퍼지기 때문이다.',
        '햇빛이 처음부터 파란색 한 가지 빛으로만 이루어져 있기 때문이다.',
      ],
      answer: 0,
      why: [
        '',
        '흔히 듣는 말이지만 글에는 바다 이야기가 없습니다. 답은 The answer lies in ~ 뒤에서 찾습니다.',
        '방향이 반대입니다. 글은 blue light is scattered ~ much more than red light라고 했습니다.',
        '글은 햇빛이 a mix of many colors(여러 색이 섞인 빛)라고 했습니다.',
      ],
      explain: '**The answer lies in** the way sunlight travels through the air. 뒤에 답이 이어집니다. 공기 속 기체 알갱이에 부딪힐 때 파란빛이 빨간빛보다 훨씬 많이 흩어져서, 하늘 어디를 보아도 파란빛이 눈에 들어옵니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '글 C에 따르면, 모래·진흙·조개껍데기 조각이 오랜 시간 눌려서 생기는 암석은 무엇입니까?\n\n' + ROCKS,
      choices: ['sedimentary rock', 'igneous rock', 'metamorphic rock', 'all three types of rock'],
      answer: 0,
      why: [
        '',
        'igneous rock은 뜨겁게 녹은 암석이 식어 굳어서 생깁니다(The first type).',
        'metamorphic rock은 땅속 깊은 곳의 높은 열과 압력으로 변한 암석입니다(The third type).',
        '글은 세 종류가 만들어지는 방식이 서로 다르다고 나누어 설명했습니다.',
      ],
      explain: '**The second type is sedimentary rock. It forms when layers of sand, mud, and tiny pieces of shell are pressed together** ~. 분류 글에서는 The first, The second, The third를 따라가며 유형마다 설명을 짝지어 읽습니다.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 영어 낱말 한 개를 쓰십시오. (r로 시작합니다.)\n\nThe word "cumulus" [[빈칸]] to a puffy white cloud that looks like cotton.',
      answer: ['refers'],
      wrong: [
        { a: 'refer', why: '주어 The word가 3인칭 단수이고 현재 시제이므로 refers로 씁니다.' },
        { a: 'means', why: 'mean은 뒤에 to 없이 바로 명사가 옵니다. 빈칸 뒤에 to가 있으므로 refers를 씁니다.' },
        { a: 'referred', why: '낱말의 뜻은 늘 그러한 사실이므로 현재 시제 refers로 씁니다.' },
      ],
      explain: 'A **refers to** B는 "A는 B를 가리킨다(뜻한다)"라는 정의 표현입니다. 주어가 단수이므로 **refers**입니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '글 E에서 일화가 끝나고 글쓴이의 **주장**이 시작되는 문장은 무엇입니까?\n\n' + NOTE,
      choices: [
        'As this example shows, a small action by one person can change the habits of a whole group.',
        'He wrote a short note and stuck it next to the switch.',
        'Last winter, Seojun noticed that the lights in his school hallway were often left on all night.',
        'Within a week, the hallway was dark every night.',
      ],
      answer: 0,
      why: [
        '',
        '서준이 한 행동을 말하는 일화의 한 장면입니다(과거 시제).',
        '일화를 시작하는 문장입니다. Last winter처럼 때를 밝히며 이야기를 엽니다.',
        '일화의 결말입니다. 아직 서준 학교의 이야기이고, 모든 사람에게 해당하는 주장은 아닙니다.',
      ],
      explain: '**As this example shows**가 전환 표현입니다. 시제가 현재·조동사(can)로 바뀌고, 서준 한 사람의 이야기가 "한 사람의 작은 행동이 무리 전체의 습관을 바꿀 수 있다"는 일반적인 주장으로 넓어집니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '다음 문장 바로 뒤에 올 내용으로 가장 알맞은 것은 무엇입니까?\n\nThe causes of air pollution can be divided into two main groups.',
      choices: [
        '두 원인 무리 가운데 첫 번째 무리에 대한 설명',
        '공기 오염이 생각만큼 심각하지 않다는 반박',
        '공기 오염을 처음 겪은 한 사람의 옛날이야기',
        '공기 오염이 왜 생기느냐는 질문',
      ],
      answer: 0,
      why: [
        '',
        '통념을 소개하는 신호어(Many people believe ~)가 없습니다. 분류 신호어 뒤에는 유형 설명이 옵니다.',
        '일화는 대개 글 첫머리에서 과거 시제로 시작합니다. 이미 분류를 시작한 글이 갑자기 일화로 넘어가지는 않습니다.',
        '원인을 두 무리로 나눈다고 이미 밝혔으므로, 다시 원인을 묻기보다 첫 번째 무리를 설명할 차례입니다.',
      ],
      explain: '**can be divided into two main groups**는 분류 신호어입니다. 다음에는 The first group ~ 처럼 첫째 무리, 이어서 둘째 무리가 차례로 나오리라고 예측할 수 있습니다.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 0,
      q: '통념-반박 구조의 글이 되도록 순서대로 배열하십시오.',
      choices: [
        'Many people think that bats cannot see at all.',
        'However, this belief is simply wrong.',
        'Every kind of bat has eyes and can see.',
        'In fact, many bats use these eyes, along with sound, to find their way at night.',
      ],
      answer: [0, 1, 2, 3],
      hint: '통념 → 전환 → 근거 → 한 걸음 더 나아간 사실 순서를 떠올리십시오.',
      explain: '통념(Many people think ~) → 반박(**However**, this belief is wrong) → 근거(모든 박쥐는 눈이 있고 볼 수 있다) → 더 나아간 사실(**In fact**, 그 눈을 소리와 함께 써서 길을 찾는다) 순서입니다. 마지막 문장의 these eyes가 바로 앞 문장의 eyes를 가리키므로, 근거 문장 뒤에 와야 합니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 1,
      q: '빈칸에 들어갈 문장으로 가장 알맞은 것은 무엇입니까?\n\nWhy do the leaves of many trees turn yellow in autumn? [[빈칸]] During spring and summer, leaves are full of this green material. In autumn, it breaks down, and the yellow colors that were hidden underneath begin to show.',
      choices: [
        'The answer lies in a green material in leaves called chlorophyll.',
        'Leaves can be divided into simple leaves and compound leaves by their shape.',
        'Many people believe that autumn is the best season for a long walk in the park.',
        'For example, maple leaves often turn red.',
      ],
      answer: 0,
      why: [
        '',
        '잎을 모양에 따라 나누는 분류 문장입니다. 질문(왜 노랗게 변하는가)의 답이 아니고, 뒤의 this green material과도 이어지지 않습니다.',
        '산책하기 좋은 계절이라는 통념은 질문과 상관없습니다.',
        '아직 답이 나오지 않았는데 예시가 먼저 올 수 없고, 질문은 노란색에 대한 것입니다.',
      ],
      hint: '빈칸 뒤의 this green material이 가리키는 말이 빈칸에 있어야 합니다.',
      explain: '질문 뒤에는 **The answer lies in ~**으로 답이 옵니다. 빈칸 뒤 문장의 **this green material**이 가리키는 것이 빈칸의 chlorophyll(엽록소)이므로 흐름이 자연스럽습니다. 가을에 엽록소가 분해되면 그 아래 가려져 있던 노란 색소가 드러납니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 2,
      q: '어법상 **알맞은** 문장은 무엇입니까?',
      choices: [
        'Animals can be divided into two groups: those with a backbone and those without one.',
        'Animals can be fallen into two groups: those with a backbone and those without one.',
        'Animals are referred into two groups: those with a backbone and those without one.',
        'Animals fall to two groups: those with a backbone and those without one.',
      ],
      answer: 0,
      why: [
        '',
        'fall into는 자동사라서 수동태로 쓰지 않습니다. Animals fall into two groups로 써야 합니다.',
        'refer는 refer to(가리키다) 꼴로 정의에 쓰는 말이고, 나누는 뜻이 없습니다.',
        '분류의 fall은 into와 함께 씁니다: fall into two groups.',
      ],
      explain: '타동사 divide는 "나뉜다"는 뜻일 때 **be divided into**처럼 수동태로 씁니다. 자동사 fall into는 능동으로만 씁니다(Animals fall into two groups).',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 알맞은 영어 낱말 한 개를 쓰십시오. (H로 시작합니다.)\n\nMany people believe that goldfish forget everything within a few seconds. [[빈칸]], studies show that goldfish can be trained to remember a sound for months.',
      answer: ['however'],
      wrong: [
        { a: 'therefore', why: 'therefore는 앞 내용의 결과를 잇습니다. 빈칸 뒤는 통념을 뒤집는 내용이므로 역접 표현이 필요합니다.' },
        { a: 'similarly', why: 'similarly는 비슷한 내용을 더할 때 씁니다. 몇 초 만에 잊는다는 통념과 몇 달 기억한다는 연구 결과는 반대입니다.' },
      ],
      explain: '통념(몇 초 만에 다 잊는다)과 연구 결과(몇 달 동안 기억할 수 있다)가 반대이므로 역접의 **However**가 알맞습니다. 통념-반박 구조의 가장 대표적인 전환 신호어입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 3,
      q: '글 E의 요지로 가장 알맞은 것은 무엇입니까?\n\n' + NOTE,
      choices: [
        '한 사람의 작은 행동도 여러 사람의 습관을 바꿀 수 있다.',
        '학교 복도의 불은 반드시 학생회가 맡아서 관리해야 한다.',
        '서준이 쪽지를 붙인 뒤 일주일 만에 복도가 밤마다 어두워졌다.',
        '전기를 아끼려면 학교 건물의 모든 불을 하루 종일 꺼 두어야 한다.',
      ],
      answer: 0,
      why: [
        '',
        '학생회 이야기는 글에 없습니다.',
        '일화의 결말일 뿐입니다. 요지는 일화 뒤의 일반화된 주장에서 찾습니다.',
        '글은 밤에 불을 끄는 습관을 말했을 뿐, 하루 종일 꺼 두라고 하지 않았습니다. 지나치게 넓힌 말입니다.',
      ],
      explain: '**As this example shows, a small action by one person can change the habits of a whole group.** 일화(서준의 쪽지)는 이 주장을 위한 예입니다. 요지는 일화 자체가 아니라 일화에서 끌어낸 일반적인 주장입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 4,
      q: '다음 문장으로 시작하는 글이 이어질 흐름으로 가장 알맞은 것은 무엇입니까?\n\nIt is commonly thought that the Great Wall of China can easily be seen from the Moon.',
      choices: [
        '그렇지 않다는 반박과 그 근거가 이어진다.',
        '만리장성을 쌓은 과정이 시간 순서대로 이어진다.',
        '달에서 보이는 다른 건축물들이 하나씩 소개된다.',
        '만리장성이 달에서 잘 보이는 까닭을 밝히는 질문과 답이 이어진다.',
      ],
      answer: 0,
      why: [
        '',
        'It is commonly thought ~ 는 통념을 소개하는 신호어입니다. 시간 순서의 신호(First, Then, Later)가 아닙니다.',
        '통념 하나를 소개했으므로 다음은 그 통념에 대한 판단이 옵니다. 다른 건축물을 나열할 실마리가 없습니다.',
        '통념을 사실로 받아들이고 까닭을 설명하는 흐름입니다. 통념 신호어 뒤에는 대개 그것을 뒤집는 내용이 옵니다.',
      ],
      hint: '첫 문장이 어떤 구조의 신호어로 시작하는지 보십시오.',
      explain: '**It is commonly thought that ~**은 통념-반박 구조의 시작 신호입니다. 다음에는 However, In fact 같은 말과 함께 "실제로는 맨눈으로 달에서 만리장성을 볼 수 없다"는 반박과 근거가 이어지리라고 예측할 수 있습니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '다음 글의 내용과 **일치하는** 것은 무엇입니까?\n\nThe term "renewable energy" refers to energy from sources that are naturally replaced, such as sunlight and wind. Energy sources can be divided into two groups: renewable and non-renewable. Coal and oil fall into the second group because they take millions of years to form.',
      choices: [
        'Coal is a non-renewable energy source.',
        'Wind falls into the non-renewable group.',
        'Renewable energy refers to energy that takes millions of years to form.',
        'Energy sources can be divided into three groups.',
      ],
      answer: 0,
      why: [
        '',
        '바람(wind)은 정의 문장에서 renewable energy의 예(such as sunlight and wind)로 나왔습니다.',
        '수백만 년이 걸려 만들어지는 것은 두 번째 무리(non-renewable)인 석탄과 석유의 특징입니다. 두 무리의 설명을 뒤바꿨습니다.',
        '글은 renewable과 non-renewable, 두 무리(two groups)로 나누었습니다.',
      ],
      hint: 'the second group이 무엇을 가리키는지 먼저 정하십시오.',
      explain: '에너지원을 renewable, non-renewable 두 무리로 나누었고, **Coal and oil fall into the second group**이라고 했습니다. the second group은 non-renewable이므로 석탄은 재생할 수 없는 에너지원입니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 0,
      q: '다음 글의 요지로 가장 알맞은 것은 무엇입니까?\n\nMany people believe that talent is the most important thing for becoming a great musician. Of course, natural ability can give some people a head start. However, people who become highly skilled usually share one thing: years of careful practice. A gifted beginner who rarely practices is often passed by a less gifted student who practices every day. In the long run, what you do with your ability matters more than the ability you start with.',
      choices: [
        '재능이 출발을 도울 수는 있지만, 길게 보면 꾸준한 연습이 더 중요하다.',
        '훌륭한 음악가가 되는 데 가장 중요한 것은 타고난 재능이다.',
        '재능은 음악가에게 전혀 쓸모가 없으므로 조금도 신경 쓸 필요가 없다.',
        '날마다 연습하는 학생은 누구나 반드시 세계적인 음악가가 된다.',
      ],
      answer: 0,
      why: [
        '',
        '첫 문장의 통념입니다. However 뒤에서 뒤집힙니다.',
        '글쓴이는 Of course ~ 에서 재능이 출발을 도울 수 있다고 인정했습니다. "전혀 쓸모없다"는 지나치게 나간 말입니다.',
        '"누구나 반드시"는 글에 없는 지나친 일반화입니다. 글은 연습이 재능보다 더 중요하다고 했을 뿐입니다.',
      ],
      hint: 'Of course ~ 에서 글쓴이가 무엇을 인정하고, However 뒤에서 무엇을 주장하는지 나누어 보십시오.',
      explain: '통념(재능이 가장 중요하다) → 양보(**Of course**, 재능이 출발을 도울 수는 있다) → 반박(**However**, 오랜 연습) → 결론(**In the long run**, 무엇을 하느냐가 더 중요하다). 반박은 통념을 완전히 부정하기보다 일부를 인정하고 더 중요한 것을 내세우는 경우가 많습니다.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'text', concept: 1,
      q: '빈칸에 알맞은 영어 낱말 한 개를 쓰십시오. (l로 시작합니다.)\n\nHave you ever wondered why cutting onions makes you cry? The answer [[빈칸]] in a gas that is released when an onion is cut. When this gas reaches your eyes, it bothers them, so your eyes make tears to wash it away.',
      answer: ['lies'],
      wrong: [
        { a: 'lie', why: '주어 The answer가 3인칭 단수이고 현재 시제이므로 lies로 씁니다.' },
        { a: 'lays', why: 'lay는 "~을 놓다"라는 타동사입니다. "~에 있다"는 자동사 lie를 써서 lies in이 됩니다.' },
        { a: 'lay', why: 'lay는 "~을 놓다"라는 타동사(또는 lie의 과거형)입니다. 현재의 사실이므로 lies로 씁니다.' },
      ],
      hint: '"답은 ~에 있다"를 영어로 어떻게 쓰는지 떠올리십시오.',
      explain: '**The answer lies in ~**(답은 ~에 있다)은 질문-답 구조에서 답을 이끄는 대표 표현입니다. lie in은 "~에 있다"라는 자동사이고, 주어가 단수이므로 **lies**입니다.',
    },
    {
      id: 'a5', level: 3, type: 'order', concept: 3,
      q: '일화로 시작해 주장으로 이어지는 글이 되도록 순서대로 배열하십시오.',
      choices: [
        'One rainy morning, Hayun saw an old man trying to carry heavy boxes up the stairs.',
        'She stopped and helped him carry them to his door.',
        'For the rest of the day, she felt surprisingly cheerful.',
        'As her story shows, kindness benefits not only the receiver but also the giver.',
      ],
      answer: [0, 1, 2, 3],
      hint: '과거 시제의 이야기가 먼저, 현재 시제의 일반적인 주장이 마지막입니다.',
      explain: '일화의 시작(One rainy morning ~) → 하윤의 행동(helped him) → 하윤이 느낀 결과(felt cheerful) → 전환 표현 **As her story shows**와 함께 현재 시제의 주장(친절은 받는 사람뿐 아니라 베푸는 사람에게도 도움이 된다) 순서입니다.',
    },
  ],

  deeper: [
    {
      title: '반박은 늘 "완전히 틀렸다"가 아니다',
      body: '통념-반박 구조라고 해서 글쓴이가 언제나 통념을 통째로 부정하는 것은 아닙니다. 실제 글에서는 다음 세 가지 꼴이 모두 나옵니다.\n\n' +
        '- **완전 반박**: Many people believe ~. However, this is simply not true.\n' +
        '- **부분 인정 후 반박(양보)**: Of course, ~ is partly true. However, ~ matters more.\n' +
        '- **보완**: ~ is true, but it is not the whole story.\n\n' +
        '양보 표현(**Of course, It is true that ~, Admittedly, ~**)이 보이면 "인정하는 부분"과 "주장하는 부분"을 나누어 읽어야 합니다. 요지를 고를 때 "통념은 전혀 쓸모없다"처럼 지나치게 나간 선택지는 대개 함정입니다.',
    },
    {
      title: '구조를 알면 순서·삽입·빈칸 문제가 풀린다',
      body: '글의 구조는 독해 문제의 여러 유형에 그대로 쓰입니다.\n\n' +
        '- **순서 배열**: 통념 → 반박, 질문 → 답, 분류 문장 → 첫째 유형 → 둘째 유형, 일화 → 주장의 흐름을 따라 놓습니다.\n' +
        '- **문장 삽입**: However로 시작하는 문장은 통념 바로 뒤에, The second type ~ 은 첫째 유형 설명 뒤에 들어갑니다.\n' +
        '- **빈칸 추론**: 빈칸이 반박 쪽에 있으면 통념과 반대되는 내용이, 일화 뒤의 주장 자리에 있으면 일화를 일반화한 내용이 들어갑니다.\n\n' +
        '처음 두 문장을 읽고 "이 글은 어떤 구조일까?"를 먼저 정하는 습관을 들이면 긴 지문도 길을 잃지 않고 읽을 수 있습니다.',
    },
  ],

  faq: [
    {
      q: 'Many people believe로 시작하면 무조건 통념-반박 구조인가요?',
      a: '대부분 그렇지만 무조건은 아닙니다. 드물게 많은 사람이 믿는 내용이 실제로 맞다고 덧붙이며 뒷받침하는 글도 있습니다. 그래서 신호어는 예측의 출발점으로 쓰고, 바로 뒤에 However, In fact 같은 전환이 실제로 나오는지 확인해야 합니다.',
    },
    {
      q: '질문으로 시작하는 글에서 답이 여러 개 나오면 요지는 무엇인가요?',
      a: '답이 One reason is ~, Another reason is ~ 처럼 여러 개라면, 그것들을 하나로 묶은 말이 요지입니다. 예를 들어 "잠이 부족하면 집중력이 떨어지고 기분도 나빠진다"는 두 답을 묶으면 "잠은 공부와 마음 건강 모두에 중요하다"가 됩니다.',
    },
    {
      q: 'refer to랑 mean은 뜻이 같은데 왜 하나에만 to가 붙나요?',
      a: '두 동사의 쓰임이 달라서입니다. refer는 "~을 가리키다"라고 할 때 반드시 전치사 to와 함께 쓰고(A refers to B), mean은 타동사라서 바로 명사가 옵니다(A means B). 그래서 빈칸 뒤에 to가 있으면 refers, 없으면 means를 고르면 됩니다.',
    },
  ],

  mistakes: [
    '통념-반박 구조에서 첫 문장(Many people believe ~)을 요지로 고르는 실수 — 글쓴이의 주장은 However, In fact 뒤에 있습니다.',
    '일화로 시작하는 글에서 일화의 결말을 요지로 고르는 실수 — 요지는 This story shows ~ 뒤의 일반화된 주장입니다.',
    'fall into를 수동태(be fallen into)로 쓰거나 refer 뒤에 to를 빠뜨리는 실수 — fall into는 능동으로, refer는 refer to로 씁니다.',
  ],

  gens: [
    {
      id: 'predict-next',
      level: 2,
      title: '구조 신호어로 다음 내용 예측하기',
      make: function (R) {
        var items = [
          { c: 0, s: 'Most of us assume that the tallest player on a basketball team is always the best one.',
            ok: '꼭 그렇지는 않다는 반박',
            bad: [['키가 큰 선수가 최고라는 생각을 뒷받침하는 예', 'Most of us assume ~ 는 통념 신호어입니다. 통념 뒤에는 그것을 뒤집는 내용이 오기 쉽습니다.'],
              ['농구 선수를 맡은 역할에 따라 나누는 분류', '분류 신호어(fall into, can be divided into)가 없습니다.'],
              ['키가 큰 한 선수의 어린 시절 이야기', '통념을 소개한 문장 뒤에 갑자기 일화가 시작될 실마리가 없습니다.']],
            why: '**Most of us assume ~**는 통념을 소개하는 신호어입니다. 다음에는 However ~ 와 함께 "가장 키 큰 선수가 늘 가장 잘하는 것은 아니다"라는 반박이 오리라고 예측합니다.' },
          { c: 0, s: 'You may have heard that people use only ten percent of their brains.',
            ok: '그 말이 사실이 아니라는 반박',
            bad: [['뇌를 10퍼센트만 쓰는 까닭을 밝히는 설명', '통념을 사실로 받아들인 흐름입니다. You may have heard ~ 는 대개 뒤집힐 통념을 소개합니다.'],
              ['뇌를 부위별로 나누는 분류', '분류 신호어가 없습니다. 통념 신호어 뒤에는 반박이 오기 쉽습니다.'],
              ['뇌를 공부하는 과학자가 되는 방법', '통념과 상관없는 새 화제입니다.']],
            why: '**You may have heard that ~**은 통념을 소개하는 신호어입니다. 실제로 사람은 뇌의 거의 모든 부분을 쓰므로, 다음에는 However, In fact ~ 로 시작하는 반박이 이어지리라고 예측합니다.' },
          { c: 1, s: 'Have you ever wondered why we feel sleepy after a big lunch?',
            ok: '그 까닭을 밝히는 답',
            bad: [['점심을 많이 먹어야 한다는 통념', '질문 뒤에는 답이 옵니다. Many people believe 같은 통념 신호어가 없습니다.'],
              ['점심 메뉴를 종류별로 나누는 분류', '질문은 졸린 까닭을 묻고 있습니다. 메뉴의 종류와 상관없습니다.'],
              ['또 다른 질문들을 잇달아 나열하는 내용', '질문-답 구조에서는 질문 다음에 The answer lies in ~, The reason is ~ 같은 답이 옵니다.']],
            why: '**Have you ever wondered why ~?**는 질문-답 구조의 시작입니다. 다음에는 The reason is ~ 처럼 까닭을 밝히는 답이 오리라고 예측합니다.' },
          { c: 1, s: 'What makes some songs stick in our heads for days?',
            ok: '그런 노래들의 공통된 특징을 밝히는 답',
            bad: [['노래를 장르에 따라 나누는 분류', '질문은 머릿속에 남는 까닭을 묻고 있습니다. 분류 신호어도 없습니다.'],
              ['노래를 많이 들으면 안 된다는 통념', '통념 신호어가 없고, 질문 다음에는 답이 옵니다.'],
              ['노래를 처음 만든 사람의 이야기', '질문의 답과 상관없는 내용입니다.']],
            why: '**What makes ~?**는 원인을 묻는 질문입니다. 다음에는 The answer lies in ~, One reason is ~ 처럼 답이 이어지리라고 예측합니다.' },
          { c: 2, s: 'Volcanoes can be classified into three types according to how active they are.',
            ok: '세 유형 가운데 첫째 유형에 대한 설명',
            bad: [['화산이 위험하지 않다는 반박', '통념을 소개한 적이 없으므로 반박이 올 자리가 아닙니다.'],
              ['화산은 왜 생기느냐는 질문', '이미 분류를 시작했으므로 유형을 하나씩 설명할 차례입니다.'],
              ['화산 폭발을 본 사람의 이야기', '분류 신호어 뒤에는 일화보다 유형 설명이 옵니다.']],
            why: '**can be classified into three types**는 분류 신호어입니다. 다음에는 The first type ~ 처럼 유형이 하나씩 나오리라고 예측하고 개수를 세며 읽습니다.' },
          { c: 2, s: 'The term "food miles" refers to the distance food travels from the farm to your plate.',
            ok: '정의를 돕는 구체적인 예',
            bad: [['그 낱말의 뜻이 틀렸다는 반박', '정의 문장은 낱말의 뜻을 알려 줍니다. 반박할 통념이 소개되지 않았습니다.'],
              ['농장에서 일한 한 사람의 어린 시절 이야기', '정의 뒤에 갑자기 일화가 올 실마리가 없습니다.'],
              ['접시를 고르는 방법에 대한 질문', '화제(food miles)와 상관없는 내용입니다.']],
            why: '**refers to**는 정의 신호어입니다. 정의 다음에는 For example, a banana grown far away ~ 처럼 뜻을 실감 나게 하는 예가 이어지기 쉽습니다.' },
          { c: 3, s: 'When I was ten, I was too shy to say hello to my new neighbors.',
            ok: '이야기가 이어진 뒤 그 경험에서 얻은 깨달음',
            bad: [['이웃을 여러 종류로 나누는 분류', '과거 시제로 시작한 개인 이야기입니다. 분류 신호어가 없습니다.'],
              ['수줍음에 대한 통념과 그 반박', '통념 신호어(Many people believe ~)가 없습니다.'],
              ['인사란 무엇인지 밝히는 정의', '정의 신호어(refers to, is defined as)가 없습니다.']],
            why: '**When I was ten, ~**처럼 과거 시제로 시작하는 문장은 일화의 신호입니다. 이야기가 이어진 뒤 This experience taught me ~ 같은 깨달음이나 주장으로 마무리되리라고 예측합니다.' },
          { c: 3, s: 'Last summer, my little brother tried to build a sandcastle, but the waves kept washing it away.',
            ok: '동생 이야기가 이어지다가 거기서 얻은 교훈',
            bad: [['모래를 알갱이 크기에 따라 나누는 분류', '과거 시제의 이야기로 시작했습니다. 분류 신호어가 없습니다.'],
              ['파도는 왜 생기느냐는 질문과 답', '이야기 속 장면일 뿐, 질문 신호(Why ~?)가 없습니다.'],
              ['모래성이 쉽게 무너진다는 통념의 반박', '통념 신호어가 없습니다.']],
            why: '**Last summer, ~**처럼 때를 밝히며 과거 시제로 시작하는 문장은 일화의 신호입니다. 이야기가 이어진 뒤 This shows that ~ 같은 교훈으로 넘어가리라고 예측합니다.' },
          { c: 4, s: 'Small daily habits can save a lot of energy at home.',
            ok: '그 주장을 뒷받침하는 구체적인 예',
            bad: [['에너지를 아끼자는 말을 뒤집는 반박', '글쓴이가 방금 내세운 주장을 스스로 뒤집을 까닭이 없습니다.'],
              ['에너지란 무엇이냐는 질문', '이미 주장을 밝혔으므로 처음부터 다시 질문할 자리가 아닙니다.'],
              ['에너지를 처음 발견한 사람의 이야기', '주장과 상관없는 새 화제입니다.']],
            why: '일반적인 주장 문장 다음에는 **For example**, turning off lights ~ 처럼 주장을 뒷받침하는 구체적인 예가 오기 쉽습니다.' },
        ];
        var it = R.pick(items);
        var reason = {};
        it.bad.forEach(function (b) { reason[b[0]] = b[1]; });
        var pick = R.choices(it.ok, it.bad.map(function (b) { return b[0]; }));
        return {
          type: 'choice', concept: it.c,
          q: '다음 문장 뒤에 이어질 내용으로 가장 알맞은 것은 무엇입니까?\n\n' + it.s,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (x) { return x === it.ok ? '' : reason[x]; }),
          explain: it.why,
        };
      },
    },
  ],

  vocab: [
    { w: 'belief', m: '믿음, 생각', ex: 'There is a common belief that cats hate water.', exm: '고양이가 물을 싫어한다는 흔한 믿음이 있습니다.' },
    { w: 'commonly', m: '흔히, 일반적으로', ex: 'This plant is commonly found near rivers.', exm: '이 식물은 흔히 강 근처에서 발견됩니다.' },
    { w: 'assume', m: '(사실이라고) 생각하다, 가정하다', ex: 'Don\'t assume that a quiet student has no ideas.', exm: '조용한 학생은 생각이 없다고 단정하지 마십시오.' },
    { w: 'contrary to', m: '~와 반대로, ~와 달리', ex: 'Contrary to my fears, the test was easy.', exm: '내 걱정과 달리 시험은 쉬웠습니다.' },
    { w: 'in fact', m: '사실은, 실제로는', ex: 'He looks calm. In fact, he is very nervous.', exm: '그는 차분해 보입니다. 사실은 매우 긴장해 있습니다.' },
    { w: 'evidence', m: '증거, 근거', ex: 'There is no evidence that this drink makes you smarter.', exm: '이 음료가 사람을 더 똑똑하게 만든다는 증거는 없습니다.' },
    { w: 'wonder', m: '궁금해하다', ex: 'I wonder why the moon changes its shape.', exm: '나는 달이 왜 모양을 바꾸는지 궁금합니다.' },
    { w: 'lie in', m: '~에 있다', ex: 'The secret of good bread lies in the dough.', exm: '좋은 빵의 비결은 반죽에 있습니다.' },
    { w: 'classify', m: '분류하다', ex: 'We classified the books by topic.', exm: '우리는 책을 주제별로 분류했습니다.' },
    { w: 'category', m: '범주, 부류', ex: 'Tomatoes and peppers belong to the same category of plants.', exm: '토마토와 고추는 같은 식물 부류에 속합니다.' },
    { w: 'fall into', m: '(어떤 부류로) 나뉘다, ~에 속하다', ex: 'Most of the complaints fall into two groups.', exm: '불만 대부분은 두 갈래로 나뉩니다.' },
    { w: 'refer to', m: '~을 가리키다, ~을 뜻하다', ex: 'The word "pupil" can refer to a student.', exm: 'pupil이라는 낱말은 학생을 가리킬 수 있습니다.' },
    { w: 'define', m: '정의하다, 뜻을 밝히다', ex: 'How would you define friendship?', exm: '우정을 어떻게 정의하겠습니까?' },
    { w: 'anecdote', m: '일화, 짧은 이야기', ex: 'The speaker began with a funny anecdote about her first job.', exm: '연설자는 첫 직장에 대한 재미있는 일화로 말을 시작했습니다.' },
    { w: 'predict', m: '예측하다', ex: 'Good readers predict what comes next.', exm: '능숙한 독자는 다음에 무엇이 올지 예측합니다.' },
    { w: 'lesson', m: '교훈; 수업', ex: 'The story teaches an important lesson about honesty.', exm: '그 이야기는 정직에 관한 중요한 교훈을 줍니다.' },
  ],
});
})();
