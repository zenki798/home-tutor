/* 공인영어시험 기초 (토익형) · 시제와 시간 표현
 * 예문·지문은 모두 직접 쓴 문장이다(가상의 회사·인물). */
(function () {
  // 시간 표현 생성기: [빈칸 문장, { past, perf, fut }, 정답 종류, 단서, 뜻, 개념 카드]
  var TENSE = [
    ['The new branch ___ last spring.', { past: 'opened', perf: 'has opened', fut: 'will open' }, 'past', 'last spring(지난봄)은 이미 끝난 과거 시점', '새 지점은 지난봄에 문을 열었습니다.', 0],
    ['We ___ the shipment two days ago.', { past: 'received', perf: 'have received', fut: 'will receive' }, 'past', 'two days ago(이틀 전)는 이미 끝난 과거 시점', '우리는 이틀 전에 배송품을 받았습니다.', 1],
    ['Ms. Cha ___ the sales team in 2022.', { past: 'joined', perf: 'has joined', fut: 'will join' }, 'past', 'in 2022(2022년에)는 이미 끝난 과거 시점', '차 씨는 2022년에 영업팀에 들어왔습니다.', 1],
    ['Mr. Do ___ his presentation yesterday afternoon.', { past: 'gave', perf: 'has given', fut: 'will give' }, 'past', 'yesterday afternoon(어제 오후)은 이미 끝난 과거 시점', '도 씨는 어제 오후에 발표를 했습니다.', 0],
    ['The company ___ three new products since January.', { past: 'launched', perf: 'has launched', fut: 'will launch' }, 'perf', 'since January(1월부터 지금까지)는 지금까지 이어지는 기간', '그 회사는 1월부터 지금까지 신제품 세 개를 내놓았습니다.', 1],
    ['So far, we ___ more than 300 applications.', { past: 'received', perf: 'have received', fut: 'will receive' }, 'perf', 'So far(지금까지)는 지금까지 이어지는 기간', '지금까지 지원서를 300장 넘게 받았습니다.', 1],
    ['Prices ___ steadily over the past six months.', { past: 'rose', perf: 'have risen', fut: 'will rise' }, 'perf', 'over the past six months(지난 6개월 동안 지금까지)는 지금까지 이어지는 기간', '지난 6개월 동안 가격이 꾸준히 올랐습니다.', 1],
    ['Ms. Jin ___ at this hotel since last Monday.', { past: 'stayed', perf: 'has stayed', fut: 'will stay' }, 'perf', 'since last Monday(지난 월요일부터 지금까지)는 지금까지 이어지는 기간', '진 씨는 지난 월요일부터 이 호텔에 머물고 있습니다.', 1],
    ['The results of the contest ___ next week.', { past: 'were announced', perf: 'have been announced', fut: 'will be announced' }, 'fut', 'next week(다음 주)는 앞으로의 때', '대회 결과는 다음 주에 발표될 것입니다.', 0],
    ['The board ___ the proposal at tomorrow\'s meeting.', { past: 'discussed', perf: 'has discussed', fut: 'will discuss' }, 'fut', 'at tomorrow\'s meeting(내일 회의에서)은 앞으로의 때', '이사회는 내일 회의에서 그 제안을 논의할 것입니다.', 0],
    ['Our new office ___ in two weeks, so we are packing now.', { past: 'opened', perf: 'has opened', fut: 'will open' }, 'fut', 'in two weeks(2주 뒤에)는 앞으로의 때', '우리 새 사무실이 2주 뒤에 문을 열어서 지금 짐을 싸고 있습니다.', 0],
    ['Mr. Ra ___ the client again sometime next month.', { past: 'called', perf: 'has called', fut: 'will call' }, 'fut', 'next month(다음 달)는 앞으로의 때', '라 씨는 다음 달 중에 그 고객에게 다시 전화할 것입니다.', 0],
  ];
  var TENSE_NAME = { past: '과거 시제', perf: '현재완료', fut: '미래 시제(will)' };
  // [고른 오답 종류][정답 종류] → 이유
  var TENSE_WHY = {
    past: {
      perf: '과거 시제는 끝난 시점의 일입니다. since·so far·over the past처럼 지금까지 이어지는 기간이 있으면 현재완료를 씁니다.',
      fut: '과거 시제는 이미 지난 일입니다. 이 문장의 시간 표현은 앞으로의 때를 가리킵니다.',
    },
    perf: {
      past: '현재완료는 yesterday·ago·last ~·in + 지난 연도처럼 끝난 과거 시점을 나타내는 말과 함께 쓰지 않습니다.',
      fut: '현재완료는 과거부터 지금까지의 일입니다. 앞으로의 일은 미래 시제(will)로 씁니다.',
    },
    fut: {
      past: '미래 시제는 앞으로의 일입니다. 이 문장의 시간 표현은 이미 지난 때를 가리킵니다.',
      perf: '미래 시제는 앞으로의 일입니다. 이 문장은 과거부터 지금까지 이어진 일을 말합니다.',
    },
  };

  // 시간·조건 부사절 생성기: [빈칸 문장, 현재 시제(정답), will 꼴, 과거 꼴, 접속사, 뜻]
  var ADV = [
    ['Please call me when the package ___.', 'arrives', 'will arrive', 'arrived', 'when', '소포가 도착하면 제게 전화해 주십시오.'],
    ['I will send you the file as soon as I ___ it.', 'finish', 'will finish', 'finished', 'as soon as', '파일을 다 만들자마자 보내 드리겠습니다.'],
    ['Once the contract ___ signed, we will start the work.', 'is', 'will be', 'was', 'once', '계약서에 서명이 되면 바로 작업을 시작하겠습니다.'],
    ['If you ___ any questions tomorrow, please contact Ms. Ha.', 'have', 'will have', 'had', 'if', '내일 궁금한 것이 있으면 하 씨에게 연락하십시오.'],
    ['We will not start the meeting until everyone ___.', 'arrives', 'will arrive', 'arrived', 'until', '모두 도착할 때까지 회의를 시작하지 않겠습니다.'],
    ['Before you ___ the office tonight, please turn off the lights.', 'leave', 'will leave', 'left', 'before', '오늘 밤 사무실을 나가기 전에 불을 꺼 주십시오.'],
    ['The store will give you a discount if you ___ this coupon next week.', 'show', 'will show', 'showed', 'if', '다음 주에 이 쿠폰을 보여 주면 가게에서 할인해 줄 것입니다.'],
    ['After the new manager ___ next month, the team will be reorganized.', 'arrives', 'will arrive', 'arrived', 'after', '다음 달 새 관리자가 온 뒤에 팀이 다시 짜일 것입니다.'],
    ['Unless the weather ___ better, the outdoor event will be canceled.', 'gets', 'will get', 'got', 'unless', '날씨가 좋아지지 않으면 야외 행사는 취소될 것입니다.'],
    ['By the time the guests ___, the room will be ready.', 'arrive', 'will arrive', 'arrived', 'by the time', '손님들이 도착할 무렵이면 방이 준비되어 있을 것입니다.'],
  ];

  // 미래완료·미래진행 생성기: [빈칸 문장, 정답, [[오답, 종류] ×3], 정답 이유, 뜻]
  var FUT = [
    ['By the end of next month, we ___ the new website.', 'will have launched', [['have launched', 'perf'], ['launched', 'past'], ['launch', 'pres']],
      'by the end of next month(다음 달 말까지)는 미래의 기한입니다. 그때까지 끝나 있을 일은 미래완료(will have + 과거분사)로 씁니다.', '다음 달 말까지는 새 웹사이트를 열어 놓았을 것입니다.'],
    ['By the time you arrive, the meeting ___.', 'will have started', [['has started', 'perf'], ['started', 'past'], ['starts', 'pres']],
      'by the time + 현재 시제(you arrive)는 "네가 도착할 무렵"이라는 미래의 때입니다. 그때까지 이미 일어나 있을 일은 미래완료로 씁니다.', '당신이 도착할 무렵이면 회의는 이미 시작되었을 것입니다.'],
    ['Ms. Bae ___ here for ten years by next April.', 'will have worked', [['has worked', 'perf'], ['worked', 'past'], ['works', 'pres']],
      'by next April(내년 4월)이라는 미래의 한 시점까지 이어져 온 기간(for ten years)을 말합니다. 미래의 한 시점까지 이어진 일은 미래완료로 씁니다.', '내년 4월이면 배 씨가 이곳에서 일한 지 10년이 됩니다.'],
    ['By the end of next year, the city ___ two new subway lines.', 'will have built', [['has built', 'perf'], ['built', 'past'], ['builds', 'pres']],
      'By the end of next year(내년 말까지)는 미래의 기한입니다. 그때까지 끝나 있을 일은 미래완료로 씁니다.', '내년 말까지 시는 새 지하철 노선 두 개를 지어 놓았을 것입니다.'],
    ['At this time tomorrow, I ___ to Jeju.', 'will be flying', [['flew', 'past'], ['have flown', 'perf'], ['was flying', 'pastprog']],
      'At this time tomorrow(내일 이맘때)는 미래의 한 시점입니다. 그때 한창 하고 있을 일은 미래진행(will be + -ing)으로 씁니다.', '내일 이맘때 나는 제주로 가는 비행기 안에 있을 것입니다.'],
    ['Please don\'t call Mr. Gu at 2 p.m. tomorrow. He ___ an interview then.', 'will be conducting', [['conducted', 'past'], ['has conducted', 'perf'], ['was conducting', 'pastprog']],
      'at 2 p.m. tomorrow(내일 오후 2시)는 미래의 한 시점입니다. 그때 한창 하고 있을 일은 미래진행으로 씁니다.', '내일 오후 2시에는 구 씨에게 전화하지 마십시오. 그때 면접을 진행하고 있을 것입니다.'],
    ['Next week at this time, the staff ___ the annual inventory.', 'will be checking', [['checked', 'past'], ['have checked', 'perf'], ['were checking', 'pastprog']],
      'Next week at this time(다음 주 이맘때)은 미래의 한 시점입니다. 그때 한창 하고 있을 일은 미래진행으로 씁니다.', '다음 주 이맘때 직원들은 연례 재고 조사를 하고 있을 것입니다.'],
    ['The crew ___ the road all day next Saturday, so please use another route.', 'will be repairing', [['repaired', 'past'], ['have repaired', 'perf'], ['were repairing', 'pastprog']],
      'all day next Saturday(다음 주 토요일 하루 종일)는 미래의 한 동안입니다. 그동안 계속 하고 있을 일은 미래진행으로 씁니다.', '작업반이 다음 주 토요일 하루 종일 도로를 고치고 있을 테니 다른 길로 다니십시오.'],
  ];
  var FUT_WHY = {
    perf: '현재완료는 과거부터 지금까지의 일입니다. 이 문장은 미래의 한 시점을 기준으로 합니다.',
    past: '과거 시제는 이미 지난 일입니다. 이 문장의 시간 표현은 미래를 가리킵니다.',
    pres: '현재 시제만으로는 미래의 한 시점까지 끝나 있을(이어져 온) 일을 나타내지 못합니다.',
    pastprog: '과거진행은 과거의 한 시점에 하고 있던 일입니다. 이 문장은 미래를 말합니다.',
  };

  // 요구·제안 뒤 that절 생성기: [빈칸 문장, 동사원형(정답), -s 꼴(be면 is), 과거 꼴, 단서 낱말, 뜻]
  var SUBJ = [
    ['The manager recommended that Mr. Ko ___ the report by Friday.', 'submit', 'submits', 'submitted', 'recommended', '관리자는 고 씨에게 금요일까지 보고서를 내라고 권했습니다.'],
    ['The client requested that the delivery date ___ changed.', 'be', 'is', 'was', 'requested', '고객은 배송 날짜를 바꿔 달라고 요청했습니다.'],
    ['Our lawyer recommended that the company ___ the contract again.', 'review', 'reviews', 'reviewed', 'recommended', '우리 변호사는 회사가 계약서를 다시 검토해야 한다고 권했습니다.'],
    ['The safety rules require that every worker ___ a helmet.', 'wear', 'wears', 'wore', 'require', '안전 규칙은 모든 작업자가 안전모를 쓰도록 요구합니다.'],
    ['Ms. Shin demanded that the meeting ___ held in the morning.', 'be', 'is', 'was', 'demanded', '신 씨는 회의를 오전에 열어야 한다고 강하게 요구했습니다.'],
    ['The committee proposed that each team ___ its own budget.', 'manage', 'manages', 'managed', 'proposed', '위원회는 팀마다 자기 예산을 관리하자고 제안했습니다.'],
    ['It is important that every applicant ___ the form in English.', 'complete', 'completes', 'completed', 'It is important', '지원자는 모두 영어로 서식을 작성하는 것이 중요합니다.'],
    ['The director asked that each employee ___ the new rules carefully.', 'follow', 'follows', 'followed', 'asked', '이사는 직원 한 사람 한 사람이 새 규칙을 꼼꼼히 따르라고 요청했습니다.'],
    ['The guide suggested that each tourist ___ comfortable shoes.', 'wear', 'wears', 'wore', 'suggested', '안내원은 관광객마다 편한 신발을 신으라고 제안했습니다.'],
    ['It is essential that the room ___ cleaned before the guests arrive.', 'be', 'is', 'was', 'It is essential', '손님이 오기 전에 방을 반드시 청소해야 합니다.'],
  ];

  Tutor.registerUnit({
    id: 'eng-u-toeic-04',
    course: 'eng-u-toeic',
    title: '시제와 시간 표현',
    summary: '시간 표현을 단서로 알맞은 시제를 고르고, 시간·조건 부사절과 제안 동사 뒤의 동사 형태를 익힙니다.',
    goals: [
      'yesterday, next week, since, by the time 같은 시간 표현을 보고 알맞은 시제를 고를 수 있다.',
      '현재완료와 과거 시제를 구별해 쓸 수 있다.',
      '시간·조건 부사절에서 미래 대신 현재 시제를 쓰고, 미래완료와 미래진행을 구별할 수 있다.',
      '요구·제안 동사 뒤 that절에 동사원형을 쓸 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '시간 표현과 시제의 짝',
        body: '시제 문제는 문장 안의 **시간 표현**이 답을 알려 줍니다. 보기가 한 동사의 여러 시제이면 먼저 시간 표현에 표시를 해 둡니다.\n\n' +
          '| 시간 표현 | 시제 | 예 |\n|---|---|---|\n' +
          '| yesterday, last week, two days ago, in 2023 | 과거 | We **met** the client **yesterday**. |\n' +
          '| every day, usually, always | 현재 | The shop **opens** at 9 **every day**. |\n' +
          '| tomorrow, next week, soon, in two days(이틀 뒤) | 미래 | The results **will be** ready **next week**. |\n' +
          '| since, so far, over the past ~, for + 기간(지금까지) | 현재완료 | We **have used** this system **since** 2020. |\n' +
          '| by the time + 과거 시제 | 과거완료(had + 과거분사) | **By the time** I arrived, the meeting **had started**. |\n' +
          '| by the time + 현재 시제, by + 미래 시점 | 미래완료(will have + 과거분사) | **By the time** you arrive, we **will have finished**. |\n\n' +
          '**by the time**은 "~할 무렵이면 이미"라는 뜻이라 주절에 완료 시제가 옵니다. 뒤의 절이 과거면 과거완료, 현재(실제로는 미래의 일)면 미래완료입니다.\n\n' +
          '> 💡 in + 기간은 "~ 뒤에"라는 미래의 뜻일 때가 많습니다. in two weeks = 2주 뒤에',
        easy: '시간 표현은 시제를 알려 주는 "표지판"입니다. yesterday 표지판이 보이면 과거 길로, next week 표지판이 보이면 미래 길로, since 표지판이 보이면 "과거에서 지금까지 이어진 길"(현재완료)로 갑니다.\n\n' +
          '문제를 풀 때는 문장 안에서 이 표지판부터 찾아 동그라미를 치면 됩니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nOur team ___ the new system next month.',
          choices: ['will test', 'tested', 'has tested'],
          answer: 0,
          why: [
            '',
            '과거 시제는 이미 지난 일입니다. next month(다음 달)는 앞으로의 때입니다.',
            '현재완료는 과거부터 지금까지의 일입니다. next month는 앞으로의 때입니다.',
          ],
          explain: 'next month(다음 달)는 앞으로의 때를 나타내므로 미래 시제 **will test**를 씁니다. "우리 팀은 다음 달에 새 시스템을 시험할 것입니다."',
        },
      },
      {
        title: '현재완료와 과거 시제',
        body: '**과거 시제**는 이미 끝난 과거의 한 시점에 일어난 일입니다. 지금과는 끊어져 있습니다.\n' +
          '**현재완료**(have/has + 과거분사)는 과거에 일어난 일이 **지금과 이어져** 있을 때 씁니다(지금까지 계속, 지금까지의 경험, 막 끝나서 지금 결과가 남음).\n\n' +
          '| 과거 시제와만 쓰는 말 | 현재완료와 자주 쓰는 말 |\n|---|---|\n' +
          '| yesterday, last ~, ~ ago, in + 지난 연도, When ~? | since, for + 기간(지금까지), so far, yet, recently, over the past ~ |\n\n' +
          '- We **launched** the app **last year**. (작년이라는 끝난 시점)\n' +
          '- We **have launched** three apps **since** 2020. (2020년부터 지금까지)\n\n' +
          '> ⚠️ 현재완료는 끝난 과거 시점을 나타내는 말과 함께 쓰지 않습니다. We have launched the app last year. (×) / When have you finished it? (×) → When did you finish it? (○)',
        easy: '과거 시제는 "사진 한 장"이고, 현재완료는 "과거에서 지금까지 이어진 동영상"입니다.\n\n' +
          'last year라는 날짜가 찍힌 사진에는 과거 시제를 씁니다. since 2020처럼 "그때부터 지금까지"를 보여 주는 동영상에는 현재완료를 씁니다.',
        check: {
          type: 'ox',
          q: 'We have opened a new branch in Incheon last year.\n\n이 문장은 어법상 옳습니다.',
          answer: false,
          explain: 'last year(작년)는 끝난 과거 시점이라 현재완료와 함께 쓸 수 없습니다. 바른 문장: We **opened** a new branch in Incheon last year.',
        },
      },
      {
        title: '시간·조건 부사절에서는 현재 시제',
        body: '시간이나 조건을 나타내는 **부사절** 안에서는 앞으로의 일이라도 **will을 쓰지 않고 현재 시제**로 씁니다. 미래라는 것은 주절(will)이 이미 알려 주기 때문입니다.\n\n' +
          '| 갈래 | 접속사 |\n|---|---|\n' +
          '| 시간 | when, before, after, until, as soon as, once, by the time |\n' +
          '| 조건 | if, unless, as long as |\n\n' +
          '- I will call you **when** the package **arrives**. (will arrive ×)\n' +
          '- **If** it **rains** tomorrow, the picnic will be canceled. (will rain ×)\n' +
          '- **Once** the contract **is** signed, we will start. (will be ×)\n\n' +
          '미래완료도 같은 이유로 부사절에서는 현재완료가 됩니다: I will leave **after** I **have finished** the report.\n\n' +
          '> ⚠️ when·if가 이끄는 절이 동사의 목적어(명사절)이면 will을 그대로 씁니다. I don\'t know **when** he **will arrive**.(그가 언제 도착할지) / Please tell me **if** you **will attend**.(참석할지 어떨지)',
        easy: '주절의 will이 "이건 앞으로의 이야기야"라고 이미 알려 줬습니다. 그래서 when·if 쪽에서는 will을 또 쓰지 않고 현재 시제로 가볍게 씁니다.\n\n' +
          '우리말도 "소포가 **도착하면** 전화할게"라고 하지, "도착할 것이면"이라고 하지 않는 것과 비슷합니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nPlease email me as soon as the report ___ ready.',
          choices: ['is', 'will be', 'was'],
          answer: 0,
          why: [
            '',
            'as soon as가 이끄는 시간 부사절 안에서는 앞으로의 일이라도 will을 쓰지 않고 현재 시제를 씁니다.',
            '과거 시제는 이미 지난 일입니다. 보고서가 준비되는 것은 앞으로의 일입니다.',
          ],
          explain: 'as soon as(~하자마자)는 시간 부사절을 이끕니다. 앞으로의 일이라도 현재 시제 **is**를 씁니다. "보고서가 준비되자마자 제게 이메일을 보내 주십시오."',
        },
      },
      {
        title: '미래완료와 미래진행',
        body: '미래의 **한 시점**을 기준으로 그때의 모습을 말하는 시제입니다.\n\n' +
          '| 꼴 | 뜻 | 자주 오는 단서 |\n|---|---|---|\n' +
          '| **미래진행** will be + -ing | 미래의 그 시점에 한창 하고 있을 일 | at this time tomorrow, at 3 p.m. next Monday, all day tomorrow |\n' +
          '| **미래완료** will have + 과거분사 | 미래의 그 시점까지 끝나 있을(이어져 온) 일 | by the end of next month, by the time + 현재 시제, by next April |\n\n' +
          '- **At this time tomorrow**, I **will be flying** to Jeju. (내일 이맘때는 비행 중)\n' +
          '- **By the end of next month**, we **will have completed** the project. (다음 달 말까지는 끝나 있음)\n' +
          '- **By next April**, Ms. Bae **will have worked** here for ten years. (내년 4월이면 10년째)\n\n' +
          '> 💡 by(~까지는, 기한)는 미래완료와, until(~까지 계속)은 계속되는 일과 어울립니다. Submit it **by** Friday. / Stay here **until** Friday.',
        easy: '미래의 어느 순간에 사진을 찍는다고 생각해 보십시오. 그 사진 속에서 한창 무언가를 하고 있으면 미래진행(will be + -ing), 그 사진을 찍을 때 이미 일이 다 끝나 있으면 미래완료(will have + 과거분사)입니다.\n\n' +
          '"내일 이맘때 비행기 안에 있다" → 미래진행, "다음 달 말이면 다 끝나 있다" → 미래완료.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nBy the end of next month, we ___ the project.',
          choices: ['will have completed', 'have completed', 'completed'],
          answer: 0,
          why: [
            '',
            '현재완료는 과거부터 지금까지의 일입니다. by the end of next month는 미래의 기한입니다.',
            '과거 시제는 이미 지난 일입니다. by the end of next month는 미래의 기한입니다.',
          ],
          explain: 'by the end of next month(다음 달 말까지)는 미래의 기한이고, 그때까지 끝나 있을 일이므로 미래완료 **will have completed**를 씁니다. "다음 달 말까지는 그 사업을 끝내 놓았을 것입니다."',
        },
      },
      {
        title: '요구·제안 동사 뒤 that절의 동사원형',
        body: '요구·제안·주장을 나타내는 동사 뒤의 that절에서는 **주어의 수나 주절의 시제와 관계없이 동사원형**을 씁니다.\n\n' +
          '| 갈래 | 낱말 |\n|---|---|\n' +
          '| 요구·제안 동사 | recommend, suggest, request, require, ask, insist, demand, propose |\n' +
          '| 필요를 나타내는 형용사 (It is ~ that) | important, essential, necessary, vital |\n\n' +
          '- The manager **recommended** that he **submit** the report. (submits ×, submitted ×)\n' +
          '- The client **requested** that the date **be** changed. (is ×, was ×)\n' +
          '- **It is essential** that every visitor **sign** in. (signs ×)\n' +
          '- 부정은 not + 동사원형: We **asked** that the staff **not use** the room.\n\n' +
          '영국 영어에서는 동사원형 앞에 should를 넣기도 합니다(recommended that he **should submit**). 두 꼴 모두 맞습니다. ' +
          '영국 영어의 일상 글에서는 보통 시제(submits)를 쓰는 일도 있지만, 공인영어시험과 격식 있는 글에서는 동사원형을 고릅니다.\n\n' +
          '> ⚠️ suggest가 "암시하다", insist가 "사실이라고 주장하다"라는 뜻이면 보통 시제를 씁니다. The data **suggests** that sales **are** falling.(자료가 판매 감소를 보여 준다)',
        easy: '"~하라고 권하다·요구하다"라는 말 뒤에는 아직 일어나지 않은 "해야 할 일"이 옵니다. 아직 일어나지 않았으니 시제도, 3인칭 단수의 -s도 붙이지 않고 가장 기본 꼴(동사원형)을 씁니다.\n\n' +
          '그래서 he 뒤인데도 submits가 아니라 submit, 과거 문장인데도 submitted가 아니라 submit입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe manager recommended that he ___ the report by Friday.',
          choices: ['submit', 'submits', 'submitted'],
          answer: 0,
          why: [
            '',
            '주어가 he여도 recommend 뒤 that절에서는 -s를 붙이지 않고 동사원형을 씁니다.',
            '주절이 과거(recommended)여도 that절에는 과거형이 아니라 동사원형을 씁니다.',
          ],
          explain: 'recommend(권하다) 뒤 that절에서는 주어의 수·주절의 시제와 관계없이 동사원형 **submit**을 씁니다. "관리자는 그에게 금요일까지 보고서를 내라고 권했습니다."',
        },
      },
    ],

    examples: [
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\nSince the new manager joined the team, sales ___ by 20 percent.\n\n(A) increase (B) increased (C) have increased (D) will increase',
        steps: [
          '보기가 increase의 여러 시제이므로 문장 안의 시간 표현을 찾습니다.',
          'Since the new manager joined the team은 "새 관리자가 팀에 온 뒤로 지금까지"라는 기간을 나타냅니다. since 절 안의 joined는 시작점이라 과거 시제입니다.',
          '과거의 한 시점부터 지금까지 이어진 변화이므로 주절에는 현재완료가 알맞습니다.',
          '(C) have increased를 고릅니다. "새 관리자가 팀에 온 뒤로 판매량이 20퍼센트 늘었습니다."',
        ],
        answer: '(C) have increased',
      },
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\nThe board requested that the report ___ before the next meeting.\n\n(A) is revised (B) be revised (C) was revised (D) revises',
        steps: [
          'request(요청하다) 뒤의 that절이므로 동사원형을 씁니다. 그래서 is·was로 시작하는 (A)(C)와 -s가 붙은 (D)는 답이 아닙니다.',
          '보고서는 스스로 고치지 않고 고쳐지는 대상이므로 수동태(be + 과거분사)가 필요합니다.',
          '동사원형 be로 시작하는 수동태 (B) be revised를 고릅니다. "이사회는 다음 회의 전에 보고서를 고쳐 달라고 요청했습니다."',
        ],
        answer: '(B) be revised',
      },
    ],

    terms: [
      { term: '시제', def: '동사의 꼴로 일이 일어난 때(과거·현재·미래)와 모습(진행·완료)을 나타내는 것입니다.' },
      { term: '현재완료', def: 'have/has + 과거분사. 과거의 일이 지금과 이어져 있을 때 씁니다. 예: We have worked here since 2020.' },
      { term: '과거완료', def: 'had + 과거분사. 과거의 한 시점보다 먼저 끝난 일에 씁니다. 예: By the time I arrived, the meeting had started.' },
      { term: '미래진행', def: 'will be + -ing. 미래의 한 시점에 한창 하고 있을 일입니다. 예: At 3 p.m. tomorrow, I will be meeting a client.' },
      { term: '미래완료', def: 'will have + 과거분사. 미래의 한 시점까지 끝나 있을(이어져 온) 일입니다. 예: By next month, we will have finished.' },
      { term: '부사절', def: '접속사(when, if, before 등)로 시작해 주절에 때·조건·이유를 덧붙이는 절입니다. 시간·조건 부사절은 미래 대신 현재 시제를 씁니다.' },
      { term: '동사원형', def: '시제나 -s를 붙이지 않은 동사의 기본 꼴입니다. 요구·제안 동사 뒤 that절에 씁니다. 예: submit, be' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nMr. Yang ___ to Busan on business last Tuesday.',
        choices: ['went', 'goes', 'has gone', 'will go'],
        answer: 0,
        why: [
          '',
          '현재 시제는 늘 하는 일이나 지금의 사실에 씁니다. last Tuesday(지난 화요일)는 끝난 과거 시점입니다.',
          '현재완료는 last Tuesday처럼 끝난 과거 시점을 나타내는 말과 함께 쓰지 않습니다.',
          '미래 시제는 앞으로의 일입니다. last Tuesday는 이미 지난 때입니다.',
        ],
        explain: 'last Tuesday(지난 화요일)는 끝난 과거 시점이므로 과거 시제 **went**를 씁니다. "양 씨는 지난 화요일에 출장으로 부산에 갔습니다."',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nMs. Ji ___ at this company since 2019.',
        choices: ['has worked', 'worked', 'works', 'will have worked'],
        answer: 0,
        why: [
          '',
          '과거 시제는 끝난 시점의 일입니다. since 2019(2019년부터 지금까지)는 지금까지 이어지는 기간입니다.',
          '현재 시제만으로는 "2019년부터 지금까지"라는 기간을 나타내지 못합니다. since와는 현재완료를 씁니다.',
          '미래완료는 미래의 한 시점까지 이어질 일입니다. since 2019는 과거부터 지금까지입니다.',
        ],
        explain: 'since 2019는 "2019년부터 지금까지"라는 뜻이므로 현재완료 **has worked**를 씁니다. "지 씨는 2019년부터 이 회사에서 일해 왔습니다."',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 1,
        q: 'When have you finished the sales report?\n\n이 문장은 어법상 옳습니다.',
        answer: false,
        explain: 'When(언제)은 끝난 과거의 한 시점을 묻는 말이라 현재완료와 함께 쓰지 않습니다. 바른 문장: When **did** you **finish** the sales report?',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nPlease let me know as soon as the shipment ___.',
        choices: ['arrives', 'will arrive', 'arrived', 'arriving'],
        answer: 0,
        why: [
          '',
          'as soon as가 이끄는 시간 부사절 안에서는 앞으로의 일이라도 will을 쓰지 않고 현재 시제를 씁니다.',
          '과거 시제는 이미 지난 일입니다. 배송품이 도착하는 것은 앞으로의 일입니다.',
          '-ing 꼴은 혼자 절의 동사가 될 수 없습니다.',
        ],
        explain: 'as soon as(~하자마자)는 시간 부사절을 이끕니다. 앞으로의 일이라도 현재 시제 **arrives**를 씁니다. "배송품이 도착하자마자 알려 주십시오."',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nBy the end of this year, the construction team ___ the new bridge.',
        choices: ['will have finished', 'has finished', 'finished', 'will have been finished'],
        answer: 0,
        why: [
          '',
          '현재완료는 과거부터 지금까지의 일입니다. by the end of this year(올해 말까지)는 앞으로의 기한입니다.',
          '과거 시제는 이미 지난 일입니다. 올해 말은 아직 오지 않았습니다.',
          '수동태는 뒤에 목적어가 남지 않습니다. 빈칸 뒤에 목적어 the new bridge가 있고, 다리를 짓는 쪽은 공사팀입니다.',
        ],
        explain: 'by the end of this year(올해 말까지)는 미래의 기한이고, 그때까지 끝나 있을 일이므로 미래완료 **will have finished**를 씁니다. "올해 말까지 공사팀은 새 다리를 다 지어 놓았을 것입니다."',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe supervisor suggested that Ms. Baek ___ the online training course.',
        choices: ['take', 'takes', 'took', 'taking'],
        answer: 0,
        why: [
          '',
          '주어가 3인칭 단수(Ms. Baek)여도 suggest 뒤 that절에서는 -s를 붙이지 않고 동사원형을 씁니다.',
          '주절이 과거(suggested)여도 that절에는 과거형이 아니라 동사원형을 씁니다.',
          '-ing 꼴은 혼자 절의 동사가 될 수 없습니다.',
        ],
        explain: 'suggest(제안하다) 뒤 that절에서는 주어의 수·주절의 시제와 관계없이 동사원형 **take**를 씁니다. "관리자는 백 씨에게 온라인 연수 과정을 들으라고 제안했습니다."',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'text', concept: 0,
        q: '빈칸에 begin의 알맞은 꼴을 한 낱말로 쓰십시오.\n\nThe workshop ___ two hours ago.',
        answer: ['began'],
        wrong: [
          { a: 'begun', why: 'begun은 과거분사라서 혼자 동사로 쓸 수 없습니다(has begun처럼 씁니다). 과거형은 began입니다.' },
          { a: 'begins', why: 'two hours ago(두 시간 전)는 끝난 과거 시점이므로 과거 시제를 씁니다.' },
          { a: 'beginned', why: 'begin은 불규칙 동사라서 -ed를 붙이지 않습니다. begin - began - begun' },
        ],
        explain: 'two hours ago(두 시간 전)는 끝난 과거 시점이므로 과거 시제를 씁니다. begin의 과거형은 **began**입니다(begin - began - begun). "워크숍은 두 시간 전에 시작했습니다."',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nAt 3 p.m. tomorrow, I ___ with the clients, so please call me after five.',
        choices: ['will be meeting', 'will have met', 'met', 'have met'],
        answer: 0,
        why: [
          '',
          '미래완료는 그 시점까지 이미 끝나 있을 일입니다. 오후 3시에 회의가 끝나 있다면 전화를 미룰 까닭이 없습니다. 그때 한창 하고 있을 일은 미래진행입니다.',
          '과거 시제는 이미 지난 일입니다. 3 p.m. tomorrow는 앞으로의 때입니다.',
          '현재완료는 과거부터 지금까지의 일입니다. 3 p.m. tomorrow는 앞으로의 때입니다.',
        ],
        hint: '내일 오후 3시에 나는 무엇을 "하고 있는" 중입니까?',
        explain: '내일 오후 3시라는 미래의 한 시점에 한창 하고 있을 일이므로 미래진행 **will be meeting**을 씁니다. 그래서 그때는 전화를 받기 어렵다는 뒤 문장과 맞습니다. "내일 오후 3시에는 고객들을 만나고 있을 테니 5시 넘어서 전화해 주십시오."',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nIf the weather ___ good next Saturday, the company picnic will take place in the park.',
        choices: ['is', 'will be', 'was', 'has been'],
        answer: 0,
        why: [
          '',
          'if가 이끄는 조건 부사절 안에서는 앞으로의 일이라도 will을 쓰지 않고 현재 시제를 씁니다.',
          '과거 시제는 이미 지난 일입니다. next Saturday는 앞으로의 때입니다.',
          '현재완료는 과거부터 지금까지의 일입니다. next Saturday는 앞으로의 때입니다.',
        ],
        hint: '주절에 will이 있고, 빈칸은 if 절 안에 있습니다.',
        explain: 'if(만약 ~하면)가 이끄는 조건 부사절에서는 next Saturday(앞으로의 일)라도 현재 시제 **is**를 씁니다. 미래라는 것은 주절의 will take place가 알려 줍니다. "다음 주 토요일 날씨가 좋으면 회사 야유회는 공원에서 열립니다."',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nOnline sales ___ steadily over the past three years.',
        choices: ['have grown', 'grew', 'grow', 'will grow'],
        answer: 0,
        why: [
          '',
          'over the past three years(지난 3년 동안 지금까지)는 지금까지 이어지는 기간이라 현재완료와 어울립니다.',
          '현재 시제만으로는 "지난 3년 동안 지금까지"라는 기간을 나타내지 못합니다.',
          '미래 시제는 앞으로의 일입니다. over the past three years는 과거부터 지금까지입니다.',
        ],
        hint: 'over the past three years가 나타내는 기간은 언제부터 언제까지입니까?',
        explain: 'over the past three years는 "지난 3년 동안 지금까지"라는 뜻이므로 현재완료 **have grown**을 씁니다. "온라인 판매량은 지난 3년 동안 꾸준히 늘어 왔습니다."',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'text', concept: 4,
        q: '빈칸에 be동사의 알맞은 꼴을 쓰십시오.\n\nIt is essential that every visitor ___ registered at the front desk.',
        answer: ['be', 'should be'],
        wrong: [
          { a: 'is', why: 'It is essential that 뒤의 that절에는 동사원형을 씁니다. be동사의 원형은 be입니다.' },
          { a: 'was', why: '주절의 시제와 관계없이 It is essential that 뒤에는 동사원형 be를 씁니다.' },
          { a: 'are', why: 'every visitor는 단수이고, 이 자리에는 수와 관계없이 동사원형 be를 씁니다.' },
        ],
        hint: '필요를 나타내는 형용사(essential) 뒤 that절입니다.',
        explain: 'It is essential(꼭 필요하다) that 뒤의 that절에는 동사원형을 씁니다. be동사의 원형은 **be**입니다(should be도 맞습니다). "모든 방문객은 반드시 안내 데스크에서 등록해야 합니다."',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nBy the time the firefighters arrived, the fire ___ out.',
        choices: ['had gone', 'has gone', 'will have gone', 'goes'],
        answer: 0,
        why: [
          '',
          '현재완료는 지금을 기준으로 합니다. 이 문장은 소방관이 도착한 과거의 때(arrived)를 기준으로 합니다.',
          '미래완료는 by the time 뒤가 현재 시제일 때(미래의 일) 씁니다. 여기서는 arrived(과거)입니다.',
          '현재 시제는 이미 지난 이야기와 맞지 않습니다.',
        ],
        hint: 'by the time 뒤의 arrived는 과거입니다.',
        explain: 'by the time + 과거 시제(arrived)는 "소방관이 도착했을 무렵에는 이미"라는 뜻입니다. 과거의 그 시점보다 먼저 끝난 일이므로 과거완료 **had gone**을 씁니다. "소방관들이 도착했을 무렵에는 불이 이미 꺼져 있었습니다."',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 1,
        q: '어법상 **옳지 않은** 문장은 무엇입니까?',
        choices: [
          'I have already sent the invoice to the client.',
          'When did you finish the inventory check?',
          'The company has moved its head office to Seoul in 2021.',
          'We have known each other since our first year at college.',
        ],
        answer: 2,
        why: [
          'already는 현재완료와 자주 쓰는 말입니다. 옳은 문장입니다.',
          '끝난 시점을 묻는 When에 과거 시제를 썼습니다. 옳은 문장입니다.',
          '',
          'since + 시작점으로 "그때부터 지금까지"를 나타내어 현재완료와 어울립니다. 옳은 문장입니다.',
        ],
        explain: 'in 2021은 끝난 과거 시점이라 현재완료와 함께 쓸 수 없습니다. 바르게 고치면 The company **moved** its head office to Seoul in 2021.입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 2,
        q: '빈칸에 차례대로 들어갈 말로 알맞은 것은 무엇입니까?\n\nNobody knows exactly when the new director ___, but we will hold a welcome lunch when she ___.',
        choices: ['will arrive / arrives', 'arrives / will arrive', 'arrived / will arrive', 'will arrive / will arrive'],
        answer: 0,
        why: [
          '',
          '둘을 거꾸로 썼습니다. 첫 when 절은 knows의 목적어(명사절)라 will을 쓰고, 둘째 when 절은 시간 부사절이라 현재 시제를 씁니다.',
          '첫 빈칸을 과거로 쓰면 이미 도착했다는 뜻이 되어 뒤 문장과 맞지 않습니다. 또 둘째 when 절은 시간 부사절이라 will 대신 현재 시제를 씁니다.',
          '둘째 when 절은 "그녀가 도착하면"이라는 시간 부사절입니다. 부사절에서는 will 대신 현재 시제를 씁니다.',
        ],
        hint: '첫 when 절은 "언제 ~할지", 둘째 when 절은 "~할 때"라는 뜻입니다.',
        explain: '첫 when 절은 knows의 목적어인 명사절(언제 도착할지)이라 미래의 일에 **will arrive**를 씁니다. 둘째 when 절은 시간 부사절(도착하면)이라 현재 시제 **arrives**를 씁니다. "새 이사가 정확히 언제 올지 아무도 모르지만, 그녀가 오면 환영 점심 모임을 열 것입니다."',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 3,
        q: '빈칸에 차례대로 들어갈 말로 알맞은 것은 무엇입니까?\n\nBy the time you ___ this email, I ___ for the airport.',
        choices: ['read / will have left', 'will read / will have left', 'read / have left', 'will read / left'],
        answer: 0,
        why: [
          '',
          'by the time이 이끄는 부사절에서는 앞으로의 일이라도 will을 쓰지 않고 현재 시제를 씁니다.',
          '주절은 "네가 읽을 무렵(미래)에는 이미 떠나 있을 것"이라 현재완료가 아니라 미래완료를 씁니다.',
          '부사절에 will을 썼고, 주절의 과거 시제 left는 미래의 일과 맞지 않습니다.',
        ],
        hint: 'by the time 절의 시제와 주절의 시제를 따로 생각해 보십시오.',
        explain: 'by the time 절은 시간 부사절이라 현재 시제 **read**를 쓰고(여기서 read는 현재형), 주절은 "그때까지 이미 끝나 있을 일"이라 미래완료 **will have left**를 씁니다. "당신이 이 이메일을 읽을 무렵이면 저는 공항으로 떠났을 것입니다."',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 4,
        q: '빈칸에 들어갈 수 **없는** 것은 무엇입니까?\n\nThe committee ___ that the annual meeting be postponed until May.',
        choices: ['suggested', 'requested', 'recommended', 'knew'],
        answer: 3,
        why: [
          'suggest(제안하다)는 뒤 that절에 동사원형(be)을 받습니다. 들어갈 수 있습니다.',
          'request(요청하다)는 뒤 that절에 동사원형(be)을 받습니다. 들어갈 수 있습니다.',
          'recommend(권하다)는 뒤 that절에 동사원형(be)을 받습니다. 들어갈 수 있습니다.',
          '',
        ],
        hint: 'that절의 동사가 be postponed(동사원형)입니다.',
        explain: 'that절에 동사원형 be가 쓰였으므로 빈칸에는 요구·제안 동사가 와야 합니다. **knew**(알았다)는 요구·제안의 뜻이 없어서 that절에 동사원형을 받지 않습니다(The committee knew that the meeting was postponed.처럼 씁니다).',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe manager asked that the staff ___ the meeting room during the repairs.',
        choices: ['not use', 'do not use', 'not to use', 'does not use'],
        answer: 0,
        why: [
          '',
          '요구 동사 뒤 that절의 부정은 do를 쓰지 않고 not + 동사원형으로 씁니다.',
          'that절 안에는 주어와 동사가 있어야 합니다. to부정사는 that절의 동사가 될 수 없습니다.',
          '-s가 붙은 does는 동사원형이 아닙니다. 요구 동사 뒤 that절은 not + 동사원형입니다.',
        ],
        hint: '요구·제안 동사 뒤 that절에서 부정은 어떻게 나타냅니까?',
        explain: 'ask(요청하다) 뒤 that절에서는 동사원형을 쓰고, 부정은 not을 동사원형 앞에 둡니다: **not use**. "관리자는 수리하는 동안 직원들이 회의실을 쓰지 말라고 요청했습니다."',
      },
      {
        id: 'a6', level: 3, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nBy the end of this year, Ms. Oh ___ for the company for twenty years.',
        choices: ['will have worked', 'has worked', 'worked', 'will have been worked'],
        answer: 0,
        why: [
          '',
          '현재완료는 지금까지의 기간입니다. 이 문장은 "올해 말"이라는 미래의 시점까지 이어진 기간을 말합니다.',
          '과거 시제는 이미 끝난 일이고, 올해 말은 아직 오지 않았습니다.',
          'work는 이 문장에서 목적어 없이 쓰인 동사라서 수동태(been worked)로 만들 수 없습니다.',
        ],
        hint: 'for twenty years가 끝나는 때는 지금입니까, 올해 말입니까?',
        explain: '올해 말(미래의 한 시점)까지 이어져 온 기간(for twenty years)을 말하므로 미래완료 **will have worked**를 씁니다. "올해 말이면 오 씨가 그 회사에서 일한 지 20년이 됩니다."',
      },
    ],

    deeper: [
      {
        title: '우리말 "~했다"가 늘 과거 시제는 아니다',
        body: '우리말은 "벌써 보냈어요", "3년째 일했어요"처럼 끝난 일도, 지금까지 이어진 일도 모두 "~했다"로 말할 수 있습니다. 그래서 우리말만 보고 영어 시제를 고르면 현재완료 자리에 과거 시제를 쓰기 쉽습니다.\n\n' +
          '| 우리말 | 영어 | 까닭 |\n|---|---|---|\n' +
          '| 어제 보고서를 보냈어요. | I **sent** the report yesterday. | 어제라는 끝난 시점 |\n' +
          '| 보고서는 벌써 보냈어요(지금 보낸 상태). | I **have** already **sent** the report. | 지금 결과가 남아 있음 |\n' +
          '| 여기서 3년째 일했어요(지금도 일함). | I **have worked** here for three years. | 지금까지 계속 |\n\n' +
          '판단할 때는 "그 일이 지금과 이어져 있는가?", 그리고 "끝난 시점을 말하는 표현(yesterday, ago, last)이 있는가?" 두 가지를 확인합니다. 이메일·보고서를 쓸 때도 같은 기준이 그대로 쓰입니다.',
      },
      {
        title: 'when과 if — 부사절일까 명사절일까',
        body: '"when·if 절에는 will을 쓰지 않는다"는 규칙은 **부사절**에만 해당합니다. when·if 절이 동사의 목적어(명사절)이면 앞으로의 일에 will을 그대로 씁니다.\n\n' +
          '| 문장 | 절의 종류 | 뜻 |\n|---|---|---|\n' +
          '| I will call you **when** the results **come** out. | 부사절 | 결과가 나오면 |\n' +
          '| I don\'t know **when** the results **will come** out. | 명사절(know의 목적어) | 결과가 언제 나올지 |\n' +
          '| **If** you **attend**, please bring your ID. | 부사절 | 참석하면 |\n' +
          '| Please let me know **if** you **will attend**. | 명사절(know의 목적어) | 참석할지 어떨지 |\n\n' +
          '구별하는 방법: 명사절의 if는 whether(~인지 아닌지)로 바꿀 수 있고, 명사절의 when은 "언제 ~할지"로 옮겨집니다.',
      },
    ],

    faq: [
      {
        q: 'yesterday랑 현재완료는 왜 같이 못 써요?',
        a: '현재완료는 "과거의 일이 지금과 이어져 있다"는 뜻이고, yesterday·last week·two days ago는 "지금과 끊어진, 끝난 시점"을 콕 집어 말합니다. 두 뜻이 부딪히기 때문에 함께 쓰지 않습니다. 끝난 시점을 말하고 싶으면 과거 시제(I sent it yesterday.)를 씁니다.',
      },
      {
        q: 'if 뒤에 will을 쓰면 무조건 틀려요?',
        a: '아닙니다. "만약 ~하면"이라는 조건 부사절에서만 will 대신 현재 시제를 씁니다. Please tell me if you will come.처럼 if 절이 "~할지 어떨지"라는 뜻으로 동사의 목적어가 되면(명사절) will을 그대로 씁니다. if를 whether로 바꿔도 뜻이 통하면 명사절입니다.',
      },
      {
        q: 'recommend that he submit에서 왜 submits가 아니에요?',
        a: '요구·제안 동사 뒤의 that절은 "그렇게 해야 할 일"을 말하므로, 주어가 he이든 주절이 과거이든 동사원형을 씁니다. 영국 영어에서는 recommend that he should submit처럼 should를 넣기도 하는데, 이 should를 빼고 남은 꼴이라고 생각하면 기억하기 쉽습니다.',
      },
    ],

    mistakes: [
      '현재완료를 yesterday·ago·last ~·in + 지난 연도와 함께 쓰는 실수(We have met him yesterday.) — 끝난 시점이 있으면 과거 시제를 씁니다.',
      '시간·조건 부사절에 will을 쓰는 실수(when the package will arrive) — when·if·as soon as·once 절에서는 미래의 일도 현재 시제로 씁니다.',
      '요구·제안 동사 뒤 that절에 -s나 과거형을 쓰는 실수(recommended that he submits) — 동사원형(submit, be)을 씁니다.',
    ],

    gens: [
      {
        id: 'tense-cue',
        level: 1,
        title: '시간 표현을 보고 시제 고르기',
        make: function (R) {
          var it = R.pick(TENSE);
          var right = it[2];
          var correct = it[1][right];
          var reason = {};
          var wrongs = [];
          ['past', 'perf', 'fut'].forEach(function (k) {
            if (k === right) return;
            wrongs.push(it[1][k]);
            reason[it[1][k]] = TENSE_WHY[k][right];
          });
          var pick = R.choices(correct, wrongs, 3);
          return {
            type: 'choice', concept: it[5],
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: '단서: ' + it[3] + '. 그래서 ' + TENSE_NAME[right] + '를 씁니다. 정답: **' + correct + '**\n\n' +
              it[0].replace('___', '**' + correct + '**') + '\n(' + it[4] + ')',
          };
        },
      },
      {
        id: 'adverb-clause',
        level: 2,
        title: '시간·조건 부사절의 현재 시제',
        make: function (R) {
          var it = R.pick(ADV);
          var correct = it[1];
          var reason = {};
          reason[it[2]] = it[4] + ' 뒤의 시간·조건 부사절 안에서는 앞으로의 일이라도 will을 쓰지 않고 현재 시제로 씁니다.';
          reason[it[3]] = '과거 시제는 이미 지난 일입니다. 이 문장은 앞으로의 일을 말하고, 부사절 안에서는 현재 시제로 미래를 나타냅니다.';
          var pick = R.choices(correct, [it[2], it[3]], 3);
          return {
            type: 'choice', concept: 2,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: '빈칸은 ' + it[4] + ' 뒤의 부사절 안에 있습니다. 앞으로의 일이지만 부사절에서는 현재 시제를 씁니다. 정답: **' + correct + '**\n\n' +
              it[0].replace('___', '**' + correct + '**') + '\n(' + it[5] + ')',
          };
        },
      },
      {
        id: 'future-perfect-progressive',
        level: 2,
        title: '미래완료와 미래진행',
        make: function (R) {
          var it = R.pick(FUT);
          var correct = it[1];
          var reason = {};
          var wrongs = it[2].map(function (w) { reason[w[0]] = FUT_WHY[w[1]]; return w[0]; });
          var pick = R.choices(correct, wrongs, 4);
          return {
            type: 'choice', concept: 3,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: it[3] + ' 정답: **' + correct + '**\n\n' + it[0].replace('___', '**' + correct + '**') + '\n(' + it[4] + ')',
          };
        },
      },
      {
        id: 'mandative',
        level: 2,
        title: '요구·제안 동사 뒤 that절의 동사원형',
        make: function (R) {
          var it = R.pick(SUBJ);
          var correct = it[1];
          var reason = {};
          reason[it[2]] = correct === 'be'
            ? '요구·제안·필요를 나타내는 말(' + it[4] + ') 뒤 that절에서는 be동사도 is·are가 아니라 원형 be를 씁니다.'
            : '요구·제안·필요를 나타내는 말(' + it[4] + ') 뒤 that절에서는 주어가 3인칭 단수여도 -s를 붙이지 않고 동사원형을 씁니다.';
          reason[it[3]] = '주절의 시제와 관계없이 이 that절에는 과거형이 아니라 동사원형을 씁니다.';
          var pick = R.choices(correct, [it[2], it[3]], 3);
          return {
            type: 'choice', concept: 4,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: '단서: ' + it[4] + ' 뒤의 that절. 요구·제안·필요를 나타내는 말 뒤 that절에는 동사원형을 씁니다(should를 넣어도 됩니다). 정답: **' + correct + '**\n\n' +
              it[0].replace('___', '**' + correct + '**') + '\n(' + it[5] + ')',
          };
        },
      },
    ],

    vocab: [
      { w: 'deadline', m: '마감 기한', ex: 'The deadline for applications is next Friday.', exm: '지원 마감 기한은 다음 주 금요일입니다.' },
      { w: 'invoice', m: '청구서, 송장', ex: 'We will send you the invoice by email.', exm: '청구서는 이메일로 보내 드리겠습니다.' },
      { w: 'submit', m: '제출하다', ex: 'Please submit your report by Monday.', exm: '월요일까지 보고서를 제출해 주십시오.' },
      { w: 'recommend', m: '권하다, 추천하다', ex: 'I recommend that you book a room early.', exm: '방을 일찍 예약하시기를 권합니다.' },
      { w: 'suggest', m: '제안하다; 암시하다', ex: 'She suggested that we meet on Thursday.', exm: '그녀는 목요일에 만나자고 제안했습니다.' },
      { w: 'request', m: '요청하다; 요청', ex: 'The customer requested a refund.', exm: '그 고객은 환불을 요청했습니다.' },
      { w: 'launch', m: '(제품을) 내놓다, 시작하다', ex: 'The company will launch a new phone next month.', exm: '그 회사는 다음 달에 새 휴대 전화를 내놓을 것입니다.' },
      { w: 'quarter', m: '분기(석 달)', ex: 'Profits rose in the third quarter.', exm: '3분기에 이익이 늘었습니다.' },
      { w: 'annual', m: '해마다의, 연례의', ex: 'The annual meeting is held every March.', exm: '연례 회의는 해마다 3월에 열립니다.' },
      { w: 'register', m: '등록하다', ex: 'You must register before the workshop begins.', exm: '워크숍이 시작되기 전에 등록해야 합니다.' },
      { w: 'construction', m: '건설, 공사', ex: 'The construction of the new library will take two years.', exm: '새 도서관 공사는 2년이 걸릴 것입니다.' },
      { w: 'steadily', m: '꾸준히', ex: 'The number of members has grown steadily.', exm: '회원 수가 꾸준히 늘어 왔습니다.' },
      { w: 'reschedule', m: '일정을 다시 잡다', ex: 'Can we reschedule the interview for next week?', exm: '면접 일정을 다음 주로 다시 잡을 수 있을까요?' },
      { w: 'essential', m: '꼭 필요한, 필수적인', ex: 'A valid ID is essential for check-in.', exm: '체크인에는 유효한 신분증이 꼭 필요합니다.' },
    ],
  });
})();
