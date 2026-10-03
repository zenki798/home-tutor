/* 대학 영어: 문법과 독해 · 명사구 확장과 후치 수식
 * 예문은 모두 직접 쓴 문장이다(가상의 연구·인물). */
(function () {
  // 중심 명사 찾기 생성기: [명사구, 중심 명사, 자주 고르는 틀린 명사, 틀린 까닭 종류, 개념 카드]
  var HEAD = [
    ['the effect of noise on sleep quality', 'effect', 'quality', 'pp', 0],
    ['a widely used data collection method', 'method', 'data', 'nn', 4],
    ['the number of students living in dormitories', 'number', 'students', 'pp', 4],
    ['recent changes in the eating habits of teenagers', 'changes', 'habits', 'pp', 0],
    ['the main reason for the sharp decline in sales', 'reason', 'decline', 'pp', 0],
    ['a new report on air pollution in large cities', 'report', 'pollution', 'pp', 0],
    ['the ability of young children to learn new languages', 'ability', 'children', 'pp', 1],
    ['the rapid growth of online shopping in rural areas', 'growth', 'shopping', 'pp', 0],
    ['the relationship between stress and heart disease', 'relationship', 'disease', 'pp', 0],
    ['an important factor affecting student performance', 'factor', 'performance', 'post', 1],
    ['the books that the professor recommended in the first lecture', 'books', 'lecture', 'post', 2],
    ['the idea that money can buy happiness', 'idea', 'happiness', 'post', 3],
    ['a long-term research project funded by the city', 'project', 'research', 'nn', 4],
    ['the cost of public transportation in small towns', 'cost', 'transportation', 'pp', 0],
    ['the first country to ban plastic bags', 'country', 'bags', 'post', 1],
    ['a decision to close two hospitals in the region', 'decision', 'hospitals', 'post', 1],
    ['the scientists whose work changed our view of the universe', 'scientists', 'work', 'post', 2],
    ['access to clean drinking water for every household', 'access', 'water', 'pp', 0],
    ["the city's new waste management policy", 'policy', 'management', 'nn', 4],
    ['the list of questions to be discussed at the meeting', 'list', 'questions', 'pp', 4],
    ['the demand for skilled workers in the technology industry', 'demand', 'workers', 'pp', 0],
    ['the main purpose of this short survey of local farmers', 'purpose', 'farmers', 'pp', 0],
    ['the dramatic increase in the price of rice', 'increase', 'price', 'pp', 0],
  ];
  var HEAD_WHY = {
    pp: '전치사구(of·in·on·for 등으로 시작하는 말) 안의 명사입니다. 전치사구는 앞 명사를 뒤에서 꾸미는 수식어라서 중심 명사가 아닙니다.',
    nn: '명사 앞에서 다른 명사를 꾸미는 명사 수식어입니다. 명사가 여러 개 겹쳐 있으면 마지막 명사가 중심입니다.',
    post: '뒤에서 꾸미는 분사구·to부정사구·관계절·동격절 안의 명사입니다. 꾸밈을 받는 명사는 그보다 앞에 있습니다.',
  };

  // 분사 고르기 생성기: [문장(괄호 안 동사), 정답, 자주 나오는 틀린 답, 꾸밈받는 명사, 능동 여부]
  var PART = [
    ['The data (collect) in 2020 were incomplete.', 'collected', 'collecting', 'The data', false],
    ['Students (live) far from the campus can take the free bus.', 'living', 'lived', 'Students', true],
    ['The method (use) in this study is simple.', 'used', 'using', 'The method', false],
    ['Countries (produce) large amounts of rice need a lot of water.', 'producing', 'produced', 'Countries', true],
    ['The book (write) by two nurses became very popular.', 'written', 'writing', 'The book', false],
    ['People (wait) for the bus looked tired.', 'waiting', 'waited', 'People', true],
    ['The houses (damage) by the flood were rebuilt.', 'damaged', 'damaging', 'The houses', false],
    ['A man (carry) a large box entered the room.', 'carrying', 'carried', 'A man', true],
    ['The results (report) in the paper were surprising.', 'reported', 'reporting', 'The results', false],
    ['There are many children (learn) English online.', 'learning', 'learned', 'children', true],
    ['The questions (ask) during the interview were easy.', 'asked', 'asking', 'The questions', false],
    ['Scientists (study) climate change met in Busan last week.', 'studying', 'studied', 'Scientists', true],
    ['The language (speak) in this region is very old.', 'spoken', 'speaking', 'The language', false],
    ['The bridge (build) in 1900 is still in use.', 'built', 'building', 'The bridge', false],
    ['The girl (sit) next to Jia is my cousin.', 'sitting', 'sat', 'The girl', true],
    ['The temperature (record) at noon was 35 degrees.', 'recorded', 'recording', 'The temperature', false],
    ['Products (make) from recycled paper are popular.', 'made', 'making', 'Products', false],
    ['Anyone (want) to join the club should sign up by Friday.', 'wanting', 'wanted', 'Anyone', true],
    ['The letters (send) last week have not arrived yet.', 'sent', 'sending', 'The letters', false],
    ['Birds (migrate) south in winter fly thousands of kilometers.', 'migrating', 'migrated', 'Birds', true],
    ['The money (raise) at the festival was given to the library.', 'raised', 'raising', 'The money', false],
    ['An email (contain) the test results was sent to each participant.', 'containing', 'contained', 'An email', true],
  ];

  Tutor.registerUnit({
    id: 'eng-u-grammar-03',
    course: 'eng-u-grammar',
    title: '명사구 확장과 후치 수식',
    summary: '전치사구·분사·to부정사·관계절·동격절이 뒤에서 꾸며 길어진 명사구를 정확히 읽습니다.',
    goals: [
      '전치사구가 뒤에서 꾸미는 명사구(the effect of A on B)의 뜻을 정확히 읽을 수 있다.',
      '분사구와 to부정사가 명사를 꾸밀 때 능동·수동과 뜻을 구별할 수 있다.',
      '관계절의 제한적 용법과 계속적 용법, 동격 that절과 관계대명사 that을 구별할 수 있다.',
      '겹겹이 꾸며진 명사구에서 중심 명사를 찾아 수 일치를 판단할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '전치사구 수식: the effect of A on B',
        body: '우리말은 꾸미는 말이 명사 **앞**에 오지만("소음이 수면에 미치는 영향"), 영어는 긴 꾸밈말이 명사 **뒤**에 붙습니다. 이것을 **후치 수식**이라고 합니다. 그 가운데 가장 흔한 것이 전치사구입니다.\n\n' +
          '| 명사구 | 뜻 |\n|---|---|\n' +
          '| the effect / impact **of** A **on** B | A가 B에 미치는 영향 |\n' +
          '| the relationship **between** A **and** B | A와 B 사이의 관계 |\n' +
          '| an increase / a decrease **in** A | A의 증가 / 감소 |\n' +
          '| the role **of** A **in** B | B에서 A의 역할 |\n' +
          '| access **to** A | A에 대한 접근(이용할 수 있음) |\n' +
          '| demand **for** A | A에 대한 수요 |\n' +
          '| a solution **to** A | A의 해결책 |\n\n' +
          'the effect of noise on sleep에서 중심 명사는 맨 앞의 **effect**이고, of noise와 on sleep은 effect를 꾸밉니다. 그래서 이 명사구가 주어가 되면 동사는 effect에 맞춥니다.\n\n' +
          '> 💡 명사와 짝을 이루는 전치사는 정해져 있는 경우가 많습니다(increase **in**, solution **to**, demand **for**). 낱말을 외울 때 전치사까지 함께 익혀 두십시오.',
        easy: '영어 명사구는 "이름 먼저, 설명은 나중"입니다. the effect(영향) — 무엇의? of noise(소음의) — 어디에? on sleep(수면에). 이렇게 맨 앞 명사에 질문을 던지며 읽으면 뒤의 전치사구가 자연스럽게 붙습니다.',
        check: {
          type: 'choice',
          q: 'the impact of social media on teenagers\' sleep에서 중심 명사는 무엇입니까?',
          choices: ['social media', 'impact', 'sleep'],
          answer: 1,
          why: [
            'social media는 of 뒤에 오는 전치사구 안의 명사입니다. impact를 꾸미는 말입니다.',
            '',
            'sleep은 on 뒤에 오는 전치사구 안의 명사입니다. 맨 끝에 있다고 중심 명사가 되는 것은 아닙니다.',
          ],
          explain: 'the impact (of social media) (on teenagers\' sleep) — 전치사구 두 개가 impact를 뒤에서 꾸밉니다. "소셜 미디어가 십 대의 수면에 미치는 영향"입니다.',
        },
      },
      {
        title: '분사구와 to부정사의 명사 수식',
        body: '분사와 to부정사도 명사를 뒤에서 꾸밉니다.\n\n' +
          '**현재분사(-ing)**: 꾸밈받는 명사가 그 동작을 **직접 하는** 관계(능동·진행)\n- students **living** abroad (해외에 사는 학생들 ← students live abroad)\n\n' +
          '**과거분사(-ed 등)**: 꾸밈받는 명사가 그 동작을 **받는** 관계(수동·완료)\n- the data **collected** in 2020 (2020년에 수집된 자료 ← the data were collected)\n\n' +
          '**to부정사**: "~할, ~하려는"의 뜻으로 명사를 꾸밉니다.\n- the ability **to adapt** (적응하는 능력), a decision **to postpone** the meeting (회의를 미루려는 결정)\n- the first country **to ban** plastic bags (비닐봉지를 금지한 첫 나라)\n- a place **to study** (공부할 곳)\n\n' +
          '> 💡 분사를 고를 때는 꾸밈받는 명사를 주어로 놓고 문장을 만들어 보십시오. "The data collect ~"(자료가 모은다)는 말이 안 되고 "The data are collected"(자료가 모아진다)가 맞으므로 collected입니다.',
        easy: '현재분사는 "하는", 과거분사는 "된·당한"이라고 생각하면 쉽습니다. a crying baby는 우는 아기, a broken window는 깨진 창문입니다. 명사가 직접 하면 -ing, 당하면 -ed입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe survey method ___ in this study is widely known.',
          choices: ['using', 'used', 'to using'],
          answer: 1,
          why: [
            '현재분사는 명사가 동작을 직접 할 때 씁니다. 방법(method)은 사용하는 쪽이 아니라 사용되는 쪽입니다.',
            '',
            'to부정사는 to + 동사원형입니다. to using이라는 꼴은 여기에 쓸 수 없습니다.',
          ],
          explain: '방법은 연구에서 "사용된" 것이므로 과거분사 used가 알맞습니다. The survey method (used in this study) is widely known.',
        },
      },
      {
        title: '관계절: 제한적 용법과 계속적 용법',
        body: '관계절도 명사를 뒤에서 꾸밉니다. 콤마의 있고 없음에 따라 쓰임이 갈립니다.\n\n' +
          '| | 제한적 용법 | 계속적 용법 |\n|---|---|---|\n' +
          '| 모양 | 콤마 없음 | 관계사 앞에 콤마 |\n' +
          '| 역할 | 여럿 가운데 범위를 좁혀 가려냄 | 이미 정해진 대상에 정보를 덧붙임 |\n' +
          '| that | 쓸 수 있음 | 쓸 수 없음 |\n' +
          '| 목적격 관계대명사 생략 | 할 수 있음 | 할 수 없음 |\n\n' +
          '- The students **who passed the exam** received certificates. → 합격한 학생만 받았습니다(합격하지 못한 학생도 있음).\n' +
          '- The students, **who passed the exam,** received certificates. → 학생들은 모두 합격했고 모두 받았습니다.\n\n' +
          '학술 글에서 자주 보는 꼴도 함께 익혀 둡니다.\n\n' +
          '- **전치사 + 관계대명사**: the extent **to which** ~(~하는 정도), the process **by which** ~(~하는 과정)\n' +
          '- **수량 표현 + of whom/which**: 200 people took part, **many of whom** were students.\n' +
          '- **앞 절 전체를 받는 which**: The test was canceled, **which** upset the students.',
        easy: '콤마는 "참고로" 하는 표시입니다. 콤마 없는 관계절은 "그중에서 이런 것"이라고 손가락으로 골라내고, 콤마 있는 관계절은 이미 아는 대상에 "참고로 말하면 ~"이라고 메모를 붙입니다.',
        check: {
          type: 'ox',
          q: 'The report, that was published last month, received wide attention.은 어법에 맞는 문장입니다.',
          answer: false,
          explain: '콤마 뒤의 계속적 용법에는 that을 쓸 수 없습니다. The report, **which** was published last month, received wide attention.으로 고칩니다.',
        },
      },
      {
        title: '동격 that절과 콤마 동격',
        body: '**동격**은 앞 명사의 내용을 다른 말로 풀어 주는 것입니다.\n\n' +
          '**동격 that절**: fact, idea, claim, belief, evidence, possibility, news, hypothesis 같은 명사 뒤에 that절을 붙여 그 **내용**을 밝힙니다.\n' +
          '- the **fact that** the earth is round (지구가 둥글다는 사실)\n' +
          '- There is no **evidence that** the drug causes cancer. (그 약이 암을 일으킨다는 증거)\n\n' +
          '관계대명사 that과 헷갈리기 쉬운데, **that 뒤의 절이 완전한지**로 가립니다.\n\n' +
          '| | 뒤의 절 | 예 |\n|---|---|---|\n' +
          '| 동격 that | 빠진 성분이 없는 완전한 절 | the claim **that the drug is safe** |\n' +
          '| 관계대명사 that | 주어나 목적어가 빠진 절 | the claim **that he made** (made의 목적어가 빠짐) |\n\n' +
          '**콤마 동격**: 명사 뒤에 콤마를 찍고 다른 명사구로 설명을 덧붙입니다.\n' +
          '- Ms. Han, **a biologist at a local university,** studies insects.\n' +
          '- The main finding, **an increase in reading time,** was unexpected.',
        easy: '동격은 "이름표"입니다. the fact라는 빈 상자에 that절이 내용물을 채워 넣습니다. 관계대명사 that은 앞 명사를 "그중에서 고르는" 말이라, 뒤 절에 그 명사가 들어갈 빈자리가 있습니다. 빈자리가 없으면 동격입니다.',
        check: {
          type: 'choice',
          q: 'that이 **동격**의 that으로 쓰인 것은 무엇입니까?',
          choices: [
            'The claim that he made was false.',
            'The claim that the drug is safe was false.',
            'He claimed that the drug is safe.',
          ],
          answer: 1,
          why: [
            'made 뒤에 목적어가 빠져 있습니다. that은 claim을 꾸미는 관계대명사입니다.',
            '',
            '동사 claimed의 목적어가 되는 명사절의 that입니다. 앞에 내용을 풀어 줄 명사가 없습니다.',
          ],
          explain: 'the drug is safe는 빠진 성분이 없는 완전한 절이고, claim(주장)의 내용을 풀어 줍니다. 그래서 동격의 that입니다.',
        },
      },
      {
        title: '겹겹이 꾸며진 명사구에서 중심 명사 찾기',
        body: '학술 글의 주어는 앞 꾸밈과 뒤 꾸밈이 겹쳐 아주 길어집니다. 다음 순서로 **중심 명사**를 찾습니다.\n\n' +
          '1. **앞 꾸밈**(관사·소유격·형용사·명사 수식어)을 지나 처음 나오는 명사 덩어리의 **마지막 명사**를 찾습니다.\n' +
          '2. 그 뒤의 전치사구·분사구·to부정사·관계절·동격절에 괄호를 칩니다.\n' +
          '3. 동사의 수가 중심 명사와 맞는지 확인합니다.\n\n' +
          '**a widely used data collection method** — 명사가 data, collection, method로 겹쳐 있으면 마지막 명사 **method**가 중심입니다(데이터 수집 방법).\n\n' +
          '**The growing number** (of young people) (living alone) (in large cities) **is** changing the housing market.\n\n' +
          '중심 명사는 number이므로 동사는 단수 is입니다. "대도시에서 혼자 사는 젊은이의 수가 늘면서 주택 시장을 바꾸고 있다."\n\n' +
          '> ⚠️ 동사 바로 앞의 명사(cities)에 수를 맞추지 마십시오. 중심 명사는 대개 명사구의 **앞쪽**에 있습니다.',
        easy: '긴 명사구는 기차와 같습니다. 맨 앞 기관차(중심 명사)가 객차(꾸밈말)를 줄줄이 끌고 갑니다. 기차가 아무리 길어도 기관차는 앞에 있습니다. 다만 기관차 앞에 붙은 장식(형용사·명사 수식어)은 기관차가 아니니, 장식이 끝나는 곳의 명사를 찾으십시오.',
        check: {
          type: 'short', check: 'text',
          q: '다음 명사구의 중심 명사를 찾아 그대로 쓰십시오.\n\na recent government report on the rising cost of housing',
          answer: ['report'],
          wrong: [
            { a: 'government', why: 'government는 report 앞에서 꾸미는 명사 수식어입니다(정부 보고서). 겹친 명사는 마지막 명사가 중심입니다.' },
            { a: 'cost', why: 'cost는 on 뒤 전치사구 안의 명사입니다. 중심 명사는 그 앞에 있습니다.' },
          ],
          explain: 'a recent government **report** (on the rising cost) (of housing) — 앞 꾸밈 recent government 뒤의 report가 중심 명사입니다. "주거비 상승에 관한 최근 정부 보고서"입니다.',
        },
      },
    ],

    examples: [
      {
        q: '다음 명사구를 구조대로 나누어 우리말로 옮기십시오.\n\nthe effect of temperature on the growth of plants grown in greenhouses',
        steps: [
          '중심 명사는 맨 앞의 effect입니다.',
          'effect를 뒤에서 꾸미는 전치사구는 of temperature(온도의), on the growth(성장에)의 두 개입니다: the effect of A on B = A가 B에 미치는 영향.',
          'growth 뒤의 of plants(식물의)는 growth를 꾸미고, grown in greenhouses(온실에서 재배된)는 plants를 꾸밉니다. plants는 재배되는 대상이라 과거분사 grown입니다.',
          '뒤에서부터 모으면: 온실에서 재배된 식물의 성장에 온도가 미치는 영향.',
        ],
        answer: '온실에서 재배된 식물의 성장에 온도가 미치는 영향',
      },
      {
        q: '두 문장의 뜻 차이를 설명하십시오.\n\n(1) The researchers who used the new software finished early.\n(2) The researchers, who used the new software, finished early.',
        steps: [
          '(1)은 콤마가 없는 제한적 용법입니다. 연구자들 가운데 새 소프트웨어를 쓴 사람들만 골라냅니다.',
          '그래서 (1)에는 새 소프트웨어를 쓰지 않은 연구자도 있었고, 그들은 일찍 끝내지 못했을 수 있습니다.',
          '(2)는 콤마가 있는 계속적 용법입니다. 연구자들은 모두 새 소프트웨어를 썼고, 모두 일찍 끝냈습니다.',
        ],
        answer: '(1) 소프트웨어를 쓴 일부 연구자만 일찍 끝냄 / (2) 연구자 모두가 소프트웨어를 썼고 모두 일찍 끝냄',
      },
    ],

    terms: [
      { term: '후치 수식', def: '꾸미는 말이 명사 뒤에 오는 것입니다. 전치사구·분사구·to부정사·관계절·동격절이 명사를 뒤에서 꾸밉니다.' },
      { term: '중심 명사', def: '명사구의 핵심이 되는 명사입니다. 동사의 수는 이 명사에 맞춥니다. 예: the number of students에서 number' },
      { term: '제한적 용법', def: '콤마 없이 관계절이 명사를 꾸며 여럿 가운데 대상을 가려내는 쓰임입니다.' },
      { term: '계속적 용법', def: '관계사 앞에 콤마를 찍어 이미 정해진 대상에 정보를 덧붙이는 쓰임입니다. that을 쓸 수 없습니다.' },
      { term: '동격', def: '앞 명사의 내용을 다른 말로 풀어 주는 것입니다. 예: the fact that she won, Ms. Han, a biologist' },
      { term: '명사 수식어', def: '명사 앞에서 다른 명사를 꾸미는 명사입니다. 예: data collection method에서 data와 collection' },
      { term: '전치사 + 관계대명사', def: 'to which, by which, in which처럼 전치사가 관계대명사 앞에 오는 꼴입니다. 예: the extent to which ~(~하는 정도)' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 전치사는 무엇입니까?\n\nThis study examines the effect of regular exercise ___ mental health.',
        choices: ['in', 'on', 'to', 'at'],
        answer: 1,
        why: [
          'in은 increase in·decrease in처럼 증감을 나타내는 명사와 어울립니다. effect의 대상은 on으로 나타냅니다.',
          '',
          'to는 access to·solution to와 어울립니다. "~에 미치는 영향"은 effect on입니다.',
          'at은 effect와 짝을 이루지 않습니다. the effect of A on B로 익혀 두십시오.',
        ],
        explain: 'the effect of A on B(A가 B에 미치는 영향): 규칙적인 운동이 정신 건강에 미치는 영향. 그래서 on입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
        q: '빈칸에 알맞은 전치사를 쓰십시오.\n\nThere has been a sharp increase ___ the number of single-person households.',
        answer: ['in'],
        wrong: [
          { a: 'of', why: 'an increase of 뒤에는 늘어난 양(an increase of 10%)이 옵니다. 무엇이 늘었는지를 말할 때는 an increase in을 씁니다.' },
          { a: 'on', why: 'on은 effect·impact와 어울립니다. 증가·감소한 대상은 in으로 나타냅니다.' },
        ],
        explain: 'an increase in A(A의 증가): 1인 가구 수의 가파른 증가. 무엇이 늘었는지를 나타낼 때는 in을 씁니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nStudents ___ to apply for the program must submit a short essay.',
        choices: ['wished', 'wish', 'wishing', 'to wishing'],
        answer: 2,
        why: [
          '과거분사는 명사가 동작을 받을 때 씁니다. 학생들은 지원하기를 바라는 주체입니다.',
          '이 문장의 동사는 must submit입니다. wish를 동사로 쓰면 접속사 없이 동사가 둘이 됩니다.',
          '',
          'to부정사는 to + 동사원형입니다. to wishing이라는 꼴은 쓰지 않습니다.',
        ],
        explain: '학생들이 직접 "바라는" 것이므로 현재분사 wishing이 Students를 꾸밉니다. Students (wishing to apply for the program) must submit a short essay.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: 'She was the first student to win the prize.에서 to win the prize는 student를 꾸밉니다.',
        answer: true,
        explain: 'the first + 명사 + to부정사는 "~한 첫 번째 (명사)"라는 뜻으로, to win the prize가 student를 뒤에서 꾸밉니다. "그 상을 받은 첫 학생"입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '다음 문장에서 콤마 사이의 관계절이 하는 역할은 무엇입니까?\n\nMy older brother, who lives in Daejeon, is a doctor.',
        choices: [
          '여러 형제 가운데 대전에 사는 한 명을 가려낸다',
          '이미 정해진 형(오빠)에 대해 정보를 덧붙인다',
          'is a doctor의 이유를 설명한다',
          '문장의 주어 역할을 한다',
        ],
        answer: 1,
        why: [
          '대상을 가려내는 것은 콤마 없는 제한적 용법입니다. 콤마가 있으면 정보를 덧붙이는 계속적 용법입니다.',
          '',
          '관계절은 brother에 대한 정보를 덧붙일 뿐, 의사인 이유를 말하지 않습니다.',
          '주어는 My older brother이고, 관계절은 그 주어에 덧붙은 수식어입니다.',
        ],
        explain: '콤마로 둘러싸인 who lives in Daejeon은 계속적 용법입니다. 이미 누구인지 정해진 형(오빠)에 대해 "참고로 대전에 산다"는 정보를 덧붙입니다.',
      },
      {
        id: 'p6', level: 1, type: 'ox', concept: 2,
        q: '목적격 관계대명사는 계속적 용법에서도 생략할 수 있습니다.',
        answer: false,
        explain: '목적격 관계대명사는 제한적 용법에서만 생략할 수 있습니다. The book, which I bought yesterday, is useful.에서 which는 생략할 수 없습니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nMany people still ignore the fact ___ sugar can harm the teeth.',
        choices: ['which', 'that', 'what', 'whether'],
        answer: 1,
        why: [
          'which는 관계대명사라서 뒤에 빠진 성분이 있어야 합니다. sugar can harm the teeth는 완전한 절입니다.',
          '',
          'what은 앞에 꾸밀 명사(the fact)가 있으면 쓰지 않습니다.',
          'whether는 "~인지 아닌지"라는 뜻입니다. fact(사실)는 확정된 내용이라 어울리지 않습니다.',
        ],
        explain: 'sugar can harm the teeth는 완전한 절이고 fact(사실)의 내용을 풀어 줍니다. 동격의 that을 씁니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'text', concept: 4,
        q: '괄호 안에서 어법에 맞는 것을 골라 쓰십시오.\n\nThe results of the survey of 500 office workers in three cities (show / shows) a clear pattern.',
        answer: ['show'],
        hint: '주어 덩어리에서 맨 앞의 명사를 찾아보십시오.',
        wrong: [{ a: 'shows', why: '동사 가까이의 명사(cities)나 survey에 맞춘 것 같습니다. 중심 명사는 복수 results입니다.' }],
        explain: 'The results (of the survey) (of 500 office workers) (in three cities) **show** a clear pattern. 중심 명사 results가 복수이므로 show입니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThis study examines the extent ___ social media affects sleep.',
        choices: ['which', 'to which', 'in that', 'of which'],
        answer: 1,
        why: [
          'social media affects sleep은 빠진 성분이 없는 절이라 관계대명사 which만으로는 이을 수 없습니다. 전치사가 필요합니다.',
          '',
          'in that은 "~라는 점에서"라는 뜻의 접속사로, the extent를 꾸미지 못합니다.',
          'the extent와 짝을 이루는 전치사는 to입니다(to a large extent).',
        ],
        hint: '"크게, 어느 정도까지"를 영어로 to a large extent라고 합니다.',
        explain: 'to a large extent(크게)처럼 extent는 전치사 to와 어울립니다. 그래서 the extent **to which** ~(~하는 정도)를 씁니다. "소셜 미디어가 수면에 어느 정도 영향을 주는지"입니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 3,
        q: '다음 문장에서 a biologist at a local university의 역할은 무엇입니까?\n\nMs. Han, a biologist at a local university, studies how insects find food.',
        choices: ['동사 studies의 목적어', 'Ms. Han을 설명하는 동격', '문장의 진짜 주어', '이유를 나타내는 부사구'],
        answer: 1,
        why: [
          'studies의 목적어는 how insects find food입니다.',
          '',
          '주어는 Ms. Han입니다. 콤마 사이의 명사구는 주어에 덧붙은 설명입니다.',
          '콤마 사이의 말은 명사구이고, 이유가 아니라 Ms. Han이 누구인지를 말합니다.',
        ],
        explain: '콤마 사이의 명사구가 앞 명사 Ms. Han이 누구인지 풀어 주는 콤마 동격입니다. "지역 대학의 생물학자인 한 선생님은 곤충이 먹이를 찾는 방법을 연구합니다."',
      },
      {
        id: 'p11', level: 2, type: 'order', concept: 4,
        q: '낱말 덩어리를 바른 순서로 놓아 문장을 완성하십시오.\n\n(뜻: 혼자 사는 사람의 수가 늘었다.)',
        choices: ['living alone', 'has risen', 'The number', 'of people'],
        answer: [2, 3, 0, 1],
        explain: 'The number / of people / living alone / has risen. — 중심 명사 number를 전치사구 of people이, people을 분사구 living alone이 꾸밉니다. 중심 명사가 단수라서 has risen입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe government made an attempt ___ the problem of rising prices.',
        choices: ['solved', 'to solve', 'to solving', 'solves'],
        answer: 1,
        why: [
          '과거분사는 수동의 뜻으로 명사를 꾸밉니다. 시도가 "해결된" 것이 아니라 문제를 "해결하려는" 시도입니다.',
          '',
          'attempt 뒤에는 to + 동사원형을 씁니다. to solving은 쓰지 않습니다.',
          'solves는 정동사라서 명사 attempt를 바로 꾸밀 수 없습니다.',
        ],
        explain: 'an attempt to + 동사원형(~하려는 시도). to solve the problem이 attempt를 꾸밉니다. "물가 상승 문제를 해결하려는 시도"입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe growing number of young people who live alone in large cities ___ changing the housing market.',
        choices: ['are', 'is', 'being', 'have'],
        answer: 1,
        why: [
          'people이나 cities에 맞춘 것 같습니다. 중심 명사는 단수 number입니다.',
          '',
          'being은 정동사가 아닙니다. 주절의 동사가 필요합니다.',
          'have changing이라는 꼴은 없습니다. 진행형은 be + -ing입니다.',
        ],
        hint: '관계절 who live alone in large cities의 동사 live는 people에 맞춘 것입니다. 주절의 동사는 무엇에 맞출까요?',
        explain: 'The growing number (of young people) (who live alone in large cities) **is** changing ~. 관계절 안의 live는 people에 맞춘 복수이고, 주절의 동사는 중심 명사 number에 맞춘 단수 is입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 2,
        q: '다음 문장에서 which가 가리키는 것은 무엇입니까?\n\nThe experiment failed twice, which surprised the whole team.',
        choices: ['The experiment', 'twice', '앞 절 전체(실험이 두 번 실패한 것)', 'the whole team'],
        answer: 2,
        why: [
          '실험 자체가 아니라 실험이 두 번이나 실패한 일이 팀을 놀라게 했습니다.',
          'twice는 횟수를 나타내는 부사라서 관계대명사의 선행사가 되지 않습니다.',
          '',
          'the whole team은 surprised의 목적어입니다. 놀란 대상이지 놀라게 한 것이 아닙니다.',
        ],
        hint: '무엇이 팀을 놀라게 했는지 생각해 보십시오.',
        explain: '콤마 뒤의 which는 앞 절 전체(The experiment failed twice)를 받을 수 있습니다. "실험이 두 번 실패했고, 그 일이 팀 전체를 놀라게 했다."',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 3,
        q: 'that의 쓰임이 나머지 셋과 **다른** 것은 무엇입니까?',
        choices: [
          'the news that the factory will close',
          'the belief that hard work pays off',
          'the evidence that the team collected',
          'the possibility that the data are wrong',
        ],
        answer: 2,
        why: [
          'the factory will close는 완전한 절로 news의 내용을 풀어 주는 동격 that입니다.',
          'hard work pays off는 완전한 절로 belief의 내용을 풀어 주는 동격 that입니다.',
          '',
          'the data are wrong은 완전한 절로 possibility의 내용을 풀어 주는 동격 that입니다.',
        ],
        hint: 'that 뒤의 절에서 빠진 성분이 있는지 보십시오.',
        explain: 'the team collected 뒤에는 목적어가 빠져 있습니다. 이 that은 evidence를 꾸미는 관계대명사입니다(팀이 수집한 증거). 나머지는 모두 완전한 절이 앞 명사의 내용을 밝히는 동격 that입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'text', concept: 4,
        q: '다음 문장에서 주어의 중심 명사를 찾아 그대로 쓰십시오.\n\nA detailed analysis of the costs and benefits of building a new airport near the coast was presented to the council.',
        answer: ['analysis'],
        hint: '앞 꾸밈(관사·형용사)을 지나 처음 나오는 명사를 찾으십시오.',
        wrong: [
          { a: 'costs', why: 'costs는 of 뒤 전치사구 안의 명사입니다. 동사도 단수 was라서 복수 costs와 맞지 않습니다.' },
          { a: 'airport', why: 'airport는 동명사 building의 목적어로, 전치사구 깊숙이 들어 있는 명사입니다.' },
        ],
        explain: 'A detailed **analysis** (of the costs and benefits) (of building a new airport near the coast) was presented ~. 중심 명사가 단수 analysis라서 동사도 단수 was입니다. "해안 근처에 새 공항을 짓는 일의 비용과 이익에 대한 상세한 분석이 의회에 제출되었다."',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe study included 200 participants, ___ were over 60 years old.',
        choices: ['many of them', 'many of whom', 'many of which', 'whom many'],
        answer: 1,
        why: [
          'them은 대명사라서 두 절을 잇지 못합니다. 콤마만으로 두 문장을 붙인 꼴이 됩니다.',
          '',
          'participants는 사람이므로 which가 아니라 whom을 씁니다.',
          '수량 표현은 of whom 앞에 옵니다(many of whom).',
        ],
        hint: '두 절을 이어 주는 말이 필요하고, 가리키는 대상은 사람입니다.',
        explain: '수량 표현 + of + 관계대명사 꼴입니다. 사람(participants)을 가리키므로 **many of whom**을 씁니다. "참여자 200명이 있었고, 그 가운데 많은 사람이 60세가 넘었다."',
      },
    ],

    deeper: [
      {
        title: '왜 학술 영어는 명사구가 길까?',
        body: '학술 글은 정보를 빽빽하게 담으려고 동사보다 **명사구**를 중심으로 문장을 짭니다. 꾸밈말을 명사 뒤에 줄줄이 붙이면 한 문장의 주어 하나에 연구의 대상·조건·범위를 모두 담을 수 있습니다.\n\n' +
          'the long-term effects of air pollution on the health of children living near highways (고속도로 근처에 사는 아이들의 건강에 대기 오염이 미치는 장기적 영향)\n\n' +
          '이렇게 압축하면 글이 짧아지는 대신 읽는 사람이 구조를 직접 풀어야 합니다. 다음 단원에서 배울 **명사화**(동사를 명사로 바꾸어 쓰기)가 이런 명사구를 더 길고 촘촘하게 만드는 주된 원인입니다.',
      },
    ],

    faq: [
      {
        q: '현재분사랑 과거분사 중에 뭘 쓸지 어떻게 정해요?',
        a: '꾸밈받는 명사를 주어로 놓고 문장을 만들어 보십시오. 명사가 그 동작을 직접 하면 현재분사(students living abroad ← students live abroad), 동작을 받으면 과거분사(the data collected ← the data were collected)입니다.',
      },
      {
        q: '동격 that이랑 관계대명사 that은 어떻게 구별해요?',
        a: 'that 뒤의 절이 완전한지 보십시오. 주어·목적어가 다 있는 완전한 절이면 앞 명사의 내용을 밝히는 동격 that이고, 주어나 목적어가 빠져 있으면 관계대명사 that입니다. 또 동격 that은 fact, idea, claim, evidence처럼 "내용"을 가질 수 있는 명사 뒤에 옵니다.',
      },
      {
        q: '콤마가 있으면 that을 왜 못 써요?',
        a: '영어의 관습입니다. 계속적 용법(콤마 + 관계사)에는 who, which, whom, whose를 쓰고 that은 쓰지 않습니다. 콤마 뒤에 that이 보이면 관계대명사로는 틀린 것이니 which나 who로 고칩니다.',
      },
    ],

    mistakes: [
      '긴 명사구 주어에서 동사를 바로 앞 명사에 맞추는 실수 — The effects of social media on teenagers **is** ✕ → 중심 명사 effects에 맞춰 **are** ✓',
      '분사의 능동·수동을 거꾸로 쓰는 실수 — the method **using** in this study ✕ → 방법은 사용되는 것이므로 **used** ✓',
      '계속적 용법에 that을 쓰는 실수 — The museum, **that** opened in 2010, ✕ → **which** ✓',
    ],

    gens: [
      {
        id: 'head-noun',
        level: 1,
        title: '명사구의 중심 명사 찾기',
        make: function (R) {
          var it = R.pick(HEAD);
          return {
            type: 'short', check: 'text', concept: it[4],
            q: '다음 명사구의 중심 명사를 찾아 그대로 쓰십시오.\n\n' + it[0],
            answer: [it[1]],
            wrong: [{ a: it[2], why: HEAD_WHY[it[3]] }],
            explain: it[0].replace(new RegExp('\\b' + it[1] + '\\b'), '**' + it[1] + '**') + '\n\n중심 명사는 **' + it[1] + '**입니다. 앞 꾸밈(관사·형용사·명사 수식어)을 지나 처음 나오는 명사 덩어리의 마지막 명사를 찾고, 그 뒤의 꾸밈말은 괄호로 묶습니다.',
          };
        },
      },
      {
        id: 'participle',
        level: 2,
        title: '명사를 꾸미는 분사 고르기',
        make: function (R) {
          var it = R.pick(PART);
          var why = it[4]
            ? '꾸밈받는 명사(' + it[3] + ')가 그 동작을 직접 하는 관계라서 현재분사를 씁니다.'
            : '꾸밈받는 명사(' + it[3] + ')가 그 동작을 받는 관계라서 과거분사를 씁니다.';
          return {
            type: 'short', check: 'text', concept: 1,
            q: '괄호 안의 동사를 알맞은 분사로 바꾸어 쓰십시오.\n\n' + it[0],
            answer: [it[1]],
            wrong: [{ a: it[2], why: '능동과 수동을 거꾸로 생각했습니다. ' + why }],
            explain: why + '\n\n' + it[0].replace(/\([a-z]+\)/, '**' + it[1] + '**'),
          };
        },
      },
    ],

    vocab: [
      { w: 'impact', m: '영향, 충격', ex: 'The new road had a big impact on the village.', exm: '새 도로는 그 마을에 큰 영향을 미쳤습니다.' },
      { w: 'access', m: '접근, 이용할 수 있음', ex: 'Every student has access to the library.', exm: '모든 학생이 도서관을 이용할 수 있습니다.' },
      { w: 'demand', m: '수요; 요구하다', ex: 'The demand for electric cars is growing.', exm: '전기차에 대한 수요가 늘고 있습니다.' },
      { w: 'ability', m: '능력', ex: 'Babies have the ability to learn any language.', exm: '아기는 어떤 언어든 배울 수 있는 능력이 있습니다.' },
      { w: 'attempt', m: '시도; 시도하다', ex: 'Her first attempt to climb the mountain failed.', exm: '그 산을 오르려던 그녀의 첫 시도는 실패했습니다.' },
      { w: 'extent', m: '정도, 범위', ex: 'We do not know the full extent of the damage.', exm: '우리는 피해의 정확한 정도를 알지 못합니다.' },
      { w: 'relationship', m: '관계', ex: 'There is a close relationship between sleep and health.', exm: '수면과 건강 사이에는 밀접한 관계가 있습니다.' },
      { w: 'household', m: '가구, 가정', ex: 'Most households in the town have a car.', exm: '그 마을 대부분의 가구에는 차가 있습니다.' },
      { w: 'factor', m: '요인', ex: 'Weather is an important factor in farming.', exm: '날씨는 농사의 중요한 요인입니다.' },
      { w: 'growth', m: '성장, 증가', ex: 'The growth of the city was very fast.', exm: '그 도시의 성장은 매우 빨랐습니다.' },
      { w: 'region', m: '지역', ex: 'This region is famous for its tea.', exm: '이 지역은 차로 유명합니다.' },
      { w: 'participant', m: '참여자', ex: 'Each participant signed a form before the study.', exm: '참여자마다 연구 전에 서식에 서명했습니다.' },
      { w: 'evidence', m: '증거', ex: 'There is strong evidence that exercise improves mood.', exm: '운동이 기분을 좋게 한다는 강한 증거가 있습니다.' },
    ],
  });
})();
