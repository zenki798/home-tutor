/* 6학년 영어 · 길 묻고 안내하기
 * 지도(MAP): 아래 가운데 출발점에서 위(북쪽)를 보고 출발한다. 첫째 가로 길 = one block, 둘째 가로 길 = two blocks.
 *   오른쪽으로 돌면(동쪽) 왼쪽 = 위, 오른쪽 = 아래 / 왼쪽으로 돌면(서쪽) 오른쪽 = 위, 왼쪽 = 아래.
 *   1블록·오른쪽: 오른쪽 Bank, 왼쪽 Library   2블록·오른쪽: 오른쪽 Hospital, 왼쪽 Park
 *   1블록·왼쪽:   왼쪽 Bakery, 오른쪽 Post Office   2블록·왼쪽: 왼쪽 Museum, 오른쪽 School */
(function () {
  function bld(x, y, label) {
    return '<rect x="' + x + '" y="' + y + '" width="100" height="32" rx="3" fill="var(--fig-1)" fill-opacity="0.35" stroke="currentColor" stroke-width="1.5"/>' +
      '<text x="' + (x + 50) + '" y="' + (y + 21) + '" font-size="13" text-anchor="middle" fill="currentColor">' + label + '</text>';
  }
  var MAP_SVG = '<svg viewBox="0 0 320 330">' +
    '<rect x="145" y="0" width="30" height="330" fill="currentColor" fill-opacity="0.12"/>' +
    '<rect x="0" y="195" width="320" height="30" fill="currentColor" fill-opacity="0.12"/>' +
    '<rect x="0" y="75" width="320" height="30" fill="currentColor" fill-opacity="0.12"/>' +
    bld(200, 230, 'Bank') + bld(200, 158, 'Library') + bld(200, 110, 'Hospital') + bld(200, 38, 'Park') +
    bld(20, 230, 'Bakery') + bld(20, 158, 'Post Office') + bld(20, 110, 'Museum') + bld(20, 38, 'School') +
    '<line x1="160" y1="304" x2="160" y2="276" stroke="currentColor" stroke-width="2.5"/>' +
    '<polygon points="160,266 153,279 167,279" fill="currentColor"/>' +
    '<circle cx="160" cy="314" r="7" fill="var(--fig-2)" stroke="currentColor" stroke-width="1.5"/>' +
    '<text x="176" y="318" font-size="12" fill="currentColor">You are here</text>' +
    '</svg>';
  var MAP = { type: 'svg', svg: MAP_SVG, alt: '마을 지도: 아래 가운데의 출발점(You are here)에서 위로 큰길이 나 있고, 큰길을 가로지르는 길이 두 개 있어요. 길가에 건물 여덟 곳이 있어요.' };
  // [블록 수, 도는 방향, 있는 쪽, 장소]
  var PLACES = [
    [1, 'right', 'right', 'Bank'], [1, 'right', 'left', 'Library'],
    [2, 'right', 'right', 'Hospital'], [2, 'right', 'left', 'Park'],
    [1, 'left', 'left', 'Bakery'], [1, 'left', 'right', 'Post Office'],
    [2, 'left', 'left', 'Museum'], [2, 'left', 'right', 'School'],
  ];
  var KO = { Bank: '은행', Library: '도서관', Hospital: '병원', Park: '공원', Bakery: '빵집', 'Post Office': '우체국', Museum: '박물관', School: '학교' };
  function placeOf(b, t, s) {
    for (var i = 0; i < PLACES.length; i++) if (PLACES[i][0] === b && PLACES[i][1] === t && PLACES[i][2] === s) return PLACES[i][3];
    return '';
  }
  function say(b, t, s) {
    return 'Go straight ' + (b === 1 ? 'one block' : 'two blocks') + ' and turn ' + t + ". It's on your " + s + '.';
  }
  function other(x) { return x === 'left' ? 'right' : 'left'; }

  Tutor.registerUnit({
    id: 'eng-e6-03',
    course: 'eng-e6',
    title: '길 묻고 안내하기',
    summary: 'How can I get to the library?로 가는 길을 묻고 Go straight. Turn left.처럼 길을 안내해요.',
    goals: [
      'How can I get to ~?, Where is ~?로 가는 길을 물을 수 있어요.',
      'Go straight., Turn left., It\'s on your right.처럼 길을 안내할 수 있어요.',
      '몇 블록 가서 어디서 도는지, 무엇을 타고 가는지 말할 수 있어요.',
      '지도를 보며 길 안내를 읽고 도착할 장소를 찾을 수 있어요.',
    ],
    standards: [],

    concepts: [
      {
        title: '가는 길 묻기',
        body: '어떤 곳에 가는 길을 모를 때는 이렇게 물어요.\n\n- **How can I get to the library?** — 도서관에 어떻게 가나요?\n- **Where is the post office?** — 우체국은 어디에 있나요?\n\n**get to**는 "~에 도착하다, 가다"라는 뜻이에요. How can I get to 다음에 가고 싶은 장소를 넣으면 돼요.\n\n모르는 사람에게 물을 때는 먼저 **Excuse me.**(실례합니다.)라고 말하면 공손해요. 안내를 받으면 **Thank you.**로 고마움을 전해요.',
        easy: '길을 묻는 말은 "틀 + 장소"로 만들어요.\n\n**How can I get to** + the bank? → 은행에 어떻게 가요?\n\n**How can I get to** + the park? → 공원에 어떻게 가요?\n\n틀은 그대로 두고 장소 낱말만 바꿔 끼우면 돼요.',
        check: {
          type: 'choice',
          q: '박물관(museum)에 가는 길을 물을 때 알맞은 말은 무엇일까요?',
          choices: ['How can I get to the museum?', 'What is the museum?', 'When is the museum?'],
          answer: 0,
          why: ['', '박물관이 "무엇"인지 묻는 말이 되어요. 가는 방법은 How로 물어요.', 'When은 "언제"를 묻는 말이에요. 가는 방법은 How로 물어요.'],
          explain: '가는 방법을 물을 때는 **How can I get to** + 장소?로 말해요. How can I get to the museum?',
        },
      },
      {
        title: '길 안내하기: 곧장 가기, 돌기, 어느 쪽',
        body: '길을 안내할 때는 동사로 시작하는 문장(명령문)을 써요.\n\n| 안내 | 뜻 |\n|---|---|\n| **Go straight.** | 곧장(똑바로) 가세요. |\n| **Turn left.** | 왼쪽으로 도세요. |\n| **Turn right.** | 오른쪽으로 도세요. |\n| **It\'s on your left.** | 그곳은 당신의 왼쪽에 있어요. |\n| **It\'s on your right.** | 그곳은 당신의 오른쪽에 있어요. |\n\n**Turn**은 "도는 방향", **on your ~**는 "도착했을 때 그 건물이 있는 쪽"이에요.\n\n> ⚠️ 왼쪽·오른쪽은 **걸어가는 사람이 바라보는 방향**을 기준으로 정해요. 지도를 볼 때는 내가 걷는 방향이 위로 오도록 지도를 돌려 생각하면 쉬워요.',
        easy: '오른손을 들어 보세요. 그쪽이 **right**, 반대쪽이 **left**예요.\n\n- 앞으로 쭉: **Go straight.**\n- 왼손 쪽으로 몸을 돌려요: **Turn left.**\n- 걸어가다가 건물이 오른손 쪽에 보여요: **It\'s on your right.**',
        check: {
          type: 'choice',
          q: 'Turn left.의 뜻으로 알맞은 것은 무엇일까요?',
          choices: ['왼쪽으로 도세요.', '오른쪽으로 도세요.', '곧장 가세요.'],
          answer: 0,
          why: ['', '오른쪽으로 도세요.는 Turn right.예요.', '곧장 가세요.는 Go straight.예요.'],
          explain: 'turn은 "돌다", left는 "왼쪽"이에요. Turn left.는 **왼쪽으로 도세요.**예요.',
        },
      },
      {
        title: '몇 블록 가서 돌기',
        body: '**block(블록)**은 길과 길 사이의 한 구역이에요. 한 블록을 간다는 것은 길 하나를 건너는 곳(교차로)까지 가는 것이에요.\n\n- **Go straight one block.** — 한 블록 곧장 가세요.\n- **Go straight two blocks and turn right.** — 두 블록 곧장 가서 오른쪽으로 도세요.\n\n두 블록 이상이면 block에 **s**를 붙여 **blocks**라고 해요. 안내 두 개는 **and**로 이어요.\n\n> 💡 블록 수는 one, two처럼 개수를 나타내는 말로 말해요.',
        easy: '바둑판처럼 생긴 동네를 떠올려 보세요. 가로 길을 하나 만날 때마다 "한 블록"을 간 거예요.\n\n가로 길을 두 번 만나는 곳까지 가면 **two blocks**, 거기서 오른쪽으로 돌면 **turn right**예요.',
        check: {
          type: 'ox',
          q: 'Go straight two blocks.는 "두 블록 곧장 가세요."라는 뜻이에요.',
          answer: true,
          explain: 'go straight는 "곧장 가다", two blocks는 "두 블록"이에요. 그래서 "두 블록 곧장 가세요."예요.',
        },
      },
      {
        title: '탈것으로 가는 방법 말하기',
        body: '먼 곳은 탈것을 타고 가는 방법을 알려 줘요.\n\n- **Take bus number 7.** — 7번 버스를 타세요.\n- **You can go there by subway.** — 거기에는 지하철로 갈 수 있어요.\n\n**take**는 "(탈것을) 타다"라는 뜻이에요. **by**는 "~으로, ~을 타고"라는 뜻이고, 뒤에 탈것 낱말을 바로 써요.\n\n| by + 탈것 | 뜻 |\n|---|---|\n| by bus | 버스로 |\n| by subway | 지하철로 |\n| by bike | 자전거로 |\n| by taxi | 택시로 |\n\n> ⚠️ by 다음에는 a나 the를 쓰지 않아요. by a bus(×) → by bus(○)',
        easy: '교통카드를 찍는 장면을 떠올려 보세요. "7번 버스를 타!"는 **Take bus number 7.**이에요.\n\n"지하철을 타고 가"는 **by subway**예요. by 뒤에 탈것 이름만 바꿔 끼우면 by bus, by bike처럼 여러 가지로 말할 수 있어요.',
        check: {
          type: 'choice',
          q: 'You can go there by subway.의 뜻으로 알맞은 것은 무엇일까요?',
          choices: ['거기에는 지하철로 갈 수 있어요.', '거기에는 버스로 갈 수 있어요.', '거기에는 걸어서 갈 수 있어요.'],
          answer: 0,
          why: ['', '버스로는 by bus예요. subway는 지하철이에요.', '걸어서 간다는 말은 없어요. by subway는 지하철로 간다는 뜻이에요.'],
          explain: 'by subway는 "지하철로"라는 뜻이에요. 그래서 **거기에는 지하철로 갈 수 있어요.**예요.',
        },
      },
      {
        title: '지도를 보며 안내 따라가기',
        body: '안내를 듣고 지도에서 장소를 찾을 때는 이 순서로 손가락을 움직여요.\n\n1. 출발점(**You are here**)에 손가락을 놓아요. 화살표 쪽(위)을 보고 서 있어요.\n2. **Go straight one block / two blocks** — 가로 길을 하나(또는 둘) 만날 때까지 위로 가요.\n3. **Turn left / Turn right** — 그 길에서 왼쪽 또는 오른쪽으로 돌아요.\n4. **It\'s on your left / right** — 걸어가는 방향을 기준으로 왼쪽인지 오른쪽인지 보고 건물을 찾아요.\n\n예를 들어 이 지도에서 Go straight one block and turn left. It\'s on your right.를 따라가면 **Post Office(우체국)**에 도착해요. 왼쪽으로 돌면 지도의 왼쪽으로 걷게 되는데, 이때 내 오른쪽은 지도의 위쪽이에요.',
        easy: '지도 위에 작은 인형을 세워 두었다고 생각해 보세요. 인형이 돌 때마다 지도(또는 내 몸)도 같이 돌리면 왼쪽·오른쪽이 헷갈리지 않아요.\n\n오른쪽으로 돈 인형에게는 지도의 위쪽이 왼쪽, 아래쪽이 오른쪽이에요.',
        fig: MAP,
        check: {
          type: 'choice',
          q: '지도를 보고 답하세요.\n\nGo straight one block and turn right. It\'s on your right.\n\n도착하는 곳은 어디일까요?',
          fig: MAP,
          choices: ['Bank', 'Library', 'Bakery'],
          answer: 0,
          why: ['', 'Library는 오른쪽으로 돈 뒤 왼쪽(지도의 위쪽)에 있어요.', 'Bakery는 왼쪽으로 돌아야 나와요.'],
          explain: '한 블록 위로 가서 오른쪽으로 돌면 지도의 오른쪽으로 걸어요. 이때 내 오른쪽은 지도의 아래쪽이므로 **은행(Bank)**이에요.',
        },
      },
    ],

    examples: [
      {
        q: '지도를 보고 출발점에서 Library(도서관)까지 가는 길을 영어로 안내해 보세요.',
        fig: MAP,
        steps: [
          '출발점에서 위로 가면 첫째 가로 길이 나와요. 한 블록 곧장 가니 Go straight one block.',
          'Library는 큰길의 오른쪽 편에 있으니 오른쪽으로 돌아요: and turn right.',
          '오른쪽으로 돌면 지도의 오른쪽을 향해 걸어요. 이때 지도의 위쪽이 내 왼쪽이에요.',
          'Library는 길의 위쪽에 있으니 내 왼쪽이에요: It\'s on your left.',
        ],
        answer: "Go straight one block and turn right. It's on your left.",
      },
      {
        q: '친구가 How can I get to the museum?이라고 물었어요. 박물관이 멀어서 5번 버스를 타라고 안내하려고 해요. 두 가지 방법으로 말해 보세요.',
        steps: [
          '탈것을 타라고 할 때는 take를 써요: Take bus number 5.',
          'by + 탈것으로 말할 수도 있어요. by 다음에는 a, the 없이 탈것 낱말만 써요: You can go there by bus.',
        ],
        answer: 'Take bus number 5. / You can go there by bus.',
      },
    ],

    terms: [
      { term: 'block(블록)', def: '길과 길 사이의 한 구역이에요. Go straight two blocks.는 가로 길을 두 번 만나는 곳까지 곧장 가라는 뜻이에요.' },
      { term: 'go straight', def: '"곧장(똑바로) 가다"라는 뜻이에요. 예: Go straight.(곧장 가세요.)' },
      { term: 'turn left / turn right', def: '"왼쪽으로 돌다 / 오른쪽으로 돌다"라는 뜻이에요. 걸어가는 사람을 기준으로 정해요.' },
      { term: 'on your left / on your right', def: '"당신의 왼쪽에 / 오른쪽에"라는 뜻이에요. 도착한 건물이 있는 쪽을 알려 줘요. 예: It\'s on your right.' },
      { term: 'by + 탈것', def: '"~으로, ~을 타고"라는 뜻이에요. by 다음에는 a나 the를 쓰지 않아요. 예: by bus, by subway' },
      { term: 'get to', def: '"~에 도착하다, 가다"라는 뜻이에요. 예: How can I get to the bank?(은행에 어떻게 가나요?)' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '도서관에 가는 길을 물을 때 알맞은 말은 무엇일까요?',
        choices: ['How can I get to the library?', "What's wrong?", 'When is your birthday?', 'What grade are you in?'],
        answer: 0,
        why: ['', '어디가 아픈지 묻는 말이에요.', '생일이 언제인지 묻는 말이에요.', '몇 학년인지 묻는 말이에요.'],
        explain: '가는 길은 **How can I get to** + 장소?로 물어요. How can I get to the library?는 "도서관에 어떻게 가나요?"예요.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1,
        q: 'Turn right.의 뜻으로 알맞은 것은 무엇일까요?',
        choices: ['오른쪽으로 도세요.', '왼쪽으로 도세요.', '곧장 가세요.', '그곳은 오른쪽에 있어요.'],
        answer: 0,
        why: ['', '왼쪽으로 도세요.는 Turn left.예요. right는 오른쪽이에요.', '곧장 가세요.는 Go straight.예요.', '그곳은 오른쪽에 있어요.는 It\'s on your right.예요. turn은 "돌다"예요.'],
        explain: 'turn은 "돌다", right는 "오른쪽"이에요. Turn right.는 **오른쪽으로 도세요.**예요.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'text', concept: 1,
        q: '빈칸에 알맞은 낱말을 쓰세요.\n\nGo [[빈칸]]. (곧장 가세요.)',
        answer: ['straight'],
        wrong: [
          { a: 'street', why: 'street는 "거리"라는 뜻이에요. "곧장"은 straight예요.' },
          { a: 'stright', why: '철자를 확인해 보세요. s-t-r-a-i-g-h-t예요.' },
        ],
        explain: '"곧장 가세요."는 **Go straight.**예요. straight는 철자가 길어서 s-t-r-a-i-g-h-t를 하나씩 확인해요.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: 'It\'s on your left.는 "그곳은 당신의 왼쪽에 있어요."라는 뜻이에요.',
        answer: true,
        explain: 'on your left는 "당신의 왼쪽에"라는 뜻이에요. 도착한 건물이 있는 쪽을 알려 주는 말이에요.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 3,
        q: '"7번 버스를 타세요."를 영어로 바르게 말한 것은 무엇일까요?',
        choices: ['Take bus number 7.', 'Take the subway.', 'Go straight seven blocks.', 'Turn right at the bus.'],
        answer: 0,
        why: ['', '지하철을 타라는 말이에요.', '일곱 블록 곧장 가라는 말이에요.', '버스에서 오른쪽으로 돌라는 이상한 말이 돼요.'],
        explain: '탈것을 탈 때는 take를 써요. 7번 버스는 bus number 7이므로 **Take bus number 7.**이에요.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: 'by subway의 뜻으로 알맞은 것은 무엇일까요?',
        choices: ['지하철로', '버스로', '자전거로', '걸어서'],
        answer: 0,
        why: ['', '버스로는 by bus예요.', '자전거로는 by bike예요.', 'subway는 탈것인 지하철이에요.'],
        explain: 'subway는 지하철이에요. by subway는 **지하철로**, 곧 지하철을 타고 간다는 뜻이에요.',
      },
      {
        id: 'p7', level: 1, type: 'order', concept: 0,
        q: '우리말 뜻에 맞게 낱말을 순서대로 놓으세요.\n\n"은행에 어떻게 가나요?"',
        choices: ['How', 'can', 'I', 'get', 'to', 'the bank?'],
        answer: [0, 1, 2, 3, 4, 5],
        explain: '가는 방법을 묻는 How로 시작하고, can I get to 다음에 장소를 넣어요. **How can I get to the bank?**',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 4,
        q: '지도를 보고 답하세요.\n\nGo straight two blocks and turn left. It\'s on your left.\n\n도착하는 곳은 어디일까요?',
        fig: MAP,
        choices: ['Museum', 'School', 'Hospital', 'Bakery'],
        answer: 0,
        why: ['', 'School은 왼쪽으로 돈 뒤 오른쪽(지도의 위쪽)에 있어요. on your left를 다시 보세요.', 'Hospital은 오른쪽으로 돌아야 나와요.', 'Bakery는 한 블록만 가서 돌아야 나와요. 두 블록을 가요.'],
        hint: '왼쪽으로 돌면 지도의 왼쪽으로 걸어요. 이때 내 왼쪽은 지도의 아래쪽이에요.',
        explain: '두 블록 위로 가서(둘째 가로 길) 왼쪽으로 돌면 지도의 왼쪽으로 걸어요. 이때 내 왼쪽은 지도의 아래쪽이므로 **박물관(Museum)**이에요.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 4,
        q: '지도를 보고 답하세요.\n\nGo straight two blocks and turn right. It\'s on your left.\n\n도착하는 곳은 어디일까요?',
        fig: MAP,
        choices: ['Park', 'Hospital', 'Library', 'School'],
        answer: 0,
        why: ['', 'Hospital은 오른쪽으로 돈 뒤 오른쪽(지도의 아래쪽)에 있어요. on your left를 다시 보세요.', 'Library는 한 블록만 가서 돌아야 나와요.', 'School은 왼쪽으로 돌아야 나와요.'],
        hint: '오른쪽으로 돌면 지도의 오른쪽으로 걸어요. 이때 내 왼쪽은 지도의 위쪽이에요.',
        explain: '두 블록 위로 가서 오른쪽으로 돌면 지도의 오른쪽으로 걸어요. 이때 내 왼쪽은 지도의 위쪽이므로 **공원(Park)**이에요.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'text', concept: 2,
        q: '빈칸에 알맞은 낱말을 영어로 쓰세요. (숫자 말고 낱말로)\n\nA: How can I get to the zoo?\nB: Go straight [[빈칸]] blocks and turn right. (두 블록 곧장 가서 오른쪽으로 도세요.)',
        answer: ['two'],
        hint: '블록 수는 개수를 나타내는 말로 써요.',
        wrong: [
          { a: 'second', why: '순서를 나타내는 말이에요. 블록 수는 two처럼 개수를 나타내는 말로 써요.' },
          { a: 'to', why: '소리가 같은 다른 낱말이에요. 숫자 2는 t-w-o로 써요.' },
        ],
        explain: '"두 블록"은 **two blocks**예요. 블록 수는 one, two처럼 개수를 나타내는 말로 쓰고, 둘 이상이면 blocks처럼 s를 붙여요.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 1,
        q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: Excuse me. Where is the post office?\nB: [[빈칸]]\nA: Thank you.',
        choices: ["Go straight and turn left. It's on your right.", "I'm in the sixth grade.", "That's too bad.", 'Take care of yourself.'],
        answer: 0,
        why: ['', '몇 학년인지 묻는 말에 하는 대답이에요.', '안 좋은 소식을 들었을 때 하는 말이에요.', '길을 알려 주는 말이 아니에요. A는 우체국이 어디인지 물었어요.'],
        hint: 'A는 우체국이 어디에 있는지 묻고 있어요.',
        explain: 'Where is the post office?는 우체국의 위치를 묻는 말이므로 길을 안내하는 **Go straight and turn left. It\'s on your right.**가 알맞아요.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 3,
        q: '대화를 읽고 물음에 답하세요.\n\nJia: How can I get to the museum?\nMinsu: It\'s far from here. You can go there by subway.\nJia: Where is the subway station?\nMinsu: Go straight one block. It\'s on your right.\n\n지아는 박물관에 무엇을 타고 갈 수 있나요?',
        choices: ['지하철', '버스', '자전거', '택시'],
        answer: 0,
        why: ['', 'bus라는 말은 나오지 않아요. 민수가 말한 by 다음 낱말을 보세요.', 'bike라는 말은 나오지 않아요.', 'taxi라는 말은 나오지 않아요.'],
        hint: 'by 다음에 오는 탈것 낱말을 찾아보세요.',
        explain: '민수가 You can go there by subway.라고 했어요. by subway는 "지하철로"이므로 지아는 지하철을 타고 갈 수 있어요.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 4,
        q: '지도를 보고 답하세요. 출발점에서 Hospital(병원)으로 가는 안내로 알맞은 것은 무엇일까요?',
        fig: MAP,
        choices: [
          "Go straight two blocks and turn right. It's on your right.",
          "Go straight two blocks and turn left. It's on your right.",
          "Go straight one block and turn right. It's on your right.",
          "Go straight two blocks and turn right. It's on your left.",
        ],
        answer: 0,
        why: ['', '그 안내대로 가면 학교(School)에 도착해요. 병원은 큰길의 오른쪽 편에 있어요.', '그 안내대로 가면 은행(Bank)에 도착해요. 병원은 둘째 가로 길에 있어요.', '그 안내대로 가면 공원(Park)에 도착해요. 병원은 길의 아래쪽, 곧 내 오른쪽에 있어요.'],
        hint: '병원이 몇째 가로 길에 있는지, 큰길의 어느 편에 있는지, 길의 위·아래 중 어디에 있는지 차례로 보세요.',
        explain: '병원은 둘째 가로 길(two blocks)에서 큰길의 오른쪽 편에 있으니 오른쪽으로 돌아요(turn right). 오른쪽으로 돌면 지도의 아래쪽이 내 오른쪽인데, 병원은 길의 아래쪽에 있으므로 It\'s on your right.예요.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 1,
        q: '지도를 보고 답하세요. 서준이가 Go straight one block and turn right.를 따라 걸어가고 있어요. 이때 Library(도서관)는 서준이의 어느 쪽에 있을까요?',
        fig: MAP,
        choices: ["It's on your left.", "It's on your right.", "It's behind you."],
        answer: 0,
        why: ['', '지도에서 도서관이 오른쪽에 그려져 있어도, 오른쪽으로 돈 서준이에게 도서관은 왼쪽이에요. 걷는 방향을 기준으로 보세요.', '도서관은 서준이가 걸어가는 길가에 있어요. 뒤쪽이 아니에요.'],
        hint: '오른쪽으로 돌면 지도의 오른쪽을 바라보고 걸어요. 이때 지도의 위쪽은 내 어느 쪽일까요?',
        explain: '오른쪽으로 돈 서준이는 지도의 오른쪽을 바라보고 걸어요. 이때 지도의 위쪽이 서준이의 왼쪽이에요. 도서관은 길의 위쪽에 있으므로 **It\'s on your left.**예요.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'text', concept: 2,
        q: '지도를 보고 출발점에서 Bakery(빵집)로 가는 안내를 완성하세요. 빈칸에 알맞은 낱말 하나를 쓰세요.\n\nGo straight one block and turn [[빈칸]]. It\'s on your left.',
        fig: MAP,
        answer: ['left'],
        hint: '빵집은 큰길의 어느 편에 있나요?',
        wrong: [{ a: 'right', why: '빵집은 큰길의 왼쪽 편에 있어요. 오른쪽으로 돌면 은행(Bank)이나 도서관(Library)이 나와요.' }],
        explain: '빵집은 첫째 가로 길에서 큰길의 왼쪽 편에 있으니 **left**로 돌아요. 왼쪽으로 돌면 지도의 아래쪽이 내 왼쪽이고, 빵집이 길의 아래쪽에 있으니 It\'s on your left.와도 맞아요.',
      },
      {
        id: 'a4', level: 3, type: 'order', concept: 3,
        q: '글을 읽고 하윤이가 한 일을 순서대로 놓으세요.\n\nHayun takes bus number 5 at the bus stop. She gets off at the park. Then she goes straight one block and turns left. The library is on her right. She reads books there.\n\n(get off: 내리다)',
        choices: ['5번 버스를 타요.', '공원에서 내려요.', '한 블록 곧장 가요.', '왼쪽으로 돌아요.', '도서관에서 책을 읽어요.'],
        answer: [0, 1, 2, 3, 4],
        hint: 'Then(그다음에)이 나오는 곳을 기준으로 앞뒤를 나누어 보세요.',
        explain: '하윤이는 5번 버스를 타고(takes bus number 5), 공원에서 내려요(gets off at the park). 그다음 한 블록 곧장 가서(goes straight one block) 왼쪽으로 돌고(turns left), 도착한 도서관에서 책을 읽어요(reads books there).',
      },
    ],

    deeper: [
      {
        title: '블록으로 길을 말하는 까닭',
        body: '길이 바둑판처럼 반듯하게 나 있는 도시에서는 가로 길과 세로 길이 일정한 간격으로 만나요. 그래서 "두 블록 가서 오른쪽"처럼 블록 수로 길을 알려 주면 누구나 쉽게 찾아갈 수 있어요.\n\n길이 구불구불한 곳에서는 블록 대신 눈에 띄는 건물을 기준으로 안내하기도 해요. 예: Turn left at the bank.(은행에서 왼쪽으로 도세요.) 5학년에서 배운 next to, across from 같은 말을 함께 쓰면 더 정확하게 안내할 수 있어요.\n\n- The post office is next to the bank.\n- The bakery is across from the school.',
      },
    ],

    faq: [
      {
        q: 'Turn right랑 It\'s on your right는 뭐가 달라요?',
        a: 'Turn right.는 "오른쪽으로 몸을 돌려 가라"는 움직임이고, It\'s on your right.는 "도착했을 때 그 건물이 오른쪽에 있다"는 위치예요. 그래서 Turn left. It\'s on your right.처럼 둘이 다르게 나올 수도 있어요.',
      },
      {
        q: '지도에서 왼쪽, 오른쪽이 자꾸 헷갈려요.',
        a: '지도 위의 왼쪽·오른쪽이 아니라 걸어가는 사람의 왼쪽·오른쪽을 봐야 해요. 돌 때마다 내가 걷는 방향이 위로 오도록 지도를 돌려 보세요. 그러면 지도의 왼쪽이 곧 내 왼쪽이 돼요.',
      },
      {
        q: 'by bus라고 할 때 왜 a나 the를 안 붙여요?',
        a: '"버스라는 방법으로"라는 뜻이라서 by 다음에는 탈것 낱말만 써요. by bus, by subway, by bike처럼 외워 두세요. 하지만 take를 쓸 때는 Take the subway.처럼 the를 붙이기도 해요.',
      },
    ],

    mistakes: [
      '지도의 왼쪽·오른쪽으로 It\'s on your left/right를 정하는 실수 — 걸어가는 사람이 바라보는 방향을 기준으로 정해요.',
      'Go straight two block.처럼 s를 빠뜨리는 실수 — 두 블록 이상이면 two blocks처럼 s를 붙여요.',
      'by a bus, by the subway처럼 a나 the를 넣는 실수 — by 다음에는 by bus, by subway처럼 탈것 낱말만 써요.',
    ],

    gens: [
      {
        id: 'direction-phrase',
        level: 1,
        title: '길 안내 말의 뜻',
        make: function (R) {
          var LIST = [
            ['곧장 가세요.', 'Go straight.'],
            ['왼쪽으로 도세요.', 'Turn left.'],
            ['오른쪽으로 도세요.', 'Turn right.'],
            ['그곳은 당신의 왼쪽에 있어요.', "It's on your left."],
            ['그곳은 당신의 오른쪽에 있어요.', "It's on your right."],
            ['7번 버스를 타세요.', 'Take bus number 7.'],
            ['거기에는 지하철로 갈 수 있어요.', 'You can go there by subway.'],
            ['두 블록 곧장 가세요.', 'Go straight two blocks.'],
          ];
          var t = R.pick(LIST);
          var koOf = {};
          LIST.forEach(function (x) { koOf[x[1]] = x[0]; });
          var others = R.shuffle(LIST.filter(function (x) { return x !== t; }).map(function (x) { return x[1]; }));
          var c = R.choices(t[1], others);
          return {
            type: 'choice', concept: /subway|bus/.test(t[1]) ? 3 : (/blocks/.test(t[1]) ? 2 : 1),
            q: '우리말 뜻에 맞는 영어 문장을 고르세요.\n\n"' + t[0] + '"',
            choices: c.choices,
            answer: c.answer,
            why: c.choices.map(function (s) { return s === t[1] ? '' : '그 문장은 "' + koOf[s] + '"라는 뜻이에요.'; }),
            explain: '"' + t[0] + '"는 영어로 **' + t[1] + '** turn은 "돌다", on your ~는 "당신의 ~쪽에", by는 "~으로(타고)"라는 뜻이에요.',
          };
        },
      },
      {
        id: 'map-find-place',
        level: 2,
        title: '지도에서 안내를 따라 장소 찾기',
        make: function (R) {
          var b = R.int(1, 2);
          var t = R.pick(['left', 'right']);
          var s = R.pick(['left', 'right']);
          var ans = placeOf(b, t, s);
          var cands = [
            [placeOf(b, t, other(s)), '도는 방향과 블록 수는 맞았지만 왼쪽·오른쪽을 반대로 봤어요. 돈 뒤 걸어가는 방향을 기준으로 보세요.'],
            [placeOf(b, other(t), s), '반대 방향으로 돌았어요. Turn ' + t + '를 다시 보세요.'],
            [placeOf(3 - b, t, s), '블록 수를 잘못 셌어요. 가로 길을 몇 번 만나는지 세어 보세요.'],
            [placeOf(3 - b, other(t), other(s)), '블록 수와 도는 방향을 다시 확인해 보세요.'],
          ];
          var reason = {};
          cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
          var pick = R.choices(ans, cands.map(function (c) { return c[0]; }));
          var up = (t === 'right') === (s === 'left');
          return {
            type: 'choice', concept: 4, fig: MAP,
            q: '지도를 보고 답하세요.\n\n' + say(b, t, s) + '\n\n도착하는 곳은 어디일까요?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === ans ? '' : reason[c] || ''; }),
            explain: (b === 1 ? '첫째' : '둘째') + ' 가로 길까지 위로 가서 ' + (t === 'left' ? '왼쪽' : '오른쪽') + '으로 돌아요. 이때 내 ' + (s === 'left' ? '왼쪽' : '오른쪽') + '은 지도의 ' + (up ? '위쪽' : '아래쪽') + '이에요. 그래서 도착하는 곳은 ' + ans + ', 곧 ' + KO[ans] + R.josa(KO[ans], '이에요/예요') + '.',
          };
        },
      },
      {
        id: 'map-give-directions',
        level: 3,
        title: '지도를 보고 알맞은 안내 고르기',
        make: function (R) {
          var p = R.pick(PLACES);
          var b = p[0], t = p[1], s = p[2], name = p[3];
          var correct = say(b, t, s);
          var alts = [[b, t, other(s)], [b, other(t), s], [3 - b, t, s], [3 - b, other(t), s]];
          var reason = {};
          var wrongs = alts.map(function (a) {
            var txt = say(a[0], a[1], a[2]);
            var to = placeOf(a[0], a[1], a[2]);
            reason[txt] = '그 안내대로 가면 ' + KO[to] + '(' + to + ')에 도착해요.';
            return txt;
          });
          var pick = R.choices(correct, wrongs);
          var up = (t === 'right') === (s === 'left');
          return {
            type: 'choice', concept: 4, fig: MAP,
            q: '지도를 보고 답하세요. 출발점에서 ' + KO[name] + R.josa(KO[name], '으로/로') + ' 가는 안내로 알맞은 것은 무엇일까요? (' + name + ')',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: KO[name] + R.josa(KO[name], '은/는') + ' ' + (b === 1 ? '첫째' : '둘째') + ' 가로 길에서 큰길의 ' + (t === 'left' ? '왼쪽' : '오른쪽') + ' 편, 길의 ' + (up ? '위쪽' : '아래쪽') + '에 있어요. ' + (t === 'left' ? '왼쪽' : '오른쪽') + '으로 돌면 길의 ' + (up ? '위쪽' : '아래쪽') + '이 내 ' + (s === 'left' ? '왼쪽' : '오른쪽') + '이에요. 그래서 **' + correct + '**',
          };
        },
      },
    ],

    vocab: [
      { w: 'straight', m: '곧장, 똑바로', ex: 'Go straight two blocks.', exm: '두 블록 곧장 가세요.' },
      { w: 'turn', m: '돌다', ex: 'Turn left at the corner.', exm: '모퉁이에서 왼쪽으로 도세요.' },
      { w: 'left', m: '왼쪽', ex: "The bank is on your left.", exm: '은행은 당신의 왼쪽에 있어요.' },
      { w: 'right', m: '오른쪽', ex: 'Turn right and go straight.', exm: '오른쪽으로 돌아서 곧장 가세요.' },
      { w: 'block', m: '블록(길과 길 사이의 한 구역)', ex: 'The park is two blocks from here.', exm: '공원은 여기서 두 블록 떨어져 있어요.' },
      { w: 'corner', m: '모퉁이', ex: 'There is a bakery on the corner.', exm: '모퉁이에 빵집이 있어요.' },
      { w: 'get to', m: '~에 도착하다, 가다', ex: 'How can I get to the museum?', exm: '박물관에 어떻게 가나요?' },
      { w: 'take', m: '(탈것을) 타다', ex: 'Take bus number 3.', exm: '3번 버스를 타세요.' },
      { w: 'subway', m: '지하철', ex: 'I go to the museum by subway.', exm: '나는 지하철로 박물관에 가요.' },
      { w: 'station', m: '역', ex: 'The subway station is next to the park.', exm: '지하철역은 공원 옆에 있어요.' },
      { w: 'bus stop', m: '버스 정류장', ex: 'Wait at the bus stop.', exm: '버스 정류장에서 기다리세요.' },
      { w: 'museum', m: '박물관', ex: 'We saw old pots at the museum.', exm: '우리는 박물관에서 옛날 그릇을 봤어요.' },
      { w: 'post office', m: '우체국', ex: 'Where is the post office?', exm: '우체국은 어디에 있나요?' },
      { w: 'far', m: '먼', ex: "The zoo is far from here.", exm: '동물원은 여기서 멀어요.' },
      { w: 'map', m: '지도', ex: 'Look at the map.', exm: '지도를 보세요.' },
      { w: 'excuse me', m: '실례합니다', ex: 'Excuse me. Where is the library?', exm: '실례합니다. 도서관은 어디에 있나요?' },
    ],
  });
})();
