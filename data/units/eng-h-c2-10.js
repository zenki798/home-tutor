/* 공통영어2 · 매체 자료 비판적으로 읽기
 * 기사·광고·글은 모두 직접 쓴 것이다(가상의 도시·상품·인물). 실제 상품·회사와 관계없다. */
(function () {
  // 글 A: 중립적인 기사 (가상의 도시)
  var NEWS = 'Hanul City Opens Bike-Sharing Program\n\nOn Monday, Hanul City opened a bike-sharing program with 500 bikes at 40 stations. Riders can rent a bike for 1,000 won an hour by using a phone app. The city plans to add 20 more stations next year. Some residents welcomed the program, while others said that the stations are too far from their homes.';
  // 글 B: 회의적인 블로그 글 (가상의 앱)
  var BLOG = 'Another "Miracle" App?\n\nA new study app claims that it can double your study time in just one week. Really? The company admits that only 30 students tested the app, and all of the tests were done by the company itself. I am not against new learning tools. However, I would like to see much more evidence before I believe such a big promise.';
  // 글 C: 광고 (가상의 상품)
  var AD = 'Tired of heavy school bags? Meet the CloudPack! Thousands of students have already switched. Top doctors say it is the best backpack ever made for your back. Order now - this special price ends tonight!';

Tutor.registerUnit({
  id: 'eng-h-c2-10',
  course: 'eng-h-c2',
  title: '매체 자료 비판적으로 읽기',
  summary: '기사·광고·온라인 글에서 사실과 의견을 구별하고, 글쓴이의 태도와 숨은 의도를 따져 읽습니다.',
  goals: [
    '확인할 수 있는 사실과 글쓴이의 판단인 의견을 구별할 수 있다.',
    'critical, optimistic, skeptical, neutral 같은 낱말로 글쓴이의 어조와 태도를 설명할 수 있다.',
    'so-called, claim, admit 같은 낱말 선택에 담긴 함축을 파악할 수 있다.',
    '광고·제목의 설득 전략과 과장을 알아보고, 출처와 근거가 믿을 만한지 따져 볼 수 있다.',
  ],
  standards: ['[10공영2-01-05]', '[10공영2-01-07]'],

  concepts: [
    {
      title: '사실과 의견 구별하기',
      body: '**사실(fact)**은 자료·기록·관찰로 **참인지 거짓인지 확인할 수 있는** 진술입니다. **의견(opinion)**은 글쓴이의 **판단·느낌·믿음**이라서 사람마다 다를 수 있습니다.\n\n' +
        '| | 사실 | 의견 |\n|---|---|---|\n' +
        '| 확인 방법 | 기록·자료로 확인할 수 있다 | 동의하거나 반대할 수 있다 |\n' +
        '| 자주 보이는 단서 | 수, 날짜, 장소, 일어난 일 | I think / believe, should, must, best, worst, great, terrible, amazing, probably |\n' +
        '| 예 | The program has **500 bikes**. | The program is **the best idea** the city has ever had. |\n\n' +
        '한 문장에 **사실과 의견이 섞이는** 경우도 많습니다. **The 500 new bikes are a wonderful gift to our city.**에서 "자전거가 500대"는 사실이고, "멋진 선물"은 의견입니다.\n\n' +
        '> 💡 판단이 담긴 형용사(wonderful, terrible, unfair)가 보이면 의견일 가능성이 큽니다. "누구에게 물어도 같은 답이 나오는가?"를 물어보십시오.\n\n' +
        '> ⚠️ 사실 진술이 늘 **참**이라는 뜻은 아닙니다. "The bridge is 2 km long."은 틀릴 수도 있지만, 재어 보면 확인할 수 있으므로 사실 진술입니다.',
      easy: '"우리 반은 30명이다"는 출석부를 보면 확인할 수 있지요. 이것이 **사실**입니다. "우리 반이 학교에서 제일 재밌다"는 다른 반 친구는 반대할 수도 있지요. 이것이 **의견**입니다.\n\n' +
        '영어 글에서도 숫자·날짜·일어난 일은 사실, best, great, should 같은 말이 들어간 판단은 의견일 때가 많습니다.',
      check: {
        type: 'choice',
        q: '다음 중 **사실**을 나타내는 문장은 무엇입니까?',
        choices: [
          'The museum opened in 2019.',
          'The museum is the most beautiful building in the city.',
          'Everyone should visit the museum at least once.',
        ],
        answer: 0,
        why: ['', 'the most beautiful은 글쓴이의 판단입니다. 다른 사람은 다르게 생각할 수 있습니다.', 'should는 "~해야 한다"는 글쓴이의 생각을 나타냅니다.'],
        explain: '박물관이 문을 연 해(2019)는 기록으로 **확인할 수 있으므로** 사실입니다. 나머지는 판단(most beautiful)과 당위(should)가 담긴 의견입니다.',
      },
    },
    {
      title: '어조와 태도를 나타내는 낱말',
      body: '**어조(tone)**는 글에서 느껴지는 말투이고, **태도(attitude)**는 글쓴이가 화제를 어떻게 바라보는지입니다. 글쓴이의 태도를 설명할 때 자주 쓰는 낱말을 정확히 구별해 둡시다.\n\n' +
        '| 낱말 | 뜻 | 이런 글에서 |\n|---|---|---|\n' +
        '| **neutral** | 중립적인 | 사실만 전하고 판단을 드러내지 않는다 (기사 글 A) |\n' +
        '| **optimistic** | 낙관적인 | 앞으로 잘될 것이라고 기대한다 |\n' +
        '| **pessimistic** | 비관적인 | 앞으로 나빠질 것이라고 본다 |\n' +
        '| **skeptical** | 회의적인 | 주장이 사실인지, 정말 효과가 있는지 **의심한다** (글 B) |\n' +
        '| **critical** | 비판적인 | 잘못이나 문제점을 **지적하며 부정적으로 평가한다** |\n' +
        '| **supportive** | 지지하는 | 찬성하고 편을 들어 준다 |\n\n' +
        '**skeptical과 critical**이 가장 헷갈립니다. skeptical은 "그게 정말이야?"(믿지 못함), critical은 "그건 잘못됐어"(문제를 지적함)입니다.\n\n' +
        '> 💡 태도의 단서: Really?처럼 되묻는 말, I doubt, I would like to see more evidence(→ skeptical), poorly planned, unfair(→ critical), will surely, bright future(→ optimistic).',
      easy: '친구가 "이 운동화 신으면 키가 5cm 큰대!"라고 했을 때 반응을 떠올려 보십시오.\n\n' +
        '- "와, 정말 크겠다!" → 낙관적(optimistic)\n- "에이, 그게 말이 돼? 증거 있어?" → 회의적(skeptical)\n- "그런 광고는 거짓말이라 문제야." → 비판적(critical)\n- "그런 광고가 있구나." → 중립적(neutral)',
      check: {
        type: 'choice',
        q: '다음 글쓴이의 태도로 가장 알맞은 것은 무엇입니까?\n\nThe company says its new drink makes you smarter. I doubt it. Where is the proof?',
        choices: ['skeptical', 'optimistic', 'neutral'],
        answer: 0,
        why: ['', 'optimistic은 잘될 것이라고 기대하는 태도입니다. 글쓴이는 주장을 믿지 않습니다.', 'neutral은 판단을 드러내지 않는 태도입니다. I doubt it으로 생각을 분명히 드러냈습니다.'],
        explain: '**I doubt it**(의심스럽다), **Where is the proof?**(증거가 어디 있나?)는 주장이 사실인지 의심하는 **skeptical**(회의적인) 태도를 보여 줍니다.',
      },
    },
    {
      title: '낱말 선택에 담긴 함축 (so-called, claim, admit)',
      body: '같은 일을 전해도 **어떤 낱말을 고르느냐**에 따라 글쓴이의 생각이 슬며시 드러납니다. 특히 남의 말을 전하는 동사와 so-called를 눈여겨보십시오.\n\n' +
        '| 낱말 | 겉뜻 | 함축 (숨은 뜻) |\n|---|---|---|\n' +
        '| **said / stated** | 말했다 | 판단 없이 전함 (중립) |\n' +
        '| **claimed** | 주장했다 | 아직 **증명되지 않았다**, 그대로 믿기는 어렵다 |\n' +
        '| **admitted** | 인정했다 | 말한 사람에게 **불리한** 사실을 (마지못해) 털어놓았다 |\n' +
        '| **insisted** | 우겼다, 고집했다 | 반대가 있는데도 끝까지 주장했다 |\n' +
        '| **revealed** | 밝혔다 | 감춰져 있던 것이 드러났다 |\n' +
        '| **so-called** | 이른바 | 그렇게 불리지만 글쓴이는 **그 이름이 맞는지 의심한다** |\n\n' +
        '비교해 보십시오.\n\n' +
        '- The company **said** the app works. → 그냥 전함\n' +
        '- The company **claimed** the app works. → "그쪽 주장일 뿐"\n' +
        '- The company **admitted** the app had problems. → "자기들 잘못을 인정함"\n' +
        '- The **so-called** "miracle" app → "기적이라고들 하지만 글쎄"\n\n' +
        '> ⚠️ 큰따옴표("miracle")도 so-called와 비슷하게 "남들이 그렇게 부를 뿐"이라는 거리 두기를 나타낼 수 있습니다.',
      easy: '"민수가 숙제를 다 했다고 **말했어**."와 "민수가 숙제를 다 했다고 **우기더라**."는 같은 일을 전하지만 느낌이 다르지요. 뒤의 말에는 "난 안 믿어"가 숨어 있습니다.\n\n' +
        '영어에서 claim, so-called가 이런 "숨은 의심"을, admit이 "자기 잘못을 털어놓음"을 담고 있습니다.',
      check: {
        type: 'choice',
        q: '"The **so-called** expert could not answer a single question."에서 글쓴이의 생각으로 가장 알맞은 것은 무엇입니까?',
        choices: [
          '그 사람이 정말 전문가인지 의심한다.',
          '그 사람이 뛰어난 전문가라고 칭찬한다.',
          '그 사람에 대한 판단 없이 전한다.',
        ],
        answer: 0,
        why: ['', 'so-called는 칭찬이 아니라 "그렇게 불릴 뿐"이라는 거리 두기입니다. 질문에 하나도 답하지 못했다는 내용과도 맞지 않습니다.', 'so-called를 골라 쓴 것 자체가 판단을 드러냅니다. 판단 없이 전하려면 the expert라고 쓰면 됩니다.'],
        explain: '**so-called**(이른바)는 "남들은 전문가라고 부르지만 나는 그렇게 보지 않는다"는 의심을 담습니다. 질문에 하나도 답하지 못했다는 뒤의 내용이 그 의심을 뒷받침합니다.',
      },
    },
    {
      title: '광고·제목의 설득 전략과 과장',
      body: '광고와 기사 제목은 짧은 시간에 사람의 마음을 움직이려고 여러 **설득 전략**을 씁니다. 전략을 알아보면 휩쓸리지 않고 "실제로 약속하는 것이 무엇인가?"를 따질 수 있습니다.\n\n' +
        '| 전략 | 예 | 따져 볼 점 |\n|---|---|---|\n' +
        '| **편승 (모두가 한다)** | Thousands of students have already switched! / Everyone has one! | 많은 사람이 산다고 내게 좋은 것은 아니다 |\n' +
        '| **애매한 권위** | Top doctors say … / Experts agree … | **어떤** 의사? 이름·조사 내용이 있는가? |\n' +
        '| **최상급·과장** | the best … ever, miracle, 100% guaranteed | 무엇과 비교해서 최고인가? 확인할 수 있는가? |\n' +
        '| **서두르게 하기** | Order now! Ends tonight! Only 3 left! | 생각할 시간을 빼앗으려는 것이 아닌가? |\n' +
        '| **질문으로 끌어들이기** | Tired of heavy bags? | 문제를 크게 느끼게 한 뒤 상품을 해답처럼 내민다 |\n\n' +
        '**기사 제목**도 과장될 수 있습니다. shocking, stuns, slams, explode 같은 센 낱말은 실제 내용보다 크게 느끼게 합니다.\n\n' +
        '- 과장된 제목: **Shocking! Test Scores Explode Overnight**\n' +
        '- 사실에 맞는 제목: **Average Test Scores Rise by 3 Points**\n\n' +
        '> 💡 Up to 50% off는 "**최대** 50퍼센트 할인"입니다. 50퍼센트 할인되는 물건은 일부뿐일 수 있습니다.',
      easy: '시장에서 "오늘만 이 가격! 다들 사 가요! 최고 중의 최고!"라고 외치는 소리를 들으면 얼른 사야 할 것 같지요. 하지만 하나씩 따져 보면 "오늘만"은 서두르게 하는 말, "다들"은 남 따라 하게 하는 말, "최고"는 확인할 수 없는 말입니다.\n\n' +
        '영어 광고의 Order now!, Everyone has one!, the best ever!도 똑같은 외침입니다.',
      check: {
        type: 'choice',
        q: '광고 문구 "Everyone at your school already has one!"이 쓰는 설득 전략은 무엇입니까?',
        choices: ['많은 사람이 하니 따라 하게 만들기(편승)', '전문가의 말 빌려 오기(권위)', '시간을 정해 서두르게 하기'],
        answer: 0,
        why: ['', '의사나 전문가 같은 권위 있는 사람이 나오지 않습니다.', 'tonight, now 같은 시간 압박 표현이 없습니다.'],
        explain: '"너희 학교 모두가 이미 가지고 있다"는 **다른 사람들이 다 하니 너도 하라**는 편승 전략입니다. 많은 사람이 산다는 것이 그 물건이 좋다는 증거는 아닙니다.',
      },
    },
    {
      title: '출처와 근거가 믿을 만한지 따져 보기',
      body: '매체 자료를 믿기 전에 **누가, 왜, 무엇을 근거로** 말하는지 확인해야 합니다. 다음 질문을 던져 보십시오.\n\n' +
        '1. **누가 썼는가?** 그 분야의 전문가인가, 이름도 알 수 없는 사람인가?\n' +
        '2. **왜 썼는가?** 정보를 주려는가, 물건을 팔려는가? 파는 회사가 직접 한 시험이라면 결과를 그대로 믿기 어렵습니다.\n' +
        '3. **근거가 구체적인가?** "Studies show …"(연구에 따르면)만 있고 어떤 연구인지 없으면 약한 근거입니다.\n' +
        '4. **조사 대상은 충분하고 고른가?** 30명, 자기 웹사이트 독자만 조사한 결과는 전체를 대표하기 어렵습니다.\n' +
        '5. **언제 나온 정보인가? 다른 곳에서도 같은 말을 하는가?** 오래된 정보이거나 한 곳에서만 하는 말이면 더 확인해야 합니다.\n\n' +
        '| 약한 근거 | 더 믿을 만한 근거 |\n|---|---|\n' +
        '| Many people say … | A survey of 2,000 adults by a national research center found … |\n' +
        '| Our own customers love it! | An independent lab tested 10 brands and found … |\n' +
        '| An anonymous post online | A report by a university research team, with its method explained |\n\n' +
        '> 💡 "독립적인(independent)"은 그 결과로 이익을 얻지 않는 쪽이 조사했다는 뜻입니다. 이해관계가 없는 출처일수록 믿을 만합니다.',
      easy: '친구가 "저 떡볶이집 진짜 맛있대!"라고 할 때, 그 말을 한 사람이 **떡볶이집 사장님**이라면 어떨까요? 맛있을 수도 있지만 그대로 믿기는 어렵지요. 파는 사람이니까요.\n\n' +
        '반대로 여러 손님이 각자 다른 곳에 "맛있다"고 남겼다면 조금 더 믿을 만합니다. 인터넷 글도 "누가, 왜 이 말을 하는가?"를 먼저 물어보면 됩니다.',
      check: {
        type: 'ox',
        q: '어떤 음료가 건강에 좋다는 근거로, 그 음료를 파는 회사가 직접 30명에게 시험한 결과는 독립적인 연구 기관이 수천 명을 조사한 결과보다 더 믿을 만하다.',
        answer: false,
        explain: '파는 회사가 직접 한 시험은 **이해관계**가 있고, 30명은 **조사 대상이 적습니다**. 이익과 관계없는 기관이 수천 명을 조사한 결과가 더 믿을 만합니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 글에서 사실과 의견을 나누고, 글쓴이의 태도를 말해 보십시오.\n\nThe city spent 2 billion won on the new park. The park opened last month. Sadly, it is a terrible waste of money because almost nobody uses it on weekdays.',
      steps: [
        'The city spent 2 billion won on the new park. → 들인 돈은 기록으로 확인할 수 있으므로 **사실**입니다.',
        'The park opened last month. → 문을 연 때도 확인할 수 있으므로 **사실**입니다.',
        'it is a terrible waste of money → terrible, waste는 글쓴이의 판단이므로 **의견**입니다. almost nobody uses it on weekdays는 확인해 볼 수 있는 사실 진술이지만, 의견을 받치는 근거로 쓰였습니다.',
        'Sadly, terrible waste처럼 문제점을 지적하며 부정적으로 평가하므로 글쓴이의 태도는 **critical**(비판적인)입니다.',
      ],
      answer: '사실: 2 billion won을 썼다, 지난달 문을 열었다 / 의견: 끔찍한 돈 낭비다 / 태도: critical',
    },
    {
      q: '글 C(광고)를 비판적으로 읽어 보십시오.\n\n' + AD,
      steps: [
        '**Tired of heavy school bags?** → 질문으로 문제를 크게 느끼게 하는 전략입니다.',
        '**Thousands of students have already switched.** → 많은 사람이 했으니 따라 하라는 편승 전략입니다. 몇 명인지, 만족했는지는 알 수 없습니다.',
        '**Top doctors say** → 애매한 권위입니다. 어떤 의사가 어떤 근거로 말했는지 없습니다.',
        '**the best backpack ever made** → 확인할 수 없는 최상급 과장입니다.',
        '**Order now - this special price ends tonight!** → 서두르게 해 따져 볼 시간을 줄이는 전략입니다.',
        '정리: 이 광고에는 확인할 수 있는 근거(무게, 시험 결과)가 하나도 없습니다. 무게가 몇 g인지, 누가 어떻게 시험했는지를 더 알아봐야 합니다.',
      ],
      answer: '질문으로 끌어들이기, 편승, 애매한 권위, 최상급 과장, 서두르게 하기 — 확인할 수 있는 근거가 없다.',
    },
  ],

  terms: [
    { term: '사실 (fact)', def: '자료·기록·관찰로 참인지 거짓인지 확인할 수 있는 진술입니다. 예: The program has 500 bikes.' },
    { term: '의견 (opinion)', def: '글쓴이의 판단·느낌·믿음을 나타내는 진술로, 사람마다 다를 수 있습니다. 예: It is the best idea ever.' },
    { term: '어조 (tone)', def: '글에서 느껴지는 글쓴이의 말투나 분위기입니다.' },
    { term: '태도 (attitude)', def: '글쓴이가 화제를 바라보는 입장입니다. 예: neutral(중립적인), skeptical(회의적인), critical(비판적인), optimistic(낙관적인)' },
    { term: '함축', def: '낱말이 겉뜻 말고 은근히 담고 있는 뜻입니다. 예: claim은 "아직 증명되지 않은 주장"이라는 느낌을 담습니다.' },
    { term: '편승 전략', def: '"모두가 한다"며 따라 하게 만드는 설득 전략입니다. 예: Everyone has one!' },
    { term: '과장', def: '실제보다 크게 부풀려 말하는 것입니다. 예: the best ever, miracle, shocking' },
    { term: '출처 (source)', def: '정보가 나온 곳입니다. 누가, 왜, 무엇을 근거로 말했는지 확인해야 믿을 만한지 판단할 수 있습니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '글 A를 읽고 사람들이 쓴 다음 문장 가운데 **사실**을 나타내는 것은 무엇입니까?\n\n' + NEWS,
      choices: [
        'Riders can rent a bike for 1,000 won an hour by using a phone app.',
        'The bike-sharing program is the smartest plan the city has ever made.',
        'Everyone in the city should ride a shared bike to work.',
        'The stations look too ugly for our beautiful city.',
      ],
      answer: 0,
      why: [
        '',
        'the smartest plan은 쓴 사람의 판단이라 사람마다 다를 수 있으므로 의견입니다.',
        'should는 "~해야 한다"는 생각을 나타내므로 의견입니다.',
        'ugly, beautiful은 보는 사람마다 다른 판단이므로 의견입니다.',
      ],
      explain: '1시간에 1,000원, 휴대전화 앱으로 빌린다는 것은 요금표와 앱으로 **확인할 수 있는** 사실입니다. 나머지는 판단(smartest, ugly)과 당위(should)가 담긴 의견입니다.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: '"The new library is the most wonderful place in our town."은 사실을 나타내는 문장이다.',
      answer: false,
      explain: '**the most wonderful**(가장 멋진)은 글쓴이의 판단이라 사람마다 다를 수 있으므로 **의견**입니다. 사실로 바꾸면 "The new library has 50,000 books."처럼 확인할 수 있는 내용이 되어야 합니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '다음 글쓴이의 태도로 가장 알맞은 것은 무엇입니까?\n\nI am sure the new bike program will make our city cleaner and healthier. In a few years, our streets will be full of happy riders!',
      choices: ['optimistic', 'skeptical', 'critical', 'neutral'],
      answer: 0,
      why: [
        '',
        'skeptical은 의심하는 태도입니다. 글쓴이는 I am sure라며 확신합니다.',
        'critical은 문제점을 지적하는 태도입니다. 글쓴이는 문제를 말하지 않습니다.',
        'neutral은 판단을 드러내지 않는 태도입니다. 글쓴이는 기대를 분명히 드러냅니다.',
      ],
      explain: '**I am sure**, **will make our city cleaner and healthier**, **happy riders**처럼 앞으로 좋은 일이 생길 것이라 기대하므로 **optimistic**(낙관적인)입니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '"The company **admitted** that the app had some problems."에서 admitted가 담고 있는 뜻으로 가장 알맞은 것은 무엇입니까?',
      choices: [
        '회사가 자기에게 불리한 사실을 털어놓았다.',
        '회사가 증명되지 않은 것을 우겼다.',
        '회사가 앱이 훌륭하다고 자랑했다.',
        '회사가 아무 판단 없이 사실을 알렸다.',
      ],
      answer: 0,
      why: [
        '',
        '증명되지 않은 것을 내세우는 것은 claim, 우기는 것은 insist의 느낌입니다.',
        '앱에 문제가 있다는 내용이라 자랑과는 반대입니다.',
        '판단 없이 전하는 낱말은 said나 stated입니다. admit에는 "불리한 것을 인정한다"는 함축이 있습니다.',
      ],
      explain: '**admit**은 말하는 사람에게 **불리한 사실을 인정한다**는 뜻을 담습니다. 회사가 자기 앱에 문제가 있다는 것을 인정했다는 뜻입니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '글 C(광고)에서 **Top doctors say it is the best backpack ever made for your back.**이 쓰는 설득 전략은 무엇입니까?\n\n' + AD,
      choices: ['누구인지 밝히지 않은 전문가의 말을 빌려 오기', '시간을 정해 서두르게 하기', '질문으로 끌어들이기', '정확한 실험 수치 보여 주기'],
      answer: 0,
      why: [
        '',
        '서두르게 하는 것은 Order now - this special price ends tonight! 부분입니다.',
        '질문으로 끌어들이는 것은 Tired of heavy school bags? 부분입니다.',
        '이 문장에는 수치가 하나도 없습니다. 오히려 근거가 없다는 것이 문제입니다.',
      ],
      explain: '**Top doctors**는 어떤 의사인지, 몇 명인지, 무엇을 근거로 했는지 밝히지 않은 **애매한 권위**입니다. 여기에 the best ever made라는 **최상급 과장**도 함께 쓰였습니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 1,
      q: '글 A(기사)의 어조로 가장 알맞은 것은 무엇입니까?\n\n' + NEWS,
      choices: ['neutral', 'optimistic', 'critical', 'skeptical'],
      answer: 0,
      why: [
        '',
        '글쓴이가 앞으로 잘될 것이라는 기대를 드러낸 문장이 없습니다.',
        '글쓴이가 직접 문제를 지적하지 않습니다. 정류장이 멀다는 것은 일부 주민의 말을 전한 것입니다.',
        '글쓴이가 무엇을 의심하는 표현(Really?, I doubt)이 없습니다.',
      ],
      explain: '날짜·수·요금 같은 **사실**을 전하고, 반기는 주민과 불만인 주민의 말을 **양쪽 모두** 전합니다(while). 글쓴이 자신의 판단이 드러나지 않으므로 **neutral**(중립적인)입니다.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 1,
      q: '글 B를 읽고 빈칸에 알맞은 영어 낱말 한 개를 쓰십시오. (s로 시작하는, 이 단원에서 배운 태도 낱말)\n\n' + BLOG + '\n\nThe writer is [[빈칸]] about the app\'s promise.',
      answer: ['skeptical', 'sceptical'],
      wrong: [
        { a: 'skeptic', why: 'skeptic은 "회의론자"라는 명사입니다. be동사 뒤에서 태도를 나타내려면 형용사 skeptical을 씁니다.' },
        { a: 'supportive', why: '글쓴이는 앱의 약속을 지지하지 않습니다. Really?, I would like to see much more evidence는 의심의 표현입니다.' },
      ],
      explain: '**Really?**(정말?)라고 되묻고, **I would like to see much more evidence before I believe**(믿기 전에 더 많은 증거를 보고 싶다)라고 하므로 앱의 약속을 의심하는 **skeptical**(회의적인) 태도입니다. 영국식 철자는 sceptical입니다.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 3,
      q: '같은 사실(학교의 평균 시험 점수가 3점 올랐다)을 다룬 기사 제목입니다. **가장 과장된** 제목은 무엇입니까?',
      choices: [
        'Shocking! Test Scores Explode Overnight',
        'Average Test Scores Rise by 3 Points',
        'School Reports Small Increase in Test Scores',
        'Test Scores Up Slightly This Year',
      ],
      answer: 0,
      why: [
        '',
        '오른 점수(3점)를 그대로 전하는 사실에 맞는 제목입니다.',
        'Small Increase(작은 증가)는 3점이라는 사실에 맞습니다.',
        'Slightly(조금)도 3점 상승에 맞는 표현입니다.',
      ],
      hint: '실제 변화(3점)에 비해 너무 센 낱말을 찾으십시오.',
      explain: '**Shocking**(충격적인), **Explode**(폭발하다), **Overnight**(하룻밤 사이에)는 3점 상승이라는 실제 내용보다 훨씬 크게 느끼게 하는 **과장**입니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: '"물을 많이 마시면 기억력이 좋아진다"는 주장을 확인하려고 합니다. 가장 믿을 만한 출처는 무엇입니까?',
      choices: [
        'A report by a university research team that tested 1,000 students for a year and explained its method',
        'An advertisement from a company that sells bottled water',
        'An online post by an unknown user with no sources',
        'A friend\'s story about drinking water before one test',
      ],
      answer: 0,
      why: [
        '',
        '물을 파는 회사는 그 주장이 사실이면 이익을 얻으므로 이해관계가 있습니다.',
        '누가 썼는지, 무엇을 근거로 했는지 알 수 없습니다.',
        '한 사람이 한 번 겪은 일은 모두에게 넓힐 수 없습니다.',
      ],
      hint: '누가, 왜, 몇 명을 대상으로 어떻게 조사했는지 따져 보십시오.',
      explain: '대학 연구팀이 **1,000명을 1년 동안** 조사하고 **방법까지 밝힌** 보고서가 가장 믿을 만합니다. 조사 대상이 많고, 방법을 확인할 수 있고, 물을 팔아 이익을 얻는 쪽도 아닙니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 2,
      q: '다음 문장에서 글쓴이의 생각으로 가장 알맞은 것은 무엇입니까?\n\nThe **so-called** "smart" trash can broke down after just two days.',
      choices: [
        '그 쓰레기통이 정말 똑똑한지 의심하며 비꼬고 있다.',
        '그 쓰레기통이 정말 똑똑하다고 감탄하고 있다.',
        '그 쓰레기통이 고장 난 까닭을 과학적으로 설명하고 있다.',
        '그 쓰레기통에 대해 판단 없이 사실만 전하고 있다.',
      ],
      answer: 0,
      why: [
        '',
        'so-called와 큰따옴표는 칭찬이 아니라 거리 두기입니다. 이틀 만에 고장 났다는 내용과도 맞지 않습니다.',
        '고장 난 까닭은 나오지 않습니다.',
        'so-called를 골라 쓴 것 자체가 판단입니다. 판단 없이 전하려면 The smart trash can이라고 쓰면 됩니다.',
      ],
      explain: '**so-called**(이른바)와 큰따옴표("smart")는 "똑똑하다고들 부르지만 글쎄"라는 의심을 담습니다. 이틀 만에 고장 났다는 내용이 그 비꼼을 뒷받침합니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 0,
      q: '글 B에서 글쓴이의 생각이 아니라 **확인할 수 있는 사실**을 전하는 문장은 무엇입니까?\n\n' + BLOG,
      choices: [
        'The company admits that only 30 students tested the app.',
        'I would like to see much more evidence before I believe such a big promise.',
        'I am not against new learning tools.',
        'Really?',
      ],
      answer: 0,
      why: [
        '',
        'I would like to ~ 는 글쓴이의 바람과 판단을 나타내는 의견입니다.',
        '새 학습 도구에 반대하지 않는다는 것은 글쓴이의 생각(입장)입니다.',
        '되물음으로 글쓴이의 의심을 드러낸 표현입니다. 무언가를 확인해 알려 주는 문장이 아닙니다.',
      ],
      explain: '시험한 학생이 **30명**이라는 것은 확인할 수 있는 **사실**입니다. 다만 admits를 골라 써서 "회사에 불리한 점"이라는 글쓴이의 시각이 함께 담겼습니다. 나머지는 글쓴이의 생각과 태도를 드러내는 문장입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 4,
      q: '글 B의 글쓴이가 앱의 약속을 믿지 못하는 까닭으로 알맞은 것은 무엇입니까?\n\n' + BLOG,
      choices: [
        '시험한 학생이 적고, 앱을 만든 회사가 직접 시험했기 때문에',
        '글쓴이가 새 학습 도구를 모두 싫어하기 때문에',
        '앱이 너무 비싸기 때문에',
        '앱을 쓴 학생들의 공부 시간이 오히려 줄었기 때문에',
      ],
      answer: 0,
      why: [
        '',
        '글쓴이는 I am not against new learning tools라며 새 도구를 싫어하지 않는다고 했습니다.',
        '가격 이야기는 글에 없습니다.',
        '공부 시간이 줄었다는 결과는 글에 없습니다. 글쓴이는 근거가 부족하다고 할 뿐입니다.',
      ],
      explain: '**only 30 students**(조사 대상이 적음), **all of the tests were done by the company itself**(이해관계가 있는 쪽이 직접 시험함) — 근거가 믿을 만하지 않기 때문입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 2,
      q: '빈칸에 들어갈 낱말로, "시장이 **자기 쪽의 잘못을 마지못해 인정했다**"는 뜻을 가장 잘 나타내는 것은 무엇입니까?\n\nThe mayor [[빈칸]] that the new road had been built too quickly.',
      choices: ['admitted', 'claimed', 'stated', 'insisted'],
      answer: 0,
      why: [
        '',
        'claimed는 "증명되지 않은 것을 주장했다"는 함축이라 잘못을 인정하는 느낌이 없습니다.',
        'stated는 판단 없이 "말했다"고 전하는 중립적인 낱말입니다.',
        'insisted는 반대에도 "끝까지 우겼다"는 뜻이라, 마지못해 인정하는 것과 거리가 멉니다.',
      ],
      hint: '말한 사람에게 불리한 내용을 털어놓을 때 쓰는 동사를 고르십시오.',
      explain: '도로를 너무 서둘러 지었다는 것은 시장에게 **불리한** 내용입니다. 이런 내용을 털어놓는 것은 **admitted**입니다. 같은 문장이라도 claimed, stated, insisted를 쓰면 전하는 느낌이 모두 달라집니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 3,
      q: '글 C(광고)에서 **쓰이지 않은** 설득 방법은 무엇입니까?\n\n' + AD,
      choices: [
        '출처를 밝힌 시험 결과(수치) 제시하기',
        '많은 사람이 이미 샀다고 말하기',
        '오늘 밤까지라며 서두르게 하기',
        '질문으로 문제를 떠올리게 하기',
      ],
      answer: 0,
      why: [
        '',
        'Thousands of students have already switched.가 편승 전략입니다.',
        'this special price ends tonight!가 서두르게 하는 전략입니다.',
        'Tired of heavy school bags?가 질문으로 끌어들이는 전략입니다.',
      ],
      hint: '광고의 문장을 하나씩 전략과 짝지어 보고, 남는 것을 찾으십시오.',
      explain: '이 광고에는 가방의 무게나 누가 어떻게 시험했는지 같은 **확인할 수 있는 근거가 하나도 없습니다**. Thousands, Top doctors, the best ever는 모두 확인하기 어려운 말입니다. 믿을 만한 광고라면 출처가 있는 수치를 보여 주어야 합니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '다음 글의 근거에 대한 지적으로 가장 알맞은 것은 무엇입니까?\n\nAccording to a survey on our company website, 9 out of 10 readers love our new energy bar. So it is clearly the most popular snack in the country!',
      choices: [
        '자기 회사 웹사이트 방문자만 조사했으므로 전국 사람들을 대표하지 못하고, 회사가 이익을 얻는 조사이다.',
        '10명 중 9명은 아주 높은 비율이므로 근거로 충분하다.',
        '설문 조사는 언제나 믿을 수 없으므로 어떤 결론도 내릴 수 없다.',
        '에너지바는 간식이 아니므로 결론이 틀렸다.',
      ],
      answer: 0,
      why: [
        '',
        '비율이 높아도, 누구를 조사했는지가 치우쳐 있으면 그 비율을 전체에 넓힐 수 없습니다.',
        '설문 조사도 대상이 고르고 충분하며 방법이 공정하면 좋은 근거가 됩니다. "언제나"는 지나친 일반화입니다.',
        '문제는 간식인지 아닌지가 아니라 근거의 대표성과 이해관계입니다.',
      ],
      hint: '누구를 조사했는지, 조사한 쪽이 결과로 이익을 얻는지 보십시오.',
      explain: '회사 웹사이트 독자는 이미 그 회사에 관심이 있는 사람들이라 **치우친 표본**이고, 조사한 쪽이 **이익을 얻는 회사**입니다. 그러니 "전국에서 가장 인기 있는 간식"이라는 결론은 근거를 훨씬 넘어선 **과장**입니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 1,
      q: '다음 글쓴이의 태도로 가장 알맞은 것은 무엇입니까?\n\nThe city\'s new parking rule is poorly planned. It forces small shop owners to pay much more, while large stores pay nothing extra. The city should have listened to the shop owners before making such an unfair rule.',
      choices: ['critical', 'skeptical', 'optimistic', 'neutral'],
      answer: 0,
      why: [
        '',
        'skeptical은 어떤 주장이 사실인지 의심하는 태도입니다. 글쓴이는 의심하는 것이 아니라 규칙의 잘못을 분명히 지적합니다.',
        'optimistic은 좋은 결과를 기대하는 태도입니다. 글쓴이는 규칙을 부정적으로 봅니다.',
        'neutral은 판단을 드러내지 않습니다. poorly planned, unfair는 분명한 판단입니다.',
      ],
      hint: '글쓴이가 "그게 정말이야?"라고 의심하는지, "그건 잘못됐어"라고 지적하는지 구별하십시오.',
      explain: '**poorly planned**(허술하게 계획된), **unfair**(불공평한), **should have listened**(귀 기울였어야 했다)처럼 규칙의 문제점을 지적하며 부정적으로 평가하므로 **critical**(비판적인)입니다. 의심(skeptical)이 아니라 평가와 비판입니다.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'number', unit: '개', concept: 0,
      q: '다음 다섯 문장 가운데 **의견**은 모두 몇 개입니까? 숫자로 쓰십시오.\n\n(1) The museum opened in 2019.\n(2) It has the most beautiful garden in the city.\n(3) About 300 people visit it every day.\n(4) Everyone should go there at least once.\n(5) The entrance fee is 5,000 won for adults.',
      answer: '2',
      wrong: [
        { a: '3', why: '(3) About 300 people …은 "약"이 붙어도 방문객 기록으로 확인할 수 있는 사실입니다.' },
        { a: '1', why: '(2)의 most beautiful뿐 아니라 (4)의 should도 글쓴이의 생각을 나타내는 의견입니다.' },
      ],
      hint: '기록이나 자료로 확인할 수 있는지 문장마다 물어보십시오.',
      explain: '의견은 (2) the most beautiful garden(판단)과 (4) Everyone should go(당위) 두 개입니다. (1) 연도, (3) 하루 방문객 수, (5) 입장료는 모두 확인할 수 있는 사실입니다. about(약)이 붙어도 확인할 수 있는 수라면 사실 진술입니다.',
    },
  ],

  deeper: [
    {
      title: '중립적인 기사에도 관점이 있다',
      body: '사실만 전하는 기사도 완전히 중립적이기는 어렵습니다. 기자는 수많은 사실 가운데 **무엇을 고르고, 무엇을 먼저 쓰고, 누구의 말을 전할지** 정해야 하기 때문입니다.\n\n' +
        '예를 들어 자전거 공유 기사에서\n\n' +
        '- "500대의 자전거로 문을 열었다"를 먼저 쓰면 → 규모가 강조되고\n' +
        '- "정류장이 너무 멀다는 불만"을 제목에 올리면 → 문제가 강조됩니다.\n\n' +
        '글 A는 반기는 주민과 불만인 주민의 말을 **둘 다** 전했기 때문에 중립적이라고 볼 수 있습니다. 기사를 읽을 때 "빠진 목소리는 없는가?", "다른 매체는 이 일을 어떻게 전했는가?"를 함께 물어보면 한쪽으로 기운 정보에 휩쓸리지 않을 수 있습니다.',
    },
    {
      title: '온라인 정보를 확인하는 습관',
      body: '온라인 글은 누구나 쓸 수 있고 빠르게 퍼집니다. 그래서 공유하거나 믿기 전에 짧은 확인 습관을 들이는 것이 좋습니다.\n\n' +
        '1. **멈추기**: 화나거나 놀라운 제목일수록 바로 공유하지 말고 한 번 멈춥니다. 센 감정을 일으키는 제목은 과장일 때가 많습니다.\n' +
        '2. **출처 살피기**: 누가 운영하는 곳인지, 글쓴이가 누구인지, 언제 쓴 글인지 봅니다.\n' +
        '3. **다른 곳과 견주기**: 믿을 만한 다른 매체도 같은 내용을 전하는지 찾아봅니다.\n' +
        '4. **처음 나온 곳 찾기**: "연구에 따르면"이라면 그 연구가 실제로 무엇을 말했는지 원래 자료를 찾아봅니다.\n\n' +
        '이 단원의 영어 표현(claim, so-called, Experts say …)을 알아보는 힘은 영어로 된 정보를 읽을 때 이 습관을 실천하는 출발점이 됩니다.',
    },
  ],

  faq: [
    {
      q: '사실이 틀린 내용이면 의견이 되나요?',
      a: '아닙니다. "The bridge is 2 km long."은 실제로는 3 km라서 틀렸더라도, 재어 보면 확인할 수 있으므로 사실 진술(틀린 사실 진술)입니다. 의견은 확인으로 참·거짓을 가릴 수 없는 판단(best, should, beautiful)입니다.',
    },
    {
      q: 'critical이랑 skeptical은 어떻게 달라요?',
      a: 'skeptical은 "그게 정말일까?" 하고 주장이나 효과를 의심하는 태도이고, critical은 "이건 잘못됐다"고 문제점을 지적하며 부정적으로 평가하는 태도입니다. Really?, I doubt, more evidence가 보이면 skeptical, unfair, poorly planned, should have가 보이면 critical일 가능성이 큽니다.',
    },
    {
      q: '광고는 다 거짓말인가요?',
      a: '그렇지 않습니다. 광고에도 가격, 크기, 무게처럼 확인할 수 있는 사실이 들어 있습니다. 다만 광고의 목적은 파는 것이므로 좋은 점을 크게, 나쁜 점은 작게 말합니다. 설득 전략을 알아보고, 확인할 수 있는 정보와 과장을 나누어 읽으면 됩니다.',
    },
  ],

  mistakes: [
    '수가 들어 있으면 무조건 사실이라고 보는 실수 — "The 500 bikes are a wonderful gift."처럼 사실과 의견이 섞인 문장도 있습니다. 판단이 담긴 낱말을 찾으십시오.',
    'skeptical(의심하는)과 critical(잘못을 지적하는)을 섞어 쓰는 실수 — 의심인지 비판인지 단서 표현으로 구별합니다.',
    'claimed, admitted를 said와 같은 뜻으로만 읽는 실수 — claim은 "증명되지 않은 주장", admit은 "불리한 것을 인정함"이라는 함축이 있습니다.',
  ],

  vocab: [
    { w: 'fact', m: '사실', ex: 'It is a fact that water boils at 100°C at sea level.', exm: '해수면 높이에서 물이 100°C에서 끓는다는 것은 사실입니다.' },
    { w: 'opinion', m: '의견', ex: 'That is just your opinion, not a fact.', exm: '그건 사실이 아니라 그냥 네 의견이야.' },
    { w: 'critical', m: '비판적인', ex: 'The writer is critical of the new school rule.', exm: '글쓴이는 새 학교 규칙에 비판적입니다.' },
    { w: 'optimistic', m: '낙관적인', ex: 'She is optimistic about passing the exam.', exm: '그녀는 시험에 합격할 것이라고 낙관합니다.' },
    { w: 'skeptical', m: '회의적인, 의심하는', ex: 'Many people were skeptical of the strange news.', exm: '많은 사람이 그 이상한 소식을 의심했습니다.' },
    { w: 'neutral', m: '중립적인', ex: 'A good reporter tries to stay neutral.', exm: '좋은 기자는 중립을 지키려고 애씁니다.' },
    { w: 'attitude', m: '태도', ex: 'His attitude toward the plan changed after the meeting.', exm: '그 계획에 대한 그의 태도는 회의 뒤에 바뀌었습니다.' },
    { w: 'claim', m: '(증명되지 않은 것을) 주장하다; 주장', ex: 'The ad claims that the cream works in one day.', exm: '그 광고는 크림이 하루 만에 효과가 있다고 주장합니다.' },
    { w: 'admit', m: '(잘못·불리한 것을) 인정하다', ex: 'He admitted that he had made a mistake.', exm: '그는 자신이 실수했다는 것을 인정했습니다.' },
    { w: 'so-called', m: '이른바, 소위', ex: 'The so-called shortcut took us an hour longer.', exm: '이른바 지름길이라는 길로 갔더니 한 시간이 더 걸렸습니다.' },
    { w: 'exaggerate', m: '과장하다', ex: 'Don\'t exaggerate. The fish was not that big.', exm: '과장하지 마. 그 물고기는 그렇게 크지 않았어.' },
    { w: 'headline', m: '(신문·기사의) 제목', ex: 'The headline was much more exciting than the story.', exm: '제목이 기사 내용보다 훨씬 자극적이었습니다.' },
    { w: 'advertisement', m: '광고', ex: 'I saw an advertisement for a new bike on the bus.', exm: '버스에서 새 자전거 광고를 보았습니다.' },
    { w: 'source', m: '출처, 근원', ex: 'Always check the source of the information.', exm: '정보의 출처를 늘 확인하십시오.' },
    { w: 'reliable', m: '믿을 만한', ex: 'Is this website a reliable source?', exm: '이 웹사이트는 믿을 만한 출처입니까?' },
    { w: 'bias', m: '편견, 치우침', ex: 'The survey has a bias because it only asked fans.', exm: '그 조사는 팬들에게만 물었기 때문에 치우쳐 있습니다.' },
  ],
});
})();
