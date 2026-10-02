/* 영어Ⅱ · 자기소개서와 보고서 쓰기
 * 예문·지문은 모두 직접 쓴 글이다. 이력서의 인물·학교·연락처는 가상의 더미 정보다(hong@example.com, 010-0000-0000). */
(function () {
  // 가상의 영문 이력서 (직접 쓴 글)
  var RESUME = 'HONG JIA\n' +
    'Email: hong@example.com | Phone: 010-0000-0000\n\n' +
    'OBJECTIVE\n' +
    "A curious high school student seeking a summer volunteer position at a children's science museum\n\n" +
    'EDUCATION\n' +
    'Example High School, Seoul (Expected graduation: February 2028)\n\n' +
    'EXPERIENCE\n' +
    'Science Club Leader, Example High School (March 2026 - Present)\n' +
    '- Lead weekly experiments for 15 club members\n' +
    '- Organized a school science fair for 200 visitors\n' +
    'Volunteer Tutor, Community Learning Center (July 2025 - December 2025)\n' +
    '- Taught basic math to five elementary school students\n' +
    '- Designed math worksheets with simple games\n\n' +
    'SKILLS\n' +
    'English (intermediate), video editing, basic coding\n\n' +
    'AWARDS\n' +
    'Gold Prize, School Science Fair (2025)';

  // 가상의 보고서 (직접 쓴 글, 수치는 가상의 설문)
  var REPORT = 'How Do Students Get to School?\n\n' +
    'Purpose: The purpose of this report is to find out how students at our school travel to school and to suggest a way to make their trips safer.\n\n' +
    'Method: We surveyed 120 first-year students in May. Each student answered five questions about how they come to school.\n\n' +
    'Results: The results show that 45 percent of the students take the bus, 30 percent walk, 15 percent ride a bike, and 10 percent come by car. Many of the bike riders said that the road near the school gate felt dangerous.\n\n' +
    'Conclusion: Based on these results, we recommend that the school ask the town to build a bike lane near the school gate.';

  // 방법(Method)이 빠진 보고서 (심화 문제용)
  var REPORT2 = 'How Much Do Students Read?\n\n' +
    'Purpose: This report examines how many books students at our school read each month.\n\n' +
    'Results: About half of the students read fewer than two books a month. Most of them said they did not have enough time.\n\n' +
    'Conclusion: We suggest that the school start a 10-minute reading time every morning.';

  // 생성기 1: 이력서의 행동 동사 [동사원형, 과거형(허용 표기들), 뒷부분, 흔한 틀린 과거형]
  var VERBS = [
    ['lead', ['led'], 'a team of six students in a robot contest', ['leaded', 'lead']],
    ['teach', ['taught'], 'English to younger students every Saturday', ['teached', 'teach']],
    ['write', ['wrote'], 'articles for the school newspaper', ['writed', 'write']],
    ['build', ['built'], 'a small garden behind the school library', ['builded', 'build']],
    ['run', ['ran'], 'a weekly reading club for first-year students', ['runned', 'run']],
    ['win', ['won'], 'second prize in a city essay contest', ['winned', 'win']],
    ['organize', ['organized', 'organised'], 'a book fair for 300 visitors', ['organize', 'organizeed']],
    ['design', ['designed'], 'posters for the school festival', ['design', 'designd']],
    ['create', ['created'], 'a short video about recycling', ['create', 'createed']],
    ['manage', ['managed'], "the drama club's budget", ['manage', 'manageed']],
    ['plan', ['planned'], 'a field trip to a science museum', ['planed', 'plan']],
    ['raise', ['raised'], '500,000 won for a local animal shelter', ['raise', 'raiseed']],
    ['improve', ['improved'], 'the club website so that it loads faster', ['improve', 'improveed']],
    ['coordinate', ['coordinated'], 'volunteer schedules for 20 students', ['coordinate', 'coordinateed']],
    ['launch', ['launched'], 'a recycling campaign in our school', ['launch', 'launchd']],
    ['present', ['presented'], 'our research at a student science fair', ['present', 'presentd']],
    ['translate', ['translated'], 'a museum guide into English', ['translate', 'translateed']],
    ['make', ['made'], 'a short film about our town', ['maked', 'make']],
    ['give', ['gave'], 'a speech at the school festival', ['gived', 'give']],
    ['start', ['started'], 'a book club for first-year students', ['start', 'startted']],
    ['collect', ['collected'], 'used books for a children\'s library', ['collect', 'collectted']],
    ['host', ['hosted'], 'a quiz show at the school festival', ['host', 'hostted']],
    ['teach', ['taught'], 'basic coding to elementary school students', ['teached', 'teach']],
  ];

  // 생성기 2: 보고서의 부분 [문장, 부분]
  var REPORT_LINES = [
    ['The purpose of this report is to find out how much time students spend on their phones.', 'purpose'],
    ['This report examines why some students skip breakfast.', 'purpose'],
    ['In this report, we look at how our class can reduce paper waste.', 'purpose'],
    ['We surveyed 150 students from three grades in April.', 'method'],
    ['A short questionnaire was given to 80 students during lunch.', 'method'],
    ['We counted the number of plastic cups thrown away in the cafeteria for two weeks.', 'method'],
    ['The results show that 60 percent of the students sleep less than seven hours.', 'results'],
    ['About one third of the students said they never eat breakfast.', 'results'],
    ['As shown in the graph, paper waste dropped by half in the second week.', 'results'],
    ['In conclusion, many students do not get enough sleep on school nights.', 'conclusion'],
    ['Based on these results, we recommend that the cafeteria offer a simple breakfast.', 'conclusion'],
    ['To sum up, using both sides of the paper is an easy way to cut waste.', 'conclusion'],
  ];
  var SEC_NAME = { purpose: '목적(Purpose)', method: '방법(Method)', results: '결과(Results)', conclusion: '결론(Conclusion)' };
  var SEC_HINT = {
    purpose: 'The purpose of this report is ~, This report examines ~, In this report, we look at ~처럼 보고서가 무엇을 알아보려는지 밝히고 있습니다.',
    method: '누구를(몇 명을) 언제 어떻게 조사했는지 말하고 있습니다. surveyed, was given, counted처럼 과거형으로 씁니다.',
    results: 'The results show that ~, 60 percent, As shown in the graph처럼 조사해서 알게 된 사실과 수치를 그대로 전하고 있습니다.',
    conclusion: 'In conclusion, Based on these results, we recommend, To sum up처럼 결과가 무엇을 뜻하는지 정리하거나 제안하고 있습니다.',
  };

  // 생성기 3: 이력서의 항목 [내용, 항목]
  var RESUME_LINES = [
    ['Email: hong@example.com | Phone: 010-0000-0000', 'contact'],
    ['Example High School, Seoul (Expected graduation: 2028)', 'education'],
    ['Example Middle School, Seoul (Graduated: February 2025)', 'education'],
    ['Volunteer Tutor, Community Learning Center (2025 - Present)', 'experience'],
    ['Library Assistant, Example High School (March 2026 - July 2026)', 'experience'],
    ['Student Council Member: organized two school festivals', 'experience'],
    ['English (intermediate), Korean (native)', 'skills'],
    ['Video editing, basic coding, public speaking', 'skills'],
    ['Gold Prize, School Science Fair (2025)', 'awards'],
    ['Second Prize, City Student Essay Contest (2026)', 'awards'],
  ];
  var RS_SEC = { contact: '연락처(Contact Information)', education: '학력(Education)', experience: '경험(Experience)', skills: '능력(Skills)', awards: '수상(Awards)' };
  var RS_HINT = {
    contact: '이메일과 전화번호는 지원자에게 연락할 방법이므로 이력서 맨 위 연락처 칸에 씁니다.',
    education: '학교 이름과 졸업(예정) 시기는 학력 칸에 씁니다.',
    experience: '맡았던 역할·활동과 그 기간은 경험 칸에 씁니다.',
    skills: '할 줄 아는 언어나 기술은 능력 칸에 씁니다.',
    awards: '받은 상과 그 연도는 수상 칸에 씁니다.',
  };

Tutor.registerUnit({
  id: 'eng-h-e2-10',
  course: 'eng-h-e2',
  title: '자기소개서와 보고서 쓰기',
  summary: '영문 이력서·자기소개서·보고서의 형식을 익히고, 행동 동사로 경험을 생생하게 소개하며, 점검표로 글을 점검해 고쳐 씁니다.',
  goals: [
    '영문 이력서의 항목과 형식을 알고 가상의 인물 정보로 이력서를 구성할 수 있다.',
    '자기소개서에 지원 동기·강점·경험 사례를 짜임새 있게 쓸 수 있다.',
    '행동 동사를 써서 경험을 구체적이고 생생하게 나타낼 수 있다.',
    '보고서를 목적-방법-결과-결론으로 구성하고, 점검표로 내용·형식·표현을 고쳐 쓸 수 있다.',
  ],
  standards: ['[12영Ⅱ-02-06]', '[12영Ⅱ-02-07]'],

  concepts: [
    {
      title: '영문 이력서의 항목과 형식',
      body: '영문 이력서(resume)는 지원자의 학력·경험·능력을 **한눈에 훑어볼 수 있게** 정리한 문서입니다. 보통 한 쪽 안에 다음 항목을 씁니다.\n\n' +
        '| 항목 | 쓰는 내용 |\n|---|---|\n' +
        '| Contact Information | 이름, 이메일, 전화번호 |\n' +
        '| Objective | 어떤 자리에 지원하는지 한 줄로 |\n' +
        '| Education | 학교 이름, 졸업(예정) 시기 |\n' +
        '| Experience | 맡은 역할, 기관, 기간, 한 일 (동아리·학생회·봉사 활동 포함) |\n' +
        '| Skills | 언어, 컴퓨터, 그 밖의 기술 |\n' +
        '| Awards | 받은 상과 받은 해 |\n\n' +
        '형식의 규칙\n' +
        '- **최근 것부터** 씁니다(reverse chronological order). 2026년 경험이 2025년 경험보다 위에 옵니다.\n' +
        '- 완전한 문장이 아니라 **짧은 구**로 쓰고, 주어(I)는 생략합니다. I organized a fair. → Organized a school science fair.\n' +
        '- 지금 하고 있는 일은 현재형(Lead), 끝난 일은 과거형(Organized)으로 씁니다.\n' +
        '- 날짜·제목 모양을 처음부터 끝까지 같게 맞춥니다.\n\n' +
        '> ⚠️ 연습할 때는 반드시 **가상의 정보**를 씁니다(예: hong@example.com, 010-0000-0000). 실제 연락처나 주소를 공개된 곳에 올리지 않습니다.',
      easy: '이력서는 나를 소개하는 **진열장**과 같습니다. 손님(읽는 사람)은 한 사람의 이력서를 몇십 초만 훑어봅니다.\n\n' +
        '그래서 가장 새롭고 좋은 물건(최근 경험)을 맨 앞에 놓고, 긴 설명 대신 이름표(짧은 구)를 붙입니다. "저는 과학 동아리를 이끌었습니다" 대신 "Science Club Leader — Led weekly experiments"처럼 씁니다.',
      check: {
        type: 'ox',
        q: '영문 이력서의 Experience 칸에는 가장 오래된 경험부터 차례로 씁니다.',
        answer: false,
        explain: '영문 이력서는 **최근 것부터** 씁니다(reverse chronological order). 읽는 사람이 지원자의 가장 새로운 경험을 먼저 볼 수 있게 하기 위해서입니다.',
      },
    },
    {
      title: '자기소개서: 지원 동기·강점·경험 사례',
      body: '자기소개서(cover letter, personal statement)는 이력서의 짧은 목록 뒤에 있는 **나의 이야기**를 들려주는 글입니다. 대개 세 부분으로 씁니다.\n\n' +
        '**1. 시작 — 지원 동기**\n' +
        '- I am writing to apply for the volunteer position at ~.\n' +
        '- I have always been interested in ~ because ~.\n\n' +
        '**2. 본문 — 강점과 경험 사례**\n' +
        '- One of my strengths is ~. (강점 밝히기)\n' +
        '- For example, when ~, I ~. (그 강점을 보여 주는 경험)\n' +
        '- As a result, ~. / This experience taught me ~. (결과와 배운 점)\n\n' +
        '**3. 마무리 — 감사와 기대**\n' +
        '- Thank you for considering my application.\n' +
        '- I look forward to hearing from you.\n\n' +
        '핵심은 **말하지 말고 보여 주기(Show, don\'t tell)**입니다. "나는 책임감이 있다(I am responsible.)"라고만 쓰면 누구나 할 수 있는 말이지만, "초청 강사가 취소했을 때 이틀 만에 새 강사를 구했다(When our guest speaker canceled, I found a new speaker within two days.)"라고 쓰면 책임감이 저절로 보입니다.\n\n' +
        '> 💡 편지 형식이면 Dear Ms. Park,으로 시작해 Sincerely, 다음 줄에 이름을 쓰고 마칩니다.',
      easy: '"나는 축구를 잘해."라는 말보다 "지난 대회에서 세 골을 넣었어."라는 말이 더 믿음이 갑니다.\n\n' +
        '자기소개서도 같습니다. 강점을 한 줄로 말한 뒤 **그 강점이 드러난 장면**을 하나 보여 주고, 그 결과와 배운 점으로 마무리하면 됩니다.',
      check: {
        type: 'choice',
        q: '자기소개서의 **마무리** 부분에 알맞은 문장은 무엇입니까?',
        choices: [
          'Thank you for considering my application.',
          'I am writing to apply for the volunteer position at your museum.',
          'For example, when our club needed a leader, I volunteered first.',
        ],
        answer: 0,
        why: ['', '어떤 자리에 지원하는지 밝히는 시작 부분의 문장입니다.', '강점을 보여 주는 경험 사례로, 본문에 들어갈 문장입니다.'],
        explain: '"제 지원서를 검토해 주셔서 감사합니다(**Thank you for considering my application.**)"는 감사 인사로 글을 마무리하는 문장입니다.',
      },
    },
    {
      title: '경험을 생생하게 만드는 행동 동사',
      body: '이력서와 자기소개서에서 경험을 쓸 때는 **무엇을 했는지 분명히 보여 주는 동사(action verb)**로 시작합니다.\n\n' +
        '| 약한 표현 | 행동 동사로 고친 표현 |\n|---|---|\n' +
        '| Was responsible for the club | **Led** a science club of 15 members |\n' +
        '| Helped with the festival | **Organized** a school festival for 500 visitors |\n' +
        '| Did the posters | **Designed** posters for the school festival |\n' +
        '| Worked on the website | **Improved** the club website so that it loads faster |\n\n' +
        '자주 쓰는 행동 동사: **led**(이끌었다), **organized**(조직했다), **designed**(설계했다), created, managed, planned, taught, raised, coordinated\n\n' +
        '더 생생하게 만드는 두 가지 방법\n' +
        '- **수를 넣습니다.** 몇 명, 얼마, 몇 번인지 쓰면 규모가 보입니다. (for 200 visitors, raised 500,000 won)\n' +
        '- **결과를 붙입니다.** 그 일로 무엇이 달라졌는지 씁니다. (so that it loads faster)\n\n' +
        '> ⚠️ 불규칙 동사의 과거형에 주의합니다. lead → **led**(leaded ×), teach → **taught**, build → **built**, win → **won**. plan처럼 모음 하나 + 자음 하나로 끝나는 한 음절 낱말은 끝 자음을 한 번 더 쓰고 어미(-ed)를 붙입니다: planned',
      easy: '친구가 "동아리에서 뭐 했어?"라고 물을 때 "그냥 이것저것 도왔어."라고 하면 기억에 남지 않습니다. "15명이 하는 실험을 매주 이끌었어."라고 하면 장면이 떠오릅니다.\n\n' +
        '행동 동사는 그 장면을 여는 첫 단추입니다. 동사 + 무엇을 + 얼마나(수) 순서로 써 보십시오.',
      check: {
        type: 'short',
        q: '괄호 안의 동사를 과거형으로 바꾸어 빈칸에 쓰십시오.\n\n[[빈칸]] (organize) a school science fair for 200 visitors',
        answer: ['organized', 'organised'],
        wrong: [{ a: 'organize', why: '끝난 경험은 과거형으로 씁니다. 어미(-d)를 붙여 과거형(organized)으로 씁니다.' }],
        explain: '이미 끝난 경험이므로 과거형(**Organized**)으로 씁니다. 행동 동사로 시작하고 수(200 visitors)를 넣어 규모를 보여 주었습니다. (영국식 철자인 organised 꼴도 정답입니다.)',
      },
    },
    {
      title: '보고서의 짜임: 목적-방법-결과-결론',
      body: '보고서(report)는 무엇을 알아보았고 무엇을 알게 되었는지 **정해진 순서**로 전하는 글입니다. 읽는 사람이 필요한 부분을 바로 찾을 수 있도록 소제목을 붙이기도 합니다.\n\n' +
        '| 부분 | 하는 일 | 자주 쓰는 표현 |\n|---|---|---|\n' +
        '| 목적(Purpose) | 무엇을 왜 알아보는지 | The purpose of this report is to ~. / This report examines ~. |\n' +
        '| 방법(Method) | 누구를, 언제, 어떻게 조사했는지 | We surveyed 120 students in May. / A survey was conducted ~. |\n' +
        '| 결과(Results) | 조사로 알게 된 사실과 수치 | The results show that ~. / As shown in the graph, ~. |\n' +
        '| 결론(Conclusion) | 결과가 뜻하는 것, 제안 | In conclusion, ~. / Based on these results, we recommend that ~. |\n\n' +
        '시제에도 규칙이 있습니다. 이미 한 조사(방법)와 그때 얻은 답(결과)은 주로 **과거형**(surveyed, said)으로, 보고서 자체나 지금도 참인 사실은 **현재형**(This report examines, The results show)으로 씁니다.\n\n' +
        '> ⚠️ 결과와 결론을 섞지 않습니다. "45퍼센트가 버스를 탄다(45 percent take the bus.)"는 결과(사실)이고, "자전거 도로를 권한다(We recommend a bike lane.)"는 결론(제안)입니다.',
      easy: '보고서는 과학 실험 보고와 같습니다.\n\n' +
        '1. 무엇이 궁금했나? (목적)\n' +
        '2. 어떻게 알아보았나? (방법)\n' +
        '3. 무엇이 나왔나? (결과)\n' +
        '4. 그래서 무엇을 알게 되었고, 무엇을 하자는가? (결론)\n\n' +
        '이 네 질문에 차례로 답하면 보고서의 뼈대가 생깁니다.',
      check: {
        type: 'choice',
        q: '보고서에서 다음 문장이 들어갈 부분은 어디입니까?\n\nWe surveyed 120 first-year students in May.',
        choices: ['방법(Method)', '목적(Purpose)', '결론(Conclusion)'],
        answer: 0,
        why: ['', '목적은 무엇을 알아보려는지 밝히는 부분입니다. 이 문장은 누구를 언제 조사했는지 말합니다.', '결론은 결과가 뜻하는 것을 정리하거나 제안하는 부분입니다.'],
        explain: '누구를(120 first-year students), 언제(in May), 어떻게(surveyed) 조사했는지 말하므로 **방법(Method)** 부분에 들어갑니다.',
      },
    },
    {
      title: '고쳐 쓰기 점검표: 내용·형식·표현',
      body: '처음 쓴 글은 초고일 뿐입니다. 다음 점검표로 세 번 나누어 읽으며 고칩니다.\n\n' +
        '| 점검 영역 | 스스로 묻는 질문 |\n|---|---|\n' +
        '| **내용(Content)** | 목적이 분명한가? 구체적인 경험·수치가 있는가? 주제와 관계없는 문장은 없는가? |\n' +
        '| **형식(Organization and format)** | 필요한 부분이 순서대로 있는가? 날짜·소제목 모양이 일관된가? 분량이 알맞은가? |\n' +
        '| **표현(Language)** | 시제가 일관된가? 주어와 동사의 수가 맞는가? 철자는 맞는가? 격식에 맞는 말인가? |\n\n' +
        '표현 점검에서 자주 고치는 것\n' +
        '- **시제**: Last month, we surveyed 120 students and **ask** them ~ → **asked**\n' +
        '- **격식**: gonna, stuff, a lot of things → going to, materials, many tasks\n' +
        '- **병렬**: 이력서의 줄은 모두 같은 꼴로 — Led ~ / Organized ~ / Designed ~ (중간에 -ing 꼴이나 I was ~ 같은 꼴이 끼지 않게)\n\n' +
        '> 💡 한 번에 모든 것을 보려 하면 놓칩니다. 첫 번째는 내용만, 두 번째는 형식만, 세 번째는 표현만 보며 읽습니다. 소리 내어 읽으면 어색한 곳이 잘 들립니다.',
      easy: '집 청소를 한다고 생각해 보십시오. 먼저 필요 없는 물건을 버리고(내용), 물건을 제자리에 정리한 뒤(형식), 마지막으로 먼지를 닦습니다(표현).\n\n' +
        '먼지부터 닦으면, 나중에 버릴 물건까지 닦느라 힘만 듭니다. 고쳐 쓰기도 큰 것(내용)에서 작은 것(표현) 순서로 합니다.',
      check: {
        type: 'choice',
        q: '보고서의 결과 부분에 다음 문장이 있습니다. 내용은 조사 결과와 맞습니다. 점검표의 어느 영역에서 고쳐야 합니까?\n\nAs shown in the graph, lots of kids wanna get more sleep.',
        choices: ['표현(Language)', '내용(Content)', '형식(Organization and format)'],
        answer: 0,
        why: ['', '문제에서 내용은 조사 결과와 맞다고 했습니다. 고칠 곳은 낱말 선택입니다.', '부분의 순서나 소제목 모양의 문제가 아닙니다. 낱말 선택의 문제입니다.'],
        explain: '두 표현(lots of kids, wanna)은 친구끼리 쓰는 말이라 보고서에 맞지 않습니다. **표현(격식)** 점검에서 고칩니다. 예: As shown in the graph, many students want to get more sleep.',
      },
    },
  ],

  examples: [
    {
      q: '다음 문장을 이력서의 경험 칸에 쓸 한 줄로 고쳐 보십시오. (캠페인에 참여한 학생은 150명이었다고 합니다.)\n\nI was responsible for the school recycling campaign, and many students joined it.',
      steps: [
        '이력서에서는 주어(I)를 빼고 짧은 구로 씁니다.',
        '약한 표현 was responsible for 대신 무엇을 했는지 보여 주는 행동 동사를 고릅니다. 캠페인을 이끌었으므로 과거형 동사(Led)를 씁니다.',
        'many students 대신 실제 수를 넣어 규모를 보여 줍니다: 150 students',
        '하나로 이어 씁니다: Led a school recycling campaign that 150 students joined',
      ],
      answer: 'Led a school recycling campaign that 150 students joined',
    },
    {
      q: '다음 보고서를 목적-방법-결과-결론으로 나누고, 각 부분이 하는 일을 말해 보십시오.\n\n' + REPORT,
      steps: [
        '목적(Purpose): The purpose of this report is to ~ — 학생들의 등교 방법을 알아보고 더 안전하게 할 방법을 제안하려 합니다.',
        '방법(Method): We surveyed 120 first-year students in May. — 누구를, 언제, 어떻게 조사했는지 과거형으로 씁니다.',
        '결과(Results): The results show that 45 percent ~ — 조사로 얻은 수치와 학생들의 답을 그대로 전합니다.',
        '결론(Conclusion): Based on these results, we recommend that ~ — 결과를 바탕으로 학교 앞 자전거 도로를 제안합니다.',
      ],
      answer: '목적(무엇을 왜) → 방법(누구를·언제·어떻게) → 결과(수치와 사실) → 결론(뜻과 제안)',
    },
  ],

  terms: [
    { term: '이력서(resume)', def: '학력·경험·능력·수상 내역을 항목별로 짧게 정리한 문서입니다. 영문 이력서는 최근 것부터 적고, 주어 I 없이 짧은 구로 씁니다.' },
    { term: '자기소개서(cover letter)', def: '지원 동기, 강점, 그 강점을 보여 주는 경험을 이야기처럼 풀어 쓴 글입니다. 이력서와 함께 냅니다.' },
    { term: '지원 동기', def: '그 자리나 기관에 왜 지원하는지 밝히는 내용입니다. 예: I have always been interested in ~ because ~.' },
    { term: '행동 동사(action verb)', def: '무엇을 했는지 분명히 보여 주는 동사입니다. 예: led, organized, designed, created, managed' },
    { term: '최근순 배열(reverse chronological order)', def: '가장 최근의 학력·경험을 맨 위에, 오래된 것을 아래에 적는 방식입니다.' },
    { term: '보고서(report)', def: '무엇을 어떻게 조사했고 무엇을 알게 되었는지 목적-방법-결과-결론의 순서로 전하는 글입니다.' },
    { term: '고쳐 쓰기(revision)', def: '초고를 내용·형식·표현의 순서로 점검하며 더 낫게 고치는 일입니다.' },
    { term: '병렬 구조(parallel structure)', def: '나란히 놓인 말을 같은 꼴로 맞추는 것입니다. 예: Led ~ / Organized ~ / Designed ~' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '영문 이력서에서 다음 내용이 들어갈 항목은 무엇입니까?\n\nGold Prize, School Science Fair (2025)',
      choices: ['Awards', 'Education', 'Objective', 'Contact Information'],
      answer: 0,
      why: [
        '',
        '학력 칸에는 학교 이름과 졸업(예정) 시기를 씁니다. 상은 따로 씁니다.',
        '지원 목표 칸에는 어떤 자리에 지원하는지 한 줄로 씁니다.',
        '연락처 칸에는 이름, 이메일, 전화번호를 씁니다.',
      ],
      explain: 'Gold Prize(금상)는 받은 상이므로 **수상(Awards)** 칸에 씁니다. 상의 이름과 받은 해를 함께 적습니다.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: '영문 이력서의 경험 칸은 "I organized a science fair."처럼 주어(I)를 넣은 완전한 문장으로 쓰는 것이 일반적입니다.',
      answer: false,
      explain: '이력서는 빠르게 훑어보는 문서라서 주어(I)를 빼고 **행동 동사로 시작하는 짧은 구**로 씁니다. 예: Organized a school science fair for 200 visitors',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '자기소개서의 **시작** 부분(지원 동기)에 알맞은 문장은 무엇입니까?',
      choices: [
        'I am writing to apply for the summer volunteer position at your museum.',
        'I look forward to hearing from you soon about the position and the next steps.',
        "As a result, our club's science fair attracted more than 200 visitors last year.",
        'This experience taught me how important it is to explain things clearly to children.',
      ],
      answer: 0,
      why: [
        '',
        '연락을 기다린다는 말은 글을 마무리할 때 씁니다.',
        '경험의 결과를 말하는 문장으로, 본문의 경험 사례 뒤에 옵니다.',
        '경험에서 배운 점을 정리하는 문장으로, 본문에 들어갑니다.',
      ],
      explain: '"~ 자리에 지원하고자 이 글을 씁니다(**I am writing to apply for ~**)"는 어떤 자리에 지원하는지 밝히며 글을 여는 대표적인 문장입니다.',
    },
    {
      id: 'p4', level: 1, type: 'short', concept: 2,
      q: '이미 끝난 경험입니다. 괄호 안의 동사를 알맞은 꼴로 바꾸어 빈칸에 쓰십시오.\n\n[[빈칸]] (lead) a team of six students in a robot contest',
      answer: ['led'],
      wrong: [
        { a: 'leaded', why: '불규칙 동사입니다. lead의 과거형은 어미(-ed)를 붙이지 않은 꼴, 곧 led입니다.' },
        { a: 'lead', why: '끝난 경험은 과거형으로 씁니다. lead → led' },
      ],
      explain: 'lead(이끌다)는 불규칙 동사로, 과거형은 **led**입니다. Led a team of six students in a robot contest(로봇 대회에서 6명의 팀을 이끌었음)',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '이력서의 경험 칸에 쓰기에 가장 알맞은 줄은 무엇입니까?',
      choices: [
        'Designed posters for the school festival',
        'Was responsible for some of the posters for the festival',
        'Did poster stuff and other things for the school festival',
        'Helped a little with posters when the festival was coming',
      ],
      answer: 0,
      why: [
        '',
        '"~을 맡았다(was responsible for)"는 무엇을 했는지 분명히 보여 주지 못하는 약한 표현입니다.',
        '세 표현(did, stuff, other things)은 막연하고 격식에 맞지 않는 말입니다.',
        '"조금 도왔다(helped a little)"는 내가 한 일을 작게 보이게 하고, 구체적이지 않습니다.',
      ],
      explain: '**Designed**(디자인했다)라는 행동 동사로 시작해 무엇을 했는지 분명하게 보여 줍니다. 이력서의 경험은 행동 동사 + 무엇을 순서로 씁니다.',
    },
    {
      id: 'p6', level: 1, type: 'order', concept: 3,
      q: '보고서의 짜임이 되도록 순서대로 놓으십시오.',
      choices: ['Purpose', 'Method', 'Results', 'Conclusion'],
      answer: [0, 1, 2, 3],
      explain: '목적(무엇을 왜) → 방법(누구를·언제·어떻게) → 결과(알게 된 사실과 수치) → 결론(결과의 뜻과 제안) 순서입니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '보고서에서 다음 문장이 들어갈 부분은 어디입니까?\n\nThe results show that 45 percent of the students take the bus.',
      choices: ['결과(Results)', '방법(Method)', '목적(Purpose)', '결론(Conclusion)'],
      answer: 0,
      why: [
        '',
        '방법은 누구를 어떻게 조사했는지 말하는 부분입니다. 이 문장은 조사로 얻은 수치를 전합니다.',
        '목적은 무엇을 알아보려는지 밝히는 부분입니다.',
        '결론은 결과를 바탕으로 뜻을 정리하거나 제안하는 부분입니다. 수치를 그대로 전하는 것은 결과입니다.',
      ],
      explain: '"결과는 ~을 보여 준다(The results show that ~)"로 조사에서 얻은 수치(45 percent)를 전하므로 **결과** 부분입니다.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 4,
      q: '이력서의 경험 칸에 다음 세 줄이 있습니다. 병렬 구조에 맞지 않아 고쳐야 할 줄은 무엇입니까?\n\n- Led weekly science experiments for all 15 club members\n- Organizing a school science fair for 200 visitors\n- Designed math worksheets with simple games',
      choices: [
        'Organizing a school science fair for 200 visitors',
        'Led weekly science experiments for all 15 club members',
        'Designed math worksheets with simple games',
        '고칠 줄이 없다',
      ],
      answer: 0,
      why: [
        '',
        '과거형 동사(Led)로 시작해 다른 줄과 꼴이 같습니다.',
        '과거형 동사(Designed)로 시작해 다른 줄과 꼴이 같습니다.',
        '한 줄만 -ing 꼴로 시작해 꼴이 맞지 않습니다.',
      ],
      explain: '다른 두 줄은 과거형 동사(Led, Designed)로 시작하는데, 한 줄만 -ing 꼴(Organizing)입니다. 과거형으로 고쳐 꼴을 맞춥니다: **Organized** a school science fair for 200 visitors',
    },
    {
      id: 'p9', level: 1, type: 'short', concept: 4,
      q: '시제가 일관되도록 괄호 안의 동사를 알맞은 꼴로 바꾸어 빈칸에 쓰십시오.\n\nLast month, we surveyed 120 students and [[빈칸]] (ask) them about their sleep.',
      answer: ['asked'],
      wrong: [
        { a: 'ask', why: 'Last month(지난달)의 일이고 앞의 동사도 과거형(surveyed)입니다. 같은 과거형(asked)으로 맞춥니다.' },
        { a: 'asks', why: '주어가 우리(we)이고 지난달의 일이므로 과거형(asked)으로 씁니다.' },
      ],
      explain: '지난달에 한 조사이고 접속사(and)로 이어진 앞 동사가 과거형(surveyed)이므로 과거형(**asked**)으로 시제를 맞춥니다. 표현 점검에서 자주 고치는 곳입니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 0,
      q: '다음 가상의 이력서를 읽고, 이력서의 주인공이 **지금도** 하고 있는 일을 고르십시오.\n\n' + RESUME,
      choices: [
        '과학 동아리에서 매주 실험을 이끄는 일',
        '초등학생에게 기초 수학을 가르치는 일',
        '게임을 넣은 수학 학습지를 만드는 일',
        '어린이 과학관에서 여름 자원봉사를 하는 일',
      ],
      answer: 0,
      hint: '기간에 Present(현재)가 있는 경험을 찾고, 그 줄의 동사 시제를 보십시오.',
      why: [
        '',
        '자원봉사 교사 활동은 2025년 12월에 끝났습니다(Taught — 과거형).',
        '학습지를 만든 일도 2025년 12월에 끝난 자원봉사 교사 활동입니다.',
        '과학관 자원봉사는 지금 지원하려는 자리(Objective)이지, 아직 하고 있는 일이 아닙니다.',
      ],
      explain: '과학 동아리 회장 경험의 기간이 March 2026 - Present(현재까지)이고, 동사도 현재형 **Lead**입니다. 지금 하는 일은 현재형, 끝난 일은 과거형(Organized, Taught)으로 쓴 것을 확인할 수 있습니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 1,
      q: '자기소개서에서 "책임감"이라는 강점을 **보여 주는(show)** 문장으로 가장 알맞은 것은 무엇입니까?',
      choices: [
        'When our guest speaker canceled, I found a new one within two days.',
        'I am a very responsible person, and everyone says that I am responsible.',
        'Responsibility is one of the most important things in the whole world.',
        'I think that I am responsible because I really want to be responsible.',
      ],
      answer: 0,
      hint: '"나는 책임감이 있다"고 말하는 문장이 아니라, 책임감이 드러난 장면을 담은 문장을 찾으십시오.',
      why: [
        '',
        '책임감이 있다고 말하기(tell)만 했습니다. 그것을 보여 주는 경험이 없습니다.',
        '책임감에 대한 일반적인 생각일 뿐, 나의 경험이 아닙니다.',
        '바람을 말했을 뿐, 책임감을 보여 주는 행동이 없습니다.',
      ],
      explain: '초청 강사가 취소하자 이틀 만에 새 강사를 구했다는 **구체적인 경험**으로 책임감을 보여 줍니다. Show, don\'t tell — 강점은 장면으로 증명합니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 3,
      q: '다음은 학생 120명의 등교 방법을 조사한 가상의 자료입니다. 이 그래프를 바르게 설명한 결과(Results) 문장은 무엇입니까?',
      fig: { type: 'bars', labels: ['Bus', 'Walk', 'Bike', 'Car'], values: [45, 30, 15, 10], unit: '%', title: '등교 방법 (가상의 자료)', alt: '버스 45%, 걷기 30%, 자전거 15%, 자동차 10%를 나타낸 막대그래프' },
      choices: [
        'The results show that walking is the second most common way to school.',
        'The results show that more students ride a bike than walk to school.',
        'The results show that exactly half of all the students come to school by car every day.',
        'The results show that fewer students take the bus than walk to school.',
      ],
      answer: 0,
      hint: '막대의 길이를 큰 것부터 차례로 늘어놓아 보십시오.',
      why: [
        '',
        '자전거(15%)는 걷기(30%)보다 적습니다.',
        '자동차로 오는 학생은 10%로, 절반(50%)이 아닙니다.',
        '버스(45%)가 걷기(30%)보다 많습니다.',
      ],
      explain: '버스 45% > 걷기 30% > 자전거 15% > 자동차 10% 순서이므로 걷기는 **두 번째로 많은** 등교 방법입니다. 결과 문장은 그래프의 수치를 정확하게 옮겨야 합니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'order', concept: 1,
      q: '자기소개서(편지 형식)가 되도록 순서대로 놓으십시오.',
      choices: [
        'Dear Ms. Park,',
        'I am writing to apply for the volunteer position at your science museum.',
        'One of my strengths is explaining science in a fun and simple way.',
        'For example, I led weekly experiments for the 15 members of my club.',
        'Thank you for considering my application.',
        'Sincerely, Hong Jia',
      ],
      answer: [0, 1, 2, 3, 4, 5],
      hint: '인사 → 지원 동기 → 강점 → 그 강점을 보여 주는 경험 → 감사 → 맺음말 순서입니다.',
      explain: 'Dear ~,(인사) → I am writing to apply for ~(지원 동기) → One of my strengths is ~(강점) → For example, ~(경험 사례) → Thank you for considering ~(감사) → Sincerely, 이름(맺음말) 순서입니다. 강점을 먼저 말하고 예를 드는 말(For example)로 경험을 이어야 강점이 증명됩니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 3,
      q: '다음 보고서에서 **빠진** 부분은 무엇입니까?\n\n' + REPORT2,
      choices: ['방법(Method)', '목적(Purpose)', '결과(Results)', '결론(Conclusion)'],
      answer: 0,
      hint: '"몇 명을, 언제, 어떻게 조사했는가?"에 답하는 문장이 있는지 찾아보십시오.',
      why: [
        '',
        'This report examines ~ 문장이 목적입니다.',
        'About half of the students ~ 문장이 결과입니다.',
        'We suggest that ~ 문장이 결론입니다.',
      ],
      explain: '목적, 결과, 결론은 있지만 **누구를 몇 명, 언제, 어떻게 조사했는지**가 없습니다. 방법이 빠지면 읽는 사람이 "절반쯤(about half)"이라는 결과를 얼마나 믿어야 할지 판단할 수 없습니다. 예: We surveyed 100 students in June.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '다음 보고서 초고를 **내용** 점검표로 고칠 때 가장 먼저 할 일은 무엇입니까?\n\nOur class surveyed 60 students about their sleep. Most of them sleep less than seven hours on school nights. My favorite subject is science. Based on these results, we recommend less homework on weekdays.',
      choices: [
        'My favorite subject is science. 문장을 뺀다.',
        '과거형(surveyed)을 현재형(survey)으로 바꾸어 시제를 맞춘다.',
        '결론 문장을 보고서의 맨 앞으로 옮겨서 먼저 보여 준다.',
        '모든 문장 앞에 주어(I)를 넣어 다시 쓴다.',
      ],
      answer: 0,
      hint: '보고서의 주제(잠)와 관계없는 문장이 있는지 보십시오.',
      why: [
        '',
        '이미 한 조사이므로 과거형(surveyed)이 맞습니다. 바꾸면 오히려 틀립니다.',
        '결론은 결과 뒤에 와야 합니다. 순서를 바꾸면 짜임이 무너집니다.',
        '보고서는 조사한 사람들의 일이라 주어로 우리(we)를 쓰며, 문장마다 나(I)를 넣을 까닭이 없습니다.',
      ],
      explain: '잠에 관한 보고서에 "내가 좋아하는 과목은 과학이다"는 주제와 관계없는 문장입니다. 내용 점검의 질문 "주제와 관계없는 문장은 없는가?"에 걸리므로 **뺍니다**.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 2,
      q: '이력서의 경험 칸에 쓸 줄로 가장 알맞은 것은 무엇입니까? (행동 동사, 수, 결과를 모두 고려하십시오.)',
      choices: [
        'Organized a used-book sale that raised 300,000 won for the library',
        'Was in charge of a book sale, which was a fun and meaningful experience',
        'Organizing a book sale and also helping the school library in many ways',
        'I think I did a really good job at the book sale for our school library',
      ],
      answer: 0,
      hint: '무엇을 했는지 동사로 시작하고, 얼마만큼의 결과가 있었는지 보여 주는 줄을 찾으십시오.',
      why: [
        '',
        '"~을 맡았다(was in charge of)"는 약한 표현이고, "재미있고 뜻깊었다(fun and meaningful)"는 결과가 아니라 느낌입니다.',
        '-ing 꼴로 시작해 다른 줄과 병렬이 맞지 않기 쉽고, "여러 면에서(in many ways)"는 막연합니다.',
        '주어(I)를 썼고, 한 일과 결과 대신 자기 평가(good job)만 있습니다.',
      ],
      explain: '행동 동사(**Organized**)로 시작하고, 수(300,000 won)와 결과(raised ~ for the library)를 함께 보여 줍니다. 읽는 사람이 한 일의 규모와 성과를 바로 알 수 있습니다.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 0,
      q: '다음 가상의 이력서에 대한 설명으로 옳은 것은 무엇입니까?\n\n' + RESUME,
      choices: [
        '경험은 최근 것부터 적었고, 지금 하는 일은 현재형 동사로 썼다.',
        '경험을 오래된 것부터 적어서 2025년의 활동이 맨 위에 놓여 있다.',
        '경험의 줄은 모두 주어(I)로 시작하는 완전한 문장으로 썼다.',
        '연락처는 이력서의 맨 마지막 줄에 따로 모아 적었다.',
      ],
      answer: 0,
      hint: 'EXPERIENCE 칸의 날짜 순서와, 각 줄의 첫 낱말을 살펴보십시오.',
      why: [
        '',
        '2026년의 과학 동아리 경험이 2025년의 자원봉사 경험보다 위에 있습니다. 최근 것부터 적었습니다.',
        '줄마다 주어 없이 동사(Lead, Organized, Taught, Designed)로 시작합니다.',
        '연락처(이메일·전화번호)는 이름 바로 아래, 맨 위에 있습니다.',
      ],
      explain: '2026년 경험이 2025년 경험보다 위에 있으므로 **최근순**이고, 지금 하는 일(Present)은 현재형 Lead, 끝난 일은 과거형(Organized, Taught, Designed)으로 썼습니다.',
    },
  ],

  deeper: [
    {
      title: 'STAR 방법으로 경험 쓰기',
      body: '자기소개서나 면접에서 경험을 말할 때 많이 쓰는 틀이 **STAR**입니다.\n\n' +
        '| 글자 | 뜻 | 예 |\n|---|---|---|\n' +
        '| **S**ituation | 어떤 상황이었나 | Our science fair was two weeks away. |\n' +
        '| **T**ask | 내가 맡은 일은 | I had to find a guest speaker. |\n' +
        '| **A**ction | 내가 한 행동은 | I contacted five local scientists by email. |\n' +
        '| **R**esult | 결과는 | One of them agreed, and 200 people attended the talk. |\n\n' +
        '이 단원의 "강점 → 경험 사례 → 결과와 배운 점"은 STAR 틀과 같은 흐름입니다. 특히 Action에 행동 동사를, Result에 수를 넣으면 이야기가 단단해집니다.',
    },
    {
      title: '이력서와 개인정보',
      body: '영어권 나라의 이력서에는 사진, 나이, 결혼 여부처럼 일과 관계없는 개인정보를 넣지 않는 경우가 많습니다. 능력과 경험만으로 공정하게 판단받기 위해서입니다.\n\n' +
        '나라와 기관마다 요구하는 형식이 다르므로 실제로 지원할 때는 **그 기관의 안내를 먼저 확인**합니다.\n\n' +
        '> ⚠️ 연습한 이력서를 인터넷 게시판이나 단체 대화방에 올릴 때는 실제 이름·전화번호·이메일·주소를 지우고 가상의 정보(예: hong@example.com, 010-0000-0000)로 바꿉니다. 한번 공개된 연락처는 되돌리기 어렵습니다.',
    },
  ],

  faq: [
    {
      q: '이력서랑 자기소개서는 뭐가 달라요?',
      a: '이력서는 학력·경험·능력을 **목록**으로 한눈에 보여 주는 문서이고, 자기소개서는 그중 중요한 경험을 골라 지원 동기·강점과 이어 **이야기**로 풀어 쓴 글입니다. 이력서가 "무엇을 했는가"라면, 자기소개서는 "왜 지원했고 그 경험에서 무엇을 보여 줄 수 있는가"입니다.',
    },
    {
      q: '이력서에는 왜 주어(I)를 안 써요?',
      a: '이력서는 모두 나에 대한 내용이라 주어가 늘 같습니다. 그래서 주어를 빼고 행동 동사로 바로 시작해 짧고 빠르게 읽히게 합니다. 반대로 자기소개서는 편지나 글이므로 주어(I)를 넣은 완전한 문장으로 씁니다.',
    },
    {
      q: '보고서에서 결과랑 결론이 자꾸 헷갈려요.',
      a: '결과는 **조사에서 나온 사실 그대로**(45 percent take the bus)이고, 결론은 **그 사실이 뜻하는 것이나 앞으로 할 일**(We recommend a bike lane)입니다. 문장에 recommend, suggest, should, In conclusion 같은 말이 있으면 결론일 가능성이 큽니다.',
    },
    {
      q: '경험이 별로 없는데 이력서에 뭘 써요?',
      a: '큰 대회나 일한 경험이 아니어도 됩니다. 동아리 활동, 학급 임원, 봉사 활동, 학교 행사 준비, 혼자 해낸 프로젝트도 모두 경험입니다. 중요한 것은 크기보다 **무엇을 했고 어떤 결과가 있었는지**를 행동 동사와 수로 분명하게 쓰는 것입니다.',
    },
  ],

  mistakes: [
    '불규칙 동사에 어미(-ed)를 붙이는 실수 — leaded, teached, builded (×) → led, taught, built (○)',
    '보고서의 결과에 제안을 섞는 실수 — 결과에는 사실과 수치만, 제안(We recommend ~)은 결론에 씁니다.',
    '이력서의 줄 모양을 섞는 실수 — Led ~ / Organizing ~ / I designed ~ (×) → Led ~ / Organized ~ / Designed ~ (○)',
  ],

  gens: [
    {
      id: 'action-verb-past',
      level: 1,
      title: '이력서의 행동 동사를 과거형으로 쓰기',
      make: function (R) {
        var v = R.pick(VERBS);
        var base = v[0], past = v[1][0];
        return {
          type: 'short', concept: 2,
          q: '이력서의 경험 칸에 쓸 줄입니다. 이미 끝난 일이므로 괄호 안의 동사를 알맞은 꼴로 바꾸어 빈칸에 쓰십시오.\n\n[[빈칸]] (' + base + ') ' + v[2],
          answer: v[1],
          wrong: v[3].map(function (w) {
            if (w === base) return { a: w, why: '이미 끝난 경험은 과거형으로 씁니다. ' + base + ' → ' + past };
            if ([base + 'ed', base + 'd', base + base.slice(-1) + 'ed'].indexOf(past) < 0) return { a: w, why: '불규칙 동사라서 어미(-ed)를 붙이지 않습니다. ' + base + ' → ' + past };
            return { a: w, why: '과거형의 철자를 확인해 보십시오. ' + base + ' → ' + past };
          }),
          explain: base + '의 과거형은 **' + past + '**입니다. 이력서에서는 주어 없이 행동 동사로 시작합니다: ' + past.charAt(0).toUpperCase() + past.slice(1) + ' ' + v[2],
        };
      },
    },
    {
      id: 'report-section',
      level: 1,
      title: '보고서의 부분 알아보기',
      make: function (R) {
        var L = R.pick(REPORT_LINES);
        var k = L[1];
        var correct = SEC_NAME[k];
        var others = ['purpose', 'method', 'results', 'conclusion'].filter(function (x) { return x !== k; });
        var reason = {};
        others.forEach(function (o) { reason[SEC_NAME[o]] = '이 문장은 ' + SEC_NAME[o] + ' 부분의 문장이 아닙니다. ' + SEC_HINT[k]; });
        var pick = R.choices(correct, others.map(function (o) { return SEC_NAME[o]; }));
        return {
          type: 'choice', concept: 3,
          q: '보고서에서 다음 문장이 들어갈 부분은 어디입니까?\n\n' + L[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: SEC_HINT[k] + ' → **' + correct + '**',
        };
      },
    },
    {
      id: 'resume-section',
      level: 1,
      title: '이력서의 항목 알아보기',
      make: function (R) {
        var L = R.pick(RESUME_LINES);
        var k = L[1];
        var correct = RS_SEC[k];
        var others = ['contact', 'education', 'experience', 'skills', 'awards'].filter(function (x) { return x !== k; });
        var reason = {};
        others.forEach(function (o) { reason[RS_SEC[o]] = '이 내용은 ' + RS_SEC[o] + ' 칸에 쓰는 것이 아닙니다. ' + RS_HINT[k]; });
        var pick = R.choices(correct, others.map(function (o) { return RS_SEC[o]; }));
        return {
          type: 'choice', concept: 0,
          q: '가상의 영문 이력서에 다음 내용을 넣으려고 합니다. 어느 항목에 써야 합니까?\n\n' + L[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: RS_HINT[k] + ' → **' + correct + '**',
        };
      },
    },
  ],

  vocab: [
    { w: 'resume', m: '이력서', ex: 'She updated her resume before applying for the job.', exm: '그녀는 그 일자리에 지원하기 전에 이력서를 새로 고쳤다.' },
    { w: 'apply', m: '지원하다, 신청하다', ex: 'I want to apply for a volunteer position at the library.', exm: '나는 도서관 자원봉사 자리에 지원하고 싶다.' },
    { w: 'application', m: '지원(서), 신청(서)', ex: 'Please send your application by Friday.', exm: '지원서를 금요일까지 보내 주십시오.' },
    { w: 'position', m: '(일)자리, 직위', ex: 'The museum has two open positions for students.', exm: '그 박물관에는 학생을 위한 빈자리가 두 개 있다.' },
    { w: 'motivation', m: '동기, 의욕', ex: 'My motivation for volunteering is to help younger children.', exm: '내가 자원봉사를 하려는 동기는 어린아이들을 돕는 것이다.' },
    { w: 'strength', m: '강점, 장점', ex: 'One of my strengths is staying calm under pressure.', exm: '나의 강점 중 하나는 압박 속에서도 침착함을 유지하는 것이다.' },
    { w: 'achievement', m: '성취, 업적', ex: 'Winning the essay contest was my biggest achievement this year.', exm: '글짓기 대회에서 상을 받은 것이 올해 나의 가장 큰 성취였다.' },
    { w: 'organize', m: '조직하다, 준비하다', ex: 'Our club organized a book fair for the whole school.', exm: '우리 동아리는 전교생을 위한 도서 박람회를 준비했다.' },
    { w: 'design', m: '설계하다, 디자인하다', ex: 'He designed a new logo for the student council.', exm: '그는 학생회의 새 로고를 디자인했다.' },
    { w: 'volunteer', m: '자원봉사하다; 자원봉사자', ex: 'I volunteered at the community center every Saturday.', exm: '나는 토요일마다 지역 문화 센터에서 자원봉사를 했다.' },
    { w: 'purpose', m: '목적', ex: 'The purpose of this report is to explain the survey results.', exm: '이 보고서의 목적은 설문 결과를 설명하는 것이다.' },
    { w: 'method', m: '방법', ex: 'The method section explains how we collected the data.', exm: '방법 부분은 우리가 자료를 어떻게 모았는지 설명한다.' },
    { w: 'survey', m: '(설문) 조사; 조사하다', ex: 'We surveyed 100 students about their reading habits.', exm: '우리는 학생 100명에게 독서 습관에 관해 설문 조사를 했다.' },
    { w: 'recommend', m: '권하다, 추천하다', ex: 'We recommend that the school start a reading time.', exm: '우리는 학교가 독서 시간을 시작할 것을 권한다.' },
    { w: 'revise', m: '고쳐 쓰다, 수정하다', ex: 'Read your draft aloud and revise any awkward sentences.', exm: '초고를 소리 내어 읽고 어색한 문장을 고쳐 쓰십시오.' },
    { w: 'draft', m: '초안, 초고', ex: 'My first draft was too long, so I cut two paragraphs.', exm: '내 첫 초고가 너무 길어서 두 문단을 잘라 냈다.' },
  ],
});
})();

