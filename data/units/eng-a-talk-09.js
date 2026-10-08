/* 생활 영어 표현 · 전화와 메시지
 * 대화·문자는 모두 직접 쓴 글이다(가상의 인물·가상의 회사). 연락처는 더미(010-0000-0000, hong@example.com)만 쓴다.
 * 영어 낱말 바로 뒤에는 받침에 따라 바뀌는 조사를 붙이지 않는다. */
(function () {
  // 상황 → 표현 생성기: [id, 상황(우리말), 표현, 그 표현의 뜻(오답 진단용), 함께 보기로 내지 않을 id(둘 다 맞을 수 있는 것)]
  var SITUATIONS = [
    ['identify', '전화를 건 사람이 먼저 자기 이름을 밝힐 때', 'Hi, this is Seojun Park.', '전화를 건 사람이 자기 이름을 밝히는 말입니다', ['speaking']],
    ['askfor', '전화를 걸어 윤 선생님을 바꿔 달라고 할 때', 'May I speak to Ms. Yoon, please?', '찾는 사람을 바꿔 달라고 하는 말입니다', []],
    ['who', '전화를 받고, 건 사람이 누구인지 공손하게 물을 때', 'May I ask who\'s calling?', '전화를 건 사람이 누구인지 묻는 말입니다', []],
    ['speaking', '상대가 찾는 사람이 바로 자기 자신일 때', 'Speaking.', '"네, 제가 바로 그 사람입니다"라는 대답입니다', ['identify']],
    ['hold', '찾는 사람을 불러올 동안 잠시 기다려 달라고 할 때', 'Hold on a moment, please.', '잠시 기다려 달라는 말입니다', ['transfer']],
    ['transfer', '담당자에게 전화를 연결해 주겠다고 할 때', 'I\'ll put you through to her office.', '다른 사람에게 전화를 연결해 주겠다는 말입니다', ['hold']],
    ['wrong', '모르는 사람을 찾는 전화가 잘못 걸려 왔을 때', 'I think you have the wrong number.', '전화를 잘못 거셨다는 말입니다', []],
    ['notin', '찾는 사람이 지금 자리에 없다고 알릴 때', 'I\'m sorry, he\'s not at his desk right now.', '찾는 사람이 지금 자리에 없다는 말입니다', []],
    ['take', '전화를 받은 사람이 "메시지를 전해 드릴까요?"라고 할 때', 'Can I take a message?', '전화를 받은 쪽이 메시지를 받아 두겠다는 말입니다', []],
    ['leave', '전화를 건 사람이 "메시지를 남겨도 될까요?"라고 할 때', 'Could I leave a message for her?', '전화를 건 쪽이 메시지를 남기겠다는 말입니다', []],
    ['callback', '찾는 사람에게 나한테 다시 전화해 달라고 전해 달라고 할 때', 'Could you ask him to call me back?', '나에게 다시 전화하라고 전해 달라는 부탁입니다', []],
    ['spell', '상대의 이름 철자를 한 글자씩 불러 달라고 할 때', 'Could you spell your last name, please?', '이름의 철자를 불러 달라는 말입니다', []],
    ['readback', '받아 적은 메시지를 다시 읽어 확인하겠다고 할 때', 'Let me read that back to you.', '받아 적은 것을 다시 읽어 확인하겠다는 말입니다', []],
    ['breakup', '상대 목소리가 뚝뚝 끊겨서 들릴 때', 'Sorry, you\'re breaking up.', '상대 목소리가 끊겨 들린다는 말입니다', ['louder', 'again', 'slow']],
    ['louder', '상대 목소리가 너무 작게 들릴 때', 'Could you speak up a little?', '조금 더 크게 말해 달라는 부탁입니다', ['breakup', 'again', 'slow']],
    ['again', '상대의 말을 놓쳐서 한 번 더 말해 달라고 할 때', 'Sorry, I didn\'t catch that. Could you say that again?', '말을 놓쳤으니 다시 말해 달라는 부탁입니다', ['breakup', 'louder', 'slow']],
    ['slow', '상대가 너무 빨리 말해서 알아듣기 어려울 때', 'Could you speak a little more slowly?', '조금 더 천천히 말해 달라는 부탁입니다', ['breakup', 'louder', 'again']],
    ['cutoff', '통화가 갑자기 끊겨서 다시 걸었을 때 처음 하는 말', 'Sorry, I think we got cut off.', '조금 전에 통화가 끊겼다는 말입니다', []],
    ['free', '친구에게 토요일 오후에 시간이 되는지 물을 때', 'Are you free on Saturday afternoon?', '그때 시간이 되는지 묻는 말입니다', []],
    ['works', '상대가 제안한 시간이 나에게도 괜찮다고 할 때', 'That works for me.', '그 시간이 나에게도 괜찮다는 대답입니다', []],
    ['reschedule', '일이 생겨서 약속 날짜를 다시 잡자고 할 때', 'Something came up. Can we reschedule?', '일이 생겨 약속을 다시 잡자는 말입니다', ['later', 'earlier', 'cantmake']],
    ['later', '약속 시간을 한 시간 늦추자고 할 때', 'Could we push it back an hour?', '약속을 한 시간 늦추자는 말입니다', ['reschedule']],
    ['earlier', '약속 시간을 오후 2시로 앞당기자고 할 때', 'Could we move it up to two o\'clock?', '약속을 2시로 앞당기자는 말입니다', ['reschedule']],
    ['cantmake', '금요일 약속에 갈 수 없을 것 같다고 알릴 때', 'I\'m afraid I can\'t make it on Friday.', '그날 약속에 갈 수 없을 것 같다는 말입니다', ['reschedule']],
  ];

  // 문자 메시지 줄임말: [줄임말, 풀어 쓴 말, 뜻]
  var ABBR = [
    ['ASAP', 'as soon as possible', '되도록 빨리'],
    ['FYI', 'for your information', '참고로 알려 드리면'],
    ['BTW', 'by the way', '그런데, 그건 그렇고'],
    ['ETA', 'estimated time of arrival', '도착 예정 시각'],
    ['TTYL', 'talk to you later', '나중에 얘기해'],
    ['IDK', 'I don\'t know', '잘 모르겠어'],
    ['thx', 'thanks', '고마워'],
    ['pls', 'please', '부탁해, ~해 줘'],
    ['msg', 'message', '메시지'],
    ['mtg', 'meeting', '회의'],
    ['tmrw', 'tomorrow', '내일'],
    ['b4', 'before', '~전에'],
  ];

  // 빈칸 한 낱말: [문제 글, [정답들], 해설, 흔한 틀린 답 [{a, why}]]
  var BLANKS = [
    ['(전화를 받은 사람) She\'s in a meeting right now. Can I ___ a message?', ['take'], '전화를 받은 쪽이 메시지를 받아 두겠다고 할 때는 **take a message**입니다.', [{ a: 'leave', why: 'leave a message — 전화를 건 쪽이 메시지를 남길 때 쓰는 말입니다. 이 문장은 전화를 받은 사람이 하는 말입니다.' }]],
    ['(전화를 건 사람) Oh, she\'s out? Could I ___ a message?', ['leave'], '전화를 건 쪽이 메시지를 남길 때는 **leave a message**입니다.', [{ a: 'take', why: 'take a message — 전화를 받은 쪽이 메시지를 받아 둘 때 쓰는 말입니다. 이 문장은 전화를 건 사람이 하는 말입니다.' }]],
    ['Sorry, you\'re breaking ___. I can only hear every other word.', ['up'], '**break up** — 전화에서 상대 목소리가 끊겨 들린다는 뜻입니다.', [{ a: 'down', why: 'break down — 기계가 고장 난다는 뜻입니다. 전화 소리가 끊길 때는 break up입니다.' }]],
    ['Could you speak ___, please? I can\'t hear you very well.', ['up', 'louder', 'loudly', 'clearly'], '목소리를 더 크게 내 달라고 할 때 **speak up**(또는 speak louder)이라고 합니다. loudly, clearly(또렷하게)도 됩니다.', [{ a: 'down', why: '"더 크게"는 up입니다. speak up이라고 씁니다.' }]],
    ['Hold ___, please. I\'ll get her for you.', ['on'], '**Hold on** — 끊지 말고 잠시 기다려 달라는 말입니다.', []],
    ['Just a moment. I\'ll put you ___ to the sales team.', ['through'], '**put ~ through** — 전화를 다른 사람·부서에 연결해 준다는 뜻입니다.', []],
    ['Could you ask her to call me ___ when she\'s free?', ['back'], '**call ~ back** — 다시 전화하다(답 전화를 하다)라는 뜻입니다.', []],
    ['A: May I ask who\'s calling? B: This is Jia Han ___ Greenleaf Travel.', ['from', 'with', 'at', 'of'], '소속을 밝힐 때는 보통 **from**을 씁니다: This is Jia Han from Greenleaf Travel. (with, at, of도 씁니다.)', [{ a: 'in', why: '회사 이름 앞에서 소속을 밝힐 때는 from을 씁니다.' }]],
    ['Hello, may I ___ to Mr. Lee, please?', ['speak', 'talk'], '찾는 사람을 바꿔 달라고 할 때 **May I speak to ~?**라고 합니다(talk to도 씁니다).', [{ a: 'call', why: 'call 뒤에는 to를 쓰지 않습니다. 바꿔 달라고 할 때는 speak to입니다.' }]],
    ['Sorry, I didn\'t ___ that. Could you say it again?', ['catch', 'get', 'hear', 'understand'], '**I didn\'t catch that** — 말을 놓쳤다는 뜻입니다(get, hear, understand도 됩니다).', []],
    ['Hello? Hello? ... Sorry, I think we got cut ___.', ['off'], '**get cut off** — 통화가 갑자기 끊기다라는 뜻입니다.', [{ a: 'out', why: '통화가 끊길 때는 cut off라고 합니다.' }]],
    ['I\'m sorry, I think you have the ___ number. There\'s no Minsu here.', ['wrong'], '전화를 잘못 걸었다는 말은 **You have the wrong number.**입니다.', [{ a: 'different', why: '"잘못 걸린 번호"는 the wrong number라고 합니다.' }]],
    ['A: Who\'s ___, please? B: It\'s Seojun Park.', ['calling', 'speaking', 'this'], '전화를 건 사람이 누구인지 물을 때 **Who\'s calling?**이라고 합니다(Who\'s speaking?, Who\'s this?도 씁니다).', []],
    ['I\'m afraid I can\'t ___ it to your party on Friday. I have to work late.', ['make'], '**make it (to ~)** — (모임·약속에) 가다, 참석하다라는 뜻입니다. can\'t make it = 못 갈 것 같다', [{ a: 'go', why: 'go 뒤에는 it을 쓰지 않습니다(go to your party). "참석하다"는 make it to입니다.' }]],
    ['Sorry, something came ___ at work. Can we meet another day?', ['up'], '**come up** — (예상하지 못한) 일이 생기다라는 뜻입니다.', [{ a: 'out', why: 'come out — 나오다, 출시되다라는 뜻입니다. 일이 생겼을 때는 came up입니다.' }]],
    ['I\'m running late. Could we push the meeting ___ an hour?', ['back'], '**push ~ back** — 약속을 뒤로 미루다(늦추다)라는 뜻입니다.', [{ a: 'up', why: 'up을 쓰면 시간을 앞당기는 쪽이 됩니다. 늦을 때는 뒤로 미루는 push back입니다.' }]],
    ['(문자) Leaving the office now. On my ___!', ['way'], '**On my way.** — "가는 중이야"라는 뜻의 짧은 문자입니다.', []],
    ['She\'s on another ___ right now. Would you like to hold?', ['line', 'call'], '**be on another line** — 다른 전화를 받는 중이다라는 뜻입니다(on another call도 씁니다).', []],
    ['He isn\'t ___ his desk right now. Can I take a message?', ['at'], '자리에 있다·없다는 **at his desk**로 말합니다.', [{ a: 'on', why: '책상 위가 아니라 자리(책상 앞)에 있다는 뜻이므로 at입니다.' }]],
    ['Is this a good ___ to talk? I just have a quick question.', ['time', 'moment'], '**Is this a good time to talk?** — 지금 통화 괜찮은지 묻는 말입니다.', []],
    ['Could you tell him that I ___? My name is Hayun Choi.', ['called', 'phoned', 'rang'], '"전화했었다고 전해 주세요"는 **Could you tell him that I called?**입니다.', [{ a: 'call', why: '이미 전화한 일이므로 과거형 called를 씁니다.' }]],
    ['(문자) Running ___. Be there in 10 minutes.', ['late'], '**Running late.** — "늦어지고 있어"라는 뜻입니다. 문자에서는 주어 I\'m을 자주 뺍니다.', []],
  ];

  // 생성기 문제가 연습하는 개념 카드 번호
  var SITUATION_CONCEPT = {
    identify: 0, askfor: 0, who: 0, speaking: 0, hold: 0, transfer: 0, wrong: 0,
    notin: 1, take: 1, leave: 1, callback: 1, spell: 1, readback: 1,
    breakup: 2, louder: 2, again: 2, slow: 2, cutoff: 2,
    free: 3, works: 3, reschedule: 3, later: 3, earlier: 3, cantmake: 3,
  };
  var BLANK_CONCEPT = [1, 1, 2, 2, 0, 0, 1, 0, 0, 2, 2, 0, 0, 3, 3, 3, 4, 1, 1, 0, 1, 4];

  Tutor.registerUnit({
    id: 'eng-a-talk-09',
    course: 'eng-a-talk',
    title: '전화와 메시지',
    summary: '전화를 걸고 받는 표현, 메시지 남기기, 약속 잡고 바꾸기, 짧은 문자 메시지 쓰기를 익힙니다.',
    goals: [
      '전화를 걸고 받을 때 자기를 밝히고 찾는 사람을 바꿔 달라고 말할 수 있다.',
      '메시지를 남기고 받아 적으며, 이름·번호를 다시 확인할 수 있다.',
      '잘 들리지 않을 때 알맞게 부탁하고, 약속을 잡거나 바꿀 수 있다.',
      '짧은 문자 메시지를 상대에 맞는 말투로 쓰고 흔한 줄임말을 읽을 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '전화 걸고 받기 — This is ~. May I speak to ~?',
        body: '전화에서는 얼굴이 보이지 않으므로 **누가 누구를 찾는지**부터 분명히 합니다.\n\n| 상황 | 표현 |\n|---|---|\n| 건 사람이 자기를 밝힐 때 | Hello, **this is** Minsu Lee. |\n| 소속까지 밝힐 때 | Hi, this is Jia Han **from** Greenleaf Travel. |\n| 바꿔 달라고 할 때 | **May I speak to** Ms. Yoon, please? / Could I speak to Mr. Park? |\n| 친한 사이에서 | Is Seojun there? / Is this Seojun? |\n| 받은 사람이 바로 그 사람일 때 | **Speaking.** (네, 접니다.) |\n| 누구인지 물을 때 | **May I ask who\'s calling?** / Who\'s calling, please? |\n| 기다리게 할 때 | **Hold on**, please. / One moment, please. |\n| 다른 사람에게 연결할 때 | I\'ll **put you through**. |\n| 잘못 걸린 전화 | I think you have the wrong number. |\n\n전화에서 자기를 밝힐 때는 보통 \'This is + 이름\' 꼴을 씁니다. 목소리만 들리는 자리에서 "지금 말하는 이 사람은 ~입니다"라고 소개하는 느낌입니다. 상대가 누구인지 확인할 때도 Are you ~? 대신 **Is this ~?** 꼴이 자연스럽습니다.\n\n> 💡 May I ~?, Could I ~? 꼴은 Can I ~? 보다 공손합니다. 처음 거는 회사·병원·관공서에는 이 꼴로 시작하면 무난합니다.',
        easy: '전화는 "눈을 감고 하는 인사"라고 생각해 보세요. 상대가 나를 볼 수 없으니 먼저 "저 ○○입니다"라고 이름표를 달아 줍니다. 그 이름표가 This is Minsu.입니다.\n\n그다음 찾는 사람을 부탁합니다: May I speak to Jia? (지아 씨 좀 바꿔 주시겠어요?)\n\n받는 쪽에서 내가 바로 그 사람이면 짧게 Speaking. (네, 접니다.) 하면 됩니다.',
        check: {
          type: 'choice',
          q: '전화를 건 사람이 자기 이름을 밝히는 말로 가장 자연스러운 것을 고르세요.',
          choices: ['Hello, this is Minsu Lee.', 'Hello, that is Minsu Lee.', 'Hello, are you Minsu Lee?'],
          answer: 0,
          why: ['', 'that — 떨어져 있는 다른 사람·물건을 가리키는 말이라 자기를 밝힐 때 쓰지 않습니다.', '상대에게 "당신이 이민수 씨입니까?"라고 묻는 말입니다. 자기 이름을 밝히는 말이 아닙니다.'],
          explain: '전화에서 자기를 밝힐 때는 \'This is + 이름\' 꼴을 씁니다: **Hello, this is Minsu Lee.**',
        },
      },
      {
        title: '메시지 남기기와 받아 적기',
        body: '찾는 사람이 없으면 메시지를 주고받습니다. **누가 하는 말인지**가 핵심입니다.\n\n| 전화 받은 사람 | 전화 건 사람 |\n|---|---|\n| She\'s not available right now. (지금 통화가 어렵습니다.) | Could I **leave a message**? (메시지를 남겨도 될까요?) |\n| He\'s in a meeting. / She\'s on another line. | Could you tell her that Minsu called? |\n| Can I **take a message**? (메시지 전해 드릴까요?) | Could you ask him to **call me back**? |\n| Can I have your name and number? | My number is 010-0000-0000. |\n| Could you spell that, please? | It\'s H-A-N. H as in hotel. |\n| Let me **read that back** to you. | Yes, that\'s right. |\n\n- 메시지를 **받아 주는** 쪽은 take, 메시지를 **남기는** 쪽은 leave입니다.\n- 전화번호는 한 자리씩 읽고, 붙임표(-) 자리에서 잠깐 쉽니다. 숫자 0은 oh 또는 zero라고 읽습니다. 예: 내선 305 → three-oh-five\n- 철자를 불러 줄 때는 "H as in hotel"처럼 그 글자로 시작하는 낱말을 붙이면 헷갈리지 않습니다.\n- 받아 적은 뒤에는 Let me read that back. 하고 다시 읽어 확인합니다.\n\n> 💡 메모에는 \'누가 · 누구에게 · 무슨 일로 · 연락처 · 언제까지\' 다섯 가지를 적으면 빠지는 것이 없습니다.',
        easy: '식당에서 손님이 "주문할게요"라고 하면 직원은 "주문 받겠습니다"라고 하지요. 같은 주문인데 하는 쪽과 받는 쪽의 말이 다릅니다.\n\n메시지도 같습니다.\n- 남기는 사람(전화 건 사람): leave a message\n- 받아 두는 사람(전화 받은 사람): take a message\n\n그래서 전화를 받은 내가 "메시지 전해 드릴까요?"라고 할 때는 Can I take a message? 입니다.',
        check: {
          type: 'ox',
          q: '전화를 받은 사람이 "메시지를 전해 드릴까요?"라고 물을 때는 Can I leave a message? 라고 말합니다.',
          answer: false,
          explain: '메시지를 받아 두는 쪽은 take를 씁니다. 전화를 받은 사람은 **Can I take a message?** 라고 하고, Could I leave a message? 는 전화를 건 사람이 하는 말입니다.',
        },
      },
      {
        title: '잘 안 들릴 때 — Sorry, you\'re breaking up.',
        body: '전화가 잘 안 들리면 참고 넘기지 말고 바로 말합니다. 무엇이 문제인지에 따라 표현이 다릅니다.\n\n| 상황 | 표현 |\n|---|---|\n| 소리가 뚝뚝 끊겨 들릴 때 | Sorry, you\'re **breaking up**. / The connection is bad. |\n| 목소리가 작을 때 | Could you **speak up** a little? |\n| 말을 놓쳤을 때 | Sorry, I didn\'t **catch** that. Could you say that again? |\n| 너무 빠를 때 | Could you speak a little more **slowly**? |\n| 통화가 끊겼다가 다시 걸었을 때 | Sorry, I think we got **cut off**. |\n| 내가 다시 걸겠다고 할 때 | Let me **call you back**. |\n\n전화에서 쓰는 break up — \'(소리가) 끊겨 들리다\'라는 뜻입니다. Sorry, you\'re breaking up. 은 "목소리가 끊겨서 들려요"라는 말이지, 상대를 탓하는 말이 아닙니다. 짧게 Sorry? 나 Pardon? 하고 되물어도 됩니다.\n\n> ⚠️ What? 하고 끝을 올리면 뜻은 통하지만 무뚝뚝하게 들릴 수 있습니다. 업무 통화에서는 Sorry, could you say that again? 이 안전합니다.',
        easy: '잘 안 들리는 이유는 대개 넷입니다. 이유마다 부탁하는 말을 하나씩 짝지어 두면 됩니다.\n\n- 소리가 끊긴다 → you\'re breaking up\n- 소리가 작다 → speak up (up = 크게, 위로)\n- 놓쳤다 → say that again\n- 너무 빠르다 → more slowly\n\nspeak up — 볼륨을 "위로" 올려 달라는 그림을 떠올리면 기억하기 쉽습니다.',
        check: {
          type: 'choice',
          q: '상대 목소리가 너무 작게 들립니다. 알맞은 부탁을 고르세요.',
          choices: ['Could you speak a little more slowly?', 'Could you speak up a little?', 'Sorry, I think we got cut off.'],
          answer: 1,
          why: ['천천히 말해 달라는 부탁입니다. 소리가 작은 것과는 다른 문제입니다.', '', '통화가 끊겼다는 말입니다. 지금은 통화가 이어져 있고 소리만 작습니다.'],
          explain: '소리를 크게 내 달라고 할 때는 **speak up**입니다. "조금만 크게 말씀해 주시겠어요?"',
        },
      },
      {
        title: '약속 잡고 바꾸기 — Can we reschedule?',
        body: '약속을 **잡을 때**와 **바꿀 때** 쓰는 말을 나누어 익힙니다.\n\n**잡기**\n- Are you free on Friday? (금요일에 시간 돼요?)\n- How about 3 o\'clock? (3시 어때요?)\n- That works for me. (저는 그 시간 좋아요.)\n- Let\'s meet at the café at 7. / See you then.\n\n**바꾸기**\n\n| 뜻 | 표현 |\n|---|---|\n| 일이 생겼어요 | Something **came up**. |\n| 약속을 다시 잡을 수 있을까요? | Can we **reschedule**? |\n| 늦추다(뒤로 미루다) | Could we **push it back** an hour? |\n| 앞당기다 | Could we **move it up** to 2 o\'clock? |\n| 못 갈 것 같아요 | I\'m afraid I **can\'t make it**. |\n| 취소해야겠어요 | I\'m sorry, but I need to **cancel**. |\n\n약속을 바꾸자고 할 때는 **사과 → 이유 → 새 제안** 순서로 말하면 부드럽습니다.\n\nI\'m sorry, something came up at work. Can we reschedule? Would Thursday be OK?\n\n> 💡 push back(뒤로 밀다) = 늦추기, move up(위로 올리다) = 앞당기기. 일정표에서 약속 칸을 아래로 밀거나 위로 올리는 그림을 떠올리세요.',
        easy: '약속 바꾸기는 세 걸음이면 됩니다.\n\n1. 미안하다고 하기: I\'m sorry.\n2. 까닭 말하기: Something came up. (일이 좀 생겼어요.)\n3. 새로 제안하기: Can we reschedule? / How about next Monday?\n\n시간만 옮길 때는 늦추면 push back, 당기면 move up입니다.',
        check: {
          type: 'choice',
          q: '오후 3시 약속을 4시로 늦추고 싶습니다. 알맞은 말을 고르세요.',
          choices: ['Could we push it back an hour?', 'Could we move it up an hour?', 'That works for me.'],
          answer: 0,
          why: ['', 'move up — 약속을 앞당기는 말입니다. 3시가 2시가 됩니다.', '상대가 제안한 시간이 괜찮다고 답하는 말입니다. 시간을 바꾸자는 말이 아닙니다.'],
          explain: '약속을 뒤로 미룰(늦출) 때는 **push back**입니다. "한 시간 늦출 수 있을까요?"',
        },
      },
      {
        title: '짧은 문자 메시지 쓰기',
        body: '문자 메시지는 짧게 씁니다. 그래서 대화와 다른 점이 몇 가지 있습니다.\n\n- **주어·be동사를 자주 뺍니다**: (I\'m) On my way. / (I\'m) Running late. / (I) Can\'t talk now.\n- **흔한 답장**: Got it. (알겠어요.) / Sounds good. (좋아요.) / Thanks! / See you at 7.\n- **줄임말**을 씁니다.\n\n| 줄임말 | 풀어 쓴 말 | 뜻 |\n|---|---|---|\n| ASAP | as soon as possible | 되도록 빨리 |\n| FYI | for your information | 참고로 |\n| BTW | by the way | 그런데 |\n| ETA | estimated time of arrival | 도착 예정 시각 |\n| TTYL | talk to you later | 나중에 얘기해 |\n| thx / pls | thanks / please | 고마워 / 부탁해 |\n\n**누구에게 보내는지**에 따라 말투를 바꿉니다.\n\n| 친구·가족에게 | 업무 상대에게 |\n|---|---|\n| Running late. Be there in 10! | Hi Mr. Park, this is Jia Han. I\'m running about 10 minutes late. Sorry for the delay. |\n\n> ⚠️ 줄임말과 주어 빼기는 친한 사이의 말투입니다. 거래처·윗사람에게는 이름을 밝히고 완전한 문장으로 씁니다.',
        easy: '문자는 "짧은 쪽지"입니다. 쪽지에 "나는 지금 가는 중이다"라고 다 쓰지 않고 "가는 중!"이라고 쓰듯, 영어 문자도 On my way! 처럼 앞부분을 덜어 냅니다.\n\n줄임말은 첫 글자만 모은 것이 많습니다. as soon as possible → ASAP (되도록 빨리)\n\n다만 회사 일로 보내는 문자는 편지처럼 이름과 완전한 문장을 씁니다.',
        check: {
          type: 'choice',
          q: '문자 메시지의 ASAP 뜻으로 알맞은 것을 고르세요.',
          choices: ['참고로', '도착 예정 시각', '되도록 빨리'],
          answer: 2,
          why: ['"참고로"는 FYI(for your information)입니다.', '"도착 예정 시각"은 ETA(estimated time of arrival)입니다.', ''],
          explain: 'ASAP — **as soon as possible**의 첫 글자를 모은 말로 "되도록 빨리"라는 뜻입니다.',
        },
      },
    ],

    examples: [
      {
        q: '다음 통화를 읽고, 박 팀장에게 남길 메모를 정리해 보세요.\n\nA: Good morning, Greenleaf Travel. This is Hayun speaking.\nB: Hi, this is Minsu Lee from Maple Office Supplies. May I speak to Mr. Park, please?\nA: I\'m sorry, he\'s in a meeting right now. Can I take a message?\nB: Yes, please. Could you ask him to call me back before 5 o\'clock?\nA: Sure. Can I have your number?\nB: It\'s 010-0000-0000.\nA: Let me read that back to you. Minsu Lee, 010-0000-0000, call back before 5. Is that right?\nB: Yes, that\'s right. Thank you.',
        steps: [
          '누가 걸었나: Hi, this is Minsu Lee from Maple Office Supplies. → 메이플 사무용품의 이민수 씨',
          '누구를 찾았나: May I speak to Mr. Park? → 박 팀장. 회의 중이라 A가 메시지를 받았습니다(Can I take a message?).',
          '무슨 부탁인가: Could you ask him to call me back before 5 o\'clock? → 5시 전에 다시 전화해 달라는 부탁',
          '연락처: 010-0000-0000. A가 Let me read that back to you. 하고 다시 읽어 확인했습니다.',
        ],
        answer: '메모 — 박 팀장님께: 메이플 사무용품 이민수 씨 전화. 5시 전에 다시 전화 부탁(010-0000-0000).',
      },
      {
        q: '친구 지아와 저녁 7시에 만나기로 했는데 회사 일 때문에 8시로 늦추고 싶습니다. 문자 메시지를 써 보세요.',
        steps: [
          '사과와 까닭: Sorry, something came up at work.',
          '새 제안(늦추기 = push back): Can we push dinner back to 8?',
          '답을 부탁하는 짧은 말: Let me know! (친구 사이라 짧게 써도 됩니다.)',
        ],
        answer: 'Hi Jia, sorry, something came up at work. Can we push dinner back to 8? Let me know!',
      },
    ],

    terms: [
      { term: 'take a message', def: '전화를 받은 사람이 메시지를 받아 두는 것입니다. 예: Can I take a message? (메시지 전해 드릴까요?)' },
      { term: 'leave a message', def: '전화를 건 사람이 메시지를 남기는 것입니다. 예: Could I leave a message? (메시지를 남겨도 될까요?)' },
      { term: 'call back', def: '다시 전화하다, 답 전화를 하다라는 뜻입니다. 예: Could you ask her to call me back?' },
      { term: 'break up (전화)', def: '전화에서 상대 목소리가 끊겨 들리는 것입니다. 예: Sorry, you\'re breaking up.' },
      { term: 'reschedule', def: '약속·회의 날짜나 시간을 다시 정하는 것입니다. 예: Can we reschedule?' },
      { term: 'push back / move up', def: '약속을 늦추는 것이 push back, 앞당기는 것이 move up입니다. 예: Could we push it back an hour?' },
      { term: '내선(extension)', def: '회사 안에서 쓰는 전화 번호입니다. 예: Please call extension 305.' },
      { term: '음성 사서함(voicemail)', def: '받지 못한 전화의 음성 메시지를 남기고 듣는 기능입니다. 예: I left a voicemail.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: 'A가 전화를 걸어 이렇게 말합니다.\n\nA: Hello, may I speak to Seojun Park, please?\n\n전화를 받은 사람이 바로 박서준입니다. 알맞은 대답을 고르세요.',
        choices: ['Speaking.', 'Hold on, please. I\'ll get him.', 'I\'m sorry, he\'s not in right now.', 'I think you have the wrong number.'],
        answer: 0,
        why: ['', '다른 사람을 불러오겠다는 말입니다. 찾는 사람이 바로 나이므로 부를 필요가 없습니다.', '그 사람이 자리에 없다는 말입니다. 찾는 사람이 바로 나입니다.', '잘못 걸었다는 말입니다. 상대는 제대로 걸었습니다.'],
        explain: '찾는 사람이 바로 자신일 때는 **Speaking.** (네, 접니다.) 이라고 짧게 답합니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 말을 고르세요.\n\nA: May I ask ___?\nB: This is Jia Han from Greenleaf Travel.',
        choices: ['who are you', 'who I am calling', 'what are you calling', 'who\'s calling'],
        answer: 3,
        why: ['May I ask 뒤에 오는 물음은 평서문 어순(who you are)으로 바뀝니다. 또 전화에서 Who are you? 하고 묻는 것은 무례하게 들릴 수 있습니다.', '"제가 누구에게 걸고 있나요?"라는 뜻이 되어 상황과 맞지 않습니다. 전화를 받은 A가 건 사람을 묻고 있습니다.', '사람을 물을 때는 what이 아니라 who를 씁니다.', ''],
        explain: '전화를 건 사람이 누구인지 공손하게 물을 때 **May I ask who\'s calling?** 이라고 합니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'text', concept: 1,
        q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\n(전화를 받은 사람) I\'m sorry, she\'s in a meeting. Can I ___ a message?',
        answer: ['take'],
        wrong: [{ a: 'leave', why: 'leave a message — 전화를 건 사람이 메시지를 남길 때 씁니다. 이 문장은 전화를 받은 사람이 하는 말입니다.' }],
        explain: '전화를 받은 쪽이 메시지를 받아 두겠다고 할 때는 **take a message**입니다. "죄송하지만 회의 중이십니다. 메시지 전해 드릴까요?"',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: '다음 문장은 "그에게 저한테 다시 전화해 달라고 전해 주시겠어요?"라는 뜻입니다.\n\nCould you ask him to call me back?',
        answer: true,
        explain: 'ask him to call me back = 그에게 나에게 다시 전화하라고 부탁하다. 메시지를 남길 때 가장 많이 쓰는 문장입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '통화 중 상대 목소리가 뚝뚝 끊겨서 들립니다. 알맞은 말을 고르세요.',
        choices: ['Sorry, you\'re breaking down.', 'Sorry, you\'re hanging up.', 'Sorry, you\'re breaking up.', 'Sorry, you\'re speaking up.'],
        answer: 2,
        why: ['break down — 기계가 고장 나거나 사람이 무너진다는 뜻입니다. 전화 소리가 끊길 때는 break up입니다.', 'hang up — 전화를 끊는다는 뜻입니다. 상대는 아직 끊지 않았습니다.', '', 'speak up — 크게 말한다는 뜻입니다. 소리가 끊기는 상황과 맞지 않습니다.'],
        explain: '전화에서 소리가 끊겨 들릴 때는 **Sorry, you\'re breaking up.** 이라고 합니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'text', concept: 2,
        q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nSorry, I didn\'t ___ that. Could you say it again?',
        answer: ['catch', 'get', 'hear', 'understand'],
        wrong: [{ a: 'listen', why: 'listen — "귀 기울여 듣다"라는 동작이라 I didn\'t listen that 처럼 쓰지 않습니다(listen to가 되어야 합니다). "놓쳤다"는 catch입니다.' }],
        explain: '**I didn\'t catch that.** — "(말을) 놓쳤어요"라는 뜻입니다. get, hear, understand를 써도 됩니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '오후 2시 회의를 1시로 앞당기고 싶습니다. 알맞은 말을 고르세요.',
        choices: ['Could we push it back to one o\'clock?', 'Could we move it up to one o\'clock?', 'I\'m afraid I can\'t make it.', 'Could we call it off?'],
        answer: 1,
        why: ['push back — 늦추는 말입니다. 앞당길 때는 move up입니다.', '', '갈 수 없다는 말입니다. 시간만 바꾸려는 상황입니다.', 'call off — 취소한다는 뜻입니다.'],
        explain: '약속을 앞당길 때는 **move up**입니다. "1시로 앞당길 수 있을까요?"',
      },
      {
        id: 'p8', level: 1, type: 'choice', concept: 4,
        q: '친구에게 받은 문자입니다. ETA 뜻으로 알맞은 것을 고르세요.\n\nJust left home. ETA 7:15.',
        choices: ['되도록 빨리', '나중에 얘기해', '도착 예정 시각', '그런데'],
        answer: 2,
        why: ['"되도록 빨리"는 ASAP입니다.', '"나중에 얘기해"는 TTYL입니다.', '', '"그런데"는 BTW입니다.'],
        explain: 'ETA — **estimated time of arrival**, 곧 도착 예정 시각입니다. "방금 집에서 나왔어. 7시 15분 도착 예정."',
      },
      {
        id: 'p9', level: 2, type: 'order', concept: 1,
        q: '우리말에 맞게 순서대로 놓으세요.\n\n그녀에게 저한테 다시 전화해 달라고 전해 주시겠어요?',
        choices: ['Could you', 'ask', 'her', 'to call', 'me', 'back?'],
        answer: [0, 1, 2, 3, 4, 5],
        hint: 'Could you ask (누구에게) to call (누구를) back? 꼴입니다.',
        explain: '**Could you ask her to call me back?** — ask + 사람 + to 동사: "(사람)에게 ~하라고 부탁하다". 다시 전화를 걸 사람은 her, 그 전화를 받을 사람은 me입니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 3,
        q: '두 사람이 주고받은 문자를 읽고 물음에 답하세요.\n\nDoyun: Hi Sua, are we still on for lunch at 12 tomorrow?\nSua: Sorry, something came up. Can we push it back an hour?\nDoyun: Sure, that works for me. Same place?\nSua: Yes. See you then!\n\n두 사람은 내일 몇 시에 만날까요?',
        choices: ['오후 1시', '낮 12시', '오전 11시', '만나지 않는다'],
        answer: 0,
        why: ['', '처음 약속 시간입니다. 수아가 한 시간 늦추자고 했습니다.', 'push back — 늦추는 말입니다. 앞당긴 것이 아닙니다.', 'that works for me, See you then — 약속을 지키겠다는 말입니다. 취소하지 않았습니다.'],
        explain: '12시 약속을 push it back an hour(한 시간 늦추자)고 했고 도윤이 That works for me. 라고 받아들였으므로 **오후 1시**에 만납니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'text', concept: 4,
        q: '문자 메시지의 줄임말 BTW를 풀어 쓴 영어 세 낱말을 쓰세요.',
        answer: ['by the way'],
        wrong: [{ a: 'between the way', why: 'BTW — by the way("그런데, 그건 그렇고")의 첫 글자를 모은 말입니다.' }],
        explain: 'BTW = **by the way** — "그런데, 그건 그렇고". 화제를 바꿀 때 씁니다. 예: BTW, did you get my email?',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 1,
        q: '통화를 읽고, 받아 적은 메모로 바른 것을 고르세요.\n\nA: Good afternoon, Sunny Dental Clinic.\nB: Hi, this is Seojun Park. May I speak to Dr. Yoon?\nA: I\'m sorry, she\'s with a patient right now. Can I take a message?\nB: Yes. Could you tell her that I can\'t come on Wednesday? I\'d like to come on Thursday instead.\nA: Sure. I\'ll let her know.',
        choices: ['박서준: 목요일 대신 수요일에 오고 싶음', '윤 선생님: 수요일에 박서준에게 전화 부탁', '박서준: 수요일 대신 목요일에 오고 싶음', '박서준: 수요일·목요일 모두 올 수 없음'],
        answer: 2,
        why: ['instead — "~대신"이라는 뜻입니다. 오지 못하는 날은 수요일(can\'t come on Wednesday)이고 오고 싶은 날이 목요일입니다.', '메시지를 남긴 사람은 박서준이고, 다시 전화해 달라는 부탁은 없었습니다.', '', 'I\'d like to come on Thursday — 목요일에는 오고 싶다고 했습니다.'],
        explain: 'B는 수요일에 갈 수 없고(can\'t come on Wednesday) **대신 목요일에 오고 싶다**(I\'d like to come on Thursday instead)고 했습니다. A는 I\'ll let her know. (전해 드릴게요)로 마쳤습니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 1,
        q: '통화를 읽고, 받아 적은 메모로 바른 것을 고르세요.\n\nA: Greenleaf Travel, this is Hayun speaking.\nB: Hi, this is Minsu Lee. Could I speak to Ms. Choi?\nA: She\'s on another line. Would you like to hold?\nB: No, that\'s OK. Could I leave a message?\nA: Of course.\nB: My flight on Friday has been moved to Saturday. Could she change my hotel booking? She can reach me at extension 305.\nA: Extension 305. I\'ll make sure she gets the message.',
        choices: ['이민수: 비행기가 금요일로 바뀜, 호텔 예약 변경 부탁, 연락은 내선 305', '이민수: 비행기가 토요일로 바뀜, 호텔 예약 취소 부탁, 연락은 내선 305', '이민수: 비행기가 토요일로 바뀜, 호텔 예약 변경 부탁, 연락은 내선 305', '최 씨: 비행기가 토요일로 바뀜, 이민수에게 호텔 예약 부탁, 연락은 내선 503'],
        answer: 2,
        hint: 'has been moved to ~ 는 "~로 옮겨졌다"입니다. 무엇에서 무엇으로 바뀌었는지 보세요.',
        why: ['My flight on Friday has been moved to Saturday — 원래 금요일이던 비행기가 토요일로 옮겨졌습니다.', 'change my hotel booking — 예약을 취소가 아니라 바꿔 달라는 부탁입니다.', '', '메시지를 남긴 사람은 이민수이고, 내선 번호는 three-oh-five, 곧 305입니다.'],
        explain: '이민수 씨는 최 씨가 통화 중이어서(on another line) 메시지를 남겼습니다(leave a message). 내용: 금요일 비행기가 **토요일로 바뀌었으니 호텔 예약을 바꿔 달라**, 연락은 **내선 305**. 메모에서는 날짜·부탁 내용·번호를 하나씩 확인합니다.',
      },
      {
        id: 'a2', level: 3, type: 'order', concept: 0,
        q: '전화 통화가 자연스럽게 이어지도록 순서대로 놓으세요.',
        choices: [
          'A: Good morning, Sunny Dental Clinic.',
          'B: Hi, this is Seojun Park. May I speak to Dr. Yoon?',
          'A: I\'m sorry, she\'s with a patient. Can I take a message?',
          'B: Yes, could you ask her to call me back?',
          'A: Sure. Can I have your number?',
        ],
        answer: [0, 1, 2, 3, 4],
        hint: '전화를 받는 인사 → 자기 밝히기와 바꿔 달라는 부탁 → 없다는 말 → 메시지 → 번호 묻기',
        explain: '받는 쪽 인사(Good morning, ~) → 건 사람이 자기를 밝히고 바꿔 달라고 함(This is ~. May I speak to ~?) → 자리에 없다며 메시지를 받겠다고 함(Can I take a message?) → 다시 전화해 달라는 부탁(call me back) → 번호를 물음(Can I have your number?)',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 2,
        q: '통화 중 소리가 끊기다가 전화가 아예 끊어졌습니다. 다시 전화를 걸어 상대가 받았을 때 처음 할 말로 가장 알맞은 것을 고르세요.',
        choices: ['Sorry, you\'re breaking up.', 'Could you speak up a little?', 'I think you have the wrong number.', 'Sorry, I think we got cut off.'],
        answer: 3,
        why: ['통화 중에 소리가 끊겨 들릴 때 하는 말입니다. 지금은 끊겼던 전화를 다시 건 상황입니다.', '소리가 작을 때 하는 부탁입니다. 다시 건 전화의 첫마디로는 맞지 않습니다.', '상대가 잘못 걸었다는 말입니다. 전화를 건 사람은 나입니다.', ''],
        explain: '끊겼던 전화를 다시 걸면 **Sorry, I think we got cut off.** (아까 통화가 끊긴 것 같아요.) 하고 이어서 이야기합니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 4,
        q: '거래처 박 팀장에게 회의에 10분쯤 늦는다고 문자를 보내려 합니다. 가장 알맞은 것을 고르세요.',
        choices: [
          'Hi Mr. Park, this is Jia Han. I\'m running about 10 minutes late. Sorry for the delay.',
          'Running late. ETA 10 min. thx',
          'Hi Mr. Park. Running late, pls wait. BTW, see u soon!',
          'Hi Mr. Park, this is Jia Han. I\'m running about 10 minutes early. Sorry for the delay.',
        ],
        answer: 0,
        why: [
          '',
          '친구에게 쓰는 말투입니다. 거래처에는 이름을 밝히고 완전한 문장으로 씁니다.',
          '줄임말(pls, BTW, u)이 섞여 업무 상대에게는 가벼워 보입니다.',
          'early — "일찍"이라는 뜻입니다. 늦을 때는 late입니다.',
        ],
        explain: '업무 상대에게는 **인사 + 이름 밝히기 + 완전한 문장 + 사과**로 씁니다. 줄임말과 주어 빼기는 친한 사이의 말투입니다.',
      },
    ],

    deeper: [
      {
        title: '음성 사서함에 메시지 남기기',
        body: '상대가 전화를 받지 않으면 삐 소리 뒤에 메시지를 남깁니다. 미리 순서를 정해 두면 당황하지 않습니다.\n\n1. 인사와 이름: Hi, this is Minsu Lee from Maple Office Supplies.\n2. 까닭: I\'m calling about the order for next week.\n3. 부탁: Could you call me back when you have a moment?\n4. 번호(천천히, 두 번): My number is 010-0000-0000. Again, 010-0000-0000.\n5. 끝인사: Thanks. Bye.\n\n번호는 듣는 사람이 받아 적을 수 있게 천천히, 끝에 한 번 더 말하는 것이 예의입니다. 이메일 주소에서 @ 기호는 at, 점(.)은 dot이라고 읽습니다. 예: hong@example.com → hong at example dot com',
      },
      {
        title: '전화가 어려운 까닭과 작은 요령',
        body: '전화 영어는 얼굴을 마주한 대화보다 어렵게 느껴집니다. 입 모양·몸짓이 보이지 않고, 소리도 깨끗하지 않기 때문입니다. 그래서 원어민끼리도 "Sorry?"를 자주 주고받습니다. 되묻는 것은 실례가 아니라 정확하게 하려는 노력입니다.\n\n- 걸기 전에 할 말(이름·까닭·부탁)을 세 줄로 적어 둡니다.\n- 이름·숫자·날짜는 꼭 다시 읽어 확인합니다: Just to check, that\'s Thursday the 14th?\n- 중요한 약속은 통화 뒤 문자나 이메일로 한 번 더 남깁니다.\n\n다음 단원(직장에서 쓰는 표현)에서는 회의·업무 요청·이메일로 이어집니다.',
      },
    ],

    faq: [
      {
        q: '전화에서 "I\'m Minsu"라고 하면 틀린 건가요?',
        a: '뜻은 통하고 틀린 문장도 아닙니다. 다만 전화에서 자기를 밝힐 때는 \'This is + 이름\' 꼴이 가장 흔하고 자연스럽습니다. 특히 처음 거는 회사·병원에는 Hello, this is Minsu Lee. 처럼 말하는 것이 무난합니다.',
      },
      {
        q: 'take a message랑 leave a message가 자꾸 헷갈려요.',
        a: '누가 하는 일인지로 나눕니다. 메시지를 두고 가는 사람(전화 건 사람)은 leave, 메시지를 받아 두는 사람(전화 받은 사람)은 take입니다. "물건을 두고 가다 = leave, 받아 가다 = take"와 같은 짝입니다.',
      },
      {
        q: '안 들릴 때 계속 Sorry? 하고 되물어도 실례가 아닌가요?',
        a: '실례가 아닙니다. 못 알아듣고 넘어가는 것이 오히려 더 큰 문제를 만듭니다. 같은 말을 반복하기보다 무엇이 문제인지 알려 주면 좋습니다: 소리가 끊기면 you\'re breaking up, 작으면 speak up, 빠르면 more slowly.',
      },
      {
        q: '문자에서 줄임말을 많이 쓰면 영어를 잘하는 것처럼 보이나요?',
        a: '꼭 그렇지는 않습니다. 줄임말은 친한 사이에서 빨리 쓰기 위한 것이고, 업무 문자에서 많이 쓰면 가볍거나 성의 없어 보일 수 있습니다. ASAP, FYI 정도는 업무에서도 쓰지만 u(you), pls 같은 줄임은 친구 사이에만 쓰는 것이 안전합니다.',
      },
    ],

    mistakes: [
      '전화를 받은 사람이 Can I leave a message? 라고 묻는 실수 — 받아 두는 쪽은 Can I take a message? 입니다.',
      '약속을 늦추자면서 move up을 쓰는 실수 — move up은 앞당기기, push back이 늦추기입니다.',
      '업무 상대에게 친구에게 쓰듯 줄임말·주어 빼기로 문자를 보내는 실수 — 이름을 밝히고 완전한 문장으로 씁니다.',
    ],

    gens: [
      {
        id: 'phone-situation',
        level: 1,
        title: '상황에 맞는 전화·약속 표현 고르기',
        make: function (R) {
          var it = R.pick(SITUATIONS);
          // 함께 맞을 수 있는 표현(어느 쪽이든 '함께 내지 않을' 목록에 있는 것)은 오답 후보에서 뺀다
          var pool = SITUATIONS.filter(function (s) {
            return s[0] !== it[0] && it[4].indexOf(s[0]) < 0 && s[4].indexOf(it[0]) < 0;
          });
          var opts = R.shuffle([it].concat(R.sample(pool, 3)));
          return {
            type: 'choice', concept: SITUATION_CONCEPT[it[0]],
            q: '다음 상황에 알맞은 영어 표현을 고르세요.\n\n' + it[1],
            choices: opts.map(function (o) { return o[2]; }),
            answer: opts.indexOf(it),
            why: opts.map(function (o) { return o === it ? '' : o[2] + ' — ' + o[3] + '.'; }),
            explain: '**' + it[2] + '** — ' + it[3] + '.',
          };
        },
      },
      {
        id: 'text-abbr',
        level: 1,
        title: '문자 메시지 줄임말 읽기',
        make: function (R) {
          var it = R.pick(ABBR);
          var wrongs = R.sample(ABBR.filter(function (a) { return a !== it; }), 3);
          var opts = R.shuffle([it].concat(wrongs));
          var toMeaning = R.bool();
          return {
            type: 'choice', concept: 4,
            q: toMeaning
              ? '문자 메시지의 줄임말 **' + it[0] + '** 뜻으로 알맞은 것을 고르세요.'
              : '"' + it[2] + '"라는 뜻으로 문자 메시지에 쓰는 줄임말을 고르세요.',
            choices: opts.map(function (o) { return toMeaning ? o[2] : o[0]; }),
            answer: opts.indexOf(it),
            why: opts.map(function (o) {
              return o === it ? '' : o[0] + ' — ' + o[1] + '(' + o[2] + ')의 줄임말입니다.';
            }),
            explain: it[0] + ' — **' + it[1] + '**, 곧 "' + it[2] + '"라는 뜻입니다. 줄임말은 친구·가족 사이에서 주로 쓰고, 업무 문자에서는 풀어 쓰는 것이 안전합니다.',
          };
        },
      },
      {
        id: 'phone-blank',
        level: 2,
        title: '전화·문자 표현의 빈칸 채우기',
        make: function (R) {
          var i = R.int(0, BLANKS.length - 1);
          var it = BLANKS[i];
          return {
            type: 'short', check: 'text', concept: BLANK_CONCEPT[i],
            q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\n' + it[0],
            answer: it[1].slice(),
            wrong: it[3].map(function (w) { return { a: w.a, why: w.why }; }),
            explain: it[2] + '\n\n바른 문장: ' + it[0].replace(/^\([^)]*\) /, '').replace('___', it[1][0]),
          };
        },
      },
    ],

    vocab: [
      { w: 'call back', m: '다시 전화하다, 답 전화를 하다', ex: 'I\'m busy now. Can I call you back in ten minutes?', exm: '지금 바빠서요. 10분 뒤에 다시 전화드려도 될까요?' },
      { w: 'hold on', m: '(전화를 끊지 않고) 기다리다', ex: 'Hold on, please. I\'ll check his schedule.', exm: '잠시만 기다려 주세요. 그분 일정을 확인해 보겠습니다.' },
      { w: 'put through', m: '(전화를) 연결해 주다', ex: 'Could you put me through to the billing team?', exm: '요금 담당 부서로 연결해 주시겠어요?' },
      { w: 'available', m: '(사람이) 시간이 되는, 통화할 수 있는', ex: 'Ms. Choi is not available at the moment.', exm: '최 선생님은 지금 통화하실 수 없습니다.' },
      { w: 'message', m: '메시지, 전할 말', ex: 'Could I leave a message for Mr. Park?', exm: '박 선생님께 메시지를 남겨도 될까요?' },
      { w: 'extension', m: '내선 (번호)', ex: 'You can reach me at extension 305.', exm: '내선 305번으로 연락 주시면 됩니다.' },
      { w: 'voicemail', m: '음성 메시지, 음성 사서함', ex: 'I left you a voicemail this morning.', exm: '오늘 아침에 음성 메시지를 남겼어요.' },
      { w: 'spell', m: '철자를 말하다', ex: 'Could you spell your last name for me?', exm: '성의 철자를 불러 주시겠어요?' },
      { w: 'connection', m: '(전화의) 연결 상태', ex: 'The connection is bad. Let me call you back.', exm: '연결 상태가 안 좋네요. 다시 걸게요.' },
      { w: 'hang up', m: '전화를 끊다', ex: 'Please don\'t hang up. I\'ll be right back.', exm: '끊지 마세요. 금방 돌아올게요.' },
      { w: 'appointment', m: '(병원·업무 등의) 약속, 예약', ex: 'I\'d like to change my appointment to Thursday.', exm: '예약을 목요일로 바꾸고 싶습니다.' },
      { w: 'reschedule', m: '일정을 다시 잡다', ex: 'Something came up, so we need to reschedule.', exm: '일이 생겨서 일정을 다시 잡아야겠어요.' },
      { w: 'postpone', m: '미루다, 연기하다', ex: 'The meeting was postponed until next week.', exm: '회의가 다음 주로 미뤄졌습니다.' },
      { w: 'cancel', m: '취소하다', ex: 'I\'m sorry, but I have to cancel our dinner.', exm: '미안하지만 저녁 약속을 취소해야겠어요.' },
      { w: 'instead', m: '대신에', ex: 'I can\'t come on Monday. Can I come on Tuesday instead?', exm: '월요일에는 못 가요. 대신 화요일에 가도 될까요?' },
      { w: 'text', m: '문자 메시지(를 보내다)', ex: 'I\'ll text you when I arrive.', exm: '도착하면 문자 보낼게요.' },
    ],
  });
})();
