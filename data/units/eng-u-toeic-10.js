/* 공인영어시험 기초 (토익형) · 공지·광고와 여러 지문 읽기
 * 공지·광고·메시지·일정표는 모두 직접 쓴 글이다(가상의 회사·가게·인물). */
(function () {
  // 정답 1개 + 오답들을 섞고, 오답 이유(why)도 같은 순서로 맞춘다.
  function mix(R, correct, wrongs, whys) {
    var all = [correct].concat(wrongs);
    var allWhy = [''].concat(whys);
    var idx = R.shuffle(all.map(function (_, i) { return i; }));
    return {
      choices: idx.map(function (i) { return all[i]; }),
      answer: idx.indexOf(0),
      why: idx.map(function (i) { return allWhy[i]; }),
    };
  }

  // 문제에 쓰는 지문 (문제마다 지문을 함께 보인다)
  var NOTICE_A = '**NOTICE: Elevator Maintenance**\n\n' +
    'To all tenants of the Harbor View Building:\n\n' +
    'Elevator B will be closed for maintenance from October 20 to October 22. During this period, please use Elevator A or the stairs. Elevator A will operate as usual. Tenants who need to move large items during the closure must contact the building office at least one day in advance. We apologize for any inconvenience.\n\n' +
    'Building Management Office';
  var AD_A = '**Maple Corner Café — Grand Opening Sale!**\n\n' +
    'Celebrate the opening of our new shop on Pine Street. From June 2 to June 15, all drinks are 30% off. Members of our free rewards program will also receive a free muffin with any purchase of 10,000 won or more. This offer is valid only at the Pine Street shop and cannot be combined with other coupons.\n\n' +
    'Open daily from 7 a.m. to 9 p.m.';
  var CHAT_A = 'Minji Seo [2:14 p.m.]: The client just asked if we can move tomorrow\'s meeting to 3 p.m.\n' +
    'Daniel Cho [2:15 p.m.]: I have a video call with the Busan office until 3:30.\n' +
    'Minji Seo [2:16 p.m.]: Hmm. What about 4?\n' +
    'Daniel Cho [2:16 p.m.]: That works for me.\n' +
    'Minji Seo [2:17 p.m.]: Great. I\'ll let the client know.';
  var CHAT_B = 'Jisoo Kang [9:02 a.m.]: The printer on our floor jammed again this morning.\n' +
    'Hyunwoo Lim [9:03 a.m.]: Tell me about it. I spent twenty minutes fixing it yesterday.\n' +
    'Jisoo Kang [9:04 a.m.]: Maybe we should ask the office manager to replace it.\n' +
    'Hyunwoo Lim [9:05 a.m.]: I\'ll bring it up at today\'s team meeting.';
  var SCHED_A = '**Sales Training Day — Schedule**\n\n' +
    '| Time | Session | Room |\n|---|---|---|\n' +
    '| 9:30 a.m. | Welcome talk | Hall A |\n' +
    '| 10:30 a.m. | Writing clear e-mails | Room 2 |\n' +
    '| 1:00 p.m. | Customer service basics | Room 3 |\n' +
    '| 2:30 p.m. | Using the new sales software | Room 2 |';
  var MAIL_A = 'To: Sora Han\nFrom: Hyejin Oh\nSubject: Training day\n\n' +
    'Hi Sora,\n\n' +
    'I\'m sorry, but I will have to leave right after lunch because I have a dentist appointment at 1 p.m. Could you take notes for me at the software session? I\'ll be back in the office by 4.\n\n' +
    'Thanks,\nHyejin';
  var INSERT_A = 'Riverside Library is starting a new service next month. [1] Members will be able to borrow laptops at the front desk. [2] Each laptop can be used for up to three hours. [3] Laptops that are returned late will be charged a fee of 1,000 won per hour. [4] We hope this service will help members who do not have their own computers.';
  var INSERT_B = 'Starting on March 3, the Customer Support Team will work from the fourth floor. [1] Customers who visit in person should go directly to the fourth floor. [2] The move is part of a plan to bring all service teams together in one place. [3] Our phone numbers and e-mail addresses will not change. [4]';
  var AD_P = '**Sunny Print Shop — Summer Special**\n\n' +
    '- 20% off all orders of 50,000 won or more, from July 1 to July 31\n' +
    '- Delivery: 5,000 won (free for orders of 100,000 won or more)\n\n' +
    '*The discount cannot be used for business cards.';
  var MAIL_P = 'To: Sunny Print Shop\nFrom: Yuna Kwon\n\n' +
    'Hello,\n\n' +
    'I would like to order 500 flyers for our bakery. Your website says that the price is 80,000 won. Please deliver them to our shop on Oak Street. I am placing this order today, July 28.\n\n' +
    'Thank you,\nYuna Kwon';

  // 공지 생성기: [영어, 우리말]
  var FACILITY = [['the staff cafeteria', '직원 식당'], ['the fitness room', '체력 단련실'], ['the parking garage', '주차장'], ['the third-floor library', '3층 도서실'], ['the main lobby', '정문 로비']];
  var REASON = [['repairs', '수리'], ['cleaning', '청소'], ['painting', '페인트칠'], ['an inspection', '점검']];
  var MONTHS30 = ['April', 'June', 'September', 'November'];
  var MONTHS30_KO = { April: '4월', June: '6월', September: '9월', November: '11월' };

  // 광고 생성기: [영어, 우리말, 광고 제목]
  var GOODS = [['books', '책', 'Book Sale'], ['shoes', '신발', 'Shoe Sale'], ['office supplies', '사무용품', 'Office Supplies Sale'], ['kitchen goods', '주방용품', 'Kitchen Goods Sale'], ['sports clothing', '운동복', 'Sports Clothing Sale']];

  // 메시지 의도 생성기: [앞사람 메시지, 뒷사람 말, 정답 뜻, [오답 3], [오답 이유 3], 우리말 풀이] — {B}는 뒷사람 이름
  var INTENT = [
    ['Can you send me the sales report by tomorrow morning?', 'I\'m on it.', '{B} will start on the report now.',
      ['{B} is sitting on top of the report.', '{B} has already sent the report.', '{B} cannot finish it by tomorrow morning.'],
      ['on 낱말의 "~ 위에"라는 뜻으로 읽었습니다. I\'m on it.은 "제가 맡아서 지금 하겠습니다"라는 굳은 표현입니다.', '이미 보냈다는 말은 없습니다. 이제부터 하겠다는 뜻입니다.', '못 한다는 뜻이 아니라 바로 하겠다는 뜻입니다.'],
      'I\'m on it.은 "제가 바로 하겠습니다(맡았습니다)"라는 뜻입니다.'],
    ['Sorry, I forgot to bring the extra chairs.', 'Don\'t worry about it. We have enough.', 'The chairs are not a problem.',
      ['{B} wants the chairs right away.', '{B} is worried about the meeting.', '{B} thinks there are too few chairs.'],
      ['We have enough(충분히 있다)라고 했으므로 지금 의자가 필요하지 않습니다.', 'worry 낱말이 보인다고 걱정한다는 뜻이 아닙니다. Don\'t worry는 "걱정하지 마세요"입니다.', 'We have enough라고 했으므로 의자는 충분합니다.'],
      'Don\'t worry about it.은 "괜찮아요, 신경 쓰지 마세요"라는 뜻이고, 이어서 의자가 충분하다고 말합니다.'],
    ['The client wants to meet at 10 instead of 11.', 'That works for me.', '{B} is able to meet at 10.',
      ['{B} would rather meet at 11.', '{B} has just finished some work.', '{B} will start working for the client.'],
      ['10시로 바꾸는 것에 동의했습니다. 11시를 더 좋아한다는 말이 아닙니다.', 'work 낱말을 "일"로 읽었습니다. That works for me.는 "저는 그 시간 괜찮아요"라는 뜻입니다.', 'work for(~를 위해 일하다)로 잘못 읽었습니다.'],
      'That works for me.는 "(그 시간·방법이) 저는 괜찮습니다"라는 뜻입니다.'],
    ['Do you want me to book the meeting room for Friday?', 'Already done.', '{B} has reserved the room.',
      ['{B} wants the other person to book it.', 'The Friday meeting is already over.', '{B} could not find a free room.'],
      ['이미 했다고 했으므로 상대에게 부탁할 필요가 없습니다.', 'done 낱말을 "회의가 끝났다"로 읽었습니다. 금요일 회의는 아직 열리지 않았습니다.', '방을 못 구했다는 말은 없습니다. 이미 예약을 마쳤습니다.'],
      'Already done.은 "(그 일은) 이미 해 두었습니다"라는 뜻입니다. 여기서는 회의실 예약을 이미 했다는 말입니다.'],
    ['Should we order lunch for tomorrow\'s visitors?', 'Good call.', '{B} thinks the idea is a good one.',
      ['{B} will call the visitors.', '{B} thinks a phone call went well.', '{B} would rather order dinner.'],
      ['call 낱말을 "전화하다"로 읽었습니다. Good call.은 "좋은 판단이에요"라는 뜻입니다.', '전화 통화 이야기가 아닙니다. 점심을 주문하자는 생각에 대한 대답입니다.', '저녁 이야기는 없습니다. 점심 주문에 찬성한 것입니다.'],
      'Good call.은 "좋은 생각(판단)이에요"라는 뜻입니다.'],
    ['The new printer arrived, but nobody knows how to set it up.', 'Leave it to me.', '{B} will set up the printer.',
      ['{B} wants the other person to leave.', '{B} will send the printer back.', '{B} does not know how to set it up either.'],
      ['leave 낱말을 "떠나다"로 읽었습니다. Leave it to me.는 "저에게 맡기세요"입니다.', '돌려보낸다는 말은 없습니다. 자기가 맡아서 설치하겠다는 뜻입니다.', '맡기라고 했으므로 할 줄 안다는 뜻입니다.'],
      'Leave it to me.는 "저에게 맡기세요(제가 하겠습니다)"라는 뜻입니다.'],
    ['Can we finish the slides by 5 p.m.?', 'It\'ll be tight.', 'Finishing on time may be difficult.',
      ['The slides are too small to read.', 'They have plenty of time to finish.', '{B} refuses to help with the slides.'],
      ['tight 낱말을 "꽉 끼는, 작은"으로 읽었습니다. 여기서는 시간이 빠듯하다는 뜻입니다.', '시간이 넉넉하다는 뜻과 반대입니다.', '돕지 않겠다는 말은 없습니다. 시간이 빠듯하다는 걱정입니다.'],
      'It\'ll be tight.는 "(시간이) 빠듯하겠어요"라는 뜻입니다.'],
    ['I can\'t find the file you mentioned this morning.', 'Hang on. I\'ll send it again.', '{B} needs a moment to resend the file.',
      ['{B} wants the other person to hold the file.', '{B} will call back tomorrow.', '{B} thinks the other person should look harder.'],
      ['hang on 표현을 "붙잡다"로 읽었습니다. 여기서는 "잠깐만 기다리세요"라는 뜻입니다.', '내일 전화하겠다는 말은 없습니다. 지금 다시 보내겠다고 했습니다.', '더 찾아보라는 말이 아니라 자기가 다시 보내겠다고 했습니다.'],
      'Hang on.은 "잠깐만요(기다려 주세요)"라는 뜻이고, 이어서 파일을 다시 보내겠다고 합니다.'],
  ];
  var PAIRS = [['Minji', 'Daniel'], ['Sora', 'Jake'], ['Yuna', 'Chris'], ['Hana', 'Ryan'], ['Jiwoo', 'Emma']];

  Tutor.registerUnit({
    id: 'eng-u-toeic-10',
    course: 'eng-u-toeic',
    title: '공지·광고와 여러 지문 읽기',
    summary: '공지와 광고에서 대상·기간·조건을 찾고, 두세 개의 글에 흩어진 정보를 연결해 답을 찾습니다.',
    goals: [
      '공지문에서 대상·일시·장소·조건을 찾고, 광고에서 혜택·기간·제한 사항을 확인할 수 있다.',
      '보기를 지문과 하나씩 맞춰 보며 사실과 다른 것(NOT true)을 고를 수 있다.',
      '메시지·채팅 대화에서 앞뒤 흐름으로 말한 사람의 의도를 파악할 수 있다.',
      '일정표와 이메일처럼 여러 지문의 정보를 연결하고, 문맥에 알맞은 자리에 문장을 넣을 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '공지문의 핵심 정보',
        body: '공지(notice, announcement, memo)는 **누구에게(대상) · 무엇이 · 언제 · 어디서 · 어떤 조건으로** 일어나는지 알리는 글입니다. 문제도 이 다섯 가지를 거의 그대로 묻습니다.\n\n' +
          '| 묻는 것 | 지문의 신호 |\n|---|---|\n' +
          '| 대상 | To all ~, tenants(입주자), residents(주민), employees, Attention: ~ |\n' +
          '| 일시 | from ~ to ~, starting on ~, effective ~(~부터 시행), until ~ |\n' +
          '| 장소 | in Room ~, on the ~ floor, at the main entrance |\n' +
          '| 조건·할 일 | must, be required to, in advance(미리), only, at least |\n' +
          '| 대안 | instead, during this period, please use ~ |\n\n' +
          '기간은 **처음 날과 끝 날을 모두 셉니다.** from October 20 to October 22 동안 닫는다면 20일·21일·22일, 모두 3일입니다.\n\n' +
          '> 💡 대상 문제의 정답은 지문의 말을 바꿔 씁니다. tenants of the building(건물 입주자)이 보기에서는 People who rent space in the building 꼴로 나오는 식입니다.',
        easy: '아파트 엘리베이터 옆에 붙은 안내문을 떠올려 보십시오. "주민 여러분께(대상) — 3일부터 5일까지(기간) 2호기 점검(무엇) — 1호기를 이용하세요(대안) — 이사하실 분은 하루 전에 관리실로 연락하세요(조건)". 영어 공지도 똑같은 짜임입니다.\n\n' +
          '그래서 공지문을 읽을 때는 이 다섯 칸을 채운다고 생각하면 됩니다. 날수를 셀 때는 손가락으로 첫날부터 끝 날까지 하나씩 세어 보십시오.',
        check: {
          type: 'ox',
          q: 'The pool will be closed from May 4 to May 6.\n\n이 공지에 따르면 수영장은 이틀 동안 닫습니다.',
          answer: false,
          explain: 'from May 4 to May 6은 4일·5일·6일이므로 **3일** 동안 닫습니다. 끝 날짜에서 처음 날짜를 빼기만 하면(6 − 4 = 2) 하루가 모자랍니다. 처음 날과 끝 날을 모두 셉니다.',
        },
      },
      {
        title: '광고의 혜택·기간·제한 사항',
        body: '광고 문제는 **무엇을 주는가(혜택) · 언제까지인가(기간) · 누가, 어떤 경우에만인가(제한)** 를 묻습니다. 특히 제한 사항은 광고 끝이나 별표(*) 뒤의 작은 글씨에 숨어 있습니다.\n\n' +
          '| 구분 | 자주 나오는 표현 |\n|---|---|\n' +
          '| 혜택 | 30% off, buy one, get one free, free shipping, complimentary(무료의), discount |\n' +
          '| 기간 | from ~ to ~, valid until ~, through June 30, this weekend only, while supplies last(재고가 있는 동안) |\n' +
          '| 제한 | members only, for orders of ~ or more(~ 이상 주문 시), excluding ~(~ 제외), not valid on ~, cannot be combined with other offers(다른 할인과 함께 쓸 수 없음), one per customer |\n\n' +
          '예: Free shipping on orders of 30,000 won or more. *Not valid on furniture. → 30,000원 이상 주문하면 배송이 무료이지만, 가구는 금액과 상관없이 무료 배송이 아닙니다.\n\n' +
          '> ⚠️ 혜택만 보고 답을 고르지 마십시오. "누구나, 언제나, 모든 상품"이라는 보기는 제한 사항 때문에 틀린 경우가 많습니다.',
        easy: '마트 전단지의 큰 글씨는 "30% 할인!"이고, 아래 작은 글씨는 "회원만, 이번 주말만, 1인 1개"입니다. 계산대에서 할인을 못 받는 까닭은 늘 작은 글씨에 있지요.\n\n' +
          '영어 광고도 같습니다. only, excluding, not valid, cannot be combined 같은 말이 작은 글씨의 신호입니다. 이 말이 보이면 밑줄을 긋고 조건을 확인하십시오.',
        check: {
          type: 'choice',
          q: 'Free shipping on all orders of 30,000 won or more! *Not valid on furniture.\n\n이 광고에 따르면 무료 배송을 받을 수 **없는** 주문은 무엇입니까?',
          choices: ['40,000원어치 책을 주문할 때', '50,000원짜리 의자를 주문할 때', '35,000원어치 옷과 양말을 주문할 때'],
          answer: 1,
          why: [
            '책은 제한 품목이 아니고 30,000원 이상이므로 무료 배송을 받습니다.',
            '',
            '옷과 양말은 제한 품목이 아니고 30,000원 이상이므로 무료 배송을 받습니다.',
          ],
          explain: '별표(*) 뒤의 Not valid on furniture(가구에는 해당하지 않음)가 제한 사항입니다. 의자는 가구이므로 금액이 30,000원을 넘어도 **무료 배송을 받을 수 없습니다.**',
        },
      },
      {
        title: '사실과 다른 것(NOT true) 고르기',
        body: '"What is NOT true about ~?", "What is NOT mentioned/stated?" 문제는 **보기 넷 가운데 셋이 지문과 맞고, 하나만 다릅니다.** 정답을 바로 찾으려 하기보다 **맞는 보기를 하나씩 지워 나가는 것(소거법)** 이 빠르고 정확합니다.\n\n' +
          '1. 보기 하나를 읽고 핵심어(숫자, 이름, 날짜)를 정합니다.\n' +
          '2. 지문에서 그 핵심어를 찾아 내용이 맞는지 봅니다. 맞으면 지웁니다.\n' +
          '3. 남은 하나가 답입니다. NOT mentioned 문제라면 지문에 아예 없는 내용도 답이 됩니다.\n\n' +
          '틀린 보기는 지문을 살짝 바꿔서 만듭니다.\n\n' +
          '| 바꾸는 방법 | 지문 | 틀린 보기 |\n|---|---|---|\n' +
          '| 숫자 | closed for three days | closed for a week |\n' +
          '| 범위 | members get a free muffin | every customer gets a free muffin |\n' +
          '| 사람 | tenants must contact the office | the office will contact tenants |\n\n' +
          '> 💡 all, every, any, only, always 같은 말이 든 보기는 지문과 범위가 맞는지 꼭 확인하십시오.',
        easy: '틀린 그림 찾기와 같습니다. 두 그림을 한 곳씩 짚어 가며 "같다, 같다, 같다…"를 확인하다 보면 다른 곳 하나가 남습니다.\n\n' +
          'NOT 문제도 보기 하나를 지문과 나란히 놓고 "맞다"면 지우고, 다음 보기로 넘어가십시오. 마지막에 지워지지 않은 보기가 답입니다.',
        check: {
          type: 'choice',
          q: 'The staff lounge will be closed on Friday for cleaning. Coffee will be available in the lobby on that day.\n\nWhat is NOT true according to the notice?',
          choices: ['The lounge will be closed on Friday.', 'Coffee will be served in the lobby.', 'The lounge will be closed for a week.'],
          answer: 2,
          why: [
            'closed on Friday라고 했으므로 지문과 맞습니다. NOT 문제에서는 맞는 보기를 지웁니다.',
            'Coffee will be available in the lobby와 같은 뜻이므로 지문과 맞습니다.',
            '',
          ],
          explain: '앞의 두 보기는 지문과 맞으므로 지웁니다. 라운지는 금요일 하루(on Friday)만 닫으므로 **The lounge will be closed for a week.**가 사실과 다릅니다. 기간(숫자)을 바꿔 만든 보기입니다.',
        },
      },
      {
        title: '메시지·채팅에서 의도 파악하기',
        body: '문자 메시지·온라인 채팅 지문에는 "At 2:16 p.m., what does Mr. Cho mean when he writes, \'That works for me\'?" 같은 문제가 나옵니다. 낱말 하나하나의 뜻이 아니라 **바로 앞 메시지에 대한 반응으로서 무슨 뜻인지**를 묻습니다.\n\n' +
          '| 표현 | 대화 속 뜻 |\n|---|---|\n' +
          '| I\'m on it. / Will do. | 제가 (바로) 하겠습니다 |\n' +
          '| That works for me. | 저는 그 시간·방법이 괜찮습니다 |\n' +
          '| Already done. | 그건 이미 해 두었습니다 |\n' +
          '| Don\'t worry about it. | 괜찮아요, 신경 쓰지 마세요 |\n' +
          '| Tell me about it. | (나도 겪어서) 정말 그래요 |\n' +
          '| Good call. | 좋은 판단이에요 |\n' +
          '| Leave it to me. | 저에게 맡기세요 |\n' +
          '| It\'ll be tight. | (시간·예산이) 빠듯하겠어요 |\n\n' +
          '푸는 방법: ① 따옴표 문장 바로 **앞 메시지**가 무엇을 묻거나 제안했는지 확인하고, ② 따옴표 문장 **뒤 메시지**로 그 뜻이 맞는지 확인합니다.\n\n' +
          '> ⚠️ 오답 보기는 낱말의 글자 뜻으로 만듭니다. Good call.을 "전화를 잘 했다", Leave it to me.를 "나가라"로 읽게 하는 식입니다.',
        easy: '친구가 "내일 4시 어때?" 하고 물었는데 "콜!"이라고 답했다면, 전화하겠다는 뜻이 아니라 "좋아"라는 뜻이지요. 앞사람의 말을 알아야 대답의 뜻을 알 수 있습니다.\n\n' +
          '영어 채팅도 같습니다. 따옴표 문장만 보지 말고, 바로 앞 사람이 무엇을 물었는지부터 읽으십시오.',
        check: {
          type: 'choice',
          q: 'Sora [10:05 a.m.]: Can you check the hotel booking for next week\'s trip?\nJake [10:06 a.m.]: Will do.\n\nJake가 "Will do."라고 쓴 뜻으로 가장 알맞은 것은 무엇입니까?',
          choices: ['He will check the booking.', 'He has already finished the trip.', 'He wants Sora to check it herself.'],
          answer: 0,
          why: [
            '',
            '여행은 다음 주(next week)이므로 아직 다녀오지 않았습니다.',
            'Will do.는 상대의 부탁을 자기가 하겠다는 대답입니다. 상대에게 미루는 말이 아닙니다.',
          ],
          explain: 'Will do.는 I will do it.을 줄인 말로, 앞사람의 부탁(호텔 예약 확인)을 **자기가 하겠다**는 뜻입니다.',
        },
      },
      {
        title: '여러 지문의 정보 연결하기',
        body: '두세 개의 글(일정표 + 이메일, 광고 + 주문서, 공지 + 메시지)이 함께 나오는 문제는 **한 질문의 답이 두 글에 나뉘어 있는** 경우가 많습니다. 한 글만 읽고는 풀 수 없게 만든 문제입니다.\n\n' +
          '1. 질문이 무엇을 묻는지 확인합니다(예: 어느 방으로 가야 하는가?).\n' +
          '2. 이메일·메시지에서 **조건**을 찾습니다(예: the software session에서 노트를 부탁함).\n' +
          '3. 일정표·광고에서 그 조건에 맞는 **값**을 찾습니다(예: 소프트웨어 세션 → Room 2).\n\n' +
          '두 글을 잇는 고리는 대개 같은 이름, 같은 날짜·시간, 같은 상품명입니다. 다만 이메일에서는 the software session처럼 줄여 말하고, 표에는 Using the new sales software처럼 온전한 이름이 적혀 있으니 **같은 것을 가리키는지** 확인하십시오.\n\n' +
          '> 💡 표에서는 행(가로줄)과 열(세로줄)을 함께 봅니다. 시간으로 행을 찾고, 그 행에서 묻는 열(장소·강연자)을 읽습니다.',
        easy: '보물찾기 쪽지 두 장을 생각해 보십시오. 첫 쪽지에는 "파란 상자를 찾아라", 둘째 쪽지에는 "파란 상자는 창고에 있다"라고 적혀 있습니다. 두 쪽지를 이어야 보물이 창고에 있다는 것을 압니다.\n\n' +
          '여러 지문 문제도 그렇습니다. 이메일이 "무엇을"을 알려 주면, 일정표가 "어디서·언제"를 알려 줍니다.',
        check: {
          type: 'choice',
          q: '| Day | Speaker |\n|---|---|\n| Monday | Ms. Yoon |\n| Tuesday | Mr. Park |\n| Wednesday | Ms. Lee |\n\nMessage: I can only attend on the day Mr. Park speaks.\n\n메시지를 쓴 사람은 무슨 요일에 참석합니까?',
          choices: ['Monday', 'Tuesday', 'Wednesday'],
          answer: 1,
          why: [
            '월요일은 윤 씨(Ms. Yoon)가 강연하는 날입니다.',
            '',
            '수요일은 이 씨(Ms. Lee)가 강연하는 날입니다.',
          ],
          explain: '메시지에서 조건(박 씨가 강연하는 날)을 찾고, 표에서 Mr. Park 행을 보면 **Tuesday**입니다. 두 글을 이어야 풀리는 문제입니다.',
        },
      },
      {
        title: '문맥에 알맞은 문장 넣기',
        body: '"In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?" 문제는 주어진 문장이 들어갈 자리를 고르는 문제입니다. 주어진 문장 안의 **단서**가 앞 문장의 무엇을 가리키는지 찾으면 풀립니다.\n\n' +
          '| 단서 | 예 | 앞 문장에 있어야 할 것 |\n|---|---|---|\n' +
          '| 대명사·지시어 | they, it, this, these, that time | 가리키는 사람·물건·때 |\n' +
          '| 정관사 the + 명사 | the laptop, the change | 처음 나온 그 명사 |\n' +
          '| 연결어 | However, As a result, Also, For example | 반대·원인·덧붙임·일반적인 말 |\n\n' +
          '방법: ① 넣을 문장의 단서에 동그라미를 칩니다. ② 그 단서가 가리킬 말이 바로 앞에 오는 자리를 찾습니다. ③ 그 자리에 넣고 **앞뒤를 이어 읽어** 흐름이 자연스러운지 확인합니다.\n\n' +
          '> ⚠️ 단서가 가리킬 말이 그 자리보다 **뒤에** 나온다면 그 자리는 답이 아닙니다. 대명사는 보통 앞에 나온 말을 가리킵니다.',
        easy: '퍼즐 조각을 끼울 때 튀어나온 곳과 들어간 곳을 맞추지요. 넣을 문장의 they, this, However 같은 말이 "튀어나온 곳"이고, 그것이 가리키는 앞 문장의 말이 "들어간 곳"입니다.\n\n' +
          '예를 들어 넣을 문장이 After that time, ~으로 시작하면, 바로 앞 문장에 시간(three hours 같은 말)이 있어야 합니다.',
        check: {
          type: 'ox',
          q: '넣을 문장이 However로 시작하면, 그 문장은 바로 앞 문장과 반대되거나 예상과 다른 내용을 말합니다.',
          answer: true,
          explain: 'However(하지만)는 앞의 내용과 반대되거나 예상과 다른 말을 이을 때 씁니다. 그래서 However 문장은 그와 반대되는 내용이 담긴 문장 **바로 뒤**에 들어갑니다.',
        },
      },
    ],

    examples: [
      {
        q: '다음 공지를 읽고 물음에 답하십시오.\n\n**NOTICE TO ALL EMPLOYEES**\n\nStaff photos for the new company website will be taken in the second-floor meeting room on November 5 and 6. Employees in the Sales and Marketing teams should come on November 5, and all other teams on November 6. Please wear business clothes. To book a time, visit the HR page by October 31.\n\nWhat is NOT true about the staff photos?\n(A) They will be taken over two days.\n(B) Employees should book a time by October 31.\n(C) Employees should wear business clothes.\n(D) All employees should come on November 5.',
        steps: [
          'NOT true 문제이므로 지문과 맞는 보기를 하나씩 지웁니다.',
          '(A) on November 5 and 6, 이틀입니다. 맞으므로 지웁니다.',
          '(B) To book a time, visit the HR page by October 31. 맞으므로 지웁니다. (C) Please wear business clothes. 맞으므로 지웁니다.',
          '(D) 11월 5일에 오는 것은 영업·마케팅 팀뿐이고, 나머지 팀은 11월 6일입니다. All(모두)로 범위를 넓힌 보기라 사실과 다릅니다.',
        ],
        answer: '(D) All employees should come on November 5.',
      },
      {
        q: '일정표와 이메일을 함께 읽고 물음에 답하십시오.\n\n| Time | Talk | Speaker |\n|---|---|---|\n| 11:00 a.m. | Online marketing basics | Ms. Shin |\n| 1:30 p.m. | Building a customer list | Mr. Go |\n| 3:00 p.m. | Online marketing for small shops | Ms. Shin |\n\nI really want to hear Ms. Shin, but I have to leave the conference at 2 p.m. to catch a train.\n\nWhich talk will the writer most likely attend?\n(A) Online marketing basics\n(B) Building a customer list\n(C) Online marketing for small shops',
        steps: [
          '이메일에서 조건 두 가지를 찾습니다: ① 신 씨(Ms. Shin)의 강연을 듣고 싶다, ② 오후 2시에 떠나야 한다.',
          '표에서 Ms. Shin 행을 찾으면 오전 11시와 오후 3시, 두 개입니다.',
          '오후 3시 강연은 2시에 떠난 뒤라 들을 수 없습니다. 두 조건을 모두 만족하는 것은 오전 11시의 Online marketing basics 강연입니다.',
          '(B)는 2시 전이지만 강연자가 고 씨(Mr. Go)이고, (C)는 신 씨 강연이지만 2시 뒤입니다. 한 글만 보면 고르기 쉬운 함정입니다.',
        ],
        answer: '(A) Online marketing basics',
      },
    ],

    terms: [
      { term: '공지(notice)', def: '여러 사람에게 바뀌는 일정·규칙·행사를 알리는 글입니다. 대상·일시·장소·조건이 핵심입니다.' },
      { term: '대상', def: '공지·광고가 누구를 위한 것인지입니다. To all tenants, Attention: employees처럼 글 첫머리에 나옵니다.' },
      { term: '유효 기간', def: '혜택을 받을 수 있는 기간입니다. 예: valid until June 30(6월 30일까지 유효), while supplies last(재고가 있는 동안)' },
      { term: '제한 사항', def: '혜택을 받을 수 있는 사람·상품·경우를 좁히는 조건입니다. 예: members only, excluding sale items, cannot be combined with other offers' },
      { term: '소거법', def: '맞는 보기를 하나씩 지워 남은 하나를 답으로 고르는 방법입니다. NOT true 문제에서 특히 쓸모 있습니다.' },
      { term: '의도 파악 문제', def: '메시지·채팅에서 따옴표 친 말이 대화 속에서 무슨 뜻인지 묻는 문제입니다. 바로 앞 메시지와 이어서 풉니다.' },
      { term: '여러 지문 문제', def: '두세 개의 글을 함께 읽고 푸는 문제입니다. 한 질문의 답이 두 글에 나뉘어 있는 경우가 많습니다.' },
      { term: '문장 넣기 문제', def: '주어진 문장이 들어갈 자리를 [1]~[4] 가운데서 고르는 문제입니다. 대명사·정관사·연결어가 단서입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '이 공지는 누구를 위한 것입니까?\n\n' + NOTICE_A,
        choices: ['People who rent space in the building', 'Workers who repair elevators', 'Visitors who come to the building office for help', 'Shoppers at a department store'],
        answer: 0,
        why: [
          '',
          '수리하는 사람은 공지에 나오지 않습니다. 공지는 엘리베이터를 쓰는 사람에게 알리는 글입니다.',
          'building office는 공지를 낸 곳이자 연락할 곳입니다. 공지를 받는 사람이 아닙니다.',
          '백화점 이야기는 지문에 없습니다.',
        ],
        explain: '첫머리 To all tenants of the Harbor View Building에서 대상은 **건물 입주자(tenants)** 입니다. tenant는 공간을 빌려 쓰는 사람이므로, 보기에서는 People who rent space in the building 꼴로 바꿔 썼습니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', unit: '일', concept: 0,
        q: '엘리베이터 B는 며칠 동안 운행하지 않습니까? 숫자만 쓰십시오.\n\n' + NOTICE_A,
        answer: '3',
        wrong: [{ a: '2', why: '끝 날짜에서 처음 날짜를 빼기만 했습니다(22 − 20). 10월 20일·21일·22일을 모두 세면 3일입니다.' }],
        explain: 'from October 20 to October 22이므로 20일, 21일, 22일 **3일**입니다. 기간은 처음 날과 끝 날을 모두 셉니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 0,
        q: '엘리베이터 B를 점검하는 동안 큰 물건을 옮겨야 하는 입주자는 무엇을 해야 합니까?\n\n' + NOTICE_A,
        choices: ['Contact the office a day ahead', 'Use Elevator B after 5 p.m.', 'Wait until Elevator B opens again on October 23', 'Carry the items up the stairs'],
        answer: 0,
        why: [
          '',
          '엘리베이터 B는 기간 내내 닫습니다. 저녁에 쓸 수 있다는 말은 없습니다.',
          '점검이 끝난 뒤에 옮기라는 말은 없습니다. 기간 중에 옮기려면 미리 연락하라고 했습니다.',
          '계단은 엘리베이터 대신 쓰라는 안내일 뿐, 큰 물건을 계단으로 옮기라는 말은 없습니다.',
        ],
        explain: 'Tenants who need to move large items during the closure **must contact the building office at least one day in advance**.(엘리베이터가 멈춘 동안 큰 물건을 옮겨야 하는 입주자는 적어도 하루 전에 관리실에 연락해야 합니다.) at least one day in advance 부분이 보기에서는 a day ahead 꼴로 바뀌었습니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 1,
        q: '할인 행사는 언제 열립니까?\n\n' + AD_A,
        choices: ['From June 2 to June 15', 'From 7 a.m. to 9 p.m. only', 'Only on the opening day', 'Until all the muffins are gone'],
        answer: 0,
        why: [
          '',
          '7 a.m. to 9 p.m.은 날마다 문을 여는 시간(Open daily)입니다. 행사 기간이 아닙니다.',
          '개업 첫날 하루만이라는 말은 없습니다. 행사는 2주 동안입니다.',
          '머핀이 떨어질 때까지(while supplies last)라는 조건은 이 광고에 없습니다.',
        ],
        explain: 'From June 2 to June 15, all drinks are 30% off. 기간은 **6월 2일부터 15일까지**입니다. 광고에는 시간 정보(영업시간)와 기간 정보(행사 기간)가 함께 나오니 무엇을 묻는지 확인하십시오.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', unit: '%', concept: 1,
        q: '행사 기간에 음료는 몇 퍼센트 할인됩니까? 숫자만 쓰십시오.\n\n' + AD_A,
        answer: '30',
        wrong: [{ a: '70', why: '70%는 할인을 받은 뒤 내는 비율입니다. 30% off는 값의 30%를 깎아 준다는 뜻입니다.' }],
        explain: 'all drinks are **30% off** 부분에서 할인율은 30%입니다. off는 "깎아서"라는 뜻이라 30% off는 값의 30%를 빼 준다는 말입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: 'At 2:16 p.m., what does Mr. Cho most likely mean when he writes, "That works for me"?\n\n' + CHAT_A,
        choices: ['He can attend a meeting at 4 p.m.', 'He has finished his video call.', 'He will call the client himself.', 'He would rather keep the meeting at 3 p.m.'],
        answer: 0,
        why: [
          '',
          '영상 통화는 3시 30분까지라고 했습니다. 일을 끝냈다는 뜻이 아닙니다.',
          '고객에게 알리겠다고 한 사람은 서 씨(Minji Seo)입니다(I\'ll let the client know).',
          '3시에는 영상 통화가 있어서 안 된다고 했습니다.',
        ],
        explain: '바로 앞 메시지 What about 4?(4시는 어때요?)에 대한 대답입니다. That works for me.는 "저는 그 시간 괜찮습니다"라는 뜻이므로 **4시 회의에 올 수 있다**는 말입니다. 뒤 메시지 Great. I\'ll let the client know.도 그 뜻을 확인해 줍니다.',
      },
      {
        id: 'p7', level: 1, type: 'ox', concept: 2,
        q: '"What is NOT true about the sale?" 문제의 정답은 지문의 내용과 맞는 보기입니다.',
        answer: false,
        explain: 'NOT true 문제는 사실과 **다른** 보기를 고릅니다. 지문과 맞는 보기 셋을 지워 나가면 사실과 다른 보기 하나가 남고, 그것이 정답입니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 2,
        q: 'What is NOT true according to the notice?\n\n' + NOTICE_A,
        choices: [
          'Elevator B will be closed for three days.',
          'Elevator A will operate normally.',
          'Tenants must call the office to use Elevator A.',
          'Tenants moving large items should contact the office a day early.',
        ],
        answer: 2,
        why: [
          '10월 20일부터 22일까지, 3일입니다. 지문과 맞습니다.',
          'Elevator A will operate as usual과 같은 뜻입니다. 지문과 맞습니다.',
          '',
          'must contact the building office at least one day in advance와 같은 뜻입니다. 지문과 맞습니다.',
        ],
        hint: '맞는 보기를 하나씩 지워 보십시오.',
        explain: '관리실에 연락해야 하는 것은 **큰 물건을 옮길 때**입니다. 엘리베이터 A는 평소처럼(as usual) 누구나 씁니다. 그래서 "엘리베이터 A를 쓰려면 관리실에 전화해야 한다"는 사실과 다릅니다. 조건이 붙는 경우를 바꿔 만든 보기입니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 1,
        q: '무료 머핀을 받으려면 어떻게 해야 합니까?\n\n' + AD_A,
        choices: [
          'Join the rewards program and spend 10,000 won or more',
          'Buy two drinks at any Maple Corner shop before June 15',
          'Show a coupon from another café at the counter',
          'Visit the Pine Street shop before 7 a.m.',
        ],
        answer: 0,
        why: [
          '',
          '음료 두 잔이라는 조건은 없고, 행사는 Pine Street 가게에서만(valid only at the Pine Street shop) 합니다.',
          '다른 쿠폰과 함께 쓸 수 없다고 했습니다(cannot be combined with other coupons).',
          '가게는 오전 7시에 문을 엽니다. 그 전에 가라는 조건은 없습니다.',
        ],
        explain: 'Members of our free rewards program will also receive a free muffin with any purchase of 10,000 won or more. 조건은 두 가지입니다: ① 무료 회원 프로그램의 **회원**일 것, ② **10,000원 이상** 살 것.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 4,
        q: '일정표와 이메일을 함께 읽고 답하십시오. 소라 씨는 혜진 씨의 부탁을 들어주려면 어느 방으로 가야 합니까?\n\n' + SCHED_A + '\n\n' + MAIL_A,
        choices: ['Hall A', 'Room 2', 'Room 3', 'The office'],
        answer: 1,
        why: [
          'Hall A는 아침 환영 인사(Welcome talk)를 하는 곳입니다.',
          '',
          'Room 3은 오후 1시 고객 서비스 세션의 방입니다. 혜진 씨가 노트를 부탁한 세션이 아닙니다.',
          '사무실(office)은 혜진 씨가 4시까지 돌아올 곳입니다.',
        ],
        hint: '이메일에서 어떤 세션인지 찾고, 일정표에서 그 세션의 방을 찾으십시오.',
        explain: '이메일의 Could you take notes for me at the **software session**?에서 세션을 찾고, 일정표에서 그 세션(2:30 p.m. Using the new sales software)의 방을 보면 **Room 2**입니다. 이메일은 줄여서 software session이라고 했고, 표에는 온전한 이름이 적혀 있습니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', fixed: true, concept: 5,
        q: '다음 문장이 들어가기에 가장 알맞은 자리는 어디입니까?\n\n"After that time, the laptop must be returned to the front desk."\n\n' + INSERT_A,
        choices: ['[1]', '[2]', '[3]', '[4]'],
        answer: 2,
        why: [
          '[1] 앞에는 "다음 달 새 서비스"만 있어 that time(그 시간)과 the laptop(그 노트북)이 가리킬 말이 없습니다.',
          '[2] 앞 문장에는 노트북은 있지만 시간이 없습니다. that time이 가리킬 말이 없습니다.',
          '',
          '[4] 앞은 늦게 돌려줄 때의 요금입니다. "그 시간이 지나면 돌려줘야 한다"는 말은 요금 이야기보다 먼저 나와야 자연스럽습니다.',
        ],
        hint: 'that time이 가리킬 "시간"이 바로 앞에 있는 자리를 찾으십시오.',
        explain: '넣을 문장의 단서는 **that time**(그 시간)입니다. 바로 앞에 for up to three hours(최대 3시간)가 있는 [3] 자리에 넣으면 "노트북은 최대 3시간 쓸 수 있습니다. 그 시간이 지나면 안내 데스크에 돌려줘야 합니다. 늦게 돌려주면 시간당 1,000원을 냅니다."로 자연스럽게 이어집니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 2,
        q: 'What is NOT true about the sale?\n\n' + AD_A,
        choices: [
          'It lasts for two weeks.',
          'Any customer can get a free muffin.',
          'The 30% discount is only for drinks.',
          'The shop opens at 7 a.m. every day.',
        ],
        answer: 1,
        why: [
          '6월 2일부터 15일까지, 2주입니다. 지문과 맞습니다.',
          '',
          'all drinks are 30% off이므로 30% 할인은 음료에 붙습니다. 지문과 맞습니다.',
          'Open daily from 7 a.m.과 같은 뜻입니다. 지문과 맞습니다.',
        ],
        explain: '무료 머핀은 **회원(Members of our free rewards program)이 10,000원 이상 살 때만** 받습니다. Any customer(어떤 손님이든)로 범위를 넓힌 보기라 사실과 다릅니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', unit: '원', concept: 4,
        q: '광고와 이메일을 함께 읽고 답하십시오. 권 씨가 이 주문에 내야 할 돈은 모두 얼마입니까? 숫자만 쓰십시오.\n\n' + AD_P + '\n\n' + MAIL_P,
        answer: '69000',
        hint: '할인 조건(금액·기간·품목)과 배송비 조건을 하나씩 확인하십시오.',
        wrong: [
          { a: '64000', why: '할인은 맞게 했지만 배송비를 빠뜨렸습니다. 주문 금액이 100,000원보다 적어 배송비 5,000원을 냅니다.' },
          { a: '85000', why: '할인을 빼먹었습니다. 80,000원은 50,000원 이상이고 7월 28일은 할인 기간 안이며 전단지는 명함이 아닙니다.' },
          { a: '68000', why: '배송비에도 20% 할인을 적용했습니다. 할인은 주문 금액(80,000원)에만 붙습니다.' },
        ],
        explain: '① 할인: 80,000원은 50,000원 이상, 7월 28일은 7월 1일~31일 안, 전단지(flyers)는 명함(business cards)이 아니므로 20% 할인 → 80,000 × 0.8 = 64,000원.\n② 배송비: 주문이 100,000원보다 적으므로 무료가 아니라 5,000원.\n③ 합계: 64,000 + 5,000 = **69,000원**. 두 글의 조건을 모두 이어야 풀리는 문제입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 3,
        q: 'At 9:03 a.m., what does Mr. Lim most likely mean when he writes, "Tell me about it"?\n\n' + CHAT_B,
        choices: ['He has had the same trouble.', 'He wants to hear more details.', 'He did not know the printer jammed.', 'He will fix the printer right now.'],
        answer: 0,
        why: [
          '',
          '글자 그대로 "그것에 대해 말해 달라"로 읽었습니다. 바로 뒤에 자기도 어제 고쳤다고 하므로 더 듣고 싶다는 뜻이 아닙니다.',
          '어제 자기가 20분이나 고쳤다고 했으므로 이미 알고 있습니다.',
          '지금 고치겠다는 말은 없습니다. 뒤에서 회의에서 말하겠다고 했습니다.',
        ],
        hint: '"Tell me about it" 바로 뒤의 문장을 함께 읽으십시오.',
        explain: 'Tell me about it.은 상대의 불평에 "정말 그래요(나도 겪었어요)"라고 맞장구치는 표현입니다. 바로 뒤의 I spent twenty minutes fixing it yesterday.(어제 그거 고치느라 20분 썼어요)가 그 뜻을 확인해 줍니다. 그래서 **자기도 같은 문제를 겪었다**는 뜻입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', fixed: true, concept: 5,
        q: '다음 문장이 들어가기에 가장 알맞은 자리는 어디입니까?\n\n"They will be able to wait in the new seating area next to the elevators until a staff member calls their name."\n\n' + INSERT_B,
        choices: ['[1]', '[2]', '[3]', '[4]'],
        answer: 1,
        why: [
          '[1] 앞 문장의 주어는 팀(the Customer Support Team)입니다. 직원 팀이 자기 이름이 불릴 때까지 기다린다는 말은 어색합니다.',
          '',
          '[3] 앞 문장은 팀을 한곳에 모으려는 계획입니다. They가 서비스 팀을 가리키게 되어 "직원이 이름을 부를 때까지 기다린다"는 말과 맞지 않습니다.',
          '[4] 앞 문장은 전화번호와 이메일 주소입니다. They가 가리킬 사람이 없습니다.',
        ],
        hint: 'They가 가리킬 사람, 그리고 "이름이 불릴 때까지 기다리는" 사람은 누구입니까?',
        explain: '넣을 문장의 단서는 **They**와 "직원이 이름을 부를 때까지 기다린다"는 내용입니다. 기다리는 사람은 방문 고객이므로, 바로 앞에 Customers who visit in person(직접 방문하는 고객)이 있는 **[2]** 자리가 알맞습니다: "직접 방문하는 고객은 4층으로 바로 오십시오. 그분들은 직원이 이름을 부를 때까지 엘리베이터 옆 새 대기 공간에서 기다리실 수 있습니다."',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 4,
        q: '일정표와 이메일을 함께 읽고 답하십시오. 혜진 씨가 놓치게 되면서도 노트를 부탁하지 **않은** 세션은 무엇입니까?\n\n' + SCHED_A + '\n\n' + MAIL_A,
        choices: ['Welcome talk', 'Writing clear e-mails', 'Customer service basics', 'Using the new sales software'],
        answer: 2,
        why: [
          '환영 인사는 오전 9시 30분이라 점심 전에 들을 수 있습니다.',
          '이메일 쓰기 세션은 오전 10시 30분이라 점심 전에 들을 수 있습니다.',
          '',
          '소프트웨어 세션은 놓치지만, 소라 씨에게 노트를 부탁했습니다.',
        ],
        hint: '혜진 씨는 언제 떠납니까? 그 뒤의 세션은 몇 개입니까?',
        explain: '혜진 씨는 점심 직후(right after lunch) 떠나므로 오후 세션 둘(1:00 p.m. Customer service basics, 2:30 p.m. Using the new sales software)을 놓칩니다. 그 가운데 노트를 부탁한 것은 software session이므로, 부탁하지 않은 것은 **Customer service basics**입니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 3,
        q: 'What will Mr. Lim most likely do later today?\n\n' + CHAT_B,
        choices: ['Mention the printer problem at a meeting', 'Carry the printer to the meeting room', 'Buy a new printer for the office', 'Spend another twenty minutes fixing the printer'],
        answer: 0,
        why: [
          '',
          'bring up을 "가지고 올라가다"로 읽었습니다. 여기서는 "(이야기를) 꺼내다"라는 뜻입니다.',
          '바꿔 달라고 관리자에게 부탁하자는 이야기는 했지만, 임 씨가 직접 산다는 말은 없습니다.',
          '20분 동안 고친 것은 어제(yesterday) 일입니다.',
        ],
        hint: 'today 낱말이 들어 있는 마지막 메시지를 보십시오.',
        explain: '마지막 메시지 I\'ll bring it up at today\'s team meeting.에서 bring up은 "(문제·주제를) 꺼내다, 말하다"라는 뜻입니다. it은 프린터를 바꿔 달라고 하자는 이야기이므로, 임 씨는 **오늘 팀 회의에서 프린터 문제를 이야기할 것**입니다.',
      },
    ],

    deeper: [
      {
        title: '여러 지문 문제는 "질문 → 고리 → 값" 순서로',
        body: '지문이 두세 개 붙은 묶음에는 문제가 다섯 개쯤 따라옵니다. 그 가운데 한두 문제만 두 글을 이어야 풀리고, 나머지는 글 하나로 풀립니다. 그래서 다음 순서가 시간을 아낍니다.\n\n' +
          '1. 문제를 먼저 보고, 어느 글을 보면 되는지 정합니다. 질문에 according to the e-mail(이메일에 따르면)처럼 글이 적혀 있으면 그 글만 봅니다.\n' +
          '2. 글이 적혀 있지 않고 일정·가격·장소를 묻는다면 **연결 문제**일 가능성이 큽니다. 한 글에서 조건(누가, 어떤 세션, 언제 주문)을, 다른 글에서 값(방, 가격, 시각)을 찾습니다.\n' +
          '3. 고리가 되는 말(이름·날짜·상품명)에 표시해 두면 두 글을 오갈 때 헤매지 않습니다.\n\n' +
          '실제 업무도 그렇습니다. 출장비를 정산할 때는 회사 규정(공지)과 영수증(표)과 상사의 이메일을 함께 보고 판단합니다. 흩어진 정보를 잇는 힘이 이 문제가 재는 능력입니다.',
      },
      {
        title: '광고·공지를 직접 쓸 때',
        body: '읽기에서 찾은 다섯 칸(대상·무엇·언제·어디서·조건)은 그대로 쓰기의 점검표가 됩니다. 행사를 알리는 공지를 쓴다면 다음을 빠뜨리지 않았는지 확인합니다.\n\n' +
          '| 칸 | 표현 예 |\n|---|---|\n' +
          '| 대상 | To all employees / Attention, residents |\n' +
          '| 무엇 | The parking garage will be closed for repairs. |\n' +
          '| 언제 | from May 4 to May 6 / starting on May 4 |\n' +
          '| 대안 | During this period, please use the lot behind the building. |\n' +
          '| 조건·문의 | If you have questions, please contact the front desk. |\n\n' +
          '광고라면 혜택과 함께 기간과 제한 사항을 분명히 적어야 나중에 손님과 다툼이 생기지 않습니다. 시험의 NOT true 문제가 제한 사항을 자주 묻는 까닭도 여기에 있습니다.',
      },
    ],

    faq: [
      {
        q: 'NOT true랑 NOT mentioned는 뭐가 달라요?',
        a: 'NOT true(사실이 아닌 것)는 지문과 **어긋나는** 보기를 고릅니다. NOT mentioned/stated(언급되지 않은 것)는 지문에 **나오지 않는** 보기를 고릅니다. 실제로는 두 문제 모두 "지문과 맞는 보기 셋을 지운다"는 같은 방법으로 풀 수 있습니다. 남은 하나가 지문과 어긋나든, 지문에 없든 그것이 답입니다.',
      },
      {
        q: '채팅 문제에서 따옴표 문장의 뜻을 몰라도 풀 수 있어요?',
        a: '많은 경우 풀 수 있습니다. 바로 앞 메시지가 무엇을 물었는지(예: What about 4?), 바로 뒤 메시지가 어떻게 이어지는지(예: Great. I\'ll let the client know.)를 보면 따옴표 문장이 "좋다"인지 "안 된다"인지 알 수 있습니다. 다만 Tell me about it.처럼 글자 뜻과 대화 속 뜻이 다른 표현은 이 단원의 표에서 미리 익혀 두면 더 빠릅니다.',
      },
      {
        q: '문장 넣기에서 단서가 안 보이면 어떻게 해요?',
        a: '대명사·the·연결어가 없으면 내용의 흐름을 봅니다. 넣을 문장이 일반적인 말(전체 소개)이면 앞쪽, 구체적인 예나 결과면 그 일반적인 말 뒤쪽에 옵니다. 마지막으로 후보 자리에 하나씩 넣고 앞뒤 문장과 이어 읽어, 말이 끊기거나 같은 말이 되풀이되는 자리를 지웁니다.',
      },
    ],

    mistakes: [
      '기간을 셀 때 끝 날짜에서 처음 날짜를 빼기만 하는 실수(from May 4 to May 6을 2일로 셈) — 처음 날과 끝 날을 모두 세어 3일입니다.',
      '광고의 혜택만 보고 "누구나, 모든 상품"이라고 판단하는 실수 — only, excluding, not valid on, cannot be combined 같은 제한 사항을 확인합니다.',
      '여러 지문 문제를 한 글만 보고 푸는 실수 — 이메일의 조건과 일정표·광고의 값을 이어야 답이 나옵니다.',
    ],

    gens: [
      {
        id: 'notice-days',
        level: 1,
        title: '공지에서 기간(날수) 확인하기',
        make: function (R) {
          var fac = R.pick(FACILITY);
          var rea = R.pick(REASON);
          var m = R.pick(MONTHS30);
          var len = R.int(2, 6);
          var d1 = R.int(3, 22);
          var d2 = d1 + len - 1;
          var mk = MONTHS30_KO[m];
          var name = fac[0].charAt(0).toUpperCase() + fac[0].slice(1);
          var text = '**NOTICE**\n\n' + name + ' will be closed for ' + rea[0] + ' from ' + m + ' ' + d1 + ' to ' + m + ' ' + d2 + '. We are sorry for any inconvenience.';
          var days = [];
          for (var d = d1; d <= d2; d++) days.push(d + '일');
          return {
            type: 'short', check: 'number', unit: '일', concept: 0,
            q: '이 공지에 따르면 ' + fac[1] + R.josa(fac[1], '은/는') + ' 며칠 동안 문을 닫습니까? 숫자만 쓰십시오.\n\n' + text,
            answer: String(len),
            wrong: [{ a: String(len - 1), why: '끝 날짜에서 처음 날짜를 빼기만 했습니다(' + d2 + ' − ' + d1 + '). 처음 날과 끝 날을 모두 세야 합니다.' }],
            explain: fac[1] + R.josa(fac[1], '은/는') + ' ' + rea[1] + ' 때문에 ' + mk + ' ' + d1 + '일부터 ' + mk + ' ' + d2 + '일까지 닫습니다. 처음 날과 끝 날을 모두 세면 ' + days.join(', ') + ', 모두 **' + len + '일**입니다.',
          };
        },
      },
      {
        id: 'sale-price',
        level: 2,
        title: '광고의 할인 조건 확인하기',
        make: function (R) {
          var g = R.pick(GOODS);
          var n = R.pick([10, 20, 30]);
          var M = R.pick([50000, 80000, 100000]);
          var m = R.pick(MONTHS30);
          var mk = MONTHS30_KO[m];
          var end = R.int(15, 25);
          var kase = R.int(0, 2); // 0 할인 받음, 1 금액 모자람, 2 기간 지남
          var A, day;
          if (kase === 1) { A = 10000 * R.int(M / 10000 - 4, M / 10000 - 1); day = R.int(1, end); }
          else { A = 10000 * R.int(M / 10000, M / 10000 + 7); day = kase === 0 ? R.int(1, end) : R.int(end + 1, end + 5); }
          var cut = A * n / 100;
          var pay = kase === 0 ? A - cut : A;
          var ad = '**' + g[2] + '**\n\nGet ' + n + '% off when you spend ' + R.fmt.num(M) + ' won or more on ' + g[0] + '. Valid from ' + m + ' 1 to ' + m + ' ' + end + '.';
          var cond = '조건은 ① ' + R.fmt.num(M) + '원 이상 살 것, ② ' + mk + ' 1일부터 ' + end + '일 사이에 살 것입니다. ';
          var explain, wrong;
          if (kase === 0) {
            explain = cond + R.fmt.num(A) + '원은 ' + R.fmt.num(M) + '원 이상이고 ' + day + '일은 기간 안이므로 ' + n + '% 할인을 받습니다. 할인 금액은 ' + R.fmt.num(A) + ' × ' + n + '% = ' + R.fmt.num(cut) + '원, 내야 할 돈은 ' + R.fmt.num(A) + ' − ' + R.fmt.num(cut) + ' = **' + R.fmt.num(pay) + '원**입니다.';
            wrong = [
              { a: String(A), why: '할인을 빼지 않았습니다. 금액과 기간 조건을 모두 만족하므로 ' + n + '% 할인을 받습니다.' },
              { a: String(cut), why: '할인 금액만 구했습니다. 내야 할 돈은 원래 금액에서 할인 금액을 뺀 것입니다.' },
            ];
          } else if (kase === 1) {
            explain = cond + R.fmt.num(A) + '원은 ' + R.fmt.num(M) + '원보다 적어서 할인을 받을 수 없습니다. 그래서 원래 금액 **' + R.fmt.num(pay) + '원**을 냅니다.';
            wrong = [{ a: String(A - cut), why: '할인을 적용했지만 산 금액이 ' + R.fmt.num(M) + '원보다 적어서 조건에 맞지 않습니다.' }];
          } else {
            explain = cond + R.fmt.num(A) + '원은 금액 조건을 만족하지만, ' + day + '일은 할인 기간(' + mk + ' ' + end + '일까지)이 지난 뒤입니다. 그래서 원래 금액 **' + R.fmt.num(pay) + '원**을 냅니다.';
            wrong = [{ a: String(A - cut), why: '할인을 적용했지만 산 날이 할인 기간(' + mk + ' ' + end + '일까지)이 지난 뒤입니다.' }];
          }
          return {
            type: 'short', check: 'number', unit: '원', concept: 1,
            q: '광고를 읽고 답하십시오. ' + mk + ' ' + day + '일에 ' + g[1] + R.josa(g[1], '을/를') + ' ' + R.fmt.num(A) + '원어치 산다면 얼마를 내야 합니까? 숫자만 쓰십시오.\n\n' + ad,
            answer: String(pay),
            wrong: wrong,
            explain: explain,
          };
        },
      },
      {
        id: 'chat-intent',
        level: 2,
        title: '메시지 대화에서 의도 파악하기',
        make: function (R) {
          var it = R.pick(INTENT);
          var pr = R.pick(PAIRS);
          if (R.bool()) pr = [pr[1], pr[0]];
          var A = pr[0], B = pr[1];
          var h = R.pick([9, 10, 11, 1, 2, 3, 4]);
          var mm = R.int(0, 57);
          var ap = h >= 9 ? 'a.m.' : 'p.m.';
          function hm(x) { return h + ':' + (x < 10 ? '0' + x : x) + ' ' + ap; }
          var t2 = hm(mm + 1);
          function sub(s) { return s.replace(/\{B\}/g, B); }
          var talk = A + ' [' + hm(mm) + ']: ' + it[0] + '\n' + B + ' [' + t2 + ']: ' + it[1];
          var m = mix(R, sub(it[2]), it[3].map(sub), it[4]);
          return {
            type: 'choice', concept: 3,
            q: 'At ' + t2 + ', what does ' + B + ' most likely mean by "' + it[1] + '"?\n\n' + talk,
            choices: m.choices,
            answer: m.answer,
            why: m.why,
            explain: '바로 앞 메시지 "' + it[0] + '"에 대한 대답으로 읽습니다. ' + it[5] + ' 정답: **' + sub(it[2]) + '**',
          };
        },
      },
    ],

    vocab: [
      { w: 'notice', m: '공지, 안내문', ex: 'Please read the notice on the board.', exm: '게시판의 공지를 읽어 주십시오.' },
      { w: 'tenant', m: '세입자, 입주자', ex: 'All tenants must park in the back lot.', exm: '모든 입주자는 뒤쪽 주차장에 주차해야 합니다.' },
      { w: 'maintenance', m: '유지 보수, 점검', ex: 'The website will be down for maintenance tonight.', exm: '오늘 밤 점검 때문에 웹사이트가 멈춥니다.' },
      { w: 'in advance', m: '미리', ex: 'Please book your table in advance.', exm: '자리를 미리 예약해 주십시오.' },
      { w: 'inconvenience', m: '불편', ex: 'We are sorry for the inconvenience.', exm: '불편을 드려 죄송합니다.' },
      { w: 'valid', m: '유효한', ex: 'This coupon is valid until March 31.', exm: '이 쿠폰은 3월 31일까지 유효합니다.' },
      { w: 'eligible', m: '자격이 있는', ex: 'Only full-time staff are eligible for the program.', exm: '정규직 직원만 그 프로그램에 참여할 자격이 있습니다.' },
      { w: 'exclude', m: '제외하다', ex: 'The price excludes delivery.', exm: '그 가격에는 배송비가 빠져 있습니다.' },
      { w: 'combine', m: '합치다, 함께 쓰다', ex: 'This offer cannot be combined with other discounts.', exm: '이 혜택은 다른 할인과 함께 쓸 수 없습니다.' },
      { w: 'purchase', m: '구매; 구매하다', ex: 'Keep the receipt for your purchase.', exm: '구매한 물건의 영수증을 보관하십시오.' },
      { w: 'complimentary', m: '무료의', ex: 'Guests receive a complimentary breakfast.', exm: '투숙객은 무료 아침 식사를 받습니다.' },
      { w: 'expire', m: '(기한이) 끝나다, 만료되다', ex: 'My membership expires next month.', exm: '내 회원 자격은 다음 달에 끝납니다.' },
      { w: 'available', m: '이용할 수 있는', ex: 'Free parking is available for visitors.', exm: '방문객은 무료 주차를 이용할 수 있습니다.' },
      { w: 'session', m: '(교육·회의의) 시간, 회차', ex: 'The afternoon session starts at 2 p.m.', exm: '오후 시간은 2시에 시작합니다.' },
      { w: 'directly', m: '곧바로, 직접', ex: 'Please go directly to the fourth floor.', exm: '곧바로 4층으로 가십시오.' },
    ],
  });
})();
