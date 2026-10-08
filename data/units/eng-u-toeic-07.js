/* 공인영어시험 기초 (토익형) · 관계사와 명사절
 * 예문·지문은 모두 직접 쓴 문장이다(가상의 회사·인물). */
(function () {
  // 관계사 고르기 생성기: [빈칸 문장, 선행사, 선행사 종류('person'|'thing'|'place'|'time'), 정답, 해석]
  var REL = [
    ['The woman ___ called this morning is a new client.', 'The woman', 'person', 'who', '오늘 아침에 전화한 여성은 새 고객입니다.'],
    ['We need an engineer ___ can speak Chinese.', 'an engineer', 'person', 'who', '우리는 중국어를 할 줄 아는 기술자가 필요합니다.'],
    ['Employees ___ live far from the office can work from home.', 'Employees', 'person', 'who', '사무실에서 멀리 사는 직원은 집에서 일할 수 있습니다.'],
    ['The consultant ___ visited us last week sent a report.', 'The consultant', 'person', 'who', '지난주 우리를 찾아온 컨설턴트가 보고서를 보냈습니다.'],
    ['Please return the laptop ___ you borrowed yesterday.', 'the laptop', 'thing', 'which', '어제 빌려 간 노트북을 돌려주십시오.'],
    ['The printer ___ is on the second floor is broken.', 'The printer', 'thing', 'which', '2층에 있는 프린터가 고장 났습니다.'],
    ['We sent the report ___ Mr. Lim wrote.', 'the report', 'thing', 'which', '우리는 임 씨가 쓴 보고서를 보냈습니다.'],
    ['Customers like the new menu ___ was introduced in May.', 'the new menu', 'thing', 'which', '손님들은 5월에 나온 새 메뉴를 좋아합니다.'],
    ['We contacted the customer ___ order was delayed.', 'the customer', 'person', 'whose', '우리는 주문이 늦어진 고객에게 연락했습니다.'],
    ['The company hired a manager ___ experience is impressive.', 'a manager', 'person', 'whose', '그 회사는 경력이 인상적인 관리자를 뽑았습니다.'],
    ['We work with a supplier ___ prices are very low.', 'a supplier', 'thing', 'whose', '우리는 가격이 매우 낮은 공급업체와 일합니다.'],
    ['Applicants ___ documents are incomplete will be contacted.', 'Applicants', 'person', 'whose', '서류가 다 갖추어지지 않은 지원자에게는 연락이 갑니다.'],
    ['This is the hotel ___ we stayed last year.', 'the hotel', 'place', 'where', '여기가 우리가 작년에 묵은 호텔입니다.'],
    ['The city ___ the conference will be held is famous for its beaches.', 'The city', 'place', 'where', '학회가 열릴 도시는 해변으로 유명합니다.'],
    ['Please go to the room ___ the interviews are taking place.', 'the room', 'place', 'where', '면접이 진행되고 있는 방으로 가십시오.'],
    ['We visited the factory ___ the new phones are made.', 'the factory', 'place', 'where', '우리는 새 전화기가 만들어지는 공장을 방문했습니다.'],
    ['I still remember the day ___ we opened our first store.', 'the day', 'time', 'when', '나는 우리가 첫 가게를 연 날을 아직 기억합니다.'],
    ['Monday is the day ___ the shop receives new stock.', 'the day', 'time', 'when', '월요일은 그 가게에 새 물건이 들어오는 날입니다.'],
    ['Spring is the season ___ sales usually rise.', 'the season', 'time', 'when', '봄은 대개 매출이 오르는 계절입니다.'],
    ['Please call during the hours ___ our office is open.', 'the hours', 'time', 'when', '우리 사무실이 문을 여는 시간에 전화해 주십시오.'],
  ];
  var REL_WRONGS = { who: ['which', 'whose', 'what'], which: ['who', 'where', 'what'], whose: ['who', 'which', 'what'], where: ['which', 'who', 'what'], when: ['which', 'who', 'what'] };
  var KIND = { person: '사람', thing: '사물', place: '장소', time: '때' };

  // that·what 생성기: [빈칸 문장, 정답, 해석, (what 문장) 빠진 성분]
  var TW = [
    ['We believe ___ the new design will attract young customers.', 'that', '우리는 새 디자인이 젊은 손님을 끌 것이라고 믿습니다.', ''],
    ['The survey shows ___ most customers prefer online payment.', 'that', '설문 조사는 대부분의 손님이 온라인 결제를 더 좋아한다는 것을 보여 줍니다.', ''],
    ['Please note ___ the office will be closed on Monday.', 'that', '사무실이 월요일에 문을 닫는다는 점에 유의해 주십시오.', ''],
    ['Mr. Yang announced ___ he would retire next year.', 'that', '양 씨는 내년에 은퇴하겠다고 발표했습니다.', ''],
    ['Our records show ___ your payment was received on May 3.', 'that', '저희 기록에 따르면 귀하의 대금은 5월 3일에 들어왔습니다.', ''],
    ['___ the customers want is faster delivery.', 'what', '손님들이 원하는 것은 더 빠른 배송입니다.', 'want의 목적어가'],
    ['This is exactly ___ we ordered.', 'what', '이것이 바로 우리가 주문한 것입니다.', 'ordered의 목적어가'],
    ['The new chairs are not ___ we expected.', 'what', '새 의자는 우리가 기대한 것이 아닙니다.', 'expected의 목적어가'],
    ['We were surprised by ___ the survey showed.', 'what', '우리는 설문 조사가 보여 준 결과에 놀랐습니다.', 'showed의 목적어가'],
    ['Ms. Song explained ___ happened at the meeting.', 'what', '송 씨는 회의에서 있었던 일을 설명했습니다.', 'happened의 주어가'],
    ['___ impressed the judges was the simple design.', 'what', '심사위원들을 감동시킨 것은 단순한 디자인이었습니다.', 'impressed의 주어가'],
  ];

  // whether 생성기: [빈칸 문장, 자리('subject'|'prep'|'toinf'|'ornot'), 해석]
  var WH = [
    ['___ the event will be held outdoors depends on the weather.', 'subject', '행사를 야외에서 열지는 날씨에 달려 있습니다.'],
    ['___ the meeting will start on time is still unclear.', 'subject', '회의가 제시간에 시작할지는 아직 분명하지 않습니다.'],
    ['___ the price includes tax is not stated in the ad.', 'subject', '가격에 세금이 들어 있는지는 광고에 나와 있지 않습니다.'],
    ['The decision depends on ___ the client accepts our offer.', 'prep', '결정은 고객이 우리 제안을 받아들이는지에 달려 있습니다.'],
    ['We had a long discussion about ___ we should open a new branch.', 'prep', '우리는 새 지점을 열어야 하는지를 두고 오래 논의했습니다.'],
    ['The result will depend on ___ the budget is approved.', 'prep', '결과는 예산이 승인되는지에 달려 있습니다.'],
    ['We have not decided ___ to renew the contract.', 'toinf', '우리는 계약을 갱신할지 아직 정하지 않았습니다.'],
    ['Ms. Ha is not sure ___ to accept the job offer.', 'toinf', '하 씨는 그 일자리 제안을 받아들일지 확신하지 못합니다.'],
    ['The team is discussing ___ to delay the launch.', 'toinf', '팀은 출시를 미룰지 논의하고 있습니다.'],
    ['Please tell us ___ or not you will attend the dinner.', 'ornot', '저녁 모임에 오실지 안 오실지 알려 주십시오.'],
    ['I would like to know ___ or not the room has a desk.', 'ornot', '그 방에 책상이 있는지 없는지 알고 싶습니다.'],
    ['Let us know ___ or not the price includes delivery.', 'ornot', '가격에 배송비가 들어 있는지 없는지 알려 주십시오.'],
  ];
  var WH_IF = {
    subject: 'if가 이끄는 "~인지" 절은 문장 맨 앞 주어 자리에 쓰지 않습니다. 주어 자리에는 whether를 씁니다.',
    prep: 'if가 이끄는 "~인지" 절은 전치사 뒤에 쓰지 않습니다. 전치사 뒤에는 whether를 씁니다.',
    toinf: 'if 뒤에는 to부정사를 쓰지 않습니다. "~할지"는 whether to + 동사원형입니다.',
    ornot: 'if 바로 뒤에는 or not을 붙이지 않습니다. "~인지 아닌지"는 whether or not입니다.',
  };
  var WH_WHAT = {
    subject: 'what 뒤에는 주어나 목적어가 빠진 문장이 옵니다. 빈칸 뒤 문장은 빠진 것 없이 완전하고, 뜻도 "~인지"가 되어야 합니다.',
    prep: 'what 뒤에는 주어나 목적어가 빠진 문장이 옵니다. 빈칸 뒤 문장은 빠진 것 없이 완전하고, 뜻도 "~인지"가 되어야 합니다.',
    toinf: 'what to 뒤에는 목적어가 빠진 동사가 옵니다(what to do처럼). 빈칸 뒤에는 목적어까지 다 있습니다.',
    ornot: 'what 뒤에 or not을 붙여 쓰지 않습니다. "~인지 아닌지"는 whether or not입니다.',
  };
  var WH_PLACE = { subject: '문장 맨 앞 주어 자리', prep: '전치사 바로 뒤', toinf: 'to부정사 바로 앞', ornot: 'or not 바로 앞' };

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function bold(sentence, word) { return sentence.replace('___', '**' + word + '**'); }

  Tutor.registerUnit({
    id: 'eng-u-toeic-07',
    course: 'eng-u-toeic',
    title: '관계사와 명사절',
    summary: '선행사에 맞는 관계사를 고르고, 관계사와 명사절 접속사를 뒤 문장이 완전한지로 구별합니다.',
    goals: [
      '선행사가 사람인지 사물인지 보고 관계대명사 who, which, that, whose를 고를 수 있다.',
      '뒤 문장이 완전한지 보고 관계대명사와 관계부사(where, when)를 구별할 수 있다.',
      '명사절 접속사 that과 what, whether와 if를 쓰임에 맞게 고를 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '관계대명사 who, which, that',
        body: '**관계대명사**는 앞의 명사(**선행사**)를 뒤에서 꾸미는 문장을 이끕니다. 선행사가 무엇인지에 따라 고릅니다.\n\n' +
          '| 선행사 | 관계대명사 |\n|---|---|\n' +
          '| 사람 | **who** (또는 that) |\n' +
          '| 사물·동물 | **which** (또는 that) |\n\n' +
          '- The woman **who** called this morning is a new client. (오늘 아침에 전화한 여성)\n' +
          '- The printer **which** is on the second floor is broken. (2층에 있는 프린터)\n\n' +
          '관계대명사는 뒤 문장에서 **주어나 목적어 노릇**을 하므로, 관계대명사 뒤에는 **주어나 목적어가 빠진 문장**이 옵니다. 위 예에서 who 뒤에는 called의 주어가, which 뒤에는 is의 주어가 빠져 있습니다.\n\n' +
          '> 💡 주어 자리 관계대명사 뒤의 동사는 **선행사에 수를 맞춥니다.** Employees who **work** on weekends … (선행사 Employees가 복수)\n\n' +
          '> ⚠️ 선행사를 먼저 찾으십시오. "사람이니까 who"를 빈칸 바로 앞 낱말로만 판단하면 틀리기 쉽습니다.',
        easy: '관계대명사는 앞의 명사에 붙이는 **설명 꼬리표**입니다. "어떤 여성? → 오늘 아침에 전화한 여성"처럼, 꼬리표가 명사를 구체적으로 알려 줍니다.\n\n' +
          '꼬리표의 첫 낱말만 고르면 됩니다. 사람에게 붙이면 who, 물건에 붙이면 which, 어느 쪽이든 쓸 수 있는 만능 꼬리표가 that입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nWe need an engineer ___ can speak Chinese.',
          choices: ['which', 'who', 'what'],
          answer: 1,
          why: [
            '선행사 an engineer는 사람입니다. which는 사물 선행사에 씁니다.',
            '',
            'what은 앞에 선행사가 없을 때 씁니다. 이 문장에는 선행사 an engineer가 있습니다.',
          ],
          explain: '선행사(an engineer)가 **사람**이고 빈칸 뒤에 can speak의 주어가 빠져 있으므로 **who**입니다. "우리는 중국어를 할 줄 아는 기술자가 필요합니다."',
        },
      },
      {
        title: '목적격 관계대명사와 that을 쓸 수 없는 자리',
        body: '관계대명사가 뒤 문장에서 **목적어** 노릇을 하면 목적격 관계대명사입니다. 이때 관계대명사 뒤에는 **주어 + 동사**가 오고, 동사의 목적어가 빠져 있습니다.\n\n' +
          '- the report **which** Mr. Lim wrote (wrote의 목적어가 빠짐 → 그것이 the report)\n' +
          '- the consultant **who(m)** we hired (hired의 목적어가 빠짐)\n\n' +
          '목적격 관계대명사는 **생략할 수 있습니다**: the report Mr. Lim wrote. 그래서 명사 바로 뒤에 주어 + 동사가 이어지면 관계대명사가 생략된 것일 수 있습니다.\n\n' +
          '**that을 쓸 수 없는 자리**가 두 곳 있습니다.\n' +
          '1. **쉼표 뒤**: Our head office, **which** is in Seoul, … (that ×)\n' +
          '2. **전치사 바로 뒤**: the room **in which** we met (in that ×)\n\n' +
          '> ⚠️ 주어 자리의 관계대명사는 생략할 수 없습니다: The printer is on the second floor is broken (×)',
        easy: '"임 씨가 쓴 보고서"를 영어로 하면 보고서(the report)를 먼저 말하고, 뒤에 "임 씨가 썼다(Mr. Lim wrote)"를 붙입니다. 무엇을 썼는지는 이미 앞에 나왔으니 wrote 뒤가 비어 있습니다.\n\n' +
          '그 빈자리를 이어 주는 것이 which이고, 너무 뻔해서 빼도 뜻이 통합니다. the report (which) Mr. Lim wrote.',
        check: {
          type: 'ox',
          q: '다음 문장은 어법에 맞습니다.\n\nOur head office, that is in Seoul, has 300 employees.',
          answer: false,
          explain: '쉼표 뒤에는 관계대명사 that을 쓰지 않습니다. 선행사가 사물이므로 Our head office, **which** is in Seoul, has 300 employees.(서울에 있는 우리 본사에는 직원이 300명 있습니다)로 고칩니다.',
        },
      },
      {
        title: '소유격 관계대명사 whose',
        body: '**whose**는 "그 선행사**의**"라는 뜻으로, 뒤에 **관사 없는 명사**가 바로 붙습니다. 선행사가 사람이든 사물이든 씁니다.\n\n' +
          '- We contacted the customer **whose order** was delayed. (주문이 늦어진 고객 → 그 고객의 주문)\n' +
          '- We work with a supplier **whose prices** are very low. (가격이 낮은 공급업체 → 그 업체의 가격)\n\n' +
          '**판별법**: whose + 명사 뒤의 문장은 그 명사를 주어나 목적어로 삼으면 완전합니다. 그리고 선행사와 그 명사 사이에 "~의" 관계가 있습니다(the customer → the customer\'s order).\n\n' +
          '| 빈칸 뒤 | 고를 말 |\n|---|---|\n' +
          '| 동사 (주어가 빠짐) | who / which |\n' +
          '| 주어 + 동사 (목적어가 빠짐) | who(m) / which |\n' +
          '| 관사 없는 명사 + 동사 ("~의" 관계) | **whose** |\n\n' +
          '> ⚠️ whose 뒤 명사에는 the, a를 붙이지 않습니다: whose the order (×)',
        easy: 'whose는 "그 사람의, 그것의"를 한 낱말로 줄인 것입니다.\n\n"주문이 늦어진 고객" = 고객 + **그 고객의** 주문이 늦어졌다 → the customer **whose** order was delayed\n\n빈칸 뒤에 명사가 바로 오고 "선행사의 ○○"라고 읽히면 whose입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nApplicants ___ documents are incomplete will be contacted.',
          choices: ['who', 'whose', 'which'],
          answer: 1,
          why: [
            'who 뒤에는 동사나 주어 + 동사가 옵니다. 빈칸 뒤 documents는 지원자의 서류("지원자의")라는 관계입니다.',
            '',
            'which는 사물 선행사에 쓰고, 뒤에 "선행사의 ~"라는 명사를 받지 않습니다.',
          ],
          explain: '"지원자**의** 서류가 다 갖추어지지 않은"이라는 관계이므로 소유격 **whose**입니다. "서류가 다 갖추어지지 않은 지원자에게는 연락이 갑니다."',
        },
      },
      {
        title: '관계대명사와 관계부사 구별',
        body: '**관계부사**(where, when, why)도 선행사를 꾸미는 문장을 이끕니다. 관계대명사와 다른 점은 **뒤 문장이 완전하다**는 것입니다.\n\n' +
          '| 관계부사 | 선행사 | 바꿔 쓰기 |\n|---|---|---|\n' +
          '| where | 장소 (the hotel, the city) | in/at which |\n' +
          '| when | 때 (the day, the season) | on/in which |\n' +
          '| why | 이유 (the reason) | for which |\n\n' +
          '- This is the hotel **where** we stayed last year. (we stayed last year: 빠진 것 없음)\n' +
          '- This is the hotel **which** has a pool. (has의 주어가 빠짐)\n' +
          '- This is the hotel **which** we booked. (booked의 목적어가 빠짐)\n\n' +
          '**판별법**: 선행사가 장소라고 바로 where를 고르지 말고 **빈칸 뒤 문장에 빠진 것이 있는지** 보십시오. 빠진 것이 없으면 관계부사, 주어나 목적어가 빠졌으면 관계대명사입니다.\n\n' +
          '> 💡 where = 전치사 + which 이므로 the hotel **at which** we stayed도 맞습니다.',
        easy: '관계대명사는 **퍼즐 조각**입니다. 뒤 문장에 구멍(주어나 목적어 자리)이 있고, 관계대명사가 그 구멍을 메웁니다.\n\n관계부사는 **길 안내판**입니다. 뒤 문장은 구멍 없이 완전하고, where는 "거기에서", when은 "그때에"라는 배경만 알려 줍니다.\n\n그래서 먼저 뒤 문장에 구멍이 있는지 보십시오.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nThis is the conference room ___ we will hold the interviews.',
          choices: ['which', 'where', 'who'],
          answer: 1,
          why: [
            '빈칸 뒤 we will hold the interviews는 주어·목적어가 다 있는 완전한 문장입니다. which 뒤에는 무언가 빠진 문장이 옵니다.',
            '',
            '선행사 the conference room은 사람이 아니라 장소입니다.',
          ],
          explain: '선행사가 장소이고 빈칸 뒤 문장이 **완전**하므로 관계부사 **where**입니다(= in which). "이곳이 면접을 볼 회의실입니다."',
        },
      },
      {
        title: '명사절 접속사 that과 what',
        body: '**명사절**은 문장 안에서 주어·목적어·보어 노릇을 하는 절입니다. that과 what이 둘 다 명사절을 이끌지만, 뒤 문장이 다릅니다.\n\n' +
          '| 접속사 | 뜻 | 뒤 문장 |\n|---|---|---|\n' +
          '| that | ~라는 것 | **완전한 문장** |\n' +
          '| what | ~하는 것 (= the thing which) | 주어나 목적어가 **빠진 문장** |\n\n' +
          '- We believe **that** the new design will attract young customers. (빠진 것 없음)\n' +
          '- **What** the customers want is faster delivery. (want의 목적어가 빠짐)\n\n' +
          'what은 그 안에 선행사(the thing)를 품고 있어서 **앞에 선행사가 없습니다.** 앞에 명사가 있고 뒤가 불완전하면 관계대명사(which, that), 앞에 명사가 없고 뒤가 불완전하면 what입니다.\n\n' +
          '> 💡 what은 전치사 뒤에도 자주 옵니다: We were surprised by **what** the survey showed.',
        easy: 'what은 "**~하는 것**"이라는 상자입니다. 상자 안에 물건이 하나 빠져 있습니다. "손님이 **원하는 것**" — 원하는 대상이 빠져 있고, 그 빈 곳이 what입니다.\n\nthat은 "**~라는 사실**"이라는 포장지입니다. 문장 하나를 빠짐없이 통째로 쌉니다. "새 디자인이 손님을 끌 것이라는 (사실)".',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\n___ the customers want is faster delivery.',
          choices: ['That', 'What', 'Which'],
          answer: 1,
          why: [
            'that 뒤에는 완전한 문장이 와야 합니다. 빈칸 뒤 문장에는 want의 목적어가 빠져 있습니다.',
            '',
            'which는 앞에 꾸밀 선행사가 있어야 합니다. 빈칸이 문장 맨 앞이라 선행사가 없습니다.',
          ],
          explain: '앞에 선행사가 없고 빈칸 뒤에 want의 목적어가 빠져 있으므로 **What**(~하는 것)입니다. "손님들이 원하는 것은 더 빠른 배송입니다."',
        },
      },
      {
        title: 'whether와 if — "~인지"',
        body: '"**~인지 (아닌지)**"라는 명사절은 **whether**나 **if**가 이끕니다. 뒤에는 완전한 문장이 옵니다.\n\n' +
          '- Ms. Kang asked me **whether / if** I could work on Saturday. (동사의 목적어 → 둘 다 됨)\n\n' +
          '그런데 **if는 주로 동사의 목적어 자리에서만** 씁니다. 다음 자리에는 **whether만** 씁니다.\n\n' +
          '| 자리 | 예 |\n|---|---|\n' +
          '| 문장 맨 앞 주어 | **Whether** the event will be held outdoors depends on the weather. |\n' +
          '| 전치사 바로 뒤 | It depends on **whether** the budget is approved. |\n' +
          '| to부정사 앞 | We have not decided **whether** to renew the contract. |\n' +
          '| or not 바로 앞 | Please tell us **whether or not** you will attend. |\n\n' +
          '> 💡 or not을 문장 끝에 두면 if도 씁니다: Tell us **if** you will attend **or not**.\n\n' +
          '> ⚠️ "만약 ~라면"이라는 조건의 if(부사절)와는 다릅니다. Please call me **if** you are late.(늦으면 전화하십시오)의 if는 명사절이 아닙니다.',
        easy: 'whether는 **어디에나 가는 만능 열쇠**, if는 **동사 바로 뒤 한 곳만 여는 열쇠**라고 생각하십시오.\n\n"~인지"를 문장 맨 앞에 두거나, about·on 같은 전치사 뒤에 두거나, to부정사나 or not과 붙여 쓸 때는 만능 열쇠 whether를 꺼냅니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nWe have not decided ___ to renew the contract.',
          choices: ['if', 'whether', 'what'],
          answer: 1,
          why: [
            'if 뒤에는 to부정사를 쓰지 않습니다. "~할지"는 whether to + 동사원형입니다.',
            '',
            'what to 뒤에는 목적어가 빠진 동사가 옵니다(what to do처럼). renew 뒤에 목적어 the contract가 이미 있습니다.',
          ],
          explain: '"계약을 갱신**할지**"라는 뜻이고 바로 뒤에 to부정사가 오므로 **whether**입니다. "우리는 계약을 갱신할지 아직 정하지 않았습니다."',
        },
      },
    ],

    examples: [
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\nThe company hired a designer ___ ideas helped increase sales.\n\n(A) who (B) which (C) whose (D) what',
        steps: [
          '빈칸 앞에 선행사 a designer가 있으므로 선행사가 없는 what(D)은 빠집니다.',
          '빈칸 뒤를 봅니다. ideas helped increase sales는 명사 ideas가 주어, helped가 동사인 완전한 문장입니다.',
          'ideas는 "그 디자이너의 아이디어"라는 관계입니다. 관사 없는 명사 앞에서 "~의"를 나타내는 것은 whose입니다.',
          '정답은 (C)입니다. "그 회사는 아이디어로 매출을 늘리는 데 도움을 준 디자이너를 뽑았습니다."',
        ],
        answer: '(C) whose',
      },
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\nWe were pleased with ___ the consultant suggested.\n\n(A) that (B) what (C) which (D) whether',
        steps: [
          '빈칸 앞은 전치사 with이고, 그 앞에 꾸밈받을 선행사 명사가 없습니다. 관계대명사 which(C)는 빠집니다.',
          '빈칸 뒤 the consultant suggested에는 suggested의 목적어가 빠져 있습니다. 완전한 문장을 받는 that(A)과 whether(D)는 빠집니다.',
          '선행사 없이 불완전한 문장을 이끄는 것은 what입니다. "컨설턴트가 제안한 것에 우리는 만족했습니다."',
        ],
        answer: '(B) what',
      },
    ],

    terms: [
      { term: '선행사', def: '관계사가 이끄는 절이 꾸미는 앞의 명사입니다. 예: the woman who called에서 the woman' },
      { term: '관계대명사', def: '선행사를 꾸미는 절을 이끌면서 그 절 안에서 주어·목적어 노릇을 하는 말입니다. 뒤에 불완전한 문장이 옵니다. 예: who, which, that' },
      { term: '소유격 관계대명사', def: '"그 선행사의"라는 뜻으로 뒤에 관사 없는 명사가 붙는 whose입니다. 예: the customer whose order was delayed' },
      { term: '관계부사', def: '장소·때·이유의 선행사를 꾸미고 뒤에 완전한 문장이 오는 where, when, why입니다. 전치사 + which로 바꿀 수 있습니다.' },
      { term: '명사절', def: '문장 안에서 주어·목적어·보어 노릇을 하는 절입니다. that, what, whether, if 등이 이끕니다.' },
      { term: '완전한 문장', def: '동사에 필요한 주어·목적어·보어가 빠짐없이 다 있는 문장입니다. 예: we stayed last year' },
      { term: '불완전한 문장', def: '동사에 필요한 주어나 목적어가 빠진 문장입니다. 예: the customers want(목적어가 빠짐)' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe engineer ___ designed this bridge will give a talk tomorrow.',
        choices: ['which', 'what', 'who', 'whose'],
        answer: 2,
        why: [
          '선행사 The engineer는 사람입니다. which는 사물 선행사에 씁니다.',
          'what은 선행사가 없을 때 씁니다. 이 문장에는 선행사 The engineer가 있습니다.',
          '',
          'whose 뒤에는 관사 없는 명사가 와야 합니다. 빈칸 뒤에는 동사 designed가 왔습니다.',
        ],
        explain: '선행사가 사람(The engineer)이고 빈칸 뒤에 designed의 주어가 빠져 있으므로 **who**입니다. "이 다리를 설계한 기술자가 내일 강연을 합니다."',
      },
      {
        id: 'p2', level: 2, type: 'order', concept: 0,
        q: '낱말 덩어리를 바른 순서로 놓아 문장을 완성하십시오.\n\n(뜻: 한 씨와 이야기하고 있는 여성이 우리의 새 관리자입니다.)',
        choices: ['is our new manager', 'The woman', 'to Mr. Han', 'who is talking'],
        answer: [1, 3, 2, 0],
        explain: 'The woman / who is talking / to Mr. Han / is our new manager. — who is talking to Mr. Han이 The woman을 뒤에서 꾸미고, 문장 전체의 동사는 is입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe report ___ Ms. Seo wrote is on your desk.',
        choices: ['who', 'which', 'what', 'whose'],
        answer: 1,
        why: [
          '선행사 The report는 사물입니다. who는 사람 선행사에 씁니다.',
          '',
          'what은 선행사가 없을 때 씁니다. 이 문장에는 선행사 The report가 있습니다.',
          'whose 뒤의 명사는 선행사의 것이어야 합니다. Ms. Seo는 "보고서의 서 씨"가 아닙니다.',
        ],
        explain: '선행사가 사물(The report)이고 빈칸 뒤 Ms. Seo wrote에 wrote의 목적어가 빠져 있으므로 목적격 **which**입니다(that도 되고, 생략해도 됩니다). "서 씨가 쓴 보고서가 책상 위에 있습니다."',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: '다음 문장에서 that을 빼도 어법에 맞는 문장이 됩니다.\n\nThe book that you lent me was very helpful.',
        answer: true,
        explain: 'that은 lent의 목적어 노릇을 하는 목적격 관계대명사라서 생략할 수 있습니다. The book you lent me was very helpful.(네가 빌려준 책은 아주 도움이 되었다)도 맞습니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nWe will call the applicants ___ documents were selected.',
        choices: ['who', 'whose', 'which', 'where'],
        answer: 1,
        why: [
          'who 뒤에는 동사나 주어 + 동사가 옵니다. 빈칸 뒤 documents는 "지원자의 서류"라는 관계입니다.',
          '',
          'which는 사물 선행사에 쓰고, 뒤에 "선행사의 ~"라는 명사를 받지 않습니다.',
          'where는 장소 선행사에 씁니다. the applicants는 사람입니다.',
        ],
        explain: '"지원자**의** 서류가 뽑혔다"라는 관계이므로 소유격 **whose**입니다. "서류가 뽑힌 지원자에게 전화하겠습니다."',
      },
      {
        id: 'p6', level: 2, type: 'short', check: 'text', concept: 2,
        q: '빈칸에 알맞은 관계대명사 한 낱말을 쓰십시오.\n\nMs. Jung is the designer ___ work won the award.',
        answer: ['whose'],
        hint: 'work는 누구의 작품입니까?',
        wrong: [
          { a: 'who', why: '빈칸 뒤 work는 "그 디자이너의 작품"입니다. 명사 앞에서 "~의"를 나타내는 소유격 whose를 씁니다.' },
          { a: 'that', why: 'that 뒤에는 "~의" 관계인 명사가 바로 올 수 없습니다. 소유격 whose를 씁니다.' },
        ],
        explain: 'work는 "그 디자이너**의** 작품"이므로 소유격 **whose**입니다. "정 씨는 작품으로 상을 받은 디자이너입니다."',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nWe visited the factory ___ the new phones are made.',
        choices: ['which', 'where', 'when', 'what'],
        answer: 1,
        why: [
          '빈칸 뒤 the new phones are made는 빠진 것 없는 완전한 문장입니다. which 뒤에는 무언가 빠진 문장이 옵니다.',
          '',
          'when은 때를 나타내는 선행사에 씁니다. the factory는 장소입니다.',
          'what은 선행사가 없을 때 씁니다. 이 문장에는 선행사 the factory가 있습니다.',
        ],
        explain: '선행사가 장소(the factory)이고 뒤 문장(수동태)이 완전하므로 관계부사 **where**입니다. "우리는 새 전화기가 만들어지는 공장을 방문했습니다."',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThis is the conference room ___ has the largest screen in the building.',
        choices: ['where', 'when', 'which', 'whose'],
        answer: 2,
        why: [
          '선행사가 장소라도 빈칸 뒤에 주어가 빠져 있으면 관계부사를 쓰지 않습니다. has의 주어가 필요합니다.',
          'when은 때 선행사에 쓰고, 관계부사라 뒤에 완전한 문장이 와야 합니다.',
          '',
          'whose 뒤에는 관사 없는 명사가 와야 합니다. 빈칸 뒤에는 동사 has가 왔습니다.',
        ],
        hint: '선행사만 보지 말고 빈칸 뒤 문장에 주어가 있는지 보십시오.',
        explain: '빈칸 뒤 has the largest screen에는 **주어가 빠져** 있습니다. 그 주어 노릇을 하는 관계대명사 **which**가 필요합니다. "이곳이 건물에서 가장 큰 화면이 있는 회의실입니다."',
      },
      {
        id: 'p9', level: 1, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\n___ we need now is a clear plan.',
        choices: ['That', 'Which', 'What', 'Whether'],
        answer: 2,
        why: [
          'that 뒤에는 완전한 문장이 옵니다. 빈칸 뒤에는 need의 목적어가 빠져 있습니다.',
          'which는 앞에 선행사가 있어야 합니다. 빈칸이 문장 맨 앞입니다.',
          '',
          'whether 뒤에는 완전한 문장이 오고 뜻도 "~인지"입니다. need의 목적어가 빠져 있어 맞지 않습니다.',
        ],
        explain: '선행사가 없고 빈칸 뒤에 need의 목적어가 빠져 있으므로 **What**(~하는 것)입니다. "지금 우리에게 필요한 것은 분명한 계획입니다."',
      },
      {
        id: 'p10', level: 1, type: 'short', check: 'text', concept: 4,
        q: '빈칸에 that과 what 가운데 알맞은 것을 쓰십시오.\n\nThe manager said ___ the project was going well.',
        answer: ['that'],
        wrong: [{ a: 'what', why: '빈칸 뒤 the project was going well은 빠진 것 없는 완전한 문장입니다. what 뒤에는 주어나 목적어가 빠진 문장이 옵니다.' }],
        explain: '빈칸 뒤가 **완전한 문장**이므로 **that**(~라는 것)입니다. "관리자는 프로젝트가 잘 되어 가고 있다고 말했습니다."',
      },
      {
        id: 'p11', level: 1, type: 'choice', concept: 5,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nPlease let me know ___ you can attend the meeting.',
        choices: ['what', 'whether', 'which', 'who'],
        answer: 1,
        why: [
          'what 뒤에는 주어나 목적어가 빠진 문장이 옵니다. you can attend the meeting은 완전합니다.',
          '',
          'which는 앞에 선행사가 있어야 하고 뒤에 불완전한 문장이 옵니다.',
          'who는 사람 선행사를 꾸미거나 "누가"라는 뜻으로 쓰입니다. 빈칸 뒤에는 주어 you가 이미 있습니다.',
        ],
        explain: '"회의에 오실 수 있는**지**"라는 뜻이고 뒤 문장이 완전하므로 **whether**입니다. 동사 know의 목적어 자리라서 if를 써도 됩니다.',
      },
      {
        id: 'p12', level: 2, type: 'ox', concept: 5,
        q: '다음 문장은 어법에 맞습니다.\n\nIf the event will be held outdoors depends on the weather.',
        answer: false,
        explain: '"~인지"라는 명사절이 **문장 맨 앞 주어 자리**에 오면 if를 쓰지 않고 whether를 씁니다. **Whether** the event will be held outdoors depends on the weather.(행사를 야외에서 열지는 날씨에 달려 있습니다)',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 3,
        q: '어법에 **옳지 않은** 문장은 무엇입니까?',
        choices: [
          'This is the office where I work.',
          'This is the office which I work in.',
          'This is the office in which I work.',
          'This is the office which I work.',
        ],
        answer: 3,
        why: [
          '선행사가 장소이고 I work가 완전하므로 관계부사 where가 맞습니다.',
          '끝의 전치사 in의 목적어가 빠져 있어 관계대명사 which가 맞습니다.',
          'in which는 where와 같습니다. 맞는 문장입니다.',
          '',
        ],
        hint: 'which 뒤 문장에 빠진 것이 있는지 하나씩 보십시오.',
        explain: 'I work는 빠진 것 없는 완전한 문장이라 관계대명사 which를 바로 받을 수 없습니다. where, in which를 쓰거나 끝에 in을 붙여야 합니다. 그래서 **This is the office which I work.**가 옳지 않습니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 4,
        q: '빈칸 (A), (B)에 들어갈 말을 차례대로 고르십시오.\n\n(A) surprised us was (B) the concert tickets sold out in an hour.',
        choices: ['That / what', 'What / what', 'What / that', 'That / that'],
        answer: 2,
        why: [
          '두 칸이 모두 거꾸로입니다. (A) 뒤에는 surprised의 주어가 빠져 있고, (B) 뒤는 완전한 문장입니다.',
          '(A)는 맞지만 (B) 뒤 the concert tickets sold out in an hour는 완전한 문장이라 what이 아니라 that입니다.',
          '',
          '(B)는 맞지만 (A) 뒤 surprised us에는 주어가 빠져 있어 that이 아니라 what입니다.',
        ],
        hint: '(A)와 (B) 뒤 문장이 각각 완전한지 보십시오.',
        explain: '(A) surprised의 주어가 빠짐 → **What**(~한 것), (B) 빠진 것 없는 완전한 문장 → **that**(~라는 것). "우리를 놀라게 한 것은 공연 표가 한 시간 만에 다 팔렸다는 것이었습니다."',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nWe work with a company ___ products are sold in more than 20 countries.',
        choices: ['which', 'who', 'what', 'whose'],
        answer: 3,
        why: [
          '선행사가 사물이라 which를 고르기 쉽지만, 빈칸 뒤 products는 "그 회사의 제품"이라는 관계입니다. which는 이런 명사를 받지 않습니다.',
          '선행사 a company는 사람이 아니고, who 뒤에도 "~의" 관계인 명사가 오지 않습니다.',
          'what은 선행사가 없을 때 씁니다. 이 문장에는 선행사 a company가 있습니다.',
          '',
        ],
        hint: 'products는 무엇의 제품입니까?',
        explain: 'products는 "그 회사**의** 제품"입니다. whose는 선행사가 **사물이어도** 씁니다. "우리는 제품이 20개국이 넘는 나라에서 팔리는 회사와 일합니다."',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 5,
        q: '빈칸에 whether 대신 if를 써도 되는 문장은 무엇입니까?',
        choices: [
          '___ the new plan works is not clear yet.',
          'The team is talking about ___ to delay the launch.',
          'Ms. Kang asked me ___ I could work on Saturday.',
          'I wonder ___ or not the price includes tax.',
        ],
        answer: 2,
        why: [
          '문장 맨 앞 주어 자리입니다. 주어 자리에는 whether만 씁니다.',
          '전치사 about 바로 뒤이고 to부정사 앞입니다. 두 가지 모두 whether만 쓰는 자리입니다.',
          '',
          'or not 바로 앞입니다. whether or not으로만 씁니다.',
        ],
        hint: 'if는 주로 어느 자리에서만 쓸 수 있었는지 떠올려 보십시오.',
        explain: 'if는 주로 **동사의 목적어 자리**에서만 씁니다. asked의 목적어 자리인 세 번째 문장만 if를 쓸 수 있습니다. "강 씨는 내가 토요일에 일할 수 있는지 물었습니다."',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe printers that ___ on the second floor were replaced last month.',
        choices: ['is', 'are', 'was', 'being'],
        answer: 1,
        why: [
          '관계대명사 that의 선행사는 The printers(복수)입니다. 관계절의 동사는 선행사에 수를 맞춥니다.',
          '',
          '선행사 The printers가 복수라 단수 동사 was는 맞지 않습니다.',
          'being은 시제가 있는 동사가 아니라서 관계절의 동사 자리에 올 수 없습니다.',
        ],
        hint: 'that이 가리키는 선행사를 찾고, 그 선행사가 단수인지 복수인지 보십시오.',
        explain: '주어 자리 관계대명사 that의 선행사는 **The printers(복수)**이므로 관계절의 동사도 **are**입니다. 문장 전체의 동사 were replaced와 따로 봅니다. "2층에 있는 프린터들은 지난달에 교체되었습니다."',
      },
      {
        id: 'a6', level: 3, type: 'short', check: 'text', concept: 3,
        q: '빈칸에 알맞은 관계부사 한 낱말을 쓰십시오.\n\nFriday, ___ most customers visit our store, is our busiest day.',
        answer: ['when'],
        hint: '선행사는 Friday(때)이고, 빈칸 뒤 문장에는 빠진 것이 없습니다.',
        wrong: [
          { a: 'which', why: '빈칸 뒤 most customers visit our store는 목적어(our store)까지 다 있는 완전한 문장입니다. 관계대명사 which는 들어갈 수 없습니다.' },
          { a: 'that', why: '쉼표 뒤에는 that을 쓰지 않습니다. 때 선행사 뒤 완전한 문장이므로 관계부사 when입니다.' },
          { a: 'where', why: 'Friday는 장소가 아니라 때입니다.' },
        ],
        explain: '선행사가 때(Friday)이고 뒤 문장이 완전하므로 관계부사 **when**입니다. "대부분의 손님이 우리 가게를 찾는 금요일이 가장 바쁜 날입니다."',
      },
    ],

    deeper: [
      {
        title: '관계대명사 that과 접속사 that 구별하기',
        body: 'that은 관계대명사로도, 명사절 접속사로도 씁니다. 구별하는 열쇠는 이 단원 내내 쓴 **"뒤 문장이 완전한가"**입니다.\n\n' +
          '- The news **that** you heard is not true. → heard의 목적어가 빠짐 → **관계대명사** (네가 들은 소식)\n' +
          '- The news **that** the company will move is true. → 빠진 것 없음 → **접속사** (회사가 옮긴다는 소식)\n\n' +
          '두 번째처럼 명사 바로 뒤의 that절이 그 명사의 내용을 풀어 주는 것을 **동격의 that**이라고 합니다. the fact that, the news that, the idea that처럼 씁니다.\n\n' +
          '앞에 명사가 있어도 뒤가 완전하면 관계대명사가 아닙니다. 그래서 "명사 + that"만 보고 판단하지 말고 언제나 뒤 문장을 끝까지 읽으십시오.',
      },
      {
        title: '쉼표가 있는 관계사 — 덧붙여 설명하기',
        body: '관계사 앞에 쉼표가 있으면 선행사를 **골라내는** 것이 아니라 **덧붙여 설명**합니다.\n\n' +
          '- The employees **who** live nearby walk to work. (가까이 사는 직원들만 → 골라냄)\n' +
          '- The employees, **who** live nearby, walk to work. (그 직원들은 모두 가까이 사는데 → 덧붙임)\n\n' +
          '쉼표 뒤에는 that을 쓰지 않고 who, which, where, when을 씁니다. 또 쉼표 뒤의 which는 **앞 문장 전체**를 받기도 합니다.\n\n' +
          '- The shipment arrived early, **which** pleased the client. (배송품이 일찍 도착했는데, 그 일이 고객을 기쁘게 했습니다.)\n\n' +
          '이메일·공지를 읽는 다음 단원들에서는 이런 덧붙이는 관계사절이 길게 나옵니다. 쉼표에서 쉼표까지를 괄호처럼 묶어 읽으면 문장의 뼈대가 잘 보입니다.',
      },
    ],

    faq: [
      {
        q: 'who랑 which 대신 that을 쓰면 다 맞는 거 아니에요?',
        a: '대부분 맞지만 두 자리에서는 틀립니다. 쉼표 뒤(Our office, that is …)와 전치사 바로 뒤(in that)에는 that을 쓰지 않습니다. 또 보기에 that 없이 who와 which가 함께 나오면 that으로 피해 갈 수 없으니, 결국 선행사가 사람인지 사물인지 판단하는 힘이 필요합니다.',
      },
      {
        q: '선행사가 장소면 무조건 where 아니에요?',
        a: '아닙니다. 선행사가 장소여도 뒤 문장에 주어나 목적어가 빠져 있으면 관계대명사 which를 씁니다. the hotel which has a pool(has의 주어가 빠짐), the hotel which we booked(booked의 목적어가 빠짐)처럼요. where는 뒤 문장이 완전할 때만 씁니다.',
      },
      {
        q: 'if랑 whether는 그냥 같은 뜻 아니에요?',
        a: '"~인지"라는 뜻은 같습니다. 다만 if는 주로 동사의 목적어 자리에서만 쓰고, 주어 자리·전치사 뒤·to부정사 앞·or not 바로 앞에는 whether만 씁니다. 헷갈리면 whether를 고르는 편이 안전합니다.',
      },
    ],

    mistakes: [
      '완전한 문장 앞에 관계대명사를 쓰는 실수 — the office **which** I work ✕ → the office **where** I work ✓ / the office which I work **in** ✓',
      '선행사 없는 자리에 that을 쓰는 실수 — **That** we need is more time ✕ → **What** we need is more time ✓',
      '주어 자리에 if를 쓰는 실수 — **If** he will come is not certain ✕ → **Whether** he will come is not certain ✓',
    ],

    gens: [
      {
        id: 'relative-choice',
        level: 1,
        title: '선행사와 뒤 문장을 보고 관계사 고르기',
        make: function (R) {
          var it = R.pick(REL);
          var ant = it[1], kind = it[2], correct = it[3];
          var why = {
            who: correct === 'whose'
              ? '빈칸 뒤 명사가 선행사의 것("~의")이라는 관계입니다. who가 아니라 소유격 whose가 필요합니다.'
              : '선행사가 사람이 아닙니다(' + ant + '). who는 사람 선행사에 씁니다.',
            which: correct === 'who'
              ? '선행사가 사람입니다(' + ant + '). which는 사물 선행사에 씁니다.'
              : correct === 'whose'
                ? '빈칸 뒤 명사가 선행사의 것("~의")이라는 관계입니다. which는 이런 명사를 받지 않습니다.'
                : '빈칸 뒤 문장은 주어·목적어가 다 있는 완전한 문장입니다. 관계대명사 which 뒤에는 무언가 빠진 문장이 옵니다.',
            whose: 'whose 뒤에는 선행사가 가진 것을 나타내는 명사가 바로 옵니다. 이 문장은 그런 꼴이 아닙니다.',
            where: '빈칸 뒤 문장에 주어나 목적어가 빠져 있습니다. 관계부사 where 뒤에는 완전한 문장이 옵니다.',
            what: 'what은 선행사를 품은 말이라 앞에 선행사가 있으면 쓸 수 없습니다(선행사: ' + ant + ').',
          };
          var reason = {
            who: '선행사가 사람(' + ant + ')이고 빈칸 뒤에 주어가 빠져 있으므로 who입니다. 이 자리에는 that도 쓸 수 있습니다.',
            which: '선행사가 사물(' + ant + ')이고 빈칸 뒤에 주어나 목적어가 빠져 있으므로 which입니다. 이 자리에는 that도 쓸 수 있습니다.',
            whose: '빈칸 뒤 명사가 선행사(' + ant + ')의 것이므로 소유격 whose입니다.',
            where: '선행사가 장소(' + ant + ')이고 빈칸 뒤 문장이 완전하므로 관계부사 where입니다.',
            when: '선행사가 때(' + ant + ')이고 빈칸 뒤 문장이 완전하므로 관계부사 when입니다.',
          };
          var pick = R.choices(correct, REL_WRONGS[correct]);
          return {
            type: 'choice',
            concept: correct === 'whose' ? 2 : (correct === 'where' || correct === 'when') ? 3 : 0,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : why[c] || ''; }),
            explain: reason[correct] + ' (선행사 종류: ' + KIND[kind] + ')\n\n' + bold(it[0], correct) + '\n\n' + it[4],
          };
        },
      },
      {
        id: 'that-or-what',
        level: 2,
        title: '명사절 접속사 that과 what 구별하기',
        make: function (R) {
          var it = R.pick(TW);
          var start = it[0].indexOf('___') === 0;
          var show = function (w) { return start ? cap(w) : w; };
          var correct = it[1];
          var why = {};
          why[show('that')] = 'that 뒤에는 빠진 것 없는 완전한 문장이 옵니다. 빈칸 뒤 문장에 ' + it[3] + ' 빠져 있습니다.';
          why[show('what')] = 'what 뒤에는 주어나 목적어가 빠진 문장이 옵니다. 빈칸 뒤 문장은 빠진 것 없이 완전합니다.';
          why[show('which')] = 'which는 앞에 꾸밀 선행사(명사)가 있어야 하는 관계대명사입니다. 빈칸 앞에는 선행사가 없습니다.';
          var pick = R.choices(show(correct), [show(correct === 'that' ? 'what' : 'that'), show('which')], 3);
          return {
            type: 'choice', concept: 4,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === show(correct) ? '' : why[c] || ''; }),
            explain: (correct === 'that'
              ? '빈칸 뒤가 빠진 것 없는 완전한 문장이므로 "~라는 것"의 that입니다.'
              : '앞에 선행사가 없고 빈칸 뒤 문장에 ' + it[3] + ' 빠져 있으므로 "~하는 것"의 what입니다.') +
              '\n\n' + bold(it[0], show(correct)) + '\n\n' + it[2],
          };
        },
      },
      {
        id: 'whether-only',
        level: 2,
        title: 'whether만 쓰는 자리 알아보기',
        make: function (R) {
          var it = R.pick(WH);
          var start = it[0].indexOf('___') === 0;
          var show = function (w) { return start ? cap(w) : w; };
          var why = {};
          why[show('if')] = WH_IF[it[1]];
          why[show('what')] = WH_WHAT[it[1]];
          var pick = R.choices(show('whether'), [show('if'), show('what')], 3);
          return {
            type: 'choice', concept: 5,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === show('whether') ? '' : why[c] || ''; }),
            explain: '"~인지"라는 명사절이 ' + WH_PLACE[it[1]] + '에 오므로 if는 쓸 수 없고 whether를 씁니다.\n\n' + bold(it[0], show('whether')) + '\n\n' + it[2],
          };
        },
      },
    ],

    vocab: [
      { w: 'applicant', m: '지원자', ex: 'Each applicant must bring a photo ID.', exm: '지원자는 모두 사진이 있는 신분증을 가져와야 합니다.' },
      { w: 'supplier', m: '공급업체, 공급자', ex: 'Our supplier delivers fresh vegetables every morning.', exm: '우리 공급업체는 매일 아침 신선한 채소를 배달합니다.' },
      { w: 'impressive', m: '인상적인, 훌륭한', ex: 'Her speech was short but impressive.', exm: '그녀의 연설은 짧았지만 인상적이었습니다.' },
      { w: 'award', m: '상; 상을 주다', ex: 'The school won an award for its garden.', exm: '그 학교는 정원으로 상을 받았습니다.' },
      { w: 'stock', m: '재고, 상품', ex: 'This size is out of stock right now.', exm: '이 치수는 지금 재고가 없습니다.' },
      { w: 'retire', m: '은퇴하다', ex: 'My grandfather retired at the age of sixty.', exm: '우리 할아버지는 예순 살에 은퇴하셨습니다.' },
      { w: 'announce', m: '발표하다, 알리다', ex: 'The principal announced the winners of the contest.', exm: '교장 선생님이 대회 수상자를 발표했습니다.' },
      { w: 'budget', m: '예산', ex: 'We planned the trip on a small budget.', exm: '우리는 적은 예산으로 여행을 계획했습니다.' },
      { w: 'approve', m: '승인하다', ex: 'The manager approved my request for a day off.', exm: '관리자가 하루 휴가 요청을 승인했습니다.' },
      { w: 'renew', m: '갱신하다, 연장하다', ex: 'I need to renew my library card.', exm: '나는 도서관 카드를 갱신해야 합니다.' },
      { w: 'contract', m: '계약, 계약서', ex: 'Please read the contract carefully before you sign it.', exm: '서명하기 전에 계약서를 꼼꼼히 읽으십시오.' },
      { w: 'incomplete', m: '다 갖추어지지 않은, 미완성의', ex: 'The puzzle is still incomplete.', exm: '퍼즐은 아직 다 맞추지 못했습니다.' },
      { w: 'whether', m: '~인지 (아닌지)', ex: 'I asked whether the museum was open.', exm: '나는 박물관이 문을 열었는지 물었습니다.' },
      { w: 'branch', m: '지점, 지사', ex: 'The bank has a branch near the station.', exm: '그 은행은 역 근처에 지점이 있습니다.' },
    ],
  });
})();
