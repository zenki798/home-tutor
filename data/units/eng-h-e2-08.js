/* 영어Ⅱ · 재구성하여 요약하기
 * 자료 글은 모두 직접 쓴 것이다(가상의 학교·상황). 수치는 실제 통계가 아니다. */
(function () {
  // 자료 A: 집
  var SRC_A = '[Source A] Many families throw away food simply because they buy more than they need. Planning meals for the week and making a shopping list can prevent this. Storing leftovers in clear containers also helps, because people are more likely to eat food that they can see.';
  // 자료 B: 학교 급식실
  var SRC_B = '[Source B] In our school cafeteria, students used to leave about a third of their lunch uneaten. Last year, the cafeteria began letting students choose smaller portions and started asking for their opinions on the menu. As a result, the amount of food thrown away dropped noticeably.';
  // 자료 C: 가게
  var SRC_C = '[Source C] Some supermarkets now sell fruits and vegetables with small marks or unusual shapes at lower prices instead of throwing them out. Others give food that is close to its expiration date to local food banks, which share it with people in need.';
  var SRCS = SRC_A + '\n\n' + SRC_B + '\n\n' + SRC_C;
  // 비교 표
  var TABLE = '| 자료 | 장소 | 음식이 버려지는 까닭 | 해결 방법 |\n|---|---|---|---|\n' +
    '| A | home | buying more than needed | meal plans, shopping lists, clear containers |\n' +
    '| B | school cafeteria | portions too large, menu not chosen by students | smaller portions, asking students\' opinions |\n' +
    '| C | supermarkets | marked or oddly shaped produce, food near its date | lower prices, donations to food banks |';

Tutor.registerUnit({
  id: 'eng-h-e2-08',
  course: 'eng-h-e2',
  title: '재구성하여 요약하기',
  summary: '여러 문단이나 자료의 핵심을 묶어 다시 짜고, 원문을 베끼지 않고 내 말로 바꿔 요약문을 씁니다.',
  goals: [
    '여러 자료의 핵심을 기준을 세워 표로 비교·정리할 수 있다.',
    '구체적인 사례들을 상위어로 묶어 일반적인 진술로 바꿀 수 있다.',
    '동의어·품사 바꾸기·문장 구조 바꾸기로 원문의 뜻을 지키며 바꿔 쓸 수 있다.',
    '정해진 길이에 맞춰 요약하고, 출처를 밝히는 쓰기 윤리를 지킬 수 있다.',
  ],
  standards: ['[12영Ⅱ-02-04]', '[12영Ⅱ-02-07]'],

  concepts: [
    {
      title: '여러 자료의 핵심을 표로 비교 정리하기',
      body: '자료가 여러 개이면 하나씩 따로 요약하는 것보다 **같은 기준으로 표에 정리**한 뒤 묶는 것이 좋습니다. 표를 만들면 자료끼리 **같은 점과 다른 점**이 한눈에 보입니다.\n\n' +
        '1. **기준 정하기**: 자료들이 공통으로 다루는 질문을 찾습니다. (어디서? 왜? 어떻게 해결?)\n' +
        '2. **칸 채우기**: 자료마다 그 질문에 답하는 핵심어만 적습니다. 문장을 통째로 옮기지 않습니다.\n' +
        '3. **가로로 읽기**: 같은 줄(기준)을 가로로 읽으며 공통점을 찾습니다.\n\n' +
        '음식물 쓰레기에 관한 자료 A·B·C를 정리하면 다음과 같습니다.\n\n' + TABLE + '\n\n' +
        '"해결 방법" 칸을 가로로 읽으면, 세 곳 모두 **필요한 만큼만 준비하고(계획·작은 양)**, **남는 음식을 다른 데 쓴다(싸게 팔기·나누기)**는 공통점이 보입니다. 이것이 세 자료를 묶는 요약의 뼈대가 됩니다.\n\n' +
        '> 💡 표의 칸이 비어 있으면 그 자료가 그 질문을 다루지 않는다는 뜻입니다. 빈칸을 상상으로 채우지 마십시오.',
      easy: '친구 셋에게 "주말에 뭐 했어?"라고 물어 각자 길게 대답을 들었다고 해 봅시다. 그대로 기억하기는 어렵지만, "누구 / 어디 / 무엇"으로 표를 그리면 한눈에 정리되지요.\n\n' +
        '여러 영어 자료도 같습니다. 질문(기준)을 먼저 정하고, 자료마다 그 답만 핵심어로 적어 넣으면 됩니다.',
      check: {
        type: 'choice',
        q: '자료 B를 표로 정리할 때 **해결 방법** 칸에 들어갈 내용으로 가장 알맞은 것은 무엇입니까?\n\n' + SRC_B,
        choices: ['smaller portions, asking students\' opinions', 'students left about a third of their lunch uneaten', 'school cafeteria'],
        answer: 0,
        why: ['', '점심의 3분의 1이 남겨졌다는 것은 해결 방법이 아니라 문제(까닭) 쪽 내용입니다.', '급식실은 "장소" 칸에 들어갈 내용입니다.'],
        explain: '급식실이 한 일은 **작은 양을 고르게 한 것(smaller portions)**과 **식단에 학생 의견을 물은 것(asking for their opinions)**입니다. 이것이 해결 방법 칸에 들어갑니다.',
      },
    },
    {
      title: '구체적인 사례를 상위어로 묶어 일반화하기',
      body: '요약의 핵심 기술은 **구체적인 사례 여러 개를 하나의 상위어(넓은 말)로 묶는 것**입니다. 사례를 하나하나 늘어놓으면 요약이 길어지고 핵심이 흐려집니다.\n\n' +
        '| 구체적인 사례 (하위어) | 상위어로 묶기 |\n|---|---|\n' +
        '| apples, carrots, rice, bread | food |\n' +
        '| walking, cycling, taking the bus | eco-friendly ways to travel |\n' +
        '| meal plans, shopping lists | planning |\n' +
        '| selling at lower prices, giving to food banks | finding uses for extra food |\n\n' +
        '상위어를 고를 때는 **너무 좁지도, 너무 넓지도 않은** 말이 좋습니다.\n\n' +
        '- 너무 좁음 ✗: walking, cycling, taking the bus → exercise (버스 타기는 운동이 아니다)\n' +
        '- 너무 넓음 ✗: walking, cycling, taking the bus → activities (무엇이든 activity(활동)가 될 수 있다)\n' +
        '- 알맞음: → **ways to travel**, 글의 주제가 환경이면 **eco-friendly ways to travel**\n\n' +
        '> 💡 상위어가 **모든 사례를 빠짐없이 덮는지** 확인하십시오. 하나라도 빠지면 그 상위어는 틀린 것입니다.',
      easy: '엄마가 장 본 것을 물으시면 "사과, 배, 귤, 포도 샀어요"보다 "과일 몇 가지 샀어요"라고 하면 짧지요. 이렇게 여러 개를 한 이름으로 부르는 말이 **상위어**입니다.\n\n' +
        '요약할 때도 사례를 다 쓰지 말고 "과일" 같은 묶음 이름으로 바꾸면 짧고 분명해집니다.',
      check: {
        type: 'choice',
        q: '다음 사례를 묶는 상위어로 가장 알맞은 것은 무엇입니까?\n\nturning off unused lights, unplugging chargers, using a fan instead of an air conditioner',
        choices: ['saving energy', 'buying electronics', 'cooling a room'],
        answer: 0,
        why: ['', '세 사례 모두 물건을 사는 일이 아닙니다.', '선풍기 쓰기만 방을 시원하게 하는 일입니다. 불 끄기·충전기 뽑기는 덮지 못하므로 너무 좁습니다.'],
        explain: '불 끄기, 충전기 뽑기, 에어컨 대신 선풍기 쓰기는 모두 **전기(에너지)를 아끼는 일**이므로 saving energy(에너지 절약)가 세 사례를 빠짐없이 덮는 상위어입니다.',
      },
    },
    {
      title: '바꿔 쓰기 기법: 동의어·품사·문장 구조',
      body: '요약문은 원문을 베끼지 않고 **내 말로 바꿔 씁니다(paraphrase)**. 세 가지 기법을 함께 씁니다.\n\n' +
        '| 기법 | 원문 | 바꿔 쓴 문장 |\n|---|---|---|\n' +
        '| **동의어** | Planning meals can **prevent** waste. | Planning meals can **stop** waste. |\n' +
        '| **품사 바꾸기** | The cafeteria **decided** to offer smaller portions. | The cafeteria made a **decision** to offer smaller portions. |\n' +
        '| **문장 구조 바꾸기** | **Because it rained heavily**, the game was canceled. | The game was canceled **due to heavy rain**. |\n\n' +
        '- **동의어**: 뜻이 같은 다른 낱말로 바꿉니다. 단, 뜻의 세기가 같은지 봅니다. (noticeably → clearly ○, noticeably → completely ✗)\n' +
        '- **품사 바꾸기**: 동사 ↔ 명사(decide → decision, reduce → reduction), 형용사 ↔ 명사(important → importance, aware → awareness)\n' +
        '- **문장 구조 바꾸기**: 능동 ↔ 수동, 절 → 구(because + 절 → due to + 명사), 두 문장 → 한 문장\n\n' +
        '좋은 바꿔 쓰기는 보통 **세 기법을 섞어** 원문과 많이 달라 보이지만 **뜻은 똑같습니다**.\n\n' +
        '> ⚠️ 수·주체·조건을 바꾸면 안 됩니다. about a third(약 3분의 1)를 most(대부분)로, some supermarkets(일부 슈퍼마켓)를 all supermarkets(모든 슈퍼마켓)로 바꾸면 뜻이 달라집니다.',
      easy: '같은 말을 다른 옷으로 갈아입히는 것이라고 생각해 보십시오. "비가 많이 와서 경기가 취소됐다"를 "폭우로 경기가 취소됐다"로 바꾸면 옷(문장 꼴)은 달라졌지만 사람(뜻)은 그대로지요.\n\n' +
        '낱말을 바꾸고(동의어), 낱말의 종류를 바꾸고(결정하다 → 결정), 문장의 짜임을 바꾸는(때문에 → 로 인해) 세 가지 옷 갈아입히기가 있습니다.',
      check: {
        type: 'choice',
        q: '다음 바꿔 쓰기에 쓰인 기법은 무엇입니까?\n\nThe city reduced bus fares. → The city cut bus fares.',
        choices: ['동의어 바꾸기', '품사 바꾸기', '능동을 수동으로 바꾸기'],
        answer: 0,
        why: ['', 'reduce(줄이다)와 cut(줄이다)은 둘 다 동사입니다. 품사가 바뀌지 않았습니다.', '주어(The city)가 그대로이고 수동태(be p.p.)가 쓰이지 않았습니다.'],
        explain: 'reduce(줄이다) → **cut**: 뜻이 같은 낱말로 바꿨습니다. 품사와 문장 구조는 그대로이므로 **동의어 바꾸기**입니다.',
      },
    },
    {
      title: '정해진 길이에 맞춰 요약하기',
      body: '요약에는 보통 **길이 제한**이 있습니다(예: "20 words or fewer", "한 문장으로"). 길이를 맞추려면 무엇을 남기고 무엇을 뺄지 정해야 합니다.\n\n' +
        '| 남기는 것 | 빼는 것 |\n|---|---|\n' +
        '| 중심 생각(주제문) | 예시·일화 (For example, ~) |\n' +
        '| 핵심 근거·해결책 (상위어로 묶어서) | 자세한 수치·이름·날짜 (꼭 필요하지 않으면) |\n' +
        '| 결과·결론 | 되풀이된 내용, 꾸밈말 (very, really) |\n\n' +
        '자료 B(45낱말)를 한 문장으로 줄여 봅시다.\n\n' +
        '- 중심: 급식실 음식물 쓰레기가 줄었다\n' +
        '- 핵심 원인: 작은 양 고르기 + 학생 의견 묻기\n' +
        '- 요약(13낱말): **Letting students choose smaller portions and give menu opinions reduced cafeteria food waste.**\n\n' +
        '길이를 줄이는 기술입니다.\n\n' +
        '1. 사례 → 상위어 (meal plans, shopping lists → planning)\n' +
        '2. 절 → 구 (the amount of food that was thrown away → food waste)\n' +
        '3. 두 문장 → 한 문장 (원인과 결과를 하나로: A reduced B / A led to B)\n\n' +
        '> ⚠️ 길이를 맞추려고 **핵심 근거 하나를 통째로 빼면** 안 됩니다. 꾸밈말과 예시를 먼저 빼고, 그래도 길면 묶어서 줄이십시오.',
      easy: '여행 가방에 짐을 넣는데 가방이 작다고 생각해 보십시오. 여권과 지갑(중심 생각)은 꼭 넣고, 같은 티셔츠 다섯 장(되풀이)은 한 장만, 기념품 사진(예시)은 빼지요.\n\n' +
        '요약도 정해진 크기의 가방입니다. 꼭 필요한 것부터 넣고, 빠져도 뜻이 통하는 것부터 뺍니다.',
      check: {
        type: 'ox',
        q: '요약문에는 원문의 예시와 수치를 빠짐없이 모두 담아야 한다.',
        answer: false,
        explain: '요약문은 **중심 생각과 핵심 근거**를 담고, 예시·자세한 수치·되풀이된 내용은 줄이거나 뺍니다. 정해진 길이 안에서 원문의 핵심을 전하는 것이 목적입니다.',
      },
    },
    {
      title: '출처 밝히기와 쓰기 윤리',
      body: '남의 글이나 생각을 쓰면서 **출처를 밝히지 않으면 표절(plagiarism)**입니다. 내 말로 바꿔 썼어도 **생각이 남의 것이면 출처를 밝혀야** 합니다.\n\n' +
        '| 쓰는 방법 | 해야 할 일 | 예 |\n|---|---|---|\n' +
        '| **직접 인용** (원문 그대로) | 큰따옴표 + 출처 | According to Source B, food waste "dropped noticeably." |\n' +
        '| **바꿔 쓰기** (내 말로) | 출처 | Source B reports that the cafeteria\'s food waste clearly decreased. |\n' +
        '| **요약** (줄여서) | 출처 | Sources A and B suggest that preparing only what is needed reduces food waste. |\n' +
        '| 누구나 아는 사실 | 출처 없어도 됨 | Water boils at 100°C at sea level. |\n\n' +
        '출처를 밝히는 표현: **According to ~**, **~ reports / states / suggests that ~**, **As ~ points out, ~**\n\n' +
        '쓰기 윤리에서 특히 조심할 것입니다.\n\n' +
        '- **낱말 몇 개만 바꾸기**: 원문 문장 구조를 그대로 두고 낱말 몇 개만 동의어로 바꾸는 것도 베끼기입니다. 출처를 밝혀도 바람직하지 않으므로 제대로 바꿔 쓰거나 직접 인용하십시오.\n' +
        '- **자료 바꾸기 금지**: 내 주장에 맞추려고 수치나 내용을 바꾸지 않습니다.\n' +
        '- **없는 출처 금지**: 읽지 않은 자료나 존재하지 않는 출처를 지어내지 않습니다.\n\n' +
        '> 💡 쓰는 동안 자료마다 출처(누가, 무엇에, 언제)를 메모해 두면 나중에 빠뜨리지 않습니다.',
      easy: '친구의 숙제 아이디어를 빌려 썼다면 "이건 민수 생각이야"라고 밝히는 것이 예의지요. 글쓰기에서는 그 말이 **출처**입니다.\n\n' +
        '친구 문장을 낱말 몇 개만 바꿔 냈다면, 바꾼 것이 아니라 베낀 것입니다. 그대로 쓰고 싶으면 따옴표를 치고 누구 말인지 밝히고, 아니면 완전히 내 말로 다시 쓰고 출처를 밝힙니다.',
      check: {
        type: 'ox',
        q: '원문 문장에서 낱말 몇 개만 동의어로 바꾸면 출처를 밝히지 않아도 된다.',
        answer: false,
        explain: '낱말 몇 개만 바꾼 것은 여전히 **남의 문장과 생각**입니다. 출처를 밝혀야 하고, 더 좋은 방법은 제대로 바꿔 쓰거나 따옴표로 직접 인용하는 것입니다.',
      },
    },
  ],

  examples: [
    {
      q: '자료 A·B·C를 읽고, 세 자료의 내용을 묶은 한 문장 요약을 만들어 보십시오.\n\n' + SRCS,
      steps: [
        '기준을 세워 표로 정리합니다: 장소 / 까닭 / 해결 방법 (개념 카드의 표).',
        '"해결 방법"을 가로로 읽습니다: meal plans, shopping lists, smaller portions → **필요한 만큼만 준비하기** / lower prices, donations → **남는 음식 쓰기**.',
        '상위어로 묶습니다: home, school, supermarkets → **in many places**(또는 at home, at school, and in shops).',
        '내 말로 바꿔 한 문장으로 씁니다: Food waste in many places can be reduced by preparing only what is needed and finding uses for extra food.',
        '출처를 밝힙니다: According to Sources A, B, and C, ~',
      ],
      answer: 'According to Sources A, B, and C, food waste in many places can be reduced by preparing only what is needed and finding uses for extra food.',
    },
    {
      q: '다음 문장을 세 가지 기법을 섞어 바꿔 써 보십시오.\n\nBecause students could choose smaller portions, the amount of food that was thrown away decreased.',
      steps: [
        '문장 구조: because + 절 → 주어로 바꾸기. "학생들이 작은 양을 고를 수 있었던 것"을 주어로 삼습니다.',
        '품사 바꾸기: choose(동사) → choice(명사), decreased(동사) → a decrease(명사)를 쓸 수도 있습니다.',
        '동의어: the amount of food that was thrown away → food waste, decreased → fell / led to less',
        '합치기: The choice of smaller portions led to less food waste.',
        '확인: 원인(작은 양 선택)과 결과(음식물 쓰레기 감소)가 그대로이고, 수나 주체를 바꾸지 않았습니다.',
      ],
      answer: 'The choice of smaller portions led to less food waste.',
    },
  ],

  terms: [
    { term: '요약 (summary)', def: '글의 중심 생각과 핵심 근거만 남겨 짧게 줄인 글입니다. 예시와 자세한 수치는 줄이거나 뺍니다.' },
    { term: '재구성', def: '여러 자료의 내용을 기준에 따라 다시 묶고 짜는 것입니다. 표로 비교한 뒤 공통점으로 묶습니다.' },
    { term: '상위어', def: '여러 낱말을 묶는 넓은 뜻의 말입니다. 예: apples, bananas → fruit' },
    { term: '일반화', def: '구체적인 사례들에서 공통점을 뽑아 넓은 진술로 바꾸는 것입니다.' },
    { term: '바꿔 쓰기 (paraphrase)', def: '원문의 뜻은 그대로 두고 낱말과 문장 꼴을 바꿔 내 말로 다시 쓰는 것입니다.' },
    { term: '동의어 (synonym)', def: '뜻이 같거나 비슷한 낱말입니다. 예: prevent – stop, reduce – cut down' },
    { term: '출처 (source)', def: '내가 쓴 정보나 생각이 나온 곳입니다. According to ~ 처럼 밝힙니다.' },
    { term: '표절 (plagiarism)', def: '남의 글이나 생각을 출처를 밝히지 않고 내 것처럼 쓰는 것입니다. 낱말 몇 개만 바꾼 것도 해당합니다.' },
    { term: '직접 인용', def: '원문을 그대로 옮겨 쓰는 것입니다. 큰따옴표로 묶고 출처를 밝힙니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '자료 A·B·C 가운데, **남는 음식을 필요한 사람들과 나누는** 방법을 소개한 자료는 무엇입니까?\n\n' + SRCS,
      choices: ['Source C', 'Source A', 'Source B'],
      answer: 0,
      why: ['', '자료 A는 집에서 식단을 계획하고 남은 음식을 투명한 그릇에 두는 방법을 말합니다. 나누기는 없습니다.', '자료 B는 급식실에서 양을 줄이고 의견을 묻는 방법을 말합니다. 나누기는 없습니다.'],
      explain: '자료 C의 give food that is close to its expiration date to local food banks, which share it with people in need 부분이 **남는 음식을 나누는** 방법입니다.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
      q: '빈칸에 알맞은 상위어를 영어 한 낱말로 쓰십시오.\n\nApples, bananas, and grapes are all kinds of [[빈칸]].',
      answer: ['fruit', 'fruits'],
      wrong: [
        { a: 'food', why: 'food(음식)도 틀리지는 않지만 너무 넓습니다. 사과·바나나·포도를 딱 맞게 묶는 상위어를 쓰십시오.' },
        { a: 'vegetables', why: '사과·바나나·포도는 채소가 아니라 과일입니다.' },
      ],
      explain: '사과·바나나·포도를 빠짐없이, 너무 넓지 않게 묶는 상위어는 **fruit**(과일)입니다. kinds of 뒤에서 fruit, fruits 모두 쓸 수 있습니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '다음 글의 내용을 가장 잘 일반화한 문장은 무엇입니까?\n\nMinsu takes the stairs instead of the elevator. Jia walks to school every day. Seojun plays basketball after class.',
      choices: [
        'The three students stay physically active in daily life.',
        'The three students all play sports on a team.',
        'Elevators are dangerous.',
        'The three students live close to their school and walk there every morning.',
      ],
      answer: 0,
      why: [
        '',
        '농구를 하는 것은 서준뿐입니다. 계단 오르기와 걸어서 등교하기는 팀 운동이 아니므로 모든 사례를 덮지 못합니다.',
        '엘리베이터가 위험하다는 말은 글에 없습니다. 사례를 넘어선 내용입니다.',
        '걸어서 등교하는 것은 지아뿐입니다. 한 사례를 세 사람 모두에게 넓혔습니다.',
      ],
      explain: '계단 오르기, 걸어서 등교하기, 방과 후 농구는 모두 **몸을 움직이는 활동**입니다. stay physically active(몸을 활발히 움직인다)가 세 사례를 빠짐없이 덮는 일반화입니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '다음 문장을 뜻이 같게 바꿔 쓴 것으로 가장 알맞은 것은 무엇입니까?\n\nPlanning meals for the week can prevent waste.',
      choices: [
        'Weekly meal planning can stop waste.',
        'Planning meals for the week can cause waste.',
        'Planning meals for the week always prevents all waste.',
        'Buying food without a plan can stop waste.',
      ],
      answer: 0,
      why: [
        '',
        'prevent(막다)를 cause(일으키다)로 바꿔 뜻이 정반대가 되었습니다.',
        'can(~할 수 있다)을 always(언제나), waste(쓰레기)를 all waste(모든 쓰레기)로 바꿔 뜻을 세게 부풀렸습니다.',
        '주체를 "계획 없이 사기"로 바꿔 원문과 반대 내용이 되었습니다.',
      ],
      explain: 'Planning meals for the week → **Weekly meal planning**(구 구조 바꾸기), prevent → **stop**(동의어). 뜻은 그대로입니다.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'text', concept: 2,
      q: '품사를 바꿔 같은 뜻으로 고쳐 쓰려고 합니다. 빈칸에 알맞은 영어 한 낱말을 쓰십시오.\n\nThe students decided to plant trees.\n→ The students made a [[빈칸]] to plant trees.',
      answer: ['decision'],
      wrong: [
        { a: 'decide', why: 'decide(결정하다)는 동사입니다. made a 뒤에는 명사 decision(결정)이 와야 합니다.' },
        { a: 'decisive', why: 'decisive(결단력 있는)는 형용사입니다. made a 뒤에는 명사 decision(결정)이 옵니다.' },
      ],
      explain: '동사 decide(결정하다)를 명사 **decision**(결정)으로 바꾸면 made a decision to ~(~하기로 결정하다)가 됩니다. 품사 바꾸기의 대표적인 예입니다.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 4,
      q: '원문의 표현을 그대로 옮겨 쓸 때는 큰따옴표로 묶고 출처를 밝혀야 한다.',
      answer: true,
      explain: '원문 그대로 쓰는 것은 **직접 인용**입니다. 큰따옴표로 묶고 출처를 밝혀야 표절이 되지 않습니다. 예: According to Source B, food waste "dropped noticeably."',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '요약문을 쓸 때 **가장 먼저 빼도 되는** 것은 무엇입니까?',
      choices: [
        '중심 생각을 뒷받침하려고 든 예시 하나',
        '글 전체의 중심 생각',
        '글쓴이가 내린 결론',
        '중심 생각을 직접 받치고 있는 가장 중요한 근거',
      ],
      answer: 0,
      why: [
        '',
        '중심 생각은 요약에서 꼭 남겨야 하는 것입니다.',
        '결론은 글이 무엇을 말하려는지 보여 주므로 남겨야 합니다.',
        '핵심 근거는 상위어로 묶어서라도 남겨야 합니다.',
      ],
      explain: '예시는 중심 생각을 이해하기 쉽게 도와주지만, 빼도 글의 핵심은 그대로입니다. 길이를 줄일 때는 **예시·자세한 수치·되풀이된 내용**부터 뺍니다.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 3,
      q: '자료 B를 **15낱말 이하의 한 문장**으로 요약한 것으로 가장 알맞은 것은 무엇입니까?\n\n' + SRC_B,
      choices: [
        'Smaller portions and student input cut cafeteria food waste.',
        'Students used to leave about a third of their lunch uneaten in our school cafeteria last year.',
        'The cafeteria stopped serving lunch.',
        'Smaller portions cut waste.',
      ],
      answer: 0,
      why: [
        '',
        '15낱말이 넘고, 문제(남긴 양)만 말할 뿐 해결 방법과 결과가 빠졌습니다.',
        '본문에 없는 내용입니다. 급식을 멈춘 것이 아니라 양을 고르게 했습니다.',
        '짧지만 핵심 원인 하나(학생 의견 묻기)를 통째로 뺐습니다.',
      ],
      hint: '해결 방법 두 가지와 결과가 모두 들어 있는지, 길이가 맞는지 함께 보십시오.',
      explain: '**Smaller portions and student input cut cafeteria food waste.**(9낱말)는 해결 방법 두 가지(작은 양, 학생 의견)와 결과(쓰레기 감소)를 모두 담았습니다. opinions on the menu → input(의견), dropped noticeably → cut(줄였다)로 바꿔 썼습니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 2,
      q: '다음 문장의 구조를 바꿔 쓴 것으로 뜻이 같은 것은 무엇입니까?\n\nBecause it rained heavily, the soccer game was canceled.',
      choices: [
        'The soccer game was canceled due to heavy rain.',
        'Although it rained heavily, the soccer game was played.',
        'The soccer game caused heavy rain.',
        'Because the soccer game was canceled, it rained heavily.',
      ],
      answer: 0,
      why: [
        '',
        'Although(~에도 불구하고)로 바꾸고 경기를 했다고 하여 뜻이 반대가 되었습니다.',
        '원인과 결과를 뒤바꾸었습니다. 경기가 비를 내리게 한 것이 아닙니다.',
        '원인과 결과를 거꾸로 놓았습니다. 비가 원인이고 취소가 결과입니다.',
      ],
      explain: 'Because + 절(it rained heavily) → **due to + 명사구(heavy rain)**로 구조를 바꿨습니다. rained heavily(동사+부사) → heavy rain(형용사+명사)도 품사 바꾸기입니다. 원인(비)과 결과(취소)는 그대로입니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '원문을 보고 학생들이 쓴 문장입니다. 쓰기 윤리에 비추어 **가장 바람직한** 것은 무엇입니까?\n\n원문(Source A): Storing leftovers in clear containers also helps, because people are more likely to eat food that they can see.',
      choices: [
        'Source A notes that leftovers in see-through boxes are more often eaten.',
        'Storing leftovers in clear boxes also helps, because people are more likely to eat food that they can see.',
        'Storing leftovers in clear containers also helps, because people are more likely to eat food that they can see.',
        'I discovered that leftovers in clear boxes are eaten more often.',
      ],
      answer: 0,
      why: [
        '',
        '한 낱말(containers → boxes)만 바꾸고 나머지는 그대로 옮겼으며, 출처도 없습니다. 베끼기입니다.',
        '원문을 그대로 옮기면서 따옴표도 출처도 없습니다. 표절입니다.',
        '남의 생각을 자기가 알아낸(I discovered) 것처럼 썼습니다. 출처를 밝히지 않았습니다.',
      ],
      explain: '**Source A notes that ~**로 출처를 밝히고, clear containers → see-through boxes(동의어), people are more likely to eat → are more often eaten(구조 바꾸기)으로 제대로 바꿔 썼습니다.',
    },
    {
      id: 'p11', level: 2, type: 'order', concept: 0,
      q: '여러 자료를 재구성해 요약하는 순서대로 놓으십시오.',
      choices: [
        '자료마다 중심 생각과 핵심 내용을 찾는다',
        '같은 기준으로 표에 비교 정리한다',
        '공통점을 상위어로 묶어 일반화한다',
        '정해진 길이에 맞춰 내 말로 요약문을 쓴다',
        '출처를 밝히고 뜻이 바뀌지 않았는지 점검한다',
      ],
      answer: [0, 1, 2, 3, 4],
      explain: '읽고 핵심 찾기 → 표로 비교 → 상위어로 묶기 → 내 말로 길이에 맞춰 쓰기 → 출처·뜻 점검. 표와 상위어 단계가 여러 자료를 "재구성"하는 핵심입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 0,
      q: '자료 A·B·C의 내용을 하나로 묶은 요약으로 가장 알맞은 것은 무엇입니까?\n\n' + SRCS,
      choices: [
        'Preparing only what is needed and using extra food can cut food waste.',
        'Supermarkets are the main cause of food waste in every country around the world.',
        'Students waste more food at school than families waste at home.',
        'Planning meals for the week is the only way to reduce food waste at home.',
      ],
      answer: 0,
      why: [
        '',
        '세 자료 어디에도 슈퍼마켓이 주된 원인이라는 말이나 모든 나라 이야기는 없습니다.',
        '집과 학교의 쓰레기 양을 비교한 자료는 없습니다. 근거 없는 비교입니다.',
        '자료 A 하나의 내용이고, only(유일한)는 지나친 말입니다. 자료 A도 투명한 그릇이라는 다른 방법을 말합니다.',
      ],
      explain: '세 자료의 해결 방법을 묶으면 **필요한 만큼만 준비하기**(식단 계획, 작은 양)와 **남는 음식 다시 쓰거나 나누기**(싸게 팔기, 푸드뱅크)입니다. 정답은 이 둘을 모두 담고, 세 장소를 덮는 일반적인 말로 썼습니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      q: '자료 A·B·C를 다음과 같이 요약했습니다. 빈칸 (A), (B)에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + SRCS + '\n\n→ Food waste at home, at school, and in shops can be reduced when the amount of food is (A) ___ to real needs and extra food is (B) ___ instead of thrown away.',
      choices: [
        '(A) matched — (B) put to use',
        '(A) increased — (B) put to use',
        '(A) matched — (B) hidden',
        '(A) compared — (B) sold at full price',
      ],
      answer: 0,
      why: [
        '',
        '양을 늘리면(increased) 오히려 쓰레기가 늘어납니다. 자료들은 필요한 만큼만 준비하라고 합니다.',
        '남는 음식을 숨기는(hidden) 것은 자료에 없습니다. 자료 C는 싸게 팔거나 나눈다고 했습니다.',
        '자료 C는 제값이 아니라 더 싸게(at lower prices) 판다고 했습니다. compared도 "필요에 맞춘다"는 뜻이 아닙니다.',
      ],
      hint: '(A)는 식단 계획·작은 양을, (B)는 싸게 팔기·나누기를 하나로 묶는 말입니다.',
      explain: '(A) 식단 계획(A)과 작은 양 고르기(B)는 음식의 양을 실제 필요에 **맞추는(matched)** 일입니다. (B) 싸게 팔기와 푸드뱅크에 주기(C)는 남는 음식을 버리지 않고 **쓰이게 하는(put to use)** 일입니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '자료 B의 마지막 문장을 바꿔 쓴 것입니다. 원문의 뜻을 **바르게 지키지 못한** 것은 무엇입니까?\n\n원문: As a result, the amount of food thrown away dropped noticeably.',
      choices: [
        'As a result, almost no food was thrown away anymore.',
        'Consequently, there was a clear drop in food waste.',
        'This led to a noticeable decrease in the food that was thrown away.',
        'Because of these changes, much less food ended up in the trash.',
      ],
      answer: 0,
      why: [
        '',
        'As a result → Consequently(동의어), dropped noticeably → a clear drop(품사·동의어)으로 뜻을 지켰습니다.',
        '결과 표현은 led to, dropped(동사)는 decrease(명사)로 바꿨을 뿐 뜻은 같습니다.',
        '"눈에 띄게 줄었다"를 "훨씬 적은 음식이 쓰레기통으로 갔다"로 바꿔 뜻을 지켰습니다.',
      ],
      hint: '줄어든 정도(noticeably)가 바꿔 쓴 문장에서 더 세지지 않았는지 보십시오.',
      explain: 'noticeably(눈에 띄게) 줄었다는 것이 **거의 버려지지 않게 되었다(almost no food)**는 뜻은 아닙니다. 줄어든 정도를 부풀린 바꿔 쓰기입니다. 바꿔 쓸 때는 정도·수·범위를 지켜야 합니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '하윤이는 보고서에 다음 문장을 썼습니다. 쓰기 윤리에 맞게 고치는 방법으로 가장 알맞은 것은 무엇입니까?\n\n원문(Source C): Some supermarkets now sell fruits and vegetables with small marks or unusual shapes at lower prices instead of throwing them out.\n\n하윤: Some stores now sell fruits and vegetables with small marks or strange shapes at cheaper prices instead of throwing them away.',
      choices: [
        '내 말로 다시 쓰고 According to Source C처럼 출처를 밝힌다.',
        '낱말 몇 개를 더 동의어로 바꾸기만 하면 되고, 그렇게 하면 출처는 밝히지 않아도 된다.',
        '원문과 내용이 같으므로 고칠 필요가 없고, 그대로 보고서에 실어도 된다.',
        '원문의 내용이 틀렸다고 보고, 내 주장에 맞게 내용과 수치를 바꿔 쓴다.',
      ],
      answer: 0,
      why: [
        '',
        '낱말을 더 바꿔도 구조와 생각은 원문 그대로입니다. 바꿔 쓴 경우에도 출처는 밝혀야 합니다.',
        '원문의 구조를 그대로 두고 낱말 몇 개(supermarkets → stores, unusual → strange)만 바꾼 데다 출처도 없어 표절입니다.',
        '자료를 마음대로 바꾸는 것은 쓰기 윤리에 어긋납니다. 원문에는 수치도 없습니다.',
      ],
      hint: '하윤이의 문장은 원문과 무엇이 얼마나 다른지, 출처가 있는지 보십시오.',
      explain: '하윤이는 원문의 구조를 그대로 두고 낱말 몇 개만 바꿨고(supermarkets → stores, unusual → strange, lower → cheaper, out → away), 출처도 밝히지 않았습니다. 제대로 바꿔 쓴 예: **According to Source C, some shops offer imperfect produce at a discount rather than wasting it.**',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'text', concept: 2,
      q: '품사를 바꿔 같은 뜻의 문장을 만들려고 합니다. 빈칸에 알맞은 영어 한 낱말을 쓰십시오.\n\nMore and more people are aware of the problem of food waste.\n→ There is growing [[빈칸]] of the problem of food waste.',
      answer: ['awareness'],
      wrong: [
        { a: 'aware', why: 'aware(알고 있는)는 형용사입니다. growing 뒤, 전치사 of 앞에는 명사가 와야 합니다.' },
        { a: 'awake', why: 'awake(깨어 있는)는 뜻이 다른 낱말입니다. aware(알고 있는)의 명사는 awareness입니다.' },
      ],
      hint: '형용사 aware(알고 있는)를 명사로 바꾸면 어떤 꼴이 됩니까?',
      explain: '형용사 aware(알고 있는)를 명사 **awareness**(인식)로 바꿨습니다. More and more people are aware → There is growing awareness(인식이 커지고 있다). 품사와 문장 구조를 함께 바꾼 바꿔 쓰기입니다.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 3,
      q: '다음 글을 **20낱말 이하의 한 문장**으로 요약하려고 합니다. 가장 알맞은 것은 무엇입니까?\n\nMany people think that reading is only for gaining information. However, reading stories can also help us understand other people\'s feelings. When we follow a character through difficult moments, we imagine how that person feels. Studies of young readers suggest that this kind of practice may make people more caring toward others in real life.',
      choices: [
        'Reading stories lets us imagine others\' feelings and may make us more caring.',
        'Reading is only for gaining information, as many people think.',
        'When we follow a character through difficult moments, we imagine how that person feels in many stories.',
        'Stories always make every reader kind.',
      ],
      answer: 0,
      why: [
        '',
        '글쓴이가 However 문장에서 반박한 통념을 요약으로 삼았습니다. 중심 생각과 반대입니다.',
        '한 과정(인물을 따라가며 상상하기)만 말하고, 결론(더 배려하게 될 수 있다)이 빠졌습니다. 원문을 거의 그대로 옮겼습니다.',
        'may(~일 수 있다)를 always(언제나), every reader(모든 독자)로 부풀렸습니다.',
      ],
      hint: 'However 뒤의 중심 생각과 마지막 문장의 결론을 모두 담되, 조심스러운 말(may)을 지키십시오.',
      explain: '중심 생각(이야기 읽기는 다른 사람의 감정을 이해하게 돕는다)과 결론(더 배려하는 사람이 될 수 있다)을 13낱말로 담았습니다. help us understand → lets us imagine, more caring toward others → more caring처럼 줄였고, **may**(~일 수 있다)를 지켜 원문의 조심스러운 태도를 바꾸지 않았습니다.',
    },
  ],

  deeper: [
    {
      title: '요약은 재구성이다: 순서를 바꿔도 되는 까닭',
      body: '한 자료를 요약할 때는 원문의 순서를 따라가도 되지만, **여러 자료를 묶을 때는 순서를 새로 짭니다.** 자료 A·B·C를 A → B → C 순서로 하나씩 요약해 이어 붙이면 그것은 요약이 아니라 "요약 세 개"입니다.\n\n' +
        '재구성한 요약은 **공통 주제 → 공통점 → (필요하면) 다른 점** 순서로 짭니다.\n\n' +
        '- 공통 주제: Food waste happens at home, at school, and in shops.\n' +
        '- 공통점: In each place, it can be reduced by preparing only what is needed and using extra food.\n' +
        '- 다른 점: Families can plan meals, schools can offer smaller portions, and shops can sell or donate extra food.\n\n' +
        '이렇게 하면 읽는 사람이 세 자료를 따로 읽지 않아도 전체 그림을 얻습니다. 영어Ⅰ의 "요약문 완성하기"가 한 글의 요약이었다면, 이 단원은 여러 글을 다시 짜는 한 단계 위의 요약입니다.',
    },
    {
      title: '출처를 밝히는 여러 방식',
      body: '학교 보고서나 대학 과제에서는 출처를 밝히는 **정해진 방식(인용 양식)**을 쓰기도 합니다. 분야마다 방식이 조금씩 다르지만, 공통으로 담는 정보는 비슷합니다.\n\n' +
        '- **누가** 썼는가 (글쓴이·기관)\n' +
        '- **무엇에** 실렸는가 (책·기사·웹사이트 이름)\n' +
        '- **언제** 나왔는가 (발행 연도·날짜)\n' +
        '- 웹 자료라면 **어디서** 볼 수 있는가 (주소, 확인한 날짜)\n\n' +
        '글 안에서는 According to the city library\'s report, ~ 처럼 짧게 밝히고, 글 끝의 **참고 자료 목록**에 자세한 정보를 적습니다. 어떤 방식을 쓰든 핵심은 같습니다. 읽는 사람이 **원래 자료를 찾아가 확인할 수 있게** 하는 것입니다.',
    },
  ],

  faq: [
    {
      q: '바꿔 쓰기를 했는데도 출처를 밝혀야 해요?',
      a: '네. 바꿔 쓴 것은 문장이지 생각이 아닙니다. 그 생각이나 정보가 다른 사람의 글에서 왔다면 출처를 밝혀야 합니다. 출처를 밝히지 않아도 되는 것은 누구나 아는 사실(물은 해수면에서 100°C에서 끓는다 등)이나 내가 직접 생각해 낸 것뿐입니다.',
    },
    {
      q: '상위어가 너무 넓은지 좁은지 어떻게 알아요?',
      a: '두 가지를 확인하십시오. 첫째, 모든 사례가 그 상위어에 들어가는가(빠지는 사례가 있으면 너무 좁다). 둘째, 사례와 관계없는 것까지 너무 많이 들어가지 않는가(things, activities처럼 무엇이든 되는 말은 너무 넓다). 글의 주제에 맞춰 꾸밈말을 붙이면(eco-friendly ways to travel) 알맞은 넓이가 됩니다.',
    },
    {
      q: '요약할 때 원문 낱말을 하나도 쓰면 안 돼요?',
      a: '그렇지 않습니다. food waste, cafeteria처럼 바꿀 말이 마땅치 않은 핵심 용어나 고유한 이름은 그대로 써도 됩니다. 피해야 할 것은 원문의 문장 구조를 그대로 두고 낱말 몇 개만 바꾸는 것입니다.',
    },
  ],

  mistakes: [
    '여러 자료를 A, B, C 순서로 따로 요약해 이어 붙이는 실수 — 표로 비교한 뒤 공통점을 중심으로 다시 짜야 합니다.',
    '바꿔 쓰면서 정도·수·범위를 바꾸는 실수 — noticeably(눈에 띄게) → almost completely(거의 완전히), some(일부) → all(모두), may(~일 수 있다) → always(언제나)처럼 바꾸면 뜻이 달라집니다.',
    '낱말 몇 개만 동의어로 바꾸고 출처를 밝히지 않는 실수 — 문장 구조까지 바꿔 내 말로 쓰고, 생각을 빌렸다면 출처를 밝히십시오.',
  ],

  gens: [
    {
      id: 'hypernym',
      level: 1,
      title: '사례를 묶는 상위어 고르기',
      make: function (R) {
        // [사례, 정답, 너무 좁은 말, 관계없는 말, 너무 넓은 말]
        var items = [
          ['apples, bananas, grapes', 'fruit', 'tropical fruit', 'vegetables', 'things'],
          ['walking, cycling, taking the bus', 'ways to travel', 'sports', 'ways to cook', 'actions'],
          ['a hammer, a saw, a screwdriver', 'tools', 'cutting tools', 'toys', 'objects'],
          ['a violin, a drum, a flute', 'musical instruments', 'string instruments', 'kitchen tools', 'items'],
          ['anger, joy, fear', 'emotions', 'negative emotions', 'colors', 'words'],
          ['a fever, a cough, a sore throat', 'symptoms of illness', 'throat problems', 'school subjects', 'things'],
          ['newspapers, radio, television', 'mass media', 'printed media', 'sports', 'stuff'],
          ['recycling paper, saving water, planting trees', 'protecting the environment', 'saving water', 'making money', 'doing things'],
          ['earthquakes, floods, storms', 'natural disasters', 'weather events', 'holidays', 'events'],
          ['math, history, science', 'school subjects', 'science subjects', 'hobbies', 'ideas'],
          ['turning off lights, unplugging chargers, using a fan instead of air conditioning', 'saving energy', 'cooling a room', 'buying electronics', 'habits'],
          ['planning meals, making a shopping list, storing leftovers well', 'reducing food waste at home', 'making a shopping list', 'eating out', 'daily activities'],
          ['a doctor, a nurse, a pharmacist', 'health workers', 'hospital doctors', 'athletes', 'people'],
          ['lions, eagles, sharks', 'animals that hunt', 'big cats', 'pets', 'living things'],
          ['smiling, nodding, waving', 'body language', 'facial expressions', 'spoken words', 'movements'],
        ];
        var it = R.pick(items);
        var correct = it[1];
        var reason = {};
        reason[it[2]] = '"' + it[2] + '"은(는) 너무 좁습니다. 사례 가운데 이 말에 들어가지 않는 것이 있습니다.';
        reason[it[3]] = '"' + it[3] + '"은(는) 사례와 관계없는 묶음입니다.';
        reason[it[4]] = '"' + it[4] + '"은(는) 너무 넓습니다. 무엇이든 들어갈 수 있어 요약에 쓸모가 없습니다.';
        var pick = R.choices(correct, [it[2], it[3], it[4]], 4);
        return {
          type: 'choice', concept: 1,
          q: '다음 사례를 빠짐없이, 알맞은 넓이로 묶는 상위어는 무엇입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c].replace('"' + c + '"은(는)', '이 보기는'); }),
          explain: '사례: ' + it[0] + '\n\n모든 사례를 덮으면서 너무 넓지 않은 말: **' + correct + '**',
        };
      },
    },
    {
      id: 'paraphrase-technique',
      level: 2,
      title: '바꿔 쓰기에 쓰인 기법 알아보기',
      make: function (R) {
        var T = ['동의어 바꾸기', '품사 바꾸기', '문장 구조 바꾸기'];
        var HOW = [
          '낱말을 뜻이 같은 다른 낱말로 바꿨습니다.',
          '낱말의 품사(동사 ↔ 명사, 형용사 ↔ 명사 등)를 바꿨습니다.',
          '문장의 짜임(능동 ↔ 수동, 절 → 구, 두 문장 → 한 문장)을 바꿨습니다.',
        ];
        // [원문, 바꿔 쓴 문장, 기법 번호, 바뀐 곳]
        var items = [
          ['The museum is very popular.', 'The museum is very well-liked.', 0, 'popular → well-liked'],
          ['We need to reduce plastic use.', 'We need to cut down on plastic use.', 0, 'reduce → cut down on'],
          ['The test was difficult.', 'The test was hard.', 0, 'difficult → hard'],
          ['She started a new club.', 'She began a new club.', 0, 'started → began'],
          ['Many people attended the concert.', 'Many people went to the concert.', 0, 'attended → went to'],
          ['The students decided to plant trees.', 'The students made a decision to plant trees.', 1, 'decided(동사) → decision(명사)'],
          ['Sleep is important.', 'Sleep is of great importance.', 1, 'important(형용사) → importance(명사)'],
          ['He explained the rules clearly.', 'He gave a clear explanation of the rules.', 1, 'explained(동사) → explanation(명사), clearly(부사) → clear(형용사)'],
          ['People are aware of the problem.', 'People have an awareness of the problem.', 1, 'aware(형용사) → awareness(명사)'],
          ['She answered quickly.', 'She gave a quick answer.', 1, 'answered(동사) → answer(명사), quickly(부사) → quick(형용사)'],
          ['The city built a new library.', 'A new library was built by the city.', 2, '능동태 → 수동태'],
          ['Sua gave Jun a book.', 'Sua gave a book to Jun.', 2, '두 목적어(Jun, a book)의 순서와 문장 형식'],
          ['Minsu has a dog. The dog is very smart.', 'Minsu has a very smart dog.', 2, '두 문장 → 한 문장'],
          ['Jia studied hard. She passed the exam.', 'Jia passed the exam after studying hard.', 2, '두 문장 → 한 문장'],
          ['Volunteers cleaned the beach.', 'The beach was cleaned by volunteers.', 2, '능동태 → 수동태'],
          ['It is easy to learn this song.', 'This song is easy to learn.', 2, 'It is ~ to … 구조 → 주어를 앞으로'],
        ];
        var it = R.pick(items);
        var correct = T[it[2]];
        var pick = R.choices(correct, T.filter(function (t) { return t !== correct; }), 3);
        return {
          type: 'choice', concept: 2,
          q: '다음 바꿔 쓰기에 **주로** 쓰인 기법은 무엇입니까?\n\n' + it[0] + '\n→ ' + it[1],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : '이 바꿔 쓰기에서 바뀐 곳은 ' + it[3] + '입니다. ' + HOW[it[2]]; }),
          explain: '바뀐 곳: ' + it[3] + ' → **' + correct + '**. ' + HOW[it[2]],
        };
      },
    },
  ],

  vocab: [
    { w: 'summary', m: '요약(문)', ex: 'Write a summary of the article in 30 words.', exm: '그 기사의 요약문을 30낱말로 쓰십시오.' },
    { w: 'paraphrase', m: '바꿔 쓰다; 바꿔 쓴 말', ex: 'Paraphrase the sentence in your own words.', exm: '그 문장을 여러분의 말로 바꿔 쓰십시오.' },
    { w: 'synonym', m: '동의어', ex: '"Begin" is a synonym for "start."', exm: 'begin = start: 두 낱말은 동의어입니다.' },
    { w: 'generalize', m: '일반화하다', ex: 'It is hard to generalize from only one example.', exm: '예 하나만으로 일반화하기는 어렵습니다.' },
    { w: 'category', m: '범주, 부류', ex: 'Put these words into three categories.', exm: '이 낱말들을 세 범주로 나누십시오.' },
    { w: 'compare', m: '비교하다', ex: 'Compare the two sources before you write.', exm: '쓰기 전에 두 자료를 비교하십시오.' },
    { w: 'essential', m: '꼭 필요한, 핵심적인', ex: 'Keep only the essential information.', exm: '꼭 필요한 정보만 남기십시오.' },
    { w: 'cite', m: '(출처를) 밝히다, 인용하다', ex: 'You must cite the source of this data.', exm: '이 자료의 출처를 밝혀야 합니다.' },
    { w: 'quotation', m: '인용(문)', ex: 'Put the exact words in quotation marks.', exm: '원문 그대로의 말은 따옴표 안에 넣으십시오.' },
    { w: 'plagiarism', m: '표절', ex: 'Copying someone\'s writing without credit is plagiarism.', exm: '남의 글을 출처 없이 베끼는 것은 표절입니다.' },
    { w: 'leftover', m: '남은 음식', ex: 'We had the leftovers for lunch the next day.', exm: '우리는 다음 날 점심으로 남은 음식을 먹었습니다.' },
    { w: 'portion', m: '(음식의) 1인분, 몫', ex: 'You can choose a smaller portion.', exm: '더 적은 양을 고를 수 있습니다.' },
    { w: 'donate', m: '기부하다', ex: 'The shop donates extra bread to a shelter.', exm: '그 가게는 남는 빵을 보호 시설에 기부합니다.' },
    { w: 'reduce', m: '줄이다', ex: 'Small changes can reduce waste.', exm: '작은 변화가 쓰레기를 줄일 수 있습니다.' },
    { w: 'decrease', m: '줄다; 감소', ex: 'There was a decrease in the number of accidents.', exm: '사고 수가 줄었습니다.' },
    { w: 'word limit', m: '글자(낱말) 수 제한', ex: 'Your summary must be within the word limit.', exm: '요약문은 낱말 수 제한 안에 들어야 합니다.' },
  ],
});
})();
