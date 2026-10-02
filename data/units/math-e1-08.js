/* 1학년 수학 · 모양과 시각
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 1학년은 도형 이름(사각형·삼각형·원)을 쓰지 않고 □, △, ○ 모양이라고 한다(이름은 2학년).
 * 시각은 "몇 시"와 "몇 시 30분"까지만. 그림: 모양은 아래 도우미가 직접 그린 svg, 시계는 clock 그림 */
(function () {
  var FILLS = ['var(--fig-1)', 'var(--fig-2)', 'var(--fig-3)', 'var(--fig-4)'];
  var KIND = ['□', '△', '○'];

  function st(fill) {
    return ' fill="' + fill + '" fill-opacity="0.5" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"';
  }
  function pts(arr) { return arr.map(function (p) { return p[0] + ',' + p[1]; }).join(' '); }
  // 모양 하나: kind '□' | '△' | '○', v = 0~2 (크기·꼴을 조금씩 다르게)
  function shp(kind, cx, cy, v, fill) {
    if (kind === '□') {
      var wh = [[40, 40], [52, 30], [30, 48]][v % 3];
      return '<rect x="' + (cx - wh[0] / 2) + '" y="' + (cy - wh[1] / 2) + '" width="' + wh[0] + '" height="' + wh[1] + '"' + st(fill) + '/>';
    }
    if (kind === '△') {
      var t = [
        [[cx - 24, cy + 20], [cx, cy - 24], [cx + 24, cy + 20]],
        [[cx - 22, cy + 20], [cx - 22, cy - 22], [cx + 22, cy + 20]],
        [[cx - 28, cy + 16], [cx + 6, cy - 20], [cx + 28, cy + 16]],
      ][v % 3];
      return '<polygon points="' + pts(t) + '"' + st(fill) + '/>';
    }
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + [22, 16, 26][v % 3] + '"' + st(fill) + '/>';
  }
  // 여러 모양을 4칸씩 줄지어: items = [[kind, v], …]
  function scatter(items, alt) {
    var rows = Math.ceil(items.length / 4), body = '';
    items.forEach(function (it, i) {
      body += shp(it[0], 40 + (i % 4) * 70, 40 + Math.floor(i / 4) * 70, it[1], FILLS[(i * 3 + Math.floor(i / 4)) % 4]);
    });
    return { type: 'svg', svg: '<svg viewBox="0 0 290 ' + (rows * 70 + 10) + '">' + body + '</svg>', alt: alt };
  }
  // □ 5개, △ 1개, ○ 2개로 꾸민 집과 나무와 해
  var HOUSE = {
    type: 'svg',
    alt: '모양으로 꾸민 그림: 집, 나무, 해',
    svg: '<svg viewBox="0 0 260 190">' +
      '<rect x="30" y="80" width="130" height="95"' + st(FILLS[0]) + '/>' +
      '<polygon points="20,80 95,25 170,80"' + st(FILLS[1]) + '/>' +
      '<rect x="80" y="125" width="30" height="50"' + st(FILLS[2]) + '/>' +
      '<rect x="44" y="98" width="24" height="24"' + st(FILLS[3]) + '/>' +
      '<rect x="122" y="98" width="24" height="24"' + st(FILLS[3]) + '/>' +
      '<circle cx="225" cy="32" r="18"' + st(FILLS[2]) + '/>' +
      '<circle cx="220" cy="108" r="26"' + st(FILLS[1]) + '/>' +
      '<rect x="213" y="134" width="14" height="41"' + st(FILLS[0]) + '/>' +
      '</svg>',
  };
  // □ 모양 종이와 점선 (diag: 1 = 대각선 하나, 2 = 대각선 둘)
  function cutSquare(diag, alt) {
    var s = '<rect x="20" y="20" width="120" height="120" fill="var(--fig-1)" fill-opacity="0.25" stroke="currentColor" stroke-width="2.5"/>';
    var dash = ' stroke="currentColor" stroke-width="2" stroke-dasharray="6 5"';
    s += '<line x1="20" y1="20" x2="140" y2="140"' + dash + '/>';
    if (diag === 2) s += '<line x1="140" y1="20" x2="20" y2="140"' + dash + '/>';
    return { type: 'svg', svg: '<svg viewBox="0 0 160 160">' + s + '</svg>', alt: alt };
  }
  function hourName(h) { return h + '시'; }
  function nextH(h) { return h === 12 ? 1 : h + 1; }
  function prevH(h) { return h === 1 ? 12 : h - 1; }

Tutor.registerUnit({
  id: 'math-e1-08',
  course: 'math-e1',
  title: '모양과 시각',
  summary: '□, △, ○ 모양을 찾아 특징을 알고 꾸며 보며, 시계를 보고 몇 시와 몇 시 30분을 읽어요.',
  goals: [
    '주변에서 □, △, ○ 모양을 찾을 수 있어요.',
    '□, △, ○ 모양의 특징을 말할 수 있어요.',
    '□, △, ○ 모양으로 여러 가지 모양을 꾸밀 수 있어요.',
    '시계를 보고 몇 시와 몇 시 30분을 읽고 나타낼 수 있어요.',
  ],
  standards: ['[2수03-03]', '[2수03-07]'],

  concepts: [
    {
      title: '□, △, ○ 모양 찾기',
      body: '우리 주변에는 여러 가지 모양이 있어요.\n\n| 모양 | 이런 물건에 있어요 |\n|---|---|\n| □ 모양 | 공책, 액자, 수첩 |\n| △ 모양 | 삼각자, 삼각김밥 |\n| ○ 모양 | 동전, 단추, 접시 |\n\n크기가 달라도, 길쭉해도 같은 모양이에요. 긴 네모도 □ 모양이에요.\n\n> 💡 물건을 종이에 대고 테두리를 따라 그려 보면 모양이 잘 보여요.',
      easy: '손가락으로 물건의 테두리를 따라가 봐요.\n\n공책은 반듯한 선을 따라가다 네 번 꺾여요. □ 모양이에요.\n\n삼각자는 세 번 꺾여요. △ 모양이에요.\n\n동전은 꺾이지 않고 빙글 돌아요. ○ 모양이에요.',
      fig: scatter([['□', 0], ['△', 0], ['○', 0], ['□', 1], ['○', 1], ['△', 1], ['□', 2], ['△', 2]], '여러 가지 □, △, ○ 모양'),
      check: {
        type: 'choice',
        q: '동전은 어떤 모양일까요?',
        choices: ['○ 모양', '□ 모양', '△ 모양'],
        answer: 0,
        why: ['', '동전에는 뾰족한 곳이 없어요. 테두리가 둥글어요.', '동전에는 뾰족한 곳이 없어요. 테두리가 둥글어요.'],
        explain: '동전은 테두리가 둥글고 뾰족한 곳이 없어요. ○ 모양이에요.',
      },
    },
    {
      title: '□, △, ○ 모양의 특징',
      body: '세 모양은 이렇게 달라요.\n\n| 모양 | 뾰족한 곳 | 곧은 선 | 둥근 부분 |\n|---|---|---|---|\n| □ | 4군데 | 있어요 | 없어요 |\n| △ | 3군데 | 있어요 | 없어요 |\n| ○ | 없어요 | 없어요 | 있어요 |\n\n□ 모양과 △ 모양은 **곧은 선**으로 되어 있어요.\n\n○ 모양은 **둥근 부분**만 있어요.\n\n> 💡 뾰족한 곳을 세면 □ 모양과 △ 모양을 구별할 수 있어요.',
      easy: '모양을 손바닥으로 굴려 본다고 생각해 봐요.\n\n○ 모양은 둥글어서 데굴데굴 잘 굴러가요.\n\n□ 모양과 △ 모양은 뾰족한 곳에 걸려서 잘 구르지 않아요.\n\n뾰족한 곳을 손가락으로 짚어 세어 봐요. □는 4번, △는 3번 짚어요.',
      fig: scatter([['□', 0], ['△', 0], ['○', 0]], '□ 모양, △ 모양, ○ 모양 하나씩'),
      check: {
        type: 'ox',
        q: '○ 모양에는 뾰족한 곳이 있어요.',
        answer: false,
        explain: '○ 모양은 둥근 부분만 있어서 뾰족한 곳이 없어요.',
      },
    },
    {
      title: '모양으로 꾸미기',
      body: '□, △, ○ 모양을 여러 개 모아 그림을 꾸밀 수 있어요.\n\n그림의 집은 이렇게 꾸몄어요.\n\n- 지붕은 △ 모양\n- 벽, 문, 창문은 □ 모양\n- 해는 ○ 모양\n\n어떤 모양을 몇 개 썼는지 셀 때는 한 가지 모양씩 세어요.\n\n> 💡 센 모양에 ✓ 표시를 하면 두 번 세지 않아요.',
      easy: '블록 놀이를 떠올려 봐요. 네모 블록을 쌓아 벽을 만들고, 세모 블록을 올리면 지붕이 돼요.\n\n동그란 블록은 해나 바퀴가 돼요.\n\n다 만든 뒤에 네모 블록만 골라서 세고, 그다음 세모 블록을 세요.',
      fig: HOUSE,
      check: {
        type: 'short', check: 'number', unit: '개',
        q: '그림에서 ○ 모양은 몇 개일까요?',
        fig: HOUSE,
        answer: '2',
        wrong: [{ a: '1', why: '해만 셌어요. 나무의 둥근 잎 부분도 ○ 모양이에요.' }],
        explain: '해와 나무의 잎 부분이 ○ 모양이에요. 모두 2개예요.',
      },
    },
    {
      title: '몇 시 읽기',
      body: '시계에는 **짧은바늘**과 **긴바늘**이 있어요.\n\n**긴바늘이 12**를 가리키고, **짧은바늘이 3**을 가리키면 **3시**예요. "세 시"라고 읽어요.\n\n짧은바늘이 가리키는 수가 몇 시인지 알려 줘요.\n\n몇 시를 시계에 그릴 때는 긴바늘을 12에, 짧은바늘을 그 수에 그려요.\n\n> ⚠️ 긴바늘이 가리키는 12를 보고 "12시"라고 읽지 않아요.',
      easy: '짧은바늘은 "몇 시" 담당이에요. 긴바늘은 "분" 담당이에요.\n\n긴바늘이 맨 꼭대기 12에 똑바로 서 있으면 "딱 몇 시"예요.\n\n그때 짧은바늘이 가리키는 수를 읽으면 돼요.',
      fig: { type: 'clock', h: 3, m: 0, alt: '짧은바늘이 3, 긴바늘이 12를 가리키는 시계' },
      check: {
        type: 'choice',
        q: '시계가 나타내는 시각은 몇 시일까요?',
        fig: { type: 'clock', h: 8, m: 0, alt: '짧은바늘과 긴바늘이 있는 시계' },
        choices: ['8시', '12시', '9시'],
        answer: 0,
        why: ['', '긴바늘이 가리키는 12를 읽었어요. 몇 시는 짧은바늘을 읽어요.', '짧은바늘이 가리키는 수를 다시 봐요. 9가 아니에요.'],
        explain: '긴바늘이 12를, 짧은바늘이 8을 가리켜요. 8시예요.',
      },
    },
    {
      title: '몇 시 30분 읽기',
      body: '**긴바늘이 6**을 가리키면 "몇 시 30분"이에요.\n\n이때 짧은바늘은 두 수의 **가운데**에 있어요.\n\n그림은 짧은바늘이 4와 5 사이에 있어요. 긴바늘은 6을 가리켜요. 이 시각은 **4시 30분**이에요. "네 시 삼십 분"이라고 읽어요.\n\n> ⚠️ 짧은바늘이 4와 5 사이에 있으면 **앞의 수** 4를 읽어요. 5시가 아니에요.\n\n4시 30분을 그릴 때는 긴바늘을 6에, 짧은바늘을 4와 5 사이 가운데에 그려요.',
      easy: '짧은바늘은 아주 천천히 움직여요. 4시에는 4를 가리켜요.\n\n4시에서 조금씩 걸어가서 5를 향해 가요. 아직 5에 닿지 않았으면 여전히 "4시 몇 분"이에요.\n\n가운데까지 왔을 때가 4시 30분이에요.',
      fig: { type: 'clock', h: 4, m: 30, alt: '짧은바늘이 4와 5 사이, 긴바늘이 6을 가리키는 시계' },
      check: {
        type: 'choice',
        q: '시계가 나타내는 시각은 무엇일까요?',
        fig: { type: 'clock', h: 10, m: 30, alt: '짧은바늘과 긴바늘이 있는 시계' },
        choices: ['10시 30분', '11시 30분', '6시 30분'],
        answer: 0,
        why: ['', '짧은바늘이 10과 11 사이에 있으면 앞의 수 10을 읽어요.', '긴바늘이 가리키는 6을 시로 읽었어요. 몇 시는 짧은바늘을 봐요.'],
        explain: '긴바늘이 6을 가리키니 30분이에요. 짧은바늘이 10과 11 사이에 있으니 10시 30분이에요.',
      },
    },
  ],

  examples: [
    {
      q: '시계가 나타내는 시각을 읽어 보세요.',
      fig: { type: 'clock', h: 7, m: 30, alt: '짧은바늘이 7과 8 사이, 긴바늘이 6을 가리키는 시계' },
      steps: [
        '긴바늘을 봐요. 6을 가리키니 "30분"이에요.',
        '짧은바늘을 봐요. 7과 8 사이에 있어요.',
        '두 수 사이에 있으면 앞의 수 7을 읽어요.',
        '그래서 7시 30분이에요.',
      ],
      answer: '7시 30분',
    },
    {
      q: '뾰족한 곳이 3군데이고, 곧은 선으로 되어 있는 모양은 무엇일까요?',
      steps: [
        '곧은 선으로 된 모양은 □ 모양과 △ 모양이에요. ○ 모양은 둥글어요.',
        '□ 모양은 뾰족한 곳이 4군데, △ 모양은 3군데예요.',
        '그래서 설명에 맞는 모양은 △ 모양이에요.',
      ],
      answer: '△ 모양',
    },
  ],

  terms: [
    { term: '□ 모양', def: '곧은 선으로 되어 있고 뾰족한 곳이 4군데인 모양이에요. 예: 공책, 액자' },
    { term: '△ 모양', def: '곧은 선으로 되어 있고 뾰족한 곳이 3군데인 모양이에요. 예: 삼각자' },
    { term: '○ 모양', def: '뾰족한 곳 없이 둥근 부분만 있는 모양이에요. 예: 동전, 단추' },
    { term: '짧은바늘', def: '시계의 짧은 바늘이에요. 몇 시인지 알려 줘요.' },
    { term: '긴바늘', def: '시계의 긴 바늘이에요. 12를 가리키면 "몇 시", 6을 가리키면 "몇 시 30분"이에요.' },
    { term: '시각', def: '시계가 알려 주는 때예요. 예: 3시, 4시 30분' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '공책은 어떤 모양일까요?',
      choices: ['□ 모양', '△ 모양', '○ 모양'],
      answer: 0,
      why: ['', '공책의 뾰족한 곳을 세어 봐요. 4군데예요.', '공책에는 뾰족한 곳이 있어요. 둥글지 않아요.'],
      explain: '공책은 곧은 선으로 되어 있고 뾰족한 곳이 4군데예요. □ 모양이에요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '뾰족한 곳이 3군데인 모양은 무엇일까요?',
      choices: ['△ 모양', '□ 모양', '○ 모양'],
      answer: 0,
      why: ['', '□ 모양은 뾰족한 곳이 4군데예요.', '○ 모양은 뾰족한 곳이 없어요.'],
      explain: '△ 모양은 뾰족한 곳이 3군데예요. □ 모양은 4군데, ○ 모양은 없어요.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 1,
      q: '□ 모양은 곧은 선으로 되어 있어요.',
      answer: true,
      explain: '□ 모양은 곧은 선 4개로 둘러싸여 있어요. 둥근 부분은 없어요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', unit: '개', concept: 2,
      q: '그림을 꾸미는 데 □ 모양을 모두 몇 개 썼을까요?',
      fig: HOUSE,
      answer: '5',
      hint: '벽, 문, 창문, 나무 기둥을 하나씩 짚어 세어요.',
      wrong: [
        { a: '4', why: '하나를 빠뜨렸어요. 나무 기둥도 □ 모양이에요.' },
        { a: '3', why: '창문 2개를 다시 세어 봐요. 나무 기둥도 □ 모양이에요.' },
      ],
      explain: '벽 1개, 문 1개, 창문 2개, 나무 기둥 1개예요. □ 모양은 모두 5개예요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '시계가 나타내는 시각은 몇 시일까요?',
      fig: { type: 'clock', h: 9, m: 0, alt: '짧은바늘과 긴바늘이 있는 시계' },
      choices: ['9시', '12시', '9시 30분', '3시'],
      answer: 0,
      why: ['', '긴바늘이 가리키는 12를 읽었어요. 몇 시는 짧은바늘을 봐요.', '긴바늘이 12를 가리키면 30분이 아니에요. 딱 몇 시예요.', '짧은바늘을 다시 봐요. 9를 가리켜요.'],
      explain: '긴바늘이 12, 짧은바늘이 9를 가리켜요. 9시예요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 4,
      q: '시계가 나타내는 시각은 무엇일까요?',
      fig: { type: 'clock', h: 2, m: 30, alt: '짧은바늘과 긴바늘이 있는 시계' },
      choices: ['2시 30분', '3시 30분', '2시', '6시 30분'],
      answer: 0,
      why: ['', '짧은바늘이 2와 3 사이에 있으면 앞의 수 2를 읽어요.', '긴바늘이 6을 가리키니 30분이에요.', '긴바늘이 가리키는 6을 시로 읽었어요.'],
      explain: '긴바늘이 6을 가리키니 30분이에요. 짧은바늘이 2와 3 사이라서 2시 30분이에요.',
    },
    {
      id: 'p7', level: 1, type: 'ox', concept: 3,
      q: '시계가 나타내는 시각은 6시예요.',
      fig: { type: 'clock', h: 6, m: 0, alt: '짧은바늘과 긴바늘이 있는 시계' },
      answer: true,
      explain: '긴바늘이 12를, 짧은바늘이 6을 가리켜요. 그래서 6시예요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 4,
      q: '8시 30분을 시계에 그리려고 해요. 짧은바늘은 어디를 가리키게 그려야 할까요?',
      choices: ['8과 9 사이 가운데', '7과 8 사이 가운데', '8', '6'],
      answer: 0,
      why: ['', '8시 30분은 8시가 지난 시각이에요. 짧은바늘은 8을 지나 9 쪽으로 가요.', '8을 가리키면 8시예요. 30분에는 8과 9 사이에 있어요.', '6은 긴바늘이 가리키는 수예요.'],
      hint: '8시 30분은 8시와 9시의 가운데예요.',
      explain: '8시 30분에 긴바늘은 6을 가리키고, 짧은바늘은 8과 9 사이 가운데를 가리켜요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '5시를 시계에 그리려고 해요. 긴바늘은 어떤 수를 가리키게 그려야 할까요?',
      choices: ['12', '5', '6'],
      answer: 0,
      why: ['', '5는 짧은바늘이 가리키는 수예요.', '긴바늘이 6을 가리키면 30분이에요.'],
      hint: '"딱 몇 시"일 때 긴바늘은 어디에 있었나요?',
      explain: '몇 시를 나타낼 때 긴바늘은 12를 가리켜요. 짧은바늘은 5를 가리켜요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: '군데', concept: 1,
      q: '□ 모양 1개와 △ 모양 1개가 있어요. 뾰족한 곳은 모두 몇 군데일까요?',
      answer: '7',
      hint: '□ 모양과 △ 모양의 뾰족한 곳을 따로 세어 더해요.',
      wrong: [
        { a: '6', why: '□ 모양의 뾰족한 곳은 4군데예요. 다시 세어 봐요.' },
        { a: '8', why: '△ 모양의 뾰족한 곳은 3군데예요. 다시 세어 봐요.' },
      ],
      explain: '□ 모양은 4군데, △ 모양은 3군데예요. $4+3=7$이라서 7군데예요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '서준이는 7시 30분에, 하윤이는 7시에 아침을 먹었어요. 누가 먼저 먹었을까요?',
      choices: ['하윤', '서준', '둘이 같은 시각에 먹었어요.'],
      answer: 0,
      why: ['', '7시 30분은 7시보다 나중이에요. 7시가 지나고 30분이 더 지났어요.', '7시와 7시 30분은 다른 시각이에요.'],
      hint: '7시와 7시 30분 중 어느 쪽이 먼저 올까요?',
      explain: '7시가 먼저 오고, 그다음 7시 30분이 와요. 그래서 7시에 먹은 하윤이가 먼저예요.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', unit: '개', concept: 0,
      q: '○ 모양은 △ 모양보다 몇 개 더 많을까요?',
      fig: scatter([['○', 0], ['△', 0], ['○', 1], ['□', 1], ['○', 2], ['△', 2], ['○', 0], ['□', 0]], '여러 가지 모양 8개'),
      answer: '2',
      hint: '○ 모양과 △ 모양을 따로 세어요.',
      wrong: [{ a: '6', why: '두 수를 더했어요. 몇 개 더 많은지는 빼요.' }, { a: '4', why: '○ 모양의 수만 셌어요. △ 모양의 수를 빼요.' }],
      explain: '○ 모양은 4개, △ 모양은 2개예요. $4-2=2$라서 2개 더 많아요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '개', concept: 2,
      q: '□ 모양 종이를 점선을 따라 모두 잘랐어요. △ 모양이 몇 개 생길까요?',
      fig: cutSquare(2, '□ 모양 종이에 꼭짓점끼리 잇는 점선 2개가 그려진 그림'),
      answer: '4',
      hint: '점선이 만나는 가운데를 중심으로 조각을 세어 봐요.',
      wrong: [{ a: '2', why: '점선 하나만 잘랐어요. 점선 2개를 모두 자르면 조각이 더 생겨요.' }],
      explain: '점선 2개가 가운데에서 만나요. 위, 아래, 왼쪽, 오른쪽에 △ 모양이 하나씩 생겨서 4개예요.',
    },
    {
      id: 'a2', level: 3, type: 'order', concept: 4,
      q: '빠른 시각부터 차례대로 놓으세요.',
      choices: ['7시', '7시 30분', '8시', '8시 30분'],
      answer: [0, 1, 2, 3],
      hint: '7시가 지나면 7시 30분, 그다음 8시가 와요.',
      explain: '7시 → 7시 30분 → 8시 → 8시 30분 차례로 와요. 짧은바늘이 7에서 8 쪽으로 움직여요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '개', concept: 2,
      q: '그림처럼 △ 모양 2개를 붙이면 □ 모양 1개가 돼요. □ 모양 3개를 만들려면 △ 모양이 몇 개 있어야 할까요?',
      fig: cutSquare(1, '△ 모양 2개를 붙여 만든 □ 모양'),
      answer: '6',
      hint: '□ 모양 하나에 △ 모양이 2개씩 들어가요. 2씩 세어 봐요.',
      wrong: [{ a: '3', why: '□ 모양 1개에 △ 모양이 2개씩 필요해요.' }, { a: '5', why: '2, 4, 6으로 2씩 세어 봐요.' }],
      explain: '□ 모양 1개에 △ 모양 2개가 들어가요. □ 모양 3개면 2, 4, 6으로 세어 6개예요.',
    },
    {
      id: 'a4', level: 3, type: 'ox', concept: 1,
      q: '○ 모양 종이를 반으로 접어 자른 한 조각에는 뾰족한 곳이 있어요.',
      answer: true,
      hint: '자른 곳은 곧은 선이 돼요. 곧은 선과 둥근 선이 만나는 곳을 봐요.',
      explain: '반으로 자르면 곧은 선이 생겨요. 곧은 선과 둥근 선이 만나는 2군데가 뾰족해요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: '지아가 시계를 봤어요. 짧은바늘이 11과 12 사이 가운데에 있어요. 지금 시각은 무엇일까요?',
      choices: ['11시 30분', '12시 30분', '11시', '12시'],
      answer: 0,
      why: ['', '두 수 사이에 있으면 앞의 수를 읽어요. 11과 12 사이는 11시 몇 분이에요.', '짧은바늘이 11을 똑바로 가리키지 않아요. 11시가 지났어요.', '아직 12에 닿지 않았어요.'],
      hint: '짧은바늘이 두 수 사이 가운데에 있으면 긴바늘은 어디에 있을까요?',
      explain: '짧은바늘이 두 수 사이 가운데에 있으면 긴바늘은 6을 가리켜요. 앞의 수 11을 읽어서 11시 30분이에요.',
    },
  ],

  deeper: [
    {
      title: '2학년에서는 모양에 이름이 생겨요',
      body: '2학년이 되면 □ 모양은 **사각형**, △ 모양은 **삼각형**, ○ 모양은 **원**이라고 불러요.\n\n곧은 선은 **변**, 뾰족한 곳은 **꼭짓점**이라고 해요.\n\n이름은 새로 배우지만, 오늘 센 뾰족한 곳의 수가 그대로 쓰여요. 삼각형의 꼭짓점은 3개, 사각형의 꼭짓점은 4개예요.',
    },
    {
      title: '짧은바늘은 왜 두 수 사이에 있을까요?',
      body: '긴바늘이 한 바퀴 도는 동안 짧은바늘은 숫자 한 칸만 움직여요.\n\n그래서 긴바늘이 반 바퀴 돌아 6에 오면, 짧은바늘은 한 칸의 반만큼, 곧 두 수의 가운데에 와요.\n\n2학년에서는 몇 시 몇 분까지 자세히 읽는 법을 배워요.',
    },
  ],

  faq: [
    {
      q: '긴 네모도 □ 모양이에요?',
      a: '네, □ 모양이에요. 곧은 선으로 되어 있고 뾰족한 곳이 4군데이면 길쭉해도 □ 모양이에요.',
    },
    {
      q: '짧은바늘이 두 수 사이에 있으면 어떤 수를 읽어요?',
      a: '앞의 수를 읽어요. 짧은바늘이 4와 5 사이에 있으면 4시가 지났지만 아직 5시가 안 된 거예요. 그래서 "4시 몇 분"이라고 읽어요.',
    },
    {
      q: '긴바늘과 짧은바늘을 어떻게 구별해요?',
      a: '길이를 견주어 봐요. 더 긴 바늘이 긴바늘이에요. 짧은바늘은 몇 시, 긴바늘은 몇 분을 알려 줘요.',
    },
  ],

  mistakes: [
    '4시 30분을 5시 30분이라고 읽는 실수 — 짧은바늘이 4와 5 사이에 있으면 앞의 수 4를 읽어요.',
    '긴바늘이 가리키는 12를 보고 12시라고 읽는 실수 — 몇 시는 짧은바늘이 알려 줘요.',
  ],

  gens: [
    {
      id: 'clock-read',
      level: 1,
      title: '시계를 보고 몇 시, 몇 시 30분 읽기',
      make: function (R) {
        var h = R.int(1, 12), half = R.bool();
        var nx = nextH(h);
        var correct = half ? hourName(h) + ' 30분' : hourName(h);
        var cands = [];
        if (half) {
          cands.push([hourName(nx) + ' 30분', '짧은바늘이 ' + h + R.josa(h, '과/와') + ' ' + nx + ' 사이에 있으면 앞의 수 ' + h + R.josa(h, '을/를') + ' 읽어요.']);
          cands.push([hourName(h), '긴바늘이 6을 가리키면 딱 몇 시가 아니라 30분이에요.']);
          if (h !== 6) cands.push(['6시 30분', '긴바늘이 가리키는 6을 시로 읽었어요. 몇 시는 짧은바늘을 봐요.']);
          cands.push([hourName(nx), '긴바늘이 12가 아니라 6을 가리켜요. 아직 ' + nx + '시가 되지 않았어요.']);
        } else {
          cands.push([hourName(h) + ' 30분', '긴바늘이 12를 가리키면 30분이 아니라 딱 몇 시예요.']);
          if (h !== 12) cands.push(['12시', '긴바늘이 가리키는 12를 읽었어요. 몇 시는 짧은바늘을 봐요.']);
          cands.push([hourName(nx), '짧은바늘이 가리키는 수를 다시 봐요. ' + h + R.josa(h, '을/를') + ' 가리켜요.']);
          cands.push([hourName(prevH(h)), '짧은바늘이 가리키는 수를 다시 봐요. ' + h + R.josa(h, '을/를') + ' 가리켜요.']);
        }
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }), R.pick([3, 4]));
        return {
          type: 'choice', concept: half ? 4 : 3,
          q: '시계가 나타내는 시각은 무엇일까요?',
          fig: { type: 'clock', h: h, m: half ? 30 : 0, alt: '짧은바늘과 긴바늘이 있는 시계' },
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: half
            ? '긴바늘이 6을 가리키니 30분이에요. 짧은바늘이 ' + h + R.josa(h, '과/와') + ' ' + nx + ' 사이에 있으니 앞의 수를 읽어 ' + correct + '이에요.'
            : '긴바늘이 12를 가리키니 딱 몇 시예요. 짧은바늘이 ' + h + R.josa(h, '을/를') + ' 가리키니 ' + correct + '예요.',
        };
      },
    },
    {
      id: 'clock-hands',
      level: 2,
      title: '시각에 맞게 시곗바늘 그리기',
      make: function (R) {
        var h = R.int(1, 12), half = R.bool(), askLong = R.bool();
        var nx = nextH(h), pv = prevH(h);
        var time = half ? hourName(h) + ' 30분' : hourName(h);
        function between(a, b) { return a + R.josa(a, '과/와') + ' ' + b + ' 사이 가운데'; }
        var correct, cands = [], explain;
        if (askLong) {
          correct = half ? '6' : '12';
          cands.push([half ? '12' : '6', half ? '긴바늘이 12를 가리키면 딱 몇 시예요. 30분에는 6을 가리켜요.' : '긴바늘이 6을 가리키면 30분이에요. 딱 몇 시에는 12를 가리켜요.']);
          cands.push([String(h), h + R.josa(h, '은/는') + ' 짧은바늘이 가리키는 수예요.']);
          cands.push([String(nx), '긴바늘은 몇 시인지와 상관없이 ' + (half ? '30분이면 6' : '딱 몇 시면 12') + R.josa(half ? 6 : 12, '을/를') + ' 가리켜요.']);
          explain = time + '에 긴바늘은 ' + correct + R.josa(Number(correct), '을/를') + ' 가리켜요. ' + (half ? '긴바늘이 6이면 30분이에요.' : '긴바늘이 12이면 딱 몇 시예요.');
        } else {
          correct = half ? between(h, nx) : String(h);
          if (half) {
            cands.push([between(pv, h), time + R.josa(time, '은/는') + ' ' + h + '시가 지난 시각이에요. 짧은바늘은 ' + h + R.josa(h, '을/를') + ' 지나 ' + nx + ' 쪽으로 가요.']);
            cands.push([String(h), '짧은바늘이 ' + h + R.josa(h, '을/를') + ' 똑바로 가리키면 딱 ' + h + '시예요. 30분에는 두 수 사이에 있어요.']);
            cands.push([String(nx), '아직 ' + nx + '시가 되지 않았어요. 짧은바늘은 ' + nx + '에 닿지 않아요.']);
            if (h !== 6 && nx !== 6) cands.push(['6', '6은 30분일 때 긴바늘이 가리키는 수예요.']);
          } else {
            cands.push([between(h, nx), '두 수 사이에 있으면 30분이에요. 딱 ' + h + '시에는 ' + h + R.josa(h, '을/를') + ' 똑바로 가리켜요.']);
            cands.push([String(nx), '짧은바늘은 ' + h + R.josa(h, '을/를') + ' 가리켜야 ' + h + '시예요.']);
            if (h !== 12) cands.push(['12', '12는 딱 몇 시일 때 긴바늘이 가리키는 수예요.']);
            cands.push([String(pv), '짧은바늘은 ' + h + R.josa(h, '을/를') + ' 가리켜야 ' + h + '시예요.']);
          }
          explain = time + '에 짧은바늘은 ' + (half ? h + R.josa(h, '과/와') + ' ' + nx + ' 사이 가운데를' : h + R.josa(h, '을/를')) + ' 가리켜요. 긴바늘은 ' + (half ? '6' : '12') + R.josa(half ? 6 : 12, '을/를') + ' 가리켜요.';
        }
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }), 3);
        return {
          type: 'choice', concept: half ? 4 : 3,
          q: time + R.josa(time, '을/를') + ' 시계에 그리려고 해요. ' + (askLong ? '긴바늘' : '짧은바늘') + '은 어디를 가리키게 그려야 할까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          hint: '몇 시는 짧은바늘, 몇 분은 긴바늘이 알려 줘요.',
          explain: explain,
        };
      },
    },
    {
      id: 'shape-count',
      level: 1,
      title: '그림에서 □, △, ○ 모양 세기',
      make: function (R) {
        var n = [R.int(1, 5), R.int(1, 5), R.int(1, 4)];
        var items = [];
        for (var k = 0; k < 3; k++) for (var i = 0; i < n[k]; i++) items.push([KIND[k], R.int(0, 2)]);
        items = R.shuffle(items);
        var FEAT = ['뾰족한 곳이 4군데인', '뾰족한 곳이 3군데인', '뾰족한 곳이 없는'];
        var mode = R.int(0, 6), wrong = [], q, c, explain, concept;
        if (mode <= 5) {
          // 0~2: 모양으로 묻기, 3~5: 특징으로 묻기
          var ask = mode % 3, kind = KIND[ask];
          c = n[ask];
          q = mode <= 2 ? kind + ' 모양은 모두 몇 개일까요?' : FEAT[ask] + ' 모양은 모두 몇 개일까요?';
          concept = mode <= 2 ? 0 : 1;
          for (var j = 0; j < 3; j++) {
            if (j !== ask && n[j] !== c && !wrong.some(function (w) { return w.a === String(n[j]); })) {
              wrong.push({ a: String(n[j]), why: KIND[j] + ' 모양을 셌어요. ' + kind + ' 모양만 골라 세어요.' });
            }
          }
          wrong.push({ a: String(n[0] + n[1] + n[2]), why: '모든 모양을 셌어요. ' + kind + ' 모양만 골라 세어요.' });
          explain = (mode <= 2 ? '' : FEAT[ask] + ' 모양은 ' + kind + ' 모양이에요. ') + kind + ' 모양을 하나씩 짚으며 세면 ' + c + '개예요.';
        } else {
          // 곧은 선으로 된 모양 = □ + △
          c = n[0] + n[1];
          q = '곧은 선으로 된 모양은 모두 몇 개일까요?';
          concept = 1;
          wrong.push({ a: String(n[0]), why: '□ 모양만 셌어요. △ 모양도 곧은 선으로 되어 있어요.' });
          if (n[1] !== n[0]) wrong.push({ a: String(n[1]), why: '△ 모양만 셌어요. □ 모양도 곧은 선으로 되어 있어요.' });
          wrong.push({ a: String(c + n[2]), why: '○ 모양까지 셌어요. ○ 모양에는 곧은 선이 없어요.' });
          explain = '곧은 선으로 된 모양은 □ 모양과 △ 모양이에요. □ 모양 ' + n[0] + '개와 △ 모양 ' + n[1] + '개를 이어 세면 ' + c + '개예요.';
        }
        return {
          type: 'short', check: 'number', unit: '개', concept: concept,
          q: q,
          fig: scatter(items, '여러 가지 모양 ' + items.length + '개'),
          answer: String(c),
          wrong: wrong,
          explain: explain,
        };
      },
    },
    {
      id: 'shape-compare',
      level: 2,
      title: '두 가지 모양의 수 견주기',
      make: function (R) {
        var n = [R.int(1, 5), R.int(1, 5), R.int(1, 5)];
        var a = R.int(0, 2), b = (a + R.int(1, 2)) % 3;
        if (n[a] === n[b]) n[a] = n[a] === 5 ? 1 : n[a] + 1;
        if (n[a] < n[b]) { var tmp = a; a = b; b = tmp; }
        var items = [];
        for (var k = 0; k < 3; k++) for (var i = 0; i < n[k]; i++) items.push([KIND[k], R.int(0, 2)]);
        items = R.shuffle(items);
        var d = n[a] - n[b];
        var wrong = [{ a: String(n[a] + n[b]), why: '두 수를 더했어요. 몇 개 더 많은지는 빼요.' }];
        if (n[a] !== d) wrong.push({ a: String(n[a]), why: KIND[a] + ' 모양의 수만 셌어요. ' + KIND[b] + ' 모양의 수를 빼요.' });
        return {
          type: 'short', check: 'number', unit: '개', concept: 0,
          q: KIND[a] + ' 모양은 ' + KIND[b] + ' 모양보다 몇 개 더 많을까요?',
          fig: scatter(items, '여러 가지 모양 ' + items.length + '개'),
          answer: String(d),
          hint: '두 모양을 따로 세어요. 몇 개 더 많은지는 뺄셈으로 구해요.',
          wrong: wrong,
          explain: KIND[a] + ' 모양은 ' + n[a] + '개, ' + KIND[b] + ' 모양은 ' + n[b] + '개예요. $' + n[a] + '-' + n[b] + '=' + d + '$' + R.josa(d, '이에요/예요') + '. ' + d + '개 더 많아요.',
        };
      },
    },
  ],
});
})();
