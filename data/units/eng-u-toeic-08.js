/* 공인영어시험 기초 (토익형) · 비즈니스 어휘와 표현
 * 예문·지문은 모두 직접 쓴 문장이다(가상의 회사·인물). */
(function () {
  // 동사 + 명사 짝 생성기: [빈칸 문장, 정답 동사, 오답 동사 3개, 짝이 되는 명사, 짝의 뜻, 해석]
  // 오답 동사는 그 명사와 짝을 이루지 않는 것만 고른다(make·give 처럼 여러 명사와 어울리는 동사는 오답으로 쓰지 않는다).
  var COLL = [
    ['Our team worked late to ___ the deadline.', 'meet', ['place', 'submit', 'conduct'], 'deadline', '마감을 지키다', '우리 팀은 마감을 지키려고 늦게까지 일했습니다.'],
    ['To ___ an order, please call our sales team.', 'place', ['meet', 'conduct', 'attend'], 'order', '주문하다', '주문하시려면 영업팀에 전화해 주십시오.'],
    ['All teams must ___ their proposals by Friday.', 'submit', ['place', 'conduct', 'meet'], 'proposal', '제안서를 내다', '모든 팀은 금요일까지 제안서를 내야 합니다.'],
    ['We will ___ a meeting next Monday to discuss the budget.', 'hold', ['place', 'submit', 'fill out'], 'meeting', '회의를 열다', '예산을 논의하려고 다음 주 월요일에 회의를 엽니다.'],
    ['Ms. Noh will ___ a presentation on the new product.', 'give', ['place', 'meet', 'fill out'], 'presentation', '발표하다', '노 씨가 신제품에 대해 발표할 것입니다.'],
    ['Please ___ this form and return it to the front desk.', 'fill out', ['place', 'meet', 'conduct'], 'form', '서식을 작성하다', '이 서식을 작성해서 안내 데스크에 내 주십시오.'],
    ['Both companies are ready to ___ the contract.', 'sign', ['attend', 'conduct', 'meet'], 'contract', '계약서에 서명하다', '두 회사 모두 계약서에 서명할 준비가 되었습니다.'],
    ['The marketing team will ___ a survey of 500 customers.', 'conduct', ['place', 'meet', 'sign'], 'survey', '설문 조사를 하다', '마케팅팀은 고객 500명에게 설문 조사를 할 것입니다.'],
    ['I would like to ___ a reservation for two people.', 'make', ['meet', 'conduct', 'sign'], 'reservation', '예약하다', '두 사람 자리를 예약하고 싶습니다.'],
    ['After long talks, the two sides were able to ___ an agreement.', 'reach', ['place', 'conduct', 'fill out'], 'agreement', '합의에 이르다', '오랜 협상 끝에 양쪽은 합의에 이를 수 있었습니다.'],
    ['Please ___ notes during the meeting.', 'take', ['place', 'meet', 'conduct'], 'notes', '메모하다, 기록하다', '회의 중에 메모해 주십시오.'],
    ['The company plans to ___ a new smartphone in March.', 'launch', ['meet', 'fill out', 'conduct'], 'smartphone', '(신제품을) 출시하다', '그 회사는 3월에 새 스마트폰을 출시할 계획입니다.'],
    ['Many museums ___ a discount to students.', 'offer', ['meet', 'fill out', 'conduct'], 'discount', '할인을 해 주다', '많은 박물관이 학생에게 할인을 해 줍니다.'],
  ];

  // 낱말 뜻 생성기: [낱말, 뜻, 밑줄 친 예문, 묶음] — 같은 묶음(뜻이 가까운 낱말)끼리는 오답으로 함께 내지 않는다.
  var MEAN = [
    ['hire', '고용하다', 'The hotel will __hire__ ten new staff members this summer.', 'staff'],
    ['promote', '승진시키다', 'The company decided to __promote__ Ms. Byun to sales manager.', 'staff'],
    ['colleague', '(직장) 동료', 'I had lunch with a __colleague__ from the design team.', 'people'],
    ['résumé', '이력서', 'Please attach your __résumé__ to the application.', 'doc'],
    ['agenda', '회의 안건 목록', 'The first item on the __agenda__ is the new budget.', 'doc'],
    ['postpone', '미루다, 연기하다', 'We had to __postpone__ the picnic because of the rain.', 'schedule'],
    ['attend', '참석하다', 'About fifty people will __attend__ the workshop.', 'go'],
    ['shipment', '발송품, 배송', 'The __shipment__ left our warehouse this morning.', 'deliver'],
    ['invoice', '청구서, 송장', 'The __invoice__ shows the total amount you need to pay.', 'money'],
    ['refund', '환불', 'You can get a full __refund__ within 14 days.', 'money'],
    ['survey', '설문 조사', 'More than 300 customers answered the online __survey__.', 'opinion'],
    ['discount', '할인', 'Members get a ten percent __discount__ on all books.', 'price'],
    ['launch', '출시하다', 'The company will __launch__ its new game in December.', 'product'],
    ['feedback', '의견, 반응', 'Thank you for your helpful __feedback__ on our menu.', 'opinion'],
  ];

  // 낱말 꼴(품사) 생성기: [빈칸 문장, 정답, [[오답, 그 꼴의 이름], …], 빈칸 자리 설명, 해석]
  var FORM = [
    ['Free ___ is available for all orders over 50,000 won.', 'delivery', [['deliver', '동사원형'], ['delivered', '과거형·과거분사'], ['delivering', '현재분사·동명사']], '주어 자리, 곧 명사 자리', '5만 원이 넘는 모든 주문은 무료로 배송해 드립니다.'],
    ['All ___ must wear a name tag in the building.', 'employees', [['employ', '동사원형'], ['employment', '"고용"이라는 일을 뜻하는 명사'], ['employed', '과거형·과거분사']], '이름표를 다는 사람을 가리키는 명사 자리(주어)', '건물 안에서는 모든 직원이 이름표를 달아야 합니다.'],
    ['Thank you for your ___ at the seminar.', 'attendance', [['attend', '동사원형'], ['attended', '과거형·과거분사'], ['attends', '3인칭 단수 동사']], '소유격 your 뒤의 명사 자리', '세미나에 참석해 주셔서 감사합니다.'],
    ['Please keep your ___ in case you need a refund.', 'receipt', [['receive', '동사원형'], ['received', '과거형·과거분사'], ['receiving', '현재분사·동명사']], '소유격 your 뒤의 명사 자리(목적어)', '환불이 필요할 때를 대비해 영수증을 보관해 주십시오.'],
    ['Customer ___ is our top priority.', 'satisfaction', [['satisfy', '동사원형'], ['satisfied', '과거분사(형용사)'], ['satisfying', '현재분사(형용사)']], '주어 자리, 곧 명사 자리', '고객 만족이 우리가 가장 중요하게 여기는 일입니다.'],
    ['Ms. Ko received a ___ to marketing director.', 'promotion', [['promote', '동사원형'], ['promoted', '과거형·과거분사'], ['promoting', '현재분사·동명사']], '관사 a 뒤의 명사 자리(목적어)', '고 씨는 마케팅 이사로 승진했습니다.'],
    ['Please submit your ___ by e-mail.', 'application', [['apply', '동사원형'], ['applied', '과거형·과거분사'], ['applying', '현재분사·동명사']], '소유격 your 뒤의 명사 자리(목적어)', '지원서를 이메일로 내 주십시오.'],
    ['The new system will help us ___ costs.', 'reduce', [['reduction', '명사'], ['reduced', '과거형·과거분사'], ['reducing', '현재분사·동명사']], 'help us 뒤의 동사원형 자리', '새 시스템은 우리가 비용을 줄이는 데 도움이 될 것입니다.'],
  ];

  function bold(sentence, word) { return sentence.replace('___', '**' + word + '**'); }

  Tutor.registerUnit({
    id: 'eng-u-toeic-08',
    course: 'eng-u-toeic',
    title: '비즈니스 어휘와 표현',
    summary: '회사·회의·주문과 배송·고객 응대에서 자주 쓰는 어휘와 함께 쓰이는 낱말 짝을 익힙니다.',
    goals: [
      '회사·인사, 회의·일정, 주문·배송·결제, 고객·마케팅 어휘의 뜻과 쓰임을 안다.',
      'meet a deadline, place an order처럼 함께 쓰는 동사 + 명사 짝을 알맞게 고를 수 있다.',
      '같은 뿌리의 낱말 가운데 빈칸 자리에 맞는 품사를 고를 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '회사·인사 어휘',
        body: '채용·승진·동료처럼 회사 안의 사람과 자리에 관한 어휘입니다.\n\n' +
          '| 낱말 | 뜻 | 함께 익힐 쓰임 |\n|---|---|---|\n' +
          '| hire | 고용하다 (= employ) | hire new staff |\n' +
          '| applicant | 지원자 | qualified applicants (자격을 갖춘 지원자) |\n' +
          '| résumé | 이력서 (resume, CV라고도 씀) | submit a résumé |\n' +
          '| position, opening | (빈) 일자리 | a job opening in sales |\n' +
          '| promote | 승진시키다 | be **promoted to** manager (관리자로 승진하다) |\n' +
          '| colleague, coworker | (직장) 동료 | a colleague from another team |\n' +
          '| supervisor | 상사, 감독자 | report to a supervisor |\n' +
          '| retire | 은퇴하다 | retire next year |\n\n' +
          '- The company **hired** two new designers. (회사는 디자이너 두 명을 새로 고용했습니다.)\n' +
          '- Ms. Byun **was promoted to** sales manager. (변 씨는 영업 관리자로 승진했습니다.)\n\n' +
          '> 💡 employer(고용주)와 employee(직원)처럼 -er는 일을 시키는 쪽, -ee는 받는 쪽인 짝이 있습니다. trainer(교육하는 사람)와 trainee(교육받는 사람)도 같습니다.',
        easy: '회사에 들어가는 길을 따라가 보십시오.\n\n일자리(opening)가 나면 → 지원자(applicant)가 이력서(résumé)를 내고 → 회사가 고용(hire)하고 → 동료(colleague)와 일하다가 → 승진(promote)하고 → 마지막에 은퇴(retire)합니다.\n\n낱말을 이 이야기 순서로 묶어 두면 따로 외울 때보다 오래 기억납니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nMr. Ji was ___ to team leader last month.',
          choices: ['hired', 'promoted', 'interviewed'],
          answer: 1,
          why: [
            'hire는 "고용하다"라서 to team leader(팀장으로)와 뜻이 이어지지 않습니다.',
            '',
            'interview는 "면접을 보다"라서 to team leader(팀장으로)와 뜻이 이어지지 않습니다.',
          ],
          explain: 'be **promoted** to + 자리: "~로 승진하다". "지 씨는 지난달에 팀장으로 승진했습니다."',
        },
      },
      {
        title: '회의·일정 어휘',
        body: '회의를 잡고, 미루고, 참석하는 일에 쓰는 어휘입니다.\n\n' +
          '| 낱말 | 뜻 | 쓰임 |\n|---|---|---|\n' +
          '| agenda | 회의 안건 목록 | the first item on the agenda |\n' +
          '| attend | 참석하다 | **attend** the meeting (to 없이) |\n' +
          '| postpone | 미루다 (= put off) | postpone the meeting **until** Friday |\n' +
          '| reschedule | 일정을 다시 잡다 | reschedule the meeting **for** Friday |\n' +
          '| cancel | 취소하다 | cancel the trip |\n' +
          '| minutes | 회의록 (늘 복수 꼴) | take the minutes |\n' +
          '| in advance | 미리 | book in advance |\n\n' +
          '- About fifty people will **attend** the workshop. (워크숍에 50명쯤 참석합니다.)\n' +
          '- The meeting has been **postponed** until next week. (회의가 다음 주로 미뤄졌습니다.)\n\n' +
          '> ⚠️ attend는 바로 목적어를 받습니다: attend to the meeting (×) → attend the meeting (○). attend to는 "(일을) 처리하다, 돌보다"라는 다른 뜻입니다.\n\n' +
          '> 💡 postpone은 늦추기만 하고, cancel은 아예 없애고, reschedule은 새 날짜를 다시 정합니다.',
        easy: '달력을 떠올리십시오. 회의 날짜를 뒤로 **밀면** postpone, 회의 표시를 **지우면** cancel, 지우고 **다른 칸에 다시 쓰면** reschedule입니다.\n\n회의에 가서 자리에 앉는 것은 attend, 그 회의에서 다룰 일의 목록은 agenda입니다.',
        check: {
          type: 'ox',
          q: '다음 문장은 어법에 맞습니다.\n\nAll managers must attend to the meeting on Monday.',
          answer: false,
          explain: '"회의에 참석하다"의 attend는 to 없이 목적어를 바로 받습니다. All managers must **attend the meeting** on Monday.(모든 관리자는 월요일 회의에 참석해야 합니다)로 고칩니다.',
        },
      },
      {
        title: '주문·배송·결제 어휘',
        body: '물건을 주문하고, 받고, 돈을 내거나 돌려받는 과정의 어휘입니다.\n\n' +
          '| 낱말 | 뜻 | 쓰임 |\n|---|---|---|\n' +
          '| order | 주문(하다) | place an order, an order for 20 chairs |\n' +
          '| shipment | 발송품, 배송 | the shipment arrived late |\n' +
          '| deliver / delivery | 배달하다 / 배달 | free delivery |\n' +
          '| invoice | 청구서, 송장 (낼 돈을 적은 서류) | send an invoice |\n' +
          '| receipt | 영수증 (낸 돈의 증명) | keep the receipt |\n' +
          '| refund | 환불(하다) | a full refund |\n' +
          '| in stock / out of stock | 재고가 있는 / 없는 | The item is out of stock. |\n' +
          '| due | (돈·서류를) 내야 하는 | Payment is due by May 1. |\n\n' +
          '- The **invoice** shows the total amount you need to pay. (청구서에 내야 할 전체 금액이 적혀 있습니다.)\n' +
          '- You can get a full **refund** within 14 days. (14일 안에 전액 환불을 받을 수 있습니다.)\n\n' +
          '> ⚠️ invoice는 **돈을 내기 전**에 받는 "얼마를 내라"는 서류, receipt는 **돈을 낸 뒤**에 받는 "냈다"는 증명입니다.',
        easy: '인터넷으로 책상을 산다고 해 보십시오.\n\n주문하고(place an order) → 청구서(invoice)를 받아 돈을 내고 → 영수증(receipt)을 받고 → 책상이 발송되어(shipment) 배달됩니다(delivery). 책상이 망가져 왔다면 돈을 돌려받습니다(refund).',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe chair arrived broken, so the store gave me a full ___.',
          choices: ['invoice', 'refund', 'shipment'],
          answer: 1,
          why: [
            'invoice는 낼 돈을 적은 청구서입니다. 망가진 물건 때문에 받는 것이 아닙니다.',
            '',
            'shipment는 발송품입니다. "전액 발송품"은 뜻이 통하지 않습니다.',
          ],
          explain: '물건이 망가져서 돈을 돌려받는 것이므로 **refund**(환불)입니다. a full refund = 전액 환불.',
        },
      },
      {
        title: '고객·마케팅 어휘',
        body: '고객의 의견을 듣고, 제품을 알리고 파는 일에 쓰는 어휘입니다.\n\n' +
          '| 낱말 | 뜻 | 쓰임 |\n|---|---|---|\n' +
          '| survey | 설문 조사 | conduct a customer survey |\n' +
          '| feedback | 의견, 반응 (셀 수 없음) | some feedback **on** the menu |\n' +
          '| discount | 할인 | a 20% discount **on** all shoes |\n' +
          '| launch | 출시(하다) | launch a new product / the launch of the app |\n' +
          '| promotion | 판촉 행사; 승진 | a summer promotion |\n' +
          '| advertise / advertisement | 광고하다 / 광고 | an advertisement in the newspaper |\n' +
          '| loyal customer | 단골 고객 | rewards for loyal customers |\n\n' +
          '- We would appreciate your **feedback** on our new website. (새 웹사이트에 대한 의견을 주시면 감사하겠습니다.)\n' +
          '- Members get a ten percent **discount** on all books. (회원은 모든 책을 10퍼센트 할인받습니다.)\n\n' +
          '> ⚠️ feedback은 셀 수 없는 명사라서 a feedback, feedbacks로 쓰지 않습니다. some feedback, a lot of feedback처럼 씁니다.\n\n' +
          '> 💡 promotion은 회사 안에서는 "승진", 가게에서는 "판촉 행사"입니다. 앞뒤 낱말로 뜻을 고르십시오.',
        easy: '새 과자를 만든 회사를 생각해 보십시오.\n\n과자를 세상에 내놓고(launch) → 할인(discount) 행사로 알리고(promotion) → 먹어 본 사람들에게 설문(survey)을 돌려 → 의견(feedback)을 듣습니다.',
        check: {
          type: 'ox',
          q: '다음 문장은 어법에 맞습니다.\n\nThank you for your feedbacks on our new menu.',
          answer: false,
          explain: 'feedback은 셀 수 없는 명사라서 -s를 붙이지 않습니다. Thank you for your **feedback** on our new menu.(새 메뉴에 대한 의견 감사합니다)로 고칩니다.',
        },
      },
      {
        title: '함께 쓰는 동사 + 명사 짝',
        body: '영어에는 어떤 명사가 **늘 같이 다니는 동사**가 있습니다. 이런 짝을 **연어(collocation)**라고 합니다. 우리말로 "하다"라고 옮겨지더라도 영어에서는 명사마다 동사가 정해져 있습니다.\n\n' +
          '| 짝 | 뜻 |\n|---|---|\n' +
          '| **meet** a deadline | 마감을 지키다 |\n' +
          '| **place** an order | 주문하다 |\n' +
          '| **submit** a proposal / a report | 제안서·보고서를 내다 |\n' +
          '| **hold** a meeting | 회의를 열다 |\n' +
          '| **give** a presentation | 발표하다 |\n' +
          '| **fill out** a form | 서식을 작성하다 |\n' +
          '| **conduct** a survey | 설문 조사를 하다 |\n' +
          '| **make** a reservation | 예약하다 |\n' +
          '| **reach** an agreement | 합의에 이르다 |\n\n' +
          '- Our team worked late to **meet the deadline**. (마감을 지키려고 늦게까지 일했습니다.)\n' +
          '- To **place an order**, please call our sales team. (주문하시려면 영업팀에 전화해 주십시오.)\n\n' +
          '> 💡 짝은 낱말 하나가 아니라 **덩어리째** 외우십시오. "deadline = 마감"만 알면 동사 자리에서 막히지만, "meet a deadline = 마감을 지키다"로 알면 바로 고를 수 있습니다.',
        easy: '젓가락은 한 짝만으로는 쓸 수 없습니다. 동사와 명사도 짝이 정해진 경우가 많습니다.\n\n우리말로는 "마감을 **지키다**"지만 영어로는 keep이 아니라 **meet** a deadline, "주문을 **하다**"지만 do가 아니라 **place** an order입니다. 우리말을 그대로 옮기지 말고 짝을 통째로 기억하십시오.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nTo ___ an order, please visit our website.',
          choices: ['place', 'meet', 'attend'],
          answer: 0,
          why: [
            '',
            'meet는 a deadline(마감)과 짝을 이룹니다. "주문하다"는 place an order입니다.',
            'attend는 "참석하다"라서 a meeting, a workshop과 함께 씁니다.',
          ],
          explain: '"주문하다"는 **place an order**입니다. "주문하시려면 저희 웹사이트를 방문해 주십시오."',
        },
      },
      {
        title: '같은 뿌리 낱말의 품사 고르기',
        body: '비즈니스 어휘 문제는 뜻뿐 아니라 **품사**도 묻습니다. 같은 뿌리에서 나온 낱말 가운데 빈칸 자리에 맞는 꼴을 고릅니다(첫 단원 "품사 자리 찾기"와 같은 방법).\n\n' +
          '| 동사 | 명사(일) | 명사(사람) |\n|---|---|---|\n' +
          '| apply (지원하다) | application (지원서) | applicant (지원자) |\n' +
          '| attend (참석하다) | attendance (참석) | attendee (참석자) |\n' +
          '| deliver (배달하다) | delivery (배달) | — |\n' +
          '| employ (고용하다) | employment (고용) | employee (직원), employer (고용주) |\n' +
          '| receive (받다) | receipt (영수증) | recipient (받는 사람) |\n' +
          '| satisfy (만족시키다) | satisfaction (만족) | — |\n\n' +
          '- Thank you for your **attendance**. (소유격 your 뒤 → 명사)\n' +
          '- All **applicants** must bring a photo ID. (신분증을 가져오는 사람 → 사람 명사)\n\n' +
          '> 💡 명사 자리라도 **일**인지 **사람**인지 한 번 더 따지십시오. Please submit your **application**(지원서를 내다)의 application과 All **applicants** must …(지원자는 ~해야 한다)의 applicants는 같은 뿌리의 다른 명사입니다.',
        easy: '한 가족 낱말이 서로 다른 옷을 입고 있다고 생각하십시오. apply는 "하다" 옷(동사), application은 "물건·일" 옷(명사), applicant는 "사람" 옷(명사)입니다.\n\n빈칸 앞뒤를 보고 어떤 옷이 필요한지 정한 뒤, 그 옷을 입은 가족을 고르면 됩니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nPlease keep your ___ in case you need a refund.',
          choices: ['receive', 'receipt', 'received'],
          answer: 1,
          why: [
            '소유격 your 뒤에는 명사가 와야 합니다. receive는 동사입니다.',
            '',
            'received는 동사의 과거형·과거분사라서 your 뒤 명사 자리에 올 수 없습니다.',
          ],
          explain: '소유격 your 뒤 목적어 자리이므로 명사 **receipt**(영수증)입니다. "환불이 필요할 때를 대비해 영수증을 보관해 주십시오."',
        },
      },
    ],

    examples: [
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\nOur team must work hard this week to ___ the deadline for the project.\n\n(A) meet (B) attend (C) place (D) conduct',
        steps: [
          '보기가 모두 동사이고 빈칸 뒤 명사는 the deadline입니다. 이런 문제는 문법보다 짝(연어)을 묻습니다.',
          '"마감을 지키다"는 영어로 meet a deadline입니다.',
          'attend는 a meeting(참석하다), place는 an order(주문하다), conduct는 a survey(조사하다)와 짝을 이룹니다. deadline과는 어울리지 않습니다.',
          '정답은 (A)입니다. "우리 팀은 프로젝트 마감을 지키려고 이번 주에 열심히 일해야 합니다."',
        ],
        answer: '(A) meet',
      },
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\nWe received several ___ from customers about the late delivery.\n\n(A) complain (B) complaints (C) complained (D) complaining',
        steps: [
          'several(몇몇의) 뒤이고 received의 목적어 자리입니다. 명사, 그것도 several에 맞는 복수 명사가 와야 합니다.',
          'complain은 동사원형, complained는 과거형, complaining은 -ing 꼴이라 several 뒤 명사 자리에 맞지 않습니다.',
          '정답은 (B) complaints(불만 사항)입니다. "늦은 배송에 대해 고객들에게서 불만이 몇 건 들어왔습니다."',
        ],
        answer: '(B) complaints',
      },
    ],

    terms: [
      { term: '연어 (collocation)', def: '늘 함께 쓰이는 낱말 짝입니다. 예: meet a deadline(마감을 지키다), place an order(주문하다)' },
      { term: '셀 수 없는 명사', def: 'a/an을 붙이거나 -s를 붙여 셀 수 없는 명사입니다. 예: feedback, information, equipment' },
      { term: '다의어', def: '뜻이 둘 이상인 낱말입니다. 앞뒤 낱말로 뜻을 정합니다. 예: promotion(승진 / 판촉 행사)' },
      { term: '파생어', def: '한 뿌리에서 꼴을 바꾸어 나온 낱말입니다. 예: apply → application, applicant' },
      { term: '타동사', def: '전치사 없이 바로 목적어를 받는 동사입니다. 예: attend the meeting (attend to ×)' },
      { term: 'invoice', def: '돈을 내기 전에 받는, 낼 금액을 적은 청구서입니다. 돈을 낸 뒤 받는 증명은 receipt(영수증)입니다.' },
      { term: 'agenda', def: '회의에서 다룰 안건의 목록입니다. 예: the first item on the agenda(첫 번째 안건)' },
      { term: 'out of stock', def: '재고가 없어 지금 팔 수 없는 상태입니다. 반대는 in stock(재고가 있는)입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe company plans to ___ five new engineers this year.',
        choices: ['retire', 'attend', 'hire', 'promote'],
        answer: 2,
        why: [
          'retire는 "은퇴하다"라서 목적어를 받지 않습니다.',
          'attend는 "참석하다"라서 사람을 목적어로 받지 않습니다.',
          '',
          'promote는 이미 회사에 있는 사람을 승진시키는 것입니다. new engineers(새 기술자)와 맞지 않습니다.',
        ],
        explain: '새 기술자를 들이는 것이므로 **hire**(고용하다)입니다. "회사는 올해 기술자 다섯 명을 새로 고용할 계획입니다."',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
        q: '빈칸에 들어갈 낱말을 쓰십시오. (c로 시작, "직장 동료"라는 뜻)\n\nI had lunch with a ___ from the design team.',
        answer: ['colleague', 'coworker', 'co-worker'],
        wrong: [{ a: 'college', why: 'college는 "대학"입니다. "동료"는 colleague로 철자가 다릅니다(-league).' }],
        explain: '"직장 동료"는 **colleague**(또는 coworker)입니다. "디자인팀 동료와 점심을 먹었습니다."',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe meeting has been ___ until next Tuesday because the manager is sick.',
        choices: ['attended', 'launched', 'postponed', 'interviewed'],
        answer: 2,
        why: [
          'attend는 "참석하다"라서 "회의가 다음 주 화요일까지 참석되었다"는 뜻이 통하지 않습니다.',
          'launch는 제품을 "출시하다"라서 회의와 어울리지 않습니다.',
          '',
          'interview는 사람을 "면접하다"라서 회의와 어울리지 않습니다.',
        ],
        explain: '관리자가 아파서 회의를 뒤로 미룬 것이므로 **postponed**(미뤄진)입니다. postpone … until + 날짜: "~까지 미루다".',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: '"회의를 다른 날로 다시 잡다"라는 뜻의 동사는 reschedule입니다.',
        answer: true,
        explain: 'reschedule은 "일정을 다시 잡다"입니다. 예: Can we **reschedule** the meeting for Thursday?(회의를 목요일로 다시 잡을 수 있을까요?) 날짜를 늦추기만 하는 것은 postpone, 아예 없애는 것은 cancel입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nPlease check the ___ to see the total amount you need to pay.',
        choices: ['invoice', 'survey', 'agenda', 'refund'],
        answer: 0,
        why: [
          '',
          'survey는 설문 조사라서 내야 할 금액이 적혀 있지 않습니다.',
          'agenda는 회의 안건 목록입니다.',
          'refund는 돌려받는 돈이라서 "내야 할 금액"과 맞지 않습니다.',
        ],
        explain: '내야 할 금액이 적힌 서류는 **invoice**(청구서)입니다. "내셔야 할 전체 금액은 청구서에서 확인해 주십시오."',
      },
      {
        id: 'p6', level: 2, type: 'choice', concept: 2,
        q: '다음 문장의 뜻으로 알맞은 것은 무엇입니까?\n\nI am sorry, but the blue jacket is out of stock right now.',
        choices: [
          '파란 재킷은 지금 할인 중입니다.',
          '파란 재킷은 지금 재고가 없습니다.',
          '파란 재킷은 지금 배송 중입니다.',
          '파란 재킷은 지금 창고에 많이 있습니다.',
        ],
        answer: 1,
        why: [
          '할인은 discount입니다. out of stock과는 관계없습니다.',
          '',
          '배송 중은 on its way, being shipped처럼 씁니다.',
          '창고에 많이 있는 것은 in stock(재고가 있는)입니다. out of는 그 반대입니다.',
        ],
        explain: '**out of stock**은 "재고가 없는"입니다. "죄송하지만 파란 재킷은 지금 재고가 없습니다."',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nWe would appreciate your ___ on our new website.',
        choices: ['shipment', 'feedback', 'invoice', 'agenda'],
        answer: 1,
        why: [
          'shipment는 발송품입니다. 웹사이트에 대해 주는 것이 아닙니다.',
          '',
          'invoice는 청구서입니다. 고객이 웹사이트에 대해 주는 것이 아닙니다.',
          'agenda는 회의 안건 목록입니다.',
        ],
        explain: '새 웹사이트에 대한 고객의 **feedback**(의견)을 부탁하는 문장입니다. feedback on ~: "~에 대한 의견".',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'text', concept: 3,
        q: '빈칸에 들어갈 낱말을 쓰십시오. (s로 시작, "설문 조사"라는 뜻)\n\nMore than 300 customers answered our online ___.',
        answer: ['survey', 'surveys'],
        hint: '고객에게 질문지를 돌려 의견을 모으는 일입니다.',
        wrong: [{ a: 'service', why: 'service는 "서비스"입니다. 질문에 답하는 "설문 조사"는 survey입니다.' }],
        explain: '"설문 조사"는 **survey**입니다. conduct a survey(설문 조사를 하다)라는 짝도 함께 익혀 두십시오.',
      },
      {
        id: 'p9', level: 1, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nAll team leaders must ___ their reports by noon on Friday.',
        choices: ['submit', 'attend', 'conduct', 'meet'],
        answer: 0,
        why: [
          '',
          'attend는 a meeting처럼 행사에 "참석하다"입니다. 보고서와 짝이 아닙니다.',
          'conduct는 a survey, a study처럼 조사를 "하다"입니다. 보고서를 내는 것이 아닙니다.',
          'meet는 a deadline(마감)과 짝을 이룹니다. meet a report는 쓰지 않습니다.',
        ],
        explain: '"보고서를 내다"는 **submit** a report입니다. "모든 팀장은 금요일 정오까지 보고서를 내야 합니다."',
      },
      {
        id: 'p10', level: 2, type: 'order', concept: 4,
        q: '낱말 덩어리를 바른 순서로 놓아 문장을 완성하십시오.\n\n(뜻: 우리는 마감을 지키려고 초과 근무를 했습니다.)',
        choices: ['meet', 'We', 'the deadline', 'worked overtime to'],
        answer: [1, 3, 0, 2],
        explain: 'We / worked overtime to / meet / the deadline. — "마감을 지키다"는 meet a deadline이고, to meet는 "~하려고"라는 목적의 to부정사입니다.',
      },
      {
        id: 'p11', level: 1, type: 'choice', concept: 5,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nFree ___ is available for all orders over 50,000 won.',
        choices: ['deliver', 'delivery', 'delivered', 'delivers'],
        answer: 1,
        why: [
          '형용사 Free 뒤 주어 자리에는 명사가 와야 합니다. deliver는 동사입니다.',
          '',
          'delivered는 동사의 과거형·과거분사라서 주어 자리의 명사가 될 수 없습니다.',
          'delivers는 3인칭 단수 동사라서 주어 자리에 올 수 없습니다.',
        ],
        explain: '형용사 Free 뒤 주어 자리이므로 명사 **delivery**(배달)입니다. "5만 원이 넘는 모든 주문은 무료로 배송해 드립니다."',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'text', concept: 5,
        q: '괄호 안의 낱말을 알맞은 꼴로 바꾸어 쓰십시오.\n\nThank you for your (attend) at the seminar.',
        answer: ['attendance'],
        hint: '소유격 your 뒤에는 어떤 품사가 옵니까?',
        wrong: [
          { a: 'attend', why: '소유격 your 뒤에는 명사가 와야 합니다. attend는 동사입니다.' },
          { a: 'attendee', why: 'attendee는 "참석한 사람"입니다. "참석해 주셔서 감사합니다"는 참석한 일을 말하므로 attendance입니다.' },
          { a: 'attending', why: '"참석"을 뜻하는 명사 attendance가 있으므로 your 뒤에는 attendance를 씁니다.' },
        ],
        explain: '소유격 your 뒤에는 명사가 오고, "참석"이라는 일을 뜻하므로 **attendance**입니다. "세미나에 참석해 주셔서 감사합니다."',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 4,
        q: '동사 + 명사 짝이 **자연스럽지 않은** 것은 무엇입니까?',
        choices: ['meet a deadline', 'place an order', 'conduct a reservation', 'submit a written proposal'],
        answer: 2,
        why: [
          '"마감을 지키다"라는 자연스러운 짝입니다.',
          '"주문하다"라는 자연스러운 짝입니다.',
          '',
          '"(서면) 제안서를 내다"라는 자연스러운 짝입니다.',
        ],
        hint: '각 짝을 우리말로 옮겨 보고, 실제로 쓰는 짝인지 떠올려 보십시오.',
        explain: '"예약하다"는 **make a reservation**입니다. conduct는 a survey, a study처럼 조사·연구를 "하다"와 짝을 이룹니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 2,
        q: '다음 이메일이 알리는 문제는 무엇입니까?\n\n' +
          'Dear Ms. Yoon,\n\n' +
          'Thank you for placing an order with Green Desk Supplies. Unfortunately, the blue chair you ordered is out of stock. We can send you the same chair in gray by Friday, or we can give you a full refund. Please reply to this e-mail and let us know which you prefer.',
        choices: [
          'The ordered chair is not available.',
          'The invoice had the wrong price.',
          'The chair was sent to the wrong address.',
          'The chair arrived damaged.',
        ],
        answer: 0,
        why: [
          '',
          '청구서(invoice)나 가격 이야기는 이메일에 없습니다.',
          '주소가 틀렸다는 내용은 없습니다. 의자는 아직 보내지 않았습니다.',
          '의자가 망가져 왔다는 내용은 없습니다.',
        ],
        hint: 'Unfortunately(안타깝게도) 뒤 문장에 문제가 나옵니다.',
        explain: '"주문하신 파란 의자는 **재고가 없습니다(out of stock)**"라고 알립니다. 그래서 회색 의자를 금요일까지 보내거나 전액 환불(a full refund)을 해 주겠다며 고객에게 고르게 합니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 2,
        q: '빈칸 (A), (B)에 들어갈 말을 차례대로 고르십시오.\n\nPlease check the (A) to see how much you owe, and keep the (B) after you pay.',
        choices: ['receipt / invoice', 'invoice / survey', 'refund / receipt', 'invoice / receipt'],
        answer: 3,
        why: [
          '두 칸이 거꾸로입니다. 낼 돈을 보는 서류는 invoice, 낸 뒤 보관하는 것은 receipt입니다.',
          '(B) survey는 설문 조사라서 돈을 낸 뒤 보관하는 것이 아닙니다.',
          '(A) refund는 돌려받는 돈이라서 "얼마를 내야 하는지" 보는 서류가 아닙니다.',
          '',
        ],
        hint: '돈을 내기 전에 보는 서류와 낸 뒤에 받는 서류를 나누어 생각하십시오.',
        explain: '(A) 내야 할 돈을 확인하는 서류 → **invoice**(청구서), (B) 돈을 낸 뒤 보관하는 것 → **receipt**(영수증). "얼마를 내야 하는지 청구서에서 확인하시고, 내신 뒤에는 영수증을 보관해 주십시오."',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 1,
        q: '밑줄 친 부분과 뜻이 가장 가까운 것은 무엇입니까?\n\nBecause of the storm, the outdoor workshop has been __put off__ until May.',
        choices: ['canceled', 'postponed', 'advertised', 'launched'],
        answer: 1,
        why: [
          'cancel은 아예 취소하는 것입니다. until May(5월까지)가 있으니 없앤 것이 아니라 늦춘 것입니다.',
          '',
          'advertise는 "광고하다"라서 뜻이 다릅니다.',
          'launch는 "출시하다, 시작하다"라서 뜻이 다릅니다.',
        ],
        hint: 'until May(5월까지)라는 말에 주목하십시오.',
        explain: 'put off는 "미루다"로 **postpone**과 같습니다. "폭풍 때문에 야외 워크숍이 5월로 미뤄졌습니다."',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 3,
        q: 'promotion이 "판매 촉진 행사(판촉)"라는 뜻으로 쓰인 문장은 무엇입니까?',
        choices: [
          'Ms. Ko got a promotion to team leader.',
          'Everyone in the office congratulated Mr. Ma on his recent promotion.',
          'The store is running a summer promotion with 30% off.',
          'Hard work led to her promotion last year.',
        ],
        answer: 2,
        why: [
          'to team leader(팀장으로)가 있으므로 "승진"입니다.',
          '축하를 받는 사람(Mr. Ma)의 promotion이므로 "승진"입니다.',
          '',
          '열심히 일한 결과로 얻은 그녀의 promotion이므로 "승진"입니다.',
        ],
        hint: '가게(store)와 할인(30% off)이 나오는 문장을 찾아보십시오.',
        explain: '가게가 30% 할인과 함께 여는 summer **promotion**은 "여름 판촉 행사"입니다. 나머지는 모두 사람의 "승진"입니다.',
      },
      {
        id: 'a6', level: 3, type: 'short', check: 'text', concept: 5,
        q: '괄호 안의 낱말을 알맞은 꼴로 바꾸어 쓰십시오.\n\nAll (apply) must bring a photo ID to the interview.',
        answer: ['applicants'],
        hint: '면접에 신분증을 가져오는 것은 사람입니다. All 뒤라 복수 꼴입니다.',
        wrong: [
          { a: 'applications', why: 'application은 "지원서"입니다. 신분증을 가져오는 것은 사람이므로 applicant(지원자)를 씁니다.' },
          { a: 'applicant', why: 'All 뒤에 셀 수 있는 명사가 오면 복수 꼴이 됩니다. applicants로 씁니다.' },
          { a: 'apply', why: 'All 뒤 주어 자리에는 명사가 와야 합니다. apply는 동사입니다.' },
        ],
        explain: '주어 자리이고 신분증을 가져오는 **사람**이며 All 뒤라 복수이므로 **applicants**(지원자들)입니다. "모든 지원자는 면접에 사진이 있는 신분증을 가져와야 합니다."',
      },
    ],

    deeper: [
      {
        title: '셀 수 없는 비즈니스 명사',
        body: '업무 글에 자주 나오는 명사 가운데 우리말로는 셀 수 있을 것 같지만 영어에서는 **셀 수 없는** 것이 있습니다. a/an을 붙이거나 -s를 붙이지 않습니다.\n\n' +
          '| 낱말 | 뜻 | 하나·여러 개를 말할 때 |\n|---|---|---|\n' +
          '| feedback | 의견 | some feedback, a piece of feedback |\n' +
          '| information | 정보 | a piece of information |\n' +
          '| equipment | 장비 | a piece of equipment |\n' +
          '| furniture | 가구 | a piece of furniture |\n' +
          '| advice | 조언 | a piece of advice |\n' +
          '| luggage, baggage | 짐 | a piece of luggage |\n\n' +
          '그래서 이런 명사 앞에는 many 대신 **much**, few 대신 **little**을 쓰고, 동사도 단수로 받습니다: The new equipment **is** expensive.\n\n' +
          '앞 단원 "명사·대명사·한정사"에서 배운 수 일치와 그대로 이어지는 내용입니다.',
      },
      {
        title: '하나의 낱말, 여러 뜻',
        body: '비즈니스 어휘에는 뜻이 여럿인 낱말이 많습니다. 토익은 "밑줄 친 낱말과 뜻이 가장 가까운 것"을 고르게 하여 이 점을 자주 묻습니다.\n\n' +
          '- **order**: 주문 (place an order) / 순서 (in alphabetical order) / 명령\n' +
          '- **charge**: 요금 (a delivery charge) / 청구하다 (charge a fee) / 책임 (be in charge of the project)\n' +
          '- **branch**: 지점 (a new branch in Daegu) / 나뭇가지\n' +
          '- **promotion**: 승진 / 판촉 행사\n' +
          '- **minutes**: 분(시간) / 회의록 (take the minutes)\n\n' +
          '뜻을 고를 때는 낱말 하나만 보지 말고 **함께 쓰인 낱말**(place, be in charge of, take)을 보십시오. 앞에서 익힌 짝(연어)이 뜻을 알려 주는 가장 좋은 단서입니다. 다음 단원부터 이메일·공지 지문을 읽을 때 이 어휘들이 문맥 속에서 그대로 나옵니다.',
      },
    ],

    faq: [
      {
        q: 'invoice랑 receipt는 뭐가 달라요?',
        a: 'invoice는 돈을 내기 전에 받는 청구서로 "이만큼 내십시오"라는 서류입니다. receipt는 돈을 낸 뒤에 받는 영수증으로 "이만큼 냈습니다"라는 증명입니다. 환불이나 교환에는 대개 receipt가 필요합니다.',
      },
      {
        q: 'postpone, cancel, reschedule은 어떻게 달라요?',
        a: 'postpone은 날짜를 뒤로 미루는 것(새 날짜가 정해지지 않았을 수도 있음), cancel은 아예 취소하는 것, reschedule은 새 날짜를 다시 정하는 것입니다. postpone the meeting until Friday, cancel the meeting, reschedule the meeting for Friday처럼 함께 쓰는 전치사도 익혀 두십시오.',
      },
      {
        q: '동사 + 명사 짝은 어떻게 외워요?',
        a: '명사만 외우지 말고 짝을 덩어리째 소리 내어 외우십시오. meet a deadline, place an order처럼 짧은 덩어리로 만든 뒤, 직접 짧은 문장을 하나씩 만들어 보면 오래 남습니다. 우리말 "하다"를 영어 do나 make로 옮기는 습관이 가장 흔한 실수의 원인입니다.',
      },
    ],

    mistakes: [
      'attend 뒤에 to를 쓰는 실수 — **attend to** the meeting ✕ → **attend** the meeting ✓ (attend to는 "처리하다")',
      '셀 수 없는 명사에 -s를 붙이는 실수 — Thank you for your **feedbacks** ✕ → your **feedback** ✓',
      '우리말 "하다"를 그대로 옮기는 실수 — **do** an order ✕ → **place** an order ✓, **do** a reservation ✕ → **make** a reservation ✓',
    ],

    gens: [
      {
        id: 'collocation',
        level: 1,
        title: '동사 + 명사 짝 고르기',
        make: function (R) {
          var it = R.pick(COLL);
          var correct = it[1];
          var why = {};
          it[2].forEach(function (w) {
            why[w] = '"' + w + ' … ' + it[3] + '" 꼴은 쓰지 않는 짝입니다. ' + it[3] + ' 앞에는 ' + correct + ' 동사를 씁니다.';
          });
          var pick = R.choices(correct, it[2]);
          return {
            type: 'choice', concept: 4,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : why[c] || ''; }),
            explain: '짝: **' + correct + ' + ' + it[3] + '** — ' + it[4] + '\n\n' + bold(it[0], correct) + '\n\n' + it[5],
          };
        },
      },
      {
        id: 'word-meaning',
        level: 1,
        title: '비즈니스 낱말의 뜻 고르기',
        make: function (R) {
          var it = R.pick(MEAN);
          var pool = MEAN.filter(function (x) { return x[3] !== it[3]; });
          var others = R.sample(pool, 3);
          var why = {};
          others.forEach(function (x) { why[x[1]] = '"' + x[1] + '"의 뜻을 가진 낱말은 ' + x[0] + '입니다.'; });
          var pick = R.choices(it[1], others.map(function (x) { return x[1]; }));
          return {
            type: 'choice', concept: { staff: 0, people: 0, doc: 0, schedule: 1, go: 1, deliver: 2, money: 2, opinion: 3, price: 3, product: 3 }[it[3]],
            q: '밑줄 친 낱말의 뜻으로 알맞은 것은 무엇입니까?\n\n' + it[2],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === it[1] ? '' : why[c] || ''; }),
            explain: '**' + it[0] + '**의 뜻은 "' + it[1] + '"입니다.\n\n' + it[2].replace('__' + it[0] + '__', '**' + it[0] + '**'),
          };
        },
      },
      {
        id: 'word-form',
        level: 2,
        title: '같은 뿌리 낱말에서 알맞은 품사 고르기',
        make: function (R) {
          var it = R.pick(FORM);
          var why = {};
          it[2].forEach(function (x) { why[x[0]] = x[0] + ' — ' + x[1] + '. 이 자리에 맞지 않습니다. 빈칸은 ' + it[3] + '입니다.'; });
          var pick = R.choices(it[1], it[2].map(function (x) { return x[0]; }));
          return {
            type: 'choice', concept: 5,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === it[1] ? '' : why[c] || ''; }),
            explain: '빈칸은 ' + it[3] + '입니다. 그래서 정답은 ' + it[1] + '입니다.\n\n' + bold(it[0], it[1]) + '\n\n' + it[4],
          };
        },
      },
    ],

    vocab: [
      { w: 'hire', m: '고용하다', ex: 'The café hired two new bakers.', exm: '그 카페는 제빵사 두 명을 새로 고용했습니다.' },
      { w: 'promote', m: '승진시키다; 홍보하다', ex: 'She was promoted to head chef.', exm: '그녀는 주방장으로 승진했습니다.' },
      { w: 'colleague', m: '(직장) 동료', ex: 'My colleagues gave me a birthday card.', exm: '동료들이 나에게 생일 카드를 주었습니다.' },
      { w: 'applicant', m: '지원자', ex: 'Each applicant will have a short interview.', exm: '지원자마다 짧은 면접을 봅니다.' },
      { w: 'agenda', m: '회의 안건 목록', ex: 'What is on the agenda for today?', exm: '오늘 회의 안건은 무엇입니까?' },
      { w: 'postpone', m: '미루다, 연기하다', ex: 'The trip was postponed until next month.', exm: '여행은 다음 달로 미뤄졌습니다.' },
      { w: 'reschedule', m: '일정을 다시 잡다', ex: 'Can we reschedule our lesson for Friday?', exm: '수업을 금요일로 다시 잡을 수 있을까요?' },
      { w: 'attend', m: '참석하다', ex: 'All students must attend the safety class.', exm: '모든 학생은 안전 수업에 참석해야 합니다.' },
      { w: 'shipment', m: '발송품, 배송', ex: 'The shipment of new books arrived today.', exm: '새 책 발송품이 오늘 도착했습니다.' },
      { w: 'invoice', m: '청구서, 송장', ex: 'The invoice was sent by e-mail.', exm: '청구서는 이메일로 보내졌습니다.' },
      { w: 'refund', m: '환불; 환불하다', ex: 'I asked for a refund because the toy was broken.', exm: '장난감이 망가져 있어서 환불을 요청했습니다.' },
      { w: 'survey', m: '설문 조사', ex: 'Our class did a survey about favorite fruits.', exm: '우리 반은 좋아하는 과일에 대해 설문 조사를 했습니다.' },
      { w: 'discount', m: '할인', ex: 'Students get a discount at this museum.', exm: '이 박물관에서는 학생이 할인을 받습니다.' },
      { w: 'launch', m: '출시하다; 출시', ex: 'The company launched a new phone last week.', exm: '그 회사는 지난주에 새 전화기를 출시했습니다.' },
      { w: 'feedback', m: '의견, 반응', ex: 'The teacher gave us useful feedback on our essays.', exm: '선생님은 우리 에세이에 도움이 되는 의견을 주셨습니다.' },
      { w: 'deadline', m: '마감 기한', ex: 'We finished the project before the deadline.', exm: '우리는 마감 전에 프로젝트를 끝냈습니다.' },
    ],
  });
})();
