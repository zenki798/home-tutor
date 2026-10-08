/* 다시 시작하는 영어 기초 문법 · 진행형과 미래 표현
 * 예문은 모두 직접 쓴 문장이다(가상의 인물). 영어 낱말 바로 뒤에는 받침에 따라 바뀌는 조사를 붙이지 않는다. */
(function () {
  // -ing 생성기: [원형, [정답], 규칙, 흔한 틀린 꼴]
  var INGS = [
    ['work', ['working'], 'ing', ''],
    ['read', ['reading'], 'ing', 'readding'],
    ['play', ['playing'], 'ing', 'plaing'],
    ['study', ['studying'], 'y', 'studing'],
    ['listen', ['listening'], 'ing', 'listenning'],
    ['make', ['making'], 'e', 'makeing'],
    ['write', ['writing'], 'e', 'writeing'],
    ['come', ['coming'], 'e', 'comeing'],
    ['take', ['taking'], 'e', 'takeing'],
    ['dance', ['dancing'], 'e', 'danceing'],
    ['ride', ['riding'], 'e', 'rideing'],
    ['lie', ['lying'], 'ie', 'lieing'],
    ['tie', ['tying'], 'ie', 'tieing'],
    ['run', ['running'], 'double', 'runing'],
    ['sit', ['sitting'], 'double', 'siting'],
    ['swim', ['swimming'], 'double', 'swiming'],
    ['stop', ['stopping'], 'double', 'stoping'],
    ['get', ['getting'], 'double', 'geting'],
    ['cut', ['cutting'], 'double', 'cuting'],
    ['shop', ['shopping'], 'double', 'shoping'],
    ['plan', ['planning'], 'double', 'planing'],
    ['see', ['seeing'], 'ee', 'seing'],
    ['visit', ['visiting'], 'ing', 'visitting'],
    ['open', ['opening'], 'ing', 'openning'],
    ['begin', ['beginning'], 'begin', 'begining'],
  ];
  var ING_RULE = {
    ing: '대부분의 동사는 끝에 -ing 꼬리를 붙입니다. 강세가 앞에 있는 visit, open, listen 같은 동사는 끝 자음을 겹치지 않습니다.',
    y: 'y로 끝나는 동사도 y를 그대로 두고 -ing를 붙입니다(study → studying).',
    e: '끝이 소리 나지 않는 -e 인 동사는 e를 빼고 -ing를 붙입니다.',
    ie: '끝이 -ie 인 동사는 ie를 y로 바꾸고 -ing를 붙입니다.',
    double: '"짧은 모음 하나 + 자음 하나"로 끝나는 1음절 동사는 끝 자음을 한 번 더 쓰고 -ing를 붙입니다.',
    ee: '끝이 -ee 인 동사는 e를 빼지 않고 -ing를 붙입니다.',
    begin: 'begin은 강세가 뒤(-gin)에 있어 끝 자음 n을 한 번 더 쓰고 -ing를 붙입니다.',
  };

  // 현재 시제 / 현재진행형 고르기: [문장, be동사, 원형, 3인칭 꼴(-s), -ing, 갈래, 뜻]
  // 갈래: habit(습관·반복 → 현재 시제), now(지금 진행 중 → 현재진행형), state(상태동사 → 현재 시제)
  var TENSE = [
    // habit 문장은 빈칸 바로 앞에 빈도부사(usually·always)를 두어 진행형(요즘 잠시)·be going to로 읽힐 여지를 없앤다
    ['Minsu usually ___ the bus to work.', 'is', 'take', 'takes', 'taking', 'habit', '민수는 보통 버스를 타고 출근합니다.'],
    ['My parents usually ___ dinner at six.', 'are', 'have', 'have', 'having', 'habit', '부모님은 보통 여섯 시에 저녁을 드십니다.'],
    ['Jia usually ___ coffee in the morning.', 'is', 'drink', 'drinks', 'drinking', 'habit', '지아는 보통 아침에 커피를 마십니다.'],
    ['We usually ___ our grandparents on Sundays.', 'are', 'visit', 'visit', 'visiting', 'habit', '우리는 보통 일요일에 조부모님 댁에 갑니다.'],
    ['The museum always ___ at nine.', 'is', 'open', 'opens', 'opening', 'habit', '그 박물관은 늘 아홉 시에 문을 엽니다.'],
    ['I usually ___ the news at night.', 'am', 'watch', 'watch', 'watching', 'habit', '저는 보통 밤에 뉴스를 봅니다.'],
    ['My brother always ___ his bike to school.', 'is', 'ride', 'rides', 'riding', 'habit', '남동생은 늘 자전거를 타고 학교에 갑니다.'],
    ['Look! It ___ outside.', 'is', 'snow', 'snows', 'snowing', 'now', '보세요! 밖에 눈이 오고 있어요.'],
    ['Please be quiet. The baby ___ right now.', 'is', 'sleep', 'sleeps', 'sleeping', 'now', '조용히 해 주세요. 아기가 지금 자고 있어요.'],
    ['I ___ dinner now. Please call me later.', 'am', 'cook', 'cook', 'cooking', 'now', '지금 저녁을 하고 있어요. 나중에 전화 주세요.'],
    ['The children ___ soccer in the park at the moment.', 'are', 'play', 'play', 'playing', 'now', '아이들은 지금 공원에서 축구를 하고 있습니다.'],
    ['Listen! Someone ___ the piano.', 'is', 'play', 'plays', 'playing', 'now', '들어 보세요! 누군가 피아노를 치고 있어요.'],
    ['We ___ for the bus now.', 'are', 'wait', 'wait', 'waiting', 'now', '우리는 지금 버스를 기다리고 있습니다.'],
    ['Jia ___ on the phone right now.', 'is', 'talk', 'talks', 'talking', 'now', '지아는 지금 통화하고 있습니다.'],
    ['I ___ the answer to this question.', 'am', 'know', 'know', 'knowing', 'state', '저는 이 질문의 답을 압니다.'],
    ['He ___ a cup of tea now.', 'is', 'want', 'wants', 'wanting', 'state', '그는 지금 차 한 잔을 원합니다.'],
    ['I ___ this song very much.', 'am', 'like', 'like', 'liking', 'state', '저는 이 노래를 무척 좋아합니다.'],
    ['This bag ___ to Jia.', 'is', 'belong', 'belongs', 'belonging', 'state', '이 가방은 지아의 것입니다.'],
    ['We ___ a big garden behind our house.', 'are', 'have', 'have', 'having', 'state', '우리 집 뒤에는 큰 정원이 있습니다.'],
    ['Seojun ___ your phone number.', 'is', 'remember', 'remembers', 'remembering', 'state', '서준이는 당신 전화번호를 기억합니다.'],
  ];
  var TENSE_WHY = {
    habit: '늘 되풀이하는 습관이나 일과(every day, usually, always)는 현재 시제로 말합니다.',
    now: '말하는 지금 한창 하고 있는 일(now, right now, at the moment, Look!, Listen!)은 현재진행형(be동사 + -ing)으로 말합니다.',
    state: '이 동사는 동작이 아니라 상태(알다·원하다·좋아하다·가지다 같은 것)를 나타내므로 now가 있어도 진행형으로 쓰지 않고 현재 시제로 말합니다.',
  };

  // 과거진행형 생성기: [문장, 정답 be동사, 원형, -ing, 뜻]
  var PASTPROG = [
    ['At eight last night, I ___ TV.', 'was', 'watch', 'watching', '어젯밤 여덟 시에 저는 텔레비전을 보고 있었습니다.'],
    ['When you called, we ___ dinner.', 'were', 'have', 'having', '당신이 전화했을 때 우리는 저녁을 먹고 있었습니다.'],
    ['Jia ___ in the park at seven yesterday morning.', 'was', 'run', 'running', '어제 아침 일곱 시에 지아는 공원에서 달리고 있었습니다.'],
    ['The children ___ when I got home.', 'were', 'sleep', 'sleeping', '제가 집에 왔을 때 아이들은 자고 있었습니다.'],
    ['It ___ hard all day yesterday.', 'was', 'rain', 'raining', '어제는 온종일 비가 세차게 내리고 있었습니다.'],
    ['Minsu ___ an email at that time.', 'was', 'write', 'writing', '그때 민수는 이메일을 쓰고 있었습니다.'],
    ['We ___ for the bus when it started to snow.', 'were', 'wait', 'waiting', '눈이 오기 시작했을 때 우리는 버스를 기다리고 있었습니다.'],
    ['My parents ___ the garden at noon yesterday.', 'were', 'clean', 'cleaning', '어제 정오에 부모님은 정원을 청소하고 계셨습니다.'],
    ['Seojun ___ on the phone when the bus came.', 'was', 'talk', 'talking', '버스가 왔을 때 서준이는 통화하고 있었습니다.'],
    ['You ___ very fast on the highway yesterday.', 'were', 'drive', 'driving', '어제 당신은 고속도로에서 무척 빨리 달리고 있었습니다.'],
    ['I ___ a shower when the doorbell rang.', 'was', 'take', 'taking', '초인종이 울렸을 때 저는 샤워를 하고 있었습니다.'],
    ['They ___ soccer at four yesterday afternoon.', 'were', 'play', 'playing', '어제 오후 네 시에 그들은 축구를 하고 있었습니다.'],
    ['Hayun ___ a book on the subway yesterday morning.', 'was', 'read', 'reading', '어제 아침 지하철에서 하윤이는 책을 읽고 있었습니다.'],
    ['The students ___ for the exam at midnight last night.', 'were', 'study', 'studying', '어젯밤 자정에 학생들은 시험공부를 하고 있었습니다.'],
    ['My dog ___ at the door when I came back.', 'was', 'sit', 'sitting', '제가 돌아왔을 때 개가 문 앞에 앉아 있었습니다.'],
    ['We ___ about you a minute ago.', 'were', 'talk', 'talking', '우리는 조금 전에 당신 이야기를 하고 있었습니다.'],
    ['Doyun ___ his bike when he fell.', 'was', 'ride', 'riding', '도윤이는 자전거를 타다가 넘어졌습니다.'],
    ['The baby ___ loudly at midnight last night.', 'was', 'cry', 'crying', '어젯밤 자정에 아기가 크게 울고 있었습니다.'],
    ['You ___ when I left the office.', 'were', 'work', 'working', '제가 퇴근할 때 당신은 일하고 있었습니다.'],
    ['Sua ___ lunch with her coworkers at one yesterday.', 'was', 'eat', 'eating', '어제 한 시에 수아는 동료들과 점심을 먹고 있었습니다.'],
  ];

  // 미래 꼴 생성기: [주어, be동사, 동사구 원형, 3인칭 단수 -s 꼴, -ing 꼴, 뜻, 방식(will / going)]
  var FUTURE = [
    ['It', 'is', 'rain tomorrow', 'rains tomorrow', 'raining tomorrow', '내일 비가 올 것입니다.', 'will'],
    ['I', 'am', 'call you tonight', 'calls you tonight', 'calling you tonight', '오늘 밤에 전화할게요.', 'will'],
    ['The store', 'is', 'close early today', 'closes early today', 'closing early today', '그 가게는 오늘 일찍 문을 닫을 것입니다.', 'will'],
    ['We', 'are', 'help you with the boxes', 'helps you with the boxes', 'helping you with the boxes', '우리가 상자 옮기는 것을 도와 드릴게요.', 'will'],
    ['She', 'is', 'be thirty next year', 'is thirty next year', 'being thirty next year', '그녀는 내년에 서른 살이 됩니다.', 'will'],
    ['They', 'are', 'arrive at noon', 'arrives at noon', 'arriving at noon', '그들은 정오에 도착할 것입니다.', 'will'],
    ['Minsu', 'is', 'like this gift', 'likes this gift', 'liking this gift', '민수는 이 선물을 좋아할 거예요.', 'will'],
    ['You', 'are', 'love this movie', 'loves this movie', 'loving this movie', '당신은 이 영화를 무척 좋아할 거예요.', 'will'],
    ['I', 'am', 'carry that bag for you', 'carries that bag for you', 'carrying that bag for you', '그 가방은 제가 들어 드릴게요.', 'will'],
    ['The meeting', 'is', 'end at five', 'ends at five', 'ending at five', '회의는 다섯 시에 끝날 것입니다.', 'will'],
    ['We', 'are', 'visit Jeju next month', 'visits Jeju next month', 'visiting Jeju next month', '우리는 다음 달에 제주에 갈 계획입니다.', 'going'],
    ['Jia', 'is', 'start a new job in May', 'starts a new job in May', 'starting a new job in May', '지아는 5월에 새 일을 시작할 예정입니다.', 'going'],
    ['I', 'am', 'buy a new laptop this weekend', 'buys a new laptop this weekend', 'buying a new laptop this weekend', '저는 이번 주말에 새 노트북을 살 생각입니다.', 'going'],
    ['They', 'are', 'move to Daegu next year', 'moves to Daegu next year', 'moving to Daegu next year', '그들은 내년에 대구로 이사할 계획입니다.', 'going'],
    ['My sister', 'is', 'study abroad next fall', 'studies abroad next fall', 'studying abroad next fall', '언니는 내년 가을에 유학을 갈 예정입니다.', 'going'],
    ['He', 'is', 'paint the kitchen on Saturday', 'paints the kitchen on Saturday', 'painting the kitchen on Saturday', '그는 토요일에 부엌을 칠할 계획입니다.', 'going'],
    ['You', 'are', 'need a coat today', 'needs a coat today', 'needing a coat today', '오늘은 외투가 필요하실 거예요. 밖이 무척 추워요.', 'going'],
    ['We', 'are', 'have a party for Seojun', 'has a party for Seojun', 'having a party for Seojun', '우리는 서준이를 위해 파티를 열 계획입니다.', 'going'],
    ['I', 'am', 'learn to swim this summer', 'learns to swim this summer', 'learning to swim this summer', '저는 이번 여름에 수영을 배울 생각입니다.', 'going'],
    ['Minsu', 'is', 'sell his old car', 'sells his old car', 'selling his old car', '민수는 자기 옛 차를 팔 생각입니다.', 'going'],
  ];
  var BE_OTHER = { am: 'is', is: 'are', are: 'is' };

  Tutor.registerUnit({
    id: 'eng-a-basic-08',
    course: 'eng-a-basic',
    title: '진행형과 미래 표현',
    summary: '지금 하고 있는 일과 앞으로 할 일을 말하는 진행형, will, be going to의 차이를 익힙니다.',
    goals: [
      '현재진행형(am·is·are + -ing)을 만들고, -ing 꼴을 철자 규칙에 맞게 쓸 수 있다.',
      '현재 시제와 현재진행형을 상황에 맞게 구별해 쓸 수 있다.',
      '과거진행형(was·were + -ing)으로 과거 어느 때에 하고 있던 일을 말할 수 있다.',
      'will, be going to, 현재진행형으로 미래의 일을 상황에 맞게 말할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '현재진행형 — am·is·are + -ing',
        body: '**현재진행형**은 "지금 ~하고 있다"처럼 말하는 순간에 한창 하고 있는 일을 나타냅니다.\n\n**모양**: 주어 + am·is·are + 동사-ing\n\n| 주어 | be동사 | 예 |\n|---|---|---|\n| I | am | I **am cooking** now. |\n| he, she, it, 한 사람·한 가지 | is | Jia **is reading** a book. |\n| you, we, they, 둘 이상 | are | They **are playing** soccer. |\n\n부정문과 의문문은 be동사 문장과 같은 방법으로 만듭니다.\n\n| 부정문 (be동사 뒤에 not) | 의문문 (be동사를 주어 앞으로) |\n|---|---|\n| I **am not** working now. | **Are** you **working** now? — Yes, I am. / No, I\'m not. |\n| She **isn\'t** sleeping. | **What are** you **doing**? — I\'m cooking. |\n\n> ⚠️ be동사를 빼먹지 않습니다. I cooking now. (✗) → I **am** cooking now. (○)\n\n> ⚠️ be동사 뒤에 동사원형을 쓰지 않습니다. She is read. (✗) → She is **reading**. (○)',
        easy: '현재진행형은 "지금 이 순간" 사진을 찍는 말입니다. 사진 속 사람이 한창 무엇을 하는 중인지 말해 줍니다.\n\n두 조각이 꼭 함께 다닙니다: am·is·are(지금) + -ing(하는 중). 둘 중 하나라도 빠지면 문장이 되지 않습니다.\n\nI am eating. (나는 먹는 중) / She is driving. (그녀는 운전하는 중)',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nThe kids ___ in the yard now.',
          choices: ['are playing', 'is playing', 'playing'],
          answer: 0,
          why: ['', 'is — 한 사람·한 가지가 주어일 때 씁니다. 아이들(the kids)은 둘 이상입니다.', 'be동사가 빠졌습니다. 현재진행형은 am·is·are + -ing입니다.'],
          explain: '주어 the kids는 둘 이상이므로 are를 쓰고 동사에 -ing를 붙여 **are playing**입니다. "아이들이 지금 마당에서 놀고 있습니다."',
        },
      },
      {
        title: '-ing 만드는 법',
        body: '대부분의 동사는 끝에 **-ing**를 붙이면 됩니다. 끝 글자에 따라 모양이 조금 바뀌는 경우만 챙깁니다.\n\n| 동사의 끝 | 붙이는 법 | 예 |\n|---|---|---|\n| 대부분 | + ing | work → working, read → reading, study → studying |\n| 소리 나지 않는 -e | e를 빼고 + ing | make → making, write → writing, come → coming |\n| -ie | ie → y + ing | lie → lying, tie → tying |\n| 짧은 모음 + 자음 하나 (1음절) | 자음을 겹쳐 + ing | run → running, sit → sitting, swim → swimming, get → getting |\n\n- -ee로 끝나는 동사는 e를 빼지 않습니다: see → **seeing**\n- y로 끝나는 동사는 y를 그대로 둡니다: study → **studying**, play → **playing**\n- visit, open, listen처럼 강세가 앞에 있는 2음절 동사는 자음을 겹치지 않습니다: visit → **visiting**. begin처럼 강세가 뒤에 있으면 겹칩니다: begin → **beginning**\n\n> 💡 자음을 겹치는 규칙은 과거형 -ed(stop → stopped)와 같습니다.',
        easy: '-ing는 거의 언제나 그냥 붙이면 됩니다. 예외는 세 가지뿐입니다.\n\n1. 끝 e가 소리 나지 않으면 떼고 붙입니다: make → making\n2. ie는 y로 바꿉니다: lie → lying (i가 둘 붙으면 이상하니까요)\n3. run, sit처럼 짧게 끝나는 말은 끝 글자를 하나 더 씁니다: run → running',
        check: {
          type: 'short', check: 'text',
          q: '다음 동사의 -ing 꼴을 쓰세요.\n\nwrite',
          answer: ['writing'],
          wrong: [
            { a: 'writeing', why: '소리 나지 않는 -e로 끝나는 동사는 e를 빼고 -ing를 붙입니다.' },
            { a: 'writting', why: 'write는 끝이 e라서 자음을 겹치지 않습니다. e만 빼고 -ing를 붙입니다.' },
          ],
          explain: 'write는 소리 나지 않는 e로 끝나므로 e를 빼고 -ing를 붙여 **writing**입니다.',
        },
      },
      {
        title: '현재 시제와 현재진행형의 차이',
        body: '두 시제는 "언제의 일인가"가 다릅니다.\n\n| 현재 시제 | 현재진행형 |\n|---|---|\n| 늘 되풀이하는 습관·일과, 변하지 않는 사실 | 말하는 지금 한창 하는 일, 요즘 잠시 하는 일 |\n| Jia **works** at a bank. (지아는 은행에서 일합니다 — 직업) | Jia **is working** at home today. (지아는 오늘 집에서 일하고 있습니다) |\n| I **drink** coffee every morning. | I **am drinking** coffee now. |\n| 함께 오는 말: every day, usually, always, on Sundays | 함께 오는 말: now, right now, at the moment, Look!, Listen! |\n\n**상태동사**는 진행형으로 잘 쓰지 않습니다. 동작이 아니라 마음·생각·가진 것 같은 상태를 나타내는 동사입니다.\n\n| 갈래 | 동사 |\n|---|---|\n| 알다·생각 | know, understand, remember, believe |\n| 좋고 싫음·바람 | like, love, hate, want, need |\n| 가지다·속하다 | have(가지다), own, belong |\n\n- I **know** the answer. (○) / I am knowing the answer. (✗)\n- He **wants** some water now. (○) — now가 있어도 want는 현재 시제\n\n> 💡 have가 "먹다·시간을 보내다"라는 동작일 때는 진행형이 됩니다. We **are having** lunch. (우리는 점심을 먹고 있습니다.)',
        easy: '현재 시제는 "자기소개", 현재진행형은 "생중계"라고 생각하면 쉽습니다.\n\n"저는 회사원이고 매일 지하철을 탑니다"는 자기소개라서 현재 시제(I take the subway every day.), "지금 지하철 안이에요"는 생중계라서 현재진행형(I\'m taking the subway now.)입니다.\n\n알다·좋아하다·원하다처럼 사진에 찍히지 않는 "마음 상태"는 생중계할 동작이 없으니 진행형으로 쓰지 않습니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nMy father usually ___ to work.',
          choices: ['walks', 'is walking', 'walking'],
          answer: 0,
          why: ['', 'usually(보통)는 되풀이하는 습관을 나타냅니다. 습관은 현재진행형이 아니라 현재 시제로 말합니다.', 'be동사 없이 -ing만 쓰면 문장이 되지 않습니다.'],
          explain: 'usually가 있어 늘 되풀이하는 습관이므로 현재 시제 **walks**입니다. "아버지는 보통 걸어서 출근하십니다."',
        },
      },
      {
        title: '과거진행형 — was·were + -ing',
        body: '**과거진행형**은 "그때 ~하고 있었다"처럼 과거의 어느 순간에 한창 하고 있던 일을 나타냅니다.\n\n**모양**: 주어 + was·were + 동사-ing\n\n| 주어 | be동사 | 예 |\n|---|---|---|\n| I, he, she, it, 한 사람·한 가지 | was | I **was watching** TV at nine. |\n| you, we, they, 둘 이상 | were | They **were sleeping** at midnight. |\n\n과거의 "어느 순간"을 알려 주는 말과 자주 함께 옵니다: at nine last night, at that time(그때), when ~(~했을 때)\n\n- When you called, I **was taking** a shower. (당신이 전화했을 때 저는 샤워를 하고 있었습니다.)\n\n| 과거 시제 | 과거진행형 |\n|---|---|\n| I **cooked** dinner at seven. (일곱 시에 저녁을 했다 — 한 일) | I **was cooking** dinner at seven. (일곱 시에 저녁을 하고 있었다 — 하던 중) |\n\n부정문은 wasn\'t·weren\'t + -ing, 의문문은 Was·Were + 주어 + -ing입니다. **What were** you **doing** at ten? — I **was sleeping**.',
        easy: '과거진행형은 지난 일을 찍은 사진입니다. "어젯밤 아홉 시" 사진을 꺼내 보면 그 사진 속에서 무엇을 하는 중이었는지 말해 주는 것입니다.\n\n현재진행형의 am·is·are를 과거형 was·were로 바꾸기만 하면 됩니다. I am reading. → I was reading.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nWhat ___ you doing at ten last night?',
          choices: ['were', 'was', 'did'],
          answer: 0,
          why: ['', 'was — I나 한 사람·한 가지가 주어일 때 씁니다. 주어 you는 늘 were입니다.', 'did 뒤에는 동사원형이 옵니다. doing(-ing)이 있으니 be동사가 필요합니다.'],
          explain: 'doing이 있으니 과거진행형(was·were + -ing)이고, 주어가 you이므로 **were**입니다. "어젯밤 열 시에 무엇을 하고 있었어요?"',
        },
      },
      {
        title: 'will과 be going to',
        body: '앞으로의 일은 **will**이나 **be going to**로 말합니다. 둘 다 뒤에 **동사원형**이 옵니다.\n\n| | will + 동사원형 | be going to + 동사원형 |\n|---|---|---|\n| 모양 | I **will** call you. (I\'ll call you.) | I **am going to** call you. |\n| 부정 | I **won\'t**(will not) call. | I**\'m not going to** call. |\n| 의문 | **Will** you call? | **Are** you **going to** call? |\n\n**쓰임의 차이**\n\n| will | be going to |\n|---|---|\n| 말하는 **그 자리에서** 정한 일, 약속·제안 | **미리** 마음먹고 세워 둔 계획 |\n| A: The phone is ringing. B: I**\'ll** get it. (제가 받을게요.) | I bought the paint. I**\'m going to** paint my room. (방을 칠할 계획입니다.) |\n| 생각·느낌으로 하는 예측 | 눈앞의 근거가 있는 예측 |\n| I think it **will** be sunny tomorrow. | Look at those clouds! It**\'s going to** rain. |\n\n- be going to의 be는 주어에 맞춥니다: I **am** / She **is** / They **are** going to …\n- will은 주어가 누구든 모양이 같습니다: She **will** / They **will** …\n\n> ⚠️ will 뒤에 -s나 -ing를 붙이지 않습니다. She will goes. (✗) → She will **go**. (○)',
        easy: 'will은 "그래, 그렇게 할게!" 하고 그 자리에서 정하는 말, be going to는 "달력에 이미 적어 둔 계획"이라고 생각하면 됩니다.\n\n친구가 "짐이 무거워"라고 하면 그 자리에서 "내가 들어 줄게" → I\'ll carry it.\n지난주부터 계획한 여행이면 → I\'m going to visit Jeju next week.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nShe will ___ her parents this weekend.',
          choices: ['visit', 'visits', 'visiting'],
          answer: 0,
          why: ['', 'will 뒤에는 주어가 she여도 -s를 붙이지 않고 동사원형을 씁니다.', 'will 뒤에는 -ing 꼴이 아니라 동사원형을 씁니다.'],
          explain: 'will 뒤에는 늘 동사원형이 옵니다. **She will visit her parents this weekend.** (그녀는 이번 주말에 부모님을 찾아뵐 것입니다.)',
        },
      },
      {
        title: '현재진행형으로 가까운 미래의 일정 말하기',
        body: '현재진행형은 "지금 하는 중"뿐 아니라, **이미 날짜·시각을 정해 둔 가까운 미래의 약속·일정**도 나타냅니다. 이때는 tomorrow, tonight, this weekend, next week 같은 **미래의 때**가 함께 옵니다.\n\n- I**\'m meeting** Jia **tomorrow**. (내일 지아를 만나기로 했습니다.)\n- We**\'re flying** to Jeju **on Friday**. (금요일에 비행기로 제주에 갑니다 — 표를 이미 끊었습니다.)\n- **What are** you **doing this weekend**? (이번 주말에 뭐 하세요? — 정해 둔 일정을 묻습니다.)\n\n| 문장 | 뜻 |\n|---|---|\n| I am working **now**. | 지금 일하고 있습니다. (진행 중) |\n| I am working **on Saturday**. | 토요일에 일하기로 되어 있습니다. (정해진 일정) |\n\n> 💡 같은 모양이라도 함께 오는 **때를 나타내는 말**을 보면 지금 일인지 미래 일정인지 알 수 있습니다.\n\n> 💡 다른 사람과 약속했거나 표·예약을 끝낸 일정에 잘 어울립니다. 그냥 "~할 생각이다"라는 계획은 be going to가 더 자연스럽습니다.',
        easy: '현재진행형으로 미래를 말하는 것은 "수첩에 이미 적힌 약속"을 읽어 주는 느낌입니다.\n\n"내일 치과 예약이 있어요" → I\'m seeing the dentist tomorrow. 예약을 이미 해 두어서 그 일이 벌써 진행되고 있는 것처럼 말하는 것입니다.\n\n문장 끝의 tomorrow, next week 같은 말이 "미래"라는 신호입니다.',
        check: {
          type: 'ox',
          q: '"I\'m having dinner with my boss tomorrow."는 지금 상사와 저녁을 먹고 있다는 뜻입니다.',
          answer: false,
          explain: '내일(tomorrow)이라는 때가 있으므로 지금 하는 일이 아니라 **내일로 정해 둔 약속**입니다. "내일 상사와 저녁을 먹기로 했습니다."',
        },
      },
    ],

    examples: [
      {
        q: '서준이의 평소 모습과 오늘 모습을 영어로 말해 보세요.\n\n서준이는 영어를 가르칩니다(직업). 그런데 오늘은 가르치고 있지 않습니다. 집에서 쉬고 있습니다.',
        steps: [
          '직업처럼 늘 그런 일은 현재 시제입니다. 주어가 한 사람이므로 -es를 붙여 Seojun teaches English.',
          '오늘 지금 하지 않는 일은 현재진행형의 부정문입니다: He isn\'t teaching today.',
          '지금 하고 있는 일은 현재진행형: He is resting at home.',
        ],
        answer: 'Seojun teaches English. He isn\'t teaching today. He is resting at home.',
      },
      {
        q: '대화의 빈칸에 will과 be going to 가운데 알맞은 것을 넣어 보세요.\n\nA: Do you have any plans for the holiday?\nB: Yes. I ___ visit my grandmother. I bought the train ticket last week.\nA: Oh, it\'s raining. I don\'t have an umbrella.\nB: Don\'t worry. I ___ drive you home.',
        steps: [
          '첫째 빈칸: 지난주에 기차표를 이미 샀으니 미리 세워 둔 계획입니다. 그래서 am going to를 씁니다.',
          '둘째 빈칸: 비가 오는 것을 보고 그 자리에서 정한 제안입니다. 그래서 will(\'ll)을 씁니다.',
          '두 표현 모두 뒤에는 동사원형(visit, drive)이 옵니다.',
        ],
        answer: 'I am going to visit my grandmother. / I will (I\'ll) drive you home.',
      },
    ],

    terms: [
      { term: '현재진행형', def: '"지금 ~하고 있다"를 나타내는 꼴입니다. am·is·are + 동사-ing. 예: I am cooking now. 정해 둔 가까운 미래의 일정에도 씁니다.' },
      { term: '과거진행형', def: '"그때 ~하고 있었다"를 나타내는 꼴입니다. was·were + 동사-ing. 예: I was sleeping at midnight.' },
      { term: '-ing 꼴', def: '동사 끝에 -ing를 붙인 꼴입니다. 진행형에 씁니다. 예: making, running, lying, studying' },
      { term: '상태동사', def: '동작이 아니라 마음·생각·가진 것 같은 상태를 나타내는 동사입니다. 진행형으로 잘 쓰지 않습니다. 예: know, like, want, have(가지다)' },
      { term: 'will', def: '앞으로의 일을 나타내는 말로, 말하는 그 자리에서 정한 일·약속·제안·예측에 씁니다. 뒤에 동사원형이 옵니다. 부정은 won\'t입니다.' },
      { term: 'be going to', def: '미리 세워 둔 계획이나 눈앞의 근거가 있는 예측을 나타냅니다. be동사는 주어에 맞추고 뒤에 동사원형이 옵니다. 예: I am going to move next month.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 말을 고르세요.\n\nBe quiet, please. Jia ___ for an exam now.',
        choices: ['is studying', 'studying', 'are studying', 'is study'],
        answer: 0,
        why: [
          '',
          'be동사가 빠졌습니다. 현재진행형은 am·is·are + -ing입니다.',
          'are — you나 둘 이상이 주어일 때 씁니다. Jia는 한 사람입니다.',
          'be동사 뒤에 동사원형을 쓰지 않습니다. -ing 꼴로 바꿉니다.',
        ],
        explain: 'now가 있어 지금 하고 있는 일이고, 주어가 한 사람이므로 **is studying**입니다. "조용히 해 주세요. 지아가 지금 시험공부를 하고 있어요."',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
        q: '다음 동사의 -ing 꼴을 쓰세요.\n\nmake',
        answer: ['making'],
        wrong: [
          { a: 'makeing', why: '소리 나지 않는 -e로 끝나는 동사는 e를 빼고 -ing를 붙입니다.' },
          { a: 'makking', why: 'make는 끝이 e라서 자음을 겹치지 않습니다. e만 빼고 -ing를 붙입니다.' },
        ],
        explain: 'make는 소리 나지 않는 e로 끝나므로 e를 빼고 -ing를 붙여 **making**입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'text', concept: 1,
        q: '다음 동사의 -ing 꼴을 쓰세요.\n\nswim',
        answer: ['swimming'],
        wrong: [
          { a: 'swiming', why: 'swim은 "짧은 모음 + 자음 하나"로 끝나는 1음절 동사라서 끝 자음 m을 한 번 더 씁니다.' },
        ],
        explain: 'swim은 짧은 모음(i) + 자음 하나(m)로 끝나므로 m을 겹쳐 쓰고 -ing를 붙여 **swimming**입니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 2,
        q: '다음 문장은 바른 문장입니다.\n\nI am knowing your sister.',
        answer: false,
        explain: 'know(알다)는 상태를 나타내는 동사라서 진행형으로 쓰지 않습니다. **I know your sister.**(저는 당신 언니를 압니다.)로 고칩니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 말을 고르세요.\n\nLook! Your dog ___ in the pool.',
        choices: ['is swimming', 'swims', 'swim', 'swimming'],
        answer: 0,
        why: [
          '',
          'swims — 늘 하는 습관을 말할 때 씁니다. Look!(보세요!)이 있으니 지금 한창 하는 일입니다.',
          '주어 your dog는 한 마리이고, 지금 하는 일이므로 동사원형이 아니라 현재진행형을 씁니다.',
          'be동사가 빠졌습니다. 현재진행형은 am·is·are + -ing입니다.',
        ],
        explain: 'Look!(보세요!)은 지금 눈앞에서 일어나는 일을 가리킵니다. 그래서 현재진행형 **is swimming**입니다. "보세요! 당신 개가 수영장에서 헤엄치고 있어요."',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n제가 집에 왔을 때 아이들은 숙제를 하고 있었습니다.\n→ When I came home, the children ___ their homework.',
        choices: ['were doing', 'was doing', 'are doing', 'were do'],
        answer: 0,
        why: [
          '',
          'was — 한 사람·한 가지가 주어일 때 씁니다. the children(아이들)은 둘 이상입니다.',
          'are doing은 현재진행형입니다. "제가 집에 왔을 때"는 지난 일입니다.',
          'be동사 뒤에는 동사원형이 아니라 -ing 꼴을 씁니다.',
        ],
        explain: '과거 어느 때(집에 왔을 때) 하고 있던 일이므로 과거진행형이고, 주어가 둘 이상이므로 **were doing**입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 말을 고르세요.\n\nWe ___ going to move to a new apartment next month.',
        choices: ['are', 'is', 'will', 'do'],
        answer: 0,
        why: [
          '',
          'is — 한 사람·한 가지가 주어일 때 씁니다. 주어 we는 여럿입니다.',
          'will과 be going to를 함께 쓰지 않습니다. going to 앞에는 be동사가 와야 합니다.',
          'going to 앞에는 do가 아니라 be동사가 옵니다.',
        ],
        explain: 'be going to의 be는 주어에 맞춥니다. 주어 we이므로 **are** going to입니다. "우리는 다음 달에 새 아파트로 이사할 계획입니다."',
      },
      {
        id: 'p8', level: 1, type: 'short', check: 'text', concept: 4,
        q: '우리말에 맞게 빈칸에 알맞은 한 낱말을 쓰세요.\n\n걱정하지 마세요. 늦지 않을게요.\n→ Don\'t worry. I ___ be late.',
        answer: ['won\'t'],
        hint: 'will not을 한 낱말로 줄인 꼴입니다.',
        wrong: [
          { a: 'don\'t', why: '앞으로의 약속이므로 will의 부정을 씁니다. don\'t be late는 "늦지 마세요"라는 명령입니다.' },
          { a: 'willn\'t', why: 'will not의 줄임말은 모양이 특별합니다. won\'t라고 씁니다.' },
          { a: 'will', why: '"늦지 않을게요"이므로 부정이 필요합니다.' },
        ],
        explain: 'will not의 줄임말은 **won\'t**입니다. "늦지 않을게요"는 그 자리에서 하는 약속이라 will을 씁니다. I won\'t be late.',
      },
      {
        id: 'p9', level: 1, type: 'ox', concept: 5,
        q: '"We\'re visiting our grandparents this Saturday."는 이번 토요일에 조부모님 댁에 가기로 정해 두었다는 뜻이 될 수 있습니다.',
        answer: true,
        explain: '현재진행형에 미래의 때(this Saturday)가 함께 오면 **정해 둔 가까운 미래의 일정**을 나타냅니다. "우리는 이번 토요일에 조부모님 댁에 갑니다."',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 4,
        q: '대화의 빈칸에 가장 알맞은 말을 고르세요.\n\nA: I\'m so thirsty.\nB: Wait here. I ___ get you some water.',
        choices: ['will', 'going to', 'was', 'am'],
        answer: 0,
        hint: 'B는 언제 물을 가져다주기로 마음먹었나요?',
        why: [
          '',
          'going to 앞에는 주어에 맞는 be동사(am)가 있어야 합니다. 그리고 그 자리에서 마음먹은 제안에는 보통 will을 씁니다.',
          'was는 과거입니다. 물을 가져다주는 것은 앞으로의 일입니다.',
          'am 뒤에 동사원형 get을 바로 쓸 수 없습니다.',
        ],
        explain: 'A의 말을 듣고 **그 자리에서** 정한 제안이므로 **will**을 씁니다(I\'ll get you some water). "여기서 기다리세요. 제가 물을 좀 가져다 드릴게요."',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'text', concept: 0,
        q: '우리말에 맞게 빈칸에 알맞은 말을 쓰세요. (한 낱말 또는 두 낱말)\n\n그는 지금 샤워하고 있지 않습니다.\n→ He ___ taking a shower now.',
        answer: ['isn\'t', 'is not'],
        hint: '현재진행형의 부정문은 be동사 뒤에 not을 붙입니다.',
        wrong: [
          { a: 'doesn\'t', why: '현재진행형의 부정문은 do·does가 아니라 be동사 뒤에 not을 붙여 만듭니다.' },
          { a: 'aren\'t', why: '주어 he는 한 사람이므로 is를 씁니다.' },
          { a: 'wasn\'t', why: 'now(지금)의 일이므로 과거형 was가 아니라 is를 씁니다.' },
        ],
        explain: '현재진행형의 부정은 be동사 + not + -ing입니다. 주어 he이므로 **isn\'t**(is not)입니다.',
      },
      {
        id: 'p12', level: 2, type: 'order', concept: 0,
        q: '우리말에 맞게 배열하세요.\n\n지금 무엇을 하고 있어요?',
        choices: ['What', 'are', 'you', 'doing', 'now'],
        answer: [0, 1, 2, 3, 4],
        explain: '의문사 + be동사 + 주어 + -ing: **What are you doing now?** 현재진행형 의문문은 be동사를 주어 앞으로 옮깁니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 2,
        q: '**옳지 않은** 문장을 고르세요.',
        choices: ['She is writing an email now.', 'I am wanting a new phone.', 'They were sleeping at midnight.', 'We are going to move next month.'],
        answer: 1,
        why: [
          '지금 하는 일을 현재진행형으로 바르게 썼습니다.',
          '',
          '과거 어느 때(자정) 하고 있던 일을 과거진행형으로 바르게 썼습니다.',
          '미리 세운 계획을 be going to로 바르게 썼습니다.',
        ],
        explain: 'want(원하다)는 상태동사라서 진행형으로 쓰지 않습니다. **I want a new phone.** 으로 고칩니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 4,
        q: '빈칸에 가장 알맞은 말을 고르세요.\n\nLook at those dark clouds! It ___ rain soon.',
        choices: ['is going to', 'is raining', 'was going to', 'goes to'],
        answer: 0,
        hint: '눈앞에 근거(먹구름)가 있는 예측입니다.',
        why: [
          '',
          'is raining은 "지금 비가 오고 있다"입니다. 그리고 뒤에 rain이 또 있어 문장이 되지 않습니다.',
          'was going to는 과거의 계획을 말합니다. 먹구름을 보고 하는 지금의 예측과 맞지 않습니다.',
          'goes to는 "~로 간다"라는 뜻이라 뒤에 동사원형 rain을 쓸 수 없습니다.',
        ],
        explain: '눈앞의 근거(먹구름)를 보고 하는 예측에는 **be going to**가 잘 어울립니다. "저 먹구름 좀 보세요! 곧 비가 오겠어요."',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 5,
        q: '지아의 이번 주 일정표입니다. 일정표와 맞는 문장을 고르세요.\n\n| 요일 | 일정 |\n|---|---|\n| 월요일 | 오후 3시 치과 |\n| 수요일 | 민수와 저녁 식사 |\n| 토요일 | 비행기로 제주 가기 |',
        choices: ['Jia is seeing the dentist on Wednesday.', 'Jia is having dinner with Minsu on Wednesday.', 'Jia is flying to Jeju on Monday.', 'Jia is meeting Minsu on Saturday.'],
        answer: 1,
        why: [
          '치과는 월요일 일정입니다.',
          '',
          '제주에 가는 날은 토요일입니다.',
          '민수를 만나는 날은 수요일입니다.',
        ],
        explain: '현재진행형 + 미래의 때로 정해 둔 일정을 말합니다. 수요일에 민수와 저녁을 먹으므로 **Jia is having dinner with Minsu on Wednesday.**가 맞습니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'text', concept: 1,
        q: '다음 동사의 -ing 꼴을 쓰세요.\n\nlie (눕다)',
        answer: ['lying'],
        hint: '끝이 -ie 인 동사입니다.',
        wrong: [
          { a: 'lieing', why: '끝이 -ie 인 동사는 ie를 y로 바꾸고 -ing를 붙입니다.' },
          { a: 'liing', why: 'i가 두 번 이어지지 않도록 ie를 y로 바꿉니다.' },
        ],
        explain: '끝이 -ie 이므로 ie를 y로 바꾸고 -ing를 붙여 **lying**입니다. tie → tying도 같습니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 3,
        q: '두 문장의 뜻 차이를 바르게 설명한 것을 고르세요.\n\n(가) I cooked dinner at seven.\n(나) I was cooking dinner at seven.',
        choices: [
          '(가)는 그때 한 일, (나)는 그때 하고 있던 일을 말한다.',
          '(가)는 지금 저녁을 하는 중이고, (나)는 지난 일이다.',
          '(가)와 (나)는 뜻이 완전히 같다.',
          '(가)는 앞으로 할 일이고, (나)는 지난 일이다.',
        ],
        answer: 0,
        why: [
          '',
          'cooked는 과거형이라 (가)도 지난 일입니다.',
          '(나)는 일곱 시에 "하던 중"이라는 진행의 뜻이 더해집니다.',
          'cooked는 과거형이라 앞으로의 일이 아닙니다.',
        ],
        explain: '과거 시제(가)는 그때 **한 일**을, 과거진행형(나)은 그때 **하고 있던 중**인 일을 말합니다. 그래서 (나)는 일곱 시에 이미 요리가 시작되어 한창이었다는 느낌입니다.',
      },
    ],

    deeper: [
      {
        title: '같은 동사도 뜻에 따라 진행형이 된다',
        body: '상태동사로 배운 동사도 **동작**의 뜻으로 쓰이면 진행형이 됩니다.\n\n| 상태 (진행형 ✗) | 동작 (진행형 ○) |\n|---|---|\n| I **have** a car. (차를 가지고 있다) | I **am having** lunch. (점심을 먹고 있다) |\n| This soup **tastes** good. (맛이 좋다) | The chef **is tasting** the soup. (맛을 보고 있다) |\n| I **think** he is right. (생각하기에 ~이다 — 의견) | I **am thinking** about my plans. (곰곰이 생각하는 중이다) |\n\n그래서 동사 목록을 통째로 외우기보다 "지금 이 순간 눈에 보이는 동작인가?"를 물어보는 것이 좋습니다. 눈에 보이는 동작이면 진행형이 됩니다.',
      },
      {
        title: '다음 단원과의 연결 — 현재완료',
        body: '이 단원까지 배운 시제를 정리하면 다음과 같습니다.\n\n| 때 | 한 일·늘 하는 일 | 하고 있는 일 |\n|---|---|---|\n| 과거 | I worked. | I was working. |\n| 현재 | I work. | I am working. |\n| 미래 | I will work. / I am going to work. | (이 과정에서는 다루지 않음) |\n\n다음 단원에서는 과거에 시작된 일이 지금까지 이어지거나 지금에 영향을 주는 것을 말하는 **현재완료**(have + 과거분사)를 배웁니다.\n\n- I **have lived** here for ten years. (저는 여기서 10년째 살고 있습니다.)',
      },
    ],

    faq: [
      {
        q: 'will이랑 be going to는 아무거나 써도 돼요?',
        a: '뜻이 겹치는 경우가 많아 어느 것을 써도 통하는 때가 많습니다. 특히 "내일은 추울 거예요" 같은 예측은 둘 다 자연스럽습니다.\n\n다만 그 자리에서 정한 약속·제안(I\'ll help you.)은 will, 미리 세워 둔 계획(I\'m going to study abroad next year.)은 be going to가 더 자연스럽습니다. 처음에는 이 두 가지만 구별해도 충분합니다.',
      },
      {
        q: '현재진행형인데 왜 미래 뜻이 돼요?',
        a: '이미 약속을 잡거나 표를 끊어 둔 일은 "벌써 준비가 진행 중"이라고 보기 때문입니다. 그래서 I\'m meeting Jia tomorrow.처럼 미래의 때와 함께 쓰면 "내일 지아를 만나기로 되어 있다"는 뜻이 됩니다.\n\n지금 일인지 미래 일정인지는 함께 쓴 때를 나타내는 말(now / tomorrow)로 구별합니다.',
      },
      {
        q: 'I like it.을 I am liking it.이라고 하면 틀린 거예요?',
        a: '기본 규칙으로는 like(좋아하다)가 상태동사라서 I like it.이 맞습니다.\n\n다만 실제 대화에서는 "지금 경험하는 중인데 점점 좋아진다"는 느낌을 살리려고 진행형을 쓰는 경우도 가끔 있습니다. 기초를 다질 때는 상태동사는 진행형으로 쓰지 않는다고 익혀 두는 것이 안전합니다.',
      },
    ],

    mistakes: [
      '진행형에서 be동사를 빼는 실수 — I cooking now. / She reading. (✗) → I am cooking now. / She is reading. (○)',
      '상태동사를 진행형으로 쓰는 실수 — I am knowing him. / He is wanting coffee. (✗) → I know him. / He wants coffee. (○)',
      'will 뒤에 -s나 to를 붙이는 실수 — She will goes. / I will to call you. (✗) → She will go. / I will call you. (○)',
    ],

    gens: [
      {
        id: 'ing-form',
        level: 1,
        title: '동사의 -ing 꼴 쓰기',
        make: function (R) {
          var v = R.pick(INGS);
          var wrong = [];
          if (v[3] && v[1].indexOf(v[3]) < 0) wrong.push({ a: v[3], why: '철자를 확인하세요. ' + ING_RULE[v[2]] });
          wrong.push({ a: v[0], why: '원형 그대로입니다. 진행형에는 -ing 꼴을 씁니다.' });
          return {
            type: 'short', check: 'text', concept: 1,
            q: '다음 동사의 -ing 꼴을 쓰세요.\n\n' + v[0],
            answer: v[1].slice(),
            hint: '동사의 끝 글자와 길이를 보세요.',
            wrong: wrong,
            explain: ING_RULE[v[2]] + '\n\n' + v[0] + ' → **' + v[1][0] + '**',
          };
        },
      },
      {
        id: 'now-or-habit',
        level: 2,
        title: '현재 시제와 현재진행형 고르기',
        make: function (R) {
          var t = R.pick(TENSE);
          var prog = t[1] + ' ' + t[4];
          var simple = t[3];
          var broken = t[1] + ' ' + t[2];
          var right = t[5] === 'now' ? prog : simple;
          var opts = R.shuffle([prog, simple, broken]);
          var reason = {};
          reason[prog] = prog + ' — 현재진행형입니다. ' + TENSE_WHY[t[5]];
          reason[simple] = simple + ' — 현재 시제입니다. ' + TENSE_WHY[t[5]];
          reason[broken] = 'be동사 뒤에 동사원형을 쓰지 않습니다. 진행형이면 -ing, 아니면 be동사 없이 씁니다.';
          return {
            type: 'choice', concept: 2,
            q: '빈칸에 알맞은 말을 고르세요.\n\n' + t[0],
            choices: opts,
            answer: opts.indexOf(right),
            hint: '늘 하는 일인지, 지금 한창 하는 일인지, 상태를 나타내는 동사인지 보세요.',
            why: opts.map(function (o) { return o === right ? '' : reason[o]; }),
            explain: TENSE_WHY[t[5]] + '\n\n바른 문장: ' + t[0].replace('___', right) + '\n(' + t[6] + ')',
          };
        },
      },
      {
        id: 'past-progressive',
        level: 2,
        title: '과거진행형 만들기',
        make: function (R) {
          var p = R.pick(PASTPROG);
          var other = p[1] === 'was' ? 'were' : 'was';
          var pres = p[1] === 'was' ? (/^I /.test(p[0]) ? 'am' : 'is') : 'are';
          var right = p[1] + ' ' + p[3];
          var cands = [
            [other + ' ' + p[3], other + ' — ' + (other === 'was' ? 'I나 한 사람·한 가지가 주어일 때' : 'you나 둘 이상이 주어일 때') + ' 씁니다. 주어를 다시 보세요.'],
            [pres + ' ' + p[3], pres + ' ' + p[3] + ' — 현재진행형입니다. 이 문장은 지난 어느 때의 일입니다.'],
            [p[1] + ' ' + p[2], p[1] + ' 뒤에는 동사원형이 아니라 -ing 꼴을 씁니다.'],
          ];
          var reason = {};
          cands.forEach(function (c) { reason[c[0]] = c[1]; });
          var pick = R.choices(right, cands.map(function (c) { return c[0]; }), 4);
          return {
            type: 'choice', concept: 3,
            q: '빈칸에 알맞은 말을 고르세요.\n\n' + p[0],
            choices: pick.choices,
            answer: pick.answer,
            hint: '지난 어느 때 하고 있던 일입니다. 주어에 맞는 was·were를 고르세요.',
            why: pick.choices.map(function (c) { return c === right ? '' : reason[c]; }),
            explain: '지난 어느 때 한창 하고 있던 일은 과거진행형(was·were + -ing)입니다. 주어에 맞는 be동사는 ' + p[1] + '입니다. 그래서 **' + right + '**입니다.\n\n' + p[0].replace('___', right) + '\n(' + p[4] + ')',
          };
        },
      },
      {
        id: 'future-form',
        level: 1,
        title: 'will과 be going to의 모양',
        make: function (R) {
          var f = R.pick(FUTURE);
          var subj = f[0], be = f[1];
          var right, cands;
          if (f[6] === 'will') {
            right = 'will ' + f[2];
            cands = [
              ['will ' + f[3], 'will 뒤에는 주어와 관계없이 동사원형을 씁니다. -s를 붙이지 않습니다.'],
              ['will ' + f[4], 'will 뒤에는 -ing 꼴이 아니라 동사원형을 씁니다.'],
              ['will to ' + f[2], 'will 뒤에 to를 쓰지 않습니다. 바로 동사원형이 옵니다.'],
            ];
          } else {
            right = be + ' going to ' + f[2];
            cands = [
              ['going to ' + f[2], 'be going to의 be동사(' + be + ')가 빠졌습니다.'],
              [BE_OTHER[be] + ' going to ' + f[2], 'be동사는 주어에 맞춥니다. 이 문장의 주어(' + subj + ')에 맞는 be동사는 ' + be + '입니다.'],
              [be + ' going to ' + f[4], 'going to 뒤에는 -ing 꼴이 아니라 동사원형을 씁니다.'],
            ];
          }
          var reason = {};
          cands.forEach(function (c) { reason[c[0]] = c[1]; });
          var pick = R.choices(right, cands.map(function (c) { return c[0]; }), 4);
          return {
            type: 'choice', concept: 4,
            q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + f[5] + '\n→ ' + subj + ' ___.',
            choices: pick.choices,
            answer: pick.answer,
            hint: f[6] === 'will' ? 'will 뒤에 오는 동사의 모양을 보세요.' : 'be going to의 be동사가 주어와 맞는지, 뒤에 오는 동사의 모양은 어떤지 보세요.',
            why: pick.choices.map(function (c) { return c === right ? '' : reason[c]; }),
            explain: (f[6] === 'will' ? 'will + 동사원형' : 'be동사(주어에 맞춤) + going to + 동사원형') + '입니다.\n\n바른 문장: **' + subj + ' ' + right + '.**',
          };
        },
      },
    ],

    vocab: [
      { w: 'now', m: '지금', ex: 'I am busy now. Please call me later.', exm: '저는 지금 바빠요. 나중에 전화 주세요.' },
      { w: 'at the moment', m: '지금, 바로 이 순간', ex: 'She is in a meeting at the moment.', exm: '그녀는 지금 회의 중입니다.' },
      { w: 'tomorrow', m: '내일', ex: 'I am meeting my friend tomorrow.', exm: '저는 내일 친구를 만나기로 했습니다.' },
      { w: 'next', m: '다음의', ex: 'We are going to visit Jeju next month.', exm: '우리는 다음 달에 제주에 갈 계획입니다.' },
      { w: 'plan', m: '계획; 계획하다', ex: 'What are your plans for the weekend?', exm: '주말 계획이 어떻게 되세요?' },
      { w: 'schedule', m: '일정, 일정표', ex: 'My schedule is full this week.', exm: '이번 주는 일정이 꽉 찼습니다.' },
      { w: 'appointment', m: '(병원·업무 등의) 약속, 예약', ex: 'I have a dental appointment on Monday.', exm: '월요일에 치과 예약이 있습니다.' },
      { w: 'prepare', m: '준비하다', ex: 'Jia is preparing for an exam.', exm: '지아는 시험을 준비하고 있습니다.' },
      { w: 'rest', m: '쉬다; 휴식', ex: 'He is resting at home today.', exm: '그는 오늘 집에서 쉬고 있습니다.' },
      { w: 'move', m: '이사하다; 움직이다', ex: 'They are going to move to Busan.', exm: '그들은 부산으로 이사할 계획입니다.' },
      { w: 'ring', m: '(전화·종이) 울리다', ex: 'The phone is ringing. I\'ll get it.', exm: '전화가 울리네요. 제가 받을게요.' },
      { w: 'cloud', m: '구름', ex: 'Look at those dark clouds.', exm: '저 먹구름 좀 보세요.' },
      { w: 'practice', m: '연습하다; 연습', ex: 'My son is practicing the piano now.', exm: '제 아들은 지금 피아노를 연습하고 있습니다.' },
      { w: 'soon', m: '곧', ex: 'The bus will come soon.', exm: '버스가 곧 올 것입니다.' },
    ],
  });
})();
