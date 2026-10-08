/* 공인영어시험 기초 (토익형) · 전치사와 접속사
 * 예문·지문은 모두 직접 쓴 문장이다(가상의 회사·인물). */
(function () {
  // 전치사·접속사 구별 생성기: [빈칸 문장, 정답, 뜻 갈래('cause'|'contrast'|'time'), 해석]
  // 오답은 정답의 짝(같은 뜻, 다른 품사) + 뜻이 분명히 맞지 않는 짝 두 개다.
  // (원인·시간 문장에는 양보 짝을, 양보 문장에는 원인 짝을 오답으로 쓴다 — while 은 '~인 반면'의 뜻도 있어 양보 문장의 오답으로 쓰지 않는다.)
  var PC = [
    ['___ the heavy snow, all flights were delayed.', 'because of', 'cause', '폭설 때문에 모든 항공편이 늦어졌습니다.'],
    ['The event was moved indoors ___ the strong wind.', 'because of', 'cause', '강한 바람 때문에 행사가 실내로 옮겨졌습니다.'],
    ['Sales went up ___ the new advertising campaign.', 'because of', 'cause', '새 광고 캠페인 덕분에 매출이 올랐습니다.'],
    ['The meeting was canceled ___ the manager was sick.', 'because', 'cause', '관리자가 아파서 회의가 취소되었습니다.'],
    ['Many customers left ___ the line was too long.', 'because', 'cause', '줄이 너무 길어서 많은 손님이 떠났습니다.'],
    ['We sent the files by e-mail ___ the printer was broken.', 'because', 'cause', '프린터가 고장 나서 우리는 파일을 이메일로 보냈습니다.'],
    ['___ the rain, the outdoor concert went ahead as planned.', 'despite', 'contrast', '비가 왔는데도 야외 공연은 예정대로 열렸습니다.'],
    ['The plane landed safely ___ the strong wind.', 'despite', 'contrast', '강한 바람에도 불구하고 비행기는 안전하게 내렸습니다.'],
    ['___ his busy schedule, Mr. Ko answered every e-mail.', 'despite', 'contrast', '바쁜 일정에도 고 씨는 모든 이메일에 답했습니다.'],
    ['___ it rained all day, the outdoor concert went ahead.', 'although', 'contrast', '하루 종일 비가 왔지만 야외 공연은 열렸습니다.'],
    ['___ the store is small, it sells a wide range of products.', 'although', 'contrast', '그 가게는 작지만 아주 다양한 제품을 팝니다.'],
    ['Ms. Moon finished the report on time ___ she was very busy.', 'although', 'contrast', '문 씨는 매우 바빴지만 보고서를 제때 끝냈습니다.'],
    ['Please turn off your phone ___ the performance.', 'during', 'time', '공연 중에는 휴대 전화를 꺼 주십시오.'],
    ['Several new ideas came up ___ the meeting.', 'during', 'time', '회의 중에 새로운 아이디어가 몇 가지 나왔습니다.'],
    ['The lights went out ___ the presentation.', 'during', 'time', '발표 도중에 불이 나갔습니다.'],
    ['Please wait in the lobby ___ we prepare your room.', 'while', 'time', '객실을 준비하는 동안 로비에서 기다려 주십시오.'],
    ['Please do not talk on the phone ___ you are driving.', 'while', 'time', '운전하는 동안에는 통화하지 마십시오.'],
    ['The phone rang ___ I was talking to a customer.', 'while', 'time', '내가 손님과 이야기하는 동안 전화가 울렸습니다.'],
  ];
  var PREP = { 'because of': 1, despite: 1, during: 1 };
  var PARTNER = { 'because of': 'because', because: 'because of', despite: 'although', although: 'despite', during: 'while', while: 'during' };
  var MEANING = { 'because of': '~ 때문에', because: '~ 때문에', despite: '~에도 불구하고', although: '~에도 불구하고', during: '~ 동안', while: '~하는 동안' };
  var OTHER = { cause: ['despite', 'although'], contrast: ['because of', 'because'], time: ['despite', 'although'] };

  // 상관접속사 생성기: [짝 번호, 문장 틀({1}·{2} 자리), 해석]
  var PAIRS = [
    { a: 'both', b: 'and', pat: 'both A and B', mean: 'A와 B 둘 다' },
    { a: 'either', b: 'or', pat: 'either A or B', mean: 'A와 B 둘 중 하나' },
    { a: 'neither', b: 'nor', pat: 'neither A nor B', mean: 'A도 B도 아닌' },
    { a: 'not only', b: 'but also', pat: 'not only A but also B', mean: 'A뿐 아니라 B도' },
  ];
  var CORR = [
    [0, '{1} the sales team {2} the design team will join the workshop.', '영업팀과 디자인팀이 모두 워크숍에 참가합니다.'],
    [0, 'The new model is {1} lighter {2} cheaper than the old one.', '새 모델은 예전 모델보다 더 가볍고 더 쌉니다.'],
    [0, 'This job requires {1} patience {2} attention to detail.', '이 일에는 인내심과 꼼꼼함이 모두 필요합니다.'],
    [1, 'You can pay {1} by credit card {2} in cash.', '신용카드나 현금 중 하나로 내실 수 있습니다.'],
    [1, '{1} Mr. Han {2} his assistant will meet you at the airport.', '한 씨나 그의 비서 중 한 사람이 공항에서 맞이할 것입니다.'],
    [1, 'Please contact us {1} by phone {2} by e-mail.', '전화나 이메일 중 하나로 연락해 주십시오.'],
    [2, 'The small hotel offers {1} breakfast {2} parking.', '그 작은 호텔은 아침 식사도 주차도 제공하지 않습니다.'],
    [2, '{1} the manager {2} the staff members knew about the change.', '관리자도 직원들도 그 변경을 알지 못했습니다.'],
    [3, 'The app is {1} easy to use {2} free.', '그 앱은 쓰기 쉬울 뿐 아니라 무료이기도 합니다.'],
    [3, 'Ms. Ryu speaks {1} English {2} Japanese.', '류 씨는 영어뿐 아니라 일본어도 합니다.'],
    [3, 'The festival attracts {1} local residents {2} tourists from abroad.', '그 축제는 지역 주민뿐 아니라 외국인 관광객도 끌어들입니다.'],
  ];

  // by·until 생성기: [빈칸 문장, 정답, 동사 설명, 해석]
  var BYU = [
    ['Please submit your expense report ___ Friday.', 'by', 'submit(제출하다)', '금요일까지 경비 보고서를 제출해 주십시오.'],
    ['All guests must check out ___ 11 a.m.', 'by', 'check out(퇴실하다)', '모든 투숙객은 오전 11시까지 퇴실해야 합니다.'],
    ['The package should arrive ___ Wednesday.', 'by', 'arrive(도착하다)', '소포는 수요일까지는 도착할 것입니다.'],
    ['Please reply to this e-mail ___ the end of the week.', 'by', 'reply(답하다)', '이번 주말까지 이 이메일에 답해 주십시오.'],
    ['Payment must be made ___ June 30.', 'by', 'be made(지불이 이루어지다)', '6월 30일까지 돈을 내야 합니다.'],
    ['We need to finish the design ___ noon.', 'by', 'finish(끝내다)', '우리는 정오까지 디자인을 끝내야 합니다.'],
    ['The store stays open ___ 10 p.m. on weekends.', 'until', 'stay open(문을 연 채로 있다)', '그 가게는 주말에 오후 10시까지 문을 엽니다.'],
    ['This coupon is valid ___ the end of the year.', 'until', 'be valid(유효하다)', '이 쿠폰은 연말까지 유효합니다.'],
    ['Mr. Gu will stay in Tokyo ___ Thursday.', 'until', 'stay(머무르다)', '구 씨는 목요일까지 도쿄에 머무를 것입니다.'],
    ['The spring sale continues ___ Sunday.', 'until', 'continue(계속되다)', '봄 할인 행사는 일요일까지 이어집니다.'],
    ['The road will remain closed ___ further notice.', 'until', 'remain closed(닫힌 채로 있다)', '그 도로는 따로 알릴 때까지 계속 막혀 있습니다.'],
    ['Please keep your receipt ___ the end of the warranty period.', 'until', 'keep(가지고 있다)', '보증 기간이 끝날 때까지 영수증을 보관해 주십시오.'],
  ];

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function bold(sentence, word) { return sentence.replace('___', '**' + word + '**'); }

  Tutor.registerUnit({
    id: 'eng-u-toeic-06',
    course: 'eng-u-toeic',
    title: '전치사와 접속사',
    summary: '때·장소 전치사를 익히고, 뒤에 명사가 오는지 문장이 오는지로 전치사와 접속사를 구별합니다.',
    goals: [
      'by와 until, for와 during, within 같은 때 전치사를 뜻에 맞게 고를 수 있다.',
      'at, on, in, across, throughout 같은 장소·방향 전치사를 알맞게 쓸 수 있다.',
      '빈칸 뒤가 명사(구)인지 주어 + 동사인지 보고 전치사와 접속사를 구별할 수 있다.',
      '상관접속사의 짝과 unless, once, as soon as, provided that 같은 부사절 접속사를 쓸 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '때 전치사 ① by와 until',
        body: 'by와 until은 둘 다 우리말로 "~까지"라서 자주 헷갈립니다. 차이는 **앞의 동작이 한 번에 끝나는 일인지, 그때까지 이어지는 일인지**입니다.\n\n' +
          '| 전치사 | 뜻 | 함께 쓰는 동사 |\n|---|---|---|\n' +
          '| by | **마감**: 그때까지(늦어도 그때에는) 끝내다 | submit, finish, return, arrive, reply, pay |\n' +
          '| until | **계속**: 그때까지 죽 이어지다 | stay, wait, remain, continue, be valid, keep |\n\n' +
          '- Please submit the form **by** Friday. (금요일까지 서식을 내십시오 → 금요일 전 아무 때나 한 번 내면 됨)\n' +
          '- The store is open **until** 9 p.m. (가게는 밤 9시까지 문을 엽니다 → 9시까지 죽 열려 있음)\n\n' +
          '**판별법**: 동사 뒤에 "그때까지 계속"을 붙여 보십시오. "9시까지 계속 열려 있다"는 말이 되므로 until, "금요일까지 계속 제출한다"는 이상하므로 by입니다.\n\n' +
          '> 💡 not … until은 "~가 되어서야 비로소"라는 뜻입니다. The shop does not open **until** 10 a.m. (가게는 오전 10시가 되어서야 문을 엽니다.)',
        easy: '도서관 책을 생각해 보십시오. "책을 금요일**까지** 돌려주세요"는 금요일 전에 한 번 돌려주면 끝입니다. 이것이 **by**(마감)입니다.\n\n' +
          '"도서관은 저녁 6시**까지** 엽니다"는 6시가 될 때까지 문이 죽 열려 있다는 말입니다. 이것이 **until**(계속)입니다.\n\n마감 날짜를 달력에 동그라미 치면 by, 그날까지 선을 죽 그으면 until입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe store will stay open ___ 9 p.m. tonight.',
          choices: ['by', 'until', 'within'],
          answer: 1,
          why: [
            'by는 한 번에 끝내는 일의 마감입니다. 문을 연 채로 있는 것은 9시까지 이어지는 일이므로 until을 씁니다.',
            '',
            'within 뒤에는 three days처럼 기간의 길이가 옵니다. 9 p.m.은 한 시점입니다.',
          ],
          explain: 'stay open(문을 연 채로 있다)은 9시까지 **계속** 이어지는 일이므로 **until**입니다. "가게는 오늘 밤 9시까지 문을 엽니다."',
        },
      },
      {
        title: '때 전치사 ② for, during, within',
        body: '"~ 동안"을 나타내는 전치사도 뒤에 오는 말에 따라 나뉩니다.\n\n' +
          '| 전치사 | 뒤에 오는 말 | 예 |\n|---|---|---|\n' +
          '| for | **숫자가 있는 기간의 길이**(얼마 동안) | **for** three hours, **for** two weeks |\n' +
          '| during | **일·행사·때의 이름**(언제 동안) | **during** the meeting, **during** the holiday |\n' +
          '| within | 기간의 길이 + "그 안에"(이내) | **within** 24 hours, **within** three business days |\n\n' +
          '- The museum will be closed **for** two weeks. (박물관은 2주 동안 문을 닫습니다.)\n' +
          '- Please do not take photos **during** the show. (공연 중에는 사진을 찍지 마십시오.)\n' +
          '- We will reply **within** two business days. (영업일 기준 이틀 안에 답해 드리겠습니다.)\n\n' +
          '> ⚠️ during 뒤에 숫자 기간을 바로 쓰지 않습니다: during three hours (×) → for three hours (○)\n\n' +
          '> 💡 within은 장소에도 씁니다: **within** walking distance of the station (역에서 걸어갈 수 있는 거리 안에)',
        easy: '세 낱말에 질문을 하나씩 붙여 보십시오.\n\n- for → "**얼마나** 오래?" 두 시간, 사흘처럼 시계·달력으로 잰 길이\n- during → "**언제**?" 회의 때, 방학 때처럼 일의 이름\n- within → "**며칠 안에**?" 정해진 길이를 넘기지 않고\n\n"두 시간 동안"은 for, "회의 동안"은 during입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe lights suddenly went out ___ the meeting.',
          choices: ['for', 'during', 'within'],
          answer: 1,
          why: [
            'for 뒤에는 two hours처럼 숫자가 있는 기간의 길이가 옵니다. the meeting은 일의 이름입니다.',
            '',
            'within은 "~ 이내에"라는 뜻으로 기간의 길이와 씁니다. "회의 이내에"는 뜻이 통하지 않습니다.',
          ],
          explain: 'the meeting은 숫자 기간이 아니라 **일의 이름**이므로 **during**입니다. "회의 도중에 갑자기 불이 나갔습니다."',
        },
      },
      {
        title: '장소·방향 전치사',
        body: '장소 전치사는 **그 장소를 어떻게 보는지**에 따라 고릅니다.\n\n' +
          '| 전치사 | 장소를 보는 방법 | 예 |\n|---|---|---|\n' +
          '| at | 한 **지점** | **at** the front desk, **at** the entrance, **at** 25 Main Street(번지까지 있는 주소) |\n' +
          '| on | **면** 위·층·거리 | **on** the wall, **on** the second floor, **on** Main Street |\n' +
          '| in | 둘러싸인 **공간** 안·도시·나라 | **in** the meeting room, **in** Busan, **in** Canada |\n' +
          '| across | 가로질러, 건너편에 | walk **across** the street, the bank **across from** the station |\n' +
          '| throughout | 구석구석 **어디에나** | **throughout** the building, **throughout** the country |\n\n' +
          '- Please check in **at** the front desk. (안내 데스크에서 체크인하십시오.)\n' +
          '- Our office is **on** the fifth floor. (우리 사무실은 5층에 있습니다.)\n' +
          '- Free Wi-Fi is available **throughout** the hotel. (호텔 어디에서나 무료 와이파이를 쓸 수 있습니다.)\n\n' +
          '> 💡 throughout은 때에도 씁니다: **throughout** the year (일 년 내내). across도 "~ 전체에 걸쳐"라는 뜻으로 across the country(전국에 걸쳐)처럼 씁니다.\n\n' +
          '> ⚠️ 층은 on입니다: in the third floor (×) → **on** the third floor (○)',
        easy: '지도 위에 핀을 하나 꽂으면 **at**(한 점), 바닥이나 벽 같은 판 위에 올려놓으면 **on**(면), 상자 안에 넣으면 **in**(공간)이라고 생각하십시오.\n\n' +
          '길을 가로지르는 화살표는 **across**, 건물 곳곳에 빠짐없이 흩어진 점들은 **throughout**입니다.',
        check: {
          type: 'ox',
          q: '다음 문장은 어법에 맞습니다.\n\nThe workshop will be held in the third floor.',
          answer: false,
          explain: '층은 건물의 바닥(면)으로 보아 **on**을 씁니다. The workshop will be held **on** the third floor.(워크숍은 3층에서 열립니다)로 고칩니다.',
        },
      },
      {
        title: '전치사와 접속사 구별',
        body: '뜻이 같아도 **뒤에 무엇이 오는지**가 다른 짝이 있습니다. 토익은 이 짝을 보기로 함께 내고 하나를 고르게 합니다.\n\n' +
          '| 뜻 | 전치사 (+ 명사·명사구) | 접속사 (+ 주어 + 동사) |\n|---|---|---|\n' +
          '| ~ 때문에 | because of, due to | because, since |\n' +
          '| ~에도 불구하고 | despite, in spite of | although, even though |\n' +
          '| ~ 동안 | during | while |\n\n' +
          '- **Because of** the rain, the game was canceled. (비 때문에)\n' +
          '- **Because** it rained, the game was canceled. (비가 왔기 때문에)\n\n' +
          '**판별법**: 빈칸 뒤에서 **시제가 있는 동사**를 찾아보십시오. 동사가 있으면(it rained) 접속사, 명사 덩어리뿐이면(the rain) 전치사입니다.\n\n' +
          '그다음 **뜻**을 봅니다. 앞뒤가 "원인 → 결과"면 because 쪽, "예상과 반대"면 although 쪽, "같은 때"면 during 쪽입니다.\n\n' +
          '> ⚠️ while 뒤에는 -ing이 오기도 합니다: **while waiting** for the bus. 이것은 while (I was) waiting에서 주어와 be동사를 줄인 꼴이라 접속사 while이 맞습니다.',
        easy: '전치사는 **명사만** 태우는 작은 수레, 접속사는 **문장 하나(주어 + 동사)**를 통째로 태우는 큰 수레입니다.\n\n' +
          'the rain(명사)은 작은 수레 because of에, it rained(문장)는 큰 수레 because에 태웁니다. 빈칸 뒤에 짐이 얼마나 실려 있는지(동사가 있는지)를 먼저 보십시오.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\n___ the delay, the shipment arrived safely.',
          choices: ['Although', 'Despite', 'Because'],
          answer: 1,
          why: [
            'Although는 접속사라서 뒤에 주어 + 동사가 와야 합니다. 빈칸 뒤 the delay는 명사뿐입니다.',
            '',
            'Because는 접속사이고, 뜻도 "늦어졌기 때문에 안전하게 도착했다"가 되어 어색합니다.',
          ],
          explain: '빈칸 뒤 the delay는 명사이므로 전치사가 필요하고, "지연에도 불구하고 안전하게 도착했다"는 예상과 반대의 뜻이므로 **Despite**입니다.',
        },
      },
      {
        title: '상관접속사',
        body: '두 낱말이 **짝을 지어** 쓰이는 접속사를 상관접속사라고 합니다. 한쪽이 보이면 다른 쪽이 정해집니다.\n\n' +
          '| 짝 | 뜻 | 주어로 쓸 때 동사 |\n|---|---|---|\n' +
          '| **both** A **and** B | A와 B 둘 다 | 늘 복수 |\n' +
          '| **either** A **or** B | A와 B 둘 중 하나 | B에 맞춤 |\n' +
          '| **neither** A **nor** B | A도 B도 아닌 | B에 맞춤 |\n' +
          '| **not only** A **but also** B | A뿐 아니라 B도 | B에 맞춤 |\n\n' +
          '- You can pay **either** by card **or** in cash. (카드나 현금 중 하나로)\n' +
          '- **Both** the manager **and** her assistant **are** here. (둘 다 → 복수)\n' +
          '- **Neither** the manager **nor** the assistants **are** here. (B = the assistants → 복수)\n' +
          '- **Not only** the staff **but also** the director **was** surprised. (B = the director → 단수)\n\n' +
          'A와 B 자리에는 **같은 꼴**(명사와 명사, 형용사와 형용사, 전치사구와 전치사구)을 놓습니다. 이것을 병렬이라고 합니다: both **fast** and **quiet**, either **by phone** or **by e-mail**\n\n' +
          '> 💡 not only A but also B는 **B as well as A**로 바꿔 쓸 수 있습니다. 이때 동사는 앞의 B에 맞춥니다.',
        easy: '상관접속사는 **장갑 한 켤레**입니다. 왼쪽 장갑(both)을 보면 오른쪽 장갑(and)이 정해져 있습니다.\n\n- both ↔ and\n- either ↔ or\n- neither ↔ nor\n- not only ↔ but also\n\n짝이 아닌 것끼리(both … or, either … and) 끼우면 맞지 않습니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nYou can pay ___ by card or in cash.',
          choices: ['both', 'either', 'neither'],
          answer: 1,
          why: [
            'both는 and와 짝을 이룹니다. 문장에는 or가 있습니다.',
            '',
            'neither는 nor와 짝을 이룹니다. 문장에는 or가 있습니다.',
          ],
          explain: '뒤에 **or**가 있으므로 짝은 **either**입니다. either A or B: "카드나 현금 중 하나로 내실 수 있습니다."',
        },
      },
      {
        title: '부사절 접속사 unless, once, as soon as, provided that',
        body: '부사절 접속사는 "조건"이나 "때"를 나타내는 문장(부사절)을 이끌어 주절에 붙입니다. 토익에 자주 나오는 것은 다음과 같습니다.\n\n' +
          '| 접속사 | 뜻 | 예 |\n|---|---|---|\n' +
          '| unless | ~하지 않으면 (= if … not) | **Unless** you register today, you will miss the discount. |\n' +
          '| once | 일단 ~하면, ~하자마자 | **Once** the form is approved, we will contact you. |\n' +
          '| as soon as | ~하자마자 | Please call me **as soon as** the parts arrive. |\n' +
          '| provided (that), providing (that) | ~라면, ~라는 조건으로 | You can return the item **provided that** it is unused. |\n\n' +
          '모두 뒤에 **주어 + 동사**가 옵니다. 그래서 앞 카드의 판별법대로, 빈칸 뒤에 문장이 있으면 전치사(during, despite …)가 아니라 이런 접속사를 고릅니다.\n\n' +
          '> ⚠️ unless에는 이미 not의 뜻이 들어 있습니다. Unless you **don\'t** hurry (×) → Unless you hurry (○)\n\n' +
          '> 💡 앞 단원에서 익힌 대로, 때·조건을 나타내는 부사절에서는 앞으로의 일도 **현재 시제**로 씁니다: as soon as the parts **arrive** (will arrive ×)',
        easy: 'unless는 "**~ 아니면**"이라는 문지기입니다. "안전모를 쓰지 **않으면** 들어올 수 없습니다" = You cannot enter **unless** you wear a helmet.\n\n' +
          'once와 as soon as는 출발 신호입니다. "부품이 도착**하자마자** 연락드리겠습니다." provided that은 계약서의 조건 칸입니다. "쓰지 않은 물건**이라면** 반품됩니다."',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nYou cannot enter the lab ___ you wear safety glasses.',
          choices: ['unless', 'once', 'as soon as'],
          answer: 0,
          why: [
            '',
            '"일단 보안경을 쓰면 들어갈 수 없다"가 되어 뜻이 거꾸로입니다.',
            '"보안경을 쓰자마자 들어갈 수 없다"가 되어 뜻이 통하지 않습니다.',
          ],
          explain: '"보안경을 쓰지 **않으면** 실험실에 들어갈 수 없습니다"라는 조건이므로 **unless**(= if … not)입니다.',
        },
      },
    ],

    examples: [
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\n___ the heavy traffic, Mr. Bae arrived at the airport on time.\n\n(A) Although (B) Despite (C) Because (D) Because of',
        steps: [
          '보기에 전치사(Despite, Because of)와 접속사(Although, Because)가 섞여 있으므로 먼저 빈칸 뒤를 봅니다.',
          '빈칸 뒤 the heavy traffic에는 시제가 있는 동사가 없습니다. 명사구이므로 전치사가 와야 합니다. (A)와 (C)는 빠집니다.',
          '이제 뜻을 봅니다. "교통 체증이 심했다"와 "제때 도착했다"는 예상과 반대입니다. 그래서 "~에도 불구하고"인 Despite입니다.',
          '정답은 (B)입니다. "교통 체증이 심했는데도 배 씨는 공항에 제시간에 도착했습니다."',
        ],
        answer: '(B) Despite',
      },
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\nPlease return the signed contract ___ Friday.\n\n(A) by (B) until (C) during (D) for',
        steps: [
          '빈칸 뒤 Friday는 한 시점(요일)입니다. during과 for는 기간과 쓰므로 맞지 않습니다.',
          'by와 until 가운데에서 고르려면 동사 return을 봅니다. 계약서를 돌려보내는 일은 한 번 하면 끝나는 일입니다.',
          '"금요일까지 계속 돌려보낸다"는 말이 되지 않으므로 마감을 뜻하는 by가 알맞습니다.',
        ],
        answer: '(A) by',
      },
    ],

    terms: [
      { term: '전치사', def: '명사나 대명사 앞에 놓여 때·장소·이유 등을 나타내는 말입니다. 뒤에 명사(구)나 동명사가 옵니다. 예: during the meeting' },
      { term: '접속사', def: '낱말과 낱말, 문장과 문장을 잇는 말입니다. 부사절 접속사 뒤에는 주어 + 동사가 옵니다. 예: because it rained' },
      { term: '명사구', def: '명사를 중심으로 꾸미는 말이 붙은 덩어리입니다. 시제가 있는 동사가 없습니다. 예: the heavy traffic' },
      { term: '부사절', def: '접속사가 이끄는 문장으로, 주절에 때·조건·이유·양보 같은 뜻을 더합니다. 예: as soon as the parts arrive' },
      { term: '주절', def: '부사절이 붙는 중심 문장입니다. 혼자서도 완전한 문장이 됩니다. 예: Please call me as soon as the parts arrive.에서 Please call me' },
      { term: '상관접속사', def: '두 낱말이 짝을 지어 쓰이는 접속사입니다. 예: both A and B, either A or B, neither A nor B, not only A but also B' },
      { term: '병렬', def: '접속사로 이은 두 부분을 같은 꼴(명사와 명사, 형용사와 형용사)로 맞추는 것입니다. 예: both fast and quiet' },
      { term: '양보', def: '"~에도 불구하고"처럼 앞의 내용에서 예상되는 것과 반대되는 결과를 말하는 관계입니다. 예: although, despite' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nAll applications must be submitted ___ May 31.',
        choices: ['until', 'by', 'during', 'for'],
        answer: 1,
        why: [
          'until은 그때까지 계속 이어지는 일에 씁니다. 지원서 제출은 한 번 하면 끝나는 일입니다.',
          '',
          'during 뒤에는 the meeting처럼 일·행사의 이름이 옵니다. May 31은 마감 날짜입니다.',
          'for 뒤에는 three days처럼 기간의 길이가 옵니다.',
        ],
        explain: '제출(submit)은 한 번에 끝나는 일이므로 마감을 뜻하는 **by**를 씁니다. "모든 지원서는 5월 31일까지 제출해야 합니다."',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 0,
        q: '다음 문장은 어법에 맞습니다.\n\nThis special offer is valid by the end of this month.',
        answer: false,
        explain: '유효하다(be valid)는 그때까지 **계속** 이어지는 상태이므로 until을 씁니다. This special offer is valid **until** the end of this month.(이 특별 할인은 이달 말까지 유효합니다)',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nCustomers can return unused items ___ 30 days of purchase.',
        choices: ['within', 'during', 'by', 'until'],
        answer: 0,
        why: [
          '',
          'during 뒤에는 기간의 길이가 아니라 일·행사의 이름이 옵니다.',
          'by 뒤에는 Friday처럼 마감 시점이 옵니다. 30 days는 기간의 길이입니다.',
          'until 뒤에는 시점이 옵니다. "구매 후 30일까지 계속 돌려준다"는 뜻도 어색합니다.',
        ],
        explain: '"구매 후 30일 **이내에**"라는 뜻이므로 기간의 길이와 쓰는 **within**입니다. within 30 days of purchase는 반품 안내에 아주 자주 나오는 표현입니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'text', concept: 1,
        q: '빈칸에 for와 during 가운데 알맞은 것을 쓰십시오.\n\nThe road will be closed ___ three days.',
        answer: ['for'],
        wrong: [{ a: 'during', why: 'during 뒤에는 the holiday처럼 일·때의 이름이 옵니다. three days처럼 숫자가 있는 기간의 길이에는 for를 씁니다.' }],
        explain: 'three days는 숫자가 있는 **기간의 길이**이므로 **for**입니다. "그 도로는 사흘 동안 막힙니다."',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nOur new office is ___ the fifth floor.',
        choices: ['in', 'on', 'across', 'throughout'],
        answer: 1,
        why: [
          '층에는 in을 쓰지 않습니다. 층은 건물의 바닥(면)으로 보아 on을 씁니다.',
          '',
          'across는 "가로질러, 건너편에"라는 뜻이라 층과 함께 쓰지 않습니다.',
          'throughout은 "곳곳에"라는 뜻입니다. "사무실이 5층 곳곳에 있다"는 뜻이 통하지 않습니다.',
        ],
        explain: '층은 **on**을 씁니다. on the fifth floor: "우리 새 사무실은 5층에 있습니다."',
      },
      {
        id: 'p6', level: 2, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe bank is just ___ the street from the post office.',
        choices: ['throughout', 'at', 'across', 'within'],
        answer: 2,
        why: [
          'throughout은 "곳곳에"라는 뜻이라 "길 곳곳에"가 되어 뜻이 통하지 않습니다.',
          'at the street from은 쓰지 않는 꼴입니다. "길 건너편"은 across the street from입니다.',
          '',
          'within은 "~ 안에"라는 뜻이라 "우체국으로부터 길 안에"가 되어 뜻이 통하지 않습니다.',
        ],
        hint: '"우체국에서 길 건너편에"라는 뜻이 되어야 합니다.',
        explain: 'across the street from ~은 "~에서 길 건너편에"라는 뜻입니다. "은행은 우체국 바로 길 건너편에 있습니다."',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\n___ the bad weather, the flight left on time.',
        choices: ['Although', 'Because of', 'Despite', 'Because'],
        answer: 2,
        why: [
          'Although는 접속사라서 뒤에 주어 + 동사가 와야 합니다. the bad weather는 명사구입니다.',
          '뒤에 명사구가 와서 꼴은 맞지만, "날씨가 나빠서 제시간에 떠났다"는 뜻이 어색합니다.',
          '',
          'Because는 접속사라서 뒤에 주어 + 동사가 와야 하고, 뜻도 맞지 않습니다.',
        ],
        explain: '뒤가 명사구(the bad weather)이므로 전치사, "날씨가 나빴는데도 제시간에 떠났다"는 예상과 반대이므로 **Despite**입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'text', concept: 3,
        q: '빈칸에 because와 because of 가운데 알맞은 것을 쓰십시오.\n\nThe meeting was canceled ___ the manager was sick.',
        answer: ['because'],
        hint: '빈칸 뒤에 시제가 있는 동사가 있는지 보십시오.',
        wrong: [{ a: 'because of', why: '빈칸 뒤에 주어(the manager)와 동사(was)가 있습니다. 문장을 이끄는 것은 접속사 because입니다.' }],
        explain: '빈칸 뒤 the manager **was** sick은 주어 + 동사를 갖춘 문장이므로 접속사 **because**를 씁니다. "관리자가 아파서 회의가 취소되었습니다."',
      },
      {
        id: 'p9', level: 1, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\n___ the sales team and the design team will attend the workshop.',
        choices: ['Either', 'Neither', 'Both', 'Not only'],
        answer: 2,
        why: [
          'either는 or와 짝을 이룹니다. 문장에는 and가 있습니다.',
          'neither는 nor와 짝을 이룹니다. 문장에는 and가 있습니다.',
          '',
          'not only는 but also와 짝을 이룹니다. 문장에는 and가 있습니다.',
        ],
        explain: '뒤에 **and**가 있으므로 짝은 **Both**입니다. "영업팀과 디자인팀이 모두 워크숍에 참석합니다."',
      },
      {
        id: 'p10', level: 2, type: 'order', concept: 4,
        q: '낱말 덩어리를 바른 순서로 놓아 문장을 완성하십시오.\n\n(뜻: 새 프린터는 빠를 뿐 아니라 조용하기도 합니다.)',
        choices: ['but also', 'The new printer is', 'quiet', 'not only fast'],
        answer: [1, 3, 0, 2],
        explain: 'The new printer is / not only fast / but also / quiet. — not only A but also B에서 A(fast)와 B(quiet)는 같은 꼴인 형용사입니다.',
      },
      {
        id: 'p11', level: 1, type: 'choice', concept: 5,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nWe will start the meeting ___ everyone arrives.',
        choices: ['during', 'as soon as', 'despite', 'unless'],
        answer: 1,
        why: [
          'during은 전치사라서 뒤에 주어 + 동사(everyone arrives)가 올 수 없습니다.',
          '',
          'despite는 전치사라서 뒤에 주어 + 동사가 올 수 없고, 뜻도 맞지 않습니다.',
          '"모두가 도착하지 않으면 회의를 시작하겠다"가 되어 뜻이 거꾸로입니다.',
        ],
        explain: '"모두 도착하**자마자** 회의를 시작하겠습니다"라는 뜻이므로 **as soon as**입니다. 빈칸 뒤에 주어 + 동사가 있으므로 전치사 during, despite는 처음부터 빠집니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'text', concept: 5,
        q: '빈칸에 unless와 if 가운데 알맞은 것을 쓰십시오.\n\n___ we receive your payment by Friday, your order will be canceled.',
        answer: ['unless'],
        hint: '돈을 받으면 주문이 취소될까요, 받지 않으면 취소될까요?',
        wrong: [{ a: 'if', why: '"금요일까지 돈을 받으면 주문이 취소된다"가 되어 뜻이 거꾸로입니다. "~하지 않으면"은 unless입니다.' }],
        explain: '"금요일까지 대금을 받지 **않으면** 주문이 취소됩니다"이므로 **Unless**(= If … not)입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 3,
        q: '어법에 맞는 문장은 무엇입니까?',
        choices: [
          'Despite the price was high, the tickets sold out.',
          'During the manager was away, Ms. Han handled the calls.',
          'While the manager was away, Ms. Han handled the calls.',
          'Because of it rained, the event was moved indoors.',
        ],
        answer: 2,
        why: [
          'despite는 전치사라서 뒤에 주어 + 동사(the price was)가 올 수 없습니다. Although the price was high로 고칩니다.',
          'during은 전치사라서 뒤에 주어 + 동사가 올 수 없습니다. While로 고칩니다.',
          '',
          'because of는 전치사라서 뒤에 주어 + 동사(it rained)가 올 수 없습니다. Because it rained로 고칩니다.',
        ],
        hint: '네 문장 모두 빈칸 뒤에 주어 + 동사가 있습니다. 그렇다면 어떤 품사가 와야 할까요?',
        explain: '네 문장 모두 뒤에 주어 + 동사가 이어지므로 **접속사**가 필요합니다. 접속사를 쓴 것은 While뿐입니다. "관리자가 자리를 비운 동안 한 씨가 전화를 받았습니다."',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nNot only the employees but also the director ___ invited to the opening ceremony last week.',
        choices: ['were', 'was', 'have been', 'are'],
        answer: 1,
        why: [
          'not only A but also B가 주어면 동사는 B에 맞춥니다. B는 the director(단수)입니다.',
          '',
          'B(the director)가 단수라 have가 맞지 않고, last week(지난주)는 끝난 과거 시점이라 현재완료와 함께 쓰지 않습니다.',
          'B(the director)가 단수이고, last week가 있으므로 과거 시제여야 합니다.',
        ],
        hint: '동사를 맞출 대상은 A와 B 가운데 어느 쪽입니까? 시간 표현도 보십시오.',
        explain: 'not only A but also B에서 동사는 **B(the director)**에 맞추므로 단수, last week가 있으므로 과거 → **was**입니다. "직원들뿐 아니라 이사도 지난주 개업식에 초대받았습니다."',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 0,
        q: '빈칸 (A), (B)에 들어갈 말을 차례대로 고르십시오.\n\nThe renovation work will continue (A) the end of March, so the lobby will be closed (B) about three weeks.',
        choices: ['by / during', 'until / during', 'by / for', 'until / for'],
        answer: 3,
        why: [
          '(A) continue는 그때까지 이어지는 일이라 by가 아니라 until입니다. (B) during 뒤에 숫자 기간을 쓰지 않습니다.',
          '(A)는 맞지만 (B) about three weeks는 숫자가 있는 기간의 길이라서 during이 아니라 for입니다.',
          '(B)는 맞지만 (A) continue는 한 번에 끝나는 일이 아니라 계속되는 일이므로 until입니다.',
          '',
        ],
        hint: '(A)는 by와 until, (B)는 for와 during의 차이를 떠올리십시오.',
        explain: '(A) 공사가 3월 말까지 **계속**되므로 **until**, (B) about three weeks는 숫자가 있는 기간의 길이이므로 **for**입니다. "보수 공사가 3월 말까지 이어져서 로비는 약 3주 동안 닫힙니다."',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 5,
        q: '다음 문장과 뜻이 가장 가까운 것은 무엇입니까?\n\nUnless you sign up by Friday, you will miss the early-bird discount.',
        choices: [
          'If you sign up by Friday, you will miss the early-bird discount.',
          'If you do not sign up by Friday, you will miss the early-bird discount.',
          'Once you sign up by Friday, you will miss the early-bird discount.',
          'Although you sign up by Friday, you will still miss the early-bird discount.',
        ],
        answer: 1,
        why: [
          'not의 뜻이 빠져 "신청하면 할인을 놓친다"가 되었습니다. unless = if … not입니다.',
          '',
          'once는 "일단 ~하면"이라는 뜻이라 not의 뜻이 없습니다.',
          'although는 양보(~이지만)라서 조건의 뜻이 아닙니다.',
        ],
        explain: 'unless는 **if … not**과 뜻이 같습니다. "금요일까지 신청하지 않으면 조기 등록 할인을 놓칩니다."',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 2,
        q: '빈칸 (A), (B)에 들어갈 말을 차례대로 고르십시오.\n\nFree Wi-Fi is available (A) the hotel, and you can get the password (B) the front desk.',
        choices: ['throughout / at', 'throughout / across', 'during / at', 'at / throughout'],
        answer: 0,
        why: [
          '',
          '(B) 비밀번호를 받는 곳은 안내 데스크라는 한 지점이라 at입니다. across the front desk(데스크를 가로질러)는 뜻이 통하지 않습니다.',
          '(A) during은 때를 나타내는 전치사라서 장소(the hotel) 앞에 쓰지 않습니다.',
          '(B) "안내 데스크 곳곳에서 비밀번호를 받는다"는 뜻이 통하지 않습니다.',
        ],
        hint: '(A)는 "호텔 어디에서나", (B)는 "안내 데스크에서"라는 뜻입니다.',
        explain: '(A) 호텔 **곳곳에서** → **throughout**, (B) 안내 데스크라는 **한 지점** → **at**. "호텔 어디에서나 무료 와이파이를 쓸 수 있고, 비밀번호는 안내 데스크에서 받을 수 있습니다."',
      },
      {
        id: 'a6', level: 3, type: 'short', check: 'text', concept: 4,
        q: '빈칸에 뒤의 and와 짝을 이루는 상관접속사 한 낱말을 쓰십시오.\n\nThe new safety rule applies to ___ full-time and part-time workers.',
        answer: ['both'],
        hint: '상관접속사의 짝(both … and, either … or, neither … nor)을 떠올려 보십시오.',
        wrong: [
          { a: 'either', why: 'either는 or와 짝을 이룹니다. 문장에는 and가 있습니다.' },
          { a: 'all', why: 'all은 상관접속사가 아닙니다. A and B 두 쪽을 묶는 짝은 both입니다.' },
        ],
        explain: '뒤에 **and**가 있으므로 짝은 **both**입니다. both A and B: "새 안전 규칙은 정규직과 시간제 직원 모두에게 적용됩니다."',
      },
    ],

    deeper: [
      {
        title: '전치사도 되고 접속사도 되는 낱말',
        body: 'before, after, until, since는 **전치사로도, 접속사로도** 씁니다. 그래서 이 낱말이 보기에 있으면 뒤에 명사가 오든 문장이 오든 들어갈 수 있습니다.\n\n' +
          '| 낱말 | 전치사 (+ 명사) | 접속사 (+ 주어 + 동사) |\n|---|---|---|\n' +
          '| before | **before** the meeting | **before** the meeting starts |\n' +
          '| after | **after** lunch | **after** we have lunch |\n' +
          '| until | **until** Friday | **until** the manager returns |\n' +
          '| since | **since** 2020 (~ 이후로) | **since** the store opened (~ 이후로) / **since** it is late (~이므로) |\n\n' +
          '반대로 during, despite, because of는 전치사로만, while, although, because는 접속사로만 씁니다. 토익의 함정은 대부분 이 "한쪽으로만 쓰는 낱말"에서 나옵니다.',
      },
      {
        title: '뜻이 같은 짝을 더 넓혀 보기',
        body: '전치사·접속사 짝은 실제 업무 글에서 더 많은 표현으로 나옵니다. 판별법(뒤에 동사가 있는가)은 똑같이 씁니다.\n\n' +
          '- 원인: **due to, owing to, on account of** (전치사) / **since, as, now that** (접속사)\n' +
          '- 양보: **in spite of, notwithstanding** (전치사) / **even though, even if, though** (접속사)\n' +
          '- 조건: **in case of** (전치사: ~의 경우에) / **in case, as long as** (접속사)\n\n' +
          '예: The flight was delayed **due to** fog. / The flight was delayed **since** there was fog.\n\n' +
          '다음 단원에서는 문장 안에서 명사 노릇을 하는 절(that절, what절, whether절)과 명사를 꾸미는 관계사절을 배웁니다. 그때도 "뒤가 완전한 문장인가"를 따지는 생각이 그대로 쓰입니다.',
      },
    ],

    faq: [
      {
        q: 'by랑 until은 둘 다 "~까지"인데 어떻게 골라요?',
        a: '앞의 동작을 보십시오. 제출하다·끝내다·도착하다처럼 한 번 하면 끝나는 일이면 마감의 by, 머무르다·기다리다·유효하다처럼 그때까지 이어지는 일이면 계속의 until입니다. "그때까지 계속 ~하다"라고 말해 보아 자연스러우면 until입니다.',
      },
      {
        q: 'despite of라고 쓰면 안 돼요?',
        a: '안 됩니다. despite는 그 자체로 전치사라서 of를 붙이지 않습니다. of가 들어가는 것은 in spite of입니다. despite the rain = in spite of the rain으로 기억하십시오.',
      },
      {
        q: '빈칸 뒤에 -ing이 오면 전치사예요, 접속사예요?',
        a: '대개는 전치사입니다. 동명사는 명사처럼 쓰이므로 despite having, because of being처럼 전치사 뒤에 옵니다. 다만 접속사 while, when은 while waiting처럼 주어와 be동사를 줄인 꼴로 -ing이 오기도 하고, before, after는 전치사로도 쓰여 before leaving처럼 -ing이 옵니다. 보기에 이런 낱말이 있으면 뜻까지 함께 확인하십시오.',
      },
    ],

    mistakes: [
      '전치사 뒤에 주어 + 동사를 쓰는 실수 — **despite** it rained ✕ → **although** it rained ✓ / **despite** the rain ✓',
      '숫자 기간 앞에 during을 쓰는 실수 — **during** two weeks ✕ → **for** two weeks ✓ (during the holiday ✓)',
      '마감에 until을 쓰는 실수 — submit the form **until** Friday ✕ → submit the form **by** Friday ✓',
    ],

    gens: [
      {
        id: 'prep-or-conj',
        level: 1,
        title: '전치사와 접속사 구별하기',
        make: function (R) {
          var it = R.pick(PC);
          var start = it[0].indexOf('___') === 0;
          var show = function (w) { return start ? cap(w) : w; };
          var correct = it[1];
          var partner = PARTNER[correct];
          var others = OTHER[it[2]];
          var isPrep = !!PREP[correct];
          var why = {};
          why[show(partner)] = isPrep
            ? '접속사 ' + partner + ' 뒤에는 주어 + 동사가 와야 합니다. 빈칸 뒤에는 시제가 있는 동사가 없는 명사(구)만 있습니다.'
            : '전치사 ' + partner + ' 뒤에는 명사(구)만 옵니다. 빈칸 뒤에는 주어 + 동사가 있습니다.';
          others.forEach(function (w) {
            why[show(w)] = w + '의 뜻은 "' + MEANING[w] + '"라서 문장의 흐름과 맞지 않습니다.';
          });
          var pick = R.choices(show(correct), [show(partner), show(others[0]), show(others[1])]);
          return {
            type: 'choice', concept: 3,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === show(correct) ? '' : why[c] || ''; }),
            explain: '빈칸 뒤에 ' + (isPrep ? '명사(구)만 있으므로 전치사' : '주어 + 동사가 있으므로 접속사') + '가 와야 하고, 뜻이 "' + MEANING[correct] + '"이므로 ' + correct + '입니다.\n\n' + bold(it[0], show(correct)) + '\n\n' + it[3],
          };
        },
      },
      {
        id: 'correlative',
        level: 1,
        title: '상관접속사의 짝 맞추기',
        make: function (R) {
          var it = R.pick(CORR);
          var p = PAIRS[it[0]];
          var firstBlank = R.bool();
          var start = it[1].indexOf('{1}') === 0;
          var showA = function (w) { return start ? cap(w) : w; };
          var sentence, correct, wrongs, why = {}, shown;
          if (firstBlank) {
            correct = showA(p.a);
            shown = p.b;
            sentence = it[1].replace('{1}', '___').replace('{2}', p.b);
            wrongs = PAIRS.filter(function (x) { return x !== p; }).map(function (x) {
              why[showA(x.a)] = x.pat + ' 꼴이라 짝이 맞지 않습니다. 이 문장에 이미 있는 낱말은 ' + shown + '입니다.';
              return showA(x.a);
            });
          } else {
            correct = p.b;
            shown = showA(p.a);
            sentence = it[1].replace('{1}', showA(p.a)).replace('{2}', '___');
            wrongs = PAIRS.filter(function (x) { return x !== p; }).map(function (x) {
              why[x.b] = x.pat + ' 꼴이라 짝이 맞지 않습니다. 이 문장에 이미 있는 낱말은 ' + shown + '입니다.';
              return x.b;
            });
          }
          var pick = R.choices(correct, wrongs);
          return {
            type: 'choice', concept: 4,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + sentence,
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : why[c] || ''; }),
            explain: '문장에 ' + shown + ' 낱말이 있으므로 짝은 **' + p.pat + '**(' + p.mean + ')입니다.\n\n' +
              it[1].replace('{1}', '**' + showA(p.a) + '**').replace('{2}', '**' + p.b + '**') + '\n\n' + it[2],
          };
        },
      },
      {
        id: 'by-until',
        level: 2,
        title: 'by와 until 구별하기',
        make: function (R) {
          var it = R.pick(BYU);
          var correct = it[1];
          var why = {};
          why[correct === 'by' ? 'until' : 'by'] = correct === 'by'
            ? 'until은 그때까지 계속 이어지는 일에 씁니다. ' + it[2] + '는 한 번 하면 끝나는 일이라 마감의 by를 씁니다.'
            : 'by는 한 번에 끝내는 일의 마감입니다. ' + it[2] + '는 그때까지 계속 이어지는 일이라 until을 씁니다.';
          why.within = 'within 뒤에는 three days처럼 기간의 길이가 옵니다. 빈칸 뒤는 한 시점입니다.';
          var pick = R.choices(correct, [correct === 'by' ? 'until' : 'by', 'within'], 3);
          return {
            type: 'choice', concept: 0,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : why[c] || ''; }),
            explain: it[2] + (correct === 'by' ? '는 한 번 하면 끝나는 일이므로 마감을 뜻하는 by를 씁니다.' : '는 그때까지 계속 이어지는 일이므로 until을 씁니다.') +
              '\n\n' + bold(it[0], correct) + '\n\n' + it[3],
          };
        },
      },
    ],

    vocab: [
      { w: 'deadline', m: '마감 기한', ex: 'The deadline for the essay is next Monday.', exm: '에세이 마감은 다음 주 월요일입니다.' },
      { w: 'submit', m: '제출하다', ex: 'Please submit your homework by Friday.', exm: '금요일까지 숙제를 제출하십시오.' },
      { w: 'valid', m: '유효한', ex: 'This ticket is valid until Sunday.', exm: '이 표는 일요일까지 유효합니다.' },
      { w: 'within', m: '~ 이내에, ~ 안에', ex: 'We will call you back within an hour.', exm: '한 시간 안에 다시 전화드리겠습니다.' },
      { w: 'throughout', m: '~ 곳곳에, ~ 내내', ex: 'It rained throughout the weekend.', exm: '주말 내내 비가 왔습니다.' },
      { w: 'across', m: '가로질러, 건너편에', ex: 'There is a bakery across the street.', exm: '길 건너편에 빵집이 있습니다.' },
      { w: 'despite', m: '~에도 불구하고', ex: 'Despite the cold, the children played outside.', exm: '추운데도 아이들은 밖에서 놀았습니다.' },
      { w: 'although', m: '비록 ~이지만', ex: 'Although the room was small, it was very clean.', exm: '방은 작았지만 아주 깨끗했습니다.' },
      { w: 'due to', m: '~ 때문에', ex: 'The game was delayed due to rain.', exm: '경기는 비 때문에 늦어졌습니다.' },
      { w: 'unless', m: '~하지 않으면', ex: 'You will be late unless you leave now.', exm: '지금 출발하지 않으면 늦을 것입니다.' },
      { w: 'provided that', m: '~라면, ~라는 조건으로', ex: 'You may borrow my bike provided that you return it today.', exm: '오늘 돌려준다면 내 자전거를 빌려 가도 됩니다.' },
      { w: 'as soon as', m: '~하자마자', ex: 'Call me as soon as you get home.', exm: '집에 도착하자마자 전화해 주십시오.' },
      { w: 'entrance', m: '입구', ex: 'Let us meet at the main entrance.', exm: '정문 입구에서 만납시다.' },
      { w: 'renovation', m: '보수, 개조 공사', ex: 'The library is closed for renovation.', exm: '도서관은 보수 공사로 문을 닫았습니다.' },
    ],
  });
})();
