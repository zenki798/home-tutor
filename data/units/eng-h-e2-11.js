/* 영어Ⅱ · 협력하며 토론하기
 * 예문·지문은 모두 직접 쓴 글이다(가상의 학생·가상의 학급 토론). */
(function () {
  // 짧은 글: 학급 찬반 토론의 한 장면 (직접 쓴 대화)
  var DEBATE = 'Moderator: Today\'s resolution is "Our school should replace paper textbooks with tablets." First, the affirmative side will give its constructive speech.\n' +
    'Minsu (Affirmative): We believe tablets are better for learning. First, one tablet can hold every textbook, so students will not have to carry heavy bags. Second, tablets can show videos and update information quickly.\n' +
    'Jia (Negative): We disagree. Looking at screens for many hours can make students\' eyes tired. Also, tablets are expensive to buy and repair.\n' +
    'Moderator: Thank you. Now we will move on to rebuttals.\n' +
    'Seojun (Negative): May I ask a question first? Do you mean that students would use tablets in every class?\n' +
    'Minsu (Affirmative): Not exactly. We mean that tablets would replace textbooks, but teachers could still use paper worksheets.\n' +
    'Seojun (Negative): That\'s a fair point, but students might still be distracted by games on the tablets.\n' +
    'Hayun (Affirmative): I see what you mean. However, the school can install a program that blocks games during class.\n' +
    'Moderator: Thank you. Now each side will give its closing statement.';

  // 생성기 1: 토론에서 말의 역할 [말, 역할]
  var LINES = [
    ['May I add something?', 'get'],
    ['Could I say something here?', 'get'],
    ['Excuse me, may I ask a question?', 'get'],
    ['Sorry to interrupt, but can I jump in for a second?', 'get'],
    ['What do you think, Jia?', 'give'],
    ["That's all from me. Over to you, Seojun.", 'give'],
    ['Go ahead, please. I am listening.', 'give'],
    ['Would anyone on the other side like to respond?', 'give'],
    ['Do you mean that students should never use phones at school?', 'clarify'],
    ["If I understand correctly, you're saying that the cost is too high.", 'clarify'],
    ['Could you explain what you mean by "fair"?', 'clarify'],
    ['Could you give us an example of that?', 'clarify'],
    ["That's a fair point, but the plan would save money in the long run.", 'rebut'],
    ['I see what you mean. However, the survey shows the opposite.', 'rebut'],
    ['I understand your concern, but there is a simple solution.', 'rebut'],
    ["I'm afraid I disagree, because the data you used is ten years old.", 'rebut'],
    ['Before the debate, I thought tablets were perfect. Now I see some problems.', 'reflect'],
    ['I still support the plan, but I now understand the worries about cost.', 'reflect'],
    ["The most convincing argument for me was the other team's point about eye health.", 'reflect'],
    ['After hearing both sides, I changed my mind about the school uniform rule.', 'reflect'],
  ];
  var ROLE = { get: '발언 기회 얻기', give: '발언 기회 넘기기', clarify: '상대의 말 확인하기', rebut: '정중하게 반박하기', reflect: '토론 뒤 생각 다시 정리하기' };
  var ROLE_CONCEPT = { get: 1, give: 1, clarify: 2, rebut: 3, reflect: 4 };
  var ROLE_HINT = {
    get: 'May I ~?, Could I ~?, Can I jump in?처럼 허락을 구하며 말할 차례를 얻고 있습니다.',
    give: 'What do you think, ~?, Over to you, Go ahead처럼 다른 사람에게 말할 차례를 넘기고 있습니다.',
    clarify: 'Do you mean that ~?, If I understand correctly, Could you explain ~?처럼 상대가 한 말의 뜻을 확인하고 있습니다.',
    rebut: "That's a fair point, but ~, I see what you mean. However, ~, I'm afraid I disagree, because ~처럼 상대를 존중하는 말로 반대 의견을 밝히고 근거를 대고 있습니다.",
    reflect: 'Before the debate, I thought ~, I still ~, but I now understand ~, I changed my mind처럼 토론이 끝난 뒤 내 생각이 어떻게 바뀌었는지(또는 그대로인지) 정리하고 있습니다.',
  };

  // 생성기 2: 토론의 단계 [말, 단계]
  var STAGE_LINES = [
    ['We are on the affirmative side, and we have two reasons to support the resolution.', 'constructive'],
    ['Our first argument is that tablets make bags much lighter.', 'constructive'],
    ['In our constructive speech, we will show why the school should keep paper textbooks.', 'constructive'],
    ['We stand on the negative side. Our main argument is that tablets cost too much.', 'constructive'],
    ['Let me respond to the negative side\'s point about cost.', 'rebuttal'],
    ['The other team said that screens hurt our eyes, but that is true only if we use them all day.', 'rebuttal'],
    ['Our opponents claimed that games are a problem. However, games can be blocked.', 'rebuttal'],
    ['There is a problem with the evidence the affirmative side gave.', 'rebuttal'],
    ['In closing, we have shown that tablets make learning easier and cheaper in the long run.', 'closing'],
    ['To sum up our position, paper textbooks are still the safer choice.', 'closing'],
    ['For all these reasons, we ask you to vote for the affirmative side.', 'closing'],
    ['Let me finish by repeating our two main points.', 'closing'],
  ];
  var STAGE = { constructive: '입론', rebuttal: '반론', closing: '최종 발언' };
  var STAGE_HINT = {
    constructive: '우리 측의 입장(affirmative/negative)과 주장·근거를 처음으로 내놓고 있습니다.',
    rebuttal: 'the other team, our opponents, the affirmative side gave, respond to처럼 상대 측이 한 말을 짚어 그 약점을 반박하고 있습니다.',
    closing: 'In closing, To sum up, Let me finish처럼 새 근거 없이 우리 측의 핵심을 다시 정리하고 있습니다.',
  };

Tutor.registerUnit({
  id: 'eng-h-e2-11',
  course: 'eng-h-e2',
  title: '협력하며 토론하기',
  summary: '찬반 토론의 순서(입론-반론-최종 발언)를 알고, 발언 순서를 지키며 상대의 말을 확인하고 정중하게 반박하는 표현으로 의견을 주고받은 뒤, 토론을 마치고 내 생각을 다시 정리합니다.',
  goals: [
    '찬반 토론이 입론-반론-최종 발언의 순서로 진행됨을 알고 단계마다 알맞은 말을 할 수 있다.',
    '발언 기회를 정중하게 얻고 넘기며 발언 순서를 지킬 수 있다.',
    '상대의 말을 확인하는 질문을 하고, 상대를 존중하며 반박할 수 있다.',
    '토론을 마친 뒤 들은 내용을 바탕으로 내 생각을 다시 정리해 말할 수 있다.',
  ],
  standards: ['[12영Ⅱ-02-09]'],

  concepts: [
    {
      title: '찬반 토론의 순서',
      body: '찬반 토론(debate)은 하나의 **논제(resolution)**를 두고 **찬성 측(affirmative)**과 **반대 측(negative)**이 정해진 순서와 시간에 따라 말하는 활동입니다. **사회자(moderator)**가 순서를 안내하고 시간을 잽니다.\n\n' +
        '| 단계 | 하는 일 | 자주 쓰는 표현 |\n|---|---|---|\n' +
        '| **입론**(constructive speech) | 우리 측의 주장과 근거를 처음으로 내놓음 | We are on the affirmative side. / Our first argument is that ~. |\n' +
        '| **반론**(rebuttal) | 상대 측 주장의 약점을 짚어 반박하고, 우리 주장을 지킴 | Let me respond to the other team\'s point about ~. |\n' +
        '| **최종 발언**(closing statement) | 토론 전체를 돌아보며 우리 측의 핵심을 다시 정리함 | In closing, ~. / To sum up our position, ~. |\n\n' +
        '대회나 수업마다 반론 단계를 질문(교차 조사)과 반박으로 나누기도 하고, 시간과 발언 횟수도 조금씩 다릅니다. 하지만 **입론 → 반론 → 최종 발언**의 큰 흐름은 같습니다.\n\n' +
        '> ⚠️ 최종 발언은 정리하는 자리입니다. 여기서 처음 듣는 새 근거를 꺼내면 상대가 반박할 기회가 없으므로, 보통 이미 나온 내용을 바탕으로 마무리합니다.',
      easy: '토론을 3막짜리 연극이라고 생각해 보십시오.\n\n' +
        '1막(입론): 두 주인공이 각자 "나는 이렇게 생각해, 왜냐하면 ~"이라고 자기소개를 합니다.\n' +
        '2막(반론): 서로의 말에서 빈틈을 찾아 주고받습니다.\n' +
        '3막(최종 발언): 막이 내리기 전, 각자 "결국 내 말의 핵심은 이것"이라고 정리합니다.\n\n' +
        '3막에서 갑자기 새 인물이 나오면 관객이 혼란스럽듯, 최종 발언에서 새 근거를 꺼내지 않습니다.',
      check: {
        type: 'choice',
        q: '찬반 토론에서 상대 측 주장의 약점을 짚어 받아치는 단계는 무엇입니까?',
        choices: ['반론(rebuttal)', '입론(constructive speech)', '최종 발언(closing statement)'],
        answer: 0,
        why: ['', '입론은 우리 측의 주장과 근거를 처음으로 내놓는 단계입니다.', '최종 발언은 우리 측의 핵심을 다시 정리하며 마무리하는 단계입니다.'],
        explain: '상대 측이 입론에서 낸 주장의 약점을 짚어 반박하는 단계는 **반론**입니다. 순서는 입론 → 반론 → 최종 발언입니다.',
      },
    },
    {
      title: '발언 기회 얻기와 넘기기',
      body: '토론은 여러 사람이 **차례를 지키며** 말해야 진행됩니다. 말할 차례를 얻을 때와 넘길 때 쓰는 표현을 익혀 둡니다.\n\n' +
        '**발언 기회 얻기**\n' +
        '- **May I add something?** (하나 덧붙여도 될까요?)\n' +
        '- **Could I say something here?**\n' +
        '- **Excuse me, may I ask a question?**\n' +
        '- **Sorry to interrupt, but** ~ (말씀 중에 죄송하지만 ~)\n\n' +
        '**발언 기회 넘기기**\n' +
        '- **What do you think,** Jia? (조용한 사람의 의견 묻기)\n' +
        '- **Go ahead.** (먼저 말씀하세요.)\n' +
        "- **That's all from me. Over to you,** Seojun. (제 말은 여기까지입니다. 서준 씨 차례입니다.)\n" +
        '- **Would anyone like to respond?**\n\n' +
        'May I ~?, Could I ~? 같은 질문은 허락을 구하는 공손한 말입니다. 사회자가 있는 토론에서는 사회자를 보고 손을 들어 허락을 받은 뒤 말합니다.\n\n' +
        '> 💡 끼어들어야 할 때도 상대의 문장이 끝날 때까지 기다린 뒤 "말씀 중에 죄송하지만(Sorry to interrupt, but ~)"으로 시작하면 무례하게 들리지 않습니다.',
      easy: '토론에는 **보이지 않는 마이크** 하나가 있다고 생각해 보십시오.\n\n' +
        '- 마이크를 달라고 할 때: "May I add something?"\n' +
        '- 마이크를 건넬 때: "What do you think, Jia?" / "Over to you."\n\n' +
        '마이크를 빼앗지 않고 정중하게 주고받는 것이 토론의 기본 예절입니다.',
      check: {
        type: 'choice',
        q: '다른 사람에게 **말할 차례를 넘기는** 말은 무엇입니까?',
        choices: ["That's all from me. Over to you, Seojun.", 'May I add something to what Minsu just said?', 'Excuse me, may I ask a question about your second point?'],
        answer: 0,
        why: ['', '하나 덧붙여도 되는지 묻는 말로, 내가 발언 기회를 얻는 표현입니다.', '질문해도 되는지 묻는 말로, 내가 발언 기회를 얻는 표현입니다.'],
        explain: '"제 말은 여기까지입니다(That\'s all from me.)"로 내 발언을 마치고 "서준 씨 차례입니다(Over to you, Seojun.)"로 차례를 넘깁니다.',
      },
    },
    {
      title: '상대의 말 확인하기',
      body: '반박하기 전에 먼저 **상대가 정확히 무엇을 말했는지** 확인해야 합니다. 상대의 말을 잘못 이해한 채 반박하면, 상대가 하지도 않은 주장을 공격하게 됩니다.\n\n' +
        '| 표현 | 쓰임 |\n|---|---|\n' +
        '| **Do you mean that** ~? | 내가 이해한 뜻이 맞는지 묻기 |\n' +
        "| **If I understand correctly,** you're saying that ~. | 상대의 말을 내 말로 정리해 확인하기 |\n" +
        "| **So what you're saying is that** ~, right? | 상대의 말을 요약해 확인하기 |\n" +
        '| **Could you explain what you mean by** ~? | 낱말이나 표현의 뜻 묻기 |\n' +
        '| **Could you give an example?** | 예를 들어 달라고 하기 |\n\n' +
        'Do you mean that 뒤에는 주어와 동사를 갖춘 절이 옵니다. Do you mean that **students would use** tablets in every class?\n\n' +
        '> ⚠️ 상대의 주장을 일부러 과장하거나 비틀어 공격하기 쉬운 모양으로 바꾼 뒤 반박하는 것을 **허수아비 공격의 오류(straw man)**라고 합니다. 확인 질문은 이 오류를 막아 줍니다.',
      easy: '친구가 "주말에 숙제를 줄였으면 좋겠어."라고 했는데 "그럼 공부를 아예 하지 말자는 거야?"라고 받아치면 친구는 억울합니다. 그런 말은 하지 않았으니까요.\n\n' +
        '"주말 숙제를 **줄이자는** 말이지? **없애자는** 건 아니고?(Do you mean that ~?)" 하고 먼저 확인하면 오해 없이 대화를 이어 갈 수 있습니다.',
      check: {
        type: 'ox',
        q: '다음 말은 상대의 말을 확인하는 표현입니다.\n\nIf I understand correctly, you\'re saying that tablets are too expensive.',
        answer: true,
        explain: '"제가 바르게 이해했다면(If I understand correctly), ~라는 말씀이지요"는 상대의 말을 내 말로 정리해 뜻이 맞는지 확인하는 표현입니다.',
      },
    },
    {
      title: '정중하게 반박하기',
      body: '반박은 상대를 이기려는 공격이 아니라 **더 나은 결론을 함께 찾는 과정**입니다. 정중한 반박은 대개 세 걸음입니다.\n\n' +
        '1. **인정**: 상대 말의 옳은 부분을 먼저 인정합니다.\n' +
        '2. **반박**: 접속사(but)나 연결어(however)로 방향을 바꾸어 내 생각을 말합니다.\n' +
        '3. **근거**: 왜 그렇게 생각하는지 자료나 예를 댑니다.\n\n' +
        '| 정중한 반박 | 피해야 할 말 |\n|---|---|\n' +
        "| **That's a fair point, but** ~ | You're totally wrong. |\n" +
        '| **I see what you mean. However,** ~ | That makes no sense at all. |\n' +
        '| **I understand your concern, but** ~ | Only a child would believe that. |\n' +
        "| **I'm afraid I disagree, because** ~ | Whatever. |\n\n" +
        "예: That's a fair point, but students might still be distracted by games. **According to** our class survey, 70 percent of students play games during breaks.\n\n" +
        "> 💡 좋은 지적이라는 말(That's a fair point)은 상대 말의 **일부**를 인정하는 말이지, 내 주장을 버리고 완전히 동의한다는 뜻이 아닙니다. 그래서 대개 뒤에 접속사(but)가 따라옵니다.",
      easy: '반박을 테니스 랠리라고 생각해 보십시오. 상대가 보낸 공을 일단 **받아 주고**(인정: That\'s a fair point), 그다음 **내 쪽에서 쳐 보냅니다**(반박: but ~).\n\n' +
        '공을 받지도 않고 라켓을 던지는 것(You\'re wrong!)은 경기가 아니라 싸움입니다.',
      check: {
        type: 'choice',
        q: '상대를 존중하면서 반박하는 말은 무엇입니까?',
        choices: [
          "That's a fair point, but games can be blocked on the tablets during class.",
          "You're totally wrong, and your idea makes no sense at all.",
          'Whatever. I am not going to answer that question, because it is a waste of time.',
        ],
        answer: 0,
        why: ['', '상대를 틀렸다고 몰아붙이고 근거도 대지 않았습니다.', '대화를 끊어 버리는 말로, 반박이 아닙니다.'],
        explain: '"좋은 지적입니다(That\'s a fair point)"로 상대 말을 인정하고, but 뒤에 해결책(게임 차단)으로 반박했습니다.',
      },
    },
    {
      title: '토론을 마친 뒤 내 생각 다시 정리하기',
      body: '토론의 진짜 목적은 이기는 것이 아니라 **생각을 넓히는 것**입니다. 토론이 끝나면 들은 내용을 돌아보며 내 생각을 다시 정리합니다.\n\n' +
        '**생각이 바뀌었을 때**\n' +
        '- **Before the debate, I thought** ~. **After hearing** ~, **I now think** ~.\n' +
        '- **I changed my mind because** ~.\n\n' +
        '**생각은 같지만 넓어졌을 때**\n' +
        '- **I still believe** ~, **but I now understand** ~.\n\n' +
        '**가장 설득력 있던 주장 돌아보기**\n' +
        '- **The most convincing argument for me was** ~ **because** ~.\n\n' +
        '생각을 바꾸는 것은 지는 것이 아닙니다. 더 좋은 근거를 만나 생각을 고친 것은 토론이 제 역할을 했다는 뜻입니다. 생각이 그대로여도, 상대 측의 걱정을 이해하게 되었다면 그것도 배움입니다.\n\n' +
        '> 💡 정리할 때는 "누가 이겼나"보다 "어떤 근거가 왜 설득력 있었나"를 씁니다.',
      easy: '토론을 마친 뒤의 정리는 등산 뒤에 찍은 사진을 보며 쓰는 일기와 같습니다.\n\n' +
        '"올라가기 전에는 그냥 힘들기만 할 줄 알았다(Before, I thought ~). 그런데 정상에서 보니 생각이 달라졌다(Now I think ~)."\n\n' +
        '토론 전의 나와 토론 뒤의 나를 나란히 놓고 비교해 보면 됩니다.',
      check: {
        type: 'choice',
        q: '토론을 마친 뒤 **내 생각을 다시 정리하는** 말은 무엇입니까?',
        choices: [
          'Before the debate, I supported tablets. Now I worry more about eye health.',
          'Do you mean that students would use tablets in every single class?',
          "That's a fair point, but the school can easily block all games on the tablets during every class.",
        ],
        answer: 0,
        why: ['', '토론 중에 상대의 말을 확인하는 질문입니다.', '토론 중에 상대 말을 인정하고 반박하는 말입니다.'],
        explain: '"토론 전에는 ~(Before the debate, I ~)", "지금은 ~(Now I ~)"로 토론 전후의 생각을 비교해 정리했습니다.',
      },
    },
  ],

  examples: [
    {
      q: '토론 중에 상대 측이 "태블릿은 학생에게 나쁘다(Tablets are bad for students.)"라고 말했습니다. 바로 반박하지 말고 먼저 뜻을 확인한 뒤, 정중하게 반박하는 두 마디를 만들어 보십시오.',
      steps: [
        '상대의 말이 넓고 막연합니다. 어떤 점이 나쁘다는 것인지 확인 질문을 합니다: Do you mean that tablets are bad for students\' eyes?',
        '상대가 "네(Yes.)"라고 답했다고 합시다. 상대 걱정의 옳은 부분을 먼저 인정합니다: That\'s a fair point,',
        'but 뒤에 내 생각과 근거를 댑니다: but if students use tablets for less than two hours a day, the risk is small.',
      ],
      answer: "A: Do you mean that tablets are bad for students' eyes?\nB: Yes.\nA: That's a fair point, but if students use tablets for less than two hours a day, the risk is small.",
    },
    {
      q: '다음 토론 장면을 읽고, 사회자의 말을 실마리로 토론의 단계를 나누어 보십시오. 그리고 확인 질문과 정중한 반박이 나온 곳을 찾아보십시오.\n\n' + DEBATE,
      steps: [
        '입론: 사회자가 찬성 측 입론 차례를 안내한(the affirmative side will give its constructive speech) 뒤, 민수(찬성)와 지아(반대)가 각 측의 주장과 근거를 처음으로 내놓습니다.',
        '반론: 사회자가 반론으로 넘어간다고 안내한(Now we will move on to rebuttals.) 뒤부터입니다.',
        '확인 질문: 서준이 먼저 질문해도 되는지 물어(May I ask a question first?) 발언 기회를 얻고, 확인 질문(Do you mean that ~?)으로 찬성 측 주장의 범위를 확인합니다.',
        '정중한 반박: 서준의 That\'s a fair point, but ~, 하윤의 I see what you mean. However, ~',
        '최종 발언: 사회자가 최종 발언 차례를 안내하며(Now each side will give its closing statement.) 마지막 단계로 넘어갑니다.',
      ],
      answer: '입론(민수·지아) → 반론(서준의 확인 질문과 반박, 민수의 답, 하윤의 반박) → 최종 발언(사회자가 안내)',
    },
  ],

  terms: [
    { term: '찬반 토론(debate)', def: '하나의 논제를 두고 찬성 측과 반대 측이 정해진 순서와 시간에 따라 근거를 들어 주장하고 반박하는 말하기입니다.' },
    { term: '논제(resolution)', def: '토론에서 찬성과 반대로 나뉘어 다루는 주제 문장입니다. 예: Our school should replace paper textbooks with tablets.' },
    { term: '찬성 측·반대 측(affirmative·negative)', def: '논제에 찬성하는 쪽과 반대하는 쪽입니다. 예: We are on the affirmative side.' },
    { term: '입론(constructive speech)', def: '토론의 첫 단계로, 각 측이 자기 주장과 근거를 처음으로 내놓는 발언입니다.' },
    { term: '반론(rebuttal)', def: '상대 측 주장의 약점을 짚어 반박하고 우리 측 주장을 지키는 단계입니다.' },
    { term: '최종 발언(closing statement)', def: '토론의 마지막 단계로, 새 근거 없이 우리 측의 핵심을 다시 정리하는 발언입니다.' },
    { term: '사회자(moderator)', def: '토론의 순서를 안내하고 발언 시간을 재며 공정하게 진행하는 사람입니다.' },
    { term: '허수아비 공격의 오류(straw man)', def: '상대의 주장을 과장하거나 비틀어 공격하기 쉬운 모양으로 바꾼 뒤 반박하는 오류입니다. 확인 질문(Do you mean that ~?)으로 막을 수 있습니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'order', concept: 0,
      q: '찬반 토론의 큰 흐름이 되도록 순서대로 놓으십시오.',
      choices: ['입론(constructive speech)', '반론(rebuttal)', '최종 발언(closing statement)'],
      answer: [0, 1, 2],
      explain: '먼저 각 측이 주장과 근거를 내놓고(입론), 서로의 약점을 짚어 반박한 뒤(반론), 핵심을 다시 정리하며 마칩니다(최종 발언).',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '찬반 토론에서 **우리 측의 주장과 근거를 처음으로 내놓는** 단계는 무엇입니까?',
      choices: ['입론', '반론', '최종 발언', '사회자의 판정'],
      answer: 0,
      why: [
        '',
        '반론은 상대 측이 이미 낸 주장을 반박하는 단계로, 입론 뒤에 옵니다.',
        '최종 발언은 마지막에 핵심을 다시 정리하는 단계입니다.',
        '판정은 토론이 끝난 뒤 하는 일로, 토론자가 주장을 내놓는 단계가 아닙니다.',
      ],
      explain: '**입론**(constructive speech)에서 각 측이 처음으로 주장과 근거를 내놓습니다. 예: We are on the affirmative side. Our first argument is that ~.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 0,
      q: '최종 발언에서는 지금까지 말하지 않은 새로운 근거를 되도록 많이 꺼내는 것이 좋습니다.',
      answer: false,
      explain: '최종 발언은 이미 나온 내용을 바탕으로 우리 측의 핵심을 **정리하는** 자리입니다. 새 근거를 꺼내면 상대가 반박할 기회가 없어 공정하지 않으므로 보통 피합니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 1,
      q: '토론 중에 **발언 기회를 얻으려고** 할 때 알맞은 말은 무엇입니까?',
      choices: [
        'May I add something?',
        'What do you think, Jia?',
        "That's all from me. Over to you.",
        'Would anyone else like to respond?',
      ],
      answer: 0,
      why: [
        '',
        '지아에게 의견을 묻는 말로, 발언 기회를 넘기는 표현입니다.',
        '내 발언을 마치고 차례를 넘기는 표현입니다.',
        '다른 사람에게 대답할 기회를 주는 표현입니다.',
      ],
      explain: '"하나 덧붙여도 될까요?(**May I add something?**)"는 허락을 구하며 말할 차례를 얻는 공손한 표현입니다.',
    },
    {
      id: 'p5', level: 1, type: 'short', concept: 1,
      q: '"제가 하나 덧붙여도 될까요?"라는 뜻이 되도록 빈칸에 한 낱말을 쓰십시오.\n\nMay I [[빈칸]] something?',
      answer: ['add'],
      wrong: [
        { a: 'say', why: '"말해도 될까요?"라는 뜻이 됩니다. "덧붙이다"에 해당하는 낱말은 add입니다.' },
        { a: 'ask', why: '"물어봐도 될까요?"라는 뜻이 됩니다. "덧붙이다"에 해당하는 낱말은 add입니다.' },
      ],
      explain: '"덧붙이다, 더하다"라는 뜻의 낱말이 **add**입니다. 이 표현(May I add something?)은 다른 사람의 말에 내 생각을 보태고 싶을 때 차례를 얻는 표현입니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 2,
      q: '토론에서 다음 말은 어떤 역할을 합니까?\n\nDo you mean that we should ban phones at school completely?',
      choices: ['상대의 말 확인하기', '발언 기회 넘기기', '최종 발언 시작하기', '정중하게 반박하기'],
      answer: 0,
      why: [
        '',
        '다른 사람에게 차례를 넘기는 말(What do you think, ~?)이 아닙니다.',
        '최종 발언은 In closing, To sum up 같은 말로 시작합니다.',
        '상대의 말에 반대하기 전에, 먼저 그 뜻을 묻고 있습니다.',
      ],
      explain: '"~라는 뜻인가요?(**Do you mean that ~?**)"는 상대가 말한 뜻이 내가 이해한 것과 같은지 확인하는 질문입니다.',
    },
    {
      id: 'p7', level: 1, type: 'short', concept: 2,
      q: '첫 글자가 c인 한 낱말을 빈칸에 써서 "제가 바르게 이해했다면"이라는 뜻을 완성하십시오.\n\nIf I understand [[빈칸]], you\'re saying that the plan costs too much.',
      answer: ['correctly'],
      wrong: [
        { a: 'correct', why: 'understand(동사)를 꾸미는 자리이므로 부사가 와야 합니다. correct → correctly' },
        { a: 'clearly', why: '"분명하게 이해했다면"이라는 뜻이 되어 어색합니다. "바르게"에 해당하는 낱말은 correctly입니다.' },
      ],
      explain: '**If I understand correctly**(제가 바르게 이해했다면)는 상대의 말을 내 말로 정리해 확인할 때 씁니다. 동사(understand)를 꾸미므로 부사(correctly)를 씁니다.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 3,
      q: '상대 측이 "태블릿은 너무 비싸다(Tablets are too expensive.)"라고 말했습니다. **정중하게 반박하는** 말로 가장 알맞은 것은 무엇입니까?',
      choices: [
        "That's a fair point, but they can save money on paper in the long run.",
        'That makes no sense at all, and you clearly did not do your homework.',
        'Only people who do not like technology would ever say something like that.',
        "You're wrong. Let's just move on to something more important now.",
      ],
      answer: 0,
      why: [
        '',
        '상대의 생각과 준비를 깎아내렸을 뿐, 비용에 대한 근거를 대지 않았습니다.',
        '말한 사람을 공격하는 인신공격입니다. 주장의 내용을 다루어야 합니다.',
        '근거 없이 틀렸다고 하고 대화를 끊었습니다.',
      ],
      explain: '"좋은 지적입니다(That\'s a fair point)"로 비용 걱정을 인정하고, but 뒤에 "길게 보면 종이 값을 아낄 수 있다"는 근거로 반박했습니다.',
    },
    {
      id: 'p9', level: 1, type: 'ox', concept: 3,
      q: "That's a fair point, but ~ 표현은 상대의 말에 완전히 동의하며 내 주장을 버린다는 뜻입니다.",
      answer: false,
      explain: '이 표현은 상대 말의 **옳은 부분을 인정**한 뒤, but 뒤에서 내 생각을 다시 말하는 정중한 반박입니다. 내 주장을 버리는 것이 아닙니다.',
    },
    {
      id: 'p10', level: 1, type: 'choice', concept: 4,
      q: '토론을 마친 뒤 **생각이 바뀐 것**을 정리하는 말은 무엇입니까?',
      choices: [
        'After hearing both sides, I changed my mind about the plan.',
        'We are on the affirmative side, and we have two strong reasons.',
        'Excuse me, may I ask the other team one more question about this?',
        'Do you mean that the school should buy a new tablet for every student?',
      ],
      answer: 0,
      why: [
        '',
        '토론을 시작하며 입장을 밝히는 입론의 말입니다.',
        '토론 중에 발언 기회를 얻는 말입니다.',
        '토론 중에 상대의 말을 확인하는 질문입니다.',
      ],
      explain: '"양쪽의 말을 듣고 나서 생각을 바꾸었다(After hearing both sides, I changed my mind ~)"는 토론 뒤에 내 생각을 다시 정리하는 말입니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 2,
      q: '다음 토론에서 서준(Seojun)이 Do you mean that ~? 질문을 한 까닭으로 가장 알맞은 것은 무엇입니까?\n\n' + DEBATE,
      choices: [
        '찬성 측이 모든 수업에서 태블릿을 쓰자는 것인지 주장의 범위를 확인하려고',
        '사회자에게 이제 그만 다음 단계인 최종 발언으로 넘어가 달라고 정중하게 부탁하려고',
        '찬성 측의 주장에 완전히 동의한다는 것을 분명하게 밝히려고',
        '반대 측의 입론을 처음으로 시작하며 주장과 근거를 내놓으려고',
      ],
      answer: 0,
      hint: '서준의 질문에 민수가 "꼭 그렇지는 않다(Not exactly.)"고 답하며 무엇을 바로잡았는지 보십시오.',
      why: [
        '',
        '단계를 넘기는 일은 사회자가 합니다. 서준은 찬성 측에 질문했습니다.',
        '서준은 질문 뒤에 "좋은 지적이지만(That\'s a fair point, but ~)"이라며 반박을 이어 갔습니다. 완전히 동의한 것이 아닙니다.',
        '반대 측의 입론은 앞에서 지아가 했습니다. 서준의 질문은 반론 단계에서 나왔습니다.',
      ],
      explain: '서준은 반박하기 전에 "모든 수업에서 태블릿을 쓰자는 뜻이냐"고 **확인**했습니다. 민수가 "교과서만 바꾸고 종이 학습지는 쓸 수 있다"고 답해 주장의 범위가 분명해졌고, 덕분에 서준은 상대가 하지 않은 주장을 공격하지 않고 반박할 수 있었습니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 3,
      q: '다음 토론에서 하윤(Hayun)이 반박한 서준의 걱정은 무엇이고, 어떻게 반박했습니까?\n\n' + DEBATE,
      choices: [
        '게임 때문에 집중이 흐트러질 수 있다는 걱정에, 수업 중 게임을 막는 프로그램으로 답했다.',
        '눈이 피로해질 수 있다는 걱정에, 화면 밝기를 낮추면 된다고 답했다.',
        '태블릿을 사고 고치는 데 돈이 많이 든다는 걱정에, 학교 예산이 아주 넉넉하니 괜찮다고 답했다.',
        '가방이 무겁다는 걱정에, 태블릿 하나로 모든 교과서를 담을 수 있다고 답했다.',
      ],
      answer: 0,
      hint: '하윤의 말 바로 앞에 있는 서준의 말을 보십시오.',
      why: [
        '',
        '눈의 피로는 지아가 입론에서 말한 걱정이고, 하윤은 이 걱정에 답하지 않았습니다.',
        '비용은 지아가 말한 걱정이고, 예산 이야기는 대화에 없습니다.',
        '무거운 가방은 걱정이 아니라 민수가 입론에서 든 찬성 근거입니다.',
      ],
      explain: '서준은 "학생들이 태블릿의 게임 때문에 산만해질 수 있다"고 했고, 하윤은 "무슨 말인지 알겠다(I see what you mean.)"며 인정한 뒤 However 다음에 "**수업 중 게임을 막는 프로그램을 설치할 수 있다**"고 반박했습니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'order', concept: 0,
      q: '찬반 토론에서 나오는 순서대로 놓으십시오.',
      choices: [
        "Today's resolution is \"Our school should start a four-day week.\"",
        'Our first argument is that students would get more rest.',
        "Let me respond to the negative side's point about lost class time.",
        'In closing, we ask you to support the resolution.',
      ],
      answer: [0, 1, 2, 3],
      hint: '사회자의 논제 소개 → 입론 → 반론 → 최종 발언 순서입니다.',
      explain: '사회자가 논제를 소개하고(Today\'s resolution is ~) → 입론에서 첫 주장을 내놓고(Our first argument is that ~) → 반론에서 상대 측의 말에 답하고(Let me respond to ~) → 최종 발언으로 마칩니다(In closing, ~).',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '다음 대화에서 B 학생의 대답에 나타난 문제와, B 학생이 먼저 했어야 할 말로 가장 알맞은 것은 무엇입니까?\n\nA: We should reduce homework on weekends.\nB: So you think students should never study at home? That\'s a terrible idea.',
      choices: [
        '상대 주장을 부풀려 공격했다. → Do you mean that we should give less homework only on weekends?',
        '발언 기회를 얻지 않았다. → May I add something about the cost of homework?',
        '최종 발언에서 새 근거를 냈다. → In closing, homework is very important for every single student in every school.',
        '근거가 너무 많았다. → I agree with you completely, so let\'s not talk about it anymore.',
      ],
      answer: 0,
      hint: 'A 학생은 "줄이자"고 했는데, B 학생은 A 학생의 말을 어떻게 바꾸어 받아쳤는지 보십시오.',
      why: [
        '',
        '이 대화의 문제는 차례가 아니라 상대 주장을 비틀어 받아친 것입니다. 숙제의 비용 이야기도 엉뚱합니다.',
        '이 대화는 최종 발언 장면이 아니고, 제시한 말도 확인 질문이 아닙니다.',
        'B 학생은 근거를 하나도 대지 않았습니다. 무조건 동의하는 것도 해결책이 아닙니다.',
      ],
      explain: 'A 학생은 주말 숙제를 **줄이자**고 했는데 B 학생은 "공부를 **절대** 하지 말자는 거냐"로 부풀려 공격했습니다(허수아비 공격의 오류). 먼저 확인 질문(Do you mean that ~?)으로 뜻을 확인했다면 오해 없이 토론을 이어 갈 수 있었습니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 1,
      q: '대화의 빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nModerator: Jia, you have thirty seconds left.\nJia: Then I will finish with one last point. Tablets cost a lot to repair. [[빈칸]]\nSeojun: Thank you, Jia. I would like to add that ...',
      choices: [
        "That's all from me. Over to you, Seojun.",
        'Sorry to interrupt, but may I ask you a question, Seojun?',
        'Could you explain what you mean by "a lot," Seojun?',
        "I'm afraid I disagree with you, Seojun, because I was here first.",
      ],
      answer: 0,
      hint: '지아가 마지막 말을 마친 뒤 서준이 이어서 말하고 있습니다.',
      why: [
        '',
        '말을 끊고 끼어들 때 쓰는 말입니다. 지아는 자기 발언을 마치는 중입니다.',
        '"많이(a lot)"라는 말은 지아 자신이 한 말이므로 서준에게 그 뜻을 묻는 것은 어색합니다.',
        '반박할 내용이 없고, 차례를 내세우는 말은 무례합니다.',
      ],
      explain: '지아는 남은 시간 안에 발언을 마치고 "제 말은 여기까지입니다. 서준 씨 차례입니다(**That\'s all from me. Over to you, Seojun.**)"로 차례를 넘깁니다. 그래서 서준이 고맙다는 인사(Thank you, Jia.)로 이어 받습니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '토론을 마친 뒤 쓴 정리 가운데 **들은 내용을 바탕으로 생각을 넓힌** 것으로 가장 알맞은 것은 무엇입니까?',
      choices: [
        'I still support tablets, but I now understand that the school must plan for eye health.',
        'Our team won the debate, so this proves that my opinion was right from the start.',
        'The other team talked too fast, so I did not really listen to their arguments at all.',
        'I did not change my mind at all, because changing your mind always means that you have lost the debate.',
      ],
      answer: 0,
      hint: '상대 측의 근거를 듣고 내 생각에 무엇이 더해졌는지 드러난 문장을 찾으십시오.',
      why: [
        '',
        '이겼다는 결과만으로 내 생각이 옳다고 단정했습니다. 어떤 근거가 설득력 있었는지 돌아보지 않았습니다.',
        '상대의 주장을 듣지 않았으므로 생각을 다시 정리할 수 없습니다.',
        '생각을 바꾸는 것은 지는 것이 아닙니다. 더 나은 근거를 만나 생각을 고치는 것도 토론의 목적입니다.',
      ],
      explain: '"여전히 ~을 지지하지만, 이제는 ~을 이해한다(I still ~, but I now understand ~)"는 내 입장을 지키면서도 상대 측의 걱정(눈 건강)을 받아들여 생각을 넓힌 정리입니다.',
    },
    {
      id: 'a5', level: 3, type: 'order', concept: 3,
      q: '정중한 반박이 되도록 인정 → 반박 → 근거 → 정리의 순서로 놓으십시오.',
      choices: [
        'I understand your concern about eye health.',
        'However, students would not use tablets all day.',
        'Under our plan, screen time in class would be limited to two hours a day.',
        'So the risk to eye health would be small.',
      ],
      answer: [0, 1, 2, 3],
      hint: '상대의 걱정을 받아 주는 문장으로 시작하고, 결과를 이끄는 말(So)로 시작하는 문장으로 마칩니다.',
      explain: 'I understand your concern(인정) → However, ~(반박) → Under our plan, ~ two hours a day(근거) → So ~(정리) 순서입니다. 인정 없이 바로 반박하면 공격적으로 들리고, 근거 없이 반박하면 설득력이 없습니다.',
    },
  ],

  deeper: [
    {
      title: '토론과 토의, 그리고 협력',
      body: '**토의(discussion)**는 함께 가장 좋은 해결책을 찾는 말하기이고, **토론(debate)**은 찬반으로 나뉘어 근거를 겨루는 말하기입니다. 토론은 경쟁처럼 보이지만, 사실 두 편이 함께 **논제를 깊이 들여다보는 협력**입니다.\n\n' +
        '찬성 측이 장점을 최대한 찾아내고 반대 측이 약점을 최대한 짚어 주면, 듣는 사람은 혼자 생각할 때보다 훨씬 많은 면을 보게 됩니다. 그래서 좋은 토론자는 상대의 좋은 지적에 "좋은 지적입니다(That\'s a fair point)"라고 말할 줄 압니다.\n\n' +
        '이 단원의 표현은 앞에서 배운 "논리적으로 설득하기"(주장-근거-반론 반박)를 말로 옮긴 것입니다. 입론은 주장과 근거, 반론은 반박, 최종 발언은 결론에 해당합니다.',
    },
    {
      title: '토론에서도 피해야 할 논리적 오류',
      body: '말로 하는 토론에서는 생각할 시간이 짧아 오류가 더 쉽게 나옵니다.\n\n' +
        '- **허수아비 공격**: 상대 주장을 부풀리거나 비틀어 공격합니다. → 먼저 확인 질문(Do you mean that ~?)을 합니다.\n' +
        '- **인신공격**: 주장 대신 말한 사람을 공격합니다(Only a child would say that.). → 주장의 내용과 근거만 다룹니다.\n' +
        '- **성급한 일반화**: 사례 한두 개로 전체를 단정합니다. → 근거만큼만 말합니다(many, some, often).\n\n' +
        '상대가 이런 오류를 범했을 때도 비꼬지 말고 차분하게 짚습니다. 예: I don\'t think I said that. What I meant was ~.',
    },
  ],

  faq: [
    {
      q: '토론 중에 끼어들어도 돼요?',
      a: '정해진 발언 시간에는 끼어들지 않는 것이 원칙입니다. 질문이나 반박은 반론 단계처럼 정해진 순서에 합니다. 자유롭게 주고받는 토론에서 꼭 끼어들어야 한다면 상대의 문장이 끝나기를 기다린 뒤 "말씀 중에 죄송하지만(Sorry to interrupt, but ~)" 또는 "하나 덧붙여도 될까요?(May I add something?)"로 정중하게 시작합니다.',
    },
    {
      q: '"좋은 지적이에요(That\'s a fair point)"라고 하면 지는 거 아니에요?',
      a: '아닙니다. 상대 말의 옳은 부분을 인정하면 듣는 사람은 내가 공정하게 생각한다고 느껴 오히려 내 말을 더 믿게 됩니다. 중요한 것은 인정한 뒤 but, however 다음에 반박과 근거를 분명하게 대는 것입니다.',
    },
    {
      q: '상대 말을 못 알아들었을 때는 어떻게 해요?',
      a: '아는 척 넘어가지 말고 물어봅니다. Could you explain what you mean by ~?(~가 무슨 뜻인지 설명해 주시겠어요?), Could you give an example?(예를 들어 주시겠어요?)처럼 묻거나, If I understand correctly, you\'re saying that ~. 같은 말로 내가 이해한 것을 말해 확인합니다.',
    },
    {
      q: '토론이 끝나고 생각이 바뀌면 처음 주장이 틀렸던 거예요?',
      a: '처음 생각이 "틀렸다"기보다는, 새 근거를 만나 **더 나아진** 것입니다. 토론의 목적은 생각을 넓히는 데 있으므로, 생각이 바뀌었다면 무엇 때문에 바뀌었는지(The most convincing argument for me was ~) 정리해 두면 좋습니다.',
    },
  ],

  mistakes: [
    '상대의 말을 확인하지 않고 부풀려 반박하는 실수 — 먼저 확인 질문(Do you mean that ~?)으로 뜻을 확인합니다.',
    '최종 발언에서 새 근거를 꺼내는 실수 — 최종 발언은 이미 나온 내용으로 핵심을 정리하는 자리입니다.',
    '인정만 하고 반박을 빠뜨리는 실수 — That\'s a fair point 뒤에는 접속사(but)와 근거가 이어져야 합니다.',
  ],

  gens: [
    {
      id: 'debate-function',
      level: 1,
      title: '토론에서 말의 역할 알아보기',
      make: function (R) {
        var L = R.pick(LINES);
        var k = L[1];
        var correct = ROLE[k];
        var others = R.sample(['get', 'give', 'clarify', 'rebut', 'reflect'].filter(function (x) { return x !== k; }), 3);
        var reason = {};
        others.forEach(function (o) { reason[ROLE[o]] = '"' + ROLE[o] + '"에 해당하는 말이 아닙니다. ' + ROLE_HINT[k]; });
        var pick = R.choices(correct, others.map(function (o) { return ROLE[o]; }));
        return {
          type: 'choice', concept: ROLE_CONCEPT[k],
          q: '토론에서 다음 말은 어떤 역할을 합니까?\n\n' + L[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: ROLE_HINT[k] + ' → **' + correct + '**',
        };
      },
    },
    {
      id: 'debate-stage',
      level: 2,
      title: '토론의 단계 알아보기',
      make: function (R) {
        var L = R.pick(STAGE_LINES);
        var k = L[1];
        var correct = STAGE[k];
        var others = ['constructive', 'rebuttal', 'closing'].filter(function (x) { return x !== k; });
        var reason = {};
        others.forEach(function (o) { reason[STAGE[o]] = '"' + STAGE[o] + '" 단계의 말이 아닙니다. ' + STAGE_HINT[k]; });
        var pick = R.choices(correct, others.map(function (o) { return STAGE[o]; }), 3);
        return {
          type: 'choice', concept: 0,
          q: '찬반 토론에서 다음 말이 나오기에 가장 알맞은 단계는 무엇입니까?\n\n' + L[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: STAGE_HINT[k] + ' → **' + correct + '**',
        };
      },
    },
  ],

  vocab: [
    { w: 'debate', m: '토론; 토론하다', ex: 'Our class held a debate about school uniforms.', exm: '우리 반은 교복에 관한 토론을 열었다.' },
    { w: 'resolution', m: '(토론의) 논제, 결의', ex: 'The resolution for today is about online classes.', exm: '오늘의 논제는 온라인 수업에 관한 것이다.' },
    { w: 'affirmative', m: '찬성의; 찬성 측', ex: 'The affirmative side spoke first.', exm: '찬성 측이 먼저 발언했다.' },
    { w: 'opponent', m: '상대, 반대자', ex: 'Listen carefully to your opponent before you respond.', exm: '대답하기 전에 상대의 말을 잘 들으십시오.' },
    { w: 'argument', m: '주장, 논거', ex: 'Her main argument was that the plan costs too much.', exm: '그녀의 핵심 주장은 그 계획에 돈이 너무 많이 든다는 것이었다.' },
    { w: 'rebuttal', m: '반박, 반론', ex: 'In his rebuttal, he pointed out a problem with the data.', exm: '반론에서 그는 자료의 문제점을 지적했다.' },
    { w: 'moderator', m: '사회자', ex: 'The moderator kept time and called on each speaker.', exm: '사회자는 시간을 재고 발언자를 차례로 지명했다.' },
    { w: 'interrupt', m: '(말을) 끊다, 방해하다', ex: 'Please do not interrupt while others are speaking.', exm: '다른 사람이 말하는 동안에는 끼어들지 마십시오.' },
    { w: 'clarify', m: '분명히 하다, 명확히 설명하다', ex: 'Could you clarify what you mean by "fair"?', exm: '"공정하다"는 것이 무슨 뜻인지 분명히 말씀해 주시겠어요?' },
    { w: 'concern', m: '걱정, 우려', ex: 'I understand your concern about the cost.', exm: '비용에 대한 걱정은 이해합니다.' },
    { w: 'fair', m: '타당한, 공정한', ex: "That's a fair point, but I see it differently.", exm: '타당한 지적이지만 저는 다르게 봅니다.' },
    { w: 'convincing', m: '설득력 있는', ex: 'The most convincing argument used clear data.', exm: '가장 설득력 있는 주장은 분명한 자료를 사용했다.' },
    { w: 'perspective', m: '관점, 시각', ex: 'The debate helped me see the issue from a new perspective.', exm: '토론은 내가 그 문제를 새로운 관점에서 보도록 도와주었다.' },
    { w: 'reflect', m: '되돌아보다, 반성하다', ex: 'After the debate, we reflected on what we had learned.', exm: '토론이 끝난 뒤 우리는 배운 것을 되돌아보았다.' },
    { w: 'respond', m: '대답하다, 반응하다', ex: 'Each team had two minutes to respond.', exm: '각 팀에게는 대답할 시간이 2분씩 있었다.' },
  ],
});
})();
