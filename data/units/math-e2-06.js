/* 2학년 수학 · 곱셈
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 곱셈구구는 다음 단원(math-e2-08)에서 배운다. 이 단원의 곱은 뛰어 세기·같은 수 더하기로 구한다.
 * 그림: 묶음·연결 모형은 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  // b개씩 a묶음 (묶음마다 점선 상자, 상자 안에 한 줄 3개씩)
  function groups(a, b, alt) {
    var per = Math.min(b, 3), rows = Math.ceil(b / 3);
    var gw = per * 20 + 12, gh = rows * 20 + 12, gap = 12;
    var W = Math.max(200, a * (gw + gap) + gap), H = gh + 20, body = '';
    for (var g = 0; g < a; g++) {
      var x0 = gap + g * (gw + gap), y0 = 10;
      body += '<rect x="' + x0 + '" y="' + y0 + '" width="' + gw + '" height="' + gh + '" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>';
      for (var i = 0; i < b; i++) {
        body += '<circle cx="' + (x0 + 16 + (i % 3) * 20) + '" cy="' + (y0 + 16 + Math.floor(i / 3) * 20) + '" r="7" fill="var(--fig-2)" fill-opacity="0.7" stroke="currentColor" stroke-width="1.5"/>';
      }
    }
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' ' + H + '">' + body + '</svg>', alt: alt || b + '개씩 ' + a + '묶음으로 묶은 그림' };
  }
  // 연결 모형: 윗줄 base 개, 아랫줄 base 개씩 times 번 (묶음마다 색을 번갈아)
  function rods(base, times, alt) {
    var S = 20, W = Math.max(200, base * times * S + 70), body = '';
    function cube(x, y, c) { return '<rect x="' + x + '" y="' + y + '" width="' + (S - 2) + '" height="' + (S - 2) + '" fill="' + c + '" fill-opacity="0.6" stroke="currentColor" stroke-width="1.5"/>'; }
    body += '<text x="8" y="29" font-size="13" fill="currentColor">가</text>';
    for (var i = 0; i < base; i++) body += cube(40 + i * S, 14, 'var(--fig-1)');
    body += '<text x="8" y="69" font-size="13" fill="currentColor">나</text>';
    for (var t = 0; t < times; t++) {
      for (var j = 0; j < base; j++) body += cube(40 + (t * base + j) * S, 54, t % 2 ? 'var(--fig-3)' : 'var(--fig-1)');
    }
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' 86">' + body + '</svg>', alt: alt || '가는 연결 모형 ' + base + '개, 나는 ' + base + '개씩 ' + times + '번 이은 연결 모형' };
  }
  // 0부터 b씩 n번 뛰어 센 수직선
  function jumps(b, n, max) {
    var arr = [];
    for (var i = 0; i < n; i++) arr.push({ from: b * i, to: b * (i + 1) });
    return { type: 'numberline', min: 0, max: max, step: 1, labelEvery: max > 20 ? 5 : 2, arrows: arr };
  }
  function addList(a, n) {
    var s = [];
    for (var i = 0; i < n; i++) s.push(a);
    return s.join('+');
  }
  function skipList(a, n) {
    var s = [];
    for (var i = 1; i <= n; i++) s.push(a * i);
    return s.join(', ');
  }
  function wrongs(ans, list) {
    var seen = {}, out = [];
    seen[ans] = true;
    list.forEach(function (w) {
      if (w[0] > 0 && !seen[w[0]]) { seen[w[0]] = true; out.push({ a: String(w[0]), why: w[1] }); }
    });
    return out;
  }

Tutor.registerUnit({
  id: 'math-e2-06',
  course: 'math-e2',
  title: '곱셈',
  summary: '묶어 세기와 몇의 몇 배를 알아보고, 같은 수를 여러 번 더하는 것을 곱셈식으로 나타내요.',
  goals: [
    '뛰어 세기와 묶어 세기로 물건의 수를 셀 수 있어요.',
    '몇의 몇 배를 알 수 있어요.',
    '곱셈식을 읽고 쓸 수 있어요.',
    '같은 수를 여러 번 더한 것과 생활 속 상황을 곱셈식으로 나타낼 수 있어요.',
  ],
  standards: ['[2수01-10]'],

  concepts: [
    {
      title: '여러 가지 방법으로 세기',
      body: '물건이 많을 때는 여러 방법으로 셀 수 있어요.\n\n- **하나씩 세기**: 1, 2, 3, 4, …\n- **뛰어 세기**: 몇씩 건너뛰며 세어요. 3씩 뛰어 세면 3, 6, 9, 12\n- **묶어 세기**: 몇 개씩 묶어서 세어요. 3개씩 4묶음이에요.\n\n그림의 구슬은 3개씩 4묶음이에요. 3씩 뛰어 세면 3, 6, 9, 12이므로 모두 12개예요.\n\n> 💡 묶어 세면 하나씩 셀 때보다 빠르고 덜 틀려요.',
      easy: '신발을 셀 때 "둘, 넷, 여섯, 여덟" 하고 세어 본 적 있지요?\n\n신발은 2짝이 한 켤레라서 2씩 세면 빨라요.\n\n이렇게 몇씩 건너뛰며 세는 것이 **뛰어 세기**예요.',
      fig: groups(4, 3, '구슬을 3개씩 4묶음으로 묶은 그림'),
      check: {
        type: 'choice',
        q: '4씩 뛰어 세어 보세요. 4, 8, [[?]]에 알맞은 수는 무엇일까요?',
        choices: ['12', '9', '10'],
        answer: 0,
        why: ['', '1씩 뛰어 셌어요. 8에서 4만큼 더 가요.', '2씩 뛰어 셌어요. 8에서 4만큼 더 가요.'],
        explain: '4씩 뛰어 세면 4, 8, 12예요. 8에서 4만큼 더 가면 12예요.',
      },
    },
    {
      title: '몇의 몇 배',
      body: '3씩 4묶음을 **3의 4배**라고 해요.\n\n"3을 4번 모은 것"이라는 뜻이에요.\n\n그림에서 나는 가를 4번 이은 것이에요. 그래서 나는 가의 4배예요.\n\n3의 4배는 $3+3+3+3=12$예요.\n\n> ⚠️ 3씩 4묶음은 "3의 4배"예요. 묶음 하나에 든 수를 먼저 말해요.',
      easy: '사탕 봉지 하나에 사탕이 3개 들어 있어요.\n\n봉지가 4개면 사탕은 "3의 4배"만큼 있어요.\n\n봉지 하나에 든 수(3)가 앞에, 봉지 수(4)가 뒤에 와요.',
      fig: rods(3, 4, '가는 연결 모형 3개, 나는 3개씩 4번 이은 연결 모형 12개'),
      check: {
        type: 'choice',
        q: '5씩 3묶음을 몇의 몇 배로 나타낸 것은 무엇일까요?',
        choices: ['5의 3배', '3의 5배', '5의 5배'],
        answer: 0,
        why: ['', '3의 5배는 3씩 5묶음이에요. 묶음 하나에 든 수 5를 앞에 써요.', '묶음은 3개예요. 5씩 3묶음이니 5의 3배예요.'],
        explain: '묶음 하나에 5개씩, 3묶음이므로 5의 3배예요.',
      },
    },
    {
      title: '곱셈식 읽고 쓰기',
      body: '3의 4배를 **곱셈식**으로 이렇게 써요.\n\n$3 \\times 4 = 12$\n\n$\\times$는 곱하기 기호예요.\n\n| 읽는 방법 |\n|---|\n| 3 곱하기 4는 12와 같습니다. |\n| 3과 4의 곱은 12입니다. |\n\n12는 3과 4의 **곱**이에요.',
      easy: '"3의 4배"를 짧게 쓰는 방법이 곱셈식이에요.\n\n"의 ○배" 대신 $\\times$ 기호를 써요.\n\n3의 4배 → $3 \\times 4$\n\n답까지 쓰면 $3 \\times 4 = 12$예요.',
      check: {
        type: 'choice',
        q: '$4 \\times 2 = 8$을 바르게 읽은 것은 무엇일까요?',
        choices: ['4 곱하기 2는 8과 같습니다.', '4 더하기 2는 8과 같습니다.', '4와 2의 합은 8입니다.'],
        answer: 0,
        why: ['', '$\\times$는 더하기가 아니라 곱하기예요.', '"합"은 더한 결과예요. 곱셈의 결과는 "곱"이라고 해요.'],
        explain: '$\\times$는 "곱하기"라고 읽어요. 4와 2의 곱은 8이라고도 읽어요.',
      },
    },
    {
      title: '덧셈식을 곱셈식으로',
      body: '같은 수를 여러 번 더한 덧셈식은 곱셈식으로 나타낼 수 있어요.\n\n$6+6+6=18$ → $6 \\times 3 = 18$\n\n**6이 몇 번 더해졌는지** 세어요. 6이 3번이니 $6 \\times 3$이에요.\n\n> ⚠️ 더하기 기호(+)의 수를 세면 안 돼요. $6+6+6$에서 +는 2개지만 6은 3번이에요.\n\n수가 많아도 곱셈식은 짧아요. $2+2+2+2+2+2+2=14$는 $2 \\times 7 = 14$예요.',
      easy: '덧셈식에서 같은 수에 동그라미를 쳐 보세요.\n\n$6+6+6$에 동그라미가 3개 생겨요.\n\n그러면 "6이 3개" → $6 \\times 3$이에요.',
      check: {
        type: 'choice',
        q: '$7+7+7+7$을 곱셈식으로 나타낸 것은 무엇일까요?',
        choices: ['$7 \\times 4$', '$7 \\times 3$', '$7+4$'],
        answer: 0,
        why: ['', '더하기 기호(+) 3개를 셌어요. 7이 몇 번 더해졌는지 세어요.', '곱셈식은 $\\times$를 써요. 7이 4번 더해졌으니 $7 \\times 4$예요.'],
        explain: '7이 4번 더해졌으므로 $7 \\times 4$예요. 값은 28이에요.',
      },
    },
    {
      title: '생활 속 곱셈',
      body: '생활 속에서 **같은 수가 여러 번** 나오면 곱셈식으로 나타내요.\n\n- 자전거 4대의 바퀴: 한 대에 2개씩 → $2 \\times 4 = 8$\n- 꽃 3송이의 꽃잎: 한 송이에 5장씩 → $5 \\times 3 = 15$\n- 문어 2마리의 다리: 한 마리에 8개씩 → $8 \\times 2 = 16$\n\n**하나에 몇 개씩**인지, **몇 개 있는지** 찾으면 곱셈식을 쓸 수 있어요.',
      easy: '"한 대에 2개씩, 4대"처럼 말해 보세요.\n\n"한 ○에 몇 개씩"이 곱셈식의 앞 수, "몇 ○"가 뒤 수예요.\n\n그래서 $2 \\times 4$예요.',
      check: {
        type: 'short', check: 'number', unit: '개',
        q: '세발자전거 한 대에는 바퀴가 3개 있어요. 세발자전거 3대의 바퀴는 모두 몇 개일까요?',
        answer: '9',
        wrong: [{ a: '6', why: '3+3을 했어요. 세발자전거는 3대이니 3을 3번 더해요.' }],
        explain: '$3 \\times 3 = 3+3+3 = 9$이므로 바퀴는 모두 9개예요.',
      },
    },
  ],

  examples: [
    {
      q: '사과가 2개씩 5묶음 있어요. 사과는 모두 몇 개일까요? 곱셈식으로 나타내 보세요.',
      fig: groups(5, 2, '사과를 2개씩 5묶음으로 묶은 그림'),
      steps: [
        '2개씩 5묶음이므로 2의 5배예요.',
        '2씩 뛰어 세면 2, 4, 6, 8, 10이에요.',
        '곱셈식으로 나타내면 $2 \\times 5 = 10$이에요.',
      ],
      answer: '$2 \\times 5 = 10$, 10개',
    },
    {
      q: '한 상자에 도넛이 4개씩 들어 있어요. 3상자에 든 도넛은 모두 몇 개일까요?',
      steps: [
        '한 상자에 4개씩, 3상자이므로 4의 3배예요.',
        '덧셈식으로 쓰면 $4+4+4=12$예요.',
        '곱셈식으로 쓰면 $4 \\times 3 = 12$예요.',
      ],
      answer: '12개',
    },
  ],

  terms: [
    { term: '뛰어 세기', def: '몇씩 건너뛰며 세는 것이에요. 예: 5씩 뛰어 세면 5, 10, 15, 20' },
    { term: '묶어 세기', def: '몇 개씩 묶어서 세는 것이에요. 예: 3개씩 4묶음' },
    { term: '배', def: '같은 수를 몇 번 모았는지 나타내요. 예: 2의 3배는 2를 3번 모은 수, 곧 6이에요.' },
    { term: '곱셈식', def: '$\\times$를 써서 나타낸 식이에요. 예: $3 \\times 4 = 12$' },
    { term: '곱', def: '곱셈을 한 결과예요. 예: 3과 4의 곱은 12예요.' },
    { term: '곱하기', def: '$\\times$ 기호를 읽는 말이에요. $2 \\times 5$는 "2 곱하기 5"라고 읽어요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', unit: '개', concept: 0,
      q: '구슬이 4개씩 3묶음 있어요. 구슬은 모두 몇 개일까요?',
      fig: groups(3, 4, '구슬을 4개씩 3묶음으로 묶은 그림'),
      answer: '12',
      wrong: [{ a: '7', why: '4와 3을 더했어요. 4씩 3번 뛰어 세어 보세요: 4, 8, 12' }],
      explain: '4씩 뛰어 세면 4, 8, 12예요. 그래서 모두 12개예요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '6씩 뛰어 세어 보세요. 6, 12, 18, [[?]]에 알맞은 수는 무엇일까요?',
      choices: ['24', '20', '19', '30'],
      answer: 0,
      why: ['', '2씩 뛰어 셌어요. 18에서 6만큼 더 가요.', '1씩 뛰어 셌어요. 18에서 6만큼 더 가요.', '한 번 더 뛰었어요. 18 다음은 24예요.'],
      explain: '18에서 6만큼 더 가면 24예요. $18+6=24$',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'number', concept: 1,
      q: '2의 6배는 얼마일까요?',
      answer: '12',
      wrong: [{ a: '8', why: '2와 6을 더했어요. 2의 6배는 2를 6번 더한 수예요.' }],
      explain: '2의 6배는 $2+2+2+2+2+2=12$예요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '$3 \\times 5 = 15$를 바르게 읽은 것은 무엇일까요?',
      choices: ['3 곱하기 5는 15와 같습니다.', '3 더하기 5는 15와 같습니다.', '3과 5의 합은 15입니다.', '3 곱하기 15는 5와 같습니다.'],
      answer: 0,
      why: ['', '$\\times$는 곱하기라고 읽어요.', '곱셈의 결과는 "합"이 아니라 "곱"이에요.', '수의 자리가 바뀌었어요. 등호(=) 뒤의 15가 곱이에요.'],
      explain: '$\\times$는 "곱하기", $=$는 "같습니다"로 읽어요. "3과 5의 곱은 15입니다"라고도 읽어요.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 3,
      q: '$4+4+4$는 $4 \\times 4$로 나타낼 수 있어요.',
      answer: false,
      explain: '4가 3번 더해졌으므로 $4 \\times 3$이에요. 값은 12예요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', concept: 3,
      q: '$5+5+5+5+5+5$를 곱셈식 $5 \\times$[[?]]로 나타내려고 해요. [[?]]에 알맞은 수를 쓰세요.',
      answer: '6',
      wrong: [{ a: '5', why: '더하기 기호(+)의 수를 셌어요. 5가 몇 번 더해졌는지 세어요.' }],
      explain: '5가 6번 더해졌으므로 $5 \\times 6$이에요. 값은 30이에요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 2,
      q: '수직선에서 0부터 같은 만큼씩 뛰었어요. 알맞은 곱셈식은 무엇일까요?',
      fig: jumps(3, 4, 14),
      choices: ['$3 \\times 4 = 12$', '$3+4=7$', '$3 \\times 3 = 9$', '$3 \\times 12 = 36$'],
      answer: 0,
      why: ['', '뛴 크기와 뛴 횟수를 더했어요. 3씩 4번이면 곱셈이에요.', '뛴 횟수를 다시 세어 보세요. 화살표가 4개예요.', '12는 도착한 곳이에요. 3씩 4번 뛰었어요.'],
      explain: '3씩 4번 뛰어 12에 도착했어요. 3의 4배이므로 $3 \\times 4 = 12$예요.',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'number', unit: '개', concept: 4,
      q: '한 상자에 도넛이 6개씩 들어 있어요. 4상자에 든 도넛은 모두 몇 개일까요?',
      answer: '24',
      hint: '6의 몇 배인지 생각해 보세요.',
      wrong: [{ a: '10', why: '6과 4를 더했어요. 6개씩 4상자이니 6을 4번 더해요.' }],
      explain: '6의 4배이므로 $6 \\times 4 = 6+6+6+6 = 24$예요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '자루', concept: 1,
      q: '민수는 연필을 3자루 가지고 있어요. 지아는 민수의 4배만큼 가지고 있어요. 지아의 연필은 몇 자루일까요?',
      answer: '12',
      hint: '3의 4배를 구해요.',
      wrong: [{ a: '7', why: '3과 4를 더했어요. 4배는 4번 모은 것이에요.' }],
      explain: '3의 4배는 $3+3+3+3=12$예요. 지아는 12자루를 가지고 있어요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: '묶음', concept: 0,
      q: '사탕 18개를 3개씩 묶으려고 해요. 몇 묶음이 될까요?',
      answer: '6',
      hint: '3씩 뛰어 세어 18까지 가 보세요.',
      wrong: [{ a: '5', why: '뛰어 센 횟수를 다시 세어 보세요. 3, 6, 9, 12, 15, 18이에요.' }],
      explain: '3씩 뛰어 세면 3, 6, 9, 12, 15, 18로 6번이에요. 그래서 6묶음이에요. 18은 3의 6배예요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: '개', concept: 4,
      q: '문어 한 마리의 다리는 8개예요. 문어 3마리의 다리는 모두 몇 개일까요?',
      answer: '24',
      hint: '8의 3배예요.',
      wrong: [{ a: '11', why: '8과 3을 더했어요. 8을 3번 더해요.' }, { a: '16', why: '문어 2마리만큼 더했어요. 8을 3번 더해요.' }],
      explain: '8의 3배이므로 $8 \\times 3 = 8+8+8 = 24$예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '배', concept: 1,
      q: '4의 3배는 6의 몇 배일까요?',
      answer: '2',
      hint: '먼저 4의 3배를 구한 뒤, 6씩 뛰어 세어 그 수까지 가 보세요.',
      wrong: [{ a: '12', why: '4의 3배까지만 구했어요. 12가 6의 몇 배인지 더 생각해요.' }, { a: '3', why: '6씩 뛰어 세어 12까지 몇 번인지 세어요: 6, 12' }],
      explain: '4의 3배는 $4+4+4=12$예요. 6씩 뛰어 세면 6, 12로 2번이니 12는 6의 2배예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', concept: 2,
      q: '[[?]]의 5배는 20이에요. [[?]]에 알맞은 수를 쓰세요.',
      answer: '4',
      hint: '어떤 수를 5번 더해 20이 되는지 수를 넣어 보세요.',
      wrong: [{ a: '15', why: '20에서 5를 뺐어요. 어떤 수를 5번 더해 20이 되어야 해요.' }, { a: '5', why: '5의 4배가 20이에요. 5번 더해 20이 되는 수를 찾아요.' }],
      explain: '3을 넣으면 $3+3+3+3+3=15$, 4를 넣으면 $4+4+4+4+4=20$이에요. 그래서 4예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '개', concept: 4,
      q: '강당에 의자가 한 줄에 5개씩 4줄 놓여 있어요. 그중 3개에 사람이 앉아 있어요. 빈 의자는 몇 개일까요?',
      answer: '17',
      hint: '먼저 의자가 모두 몇 개인지 곱셈으로 구해요.',
      wrong: [{ a: '20', why: '의자 전체의 수예요. 앉은 3개를 빼야 해요.' }, { a: '6', why: '5와 4를 더하고 3을 뺐어요. 의자는 5의 4배예요.' }],
      explain: '의자는 $5 \\times 4 = 20$(개)예요. 3개에 앉아 있으니 빈 의자는 $20-3=17$(개)예요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 1,
      q: '가장 큰 수는 무엇일까요?',
      choices: ['5의 4배', '3의 6배', '4의 4배', '6의 3배'],
      answer: 0,
      why: ['', '3의 6배는 18이에요. 5의 4배는 20이에요.', '4의 4배는 16이에요. 5의 4배는 20이에요.', '6의 3배는 18이에요. 5의 4배는 20이에요.'],
      hint: '하나씩 같은 수를 더해 값을 구해 보세요.',
      explain: '5의 4배는 20, 3의 6배는 18, 4의 4배는 16, 6의 3배는 18이에요. 가장 큰 수는 5의 4배예요.',
    },
  ],

  deeper: [
    {
      title: '곱셈은 덧셈을 빠르게 하는 방법',
      body: '$2+2+2+2+2+2+2+2+2$는 쓰기도 길고 세기도 힘들어요.\n\n곱셈식으로는 $2 \\times 9$로 짧게 쓸 수 있어요.\n\n다음 단원 **곱셈구구**에서는 $2 \\times 9 = 18$처럼 곱을 바로 알 수 있게 익혀요. 그러면 더하지 않아도 금방 답을 알 수 있어요.',
    },
  ],

  faq: [
    {
      q: '3의 4배랑 3씩 4묶음은 같은 거예요?',
      a: '네, 같아요. 3씩 4묶음을 "3의 4배"라고 해요. 곱셈식으로는 $3 \\times 4$예요.',
    },
    {
      q: '곱셈은 왜 배워요? 더하면 되잖아요.',
      a: '같은 수를 여러 번 더할 때 곱셈식이 훨씬 짧아요. $5+5+5+5+5+5$보다 $5 \\times 6$이 쓰기 쉽지요. 곱셈구구를 익히면 계산도 빨라져요.',
    },
    {
      q: '$\\times$는 어떻게 읽어요?',
      a: '"곱하기"라고 읽어요. $2 \\times 5 = 10$은 "2 곱하기 5는 10과 같습니다"라고 읽어요.',
    },
  ],

  mistakes: [
    '$6+6+6$을 $6 \\times 2$로 쓰는 실수 — 더하기 기호가 아니라 6이 몇 번 더해졌는지 세어요.',
    '"2의 5배"를 $2+5$로 계산하는 실수 — 2를 5번 더해요. $2+2+2+2+2=10$',
  ],

  gens: [
    {
      id: 'groups-count',
      level: 1,
      title: '묶어 세어 모두 몇 개인지 구하기',
      make: function (R) {
        var a = R.int(2, 5), b = R.int(2, 6);
        var p = a * b;
        return {
          type: 'short', check: 'number', unit: '개', concept: 0,
          q: '구슬이 ' + b + '개씩 ' + a + '묶음 있어요. 구슬은 모두 몇 개일까요?',
          fig: groups(a, b),
          answer: String(p),
          wrong: wrongs(p, [
            [a + b, b + R.josa(b, '과/와') + ' ' + a + R.josa(a, '을/를') + ' 더했어요. ' + b + '씩 ' + a + '번 뛰어 세어 보세요.'],
            [p - b, '한 묶음을 빠뜨렸어요. 묶음이 ' + a + '개예요.'],
            [p + b, '한 묶음을 더 셌어요. 묶음이 ' + a + '개예요.'],
          ]),
          explain: b + '씩 뛰어 세면 ' + skipList(b, a) + R.josa(p, '이에요/예요') + '. 그래서 모두 ' + p + '개예요. 곱셈식으로 $' + b + ' \\times ' + a + ' = ' + p + '$' + R.josa(p, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'add-to-mult',
      level: 2,
      title: '덧셈식을 곱셈식으로 나타내기',
      make: function (R) {
        var a = R.int(2, 9), n = R.int(3, 6);
        function m(x, y) { return '$' + x + ' \\times ' + y + '$'; }
        var correct = m(a, n);
        var cands = [
          [m(a, n - 1), '더하기 기호(+)의 수를 셌어요. ' + a + R.josa(a, '이/가') + ' 몇 번 더해졌는지 세어요.'],
          [m(a, n + 1), a + R.josa(a, '이/가') + ' 몇 번 더해졌는지 다시 세어 보세요.'],
          ['$' + a + '+' + n + '$', '곱셈식은 $\\times$를 써요. 같은 수가 몇 번인지가 $\\times$ 뒤의 수예요.'],
          [m(a, a), '$\\times$ 뒤에는 ' + a + R.josa(a, '이/가') + ' 더해진 횟수를 써요.'],
        ];
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: 3,
          q: '덧셈식을 곱셈식으로 나타낸 것은 무엇일까요?\n\n$' + addList(a, n) + '$',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: a + R.josa(a, '이/가') + ' ' + n + '번 더해졌으므로 $' + a + ' \\times ' + n + '$' + R.josa(n, '이에요/예요') + '. 값은 ' + (a * n) + R.josa(a * n, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'word-mult',
      level: 2,
      title: '생활 속 상황을 곱셈으로',
      make: function (R) {
        var T = [
          { one: '한 접시에 쿠키가', each: [2, 6], what: '쿠키', unit: '개', grp: '접시' },
          { one: '자전거 한 대에는 바퀴가', fixed: true, each: [2, 2], what: '바퀴', unit: '개', grp: '대' },
          { one: '이 꽃은 한 송이에 꽃잎이', fixed: true, each: [5, 5], what: '꽃잎', unit: '장', grp: '송이' },
          { one: '한 모둠에 학생이', each: [3, 6], what: '학생', unit: '명', grp: '모둠' },
          { one: '한 봉지에 귤이', each: [3, 7], what: '귤', unit: '개', grp: '봉지' },
          { one: '강아지 한 마리에는 다리가', fixed: true, each: [4, 4], what: '다리', unit: '개', grp: '마리' },
        ];
        var t = R.pick(T);
        var a = R.int(t.each[0], t.each[1]), b = R.int(2, a <= 5 ? 6 : 4);
        var p = a * b;
        var whole = t.grp === '마리' ? '강아지 ' + b + '마리' : (t.grp === '대' ? '자전거 ' + b + '대' : (t.grp === '송이' ? '꽃 ' + b + '송이' : b + t.grp));
        return {
          type: 'short', check: 'number', unit: t.unit, concept: 4,
          q: t.one + ' ' + a + t.unit + (t.fixed ? ' 있어요. ' : '씩 있어요. ') + whole + '의 ' + t.what + R.josa(t.what, '은/는') + ' 모두 몇 ' + t.unit + '일까요?',
          answer: String(p),
          hint: a + '의 몇 배인지 생각해 보세요.',
          wrong: wrongs(p, [
            [a + b, a + R.josa(a, '과/와') + ' ' + b + R.josa(b, '을/를') + ' 더했어요. ' + a + R.josa(a, '을/를') + ' ' + b + '번 더해요.'],
            [p - a, a + R.josa(a, '을/를') + ' 한 번 덜 더했어요. ' + b + '번 더해요.'],
          ]),
          explain: a + t.unit + '씩 ' + b + t.grp + '이므로 ' + a + '의 ' + b + '배예요. $' + a + ' \\times ' + b + ' = ' + addList(a, b) + ' = ' + p + '$이므로 ' + p + t.unit + R.josa(t.unit, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'times-compare',
      level: 3,
      title: '몇의 몇 배는 몇의 몇 배일까',
      make: function (R) {
        // a의 b배 = c의 k배 (c ≠ a, k ≥ 2, 곱은 30 이하)
        var list = [];
        for (var a = 2; a <= 9; a++) {
          for (var b = 2; b <= 6; b++) {
            var p = a * b;
            if (p > 30) continue;
            for (var c = 2; c <= 9; c++) {
              if (c === a || p % c !== 0) continue;
              var k = p / c;
              if (k >= 2 && k <= 6 && k !== b) list.push([a, b, c, k]);
            }
          }
        }
        var x = R.pick(list);
        var pa = x[0] * x[1];
        return {
          type: 'short', check: 'number', unit: '배', concept: 1,
          q: x[0] + '의 ' + x[1] + '배는 ' + x[2] + '의 몇 배일까요?',
          answer: String(x[3]),
          hint: '먼저 ' + x[0] + '의 ' + x[1] + '배를 구한 뒤, ' + x[2] + '씩 뛰어 세어 그 수까지 가 보세요.',
          wrong: wrongs(x[3], [
            [pa, x[0] + '의 ' + x[1] + '배까지만 구했어요. ' + pa + R.josa(pa, '이/가') + ' ' + x[2] + '의 몇 배인지 더 생각해요.'],
            [x[1], x[2] + '씩 뛰어 세어 ' + pa + '까지 몇 번인지 세어요.'],
          ]),
          explain: x[0] + '의 ' + x[1] + '배는 $' + addList(x[0], x[1]) + '=' + pa + '$' + R.josa(pa, '이에요/예요') + '. ' + x[2] + '씩 뛰어 세면 ' + skipList(x[2], x[3]) + R.josa(pa, '으로/로') + ' ' + x[3] + '번이에요. 그래서 ' + x[2] + '의 ' + x[3] + '배예요.',
        };
      },
    },
  ],
});
})();
