/* 생활 영어 표현 · 직장에서 쓰는 표현
 * 대화·이메일은 모두 직접 쓴 글이다(가상의 인물·가상의 회사). 이메일 주소는 더미(hong@example.com)만 쓴다.
 * 영어 낱말 바로 뒤에는 받침에 따라 바뀌는 조사를 되도록 붙이지 않는다. */
(function () {
  // 상황 → 표현 생성기: [id, 개념 카드, 상황(우리말), 표현, 그 표현의 뜻(오답 진단용), 함께 보기로 내지 않을 id]
  var SITUATIONS = [
    ['introduce', 0, '새로 온 동료를 다른 동료에게 소개할 때', 'This is my colleague, Jia Han. She just joined our team.', '동료를 다른 사람에게 소개하는 말입니다', []],
    ['meet', 0, '처음 소개받은 사람에게 인사할 때', 'Nice to meet you.', '처음 만난 사람에게 하는 인사입니다', ['heard']],
    ['heard', 0, '이야기로만 듣던 사람을 처음 만나 반가움을 나타낼 때', 'I\'ve heard a lot about you.', '말씀을 많이 들었다는 인사입니다', ['meet']],
    ['role', 0, '회사에서 자기가 맡은 일을 소개할 때', 'I\'m in charge of customer service.', '자기가 맡은 일을 소개하는 말입니다', []],
    ['weekend', 0, '월요일 아침 동료에게 가볍게 안부를 물을 때', 'How was your weekend?', '주말을 어떻게 보냈는지 묻는 말입니다', []],
    ['start', 1, '회의를 시작하자고 할 때', 'OK, everyone. Let\'s get started.', '회의를 시작하자는 말입니다', ['purpose']],
    ['purpose', 1, '오늘 회의의 목적을 밝힐 때', 'The purpose of today\'s meeting is to plan the year-end event.', '회의의 목적을 밝히는 말입니다', ['start']],
    ['add', 1, '다른 사람 의견에 덧붙일 말이 있을 때', 'I\'d like to add something.', '덧붙일 말이 있다는 말입니다', []],
    ['clarify', 1, '상대가 한 말을 좀 더 분명하게 설명해 달라고 할 때', 'Could you clarify that, please?', '분명하게 설명해 달라는 부탁입니다', []],
    ['disagree', 1, '상대 의견에 공손하게 반대할 때', 'I see your point, but I\'m not sure I agree.', '상대 말을 이해한다고 밝힌 뒤 공손하게 반대하는 말입니다', []],
    ['next', 1, '다음 안건으로 넘어가자고 할 때', 'Let\'s move on to the next item.', '다음 안건으로 넘어가자는 말입니다', ['wrapup']],
    ['wrapup', 1, '회의를 마무리하자고 할 때', 'Let\'s wrap up for today.', '오늘 회의를 마무리하자는 말입니다', ['next']],
    ['send', 2, '동료에게 매출 보고서를 보내 달라고 부탁할 때', 'Could you send me the sales report?', '보고서를 보내 달라는 부탁입니다', []],
    ['mind', 2, '"이 숫자들 좀 확인해 주시겠어요?"라고 아주 공손하게 부탁할 때', 'Would you mind checking these numbers?', '이 숫자들을 확인해 달라는 공손한 부탁입니다', []],
    ['confirm', 2, '마감일이 금요일이 맞는지 다시 확인할 때', 'Just to confirm, the deadline is Friday, right?', '마감일을 다시 확인하는 말입니다', []],
    ['getback', 2, '지금은 답하기 어려워 알아보고 나중에 알려 주겠다고 할 때', 'Let me check and get back to you.', '알아보고 나중에 다시 연락하겠다는 말입니다', ['calendar']],
    ['sure', 2, '동료의 부탁을 흔쾌히 들어줄 때', 'Sure, no problem.', '부탁을 흔쾌히 들어주겠다는 대답입니다', []],
    ['available', 3, '상대가 다음 주 언제 시간이 되는지 물을 때', 'When are you available next week?', '언제 시간이 되는지 묻는 말입니다', ['works']],
    ['works', 3, '화요일이 상대에게 괜찮은지 물을 때', 'Does Tuesday work for you?', '화요일이 괜찮은지 묻는 말입니다', ['available']],
    ['calendar', 3, '내 일정을 확인해 보고 답하겠다고 할 때', 'Let me check my calendar.', '일정을 확인해 보겠다는 말입니다', ['getback']],
    ['busy', 3, '그날은 하루 종일 일정이 꽉 차 있다고 할 때', 'I\'m afraid I\'m tied up all day.', '하루 종일 바빠서 시간이 없다는 말입니다', []],
    ['invite', 3, '회의 일정을 일정 초대(캘린더)로 보내겠다고 할 때', 'I\'ll send you a calendar invite.', '일정 초대를 보내겠다는 말입니다', []],
    ['writing', 4, '이메일 첫머리에서 이메일을 쓰는 목적을 밝힐 때', 'I\'m writing to ask about the training schedule.', '이메일을 쓰는 목적을 밝히는 말입니다', []],
    ['attach', 4, '이메일에 회의록 파일을 첨부했다고 알릴 때', 'Please find attached the meeting notes.', '파일을 첨부했다고 알리는 말입니다', []],
    ['forward', 4, '답장을 기다리겠다고 정중하게 끝맺을 때', 'I look forward to hearing from you.', '답장을 기다리겠다는 정중한 끝맺음입니다', []],
  ];

  // 빈칸 한 낱말: [개념 카드, 문제 글, [정답들], 해설, 흔한 틀린 답 [{a, why}]]
  var BLANKS = [
    [0, '(우리말 뜻: 동료) Minsu, this is my ___, Seojun Park. We work on the same team.', ['colleague', 'coworker', 'co-worker', 'teammate'], '**colleague** — 함께 일하는 동료입니다(coworker, 같은 팀이면 teammate도 씁니다).', []],
    [0, '(처음 만난 사이) Nice to ___ you, Ms. Han.', ['meet'], '처음 만난 사람에게는 **Nice to meet you.**라고 인사합니다.', [{ a: 'see', why: 'Nice to see you — 전에 만난 적이 있는 사람을 다시 만났을 때 하는 인사입니다. 처음 만난 사이에는 meet입니다.' }]],
    [0, 'I\'ve ___ a lot about you. Welcome to the team!', ['heard'], '**I\'ve heard a lot about you.** — "말씀 많이 들었어요"라는 인사입니다(have + 과거분사 heard).', [{ a: 'hear', why: 'I\'ve 뒤에는 과거분사가 옵니다. hear의 과거분사는 heard입니다.' }]],
    [0, 'I\'m in ___ of the new project, so please come to me with any questions.', ['charge'], '**be in charge of ~** — ~을 맡고 있다, ~의 책임자다라는 뜻입니다.', []],
    [1, 'OK, let\'s get ___. We have a lot to cover today.', ['started', 'going'], '**Let\'s get started.** — 회의를 시작하자는 말입니다(Let\'s get going.도 씁니다).', [{ a: 'start', why: 'get 뒤에는 과거분사 started를 써서 get started라고 합니다. (Let\'s start.도 되지만 이 문장에는 get이 있습니다.)' }]],
    [1, 'I\'d like to ___ something to what Minsu said.', ['add'], '**I\'d like to add something.** — 덧붙일 말이 있을 때 씁니다.', []],
    [1, '(우리말 뜻: 다음 안건으로 넘어갑시다) We\'re running out of time, so let\'s move ___ to the next item.', ['on', 'along', 'ahead'], '**move on to ~** — ~로 넘어가다라는 뜻입니다(move along, move ahead도 씁니다).', []],
    [1, 'Could you ___ that, please? I\'m not sure what you mean.', ['clarify', 'explain', 'rephrase', 'repeat'], '**Could you clarify that?** — 좀 더 분명하게 설명해 달라는 부탁입니다(explain, rephrase도 됩니다).', []],
    [1, 'OK, let\'s ___ up. Thank you all for your time.', ['wrap', 'finish', 'wind', 'sum'], '**wrap up** — (회의·일을) 마무리하다라는 뜻입니다(finish up, wind up, 요약하며 끝낼 때는 sum up도 씁니다).', []],
    [2, 'Would you ___ checking these numbers for me?', ['mind'], '**Would you mind + -ing?** — "~해 주시겠어요?"라는 아주 공손한 부탁입니다.', []],
    [2, 'Just to ___, the meeting is at 2 o\'clock, right?', ['confirm', 'clarify', 'check'], '**Just to confirm, ~** — 내용을 다시 확인할 때 쓰는 말입니다(check, clarify도 씁니다).', []],
    [2, 'I don\'t know the answer yet. I\'ll find out and get ___ to you.', ['back'], '**get back to ~** — (알아보고) ~에게 다시 연락하다라는 뜻입니다.', []],
    [2, 'A: Could you help me with these slides? B: Sure, no ___.', ['problem', 'worries'], '**Sure, no problem.** — 부탁을 흔쾌히 들어주는 대답입니다(No worries.도 씁니다).', []],
    [3, 'Does Tuesday ___ for you? If not, Wednesday is fine too.', ['work'], '**Does ~ work for you?** — 그 날짜·시간이 괜찮은지 묻는 말입니다.', [{ a: 'works', why: 'Does 뒤에는 동사원형을 씁니다: Does Tuesday work for you?' }]],
    [3, 'I\'m not sure. Let me check my ___ and let you know.', ['calendar', 'schedule', 'diary'], '**Let me check my calendar.** — 일정을 확인해 보겠다는 말입니다(schedule도 씁니다).', []],
    [3, 'I\'m afraid I\'m tied ___ all morning. How about 2 o\'clock?', ['up'], '**be tied up** — (일에) 묶여 있다, 너무 바빠 시간이 없다라는 뜻입니다.', []],
    [3, 'When are you ___ next week? I\'d like to set up a short meeting.', ['available', 'free'], '**When are you available?** — 언제 시간이 되는지 묻는 말입니다(free도 됩니다).', []],
    [4, 'Dear Ms. Choi, I\'m ___ to ask about the training schedule.', ['writing'], '**I\'m writing to ~** — 이메일을 쓰는 목적을 밝히는 첫머리 표현입니다.', [{ a: 'write', why: 'I\'m 뒤에는 -ing 꼴을 써서 I\'m writing to ~ 라고 합니다.' }]],
    [4, 'Please find ___ the meeting notes from Monday.', ['attached', 'enclosed'], '**Please find attached ~** — "~을 첨부합니다"라는 격식 있는 이메일 표현입니다(편지에서 온 Please find enclosed ~도 씁니다).', [{ a: 'attach', why: 'Please find attached ~ 에서는 과거분사 attached를 씁니다.' }]],
    [4, 'I look forward to ___ from you.', ['hearing'], '**look forward to + -ing** — to 뒤에 동사원형이 아니라 -ing 꼴이 옵니다.', [{ a: 'hear', why: 'look forward to의 to는 전치사라서 뒤에 -ing 꼴이 옵니다: hearing' }]],
    [4, 'Please let me ___ if you have any questions.', ['know'], '**Please let me know if ~** — "~하면 알려 주세요"라는 이메일 끝맺음입니다.', [{ a: 'knows', why: 'let + 사람 + 동사원형: let me know' }]],
    [4, 'Thank you for your help.\n\nBest ___,\nJia Han', ['regards', 'wishes'], '**Best regards,** — 업무 이메일의 무난한 끝인사입니다(Best wishes,도 씁니다).', [{ a: 'regard', why: '끝인사는 복수형 regards를 씁니다: Best regards,' }]],
  ];

  // by(마감) / until(계속): [문장, 정답 갈래]
  var BY_UNTIL = [
    ['Please send me the report ___ Friday.', 'by'],
    ['I\'ll be out of the office ___ Wednesday.', 'until'],
    ['The cafeteria is open ___ 2 p.m.', 'until'],
    ['Could you finish the slides ___ 3 o\'clock?', 'by'],
    ['We need your answer ___ the end of the month.', 'by'],
    ['I worked on the budget ___ midnight last night.', 'until'],
    ['Please return the signed contract ___ June 10.', 'by'],
    ['Can you wait ___ I finish this call?', 'until'],
    ['Ms. Choi is on vacation ___ next Monday.', 'until'],
    ['The new system must be ready ___ next week.', 'by'],
    ['Let\'s keep working ___ we find a solution.', 'until'],
    ['I\'ll have the numbers ready ___ tomorrow morning.', 'by'],
    ['The office will be closed ___ January 2.', 'until'],
    ['All forms must be submitted ___ 6 p.m. today.', 'by'],
    ['He stayed at the client\'s office ___ late in the evening.', 'until'],
    ['Please reply ___ Thursday so we can book the room.', 'by'],
    ['I can\'t meet you ___ after lunch.', 'until'],
    ['We have to pay the bill ___ the 25th.', 'by'],
    ['The discount continues ___ the end of the week.', 'until'],
    ['Let me know ___ tomorrow whether you can come.', 'by'],
    ['I\'ll be in meetings ___ 4, so please text me.', 'until'],
    ['The package should arrive ___ Tuesday.', 'by'],
  ];
  var BY_WHY = '**by** — "그때까지는 (끝내다)"라는 마감입니다. 그 시각 전에 한 번 일이 끝나면 됩니다.';
  var UNTIL_WHY = '**until** — "그때까지 계속"이라는 뜻입니다. 그 시각까지 상태나 일이 이어집니다.';

  Tutor.registerUnit({
    id: 'eng-a-talk-10',
    course: 'eng-a-talk',
    title: '직장에서 쓰는 표현',
    summary: '동료 소개, 회의, 업무 요청과 확인, 일정 조율, 간단한 업무 이메일까지 직장 영어를 익힙니다.',
    goals: [
      '동료와 인사하고 다른 사람에게 동료를 소개할 수 있다.',
      '회의를 열고, 의견을 덧붙이거나 공손하게 반대하고, 회의를 마무리하는 표현을 쓸 수 있다.',
      '업무를 공손하게 부탁하고, 마감·내용을 다시 확인할 수 있다.',
      '날짜·시간을 조율하고, 목적·첨부·끝인사를 갖춘 짧은 업무 이메일을 읽고 쓸 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '동료와 인사하고 소개하기 — This is my colleague, ~.',
        body: '새 직장이나 다른 부서 사람을 만날 때는 **소개하는 말**과 **답하는 인사**를 짝으로 익혀 둡니다.\n\n| 상황 | 표현 |\n|---|---|\n| 동료를 소개할 때 | **This is my colleague**, Jia Han. / I\'d like you to meet Seojun Park. |\n| 하는 일을 덧붙일 때 | She works in marketing. / He\'s in charge of the new project. |\n| 처음 만난 사람에게 | Nice to meet you. / It\'s a pleasure to meet you. |\n| 이야기로만 듣던 사람에게 | **I\'ve heard a lot about you.** (말씀 많이 들었어요.) |\n| 자기 일을 소개할 때 | I work in accounting. / I\'m in charge of customer service. |\n| 가벼운 안부 | How\'s it going? / How was your weekend? / Have a good weekend! |\n\n사람을 소개할 때는 He is ~ 대신 **This is ~** 꼴을 씁니다. 손으로 그 사람을 가리키며 "이분은 ~입니다"라고 하는 느낌입니다. 소개한 뒤에는 그 사람이 하는 일을 한 문장 덧붙이면 대화가 자연스럽게 이어집니다.\n\n> 💡 Nice to meet you. 는 처음 만났을 때, Nice to see you. 는 전에 만난 사람을 다시 볼 때 씁니다.',
        easy: '소개는 다리를 놓는 일입니다. 양쪽 사람에게 서로의 이름표를 건네주면 됩니다.\n\nMinsu, this is Jia. Jia, this is Minsu. (민수 씨, 이쪽은 지아 씨예요. 지아 씨, 이쪽은 민수 씨예요.)\n\n소개받은 사람은 Nice to meet you. 하고 웃으며 인사하면 충분합니다.',
        check: {
          type: 'choice',
          q: '동료 서준을 손님에게 소개하려 합니다. 빈칸에 가장 알맞은 말을 고르세요.\n\nMs. Choi, ___ my colleague, Seojun Park.',
          choices: ['these are', 'this is', 'it is'],
          answer: 1,
          why: ['these are — 여러 사람을 소개할 때 씁니다. 서준은 한 사람입니다.', '', 'it — 사물을 가리키는 말이라 사람을 소개할 때 쓰지 않습니다.'],
          explain: '한 사람을 소개할 때는 **This is ~** 꼴을 씁니다: Ms. Choi, this is my colleague, Seojun Park.',
        },
      },
      {
        title: '회의 표현 — Let\'s get started. I\'d like to add ~.',
        body: '회의는 **열기 → 의견 나누기 → 넘어가기 → 마무리**의 흐름이 있습니다. 단계마다 쓰는 말이 정해져 있어 익혀 두면 편합니다.\n\n| 단계 | 표현 |\n|---|---|\n| 열기 | **Let\'s get started.** / Thank you all for coming. / The purpose of today\'s meeting is to ~. |\n| 의견 묻기 | What do you think, Jia? / Any thoughts on this? |\n| 덧붙이기 | **I\'d like to add** something. / Can I add something here? |\n| 찬성 | I agree with you. / That\'s a good point. |\n| 공손한 반대 | I see your point, but ~. / I\'m not sure I agree. |\n| 설명 부탁 | Could you clarify that, please? |\n| 넘어가기 | Let\'s move on to the next item. |\n| 마무리 | Let\'s wrap up. / To sum up, ~. / Thank you for your time. |\n\n반대할 때는 바로 "아니다"라고 하지 않고 **먼저 상대의 말을 인정한 뒤** but으로 내 생각을 말합니다. I see your point, but I think we need more time. 처럼 쓰면 같은 반대도 훨씬 부드럽게 들립니다.\n\n> 💡 남의 말 중간에 끼어들 때는 Sorry to interrupt, but ~ 으로 시작합니다.',
        easy: '회의 영어는 사회자의 말 네 마디를 먼저 외우면 반은 끝납니다.\n\n1. 시작: Let\'s get started.\n2. 묻기: What do you think?\n3. 넘기기: Let\'s move on.\n4. 끝내기: Let\'s wrap up.\n\n내가 말을 보태고 싶을 때는 손을 살짝 들고 I\'d like to add something. 하면 됩니다.',
        check: {
          type: 'choice',
          q: '회의에서 동료의 의견에 공손하게 반대하는 말로 가장 알맞은 것을 고르세요.',
          choices: ['You\'re wrong. That plan will never work.', 'I totally agree with you.', 'I see your point, but I\'m not sure I agree.'],
          answer: 2,
          why: ['뜻은 통하지만 상대를 바로 틀렸다고 해서 회의에서는 무례하게 들립니다.', '완전히 찬성한다는 말입니다. 반대가 아닙니다.', ''],
          explain: '먼저 상대의 말을 인정하고(I see your point) but으로 내 생각을 말하면 공손한 반대가 됩니다.',
        },
      },
      {
        title: '업무 요청과 확인 — Could you send me ~? Just to confirm, ~',
        body: '직장에서는 부탁을 **공손하게**, 들은 내용은 **다시 확인**하는 습관이 중요합니다.\n\n**부탁하기** (아래로 갈수록 더 공손합니다)\n- Can you take a look at this?\n- **Could you send me** the report by Friday?\n- **Would you mind checking** these numbers? (mind 뒤에는 -ing)\n- I was wondering if you could help me with the slides.\n\n**답하기**\n- Sure, no problem. / I\'ll send it to you by 3.\n- I\'m afraid I can\'t today, but I can do it tomorrow morning.\n\n**확인하기**\n- **Just to confirm**, the deadline is Friday, right?\n- So you need the final version, not the draft. Is that right?\n- Let me check and **get back to you**.\n\n> ⚠️ Would you mind ~? 는 "~하는 것이 싫으신가요?"라는 물음입니다. 그래서 들어주겠다는 대답은 Yes가 아니라 **Not at all.** / Of course not. / Sure.입니다. Yes, I do. 라고 하면 "네, 싫습니다"가 됩니다.',
        easy: '부탁은 문을 두드리는 세기와 같습니다. Can you ~? 꼴은 가볍게 똑똑, Could you ~? 꼴은 정중하게 똑똑, Would you mind ~ing? 꼴은 아주 조심스럽게 똑똑입니다.\n\n그리고 중요한 숫자·날짜를 들으면 반드시 되물어 확인합니다. Just to confirm, Friday at 3? 한 마디가 실수를 막아 줍니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nWould you mind ___ this email before I send it?',
          choices: ['to check', 'check', 'checking'],
          answer: 2,
          why: ['mind 뒤에는 to 부정사가 아니라 -ing 꼴이 옵니다.', 'mind 뒤에 동사원형은 오지 않습니다. -ing 꼴로 씁니다.', ''],
          explain: 'mind 뒤에는 -ing 꼴이 옵니다: **Would you mind checking this email?** (보내기 전에 이 이메일 좀 확인해 주시겠어요?)',
        },
      },
      {
        title: '일정 조율하기 — Does Tuesday work for you?',
        body: '회의·약속 날짜를 맞출 때 쓰는 말입니다.\n\n| 뜻 | 표현 |\n|---|---|\n| 언제 시간 되세요? | When are you **available**? / When is good for you? |\n| ~이 괜찮으세요? | **Does Tuesday work for you?** / How about Wednesday at 10? |\n| 좋아요 | Tuesday works for me. / That\'s fine with me. |\n| 그때는 어려워요 | I\'m afraid I\'m **tied up** on Tuesday. / I have another meeting then. |\n| 확인해 볼게요 | Let me **check my calendar**. |\n| 정하기 | Let\'s set up a meeting. / I\'ll send you a calendar invite. |\n\n**마감을 말할 때 — by와 until**\n\n| 말 | 뜻 | 예 |\n|---|---|---|\n| by | 그때**까지는** (끝내다) — 마감 | Please send it **by** Friday. (금요일까지 보내 주세요.) |\n| until | 그때**까지 계속** | I\'ll be away **until** Friday. (금요일까지 계속 자리를 비웁니다.) |\n\n우리말로는 둘 다 "~까지"라서 헷갈립니다. "그때까지 한 번 끝내면 되나?"면 by, "그때까지 계속 이어지나?"면 until입니다.\n\n> 💡 거절할 때도 새로운 시간을 함께 제안하면 일정이 빨리 정해집니다: I\'m tied up on Tuesday. How about Thursday morning?',
        easy: '일정 조율은 탁구처럼 주고받기입니다.\n\nA: Does Tuesday work for you? (화요일 괜찮아요?)\nB: I\'m afraid I\'m busy then. How about Wednesday? (그날은 어려워요. 수요일 어때요?)\nA: Wednesday works for me. (수요일 좋아요.)\n\nby는 "결승선", until은 "계속 달리는 길"이라고 기억하면 됩니다. 금요일이 결승선이면 by Friday, 금요일까지 계속이면 until Friday입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nPlease send me your answer ___ Thursday.',
          choices: ['until', 'by', 'during'],
          answer: 1,
          why: ['until — "그때까지 계속"이라는 뜻입니다. 답을 목요일까지 계속 보내는 것이 아닙니다.', '', 'during — "~동안"이라는 뜻이고 뒤에 기간(the meeting, the week)이 옵니다.'],
          explain: '"목요일까지는 답을 보내 달라"는 마감이므로 **by**를 씁니다.',
        },
      },
      {
        title: '간단한 업무 이메일 — I\'m writing to ~. Please find attached ~.',
        body: '업무 이메일은 짧아도 **차례**가 있습니다.\n\n| 부분 | 표현 |\n|---|---|\n| 제목 | Subject: Meeting on Tuesday |\n| 받는 사람 | **Dear** Mr. Park, (격식) / Hi Jia, (가까운 사이) |\n| 목적 | **I\'m writing to** confirm our meeting on Tuesday. |\n| 본문·첨부 | **Please find attached** the agenda. / I\'ve attached the file. |\n| 부탁·끝맺음 | Please let me know if you have any questions. / **I look forward to hearing** from you. |\n| 끝인사·이름 | **Best regards,** Minsu Lee |\n\n- 첫 문장에서 **이메일을 쓰는 목적**을 밝힙니다: I\'m writing to ask about ~ / I\'m writing to let you know that ~\n- 파일을 붙였으면 꼭 알립니다. Please find attached ~ 는 격식 있는 말이고, 요즘은 I\'ve attached ~ 도 많이 씁니다.\n- look forward to의 to는 전치사라서 뒤에 -ing 꼴이 옵니다: look forward to **hearing** (hear ✗)\n\n> 💡 끝인사는 Best regards, / Kind regards, 가 무난합니다. 가까운 동료에게는 Thanks, 로 끝내기도 합니다.',
        easy: '업무 이메일은 편지 봉투 순서를 떠올리면 쉽습니다.\n\n1. 누구에게: Dear Ms. Han,\n2. 왜 쓰나: I\'m writing to ~\n3. 무엇을 보내나: Please find attached ~\n4. 무엇을 바라나: Please let me know ~\n5. 누가 보내나: Best regards, Jia\n\n이 다섯 칸만 채우면 짧고 예의 바른 이메일이 됩니다.',
        check: {
          type: 'ox',
          q: '업무 이메일 끝맺음으로 I look forward to hear from you. 라고 쓰는 것이 바른 문장입니다.',
          answer: false,
          explain: 'look forward to의 to는 전치사라서 뒤에 -ing 꼴이 옵니다. 바른 문장은 **I look forward to hearing from you.**입니다.',
        },
      },
    ],

    examples: [
      {
        q: '팀장에게 다음 내용을 담은 짧은 이메일을 써 보세요.\n\n- 받는 사람: 박 팀장(Mr. Park)\n- 목적: 화요일 오전 10시 회의 확인\n- 첨부: 회의 안건(agenda)\n- 끝맺음: 질문이 있으면 알려 달라',
        steps: [
          '받는 사람(격식): Dear Mr. Park,',
          '첫 문장에 목적: I\'m writing to confirm our meeting on Tuesday at 10 a.m.',
          '첨부 알리기: Please find attached the agenda.',
          '끝맺음: Please let me know if you have any questions.',
          '끝인사와 이름: Best regards, Jia Han',
        ],
        answer: 'Dear Mr. Park,\n\nI\'m writing to confirm our meeting on Tuesday at 10 a.m. Please find attached the agenda. Please let me know if you have any questions.\n\nBest regards,\nJia Han',
      },
      {
        q: '동료가 "Could you send me the sales figures by Thursday?"라고 부탁했습니다. 수요일 오후까지 보낼 수 있다면 어떻게 답하고 확인할까요?',
        steps: [
          '흔쾌히 받아들이기: Sure, no problem.',
          '내가 할 수 있는 시간을 알리기: I can send them by Wednesday afternoon.',
          '들은 내용 다시 확인하기: Just to confirm, you need the figures for last month, right?',
        ],
        answer: 'Sure, no problem. I can send them by Wednesday afternoon. Just to confirm, you need the figures for last month, right?',
      },
    ],

    terms: [
      { term: 'colleague', def: '같은 회사·같은 일을 하는 동료입니다. coworker라고도 합니다. 예: This is my colleague, Jia.' },
      { term: '안건(agenda)', def: '회의에서 다룰 내용을 차례대로 적은 목록입니다. 예: Let\'s look at the first item on the agenda.' },
      { term: 'deadline', def: '일을 끝내야 하는 마감 날짜·시각입니다. 예: The deadline is Friday at 5 p.m.' },
      { term: 'by와 until', def: 'by는 그때까지 끝내야 하는 마감, until은 그때까지 계속 이어지는 것을 나타냅니다. 예: by Friday(금요일까지 끝내기), until Friday(금요일까지 계속)' },
      { term: 'Would you mind ~ing?', def: '"~해 주시겠어요?"라는 아주 공손한 부탁입니다. 들어줄 때는 Not at all. / Of course not. 으로 답합니다.' },
      { term: '첨부 파일(attachment)', def: '이메일에 붙여 보내는 파일입니다. 예: Please find attached the report. / I\'ve attached the file.' },
      { term: '참조(cc)', def: '이메일을 주로 받는 사람 말고 내용을 알아야 하는 사람에게 함께 보내는 것입니다. 예: I\'ll cc my manager.' },
      { term: '일정 초대(calendar invite)', def: '회의 날짜·시간·장소를 담아 상대 일정표에 넣어 주는 초대입니다. 예: I\'ll send you a calendar invite.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '처음 소개받은 사람에게 하는 인사로 알맞은 것을 고르세요.',
        choices: ['Nice to see you again.', 'Nice to meet you.', 'See you later.', 'Long time no see.'],
        answer: 1,
        why: ['again — "다시"라는 뜻이라 전에 만난 사람에게 하는 인사입니다.', '', '헤어질 때 하는 인사입니다.', '"오랜만이에요"라는 뜻으로 오래 못 본 사람에게 하는 인사입니다.'],
        explain: '처음 만난 사람에게는 **Nice to meet you.**라고 합니다. Nice to see you. 는 아는 사람을 다시 만났을 때 씁니다.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 0,
        q: '이야기로만 듣던 사람을 처음 만났을 때 I\'ve heard a lot about you. 라고 인사할 수 있습니다.',
        answer: true,
        explain: 'I\'ve heard a lot about you. 는 "말씀 많이 들었어요"라는 뜻으로, 소문이나 동료의 이야기로만 알던 사람을 처음 만날 때 반가움을 담아 하는 인사입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '회의에서 동료의 말에 내 생각을 덧붙이고 싶습니다. 알맞은 말을 고르세요.',
        choices: ['Let\'s wrap up.', 'Let\'s get started.', 'I\'d like to add something.', 'Let\'s move on to the next item.'],
        answer: 2,
        why: ['회의를 마무리하자는 말입니다.', '회의를 시작하자는 말입니다.', '', '다음 안건으로 넘어가자는 말입니다. 덧붙일 말이 있는 상황과 반대입니다.'],
        explain: '덧붙일 말이 있을 때는 **I\'d like to add something.**이라고 합니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'text', concept: 1,
        q: '빈칸에 알맞은 낱말 하나를 써서 "~로 넘어가다"라는 표현을 완성하세요.\n\nWe\'re running out of time, so let\'s move ___ to the next item.',
        answer: ['on', 'along', 'ahead'],
        wrong: [{ a: 'to', why: '뒤에 이미 to가 있습니다. "넘어가다"는 move on to ~입니다.' }],
        explain: '**move on to ~** — ~로 넘어가다. "시간이 얼마 남지 않았으니 다음 안건으로 넘어갑시다." (move along, move ahead도 같은 뜻으로 씁니다.)',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 말을 고르세요.\n\nWould you mind ___ the door? It\'s a little cold in here.',
        choices: ['to close', 'closing', 'close', 'closed'],
        answer: 1,
        why: ['mind 뒤에는 to 부정사가 아니라 -ing 꼴이 옵니다.', '', 'mind 뒤에 동사원형은 오지 않습니다.', 'closed — 과거·과거분사 꼴입니다. 부탁하는 동작은 -ing 꼴로 씁니다.'],
        explain: 'mind 뒤에는 -ing 꼴: **Would you mind closing the door?** (문 좀 닫아 주시겠어요? 여기가 좀 춥네요.)',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 2,
        q: '동료가 이렇게 부탁합니다.\n\nWould you mind sending me the file?\n\n기꺼이 보내 주겠다는 대답으로 알맞은 것을 고르세요.',
        choices: ['Yes, I do. I\'ll send it right now.', 'Yes, I mind.', 'Not at all. I\'ll send it right now.', 'I\'m afraid I can\'t right now.'],
        answer: 2,
        why: ['Would you mind ~? 에 Yes, I do. 라고 하면 "네, 싫습니다"가 되어 뒤 문장과 어긋납니다.', '"네, 싫습니다"라는 뜻입니다. 부탁을 거절하는 말이 됩니다.', '', '"죄송하지만 지금은 어렵습니다"라는 거절입니다. 기꺼이 보내 주겠다는 대답이 아닙니다.'],
        explain: 'Would you mind ~? 는 "~하는 것이 싫으신가요?"라는 물음이라 들어줄 때는 **Not at all.**(전혀 싫지 않아요)로 답합니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 말을 고르세요.\n\nI\'ll be on a business trip ___ next Wednesday, so please call my colleague.',
        choices: ['by', 'until', 'at', 'on'],
        answer: 1,
        why: ['by — "그때까지는 끝내다"라는 마감입니다. 출장은 다음 주 수요일까지 계속 이어집니다.', '', 'at — 시각 앞에 씁니다(at 3 o\'clock).', 'on — 날짜·요일 앞에 쓰지만 "~까지"라는 뜻이 없습니다.'],
        explain: '출장이 다음 주 수요일까지 **계속** 이어지므로 **until**을 씁니다. "다음 주 수요일까지 출장이라 제 동료에게 전화해 주세요."',
      },
      {
        id: 'p8', level: 1, type: 'choice', concept: 3,
        q: '대화를 읽고 물음에 답하세요.\n\nA: Does Thursday at 10 work for you?\nB: I\'m afraid I\'m tied up then. How about 2 p.m.?\nA: That works for me. I\'ll send you a calendar invite.\n\n두 사람은 언제 만날까요?',
        choices: ['목요일 오전 10시', '목요일 오후 2시', '화요일 오후 2시', '아직 정하지 못했다'],
        answer: 1,
        why: ['처음 제안한 시간입니다. B가 그때는 바쁘다고(tied up) 했습니다.', '', '대화에 화요일(Tuesday)은 나오지 않습니다. Thursday는 목요일입니다.', 'A가 That works for me. 라고 받아들이고 일정 초대를 보내겠다고 했습니다.'],
        explain: 'B가 오후 2시를 제안했고 A가 That works for me. 라고 받아들였으므로 **목요일 오후 2시**에 만납니다.',
      },
      {
        id: 'p9', level: 1, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 말을 고르세요.\n\nDear Ms. Han,\nI\'m writing to ___ about the delivery date.',
        choices: ['asking', 'asked', 'ask', 'asks'],
        answer: 2,
        why: ['to 부정사의 to 뒤에는 동사원형이 옵니다.', 'asked — 과거형입니다. to 뒤에는 동사원형이 옵니다.', '', 'asks — 3인칭 단수 현재형입니다. to 뒤에는 동사원형이 옵니다.'],
        explain: 'I\'m writing to + 동사원형으로 이메일의 목적을 밝힙니다: **I\'m writing to ask about the delivery date.** (배송 날짜에 관해 여쭙고자 메일 드립니다.)',
      },
      {
        id: 'p10', level: 2, type: 'order', concept: 4,
        q: '업무 이메일이 바른 차례가 되도록 놓으세요.',
        choices: [
          'Dear Ms. Han,',
          'I\'m writing to confirm our meeting on Tuesday at 3 p.m.',
          'Please find attached the agenda.',
          'I look forward to seeing you then.',
          'Best regards, Minsu Lee',
        ],
        answer: [0, 1, 2, 3, 4],
        hint: '받는 사람 → 목적 → 첨부 → 끝맺음 → 끝인사와 이름',
        explain: '받는 사람(Dear ~) → 목적(I\'m writing to ~) → 첨부(Please find attached ~) → 끝맺음(I look forward to ~) → 끝인사와 이름(Best regards, ~) 차례입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'text', concept: 4,
        q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nThank you for your help. I look forward to ___ from you soon.',
        answer: ['hearing'],
        hint: 'look forward to의 to 뒤에 무슨 꼴이 오는지 떠올려 보세요.',
        wrong: [{ a: 'hear', why: 'look forward to의 to는 전치사라서 뒤에 동사원형이 아니라 -ing 꼴이 옵니다.' }],
        explain: '**look forward to + -ing**: I look forward to hearing from you soon. (곧 소식 주시기를 기다리겠습니다.)',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 2,
        q: '동료가 이렇게 부탁했습니다.\n\nCould you send me the slides by Thursday at noon?\n\n들은 내용을 바르게 다시 확인하는 말을 고르세요.',
        choices: [
          'Sure. Just to confirm, you need them by Tuesday at noon, right?',
          'Sure. Just to confirm, you need them by Thursday at midnight, right?',
          'Sure. Just to confirm, you need them until Thursday at noon, right?',
          'Sure. Just to confirm, you need them by noon on Thursday, right?',
        ],
        answer: 3,
        hint: '요일·시각·전치사를 하나씩 맞춰 보세요.',
        why: [
          'Tuesday — 화요일입니다. 동료는 목요일(Thursday)이라고 했습니다.',
          'midnight — 밤 12시(자정)입니다. noon은 낮 12시입니다.',
          '마감을 말할 때는 until이 아니라 by를 씁니다.',
          '',
        ],
        explain: 'by Thursday at noon과 **by noon on Thursday**는 같은 내용입니다(목요일 낮 12시까지). 요일·시각을 다시 말해 확인하면 실수를 막을 수 있습니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 4,
        q: '이메일을 읽고 물음에 답하세요.\n\nSubject: Training on May 14\n\nHi Seojun,\n\nI\'m writing to let you know that the safety training has moved from Room 301 to Room 502. The time is the same, 2 to 4 p.m. Please find attached the updated schedule. Could you share it with your team by Friday?\n\nThanks,\nHayun\n\n하윤이 서준에게 부탁한 일은 무엇일까요?',
        choices: [
          '금요일까지 바뀐 일정표를 팀에 알리기',
          '금요일까지 교육 장소를 502호로 예약하기',
          '교육 시간을 오후 2시에서 4시로 바꾸기',
          '금요일까지 일정표를 하윤에게 다시 보내기',
        ],
        answer: 0,
        hint: 'Could you ~? 로 시작하는 문장이 부탁입니다.',
        why: [
          '',
          '장소는 이미 바뀌었다고 알리는 것(has moved)이고, 예약을 부탁하지는 않았습니다.',
          'The time is the same — 시간은 그대로(2시~4시)입니다.',
          'share it with your team — 서준의 팀과 나누라는 말이지 하윤에게 보내라는 말이 아닙니다.',
        ],
        explain: '부탁은 Could you share it with your team by Friday? — **금요일까지 (첨부한 바뀐) 일정표를 팀과 나눠 달라**는 것입니다. 장소는 301호에서 502호로 바뀌었고 시간은 그대로입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 3,
        q: '세 사람이 회의할 시간을 정하려 합니다. 모두 괜찮은 때를 고르세요.\n\nMinsu: I\'m free on Tuesday afternoon and Wednesday morning.\nJia: I\'m tied up all day on Tuesday, but Wednesday and Thursday mornings work for me.\nSeojun: Wednesday morning or Thursday afternoon is good for me.',
        choices: ['화요일 오후', '수요일 오전', '목요일 오전', '목요일 오후'],
        answer: 1,
        hint: '세 사람이 말한 때를 표로 정리해 보세요.',
        why: [
          '지아가 화요일은 하루 종일 바쁘다고(tied up all day) 했습니다.',
          '',
          '민수는 목요일을 말하지 않았고, 서준은 목요일 오후만 된다고 했습니다.',
          '민수와 지아가 목요일 오후는 된다고 하지 않았습니다.',
        ],
        explain: '민수(화 오후·수 오전), 지아(수 오전·목 오전), 서준(수 오전·목 오후) — 세 사람 모두에게 있는 때는 **수요일 오전**뿐입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 1,
        q: '회의 중 팀장이 "We should launch the new service next month."라고 했습니다. 준비가 덜 되었다고 생각할 때, 가장 알맞게 의견을 말하는 것을 고르세요.',
        choices: [
          'That\'s a bad idea. We can\'t possibly launch it next month.',
          'I see your point, but I think we need more time to test it.',
          'I agree. Let\'s launch it next month.',
          'Let\'s wrap up. Thank you for your time.',
        ],
        answer: 1,
        why: [
          '반대하는 뜻은 맞지만 상대 의견을 바로 깎아내려 회의에서는 무례하게 들립니다.',
          '',
          '찬성하는 말입니다. 준비가 덜 되었다는 생각과 맞지 않습니다.',
          '회의를 마무리하는 말입니다. 의견을 말하는 것이 아닙니다.',
        ],
        explain: '상대의 말을 먼저 인정하고(I see your point) but 뒤에 까닭을 들어 내 생각을 말하는 것이 공손한 반대입니다.',
      },
      {
        id: 'a4', level: 3, type: 'ox', concept: 2,
        q: '다음 대화에서 B는 창문을 열지 말아 달라고 한 것입니다.\n\nA: Do you mind if I open the window?\nB: Not at all. Go ahead.',
        answer: false,
        explain: 'Do you mind if ~? 는 "~해도 싫지 않으세요?"라는 물음입니다. Not at all.(전혀 싫지 않아요) + Go ahead.(그렇게 하세요)이므로 B는 **창문을 열어도 된다**고 한 것입니다.',
      },
    ],

    deeper: [
      {
        title: '이름은 어떻게 부를까 — Mr., Ms., 그리고 이름',
        body: '영어권 회사에서는 윗사람이나 다른 부서 사람도 이름(first name)으로 부르는 경우가 많습니다. 다만 회사·나라·상대에 따라 다르므로 처음에는 조심하는 편이 안전합니다.\n\n- 처음 연락하는 사람·거래처: Mr. Park, Ms. Han처럼 **Mr./Ms. + 성**\n- 상대가 Please call me Jia. 라고 하면 그때부터 이름으로 부릅니다.\n- Ms. 는 결혼 여부와 상관없이 여성에게 쓰는 말입니다.\n\n우리말의 "팀장님", "과장님"처럼 직함만 불러 Hello, Manager! 라고 하지는 않습니다. 직함 대신 이름이나 Mr./Ms. + 성을 씁니다.',
      },
      {
        title: '업무 이메일 한 장으로 정리하기',
        body: '좋은 업무 이메일은 **읽는 사람이 3초 안에 무엇을 해야 하는지** 알 수 있게 씁니다.\n\n1. 제목에 핵심을 씁니다: Subject: Please review the budget by Friday\n2. 첫 문장에 목적: I\'m writing to ask you to review the budget.\n3. 부탁은 하나씩, 날짜와 함께: Could you send me your comments by Friday?\n4. 첨부를 알리고: I\'ve attached the latest version.\n5. 끝맺음: Thanks in advance. / Best regards,\n\n앞 단원(전화와 메시지)에서 익힌 "다시 확인하기"는 이메일에도 그대로 쓰입니다. 중요한 숫자·날짜는 Just to confirm, ~ 으로 한 번 더 적어 두면 서로 오해가 없습니다.',
      },
    ],

    faq: [
      {
        q: 'Would you mind ~? 라고 물으면 해 주겠다는 대답을 Yes로 해요, No로 해요?',
        a: 'mind는 "싫어하다, 꺼리다"라는 뜻이라서 Would you mind ~? 는 "~하는 것이 싫으신가요?"라는 물음입니다. 그래서 해 주겠다는 대답은 Not at all. / Of course not. / No problem. 입니다. Yes, I do. 라고 하면 "네, 싫습니다"가 되니 조심합니다. 실제로는 Sure.라고 답하는 사람도 많습니다.',
      },
      {
        q: 'Please find attached the report. 는 문장 순서가 이상해 보여요.',
        a: '원래 Please find the report attached.(첨부된 보고서를 찾아 주세요)인데, 이메일에서 굳은 표현으로 attached를 앞으로 옮겨 씁니다. 격식 있는 말투이고, 요즘은 더 간단하게 I\'ve attached the report. 라고도 많이 씁니다. 둘 다 바른 표현입니다.',
      },
      {
        q: 'by Friday랑 until Friday는 어떻게 달라요?',
        a: 'by는 마감입니다. 금요일이 되기 전 어느 때든 한 번 끝내면 됩니다(Send it by Friday). until은 계속입니다. 금요일까지 그 상태가 이어집니다(I\'m away until Friday). "끝내면 되나, 계속되나"를 물어보면 고를 수 있습니다.',
      },
      {
        q: '회의에서 남의 말을 끊고 끼어들어도 되나요?',
        a: '꼭 필요할 때는 Sorry to interrupt, but ~ (끼어들어 죄송하지만 ~)으로 시작하면 예의 바르게 끼어들 수 있습니다. 말할 차례를 기다릴 수 있다면 상대가 말을 마친 뒤 Can I add something here? 라고 하는 것이 더 부드럽습니다.',
      },
    ],

    mistakes: [
      'I look forward to hear from you. 처럼 to 뒤에 동사원형을 쓰는 실수 — look forward to 뒤에는 -ing 꼴(hearing)이 옵니다.',
      'Would you mind ~? 에 해 주겠다는 뜻으로 Yes, I do. 라고 답하는 실수 — "네, 싫습니다"가 되므로 Not at all. 로 답합니다.',
      '마감을 말하면서 until Friday라고 쓰는 실수 — 마감은 by Friday, 계속 이어지는 것은 until Friday입니다.',
    ],

    gens: [
      {
        id: 'work-situation',
        level: 1,
        title: '상황에 맞는 직장 표현 고르기',
        make: function (R) {
          var it = R.pick(SITUATIONS);
          // 함께 맞을 수 있는 표현(어느 쪽이든 '함께 내지 않을' 목록에 있는 것)은 오답 후보에서 뺀다
          var pool = SITUATIONS.filter(function (s) {
            return s[0] !== it[0] && it[5].indexOf(s[0]) < 0 && s[5].indexOf(it[0]) < 0;
          });
          var opts = R.shuffle([it].concat(R.sample(pool, 3)));
          return {
            type: 'choice', concept: it[1],
            q: '다음 상황에 알맞은 영어 표현을 고르세요.\n\n' + it[2],
            choices: opts.map(function (o) { return o[3]; }),
            answer: opts.indexOf(it),
            why: opts.map(function (o) { return o === it ? '' : o[3] + ' — ' + o[4] + '.'; }),
            explain: '**' + it[3] + '** — ' + it[4] + '.',
          };
        },
      },
      {
        id: 'work-blank',
        level: 2,
        title: '직장 표현의 빈칸 채우기',
        make: function (R) {
          var it = R.pick(BLANKS);
          return {
            type: 'short', check: 'text', concept: it[0],
            q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\n' + it[1],
            answer: it[2].slice(),
            wrong: it[4].map(function (w) { return { a: w.a, why: w.why }; }),
            explain: it[3] + '\n\n바른 문장: ' + it[1].replace(/^\([^)]*\) /, '').replace('___', it[2][0]),
          };
        },
      },
      {
        id: 'by-until',
        level: 2,
        title: '마감의 by, 계속의 until',
        make: function (R) {
          var it = R.pick(BY_UNTIL);
          var isBy = it[1] === 'by';
          return {
            type: 'short', check: 'text', concept: 3,
            q: '빈칸에 by 또는 until 가운데 알맞은 것을 쓰세요.\n\n' + it[0],
            answer: isBy ? ['by'] : ['until', 'till'],
            hint: '"그때까지 한 번 끝내면 되나?"면 by, "그때까지 계속 이어지나?"면 until입니다.',
            wrong: [isBy
              ? { a: 'until', why: '이 문장은 그때까지 끝내야 하는 마감입니다. ' + BY_WHY }
              : { a: 'by', why: '이 문장은 그때까지 계속 이어지는 일입니다. ' + UNTIL_WHY }],
            explain: (isBy ? BY_WHY : UNTIL_WHY) + '\n\n바른 문장: ' + it[0].replace('___', it[1]),
          };
        },
      },
    ],

    vocab: [
      { w: 'colleague', m: '동료', ex: 'Let me introduce my colleague, Hayun Choi.', exm: '제 동료 최하윤 씨를 소개하겠습니다.' },
      { w: 'department', m: '부서', ex: 'Which department do you work in?', exm: '어느 부서에서 일하세요?' },
      { w: 'in charge of', m: '~을 맡고 있는, ~의 책임자인', ex: 'Seojun is in charge of the new website.', exm: '서준 씨가 새 웹사이트를 맡고 있습니다.' },
      { w: 'agenda', m: '(회의의) 안건, 안건 목록', ex: 'The first item on the agenda is the budget.', exm: '첫 번째 안건은 예산입니다.' },
      { w: 'point', m: '(말의) 요점, 의견', ex: 'That\'s a good point.', exm: '좋은 의견이네요.' },
      { w: 'clarify', m: '분명하게 설명하다', ex: 'Could you clarify the second point?', exm: '두 번째 내용을 분명하게 설명해 주시겠어요?' },
      { w: 'presentation', m: '발표', ex: 'I have a presentation at the meeting tomorrow.', exm: '내일 회의에서 발표가 있습니다.' },
      { w: 'report', m: '보고서', ex: 'Could you send me the report by Friday?', exm: '금요일까지 보고서를 보내 주시겠어요?' },
      { w: 'budget', m: '예산', ex: 'We need to check the budget before we decide.', exm: '결정하기 전에 예산을 확인해야 합니다.' },
      { w: 'deadline', m: '마감 (기한)', ex: 'The deadline for the project is next Monday.', exm: '그 프로젝트의 마감은 다음 주 월요일입니다.' },
      { w: 'confirm', m: '(맞는지) 확인하다', ex: 'I\'m writing to confirm your order.', exm: '주문을 확인하려고 메일 드립니다.' },
      { w: 'available', m: '시간이 되는, (사람이) 만날 수 있는', ex: 'Are you available on Wednesday afternoon?', exm: '수요일 오후에 시간 되세요?' },
      { w: 'client', m: '고객, 거래처', ex: 'We have a lunch meeting with a client today.', exm: '오늘 고객과 점심 회의가 있습니다.' },
      { w: 'attach', m: '(파일을) 첨부하다', ex: 'I\'ve attached the latest price list.', exm: '최신 가격표를 첨부했습니다.' },
      { w: 'regards', m: '(편지·이메일 끝의) 안부', ex: 'Best regards, Minsu Lee', exm: '이민수 드림' },
      { w: 'interrupt', m: '(말을) 끊다, 방해하다', ex: 'Sorry to interrupt, but I have a quick question.', exm: '말씀 중에 죄송하지만 짧은 질문이 있습니다.' },
    ],
  });
})();
