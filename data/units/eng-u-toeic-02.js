/* 공인영어시험 기초 (토익형) · 명사·대명사·한정사
 * 예문·지문은 모두 직접 쓴 문장이다(가상의 회사·인물). */
(function () {
  // 한정사 생성기: 한정사 갈래와 빈칸 문장
  // much 는 긍정문에서 어색할 때가 많아 정답 후보에서 뺀다(오답으로만 쓴다).
  var DET = {
    sg: ['each', 'every'],
    pl: ['several', 'many', 'a few', 'a number of'],
    unc: ['a little', 'a great deal of'],
  };
  var DET_ALL = {
    sg: ['each', 'every'],
    pl: ['several', 'many', 'a few', 'a number of'],
    unc: ['much', 'a little', 'a great deal of'],
  };
  var DET_RULE = {
    sg: 'each·every 뒤에는 셀 수 있는 명사의 단수형이 옵니다.',
    pl: 'several·many·a few·a number of 뒤에는 셀 수 있는 명사의 복수형이 옵니다.',
    unc: 'much·a little·a great deal of 뒤에는 셀 수 없는 명사가 옵니다.',
  };
  var NOUN_KIND = {
    sg: '빈칸 뒤 명사는 셀 수 있는 명사의 단수형입니다.',
    pl: '빈칸 뒤 명사는 셀 수 있는 명사의 복수형입니다.',
    unc: '빈칸 뒤 명사는 셀 수 없는 명사입니다.',
  };
  // [빈칸 문장, 빈칸 뒤 명사 갈래, 명사]
  var DET_ITEMS = [
    ['We invited ___ applicants to a second interview.', 'pl', 'applicants'],
    ['The manager answered ___ questions after the talk.', 'pl', 'questions'],
    ['There are ___ printers on the third floor.', 'pl', 'printers'],
    ['The hotel has ___ rooms with an ocean view.', 'pl', 'rooms'],
    ['We received ___ orders from overseas this week.', 'pl', 'orders'],
    ['Ms. Noh has visited ___ branches in the region.', 'pl', 'branches'],
    ['The guide checked ___ ticket at the gate.', 'sg', 'ticket'],
    ['Please fill out this form for ___ item you return.', 'sg', 'item'],
    ['A safety check is carried out on ___ machine once a month.', 'sg', 'machine'],
    ['The coach spoke to ___ player after the game.', 'sg', 'player'],
    ['A free gift is given to ___ customer who spends over 50,000 won.', 'sg', 'customer'],
    ['The trainer gave ___ participant a name tag.', 'sg', 'participant'],
    ['We need ___ information before we can approve the request.', 'unc', 'information'],
    ['The new office still needs ___ furniture.', 'unc', 'furniture'],
    ['Ms. Kim gave me ___ advice about the presentation.', 'unc', 'advice'],
    ['The project will require ___ equipment.', 'unc', 'equipment'],
    ['There is ___ water left in the tank.', 'unc', 'water'],
    ['The team spent ___ time on the new design.', 'unc', 'time'],
  ];

  // 대명사 격 생성기: 사람마다 [꼴, 격 이름]
  var PRON = {
    I: [['I', '주격'], ['me', '목적격'], ['my', '소유격'], ['mine', '소유대명사'], ['myself', '재귀대명사']],
    you: [['you', '주격·목적격'], ['your', '소유격'], ['yours', '소유대명사'], ['yourself', '재귀대명사']],
    he: [['he', '주격'], ['him', '목적격'], ['his', '소유격·소유대명사'], ['himself', '재귀대명사']],
    she: [['she', '주격'], ['her', '목적격·소유격'], ['hers', '소유대명사'], ['herself', '재귀대명사']],
    it: [['it', '주격·목적격'], ['its', '소유격'], ['itself', '재귀대명사']],
    we: [['we', '주격'], ['us', '목적격'], ['our', '소유격'], ['ours', '소유대명사'], ['ourselves', '재귀대명사']],
    they: [['they', '주격'], ['them', '목적격'], ['their', '소유격'], ['theirs', '소유대명사'], ['themselves', '재귀대명사']],
  };
  var CASE_REASON = {
    nom: '빈칸은 동사 앞의 주어 자리이므로 주격을 씁니다.',
    obj: '빈칸은 동사나 전치사 뒤의 목적어 자리이고, 주어와 다른 사람이므로 목적격을 씁니다.',
    pos: '빈칸 뒤에 명사가 있습니다. 명사 앞에서 "~의"를 나타내는 것은 소유격입니다.',
    own: '빈칸 뒤에 명사가 없고 "~의 것"이라는 뜻입니다. 혼자 쓰이는 소유대명사를 씁니다.',
    ref: '주어 자신을 가리키거나(by oneself, help oneself) 주어를 강조하는 자리이므로 재귀대명사를 씁니다.',
  };
  var CASE_CONCEPT = { nom: 2, obj: 2, pos: 2, own: 2, ref: 3 };
  var CASE_NAME = { nom: '주격', obj: '목적격', pos: '소유격', own: '소유대명사', ref: '재귀대명사' };

  // 부정대명사 생성기: [빈칸 문장, 정답, 오답들, 정답 이유, 뜻]
  var INDEF = [
    ['We have two meeting rooms. One is on the first floor, and ___ is on the fifth floor.', 'the other', ['another', 'others', 'the others'],
      '회의실이 둘뿐이므로 하나(One)를 말하면 나머지 하나는 정해집니다. 둘 가운데 나머지 하나는 the other입니다.', '회의실이 두 개 있는데, 하나는 1층에, 다른 하나는 5층에 있습니다.'],
    ['Mr. Jang has two cars. One is white, and ___ is gray.', 'the other', ['another', 'others', 'the others'],
      '차가 두 대뿐이므로 나머지 한 대는 정해집니다. 둘 가운데 나머지 하나는 the other입니다.', '장 씨는 차가 두 대 있는데, 한 대는 흰색이고 다른 한 대는 회색입니다.'],
    ['The store sells three kinds of tea. One is green tea, another is black tea, and ___ is herbal tea.', 'the other', ['another', 'others', 'the others'],
      '셋 가운데 둘을 말하고 나면 마지막 하나는 정해집니다. 셋을 차례로 말할 때는 one ~ another ~ the other입니다.', '그 가게는 차를 세 종류 팝니다. 하나는 녹차, 또 하나는 홍차, 나머지 하나는 허브차입니다.'],
    ['Ten people applied for the job. Two were hired, and ___ were not.', 'the others', ['other', 'the other', 'another'],
      '지원자 열 명이라는 정해진 무리에서 두 명을 뺀 나머지 전부(여덟 명)를 가리킵니다. 나머지 전부는 the others입니다.', '열 명이 그 일자리에 지원했습니다. 두 명은 뽑혔고 나머지는 뽑히지 않았습니다.'],
    ['Five boxes arrived this morning. One was damaged, but ___ were in good condition.', 'the others', ['other', 'the other', 'another'],
      '상자 다섯 개라는 정해진 무리에서 하나를 뺀 나머지 전부(네 개)를 가리킵니다. 나머지 전부는 the others입니다.', '오늘 아침 상자 다섯 개가 왔습니다. 하나는 망가졌지만 나머지는 상태가 좋았습니다.'],
    ['Some customers prefer to pay online, while ___ prefer to pay in person.', 'others', ['another', 'the other', 'one'],
      '정해지지 않은 "어떤 사람들"과 "다른 사람들"을 나누어 말하는 문장입니다. Some ~, others ~ 꼴로 씁니다.', '어떤 고객은 온라인으로 결제하기를 좋아하고, 다른 고객은 직접 결제하기를 좋아합니다.'],
    ['Some staff members walk to work, and ___ take the bus.', 'others', ['another', 'the other', 'one'],
      '정해지지 않은 "어떤 사람들"과 "다른 사람들"을 나누어 말하는 문장입니다. Some ~, others ~ 꼴로 씁니다.', '어떤 직원들은 걸어서 출근하고, 다른 직원들은 버스를 탑니다.'],
    ['My laptop is too slow, so I am going to buy a new ___.', 'one', ['another', 'other', 'others'],
      '앞에 나온 laptop과 같은 종류의 "아무 하나"를 가리킵니다. a new 뒤에서 앞의 명사를 대신하는 말은 one입니다.', '노트북이 너무 느려서 새것을 하나 살 생각입니다.'],
    ['This shirt is too small for me. Do you have a larger ___?', 'one', ['another', 'other', 'others'],
      '앞에 나온 shirt와 같은 종류의 "아무 하나"를 가리킵니다. a larger 뒤에서 앞의 명사를 대신하는 말은 one입니다.', '이 셔츠는 제게 너무 작습니다. 더 큰 것이 있습니까?'],
    ['This coffee is very good. May I have ___ cup?', 'another', ['other', 'others', 'the others'],
      '이미 한 잔을 마셨고 "한 잔 더"를 원합니다. 정해지지 않은 또 하나는 another이고, another 뒤에는 단수 명사가 옵니다.', '이 커피 정말 맛있네요. 한 잔 더 마셔도 될까요?'],
  ];
  var INDEF_DESC = {
    one: 'one은 앞에 나온 명사와 같은 종류의 "아무 하나"를 가리킵니다.',
    another: 'another는 "정해지지 않은 또 하나"(단수)입니다.',
    'the other': 'the other는 "둘 가운데 나머지 하나"처럼 정해진 하나입니다.',
    others: 'others는 정해지지 않은 "다른 사람들·것들"(복수)입니다.',
    'the others': 'the others는 정해진 무리의 "나머지 전부"(복수)입니다.',
    other: 'other는 혼자 대명사로 쓰지 않고 뒤에 명사를 붙여 씁니다(other options).',
  };
  // [빈칸 문장, 사람, 정답, 격, 뜻]
  var PRON_ITEMS = [
    ['The two engineers solved the problem by ___.', 'they', 'themselves', 'ref', '두 기술자는 그 문제를 자기들끼리(도움 없이) 해결했습니다.'],
    ['The director wrote the speech ___.', 'he', 'himself', 'ref', '이사가 연설문을 직접 썼습니다.'],
    ['Mr. Bae prepared all the slides ___.', 'he', 'himself', 'ref', '배 씨가 발표 화면을 모두 직접 준비했습니다.'],
    ['Please help ___ to the snacks on the table.', 'you', 'yourself', 'ref', '탁자 위의 간식을 마음껏 드십시오.'],
    ['Please give ___ your feedback by Friday.', 'we', 'us', 'obj', '금요일까지 저희에게 의견을 주십시오.'],
    ['The clients thanked ___ for the quick reply.', 'we', 'us', 'obj', '고객들은 빠른 답장에 대해 우리에게 고마워했습니다.'],
    ['We asked the hotel staff to help ___ with our bags.', 'we', 'us', 'obj', '우리는 호텔 직원에게 가방을 옮기는 것을 도와 달라고 부탁했습니다.'],
    ['Please call ___ if you have any questions.', 'I', 'me', 'obj', '질문이 있으면 제게 전화해 주십시오.'],
    ['Mr. Lim praised ___ for her hard work.', 'she', 'her', 'obj', '임 씨는 그녀가 열심히 일한 것을 칭찬했습니다.'],
    ['Between you and ___, the plan needs more work.', 'I', 'me', 'obj', '우리끼리 얘기지만, 그 계획은 더 손봐야 합니다.'],
    ['I sent ___ the documents yesterday, Mr. Han.', 'you', 'you', 'obj', '한 선생님, 어제 서류를 보내 드렸습니다.'],
    ['Mr. Yoo said that ___ would arrive at noon.', 'he', 'he', 'nom', '유 씨는 자기가 정오에 도착할 것이라고 말했습니다.'],
    ['Jiyoung and ___ will lead the workshop.', 'I', 'I', 'nom', '지영 씨와 제가 워크숍을 이끌 것입니다.'],
    ['Ms. Choi forgot ___ password and called the help desk.', 'she', 'her', 'pos', '최 씨는 비밀번호를 잊어서 지원 창구에 전화했습니다.'],
    ['The company changed ___ logo last year.', 'it', 'its', 'pos', '그 회사는 작년에 로고를 바꾸었습니다.'],
    ['We finished ___ project two days early.', 'we', 'our', 'pos', '우리는 프로젝트를 이틀 일찍 끝냈습니다.'],
    ['The visitors left ___ coats in the lobby.', 'they', 'their', 'pos', '방문객들은 외투를 로비에 두었습니다.'],
    ['This umbrella is not mine. I think it is ___.', 'you', 'yours', 'own', '이 우산은 제 것이 아닙니다. 당신 것 같습니다.'],
    ['The final decision is ___ to make, not mine.', 'you', 'yours', 'own', '최종 결정은 제가 아니라 당신이 내릴 일입니다.'],
    ['The red car is ours, and the blue one is ___.', 'they', 'theirs', 'own', '빨간 차는 우리 것이고, 파란 차는 그들의 것입니다.'],
    ['The customers said the mistake was not ___.', 'they', 'theirs', 'own', '고객들은 그 실수가 자기들 탓이 아니라고 말했습니다.'],
    ['A friend of ___ works at that bank.', 'I', 'mine', 'own', '제 친구 한 명이 그 은행에서 일합니다.'],
  ];

  Tutor.registerUnit({
    id: 'eng-u-toeic-02',
    course: 'eng-u-toeic',
    title: '명사·대명사·한정사',
    summary: '셀 수 있는 명사와 없는 명사, 한정사와 명사의 짝, 대명사의 격을 정확히 고르는 법을 익힙니다.',
    goals: [
      '셀 수 없는 명사(information, equipment, furniture, advice 등)를 알아보고 바르게 쓸 수 있다.',
      '한정사(each, every, a few, a little 등)에 맞는 명사의 수를 고를 수 있다.',
      '인칭대명사의 격과 재귀대명사를 자리에 맞게 고를 수 있다.',
      '부정대명사 one, another, the other, others를 구별해 쓸 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '셀 수 없는 명사',
        body: '영어 명사는 **셀 수 있는 명사(가산 명사)**와 **셀 수 없는 명사(불가산 명사)**로 나뉩니다. 셀 수 없는 명사는 다음 세 가지를 지킵니다.\n\n' +
          '1. 앞에 **a/an을 붙이지 않습니다.** an advice (×)\n' +
          '2. 끝에 **-s를 붙이지 않습니다.** informations (×)\n' +
          '3. 주어가 되면 **단수 동사**를 씁니다. The equipment **is** new.\n\n' +
          '공인영어시험에 자주 나오는 셀 수 없는 명사는 따로 외워 둡니다.\n\n' +
          '| 셀 수 없는 명사 | 뜻 | 비슷한 뜻의 셀 수 있는 명사 |\n|---|---|---|\n' +
          '| information | 정보 | a fact, facts |\n' +
          '| equipment | 장비 | a device, tools |\n' +
          '| furniture | 가구 | a chair, desks |\n' +
          '| advice | 조언 | a suggestion, tips |\n' +
          '| luggage / baggage | 짐 | a bag, suitcases |\n' +
          '| merchandise | 상품 | a product, items |\n' +
          '| feedback, research, permission | 의견, 연구, 허가 | a comment, a study, a permit |\n\n' +
          '> 💡 수를 세고 싶으면 a piece of를 씁니다: a piece of furniture, two pieces of luggage',
        easy: '우리말로는 "가구 세 개"라고 하지만, 영어의 furniture는 "가구류"라는 덩어리 이름입니다. 물이나 모래처럼 한 덩어리로 보기 때문에 하나, 둘 셀 수 없습니다.\n\n' +
          '그래서 "의자 세 개"는 three chairs라고 하고, 굳이 furniture로 세려면 three pieces of furniture라고 합니다.',
        check: {
          type: 'ox',
          q: 'We need some new furnitures for the lobby.\n\n이 문장은 어법상 옳습니다.',
          answer: false,
          explain: 'furniture는 셀 수 없는 명사라서 -s를 붙이지 않습니다. 바른 문장: We need some new **furniture** for the lobby.',
        },
      },
      {
        title: '한정사와 명사의 수',
        body: '**한정사**는 명사 앞에서 "어느 것, 얼마나"를 정해 주는 말입니다. 한정사마다 뒤에 올 수 있는 명사가 정해져 있습니다.\n\n' +
          '| 한정사 | 뒤에 오는 명사 | 예 |\n|---|---|---|\n' +
          '| each, every, another | 셀 수 있는 명사의 **단수형** | every **month**, each **employee** |\n' +
          '| many, several, a few, few, a number of, both | 셀 수 있는 명사의 **복수형** | a few **days**, several **options** |\n' +
          '| much, a little, little, a great deal of | **셀 수 없는 명사** | a little **time**, much **information** |\n' +
          '| all, most, some, a lot of, plenty of | 복수형 또는 셀 수 없는 명사 | some **tools**, some **equipment** |\n\n' +
          '주어에 한정사가 붙으면 동사의 수도 맞춥니다.\n\n' +
          '- **Every** employee **has** a locker. (every + 단수 → 단수 동사)\n' +
          '- **Each of** the rooms **has** a desk. (each of + 복수 명사 → 단수 동사)\n' +
          '- **A few** employees **have** lockers. (a few + 복수 → 복수 동사)\n\n' +
          '> ⚠️ a few(조금 있는)와 few(거의 없는), a little(조금 있는)과 little(거의 없는)은 뜻이 다릅니다.',
        easy: '한정사는 "뒤에 올 명사를 정하는 문지기"입니다. each와 every 문지기는 한 명씩만 들여보내고(단수), a few와 several 문지기는 여럿을 함께 들여보냅니다(복수). much와 a little 문지기는 셀 수 없는 덩어리(information, time)만 들여보냅니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nEvery ___ must wear a name tag.',
          choices: ['employee', 'employees', 'employment'],
          answer: 0,
          why: [
            '',
            'every 뒤에는 셀 수 있는 명사의 단수형이 옵니다. 복수형은 쓸 수 없습니다.',
            '고용(일자리)이라는 뜻의 명사입니다. 이름표를 다는 것은 사람이어야 합니다.',
          ],
          explain: 'every 뒤에는 셀 수 있는 명사의 **단수형**이 옵니다. 그래서 정답은 employee입니다. "모든 직원은 이름표를 달아야 합니다."',
        },
      },
      {
        title: '인칭대명사의 격',
        body: '인칭대명사는 문장 속 자리에 따라 꼴(격)이 바뀝니다.\n\n' +
          '| 주격 (주어) | 목적격 (목적어) | 소유격 (+ 명사) | 소유대명사 (~의 것) |\n|---|---|---|---|\n' +
          '| I | me | my | mine |\n' +
          '| we | us | our | ours |\n' +
          '| you | you | your | yours |\n' +
          '| he / she | him / her | his / her | his / hers |\n' +
          '| it | it | its | — |\n' +
          '| they | them | their | theirs |\n\n' +
          '- 동사 앞 주어 자리 → 주격: **They** approved the plan.\n' +
          '- 동사·전치사 뒤 → 목적격: Please contact **them**. / with **them**\n' +
          '- 뒤에 명사가 있음 → 소유격: **their** report\n' +
          '- 뒤에 명사가 없고 "~의 것" → 소유대명사: The report is **theirs**. (= their report)\n\n' +
          '> ⚠️ its(그것의)와 it\'s(= it is)를 헷갈리지 않도록 주의합니다. The company changed **its** logo.',
        easy: '대명사는 자리마다 옷을 갈아입습니다. 주어 자리에서는 they, 목적어 자리에서는 them, 명사 앞에서는 their, 혼자 있을 때는 theirs.\n\n' +
          '빈칸 뒤를 먼저 보십시오. 바로 뒤에 명사가 있으면 소유격(their), 명사 없이 끝나면서 "그들의 것"이라는 뜻이면 소유대명사(theirs)입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe interns finished ___ reports on time.',
          choices: ['they', 'them', 'their'],
          answer: 2,
          why: [
            '주격은 주어 자리에 씁니다. 빈칸 뒤에 명사 reports가 있으므로 "~의"를 나타내는 꼴이 필요합니다.',
            '목적격은 동사·전치사 뒤 목적어 자리에 혼자 씁니다. 명사 앞에는 소유격을 씁니다.',
            '',
          ],
          explain: '빈칸 바로 뒤에 명사 reports가 있으므로 소유격을 씁니다. 정답: **their**. "인턴들은 보고서를 제때 끝냈습니다."',
        },
      },
      {
        title: '재귀대명사',
        body: '**재귀대명사**는 -self(단수), -selves(복수)로 끝나는 대명사입니다: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves.\n\n' +
          '**1. 재귀 용법** — 목적어가 주어 자신일 때 씁니다. 이때는 빼면 문장이 성립하지 않습니다.\n' +
          '- She introduced **herself** to the guests. (그녀가 자기를 소개함)\n' +
          '- She introduced **her** to the guests. (그녀가 다른 여자를 소개함)\n\n' +
          '**2. 강조 용법** — 주어 바로 뒤나 문장 끝에서 "직접, 몸소"를 강조합니다. 빼도 문장이 완전합니다.\n' +
          '- The CEO **himself** answered the call. / I checked the figures **myself**.\n\n' +
          '**3. 관용 표현**\n' +
          '- **by oneself**: 혼자서, 남의 도움 없이 — He finished the job **by himself**.\n' +
          '- **for oneself**: 스스로(직접 해 보고) — See the results **for yourself**.\n' +
          '- **help oneself to**: ~을 마음껏 먹다 — Please **help yourself to** the coffee.',
        easy: '재귀대명사는 거울입니다. 주어가 한 일이 다시 주어에게 돌아올 때 씁니다. 거울을 보며 "나를 소개합니다"라고 하면 introduce **myself**입니다.\n\n' +
          '또 "누가 대신 한 게 아니라 직접 했다"를 힘주어 말할 때도 붙입니다: I wrote it **myself**.(내가 직접 썼습니다)',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nMs. Ahn designed the website by ___.',
          choices: ['her', 'herself', 'hers'],
          answer: 1,
          why: [
            'by her는 "그녀(다른 사람) 옆에서, 그녀에 의해"라는 뜻이 됩니다. "혼자서"는 by + 재귀대명사입니다.',
            '',
            'by hers는 "그녀의 것 옆에서"라는 어색한 뜻이 됩니다.',
          ],
          explain: 'by oneself는 "혼자서, 남의 도움 없이"라는 뜻입니다. 주어가 Ms. Ahn(여성)이므로 정답은 **herself**입니다. "안 씨는 웹사이트를 혼자 힘으로 디자인했습니다."',
        },
      },
      {
        title: '부정대명사: one, another, the other, others',
        body: '정해지지 않은 사람·물건을 가리키는 대명사를 **부정대명사**라고 합니다. 핵심은 **정해져 있는가(the)**와 **하나인가 여럿인가**입니다.\n\n' +
          '| 말 | 뜻 | 예 |\n|---|---|---|\n' +
          '| one | 앞의 명사와 같은 종류의 (아무) 하나 | My pen ran out of ink, so I bought a new **one**. |\n' +
          '| another | 또 하나(정해지지 않음, 단수) | This cup is dirty. Can I have **another**? |\n' +
          '| the other | 둘 가운데 나머지 하나 | One office is in Seoul, and **the other** is in Busan. |\n' +
          '| others | (정해지지 않은) 다른 사람들·것들 | Some prefer tea; **others** prefer coffee. |\n' +
          '| the others | 나머지 전부(정해진 무리) | Two guests left early; **the others** stayed. |\n\n' +
          '- 둘을 차례로 말할 때: **one** ~ **the other**\n' +
          '- 셋을 차례로 말할 때: **one** ~ **another** ~ **the other** (마지막 하나는 정해지므로 the)\n\n' +
          '> 💡 one은 같은 종류의 "아무 하나", it은 앞에 나온 "바로 그것"입니다. I lost my umbrella, so I bought a new **one**.(새 우산) / I lost my umbrella, but I found **it**.(잃어버린 그 우산)',
        easy: '사과 두 개가 접시에 있다고 생각해 보십시오. 하나를 집으면 남은 것은 정해진 하나뿐이니 the other입니다. 사과가 한 바구니 가득 있다면, 하나를 먹은 뒤 "또 하나"는 정해지지 않았으니 another입니다.\n\n' +
          '남은 것이 여럿이고 모두 정해졌으면 the others, 그냥 "다른 사람들(어떤 사람들)"이면 others입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nWe have two offices. One is in Busan, and ___ is in Daejeon.',
          choices: ['the other', 'another', 'others'],
          answer: 0,
          why: [
            '',
            '사무실이 둘뿐이므로 하나를 말하고 나면 나머지 하나는 정해집니다. another는 "정해지지 않은 또 하나"입니다.',
            '여럿을 가리키는 복수이고 정해지지 않은 것입니다. 동사 is와도 맞지 않습니다.',
          ],
          explain: '둘 가운데 하나(One)를 말한 뒤 나머지 하나는 **the other**입니다. "사무실이 두 곳 있는데, 한 곳은 부산에, 다른 한 곳은 대전에 있습니다."',
        },
      },
    ],

    examples: [
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\nWe received ___ helpful advice from the consultant.\n\n(A) a (B) many (C) a lot of (D) several',
        steps: [
          '빈칸 뒤의 명사 advice(조언)는 셀 수 없는 명사입니다.',
          'a는 셀 수 있는 명사의 단수형 앞에, many·several은 셀 수 있는 명사의 복수형 앞에 씁니다. 셋 다 advice와 어울리지 않습니다.',
          'a lot of는 셀 수 있는 명사의 복수형과 셀 수 없는 명사 앞에 모두 쓸 수 있습니다.',
          '그래서 (C)를 넣어 "우리는 그 자문가에게서 도움이 되는 조언을 많이 받았습니다."가 됩니다.',
        ],
        answer: '(C) a lot of',
      },
      {
        q: '빈칸에 알맞은 것을 고르십시오.\n\nThe company announced ___ new travel policy, and most employees welcomed ___.\n\n(A) its / it (B) it\'s / it (C) its / its (D) it / its',
        steps: [
          '첫 빈칸 뒤에는 명사구 new travel policy가 있습니다. 명사 앞에서 "그것의"를 나타내는 소유격 its가 필요합니다. it\'s는 it is를 줄인 말이라 여기에 쓸 수 없습니다.',
          '둘째 빈칸은 동사 welcomed의 목적어 자리입니다. 앞의 policy를 가리키는 목적격 it이 알맞습니다.',
          'its는 소유격이라 뒤에 명사가 있어야 하므로 목적어 자리에 혼자 쓸 수 없습니다.',
        ],
        answer: '(A) its / it',
      },
    ],

    terms: [
      { term: '셀 수 있는 명사(가산 명사)', def: '하나, 둘 셀 수 있는 명사입니다. 단수에는 a/an을 붙이고 복수에는 -s를 붙입니다. 예: a device, two devices' },
      { term: '셀 수 없는 명사(불가산 명사)', def: 'a/an을 붙이지 않고 복수형도 없는 명사입니다. 주어가 되면 단수 동사를 씁니다. 예: information, equipment, furniture, advice' },
      { term: '한정사', def: '명사 앞에서 그 명사가 어느 것인지, 얼마나 있는지를 정해 주는 말입니다. 예: each, every, a few, a little, much, several' },
      { term: '인칭대명사', def: '사람이나 사물을 대신 가리키는 I, you, he, she, it, we, they와 그 여러 꼴입니다.' },
      { term: '격', def: '대명사가 문장 속 자리에 따라 바뀌는 꼴입니다. 주격(they)·목적격(them)·소유격(their)이 있습니다.' },
      { term: '소유대명사', def: '"~의 것"이라는 뜻으로 명사 없이 혼자 쓰는 대명사입니다. 예: mine, yours, ours, theirs' },
      { term: '재귀대명사', def: '-self, -selves로 끝나는 대명사입니다. 목적어가 주어 자신일 때, 또는 "직접"을 강조할 때 씁니다. 예: herself, themselves' },
      { term: '부정대명사', def: '정해지지 않은 사람·사물을 가리키는 대명사입니다. 예: one, another, others (정해진 나머지는 the other, the others)' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nCould you give me some ___ about the new software?',
        choices: ['information', 'informations', 'an information', 'informative'],
        answer: 0,
        why: [
          '',
          'information은 셀 수 없는 명사라서 -s를 붙이지 않습니다.',
          '셀 수 없는 명사 앞에는 an을 붙이지 않습니다. 또 some과 an을 함께 쓸 수도 없습니다.',
          '-ive로 끝나는 형용사입니다. some 뒤, 전치사 about 앞은 명사 자리입니다.',
        ],
        explain: 'some 뒤, about 앞은 명사 자리이고, information은 셀 수 없는 명사라서 a/an이나 -s 없이 씁니다. 정답: **information**. "새 소프트웨어에 관한 정보를 좀 주시겠습니까?"',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 0,
        q: 'All the equipment in the lab is checked every week.\n\n이 문장에서 동사 is는 어법상 옳습니다.',
        answer: true,
        explain: 'equipment(장비)는 셀 수 없는 명사라서 주어가 되면 단수 동사를 씁니다. 앞에 All the가 있어도 equipment 자체는 복수형이 없으므로 is가 맞습니다. "실험실의 모든 장비는 매주 점검됩니다."',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe hotel offers ___ rooms with a view of the river.',
        choices: ['several', 'much', 'each', 'a little'],
        answer: 0,
        why: [
          '',
          'much는 셀 수 없는 명사 앞에 씁니다. rooms는 셀 수 있는 명사의 복수형입니다.',
          'each 뒤에는 단수형(room)이 옵니다. 빈칸 뒤 rooms는 복수형입니다.',
          'a little은 셀 수 없는 명사 앞에 씁니다. rooms는 셀 수 있는 명사의 복수형입니다.',
        ],
        explain: '빈칸 뒤 rooms는 셀 수 있는 명사의 복수형입니다. 복수형 앞에 쓰는 한정사는 **several**(몇몇의)입니다. "그 호텔은 강이 보이는 방을 여러 개 제공합니다."',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nPlease send the report to Mr. Kang and ___ assistant.',
        choices: ['he', 'him', 'his', 'himself'],
        answer: 2,
        why: [
          '주격은 동사 앞 주어 자리에 씁니다. 빈칸 뒤에 명사 assistant가 있으므로 "~의"를 나타내는 꼴이 필요합니다.',
          '목적격은 동사·전치사 뒤에 혼자 씁니다. 명사 앞에는 소유격을 씁니다.',
          '',
          '재귀대명사는 목적어가 주어 자신일 때 씁니다. 명사 assistant 앞에는 올 수 없습니다.',
        ],
        explain: '빈칸 바로 뒤에 명사 assistant가 있으므로 소유격이 필요합니다. 정답: **his**. "그 보고서를 강 씨와 그의 비서에게 보내 주십시오."',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nMr. Oh fixed the copier ___, without calling a technician.',
        choices: ['him', 'his', 'himself', 'he'],
        answer: 2,
        why: [
          '목적어 the copier가 이미 있어서 him을 더 넣을 자리가 없습니다. "직접"이라는 뜻을 더하려면 재귀대명사를 씁니다.',
          '소유격은 뒤에 명사가 있어야 합니다.',
          '',
          '주격은 동사 앞 주어 자리에 씁니다. 주어 Mr. Oh와 동사 fixed가 이미 있습니다.',
        ],
        explain: '문장이 이미 완전하고, 기술자를 부르지 않고 "직접" 고쳤다는 것을 강조합니다. 강조 용법의 재귀대명사 **himself**를 씁니다. "오 씨는 기술자를 부르지 않고 복사기를 직접 고쳤습니다."',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe company has two factories. One is in Ulsan, and ___ is in Gumi.',
        choices: ['another', 'the other', 'others', 'the others'],
        answer: 1,
        why: [
          '공장이 둘뿐이므로 나머지 하나는 정해집니다. another는 "정해지지 않은 또 하나"라서 셋 이상일 때 씁니다.',
          '',
          '여럿(복수)을 가리키므로 단수 동사 is와 맞지 않고, 나머지는 하나뿐입니다.',
          '"나머지 전부(복수)"라서 단수 동사 is와 맞지 않습니다. 나머지는 하나뿐입니다.',
        ],
        explain: '둘 가운데 하나(One)를 말한 뒤 나머지 하나는 **the other**입니다. "그 회사에는 공장이 두 곳 있는데, 한 곳은 울산에, 다른 한 곳은 구미에 있습니다."',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'text', concept: 0,
        q: 'furniture를 세려고 합니다. 빈칸에 알맞은 낱말 하나를 쓰십시오.\n\nThree ___ of furniture were delivered to the office.',
        answer: ['pieces', 'items', 'articles'],
        wrong: [
          { a: 'piece', why: 'Three(셋)가 앞에 있으므로 piece도 복수형으로 씁니다: three pieces of furniture' },
          { a: 'furnitures', why: 'furniture는 셀 수 없는 명사라서 -s를 붙이지 않습니다. 대신 piece를 복수로 만들어 셉니다.' },
        ],
        explain: '셀 수 없는 명사 furniture는 piece로 셉니다. 셋이므로 **pieces**입니다(items, articles of furniture라고도 씁니다). "가구 세 점이 사무실로 배달되었습니다."',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nOnly ___ seats are left for the evening show, so please book soon.',
        choices: ['a few', 'a little', 'much', 'every'],
        answer: 0,
        why: [
          '',
          'a little은 셀 수 없는 명사 앞에 씁니다. seats는 셀 수 있는 명사의 복수형입니다.',
          'much는 셀 수 없는 명사 앞에 씁니다. seats는 셀 수 있는 명사의 복수형입니다.',
          'every 뒤에는 단수형이 옵니다. 또 "모든 좌석이 남았다"는 so please book soon(서둘러 예매하라)과 맞지 않습니다.',
        ],
        hint: '빈칸 뒤 seats가 셀 수 있는 명사인지, 단수형인지 복수형인지 보십시오.',
        explain: 'seats는 셀 수 있는 명사의 복수형이므로 **a few**(조금 있는)를 씁니다. Only a few는 "몇 개밖에 없는"이라는 뜻이라 "서둘러 예매하라"는 뒤 문장과도 어울립니다. "저녁 공연은 좌석이 몇 개밖에 남지 않았으니 서둘러 예매하십시오."',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nEach of the new laptops ___ a two-year warranty.',
        choices: ['come with', 'comes with', 'coming with', 'to come with'],
        answer: 1,
        why: [
          'Each of + 복수 명사는 "그 가운데 하나하나"라서 단수로 봅니다. 동사도 단수형을 씁니다.',
          '',
          '-ing 꼴은 혼자 문장의 동사가 될 수 없습니다.',
          'to부정사는 혼자 문장의 동사가 될 수 없습니다.',
        ],
        hint: '주어의 중심은 laptops가 아니라 Each입니다.',
        explain: '주어는 Each of the new laptops이고, 중심은 Each(하나하나)라서 단수입니다. 그래서 단수 동사 **comes with**를 씁니다. "새 노트북에는 저마다 2년 품질 보증이 딸려 있습니다."',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'text', concept: 2,
        q: '빈칸에 they의 알맞은 꼴을 쓰십시오.\n\nThe blue bags are ours, and the black ones are ___.',
        answer: ['theirs'],
        wrong: [
          { a: 'their', why: '소유격 their는 뒤에 명사가 있어야 합니다(their bags). 명사 없이 "그들의 것"은 theirs입니다.' },
          { a: "their's", why: '소유대명사에는 아포스트로피를 쓰지 않습니다. theirs라고 씁니다.' },
          { a: 'them', why: '목적격 them은 동사·전치사 뒤 목적어 자리에 씁니다. "그들의 것"은 theirs입니다.' },
        ],
        explain: 'are 뒤에 명사가 없고 "그들의 것(= their bags)"이라는 뜻이므로 소유대명사 **theirs**를 씁니다. 앞의 ours와 같은 꼴입니다. "파란 가방은 우리 것이고, 검은 가방은 그들의 것입니다."',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nSome guests ate at the hotel restaurant, and ___ went out for dinner.',
        choices: ['another', 'the other', 'others', 'other'],
        answer: 2,
        why: [
          'another는 "또 하나"(단수)라서 여러 손님을 가리킬 수 없습니다.',
          'the other는 "둘 가운데 나머지 하나"입니다. 손님은 여럿입니다.',
          '',
          'other는 혼자 쓰지 않고 뒤에 명사를 붙여 씁니다(other guests).',
        ],
        hint: 'Some ~, ___ ~ 꼴입니다.',
        explain: '정해지지 않은 "어떤 사람들"과 "다른 사람들"을 나누어 말할 때 Some ~, **others** ~ 꼴을 씁니다. "어떤 손님들은 호텔 식당에서 먹었고, 다른 손님들은 저녁을 먹으러 나갔습니다."',
      },
      {
        id: 'p12', level: 2, type: 'order', concept: 3,
        q: '우리말과 뜻이 같도록 바르게 배열하십시오.\n\n박 씨는 그 결정을 혼자서 내렸습니다.',
        choices: ['by herself', 'made', 'the decision', 'Ms. Park'],
        answer: [3, 1, 2, 0],
        hint: '"혼자서"는 by + 재귀대명사이고, 문장 끝에 옵니다.',
        explain: 'Ms. Park made the decision by herself. — 주어(Ms. Park) + 동사(made) + 목적어(the decision) 뒤에 "혼자서"를 뜻하는 by herself를 붙입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 0,
        q: '어법상 **옳지 않은** 문장은 무엇입니까?',
        choices: [
          'The new equipment has arrived.',
          'We received many useful advices from him.',
          'Several pieces of luggage were lost.',
          'The information on the website is out of date.',
        ],
        answer: 1,
        why: [
          'equipment는 셀 수 없는 명사라서 단수 동사 has가 맞습니다. 옳은 문장입니다.',
          '',
          '셀 수 없는 luggage를 pieces로 세었고, 주어 pieces가 복수라 were가 맞습니다. 옳은 문장입니다.',
          'information은 셀 수 없는 명사라서 단수 동사 is가 맞습니다. 옳은 문장입니다.',
        ],
        explain: 'advice는 셀 수 없는 명사라서 -s를 붙이지 않고 many와도 쓰지 않습니다. 바르게 고치면 We received **a lot of useful advice** from him. 또는 We received **many useful tips** from him.입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nVery ___ people signed up for the seminar, so it was canceled.',
        choices: ['few', 'a few', 'little', 'a little'],
        answer: 0,
        why: [
          '',
          'a few는 "조금 있는"이라는 긍정의 뜻입니다. 세미나가 취소되었다는 결과와 맞으려면 "거의 없는"이 필요합니다. 또 very a few라고 쓰지 않습니다.',
          'little은 셀 수 없는 명사 앞에 씁니다. people은 셀 수 있는 명사(복수)입니다.',
          'a little은 셀 수 없는 명사 앞에 쓰고, 뜻도 "조금 있는"입니다.',
        ],
        hint: 'people은 셀 수 있습니까? 그리고 세미나가 취소된 까닭은 무엇입니까?',
        explain: 'people은 셀 수 있는 명사의 복수형이므로 few나 a few 가운데 하나입니다. 세미나가 취소되었으니 "신청한 사람이 거의 없었다"는 부정의 뜻인 **few**가 알맞습니다. "세미나에 신청한 사람이 거의 없어서 취소되었습니다."',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 2,
        q: '빈칸에 차례대로 들어갈 말로 알맞은 것은 무엇입니까?\n\nMs. Seo asked Mr. Woo to send ___ the file because ___ own computer was broken.',
        choices: ['her / her', 'herself / his', 'she / hers', 'hers / her'],
        answer: 0,
        why: [
          '',
          'send의 주어는 Mr. Woo입니다. 서 씨에게 보내는 것이므로 재귀대명사가 아니라 목적격 her를 씁니다.',
          'send의 목적어 자리에 주격 she는 올 수 없고, 명사 computer 앞에는 소유대명사 hers가 아니라 소유격이 옵니다.',
          'hers는 "그녀의 것"이라 목적어로 "그녀에게"를 나타낼 수 없습니다.',
        ],
        hint: 'send ___ the file에서 보내는 사람은 누구이고 받는 사람은 누구입니까?',
        explain: 'send의 주어는 Mr. Woo이고, 파일을 받는 사람은 Ms. Seo이므로 첫 빈칸은 목적격 **her**입니다. 둘째 빈칸 뒤에는 명사(own computer)가 있으므로 소유격 **her**입니다. 컴퓨터가 고장 나서 파일을 부탁한 사람은 서 씨이므로 뜻에도 맞습니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 3,
        q: '빈칸에 차례대로 들어갈 말로 알맞은 것은 무엇입니까?\n\nThe manager ___ welcomed the new staff, and he asked them to introduce ___.',
        choices: ['himself / themselves', 'him / them', 'himself / them', 'his / theirs'],
        answer: 0,
        why: [
          '',
          '주어 The manager 바로 뒤에 목적격 him을 둘 수 없습니다. 또 새 직원들이 자기 자신을 소개하므로 재귀대명사가 필요합니다.',
          '첫 빈칸은 맞습니다. 그러나 introduce them은 "(다른) 그들을 소개하다"라는 뜻이 됩니다. 새 직원들이 자기 자신을 소개하므로 themselves입니다.',
          '소유격 his는 뒤에 명사가 있어야 하고, theirs는 "그들의 것"이라 소개할 대상이 될 수 없습니다.',
        ],
        hint: '첫 빈칸은 "직접", 둘째 빈칸은 "자기 자신을"이라는 뜻입니다.',
        explain: '첫 빈칸은 주어를 강조하는 재귀대명사 **himself**(관리자가 직접)입니다. 둘째 빈칸은 introduce의 주어인 새 직원들(them)이 자기 자신을 소개하는 것이므로 **themselves**입니다. "관리자가 직접 새 직원들을 맞이했고, 그들에게 자기소개를 하라고 했습니다."',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 4,
        q: '빈칸에 차례대로 들어갈 말로 알맞은 것은 무엇입니까?\n\nWe offer three plans. One is for students, ___ is for families, and ___ is for small businesses.',
        choices: ['another / the other', 'the other / another', 'other / the others', 'another / others'],
        answer: 0,
        why: [
          '',
          '둘째 것을 the other로 말하면 "나머지 하나"가 이미 끝난 셈이라 셋째를 말할 수 없습니다. 둘째는 "또 하나"인 another, 마지막 하나가 정해진 the other입니다.',
          'other는 혼자 쓰지 않고, the others는 복수라 단수 동사 is와 맞지 않습니다.',
          'others는 복수라 단수 동사 is와 맞지 않고, 마지막 하나는 정해져 있으므로 the를 붙입니다.',
        ],
        hint: '셋을 차례로 말할 때 첫째·둘째·셋째를 각각 무엇으로 나타냅니까?',
        explain: '셋을 차례로 말할 때는 **one ~ another ~ the other**입니다. 둘째는 아직 정해지지 않은 "또 하나"라 another, 마지막 하나는 남은 것이 하나뿐이라 정해지므로 the other입니다. "저희는 요금제를 세 가지 제공합니다. 하나는 학생용, 또 하나는 가족용, 나머지 하나는 소상공인용입니다."',
      },
      {
        id: 'a6', level: 3, type: 'choice', concept: 1,
        q: '빈칸에 들어갈 수 **없는** 것은 무엇입니까?\n\nWe need ___ information before we make a decision.',
        choices: ['more', 'some', 'a little', 'several'],
        answer: 3,
        why: [
          'more는 셀 수 없는 명사 앞에도 쓸 수 있습니다(more information). 빈칸에 들어갈 수 있습니다.',
          'some은 셀 수 없는 명사 앞에도 쓸 수 있습니다. 빈칸에 들어갈 수 있습니다.',
          'a little은 셀 수 없는 명사 앞에 씁니다. 빈칸에 들어갈 수 있습니다.',
          '',
        ],
        explain: 'information은 셀 수 없는 명사입니다. **several**(몇몇의)은 셀 수 있는 명사의 복수형 앞에만 쓰므로 들어갈 수 없습니다. more·some·a little은 셀 수 없는 명사 앞에 쓸 수 있습니다.',
      },
    ],

    deeper: [
      {
        title: '업무 영어에서 자주 틀리는 셀 수 없는 명사',
        body: '우리말로는 자연스럽게 세는 말인데 영어에서는 셀 수 없는 명사인 경우가 많습니다. 이메일·보고서에서 특히 자주 틀리는 것을 모아 봅니다.\n\n' +
          '| 틀린 꼴 | 바른 꼴 |\n|---|---|\n' +
          '| informations | information, pieces of information |\n' +
          '| equipments | equipment, pieces of equipment |\n' +
          '| an advice | a piece of advice, a tip |\n' +
          '| a feedback | feedback, a comment |\n' +
          '| luggages | luggage, pieces of luggage |\n\n' +
          '셀 수 없는 명사 가운데에는 "여러 종류를 묶은 이름"이 많습니다. furniture(가구류)는 chair·desk·sofa를, equipment(장비류)는 machine·tool을, merchandise(상품류)는 product·item을 묶은 이름입니다. 낱낱의 물건을 세고 싶으면 그 아래 이름(chairs, tools, items)을 쓰면 됩니다.\n\n' +
          '> 💡 news(소식)도 -s로 끝나지만 셀 수 없는 명사입니다. The news **is** good.',
      },
      {
        title: 'each와 every는 무엇이 다를까',
        body: '둘 다 뒤에 셀 수 있는 명사의 단수형을 쓰고 단수 동사를 받는다는 점은 같습니다. 차이는 다음과 같습니다.\n\n' +
          '- **each**는 하나하나 따로 봅니다. 둘일 때도 쓸 수 있고(each hand), 혼자 대명사로도 쓰고(**Each** has a desk.), each of + 복수 명사 꼴도 됩니다(**each of** the rooms).\n' +
          '- **every**는 전체를 하나도 빠짐없이 묶어 봅니다. 셋 이상에 쓰고, 혼자 대명사로 쓰지 않으며, every of 꼴은 없습니다. 대신 **every one of** the rooms라고 씁니다.\n\n' +
          '또 every는 "~마다"라는 뜻으로 every two weeks(2주마다)처럼 수와 복수 명사를 함께 받기도 합니다. "2주"를 한 단위로 묶어 "그 단위마다"라고 말하는 표현이며, 수(two) 뒤라서 명사는 복수형으로 씁니다.',
      },
    ],

    faq: [
      {
        q: 'a few랑 few는 뭐가 달라요?',
        a: '둘 다 셀 수 있는 명사의 복수형 앞에 쓰지만 뜻이 다릅니다. a few는 "조금 있는"(긍정), few는 "거의 없는"(부정)입니다. A few people came.(몇 사람이 왔다) / Few people came.(거의 오지 않았다) a little과 little도 같은 차이이고, 이 둘은 셀 수 없는 명사 앞에 씁니다.',
      },
      {
        q: 'its랑 it\'s가 자꾸 헷갈려요.',
        a: 'it\'s는 it is(또는 it has)를 줄인 말이고, its는 "그것의"라는 소유격입니다. 빈칸 뒤에 명사가 바로 오면 its(its logo), "그것은 ~이다"라는 뜻이면 it\'s(it\'s new)입니다. it is로 바꿔 읽어 보고 말이 되면 it\'s입니다.',
      },
      {
        q: 'news는 -s로 끝나는데 왜 is를 써요?',
        a: 'news는 생김새만 복수처럼 보일 뿐 셀 수 없는 명사입니다. 그래서 a news라고 하지 않고 단수 동사를 씁니다: The news is good. 하나를 세고 싶으면 a piece of news라고 합니다.',
      },
    ],

    mistakes: [
      'information, equipment, advice, furniture에 -s나 a/an을 붙이는 실수 — 셀 수 없는 명사는 그대로 쓰고, 세려면 a piece of를 씁니다.',
      'each·every 뒤에 복수 명사를 쓰는 실수(every employees) — each·every 뒤에는 단수형, 동사도 단수입니다.',
      '명사 앞에 소유대명사를 쓰거나(theirs report) 명사 없이 소유격을 쓰는 실수(The report is their.) — 명사 앞은 소유격, 혼자일 때는 소유대명사입니다.',
    ],

    gens: [
      {
        id: 'determiner',
        level: 1,
        title: '한정사와 명사의 수 맞추기',
        make: function (R) {
          var it = R.pick(DET_ITEMS);
          var g = it[1];
          var correct = R.pick(DET[g]);
          var reason = {};
          var wrongs = [];
          ['sg', 'pl', 'unc'].forEach(function (k) {
            if (k === g) return;
            DET_ALL[k].forEach(function (w) {
              // a little + 단수 명사는 "a + little(작은) + 명사"로 읽혀 맞는 문장이 되므로(a little ticket) 단수 자리 오답에서 뺀다.
              if (g === 'sg' && w === 'a little') return;
              wrongs.push(w); reason[w] = DET_RULE[k] + ' ' + NOUN_KIND[g];
            });
          });
          var pick = R.choices(correct, R.sample(wrongs, 3), 4);
          return {
            type: 'choice', concept: 1,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: NOUN_KIND[g] + ' ' + DET_RULE[g] + ' 정답: **' + correct + '**\n\n' + it[0].replace('___', '**' + correct + '**'),
          };
        },
      },
      {
        id: 'pronoun-case',
        level: 1,
        title: '인칭대명사의 격과 재귀대명사 고르기',
        make: function (R) {
          var it = R.pick(PRON_ITEMS);
          var forms = PRON[it[1]];
          var correct = it[2];
          var reason = {};
          var wrongs = [];
          forms.forEach(function (f) {
            if (f[0] === correct) return;
            wrongs.push(f[0]);
            reason[f[0]] = '고른 말은 ' + f[1] + '(' + f[0] + ')입니다. ' + CASE_REASON[it[3]];
          });
          var pick = R.choices(correct, wrongs, Math.min(4, forms.length));
          return {
            type: 'choice', concept: CASE_CONCEPT[it[3]],
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: CASE_REASON[it[3]] + ' 정답: **' + correct + '** (' + CASE_NAME[it[3]] + ')\n\n' + it[0].replace('___', '**' + correct + '**') + '\n(' + it[4] + ')',
          };
        },
      },
      {
        id: 'indefinite',
        level: 2,
        title: 'one, another, the other, others 고르기',
        make: function (R) {
          var it = R.pick(INDEF);
          var correct = it[1];
          var reason = {};
          it[2].forEach(function (w) { reason[w] = INDEF_DESC[w] + ' ' + it[3]; });
          var pick = R.choices(correct, it[2], 4);
          return {
            type: 'choice', concept: 4,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: it[3] + ' 정답: **' + correct + '**\n\n' + it[0].replace('___', '**' + correct + '**') + '\n(' + it[4] + ')',
          };
        },
      },
    ],

    vocab: [
      { w: 'equipment', m: '장비, 설비', ex: 'All the equipment in this room is new.', exm: '이 방의 장비는 모두 새것입니다.' },
      { w: 'furniture', m: '가구', ex: 'We ordered some furniture for the new office.', exm: '우리는 새 사무실에 둘 가구를 주문했습니다.' },
      { w: 'merchandise', m: '상품', ex: 'The store displays its merchandise near the entrance.', exm: '그 가게는 입구 가까이에 상품을 진열합니다.' },
      { w: 'luggage', m: '짐, 수하물', ex: 'Please do not leave your luggage in the hallway.', exm: '복도에 짐을 두지 마십시오.' },
      { w: 'feedback', m: '의견, 반응', ex: 'Thank you for your helpful feedback.', exm: '도움이 되는 의견을 주셔서 감사합니다.' },
      { w: 'permission', m: '허가, 허락', ex: 'You need permission to enter the lab.', exm: '실험실에 들어가려면 허가가 필요합니다.' },
      { w: 'warranty', m: '품질 보증(서)', ex: 'This printer comes with a one-year warranty.', exm: '이 프린터에는 1년 품질 보증이 딸려 있습니다.' },
      { w: 'branch', m: '지점, 지사', ex: 'The bank opened a new branch downtown.', exm: '그 은행은 시내에 새 지점을 열었습니다.' },
      { w: 'applicant', m: '지원자', ex: 'Each applicant will have a short interview.', exm: '지원자마다 짧은 면접을 봅니다.' },
      { w: 'assistant', m: '조수, 비서', ex: 'My assistant will send you the schedule.', exm: '제 비서가 일정을 보내 드릴 것입니다.' },
      { w: 'certificate', m: '증명서, 수료증', ex: 'Every participant will receive a certificate.', exm: '모든 참가자가 수료증을 받습니다.' },
      { w: 'device', m: '기기, 장치', ex: 'Please turn off your devices during the meeting.', exm: '회의 중에는 기기를 꺼 주십시오.' },
      { w: 'colleague', m: '동료', ex: 'I had lunch with a colleague from the sales team.', exm: '나는 영업팀 동료와 점심을 먹었습니다.' },
      { w: 'consultant', m: '자문가, 컨설턴트', ex: 'The consultant gave us some useful advice.', exm: '그 자문가는 우리에게 유용한 조언을 해 주었습니다.' },
    ],
  });
})();
