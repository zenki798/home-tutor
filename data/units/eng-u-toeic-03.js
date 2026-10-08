/* 공인영어시험 기초 (토익형) · 수 일치와 능동·수동태
 * 예문·지문은 모두 직접 쓴 문장이다(가상의 회사·인물). */
(function () {
  // 수 일치 생성기: [빈칸 문장, 단수 동사, 복수 동사, 동사가 될 수 없는 꼴, 정답('sg'|'pl'), 단서, 뜻, 개념 카드]
  var AGR = [
    ['The list of new employees ___ on the notice board.', 'is', 'are', 'being', 'sg', '주어의 중심은 list(명단, 단수)이고 of new employees는 수식어', '신입 사원 명단이 게시판에 붙어 있습니다.', 0],
    ['The documents in the blue folder ___ to be signed today.', 'needs', 'need', 'needing', 'pl', '주어의 중심은 documents(서류들, 복수)이고 in the blue folder는 수식어', '파란 서류철에 든 서류들은 오늘 서명을 받아야 합니다.', 0],
    ['The price of the concert tickets ___ gone up.', 'has', 'have', 'having', 'sg', '주어의 중심은 price(가격, 단수)이고 of the concert tickets는 수식어', '공연 표 가격이 올랐습니다.', 0],
    ['Employees who work on weekends ___ extra pay.', 'receives', 'receive', 'receiving', 'pl', '주어의 중심은 Employees(직원들, 복수)이고 who work on weekends는 수식어', '주말에 일하는 직원들은 추가 수당을 받습니다.', 0],
    ['The new rule for business trips ___ next Monday.', 'starts', 'start', 'starting', 'sg', '주어의 중심은 rule(규정, 단수)이고 for business trips는 수식어', '출장에 관한 새 규정은 다음 주 월요일부터 시행됩니다.', 0],
    ['One of our suppliers ___ raised its prices.', 'has', 'have', 'having', 'sg', '주어의 중심은 One(하나, 단수)이고 of our suppliers는 수식어', '우리 공급업체 가운데 한 곳이 가격을 올렸습니다.', 0],
    ['The chairs in the meeting room ___ replaced last week.', 'was', 'were', 'being', 'pl', '주어의 중심은 chairs(의자들, 복수)이고 in the meeting room은 수식어', '회의실 의자들은 지난주에 교체되었습니다.', 0],
    ['The manager, together with her team, ___ working late tonight.', 'is', 'are', 'be', 'sg', '주어의 중심은 The manager(단수)이고 together with her team은 덧붙인 말', '관리자는 팀원들과 함께 오늘 밤 늦게까지 일합니다.', 0],
    ['The information in these files ___ confidential.', 'is', 'are', 'being', 'sg', '주어의 중심은 information(셀 수 없는 명사, 단수)이고 in these files는 수식어', '이 파일들에 든 정보는 기밀입니다.', 0],
    ['Tickets for the opening ceremony ___ available at the front desk.', 'is', 'are', 'being', 'pl', '주어의 중심은 Tickets(표들, 복수)이고 for the opening ceremony는 수식어', '개막식 표는 안내 데스크에서 구할 수 있습니다.', 0],
    ['The goal of these workshops ___ to improve teamwork.', 'is', 'are', 'being', 'sg', '주어의 중심은 goal(목표, 단수)이고 of these workshops는 수식어', '이 워크숍들의 목표는 협동심을 키우는 것입니다.', 0],
    ['Products made in this factory ___ sold in over 20 countries.', 'is', 'are', 'being', 'pl', '주어의 중심은 Products(제품들, 복수)이고 made in this factory는 수식어', '이 공장에서 만든 제품은 20개국이 넘는 나라에서 팔립니다.', 0],
    ['The report written by the two interns ___ very clear.', 'was', 'were', 'being', 'sg', '주어의 중심은 report(보고서, 단수)이고 written by the two interns는 수식어', '인턴 두 명이 쓴 보고서는 매우 명확했습니다.', 0],
    ['The number of online orders ___ doubled this year.', 'has', 'have', 'having', 'sg', 'the number of는 "~의 수"라서 수 자체(단수)가 주어', '올해 온라인 주문 수가 두 배가 되었습니다.', 1],
    ['The number of visitors to the museum ___ growing every year.', 'is', 'are', 'being', 'sg', 'the number of는 "~의 수"라서 수 자체(단수)가 주어', '박물관을 찾는 방문객 수가 해마다 늘고 있습니다.', 1],
    ['A number of customers ___ asked about the new model.', 'has', 'have', 'having', 'pl', 'a number of는 "많은"이라는 뜻이라 뒤의 복수 명사 customers가 주어', '많은 고객이 새 모델에 관해 물었습니다.', 1],
    ['A number of staff members ___ working from home this week.', 'is', 'are', 'being', 'pl', 'a number of는 "많은"이라는 뜻이라 뒤의 복수 명사 staff members가 주어', '이번 주에는 많은 직원이 재택근무를 하고 있습니다.', 1],
  ];
  var AGR_NAME = { sg: '단수', pl: '복수' };

  // 능동·수동 생성기: [빈칸 문장, 정답, [능동/수동 오답, -ing 오답], 정답 이유, 뜻, 종류('act'|'pas'|'intr')]
  var VOICE = [
    ['Mr. Seong ___ the budget report yesterday.', 'approved', ['was approved', 'approving'], '빈칸 뒤에 목적어 the budget report가 있고, 승인한 사람은 주어입니다. 그래서 능동태입니다.', '성 씨는 어제 예산 보고서를 승인했습니다.', 'act'],
    ['Our team ___ the new software next week.', 'will install', ['will be installed', 'installing'], '빈칸 뒤에 목적어 the new software가 있고, 설치하는 쪽은 주어(우리 팀)입니다. 그래서 능동태입니다.', '우리 팀은 다음 주에 새 소프트웨어를 설치할 것입니다.', 'act'],
    ['The inspectors ___ the factory twice a year.', 'visit', ['are visited', 'visiting'], '빈칸 뒤에 목적어 the factory가 있고, 방문하는 쪽은 주어(점검관들)입니다. 그래서 능동태입니다.', '점검관들은 한 해에 두 번 공장을 방문합니다.', 'act'],
    ['Ms. Hwang ___ the contract before the meeting.', 'reviewed', ['was reviewed', 'reviewing'], '빈칸 뒤에 목적어 the contract가 있고, 검토한 사람은 주어입니다. 그래서 능동태입니다.', '황 씨는 회의 전에 계약서를 검토했습니다.', 'act'],
    ['The hotel restaurant ___ breakfast from 7 to 10 a.m.', 'serves', ['is served', 'serving'], '빈칸 뒤에 목적어 breakfast가 있고, 아침을 내는 쪽은 주어(호텔 식당)입니다. 그래서 능동태입니다.', '호텔 식당은 오전 7시부터 10시까지 아침을 제공합니다.', 'act'],
    ['All orders ___ within two business days.', 'are processed', ['process', 'processing'], '빈칸 뒤에 목적어가 없고, 주문은 처리되는 대상입니다. 그래서 수동태(be + 과거분사)입니다.', '모든 주문은 영업일 기준 이틀 안에 처리됩니다.', 'pas'],
    ['The meeting ___ until next Thursday.', 'has been postponed', ['has postponed', 'postponing'], '빈칸 뒤에 목적어가 없고, 회의는 미뤄지는 대상입니다. 그래서 수동태입니다.', '회의는 다음 주 목요일로 미뤄졌습니다.', 'pas'],
    ['The new product line ___ at the trade fair next month.', 'will be introduced', ['will introduce', 'introducing'], '빈칸 뒤에 목적어가 없고, 새 제품군은 소개되는 대상입니다. 그래서 수동태입니다.', '새 제품군은 다음 달 무역 박람회에서 소개될 것입니다.', 'pas'],
    ['Visitors ___ to wear safety helmets in the factory.', 'are required', ['require', 'requiring'], '빈칸 뒤에 목적어가 없고, 방문객은 안전모 착용을 요구받는 쪽입니다. 그래서 수동태입니다.', '방문객은 공장 안에서 안전모를 써야 합니다.', 'pas'],
    ['The office ___ every evening after 7 p.m.', 'is cleaned', ['cleans', 'cleaning'], '빈칸 뒤에 목적어가 없고, 사무실은 청소되는 대상입니다. 그래서 수동태입니다.', '사무실은 매일 저녁 7시 이후에 청소됩니다.', 'pas'],
    ['The results of the survey ___ in the next newsletter.', 'will be announced', ['will announce', 'announcing'], '빈칸 뒤에 목적어가 없고, 설문 결과는 발표되는 대상입니다. 그래서 수동태입니다.', '설문 조사 결과는 다음 소식지에 발표될 것입니다.', 'pas'],
    ['This building ___ in 1985.', 'was built', ['built', 'building'], '빈칸 뒤에 목적어가 없고, 건물은 지어지는 대상입니다. 그래서 수동태입니다.', '이 건물은 1985년에 지어졌습니다.', 'pas'],
    ['A power failure ___ during the night.', 'occurred', ['was occurred', 'occurring'], 'occur(일어나다)는 목적어를 갖지 않는 자동사라서 수동태로 쓰지 않습니다.', '밤사이 정전이 일어났습니다.', 'intr'],
    ['Some problems ___ after the system update.', 'arose', ['were arisen', 'arising'], 'arise(생기다)는 목적어를 갖지 않는 자동사라서 수동태로 쓰지 않습니다.', '시스템을 업데이트한 뒤 몇 가지 문제가 생겼습니다.', 'intr'],
    ['The east entrance ___ closed until further notice.', 'remains', ['is remained', 'remaining'], 'remain(~인 채로 있다)은 목적어를 갖지 않는 자동사라서 수동태로 쓰지 않습니다. 뒤의 closed는 "닫힌 상태"를 나타내는 보어입니다.', '동쪽 출입구는 다음 안내가 있을 때까지 닫혀 있습니다.', 'intr'],
    ['The annual sale ___ in the main hall last weekend.', 'took place', ['was taken place', 'taking place'], 'take place(열리다, 일어나다)는 목적어를 갖지 않는 표현이라 수동태로 쓰지 않습니다.', '연례 할인 행사는 지난 주말 본관에서 열렸습니다.', 'intr'],
    ['Sales ___ by 10 percent last month.', 'rose', ['were risen', 'rising'], 'rise(오르다)는 목적어를 갖지 않는 자동사라서 수동태로 쓰지 않습니다. 목적어를 갖는 "올리다"는 raise입니다.', '지난달 판매량이 10퍼센트 올랐습니다.', 'intr'],
    ['The new model ___ in stores next week.', 'will appear', ['will be appeared', 'appearing'], 'appear(나타나다)는 목적어를 갖지 않는 자동사라서 수동태로 쓰지 않습니다.', '새 모델은 다음 주에 매장에 나옵니다.', 'intr'],
  ];
  var VOICE_WHY = {
    act: '수동태는 주어가 동작을 받을 때 씁니다. 빈칸 뒤에 목적어가 있으면 능동태입니다.',
    pas: '능동태로 쓰면 뒤에 목적어가 있어야 합니다. 목적어가 없고 주어가 동작을 받으므로 수동태입니다.',
    intr: '이 동사는 목적어를 갖지 않는 자동사라서 수동태(be + 과거분사)로 쓸 수 없습니다.',
    ing: '-ing 꼴은 혼자 문장의 동사가 될 수 없습니다. 빈칸에는 시제를 갖춘 동사가 필요합니다.',
  };
  var VOICE_NAME = { act: '능동태', pas: '수동태', intr: '자동사는 능동태로만' };

  // 수동태 + 전치사 생성기: [빈칸 문장, 정답 전치사, 오답 전치사 3개, 표현과 뜻, 문장 뜻]
  var PREP = [
    ['Most customers are satisfied ___ the new delivery service.', 'with', ['in', 'at', 'for'], 'be satisfied with: ~에 만족하다', '대부분의 고객이 새 배송 서비스에 만족합니다.'],
    ['Ms. Ryu is involved ___ planning the annual conference.', 'in', ['to', 'at', 'on'], 'be involved in: ~에 참여하다, 관여하다', '류 씨는 연례 학술 대회를 계획하는 일에 참여하고 있습니다.'],
    ['Our head office is located ___ Daejeon.', 'in', ['to', 'with', 'of'], 'be located in: ~에 있다(위치하다)', '우리 본사는 대전에 있습니다.'],
    ['All the rooms are equipped ___ air conditioners.', 'with', ['of', 'in', 'for'], 'be equipped with: ~을 갖추고 있다', '모든 방에 에어컨이 갖춰져 있습니다.'],
    ['The town is known ___ its fresh seafood.', 'for', ['to', 'on', 'at'], 'be known for: ~으로 유명하다', '그 도시는 신선한 해산물로 유명합니다.'],
    ['The new plan is based ___ the results of the survey.', 'on', ['in', 'with', 'for'], 'be based on: ~에 바탕을 두다', '새 계획은 설문 조사 결과에 바탕을 두고 있습니다.'],
    ['The company is committed ___ reducing waste.', 'to', ['for', 'on', 'at'], 'be committed to: ~에 전념하다(to 뒤에는 명사나 -ing)', '그 회사는 쓰레기를 줄이는 데 힘쓰고 있습니다.'],
    ['We were pleased ___ the results of the campaign.', 'with', ['in', 'on', 'of'], 'be pleased with: ~에 기뻐하다, 만족하다', '우리는 캠페인 결과에 기뻐했습니다.'],
    ['The storage box was filled ___ old documents.', 'with', ['of', 'in', 'on'], 'be filled with: ~으로 가득 차 있다', '보관 상자는 오래된 서류로 가득 차 있었습니다.'],
    ['Many visitors are interested ___ the history of the building.', 'in', ['on', 'for', 'at'], 'be interested in: ~에 관심이 있다', '많은 방문객이 그 건물의 역사에 관심이 있습니다.'],
    ['Factory workers are often exposed ___ loud noise.', 'to', ['with', 'on', 'for'], 'be exposed to: ~에 노출되다', '공장 노동자는 큰 소음에 자주 노출됩니다.'],
    ['Mr. Bang is dedicated ___ his work.', 'to', ['for', 'on', 'in'], 'be dedicated to: ~에 헌신하다', '방 씨는 자기 일에 헌신적입니다.'],
    ['The committee is composed ___ five engineers.', 'of', ['in', 'with', 'on'], 'be composed of: ~으로 이루어져 있다', '위원회는 기술자 다섯 명으로 이루어져 있습니다.'],
    ['Regular exercise is associated ___ better sleep.', 'with', ['on', 'in', 'for'], 'be associated with: ~과 관련이 있다', '꾸준한 운동은 더 나은 잠과 관련이 있습니다.'],
  ];

  Tutor.registerUnit({
    id: 'eng-u-toeic-03',
    course: 'eng-u-toeic',
    title: '수 일치와 능동·수동태',
    summary: '주어와 동사의 수를 맞추고, 목적어가 있는지 보고 능동태와 수동태 중 알맞은 형태를 고릅니다.',
    goals: [
      '수식어를 건너뛰고 주어의 중심 명사를 찾아 동사의 수를 맞출 수 있다.',
      'the number of와 a number of 뒤의 동사 수를 구별할 수 있다.',
      '빈칸 뒤에 목적어가 있는지로 능동태와 수동태를 고를 수 있다.',
      '수동태와 함께 쓰는 전치사와 수동태로 쓰지 않는 자동사를 알 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '수식어를 건너뛰고 주어 찾기',
        body: '동사의 수(단수·복수)는 **주어의 중심 명사**에 맞춥니다. 그런데 주어 뒤에 꾸미는 말(수식어)이 길게 붙으면, 동사 바로 앞의 명사를 주어로 착각하기 쉽습니다.\n\n' +
          '| 주어 뒤에 붙는 수식어 | 예 (중심 명사 → 동사) |\n|---|---|\n' +
          '| 전치사구 (of, in, for, with …) | The **list** of applicants **is** ready. |\n' +
          '| 관계절 (who, which, that …) | The **employees** who joined last month **are** in training. |\n' +
          '| 분사구 (-ing, 과거분사) | The **boxes** stored in the warehouse **need** labels. |\n' +
          '| 덧붙인 말 (along with, together with, as well as) | The **manager**, along with her assistants, **is** here. |\n\n' +
          '방법은 간단합니다. 수식어를 괄호로 묶어 지우고 남은 주어와 동사만 읽어 봅니다.\n\n' +
          '- The quality (of the new products) **has** improved. → quality가 중심이라 단수\n' +
          '- **One** (of the printers) **is** broken. → one of + 복수 명사는 단수\n\n' +
          '> 💡 동사 바로 앞의 명사(products, printers)는 대개 함정입니다. 문장 맨 앞의 명사부터 확인하십시오.',
        easy: '긴 주어는 "기차"와 같습니다. 맨 앞 기관차(중심 명사)가 동사를 끌고 가고, 뒤에 달린 객차(수식어)는 아무리 많아도 방향을 정하지 못합니다.\n\n' +
          'The list of applicants에서 기관차는 list(단수)입니다. applicants(복수)는 뒤에 달린 객차일 뿐이니, 동사는 list에 맞춰 is를 씁니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe results of the survey ___ surprising.',
          choices: ['was', 'were', 'being'],
          answer: 1,
          why: [
            '동사 바로 앞의 survey(단수)에 맞췄습니다. of the survey는 수식어이고, 주어의 중심은 results(복수)입니다.',
            '',
            '-ing 꼴은 혼자 문장의 동사가 될 수 없습니다.',
          ],
          explain: '주어의 중심은 results(결과들, 복수)이고 of the survey는 수식어입니다. 그래서 복수 동사 **were**를 씁니다. "설문 조사 결과는 놀라웠습니다."',
        },
      },
      {
        title: 'the number of와 a number of',
        body: '생김새는 비슷하지만 뜻과 동사의 수가 다릅니다.\n\n' +
          '| 표현 | 뜻 | 주어의 중심 | 동사 |\n|---|---|---|---|\n' +
          '| **the number of** + 복수 명사 | ~의 수 | number(수 하나) | **단수** |\n' +
          '| **a number of** + 복수 명사 | 많은 ~ (= many) | 뒤의 복수 명사 | **복수** |\n\n' +
          '- **The number of** applicants **has** increased. (지원자 **수**가 늘었다 — 늘어난 것은 "수")\n' +
          '- **A number of** applicants **have** called us. (**많은** 지원자가 전화했다 — 전화한 것은 "사람들")\n\n' +
          '판단 방법: 동사의 행동을 하는 것이 "수"인지 "사람·물건들"인지 생각해 봅니다. 수가 늘고 줄면 the number of(단수), 사람들이 무엇을 했으면 a number of(복수)입니다.\n\n' +
          '> 💡 a number of는 many와 바꿔 쓸 수 있습니다. Many applicants have called us.',
        easy: '"the number"는 전광판에 뜬 숫자 하나라고 생각해 보십시오. 숫자 하나가 올라가고 내려가니 단수입니다.\n\n' +
          '"a number of"는 그냥 "많은"이라는 뜻의 꾸밈말입니다. 실제 주인공은 뒤에 오는 사람들(복수)이니 동사도 복수입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe number of complaints ___ decreased since last year.',
          choices: ['has', 'have', 'having'],
          answer: 0,
          why: [
            '',
            'complaints(복수)에 맞췄습니다. the number of는 "~의 수"라서 주어는 수 하나(단수)입니다.',
            '-ing 꼴은 혼자 문장의 동사가 될 수 없습니다.',
          ],
          explain: 'the number of complaints는 "불만의 수"입니다. 줄어든 것은 수 하나이므로 단수 동사 **has**를 씁니다. "작년보다 불만 건수가 줄었습니다."',
        },
      },
      {
        title: '목적어를 보고 능동태·수동태 고르기',
        body: '**능동태**는 주어가 동작을 하는 꼴이고, **수동태**(be + 과거분사)는 주어가 동작을 받는 꼴입니다.\n\n' +
          '- 능동: The manager **approved** the plan. (관리자가 계획을 승인했다)\n' +
          '- 수동: The plan **was approved** by the manager. (계획이 승인되었다)\n\n' +
          '능동태 문장의 목적어(the plan)가 수동태에서는 주어로 올라갑니다. 그래서 **목적어를 갖는 동사(타동사)가 수동태가 되면 뒤에 목적어가 남지 않습니다.** 이것이 가장 빠른 판단법입니다.\n\n' +
          '| 빈칸 뒤 | 고를 꼴 | 예 |\n|---|---|---|\n' +
          '| 목적어(명사)가 있음 | 능동태 | We **will ship** your order today. |\n' +
          '| 목적어가 없음(전치사·부사·문장 끝) | 수동태 | Your order **will be shipped** today. |\n\n' +
          '수동태도 시제를 갖습니다: is reviewed(현재), was reviewed(과거), will be reviewed(미래), has been reviewed(현재완료), is being reviewed(진행).\n\n' +
          '> ⚠️ give·send·offer(~에게 …을 주다)나 name·consider(~을 …으로 부르다·여기다)는 수동태 뒤에도 명사가 남을 수 있습니다. Ms. Moon **was given** an award. / He **was named** team leader. 이때는 뜻으로 확인합니다.',
        easy: '주어가 "하는 사람"이면 능동, "당하는 물건"이면 수동입니다. 주문(order)은 스스로 배송하지 못하고 배송을 받지요. 그래서 Your order will **be shipped**입니다.\n\n' +
          '빈칸 뒤를 보고 "무엇을?"에 해당하는 말(목적어)이 있으면 능동, 없으면 수동이라고 생각하면 대부분 맞습니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe broken printer ___ tomorrow morning.',
          choices: ['will repair', 'will be repaired', 'repairing'],
          answer: 1,
          why: [
            '능동태로 쓰면 "프린터가 (무엇을) 고친다"가 되고, 뒤에 목적어도 없습니다. 프린터는 고쳐지는 대상입니다.',
            '',
            '-ing 꼴은 혼자 문장의 동사가 될 수 없습니다.',
          ],
          explain: '빈칸 뒤에 목적어가 없고, 고장 난 프린터는 고쳐지는 대상입니다. 그래서 수동태 **will be repaired**를 씁니다. "고장 난 프린터는 내일 아침에 수리될 것입니다."',
        },
      },
      {
        title: '수동태와 함께 쓰는 전치사',
        body: '수동태 뒤에는 보통 행위자를 나타내는 **by**가 오지만, 감정·상태를 나타내는 수동태는 **정해진 전치사**와 짝을 이룹니다. 하나의 표현으로 외워 둡니다.\n\n' +
          '| 표현 | 뜻 |\n|---|---|\n' +
          '| be satisfied **with** / be pleased **with** | ~에 만족하다 / ~에 기뻐하다 |\n' +
          '| be involved **in** / be interested **in** | ~에 참여하다 / ~에 관심이 있다 |\n' +
          '| be located **in** | ~에 있다(위치하다) |\n' +
          '| be equipped **with** / be filled **with** | ~을 갖추고 있다 / ~으로 가득 차다 |\n' +
          '| be known **for** | ~으로 유명하다 |\n' +
          '| be based **on** | ~에 바탕을 두다 |\n' +
          '| be committed **to** / be dedicated **to** | ~에 전념하다 / ~에 헌신하다 |\n' +
          '| be exposed **to** | ~에 노출되다 |\n' +
          '| be composed **of** | ~으로 이루어져 있다 |\n\n' +
          '> ⚠️ be committed to, be dedicated to의 to는 전치사입니다. 뒤에 동사를 쓸 때는 동사원형이 아니라 -ing 꼴을 씁니다: committed to **reducing** costs',
        easy: '이 표현들은 "짝꿍이 정해진 낱말"입니다. satisfied는 늘 with와, interested는 늘 in과 함께 다닙니다. 우리말 "~에"를 그대로 옮기면 in·at·to 가운데 무엇인지 헷갈리니, 표현 하나를 통째로 소리 내어 외우는 것이 가장 좋습니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe manager was satisfied ___ the quality of the work.',
          choices: ['with', 'in', 'to'],
          answer: 0,
          why: [
            '',
            'in은 be interested in, be involved in과 짝을 이룹니다. "~에 만족하다"는 be satisfied with입니다.',
            'to는 be committed to, be exposed to와 짝을 이룹니다. "~에 만족하다"는 be satisfied with입니다.',
          ],
          explain: '"~에 만족하다"는 **be satisfied with**입니다. "관리자는 작업의 질에 만족했습니다."',
        },
      },
      {
        title: '수동태로 쓰지 않는 자동사',
        body: '수동태는 능동태의 목적어를 주어로 올린 것입니다. 그래서 **목적어를 갖지 않는 동사(자동사)는 수동태가 될 수 없습니다.** 공인영어시험에서는 이런 동사를 수동태로 만든 보기가 함정으로 자주 나옵니다.\n\n' +
          '| 자동사 | 뜻 | 바른 꼴 / 틀린 꼴 |\n|---|---|---|\n' +
          '| occur, happen | 일어나다 | An error **occurred**. / was occurred (×) |\n' +
          '| arise | 생기다 | Problems **arose**. / were arisen (×) |\n' +
          '| remain | ~인 채로 있다 | Prices **remained** stable. / were remained (×) |\n' +
          '| take place | 열리다, 일어나다 | The event **took place** in May. / was taken place (×) |\n' +
          '| rise, appear, exist | 오르다, 나타나다, 있다 | Sales **rose**. / were risen (×) |\n\n' +
          '> 💡 rise(오르다, 자동사)와 raise(올리다, 타동사)를 구별합니다. Prices **rose**. / The company **raised** prices. / Prices **were raised** by the company.\n\n' +
          '> ⚠️ The store remains **closed**.의 closed는 수동태가 아니라 "닫힌 상태"를 나타내는 보어입니다. remain 자체는 능동태입니다.',
        easy: '수동태는 "누군가에게 무엇을 당하다"라는 꼴입니다. 그런데 "사고가 일어나다", "문제가 생기다"에는 사고나 문제에게 무언가를 하는 사람이 없습니다. 당할 일이 없으니 수동태로 만들 수 없는 것이지요.\n\n' +
          '그래서 occur, arise, happen, take place는 언제나 능동태 꼴(occurred, arose)로만 씁니다.',
        check: {
          type: 'ox',
          q: 'A small fire was occurred in the kitchen last night.\n\n이 문장은 어법상 옳습니다.',
          answer: false,
          explain: 'occur(일어나다)는 목적어를 갖지 않는 자동사라서 수동태로 쓸 수 없습니다. 바른 문장: A small fire **occurred** in the kitchen last night.',
        },
      },
    ],

    examples: [
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\nThe cost of the new machines ___ higher than expected.\n\n(A) were (B) was (C) being (D) have been',
        steps: [
          '보기가 모두 be동사의 여러 꼴이므로, 주어의 수와 동사 자리를 확인합니다.',
          '주어 The cost of the new machines에서 of the new machines는 수식어입니다. 괄호로 묶어 지우면 The cost(비용, 단수)만 남습니다.',
          '(C) being은 -ing 꼴이라 혼자 동사가 될 수 없고, (A) were와 (D) have been은 복수 주어에 쓰는 꼴입니다.',
          '단수 주어에 맞는 (B) was를 고릅니다. "새 기계들의 비용은 예상보다 높았습니다."',
        ],
        answer: '(B) was',
      },
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\nThe conference room ___ for the board meeting tomorrow.\n\n(A) will reserve (B) will be reserved (C) reserving (D) reserves',
        steps: [
          '보기가 reserve(예약하다)의 능동태·수동태 꼴입니다. 빈칸 뒤를 봅니다.',
          '빈칸 뒤에는 목적어가 없고 전치사구 for the board meeting이 이어집니다.',
          '회의실은 스스로 무엇을 예약하지 못하고, 예약되는 대상입니다. 그래서 수동태가 필요합니다.',
          '내일(tomorrow)의 일이므로 미래 수동태 (B) will be reserved를 고릅니다. "회의실은 내일 이사회 회의를 위해 예약될 것입니다."',
        ],
        answer: '(B) will be reserved',
      },
    ],

    terms: [
      { term: '수 일치', def: '주어가 단수면 단수 동사, 복수면 복수 동사를 쓰는 것입니다. 예: The list is … / The lists are …' },
      { term: '중심 명사', def: '수식어가 붙은 긴 주어에서 동사의 수를 정하는 핵심 명사입니다. The list of applicants에서는 list입니다.' },
      { term: '수식어', def: '명사를 꾸며 뜻을 더하는 말입니다. 전치사구, 관계절, 분사구 등이 있으며 동사의 수에는 영향을 주지 않습니다.' },
      { term: '능동태', def: '주어가 동작을 하는 꼴입니다. 예: The manager approved the plan.' },
      { term: '수동태', def: '주어가 동작을 받는 꼴로, be + 과거분사로 씁니다. 예: The plan was approved.' },
      { term: '타동사', def: '목적어를 갖는 동사입니다. 대부분 수동태로 만들 수 있습니다. 예: approve, ship, repair' },
      { term: '자동사', def: '목적어를 갖지 않는 동사입니다. 수동태로 만들 수 없습니다. 예: occur, arise, remain, rise' },
      { term: '과거분사', def: '동사의 한 꼴로, be와 함께 수동태를 만듭니다. 예: approved, shipped, written' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe boxes in the storage room ___ very heavy.',
        choices: ['is', 'are', 'being', 'be'],
        answer: 1,
        why: [
          '동사 바로 앞의 storage room(단수)에 맞췄습니다. in the storage room은 수식어이고, 주어의 중심은 boxes(복수)입니다.',
          '',
          '-ing 꼴은 혼자 문장의 동사가 될 수 없습니다.',
          '동사원형 be는 주어 뒤에 혼자 동사로 쓸 수 없습니다.',
        ],
        explain: '주어의 중심은 boxes(상자들, 복수)이고 in the storage room은 수식어입니다. 그래서 복수 동사 **are**를 씁니다. "창고에 있는 상자들은 매우 무겁습니다."',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 0,
        q: 'One of the printers on the second floor are broken.\n\n이 문장은 어법상 옳습니다.',
        answer: false,
        explain: '주어의 중심은 One(하나, 단수)이고 of the printers on the second floor는 수식어입니다. 그래서 are가 아니라 **is**를 씁니다: One of the printers on the second floor **is** broken.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe number of tourists to the island ___ risen this year.',
        choices: ['has', 'have', 'having', 'are'],
        answer: 0,
        why: [
          '',
          'tourists(복수)에 맞췄습니다. the number of는 "~의 수"라서 주어는 수 하나(단수)입니다.',
          '-ing 꼴은 혼자 문장의 동사가 될 수 없습니다.',
          'are risen은 rise(오르다)를 수동태처럼 쓴 꼴입니다. rise는 자동사라 수동태가 없고, 주어도 단수입니다.',
        ],
        explain: 'the number of tourists는 "관광객의 수"입니다. 오른 것은 수 하나이므로 단수 동사 **has**를 씁니다(has risen). "올해 그 섬을 찾는 관광객 수가 늘었습니다."',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe meeting room ___ every morning by the cleaning staff.',
        choices: ['cleans', 'is cleaned', 'cleaning', 'has cleaned'],
        answer: 1,
        why: [
          '능동태라면 회의실이 무엇을 청소하는 것이 되고, 뒤에 목적어도 없습니다.',
          '',
          '-ing 꼴은 혼자 문장의 동사가 될 수 없습니다.',
          '능동태(현재완료)입니다. 뒤에 목적어가 없고 회의실은 청소되는 대상입니다.',
        ],
        explain: '빈칸 뒤에 목적어가 없고 by the cleaning staff(청소 직원에 의해)가 이어집니다. 회의실은 청소되는 대상이므로 수동태 **is cleaned**입니다. "회의실은 매일 아침 청소 직원이 청소합니다."',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nMr. Kwon ___ the contract yesterday afternoon.',
        choices: ['signed', 'was signed', 'signing', 'is signed'],
        answer: 0,
        why: [
          '',
          '수동태는 뒤에 목적어가 남지 않습니다. 빈칸 뒤에 목적어 the contract가 있고, 서명한 사람은 권 씨입니다.',
          '-ing 꼴은 혼자 문장의 동사가 될 수 없습니다.',
          '수동태이고 현재 시제입니다. 목적어 the contract가 있고, yesterday afternoon은 과거입니다.',
        ],
        explain: '빈칸 뒤에 목적어 the contract가 있고, 서명한 사람은 주어인 권 씨입니다. 어제의 일이므로 능동태 과거 **signed**를 씁니다. "권 씨는 어제 오후 계약서에 서명했습니다."',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nOur customers are very satisfied ___ the new delivery service.',
        choices: ['with', 'at', 'for', 'on'],
        answer: 0,
        why: [
          '',
          'satisfied는 at과 짝을 이루지 않습니다. "~에 만족하다"는 be satisfied with입니다.',
          'satisfied는 for와 짝을 이루지 않습니다. "~에 만족하다"는 be satisfied with입니다.',
          'on은 be based on과 짝을 이룹니다. "~에 만족하다"는 be satisfied with입니다.',
        ],
        explain: '"~에 만족하다"는 **be satisfied with**입니다. "우리 고객들은 새 배송 서비스에 매우 만족합니다."',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nA serious error ___ during the software test.',
        choices: ['occurred', 'was occurred', 'is occurred', 'occurring'],
        answer: 0,
        why: [
          '',
          'occur는 목적어를 갖지 않는 자동사라서 수동태(was occurred)로 쓸 수 없습니다.',
          'occur는 자동사라서 시제와 상관없이 수동태(is occurred, was occurred)로 쓸 수 없습니다.',
          '-ing 꼴은 혼자 문장의 동사가 될 수 없습니다.',
        ],
        explain: 'occur(일어나다)는 목적어를 갖지 않는 자동사라서 수동태로 쓰지 않습니다. 보기 가운데 시제를 갖춘 능동태는 과거형 **occurred**뿐입니다. "소프트웨어 시험 중에 심각한 오류가 일어났습니다."',
      },
      {
        id: 'p8', level: 1, type: 'short', check: 'text', concept: 3,
        q: '빈칸에 알맞은 전치사 하나를 쓰십시오.\n\nThe new sales plan is based ___ customer feedback.',
        answer: ['on', 'upon'],
        wrong: [
          { a: 'in', why: '"~에 바탕을 두다"는 be based on입니다. 우리말 "~에"를 in으로 옮기지 않도록 주의합니다.' },
          { a: 'by', why: 'by는 행위자(누가 했는지)를 나타냅니다. "~에 바탕을 두다"는 정해진 짝인 be based on입니다.' },
        ],
        explain: '"~에 바탕을 두다"는 **be based on**입니다(격식 있는 글에서는 upon도 씁니다). "새 판매 계획은 고객 의견에 바탕을 두고 있습니다."',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe director, along with two assistants, ___ attending the trade fair this week.',
        choices: ['is', 'are', 'be', 'being'],
        answer: 0,
        why: [
          '',
          'two assistants(복수)에 맞췄습니다. along with two assistants는 덧붙인 말이고, 주어의 중심은 The director(단수)입니다.',
          '동사원형 be는 주어 뒤에 혼자 동사로 쓸 수 없습니다.',
          '-ing 꼴만으로는 문장의 동사가 될 수 없습니다.',
        ],
        hint: '쉼표 사이의 along with two assistants를 지우고 읽어 보십시오.',
        explain: 'along with(~과 함께)가 이끄는 말은 덧붙인 말이라 동사의 수에 영향을 주지 않습니다. 주어의 중심은 The director(단수)이므로 **is**를 씁니다. "이사는 비서 두 명과 함께 이번 주 무역 박람회에 참석합니다."',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nAll new employees will ___ a laptop on their first day.',
        choices: ['give', 'be given', 'given', 'giving'],
        answer: 1,
        why: [
          '능동태라면 신입 사원이 (누구에게) 노트북을 주는 것이 됩니다. 노트북을 받는 쪽은 신입 사원입니다.',
          '',
          'will 뒤에는 동사원형이 옵니다. 수동태는 will be + 과거분사입니다.',
          'will 뒤에는 동사원형이 옵니다. -ing 꼴은 바로 올 수 없습니다.',
        ],
        hint: '노트북을 주는 사람과 받는 사람은 누구입니까?',
        explain: '회사가 신입 사원에게 노트북을 주는 것이므로, 신입 사원이 주어이면 "받는" 쪽이라 수동태 **be given**입니다. give(~에게 …을 주다)는 수동태 뒤에도 명사(a laptop)가 남을 수 있습니다. "모든 신입 사원은 첫날 노트북을 받습니다."',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'text', concept: 1,
        q: '빈칸에 the와 a 가운데 알맞은 말을 쓰십시오.\n\n___ number of complaints has fallen since the new system was introduced.',
        answer: ['the'],
        wrong: [
          { a: 'a', why: 'a number of는 "많은"이라는 뜻이라 복수 동사(have)를 씁니다. 동사가 단수 has이고 "불만의 수가 줄었다"는 뜻이므로 the입니다.' },
        ],
        hint: '동사 has가 단수인지 복수인지 보십시오.',
        explain: '동사가 단수 has이고, 줄어든(fallen) 것은 "불만의 수"입니다. 그래서 **The** number of complaints입니다. "새 시스템을 들인 뒤로 불만 건수가 줄었습니다."',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe price of fuel has ___ high for several months.',
        choices: ['remained', 'been remained', 'remaining', 'remain'],
        answer: 0,
        why: [
          '',
          'remain은 목적어를 갖지 않는 자동사라서 수동태(been remained)로 쓸 수 없습니다.',
          'has 뒤에는 과거분사가 와서 현재완료를 만듭니다. -ing 꼴은 올 수 없습니다.',
          'has 뒤에 동사원형은 올 수 없습니다. 현재완료는 has + 과거분사입니다.',
        ],
        hint: 'remain은 목적어를 갖는 동사입니까?',
        explain: 'remain(~인 채로 있다)은 자동사라서 수동태가 없습니다. has 뒤에서 현재완료를 만드는 과거분사 **remained**를 씁니다(has remained). 뒤의 high는 상태를 나타내는 보어입니다. "연료 가격이 몇 달째 높은 채로 있습니다."',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 0,
        q: '어법상 **옳지 않은** 문장은 무엇입니까?',
        choices: [
          'The list of participants is on the desk.',
          'The results of the test were shared with all staff.',
          'Each of the meeting rooms has a projector.',
          'The quality of the new products have improved.',
        ],
        answer: 3,
        why: [
          '주어의 중심 list(단수)에 맞춰 is를 썼습니다. 옳은 문장입니다.',
          '주어의 중심 results(복수)에 맞춰 were를 썼고, 결과는 공유되는 대상이라 수동태가 맞습니다. 옳은 문장입니다.',
          'Each of + 복수 명사는 단수로 보므로 has가 맞습니다. 옳은 문장입니다.',
          '',
        ],
        explain: '주어의 중심은 quality(질, 단수)이고 of the new products는 수식어입니다. have가 아니라 **has**를 써야 합니다: The quality of the new products **has** improved.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 1,
        q: '빈칸에 차례대로 들어갈 말로 알맞은 것은 무엇입니까?\n\nA number of employees ___ asked for more training, so the number of training sessions ___ increased.',
        choices: ['have / has', 'has / have', 'have / have', 'has / has'],
        answer: 0,
        why: [
          '',
          '둘을 거꾸로 맞췄습니다. a number of(많은) + 복수 명사는 복수 동사, the number of(~의 수)는 단수 동사입니다.',
          '둘째 빈칸의 주어는 the number of training sessions, 곧 "수 하나"라서 단수 동사 has입니다.',
          '첫 빈칸의 a number of employees는 "많은 직원들"이라 복수 동사 have입니다.',
        ],
        hint: '요청한 것은 "직원들"이고, 늘어난 것은 "수"입니다.',
        explain: 'A number of employees는 "많은 직원들"이라 복수 동사 **have**, the number of training sessions는 "연수 횟수"라 단수 동사 **has**입니다. "많은 직원이 연수를 더 요청해서 연수 횟수가 늘었습니다."',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nAt the year-end party, Ms. Moon ___ the best employee of the year by the CEO.',
        choices: ['was named', 'named', 'naming', 'has named'],
        answer: 0,
        why: [
          '',
          '능동태로 쓰면 문 씨가 누군가를 뽑은 것이 되는데, 뒤의 by the CEO(대표에 의해)와 맞지 않습니다.',
          '-ing 꼴은 혼자 문장의 동사가 될 수 없습니다.',
          '능동태라서 by the CEO와 맞지 않습니다. 문 씨는 뽑힌 사람입니다.',
        ],
        hint: '빈칸 뒤에 명사가 있어도 by the CEO가 무엇을 알려 주는지 생각해 보십시오.',
        explain: '대표(the CEO)가 문 씨를 올해의 직원으로 뽑은 것입니다. 문 씨가 주어이면 "뽑힌" 쪽이라 수동태 **was named**입니다. name(~을 …으로 부르다·뽑다)은 수동태 뒤에도 명사(the best employee of the year)가 남습니다. "연말 파티에서 문 씨는 대표에게서 올해의 직원으로 뽑혔습니다."',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nOur company is committed to ___ the best possible service to every customer.',
        choices: ['providing', 'provide', 'provided', 'be provided'],
        answer: 0,
        why: [
          '',
          'be committed to의 to는 전치사입니다. 전치사 뒤에는 동사원형이 아니라 명사나 -ing 꼴이 옵니다.',
          '과거분사는 전치사 to 뒤에서 "제공하는 일"이라는 뜻을 나타내지 못합니다.',
          'to be provided는 "제공받다"는 뜻이고, 이 to는 전치사라 동사원형을 받지 않습니다. 회사가 서비스를 제공하는 것입니다.',
        ],
        hint: 'committed to의 to는 to부정사의 to가 아닙니다.',
        explain: 'be committed to(~에 전념하다)의 to는 전치사라서 뒤에 -ing 꼴을 씁니다. 빈칸 뒤에 목적어 the best possible service가 있으므로 **providing**입니다. "저희 회사는 모든 고객에게 최선의 서비스를 제공하는 데 힘쓰고 있습니다."',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 4,
        q: '어법상 **옳은** 문장은 무엇입니까?',
        choices: [
          'The meeting was taken place in Room 3.',
          'Some questions were arisen during the meeting.',
          'Prices have been risen sharply this year.',
          'Several problems arose after the update.',
        ],
        answer: 3,
        why: [
          'take place(열리다)는 목적어를 갖지 않아 수동태로 쓸 수 없습니다. The meeting took place in Room 3.',
          'arise(생기다)는 자동사라 수동태로 쓸 수 없습니다. Some questions arose during the meeting.',
          'rise(오르다)는 자동사라 수동태로 쓸 수 없습니다. Prices have risen sharply this year.',
          '',
        ],
        explain: 'take place, arise, rise는 모두 목적어를 갖지 않는 자동사(또는 그런 표현)라서 수동태가 될 수 없습니다. 능동태로 바르게 쓴 문장은 **Several problems arose after the update.**입니다.',
      },
    ],

    deeper: [
      {
        title: '업무 문서에 수동태가 많은 까닭',
        body: '공지문·보고서·안내문에는 수동태가 자주 나옵니다. 누가 했는지보다 **무엇이 어떻게 되었는지**가 더 중요하기 때문입니다.\n\n' +
          '- Your order **has been shipped**. (누가 보냈는지보다 "주문이 발송되었다"는 사실이 중요)\n' +
          '- Visitors **are required** to sign in at the front desk. (규칙을 정한 사람보다 방문객이 할 일이 중요)\n' +
          '- The results **will be announced** next week. (발표할 사람보다 결과가 언제 나오는지가 중요)\n\n' +
          '그래서 공지문을 읽을 때는 수동태 문장의 주어가 곧 "이 글이 말하려는 대상"이라고 보면 내용을 빨리 잡을 수 있습니다. 반대로 자기 팀이 한 일을 분명히 밝히고 싶을 때는 능동태(We shipped your order today.)가 더 힘 있게 읽힙니다.',
      },
      {
        title: '둘을 잇는 주어의 수 일치',
        body: '주어 두 개를 이은 표현은 동사를 어디에 맞추는지가 정해져 있습니다.\n\n' +
          '| 표현 | 동사를 맞추는 곳 | 예 |\n|---|---|---|\n' +
          '| A and B | 복수 | The manager and her assistant **are** here. |\n' +
          '| either A or B / neither A nor B | B에 맞춤 | Neither the manager nor the assistants **are** here. |\n' +
          '| not only A but also B | B에 맞춤 | Not only the staff but also the director **was** surprised. |\n' +
          '| A as well as B / A along with B | A에 맞춤 | The director as well as the staff **was** surprised. |\n\n' +
          'or·nor·but also로 이은 표현은 동사에 가까운 쪽(B)에, as well as·along with는 앞쪽(A)에 맞춘다고 기억하면 됩니다.',
      },
    ],

    faq: [
      {
        q: 'along with나 as well as가 있으면 동사는 어디에 맞춰요?',
        a: '앞에 나온 주어에 맞춥니다. along with, together with, as well as가 이끄는 말은 덧붙인 정보일 뿐이라 동사의 수를 바꾸지 않습니다. The manager, along with her team, is here.에서 동사는 manager(단수)에 맞춘 is입니다.',
      },
      {
        q: '수동태 뒤에 명사가 오면 무조건 틀린 건가요?',
        a: '아닙니다. give·send·offer처럼 "~에게 …을 주다"라는 동사나, name·call·consider처럼 "~을 …으로 부르다·여기다"라는 동사는 수동태 뒤에도 명사가 남습니다. Ms. Moon was given an award. / He was named team leader. 그래서 "목적어가 없으면 수동태"는 대부분 맞는 빠른 판단법이고, 이런 동사가 보이면 뜻을 한 번 더 확인합니다.',
      },
      {
        q: 'occur는 왜 수동태가 안 돼요?',
        a: '수동태는 능동태 문장의 목적어를 주어로 올려서 만듭니다. occur(일어나다)는 처음부터 목적어를 갖지 않는 자동사라서 주어로 올릴 목적어가 없습니다. 그래서 An error occurred.(○)만 있고 An error was occurred.(×)는 없습니다. arise, happen, remain, take place도 같습니다.',
      },
    ],

    mistakes: [
      '동사 바로 앞의 명사에 수를 맞추는 실수(The quality of the products have …) — 수식어를 지우고 주어의 중심 명사(quality)에 맞춥니다.',
      'the number of 뒤에 복수 동사를 쓰는 실수 — the number of는 "~의 수"라 단수(has, is), a number of는 "많은"이라 복수(have, are)입니다.',
      'occur, arise, remain, take place를 수동태로 쓰는 실수(was occurred) — 목적어를 갖지 않는 동사는 능동태로만 씁니다.',
    ],

    gens: [
      {
        id: 'agreement',
        level: 1,
        title: '주어의 중심 명사에 동사의 수 맞추기',
        make: function (R) {
          var it = R.pick(AGR);
          var right = it[4];
          var other = right === 'sg' ? 'pl' : 'sg';
          var correct = right === 'sg' ? it[1] : it[2];
          var wrongNum = right === 'sg' ? it[2] : it[1];
          var reason = {};
          reason[wrongNum] = AGR_NAME[other] + ' 동사입니다. ' + it[5] + '이므로 ' + AGR_NAME[right] + ' 동사를 씁니다.';
          reason[it[3]] = '시제를 갖춘 동사가 아닌 꼴이라 혼자 문장의 동사가 될 수 없습니다.';
          var pick = R.choices(correct, [wrongNum, it[3]], 3);
          return {
            type: 'choice', concept: it[7],
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: '단서: ' + it[5] + '. 그래서 ' + AGR_NAME[right] + ' 동사를 씁니다. 정답: **' + correct + '**\n\n' +
              it[0].replace('___', '**' + correct + '**') + '\n(' + it[6] + ')',
          };
        },
      },
      {
        id: 'voice',
        level: 2,
        title: '능동태·수동태 고르기와 수동태로 쓰지 않는 자동사',
        make: function (R) {
          var it = R.pick(VOICE);
          var correct = it[1];
          var reason = {};
          reason[it[2][0]] = VOICE_WHY[it[5]];
          reason[it[2][1]] = VOICE_WHY.ing;
          var pick = R.choices(correct, it[2], 3);
          return {
            type: 'choice', concept: it[5] === 'intr' ? 4 : 2,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: it[3] + ' 정답: **' + correct + '** (' + VOICE_NAME[it[5]] + ')\n\n' +
              it[0].replace('___', '**' + correct + '**') + '\n(' + it[4] + ')',
          };
        },
      },
      {
        id: 'passive-prep',
        level: 2,
        title: '수동태와 짝을 이루는 전치사',
        make: function (R) {
          var it = R.pick(PREP);
          var correct = it[1];
          var reason = {};
          it[2].forEach(function (w) { reason[w] = '이 표현과 짝을 이루는 전치사가 아닙니다. 바른 짝은 이렇습니다 — ' + it[3]; });
          var pick = R.choices(correct, it[2], 4);
          return {
            type: 'choice', concept: 3,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: it[3] + '. 정답: **' + correct + '**\n\n' + it[0].replace('___', '**' + correct + '**') + '\n(' + it[4] + ')',
          };
        },
      },
    ],

    vocab: [
      { w: 'occur', m: '일어나다, 발생하다', ex: 'The accident occurred late at night.', exm: '그 사고는 밤늦게 일어났습니다.' },
      { w: 'arise', m: '생기다, 발생하다', ex: 'If any problems arise, please call me.', exm: '문제가 생기면 제게 전화해 주십시오.' },
      { w: 'remain', m: '~인 채로 있다, 남다', ex: 'Prices remained stable all year.', exm: '가격은 한 해 내내 안정된 채로 있었습니다.' },
      { w: 'complaint', m: '불만, 항의', ex: 'We received a complaint about the noise.', exm: '우리는 소음에 관한 항의를 받았습니다.' },
      { w: 'shipment', m: '배송(품), 발송', ex: 'The next shipment will arrive on Friday.', exm: '다음 배송품은 금요일에 도착합니다.' },
      { w: 'contract', m: '계약(서)', ex: 'Please read the contract carefully before you sign it.', exm: '서명하기 전에 계약서를 꼼꼼히 읽어 주십시오.' },
      { w: 'postpone', m: '미루다, 연기하다', ex: 'The trip was postponed because of the storm.', exm: '폭풍 때문에 출장이 연기되었습니다.' },
      { w: 'involve', m: '참여시키다, 포함하다', ex: 'The project involves three departments.', exm: '그 사업에는 세 부서가 참여합니다.' },
      { w: 'satisfied', m: '만족한', ex: 'Most guests were satisfied with their rooms.', exm: '대부분의 손님이 객실에 만족했습니다.' },
      { w: 'located', m: '~에 있는(위치한)', ex: 'The bank is located next to the post office.', exm: '그 은행은 우체국 옆에 있습니다.' },
      { w: 'equipped', m: '~을 갖춘', ex: 'Every classroom is equipped with a projector.', exm: '모든 교실에 프로젝터가 갖춰져 있습니다.' },
      { w: 'committed', m: '전념하는, 헌신하는', ex: 'We are committed to protecting your personal information.', exm: '저희는 고객님의 개인정보를 보호하는 데 힘쓰고 있습니다.' },
      { w: 'survey', m: '설문 조사', ex: 'Please take a few minutes to complete our survey.', exm: '잠시 시간을 내어 설문 조사를 마쳐 주십시오.' },
      { w: 'approve', m: '승인하다', ex: 'The manager approved my request for a day off.', exm: '관리자가 내 휴가 신청을 승인했습니다.' },
    ],
  });
})();
