/* 다시 시작하는 영어 기초 문법 · 의문사로 묻고 답하기
 * 예문은 모두 직접 쓴 문장이다(가상의 인물). 영어 낱말 바로 뒤에는 받침에 따라 바뀌는 조사를 붙이지 않는다.
 * 과거·미래 시제는 다음 단원이라 의문문은 현재 시제(be동사, do·does)로 쓴다. */
(function () {
  // 의문사가 묻는 것
  var ASK = {
    Who: 'who — 사람(누구)을 묻습니다.',
    What: 'what — 사물이나 하는 일(무엇)을 묻습니다.',
    When: 'when — 때(언제)를 묻습니다.',
    Where: 'where — 장소(어디)를 묻습니다.',
    Why: 'why — 까닭(왜)을 묻습니다.',
    How: 'how — 방법이나 상태(어떻게, 어떤)를 묻습니다.',
  };
  var WH = ['Who', 'What', 'When', 'Where', 'Why', 'How'];

  // 의문사 고르기 생성기: [질문(빈칸), 대답, 정답 의문사, 대답이 알려 주는 것, 질문 뜻]
  var WHQ = [
    ['___ do you live?', 'I live in Incheon.', 'Where', '대답이 사는 곳(장소)을 알려 줍니다.', '어디에 사세요?'],
    ['___ is that woman?', 'She is my aunt.', 'Who', '대답이 그 사람이 누구인지 알려 줍니다.', '저 여자분은 누구예요?'],
    ['___ do you go to work?', 'By bus.', 'How', '대답이 출근하는 방법(버스로)을 알려 줍니다.', '어떻게 출근하세요?'],
    ['___ is your birthday?', 'It is on June 3.', 'When', '대답이 날짜(때)를 알려 줍니다.', '생일이 언제예요?'],
    ['___ are you tired?', 'Because I work late every day.', 'Why', '대답이 "왜냐하면"이라는 뜻의 Because로 까닭을 알려 줍니다.', '왜 피곤하세요?'],
    ['___ do you do on weekends?', 'I play tennis with my friends.', 'What', '대답이 하는 일(테니스)을 알려 줍니다.', '주말에 무엇을 하세요?'],
    ['___ is the bank?', 'It is next to the post office.', 'Where', '대답이 위치(우체국 옆)를 알려 줍니다.', '은행이 어디에 있어요?'],
    ['___ does the store open?', 'At nine in the morning.', 'When', '대답이 여는 때(아침 아홉 시)를 알려 줍니다.', '가게는 언제 문을 열어요?'],
    ['___ is your new job?', 'It is great. I like my coworkers.', 'How', '대답이 새 일이 어떤지(상태)를 알려 줍니다.', '새 일은 어떠세요?'],
    ['___ do you want for lunch?', 'Kimchi fried rice, please.', 'What', '대답이 원하는 음식(무엇)을 알려 줍니다.', '점심으로 무엇을 원하세요?'],
    ['___ do you study English?', 'Because I want to travel abroad.', 'Why', '대답이 "왜냐하면"이라는 뜻의 Because로 까닭을 알려 줍니다.', '왜 영어를 공부하세요?'],
    ['___ is your favorite singer?', 'Hana from the band Blue Sky.', 'Who', '대답이 사람 이름을 알려 줍니다.', '가장 좋아하는 가수가 누구예요?'],
    ['___ does your son go to school?', 'He walks.', 'How', '대답이 학교에 가는 방법(걸어서)을 알려 줍니다.', '아드님은 학교에 어떻게 가요?'],
    ['___ do you usually have dinner?', 'Around seven.', 'When', '대답이 시각(일곱 시쯤)을 알려 줍니다.', '보통 언제 저녁을 드세요?'],
    ['___ does Jia work?', 'At a hospital in Suwon.', 'Where', '대답이 일하는 곳(장소)을 알려 줍니다.', '지아는 어디에서 일해요?'],
    ['___ is in the box?', 'Some old books.', 'What', '대답이 상자 안의 물건(무엇)을 알려 줍니다.', '상자 안에 무엇이 있어요?'],
    ['___ is your mother?', 'She is fine, thank you.', 'How', '대답이 어머니가 어떻게 지내시는지(상태)를 알려 줍니다.', '어머님은 잘 지내세요?'],
    ['___ do you like this cafe?', 'Because it is quiet.', 'Why', '대답이 "왜냐하면"이라는 뜻의 Because로 까닭을 알려 줍니다.', '이 카페를 왜 좋아하세요?'],
    ['___ is the meeting?', 'It is on Friday afternoon.', 'When', '대답이 회의하는 때(금요일 오후)를 알려 줍니다.', '회의가 언제예요?'],
    ['___ is your teacher?', 'Ms. Park is.', 'Who', '대답이 사람(박 선생님)을 알려 줍니다.', '선생님이 누구세요?'],
    ['___ are my keys?', 'They are on the table.', 'Where', '대답이 위치(탁자 위)를 알려 줍니다.', '제 열쇠가 어디 있어요?'],
    ['___ does your sister do?', 'She is a nurse.', 'What', '대답이 하는 일(직업)을 알려 줍니다. What do you do?는 직업을 묻는 말입니다.', '언니(누나)는 무슨 일을 하세요?'],
  ];

  // how + 말 생성기: [질문(빈칸), 대답, 정답, 질문 뜻]
  var HOW_ITEMS = ['How many', 'How much', 'How often', 'How long'];
  var HOW_ASK = {
    'How many': 'How many — 셀 수 있는 것의 "개수"를 묻습니다(뒤에 복수 명사).',
    'How much': 'How much — 셀 수 없는 것의 "양"이나 "값"을 묻습니다.',
    'How often': 'How often — "얼마나 자주"(횟수·빈도)를 묻습니다.',
    'How long': 'How long — "얼마나 오래"(시간·기간)나 길이를 묻습니다.',
  };
  var HOWQ = [
    ['___ brothers do you have?', 'Two. They are both older than me.', 'How many', '형제가 몇 명이에요?'],
    ['___ is this shirt?', 'It is 25,000 won.', 'How much', '이 셔츠는 얼마예요?'],
    ['___ do you go swimming?', 'Twice a week.', 'How often', '수영은 얼마나 자주 가세요?'],
    ['___ does it take to get to the airport?', 'About an hour by train.', 'How long', '공항까지 얼마나 걸려요?'],
    ['___ water do you drink a day?', 'About two liters.', 'How much', '하루에 물을 얼마나 마셔요?'],
    ['___ is the movie?', 'About two hours.', 'How long', '그 영화는 얼마나 길어요(상영 시간이 얼마예요)?'],
    ['___ people work in your office?', 'About thirty.', 'How many', '사무실에서 몇 명이 일해요?'],
    ['___ do you visit your parents?', 'Once a month.', 'How often', '부모님 댁에 얼마나 자주 가세요?'],
    ['___ are the tickets?', 'They are 12,000 won each.', 'How much', '표는 얼마예요?'],
    ['___ cups of coffee do you drink a day?', 'Just one.', 'How many', '하루에 커피를 몇 잔 마셔요?'],
    ['___ does your daughter practice the piano?', 'Every day after school.', 'How often', '따님은 피아노를 얼마나 자주 연습해요?'],
    ['___ is the bridge?', 'It is about one kilometer long.', 'How long', '그 다리는 길이가 얼마나 돼요?'],
    ['___ time do we have?', 'Only ten minutes.', 'How much', '시간이 얼마나 있어요?'],
    ['___ rooms does the apartment have?', 'Three rooms and two bathrooms.', 'How many', '그 아파트는 방이 몇 개예요?'],
    ['___ does the bus come?', 'Every fifteen minutes.', 'How often', '버스가 얼마나 자주 와요?'],
    ['___ is the break?', 'Twenty minutes.', 'How long', '쉬는 시간은 얼마나 돼요?'],
    ['___ money do you need?', 'About 50,000 won.', 'How much', '돈이 얼마나 필요해요?'],
    ['___ languages do you speak?', 'Two, Korean and English.', 'How many', '몇 개 언어를 하세요?'],
    ['___ do you eat out?', 'Two or three times a month.', 'How often', '외식은 얼마나 자주 하세요?'],
    ['___ does the meeting usually take?', 'About thirty minutes.', 'How long', '회의는 보통 얼마나 걸려요?'],
  ];

  // 부가의문문 생성기: [앞 문장, 꼬리의 주어(대명사), 동사 갈래(be·do 꼴), 앞 문장이 부정인가, 틀린 주어 꼴, 뜻]
  var NEG = { is: 'isn\'t', are: 'aren\'t', does: 'doesn\'t', do: 'don\'t' };
  var SWAP = { is: 'does', are: 'do', does: 'is', do: 'are' };
  var TAGS = [
    ['You are busy today,', 'you', 'are', false, 'they', '오늘 바쁘시죠, 그렇죠?'],
    ['Minsu works at a bank,', 'he', 'does', false, 'Minsu', '민수는 은행에서 일하죠, 그렇죠?'],
    ['The bus is late again,', 'it', 'is', false, 'the bus', '버스가 또 늦네요, 그렇죠?'],
    ['Jia likes spicy food,', 'she', 'does', false, 'Jia', '지아는 매운 음식을 좋아하죠, 그렇죠?'],
    ['They live in Daegu,', 'they', 'do', false, 'them', '그들은 대구에 살죠, 그렇죠?'],
    ['Your parents are at home,', 'they', 'are', false, 'your parents', '부모님은 집에 계시죠, 그렇죠?'],
    ['It is cold outside,', 'it', 'is', false, 'he', '밖이 춥죠, 그렇죠?'],
    ['You drink coffee every morning,', 'you', 'do', false, 'they', '아침마다 커피를 드시죠, 그렇죠?'],
    ['Seojun is your cousin,', 'he', 'is', false, 'Seojun', '서준이는 당신 사촌이죠, 그렇죠?'],
    ['The store opens at ten,', 'it', 'does', false, 'the store', '그 가게는 열 시에 문을 열죠, 그렇죠?'],
    ['You are not hungry,', 'you', 'are', true, 'they', '배고프지 않으시죠, 그렇죠?'],
    ['Minsu does not eat meat,', 'he', 'does', true, 'Minsu', '민수는 고기를 먹지 않죠, 그렇죠?'],
    ['The museum is not open today,', 'it', 'is', true, 'the museum', '박물관은 오늘 문을 열지 않죠, 그렇죠?'],
    ['Your children do not like carrots,', 'they', 'do', true, 'your children', '아이들은 당근을 좋아하지 않죠, 그렇죠?'],
    ['She is not a doctor,', 'she', 'is', true, 'he', '그녀는 의사가 아니죠, 그렇죠?'],
    ['You do not work on Saturdays,', 'you', 'do', true, 'they', '토요일에는 일하지 않으시죠, 그렇죠?'],
    ['Jia does not drive,', 'she', 'does', true, 'Jia', '지아는 운전을 하지 않죠, 그렇죠?'],
    ['These shoes are not new,', 'they', 'are', true, 'it', '이 신발은 새것이 아니죠, 그렇죠?'],
    ['Your office is near here,', 'it', 'is', false, 'your office', '사무실이 이 근처죠, 그렇죠?'],
    ['Doyun plays the guitar,', 'he', 'does', false, 'Doyun', '도윤이는 기타를 치죠, 그렇죠?'],
  ];

  Tutor.registerUnit({
    id: 'eng-a-basic-06',
    course: 'eng-a-basic',
    title: '의문사로 묻고 답하기',
    summary: '누가·무엇을·언제·어디서·왜·어떻게를 묻는 의문문을 만들고 알맞게 답하는 법을 배웁니다.',
    goals: [
      'who, what, when, where, why, how로 시작하는 의문문을 바른 어순으로 만들 수 있다.',
      'how many, how much, how often, how long을 구별해 수·양·빈도·기간을 물을 수 있다.',
      '의문사가 주어인 의문문(Who lives here?)을 만들고, 의문사 의문문에 알맞은 정보로 답할 수 있다.',
      '부정의문문과 부가의문문에 사실에 맞게 Yes·No로 답할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '여섯 의문사가 묻는 것',
        body: '**의문사**는 "누가, 무엇을, 언제, 어디서, 왜, 어떻게"처럼 모르는 정보를 묻는 말입니다. 의문문의 맨 앞에 둡니다.\n\n| 의문사 | 묻는 것 | 예 |\n|---|---|---|\n| who | 사람 (누구) | **Who** is that man? |\n| what | 사물·하는 일 (무엇) | **What** do you want? |\n| when | 때 (언제) | **When** is your birthday? |\n| where | 장소 (어디) | **Where** do you live? |\n| why | 까닭 (왜) | **Why** are you late? |\n| how | 방법·상태 (어떻게, 어떤) | **How** do you go to work? / **How** is the weather? |\n\nwhat은 뒤에 명사를 붙여 더 자세히 물을 수 있습니다.\n\n- **What time** is it? (몇 시예요?)\n- **What kind of** music do you like? (어떤 종류의 음악을 좋아하세요?)\n\n> 💡 Yes/No 의문문(Are you busy?)은 "예·아니요"를 묻고, 의문사 의문문은 **정보**를 묻습니다. 그래서 의문사 의문문에는 Yes나 No로 답하지 않습니다.',
        easy: '의문사는 "빈칸 채우기 질문"이라고 생각하면 쉽습니다.\n\n"민수는 ___에 산다"의 빈칸이 궁금하면 장소를 묻는 where, "민수는 ___에 출근한다"의 빈칸이 궁금하면 때를 묻는 when을 씁니다.\n\n궁금한 빈칸이 사람이면 who, 물건·일이면 what, 까닭이면 why, 방법이면 how입니다.',
        check: {
          type: 'choice',
          q: '대답을 보고 빈칸에 알맞은 의문사를 고르세요.\n\nA: ___ is the post office?\nB: It is next to the bank.',
          choices: ['When', 'Where', 'Who'],
          answer: 1,
          why: ['when — 때를 묻습니다. 대답은 "은행 옆"이라는 위치입니다.', '', 'who — 사람을 묻습니다. 대답은 사람이 아니라 위치입니다.'],
          explain: '대답이 위치(은행 옆)를 알려 주므로 장소를 묻는 **Where**입니다. "우체국이 어디에 있어요?"',
        },
      },
      {
        title: '의문사 의문문의 어순',
        body: '의문사 의문문은 2단원에서 배운 Yes/No 의문문 **앞에 의문사를 붙이면** 됩니다.\n\n**be동사 문장**: 의문사 + be동사 + 주어 ~?\n\n| Yes/No 의문문 | 의문사 의문문 |\n|---|---|\n| Is the station near here? | **Where is** the station? |\n| Are you tired? | **Why are** you tired? |\n\n**일반동사 문장**: 의문사 + do·does + 주어 + 동사원형 ~?\n\n| Yes/No 의문문 | 의문사 의문문 |\n|---|---|\n| Do you live in Seoul? | **Where do** you **live**? |\n| Does she start work at nine? | **When does** she **start** work? |\n\n- 주어가 he, she, it이나 사람 한 명(Jia, my boss)이면 does, 그 밖에는 do를 씁니다.\n- does를 쓰면 동사는 **원형**입니다. -s를 붙이지 않습니다.\n\n> ⚠️ Where does he lives? (✗) → Where does he **live**? (○)\n\n> ⚠️ 의문사 뒤에 평서문 어순을 그대로 두지 않습니다. Why you are tired? (✗) → Why **are you** tired? (○)',
        easy: '의문사 의문문은 "예·아니요 질문"에 의문사 모자를 씌운 모양입니다.\n\n1. 먼저 Yes/No 질문을 만듭니다: Do you work on Saturdays?\n2. 맨 앞에 궁금한 의문사를 씌웁니다: **When** do you work?\n\n모자만 씌울 뿐 뒤쪽의 순서(do + 주어 + 동사원형)는 그대로입니다.',
        check: {
          type: 'choice',
          q: '바른 의문문을 고르세요.',
          choices: ['What does your brother do?', 'What does your brother does?', 'What your brother does?'],
          answer: 0,
          why: ['', 'does를 썼으면 뒤의 동사는 원형(do)입니다. does를 두 번 쓰지 않습니다.', '일반동사 의문문에는 의문사 뒤에 does + 주어가 와야 합니다. 평서문 어순 그대로입니다.'],
          explain: '"의문사 + does + 주어 + 동사원형" 순서이므로 **What does your brother do?**(형은 무슨 일을 하세요?)가 바릅니다.',
        },
      },
      {
        title: 'how many, how much, how often, how long',
        body: 'how 뒤에 형용사나 부사를 붙이면 "얼마나 ~?"라고 정도를 물을 수 있습니다.\n\n| 표현 | 묻는 것 | 예와 대답 |\n|---|---|---|\n| how many + 복수 명사 | 개수 (몇 개, 몇 명) | **How many** brothers do you have? — Two. |\n| how much | 양 (셀 수 없는 것), 값 | **How much** water do you drink? — About two liters. / **How much** is it? — 5,000 won. |\n| how often | 빈도 (얼마나 자주) | **How often** do you exercise? — Three times a week. |\n| how long | 기간·걸리는 시간, 길이 | **How long** does it take? — About an hour. |\n\n그 밖에도 how old(몇 살), how far(얼마나 먼)처럼 쓸 수 있습니다.\n\n> 💡 how often의 대답에는 once(한 번), twice(두 번), three times(세 번) + a day·a week·a month가 자주 나옵니다. 빈도부사(always, usually, sometimes)로 답해도 됩니다.\n\n> 💡 "가는 데 얼마나 걸려요?"는 **How long does it take** to get there?라고 묻습니다.',
        easy: 'how는 "얼마나"이고, 뒤에 붙는 말이 무엇을 재는지 알려 줍니다.\n\n- many → 개수를 셉니다 (사람, 사과, 방)\n- much → 양이나 돈을 잽니다 (물, 시간, 값)\n- often → 달력에 표시한 횟수를 셉니다 (일주일에 두 번)\n- long → 시계나 자로 잽니다 (한 시간, 1 km)',
        check: {
          type: 'choice',
          q: '대답을 보고 빈칸에 알맞은 말을 고르세요.\n\nA: ___ do you visit your grandparents?\nB: Once a month.',
          choices: ['How many', 'How often', 'How long'],
          answer: 1,
          why: ['how many — 개수를 묻고 뒤에 복수 명사가 옵니다. 대답은 횟수(한 달에 한 번)입니다.', '', 'how long — 기간이나 걸리는 시간을 묻습니다. 대답은 얼마나 오래가 아니라 얼마나 자주입니다.'],
          explain: '대답(Once a month — 한 달에 한 번)은 빈도이므로 **How often**입니다. "조부모님 댁에 얼마나 자주 가세요?"',
        },
      },
      {
        title: '의문사가 주어인 의문문 — Who lives here?',
        body: '"**누가** ~하나요?", "**무엇이** ~하나요?"처럼 의문사가 **주어**일 때는 do·does를 쓰지 않고, 평서문 어순 그대로 주어 자리에 의문사를 넣습니다.\n\n| 평서문 | 의문사가 주어인 의문문 |\n|---|---|\n| Minsu lives here. | **Who lives** here? (누가 여기 살아요?) |\n| Jia knows the answer. | **Who knows** the answer? (누가 답을 알아요?) |\n| Music makes me happy. | **What makes** you happy? (무엇이 당신을 행복하게 하나요?) |\n\n- 의문사 주어는 한 사람·한 가지로 보아 현재 시제에서는 동사에 **-s**를 붙입니다: Who **lives**, Who **wants**\n- **Who called you?**(누가 전화했어요?)도 같은 모양입니다. called는 call의 과거형으로, 다음 단원에서 배웁니다.\n\n의문사가 **목적어**일 때와 비교해 보세요.\n\n| 의문사가 주어 (누가?) | 의문사가 목적어 (누구를?) |\n|---|---|\n| **Who likes** Jia? — Minsu likes Jia. | **Who does** Jia **like**? — Jia likes Minsu. |\n\n> 💡 의문사 주어 질문에는 짧게 "주어 + do·does"로 답하기도 합니다. Who cooks dinner? — **My father does.**',
        easy: '"누가 이 집에 살아요?"에서 모르는 것은 "사는 사람", 곧 주어입니다.\n\n평서문 Minsu lives here.에서 모르는 주어 Minsu 자리에 who를 그대로 끼워 넣으면 질문이 됩니다: **Who** lives here?\n\n순서를 바꾸지도, do·does를 넣지도 않습니다. 주어 칸에 who를 넣고 끝에 물음표만 붙이면 됩니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nWho ___ the answer?',
          choices: ['knows', 'does know', 'know'],
          answer: 0,
          why: ['', '의문사가 주어일 때는 do·does를 쓰지 않습니다.', '의문사 주어는 한 사람으로 보아 현재 시제 동사에 -s를 붙입니다.'],
          explain: '"누가 답을 아나요?"에서 who는 주어입니다. 평서문처럼 동사가 바로 오고 -s를 붙여 **Who knows the answer?**입니다.',
        },
      },
      {
        title: '의문사 의문문에 알맞게 답하기',
        body: '의문사 의문문은 **정보**를 묻습니다. 그래서 Yes·No로 시작하지 않고, 의문사가 묻는 정보를 알려 줍니다.\n\n| 질문 | 알맞은 대답 | 어울리지 않는 대답 |\n|---|---|---|\n| Where do you work? | At a bank. / I work at a bank. | Yes, I do. |\n| When does the class start? | At seven. / On Monday. | In Seoul. |\n| Why are you late? | Because the traffic is bad. | By bus. |\n| How do you go to work? | By subway. / I walk. | Every day. |\n| How long does it take? | About thirty minutes. | Twice a week. |\n\n- 짧게 정보만 말해도(At a bank.) 되고, 문장 전체로 말해도(I work at a bank.) 됩니다.\n- why 질문에는 보통 **Because ~**(왜냐하면 ~)로 답합니다.\n- 때를 말할 때는 at + 시각, on + 요일·날짜, in + 달·해를 씁니다(1단원).\n\n> 💡 대답할 때는 질문의 주어를 알맞게 바꿉니다. Where do **you** live? — **I** live in Daejeon.',
        easy: '의문사 질문은 "빈칸에 무엇이 들어가나요?"라는 질문이니, 그 빈칸만 채워 주면 됩니다.\n\nwhere라면 장소, when이라면 때, why라면 까닭을 말합니다. 질문이 장소를 묻는데 때를 말하면 동문서답이 됩니다.\n\n그리고 "예·아니요"는 빈칸을 채우지 못하니 의문사 질문에는 쓰지 않습니다.',
        check: {
          type: 'ox',
          q: '"Where do you live?"에는 "Yes, I do."라고 답할 수 있습니다.',
          answer: false,
          explain: 'where는 장소를 묻는 의문사입니다. 의문사 의문문에는 Yes·No가 아니라 정보로 답합니다. 예: **I live in Daejeon.**',
        },
      },
      {
        title: '부정의문문과 부가의문문에 Yes·No로 답하기',
        body: '**부정의문문**은 not을 넣어 묻는 의문문입니다. "~하지 않아요?"라는 뜻입니다.\n\n- **Don\'t you** like coffee? (커피 안 좋아하세요?)\n- **Isn\'t** she your sister? (그녀가 당신 언니 아니에요?)\n\n**부가의문문**은 평서문 끝에 짧은 꼬리 질문을 붙여 "그렇죠?" 하고 확인하는 말입니다.\n\n| 만드는 법 | 예 |\n|---|---|\n| 앞이 긍정이면 꼬리는 부정(줄임말), 앞이 부정이면 꼬리는 긍정 | You are busy, **aren\'t you**? / You aren\'t busy, **are you**? |\n| be동사 문장이면 be동사, 일반동사 문장이면 do·does | Jia likes tea, **doesn\'t she**? |\n| 꼬리의 주어는 앞 주어를 대명사로 | **The bus** is late, isn\'t **it**? |\n\n**답하는 법 — 질문 모양이 아니라 사실만 봅니다.** 사실이 긍정이면 Yes, 부정이면 No입니다.\n\n| 질문 | 커피를 좋아하면 | 커피를 좋아하지 않으면 |\n|---|---|---|\n| Do you like coffee? | Yes, I do. | No, I don\'t. |\n| Don\'t you like coffee? | **Yes, I do.** | **No, I don\'t.** |\n| You like coffee, don\'t you? | Yes, I do. | No, I don\'t. |\n\n> ⚠️ 우리말은 "안 좋아하세요?"에 "네, 안 좋아해요"라고 답하지만, 영어는 **No, I don\'t.**입니다. Yes 뒤에는 늘 긍정, No 뒤에는 늘 부정이 옵니다.',
        easy: '영어의 Yes·No는 "질문에 맞장구치기"가 아니라 "사실 말하기"입니다.\n\n질문이 어떻게 생겼든, 내가 커피를 **좋아하면** Yes, I do. **안 좋아하면** No, I don\'t.\n\n우리말 "네·아니요"를 먼저 떠올리지 말고, 내 대답 문장(I do / I don\'t)을 먼저 정한 뒤 그 앞에 짝이 맞는 Yes나 No를 붙이면 틀리지 않습니다.',
        check: {
          type: 'choice',
          q: 'A의 질문에 "아니요, 저는 매운 음식을 좋아해요"라는 뜻으로 답하려고 합니다. 알맞은 대답을 고르세요.\n\nA: Don\'t you like spicy food?',
          choices: ['Yes, I do.', 'No, I do.', 'No, I don\'t.'],
          answer: 0,
          why: ['', 'No 뒤에는 부정(I don\'t)이 와야 합니다. No와 I do를 함께 쓰지 않습니다.', '"매운 음식을 좋아하지 않는다"는 뜻이 되어 반대입니다.'],
          explain: '사실이 "좋아한다"(긍정)이므로 **Yes, I do.**입니다. 우리말로는 "아니요, 좋아해요"이지만 영어는 사실만 보고 Yes를 씁니다.',
        },
      },
    ],

    examples: [
      {
        q: '밑줄 친 부분을 묻는 의문문을 만들어 보세요.\n\nJia works __at a hospital__.',
        steps: [
          '밑줄 친 부분 at a hospital은 장소이므로 의문사는 where입니다.',
          'works는 일반동사이고 주어 Jia는 한 사람이므로 Yes/No 의문문은 Does Jia work at a hospital?입니다. does를 쓰면 동사는 원형 work입니다.',
          '묻는 부분(at a hospital)을 빼고 맨 앞에 where를 붙입니다.',
        ],
        answer: 'Where does Jia work? (지아는 어디에서 일해요?)',
      },
      {
        q: '부가의문문을 붙여 "그렇죠?" 하고 확인하는 문장을 만들어 보세요.\n\nYour brother lives in Busan.',
        steps: [
          '앞 문장이 긍정이므로 꼬리는 부정입니다.',
          'lives는 일반동사이고 주어가 한 사람이므로 do·does 가운데 does, 부정이니 doesn\'t를 씁니다.',
          '꼬리의 주어는 앞의 주어 your brother를 대명사로 바꾼 he입니다.',
        ],
        answer: 'Your brother lives in Busan, doesn\'t he? (형은 부산에 살죠, 그렇죠?)',
      },
    ],

    terms: [
      { term: '의문사', def: '모르는 정보를 묻는 말입니다. who(누구), what(무엇), when(언제), where(어디), why(왜), how(어떻게)가 있고 의문문 맨 앞에 씁니다.' },
      { term: '의문사 의문문', def: '의문사로 시작해 정보를 묻는 의문문입니다. Yes·No가 아니라 그 정보로 답합니다. 예: Where do you live? — In Seoul.' },
      { term: 'Yes/No 의문문', def: '"예·아니요"로 답하는 의문문입니다. be동사나 do·does로 시작합니다. 예: Are you busy? / Do you like tea?' },
      { term: '동사원형', def: '-s, -ed 같은 꼬리가 붙지 않은 동사의 원래 꼴입니다. do·does 의문문의 동사는 원형입니다. 예: Where does he live?' },
      { term: '부정의문문', def: 'not을 넣어 "~하지 않아요?" 하고 묻는 의문문입니다. 예: Don\'t you like coffee? 사실이 긍정이면 Yes, 부정이면 No로 답합니다.' },
      { term: '부가의문문', def: '평서문 끝에 붙여 "그렇죠?" 하고 확인하는 짧은 꼬리 질문입니다. 앞이 긍정이면 부정 꼬리, 앞이 부정이면 긍정 꼬리를 씁니다. 예: You are busy, aren\'t you?' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '대답을 보고 빈칸에 알맞은 의문사를 고르세요.\n\nA: ___ is that man?\nB: He is Mr. Kim, my new manager.',
        choices: ['Who', 'What', 'Where', 'Why'],
        answer: 0,
        why: [
          '',
          'what — 사물이나 하는 일을 묻습니다. 대답은 그 사람이 누구인지(이름과 새 팀장이라는 관계)입니다.',
          'where — 장소를 묻습니다. 대답에 장소가 없습니다.',
          'why — 까닭을 묻습니다. 대답에 Because 같은 까닭이 없습니다.',
        ],
        explain: '대답이 그 사람이 누구인지 알려 주므로 사람을 묻는 **Who**입니다. "저 남자분은 누구예요? — 김 팀장님이에요. 새로 오신 저희 팀장님이에요."',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 0,
        q: '대답을 보고 빈칸에 알맞은 의문사를 고르세요.\n\nA: ___ are you late?\nB: Because the traffic is terrible.',
        choices: ['How', 'When', 'Why', 'Who'],
        answer: 2,
        why: [
          'how — 방법이나 상태를 묻습니다. 대답은 Because로 시작하는 까닭입니다.',
          'when — 때를 묻습니다. 대답은 때가 아니라 까닭입니다.',
          '',
          'who — 사람을 묻습니다. 대답에 사람이 없습니다.',
        ],
        explain: '"왜냐하면"이라는 뜻의 Because로 까닭을 말하고 있으니 **Why**입니다. "왜 늦었어요? — 차가 너무 막혀서요."',
      },
      {
        id: 'p3', level: 1, type: 'order', concept: 1,
        q: '우리말에 맞게 배열하세요.\n\n당신은 어디에서 일하세요?',
        choices: ['Where', 'do', 'you', 'work'],
        answer: [0, 1, 2, 3],
        explain: '일반동사 의문문은 "의문사 + do + 주어 + 동사원형" 순서입니다: **Where do you work?**',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 말을 고르세요.\n\nWhere does your sister ___?',
        choices: ['live', 'lives', 'living'],
        answer: 0,
        why: [
          '',
          'does를 썼으면 동사는 원형입니다. -s는 does가 이미 맡고 있습니다.',
          'living은 -ing 꼴입니다. does 뒤에는 동사원형을 씁니다.',
        ],
        explain: '"의문사 + does + 주어 + 동사원형"이므로 **Where does your sister live?**(언니는 어디에 살아요?)입니다.',
      },
      {
        id: 'p5', level: 1, type: 'ox', concept: 1,
        q: '다음 의문문은 바른 문장입니다.\n\nWhy you are so happy today?',
        answer: false,
        explain: 'be동사 의문문은 "의문사 + be동사 + 주어" 순서입니다. **Why are you so happy today?**(오늘 왜 그렇게 기분이 좋아요?)로 고칩니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 말을 고르세요.\n\nHow ___ chairs do we need for the meeting?',
        choices: ['many', 'much', 'often', 'long'],
        answer: 0,
        why: [
          '',
          'much — 셀 수 없는 것의 양이나 값을 묻습니다. chairs(의자들) — 셀 수 있는 명사의 복수형입니다.',
          'often — "얼마나 자주"를 묻고, 뒤에 명사가 오지 않습니다.',
          'long — 기간이나 길이를 묻고, 뒤에 명사가 오지 않습니다.',
        ],
        explain: 'chairs는 셀 수 있는 명사의 복수형이므로 개수를 묻는 **How many**입니다. "회의에 의자가 몇 개 필요해요?"',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'text', concept: 2,
        q: '대답을 보고 빈칸에 알맞은 낱말 하나를 쓰세요.\n\nA: How ___ do you exercise?\nB: Three times a week.',
        answer: ['often'],
        wrong: [
          { a: 'many', why: 'how many는 뒤에 복수 명사를 붙여 개수를 묻습니다. "일주일에 세 번"은 빈도입니다.' },
          { a: 'long', why: 'how long은 얼마나 오래(기간)를 묻습니다. "일주일에 세 번"은 얼마나 자주입니다.' },
          { a: 'much', why: 'how much는 양이나 값을 묻습니다. "일주일에 세 번"은 빈도입니다.' },
        ],
        explain: '대답(Three times a week — 일주일에 세 번)은 빈도이므로 **How often**입니다. "운동을 얼마나 자주 하세요?"',
      },
      {
        id: 'p8', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 말을 고르세요.\n\nWho ___ next door?',
        choices: ['lives', 'live', 'does live'],
        answer: 0,
        why: [
          '',
          '의문사 주어는 한 사람으로 보아 현재 시제 동사에 -s를 붙입니다.',
          '의문사가 주어일 때는 do·does를 넣지 않습니다.',
        ],
        explain: '"누가 옆집에 살아요?"에서 who는 주어입니다. 평서문처럼 동사가 바로 오고 -s를 붙여 **Who lives next door?**입니다.',
      },
      {
        id: 'p9', level: 1, type: 'choice', concept: 4,
        q: '질문에 알맞은 대답을 고르세요.\n\nWhy do you study English?',
        choices: ['Because I want to travel abroad.', 'Yes, I do.', 'At night after work.', 'With my coworkers.'],
        answer: 0,
        why: [
          '',
          'why 의문문은 까닭을 묻습니다. 의문사 의문문에는 Yes·No로 답하지 않습니다.',
          '때를 말했습니다. when 질문에 어울리는 대답입니다.',
          '누구와 함께인지 말했습니다. 질문은 까닭을 묻습니다.',
        ],
        explain: 'why는 까닭을 묻는 의문사라서 Because로 까닭을 말한 **Because I want to travel abroad.**(해외여행을 하고 싶어서요.)가 알맞습니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 5,
        q: 'A의 질문에 "네, 저는 오늘 일하지 않아요"라는 뜻으로 답하려고 합니다. 알맞은 대답을 고르세요.\n\nA: Don\'t you work today?',
        choices: ['No, I don\'t.', 'Yes, I don\'t.', 'Yes, I do.', 'No, I do.'],
        answer: 0,
        hint: '우리말 "네·아니요"를 잊고, 사실(일하지 않는다)이 긍정인지 부정인지만 보세요.',
        why: [
          '',
          'Yes 뒤에는 늘 긍정(I do)이 옵니다. Yes와 I don\'t를 함께 쓰지 않습니다.',
          '"오늘 일한다"는 뜻이 되어 반대입니다.',
          'No 뒤에는 늘 부정(I don\'t)이 옵니다.',
        ],
        explain: '사실이 "일하지 않는다"(부정)이므로 **No, I don\'t.**입니다. 우리말로는 "네, 안 해요"이지만 영어는 사실이 부정이면 No를 씁니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'text', concept: 5,
        q: '빈칸에 알맞은 부가의문문을 쓰세요. (두 낱말, 줄임말로)\n\nMinsu works at a bank, ___?',
        answer: ['doesn\'t he'],
        hint: '앞 문장이 긍정이고, works는 일반동사입니다.',
        wrong: [
          { a: 'isn\'t he', why: 'works는 일반동사입니다. 일반동사 문장의 꼬리는 do·does로 만듭니다.' },
          { a: 'does he', why: '앞 문장이 긍정이므로 꼬리는 부정(doesn\'t)입니다.' },
          { a: 'doesn\'t Minsu', why: '꼬리의 주어는 앞 주어를 대명사로 바꿉니다. Minsu → he' },
          { a: 'don\'t he', why: '주어 he는 한 사람이므로 don\'t가 아니라 doesn\'t입니다.' },
        ],
        explain: '앞이 긍정이니 꼬리는 부정, 일반동사(works)이고 주어가 한 사람이니 doesn\'t, 주어 Minsu는 he로 바꿔 **doesn\'t he**입니다. "민수는 은행에서 일하죠, 그렇죠?"',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 3,
        q: '대답을 보고 알맞은 질문을 고르세요.\n\nA: ___\nB: My husband does. I wash the dishes.',
        choices: ['Who cooks dinner in your family?', 'Who do you cook dinner for?', 'What does your husband cook?', 'Does your husband cook?'],
        answer: 0,
        hint: 'My husband does.는 "남편이 (그 일을) 해요"라는 뜻입니다.',
        why: [
          '',
          '"누구를 위해 요리하나요?"라는 질문입니다. 대답은 요리하는 사람을 알려 줍니다.',
          '"남편은 무엇을 요리하나요?"라는 질문입니다. 대답에 음식 이름이 있어야 합니다.',
          'Yes/No 의문문입니다. 그 질문에는 Yes, he does.처럼 답합니다.',
        ],
        explain: '"남편이 해요"라는 대답은 요리하는 **사람**을 알려 줍니다. 그래서 의문사가 주어인 **Who cooks dinner in your family?**(댁에서는 누가 저녁을 해요?)가 알맞습니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 1,
        q: '**옳지 않은** 문장을 고르세요.',
        choices: ['Where does your brother work?', 'Who knows her phone number?', 'How often do you visit your parents?', 'What time does the movie starts?'],
        answer: 3,
        why: [
          '"의문사 + does + 주어 + 동사원형"을 바르게 지켰습니다.',
          '의문사 who가 주어라서 do·does 없이 knows를 바르게 썼습니다.',
          '"How often + do + 주어 + 동사원형"을 바르게 지켰습니다.',
          '',
        ],
        explain: 'does를 썼으면 동사는 원형입니다. **What time does the movie start?**(영화는 몇 시에 시작해요?)로 고칩니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'text', concept: 2,
        q: '밑줄 친 부분을 묻는 의문문이 되도록 빈칸에 알맞은 두 낱말을 쓰세요.\n\nShe goes to the gym __three times a week__.\n→ ___ does she go to the gym?',
        answer: ['How often'],
        hint: '밑줄 친 부분은 횟수(빈도)입니다.',
        wrong: [
          { a: 'How many', why: 'how many는 뒤에 복수 명사를 붙여 개수를 묻습니다. "일주일에 세 번"은 빈도입니다.' },
          { a: 'How long', why: 'how long은 기간을 묻습니다. "일주일에 세 번"은 얼마나 자주입니다.' },
          { a: 'When', why: 'when은 때(언제)를 묻습니다. 대답이 "월요일에"처럼 때를 말할 때 씁니다.' },
        ],
        explain: '"일주일에 세 번"은 빈도이므로 **How often** does she go to the gym?(그녀는 체육관에 얼마나 자주 가요?)입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 5,
        q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: You don\'t eat meat, do you?\nB: ___ I only eat vegetables and fish.',
        choices: ['No, I don\'t.', 'Yes, I do.', 'Yes, I don\'t.', 'No, I do.'],
        answer: 0,
        hint: 'B의 뒷말을 보면 B가 고기를 먹는지 알 수 있습니다.',
        why: [
          '',
          'B는 채소와 생선만 먹는다고 했습니다. Yes, I do.는 "고기를 먹는다"는 뜻이 되어 뒷말과 맞지 않습니다.',
          'Yes 뒤에는 늘 긍정이 옵니다. Yes와 I don\'t를 함께 쓰지 않습니다.',
          'No 뒤에는 늘 부정이 옵니다. No와 I do를 함께 쓰지 않습니다.',
        ],
        explain: 'B는 고기를 먹지 않습니다(사실이 부정). 그래서 **No, I don\'t.**입니다. 우리말로 옮기면 "네, 안 먹어요. 저는 채소와 생선만 먹어요."',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 4,
        q: '글을 읽고 질문에 알맞은 대답을 고르세요.\n\nSeojun works at a library in Suwon. He gets up at six every morning. He takes the subway to work, and it takes about forty minutes. He loves his job because he likes books.\n\nQ: How does Seojun go to work?',
        choices: ['By subway.', 'At six.', 'About forty minutes.', 'Because he likes books.'],
        answer: 0,
        why: [
          '',
          '일어나는 때입니다. When does he get up?에 어울리는 대답입니다.',
          '걸리는 시간입니다. How long does it take?에 어울리는 대답입니다.',
          '까닭입니다. Why does he love his job?에 어울리는 대답입니다.',
        ],
        explain: 'how는 방법을 묻습니다. 서준이는 지하철을 타고 출근하므로 **By subway.**입니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 3,
        q: '두 질문의 뜻을 바르게 짝지은 것을 고르세요.\n\n(가) Who helps Jia?\n(나) Who does Jia help?',
        choices: ['(가) 누가 지아를 도와요? / (나) 지아는 누구를 도와요?', '(가) 지아는 누구를 도와요? / (나) 누가 지아를 도와요?', '(가)와 (나) 모두 누가 지아를 도와요?', '(가)와 (나) 모두 지아는 누구를 도와요?'],
        answer: 0,
        hint: 'do·does가 있는지 없는지 보세요.',
        why: [
          '',
          '반대로 풀었습니다. do·does 없이 바로 동사가 오면 의문사가 주어(누가)입니다.',
          '(나)에는 does가 있고 주어 Jia가 따로 있습니다. who는 목적어(누구를)입니다.',
          '(가)에는 do·does가 없습니다. who가 주어(누가)입니다.',
        ],
        explain: '(가)는 do·does 없이 who 뒤에 바로 동사가 와서 who가 주어입니다: "**누가** 지아를 도와요?" (나)는 does + 주어 Jia가 있어 who가 목적어입니다: "지아는 **누구를** 도와요?"',
      },
    ],

    deeper: [
      {
        title: '질문을 문장 속에 넣으면 — 간접의문문 맛보기',
        body: '"그가 어디 사는지 아세요?"처럼 의문문을 다른 문장 속에 넣을 수도 있습니다. 이것을 **간접의문문**이라고 합니다.\n\n- Where does he live? (그는 어디에 살아요?)\n- Do you know **where he lives**? (그가 어디에 사는지 아세요?)\n\n문장 속에 들어가면 질문 어순이 아니라 **평서문 어순**(주어 + 동사)으로 돌아갑니다. 그래서 does가 사라지고 lives에 다시 -s가 붙습니다.\n\n길을 물을 때 쓰는 Do you know where the station is?(역이 어디인지 아세요?)도 같은 원리입니다. Where is the station?보다 부드럽게 들립니다.',
      },
      {
        title: '부가의문문의 억양',
        body: '부가의문문은 끝을 어떻게 읽느냐에 따라 느낌이 달라집니다.\n\n| 억양 | 느낌 | 예 |\n|---|---|---|\n| 끝을 내림 ↘ | 거의 확실한 것을 "그렇죠?" 하고 맞장구를 청함 | It is a nice day, isn\'t it? ↘ |\n| 끝을 올림 ↗ | 잘 몰라서 정말 묻는 것 | You are from Busan, aren\'t you? ↗ |\n\n문자로 쓸 때는 둘 다 물음표를 붙이지만, 말할 때는 억양으로 뜻이 갈립니다. 답할 때는 어느 쪽이든 사실에 맞게 Yes·No로 답합니다.',
      },
    ],

    faq: [
      {
        q: 'Who lives here?에는 왜 does가 없어요?',
        a: 'who가 문장의 주어이기 때문입니다. 주어를 묻는 질문은 평서문 Minsu lives here.의 주어 자리에 who를 넣기만 하면 됩니다. do·does는 주어 앞으로 나와 질문을 만드는 말인데, 주어 자체가 의문사이니 앞으로 나올 자리가 없습니다.\n\n반대로 "누구를"을 묻는 Who do you like?에서는 who가 목적어라서 do가 필요합니다.',
      },
      {
        q: 'Don\'t you ~? 질문에 Yes라고 하면 무슨 뜻이에요?',
        a: 'Yes는 늘 "긍정 사실"을 말합니다. Don\'t you like cats?에 Yes, I do.라고 하면 "(아니요,) 좋아해요"라는 뜻입니다.\n\n우리말 "네"는 상대 말에 동의한다는 뜻이라 헷갈리기 쉽습니다. 대답 문장(I do / I don\'t)을 먼저 정하고 짝이 맞는 Yes·No를 앞에 붙이면 됩니다.',
      },
      {
        q: 'What time이랑 When은 뭐가 달라요?',
        a: 'what time은 "몇 시"처럼 정확한 시각을 묻고, when은 "언제"라서 시각·요일·날짜·계절 등 때를 넓게 묻습니다.\n\nWhat time does the class start? — At seven. / When does the class start? — At seven. 또는 Next Monday. 처럼 when의 대답 범위가 더 넓습니다.',
      },
    ],

    mistakes: [
      '의문사 뒤에 평서문 어순을 그대로 두는 실수 — Where you live? / Why you are tired? (✗) → Where do you live? / Why are you tired? (○)',
      'does 뒤의 동사에 -s를 또 붙이는 실수 — Where does she lives? (✗) → Where does she live? (○)',
      '부정의문문에 우리말처럼 답하는 실수 — "Don\'t you like coffee?"에 좋아하지 않는데 Yes라고 답함 (✗) → 좋아하지 않으면 No, I don\'t. (○)',
    ],

    gens: [
      {
        id: 'wh-word',
        level: 1,
        title: '대답에 맞는 의문사 고르기',
        make: function (R) {
          var it = R.pick(WHQ);
          var others = WH.filter(function (w) { return w !== it[2]; });
          var pick = R.choices(it[2], others, 4);
          return {
            type: 'choice', concept: 0,
            q: '대답을 보고 빈칸에 알맞은 의문사를 고르세요.\n\nA: ' + it[0] + '\nB: ' + it[1],
            choices: pick.choices,
            answer: pick.answer,
            hint: '대답이 사람·물건·때·장소·까닭·방법 가운데 무엇을 알려 주는지 보세요.',
            why: pick.choices.map(function (c) { return c === it[2] ? '' : ASK[c] + ' ' + it[3]; }),
            explain: it[3] + ' 그래서 **' + it[2] + '**입니다.\n\n' + it[0].replace('___', it[2]) + ' (' + it[4] + ')',
          };
        },
      },
      {
        id: 'how-word',
        level: 1,
        title: 'how many·much·often·long 고르기',
        make: function (R) {
          var it = R.pick(HOWQ);
          var opts = R.shuffle(HOW_ITEMS);
          return {
            type: 'choice', concept: 2,
            q: '대답을 보고 빈칸에 알맞은 말을 고르세요.\n\nA: ' + it[0] + '\nB: ' + it[1],
            choices: opts,
            answer: opts.indexOf(it[2]),
            hint: '대답이 개수·양(값)·빈도·기간 가운데 무엇인지 보세요.',
            why: opts.map(function (o) { return o === it[2] ? '' : HOW_ASK[o] + ' 이 대답에는 맞지 않습니다.'; }),
            explain: HOW_ASK[it[2]] + '\n\n' + it[0].replace('___', it[2]) + ' (' + it[3] + ')',
          };
        },
      },
      {
        id: 'tag-question',
        level: 2,
        title: '부가의문문 고르기',
        make: function (R) {
          var t = R.pick(TAGS);
          var pron = t[1], aux = t[2], neg = t[3];
          var right = (neg ? aux : NEG[aux]) + ' ' + pron;
          var sameSign = (neg ? NEG[aux] : aux) + ' ' + pron;
          var otherVerb = (neg ? SWAP[aux] : NEG[SWAP[aux]]) + ' ' + pron;
          var badSubj = (neg ? aux : NEG[aux]) + ' ' + t[4];
          var reason = {};
          reason[sameSign] = '앞 문장이 ' + (neg ? '부정이므로 꼬리는 긍정' : '긍정이므로 꼬리는 부정') + '이어야 합니다.';
          reason[otherVerb] = (aux === 'is' || aux === 'are')
            ? '앞 문장의 동사가 be동사이므로 꼬리도 be동사로 만듭니다.'
            : '앞 문장의 동사가 일반동사이므로 꼬리는 do·does로 만듭니다.';
          reason[badSubj] = '꼬리의 주어는 앞 문장의 주어를 가리키는 대명사(' + pron + ')입니다.';
          var pick = R.choices(right, [sameSign, otherVerb, badSubj], 4);
          var verbNote = (aux === 'is' || aux === 'are') ? 'be동사 문장' : '일반동사 문장(' + aux + ' 꼴)';
          return {
            type: 'choice', concept: 5,
            q: '빈칸에 알맞은 부가의문문을 고르세요.\n\n' + t[0] + ' ___?',
            choices: pick.choices,
            answer: pick.answer,
            hint: '앞 문장이 긍정인지 부정인지, be동사인지 일반동사인지 보세요.',
            why: pick.choices.map(function (c) { return c === right ? '' : reason[c]; }),
            explain: '앞 문장이 ' + (neg ? '부정' : '긍정') + '이므로 꼬리는 ' + (neg ? '긍정' : '부정') + ', ' + verbNote + '이므로 ' + (neg ? aux : NEG[aux]) + ', 주어는 대명사 ' + pron + ' — 그래서 **' + right + '**입니다.\n\n' + t[0] + ' ' + right + '? (' + t[5] + ')',
          };
        },
      },
    ],

    vocab: [
      { w: 'question', m: '질문', ex: 'I have a question about the price.', exm: '가격에 대해 질문이 하나 있습니다.' },
      { w: 'answer', m: '대답; 대답하다', ex: 'Who knows the answer?', exm: '누가 답을 알아요?' },
      { w: 'reason', m: '이유, 까닭', ex: 'What is the reason for the delay?', exm: '늦어지는 이유가 무엇인가요?' },
      { w: 'because', m: '왜냐하면, ~ 때문에', ex: 'I take the subway because it is fast.', exm: '빨라서 저는 지하철을 탑니다.' },
      { w: 'twice', m: '두 번', ex: 'I go swimming twice a week.', exm: '저는 일주일에 두 번 수영하러 갑니다.' },
      { w: 'once', m: '한 번', ex: 'We eat out once a month.', exm: '우리는 한 달에 한 번 외식합니다.' },
      { w: 'take', m: '(시간이) 걸리다', ex: 'It takes ten minutes to walk to the station.', exm: '역까지 걸어서 10분 걸립니다.' },
      { w: 'far', m: '먼; 멀리', ex: 'How far is the hospital from here?', exm: '병원은 여기서 얼마나 멀어요?' },
      { w: 'price', m: '값, 가격', ex: 'The price of this bag is too high.', exm: '이 가방은 값이 너무 비쌉니다.' },
      { w: 'favorite', m: '가장 좋아하는', ex: 'What is your favorite food?', exm: '가장 좋아하는 음식이 무엇인가요?' },
      { w: 'neighbor', m: '이웃', ex: 'Who is your new neighbor?', exm: '새 이웃은 누구예요?' },
      { w: 'abroad', m: '해외로, 외국에서', ex: 'My sister works abroad.', exm: '제 언니는 해외에서 일합니다.' },
      { w: 'vegetarian', m: '채식주의자', ex: 'Jia is a vegetarian, so she does not eat meat.', exm: '지아는 채식주의자라서 고기를 먹지 않습니다.' },
    ],
  });
})();
