/* 공통영어2 · 상황과 목적에 맞게 표현하기
 * 예문·지문은 모두 직접 쓴 글이다(가상의 인물·가상의 가게). 연락처는 더미만 쓴다. */
(function () {
  // 짧은 글 1: 행사 안내문 (직접 쓴 글, 가상의 동아리)
  var NOTICE = 'Dear students and parents,\n\n' +
    'The Green Garden Club is holding a Plant Sale on Saturday, May 16, from 10 a.m. to 1 p.m. in the school garden. ' +
    'All the plants were grown by our club members. The money we raise will be used to buy new benches for the garden. ' +
    'If it rains, the sale will move to the gym. Please let us know by May 12 if you would like to help at the sale. ' +
    'You can email us at hong@example.com.\n\nBest regards,\nThe Green Garden Club';

  // 짧은 글 2: 불만·해결 요청 메일 (직접 쓴 글, 가상의 가게)
  var COMPLAINT = 'Dear Customer Service Team,\n\n' +
    'I am writing about the desk lamp I ordered from your online store on March 3. ' +
    'When the package arrived yesterday, the lamp was broken, and one of its parts was missing. ' +
    'I have attached a photo of the damaged lamp. I would appreciate it if you could send me a new one by next week. ' +
    'If that is not possible, I would like a full refund.\n\nThank you for your help.\n\nSincerely,\nSeojun Lee';

  // 생성기 1: 상황 → 알맞은 표현 (기능별)
  var CAT = {
    invite: '초대', accept: '초대 수락', decline: '초대 거절', thank: '감사',
    apologize: '사과', congrats: '축하', sympathy: '위로', complain: '불만 제기·해결 요청',
  };
  var CAT_CONCEPT = { invite: 0, accept: 0, decline: 0, thank: 1, apologize: 1, congrats: 2, sympathy: 2, complain: 3 };
  var SITU = [
    ['이번 토요일 내 생일 파티에 친구를 부르고 싶습니다.', 'Would you like to come to my birthday party this Saturday?', 'invite'],
    ['우리 공부 모임에 새로 전학 온 친구를 초대하고 싶습니다.', 'Would you like to join our study group?', 'invite'],
    ['친구가 생일 파티에 오라고 했고, 기꺼이 가려고 합니다.', "Sure, I'd love to. What time should I come?", 'accept'],
    ['친구가 공부 모임에 들어오라고 했고, 좋다고 답하려 합니다.', "I'd be happy to join. Thanks for asking.", 'accept'],
    ['친구가 영화를 보자고 했지만, 그날 동생을 돌봐야 합니다.', "I'd love to, but I have to take care of my little brother.", 'decline'],
    ['이웃이 저녁 식사에 초대했지만, 이미 다른 약속이 있습니다.', "I'm afraid I can't. I already have plans that evening.", 'decline'],
    ['친구가 어려운 숙제를 도와주었습니다.', 'Thank you for helping me with my homework.', 'thank'],
    ['비 오는 날 친구가 우산을 빌려주었습니다.', 'Thank you for lending me your umbrella.', 'thank'],
    ['모둠 회의에 늦게 도착했습니다.', 'I apologize for being late for the meeting.', 'apologize'],
    ['친구의 필통을 실수로 망가뜨렸습니다.', "I'm sorry for breaking your pencil case.", 'apologize'],
    ['친구가 글쓰기 대회에서 1등을 했습니다.', 'Congratulations on winning first prize!', 'congrats'],
    ['사촌 언니가 대학을 졸업했습니다.', 'Congratulations on your graduation!', 'congrats'],
    ['친구가 감기에 심하게 걸려 학교에 오지 못했습니다.', "I'm sorry to hear you're sick. I hope you feel better soon.", 'sympathy'],
    ['친구가 열심히 준비한 시합에서 졌습니다.', "That's too bad. I'm sure you'll do better next time.", 'sympathy'],
    ['온라인으로 산 가방이 찢어진 채로 배달되었습니다.', "I'm afraid the bag I ordered arrived damaged. Could you please exchange it?", 'complain'],
    ['밤늦게 옆집의 음악 소리가 너무 큽니다.', 'Excuse me, but could you please turn down the music a little?', 'complain'],
  ];

  // 생성기 2: 표현 뒤에 오는 동사의 꼴 [앞부분, 동사원형, 정답 꼴, 뒷부분, 종류, 개념, 흔한 철자 실수]
  // 종류: ger = 전치사·mind 뒤 동명사(마지막 칸 = 흔한 철자 실수), inf = would like·would love 뒤 to부정사(마지막 칸 = 틀린 -ing 꼴)
  var FORMS = [
    ['Thank you for', 'help', 'helping', 'me with the science project.', 'ger', 1, ''],
    ['Thank you for', 'invite', 'inviting', 'me to your party.', 'ger', 1, 'inviteing'],
    ['Thank you for', 'lend', 'lending', 'me your notes.', 'ger', 1, ''],
    ['Thank you for', 'come', 'coming', 'to my piano concert.', 'ger', 1, 'comeing'],
    ['Thank you for', 'wait', 'waiting', 'for me.', 'ger', 1, ''],
    ['Thank you for', 'give', 'giving', 'me a second chance.', 'ger', 1, 'giveing'],
    ['I apologize for', 'forget', 'forgetting', 'your birthday.', 'ger', 1, 'forgeting'],
    ['I apologize for', 'be', 'being', 'late for class.', 'ger', 1, ''],
    ['I apologize for', 'make', 'making', 'so much noise last night.', 'ger', 1, 'makeing'],
    ["I'm sorry for", 'lose', 'losing', 'the book you lent me.', 'ger', 1, 'loseing'],
    ["I'm sorry for", 'interrupt', 'interrupting', 'you.', 'ger', 1, ''],
    ['Congratulations on', 'win', 'winning', 'the singing contest!', 'ger', 2, 'wining'],
    ['Congratulations on', 'pass', 'passing', 'the swimming test!', 'ger', 2, ''],
    ['Congratulations on', 'get', 'getting', 'into the school orchestra!', 'ger', 2, 'geting'],
    ['Congratulations on', 'finish', 'finishing', 'your first marathon!', 'ger', 2, ''],
    ['Would you mind', 'close', 'closing', 'the window?', 'ger', 4, 'closeing'],
    ['Would you mind', 'wait', 'waiting', 'a few minutes?', 'ger', 4, ''],
    ['I look forward to', 'see', 'seeing', 'you at the festival.', 'ger', 5, ''],
    ['I look forward to', 'hear', 'hearing', 'from you soon.', 'ger', 5, ''],
    ['Would you like', 'join', 'to join', 'us for lunch?', 'inf', 0, 'joining'],
    ['Would you like', 'come', 'to come', 'to our class play?', 'inf', 0, 'coming'],
    ['Would you like', 'see', 'to see', 'the new exhibition with me?', 'inf', 0, 'seeing'],
    ["I'd love", 'go', 'to go', ', but I have a dentist appointment.', 'inf', 0, 'going'],
    ["I'd love", 'help', 'to help', ', but I am busy this weekend.', 'inf', 0, 'helping'],
  ];

Tutor.registerUnit({
  id: 'eng-h-c2-11',
  course: 'eng-h-c2',
  title: '상황과 목적에 맞게 표현하기',
  summary: '초대·감사·사과·축하·위로·불만처럼 목적에 맞는 표현을 고르고, 받는 사람에 맞는 격식으로 말하거나 짧은 글로 씁니다.',
  goals: [
    '초대하고, 초대에 수락하거나 정중하게 거절하는 말을 할 수 있다.',
    '감사·사과·축하·위로의 표현을 상황에 맞게 골라 바른 형태로 쓸 수 있다.',
    '불만을 정중하게 말하고 해결을 요청하는 짧은 글을 쓸 수 있다.',
    '격식체와 비격식체를 구별하고, 행사 안내 글을 보내기 전에 점검할 수 있다.',
  ],
  standards: ['[10공영2-02-03]', '[10공영2-02-06]', '[10공영2-02-07]'],

  concepts: [
    {
      title: '초대하고 수락·거절하기',
      body: '누군가를 행사에 초대할 때 가장 널리 쓰는 표현은 **Would you like to + 동사원형 ~?**입니다. Do you want to ~?보다 공손하게 들립니다.\n\n' +
        '- **Would you like to** come to my birthday party on Saturday?\n' +
        '- **Would you like to** join our book club?\n\n' +
        '초대를 받으면 수락하거나 거절합니다.\n\n' +
        '| 수락 | 거절 |\n|---|---|\n' +
        "| **I'd love to.** | **I'd love to, but** I have to visit my grandparents. |\n" +
        "| Sure. That sounds great. | **I'm afraid I can't.** I already have plans. |\n" +
        "| I'd be happy to come. | Thanks for asking, but I'm busy that day. |\n\n" +
        '거절할 때는 **① 고마움이나 아쉬움 → ② 거절 → ③ 이유**의 순서로 말하면 상대가 서운하지 않습니다. Maybe next time.처럼 다음을 기약하는 말을 덧붙이면 더 좋습니다.\n\n' +
        "> ⚠️ I'd love to는 I would love to를 줄인 말이고, 뒤에 앞 문장의 동사(come 등)가 생략되어 있습니다. 수락할 때 Yes, I would like.처럼 끝내지 않습니다. like 뒤에는 목적어가 필요하므로 Yes, I'd like to.라고 말합니다.",
      easy: '초대를 거절하는 말은 선물 포장과 비슷합니다. "안 가."라는 알맹이만 건네면 상대가 서운하지만, 고마움(Thanks for asking)으로 감싸고 이유(I have a piano lesson)를 리본처럼 달아 주면 기분 좋게 받아들입니다.\n\n' +
        "거절 표현 I'd love to, but ~ 의 뜻은 \"정말 가고 싶은데, ~\"입니다. but 앞은 마음, but 뒤는 사정입니다. but 없이 I'd love to.로 끝나면 수락, but이 이어지면 거절이라고 기억하면 됩니다.",
      check: {
        type: 'choice',
        q: '초대를 **정중하게 거절하는** 말은 무엇입니까?',
        choices: ["I'd love to, but I have a swimming lesson.", "I'd love to. What time should I come?", 'Sure. That sounds great.'],
        answer: 0,
        why: ['', '기꺼이 가겠다는 수락의 말입니다. but 뒤에 사정을 붙여야 거절이 됩니다.', '"좋아, 그거 좋겠다."라는 수락의 말입니다.'],
        explain: "**I'd love to, but** + 이유는 \"가고 싶지만 ~해서 못 간다\"는 정중한 거절입니다. 나머지 둘은 초대를 받아들이는 말입니다.",
      },
    },
    {
      title: '감사와 사과 표현하기',
      body: '**감사**할 때는 **Thank you for + 명사 / 동명사(-ing)**로 무엇이 고마운지 밝힙니다.\n\n' +
        '- **Thank you for** your help. / **Thank you for helping** me.\n' +
        '- **Thanks for** the ride. (가까운 사이)\n\n' +
        '**사과**할 때 쓰는 표현은 다음과 같습니다. 잘못을 인정하는 말에 바로잡겠다는 말을 덧붙이면 진심이 전해집니다.\n\n' +
        "- **I'm sorry for(about)** ~ : I'm sorry for being late. It won't happen again.\n" +
        '- **I apologize for** ~ (더 격식 있는 말): I apologize for the late reply. I will answer faster next time.\n\n' +
        '| 상대의 말 | 대답 |\n|---|---|\n' +
        "| Thank you for ~ | You're welcome. / No problem. / My pleasure. |\n" +
        "| I'm sorry for ~ | That's okay. / Don't worry about it. |\n\n" +
        '> ⚠️ for는 전치사이므로 뒤에 동사를 쓰려면 **동명사**로 바꿉니다. Thank you for help me (×) → Thank you for **helping** me (○)',
      easy: '감사와 사과는 "무엇에 대해"를 꼭 붙이는 말입니다. 그 "무엇"을 담는 그릇이 for입니다.\n\n' +
        '그릇(for)에는 명사만 담을 수 있어서, 동사 help를 담으려면 helping처럼 -ing를 붙여 명사 모양으로 바꿉니다. Thank you for [your help] / Thank you for [helping me] — 그릇 안의 모양만 다를 뿐 뜻은 같습니다.',
      check: {
        type: 'ox',
        q: '다음 문장은 어법상 바릅니다.\n\nThank you for invite me to your party.',
        answer: false,
        explain: 'for는 전치사라서 뒤에 동사원형 invite를 쓸 수 없습니다. 동명사로 바꾸어 Thank you for **inviting** me to your party.라고 씁니다.',
      },
    },
    {
      title: '축하와 위로 표현하기',
      body: '좋은 일에는 **축하**, 나쁜 일에는 **위로**를 합니다. 먼저 상대의 소식이 어떤 일인지 판단해야 합니다.\n\n' +
        '**축하: Congratulations on + 명사 / 동명사(-ing)**\n' +
        '- **Congratulations on** your graduation!\n' +
        '- **Congratulations on winning** the contest!\n\n' +
        "**위로: I'm sorry to hear (that) ~**\n" +
        "- A: I didn't make the soccer team. B: **I'm sorry to hear that.** You'll have another chance.\n" +
        "- **I'm sorry to hear that** you are sick. I hope you feel better soon.\n\n" +
        "위로할 때 자주 덧붙이는 말: That's too bad. / Cheer up! / I hope you get well soon. / Let me know if I can help.\n\n" +
        '> ⚠️ 축하할 때는 Congratulation이 아니라 **Congratulations**처럼 끝에 s를 붙입니다. 뒤에 축하할 일을 쓸 때는 전치사 **on**을 씁니다.\n\n' +
        "> 💡 I'm sorry는 사과(I'm sorry for being late.)에도, 위로(I'm sorry to hear that.)에도 씁니다. 내 잘못이면 사과, 상대에게 생긴 나쁜 일이면 위로입니다.",
      easy: '친구가 소식을 전하면 머릿속에 신호등을 켜 보십시오.\n\n' +
        '- 초록불(좋은 소식: 합격, 우승, 졸업) → Congratulations on ~!\n' +
        "- 빨간불(나쁜 소식: 아픔, 실패, 잃어버림) → I'm sorry to hear that.\n\n" +
        '빨간불에 "축하해!"라고 하거나 초록불에 "안됐다."라고 하면 큰 실례가 되니, 말하기 전에 신호부터 확인합니다.',
      check: {
        type: 'choice',
        q: "\"I didn't get into the school band.\"라는 친구의 말에 알맞은 대답은 무엇입니까?",
        choices: ["I'm sorry to hear that. You can try again next year.", 'Congratulations on joining the band!', 'I apologize for the band.'],
        answer: 0,
        why: ['', '친구는 밴드에 들어가지 못했다는 나쁜 소식을 전했습니다. 축하가 아니라 위로해야 합니다.', "I apologize for ~ 표현은 내 잘못을 사과하는 말입니다. 상대에게 생긴 나쁜 일에는 I'm sorry to hear that.으로 위로합니다."],
        explain: "나쁜 소식에는 **I'm sorry to hear that.**(그 말을 들으니 안타깝다)으로 위로하고, You can try again next year.처럼 힘이 되는 말을 덧붙입니다.",
      },
    },
    {
      title: '정중하게 불만 말하고 해결 요청하기',
      body: '물건이 망가져 왔거나 서비스에 문제가 있을 때, 화를 내기보다 **사실 → 문제 → 원하는 해결** 순서로 정중하게 말해야 문제가 빨리 풀립니다.\n\n' +
        '| 단계 | 표현 |\n|---|---|\n' +
        "| 말 꺼내기 | **I'm afraid** there is a problem with ~. / **I'm writing about** ~. |\n" +
        '| 문제 설명 | The lamp I ordered arrived broken. / One of the parts is missing. |\n' +
        '| 해결 요청 | **Could you please** exchange it? / **I would appreciate it if you could** send a new one. / I would like a refund. |\n' +
        '| 마무리 | Thank you for your help. / I look forward to your reply. |\n\n' +
        "I'm afraid ~ 표현은 \"유감이지만\"이라는 뜻으로, 듣기 싫은 말을 부드럽게 꺼낼 때 씁니다.\n\n" +
        '> ⚠️ This is the worst lamp ever! Send me a new one now!처럼 감정을 쏟아 내거나 명령하면 상대가 방어적으로 됩니다. 문제는 구체적으로(언제, 무엇이, 어떻게), 요청은 공손하게(Could you please ~?) 말합니다.\n\n' +
        '> 💡 I would appreciate it if you could ~ 에서 it을 빠뜨리지 않습니다. "~해 주시면 감사하겠습니다"라는 매우 공손한 요청입니다.',
      easy: '불만 메일은 의사에게 증상을 말하는 것과 비슷합니다. "아파요! 빨리 고쳐 주세요!"보다 "어제부터(언제) 오른쪽 무릎이(어디) 걸을 때 아픕니다(어떻게)."라고 해야 의사가 잘 도와줄 수 있지요.\n\n' +
        '물건도 마찬가지입니다. 언제 샀는지, 무엇이 어떻게 문제인지, 무엇을 원하는지(교환, 환불, 수리)를 차례로 말하고, 마지막에 Thank you로 마무리합니다.',
      check: {
        type: 'choice',
        q: '주문한 셔츠가 다른 크기로 왔습니다. 가게에 보낼 말로 가장 알맞은 것은 무엇입니까?',
        choices: ["I'm afraid you sent the wrong size. Could you please exchange it?", 'You sent the wrong size again! Fix it now!', 'Thank you for sending me the shirt.'],
        answer: 0,
        why: ['', '감정적이고 명령하는 말투입니다. 문제를 차분히 말하고 Could you please ~?로 요청합니다.', '감사 인사만 있고 문제와 원하는 해결이 빠져 있습니다.'],
        explain: "I'm afraid ~로 문제를 부드럽게 꺼내고(크기가 잘못 옴), **Could you please** exchange it?으로 원하는 해결(교환)을 공손하게 요청했습니다.",
      },
    },
    {
      title: '격식체와 비격식체 골라 쓰기',
      body: '같은 내용도 **누구에게, 어떤 상황에서** 말하느냐에 따라 표현을 바꿉니다. 선생님·처음 보는 어른·가게·기관에는 **격식체**, 친한 친구·가족에게는 **비격식체**를 씁니다.\n\n' +
        '| 쓰임 | 비격식체 (친구) | 격식체 (선생님·가게) |\n|---|---|---|\n' +
        '| 첫 인사 | Hi Jia, / Hey! | Dear Ms. Han, |\n' +
        '| 부탁 | Can you send me the file? | **Could you** send me the file? / **Would you mind sending** me the file? |\n' +
        '| 바람 | I want to ~ | **I would like to** ~ |\n' +
        '| 감사 | Thanks a lot! | Thank you very much. / I really appreciate your help. |\n' +
        '| 끝인사 | See you! / Bye! | **Best regards,** / **Sincerely,** |\n\n' +
        '격식체 글의 특징은 다음과 같습니다.\n' +
        "- 축약형(I'm, don't)보다 완전한 형태(I am, do not)를 더 자주 씁니다.\n" +
        '- gonna, wanna, thx 같은 구어 줄임말이나 이모티콘을 쓰지 않습니다.\n' +
        '- Could, Would, I would like to처럼 조동사의 과거형으로 말을 부드럽게 합니다.\n\n' +
        '> ⚠️ 한 글 안에서 격식을 섞지 않습니다. Dear Ms. Han,으로 시작해 See ya!로 끝나면 어색합니다.\n\n' +
        '> 💡 공손한 부탁 Would you mind ~ing?(~해 주시겠어요?)에 들어주겠다고 답할 때는 No, not at all.(전혀 괜찮아요)처럼 **No**로 답합니다. mind가 "꺼리다"라는 뜻이기 때문입니다.',
      easy: '옷을 고르는 것과 같습니다. 친구 생일 파티에는 편한 옷, 졸업식이나 면접에는 정장을 입듯, 말에도 편한 옷(비격식체)과 정장(격식체)이 있습니다.\n\n' +
        '상대가 윗사람이거나 잘 모르는 사람, 또는 공식적인 일(신청, 문의, 불만)이면 정장을 입힙니다. Can → Could, want → would like, Thanks → Thank you very much처럼 한 단계씩 바꾸면 됩니다.',
      check: {
        type: 'ox',
        q: '교장 선생님께 보내는 이메일을 다음 끝인사로 마무리하는 것이 알맞습니다.\n\nSee ya!',
        answer: false,
        explain: 'See ya!는 친한 친구에게 쓰는 비격식 끝인사입니다. 교장 선생님께 보내는 격식 있는 이메일은 **Best regards,** 또는 **Sincerely,**로 마무리합니다.',
      },
    },
    {
      title: '행사 알리는 글 쓰고 보내기 전에 점검하기',
      body: '다가올 행사나 계획을 알리는 글(안내문, 초대 메일, 공지)은 읽는 사람이 **한 번 읽고 바로 행동할 수 있게** 써야 합니다. 다음 정보가 빠지지 않았는지 봅니다.\n\n' +
        '| 정보 | 예 |\n|---|---|\n' +
        '| 무엇을 (행사 이름·목적) | Our club is holding a **Plant Sale** to raise money for new benches. |\n' +
        '| 언제 | **on** Saturday, May 16, **from** 10 a.m. **to** 1 p.m. |\n' +
        '| 어디서 | **in** the school garden |\n' +
        '| 누가·준비물 | All students and parents are welcome. Please bring your own bag. |\n' +
        '| 회신 | Please let us know **by** May 12 if you can come. |\n\n' +
        '끝맺음에는 I look forward to seeing you there.(그곳에서 뵙기를 기대합니다)를 자주 씁니다. 여기서 to는 전치사라서 뒤에 동명사가 옵니다.\n\n' +
        '**보내기 전 점검표**\n' +
        '1. 목적에 맞는 표현인가? (초대 Would you like to ~? / 감사 Thank you for ~ / 축하 Congratulations on ~)\n' +
        '2. 받는 사람에 맞게 격식을 골랐고, 끝까지 같은가?\n' +
        '3. 날짜·요일·시각이 서로 맞는가? 전치사(날짜·요일 앞 on, 시각 앞 at, 달 앞 in)를 바르게 썼는가?\n' +
        '4. 철자와 문법: Congratulations의 s, for 뒤의 -ing, 대문자, 마침표\n' +
        '5. 연락처와 회신 기한이 정확한가?\n\n' +
        '> 💡 보내기 전에 글을 소리 내어 한 번 읽어 보면 빠진 낱말이나 어색한 문장이 잘 보입니다.',
      easy: '안내문을 받은 사람이 "그래서 언제, 어디로 가면 돼?"라고 다시 물어야 한다면 실패한 안내문입니다.\n\n' +
        '신문 기사의 육하원칙처럼 **무엇·언제·어디서·누가·어떻게 답하나**를 손가락으로 하나씩 짚어 보십시오. 다섯 손가락이 다 채워지면 보낼 준비가 된 것입니다. 마지막으로 날짜와 요일이 맞는지 달력으로 확인합니다.',
      check: {
        type: 'choice',
        q: '다음 안내 글에서 **빠진** 정보는 무엇입니까?\n\nOur class is holding a bake sale in Room 203. All the money will go to the local animal shelter. Please come and buy some cookies!',
        choices: ['날짜와 시간', '장소', '행사의 목적'],
        answer: 0,
        why: ['', '장소는 in Room 203으로 나와 있습니다.', '목적은 All the money will go to the local animal shelter.(동물 보호소 돕기)로 나와 있습니다.'],
        explain: '무엇(bake sale)·어디서(Room 203)·목적(동물 보호소 돕기)은 있지만, **언제** 하는지가 없습니다. 읽는 사람이 찾아갈 수 없으니 날짜와 시간을 꼭 넣어야 합니다.',
      },
    },
  ],

  examples: [
    {
      q: '친구 지아가 이번 토요일 생일 파티에 초대했지만, 그날은 가족 행사가 있습니다. 정중하게 거절하는 짧은 답장을 써 보십시오.',
      steps: [
        '먼저 초대해 준 것에 고마움을 밝힙니다: Thank you for inviting me to your birthday party.',
        "가고 싶은 마음을 보이며 거절합니다: I'd love to go, but …",
        '거절하는 이유를 짧게 덧붙입니다: … I have a family event that day.',
        '상대를 배려하는 말로 마무리합니다: I hope you have a great time!',
      ],
      answer: "Thank you for inviting me to your birthday party. I'd love to go, but I have a family event that day. I hope you have a great time!",
    },
    {
      q: '다음 불만 메시지를 가게에 보낼 정중한 글로 고쳐 쓰십시오.\n\nThe T-shirt you sent is the wrong size. Change it now!',
      steps: [
        "감정적인 말 대신 I'm afraid ~로 문제를 부드럽게 꺼냅니다: I'm afraid the T-shirt I received is the wrong size.",
        '무엇이 어떻게 다른지 구체적으로 씁니다: I ordered a medium, but I received a large.',
        '명령문(Change it now!) 대신 공손한 요청으로 바꿉니다: Could you please exchange it for a medium?',
        '감사 인사로 마무리합니다: Thank you for your help.',
      ],
      answer: "I'm afraid the T-shirt I received is the wrong size. I ordered a medium, but I received a large. Could you please exchange it for a medium? Thank you for your help.",
    },
    {
      q: '학급 대표로, 다음 주 금요일 오후 3시 강당에서 열리는 학급 음악회에 부모님들을 초대하는 짧은 안내 글을 쓰십시오. 참석 여부는 수요일까지 알려 달라고 합니다.',
      steps: [
        '받는 사람에 맞게 격식 있는 첫 인사를 씁니다: Dear parents,',
        '무엇·언제·어디서를 한 문장에 담습니다. 요일 앞에는 on, 시각 앞에는 at을 씁니다: Our class is holding a small music concert on Friday at 3 p.m. in the school hall.',
        '초대 표현을 씁니다: We would like to invite you to come and enjoy the show.',
        '회신 방법과 기한을 밝힙니다: Please let us know by Wednesday if you can come.',
        '격식 있는 끝맺음으로 마무리합니다: We look forward to seeing you there. Best regards, Class 2-3',
      ],
      answer: 'Dear parents,\n\nOur class is holding a small music concert on Friday at 3 p.m. in the school hall. We would like to invite you to come and enjoy the show. Please let us know by Wednesday if you can come. We look forward to seeing you there.\n\nBest regards,\nClass 2-3',
    },
  ],

  terms: [
    { term: '격식체', def: '선생님·어른·가게·기관처럼 공식적인 상대에게 쓰는 말투입니다. 예: Could you ~? / I would like to ~ / Sincerely,' },
    { term: '비격식체', def: '친한 친구·가족에게 쓰는 편한 말투입니다. 예: Can you ~? / Thanks a lot! / See you!' },
    { term: '축약형', def: "두 낱말을 줄여 하나로 쓴 꼴입니다. 예: I'm(= I am), don't(= do not). 격식 있는 글에서는 줄이지 않은 꼴을 더 자주 씁니다." },
    { term: '수락과 거절', def: "초대나 제안을 받아들이는 것이 수락(I'd love to.), 받아들이지 않는 것이 거절(I'd love to, but ~ / I'm afraid I can't.)입니다." },
    { term: '위로 표현', def: "상대에게 생긴 나쁜 일에 안타까움을 나타내는 말입니다. 예: I'm sorry to hear that. / That's too bad." },
    { term: '해결 요청', def: '불만을 말한 뒤 원하는 해결(교환·환불·수리)을 공손하게 부탁하는 것입니다. 예: I would appreciate it if you could send a new one.' },
    { term: '동명사', def: '동사에 -ing를 붙여 명사처럼 쓰는 꼴입니다. 전치사 for·on·to 뒤에 동사를 쓸 때 씁니다. 예: Thank you for helping me.' },
    { term: '안내문', def: '다가올 행사나 계획을 알리는 글입니다. 무엇·언제·어디서·누가·회신 방법이 들어가야 합니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '대화의 빈칸에 알맞은 것은 무엇입니까?\n\nA: Would you like to go to the concert with me on Saturday?\nB: [[빈칸]] I have to visit my grandparents.',
      choices: ["I'd love to, but I can't.", "Sure, I'd love to.", 'Of course. See you then.', 'Congratulations on the concert!'],
      answer: 0,
      why: ['', '수락하는 말입니다. 뒤에 조부모님을 뵈러 가야 한다는 이유가 오므로 거절이 알맞습니다.', '"그럼, 그때 보자."라는 수락의 말이라 뒤의 사정과 맞지 않습니다.', '축하 표현입니다. 초대에 답하는 말이 아닙니다.'],
      explain: "B는 조부모님을 뵈러 가야 해서 갈 수 없습니다. 그래서 **I'd love to, but I can't.**(가고 싶지만 못 가.)로 거절하고 이유를 덧붙입니다.",
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 1,
      q: '빈칸에 들어갈 한 낱말을 쓰십시오.\n\nThank you [[빈칸]] inviting me to your party.',
      answer: ['for'],
      wrong: [
        { a: 'to', why: '감사할 일을 말할 때는 Thank you for ~ 꼴을 씁니다. to가 아니라 for입니다.' },
        { a: 'about', why: '감사할 일 앞에는 about이 아니라 for를 씁니다.' },
      ],
      explain: '**Thank you for** + 동명사(inviting): "초대해 줘서 고마워."',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: '친구가 다리를 다쳐서 축구 대회에 나가지 못하게 되었다고 합니다. 알맞은 말은 무엇입니까?',
      choices: ["I'm sorry to hear that. I hope you get better soon.", 'Congratulations on your soccer game!', 'Thank you for telling me. Have fun!', 'I apologize for your leg.'],
      answer: 0,
      why: ['', '친구에게 나쁜 일이 생겼으므로 축하가 아니라 위로해야 합니다.', '"재미있게 놀아!"는 다쳐서 못 나가는 친구에게 맞지 않습니다.', 'I apologize for ~ 표현은 내 잘못을 사과할 때 씁니다. 친구가 다친 것은 내 잘못이 아닙니다.'],
      explain: "상대에게 생긴 나쁜 일에는 **I'm sorry to hear that.**으로 위로하고, I hope you get better soon.(빨리 낫기를 바라)을 덧붙입니다.",
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: '다음 문장은 어법상 바릅니다.\n\nCongratulations on winning the speech contest!',
      answer: true,
      explain: '**Congratulations**(끝에 s) + **on** + 동명사(winning)로 바르게 썼습니다. "말하기 대회 우승 축하해!"',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 4,
      q: '담임 선생님께 현장 체험 학습에 대해 묻는 이메일을 씁니다. 첫 인사로 가장 알맞은 것은 무엇입니까?',
      choices: ['Dear Ms. Han,', 'Hey Ms. Han!', "What's up?", 'Yo, teacher!'],
      answer: 0,
      why: ['', 'Hey는 친구 사이에 쓰는 비격식 인사입니다.', "What's up?은 친구끼리 쓰는 가벼운 인사입니다.", '친구끼리 장난스럽게 쓰는 말이라 선생님께는 실례입니다.'],
      explain: '선생님께 보내는 이메일은 격식체로 씁니다. 격식 있는 편지·이메일은 **Dear + 호칭 + 이름,**으로 시작합니다.',
    },
    {
      id: 'p6', level: 1, type: 'short', concept: 1,
      q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 빈칸에 쓰십시오.\n\nI apologize for [[빈칸]] (be) late.',
      answer: ['being'],
      wrong: [
        { a: 'be', why: 'for는 전치사라서 뒤에 동사원형을 쓸 수 없습니다. 동명사 being으로 씁니다.' },
        { a: 'to be', why: '전치사 for 뒤에는 to부정사가 아니라 동명사가 옵니다.' },
        { a: 'been', why: 'been은 과거분사입니다. 전치사 for 뒤에는 동명사 being을 씁니다.' },
      ],
      explain: '전치사 for 뒤에는 동명사가 옵니다. be → **being**: I apologize for being late.(늦어서 죄송합니다.)',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '산 지 이틀 된 헤드폰이 고장 났습니다. 가게에 보내는 메일에서 해결을 요청하는 말로 가장 알맞은 것은 무엇입니까?',
      choices: [
        'I would appreciate it if you could exchange them for a new pair.',
        'Give me a new pair right now.',
        'Your store is the worst in town.',
        'I am very happy with the headphones.',
      ],
      answer: 0,
      why: ['', '명령문이라 무례하게 들립니다. Could you please ~? 처럼 공손하게 요청합니다.', '감정적인 비난이고, 원하는 해결이 빠져 있습니다.', '만족한다는 말이라 고장 난 상황과 맞지 않습니다.'],
      explain: '**I would appreciate it if you could ~**(~해 주시면 감사하겠습니다)는 매우 공손한 요청입니다. 원하는 해결(새것으로 교환)도 분명히 밝혔습니다.',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 5,
      q: '다음 안내 문장은 고칠 곳이 없습니다.\n\nThe concert will start on 7 p.m. in the school hall.',
      answer: false,
      explain: '시각 앞에는 on이 아니라 **at**을 씁니다. The concert will start **at** 7 p.m. in the school hall. (요일·날짜 앞은 on, 시각 앞은 at)',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 0,
      q: '"금요일에 우리 집에 저녁 먹으러 올래?"라는 뜻이 되도록 순서대로 놓으십시오.',
      choices: ['Would you like', 'to come', 'to my house', 'for dinner on Friday?'],
      answer: [0, 1, 2, 3],
      hint: 'Would you like 뒤에는 to + 동사원형이 옵니다.',
      explain: 'Would you like **to come** to my house for dinner on Friday? — Would you like to + 동사원형으로 초대하고, 장소(to my house)와 목적·때(for dinner on Friday)를 뒤에 둡니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '다음 문장을 처음 연락하는 박물관 직원에게 보낼 **격식 있는** 말로 바꾼 것은 무엇입니까?\n\nCan you send me the schedule?',
      choices: [
        'Could you please send me the schedule?',
        'Send me the schedule.',
        'Gimme the schedule, okay?',
        'You must send me the schedule.',
      ],
      answer: 0,
      hint: 'Can을 더 공손한 조동사로 바꾸고 please를 넣어 보십시오.',
      why: ['', '명령문이라 처음 연락하는 사람에게 무례하게 들립니다.', 'Gimme는 give me를 줄인 구어라서 격식 있는 글에 쓰지 않습니다.', 'must는 "반드시 ~해야 한다"는 강한 말이라 부탁에 어울리지 않습니다.'],
      explain: 'Can → **Could**, 여기에 please를 더하면 공손한 부탁이 됩니다. Would you mind sending me the schedule?도 격식 있는 부탁입니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '다음 글의 목적으로 가장 알맞은 것은 무엇입니까?\n\n' + COMPLAINT,
      choices: [
        '부서진 상품 대신 새것을 보내 달라고 요청하려고',
        '환불을 받은 것에 감사하려고',
        '주문을 취소하려고',
        '배송이 늦은 것에 항의하려고',
      ],
      answer: 0,
      hint: 'I would appreciate it if you could ~ 뒤에 무엇을 원하는지 나옵니다.',
      why: [
        '',
        '환불은 아직 받지 않았습니다. 새것을 보내 줄 수 없으면 환불을 원한다고 했습니다.',
        '주문을 취소하겠다는 말은 없습니다. 새것을 보내 달라고 했습니다.',
        '배송이 늦었다는 말은 없습니다. 문제는 램프가 부서지고 부품이 빠진 것입니다.',
      ],
      explain: '글쓴이는 도착한 램프가 부서지고 부품이 빠져 있었다는 문제를 밝힌 뒤 **I would appreciate it if you could send me a new one**(새것을 보내 주시면 감사하겠습니다)이라고 요청합니다. 환불은 그것이 안 될 때의 두 번째 요청입니다.',
    },
    {
      id: 'p12', level: 2, type: 'short', concept: 2,
      q: '빈칸에 들어갈 한 낱말을 쓰십시오.\n\nCongratulations [[빈칸]] your graduation! I am so proud of you.',
      answer: ['on'],
      hint: '축하할 일 앞에 쓰는 전치사입니다.',
      wrong: [
        { a: 'for', why: '감사 표현(Thank you for ~)과 헷갈렸습니다. 축하할 일 앞에는 on을 씁니다: Congratulations on ~' },
        { a: 'to', why: 'Congratulations to 뒤에는 축하받는 사람이 옵니다(Congratulations to Jia!). 축하할 일 앞에는 on을 씁니다.' },
      ],
      explain: '**Congratulations on** + 축하할 일: "졸업 축하해! 네가 정말 자랑스러워."',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 5,
      q: '다음 안내문의 내용과 일치하지 **않는** 것은 무엇입니까?\n\n' + NOTICE,
      choices: [
        'The sale will be held in the school garden unless it rains.',
        'The money from the sale will be used to buy new benches.',
        'The club members grew all the plants for the sale.',
        'Students who want to help should reply by May 16.',
      ],
      answer: 3,
      hint: '날짜가 두 번 나옵니다. 각각 무엇의 날짜인지 구별해 보십시오.',
      why: [
        '비가 오면 체육관으로 옮긴다고 했으니, 비가 오지 않으면 학교 정원에서 열립니다. 글과 일치합니다.',
        'The money we raise will be used to buy new benches라고 했으니 글과 일치합니다.',
        'All the plants were grown by our club members라고 했으니 글과 일치합니다.',
        '',
      ],
      explain: 'May 16은 판매 행사 날짜이고, 도우미 신청 회신 기한은 **May 12**입니다(Please let us know by May 12 ~). 날짜를 둘 이상 쓰는 안내문은 각각 무엇의 날짜인지 분명히 써야 하고, 읽는 사람도 구별해 읽어야 합니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: '담임 선생님께 보낼 이메일입니다. 보내기 전에 **고쳐야 할** 문장은 무엇입니까?\n\n' +
        'Dear Mr. Lee,\nI am writing to ask about the field trip next week. Could you tell me what time we should arrive at school? Thx a lot, see ya!',
      choices: [
        'Dear Mr. Lee,',
        'I am writing to ask about the field trip next week.',
        'Could you tell me what time we should arrive at school?',
        'Thx a lot, see ya!',
      ],
      answer: 3,
      hint: '글 전체의 격식이 처음부터 끝까지 같은지 보십시오.',
      why: [
        '선생님께 보내는 격식 있는 첫 인사로 알맞습니다.',
        'I am writing to ask about ~ 표현은 격식 있는 이메일에서 목적을 밝히는 알맞은 말입니다.',
        'Could you ~? 꼴의 공손한 질문이라 알맞습니다.',
        '',
      ],
      explain: 'Thx, see ya는 친구 사이의 비격식 줄임말입니다. Dear로 시작한 격식 있는 글이므로 **Thank you very much. Best regards,** 처럼 격식을 맞춰 끝맺습니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 0,
      q: "대화의 빈칸에 알맞은 것은 무엇입니까?\n\nA: Would you like to come to our school festival on Friday?\nB: I'd love to, but I have a piano lesson that day.\nA: [[빈칸]]",
      choices: ["That's okay. Maybe next time.", 'Great! See you there on Friday.', 'Congratulations on your piano lesson!', 'I apologize for inviting you.'],
      answer: 0,
      hint: "B가 초대를 받아들였는지 먼저 판단하십시오. I'd love to 뒤에 but이 있습니다.",
      why: [
        '',
        "B는 I'd love to, but ~으로 거절했습니다. 금요일에 보자는 말은 흐름에 맞지 않습니다.",
        '피아노 수업은 축하할 일이 아닙니다.',
        '초대한 것은 사과할 일이 아닙니다. 거절을 받으면 괜찮다고 말해 줍니다.',
      ],
      explain: "B는 I'd love to, **but** ~으로 정중히 거절했습니다. 거절을 받은 A는 **That's okay. Maybe next time.**(괜찮아. 다음에 같이 가자.)처럼 상대가 미안해하지 않게 답합니다.",
    },
    {
      id: 'a4', level: 3, type: 'order', concept: 3,
      q: '가게에 보내는 정중한 불만 메일이 되도록 문장을 순서대로 놓으십시오.',
      choices: [
        'I am writing about the headphones I bought on May 2.',
        'Unfortunately, the left side does not work at all.',
        'I would appreciate it if you could exchange them for a new pair.',
        'Thank you for your help.',
      ],
      answer: [0, 1, 2, 3],
      hint: '사실 → 문제 → 원하는 해결 → 마무리 순서입니다.',
      explain: '무엇에 관한 메일인지(언제 산 어떤 물건) → 문제(왼쪽이 안 들림) → 원하는 해결(새것으로 교환) → 감사 인사 순서로 써야 읽는 사람이 바로 이해하고 도울 수 있습니다.',
    },
    {
      id: 'a5', level: 3, type: 'short', concept: 1,
      q: '다음 카드에서 어법상 **틀린** 낱말 하나를 찾아, 바르게 고친 꼴을 쓰십시오.\n\nDear Hayun,\nCongratulations on winning the art contest! Thank you also for help me with my poster last week. I am so happy for you!',
      answer: ['helping'],
      hint: '전치사 바로 뒤에 동사원형이 온 곳이 있는지 찾아보십시오.',
      wrong: [
        { a: 'help', why: '틀린 낱말을 찾았지만 고치지 않고 그대로 썼습니다. for 뒤에는 동명사 helping을 씁니다.' },
        { a: 'helped', why: '전치사 for 뒤에는 과거형이 아니라 동명사(-ing)를 씁니다.' },
        { a: 'Congratulation', why: 'Congratulations는 끝에 s가 있어야 맞고, 카드에는 이미 바르게 쓰여 있습니다.' },
      ],
      explain: 'Thank you also for **help** me에서 for는 전치사이므로 동명사 **helping**으로 고칩니다. Congratulations on winning은 s와 on, 동명사를 모두 바르게 썼습니다.',
    },
    {
      id: 'a6', level: 3, type: 'short', concept: 3,
      q: '다음 문장에서 빠진 한 낱말을 쓰십시오.\n\nI would appreciate if you could send me the new schedule.',
      answer: ['it'],
      hint: '"~해 주시면 감사하겠습니다"라는 공손한 요청 표현의 정해진 꼴을 떠올려 보십시오.',
      wrong: [
        { a: 'that', why: '이 공손한 요청은 I would appreciate it if you could ~ 꼴로 씁니다. that이 아니라 it입니다.' },
        { a: 'you', why: 'appreciate 뒤에는 사람이 아니라 그 일을 가리키는 it을 씁니다: I would appreciate it if you could ~' },
      ],
      explain: 'appreciate는 "~을 고맙게 여기다"라는 뜻이라 목적어가 필요합니다. 뒤의 if절 내용을 가리키는 **it**을 넣어 I would appreciate **it** if you could send me the new schedule.로 씁니다.',
    },
  ],

  deeper: [
    {
      title: '같은 부탁, 다른 공손함 — 공손함의 사다리',
      body: '같은 부탁도 표현에 따라 공손함의 정도가 달라집니다. 아래로 갈수록 더 공손하고 조심스럽게 들립니다.\n\n' +
        '1. Open the window. (명령)\n' +
        '2. Can you open the window?\n' +
        '3. Could you open the window?\n' +
        '4. Would you mind opening the window?\n' +
        '5. I was wondering if you could open the window.\n\n' +
        '영어에서는 **과거형(could, would)**, **질문의 꼴**, **돌려 말하기(I was wondering if ~)**가 상대와의 거리를 만들어 주어 부담을 덜어 줍니다. 상대에게 "거절해도 괜찮다"는 여지를 남기는 것이 공손함입니다.\n\n' +
        '다만 사다리의 맨 위가 언제나 좋은 것은 아닙니다. 친한 친구에게 5번처럼 말하면 오히려 거리감이 느껴집니다. 상대와 상황에 맞는 칸을 고르는 것이 이 단원의 핵심입니다. 다음 과정(영어Ⅰ)에서는 이런 감각을 살려 서신과 신청서를 직접 써 봅니다.',
    },
  ],

  faq: [
    {
      q: 'Would you like to랑 Do you want to는 뭐가 달라요?',
      a: '둘 다 "~할래?"라는 뜻이지만 Would you like to ~?가 더 공손합니다. 친한 친구에게는 Do you want to ~?도 자연스럽지만, 선생님이나 어른, 잘 모르는 사람을 초대할 때는 Would you like to ~?를 씁니다.',
    },
    {
      q: "격식 있는 글에서 I'm, don't 같은 축약형을 쓰면 틀린 거예요?",
      a: '문법적으로 틀린 것은 아닙니다. 다만 공식 편지·신청서·불만 메일처럼 격식을 갖춰야 하는 글에서는 I am, do not처럼 줄이지 않은 꼴이 더 단정하게 보입니다. 친구에게 보내는 메시지에서는 축약형이 자연스럽습니다.',
    },
    {
      q: "I'm sorry는 사과할 때만 써요?",
      a: "아닙니다. 내 잘못을 사과할 때(I'm sorry for being late.)도 쓰고, 상대에게 생긴 나쁜 일을 위로할 때(I'm sorry to hear that.)도 씁니다. 위로할 때의 sorry는 \"안타깝다\"는 뜻이라, 내 잘못을 인정하는 말이 아닙니다.",
    },
    {
      q: 'Congratulations는 왜 꼭 끝에 s가 붙어요?',
      a: '축하 인사로 쓸 때는 관용적으로 항상 복수형 Congratulations를 씁니다. 가까운 사이에서는 줄여서 Congrats!라고도 합니다. 축하할 일을 덧붙일 때는 Congratulations on your success!처럼 on을 씁니다.',
    },
  ],

  mistakes: [
    'for·on 같은 전치사 뒤에 동사원형을 쓰는 실수 — Thank you for help me (×) → Thank you for helping me (○), Congratulations on win (×) → Congratulations on winning (○)',
    '축하 표현에서 s를 빠뜨리거나 전치사를 잘못 쓰는 실수 — Congratulation for your graduation (×) → Congratulations on your graduation (○)',
    '격식 있는 글을 Dear ~로 시작해 놓고 Thx, See ya! 같은 비격식 끝인사로 끝내는 실수 — 한 글 안에서는 격식을 맞춥니다.',
  ],

  gens: [
    {
      id: 'situation-expression',
      level: 1,
      title: '상황에 알맞은 표현 고르기',
      make: function (R) {
        var s = R.pick(SITU);
        var cat = s[2];
        var others = Object.keys(CAT).filter(function (k) { return k !== cat; });
        var picked = R.sample(others, 3);
        var reason = {};
        var wrongs = picked.map(function (k) {
          var pool = SITU.filter(function (x) { return x[2] === k; });
          var w = R.pick(pool)[1];
          reason[w] = '이 말은 ' + CAT[k] + ' 표현입니다. 이 상황에는 ' + CAT[cat] + ' 표현이 알맞습니다.';
          return w;
        });
        var pick = R.choices(s[1], wrongs);
        return {
          type: 'choice', concept: CAT_CONCEPT[cat],
          q: '다음 상황에 가장 알맞은 말은 무엇입니까?\n\n' + s[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === s[1] ? '' : reason[c] || ''; }),
          explain: '이 상황에 알맞은 것은 ' + CAT[cat] + ' 표현입니다. → **' + s[1] + '**',
        };
      },
    },
    {
      id: 'form-after-expression',
      level: 2,
      title: '표현 뒤에 오는 동사의 꼴 (동명사·to부정사)',
      make: function (R) {
        var f = R.pick(FORMS);
        var head = f[0], verb = f[1], ans = f[2], tail = f[3], kind = f[4], extra = f[6];
        var gap = tail.charAt(0) === ',' ? '' : ' ';
        var last = head.split(' ').pop();
        var wrong = [];
        var rule;
        if (kind === 'ger') {
          rule = last === 'mind'
            ? 'Would you mind 뒤에는 동명사(-ing)를 씁니다. mind는 목적어로 동명사를 쓰는 동사입니다.'
            : head === 'I look forward to'
              ? 'look forward to의 to는 to부정사가 아니라 전치사라서, 뒤에 동명사(-ing)를 씁니다.'
              : '전치사 ' + last + ' 뒤에 동사를 쓸 때는 동명사(-ing)로 바꿉니다.';
          wrong.push({ a: verb, why: rule });
          wrong.push({ a: 'to ' + verb, why: rule });
          if (extra) wrong.push({ a: extra, why: '철자를 다시 확인해 보십시오. 바른 철자는 ' + ans + ' 입니다.' });
        } else {
          rule = head + ' 뒤에는 to + 동사원형이 옵니다.';
          wrong.push({ a: verb, why: 'to를 빠뜨렸습니다. ' + rule });
          wrong.push({ a: extra, why: '동명사가 아니라 to부정사를 씁니다. ' + rule });
        }
        return {
          type: 'short', concept: f[5],
          q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 빈칸에 쓰십시오. 필요하면 to를 함께 씁니다.\n\n' + head + ' [[빈칸]] (' + verb + ')' + gap + tail,
          answer: [ans],
          wrong: wrong,
          explain: rule + ' → **' + ans + '**\n\n' + head + ' ' + ans + gap + tail,
        };
      },
    },
  ],

  vocab: [
    { w: 'invitation', m: '초대, 초대장', ex: 'Thank you for the invitation to your party.', exm: '파티에 초대해 줘서 고마워.' },
    { w: 'accept', m: '받아들이다, 수락하다', ex: 'I am happy to accept your invitation.', exm: '초대를 기꺼이 받아들이겠습니다.' },
    { w: 'decline', m: '(정중히) 거절하다', ex: 'She had to decline the offer because she was busy.', exm: '그녀는 바빠서 그 제안을 거절해야 했다.' },
    { w: 'appreciate', m: '고마워하다, 감사하다', ex: 'I really appreciate your kind words.', exm: '친절한 말씀에 정말 감사드립니다.' },
    { w: 'apologize', m: '사과하다', ex: 'I apologize for the late reply.', exm: '답장이 늦어 죄송합니다.' },
    { w: 'congratulations', m: '축하 (인사)', ex: 'Congratulations on your new job!', exm: '새 직장을 얻은 것을 축하해!' },
    { w: 'sympathy', m: '동정, 위로', ex: 'We sent a card to show our sympathy.', exm: '우리는 위로의 마음을 전하려고 카드를 보냈다.' },
    { w: 'complaint', m: '불평, 불만', ex: 'The store answered my complaint within a day.', exm: '가게는 하루 만에 내 불만에 답했다.' },
    { w: 'refund', m: '환불; 환불하다', ex: 'If the shoes do not fit, you can get a refund.', exm: '신발이 맞지 않으면 환불을 받을 수 있다.' },
    { w: 'exchange', m: '교환하다; 교환', ex: 'Could you exchange this shirt for a smaller one?', exm: '이 셔츠를 더 작은 것으로 교환해 주시겠어요?' },
    { w: 'damaged', m: '손상된, 파손된', ex: 'The box was damaged during delivery.', exm: '상자가 배송 중에 파손되었다.' },
    { w: 'formal', m: '격식을 차린, 공식적인', ex: 'Use formal language when you write to the principal.', exm: '교장 선생님께 글을 쓸 때는 격식 있는 말을 써라.' },
    { w: 'informal', m: '격식을 차리지 않은, 편한', ex: 'Text messages to friends are usually informal.', exm: '친구에게 보내는 문자는 보통 격식을 차리지 않는다.' },
    { w: 'polite', m: '공손한, 예의 바른', ex: 'It is polite to say thank you.', exm: '고맙다고 말하는 것은 예의 바른 일이다.' },
    { w: 'upcoming', m: '다가오는, 곧 있을', ex: 'We are preparing for the upcoming festival.', exm: '우리는 다가오는 축제를 준비하고 있다.' },
    { w: 'reply', m: '답장; 답장하다', ex: 'Please reply by Friday.', exm: '금요일까지 답장해 주세요.' },
    { w: 'proofread', m: '(글을) 교정하다, 검토하다', ex: 'Always proofread your email before you send it.', exm: '이메일을 보내기 전에 항상 교정해라.' },
  ],
});
})();
