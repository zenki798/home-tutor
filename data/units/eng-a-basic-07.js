/* 다시 시작하는 영어 기초 문법 · 과거 시제
 * 예문은 모두 직접 쓴 문장이다(가상의 인물). 영어 낱말 바로 뒤에는 받침에 따라 바뀌는 조사를 붙이지 않는다. */
(function () {
  // 과거형 생성기: [원형, [정답 과거형들], 규칙, 흔한 틀린 꼴]
  var PAST = [
    ['work', ['worked'], 'ed', ''],
    ['play', ['played'], 'vy', 'plaied'],
    ['live', ['lived'], 'e', 'liveed'],
    ['like', ['liked'], 'e', 'likeed'],
    ['study', ['studied'], 'cy', 'studyed'],
    ['cry', ['cried'], 'cy', 'cryed'],
    ['try', ['tried'], 'cy', 'tryed'],
    ['carry', ['carried'], 'cy', 'carryed'],
    ['stop', ['stopped'], 'double', 'stoped'],
    ['drop', ['dropped'], 'double', 'droped'],
    ['plan', ['planned'], 'double', 'planed'],
    ['visit', ['visited'], 'ed', 'visitted'],
    ['open', ['opened'], 'ed', 'openned'],
    ['enjoy', ['enjoyed'], 'vy', 'enjoied'],
    ['stay', ['stayed'], 'vy', 'staied'],
    ['move', ['moved'], 'e', 'moveed'],
    ['go', ['went'], 'irr', 'goed'],
    ['eat', ['ate'], 'irr', 'eated'],
    ['see', ['saw'], 'irr', 'seed'],
    ['come', ['came'], 'irr', 'comed'],
    ['have', ['had'], 'irr', 'haved'],
    ['get', ['got'], 'irr', 'getted'],
    ['make', ['made'], 'irr', 'maked'],
    ['take', ['took'], 'irr', 'taked'],
    ['buy', ['bought'], 'irr', 'buyed'],
    ['meet', ['met'], 'irr', 'meeted'],
    ['write', ['wrote'], 'irr', 'writed'],
    ['give', ['gave'], 'irr', 'gived'],
    ['leave', ['left'], 'irr', 'leaved'],
    ['sleep', ['slept'], 'irr', 'sleeped'],
    ['drink', ['drank'], 'irr', 'drinked'],
    ['say', ['said'], 'irr', 'sayed'],
    ['think', ['thought'], 'irr', 'thinked'],
    ['teach', ['taught'], 'irr', 'teached'],
    ['speak', ['spoke'], 'irr', 'speaked'],
    ['lose', ['lost'], 'irr', 'losed'],
    ['pay', ['paid'], 'irr', 'payed'],
    ['put', ['put'], 'same', 'putted'],
    ['cut', ['cut'], 'same', 'cutted'],
  ];
  var PAST_RULE = {
    ed: '대부분의 동사는 끝에 -ed 꼬리를 붙입니다. 끝 자음을 겹치지 않습니다(강세가 앞에 있는 visit, open 같은 2음절 동사도).',
    e: '끝이 -e 인 동사는 -d만 붙입니다.',
    cy: '"자음 + y"로 끝나는 동사는 끝 y 대신 -ied를 붙입니다.',
    vy: '"모음 + y"로 끝나는 동사는 y를 그대로 두고 -ed를 붙입니다.',
    double: '"짧은 모음 하나 + 자음 하나"로 끝나는 1음절 동사는 끝 자음을 한 번 더 쓰고 -ed를 붙입니다.',
    irr: '-ed를 붙이지 않는 불규칙 동사입니다. 따로 익혀 둡니다.',
    same: '원형과 과거형의 모양이 같은 불규칙 동사입니다.',
  };

  // was·were 생성기: [문장, 정답, 현재형, 주어 설명, 뜻]
  var BE_PAST = [
    ['I ___ very tired last night.', 'was', 'am', '주어가 I', '저는 어젯밤에 무척 피곤했습니다.'],
    ['My parents ___ at home yesterday.', 'were', 'are', '주어가 my parents(두 사람)', '부모님은 어제 집에 계셨습니다.'],
    ['The movie ___ boring last night.', 'was', 'is', '주어가 the movie(하나)', '어젯밤 그 영화는 지루했습니다.'],
    ['We ___ in Jeju last week.', 'were', 'are', '주어가 we(여럿)', '우리는 지난주에 제주에 있었습니다.'],
    ['Jia ___ late for the meeting yesterday morning.', 'was', 'is', '주어가 Jia(한 사람)', '지아는 어제 아침 회의에 늦었습니다.'],
    ['You ___ right about the weather yesterday.', 'were', 'are', '주어가 you', '어제 날씨에 관해서는 당신 말이 맞았습니다.'],
    ['The shops ___ closed on New Year\'s Day last year.', 'were', 'are', '주어가 the shops(여럿)', '작년 1월 1일(새해 첫날)에는 가게들이 문을 닫았습니다.'],
    ['It ___ very cold two days ago.', 'was', 'is', '주어가 it', '이틀 전에는 무척 추웠습니다.'],
    ['Minsu and Seojun ___ classmates twenty years ago.', 'were', 'are', '주어가 Minsu and Seojun(두 사람)', '민수와 서준이는 20년 전에 같은 반이었습니다.'],
    ['My first car ___ small and old, but I loved it.', 'was', 'is', '주어가 my first car(하나)', '제 첫 차는 작고 낡았지만 저는 그 차를 무척 좋아했습니다.'],
    ['The children ___ hungry after the game last night.', 'were', 'are', '주어가 the children(여럿)', '어젯밤 경기가 끝나고 아이들은 배가 고팠습니다.'],
    ['She ___ a nurse ten years ago.', 'was', 'is', '주어가 she', '그녀는 10년 전에 간호사였습니다.'],
    ['They ___ at the library yesterday afternoon.', 'were', 'are', '주어가 they', '그들은 어제 오후에 도서관에 있었습니다.'],
    ['The test last week ___ easier than I expected.', 'was', 'is', '주어가 the test(하나)', '지난주 시험은 생각보다 쉬웠습니다.'],
    ['Your keys ___ on the kitchen table last night.', 'were', 'are', '주어가 your keys(여럿)', '당신 열쇠는 어젯밤 부엌 식탁 위에 있었습니다.'],
    ['He ___ sick last weekend.', 'was', 'is', '주어가 he', '그는 지난 주말에 아팠습니다.'],
    ['The weather ___ perfect for a picnic yesterday.', 'was', 'is', '주어가 the weather', '어제는 날씨가 소풍 가기에 딱 좋았습니다.'],
    ['My grandparents ___ farmers forty years ago.', 'were', 'are', '주어가 my grandparents(두 사람)', '40년 전에 제 조부모님은 농부셨습니다.'],
    ['I ___ born in Gwangju.', 'was', 'am', '주어가 I', '저는 광주에서 태어났습니다.'],
    ['The tickets ___ expensive last year.', 'were', 'are', '주어가 the tickets(여럿)', '작년에는 표가 비쌌습니다.'],
  ];

  // did 부정문·의문문 생성기: [주어, 과거형, 원형, 나머지, 대명사, 뜻]
  var DID = [
    ['Minsu', 'went', 'go', 'to the gym yesterday', 'he', '민수는 어제 체육관에 갔습니다.'],
    ['Jia', 'bought', 'buy', 'a new phone last week', 'she', '지아는 지난주에 새 휴대전화를 샀습니다.'],
    ['They', 'watched', 'watch', 'the game last night', 'they', '그들은 어젯밤에 경기를 보았습니다.'],
    ['You', 'called', 'call', 'me this morning', 'you', '당신은 오늘 아침에 제게 전화했습니다.'],
    ['Seojun', 'ate', 'eat', 'breakfast at seven', 'he', '서준이는 일곱 시에 아침을 먹었습니다.'],
    ['My sister', 'studied', 'study', 'Chinese in college', 'she', '언니는 대학에서 중국어를 공부했습니다.'],
    ['We', 'met', 'meet', 'our teacher at the station', 'we', '우리는 역에서 선생님을 만났습니다.'],
    ['Your son', 'cleaned', 'clean', 'his room on Saturday', 'he', '아드님은 토요일에 자기 방을 청소했습니다.'],
    ['The bus', 'arrived', 'arrive', 'on time yesterday', 'it', '어제는 버스가 제시간에 도착했습니다.'],
    ['Doyun', 'wrote', 'write', 'a letter to his grandmother', 'he', '도윤이는 할머니께 편지를 썼습니다.'],
    ['They', 'took', 'take', 'a taxi to the airport', 'they', '그들은 공항까지 택시를 탔습니다.'],
    ['Minsu', 'saw', 'see', 'the doctor last Monday', 'he', '민수는 지난 월요일에 병원에 갔습니다(의사를 만났습니다).'],
    ['Jia', 'left', 'leave', 'the office early', 'she', '지아는 일찍 퇴근했습니다.'],
    ['You', 'paid', 'pay', 'the phone bill last month', 'you', '당신은 지난달에 전화 요금을 냈습니다.'],
    ['My father', 'made', 'make', 'dinner for us', 'he', '아버지가 우리에게 저녁을 해 주셨습니다.'],
    ['The kids', 'played', 'play', 'soccer after school', 'they', '아이들은 방과 후에 축구를 했습니다.'],
    ['Hayun', 'visited', 'visit', 'her aunt in Daegu', 'she', '하윤이는 대구에 사는 이모를 찾아갔습니다.'],
    ['We', 'had', 'have', 'a meeting on Friday', 'we', '우리는 금요일에 회의를 했습니다.'],
    ['Sua', 'lost', 'lose', 'her umbrella on the subway', 'she', '수아는 지하철에서 우산을 잃어버렸습니다.'],
    ['The store', 'opened', 'open', 'at nine yesterday', 'it', '어제는 그 가게가 아홉 시에 문을 열었습니다.'],
  ];

  Tutor.registerUnit({
    id: 'eng-a-basic-07',
    course: 'eng-a-basic',
    title: '과거 시제',
    summary: '지난 일을 말하는 was·were와 일반동사 과거형, 자주 쓰는 불규칙 동사와 did 의문문을 익힙니다.',
    goals: [
      '주어에 맞게 be동사의 과거형 was·were를 쓸 수 있다.',
      '규칙 동사의 과거형(-ed)을 철자 규칙에 맞게 쓰고, 자주 쓰는 불규칙 동사의 과거형을 말할 수 있다.',
      'did를 써서 과거의 부정문과 의문문을 만들고 답할 수 있다.',
      'yesterday, ago, last ~ 같은 과거 시간 표현을 알맞게 쓸 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: 'be동사의 과거 — was, were',
        body: 'am·is·are의 과거형은 **was**와 **were** 두 가지뿐입니다. "~였다, ~에 있었다"라는 뜻입니다.\n\n| 현재 | 과거 | 쓰는 주어 |\n|---|---|---|\n| am, is | **was** | I, he, she, it, 한 사람·한 가지 |\n| are | **were** | you, we, they, 둘 이상 |\n\n- I **was** busy yesterday. (저는 어제 바빴습니다.)\n- They **were** at home last night. (그들은 어젯밤 집에 있었습니다.)\n\n부정문과 의문문은 현재와 만드는 법이 같습니다.\n\n| 부정문 (be동사 뒤에 not) | 의문문 (be동사를 주어 앞으로) |\n|---|---|\n| I **was not(wasn\'t)** busy. | **Was** she at work? — Yes, she was. / No, she wasn\'t. |\n| They **were not(weren\'t)** late. | **Were** you tired? — Yes, I was. / No, I wasn\'t. |\n\n> ⚠️ be동사 문장에는 did를 쓰지 않습니다. Did you tired? (✗) → **Were** you tired? (○)',
        easy: 'was와 were는 am·is·are가 "지난 일" 옷을 입은 모습입니다.\n\nam과 is는 둘 다 was로, are는 were로 바뀝니다. 그래서 "한 사람·하나면 was, you나 여럿이면 were"만 기억하면 됩니다.\n\n주의할 것은 you입니다. 한 사람에게 말해도 you는 늘 were입니다: You **were** right.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nMy parents ___ in Busan last weekend.',
          choices: ['was', 'were', 'are'],
          answer: 1,
          why: ['was — 한 사람·한 가지가 주어일 때 씁니다. 부모님(my parents)은 두 사람입니다.', '', 'are — 현재형입니다. 지난 주말(last weekend)은 과거입니다.'],
          explain: '주어 my parents는 둘 이상이고 last weekend는 과거이므로 **were**입니다. "부모님은 지난 주말에 부산에 계셨습니다."',
        },
      },
      {
        title: '규칙 동사의 과거형 — -ed',
        body: '일반동사 대부분은 끝에 **-ed**를 붙여 과거형을 만듭니다. 현재형과 달리 주어가 누구든 모양이 같습니다(3인칭 단수 -s 없음).\n\n- I **worked** late. / She **worked** late. / They **worked** late.\n\n끝 글자에 따라 붙이는 법이 조금씩 다릅니다.\n\n| 동사의 끝 | 붙이는 법 | 예 |\n|---|---|---|\n| 대부분 | + ed | work → worked, visit → visited, open → opened |\n| -e | + d | live → lived, like → liked, move → moved |\n| 자음 + y | 끝 y → ied | study → studied, cry → cried, try → tried |\n| 모음 + y | + ed | play → played, stay → stayed, enjoy → enjoyed |\n| 짧은 모음 + 자음 하나 (1음절) | 자음을 겹쳐 + ed | stop → stopped, plan → planned, drop → dropped |\n\n> 💡 -ed는 앞소리에 따라 소리가 조금 다릅니다. want, need처럼 t·d로 끝나는 동사는 wanted, needed로 한 음절이 더 붙어 소리 납니다.\n\n> ⚠️ visit, open처럼 강세가 앞에 있는 2음절 동사는 자음을 겹치지 않습니다. visitted (✗) → visited (○)',
        easy: '과거형은 동사 끝에 "지난 일" 꼬리표 -ed를 다는 일입니다. 현재형처럼 주어를 따질 필요가 없어 오히려 쉽습니다.\n\n꼬리표를 달 때 모양이 조금 바뀌는 경우만 챙기면 됩니다. 이미 e로 끝나면 d만(live → lived), 자음 뒤의 y는 i로 바꾸고(study → studied), 짧게 끝나는 말은 끝 글자를 하나 더 씁니다(stop → stopped).',
        check: {
          type: 'short', check: 'text',
          q: '다음 동사의 과거형을 쓰세요.\n\nstudy',
          answer: ['studied'],
          wrong: [
            { a: 'studyed', why: '"자음 + y"로 끝나는 동사는 y를 i로 바꾸고 -ed를 붙입니다.' },
            { a: 'studys', why: 'studys는 현재형의 틀린 철자입니다. 과거형은 -ed 꼬리를 붙입니다.' },
          ],
          explain: 'study는 "자음 + y"로 끝나므로 y를 i로 바꾸어 **studied**입니다.',
        },
      },
      {
        title: '자주 쓰는 불규칙 동사',
        body: '자주 쓰는 동사 가운데에는 -ed를 붙이지 않고 모양이 바뀌는 **불규칙 동사**가 많습니다. 생활에서 많이 쓰는 것부터 익혀 둡니다.\n\n| 원형 | 과거형 | 뜻 |\n|---|---|---|\n| go | **went** | 가다 |\n| eat | **ate** | 먹다 |\n| see | **saw** | 보다 |\n| come | **came** | 오다 |\n| have | **had** | 가지다, 먹다 |\n| do | **did** | 하다 |\n| get | **got** | 얻다, 받다 |\n| make | **made** | 만들다 |\n| take | **took** | 가져가다, (탈것을) 타다 |\n| buy | **bought** | 사다 |\n| meet | **met** | 만나다 |\n| write | **wrote** | 쓰다 |\n| leave | **left** | 떠나다 |\n| say | **said** | 말하다 |\n\n원형과 과거형의 모양이 같은 동사도 있습니다: put → **put**, cut → **cut**, read → **read** (read의 과거형은 철자는 같고 소리만 red와 같게 바뀝니다).\n\n- I **went** to the market and **bought** some fruit. (시장에 가서 과일을 좀 샀습니다.)\n\n> 💡 불규칙 동사는 소리가 비슷한 것끼리 묶어 외우면 쉽습니다: buy-bought, think-thought, bring-brought / drink-drank, swim-swam, sing-sang',
        easy: '불규칙 동사는 "자주 쓰는 말일수록 제멋대로"라고 생각하면 됩니다. go, eat, see, have처럼 하루에도 몇 번씩 쓰는 말이 대부분입니다.\n\n외울 때는 짝으로 소리 내어 묶어 두세요. go-went, eat-ate, see-saw … 노래 가사처럼 입에 붙으면 문장을 말할 때 저절로 나옵니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nI ___ Jia at the bus stop yesterday.',
          choices: ['saw', 'seed', 'see'],
          answer: 0,
          why: ['', 'see는 불규칙 동사라서 -ed를 붙이지 않습니다.', 'see는 현재형입니다. yesterday(어제)는 과거입니다.'],
          explain: 'yesterday가 있으니 과거형이 필요하고, see의 과거형은 불규칙하게 **saw**입니다. "어제 버스 정류장에서 지아를 보았습니다."',
        },
      },
      {
        title: 'did로 만드는 과거 부정문과 의문문',
        body: '일반동사의 과거 부정문과 의문문에는 **did**를 씁니다. 2단원의 do·does 자리에 did가 들어간다고 생각하면 됩니다. 주어가 누구든 did 하나입니다.\n\n| 문장 | 만드는 법 | 예 |\n|---|---|---|\n| 부정문 | 주어 + did not(didn\'t) + **동사원형** | I **didn\'t go** to work yesterday. |\n| 의문문 | Did + 주어 + **동사원형** ~? | **Did** you **go** to work yesterday? |\n| 대답 | Yes, 주어 + did. / No, 주어 + didn\'t. | Yes, I did. / No, I didn\'t. |\n| 의문사 의문문 | 의문사 + did + 주어 + 동사원형 ~? | **Where did** you **go**? |\n\ndid가 이미 "과거"를 나타내므로 뒤의 동사는 **원형**으로 돌아갑니다.\n\n> ⚠️ I didn\'t went. (✗) → I didn\'t **go**. (○) / Did she bought it? (✗) → Did she **buy** it? (○)\n\n> 💡 의문사가 주어일 때는 did를 쓰지 않습니다(6단원). **Who called** you? (누가 전화했어요?) / **What happened**? (무슨 일이 있었어요?)',
        easy: 'did는 "과거"라는 짐을 대신 들어 주는 도우미입니다.\n\ndid가 문장에 들어오면 과거라는 짐을 did가 들고 가니, 동사는 짐을 내려놓고 원래 모양(원형)으로 돌아옵니다. 그래서 Did you **go**?, I didn\'t **eat**.처럼 씁니다.\n\n과거 표시를 두 번(did + went) 하지 않는다고 기억하세요.',
        check: {
          type: 'ox',
          q: '다음 문장은 바른 문장입니다.\n\nDid you ate lunch?',
          answer: false,
          explain: 'did를 쓰면 동사는 원형입니다. **Did you eat lunch?**(점심 드셨어요?)로 고칩니다.',
        },
      },
      {
        title: '과거를 나타내는 시간 표현 — yesterday, ago, last ~',
        body: '과거 시제 문장에는 "언제"를 알려 주는 시간 표현이 자주 함께 옵니다. 이런 말이 보이면 동사를 과거형으로 씁니다.\n\n| 표현 | 뜻 | 예 |\n|---|---|---|\n| yesterday | 어제 | yesterday, yesterday morning(어제 아침) |\n| last + 때 | 지난 ~ | last night, last week, last Monday, last year |\n| 기간 + ago | ~ 전에 | two days ago, an hour ago, ten years ago |\n| in + 과거 연도 | ~년에 | in 2019 |\n| then | 그때 | I was a student then. |\n\n- I **moved** to Daejeon **three years ago**. (저는 3년 전에 대전으로 이사했습니다.)\n- We **had** a party **last Friday**. (우리는 지난 금요일에 파티를 했습니다.)\n\n> ⚠️ last와 yesterday 앞에는 on·in 같은 전치사를 쓰지 않습니다. on last Monday (✗) → last Monday (○)\n\n> ⚠️ ago는 기간 **뒤**에 둡니다. ago two days (✗) → two days ago (○)',
        easy: '시간 표현은 문장의 "날짜 도장"입니다. yesterday, last ~, ~ ago 도장이 찍혀 있으면 그 문장은 지난 일이니 동사도 과거형으로 맞춥니다.\n\nago는 우리말 "~ 전에"처럼 기간 뒤에 붙습니다. "이틀 전에" = two days ago.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nI started this job two years ___.',
          choices: ['ago', 'last', 'yesterday'],
          answer: 0,
          why: ['', 'last는 기간 앞에 쓰고(last year), 숫자 기간 뒤에는 쓰지 않습니다.', 'yesterday는 "어제"라서 two years와 함께 쓰지 않습니다.'],
          explain: '"2년 전에"는 기간 뒤에 ago를 붙여 **two years ago**입니다. "저는 2년 전에 이 일을 시작했습니다."',
        },
      },
    ],

    examples: [
      {
        q: '다음 문장을 last year를 넣어 과거 문장으로 바꾸고, 부정문과 의문문도 만들어 보세요.\n\nJia works at a bank.',
        steps: [
          '작년(last year)은 과거이므로 동사를 과거형으로 바꿉니다. work는 규칙 동사라 worked입니다. 과거형에는 3인칭 단수 -s가 없습니다.',
          '긍정문: Jia worked at a bank last year.',
          '부정문은 did not(didn\'t) + 동사원형: Jia didn\'t work at a bank last year.',
          '의문문은 Did + 주어 + 동사원형: Did Jia work at a bank last year? — Yes, she did. / No, she didn\'t.',
        ],
        answer: 'Jia worked at a bank last year. / Jia didn\'t work at a bank last year. / Did Jia work at a bank last year?',
      },
      {
        q: '어제 일을 쓴 글입니다. 괄호 안의 동사를 알맞은 꼴로 바꾸어 보세요.\n\nYesterday I (go) to the park. I (see) my old friend there. We (be) very happy.',
        steps: [
          'Yesterday가 있으니 모두 과거형입니다.',
          'go와 see는 불규칙 동사: go → went, see → saw',
          'be동사는 주어 we(여럿)에 맞추어 were입니다.',
        ],
        answer: 'Yesterday I went to the park. I saw my old friend there. We were very happy. (어제 공원에 갔습니다. 거기서 옛 친구를 보았습니다. 우리는 무척 기뻤습니다.)',
      },
    ],

    terms: [
      { term: '과거 시제', def: '이미 지나간 일을 나타내는 시제입니다. be동사는 was·were, 일반동사는 과거형(-ed 또는 불규칙 꼴)을 씁니다.' },
      { term: '과거형', def: '동사가 지난 일을 나타내도록 바뀐 꼴입니다. 주어와 관계없이 모양이 같습니다. 예: worked, went' },
      { term: '규칙 동사', def: '끝에 -ed를 붙여 과거형을 만드는 동사입니다. 예: work → worked, live → lived, study → studied' },
      { term: '불규칙 동사', def: '-ed를 붙이지 않고 모양이 바뀌는 동사입니다. 예: go → went, eat → ate, see → saw, put → put' },
      { term: 'did', def: '일반동사의 과거 부정문(didn\'t + 동사원형)과 의문문(Did + 주어 + 동사원형?)을 만드는 말입니다. do·does의 과거형이기도 합니다.' },
      { term: 'ago', def: '"~ 전에"라는 뜻으로 기간 뒤에 씁니다. 예: two days ago(이틀 전에), an hour ago(한 시간 전에)' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 말을 고르세요.\n\nThe restaurant ___ very crowded last night.',
        choices: ['was', 'were', 'is'],
        answer: 0,
        why: [
          '',
          'were — you나 둘 이상이 주어일 때 씁니다. 식당(the restaurant)은 하나입니다.',
          'is — 현재형입니다. 어젯밤(last night)은 과거입니다.',
        ],
        explain: '주어(the restaurant — 식당)는 하나이고 때(last night — 어젯밤)가 과거이므로 **was**입니다. "어젯밤에 그 식당은 무척 붐볐습니다."',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
        q: '다음 동사의 과거형을 쓰세요.\n\nstop',
        answer: ['stopped'],
        wrong: [
          { a: 'stoped', why: 'stop은 "짧은 모음 + 자음 하나"로 끝나는 1음절 동사라서 끝 자음 p를 한 번 더 씁니다.' },
          { a: 'stop', why: '원형 그대로입니다. 과거형은 -ed 꼬리를 붙입니다.' },
        ],
        explain: 'stop은 짧은 모음(o) + 자음 하나(p)로 끝나므로 p를 겹쳐 쓰고 -ed를 붙여 **stopped**입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '과거형이 **바르지 않은** 것을 고르세요.',
        choices: ['play → played', 'live → lived', 'cry → cryed', 'plan → planned'],
        answer: 2,
        why: [
          '"모음 + y"로 끝나므로 y를 그대로 두고 -ed를 붙입니다. 바릅니다.',
          '-e로 끝나므로 -d만 붙입니다. 바릅니다.',
          '',
          '짧은 모음 + 자음 하나로 끝나는 1음절 동사라 n을 겹칩니다. 바릅니다.',
        ],
        explain: 'cry는 "자음 + y"로 끝나므로 y를 i로 바꾸어 **cried**라고 씁니다. 나머지는 모두 바른 과거형입니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'text', concept: 2,
        q: '다음 동사의 과거형을 쓰세요.\n\ngo',
        answer: ['went'],
        wrong: [
          { a: 'goed', why: 'go는 불규칙 동사라서 -ed를 붙이지 않습니다.' },
          { a: 'gone', why: 'gone은 과거형이 아니라 have와 함께 쓰는 꼴(과거분사)입니다. 9단원 현재완료에서 배웁니다.' },
          { a: 'goes', why: 'goes는 3인칭 단수 현재형입니다.' },
        ],
        explain: 'go의 과거형은 불규칙하게 **went**입니다. I went to Jeju last summer. (저는 지난여름에 제주에 갔습니다.)',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n지난 토요일에 우리는 같이 점심을 먹었습니다.\n→ We ___ lunch together last Saturday.',
        choices: ['ate', 'eat', 'eated', 'eaten'],
        answer: 0,
        why: [
          '',
          'eat은 현재형입니다. 지난 토요일(last Saturday)은 과거입니다.',
          'eat은 불규칙 동사라서 -ed를 붙이지 않습니다.',
          'eaten은 과거형이 아니라 have와 함께 쓰는 꼴(과거분사)입니다. 9단원 현재완료에서 배웁니다.',
        ],
        explain: 'eat의 과거형은 불규칙하게 **ate**입니다.',
      },
      {
        id: 'p6', level: 1, type: 'ox', concept: 3,
        q: '다음 문장은 바른 문장입니다.\n\nShe didn\'t went to work yesterday.',
        answer: false,
        explain: 'didn\'t 뒤에는 동사원형을 씁니다. **She didn\'t go to work yesterday.**(그녀는 어제 출근하지 않았습니다.)로 고칩니다. 과거 표시는 didn\'t가 이미 맡고 있습니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 말을 고르세요.\n\n___ you call your mother last night?',
        choices: ['Did', 'Do', 'Were', 'Was'],
        answer: 0,
        why: [
          '',
          'Do — 현재 의문문에 씁니다. 어젯밤(last night)은 과거입니다.',
          'Were — be동사입니다. 뒤에 일반동사 call이 있으므로 did를 씁니다.',
          'Was — be동사이고, 주어 you와도 맞지 않습니다. 일반동사 의문문은 did로 만듭니다.',
        ],
        explain: '일반동사(call)의 과거 의문문이므로 **Did**를 씁니다. "어젯밤에 어머니께 전화드렸어요?"',
      },
      {
        id: 'p8', level: 1, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 말을 고르세요.\n\nWe moved to this city five years ___.',
        choices: ['ago', 'last', 'before ago'],
        answer: 0,
        why: [
          '',
          'last는 때를 나타내는 말 앞에 씁니다(last year). 숫자 기간 뒤에는 ago를 씁니다.',
          'before와 ago를 겹쳐 쓰지 않습니다. "~ 전에"는 기간 뒤에 ago만 붙입니다.',
        ],
        explain: '"5년 전에"는 **five years ago**입니다. "우리는 5년 전에 이 도시로 이사 왔습니다."',
      },
      {
        id: 'p9', level: 1, type: 'ox', concept: 4,
        q: '다음 문장은 바른 문장입니다.\n\nWe visited my grandmother on last Sunday.',
        answer: false,
        explain: 'last 앞에는 on·in 같은 전치사를 쓰지 않습니다. **We visited my grandmother last Sunday.**(우리는 지난 일요일에 할머니 댁에 갔습니다.)로 고칩니다.',
      },
      {
        id: 'p10', level: 2, type: 'order', concept: 3,
        q: '우리말에 맞게 배열하세요.\n\n어제 어디에 갔어요?',
        choices: ['Where', 'did', 'you', 'go', 'yesterday'],
        answer: [0, 1, 2, 3, 4],
        explain: '의문사 + did + 주어 + 동사원형 + 때: **Where did you go yesterday?** did가 과거를 맡으므로 go는 원형입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'text', concept: 3,
        q: '대화의 빈칸에 알맞은 말을 쓰세요.\n\nA: Did Minsu finish the report?\nB: No, he ___. He needs one more day.',
        answer: ['didn\'t', 'did not'],
        hint: 'Did로 물었으면 did로 답합니다.',
        wrong: [
          { a: 'doesn\'t', why: '질문이 Did(과거)이므로 대답도 did의 부정 didn\'t입니다.' },
          { a: 'wasn\'t', why: 'Did로 물었으니 be동사가 아니라 did로 답합니다.' },
          { a: 'did', why: 'No 뒤에는 부정이 옵니다. No, he didn\'t.' },
        ],
        explain: 'Did로 시작한 질문에는 Yes, he did. / No, he **didn\'t**.로 답합니다. "민수가 보고서를 끝냈어요? — 아니요, 못 끝냈어요. 하루가 더 필요해요."',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 2,
        q: '글을 읽고 내용과 맞는 것을 고르세요.\n\nLast Sunday, I got up late. I had brunch with my sister. In the afternoon, we went to a museum. It was very crowded, but we enjoyed it.',
        choices: ['The writer got up early last Sunday.', 'The writer went to a museum in the afternoon.', 'The museum was quiet.', 'The writer had brunch alone.'],
        answer: 1,
        why: [
          '글쓴이는 늦게(late) 일어났습니다.',
          '',
          '박물관은 무척 붐볐습니다(very crowded).',
          '글쓴이는 언니(여동생)와 함께 브런치를 먹었습니다.',
        ],
        explain: '오후에(In the afternoon) 글쓴이와 자매가 박물관에 갔으므로 **The writer went to a museum in the afternoon.**이 맞습니다. got, had, went는 각각 get, have, go의 불규칙 과거형입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 3,
        q: '**옳지 않은** 문장을 고르세요.',
        choices: ['Did she buy a new car?', 'They were tired after the trip.', 'He didn\'t came to the party.', 'I studied English for two hours yesterday.'],
        answer: 2,
        why: [
          'Did + 주어 + 동사원형을 바르게 지켰습니다.',
          '주어 they에 맞게 were를 바르게 썼습니다.',
          '',
          'study의 과거형 studied를 바르게 썼습니다.',
        ],
        explain: 'didn\'t 뒤에는 동사원형을 씁니다. **He didn\'t come to the party.**(그는 파티에 오지 않았습니다.)로 고칩니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'text', concept: 0,
        q: '우리말에 맞게 빈칸에 알맞은 말을 쓰세요. (한 낱말 또는 두 낱말)\n\n저는 어제 회사에 늦지 않았습니다.\n→ I ___ late for work yesterday.',
        answer: ['wasn\'t', 'was not'],
        hint: '"늦은"이라는 뜻의 late는 형용사입니다. 동사가 무엇일지 생각해 보세요.',
        wrong: [
          { a: 'didn\'t', why: 'late는 형용사라서 be동사 문장입니다. be동사 문장의 부정은 did가 아니라 be동사 뒤에 not을 붙입니다.' },
          { a: 'weren\'t', why: '주어가 I이므로 was를 씁니다. were는 you나 둘 이상일 때 씁니다.' },
          { a: 'am not', why: 'yesterday(어제)는 과거이므로 am의 과거형 was를 씁니다.' },
        ],
        explain: '"늦다"는 be late이므로 be동사 문장입니다. 주어 I, 과거, 부정이므로 **wasn\'t**(was not)입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 3,
        q: '밑줄 친 부분을 묻는 의문문으로 알맞은 것을 고르세요.\n\nJia bought __a new jacket__ yesterday.',
        choices: ['What did Jia buy yesterday?', 'What did Jia bought yesterday?', 'What Jia bought yesterday?', 'What does Jia buy yesterday?'],
        answer: 0,
        hint: '밑줄 친 부분은 물건입니다. 의문사 + did + 주어 + 동사원형 순서를 떠올려 보세요.',
        why: [
          '',
          'did를 썼으면 동사는 원형(buy)입니다.',
          '의문사 뒤에 did + 주어가 와야 합니다. 평서문 어순 그대로입니다.',
          'yesterday(어제)는 과거이므로 does가 아니라 did를 씁니다.',
        ],
        explain: '물건을 묻는 what + did + 주어 + 동사원형: **What did Jia buy yesterday?**(지아는 어제 무엇을 샀어요?)',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 4,
        q: '시간 표현과 동사의 시제가 바르게 어울린 문장을 고르세요.',
        choices: ['I see him yesterday.', 'She was in Jeju last week.', 'We go there three years ago.', 'He is sick last night.'],
        answer: 1,
        why: [
          'yesterday는 과거인데 see는 현재형입니다. I saw him yesterday.',
          '',
          'three years ago는 과거인데 go는 현재형입니다. We went there three years ago.',
          'last night는 과거인데 is는 현재형입니다. He was sick last night.',
        ],
        explain: 'last week(지난주)와 과거형 was가 어울립니다: **She was in Jeju last week.** 나머지는 과거 시간 표현이 있는데 동사가 현재형입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'text', concept: 2,
        q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 쓰세요.\n\nI ___ that book last month, and I loved it. (read)',
        answer: ['read'],
        hint: 'read는 원형과 과거형의 철자가 같은 동사입니다.',
        wrong: [
          { a: 'readed', why: 'read는 불규칙 동사라서 -ed를 붙이지 않습니다. 과거형도 철자는 read입니다.' },
          { a: 'reads', why: '지난달(last month)은 과거이므로 3인칭 현재형 reads가 아닙니다. 주어도 I입니다.' },
        ],
        explain: 'read의 과거형은 철자가 같은 **read**입니다. 소리만 red와 같게 바뀝니다. 뒤의 loved(과거)와도 시제가 맞습니다. "지난달에 그 책을 읽었는데 무척 좋았습니다."',
      },
    ],

    deeper: [
      {
        title: '왜 자주 쓰는 동사일수록 불규칙할까?',
        body: 'go-went, eat-ate, see-saw처럼 불규칙 동사는 대부분 아주 오래전부터 날마다 쓰던 말입니다. 옛 영어에는 모음을 바꾸어 과거를 나타내는 동사가 지금보다 훨씬 많았습니다.\n\n시간이 지나면서 드물게 쓰는 동사들은 사람들이 쉬운 -ed 규칙에 맞춰 쓰게 되어 규칙 동사로 바뀌었고, 매일 입에 오르내리는 동사들은 옛 모양이 그대로 남았습니다. 그래서 불규칙 동사 목록에는 생활에서 가장 많이 쓰는 동사들이 모여 있습니다.\n\n거꾸로 말하면, 자주 쓰는 불규칙 동사 몇십 개만 익혀 두어도 일상 대화의 과거 표현은 대부분 해결됩니다.',
      },
      {
        title: '다음 단원과의 연결 — 과거진행형과 현재완료',
        body: '과거 시제는 "그때 그 일이 있었다"는 사실을 말합니다.\n\n- I **cooked** dinner at seven. (일곱 시에 저녁을 했습니다.)\n\n다음 단원에서는 "그때 한창 ~하고 있었다"를 말하는 **과거진행형**(was·were + -ing)을 배웁니다.\n\n- I **was cooking** dinner at seven. (일곱 시에 저녁을 하고 있었습니다.)\n\n그 뒤 9단원에서는 과거의 일이 지금까지 이어지거나 영향을 주는 **현재완료**(have + 과거분사)를 배웁니다. 이때 gone, eaten, seen처럼 이 단원의 과거형과는 또 다른 꼴이 나옵니다.',
      },
    ],

    faq: [
      {
        q: 'did를 쓰면 왜 동사가 원형으로 돌아가요?',
        a: 'did가 이미 "과거"라는 표시를 하고 있기 때문입니다. 과거 표시를 두 번 하지 않으니 뒤의 동사는 원래 모양으로 씁니다.\n\n현재형에서 does를 쓰면 -s가 사라지는 것(She works. → Does she work?)과 같은 원리입니다.',
      },
      {
        q: 'was랑 were는 어떻게 골라요?',
        a: '주어로 고릅니다. I와 한 사람·한 가지(he, she, it, Jia, the car)는 was, you와 둘 이상(we, they, my parents)은 were입니다.\n\nyou는 한 사람에게 말할 때도 늘 were입니다. You were right. (당신 말이 맞았어요.)',
      },
      {
        q: 'yesterday에 일어난 일인데 Did you went?라고 하면 왜 틀려요?',
        a: '과거 의문문에서는 Did가 과거를 맡고, 동사는 원형을 씁니다. 그래서 **Did you go?**가 맞습니다.\n\n대답할 때도 Yes, I did. / No, I didn\'t.처럼 did로 답하고, 자세히 말할 때만 I went to the bank.처럼 과거형을 씁니다.',
      },
    ],

    mistakes: [
      'did 뒤에 과거형을 쓰는 실수 — Did you saw it? / I didn\'t went. (✗) → Did you see it? / I didn\'t go. (○)',
      '불규칙 동사에 -ed를 붙이는 실수 — goed, eated, buyed (✗) → went, ate, bought (○)',
      'be동사 문장에 did를 쓰는 실수 — Did you tired? / I didn\'t late. (✗) → Were you tired? / I wasn\'t late. (○)',
    ],

    gens: [
      {
        id: 'past-form',
        level: 1,
        title: '동사의 과거형 쓰기',
        make: function (R) {
          var v = R.pick(PAST);
          var wrong = [];
          if (v[3] && v[1].indexOf(v[3]) < 0) wrong.push({ a: v[3], why: (v[2] === 'irr' || v[2] === 'same' ? '' : '철자를 확인하세요. ') + PAST_RULE[v[2]] });
          if (v[1].indexOf(v[0]) < 0) wrong.push({ a: v[0], why: '원형 그대로입니다. 과거형으로 바꿉니다. ' + PAST_RULE[v[2]] });
          return {
            type: 'short', check: 'text', concept: v[2] === 'irr' || v[2] === 'same' ? 2 : 1,
            q: '다음 동사의 과거형을 쓰세요.\n\n' + v[0],
            answer: v[1].slice(),
            hint: '규칙 동사인지 불규칙 동사인지 먼저 생각해 보세요.',
            wrong: wrong,
            explain: PAST_RULE[v[2]] + '\n\n' + v[0] + ' → **' + v[1][0] + '**',
          };
        },
      },
      {
        id: 'was-were',
        level: 1,
        title: 'was와 were 고르기',
        make: function (R) {
          var b = R.pick(BE_PAST);
          var opts = ['was', 'were', b[2]];
          var why = {
            was: 'was — I나 한 사람·한 가지가 주어일 때 씁니다. 이 문장은 ' + b[3] + '입니다.',
            were: 'were — you나 둘 이상이 주어일 때 씁니다. 이 문장은 ' + b[3] + '입니다.',
          };
          why[b[2]] = b[2] + ' — 현재형입니다. 이 문장은 지난 일을 말합니다.';
          return {
            type: 'choice', concept: 0,
            q: '빈칸에 알맞은 말을 고르세요.\n\n' + b[0],
            choices: opts,
            answer: opts.indexOf(b[1]),
            hint: '주어가 하나인지 여럿인지, 지난 일인지 보세요.',
            why: opts.map(function (o) { return o === b[1] ? '' : why[o]; }),
            explain: b[3] + '이고 지난 일이므로 **' + b[1] + '**입니다.\n\n' + b[0].replace('___', b[1]) + '\n(' + b[4] + ')',
          };
        },
      },
      {
        id: 'did-sentence',
        level: 2,
        title: 'did로 부정문·의문문 만들기',
        make: function (R) {
          var d = R.pick(DID);
          var subj = d[0], past = d[1], base = d[2], rest = d[3];
          var third = subj === 'I' || subj === 'You' || subj === 'We' || subj === 'They' || subj === 'The kids' ? false : true;
          var presAux = third ? 'doesn\'t' : 'don\'t';
          var lower = subj === 'I' ? 'I' : (/^(You|We|They|The |My |Your )/.test(subj) ? subj.charAt(0).toLowerCase() + subj.slice(1) : subj);
          var askNeg = R.bool();
          var right, cands;
          if (askNeg) {
            right = subj + ' didn\'t ' + base + ' ' + rest + '.';
            cands = [
              [subj + ' didn\'t ' + past + ' ' + rest + '.', 'didn\'t 뒤에는 동사원형을 씁니다. 과거 표시는 didn\'t가 이미 맡고 있습니다.'],
              [subj + ' ' + presAux + ' ' + base + ' ' + rest + '.', presAux + ' — 현재 부정문에 씁니다. 지난 일이므로 didn\'t를 씁니다.'],
              [subj + ' ' + past + ' not ' + rest + '.', '일반동사 뒤에 not을 바로 붙이지 않습니다. didn\'t + 동사원형으로 만듭니다.'],
            ];
          } else {
            right = 'Did ' + lower + ' ' + base + ' ' + rest + '?';
            cands = [
              ['Did ' + lower + ' ' + past + ' ' + rest + '?', 'Did를 썼으면 동사는 원형입니다. 과거 표시는 Did가 이미 맡고 있습니다.'],
              [(third ? 'Does ' : 'Do ') + lower + ' ' + base + ' ' + rest + '?', (third ? 'Does' : 'Do') + ' — 현재 의문문에 씁니다. 지난 일이므로 Did를 씁니다.'],
              [(third ? 'Was ' : 'Were ') + lower + ' ' + base + ' ' + rest + '?', '일반동사 문장의 의문문은 be동사가 아니라 Did로 만듭니다.'],
            ];
          }
          var reason = {};
          cands.forEach(function (c) { reason[c[0]] = c[1]; });
          var pick = R.choices(right, cands.map(function (c) { return c[0]; }), 4);
          return {
            type: 'choice', concept: 3,
            q: '다음 문장을 ' + (askNeg ? '부정문으로' : '의문문으로') + ' 바르게 바꾼 것을 고르세요.\n\n' + subj + ' ' + past + ' ' + rest + '.\n(' + d[5] + ')',
            choices: pick.choices,
            answer: pick.answer,
            hint: askNeg ? '과거 부정문은 주어 + didn\'t + 동사원형입니다.' : '과거 의문문은 Did + 주어 + 동사원형입니다.',
            why: pick.choices.map(function (c) { return c === right ? '' : reason[c]; }),
            explain: (askNeg ? '과거 부정문은 주어 + didn\'t + 동사원형' : '과거 의문문은 Did + 주어 + 동사원형') + '입니다. ' + past + ' → ' + base + '\n\n바른 문장: **' + right + '**',
          };
        },
      },
    ],

    vocab: [
      { w: 'yesterday', m: '어제', ex: 'I was very busy yesterday.', exm: '저는 어제 무척 바빴습니다.' },
      { w: 'ago', m: '~ 전에', ex: 'We met ten years ago.', exm: '우리는 10년 전에 만났습니다.' },
      { w: 'last', m: '지난; 마지막의', ex: 'I visited my hometown last month.', exm: '저는 지난달에 고향에 다녀왔습니다.' },
      { w: 'trip', m: '여행', ex: 'How was your trip to Jeju?', exm: '제주 여행은 어땠어요?' },
      { w: 'visit', m: '방문하다, 찾아가다', ex: 'We visited our grandparents on Sunday.', exm: '우리는 일요일에 조부모님 댁에 갔습니다.' },
      { w: 'arrive', m: '도착하다', ex: 'The train arrived ten minutes late.', exm: '기차가 10분 늦게 도착했습니다.' },
      { w: 'leave', m: '떠나다 (과거 left)', ex: 'She left the office at six.', exm: '그녀는 여섯 시에 퇴근했습니다.' },
      { w: 'buy', m: '사다 (과거 bought)', ex: 'I bought a new coat yesterday.', exm: '저는 어제 새 외투를 샀습니다.' },
      { w: 'meet', m: '만나다 (과거 met)', ex: 'I met an old friend at the market.', exm: '시장에서 옛 친구를 만났습니다.' },
      { w: 'forget', m: '잊다 (과거 forgot)', ex: 'I forgot my password again.', exm: '비밀번호를 또 잊어버렸습니다.' },
      { w: 'lose', m: '잃어버리다 (과거 lost)', ex: 'He lost his wallet on the bus.', exm: '그는 버스에서 지갑을 잃어버렸습니다.' },
      { w: 'finish', m: '끝내다', ex: 'Did you finish your work?', exm: '일을 끝냈어요?' },
      { w: 'enjoy', m: '즐기다', ex: 'We enjoyed the concert last night.', exm: '우리는 어젯밤 음악회를 즐겼습니다.' },
      { w: 'museum', m: '박물관', ex: 'The museum was closed on Monday.', exm: '박물관은 월요일에 문을 닫았습니다.' },
    ],
  });
})();
