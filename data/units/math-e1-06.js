/* 1학년 수학 · 100까지의 수
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 몇십(60~90), 99까지의 수 세기와 두 가지 읽기, 수의 순서와 100, 크기 비교, 짝수와 홀수(20까지의 수).
 * 1학년 말로 "10개씩 묶음", "낱개"를 쓴다(자리 이름은 2학년). 크기 비교는 >, < 기호 없이 말로 한다.
 * 그림: 10개씩 묶음 막대·둘씩 짝 지은 구슬은 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  var FILLS = ['var(--fig-1)', 'var(--fig-2)', 'var(--fig-3)', 'var(--fig-4)'];
  var NAT = ['', '하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉'];
  var NAT10 = ['', '열', '스물', '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔'];
  var SINO = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];

  // 두 가지 읽기 (1~99)
  function sino(n) {
    var t = Math.floor(n / 10), o = n % 10;
    return (t === 0 ? '' : (t === 1 ? '' : SINO[t]) + '십') + SINO[o];
  }
  function nat(n) {
    return NAT10[Math.floor(n / 10)] + NAT[n % 10];
  }
  function txt(x, y, s) {
    return '<text x="' + x + '" y="' + y + '" font-size="14" text-anchor="middle" fill="currentColor">' + s + '</text>';
  }
  // 10개씩 묶음 하나 (구슬 10개를 세로로 꿴 막대)
  function bundle(x, y, fill) {
    var s = '<rect x="' + x + '" y="' + y + '" width="16" height="108" rx="5" fill="none" stroke="currentColor" stroke-width="1.5"/>';
    for (var i = 0; i < 10; i++) {
      s += '<circle cx="' + (x + 8) + '" cy="' + (y + 8.5 + i * 10.3).toFixed(1) + '" r="4.3" fill="' + fill + '" fill-opacity="0.75" stroke="currentColor" stroke-width="0.8"/>';
    }
    return s;
  }
  // 수 n 을 10개씩 묶음과 낱개로 (왼쪽 x0 부터) → { svg, w }
  function group(n, x0, fill) {
    var t = Math.floor(n / 10), o = n % 10, s = '';
    for (var i = 0; i < t; i++) s += bundle(x0 + i * 22, 10, fill);
    var ox = x0 + t * 22 + (t ? 6 : 0);
    for (var j = 0; j < o; j++) {
      s += '<circle cx="' + (ox + 8 + Math.floor(j / 5) * 20) + '" cy="' + (19 + (j % 5) * 22) + '" r="7" fill="' + fill + '" fill-opacity="0.75" stroke="currentColor" stroke-width="1.2"/>';
    }
    var w = t * 22 + (o ? (t ? 6 : 0) + Math.ceil(o / 5) * 20 : 0);
    return { svg: s, w: w };
  }
  // 여러 수를 나란히: list = [[수, 아래 글], …] (아래 글이 '' 이면 쓰지 않는다)
  function beads(list, alt) {
    var spans = list.map(function (g) { return Math.max(group(g[0], 0, '').w, 40); });
    var total = spans.reduce(function (a, b) { return a + b + 30; }, 0) - 6;   // 처음 그리는 너비 (x - 18)
    var x = 12 + Math.max(0, Math.round((220 - total) / 2)), body = '';   // 너비가 220 보다 좁으면 가운데로
    list.forEach(function (g, k) {
      var r = group(g[0], x, FILLS[k % 3]);
      var span = Math.max(r.w, 40);
      body += r.svg;
      if (g[1]) body += txt(x + span / 2, 142, g[1]);
      x += span + 30;
    });
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + Math.max(x - 18, 220) + ' ' + (list.some(function (g) { return g[1]; }) ? 156 : 130) + '">' + body + '</svg>', alt: alt };
  }
  // 구슬 n 개를 둘씩 짝 지어 (위아래로 한 쌍, 짝이 없는 구슬은 다른 색)
  function pairs(n, alt) {
    var cols = Math.ceil(n / 2), W = Math.max(220, cols * 34 + 24), x0 = (W - cols * 34) / 2 + 17, s = '';
    for (var c = 0; c < cols; c++) {
      var x = x0 + c * 34, two = 2 * c + 1 < n;
      if (two) s += '<rect x="' + (x - 14) + '" y="8" width="28" height="70" rx="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>';
      s += '<circle cx="' + x + '" cy="26" r="10" fill="' + (two ? 'var(--fig-1)' : 'var(--fig-2)') + '" fill-opacity="0.75" stroke="currentColor" stroke-width="1.5"/>';
      if (two) s += '<circle cx="' + x + '" cy="60" r="10" fill="var(--fig-1)" fill-opacity="0.75" stroke="currentColor" stroke-width="1.5"/>';
    }
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' 88">' + s + '</svg>', alt: alt };
  }
  // 구슬 n 개를 짝 짓지 않고 한 줄에 다섯 개씩
  function loose(n, alt) {
    var rows = Math.ceil(n / 10), s = '';
    for (var i = 0; i < n; i++) {
      s += '<circle cx="' + (25 + (i % 10) * 34) + '" cy="' + (22 + Math.floor(i / 10) * 32) + '" r="10" fill="var(--fig-3)" fill-opacity="0.75" stroke="currentColor" stroke-width="1.5"/>';
    }
    return { type: 'svg', svg: '<svg viewBox="0 0 360 ' + (rows * 32 + 12) + '">' + s + '</svg>', alt: alt };
  }

Tutor.registerUnit({
  id: 'math-e1-06',
  course: 'math-e1',
  title: '100까지의 수',
  summary: '60부터 99까지의 수와 100을 알아보고, 수의 순서와 크기 비교, 짝수와 홀수를 배워요.',
  goals: [
    '60, 70, 80, 90을 알고 두 가지로 읽을 수 있어요.',
    '99까지의 수를 10개씩 묶음과 낱개로 세고 두 가지로 읽을 수 있어요.',
    '100을 알고, 100까지의 수의 순서와 크기를 비교할 수 있어요.',
    '둘씩 짝을 지어 짝수와 홀수를 구별할 수 있어요.',
  ],
  standards: ['[2수01-01]', '[2수01-03]'],

  concepts: [
    {
      title: '60, 70, 80, 90 알아보기',
      body: '10개씩 묶음 6개는 **60**이에요. 묶음이 하나씩 늘면 70, 80, 90이 돼요.\n\n| 수 | 10개씩 묶음 | 읽기 |\n|---|---|---|\n| 60 | 6개 | 육십, 예순 |\n| 70 | 7개 | 칠십, 일흔 |\n| 80 | 8개 | 팔십, 여든 |\n| 90 | 9개 | 구십, 아흔 |\n\n> 💡 앞 단원에서 배운 10, 20, 30, 40, 50(열, 스물, 서른, 마흔, 쉰)에 이어지는 수예요.',
      easy: '연필 10자루를 한 묶음으로 묶어요.\n\n묶음을 하나씩 늘리며 "십, 이십, 삼십, 사십, 오십, 육십, 칠십" 하고 세어 봐요. 묶음 7개면 70이에요.\n\n"열, 스물, 서른, 마흔, 쉰, 예순, 일흔"으로 세어도 돼요.',
      fig: beads([[70, '']], '10개씩 묶음 7개'),
      check: {
        type: 'choice',
        q: '"일흔"은 어떤 수일까요?',
        choices: ['70', '60', '17'],
        answer: 0,
        why: ['', '60은 "예순"이에요. "일흔"은 10개씩 묶음 7개예요.', '17은 "열일곱"이에요. "일흔"은 10개씩 묶음 7개예요.'],
        explain: '"일흔"은 "칠십"과 같아요. 10개씩 묶음 7개인 70이에요.',
      },
    },
    {
      title: '99까지의 수 세기와 읽기',
      body: '10개씩 묶음 7개와 낱개 4개는 **74**예요.\n\n74는 두 가지로 읽어요.\n\n- **칠십사**\n- **일흔넷**\n\n수를 쓸 때는 **10개씩 묶음의 수를 앞에, 낱개의 수를 뒤에** 써요. 묶음 7개, 낱개 4개라서 74예요.\n\n> ⚠️ 두 가지 읽기를 섞지 않아요. "칠십넷", "일흔사"는 틀린 말이에요.',
      easy: '달걀 한 판에 10개씩 들어 있어요. 7판과 낱개 4개가 있으면 몇 개일까요?\n\n판을 "십, 이십, …, 칠십" 하고 센 다음, 낱개를 "칠십일, 칠십이, 칠십삼, 칠십사" 하고 이어 세요. 달걀은 74개예요.',
      fig: beads([[74, '']], '10개씩 묶음 7개와 낱개 4개'),
      check: {
        type: 'choice',
        q: '86을 바르게 읽은 것은 무엇일까요?',
        choices: ['여든여섯', '팔십여섯', '육십팔'],
        answer: 0,
        why: ['', '두 가지 읽기를 섞었어요. "팔십육" 또는 "여든여섯"으로 읽어요.', '묶음과 낱개를 바꿔 읽었어요. 86은 10개씩 묶음이 8개예요.'],
        explain: '86은 10개씩 묶음 8개와 낱개 6개예요. "팔십육" 또는 "여든여섯"이라고 읽어요.',
      },
    },
    {
      title: '수의 순서와 100',
      body: '수를 순서대로 쓰면 하나씩 커져요.\n\n… 96, 97, 98, 99, **100**\n\n99보다 1 큰 수를 **100**이라고 해요. **백**이라고 읽어요.\n\n100은 **10개씩 묶음 10개**예요. 90(묶음 9개)보다 10 큰 수이기도 해요.\n\n- 1 큰 수: 바로 뒤의 수. 69보다 1 큰 수는 70이에요.\n- 1 작은 수: 바로 앞의 수. 80보다 1 작은 수는 79예요.\n- 사이의 수: 85와 87 사이의 수는 86이에요.',
      easy: '99층까지 있는 건물에서 한 층 더 올라가면 100층이에요.\n\n99는 묶음 9개와 낱개 9개예요. 낱개가 하나 더 생기면 낱개가 10개, 곧 새 묶음이 돼요. 그러면 묶음이 10개가 되는데, 이것이 100이에요.',
      fig: { type: 'numberline', min: 90, max: 100, step: 1, labelEvery: 1, alt: '90부터 100까지 수가 적힌 수직선' },
      check: {
        type: 'short', check: 'number',
        q: '99보다 1 큰 수는 얼마일까요?',
        answer: '100',
        wrong: [
          { a: '98', why: '1 작은 수를 구했어요. 1 큰 수는 바로 뒤의 수예요.' },
          { a: '910', why: '낱개가 10개가 되면 새 묶음이 돼요. 묶음 10개는 100이에요.' },
        ],
        explain: '99 바로 뒤의 수는 100이에요. 100은 10개씩 묶음 10개이고 "백"이라고 읽어요.',
      },
    },
    {
      title: '100까지 수의 크기 비교',
      body: '두 수의 크기는 **10개씩 묶음의 수**를 먼저 비교해요. 묶음이 많은 수가 더 커요.\n\n76과 67: 묶음이 7개와 6개예요. 76이 67보다 커요.\n\n묶음의 수가 같으면 **낱개의 수**를 비교해요.\n\n83과 88: 묶음은 8개로 같고, 낱개는 3개와 8개예요. 88이 83보다 커요.\n\n> 💡 76과 67처럼 같은 숫자로 만든 수도 앞의 수(묶음의 수)가 크면 더 커요.',
      easy: '10장짜리 붙임딱지 판을 많이 가진 친구가 붙임딱지를 더 많이 가진 거예요. 판 한 장이 낱장 9장보다 많으니까요.\n\n판의 수가 같을 때만 낱장을 비교해요.',
      fig: beads([[76, '76'], [67, '67']], '76과 67을 10개씩 묶음과 낱개로 나타낸 그림'),
      check: {
        type: 'ox',
        q: '67은 76보다 커요.',
        answer: false,
        explain: '67은 10개씩 묶음이 6개, 76은 7개예요. 묶음이 많은 76이 더 커요. 낱개 7이 6보다 커도 묶음의 수를 먼저 비교해요.',
      },
    },
    {
      title: '짝수와 홀수',
      body: '물건을 **둘씩 짝**을 지어 봐요.\n\n- 남는 것이 없으면 **짝수**예요. 2, 4, 6, 8, 10, 12, 14, 16, 18, 20\n- 하나가 남으면 **홀수**예요. 1, 3, 5, 7, 9, 11, 13, 15, 17, 19\n\n구슬 7개를 둘씩 짝 지으면 짝이 3개 생기고 1개가 남아요. 그래서 7은 홀수예요.\n\n> 💡 짝수와 홀수는 번갈아 나와요. 1은 홀수, 2는 짝수, 3은 홀수, 4는 짝수 …',
      easy: '친구들이 두 명씩 손을 잡고 짝을 지어요.\n\n모두 짝이 있으면 그 수는 짝수예요. 혼자 남은 친구가 한 명 있으면 그 수는 홀수예요.\n\n6명이면 3쌍이 되어 남는 친구가 없어요. 6은 짝수예요.',
      fig: pairs(7, '구슬 7개를 둘씩 짝 지으니 3쌍과 1개가 남은 그림'),
      check: {
        type: 'ox',
        q: '9는 짝수예요.',
        answer: false,
        explain: '9개를 둘씩 짝 지으면 짝이 4개 생기고 1개가 남아요. 그래서 9는 홀수예요.',
      },
    },
  ],

  examples: [
    {
      q: '10개씩 묶음 7개와 낱개 5개인 수를 쓰고, 두 가지로 읽어 보세요.',
      steps: [
        '10개씩 묶음 7개는 70이에요.',
        '70에서 낱개 5개를 이어 세면 71, 72, 73, 74, 75예요.',
        '그래서 75라고 써요. "칠십오" 또는 "일흔다섯"이라고 읽어요.',
      ],
      answer: '75 (칠십오, 일흔다섯)',
    },
    {
      q: '13은 짝수일까요, 홀수일까요?',
      fig: pairs(13, '구슬 13개를 둘씩 짝 지은 그림'),
      steps: [
        '구슬 13개를 둘씩 짝 지어 봐요.',
        '짝이 6개 생기고 1개가 남아요.',
        '하나가 남으니 13은 홀수예요.',
      ],
      answer: '홀수',
    },
  ],

  terms: [
    { term: '몇십', def: '10개씩 묶음만 있고 낱개가 없는 수예요. 60(육십, 예순), 70(칠십, 일흔), 80(팔십, 여든), 90(구십, 아흔)이 있어요.' },
    { term: '100', def: '99보다 1 큰 수예요. 10개씩 묶음 10개이고 "백"이라고 읽어요.' },
    { term: '10개씩 묶음', def: '10개를 한 묶음으로 묶은 것이에요. 묶음 8개는 80이에요.' },
    { term: '낱개', def: '묶음에 들어가지 않고 하나씩 따로 있는 것이에요. 74에서 낱개는 4개예요.' },
    { term: '짝수', def: '둘씩 짝을 지을 때 남는 것이 없는 수예요. 2, 4, 6, 8, 10 …' },
    { term: '홀수', def: '둘씩 짝을 지을 때 하나가 남는 수예요. 1, 3, 5, 7, 9 …' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
      q: '10개씩 묶음 6개는 얼마일까요?',
      answer: '60',
      wrong: [
        { a: '6', why: '묶음을 1개씩으로 셌어요. 묶음 하나에는 10개가 들어 있어요.' },
        { a: '16', why: '10과 6을 모았어요. 10개씩 묶음이 6개 있어요.' },
      ],
      explain: '10개씩 묶음을 "십, 이십, 삼십, 사십, 오십, 육십" 하고 세면 60이에요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '"여든"은 어떤 수일까요?',
      choices: ['80', '90', '18', '60'],
      answer: 0,
      why: ['', '90은 "아흔"이에요.', '18은 "열여덟"이에요.', '60은 "예순"이에요.'],
      explain: '"여든"은 "팔십"과 같아요. 10개씩 묶음 8개인 80이에요.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '구슬은 모두 몇 개일까요?',
      fig: beads([[58, '']], '10개씩 묶음 5개와 낱개 8개'),
      answer: '58',
      wrong: [
        { a: '13', why: '10개씩 묶음을 1개씩으로 셌어요. 묶음 하나에는 10개가 들어 있어요.' },
        { a: '85', why: '묶음과 낱개의 자리를 바꿨어요. 묶음의 수를 앞에 써요.' },
      ],
      explain: '10개씩 묶음 5개는 50이에요. 50에서 낱개 8개를 이어 세면 58이에요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 1,
      q: '93을 바르게 읽은 것은 무엇일까요?',
      choices: ['구십삼', '아흔삼', '삼십구', '구삼'],
      answer: 0,
      why: [
        '',
        '두 가지 읽기를 섞었어요. "구십삼" 또는 "아흔셋"으로 읽어요.',
        '묶음과 낱개를 바꿔 읽었어요. 93은 10개씩 묶음이 9개예요.',
        '숫자를 하나씩 따로 읽었어요. 93은 "구십삼" 또는 "아흔셋"이에요.',
      ],
      explain: '93은 10개씩 묶음 9개와 낱개 3개예요. "구십삼" 또는 "아흔셋"이라고 읽어요.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', unit: '개', concept: 2,
      q: '100은 10개씩 묶음 몇 개일까요?',
      answer: '10',
      wrong: [
        { a: '1', why: '10개씩 묶음 1개는 10이에요. 90은 묶음 9개이고, 100은 그보다 묶음이 하나 더 많아요.' },
        { a: '9', why: '묶음 9개는 90이에요. 100은 묶음이 하나 더 많아요.' },
      ],
      explain: '90은 10개씩 묶음 9개예요. 100은 90보다 10 큰 수이므로 묶음이 하나 더 있어요. 그래서 묶음 10개예요.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 3,
      q: '58은 61보다 작아요.',
      answer: true,
      explain: '58은 10개씩 묶음이 5개, 61은 6개예요. 묶음이 적은 58이 더 작아요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '짝수는 어느 것일까요?',
      choices: ['14', '9', '17', '11'],
      answer: 0,
      why: ['', '9는 둘씩 짝 지으면 1개가 남아요. 홀수예요.', '17은 둘씩 짝 지으면 1개가 남아요. 홀수예요.', '11은 둘씩 짝 지으면 1개가 남아요. 홀수예요.'],
      explain: '14는 둘씩 짝 지으면 짝이 7개 생기고 남는 것이 없어요. 그래서 짝수예요.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 4,
      q: '구슬의 수는 짝수일까요, 홀수일까요?',
      fig: loose(15, '구슬 15개'),
      choices: ['홀수', '짝수', '짝수도 홀수도 아니에요'],
      answer: 0,
      why: ['', '구슬을 둘씩 짝 지어 보세요. 하나가 남아요.', '1부터의 수는 모두 짝수 아니면 홀수예요. 둘씩 짝 지어 보세요.'],
      hint: '구슬을 세어 보고, 둘씩 짝을 지어 보세요.',
      explain: '구슬은 15개예요. 둘씩 짝 지으면 짝이 7개 생기고 1개가 남아요. 그래서 홀수예요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '가장 작은 수는 무엇일까요?',
      choices: ['69', '71', '96', '70'],
      answer: 0,
      why: [
        '',
        '71은 10개씩 묶음이 7개예요. 묶음이 6개인 수가 더 작아요.',
        '96은 묶음이 9개로 가장 많아요. 가장 큰 수예요.',
        '70은 10개씩 묶음이 7개예요. 묶음이 6개인 수가 더 작아요.',
      ],
      hint: '10개씩 묶음의 수를 먼저 비교해요.',
      explain: '10개씩 묶음이 69는 6개, 71은 7개, 96은 9개, 70은 7개예요. 묶음이 가장 적은 69가 가장 작아요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', concept: 2,
      q: '수직선에서 ?에 알맞은 수는 무엇일까요?',
      fig: { type: 'numberline', min: 90, max: 100, step: 1, labelEvery: 5, points: [{ x: 93, label: '?' }], alt: '90부터 100까지의 수직선에 ? 표시가 있는 그림' },
      answer: '93',
      hint: '90에서 오른쪽으로 한 칸씩 세어 보세요.',
      wrong: [
        { a: '97', why: '95에서 오른쪽으로 센 것 같아요. ?는 95보다 왼쪽에 있어요.' },
        { a: '3', why: '90에서 몇 칸 갔는지만 썼어요. 90에서 3칸 간 곳의 수를 써요.' },
      ],
      explain: '90에서 오른쪽으로 한 칸씩 가면 91, 92, 93이에요. 그래서 ?는 93이에요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '달걀이 한 판에 10개씩 8판 있고, 낱개로 6개가 더 있어요. 달걀은 모두 몇 개일까요?',
      answer: '86',
      hint: '10개씩 8판은 몇 개인지 먼저 생각해요.',
      wrong: [
        { a: '14', why: '판의 수와 낱개의 수를 그냥 더했어요. 10개씩 8판은 80개예요.' },
        { a: '68', why: '판과 낱개의 자리를 바꿨어요. 10개씩 묶음(판)의 수를 앞에 써요.' },
      ],
      explain: '10개씩 8판은 80개예요. 80에서 낱개 6개를 이어 세면 86개예요.',
    },
    {
      id: 'p12', level: 2, type: 'order', concept: 3,
      q: '작은 수부터 차례로 놓으세요.',
      choices: ['59', '65', '76', '90'],
      answer: [0, 1, 2, 3],
      hint: '10개씩 묶음의 수가 적은 수부터 놓아요.',
      explain: '10개씩 묶음이 59는 5개, 65는 6개, 76은 7개, 90은 9개예요. 그래서 59, 65, 76, 90 순서예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 2,
      q: '어떤 수보다 1 작은 수는 90이에요. 어떤 수보다 1 큰 수는 얼마일까요?',
      answer: '92',
      hint: '먼저 어떤 수를 찾아요.',
      wrong: [
        { a: '91', why: '91은 어떤 수예요. 어떤 수보다 1 큰 수까지 구해야 해요.' },
        { a: '89', why: '90보다 1 작은 수를 구했어요. 90은 어떤 수보다 1 작은 수예요.' },
      ],
      explain: '1 작은 수가 90이니 어떤 수는 90 바로 뒤의 수 91이에요. 91보다 1 큰 수는 92예요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', fixed: true, concept: 3,
      q: '10개씩 묶음 7개와 낱개 □개인 수가 74보다 작아요. □에 들어갈 수 있는 수는 모두 몇 개일까요? (□는 0부터 9까지의 수예요.)',
      choices: ['3개', '4개', '5개', '6개'],
      answer: 1,
      why: [
        '0을 빠뜨렸어요. 70도 74보다 작아요.',
        '',
        '4도 넣었어요. 74는 74보다 작지 않아요.',
        '74보다 작은 수만 세어요. □는 0, 1, 2, 3이에요.',
      ],
      hint: '묶음이 7개로 같으니 낱개를 비교해요. 0도 잊지 마세요.',
      explain: '묶음이 7개로 같으니 낱개가 4보다 적어야 해요. □는 0, 1, 2, 3으로 모두 4개예요(70, 71, 72, 73).',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '개', concept: 4,
      q: '10보다 크고 20보다 작은 수 가운데 홀수는 모두 몇 개일까요?',
      answer: '5',
      hint: '11부터 19까지 차례로 써 보고 홀수에 표시해요.',
      wrong: [
        { a: '9', why: '11부터 19까지의 수를 모두 셌어요. 홀수만 세어요.' },
        { a: '4', why: '하나를 빠뜨렸어요. 11, 13, 15, 17, 19를 다시 세어 보세요.' },
      ],
      explain: '10보다 크고 20보다 작은 수는 11부터 19까지예요. 이 가운데 홀수는 11, 13, 15, 17, 19로 모두 5개예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', concept: 1,
      q: '수 카드 6, 9, 3 중에서 2장을 골라 몇십몇을 만들어요. 만들 수 있는 가장 작은 수는 무엇일까요?',
      answer: '36',
      hint: '앞의 수가 10개씩 묶음의 수예요. 앞에 가장 작은 카드를 놓아요.',
      wrong: [
        { a: '39', why: '앞에는 3을 맞게 놓았어요. 뒤에는 남은 6과 9 중 작은 수를 놓아요.' },
        { a: '63', why: '카드 순서를 바꿨어요. 앞(10개씩 묶음의 수)에 가장 작은 3을 놓아요.' },
      ],
      explain: '앞의 수가 10개씩 묶음의 수예요. 가장 작은 3을 앞에, 남은 6과 9 중 작은 6을 뒤에 놓으면 36이에요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: '연필이 13자루 있어요. 1자루를 더 받으면 연필의 수는 짝수일까요, 홀수일까요?',
      choices: ['짝수', '홀수', '알 수 없어요'],
      answer: 0,
      why: ['', '13은 홀수지만 1자루를 더 받으면 14자루가 돼요. 14를 둘씩 짝 지어 보세요.', '연필은 13+1로 14자루예요. 14를 둘씩 짝 지어 보세요.'],
      hint: '1자루를 더 받으면 몇 자루가 되는지 먼저 세어요.',
      explain: '13자루를 둘씩 짝 지으면 1자루가 남아요. 1자루를 더 받으면 남던 1자루와 짝이 되어 14자루 모두 짝이 생겨요. 14는 짝수예요.',
    },
  ],

  deeper: [
    {
      title: '100 다음에는 어떤 수가 올까요?',
      body: '100은 10개씩 묶음이 10개 모인 수예요. 10개씩 묶음 10개를 다시 하나로 묶으면 **100개씩 묶음** 1개가 돼요.\n\n2학년에서는 100개씩 묶음이 여러 개인 수(200, 300, …)와 101, 102 같은 **세 자리 수**를 배워요. "10개가 모이면 한 묶음"이라는 약속이 계속 이어져요.\n\n짝수와 홀수도 큰 수에서 그대로 쓰여요. 낱개의 수가 0, 2, 4, 6, 8이면 짝수, 1, 3, 5, 7, 9이면 홀수예요.',
    },
  ],

  faq: [
    {
      q: '예순, 일흔, 여든, 아흔이 헷갈려요.',
      a: '순서대로 외워 봐요. 열(10), 스물(20), 서른(30), 마흔(40), 쉰(50), 예순(60), 일흔(70), 여든(80), 아흔(90)이에요.\n\n"일흔"은 "일곱"처럼 "일"로, "여든"은 "여덟"처럼 "여"로, "아흔"은 "아홉"처럼 "아"로 시작한다고 기억하면 쉬워요.',
    },
    {
      q: '0은 짝수예요, 홀수예요?',
      a: '1학년에서는 1부터 20까지의 수로 짝수와 홀수를 알아봐요. 수학에서는 0을 짝수로 보아요. 둘씩 짝 지을 것이 하나도 없으니 남는 것도 없지요.',
    },
    {
      q: '100은 왜 1과 0이 두 개예요?',
      a: '100은 10개씩 묶음 10개예요. 10개씩 묶음이 10개 모이면 더 큰 묶음(100개씩 묶음) 하나가 되어서, 수를 쓸 때 자리가 하나 더 늘어나요. 자세한 것은 2학년에서 배워요.',
    },
  ],

  mistakes: [
    '"칠십넷", "일흔사"처럼 두 가지 읽기를 섞는 실수 — "칠십사" 또는 "일흔넷"으로 읽어요.',
    '67과 76에서 낱개만 보고 67이 크다고 하는 실수 — 10개씩 묶음의 수를 먼저 비교해요.',
    '99 다음 수를 "910"이라고 쓰는 실수 — 99보다 1 큰 수는 100이에요.',
  ],

  gens: [
    {
      id: 'count99',
      level: 1,
      title: '99까지의 수 세기와 두 가지로 읽기',
      make: function (R) {
        var t = R.bool(0.75) ? R.int(6, 9) : R.int(2, 5), o = R.int(0, 9);
        var n = 10 * t + o;
        var mode = o === 0 ? R.int(0, 1) : R.int(0, 2);
        var wrong = [];
        if (t + o !== n) wrong.push({ a: String(t + o), why: '10개씩 묶음을 1개씩으로 셌어요. 묶음 하나에는 10개가 들어 있어요.' });
        if (o > 0 && o !== t) wrong.push({ a: String(10 * o + t), why: '묶음과 낱개의 자리를 바꿨어요. 묶음의 수를 앞에, 낱개의 수를 뒤에 써요.' });
        var how = '10개씩 묶음 ' + t + '개는 ' + (10 * t) + R.josa(10 * t, '이에요/예요') + '.' +
          (o ? ' ' + (10 * t) + '에서 낱개 ' + o + '개를 이어 세면 ' + n + R.josa(n, '이에요/예요') + '.' : '');
        var what = '10개씩 묶음 ' + t + '개' + (o ? '와 낱개 ' + o + '개' : '');
        if (mode === 0) {
          return {
            type: 'short', check: 'number', unit: '개', concept: o ? 1 : 0,
            q: '구슬은 모두 몇 개일까요?',
            fig: beads([[n, '']], what),
            answer: String(n),
            wrong: wrong,
            explain: how,
          };
        }
        if (mode === 1) {
          return {
            type: 'short', check: 'number', concept: o ? 1 : 0,
            q: what + '인 수는 얼마일까요?',
            answer: String(n),
            wrong: wrong,
            explain: how,
          };
        }
        var useSino = R.bool();
        var correct = useSino ? sino(n) : nat(n);
        var rev = 10 * o + t;
        var mixWhy = '두 가지 읽기를 섞었어요. "' + sino(n) + '" 또는 "' + nat(n) + '"' + R.josa(nat(n), '으로/로') + ' 읽어요.';
        var revWhy = '10개씩 묶음과 낱개를 바꿔 읽었어요. 묶음이 ' + t + '개예요.';
        var cands = useSino
          ? [[SINO[t] + '십' + NAT[o], mixWhy], [sino(rev), revWhy], [SINO[o], '낱개만 읽었어요. 10개씩 묶음도 읽어야 해요.'], [SINO[t] + SINO[o], '숫자를 하나씩 따로 읽었어요.']]
          : [[NAT10[t] + SINO[o], mixWhy], [nat(rev), revWhy], [NAT[o], '낱개만 읽었어요. 10개씩 묶음도 읽어야 해요.'], [NAT[t] + NAT[o], '숫자를 하나씩 따로 읽었어요.']];
        var reason = {};
        cands.forEach(function (c) { if (c[0] !== correct && !(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, Object.keys(reason), 4);
        return {
          type: 'choice', concept: 1,
          q: n + R.josa(n, '을/를') + ' 바르게 읽은 것은 무엇일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: n + R.josa(n, '은/는') + ' 10개씩 묶음 ' + t + '개와 낱개 ' + o + '개예요. "' + sino(n) + '" 또는 "' + nat(n) + '"' + R.josa(nat(n), '이라고/라고') + ' 읽어요.',
        };
      },
    },
    {
      id: 'order100',
      level: 1,
      title: '100까지 수의 순서 (1 큰 수, 1 작은 수, 사이의 수)',
      make: function (R) {
        var mode = R.int(0, 2), n;
        if (mode === 0) {
          n = R.bool(0.4) ? 10 * R.int(5, 9) + 9 : R.int(51, 98);
          var big = n + 1;
          var w0 = [{ a: String(n - 1), why: '1 작은 수를 구했어요. 1 큰 수는 바로 뒤의 수예요.' }];
          if (n % 10 === 9) w0.push({ a: String(n - 9), why: '낱개가 10개가 되면 10개씩 묶음이 하나 늘어나요. ' + n + ' 다음은 ' + big + R.josa(big, '이에요/예요') + '.' });
          return {
            type: 'short', check: 'number', concept: 2,
            q: n + '보다 1 큰 수는 얼마일까요?',
            answer: String(big),
            wrong: w0,
            explain: n + ' 바로 뒤의 수는 ' + big + R.josa(big, '이에요/예요') + '.' + (n % 10 === 9 ? ' 낱개 9개에 하나가 더 생기면 10개가 되어, 10개씩 묶음이 ' + (big / 10) + '개가 돼요.' : ''),
          };
        }
        if (mode === 1) {
          n = R.bool(0.4) ? 10 * R.int(6, 10) : R.int(52, 100);
          var small = n - 1;
          return {
            type: 'short', check: 'number', concept: 2,
            q: n + '보다 1 작은 수는 얼마일까요?',
            answer: String(small),
            wrong: [{ a: String(n + 1), why: '1 큰 수를 구했어요. 1 작은 수는 바로 앞의 수예요.' }],
            explain: n + ' 바로 앞의 수는 ' + small + R.josa(small, '이에요/예요') + '.',
          };
        }
        n = R.int(51, 98);
        var mid = n + 1, hi = n + 2;
        return {
          type: 'short', check: 'number', concept: 2,
          q: n + R.josa(n, '과/와') + ' ' + hi + ' 사이에 있는 수는 무엇일까요?',
          answer: String(mid),
          wrong: [{ a: String(n - 1), why: n + '보다 1 작은 수예요. 두 수의 가운데에 있는 수를 찾아요.' }, { a: String(hi + 1), why: hi + '보다 1 큰 수예요. 두 수의 가운데에 있는 수를 찾아요.' }],
          explain: n + ', ' + mid + ', ' + hi + ' 순서이므로 ' + n + R.josa(n, '과/와') + ' ' + hi + ' 사이에 있는 수는 ' + mid + R.josa(mid, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'compare100',
      level: 2,
      title: '100까지 수의 크기 비교 (가장 큰 수·가장 작은 수)',
      make: function (R) {
        var t = R.int(5, 9), o1 = R.int(0, 9), o2 = R.int(0, 9);
        while (o2 === o1) o2 = R.int(0, 9);
        var nums = [10 * t + o1, 10 * t + o2];
        function add(x) { if (x >= 10 && x <= 99 && nums.indexOf(x) < 0) nums.push(x); }
        add(10 * o1 + t);
        add(10 * o2 + t);
        var guard = 0;
        while (nums.length < 4 && guard++ < 50) add(R.int(40, 99));
        nums = nums.slice(0, 4);
        var wantBig = R.bool();
        var best = nums.reduce(function (a, b) { return wantBig ? Math.max(a, b) : Math.min(a, b); });
        var bt = Math.floor(best / 10);
        var correct = String(best);
        var pick = R.choices(correct, nums.filter(function (x) { return x !== best; }).map(String), 4);
        var word = wantBig ? '큰' : '작은';
        return {
          type: 'choice', concept: 3,
          q: '가장 ' + word + ' 수는 무엇일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            if (c === correct) return '';
            var x = Number(c);
            if (Math.floor(x / 10) === bt) return '10개씩 묶음의 수가 같으면 낱개를 비교해요. ' + correct + R.josa(best, '이/가') + ' 낱개가 더 ' + (wantBig ? '많아요.' : '적어요.');
            return '10개씩 묶음의 수를 먼저 비교해요. ' + c + R.josa(x, '은/는') + ' 묶음이 ' + Math.floor(x / 10) + '개, ' + correct + R.josa(best, '은/는') + ' ' + bt + '개예요.';
          }),
          hint: '10개씩 묶음의 수를 먼저 비교해요.',
          explain: '10개씩 묶음의 수를 먼저 비교하고, 묶음의 수가 같으면 낱개를 비교해요. 가장 ' + word + ' 수는 ' + correct + R.josa(best, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'even-odd',
      level: 1,
      title: '짝수와 홀수 (20까지의 수)',
      make: function (R) {
        var mode = R.int(0, 2);
        if (mode === 0) {
          // 그림을 보고 짝수인지 홀수인지
          var n = R.int(3, 20), even = n % 2 === 0, k = Math.floor(n / 2);
          var correct = even ? '짝수' : '홀수', other = even ? '홀수' : '짝수';
          var pick = R.choices(correct, [other, '짝수도 홀수도 아니에요'], 3);
          return {
            type: 'choice', concept: 4,
            q: '구슬 ' + n + '개를 둘씩 짝 지었어요. ' + n + R.josa(n, '은/는') + ' 짝수일까요, 홀수일까요?',
            fig: pairs(n, '구슬 ' + n + '개를 둘씩 짝 지은 그림'),
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) {
              if (c === correct) return '';
              if (c === other) return even ? '짝이 없는 구슬이 있는지 다시 봐요. 남는 구슬이 없어요.' : '짝이 없는 구슬이 1개 있어요. 하나가 남으면 홀수예요.';
              return '1부터의 수는 모두 짝수 아니면 홀수예요. 남는 구슬이 있는지 봐요.';
            }),
            explain: '둘씩 짝 지으면 짝이 ' + k + '개 생기고 ' + (even ? '남는 것이 없어요. 그래서 ' + n + R.josa(n, '은/는') + ' 짝수예요.' : '1개가 남아요. 그래서 ' + n + R.josa(n, '은/는') + ' 홀수예요.'),
          };
        }
        // 여러 수 가운데 짝수(홀수) 하나 고르기
        var wantEven = R.bool();
        var pool = [];
        for (var i = 1; i <= 20; i++) pool.push(i);
        var good = pool.filter(function (x) { return (x % 2 === 0) === wantEven; });
        var bad = pool.filter(function (x) { return (x % 2 === 0) !== wantEven; });
        var ans = R.pick(good);
        var others = R.sample(bad, 3);
        var kind = wantEven ? '짝수' : '홀수';
        var pick2 = R.choices(String(ans), others.map(String), 4);
        return {
          type: 'choice', concept: 4,
          q: kind + '는 어느 것일까요?',
          choices: pick2.choices,
          answer: pick2.answer,
          why: pick2.choices.map(function (c) {
            if (c === String(ans)) return '';
            var x = Number(c);
            return x + R.josa(x, '은/는') + ' 둘씩 짝 지으면 ' + (x % 2 === 0 ? '남는 것이 없어요. 짝수예요.' : '1개가 남아요. 홀수예요.');
          }),
          hint: '둘씩 짝을 지어 보거나, 1, 2, 3, 4 …를 "홀, 짝, 홀, 짝"으로 세어 봐요.',
          explain: ans + R.josa(ans, '은/는') + ' 둘씩 짝 지으면 ' + (wantEven ? '남는 것이 없어서 짝수예요.' : '1개가 남아서 홀수예요.') + ' 짝수는 2, 4, 6, 8, 10 …, 홀수는 1, 3, 5, 7, 9 …예요.',
        };
      },
    },
  ],
});
})();
