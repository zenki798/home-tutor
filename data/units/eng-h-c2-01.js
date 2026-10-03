/* 공통영어2 · 주장과 근거 파악하기
 * 지문은 모두 직접 쓴 글이다(가상의 학교·인물·수치). */
(function () {
  // 글 A: 등교 시각 (직접 쓴 글, 가상의 인물·가상의 조사)
  var SLEEP = 'Many high schools in our city begin classes at 8 a.m. I believe schools **should** start at least 30 minutes later. According to a survey of 1,200 students in our city, 64 percent said they feel sleepy during first period. Dr. Mina Cho, a sleep researcher, explains that teenagers\' bodies naturally fall asleep later at night, so waking up early is especially hard for them. Some people argue that a later start would leave less time for after-school activities. However, most clubs could simply move their meetings back by 30 minutes, and well-rested students would enjoy those activities more. A small change in the schedule could make a big difference in students\' health and learning.';
  // 글 B: 다회용 컵 (직접 쓴 글, 가상의 학교)
  var CUPS = 'Our school cafeteria uses about 500 plastic cups every day. With about 180 school days a year, that adds up to 90,000 cups. We **must** stop this waste, and the best way is for our school to provide reusable cups. Last year, Greenhill High School in a nearby town tried this idea. Within six months, its plastic waste dropped by 40 percent. Some students may worry that washing so many cups will be difficult. In fact, our cafeteria already has a dishwasher that can wash 200 cups in an hour. Switching to reusable cups is a simple step that any school can take.';
  // 글 C: 자전거 도로 (직접 쓴 글, 가상의 도시·수치)
  var BIKES = 'Some people think that new bike lanes are a waste of road space because only a few people ride bikes. But people do not ride bikes on roads that feel dangerous. When the city of Westport added 20 kilometers of protected bike lanes, the number of people riding to work doubled in two years. Fewer cars on the road also meant cleaner air near schools. Traffic engineer Paul Hayes says that a safe bike lane can carry more people per hour than a car lane of the same width. **It is time for our city to build a connected network of safe bike lanes.**';

Tutor.registerUnit({
  id: 'eng-h-c2-01',
  course: 'eng-h-c2',
  title: '주장과 근거 파악하기',
  summary: '글쓴이가 내세우는 주장을 찾고, 그 주장을 받치는 근거와 세부 정보를 정확히 확인합니다.',
  goals: [
    'should, must, It is important to ~ 같은 표현을 단서로 글쓴이의 주장을 찾을 수 있다.',
    '근거가 통계·사례·전문가 의견 가운데 무엇인지 구별하고, 근거 속 세부 정보를 정확히 확인할 수 있다.',
    '글에 나온 예상 반론과 그에 대한 반박을 구별할 수 있다.',
    '글쓴이의 주장을 한 문장으로 정리할 수 있다.',
  ],
  standards: ['[10공영2-01-01]', '[10공영2-01-02]'],

  concepts: [
    {
      title: '주장을 드러내는 표현',
      body: '**주장(claim)**은 글쓴이가 독자에게 "이렇게 생각해 달라, 이렇게 해 달라"고 내세우는 생각입니다. 주장하는 글에서는 주장이 다음과 같은 표현에 담기는 경우가 많습니다.\n\n| 표현 | 예 |\n|---|---|\n| 의무·당위의 조동사 | We **should** / **must** / **need to** / **ought to** reduce food waste. |\n| 중요성·필요성 | **It is important (essential, necessary) to** protect local parks. |\n| 글쓴이의 판단 | **I believe (think, am convinced) that** schools should start later. |\n| 촉구 | **It is time to** act. / **Let\'s** ~. / **Why don\'t we** ~? |\n\n주장 문장은 글의 **처음**이나 **끝**에 오는 경우가 많지만, 중간에 올 수도 있습니다. 그래서 위치보다 **표현과 역할**로 찾습니다. 숫자나 사실을 그대로 전하는 문장(64 percent of students …)은 주장이 아니라 주장을 받치는 근거입니다.\n\n> 💡 주장 문장은 "사실인가?"가 아니라 "동의하는가?"를 물을 수 있는 문장입니다. "학교는 더 늦게 시작해야 한다"에는 찬성·반대가 갈릴 수 있습니다.',
      easy: '친구에게 "우리 이번 주말에 영화 보러 가자!"라고 말하면서 "그 영화 평점이 9점이래", "주말에는 할인도 해"라고 덧붙인다고 해 봅시다. 앞의 말이 **주장**이고, 뒤의 말들이 **근거**입니다.\n\n영어 글에서도 should, must, It is important to ~ 처럼 "해야 한다, 하자"는 말이 들어 있는 문장이 바로 "영화 보러 가자"에 해당하는 문장입니다.',
      check: {
        type: 'choice',
        q: '다음 중 글쓴이의 **주장**을 드러내는 문장은 무엇입니까?',
        choices: [
          'We should turn off the lights when we leave a classroom.',
          'Our school used 10 percent more electricity this year.',
          'The lights in the gym are on for about 12 hours a day.',
        ],
        answer: 0,
        why: ['', '사용량이 늘었다는 사실(수치)을 전하는 문장이라 근거에 해당합니다.', '불이 켜져 있는 시간을 알려 주는 사실 문장입니다. 주장을 받치는 근거로 쓰일 수 있습니다.'],
        explain: '**should**(~해야 한다)가 들어 있어 "교실을 나갈 때 불을 끄자"는 글쓴이의 생각을 내세웁니다. 나머지 두 문장은 수치를 전하는 사실, 곧 근거입니다.',
      },
    },
    {
      title: '근거의 종류: 통계·사례·전문가 의견',
      body: '**근거(evidence, support)**는 주장이 옳다고 믿게 하는 자료입니다. 주장하는 글에 자주 쓰이는 근거는 세 가지입니다.\n\n| 종류 | 무엇인가 | 자주 나오는 표지 |\n|---|---|---|\n| **통계** | 조사·실험에서 나온 수치 | According to a survey, …percent, … out of …, The number of … doubled |\n| **사례** | 실제로 있었던 일이나 구체적인 예 | For example, For instance, Last year, … tried this |\n| **전문가 의견** | 그 분야를 잘 아는 사람의 말 | Dr. ~, a scientist, says / explains / points out that … |\n\n근거의 종류를 알면 그 근거를 어떻게 따져 볼지도 알 수 있습니다. 통계는 **누구를 몇 명** 조사했는지, 사례는 **한 번의 일**을 모두에게 넓혀도 되는지, 전문가 의견은 **그 사람이 정말 그 분야의 전문가**인지를 봅니다.\n\n> 💡 According to 뒤에 **사람**이 오면 전문가 의견, **조사·보고서**가 오면 통계일 때가 많습니다.',
      easy: '친구들에게 "체육 시간 전에 꼭 준비 운동을 하자"고 설득한다고 해 봅시다. "지난해 체육 시간에 다친 학생 40명 가운데 30명이 준비 운동을 하지 않았대"(통계), "옆 반은 준비 운동을 시작한 뒤 한 학기 동안 다친 사람이 한 명도 없었대"(사례), "체육 선생님도 준비 운동이 부상을 막아 준다고 하셨어"(전문가 의견). 모두 주장을 받치는 근거지만 종류가 다릅니다.\n\n글에서도 숫자가 보이면 통계, For example 이 보이면 사례, Dr. 나 expert 가 보이면 전문가 의견일 가능성이 큽니다.',
      check: {
        type: 'choice',
        q: '다음 문장은 어떤 종류의 근거입니까?\n\nProfessor Jenny Moore, who has studied food waste for 15 years, says that most food is thrown away at home, not in restaurants.',
        choices: ['전문가 의견', '통계', '사례'],
        answer: 0,
        why: ['', '수치(15 years)가 있지만 조사 결과가 아니라 연구 기간입니다. 이 문장의 핵심은 "그 분야를 연구한 사람의 말"입니다.', '실제로 있었던 구체적인 한 가지 일을 전하는 것이 아니라 연구자의 판단을 전하고 있습니다.'],
        explain: '15년 동안 음식물 쓰레기를 연구한 교수(Professor)가 **says that** ~ 으로 자신의 판단을 말하고 있으므로 **전문가 의견**입니다.',
      },
    },
    {
      title: '근거 속 세부 정보 확인하기',
      body: '근거를 찾았다면 그 안의 **세부 정보**를 정확히 읽어야 합니다. 문제는 흔히 수치·대상·기간 가운데 한 군데만 바꾼 선택지로 함정을 만듭니다.\n\n- **수와 단위**: 64 percent(비율)와 1,200 students(조사한 사람 수)를 섞지 않습니다. 500 cups **every day**와 90,000 cups **a year**는 기간이 다릅니다.\n- **누구·무엇**: 조사 대상이 students인지 teachers인지, 결과가 our school인지 another school인지 봅니다.\n- **변화의 방향**: dropped(줄었다)·increased(늘었다)·doubled(두 배가 되었다)를 정확히 읽습니다.\n- **정도 표현**: about(약), at least(적어도), more than(~보다 많이), within six months(6개월 안에)는 뜻을 바꿉니다.\n\n> ⚠️ 선택지에 글의 숫자가 그대로 나왔다고 해서 맞는 것은 아닙니다. **그 숫자가 무엇의 수인지**까지 맞아야 합니다.',
      easy: '"우리 반 30명 중 20명이 찬성했다"를 친구에게 전할 때 "20퍼센트가 찬성했대"라고 하면 틀린 말이 됩니다. 숫자 20은 맞지만 그 숫자가 가리키는 것(사람 수)이 바뀌었기 때문입니다.\n\n세부 정보를 확인할 때는 숫자마다 "이건 무엇의 수지?"라고 꼬리표를 붙여 두면 함정에 걸리지 않습니다.',
      check: {
        type: 'ox',
        q: '"According to a survey of 1,200 students, 64 percent said they feel sleepy during first period."라는 문장에 따르면, 1교시에 졸리다고 답한 학생은 1,200명이다.',
        answer: false,
        explain: '1,200은 **조사한 학생 수**이고, 졸리다고 답한 것은 그중 **64 percent**입니다. 숫자마다 무엇의 수인지 확인해야 합니다.',
      },
    },
    {
      title: '예상되는 반론과 반박',
      body: '설득력 있는 글은 자기 주장만 늘어놓지 않고, 독자가 품을 만한 **반대 의견(반론)**을 먼저 꺼낸 뒤 그것이 왜 문제가 되지 않는지 **반박**합니다.\n\n| 역할 | 자주 나오는 표현 |\n|---|---|\n| 반론 소개 | Some people argue (say, think, worry) that … / Critics claim … / It is true that … / Of course, … |\n| 반박 | However, … / But … / In fact, … / This is not true because … / Even so, … |\n\n반론 문장은 **글쓴이의 생각이 아닙니다.** 글쓴이는 반론을 소개한 뒤 바로 뒤에서 뒤집습니다. 그래서 "글쓴이의 주장"을 묻는 문제에서 Some people argue ~ 문장을 고르면 틀립니다.\n\n> 💡 반론 → However → 반박의 흐름을 찾으면, 반박 문장에서 글쓴이의 주장이 한 번 더 드러나는 경우가 많습니다.',
      easy: '토론에서 "물론 상대 팀 말처럼 비용이 들 수는 있습니다. **하지만** 그 비용보다 얻는 것이 훨씬 큽니다."라고 말하는 장면을 떠올려 보십시오. 앞부분은 상대의 생각(반론)을 인정하는 척 꺼낸 것이고, "하지만" 뒤가 내 생각(반박)입니다.\n\n영어 글에서는 Some people think ~ 가 앞부분, However ~ 가 뒷부분입니다.',
      check: {
        type: 'choice',
        q: '다음 두 문장에서 **반박**에 해당하는 부분은 무엇입니까?\n\nSome people worry that school uniforms are expensive. However, students can wear them every day, so families actually spend less on clothes.',
        choices: [
          'However, students can wear them every day, so families actually spend less on clothes.',
          'Some people worry that school uniforms are expensive.',
          '두 문장 모두 반론이다.',
        ],
        answer: 0,
        why: ['', 'Some people worry that ~ 은 글쓴이가 소개한 다른 사람들의 걱정, 곧 반론입니다.', 'However 뒤의 문장은 앞의 걱정을 뒤집고 있으므로 반론이 아니라 반박입니다.'],
        explain: 'Some people worry that ~ 으로 반론(교복이 비싸다)을 소개하고, **However** 뒤에서 "매일 입으니 오히려 옷값이 덜 든다"고 반박합니다.',
      },
    },
    {
      title: '글쓴이의 주장을 한 문장으로 정리하기',
      body: '글을 다 읽었다면 주장을 **한 문장으로** 정리해 봅니다. 좋은 정리 문장은 두 가지를 담습니다.\n\n1. **무엇에 대해**(화제): 등교 시각, 플라스틱 컵, 자전거 도로 …\n2. **어떤 입장인가**(주장): should start later, must stop using …\n\n틀(예): **The writer argues that** ___ **should** ___ **because** ___.\n\n정리할 때 피해야 할 두 가지가 있습니다.\n\n- **너무 좁게**: 근거 하나만 옮긴 문장("64퍼센트가 졸리다")은 주장이 아닙니다.\n- **너무 넓게**: "잠은 중요하다"처럼 글이 실제로 요구하는 행동(등교 시각을 늦추자)이 빠지면 주장을 놓친 것입니다.\n\n> 💡 처음과 끝에 비슷한 생각이 두 번 나오면, 그 둘을 합친 것이 글의 주장일 가능성이 큽니다.',
      easy: '친구가 긴 글을 보여 주며 "그래서 이 사람이 하고 싶은 말이 뭐야?"라고 물으면 한 문장으로 답해야 합니다. "이 사람은 학교가 30분 늦게 시작해야 한다고 말해. 학생들이 아침에 너무 졸리니까." 이렇게 **누가 무엇을 해야 하는지 + 왜**를 담으면 됩니다.',
      check: {
        type: 'choice',
        q: '주장하는 글을 한 문장으로 정리한 것으로 가장 알맞은 형태는 무엇입니까?',
        choices: [
          '화제와 글쓴이의 입장(해야 할 일)을 함께 담은 문장',
          '글에 나온 통계 수치 하나를 그대로 옮긴 문장',
          '화제에 대해 누구나 동의할 만한 넓은 일반론',
        ],
        answer: 0,
        why: ['', '수치 하나는 근거일 뿐 주장이 아닙니다. 너무 좁게 정리한 것입니다.', '글이 실제로 요구하는 행동이 빠져 너무 넓게 정리한 것입니다.'],
        explain: '주장 정리 문장에는 **무엇에 대해**(화제)와 **어떤 입장인지**(should ~)가 함께 들어가야 합니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 글에서 주장, 근거(종류), 반론, 반박을 찾아보십시오.\n\nOur town should build a skate park for teenagers. According to a town survey, 300 young people said they have nowhere to skate safely. Some adults worry that a skate park would be noisy. However, the park could be built next to the sports field, far from houses.',
      steps: [
        '주장 표현을 찾습니다. **should**가 있는 첫 문장 Our town should build a skate park for teenagers.가 주장입니다.',
        '**According to a town survey**와 수(300)가 나오므로 둘째 문장은 **통계** 근거입니다. 세부 정보: 안전하게 탈 곳이 없다고 답한 사람이 300명입니다.',
        '**Some adults worry that** ~ 은 다른 사람들의 걱정을 소개하므로 **반론**(시끄러울 것이다)입니다.',
        '**However** 뒤의 문장은 "주택에서 먼 운동장 옆에 지으면 된다"며 반론을 뒤집으므로 **반박**입니다.',
      ],
      answer: '주장: 스케이트 공원을 지어야 한다 / 근거: 통계(300명) / 반론: 시끄러울 것이다 / 반박: 주택에서 먼 곳에 지으면 된다',
    },
    {
      q: '다음 글의 주장을 한 문장으로 정리해 보십시오.\n\n' + CUPS,
      steps: [
        '화제를 찾습니다: 학교 급식실의 플라스틱 컵.',
        '주장 표현을 찾습니다: We **must** stop this waste, and the best way is for our school to provide reusable cups. → 다회용 컵을 제공해야 한다.',
        '근거를 확인합니다: 하루 약 500개·1년 90,000개(통계), 다른 학교에서 6개월 안에 플라스틱 쓰레기가 40퍼센트 줄었다(사례).',
        '반론(세척이 어렵다)과 반박(식기세척기가 한 시간에 200개를 씻는다)은 주장을 지키는 부분이므로 정리 문장의 중심이 아닙니다.',
        '화제 + 입장 + 대표 근거로 묶습니다.',
      ],
      answer: 'The writer argues that our school should provide reusable cups to cut down on plastic waste. (학교가 플라스틱 쓰레기를 줄이기 위해 다회용 컵을 제공해야 한다.)',
    },
  ],

  terms: [
    { term: '주장(claim)', def: '글쓴이가 독자에게 받아들이라고 내세우는 생각입니다. should, must, It is important to ~ 같은 표현에 담기는 경우가 많습니다.' },
    { term: '근거(evidence)', def: '주장이 옳다고 믿게 하는 자료입니다. 통계·사례·전문가 의견 등이 있습니다.' },
    { term: '통계', def: '조사나 실험에서 나온 수치 자료입니다. 예: 64 percent of students said …' },
    { term: '사례', def: '주장을 뒷받침하는 실제 일이나 구체적인 예입니다. For example, Last year … 같은 말로 시작하는 경우가 많습니다.' },
    { term: '전문가 의견', def: '그 분야를 잘 아는 사람의 판단을 빌려 온 근거입니다. 예: Dr. Cho, a sleep researcher, explains that …' },
    { term: '반론', def: '글쓴이의 주장에 반대하는 의견입니다. Some people argue that … 처럼 남의 생각으로 소개됩니다.' },
    { term: '반박', def: '반론이 옳지 않거나 문제가 되지 않는 이유를 들어 되받는 것입니다. However, In fact 등으로 시작하는 경우가 많습니다.' },
    { term: '주장하는 글', def: '읽는 사람을 설득하려고 주장과 근거를 짜임새 있게 쓴 글입니다. 논설문이라고도 합니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '다음 중 글쓴이의 주장을 드러내는 문장으로 가장 알맞은 것은 무엇입니까?',
      choices: [
        'It is important to give students more time to eat lunch.',
        'Lunch break at our school lasts 40 minutes.',
        'About 900 students eat in the cafeteria every day.',
        'The cafeteria opened in 2015.',
      ],
      answer: 0,
      why: ['', '점심시간 길이를 알려 주는 사실 문장입니다. 주장의 근거로 쓰일 수는 있지만 주장은 아닙니다.', '급식실을 쓰는 학생 수(통계)를 알려 주는 사실 문장입니다.', '문을 연 해를 알려 주는 사실 문장입니다. 동의·반대를 따질 수 없습니다.'],
      explain: '**It is important to** ~ 는 "~하는 것이 중요하다"며 글쓴이의 생각을 내세우는 대표적인 주장 표현입니다. 나머지는 모두 사실을 전하는 문장입니다.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: '글 A에서 "According to a survey of 1,200 students in our city, 64 percent said they feel sleepy during first period."는 글쓴이의 주장이다.\n\n' + SLEEP,
      answer: false,
      explain: '이 문장은 조사 결과(통계)를 전하는 **근거**입니다. 글쓴이의 주장은 **I believe schools should start at least 30 minutes later.**입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '다음 문장은 어떤 종류의 근거입니까?\n\nIn a study of 500 office workers, those who took a short walk after lunch felt 20 percent less tired in the afternoon.',
      choices: ['통계', '사례', '전문가 의견', '반론'],
      answer: 0,
      why: ['', '한 사람이나 한 곳의 구체적인 일이 아니라, 500명을 조사한 결과를 수치로 나타냈습니다.', '특정 전문가가 자신의 판단을 말하는 문장이 아닙니다.', '주장에 반대하는 의견이 아니라 주장을 받치는 자료입니다.'],
      explain: '**In a study of 500 office workers**(500명 연구)와 **20 percent** 같은 수치가 나오므로 **통계** 근거입니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 1,
      q: '글 B에서 "Last year, Greenhill High School in a nearby town tried this idea."로 시작하는 부분은 어떤 종류의 근거입니까?\n\n' + CUPS,
      choices: ['사례', '전문가 의견', '반박', '주장'],
      answer: 0,
      why: ['', '전문가의 말을 옮긴 것이 아니라 다른 학교에서 실제로 있었던 일을 소개합니다.', '반론을 뒤집는 부분은 In fact로 시작하는 식기세척기 문장입니다.', '주장은 다회용 컵을 제공해야 한다는 문장입니다. 이 부분은 그 주장을 받칩니다.'],
      explain: '이웃 학교가 **실제로 해 본 일**(다회용 컵 도입 후 6개월 안에 플라스틱 쓰레기 40퍼센트 감소)을 보여 주므로 **사례**입니다. 40 percent라는 수치가 있지만, 한 학교의 경험을 소개하는 것이 중심입니다.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', unit: '개', concept: 2,
      q: '글 B에 따르면, 학교 급식실은 **하루에** 플라스틱 컵을 약 몇 개 씁니까? 숫자로 쓰십시오.\n\n' + CUPS,
      answer: '500',
      wrong: [
        { a: '90000', why: '90,000은 1년 동안 쓰는 양입니다. 질문은 하루(every day)에 쓰는 양을 묻습니다.' },
        { a: '200', why: '200은 식기세척기가 한 시간에 씻을 수 있는 컵의 수입니다.' },
      ],
      explain: '첫 문장 Our school cafeteria uses about **500** plastic cups **every day**.에 답이 있습니다. 90,000은 1년(180일) 동안의 양입니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 2,
      q: '글 A의 내용과 **일치하지 않는** 것은 무엇입니까?\n\n' + SLEEP,
      choices: [
        '조사에서 1교시에 졸리다고 답한 학생은 1,200명이다.',
        '글쓴이는 학교가 적어도 30분 늦게 시작해야 한다고 생각한다.',
        '수면 연구자는 십 대의 몸이 밤에 자연스럽게 늦게 잠든다고 설명한다.',
        '글쓴이는 동아리가 모임 시간을 30분 늦출 수 있다고 본다.',
      ],
      answer: 0,
      why: ['', '두 번째 문장 I believe schools should start at least 30 minutes later.와 일치합니다.', 'Dr. Mina Cho의 설명(teenagers\' bodies naturally fall asleep later at night)과 일치합니다.', 'most clubs could simply move their meetings back by 30 minutes와 일치합니다.'],
      explain: '1,200은 **조사한 학생 수**이고, 졸리다고 답한 것은 그중 **64 percent**입니다. 숫자가 무엇의 수인지 바꾼 선택지이므로 일치하지 않습니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '글 A에서 **예상되는 반론**에 해당하는 문장은 무엇입니까?\n\n' + SLEEP,
      choices: [
        'Some people argue that a later start would leave less time for after-school activities.',
        'However, most clubs could simply move their meetings back by 30 minutes.',
        'I believe schools should start at least 30 minutes later.',
        'A small change in the schedule could make a big difference in students\' health and learning.',
      ],
      answer: 0,
      why: ['', 'However로 시작하는 이 문장은 반론을 뒤집는 반박입니다.', '이 문장은 글쓴이의 주장입니다.', '글을 마무리하며 주장을 다시 강조하는 문장입니다.'],
      explain: '**Some people argue that** ~ 은 글쓴이가 아닌 다른 사람들의 생각(늦게 시작하면 방과 후 활동 시간이 줄어든다)을 소개하는 반론입니다. 바로 다음 However 문장이 반박입니다.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 4,
      q: '글 A의 주장을 한 문장으로 가장 잘 정리한 것은 무엇입니까?\n\n' + SLEEP,
      choices: [
        'Schools should start later because early classes are hard on teenagers\' sleep and learning.',
        'Sixty-four percent of students in the city feel sleepy during first period.',
        'Sleep is important for everyone\'s health.',
        'After-school clubs should meet 30 minutes earlier.',
      ],
      answer: 0,
      why: ['', '근거 하나(통계)만 옮겨 너무 좁게 정리했습니다.', '글이 요구하는 행동(등교 시각을 늦추자)이 빠져 너무 넓게 정리했습니다.', '글은 동아리 모임을 30분 늦출 수 있다고 했습니다(earlier가 아니라 back). 또 이것은 반박 속 세부 내용이지 주장이 아닙니다.'],
      hint: '화제(등교 시각)와 글쓴이의 입장(should ~)이 모두 들어간 문장을 찾으십시오.',
      explain: '화제(등교 시각) + 입장(늦게 시작해야 한다) + 대표 근거(십 대의 수면과 학습)를 담은 첫 번째가 가장 알맞습니다.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 0,
      q: '우리말에 맞게 영어 표현을 바르게 배열하십시오.\n\n우리 동네의 공원을 보호하는 것이 중요합니다.',
      choices: ['It is', 'important', 'to protect', 'the parks', 'in our town'],
      answer: [0, 1, 2, 3, 4],
      hint: 'It is important to ~ (~하는 것이 중요하다)의 틀을 떠올리십시오.',
      explain: '**It is important to protect the parks in our town.** It은 가짜 주어이고 진짜 주어는 to protect ~ 입니다. 주장을 드러내는 대표적인 틀입니다.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: '%', concept: 2,
      q: '글 B에 따르면, 다회용 컵을 도입한 Greenhill High School은 6개월 안에 플라스틱 쓰레기가 몇 퍼센트 줄었습니까? 숫자로 쓰십시오.\n\n' + CUPS,
      answer: '40',
      hint: 'dropped by 다음에 오는 수를 찾으십시오.',
      wrong: [
        { a: '6', why: '6은 기간(six months)입니다. 줄어든 비율을 찾으십시오.' },
        { a: '60', why: '40퍼센트가 줄었으니 남은 것이 60퍼센트입니다. 질문은 줄어든 비율을 묻습니다.' },
      ],
      explain: 'Within six months, its plastic waste **dropped by 40 percent**.에서 dropped by 40 percent는 "40퍼센트만큼 줄었다"는 뜻입니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '글 B에서 글쓴이는 "컵을 씻기 어려울 것"이라는 걱정에 어떻게 답합니까?\n\n' + CUPS,
      choices: [
        '급식실에 이미 한 시간에 컵 200개를 씻는 식기세척기가 있다.',
        '학생들이 각자 집에서 컵을 씻어 오면 된다.',
        '다른 학교에서는 컵 세척을 자원봉사자가 맡았다.',
        '컵을 씻는 것은 어렵지만 환경을 위해 참아야 한다.',
      ],
      answer: 0,
      why: ['', '글에 나오지 않는 내용입니다.', 'Greenhill High School의 이야기에는 세척 방법이 나오지 않습니다.', '글쓴이는 어렵다고 인정하지 않고, 이미 세척기가 있어 어렵지 않다고 반박합니다.'],
      explain: 'Some students may worry ~ (반론) 다음 **In fact, our cafeteria already has a dishwasher that can wash 200 cups in an hour.**가 반박입니다. In fact는 "사실은"이라는 뜻으로 반론을 뒤집을 때 자주 씁니다.',
    },
    {
      id: 'p12', level: 2, type: 'ox', concept: 1,
      q: '"According to Dr. Kim, a heart doctor, walking 30 minutes a day lowers the risk of heart disease."에서 근거의 중심은 전문가 의견이다.',
      answer: true,
      explain: 'According to 뒤에 **사람**(Dr. Kim, a heart doctor — 심장 전문 의사)이 오고, 그 사람의 판단을 전하므로 전문가 의견입니다. 30 minutes는 조사 결과가 아니라 걷는 시간입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '글 C에서 글쓴이의 주장을 가장 잘 드러내는 문장은 무엇입니까?\n\n' + BIKES,
      choices: [
        'It is time for our city to build a connected network of safe bike lanes.',
        'Some people think that new bike lanes are a waste of road space because only a few people ride bikes.',
        'When the city of Westport added 20 kilometers of protected bike lanes, the number of people riding to work doubled in two years.',
        'Fewer cars on the road also meant cleaner air near schools.',
      ],
      answer: 0,
      why: ['', '글이 이 문장으로 시작하지만, Some people think that ~ 은 글쓴이가 뒤집으려는 반론입니다.', '다른 도시에서 있었던 일을 소개하는 사례(근거)입니다.', '사례의 결과를 덧붙인 근거입니다.'],
      hint: '첫 문장이 꼭 주장은 아닙니다. 누구의 생각인지 따져 보십시오.',
      explain: '첫 문장은 **Some people think** ~ 로 남의 생각(반론)을 소개하고, But 이후로 그것을 반박합니다. 주장은 마지막 문장 **It is time for our city to** ~ 입니다. It is time to ~ 는 "이제 ~할 때다"라며 행동을 촉구하는 주장 표현입니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: '글 C의 근거를 순서대로 바르게 나타낸 것은 무엇입니까?\n\n' + BIKES,
      choices: [
        '사례(Westport의 변화) → 전문가 의견(교통 기술자의 말)',
        '전문가 의견(교통 기술자의 말) → 통계(전국 조사)',
        '통계(전국 조사) → 사례(Westport의 변화)',
        '사례(Westport의 변화) → 반론(교통 기술자의 말)',
      ],
      fixed: false,
      answer: 0,
      why: ['', '순서가 거꾸로이고, 글에는 전국 조사가 나오지 않습니다.', '글에는 전국 조사가 나오지 않습니다. Westport의 수치는 한 도시의 사례에 딸린 결과입니다.', '교통 기술자의 말은 자전거 도로를 지지하므로 반론이 아니라 근거입니다.'],
      hint: '"When the city of Westport ~"와 "Traffic engineer Paul Hayes says ~"가 각각 무엇인지 보십시오.',
      explain: '먼저 다른 도시(Westport)가 자전거 도로를 만든 뒤 출퇴근 자전거 이용자가 두 배가 된 **사례**가 나오고, 이어서 교통 기술자(Traffic engineer)의 **전문가 의견**이 나옵니다. doubled 같은 수치는 사례에 딸린 세부 정보입니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '글 C의 주장을 한 문장으로 정리할 때 빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + BIKES + '\n\nThe writer argues that the city should [[빈칸]] because safe lanes get more people riding.',
      choices: [
        'build a network of safe bike lanes',
        'remove bike lanes to make room for cars',
        'study how many people ride bikes',
        'copy every policy of Westport',
      ],
      answer: 0,
      why: ['', '글쓴이가 반박한 반론 쪽의 생각입니다. 글쓴이는 도로를 자전거에 더 내주자고 합니다.', '조사를 더 하자는 말은 글에 없습니다. 글쓴이는 지금 지어야 한다고 합니다(It is time ~).', 'Westport는 근거로 든 사례일 뿐, 그 도시의 모든 정책을 따라 하자는 말은 없습니다. 너무 넓게 정리했습니다.'],
      hint: '마지막 문장의 It is time for our city to ~ 뒤를 보십시오.',
      explain: '마지막 문장 It is time for our city to **build a connected network of safe bike lanes**가 주장입니다. 화제(자전거 도로) + 입장(지어야 한다) + 대표 근거(안전하면 이용자가 늘어난다)를 담으면 정리 문장이 됩니다.',
    },
    {
      id: 'a4', level: 3, type: 'order', concept: 3,
      q: '다음 문장들이 **주장 → 근거 → 예상 반론 → 반박 → 마무리** 순서가 되도록 배열하십시오.',
      choices: [
        'Our school should open the library on Saturdays.',
        'In a school survey, 70 percent of students said they have no quiet place to study at home on weekends.',
        'Some people say that keeping the library open would cost too much.',
        'However, parent volunteers have already offered to help, so the extra cost would be small.',
        'A Saturday library would give every student a fair chance to study.',
      ],
      answer: [0, 1, 2, 3, 4],
      hint: 'should가 있는 문장, 수치가 있는 문장, Some people say, However를 단서로 삼으십시오.',
      explain: '**should**로 주장(토요일에 도서관을 열자) → **70 percent** 통계 근거 → **Some people say** 반론(비용) → **However** 반박(학부모 자원봉사) → 주장을 다시 강조하는 마무리(모든 학생에게 공평한 공부 기회) 순서입니다.',
    },
  ],

  deeper: [
    {
      title: '근거를 믿기 전에 던질 세 가지 질문',
      body: '주장을 찾는 것보다 어려운 일은 **근거가 믿을 만한지** 따지는 것입니다. 영어 지문이든 뉴스든 다음 세 가지를 물어보십시오.\n\n1. **누가, 몇 명을 조사했는가?** 한 반 20명을 조사한 결과로 "학생들 대부분"을 말하기는 어렵습니다.\n2. **사례 하나를 모두에게 넓히지 않았는가?** 한 학교에서 성공한 방법이 모든 학교에서 같은 결과를 낸다는 보장은 없습니다. 글 B의 Greenhill High School 사례도 "가능성을 보여 준다" 정도로 읽는 것이 정확합니다.\n3. **그 전문가는 이 분야의 전문가인가?** 유명한 사람이라도 다른 분야의 일에 대한 말은 전문가 의견이 되기 어렵습니다.\n\n이런 질문은 공통영어2 뒷부분의 "매체 자료 비판적으로 읽기"와도 이어집니다.',
    },
    {
      title: '반론을 먼저 꺼내는 글이 더 설득력 있는 까닭',
      body: '읽는 사람은 글을 읽으며 속으로 "그래도 이런 문제가 있잖아?"라고 생각합니다. 글쓴이가 그 생각을 먼저 꺼내고(Some people argue ~) 답해 주면(However ~), 독자는 "이 사람은 반대쪽도 생각해 봤구나"라고 느끼고 주장을 더 믿게 됩니다.\n\n그래서 영어 논설문에서는 **양보 → 반박** 구조가 아주 흔합니다. It is true that ~, but … / Of course, ~. However, … 같은 표현이 보이면 앞은 인정, 뒤가 글쓴이의 진짜 생각이라는 신호입니다. 이 구조를 알면 주장 찾기 문제에서 첫 문장에 속지 않습니다.',
    },
  ],

  faq: [
    {
      q: '주장은 항상 글의 첫 문장에 있나요?',
      a: '아닙니다. 처음이나 끝에 오는 경우가 많지만, 글 C처럼 반론으로 시작해 마지막에 주장을 밝히는 글도 많습니다. 위치보다 should, must, It is important to ~, It is time to ~ 같은 표현과 그 문장의 역할(남의 생각인가, 글쓴이의 생각인가)로 판단하십시오.',
    },
    {
      q: '숫자가 나오면 무조건 통계인가요?',
      a: '그렇지 않습니다. "15년 동안 연구한 교수"의 15는 전문가를 소개하는 정보이고, 다른 학교가 6개월 만에 쓰레기를 40퍼센트 줄인 것은 한 학교의 경험을 보여 주는 사례입니다. 여러 사람을 조사·측정한 결과를 수치로 정리한 것이 통계입니다.',
    },
    {
      q: '반론과 반박은 어떻게 구별해요?',
      a: '반론은 글쓴이와 다른 생각으로, Some people argue (worry, think) that ~ 처럼 남의 생각으로 소개됩니다. 반박은 그 생각을 되받는 글쓴이의 대답으로, However, But, In fact 뒤에 옵니다. 반론에는 글쓴이가 동의하지 않는다는 점을 기억하십시오.',
    },
  ],

  mistakes: [
    'Some people argue that ~ 문장을 글쓴이의 주장으로 고르는 실수 — 이것은 반론입니다. 바로 뒤 However 문장에 글쓴이의 생각이 있습니다.',
    '글의 숫자가 그대로 나온 선택지를 바로 맞다고 고르는 실수 — 그 숫자가 조사한 사람 수인지, 비율인지, 기간인지까지 확인합니다.',
    '주장을 정리하라는데 근거 하나만 옮겨 쓰는 실수 — 화제와 글쓴이의 입장(should ~)을 함께 담습니다.',
  ],

  vocab: [
    { w: 'claim', m: '주장; 주장하다', ex: 'The writer\'s main claim is that homework should be shorter.', exm: '글쓴이의 핵심 주장은 숙제가 더 짧아야 한다는 것입니다.' },
    { w: 'argue', m: '주장하다, 논하다', ex: 'Some students argue that school uniforms limit their freedom.', exm: '어떤 학생들은 교복이 자신들의 자유를 제한한다고 주장합니다.' },
    { w: 'evidence', m: '증거, 근거', ex: 'Can you show me any evidence for that idea?', exm: '그 생각에 대한 근거를 보여 줄 수 있나요?' },
    { w: 'survey', m: '(설문) 조사', ex: 'A survey of 300 students showed that most of them walk to school.', exm: '학생 300명을 대상으로 한 조사에서 대부분이 걸어서 등교한다는 것이 드러났습니다.' },
    { w: 'statistics', m: '통계, 통계 자료', ex: 'These statistics show how much water we waste.', exm: '이 통계 자료는 우리가 물을 얼마나 낭비하는지 보여 줍니다.' },
    { w: 'expert', m: '전문가', ex: 'We asked an expert on bees about the problem.', exm: '우리는 그 문제에 대해 꿀벌 전문가에게 물어보았습니다.' },
    { w: 'support', m: '뒷받침하다, 지지하다', ex: 'The writer uses two examples to support her opinion.', exm: '글쓴이는 자신의 의견을 뒷받침하려고 두 가지 예를 듭니다.' },
    { w: 'opinion', m: '의견', ex: 'In my opinion, the library should stay open later.', exm: '제 의견으로는 도서관이 더 늦게까지 열려 있어야 합니다.' },
    { w: 'essential', m: '꼭 필요한, 필수적인', ex: 'It is essential to drink enough water on hot days.', exm: '더운 날에는 물을 충분히 마시는 것이 꼭 필요합니다.' },
    { w: 'reduce', m: '줄이다', ex: 'We can reduce waste by using our own bottles.', exm: '자기 물병을 쓰면 쓰레기를 줄일 수 있습니다.' },
    { w: 'percent', m: '퍼센트', ex: 'Only 20 percent of the class finished the test early.', exm: '반에서 20퍼센트만 시험을 일찍 마쳤습니다.' },
    { w: 'worry', m: '걱정하다', ex: 'Some parents worry that phones distract their children.', exm: '어떤 부모들은 휴대전화가 자녀의 주의를 흐트러뜨린다고 걱정합니다.' },
    { w: 'in fact', m: '사실은, 실제로는', ex: 'People think the test is hard. In fact, most students pass it.', exm: '사람들은 그 시험이 어렵다고 생각합니다. 사실은 대부분의 학생이 통과합니다.' },
    { w: 'convince', m: '설득하다, 확신시키다', ex: 'Her clear reasons convinced the whole class.', exm: '그녀의 분명한 이유가 반 전체를 설득했습니다.' },
  ],
});
})();
