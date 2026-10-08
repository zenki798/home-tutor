/* 다시 시작하는 영어 기초 문법 · 조동사로 말 더하기
 * 예문은 모두 직접 쓴 문장이다(가상의 인물). 영어 낱말 바로 뒤에는 받침에 따라 바뀌는 조사를 붙이지 않는다. */
(function () {
  // 조동사 + 동사원형 생성기: [문장, 원형, 3인칭 단수형, 우리말]
  var MB = [
    ['She can ___ the guitar very well.', 'play', 'plays', '그녀는 기타를 아주 잘 칠 수 있습니다.'],
    ['You should ___ more water.', 'drink', 'drinks', '물을 더 마시는 게 좋겠습니다.'],
    ['He must ___ his ID card at work.', 'wear', 'wears', '그는 회사에서 사원증을 꼭 착용해야 합니다.'],
    ['It may ___ this afternoon.', 'rain', 'rains', '오늘 오후에 비가 올지도 모릅니다.'],
    ['My son can ___ his bike without help now.', 'ride', 'rides', '제 아들은 이제 도움 없이 자전거를 탈 수 있습니다.'],
    ['We have to ___ the report by Friday.', 'finish', 'finishes', '우리는 금요일까지 보고서를 끝내야 합니다.'],
    ['Jia might ___ to the party tonight.', 'come', 'comes', '지아는 오늘 밤 모임에 올지도 모릅니다.'],
    ['You shouldn\'t ___ coffee late at night.', 'drink', 'drinks', '밤늦게 커피를 마시지 않는 게 좋겠습니다.'],
    ['Minsu can\'t ___ today. He is sick.', 'work', 'works', '민수는 오늘 일할 수 없습니다. 아픕니다.'],
    ['My grandmother could ___ three languages.', 'speak', 'speaks', '제 할머니는 세 가지 언어를 하실 수 있었습니다.'],
    ['Could you ___ me the salt, please?', 'pass', 'passes', '소금 좀 건네주시겠어요?'],
    ['I would like to ___ a table for four.', 'book', 'books', '네 명 자리를 예약하고 싶습니다.'],
    ['He has to ___ up at five every morning.', 'get', 'gets', '그는 매일 아침 다섯 시에 일어나야 합니다.'],
    ['She doesn\'t have to ___ a uniform.', 'wear', 'wears', '그녀는 유니폼을 입을 필요가 없습니다.'],
    ['You must not ___ your password to anyone.', 'tell', 'tells', '비밀번호를 누구에게도 알려 주면 안 됩니다.'],
    ['May I ___ your pen for a minute?', 'use', 'uses', '펜을 잠깐 써도 될까요?'],
    ['The manager may ___ late today.', 'arrive', 'arrives', '팀장님은 오늘 늦게 도착하실지도 모릅니다.'],
    ['He should ___ a break.', 'take', 'takes', '그는 좀 쉬는 게 좋겠습니다.'],
    ['Can you ___ me with this box?', 'help', 'helps', '이 상자 옮기는 것 좀 도와줄 수 있나요?'],
    ['My father can ___ very well.', 'cook', 'cooks', '제 아버지는 요리를 아주 잘하십니다.'],
    ['Seojun must ___ the door before he leaves.', 'lock', 'locks', '서준은 나가기 전에 꼭 문을 잠가야 합니다.'],
    ['You don\'t have to ___ now. We have time.', 'hurry', 'hurries', '지금 서두를 필요 없습니다. 시간이 있어요.'],
  ];

  // 조동사 뜻 생성기 — 보기마다의 뜻 설명
  var MEAN = {
    'can': 'can — "~할 수 있다"(능력) 또는 "~해도 된다"(허락)라는 뜻입니다.',
    'could': 'could — "~할 수 있었다"(can의 과거) 또는 공손한 부탁·허락에 씁니다.',
    "can't": 'can\'t — "~할 수 없다"라는 뜻입니다.',
    "couldn't": 'couldn\'t — "~할 수 없었다"(can\'t의 과거)라는 뜻입니다.',
    'must': 'must — "꼭 ~해야 한다"(강한 의무)라는 뜻입니다.',
    'must to': 'must 뒤에는 to 없이 동사원형을 씁니다. must to라는 꼴은 없습니다.',
    "mustn't": 'mustn\'t — "~하면 안 된다"(금지)라는 뜻입니다.',
    'have to': 'have to — "~해야 한다"라는 뜻입니다.',
    'has to': 'has to — 주어가 3인칭 단수일 때 "~해야 한다"는 뜻입니다.',
    'had to': 'had to — "~해야 했다"(have to의 과거)라는 뜻입니다.',
    "don't have to": 'don\'t have to — "~할 필요가 없다"라는 뜻입니다.',
    'should': 'should — "~하는 게 좋겠다"(충고)라는 뜻입니다.',
    "shouldn't": 'shouldn\'t — "~하지 않는 게 좋겠다"라는 뜻입니다.',
    'may': 'may — "~일지도 모른다"(추측) 또는 "~해도 된다"(허락)라는 뜻입니다.',
    'might': 'might — "~일지도 모른다"(약한 추측)라는 뜻입니다.',
    'would like to': 'would like to — "~하고 싶다"를 정중하게 말할 때 씁니다.',
    'would': 'Would you ~? 는 공손한 부탁이나 권유(~하시겠어요?)에 씁니다.',
    'do': 'Do you like to ~? 는 "평소에 ~하는 것을 좋아하나요?"라는 뜻입니다. 지금 권하는 말이 아닙니다.',
  };
  // [우리말, 영어 문장, 정답, 오답 2개]
  var MM = [
    ['저는 중국어를 조금 할 수 있습니다.', 'I ___ speak a little Chinese.', 'can', ['should', "mustn't"]],
    ['제 딸은 세 살 때 글을 읽을 수 있었습니다.', 'My daughter ___ read when she was three.', 'could', ['should', 'must']],
    ['운전할 때는 안전벨트를 꼭 매야 합니다.', 'You ___ wear a seat belt when you drive.', 'must', ['might', "don't have to"]],
    ['박물관 안에서는 사진을 찍으면 안 됩니다.', 'You ___ take photos inside the museum.', "mustn't", ["don't have to", 'should']],
    ['오늘은 일요일이라 일찍 일어날 필요가 없습니다.', 'It\'s Sunday, so I ___ get up early.', "don't have to", ["mustn't", 'must']],
    ['무척 피곤해 보여요. 일찍 자는 게 좋겠어요.', 'You look very tired. You ___ go to bed early.', 'should', ["mustn't", "don't have to"]],
    ['내일 비가 올지도 모릅니다.', 'It ___ rain tomorrow.', 'might', ['has to', 'would like to']],
    ['창가 자리에 앉고 싶습니다.', 'I ___ sit by the window, please.', 'would like to', ['have to', 'should']],
    ['커피 한 잔 드시겠어요?', '___ you like a cup of coffee?', 'would', ['should', 'must']],
    ['이 펜 좀 빌려도 될까요?', '___ I borrow this pen?', 'may', ['must', 'should']],
    ['창문 좀 열어 주시겠어요?', '___ you open the window, please?', 'could', ['must', 'should']],
    ['그는 다음 주에 서울에 올지도 모릅니다.', 'He ___ come to Seoul next week.', 'may', ['must', 'would like to']],
    ['저는 어제 늦게까지 일해야 했습니다.', 'I ___ work late yesterday.', 'had to', ['must', 'should'], { must: 'must에는 과거형이 없어서 yesterday(어제)의 일에 쓰지 않습니다. 과거의 의무는 had to로 말합니다.' }],
    ['제 남편은 매일 아침 일곱 시에 출근해야 합니다.', 'My husband ___ go to work at seven every morning.', 'has to', ['have to', 'must to'], { 'have to': 'have to — 뜻은 맞지만, 주어 my husband는 3인칭 단수라서 has to를 씁니다.', 'must to': 'must 뒤에는 to 없이 동사원형을 씁니다. must to라는 꼴은 없습니다.' }],
    ['회의에 늦으면 안 됩니다.', 'You ___ be late for the meeting.', "mustn't", ["don't have to", 'may']],
    ['그 셔츠는 사지 않는 게 좋겠어요. 너무 비싸요.', 'You ___ buy that shirt. It\'s too expensive.', "shouldn't", ['should', 'must']],
    ['저는 피아노를 칠 줄 모릅니다.', 'I ___ play the piano.', "can't", ["mustn't", "don't have to"]],
    ['오늘 밤 영화 보러 가시겠어요?', '___ you like to see a movie tonight?', 'would', ['do', 'should']],
    ['표를 미리 살 필요는 없습니다. 입구에서 사면 됩니다.', 'You ___ buy tickets in advance. You can buy them at the door.', "don't have to", ["mustn't", 'must']],
    ['민수는 지금 집에 있을지도 몰라요.', 'Minsu ___ be at home now.', 'might', ["can't", 'has to']],
    ['저는 어렸을 때 매운 음식을 먹지 못했습니다.', 'I ___ eat spicy food when I was young.', "couldn't", ["can't", "shouldn't"], { "can't": 'can\'t — 지금 "~할 수 없다"는 뜻입니다. when I was young(어렸을 때)은 과거이므로 couldn\'t를 씁니다.' }],
  ];
  function capFirst(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  // have to 꼴 생성기
  var HT_SUBJ = [
    ['I', false], ['You', false], ['We', false], ['They', false], ['My parents', false],
    ['He', true], ['She', true], ['Minsu', true], ['My boss', true], ['Jia', true],
  ];
  var HT_VP = ['wear a uniform', 'take the subway', 'cook dinner', 'answer a lot of emails', 'work late', 'get up at six'];
  // 지금 일은 these days·nowadays·every day now 로 밝힌다(every day·on weekdays 만 있으면 had to 도 바른 과거 습관이 되어 정답이 둘이 된다)
  var HT_TIME = [['these days', 'now'], ['nowadays', 'now'], ['every day now', 'now'], ['yesterday', 'past'], ['last month', 'past'], ['last week', 'past']];

  Tutor.registerUnit({
    id: 'eng-a-basic-10',
    course: 'eng-a-basic',
    title: '조동사로 말 더하기',
    summary: 'can·must·should·may 같은 조동사로 능력·의무·충고·추측·허락의 뜻을 더해 말합니다.',
    goals: [
      '조동사 뒤에 동사원형을 써서 긍정문·부정문·의문문을 만들 수 있다.',
      'can·could로 능력과 허락을, must·have to로 의무를 말하고 mustn\'t와 don\'t have to의 차이를 구별할 수 있다.',
      'should로 충고하고, may·might로 추측하거나 허락을 구할 수 있다.',
      'would like to로 원하는 것을 정중하게 말하고 권할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '조동사 뒤에는 동사원형',
        body: '**조동사**는 동사 앞에 붙어 "할 수 있다", "해야 한다", "하는 게 좋겠다" 같은 **말하는 사람의 생각**을 더해 주는 말입니다.\n\n- I **swim**. (수영한다) → I **can swim**. (수영할 수 있다)\n- You **rest**. (쉰다) → You **should rest**. (쉬는 게 좋겠다)\n\n조동사를 쓸 때 지키는 규칙은 세 가지입니다.\n\n1. 조동사 뒤에는 **동사원형**을 씁니다. — He can **swim**. (He can swims. ✗ / He can to swim. ✗)\n2. 주어가 3인칭 단수여도 조동사에 **-s를 붙이지 않습니다**. — She **can** drive. (She cans drive. ✗)\n3. 조동사는 두 개를 겹쳐 쓰지 않습니다. — will can (✗) → will be able to (○)\n\n부정문과 의문문은 do·does 없이 조동사만으로 만듭니다.\n\n| 문장 | 만드는 법 | 예 |\n|---|---|---|\n| 부정문 | 조동사 + not + 동사원형 | I **cannot**(can\'t) swim. / You **should not**(shouldn\'t) worry. |\n| 의문문 | 조동사 + 주어 + 동사원형 ~? | **Can** you **swim**? — Yes, I can. / No, I can\'t. |\n\n> ⚠️ He doesn\'t can swim. (✗) → He **can\'t** swim. (○) 조동사가 있으면 do·does를 쓰지 않습니다.',
        easy: '조동사는 동사에 끼우는 **안경**과 같습니다. 안경을 써도 사람(동사)은 그대로이듯, 조동사를 붙여도 동사는 맨 처음 모양(원형) 그대로입니다.\n\n- She plays tennis. → She can **play** tennis. (plays의 -s가 빠집니다)\n\n안경 하나에 안경을 또 겹쳐 쓰지 않듯, 조동사도 한 번에 하나만 씁니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nHe can ___ three languages.',
          choices: ['speaks', 'speak', 'to speak'],
          answer: 1,
          why: [
            '주어가 3인칭 단수(he)여도 조동사 뒤에는 -s 없는 동사원형을 씁니다.',
            '',
            'can 뒤에는 to 없이 바로 동사원형을 씁니다.',
          ],
          explain: '조동사 can 뒤에는 동사원형을 씁니다: **He can speak three languages.** "그는 세 가지 언어를 할 수 있습니다."',
        },
      },
      {
        title: 'can과 could — 능력과 허락',
        body: '**can**은 두 가지 뜻으로 많이 씁니다.\n\n| 뜻 | 예 |\n|---|---|\n| 능력 (~할 수 있다) | I **can** drive. / I **can\'t** swim. |\n| 허락 (~해도 된다) | You **can** use my car. / **Can** I sit here? |\n\n**could**는 can의 과거형입니다. "~할 수 있었다"는 과거의 능력을 말합니다.\n\n- I **could** read Chinese characters when I was young. (어릴 때는 한자를 읽을 수 있었다)\n- I **couldn\'t** sleep last night. (어젯밤에 잠을 잘 수 없었다)\n\n그런데 could는 지금 **공손하게 부탁하거나 허락을 구할 때**도 씁니다. 이때는 과거의 뜻이 없습니다.\n\n| 편한 말 | 더 공손한 말 |\n|---|---|\n| **Can** I use your phone? | **Could** I use your phone? |\n| **Can** you help me? | **Could** you help me? / **Would** you help me? |\n\n> 💡 "~할 수 있다"는 be able to로도 말합니다. 조동사를 겹쳐 쓸 수 없으니 미래의 능력은 I **will be able to** drive next year. 라고 합니다.',
        easy: 'can은 "된다"는 초록불이라고 생각하면 쉽습니다. 내 몸이 할 수 있으면 능력의 초록불(I can swim), 누가 허락해 주면 허락의 초록불(You can go home).\n\ncould는 이 초록불을 한 단계 부드럽게 켜는 말입니다. 회사 상사나 처음 보는 사람에게 부탁할 때는 Can you ~? 보다 Could you ~? 가 듣기 좋습니다.',
        check: {
          type: 'ox',
          q: '다음 문장은 "과거에 창문을 열 수 있었습니까?"라고 묻는 말입니다.\n\nCould you open the window, please?',
          answer: false,
          explain: 'Could you ~, please? 는 지금 상대에게 **공손하게 부탁하는 말**입니다. "창문 좀 열어 주시겠어요?"라는 뜻이고 과거의 뜻은 없습니다.',
        },
      },
      {
        title: 'must와 have to — 의무, don\'t have to — 필요 없음',
        body: '**must**와 **have to**는 둘 다 "~해야 한다"는 의무를 나타냅니다.\n\n- You **must** wear a helmet. (꼭 써야 한다 — 규칙·말하는 사람의 강한 생각)\n- I **have to** work this Saturday. (일해야 한다 — 회사 사정처럼 바깥 사정 때문에)\n\nhave to는 주어와 시제에 따라 모양이 바뀝니다. must에는 과거형이 없어서 과거는 had to로 말합니다.\n\n| 때 | 모양 | 예 |\n|---|---|---|\n| 지금 (I, you, we, they) | have to | We **have to** leave now. |\n| 지금 (he, she, it) | has to | She **has to** leave now. |\n| 과거 | had to | I **had to** wait for an hour. |\n\n**부정문**에서는 두 말의 뜻이 완전히 달라집니다.\n\n| 말 | 뜻 | 예 |\n|---|---|---|\n| must not (mustn\'t) | **~하면 안 된다** (금지) | You **mustn\'t** smoke here. (여기서 담배를 피우면 안 됩니다) |\n| don\'t have to (doesn\'t have to) | **~할 필요가 없다** | You **don\'t have to** come early. (일찍 올 필요는 없습니다) |\n\n> ⚠️ don\'t have to는 "하면 안 된다"가 아닙니다. 해도 되고 안 해도 되는데, 꼭 할 필요는 없다는 뜻입니다.',
        easy: '표지판으로 생각해 보세요.\n\n- must → "반드시 하시오" 표지판\n- mustn\'t → 빨간 동그라미에 빗금 친 "금지" 표지판\n- don\'t have to → "자유롭게 하세요"라는 안내문 (해도 되고 안 해도 됨)\n\n주말 출근이 없는 회사라면 You don\'t have to work on weekends. 이지, You mustn\'t work on weekends.(주말에 일하면 안 된다)가 아닙니다.',
        check: {
          type: 'choice',
          q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n오늘은 토요일이라 일찍 일어날 필요가 없습니다.\n→ It\'s Saturday, so I ___ get up early.',
          choices: ["mustn't", 'have to', "don't have to"],
          answer: 2,
          why: [
            'mustn\'t — "~하면 안 된다"(금지)라는 뜻입니다. 일찍 일어나는 것이 금지된 것은 아닙니다.',
            'have to — "~해야 한다"는 뜻이라 우리말과 반대입니다.',
            '',
          ],
          explain: '"~할 필요가 없다"는 **don\'t have to**입니다: **It\'s Saturday, so I don\'t have to get up early.**',
        },
      },
      {
        title: 'should — 충고, may·might — 추측과 허락',
        body: '**should**는 "~하는 게 좋겠다", "~해야 한다"는 **충고·권유**입니다. must보다 부드럽습니다.\n\n- You **should** see a doctor. (병원에 가 보는 게 좋겠어요.)\n- You **shouldn\'t** skip breakfast. (아침을 거르지 않는 게 좋겠어요.)\n- What **should** I wear? (뭘 입는 게 좋을까요?)\n\n**may**와 **might**는 "~일지도 모른다"는 **추측**입니다. 확실하지 않을 때 씁니다. might가 조금 더 약한 추측입니다.\n\n- It **may** snow tonight. / It **might** snow tonight. (오늘 밤 눈이 올지도 모릅니다.)\n- He **may not** know the answer. (그는 답을 모를지도 모릅니다.)\n\n**may**는 **허락**에도 씁니다. can보다 격식 있고 공손합니다.\n\n- **May** I come in? (들어가도 될까요?) — Yes, you may. / Of course.\n- You **may** leave now. (이제 가셔도 됩니다.)\n\n> 💡 might는 지금 추측할 때 주로 씁니다. 허락을 구할 때는 May I ~? 나 Could I ~? 를 씁니다.',
        easy: '날씨 예보를 떠올려 보세요.\n\n- 비 올 확률이 꽤 있다 → It **may** rain.\n- 혹시 올 수도 있다 → It **might** rain.\n\n그리고 친구에게 "우산 챙기는 게 좋겠어"라고 말해 줄 때가 should입니다: You **should** take an umbrella.',
        check: {
          type: 'choice',
          q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n그는 오늘 늦을지도 모릅니다.\n→ He ___ be late today.',
          choices: ['may', 'should', 'has to'],
          answer: 0,
          why: [
            '',
            'should — "~하는 게 좋겠다"는 충고에 씁니다. "늦을지도"라는 추측이 아닙니다.',
            'has to — "~해야 한다"는 의무입니다. 늦어야 한다는 뜻이 됩니다.',
          ],
          explain: '"~일지도 모른다"는 추측은 **may**(또는 might)로 나타냅니다: **He may be late today.**',
        },
      },
      {
        title: 'would like to — 정중하게 원하는 것 말하기',
        body: '**would like to + 동사원형**은 "~하고 싶습니다"를 **정중하게** 말하는 표현입니다. want to보다 공손해서 식당·가게·회사에서 자주 씁니다. 줄여서 **I\'d like to**라고 합니다.\n\n- I **would like to** book a room. = I**\'d like to** book a room. (방을 예약하고 싶습니다.)\n\n원하는 것이 물건이면 to 없이 **would like + 명사**입니다.\n\n- I**\'d like** a cup of tea, please. (차 한 잔 주세요.)\n\n**Would you like ~?** 는 상대에게 **권할 때** 씁니다.\n\n| 권하는 말 | 대답 |\n|---|---|\n| **Would you like** some cake? (케이크 좀 드실래요?) | Yes, please. / No, thank you. |\n| **Would you like to** join us? (함께하시겠어요?) | I\'d love to. / Sorry, I can\'t. |\n\n> ⚠️ I like to swim. 은 "나는 (평소에) 수영하는 것을 좋아한다", I\'d like to swim. 은 "(지금) 수영하고 싶다"입니다. \'d 하나로 뜻이 달라집니다.',
        easy: 'would like는 want에 정장을 입힌 말입니다.\n\n- 친구에게: I want some water.\n- 식당 직원에게: I\'d like some water, please.\n\n원하는 것이 **행동**이면 to를 붙여 I\'d like **to** order. (주문하고 싶어요), **물건**이면 바로 I\'d like **a coffee**. 입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nI\'d like ___ a table for two, please.',
          choices: ['booking', 'to book', 'book'],
          answer: 1,
          why: [
            'would like 뒤에는 -ing가 아니라 to + 동사원형이 옵니다.',
            '',
            '행동을 원할 때는 would like 뒤에 to를 붙입니다. would like + 동사원형(to 없이)은 쓰지 않습니다.',
          ],
          explain: '행동(예약하다)을 정중하게 원할 때는 **would like to + 동사원형**: **I\'d like to book a table for two, please.** "두 사람 자리를 예약하고 싶습니다."',
        },
      },
    ],

    examples: [
      {
        q: '다음 문장을 부정문과 의문문으로 바꾸어 보세요.\n\nShe can drive a truck.',
        steps: [
          '조동사가 있는 문장은 do·does를 쓰지 않습니다.',
          '부정문은 조동사 뒤에 not을 붙입니다: She cannot(can\'t) drive a truck.',
          '의문문은 조동사를 주어 앞으로 옮깁니다: Can she drive a truck?',
          '조동사 뒤의 동사는 어느 문장에서나 원형 drive 그대로입니다.',
        ],
        answer: '부정문: She can\'t drive a truck. / 의문문: Can she drive a truck? — Yes, she can. / No, she can\'t.',
      },
      {
        q: '상황에 맞게 must not 또는 don\'t have to를 골라 보세요.\n\n(1) 회사 규칙: 고객 정보를 밖으로 가지고 나가면 안 된다.\n(2) 오늘은 재택근무라서 정장을 입을 필요가 없다.',
        steps: [
          '(1)은 "하면 안 된다"는 금지입니다. 금지는 must not(mustn\'t)으로 말합니다.',
          '(2)는 "할 필요가 없다"는 뜻입니다. 정장을 입어도 되지만 꼭 입지 않아도 되므로 don\'t have to입니다.',
        ],
        answer: '(1) You mustn\'t take customer information out of the office. (2) I don\'t have to wear a suit today.',
      },
    ],

    terms: [
      { term: '조동사', def: '동사 앞에 붙어 능력·의무·충고·추측·허락 같은 뜻을 더하는 말입니다. 예: can, could, must, should, may, might, would' },
      { term: '동사원형', def: '-s, -ed, -ing를 붙이지 않은 동사의 맨 처음 모양입니다. 조동사 뒤에는 늘 동사원형을 씁니다. 예: can swim, should go' },
      { term: '능력', def: '"~할 수 있다"는 뜻입니다. can(지금), could(과거), be able to로 나타냅니다.' },
      { term: '의무', def: '"~해야 한다"는 뜻입니다. must, have to(has to), 과거는 had to로 나타냅니다.' },
      { term: '금지', def: '"~하면 안 된다"는 뜻입니다. must not(mustn\'t)으로 나타냅니다. 예: You mustn\'t park here.' },
      { term: '충고', def: '"~하는 게 좋겠다"는 뜻입니다. should, 부정은 shouldn\'t로 나타냅니다.' },
      { term: '추측', def: '"~일지도 모른다"는 뜻입니다. may, might로 나타냅니다. 예: It might rain.' },
      { term: '허락', def: '"~해도 된다"는 뜻입니다. can, could, may로 나타냅니다. 예: May I come in?' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '**바른** 문장을 고르세요.',
        choices: ['He cans swim.', 'He can swims.', 'He can swim.', 'He can to swim.'],
        answer: 2,
        why: [
          '조동사에는 주어가 3인칭 단수여도 -s를 붙이지 않습니다.',
          '조동사 뒤의 동사에도 -s를 붙이지 않습니다. 동사원형을 씁니다.',
          '',
          'can 뒤에는 to 없이 동사원형을 씁니다.',
        ],
        explain: '조동사에는 -s가 붙지 않고, 조동사 뒤에는 동사원형이 옵니다: **He can swim.**',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
        q: '우리말에 맞게 빈칸에 알맞은 말을 쓰세요.\n\n저는 어렸을 때 자전거를 탈 수 없었습니다.\n→ I ___ ride a bike when I was a child.',
        answer: ['couldn\'t', 'could not', 'wasn\'t able to', 'was not able to'],
        hint: '"~할 수 없었다"는 can\'t의 과거입니다.',
        wrong: [
          { a: 'can\'t', why: 'can\'t — 지금 "~할 수 없다"입니다. when I was a child(어렸을 때)는 과거이므로 couldn\'t를 씁니다.' },
          { a: 'didn\'t', why: 'I didn\'t ride a bike. 는 "타지 않았다"는 뜻입니다. "탈 수 없었다"는 능력은 couldn\'t로 나타냅니다.' },
        ],
        explain: 'can\'t의 과거는 **couldn\'t**(could not)입니다: **I couldn\'t ride a bike when I was a child.** (be able to를 써서 wasn\'t able to라고 해도 맞습니다.)',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 2,
        q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n오늘은 공휴일이라 회사에 갈 필요가 없습니다.\n→ It\'s a holiday, so I ___ go to work today.',
        choices: ["mustn't", "can't", "don't have to", "shouldn't"],
        answer: 2,
        why: [
          'mustn\'t — "~하면 안 된다"(금지)라는 뜻입니다. 회사에 가는 것이 금지된 것은 아닙니다.',
          'can\'t — "~할 수 없다"는 뜻입니다. 우리말은 "갈 필요가 없다"입니다.',
          '',
          'shouldn\'t — "~하지 않는 게 좋겠다"는 충고입니다.',
        ],
        explain: '"~할 필요가 없다"는 **don\'t have to**입니다. "오늘은 공휴일이라 회사에 갈 필요가 없습니다."',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 2,
        q: '다음 문장의 뜻은 "여기에 주차할 필요가 없습니다."입니다.\n\nYou mustn\'t park here.',
        answer: false,
        explain: 'mustn\'t(must not)는 "~하면 안 된다"는 **금지**입니다. 이 문장은 "여기에 주차하면 안 됩니다."라는 뜻입니다. "주차할 필요가 없다"는 You don\'t have to park here. 입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 3,
        q: '친구에게 충고하는 말입니다. 빈칸에 알맞은 말을 고르세요.\n\nYou look tired. You ___ take a short break.',
        choices: ['may not', 'should', 'would like to'],
        answer: 1,
        why: [
          'may not — "~하지 않을지도 모른다" 또는 "~하면 안 된다"는 뜻이라 충고가 아닙니다.',
          '',
          'would like to — "(내가) ~하고 싶다"는 뜻입니다. You would like to ~ 는 "당신은 ~하고 싶어 한다"가 되어 충고가 아닙니다.',
        ],
        explain: '"~하는 게 좋겠다"는 충고는 **should**입니다: **You look tired. You should take a short break.** "피곤해 보여요. 잠깐 쉬는 게 좋겠어요."',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 4,
        q: '식당에서 "물 한 잔 주세요."라고 정중하게 말한 것을 고르세요.',
        choices: ['I like a glass of water.', 'I\'d like a glass of water, please.', 'I\'d like to a glass of water, please.'],
        answer: 1,
        why: [
          'I like ~ 는 "나는 ~을 (평소에) 좋아한다"는 뜻입니다. 지금 원하는 것을 말할 때는 I\'d like를 씁니다.',
          '',
          'to 뒤에는 동사원형이 옵니다. 물건(a glass of water)을 원할 때는 to 없이 I\'d like + 명사입니다.',
        ],
        explain: '원하는 것이 물건이면 **I\'d like + 명사**: I\'d like a glass of water, please.',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'text', concept: 0,
        q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 쓰세요.\n\nMy father can ___ (cook) Italian food very well.',
        answer: ['cook'],
        wrong: [
          { a: 'cooks', why: '주어가 3인칭 단수여도 조동사 can 뒤에는 -s 없는 동사원형을 씁니다.' },
          { a: 'to cook', why: 'can 뒤에는 to 없이 바로 동사원형을 씁니다.' },
          { a: 'cooking', why: '조동사 뒤에는 -ing가 아니라 동사원형을 씁니다.' },
        ],
        explain: '조동사 can 뒤에는 동사원형 **cook**을 씁니다. "제 아버지는 이탈리아 음식을 아주 잘 만드십니다."',
      },
      {
        id: 'p8', level: 1, type: 'choice', concept: 0,
        q: '우리말을 영어로 바르게 옮긴 것을 고르세요.\n\n그는 오늘 올 수 없습니다.',
        choices: ['He doesn\'t can come today.', 'He can\'t come today.', 'He can\'t comes today.'],
        answer: 1,
        why: [
          '조동사가 있으면 부정문에 do·does를 쓰지 않습니다. 조동사 뒤에 not을 붙입니다.',
          '',
          'can\'t 뒤에도 동사원형을 씁니다. comes가 아니라 come입니다.',
        ],
        explain: '조동사 부정문은 **조동사 + not + 동사원형**: **He can\'t come today.**',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 3,
        q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: Where is Jia?\nB: I\'m not sure. She ___ be in the meeting room.',
        choices: ["can't", 'would like to', 'might'],
        answer: 2,
        hint: 'B는 확실하지 않다고 말합니다.',
        why: [
          'can\'t be ~ 는 "~일 리가 없다"는 확신입니다. I\'m not sure(잘 모르겠어요)와 어울리지 않습니다.',
          'would like to — "~하고 싶다"는 뜻이라 지아가 어디 있는지에 대한 대답이 되지 않습니다.',
          '',
        ],
        explain: '확실하지 않은 추측은 **might**(또는 may)입니다. "지아 어디 있어요? — 잘 모르겠어요. 회의실에 있을지도 몰라요."',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 말을 고르세요.\n\nThe bus was late, so I ___ wait for an hour yesterday.',
        choices: ['must', 'had to', 'have to', 'musted'],
        answer: 1,
        why: [
          'must에는 과거형이 없어서 yesterday(어제)의 일에 쓸 수 없습니다.',
          '',
          'have to — 지금의 의무입니다. 어제 일이므로 과거 had to를 씁니다.',
          'must에 -ed를 붙인 꼴은 없습니다.',
        ],
        explain: '"~해야 했다"는 과거 의무는 **had to**입니다. "버스가 늦게 와서 어제 한 시간을 기다려야 했습니다."',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'text', concept: 1,
        q: 'Can you close the window? 를 더 공손하게 바꾸었습니다. 빈칸에 알맞은 한 낱말을 쓰세요.\n\n___ you close the window, please?',
        answer: ['Could', 'Would'],
        hint: 'can의 과거형이 공손한 부탁에도 쓰입니다.',
        wrong: [
          { a: 'Can', why: 'Can — 처음 문장과 같은 편한 말입니다. 더 공손하게 부탁할 때는 Could나 Would를 씁니다.' },
          { a: 'May', why: 'May I ~? 는 내가 해도 되는지 허락을 구할 때 씁니다. 상대에게 부탁할 때 May you ~? 라고 하지 않습니다.' },
        ],
        explain: '공손한 부탁은 **Could you ~?** 또는 **Would you ~?** 입니다. "창문 좀 닫아 주시겠어요?"',
      },
      {
        id: 'p12', level: 2, type: 'order', concept: 4,
        q: '우리말에 맞게 배열하세요.\n\n저는 이 바지를 입어 보고 싶습니다.',
        choices: ['I', 'would like', 'to try on', 'these pants'],
        answer: [0, 1, 2, 3],
        hint: '주어 + would like + to + 동사원형 순서입니다.',
        explain: '**I would like to try on these pants.** (I\'d like to try on these pants.) 가게에서 정중하게 말하는 표현입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 2,
        q: '다음 문장의 뜻으로 알맞은 것을 고르세요.\n\nYou don\'t have to bring lunch tomorrow.',
        choices: ['내일 점심을 가져오면 안 됩니다.', '내일 점심을 꼭 가져와야 합니다.', '내일 점심을 가져올 수 없습니다.', '내일 점심을 가져올 필요가 없습니다.'],
        answer: 3,
        why: [
          '"가져오면 안 된다"는 금지라서 You mustn\'t bring lunch. 입니다.',
          '"꼭 가져와야 한다"는 You must(have to) bring lunch. 입니다. 부정문이 아닙니다.',
          '"가져올 수 없다"는 You can\'t bring lunch. 입니다.',
          '',
        ],
        explain: 'don\'t have to는 "~할 필요가 없다"입니다. 가져와도 되지만 꼭 가져오지 않아도 된다는 뜻입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 0,
        q: '**옳지 않은** 문장을 고르세요.',
        choices: ['She will be able to drive next year.', 'You should not eat too much sugar.', 'He musts finish the work today.', 'May I use your phone?'],
        answer: 2,
        why: [
          '조동사 will 뒤에 can을 겹쳐 쓸 수 없어 be able to로 바르게 썼습니다.',
          'should not + 동사원형으로 바르게 썼습니다.',
          '',
          '허락을 구하는 May I + 동사원형 ~? 으로 바르게 썼습니다.',
        ],
        explain: '조동사에는 -s를 붙이지 않습니다. **He must finish the work today.** 로 고칩니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'text', concept: 2,
        q: '첫 문장을 어제 일로 바꾸었습니다. 빈칸에 알맞은 한 낱말을 쓰세요.\n\nI must leave work early today.\n→ I ___ to leave work early yesterday.',
        answer: ['had'],
        hint: 'must에는 과거형이 없습니다. 같은 뜻의 다른 표현을 과거로 바꿉니다.',
        wrong: [
          { a: 'must', why: 'must에는 과거형이 없고, 빈칸 뒤에 to가 있습니다. have to의 과거 had to를 씁니다.' },
          { a: 'have', why: 'have to — 지금의 의무입니다. yesterday(어제)이므로 과거 had를 씁니다.' },
          { a: 'musted', why: 'must에 -ed를 붙인 꼴은 없습니다. 과거의 의무는 had to로 나타냅니다.' },
        ],
        explain: 'must의 과거 뜻은 **had to**로 나타냅니다: **I had to leave work early yesterday.** "어제는 일찍 퇴근해야 했습니다."',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 4,
        q: '대화의 빈칸에 들어갈 대답으로 알맞은 것을 고르세요.\n\nA: Would you like to join us for dinner?\nB: ___',
        choices: ['Yes, I would like.', 'I\'d love to.', 'Yes, I like.', 'No, I wouldn\'t like to join for you.'],
        answer: 1,
        why: [
          'would like 뒤에는 무엇을 원하는지(to + 동사원형)가 있어야 합니다. Yes, I would like to. 처럼 to까지 씁니다.',
          '',
          'I like는 "나는 (평소에) 좋아한다"는 뜻이라 권유에 대한 대답이 되지 않습니다.',
          'join for you라는 표현은 어색하고, 거절할 때는 보통 Sorry, I can\'t. / No, thank you. 처럼 부드럽게 말합니다.',
        ],
        explain: 'Would you like to ~? (~하시겠어요?)에 기꺼이 응할 때는 **I\'d love to.** 라고 합니다. 거절할 때는 Sorry, I can\'t. I have other plans. 처럼 말합니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 2,
        q: '다음 안내문을 읽고, 내용과 **맞는** 것을 고르세요.\n\nCity Library Rules\n- You must show your library card to borrow books.\n- You can borrow up to five books at a time.\n- You don\'t have to pay for late returns, but you should return books on time.\n- You mustn\'t eat or drink in the reading room.',
        choices: ['도서관 카드가 없어도 책을 빌릴 수 있다.', '한 번에 다섯 권까지 빌릴 수 있다.', '책을 늦게 반납하면 돈을 내야 한다.', '열람실에서 음료를 마셔도 된다.'],
        answer: 1,
        why: [
          'You must show your library card — 책을 빌리려면 카드를 꼭 보여 줘야 합니다.',
          '',
          'You don\'t have to pay for late returns — 늦게 반납해도 돈을 낼 필요는 없습니다. 다만 제때 반납하는 게 좋다고(should) 합니다.',
          'You mustn\'t eat or drink — 열람실에서는 먹거나 마시면 안 됩니다(금지).',
        ],
        explain: 'You **can** borrow up to five books at a time. — "한 번에 다섯 권까지 빌릴 수 있습니다." can이 허락(~해도 된다)의 뜻으로 쓰였습니다.',
      },
    ],

    deeper: [
      {
        title: '부탁의 공손함 사다리',
        body: '같은 부탁도 고르는 조동사에 따라 느낌이 달라집니다. 아래로 갈수록 더 공손합니다.\n\n1. Open the window. (명령 — 친한 사이에서도 딱딱하게 들릴 수 있음)\n2. **Can** you open the window? (편한 부탁)\n3. **Could** you open the window? / **Would** you open the window? (공손한 부탁)\n4. **Could you possibly** open the window? (매우 공손한 부탁)\n\n끝에 please를 붙이면 한층 부드러워집니다. 처음 만난 사람, 손님, 윗사람에게는 3번 이상을 쓰는 것이 무난합니다.',
      },
      {
        title: '조동사를 겹쳐 쓰고 싶을 때',
        body: '영어는 조동사를 두 개 겹쳐 쓰지 않습니다. 그래서 "~할 수 있을 것이다", "~해야 할 것이다"처럼 미래와 능력·의무를 함께 말할 때는 뒤쪽을 다른 표현으로 바꿉니다.\n\n| 하고 싶은 말 | ✗ | ○ |\n|---|---|---|\n| 내년에는 운전할 수 있을 것이다 | will can drive | **will be able to** drive |\n| 내일은 일찍 나가야 할 것이다 | will must leave | **will have to** leave |\n| 지금까지 ~할 수 있었다 | have could | **have been able to** |\n\nbe able to와 have to는 조동사가 아니라 동사처럼 모양이 바뀌는 표현이라 다른 조동사 뒤에 올 수 있습니다.',
      },
    ],

    faq: [
      {
        q: 'must랑 have to는 똑같은 뜻이에요?',
        a: '긍정문에서는 둘 다 "~해야 한다"로 거의 같게 씁니다. must는 규칙이나 말하는 사람의 강한 생각, have to는 회사 사정·일정 같은 바깥 사정에서 오는 의무에 더 자주 씁니다.\n\n그러나 부정문은 전혀 다릅니다. mustn\'t는 "하면 안 된다", don\'t have to는 "할 필요가 없다"입니다. 또 과거는 must가 아니라 had to로 말합니다.',
      },
      {
        q: 'could는 can의 과거인데 왜 공손한 부탁에 써요?',
        a: '영어에서는 과거형처럼 "한 걸음 물러선" 말이 덜 직접적으로 들려서 공손한 느낌을 줍니다. 우리말에서 "도와줄래?"보다 "도와주실 수 있을까요?"가 부드러운 것과 비슷합니다.\n\n그래서 Could you ~? 는 과거의 뜻이 아니라 지금 하는 공손한 부탁입니다. would like의 would도 같은 까닭으로 정중하게 들립니다.',
      },
      {
        q: 'I\'d like랑 I like는 뭐가 달라요?',
        a: 'I like coffee. 는 "나는 (평소에) 커피를 좋아한다"는 취향이고, I\'d like a coffee. 는 "(지금) 커피 한 잔 주세요/마시고 싶어요"라는 바람입니다. 주문하거나 부탁할 때는 I\'d like를 씁니다.',
      },
    ],

    mistakes: [
      '조동사 뒤에 -s, to, -ing를 붙이는 실수 — She can sings. / You must to go. (✗) → She can sing. / You must go. (○)',
      'mustn\'t와 don\'t have to를 같은 뜻으로 쓰는 실수 — mustn\'t는 "하면 안 된다"(금지), don\'t have to는 "할 필요 없다"입니다.',
      '조동사 문장의 부정·의문에 do·does를 쓰는 실수 — He doesn\'t can swim. / Do you can swim? (✗) → He can\'t swim. / Can you swim? (○)',
    ],

    gens: [
      {
        id: 'modal-base-form',
        level: 1,
        title: '조동사 뒤의 동사원형 고르기',
        make: function (R) {
          var it = R.pick(MB);
          var choices = [it[1], it[2], 'to ' + it[1]];
          var to = it[0].indexOf('to ___') >= 0;
          return {
            type: 'choice', concept: 0,
            q: '빈칸에 알맞은 말을 고르세요.\n\n' + it[0],
            choices: choices,
            answer: 0,
            hint: '빈칸 앞의 조동사를 찾아보세요.',
            why: [
              '',
              it[2] + ' — 조동사 뒤에는 -s를 붙이지 않은 동사원형을 씁니다. 주어가 3인칭 단수여도 마찬가지입니다.',
              to ? '빈칸 앞에 이미 to가 있습니다. to를 한 번 더 쓰지 않고 동사원형만 씁니다.' : '조동사 뒤에는 to 없이 바로 동사원형을 씁니다.',
            ],
            explain: (to ? 'have to·has to·would like to 뒤에는' : '조동사 뒤에는') + ' 동사원형을 씁니다.\n\n바른 문장: ' + it[0].replace('___', it[1]) + '\n(' + it[3] + ')',
          };
        },
      },
      {
        id: 'have-to-form',
        level: 1,
        title: 'have to의 꼴 바꾸기',
        make: function (R) {
          var s = R.pick(HT_SUBJ);
          var vp = R.pick(HT_VP);
          var t = R.pick(HT_TIME);
          var ans = t[1] === 'past' ? 'had to' : (s[1] ? 'has to' : 'have to');
          var reason = t[1] === 'past'
            ? t[0] + ' — 과거입니다. have to의 과거는 주어와 상관없이 had to입니다.'
            : (s[1] ? '주어 ' + s[0] + ' — 3인칭 단수이고, ' + t[0] + ' — 요즘(지금)의 일입니다. 그래서 has to입니다.'
              : '주어 ' + s[0] + ' — 3인칭 단수가 아니고, ' + t[0] + ' — 요즘(지금)의 일입니다. 그래서 have to입니다.');
          var all = ['have to', 'has to', 'had to', 'must'];
          var wrong = [];
          all.forEach(function (w) {
            if (w === ans) return;
            if (w === 'must') {
              if (t[1] === 'past') wrong.push({ a: 'must', why: 'must에는 과거형이 없습니다. 과거의 의무는 had to로 말합니다.' });
              else wrong.push({ a: 'must', why: 'must도 "~해야 한다"는 뜻이지만, 이 문제는 괄호 안의 have to를 주어와 때에 맞게 바꾸어 쓰는 문제입니다. ' + ans + '로 씁니다.' });
              return;
            }
            if (w === 'had to') wrong.push({ a: w, why: 'had to — 과거입니다. ' + t[0] + ' — 요즘(지금)의 일이므로 현재형을 씁니다.' });
            else if (t[1] === 'past') wrong.push({ a: w, why: w + ' — 현재형입니다. ' + t[0] + ' — 과거이므로 had to를 씁니다.' });
            else if (w === 'has to') wrong.push({ a: w, why: 'has to — 주어가 3인칭 단수일 때 씁니다. 주어 ' + s[0] + ' 뒤에는 have to를 씁니다.' });
            else wrong.push({ a: w, why: '주어 ' + s[0] + ' — 3인칭 단수라서 have가 아니라 has를 씁니다.' });
          });
          var sentence = s[0] + ' ___ ' + vp + ' ' + t[0] + '.';
          return {
            type: 'short', check: 'text', concept: 2,
            q: '괄호 안의 말을 알맞은 꼴로 바꾸어 쓰세요.\n\n' + s[0] + ' ___ (have to) ' + vp + ' ' + t[0] + '.',
            answer: [ans],
            hint: '주어와 때를 나타내는 말을 함께 보세요.',
            wrong: wrong,
            explain: reason + '\n\n바른 문장: ' + sentence.replace('___', ans),
          };
        },
      },
      {
        id: 'modal-meaning',
        level: 2,
        title: '뜻에 맞는 조동사 고르기',
        make: function (R) {
          var it = R.pick(MM);
          var start = it[1].indexOf('___') === 0;
          var fix = function (w) { return start ? capFirst(w) : w; };
          var opts = [it[2]].concat(it[3]);
          var card = { can: 1, could: 1, "can't": 1, "couldn't": 1, must: 2, "mustn't": 2, 'had to': 2, 'has to': 2, "don't have to": 2, should: 3, "shouldn't": 3, may: 3, might: 3, would: 4, 'would like to': 4 }[it[2]];
          return {
            type: 'choice', concept: card,
            q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + it[0] + '\n→ ' + it[1],
            choices: opts.map(fix),
            answer: 0,
            hint: '우리말이 능력·의무·금지·필요 없음·충고·추측·허락·바람 가운데 무엇인지 먼저 생각해 보세요.',
            why: opts.map(function (w) {
              if (w === it[2]) return '';
              if (it[4] && it[4][w]) return it[4][w];
              return MEAN[w] + ' 우리말 "' + it[0] + '"의 뜻과 맞지 않습니다.';
            }),
            explain: MEAN[it[2]] + '\n\n바른 문장: ' + it[1].replace('___', fix(it[2])),
          };
        },
      },
    ],

    vocab: [
      { w: 'helmet', m: '헬멧, 안전모', ex: 'You must wear a helmet on the construction site.', exm: '공사 현장에서는 반드시 안전모를 써야 합니다.' },
      { w: 'seat belt', m: '안전벨트', ex: 'Please fasten your seat belt.', exm: '안전벨트를 매 주세요.' },
      { w: 'rule', m: '규칙', ex: 'We must follow the rules at work.', exm: '우리는 직장에서 규칙을 지켜야 합니다.' },
      { w: 'uniform', m: '제복, 유니폼', ex: 'Nurses have to wear a uniform.', exm: '간호사는 유니폼을 입어야 합니다.' },
      { w: 'quiet', m: '조용한', ex: 'You should be quiet in the hospital.', exm: '병원에서는 조용히 하는 게 좋습니다.' },
      { w: 'park', m: '주차하다', ex: 'You can park in front of the building.', exm: '건물 앞에 주차하셔도 됩니다.' },
      { w: 'borrow', m: '빌리다', ex: 'May I borrow your umbrella?', exm: '우산 좀 빌려도 될까요?' },
      { w: 'lend', m: '빌려주다', ex: 'Could you lend me some money?', exm: '돈을 좀 빌려주시겠어요?' },
      { w: 'break', m: '휴식, 쉬는 시간', ex: 'You should take a break every hour.', exm: '한 시간마다 쉬는 게 좋습니다.' },
      { w: 'probably', m: '아마', ex: 'The meeting will probably finish late.', exm: '회의는 아마 늦게 끝날 겁니다.' },
      { w: 'in advance', m: '미리', ex: 'You don\'t have to buy tickets in advance.', exm: '표를 미리 살 필요는 없습니다.' },
      { w: 'reservation', m: '예약', ex: 'I\'d like to make a reservation for Friday.', exm: '금요일로 예약하고 싶습니다.' },
      { w: 'polite', m: '공손한, 예의 바른', ex: 'Could you ~? is more polite than Can you ~?', exm: 'Could you ~? 가 Can you ~? 보다 더 공손합니다.' },
    ],
  });
})();
