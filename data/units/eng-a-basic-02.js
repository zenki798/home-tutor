/* 다시 시작하는 영어 기초 문법 · be동사와 일반동사
 * 예문은 모두 직접 쓴 문장이다(가상의 인물). 영어 낱말 바로 뒤에는 받침에 따라 바뀌는 조사를 붙이지 않는다. */
(function () {
  // be동사 생성기: 사람 주어 [글자, be동사, 갈래 설명]
  var BE_SUBJ = [
    ['I', 'am', '주어가 I(나)'],
    ['You', 'are', '주어가 you(너, 당신)'],
    ['We', 'are', '주어가 we(우리) — 여럿'],
    ['They', 'are', '주어가 they(그들) — 여럿'],
    ['He', 'is', '주어가 he(그) — 한 사람'],
    ['She', 'is', '주어가 she(그녀) — 한 사람'],
    ['My parents', 'are', '주어가 my parents(부모님) — 두 사람'],
    ['Jia and I', 'are', '주어가 Jia and I(지아와 나) — 두 사람'],
    ['Minsu', 'is', '주어가 Minsu(민수) — 한 사람'],
    ['My boss', 'is', '주어가 my boss(제 상사) — 한 사람'],
    ['The children', 'are', '주어가 the children(아이들) — 여럿'],
    ['Our teacher', 'is', '주어가 our teacher(우리 선생님) — 한 사람'],
  ];
  var BE_COMP = ['at home now', 'busy today', 'ready for the trip', 'in the office', 'tired after work', 'from Busan', 'late again'];
  var BE_WHY = {
    am: 'am — 주어 I 전용입니다.',
    is: 'is — 주어가 한 사람·한 사물(he, she, it, Minsu …)일 때 씁니다.',
    are: 'are — 주어가 you이거나 둘 이상(we, they, my parents …)일 때 씁니다.',
  };

  // 일반동사 생성기: [원형, 3인칭 단수형, 뒤에 붙는 말, 규칙, 흔한 틀린 철자]
  var VERBS = [
    ['watch', 'watches', 'TV after dinner', 'es', 'watchs'],
    ['go', 'goes', 'to work by subway', 'es', 'gos'],
    ['study', 'studies', 'English on weekends', 'ies', 'studys'],
    ['play', 'plays', 'tennis on Sundays', 's', 'plaies'],
    ['fix', 'fixes', 'old bikes', 'es', 'fixs'],
    ['wash', 'washes', 'the dishes every night', 'es', 'washs'],
    ['have', 'has', 'lunch at noon', 'irr', 'haves'],
    ['teach', 'teaches', 'math at a high school', 'es', 'teachs'],
    ['carry', 'carries', 'a big bag to work', 'ies', 'carrys'],
    ['work', 'works', 'from home on Fridays', 's', ''],
    ['buy', 'buys', 'bread at the bakery', 's', 'buies'],
    ['miss', 'misses', 'the bus sometimes', 'es', 'miss'],
    ['drink', 'drinks', 'green tea in the morning', 's', ''],
    ['read', 'reads', 'the news online', 's', ''],
  ];
  var RULE = {
    s: '대부분의 동사는 끝에 -s만 붙입니다.',
    es: '끝이 -s, -sh, -ch, -x, -o 인 동사는 -es를 붙입니다.',
    ies: '"자음 + y"로 끝나는 동사는 끝 y 대신 -ies를 씁니다.',
    irr: 'have의 3인칭 단수형은 has입니다(규칙 밖).',
  };
  // [문장 첫머리 글자, 문장 가운데 글자, 3인칭 단수?, 설명]
  var SUBJ = [
    ['He', 'he', true, 'He(그) — 3인칭 단수'],
    ['She', 'she', true, 'She(그녀) — 3인칭 단수'],
    ['My brother', 'my brother', true, 'My brother(제 남동생) — 3인칭 단수'],
    ['Jia', 'Jia', true, 'Jia(지아) — 3인칭 단수'],
    ['Our manager', 'our manager', true, 'Our manager(우리 팀장) — 3인칭 단수'],
    ['I', 'I', false, 'I(나) — 1인칭'],
    ['You', 'you', false, 'You(당신) — 2인칭'],
    ['We', 'we', false, 'We(우리) — 복수'],
    ['They', 'they', false, 'They(그들) — 복수'],
    ['My parents', 'my parents', false, 'My parents(부모님) — 복수'],
  ];

  Tutor.registerUnit({
    id: 'eng-a-basic-02',
    course: 'eng-a-basic',
    title: 'be동사와 일반동사',
    summary: 'am·is·are와 일반동사 현재형을 익히고, 각각 부정문과 의문문을 만드는 방법을 정리합니다.',
    goals: [
      '주어에 맞게 be동사(am, is, are)를 고를 수 있다.',
      'be동사 문장을 부정문과 의문문으로 바꿀 수 있다.',
      '주어가 3인칭 단수일 때 일반동사에 -s, -es를 바르게 붙일 수 있다.',
      'do·does로 일반동사의 부정문과 의문문을 만들고, be동사와 일반동사를 섞어 쓰지 않을 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '주어에 맞는 be동사 — am, is, are',
        body: '**be동사**는 "~이다", "~에 있다", "(상태가) ~하다"를 나타냅니다. 현재형은 주어에 따라 모양이 세 가지로 바뀝니다.\n\n| 주어 | be동사 | 줄임말 |\n|---|---|---|\n| I | am | I\'m |\n| you, we, they, 여럿을 가리키는 명사(my parents) | are | you\'re, we\'re, they\'re |\n| he, she, it, 하나를 가리키는 명사(Jia, my car) | is | he\'s, she\'s, it\'s |\n\n- I **am** a teacher. (저는 교사입니다.)\n- Jia **is** in the office. (지아는 사무실에 있습니다.)\n- My parents **are** healthy. (부모님은 건강하십니다.)\n\n> ⚠️ "Jia and I"처럼 둘 이상이 함께 주어가 되면 여럿이므로 are를 씁니다. Jia and I **are** coworkers.',
        easy: 'be동사는 주어와 뒤의 말을 잇는 "등호(=)"라고 생각하면 쉽습니다. I = a teacher, Jia = in the office.\n\n등호의 모양만 주어에 따라 바뀝니다.\n\n- 나 혼자(I) → am\n- 너, 또는 둘 이상 → are\n- 그 밖의 한 사람·한 물건 → is',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nMy parents ___ at home now.',
          choices: ['am', 'is', 'are'],
          answer: 2,
          why: ['am — 주어 I 전용입니다.', 'is — 한 사람·한 사물 주어에 씁니다. 부모님은 두 사람입니다.', ''],
          explain: '주어 My parents(부모님) — 두 사람, 곧 여럿이므로 are를 씁니다. "부모님은 지금 집에 계십니다."',
        },
      },
      {
        title: 'be동사의 부정문과 의문문',
        body: '**부정문**은 be동사 바로 뒤에 not을 붙입니다.\n\n- I am **not** busy. → I\'m not busy.\n- She is **not** here. → She isn\'t here.\n- They are **not** late. → They aren\'t late.\n\n**의문문**은 be동사를 주어 앞으로 옮깁니다. 대답도 be동사로 합니다.\n\n| 질문 | 긍정 대답 | 부정 대답 |\n|---|---|---|\n| **Are** you busy? | Yes, I am. | No, I\'m not. |\n| **Is** he your boss? | Yes, he is. | No, he isn\'t. |\n| **Are** they ready? | Yes, they are. | No, they aren\'t. |\n\n> ⚠️ 짧은 긍정 대답은 줄여 쓰지 않습니다. Yes, I\'m. (✗) → Yes, I am. (○)\n\n> 💡 am not은 줄여서 I\'m not으로 씁니다(표준 영어에서 amn\'t라는 꼴은 쓰지 않습니다).',
        easy: 'be동사 문장은 not과 질문을 만들기가 아주 쉽습니다.\n\n- 아니라고 할 때: be동사 바로 뒤에 not 한 낱말만 끼웁니다.\n- 물을 때: be동사와 주어의 자리만 맞바꿉니다. You are busy. → Are you busy?\n\n다른 낱말은 하나도 더하지 않습니다.',
        check: {
          type: 'choice',
          q: '질문에 대한 긍정의 짧은 대답으로 알맞은 것을 고르세요.\n\nIs Jia a nurse?',
          choices: ['Yes, she is.', 'Yes, she does.', 'Yes, she\'s.'],
          answer: 0,
          why: ['', 'does — 일반동사로 물은 질문(Does …?)에 대답할 때 씁니다. 이 질문은 be동사(Is)로 물었습니다.', '짧은 긍정 대답은 줄여 쓰지 않습니다.'],
          explain: 'Is로 물었으니 is로 대답합니다. 짧은 긍정 대답은 줄이지 않고 **Yes, she is.** 라고 합니다.',
        },
      },
      {
        title: '일반동사 현재형과 3인칭 단수 -s, -es',
        body: 'be동사가 아닌 동사(work, live, like, go …)를 **일반동사**라고 합니다. 현재형은 습관이나 늘 그런 사실을 말할 때 씁니다. I work in Seoul.(저는 서울에서 일합니다.)\n\n주어가 **3인칭 단수**(나·너를 뺀 하나: he, she, it, Jia, my brother …)이면 동사 끝에 -s 또는 -es를 붙입니다.\n\n| 동사의 끝 | 붙이는 법 | 예 |\n|---|---|---|\n| 대부분 | + s | work → works, like → likes |\n| -s, -sh, -ch, -x, -o | + es | miss → misses, wash → washes, watch → watches, fix → fixes, go → goes, do → does |\n| 자음 + y | 끝 y → ies | study → studies, try → tries |\n| 모음 + y | + s | play → plays, buy → buys |\n| 규칙 밖 | | have → has |\n\n- I **work** in Seoul. / My sister **works** in Busan.\n- They **study** at night. / He **studies** at night.',
        easy: '3인칭 단수 주어는 "대화에 끼지 않은 딱 한 사람(또는 하나)"입니다. 나(I)와 상대(you)는 대화하는 사람이고, 여럿(we, they)은 하나가 아닙니다.\n\n그 "딱 하나"가 주어일 때만 동사에 꼬리표 -s를 달아 준다고 기억하면 됩니다.\n\nI like tea. → Jia like**s** tea.',
        check: {
          type: 'short', check: 'text',
          q: '괄호 안의 동사를 알맞은 꼴로 쓰세요.\n\nShe ___ (watch) TV every evening.',
          answer: ['watches'],
          wrong: [
            { a: 'watchs', why: '끝이 -ch 인 동사는 -s가 아니라 -es를 붙입니다.' },
            { a: 'watch', why: '주어 She — 3인칭 단수이므로 동사 끝에 -es를 붙여야 합니다.' },
          ],
          explain: '주어 She(그녀)는 3인칭 단수입니다. watch는 끝이 -ch 이므로 -es를 붙여 **watches** 입니다.',
        },
      },
      {
        title: 'do·does로 만드는 부정문과 의문문',
        body: '일반동사 문장에는 not을 바로 붙일 수 없습니다. 대신 도우미 동사 **do·does**를 씁니다.\n\n| 주어 | 부정문 | 의문문 | 대답 |\n|---|---|---|---|\n| I, you, we, they, 여럿 | **don\'t** + 동사원형 | **Do** + 주어 + 동사원형? | Yes, I do. / No, I don\'t. |\n| he, she, it, 하나 | **doesn\'t** + 동사원형 | **Does** + 주어 + 동사원형? | Yes, she does. / No, she doesn\'t. |\n\n- I **don\'t** eat meat. (저는 고기를 먹지 않습니다.)\n- He **doesn\'t** drink coffee. (그는 커피를 마시지 않습니다.)\n- **Does** she work here? — Yes, she does.\n\n> ⚠️ 3인칭 단수의 -s는 does가 가져갑니다. 그래서 does·doesn\'t 뒤의 동사는 **원형**입니다. He doesn\'t drinks. (✗) / Does she works? (✗)',
        easy: 'do·does는 일반동사 옆에 붙어 다니는 "도우미"입니다. 부정이나 질문을 할 때 도우미가 앞으로 나서고, 원래 동사는 맨 처음 모양(원형)으로 쉽니다.\n\n주어가 3인칭 단수면 꼬리표 -s도 도우미가 대신 달아서 do → does가 됩니다. 그래서 뒤의 동사에는 꼬리표가 없습니다.\n\nShe likes tea. → She **doesn\'t** like tea. / **Does** she like tea?',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nMy brother ___ like spicy food.',
          choices: ['don\'t', 'doesn\'t', 'isn\'t'],
          answer: 1,
          why: ['don\'t — I, you, we, they 같은 주어와 씁니다. 주어 My brother — 3인칭 단수입니다.', '', 'be동사(is)는 일반동사 like와 함께 쓰지 않습니다. 일반동사의 부정에는 do·does를 씁니다.'],
          explain: '주어 My brother(제 남동생) — 3인칭 단수이고 동사 like는 일반동사입니다. 그래서 **doesn\'t** + 원형(like)을 씁니다. "제 남동생은 매운 음식을 좋아하지 않습니다."',
        },
      },
      {
        title: 'be동사와 일반동사를 함께 쓰지 않기',
        body: '현재형 문장에서 동사는 **하나**입니다. be동사를 쓰든지, 일반동사를 쓰든지 둘 중 하나입니다.\n\n| 틀린 문장 (✗) | 바른 문장 (○) |\n|---|---|\n| I am go to work by bus. | I go to work by bus. |\n| She is like coffee. | She likes coffee. |\n| I am not like it. | I don\'t like it. |\n| Are you live here? | Do you live here? |\n\n어느 것을 쓸지는 뜻으로 정합니다.\n\n- "~이다, ~에 있다, (상태가) ~하다" → be동사 (I am tired. / He is at work.)\n- 움직임·습관·생각(가다, 좋아하다, 살다 …) → 일반동사, 부정·의문은 do·does\n\n> 💡 우리말 "저**는** 버스로 출근합니다"의 "는"을 am으로 옮기는 습관 때문에 생기는 실수가 많습니다. 영어의 am은 조사가 아니라 동사입니다.\n\n> 참고: I am going처럼 "be동사 + 동사ing" 꼴(진행형)은 따로 배웁니다. 이 단원에서 말하는 것은 be동사와 일반동사 원형·현재형을 나란히 쓰는 실수입니다.',
        easy: '한 문장의 "동사 자리"는 의자가 하나뿐이라고 생각해 봅니다. be동사가 앉으면 일반동사는 앉을 수 없고, 일반동사가 앉으면 be동사는 앉을 수 없습니다.\n\nI am go (✗) — 의자 하나에 둘이 앉으려 한 것입니다. 가는 동작이니 I go (○)만 남깁니다.',
        check: {
          type: 'ox',
          q: '다음 문장은 바른 문장입니다.\n\nI am work at a bank.',
          answer: false,
          explain: '"일하다"는 일반동사 work 하나로 충분합니다. be동사 am을 함께 쓰지 않습니다. 바르게 고치면 **I work at a bank.** 입니다.',
        },
      },
    ],

    examples: [
      {
        q: '다음 문장을 부정문과 의문문으로 바꾸어 보세요.\n\nShe drinks coffee every morning.',
        steps: [
          '동사 drinks — 일반동사입니다. 부정·의문에는 do·does가 필요합니다.',
          '주어 She — 3인칭 단수이므로 does를 씁니다.',
          '부정문: She doesn\'t drink coffee every morning. 동사 끝의 -s는 doesn\'t가 가져가므로 원형 drink 그대로 씁니다.',
          '의문문: Does she drink coffee every morning? 대답은 Yes, she does. / No, she doesn\'t.',
        ],
        answer: 'She doesn\'t drink coffee every morning. / Does she drink coffee every morning?',
      },
      {
        q: '틀린 곳을 찾아 고쳐 보세요.\n\nMy husband is works at a hospital.',
        steps: [
          '동사 자리에 is와 works 두 개가 있습니다. 현재형 문장의 동사는 하나여야 합니다.',
          '"병원에서 일한다"는 움직임·습관이므로 일반동사 work를 남기고 is를 뺍니다.',
          '주어 My husband — 3인칭 단수이므로 works 그대로 둡니다.',
        ],
        answer: 'My husband works at a hospital.',
      },
      {
        q: '다음 문장을 의문문으로 바꾸고, 부정의 짧은 대답도 써 보세요.\n\nThey are from Busan.',
        steps: [
          '동사 are — be동사이므로 do·does 없이 be동사를 주어 앞으로 옮깁니다: Are they from Busan?',
          '부정의 짧은 대답은 be동사 + not으로 합니다: No, they are not. 줄여서 No, they aren\'t.',
        ],
        answer: 'Are they from Busan? — No, they aren\'t.',
      },
    ],

    terms: [
      { term: 'be동사', def: '"~이다, ~에 있다, (상태가) ~하다"를 나타내는 동사입니다. 현재형은 주어에 따라 am, is, are로 바뀝니다.' },
      { term: '일반동사', def: 'be동사가 아닌 동사입니다. 움직임·습관·생각을 나타냅니다. 예: work, go, like, have' },
      { term: '3인칭 단수', def: '나(I)와 너(you)를 뺀 하나를 가리키는 주어입니다. 예: he, she, it, Jia, my car. 현재형에서 일반동사 끝에 -s, -es를 붙입니다.' },
      { term: '동사원형', def: '-s나 -ed 같은 것이 붙지 않은 동사의 기본 모양입니다. do·does·don\'t·doesn\'t 뒤에는 원형을 씁니다. 예: work, go, have' },
      { term: '부정문', def: '"~이 아니다, ~하지 않는다"라는 뜻의 문장입니다. be동사 뒤에 not, 일반동사는 don\'t·doesn\'t + 원형으로 만듭니다.' },
      { term: '의문문', def: '묻는 문장입니다. be동사는 주어 앞으로 옮기고, 일반동사는 Do·Does + 주어 + 원형으로 만듭니다.' },
      { term: '줄임말', def: '두 낱말을 줄여 쓴 꼴입니다(축약형). 예: I\'m(I am), isn\'t(is not), doesn\'t(does not)' },
      { term: '짧은 대답', def: 'Yes·No 뒤에 주어와 be동사(또는 do·does)만 써서 하는 대답입니다. 예: Yes, I am. / No, she doesn\'t.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 말을 고르세요.\n\nI ___ a new employee here.',
        choices: ['am', 'is', 'are', 'be'],
        answer: 0,
        why: [
          '',
          'is — 한 사람·한 사물(he, she, it …) 주어에 씁니다.',
          'are — 주어가 you이거나 여럿일 때 씁니다.',
          'be — 원래 모양(원형)입니다. 현재 문장에서는 주어에 맞게 am·is·are 가운데 하나로 바꿉니다.',
        ],
        explain: '주어 I 뒤의 be동사는 am입니다. "저는 이곳에 새로 온 직원입니다."',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
        q: '빈칸에 알맞은 be동사를 쓰세요.\n\nJia and Minsu ___ coworkers.',
        answer: ['are'],
        wrong: [
          { a: 'is', why: '주어 Jia and Minsu — 두 사람이므로 여럿입니다. 여럿인 주어에는 is를 쓰지 않습니다.' },
          { a: 'am', why: 'am — 주어 I 전용입니다.' },
        ],
        explain: '주어 Jia and Minsu(지아와 민수)는 두 사람이므로 are를 씁니다. "지아와 민수는 직장 동료입니다."',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '부정문으로 바르게 쓴 것을 고르세요.',
        choices: ['He not is busy.', 'He is not busy.', 'He does not busy.', 'He is busy not.'],
        answer: 1,
        why: [
          'not의 자리가 틀렸습니다. not은 be동사 뒤에 옵니다.',
          '',
          'busy(바쁜) — 동사가 아니라 형용사입니다. "바쁘다"는 be동사로 말하므로 do·does를 쓰지 않습니다.',
          'not이 문장 끝에 왔습니다. not은 be동사 바로 뒤에 옵니다.',
        ],
        explain: 'be동사 문장의 부정은 be동사 바로 뒤에 not을 붙입니다: **He is not busy.** (줄여서 He isn\'t busy.)',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'text', concept: 2,
        q: '괄호 안의 동사를 알맞은 꼴로 쓰세요.\n\nHe ___ (study) English after work.',
        answer: ['studies'],
        wrong: [
          { a: 'studys', why: '"자음 + y"로 끝나는 동사(study)는 끝 y 대신 -ies를 씁니다.' },
          { a: 'study', why: '주어 He — 3인칭 단수이므로 동사 끝을 바꿔야 합니다.' },
        ],
        explain: '주어 He는 3인칭 단수입니다. study는 자음(d) 뒤에 y가 오므로 끝 y 대신 -ies를 써서 **studies** 입니다. "그는 퇴근 후에 영어를 공부합니다."',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '동사의 모양이 **바른** 문장을 고르세요.',
        choices: ['She haves a car.', 'He gos to work early.', 'My sister fixes computers.', 'The baby crys at night.'],
        answer: 2,
        why: [
          'have의 3인칭 단수형은 규칙 밖의 has입니다.',
          '끝이 -o 인 go는 -es를 붙여 goes입니다.',
          '',
          '"자음 + y"로 끝나는 cry는 끝 y 대신 -ies를 써서 cries입니다.',
        ],
        explain: 'fix는 끝이 -x 이므로 -es를 붙여 fixes가 맞습니다. 나머지는 has, goes, cries로 고쳐야 합니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 말을 고르세요.\n\n___ you live near here?',
        choices: ['Do', 'Does', 'Are'],
        answer: 0,
        why: [
          '',
          'Does — 3인칭 단수 주어(he, she, it …)와 씁니다. 주어 you에는 쓰지 않습니다.',
          'be동사(Are)는 일반동사 live와 함께 쓰지 않습니다.',
        ],
        explain: 'live(살다)는 일반동사이고 주어는 you입니다. 그래서 **Do** you live near here?(이 근처에 사세요?)',
      },
      {
        id: 'p7', level: 1, type: 'ox', concept: 1,
        q: '다음 질문과 대답은 바르게 짝지어져 있습니다.\n\nA: Are they your children?\nB: Yes, they are.',
        answer: true,
        explain: 'Are로 물었으니 are로 대답합니다. 짧은 긍정 대답은 줄이지 않고 Yes, they are. 라고 하므로 바른 짝입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'text', concept: 3,
        q: '부정문이 되도록 빈칸에 알맞은 말을 쓰세요.\n\nMy father drinks coffee.\n→ My father ___ drink coffee.',
        answer: ['doesn\'t', 'does not'],
        hint: '주어가 3인칭 단수인지 먼저 확인합니다.',
        wrong: [
          { a: 'don\'t', why: '주어 My father — 3인칭 단수이므로 does를 씁니다.' },
          { a: 'isn\'t', why: 'drink(마시다)는 일반동사입니다. 일반동사의 부정에는 be동사가 아니라 does를 씁니다.' },
          { a: 'not', why: '일반동사 앞에는 not만 쓰지 않고 도우미 동사와 함께 씁니다.' },
        ],
        explain: '주어 My father는 3인칭 단수, drink는 일반동사이므로 빈칸에 들어갈 말은 doesn\'t(= does not)입니다. drinks의 -s는 doesn\'t가 가져가서 뒤에는 원형 drink 그대로 옵니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 4,
        q: '바른 문장을 고르세요.',
        choices: ['I am live in Incheon.', 'I live in Incheon.', 'I am lives in Incheon.', 'I lives in Incheon.'],
        answer: 1,
        why: [
          'be동사 am과 일반동사 live를 함께 썼습니다. 동사는 하나만 씁니다.',
          '',
          'be동사와 일반동사를 함께 썼고, 주어 I에는 -s도 붙이지 않습니다.',
          '주어 I는 3인칭 단수가 아니므로 동사 끝에 -s를 붙이지 않습니다.',
        ],
        explain: '"살다"는 일반동사 live 하나로 말합니다. 주어가 I이므로 원형 그대로: **I live in Incheon.**',
      },
      {
        id: 'p10', level: 2, type: 'order', concept: 3,
        q: '우리말에 맞게 배열하세요.\n\n당신의 여동생은 은행에서 일합니까?',
        choices: ['Does', 'your sister', 'work', 'at a bank'],
        answer: [0, 1, 2, 3],
        hint: '일반동사의 의문문은 Do·Does + 주어 + 동사원형입니다.',
        explain: 'Does + 주어(your sister) + 동사원형(work) + 장소(at a bank): **Does your sister work at a bank?**',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 1,
        q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: Is this your bag?\nB: No, ___.',
        choices: ['it isn\'t', 'it doesn\'t', 'I\'m not', 'it not is'],
        answer: 0,
        why: [
          '',
          'Is로 물었으니 be동사로 대답합니다. doesn\'t는 Does로 물을 때 씁니다.',
          '질문의 주어는 this(이것)입니다. 대답에서는 it으로 받습니다.',
          'not은 be동사 뒤에 옵니다(it is not).',
        ],
        explain: 'Is this …?로 물으면 this를 it으로 받아 be동사로 대답합니다. 부정이면 **No, it isn\'t.** (No, it is not.)',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'text', concept: 2,
        q: '괄호 안의 동사를 알맞은 꼴로 쓰세요.\n\nMy children ___ (play) soccer on Saturdays.',
        answer: ['play'],
        hint: '주어가 한 명인지 여러 명인지 보세요.',
        wrong: [
          { a: 'plays', why: '주어 My children(제 아이들) — 여럿입니다. 3인칭 단수가 아니므로 동사 끝을 바꾸지 않습니다.' },
        ],
        explain: 'children(아이들)은 child의 복수형입니다. 주어가 여럿이면 동사는 원형 그대로 play입니다. "제 아이들은 토요일마다 축구를 합니다."',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 4,
        q: '**옳지 않은** 문장을 고르세요.',
        choices: ['Do you know her?', 'She is a lawyer.', 'He is not want coffee.', 'We are ready.'],
        answer: 2,
        why: [
          '일반동사 know의 의문문을 Do로 바르게 만들었습니다.',
          '"~이다"를 be동사 is로 바르게 썼습니다.',
          '',
          '주어 We에 are를 바르게 썼습니다.',
        ],
        explain: 'want(원하다)는 일반동사이므로 부정문에 be동사를 쓰지 않습니다. 바르게 고치면 **He doesn\'t want coffee.** 입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'text', concept: 3,
        q: '짧은 대답을 완성하세요.\n\nA: Does your husband cook?\nB: No, he ___.',
        answer: ['doesn\'t', 'does not', 'doesn\'t cook', 'does not cook'],
        wrong: [
          { a: 'isn\'t', why: 'Does로 물었으니 does로 대답합니다. be동사로 받지 않습니다.' },
          { a: 'don\'t', why: '주어 he — 3인칭 단수이므로 does를 씁니다.' },
        ],
        explain: '일반동사 질문(Does …?)에는 does로 대답합니다. 부정이므로 **No, he doesn\'t.** (No, he does not.)',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 2,
        q: '빈칸에 들어갈 주어로 알맞은 것을 고르세요.\n\n___ washes the dishes after dinner.',
        choices: ['My parents', 'I', 'My son', 'You'],
        answer: 2,
        hint: '동사 washes의 끝을 보세요.',
        why: [
          '부모님은 두 사람이므로 동사는 wash여야 합니다.',
          '주어 I에는 동사 끝에 -es를 붙이지 않습니다.',
          '',
          '주어 You에는 동사 끝에 -es를 붙이지 않습니다.',
        ],
        explain: '동사 washes에 -es가 붙어 있으니 주어는 3인칭 단수여야 합니다. 보기 가운데 My son(제 아들)만 3인칭 단수입니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 1,
        q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: ___ your office on the third floor?\nB: No, it isn\'t. It\'s on the fifth floor.',
        choices: ['Is', 'Are', 'Does', 'Do'],
        answer: 0,
        why: [
          '',
          'Are — 주어가 you이거나 여럿일 때 씁니다. your office(당신의 사무실) — 하나입니다.',
          '빈칸 뒤에 일반동사가 없습니다. "~에 있다"는 be동사로 말합니다.',
          '빈칸 뒤에 일반동사가 없고, 주어도 하나입니다.',
        ],
        explain: '"사무실이 3층에 있습니까?" — "~에 있다"는 be동사로 말하고, 주어 your office는 하나이므로 **Is**를 씁니다. 대답도 it isn\'t(be동사)로 했습니다.',
      },
      {
        id: 'a5', level: 3, type: 'order', concept: 3,
        q: '우리말에 맞게 배열하세요.\n\n그는 주말에는 일하지 않습니다.',
        choices: ['He', 'doesn\'t', 'work', 'on weekends'],
        answer: [0, 1, 2, 3],
        hint: '부정의 도우미 동사 뒤에는 동사원형이 옵니다.',
        explain: '주어(He) + doesn\'t + 동사원형(work) + 때(on weekends): **He doesn\'t work on weekends.**',
      },
    ],

    deeper: [
      {
        title: '왜 3인칭 단수에만 -s가 붙을까?',
        body: '옛 영어에서는 동사 끝이 주어에 따라 달랐습니다. 나(I), 너(you, 한 사람), 그·그녀, 여럿(우리·너희·그들)마다 동사 꼬리가 따로 있었습니다. 오랜 세월에 걸쳐 이 꼬리들이 거의 다 사라지고, 지금의 현재형 일반동사에는 **3인칭 단수의 -s 하나만** 남아 있습니다.\n\n그래서 지금 영어의 현재형 일반동사는 "3인칭 단수면 -s, 아니면 원형" 하나만 기억하면 됩니다. be동사는 아주 자주 쓰는 낱말이라 옛 모양이 비교적 많이 남아 am·is·are 세 가지가 되었습니다.',
      },
      {
        title: '다음에 배울 것 — be동사가 다시 나오는 곳',
        body: 'be동사는 다른 문법에서도 "도우미"로 다시 등장합니다.\n\n- 진행형: be동사 + 동사-ing — I am working now.(저는 지금 일하는 중입니다.)\n- 수동태: be동사 + 과거분사 — This room is cleaned every day.(이 방은 매일 청소됩니다.)\n\n이때도 be동사는 주어에 맞게 am·is·are로 바뀝니다. 오늘 익힌 주어별 be동사가 그대로 쓰입니다.',
      },
    ],

    faq: [
      {
        q: 'I am go는 왜 틀려요? 우리말로는 "나는 간다"인데요.',
        a: '우리말의 "는"은 주어를 표시하는 조사이고, 영어의 am은 "~이다"라는 동사입니다. 그래서 I am go는 "나는 이다 간다"처럼 동사가 둘이 됩니다.\n\n"간다"는 움직임이므로 일반동사 go 하나만 써서 I go라고 합니다.',
      },
      {
        q: 'does 뒤에는 왜 동사에 -s를 안 붙여요?',
        a: '3인칭 단수 표시(-s)는 문장에 한 번만 붙습니다. does에 이미 -es가 붙어 있으니 뒤의 동사는 원형으로 씁니다.\n\nShe works. → She doesn\'t work. / Does she work?',
      },
      {
        q: 'my family는 is예요, are예요?',
        a: '보통은 "가족이라는 한 무리"로 보아 is를 씁니다. My family is big.(우리 가족은 대가족입니다.)\n\n다만 영국 영어에서는 가족 한 사람 한 사람을 떠올릴 때 are를 쓰기도 합니다. 기초 단계에서는 is로 익혀 두면 충분합니다.',
      },
    ],

    mistakes: [
      'be동사와 일반동사를 함께 쓰는 실수 — I am go to work. (✗) → I go to work. (○)',
      'does·doesn\'t 뒤의 동사에도 -s를 붙이는 실수 — Does she works? (✗) → Does she work? (○)',
      '-es·-ies 철자 실수 — watchs, gos, studys (✗) → watches, goes, studies (○)',
    ],

    gens: [
      {
        id: 'be-am-is-are',
        level: 1,
        title: '주어에 맞는 be동사',
        make: function (R) {
          var s = R.pick(BE_SUBJ);
          var comp = R.pick(BE_COMP);
          var opts = ['am', 'is', 'are'];
          return {
            type: 'choice', concept: 0,
            q: '빈칸에 알맞은 말을 고르세요.\n\n' + s[0] + ' ___ ' + comp + '.',
            choices: opts,
            answer: opts.indexOf(s[1]),
            why: opts.map(function (o) { return o === s[1] ? '' : BE_WHY[o]; }),
            explain: s[2] + '이므로 be동사는 ' + s[1] + ' 입니다.\n\n바른 문장: ' + s[0] + ' ' + s[1] + ' ' + comp + '.',
          };
        },
      },
      {
        id: 'third-person-s',
        level: 2,
        title: '일반동사 현재형 — 3인칭 단수 -s, -es',
        make: function (R) {
          var v = R.pick(VERBS);
          var s = R.pick(SUBJ);
          var form = s[2] ? v[1] : v[0];
          var wrong = [];
          if (s[2]) {
            wrong.push({ a: v[0], why: '주어 ' + s[3] + '이므로 동사 끝을 바꿔야 합니다. ' + RULE[v[3]] });
            if (v[4] && v[4] !== v[1] && v[4] !== v[0]) wrong.push({ a: v[4], why: '철자를 확인하세요. ' + RULE[v[3]] });
          } else {
            wrong.push({ a: v[1], why: '주어 ' + s[3] + '입니다. 3인칭 단수가 아니므로 동사는 원형 그대로 씁니다.' });
          }
          var explain = s[2]
            ? '주어 ' + s[3] + '이므로 동사 끝을 바꿉니다. ' + RULE[v[3]] + ' → **' + v[1] + '**'
            : '주어 ' + s[3] + '이므로 동사는 원형 그대로 **' + v[0] + '** 입니다.';
          return {
            type: 'short', check: 'text', concept: 2,
            q: '괄호 안의 동사를 알맞은 꼴로 쓰세요.\n\n' + s[0] + ' ___ (' + v[0] + ') ' + v[2] + '.',
            answer: [form],
            hint: '주어가 3인칭 단수(나·너를 뺀 하나)인지 먼저 보세요.',
            wrong: wrong,
            explain: explain + '\n\n바른 문장: ' + s[0] + ' ' + form + ' ' + v[2] + '.',
          };
        },
      },
      {
        id: 'do-does',
        level: 2,
        title: 'do·does로 부정문·의문문 만들기',
        make: function (R) {
          var v = R.pick(VERBS);
          var pool = SUBJ.filter(function (x) { return x[0] !== 'I'; });
          var s = R.pick(pool);
          var ask = R.bool();
          var opts, ans, q, plain;
          if (ask) {
            opts = ['Do', 'Does', 'Is', 'Are'];
            ans = s[2] ? 'Does' : 'Do';
            q = '___ ' + s[1] + ' ' + v[0] + ' ' + v[2] + '?';
            plain = ans + ' ' + s[1] + ' ' + v[0] + ' ' + v[2] + '?';
          } else {
            opts = ['don\'t', 'doesn\'t', 'isn\'t', 'aren\'t'];
            ans = s[2] ? 'doesn\'t' : 'don\'t';
            q = s[0] + ' ___ ' + v[0] + ' ' + v[2] + '.';
            plain = s[0] + ' ' + ans + ' ' + v[0] + ' ' + v[2] + '.';
          }
          var why = opts.map(function (o) {
            if (o === ans) return '';
            if (/^(Is|Are|isn't|aren't)$/.test(o)) return 'be동사는 일반동사 ' + v[0] + ' 앞에 쓰지 않습니다. 일반동사의 부정·의문에는 do·does를 씁니다.';
            if (/^(Does|doesn't)$/.test(o)) return 'does — 3인칭 단수 주어와 씁니다. 주어 ' + s[3] + '입니다.';
            return 'do — I, you, we, they 같은 주어와 씁니다. 주어 ' + s[3] + '입니다.';
          });
          return {
            type: 'choice', concept: 3,
            q: '빈칸에 알맞은 말을 고르세요.\n\n' + q,
            choices: opts,
            answer: opts.indexOf(ans),
            why: why,
            explain: v[0] + ' — 일반동사이므로 do·does를 씁니다. 주어 ' + s[3] + '이므로 ' + ans + ' 입니다. 뒤의 동사는 원형(' + v[0] + ')입니다.\n\n바른 문장: ' + plain,
          };
        },
      },
    ],

    vocab: [
      { w: 'employee', m: '직원', ex: 'She is a new employee.', exm: '그녀는 새로 온 직원입니다.' },
      { w: 'husband', m: '남편', ex: 'My husband cooks on weekends.', exm: '제 남편은 주말에 요리를 합니다.' },
      { w: 'office', m: '사무실', ex: 'Our office is on the fifth floor.', exm: '저희 사무실은 5층에 있습니다.' },
      { w: 'hospital', m: '병원', ex: 'My sister works at a hospital.', exm: '제 여동생은 병원에서 일합니다.' },
      { w: 'subway', m: '지하철', ex: 'I go to work by subway.', exm: '저는 지하철로 출근합니다.' },
      { w: 'lawyer', m: '변호사', ex: 'Her brother is a lawyer.', exm: '그녀의 오빠는 변호사입니다.' },
      { w: 'nurse', m: '간호사', ex: 'Is your mother a nurse?', exm: '어머니께서 간호사이신가요?' },
      { w: 'spicy', m: '매운', ex: 'He doesn\'t like spicy food.', exm: '그는 매운 음식을 좋아하지 않습니다.' },
      { w: 'busy', m: '바쁜', ex: 'Are you busy today?', exm: '오늘 바쁘세요?' },
      { w: 'ready', m: '준비된', ex: 'We are ready for the meeting.', exm: '우리는 회의 준비가 되었습니다.' },
      { w: 'healthy', m: '건강한', ex: 'My parents are healthy.', exm: '부모님은 건강하십니다.' },
      { w: 'bakery', m: '빵집', ex: 'Jia buys bread at the bakery.', exm: '지아는 빵집에서 빵을 삽니다.' },
      { w: 'weekend', m: '주말', ex: 'Do you work on weekends?', exm: '주말에도 일하세요?' },
      { w: 'early', m: '일찍', ex: 'He gets up early.', exm: '그는 일찍 일어납니다.' },
    ],
  });
})();
