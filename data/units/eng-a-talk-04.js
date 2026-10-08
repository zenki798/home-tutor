/* 생활 영어 표현 · 길 찾기와 대중교통
 * 예문·대화는 모두 직접 쓴 것이다. 지하철 노선·역 이름(Blue Line, Central Station …)은 실제 노선이 아닌 가상의 이름이다.
 * 영어 낱말·문장 바로 뒤에는 받침에 따라 바뀌는 조사를 되도록 붙이지 않는다. */
(function () {
  // 길 안내 문장의 뜻 고르기 생성기 ------------------------------------------------
  var TURNS = [['left', '왼쪽'], ['right', '오른쪽']];
  var ORDS = [['first', '첫 번째'], ['second', '두 번째'], ['third', '세 번째']];
  var MARKS = [['traffic light', '신호등'], ['intersection', '교차로'], ['corner', '모퉁이']];
  var NUMS = [['two', '두'], ['three', '세'], ['four', '네']];

  // 위치 표현 생성기 -------------------------------------------------------------
  // [영어, 우리말]
  var PLACES = [
    ['the bank', '은행'], ['the post office', '우체국'], ['the bakery', '빵집'], ['the pharmacy', '약국'],
    ['the bookstore', '서점'], ['the bus stop', '버스 정류장'], ['the hotel', '호텔'], ['the cafe', '카페'],
    ['the park', '공원'], ['the library', '도서관'], ['the flower shop', '꽃집'],
  ];
  // [전치사, 우리말 뜻, 이 전치사를 잘못 고른 학생에게 보일 말]
  var RELS = [
    ['next to', '바로 옆에', 'next to 는 "~ 바로 옆에"입니다.'],
    ['across from', '길 건너 맞은편에', 'across from 은 "(길 건너) ~ 맞은편에"입니다.'],
    ['between', '사이에', 'between A and B 는 "A 와 B 사이에"입니다.'],
    ['behind', '뒤에', 'behind 는 "~ 뒤에"입니다.'],
    ['in front of', '앞에', 'in front of 는 "~ 앞에"입니다.'],
  ];
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  Tutor.registerUnit({
    id: 'eng-a-talk-04',
    course: 'eng-a-talk',
    title: '길 찾기와 대중교통',
    summary: '길을 묻고 안내를 알아듣는 표현과 버스·지하철·택시를 이용할 때 필요한 말을 익힙니다.',
    goals: [
      'How can I get to ~? / Is there a ~ near here? 로 길과 장소를 물을 수 있다.',
      'Go straight. / Turn left at ~. 같은 길 안내를 알아들을 수 있다.',
      'next to, across from, between 등으로 위치를 말할 수 있다.',
      '버스·지하철에서 노선과 갈아탈 곳을 묻고, 택시에서 목적지를 말할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '길 묻기',
        body: '길을 물을 때는 먼저 **Excuse me.**(실례합니다)로 말을 건넨 뒤 묻습니다.\n\n| 상황 | 표현 |\n|---|---|\n| 가는 방법 묻기 | How can I get to the museum? / How do I get to City Hall? |\n| 근처에 있는지 묻기 | Is there a pharmacy near here? |\n| 가장 가까운 곳 묻기 | Where is the nearest subway station? |\n| 거리·시간 묻기 | Is it far from here? / How long does it take to get there? |\n\n대답에서 거리는 흔히 걸리는 시간으로 말합니다.\n\n- It\'s about ten minutes on foot. (걸어서 10분쯤)\n- It\'s a five-minute walk. (걸어서 5분 거리)\n- It\'s too far to walk. Take a bus. (걷기엔 멀어요. 버스를 타세요.)\n\n**get to** 는 "~에 도착하다, ~에 가다"라는 뜻입니다. How can I get to ~? 는 "~에 어떻게 가요?"입니다.\n\n> ⚠️ 근처에 있는지 없는지 모를 때는 **Is there a ~?**(~이 있나요?)로 묻습니다. 있는 것을 알고 위치만 모를 때는 Where is the ~? 로 묻습니다.\n\n> 💡 five-minute 처럼 수와 함께 명사 앞에서 꾸밀 때는 minute 에 -s 를 붙이지 않습니다: a five-minute walk.',
        easy: '길 묻기는 지도 앱에 검색어를 넣는 것과 같습니다.\n\n- "박물관 가는 길" → How can I get to the museum?\n- "근처 약국" → Is there a pharmacy near here?\n- "가장 가까운 지하철역" → Where is the nearest subway station?\n\n앱 대신 사람에게 물으니 앞에 Excuse me. 만 붙이면 됩니다.',
        check: {
          type: 'choice',
          q: '근처에 편의점이 있는지 알고 싶습니다. 가장 알맞은 말을 고르세요.',
          choices: ['Is there a convenience store near here?', 'Is it a convenience store?', 'There is a convenience store.'],
          answer: 0,
          why: ['', '"그것은 편의점인가요?"라는 뜻입니다. 있는지 없는지를 묻는 말이 아닙니다.', '"편의점이 있습니다"라는 평서문입니다. 묻는 말이 되려면 Is there ~? 로 씁니다.'],
          explain: '있는지 없는지 물을 때는 **Is there a ~ near here?**(근처에 ~이 있나요?)입니다.',
        },
      },
      {
        title: '길 안내 알아듣기',
        body: '길 안내는 몇 가지 동작의 조합입니다. 동작마다 기준이 되는 곳(신호등·모퉁이·건물)이 붙습니다.\n\n| 표현 | 뜻 |\n|---|---|\n| Go straight (for two blocks). | (두 블록) 곧장 가세요. |\n| Turn left / right at the traffic light. | 신호등에서 왼쪽 / 오른쪽으로 도세요. |\n| Take the second left. | 두 번째 길에서 왼쪽으로 가세요. |\n| Go past the bank. | 은행을 지나가세요. |\n| Cross the street. | 길을 건너세요. |\n| It\'s on your left / right. | 왼쪽 / 오른쪽에 있어요. |\n| You can\'t miss it. | 쉽게 찾으실 거예요. |\n\n**block** 은 도로로 둘러싸인 한 구획을 말합니다. "두 블록 가세요"는 교차로를 두 번 지날 만큼 가라는 뜻입니다.\n\n순서를 나타내는 말(first, second, third)을 놓치지 않는 것이 중요합니다. the second traffic light 는 "두 번째 신호등"입니다.\n\n> 💡 You can\'t miss it. 은 "놓칠 수가 없어요", 곧 **눈에 잘 띄어 쉽게 찾을 수 있다**는 말입니다.',
        easy: '길 안내는 로봇에게 주는 명령어 카드 같습니다. 카드는 몇 장뿐입니다.\n\n- 앞으로: Go straight\n- 돌기: Turn left / Turn right\n- 지나기: Go past\n- 건너기: Cross\n\n카드마다 "어디서?"가 붙습니다: at the traffic light(신호등에서), at the corner(모퉁이에서). 카드를 순서대로 따라가면 도착합니다.',
        check: {
          type: 'choice',
          q: '"Turn right at the second traffic light."의 뜻으로 알맞은 것을 고르세요.',
          choices: ['두 번째 신호등에서 오른쪽으로 도세요.', '두 번째 신호등에서 왼쪽으로 도세요.', '신호등을 두 번 건너세요.'],
          answer: 0,
          why: ['', 'right 는 오른쪽입니다. 왼쪽은 left 입니다.', 'turn 은 "돌다"입니다. 건너다는 cross 입니다.'],
          explain: 'turn right = 오른쪽으로 돌다, at the second traffic light = 두 번째 신호등에서. 곧 **두 번째 신호등에서 오른쪽으로 도세요.**',
        },
      },
      {
        title: '위치 표현',
        body: '목적지를 찾을 때는 주변 건물과의 위치 관계가 큰 도움이 됩니다.\n\n| 표현 | 뜻 | 예 |\n|---|---|---|\n| next to | ~ 바로 옆에 | The cafe is next to the bank. |\n| across from | (길 건너) ~ 맞은편에 | The pharmacy is across from the hospital. |\n| between A and B | A 와 B 사이에 | The bakery is between the bank and the post office. |\n| in front of | ~ 앞에 | The bus stop is in front of the hotel. |\n| behind | ~ 뒤에 | The parking lot is behind the building. |\n| on the corner | 모퉁이에 | The bookstore is on the corner. |\n| near | ~ 근처에 | There is a park near the station. |\n\nacross from 은 길을 사이에 두고 마주 보는 자리이고, next to 는 같은 줄에서 바로 붙어 있는 자리입니다. 둘을 헷갈리면 길 하나를 건너야 할지 말지가 달라집니다.\n\nbetween 은 꼭 두 곳을 **and** 로 이어 말합니다: between the bank **and** the post office.',
        easy: '위치 표현은 사진을 찍을 때 사람을 세우는 자리와 같습니다.\n\n- 바로 옆에 붙어 선 사람 → next to\n- 두 사람 가운데 선 사람 → between\n- 길 건너편에서 마주 보는 사람 → across from\n- 앞줄·뒷줄 → in front of / behind',
        check: {
          type: 'ox',
          q: '"The bank is across from the post office."는 "은행은 우체국 바로 옆에 있다"라는 뜻입니다.',
          answer: false,
          explain: 'across from 은 "(길 건너) ~ 맞은편에"입니다. 은행은 우체국 **맞은편**에 있습니다. "바로 옆"은 next to 입니다.',
        },
      },
      {
        title: '버스·지하철 이용하기',
        body: '대중교통에서는 **어느 노선(버스)을 타는지, 어디서 갈아타는지, 어디서 내리는지**를 물으면 됩니다.\n\n| 묻는 말 | 대답 |\n|---|---|\n| Which line goes to the airport? | Take the Blue Line. |\n| Which bus goes to the stadium? | Take bus number 15. |\n| Does this bus go to City Hall? | Yes, it does. / No, take the next one. |\n| Where do I transfer? | Transfer to the Green Line at Central Station. |\n| Where should I get off? | Get off at the third stop. |\n| How many stops is it? | It\'s four stops from here. |\n\n- **take** + 노선·버스: 타고 가다 (Take the Blue Line.)\n- **get on / get off**: (버스·지하철에) 타다 / 내리다\n- **transfer**: 갈아타다 — transfer **to** + 갈아탈 노선, **at** + 갈아타는 역\n\nTransfer to the Green Line at Central Station. = Central Station 에서 Green Line 으로 갈아타세요.\n\n> 💡 transfer 대신 change 를 써서 Where do I change trains? 라고 해도 됩니다.',
        easy: '지하철 이용은 기차놀이 선로를 따라가는 것과 같습니다. 세 가지만 확인하면 됩니다.\n\n1. 어느 선로? → Which line goes to ~?\n2. 어디서 옮겨 타? → Where do I transfer?\n3. 어디서 내려? → Where should I get off?',
        check: {
          type: 'short', check: 'text',
          q: '빈칸에 "갈아타다"라는 뜻의 동사 하나를 쓰세요.\n\nExcuse me, where do I ___ to the Green Line?',
          answer: ['transfer', 'change'],
          wrong: [
            { a: 'take', why: 'take 는 "(노선을) 타고 가다"입니다. 갈아타는 곳을 물을 때는 transfer 를 씁니다.' },
            { a: 'get off', why: 'get off 는 "내리다"입니다. 다른 노선으로 옮겨 탈 때는 transfer 를 씁니다.' },
          ],
          explain: '**transfer** 는 "갈아타다"입니다. Where do I transfer to the Green Line? = Green Line 으로 어디서 갈아타요? (change 를 써도 됩니다.)',
        },
      },
      {
        title: '택시 타기',
        body: '택시에서는 목적지를 말하고, 내릴 곳을 알려 주면 됩니다.\n\n| 상황 | 표현 |\n|---|---|\n| 목적지 말하기 | Could you take me to Central Station? / To this address, please. |\n| 시간·요금 묻기 | How long will it take? / About how much will it be? |\n| 서둘러 달라고 할 때 | I\'m in a hurry. Could you take the fastest way? |\n| 세워 달라고 할 때 | Could you stop here, please? / You can drop me off here. |\n| 요금 낼 때 | Here you are. Keep the change. |\n\n**take** 는 여기서 "(사람을) 데려다주다"라는 뜻입니다. Could you take me to ~? 는 "~까지 데려다주시겠어요?"입니다.\n\n**drop off** 는 "(차에서 사람을) 내려 주다"입니다. You can drop me off here. = 여기서 내려 주시면 됩니다.\n\n> 💡 주소나 이름이 어려우면 휴대전화 화면을 보여 주며 Could you take me to this place? 라고 해도 됩니다.',
        easy: '택시 대화는 짧은 세 문장이면 충분합니다.\n\n1. 탈 때: Could you take me to the airport? (공항까지 가 주세요)\n2. 가는 동안: How long will it take? (얼마나 걸려요?)\n3. 내릴 때: You can drop me off here. (여기서 내려 주세요)',
        check: {
          type: 'choice',
          q: '택시 기사에게 Central Station 까지 가 달라고 말하려고 합니다. 가장 알맞은 말을 고르세요.',
          choices: ['Can I take you to Central Station, please?', 'Could you take me to Central Station?', 'Could you drop me off Central Station?'],
          answer: 1,
          why: ['"제가 당신을 데려다드릴까요?"라는 뜻이 되어 기사와 손님이 뒤바뀌었습니다.', '', '장소 앞에 at 이 빠져 틀린 문장입니다(drop me off at ~). 택시에서 목적지를 말할 때 가장 흔한 말은 take me to ~ 입니다.'],
          explain: '**Could you take me to ~?** 는 "~까지 데려다주시겠어요?"라는 뜻으로 택시에서 목적지를 말할 때 씁니다.',
        },
      },
    ],

    examples: [
      {
        q: '길에서 이런 안내를 들었습니다. 우체국은 어디에 있을까요?\n\nGo straight for two blocks and turn left at the traffic light. Go past the bank. The post office is on your right, across from a park.',
        steps: [
          'Go straight for two blocks: 곧장 두 블록을 갑니다.',
          'turn left at the traffic light: 신호등에서 왼쪽으로 돕니다.',
          'Go past the bank: 은행을 지나갑니다.',
          'The post office is on your right, across from a park: 우체국은 오른쪽에 있고, 길 건너 맞은편에는 공원이 있습니다.',
        ],
        answer: '두 블록 직진 → 신호등에서 왼쪽 → 은행을 지나면 오른쪽에 우체국(공원 맞은편)',
      },
      {
        q: '지하철역에서 공항 가는 길을 물어봅니다. 대화를 완성해 보세요.\n\nA: Excuse me. (① 공항에 가는 노선 묻기)\nB: Take the Blue Line and transfer to the Red Line.\nA: (② 어디서 갈아타는지 묻기)\nB: At Central Station.',
        steps: [
          '①은 어느 노선이 공항에 가는지 묻는 말입니다: Which line goes to the airport?',
          'B 의 대답에서 transfer to the Red Line(Red Line 으로 갈아타다)이 나왔습니다.',
          '②는 갈아타는 곳을 묻는 말입니다: Where do I transfer?',
          'B 가 At Central Station. 이라고 했으므로 Central Station 에서 갈아탑니다.',
        ],
        answer: '① Which line goes to the airport? ② Where do I transfer?',
      },
    ],

    terms: [
      { term: 'How can I get to ~?', def: '"~에 어떻게 가요?" 길을 묻는 가장 흔한 말입니다. get to 는 "~에 도착하다·가다"입니다.' },
      { term: 'Is there a ~ near here?', def: '"근처에 ~이 있나요?" 있는지 없는지 모르는 장소를 물을 때 씁니다.' },
      { term: 'block', def: '도로로 둘러싸인 한 구획입니다. Go straight for two blocks. = 두 블록 곧장 가세요.' },
      { term: 'across from', def: '"(길 건너) ~ 맞은편에"입니다. 바로 옆을 뜻하는 next to 와 다릅니다.' },
      { term: 'transfer', def: '"갈아타다"입니다. Transfer to the Green Line at Central Station. 처럼 to 뒤에 갈아탈 노선, at 뒤에 갈아타는 역을 씁니다.' },
      { term: 'get off', def: '버스·지하철에서 "내리다"입니다. 반대말은 get on(타다). 택시·승용차는 get in / get out (of) 를 씁니다.' },
      { term: 'drop off', def: '차에서 사람을 "내려 주다"입니다. 예: You can drop me off here.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '처음 온 동네에서 근처에 약국이 있는지 알고 싶습니다. 가장 알맞은 말을 고르세요.',
        choices: ['Is it a pharmacy near here?', 'Is there a pharmacy near here?', 'There is a pharmacy near here.', 'Are there pharmacy near here?'],
        answer: 1,
        why: [
          '"그것은 근처의 약국인가요?"처럼 들립니다. 있는지 없는지 물을 때는 Is there ~? 입니다.',
          '',
          '"근처에 약국이 있습니다"라는 평서문입니다. 묻는 말이 아닙니다.',
          'pharmacy 는 하나(단수)이므로 Are there 가 아니라 Is there a ~? 로 씁니다.',
        ],
        explain: '있는지 없는지 모르는 장소는 **Is there a ~ near here?** 로 묻습니다. "근처에 약국이 있나요?"',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
        q: '"걸어서 5분 거리예요."라는 뜻이 되도록 빈칸에 알맞은 낱말 하나를 쓰세요.\n\nIt\'s a five-minute ___.',
        answer: ['walk'],
        hint: '"걷기, 걸어가는 길"이라는 뜻의 명사입니다.',
        wrong: [
          { a: 'walking', why: 'a five-minute 뒤에는 명사 walk(걸어가는 길)가 옵니다. a five-minute walk 로 굳어진 표현입니다.' },
          { a: 'walks', why: 'a 가 붙어 있으므로 하나(단수)입니다. -s 를 붙이지 않습니다.' },
        ],
        explain: '**It\'s a five-minute walk.** = 걸어서 5분 거리예요. 수와 함께 명사 앞에서 꾸미는 five-minute 에는 -s 를 붙이지 않습니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '"Go straight for two blocks and turn left."의 뜻으로 알맞은 것을 고르세요.',
        choices: ['두 블록 곧장 간 뒤 왼쪽으로 도세요.', '두 블록 곧장 간 뒤 오른쪽으로 도세요.', '왼쪽으로 돈 뒤 두 블록 가세요.', '두 번째 길을 건너세요.'],
        answer: 0,
        why: [
          '',
          'left 는 왼쪽입니다. 오른쪽은 right 입니다.',
          '순서가 바뀌었습니다. 먼저 곧장 두 블록을 가고 그다음에 돕니다.',
          'turn left 는 "왼쪽으로 돌다"이고, 건너다는 cross 입니다.',
        ],
        explain: 'Go straight for two blocks(두 블록 곧장 가세요) → and turn left(그리고 왼쪽으로 도세요). 안내는 말한 순서대로 따라갑니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: '길 안내 끝에 들은 "You can\'t miss it."은 "찾기 어려울 거예요"라는 뜻입니다.',
        answer: false,
        explain: 'You can\'t miss it. 은 "놓칠 수가 없어요", 곧 **눈에 잘 띄어서 쉽게 찾을 거예요**라는 뜻입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n약국은 병원 길 건너 맞은편에 있습니다.\nThe pharmacy is ___ the hospital.',
        choices: ['next to', 'across from', 'between', 'behind'],
        answer: 1,
        why: [
          'next to 는 "바로 옆에"입니다. 길 건너 맞은편이 아닙니다.',
          '',
          'between 은 두 곳 사이에 있을 때 between A and B 로 씁니다.',
          'behind 는 "~ 뒤에"입니다.',
        ],
        explain: '길을 사이에 두고 마주 보는 자리는 **across from** 입니다. The pharmacy is across from the hospital.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'text', concept: 2,
        q: '우리말에 맞게 빈칸에 알맞은 낱말 하나를 쓰세요.\n\n빵집은 은행과 우체국 사이에 있습니다.\nThe bakery is ___ the bank and the post office.',
        answer: ['between'],
        hint: '두 곳을 and 로 이어 "A 와 B 사이에"라고 하는 말입니다.',
        wrong: [
          { a: 'among', why: 'among 은 셋 이상의 무리 가운데에 쓰는 말입니다. 두 곳(A and B) 사이에는 between 을 씁니다.' },
          { a: 'next', why: 'next 만으로는 "옆에"가 되지 않고 next to 로 써야 합니다. 또 우리말은 "사이에"입니다.' },
        ],
        explain: '두 곳 사이는 **between A and B** 입니다. The bakery is between the bank and the post office.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '지하철역에서 "Where do I transfer?"라고 물었습니다. 무엇을 물은 것일까요?',
        choices: ['어디서 갈아타는지', '어디서 표를 사는지', '어디서 내리는지', '몇 정거장 가는지'],
        answer: 0,
        why: [
          '',
          '표 사는 곳은 Where can I buy a ticket? 으로 묻습니다.',
          '내리는 곳은 Where should I get off? 로 묻습니다.',
          '정거장 수는 How many stops is it? 으로 묻습니다.',
        ],
        explain: 'transfer 는 "갈아타다"입니다. **Where do I transfer?** = 어디서 갈아타요?',
      },
      {
        id: 'p8', level: 1, type: 'short', check: 'text', concept: 3,
        q: '버스 안에서 기사에게 묻는 말입니다. 빈칸에 알맞은 낱말 하나를 쓰세요.\n\nExcuse me, where should I get ___ for City Hall?',
        answer: ['off'],
        hint: '버스·지하철에서 "타다"는 get on 입니다. 그 반대말을 떠올려 보십시오.',
        wrong: [
          { a: 'out', why: 'get out (of) 는 주로 택시·승용차에서 내릴 때 씁니다. 버스·지하철에서 내릴 때는 get off 입니다.' },
          { a: 'down', why: '"내리다"를 그대로 옮겨 get down 이라고 하지 않습니다. 버스에서 내리는 것은 get off 입니다.' },
        ],
        explain: '버스·지하철에서 "내리다"는 **get off** 입니다. "시청에 가려면 어디서 내려야 하나요?"',
      },
      {
        id: 'p9', level: 1, type: 'choice', concept: 4,
        q: '택시를 타고 Central Station 까지 가 달라고 하려고 합니다. 가장 알맞은 말을 고르세요.',
        choices: ['Can I take you to Central Station, please?', 'Could you take me to Central Station?', 'Could you get off at Central Station?', 'How many stops is it to Central Station?'],
        answer: 1,
        why: [
          '"제가 당신을 데려다드릴까요?"라는 뜻이 되어 손님과 기사가 뒤바뀌었습니다.',
          '',
          'get off 는 내가 "내리다"라서, "Central Station 에서 (기사님이) 내리시겠어요?"라고 기사에게 내리라고 하는 말이 됩니다.',
          '버스·지하철에서 정거장 수를 묻는 말입니다. 택시에는 맞지 않습니다.',
        ],
        explain: '택시에서 목적지를 말할 때는 **Could you take me to ~?**(~까지 데려다주시겠어요?)입니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 1,
        q: '다음 안내를 듣고 박물관을 찾아가려고 합니다. 박물관의 위치로 알맞은 것을 고르세요.\n\nGo straight for one block and turn right at the bank. The museum is on your left, next to a park.',
        choices: ['은행에서 오른쪽으로 돈 뒤, 왼쪽에 있는 공원 옆', '은행에서 왼쪽으로 돈 뒤, 오른쪽에 있는 공원 옆', '은행에서 오른쪽으로 돈 뒤, 왼쪽에 있는 공원 맞은편', '은행 바로 옆, 공원 맞은편'],
        answer: 0,
        hint: 'turn right 와 on your left 를 따로 살펴보십시오.',
        why: [
          '',
          '돌 때는 right(오른쪽), 박물관은 on your left(왼쪽)입니다. 반대로 읽었습니다.',
          'next to a park 는 공원 "옆"입니다. 맞은편은 across from 입니다.',
          '은행은 도는 곳입니다. 박물관은 은행에서 돈 뒤 왼쪽, 공원 옆에 있습니다.',
        ],
        explain: 'Go straight for one block(한 블록 직진) → turn right at the bank(은행에서 오른쪽) → on your left(왼쪽에), next to a park(공원 옆). 돌 때의 방향과 건물이 있는 쪽을 따로 들어야 합니다.',
      },
      {
        id: 'p11', level: 2, type: 'order', concept: 3,
        q: '지하철역에서 나눈 대화입니다. 자연스럽게 이어지도록 순서대로 놓으세요.',
        choices: [
          'Excuse me. Which line goes to the airport?',
          'Take the Blue Line and transfer to the Green Line.',
          'Where do I transfer?',
          'At Central Station. It\'s three stops from here.',
        ],
        answer: [0, 1, 2, 3],
        hint: '노선 묻기 → 노선 안내 → 갈아타는 곳 묻기 → 갈아타는 역 안내 순서입니다.',
        explain: '공항 가는 노선을 묻고(Which line goes to ~?) → Blue Line 을 타고 Green Line 으로 갈아타라는 안내 → 어디서 갈아타는지 묻고(Where do I transfer?) → 세 정거장 뒤 Central Station 이라는 대답이 이어집니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 4,
        q: '택시가 목적지 근처에 왔습니다. "여기 세워 주세요"라고 말하려고 합니다. 가장 알맞은 말을 고르세요.',
        choices: ['Could you take me here?', 'How long will it take?', 'Could you stop here, please?', 'Is there a stop near here?'],
        answer: 2,
        why: [
          '"여기로 데려다주시겠어요?"라는 뜻으로, 이미 그곳에 와 있는 상황과 맞지 않습니다.',
          '얼마나 걸리는지 묻는 말입니다.',
          '',
          '근처에 정류장이 있는지 묻는 말입니다.',
        ],
        explain: '세워 달라고 할 때는 **Could you stop here, please?** 또는 You can drop me off here. 라고 합니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 1,
        q: '다음 안내를 읽고, 내용과 **일치하지 않는** 것을 고르세요.\n\nGo out of Exit 2 and go straight for two blocks. Turn left at the traffic light. Go past the bakery. The library is on your right, across from a park. It\'s about a ten-minute walk.',
        choices: ['2번 출구로 나간다.', '신호등에서 오른쪽으로 돈다.', '도서관은 공원 맞은편에 있다.', '걸어서 10분쯤 걸린다.'],
        answer: 1,
        hint: 'Turn 다음에 오는 방향을 다시 보십시오.',
        why: [
          'Go out of Exit 2 이므로 2번 출구로 나갑니다. 맞는 내용입니다.',
          '',
          'across from a park 이므로 공원 맞은편입니다. 맞는 내용입니다.',
          'a ten-minute walk 이므로 걸어서 10분쯤입니다. 맞는 내용입니다.',
        ],
        explain: 'Turn left at the traffic light 이므로 신호등에서 **왼쪽**으로 돕니다. 도서관이 "오른쪽에(on your right)" 있다는 말과 헷갈리지 않아야 합니다.',
      },
      {
        id: 'a2', level: 3, type: 'order', concept: 2,
        q: '한 길에 가게 네 곳이 한 줄로 늘어서 있습니다. 설명을 읽고 길모퉁이부터 길 끝까지 순서대로 놓으세요.\n\nThe bank is on the corner. The cafe is between the bank and the bookstore. The flower shop is next to the bookstore, at the end of the street.',
        choices: ['the bank', 'the cafe', 'the bookstore', 'the flower shop'],
        answer: [0, 1, 2, 3],
        hint: '모퉁이에 있는 곳과 길 끝에 있는 곳을 먼저 정해 보십시오.',
        explain: '은행은 모퉁이(on the corner) → 카페는 은행과 서점 사이(between the bank and the bookstore) → 서점 → 꽃집은 서점 옆, 길 끝(at the end of the street)입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 3,
        q: '다음 안내를 읽고 물음에 답하세요. 갈아타는 역은 어디일까요?\n\nTo get to Riverside Park, take the Red Line toward North Hill. Get off at Market Street and transfer to the Yellow Line. Riverside Park is the second stop on the Yellow Line.',
        choices: ['Market Street', 'North Hill', 'Riverside Park', '갈아타지 않는다'],
        answer: 0,
        hint: 'transfer 바로 앞에서 어디서 내리라고 했는지 보십시오.',
        why: [
          '',
          'toward North Hill 은 "North Hill 방면(쪽으로 가는)"이라는 뜻으로, 열차가 향하는 쪽을 알려 줄 뿐입니다.',
          'Riverside Park 는 마지막 목적지입니다.',
          'transfer to the Yellow Line 이라고 했으니 한 번 갈아탑니다.',
        ],
        explain: 'Red Line 을 North Hill 방면으로 타고 → Market Street 에서 내려(Get off at Market Street) → Yellow Line 으로 갈아탄 뒤(transfer) → 두 번째 정거장이 Riverside Park 입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'text', concept: 4,
        q: '택시에서 "다음 모퉁이에서 내려 주시겠어요?"라고 말하려고 합니다. 빈칸에 알맞은 낱말 하나를 쓰세요.\n\nCould you ___ me off at the next corner?',
        answer: ['drop', 'let'],
        hint: '"(차에서 사람을) 내려 주다"는 ___ off 입니다.',
        wrong: [
          { a: 'get', why: 'get off 는 내가 "내리다"입니다. 기사에게 나를 "내려 달라"고 할 때는 drop me off 입니다.' },
          { a: 'take', why: 'take me to ~ 는 목적지까지 "데려다 달라"는 말입니다. 내려 달라고 할 때는 drop me off 입니다.' },
        ],
        explain: '**drop off** 는 "(차에서 사람을) 내려 주다"입니다: Could you drop me off at the next corner? (let me off 도 "내리게 해 주다"라는 뜻으로 같은 자리에 쓸 수 있습니다.)',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 0,
        q: '빈칸에 들어갈 가장 알맞은 대답을 고르세요.\n\nA: How long does it take to get to the museum?\nB: ___',
        choices: ['It\'s next to the bank.', 'About fifteen minutes by bus.', 'Take the Blue Line.', 'Yes, it takes.'],
        answer: 1,
        hint: 'How long 은 무엇을 묻는 말일까요?',
        why: [
          '위치를 말했습니다. How long 은 걸리는 시간을 묻습니다.',
          '',
          '타야 할 노선을 말했습니다. 걸리는 시간을 말해야 합니다.',
          'How 로 시작하는 질문에는 Yes 로 답하지 않습니다.',
        ],
        explain: 'How long does it take to get to ~? 는 "~까지 가는 데 얼마나 걸려요?"입니다. **About fifteen minutes by bus.**(버스로 15분쯤이요)처럼 시간으로 답합니다.',
      },
    ],

    deeper: [
      {
        title: '지하철 안내 방송 알아듣기',
        body: '영어 안내 방송에는 늘 비슷한 문장이 나옵니다. 몇 가지만 알아 두면 낯선 도시에서도 마음이 놓입니다.\n\n| 방송 | 뜻 |\n|---|---|\n| This train is bound for North Hill. | 이 열차는 North Hill 행입니다. |\n| The next stop is Market Street. | 다음 역은 Market Street 입니다. |\n| You can transfer to the Yellow Line. | Yellow Line 으로 갈아타실 수 있습니다. |\n| The doors are closing. | 문이 닫힙니다. |\n| Please stand clear of the doors. | 문에서 물러서 주십시오. |\n\nbound for ~ 와 toward ~ 는 모두 "~ 방면, ~ 행"이라는 뜻입니다. 같은 노선이라도 방향이 둘이니 타기 전에 확인합니다.',
      },
      {
        title: 'get on 과 get in — 타는 것의 크기',
        body: '영어는 탈것의 크기와 모양에 따라 "타다·내리다"를 다르게 말합니다.\n\n| 탈것 | 타다 | 내리다 |\n|---|---|---|\n| 버스·지하철·기차·비행기·배 | get on | get off |\n| 택시·승용차 | get in(to) | get out (of) |\n\n안에서 서서 걸어 다닐 수 있는 큰 탈것은 on/off, 몸을 굽혀 들어가 앉는 작은 차는 in/out 이라고 기억하면 쉽습니다. 비행기도 큰 탈것이라 get on the plane / get off the plane 이라고 합니다.',
      },
    ],

    faq: [
      {
        q: '"How can I go to ~?"라고 물으면 틀린 건가요?',
        a: '틀렸다고 할 수는 없지만, 길을 물을 때는 How can I get to ~? / How do I get to ~? 가 훨씬 흔합니다. get to 는 "도착하다"에 초점이 있어서 "거기까지 어떻게 가요?"라는 뜻이 잘 살아납니다.',
      },
      {
        q: '안내를 듣다가 놓치면 어떻게 해요?',
        a: '한 번에 다 알아듣지 못하는 것이 보통입니다. Sorry, could you say that again? / Could you speak a little more slowly? 로 다시 부탁하거나, 들은 내용을 So I go straight and turn left at the bank? 처럼 되풀이해 확인하면 됩니다. 지도를 보여 주며 Could you show me on the map? 이라고 해도 좋습니다.',
      },
      {
        q: 'transfer 뒤에 to 를 써요, at 을 써요?',
        a: '둘 다 씁니다. 뜻이 다릅니다. **to** 뒤에는 갈아탈 노선, **at** 뒤에는 갈아타는 역이 옵니다. Transfer to the Green Line at Central Station. = Central Station 에서 Green Line 으로 갈아타세요.',
      },
    ],

    mistakes: [
      'across from 과 next to 를 헷갈리는 실수 — across from 은 길 건너 맞은편, next to 는 바로 옆입니다.',
      '버스에서 내릴 곳을 물으며 get out 이나 get down 을 쓰는 실수 — 버스·지하철에서 내리는 것은 **get off** 입니다.',
      '택시에서 Can I take you to ~? 라고 말하는 실수 — 나를 데려다 달라고 할 때는 **Could you take me to ~?** 입니다.',
    ],

    gens: [
      {
        id: 'direction-meaning',
        level: 1,
        title: '길 안내 문장의 뜻 고르기',
        make: function (R) {
          var t = R.pick(TURNS);
          var tOther = t === TURNS[0] ? TURNS[1] : TURNS[0];
          var en, ok, cands;
          if (R.bool()) {
            var o = R.pick(ORDS);
            var m = R.pick(MARKS);
            var o2 = R.pick(ORDS.filter(function (x) { return x !== o; }));
            var m2 = R.pick(MARKS.filter(function (x) { return x !== m; }));
            en = 'Turn ' + t[0] + ' at the ' + o[0] + ' ' + m[0] + '.';
            ok = o[1] + ' ' + m[1] + '에서 ' + t[1] + '으로 도세요.';
            cands = [
              [o[1] + ' ' + m[1] + '에서 ' + tOther[1] + '으로 도세요.', t[0] + ' 는 ' + t[1] + '입니다. 왼쪽·오른쪽을 반대로 읽었습니다.'],
              [o2[1] + ' ' + m[1] + '에서 ' + t[1] + '으로 도세요.', '순서를 나타내는 말을 다시 보십시오. ' + o[0] + ' — "' + o[1] + '"입니다.'],
              [o[1] + ' ' + m2[1] + '에서 ' + t[1] + '으로 도세요.', '기준이 되는 곳을 다시 보십시오. ' + m[0] + ' — "' + m[1] + '"입니다.'],
              [o2[1] + ' ' + m[1] + '에서 ' + tOther[1] + '으로 도세요.', '방향과 순서가 모두 다릅니다.'],
            ];
          } else {
            var n = R.pick(NUMS);
            var n2 = R.pick(NUMS.filter(function (x) { return x !== n; }));
            en = 'Go straight for ' + n[0] + ' blocks and turn ' + t[0] + '.';
            ok = n[1] + ' 블록 곧장 간 뒤 ' + t[1] + '으로 도세요.';
            cands = [
              [n[1] + ' 블록 곧장 간 뒤 ' + tOther[1] + '으로 도세요.', t[0] + ' 는 ' + t[1] + '입니다. 왼쪽·오른쪽을 반대로 읽었습니다.'],
              [n2[1] + ' 블록 곧장 간 뒤 ' + t[1] + '으로 도세요.', '블록 수를 다시 보십시오. ' + n[0] + ' — "' + n[1] + '"입니다.'],
              [t[1] + '으로 돈 뒤 ' + n[1] + ' 블록 곧장 가세요.', '순서가 바뀌었습니다. 먼저 곧장 가고 그다음에 돕니다.'],
              [n2[1] + ' 블록 곧장 간 뒤 ' + tOther[1] + '으로 도세요.', '블록 수와 방향이 모두 다릅니다.'],
            ];
          }
          var reason = {};
          cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
          var pick = R.choices(ok, R.shuffle(cands).map(function (c) { return c[0]; }));
          return {
            type: 'choice', concept: 1,
            q: '다음 길 안내의 뜻으로 알맞은 것을 고르세요.\n\n' + en,
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === ok ? '' : reason[c]; }),
            explain: en + '\n\n= ' + ok,
          };
        },
      },
      {
        id: 'place-prep',
        level: 2,
        title: '위치 표현 고르기',
        make: function (R) {
          var ps = R.sample(PLACES, 3);
          var rel = R.pick(RELS);
          var a = ps[0], b = ps[1], c = ps[2];
          var kr, en;
          if (rel[0] === 'between') {
            kr = a[1] + R.josa(a[1], '은/는') + ' ' + b[1] + R.josa(b[1], '과/와') + ' ' + c[1] + ' 사이에 있습니다.';
            en = cap(a[0]) + ' is ___ ' + b[0] + ' and ' + c[0] + '.';
          } else {
            kr = a[1] + R.josa(a[1], '은/는') + ' ' + b[1] + ' ' + rel[1] + ' 있습니다.';
            en = cap(a[0]) + ' is ___ ' + b[0] + '.';
          }
          var others = R.shuffle(RELS.filter(function (r) { return r !== rel; }));
          var reason = {};
          others.forEach(function (r) { reason[r[0]] = r[2] + ' 우리말 "' + rel[1] + '"와 맞지 않습니다.'; });
          var pick = R.choices(rel[0], others.map(function (r) { return r[0]; }));
          return {
            type: 'choice', concept: 2,
            q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + kr + '\n' + en,
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (x) { return x === rel[0] ? '' : reason[x]; }),
            explain: rel[2] + '\n\n바른 문장: ' + en.replace('___', rel[0]),
          };
        },
      },
    ],

    vocab: [
      { w: 'straight', m: '곧장, 똑바로', ex: 'Go straight and you will see the station.', exm: '곧장 가시면 역이 보일 거예요.' },
      { w: 'block', m: '(도로로 둘러싸인) 구획, 블록', ex: 'The bank is two blocks away.', exm: '은행은 두 블록 떨어져 있습니다.' },
      { w: 'corner', m: '모퉁이', ex: 'There is a cafe on the corner.', exm: '모퉁이에 카페가 하나 있습니다.' },
      { w: 'traffic light', m: '신호등', ex: 'Turn left at the traffic light.', exm: '신호등에서 왼쪽으로 도세요.' },
      { w: 'intersection', m: '교차로', ex: 'Be careful at the busy intersection.', exm: '복잡한 교차로에서는 조심하세요.' },
      { w: 'crosswalk', m: '횡단보도', ex: 'Cross the street at the crosswalk.', exm: '횡단보도에서 길을 건너세요.' },
      { w: 'pharmacy', m: '약국', ex: 'Is there a pharmacy near here?', exm: '근처에 약국이 있나요?' },
      { w: 'nearest', m: '가장 가까운', ex: 'Where is the nearest bus stop?', exm: '가장 가까운 버스 정류장이 어디예요?' },
      { w: 'line', m: '(지하철) 노선', ex: 'Which line goes to the stadium?', exm: '어느 노선이 경기장으로 가나요?' },
      { w: 'transfer', m: '갈아타다', ex: 'You need to transfer at the next station.', exm: '다음 역에서 갈아타셔야 합니다.' },
      { w: 'stop', m: '정류장, 정거장', ex: 'Get off at the third stop.', exm: '세 번째 정거장에서 내리세요.' },
      { w: 'fare', m: '(교통) 요금', ex: 'How much is the bus fare?', exm: '버스 요금이 얼마예요?' },
      { w: 'address', m: '주소', ex: 'Could you take me to this address?', exm: '이 주소로 가 주시겠어요?' },
      { w: 'drop off', m: '(차에서) 내려 주다', ex: 'Please drop me off at the front gate.', exm: '정문에서 내려 주세요.' },
    ],
  });
})();
