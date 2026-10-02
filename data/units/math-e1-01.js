/* 1학년 수학 · 9까지의 수
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 셀 물건·줄 선 모습은 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  var NAT = ['', '하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉'];   // 셀 때 읽는 말
  var SINO = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];          // 숫자로 읽는 말
  var ORD = ['', '첫째', '둘째', '셋째', '넷째', '다섯째', '여섯째', '일곱째', '여덟째', '아홉째'];
  var NAMES = ['민수', '지아', '서준', '하윤', '도윤', '수아', '예준', '서연', '지호'];
  var KINDS = ['구슬', '별', '상자'];

  function txt(x, y, s) {
    return '<text x="' + x + '" y="' + y + '" font-size="14" text-anchor="middle" fill="currentColor">' + s + '</text>';
  }
  // 물건 하나 (가운데 x, y)
  function shape(kind, x, y) {
    if (kind === '상자') {
      return '<rect x="' + (x - 12) + '" y="' + (y - 12) + '" width="24" height="24" rx="3" fill="var(--fig-2)" fill-opacity="0.55" stroke="currentColor" stroke-width="2"/>';
    }
    if (kind === '별') {
      var pts = [];
      for (var i = 0; i < 10; i++) {
        var r = i % 2 ? 6.5 : 15, a = (-90 + 36 * i) * Math.PI / 180;
        pts.push((x + r * Math.cos(a)).toFixed(1) + ',' + (y + r * Math.sin(a)).toFixed(1));
      }
      return '<polygon points="' + pts.join(' ') + '" fill="var(--fig-3)" fill-opacity="0.6" stroke="currentColor" stroke-width="1.5"/>';
    }
    return '<circle cx="' + x + '" cy="' + y + '" r="13" fill="var(--fig-1)" fill-opacity="0.55" stroke="currentColor" stroke-width="2"/>';
  }
  // 물건 n개를 다섯 개씩 줄지어 (세기 쉽게)
  function objs(n, kind, alt) {
    var rows = Math.max(1, Math.ceil(n / 5)), H = rows * 40 + 20, body = '';
    for (var i = 0; i < n; i++) body += shape(kind, 30 + (i % 5) * 40, 30 + Math.floor(i / 5) * 40);
    return { type: 'svg', svg: '<svg viewBox="0 0 220 ' + H + '">' + body + '</svg>', alt: alt || kind + ' ' + n + '개' };
  }
  // 접시 위의 사과 n개 (n = 0 이면 빈 접시)
  function plate(n, alt) {
    var body = '<ellipse cx="120" cy="62" rx="100" ry="34" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<ellipse cx="120" cy="62" rx="70" ry="21" fill="none" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.5"/>';
    for (var i = 0; i < n; i++) {
      var x = 120 - (n - 1) * 16 + i * 32;
      body += '<circle cx="' + x + '" cy="56" r="12" fill="var(--fig-2)" fill-opacity="0.7" stroke="currentColor" stroke-width="1.5"/>' +
        '<path d="M' + x + ' 44 l2 -6" stroke="currentColor" stroke-width="2"/>';
    }
    return { type: 'svg', svg: '<svg viewBox="0 0 240 110">' + body + '</svg>', alt: alt || '사과 ' + n + '개가 놓인 접시' };
  }
  // 한 줄로 놓인 n개 (hi 번째를 색칠, ends = [왼쪽 끝 글, 오른쪽 끝 글], names 가 있으면 아래에 이름)
  function lineup(n, hi, ends, names, alt) {
    var W = n * 44 + 100, H = names ? 95 : 70, body = '';
    for (var i = 0; i < n; i++) {
      var x = 72 + i * 44;
      body += '<circle cx="' + x + '" cy="40" r="16" fill="' + (i === hi ? 'var(--fig-2)' : 'none') + '"' +
        (i === hi ? ' fill-opacity="0.8"' : '') + ' stroke="currentColor" stroke-width="2"/>';
      if (names) body += txt(x, 82, names[i]);
    }
    body += txt(25, 45, ends[0]) + txt(W - 25, 45, ends[1]);
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' ' + H + '">' + body + '</svg>', alt: alt || '한 줄로 놓인 그림' };
  }
  // 위에 구슬 a개, 아래에 상자 b개를 하나씩 짝지어 놓은 그림
  function pairRows(a, b, alt) {
    var m = Math.max(a, b), W = 60 + (m - 1) * 36, body = '';
    for (var i = 0; i < m; i++) {
      var x = 30 + i * 36;
      if (i < a) body += shape('구슬', x, 28);
      if (i < b) body += shape('상자', x, 80);
      if (i < a && i < b) body += '<line x1="' + x + '" y1="42" x2="' + x + '" y2="67" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>';
    }
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' 106">' + body + '</svg>', alt: alt || '구슬 ' + a + '개와 상자 ' + b + '개를 짝지은 그림' };
  }

Tutor.registerUnit({
  id: 'math-e1-01',
  course: 'math-e1',
  title: '9까지의 수',
  summary: '1부터 9까지의 수를 세고 읽고 쓰는 법을 익히고, 0과 수의 순서, 크기 비교를 배워요.',
  goals: [
    '물건을 세어 9까지의 수로 나타내고, 두 가지로 읽을 수 있어요.',
    '첫째, 둘째 …로 순서를 말할 수 있어요.',
    '1만큼 더 큰 수와 1만큼 더 작은 수를 알고, 0을 이해해요.',
    '9까지의 수의 크기를 비교할 수 있어요.',
  ],
  standards: ['[2수01-01]', '[2수01-03]'],

  concepts: [
    {
      title: '1부터 5까지 세고 읽기',
      body: '물건을 셀 때는 하나씩 짚으면서 세어요.\n\n하나, 둘, 셋, 넷, 다섯!\n\n**마지막에 말한 수**가 모두 몇 개인지 알려 줘요.\n\n수는 두 가지로 읽어요.\n\n| 수 | 셀 때 | 숫자로 읽을 때 |\n|---|---|---|\n| 1 | 하나 | 일 |\n| 2 | 둘 | 이 |\n| 3 | 셋 | 삼 |\n| 4 | 넷 | 사 |\n| 5 | 다섯 | 오 |\n\n> 💡 사탕은 "하나, 둘" 하고 세요. 엘리베이터 3층은 "삼 층"이라고 읽어요.',
      easy: '손가락으로 세어 봐요. 하나씩 펴면서 "하나, 둘, 셋, 넷, 다섯" 하고 말해요.\n\n한 손을 다 펴면 다섯이에요.\n\n이미 센 것은 손가락으로 톡 짚어 두어요. 그러면 두 번 세지 않아요.',
      fig: objs(5, '구슬', '구슬 5개'),
      check: {
        type: 'choice',
        q: '4를 두 가지로 바르게 읽은 것은 무엇일까요?',
        choices: ['넷, 사', '셋, 삼', '다섯, 사'],
        answer: 0,
        why: ['', '3을 읽었어요. 4는 셀 때 "넷", 숫자로 "사"예요.', '"다섯"은 5를 셀 때 하는 말이에요. 4는 "넷"이에요.'],
        explain: '4는 셀 때 "넷", 숫자로 읽을 때 "사"라고 해요.',
      },
    },
    {
      title: '6부터 9까지 세고 읽기',
      body: '다섯 다음에도 이어서 세어요.\n\n여섯, 일곱, 여덟, 아홉!\n\n| 수 | 셀 때 | 숫자로 읽을 때 |\n|---|---|---|\n| 6 | 여섯 | 육 |\n| 7 | 일곱 | 칠 |\n| 8 | 여덟 | 팔 |\n| 9 | 아홉 | 구 |\n\n> 💡 다섯 개를 먼저 센 다음 "여섯, 일곱 …" 하고 이어 세면 쉬워요.\n\n> ⚠️ 6과 9는 모양이 비슷해요. 6은 동그라미가 아래에, 9는 동그라미가 위에 있어요.',
      easy: '두 손을 써 봐요. 한 손을 다 펴면 다섯이에요.\n\n다른 손 손가락을 하나씩 더 펴요. 여섯, 일곱, 여덟, 아홉이에요.\n\n그림에서도 윗줄 다섯 개를 먼저 세고, 아랫줄을 이어서 세어요.',
      fig: objs(7, '상자', '상자 7개 (윗줄 5개, 아랫줄 2개)'),
      check: {
        type: 'choice',
        q: '"여덟"을 수로 쓰면 무엇일까요?',
        choices: ['8', '6', '9'],
        answer: 0,
        why: ['', '6은 "여섯"이에요. 여섯, 일곱 다음이 여덟이에요.', '9는 "아홉"이에요. 여덟은 아홉 바로 앞이에요.'],
        explain: '여섯, 일곱, 여덟 — 여덟은 8이에요. 숫자로 읽으면 "팔"이에요.',
      },
    },
    {
      title: '몇째인지 알아보기',
      body: '순서를 말할 때는 이렇게 말해요.\n\n**첫째, 둘째, 셋째, 넷째, 다섯째, 여섯째, 일곱째, 여덟째, 아홉째**\n\n어디서부터 세는지가 중요해요.\n\n그림에서 색칠한 구슬은 **왼쪽에서 둘째**예요.\n\n오른쪽에서 세면 **넷째**예요.\n\n> 💡 "셋"은 모두 몇 개인지 말해요. "셋째"는 몇 번째인지 말해요.\n\n> ⚠️ 맨 처음은 "하나째"가 아니라 **첫째**예요.',
      easy: '줄을 설 때를 떠올려 봐요. 맨 앞 친구가 첫째예요.\n\n그 뒤가 둘째, 그 뒤가 셋째예요.\n\n친구를 한 명씩 짚으며 "첫째, 둘째, 셋째" 하고 세면 돼요.',
      fig: lineup(5, 1, ['왼쪽', '오른쪽'], null, '구슬 5개가 한 줄로 있고, 왼쪽에서 둘째 구슬이 색칠된 그림'),
      check: {
        type: 'ox',
        q: '"셋째"는 물건이 모두 3개 있다는 뜻이에요.',
        answer: false,
        explain: '"셋째"는 몇 번째인지, 곧 순서를 말해요. 모두 3개라는 뜻은 "셋"이에요.',
      },
    },
    {
      title: '1만큼 더 큰 수, 1만큼 더 작은 수',
      body: '수를 순서대로 써 봐요.\n\n1, 2, 3, 4, 5, 6, 7, 8, 9\n\n어떤 수 **바로 다음 수**는 1만큼 더 큰 수예요.\n\n어떤 수 **바로 앞의 수**는 1만큼 더 작은 수예요.\n\n4보다 1만큼 더 큰 수는 5예요.\n\n4보다 1만큼 더 작은 수는 3이에요.\n\n> 💡 큰 수부터 거꾸로 셀 때(9, 8, 7 …)는 다음 수가 1만큼 더 작아요.',
      easy: '계단을 떠올려 봐요. 한 칸 올라가면 1만큼 더 큰 수예요. 한 칸 내려가면 1만큼 더 작은 수예요.\n\n사탕 4개에 1개를 더 놓으면 5개가 돼요.\n\n사탕 4개에서 1개를 먹으면 3개가 남아요.',
      fig: { type: 'numberline', min: 0, max: 9, step: 1, points: [{ x: 4 }], arrows: [{ from: 4, to: 5 }, { from: 4, to: 3 }], alt: '수직선에서 4에서 오른쪽으로 한 칸 가면 5, 왼쪽으로 한 칸 가면 3' },
      check: {
        type: 'short', check: 'number',
        q: '7보다 1만큼 더 작은 수는 무엇일까요?',
        answer: '6',
        wrong: [{ a: '8', why: '1만큼 더 큰 수를 구했어요. 1만큼 더 작은 수는 바로 앞의 수예요.' }],
        explain: '수를 순서대로 세면 5, 6, 7이에요. 7 바로 앞의 수는 6이에요.',
      },
    },
    {
      title: '0 알아보기',
      body: '접시에 사과가 하나도 없어요.\n\n이때 사과의 수를 **0**이라고 써요.\n\n0은 **영**이라고 읽어요.\n\n1보다 1만큼 더 작은 수가 0이에요.\n\n그래서 수를 순서대로 쓰면 0이 맨 앞에 와요.\n\n0, 1, 2, 3, 4, 5, 6, 7, 8, 9',
      easy: '사탕이 1개 있었는데 내가 먹었어요. 이제 사탕은 하나도 없지요?\n\n하나도 없을 때 "0개"라고 해요.\n\n빈 상자, 빈 접시를 보면 0을 떠올려 보세요.',
      fig: plate(0, '아무것도 없는 빈 접시'),
      check: {
        type: 'choice',
        q: '사과 1개가 있는 접시에서 사과 1개를 먹었어요. 접시에 남은 사과는 몇 개일까요?',
        choices: ['0개', '1개', '2개'],
        answer: 0,
        why: ['', '먹기 전의 수예요. 1개를 먹으면 하나도 남지 않아요.', '1개를 더 놓았을 때의 수예요. 먹으면 수가 줄어요.'],
        explain: '1개를 먹으면 하나도 남지 않아요. 하나도 없으면 0개예요.',
      },
    },
    {
      title: '9까지 수의 크기 비교',
      body: '두 묶음을 하나씩 짝지어 봐요.\n\n짝이 없는 것이 남는 쪽이 더 **많아요**.\n\n그림에서 구슬과 상자를 짝지으면 구슬이 남아요. 구슬이 상자보다 많아요.\n\n이것을 수로 말하면 이렇게 해요.\n\n**5는 3보다 커요.** **3은 5보다 작아요.**\n\n> 💡 물건은 "많다, 적다"로 말해요. 수는 "크다, 작다"로 말해요.\n\n> 💡 수를 순서대로 셀 때 **뒤에 나오는 수가 더 커요.** 0부터 9까지 가운데 0이 가장 작아요.',
      easy: '수를 계단이라고 생각해 봐요. 0이 맨 아래 칸, 9가 맨 위 칸이에요.\n\n더 높은 칸에 있는 수가 더 커요.\n\n7은 4보다 높은 칸에 있어요. 그래서 7이 더 커요.',
      fig: pairRows(5, 3, '위에 구슬 5개, 아래에 상자 3개를 하나씩 짝지은 그림. 구슬 2개는 짝이 없어요'),
      check: {
        type: 'ox',
        q: '3은 7보다 커요.',
        answer: false,
        explain: '수를 순서대로 세면 3이 7보다 먼저 나와요. 그래서 3은 7보다 작아요.',
      },
    },
  ],

  examples: [
    {
      q: '사과가 3개 있어요. 1개를 더 놓으면 사과는 몇 개일까요?',
      fig: plate(3, '사과 3개가 놓인 접시'),
      steps: [
        '1개를 더 놓으면 1만큼 더 큰 수가 돼요.',
        '3 바로 다음 수를 찾아요. 1, 2, 3, **4**',
        '그래서 사과는 4개가 돼요.',
      ],
      answer: '4개',
    },
    {
      q: '색칠한 구슬은 왼쪽에서 몇째일까요? 오른쪽에서는 몇째일까요?',
      fig: lineup(6, 1, ['왼쪽', '오른쪽'], null, '구슬 6개가 한 줄로 있고, 왼쪽에서 둘째 구슬이 색칠된 그림'),
      steps: [
        '왼쪽 끝 구슬부터 "첫째, 둘째" 하고 짚어요. 색칠한 구슬은 둘째예요.',
        '이번에는 오른쪽 끝 구슬부터 짚어요. 첫째, 둘째, 셋째, 넷째, 다섯째!',
        '어디서부터 세는지에 따라 순서가 달라져요.',
      ],
      answer: '왼쪽에서 둘째, 오른쪽에서 다섯째',
    },
    {
      q: '6과 8 가운데 더 큰 수는 무엇일까요?',
      steps: [
        '수를 순서대로 세어 봐요. 5, 6, 7, 8',
        '8이 6보다 뒤에 나와요.',
        '뒤에 나오는 수가 더 커요. 그래서 8이 6보다 커요.',
      ],
      answer: '8',
    },
  ],

  terms: [
    { term: '수 세기', def: '물건을 하나씩 짚으며 "하나, 둘, 셋 …" 하고 세는 것이에요. 마지막에 말한 수가 모두 몇 개인지 알려 줘요.' },
    { term: '0', def: '아무것도 없을 때 쓰는 수예요. "영"이라고 읽어요. 예: 빈 접시에 있는 사과는 0개예요.' },
    { term: '첫째', def: '순서에서 맨 처음이에요. 그다음은 둘째, 셋째, 넷째 …예요.' },
    { term: '몇째', def: '몇 번째인지, 곧 순서를 묻는 말이에요. 예: 왼쪽에서 셋째' },
    { term: '1만큼 더 큰 수', def: '수를 순서대로 셀 때 바로 다음 수예요. 예: 4보다 1만큼 더 큰 수는 5예요.' },
    { term: '1만큼 더 작은 수', def: '수를 순서대로 셀 때 바로 앞의 수예요. 예: 4보다 1만큼 더 작은 수는 3이에요.' },
    { term: '크다, 작다', def: '두 수를 비교할 때 써요. 예: 7은 5보다 커요. 5는 7보다 작아요.' },
    { term: '많다, 적다', def: '물건의 수를 비교할 때 써요. 예: 사탕 5개는 사탕 3개보다 많아요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '구슬은 모두 몇 개일까요?',
      fig: objs(4, '구슬', '구슬이 놓인 그림'),
      choices: ['4', '3', '5'],
      answer: 0,
      why: ['', '하나를 빠뜨렸어요. 센 구슬을 하나씩 짚으며 다시 세어 보세요.', '하나를 두 번 셌어요. 센 구슬은 짚어 두고 세어 보세요.'],
      explain: '하나씩 짚으며 세면 하나, 둘, 셋, 넷이에요. 구슬은 모두 4개예요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '별은 모두 몇 개일까요?',
      fig: objs(7, '별', '별이 놓인 그림'),
      answer: '7',
      wrong: [
        { a: '6', why: '하나를 빠뜨렸어요. 센 별은 손가락으로 짚으며 다시 세어 보세요.' },
        { a: '8', why: '하나를 두 번 셌어요. 센 별은 짚어 두고 세어 보세요.' },
      ],
      explain: '윗줄에서 하나, 둘, 셋, 넷, 다섯을 세고 아랫줄에서 여섯, 일곱 하고 이어 세요. 별은 모두 7개예요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 0,
      q: '"셋"을 수로 바르게 쓴 것은 무엇일까요?',
      choices: ['3', '2', '4'],
      answer: 0,
      why: ['', '2는 "둘"이에요. 하나, 둘, 셋 하고 세어 보세요.', '4는 "넷"이에요. 셋은 넷 바로 앞이에요.'],
      explain: '하나, 둘, 셋 — 셋은 3이에요. 숫자로 읽으면 "삼"이에요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 1,
      q: '"일곱"과 같은 수는 무엇일까요?',
      choices: ['7', '6', '8', '1'],
      answer: 0,
      why: [
        '',
        '6은 "여섯"이에요. 일곱은 여섯 바로 다음이에요.',
        '8은 "여덟"이에요. 일곱은 여덟 바로 앞이에요.',
        '"일"과 "일곱"을 헷갈렸어요. "일"은 1을 숫자로 읽은 말이에요.',
      ],
      explain: '여섯, 일곱 — 일곱은 7이에요. 7을 숫자로 읽으면 "칠"이에요.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 4,
      q: '빈 접시에 있는 사과의 수는 0이에요.',
      fig: plate(0, '아무것도 없는 빈 접시'),
      answer: true,
      explain: '맞아요. 사과가 하나도 없으니 0이에요. 0은 "영"이라고 읽어요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', concept: 3,
      q: '수를 순서대로 썼어요. [[?]]에 알맞은 수는 무엇일까요?\n\n4, 5, [[?]], 7, 8',
      answer: '6',
      explain: '4, 5 다음에 오는 수는 6이에요. 6 다음이 7, 8이에요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'number', concept: 4,
      q: '1보다 1만큼 더 작은 수는 무엇일까요?',
      answer: '0',
      wrong: [{ a: '2', why: '1만큼 더 큰 수를 구했어요. 1만큼 더 작은 수는 바로 앞의 수예요.' }],
      explain: '수를 순서대로 쓰면 0, 1, 2 …예요. 1 바로 앞의 수는 0이에요. 0은 하나도 없는 것을 나타내요.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 2,
      q: '색칠한 구슬은 왼쪽에서 몇째일까요?',
      fig: lineup(6, 3, ['왼쪽', '오른쪽'], null, '구슬 6개가 한 줄로 있고 그중 하나가 색칠된 그림'),
      choices: ['넷째', '셋째', '다섯째', '넷'],
      answer: 0,
      why: [
        '',
        '오른쪽에서 셌어요. 왼쪽 끝 구슬부터 "첫째" 하고 세어 보세요.',
        '하나 더 셌어요. 왼쪽 끝 구슬을 "첫째"로 하고 하나씩 짚어 보세요.',
        '"넷"은 모두 몇 개인지 말할 때 써요. 순서는 "넷째"라고 해요.',
      ],
      explain: '왼쪽 끝 구슬부터 첫째, 둘째, 셋째, 넷째 하고 짚어요. 색칠한 구슬은 왼쪽에서 넷째예요. 오른쪽에서 세면 셋째예요.',
    },
    {
      id: 'p9', level: 1, type: 'choice', concept: 5,
      q: '구슬과 상자 가운데 어느 것이 더 많을까요?',
      fig: pairRows(4, 6, '위에 구슬, 아래에 상자를 하나씩 짝지은 그림'),
      choices: ['상자', '구슬', '똑같아요'],
      answer: 0,
      why: ['', '짝지어 보면 짝이 없는 상자가 남아요. 남는 쪽이 더 많아요.', '하나씩 짝지어 보세요. 짝이 없는 상자가 있어요.'],
      explain: '구슬과 상자를 하나씩 짝지으면 상자 2개가 남아요. 그래서 상자가 더 많아요. 수로 말하면 6은 4보다 커요.',
    },
    {
      id: 'p10', level: 2, type: 'order', concept: 5,
      q: '**큰 수부터** 순서대로 놓으세요.',
      choices: ['5', '9', '0', '7'],
      answer: [1, 3, 0, 2],
      hint: '수를 순서대로 셀 때 가장 뒤에 나오는 수가 가장 커요.',
      explain: '0부터 세면 0, 5, 7, 9 순서로 나와요. 큰 수부터 놓으면 9, 7, 5, 0이에요. 0이 가장 작아요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '도윤이는 구슬을 8개 가지고 있었어요. 그중 1개를 동생에게 주었어요. 도윤이에게 남은 구슬은 몇 개일까요?',
      answer: '7',
      hint: '1개를 주면 1만큼 더 큰 수가 될까요, 1만큼 더 작은 수가 될까요?',
      wrong: [{ a: '9', why: '1개를 받은 것이 아니라 준 거예요. 주면 수가 줄어요. 1만큼 더 작은 수를 생각해요.' }],
      explain: '1개를 주면 1만큼 더 작은 수가 돼요. 8 바로 앞의 수는 7이에요. 남은 구슬은 7개예요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 2,
      q: '어린이 7명이 한 줄로 서 있어요. 하윤이는 앞에서 셋째예요. 하윤이 바로 뒤에 선 어린이는 앞에서 몇째일까요?',
      choices: ['넷째', '둘째', '셋째', '다섯째'],
      answer: 0,
      why: [
        '',
        '하윤이 바로 앞에 선 어린이를 생각했어요. 바로 뒤는 셋째 다음이에요.',
        '하윤이의 순서예요. 하윤이 바로 뒤에 선 어린이를 찾아요.',
        '한 명을 더 건너뛰었어요. 바로 뒤는 셋째 다음 하나예요.',
      ],
      hint: '동그라미 7개를 그리고 앞에서 셋째에 색칠해 보세요.',
      explain: '앞에서 첫째, 둘째, 셋째가 하윤이에요. 하윤이 바로 뒤는 셋째 다음인 넷째예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 3,
      q: '어떤 수보다 1만큼 더 큰 수는 6이에요. 어떤 수는 무엇일까요?',
      answer: '5',
      hint: '어떤 수 바로 다음 수가 6이에요.',
      wrong: [{ a: '7', why: '6보다 1만큼 더 큰 수를 구했어요. 어떤 수 바로 다음이 6이니, 어떤 수는 6 바로 앞의 수예요.' }],
      explain: '어떤 수 바로 다음 수가 6이에요. 그러니 어떤 수는 6 바로 앞의 수인 5예요. 5보다 1만큼 더 큰 수가 6이 맞아요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: '개', concept: 5,
      q: '5보다 크고 8보다 작은 수는 모두 몇 개일까요?',
      answer: '2',
      hint: '5와 8 사이에 있는 수를 하나씩 써 보세요.',
      wrong: [{ a: '4', why: '5와 8도 넣었어요. 5보다 커야 하고 8보다 작아야 하니 5와 8은 빼요.' }],
      explain: '5와 8 사이의 수는 6, 7이에요. 그래서 모두 2개예요. 5와 8은 넣지 않아요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 2,
      q: '어린이 9명이 한 줄로 서 있어요. 지아는 앞에서 셋째예요. 지아는 뒤에서 몇째일까요?',
      choices: ['일곱째', '셋째', '여섯째', '여덟째'],
      answer: 0,
      why: [
        '',
        '앞에서 센 순서예요. 뒤에서부터 다시 세어야 해요.',
        '하나 덜 셌어요. 동그라미 9개를 그려서 뒤에서부터 짚어 보세요.',
        '하나 더 셌어요. 동그라미 9개를 그려서 뒤에서부터 짚어 보세요.',
      ],
      hint: '동그라미 9개를 그리고 앞에서 셋째에 색칠해 보세요.',
      explain: '동그라미 9개를 그리고 앞에서 셋째에 색칠해요. 이번에는 뒤에서부터 첫째, 둘째, 셋째, 넷째, 다섯째, 여섯째, 일곱째 하고 짚으면 색칠한 동그라미에 닿아요. 지아는 뒤에서 일곱째예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: '개', concept: 4,
      q: '0부터 9까지의 수 가운데 4보다 작은 수는 모두 몇 개일까요?',
      answer: '4',
      hint: '0도 수예요. 0부터 하나씩 써 보세요.',
      wrong: [
        { a: '3', why: '0을 빠뜨렸어요. 0도 4보다 작은 수예요.' },
        { a: '5', why: '4까지 넣었어요. 4보다 작은 수에 4는 들어가지 않아요.' },
      ],
      explain: '4보다 작은 수는 0, 1, 2, 3이에요. 그래서 모두 4개예요. 0을 빠뜨리지 않게 조심해요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 5,
      q: '수 카드 6, 2, 9, 0, 4가 있어요. **둘째로 큰 수**는 무엇일까요?',
      choices: ['6', '9', '4', '2'],
      answer: 0,
      why: [
        '',
        '9는 가장 큰 수예요. 그다음으로 큰 수를 찾아요.',
        '4는 셋째로 큰 수예요. 큰 수부터 9, 6, 4 … 순서예요.',
        '작은 수부터 셌어요. 2는 작은 쪽에서 둘째예요.',
      ],
      hint: '큰 수부터 순서대로 늘어놓아 보세요.',
      explain: '큰 수부터 놓으면 9, 6, 4, 2, 0이에요. 첫째로 큰 수가 9, 둘째로 큰 수가 6이에요.',
    },
  ],

  deeper: [
    {
      title: '수가 하는 여러 가지 일',
      body: '수는 여러 가지 일을 해요.\n\n- **몇 개인지**: 사탕 5개, 연필 3자루\n- **몇째인지**: 달리기 둘째, 줄 선 순서 셋째\n- **이름처럼**: 버스 번호, 사물함 번호\n\n"사탕 3개"는 몇 개인지 말해요. "3층"은 몇째 층인지 말해요.\n\n집에서 수를 찾아보세요. 그 수가 어떤 일을 하는지 말해 보세요.',
    },
    {
      title: '9 다음은 어떤 수일까?',
      body: '9보다 1만큼 더 큰 수는 **10**이에요. 10은 "열" 또는 "십"이라고 읽어요.\n\n10부터는 숫자 두 개로 써요. 이것은 1학년의 "50까지의 수" 단원에서 자세히 배워요.\n\n"1만큼 더 큰 수"는 곧 배울 덧셈과도 이어져요. 4보다 1만큼 더 큰 수가 5인 것처럼, 하나를 더하면 바로 다음 수가 돼요.',
    },
  ],

  faq: [
    { q: '하나랑 일은 뭐가 달라요?', a: '둘 다 1을 읽는 말이에요. 물건을 셀 때는 "하나, 둘, 셋"이라고 해요. 숫자를 읽거나 층, 번호를 말할 때는 "일, 이, 삼"이라고 해요.' },
    { q: '왜 "셋 개"라고 안 하고 "세 개"라고 해요?', a: '"개", "마리", "명" 같은 말 앞에서는 모양이 조금 바뀌어요.\n\n하나 → **한** 개, 둘 → **두** 개, 셋 → **세** 개, 넷 → **네** 개예요.\n\n다섯부터는 그대로 다섯 개, 여섯 개라고 해요.' },
    { q: '0도 수예요?', a: '네, 0도 수예요. 아무것도 없을 때 0을 써요. 0은 1보다 1만큼 더 작은 수예요. 0부터 9까지 가운데 가장 작아요.' },
    { q: '왜 "하나째"가 아니라 "첫째"예요?', a: '우리말에서 맨 처음 순서는 "첫째"라고 해요. "첫날", "첫 번째"처럼 "첫"이 맨 처음을 뜻해요. 그다음부터는 둘째, 셋째, 넷째처럼 세는 말에 "째"를 붙여요.' },
  ],

  mistakes: [
    '"셋"과 "셋째"를 헷갈리는 실수 — 셋은 모두 몇 개인지, 셋째는 몇 번째인지예요.',
    '물건을 셀 때 하나를 빠뜨리거나 두 번 세는 실수 — 센 것은 손가락으로 짚거나 표시해 두어요.',
    '6과 9를 바꿔 쓰는 실수 — 6은 동그라미가 아래에, 9는 동그라미가 위에 있어요.',
  ],

  gens: [
    {
      id: 'count-read',
      level: 1,
      title: '세어서 수로 나타내고 두 가지로 읽기',
      make: function (R) {
        var mode = R.int(0, 2);
        var n = R.int(1, 9);
        var concept = n <= 5 ? 0 : 1;
        if (mode === 0) {
          // 그림의 물건 세기
          var kind = R.pick(KINDS);
          var wrong = [];
          if (n > 1) wrong.push({ a: String(n - 1), why: '하나를 빠뜨렸어요. 센 ' + kind + R.josa(kind, '은/는') + ' 손가락으로 짚으며 다시 세어 보세요.' });
          if (n < 9) wrong.push({ a: String(n + 1), why: '하나를 두 번 셌어요. 센 ' + kind + R.josa(kind, '은/는') + ' 짚어 두고 세어 보세요.' });
          return {
            type: 'short', check: 'number', unit: '개', concept: concept,
            q: kind + R.josa(kind, '은/는') + ' 모두 몇 개일까요?',
            fig: objs(n, kind, kind + R.josa(kind, '이/가') + ' 놓인 그림'),
            answer: String(n),
            wrong: wrong,
            explain: (n > 5 ? '윗줄 다섯 개를 먼저 세고 아랫줄을 이어서 세어요. ' : '') +
              '하나씩 짚으며 세면 ' + NAT.slice(1, n + 1).join(', ') + R.josa(NAT[n], '이에요/예요') + '. 모두 ' + n + '개예요.',
          };
        }
        if (mode === 1) {
          // 수를 두 가지로 읽기
          var pair = function (a, b) { return NAT[a] + ', ' + SINO[b]; };
          var adj = n < 9 ? n + 1 : n - 1;
          var cands = [
            [pair(n, adj), '"' + SINO[adj] + '"' + R.josa(SINO[adj], '은/는') + ' ' + adj + R.josa(adj, '을/를') + ' 숫자로 읽는 말이에요. ' + n + R.josa(n, '은/는') + ' "' + SINO[n] + '"' + R.josa(SINO[n], '이에요/예요') + '.'],
            [pair(adj, n), '"' + NAT[adj] + '"' + R.josa(NAT[adj], '은/는') + ' ' + adj + R.josa(adj, '을/를') + ' 셀 때 하는 말이에요. ' + n + R.josa(n, '은/는') + ' "' + NAT[n] + '"' + R.josa(NAT[n], '이에요/예요') + '.'],
          ];
          if (n > 1) cands.push([pair(n - 1, n - 1), (n - 1) + R.josa(n - 1, '을/를') + ' 읽었어요. ' + n + R.josa(n, '은/는') + ' "' + NAT[n] + '", "' + SINO[n] + '"' + R.josa(SINO[n], '이에요/예요') + '.']);
          if (n < 9) cands.push([pair(n + 1, n + 1), (n + 1) + R.josa(n + 1, '을/를') + ' 읽었어요. ' + n + R.josa(n, '은/는') + ' "' + NAT[n] + '", "' + SINO[n] + '"' + R.josa(SINO[n], '이에요/예요') + '.']);
          cands = R.shuffle(cands);
          var reason = {};
          cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
          var correct = pair(n, n);
          var pick = R.choices(correct, cands.map(function (c) { return c[0]; }), 3);
          return {
            type: 'choice', concept: concept,
            q: n + R.josa(n, '을/를') + ' 두 가지로 바르게 읽은 것은 무엇일까요?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: n + R.josa(n, '은/는') + ' 셀 때 "' + NAT[n] + '", 숫자로 읽을 때 "' + SINO[n] + '"' + R.josa(SINO[n], '이라고/라고') + ' 해요.',
          };
        }
        // 셀 때 읽는 말 → 수
        var list = [];
        if (n === 7) list.push(['1', '"일"과 "일곱"을 헷갈렸어요. "일"은 1을 숫자로 읽은 말이에요.']);
        if (n === 6) list.push(['9', '6과 9는 모양이 비슷해요. 6은 동그라미가 아래에 있어요.']);
        if (n === 9) list.push(['6', '6과 9는 모양이 비슷해요. 9는 동그라미가 위에 있어요.']);
        var near = R.shuffle([n - 1, n + 1].filter(function (v) { return v >= 1 && v <= 9; }));
        if (n === 1 || n === 9) near.push(n === 1 ? 3 : 7);
        near.forEach(function (v) {
          list.push([String(v), v + R.josa(v, '은/는') + ' "' + NAT[v] + '"' + R.josa(NAT[v], '이에요/예요') + '. 하나부터 차례대로 세어 보세요.']);
        });
        var why2 = {};
        list.forEach(function (c) { if (!(c[0] in why2)) why2[c[0]] = c[1]; });
        var pick2 = R.choices(String(n), list.map(function (c) { return c[0]; }), 3);
        return {
          type: 'choice', concept: concept,
          q: '"' + NAT[n] + '"' + R.josa(NAT[n], '과/와') + ' 같은 수는 무엇일까요?',
          choices: pick2.choices,
          answer: pick2.answer,
          why: pick2.choices.map(function (c) { return c === String(n) ? '' : why2[c] || ''; }),
          explain: '"' + NAT[n] + '"' + R.josa(NAT[n], '은/는') + ' ' + n + R.josa(n, '이에요/예요') + '. 숫자로 읽으면 "' + SINO[n] + '"' + R.josa(SINO[n], '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'one-more-less',
      level: 1,
      title: '1만큼 더 큰 수·1만큼 더 작은 수와 수의 순서',
      make: function (R) {
        if (R.bool(0.6)) {
          var more = R.bool();
          var n = more ? R.int(0, 8) : R.int(1, 9);
          var ans = more ? n + 1 : n - 1;
          var opp = more ? n - 1 : n + 1;
          var lo = Math.min(n, ans);
          var p = {
            type: 'short', check: 'number', concept: n === 0 || ans === 0 ? 4 : 3,
            q: n + '보다 1만큼 더 ' + (more ? '큰' : '작은') + ' 수는 무엇일까요?',
            answer: String(ans),
            wrong: opp >= 0 && opp <= 9 ? [{ a: String(opp), why: more ? '1만큼 더 작은 수를 구했어요. 1만큼 더 큰 수는 바로 다음 수예요.' : '1만큼 더 큰 수를 구했어요. 1만큼 더 작은 수는 바로 앞의 수예요.' }] : [],
            explain: '수를 순서대로 쓰면 ' + lo + ', ' + (lo + 1) + R.josa(lo + 1, '이에요/예요') + '. ' + n + ' 바로 ' + (more ? '다음' : '앞의') + ' 수는 ' + ans + R.josa(ans, '이에요/예요') + '.' +
              (ans === 0 ? ' 0은 하나도 없는 것을 나타내요.' : ''),
          };
          if (R.bool()) p.fig = { type: 'numberline', min: 0, max: 9, step: 1, points: [{ x: n }], alt: '0부터 9까지의 수직선에 ' + n + R.josa(n, '이/가') + ' 표시된 그림' };
          return p;
        }
        // 순서대로(또는 거꾸로) 쓴 수의 빈칸
        var asc = R.bool();
        var start = asc ? R.int(0, 5) : R.int(4, 9);
        var seq = [];
        for (var i = 0; i < 5; i++) seq.push(asc ? start + i : start - i);
        var b = R.int(1, 3);
        var x = seq[b], prev = seq[b - 1];
        var shown = seq.map(function (v, j) { return j === b ? '[[?]]' : String(v); }).join(', ');
        var wrong = [];
        if (!asc && prev + 1 <= 9) wrong.push({ a: String(prev + 1), why: '큰 수부터 거꾸로 쓴 거예요. 수가 1만큼씩 작아지니 ' + prev + ' 바로 앞의 수를 써요.' });
        return {
          type: 'short', check: 'number', concept: 3,
          q: (asc ? '수를 작은 수부터 순서대로 썼어요.' : '수를 큰 수부터 거꾸로 썼어요.') + ' [[?]]에 알맞은 수는 무엇일까요?\n\n' + shown,
          answer: String(x),
          wrong: wrong,
          explain: asc
            ? prev + ' 바로 다음 수는 ' + x + R.josa(x, '이에요/예요') + '. ' + x + ' 다음이 ' + seq[b + 1] + R.josa(seq[b + 1], '이에요/예요') + '.'
            : '거꾸로 셀 때는 1만큼씩 작아져요. ' + prev + ' 바로 앞의 수는 ' + x + R.josa(x, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'compare',
      level: 1,
      title: '9까지 수의 크기 비교',
      make: function (R) {
        var DIG = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        if (R.bool()) {
          var ab = R.sample(DIG, 2), a = ab[0], b = ab[1];
          var saysBig = R.bool();
          var lo = Math.min(a, b), hi = Math.max(a, b);
          return {
            type: 'ox', concept: 5,
            q: a + R.josa(a, '은/는') + ' ' + b + '보다 ' + (saysBig ? '커요' : '작아요') + '.',
            answer: saysBig ? a > b : a < b,
            explain: '수를 순서대로 세면 ' + lo + R.josa(lo, '이/가') + ' ' + hi + '보다 먼저 나와요. 그래서 ' + a + R.josa(a, '은/는') + ' ' + b + '보다 ' + (a > b ? '커요' : '작아요') + '.',
          };
        }
        var nums = R.sample(DIG, 3);
        var askBig = R.bool();
        var s = nums.slice().sort(function (x, y) { return x - y; });
        var target = askBig ? s[2] : s[0];
        var opposite = askBig ? s[0] : s[2];
        return {
          type: 'choice', concept: 5,
          q: '세 수 가운데 가장 ' + (askBig ? '큰' : '작은') + ' 수는 무엇일까요?',
          choices: nums.map(String),
          answer: nums.indexOf(target),
          why: nums.map(function (v) {
            if (v === target) return '';
            if (v === opposite) return askBig ? '가장 작은 수를 골랐어요. 가장 큰 수는 순서대로 셀 때 가장 뒤에 나와요.' : '가장 큰 수를 골랐어요. 가장 작은 수는 순서대로 셀 때 가장 먼저 나와요.';
            return '가운데 수예요. ' + target + R.josa(target, '이/가') + ' ' + v + '보다 더 ' + (askBig ? '커요' : '작아요') + '.';
          }),
          explain: '작은 수부터 놓으면 ' + s.join(', ') + R.josa(s[2], '이에요/예요') + '. 가장 ' + (askBig ? '큰' : '작은') + ' 수는 ' + target + R.josa(target, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'ordinal',
      level: 2,
      title: '몇째인지 알아보기',
      make: function (R) {
        if (R.bool()) {
          // 색칠한 구슬은 왼쪽(오른쪽)에서 몇째?
          var n = R.int(5, 9), hi = R.int(0, n - 1), left = R.bool();
          var side = left ? '왼쪽' : '오른쪽', other = left ? '오른쪽' : '왼쪽';
          var pos = left ? hi + 1 : n - hi, opos = left ? n - hi : hi + 1;
          var cands = [];
          if (opos !== pos) cands.push([ORD[opos], other + '에서 셌어요. ' + side + ' 끝 구슬부터 "첫째" 하고 세어 보세요.']);
          if (pos > 1) cands.push([ORD[pos - 1], '하나 덜 셌어요. ' + side + ' 끝 구슬을 "첫째"로 하고 하나씩 짚어 보세요.']);
          if (pos < 9) cands.push([ORD[pos + 1], '하나 더 셌어요. ' + side + ' 끝 구슬을 "첫째"로 하고 하나씩 짚어 보세요.']);
          cands.push([NAT[pos], '"' + NAT[pos] + '"' + R.josa(NAT[pos], '은/는') + ' 모두 몇 개인지 말할 때 써요. 순서는 "' + ORD[pos] + '"라고 해요.']);
          var reason = {};
          cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
          var pick = R.choices(ORD[pos], cands.map(function (c) { return c[0]; }), 4);
          return {
            type: 'choice', concept: 2,
            q: '색칠한 구슬은 ' + side + '에서 몇째일까요?',
            fig: lineup(n, hi, ['왼쪽', '오른쪽'], null, '구슬 ' + n + '개가 한 줄로 있고 그중 하나가 색칠된 그림'),
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === ORD[pos] ? '' : reason[c] || ''; }),
            explain: side + ' 끝 구슬부터 ' + ORD.slice(1, pos + 1).join(', ') + ' 하고 짚어요. 색칠한 구슬은 ' + side + '에서 ' + ORD[pos] + '예요. ' +
              other + (opos === pos ? '에서 세어도 ' : '에서 세면 ') + ORD[opos] + '예요.',
          };
        }
        // 줄 선 어린이: 앞(뒤)에서 몇째는 누구?
        var m = R.int(4, 6), names = R.sample(NAMES, m), front = R.bool(), k = R.int(1, m);
        var dir = front ? '앞' : '뒤', odir = front ? '뒤' : '앞';
        var idx = front ? k - 1 : m - k, mirror = front ? m - k : k - 1;
        var correct = names[idx];
        var why = {}, list = [];
        function add(i, w) {
          if (i < 0 || i >= m || i === idx || names[i] in why) return;
          why[names[i]] = w;
          list.push(names[i]);
        }
        add(mirror, odir + '에서 셌어요. ' + dir + '에서부터 세어 보세요.');
        add(idx - 1, '한 칸 옆의 어린이예요. ' + dir + '에서부터 "첫째, 둘째 …" 하고 한 명씩 짚어 보세요.');
        add(idx + 1, '한 칸 옆의 어린이예요. ' + dir + '에서부터 "첫째, 둘째 …" 하고 한 명씩 짚어 보세요.');
        for (var j = 0; j < m; j++) add(j, dir + '에서부터 한 명씩 짚으며 "' + ORD[k] + '"까지 다시 세어 보세요.');
        var pick2 = R.choices(correct, list, 4);
        var steps = [];
        for (var t = 1; t <= k; t++) steps.push(ORD[t] + ' ' + names[front ? t - 1 : m - t]);
        return {
          type: 'choice', concept: 2,
          q: '어린이 ' + m + '명이 한 줄로 서 있어요. 맨 앞부터 차례대로 ' + names.join(', ') + R.josa(names[m - 1], '이에요/예요') + '.\n\n**' + dir + '에서 ' + ORD[k] + '**에 선 어린이는 누구일까요?',
          fig: lineup(m, -1, ['앞', '뒤'], names, '어린이 ' + m + '명이 한 줄로 선 그림. 왼쪽이 맨 앞이에요'),
          choices: pick2.choices,
          answer: pick2.answer,
          why: pick2.choices.map(function (c) { return c === correct ? '' : why[c] || ''; }),
          explain: dir + '에서부터 세면 ' + steps.join(', ') + R.josa(correct, '이에요/예요') + '. 그래서 ' + dir + '에서 ' + ORD[k] + '는 ' + correct + R.josa(correct, '이에요/예요') + '.',
        };
      },
    },
  ],
});
})();
