/* 영어Ⅱ · 매체 자료 이해와 활용
 * 그래프·표의 수치는 모두 가상의 자료이고, 발표문·글은 직접 쓴 것이다(가상의 학교·인물). */
(function () {
  // 그래프 1: 여가 활동 (가상의 자료, 합계 100%)
  var FREE_FIG = { type: 'bars', labels: ['Videos', 'Games', 'Sports', 'Music', 'Reading'], values: [33, 24, 20, 15, 8], unit: '%', title: 'Favorite Free-Time Activities (가상의 자료)', alt: '여가 활동별 학생 비율 막대그래프: Videos 33, Games 24, Sports 20, Music 15, Reading 8 (%)' };
  var FREE_TEXT = 'The graph shows the favorite free-time activities of students at Hanbit High School. ① Watching videos is the most popular activity, chosen by 33 percent of the students. ② The percentage of students who play games is higher than that of students who play sports. ③ The percentage of students who listen to music is almost twice as high as that of students who read. ④ More than a quarter of the students chose sports as their favorite activity. ⑤ Reading is the least popular activity, at 8 percent.';
  // 그래프 2: 도서관 대출 (가상의 자료)
  var BOOK_FIG = { type: 'line', labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], values: [420, 380, 510, 560, 490, 600], unit: '권', title: 'Books Borrowed per Month (가상의 자료)', alt: '달마다 빌린 책 수 꺾은선그래프: 1월 420, 2월 380, 3월 510, 4월 560, 5월 490, 6월 600' };
  // 표: 동아리 회원 수 (가상의 자료)
  var CLUB_TABLE = '| Club | 2023 | 2025 |\n|---|---|---|\n| Science | 24 | 30 |\n| Drama | 18 | 12 |\n| Coding | 15 | 33 |\n| Art | 20 | 20 |';
  // 발표문 (직접 쓴 글)
  var TALK = 'Good morning, everyone. Today I\'d like to talk about why teenagers need enough sleep. First, let me explain how sleep affects memory. While we sleep, the brain sorts and stores what we learned during the day. Next, I\'ll show you the results of a survey of our class. As you can see in this graph, students who slept more than eight hours remembered more new words on a test. What I want to point out is that even one extra hour made a difference. To sum up, sleep is not wasted time; it is part of learning. Thank you for listening. Are there any questions?';

Tutor.registerUnit({
  id: 'eng-h-e2-07',
  course: 'eng-h-e2',
  title: '매체 자료 이해와 활용',
  summary: '그래프와 글이 함께 있는 자료와 강연·발표문을 이해하고, 슬라이드와 인포그래픽으로 정보를 전합니다.',
  goals: [
    '그래프·표의 수치와 본문의 설명을 맞춰 보며 정보를 통합할 수 있다.',
    '강연·발표문의 안내 표현(First, let me ~ / As you can see ~ / To sum up, ~)으로 흐름을 따라가고 직접 쓸 수 있다.',
    '긴 문장을 핵심어로 줄여 슬라이드를 만들고, 자료에 맞는 그래프로 인포그래픽을 꾸밀 수 있다.',
    '듣는 사람과 목적에 맞게 전달 방법을 고를 수 있다.',
  ],
  standards: ['[12영Ⅱ-01-07]', '[12영Ⅱ-02-08]'],

  concepts: [
    {
      title: '그래프·표와 본문을 함께 읽기',
      body: '그래프·표가 있는 글은 **수치를 본문의 문장과 하나씩 맞춰** 읽어야 합니다. 먼저 그래프의 **제목·단위·항목**을 확인하고, 문장마다 "어느 막대(칸)를 말하는가?"를 표시합니다.\n\n' +
        '| 표현 | 뜻 | 확인하는 법 |\n|---|---|---|\n' +
        '| the most / the least | 가장 많은 / 가장 적은 | 맨 위·맨 아래 값 |\n' +
        '| the second highest | 둘째로 높은 | 크기 순으로 줄 세우기 |\n' +
        '| twice as high as | ~의 두 배 | 큰 값 ÷ 작은 값 ≈ 2 |\n' +
        '| three times as many as | ~의 세 배 | 큰 값 ÷ 작은 값 ≈ 3 |\n' +
        '| more than a quarter / half | 4분의 1 / 절반보다 많은 | 25% / 50%와 비교 |\n' +
        '| rise, increase / drop, decline | 늘다 / 줄다 | 앞 시점과 비교 |\n' +
        '| peak / remain the same | 가장 높아지다 / 그대로이다 | 꺾은선의 꼭대기 / 같은 값 |\n\n' +
        '예: 여가 활동 그래프에서 Music 15%, Reading 8%이면 **almost twice as high as**(거의 두 배)는 맞지만, Sports 20%를 두고 **more than a quarter**(4분의 1보다 많다)라고 하면 틀립니다. 4분의 1은 25%이기 때문입니다.\n\n' +
        '> ⚠️ 그래프는 "얼마나"를 보여 줄 뿐 "왜"를 보여 주지 않습니다. 본문이 까닭을 덧붙였다면 그것은 그래프가 아니라 본문의 설명입니다.',
      easy: '그래프 문제는 "숨은그림 찾기"보다 "가계부 맞춰 보기"에 가깝습니다. 문장 하나를 읽을 때마다 손가락으로 해당 막대를 짚고, 수를 옆에 적어 보십시오.\n\n' +
        '"두 배"라는 말이 나오면 나눗셈을, "4분의 1"이 나오면 25와 비교를 하면 됩니다. 눈대중보다 계산이 정확합니다.',
      fig: FREE_FIG,
      check: {
        type: 'ox',
        q: '다음 가상의 자료에 따르면, 게임(Games)을 고른 학생의 비율은 운동(Sports)을 고른 학생의 비율보다 낮다.',
        fig: FREE_FIG,
        answer: false,
        explain: '게임(Games)은 24%, 운동(Sports)은 20%입니다. 게임 쪽이 **더 높습니다**. 막대의 높이와 적힌 값을 함께 확인하십시오.',
      },
    },
    {
      title: '강연·발표문의 안내 표현',
      body: '좋은 발표는 듣는 사람에게 **지금 어디쯤인지** 알려 줍니다. 이런 길잡이 말을 **안내 표현(signposting)**이라고 합니다. 듣기·읽기에서는 이 표현으로 흐름을 잡고, 발표할 때는 직접 씁니다.\n\n' +
        '| 하는 일 | 안내 표현 |\n|---|---|\n' +
        '| 주제 소개 | Today I\'d like to talk about ~ / The purpose of my talk is to ~ |\n' +
        '| 순서 안내 | First, let me ~ / Next, I\'ll ~ / Then, / Finally, ~ |\n' +
        '| 자료 가리키기 | As you can see in this graph, ~ / Take a look at this slide. / This chart shows ~ |\n' +
        '| 강조 | What I want to point out is ~ / The key point is ~ |\n' +
        '| 예 들기 | For example, ~ / Let me give you an example. |\n' +
        '| 정리 | To sum up, ~ / In conclusion, ~ / Let me summarize. |\n' +
        '| 마무리 | Thank you for listening. / Are there any questions? |\n\n' +
        '이 단원의 발표문은 **Today I\'d like to talk about** → **First, let me explain** → **Next, I\'ll show you** → **As you can see in this graph** → **What I want to point out is** → **To sum up** 순서로 흘러갑니다. 안내 표현만 이어 읽어도 발표의 뼈대가 보입니다.\n\n' +
        '> 💡 강연의 **요지**는 대개 To sum up, In conclusion 뒤나 What I want to point out is 뒤에 있습니다. 듣기에서 이 표현이 들리면 귀를 더 기울이십시오.',
      easy: '안내 표현은 박물관의 **안내 표지판**과 같습니다. "여기부터 2전시실", "출구는 이쪽"이 있으면 길을 잃지 않지요.\n\n' +
        '발표에서 First(첫째)는 "첫째 방", Next(다음)는 "다음 방", As you can see(보시다시피)는 "이 그림을 보세요", To sum up(요약하자면)은 "출구 앞 정리"입니다.',
      check: {
        type: 'choice',
        q: '발표의 **마지막에 내용을 정리할 때** 쓰기에 가장 알맞은 표현은 무엇입니까?',
        choices: ['To sum up, ~', 'First, let me ~', 'Take a look at this slide.'],
        answer: 0,
        why: ['', '첫째 내용을 시작할 때 쓰는 순서 안내 표현입니다.', '화면의 자료를 가리킬 때 쓰는 표현입니다.'],
        explain: '**To sum up**(요약하자면)은 앞의 내용을 정리하는 표현입니다. In conclusion, Let me summarize도 같은 자리에 씁니다.',
      },
    },
    {
      title: '핵심어 중심으로 슬라이드 만들기',
      body: '슬라이드는 **말할 내용을 그대로 옮겨 적는 곳이 아닙니다.** 듣는 사람은 글을 읽느라 말을 놓치기 쉽습니다. 슬라이드에는 **핵심어**만 두고, 설명은 말로 합니다.\n\n' +
        '| 긴 문장 (말로 할 내용) | 슬라이드 (핵심어) |\n|---|---|\n' +
        '| Students who slept more than eight hours remembered more new words on a test. | 8+ hours of sleep → better word memory |\n' +
        '| While we sleep, the brain sorts and stores what we learned during the day. | Sleep = sorting & storing memories |\n\n' +
        '슬라이드를 만들 때의 원칙입니다.\n\n' +
        '1. **한 장에 한 가지 생각**: 제목이 곧 그 장의 요점이 되게 씁니다. (Why Sleep Matters)\n' +
        '2. **핵심어로 줄이기**: 관사·접속사와 꼭 필요하지 않은 꾸밈말을 빼고, 뜻을 지니는 명사·동사·형용사와 수만 남깁니다. 화살표(→)·등호(=)도 쓸 수 있습니다.\n' +
        '3. **같은 꼴로 나란히(병렬)**: 항목이 여럿이면 문법 꼴을 맞춥니다. (Sleep more / Eat breakfast / Exercise daily — 모두 동사로 시작)\n' +
        '4. **글보다 그림**: 수치는 그래프로, 개념은 그림이나 아이콘으로 보여 줍니다.\n\n' +
        '> ⚠️ 핵심어로 줄여도 **수치·조건은 빠뜨리면 안 됩니다.** 8+ hours(8시간 이상)를 sleep(잠)으로만 줄이면 핵심 정보가 사라집니다.',
      easy: '친구에게 장보기 목록을 줄 때 "우유를 한 통 사 오고, 빵도 하나 사 오면 좋겠어"라고 쓰지 않고 "우유 1, 빵 1"이라고 쓰지요. 슬라이드도 그 목록처럼 짧아야 합니다.\n\n' +
        '자세한 이야기는 발표하는 사람이 **말로** 하고, 화면은 듣는 사람이 한눈에 기억할 낱말만 보여 줍니다.',
      check: {
        type: 'choice',
        q: '다음 문장을 슬라이드에 넣으려고 합니다. 핵심어로 가장 잘 줄인 것은 무엇입니까?\n\nPeople who eat breakfast every day tend to focus better in the morning.',
        choices: [
          'Daily breakfast → better morning focus',
          'People who eat breakfast every day tend to focus better',
          'Breakfast',
        ],
        answer: 0,
        why: ['', '문장을 거의 그대로 옮겼습니다. 슬라이드에는 핵심어만 남깁니다.', '너무 줄여서 "아침을 먹으면 집중이 잘된다"는 핵심 내용이 사라졌습니다.'],
        explain: '정답(**Daily breakfast → better morning focus**)은 People who, tend to 같은 군더더기를 빼고 핵심(매일 아침 식사 → 아침 집중력 향상)만 화살표로 이었습니다. 짧지만 뜻은 그대로입니다.',
      },
    },
    {
      title: '인포그래픽으로 정보 시각화하기',
      body: '**인포그래픽(infographic)**은 정보(information)와 그림(graphic)을 합친 것으로, 수치와 사실을 **그래프·아이콘·짧은 글**로 한눈에 보여 줍니다. 가장 먼저 할 일은 **자료의 성격에 맞는 그래프**를 고르는 것입니다.\n\n' +
        '| 보여 줄 것 | 알맞은 그래프 | 예 |\n|---|---|---|\n' +
        '| 항목끼리 **비교** | 막대그래프 (bar graph) | 동아리별 회원 수 |\n' +
        '| 시간에 따른 **변화** | 꺾은선그래프 (line graph) | 달마다 빌린 책 수 |\n' +
        '| 전체에서 차지하는 **부분** (합계 100%) | 원그래프 (pie chart) | 여가 활동 비율 |\n' +
        '| 정확한 수를 여러 기준으로 | 표 (table) | 연도별·동아리별 회원 수 |\n\n' +
        '좋은 인포그래픽의 원칙입니다.\n\n' +
        '- **제목이 메시지**: "Coding Club Members More Than Doubled"처럼 무엇을 봐야 하는지 알려 줍니다.\n' +
        '- **가장 중요한 수를 크게**: 한 가지 숫자를 크게 강조합니다(예: 2.2×).\n' +
        '- **출처와 단위 밝히기**: 어디에서 나온 자료인지, 단위가 %인지 명인지 적습니다.\n' +
        '- **꾸밈은 적게**: 뜻 없는 그림·색이 많으면 오히려 정보가 묻힙니다.\n\n' +
        '> ⚠️ 막대그래프의 세로축을 0이 아닌 곳에서 시작하면 작은 차이가 크게 보입니다. 차이를 부풀리지 않도록 축을 정직하게 그립니다.',
      easy: '같은 정보라도 그릇을 잘 골라야 합니다. 국은 대접에, 밥은 공기에 담듯이 **비교는 막대**, **변화는 꺾은선**, **나눠 가진 몫은 원**에 담는다고 기억하십시오.\n\n' +
        '그리고 그릇 위에 "오늘의 요리" 이름표(제목)를 붙여 주면, 보는 사람이 무엇을 먹는지 바로 압니다.',
      check: {
        type: 'choice',
        q: '한 도시의 1월부터 12월까지 **월평균 기온의 변화**를 보여 주려고 합니다. 가장 알맞은 그래프는 무엇입니까?',
        choices: ['line graph', 'pie chart', 'a table of city names'],
        answer: 0,
        why: ['', '원그래프는 전체(100%) 가운데 부분이 차지하는 몫을 보여 줍니다. 기온은 나눠 가지는 몫이 아닙니다.', '도시 이름 표에는 시간에 따른 변화가 드러나지 않습니다.'],
        explain: '**시간에 따른 변화**는 꺾은선그래프(line graph)가 가장 잘 보여 줍니다. 오르내림이 선의 기울기로 한눈에 보입니다.',
      },
    },
    {
      title: '듣는 사람과 목적에 맞게 전달하기',
      body: '같은 정보라도 **누구에게(audience)**, **무엇을 위해(purpose)** 전하느냐에 따라 방법이 달라집니다.\n\n' +
        '| 듣는 사람·목적 | 알맞은 방법 |\n|---|---|\n' +
        '| 초등학교 저학년에게 분리배출 알리기 | 쉬운 낱말, 큰 그림, 짧은 문장, 직접 해 보기 |\n' +
        '| 전문가에게 연구 결과 보고하기 | 정확한 수치·표, 방법과 한계, 격식 있는 말 |\n' +
        '| 바쁜 학부모에게 행사 일정 알리기 | 날짜·장소를 목록으로 정리한 짧은 안내문(메일·문자) |\n' +
        '| 친구들에게 캠페인 참여 설득하기 | 공감되는 사례, 눈에 띄는 인포그래픽, 행동을 부르는 한마디 |\n\n' +
        '목적은 크게 셋입니다.\n\n' +
        '- **알리기(inform)**: 정확하고 빠짐없이, 판단은 줄이고 사실 중심으로\n' +
        '- **설득하기(persuade)**: 근거와 사례, 듣는 사람의 이익, 마지막에 행동 요청(Let\'s ~ / Join us ~)\n' +
        '- **즐겁게 하기(entertain)**: 이야기·유머, 생생한 표현\n\n' +
        '또 **매체**도 고릅니다. 한 번 보고 기억해야 하면 포스터·인포그래픽, 자세히 읽고 보관해야 하면 글·보고서, 질문을 주고받아야 하면 발표·토의가 알맞습니다.\n\n' +
        '> 💡 발표 준비의 첫 질문은 "무엇을 말할까?"가 아니라 "**누가 듣고, 듣고 나서 무엇을 알거나 하게 되어야 하는가?**"입니다.',
      easy: '할머니께 휴대전화 쓰는 법을 알려 드릴 때와 같은 반 친구에게 알려 줄 때 설명이 다르지요. 할머니께는 천천히, 쉬운 말로, 직접 눌러 보시게 하고, 친구에게는 "설정 들어가서 이거 켜"면 충분합니다.\n\n' +
        '발표도 똑같습니다. 듣는 사람이 누구인지, 무엇을 하게 하고 싶은지부터 정하면 말투·자료·매체가 저절로 정해집니다.',
      check: {
        type: 'choice',
        q: '초등학교 1학년 학생들에게 손 씻기의 중요성을 알리려고 합니다. 가장 알맞은 전달 방법은 무엇입니까?',
        choices: [
          '그림과 짧은 낱말로 보여 주고 함께 따라 해 보기',
          '세균 연구 논문에 실린 통계표를 처음부터 끝까지 자세히 설명하기',
          '전문 용어를 많이 쓴 긴 안내문을 한 사람에게 한 장씩 나누어 주기',
        ],
        answer: 0,
        why: ['', '어린 학생에게 논문의 통계표는 너무 어렵습니다. 전문가에게 알맞은 방법입니다.', '긴 글과 전문 용어는 1학년 학생이 읽고 이해하기 어렵습니다.'],
        explain: '듣는 사람이 **어린 학생**이고 목적이 **습관을 들이게 하는 것**이므로, 그림·짧은 낱말·직접 따라 해 보기가 가장 알맞습니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 가상의 자료와 글을 읽고, 그래프의 내용과 **일치하지 않는** 문장을 찾아보십시오.\n\n' + FREE_TEXT,
      steps: [
        '그래프 확인: 단위는 %, 값은 Videos 33, Games 24, Sports 20, Music 15, Reading 8 (합계 100)입니다.',
        '① 가장 인기 있는 것은 Videos, 33% → 일치.',
        '② Games 24 > Sports 20 → 일치.',
        '③ Music 15 ÷ Reading 8 ≈ 1.9 → almost twice(거의 두 배) → 일치.',
        '④ more than a quarter(4분의 1, 곧 25%보다 많다)라고 했지만 운동(Sports)은 20% → **불일치**.',
        '⑤ 가장 적은 것은 Reading, 8% → 일치.',
      ],
      answer: '④',
    },
    {
      q: '발표문의 안내 표현을 찾아 발표의 뼈대를 정리해 보십시오.\n\n' + TALK,
      steps: [
        '주제 소개: Today I\'d like to talk about why teenagers need enough sleep.',
        '순서 안내 ①: First, let me explain how sleep affects memory. (잠과 기억의 관계)',
        '순서 안내 ② + 자료 가리키기: Next, I\'ll show you … / As you can see in this graph, … (설문 결과)',
        '강조: What I want to point out is that even one extra hour made a difference.',
        '정리와 마무리: To sum up, sleep is … part of learning. / Thank you for listening. Are there any questions?',
      ],
      answer: '주제 → 잠과 기억 → 설문 결과(그래프) → 강조 → 정리(잠은 배움의 일부) → 질문 받기',
    },
  ],

  terms: [
    { term: '도표 (graph, chart)', def: '수치를 막대·선·원 등으로 나타낸 그림입니다. 제목·단위·항목을 먼저 확인합니다.' },
    { term: '막대그래프 (bar graph)', def: '항목끼리 크기를 비교할 때 쓰는 그래프입니다. 예: 동아리별 회원 수' },
    { term: '꺾은선그래프 (line graph)', def: '시간에 따른 변화를 보여 주는 그래프입니다. 예: 달마다 빌린 책 수' },
    { term: '원그래프 (pie chart)', def: '전체(100%) 가운데 각 부분이 차지하는 몫을 보여 주는 그래프입니다.' },
    { term: '안내 표현 (signposting)', def: '발표에서 지금 어디쯤인지 알려 주는 길잡이 말입니다. 예: First, let me ~ / As you can see ~ / To sum up, ~' },
    { term: '핵심어 (keyword)', def: '내용의 중심이 되는 낱말입니다. 슬라이드에는 문장 대신 핵심어를 둡니다.' },
    { term: '인포그래픽 (infographic)', def: '정보를 그래프·아이콘·짧은 글로 한눈에 보이게 만든 그림 자료입니다.' },
    { term: '청중 (audience)', def: '발표를 듣거나 자료를 보는 사람입니다. 청중에 따라 말투·자료·매체가 달라집니다.' },
    { term: '병렬 구조', def: '목록의 항목들을 같은 문법 꼴로 맞추는 것입니다. 예: Sleep more / Eat breakfast / Exercise daily' },
  ],

  practice: [
    {
      id: 'p1', level: 2, type: 'choice', concept: 0,
      q: '다음 가상의 자료에 관한 글에서, 그래프의 내용과 **일치하지 않는** 문장은 무엇입니까?\n\n' + FREE_TEXT,
      fig: FREE_FIG,
      choices: ['①', '②', '③', '④', '⑤'],
      fixed: true,
      answer: 3,
      why: [
        '영상(Videos)이 33%로 가장 높으므로 일치합니다.',
        'Games 24%가 Sports 20%보다 높으므로 일치합니다.',
        'Music 15%는 Reading 8%의 약 1.9배이므로 almost twice(거의 두 배)와 일치합니다.',
        '',
        '독서(Reading)가 8%로 가장 낮으므로 일치합니다.',
      ],
      hint: 'a quarter(4분의 1)는 몇 %인지 먼저 떠올리십시오.',
      explain: '운동(Sports)은 **20%**입니다. **more than a quarter**(4분의 1보다 많은)는 25%보다 많다는 뜻이므로 일치하지 않습니다. 맞게 고치면 "One fifth of the students chose sports."(5분의 1)입니다.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: '다음 가상의 자료에 따르면, Coding 동아리의 2025년 회원 수는 2023년 회원 수의 두 배보다 많다.\n\n' + CLUB_TABLE,
      answer: true,
      explain: '코딩(Coding) 동아리는 15명에서 33명이 되었습니다. 두 배는 30명이므로 33명은 **두 배보다 많습니다**(more than doubled). 33 ÷ 15 = 2.2입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '발표문의 빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nToday I\'d like to talk about saving water at home. [[빈칸]], let me explain how much water a family uses in a day.',
      choices: ['First', 'To sum up', 'In conclusion', 'Thank you for listening'],
      answer: 0,
      why: [
        '',
        'To sum up(요약하자면)은 마지막에 정리할 때 씁니다. 주제를 소개한 바로 뒤에는 어울리지 않습니다.',
        'In conclusion도 결론을 맺을 때 씁니다. 이제 막 설명을 시작하는 자리입니다.',
        '발표를 마칠 때 하는 인사입니다.',
      ],
      explain: '주제를 소개한 뒤 첫 번째 내용을 시작하므로 순서 안내 표현 **First**(먼저)가 알맞습니다. First, let me explain ~ 의 뜻은 "먼저 ~을 설명하겠습니다"입니다.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'text', concept: 1,
      q: '발표를 정리할 때 쓰는 표현입니다. 빈칸에 알맞은 영어 낱말 한 개를 쓰십시오.\n\nTo [[빈칸]] up, sleep is not wasted time; it is part of learning.\n\n(요약하자면, 잠은 낭비하는 시간이 아니라 배움의 일부입니다.)',
      answer: ['sum'],
      wrong: [
        { a: 'some', why: '소리는 같지만 철자가 다릅니다. "요약하다"는 sum up(sum: 합계)입니다.' },
        { a: 'summarize', why: 'summarize(요약하다)는 그 자체가 동사라 뒤에 up 없이 씁니다. 바른 꼴: To sum up / To summarize' },
      ],
      explain: '**To sum up**(요약하자면)은 정리 표현입니다. sum(합계) 뒤에 up(위로)이 붙은 sum up의 뜻은 "요약하다"입니다. In conclusion, Let me summarize도 같은 자리에 씁니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '다음 문장을 슬라이드에 넣으려고 합니다. 핵심어로 가장 잘 줄인 것은 무엇입니까?\n\nUsing a reusable bottle instead of buying plastic bottles can reduce a lot of waste.',
      choices: [
        'Reusable bottle → less plastic waste',
        'Using a reusable bottle instead of buying plastic bottles can reduce waste',
        'Bottles',
        'Plastic bottles are very convenient for everyone',
      ],
      answer: 0,
      why: [
        '',
        '문장을 거의 그대로 옮겼습니다. 듣는 사람이 읽느라 말을 놓치기 쉽습니다.',
        '너무 줄여서 "다회용 병을 쓰면 쓰레기가 준다"는 핵심이 사라졌습니다.',
        '원래 문장과 반대되는 내용입니다. 핵심어로 줄이면서 뜻이 바뀌면 안 됩니다.',
      ],
      explain: '정답(**Reusable bottle → less plastic waste**)은 핵심(다회용 병 → 플라스틱 쓰레기 감소)만 남기고 화살표로 원인과 결과를 이었습니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '반 학생 30명이 좋아하는 계절을 조사했습니다. 봄·여름·가을·겨울이 **전체에서 차지하는 비율**을 보여 주려면 어떤 그래프가 가장 알맞습니까?',
      choices: ['pie chart', 'line graph', 'a map of the school'],
      answer: 0,
      why: [
        '',
        '꺾은선그래프는 시간에 따른 변화를 보여 줍니다. 계절별 선호는 시간의 흐름이 아니라 몫의 비교입니다.',
        '학교 지도는 조사 결과와 관계가 없습니다.',
      ],
      explain: '전체(30명, 곧 100%) 가운데 각 계절이 차지하는 **부분**을 보여 줄 때는 원그래프(pie chart)가 알맞습니다. 항목끼리 크기만 비교하려면 막대그래프도 쓸 수 있습니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '바쁜 학부모들에게 다음 달 학교 행사 세 가지의 **날짜와 장소**를 알리려고 합니다. 가장 알맞은 방법은 무엇입니까?',
      choices: [
        '날짜·장소만 목록으로 담은 짧은 안내문 보내기',
        '행사를 준비한 과정을 자세히 쓴 긴 수필 보내기',
        '30분짜리 발표를 열어 행사의 역사부터 설명하기',
        '행사 사진만 보내고 날짜는 따로 알리지 않기',
      ],
      answer: 0,
      why: [
        '',
        '바쁜 학부모가 날짜와 장소를 찾으려면 긴 글을 다 읽어야 합니다. 목적(일정 알리기)에 비해 너무 깁니다.',
        '날짜와 장소만 알면 되는데 30분을 내야 해서 바쁜 학부모에게 맞지 않습니다.',
        '사진만으로는 가장 중요한 정보(날짜·장소)가 전해지지 않습니다.',
      ],
      explain: '듣는 사람이 **바쁘고**, 목적이 **일정 알리기**이므로 핵심 정보(날짜·장소)만 한눈에 보이게 정리한 짧은 안내문이 가장 알맞습니다.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 1,
      q: '발표의 흐름에 맞게 문장을 순서대로 놓으십시오.',
      choices: [
        'Today I\'d like to talk about why we should walk to school.',
        'First, let me explain how walking helps our health.',
        'Next, I\'ll show you how it reduces traffic near our school.',
        'To sum up, walking is good for us and for our town.',
        'Thank you for listening. Are there any questions?',
      ],
      answer: [0, 1, 2, 3, 4],
      explain: '주제 소개(Today I\'d like to talk about) → 첫째 내용(First, let me) → 다음 내용(Next, I\'ll) → 정리(To sum up) → 마무리 인사와 질문 받기. 안내 표현이 순서를 알려 줍니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 0,
      q: '다음 가상의 자료에서, 빌린 책 수가 **바로 전 달보다 가장 많이 늘어난** 달은 언제입니까?',
      fig: BOOK_FIG,
      choices: ['Mar', 'Apr', 'Jun', 'Feb'],
      answer: 0,
      why: [
        '',
        '4월은 3월보다 50권(510 → 560) 늘었습니다. 3월의 증가가 더 큽니다.',
        '6월은 5월보다 110권(490 → 600) 늘었습니다. 가장 높은 값이지만 증가량이 가장 큰 것은 아닙니다.',
        '2월은 1월보다 40권(420 → 380) 줄었습니다.',
      ],
      hint: '가장 높은 점이 아니라, 앞 달과의 차이가 가장 큰 곳을 찾으십시오.',
      explain: '앞 달과의 차이: 2월 −40, 3월 **+130**(380 → 510), 4월 +50, 5월 −70, 6월 +110. 가장 많이 늘어난 달은 **3월**입니다. 가장 높은 값(peak)인 6월과 헷갈리지 마십시오.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 1,
      q: '발표 중에 "**As you can see in this graph**, ~"라는 말이 하는 일로 가장 알맞은 것은 무엇입니까?',
      choices: [
        '화면의 자료로 눈길을 이끈다',
        '발표를 모두 마치고 청중의 질문을 받는다',
        '발표의 주제를 처음 소개한다',
        '앞의 내용을 짧게 요약한다',
      ],
      answer: 0,
      why: [
        '',
        '질문을 받을 때 쓰는 표현: Are there any questions?',
        '주제를 소개할 때는 Today I\'d like to talk about ~을 씁니다.',
        '요약할 때 쓰는 표현: To sum up, In conclusion',
      ],
      explain: '"이 그래프에서 보시다시피"는 **자료 가리키기** 표현입니다. Take a look at this slide, This chart shows ~도 같은 일을 합니다.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: '명', concept: 0,
      q: '다음 가상의 자료를 보고 답하십시오. 2023년에서 2025년 사이에 Coding 동아리 회원은 몇 명 늘었습니까?\n\n' + CLUB_TABLE,
      answer: '18',
      wrong: [
        { a: '33', why: '33명은 2025년의 회원 수입니다. 늘어난 수는 2025년 값에서 2023년 값을 빼야 합니다.' },
        { a: '6', why: '6명은 Science 동아리가 늘어난 수(24 → 30)입니다. Coding 줄을 다시 보십시오.' },
      ],
      explain: '코딩(Coding) 동아리는 2023년 **15명**, 2025년 **33명**이므로 늘어난 수는 33 − 15 = **18명**입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 3,
      q: '동아리 회원 수 변화를 인포그래픽으로 만들려고 합니다. 좋은 인포그래픽의 원칙에 **맞지 않는** 것은 무엇입니까?',
      choices: [
        '차이를 크게 보이도록 세로축을 0이 아닌 곳에서 시작한다',
        '제목에 핵심 메시지를 담아 "Coding Club More Than Doubled"라고 쓴다',
        '가장 중요한 수(2.2배)를 크게 강조한다',
        '자료의 출처와 단위(명)를 밝혀 적는다',
      ],
      answer: 0,
      why: [
        '',
        '제목이 무엇을 봐야 하는지 알려 주므로 좋은 원칙입니다.',
        '한 가지 중요한 수를 크게 보여 주는 것은 좋은 원칙입니다.',
        '출처와 단위를 밝히는 것은 믿을 만한 자료의 기본입니다.',
      ],
      explain: '세로축을 0이 아닌 곳에서 시작하면 작은 차이가 **실제보다 크게** 보입니다. 정보를 부풀리는 것이므로 원칙에 맞지 않습니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '다음 가상의 자료를 설명한 글 가운데, **표만 보고는 확인할 수 없는** 내용은 무엇입니까?\n\n' + CLUB_TABLE,
      choices: [
        'The Coding club grew thanks to new computers.',
        'The Art club had the same number of members in both years.',
        'The Drama club lost a third of its members.',
        'In 2025, the Coding club was the largest of the four clubs.',
      ],
      answer: 0,
      why: [
        '',
        '미술(Art) 동아리는 두 해 모두 20명이므로 표로 확인할 수 있습니다.',
        '연극(Drama) 동아리는 18명에서 12명으로 6명, 곧 3분의 1이 줄었으므로 표로 확인할 수 있습니다.',
        '2025년 Coding 33명은 Science 30, Drama 12, Art 20보다 많으므로 표로 확인할 수 있습니다.',
      ],
      hint: '표는 "얼마나"를 보여 줍니다. "왜"도 보여 줍니까?',
      explain: '표는 회원 수만 보여 줄 뿐 **늘어난 까닭**은 보여 주지 않습니다. "새 컴퓨터 덕분에"는 표에 없는 정보이므로 확인할 수 없습니다. 나머지는 모두 표의 수로 확인됩니다(Drama: 18 − 12 = 6, 6 ÷ 18 = 3분의 1).',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: '명', concept: 0,
      q: '여가 활동 조사(가상의 자료)에 학생 **400명**이 답했습니다. 음악(Music)을 고른 학생은 몇 명입니까?',
      fig: FREE_FIG,
      answer: '60',
      wrong: [
        { a: '15', why: '15는 비율(%)입니다. 400명의 15%를 계산해야 합니다.' },
        { a: '32', why: '32명은 독서(Reading, 8%)를 고른 학생 수입니다. 음악(Music)은 15%입니다.' },
      ],
      hint: '그래프의 값은 %입니다. 400 × 0.15를 계산하십시오.',
      explain: '음악(Music)은 **15%**입니다. 400명의 15%는 400 × 15 ÷ 100 = **60명**입니다. 그래프(비율)와 글(전체 인원)을 합쳐야 풀 수 있는 정보 통합 문제입니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 2,
      q: '다음 슬라이드의 항목을 **병렬 구조**에 맞게 고치려고 합니다. 가장 알맞은 것은 무엇입니까?\n\nHow to Sleep Better\n- Go to bed at the same time\n- Turning off screens an hour before bed\n- A dark and quiet room',
      choices: [
        'Go to bed at the same time / Turn off screens an hour before bed / Keep your room dark and quiet',
        'Going to bed at the same time / Turn off screens an hour before bed / A dark and quiet room',
        'Go to bed at the same time / Turning off screens an hour before bed / Your room should be dark and quiet',
        'Bed / Screens / Room',
      ],
      answer: 0,
      why: [
        '',
        '첫 항목은 -ing, 둘째는 동사원형, 셋째는 명사구라 여전히 꼴이 제각각입니다.',
        '동사원형, -ing, 문장이 섞여 있어 병렬 구조가 아닙니다.',
        '꼴은 같지만 너무 줄여서 무엇을 하라는 것인지 알 수 없습니다.',
      ],
      hint: '세 항목이 모두 같은 꼴(예: 동사원형으로 시작하는 명령문)이 되는 것을 고르십시오.',
      explain: 'Go …, Turn off …, Keep … 처럼 세 항목이 모두 **동사원형으로 시작**합니다. 항목의 꼴이 같으면 듣는 사람이 목록을 한눈에 읽고 기억하기 쉽습니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '학교 근처 횡단보도가 위험하다는 것을 알리고, 시청에 신호등 설치를 **요청하는** 발표를 하려고 합니다. 듣는 사람은 시청 담당 공무원입니다. 가장 알맞은 준비는 무엇입니까?',
      choices: [
        '통행량·사고 위험 자료로 근거를 보이고, 구체적으로 요청한다',
        '친구들끼리 쓰는 편한 말투로 재미있는 이야기를 많이 넣어 웃게 한다',
        '횡단보도의 역사를 처음부터 길게 설명하고, 요청은 따로 하지 않는다',
        '감정에 호소하는 사진만 여러 장 보여 주고 수치는 모두 뺀다',
      ],
      answer: 0,
      why: [
        '',
        '공무원에게 하는 공식 발표이므로 격식 있는 말이 알맞습니다. 목적도 즐겁게 하기가 아니라 설득입니다.',
        '목적은 신호등 설치를 요청하는 것입니다. 요청이 빠지면 설득하는 발표가 되지 않습니다.',
        '사진은 도움이 되지만, 결정을 내리는 사람에게는 수치로 된 근거가 꼭 필요합니다.',
      ],
      hint: '듣는 사람(결정을 내리는 공무원)과 목적(설득·요청)을 함께 생각하십시오.',
      explain: '목적이 **설득(요청)**이고 듣는 사람이 **결정을 내리는 공무원**이므로, 통행량·사례 같은 **객관적인 근거**를 보이고 **구체적인 요청**(Please install a traffic light at …)으로 끝맺는 것이 가장 알맞습니다.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 1,
      q: '다음 발표문에서 안내 표현이 **흐름에 맞지 않게** 쓰인 문장은 무엇입니까?\n\n(A) Today I\'d like to talk about our school\'s recycling program. (B) In conclusion, let me first explain how the program started. (C) Next, I\'ll show you how much waste we have recycled this year. (D) As you can see in this chart, the amount has grown every month. (E) Thank you for listening.',
      choices: ['(A)', '(B)', '(C)', '(D)', '(E)'],
      fixed: true,
      answer: 1,
      why: [
        '(A)는 처음에 주제를 소개하는 알맞은 표현입니다.',
        '',
        '(C)의 Next, I\'ll show you ~는 둘째 내용으로 넘어가는 알맞은 표현입니다.',
        '(D)의 As you can see in this chart(이 차트에서 보시다시피)는 차트를 가리키는 알맞은 표현입니다.',
        '(E)는 마무리 인사로 알맞습니다.',
      ],
      hint: '"결론적으로"라는 말이 발표의 둘째 문장에 오는 것이 자연스러운지 생각하십시오.',
      explain: '(B)는 첫째 내용을 시작하는 자리인데 **In conclusion**(결론적으로)을 썼습니다. 바르게 고친 문장: First, let me explain how the program started. In conclusion(결론적으로)은 발표 끝에 정리할 때 씁니다.',
    },
  ],

  deeper: [
    {
      title: '그래프는 정직한가? 축과 기준 살피기',
      body: '같은 자료도 그리는 방법에 따라 인상이 크게 달라집니다.\n\n' +
        '- **세로축의 시작점**: 30에서 33으로 늘어난 것을 0부터 그리면 작은 변화이지만, 세로축을 29에서 시작하면 막대가 몇 배로 커진 것처럼 보입니다.\n' +
        '- **기간 고르기**: 꺾은선그래프에서 오른 구간만 잘라 보여 주면 늘 오르는 것처럼 보입니다.\n' +
        '- **비율과 수**: "회원이 100% 늘었다"는 2명에서 4명이 된 것일 수도 있습니다. 비율과 실제 수를 함께 확인합니다.\n\n' +
        '자료를 **읽을 때**는 축·기간·단위를 확인하고, 자료를 **만들 때**는 듣는 사람이 오해하지 않도록 정직하게 그리는 것이 정보를 다루는 사람의 책임입니다. 공통영어2에서 배운 "매체 자료 비판적으로 읽기"가 그래프에도 그대로 적용됩니다.',
    },
    {
      title: '발표 슬라이드와 말의 역할 나누기',
      body: '발표에서 슬라이드와 말은 **서로 다른 일**을 합니다. 슬라이드는 **보는 것**(핵심어, 그래프, 그림)을, 말은 **설명과 이야기**(까닭, 예, 연결)를 맡습니다.\n\n' +
        '슬라이드의 글을 그대로 읽는 발표는 듣는 사람이 같은 내용을 두 번 받는 셈이라 금방 지루해집니다. 반대로 슬라이드에 아무것도 없으면 듣는 사람이 길을 잃습니다.\n\n' +
        '좋은 연습 방법: 슬라이드마다 **핵심어 3~5개**만 적고, 그 낱말을 보며 **문장으로 풀어 말하는** 연습을 해 보십시오. 이 단원의 안내 표현(First, let me ~ / As you can see ~ / To sum up ~)을 넣으면 슬라이드 사이의 연결도 자연스러워집니다.',
    },
  ],

  faq: [
    {
      q: '도표 문제에서 두 배(twice)나 세 배(three times)가 나오면 어떻게 확인해요?',
      a: '큰 값을 작은 값으로 나누어 보십시오. 결과가 2쯤이면 twice, 3쯤이면 three times입니다. almost twice(거의 두 배)는 2보다 조금 작을 때(예: 15 ÷ 8 ≈ 1.9), more than twice(두 배 넘게)는 2보다 클 때 씁니다. 눈대중으로 막대 길이만 보면 틀리기 쉽습니다.',
    },
    {
      q: '슬라이드에 문장을 쓰면 안 되나요?',
      a: '꼭 필요한 인용이나 정의는 문장으로 써도 됩니다. 하지만 설명할 내용을 모두 문장으로 옮기면 듣는 사람이 글을 읽느라 발표를 놓칩니다. 기본은 핵심어, 문장은 꼭 필요할 때만 쓰는 것이 좋습니다.',
    },
    {
      q: 'To sum up(요약하자면)이랑 In conclusion(결론적으로)은 똑같은 거예요?',
      a: '둘 다 발표나 글의 끝에서 정리할 때 씁니다. To sum up(요약하자면)은 앞의 내용을 짧게 요약하는 느낌이 강하고, In conclusion(결론적으로)은 결론을 맺는다는 느낌이 강해 조금 더 격식 있는 자리에 잘 어울립니다. 어느 쪽이든 발표 중간이나 처음에는 쓰지 않습니다.',
    },
  ],

  mistakes: [
    '4분의 1보다 많다(more than a quarter)나 두 배(twice)를 눈대중으로 판단하는 실수 — 25%와 비교하고, 큰 값을 작은 값으로 나누어 확인하십시오.',
    '가장 높은 값(peak)과 가장 많이 늘어난 때를 헷갈리는 실수 — 증가량은 앞 시점과의 차이로 구합니다.',
    '말할 내용을 슬라이드에 모두 문장으로 적는 실수 — 슬라이드에는 핵심어, 설명은 말로 합니다.',
  ],

  gens: [
    {
      id: 'signpost-function',
      level: 1,
      title: '발표의 안내 표현이 하는 일',
      make: function (R) {
        var FN = ['주제 소개', '순서 안내', '자료 가리키기', '강조', '정리'];
        // [표현, 하는 일 번호]
        var items = [
          ['Today I\'d like to talk about ~', 0], ['The purpose of my talk is to ~', 0], ['I\'m here to tell you about ~', 0],
          ['First, let me explain ~', 1], ['Next, I\'ll move on to ~', 1], ['Finally, I\'ll talk about ~', 1], ['Let\'s turn to the second point.', 1],
          ['As you can see in this graph, ~', 2], ['Take a look at this slide.', 2], ['This chart shows ~', 2], ['Look at the numbers on the left.', 2],
          ['What I want to point out is ~', 3], ['The key point is ~', 3], ['I\'d like to stress that ~', 3],
          ['To sum up, ~', 4], ['In conclusion, ~', 4], ['Let me summarize the main points.', 4],
        ];
        var it = R.pick(items);
        var correct = FN[it[1]];
        var others = FN.filter(function (f) { return f !== correct; });
        var pick = R.choices(correct, R.shuffle(others), 4);
        var EX = {
          '주제 소개': '발표를 시작하며 무엇에 관해 말할지 알리는 말입니다.',
          '순서 안내': '첫째·다음·마지막처럼 발표의 차례를 알리는 말입니다.',
          '자료 가리키기': '그래프·슬라이드 같은 화면의 자료로 눈길을 이끄는 말입니다.',
          '강조': '가장 중요한 점을 짚어 주는 말입니다.',
          '정리': '발표 끝에서 앞의 내용을 요약하거나 결론을 맺는 말입니다.',
        };
        return {
          type: 'choice', concept: 1,
          q: '발표에서 다음 표현이 하는 일로 가장 알맞은 것은 무엇입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : '"' + c + '" 표현은 ' + EX[c].replace('말입니다.', '말이라 이 표현과 맞지 않습니다.'); }),
          explain: it[0] + ' → **' + correct + '**: ' + EX[correct],
        };
      },
    },
    {
      id: 'graph-statement',
      level: 2,
      title: '막대그래프와 일치하는 문장 고르기',
      make: function (R) {
        var names = R.sample(['Science', 'Drama', 'Coding', 'Art', 'Music', 'Sports', 'Reading', 'Cooking'], 4);
        var vals = R.distinct(4, function () { return R.int(5, 30) * 2; });
        var idx = [0, 1, 2, 3];
        var sorted = idx.slice().sort(function (a, b) { return vals[b] - vals[a]; });
        var top = sorted[0], second = sorted[1];
        // 차이 문장에 쓸 두 동아리 (큰 쪽 x, 작은 쪽 y)
        var pair = R.sample(idx, 2);
        var x = vals[pair[0]] > vals[pair[1]] ? pair[0] : pair[1];
        var y = x === pair[0] ? pair[1] : pair[0];
        var d = vals[x] - vals[y];
        var wrongD = R.pick(d > 2 ? [d + 2, d - 2] : [d + 2, d + 4]);
        var notTop = R.pick(idx.filter(function (i) { return i !== top; }));
        var notSecond = R.pick(idx.filter(function (i) { return i !== second; }));
        var S = {
          top: function (i) { return 'The ' + names[i] + ' club has the most members.'; },
          diff: function (n) { return 'The ' + names[x] + ' club has ' + n + ' more members than the ' + names[y] + ' club.'; },
          second: function (i) { return 'The ' + names[i] + ' club ranks second in the number of members.'; },
        };
        var trueKind = R.pick(['top', 'diff', 'second']);
        var correct = trueKind === 'top' ? S.top(top) : trueKind === 'diff' ? S.diff(d) : S.second(second);
        var wrongs = [];
        var why = {};
        function addWrong(s, w) { if (s !== correct && !(s in why)) { wrongs.push(s); why[s] = w; } }
        addWrong(S.top(notTop), names[notTop] + ' 동아리는 ' + vals[notTop] + '명이라 가장 많지 않습니다. 가장 많은 것은 ' + names[top] + ' 동아리(' + vals[top] + '명)입니다.');
        addWrong(S.diff(wrongD), names[x] + ' 동아리(' + vals[x] + '명)와 ' + names[y] + ' 동아리(' + vals[y] + '명)의 차이는 ' + wrongD + '명이 아니라 ' + d + '명입니다.');
        addWrong(S.second(notSecond), names[notSecond] + ' 동아리는 둘째가 아닙니다. 둘째로 많은 것은 ' + names[second] + ' 동아리(' + vals[second] + '명)입니다.');
        // 후보가 모자라면 다른 거짓 문장을 더한다
        idx.forEach(function (i) {
          if (i !== top) addWrong(S.top(i), names[i] + ' 동아리는 ' + vals[i] + '명이라 가장 많지 않습니다. 가장 많은 것은 ' + names[top] + ' 동아리(' + vals[top] + '명)입니다.');
          if (i !== second) addWrong(S.second(i), names[i] + ' 동아리는 둘째가 아닙니다. 둘째로 많은 것은 ' + names[second] + ' 동아리(' + vals[second] + '명)입니다.');
        });
        var pick = R.choices(correct, wrongs.slice(0, 3), 4);
        var list = idx.map(function (i) { return names[i] + ' ' + vals[i] + '명'; }).join(', ');
        return {
          type: 'choice', concept: 0,
          q: '다음은 한 학교의 동아리별 회원 수를 나타낸 가상의 자료입니다. 그래프의 내용과 **일치하는** 문장은 무엇입니까?',
          fig: { type: 'bars', labels: names, values: vals, unit: '명', title: 'Club Members (가상의 자료)' },
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : why[c]; }),
          explain: '그래프의 값: ' + list + '. 정답 문장: ' + correct,
        };
      },
    },
  ],

  vocab: [
    { w: 'graph', m: '그래프', ex: 'The graph shows how much water each family uses.', exm: '그 그래프는 가족마다 물을 얼마나 쓰는지 보여 줍니다.' },
    { w: 'chart', m: '도표, 차트', ex: 'This chart compares the prices of three bikes.', exm: '이 도표는 자전거 세 대의 값을 비교합니다.' },
    { w: 'percentage', m: '백분율, 비율', ex: 'The percentage of students who walk to school is rising.', exm: '걸어서 등교하는 학생의 비율이 늘고 있습니다.' },
    { w: 'quarter', m: '4분의 1', ex: 'A quarter of the class chose music.', exm: '반의 4분의 1이 음악을 골랐습니다.' },
    { w: 'increase', m: '늘다; 증가', ex: 'The number of visitors increased in June.', exm: '6월에 방문객 수가 늘었습니다.' },
    { w: 'decline', m: '줄다; 감소', ex: 'Sales declined slightly in May.', exm: '5월에 판매량이 조금 줄었습니다.' },
    { w: 'peak', m: '가장 높은 점; 정점에 이르다', ex: 'Borrowing peaked in June.', exm: '대출은 6월에 가장 많았습니다.' },
    { w: 'presentation', m: '발표', ex: 'I gave a presentation about sleep in English class.', exm: '나는 영어 시간에 잠에 관한 발표를 했습니다.' },
    { w: 'slide', m: '(발표용) 슬라이드', ex: 'Each slide should have one main idea.', exm: '슬라이드마다 중심 생각이 하나씩 있어야 합니다.' },
    { w: 'keyword', m: '핵심어', ex: 'Write only keywords on your slides.', exm: '슬라이드에는 핵심어만 쓰십시오.' },
    { w: 'infographic', m: '인포그래픽', ex: 'The infographic made the data easy to understand.', exm: '그 인포그래픽 덕분에 자료를 이해하기 쉬웠습니다.' },
    { w: 'visual', m: '시각 자료; 시각의', ex: 'Use visuals such as charts and pictures.', exm: '도표나 그림 같은 시각 자료를 쓰십시오.' },
    { w: 'audience', m: '청중, 듣는 사람', ex: 'Think about your audience before you plan the talk.', exm: '발표를 계획하기 전에 청중을 생각하십시오.' },
    { w: 'purpose', m: '목적', ex: 'The purpose of this poster is to inform students.', exm: '이 포스터의 목적은 학생들에게 알리는 것입니다.' },
    { w: 'summarize', m: '요약하다', ex: 'Let me summarize the main points.', exm: '요점을 요약하겠습니다.' },
    { w: 'point out', m: '지적하다, 짚다', ex: 'She pointed out a mistake in the chart.', exm: '그녀는 도표의 실수를 짚어 주었습니다.' },
  ],
});
})();
