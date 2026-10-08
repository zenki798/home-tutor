/* 공인영어시험 기초 (토익형) · to부정사·동명사·분사
 * 예문·지문은 모두 직접 쓴 문장이다(가상의 회사·인물). */
(function () {
  // 목적어 꼴 생성기: [빈칸 문장, 동사, 'to'|'ing', 동사원형, -ing 꼴, 과거·과거분사 꼴, 뜻]
  var OBJ = [
    ['The marketing team plans ___ the new campaign in May.', 'plan', 'to', 'launch', 'launching', 'launched', '마케팅팀은 5월에 새 캠페인을 시작할 계획입니다.'],
    ['The board decided ___ the factory in Ulsan.', 'decide', 'to', 'expand', 'expanding', 'expanded', '이사회는 울산 공장을 넓히기로 결정했습니다.'],
    ['We hope ___ the contract by the end of the month.', 'hope', 'to', 'sign', 'signing', 'signed', '우리는 이달 말까지 계약을 맺기를 바랍니다.'],
    ['The supplier agreed ___ its prices by five percent.', 'agree', 'to', 'lower', 'lowering', 'lowered', '공급업체는 가격을 5퍼센트 낮추기로 동의했습니다.'],
    ['Ms. Jang promised ___ the report before noon.', 'promise', 'to', 'send', 'sending', 'sent', '장 씨는 정오 전에 보고서를 보내겠다고 약속했습니다.'],
    ['The hotel offered ___ our room for free.', 'offer', 'to', 'upgrade', 'upgrading', 'upgraded', '호텔은 우리 객실을 무료로 한 등급 올려 주겠다고 했습니다.'],
    ['The customer refused ___ the late delivery fee.', 'refuse', 'to', 'pay', 'paying', 'paid', '고객은 늦은 배송 요금을 내기를 거절했습니다.'],
    ['Many small shops failed ___ the new rules on time.', 'fail', 'to', 'follow', 'following', 'followed', '많은 작은 가게가 새 규칙을 제때 따르지 못했습니다.'],
    ['The city expects ___ the new bridge next spring.', 'expect', 'to', 'complete', 'completing', 'completed', '시는 내년 봄에 새 다리를 완공할 것으로 예상합니다.'],
    ['Our company aims ___ its online sales this year.', 'aim', 'to', 'double', 'doubling', 'doubled', '우리 회사는 올해 온라인 매출을 두 배로 늘리는 것이 목표입니다.'],
    ['Mr. Seo wants ___ the meeting to Thursday.', 'want', 'to', 'move', 'moving', 'moved', '서 씨는 회의를 목요일로 옮기고 싶어 합니다.'],
    ['The manager is considering ___ two more cashiers.', 'consider', 'ing', 'hire', 'hiring', 'hired', '관리자는 계산원을 두 명 더 뽑는 것을 고려하고 있습니다.'],
    ['Please avoid ___ your car near the main gate.', 'avoid', 'ing', 'park', 'parking', 'parked', '정문 근처에 차를 세우지 마십시오.'],
    ['The consultant suggested ___ the prices of older models.', 'suggest', 'ing', 'reduce', 'reducing', 'reduced', '컨설턴트는 예전 모델의 가격을 내리자고 제안했습니다.'],
    ['The engineers finished ___ the machines at 6 p.m.', 'finish', 'ing', 'repair', 'repairing', 'repaired', '기술자들은 오후 6시에 기계 수리를 마쳤습니다.'],
    ['We have postponed ___ the new branch until June.', 'postpone', 'ing', 'open', 'opening', 'opened', '우리는 새 지점 개점을 6월로 미루었습니다.'],
    ['Would you mind ___ the door for me?', 'mind', 'ing', 'close', 'closing', 'closed', '문을 좀 닫아 주시겠습니까?'],
    ['The staff enjoyed ___ with the new design team.', 'enjoy', 'ing', 'work', 'working', 'worked', '직원들은 새 디자인팀과 일하는 것을 즐겼습니다.'],
    ['The trainer recommended ___ for ten minutes before each workout.', 'recommend', 'ing', 'stretch', 'stretching', 'stretched', '트레이너는 운동할 때마다 먼저 10분 동안 몸을 풀라고 권했습니다.'],
    ['The store has delayed ___ the new menu.', 'delay', 'ing', 'introduce', 'introducing', 'introduced', '그 가게는 새 메뉴를 내놓는 것을 늦추었습니다.'],
    ['The factory will discontinue ___ the old model next year.', 'discontinue', 'ing', 'produce', 'producing', 'produced', '공장은 내년에 예전 모델 생산을 중단할 것입니다.'],
  ];

  // 분사 수식 생성기: [빈칸 문장, 동사원형, 현재분사, 과거분사, 'ing'|'ed', 꾸밈받는 명사, 근거 문장, 뜻]
  var PART = [
    ['Please read the ___ file before the meeting.', 'attach', 'attaching', 'attached', 'ed', 'file', 'The file is attached.(파일이 첨부된다)', '회의 전에 첨부 파일을 읽어 주십시오.'],
    ['The company is entering a ___ market in Vietnam.', 'grow', 'growing', 'grown', 'ing', 'market', 'The market grows.(시장이 성장한다)', '그 회사는 베트남의 성장하는 시장에 들어가고 있습니다.'],
    ['Please fill out the ___ form and return it by Friday.', 'enclose', 'enclosing', 'enclosed', 'ed', 'form', 'The form is enclosed.(서식이 동봉된다)', '동봉된 서식을 작성해 금요일까지 돌려보내 주십시오.'],
    ['All ___ tickets will be sold at the door.', 'remain', 'remaining', 'remained', 'ing', 'tickets', 'The tickets remain.(표가 남아 있다)', '남은 표는 모두 입구에서 판매됩니다.'],
    ['We sent the ___ schedule to all speakers.', 'revise', 'revising', 'revised', 'ed', 'schedule', 'The schedule was revised.(일정이 수정되었다)', '우리는 수정된 일정을 모든 발표자에게 보냈습니다.'],
    ['Our ___ customers will get a free upgrade.', 'exist', 'existing', 'existed', 'ing', 'customers', 'The customers exist.(고객이 이미 있다)', '기존 고객은 무료 업그레이드를 받습니다.'],
    ['Please check the ___ list of speakers on our website.', 'update', 'updating', 'updated', 'ed', 'list', 'The list was updated.(목록이 갱신되었다)', '웹사이트에서 갱신된 발표자 목록을 확인해 주십시오.'],
    ['Mr. Park works for a ___ maker of solar panels.', 'lead', 'leading', 'led', 'ing', 'maker', 'The maker leads the market.(그 회사가 시장을 이끈다)', '박 씨는 태양광 패널을 만드는 선도 기업에서 일합니다.'],
    ['Prices are going up because of ___ fuel costs.', 'rise', 'rising', 'risen', 'ing', 'costs', 'The costs rise.(비용이 오른다)', '오르는 연료비 때문에 가격이 오르고 있습니다.'],
    ['The items ___ last week will be shipped tomorrow morning.', 'order', 'ordering', 'ordered', 'ed', 'items', 'The items were ordered.(물건이 주문되었다)', '지난주에 주문된 물건은 내일 아침에 발송됩니다.'],
    ['Employees ___ to join the workshop should sign up today.', 'wish', 'wishing', 'wished', 'ing', 'Employees', 'The employees wish to join.(직원이 참가하기를 바란다)', '워크숍에 참가하고 싶은 직원은 오늘 신청해야 합니다.'],
    ['The documents ___ to this e-mail include the price list.', 'attach', 'attaching', 'attached', 'ed', 'documents', 'The documents are attached.(서류가 첨부된다)', '이 이메일에 첨부된 서류에는 가격표가 들어 있습니다.'],
    ['Customers ___ the store before noon will get a small gift.', 'visit', 'visiting', 'visited', 'ing', 'Customers', 'The customers visit the store.(고객이 가게를 방문한다)', '정오 전에 가게를 방문하는 고객은 작은 선물을 받습니다.'],
    ['The report ___ by the finance team was very clear.', 'prepare', 'preparing', 'prepared', 'ed', 'report', 'The report was prepared.(보고서가 작성되었다)', '재무팀이 작성한 보고서는 매우 명확했습니다.'],
    ['The survey ___ last month showed high satisfaction.', 'conduct', 'conducting', 'conducted', 'ed', 'survey', 'The survey was conducted.(설문 조사가 실시되었다)', '지난달 실시한 설문 조사는 높은 만족도를 보여 주었습니다.'],
    ['Visitors ___ in the lobby must wear a name tag.', 'wait', 'waiting', 'waited', 'ing', 'Visitors', 'The visitors wait.(방문객이 기다린다)', '로비에서 기다리는 방문객은 이름표를 달아야 합니다.'],
  ];

  // 감정 분사 생성기: [빈칸 문장, 동사원형, -ing, -ed, 'ing'|'ed', 감정의 주인/원인 설명, 뜻]
  var FEEL = [
    ['The results of the survey were ___, so the team will try a new plan.', 'disappoint', 'disappointing', 'disappointed', 'ing', '결과(results)가 실망을 일으키는 쪽', '설문 결과가 실망스러워서 팀은 새 계획을 시도할 것입니다.'],
    ['Many customers were ___ with the quick service.', 'satisfy', 'satisfying', 'satisfied', 'ed', '고객(customers)이 만족을 느끼는 쪽', '많은 고객이 빠른 서비스에 만족했습니다.'],
    ['The seminar was so ___ that nobody left early.', 'interest', 'interesting', 'interested', 'ing', '세미나(seminar)가 흥미를 일으키는 쪽', '세미나가 너무 흥미로워서 아무도 일찍 나가지 않았습니다.'],
    ['Several staff members were ___ about the new rules.', 'confuse', 'confusing', 'confused', 'ed', '직원(staff members)이 혼란을 느끼는 쪽', '몇몇 직원이 새 규칙에 대해 혼란스러워했습니다.'],
    ['The instructions in the old manual were ___.', 'confuse', 'confusing', 'confused', 'ing', '설명(instructions)이 혼란을 일으키는 쪽', '예전 설명서의 안내는 헷갈렸습니다.'],
    ['We are ___ to announce the opening of our new store.', 'please', 'pleasing', 'pleased', 'ed', '우리(We)가 기쁨을 느끼는 쪽', '새 매장의 개점을 알려 드리게 되어 기쁩니다.'],
    ['Everyone was ___ by the sudden change in the schedule.', 'surprise', 'surprising', 'surprised', 'ed', '모두(Everyone)가 놀람을 느끼는 쪽', '모두가 갑작스러운 일정 변경에 놀랐습니다.'],
    ['Ms. Choi is ___ in working at our overseas office.', 'interest', 'interesting', 'interested', 'ed', '최 씨(Ms. Choi)가 관심을 느끼는 쪽', '최 씨는 우리 해외 사무소에서 일하는 데 관심이 있습니다.'],
    ['The whole team was ___ about the company trip.', 'excite', 'exciting', 'excited', 'ed', '팀(team)이 설렘을 느끼는 쪽', '팀 전체가 회사 여행에 들떠 있었습니다.'],
    ['Winning the award was an ___ moment for the company.', 'excite', 'exciting', 'excited', 'ing', '순간(moment)이 설렘을 일으키는 쪽', '그 상을 받은 것은 회사에 신나는 순간이었습니다.'],
    ['The customer was ___ because the order arrived late.', 'disappoint', 'disappointing', 'disappointed', 'ed', '고객(customer)이 실망을 느끼는 쪽', '주문품이 늦게 와서 고객은 실망했습니다.'],
    ['Finishing the project on time was a very ___ experience.', 'satisfy', 'satisfying', 'satisfied', 'ing', '경험(experience)이 만족을 일으키는 쪽', '프로젝트를 제때 끝낸 것은 매우 만족스러운 경험이었습니다.'],
    ['The long wait at the counter was ___ for everyone.', 'tire', 'tiring', 'tired', 'ing', '기다림(wait)이 피곤함을 일으키는 쪽', '창구에서 오래 기다리는 것은 모두에게 피곤한 일이었습니다.'],
    ['After the long flight, the speakers were very ___.', 'tire', 'tiring', 'tired', 'ed', '발표자(speakers)가 피곤함을 느끼는 쪽', '긴 비행 뒤라 발표자들은 매우 피곤했습니다.'],
    ['The sales figures for the first quarter were ___.', 'surprise', 'surprising', 'surprised', 'ing', '매출 수치(figures)가 놀람을 일으키는 쪽', '1분기 매출 수치는 놀라웠습니다.'],
  ];

  function bold(sentence, word) {
    return sentence.replace('___', '**' + word + '**');
  }

  Tutor.registerUnit({
    id: 'eng-u-toeic-05',
    course: 'eng-u-toeic',
    title: 'to부정사·동명사·분사',
    summary: 'to부정사와 동명사를 목적어로 받는 동사, 전치사 뒤 동명사, 명사를 꾸미는 분사를 구별합니다.',
    goals: [
      '동사에 따라 목적어로 to부정사를 쓸지 동명사를 쓸지 고를 수 있다.',
      '전치사 to 뒤에 동명사를 쓰고, 목적을 나타내는 to부정사(in order to)를 알맞게 쓸 수 있다.',
      '명사를 꾸미는 현재분사와 과거분사, 감정을 나타내는 -ing과 -ed를 구별할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: 'to부정사를 목적어로 받는 동사',
        body: '동사 뒤에 "무엇을 하기를"이라는 동작이 목적어로 올 때, 어떤 동사는 **to부정사(to + 동사원형)**만 받고 어떤 동사는 **동명사(동사원형 + -ing)**만 받습니다. 토익은 이 짝을 자주 묻습니다.\n\n' +
          'to부정사를 받는 동사는 대체로 **아직 하지 않은, 앞으로 할 일**(계획·결심·바람·약속)을 말합니다.\n\n' +
          '| 갈래 | 동사 |\n|---|---|\n' +
          '| 계획·결정 | plan, decide, aim |\n' +
          '| 바람·기대 | hope, want, wish, expect |\n' +
          '| 동의·약속·제안 | agree, promise, offer |\n' +
          '| 거절·실패 | refuse, fail |\n\n' +
          '- We **plan to open** a new office in March. (3월에 새 사무실을 열 계획입니다.)\n' +
          '- The supplier **agreed to lower** its prices. (공급업체는 가격을 낮추기로 동의했습니다.)\n\n' +
          '> ⚠️ decide opening (×) → decide **to open** (○). to 뒤에는 늘 동사원형이 옵니다: agree to lowering (×)',
        easy: 'to부정사의 to를 "→ 화살표"라고 생각해 보십시오. 화살표는 아직 가지 않은 곳, 곧 **앞으로 할 일**을 가리킵니다.\n\n' +
          'plan(계획하다) → 할 일, hope(바라다) → 할 일, decide(결정하다) → 할 일, agree(동의하다) → 할 일. 모두 앞으로의 일을 말하므로 화살표 to가 붙습니다. 예: We hope **to see** you soon.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nMr. Han hopes ___ the project by June.',
          choices: ['finishing', 'to finish', 'finish'],
          answer: 1,
          why: [
            'hope는 동명사가 아니라 to부정사를 목적어로 받습니다. 바라는 일은 앞으로 할 일이기 때문입니다.',
            '',
            '동사 hopes 뒤에 또 다른 동사원형을 바로 붙일 수 없습니다. to를 붙여 to부정사로 씁니다.',
          ],
          explain: 'hope는 to부정사를 목적어로 받는 동사입니다. 그래서 hopes **to finish**(끝내기를 바란다)가 맞습니다.',
        },
      },
      {
        title: '동명사를 목적어로 받는 동사',
        body: '**consider, avoid, suggest, finish** 같은 동사는 목적어로 **동명사(-ing)**를 받습니다. 동명사는 "~하는 것"이라는 **일 자체**를 명사처럼 가리킵니다.\n\n' +
          '| 동사 | 뜻 | 예 |\n|---|---|---|\n' +
          '| consider | 고려하다 | We are **considering moving** the office. |\n' +
          '| avoid | 피하다 | Please **avoid parking** near the gate. |\n' +
          '| suggest, recommend | 제안하다, 권하다 | She **suggested hiring** more staff. |\n' +
          '| finish | 끝내다 | They **finished painting** the lobby. |\n' +
          '| postpone, delay | 미루다, 늦추다 | We **postponed opening** the store. |\n' +
          '| mind, enjoy, keep | 꺼리다, 즐기다, 계속하다 | Would you **mind waiting** a moment? |\n\n' +
          '> ⚠️ suggest to hire (×) → suggest **hiring** (○). suggest 뒤에 to부정사를 쓰는 실수가 아주 흔합니다.\n\n' +
          '> 💡 begin, start, continue는 to부정사와 동명사를 모두 받고 뜻도 거의 같습니다. 반면 stop, remember, forget, try는 둘 다 받지만 뜻이 달라집니다(심화 학습 참고).',
        easy: '동명사는 "~하는 것"이라는 이름표를 단 명사입니다. 이 동사들은 그 일을 **탁자 위에 올려놓고 다루는** 느낌입니다.\n\n' +
          '- 탁자 위의 일을 따져 보기: consider(고려), suggest(제안)\n- 탁자 위의 일을 치우거나 미루기: avoid(피함), postpone(미룸)\n- 하던 일을 마치기: finish(끝냄)\n\n이렇게 이미 눈앞에 놓인 일을 다루는 동사는 -ing 꼴을 받습니다.',
        check: {
          type: 'ox',
          q: '다음 문장은 어법에 맞습니다.\n\nWe should avoid to make the same mistake again.',
          answer: false,
          explain: 'avoid는 동명사를 목적어로 받습니다. We should avoid **making** the same mistake again.(같은 실수를 되풀이하지 않아야 합니다)로 고칩니다.',
        },
      },
      {
        title: '전치사 to 뒤의 동명사',
        body: 'to가 늘 to부정사의 to인 것은 아닙니다. **전치사 to** 뒤에는 명사나 동명사가 오므로, 동작을 쓰려면 **-ing 꼴**로 씁니다.\n\n' +
          '| 표현 | 뜻 |\n|---|---|\n' +
          '| look forward to -ing | ~하기를 고대하다 |\n' +
          '| be committed to -ing | ~하는 데 전념하다 |\n' +
          '| be dedicated to -ing | ~하는 데 헌신하다 |\n' +
          '| contribute to -ing | ~하는 데 이바지하다 |\n' +
          '| object to -ing | ~하는 것에 반대하다 |\n' +
          '| be used to -ing | ~하는 데 익숙하다 |\n\n' +
          '- We **look forward to working** with you. (함께 일하기를 고대합니다.)\n' +
          '- Our company **is committed to reducing** waste. (우리 회사는 쓰레기를 줄이는 데 힘쓰고 있습니다.)\n\n' +
          '**판별법**: to 뒤에 명사를 넣어 보십시오. look forward to **the meeting**처럼 명사가 자연스럽게 들어가면 그 to는 전치사이고, 동작은 -ing으로 씁니다.\n\n' +
          '> ⚠️ be used to -ing(~에 익숙하다)와 used to + 동사원형(예전에 ~하곤 했다)은 다른 표현입니다.',
        easy: 'to에는 두 얼굴이 있습니다. 하나는 화살표 to(to부정사, 뒤에 동사원형), 다른 하나는 길 안내 to(전치사, 뒤에 명사)입니다.\n\n' +
          '길 안내 to 뒤에는 "장소나 물건 이름"처럼 명사만 올 수 있습니다. 그래서 동작을 넣으려면 동작에 이름표(-ing)를 붙여 명사로 만들어야 합니다. look forward to **seeing** you.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nWe look forward to ___ your reply.',
          choices: ['receive', 'received', 'receiving'],
          answer: 2,
          why: [
            'look forward to의 to는 전치사입니다. 전치사 뒤에는 동사원형이 아니라 동명사를 씁니다.',
            '과거분사는 전치사의 목적어가 될 수 없습니다. "받는 것"이라는 뜻의 동명사가 필요합니다.',
            '',
          ],
          explain: 'look forward to the meeting처럼 to 뒤에 명사가 오므로 이 to는 전치사입니다. 동작은 동명사 **receiving**으로 씁니다. "답장을 받기를 고대합니다."',
        },
      },
      {
        title: '목적을 나타내는 to부정사',
        body: 'to부정사는 "**~하기 위해**"라는 **목적**도 나타냅니다. 목적임을 더 분명히 하려면 **in order to**나 **so as to**를 씁니다. 모두 뒤에 **동사원형**이 옵니다.\n\n' +
          '- Please arrive early **(in order) to get** a good seat. (좋은 자리를 잡으려면 일찍 오십시오.)\n' +
          '- We hired two more workers **so as to meet** the deadline. (마감을 지키려고 두 명을 더 뽑았습니다.)\n' +
          '- **To apply**, fill out the online form. (지원하려면 온라인 서식을 작성하십시오.)\n\n' +
          '마지막 예처럼 **To + 동사원형, 완전한 문장** 꼴은 "~하려면, ~하십시오"라는 안내문에 아주 자주 나옵니다.\n\n' +
          '부정은 to 앞에 not을 둡니다: **in order not to** miss the bus, **so as not to** wake the baby\n\n' +
          '> ⚠️ in order to 뒤에 -ing을 쓰지 않습니다: in order to reducing (×) → in order to **reduce** (○)',
        easy: '목적의 to부정사도 화살표입니다. "일찍 출발했다 → 기차를 타려고"처럼, 앞의 행동이 어디를 향하는지 화살표로 가리킵니다.\n\n' +
          'in order to는 그 화살표를 굵게 그린 것이라고 생각하면 됩니다. 뜻은 같고 "목적"이라는 것이 더 분명해집니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nWe hired two more workers in order ___ the deadline.',
          choices: ['meeting', 'meet', 'to meet'],
          answer: 2,
          why: [
            'in order 뒤에는 to + 동사원형이 와야 합니다. in order meeting이라는 꼴은 없습니다.',
            'to가 빠졌습니다. 목적을 나타낼 때는 in order to + 동사원형입니다.',
            '',
          ],
          explain: '"마감을 지키기 위해"라는 목적이므로 in order **to meet** the deadline입니다. in order to 뒤에는 동사원형을 씁니다.',
        },
      },
      {
        title: '명사를 꾸미는 현재분사와 과거분사',
        body: '**분사**는 형용사처럼 명사를 꾸밉니다. 꾸밈받는 명사가 그 동작을 **스스로 하면 현재분사(-ing)**, 동작을 **받으면 과거분사(-ed 등)**를 씁니다.\n\n' +
          '| 꼴 | 관계 | 예 |\n|---|---|---|\n' +
          '| 현재분사 | 능동·진행 | a **growing** market (시장이 성장한다) / the **remaining** seats (자리가 남아 있다) |\n' +
          '| 과거분사 | 수동·완료 | the **attached** file (파일이 첨부된다) / a **revised** schedule (일정이 수정되었다) |\n\n' +
          '**판별법**: 꾸밈받는 명사를 주어로 놓고 문장을 만들어 보십시오. The market grows.(능동) → growing, The file is attached.(수동) → attached\n\n' +
          '분사가 다른 말과 덩어리를 이루면 **명사 뒤**에서 꾸밉니다.\n' +
          '- the documents **attached to this e-mail** (이 이메일에 첨부된 서류)\n' +
          '- employees **wishing to join** the workshop (워크숍에 참가하고 싶은 직원)\n\n' +
          '> 💡 exist, remain, rise처럼 목적어를 받지 않는 동사는 수동태가 없습니다. 그래서 명사를 꾸밀 때 **existing** customers, **rising** costs처럼 -ing을 씁니다(existed customers ×).',
        easy: '분사를 고를 때는 명사에게 "네가 하는 거야, 당하는 거야?"라고 물어보십시오.\n\n' +
          '- 시장(market)은 스스로 자랍니다 → a grow**ing** market\n- 파일(file)은 스스로 붙지 않고 누군가가 붙입니다 → the attach**ed** file\n\n스스로 하면 -ing, 누가 해 주면 -ed입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nPlease see the ___ document for details.',
          choices: ['attaching', 'attached', 'attach'],
          answer: 1,
          why: [
            '서류가 무언가를 첨부하는 것이 아니라, 서류가 첨부되는 것입니다. 수동이므로 과거분사를 씁니다.',
            '',
            '관사 the와 명사 document 사이에는 명사를 꾸미는 말이 와야 합니다. 동사원형은 명사를 꾸미지 못합니다.',
          ],
          explain: 'The document is attached.(서류가 첨부된다)처럼 서류는 동작을 받는 쪽입니다. 그래서 과거분사 **attached**를 씁니다. "자세한 내용은 첨부 서류를 보십시오."',
        },
      },
      {
        title: '감정을 나타내는 분사',
        body: 'interest, satisfy, disappoint, surprise, confuse 같은 동사는 "(누구에게) 감정을 **일으키다**"라는 뜻입니다. 그래서 분사로 쓸 때 다음과 같이 나뉩니다.\n\n' +
          '- 감정을 **일으키는 쪽**(주로 일·물건): **-ing** → The seminar was **interesting**. (세미나가 흥미로웠다)\n' +
          '- 감정을 **느끼는 쪽**(주로 사람): **-ed** → I was **interested** in the seminar. (나는 세미나에 관심이 있었다)\n\n' +
          '| 일으키는 쪽 | 느끼는 쪽 |\n|---|---|\n' +
          '| interesting (흥미로운) | interested in (관심 있는) |\n' +
          '| satisfying (만족스러운) | satisfied with (만족한) |\n' +
          '| disappointing (실망스러운) | disappointed (실망한) |\n' +
          '| confusing (헷갈리게 하는) | confused (혼란스러운) |\n' +
          '| exciting (신나는) | excited about (들뜬) |\n\n' +
          '> ⚠️ 사람이라고 늘 -ed는 아닙니다. 사람이 남에게 감정을 일으키면 -ing입니다. The speaker was **boring**.(연사가 지루했다 = 듣는 사람을 지루하게 했다)',
        easy: '-ing은 감정을 "주는" 쪽, -ed는 감정을 "받는" 쪽입니다.\n\n' +
          '재미있는 영화가 관객에게 재미를 줍니다 → an interest**ing** movie\n관객은 재미를 받습니다 → interest**ed** people\n\n"누가 누구에게 감정을 주었나?"를 먼저 따져 보십시오.',
        check: {
          type: 'ox',
          q: '다음 문장은 어법에 맞습니다.\n\nThe customers were satisfying with the fast delivery.',
          answer: false,
          explain: '고객은 만족을 **느끼는** 쪽이므로 과거분사를 씁니다. The customers were **satisfied** with the fast delivery.(고객들은 빠른 배송에 만족했습니다)',
        },
      },
    ],

    examples: [
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\nOur company has decided ___ a second factory next year.\n\n(A) build (B) building (C) to build (D) built',
        steps: [
          '보기가 모두 build의 여러 꼴이므로, 빈칸 앞 동사가 무엇을 목적어로 받는지 봅니다.',
          '빈칸 앞 동사는 decide입니다. decide는 앞으로 할 일을 정하는 동사라서 to부정사를 목적어로 받습니다.',
          '동사원형(A)은 decided 뒤에 바로 붙을 수 없고, 동명사(B)는 decide와 짝이 아니며, 과거분사(D)는 목적어가 될 수 없습니다.',
          '정답은 (C)입니다. "우리 회사는 내년에 두 번째 공장을 짓기로 결정했습니다."',
        ],
        answer: '(C) to build',
      },
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\nThank you for your order. We look forward to ___ you again.\n\n(A) serve (B) serving (C) served (D) be served',
        steps: [
          'to 뒤의 빈칸이라 to부정사(동사원형)를 먼저 떠올리기 쉽습니다. 하지만 look forward to는 따로 외워 둔 표현입니다.',
          'to 뒤에 명사를 넣어 봅니다: We look forward to the meeting. 자연스럽습니다. 그러니 이 to는 전치사입니다.',
          '전치사 뒤에는 동명사가 오므로 (B) serving이 알맞습니다.',
        ],
        answer: '(B) serving',
      },
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\nMost guests were very ___ with the new room design.\n\n(A) satisfy (B) satisfying (C) satisfied (D) satisfies',
        steps: [
          'be동사 were와 very 뒤이므로 형용사 노릇을 하는 분사 자리입니다. 동사원형(A)과 3인칭 단수 동사(D)는 빠집니다.',
          '감정을 느끼는 쪽은 손님(guests)입니다. 느끼는 쪽에는 -ed를 씁니다.',
          '뒤의 with도 단서입니다. be satisfied with(~에 만족하다)는 한 덩어리로 자주 쓰입니다.',
        ],
        answer: '(C) satisfied',
      },
    ],

    terms: [
      { term: 'to부정사', def: 'to + 동사원형 꼴입니다. 명사(~하는 것)·형용사(~할)·부사(~하기 위해) 역할을 합니다. 예: We plan to open a store.' },
      { term: '동명사', def: '동사원형에 -ing을 붙여 "~하는 것"이라는 명사처럼 쓰는 꼴입니다. 동사나 전치사의 목적어가 됩니다. 예: She finished writing the report.' },
      { term: '분사', def: '동사를 형용사처럼 쓰는 꼴로, 현재분사(-ing)와 과거분사(-ed 등)가 있습니다. 명사를 꾸미거나 보어가 됩니다.' },
      { term: '현재분사', def: '동사원형 + -ing 꼴의 분사입니다. 꾸밈받는 명사가 스스로 하는 동작(능동·진행)을 나타냅니다. 예: a growing market' },
      { term: '과거분사', def: '동사의 -ed 꼴(불규칙 동사는 따로 정해진 꼴)의 분사입니다. 꾸밈받는 명사가 받는 동작(수동·완료)을 나타냅니다. 예: the attached file' },
      { term: '목적어', def: '동사나 전치사의 대상이 되는 말입니다. 예: We avoid making mistakes.에서 making mistakes' },
      { term: '전치사 to', def: '"~에, ~으로"를 뜻하며 뒤에 명사나 동명사가 오는 to입니다. 예: look forward to seeing you' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe two companies agreed ___ their research data.',
        choices: ['sharing', 'to share', 'share', 'shared'],
        answer: 1,
        why: [
          'agree는 동명사가 아니라 to부정사를 목적어로 받습니다.',
          '',
          '동사 agreed 뒤에 동사원형을 바로 붙일 수 없습니다. to를 붙입니다.',
          '과거분사는 동사의 목적어가 될 수 없습니다.',
        ],
        explain: 'agree는 "앞으로 ~하기로 동의하다"라는 뜻으로 to부정사를 받습니다. agreed **to share**: 두 회사는 연구 자료를 공유하기로 합의했습니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nHave you considered ___ a larger meeting room?',
        choices: ['to book', 'book', 'booking', 'booked'],
        answer: 2,
        why: [
          'consider는 to부정사가 아니라 동명사를 목적어로 받습니다.',
          '동사 considered 뒤에 동사원형을 바로 붙일 수 없습니다.',
          '',
          '과거분사 booked는 considered의 목적어가 될 수 없습니다. 목적어 자리에는 동명사가 와야 합니다.',
        ],
        explain: 'consider는 동명사를 목적어로 받는 동사입니다. considered **booking**: 더 큰 회의실을 예약하는 것을 생각해 보셨습니까?',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'text', concept: 1,
        q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 쓰십시오.\n\nThe workers finished (paint) the lobby on Tuesday.',
        answer: ['painting'],
        wrong: [
          { a: 'to paint', why: 'finish는 to부정사를 받지 않습니다. 하던 일을 끝내는 동사이므로 동명사를 씁니다.' },
          { a: 'painted', why: '이 문장의 동사는 이미 finished입니다. 그 목적어 자리에는 동명사가 와야 합니다.' },
        ],
        explain: 'finish는 동명사를 목적어로 받습니다. finished **painting** the lobby: 작업자들은 화요일에 로비 칠하기를 끝냈습니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 2,
        q: '다음 문장은 어법에 맞습니다.\n\nOur team is committed to provide the best service.',
        answer: false,
        explain: 'be committed to의 to는 전치사입니다(be committed to quality처럼 명사가 올 수 있습니다). 그래서 동명사를 써서 is committed to **providing** the best service로 고칩니다. "우리 팀은 최고의 서비스를 제공하는 데 힘씁니다."',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\n___ a refund, please contact our customer service team.',
        choices: ['Request', 'To request', 'Requested', 'For request'],
        answer: 1,
        why: [
          'Request로 시작하면 명령문 두 개(Request …, please contact …)를 접속사 없이 쉼표로만 이은 꼴이 됩니다.',
          '',
          '과거분사는 "요청된"이라는 수동의 뜻이 되어, 환불을 요청하는 사람(you)과 맞지 않습니다.',
          '전치사 for 뒤에는 동사원형이 올 수 없습니다. 목적은 to부정사로 나타냅니다.',
        ],
        explain: '"환불을 요청하려면"이라는 목적이므로 **To request**를 씁니다. To + 동사원형, 완전한 문장(please contact …)은 안내문에서 아주 흔한 꼴입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nOur ___ customers will receive a 10% discount.',
        choices: ['existed', 'exist', 'existence', 'existing'],
        answer: 3,
        why: [
          'exist는 목적어를 받지 않는 동사라서 수동의 뜻인 과거분사로 명사를 꾸미지 않습니다.',
          '동사원형은 명사를 꾸밀 수 없습니다.',
          'existence(존재)는 명사라서 our existence customers는 뜻이 통하지 않습니다.',
          '',
        ],
        explain: '고객이 "이미 있는" 것이므로 능동의 현재분사 **existing**을 씁니다. existing customers는 "기존 고객"이라는 뜻으로 토익에 자주 나옵니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 5,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe results of the test were ___, so the engineers changed the design.',
        choices: ['disappointed', 'disappointing', 'disappoint'],
        answer: 1,
        why: [
          '결과(results)는 실망을 느낄 수 없습니다. 실망을 느끼는 쪽에 쓰는 -ed는 맞지 않습니다.',
          '',
          'be동사 were 뒤에 동사원형을 쓸 수 없습니다.',
        ],
        explain: '결과가 기술자들에게 실망을 **일으킨** 것이므로 **disappointing**입니다. "시험 결과가 실망스러워서 기술자들이 설계를 바꾸었습니다."',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'text', concept: 1,
        q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 쓰십시오.\n\nAfter the long discussion, the manager suggested (hold) the next meeting online.',
        answer: ['holding'],
        hint: 'suggest가 어떤 꼴을 목적어로 받는지 떠올려 보십시오.',
        wrong: [
          { a: 'to hold', why: 'suggest는 to부정사를 목적어로 받지 않습니다. 동명사를 씁니다(또는 that절).' },
          { a: 'hold', why: '동사 suggested 뒤에 동사원형을 바로 붙일 수 없습니다. 동명사로 바꿉니다.' },
        ],
        explain: 'suggest는 동명사를 목적어로 받습니다. suggested **holding** the next meeting online: 관리자는 다음 회의를 온라인으로 하자고 제안했습니다.',
      },
      {
        id: 'p9', level: 2, type: 'order', concept: 2,
        q: '낱말 덩어리를 바른 순서로 놓아 문장을 완성하십시오.\n\n(뜻: 귀하와 함께 일하기를 고대합니다.)',
        choices: ['to working', 'We', 'with you', 'look forward'],
        answer: [1, 3, 0, 2],
        explain: 'We / look forward / to working / with you. — look forward to의 to는 전치사라서 뒤에 동명사 working이 옵니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe documents ___ to this e-mail contain the final price list.',
        choices: ['are attached', 'attaching', 'attached', 'attach'],
        answer: 2,
        why: [
          '문장의 동사는 contain입니다. are attached를 넣으면 접속사 없이 동사가 둘이 됩니다.',
          '서류는 첨부하는 쪽이 아니라 첨부되는 쪽입니다. 능동의 현재분사는 맞지 않습니다.',
          '',
          'attach를 동사로 넣으면 contain과 함께 동사가 둘이 됩니다.',
        ],
        hint: '이 문장의 진짜 동사를 먼저 찾아보십시오.',
        explain: '문장의 동사는 contain이고, 빈칸부터 e-mail까지는 The documents를 뒤에서 꾸미는 덩어리입니다. 서류는 첨부되는 것이므로 과거분사 **attached**를 씁니다. "이 이메일에 첨부된 서류에 최종 가격표가 들어 있습니다."',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nPlease turn off your phone in order ___ the other guests.',
        choices: ['to disturb', 'not to disturb', 'to not disturbing', 'not disturbing'],
        answer: 1,
        why: [
          '뜻이 "다른 손님을 방해하기 위해"가 되어 거꾸로입니다. 부정어 not이 필요합니다.',
          '',
          'in order to 뒤에는 동사원형이 옵니다. -ing 꼴은 쓸 수 없습니다.',
          'in order 뒤에는 to부정사가 와야 합니다. not disturbing에는 to가 없습니다.',
        ],
        hint: '"방해하지 않기 위해"를 만들려면 not을 어디에 두어야 할까요?',
        explain: '목적의 부정은 in order **not to** + 동사원형입니다. "다른 손님을 방해하지 않도록 휴대 전화를 꺼 주십시오."',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'text', concept: 5,
        q: '괄호 안의 동사를 알맞은 분사로 바꾸어 쓰십시오.\n\nMs. Yoon is (interest) in the marketing position.',
        answer: ['interested'],
        hint: '관심을 느끼는 쪽은 누구입니까?',
        wrong: [{ a: 'interesting', why: '윤 씨는 관심을 느끼는 쪽입니다. 감정을 일으키는 쪽에 쓰는 -ing이 아니라 -ed를 씁니다.' }],
        explain: '윤 씨가 관심을 **느끼는** 쪽이므로 **interested**입니다. be interested in(~에 관심이 있다)으로 함께 익혀 두십시오.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 2,
        q: '밑줄 친 to가 **전치사**로 쓰인 문장은 무엇입니까?',
        choices: [
          'The company plans __to__ hire ten new engineers.',
          'Mr. Lee called the bank __to__ open an account.',
          'Ms. Kim is used __to__ working late on Fridays.',
          'They refused __to__ sign the contract.',
        ],
        answer: 2,
        why: [
          'plan의 목적어가 되는 to부정사의 to입니다. 뒤에 동사원형 hire가 왔습니다.',
          '"계좌를 열려고"라는 목적을 나타내는 to부정사의 to입니다.',
          '',
          'refuse의 목적어가 되는 to부정사의 to입니다.',
        ],
        hint: 'to 뒤에 명사를 넣어도 말이 되는지, 실제로 동명사가 왔는지 보십시오.',
        explain: 'be used to(~에 익숙하다)의 to는 전치사입니다(be used to the noise처럼 명사가 올 수 있습니다). 그래서 뒤에 동명사 working이 왔습니다. 나머지는 모두 to + 동사원형인 to부정사입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 1,
        q: '빈칸 (A), (B)에 들어갈 말을 차례대로 고르십시오.\n\nAfter the delay, the director suggested (A) the product launch, and the team agreed (B) it to May.',
        choices: ['to postpone / moving', 'postponing / moving', 'postponing / to move', 'to postpone / to move'],
        answer: 2,
        why: [
          '두 칸이 모두 거꾸로입니다. suggest는 동명사, agree는 to부정사를 받습니다.',
          '(A)는 맞지만 agree는 동명사가 아니라 to부정사를 받습니다.',
          '',
          '(B)는 맞지만 suggest는 to부정사가 아니라 동명사를 받습니다.',
        ],
        hint: '두 동사를 따로 떼어 각각 무엇을 목적어로 받는지 생각하십시오.',
        explain: 'suggest + 동명사 → suggested **postponing**, agree + to부정사 → agreed **to move**. "지연이 생기자 이사는 제품 출시를 미루자고 제안했고, 팀은 출시를 5월로 옮기는 데 동의했습니다."',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'text', concept: 4,
        q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 한 낱말로 쓰십시오.\n\nThe customer survey (conduct) by our team last month showed high satisfaction.',
        answer: ['conducted'],
        hint: '문장의 동사는 showed입니다. 괄호 부분은 무엇을 꾸밀까요?',
        wrong: [
          { a: 'conducting', why: '설문 조사는 실시하는 쪽이 아니라 실시되는 쪽입니다. 뒤의 by our team도 수동을 알려 줍니다.' },
          { a: 'was conducted', why: '문장의 동사는 이미 showed입니다. 동사를 하나 더 쓸 수 없고, 명사를 꾸미는 분사 한 낱말이 필요합니다.' },
        ],
        explain: '문장의 동사는 showed이고, (conduct) by our team last month는 The customer survey를 뒤에서 꾸밉니다. 설문 조사는 실시되는 것이므로 과거분사 **conducted**입니다. "우리 팀이 지난달 실시한 고객 설문 조사는 높은 만족도를 보여 주었습니다."',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 5,
        q: '어법에 맞는 문장은 무엇입니까?',
        choices: [
          'The new manual was confused, so many workers made mistakes.',
          'The workers were confusing by the new manual.',
          'The new manual made the workers confusing.',
          'The workers found the new manual confusing.',
        ],
        answer: 3,
        why: [
          '설명서(manual)는 혼란을 느끼는 쪽이 아니라 일으키는 쪽입니다. confusing이어야 합니다.',
          '작업자들은 혼란을 느끼는 쪽이고 뒤에 by도 있으므로 confused여야 합니다.',
          'make + 목적어 + 보어에서 보어는 목적어(workers)의 상태입니다. 작업자들이 혼란을 느끼므로 confused여야 합니다.',
          '',
        ],
        hint: '각 문장에서 혼란을 일으키는 쪽과 느끼는 쪽을 먼저 나누어 보십시오.',
        explain: 'find + 목적어 + 보어: 작업자들은 새 설명서가 헷갈린다고 느꼈습니다. 설명서는 혼란을 일으키는 쪽이므로 **confusing**이 맞습니다. 다른 문장은 The new manual was confusing / The workers were confused / made the workers confused로 고쳐야 합니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 3,
        q: '빈칸 (A), (B)에 들어갈 말을 차례대로 고르십시오.\n\nWe are dedicated to (A) safe products. (B) this goal, we test every item twice.',
        choices: ['to make / To reach', 'making / To reach', 'making / Reach', 'to make / Reach'],
        answer: 1,
        why: [
          '(A) be dedicated to의 to는 전치사라서 동명사를 씁니다.',
          '',
          '(B) Reach로 시작하면 명령문과 완전한 문장을 접속사 없이 쉼표로만 이은 꼴이 됩니다. 목적의 To reach가 필요합니다.',
          '(A)와 (B)가 모두 틀렸습니다. 전치사 to 뒤에는 동명사, 목적은 To + 동사원형입니다.',
        ],
        hint: '(A)의 to는 어떤 to입니까? (B)는 "이 목표를 이루기 위해"라는 뜻입니다.',
        explain: '(A) be dedicated to + 동명사 → **making**. (B) "이 목표를 이루기 위해"라는 목적 → **To reach**. "우리는 안전한 제품을 만드는 데 전념합니다. 이 목표를 이루려고 모든 제품을 두 번 시험합니다."',
      },
    ],

    deeper: [
      {
        title: '둘 다 받지만 뜻이 달라지는 동사',
        body: '몇몇 동사는 to부정사와 동명사를 모두 받지만 뜻이 달라집니다. 대체로 **동명사는 이미 한 일**, **to부정사는 앞으로 할 일**을 가리킨다는 원리가 그대로 들어맞습니다.\n\n' +
          '| 동사 | + 동명사 | + to부정사 |\n|---|---|---|\n' +
          '| remember | (예전에) ~한 것을 기억하다 | (잊지 않고) ~할 것을 기억하다 |\n' +
          '| forget | ~한 것을 잊다 | ~할 것을 잊다 |\n' +
          '| regret | ~한 것을 후회하다 | 유감스럽게도 ~하다 |\n' +
          '| try | 시험 삼아 ~해 보다 | ~하려고 애쓰다 |\n' +
          '| stop | ~하는 것을 그만두다 | ~하려고 (하던 일을) 멈추다 |\n\n' +
          '- Please **remember to lock** the door. (잊지 말고 문을 잠그십시오.)\n' +
          '- I **remember meeting** Ms. Ahn at the fair. (박람회에서 안 씨를 만난 것이 기억납니다.)\n' +
          '- We **regret to inform** you that the event has been canceled. (유감스럽게도 행사가 취소되었음을 알려 드립니다.)\n\n' +
          '마지막 문장은 업무 편지의 정해진 표현입니다. 이메일·편지를 읽는 다음 단원들에서 자주 다시 만납니다. stop to의 to는 사실 목적어가 아니라 "~하려고"라는 목적의 to부정사입니다(stop + 목적의 to부정사).',
      },
      {
        title: '보기가 한 동사의 여러 꼴일 때 푸는 차례',
        body: '토익 빈칸 문제에서 보기가 build / building / to build / built처럼 **한 동사의 여러 꼴**이면, 다음 차례로 따지면 대부분 풀립니다.\n\n' +
          '1. **문장에 진짜 동사가 이미 있는지** 봅니다. 있으면 빈칸에는 동사(시제가 있는 꼴)가 올 수 없고, to부정사·동명사·분사 가운데 하나가 옵니다.\n' +
          '2. **빈칸 바로 앞**을 봅니다. 동사(decide, avoid …)면 그 동사가 받는 목적어 꼴을, 전치사(for, by, to …)면 동명사를 고릅니다.\n' +
          '3. **빈칸이 명사를 꾸미면** 명사를 주어로 놓고 능동(-ing)인지 수동(-ed)인지 따집니다. 감정 동사면 감정을 일으키는 쪽인지 느끼는 쪽인지 봅니다.\n' +
          '4. **문장 맨 앞의 빈칸 + 쉼표 + 완전한 문장**이면 "~하려면"이라는 목적의 To + 동사원형일 때가 많습니다.\n\n' +
          '이 차례는 앞 단원(품사 자리 찾기, 수 일치와 능동·수동태)에서 익힌 "자리와 관계를 먼저 본다"는 생각을 그대로 이어 쓴 것입니다.',
      },
    ],

    faq: [
      {
        q: 'to부정사 받는 동사랑 동명사 받는 동사를 다 외워야 해요?',
        a: '시험에 자주 나오는 것은 많지 않습니다. 이 단원의 표에 있는 동사(plan, decide, hope, agree / consider, avoid, suggest, finish 등)부터 예문과 함께 익히십시오. 외울 때는 "to부정사 = 앞으로 할 일, 동명사 = 이미 있는 일"이라는 경향을 떠올리면 덜 헷갈립니다. 다만 경향일 뿐이라 예외도 있으니, 결국은 짝으로 기억하는 것이 가장 확실합니다.',
      },
      {
        q: 'look forward to 다음에 왜 동사원형을 쓰면 안 돼요?',
        a: '그 to가 to부정사의 to가 아니라 전치사이기 때문입니다. look forward to the holiday처럼 명사가 올 수 있다는 것이 증거입니다. 전치사 뒤에는 명사나 동명사만 올 수 있으므로 look forward to **seeing** you라고 씁니다.',
      },
      {
        q: 'interested랑 interesting은 어떻게 구별해요?',
        a: '감정을 일으키는 쪽에는 -ing, 감정을 느끼는 쪽에는 -ed를 씁니다. "그 강의는 흥미롭다"는 강의가 흥미를 일으키므로 The lecture is interesting, "나는 그 강의에 관심이 있다"는 내가 관심을 느끼므로 I am interested in the lecture입니다.',
      },
    ],

    mistakes: [
      '동명사를 받는 동사에 to부정사를 쓰는 실수 — suggest **to hire** ✕ → suggest **hiring** ✓, avoid **to make** ✕ → avoid **making** ✓',
      '전치사 to 뒤에 동사원형을 쓰는 실수 — look forward to **hear** from you ✕ → look forward to **hearing** from you ✓',
      '감정 분사의 -ing과 -ed를 거꾸로 쓰는 실수 — I was **boring** in the meeting(내가 남을 지루하게 했다) ✕ → I was **bored** ✓',
    ],

    gens: [
      {
        id: 'verb-object',
        level: 1,
        title: 'to부정사와 동명사 중 목적어 고르기',
        make: function (R) {
          var it = R.pick(OBJ);
          var toForm = 'to ' + it[3];
          var correct = it[2] === 'to' ? toForm : it[4];
          var why = {};
          if (it[2] === 'to') {
            why[it[4]] = it[1] + ' 동사는 동명사가 아니라 to부정사를 목적어로 받습니다. 앞으로 할 일을 말하는 동사입니다.';
          } else {
            why[toForm] = it[1] + ' 동사는 to부정사가 아니라 동명사를 목적어로 받습니다.';
          }
          why[it[3]] = '동사 뒤에 동사원형을 바로 붙일 수 없습니다. ' + (it[2] === 'to' ? 'to를 붙여 to부정사로 씁니다.' : '-ing을 붙여 동명사로 씁니다.');
          why[it[5]] = '과거형·과거분사는 동사의 목적어가 될 수 없습니다. 목적어 자리에는 ' + (it[2] === 'to' ? 'to부정사' : '동명사') + '가 옵니다.';
          var wrongs = [it[2] === 'to' ? it[4] : toForm, it[3], it[5]];
          var pick = R.choices(correct, wrongs);
          return {
            type: 'choice', concept: it[2] === 'to' ? 0 : 1,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : why[c] || ''; }),
            explain: it[1] + ' 동사는 ' + (it[2] === 'to' ? 'to부정사' : '동명사') + '를 목적어로 받습니다.\n\n' + bold(it[0], correct) + '\n\n' + it[6],
          };
        },
      },
      {
        id: 'participle-modifier',
        level: 2,
        title: '명사를 꾸미는 현재분사·과거분사 고르기',
        make: function (R) {
          var it = R.pick(PART);
          var correct = it[4] === 'ing' ? it[2] : it[3];
          var other = it[4] === 'ing' ? it[3] : it[2];
          var rel = it[4] === 'ing'
            ? '꾸밈받는 ' + it[5] + ' 쪽이 그 동작을 스스로 하는 관계(능동)라서 현재분사를 씁니다.'
            : '꾸밈받는 ' + it[5] + ' 쪽이 그 동작을 받는 관계(수동)라서 과거분사를 씁니다.';
          var why = {};
          why[other] = '능동과 수동을 거꾸로 생각했습니다. ' + rel;
          why[it[1]] = '동사원형은 명사를 꾸밀 수 없고, 이 문장에 동사를 하나 더 넣을 수도 없습니다. 분사로 바꾸어 씁니다.';
          var pick = R.choices(correct, [other, it[1]], 3);
          return {
            type: 'choice', concept: 4,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : why[c] || ''; }),
            explain: '명사를 주어로 놓고 문장을 만들어 보면 ' + it[6] + '입니다. ' + rel + '\n\n' + bold(it[0], correct) + '\n\n' + it[7],
          };
        },
      },
      {
        id: 'feeling-participle',
        level: 2,
        title: '감정을 나타내는 -ing과 -ed 고르기',
        make: function (R) {
          var it = R.pick(FEEL);
          var correct = it[4] === 'ing' ? it[2] : it[3];
          var other = it[4] === 'ing' ? it[3] : it[2];
          var rule = it[4] === 'ing' ? '감정을 일으키는 쪽에는 -ing을 씁니다.' : '감정을 느끼는 쪽에는 -ed를 씁니다.';
          var why = {};
          why[other] = it[5] + '입니다. ' + rule;
          why[it[1]] = '동사원형은 이 자리에 올 수 없습니다. 감정을 나타내는 분사(-ing 또는 -ed)로 바꿉니다.';
          var pick = R.choices(correct, [other, it[1]], 3);
          return {
            type: 'choice', concept: 5,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : why[c] || ''; }),
            explain: it[5] + '입니다. ' + rule + '\n\n' + bold(it[0], correct) + '\n\n' + it[6],
          };
        },
      },
    ],

    vocab: [
      { w: 'attach', m: '붙이다, 첨부하다', ex: 'I attached the photos to the e-mail.', exm: '나는 이메일에 사진을 첨부했습니다.' },
      { w: 'enclose', m: '동봉하다', ex: 'Please enclose a copy of your receipt.', exm: '영수증 사본을 동봉해 주십시오.' },
      { w: 'consider', m: '고려하다', ex: 'We are considering opening a new store.', exm: '우리는 새 가게를 여는 것을 고려하고 있습니다.' },
      { w: 'avoid', m: '피하다', ex: 'Avoid driving downtown during rush hour.', exm: '출퇴근 시간에는 시내 운전을 피하십시오.' },
      { w: 'postpone', m: '미루다, 연기하다', ex: 'The game was postponed because of the rain.', exm: '경기는 비 때문에 연기되었습니다.' },
      { w: 'committed', m: '전념하는, 헌신하는', ex: 'The school is committed to helping every student.', exm: '그 학교는 모든 학생을 돕는 데 힘씁니다.' },
      { w: 'existing', m: '기존의, 현재 있는', ex: 'The new system will replace the existing one.', exm: '새 시스템이 기존 시스템을 대신할 것입니다.' },
      { w: 'remaining', m: '남아 있는', ex: 'The remaining cookies are on the table.', exm: '남은 과자는 탁자 위에 있습니다.' },
      { w: 'revise', m: '수정하다, 고치다', ex: 'Please revise the plan and send it again.', exm: '계획을 고쳐서 다시 보내 주십시오.' },
      { w: 'satisfied', m: '만족한', ex: 'Most guests were satisfied with the food.', exm: '대부분의 손님이 음식에 만족했습니다.' },
      { w: 'confusing', m: '헷갈리게 하는, 혼란스러운', ex: 'The map was confusing, so we got lost.', exm: '지도가 헷갈려서 우리는 길을 잃었습니다.' },
      { w: 'look forward to', m: '~을 고대하다', ex: 'I look forward to meeting you next week.', exm: '다음 주에 뵙기를 고대합니다.' },
      { w: 'in order to', m: '~하기 위해', ex: 'She saved money in order to buy a bike.', exm: '그녀는 자전거를 사려고 돈을 모았습니다.' },
    ],
  });
})();
