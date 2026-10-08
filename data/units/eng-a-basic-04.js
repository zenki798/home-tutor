/* 다시 시작하는 영어 기초 문법 · 명사·관사·대명사
 * 예문은 모두 직접 쓴 문장이다(가상의 인물). 생성기에서 바뀌는 영어 낱말 뒤에는 조사를 붙이지 않는다. */
(function () {
  // 복수형 생성기: [단수, [정답 복수형들], 규칙, 흔한 틀린 꼴]
  var NOUNS = [
    ['book', ['books'], 's', 'bookes'],
    ['bus', ['buses'], 'es', 'buss'],
    ['box', ['boxes'], 'es', 'boxs'],
    ['dish', ['dishes'], 'es', 'dishs'],
    ['watch', ['watches'], 'es', 'watchs'],
    ['class', ['classes'], 'es', 'classs'],
    ['glass', ['glasses'], 'es', 'glasss'],
    ['potato', ['potatoes'], 'oes', 'potatos'],
    ['tomato', ['tomatoes'], 'oes', 'tomatos'],
    ['photo', ['photos'], 'os', 'photoes'],
    ['piano', ['pianos'], 'os', 'pianoes'],
    ['city', ['cities'], 'ies', 'citys'],
    ['baby', ['babies'], 'ies', 'babys'],
    ['party', ['parties'], 'ies', 'partys'],
    ['key', ['keys'], 'ys', 'keies'],
    ['toy', ['toys'], 'ys', 'toies'],
    ['day', ['days'], 'ys', 'daies'],
    ['leaf', ['leaves'], 'ves', 'leafs'],
    ['knife', ['knives'], 'ves', 'knifes'],
    ['man', ['men'], 'irr', 'mans'],
    ['woman', ['women'], 'irr', 'womans'],
    ['child', ['children'], 'irr', 'childs'],
    ['foot', ['feet'], 'irr', 'foots'],
    ['tooth', ['teeth'], 'irr', 'tooths'],
    ['mouse', ['mice'], 'irr', 'mouses'],
    ['person', ['people', 'persons'], 'person', 'peoples'],
    ['sheep', ['sheep'], 'same', 'sheeps'],
  ];
  var PLURAL_RULE = {
    s: '대부분의 명사는 끝에 -s를 붙입니다.',
    es: '끝이 -s, -x, -sh, -ch 인 명사는 -es를 붙입니다.',
    oes: '끝이 -o 인 명사 가운데 potato·tomato는 -es를 붙입니다.',
    os: '끝이 -o 라도 photo·piano처럼 -s만 붙이는 명사가 있습니다.',
    ies: '"자음 + y"로 끝나는 명사는 끝 y 대신 -ies를 씁니다.',
    ys: '"모음 + y"로 끝나는 명사는 -s만 붙입니다.',
    ves: '끝이 -f, -fe 인 명사는 -ves로 바꾸는 것이 많습니다(leaf → leaves, knife → knives). roof → roofs처럼 -s만 붙이는 것도 있습니다.',
    irr: '규칙을 따르지 않는 불규칙 복수형입니다. 따로 익혀 둡니다.',
    person: 'person의 복수형은 보통 people입니다(공문서 같은 딱딱한 글에서는 persons도 씁니다).',
    same: 'sheep은 단수와 복수의 모양이 같습니다.',
  };

  // a·an 생성기: [문장, 정답, 까닭 갈래]
  var ARTICLES = [
    ['I eat ___ apple every day.', 'an', 'vowel'],
    ['It takes ___ hour by train.', 'an', 'hsilent'],
    ['Do you have ___ umbrella?', 'an', 'vowel'],
    ['My sister goes to ___ university in Daejeon.', 'a', 'yu'],
    ['Students wear ___ uniform at that school.', 'a', 'yu'],
    ['I have ___ egg for breakfast.', 'an', 'vowel'],
    ['He is ___ honest man.', 'an', 'hsilent'],
    ['That is ___ good idea.', 'a', 'cons'],
    ['That is ___ interesting idea.', 'an', 'vowel'],
    ['Jeju is ___ island.', 'an', 'vowel'],
    ['We live in ___ old house.', 'an', 'vowel'],
    ['We live in ___ small house.', 'a', 'cons'],
    ['She works for ___ European company.', 'a', 'yu'],
    ['I need ___ new phone.', 'a', 'cons'],
    ['He drives ___ orange car.', 'an', 'vowel'],
    ['She is ___ engineer.', 'an', 'vowel'],
    ['This is ___ useful tip.', 'a', 'yu'],
    ['There is ___ elephant at the zoo.', 'an', 'vowel'],
    ['My father is ___ office worker.', 'an', 'vowel'],
    ['This is ___ one-way street.', 'a', 'won'],
  ];
  var ART_WHY = {
    vowel: '빈칸 뒤 낱말의 첫소리가 모음 소리이므로 an을 씁니다.',
    cons: '빈칸 뒤 낱말의 첫소리가 자음 소리이므로 a를 씁니다.',
    hsilent: '철자는 h로 시작하지만 h를 소리 내지 않아 첫소리가 모음 소리입니다. 그래서 an을 씁니다.',
    yu: '철자는 모음 글자로 시작하지만 첫소리가 "유"와 같은 y 소리(자음 소리)입니다. 그래서 a를 씁니다.',
    won: 'one은 w 소리로 시작합니다. 첫소리가 자음 소리이므로 a를 씁니다.',
  };

  // 인칭대명사 생성기: [문장, 정답, 보기 3개, 자리, 뜻]
  var PRON = [
    ['This is Jia. I work with ___.', 'her', ['she', 'her', 'hers'], 'obj', '이 사람은 지아입니다. 저는 그녀와 함께 일합니다.'],
    ['Minsu needs ___ glasses to read.', 'his', ['he', 'his', 'him'], 'pos', '민수는 글을 읽으려면 안경이 필요합니다.'],
    ['___ are my coworkers.', 'They', ['They', 'Their', 'Them'], 'nom', '그들은 제 직장 동료입니다.'],
    ['Please help ___. This box is too heavy for me.', 'me', ['I', 'my', 'me'], 'obj', '저 좀 도와주세요. 이 상자는 제게 너무 무겁습니다.'],
    ['That red car is ___. It is our family car.', 'ours', ['our', 'us', 'ours'], 'own', '저 빨간 차는 우리 것입니다. 우리 가족의 차입니다.'],
    ['Our dog loves ___ toy.', 'its', ['it', 'its', 'it\'s'], 'pos', '우리 개는 자기 장난감을 아주 좋아합니다.'],
    ['I call my parents every day. I miss ___ a lot.', 'them', ['they', 'their', 'them'], 'obj', '저는 매일 부모님께 전화합니다. 부모님이 무척 보고 싶습니다.'],
    ['___ name is Seojun.', 'My', ['I', 'My', 'Me'], 'pos', '제 이름은 서준입니다.'],
    ['These shoes are not mine. They are ___.', 'hers', ['her', 'hers', 'she'], 'own', '이 신발은 제 것이 아닙니다. 그녀의 것입니다.'],
    ['Mr. Kim is our new manager. Do you know ___?', 'him', ['he', 'his', 'him'], 'obj', '김 씨는 우리의 새 팀장입니다. 그분을 아세요?'],
    ['___ is a doctor.', 'She', ['She', 'Her', 'Hers'], 'nom', '그녀는 의사입니다.'],
    ['We love ___ new apartment.', 'our', ['we', 'our', 'us'], 'pos', '우리는 새 아파트가 아주 마음에 듭니다.'],
    ['Is this umbrella ___? It has your name on it.', 'yours', ['your', 'yours', 'you'], 'own', '이 우산이 당신 것인가요? 당신 이름이 적혀 있네요.'],
    ['My brother and I have a dog. ___ walk it every evening.', 'We', ['We', 'Our', 'Us'], 'nom', '형과 저는 개를 키웁니다. 우리는 저녁마다 개를 산책시킵니다.'],
    ['Please give ___ your address.', 'me', ['I', 'my', 'me'], 'obj', '저에게 당신의 주소를 알려 주세요.'],
    ['Jia is very kind. Everyone likes ___.', 'her', ['she', 'her', 'hers'], 'obj', '지아는 무척 친절합니다. 모두가 그녀를 좋아합니다.'],
    ['The children love ___ teacher.', 'their', ['they', 'their', 'them'], 'pos', '아이들은 자기 선생님을 아주 좋아합니다.'],
    ['Those bikes are not ours. They are ___.', 'theirs', ['their', 'them', 'theirs'], 'own', '저 자전거들은 우리 것이 아닙니다. 그들의 것입니다.'],
    ['___ works at a bank.', 'He', ['He', 'His', 'Him'], 'nom', '그는 은행에서 일합니다.'],
    ['I have a cat. ___ name is Nabi.', 'Its', ['It', 'Its', 'It\'s'], 'pos', '저는 고양이를 키웁니다. 고양이의 이름은 나비입니다.'],
  ];
  var FORM_INFO = {
    i: '주격(~는)', my: '소유격(나의)', me: '목적격(나를·나에게)', mine: '소유대명사(나의 것)',
    you: '주격·목적격', your: '소유격(너의, 당신의)', yours: '소유대명사(당신의 것)',
    he: '주격(그는)', his: '소유격(그의)·소유대명사(그의 것)', him: '목적격(그를·그에게)',
    she: '주격(그녀는)', her: '소유격(그녀의)·목적격(그녀를)', hers: '소유대명사(그녀의 것)',
    it: '주격·목적격', its: '소유격(그것의)', 'it\'s': 'it is의 줄임말',
    we: '주격(우리는)', our: '소유격(우리의)', us: '목적격(우리를·우리에게)', ours: '소유대명사(우리의 것)',
    they: '주격(그들은)', their: '소유격(그들의)', them: '목적격(그들을·그들에게)', theirs: '소유대명사(그들의 것)',
  };
  var CASE_REASON = {
    nom: '빈칸은 동사 앞의 주어 자리이므로 주격을 씁니다.',
    obj: '빈칸은 동사나 전치사 뒤의 목적어 자리이므로 목적격을 씁니다.',
    pos: '빈칸 뒤에 명사가 있습니다. 명사 앞에서 "~의"를 나타내는 것은 소유격입니다.',
    own: '빈칸 뒤에 명사가 없고 "~의 것"이라는 뜻입니다. 혼자 쓰이는 소유대명사를 씁니다.',
  };

  Tutor.registerUnit({
    id: 'eng-a-basic-04',
    course: 'eng-a-basic',
    title: '명사·관사·대명사',
    summary: '명사의 복수형과 셀 수 없는 명사, a·an·the의 쓰임, 대명사의 형태 변화를 차근차근 익힙니다.',
    goals: [
      '명사의 복수형을 규칙(-s, -es)과 불규칙 변화에 맞게 쓸 수 있다.',
      '셀 수 없는 명사를 a cup of, a piece of 같은 단위로 셀 수 있다.',
      'a·an과 the를 구별해 쓰고, some·any·many·much·a lot of를 알맞게 고를 수 있다.',
      '인칭대명사를 자리에 맞는 꼴(I, my, me, mine)로 쓸 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '명사의 복수형 — -s, -es, 불규칙 변화',
        body: '셀 수 있는 명사가 둘 이상이면 **복수형**을 씁니다. 대부분은 끝에 -s를 붙이지만, 끝 글자에 따라 붙이는 법이 달라집니다.\n\n| 명사의 끝 | 붙이는 법 | 예 |\n|---|---|---|\n| 대부분 | + s | book → books, car → cars |\n| -s, -x, -sh, -ch | + es | bus → buses, box → boxes, dish → dishes, watch → watches |\n| 자음 + o | + es (예외 많음) | potato → potatoes, tomato → tomatoes (photo → photos, piano → pianos) |\n| 자음 + y | 끝 y → ies | city → cities, baby → babies |\n| 모음 + y | + s | key → keys, day → days |\n| -f, -fe | → ves (예외 있음) | leaf → leaves, knife → knives (roof → roofs) |\n\n**불규칙 복수형**은 따로 익혀 둡니다.\n\n| 단수 | 복수 |\n|---|---|\n| man / woman | men / women |\n| child | children |\n| foot / tooth | feet / teeth |\n| mouse | mice |\n| person | people |\n| sheep / fish | sheep / fish (모양이 같음) |\n\n> 💡 셀 수 있는 명사의 단수는 혼자 쓰지 않고 앞에 a·an·the·my 같은 말을 붙입니다. I have **a** car. / I have **two** cars.',
        easy: '복수형은 "여럿이에요"라는 표시를 다는 일입니다. 거의 모든 명사는 꼬리 -s 하나면 됩니다.\n\n다만 끝소리가 "스·쉬·치"처럼 쉭쉭거리는 명사(bus, dish, watch)는 -s만 붙이면 소리가 뭉개져서 -es를 붙여 한 소리를 더 냅니다. 그래서 buses, dishes, watches입니다.\n\nchild → children, tooth → teeth처럼 모양이 통째로 바뀌는 것은 낱말마다 외워 둡니다.',
        check: {
          type: 'short', check: 'text',
          q: '다음 명사의 복수형을 쓰세요.\n\nbox',
          answer: ['boxes'],
          wrong: [
            { a: 'boxs', why: '끝이 -x 인 명사는 -s가 아니라 -es를 붙입니다.' },
            { a: 'boxen', why: 'box는 규칙대로 -es를 붙이는 명사입니다.' },
          ],
          explain: '끝이 -x 이므로 -es를 붙여 **boxes**입니다.',
        },
      },
      {
        title: '셀 수 없는 명사와 세는 법',
        body: '어떤 명사는 하나·둘로 셀 수 없습니다. 이런 **셀 수 없는 명사**에는 a·an을 붙이지 않고, 끝에 -s도 붙이지 않습니다.\n\n| 갈래 | 예 |\n|---|---|\n| 물질 (모양이 정해지지 않은 것) | water, milk, coffee, rice, bread, sugar |\n| 생각·느낌 (눈에 보이지 않는 것) | information, advice, help, love |\n| 묶어서 부르는 말 | furniture(가구), money(돈), homework(숙제), luggage(짐) |\n\n- an information (✗) → **some information** (○)\n- many homeworks (✗) → **a lot of homework** (○)\n\n셀 수 없는 명사의 양은 **담는 그릇이나 단위**로 셉니다. 둘 이상이면 **단위 쪽**을 복수형으로 바꿉니다.\n\n| 단위 | 예 |\n|---|---|\n| a cup of | a cup of coffee → two cups of coffee |\n| a glass of | a glass of water → three glasses of water |\n| a bottle of | a bottle of milk |\n| a bowl of | a bowl of rice |\n| a slice of | a slice of bread, a slice of pizza |\n| a piece of | a piece of cake, a piece of paper, a piece of advice, a piece of furniture |\n\n> 💡 카페에서 주문할 때는 "Two coffees, please."처럼 coffee를 잔 단위로 세기도 합니다. 일상 대화의 편한 말투이고, 기본은 two cups of coffee입니다.',
        easy: '물·우유·쌀은 손으로 "하나, 둘" 셀 수 없습니다. 그래서 컵·병·그릇 같은 "담는 것"을 셉니다.\n\n물 두 잔 → 물을 두 개로 세는 것이 아니라 잔(glass)을 두 개로 셉니다: two **glasses** of water\n\n조언(advice)이나 정보(information)도 눈에 보이지 않아 셀 수 없으니, "조언 한 마디"는 a piece of advice라고 합니다.',
        check: {
          type: 'choice',
          q: '"종이 두 장"을 영어로 바르게 나타낸 것을 고르세요.',
          choices: ['two pieces of paper', 'two piece of papers', 'two pieces of papers'],
          answer: 0,
          why: ['', '둘 이상이면 단위(piece)를 복수형으로 바꾸고, 셀 수 없는 명사(paper)는 그대로 둡니다.', 'paper(종이)는 셀 수 없는 명사라서 -s를 붙이지 않습니다. 복수형은 단위 쪽만 바꿉니다.'],
          explain: '셀 수 없는 명사 paper는 그대로 두고, 단위 piece만 복수형 pieces로 바꿉니다: **two pieces of paper**',
        },
      },
      {
        title: 'a·an과 the 구별하기',
        body: '**a·an**은 "정해지지 않은 어떤 하나"를 처음 말할 때 씁니다. 셀 수 있는 명사의 단수 앞에만 붙습니다.\n\n- a는 자음 **소리** 앞, an은 모음 **소리** 앞에 씁니다. 철자가 아니라 **소리**가 기준입니다.\n\n| a (자음 소리) | an (모음 소리) |\n|---|---|\n| a book, a car | an apple, an egg, an idea |\n| a university, a uniform ("유" 소리 — y 소리로 시작) | an hour, an honest man (h를 소리 내지 않음) |\n\n**the**는 "서로 알고 있는 바로 그것"을 가리킬 때 씁니다. 단수·복수, 셀 수 없는 명사에 모두 붙습니다.\n\n| the를 쓰는 경우 | 예 |\n|---|---|\n| 앞에서 이미 말한 것 | I have a cat. **The** cat is white. |\n| 말하는 사람과 듣는 사람이 모두 아는 것 | Please close **the** door. |\n| 세상에 하나뿐인 것 | **the** sun, **the** moon |\n| 뒤에서 꾸며 주어 정해진 것 | **the** book on the desk |\n\n> 💡 처음 꺼낼 때는 a, 다시 말할 때는 the — "고양이 한 마리가 있어. 그 고양이는 하얘."와 같은 흐름입니다.',
        easy: 'a·an은 "어떤 ~ 하나", the는 "바로 그 ~"입니다.\n\n가게에서 "우산 하나 주세요"는 아무 우산이나 괜찮으니 an umbrella. 친구에게 "그 우산 어디 있어?"는 둘 다 아는 바로 그 우산이니 the umbrella입니다.\n\na와 an은 뒤 낱말을 소리 내어 읽어 보고, 첫소리가 "아·에·이·오·어" 같은 모음 소리면 an을 씁니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nIt takes ___ hour to get there.',
          choices: ['a', 'an', 'the'],
          answer: 1,
          why: ['hour는 h로 시작하지만 h를 소리 내지 않아 첫소리가 모음 소리입니다.', '', '"한 시간"이라는 길이를 말하는 것이지 서로 아는 "바로 그 시간"이 아닙니다. 그래서 the가 아니라 a·an 중에서 고릅니다.'],
          explain: '"한 시간"은 정해지지 않은 하나이므로 a·an을 씁니다. a·an은 철자가 아니라 첫소리로 고릅니다. hour는 h를 소리 내지 않아 모음 소리로 시작하므로 **an** hour입니다. "그곳까지 한 시간 걸립니다."',
        },
      },
      {
        title: 'some, any, many, much, a lot of',
        body: '양이나 수를 대략 말할 때 쓰는 말입니다.\n\n| 말 | 뒤에 오는 명사 | 주로 쓰는 문장 | 예 |\n|---|---|---|---|\n| some (조금, 몇몇) | 셀 수 있는 복수·셀 수 없는 명사 | 긍정문, 권하는 질문 | I have some questions. / Would you like some tea? |\n| any (조금이라도, 전혀) | 셀 수 있는 복수·셀 수 없는 명사 | 부정문, 의문문 | I don\'t have any money. / Do you have any questions? |\n| many (많은) | 셀 수 있는 복수 | 어느 문장이든 | many books, many people |\n| much (많은) | 셀 수 없는 명사 | 주로 부정문·의문문 | I don\'t have much time. / How much water? |\n| a lot of (많은) | 둘 다 | 주로 긍정문 | a lot of books, a lot of time |\n\n- 수를 물을 때: **How many** cups? / 양·값을 물을 때: **How much** water? How much is it?\n\n> ⚠️ much는 셀 수 있는 명사에 쓰지 않습니다. much books (✗) → many books (○)\n\n> 💡 긍정문에서 "많은 시간"은 much time보다 a lot of time이 더 자연스럽습니다.',
        easy: '먼저 뒤에 오는 명사가 셀 수 있는지 봅니다.\n\n- 셀 수 있으면(books, people) → many\n- 셀 수 없으면(water, time) → much\n- 헷갈리면 → a lot of (둘 다 됩니다)\n\nsome과 any는 "조금"이라는 뜻이 같고 문장 종류만 다릅니다. 보통 "있다"고 할 때는 some, "없다·있어요?" 할 때는 any입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nHow ___ water do you drink a day?',
          choices: ['many', 'much', 'a lot of'],
          answer: 1,
          why: ['many — 셀 수 있는 명사의 복수형과 씁니다. water(물) — 셀 수 없는 명사입니다.', '', 'a lot of는 How 뒤에 쓰지 않습니다. 양을 물을 때는 How much입니다.'],
          explain: 'water는 셀 수 없는 명사이므로 양을 물을 때 **How much** water를 씁니다. "하루에 물을 얼마나 마십니까?"',
        },
      },
      {
        title: '인칭대명사의 형태 변화 — I, my, me, mine',
        body: '인칭대명사는 문장 속 **자리**에 따라 모양이 바뀝니다.\n\n| 주격 (~는·~가) | 소유격 (~의) | 목적격 (~를·~에게) | 소유대명사 (~의 것) |\n|---|---|---|---|\n| I | my | me | mine |\n| you | your | you | yours |\n| he | his | him | his |\n| she | her | her | hers |\n| it | its | it | — |\n| we | our | us | ours |\n| they | their | them | theirs |\n\n자리로 고릅니다.\n\n- 동사 앞의 주어 자리 → 주격: **She** works here.\n- 명사 바로 앞 → 소유격: This is **her** desk.\n- 동사·전치사 뒤 → 목적격: I know **her**. / I work with **her**.\n- 명사 없이 혼자 "~의 것" → 소유대명사: This desk is **hers**.\n\n> ⚠️ its(그것의)와 it\'s(= it is)는 다릅니다. The dog wags **its** tail. / **It\'s** cold today.',
        easy: '대명사는 같은 사람이라도 맡은 일에 따라 옷을 갈아입습니다.\n\n그녀가 주인공(주어)일 때는 she, 물건 앞에서 "그녀의"라고 소개할 때는 her, 누군가 그녀를 만나거나 부를 때(목적어)도 her, 물건만 가리키며 "그녀 것"이라고 할 때는 hers입니다.\n\nShe likes her job. Everyone likes her. That bag is hers.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nThis bag is not ___. It is Jia\'s.',
          choices: ['my', 'mine', 'me'],
          answer: 1,
          why: ['my — 소유격이라서 뒤에 명사가 와야 합니다(my bag).', '', 'me — 목적격(나를·나에게)입니다. "나의 것"이라는 뜻이 아닙니다.'],
          explain: '빈칸 뒤에 명사가 없고 "나의 것"이라는 뜻이므로 소유대명사 **mine**을 씁니다. "이 가방은 제 것이 아닙니다. 지아의 것입니다."',
        },
      },
    ],

    examples: [
      {
        q: '빈칸에 a, an, the 가운데 알맞은 것을 넣어 보세요.\n\nI have ___ dog and ___ cat. ___ dog is brown, and ___ cat is white.',
        steps: [
          '처음 꺼내는 개와 고양이는 "어떤 한 마리"이므로 a·an을 씁니다.',
          'dog, cat은 모두 자음 소리로 시작하므로 a dog, a cat입니다.',
          '둘째 문장의 개와 고양이는 앞에서 말한 바로 그 동물이므로 the를 씁니다.',
        ],
        answer: 'I have a dog and a cat. The dog is brown, and the cat is white.',
      },
      {
        q: '괄호 안의 대명사를 알맞은 꼴로 바꾸어 보세요.\n\nPlease give ___ (I) ___ (she) phone number.',
        steps: [
          '첫 빈칸은 동사 give 뒤의 "~에게" 자리(간접목적어)이므로 목적격 me를 씁니다.',
          '둘째 빈칸 뒤에는 명사 phone number가 있습니다. 명사 앞의 "~의"는 소유격이므로 her를 씁니다.',
        ],
        answer: 'Please give me her phone number. (저에게 그녀의 전화번호를 알려 주세요.)',
      },
    ],

    terms: [
      { term: '복수형', def: '둘 이상을 나타내는 명사의 꼴입니다. 대부분 -s, -es를 붙이고, child → children처럼 불규칙한 것도 있습니다.' },
      { term: '셀 수 있는 명사', def: '하나·둘로 셀 수 있는 명사입니다. 단수 앞에 a·an을 붙이고, 둘 이상이면 복수형을 씁니다. 예: a book, two books' },
      { term: '셀 수 없는 명사', def: '하나·둘로 셀 수 없는 명사입니다. a·an과 -s를 붙이지 않고 단위로 셉니다. 예: water, advice, furniture → a glass of water' },
      { term: '부정관사', def: '"정해지지 않은 어떤 하나"를 나타내는 a·an입니다. 뒤 낱말의 첫소리가 모음 소리면 an을 씁니다.' },
      { term: '정관사', def: '"서로 알고 있는 바로 그것"을 가리키는 the입니다. 예: the sun, the book on the desk' },
      { term: '인칭대명사', def: '사람이나 사물을 대신하는 I, you, he, she, it, we, they 같은 말입니다. 자리에 따라 꼴이 바뀝니다.' },
      { term: '소유격', def: '명사 앞에서 "~의"를 나타내는 꼴입니다. 예: my, your, his, her, its, our, their' },
      { term: '목적격', def: '동사나 전치사 뒤에서 "~를·~에게"를 나타내는 꼴입니다. 예: me, him, her, us, them' },
      { term: '소유대명사', def: '명사 없이 혼자 "~의 것"을 나타내는 말입니다. 예: mine, yours, his, hers, ours, theirs' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'text', concept: 0,
        q: '다음 명사의 복수형을 쓰세요.\n\nchild',
        answer: ['children'],
        wrong: [
          { a: 'childs', why: 'child는 -s를 붙이지 않는 불규칙 복수형입니다.' },
          { a: 'childrens', why: 'children이 이미 복수형입니다. 다시 -s를 붙이지 않습니다.' },
        ],
        explain: 'child(아이)의 복수형은 불규칙하게 **children**(아이들)입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 0,
        q: '복수형이 **바르지 않은** 것을 고르세요.',
        choices: ['city → cities', 'knife → knives', 'tomato → tomatos', 'foot → feet'],
        answer: 2,
        why: [
          '"자음 + y"로 끝나므로 끝 y 대신 -ies를 씁니다. 바릅니다.',
          '끝이 -fe 이므로 -ves로 바꿉니다. 바릅니다.',
          '',
          '불규칙 복수형입니다. 바릅니다.',
        ],
        explain: 'tomato는 -es를 붙여 **tomatoes**라고 씁니다(potato → potatoes도 같습니다). 나머지는 모두 바른 복수형입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 말을 고르세요.\n\nCan I have ___ water, please?',
        choices: ['a glass of', 'a piece of', 'a slice of', 'a loaf of'],
        answer: 0,
        why: [
          '',
          'a piece of — 케이크·종이·조언처럼 "한 조각·한 장·한 마디"를 셀 때 씁니다.',
          'a slice of — 빵·피자처럼 얇게 자른 것을 셀 때 씁니다.',
          'a loaf of — 빵 한 덩어리를 셀 때 씁니다.',
        ],
        explain: '물은 잔에 담아 셉니다. **a glass of water**(물 한 잔)입니다. "물 한 잔 주시겠어요?"',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: '다음 문장은 바른 문장입니다.\n\nI need an information about the trip.',
        answer: false,
        explain: 'information(정보) — 셀 수 없는 명사라서 an을 붙이지 않습니다. **I need some information about the trip.** 또는 I need information about the trip. 이라고 합니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 말을 고르세요.\n\n___ moon is very bright tonight.',
        choices: ['A', 'An', 'The'],
        answer: 2,
        why: [
          'A — 정해지지 않은 어떤 하나에 씁니다. 달은 세상에 하나뿐입니다.',
          'An — 모음 소리 앞에 쓰는 말이고, 달은 하나뿐이라 정해져 있습니다.',
          '',
        ],
        explain: '달(moon)은 세상에 하나뿐이므로 **the**를 씁니다. "오늘 밤 달이 무척 밝습니다."',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 말을 고르세요.\n\nShe is ___ honest person.',
        choices: ['a', 'an', '(아무것도 쓰지 않음)'],
        answer: 1,
        why: [
          'honest는 h로 시작하지만 h를 소리 내지 않아 첫소리가 모음 소리입니다.',
          '',
          'person(사람)은 셀 수 있는 명사의 단수이므로 앞에 a·an이 필요합니다.',
        ],
        explain: 'honest(정직한) — h를 소리 내지 않아 모음 소리로 시작합니다. 그래서 **an** honest person입니다. "그녀는 정직한 사람입니다."',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 말을 고르세요.\n\nThere aren\'t ___ eggs in the fridge.',
        choices: ['some', 'any', 'much'],
        answer: 1,
        why: [
          'some — 주로 긍정문에 씁니다. 이 문장은 부정문(aren\'t)입니다.',
          '',
          'much — 셀 수 없는 명사와 씁니다. eggs(달걀들) — 셀 수 있는 명사의 복수형입니다.',
        ],
        explain: '부정문에서 "조금도 없다"는 **any**를 씁니다. "냉장고에 달걀이 하나도 없습니다."',
      },
      {
        id: 'p8', level: 1, type: 'choice', concept: 4,
        q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n그의 차는 파란색입니다.\n→ ___ car is blue.',
        choices: ['He', 'His', 'Him'],
        answer: 1,
        why: [
          'He — 주격(그는)입니다. 명사 car 앞에서 "그의"를 나타내려면 소유격을 씁니다.',
          '',
          'Him — 목적격(그를)입니다. 동사나 전치사 뒤에 씁니다.',
        ],
        explain: '빈칸 뒤에 명사 car가 있으므로 "그의"를 나타내는 소유격 **His**를 씁니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'text', concept: 4,
        q: '괄호 안의 대명사를 알맞은 꼴로 바꾸어 쓰세요.\n\nMinsu and I are free tonight. Please call ___ (we).',
        answer: ['us'],
        hint: '빈칸은 동사 call 뒤의 자리입니다.',
        wrong: [
          { a: 'we', why: 'we — 주격입니다. 동사 call 뒤의 목적어 자리에는 목적격을 씁니다.' },
          { a: 'our', why: 'our — 소유격이라서 뒤에 명사가 와야 합니다.' },
          { a: 'ours', why: 'ours — "우리의 것"이라는 소유대명사입니다. "우리에게 전화하다"는 목적격입니다.' },
        ],
        explain: '동사 call 뒤의 목적어 자리이므로 we의 목적격 **us**를 씁니다. "민수와 저는 오늘 밤 시간이 있어요. 저희에게 전화 주세요."',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 말을 고르세요.\n\nWe don\'t have ___ time. Let\'s hurry.',
        choices: ['many', 'much', 'a few'],
        answer: 1,
        why: [
          'many — 셀 수 있는 명사의 복수형과 씁니다. time(시간)은 여기서 셀 수 없는 명사입니다.',
          '',
          'a few — 셀 수 있는 명사의 복수형과 씁니다(a few books).',
        ],
        explain: 'time은 셀 수 없는 명사이고 부정문이므로 **much**를 씁니다. "시간이 많지 않아요. 서두릅시다."',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 2,
        q: '두 빈칸에 들어갈 말을 차례대로 바르게 짝지은 것을 고르세요.\n\nI have a cat and a dog. ___ cat is white, and ___ dog is black.',
        choices: ['A — a', 'The — the', 'A — the', 'The — a'],
        answer: 1,
        hint: '두 번째 문장의 고양이와 개는 앞에서 말한 동물입니다.',
        why: [
          '두 번째 문장의 고양이와 개는 이미 앞에서 말한 바로 그 동물입니다. a를 쓰면 다른 고양이·개가 됩니다.',
          '',
          '고양이도 앞에서 말한 바로 그 고양이이므로 the를 씁니다.',
          '개도 앞에서 말한 바로 그 개이므로 the를 씁니다.',
        ],
        explain: '처음 꺼낼 때는 a cat, a dog이고, 다시 말할 때는 서로 아는 "바로 그" 동물이므로 둘 다 **the**를 씁니다.',
      },
      {
        id: 'p12', level: 2, type: 'order', concept: 1,
        q: '우리말에 맞게 배열하세요.\n\n저는 아침마다 커피 두 잔을 마십니다.',
        choices: ['I', 'drink', 'two cups', 'of coffee', 'every morning'],
        answer: [0, 1, 2, 3, 4],
        hint: '"커피 두 잔"은 단위 + of + 명사 순서입니다.',
        explain: '주어(I) + 동사(drink) + 목적어(two cups of coffee) + 때(every morning): **I drink two cups of coffee every morning.** 둘 이상이므로 단위 cup을 cups로 바꿉니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 1,
        q: '**옳지 않은** 문장을 고르세요.',
        choices: ['My mother always gives me good advice.', 'We need two pieces of furniture.', 'I have many homeworks today.', 'Can I have a slice of bread?'],
        answer: 2,
        why: [
          'advice(조언) — 셀 수 없는 명사라서 -s 없이 바르게 썼습니다.',
          '셀 수 없는 명사 furniture는 그대로 두고 단위 piece만 복수형으로 바르게 썼습니다.',
          '',
          '셀 수 없는 명사 bread를 단위 a slice of로 바르게 셌습니다.',
        ],
        explain: 'homework(숙제)는 셀 수 없는 명사라서 -s를 붙이지 않고 many와도 쓰지 않습니다. **I have a lot of homework today.** 로 고칩니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 말을 고르세요.\n\nThis is not your umbrella. ___ is in the car.',
        choices: ['Your', 'Yours', 'You'],
        answer: 1,
        hint: '빈칸 뒤에 명사가 있는지 보세요.',
        why: [
          'Your — 소유격이라서 뒤에 명사가 와야 합니다(Your umbrella).',
          '',
          'You — "당신은"이라는 뜻이 되어 "당신은 차 안에 있습니다"가 됩니다. 우산 이야기와 맞지 않습니다.',
        ],
        explain: '빈칸이 주어 자리이고 뒤에 명사가 없으며 "당신의 것(당신의 우산)"이라는 뜻이므로 소유대명사 **Yours**를 씁니다. "이건 당신 우산이 아니에요. 당신 것은 차 안에 있어요."',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'text', concept: 4,
        q: '괄호 안의 대명사를 알맞은 꼴로 바꾸어 쓰세요.\n\nThe dog wags ___ (it) tail when I come home.',
        answer: ['its'],
        hint: '빈칸 뒤에 명사 tail이 있습니다.',
        wrong: [
          { a: 'it\'s', why: 'it\'s — it is의 줄임말입니다. "그것의"는 아포스트로피 없이 its라고 씁니다.' },
          { a: 'it', why: 'it — 주격·목적격입니다. 명사 tail 앞에서 "그것의"를 나타내려면 소유격을 씁니다.' },
        ],
        explain: '명사 tail(꼬리) 앞에서 "그것의"를 나타내는 소유격 **its**를 씁니다. "내가 집에 오면 개가 꼬리를 흔듭니다."',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 말을 고르세요.\n\nA: Can you pass me ___ salt?\nB: Sure. Here you are.',
        choices: ['a', 'an', 'the'],
        answer: 2,
        hint: '식탁에 있어서 두 사람이 모두 아는 소금입니다.',
        why: [
          'a — 셀 수 있는 명사의 단수 앞에 씁니다. salt(소금) — 셀 수 없는 명사이고, 식탁의 그 소금으로 정해져 있습니다.',
          'an — 모음 소리 앞에 쓰고, 셀 수 없는 명사 salt에는 쓰지 않습니다.',
          '',
        ],
        explain: '식탁 위에 있어 말하는 사람과 듣는 사람이 모두 아는 "바로 그" 소금이므로 **the**를 씁니다. "소금 좀 건네주시겠어요?"',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 3,
        q: '대화의 두 빈칸에 들어갈 말을 차례대로 바르게 짝지은 것을 고르세요.\n\nA: Would you like ___ tea?\nB: No, thanks. I don\'t want ___ right now.',
        choices: ['some — any', 'any — some', 'much — many', 'many — much'],
        answer: 0,
        why: [
          '',
          '반대로 썼습니다. 권하는 질문에는 some, 부정문에는 any를 씁니다.',
          'much는 권하는 질문에 어울리지 않고, many는 셀 수 있는 명사의 복수형과 씁니다.',
          'many는 셀 수 있는 명사의 복수형과 씁니다. tea(차)는 셀 수 없는 명사입니다.',
        ],
        explain: '"차 좀 드실래요?"처럼 권하는 질문은 의문문이어도 **some**을 씁니다. "지금은 전혀 원하지 않아요"는 부정문이므로 **any**를 씁니다.',
      },
    ],

    deeper: [
      {
        title: '셀 수 있느냐 없느냐는 언어마다 다르다',
        body: '우리말에서는 "가구 두 개", "조언 몇 가지"처럼 자연스럽게 세지만, 영어의 furniture, advice, information은 셀 수 없는 명사입니다. 영어는 이 말들을 "낱개의 물건"이 아니라 **한 덩어리의 개념**으로 보기 때문입니다.\n\n그래서 셀 때는 낱개를 나타내는 말을 빌려 옵니다.\n\n- a piece of furniture (가구 한 점)\n- a piece of advice (조언 한 마디)\n- a piece of information (정보 하나)\n\n같은 낱말이 뜻에 따라 셀 수도 있고 없을 수도 있습니다. paper는 "종이"일 때 셀 수 없지만, "신문"이나 "논문"이라는 뜻일 때는 a paper, papers처럼 셉니다.',
      },
      {
        title: '다음 단원과의 연결 — 꾸며 주는 말',
        body: '이 단원에서는 명사와 그 앞에 붙는 a·an·the, some·many, my·your 같은 말을 익혔습니다.\n\n명사 앞에는 이 말들 말고도 명사의 모양·크기·성질을 알려 주는 **형용사**가 올 수 있습니다. 순서는 보통 "a·the·my → 형용사 → 명사"입니다.\n\n- a **new** phone / my **old** car / the **red** umbrella\n\n다음 단원에서는 이런 형용사와, 동사를 꾸미는 부사, 그리고 둘을 비교하는 표현을 다룹니다.',
      },
    ],

    faq: [
      {
        q: 'an hour는 h로 시작하는데 왜 an이에요?',
        a: 'a·an은 철자가 아니라 **첫소리**로 고르기 때문입니다. hour는 h를 소리 내지 않아 실제로는 모음 소리로 시작합니다. honest, honor도 같습니다.\n\n반대로 university, uniform은 모음 글자 u로 시작하지만 첫소리가 "유" 같은 y 소리라서 a university, a uniform이라고 합니다.',
      },
      {
        q: 'money는 셀 수 있는 것 같은데 왜 셀 수 없는 명사예요?',
        a: '지폐나 동전은 셀 수 있지만, money는 "돈"이라는 전체 덩어리를 가리키는 말이라 셀 수 없는 명사로 씁니다. 그래서 a money, moneys라고 하지 않고 some money, a lot of money라고 합니다.\n\n낱개를 세고 싶으면 coins(동전), bills(지폐), 또는 금액(10,000 won)을 셉니다.',
      },
      {
        q: 'its랑 it\'s는 어떻게 구별해요?',
        a: 'it\'s는 it is(또는 it has)의 줄임말이고, its는 "그것의"라는 소유격입니다. 아포스트로피가 있으면 줄임말이라고 기억하면 됩니다.\n\n문장에 it is를 넣어 보아 뜻이 통하면 it\'s, 통하지 않으면 its입니다. The cat licks its paw. → "it is paw"는 말이 안 되므로 its입니다.',
      },
    ],

    mistakes: [
      '셀 수 없는 명사에 a·an이나 -s를 붙이는 실수 — an information, many homeworks (✗) → some information, a lot of homework (○)',
      '철자만 보고 a·an을 고르는 실수 — a hour, an university (✗) → an hour, a university (○). 첫소리가 기준입니다.',
      'its와 it\'s, your와 yours를 혼동하는 실수 — 명사 앞에는 소유격(its, your), 명사 없이 혼자 쓰면 소유대명사(yours)입니다. it\'s는 it is의 줄임말이라 "그것의"로 쓰지 않습니다.',
    ],

    gens: [
      {
        id: 'plural-form',
        level: 1,
        title: '명사의 복수형 쓰기',
        make: function (R) {
          var n = R.pick(NOUNS);
          var wrong = [];
          if (n[3] && n[1].indexOf(n[3]) < 0) wrong.push({ a: n[3], why: '철자를 확인하세요. ' + PLURAL_RULE[n[2]] });
          if (n[1].indexOf(n[0]) < 0) wrong.push({ a: n[0], why: '단수형 그대로입니다. 둘 이상을 나타내려면 복수형으로 바꿉니다.' });
          return {
            type: 'short', check: 'text', concept: 0,
            q: '다음 명사의 복수형을 쓰세요.\n\n' + n[0],
            answer: n[1].slice(),
            hint: '명사의 끝 글자를 보세요.',
            wrong: wrong,
            explain: PLURAL_RULE[n[2]] + '\n\n' + n[0] + ' → **' + n[1][0] + '**',
          };
        },
      },
      {
        id: 'a-or-an',
        level: 1,
        title: 'a와 an 고르기',
        make: function (R) {
          var it = R.pick(ARTICLES);
          var other = it[1] === 'a' ? 'an' : 'a';
          return {
            type: 'short', check: 'text', concept: 2,
            q: '빈칸에 a 또는 an 가운데 알맞은 것을 쓰세요.\n\n' + it[0],
            answer: [it[1]],
            hint: '빈칸 뒤 낱말을 소리 내어 읽고 첫소리를 들어 보세요.',
            wrong: [{ a: other, why: ART_WHY[it[2]] }],
            explain: ART_WHY[it[2]] + '\n\n바른 문장: ' + it[0].replace('___', it[1]),
          };
        },
      },
      {
        id: 'pronoun-case',
        level: 2,
        title: '자리에 맞는 인칭대명사',
        make: function (R) {
          var it = R.pick(PRON);
          var opts = it[2].slice();
          return {
            type: 'choice', concept: 4,
            q: '빈칸에 알맞은 말을 고르세요.\n\n' + it[0],
            choices: opts,
            answer: opts.indexOf(it[1]),
            hint: '빈칸이 주어 자리인지, 명사 앞인지, 동사·전치사 뒤인지, 혼자 "~의 것"인지 보세요.',
            why: opts.map(function (o) {
              return o === it[1] ? '' : o + ' — ' + FORM_INFO[o.toLowerCase()] + ' 꼴입니다. ' + CASE_REASON[it[3]];
            }),
            explain: CASE_REASON[it[3]] + '\n\n바른 문장: ' + it[0].replace('___', it[1]) + '\n(' + it[4] + ')',
          };
        },
      },
    ],

    vocab: [
      { w: 'furniture', m: '가구', ex: 'We need some new furniture for the living room.', exm: '거실에 새 가구가 좀 필요합니다.' },
      { w: 'information', m: '정보', ex: 'Please send me more information about the class.', exm: '그 수업에 관한 정보를 더 보내 주세요.' },
      { w: 'advice', m: '조언, 충고', ex: 'My mother gives me good advice.', exm: '어머니는 제게 좋은 조언을 해 주십니다.' },
      { w: 'homework', m: '숙제', ex: 'My son has a lot of homework today.', exm: '제 아들은 오늘 숙제가 많습니다.' },
      { w: 'luggage', m: '(여행) 짐', ex: 'How much luggage do you have?', exm: '짐이 얼마나 있습니까?' },
      { w: 'piece', m: '한 조각, 한 장', ex: 'Can I have a piece of cake?', exm: '케이크 한 조각 먹어도 될까요?' },
      { w: 'slice', m: '(얇게 썬) 한 조각', ex: 'I eat a slice of bread for breakfast.', exm: '저는 아침으로 빵 한 조각을 먹습니다.' },
      { w: 'bottle', m: '병', ex: 'Please buy two bottles of water.', exm: '물 두 병을 사 주세요.' },
      { w: 'knife', m: '칼', ex: 'These knives are very sharp.', exm: '이 칼들은 아주 날카롭습니다.' },
      { w: 'tooth', m: '이, 치아 (복수 teeth)', ex: 'I brush my teeth three times a day.', exm: '저는 하루에 세 번 이를 닦습니다.' },
      { w: 'island', m: '섬', ex: 'Jeju is a beautiful island.', exm: '제주는 아름다운 섬입니다.' },
      { w: 'engineer', m: '기술자, 엔지니어', ex: 'My sister is an engineer.', exm: '제 언니는 엔지니어입니다.' },
      { w: 'wallet', m: '지갑', ex: 'Is this wallet yours?', exm: '이 지갑이 당신 것인가요?' },
      { w: 'receipt', m: '영수증', ex: 'Can I have a receipt, please?', exm: '영수증 좀 주시겠어요?' },
    ],
  });
})();
