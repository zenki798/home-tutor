/* 1학년 수학 · 덧셈과 뺄셈 (9까지)
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 모으기·가르기 그림과 물건 그림은 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  var NAMES = ['민수', '지아', '서준', '하윤', '도윤', '수아', '예준', '서연'];
  var THINGS = [['사탕', '개'], ['구슬', '개'], ['풍선', '개'], ['연필', '자루'], ['딱지', '장'], ['사과', '개']];
  var ANIMALS = [['참새', '마리'], ['토끼', '마리'], ['오리', '마리'], ['병아리', '마리']];
  var NAT = ['', '하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉'];

  function txt(x, y, s, size) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 20) + '" text-anchor="middle" fill="currentColor">' + s + '</text>';
  }
  function box(x, y, s) {
    return '<rect x="' + (x - 24) + '" y="' + (y - 20) + '" width="48" height="40" rx="6" fill="var(--fig-1)" fill-opacity="0.12" stroke="currentColor" stroke-width="2"/>' + txt(x, y + 7, s);
  }
  // 모으기(두 수 → 아래 한 수) · 가르기(한 수 → 아래 두 수) 그림. 모르는 칸은 '?'
  function joinFig(a, b, c, alt) {
    var body = '<line x1="55" y1="50" x2="110" y2="86" stroke="currentColor" stroke-width="2"/><line x1="165" y1="50" x2="110" y2="86" stroke="currentColor" stroke-width="2"/>' +
      box(55, 30, a) + box(165, 30, b) + box(110, 106, c);
    return { type: 'svg', svg: '<svg viewBox="0 0 220 132">' + body + '</svg>', alt: alt || '모으기 그림: 위의 두 수를 모아 아래 수를 만들어요' };
  }
  function splitFig(c, a, b, alt) {
    var body = '<line x1="110" y1="46" x2="55" y2="82" stroke="currentColor" stroke-width="2"/><line x1="110" y1="46" x2="165" y2="82" stroke="currentColor" stroke-width="2"/>' +
      box(110, 26, c) + box(55, 102, a) + box(165, 102, b);
    return { type: 'svg', svg: '<svg viewBox="0 0 220 132">' + body + '</svg>', alt: alt || '가르기 그림: 위의 수를 아래 두 수로 갈라요' };
  }
  function dot(x, y, color) {
    return '<circle cx="' + x + '" cy="' + y + '" r="12" fill="var(' + color + ')" fill-opacity="0.6" stroke="currentColor" stroke-width="1.5"/>';
  }
  // 덧셈 그림: 왼쪽 a개, 조금 떨어져 오른쪽 b개 (색이 달라요)
  function addFig(a, b, alt) {
    var body = '', x = 22;
    for (var i = 0; i < a; i++) { body += dot(x, 30, '--fig-1'); x += 30; }
    x += 22;
    for (var j = 0; j < b; j++) { body += dot(x, 30, '--fig-2'); x += 30; }
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + Math.max(200, x + 4) + ' 60">' + body + '</svg>', alt: alt || '구슬 ' + a + '개와 다른 색 구슬 ' + b + '개' };
  }
  // 뺄셈 그림: a개 가운데 오른쪽 b개에 X 표시 (덜어 낸 것)
  function subFig(a, b, alt) {
    var body = '';
    for (var i = 0; i < a; i++) {
      var x = 22 + i * 30;
      body += dot(x, 30, '--fig-3');
      if (i >= a - b) body += '<path d="M' + (x - 10) + ' 20 L' + (x + 10) + ' 40 M' + (x + 10) + ' 20 L' + (x - 10) + ' 40" stroke="currentColor" stroke-width="2.5"/>';
    }
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + Math.max(200, 22 + a * 30) + ' 60">' + body + '</svg>', alt: alt || '구슬 ' + a + '개 가운데 ' + b + '개에 X 표시를 한 그림' };
  }
  // 비교 그림: 위에 a개, 아래에 b개를 하나씩 짝지어 놓아요
  function pairFig(a, b, alt) {
    var m = Math.max(a, b), body = '';
    for (var i = 0; i < m; i++) {
      var x = 22 + i * 30;
      if (i < a) body += dot(x, 24, '--fig-1');
      if (i < b) body += dot(x, 70, '--fig-2');
      if (i < a && i < b) body += '<line x1="' + x + '" y1="37" x2="' + x + '" y2="57" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>';
    }
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + Math.max(200, 22 + m * 30) + ' 94">' + body + '</svg>', alt: alt || '위에 ' + a + '개, 아래에 ' + b + '개를 하나씩 짝지은 그림' };
  }

Tutor.registerUnit({
  id: 'math-e1-03',
  course: 'math-e1',
  title: '덧셈과 뺄셈',
  summary: '수를 모으고 가르는 활동으로 9까지의 덧셈과 뺄셈을 이해하고, 식으로 나타내어 계산해요.',
  goals: [
    '9까지의 수를 모으고 가를 수 있어요.',
    '더하는 상황과 빼는 상황을 덧셈식, 뺄셈식으로 나타낼 수 있어요.',
    '합이 9까지인 덧셈과 9까지의 수에서 뺄셈을 할 수 있어요.',
    '0을 더하거나 빼는 계산을 할 수 있어요.',
  ],
  standards: ['[2수01-04]', '[2수01-05]'],

  concepts: [
    {
      title: '모으기',
      body: '두 수를 하나로 합치는 것을 **모으기**라고 해요.\n\n구슬 3개와 구슬 2개를 한곳에 모아요.\n\n모두 세어 보면 하나, 둘, 셋, 넷, 다섯이에요.\n\n그래서 **3과 2를 모으면 5**가 돼요.\n\n> 💡 위의 두 수를 모아서 아래 칸에 써요.',
      easy: '왼손에 사탕 3개, 오른손에 사탕 2개가 있어요.\n\n두 손의 사탕을 한 접시에 모두 쏟아요.\n\n접시의 사탕을 세면 5개예요. 이것이 모으기예요.',
      fig: joinFig(3, 2, 5, '3과 2를 모으면 5가 되는 모으기 그림'),
      check: {
        type: 'short', check: 'number',
        q: '4와 3을 모으면 얼마가 될까요?',
        fig: joinFig(4, 3, '?', '4와 3을 모으는 그림'),
        answer: '7',
        wrong: [{ a: '1', why: '두 수의 차이를 구했어요. 모으기는 두 수를 합치는 거예요.' }],
        explain: '4에서 이어서 다섯, 여섯, 일곱 하고 세면 7이에요. 4와 3을 모으면 7이에요.',
      },
    },
    {
      title: '가르기',
      body: '하나의 수를 두 수로 나누는 것을 **가르기**라고 해요.\n\n구슬 5개를 두 접시에 나누어 담아 봐요.\n\n2개와 3개로 나눌 수 있어요. 1개와 4개로도 나눌 수 있어요.\n\n**5는 2와 3으로 가를 수 있어요.**\n\n> 💡 한 수를 가르는 방법은 여러 가지예요. 갈라 놓은 두 수를 다시 모으면 처음 수가 돼요.',
      easy: '쿠키 5개를 나와 동생이 나누어 먹어요.\n\n내가 2개를 먹으면 동생은 3개를 먹어요.\n\n내가 1개를 먹으면 동생은 4개를 먹어요. 나누는 방법이 여러 가지지요?',
      fig: splitFig(5, 2, 3, '5를 2와 3으로 가르는 그림'),
      check: {
        type: 'short', check: 'number',
        q: '6은 2와 어떤 수로 가를 수 있어요. [[?]]에 알맞은 수는 무엇일까요?',
        fig: splitFig(6, 2, '?', '6을 2와 ?로 가르는 그림'),
        answer: '4',
        wrong: [{ a: '8', why: '6과 2를 모았어요. 가르기는 6을 둘로 나누는 거예요.' }],
        explain: '6개를 2개와 나머지로 나누면 나머지는 4개예요. 6은 2와 4로 가를 수 있어요.',
      },
    },
    {
      title: '덧셈식으로 나타내기',
      body: '"모두 몇 개일까?", "더 오면 몇일까?" 하는 것을 **덧셈**이라고 해요.\n\n사과 3개가 있는데 2개를 더 가져왔어요. 이것을 식으로 이렇게 써요.\n\n$3+2=5$\n\n| 쓰기 | 읽기 |\n|---|---|\n| $3+2=5$ | 3 더하기 2는 5와 같아요. |\n| | 3과 2의 **합**은 5예요. |\n\n> 💡 **+** 는 "더하기", **=** 는 "같아요"라고 읽어요. 이런 식을 **덧셈식**이라고 해요.',
      easy: '"더하기"는 "합쳐요"라는 뜻이에요.\n\n친구 3명이 놀고 있는데 2명이 더 왔어요. 이제 모두 5명이에요.\n\n이것을 숫자와 기호로 짧게 쓰면 $3+2=5$예요.',
      fig: addFig(3, 2, '구슬 3개와 다른 색 구슬 2개'),
      check: {
        type: 'choice',
        q: '"4 더하기 1은 5와 같아요."를 식으로 바르게 쓴 것은 무엇일까요?',
        choices: ['$4+1=5$', '$4-1=3$', '$4+5=1$'],
        answer: 0,
        why: ['', '"빼기"가 아니라 "더하기"예요. 더하기는 + 기호를 써요.', '수의 자리가 바뀌었어요. 4에 1을 더한 결과가 5예요.'],
        explain: '"더하기"는 +, "같아요"는 = 로 써요. $4+1=5$예요.',
      },
    },
    {
      title: '덧셈하기',
      body: '덧셈은 여러 가지 방법으로 할 수 있어요.\n\n**1. 모으기로**: $4+3$은 4와 3을 모은 수예요. 그래서 7이에요.\n\n**2. 이어 세기로**: 큰 수 4를 먼저 말하고, 3만큼 이어서 세어요. "다섯, 여섯, 일곱!" 그래서 7이에요.\n\n$4+3=7$\n\n> 💡 두 수의 순서를 바꾸어 더해도 결과는 같아요. $3+4=7$\n\n> ⚠️ 이어 셀 때 처음 수 4를 한 번 더 세지 않아요. "넷, 다섯, 여섯"이라고 세면 하나가 모자라요.',
      easy: '손가락으로 해 봐요.\n\n$4+3$은 먼저 "넷"이라고 머릿속에 기억해요.\n\n그다음 손가락을 하나씩 펴며 "다섯, 여섯, 일곱" 하고 세어요. 손가락 3개를 폈을 때 말한 수 7이 답이에요.',
      check: {
        type: 'short', check: 'number',
        q: '계산해 보세요.\n\n$5+3$',
        answer: '8',
        wrong: [{ a: '7', why: '이어 셀 때 5를 한 번 더 센 것 같아요. 5 다음부터 "여섯, 일곱, 여덟" 하고 세어요.' }],
        explain: '5를 기억하고 3만큼 이어 세면 여섯, 일곱, 여덟이에요. $5+3=8$이에요.',
      },
    },
    {
      title: '뺄셈식으로 나타내고 계산하기',
      body: '"남은 것은 몇 개일까?", "몇 개 더 많을까?" 하는 것을 **뺄셈**이라고 해요.\n\n사과 5개 가운데 2개를 먹었어요. 남은 사과는 3개예요.\n\n$5-2=3$\n\n| 쓰기 | 읽기 |\n|---|---|\n| $5-2=3$ | 5 빼기 2는 3과 같아요. |\n| | 5와 2의 **차**는 3이에요. |\n\n뺄셈은 **가르기**로 할 수 있어요. 5는 2와 3으로 가를 수 있으니 $5-2=3$이에요.\n\n> 💡 두 묶음을 하나씩 짝지었을 때 남는 것의 수도 뺄셈으로 구해요. 구슬 5개와 상자 2개를 짝지으면 구슬 3개가 남아요.',
      easy: '접시에 쿠키 5개가 있어요. 내가 2개를 먹었어요.\n\n먹은 쿠키에 X 표시를 해 보세요. X가 없는 쿠키를 세면 하나, 둘, 셋이에요.\n\n이것을 식으로 쓰면 $5-2=3$이에요. "빼기"는 덜어 낸다는 뜻이에요.',
      fig: subFig(5, 2, '구슬 5개 가운데 2개에 X 표시를 한 그림'),
      check: {
        type: 'short', check: 'number',
        q: '계산해 보세요.\n\n$7-3$',
        answer: '4',
        wrong: [{ a: '10', why: '두 수를 더했어요. - 는 "빼기"예요.' }],
        explain: '7은 3과 4로 가를 수 있어요. 그래서 $7-3=4$예요.',
      },
    },
    {
      title: '0을 더하거나 빼기',
      body: '**0**은 아무것도 없다는 뜻이에요.\n\n- 어떤 수에 0을 더하면 **그대로**예요. $6+0=6$\n- 0에 어떤 수를 더하면 **그 수**예요. $0+4=4$\n- 어떤 수에서 0을 빼면 **그대로**예요. $5-0=5$\n- 어떤 수에서 **그 수 전부**를 빼면 0이에요. $3-3=0$\n\n> 💡 빈 접시를 떠올려 보세요. 사과 6개에 빈 접시를 합쳐도 사과는 6개예요.',
      easy: '바구니에 공이 6개 있어요. 친구가 공을 하나도 넣지 않았어요. 공은 그대로 6개지요.\n\n바구니의 공 3개를 모두 꺼냈어요. 바구니에는 하나도 없어요. 그래서 $3-3=0$이에요.',
      check: {
        type: 'ox',
        q: '$8-0=0$이에요.',
        answer: false,
        explain: '0을 빼면 아무것도 덜어 내지 않은 거예요. 그래서 $8-0=8$이에요.',
      },
    },
  ],

  examples: [
    {
      q: '연못에 오리가 4마리 있었어요. 오리 3마리가 더 왔어요. 오리는 모두 몇 마리일까요?',
      steps: [
        '"더 왔어요"는 수가 늘어나는 것이니 덧셈이에요.',
        '식으로 쓰면 $4+3$이에요.',
        '4를 기억하고 3만큼 이어 세요. 다섯, 여섯, 일곱!',
        '$4+3=7$이므로 오리는 모두 7마리예요.',
      ],
      answer: '$4+3=7$, 7마리',
    },
    {
      q: '사탕이 8개 있었어요. 지아가 사탕 5개를 먹었어요. 남은 사탕은 몇 개일까요?',
      fig: subFig(8, 5, '사탕 8개 가운데 5개에 X 표시를 한 그림'),
      steps: [
        '"먹었어요"는 수가 줄어드는 것이니 뺄셈이에요.',
        '식으로 쓰면 $8-5$예요.',
        '8은 5와 3으로 가를 수 있어요.',
        '$8-5=3$이므로 남은 사탕은 3개예요.',
      ],
      answer: '$8-5=3$, 3개',
    },
  ],

  terms: [
    { term: '모으기', def: '두 수를 하나로 합치는 것이에요. 예: 3과 2를 모으면 5예요.' },
    { term: '가르기', def: '하나의 수를 두 수로 나누는 것이에요. 예: 5는 1과 4로 가를 수 있어요.' },
    { term: '덧셈식', def: '+ 와 = 를 써서 더하는 것을 나타낸 식이에요. 예: $3+2=5$' },
    { term: '뺄셈식', def: '- 와 = 를 써서 빼는 것을 나타낸 식이에요. 예: $5-2=3$' },
    { term: '합', def: '두 수를 더한 수예요. 예: 3과 2의 합은 5예요.' },
    { term: '차', def: '큰 수에서 작은 수를 뺀 수예요. 예: 5와 2의 차는 3이에요.' },
    { term: '이어 세기', def: '덧셈할 때 한 수를 먼저 말하고 다른 수만큼 이어서 세는 방법이에요. 예: $4+3$은 "다섯, 여섯, 일곱"' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
      q: '두 수를 모으면 얼마가 될까요?',
      fig: joinFig(5, 3, '?', '5와 3을 모으는 그림'),
      answer: '8',
      wrong: [
        { a: '2', why: '두 수의 차이를 구했어요. 모으기는 두 수를 합치는 거예요.' },
        { a: '7', why: '이어 셀 때 5를 한 번 더 센 것 같아요. 5 다음부터 "여섯, 일곱, 여덟" 하고 세어요.' },
      ],
      explain: '5에서 이어서 여섯, 일곱, 여덟 하고 세요. 5와 3을 모으면 8이에요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', concept: 1,
      q: '8을 두 수로 갈랐어요. [[?]]에 알맞은 수는 무엇일까요?',
      fig: splitFig(8, 5, '?', '8을 5와 ?로 가르는 그림'),
      answer: '3',
      wrong: [{ a: '13', why: '8과 5를 모았어요. 가르기는 8을 둘로 나누는 거예요.' }],
      explain: '8개를 5개와 나머지로 나누면 나머지는 3개예요. 8은 5와 3으로 가를 수 있어요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: '그림에 알맞은 덧셈식은 무엇일까요?',
      fig: addFig(4, 2, '구슬 4개와 다른 색 구슬 2개'),
      choices: ['$4+2=6$', '$4-2=2$', '$4+2=7$', '$2+2=4$'],
      answer: 0,
      why: ['', '뺄셈식이에요. 두 묶음을 모두 합치는 것은 덧셈이에요.', '모두 세면 7이 아니에요. 다시 하나씩 짚으며 세어 보세요.', '4개짜리 묶음을 2개로 잘못 셌어요.'],
      explain: '구슬 4개와 2개를 합치면 모두 6개예요. 덧셈식은 $4+2=6$이에요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', concept: 3,
      q: '계산해 보세요.\n\n$2+6$',
      answer: '8',
      hint: '큰 수 6을 먼저 말하고 2만큼 이어 세어 보세요.',
      wrong: [{ a: '4', why: '빼기를 했어요. + 는 "더하기"예요.' }],
      explain: '순서를 바꾸어 $6+2$로 생각하면 쉬워요. 6에서 일곱, 여덟 하고 세면 8이에요. $2+6=8$이에요.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', concept: 4,
      q: '계산해 보세요.\n\n$9-4$',
      answer: '5',
      wrong: [{ a: '13', why: '두 수를 더했어요. - 는 "빼기"예요.' }],
      explain: '9는 4와 5로 가를 수 있어요. 그래서 $9-4=5$예요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 4,
      q: '"6과 2의 차는 4예요."를 식으로 바르게 쓴 것은 무엇일까요?',
      choices: ['$6-2=4$', '$6+2=8$', '$4-2=2$'],
      answer: 0,
      why: ['', '"차"는 빼서 구해요. 더하면 "합"이에요.', '6에서 2를 빼야 해요. 처음 수가 6이에요.'],
      explain: '차는 큰 수에서 작은 수를 빼서 구해요. 6과 2의 차는 $6-2=4$예요.',
    },
    {
      id: 'p7', level: 1, type: 'ox', concept: 5,
      q: '$7+0=7$이에요.',
      answer: true,
      explain: '맞아요. 0은 아무것도 없다는 뜻이라 0을 더해도 그대로 7이에요.',
    },
    {
      id: 'p8', level: 1, type: 'short', check: 'number', concept: 5,
      q: '계산해 보세요.\n\n$4-4$',
      answer: '0',
      wrong: [{ a: '4', why: '0을 뺀 것과 헷갈렸어요. 4개에서 4개를 모두 빼면 하나도 남지 않아요.' }],
      explain: '4개에서 4개를 모두 빼면 하나도 남지 않아요. $4-4=0$이에요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '개', concept: 2,
      q: '민수는 사탕을 5개 가지고 있었어요. 지아가 민수에게 사탕 3개를 더 주었어요. 민수의 사탕은 모두 몇 개가 되었을까요?',
      answer: '8',
      hint: '사탕이 늘어났을까요, 줄어들었을까요?',
      wrong: [{ a: '2', why: '뺄셈을 했어요. 사탕을 받았으니 늘어나요. 덧셈으로 구해요.' }],
      explain: '사탕을 더 받았으니 덧셈이에요. $5+3=8$이므로 사탕은 모두 8개예요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: '마리', concept: 4,
      q: '나무에 참새가 9마리 앉아 있었어요. 그중 4마리가 날아갔어요. 나무에 남은 참새는 몇 마리일까요?',
      answer: '5',
      hint: '날아간 참새만큼 덜어 내요.',
      wrong: [{ a: '13', why: '덧셈을 했어요. 날아가면 수가 줄어드니 뺄셈으로 구해요.' }],
      explain: '날아간 만큼 줄어드니 뺄셈이에요. $9-4=5$이므로 남은 참새는 5마리예요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: '개', concept: 4,
      q: '빨간 구슬이 7개, 파란 구슬이 4개 있어요. 빨간 구슬은 파란 구슬보다 몇 개 더 많을까요?',
      fig: pairFig(7, 4, '위에 빨간 구슬 7개, 아래에 파란 구슬 4개를 하나씩 짝지은 그림'),
      answer: '3',
      hint: '하나씩 짝지었을 때 남는 구슬을 세어 보세요.',
      wrong: [{ a: '11', why: '두 수를 더했어요. "몇 개 더 많을까요?"는 뺄셈으로 구해요.' }],
      explain: '하나씩 짝지으면 빨간 구슬 3개가 남아요. 식으로는 $7-4=3$이에요. 빨간 구슬이 3개 더 많아요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 1,
      q: '7을 두 수로 가른 것으로 **옳지 않은** 것은 무엇일까요?',
      choices: ['3과 5', '2와 5', '6과 1', '4와 3'],
      answer: 0,
      why: ['', '2와 5를 모으면 7이에요. 바르게 가른 거예요.', '6과 1을 모으면 7이에요. 바르게 가른 거예요.', '4와 3을 모으면 7이에요. 바르게 가른 거예요.'],
      hint: '두 수를 다시 모아서 7이 되는지 확인해 보세요.',
      explain: '3과 5를 모으면 8이에요. 7이 아니니 7을 가른 것이 아니에요. 나머지는 모두 모으면 7이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 1,
      q: '[[?]]에 알맞은 수는 무엇일까요?\n\n$3+$[[?]]$=8$',
      answer: '5',
      hint: '8을 3과 어떤 수로 가를 수 있는지 생각해 보세요.',
      wrong: [{ a: '11', why: '3과 8을 더했어요. 3에 얼마를 더해야 8이 되는지 찾아요.' }],
      explain: '8은 3과 5로 가를 수 있어요. 그래서 3에 5를 더하면 8이에요. [[?]]는 5예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', concept: 0,
      q: '어떤 수에서 2를 뺐더니 4가 되었어요. 어떤 수는 무엇일까요?',
      answer: '6',
      hint: '남은 4에 뺀 2를 다시 모아 보세요.',
      wrong: [{ a: '2', why: '4에서 2를 뺐어요. 빼기 전의 수는 남은 수와 뺀 수를 모은 수예요.' }],
      explain: '빼고 남은 것이 4, 뺀 것이 2예요. 처음 수는 4와 2를 모은 수인 6이에요. 확인해 보면 $6-2=4$예요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '계산한 값이 가장 큰 것은 무엇일까요?',
      choices: ['$4+4$', '$9-3$', '$2+5$', '$8-1$'],
      answer: 0,
      why: ['', '$9-3=6$이에요. 다른 식도 계산해서 비교해 보세요.', '$2+5=7$이에요. 7보다 큰 것이 있어요.', '$8-1=7$이에요. 7보다 큰 것이 있어요.'],
      hint: '하나씩 계산한 뒤 크기를 비교해요.',
      explain: '$4+4=8$, $9-3=6$, $2+5=7$, $8-1=7$이에요. 가장 큰 것은 8이 되는 $4+4$예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: '장', concept: 4,
      q: '하윤이는 딱지를 9장 가지고 있었어요. 동생에게 3장을 주고, 친구에게 2장을 주었어요. 하윤이에게 남은 딱지는 몇 장일까요?',
      answer: '4',
      hint: '동생에게 준 다음 남은 딱지를 먼저 구해요.',
      wrong: [
        { a: '6', why: '동생에게 준 것만 뺐어요. 친구에게 준 2장도 빼야 해요.' },
        { a: '7', why: '친구에게 준 것만 뺐어요. 동생에게 준 3장도 빼야 해요.' },
      ],
      explain: '동생에게 주고 남은 딱지는 $9-3=6$장이에요. 친구에게 2장을 더 주면 $6-2=4$장이 남아요.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'number', unit: '가지', concept: 1,
      q: '구슬 6개를 두 접시에 나누어 담으려고 해요. 두 접시에 모두 1개 이상 담아요. 왼쪽 접시에 담을 수 있는 구슬의 수는 모두 몇 가지일까요?',
      answer: '5',
      hint: '왼쪽 접시에 1개, 2개 … 담는 것을 차례대로 써 보세요.',
      wrong: [
        { a: '6', why: '왼쪽 접시에 6개를 모두 담는 것도 셌어요. 그러면 오른쪽 접시가 비어요.' },
        { a: '3', why: '"1과 5", "5와 1"을 같은 것으로 셌어요. 왼쪽 접시에 담는 수가 다르면 다른 방법이에요.' },
      ],
      explain: '6을 가르면 1과 5, 2와 4, 3과 3, 4와 2, 5와 1이에요. 왼쪽 접시에는 1개, 2개, 3개, 4개, 5개를 담을 수 있으니 모두 5가지예요.',
    },
  ],

  deeper: [
    {
      title: '덧셈과 뺄셈은 서로 짝꿍',
      body: '3과 4를 모으면 7이에요. 이 하나의 그림으로 식을 네 개 만들 수 있어요.\n\n$3+4=7$, $4+3=7$\n\n$7-3=4$, $7-4=3$\n\n모으기는 덧셈, 가르기는 뺄셈과 같아요. 그래서 덧셈을 알면 뺄셈도 쉽게 할 수 있어요.\n\n뺄셈 답이 맞는지 궁금하면 거꾸로 더해 보세요. $7-3=4$가 맞다면 $4+3$은 7이 되어야 해요.',
    },
    {
      title: '앞으로 배울 덧셈과 뺄셈',
      body: '이번에는 9까지의 수로 덧셈과 뺄셈을 했어요.\n\n2학기에는 $8+5$처럼 합이 10보다 커지는 덧셈과, $13-5$처럼 10이 넘는 수에서 빼는 뺄셈을 배워요.\n\n그때도 오늘 배운 **모으기와 가르기**가 아주 중요하게 쓰여요. 예를 들어 $8+5$는 5를 2와 3으로 갈라서 8과 2로 10을 먼저 만들어요.',
    },
  ],

  faq: [
    { q: '더하기인지 빼기인지 어떻게 알아요?', a: '"모두 몇 개", "더 오면", "더 받으면"처럼 수가 늘어나면 덧셈이에요.\n\n"남은 것", "먹으면", "날아가면", "몇 개 더 많을까"처럼 줄어들거나 차이를 물으면 뺄셈이에요.' },
    { q: '$3+4$랑 $4+3$은 같아요?', a: '네, 둘 다 7이에요. 더하는 순서를 바꾸어도 합은 같아요. 그래서 작은 수가 앞에 있으면 큰 수부터 이어 세면 더 편해요.' },
    { q: '뺄셈에서 작은 수에서 큰 수를 빼도 돼요?', a: '지금 배우는 수에서는 큰 수에서 작은 수를 빼요. 사과 2개에서 5개를 먹을 수는 없지요. 그래서 $5-2$는 되지만 $2-5$는 지금은 계산하지 않아요.' },
  ],

  mistakes: [
    '이어 세기를 할 때 처음 수를 한 번 더 세는 실수 — $4+3$은 "넷, 다섯, 여섯"이 아니라 "다섯, 여섯, 일곱"이에요.',
    '"몇 개 더 많을까요?"를 덧셈으로 푸는 실수 — 두 수의 차이를 묻는 것이니 뺄셈이에요.',
    '$5-0$을 0이라고 하는 실수 — 0을 빼면 아무것도 덜어 내지 않았으니 그대로 5예요.',
  ],

  gens: [
    {
      id: 'join-split',
      level: 1,
      title: '9까지의 수 모으기와 가르기',
      make: function (R) {
        if (R.bool()) {
          var a = R.int(1, 8), b = R.int(1, 9 - a), s = a + b;
          var wrong = [];
          if (a !== b) wrong.push({ a: String(Math.abs(a - b)), why: '두 수의 차이를 구했어요. 모으기는 두 수를 합치는 거예요.' });
          if (s - 1 !== Math.abs(a - b)) wrong.push({ a: String(s - 1), why: '이어 셀 때 처음 수를 한 번 더 센 것 같아요. 처음 수 다음부터 세어요.' });
          var big = Math.max(a, b), small = Math.min(a, b);
          var cnt = NAT.slice(big + 1, s + 1).join(', ');
          return {
            type: 'short', check: 'number', concept: 0,
            q: a + R.josa(a, '과/와') + ' ' + b + R.josa(b, '을/를') + ' 모으면 얼마가 될까요?',
            fig: joinFig(a, b, '?', a + R.josa(a, '과/와') + ' ' + b + R.josa(b, '을/를') + ' 모으는 그림'),
            answer: String(s),
            wrong: wrong,
            explain: big + R.josa(big, '을/를') + ' 기억하고 ' + small + '만큼 이어서 "' + cnt + '" 하고 세어요. ' + a + R.josa(a, '과/와') + ' ' + b + R.josa(b, '을/를') + ' 모으면 ' + s + R.josa(s, '이에요/예요') + '.',
          };
        }
        var n = R.int(2, 9), x = R.int(1, n - 1), y = n - x;
        var left = R.bool();
        return {
          type: 'short', check: 'number', concept: 1,
          q: n + R.josa(n, '을/를') + ' 두 수로 갈랐어요. [[?]]에 알맞은 수는 무엇일까요?',
          fig: left ? splitFig(n, '?', x, n + R.josa(n, '을/를') + ' ?와 ' + x + R.josa(x, '으로/로') + ' 가르는 그림') : splitFig(n, x, '?', n + R.josa(n, '을/를') + ' ' + x + R.josa(x, '과/와') + ' ?로 가르는 그림'),
          answer: String(y),
          wrong: n + x <= 18 ? [{ a: String(n + x), why: n + R.josa(n, '과/와') + ' ' + x + R.josa(x, '을/를') + ' 모았어요. 가르기는 ' + n + R.josa(n, '을/를') + ' 둘로 나누는 거예요.' }] : [],
          explain: n + '개를 ' + x + '개와 나머지로 나누면 나머지는 ' + y + '개예요. ' + n + R.josa(n, '은/는') + ' ' + x + R.josa(x, '과/와') + ' ' + y + R.josa(y, '으로/로') + ' 가를 수 있어요.',
        };
      },
    },
    {
      id: 'add9',
      level: 1,
      title: '합이 9까지인 덧셈',
      make: function (R) {
        var zero = R.bool(0.15);
        var a, b;
        if (zero) { if (R.bool()) { a = R.int(1, 9); b = 0; } else { a = 0; b = R.int(1, 9); } }
        else { a = R.int(1, 8); b = R.int(1, 9 - a); }
        var s = a + b;
        var mode = zero ? 0 : R.int(0, 2);
        var q;
        var p = { type: 'short', check: 'number', concept: zero ? 5 : 3 };
        if (mode === 0) q = '계산해 보세요.\n\n$' + a + '+' + b + '$';
        else if (mode === 1) q = a + R.josa(a, '과/와') + ' ' + b + '의 합은 얼마일까요?';
        else {
          q = '구슬은 모두 몇 개일까요? 덧셈으로 구해 보세요.';
          p.fig = addFig(a, b);
          p.unit = '개';
        }
        p.q = q;
        p.answer = String(s);
        var wrong = [];
        if (!zero && Math.abs(a - b) !== s) wrong.push({ a: String(Math.abs(a - b)), why: '빼기를 했어요. ' + (mode === 1 ? '"합"은 두 수를 더한 수예요.' : '+ 는 "더하기"예요.') });
        if (!zero && s - 1 !== Math.abs(a - b)) wrong.push({ a: String(s - 1), why: '이어 셀 때 처음 수를 한 번 더 센 것 같아요. 처음 수 다음부터 세어요.' });
        if (zero) wrong.push({ a: '0', why: '0을 더하면 0이 되는 것이 아니에요. 아무것도 더하지 않았으니 그대로예요.' });
        p.wrong = wrong;
        var big = Math.max(a, b), small = Math.min(a, b);
        p.explain = zero
          ? '0은 아무것도 없다는 뜻이에요. 0을 더해도 그대로라서 $' + a + '+' + b + '=' + s + '$' + R.josa(s, '이에요/예요') + '.'
          : big + R.josa(big, '을/를') + ' 기억하고 ' + small + '만큼 이어서 "' + NAT.slice(big + 1, s + 1).join(', ') + '" 하고 세어요. $' + a + '+' + b + '=' + s + '$' + R.josa(s, '이에요/예요') + '.';
        return p;
      },
    },
    {
      id: 'sub9',
      level: 1,
      title: '9까지의 수에서 뺄셈',
      make: function (R) {
        var zero = R.bool(0.15);
        var a = R.int(zero ? 1 : 2, 9), b;
        if (zero) b = R.bool() ? 0 : a;
        else b = R.int(1, a - 1);
        var d = a - b;
        var mode = zero ? 0 : R.int(0, 2);
        var p = { type: 'short', check: 'number', concept: zero ? 5 : 4 };
        if (mode === 0) p.q = '계산해 보세요.\n\n$' + a + '-' + b + '$';
        else if (mode === 1) p.q = a + R.josa(a, '과/와') + ' ' + b + '의 차는 얼마일까요?';
        else {
          p.q = '구슬 ' + a + '개 가운데 X 표시한 ' + b + '개를 덜어 냈어요. 남은 구슬은 몇 개일까요?';
          p.fig = subFig(a, b);
          p.unit = '개';
        }
        p.answer = String(d);
        var wrong = [];
        if (b !== 0) wrong.push({ a: String(a + b), why: '두 수를 더했어요. ' + (mode === 1 ? '"차"는 큰 수에서 작은 수를 빼서 구해요.' : '- 는 "빼기"예요.') });
        if (zero && b === 0) wrong.push({ a: '0', why: '0을 빼면 아무것도 덜어 내지 않은 거예요. 그대로 ' + a + R.josa(a, '이에요/예요') + '.' });
        if (zero && b === a) wrong.push({ a: String(a), why: '0을 뺀 것과 헷갈렸어요. ' + a + '개에서 ' + a + '개를 모두 빼면 하나도 남지 않아요.' });
        p.wrong = wrong;
        p.explain = zero
          ? (b === 0 ? '0을 빼면 아무것도 덜어 내지 않았으니 그대로예요. ' : a + '개에서 ' + a + '개를 모두 빼면 하나도 남지 않아요. ') + '$' + a + '-' + b + '=' + d + '$' + R.josa(d, '이에요/예요') + '.'
          : a + R.josa(a, '은/는') + ' ' + b + R.josa(b, '과/와') + ' ' + d + R.josa(d, '으로/로') + ' 가를 수 있어요. 그래서 $' + a + '-' + b + '=' + d + '$' + R.josa(d, '이에요/예요') + '.';
        return p;
      },
    },
    {
      id: 'word9',
      level: 2,
      title: '덧셈·뺄셈 상황을 식으로 나타내고 풀기',
      make: function (R) {
        var kind = R.pick(['join', 'add', 'take', 'compare']);
        var who = R.sample(NAMES, 2), A = who[0], B = who[1];
        var a, b, ans, isAdd = kind === 'join' || kind === 'add', q, t, u;
        if (isAdd) { a = R.int(1, 8); b = R.int(1, 9 - a); ans = a + b; }
        else { a = R.int(3, 9); b = R.int(1, a - 1); ans = a - b; }
        if (kind === 'add' || kind === 'take') {
          var an = R.bool() ? R.pick(ANIMALS) : null;
          if (an && kind === 'add') { t = an[0]; u = an[1]; q = '마당에 ' + t + R.josa(t, '이/가') + ' ' + a + u + ' 있었어요. ' + b + u + '가 더 왔어요. ' + t + R.josa(t, '은/는') + ' 모두 몇 ' + u + '일까요?'; }
          else if (an) { t = an[0]; u = an[1]; q = '마당에 ' + t + R.josa(t, '이/가') + ' ' + a + u + ' 있었어요. 그중 ' + b + u + '가 집으로 갔어요. 마당에 남은 ' + t + R.josa(t, '은/는') + ' 몇 ' + u + '일까요?'; }
          else {
            var th = R.pick(THINGS); t = th[0]; u = th[1];
            q = kind === 'add'
              ? A + R.josa(A, '은/는') + ' ' + t + R.josa(t, '을/를') + ' ' + a + u + ' 가지고 있었어요. ' + B + R.josa(B, '이/가') + ' ' + t + ' ' + b + u + R.josa(u, '을/를') + ' 더 주었어요. ' + A + R.josa(A, '이/가') + ' 가진 ' + t + R.josa(t, '은/는') + ' 모두 몇 ' + u + '일까요?'
              : A + R.josa(A, '은/는') + ' ' + t + R.josa(t, '을/를') + ' ' + a + u + ' 가지고 있었어요. 그중 ' + b + u + R.josa(u, '을/를') + ' ' + B + '에게 주었어요. ' + A + '에게 남은 ' + t + R.josa(t, '은/는') + ' 몇 ' + u + '일까요?';
          }
        } else {
          var th2 = R.pick(THINGS); t = th2[0]; u = th2[1];
          q = kind === 'join'
            ? A + R.josa(A, '은/는') + ' ' + t + ' ' + a + u + ', ' + B + R.josa(B, '은/는') + ' ' + t + ' ' + b + u + R.josa(u, '을/를') + ' 가지고 있어요. 두 사람이 가진 ' + t + R.josa(t, '은/는') + ' 모두 몇 ' + u + '일까요?'
            : A + R.josa(A, '은/는') + ' ' + t + ' ' + a + u + ', ' + B + R.josa(B, '은/는') + ' ' + t + ' ' + b + u + R.josa(u, '을/를') + ' 가지고 있어요. ' + A + R.josa(A, '은/는') + ' ' + B + '보다 ' + t + R.josa(t, '을/를') + ' 몇 ' + u + ' 더 많이 가지고 있을까요?';
        }
        var expr = '$' + a + (isAdd ? '+' : '-') + b + '=' + ans + '$';
        var reason = {
          join: '두 사람의 것을 모두 합치니 덧셈이에요.',
          add: '더 생겨서 수가 늘어나니 덧셈이에요.',
          take: '덜어 내서 수가 줄어드니 뺄셈이에요.',
          compare: '몇 ' + u + ' 더 많은지는 두 수의 차이라서 뺄셈이에요.',
        }[kind];
        if (R.bool()) {
          // 알맞은 식 고르기
          var other = isAdd ? (a >= b ? '$' + a + '-' + b + '=' + (a - b) + '$' : '$' + b + '-' + a + '=' + (b - a) + '$') : '$' + a + '+' + b + '=' + (a + b) + '$';
          var cands = [other, '$' + a + (isAdd ? '+' : '-') + b + '=' + (ans + 1) + '$'];
          if (ans > 1) cands.push('$' + a + (isAdd ? '+' : '-') + b + '=' + (ans - 1) + '$');
          var pick = R.choices(expr, cands, 3);
          return {
            type: 'choice', concept: isAdd ? 2 : 4,
            q: q + '\n\n알맞은 식은 무엇일까요?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) {
              if (c === expr) return '';
              if (c === other) return isAdd ? '뺄셈식을 골랐어요. ' + reason : '덧셈식을 골랐어요. ' + reason;
              return '식은 맞게 세웠는데 계산이 틀렸어요. 다시 세어 보세요.';
            }),
            explain: reason + ' 식은 ' + expr + R.josa(ans, '이에요/예요') + '.',
          };
        }
        var wrongAns = isAdd ? Math.abs(a - b) : a + b;
        return {
          type: 'short', check: 'number', unit: u, concept: isAdd ? 2 : 4,
          q: q,
          answer: String(ans),
          wrong: wrongAns !== ans ? [{ a: String(wrongAns), why: isAdd ? '뺄셈을 했어요. ' + reason : '덧셈을 했어요. ' + reason }] : [],
          explain: reason + ' ' + expr + '이므로 답은 ' + ans + u + R.josa(u, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'missing9',
      level: 3,
      title: '[[?]]에 알맞은 수 구하기 (모으기·가르기로 생각하기)',
      make: function (R) {
        var c = R.int(3, 9), x = R.int(1, c - 1), y = c - x;
        var form = R.int(0, 3);
        var eq, ans, why, explain;
        if (form === 0) { eq = x + '+[[?]]=' + c; ans = y; }
        else if (form === 1) { eq = '[[?]]+' + y + '=' + c; ans = x; }
        else if (form === 2) { eq = c + '-[[?]]=' + x; ans = y; }
        else { eq = '[[?]]-' + x + '=' + y; ans = c; }
        if (form <= 1) {
          var known = form === 0 ? x : y;
          explain = c + R.josa(c, '은/는') + ' ' + known + R.josa(known, '과/와') + ' ' + ans + R.josa(ans, '으로/로') + ' 가를 수 있어요. 그래서 [[?]]는 ' + ans + R.josa(ans, '이에요/예요') + '.';
          why = [{ a: String(c + known), why: '두 수를 더했어요. ' + known + '에 얼마를 더해야 ' + c + R.josa(c, '이/가') + ' 되는지 찾아요.' }];
        } else if (form === 2) {
          explain = c + R.josa(c, '은/는') + ' ' + x + R.josa(x, '과/와') + ' ' + y + R.josa(y, '으로/로') + ' 가를 수 있어요. ' + c + '에서 ' + y + R.josa(y, '을/를') + ' 빼면 ' + x + R.josa(x, '이/가') + ' 남아요. 그래서 [[?]]는 ' + y + R.josa(y, '이에요/예요') + '.';
          why = [{ a: String(c + x), why: '두 수를 더했어요. ' + c + '에서 얼마를 빼야 ' + x + R.josa(x, '이/가') + ' 남는지 찾아요.' }];
        } else {
          explain = '빼고 남은 것이 ' + y + ', 뺀 것이 ' + x + R.josa(x, '이에요/예요') + '. 처음 수는 ' + y + R.josa(y, '과/와') + ' ' + x + R.josa(x, '을/를') + ' 모은 수인 ' + c + R.josa(c, '이에요/예요') + '.';
          why = x !== y ? [{ a: String(Math.abs(y - x)), why: '남은 수에서 뺀 수를 또 뺐어요. 처음 수는 남은 수와 뺀 수를 모은 수예요.' }] : [];
        }
        why = why.filter(function (w) { return w.a !== String(ans); });
        return {
          type: 'short', check: 'number', concept: form <= 1 ? 1 : (form === 2 ? 4 : 0),
          q: '[[?]]에 알맞은 수는 무엇일까요?\n\n' + eq.split('[[?]]').map(function (part) { return part ? '$' + part + '$' : ''; }).join('[[?]]'),
          answer: String(ans),
          hint: form === 3 ? '남은 수와 뺀 수를 모으면 처음 수가 돼요.' : c + R.josa(c, '을/를') + ' 두 수로 갈라 보세요.',
          wrong: why,
          explain: explain,
        };
      },
    },
  ],
});
})();
