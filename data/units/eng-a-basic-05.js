/* 다시 시작하는 영어 기초 문법 · 형용사·부사와 비교
 * 예문은 모두 직접 쓴 문장이다(가상의 인물). 영어 낱말 바로 뒤에는 받침에 따라 바뀌는 조사를 붙이지 않는다. */
(function () {
  // 부사 만들기 생성기: [형용사, [정답 부사들], 규칙, 흔한 틀린 꼴(없으면 '')]
  var ADVS = [
    ['quick', ['quickly'], 'ly', ''],
    ['slow', ['slowly'], 'ly', ''],
    ['careful', ['carefully'], 'ly', 'carefuly'],
    ['quiet', ['quietly'], 'ly', 'quitely'],
    ['loud', ['loudly'], 'ly', ''],
    ['kind', ['kindly'], 'ly', ''],
    ['safe', ['safely'], 'ly', 'safly'],
    ['clear', ['clearly'], 'ly', ''],
    ['polite', ['politely'], 'ly', 'politly'],
    ['beautiful', ['beautifully'], 'ly', 'beautifuly'],
    ['easy', ['easily'], 'y', 'easyly'],
    ['happy', ['happily'], 'y', 'happyly'],
    ['busy', ['busily'], 'y', 'busyly'],
    ['heavy', ['heavily'], 'y', 'heavyly'],
    ['angry', ['angrily'], 'y', 'angryly'],
    ['gentle', ['gently'], 'le', 'gentlely'],
    ['simple', ['simply'], 'le', 'simplely'],
    ['terrible', ['terribly'], 'le', 'terriblely'],
    ['good', ['well'], 'good', 'goodly'],
    ['fast', ['fast'], 'same', 'fastly'],
    ['hard', ['hard'], 'hard', 'hardly'],
    ['late', ['late'], 'late', 'lately'],
    ['early', ['early'], 'same', 'earlily'],
  ];
  var ADV_RULE = {
    ly: '대부분의 형용사는 끝에 -ly를 붙여 부사를 만듭니다.',
    y: '"자음 + y"로 끝나는 형용사는 끝 y 대신 -ily를 붙입니다.',
    le: '끝이 -le 인 형용사는 끝 e를 빼고 -y만 붙입니다.',
    good: 'good의 부사는 모양이 완전히 다른 well입니다.',
    same: '형용사와 부사의 모양이 같은 낱말입니다. -ly를 붙이지 않습니다.',
    hard: 'hard는 형용사(힘든, 열심인)와 부사(열심히)의 모양이 같습니다. hardly는 "거의 ~않다"라는 전혀 다른 뜻입니다.',
    late: 'late는 형용사(늦은)와 부사(늦게)의 모양이 같습니다. lately는 "최근에"라는 다른 뜻입니다.',
  };

  // 비교급 생성기: [원급, [정답 비교급들], 규칙, 흔한 틀린 꼴]
  var COMPS = [
    ['tall', ['taller'], 'er', 'more tall'],
    ['cheap', ['cheaper'], 'er', 'cheapper'],
    ['small', ['smaller'], 'er', 'more small'],
    ['old', ['older'], 'er', 'more old'],
    ['large', ['larger'], 'e', 'largeer'],
    ['nice', ['nicer'], 'e', 'niceer'],
    ['safe', ['safer'], 'e', 'safeer'],
    ['big', ['bigger'], 'double', 'biger'],
    ['hot', ['hotter'], 'double', 'hoter'],
    ['thin', ['thinner'], 'double', 'thiner'],
    ['easy', ['easier'], 'y', 'easyer'],
    ['busy', ['busier'], 'y', 'busyer'],
    ['heavy', ['heavier'], 'y', 'heavyer'],
    ['happy', ['happier'], 'y', 'happyer'],
    ['expensive', ['more expensive'], 'more', 'expensiver'],
    ['beautiful', ['more beautiful'], 'more', 'beautifuller'],
    ['difficult', ['more difficult'], 'more', 'difficulter'],
    ['important', ['more important'], 'more', 'importanter'],
    ['useful', ['more useful'], 'more', 'usefuller'],
    ['famous', ['more famous'], 'more', 'famouser'],
    ['good', ['better'], 'irr', 'gooder'],
    ['bad', ['worse'], 'irr', 'badder'],
    ['many', ['more'], 'irr', 'manier'],
  ];
  var COMP_RULE = {
    er: '짧은 낱말(1음절)은 끝에 -er를 붙입니다.',
    e: '끝이 -e 인 낱말은 -r만 붙입니다.',
    double: '"짧은 모음 하나 + 자음 하나"로 끝나는 1음절 낱말은 끝 자음을 한 번 더 쓰고 -er를 붙입니다.',
    y: '"자음 + y"로 끝나는 낱말은 끝 y 대신 -ier를 붙입니다.',
    more: '3음절 이상인 긴 낱말과 -ful, -ous 등으로 끝나는 2음절 낱말은 끝을 바꾸지 않고 앞에 more를 씁니다.',
    irr: '규칙을 따르지 않는 불규칙 비교급입니다. 따로 익혀 둡니다.',
  };

  // 원급·비교급·최상급 고르기 생성기: [문장, 정답, [원급, 비교급, 최상급], 자리, 뜻]
  var DEGREE = [
    ['My bag is ___ than yours.', 1, ['heavy', 'heavier', 'heaviest'], 'than', '제 가방이 당신 가방보다 무겁습니다.'],
    ['This is the ___ room in the hotel.', 2, ['large', 'larger', 'largest'], 'the', '이곳이 호텔에서 가장 큰 방입니다.'],
    ['Jia is as ___ as her mother.', 0, ['tall', 'taller', 'tallest'], 'as', '지아는 어머니만큼 키가 큽니다.'],
    ['The subway is ___ than the bus in the morning.', 1, ['fast', 'faster', 'fastest'], 'than', '아침에는 지하철이 버스보다 빠릅니다.'],
    ['August is the ___ month of the year here.', 2, ['hot', 'hotter', 'hottest'], 'the', '이곳에서는 8월이 한 해 중 가장 더운 달입니다.'],
    ['My new phone is not as ___ as my old one.', 0, ['big', 'bigger', 'biggest'], 'as', '새 휴대전화는 예전 것만큼 크지 않습니다.'],
    ['This test was ___ than the last one.', 1, ['easy', 'easier', 'easiest'], 'than', '이번 시험은 지난번보다 쉬웠습니다.'],
    ['Friday is the ___ day of the week for me.', 2, ['busy', 'busier', 'busiest'], 'the', '제게는 금요일이 한 주 중 가장 바쁜 날입니다.'],
    ['My son is as ___ as his father now.', 0, ['tall', 'taller', 'tallest'], 'as', '제 아들은 이제 아버지만큼 키가 큽니다.'],
    ['This coat is ___ than that one.', 1, ['expensive', 'more expensive', 'most expensive'], 'than', '이 외투가 저것보다 비쌉니다.'],
    ['It is the ___ book in the library.', 2, ['popular', 'more popular', 'most popular'], 'the', '그것은 도서관에서 가장 인기 있는 책입니다.'],
    ['My sofa is not as ___ as yours.', 0, ['comfortable', 'more comfortable', 'most comfortable'], 'as', '제 소파는 당신 것만큼 편하지 않습니다.'],
    ['Math is ___ than English for me.', 1, ['difficult', 'more difficult', 'most difficult'], 'than', '제게는 수학이 영어보다 어렵습니다.'],
    ['Minsu is the ___ person in our office.', 2, ['careful', 'more careful', 'most careful'], 'the', '민수는 우리 사무실에서 가장 꼼꼼한 사람입니다.'],
    ['Today is as ___ as yesterday.', 0, ['cold', 'colder', 'coldest'], 'as', '오늘은 어제만큼 춥습니다.'],
    ['Your idea is ___ than mine.', 1, ['good', 'better', 'best'], 'than', '당신 생각이 제 생각보다 낫습니다.'],
    ['This is the ___ coffee in town.', 2, ['good', 'better', 'best'], 'the', '이것이 동네에서 가장 맛있는 커피입니다.'],
    ['Today\'s traffic is ___ than yesterday\'s.', 1, ['bad', 'worse', 'worst'], 'than', '오늘은 교통이 어제보다 나쁩니다.'],
    ['That was the ___ movie of the three.', 2, ['bad', 'worse', 'worst'], 'the', '그것이 세 편 중 가장 별로인 영화였습니다.'],
    ['My room is as ___ as a hotel room.', 0, ['clean', 'cleaner', 'cleanest'], 'as', '제 방은 호텔 방만큼 깨끗합니다.'],
    ['Jia runs ___ than Minsu.', 1, ['fast', 'faster', 'fastest'], 'than', '지아는 민수보다 빨리 달립니다.'],
    ['The river is ___ than the lake.', 1, ['long', 'longer', 'longest'], 'than', '그 강은 호수보다 깁니다.'],
  ];
  var DEGREE_WHY = {
    than: '빈칸 뒤에 "~보다"라는 뜻의 than — 둘을 견주는 표시가 있습니다. 둘을 비교할 때는 비교급을 씁니다.',
    the: '빈칸 앞에 the, 뒤에 범위를 나타내는 in·of가 있습니다. "가장 ~한"을 나타내는 최상급을 씁니다.',
    as: 'as ___ as 사이에는 모양을 바꾸지 않은 원급을 씁니다.',
  };
  var DEGREE_NAME = ['원급', '비교급', '최상급'];

  // 빈도부사 자리 생성기: [낱말 조각(바른 순서), 우리말 뜻, be동사 문장인가]
  var FREQ = [
    [['I', 'always', 'drink', 'coffee', 'after lunch'], '저는 점심 뒤에 늘 커피를 마십니다.', false],
    [['She', 'usually', 'takes', 'the bus', 'to work'], '그녀는 보통 버스를 타고 출근합니다.', false],
    [['We', 'never', 'eat', 'fast food'], '우리는 패스트푸드를 절대 먹지 않습니다.', false],
    [['My father', 'always', 'reads', 'the newspaper'], '아버지는 늘 신문을 읽으십니다.', false],
    [['They', 'usually', 'go', 'hiking', 'on Sundays'], '그들은 보통 일요일에 등산을 갑니다.', false],
    [['Minsu', 'never', 'watches', 'TV', 'at night'], '민수는 밤에 텔레비전을 절대 보지 않습니다.', false],
    [['I', 'usually', 'get up', 'at six'], '저는 보통 여섯 시에 일어납니다.', false],
    [['Jia', 'always', 'walks', 'her dog', 'in the evening'], '지아는 저녁마다 늘 개를 산책시킵니다.', false],
    [['He', 'never', 'drinks', 'soda'], '그는 탄산음료를 절대 마시지 않습니다.', false],
    [['My mother', 'usually', 'cooks', 'dinner'], '어머니는 보통 저녁을 지으십니다.', false],
    [['I', 'am', 'always', 'hungry', 'after work'], '저는 퇴근 뒤에 늘 배가 고픕니다.', true],
    [['She', 'is', 'never', 'late', 'for meetings'], '그녀는 회의에 절대 늦지 않습니다.', true],
    [['The store', 'is', 'usually', 'busy', 'on weekends'], '그 가게는 주말에 보통 붐빕니다.', true],
    [['My boss', 'is', 'always', 'kind', 'to us'], '제 상사는 우리에게 늘 친절합니다.', true],
    [['We', 'are', 'usually', 'at home', 'on Mondays'], '우리는 월요일에 보통 집에 있습니다.', true],
    [['The subway', 'is', 'always', 'crowded', 'in the morning'], '아침에는 지하철이 늘 붐빕니다.', true],
    [['He', 'is', 'never', 'angry', 'with his children'], '그는 자기 아이들에게 절대 화를 내지 않습니다.', true],
    [['They', 'are', 'always', 'busy', 'in December'], '그들은 12월에 늘 바쁩니다.', true],
    [['Seojun', 'never', 'forgets', 'my birthday'], '서준이는 제 생일을 절대 잊지 않습니다.', false],
    [['The children', 'are', 'usually', 'tired', 'after school'], '아이들은 학교가 끝나면 보통 피곤해합니다.', true],
  ];

  Tutor.registerUnit({
    id: 'eng-a-basic-05',
    course: 'eng-a-basic',
    title: '형용사·부사와 비교',
    summary: '형용사와 부사가 들어가는 자리를 익히고, 비교급·최상급과 as ~ as로 둘 이상을 비교해 말합니다.',
    goals: [
      '형용사를 명사 앞과 be동사 뒤에 알맞게 쓰고, 형용사로 부사를 만들 수 있다.',
      '빈도부사(always, usually, sometimes, never)를 바른 자리에 쓸 수 있다.',
      '비교급과 than으로 둘을 비교하고, 최상급으로 가장 ~한 것을 말할 수 있다.',
      'as ~ as와 not as ~ as로 정도가 같거나 덜한 것을 말할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '형용사의 두 자리 — 명사 앞, be동사 뒤',
        body: '**형용사**는 사람이나 사물의 모양·크기·성질·상태를 알려 주는 말입니다. busy(바쁜), new(새로운), tired(피곤한), expensive(비싼) 같은 말입니다.\n\n형용사가 들어가는 자리는 크게 두 곳입니다.\n\n| 자리 | 하는 일 | 예 |\n|---|---|---|\n| 명사 바로 앞 | 명사를 꾸밉니다 | It is a **busy** day. (바쁜 하루) |\n| be동사 뒤 | 주어가 어떤지 설명합니다(보어) | The day is **busy**. (그날은 바쁩니다) |\n\n명사 앞에 a·the·my 같은 말이 있으면 순서는 "a·the·my → 형용사 → 명사"입니다.\n\n- a **new** phone / my **old** car / the **red** umbrella\n\n> ⚠️ 우리말처럼 명사 뒤에 형용사를 두지 않습니다. a day busy (✗) → a busy day (○)\n\n> 💡 be동사 뒤의 형용사는 3단원에서 배운 2형식의 보어입니다. look, feel, get 뒤에도 형용사가 옵니다. You look **tired**.',
        easy: '형용사는 명사에 붙이는 "이름표"라고 생각하면 쉽습니다.\n\n이름표를 붙이는 방법은 두 가지입니다. 하나는 물건 바로 앞에 붙이는 것(a **cheap** bag — 싼 가방), 다른 하나는 "~은 어떻다" 하고 설명하는 것(The bag is **cheap**. — 그 가방은 쌉니다)입니다.\n\n뜻은 거의 같고, 문장에서 형용사가 서는 자리만 다릅니다.',
        check: {
          type: 'choice',
          q: '바른 문장을 고르세요.',
          choices: ['I have a car new.', 'I have a new car.', 'I have new a car.'],
          answer: 1,
          why: ['형용사 new가 명사 car 뒤에 왔습니다. 형용사는 명사 바로 앞에 둡니다.', '', 'a가 형용사 뒤로 갔습니다. 순서는 "a → 형용사 → 명사"입니다.'],
          explain: '순서는 "a → 형용사 → 명사"이므로 **I have a new car.**(저는 새 차가 있습니다)가 바릅니다.',
        },
      },
      {
        title: '부사 만들기 — -ly와 모양이 다른 부사',
        body: '**부사**는 동사·형용사·다른 부사나 문장 전체를 꾸며 "어떻게, 얼마나"를 알려 줍니다. 대부분 형용사 끝에 **-ly**를 붙여 만듭니다.\n\n| 형용사 | 부사 | 규칙 |\n|---|---|---|\n| quick, careful, quiet | quickly, carefully, quietly | 대부분: + ly |\n| easy, happy, busy | easily, happily, busily | 자음 + y: y → ily |\n| gentle, simple | gently, simply | -le: e를 빼고 + y |\n\n모양이 다른 부사도 있습니다. 자주 쓰니 따로 익혀 둡니다.\n\n| 형용사 | 부사 | 주의 |\n|---|---|---|\n| good (좋은) | **well** (잘) | goodly라고 하지 않습니다 |\n| fast (빠른) | **fast** (빨리) | 모양이 같습니다 |\n| hard (열심인, 힘든) | **hard** (열심히) | hardly는 "거의 ~않다" |\n| late (늦은) | **late** (늦게) | lately는 "최근에" |\n| early (이른) | **early** (일찍) | 모양이 같습니다 |\n\n- She is a **good** cook. → She cooks **well**.\n- He is a **hard** worker. → He works **hard**.\n\n> ⚠️ 동사를 꾸밀 때는 형용사가 아니라 부사를 씁니다. She sings beautiful. (✗) → She sings **beautifully**. (○)',
        easy: '형용사는 명사(사람·물건)를 꾸미고, 부사는 동작(동사)을 꾸밉니다.\n\n"조심스러운 운전자"는 사람을 꾸미니 a **careful** driver, "조심스럽게 운전한다"는 동작을 꾸미니 drive **carefully**입니다. 우리말의 "-ㄴ"이 "-게"로 바뀌는 것과 비슷하게, 영어는 -ly를 붙입니다.\n\n다만 good → well처럼 모양이 바뀌거나, fast·hard처럼 그대로인 말은 낱말마다 외워 둡니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nMinsu speaks English very ___.',
          choices: ['good', 'well', 'goodly'],
          answer: 1,
          why: ['good — 형용사라서 명사를 꾸밉니다. 동사 speaks를 꾸미려면 부사를 씁니다.', '', 'goodly라는 부사는 쓰지 않습니다. good의 부사는 모양이 다른 well입니다.'],
          explain: '빈칸은 동사 speaks를 꾸미는 자리이므로 부사를 씁니다. good의 부사는 **well**입니다. "민수는 영어를 아주 잘합니다."',
        },
      },
      {
        title: '빈도부사의 자리 — always, usually, sometimes, never',
        body: '**빈도부사**는 어떤 일을 "얼마나 자주" 하는지 알려 주는 부사입니다.\n\n| 빈도부사 | 뜻 | 대략의 정도 |\n|---|---|---|\n| always | 늘, 항상 | 100% |\n| usually | 보통, 대개 | 80~90% 안팎 |\n| often | 자주 | 60~70% 안팎 |\n| sometimes | 가끔, 때때로 | 30~50% 안팎 |\n| never | 절대(한 번도) ~않다 | 0% |\n\n(퍼센트는 느낌을 잡기 위한 대략의 기준입니다.)\n\n빈도부사의 자리는 동사에 따라 정해집니다.\n\n| 동사 | 빈도부사의 자리 | 예 |\n|---|---|---|\n| be동사 (am·is·are) | be동사 **뒤** | She **is always** busy. |\n| 일반동사 | 일반동사 **앞** | She **always gets** up early. |\n\n- I **usually walk** to work. (저는 보통 걸어서 출근합니다.)\n- He **is never** late. (그는 절대 늦지 않습니다.)\n\n> ⚠️ never는 그 자체로 "~않다"라는 뜻입니다. 부정문(don\'t, isn\'t)에 다시 넣지 않습니다. I don\'t never eat meat. (✗) → I **never eat** meat. (○)\n\n> 💡 sometimes, usually는 문장 맨 앞에 오기도 합니다. Sometimes I work at home.',
        easy: '빈도부사는 "be동사의 뒤, 일반동사의 앞"이라고 외우면 됩니다.\n\nbe동사(am·is·are)는 "상태"를 말하는 짧은 말이라 그 뒤에 빈도부사가 서고, 일반동사(eat, go, work)는 "동작"이라 동작 바로 앞에서 "얼마나 자주"를 알려 줍니다.\n\nI **am always** happy. / I **always eat** breakfast.',
        check: {
          type: 'choice',
          q: 'usually가 들어갈 알맞은 자리를 고르세요.\n\nI ① take ② the subway ③ to work ④.',
          choices: ['①', '②', '③', '④'],
          answer: 0,
          fixed: true,
          why: ['', '동사 take와 목적어 the subway 사이에는 빈도부사를 넣지 않습니다.', '일반동사 문장에서 빈도부사는 동사 앞에 둡니다.', '문장 끝은 빈도부사의 기본 자리가 아닙니다. 일반동사 앞에 둡니다.'],
          explain: 'take는 일반동사이므로 빈도부사는 동사 앞, ①에 들어갑니다. **I usually take the subway to work.** (저는 보통 지하철로 출근합니다.)',
        },
      },
      {
        title: '비교급 — -er, more, better와 than',
        body: '둘을 견주어 "더 ~하다"라고 할 때는 **비교급**을 쓰고, 견주는 상대 앞에는 "~보다"라는 뜻의 **than**을 씁니다.\n\n- Minsu is **taller than** Seojun. (민수는 서준이보다 키가 큽니다.)\n\n비교급을 만드는 법은 낱말의 길이와 끝 글자에 따라 다릅니다.\n\n| 원급(원래 꼴) | 비교급 | 규칙 |\n|---|---|---|\n| tall, cheap, small | taller, cheaper, smaller | 짧은 낱말: + er |\n| large, nice | larger, nicer | -e로 끝남: + r |\n| big, hot, thin | bigger, hotter, thinner | 짧은 모음 + 자음 하나: 자음을 겹쳐 + er |\n| easy, busy, heavy | easier, busier, heavier | 자음 + y: y → ier |\n| expensive, beautiful, difficult | more expensive, more beautiful, more difficult | 긴 낱말: 앞에 more |\n\n규칙을 따르지 않는 **불규칙 비교급**은 따로 익혀 둡니다.\n\n| 원급 | 비교급 |\n|---|---|\n| good / well | better |\n| bad | worse |\n| many / much | more |\n| little | less |\n\n부사도 비교할 수 있습니다. fast → **faster**, hard → **harder**처럼 짧은 부사는 -er를, quickly → **more quickly**처럼 -ly 부사는 more를 씁니다.\n\n> 💡 비교급을 강조해 "훨씬 더"라고 할 때는 very가 아니라 **much**·**a lot** 같은 말을 씁니다. This bag is **much heavier** than that one.',
        easy: '비교급은 "둘 중에서 누가 더?"를 말할 때 씁니다. 저울에 둘을 올려놓은 장면을 떠올리면 됩니다.\n\n짧은 말은 꼬리에 -er를 달고(tall → taller), 긴 말은 앞에 more를 붙입니다(expensive → more expensive). 긴 낱말에 -er까지 달면 발음이 너무 길어지기 때문입니다.\n\n그리고 비교하는 상대 앞에는 than을 둡니다. "A가 B보다 더 ~하다" = A is 비교급 than B.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nThis hotel is ___ than that one.',
          choices: ['expensiver', 'more expensive', 'expensive'],
          answer: 1,
          why: ['expensive처럼 긴 낱말에는 -er를 붙이지 않고 앞에 more를 씁니다.', '', '원급 그대로입니다. 뒤에 than이 있으므로 비교급으로 바꿉니다.'],
          explain: '뒤에 than이 있으니 비교급이 필요하고, expensive는 긴 낱말이라 **more expensive**입니다. "이 호텔이 저 호텔보다 비쌉니다."',
        },
      },
      {
        title: '최상급 — the -est, the most, the best',
        body: '셋 이상 가운데 "가장 ~하다"라고 할 때는 **최상급**을 씁니다. 최상급 앞에는 보통 **the**를 붙입니다.\n\n| 원급 | 비교급 | 최상급 |\n|---|---|---|\n| tall | taller | the tallest |\n| large | larger | the largest |\n| big | bigger | the biggest |\n| easy | easier | the easiest |\n| expensive | more expensive | the most expensive |\n| good / well | better | the best |\n| bad | worse | the worst |\n| many / much | more | the most |\n\n최상급 뒤에는 "어디에서·무엇 가운데"라는 **범위**를 붙입니다.\n\n| 범위 | 뒤에 오는 말 | 예 |\n|---|---|---|\n| in | 장소·집단 (단수) | the tallest **in my family**, the best **in town** |\n| of | 같은 종류 여럿 (복수·숫자) | the cheapest **of the three**, the busiest day **of the week** |\n\n- Jia is **the tallest** in her family. (지아는 가족 중에서 키가 가장 큽니다.)\n- This is **the most expensive** of the three. (이것이 셋 중에서 가장 비쌉니다.)',
        easy: '비교급이 "둘 중에 누가 더?"라면, 최상급은 "여럿 중에 누가 일등?"입니다.\n\n일등은 하나뿐이라 "바로 그"를 뜻하는 the를 앞에 붙입니다. 꼬리는 -er 대신 -est, 긴 말이면 more 대신 most입니다.\n\n그리고 "몇 명 중에서 일등인지"를 in(우리 반에서, 우리 동네에서)이나 of(셋 중에서)로 덧붙입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nFriday is the ___ day of the week for me.',
          choices: ['busy', 'busier', 'busiest'],
          answer: 2,
          why: ['원급 그대로입니다. 앞에 the, 뒤에 of the week가 있어 "가장 ~한"을 나타내야 합니다.', '비교급은 둘을 견줄 때 씁니다. 한 주의 모든 요일 가운데 "가장"이므로 최상급입니다.', ''],
          explain: '앞에 the가 있고 "한 주 가운데"라는 범위(of the week)가 있으니 최상급 **busiest**입니다. busy는 "자음 + y"로 끝나 y를 i로 바꾸고 -est를 붙입니다. "제게는 금요일이 한 주 중 가장 바쁜 날입니다."',
        },
      },
      {
        title: 'as ~ as와 not as ~ as',
        body: '두 가지의 정도가 **같을** 때는 **as + 원급 + as**를 씁니다. "~만큼 ~하다"라는 뜻입니다.\n\n- Jia is **as tall as** her mother. (지아는 어머니만큼 키가 큽니다. — 키가 같습니다.)\n\n앞에 not을 붙인 **not as + 원급 + as**는 "~만큼 ~하지 않다", 곧 앞의 것이 **덜하다**는 뜻입니다.\n\n- My car is **not as new as** yours. (제 차는 당신 차만큼 새것이 아닙니다. — 당신 차가 더 새것입니다.)\n\n그래서 not as ~ as 문장은 비교급 문장으로 바꿔 말할 수 있습니다.\n\n| not as ~ as | 비교급으로 바꾸면 |\n|---|---|\n| My room is not as big as yours. | Your room is bigger than mine. |\n| The bus is not as fast as the subway. | The subway is faster than the bus. |\n\n> ⚠️ as와 as 사이에는 **원급**을 씁니다. as taller as (✗) → as tall as (○)\n\n> 💡 be동사 대신 일반동사가 와도 같습니다. He runs **as fast as** his brother. (그는 형만큼 빨리 달립니다.)',
        easy: 'as ~ as는 저울이 "수평"인 모습입니다. 양쪽 무게가 같습니다.\n\n여기에 not을 붙이면 "수평이 아니다", 곧 앞의 것이 모자란다는 뜻입니다. "내 가방은 네 가방만큼 무겁지 않아" = 네 가방이 더 무겁습니다.\n\n수평을 말할 때는 "더(-er)"가 필요 없으니 as와 as 사이에는 원래 꼴을 그대로 넣습니다.',
        check: {
          type: 'ox',
          q: '"Minsu is not as old as Seojun."은 "민수가 서준이보다 나이가 많다"라는 뜻입니다.',
          answer: false,
          explain: 'not as old as는 "~만큼 나이가 많지 않다"라는 뜻이므로 민수가 서준이보다 **어립니다**. Seojun is older than Minsu.와 같은 뜻입니다.',
        },
      },
    ],

    examples: [
      {
        q: '표를 보고 빈칸에 tall의 알맞은 꼴을 넣어 보세요.\n\n| 이름 | 키 |\n|---|---|\n| 민수 | 175 cm |\n| 서준 | 170 cm |\n| 도윤 | 175 cm |\n\n1. Seojun is not as ___ as Minsu.\n2. Minsu is ___ than Seojun.\n3. Doyun is as ___ as Minsu.',
        steps: [
          '1번: as와 as 사이에는 원급을 씁니다. 서준(170 cm)은 민수(175 cm)만큼 크지 않으므로 not as tall as가 맞습니다.',
          '2번: 뒤에 than이 있으니 둘을 비교하는 비교급입니다. 짧은 낱말이라 -er 꼬리를 붙여 taller입니다.',
          '3번: 도윤과 민수는 키가 같으므로 as tall as(~만큼 큰)입니다.',
        ],
        answer: '1. tall  2. taller  3. tall',
      },
      {
        q: '틀린 곳을 두 군데 찾아 바르게 고쳐 보세요.\n\nShe always is busy, but she answers emails quick.',
        steps: [
          'is는 be동사입니다. 빈도부사는 be동사 뒤에 두므로 always is → is always로 고칩니다.',
          'quick은 형용사입니다. 동사 answers를 꾸미려면 부사가 필요하므로 quick → quickly로 고칩니다.',
        ],
        answer: 'She is always busy, but she answers emails quickly. (그녀는 늘 바쁘지만 이메일에는 빨리 답합니다.)',
      },
    ],

    terms: [
      { term: '형용사', def: '사람·사물의 모양·크기·성질·상태를 알려 주는 말입니다. 명사 앞이나 be동사 뒤에 씁니다. 예: a busy day, The day is busy.' },
      { term: '부사', def: '동사·형용사·다른 부사나 문장 전체를 꾸며 "어떻게, 얼마나, 언제"를 알려 주는 말입니다. 대부분 형용사에 -ly 꼬리를 붙여 만듭니다. 예: quickly, well, fast' },
      { term: '빈도부사', def: '얼마나 자주 하는지 알려 주는 부사입니다. 예: always, usually, often, sometimes, never. be동사 뒤, 일반동사 앞에 씁니다.' },
      { term: '원급', def: '비교하지 않은 형용사·부사의 원래 꼴입니다. 예: tall, expensive, good. as ~ as 사이에 씁니다.' },
      { term: '비교급', def: '둘을 견주어 "더 ~한"을 나타내는 꼴입니다. 예: taller, more expensive, better. 뒤에는 "~보다"를 뜻하는 than이 옵니다.' },
      { term: '최상급', def: '셋 이상 가운데 "가장 ~한"을 나타내는 꼴입니다. 예: the tallest, the most expensive, the best' },
      { term: 'as ~ as', def: '"~만큼 ~한"이라는 뜻으로 두 가지의 정도가 같음을 나타냅니다. not as ~ as는 "~만큼 ~하지 않은"입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n그것은 비싼 시계입니다.\n→ It is ___.',
        choices: ['an expensive watch', 'a watch expensive', 'expensive a watch', 'an watch expensive'],
        answer: 0,
        why: [
          '',
          '형용사가 명사 뒤에 왔습니다. 형용사는 명사 바로 앞에 둡니다.',
          'a가 형용사 뒤로 갔습니다. 순서는 "a·an → 형용사 → 명사"입니다.',
          '형용사가 명사 뒤에 왔고, watch는 자음 소리로 시작하므로 an도 맞지 않습니다.',
        ],
        explain: '순서는 "a·an → 형용사 → 명사"입니다. expensive가 모음 소리로 시작하므로 an을 써서 **an expensive watch**입니다.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 1,
        q: '다음 문장은 바른 문장입니다.\n\nPlease drive careful.',
        answer: false,
        explain: 'careful(조심스러운)은 형용사입니다. 동사 drive를 꾸미려면 부사 **carefully**를 씁니다. **Please drive carefully.** (조심해서 운전하세요.)',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'text', concept: 1,
        q: '다음 형용사를 부사로 바꾸어 쓰세요.\n\neasy',
        answer: ['easily'],
        wrong: [
          { a: 'easyly', why: '"자음 + y"로 끝나는 형용사는 y를 i로 바꾸고 -ly 꼬리를 붙입니다.' },
          { a: 'easy', why: '형용사 그대로입니다. 부사는 -ly 꼬리를 붙여 만듭니다.' },
        ],
        explain: 'easy는 "자음 + y"로 끝나므로 y를 i로 바꾸고 -ly를 붙여 **easily**(쉽게)입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 1,
        q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n그는 시험을 위해 열심히 공부합니다.\n→ He studies ___ for the test.',
        choices: ['hard', 'hardly', 'hardness'],
        answer: 0,
        why: [
          '',
          'hardly는 "거의 ~않다"라는 뜻입니다. He studies hardly.는 "거의 공부하지 않는다"에 가깝습니다.',
          'hardness는 "단단함"이라는 명사입니다. 동사를 꾸밀 수 없습니다.',
        ],
        explain: 'hard는 형용사와 부사의 모양이 같아 "열심히"도 **hard**입니다. hardly는 "거의 ~않다"라는 다른 뜻이니 헷갈리지 않도록 합니다.',
      },
      {
        id: 'p5', level: 1, type: 'order', concept: 2,
        q: '우리말에 맞게 배열하세요.\n\n그는 아침을 절대 거르지 않습니다.',
        choices: ['He', 'never', 'skips', 'breakfast'],
        answer: [0, 1, 2, 3],
        explain: 'skips는 일반동사이므로 빈도부사 never를 동사 앞에 둡니다: **He never skips breakfast.** never에 이미 "~않다"라는 뜻이 있어 doesn\'t를 쓰지 않습니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 2,
        q: 'always가 들어갈 알맞은 자리를 고르세요.\n\nMy sister ① is ② tired ③ after work ④.',
        choices: ['①', '②', '③', '④'],
        answer: 1,
        fixed: true,
        why: [
          'is는 be동사입니다. 빈도부사는 be동사 앞이 아니라 뒤에 둡니다.',
          '',
          '형용사 tired와 꾸밈말 after work 사이는 빈도부사의 자리가 아닙니다.',
          '문장 끝은 빈도부사의 기본 자리가 아닙니다. be동사 뒤에 둡니다.',
        ],
        explain: 'is는 be동사이므로 빈도부사는 be동사 뒤, ②에 들어갑니다. **My sister is always tired after work.** (언니는 퇴근하면 늘 피곤해합니다.)',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 말을 고르세요.\n\nMy suitcase is ___ than yours.',
        choices: ['heavy', 'heavier', 'heaviest', 'more heavy'],
        answer: 1,
        why: [
          '원급 그대로입니다. 뒤에 than이 있으므로 비교급으로 바꿉니다.',
          '',
          '최상급은 셋 이상 가운데 "가장"을 말할 때 씁니다. than과 함께 쓰지 않습니다.',
          'heavy처럼 "자음 + y"로 끝나는 짧은 낱말은 more 대신 y를 i로 바꾸고 -er 꼬리를 붙입니다.',
        ],
        explain: '뒤에 than이 있으니 비교급입니다. heavy는 "자음 + y"로 끝나므로 **heavier**입니다. "제 여행 가방이 당신 것보다 무겁습니다."',
      },
      {
        id: 'p8', level: 1, type: 'short', check: 'text', concept: 3,
        q: '다음 형용사의 비교급을 쓰세요.\n\ngood',
        answer: ['better'],
        wrong: [
          { a: 'gooder', why: 'good은 불규칙하게 변합니다. -er 꼬리를 붙이지 않습니다.' },
          { a: 'more good', why: 'good의 비교급은 모양이 완전히 바뀌는 불규칙 비교급입니다.' },
          { a: 'best', why: 'best는 최상급(가장 좋은)입니다. 비교급(더 좋은)은 better입니다.' },
        ],
        explain: 'good의 비교급은 불규칙하게 **better**(더 좋은), 최상급은 the best(가장 좋은)입니다.',
      },
      {
        id: 'p9', level: 1, type: 'choice', concept: 4,
        q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n지아는 가족 중에서 키가 가장 큽니다.\n→ Jia is ___ in her family.',
        choices: ['the tallest', 'taller', 'the most tall', 'tallest than'],
        answer: 0,
        why: [
          '',
          '비교급은 둘을 견줄 때 씁니다. 가족 모두 가운데 "가장"이므로 최상급입니다.',
          'tall처럼 짧은 낱말의 최상급은 most를 쓰지 않고 -est 꼬리를 붙입니다.',
          '최상급 뒤에는 than이 아니라 in·of로 범위를 씁니다. the도 빠졌습니다.',
        ],
        explain: '"가족 중에서 가장"이므로 최상급 **the tallest**를 쓰고, 범위는 in her family로 나타냅니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'text', concept: 3,
        q: '괄호 안의 말을 알맞은 꼴로 바꾸어 쓰세요.\n\nThis movie is ___ than the book. (interesting)',
        answer: ['more interesting'],
        hint: '빈칸 뒤에 than이 있습니다. interesting은 긴 낱말입니다.',
        wrong: [
          { a: 'interestinger', why: 'interesting처럼 긴 낱말에는 -er 꼬리를 붙이지 않고 앞에 more를 씁니다.' },
          { a: 'most interesting', why: 'most는 최상급(가장)입니다. than이 있으니 비교급 more를 씁니다.' },
          { a: 'interesting', why: '원급 그대로입니다. than 앞에는 비교급을 씁니다.' },
        ],
        explain: 'than이 있으니 비교급이고, interesting은 긴 낱말이라 **more interesting**입니다. "이 영화가 원작 책보다 재미있습니다."',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 5,
        q: '다음 문장의 뜻으로 알맞은 것을 고르세요.\n\nMy laptop is not as light as yours.',
        choices: ['내 노트북이 당신 것보다 무겁다.', '내 노트북이 당신 것보다 가볍다.', '내 노트북과 당신 것은 무게가 같다.'],
        answer: 0,
        why: [
          '',
          '반대로 풀었습니다. not as light as는 "~만큼 가볍지 않다", 곧 더 무겁다는 뜻입니다.',
          '무게가 같다는 뜻은 not이 없는 as light as입니다.',
        ],
        explain: 'not as light as는 "~만큼 가볍지 않다"이므로 내 노트북이 **더 무겁습니다**. Your laptop is lighter than mine.과 같은 뜻입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 5,
        q: '다음 문장과 뜻이 같은 것을 고르세요.\n\nThe subway is faster than the bus.',
        choices: ['The bus is not as fast as the subway.', 'The bus is as fast as the subway.', 'The subway is not as fast as the bus.', 'The bus is faster than the subway.'],
        answer: 0,
        hint: '어느 쪽이 더 빠른지 먼저 정리해 보세요.',
        why: [
          '',
          'as fast as는 빠르기가 같다는 뜻입니다. 지하철이 더 빠르므로 같지 않습니다.',
          '지하철이 버스만큼 빠르지 않다는 뜻이 되어 반대입니다.',
          '버스가 더 빠르다는 뜻이 되어 반대입니다.',
        ],
        explain: '지하철이 더 빠르다는 말은 "버스는 지하철만큼 빠르지 않다"와 같습니다: **The bus is not as fast as the subway.**',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 3,
        q: '**옳지 않은** 문장을 고르세요.',
        choices: ['This box is much heavier than that one.', 'She drives more carefully than her husband.', 'He is very taller than his father.', 'My English is better than it was last year.'],
        answer: 2,
        why: [
          '비교급을 much로 강조해 "훨씬 더 무거운"을 바르게 나타냈습니다.',
          '-ly 부사 carefully의 비교급을 more carefully로 바르게 썼습니다.',
          '',
          'good의 비교급 better를 바르게 썼습니다.',
        ],
        hint: '비교급 앞에서 "훨씬"을 나타내는 말을 살펴보세요.',
        explain: '비교급을 강조할 때는 very가 아니라 much나 a lot을 씁니다. **He is much taller than his father.** 로 고칩니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 1,
        q: '다음 문장의 뜻으로 알맞은 것을 고르세요.\n\nI hardly know my new neighbors.',
        choices: ['저는 새 이웃들을 거의 모릅니다.', '저는 새 이웃들을 아주 잘 압니다.', '저는 새 이웃들을 힘들게 알게 되었습니다.'],
        answer: 0,
        why: [
          '',
          'hardly를 hard(열심히)와 같은 뜻으로 보았습니다. hardly는 "거의 ~않다"입니다.',
          'hardly는 "힘들게"가 아니라 "거의 ~않다"라는 뜻입니다.',
        ],
        explain: 'hardly는 "거의 ~않다"라는 뜻의 부사입니다. 그래서 "새 이웃들을 거의 모릅니다"입니다. hard(열심히)에 -ly가 붙은 꼴처럼 보이지만 뜻이 전혀 다릅니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'text', concept: 4,
        q: '우리말에 맞게 빈칸에 알맞은 말을 한 낱말로 쓰세요.\n\n이 문제가 셋 중에서 가장 쉽습니다.\n→ This question is the ___ of the three.',
        answer: ['easiest'],
        hint: '앞에 the가 있고, easy는 "자음 + y"로 끝납니다.',
        wrong: [
          { a: 'easyest', why: '"자음 + y"로 끝나는 낱말은 y를 i로 바꾸고 -est 꼬리를 붙입니다.' },
          { a: 'easier', why: 'easier는 비교급(더 쉬운)입니다. 셋 중 "가장"이므로 최상급입니다.' },
          { a: 'most easy', why: 'easy처럼 짧은 낱말은 most를 쓰지 않습니다. 그리고 답은 한 낱말입니다.' },
        ],
        explain: '셋 가운데 "가장"이므로 최상급이고, easy는 y를 i로 바꾸어 **easiest**입니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 4,
        q: '표의 내용과 **맞지 않는** 문장을 고르세요.\n\n| 물건 | 값 |\n|---|---|\n| pen | 3,000원 |\n| notebook | 5,000원 |\n| eraser | 3,000원 |',
        choices: ['The notebook is the most expensive of the three.', 'The pen is as expensive as the eraser.', 'The pen is cheaper than the notebook.', 'The eraser is more expensive than the pen.'],
        answer: 3,
        why: [
          '공책이 5,000원으로 셋 중 가장 비싸므로 표와 맞습니다.',
          '펜과 지우개는 둘 다 3,000원이라 값이 같으므로 표와 맞습니다.',
          '펜(3,000원)이 공책(5,000원)보다 싸므로 표와 맞습니다.',
          '',
        ],
        hint: '값이 같은 것끼리는 어떤 표현을 쓰는지 생각해 보세요.',
        explain: '지우개와 펜은 값이 같으므로 "더 비싸다"고 할 수 없습니다. 바르게 말하면 **The eraser is as expensive as the pen.** 입니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 2,
        q: '글을 읽고 내용과 맞는 문장을 고르세요.\n\nJia goes to the gym every day. Minsu goes to the gym on Mondays and Fridays. Seojun does not like the gym. He stays home and reads books.',
        choices: ['Jia always goes to the gym.', 'Minsu never goes to the gym.', 'Seojun always goes to the gym.', 'Jia sometimes goes to the gym.'],
        answer: 0,
        why: [
          '',
          '민수는 월요일과 금요일에 가므로 "절대 가지 않는다"가 아닙니다. 가끔(sometimes) 간다고 할 수 있습니다.',
          '서준이는 체육관에 가지 않고 집에서 책을 읽습니다. never에 가깝습니다.',
          '지아는 매일 가므로 "가끔"이 아니라 "늘"입니다.',
        ],
        hint: '"매일"은 빈도부사 가운데 어느 것과 가장 가까울까요?',
        explain: '지아는 매일(every day) 체육관에 가므로 "늘"이라는 뜻의 **always**가 맞습니다. 민수는 일주일에 두 번이니 sometimes, 서준이는 가지 않으니 never로 말할 수 있습니다.',
      },
    ],

    deeper: [
      {
        title: '-ly로 끝나지만 형용사인 말',
        body: '-ly로 끝나는 말이 모두 부사는 아닙니다. 명사 끝에 -ly가 붙어 **형용사**가 된 말들이 있습니다.\n\n| 낱말 | 품사와 뜻 |\n|---|---|\n| friendly | 친절한, 다정한 (friend + ly) |\n| lovely | 사랑스러운, 아주 좋은 |\n| lonely | 외로운 |\n| daily | 매일의 (부사로도 씁니다) |\n\n- She is a **friendly** person. (그녀는 친절한 사람입니다.)\n\nfriendly는 형용사라서 friendlily처럼 다시 -ly를 붙여 부사로 쓰지 않습니다. "친절하게"라고 하려면 in a friendly way라고 합니다.\n\n- He spoke to me **in a friendly way**. (그는 제게 친절하게 말했습니다.)',
      },
      {
        title: '비교급으로 만드는 표현 — the 비교급, the 비교급',
        body: '비교급 두 개를 the와 함께 나란히 놓으면 "~할수록 더 ~하다"라는 뜻이 됩니다.\n\n- **The sooner, the better.** (빠를수록 좋습니다.)\n- **The more** you practice, **the better** you speak. (연습을 많이 할수록 말을 더 잘하게 됩니다.)\n\n최상급 앞의 the와 달리, 이 the는 "그만큼"이라는 정도를 나타냅니다. 처음에는 The sooner, the better. 같은 짧은 표현부터 통째로 익혀 두면 편합니다.',
      },
    ],

    faq: [
      {
        q: 'more를 붙이는지 -er 꼬리를 붙이는지 어떻게 알아요?',
        a: '낱말의 길이로 정합니다. tall, cheap처럼 한 음절인 짧은 낱말은 -er 꼬리를, expensive, beautiful처럼 세 음절 이상인 긴 낱말은 앞에 more를 씁니다.\n\n두 음절 낱말은 끝이 "자음 + y"면 -ier(easy → easier, busy → busier), -ful·-ous·-ing 같은 끝이면 more(useful → more useful)가 기본입니다. 헷갈리는 낱말은 사전에서 비교급을 확인하는 습관을 들이면 좋습니다.',
      },
      {
        q: '"He is taller than me"랑 "He is taller than I am"은 뭐가 달라요?',
        a: '뜻은 같습니다. than 뒤에 I am을 다 쓰면 격식 있는 문장, than me로 짧게 쓰면 일상 대화에서 흔히 쓰는 말입니다.\n\n시험 같은 격식 있는 글에서는 than I am이 안전하고, 말할 때는 than me도 자연스럽습니다. than I 하나로 끝내면 조금 딱딱하게 들립니다.',
      },
      {
        q: 'fast는 왜 fastly가 아니에요?',
        a: 'fast는 원래부터 형용사(빠른)와 부사(빨리)로 함께 쓰이는 낱말이라 -ly를 붙이지 않습니다. hard, early, late도 같습니다.\n\n특히 hardly(거의 ~않다), lately(최근에)는 -ly가 붙어 뜻이 완전히 달라진 낱말이니 hard, late와 섞어 쓰지 않도록 합니다.',
      },
    ],

    mistakes: [
      '동사를 꾸미는 자리에 형용사를 쓰는 실수 — She speaks English good. / Drive careful. (✗) → She speaks English well. / Drive carefully. (○)',
      '빈도부사의 자리를 거꾸로 두는 실수 — She always is late. / I eat always breakfast. (✗) → She is always late. / I always eat breakfast. (○) be동사 뒤, 일반동사 앞입니다.',
      '비교급에 more와 -er를 함께 쓰거나 very로 강조하는 실수 — more taller, very taller (✗) → taller, much taller (○)',
    ],

    gens: [
      {
        id: 'adverb-form',
        level: 1,
        title: '형용사를 부사로 바꾸기',
        make: function (R) {
          var a = R.pick(ADVS);
          var wrong = [];
          if (a[3] && a[1].indexOf(a[3]) < 0) {
            // "철자를 확인하세요"는 ly·y·le 철자 실수에만 — goodly·fastly·earlily는 철자가 아니라 꼴을 잘못 만든 것
            var wWhy = a[2] === 'ly' || a[2] === 'y' || a[2] === 'le' ? '철자를 확인하세요. ' + ADV_RULE[a[2]] : ADV_RULE[a[2]];
            wrong.push({ a: a[3], why: wWhy });
          }
          if (a[1].indexOf(a[0]) < 0) wrong.push({ a: a[0], why: '형용사 그대로입니다. ' + ADV_RULE[a[2]] });
          return {
            type: 'short', check: 'text', concept: 1,
            q: '다음 형용사를 부사로 바꾸어 쓰세요.\n\n' + a[0],
            answer: a[1].slice(),
            hint: '낱말의 끝 글자를 보세요. 모양이 바뀌지 않는 부사도 있습니다.',
            wrong: wrong,
            explain: ADV_RULE[a[2]] + '\n\n' + a[0] + ' → **' + a[1][0] + '**',
          };
        },
      },
      {
        id: 'comparative-form',
        level: 1,
        title: '비교급 만들기',
        make: function (R) {
          var c = R.pick(COMPS);
          var wrong = [];
          // more tall 같은 실수는 철자 문제가 아니므로 "철자를 확인하세요"를 붙이지 않는다
          var cWhy = /^more /.test(c[3]) ? '짧은 낱말에는 more를 쓰지 않습니다. '
            : c[2] === 'more' || c[2] === 'irr' ? '' : '철자를 확인하세요. ';
          if (c[3] && c[1].indexOf(c[3]) < 0) wrong.push({ a: c[3], why: cWhy + COMP_RULE[c[2]] });
          wrong.push({ a: c[0], why: '원급 그대로입니다. 비교급은 "더 ~한"이라는 꼴입니다. ' + COMP_RULE[c[2]] });
          return {
            type: 'short', check: 'text', concept: 3,
            q: '다음 낱말의 비교급을 쓰세요.\n\n' + c[0],
            answer: c[1].slice(),
            hint: '낱말의 길이와 끝 글자를 보세요.',
            wrong: wrong,
            explain: COMP_RULE[c[2]] + '\n\n' + c[0] + ' → **' + c[1][0] + '**',
          };
        },
      },
      {
        id: 'degree-choice',
        level: 2,
        title: '원급·비교급·최상급 고르기',
        make: function (R) {
          var d = R.pick(DEGREE);
          var opts = d[2].slice();
          var right = opts[d[1]];
          return {
            type: 'choice', concept: d[3] === 'than' ? 3 : d[3] === 'the' ? 4 : 5,
            q: '빈칸에 알맞은 말을 고르세요.\n\n' + d[0],
            choices: opts,
            answer: d[1],
            fixed: true,
            hint: '빈칸 앞뒤에 than, the, as 가운데 무엇이 있는지 보세요.',
            why: opts.map(function (o, i) {
              return i === d[1] ? '' : o + ' — ' + DEGREE_NAME[i] + '입니다. ' + DEGREE_WHY[d[3]];
            }),
            explain: DEGREE_WHY[d[3]] + '\n\n바른 문장: ' + d[0].replace('___', right) + '\n(' + d[4] + ')',
          };
        },
      },
      {
        id: 'frequency-order',
        level: 2,
        title: '빈도부사 자리에 맞게 배열하기',
        make: function (R) {
          var f = R.pick(FREQ);
          var words = f[0];
          var adv = f[2] ? words[2] : words[1];
          var verb = f[2] ? words[1] : words[2];
          return {
            type: 'order', concept: 2,
            q: '우리말에 맞게 배열하세요.\n\n' + f[1],
            choices: words.slice(),
            answer: words.map(function (w, i) { return i; }),
            hint: f[2] ? '이 문장의 동사는 be동사입니다.' : '이 문장의 동사는 일반동사입니다.',
            explain: (f[2]
              ? '이 문장의 동사 ' + verb + ' — be동사입니다. 빈도부사(' + adv + ')는 be동사 뒤에 둡니다.'
              : '이 문장의 동사 ' + verb + ' — 일반동사입니다. 빈도부사(' + adv + ')는 일반동사 앞에 둡니다.') + '\n\n바른 문장: **' + words.join(' ') + '.**',
          };
        },
      },
    ],

    vocab: [
      { w: 'expensive', m: '비싼', ex: 'This restaurant is too expensive for me.', exm: '이 식당은 제게 너무 비쌉니다.' },
      { w: 'cheap', m: '싼, 값이 적은', ex: 'The bus is cheaper than a taxi.', exm: '버스가 택시보다 쌉니다.' },
      { w: 'comfortable', m: '편안한', ex: 'These shoes are very comfortable.', exm: '이 신발은 아주 편합니다.' },
      { w: 'convenient', m: '편리한', ex: 'The subway is the most convenient way to get there.', exm: '그곳에 가는 데는 지하철이 가장 편리합니다.' },
      { w: 'popular', m: '인기 있는', ex: 'This song is popular with young people.', exm: '이 노래는 젊은 사람들에게 인기가 있습니다.' },
      { w: 'crowded', m: '붐비는', ex: 'The store is always crowded on weekends.', exm: '그 가게는 주말에 늘 붐빕니다.' },
      { w: 'quiet', m: '조용한', ex: 'Please be quiet in the library.', exm: '도서관에서는 조용히 해 주세요.' },
      { w: 'careful', m: '조심스러운, 꼼꼼한', ex: 'Be careful. The floor is wet.', exm: '조심하세요. 바닥이 젖어 있습니다.' },
      { w: 'carefully', m: '조심스럽게, 꼼꼼히', ex: 'Please read the contract carefully.', exm: '계약서를 꼼꼼히 읽어 주세요.' },
      { w: 'usually', m: '보통, 대개', ex: 'I usually have lunch at noon.', exm: '저는 보통 정오에 점심을 먹습니다.' },
      { w: 'sometimes', m: '가끔, 때때로', ex: 'We sometimes eat out on Fridays.', exm: '우리는 금요일에 가끔 외식을 합니다.' },
      { w: 'never', m: '절대 ~않다, 한 번도 ~않다', ex: 'He never drinks coffee at night.', exm: '그는 밤에는 절대 커피를 마시지 않습니다.' },
      { w: 'hardly', m: '거의 ~않다', ex: 'I hardly sleep before an exam.', exm: '저는 시험 전에는 거의 잠을 못 잡니다.' },
      { w: 'friendly', m: '친절한, 다정한', ex: 'Our new neighbors are very friendly.', exm: '새 이웃들은 아주 친절합니다.' },
    ],
  });
})();
