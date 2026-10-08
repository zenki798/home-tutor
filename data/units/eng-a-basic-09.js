/* 다시 시작하는 영어 기초 문법 · 현재완료
 * 예문은 모두 직접 쓴 문장이다(가상의 인물). 영어 낱말 바로 뒤에는 받침에 따라 바뀌는 조사를 붙이지 않는다. */
(function () {
  // 과거분사 생성기: [원형, 과거형, 과거분사, 갈래, [흔한 틀린 꼴, 까닭]…]
  var ED = '이 동사는 -ed를 붙이지 않는 불규칙 동사입니다. 원형 – 과거형 – 과거분사를 함께 외워 둡니다.';
  var PP = [
    ['go', 'went', 'gone', 'irr', [['went', 'past'], ['goed', ED]]],
    ['eat', 'ate', 'eaten', 'irr', [['ate', 'past'], ['eated', ED]]],
    ['see', 'saw', 'seen', 'irr', [['saw', 'past'], ['seed', ED]]],
    ['write', 'wrote', 'written', 'irr', [['wrote', 'past'], ['writed', ED]]],
    ['take', 'took', 'taken', 'irr', [['took', 'past'], ['taked', ED]]],
    ['do', 'did', 'done', 'irr', [['did', 'past'], ['doed', ED]]],
    ['know', 'knew', 'known', 'irr', [['knew', 'past'], ['knowed', ED]]],
    ['give', 'gave', 'given', 'irr', [['gave', 'past'], ['gived', ED]]],
    ['speak', 'spoke', 'spoken', 'irr', [['spoke', 'past'], ['speaked', ED]]],
    ['drink', 'drank', 'drunk', 'irr', [['drank', 'past'], ['drinked', ED]]],
    ['break', 'broke', 'broken', 'irr', [['broke', 'past'], ['breaked', ED]]],
    ['begin', 'began', 'begun', 'irr', [['began', 'past']]],
    ['swim', 'swam', 'swum', 'irr', [['swam', 'past'], ['swimmed', ED]]],
    ['choose', 'chose', 'chosen', 'irr', [['chose', 'past']]],
    ['fly', 'flew', 'flown', 'irr', [['flew', 'past'], ['flied', ED]]],
    ['wear', 'wore', 'worn', 'irr', [['wore', 'past'], ['weared', ED]]],
    ['make', 'made', 'made', 'same', [['maked', ED]]],
    ['buy', 'bought', 'bought', 'same', [['buyed', ED]]],
    ['meet', 'met', 'met', 'same', [['meeted', ED]]],
    ['lose', 'lost', 'lost', 'same', [['losed', ED]]],
    ['leave', 'left', 'left', 'same', [['leaved', ED]]],
    ['find', 'found', 'found', 'same', [['finded', ED]]],
    ['tell', 'told', 'told', 'same', [['telled', ED]]],
    ['send', 'sent', 'sent', 'same', [['sended', ED]]],
    ['come', 'came', 'come', 'base', [['came', 'past'], ['comed', ED]]],
    ['study', 'studied', 'studied', 'ies', [['studyed', '"자음 + y"로 끝나는 동사는 y를 i로 바꾸고 -ed를 붙입니다.']]],
    ['try', 'tried', 'tried', 'ies', [['tryed', '"자음 + y"로 끝나는 동사는 y를 i로 바꾸고 -ed를 붙입니다.']]],
    ['stop', 'stopped', 'stopped', 'double', [['stoped', '"짧은 모음 하나 + 자음 하나"로 끝나는 동사는 끝 자음을 한 번 더 쓰고 -ed를 붙입니다.']]],
    ['plan', 'planned', 'planned', 'double', [['planed', '"짧은 모음 하나 + 자음 하나"로 끝나는 동사는 끝 자음을 한 번 더 쓰고 -ed를 붙입니다.']]],
    ['finish', 'finished', 'finished', 'reg', [['finish', 'base']]],
    ['visit', 'visited', 'visited', 'reg', [['visit', 'base']]],
  ];
  var PP_RULE = {
    irr: '불규칙 동사이고, 과거분사가 과거형과 다릅니다.',
    same: '불규칙 동사이지만 과거형과 과거분사의 모양이 같습니다.',
    base: '불규칙 동사이고, 과거분사가 원형과 모양이 같습니다.',
    ies: '규칙 동사입니다. "자음 + y"로 끝나서 y를 i로 바꾸고 -ed를 붙입니다. 규칙 동사는 과거형과 과거분사가 같습니다.',
    double: '규칙 동사입니다. 끝 자음을 한 번 더 쓰고 -ed를 붙입니다. 규칙 동사는 과거형과 과거분사가 같습니다.',
    reg: '규칙 동사라서 -ed를 붙입니다. 규칙 동사는 과거형과 과거분사가 같습니다.',
  };

  // for·since 생성기: [문장, 정답, 빈칸 뒤 말, 우리말]
  var FS = [
    ['I have lived in this city ___ 2019.', 'since', '2019', '저는 2019년부터 이 도시에 살고 있습니다.'],
    ['She has worked here ___ five years.', 'for', 'five years', '그녀는 5년 동안 여기서 일해 왔습니다.'],
    ['We have known each other ___ high school.', 'since', 'high school', '우리는 고등학교 때부터 서로 알고 지냈습니다.'],
    ['I have been tired ___ this morning.', 'since', 'this morning', '저는 오늘 아침부터 피곤합니다.'],
    ['He has studied Chinese ___ three months.', 'for', 'three months', '그는 석 달 동안 중국어를 공부해 왔습니다.'],
    ['They have been married ___ ten years.', 'for', 'ten years', '그들은 결혼한 지 10년 되었습니다.'],
    ['It has rained ___ Monday.', 'since', 'Monday', '월요일부터 비가 내리고 있습니다.'],
    ['I have waited for the bus ___ twenty minutes.', 'for', 'twenty minutes', '저는 20분 동안 버스를 기다렸습니다.'],
    ['My son has played the piano ___ he was seven.', 'since', 'he was seven', '제 아들은 일곱 살 때부터 피아노를 쳐 왔습니다.'],
    ['We have had this car ___ a long time.', 'for', 'a long time', '우리는 이 차를 오랫동안 타 왔습니다.'],
    ['She has been a nurse ___ 2015.', 'since', '2015', '그녀는 2015년부터 간호사로 일하고 있습니다.'],
    ['I haven\'t seen Jia ___ last summer.', 'since', 'last summer', '저는 지난여름 이후로 지아를 보지 못했습니다.'],
    ['He hasn\'t eaten anything ___ six hours.', 'for', 'six hours', '그는 여섯 시간 동안 아무것도 먹지 않았습니다.'],
    ['The shop has been closed ___ two weeks.', 'for', 'two weeks', '그 가게는 2주 동안 문을 닫은 상태입니다.'],
    ['I have used this phone ___ last year.', 'since', 'last year', '저는 작년부터 이 휴대전화를 써 왔습니다.'],
    ['Minsu has lived alone ___ a few years.', 'for', 'a few years', '민수는 몇 년째 혼자 살고 있습니다.'],
    ['We have been at the office ___ 8 a.m.', 'since', '8 a.m.', '우리는 오전 8시부터 사무실에 있었습니다.'],
    ['They have run this bakery ___ twenty years.', 'for', 'twenty years', '그들은 20년 동안 이 빵집을 운영해 왔습니다.'],
    ['I have felt better ___ I started walking every day.', 'since', 'I started walking every day', '매일 걷기 시작한 뒤로 몸이 한결 좋아졌습니다.'],
    ['She has kept a diary ___ she was a student.', 'since', 'she was a student', '그녀는 학생 때부터 일기를 써 왔습니다.'],
    ['The baby has slept ___ an hour.', 'for', 'an hour', '아기가 한 시간째 자고 있습니다.'],
    ['I haven\'t called my grandmother ___ a week.', 'for', 'a week', '저는 일주일 동안 할머니께 전화를 드리지 못했습니다.'],
  ];
  var FS_WHY = {
    since: '빈칸 뒤의 말이 "언제부터"인지 알려 주는 시작 시점입니다. 시작 시점 앞에는 since(~부터, ~ 이후로)를 씁니다.',
    'for': '빈칸 뒤의 말이 "얼마 동안"인지 알려 주는 기간입니다. 기간 앞에는 for(~ 동안)를 씁니다.',
  };

  // 과거 시제 / 현재완료 생성기: { s 문장, aux have·has, base 원형, past 과거형, pp 과거분사, ans 'past'|'perf', cue 단서, ko 우리말, bad? [틀린 꼴, 까닭] }
  var PV = [
    { s: 'I ___ in Seoul since 2018.', aux: 'have', base: 'live', past: 'lived', pp: 'lived', ans: 'perf', cue: 'since', ko: '저는 2018년부터 서울에 살고 있습니다.' },
    { s: 'I ___ in Seoul in 2018.', aux: 'have', base: 'live', past: 'lived', pp: 'lived', ans: 'past', cue: 'in 2018', ko: '저는 2018년에 서울에 살았습니다.' },
    { s: 'She ___ three reports so far this week.', aux: 'has', base: 'finish', past: 'finished', pp: 'finished', ans: 'perf', cue: 'so far', ko: '그녀는 이번 주에 지금까지 보고서 세 개를 끝냈습니다.' },
    { s: 'She ___ three reports yesterday.', aux: 'has', base: 'finish', past: 'finished', pp: 'finished', ans: 'past', cue: 'yesterday', ko: '그녀는 어제 보고서 세 개를 끝냈습니다.' },
    { s: 'We ___ each other since 2010.', aux: 'have', base: 'know', past: 'knew', pp: 'known', ans: 'perf', cue: 'since', ko: '우리는 2010년부터 서로 알고 지냈습니다.' },
    { s: 'We ___ each other at a party in 2010.', aux: 'have', base: 'meet', past: 'met', pp: 'met', ans: 'past', cue: 'in 2010', ko: '우리는 2010년에 어느 모임에서 서로 만났습니다.' },
    { s: 'He ___ at this company since last spring.', aux: 'has', base: 'work', past: 'worked', pp: 'worked', ans: 'perf', cue: 'since', ko: '그는 지난봄부터 이 회사에서 일하고 있습니다.' },
    { s: 'He ___ at this company two years ago.', aux: 'has', base: 'work', past: 'worked', pp: 'worked', ans: 'past', cue: 'two years ago', ko: '그는 2년 전에 이 회사에서 일했습니다.' },
    { s: 'It ___ a lot since Monday.', aux: 'has', base: 'rain', past: 'rained', pp: 'rained', ans: 'perf', cue: 'since', ko: '월요일부터 비가 많이 내렸습니다.' },
    { s: 'It ___ a lot last night.', aux: 'has', base: 'rain', past: 'rained', pp: 'rained', ans: 'past', cue: 'last night', ko: '어젯밤에 비가 많이 내렸습니다.' },
    { s: 'I ___ two cups of coffee so far today.', aux: 'have', base: 'drink', past: 'drank', pp: 'drunk', ans: 'perf', cue: 'so far', ko: '저는 오늘 지금까지 커피를 두 잔 마셨습니다.', bad: ['have drank', 'drank — 과거형입니다. have 뒤에는 과거분사 drunk를 씁니다.'] },
    { s: 'I ___ two cups of coffee yesterday.', aux: 'have', base: 'drink', past: 'drank', pp: 'drunk', ans: 'past', cue: 'yesterday', ko: '저는 어제 커피를 두 잔 마셨습니다.' },
    { s: 'My parents ___ in this house since I was born.', aux: 'have', base: 'live', past: 'lived', pp: 'lived', ans: 'perf', cue: 'since', ko: '부모님은 제가 태어났을 때부터 이 집에 살고 계십니다.' },
    { s: 'My parents ___ this house in 1995.', aux: 'have', base: 'buy', past: 'bought', pp: 'bought', ans: 'past', cue: 'in 1995', ko: '부모님은 1995년에 이 집을 사셨습니다.' },
    { s: 'Jia ___ me three emails since Friday.', aux: 'has', base: 'send', past: 'sent', pp: 'sent', ans: 'perf', cue: 'since', ko: '지아는 금요일부터 제게 이메일을 세 통 보냈습니다.' },
    { s: 'Jia ___ me an email last Friday.', aux: 'has', base: 'send', past: 'sent', pp: 'sent', ans: 'past', cue: 'last Friday', ko: '지아는 지난 금요일에 제게 이메일을 보냈습니다.' },
    { s: 'I ___ this laptop since 2021.', aux: 'have', base: 'use', past: 'used', pp: 'used', ans: 'perf', cue: 'since', ko: '저는 2021년부터 이 노트북을 써 왔습니다.' },
    { s: 'I ___ this laptop for the first time in 2021.', aux: 'have', base: 'use', past: 'used', pp: 'used', ans: 'past', cue: 'in 2021', ko: '저는 2021년에 이 노트북을 처음 썼습니다.' },
    { s: 'Minsu ___ ten kilometers so far today.', aux: 'has', base: 'walk', past: 'walked', pp: 'walked', ans: 'perf', cue: 'so far', ko: '민수는 오늘 지금까지 10킬로미터를 걸었습니다.' },
    { s: 'Minsu ___ ten kilometers last Sunday.', aux: 'has', base: 'walk', past: 'walked', pp: 'walked', ans: 'past', cue: 'last Sunday', ko: '민수는 지난 일요일에 10킬로미터를 걸었습니다.' },
    { s: 'Our team ___ four new people since January.', aux: 'has', base: 'hire', past: 'hired', pp: 'hired', ans: 'perf', cue: 'since', ko: '우리 팀은 1월부터 새 직원 네 명을 뽑았습니다.' },
    { s: 'Our team ___ four new people last month.', aux: 'has', base: 'hire', past: 'hired', pp: 'hired', ans: 'past', cue: 'last month', ko: '우리 팀은 지난달에 새 직원 네 명을 뽑았습니다.' },
    { s: 'I ___ my grandmother twice since Sunday.', aux: 'have', base: 'call', past: 'called', pp: 'called', ans: 'perf', cue: 'since', ko: '저는 일요일부터 할머니께 두 번 전화를 드렸습니다.' },
    { s: 'I ___ my grandmother on Sunday.', aux: 'have', base: 'call', past: 'called', pp: 'called', ans: 'past', cue: 'on Sunday', ko: '저는 일요일에 할머니께 전화를 드렸습니다.' },
  ];
  var CUE_WHY = {
    since: 'since(~부터)가 있어 과거에 시작한 일이 지금까지 이어진다는 뜻입니다. 지금과 이어지는 일에는 현재완료를 씁니다.',
    'so far': 'so far(지금까지)가 있어 오늘·이번 주처럼 아직 끝나지 않은 기간에 지금까지 한 일을 말합니다. 현재완료를 씁니다.',
  };

  Tutor.registerUnit({
    id: 'eng-a-basic-09',
    course: 'eng-a-basic',
    title: '현재완료',
    summary: 'have·has + 과거분사로 경험·계속·완료를 말하고, 과거 시제와 어떻게 다른지 비교합니다.',
    goals: [
      '주어에 맞게 have·has + 과거분사로 현재완료 문장을 만들 수 있다.',
      'ever·never·before로 경험을, for·since로 계속을 말할 수 있다.',
      'just·already·yet으로 막 끝난 일·이미 한 일·아직 하지 않은 일을 말할 수 있다.',
      '분명한 과거 시점이 있는 문장과 지금과 이어지는 문장을 구별해 과거 시제와 현재완료를 고를 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '현재완료의 형태 — have·has + 과거분사',
        body: '**현재완료**는 과거에 일어난 일이 **지금과 이어져 있을 때** 쓰는 시제입니다. 모양은 **have·has + 과거분사**입니다.\n\n| 주어 | 현재완료 | 줄임말 |\n|---|---|---|\n| I, you, we, they, 복수 명사 | **have** finished | I\'ve, you\'ve, we\'ve, they\'ve |\n| he, she, it, 단수 명사 | **has** finished | he\'s, she\'s, it\'s |\n\n**과거분사**는 동사의 셋째 모양입니다. 규칙 동사는 과거형과 같이 -ed를 붙이고(work – worked – worked), 불규칙 동사는 따로 익혀 둡니다.\n\n| 원형 | 과거형 | 과거분사 |\n|---|---|---|\n| go | went | **gone** |\n| eat | ate | **eaten** |\n| see | saw | **seen** |\n| do | did | **done** |\n| be | was, were | **been** |\n| write | wrote | **written** |\n| make | made | **made** |\n| buy | bought | **bought** |\n| come | came | **come** |\n\n- 부정문: have·has 뒤에 not — I **haven\'t** finished. / She **hasn\'t** called.\n- 의문문: Have·Has를 주어 앞으로 — **Have** you **finished**? — Yes, I have. / No, I haven\'t.\n\n> ⚠️ he\'s, she\'s는 he is, she is의 줄임말이기도 합니다. 뒤에 과거분사가 오면(She\'s gone.) has의 줄임말입니다.',
        easy: 'have에는 "가지고 있다"는 뜻이 있지요. 현재완료는 "과거에 한 일을 **지금 가지고 있다**"고 생각하면 쉽습니다.\n\n- I have finished the report. → 보고서를 끝낸 상태를 지금 가지고 있다 = 지금 다 끝나 있다\n- I have seen that movie. → 그 영화를 본 경험을 지금 가지고 있다\n\n그래서 모양도 "지금"을 뜻하는 have·has에, "~해 버린"을 뜻하는 과거분사를 붙입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nShe ___ her homework.',
          choices: ['have finished', 'has finished', 'has finish'],
          answer: 1,
          why: [
            '주어 she는 3인칭 단수라서 have가 아니라 has를 씁니다.',
            '',
            'has 뒤에는 동사원형이 아니라 과거분사(finished)를 씁니다.',
          ],
          explain: '주어가 3인칭 단수(she)이므로 has, 그 뒤에 과거분사 finished를 씁니다: **She has finished her homework.** "그녀는 숙제를 끝냈습니다."',
        },
      },
      {
        title: '경험 — "~해 본 적이 있다" (ever, never, before)',
        body: '현재완료는 지금까지 살아오면서 **해 본 적이 있는지** 말할 때 씁니다. 언제 했는지는 중요하지 않고, 그런 경험이 **지금 있느냐**가 중요합니다.\n\n| 말 | 뜻·자리 | 예 |\n|---|---|---|\n| ever | 의문문에서 "지금까지 한 번이라도" (과거분사 앞) | **Have** you **ever** **tried** kimchi stew? |\n| never | "한 번도 ~ 않다" (have·has 뒤) | I **have never been** abroad. |\n| before | "전에" (문장 끝) | I **have met** her **before**. |\n| once, twice, three times | 횟수 (문장 끝) | She **has visited** Jeju **twice**. |\n\n**have been to**와 **have gone to**는 뜻이 다릅니다.\n\n- She **has been to** London. → 런던에 **가 본 적이 있다**(다녀와서 지금은 여기 있다)\n- She **has gone to** London. → 런던에 **가 버렸다**(그래서 지금 여기 없다)\n\n> 💡 대답은 짧게 Yes, I have. / No, I haven\'t. 또는 No, never. 라고 합니다.',
        easy: '이력서의 "경력" 칸을 떠올려 보세요. 경력 칸에는 언제 했는지보다 **해 본 적이 있는지**가 중요합니다. 현재완료의 경험이 바로 그런 말입니다.\n\n- 해 봤다 → I have done it.\n- 한 번도 안 해 봤다 → I have **never** done it.\n- 해 본 적 있어요? → Have you **ever** done it?',
        check: {
          type: 'choice',
          q: '"제주도에 가 본 적이 있습니까?"를 영어로 바르게 옮긴 것을 고르세요.',
          choices: ['Do you ever go to Jeju?', 'Have you ever go to Jeju?', 'Have you ever been to Jeju?'],
          answer: 2,
          why: [
            'Do you ever go ~? 는 현재 시제라서 "제주도에 가끔 가세요?"라는 뜻입니다. 경험은 현재완료로 묻습니다.',
            'have 뒤에는 동사원형 go가 아니라 과거분사를 씁니다. "가 본 적이 있다"는 보통 have been to로 말합니다.',
            '',
          ],
          explain: '경험을 물을 때는 Have you ever + 과거분사 ~? 를 씁니다. "가 본 적이 있다"는 have been to로 나타내므로 **Have you ever been to Jeju?** 입니다.',
        },
      },
      {
        title: '계속 — "~해 왔다" (for, since)',
        body: '과거에 시작한 일이 **지금까지 이어질 때**도 현재완료를 씁니다. 우리말로는 "~해 왔다", "~째 ~하고 있다"입니다.\n\n- I **have lived** in Incheon **for** ten years. → 10년 동안 살아 왔다(지금도 산다)\n- She **has worked** here **since** 2020. → 2020년부터 여기서 일해 왔다(지금도 일한다)\n\n**for**와 **since**는 뒤에 오는 말로 고릅니다.\n\n| 말 | 뒤에 오는 것 | 예 |\n|---|---|---|\n| for (~ 동안) | **기간** — 얼마 동안 | for three days, for two years, for a long time |\n| since (~부터, ~ 이후로) | **시작 시점** — 언제부터 | since Monday, since 2019, since I was a child |\n\n기간을 물을 때는 **How long have you ~?** 를 씁니다.\n\n- **How long have you known** Minsu? — **For** five years. / **Since** college.\n\n> ⚠️ 우리말 "3년째 여기 살아요"를 현재형으로 I live here for three years. 라고 하지 않습니다. 지금까지 이어진 기간은 **I have lived here for three years.** 입니다.',
        easy: '달력에 시작한 날을 동그라미 치고 오늘까지 화살표를 그었다고 생각해 보세요.\n\n- 화살표의 **출발점**(동그라미 친 날)을 말하면 → since: since March\n- 화살표의 **길이**(몇 달·몇 년)를 말하면 → for: for six months\n\n화살표가 오늘까지 닿아 있으니 시제는 현재완료입니다.',
        check: {
          type: 'short', check: 'text',
          q: '빈칸에 for 또는 since 가운데 알맞은 것을 쓰세요.\n\nI have worked at this bank ___ 2021.',
          answer: ['since'],
          wrong: [{ a: 'for', why: '2021 — "얼마 동안"이 아니라 "언제부터"를 알려 주는 시작 시점입니다. 시작 시점 앞에는 since를 씁니다.' }],
          explain: '2021은 일을 시작한 때(시작 시점)이므로 **since**를 씁니다. "저는 2021년부터 이 은행에서 일해 왔습니다."',
        },
      },
      {
        title: '완료·결과 — just, already, yet',
        body: '어떤 일이 **지금 막 끝났거나, 이미 끝났거나, 아직 끝나지 않았는지** 말할 때도 현재완료를 씁니다.\n\n| 말 | 뜻 | 자리 | 예 |\n|---|---|---|---|\n| just | 막, 방금 | have·has와 과거분사 사이 | The bus **has just left**. |\n| already | 이미, 벌써 | have·has와 과거분사 사이 (주로 긍정문) | I **have already eaten** lunch. |\n| yet | 부정문: 아직 / 의문문: 벌써 | 문장 끝 | I **haven\'t finished** it **yet**. / **Have** you **finished** it **yet**? |\n\n**결과**를 말할 때도 씁니다. 과거의 일 때문에 **지금 어떤 상태인지**가 중요할 때입니다.\n\n- I **have lost** my wallet. → 지갑을 잃어버렸다(그래서 지금 지갑이 없다)\n- He **has broken** his leg. → 다리가 부러졌다(지금도 다친 상태다)\n\n> 💡 미국 영어의 일상 대화에서는 Did you eat yet?, I just ate. 처럼 just·already·yet을 과거형과 함께 쓰기도 합니다. 그래도 기본 꼴은 현재완료이니 이 단원에서는 현재완료로 익혀 둡니다.',
        easy: '일정표의 할 일 목록을 생각해 보세요.\n\n- 방금 줄을 그었다 → just: I have **just** sent the email.\n- 벌써 줄을 그어 두었다 → already: I have **already** sent it.\n- 아직 줄을 못 그었다 → not ~ yet: I haven\'t sent it **yet**.\n\n세 경우 모두 "지금 목록이 어떤 상태인지"를 말하니 현재완료입니다.',
        check: {
          type: 'choice',
          q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n저는 아직 그 보고서를 끝내지 못했습니다.\n→ I haven\'t finished the report ___.',
          choices: ['already', 'just', 'yet'],
          answer: 2,
          why: [
            'already(이미, 벌써) — 주로 긍정문에서 "이미 했다"고 할 때 씁니다. 부정문의 "아직"이 아닙니다.',
            'just(막, 방금) — have·has와 과거분사 사이에 써서 "막 끝냈다"는 뜻입니다.',
            '',
          ],
          explain: '부정문에서 "아직 (~하지 않았다)"는 문장 끝에 **yet**을 씁니다: **I haven\'t finished the report yet.**',
        },
      },
      {
        title: '현재완료와 과거 시제 구별하기',
        body: '두 시제는 우리말로 똑같이 "~했다"로 옮겨질 때가 많지만 보는 곳이 다릅니다.\n\n- **과거 시제**: 과거의 **끝난 일**만 말합니다. 지금 어떤지는 말하지 않습니다.\n- **현재완료**: 과거의 일이 **지금과 이어져** 있습니다(경험·계속·완료·결과).\n\n| 과거 시제 | 현재완료 |\n|---|---|\n| I **lost** my key. (잃어버렸다 — 지금 찾았는지는 모름) | I **have lost** my key. (잃어버려서 지금도 없다) |\n| I **lived** in Busan for five years. (지금은 부산에 살지 않는다) | I **have lived** in Busan for five years. (지금도 부산에 산다) |\n\n**분명한 과거 시점**을 나타내는 말이 있으면 현재완료를 쓰지 않고 **과거 시제**를 씁니다.\n\n- yesterday, last week, two days ago, in 2019, when I was young\n- When ~? / What time ~? 으로 때를 묻는 의문문\n\n| ✗ | ○ |\n|---|---|\n| I have seen him yesterday. | I **saw** him yesterday. |\n| When have you arrived? | When **did** you **arrive**? |\n\n> 💡 "언제?"에 딱 답할 수 있는 시점이 문장에 있으면 과거, 지금까지의 이야기면 현재완료라고 기억합니다.',
        easy: '사진과 동영상으로 비교해 볼 수 있습니다.\n\n- 과거 시제는 **사진** 한 장입니다. "어제 이랬다"는 그 순간만 찍혀 있고 지금 모습은 없습니다.\n- 현재완료는 과거에서 **지금까지 이어지는 동영상**입니다. 마지막 장면이 지금입니다.\n\n그래서 yesterday처럼 사진 찍은 날짜가 붙으면 과거 시제를 씁니다.',
        check: {
          type: 'ox',
          q: '다음 문장은 바른 문장입니다.\n\nI have visited Gyeongju last year.',
          answer: false,
          explain: 'last year(작년)는 분명한 과거 시점이라서 현재완료와 함께 쓰지 않습니다. **I visited Gyeongju last year.** 로 고칩니다. 경험만 말하려면 시점을 빼고 I have visited Gyeongju. 라고 합니다.',
        },
      },
    ],

    examples: [
      {
        q: '괄호 안의 동사를 현재완료로 바꾸어 문장을 완성해 보세요.\n\nMinsu ___ (live) in Daejeon since 2020.',
        steps: [
          '주어 Minsu는 한 사람(3인칭 단수)이므로 have가 아니라 has를 씁니다.',
          'live는 규칙 동사라서 과거분사가 lived입니다.',
          'since 2020(2020년부터)이 있으니 지금까지 이어지는 "계속"의 뜻입니다. has lived로 씁니다.',
        ],
        answer: 'Minsu has lived in Daejeon since 2020. (민수는 2020년부터 대전에 살고 있습니다.)',
      },
      {
        q: '괄호 안에서 알맞은 것을 고르세요.\n\n(1) I (lost / have lost) my umbrella yesterday.\n(2) I (lost / have lost) my umbrella, so I need to buy a new one.',
        steps: [
          '(1)에는 yesterday(어제)라는 분명한 과거 시점이 있습니다. 그래서 과거 시제 lost를 씁니다.',
          '(2)는 우산을 잃어버려서 지금 우산이 없다는 결과를 말합니다. 지금과 이어지므로 have lost가 자연스럽습니다.',
        ],
        answer: '(1) lost — 어제 우산을 잃어버렸습니다. (2) have lost — 우산을 잃어버려서 새로 사야 합니다.',
      },
    ],

    terms: [
      { term: '현재완료', def: 'have·has + 과거분사로, 과거의 일이 지금과 이어져 있음을 나타내는 시제입니다. 예: I have finished my work.' },
      { term: '과거분사', def: '동사의 셋째 모양입니다. 규칙 동사는 -ed를 붙이고(worked), 불규칙 동사는 따로 익힙니다(go – went – gone).' },
      { term: '불규칙 동사', def: '과거형·과거분사를 -ed로 만들지 않는 동사입니다. 예: eat – ate – eaten, buy – bought – bought' },
      { term: '경험', def: '현재완료의 쓰임 가운데 "~해 본 적이 있다"는 뜻입니다. ever, never, before, once, twice와 자주 씁니다.' },
      { term: '계속', def: '현재완료의 쓰임 가운데 "~해 왔다, ~째 ~하고 있다"는 뜻입니다. for(기간), since(시작 시점)와 자주 씁니다.' },
      { term: '완료', def: '현재완료의 쓰임 가운데 "막·이미 ~했다, 아직 ~하지 않았다"는 뜻입니다. just, already, yet과 자주 씁니다.' },
      { term: '결과', def: '현재완료의 쓰임 가운데 과거의 일 때문에 지금 어떤 상태인지를 나타내는 뜻입니다. 예: I have lost my key. (그래서 지금 열쇠가 없다)' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'text', concept: 0,
        q: '다음 동사의 과거분사를 쓰세요.\n\neat',
        answer: ['eaten'],
        wrong: [
          { a: 'ate', why: 'ate — 과거형입니다. 현재완료에 쓰는 셋째 모양(과거분사)은 eaten입니다.' },
          { a: 'eated', why: 'eat는 -ed를 붙이지 않는 불규칙 동사입니다. eat – ate – eaten으로 외워 둡니다.' },
        ],
        explain: 'eat – ate – **eaten**. 예: I have already eaten breakfast. (저는 이미 아침을 먹었습니다.)',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 말을 고르세요.\n\nMy brother ___ a new car.',
        choices: ['has buyed', 'have bought', 'has bought', 'has buy'],
        answer: 2,
        why: [
          'buy는 불규칙 동사라서 -ed를 붙이지 않습니다. buy – bought – bought입니다.',
          '주어 my brother는 3인칭 단수라서 has를 씁니다.',
          '',
          'has 뒤에는 동사원형이 아니라 과거분사를 씁니다.',
        ],
        explain: '주어가 3인칭 단수이므로 has, buy의 과거분사는 bought입니다: **My brother has bought a new car.** "제 남동생이 새 차를 샀습니다."',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n저는 그 영화를 한 번도 본 적이 없습니다.\n→ I have ___ seen that movie.',
        choices: ['ever', 'never', 'yet', 'just'],
        answer: 1,
        why: [
          'ever(한 번이라도) — 주로 의문문에 씁니다. "한 번도 ~ 않다"는 never입니다.',
          '',
          'yet — 부정문의 문장 끝에서 "아직"이라는 뜻입니다. 과거분사 앞에 오지 않습니다.',
          'just(막, 방금) — "막 보았다"는 뜻이 됩니다.',
        ],
        explain: '"한 번도 ~한 적이 없다"는 have never + 과거분사입니다: **I have never seen that movie.**',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 2,
        q: '다음 문장은 바른 문장입니다.\n\nShe has lived here since three years.',
        answer: false,
        explain: 'three years(3년)는 "언제부터"가 아니라 "얼마 동안"을 나타내는 기간입니다. 기간 앞에는 for를 씁니다: **She has lived here for three years.** since 뒤에는 since 2023처럼 시작 시점이 옵니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 3,
        q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n저는 방금 역에 도착했습니다.\n→ I have ___ arrived at the station.',
        choices: ['just', 'yet', 'ever', 'since'],
        answer: 0,
        why: [
          '',
          'yet — 부정문·의문문의 문장 끝에 씁니다. 긍정문의 과거분사 앞에는 오지 않습니다.',
          'ever — 의문문에서 "한 번이라도"라는 경험을 물을 때 씁니다.',
          'since — "~부터"라는 뜻이라 뒤에 시작 시점이 와야 합니다.',
        ],
        explain: '"방금"은 have·has와 과거분사 사이에 **just**를 씁니다: **I have just arrived at the station.**',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'text', concept: 0,
        q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 쓰세요.\n\nI have ___ (write) three emails this morning.',
        answer: ['written'],
        hint: 'have 뒤에는 과거분사가 옵니다.',
        wrong: [
          { a: 'wrote', why: 'wrote — 과거형입니다. have 뒤에는 과거분사 written을 씁니다.' },
          { a: 'writed', why: 'write는 불규칙 동사입니다. write – wrote – written으로 외워 둡니다.' },
          { a: 'write', why: 'have 뒤에는 동사원형이 아니라 과거분사를 씁니다.' },
        ],
        explain: 'write – wrote – **written**. "저는 오늘 아침에 이메일을 세 통 썼습니다." (아직 오전이라 오늘 아침이 끝나지 않았을 때의 말입니다.)',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 말을 고르세요.\n\nWe ___ the museum last Saturday.',
        choices: ['have visited', 'visited', 'has visited'],
        answer: 1,
        why: [
          'last Saturday(지난 토요일)는 분명한 과거 시점이라서 현재완료와 함께 쓰지 않습니다.',
          '',
          '분명한 과거 시점이 있어 현재완료를 쓰지 않고, 주어 we에는 has도 맞지 않습니다.',
        ],
        explain: '분명한 과거 시점(last Saturday)이 있으므로 과거 시제 **visited**를 씁니다. "우리는 지난 토요일에 박물관에 갔습니다."',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 말을 고르세요.\n\nJia ___ to Canada. She lives there now, so I can\'t see her often.',
        choices: ['has been', 'have gone', 'has gone'],
        answer: 2,
        hint: '지아가 지금 어디에 있는지 보세요.',
        why: [
          'has been to는 "가 본 적이 있다(다녀왔다)"는 경험입니다. 지아는 지금 캐나다에 살고 있으니 맞지 않습니다.',
          '주어 Jia는 3인칭 단수라서 have가 아니라 has를 씁니다.',
          '',
        ],
        explain: '지아는 캐나다로 가 버려서 지금 여기 없습니다. 이런 결과는 **has gone to**로 나타냅니다. "지아는 캐나다로 갔습니다. 지금 거기 살아서 자주 볼 수 없습니다."',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'text', concept: 2,
        q: '빈칸에 알맞은 한 낱말을 쓰세요.\n\n___ long have you known Minsu?\n— For about ten years.',
        answer: ['How'],
        hint: '기간을 묻는 의문문입니다.',
        wrong: [
          { a: 'What', why: 'What long이라는 표현은 없습니다. 기간은 How long으로 묻습니다.' },
          { a: 'When', why: 'When은 "언제"를 묻고, 대답이 For about ten years(약 10년 동안)이니 기간을 묻는 How long이 맞습니다.' },
        ],
        explain: '"얼마나 오래 ~해 왔나요?"는 **How long** have you + 과거분사 ~? 입니다. "민수를 안 지 얼마나 됐어요? — 10년쯤 됐어요."',
      },
      {
        id: 'p10', level: 2, type: 'order', concept: 2,
        q: '우리말에 맞게 배열하세요.\n\n저는 10년 동안 영어를 가르쳐 왔습니다.',
        choices: ['I', 'have taught', 'English', 'for', 'ten years'],
        answer: [0, 1, 2, 3, 4],
        hint: '주어 + have + 과거분사 + 목적어 + 기간 순서입니다.',
        explain: '**I have taught English for ten years.** 지금까지 이어지는 일이라 현재완료(teach – taught – taught), 기간(ten years) 앞에는 for를 씁니다. 목적어 English는 동사 바로 뒤에 둡니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 4,
        q: '**바른** 문장을 고르세요.',
        choices: ['I have seen him yesterday.', 'When have you arrived?', 'She has lived here since 2019.', 'He has left two hours ago.'],
        answer: 2,
        why: [
          'yesterday는 분명한 과거 시점입니다. I saw him yesterday. 로 고칩니다.',
          'When으로 때를 묻는 의문문에는 현재완료를 쓰지 않습니다. When did you arrive? 로 고칩니다.',
          '',
          'two hours ago(두 시간 전)는 분명한 과거 시점입니다. He left two hours ago. 로 고칩니다.',
        ],
        explain: 'since 2019(2019년부터)는 지금까지 이어지는 기간을 나타내므로 현재완료와 잘 어울립니다. 나머지는 모두 분명한 과거 시점과 현재완료를 함께 써서 틀렸습니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'text', concept: 3,
        q: '우리말에 맞게 빈칸에 알맞은 한 낱말을 쓰세요.\n\n그 기차는 아직 도착하지 않았습니다.\n→ The train hasn\'t arrived ___.',
        answer: ['yet'],
        wrong: [
          { a: 'already', why: 'already(이미) — 주로 긍정문에서 "벌써 했다"고 할 때 씁니다. 부정문 끝의 "아직"은 yet입니다.' },
          { a: 'still', why: 'still(여전히) — 부정문에서는 The train still hasn\'t arrived. 처럼 have 앞에 씁니다. 문장 끝의 "아직"은 yet입니다.' },
        ],
        explain: '부정문의 문장 끝에서 "아직"은 **yet**입니다: **The train hasn\'t arrived yet.**',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 4,
        q: '다음 문장에서 알 수 있는 것을 고르세요.\n\nI have lost my glasses.',
        choices: ['안경을 어제 잃어버렸다.', '안경을 잃어버렸다가 다시 찾았다.', '안경을 잃어버려서 지금도 없다.', '안경을 곧 잃어버릴 것 같다.'],
        answer: 2,
        why: [
          '현재완료에는 언제 잃어버렸는지가 들어 있지 않습니다. "어제"라고 말하려면 I lost my glasses yesterday. 처럼 과거 시제를 씁니다.',
          '다시 찾았다면 지금과 이어지는 결과가 없으니 현재완료로 말하지 않습니다.',
          '',
          '현재완료는 이미 일어난 일을 말합니다. 앞으로의 일이 아닙니다.',
        ],
        explain: '현재완료의 **결과** 쓰임입니다. 과거에 잃어버린 일 때문에 **지금 안경이 없다**는 뜻이 담겨 있습니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'text', concept: 2,
        q: '두 문장을 한 문장으로 바꾸었습니다. 빈칸에 알맞은 한 낱말을 쓰세요.\n\nI started studying English three years ago. I still study it now.\n→ I have ___ English for three years.',
        answer: ['studied', 'learned', 'learnt'],
        hint: '3년 전에 시작해 지금도 하고 있으니 현재완료(계속)입니다.',
        wrong: [
          { a: 'study', why: 'have 뒤에는 동사원형이 아니라 과거분사를 씁니다.' },
          { a: 'studyed', why: '"자음 + y"로 끝나는 동사는 y를 i로 바꾸고 -ed를 붙입니다: studied' },
          { a: 'started', why: 'I have started English for three years. 는 어색합니다. 시작하는 일은 한순간이라 for(~ 동안)와 함께 쓰지 않습니다. 3년 동안 이어진 것은 공부입니다.' },
        ],
        explain: '3년 전에 시작해 지금까지 이어지는 일이므로 현재완료 계속: **I have studied English for three years.** (같은 뜻으로 learned를 써도 맞습니다.)',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 1,
        q: '대화의 빈칸에 들어갈 대답으로 가장 알맞은 것을 고르세요.\n\nA: Have you ever tried Mexican food?\nB: ___',
        choices: ['Yes, I did. I have tried it last month.', 'Yes, I have. I tried it last month.', 'No, I haven\'t tried yet it.', 'Yes, I have tried it yesterday.'],
        answer: 1,
        why: [
          'Have you ~? 로 물었으니 Yes, I have. 로 답합니다. 또 last month(지난달)와 현재완료는 함께 쓰지 않습니다.',
          '',
          'yet은 문장 끝에 씁니다(I haven\'t tried it yet). 게다가 "벌써/아직"이 아니라 경험을 물었습니다.',
          'yesterday(어제)는 분명한 과거 시점이라 현재완료와 함께 쓰지 않습니다.',
        ],
        explain: '경험을 묻는 Have you ever ~? 에는 **Yes, I have.** 로 답하고, 언제 했는지 덧붙일 때는 분명한 과거 시점이 생기니 **과거 시제**(I tried it last month)로 바꿉니다.',
      },
      {
        id: 'a4', level: 3, type: 'ox', concept: 4,
        q: '다음 두 질문은 둘 다 바른 문장입니다.\n\nWhen did you move to Seoul?\nWhen have you moved to Seoul?',
        answer: false,
        explain: 'When(언제)은 분명한 과거 시점을 묻는 말이라 현재완료와 함께 쓰지 않습니다. **When did you move to Seoul?** 만 바릅니다. 지금까지의 기간을 묻고 싶으면 How long have you lived in Seoul? 이라고 합니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 4,
        q: '두 빈칸에 들어갈 말을 차례대로 바르게 짝지은 것을 고르세요.\n\nMy family ___ to Incheon in 2015. We ___ there since then.',
        choices: ['have moved — lived', 'moved — lived', 'moved — have lived', 'have moved — have lived'],
        answer: 2,
        hint: '첫 문장과 둘째 문장에서 때를 나타내는 말을 찾아보세요.',
        why: [
          '첫 문장에는 in 2015라는 분명한 과거 시점이 있어 과거 시제를, 둘째 문장에는 since then(그때부터)이 있어 현재완료를 씁니다. 거꾸로 썼습니다.',
          '둘째 문장의 since then(그때부터)은 지금까지 이어지는 일을 나타내므로 현재완료를 씁니다.',
          '',
          '첫 문장의 in 2015는 분명한 과거 시점이라서 현재완료와 함께 쓰지 않습니다.',
        ],
        explain: 'in 2015(분명한 과거 시점) → **moved**, since then(그때부터 지금까지) → **have lived**. "우리 가족은 2015년에 인천으로 이사했습니다. 그때부터 거기 살고 있습니다."',
      },
      {
        id: 'a6', level: 3, type: 'order', concept: 1,
        q: '우리말에 맞게 배열하세요.\n\n당신은 혼자 여행해 본 적이 있습니까?',
        choices: ['Have', 'you', 'ever', 'traveled', 'alone'],
        answer: [0, 1, 2, 3, 4],
        hint: '경험을 묻는 의문문은 Have + 주어 + ever + 과거분사 순서입니다.',
        explain: '**Have you ever traveled alone?** ever는 과거분사 앞에 둡니다. (영국 영어에서는 travelled로 씁니다.)',
      },
    ],

    deeper: [
      {
        title: '우리말 "~했다"는 두 가지 영어가 된다',
        body: '우리말은 "밥 먹었어?"처럼 과거와 현재완료를 모두 "~했다"로 말합니다. 그래서 한국어로 생각하면 둘을 구별하기 어렵습니다.\n\n영어로 옮기기 전에 이렇게 물어보면 도움이 됩니다.\n\n1. 문장에 "언제"가 분명히 있는가? (어제, 지난주, 3년 전) → 과거 시제\n2. 그 일이 지금 상태와 이어지는가? (지금도 산다, 지금 지갑이 없다, 해 본 경험이 있다) → 현재완료\n\n또 영국 영어는 현재완료를 더 자주 쓰고, 미국 영어의 일상 대화는 Did you eat yet? 처럼 과거형을 쓰는 일이 많습니다. 둘 다 실제로 쓰이는 영어이지만, 시험이나 격식 있는 글에서는 현재완료가 기본입니다.',
      },
      {
        title: '한 걸음 더 — 자주 쓰는 현재완료 표현',
        body: '현재완료는 일상 인사와 짧은 말에 자주 나옵니다.\n\n- **It\'s been a long time.** (오랜만이에요.) — It has been의 줄임말입니다.\n- **I\'ve heard a lot about you.** (말씀 많이 들었습니다.)\n- **Have you heard the news?** (소식 들었어요?)\n\n지금까지 계속 "하고 있는 동작"을 강조할 때는 have been + -ing(현재완료 진행형)도 씁니다. I have been waiting for an hour. (한 시간째 기다리고 있어요.) 이 단원의 for·since 쓰임을 알면 이 표현도 쉽게 이해할 수 있습니다.',
      },
    ],

    faq: [
      {
        q: '현재완료랑 과거는 뭐가 달라요? 둘 다 "~했다"잖아요.',
        a: '과거 시제는 과거의 한 시점에 **끝난 일**만 말하고, 현재완료는 그 일이 **지금과 이어져** 있다고 말합니다. I lost my key. 는 열쇠를 잃어버린 사실만 말하지만, I have lost my key. 는 "그래서 지금 열쇠가 없다"는 뜻까지 담습니다.\n\nyesterday, last year, ago처럼 분명한 과거 시점이 있으면 과거 시제를 씁니다.',
      },
      {
        q: 'for랑 since는 어떻게 구별해요?',
        a: '뒤에 오는 말을 보면 됩니다. "얼마 동안"을 나타내는 기간(three years, two hours, a long time) 앞에는 for, "언제부터"를 나타내는 시작 시점(2019, Monday, last summer, I was a child) 앞에는 since를 씁니다.\n\n우리말 "~ 동안"이면 for, "~부터"이면 since라고 생각해도 대부분 맞습니다.',
      },
      {
        q: 'He\'s는 he is예요, he has예요?',
        a: '둘 다 될 수 있어서 뒤를 봐야 합니다. 뒤에 과거분사가 오면 has입니다(He\'s gone home. = He has gone home.). 뒤에 형용사·명사·-ing가 오면 is입니다(He\'s tired. / He\'s a doctor. / He\'s working.).',
      },
    ],

    mistakes: [
      '분명한 과거 시점과 현재완료를 함께 쓰는 실수 — I have seen him yesterday. (✗) → I saw him yesterday. (○)',
      'have·has 뒤에 과거형을 쓰는 실수 — I have went there. / She has ate lunch. (✗) → I have gone there. / She has eaten lunch. (○)',
      '"~째 하고 있다"를 현재형으로 말하는 실수 — I live here for five years. (✗) → I have lived here for five years. (○). 기간 앞에는 for, 시작 시점 앞에는 since를 씁니다.',
    ],

    gens: [
      {
        id: 'past-participle',
        level: 1,
        title: '과거분사 쓰기',
        make: function (R) {
          var v = R.pick(PP);
          var wrong = v[4].map(function (w) {
            var why;
            if (w[1] === 'past') why = w[0] + ' — 과거형입니다. have·has 뒤에 쓰는 셋째 모양(과거분사)은 ' + v[2] + '입니다.';
            else if (w[1] === 'base') why = '원형 그대로입니다. 규칙 동사는 -ed를 붙여 과거분사를 만듭니다.';
            else why = w[1];
            return { a: w[0], why: why };
          });
          return {
            type: 'short', check: 'text', concept: 0,
            q: '다음 동사의 과거분사를 쓰세요.\n\n' + v[0],
            answer: [v[2]],
            hint: '원형 – 과거형 – 과거분사 순서로 소리 내어 말해 보세요.',
            wrong: wrong,
            explain: PP_RULE[v[3]] + '\n\n' + v[0] + ' – ' + v[1] + ' – **' + v[2] + '**',
          };
        },
      },
      {
        id: 'for-since',
        level: 1,
        title: 'for와 since 고르기',
        make: function (R) {
          var it = R.pick(FS);
          var other = it[1] === 'for' ? 'since' : 'for';
          return {
            type: 'short', check: 'text', concept: 2,
            q: '빈칸에 for 또는 since 가운데 알맞은 것을 쓰세요.\n\n' + it[0],
            answer: [it[1]],
            hint: '빈칸 뒤의 말이 "얼마 동안"인지 "언제부터"인지 보세요.',
            wrong: [{ a: other, why: it[2] + ' — ' + FS_WHY[it[1]] }],
            explain: it[2] + ' — ' + FS_WHY[it[1]] + '\n\n바른 문장: ' + it[0].replace('___', it[1]) + '\n(' + it[3] + ')',
          };
        },
      },
      {
        id: 'perfect-or-past',
        level: 2,
        title: '과거 시제와 현재완료 고르기',
        make: function (R) {
          var it = R.pick(PV);
          var perf = it.aux + ' ' + it.pp;
          var bad = it.bad ? it.bad : [it.aux + ' ' + it.base, 'have·has 뒤에는 동사원형이 아니라 과거분사(' + it.pp + ')를 씁니다.'];
          var badWhy = it.ans === 'perf' ? bad[1] : bad[1] + ' 게다가 이 문장에는 분명한 과거 시점(' + it.cue + ')이 있어 과거 시제를 씁니다.';
          var choices = [it.past, perf, bad[0]];
          var reason = it.ans === 'perf'
            ? CUE_WHY[it.cue]
            : it.cue + ' — 분명한 과거 시점입니다. 분명한 과거 시점이 있으면 현재완료를 쓰지 않고 과거 시제를 씁니다.';
          var why = it.ans === 'perf'
            ? [it.past + ' — 과거 시제입니다. ' + CUE_WHY[it.cue], '', badWhy]
            : ['', perf + ' — 현재완료입니다. ' + reason, badWhy];
          return {
            type: 'choice', concept: 4,
            q: '빈칸에 알맞은 말을 고르세요.\n\n' + it.s,
            choices: choices,
            answer: it.ans === 'perf' ? 1 : 0,
            hint: '문장에서 때를 나타내는 말을 찾아보세요.',
            why: why,
            explain: reason + '\n\n바른 문장: ' + it.s.replace('___', it.ans === 'perf' ? perf : it.past) + '\n(' + it.ko + ')',
          };
        },
      },
    ],

    vocab: [
      { w: 'already', m: '이미, 벌써', ex: 'I have already paid the bill.', exm: '저는 이미 요금을 냈습니다.' },
      { w: 'yet', m: '(부정문) 아직, (의문문) 벌써', ex: 'Have you booked the tickets yet?', exm: '벌써 표를 예매했나요?' },
      { w: 'ever', m: '(의문문) 지금까지 한 번이라도', ex: 'Have you ever lived abroad?', exm: '외국에서 살아 본 적이 있나요?' },
      { w: 'never', m: '한 번도 ~ 않다', ex: 'My father has never missed a day of work.', exm: '아버지는 한 번도 결근한 적이 없습니다.' },
      { w: 'since', m: '~부터, ~ 이후로', ex: 'We have been friends since college.', exm: '우리는 대학 때부터 친구로 지냈습니다.' },
      { w: 'abroad', m: '외국에(서), 해외로', ex: 'She has traveled abroad many times.', exm: '그녀는 해외여행을 여러 번 했습니다.' },
      { w: 'arrive', m: '도착하다', ex: 'Your package has just arrived.', exm: '고객님의 소포가 방금 도착했습니다.' },
      { w: 'lose', m: '잃어버리다 (lose – lost – lost)', ex: 'I have lost my bus card again.', exm: '버스 카드를 또 잃어버렸습니다.' },
      { w: 'borrow', m: '빌리다', ex: 'I have borrowed three books from the library.', exm: '저는 도서관에서 책을 세 권 빌렸습니다.' },
      { w: 'recently', m: '최근에', ex: 'My sister has recently started a new job.', exm: '제 언니는 최근에 새 일을 시작했습니다.' },
      { w: 'twice', m: '두 번', ex: 'I have been to Jeju twice.', exm: '저는 제주도에 두 번 가 봤습니다.' },
      { w: 'experience', m: '경험', ex: 'Living alone was a good experience for me.', exm: '혼자 살아 본 것은 제게 좋은 경험이었습니다.' },
      { w: 'married', m: '결혼한', ex: 'They have been married for twenty years.', exm: '그들은 결혼한 지 20년 되었습니다.' },
    ],
  });
})();
