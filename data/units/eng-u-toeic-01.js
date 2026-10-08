/* 공인영어시험 기초 (토익형) · 품사 자리 찾기
 * 예문·지문은 모두 직접 쓴 문장이다(가상의 회사·인물). */
(function () {
  // 낱말 가족: [명사, 형용사, 부사, 동사]
  var FAM = {
    expansion: ['expansion', 'expansive', 'expansively', 'expand'],
    decision: ['decision', 'decisive', 'decisively', 'decide'],
    competition: ['competition', 'competitive', 'competitively', 'compete'],
    creation: ['creation', 'creative', 'creatively', 'create'],
    protection: ['protection', 'protective', 'protectively', 'protect'],
    preference: ['preference', 'preferable', 'preferably', 'prefer'],
    reliability: ['reliability', 'reliable', 'reliably', 'rely'],
    persuasion: ['persuasion', 'persuasive', 'persuasively', 'persuade'],
    attraction: ['attraction', 'attractive', 'attractively', 'attract'],
    addition: ['addition', 'additional', 'additionally', 'add'],
    information: ['information', 'informative', 'informatively', 'inform'],
    flexibility: ['flexibility', 'flexible', 'flexibly', 'flex'],
    prosperity: ['prosperity', 'prosperous', 'prosperously', 'prosper'],
    innovation: ['innovation', 'innovative', 'innovatively', 'innovate'],
    significance: ['significance', 'significant', 'significantly', 'signify'],
    extension: ['extension', 'extensive', 'extensively', 'extend'],
    success: ['success', 'successful', 'successfully', 'succeed'],
    clarity: ['clarity', 'clear', 'clearly', 'clarify'],
    production: ['production', 'productive', 'productively', 'produce'],
    beauty: ['beauty', 'beautiful', 'beautifully', 'beautify'],
    simplicity: ['simplicity', 'simple', 'simply', 'simplify'],
    strength: ['strength', 'strong', 'strongly', 'strengthen'],
    width: ['width', 'wide', 'widely', 'widen'],
  };
  var POS_IDX = { n: 0, adjN: 1, adjC: 1, adv: 2 };
  var POS_KEYS = ['n', 'a', 'd', 'v'];
  // 빈칸 자리별로, 다른 품사를 고른 학생에게 보여 줄 이유
  var SLOT_WHY = {
    n: {
      a: '형용사는 명사를 꾸미거나 보어 자리에 옵니다. 관사·소유격·형용사 뒤에서 주어·목적어가 되는 이 빈칸은 명사 자리입니다.',
      d: '부사는 동사·형용사·문장을 꾸밀 뿐, 주어나 목적어가 될 수 없습니다. 이 빈칸은 명사 자리입니다.',
      v: '동사는 관사·소유격·형용사 바로 뒤에 올 수 없습니다. 이 빈칸은 명사 자리입니다.',
    },
    adjN: {
      n: '빈칸 바로 뒤에 꾸밈을 받을 명사가 있습니다. 명사 앞에서 명사를 꾸미는 말은 형용사입니다.',
      d: '부사는 명사를 꾸미지 못합니다. 명사 앞 수식어 자리에는 형용사가 옵니다.',
      v: '동사는 관사(또는 very)와 명사 사이에 올 수 없습니다. 명사를 꾸미는 형용사가 필요합니다.',
    },
    adjC: {
      n: 'be동사·become·remain 뒤에 명사를 쓰면 "주어 = 그 명사"라는 뜻이 됩니다. 이 문장은 주어의 성질·상태를 말하므로 형용사가 알맞습니다.',
      d: '부사는 보어가 될 수 없습니다. be동사·become·remain 뒤 보어 자리에는 형용사가 옵니다.',
      v: '이 문장에는 이미 동사가 있습니다. 그 뒤 보어 자리에는 형용사가 옵니다.',
    },
    adv: {
      n: '주어·동사(필요하면 목적어)가 이미 다 있는 완전한 문장입니다. 더 붙일 수 있는 것은 동사를 꾸미는 부사입니다.',
      a: '형용사는 명사를 꾸미거나 보어가 됩니다. 동사를 꾸미거나 be동사·과거분사 사이에 들어가는 자리에는 부사가 옵니다.',
      v: '이 문장에는 이미 동사가 있습니다. 동사 하나를 더 쓸 수는 없고, 동사를 꾸미는 부사가 필요합니다.',
    },
  };
  var SLOT_NAME = { n: '명사', adjN: '형용사', adjC: '형용사', adv: '부사' };
  var SLOT_CONCEPT = { n: 0, adjN: 1, adjC: 1, adv: 2 };

  // 품사 자리 생성기: [빈칸 문장, 낱말 가족, 자리, 단서, 뜻]
  var WORDFORM = [
    ['The ___ of the factory will create 200 new jobs.', 'expansion', 'n', '관사 The 뒤, 전치사 of 앞 — 문장의 주어 자리', '공장 확장으로 일자리 200개가 새로 생길 것입니다.'],
    ['Ms. Lee made a quick ___ about the budget.', 'decision', 'n', '형용사 quick 뒤 — 동사 made의 목적어 자리', '이 씨는 예산에 관해 빠른 결정을 내렸습니다.'],
    ['Online stores face strong ___ from one another.', 'competition', 'n', '형용사 strong 뒤 — 동사 face의 목적어 자리', '온라인 상점들은 서로 치열한 경쟁을 겪고 있습니다.'],
    ['The ___ of the new logo took three months.', 'creation', 'n', '관사 The 뒤, 전치사 of 앞 — 주어 자리', '새 로고를 만드는 데 석 달이 걸렸습니다.'],
    ['The new law gives stronger ___ to online shoppers.', 'protection', 'n', '형용사 stronger 뒤 — 동사 gives의 목적어 자리', '새 법은 온라인 구매자를 더 강하게 보호합니다.'],
    ['Customers have shown a strong ___ for smaller packages.', 'preference', 'n', '관사 a + 형용사 strong 뒤, 전치사 for 앞', '고객들은 더 작은 포장을 뚜렷하게 선호해 왔습니다.'],
    ['The ___ of the system is our top concern.', 'reliability', 'n', '관사 The 뒤, 전치사 of 앞 — 주어 자리', '시스템의 신뢰성이 우리의 가장 큰 관심사입니다.'],
    ['The sales team gave a very ___ presentation.', 'persuasion', 'adjN', '관사 a + very 뒤, 명사 presentation 앞', '영업팀은 매우 설득력 있는 발표를 했습니다.'],
    ['Please read the ___ guidelines before you start.', 'addition', 'adjN', '관사 the 뒤, 명사 guidelines 앞', '시작하기 전에 추가 지침을 읽어 주십시오.'],
    ['This is an ___ solution to a common problem.', 'innovation', 'adjN', '관사 an 뒤, 명사 solution 앞', '이것은 흔한 문제에 대한 혁신적인 해결책입니다.'],
    ['We had a very ___ meeting this morning.', 'production', 'adjN', '관사 a + very 뒤, 명사 meeting 앞', '오늘 아침 회의는 매우 생산적이었습니다.'],
    ['The hotel has a ___ lobby with large windows.', 'beauty', 'adjN', '관사 a 뒤, 명사 lobby 앞', '그 호텔에는 큰 창이 있는 아름다운 로비가 있습니다.'],
    ['The new design is more ___ than the old one.', 'attraction', 'adjC', 'be동사 is 뒤의 보어 자리(more ~ than)', '새 디자인이 예전 것보다 더 매력적입니다.'],
    ['Our prices remain ___ in the local market.', 'competition', 'adjC', 'remain 뒤의 보어 자리', '우리 가격은 지역 시장에서 여전히 경쟁력이 있습니다.'],
    ['The results of the survey were very ___.', 'information', 'adjC', 'be동사 were + very 뒤의 보어 자리', '설문 조사 결과는 매우 유익했습니다.'],
    ['The schedule for the workshop is ___.', 'flexibility', 'adjC', 'be동사 is 뒤의 보어 자리', '워크숍 일정은 유연하게 조정할 수 있습니다.'],
    ['The small town became ___ after the new port opened.', 'prosperity', 'adjC', 'became 뒤의 보어 자리', '새 항구가 열린 뒤 그 작은 도시는 번영했습니다.'],
    ['For most staff, morning meetings are ___ to evening ones.', 'preference', 'adjC', 'be동사 are 뒤의 보어 자리', '대부분의 직원에게는 아침 회의가 저녁 회의보다 낫습니다.'],
    ['Sales of the new phone increased ___ last quarter.', 'significance', 'adv', '자동사 increased 뒤 — 문장이 이미 완전함', '새 휴대 전화의 판매량이 지난 분기에 크게 늘었습니다.'],
    ['The documents were ___ reviewed by the legal team.', 'extension', 'adv', 'be동사 were, 과거분사 reviewed 사이', '그 서류들은 법무팀이 폭넓게 검토했습니다.'],
    ['The event was ___ organized, and everyone enjoyed it.', 'success', 'adv', 'be동사 was, 과거분사 organized 사이', '행사는 성공적으로 준비되었고 모두가 즐거워했습니다.'],
    ['Mr. Cho ___ explained the new rules to the staff.', 'clarity', 'adv', '주어 Mr. Cho, 동사 explained 사이', '조 씨는 직원들에게 새 규칙을 명확하게 설명했습니다.'],
    ['The team worked ___ during the busy season.', 'production', 'adv', '자동사 worked 뒤 — 문장이 이미 완전함', '그 팀은 바쁜 시기에 생산적으로 일했습니다.'],
    ['The meeting room has been ___ decorated for the party.', 'beauty', 'adv', 'has been, 과거분사 decorated 사이', '회의실이 파티를 위해 아름답게 꾸며졌습니다.'],
    ['The new manual is written ___, so anyone can follow it.', 'simplicity', 'adv', '수동태 is written 뒤 — 문장이 이미 완전함', '새 설명서는 쉽게 쓰여 있어서 누구나 따라 할 수 있습니다.'],
    ['The new software is ___ used in hospitals.', 'width', 'adv', 'be동사 is, 과거분사 used 사이', '그 새 소프트웨어는 병원에서 널리 쓰입니다.'],
    ['Ms. Kang ___ recommends this supplier.', 'strength', 'adv', '주어 Ms. Kang, 동사 recommends 사이', '강 씨는 이 공급업체를 강력히 추천합니다.'],
  ];

  // 비교 생성기
  var COMP = [
    ['This year\'s budget is ___ larger than last year\'s.', '올해 예산은 작년 예산보다 훨씬 많습니다.'],
    ['The new printer is ___ faster than the old one.', '새 프린터는 예전 것보다 훨씬 빠릅니다.'],
    ['Online orders were ___ higher in December than in November.', '12월의 온라인 주문은 11월보다 훨씬 많았습니다.'],
    ['The second training session was ___ more useful than the first.', '두 번째 연수는 첫 번째보다 훨씬 유익했습니다.'],
    ['Shipping by sea is ___ cheaper than shipping by air.', '배로 보내는 것이 비행기로 보내는 것보다 훨씬 쌉니다.'],
    ['The updated app is ___ easier to use than the previous version.', '새로 고친 앱은 이전 버전보다 훨씬 쓰기 쉽습니다.'],
    ['The response this time was ___ better than we expected.', '이번 반응은 우리가 예상한 것보다 훨씬 좋았습니다.'],
    ['Our new office is ___ closer to the subway station than the old one.', '새 사무실은 예전 사무실보다 지하철역에 훨씬 가깝습니다.'],
  ];
  var COMP_OK = ['much', 'even', 'far', 'a lot', 'still'];
  var COMP_WHY = {
    very: 'very는 원급(비교하지 않은 형용사·부사)만 꾸밉니다. 비교급은 much·even·far·still·a lot으로 강조합니다.',
    so: 'so도 원급을 꾸미는 말입니다(so fast). 비교급 앞에는 much·even·far·still·a lot을 씁니다.',
    more: '이미 비교급인 말 앞에 more를 또 쓰면 비교를 두 번 한 꼴이 됩니다.',
  };
  var SUP = [
    ['This is ___ the best offer we have received.', '이것은 우리가 받은 제안 가운데 단연 최고입니다.'],
    ['Ms. Yoon is ___ the most experienced engineer on the team.', '윤 씨는 팀에서 단연 경험이 가장 많은 기술자입니다.'],
    ['July was ___ the busiest month of the year.', '7월은 한 해 가운데 단연 가장 바빴던 달입니다.'],
    ['The downtown branch is ___ the largest of our five branches.', '도심 지점은 다섯 지점 가운데 단연 가장 큽니다.'],
    ['This model is ___ the most popular item in our store.', '이 모델은 우리 가게에서 단연 가장 인기 있는 상품입니다.'],
    ['The new route is ___ the fastest way to the airport.', '새 길은 공항까지 가는 단연 가장 빠른 길입니다.'],
  ];
  var SUP_WHY = {
    very: 'very는 "the + 최상급" 앞에 오지 못합니다(the very best처럼 the 뒤에는 올 수 있습니다). 최상급 앞에서 강조할 때는 by far를 씁니다.',
    so: 'so는 원급을 꾸미는 말입니다. "the + 최상급" 앞에서 강조할 때는 by far를 씁니다.',
    more: '최상급 앞에 more를 붙이면 비교급과 최상급이 겹칩니다.',
  };
  // 원급·비교급·최상급 고르기: [빈칸 문장, 원급, 비교급, 최상급(the 포함), 정답 종류, 단서, 뜻]
  var FORM = [
    ['Our new laptop is ___ than the old model.', 'light', 'lighter', 'the lightest', 'comp', '뒤에 than', '새 노트북은 예전 모델보다 가볍습니다.'],
    ['This is ___ hotel in the city.', 'expensive', 'more expensive', 'the most expensive', 'sup', '빈칸 앞에 관사가 없고 뒤에 in the city(범위)', '이곳은 도시에서 가장 비싼 호텔입니다.'],
    ['The meeting was not as ___ as we feared.', 'long', 'longer', 'the longest', 'pos', 'as ~ as 사이', '회의는 우리가 걱정한 만큼 길지 않았습니다.'],
    ['Delivery is ___ on weekdays than on weekends.', 'fast', 'faster', 'the fastest', 'comp', '뒤에 than', '배송은 주말보다 평일에 더 빠릅니다.'],
    ['Ms. Song is ___ of all the applicants.', 'qualified', 'more qualified', 'the most qualified', 'sup', '뒤에 of all the applicants(범위)', '송 씨는 모든 지원자 가운데 자격을 가장 잘 갖추었습니다.'],
    ['The new chairs are ___ than the old ones.', 'comfortable', 'more comfortable', 'the most comfortable', 'comp', '뒤에 than', '새 의자가 예전 의자보다 더 편안합니다.'],
    ['This is ___ report I have ever read.', 'clear', 'clearer', 'the clearest', 'sup', '빈칸 앞에 관사가 없고 뒤에 I have ever read(지금까지 중에서)', '이것은 내가 지금까지 읽은 보고서 가운데 가장 명확합니다.'],
    ['The second floor is just as ___ as the first floor.', 'quiet', 'quieter', 'the quietest', 'pos', 'as ~ as 사이', '2층도 1층만큼 조용합니다.'],
    ['Prices here are ___ than at the mall.', 'low', 'lower', 'the lowest', 'comp', '뒤에 than', '이곳 가격이 쇼핑몰보다 낮습니다.'],
    ['This year\'s conference was ___ one so far.', 'large', 'larger', 'the largest', 'sup', '빈칸 앞에 관사가 없고 뒤에 so far(지금까지 중에서)', '올해 학술 대회가 지금까지 가운데 가장 컸습니다.'],
    ['The online course is ___ than the classroom course.', 'flexible', 'more flexible', 'the most flexible', 'comp', '뒤에 than', '온라인 강좌가 교실 강좌보다 더 유연합니다.'],
    ['Please send the files as ___ as possible.', 'soon', 'sooner', 'the soonest', 'pos', 'as ~ as possible', '파일을 되도록 빨리 보내 주십시오.'],
  ];
  var FORM_NAME = { pos: '원급', comp: '비교급', sup: '최상급' };
  var FORM_WHY = {
    pos: { comp: 'as ~ as 사이에는 비교급이 아니라 원급을 씁니다.', sup: 'as ~ as 사이에는 최상급이 아니라 원급을 씁니다.' },
    comp: { pos: '뒤에 than이 있으면 비교급을 씁니다.', sup: 'than과 짝을 이루는 것은 최상급이 아니라 비교급입니다.' },
    sup: { pos: '범위(of all ~, in ~, ever, so far)와 함께 "가장 ~한"을 말하는 자리입니다. 최상급을 씁니다.', comp: '비교 대상(than)이 없고 범위 안에서 "가장 ~한"을 말하므로 최상급을 씁니다.' },
  };

  Tutor.registerUnit({
    id: 'eng-u-toeic-01',
    course: 'eng-u-toeic',
    title: '품사 자리 찾기',
    summary: '빈칸에 명사·형용사·부사 중 무엇이 와야 하는지 문장 속 자리와 접미사로 빠르게 판단합니다.',
    goals: [
      '빈칸의 앞뒤를 보고 명사·형용사·부사 자리를 구별할 수 있다.',
      '접미사(-tion, -ment, -ive, -able, -ly 등)로 보기의 품사를 알아볼 수 있다.',
      '비교급·최상급이 들어갈 자리와 알맞은 강조 부사(much, even, by far)를 고를 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '명사 자리',
        body: '품사 문제에서 가장 먼저 볼 것은 **빈칸의 바로 앞과 바로 뒤**입니다. 다음 자리에는 **명사**가 옵니다.\n\n' +
          '| 자리 | 예 |\n|---|---|\n' +
          '| 관사(a, an, the) 뒤 | the **approval** of the plan |\n' +
          '| 소유격(our, your, the company\'s) 뒤 | Thank you for your **cooperation**. |\n' +
          '| 형용사 뒤 | a careful **review** |\n' +
          '| 주어 자리(동사 앞) | **Attendance** is required. |\n' +
          '| 동사의 목적어 | We received your **payment**. |\n' +
          '| 전치사의 목적어 | after the **inspection** |\n\n' +
          '명사는 문장에서 주어·목적어·보어가 되는 말입니다. 관사·소유격은 "곧 명사가 나온다"는 신호이므로, 그 뒤가 비어 있고 다른 명사가 이어지지 않으면 빈칸은 명사 자리입니다.\n\n' +
          '> 💡 관사·소유격 + [빈칸] + 전치사(of, for, in …) 꼴은 거의 언제나 명사 자리입니다. 예: the ___ of the contract',
        easy: '관사(a, the)와 소유격(our, your)을 "명사 전용 좌석 표"라고 생각해 보십시오. 표를 내밀었는데 바로 뒤 좌석이 비어 있다면, 거기 앉을 사람은 명사입니다.\n\n' +
          '예: Thank you for your ___. → your 뒤가 비었고 그 뒤에 아무것도 없습니다. 그러니 명사(cooperation, patience 등)가 들어갑니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nPlease submit your ___ by Friday.',
          choices: ['apply', 'application', 'applicable'],
          answer: 1,
          why: [
            '동사는 소유격 your 바로 뒤에 올 수 없습니다. 소유격 뒤는 명사 자리입니다.',
            '',
            '형용사는 뒤에 꾸밈을 받을 명사가 있어야 합니다. 여기서는 빈칸 뒤에 명사가 없으므로 빈칸 자체가 명사입니다.',
          ],
          explain: '소유격 your 뒤에 빈칸이 있고 그 뒤에는 전치사 by가 이어집니다. 그래서 빈칸은 submit의 목적어인 명사 자리이고, 정답은 명사 **application**(지원서)입니다.',
        },
      },
      {
        title: '형용사 자리',
        body: '**형용사**는 명사의 성질·상태를 나타냅니다. 형용사가 오는 자리는 크게 셋입니다.\n\n' +
          '1. **명사 앞** — 관사·소유격과 명사 사이: a **reliable** supplier, our **annual** report\n' +
          '2. **be동사·become·remain·seem 뒤** (주어를 설명하는 보어): The plan is **feasible**. Prices remained **stable**.\n' +
          '3. **목적어 뒤** (keep·find·make·consider + 목적어 + 형용사): Please keep the information **confidential**. We found the seminar **useful**.\n\n' +
          '2번 자리에는 명사도 올 수 있지만, 그러면 "주어 = 그 명사"라는 뜻이 됩니다. The plan is **success**(계획 = 성공?)처럼 어색해지면 형용사 **successful**을 고릅니다.\n\n' +
          '> ⚠️ 부사는 보어가 될 수 없습니다. The plan is feasibly. (×) → The plan is feasible. (○)',
        easy: '형용사는 명사에 붙이는 "설명 스티커"입니다. 스티커는 명사 바로 앞에 붙이거나(a **useful** tool), be동사 뒤에서 "주어는 이렇다"고 설명합니다(The tool is **useful**).\n\n' +
          '그래서 명사 앞, be·become·remain 뒤가 비어 있으면 먼저 형용사를 떠올리십시오.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe new policy became ___ last month.',
          choices: ['effect', 'effectively', 'effective'],
          answer: 2,
          why: [
            'become 뒤에 명사를 쓰면 "정책 = 효과"라는 뜻이 되어 어색합니다. 주어의 상태를 말하는 형용사가 알맞습니다.',
            '부사는 보어가 될 수 없습니다. become 뒤 보어 자리에는 형용사를 씁니다.',
            '',
          ],
          explain: 'became 뒤는 주어(The new policy)를 설명하는 보어 자리입니다. 형용사 **effective**를 쓰면 "새 정책이 지난달에 시행되었다(효력이 생겼다)"는 뜻이 됩니다.',
        },
      },
      {
        title: '부사 자리',
        body: '**부사**는 동사·형용사·다른 부사·문장 전체를 꾸밉니다. 문장에 꼭 필요한 성분이 아니어서, **빼도 문장이 완전합니다.**\n\n' +
          '| 자리 | 예 |\n|---|---|\n' +
          '| 동사 앞이나 뒤(목적어 뒤) | Sales rose **sharply**. / She **quickly** answered the call. |\n' +
          '| be동사와 -ing·과거분사 사이 | The order was **carefully** packed. / The market is **rapidly** growing. |\n' +
          '| have와 과거분사 사이 | The store has **recently** opened. |\n' +
          '| 형용사·부사 앞 | an **extremely** busy week / **very** quickly |\n' +
          '| 문장 맨 앞(문장 전체) | **Unfortunately**, the flight was canceled. |\n\n' +
          '판단 방법: 빈칸을 지우고 읽어 보십시오. 주어·동사(필요하면 목적어·보어)가 다 갖춰져 문장이 완전하면, 빈칸은 부사 자리입니다.\n\n' +
          '> 💡 be + [빈칸] + 과거분사는 토익에서 아주 자주 나오는 부사 자리입니다.',
        easy: '부사는 요리의 양념과 같습니다. 양념을 빼도 요리(문장)는 이미 완성되어 있습니다. 다만 "어떻게, 얼마나"라는 맛을 더해 줍니다.\n\n' +
          '예: The meeting was ___ canceled. 빈칸을 빼도 The meeting was canceled.(회의가 취소되었다)로 완전합니다. 그러니 빈칸에는 양념인 부사(suddenly)가 들어갑니다.',
        check: {
          type: 'ox',
          q: 'The package was ___ delivered.\n\n빈칸에 알맞은 말은 형용사 safe입니다.',
          answer: false,
          explain: 'be동사 was와 과거분사 delivered 사이는 부사 자리입니다. 빈칸을 빼도 문장이 완전하기 때문입니다. 형용사 safe가 아니라 부사 **safely**를 씁니다.',
        },
      },
      {
        title: '접미사로 품사 알아보기',
        body: '보기 네 개가 같은 낱말 가족(decide, decision, decisive, decisively)일 때는 **낱말 끝(접미사)**으로 품사를 알아봅니다.\n\n' +
          '| 품사 | 대표 접미사 | 예 |\n|---|---|---|\n' +
          '| 명사 | -tion/-sion, -ment, -ness, -ity, -ance/-ence | decision, agreement, awareness, ability, performance |\n' +
          '| 명사(사람) | -er/-or, -ant/-ent, -ee | employer, applicant, trainee |\n' +
          '| 형용사 | -ive, -able/-ible, -ful, -ous, -al, -ic, -less | effective, available, useful, various, financial |\n' +
          '| 부사 | 형용사 + -ly | effectively, carefully |\n' +
          '| 동사 | -ize, -ify, -en | finalize, simplify, widen |\n\n' +
          '> ⚠️ 예외도 꼭 알아 두십시오.\n' +
          '> - **-ly로 끝나는 형용사**: friendly, timely, costly, orderly (명사 + -ly), likely\n' +
          '> - **-al로 끝나는 명사**: approval, proposal, arrival, renewal, rental\n' +
          '> - **-ive로 끝나는 명사**: representative(직원·대표자), executive(임원), objective(목표), alternative(대안)',
        easy: '낱말 끝은 일종의 "이름표"입니다. -tion, -ment가 붙어 있으면 "나는 명사", -ive, -able이면 "나는 형용사", 형용사에 -ly가 붙으면 "나는 부사"라고 알려 줍니다.\n\n' +
          '다만 이름표를 잘못 단 낱말도 몇 개 있습니다. friendly(친절한)는 -ly인데 형용사이고, approval(승인)은 -al인데 명사입니다. 이런 낱말은 따로 외워 둡니다.',
        check: {
          type: 'choice',
          q: '다음 중 **명사**는 무엇입니까?',
          choices: ['agreement', 'agreeable', 'agreeably'],
          answer: 0,
          why: [
            '',
            '형용사입니다. 형용사를 만드는 접미사 -able로 끝납니다(agreeable: 기분 좋은, 받아들일 만한).',
            '-ly는 형용사를 부사로 만드는 접미사입니다(agreeably: 기분 좋게).',
          ],
          explain: '-ment는 명사를 만드는 접미사입니다. **agreement**는 "합의, 계약"이라는 뜻의 명사입니다.',
        },
      },
      {
        title: '비교급·최상급 자리와 강조 부사',
        body: '비교 표현은 **짝이 되는 말**을 보면 자리가 정해집니다.\n\n' +
          '| 단서 | 들어갈 꼴 | 예 |\n|---|---|---|\n' +
          '| 뒤에 than | 비교급(-er, more ~) | Sales were **higher** than expected. |\n' +
          '| the + ___ + of·in·among / ever | 최상급(-est, most ~) | the **largest** of the three offices |\n' +
          '| as + ___ + as | 원급 | as **soon** as possible |\n\n' +
          '비교급과 최상급을 **강조하는 부사**는 정해져 있습니다.\n\n' +
          '- 비교급 강조: **much, even, far, still, a lot** + 비교급 → much **higher**, even **better**\n' +
          '- 최상급 강조: **by far** + the 최상급, the **very** + 최상급 → by far the **best**, the very **best**\n\n' +
          '> ⚠️ very는 원급만 꾸밉니다. very higher (×) → much higher (○)',
        easy: '비교급은 "둘을 저울에 올린 것", 최상급은 "여럿 가운데 1등"입니다. than이 보이면 저울(비교급), of all·in the city·ever가 보이면 1등(최상급)을 떠올리십시오.\n\n' +
          '"훨씬"이라고 강조할 때 very를 쓰고 싶어지지만, 저울 앞에는 much·even·far를 씁니다. 1등을 강조할 때는 by far(단연)를 씁니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nThis year\'s sales were ___ higher than last year\'s.',
          choices: ['very', 'much', 'most'],
          answer: 1,
          why: [
            'very는 원급만 꾸밉니다. 비교급 higher 앞에서는 much·even·far 등을 씁니다.',
            '',
            'most는 최상급을 만드는 말입니다. 이미 비교급인 higher 앞에는 쓸 수 없습니다.',
          ],
          explain: '비교급 higher를 강조하는 자리입니다. 비교급은 much·even·far·still·a lot으로 강조하므로 정답은 **much**입니다.',
        },
      },
    ],

    examples: [
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\nOur company is looking for a ___ supplier of office furniture.\n\n(A) rely (B) reliable (C) reliably (D) reliability',
        steps: [
          '보기가 모두 같은 낱말 가족이므로 품사 문제입니다. 해석보다 자리를 먼저 봅니다.',
          '빈칸 앞에는 관사 a, 뒤에는 명사 supplier가 있습니다. 관사와 명사 사이는 명사를 꾸미는 형용사 자리입니다.',
          '접미사로 품사를 확인합니다: rely(동사), reliable(-able 형용사), reliably(-ly 부사), reliability(-ity 명사).',
          '형용사인 (B)를 넣으면 "믿을 만한 사무용 가구 공급업체"가 되어 뜻도 자연스럽습니다.',
        ],
        answer: '(B) reliable',
      },
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\nThe new procedure has ___ reduced waiting times at the service center.\n\n(A) significance (B) significant (C) significantly (D) signify',
        steps: [
          '빈칸을 지우면 The new procedure has reduced waiting times.(새 절차가 대기 시간을 줄였다)로 이미 완전한 문장입니다.',
          '빈칸은 have(has)와 과거분사 reduced 사이로, 동사를 꾸미는 부사 자리입니다.',
          '-ly로 끝나는 (C)가 부사입니다.',
        ],
        answer: '(C) significantly',
      },
    ],

    terms: [
      { term: '품사', def: '낱말을 문장 속 역할에 따라 나눈 갈래입니다. 명사·동사·형용사·부사·전치사 등이 있습니다.' },
      { term: '명사', def: '사람·사물·생각의 이름입니다. 문장에서 주어·목적어·보어가 됩니다. 예: decision, payment' },
      { term: '형용사', def: '명사의 성질·상태를 나타내며, 명사 앞에서 꾸미거나 be동사 등의 뒤에서 보어가 됩니다. 예: reliable, effective' },
      { term: '부사', def: '동사·형용사·다른 부사·문장 전체를 꾸밉니다. 빼도 문장이 완전합니다. 예: carefully, significantly' },
      { term: '보어', def: '주어나 목적어가 어떤지 설명해 문장을 완성하는 말입니다. 예: The plan is feasible.의 feasible' },
      { term: '접미사', def: '낱말 끝에 붙어 품사나 뜻을 바꾸는 부분입니다. 예: decide → decision(-sion), effective → effectively(-ly)' },
      { term: '비교급', def: '두 대상을 비교할 때 쓰는 꼴입니다. 흔히 than과 함께 씁니다. 예: higher, more useful' },
      { term: '최상급', def: '셋 이상 가운데 "가장 ~한"을 나타내는 꼴입니다. 흔히 the와 범위(of, in, ever)를 함께 씁니다. 예: the highest, the most useful' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nWe appreciate your ___ in the customer survey.',
        choices: ['participate', 'participation', 'participated', 'participatory'],
        answer: 1,
        why: [
          '동사는 소유격 your 바로 뒤에 올 수 없습니다.',
          '',
          '과거형 동사(또는 과거분사)입니다. 소유격 뒤에는 명사가 와야 합니다.',
          '-ory로 끝나는 형용사입니다. 형용사라면 뒤에 꾸밈을 받을 명사가 있어야 하는데, 빈칸 뒤에는 전치사 in이 옵니다.',
        ],
        explain: '소유격 your 뒤, 전치사 in 앞이므로 appreciate의 목적어인 명사 자리입니다. 정답은 -tion으로 끝나는 명사 **participation**(참여)입니다. "고객 설문 조사에 참여해 주셔서 감사합니다."',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe instructions in the manual are very ___.',
        choices: ['clarity', 'clearly', 'clear', 'clarify'],
        answer: 2,
        why: [
          '명사는 very의 꾸밈을 받을 수 없고, "안내 = 명료함"이라는 어색한 뜻이 됩니다.',
          '부사는 be동사 뒤 보어가 될 수 없습니다.',
          '',
          '이 문장에는 이미 동사 are가 있습니다. 동사를 하나 더 쓸 수 없습니다.',
        ],
        explain: 'be동사 are 뒤, very의 꾸밈을 받는 보어 자리이므로 형용사가 옵니다. 정답은 **clear**(명확한)입니다. "설명서의 안내는 매우 명확합니다."',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe technicians ___ checked every machine before the inspection.',
        choices: ['careful', 'carefully', 'care', 'carefulness'],
        answer: 1,
        why: [
          '형용사는 동사를 꾸미지 못합니다. 동사 checked를 꾸미는 말은 부사입니다.',
          '',
          '동사로 보면 동사가 둘(care, checked)이 되고, 명사로 보면 주어 뒤에 명사가 어색하게 겹칩니다.',
          '-ness로 끝나는 명사입니다. 주어와 동사 사이에는 명사가 들어갈 수 없습니다.',
        ],
        explain: '주어 The technicians, 동사 checked 사이에서 동사를 꾸미는 부사 자리입니다. 정답은 **carefully**(꼼꼼하게)입니다. 빈칸을 빼도 문장이 완전하다는 점을 확인하십시오.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 3,
        q: '다음 중 품사가 나머지 셋과 **다른** 하나는 무엇입니까?',
        choices: ['management', 'reduction', 'attractive', 'agreement'],
        answer: 2,
        why: [
          '-ment로 끝나는 명사입니다(관리, 경영진).',
          '-tion으로 끝나는 명사입니다(감소).',
          '',
          '-ment로 끝나는 명사입니다(합의, 계약).',
        ],
        explain: 'management, reduction, agreement는 모두 -ment·-tion으로 끝나는 명사입니다. **attractive**(매력적인)만 -ive로 끝나는 형용사입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe new printer is ___ faster than the old one.',
        choices: ['very', 'more', 'much', 'most'],
        answer: 2,
        why: [
          '원급만 꾸미는 부사입니다. 비교급 faster 앞에는 쓸 수 없습니다.',
          'faster 자체가 이미 비교급입니다. 비교를 두 번 한 꼴이 됩니다.',
          '',
          '최상급을 만드는 말입니다. 비교급 앞에는 쓸 수 없습니다.',
        ],
        explain: '비교급 faster를 "훨씬"이라고 강조하는 자리입니다. 비교급 강조 부사 much·even·far·still·a lot 가운데 하나인 **much**가 정답입니다.',
      },
      {
        id: 'p6', level: 1, type: 'ox', concept: 0,
        q: 'The manager made a quick ___.\n\n이 빈칸은 형용사 quick 뒤에 오는 명사 자리입니다.',
        answer: true,
        explain: '관사 a + 형용사 quick 뒤이고, 빈칸이 made의 목적어가 됩니다. 그래서 명사 자리입니다. 보기에 decide, decision이 있다면 명사 **decision**(결정)을 고릅니다.',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'text', concept: 3,
        q: '형용사 reliable(믿을 만한)의 부사형을 쓰십시오.',
        answer: ['reliably'],
        wrong: [
          { a: 'reliablely', why: '-le로 끝나는 형용사는 끝의 e를 y로 바꿉니다. 예: possible → possibly, reliable → reliably' },
          { a: 'reliability', why: '-ity로 끝나는 명사(신뢰성)입니다. 부사는 형용사에 -ly 꼴을 붙여 만듭니다.' },
        ],
        explain: '-le로 끝나는 형용사는 끝의 e를 y로 바꾸어 부사를 만듭니다. 정답: **reliably**(믿을 수 있게). 같은 예: simple → simply, possible → possibly',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nPlease keep all customer information ___.',
        choices: ['confidentially', 'confidential', 'confidentiality', 'confide'],
        answer: 1,
        why: [
          'keep + 목적어 + [보어] 꼴입니다. 목적어의 상태를 말하는 보어 자리에는 부사가 아니라 형용사가 옵니다.',
          '',
          '명사를 보어로 쓰면 "정보 = 기밀성"이 되어 뜻이 어색합니다. 목적어의 상태는 형용사로 나타냅니다.',
          '이 문장에는 이미 동사 keep이 있습니다. 동사를 하나 더 쓸 수 없습니다.',
        ],
        hint: 'keep 뒤에 목적어가 있고, 빈칸은 그 목적어가 "어떤 상태로" 유지되는지를 말합니다.',
        explain: 'keep + 목적어(all customer information) + 형용사 꼴로 "~을 …한 상태로 유지하다"라는 뜻입니다. 목적어 뒤 보어 자리이므로 정답은 형용사 **confidential**(기밀의)입니다. "모든 고객 정보를 기밀로 유지해 주십시오."',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe renovation project was ___ completed two weeks ahead of schedule.',
        choices: ['success', 'successful', 'succeed', 'successfully'],
        answer: 3,
        why: [
          '명사는 be동사와 과거분사 사이에 들어갈 수 없습니다.',
          '형용사는 과거분사 completed를 꾸미지 못합니다. be동사와 과거분사 사이에는 부사가 옵니다.',
          '이미 was completed라는 동사가 있습니다. 동사를 하나 더 쓸 수 없습니다.',
          '',
        ],
        hint: '빈칸을 지우고 문장을 읽어 보십시오.',
        explain: 'was + [빈칸] + completed 꼴로 be동사와 과거분사 사이입니다. 빈칸을 빼도 문장이 완전하므로 정답은 부사 **successfully**(성공적으로)입니다. "보수 공사는 예정보다 2주 일찍 성공적으로 끝났습니다."',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nOf all the candidates, Ms. Han is ___ qualified for the position.',
        choices: ['more', 'the most', 'much', 'the more'],
        answer: 1,
        why: [
          '비교급은 than 같은 비교 대상과 짝을 이룹니다. Of all the candidates(모든 후보 가운데)는 최상급의 범위입니다.',
          '',
          '비교급을 강조하는 부사입니다. 그 자체로 "가장"이라는 뜻을 만들지 못합니다.',
          'the + 비교급은 "둘 가운데 더 ~한 쪽"이나 "the 비교급, the 비교급" 구문에 씁니다. 여러 후보 가운데 1등은 최상급입니다.',
        ],
        hint: '문장 앞의 Of all the candidates가 단서입니다.',
        explain: 'Of all the candidates(모든 후보 가운데)라는 범위가 있으므로 "가장 ~한"을 나타내는 최상급을 씁니다. 정답: **the most**. "모든 후보 가운데 한 씨가 그 자리에 가장 적격입니다."',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'text', concept: 3,
        q: '빈칸에 동사 approve(승인하다)의 명사형을 쓰십시오.\n\nThe ___ of the budget took two weeks.',
        answer: ['approval'],
        wrong: [
          { a: 'approvement', why: '오늘날 쓰지 않는 꼴입니다. approve의 명사형은 -al로 끝납니다: approval' },
          { a: 'approving', why: '-ing 꼴보다 따로 있는 명사형을 씁니다. approve의 명사형은 -al로 끝나는 approval입니다.' },
        ],
        hint: '-tion이나 -ment가 아니라 -al로 끝나는 명사입니다.',
        explain: '관사 The 뒤, of 앞이므로 명사 자리입니다. approve의 명사형은 **approval**(승인)입니다. proposal, arrival, renewal처럼 -al로 끝나는 명사를 형용사로 착각하지 않도록 주의합니다.',
      },
      {
        id: 'p12', level: 2, type: 'order', concept: 2,
        q: '우리말과 뜻이 같도록 바르게 배열하십시오.\n\n새 시스템은 사용하기가 매우 쉽습니다.',
        choices: ['is', 'extremely', 'The new system', 'to use', 'easy'],
        answer: [2, 0, 1, 4, 3],
        hint: '부사 extremely가 무엇을 꾸미는지 생각해 보십시오.',
        explain: 'The new system is extremely easy to use. — 부사 extremely(매우)는 형용사 easy 바로 앞에서 easy를 꾸밉니다. easy는 be동사 is 뒤의 보어(형용사)이고, to use가 "사용하기에"라는 뜻으로 easy 뒤에 붙습니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe board found the proposal ___ convincing.',
        choices: ['high', 'highly', 'height', 'higher'],
        answer: 1,
        why: [
          '부사로도 쓰이지만 "높이(공간적으로)"라는 뜻입니다(fly high). "매우"라는 정도를 나타내는 부사는 highly입니다.',
          '',
          '명사는 형용사 convincing을 꾸미지 못합니다.',
          '비교급은 than과 함께 쓰는 꼴이고, 형용사 convincing을 꾸미지 못합니다.',
        ],
        hint: 'find + 목적어 + 형용사 꼴입니다. 그러면 빈칸은 그 형용사를 꾸미는 자리입니다.',
        explain: 'found + 목적어(the proposal) + 형용사(convincing) 꼴입니다. 빈칸은 형용사 convincing을 꾸미는 자리이므로 부사가 오고, 정답은 "매우"라는 뜻의 **highly**입니다. "이사회는 그 제안이 매우 설득력 있다고 보았습니다." high(높이)·highly(매우)처럼 -ly가 붙으면 뜻이 달라지는 부사에 주의합니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nFor more information, please contact one of our customer service ___.',
        choices: ['representatives', 'representation', 'represents', 'representatively'],
        answer: 0,
        why: [
          '',
          '명사이지만 "표현, 대표함"이라는 뜻이라 연락할 사람이 될 수 없습니다. 또 one of 뒤에는 복수 명사가 와야 합니다.',
          '동사는 one of our 뒤의 명사 자리에 올 수 없습니다.',
          '부사는 명사 자리에 올 수 없습니다.',
        ],
        hint: 'one of our ___ 는 "우리 ~들 가운데 한 명"이라는 뜻입니다. 연락할 수 있는 사람이어야 합니다.',
        explain: 'one of our + 복수 명사 꼴이므로 명사 자리이고, 연락(contact)할 대상이므로 사람이어야 합니다. 정답은 **representatives**(직원, 담당자)입니다. -ive로 끝나지만 "직원, 대표자"라는 뜻의 명사로도 쓰이는 낱말입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThis quarter\'s profit was ___ the highest in the company\'s history.',
        choices: ['very', 'by far', 'more', 'so'],
        answer: 1,
        why: [
          '"the + 최상급" 앞에는 오지 못합니다. the very highest처럼 the 뒤에 쓰면 맞습니다.',
          '',
          '최상급 앞에 more를 붙이면 비교급과 최상급이 겹칩니다.',
          '원급을 꾸미는 말입니다(so high).',
        ],
        explain: 'the highest는 최상급입니다. "the + 최상급" 앞에서 "단연"이라고 강조하는 말은 **by far**입니다. "이번 분기 이익은 회사 역사상 단연 가장 높았습니다."',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 2,
        q: '어법상 **옳지 않은** 문장은 무엇입니까?',
        choices: [
          'The final report was carefully written.',
          'The results of the test seem positive.',
          'She spoke confident at the meeting.',
          'This is by far the best option we have.',
        ],
        answer: 2,
        why: [
          'be동사와 과거분사 사이에 부사 carefully가 바르게 들어갔습니다. 옳은 문장입니다.',
          'seem 뒤 보어 자리에 형용사 positive가 바르게 쓰였습니다. 옳은 문장입니다.',
          '',
          'by far가 "the + 최상급" 앞에서 바르게 강조하고 있습니다. 옳은 문장입니다.',
        ],
        explain: 'spoke(말했다)는 목적어 없이 쓰인 동사이고, 그 동사를 꾸미는 말이 필요합니다. 형용사 confident가 아니라 부사 **confidently**를 써야 합니다: She spoke confidently at the meeting.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nOur hotel staff are always ___ and helpful.',
        choices: ['friendliness', 'friendly', 'friendship', 'friends'],
        answer: 1,
        why: [
          '-ness로 끝나는 명사입니다. 형용사 helpful과 and로 나란히 이어지는 자리에는 형용사가 와야 합니다.',
          '',
          '-ship으로 끝나는 명사(우정)입니다. be동사 뒤에서 helpful과 나란히 주어의 성질을 말하려면 형용사가 필요합니다.',
          '명사를 쓰면 "직원 = 친구"라는 뜻이 되고, 형용사 helpful과 나란히 놓을 수도 없습니다.',
        ],
        hint: 'and 뒤의 helpful은 어떤 품사입니까? and 앞뒤는 같은 품사로 맞춥니다.',
        explain: 'be동사 뒤 보어 자리이고, and로 형용사 helpful과 나란히 이어집니다. 그래서 정답은 형용사 **friendly**(친절한)입니다. -ly로 끝나지만 명사 friend에 -ly를 붙인 형용사입니다(timely, costly, orderly도 같은 종류).',
      },
    ],

    deeper: [
      {
        title: '품사 문제를 빠르게 푸는 순서',
        body: '공인영어시험의 짧은 빈칸 문제는 한 문제에 쓸 수 있는 시간이 짧습니다. 보기가 같은 낱말 가족이면 다음 순서로 풉니다.\n\n' +
          '1. **보기 훑기** — 보기가 한 낱말의 여러 품사인지 확인합니다. 그렇다면 품사 문제입니다.\n' +
          '2. **빈칸 앞뒤 두세 낱말 보기** — 관사·소유격 뒤인지, 명사 앞인지, be동사 뒤인지, 이미 완전한 문장인지 봅니다.\n' +
          '3. **필요한 품사 정하기** — 명사·형용사·부사 중 하나로 좁힙니다.\n' +
          '4. **접미사로 보기 고르기** — -tion·-ment(명사), -ive·-able(형용사), -ly(부사).\n' +
          '5. **뜻 확인** — 같은 품사가 둘 남으면(representative, representation처럼) 그때 뜻을 따집니다.\n\n' +
          '이 순서는 영어 글을 쓸 때도 그대로 쓰입니다. 보고서나 이메일을 쓰고 나서 "명사 자리에 명사가 왔는가"를 점검하면 자주 나오는 실수를 줄일 수 있습니다.',
      },
      {
        title: '-ly가 붙으면 뜻이 달라지는 부사',
        body: '어떤 낱말은 형용사와 부사의 형태가 같고, -ly를 붙이면 전혀 다른 뜻의 부사가 됩니다.\n\n' +
          '| 형용사·부사 | 뜻 | -ly 부사 | 뜻 |\n|---|---|---|---|\n' +
          '| hard | 열심히, 단단한 | hardly | 거의 ~ 않다 |\n' +
          '| late | 늦게, 늦은 | lately | 최근에 |\n' +
          '| high | 높이, 높은 | highly | 매우 |\n' +
          '| near | 가까이, 가까운 | nearly | 거의 |\n' +
          '| close | 가까이, 가까운 | closely | 면밀히 |\n\n' +
          '예: She works **hard**.(열심히 일한다) / She **hardly** works.(거의 일하지 않는다)\n\n' +
          '이런 낱말은 자리만으로는 답이 갈리지 않으므로 뜻까지 확인해야 합니다.',
      },
    ],

    faq: [
      {
        q: '보기가 모두 같은 낱말 가족이면 해석은 안 해도 되나요?',
        a: '대부분은 빈칸의 자리만 보고도 답이 정해집니다. 그래서 먼저 자리를 보고 품사를 정하는 것이 빠릅니다. 다만 같은 품사가 둘 이상 남으면(representative, representation처럼) 그때는 뜻을 확인해야 합니다.',
      },
      {
        q: '-ly로 끝나면 다 부사인가요?',
        a: '아닙니다. 형용사에 -ly를 붙인 낱말(carefully, quickly)은 부사이지만, 명사에 -ly를 붙인 friendly, timely, costly, orderly 같은 낱말은 형용사입니다. a friendly staff member처럼 명사 앞에 쓰입니다.',
      },
      {
        q: '"훨씬 더 높다"를 very higher라고 쓰면 왜 틀려요?',
        a: 'very는 원급(high, good)만 꾸미는 부사이기 때문입니다. 비교급을 강조할 때는 much, even, far, still, a lot 가운데 하나를 씁니다. 그래서 much higher, even better가 맞습니다. 최상급은 by far the best, the very best처럼 씁니다.',
      },
    ],

    mistakes: [
      'be동사와 과거분사 사이(was ___ completed)에 형용사를 넣는 실수 — 빈칸을 빼도 문장이 완전하면 부사(successfully) 자리입니다.',
      '-al로 끝나는 approval, proposal, arrival을 형용사로 착각하는 실수 — 이 낱말들은 명사입니다. 관사 뒤 명사 자리에 그대로 씁니다.',
      '비교급을 very로 강조하는 실수(very faster) — 비교급은 much·even·far·still·a lot 가운데 하나로 강조합니다.',
    ],

    gens: [
      {
        id: 'word-form',
        level: 1,
        title: '빈칸의 품사 자리 고르기',
        make: function (R) {
          var it = R.pick(WORDFORM);
          var forms = FAM[it[1]];
          var slot = it[2];
          var ci = POS_IDX[slot];
          var correct = forms[ci];
          var reason = {};
          var wrongs = [];
          for (var k = 0; k < 4; k++) {
            if (k === ci) continue;
            reason[forms[k]] = SLOT_WHY[slot][POS_KEYS[k]];
            wrongs.push(forms[k]);
          }
          var pick = R.choices(correct, wrongs, 4);
          return {
            type: 'choice', concept: SLOT_CONCEPT[slot],
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: '단서: ' + it[3] + '. 그래서 빈칸은 ' + SLOT_NAME[slot] + ' 자리입니다. 정답: **' + correct + '**\n\n' +
              it[0].replace('___', '**' + correct + '**') + '\n(' + it[4] + ')',
          };
        },
      },
      {
        id: 'compare',
        level: 2,
        title: '비교급·최상급과 강조 부사',
        make: function (R) {
          var kind = R.pick(['comp', 'sup', 'form', 'form']);
          var it, correct, wrongs, explain;
          var reason = {};
          if (kind === 'comp') {
            it = R.pick(COMP);
            correct = R.pick(COMP_OK);
            wrongs = ['very', 'so', 'more'];
            wrongs.forEach(function (w) { reason[w] = COMP_WHY[w]; });
            explain = '빈칸 뒤가 비교급입니다. 비교급을 "훨씬"이라고 강조할 때는 much·even·far·still·a lot 가운데 하나를 씁니다. 정답: **' + correct + '**';
          } else if (kind === 'sup') {
            it = R.pick(SUP);
            correct = 'by far';
            wrongs = ['very', 'so', 'more'];
            wrongs.forEach(function (w) { reason[w] = SUP_WHY[w]; });
            explain = '빈칸 뒤가 "the + 최상급"입니다. 그 앞에서 "단연"이라고 강조하는 말을 고릅니다. 정답: **by far**';
          } else {
            var f = R.pick(FORM);
            var all = { pos: f[1], comp: f[2], sup: f[3] };
            it = [f[0], f[6]];
            correct = all[f[4]];
            wrongs = [];
            ['pos', 'comp', 'sup'].forEach(function (k) {
              if (k !== f[4]) { wrongs.push(all[k]); reason[all[k]] = FORM_WHY[f[4]][k]; }
            });
            explain = '단서: ' + f[5] + '. 그래서 ' + FORM_NAME[f[4]] + '을 씁니다. 정답: **' + correct + '**';
          }
          var pick = R.choices(correct, wrongs, kind === 'form' ? 3 : 4);
          return {
            type: 'choice', concept: 4,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: explain + '\n\n' + it[0].replace('___', '**' + correct + '**') + '\n(' + it[1] + ')',
          };
        },
      },
    ],

    vocab: [
      { w: 'supplier', m: '공급업체, 공급자', ex: 'We need a new supplier of paper products.', exm: '우리는 종이 제품을 대 줄 새 공급업체가 필요합니다.' },
      { w: 'approval', m: '승인', ex: 'The project is waiting for final approval.', exm: '그 사업은 최종 승인을 기다리고 있습니다.' },
      { w: 'procedure', m: '절차', ex: 'Please follow the safety procedure.', exm: '안전 절차를 따라 주십시오.' },
      { w: 'inspection', m: '점검, 검사', ex: 'The building passed the fire inspection.', exm: '그 건물은 소방 점검을 통과했습니다.' },
      { w: 'renovation', m: '보수, 개조 공사', ex: 'The lobby is closed for renovation.', exm: '로비는 보수 공사로 문을 닫았습니다.' },
      { w: 'confidential', m: '기밀의, 비밀의', ex: 'These documents are strictly confidential.', exm: '이 서류들은 엄격한 기밀입니다.' },
      { w: 'candidate', m: '후보자, 지원자', ex: 'We interviewed five candidates for the job.', exm: '우리는 그 일자리의 지원자 다섯 명을 면접했습니다.' },
      { w: 'qualified', m: '자격을 갖춘, 적격인', ex: 'She is well qualified for the position.', exm: '그녀는 그 직책에 충분히 적격입니다.' },
      { w: 'reliable', m: '믿을 만한', ex: 'The bus service here is very reliable.', exm: '이곳 버스 운행은 매우 믿을 만합니다.' },
      { w: 'significantly', m: '크게, 상당히', ex: 'Costs have risen significantly this year.', exm: '올해 비용이 크게 올랐습니다.' },
      { w: 'representative', m: '직원, 대표자, 담당자', ex: 'A sales representative will call you soon.', exm: '영업 담당자가 곧 전화를 드릴 것입니다.' },
      { w: 'efficient', m: '효율적인', ex: 'The new heater is more efficient than the old one.', exm: '새 난방기는 예전 것보다 더 효율적입니다.' },
      { w: 'participation', m: '참여', ex: 'Thank you for your participation in the event.', exm: '행사에 참여해 주셔서 감사합니다.' },
      { w: 'budget', m: '예산', ex: 'The team stayed within its budget.', exm: '그 팀은 예산 안에서 일을 마쳤습니다.' },
    ],
  });
})();
