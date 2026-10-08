/* 대학 영어: 문법과 독해 · 비판적으로 읽기
 * 예문·지문은 모두 직접 쓴 글이다(가상의 회사·학교·연구·수치). 실제 통계·논문의 문장을 옮기지 않았다.
 * 영어 낱말 바로 뒤에는 조사를 붙이지 않는다(낱말 뒤에 '낱말·꼴·문장·표현' 같은 우리말을 둔다). */
(function () {
  // 문장 번호가 붙은 짧은 논증 (가상의 조사)
  var REMOTE = '(1) Many companies allow employees to work from home two days a week. (2) In a survey by one company, 85 percent of its 40 employees said they felt more productive at home. (3) This suggests that working from home may increase productivity. (4) Therefore, every company in the country should adopt a two-day remote work policy.';
  // 상관을 인과로 읽은 짧은 논증 (가상의 학교)
  var SNACK = 'A snack bar opened next to a local high school last March. Since then, the number of students who arrive late for class has fallen by 20 percent. Clearly, the snack bar has encouraged students to come to school early. The school should therefore support more shops near its gates.';

Tutor.registerUnit({
  id: 'eng-u-grammar-10',
  course: 'eng-u-grammar',
  title: '비판적으로 읽기',
  summary: '학술 글의 주장·근거·숨은 전제를 찾아 따져 보고, 논리의 빈틈과 다른 해석의 가능성을 생각합니다.',
  goals: [
    '글에서 주장과 근거를 찾고, 둘을 잇는 숨은 전제를 말할 수 있다.',
    '사실·해석·의견을 구별하고, 근거의 질을 표본 크기·출처·발표 시기로 평가할 수 있다.',
    '성급한 일반화와 상관관계·인과관계의 혼동 같은 논리적 오류를 찾을 수 있다.',
    '글쓴이의 해석과 다른 설명을 세우고 반론을 영어 표현으로 나타낼 수 있다.',
  ],
  standards: [],

  concepts: [
    {
      title: '논증의 뼈대: 주장과 근거',
      body: '**비판적 읽기(critical reading)**는 글을 믿거나 거부하기 전에 **따져 보는** 읽기입니다. 첫 단계는 글의 뼈대인 논증을 찾는 것입니다.\n\n' +
        '- **주장(claim)**: 글쓴이가 독자에게 받아들이게 하려는 결론입니다. "그래서 결국 무엇을 믿으라는(하라는) 것인가?"\n' +
        '- **근거(evidence, reasons)**: 주장을 뒷받침하는 이유와 자료입니다. "왜 그렇게 말하는가?"\n\n' +
        '신호어가 뼈대를 찾는 데 도움이 됩니다.\n\n' +
        '| 무엇의 신호인가 | 신호어 |\n|---|---|\n' +
        '| 주장(결론)이 나온다 | therefore, thus, so, as a result, this shows that, we conclude that |\n' +
        '| 근거가 나온다 | because, since, for example, according to, research shows, data indicate |\n\n' +
        '예: Our school should start classes at 9 a.m. **because** students who sleep longer pay more attention in class.\n' +
        '→ 주장: 수업을 9시에 시작해야 한다. / 근거: 더 오래 자는 학생이 수업에 더 집중한다.\n\n' +
        '주장은 글의 처음이나 끝에 자주 오지만 신호어 없이 나오기도 합니다. 그때는 "나머지 문장들이 모두 받쳐 주는 문장"을 찾으십시오.\n\n' +
        '> ⚠️ 근거가 있다고 해서 좋은 근거인 것은 아닙니다. 근거의 질은 뒤의 카드에서 따집니다.',
      easy: '법정 드라마의 변호사를 떠올려 보십시오. "이 사람은 범인이 아닙니다." — 이것이 **주장**입니다. "그 시각에 이 사람이 다른 도시에 있었다는 영상이 있습니다." — 이것이 **근거**입니다.\n\n' +
        '글을 읽을 때도 변호사의 말을 듣는 판사처럼 "결국 무엇을 말하려는 거지?"(주장)와 "왜 그렇게 믿어야 하지?"(근거)를 나눠서 들어 보면 됩니다.',
      check: {
        type: 'choice',
        q: '다음 문장에서 **주장**에 해당하는 부분은 무엇입니까?\n\nSince most of the town\'s residents now shop online, the old market should be turned into a park.',
        choices: [
          'the old market should be turned into a park',
          'most of the town\'s residents now shop online',
          'the town has an old market',
        ],
        answer: 0,
        why: [
          '',
          'Since 낱말 뒤의 이 부분은 주장을 받치는 근거입니다.',
          '문장이 이미 전제로 깔고 있는 사실일 뿐, 글쓴이가 받아들이게 하려는 결론이 아닙니다.',
        ],
        explain: 'Since 뒤는 이유(근거), 그 뒤의 should 문장이 글쓴이가 받아들이게 하려는 결론(주장)입니다: 오래된 시장을 공원으로 바꿔야 한다.',
      },
    },
    {
      title: '숨은 전제 찾기',
      body: '근거와 주장 사이에는 글에 쓰이지 않았지만 **참이어야 논증이 성립하는 생각**이 숨어 있습니다. 이것이 **숨은 전제(unstated assumption)**입니다.\n\n' +
        '| 근거 (쓰여 있음) | 숨은 전제 (쓰여 있지 않음) | 주장 (쓰여 있음) |\n|---|---|---|\n' +
        '| Jia scored 100 on the math test. | 높은 점수는 열심히 공부해야만 얻을 수 있다. | She must have studied hard. |\n' +
        '| This laptop is the most expensive model. | 비싼 제품일수록 더 좋다. | It is the best laptop. |\n\n' +
        '숨은 전제를 찾는 질문은 이것입니다: **"근거가 모두 참이라고 해도, 무엇이 더 참이어야 주장이 따라 나오는가?"** 근거와 주장을 "만약 ~라면, ~이다"로 이어 보면 빠진 다리가 보입니다.\n\n' +
        '숨은 전제를 찾았으면 그것이 그럴듯한지 따져 봅니다. 위의 두 전제는 모두 의심스럽습니다. 시험이 쉬웠을 수도 있고, 비싼 제품이 꼭 내게 맞는 것은 아닙니다. **숨은 전제가 흔들리면 논증 전체가 약해집니다.**\n\n' +
        '> 💡 숨은 전제는 글에 이미 쓰인 근거와 다릅니다. "글에 있는 말을 다시 말한 보기"는 숨은 전제가 아닙니다.',
      easy: '개울을 건너는 징검다리를 생각해 보십시오. 이쪽 돌(근거)과 저쪽 돌(주장)은 눈에 보이지만, 그 사이에 **물속에 잠겨 보이지 않는 돌**이 하나 있어야 건널 수 있습니다. 그 돌이 숨은 전제입니다.\n\n' +
        '비판적으로 읽는다는 것은 그 보이지 않는 돌을 발로 짚어 보고 "이 돌, 정말 단단한가?" 하고 확인하는 일입니다.',
      check: {
        type: 'choice',
        q: '다음 논증의 **숨은 전제**로 가장 알맞은 것은 무엇입니까?\n\nThe library should extend its hours because students often study late at night.',
        choices: [
          'Students would use the library if it stayed open later.',
          'Students often study late at night.',
          'The library has a large collection of books and quiet study rooms.',
        ],
        answer: 0,
        why: [
          '',
          '이 내용은 글에 이미 쓰여 있는 근거입니다. 숨은 전제는 쓰여 있지 않은 생각입니다.',
          '주장이 성립하는 데 꼭 필요한 생각이 아닙니다. 책과 열람실이 많아도 학생들이 밤에 오지 않으면 시간을 늘릴 까닭이 없습니다.',
        ],
        explain: '학생들이 밤늦게 공부한다는 근거에서 도서관 시간을 늘려야 한다는 주장으로 가려면, **늦게까지 열면 학생들이 실제로 도서관을 이용할 것**이라는 생각이 참이어야 합니다. 학생들이 집에서 공부하기를 더 좋아한다면 이 논증은 약해집니다.',
      },
    },
    {
      title: '사실·해석·의견 구별하기',
      body: '학술 글의 문장은 성격이 다릅니다. 셋을 구별하면 **어디까지가 자료이고 어디부터가 글쓴이의 판단인지** 보입니다.\n\n' +
        '| 종류 | 무엇인가 | 어떻게 확인하나 | 자주 보이는 말 | 예 |\n|---|---|---|---|---|\n' +
        '| 사실 (fact) | 확인할 수 있는 일 | 자료·측정·기록으로 참·거짓을 가린다 | 수치, 날짜, 관찰 | The survey included 500 adults. |\n' +
        '| 해석 (interpretation) | 사실이 무엇을 뜻하는지에 대한 설명 | 더 많은 자료로 지지하거나 반박한다 | suggest, indicate, probably, likely, may | This suggests that most adults prefer buses. |\n' +
        '| 의견 (opinion) | 가치 판단이나 바람 | 사람마다 가치관에 따라 다르다 | should, best, worst, unfair, I believe | The city should ban cars downtown. |\n\n' +
        '- "사실"은 **확인할 수 있는 형식**이라는 뜻입니다. 사실처럼 쓰인 문장도 틀릴 수 있으므로 출처를 봅니다.\n' +
        '- 의견이 나쁜 것은 아닙니다. 글의 주장은 대개 의견입니다. 문제는 의견이 **근거로 뒷받침되는가**입니다.\n\n' +
        '> ⚠️ clearly, obviously, undoubtedly 같은 말은 해석이나 의견을 사실처럼 보이게 만듭니다. 이런 말 뒤의 문장은 오히려 한 번 더 따져 보십시오.',
      easy: '여름날의 세 문장을 견주어 보십시오.\n\n' +
        '- "지금 기온은 33도다." — 온도계로 확인할 수 있습니다. **사실**입니다.\n' +
        '- "그래서 오늘 에어컨을 켠 집이 많을 것 같다." — 사실에서 끌어낸 짐작입니다. **해석**입니다.\n' +
        '- "여름은 최악의 계절이다." — 여름을 좋아하는 사람도 있습니다. **의견**입니다.\n\n' +
        '사실은 "확인할 수 있나?", 해석은 "무엇을 뜻하나?", 의견은 "좋다·나쁘다·해야 한다"를 말합니다.',
      check: {
        type: 'choice',
        q: '다음 문장은 사실, 해석, 의견 가운데 무엇입니까?\n\nPublic libraries should open on Sundays.',
        choices: ['사실', '해석', '의견'],
        answer: 2,
        why: [
          '자료나 측정으로 참·거짓을 가릴 수 있는 문장이 아닙니다. should 낱말은 바람을 나타냅니다.',
          '어떤 사실이 무엇을 뜻하는지 설명하는 문장이 아닙니다. 무엇을 해야 한다는 가치 판단입니다.',
          '',
        ],
        explain: 'should 낱말로 "~해야 한다"는 바람과 가치 판단을 나타내므로 **의견**입니다. 이 의견이 좋은 주장이 되려면 일요일 이용 수요 같은 근거가 뒷받침해야 합니다.',
      },
    },
    {
      title: '근거의 질 평가하기: 표본·출처·발표 시기',
      body: '근거가 있다는 것과 **믿을 만한 근거**가 있다는 것은 다릅니다. 숫자나 연구가 나오면 다음 세 가지를 확인합니다.\n\n' +
        '**1. 표본(sample)** — 몇 명을, 누구를 조사했는가\n' +
        '- 크기: 12명의 결과는 우연에 크게 흔들립니다. 수천 명의 결과가 더 안정적입니다.\n' +
        '- 대표성: 크기만큼 중요한 것이 **골고루 뽑았는가**입니다. 온라인 투표처럼 스스로 응답한 사람들은 수가 많아도 한쪽으로 치우칠 수 있습니다.\n\n' +
        '**2. 출처(source)** — 누가 발표했는가\n' +
        '- 전문가들이 검토한 학술지(peer-reviewed journal), 공공 통계 기관은 비교적 믿을 만합니다. 글쓴이를 알 수 없는 게시물은 조심합니다.\n' +
        '- **이해관계**: 그 결과로 이익을 보는 쪽(제품을 파는 회사 등)이 돈을 댄 연구는 더 꼼꼼히 봅니다.\n\n' +
        '**3. 발표 시기(date)** — 언제 자료인가\n' +
        '- 기술, 물가, 인구처럼 빠르게 변하는 주제는 오래된 자료가 지금과 다를 수 있습니다.\n' +
        '- 오래되었다고 모두 나쁜 것은 아닙니다. 기본 원리를 밝힌 연구는 오래 지나도 가치가 있습니다.\n\n' +
        '| 확인할 것 | 믿을 만한 신호 | 의심스러운 신호 |\n|---|---|---|\n' +
        '| 표본 | 크고, 무작위로 골고루 뽑음 | 작거나, 아는 사람·스스로 응답한 사람만 |\n' +
        '| 출처 | 학술지, 공공 기관, 방법을 공개함 | 익명, 결과로 이익을 보는 쪽이 후원 |\n' +
        '| 시기 | 주제에 비해 충분히 최신 | 빠르게 변하는 주제인데 오래됨 |',
      easy: '처음 가 보는 식당의 후기를 읽는다고 해 봅시다.\n\n' +
        '- 별점 5점 후기가 **3개**뿐인 곳과 **1,000개**인 곳 — 앞쪽은 우연일 수 있습니다. (표본 크기)\n' +
        '- 후기를 쓴 사람이 **가게 주인의 가족**이라면 — 믿기 어렵습니다. (출처와 이해관계)\n' +
        '- 후기가 **10년 전** 것이고 그사이 주인이 바뀌었다면 — 지금과 다를 수 있습니다. (발표 시기)\n\n' +
        '학술 글의 근거도 이렇게 "몇 명이, 누가, 언제"를 확인하면 됩니다.',
      check: {
        type: 'ox',
        q: '온라인 투표에 스스로 참여한 5,000명의 응답은 표본이 크므로 전체 국민의 생각을 잘 대표한다.',
        answer: false,
        explain: '표본은 크기만큼 **대표성**이 중요합니다. 스스로 투표에 참여한 사람들은 그 주제에 관심이 많은 사람들로 치우칠 수 있어서, 수가 많아도 전체 국민을 대표한다고 보기 어렵습니다. 무작위로 골고루 뽑은 표본이 더 믿을 만합니다.',
      },
    },
    {
      title: '논리적 오류: 성급한 일반화, 상관과 인과의 혼동',
      body: '근거가 참이어도 **추론이 잘못되면** 주장은 따라 나오지 않습니다. 학술 글에서 특히 자주 보이는 두 오류를 봅니다.\n\n' +
        '**1. 성급한 일반화(hasty generalization)** — 적거나 치우친 사례로 전체를 판단합니다.\n\n' +
        '- I tried two apps from this company, and both crashed. **All** of its apps must be badly made.\n' +
        '- 앱 두 개로 회사의 모든 앱을 판단했습니다. all, always, everyone, never 같은 말이 작은 근거 위에 올라앉아 있으면 의심하십시오.\n\n' +
        '**2. 상관관계(correlation)를 인과관계(causation)로 혼동** — 두 가지가 **함께 변한다**는 것은 하나가 다른 하나를 **일으킨다**는 뜻이 아닙니다. 다른 설명이 있을 수 있습니다.\n\n' +
        '| 다른 설명 | 예 |\n|---|---|\n' +
        '| 제3의 원인 | 여름에는 찬 음료 판매와 햇볕 화상 환자가 함께 늘어난다. 음료가 화상을 일으키는 것이 아니라 둘 다 **더운 날씨** 때문이다. |\n' +
        '| 거꾸로 된 방향 | 운동을 많이 하는 사람이 더 건강하다. 운동이 건강을 만들 수도 있지만, **건강해서** 운동을 많이 하는 것일 수도 있다. |\n' +
        '| 우연 | 자료를 많이 뒤지면 아무 관계 없는 두 수치도 우연히 함께 움직일 수 있다. |\n\n' +
        '영어 표현도 구별합니다. is linked to, is associated with, correlates with 표현은 **상관**만 말하고, causes, leads to, results in 표현은 **인과**를 말합니다. 신중한 연구는 상관만 확인했을 때 앞쪽 표현을 씁니다.\n\n' +
        '> ⚠️ "B가 A 뒤에 일어났다"는 것도 A가 B의 원인이라는 증거가 되지 못합니다. 시간 순서는 인과의 필요조건일 뿐입니다.',
      easy: '수탉이 울고 나면 해가 뜹니다. 날마다 그렇습니다. 그렇다고 **수탉이 해를 뜨게 한다**고 말하면 웃음거리가 되겠지요. 둘은 함께 일어나지만, 수탉은 해가 뜰 무렵이라서 우는 것입니다.\n\n' +
        '"함께 일어난다"와 "그것 때문에 일어난다"는 다른 말입니다. 또 동네 고양이 두 마리가 사납다고 "이 동네 고양이는 다 사납다"고 하는 것이 성급한 일반화입니다.',
      check: {
        type: 'choice',
        q: '다음 논증에 들어 있는 오류는 무엇입니까?\n\nCities with more cafés have more traffic accidents. Therefore, cafés cause traffic accidents.',
        choices: ['성급한 일반화', '상관관계를 인과관계로 혼동', '오류 없음 (근거가 주장을 충분히 뒷받침함)'],
        answer: 1,
        why: [
          '적은 사례로 전체를 판단한 것이 아닙니다. 두 수치가 함께 변하는 것을 원인과 결과로 읽은 것이 문제입니다.',
          '',
          '함께 늘어난다는 것만으로는 카페가 사고를 일으킨다고 할 수 없습니다. 큰 도시일수록 카페도 차도 많다는 제3의 원인이 있습니다.',
        ],
        explain: '카페 수와 교통사고 수는 **함께 변할(상관)** 뿐입니다. 큰 도시일수록 사람과 차가 많아 카페도 사고도 많다는 **제3의 원인**(도시의 크기)으로 설명할 수 있으므로, cause 동사로 인과를 주장한 것은 오류입니다.',
      },
    },
    {
      title: '다른 해석과 반론 세워 보기',
      body: '비판적 읽기의 마지막 단계는 **"다르게 설명할 수는 없을까?"**를 묻는 것입니다. 글쓴이의 해석이 유일한 설명인지 확인하려면 다음을 물어보십시오.\n\n' +
        '- 다른 원인이 있지 않은가? (같은 시기에 바뀐 다른 것)\n' +
        '- 방향이 거꾸로일 수는 없는가?\n' +
        '- 우연이거나 이 집단·이 시기에만 그런 것은 아닌가?\n\n' +
        '이렇게 찾은 생각을 글로 쓰면 **반론(counterargument)**이 됩니다. 학술 글에서 자주 쓰는 표현은 다음과 같습니다.\n\n' +
        '| 표현 | 쓰임 |\n|---|---|\n' +
        '| An alternative explanation is that … | 다른 해석을 내놓을 때 |\n' +
        '| However, it could be argued that … | 조심스럽게 반대 의견을 낼 때 |\n' +
        '| Critics might point out that … | 예상되는 비판을 소개할 때 |\n' +
        '| While this is true, … | 상대의 말을 일부 인정하고 넘어갈 때 |\n\n' +
        '반론을 세울 때는 상대의 주장을 **가장 강한 형태로** 이해한 뒤에 따집니다. 일부러 약하게 바꿔 놓고 공격하면 공정한 비판이 아닙니다.\n\n' +
        '> 💡 반론이 있다고 해서 원래 주장이 틀린 것은 아닙니다. 주장을 더 조심스럽게 고치거나(may, in this sample), 어떤 자료가 더 필요한지 밝히는 것이 비판적 읽기의 좋은 결론입니다.',
      easy: '축구 경기에서 우리 팀이 이겼습니다. 친구는 "새 축구화 덕분이야!"라고 합니다. 정말 그럴까요?\n\n' +
        '- 상대 팀의 주전 선수가 다쳐서 못 나왔을 수도 있습니다. (다른 원인)\n' +
        '- 원래 우리 팀이 더 강했을 수도 있습니다.\n' +
        '- 오늘만 운이 좋았을 수도 있습니다. (우연)\n\n' +
        '이렇게 다른 설명을 떠올려 보는 것이 반론 세우기입니다. 그렇다고 축구화가 전혀 도움이 안 됐다고 단정하는 것도 아닙니다.',
      check: {
        type: 'choice',
        q: '다음 논증에 대한 **다른 해석**으로 가장 알맞은 것은 무엇입니까?\n\nAfter the school painted its classrooms green, students\' test scores rose. The green walls must have improved learning.',
        choices: [
          'The school also hired several new teachers in the same year.',
          'Green is one of the most popular colors.',
          'Students\' test scores rose in the year after the classrooms were painted green.',
        ],
        answer: 0,
        why: [
          '',
          '색의 인기는 점수가 오른 까닭을 다르게 설명하지 못합니다.',
          '글에 이미 쓰인 내용을 다시 말한 것입니다. 다른 설명이 아닙니다.',
        ],
        explain: '같은 해에 새 교사들이 왔다면 점수가 오른 것은 벽 색이 아니라 **수업의 변화** 때문일 수 있습니다. 같은 시기에 바뀐 다른 원인을 찾는 것이 다른 해석을 세우는 첫걸음입니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 글의 주장·근거·숨은 전제를 찾고, 근거의 질을 평가해 보십시오. (가상의 조사)\n\n' + REMOTE,
      steps: [
        '주장 찾기: Therefore 낱말로 시작하는 4번 문장이 결론입니다 — 나라 안의 모든 회사가 주 2일 재택근무를 해야 한다.',
        '근거 찾기: 2번 문장(한 회사 직원 40명 가운데 85퍼센트가 집에서 더 생산적이라고 느꼈다)이 자료이고, 3번 문장은 그 자료에 대한 해석입니다(suggests, may 표현).',
        '숨은 전제 찾기: 근거가 모두 참이어도 ① 한 회사의 결과가 모든 회사에 들어맞고 ② 생산적이라고 "느끼는 것"이 실제로 생산적인 것과 같아야 주장이 따라 나옵니다.',
        '근거의 질: 표본이 40명으로 작고, 회사 한 곳뿐이라 대표성이 없으며, 실제 성과가 아니라 스스로 답한 느낌입니다.',
        '오류 이름 붙이기: 작은 표본 하나로 나라 전체에 대한 결론을 내렸으므로 성급한 일반화입니다. 3번 문장의 조심스러운 may 표현이 4번 문장에서 every, should 표현으로 갑자기 강해진 것도 눈여겨볼 곳입니다.',
      ],
      answer: '주장은 4번 문장, 근거는 2번 문장의 작은 설문입니다. 한 회사의 결과가 모든 회사에 들어맞는다는 숨은 전제가 약하므로, 이 논증은 성급한 일반화입니다.',
    },
    {
      q: '다음 글의 추론을 따져 보고, 다른 해석을 영어 한 문장으로 세워 보십시오. (가상의 학교)\n\n' + SNACK,
      steps: [
        '사실과 해석 나누기: 매점이 생긴 것과 지각이 20퍼센트 줄어든 것은 확인할 수 있는 사실입니다. Clearly 낱말로 시작하는 셋째 문장은 그 둘을 원인과 결과로 묶은 해석이고, 넷째 문장(should)은 의견입니다.',
        '오류 찾기: 두 일이 같은 시기에 일어났다(상관)는 것만으로 매점이 지각을 줄였다(인과)고 단정했습니다. 시간 순서만으로는 원인을 보여 줄 수 없습니다.',
        '다른 설명 떠올리기: 같은 시기에 학교가 지각 규칙을 바꾸었거나, 등교 시각을 늦추었거나, 버스 노선이 새로 생겼을 수 있습니다.',
        '반론 쓰기: 학술 글의 표현 An alternative explanation is that … 을 써서 다른 원인을 조심스럽게 내놓습니다.',
      ],
      answer: 'An alternative explanation is that the school introduced stricter rules on lateness at the same time.',
    },
  ],

  terms: [
    { term: '비판적 읽기 (critical reading)', def: '글을 그대로 믿거나 거부하기 전에 주장·근거·전제·추론을 따져 보는 읽기입니다. 흠을 잡는 것이 아니라 얼마나 믿을 만한지 판단하는 것입니다.' },
    { term: '주장 (claim)', def: '글쓴이가 독자에게 받아들이게 하려는 결론입니다. therefore, thus, so 같은 신호어 뒤에 자주 나옵니다.' },
    { term: '근거 (evidence)', def: '주장을 뒷받침하는 이유와 자료입니다. because, since, according to 같은 신호어 뒤에 자주 나옵니다.' },
    { term: '숨은 전제 (unstated assumption)', def: '글에 쓰이지 않았지만, 근거에서 주장으로 가려면 참이어야 하는 생각입니다. 숨은 전제가 약하면 논증 전체가 약해집니다.' },
    { term: '사실·해석·의견', def: '사실은 자료·측정으로 확인할 수 있는 문장, 해석은 사실이 무엇을 뜻하는지에 대한 설명(suggest, likely), 의견은 가치 판단이나 바람(should, best)입니다.' },
    { term: '표본 (sample)', def: '조사 대상 전체 가운데 실제로 조사한 일부입니다. 크기가 충분하고 골고루(무작위로) 뽑혀야 전체를 잘 대표합니다.' },
    { term: '성급한 일반화 (hasty generalization)', def: '적거나 치우친 사례만 보고 전체에 대한 결론을 내리는 오류입니다. 예: 앱 두 개가 멈췄다고 그 회사의 모든 앱이 나쁘다고 판단하기.' },
    { term: '상관관계 (correlation)', def: '두 가지가 함께 변하는 관계입니다. 한쪽이 다른 쪽을 일으킨다는 뜻은 아닙니다. 영어로 is associated with, is linked to 표현을 씁니다.' },
    { term: '인과관계 (causation)', def: '한쪽이 다른 쪽을 일으키는 관계입니다. 영어로 causes, leads to, results in 표현을 씁니다. 상관만으로는 인과를 보여 줄 수 없습니다.' },
    { term: '반론 (counterargument)', def: '주장에 맞서는 다른 해석이나 반대 의견입니다. 상대의 주장을 가장 강한 형태로 이해한 뒤에 세워야 공정합니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '다음 문장에서 **근거**에 해당하는 부분은 무엇입니까?\n\nThe city should plant more trees along its main roads because trees reduce summer heat.',
      choices: [
        'trees reduce summer heat',
        'the city should plant more trees along its main roads',
        'the city has main roads',
        'plant more trees',
      ],
      answer: 0,
      why: [
        '',
        'should 낱말이 든 이 부분은 글쓴이가 받아들이게 하려는 결론, 곧 주장입니다.',
        '문장이 이미 깔고 있는 사실일 뿐, 주장을 뒷받침하는 이유로 쓰이지 않았습니다.',
        '주장의 일부만 떼어 낸 것입니다. 근거는 because 낱말 뒤에 나옵니다.',
      ],
      explain: 'because 낱말은 근거가 나온다는 신호입니다. 그 뒤의 trees reduce summer heat 부분(나무가 여름 더위를 줄인다)이 근거이고, 앞의 should 부분이 주장입니다.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: 'therefore, thus 같은 신호어 뒤에는 대개 근거가 나온다.',
      answer: false,
      explain: 'therefore, thus 낱말은 "그러므로"라는 뜻으로 **주장(결론)**이 나온다는 신호입니다. 근거가 나온다는 신호어는 because, since, for example, according to 같은 말입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '다음 논증의 **숨은 전제**로 가장 알맞은 것은 무엇입니까?\n\nMinsu has read every book on the reading list, so he will pass the literature exam.',
      choices: [
        'Reading the books on the list is enough to pass the exam.',
        'Minsu has read every book on the reading list.',
        'The literature exam is held at the end of the semester in the main hall.',
        'Some students did not read the books on the list.',
      ],
      answer: 0,
      why: [
        '',
        '글에 이미 쓰여 있는 근거를 다시 말했습니다. 숨은 전제는 쓰여 있지 않은 생각입니다.',
        '시험이 언제인지는 주장이 따라 나오는 데 필요한 생각이 아닙니다.',
        '다른 학생들의 이야기는 민수가 합격한다는 주장과 이어지지 않습니다.',
      ],
      explain: '"책을 다 읽었다"에서 "시험에 붙는다"로 가려면 **목록의 책을 읽는 것만으로 시험에 붙기에 충분하다**는 생각이 참이어야 합니다. 시험이 책 내용을 깊이 해석하게 한다면 이 전제는 흔들리고, 논증도 약해집니다.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'text', concept: 2,
      q: '다음 문장은 사실, 해석, 의견 가운데 무엇입니까? 한 낱말로 쓰십시오.\n\nThese numbers indicate that more people are cycling to work.',
      answer: ['해석', 'interpretation'],
      wrong: [
        { a: '사실', why: '숫자를 말하는 것 같지만, 이 문장은 숫자가 무엇을 뜻하는지(더 많은 사람이 자전거로 출근한다) 설명합니다. indicate 낱말이 해석의 신호입니다.' },
        { a: '의견', why: '좋다·나쁘다·해야 한다는 가치 판단이 없습니다. 자료의 뜻을 설명하는 문장이라 해석입니다.' },
      ],
      explain: 'These numbers indicate that … 문장은 숫자(사실)가 **무엇을 뜻하는지** 설명하므로 **해석**입니다. 더 많은 자료로 지지하거나 반박할 수 있습니다.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 3,
      q: '그 결과로 이익을 보는 회사가 돈을 댄 연구라면, 그 연구의 결과는 반드시 틀렸다.',
      answer: false,
      explain: '이해관계가 있는 연구는 **더 꼼꼼히 살펴볼** 까닭이 될 뿐, 결과가 반드시 틀렸다는 뜻은 아닙니다. 방법이 공개되어 있는지, 다른 독립적인 연구도 같은 결과를 냈는지 확인해 판단합니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '"우리나라 고등학생은 학교 가는 날 밤에 평균 8시간보다 적게 잔다."라는 주장의 근거로 가장 믿을 만한 것은 무엇입니까? (모두 가상의 자료)',
      choices: [
        '공공 통계 기관이 전국에서 무작위로 뽑은 고등학생 6,000명을 조사한 자료',
        '한 학원이 다니는 학생 50명에게 물어본 결과',
        '수면 보조제를 파는 회사가 온라인 설문에 스스로 참여한 사람들에게 받은 응답을 정리해 발표한 자료',
        '30년 전에 고등학교 한 곳에서 한 조사',
      ],
      answer: 0,
      why: [
        '',
        '표본이 50명으로 작고, 한 학원 학생만이라 전국 고등학생을 대표하지 못합니다.',
        '스스로 응답한 사람들이라 치우칠 수 있고, 발표한 회사가 결과로 이익을 볼 수 있습니다.',
        '너무 오래된 자료이고, 학교 한 곳뿐이라 대표성도 없습니다.',
      ],
      explain: '표본이 크고(6,000명) **무작위로 골고루** 뽑혔으며, 이해관계가 없는 공공 기관이 조사했으므로 가장 믿을 만합니다. 표본·출처·발표 시기를 함께 따져 보십시오.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '다음 논증에 들어 있는 오류는 무엇입니까?\n\nThe first two dishes I ordered at this restaurant were too salty. Everything on its menu must be salty.',
      choices: ['성급한 일반화', '상관관계를 인과관계로 혼동', '오류 없음 (근거가 주장을 충분히 뒷받침함)'],
      answer: 0,
      why: [
        '',
        '두 가지가 함께 변하는 것을 원인과 결과로 읽은 논증이 아닙니다. 적은 사례로 전체를 판단한 것이 문제입니다.',
        '음식 두 가지만 먹어 보고 메뉴 전체를 판단할 수는 없습니다.',
      ],
      explain: '음식 **두 가지**라는 적은 사례로 메뉴 **전체**(Everything)를 판단했으므로 **성급한 일반화**입니다. everything, all, always 같은 말이 작은 근거 위에 올라앉아 있으면 의심하십시오.',
    },
    {
      id: 'p8', level: 1, type: 'short', check: 'text', concept: 4,
      q: '카드에서 배운 표현으로, 두 가지가 **함께 변한다는 것(상관)만** 말하도록 빈칸에 한 낱말을 쓰십시오.\n\nOwning a dog is ___ with walking more each day.',
      answer: ['associated', 'correlated', 'linked', 'connected'],
      wrong: [
        { a: 'related', why: 'related 낱말은 to 와 함께 is related to 꼴로 씁니다. with 앞에는 associated(또는 correlated, linked) 낱말을 씁니다.' },
        { a: 'caused', why: 'cause 낱말은 한쪽이 다른 쪽을 일으킨다는 인과를 말합니다. 상관만 말하려면 is associated with 표현을 씁니다.' },
        { a: 'causes', why: 'cause 낱말은 인과를 말하는 동사이고, is ___ with 자리에도 맞지 않습니다. is associated with 표현을 씁니다.' },
      ],
      explain: '**is associated with** 표현(~와 관련이 있다)은 두 가지가 함께 나타난다는 **상관**만 말합니다(is correlated with, is linked with, is connected with 표현도 같은 뜻으로 정답입니다). 개를 키우는 사람이 원래 걷기를 좋아해서 개를 키우는 것일 수도 있으므로, 이런 자료만으로는 인과를 말하지 않습니다.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '번', concept: 0,
      q: '다음 글에서 글쓴이의 **주장(결론)**에 해당하는 문장의 번호를 쓰십시오. (가상의 조사)\n\n' + REMOTE,
      answer: '4',
      wrong: [
        { a: '3', why: '3번 문장은 2번 문장의 자료가 무엇을 뜻하는지 조심스럽게 말한 해석입니다(suggests, may). 글쓴이가 최종적으로 받아들이게 하려는 것은 Therefore 뒤의 4번 문장입니다.' },
        { a: '2', why: '2번 문장은 설문 결과, 곧 근거입니다. 주장은 그 근거에서 끌어낸 결론입니다.' },
      ],
      hint: '"그러므로"라는 신호어가 어느 문장에 있는지 보십시오.',
      explain: 'Therefore 낱말이 결론의 신호입니다. 4번 문장(모든 회사가 주 2일 재택근무를 해야 한다)이 주장이고, 2번 문장은 근거, 3번 문장은 근거에 대한 해석, 1번 문장은 배경입니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '다음 글의 2번 문장(근거)의 약점으로 가장 알맞은 것은 무엇입니까? (가상의 조사)\n\n' + REMOTE,
      choices: [
        '회사 한 곳의 직원 40명이 스스로 답한 느낌이라, 표본이 작고 대표성이 없다.',
        '85퍼센트라는 비율은 너무 높아서 계산이 틀렸을 것이 분명하다.',
        '주장보다 근거가 먼저 나와서 글의 순서가 잘못되었다.',
        '설문에 답한 직원들이 집에서 일하는 동안 어떤 일을 했는지 자세히 쓰지 않아 글이 지루하고 읽기에 재미가 없다.',
      ],
      answer: 0,
      why: [
        '',
        '비율이 높다는 것만으로 계산이 틀렸다고 할 근거는 없습니다. 따질 곳은 누구를, 몇 명을, 어떻게 조사했는가입니다.',
        '근거가 주장보다 먼저 나오는 것은 흔한 글의 순서이고 약점이 아닙니다.',
        '글의 재미는 근거의 질과 관계없습니다. 근거의 질은 표본·출처·발표 시기로 따집니다.',
      ],
      hint: '표본의 크기, 누구를 조사했는가, 무엇을 쟀는가를 보십시오.',
      explain: '근거는 **회사 한 곳, 직원 40명**의 응답이라 나라 전체 회사를 대표하지 못하고, 실제 성과가 아니라 **스스로 느낀 생산성**입니다. 표본의 크기와 대표성, 잰 것의 타당성이 모두 약합니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 1,
      q: '다음 글에서 2번 문장(근거)으로부터 4번 문장(주장)을 끌어내려면 필요한 **숨은 전제**는 무엇입니까? (가상의 조사)\n\n' + REMOTE,
      choices: [
        'What is true for one company is also true for every company in the country.',
        '85 percent of the employees said they felt more productive at home.',
        'Most employees at the company would prefer to work in an office five days a week if they could choose.',
        'Many companies allow employees to work from home two days a week.',
      ],
      answer: 0,
      why: [
        '',
        '2번 문장에 이미 쓰여 있는 근거입니다. 숨은 전제는 글에 쓰이지 않은 생각입니다.',
        '이 생각은 오히려 주장을 약하게 만듭니다. 주장이 성립하려면 참이어야 하는 생각이 아닙니다.',
        '1번 문장에 이미 쓰여 있는 배경입니다.',
      ],
      hint: '근거는 회사 몇 곳의 이야기이고, 주장은 회사 몇 곳에 대한 이야기입니까?',
      explain: '근거는 **한 회사**의 이야기인데 주장은 **나라 안의 모든 회사**에 대한 것입니다. 그 사이를 잇는 다리는 "한 회사에서 참인 것은 모든 회사에서도 참이다"라는 숨은 전제이고, 회사마다 하는 일이 다르므로 이 전제는 약합니다.',
    },
    {
      id: 'p12', level: 2, type: 'order', concept: 5,
      q: '다음 뜻이 되도록 반론 문장을 늘어놓으십시오.\n\n(다른 설명은 학교가 지각에 대한 규칙을 더 엄격하게 바꾸었다는 것이다.)',
      choices: ['An alternative explanation', 'is that', 'the school', 'introduced stricter', 'rules on lateness.'],
      answer: [0, 1, 2, 3, 4],
      hint: '학술 글에서 다른 해석을 내놓는 표현 An alternative explanation is that … 으로 시작합니다.',
      explain: 'An alternative explanation is that the school introduced stricter rules on lateness. — 다른 해석을 내놓는 틀 **An alternative explanation is that** 뒤에 다른 원인을 절로 씁니다. 단정하지 않고 가능성으로 내놓는 것이 학술 글의 반론 방식입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 4,
      q: '다음 글의 추론에서 가장 큰 문제는 무엇입니까? (가상의 학교)\n\n' + SNACK,
      choices: [
        '매점이 생긴 것과 지각이 준 것은 시기가 겹칠 뿐인데, 매점이 지각을 줄인 원인이라고 단정했다.',
        '학생 한 명의 사례만 보고 학교 전체에 대한 결론을 내렸다.',
        '지각한 학생 수가 20퍼센트 줄었다는 문장은 글쓴이의 의견일 뿐이므로, 주장을 뒷받침하는 근거로 쓸 수 없다.',
        '글쓴이가 매점 주인이므로 이 글은 믿을 수 없다.',
      ],
      answer: 0,
      why: [
        '',
        '글은 한 학생이 아니라 학교 전체의 지각 수치(20퍼센트)를 근거로 썼습니다. 표본 수의 문제가 아니라 원인을 단정한 것이 문제입니다.',
        '지각 학생 수가 20퍼센트 줄었다는 것은 기록으로 확인할 수 있는 사실 형식의 문장입니다.',
        '글쓴이가 누구인지는 글에 나오지 않습니다. 글에 없는 정보로 판단하면 안 됩니다.',
      ],
      hint: 'Since then 표현은 두 일의 어떤 관계만 보여 줍니까?',
      explain: 'Since then 표현은 두 일이 **시간 순서로 이어졌다**는 것만 보여 줍니다. 그것을 Clearly 낱말과 함께 "매점이 학생들을 일찍 오게 했다"는 **인과**로 단정한 것이 상관(또는 시간 순서)을 인과로 혼동한 오류입니다. 같은 시기의 다른 변화를 확인해야 합니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 5,
      q: '다음 글의 결론에 맞서는 **다른 해석**으로 가장 알맞은 것은 무엇입니까? (가상의 학교)\n\n' + SNACK,
      choices: [
        'In the same month, the school started the first class 30 minutes later.',
        'Many students enjoy the sandwiches and drinks sold at the new snack bar.',
        'The number of students who arrive late for class has fallen by 20 percent since the snack bar opened next to the school.',
        'Some high schools in other towns also have snack bars near their gates.',
      ],
      answer: 0,
      why: [
        '',
        '학생들이 매점을 좋아한다는 것은 다른 원인을 내놓지 못합니다. 오히려 글쓴이의 해석 쪽에 가깝습니다.',
        '글에 이미 쓰인 사실을 다시 말한 것입니다. 다른 설명이 아닙니다.',
        '다른 학교에도 매점이 있다는 것은 이 학교의 지각이 왜 줄었는지 다르게 설명하지 못합니다.',
      ],
      hint: '같은 시기에 바뀐 다른 것이 있다면 무엇이 지각을 줄였을까요?',
      explain: '같은 달에 첫 수업 시작이 30분 늦어졌다면, 지각이 줄어든 것은 매점이 아니라 **등교 시각의 변화** 때문일 수 있습니다. 같은 시기에 일어난 다른 원인(제3의 원인)을 내놓는 것이 다른 해석을 세우는 방법입니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 2,
      q: '다음 글의 셋째 문장(Clearly, the snack bar has encouraged students to come to school early.)은 무엇에 가장 가깝습니까? (가상의 학교)\n\n' + SNACK,
      choices: [
        '두 사실을 원인과 결과로 묶은 해석',
        '기록으로 확인할 수 있는 사실',
        '학교가 무엇을 해야 하는지에 대한 의견',
      ],
      answer: 0,
      why: [
        '',
        'Clearly 낱말 때문에 사실처럼 보이지만, 매점이 학생들을 일찍 오게 했다는 것은 기록으로 확인한 것이 아니라 글쓴이가 끌어낸 설명입니다.',
        '무엇을 해야 한다는 의견은 넷째 문장(The school should …)입니다. 셋째 문장은 지각이 준 까닭을 설명합니다.',
      ],
      hint: 'Clearly 낱말을 지우고 다시 읽어 보십시오.',
      explain: '매점이 생긴 것과 지각이 준 것은 사실이지만, 매점이 **그 까닭**이라는 것은 글쓴이의 **해석**입니다. Clearly 같은 말은 해석을 사실처럼 보이게 하므로, 이런 말 뒤의 문장은 한 번 더 따져 봐야 합니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      q: '다음 글의 3번 문장(재택근무가 생산성을 높일 수 있다)을 가장 강하게 뒷받침할 추가 자료는 무엇입니까? (가상의 조사)\n\n' + REMOTE,
      choices: [
        '무작위로 고른 회사 200곳에서 재택근무를 시작하기 전과 뒤의 실제 업무 성과를 비교한 자료',
        '같은 회사의 같은 직원 40명에게 한 번 더 물었더니, 집에서 일하는 것이 더 즐겁다고 답했다는 설문 결과',
        '한 회사 대표가 신문 인터뷰에서 "재택근무가 미래다"라고 말한 기사',
        '재택근무를 하면 출퇴근 시간이 줄어든다는 사실',
      ],
      answer: 0,
      why: [
        '',
        '같은 작은 표본에 다시 물었고, 즐겁다는 느낌은 생산성과 다른 것입니다.',
        '한 사람의 의견일 뿐, 생산성을 잰 자료가 아닙니다.',
        '출퇴근 시간이 줄어든다는 것만으로 업무 성과가 높아진다는 것을 보여 주지 못합니다.',
      ],
      hint: '표본의 크기·대표성과, 무엇을 쟀는지(느낌인가 실제 성과인가)를 함께 생각하십시오.',
      explain: '원래 근거의 약점은 **작은 표본, 회사 한 곳, 스스로 느낀 생산성**이었습니다. 무작위로 고른 많은 회사에서 **실제 성과**를 전후로 비교한 자료는 세 약점을 모두 보완하므로 가장 강한 뒷받침이 됩니다.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 5,
      q: '다음 주장에 대한 반론 가운데 **가장 공정한** 것은 무엇입니까?\n\nSchools should limit smartphone use during class because phones distract students.',
      choices: [
        'While phones can distract students, limiting their use may also keep students from looking up useful information in class.',
        'The writer wants to take every phone away from teenagers forever, which is clearly unreasonable and unfair to everyone.',
        'The writer probably does not know how to use a smartphone.',
        'Phones distract students during class.',
      ],
      answer: 0,
      why: [
        '',
        '주장은 "수업 중 사용 제한"인데 "영원히 모든 휴대폰을 빼앗는다"로 일부러 약하게 바꿔 놓고 공격했습니다. 공정한 비판이 아닙니다.',
        '주장 대신 글쓴이라는 사람을 공격했습니다. 주장의 옳고 그름과 관계가 없습니다.',
        '주장의 근거를 다시 말한 것으로, 반론이 아닙니다.',
      ],
      hint: '상대의 주장을 바꾸지 않고, 일부를 인정한 뒤 다른 면을 보여 주는 보기를 찾으십시오.',
      explain: 'While phones can distract students, … 반론은 상대의 근거를 **인정**하고(While …), 주장을 바꾸지 않은 채 **다른 면**(정보 찾기에 쓰임)을 조심스럽게(may) 보여 줍니다. 상대의 주장을 가장 강한 형태로 다룬 공정한 반론입니다.',
    },
  ],

  deeper: [
    {
      title: '상관에서 인과로: 무작위 대조 실험',
      body: '"함께 변한다"에서 "때문이다"로 가려면 무엇이 필요할까요? 과학자들이 가장 믿을 만하다고 보는 방법이 **무작위 대조 실험(randomized controlled trial)**입니다.\n\n' +
        '- 참가자를 **제비뽑기처럼 무작위로** 두 집단에 나눕니다. 그러면 나이·습관·건강 같은 다른 조건이 두 집단에 골고루 섞입니다.\n' +
        '- 한 집단에만 처치(새 수업 방법 등)를 하고, 다른 집단은 비교 집단으로 둡니다.\n' +
        '- 두 집단의 결과가 다르면, 다른 조건은 골고루 섞여 있으므로 그 차이를 처치 때문이라고 볼 근거가 강해집니다.\n\n' +
        '그러나 모든 문제를 실험할 수는 없습니다. 사람에게 일부러 해로운 일을 시킬 수는 없기 때문입니다. 그래서 관찰 자료로 연구하는 분야에서는 여러 연구의 결과가 같은 방향인지, 제3의 원인을 통계적으로 고려했는지를 보고 조심스럽게 판단합니다. 논문을 읽을 때 연구 방법 부분에서 randomly assigned 같은 표현이 있는지 찾아보십시오.',
    },
    {
      title: '가장 어려운 비판: 나 자신의 생각 읽기',
      body: '사람은 자기가 이미 믿는 것을 지지하는 자료는 쉽게 받아들이고, 반대되는 자료는 꼼꼼히 흠을 찾는 경향이 있습니다. 이를 **확증 편향(confirmation bias)**이라고 합니다.\n\n' +
        '그래서 비판적 읽기의 기준은 **내 생각과 같은 글에도 똑같이** 적용해야 합니다. 마음에 드는 결론일수록 표본은 충분한지, 출처는 믿을 만한지, 상관을 인과로 읽지 않았는지 한 번 더 물어보십시오.\n\n' +
        '보고서나 논문을 쓸 때 자기 주장에 대한 반론을 먼저 소개하고 답하는 절(Some may argue that … However, …)을 넣는 것도 이 때문입니다. 반론을 피하지 않고 다룬 글이 독자에게 더 믿음을 줍니다. 앞 단원에서 배운 정확한 요약은 이런 공정한 비판의 출발점입니다.',
    },
  ],

  faq: [
    {
      q: '비판적으로 읽는다는 게 글의 흠을 잡으라는 뜻인가요?',
      a: '아닙니다. 비판적 읽기는 흠을 잡는 것이 아니라 **얼마나 믿을 만한지 판단하는 것**입니다. 따져 본 결과 근거가 튼튼하면 그 주장을 받아들이는 것도 비판적 읽기의 결론입니다. 좋은 점과 약한 점을 함께 말할 수 있어야 합니다.',
    },
    {
      q: '숨은 전제는 어떻게 찾아요? 글에 없는 걸 어떻게 알아요?',
      a: '근거와 주장을 "만약 (근거)라면, (주장)이다"로 이어 보십시오. 그때 어색하게 느껴지는 빈틈을 메우는 생각이 숨은 전제입니다. "근거가 모두 참이라도 무엇이 더 참이어야 주장이 따라 나오는가?"를 물으면 됩니다. 글에 이미 쓰인 문장은 숨은 전제가 아닙니다.',
    },
    {
      q: '상관관계만 있으면 인과관계는 절대 없는 건가요?',
      a: '그렇지 않습니다. 상관이 있다고 인과가 **없다는** 뜻이 아니라, 상관**만으로는** 인과를 **보여 줄 수 없다**는 뜻입니다. 실제로 원인일 수도 있지만, 제3의 원인·거꾸로 된 방향·우연을 먼저 배제해야 합니다. 그래서 신중한 글은 is associated with 같은 표현을 씁니다.',
    },
    {
      q: '표본은 몇 명 이상이면 믿을 만해요?',
      a: '정해진 하나의 숫자는 없습니다. 조사하려는 집단의 크기와 다양성, 알고 싶은 차이의 크기에 따라 필요한 수가 달라집니다. 무엇보다 크기만큼 **대표성**이 중요합니다. 수만 명이라도 스스로 응답한 사람들이면 치우칠 수 있고, 수백 명이라도 무작위로 잘 뽑으면 전체를 잘 보여 줄 수 있습니다.',
    },
  ],

  mistakes: [
    '두 일이 함께 일어났거나 잇따라 일어났다는 것만으로 한쪽이 원인이라고 단정하는 실수 — 제3의 원인·거꾸로 된 방향·우연을 먼저 생각하십시오.',
    '글에 이미 쓰인 근거를 숨은 전제라고 고르는 실수 — 숨은 전제는 쓰여 있지 않지만 참이어야 하는 생각입니다.',
    'clearly, obviously 같은 말이 붙은 문장을 사실로 받아들이는 실수 — 이런 말은 해석이나 의견을 사실처럼 보이게 합니다.',
  ],

  gens: [
    {
      id: 'fact-interp-opinion',
      level: 1,
      title: '사실·해석·의견 구별하기',
      make: function (R) {
        // [문장, 종류, 신호(설명용)]
        var items = [
          ['The survey was conducted in 2021 and included 1,200 adults.', '사실', '조사 연도와 인원이라는 수치는 기록으로 확인할 수 있습니다'],
          ['Half of the participants were under 30 years old.', '사실', '참가자의 나이는 자료로 확인할 수 있습니다'],
          ['The library lent out 8,000 books in March.', '사실', '빌려 간 책의 수는 기록으로 확인할 수 있습니다'],
          ['The new bridge opened to traffic in 2019.', '사실', '다리가 개통한 해는 기록으로 확인할 수 있습니다'],
          ['The average temperature in July was 27 degrees Celsius.', '사실', '평균 기온은 측정으로 확인할 수 있습니다'],
          ['The river is about 40 kilometers long.', '사실', '강의 길이는 측정으로 확인할 수 있습니다'],
          ['These results suggest that shorter meetings may save time.', '해석', 'suggest, may 표현으로 결과가 무엇을 뜻하는지 조심스럽게 설명합니다'],
          ['The rise in sales probably reflects the warmer weather.', '해석', 'probably 낱말로 판매가 는 까닭을 짐작해 설명합니다'],
          ['The data indicate that more people are cycling to work.', '해석', 'indicate 낱말로 자료가 무엇을 뜻하는지 설명합니다'],
          ['This pattern is likely due to changes in school schedules.', '해석', 'likely 낱말로 그런 모습이 나타난 까닭을 짐작해 설명합니다'],
          ['The drop in visitors may mean that ticket prices are too high.', '해석', 'may mean 표현으로 방문객이 준 것이 무엇을 뜻하는지 설명합니다'],
          ['The findings suggest that sleep plays a role in memory.', '해석', 'suggest 낱말로 연구 결과가 무엇을 뜻하는지 설명합니다'],
          ['The city should build more bike lanes.', '의견', 'should 낱말로 무엇을 해야 한다는 바람을 말합니다'],
          ['Online classes are the best way to learn a language.', '의견', 'the best 표현으로 가치 판단을 합니다'],
          ['It is unfair to charge students for using the library.', '의견', 'unfair 낱말로 옳고 그름을 판단합니다'],
          ['Every school ought to offer free breakfast.', '의견', 'ought to 표현으로 무엇을 해야 한다는 바람을 말합니다'],
          ['I believe homework should be banned on weekends.', '의견', 'I believe, should 표현으로 글쓴이의 생각과 바람을 말합니다'],
          ['Summer is the most enjoyable season of the year.', '의견', 'the most enjoyable 표현은 사람마다 다른 가치 판단입니다'],
          ['The museum is open from 9 a.m. to 6 p.m. on weekdays.', '사실', '여는 시간은 안내문으로 확인할 수 있습니다'],
          ['Twelve of the 40 students in the class walk to school.', '사실', '걸어서 오는 학생 수는 조사로 확인할 수 있습니다'],
          ['The town\'s population grew from 8,000 to 9,500 between 2010 and 2020.', '사실', '인구 수치와 연도는 통계 기록으로 확인할 수 있습니다'],
          ['The longer queues at lunch probably mean that the new menu is popular.', '해석', 'probably mean 표현으로 줄이 길어진 것이 무엇을 뜻하는지 짐작합니다'],
          ['The lower test scores may be a sign that the questions were harder this time.', '해석', 'may be a sign 표현으로 점수가 내려간 까닭을 짐작해 설명합니다'],
          ['These figures indicate that fewer families are buying newspapers.', '해석', 'indicate 낱말로 수치가 무엇을 뜻하는지 설명합니다'],
          ['Paper books are better than e-books.', '의견', 'better 낱말로 무엇이 더 좋은지 가치 판단을 합니다'],
          ['The new school uniform is ugly.', '의견', 'ugly 낱말은 사람마다 다른 가치 판단입니다'],
          ['Students must be given more time for lunch.', '의견', 'must 낱말로 무엇을 해야 한다는 바람을 말합니다'],
        ];
        var it = R.pick(items);
        var LABELS = ['사실', '해석', '의견'];
        var WHY = {
          '사실': '확인할 수 있는 형식(수치·날짜·관찰)의 문장일 때 사실입니다. 이 문장은 그렇지 않습니다.',
          '해석': '해석은 사실이 무엇을 뜻하는지 설명하는 문장입니다(suggest, likely, may). 이 문장은 그렇지 않습니다.',
          '의견': '의견은 좋다·나쁘다·해야 한다는 가치 판단입니다(should, best). 이 문장은 그렇지 않습니다.',
        };
        return {
          type: 'choice', fixed: true, concept: 2,
          q: '다음 문장은 사실, 해석, 의견 가운데 무엇입니까?\n\n' + it[0],
          choices: LABELS.slice(),
          answer: LABELS.indexOf(it[1]),
          why: LABELS.map(function (l) { return l === it[1] ? '' : WHY[l]; }),
          explain: '**' + it[1] + '**입니다. ' + it[2] + '.',
        };
      },
    },
    {
      id: 'correlation-causation',
      level: 2,
      title: '상관을 말하는 표현과 인과를 말하는 표현',
      make: function (R) {
        // [문장, 인과를 주장하는가, 신호 표현]
        var items = [
          ['Regular exercise leads to better sleep.', true, 'leads to'],
          ['The heavy rain caused the delay of the game.', true, 'caused'],
          ['Using the new fertilizer results in taller plants.', true, 'results in'],
          ['Longer daylight hours cause the plants to flower earlier.', true, 'cause'],
          ['Lower ticket prices increased the number of visitors.', true, 'increased'],
          ['The new traffic lights reduced the number of accidents at the corner.', true, 'reduced'],
          ['Reading for pleasure is associated with a larger vocabulary.', false, 'is associated with'],
          ['Owning a dog is linked to walking more each day.', false, 'is linked to'],
          ['Ice cream sales correlate with the number of sunburn cases.', false, 'correlate with'],
          ['Students who sit in the front rows tend to get higher grades.', false, 'tend to'],
          ['Cities with more parks also tend to have higher housing prices.', false, 'also tend to'],
          ['Higher sales of hot drinks are associated with colder weather.', false, 'are associated with'],
          ['Daily reading practice improves students\' spelling.', true, 'improves'],
          ['The closure of the factory led to a rise in unemployment in the town.', true, 'led to'],
          ['Adding more buses to the route shortened waiting times.', true, 'shortened'],
          ['Too much salt in the soil causes the leaves to turn yellow.', true, 'causes'],
          ['The new bike lanes resulted in fewer cars on the main road.', true, 'resulted in'],
          ['Being taller is associated with higher scores in basketball tests.', false, 'is associated with'],
          ['Time spent outdoors is linked to better eyesight in children.', false, 'is linked to'],
          ['Towns with more libraries tend to have higher reading scores.', false, 'tend to'],
          ['The number of umbrellas sold correlates with the amount of rainfall.', false, 'correlates with'],
          ['Families who eat dinner together are more likely to report good communication.', false, 'are more likely to'],
        ];
        var it = R.pick(items);
        var explain = it[1]
          ? '**인과**를 주장합니다. ' + it[2] + ' 표현은 앞의 것이 뒤의 결과를 일으킨다고 말합니다. 연구가 상관만 확인했다면 is associated with 같은 표현이 알맞습니다.'
          : '**상관**만 말합니다. ' + it[2] + ' 표현은 두 가지가 함께 나타난다는 것만 말하고, 한쪽이 다른 쪽을 일으킨다고 말하지 않습니다. 제3의 원인이나 거꾸로 된 방향일 수도 있습니다.';
        return {
          type: 'ox', concept: 4,
          q: '다음 문장은 한쪽이 다른 쪽을 **일으킨다(인과)**고 주장합니다.\n\n' + it[0],
          answer: it[1],
          explain: explain,
        };
      },
    },
  ],

  vocab: [
    { w: 'critical', m: '비판적인; 중요한', ex: 'Critical readers check the evidence before they accept a claim.', exm: '비판적인 독자는 주장을 받아들이기 전에 근거를 확인합니다.' },
    { w: 'evaluate', m: '평가하다', ex: 'We need to evaluate the quality of the data.', exm: '우리는 그 자료의 질을 평가해야 합니다.' },
    { w: 'evidence', m: '근거, 증거', ex: 'The author gives little evidence for this claim.', exm: '저자는 이 주장에 대한 근거를 거의 내놓지 않습니다.' },
    { w: 'assumption', m: '가정, 전제', ex: 'The argument rests on a weak assumption.', exm: '그 논증은 약한 전제에 기대고 있습니다.' },
    { w: 'conclusion', m: '결론', ex: 'The conclusion does not follow from the data.', exm: '그 결론은 자료에서 따라 나오지 않습니다.' },
    { w: 'interpret', m: '해석하다', ex: 'Researchers may interpret the same results differently.', exm: '연구자들은 같은 결과를 다르게 해석할 수 있습니다.' },
    { w: 'sample', m: '표본', ex: 'The sample included only twelve students.', exm: '그 표본에는 학생이 열두 명뿐이었습니다.' },
    { w: 'representative', m: '대표하는, 대표성 있는', ex: 'A small online poll is rarely representative.', exm: '작은 온라인 투표는 대표성이 있는 경우가 드뭅니다.' },
    { w: 'reliable', m: '믿을 만한', ex: 'Check whether the source is reliable.', exm: '그 출처가 믿을 만한지 확인하십시오.' },
    { w: 'bias', m: '편향, 치우침', ex: 'Self-selected samples can introduce bias.', exm: '스스로 참여한 표본은 치우침을 낳을 수 있습니다.' },
    { w: 'generalize', m: '일반화하다', ex: 'Do not generalize from just two examples.', exm: '단 두 가지 예로 일반화하지 마십시오.' },
    { w: 'correlation', m: '상관관계', ex: 'A correlation between two things does not prove that one causes the other.', exm: '두 가지 사이의 상관관계는 한쪽이 다른 쪽의 원인임을 증명하지 않습니다.' },
    { w: 'causation', m: '인과관계', ex: 'The study shows correlation, not causation.', exm: '그 연구는 인과관계가 아니라 상관관계를 보여 줍니다.' },
    { w: 'fallacy', m: '(논리적) 오류', ex: 'This argument contains a common fallacy.', exm: '이 논증에는 흔한 오류가 들어 있습니다.' },
    { w: 'counterargument', m: '반론', ex: 'A strong essay responds to possible counterarguments.', exm: '좋은 글은 나올 수 있는 반론에 답합니다.' },
    { w: 'alternative', m: '다른, 대안이 되는; 대안', ex: 'Consider an alternative explanation for the results.', exm: '그 결과에 대한 다른 설명을 생각해 보십시오.' },
  ],
});
})();
