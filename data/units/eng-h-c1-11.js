/* 공통영어1 · 도표·사진 설명하고 발표하기
 * 지문·예문·도표 수치는 모두 직접 만든 가상의 자료다(가상의 인물·학교). */
(function () {
  // 발표 원고 (직접 쓴 글, 가상의 자료)
  var TALK = 'Hello, everyone. Today I\'d like to talk about how students in our school get to school. As you can see in this graph, walking is the most common way. About half of the students walk to school. Taking the bus comes second, at 30 percent. Only 5 percent of the students come by car, which is the least common way. In conclusion, most of our students get to school without a car. Thank you for listening.';
  var WAY_FIG = { type: 'bars', labels: ['Walk', 'Bus', 'Bike', 'Car'], values: [50, 30, 15, 5], unit: '%', title: 'How Students Get to School (가상의 자료)' };

Tutor.registerUnit({
  id: 'eng-h-c1-11',
  course: 'eng-h-c1',
  title: '도표·사진 설명하고 발표하기',
  summary: '증가·감소와 배수·비율 표현으로 도표를 설명하고, 사진과 자료를 활용해 짧게 발표합니다.',
  goals: [
    'increase, decline, remain steady 같은 표현으로 도표의 변화를 설명할 수 있다.',
    'percent, half, one third 같은 비율 표현과 twice as ~ as, three times + 비교급 + than 같은 배수 표현을 바르게 쓸 수 있다.',
    'the second largest, one of the + 최상급 + 복수 명사 같은 순위 표현을 이해하고 쓸 수 있다.',
    '사진 속 위치와 동작을 묘사하고, 도입-설명-마무리 짜임으로 자료를 가리키며 짧게 발표할 수 있다.',
  ],
  standards: ['[10공영1-02-01]', '[10공영1-02-02]', '[10공영1-02-07]'],

  concepts: [
    {
      title: '증가·감소·변화 없음 표현',
      body: '도표를 설명할 때 가장 먼저 쓰는 말은 **변화의 방향**입니다.\n\n| 방향 | 동사 | 명사 |\n|---|---|---|\n| 늘다 | **increase**, rise(rose–risen), grow, go up | an increase, a rise |\n| 줄다 | **decrease**, **decline**, drop, fall(fell–fallen), go down | a decrease, a decline, a drop |\n| 그대로 | **remain steady**, remain stable, stay the same | — |\n\n변화의 **정도**는 부사(동사 뒤)나 형용사(명사 앞)로 덧붙입니다.\n\n- 크게: sharply, dramatically, rapidly → The number **rose sharply**. / a **sharp** rise\n- 조금: slightly → Sales **decreased slightly**. / a **slight** decrease\n- 서서히: gradually, steadily → The price **increased gradually**.\n\n**from A to B**는 처음 값과 나중 값, **by**는 그 **차이**를 나타냅니다.\n\nThe number of visitors **rose from 200 to 500**. (200명에서 500명으로)\nThe number of visitors **rose by 300**. (300명만큼)\n\n> ⚠️ rise(오르다)는 목적어를 받지 않는 동사입니다. "가격이 올랐다"는 Prices **rose**. 이고, Prices raised. 는 틀린 문장입니다. raise(올리다)는 The shop **raised** its prices. 처럼 목적어가 필요합니다.',
      easy: '도표 설명은 **엘리베이터 안내 방송**과 비슷합니다. "올라갑니다(increase, rise)", "내려갑니다(decrease, decline)", "이 층에 머뭅니다(remain steady)" 세 가지 가운데 하나를 먼저 말하고, "천천히(gradually)"인지 "빠르게(sharply)"인지 덧붙이면 됩니다.\n\n3층에서 7층으로 갔다면 from 3 to 7, 4개 층을 올라갔다면 by 4입니다. **to는 도착한 층, by는 움직인 거리**라고 기억하십시오.',
      check: {
        type: 'choice',
        q: '꺾은선그래프의 내용과 맞도록 빈칸에 알맞은 말을 고르십시오.\n\nThe number of club members [[blank]] from 2021 to 2023.',
        fig: { type: 'line', labels: ['2021', '2022', '2023'], values: [40, 40, 40], unit: '명', title: 'Club Members (가상의 자료)' },
        choices: ['remained steady', 'increased sharply', 'declined slightly'],
        answer: 0,
        why: ['', '세 해 모두 40명이므로 늘지 않았습니다. 값이 그대로일 때는 remain steady를 씁니다.', '값이 줄지 않았습니다. decline은 "줄다"입니다.'],
        explain: '2021년, 2022년, 2023년 모두 40명으로 같습니다. 값이 변하지 않을 때는 **remained steady**(변함없이 유지되었다)를 씁니다.',
      },
    },
    {
      title: '비율·분수 표현',
      body: '전체 가운데 얼마인지는 **퍼센트**나 **분수**로 나타냅니다.\n\n| 표현 | 뜻 |\n|---|---|\n| 40 **percent** of ~ | ~의 40% |\n| **half** of ~ | ~의 절반(50%) |\n| **one third** (a third) of ~ | ~의 3분의 1 |\n| **two thirds** of ~ | ~의 3분의 2 |\n| **a quarter** (one fourth) of ~ | ~의 4분의 1(25%) |\n| **three quarters** of ~ | ~의 4분의 3(75%) |\n| **the majority** of ~ | ~의 대다수(절반이 넘는) |\n\n**분수 읽기**: 분자는 기수(one, two, three), 분모는 서수(third, fourth, fifth)로 읽습니다. 분자가 2 이상이면 분모에 **-s**를 붙입니다. → two third**s**, three fifth**s**\n\n**동사의 수**는 of 뒤의 명사에 맞춥니다.\n\n- **Forty percent of the students are** in clubs. (students는 복수 → are)\n- **Half of the water is** used for farming. (water는 셀 수 없음 → is)\n\n> 💡 percent는 숫자 뒤에 붙여 씁니다(40 percent). 숫자 없이 "비율"이라고 할 때는 **percentage**를 씁니다. The **percentage** of students who walk to school is high.',
      easy: '피자 한 판으로 생각하십시오. 반으로 자르면 한 조각이 **half**, 셋으로 자르면 한 조각이 **one third**, 넷으로 자르면 한 조각이 **a quarter**입니다. 넷으로 자른 것 가운데 세 조각을 먹었다면 three quarter**s**처럼 조각이 여러 개라는 표시(-s)를 붙입니다.\n\n그리고 "피자의 절반이 **남아 있다**"에서 동사는 피자(하나)에 맞추고, "학생들의 절반이 **왔다**"에서 동사는 학생들(여럿)에 맞춘다고 생각하면 됩니다.',
      check: {
        type: 'choice',
        q: '원그래프를 보고 빈칸에 알맞은 말을 고르십시오.\n\n[[blank]] of the students chose soccer.',
        fig: { type: 'pie', labels: ['Soccer', 'Basketball', 'Baseball'], values: [50, 25, 25], title: 'Favorite Sports (가상의 자료, %)' },
        choices: ['Half', 'A quarter', 'One third'],
        answer: 0,
        why: ['', 'a quarter는 4분의 1(25%)입니다. 축구는 50%입니다.', 'one third는 3분의 1(약 33%)입니다. 축구는 50%입니다.'],
        explain: '축구를 고른 학생은 50%, 곧 전체의 절반입니다. 그래서 **Half** of the students chose soccer. 입니다.',
      },
    },
    {
      title: '배수 비교: twice as ~ as, three times + 비교급 + than',
      body: '두 값을 "몇 배"로 견줄 때는 두 가지 틀을 씁니다.\n\n**① 배수 + as + 원급 + as**\n\nClub A has **twice as many** members **as** Club B. (A는 B의 2배)\nThis box is **three times as heavy as** that one. (3배 무거운)\n\n**② 배수 + 비교급 + than**\n\nThis tower is **three times taller than** that building.\nThe new bridge is **four times longer than** the old one.\n\n| 배수 | 영어 |\n|---|---|\n| 2배 | **twice** |\n| 3배, 4배 … | **three times**, **four times** … |\n| 절반 | **half** as ~ as |\n\n- 배수는 언제나 **as나 비교급 앞**에 둡니다. 바른 꼴: **twice as many as** / 틀린 꼴: as twice many as\n- 셀 수 있는 명사의 수는 as **many** ~ as, 셀 수 없는 명사의 양은 as **much** ~ as를 씁니다.\n- 2배는 보통 twice라고 합니다. 절반을 견줄 때 half는 비교급 틀에 쓰지 않고(half taller than X) 원급 틀(**half as ~ as**)로 씁니다.\n\nMy brother reads **half as many** books **as** I do. (내 동생은 나의 절반만큼 읽는다)',
      easy: '배수는 **곱하기 버튼**이라고 생각하십시오. as ~ as(같은 만큼)나 비교급(~보다 더) 앞에 "×2(twice)", "×3(three times)" 버튼을 하나 붙이면 끝입니다.\n\n- 같은 만큼: as tall as\n- 그것의 3배만큼: **three times** as tall as\n\n버튼은 항상 맨 앞에 붙입니다. 가운데에 끼우면(as three times tall as) 고장 납니다.',
      check: {
        type: 'choice',
        q: '막대그래프를 보고 빈칸에 알맞은 말을 고르십시오.\n\nThe Art Club has [[blank]] members as the Music Club.',
        fig: { type: 'bars', labels: ['Art Club', 'Music Club'], values: [30, 10], unit: '명', title: 'Club Members (가상의 자료)' },
        choices: ['three times as many', 'as three times many', 'three times many'],
        answer: 0,
        why: ['', '배수(three times)는 as 앞에 둡니다. as three times many 는 쓰지 않습니다.', '뒤에 as ~ 가 있으므로 앞에도 as가 필요합니다: three times as many ~ as'],
        explain: '미술부 30명은 음악부 10명의 3배입니다. 배수는 as 앞에 두므로 **three times as many** members as 입니다.',
      },
    },
    {
      title: '순위 표현: the second largest, the least, one of the + 최상급',
      body: '도표에서 몇째로 큰지, 가장 작은지를 말할 때 쓰는 표현입니다.\n\n| 표현 | 뜻 |\n|---|---|\n| **the largest** / **the most popular** | 가장 큰 / 가장 인기 있는 |\n| **the second largest** | 둘째로 큰 |\n| **the third most popular** | 셋째로 인기 있는 |\n| **the least popular** | 가장 덜 인기 있는(꼴찌) |\n| **the smallest** | 가장 작은 |\n\n- 몇째인지는 **the + 서수 + 최상급**의 순서로 씁니다. the second largest (O), the largest second (X)\n- **the least**는 the most의 반대말로, 가장 적거나 가장 덜한 것을 뜻합니다.\n\n**one of the + 최상급 + 복수 명사**는 "가장 ~한 것들 가운데 하나"입니다. 여럿 가운데 하나이므로 명사는 **복수**, 주어가 one이므로 동사는 **단수**입니다.\n\n**One of the oldest buildings** in our town **is** the post office.\n\n도표에서는 "1위 다음에 2위가 온다"를 **followed by**로 잇기도 합니다. Walking was the most common way, **followed by** taking the bus.',
      easy: '달리기 시합의 시상대를 떠올리십시오. 1등은 **the fastest**, 2등은 **the second fastest**, 3등은 **the third fastest**, 꼴찌는 **the slowest**입니다. "몇 등"을 나타내는 second, third를 최상급 바로 앞에 끼워 넣기만 하면 됩니다.\n\n"반에서 가장 빠른 학생들 **가운데 한 명**"이라면 빠른 학생이 여럿이니 students(복수), 그중 한 명이니 is(단수)입니다.',
      check: {
        type: 'ox',
        q: 'Jisu is one of the tallest student in her class. 는 어법상 바른 문장이다.',
        answer: false,
        explain: '"one of the + 최상급" 뒤에는 **복수 명사**가 옵니다. 바른 문장은 Jisu is one of the tallest **students** in her class. 입니다.',
      },
    },
    {
      title: '사진·그림 속 위치와 동작 묘사하기',
      body: '사진을 설명할 때는 **어디에(위치)** + **누가·무엇이** + **무엇을 하고 있는지(동작)**를 차례로 말합니다.\n\n**위치 표현**\n\n| 표현 | 뜻 |\n|---|---|\n| **in the foreground** / **in the background** | (사진의) 앞쪽에 / 뒤쪽에 |\n| **on the left** / **on the right** | 왼쪽에 / 오른쪽에 |\n| **in the middle (center) of** ~ | ~의 가운데에 |\n| **at the top** / **at the bottom** | 위쪽에 / 아래쪽에 |\n| **next to** ~ / **behind** ~ / **in front of** ~ | ~ 옆에 / ~ 뒤에 / ~ 앞에 |\n| **between A and B** | A와 B 사이에 |\n\n**동작**은 사진 속에서 지금 일어나는 일이므로 **현재진행형(be + -ing)**으로 씁니다.\n\nIn this picture, I can see a park. **On the left**, a boy **is riding** a bike. **In the middle**, two girls **are sitting** on a bench. **In the background**, there **are** tall trees.\n\n> 💡 "무엇이 있다"는 There is(단수) / There are(복수)로, 사람의 표정이나 느낌은 They **look** happy. 처럼 look + 형용사로 짐작해 말합니다.',
      easy: '사진 묘사는 **친구에게 전화로 사진을 설명하는 놀이**입니다. 친구는 사진을 못 보니 "왼쪽에", "가운데에", "뒤쪽 멀리" 같은 길잡이 말이 꼭 필요합니다.\n\n그리고 사진 속 사람은 멈춰 있는 것처럼 보여도 그 순간 무언가를 **하는 중**입니다. 그래서 "자전거를 **타고 있다**(is riding)"처럼 -ing로 말합니다.',
      check: {
        type: 'choice',
        q: '"사진의 뒤쪽에 산이 보입니다."를 영어로 가장 바르게 옮긴 것은 무엇입니까?',
        choices: ['In the background, I can see mountains.', 'In the foreground, I can see mountains.', 'At the bottom, I can see mountains.'],
        answer: 0,
        why: ['', 'foreground는 사진의 앞쪽(보는 사람에게 가까운 쪽)입니다. 뒤쪽은 background입니다.', 'at the bottom은 사진의 아래쪽입니다. 뒤쪽(멀리)은 background입니다.'],
        explain: '사진의 **뒤쪽(멀리 보이는 곳)**은 **in the background**, 앞쪽은 in the foreground입니다.',
      },
    },
    {
      title: '발표의 짜임과 자료를 가리키는 표현',
      body: '자료를 활용한 짧은 발표는 **도입 → 설명 → 마무리**의 세 부분으로 짭니다.\n\n| 단계 | 하는 일 | 표현 |\n|---|---|---|\n| **도입** | 인사, 주제 밝히기 | Hello, everyone. / Today I\'d like to talk about ~. / I\'m going to show you ~. |\n| **설명** | 자료를 가리키며 내용 말하기 | **As you can see** (in this graph), ~. / This chart shows ~. / Take a look at this picture. / According to the survey, ~. |\n| **마무리** | 요약·결론, 인사 | **In conclusion**, ~. / **To sum up**, ~. / Thank you for listening. / Do you have any questions? |\n\n설명 단계에서는 앞에서 배운 표현을 씁니다. 가장 두드러진 것(1위, 가장 큰 변화)을 먼저 말하고, 나머지를 순서대로 덧붙이면 듣는 사람이 따라가기 쉽습니다.\n\n**As you can see in this graph**, the number of visitors **increased sharply** in May. It was **twice as high as** in April.\n\n> 💡 As you can see ~ 는 "보시다시피"라는 뜻으로, 듣는 사람의 눈을 자료로 이끌어 줍니다. 자료 없이 말만 할 때보다 훨씬 설득력이 있습니다.',
      easy: '발표는 **샌드위치**입니다. 위 빵(도입)에서 "오늘은 이것을 이야기하겠습니다"라고 알려 주고, 속 재료(설명)에서 "보시다시피 이 그래프에서~"라며 자료를 보여 주고, 아래 빵(마무리)에서 "정리하면~, 들어 주셔서 감사합니다"로 닫습니다.\n\n빵 없이 재료만 내밀면 듣는 사람은 무엇에 관한 이야기인지, 언제 끝났는지 알기 어렵습니다.',
      check: {
        type: 'choice',
        q: '발표의 **마무리** 단계에 가장 잘 어울리는 말은 무엇입니까?',
        choices: ['To sum up, most students walk to school.', 'Today I\'d like to talk about how we get to school.', 'Take a look at this graph.'],
        answer: 0,
        why: ['', '주제를 처음 밝히는 말이므로 도입 단계에 어울립니다.', '자료를 가리키는 말이므로 설명 단계에 어울립니다.'],
        explain: '**To sum up**(요약하면)은 내용을 정리하는 마무리 표현입니다. Today I\'d like to talk about ~ 는 도입, Take a look at ~ 는 설명 단계의 표현입니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 꺾은선그래프의 변화를 두 문장으로 설명해 보십시오.',
      fig: { type: 'line', labels: ['Jan', 'Feb', 'Mar', 'Apr'], values: [100, 100, 100, 300], unit: '명', title: 'Visitors to the Science Room (가상의 자료)' },
      steps: [
        '먼저 변화의 방향을 나눕니다. 1월~3월은 100명으로 그대로이고, 3월~4월은 100명에서 300명으로 늘었습니다.',
        '그대로인 구간: The number of visitors **remained steady** from January to March.',
        '늘어난 구간은 크게 늘었으므로 sharply를 붙이고, from A to B로 처음 값과 나중 값을 밝힙니다: It **increased sharply from 100 to 300** in April.',
        '배수로도 말할 수 있습니다. 300명은 100명의 3배이므로 The number in April was **three times as large as** that in March.',
      ],
      answer: 'The number of visitors remained steady from January to March. Then it increased sharply from 100 to 300 in April.',
    },
    {
      q: '다음 발표 원고를 도입·설명·마무리로 나누고, 도표와 맞는지 확인해 보십시오.\n\n' + TALK,
      fig: WAY_FIG,
      steps: [
        '**도입**: Hello, everyone. Today I\'d like to talk about ~ → 인사하고 주제(학생들의 등교 방법)를 밝힙니다.',
        '**설명**: As you can see in this graph, ~ 부터 Only 5 percent ~ 까지 → 자료를 가리키며 1위(걷기)부터 차례로 설명합니다.',
        '도표 확인: 걷기 50% = **half**(맞음), 버스 30%로 둘째(**comes second**, 맞음), 자동차 5%로 가장 적음(**the least common**, 맞음).',
        '**마무리**: In conclusion, ~. Thank you for listening. → 결론을 한 문장으로 정리하고 인사합니다.',
      ],
      answer: '도입(첫 두 문장) – 설명(As you can see ~ the least common way.) – 마무리(In conclusion ~ Thank you for listening.). 설명한 내용은 모두 도표와 일치합니다.',
    },
  ],

  terms: [
    { term: '도표', def: '수량이나 변화를 한눈에 보이게 나타낸 그림입니다. 변화는 꺾은선그래프(line graph), 크기 비교는 막대그래프(bar graph), 전체 가운데 비율은 원그래프(pie chart)로 주로 나타냅니다.' },
    { term: '증가·감소 표현', def: '값이 늘거나 줄거나 그대로임을 나타내는 말입니다. 예: increase, rise / decrease, decline, drop / remain steady' },
    { term: 'from A to B / by', def: 'from A to B는 처음 값 A와 나중 값 B를, by는 두 값의 차이를 나타냅니다. 예: rose from 20 to 50 = rose by 30' },
    { term: '비율 표현', def: '전체 가운데 얼마인지 나타내는 말입니다. 예: 40 percent of ~, half of ~, one third of ~, a quarter of ~, the majority of ~' },
    { term: '배수 표현', def: '두 값을 몇 배로 견주는 말입니다. 배수 + as 원급 as(twice as many as) 또는 배수 + 비교급 + than(three times taller than)으로 씁니다.' },
    { term: '순위 표현', def: '몇째인지 나타내는 말입니다. the + 서수 + 최상급(the second largest), the least(가장 덜 ~한), one of the + 최상급 + 복수 명사' },
    { term: '위치 표현', def: '사진·그림에서 어디에 있는지 나타내는 말입니다. 예: in the foreground(앞쪽에), in the background(뒤쪽에), on the left, in the middle, next to, behind' },
    { term: '발표의 짜임', def: '발표를 도입(주제 밝히기) – 설명(자료를 가리키며 내용 말하기) – 마무리(요약·인사)의 세 부분으로 짜는 것입니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '밑줄 친 낱말과 뜻이 가장 가까운 것은 무엇입니까?\n\nThe number of bookstores in the city __declined__ over the past ten years.',
      choices: ['decreased', 'increased', 'remained', 'doubled'],
      answer: 0,
      why: ['', 'increase는 "늘다"로, decline(줄다)과 반대입니다.', 'remain은 "그대로이다"입니다. decline은 값이 줄었다는 뜻입니다.', 'double은 "두 배가 되다"로, 늘어난 것입니다.'],
      explain: '**decline**은 "줄어들다, 감소하다"로 **decrease**와 뜻이 가장 가깝습니다. 지난 10년 동안 서점 수가 줄었다는 문장입니다.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '그래프를 보고 빈칸에 알맞은 한 낱말을 쓰십시오. (s로 시작하는 형용사)\n\nThe price of milk remained [[blank]] from January to April.',
      fig: { type: 'line', labels: ['Jan', 'Feb', 'Mar', 'Apr'], values: [2500, 2500, 2500, 2500], unit: '원', title: 'Price of Milk (가상의 자료)' },
      answer: ['steady', 'stable', 'static'],
      wrong: [
        { a: 'steadily', why: 'remain 뒤에는 상태를 나타내는 형용사가 옵니다. 부사 steadily가 아니라 형용사 steady를 씁니다.' },
        { a: 'same', why: '"그대로였다"를 same으로 쓰려면 remained the same처럼 the가 필요합니다. 여기서는 s로 시작하는 한 낱말 steady(또는 stable)를 씁니다.' },
      ],
      explain: '네 달 내내 2,500원으로 변하지 않았으므로 **remained steady**(또는 remained stable, remained static)입니다. remain 뒤에는 형용사가 옵니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '"3분의 2"를 영어로 바르게 나타낸 것은 무엇입니까?',
      choices: ['two thirds', 'two third', 'second three', 'three seconds'],
      answer: 0,
      why: ['', '분자가 2 이상이면 분모(서수)에 -s를 붙입니다: two thirds', '분자는 기수(two), 분모는 서수(third)로 읽습니다. 순서가 반대입니다.', '분자는 기수, 분모는 서수입니다. 3분의 2는 분자가 2, 분모가 3입니다.'],
      explain: '분수는 **분자를 기수**(two), **분모를 서수**(third)로 읽고, 분자가 2 이상이면 분모에 -s를 붙입니다. 그래서 3분의 2는 **two thirds**입니다.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: 'Thirty percent of the milk are sold in the morning. 은 어법상 바른 문장이다.',
      answer: false,
      explain: 'percent of 뒤 명사에 동사의 수를 맞춥니다. milk는 셀 수 없는 명사이므로 단수 동사 is를 씁니다. 바른 문장은 Thirty percent of the milk **is** sold in the morning. 입니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '막대그래프를 보고 빈칸에 알맞은 말을 고르십시오.\n\nThe new building is [[blank]] than the old one.',
      fig: { type: 'bars', labels: ['Old Building', 'New Building'], values: [20, 60], unit: 'm', title: 'Height (가상의 자료)' },
      choices: ['three times taller', 'taller three times', 'three times as tall', 'three times tallest'],
      answer: 0,
      why: ['', '배수는 비교급 앞에 둡니다: three times taller', '뒤에 than이 있으므로 비교급(taller)을 씁니다. as tall 뒤에는 than이 아니라 as가 옵니다.', '뒤에 than이 있으므로 최상급이 아니라 비교급(taller)을 씁니다.'],
      explain: '새 건물 60 m는 옛 건물 20 m의 3배입니다. 뒤에 than이 있으므로 **배수 + 비교급 + than**: **three times taller** than 입니다.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 한 낱말을 쓰십시오.\n\nMy bag is twice as heavy [[blank]] yours.',
      answer: ['as'],
      wrong: [{ a: 'than', why: '앞에 as heavy(원급)가 있으므로 뒤에도 as를 씁니다. than은 비교급(heavier) 뒤에 씁니다.' }],
      explain: '**twice as heavy as** ~ 는 "~보다 두 배 무거운"입니다. as 원급 as 틀이므로 빈칸에는 **as**가 들어갑니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '막대그래프를 보고 빈칸에 알맞은 말을 고르십시오.\n\nBasketball was the [[blank]] popular sport.',
      fig: { type: 'bars', labels: ['Soccer', 'Basketball', 'Baseball', 'Badminton', 'Volleyball'], values: [35, 25, 20, 12, 8], unit: '%', title: 'Favorite Sports (가상의 자료)' },
      choices: ['second most', 'most second', 'second more', 'two most'],
      answer: 0,
      why: ['', '서수(second)는 최상급(most) 앞에 둡니다: the second most popular', '"둘째로 가장 ~한"은 최상급(most)을 씁니다. more는 비교급입니다.', '순위는 기수(two)가 아니라 서수(second)로 나타냅니다.'],
      explain: '농구(25%)는 축구(35%) 다음으로 둘째입니다. 순위는 **the + 서수 + 최상급**이므로 the **second most** popular sport입니다.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 4,
      q: '다음 설명에 맞는 영어 문장은 무엇입니까?\n\n(사진 설명) 사진의 가운데에서 두 아이가 책을 읽고 있다.',
      choices: [
        'In the middle, two children are reading books.',
        'In the middle, two children is reading books.',
        'On the left, two children are reading books.',
        'In the background, two children are reading books.',
      ],
      answer: 0,
      why: ['', '주어 two children은 복수이므로 is가 아니라 are를 씁니다.', 'on the left는 "왼쪽에"입니다. 사진의 가운데는 in the middle입니다.', 'in the background는 "뒤쪽에"입니다. 사진의 가운데는 in the middle입니다.'],
      explain: '가운데는 **in the middle**, 지금 하고 있는 동작은 현재진행형, 주어가 복수(two children)이므로 **are reading**입니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 0,
      q: '그래프의 내용과 일치하는 것은 무엇입니까?',
      fig: { type: 'line', labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], values: [200, 220, 240, 480, 470], unit: '명', title: 'Visitors to the Town Museum (가상의 자료)' },
      choices: [
        'The number of visitors increased sharply from March to April.',
        'The number of visitors decreased sharply from April to May.',
        'The number of visitors remained steady from January to March.',
        'The number of visitors was the highest in May.',
      ],
      answer: 0,
      why: [
        '',
        '4월 480명에서 5월 470명으로 10명 줄었습니다. 조금 줄었으므로 sharply가 아니라 slightly입니다.',
        '1월 200명 → 2월 220명 → 3월 240명으로 조금씩 늘었습니다. 그대로가 아닙니다.',
        '가장 많은 달은 480명인 4월입니다. 5월은 470명입니다.',
      ],
      hint: '구간마다 값이 늘었는지 줄었는지, 얼마나 변했는지 먼저 적어 보십시오.',
      explain: '3월 240명에서 4월 480명으로 2배가 되었으므로 **increased sharply**(급격히 늘었다)가 맞습니다. 4월→5월은 조금 줄었고(decreased slightly), 1월→3월은 서서히 늘었으며(increased gradually), 가장 많은 달은 4월입니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말을 고르십시오.\n\nThis stone bridge is one of the [[blank]] in our town.',
      choices: ['oldest bridges', 'oldest bridge', 'older bridges', 'old bridges'],
      answer: 0,
      why: ['', '"가장 ~한 것들 가운데 하나"이므로 명사는 복수(bridges)입니다.', 'one of the 뒤에는 비교급이 아니라 최상급(oldest)이 옵니다.', 'one of the 뒤에는 최상급(oldest)이 옵니다. 원급 old는 "가장 오래된"이라는 뜻이 되지 않습니다.'],
      hint: 'one of the 뒤에 오는 형용사와 명사의 꼴을 생각해 보십시오.',
      explain: '**one of the + 최상급 + 복수 명사**: one of the **oldest bridges**(가장 오래된 다리들 가운데 하나)입니다.',
    },
    {
      id: 'p11', level: 2, type: 'order', concept: 5,
      q: '발표의 짜임(도입-설명-마무리)에 맞게 문장을 놓으십시오.',
      choices: [
        'Hello, everyone. Today I\'d like to talk about our favorite snacks.',
        'As you can see in this chart, fruit is the most popular snack.',
        'Cookies come second, followed by chips.',
        'To sum up, many of us like healthy snacks. Thank you for listening.',
      ],
      answer: [0, 1, 2, 3],
      hint: '주제를 밝히는 문장, 자료를 가리키는 문장, 정리하는 문장을 찾으십시오.',
      explain: '**도입**(인사·주제: Today I\'d like to talk about ~) → **설명**(As you can see in this chart로 1위부터, 이어서 2위·3위: followed by) → **마무리**(To sum up ~. Thank you for listening.)의 순서입니다.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'text', concept: 0,
      q: '판매량이 40개에서 70개로 늘었습니다. 빈칸에 알맞은 한 낱말을 쓰십시오.\n\nSales rose [[blank]] 30 units.',
      answer: ['by'],
      wrong: [{ a: 'to', why: 'rose to 30 units라고 하면 나중 값이 30개라는 뜻이 됩니다. 늘어난 양(차이)은 by로 나타냅니다.' }],
      hint: '30은 나중 값이 아니라 늘어난 양입니다.',
      explain: '40개에서 70개로 **30개만큼** 늘었으므로 차이를 나타내는 **by**를 씁니다. 나중 값을 말할 때는 rose to 70 units, 처음과 나중을 함께 말할 때는 rose from 40 to 70 units입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 2,
      q: '그래프의 내용과 일치하지 **않는** 것은 무엇입니까?',
      fig: { type: 'bars', labels: ['Minsu', 'Jiwoo', 'Hayun', 'Seojun'], values: [4, 8, 12, 2], unit: '권', title: 'Books Read in May (가상의 자료)' },
      choices: [
        'Jiwoo read twice as many books as Minsu.',
        'Hayun read three times as many books as Minsu.',
        'Seojun read half as many books as Minsu.',
        'Hayun read twice as many books as Jiwoo.',
      ],
      answer: 3,
      why: [
        '지우 8권은 민수 4권의 2배이므로 일치합니다.',
        '하윤 12권은 민수 4권의 3배이므로 일치합니다.',
        '서준 2권은 민수 4권의 절반이므로 일치합니다.',
        '',
      ],
      hint: '문장마다 두 사람의 값을 그래프에서 찾아 몇 배인지 나눗셈으로 확인하십시오.',
      explain: '하윤은 12권, 지우는 8권이므로 하윤은 지우의 1.5배입니다. 2배(twice)가 아니므로 **Hayun read twice as many books as Jiwoo.**가 일치하지 않습니다. 나머지는 8 = 4×2, 12 = 4×3, 2 = 4의 절반으로 모두 맞습니다.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 1,
      q: '학생 30명 가운데 10명이 걸어서 등교합니다. 빈칸에 알맞은 분수 표현(두 낱말)을 쓰십시오.\n\n[[blank]] of the 30 students walk to school.',
      answer: ['one third', 'one-third', 'a third'],
      wrong: [
        { a: 'one three', why: '분모는 서수로 읽습니다. 3분의 1은 one third입니다.' },
        { a: 'a quarter', why: 'a quarter는 4분의 1입니다. 30명 가운데 10명은 3분의 1입니다.' },
        { a: 'one tenth', why: '10명을 분모로 읽었습니다. 30명 가운데 10명은 10/30, 곧 3분의 1입니다.' },
      ],
      hint: '먼저 10/30을 가장 간단한 분수로 줄여 보십시오.',
      explain: '30명 가운데 10명은 10/30 = 1/3입니다. 분자는 기수(one), 분모는 서수(third)로 읽어 **One third**(또는 A third) of the 30 students walk to school. 입니다. of 뒤가 students(복수)이므로 동사도 walk(복수)입니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 0,
      q: '공책 한 권의 값이 2,000원에서 2,500원으로 올랐습니다. 이 변화를 바르게 나타내지 **못한** 것은 무엇입니까?',
      choices: [
        'The price rose by 500 won.',
        'The price rose from 2,000 won to 2,500 won.',
        'The price increased by 500 won.',
        'The price rose to 500 won.',
      ],
      answer: 3,
      why: [
        '오른 양(차이) 500원을 by로 바르게 나타냈습니다.',
        '처음 값과 나중 값을 from A to B로 바르게 나타냈습니다.',
        'increase도 "늘다, 오르다"이고 차이를 by로 바르게 나타냈습니다.',
        '',
      ],
      hint: 'to 뒤에는 나중 값, by 뒤에는 차이가 옵니다.',
      explain: 'rose **to** 500 won이라고 하면 값이 500원**으로** 올랐다는 뜻이 되어 사실과 다릅니다. 오른 양 500원은 **by**로, 나중 값 2,500원은 **to**로 나타냅니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      q: '원그래프의 내용과 일치하지 **않는** 것은 무엇입니까?',
      fig: { type: 'pie', labels: ['Spring', 'Summer', 'Fall', 'Winter'], values: [40, 25, 20, 15], title: 'Favorite Seasons (가상의 자료, %)' },
      choices: [
        'Spring was the most popular season, at 40 percent.',
        'Summer was the second most popular season.',
        'Winter was the least popular season.',
        'Fall was chosen by a quarter of the students.',
      ],
      answer: 3,
      why: [
        '봄이 40%로 가장 많으므로 일치합니다.',
        '여름이 25%로 둘째이므로 일치합니다.',
        '겨울이 15%로 가장 적으므로 일치합니다.',
        '',
      ],
      hint: 'a quarter가 몇 퍼센트인지 먼저 떠올려 보십시오.',
      explain: 'a quarter는 4분의 1, 곧 **25%**입니다. 가을은 20%이므로 일치하지 않습니다. 25%인 것은 여름입니다. 나머지 문장은 순위 표현(the most, the second most, the least)이 모두 그래프와 맞습니다.',
    },
    {
      id: 'a5', level: 3, type: 'order', concept: 2,
      q: '"이 탑은 저 건물보다 세 배 더 높다."가 되도록 낱말 묶음을 놓으십시오.',
      choices: ['This tower', 'is', 'three times', 'taller', 'than that building'],
      answer: [0, 1, 2, 3, 4],
      hint: '배수는 비교급 바로 앞에 둡니다.',
      explain: '주어(This tower) + 동사(is) + **배수(three times) + 비교급(taller) + than** ~ 의 순서입니다. This tower is three times taller than that building.',
    },
  ],

  deeper: [
    {
      title: '퍼센트와 퍼센트포인트는 다르다',
      body: '어떤 반에서 안경을 쓴 학생의 비율이 20%에서 30%로 늘었다고 합시다. 이 변화를 말하는 방법은 두 가지입니다.\n\n- 비율 자체의 차이: 30 − 20 = 10이므로 **10 percentage points** 늘었습니다.\n- 처음 값에 견준 변화율: 10은 20의 절반이므로 **50 percent** 늘었습니다.\n\n두 말은 모두 맞지만 뜻이 다릅니다. 뉴스나 보고서에서 "10% 늘었다"와 "10%포인트 늘었다"를 섞어 쓰면 듣는 사람이 크게 오해할 수 있습니다. 도표를 설명할 때는 무엇을 기준으로 한 변화인지 분명히 밝히는 습관이 중요합니다.',
    },
    {
      title: '자료에 맞는 그래프 고르기',
      body: '발표 자료를 만들 때는 보여 주고 싶은 것에 맞는 그래프를 고릅니다.\n\n| 보여 주고 싶은 것 | 알맞은 그래프 | 자주 쓰는 표현 |\n|---|---|---|\n| 시간에 따른 **변화** | 꺾은선그래프 (line graph) | increase, decline, remain steady |\n| 항목끼리 **크기 비교** | 막대그래프 (bar graph) | twice as ~ as, the second largest |\n| 전체 가운데 **비율** | 원그래프 (pie chart) | half, one third, 40 percent |\n\n그래프에는 제목, 단위, 조사 대상과 시기를 함께 적어야 듣는 사람이 숫자를 바르게 이해합니다. 공통영어2에서는 이런 매체 자료가 믿을 만한지 따져 읽는 법을 더 배웁니다.',
    },
  ],

  faq: [
    {
      q: '2배를 two times라고 하면 틀려요?',
      a: '틀린 말은 아니지만, 2배는 보통 **twice**라고 합니다. 3배부터는 three times, four times처럼 times를 씁니다. 시험이나 글쓰기에서는 twice as ~ as를 쓰는 것이 가장 자연스럽습니다.',
    },
    {
      q: 'rise랑 raise는 뭐가 달라요?',
      a: '**rise**(rose–risen)는 "오르다"로 목적어 없이 씁니다: Prices **rose**. **raise**(raised–raised)는 "올리다"로 목적어가 필요합니다: The company **raised** its prices. 도표에서 값이 스스로 오른 것을 말할 때는 rise나 increase를 씁니다.',
    },
    {
      q: 'percent 뒤의 동사는 단수예요, 복수예요?',
      a: 'percent 자체가 아니라 **of 뒤의 명사**에 맞춥니다. 20 percent of the students **are** ~(복수), 20 percent of the money **is** ~(셀 수 없는 명사 → 단수). half, two thirds, the majority of도 마찬가지입니다.',
    },
    {
      q: 'foreground랑 background가 자꾸 헷갈려요.',
      a: '사진을 찍는 사람 쪽에서 생각하십시오. **fore-**는 "앞"(forehead 이마, forecast 예보)이라서 foreground는 카메라에 가까운 앞쪽, **back**ground는 멀리 뒤쪽입니다. 인물 사진에서 사람은 보통 foreground에, 하늘이나 산은 background에 있습니다.',
    },
  ],

  mistakes: [
    'Prices raised. 처럼 raise를 "오르다"로 쓰는 실수 — 값이 스스로 오를 때는 rise(rose) 또는 increase를 씁니다.',
    'as three times tall as 처럼 배수를 가운데에 넣는 실수 — 배수는 맨 앞에: three times as tall as / three times taller than.',
    'one of the best player 처럼 명사를 단수로 쓰는 실수 — one of the + 최상급 + 복수 명사(players), 동사는 단수(is)입니다.',
  ],

  gens: [
    {
      id: 'trend-verb',
      level: 1,
      title: '꺾은선그래프의 변화 방향 말하기',
      make: function (R) {
        var subjects = [
          { s: 'The number of visitors to the museum', unit: '명' },
          { s: 'The number of students in the robot club', unit: '명' },
          { s: 'The number of books borrowed from the library', unit: '권' },
          { s: 'The number of trees in the park', unit: '그루' },
          { s: 'The number of bikes at the station', unit: '대' },
          { s: 'The number of letters sent to the radio show', unit: '통' },
        ];
        var sub = R.pick(subjects);
        var y0 = R.int(2012, 2021);
        var kind = R.pick(['up', 'down', 'flat']);
        var v0 = R.int(4, 9) * 10;
        var d1 = R.int(1, 3) * 10;
        var d2 = R.int(1, 3) * 10;
        var values;
        if (kind === 'up') values = [v0, v0 + d1, v0 + d1 + d2];
        else if (kind === 'down') values = [v0 + d1 + d2, v0 + d2, v0];
        else values = [v0, v0, v0];
        var words = { up: 'increased', down: 'decreased', flat: 'remained steady' };
        var gloss = { increased: '늘었다', decreased: '줄었다', 'remained steady': '변함없이 유지되었다' };
        var actual = { up: '그래프의 값은 늘었습니다.', down: '그래프의 값은 줄었습니다.', flat: '그래프의 값은 세 해 모두 같습니다.' };
        var reason = {
          increased: '값이 늘 때 쓰는 말(increased)을 골랐습니다. ' + actual[kind],
          decreased: '값이 줄 때 쓰는 말(decreased)을 골랐습니다. ' + actual[kind],
          'remained steady': '값이 그대로일 때 쓰는 말(remained steady)을 골랐습니다. ' + actual[kind],
        };
        var correct = words[kind];
        var pick = R.choices(correct, R.shuffle(['increased', 'decreased', 'remained steady']), 3);
        var u = R.josa(sub.unit, '으로/로');
        var desc = kind === 'flat'
          ? '세 해 모두 ' + v0 + sub.unit + u + ' 같습니다.'
          : values[0] + sub.unit + '에서 ' + values[2] + sub.unit + u + ' ' + (kind === 'up' ? '늘었습니다.' : '줄었습니다.');
        return {
          type: 'choice', concept: 0,
          q: '꺾은선그래프를 보고 빈칸에 알맞은 말을 고르십시오.\n\n' + sub.s + ' [[blank]] from ' + y0 + ' to ' + (y0 + 2) + '.',
          fig: { type: 'line', labels: [String(y0), String(y0 + 1), String(y0 + 2)], values: values, unit: sub.unit, title: '가상의 자료' },
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: y0 + '년부터 ' + (y0 + 2) + '년까지 ' + desc + ' 그래서 답은 **' + correct + '**(' + gloss[correct] + ')입니다.',
        };
      },
    },
    {
      id: 'rank-bars',
      level: 1,
      title: '막대그래프에서 순위 표현 읽기',
      make: function (R) {
        var sports = R.sample(['Soccer', 'Basketball', 'Baseball', 'Badminton', 'Volleyball', 'Table Tennis', 'Swimming'], 4);
        var vals = R.sample([6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], 4);
        var order = sports.map(function (s, i) { return i; }).sort(function (a, b) { return vals[b] - vals[a]; });
        var rankOf = {};
        order.forEach(function (idx, r) { rankOf[sports[idx]] = r; });
        var ranks = [
          { en: 'the most popular', ko: '가장 인기 있는' },
          { en: 'the second most popular', ko: '둘째로 인기 있는' },
          { en: 'the third most popular', ko: '셋째로 인기 있는' },
          { en: 'the least popular', ko: '가장 인기가 적은' },
        ];
        var target = R.int(0, 3);
        var correct = sports[order[target]];
        var pick = R.choices(correct, R.shuffle(sports.filter(function (s) { return s !== correct; })));
        return {
          type: 'choice', concept: 3,
          q: '막대그래프는 학생들이 좋아하는 운동을 조사한 가상의 자료입니다. 빈칸에 알맞은 것을 고르십시오.\n\n[[blank]] was **' + ranks[target].en + '** sport.',
          fig: { type: 'bars', labels: sports, values: vals, unit: '명', title: 'Favorite Sports (가상의 자료)' },
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            if (c === correct) return '';
            var r = rankOf[c];
            return c + ' (' + vals[sports.indexOf(c)] + '명) — ' + ranks[r].ko + ' 운동입니다. 문제는 ' + ranks[target].ko + ' 운동을 묻습니다.';
          }),
          explain: '많은 순서로 놓으면 ' + order.map(function (i) { return sports[i] + '(' + vals[i] + '명)'; }).join(' > ') + '입니다. ' + ranks[target].en + '(' + ranks[target].ko + ')' + ' 운동은 **' + correct + '**입니다.',
        };
      },
    },
    {
      id: 'times-as-many',
      level: 2,
      title: '막대그래프를 보고 배수 표현 고르기',
      make: function (R) {
        var clubs = R.sample(['Art Club', 'Music Club', 'Science Club', 'Dance Club', 'Book Club', 'Drama Club'], 2);
        var big = clubs[0], small = clubs[1];
        var a = R.int(5, 15);
        var k = R.pick([2, 3, 4]);
        var b = a * k;
        var word = { 2: 'twice', 3: 'three times', 4: 'four times' };
        var correct = word[k] + ' as many';
        var reason = {};
        var wrongs = [];
        [2, 3, 4].forEach(function (m) {
          if (m === k) return;
          var w = word[m] + ' as many';
          wrongs.push(w);
          reason[w] = m + '배를 나타내는 말(' + word[m] + ')을 골랐습니다. ' + b + '명은 ' + a + '명의 ' + k + '배입니다.';
        });
        var half = 'half as many';
        reason[half] = '"절반만큼"이라는 말(half as many)을 골랐습니다. 부원이 더 많은 쪽은 ' + big + ' 쪽입니다.';
        var bad = 'as ' + word[k] + ' many';
        reason[bad] = '배수는 as 앞에 둡니다: ' + word[k] + ' as many ~ as';
        var pick = R.choices(correct, R.shuffle(wrongs.concat([half, bad])));
        var labels = R.bool() ? [big, small] : [small, big];
        var values = labels[0] === big ? [b, a] : [a, b];
        return {
          type: 'choice', concept: 2,
          q: '막대그래프를 보고 빈칸에 알맞은 말을 고르십시오.\n\nThe ' + big + ' has [[blank]] members as the ' + small + '.',
          fig: { type: 'bars', labels: labels, values: values, unit: '명', title: 'Club Members (가상의 자료)' },
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: big + ' ' + b + '명은 ' + small + ' ' + a + '명의 ' + k + '배(' + b + ' ÷ ' + a + ' = ' + k + ')입니다. 배수는 as 앞에 두므로 **' + correct + '** members as 입니다.',
        };
      },
    },
  ],

  vocab: [
    { w: 'increase', m: '늘다, 증가하다; 증가', ex: 'The number of cyclists increased last year.', exm: '작년에 자전거 타는 사람의 수가 늘었다.' },
    { w: 'decline', m: '줄어들다, 감소하다; 감소', ex: 'Sales of paper maps have declined.', exm: '종이 지도의 판매량이 줄어들었다.' },
    { w: 'remain', m: '(어떤 상태로) 남아 있다, 계속 ~이다', ex: 'The price remained the same for a year.', exm: '가격은 1년 동안 그대로였다.' },
    { w: 'steady', m: '꾸준한, 변함없는', ex: 'The temperature stayed steady all day.', exm: '기온은 하루 종일 변함없었다.' },
    { w: 'sharply', m: '급격히, 크게', ex: 'The number of visitors rose sharply in August.', exm: '8월에 방문객 수가 급격히 늘었다.' },
    { w: 'gradually', m: '서서히, 점차', ex: 'The ice gradually melted in the sun.', exm: '얼음이 햇볕에 서서히 녹았다.' },
    { w: 'slightly', m: '약간, 조금', ex: 'The test scores dropped slightly this term.', exm: '이번 학기에 시험 점수가 약간 떨어졌다.' },
    { w: 'percentage', m: '비율, 백분율', ex: 'A high percentage of the students joined a club.', exm: '학생들 가운데 높은 비율이 동아리에 가입했다.' },
    { w: 'majority', m: '대다수, 과반수', ex: 'The majority of the class voted for the picnic.', exm: '반의 대다수가 소풍에 찬성했다.' },
    { w: 'quarter', m: '4분의 1', ex: 'A quarter of the cake is left.', exm: '케이크의 4분의 1이 남아 있다.' },
    { w: 'twice', m: '두 배; 두 번', ex: 'This room is twice as large as mine.', exm: '이 방은 내 방의 두 배만큼 넓다.' },
    { w: 'least', m: '가장 적은, 가장 덜', ex: 'Winter was the least popular season.', exm: '겨울이 가장 인기 없는 계절이었다.' },
    { w: 'rank', m: '(순위를) 차지하다; 순위', ex: 'Our team ranked second in the contest.', exm: '우리 팀은 대회에서 2위를 차지했다.' },
    { w: 'foreground', m: '(그림·사진의) 앞쪽, 전경', ex: 'There is a small dog in the foreground.', exm: '앞쪽에 작은 개 한 마리가 있다.' },
    { w: 'background', m: '(그림·사진의) 뒤쪽, 배경', ex: 'You can see a lake in the background.', exm: '뒤쪽에 호수가 보인다.' },
    { w: 'presentation', m: '발표', ex: 'I gave a short presentation about recycling.', exm: '나는 재활용에 관해 짧은 발표를 했다.' },
    { w: 'chart', m: '도표, 그래프', ex: 'This chart shows our favorite fruits.', exm: '이 도표는 우리가 좋아하는 과일을 보여 준다.' },
    { w: 'conclusion', m: '결론', ex: 'In conclusion, we need more bike lanes.', exm: '결론적으로, 우리에게는 자전거 도로가 더 필요하다.' },
  ],
});
})();
