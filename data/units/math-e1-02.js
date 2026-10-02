/* 1학년 수학 · 여러 가지 모양
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 상자·둥근 기둥·공 모양은 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  var KINDS = ['box', 'cyl', 'ball'];
  var NAME = { box: '상자 모양', cyl: '둥근 기둥 모양', ball: '공 모양' };
  // 주변 물건 (상표 없는 흔한 물건만)
  var THINGS = {
    box: ['주사위', '선물 상자', '책', '휴지 상자', '벽돌', '과자 상자'],
    cyl: ['음료수 캔', '두루마리 휴지', '북', '통조림 통', '풀'],
    ball: ['축구공', '야구공', '구슬', '볼링공', '수박'],
  };

  function txt(x, y, s) {
    return '<text x="' + x + '" y="' + y + '" font-size="13" text-anchor="middle" fill="currentColor">' + s + '</text>';
  }
  // 모양 하나 (가운데 x, y — 약 36×36 칸)
  function shape(k, x, y) {
    if (k === 'box') {
      return '<polygon points="' + (x - 15) + ',' + (y - 9) + ' ' + (x - 7) + ',' + (y - 17) + ' ' + (x + 19) + ',' + (y - 17) + ' ' + (x + 11) + ',' + (y - 9) + '" fill="var(--fig-2)" fill-opacity="0.35" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>' +
        '<polygon points="' + (x + 11) + ',' + (y - 9) + ' ' + (x + 19) + ',' + (y - 17) + ' ' + (x + 19) + ',' + (y + 7) + ' ' + (x + 11) + ',' + (y + 15) + '" fill="var(--fig-2)" fill-opacity="0.8" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>' +
        '<rect x="' + (x - 15) + '" y="' + (y - 9) + '" width="26" height="24" fill="var(--fig-2)" fill-opacity="0.55" stroke="currentColor" stroke-width="1.5"/>';
    }
    if (k === 'cyl') {
      return '<path d="M' + (x - 13) + ' ' + (y - 11) + ' L' + (x - 13) + ' ' + (y + 12) + ' A13 5 0 0 0 ' + (x + 13) + ' ' + (y + 12) + ' L' + (x + 13) + ' ' + (y - 11) + '" fill="var(--fig-1)" fill-opacity="0.55" stroke="currentColor" stroke-width="1.5"/>' +
        '<ellipse cx="' + x + '" cy="' + (y - 11) + '" rx="13" ry="5" fill="var(--fig-1)" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5"/>';
    }
    return '<circle cx="' + x + '" cy="' + y + '" r="15" fill="var(--fig-3)" fill-opacity="0.55" stroke="currentColor" stroke-width="1.5"/>' +
      '<path d="M' + (x - 15) + ' ' + y + ' A15 5 0 0 0 ' + (x + 15) + ' ' + y + '" fill="none" stroke="currentColor" stroke-opacity="0.5" stroke-width="1"/>' +
      '<circle cx="' + (x - 6) + '" cy="' + (y - 6) + '" r="3" fill="currentColor" fill-opacity="0.25"/>';
  }
  // 세 가지 모양을 이름과 함께
  function three(alt) {
    var body = shape('box', 50, 40) + shape('cyl', 150, 40) + shape('ball', 250, 40) +
      txt(50, 82, '상자 모양') + txt(150, 82, '둥근 기둥 모양') + txt(250, 82, '공 모양');
    return { type: 'svg', svg: '<svg viewBox="0 0 300 96">' + body + '</svg>', alt: alt || '상자 모양, 둥근 기둥 모양, 공 모양' };
  }
  // 한 가지 모양만 크게 (특징 카드)
  function one(k, alt) {
    return { type: 'svg', svg: '<svg viewBox="0 0 200 80"><g transform="translate(100 40) scale(1.8) translate(-100 -40)">' + shape(k, 100, 40) + '</g></svg>', alt: alt || NAME[k] };
  }
  // 여러 모양을 다섯 개씩 줄지어 (세기 쉽게)
  function scene(list, alt) {
    var rows = Math.max(1, Math.ceil(list.length / 5)), body = '';
    for (var i = 0; i < list.length; i++) body += shape(list[i], 34 + (i % 5) * 52, 32 + Math.floor(i / 5) * 48);
    return { type: 'svg', svg: '<svg viewBox="0 0 280 ' + (rows * 48 + 16) + '">' + body + '</svg>', alt: alt || '여러 가지 모양이 놓인 그림' };
  }
  // 아래 줄부터 쌓아 만든 모양 (rows[0] 이 맨 아래 줄, 줄마다 가운데 맞춤)
  function tower(rows, alt) {
    var H = rows.length * 38 + 20, body = '';
    rows.forEach(function (row, r) {
      var y = H - 28 - r * 38, x0 = 120 - (row.length - 1) * 19;
      row.forEach(function (k, i) { if (k) body += shape(k, x0 + i * 38, y); });
    });
    return { type: 'svg', svg: '<svg viewBox="0 0 240 ' + H + '">' + body + '</svg>', alt: alt || '여러 가지 모양을 쌓아 만든 그림' };
  }
  function countOf(list, k) { return list.filter(function (v) { return v === k; }).length; }

Tutor.registerUnit({
  id: 'math-e1-02',
  course: 'math-e1',
  title: '여러 가지 모양',
  summary: '상자 모양, 둥근 기둥 모양, 공 모양을 주변에서 찾고, 특징을 알아보며 여러 가지 모양을 만들어요.',
  goals: [
    '주변 물건에서 상자 모양, 둥근 기둥 모양, 공 모양을 찾을 수 있어요.',
    '같은 모양끼리 모을 수 있어요.',
    '쌓기와 굴리기로 모양마다 다른 점을 말할 수 있어요.',
    '여러 가지 모양으로 만든 것에서 모양별 개수를 셀 수 있어요.',
  ],
  standards: ['[2수03-01]'],

  concepts: [
    {
      title: '세 가지 모양 알아보기',
      body: '우리 주변 물건은 모양이 여러 가지예요.\n\n그중 세 가지 모양을 알아봐요.\n\n| 모양 | 이런 물건이 있어요 |\n|---|---|\n| **상자 모양** | 주사위, 선물 상자, 책 |\n| **둥근 기둥 모양** | 음료수 캔, 두루마리 휴지, 북 |\n| **공 모양** | 축구공, 구슬, 수박 |\n\n> 💡 물건의 색깔이나 크기가 아니라 **생김새**를 보고 모양을 정해요.',
      easy: '집 안을 둘러보세요.\n\n네모난 상자처럼 생긴 것이 있어요. 주사위, 책이 그래요.\n\n캔처럼 길쭉하고 둥근 것이 있어요. 휴지 심, 북이 그래요.\n\n공처럼 동그란 것도 있어요. 구슬, 수박이 그래요.',
      fig: three('왼쪽부터 상자 모양, 둥근 기둥 모양, 공 모양'),
      check: {
        type: 'choice',
        q: '주사위는 어떤 모양일까요?',
        choices: ['상자 모양', '둥근 기둥 모양', '공 모양'],
        answer: 0, fixed: true,
        why: ['', '둥근 기둥 모양은 캔처럼 둥근 부분이 있어요. 주사위는 네모난 면만 있어요.', '공 모양은 구슬처럼 둥글어요. 주사위는 둥근 곳이 없어요.'],
        explain: '주사위는 상자처럼 네모난 면으로 되어 있어요. 그래서 상자 모양이에요.',
      },
    },
    {
      title: '같은 모양끼리 모으기',
      body: '물건을 모양에 따라 나누어 모아 봐요.\n\n크기가 달라도, 색깔이 달라도 **생김새가 같으면 같은 모양**이에요.\n\n작은 주사위와 큰 냉장고는 크기가 아주 달라요.\n\n그래도 둘 다 **상자 모양**이에요.\n\n> 💡 "이 물건은 어떤 모양을 닮았지?" 하고 생각하며 하나씩 나누어 보세요.',
      easy: '장난감 정리 놀이를 해 봐요.\n\n상자 바구니, 기둥 바구니, 공 바구니가 있어요.\n\n구슬은 작아도 공 바구니에 넣어요. 수박은 커도 공 바구니에 넣어요.\n\n크기는 상관없어요. 생김새만 보고 넣어요.',
      fig: scene(['box', 'ball', 'cyl', 'box', 'ball', 'cyl', 'box', 'ball'], '상자 모양, 둥근 기둥 모양, 공 모양이 섞여 놓인 그림'),
      check: {
        type: 'ox',
        q: '작은 구슬과 큰 수박은 크기가 달라서 다른 모양이에요.',
        answer: false,
        explain: '크기는 달라도 둘 다 동그랗게 생겼어요. 구슬과 수박은 모두 공 모양이에요.',
      },
    },
    {
      title: '상자 모양의 특징',
      body: '상자 모양을 만져 보고 굴려 봐요.\n\n- **평평한 부분**이 있어요.\n- **뾰족한 부분**이 있어요.\n- 둥근 부분은 없어요.\n\n평평한 부분이 있어서 **잘 쌓을 수 있어요.**\n\n어느 쪽으로 놓아도 쌓을 수 있어요.\n\n하지만 굴리면 **잘 굴러가지 않아요.**',
      easy: '책을 책상 위에 굴려 보세요. 데굴데굴 굴러가나요?\n\n아니에요. 툭 쓰러지기만 해요.\n\n그 대신 책 위에 책을 올리면 높이 쌓을 수 있어요. 평평해서 그래요.',
      fig: one('box', '상자 모양 하나'),
      check: {
        type: 'ox',
        q: '상자 모양은 잘 굴러가요.',
        answer: false,
        explain: '상자 모양은 평평한 부분만 있어서 잘 굴러가지 않아요. 대신 잘 쌓을 수 있어요.',
      },
    },
    {
      title: '둥근 기둥 모양의 특징',
      body: '둥근 기둥 모양에는 **평평한 부분**과 **둥근 부분**이 모두 있어요.\n\n위와 아래는 평평해요. 옆은 둥글어요.\n\n**세우면** 평평한 부분이 위아래에 있어서 **쌓을 수 있어요.**\n\n**눕히면** 둥근 부분이 바닥에 닿아서 **잘 굴러가요.**\n\n> 💡 둥근 기둥 모양은 세우는지, 눕히는지에 따라 하는 일이 달라요.',
      easy: '음료수 캔을 떠올려 보세요.\n\n캔을 세워 두면 가만히 서 있어요. 캔 위에 캔을 올릴 수도 있어요.\n\n캔을 옆으로 눕히면 데굴데굴 굴러가요.',
      fig: one('cyl', '둥근 기둥 모양 하나'),
      check: {
        type: 'choice',
        q: '둥근 기둥 모양을 잘 굴러가게 하려면 어떻게 놓아야 할까요?',
        choices: ['눕혀요', '세워요', '거꾸로 세워요'],
        answer: 0, fixed: true,
        why: ['', '세우면 평평한 부분이 바닥에 닿아서 굴러가지 않아요.', '거꾸로 세워도 평평한 부분이 바닥에 닿아요. 굴러가지 않아요.'],
        explain: '눕히면 둥근 부분이 바닥에 닿아서 잘 굴러가요.',
      },
    },
    {
      title: '공 모양의 특징',
      body: '공 모양은 **둥근 부분만** 있어요.\n\n평평한 부분도, 뾰족한 부분도 없어요.\n\n그래서 **어느 쪽으로 굴려도 잘 굴러가요.**\n\n하지만 위에 다른 것을 올리면 미끄러져요.\n\n그래서 공 모양은 **쌓기가 어려워요.**',
      easy: '축구공을 바닥에 놓고 살짝 밀어 보세요. 어느 쪽으로 밀어도 데굴데굴 굴러가요.\n\n공 위에 공을 올려 보세요. 금방 굴러떨어지지요?\n\n둥근 곳만 있어서 그래요.',
      fig: one('ball', '공 모양 하나'),
      check: {
        type: 'choice',
        q: '둥근 부분만 있는 모양은 무엇일까요?',
        choices: ['공 모양', '상자 모양', '둥근 기둥 모양'],
        answer: 0, fixed: true,
        why: ['', '상자 모양은 평평한 부분만 있어요. 둥근 부분이 없어요.', '둥근 기둥 모양은 둥근 부분과 평평한 부분이 모두 있어요.'],
        explain: '공 모양은 평평한 부분이 없고 둥근 부분만 있어요.',
      },
    },
    {
      title: '여러 가지 모양으로 만들기',
      body: '세 가지 모양을 쌓아서 여러 가지를 만들 수 있어요.\n\n- 아래에는 **잘 쌓이는** 상자 모양을 놓아요.\n- 그 위에 둥근 기둥 모양을 **세워서** 올려요.\n- 공 모양은 굴러가니까 **맨 위**에 살짝 올려요.\n\n만든 것에 어떤 모양이 몇 개 쓰였는지 셀 수 있어요.\n\n> 💡 한 가지 모양씩 정해서 세어요. 센 것은 표시를 해 두면 두 번 세지 않아요.',
      easy: '블록으로 탑을 쌓는다고 생각해 보세요.\n\n먼저 상자 모양만 찾아서 하나씩 짚으며 세어요.\n\n다음에는 둥근 기둥 모양만, 그다음에는 공 모양만 세어요.\n\n한꺼번에 세면 헷갈리니까 한 가지씩 세는 거예요.',
      fig: tower([['box', 'box', 'box'], ['cyl', 'cyl'], ['ball']], '맨 아래 상자 모양 3개, 그 위에 둥근 기둥 모양 2개, 맨 위에 공 모양 1개를 쌓은 그림'),
      check: {
        type: 'short', check: 'number', unit: '개',
        q: '그림에서 상자 모양은 몇 개일까요?',
        fig: tower([['box', 'box', 'box'], ['cyl', 'cyl'], ['ball']], '여러 가지 모양을 쌓아 만든 그림'),
        answer: '3',
        wrong: [{ a: '6', why: '모든 모양을 다 셌어요. 상자 모양만 골라서 세어 보세요.' }],
        explain: '맨 아래 줄의 상자 모양을 하나, 둘, 셋 세면 3개예요.',
      },
    },
  ],

  examples: [
    {
      q: '두루마리 휴지는 어떤 모양일까요? 그렇게 생각한 까닭도 말해 보세요.',
      steps: [
        '두루마리 휴지의 위와 아래를 봐요. 평평해요.',
        '옆을 만져 봐요. 둥글어요.',
        '평평한 부분과 둥근 부분이 모두 있으니 둥근 기둥 모양이에요.',
      ],
      answer: '둥근 기둥 모양 (평평한 부분과 둥근 부분이 모두 있어요)',
    },
    {
      q: '그림에서 공 모양은 몇 개일까요?',
      fig: scene(['ball', 'box', 'ball', 'cyl', 'box', 'ball', 'cyl'], '여러 가지 모양이 놓인 그림'),
      steps: [
        '공 모양만 찾아요. 동그랗고 평평한 곳이 없는 모양이에요.',
        '왼쪽 위부터 하나씩 짚으며 세어요. 하나, 둘, 셋!',
        '공 모양은 3개예요.',
      ],
      answer: '3개',
    },
  ],

  terms: [
    { term: '상자 모양', def: '주사위나 선물 상자처럼 생긴 모양이에요. 평평한 부분과 뾰족한 부분이 있어요.' },
    { term: '둥근 기둥 모양', def: '음료수 캔이나 두루마리 휴지처럼 생긴 모양이에요. 평평한 부분과 둥근 부분이 있어요.' },
    { term: '공 모양', def: '축구공이나 구슬처럼 생긴 모양이에요. 둥근 부분만 있어요.' },
    { term: '평평한 부분', def: '책상 위처럼 판판한 곳이에요. 평평한 부분이 있으면 그 위에 다른 것을 쌓을 수 있어요.' },
    { term: '둥근 부분', def: '공의 겉처럼 둥글게 굽은 곳이에요. 둥근 부분이 바닥에 닿으면 잘 굴러가요.' },
    { term: '뾰족한 부분', def: '상자의 모서리 끝처럼 콕 튀어나온 곳이에요. 상자 모양에 있어요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '음료수 캔은 어떤 모양일까요?',
      choices: ['상자 모양', '둥근 기둥 모양', '공 모양'],
      answer: 1, fixed: true,
      why: ['상자 모양은 둥근 부분이 없어요. 캔은 옆이 둥글어요.', '', '공 모양은 평평한 부분이 없어요. 캔은 위와 아래가 평평해요.'],
      explain: '음료수 캔은 위와 아래가 평평하고 옆이 둥글어요. 둥근 기둥 모양이에요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '공 모양인 물건은 무엇일까요?',
      choices: ['구슬', '책', '북'],
      answer: 0,
      why: ['', '책은 평평한 부분만 있어요. 상자 모양이에요.', '북은 위와 아래가 평평해요. 둥근 기둥 모양이에요.'],
      explain: '구슬은 어디를 보아도 동그래요. 공 모양이에요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '모양이 **다른** 하나는 무엇일까요?',
      choices: ['두루마리 휴지', '주사위', '휴지 상자'],
      answer: 0,
      why: ['', '주사위는 상자 모양이에요. 휴지 상자도 상자 모양이에요.', '휴지 상자는 상자 모양이에요. 주사위도 상자 모양이에요.'],
      explain: '주사위와 휴지 상자는 상자 모양이에요. 두루마리 휴지만 둥근 기둥 모양이에요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: '상자 모양에는 평평한 부분이 있어요.',
      answer: true,
      explain: '맞아요. 상자 모양은 평평한 부분이 있어서 위에 다른 것을 잘 쌓을 수 있어요.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 4,
      q: '공 모양은 여러 개를 높이 쌓기 쉬워요.',
      answer: false,
      explain: '공 모양은 둥근 부분만 있어서 위에 올리면 굴러떨어져요. 쌓기 어려워요. 쌓기 쉬운 모양은 상자 모양이에요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '평평한 부분과 둥근 부분이 **모두** 있는 모양은 무엇일까요?',
      choices: ['상자 모양', '둥근 기둥 모양', '공 모양'],
      answer: 1, fixed: true,
      why: ['상자 모양은 평평한 부분만 있어요.', '', '공 모양은 둥근 부분만 있어요.'],
      explain: '둥근 기둥 모양은 위와 아래가 평평하고, 옆이 둥글어요. 두 가지가 모두 있어요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'number', unit: '개', concept: 5,
      q: '그림에서 둥근 기둥 모양은 몇 개일까요?',
      fig: scene(['cyl', 'box', 'ball', 'cyl', 'cyl', 'box', 'ball', 'cyl', 'box'], '여러 가지 모양이 놓인 그림'),
      answer: '4',
      wrong: [
        { a: '3', why: '하나를 빠뜨렸어요. 둥근 기둥 모양만 짚으며 다시 세어 보세요.' },
        { a: '9', why: '모든 모양을 다 셌어요. 둥근 기둥 모양만 골라서 세어요.' },
      ],
      explain: '위가 평평하고 옆이 둥근 모양을 찾아 하나씩 세면 하나, 둘, 셋, 넷이에요. 둥근 기둥 모양은 4개예요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 3,
      q: '지아는 미끄럼틀 위에서 물건을 굴려 보려고 해요. 눕혀 놓으면 잘 굴러가고, 세워 놓으면 굴러가지 않는 물건은 무엇일까요?',
      choices: ['통조림 통', '구슬', '벽돌'],
      answer: 0,
      why: ['', '구슬은 공 모양이라 세우거나 눕히는 것 없이 어느 쪽으로나 굴러가요.', '벽돌은 상자 모양이라 어떻게 놓아도 잘 굴러가지 않아요.'],
      hint: '세우는 것과 눕히는 것이 다른 모양을 떠올려 보세요.',
      explain: '통조림 통은 둥근 기둥 모양이에요. 눕히면 둥근 부분이 바닥에 닿아 굴러가고, 세우면 평평한 부분이 닿아 굴러가지 않아요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '개', concept: 5,
      q: '모양을 쌓아 만든 것이에요. 공 모양은 몇 개 쓰였을까요?',
      fig: tower([['box', 'box', 'box', 'box'], ['cyl', 'box', 'cyl'], ['ball', 'ball']], '여러 가지 모양을 쌓아 만든 그림'),
      answer: '2',
      wrong: [{ a: '3', why: '둥근 기둥 모양까지 센 것 같아요. 공 모양은 평평한 곳이 없이 동그란 모양이에요.' }],
      hint: '맨 위 줄을 잘 보세요.',
      explain: '공 모양은 맨 위 줄에 있어요. 하나, 둘 — 공 모양은 2개예요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 5,
      q: '모양을 쌓아 만든 것이에요. 가장 많이 쓴 모양은 무엇일까요?',
      fig: tower([['box', 'box', 'box', 'box'], ['cyl', 'box', 'cyl'], ['ball', 'ball']], '여러 가지 모양을 쌓아 만든 그림'),
      choices: ['상자 모양', '둥근 기둥 모양', '공 모양'],
      answer: 0, fixed: true,
      why: ['', '둥근 기둥 모양은 2개예요. 상자 모양도 세어 보세요.', '공 모양은 2개예요. 상자 모양도 세어 보세요.'],
      hint: '모양마다 하나씩 세어 보세요.',
      explain: '상자 모양은 맨 아래 4개와 가운데 1개로 5개예요. 둥근 기둥 모양은 2개, 공 모양은 2개예요. 상자 모양을 가장 많이 썼어요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: '주머니 속 물건을 손으로 만져 보았어요. 평평한 부분도 있고 둥근 부분도 있었어요. 이 물건은 무엇일까요?',
      choices: ['북', '야구공', '선물 상자'],
      answer: 0,
      why: ['', '야구공은 공 모양이라 평평한 부분이 없어요.', '선물 상자는 상자 모양이라 둥근 부분이 없어요.'],
      hint: '평평한 부분과 둥근 부분이 모두 있는 모양을 먼저 떠올려요.',
      explain: '평평한 부분과 둥근 부분이 모두 있는 것은 둥근 기둥 모양이에요. 북이 둥근 기둥 모양이에요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '서준이는 탑을 가장 높이, 무너지지 않게 쌓고 싶어요. 어떤 모양만 골라 쌓는 것이 가장 좋을까요?',
      choices: ['상자 모양', '둥근 기둥 모양', '공 모양'],
      answer: 0, fixed: true,
      why: ['', '둥근 기둥 모양도 세우면 쌓을 수 있지만, 눕힌 것은 굴러가요. 어느 쪽으로 놓아도 쌓이는 모양이 더 좋아요.', '공 모양은 위에 올리면 굴러떨어져요.'],
      hint: '어느 쪽으로 놓아도 평평한 부분이 위아래에 오는 모양을 찾아요.',
      explain: '상자 모양은 어느 쪽으로 놓아도 평평한 부분이 위아래에 와요. 그래서 가장 잘 쌓여요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '개', concept: 5,
      q: '그림에서 **둥근 부분이 있는** 모양은 모두 몇 개일까요?',
      fig: scene(['box', 'cyl', 'ball', 'box', 'box', 'ball', 'cyl', 'box'], '여러 가지 모양이 놓인 그림'),
      answer: '4',
      wrong: [
        { a: '2', why: '공 모양만 셌어요. 둥근 기둥 모양에도 둥근 부분이 있어요.' },
        { a: '8', why: '모든 모양을 다 셌어요. 상자 모양에는 둥근 부분이 없어요.' },
      ],
      hint: '둥근 부분이 있는 모양은 두 가지예요.',
      explain: '둥근 부분이 있는 모양은 둥근 기둥 모양과 공 모양이에요. 둥근 기둥 모양 2개, 공 모양 2개를 이어서 세면 하나, 둘, 셋, 넷 — 모두 4개예요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '어느 쪽으로 굴려도 잘 굴러가는 물건만 모은 것은 무엇일까요?',
      choices: ['축구공, 구슬', '축구공, 풀', '주사위, 구슬', '음료수 캔, 책'],
      answer: 0,
      why: ['', '풀은 둥근 기둥 모양이라 눕혔을 때만 굴러가요.', '주사위는 상자 모양이라 잘 굴러가지 않아요.', '음료수 캔은 눕혔을 때만 굴러가고, 책은 굴러가지 않아요.'],
      hint: '어느 쪽으로 굴려도 잘 굴러가는 모양은 한 가지예요.',
      explain: '어느 쪽으로나 잘 굴러가는 것은 공 모양이에요. 축구공과 구슬이 모두 공 모양이에요.',
    },
  ],

  deeper: [
    {
      title: '바퀴는 왜 둥글까?',
      body: '자전거 바퀴, 자동차 바퀴는 모두 둥글어요.\n\n둥근 부분이 땅에 닿아야 잘 굴러가기 때문이에요.\n\n바퀴가 상자 모양이라면 덜컹덜컹 굴러가지 않겠지요.\n\n반대로 집을 지을 때 쓰는 벽돌은 상자 모양이에요. 평평해서 높이 쌓을 수 있으니까요.\n\n물건의 모양은 하는 일에 맞게 만들어져 있어요. 집에서 물건을 하나 골라 왜 그런 모양인지 생각해 보세요.',
    },
    {
      title: '2학기와 2학년에서는',
      body: '이번에는 상자, 둥근 기둥, 공처럼 **입체** 모양을 배웠어요.\n\n2학기 "모양과 시각" 단원에서는 종이 위에 그린 것 같은 납작한 모양을 배워요. 네모, 세모, 동그라미 모양이에요.\n\n상자 모양의 평평한 부분을 종이에 대고 따라 그리면 네모 모양이 나와요. 둥근 기둥 모양의 평평한 부분을 따라 그리면 동그라미 모양이 나와요.',
    },
  ],

  faq: [
    { q: '휴지 상자는 위에 구멍이 있는데 상자 모양이에요?', a: '네, 상자 모양이에요. 구멍이나 그림이 조금 있어도 전체 생김새가 상자처럼 생겼으면 상자 모양이라고 해요.' },
    { q: '둥근 기둥 모양도 쌓을 수 있어요?', a: '세우면 쌓을 수 있어요. 위와 아래가 평평하기 때문이에요. 하지만 눕히면 굴러가서 쌓기 어려워요.' },
    { q: '수박은 완전히 동그랗지 않은데 공 모양이에요?', a: '조금 길쭉하거나 울퉁불퉁해도 전체가 공처럼 둥글면 공 모양이라고 해요. 모양을 정할 때는 전체 생김새를 봐요.' },
  ],

  mistakes: [
    '크기나 색깔이 다르면 다른 모양이라고 생각하는 실수 — 생김새가 같으면 같은 모양이에요.',
    '둥근 기둥 모양은 언제나 굴러간다고 생각하는 실수 — 눕혔을 때만 잘 굴러가요. 세우면 굴러가지 않아요.',
    '쌓아 만든 것에서 모양을 셀 때 하나를 두 번 세는 실수 — 한 가지 모양씩 정해서, 센 것은 표시하며 세어요.',
  ],

  gens: [
    {
      id: 'which-shape',
      level: 1,
      title: '물건이 어떤 모양인지 알기',
      make: function (R) {
        var k = R.pick(KINDS);
        var why = {
          box: '상자 모양은 평평한 부분만 있고 둥근 부분이 없어요.',
          cyl: '둥근 기둥 모양은 위아래가 평평하고 옆이 둥글어요.',
          ball: '공 모양은 평평한 부분 없이 둥근 부분만 있어요.',
        };
        if (R.bool()) {
          var t = R.pick(THINGS[k]);
          return {
            type: 'choice', concept: 0, fixed: true,
            q: t + R.josa(t, '은/는') + ' 어떤 모양일까요?',
            choices: KINDS.map(function (v) { return NAME[v]; }),
            answer: KINDS.indexOf(k),
            why: KINDS.map(function (v) { return v === k ? '' : why[v] + ' ' + t + R.josa(t, '과/와') + ' 생김새를 비교해 보세요.'; }),
            explain: t + R.josa(t, '은/는') + ' ' + NAME[k] + '이에요. ' + why[k],
          };
        }
        // 이 모양인 물건 고르기 (세 모양에서 하나씩)
        var items = KINDS.map(function (v) { return R.pick(THINGS[v]); });
        var order = R.shuffle([0, 1, 2]);
        var choices = order.map(function (i) { return items[i]; });
        var ans = order.indexOf(KINDS.indexOf(k));
        return {
          type: 'choice', concept: 0,
          q: NAME[k] + '인 물건은 무엇일까요?',
          choices: choices,
          answer: ans,
          why: order.map(function (i) {
            var v = KINDS[i];
            return v === k ? '' : items[i] + R.josa(items[i], '은/는') + ' ' + NAME[v] + '이에요. ' + why[k];
          }),
          explain: items[KINDS.indexOf(k)] + R.josa(items[KINDS.indexOf(k)], '이/가') + ' ' + NAME[k] + '이에요. ' + why[k],
        };
      },
    },
    {
      id: 'shape-feature',
      level: 1,
      title: '모양의 특징 (평평한 부분·둥근 부분, 쌓기·굴리기)',
      make: function (R) {
        var CARD = { box: 2, cyl: 3, ball: 4 };
        if (R.bool(0.6)) {
          // [모양, 말, 참/거짓, 해설]
          var FACTS = [
            ['box', '평평한 부분이 있어요.', true, '상자 모양은 평평한 부분이 있어서 잘 쌓여요.'],
            ['box', '둥근 부분이 있어요.', false, '상자 모양에는 둥근 부분이 없어요. 평평한 부분과 뾰족한 부분이 있어요.'],
            ['box', '뾰족한 부분이 있어요.', true, '상자 모양은 모서리 끝에 뾰족한 부분이 있어요.'],
            ['box', '잘 굴러가요.', false, '상자 모양은 평평한 부분만 있어서 잘 굴러가지 않아요.'],
            ['box', '여러 개를 잘 쌓을 수 있어요.', true, '상자 모양은 평평한 부분이 있어서 잘 쌓여요.'],
            ['box', '어느 쪽으로 놓아도 쌓을 수 있어요.', true, '상자 모양은 어느 쪽으로 놓아도 평평한 부분이 위아래에 와요.'],
            ['cyl', '평평한 부분이 있어요.', true, '둥근 기둥 모양은 위와 아래가 평평해요.'],
            ['cyl', '둥근 부분이 있어요.', true, '둥근 기둥 모양은 옆이 둥글어요.'],
            ['cyl', '뾰족한 부분이 있어요.', false, '둥근 기둥 모양에는 뾰족한 부분이 없어요. 평평한 부분과 둥근 부분이 있어요.'],
            ['cyl', '눕히면 잘 굴러가요.', true, '눕히면 둥근 부분이 바닥에 닿아서 잘 굴러가요.'],
            ['cyl', '세우면 잘 굴러가요.', false, '세우면 평평한 부분이 바닥에 닿아서 굴러가지 않아요. 눕혀야 굴러가요.'],
            ['cyl', '세우면 쌓을 수 있어요.', true, '세우면 평평한 부분이 위아래에 와서 쌓을 수 있어요.'],
            ['cyl', '평평한 부분만 있어요.', false, '둥근 기둥 모양은 옆이 둥글어요. 평평한 부분과 둥근 부분이 모두 있어요.'],
            ['cyl', '어느 쪽으로 굴려도 잘 굴러가요.', false, '둥근 기둥 모양은 눕혔을 때만 잘 굴러가요. 어느 쪽으로나 굴러가는 것은 공 모양이에요.'],
            ['ball', '평평한 부분이 있어요.', false, '공 모양에는 평평한 부분이 없어요. 둥근 부분만 있어요.'],
            ['ball', '둥근 부분만 있어요.', true, '공 모양은 어디를 보아도 둥글어요.'],
            ['ball', '뾰족한 부분이 있어요.', false, '공 모양에는 뾰족한 부분이 없어요. 둥근 부분만 있어요.'],
            ['ball', '어느 쪽으로 굴려도 잘 굴러가요.', true, '공 모양은 둥근 부분만 있어서 어느 쪽으로나 잘 굴러가요.'],
            ['ball', '여러 개를 쌓기 쉬워요.', false, '공 모양은 위에 올리면 굴러떨어져서 쌓기 어려워요.'],
            ['ball', '잘 굴러가요.', true, '공 모양은 둥근 부분만 있어서 잘 굴러가요.'],
          ];
          var f = R.pick(FACTS);
          var useFig = R.bool();
          var p = {
            type: 'ox', concept: CARD[f[0]],
            q: (useFig ? '그림과 같은 모양은 ' : NAME[f[0]] + '은 ') + f[1],
            answer: f[2],
            explain: (f[2] ? '맞아요. ' : '아니에요. ') + f[3],
          };
          if (useFig) p.fig = one(f[0], '모양 하나');
          return p;
        }
        // 설명에 알맞은 모양 고르기
        var DESC = [
          ['box', '둥근 부분이 없어요.'],
          ['box', '뾰족한 부분이 있어요.'],
          ['box', '잘 굴러가지 않고, 쌓기 쉬워요.'],
          ['cyl', '평평한 부분과 둥근 부분이 모두 있어요.'],
          ['cyl', '눕히면 잘 굴러가고, 세우면 쌓을 수 있어요.'],
          ['ball', '둥근 부분만 있어요.'],
          ['ball', '어느 쪽으로 굴려도 잘 굴러가요.'],
          ['ball', '평평한 부분이 없어서 쌓기 어려워요.'],
        ];
        var WHY = {
          box: '상자 모양은 평평한 부분과 뾰족한 부분만 있어서 잘 쌓이고 잘 굴러가지 않아요.',
          cyl: '둥근 기둥 모양은 평평한 부분과 둥근 부분이 모두 있어요. 눕혀야 굴러가요.',
          ball: '공 모양은 둥근 부분만 있어서 어느 쪽으로나 굴러가고 쌓기 어려워요.',
        };
        var d = R.pick(DESC);
        return {
          type: 'choice', concept: CARD[d[0]], fixed: true,
          q: '설명에 알맞은 모양은 무엇일까요?\n\n"' + d[1] + '"',
          choices: KINDS.map(function (v) { return NAME[v]; }),
          answer: KINDS.indexOf(d[0]),
          why: KINDS.map(function (v) { return v === d[0] ? '' : WHY[v]; }),
          explain: '"' + d[1] + '"에 맞는 것은 ' + NAME[d[0]] + '이에요. ' + WHY[d[0]],
        };
      },
    },
    {
      id: 'count-shapes',
      level: 2,
      title: '여러 가지 모양에서 모양별 개수 세기',
      make: function (R) {
        var n = { box: R.int(1, 5), cyl: R.int(1, 5), ball: R.int(1, 5) };
        var who = R.pick(['민수', '지아', '서준', '하윤', '도윤', '수아']);
        var lead = who + R.josa(who, '이/가') + ' 모양을 늘어놓았어요. ';
        var list = [];
        KINDS.forEach(function (k) { for (var i = 0; i < n[k]; i++) list.push(k); });
        list = R.shuffle(list);
        var total = list.length;
        var fig = scene(list, '여러 가지 모양이 놓인 그림');
        var mostKinds = KINDS.filter(function (k) { return n[k] === Math.max(n.box, n.cyl, n.ball); });
        var leastKinds = KINDS.filter(function (k) { return n[k] === Math.min(n.box, n.cyl, n.ball); });
        var mode = R.int(0, 2);
        if (mode === 2 && (mostKinds.length === 1 || leastKinds.length === 1)) {
          var askMost = mostKinds.length === 1 && (leastKinds.length !== 1 || R.bool());
          var target = askMost ? mostKinds[0] : leastKinds[0];
          return {
            type: 'choice', concept: 5, fixed: true,
            q: lead + '가장 ' + (askMost ? '많은' : '적은') + ' 모양은 무엇일까요?',
            fig: fig,
            choices: KINDS.map(function (v) { return NAME[v]; }),
            answer: KINDS.indexOf(target),
            why: KINDS.map(function (v) {
              return v === target ? '' : NAME[v] + '은 ' + n[v] + '개예요. ' + NAME[target] + '은 ' + n[target] + '개예요. 모양마다 다시 세어 보세요.';
            }),
            explain: '상자 모양 ' + n.box + '개, 둥근 기둥 모양 ' + n.cyl + '개, 공 모양 ' + n.ball + '개예요. 가장 ' + (askMost ? '많은' : '적은') + ' 모양은 ' + NAME[target] + '이에요.',
          };
        }
        var k = R.pick(KINDS);
        var wrong = [{ a: String(total), why: '모든 모양을 다 셌어요. ' + NAME[k] + '만 골라서 세어요.' }];
        if (n[k] > 1) wrong.push({ a: String(n[k] - 1), why: '하나를 빠뜨렸어요. ' + NAME[k] + '만 짚으며 다시 세어 보세요.' });
        var others = KINDS.filter(function (v) { return v !== k; });
        others.forEach(function (v) {
          if (n[v] !== n[k] && n[v] !== total && n[v] !== n[k] - 1) wrong.push({ a: String(n[v]), why: NAME[v] + '의 개수를 셌어요. ' + NAME[k] + '을 찾아 세어요.' });
        });
        // 같은 틀린 답이 두 번 들어가지 않게
        var seen = {};
        wrong = wrong.filter(function (w) { if (seen[w.a]) return false; seen[w.a] = 1; return true; });
        var NAT = ['', '하나', '둘', '셋', '넷', '다섯'];
        return {
          type: 'short', check: 'number', unit: '개', concept: 5,
          q: lead + NAME[k] + '은 몇 개일까요?',
          fig: fig,
          answer: String(n[k]),
          wrong: wrong,
          explain: NAME[k] + '만 찾아 하나씩 짚으며 "' + NAT.slice(1, n[k] + 1).join(', ') + '" 하고 세어요. ' + NAME[k] + '은 ' + n[k] + '개예요.',
        };
      },
    },
  ],
});
})();
