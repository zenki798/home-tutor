/* 영어Ⅱ · 논리적으로 설득하기
 * 예문·지문은 모두 직접 쓴 글이다(가상의 학교·가상의 조사 수치). */
(function () {
  // 짧은 글: 설득하는 글 (직접 쓴 글, 수치는 가상의 학교 설문)
  var ESSAY = 'Our school library should stay open until 8 p.m. on weekdays. ' +
    'First, many students have no quiet place to study at home. In a survey of 200 students at our school, 64 percent said that their homes were too noisy for studying. ' +
    'Second, longer hours would help students who join club activities after class. Right now, the library closes at 5 p.m., so these students can hardly ever use it. ' +
    'Admittedly, keeping the library open longer will cost the school more money. However, trained student volunteers could help the librarian in the evening, which would keep the extra cost low. ' +
    'For these reasons, longer library hours are a small change that would make a big difference for students.';

  // 생성기 1: 근거의 종류 [문장, 종류]
  var EVIDENCE = [
    ['In a survey of 500 teenagers, 7 out of 10 said they sleep less than seven hours on school nights.', 'stat'],
    ['Last year, 1,200 students in our city rode bikes to school, twice as many as five years earlier.', 'stat'],
    ['About 40 percent of the food served in our cafeteria last month was thrown away.', 'stat'],
    ['Three out of four students in our survey said they would use a water refill station.', 'stat'],
    ['Last year, a school in a nearby city started a book swap day, and many of its students began visiting the library again.', 'example'],
    ['When our class turned off the lights during lunch, the room stayed bright enough and no one complained.', 'example'],
    ['My cousin started walking to school, and after a few months she felt much more energetic.', 'example'],
    ['One student at our school found a part-time job through the career program and later became a nurse.', 'example'],
    ['According to a doctor who studies teenage sleep, teenagers need eight to ten hours of sleep a night.', 'expert'],
    ['A professor of nutrition explains that skipping breakfast can make it harder for students to focus.', 'expert'],
    ['Many environmental scientists say that planting trees in cities can lower summer temperatures.', 'expert'],
    ['A traffic engineer told our town council that wider sidewalks make streets safer for children.', 'expert'],
    ['I just feel that school uniforms are boring.', 'feeling'],
    ['Homework is annoying, and I personally hate it.', 'feeling'],
    ['In my opinion, longer breaks would simply be more fun.', 'feeling'],
    ['I really love the smell of new books, so the library should buy more.', 'feeling'],
  ];
  var EV_NAME = { stat: '통계', example: '사례', expert: '전문가 의견', feeling: '개인의 느낌(근거로 약함)' };
  var EV_HINT = {
    stat: '수치(percent, 7 out of 10, 몇 배)로 많은 대상의 경향을 보여 줍니다.',
    example: '실제로 있었던 구체적인 한 사건이나 경험을 보여 줍니다.',
    expert: 'According to ~, a doctor, a professor, scientists처럼 그 분야를 연구하는 사람의 말을 빌립니다.',
    feeling: 'I feel, I hate, In my opinion처럼 글쓴이 자신의 기분만 말할 뿐, 다른 사람이 확인할 수 있는 자료가 없습니다.',
  };

  // 생성기 2: 논리적 오류 [문장, 종류]
  var REASONING = [
    ['I tried two apps made by that company, and both were slow. All of its apps must be slow.', 'hasty'],
    ['My two friends did not enjoy the new movie, so nobody will like it.', 'hasty'],
    ['I asked three people in my class, and they all like summer best. Clearly, summer is everyone\'s favorite season.', 'hasty'],
    ['The first episode of the new drama was boring, so the whole series is a waste of time.', 'hasty'],
    ['The two songs I heard by that band were very loud, so all of their songs must be loud.', 'hasty'],
    ['I wore my blue socks, and our team won the game. These socks must bring us luck.', 'cause'],
    ['After the school painted the classroom walls green, test scores went up. The green walls made students smarter.', 'cause'],
    ['Ice cream sales and swimming accidents both rise in summer, so eating ice cream causes swimming accidents.', 'cause'],
    ['It rained right after I washed my bike. Washing my bike makes it rain.', 'cause'],
    ['Our town opened a new mall last year, and more people caught colds this winter. The mall caused the colds.', 'cause'],
    ['In a survey of 2,000 students from 40 schools, most said they sleep too little. Many students may need more sleep.', 'none'],
    ['Several large studies have found that regular exercise is linked to better sleep, so exercise may help some people sleep well.', 'none'],
    ['Weather records from the past ten years show that our town gets the most rain in July, so July is usually a rainy month here.', 'none'],
    ['Our town compared accident records from 30 streets over five years. Streets with bike lanes had fewer accidents, though other factors may also matter.', 'none'],
  ];
  var RS_NAME = { hasty: '성급한 일반화', cause: '잘못된 인과 관계', none: '뚜렷한 오류 없음' };
  var RS_HINT = {
    hasty: '겨우 몇 개의 사례만 보고 전체(all, every, everyone, nobody, the whole)에 대해 단정했습니다. 사례가 너무 적어 전체를 대표하지 못합니다.',
    cause: '두 일이 잇따라(또는 함께) 일어났다는 것만으로 하나가 다른 하나의 원인이라고 단정했습니다. 우연이거나 숨은 다른 원인이 있을 수 있습니다.',
    none: '많은 사람·여러 곳·여러 해의 자료를 바탕으로 하고, may, usually, linked to처럼 결론을 자료만큼만 말했습니다. 뚜렷한 오류가 보이지 않습니다.',
  };

Tutor.registerUnit({
  id: 'eng-h-e2-09',
  course: 'eng-h-e2',
  title: '논리적으로 설득하기',
  summary: '주장·근거·반론 반박·결론으로 이어지는 설득하는 글의 짜임을 익히고, 알맞은 근거를 고르며 논리적 오류를 피하고, 상대를 존중하면서 주장하는 표현을 배웁니다.',
  goals: [
    '설득하는 글을 주장-근거-반론 반박-결론의 짜임으로 구성할 수 있다.',
    '주장에 알맞은 근거(통계·사례·전문가 의견)를 고르고 그 종류를 구별할 수 있다.',
    '양보 표현(Admittedly, ~, but ~)으로 반론을 인정한 뒤 다시 반박할 수 있다.',
    '성급한 일반화와 잘못된 인과 관계를 알아보고, 상대를 존중하는 표현으로 주장할 수 있다.',
  ],
  standards: ['[12영Ⅱ-02-03]', '[12영Ⅱ-02-05]'],

  concepts: [
    {
      title: '설득하는 글의 짜임',
      body: '설득하는 글(persuasive writing)은 읽는 사람이 내 입장을 받아들이도록 **이유와 자료를 차례대로 쌓는** 글입니다. 영어 설득문은 대개 다음 네 단계로 짜입니다.\n\n' +
        '| 단계 | 하는 일 | 자주 쓰는 표현 |\n|---|---|---|\n' +
        '| 주장(claim) | 글 전체에서 지키려는 입장을 한 문장으로 밝힘 | I strongly believe that ~ / ~ should ~ |\n' +
        '| 근거(reasons and evidence) | 왜 그런지 이유를 대고 자료로 뒷받침함 | First, ~ / Second, ~ / Moreover, ~ / For example, ~ |\n' +
        '| 반론과 반박 | 예상되는 반대 의견을 인정하고 다시 반박함 | Admittedly, ~, but ~ / Some may argue that ~. However, ~ |\n' +
        '| 결론 | 주장을 다시 강조하고 행동을 권함 | For these reasons, ~ / In conclusion, ~ |\n\n' +
        '주장은 **사실(fact)이 아니라 의견**입니다. "도서관은 오후 5시에 닫는다(The library closes at 5 p.m.)"는 확인할 수 있는 사실이고, "도서관은 더 늦게까지 열어야 한다(The library **should** stay open later.)"는 사람마다 생각이 다를 수 있는 주장입니다. should, must, need to 같은 말이 주장 문장에 자주 쓰입니다.\n\n' +
        '> 💡 주장 문장은 글의 첫 문단에 분명하게 둡니다. 읽는 사람은 무엇을 설득하려는지 먼저 알아야 뒤의 근거를 그 주장과 이어서 읽을 수 있습니다.',
      easy: '설득하는 글을 재판의 변론이라고 생각해 보십시오.\n\n' +
        '1. "피고는 무죄입니다." — 먼저 결론처럼 입장을 밝힙니다(주장).\n' +
        '2. "그 시간에 다른 곳에 있었다는 영상이 있습니다." — 증거를 내놓습니다(근거).\n' +
        '3. "검사 측은 지문을 말하지만, 그 지문은 전날 묻은 것입니다." — 상대가 내놓을 말을 먼저 꺼내 받아칩니다(반론과 반박).\n' +
        '4. "그러므로 무죄입니다." — 다시 한 번 정리합니다(결론).',
      check: {
        type: 'choice',
        q: '다음 중 설득하는 글의 **주장(claim)**이 될 수 있는 문장은 무엇입니까?',
        choices: [
          'Our school should start a recycling club.',
          'Our school has about 800 students and 30 teachers.',
          'The cafeteria opens at noon and closes at 1:30 p.m.',
        ],
        answer: 0,
        why: ['', '학생·교사 수는 누구나 확인할 수 있는 사실입니다. 주장은 사람마다 생각이 다를 수 있는 의견입니다.', '식당이 여는 시간은 확인할 수 있는 사실입니다. 주장에는 should처럼 입장을 나타내는 말이 들어갑니다.'],
        explain: '"재활용 동아리를 만들어야 한다"는 문장(Our school **should** start a recycling club.)은 "~해야 한다"는 입장, 곧 의견이므로 주장이 될 수 있습니다. 나머지 둘은 확인할 수 있는 사실입니다.',
      },
    },
    {
      title: '알맞은 근거 고르기',
      body: '근거는 주장을 믿게 만드는 자료입니다. 영어 설득문에서 많이 쓰는 근거는 세 가지입니다.\n\n' +
        '| 종류 | 무엇인가 | 예 |\n|---|---|---|\n' +
        '| **통계(statistics)** | 조사·실험에서 얻은 수치 | In a survey of 500 teenagers, 7 out of 10 said ~. |\n' +
        '| **사례(examples)** | 실제로 있었던 구체적인 일이나 경험 | Last year, a school in a nearby city ~. |\n' +
        '| **전문가 의견(expert opinion)** | 그 분야를 연구하는 사람의 판단 | According to a doctor who studies sleep, ~. |\n\n' +
        '좋은 근거인지는 세 가지로 점검합니다.\n\n' +
        '- **관련성**: 주장과 직접 이어지는가? "자전거 도로를 늘려야 한다"는 주장에 "자전거 경주를 좋아하는 사람이 많다"는 관련이 약합니다.\n' +
        '- **신뢰성**: 출처가 분명하고 믿을 만한가? "~라고 들었다(I heard that ~)"보다 "~의 연구에 따르면(According to a study by ~)" 쪽이 믿을 만합니다.\n' +
        '- **충분성**: 한두 사람의 이야기만으로 전체를 말하지 않는가? 대상이 많고 다양할수록 힘이 셉니다.\n\n' +
        '> ⚠️ I feel ~, I hate ~ 같은 개인의 느낌은 근거가 아니라 의견을 한 번 더 말한 것입니다. 다른 사람이 확인할 수 있는 자료를 대야 합니다.',
      easy: '근거를 고르는 일은 친구에게 맛집을 추천하는 일과 비슷합니다.\n\n' +
        '- "리뷰 1,000개의 평균 별점이 4.8이야." → 통계\n' +
        '- "지난주에 가족이랑 갔는데 30분 줄 서서 먹었어." → 사례\n' +
        '- "음식 평론가가 이 집 국물을 칭찬했어." → 전문가 의견\n' +
        '- "그냥 내가 좋아." → 느낌일 뿐이라 친구를 설득하기 어렵습니다.',
      check: {
        type: 'choice',
        q: '다음 근거는 어떤 종류입니까?\n\nAccording to a doctor who studies teenage sleep, teenagers need eight to ten hours of sleep a night.',
        choices: ['전문가 의견', '통계(조사 수치)', '사례(실제 있었던 일)'],
        answer: 0,
        why: ['', '수(eight to ten hours)가 있지만 조사 결과의 수치가 아니라 의사의 판단입니다. 실마리는 According to a doctor ~ 부분입니다.', '실제로 있었던 구체적인 한 사건을 소개한 것이 아닙니다.'],
        explain: '"~을 연구하는 의사에 따르면(According to a doctor who studies ~)"은 그 분야를 연구하는 사람의 말을 빌리는 표현이므로 전문가 의견입니다.',
      },
    },
    {
      title: '반론을 인정하고 다시 반박하기',
      body: '설득하는 글이 힘을 얻으려면 **반대 의견(counterargument)**을 피하지 말고 먼저 꺼내 다루어야 합니다. 이때 두 걸음을 밟습니다.\n\n' +
        '1. **인정(양보)**: 상대 의견에도 일리가 있음을 인정합니다.\n' +
        '2. **반박(rebuttal)**: 그래도 내 주장이 옳은 까닭을 근거와 함께 말합니다.\n\n' +
        '| 표현 | 예 |\n|---|---|\n' +
        '| **Admittedly,** A, **but** B. | Admittedly, uniforms cost money, but they save time every morning. |\n' +
        '| **Admittedly,** A. **However,** B. | Admittedly, the plan is expensive. However, it will save money in the long run. |\n' +
        '| **It is true that** A, **but** B. | It is true that online classes are convenient, but they make it hard to ask questions. |\n' +
        '| **Some people argue that** A. **However,** B. | Some people argue that homework is useless. However, it helps students review. |\n' +
        '| **Although** A, B. | Although the plan is expensive, it will save money in the long run. |\n\n' +
        '인정만 하고 반박하지 않으면 오히려 상대 편을 들어 준 셈이 됩니다. 반박에는 반론에 **직접 답하는** 내용이 와야 합니다. "비용이 든다"는 반론에는 비용을 줄일 방법이나 비용보다 큰 이익을 말해야 합니다.\n\n' +
        '> ⚠️ 양보의 접속사(although)와 대등 접속사(but)를 한 문장에 함께 쓰지 않습니다. Although it is expensive, **but** it is useful. (×) → Although it is expensive, it is useful. (○)',
      easy: '줄다리기를 떠올려 보십시오. 상대가 줄을 당길 것을 알면서 모른 척하면 넘어집니다.\n\n' +
        '"맞아, 네 말처럼 돈이 들어(Admittedly, it costs money)." — 상대가 당기는 힘을 먼저 인정하고,\n' +
        '"하지만 오래 보면 돈을 아껴 줘(but it saves money in the long run)." — 그보다 세게 다시 당기는 것이 반박입니다.',
      check: {
        type: 'choice',
        q: '반론을 **인정한 뒤 다시 반박하는** 문장은 무엇입니까?',
        choices: [
          'Admittedly, the trip is expensive, but students learn a lot from it.',
          'The trip is expensive, so we should cancel it and plan a cheaper one next year.',
          'The trip is expensive, and it also takes students away from their classes for three days.',
        ],
        answer: 0,
        why: ['', '비용이 든다는 반론을 그대로 받아들여 결론까지 바꾸었습니다. 반박이 없습니다.', '반론(비싸다)에 또 다른 단점을 덧붙였을 뿐, 다시 반박하지 않았습니다.'],
        explain: '"인정하건대(**Admittedly**)"로 "비싸다"는 반론을 인정하고, **but** 뒤에서 "학생들이 많이 배운다"는 이익으로 다시 반박했습니다.',
      },
    },
    {
      title: '논리적 오류 피하기',
      body: '근거가 있어도 **근거에서 결론으로 넘어가는 길**이 잘못되면 설득력을 잃습니다. 이를 논리적 오류(logical fallacy)라고 합니다. 이 단원에서는 가장 흔한 두 가지를 봅니다.\n\n' +
        '**1. 성급한 일반화(hasty generalization)** — 너무 적은 사례로 전체를 단정합니다.\n' +
        '- I tried two apps made by that company, and both were slow. **All of its apps** must be slow.\n' +
        '- 앱 두 개만 보고 그 회사의 모든 앱을 판단했습니다.\n\n' +
        '**2. 잘못된 인과 관계(false cause)** — 두 일이 잇따라 또는 함께 일어났다는 것만으로 하나를 다른 하나의 원인으로 봅니다.\n' +
        '- I wore my blue socks, and our team won. These socks must bring us luck.\n' +
        '- Ice cream sales and swimming accidents both rise in summer, so ice cream causes accidents. → 둘 다 **더운 날씨**라는 다른 원인 때문일 수 있습니다.\n\n' +
        '피하는 방법\n' +
        '- 사례를 충분히, 여러 곳에서 모읍니다.\n' +
        '- all, every, always, never 같은 말 대신 many, often, most처럼 근거만큼만 말합니다.\n' +
        '- "다른 원인은 없을까?", "우연은 아닐까?"를 스스로 묻습니다.',
      easy: '두 오류를 짧은 이야기로 기억해 보십시오.\n\n' +
        '- 성급한 일반화: 처음 간 도시에서 비가 오자 "이 도시는 늘 비가 오는구나." — 하루만 보고 1년을 판단했습니다.\n' +
        '- 잘못된 인과 관계: 수탉이 운 뒤에 해가 뜨자 "수탉이 울어서 해가 뜬다." — 먼저 일어났다고 원인은 아닙니다.',
      check: {
        type: 'choice',
        q: '다음 글에 나타난 오류는 무엇입니까?\n\nIt rained right after I washed my bike. Washing my bike makes it rain.',
        choices: ['잘못된 인과 관계', '성급한 일반화', '뚜렷한 오류 없음(바른 추론)'],
        answer: 0,
        why: ['', '적은 사례로 전체를 단정한 것이 아니라, 앞뒤로 일어난 두 일을 원인과 결과로 묶었습니다.', '자전거를 씻은 일과 비가 온 일은 우연히 이어졌을 뿐, 원인과 결과라고 할 근거가 없습니다.'],
        explain: '자전거를 씻은 **뒤에** 비가 왔다는 것만으로 씻은 일을 비의 **원인**으로 보았습니다. 잘못된 인과 관계입니다.',
      },
    },
    {
      title: '상대를 존중하면서 주장하기',
      body: '설득의 목표는 상대를 이기는 것이 아니라 **마음을 움직이는 것**입니다. 상대를 깎아내리면 듣는 사람은 마음을 닫습니다.\n\n' +
        '**상대 의견을 먼저 인정하기**\n' +
        '- I understand why some people feel that way, but ~\n' +
        '- I see your point. However, ~\n\n' +
        '**정중하게 반대하기**\n' +
        '- I respectfully disagree. (정중히 반대합니다)\n' +
        '- I\'m not sure I agree with that, because ~\n\n' +
        '**단정을 줄이고 근거만큼 말하기**\n' +
        '- Everyone hates homework. → **Many** students find homework stressful.\n' +
        '- This will solve the problem. → This **could help** solve the problem.\n\n' +
        '**사람이 아니라 의견을 비판하기**\n' +
        '- Only lazy people would say that. (×) — 주장이 아니라 사람을 공격했습니다. 이것도 논리적 오류(인신공격)입니다.\n' +
        '- That idea does not consider the cost. (○)\n\n' +
        '> 💡 respectfully(정중하게)와 respectively(각각)는 철자가 비슷하지만 뜻이 전혀 다릅니다.',
      easy: '같은 말도 포장에 따라 받는 느낌이 달라집니다.\n\n' +
        '- "네 생각은 틀렸어." → 상대는 방어부터 합니다.\n' +
        '- "왜 그렇게 생각하는지 알 것 같아. 그런데 이런 점은 어떨까?" → 상대는 내 말을 끝까지 듣습니다.\n\n' +
        '두 번째 포장이 바로 I understand why ~, but ~ 표현입니다.',
      check: {
        type: 'ox',
        q: '다음 문장은 상대를 존중하면서 반대하는 표현입니다.\n\nI understand why some people feel that way, but I respectfully disagree.',
        answer: true,
        explain: '"왜 그렇게 느끼는지 이해한다(**I understand why ~**)"며 상대의 생각을 먼저 인정하고, "정중히 반대한다(**I respectfully disagree**)"며 정중하게 반대했습니다. 사람을 공격하지 않고 의견만 다룹니다.',
      },
    },
  ],

  examples: [
    {
      q: '"학교에 음수대(water refill station)를 더 설치해야 한다"는 주장에 대해 "설치 비용이 많이 든다"는 반론이 예상됩니다. 반론을 인정하고 다시 반박하는 두 문장을 써 보십시오.',
      steps: [
        '먼저 반론에도 일리가 있음을 인정합니다. Admittedly 뒤에 상대 의견을 그대로 씁니다: Admittedly, installing new water refill stations will cost money.',
        '인정한 말과 반대 방향으로 넘어가는 신호어를 붙입니다: However, ~',
        '반론(비용)에 직접 답하는 근거를 댑니다. 비용보다 큰 이익, 또는 비용을 줄이는 방법을 말합니다: students will buy fewer bottled drinks, so the school will produce much less plastic waste.',
      ],
      answer: 'Admittedly, installing new water refill stations will cost money. However, students will buy fewer bottled drinks, so the school will produce much less plastic waste.',
    },
    {
      q: '다음 설득하는 글을 주장-근거-반론 반박-결론으로 나누어 보십시오.\n\n' + ESSAY,
      steps: [
        '주장: 첫 문장 Our school library should stay open until 8 p.m. on weekdays. — should 같은 조동사로 입장을 밝힙니다.',
        '근거 1: First, ~ 집에 조용히 공부할 곳이 없는 학생이 많다는 이유와, 학생 200명 설문(64 percent)이라는 통계 근거.',
        '근거 2: Second, ~ 방과 후 동아리 학생이 도서관을 쓰기 어렵다는 이유와, 지금은 오후 5시에 닫는다는 사실.',
        '반론과 반박: Admittedly, ~ 비용이 더 든다는 반론을 인정하고, However, ~ 학생 자원봉사자가 사서를 도우면 비용을 낮출 수 있다고 반박합니다.',
        '결론: For these reasons, ~ 작은 변화가 큰 차이를 만든다며 주장을 다시 강조합니다.',
      ],
      answer: '주장(첫 문장) → 근거(First, ~ / Second, ~) → 반론 인정과 반박(Admittedly, ~ However, ~) → 결론(For these reasons, ~)',
    },
  ],

  terms: [
    { term: '주장(claim)', def: '설득하는 글에서 글쓴이가 지키려는 입장입니다. 사실이 아니라 의견이며, should·must 같은 말이 자주 쓰입니다. 예: Our school should start a recycling club.' },
    { term: '근거(evidence)', def: '주장을 믿게 만드는 자료입니다. 통계, 사례, 전문가 의견이 대표적입니다.' },
    { term: '반론(counterargument)', def: '내 주장에 대해 다른 사람이 낼 수 있는 반대 의견입니다. 설득하는 글에서는 미리 꺼내 다룹니다.' },
    { term: '반박(rebuttal)', def: '반론이 왜 내 주장을 무너뜨리지 못하는지 근거를 들어 다시 받아치는 것입니다.' },
    { term: '양보(concession)', def: '상대 의견에도 일리가 있음을 인정하는 것입니다. 예: Admittedly, ~ / It is true that ~' },
    { term: '논리적 오류(logical fallacy)', def: '근거에서 결론으로 넘어가는 과정이 잘못된 것입니다. 예: 성급한 일반화, 잘못된 인과 관계, 인신공격' },
    { term: '성급한 일반화(hasty generalization)', def: '너무 적은 사례로 전체를 단정하는 오류입니다. 예: 앱 두 개가 느리다고 그 회사의 모든 앱이 느리다고 말하기' },
    { term: '잘못된 인과 관계(false cause)', def: '두 일이 잇따라 또는 함께 일어났다는 것만으로 하나를 다른 하나의 원인으로 보는 오류입니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '다음 중 설득하는 글의 **주장(claim)**으로 알맞은 문장은 무엇입니까?',
      choices: [
        'Students should be allowed to use phones at lunch.',
        'Most smartphones today have a camera and a calculator.',
        'Our school lunch break starts at 12:20 and ends at 1:10.',
        'Last year, our school bought fifty new tablets for classes.',
      ],
      answer: 0,
      why: [
        '',
        '스마트폰의 기능은 확인할 수 있는 사실입니다. 주장은 사람마다 생각이 다를 수 있는 의견입니다.',
        '점심시간이 언제인지는 확인할 수 있는 사실입니다.',
        '태블릿을 산 일은 지난 사실입니다. 근거로는 쓸 수 있어도 주장은 아닙니다.',
      ],
      explain: '"점심시간에 휴대 전화를 쓰도록 허락해야 한다"는 입장을 나타내는 **Students should be allowed to use phones at lunch.** 문장이 주장입니다. 나머지는 모두 확인할 수 있는 사실입니다.',
    },
    {
      id: 'p2', level: 1, type: 'order', concept: 0,
      q: '설득하는 글의 일반적인 짜임이 되도록 순서대로 놓으십시오.',
      choices: ['주장 밝히기', '이유와 자료 제시', '반대 의견 인정과 반박', '입장 다시 강조하기'],
      answer: [0, 1, 2, 3],
      explain: '주장(claim) → 근거(reasons and evidence) → 반론 인정과 반박(counterargument and rebuttal) → 결론(conclusion) 순서입니다. 결론에서는 주장을 다시 강조하고 행동을 권합니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '다음 근거는 어떤 종류입니까?\n\nIn a survey of 500 teenagers, 7 out of 10 said they sleep less than seven hours on school nights.',
      choices: ['통계', '사례', '전문가 의견', '개인의 느낌'],
      answer: 0,
      why: [
        '',
        '한 사람의 구체적인 경험이 아니라 500명을 조사한 수치입니다.',
        '연구자나 의사의 판단을 빌린 문장이 아닙니다. 설문 결과입니다.',
        '글쓴이의 기분이 아니라 다른 사람도 확인할 수 있는 조사 결과입니다.',
      ],
      explain: '청소년 500명을 조사해 "10명 중 7명"이라는 수치를 얻었으므로 통계 근거입니다. (In a survey of ~, 7 out of 10 ~)',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: '다음 근거는 주장을 뒷받침하는 **관련성 있는** 근거입니다.\n\nClaim: Our town needs more bike lanes.\nEvidence: Many people enjoy watching bike races on TV.',
      answer: false,
      explain: '자전거 경주를 텔레비전으로 즐겨 보는 것은 자전거 도로가 필요한지와 직접 관련이 없습니다. 관련성 있는 근거는 예를 들어 "자전거 사고가 잦다", "자전거로 통학하는 학생이 늘었다" 같은 자료입니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 가장 알맞은 것은 무엇입니까?\n\n[[빈칸]], school uniforms can be expensive, but they save students time every morning.',
      choices: ['Admittedly', 'Therefore', 'For example', 'As a result'],
      answer: 0,
      why: [
        '',
        'Therefore(그러므로)는 앞 내용에서 결론을 끌어낼 때 씁니다. 이 문장은 단점을 먼저 인정한 뒤 접속사 but 뒤에서 반박합니다.',
        '"예를 들어"라는 뜻이라 앞 내용의 예를 들 때 씁니다. 문장 맨 앞에는 예를 들 대상이 없습니다.',
        '"그 결과"라는 뜻이라 앞 일의 결과를 말할 때 씁니다. 여기에는 원인-결과가 아니라 인정-반박의 흐름이 있습니다.',
      ],
      explain: '"교복이 비쌀 수 있다"는 반론을 먼저 인정하고 접속사 but 뒤에서 반박하므로 "인정하건대"라는 뜻의 부사(**Admittedly**)가 알맞습니다.',
    },
    {
      id: 'p6', level: 1, type: 'short', concept: 2,
      q: '첫 글자가 h인 한 낱말을 빈칸에 쓰십시오. (반론을 인정한 뒤 반박을 시작하는 말)\n\nSome people argue that homework is a waste of time. [[빈칸]], it helps students review what they learned in class.',
      answer: ['however'],
      wrong: [
        { a: 'but', why: '뜻은 비슷하지만 첫 글자가 h인 낱말을 찾는 문제입니다. 마침표 뒤에서 쉼표와 함께 새 문장을 열 때는 However, ~ 꼴을 씁니다.' },
        { a: 'howevr', why: '철자를 확인해 보십시오: h-o-w-e-v-e-r' },
      ],
      explain: '"숙제가 시간 낭비라고 주장하는 사람도 있다"는 반론 뒤에 **However,**(그러나)로 반박을 시작합니다. Some people argue that ~. However, ~ — 반론 반박의 대표적인 틀입니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '다음 글에 나타난 오류는 무엇입니까?\n\nI asked three people in my class, and they all like summer best. Clearly, summer is everyone\'s favorite season.',
      choices: ['성급한 일반화', '잘못된 인과 관계', '인신공격', '오류 없음'],
      answer: 0,
      why: [
        '',
        '원인과 결과를 잘못 이은 글이 아닙니다. 적은 사례로 전체를 단정한 것이 문제입니다.',
        '어떤 사람을 깎아내린 말은 없습니다.',
        '세 사람의 대답으로 "모든 사람(everyone)"을 판단했으므로 오류가 있습니다.',
      ],
      explain: '세 사람에게만 물어보고 "모든 사람(everyone)"의 생각이라고 단정했습니다. 사례가 너무 적어 전체를 대표하지 못하는 성급한 일반화입니다.',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 3,
      q: '다음 글은 잘못된 인과 관계의 오류를 보입니다.\n\nAfter the school painted the classroom walls green, test scores went up. The green walls made students smarter.',
      answer: true,
      explain: '벽을 칠한 **뒤에** 점수가 올랐다는 것만으로 벽 색깔을 점수의 **원인**으로 보았습니다. 새 선생님, 쉬워진 시험, 학생들의 노력 같은 다른 원인을 따져 보지 않은 잘못된 인과 관계입니다.',
    },
    {
      id: 'p9', level: 1, type: 'choice', concept: 4,
      q: '상대를 **존중하면서 반대하는** 말로 가장 알맞은 것은 무엇입니까?',
      choices: [
        'I see your point, but I see it differently.',
        'Only people who never read the news would say that.',
        'Whatever. I am not going to argue with you about this.',
        'That idea is silly, and honestly you should know better.',
      ],
      answer: 0,
      why: [
        '',
        '주장이 아니라 그 말을 한 사람을 깎아내렸습니다. 인신공격은 논리적 오류이기도 합니다.',
        '대화를 끊어 버리는 말입니다. 반대하더라도 이유를 들어 의견을 나누어야 합니다.',
        '상대의 생각을 "어리석다(silly)"고 깎아내리고 가르치려 듭니다.',
      ],
      explain: '"네 말뜻은 알겠다(I see your point)"며 상대 생각을 먼저 인정하고, "하지만 나는 다르게 본다(but I see it differently)"며 부드럽게 반대했습니다.',
    },
    {
      id: 'p10', level: 1, type: 'short', concept: 4,
      q: '"정중하게 반대합니다."라는 뜻이 되도록 빈칸에 한 낱말을 쓰십시오.\n\nI [[빈칸]] disagree.',
      answer: ['respectfully'],
      wrong: [
        { a: 'respectively', why: '이 낱말은 "각각"이라는 뜻입니다. "정중하게"에 해당하는 낱말은 respectfully입니다.' },
        { a: 'strongly', why: '"강하게 반대한다(I strongly disagree)"는 뜻이 됩니다. 정중함을 나타내는 말은 respectfully입니다.' },
      ],
      explain: '"정중히 반대합니다(**I respectfully disagree.**)"는 상대를 존중하면서 반대 의견을 밝히는 표현입니다. "정중한(respectful)"의 부사형이 respectfully입니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 2,
      q: '다음 중 문법적으로 **바른** 문장은 무엇입니까?',
      choices: [
        'Although homework takes time, it helps us review what we learned.',
        'Although homework takes time, but it helps us review what we learned.',
        'Although homework takes time. It helps us review what we learned.',
        'Homework takes time, although but it helps us review what we learned.',
      ],
      answer: 0,
      hint: 'although 부분은 혼자서 완전한 문장이 되지 못합니다.',
      why: [
        '',
        '양보의 접속사(although)와 대등 접속사(but)를 한 문장에 함께 썼습니다. 둘 중 하나만 씁니다.',
        '"~이지만" 부분만 따로 떼어 마침표를 찍었습니다. 뒤 문장과 쉼표로 이어야 합니다.',
        '접속사 두 개(although, but)를 나란히 썼습니다.',
      ],
      explain: '바른 꼴은 Although A, B. 입니다. 접속사 although에 이미 "~이지만"의 뜻이 있으므로 but 같은 접속사를 또 쓰지 않습니다. but 접속사를 쓰고 싶다면 Homework takes time, but it helps ~처럼 although 부분을 빼고 씁니다.',
    },
    {
      id: 'p12', level: 2, type: 'order', concept: 2,
      q: '"인정하건대 온라인 수업은 편리하지만, 질문하기가 어렵다."라는 뜻이 되도록 순서대로 놓으십시오.',
      choices: ['Admittedly,', 'online classes', 'are convenient,', 'but they make it hard', 'to ask questions.'],
      answer: [0, 1, 2, 3, 4],
      hint: 'Admittedly, A, but B. 의 틀에 넣어 보십시오.',
      explain: 'Admittedly, online classes are convenient, but they make it hard to ask questions. — 맨 앞에 인정하는 내용(편리하다), but 뒤에 반박(질문하기 어렵다)이 옵니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: '다음 주장을 비판하는 말로 가장 알맞은 것은 무엇입니까?\n\nIce cream sales and swimming accidents both rise in summer. Therefore, eating ice cream causes swimming accidents.',
      choices: [
        '두 일이 함께 늘어나는 것은 더운 날씨라는 다른 원인 때문일 수 있다.',
        '아이스크림을 먹는 사람의 수가 너무 적어서 전체를 대표한다고 보기 어렵다.',
        '아이스크림 판매량이 아니라 아이스크림 가격을 조사했어야 한다.',
        '주장한 사람이 수영을 할 줄 모르므로 그 말을 믿을 수 없다.',
      ],
      answer: 0,
      hint: '날씨가 더워지면 두 가지가 각각 어떻게 될지 생각해 보십시오.',
      why: [
        '',
        '사례 수가 적다는 것은 성급한 일반화에 대한 비판입니다. 이 글의 문제는 원인과 결과를 잘못 이은 것입니다.',
        '가격을 조사해도 "함께 늘어난 것을 원인으로 본" 잘못은 그대로 남습니다.',
        '주장 대신 사람을 공격하는 것은 그 자체로 인신공격의 오류입니다.',
      ],
      explain: '날씨가 더우면 아이스크림도 많이 팔리고 수영하는 사람도 많아져 사고도 늘어납니다. 두 일은 **함께** 늘었을 뿐, 하나가 다른 하나의 **원인**이 아닙니다. 이처럼 숨은 제3의 원인을 놓친 것이 잘못된 인과 관계입니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '다음 글에서 글쓴이는 예상되는 반론을 어떻게 반박했습니까?\n\n' + ESSAY,
      choices: [
        '학생 자원봉사자가 저녁에 사서를 도우면 추가 비용을 낮게 유지할 수 있다.',
        '집이 너무 시끄러워 공부하기 어렵다고 답한 학생이 64퍼센트나 된다.',
        '도서관을 오래 열어 두면 학교가 돈을 더 써야 한다는 점을 먼저 인정한다.',
        '방과 후 동아리 학생들은 지금 도서관을 거의 이용하지 못한다.',
      ],
      answer: 0,
      hint: 'Admittedly 뒤에 인정한 반론을 먼저 찾고, 바로 다음 문장을 보십시오.',
      why: [
        '',
        '첫째 근거(First, ~)의 통계입니다. 반론에 답하는 내용이 아닙니다.',
        '반론을 인정한 부분입니다. 반박은 그 뒤 However 문장에 있습니다.',
        '둘째 근거(Second, ~)의 내용입니다.',
      ],
      explain: '글쓴이는 "비용이 더 든다(Admittedly, ~ will cost the school more money.)"는 반론을 인정한 뒤, However 문장에서 **훈련받은 학생 자원봉사자가 사서를 도우면 추가 비용을 낮게 유지할 수 있다**고 반박했습니다. 반론(비용)에 직접 답하는 반박입니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 2,
      q: '"도서관을 오후 8시까지 열어야 한다"는 주장에 다음 반론이 나왔습니다. 이 반론에 **직접 답하는** 반박으로 가장 알맞은 것은 무엇입니까?\n\nCounterargument: Students might stay at school too late and get home unsafely.',
      choices: [
        'True, safety matters, but the school could run a late bus that leaves at 8:10 p.m.',
        'True, safety matters, but our library also has a really great collection of new books.',
        'True, safety matters, so maybe the library should not stay open in the evening after all.',
        'People who worry about safety too much simply do not care about studying.',
      ],
      answer: 0,
      hint: '반론의 걱정거리(늦은 귀가의 안전)를 해결해 주는 문장을 고르십시오.',
      why: [
        '',
        '새 책이 많다는 말은 안전 문제와 관련이 없습니다. 반박은 반론에 직접 답해야 합니다.',
        '반론을 인정한 뒤 자기 주장을 버렸습니다. 반박이 아니라 항복입니다.',
        '걱정하는 사람을 깎아내리는 인신공격입니다.',
      ],
      explain: '양보 표현(True, ~ but ~)으로 안전이 중요하다는 반론을 인정하고, **늦은 시간 통학 버스**라는 해결책으로 그 걱정에 직접 답했습니다. 반박은 반론이 걱정하는 바로 그 점을 다루어야 힘이 있습니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '다음 문장을 근거만큼만 말하도록 고쳐 쓴 것으로 가장 알맞은 것은 무엇입니까?\n\nTeenagers today never read books.',
      choices: [
        'In our class survey, many students said they read fewer books than before.',
        'All teenagers today never read any books at all, and that is simply a well-known fact.',
        'Teenagers today never read books, as everyone already knows.',
        'Teenagers today never read books because they are lazy.',
      ],
      answer: 0,
      hint: 'never, all처럼 예외를 허락하지 않는 말을 줄이고 근거의 출처를 밝힌 문장을 찾으십시오.',
      why: [
        '',
        '예외를 허락하지 않는 말(All, never, at all)로 오히려 더 세게 단정했습니다. 근거도 없습니다.',
        '"모두가 안다"는 말은 근거가 아닙니다. 단정도 그대로입니다.',
        '단정은 그대로이고, 이유로 사람을 깎아내렸습니다.',
      ],
      explain: '처음 문장은 모든 청소년에 대해 "결코 ~않는다(never)"고 단정한 성급한 일반화입니다. 고친 문장은 **조사의 범위(our class survey)**를 밝히고 many, fewer처럼 근거만큼만 말합니다.',
    },
    {
      id: 'a5', level: 3, type: 'order', concept: 0,
      q: '설득하는 글이 되도록 문장을 순서대로 놓으십시오.',
      choices: [
        'Our school should offer cooking classes to all students.',
        'First, cooking teaches students how to make healthy meals for themselves.',
        'Second, cooking together builds teamwork and planning skills.',
        'Admittedly, cooking classes need special equipment, but the cafeteria kitchen could be used after lunch.',
        'For these reasons, cooking classes would be a valuable part of school life.',
      ],
      answer: [0, 1, 2, 3, 4],
      hint: '주장 → 근거(First, Second) → 반론 인정과 반박 → 결론 순서입니다.',
      explain: '주장(should offer) → 근거 1(First) → 근거 2(Second) → 반론 인정과 반박(Admittedly, ~, but ~) → 결론(For these reasons) 순서입니다. 신호어가 각 문장의 자리를 알려 줍니다.',
    },
  ],

  deeper: [
    {
      title: '설득의 세 가지 길 — 에토스, 파토스, 로고스',
      body: '고대 그리스의 철학자 **아리스토텔레스**는 사람을 설득하는 힘을 세 가지로 나누었습니다.\n\n' +
        '| 이름 | 무엇에 기대는가 | 설득하는 글에서 |\n|---|---|---|\n' +
        '| **에토스(ethos)** | 말하는 사람에 대한 믿음 | 출처가 분명한 근거, 상대를 존중하는 말투 |\n' +
        '| **파토스(pathos)** | 듣는 사람의 감정 | 마음에 와닿는 사례 |\n' +
        '| **로고스(logos)** | 논리와 증거 | 통계, 오류 없는 추론 |\n\n' +
        '이 단원에서 배운 것을 이 틀로 다시 보면, 통계와 오류 피하기는 로고스를, 생생한 사례는 파토스를, 반론을 공정하게 인정하고 정중하게 반박하는 태도는 에토스를 키웁니다. 세 가지가 함께 갈 때 글이 가장 설득력 있습니다.\n\n' +
        '> 💡 감정에만 기대는 글(파토스만)은 그 순간에는 마음을 움직여도, 근거를 따져 보는 독자에게는 힘을 잃습니다.',
    },
    {
      title: '글에서 말로 — 토론과의 연결',
      body: '설득하는 글의 짜임은 말로 하는 **찬반 토론**에도 그대로 쓰입니다. 토론의 입론은 주장과 근거를, 반론 단계는 상대 주장에 대한 반박을, 최종 발언은 결론을 말하는 자리입니다.\n\n' +
        '글에서는 반론을 내가 **예상해서** 쓰지만, 토론에서는 상대가 **실제로** 반론을 냅니다. 그래서 상대의 말을 정확히 확인하고(Do you mean that ~?) 정중하게 반박하는 표현이 더 필요합니다. 이 내용은 단원 "협력하며 토론하기"에서 이어서 배웁니다.',
    },
  ],

  faq: [
    {
      q: '반론을 왜 굳이 제 글에 써요? 상대 편을 들어 주는 것 같아요.',
      a: '읽는 사람은 글을 읽으며 이미 "그래도 돈이 들잖아?" 같은 반론을 떠올립니다. 글쓴이가 그 반론을 모른 척하면 한쪽만 본 글로 느껴집니다. 반론을 먼저 꺼내 공정하게 인정하고 근거로 반박하면, 독자의 의심을 풀어 주고 글쓴이를 더 믿게 됩니다. 단, 인정만 하고 반박을 빠뜨리면 정말로 상대 편을 들어 준 셈이 됩니다.',
    },
    {
      q: 'Admittedly, Although 두 표현은 어떻게 달라요?',
      a: 'Admittedly — "인정하건대"라는 뜻의 **부사**라서 완전한 문장 앞에 붙고, 그 뒤에 접속사 but 또는 연결어 However 등을 써서 반박을 잇습니다. (Admittedly, it is expensive, but ~ / Admittedly, it is expensive. However, ~)\n\nAlthough — "~이지만"이라는 뜻의 **접속사**라서 그 자체로 두 부분을 잇습니다. 그래서 but 같은 접속사를 또 쓰지 않습니다. (Although it is expensive, it is useful.)',
    },
    {
      q: '통계가 있으면 무조건 좋은 근거인가요?',
      a: '아닙니다. 누구를 몇 명 조사했는지(충분하고 고른가), 누가 조사했는지(믿을 만한가), 주장과 직접 관련 있는지를 함께 따져야 합니다. 친구 다섯 명에게 물어 얻은 "80퍼센트"는 수치가 있어도 성급한 일반화일 수 있습니다.',
    },
    {
      q: '성급한 일반화랑 잘못된 인과 관계가 헷갈려요.',
      a: '결론의 모양을 보십시오. "모두/항상 그렇다(all, every, always)"로 끝나면 **사례가 충분한지**를 따지는 성급한 일반화와 관련이 깊고, "무엇 때문에 무엇이 생겼다(made, caused, because)"로 끝나면 **정말 원인인지**를 따지는 잘못된 인과 관계와 관련이 깊습니다.',
    },
  ],

  mistakes: [
    '양보의 접속사(although)와 대등 접속사(but)를 한 문장에 함께 쓰는 실수 — Although it is expensive, but it is useful. (×) → Although it is expensive, it is useful. (○)',
    '반론을 인정만 하고 반박을 빠뜨리는 실수 — Admittedly, ~ 뒤에는 반드시 접속사 but 또는 연결어 However 등을 쓰고 반론에 직접 답하는 근거를 댑니다.',
    '"정중하게"를 respectively(각각)로 쓰는 실수 — I respectfully disagree. (○)',
  ],

  gens: [
    {
      id: 'evidence-type',
      level: 1,
      title: '근거의 종류 알아보기',
      make: function (R) {
        var e = R.pick(EVIDENCE);
        var k = e[1];
        var correct = EV_NAME[k];
        var others = ['stat', 'example', 'expert', 'feeling'].filter(function (x) { return x !== k; });
        var reason = {};
        others.forEach(function (o) { reason[EV_NAME[o]] = '이 문장은 ' + EV_NAME[o] + ' 근거가 아닙니다. ' + EV_HINT[k]; });
        var pick = R.choices(correct, others.map(function (o) { return EV_NAME[o]; }));
        return {
          type: 'choice', concept: 1,
          q: '다음 문장을 설득하는 글의 근거로 쓴다면 어떤 종류에 해당합니까?\n\n' + e[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: EV_HINT[k] + ' → **' + correct + '**',
        };
      },
    },
    {
      id: 'fallacy-type',
      level: 2,
      title: '논리적 오류 찾기',
      make: function (R) {
        var s = R.pick(REASONING);
        var k = s[1];
        var correct = RS_NAME[k];
        var others = ['hasty', 'cause', 'none'].filter(function (x) { return x !== k; });
        var reason = {};
        others.forEach(function (o) { reason[RS_NAME[o]] = '"' + RS_NAME[o] + '"에 해당하지 않습니다. ' + RS_HINT[k]; });
        var pick = R.choices(correct, others.map(function (o) { return RS_NAME[o]; }), 3);
        return {
          type: 'choice', concept: 3,
          q: '다음 글의 추론에 대한 설명으로 알맞은 것은 무엇입니까?\n\n' + s[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: RS_HINT[k] + ' → **' + correct + '**',
        };
      },
    },
  ],

  vocab: [
    { w: 'persuade', m: '설득하다', ex: 'She persuaded her parents to adopt a dog from the shelter.', exm: '그녀는 부모님을 설득해 보호소에서 개를 입양했다.' },
    { w: 'claim', m: '주장; 주장하다', ex: 'The writer makes a clear claim in the first sentence.', exm: '글쓴이는 첫 문장에서 분명한 주장을 한다.' },
    { w: 'evidence', m: '증거, 근거', ex: 'You need strong evidence to support your opinion.', exm: '의견을 뒷받침하려면 강력한 근거가 필요하다.' },
    { w: 'support', m: '뒷받침하다, 지지하다', ex: 'These numbers support the idea that students need more sleep.', exm: '이 수치들은 학생들에게 잠이 더 필요하다는 생각을 뒷받침한다.' },
    { w: 'argue', m: '주장하다, 논쟁하다', ex: 'Some people argue that homework should be banned.', exm: '어떤 사람들은 숙제를 없애야 한다고 주장한다.' },
    { w: 'counterargument', m: '반론', ex: 'A good essay deals with at least one counterargument.', exm: '좋은 글은 적어도 하나의 반론을 다룬다.' },
    { w: 'rebut', m: '반박하다', ex: 'He rebutted the claim with data from a recent survey.', exm: '그는 최근 설문 자료로 그 주장을 반박했다.' },
    { w: 'admittedly', m: '인정하건대, 확실히', ex: 'Admittedly, the new rule is strict, but it keeps everyone safe.', exm: '인정하건대 새 규칙은 엄격하지만, 모두를 안전하게 지켜 준다.' },
    { w: 'statistics', m: '통계, 통계 자료', ex: 'The report includes statistics on how often students exercise.', exm: '그 보고서에는 학생들이 얼마나 자주 운동하는지에 관한 통계가 들어 있다.' },
    { w: 'expert', m: '전문가', ex: 'We asked an expert on water safety to visit our class.', exm: '우리는 물놀이 안전 전문가에게 우리 반을 방문해 달라고 부탁했다.' },
    { w: 'generalization', m: '일반화', ex: 'Saying that all teenagers are lazy is an unfair generalization.', exm: '모든 십 대가 게으르다고 말하는 것은 부당한 일반화이다.' },
    { w: 'cause', m: '원인; ~을 일으키다', ex: 'Lack of sleep can cause headaches.', exm: '잠이 부족하면 두통이 생길 수 있다.' },
    { w: 'logical', m: '논리적인', ex: 'Her argument was logical and easy to follow.', exm: '그녀의 주장은 논리적이고 따라가기 쉬웠다.' },
    { w: 'respectfully', m: '정중하게, 공손하게', ex: 'I respectfully disagree with your view on this issue.', exm: '이 문제에 대한 당신의 견해에 정중히 반대합니다.' },
    { w: 'conclusion', m: '결론', ex: 'In the conclusion, the writer repeats the main claim.', exm: '결론에서 글쓴이는 핵심 주장을 되풀이한다.' },
  ],
});
})();
