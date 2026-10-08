/* 공인영어시험 기초 (토익형) · 이메일·편지 읽기
 * 이메일·편지·예문은 모두 직접 쓴 글이다(가상의 회사·인물). */
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

  // 문맥상 뜻: [굵게 표시한 문장, 정답, [오답 3], [오답 이유 3], 문장 뜻, 이 문장 속 뜻]
  var CONTEXT = [
    ['The company will **cover** the cost of your hotel room.', 'pay for', ['hide', 'report on', 'travel'],
      ['"덮어 가리다"는 cover 낱말의 기본 뜻이지만, 비용(the cost)을 덮어 가릴 수는 없습니다.', '"보도하다"는 뉴스에서 쓰는 뜻입니다(cover a story). 여기서는 회사가 호텔 비용을 내 준다는 뜻입니다.', '"(거리를) 가다"는 cover 10 kilometers 같은 문장의 뜻입니다.'],
      '회사가 호텔 객실 비용을 부담할 것입니다.', '부담하다, 돈을 내다'],
    ['This report **covers** the first three months of the year.', 'deals with', ['pays for', 'hides', 'protects'],
      ['보고서가 돈을 낼 수는 없습니다. "부담하다"는 비용이 목적어일 때의 뜻입니다.', '보고서가 석 달을 숨긴다는 말은 뜻이 통하지 않습니다.', '"(보험으로) 보장하다, 보호하다"는 보험 같은 글에서 쓰는 뜻입니다(The insurance covers fire damage). 보고서가 석 달을 보호한다는 말은 뜻이 통하지 않습니다.'],
      '이 보고서는 그해의 첫 석 달을 다룹니다.', '다루다'],
    ['We will **address** your concerns at the next meeting.', 'deal with', ['mail', 'locate', 'label'],
      ['"우편으로 보내다"는 주소(address)에서 떠올린 뜻이지만 걱정거리(concerns)를 우편으로 보낼 수는 없습니다.', '"위치를 찾다"는 address 낱말의 뜻이 아닙니다. 주소라는 명사 뜻에서 잘못 넓힌 것입니다.', '"라벨을 붙이다"도 주소 쓰기에서 떠올린 뜻입니다. 문장에서는 걱정거리를 처리한다는 뜻입니다.'],
      '다음 회의에서 귀하의 우려 사항을 처리하겠습니다.', '(문제를) 처리하다, 다루다'],
    ['The special offer **runs** until the end of May.', 'continues', ['manages', 'races', 'flows'],
      ['"운영하다"는 사람이 회사·가게를 맡을 때의 뜻입니다(run a shop). 주어는 할인 행사입니다.', '"달리다"는 기본 뜻이지만 할인 행사가 달릴 수는 없습니다.', '"흐르다"는 물이 주어일 때의 뜻입니다(The river runs to the sea).'],
      '특별 할인은 5월 말까지 계속됩니다.', '계속되다, 이어지다'],
    ['Ms. Lim **runs** a small design firm in Daejeon.', 'manages', ['continues', 'races', 'flows'],
      ['"계속되다"는 기간을 말할 때의 뜻입니다(The sale runs until May). 이 문장에는 목적어(a small design firm)가 있습니다.', '"달리다"로는 뒤의 목적어(디자인 회사)와 뜻이 이어지지 않습니다.', '"흐르다"는 물·액체가 주어일 때의 뜻입니다.'],
      '임 씨는 대전에서 작은 디자인 회사를 운영합니다.', '운영하다, 경영하다'],
    ['We are sorry, but our store no longer **carries** that brand.', 'sells', ['lifts', 'supports', 'wins'],
      ['"들어 올리다"는 짐을 나를 때의 뜻입니다. 가게가 상표를 들어 올린다는 말은 어색합니다.', '"(무게를) 지탱하다"는 기둥·다리 같은 것이 주어일 때의 뜻입니다.', '"(선거·표결에서) 이기다"는 carry the vote 같은 표현의 뜻입니다.'],
      '죄송하지만 저희 가게는 더 이상 그 상표를 취급하지 않습니다.', '(상품을) 갖추어 팔다, 취급하다'],
    ['The hotel will **honor** your coupon even though it expired yesterday.', 'accept', ['respect', 'praise', 'remember'],
      ['"존경하다"는 사람이 목적어일 때의 뜻입니다. 쿠폰을 존경할 수는 없습니다.', '"칭찬하다, 기리다"도 사람·업적이 목적어일 때 씁니다.', '"기억하다"는 honor 낱말의 뜻이 아닙니다.'],
      '쿠폰이 어제 만료되었지만 호텔은 그 쿠폰을 받아 줄 것입니다.', '(약속·쿠폰 등을) 인정하다, 받아 주다'],
    ['Please check the sales **figures** before the meeting.', 'numbers', ['shapes', 'people', 'drawings'],
      ['"모양, 형체"도 figure 낱말의 뜻이지만 판매(sales)와 이어지지 않습니다.', '"인물"은 a public figure 같은 표현의 뜻입니다. 판매 인물이라는 말은 어색합니다.', '"그림, 도표"는 Figure 1처럼 책에서 쓰는 뜻입니다. 판매와 이어지는 것은 수치입니다.'],
      '회의 전에 판매 수치를 확인해 주십시오.', '수치, 숫자'],
    ['We **appreciate** your patience during the repairs.', 'are grateful for', ['raise the value of', 'realize', 'enjoy'],
      ['"값이 오르다, 가치를 높이다"는 집·주식 같은 재산에 쓰는 뜻입니다(The house has appreciated). 기다림(patience)의 값을 올린다는 말은 뜻이 통하지 않습니다.', '"깨닫다, 인식하다"는 appreciate the difficulty(어려움을 이해하다)처럼 상황을 목적어로 할 때의 뜻입니다. 이 문장은 기다려 준 것을 깨닫는다는 말이 아니라 고맙다는 인사입니다.', '"감상하다, 즐기다"는 음악·미술이 목적어일 때의 뜻입니다. 손님이 기다려 준 것(patience)을 즐긴다는 말은 어색합니다.'],
      '수리하는 동안 기다려 주셔서 감사합니다.', '고마워하다'],
    ['The new office can **accommodate** up to 80 workers.', 'have room for', ['provide lodging for', 'agree with', 'adjust to'],
      ['"숙박을 제공하다"는 호텔·숙소가 손님을 묵게 할 때의 뜻입니다. 사무실은 잠잘 곳이 아닙니다.', '"~에 동의하다"는 accommodate 낱말의 뜻이 아닙니다. 비슷해 보이는 "(요구를) 들어주다"도 accommodate a request처럼 요청이 목적어일 때의 뜻이고, 이 문장의 목적어는 직원 80명입니다.', '"~에 적응하다"는 accommodate oneself to ~ 꼴로 씁니다.'],
      '새 사무실에는 직원을 80명까지 수용할 수 있습니다.', '수용하다, (사람이 들어갈) 공간이 있다'],
    ['The new menu is expected to **draw** more customers.', 'attract', ['sketch', 'pull out', 'take out'],
      ['"그리다"는 draw 낱말의 기본 뜻이지만 손님을 그린다는 말은 어색합니다.', '"뽑다, 꺼내다"는 draw a card 같은 표현의 뜻입니다.', '"(돈을) 인출하다"는 draw money from an account의 뜻입니다.'],
      '새 메뉴가 손님을 더 많이 끌어들일 것으로 기대됩니다.', '끌어들이다, 모으다'],
    ['Our sales team **met** its goal for the third quarter.', 'reached', ['was introduced to', 'gathered', 'faced'],
      ['"~를 처음 만나 소개받다"는 사람이 목적어일 때의 뜻입니다.', '"모이다"는 사람들이 목적어 없이 모일 때의 뜻입니다(The team met at noon).', '"(어려움에) 부딪히다"는 meet a problem 같은 표현에서 쓰지만, 목표(goal)와는 이어지지 않습니다.'],
      '우리 영업팀은 3분기 목표를 달성했습니다.', '(목표·요구를) 달성하다, 충족하다'],
    ['The museum will **hold** a special exhibition in July.', 'host', ['grip', 'keep', 'contain'],
      ['"쥐다"는 손으로 잡을 때의 뜻입니다.', '"보관하다, 계속 갖고 있다"는 hold a seat 같은 표현의 뜻입니다. 전시회를 보관한다는 말은 어색합니다.', '"(사람·물건을) 담다, 수용하다"는 The hall holds 200 people 같은 문장의 뜻입니다.'],
      '그 박물관은 7월에 특별 전시회를 열 것입니다.', '(행사를) 열다, 개최하다'],
    ['Please **settle** your bill before you check out.', 'pay', ['calm down', 'move into', 'decide on'],
      ['"진정하다"는 settle down 표현의 뜻입니다.', '"(새 곳에) 자리 잡다"는 settle in a new city 같은 표현의 뜻입니다.', '"결정하다"는 settle on a date 같은 표현의 뜻입니다. 계산서(bill)는 결정하는 것이 아니라 지불하는 것입니다.'],
      '체크아웃하기 전에 요금을 정산해 주십시오.', '(요금을) 지불하다, 정산하다'],
  ];

  // 표현의 쓰임
  var FUNC = ['글을 쓴 목적 밝히기', '받는 사람에게 요청하기', '함께 보낸 것(첨부·동봉) 알리기', '보내는 사람의 후속 조치·끝인사'];
  var FUNC_WHY = [
    '글을 쓴 목적은 I\'m writing to ~, This is to inform you ~, in response to ~ 같은 표현으로 밝힙니다. 이 문장은 그런 표현이 아닙니다.',
    '요청은 받는 사람(you)에게 무엇을 해 달라고 하는 문장입니다. Please, Could you, I would appreciate it if 뒤에 받는 사람이 할 동작이 옵니다.',
    '첨부·동봉은 attached, enclosed 같은 말로 함께 보낸 파일·서류를 알리는 문장입니다. 이 문장에는 함께 보낸 것이 없습니다.',
    '후속 조치는 보내는 사람(I, We)이 앞으로 할 일(follow up, get back to you, call)이나 답장을 기다린다는 끝인사입니다.',
  ];
  // [표현, 쓰임 번호, 뜻]
  var EXPR = [
    ['I\'m writing to confirm your reservation for May 3.', 0, '5월 3일 예약을 확인하려고 이메일을 드립니다.'],
    ['This letter is to inform you that your membership will expire next month.', 0, '귀하의 회원 자격이 다음 달에 끝난다는 것을 알려 드리려고 이 편지를 씁니다.'],
    ['I am writing in response to your inquiry about our cleaning services.', 0, '저희 청소 서비스에 관한 문의에 답하려고 씁니다.'],
    ['I am writing regarding the delay in your order.', 0, '주문 배송이 늦어진 일에 관해 씁니다.'],
    ['Could you send me the final draft by Thursday?', 1, '최종 원고를 목요일까지 보내 주시겠습니까?'],
    ['I would appreciate it if you could reply by the end of the week.', 1, '이번 주말까지 답장해 주시면 감사하겠습니다.'],
    ['We ask that all visitors sign in at the front desk.', 1, '모든 방문객은 안내 데스크에서 방문 기록을 남겨 주십시오.'],
    ['Please return the signed contract to our office by Monday.', 1, '서명한 계약서를 월요일까지 저희 사무실로 보내 주십시오.'],
    ['Please find attached the minutes from yesterday\'s meeting.', 2, '어제 회의록을 첨부합니다.'],
    ['I have attached a copy of the signed contract.', 2, '서명한 계약서 사본을 첨부했습니다.'],
    ['Enclosed is a check for the full amount.', 2, '전액에 해당하는 수표를 동봉합니다.'],
    ['Attached is the updated price list for next year.', 2, '내년 가격표 수정본을 첨부합니다.'],
    ['I will follow up with you next week about the schedule.', 3, '일정에 관해 다음 주에 다시 연락드리겠습니다.'],
    ['I\'ll get back to you by Friday with the final prices.', 3, '금요일까지 최종 가격을 알려 드리겠습니다.'],
    ['I look forward to hearing from you.', 3, '답장을 기다리겠습니다.'],
    ['I will call you on Monday to discuss the details.', 3, '자세한 내용을 의논하려고 월요일에 전화드리겠습니다.'],
  ];

  var MONTHS = ['March', 'April', 'May', 'June', 'September', 'October', 'November'];
  var MONTHS_KO = { March: '3월', April: '4월', May: '5월', June: '6월', September: '9월', October: '10월', November: '11월' };
  var EVENTS = [['training session', '연수'], ['client lunch', '고객 점심 모임'], ['safety workshop', '안전 워크숍'], ['budget meeting', '예산 회의'], ['team dinner', '팀 회식']];
  var TIMES = ['9 a.m.', '10 a.m.', '11 a.m.', '1 p.m.', '2 p.m.', '3 p.m.', '4 p.m.'];
  var PLACES = ['Room 201', 'Room 305', 'Room 410', 'the main hall', 'the second-floor lounge'];
  var PLACES_KO = { 'Room 201': '201호', 'Room 305': '305호', 'Room 410': '410호', 'the main hall': '대강당', 'the second-floor lounge': '2층 휴게실' };
  // '10 a.m.' → '오전 10시'
  function timeKo(t) {
    var m = /^(\d+) (a|p)\.m\.$/.exec(t);
    return (m[2] === 'a' ? '오전 ' : '오후 ') + m[1] + '시';
  }

  // 문제에 쓰는 지문 (모두 직접 쓴 가상의 글 — 문제마다 지문을 함께 보인다)
  var MAIL_A = 'To: All sales staff\nFrom: Jiwon Park, Office Manager\nSubject: Change to the customer service training\n\n' +
    'Dear team,\n\n' +
    'I\'m writing to let you know that the customer service training scheduled for Friday, May 16, has been moved to Monday, May 19. It will still begin at 10 a.m., but it will be held in Room 305 instead of Room 201, because Room 201 is being repainted.\n\n' +
    'Please find attached the updated agenda. If you are unable to attend on the new date, please let me know by Wednesday so that I can arrange another session for you. Lunch will be provided for all participants.\n\n' +
    'Thank you,\nJiwon Park';
  var MAIL_B = 'Dear Mr. Kang,\n\n' +
    'Thank you for your letter of March 3 regarding the coffee maker you bought from our online store. We are sorry to hear that it stopped working after only two weeks.\n\n' +
    'As you requested, we will replace the machine free of charge. Please return the damaged item using the enclosed shipping label; you will not have to pay for postage. Once we receive it, we will send you a new coffee maker within five business days. We have also added a 20,000-won store credit to your account for the trouble.\n\n' +
    'If you have any questions, please do not hesitate to contact our customer service team at 010-0000-0000.\n\n' +
    'Sincerely,\nHana Yoon\nCustomer Relations Manager, Daon Home Goods';
  var MAIL_C = 'Subject: Your registration\n\nDear Ms. Lim,\n\n' +
    'Thank you for signing up for the Spring Marketing Conference, which will take place on April 24 and 25 at the Lakeview Hotel. To receive the early registration price of 150,000 won, please complete your payment by March 31. After that date, the price will rise to 180,000 won.\n\n' +
    'Best regards,\nConference Office';
  var MAIL_D = 'Subject: Following up on the furniture fair\n\nDear Mr. Ahn,\n\n' +
    'It was a pleasure meeting you at the Spring Furniture Fair last week. I hope you had a safe trip back to Gwangju.\n\n' +
    'As we discussed at our booth, I am sending you our latest catalog and price list. I would also like to invite you to visit our factory in Incheon so that you can see our production process in person. Please let me know which dates would suit you next month.\n\n' +
    'Best regards,\nSujin Choi\nSales Director, Hanul Furniture';
  var MAIL_E = 'Dear Ms. Moon,\n\n' +
    'Thank you for agreeing to speak at our staff workshop on June 12. I will reserve a parking space for you near the main entrance, and I will e-mail you a map of the building the day before the event. Could you send me the title of your talk by June 5 so that we can include it in the program? Also, please let me know if you will need a projector.\n\n' +
    'Best regards,\nDaniel Kim\nHuman Resources';
  var MAIL_F = 'Subject: Correction to invoice #2087\n\nDear Mr. Bae,\n\n' +
    'In my e-mail yesterday, I said that the total for your order of office chairs was 450,000 won. I am sorry, but that amount was incorrect. The correct total is 405,000 won, because the 10 percent discount for returning customers was not included. I have attached the corrected invoice. Please make your payment by June 30.\n\n' +
    'Regards,\nYerin Jung, Billing Department';
  var MAIL_G = 'Hi Minho,\n\n' +
    'Thanks for sending the draft of the brochure. I have looked through it, and it looks great overall. I have a few small changes for the second page, which I will mark and send back to you by tomorrow morning. Let me know if you would rather discuss them on the phone.\n\n' +
    'Seoyeon';

  Tutor.registerUnit({
    id: 'eng-u-toeic-09',
    course: 'eng-u-toeic',
    title: '이메일·편지 읽기',
    summary: '업무 이메일과 편지에서 글을 쓴 목적, 요청 사항, 날짜·시간 같은 세부 정보를 빠르게 찾습니다.',
    goals: [
      '제목과 첫 문단의 신호 표현(I\'m writing to ~)으로 글을 쓴 목적을 찾을 수 있다.',
      '요청 표현을 보고 받는 사람이 할 일을 찾을 수 있다.',
      '날짜·시간·장소·금액을 찾고, 바뀐 정보와 예전 정보를 구별할 수 있다.',
      '첨부·후속 조치 표현을 알아보고, 문맥 속 낱말의 뜻을 고를 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '글의 목적 찾기',
        body: '이메일·편지 문제에서 가장 자주 묻는 것은 **글을 쓴 목적**입니다(Why was the e-mail written? / What is the purpose of the letter?). 목적은 대개 **제목(Subject)과 첫 문단**, 특히 첫 한두 문장에 있습니다.\n\n' +
          '| 신호 표현 | 뜻 | 목적 |\n|---|---|---|\n' +
          '| I\'m writing to **confirm** ~ | ~을 확인하려고 씁니다 | 확인 |\n' +
          '| I\'m writing **regarding** ~ / **in response to** ~ | ~에 관해 / ~에 답하여 씁니다 | 문의·답장 |\n' +
          '| This is to **inform** you that ~ | ~을 알려 드립니다 | 알림 |\n' +
          '| Thank you for your **inquiry** about ~ | ~에 관해 문의해 주셔서 감사합니다 | 문의에 대한 답 |\n' +
          '| I would like to **apply for** ~ | ~에 지원하고 싶습니다 | 지원 |\n\n' +
          '첫 문장이 인사(I hope you are doing well.)나 감사라면 그다음 문장까지 읽습니다. 글 끝의 Let me know if ~, I look forward to ~ 같은 문장은 마무리 인사이지 목적이 아닙니다.\n\n' +
          '> 💡 보기는 지문의 말을 바꿔 씁니다(paraphrase). 예를 들어 지문의 confirm a reservation(예약을 확인하다) 표현이 보기에서는 verify a booking 꼴로 나옵니다. 같은 낱말이 아니라 같은 뜻을 찾으십시오.',
        easy: '이메일을 택배 상자라고 생각해 보십시오. 상자 겉의 송장(제목)과 뚜껑을 열자마자 보이는 쪽지(첫 문단)에 "무엇을 왜 보냈는지"가 적혀 있습니다. 상자 바닥까지 뒤질 필요가 없습니다.\n\n' +
          '그래서 목적을 묻는 문제가 나오면 제목과 첫 문단의 **I\'m writing to ~** 뒤를 먼저 읽습니다. to 뒤의 동사(confirm, ask, inform, apologize)가 곧 목적입니다.',
        check: {
          type: 'choice',
          q: '다음 이메일을 쓴 목적은 무엇입니까?\n\nSubject: Your order #4021\n\nDear Ms. Han,\n\nI\'m writing to let you know that one item in your order is out of stock. We expect to receive more next week. Please let us know if you would like to wait or cancel the item.',
          choices: ['새로 나온 상품을 할인된 가격에 소개하려고', '주문한 물건 하나가 품절이라고 알리려고', '주문 전체를 취소하는 방법을 자세히 안내하려고'],
          answer: 1,
          why: [
            '새 상품 이야기는 없습니다. 이미 주문한 물건에 관한 글입니다.',
            '',
            '취소는 글 끝에서 고를 수 있는 선택지 하나일 뿐입니다. 글을 쓴 이유는 첫 문장의 I\'m writing to let you know ~ 뒤에 있습니다.',
          ],
          explain: '첫 문장 I\'m writing to let you know that one item in your order is out of stock(주문하신 물건 하나가 품절되었음을 알려 드립니다)이 목적입니다.',
        },
      },
      {
        title: '요청 사항과 받는 사람이 할 일',
        body: '"받는 사람은 무엇을 하라고 요청받습니까?(What is the recipient asked to do?)" 문제는 **요청 표현**을 찾으면 풀립니다. 요청은 대개 목적을 밝힌 뒤, **글의 중간이나 끝**에 나옵니다.\n\n' +
          '- **Please** + 동사원형: Please **sign** the form.\n' +
          '- **Could you / Would you** + 동사원형?: Could you **send** me the report?\n' +
          '- **I would appreciate it if** you could ~: ~해 주시면 감사하겠습니다\n' +
          '- **We ask that** you ~ / You are **required to** ~ / **Be sure to** ~\n\n' +
          '요청 표현 바로 뒤의 동사(sign, send, submit, call, confirm)와 기한(by Friday, no later than May 3)을 함께 확인합니다. 보기에서는 이 동사가 다른 말로 바뀌어 나옵니다(submit → hand in, call → contact by phone).\n\n' +
          '> ⚠️ 보내는 사람이 **자기가 할 일**(I will send ~, We will contact ~)과 받는 사람이 **할 일**(Please send ~)을 헷갈리지 마십시오. 주어가 I·We인지, 생략된 you인지 확인합니다.',
        easy: '요청 문장은 "부탁 단추"가 달린 문장입니다. Please, Could you, I would appreciate it if 같은 말이 부탁 단추입니다. 단추를 찾고, 바로 뒤의 동사에 동그라미를 치면 받는 사람이 할 일이 나옵니다.\n\n' +
          '예: Could you **return** the signed contract by Monday? → 할 일: 서명한 계약서를 월요일까지 돌려보내기',
        check: {
          type: 'ox',
          q: 'We will send you a new password within an hour.\n\n이 문장은 받는 사람에게 할 일을 요청하는 문장입니다.',
          answer: false,
          explain: '주어가 We(보내는 쪽)이고 will send(보낼 것이다)이므로 보내는 쪽이 **자기가 할 일**을 알리는 문장입니다. 요청이라면 Please ~, Could you ~처럼 받는 사람이 할 동작이 나옵니다.',
        },
      },
      {
        title: '날짜·시간·장소·금액 확인하기',
        body: '세부 정보 문제(When / Where / How much)는 질문의 핵심어를 들고 지문에서 **그 낱말이나 숫자를 찾은 뒤 앞뒤를 읽는** 방식으로 풉니다.\n\n' +
          '가장 흔한 함정은 **바뀐 정보**입니다. 일정·장소·금액이 바뀌었다는 글에는 예전 정보와 새 정보가 함께 나옵니다.\n\n' +
          '| 예전 정보의 신호 | 새 정보의 신호 |\n|---|---|\n' +
          '| originally, was scheduled for, previously | has been moved to, instead, now, has been changed to |\n\n' +
          '예: The meeting **originally scheduled for** May 3 **has been moved to** May 5. → 회의는 5월 5일에 열립니다.\n\n' +
          '또 한 글 안에 날짜가 여러 개 나오기도 합니다(행사 날짜, 신청 마감일, 결제일). 질문이 **무엇의** 날짜를 묻는지 먼저 확인하십시오.\n\n' +
          '> 💡 보기에서는 숫자도 바꿔 말합니다: by noon → before 12 p.m., two weeks → 14 days, half price → 50 percent off',
        easy: '기차역 전광판을 떠올려 보십시오. "10시 30분 출발 → 11시 30분으로 지연"이라고 적혀 있으면 우리가 타야 하는 시각은 11시 30분입니다. 화살표 뒤가 새 정보입니다.\n\n' +
          '이메일도 같습니다. originally(원래), previously(이전에)가 붙은 정보는 지나간 정보이고, moved to, instead, now 뒤가 지금 맞는 정보입니다.',
        check: {
          type: 'choice',
          q: '예산 회의는 언제 열립니까?\n\nThe budget meeting, originally scheduled for Tuesday at 10 a.m., will now take place on Thursday at the same time.',
          choices: ['Tuesday at 10 a.m.', 'Thursday at 11 a.m.', 'Thursday at 10 a.m.'],
          answer: 2,
          why: [
            'originally(원래) 뒤의 정보는 바뀌기 전 일정입니다.',
            '시간은 at the same time(같은 시간), 곧 오전 10시 그대로입니다.',
            '',
          ],
          explain: 'originally 뒤의 화요일 오전 10시는 예전 일정이고, will now take place on Thursday at the same time이 새 일정입니다. 요일만 목요일로 바뀌고 시간은 같으므로 **목요일 오전 10시**입니다.',
        },
      },
      {
        title: '첨부·후속 조치 표현',
        body: '업무 이메일의 끝부분에는 **함께 보낸 것**을 알리거나 **다음에 할 일**을 정하는 굳은 표현이 나옵니다. 이 표현을 알아 두면 "이메일에 무엇이 함께 왔습니까?", "보내는 사람은 다음에 무엇을 하겠습니까?" 문제를 바로 풉니다.\n\n' +
          '| 표현 | 뜻 |\n|---|---|\n' +
          '| Please find attached ~ / I have attached ~ / Attached is ~ | ~을 첨부합니다 |\n' +
          '| Please find enclosed ~ / Enclosed is ~ | (편지에) ~을 동봉합니다 |\n' +
          '| Let me know if ~ | ~하면 알려 주십시오 |\n' +
          '| Please do not hesitate to contact me. | 언제든 연락 주십시오 |\n' +
          '| I will follow up with you ~ / I\'ll get back to you ~ | ~에 다시 연락드리겠습니다 |\n' +
          '| I look forward to hearing from you. | 답장을 기다리겠습니다 |\n\n' +
          'attached 낱말은 주로 이메일에 붙인 파일에, enclosed 낱말은 봉투에 함께 넣은 종이 서류에 씁니다.\n\n' +
          '> ⚠️ Please find attached ~ 문장의 find 동사는 "찾다"가 아니라 "(첨부한 것을) 확인해 주십시오"라는 굳은 표현입니다. 받는 사람에게 무엇을 찾아 달라는 요청이 아닙니다.',
        easy: '택배를 보낼 때 "상자 안에 설명서도 넣었어요"(첨부), "도착하면 연락 주세요"(후속 조치)라는 쪽지를 붙이지요? 이메일 끝부분이 바로 그 쪽지입니다.\n\n' +
          'attached, enclosed 같은 말이 보이면 "함께 보낸 것", let me know, contact, follow up 같은 말이 보이면 "다음에 할 일"을 떠올리십시오.',
        check: {
          type: 'short', check: 'text',
          q: '빈칸에 알맞은 한 낱말을 쓰십시오.\n\nPlease find ___ the revised price list.\n(수정한 가격표를 첨부합니다.)',
          answer: ['attached', 'enclosed', 'herewith'],
          wrong: [
            { a: 'attach', why: '동사원형은 이 자리에 오지 않습니다. "첨부된"이라는 뜻의 과거분사 꼴을 씁니다.' },
            { a: 'attachment', why: '명사 꼴입니다. Please find ___ the ~ 표현에는 과거분사 꼴이 들어갑니다.' },
          ],
          explain: 'Please find **attached** ~(~을 첨부합니다)는 굳은 표현입니다. 종이 편지라면 Please find **enclosed** ~(~을 동봉합니다)도 씁니다.',
        },
      },
      {
        title: '문맥상 뜻이 같은 낱말 고르기',
        body: '"The word "cover" in paragraph 1, line 2, is closest in meaning to" 같은 문제는 **사전의 첫 뜻이 아니라 그 문장 속 뜻**을 묻습니다. 보기에는 같은 낱말의 다른 뜻들이 함정으로 들어 있습니다.\n\n' +
          '1. 그 낱말이 있는 문장을 읽고 뜻을 우리말로 짐작합니다.\n' +
          '2. 보기를 **하나씩 그 자리에 넣어** 읽어 봅니다.\n' +
          '3. 문장의 뜻이 그대로 유지되는 보기를 고릅니다.\n\n' +
          '| 문장 | 이 문장 속 뜻 |\n|---|---|\n' +
          '| The company will **cover** your travel costs. | pay for (부담하다) |\n' +
          '| The report **covers** sales in Asia. | deals with (다루다) |\n' +
          '| We need to **address** this problem soon. | deal with (처리하다) |\n' +
          '| The offer **runs** until June 30. | continues (계속되다) |\n' +
          '| Ms. Oh **runs** a bakery. | manages (운영하다) |\n\n' +
          '> ⚠️ 낱말을 보자마자 가장 먼저 떠오르는 뜻을 고르면 함정에 빠집니다. 업무 이메일에서 cover 동사가 "덮다"로 쓰이는 일은 드뭅니다.',
        easy: '낱말은 여러 역할을 맡는 배우와 같습니다. 같은 배우 cover라도 이 장면에서는 "돈을 내는 사람", 저 장면에서는 "내용을 다루는 사람"을 연기합니다. 그래서 낱말만 보지 말고 **장면(문장)**을 보아야 합니다.\n\n' +
          '가장 쉬운 방법은 보기를 그 낱말 자리에 하나씩 끼워 넣고 읽어 보는 것입니다. 문장이 어색하지 않고 뜻이 그대로인 것이 정답입니다.',
        check: {
          type: 'choice',
          q: '굵게 표시한 낱말과 뜻이 가장 가까운 것은 무엇입니까?\n\nIf you have any questions, our help desk can be **reached** at 010-0000-0000.',
          choices: ['arrived at', 'stretched out', 'contacted'],
          answer: 2,
          why: [
            '"~에 도착하다"는 reach the station(역에 도착하다)처럼 장소가 목적어일 때의 뜻입니다. 전화번호로 안내 데스크에 도착할 수는 없습니다.',
            '"(손을) 뻗다"는 reach for the cup(컵 쪽으로 손을 뻗다) 같은 표현의 뜻입니다.',
            '',
          ],
          explain: '전화번호(at 010-0000-0000)와 함께 쓰였으므로 reach 동사는 "(전화 등으로) 연락하다"라는 뜻입니다. 그 자리에 넣어 뜻이 그대로인 것은 **contacted**입니다: our help desk can be contacted at 010-0000-0000.(궁금한 것이 있으면 이 번호로 안내 데스크에 연락하실 수 있습니다.)',
        },
      },
    ],

    examples: [
      {
        q: '다음 이메일을 읽고 물음에 답하십시오.\n\nTo: Daniel Cho\nFrom: Mina Seo\nSubject: Missing receipt\n\nDear Mr. Cho,\n\nThank you for submitting your travel expense report for the Busan trip. I\'m writing because one receipt is missing. Your report lists a taxi fare of 32,000 won on April 8, but we could not find the receipt for it. Could you send us a copy of it by Friday so that we can process your reimbursement?\n\nBest regards,\nMina Seo, Accounting Team\n\nWhat is Mr. Cho asked to do?\n(A) Book a taxi\n(B) Send a copy of a receipt\n(C) Visit the accounting team\n(D) Change his travel dates',
        steps: [
          '질문의 asked to do 표현은 "받는 사람이 할 일"을 묻는 신호입니다. 요청 표현을 찾습니다.',
          '첫 문장은 감사 인사이고, 둘째 문장 I\'m writing because one receipt is missing(영수증 하나가 빠져서 씁니다)이 목적입니다.',
          '요청 표현 Could you ~? 뒤의 동사 send 부분과 목적어 a copy of it(그 영수증의 사본)을 확인합니다. 기한은 by Friday(금요일까지)입니다.',
          '(B) Send a copy of a receipt 보기가 지문과 같은 뜻입니다. (A)는 지문에 나온 taxi 낱말을 그대로 써서 만든 함정이고, (C)와 (D)는 지문에 없는 내용입니다.',
        ],
        answer: '(B) Send a copy of a receipt',
      },
      {
        q: '굵게 표시한 낱말과 뜻이 가장 가까운 것을 고르십시오.\n\nPlease review the sales **figures** in the attached file before the meeting.\n\n(A) shapes (B) people (C) numbers (D) drawings',
        steps: [
          'figure 낱말에는 모양, 인물, 그림(도표), 수치 같은 여러 뜻이 있습니다. 문장 속 뜻을 찾아야 합니다.',
          '앞에 sales(판매)가 있고 첨부 파일에서 확인하라고 합니다. "판매 ○○"로 자연스러운 것은 "판매 수치"입니다.',
          '보기를 넣어 봅니다. the sales numbers(판매 수치)는 자연스럽고, the sales shapes·people·drawings는 뜻이 통하지 않습니다.',
        ],
        answer: '(C) numbers',
      },
    ],

    terms: [
      { term: '목적 문제', def: '글을 쓴 이유를 묻는 문제입니다. 제목과 첫 문단, 특히 I\'m writing to ~ 같은 신호 표현에서 답을 찾습니다.' },
      { term: '요청 표현', def: '받는 사람에게 무엇을 해 달라고 부탁하는 표현입니다. 예: Please ~, Could you ~?, I would appreciate it if you could ~' },
      { term: '수신자(recipient)', def: '이메일·편지를 받는 사람입니다. 머리글의 To 칸이나 Dear 뒤에 이름이 나옵니다.' },
      { term: '첨부(attached)', def: '이메일에 파일을 붙여 함께 보내는 것입니다. 예: Please find attached the report.' },
      { term: '동봉(enclosed)', def: '편지 봉투에 서류를 함께 넣어 보내는 것입니다. 예: Enclosed is a copy of the invoice.' },
      { term: '후속 조치(follow-up)', def: '앞의 일에 이어서 하는 다음 행동입니다. 예: I will follow up with you next week.(다음 주에 다시 연락드리겠습니다.)' },
      { term: '바꿔 말하기(paraphrase)', def: '같은 뜻을 다른 낱말·구조로 나타내는 것입니다. 정답 보기는 지문의 말을 바꿔 말한 경우가 많습니다. 예: reschedule → change the date' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '다음 이메일을 쓴 목적은 무엇입니까?\n\n' + MAIL_A,
        choices: [
          'To announce changes to a training session',
          'To invite staff to a lunch party in Room 201',
          'To ask staff to help repaint an office',
          'To introduce the new office manager',
        ],
        answer: 0,
        why: [
          '',
          'Lunch will be provided는 교육에서 점심을 준다는 세부 정보일 뿐이고, 201호는 칠하는 중이라 쓰지 않는 방입니다.',
          'Room 201 is being repainted는 장소를 바꾼 까닭입니다. 직원에게 칠을 도와 달라고 하지 않았습니다.',
          '보내는 사람의 직함(Office Manager)이 나올 뿐, 새 관리자를 소개하는 내용은 없습니다.',
        ],
        explain: '첫 문장 I\'m writing to let you know that the customer service training ~ has been moved to Monday, May 19.에서 교육 일정(날짜와 장소)이 바뀌었음을 알리는 것이 목적입니다. 보기에서는 has been moved 부분이 changes 낱말로 바뀌어 나왔습니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 2,
        q: '고객 서비스 교육은 언제 열립니까?\n\n' + MAIL_A,
        choices: ['On Friday, May 16, at 10 a.m.', 'On Monday, May 19, at 10 a.m.', 'On Monday, May 19, at noon', 'On Wednesday, at 10 a.m.'],
        answer: 1,
        why: [
          'scheduled for Friday, May 16 부분은 바뀌기 전의 날짜입니다. has been moved to 뒤가 새 날짜입니다.',
          '',
          '시간은 It will still begin at 10 a.m.(여전히 오전 10시에 시작) 부분입니다. 점심(Lunch)은 교육 중에 주는 것입니다.',
          '수요일(Wednesday)은 새 날짜에 참석할 수 없는 사람이 알려야 하는 기한입니다.',
        ],
        explain: 'has been moved to Monday, May 19 부분이 새 날짜이고, It will still begin at 10 a.m. 문장의 still은 시간이 그대로라는 뜻입니다. 그래서 **5월 19일 월요일 오전 10시**입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', unit: '호', concept: 2,
        q: '고객 서비스 교육은 몇 호실에서 열립니까? 방 번호(숫자)만 쓰십시오.\n\n' + MAIL_A,
        answer: '305',
        wrong: [{ a: '201', why: 'in Room 305 instead of Room 201 부분은 "201호 대신 305호에서"라는 뜻입니다. instead of 뒤는 쓰지 않게 된 장소입니다.' }],
        explain: 'it will be held in Room 305 instead of Room 201(201호 대신 305호에서 열립니다) 문장에서 새 장소는 **305호**입니다. 201호는 페인트칠 중이라 쓰지 않습니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 1,
        q: '새 날짜에 참석할 수 없는 직원은 무엇을 해야 합니까?\n\n' + MAIL_A,
        choices: ['Tell Ms. Park by Wednesday', 'Attend the training on Friday instead', 'Find another room for the training', 'Bring their own lunch to the session'],
        answer: 0,
        why: [
          '',
          '금요일(Friday)은 바뀌기 전 날짜라서 그날에는 교육이 없습니다.',
          '방은 이미 정해졌습니다(305호). 직원에게 방을 찾으라고 하지 않았습니다.',
          'Lunch will be provided는 점심을 준다는 말이라 도시락을 가져올 필요가 없습니다.',
        ],
        explain: '요청 표현 If you are unable to attend on the new date, **please let me know by Wednesday** ~(새 날짜에 참석할 수 없으면 수요일까지 알려 주십시오)가 답입니다. let me know 표현이 보기에서는 Tell Ms. Park 꼴로 바뀌었습니다.',
      },
      {
        id: 'p5', level: 1, type: 'ox', concept: 3,
        q: 'I\'ll get back to you by Friday.\n\n이 문장은 받는 사람에게 금요일까지 답장을 보내 달라고 요청하는 문장입니다.',
        answer: false,
        explain: 'get back to you는 "(제가) 당신에게 다시 연락하다"라는 뜻입니다. 주어가 I(보내는 사람)이므로 **보내는 사람이 앞으로 할 일**(후속 조치)입니다. 받는 사람에게 답장을 부탁하려면 Please reply by Friday.처럼 씁니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 4,
        q: '이메일의 둘째 문단에 나온 arrange 낱말과 뜻이 가장 가까운 것은 무엇입니까?\n\n' + MAIL_A,
        choices: ['organize', 'put in order', 'rewrite for instruments', 'decorate'],
        answer: 0,
        why: [
          '',
          '"차례대로 늘어놓다"는 arrange the books(책을 정리하다) 같은 문장의 뜻입니다. 교육 시간을 차례대로 늘어놓는다는 말은 어색합니다.',
          '"(음악을) 편곡하다"는 음악이 목적어일 때의 뜻입니다.',
          '"꾸미다"는 arrange 낱말의 뜻이 아닙니다. arrange flowers(꽃꽂이하다)에서 잘못 떠올린 것입니다.',
        ],
        explain: 'so that I can arrange another session for you 부분은 "다른 교육 시간을 마련해 드릴 수 있도록"이라는 뜻입니다. 그 자리에 넣어 뜻이 그대로인 것은 **organize**(마련하다, 준비하다)입니다.',
      },
      {
        id: 'p7', level: 2, type: 'choice', concept: 0,
        q: '다음 편지를 쓴 목적은 무엇입니까?\n\n' + MAIL_B,
        choices: [
          'To respond to a complaint about a product',
          'To advertise a new line of coffee makers',
          'To ask Mr. Kang to pay for shipping costs',
          'To confirm that a refund has already been sent to Mr. Kang',
        ],
        answer: 0,
        why: [
          '',
          '새 커피 메이커는 망가진 제품을 바꿔 주는 것이지 새 상품 광고가 아닙니다.',
          'you will not have to pay for postage(우편 요금을 내지 않아도 됩니다)라고 했습니다.',
          '환불(refund)이 아니라 교환(replace)과 적립금(store credit)입니다.',
        ],
        hint: '첫 문단은 감사 인사와 사과입니다. 이 편지는 무엇에 대한 답입니까?',
        explain: 'Thank you for your letter ~ regarding the coffee maker ~(커피 메이커에 관한 편지에 감사드립니다)와 We are sorry to hear that it stopped working(고장 났다니 죄송합니다)에서, 고객이 보낸 **불만 편지에 답하는 글**임을 알 수 있습니다. 이어서 교환 방법을 안내합니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 1,
        q: '강 씨는 무엇을 하라고 요청받습니까?\n\n' + MAIL_B,
        choices: ['Send back the broken machine', 'Pay for the postage', 'Buy a new coffee maker online', 'Call the customer service team today'],
        answer: 0,
        why: [
          '',
          '우편 요금은 내지 않아도 된다고 했습니다(you will not have to pay for postage).',
          '새 커피 메이커는 회사가 무료로 보내 줍니다(free of charge).',
          'If you have any questions 뒤의 연락은 궁금한 것이 있을 때만 하면 됩니다. 꼭 해야 할 일이 아닙니다.',
        ],
        hint: 'Please로 시작하는 문장을 찾으십시오.',
        explain: '요청 표현 **Please return the damaged item** ~(망가진 제품을 보내 주십시오)이 답입니다. 보기에서는 return the damaged item 부분이 send back the broken machine 꼴로 바뀌었습니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', unit: '일', concept: 2,
        q: '회사는 망가진 제품을 받은 뒤 며칠(영업일) 안에 새 제품을 보냅니까? 숫자만 쓰십시오.\n\n' + MAIL_B,
        answer: '5',
        wrong: [{ a: '14', why: '두 주(two weeks)는 커피 메이커가 고장 나기까지 쓴 기간입니다. 새 제품을 보내는 기한은 within five business days 부분입니다.' }],
        explain: 'Once we receive it, we will send you a new coffee maker **within five business days**.(제품을 받으면 영업일 5일 안에 새 커피 메이커를 보내 드리겠습니다.) 그래서 **5일**입니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 3,
        q: '이 편지와 함께 보낸 것은 무엇입니까?\n\n' + MAIL_B,
        choices: ['A shipping label', 'A new coffee maker', 'A store credit card', 'A copy of Mr. Kang\'s first letter'],
        answer: 0,
        why: [
          '',
          '새 커피 메이커는 망가진 제품을 받은 뒤에 보냅니다. 지금 함께 보낸 것이 아닙니다.',
          '적립금(store credit)은 강 씨의 계정(account)에 넣었다고 했습니다. 카드를 보낸 것이 아닙니다.',
          '강 씨의 편지는 언급만 했을 뿐 함께 보냈다는 말이 없습니다.',
        ],
        explain: 'using the **enclosed** shipping label(동봉한 배송 라벨을 써서) 부분에서, 편지 봉투에 **배송 라벨**을 함께 넣어 보냈음을 알 수 있습니다. enclosed 낱말은 "함께 넣은"이라는 뜻입니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 2,
        q: '임 씨가 낮은 등록비를 내려면 언제까지 결제해야 합니까?\n\n' + MAIL_C,
        choices: ['By March 31', 'By April 24', 'By April 25', 'On the first day of the conference'],
        answer: 0,
        why: [
          '',
          '4월 24일은 학회가 시작하는 날입니다. 결제 기한과 다른 날짜입니다.',
          '4월 25일은 학회의 둘째 날입니다.',
          '학회 첫날(4월 24일)은 결제 기한이 아닙니다. 그때는 이미 가격이 올라 있습니다.',
        ],
        explain: '한 글에 날짜가 여러 개 나옵니다. 학회 날짜는 April 24 and 25 부분이고, 조기 등록 가격(150,000원)을 받는 결제 기한은 please complete your payment **by March 31** 부분입니다. 질문은 결제 기한을 묻습니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', unit: '원', concept: 2,
        q: '임 씨가 4월 2일에 결제한다면 등록비는 얼마입니까? 숫자만 쓰십시오.\n\n' + MAIL_C,
        answer: '180000',
        hint: '4월 2일은 결제 기한(3월 31일)보다 앞입니까, 뒤입니까?',
        wrong: [{ a: '150000', why: '150,000원은 3월 31일까지 결제할 때의 조기 등록 가격입니다. 4월 2일은 기한이 지난 뒤입니다.' }],
        explain: '조기 등록 가격 150,000원은 3월 31일까지 결제할 때만입니다. After that date, the price will rise to 180,000 won.(그 뒤에는 180,000원으로 오릅니다) 4월 2일은 기한 뒤이므로 **180,000원**입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 0,
        q: '다음 이메일을 쓴 목적은 무엇입니까?\n\n' + MAIL_D,
        choices: [
          'To follow up on a meeting and suggest a visit',
          'To ask whether Mr. Ahn got home safely from his trip',
          'To invite Mr. Ahn to a furniture fair',
          'To apologize for a late delivery of furniture',
        ],
        answer: 0,
        why: [
          '',
          'I hope you had a safe trip back to Gwangju.는 첫 문단의 인사말입니다. 인사말은 목적이 아닙니다.',
          '가구 박람회는 이미 지난주에 열렸고 거기서 만났습니다. 박람회에 초대하는 글이 아닙니다.',
          '배송이 늦어졌다는 말은 없습니다.',
        ],
        hint: '첫 문단이 인사라면 다음 문단의 첫 문장을 읽으십시오. 제목도 단서입니다.',
        explain: '첫 문단은 인사입니다. 목적은 제목(Following up on the furniture fair)과 둘째 문단에 있습니다: 박람회에서 이야기한 대로 카탈로그·가격표를 보내고, 공장 방문을 제안합니다(I would also like to invite you to visit our factory). 그래서 "만남에 이어 연락하고 방문을 제안하려고"가 답입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 1,
        q: '김 씨가 문 씨를 위해 하겠다고 한 일은 무엇입니까?\n\n' + MAIL_E,
        choices: ['Arrange parking for her', 'Send her the title of a talk', 'Bring a projector to her office', 'Pick her up at the train station'],
        answer: 0,
        why: [
          '',
          '강연 제목은 문 씨가 김 씨에게 보내야 하는 것입니다(Could you send me the title ~?). 할 일의 주인을 바꿔 읽었습니다.',
          '프로젝터는 필요한지 알려 달라고 했을 뿐, 사무실로 가져가겠다는 말은 없습니다.',
          '역으로 마중 나간다는 말은 지문에 없습니다.',
        ],
        hint: '주어가 I인 문장(보내는 사람이 할 일)과 Could you·please 문장(받는 사람이 할 일)을 나누어 보십시오.',
        explain: '보내는 사람이 할 일은 주어가 I인 문장입니다: **I will reserve a parking space for you**(주차 자리를 맡아 두겠습니다), I will e-mail you a map(지도를 보내겠습니다). 보기에서는 reserve a parking space 부분이 arrange parking 꼴로 바뀌었습니다. 강연 제목 보내기와 프로젝터 필요 여부 알리기는 받는 사람(문 씨)이 할 일입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 4,
        q: '굵게 표시한 낱말과 뜻이 가장 가까운 것은 무엇입니까?\n\nAll visitors to the factory must **observe** the safety rules at all times.',
        choices: ['follow', 'watch', 'notice', 'celebrate'],
        answer: 0,
        why: [
          '',
          '"지켜보다, 관찰하다"는 observe 낱말의 기본 뜻이지만, 규칙(rules)은 눈으로 지켜보는 것이 아니라 따르는 것입니다.',
          '"알아차리다"도 observe 낱말의 뜻 가운데 하나지만, 방문객이 늘 규칙을 알아차려야 한다는 말은 문장의 뜻과 맞지 않습니다.',
          '"(기념일을) 지키다, 기리다"는 observe a holiday 같은 표현의 뜻입니다. 안전 규칙은 기념하는 것이 아닙니다.',
        ],
        explain: '목적어가 the safety rules(안전 규칙)이므로 observe 동사는 "(규칙·법을) 지키다, 따르다"라는 뜻입니다. 그 자리에 넣어 뜻이 그대로인 것은 **follow**입니다: All visitors must follow the safety rules.(공장 방문객은 언제나 안전 규칙을 지켜야 합니다.)',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', unit: '원', concept: 2,
        q: '배 씨가 내야 하는 금액은 얼마입니까? 숫자만 쓰십시오.\n\n' + MAIL_F,
        answer: '405000',
        hint: 'incorrect(틀린) 금액과 correct(바른) 금액을 구별하십시오.',
        wrong: [
          { a: '450000', why: '450,000원은 어제 이메일의 틀린 금액입니다. that amount was incorrect라고 바로잡았습니다.' },
          { a: '45000', why: '45,000원은 할인 금액(450,000원의 10퍼센트)입니다. 내야 할 금액은 할인을 뺀 뒤의 금액입니다.' },
        ],
        explain: '어제 알린 450,000원은 틀렸고(that amount was incorrect), **The correct total is 405,000 won** 문장이 바른 금액입니다. 단골 할인 10퍼센트를 빼면 450,000 − 45,000 = 405,000원으로 맞습니다. 바로잡는 이메일에는 예전 정보와 새 정보가 함께 나오므로 어느 쪽이 지금 맞는지 확인해야 합니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 3,
        q: '서연 씨가 내일 아침까지 할 일로 가장 알맞은 것은 무엇입니까?\n\n' + MAIL_G,
        choices: ['Return the draft with her comments', 'Send Minho the first draft of a brochure', 'Call Minho to discuss the changes', 'Print copies of the finished brochure'],
        answer: 0,
        why: [
          '',
          '초안은 민호 씨가 이미 서연 씨에게 보냈습니다(Thanks for sending the draft). 보낸 사람을 거꾸로 읽었습니다.',
          '전화는 민호 씨가 원하면(Let me know if you would rather ~) 하는 것입니다. 내일 아침까지 하겠다고 정한 일이 아닙니다.',
          '인쇄 이야기는 지문에 없습니다. 아직 고칠 곳이 남은 초안입니다.',
        ],
        hint: 'by tomorrow morning 바로 앞의 동사를 보십시오.',
        explain: 'I have a few small changes for the second page, which I **will mark and send back to you by tomorrow morning**.(둘째 쪽에 고칠 곳이 몇 군데 있는데, 표시해서 내일 아침까지 돌려보내겠습니다.) 서연 씨가 할 후속 조치는 **고칠 곳을 표시한 초안을 돌려보내는 것**입니다.',
      },
    ],

    deeper: [
      {
        title: '질문을 먼저 읽고, 지문은 목적을 찾으며 읽기',
        body: '시험에서는 지문 하나에 문제가 두세 개 붙습니다. 지문을 처음부터 끝까지 꼼꼼히 읽고 문제를 보면 시간이 모자랍니다. 다음 순서가 효율적입니다.\n\n' +
          '1. **질문을 먼저 훑습니다.** purpose(목적), asked to do(요청), When·How much(세부 정보), closest in meaning(낱말 뜻) 가운데 무엇을 묻는지 확인합니다.\n' +
          '2. **머리글(To, From, Subject)과 첫 문단**을 읽어 누가 누구에게 왜 썼는지 잡습니다. 목적 문제는 여기서 대부분 풀립니다.\n' +
          '3. 세부 정보 문제는 질문의 핵심어(날짜, 금액, 장소)를 들고 지문에서 찾아 그 **앞뒤 문장**만 읽습니다.\n' +
          '4. 정답 보기는 지문의 말을 바꿔 쓴 것이 많고, 지문의 낱말을 그대로 쓴 보기는 함정인 경우가 많습니다.\n\n' +
          '이 순서는 실제 업무에서 이메일을 처리할 때도 그대로 쓰입니다. 바쁜 직장인은 제목과 첫 문단으로 목적을 잡고, 요청과 기한에 표시해 둔 뒤 답장합니다.',
      },
      {
        title: '업무 이메일을 직접 쓸 때',
        body: '읽기에서 익힌 짜임은 그대로 쓰기의 틀이 됩니다. 업무 이메일은 대개 다음 순서로 씁니다.\n\n' +
          '| 부분 | 하는 일 | 표현 예 |\n|---|---|---|\n' +
          '| 첫 문단 | 목적 밝히기 | I\'m writing to ask about ~ |\n' +
          '| 가운데 | 세부 정보와 까닭 | The order was placed on May 2, but ~ |\n' +
          '| 요청 | 받는 사람이 할 일과 기한 | Could you ~ by Friday? |\n' +
          '| 첨부 | 함께 보낸 것 | I have attached ~ |\n' +
          '| 끝 | 후속 조치·끝인사 | I look forward to hearing from you. |\n\n' +
          '받는 사람이 첫 문단만 읽어도 무슨 일인지 알 수 있게 쓰는 것이 좋은 이메일입니다. 시험의 목적 문제가 첫 문단에서 풀리는 까닭도 여기에 있습니다.',
      },
    ],

    faq: [
      {
        q: '목적 문제는 꼭 첫 문장에서 답이 나와요?',
        a: '대부분 제목과 첫 문단에 있지만, 첫 문장이 인사(I hope you are well.)나 감사(Thank you for ~)라면 그다음 문장, 때로는 둘째 문단 첫머리에 목적이 나옵니다. 제목(Subject)도 함께 보십시오. 글 끝의 Let me know if ~ 같은 문장은 마무리 인사라서 목적으로 고르지 않습니다.',
      },
      {
        q: 'Please find attached에서 find는 찾으라는 뜻 아니에요?',
        a: '아닙니다. Please find attached ~ 표현은 "~을 첨부합니다(첨부한 것을 확인해 주십시오)"라는 굳은 표현입니다. 받는 사람에게 무엇을 찾아 달라는 요청이 아니므로, "받는 사람이 할 일" 문제의 답으로 고르지 않습니다. 같은 뜻으로 I have attached ~, Attached is ~도 씁니다.',
      },
      {
        q: '지문에 나온 낱말이 그대로 있는 보기를 고르면 왜 자주 틀려요?',
        a: '시험은 정답 보기를 지문과 다른 말로 바꿔 쓰고(paraphrase), 오답 보기에 지문의 낱말을 그대로 넣어 함정을 만드는 일이 많기 때문입니다. 예를 들어 지문에 taxi 낱말이 나오면 오답 보기에 Book a taxi 같은 말을 넣는 식입니다. 낱말이 같은지보다 **뜻이 같은지**를 확인하십시오.',
      },
    ],

    mistakes: [
      '첫 문장의 인사나 감사를 글의 목적으로 고르는 실수 — 인사 다음 문장, 제목(Subject)까지 보고 목적을 찾습니다.',
      '보내는 사람이 할 일(I will ~)과 받는 사람이 할 일(Please ~, Could you ~?)을 바꿔 읽는 실수 — 주어가 누구인지 먼저 확인합니다.',
      '일정이 바뀐 글에서 originally·instead of 뒤의 예전 정보를 답으로 고르는 실수 — moved to, now, correct 뒤의 새 정보가 답입니다.',
    ],

    gens: [
      {
        id: 'expression-function',
        level: 1,
        title: '이메일 표현의 쓰임 알아보기',
        make: function (R) {
          var it = R.pick(EXPR);
          var k = it[1];
          var others = [], whys = [];
          FUNC.forEach(function (f, j) { if (j !== k) { others.push(f); whys.push(FUNC_WHY[j]); } });
          var m = mix(R, FUNC[k], others, whys);
          return {
            type: 'choice', concept: k === 2 ? 3 : k,
            q: '다음 문장은 이메일에서 어떤 일을 합니까?\n\n' + it[0],
            choices: m.choices,
            answer: m.answer,
            why: m.why,
            explain: '이 문장의 쓰임은 **' + FUNC[k] + '**입니다.\n\n' + it[0] + '\n(' + it[2] + ')',
          };
        },
      },
      {
        id: 'changed-schedule',
        level: 2,
        title: '바뀐 일정에서 새 정보 찾기',
        make: function (R) {
          var month = R.pick(MONTHS);
          var d1 = R.int(3, 20);
          var d2 = d1 + R.int(1, 7);
          var ev = R.pick(EVENTS);
          var t1 = R.pick(TIMES);
          var timeSame = R.bool();
          var t2 = timeSame ? t1 : R.pick(TIMES.filter(function (t) { return t !== t1; }));
          var spare = R.shuffle(TIMES.filter(function (t) { return t !== t1 && t !== t2; }));
          var p1 = R.pick(PLACES);
          var placeSame = R.bool();
          var p2 = placeSame ? p1 : R.pick(PLACES.filter(function (p) { return p !== p1; }));
          var text = 'The ' + ev[0] + ' originally scheduled for ' + month + ' ' + d1 + ' at ' + t1 + ' in ' + p1 + ' has been moved to ' + month + ' ' + d2 + '. ' +
            (timeSame ? 'It will start at the same time' : 'It will now start at ' + t2) +
            (placeSame ? ', and the place will stay the same.' : ', and it will be held in ' + p2 + ' instead.');
          var mk = MONTHS_KO[month];
          var newKo = mk + ' ' + d2 + '일 ' + timeKo(t2) + ', ' + PLACES_KO[p2];
          var oldKo = mk + ' ' + d1 + '일 ' + timeKo(t1) + ', ' + PLACES_KO[p1];
          var timeNote = timeSame ? '시간은 at the same time(같은 시간), 곧 ' + timeKo(t1) + ' 그대로입니다.' : '시간은 now start at 뒤의 ' + timeKo(t2) + '입니다.';
          var placeNote = placeSame ? '장소는 the place will stay the same(장소는 그대로), 곧 ' + PLACES_KO[p1] + '입니다.' : '장소는 instead 앞의 ' + PLACES_KO[p2] + '입니다.';
          var base = {
            type: 'choice', concept: 2,
            explain: 'originally scheduled for 뒤의 정보(' + oldKo + ')는 바뀌기 전 일정입니다. 날짜는 has been moved to 뒤의 ' + mk + ' ' + d2 + '일입니다. ' + timeNote + ' ' + placeNote + '\n\n새 일정: **' + newKo + '**\n\n' + text,
          };
          var correct, cands, reason = {};
          if (R.bool()) {
            base.q = '이 ' + ev[1] + R.josa(ev[1], '은/는') + ' 언제 열립니까?\n\n' + text;
            var when = function (d, t) { return month + ' ' + d + ' at ' + t; };
            correct = when(d2, t2);
            cands = [when(d1, t1), when(d1, t2), when(d2, spare[0]), when(d1, spare[1]), when(d2, spare[2])];
            reason[when(d2, spare[2])] = '날짜는 맞지만 시간이 다릅니다. ' + timeNote;
            reason[when(d1, spare[1])] = '날짜도 시간도 지문의 새 일정과 다릅니다.';
            reason[when(d2, spare[0])] = '날짜는 맞지만 시간이 다릅니다. ' + timeNote;
            reason[when(d1, t2)] = '이 날짜는 바뀌기 전 날짜입니다. has been moved to 뒤의 날짜를 보십시오.';
            reason[when(d1, t1)] = 'originally 뒤의 날짜와 시간은 바뀌기 전 일정입니다.';
          } else {
            base.q = '이 ' + ev[1] + R.josa(ev[1], '은/는') + ' 어디에서 열립니까?\n\n' + text;
            correct = p2;
            cands = PLACES.filter(function (p) { return p !== p2; });
            cands.forEach(function (p) {
              reason[p] = p === p1 ? 'originally 일정에 있던 장소입니다. ' + placeNote : '지문에 나오지 않는 장소입니다.';
            });
          }
          var pick = R.choices(correct, cands, 4);
          base.choices = pick.choices;
          base.answer = pick.answer;
          base.why = pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; });
          return base;
        },
      },
      {
        id: 'context-meaning',
        level: 2,
        title: '문맥상 뜻이 같은 낱말 고르기',
        make: function (R) {
          var it = R.pick(CONTEXT);
          var m = mix(R, it[1], it[2], it[3]);
          return {
            type: 'choice', concept: 4,
            q: '굵게 표시한 낱말과 뜻이 가장 가까운 것은 무엇입니까?\n\n' + it[0],
            choices: m.choices,
            answer: m.answer,
            why: m.why,
            explain: '문장 뜻: ' + it[4] + '\n\n이 문장에서 굵게 표시한 낱말은 "' + it[5] + '"라는 뜻입니다. 그 자리에 넣어 뜻이 그대로인 것은 **' + it[1] + '**입니다.',
          };
        },
      },
    ],

    vocab: [
      { w: 'purpose', m: '목적', ex: 'The purpose of this e-mail is to confirm your order.', exm: '이 이메일의 목적은 주문을 확인하는 것입니다.' },
      { w: 'inquiry', m: '문의', ex: 'Thank you for your inquiry about our services.', exm: '저희 서비스에 관해 문의해 주셔서 감사합니다.' },
      { w: 'recipient', m: '받는 사람, 수신자', ex: 'Please check the name of the recipient before you send it.', exm: '보내기 전에 받는 사람의 이름을 확인해 주십시오.' },
      { w: 'attach', m: '첨부하다, 붙이다', ex: 'I have attached the schedule for next week.', exm: '다음 주 일정표를 첨부했습니다.' },
      { w: 'enclose', m: '동봉하다', ex: 'A copy of the receipt is enclosed with this letter.', exm: '이 편지에 영수증 사본을 동봉합니다.' },
      { w: 'confirm', m: '확인하다, 확정하다', ex: 'Could you confirm the time of the meeting?', exm: '회의 시간을 확인해 주시겠습니까?' },
      { w: 'regarding', m: '~에 관하여', ex: 'I am writing regarding your job application.', exm: '귀하의 입사 지원에 관해 씁니다.' },
      { w: 'reimbursement', m: '(쓴 비용의) 상환, 환급', ex: 'Keep your receipts to get reimbursement for travel costs.', exm: '출장비를 돌려받으려면 영수증을 보관하십시오.' },
      { w: 'replace', m: '교체하다, 바꿔 주다', ex: 'We will replace the broken part for free.', exm: '고장 난 부품을 무료로 교체해 드리겠습니다.' },
      { w: 'free of charge', m: '무료로', ex: 'Delivery is free of charge for members.', exm: '회원은 배송이 무료입니다.' },
      { w: 'postage', m: '우편 요금', ex: 'The postage for this package is 4,000 won.', exm: '이 소포의 우편 요금은 4,000원입니다.' },
      { w: 'agenda', m: '(회의의) 안건, 일정', ex: 'The first item on the agenda is the budget.', exm: '첫 번째 안건은 예산입니다.' },
      { w: 'follow up', m: '후속 조치를 하다, 다시 연락하다', ex: 'I will follow up with the client tomorrow.', exm: '내일 그 고객에게 다시 연락하겠습니다.' },
      { w: 'hesitate', m: '망설이다, 주저하다', ex: 'Please do not hesitate to call me.', exm: '망설이지 말고 전화 주십시오.' },
      { w: 'correction', m: '정정, 바로잡음', ex: 'Please see the correction to the price below.', exm: '아래 가격 정정 내용을 확인해 주십시오.' },
    ],
  });
})();
