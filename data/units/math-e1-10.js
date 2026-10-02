/* 1학년 수학 · 규칙 찾기
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 되풀이되는 모양·색깔의 규칙, 규칙을 정해 늘어놓기·무늬, 수의 배열, 수 배열표(1~100), 규칙을 기호·수로 나타내기.
 * 1학년은 도형 이름 대신 □, △, ○ 모양이라고 한다. 수의 규칙은 "몇씩 커져요/작아져요"로 말하고, 셈은 이어 세기 수준으로 둔다.
 * 그림: 모양 줄·수 배열표는 아래 도우미가 직접 그린 svg.
 *   색 이름은 그림 색과 맞춘다: var(--fig-1) 파랑, var(--fig-2) 주황, var(--fig-3) 초록, var(--fig-4) 보라 (밝은/어두운 화면 모두 같은 색 계열).
 *   색깔 문제는 그림만 보고 풀지 않아도 되게 문제 글에도 색 이름을 쓴다. */
(function () {
  var COLOR = ['', '파랑', '주황', '초록', '보라'];
  var KINDS = ['○', '△', '□'];

  function txt(x, y, s, size) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 14) + '" text-anchor="middle" fill="currentColor">' + s + '</text>';
  }
  // 모양 하나: k = '○' | '△' | '□' | '?', c = 색 번호(1~4, 0 이면 색 없음)
  function shp(k, x, y, c) {
    var f = c ? 'var(--fig-' + c + ')' : 'none', st = ' fill="' + f + '"' + (c ? ' fill-opacity="0.8"' : '') + ' stroke="currentColor" stroke-width="2"';
    if (k === '△') return '<polygon points="' + x + ',' + (y - 15) + ' ' + (x - 15) + ',' + (y + 12) + ' ' + (x + 15) + ',' + (y + 12) + '"' + st + '/>';
    if (k === '□') return '<rect x="' + (x - 13) + '" y="' + (y - 13) + '" width="26" height="26"' + st + '/>';
    if (k === '?') return '<rect x="' + (x - 15) + '" y="' + (y - 15) + '" width="30" height="30" rx="4" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>' + txt(x, y + 6, '?', 18);
    return '<circle cx="' + x + '" cy="' + y + '" r="14"' + st + '/>';
  }
  // 한 줄로 늘어놓은 모양: items = [[모양, 색 번호], …]
  function row(items, alt) {
    var W = Math.max(220, items.length * 38 + 24), x0 = (W - items.length * 38) / 2 + 19, s = '';
    items.forEach(function (it, i) { s += shp(it[0], x0 + i * 38, 28, it[1]); });
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' 56">' + s + '</svg>', alt: alt };
  }
  // 수 배열표 일부: first = 첫 줄의 첫 수(1, 11, 21 …), rows 줄, label(수) → [보일 글, 색칠?]
  function chart(first, rows, label, alt) {
    var s = '';
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < 10; c++) {
        var n = first + r * 10 + c, x = 10 + c * 40, y = 8 + r * 30, L = label(n);
        s += '<rect x="' + x + '" y="' + y + '" width="40" height="30" fill="' + (L[1] ? 'var(--fig-2)' : 'none') + '"' + (L[1] ? ' fill-opacity="0.35"' : '') + ' stroke="currentColor" stroke-width="1.2"/>';
        if (L[0]) s += txt(x + 20, y + 20, L[0]);
      }
    }
    return { type: 'svg', svg: '<svg viewBox="0 0 420 ' + (rows * 30 + 16) + '">' + s + '</svg>', alt: alt };
  }
  function all(n) { return [String(n), false]; }

Tutor.registerUnit({
  id: 'math-e1-10',
  course: 'math-e1',
  title: '규칙 찾기',
  summary: '모양, 색깔, 수가 되풀이되는 규칙을 찾아 말하고, 나만의 규칙을 만들어 여러 가지로 나타내요.',
  goals: [
    '모양과 색깔이 되풀이되는 규칙을 찾아 다음에 올 것을 알 수 있어요.',
    '규칙을 정해 물건을 늘어놓거나 무늬를 만들 수 있어요.',
    '수의 배열과 수 배열표에서 규칙을 찾을 수 있어요.',
    '규칙을 ○, △ 같은 기호나 수로 나타낼 수 있어요.',
  ],
  standards: ['[2수02-01]', '[2수02-02]'],

  concepts: [
    {
      title: '되풀이되는 모양의 규칙',
      body: '모양이 일정하게 **되풀이**되면 그것이 **규칙**이에요.\n\n○ △ ○ △ ○ △ …\n\n○ 모양, △ 모양이 차례로 되풀이돼요. 그래서 △ 다음에는 ○ 모양이 와요.\n\n규칙을 찾을 때는 **처음부터 어디까지가 한 번인지** 찾아봐요. 위에서는 "○ △"가 한 번이에요.\n\n> 💡 되풀이되는 부분을 손가락으로 짚으며 말해 보면 규칙이 잘 보여요. "동그라미, 세모, 동그라미, 세모 …"',
      easy: '노래 가사를 떠올려 봐요. 같은 부분이 다시 나오지요?\n\n모양도 마찬가지예요. ○ △가 한 번, 또 ○ △가 한 번 …\n\n같은 모양 묶음이 다시 나오는 것을 찾으면 그 다음 모양도 알 수 있어요.',
      fig: row([['○', 1], ['△', 2], ['○', 1], ['△', 2], ['○', 1], ['△', 2], ['?', 0]], '○, △ 모양이 되풀이되고 마지막에 ? 칸이 있는 그림'),
      check: {
        type: 'choice',
        q: '규칙에 따라 늘어놓았어요. 다음에 올 모양은 무엇일까요?\n\n□ ○ □ ○ □ ?',
        choices: ['○ 모양', '□ 모양', '△ 모양'],
        answer: 0,
        why: ['', '□ 다음에는 ○가 와요. □와 ○가 번갈아 나와요.', '△ 모양은 늘어놓은 것에 없어요. □와 ○만 되풀이돼요.'],
        explain: '□ 모양, ○ 모양이 차례로 되풀이돼요. □ 다음이니 ○ 모양이에요.',
      },
    },
    {
      title: '되풀이되는 색깔의 규칙',
      body: '색깔이 되풀이되는 규칙도 있어요.\n\n구슬을 **파랑, 주황, 주황, 파랑, 주황, 주황** … 순서로 꿰었어요.\n\n"파랑, 주황, 주황"이 한 번이에요. 이것이 계속 되풀이돼요. 그래서 다음 구슬은 파랑이에요.\n\n> ⚠️ 주황이 두 번 나온다는 것을 놓치기 쉬워요. 되풀이되는 한 묶음을 끝까지 확인해요.',
      easy: '요일을 생각해 봐요. 월요일부터 일요일까지 지나면 다시 월요일이 와요. 같은 차례가 계속 되풀이되지요.\n\n구슬 색도 같은 차례로 다시 나오면 그것이 규칙이에요. "파랑, 주황, 주황" 다음에는 다시 "파랑, 주황, 주황"이에요.',
      fig: row([['○', 1], ['○', 2], ['○', 2], ['○', 1], ['○', 2], ['○', 2], ['?', 0]], '파랑, 주황, 주황 구슬이 되풀이되고 마지막에 ? 칸이 있는 그림'),
      check: {
        type: 'choice',
        q: '구슬을 초록, 보라, 초록, 보라, 초록 순서로 꿰었어요. 다음에 꿸 구슬은 무슨 색일까요?',
        choices: ['보라', '초록', '파랑'],
        answer: 0,
        why: ['', '초록 다음에는 보라가 와요. 초록과 보라가 번갈아 나와요.', '파랑 구슬은 꿴 것 중에 없어요. 초록과 보라만 되풀이돼요.'],
        explain: '초록, 보라가 되풀이돼요. 마지막이 초록이니 다음은 보라예요.',
      },
    },
    {
      title: '규칙을 정해 늘어놓기와 무늬 만들기',
      body: '나만의 규칙을 정해서 물건을 늘어놓을 수 있어요.\n\n- "○ ○ △"를 되풀이: ○ ○ △ ○ ○ △ ○ ○ △\n- 모양과 색깔을 함께: 파란 ○, 주황 □, 파란 ○, 주황 □ …\n\n여러 줄로 늘어놓으면 **무늬**가 돼요. 첫째 줄은 ○ △ ○ △, 둘째 줄은 △ ○ △ ○처럼 줄마다 규칙을 정할 수 있어요.\n\n> 💡 규칙을 만들었으면 "무엇이 되풀이되는지" 말로 설명할 수 있어야 해요.',
      easy: '목걸이를 만든다고 생각해 봐요.\n\n"동그란 구슬 2개, 세모 구슬 1개"를 정하고 이것을 계속 되풀이하면 예쁜 목걸이가 돼요.\n\n중간에 순서를 바꾸면 규칙이 깨져요. 정한 순서를 끝까지 지켜요.',
      fig: row([['○', 1], ['○', 1], ['△', 3], ['○', 1], ['○', 1], ['△', 3], ['○', 1], ['○', 1], ['△', 3]], '○ ○ △가 세 번 되풀이된 그림'),
      check: {
        type: 'ox',
        q: '○ △ ○ △ △ ○ 는 규칙에 따라 늘어놓은 거예요.',
        answer: false,
        explain: '○ △ ○ △까지는 ○, △가 번갈아 나오다가 △가 두 번 나와서 규칙이 깨졌어요. 규칙대로라면 ○ △ ○ △ ○ △예요.',
      },
    },
    {
      title: '수의 배열에서 규칙 찾기',
      body: '수를 늘어놓은 것에서도 규칙을 찾을 수 있어요.\n\n- 2, 4, 6, 8, 10 → **2씩 커져요.**\n- 5, 10, 15, 20, 25 → **5씩 커져요.**\n- 50, 40, 30, 20, 10 → **10씩 작아져요.**\n- 1, 3, 1, 3, 1, 3 → 1과 3이 **되풀이돼요.**\n\n이웃한 두 수를 비교해 보면 몇씩 커지는지, 작아지는지 알 수 있어요.\n\n> 💡 2씩 커질 때는 "하나 건너 세기", 10씩 커질 때는 "10개씩 묶음이 하나씩 늘기"를 생각해요.',
      easy: '계단을 두 칸씩 오른다고 생각해 봐요. 2번 계단, 4번 계단, 6번 계단 … 한 번에 2씩 커지지요.\n\n수의 규칙을 찾을 때는 앞의 수에서 뒤의 수로 갈 때 몇 칸을 뛰었는지 세어 보세요.',
      fig: { type: 'numberline', min: 0, max: 10, step: 1, labelEvery: 1, arrows: [{ from: 2, to: 4, label: '2' }, { from: 4, to: 6, label: '2' }, { from: 6, to: 8, label: '2' }], alt: '수직선에서 2, 4, 6, 8로 2씩 뛰어 센 그림' },
      check: {
        type: 'short', check: 'number',
        q: '규칙에 따라 수를 늘어놓았어요. □에 알맞은 수를 구해 보세요.\n\n5, 10, 15, 20, □',
        answer: '25',
        wrong: [{ a: '21', why: '1씩 커지는 것이 아니에요. 이웃한 두 수가 5씩 커져요.' }],
        explain: '5, 10, 15, 20은 5씩 커져요. 20보다 5 큰 수는 25예요.',
      },
    },
    {
      title: '수 배열표에서 규칙 찾기',
      body: '1부터 100까지의 수를 10개씩 한 줄에 쓴 표를 **수 배열표**라고 해요.\n\n- **오른쪽으로** 한 칸 가면 **1씩 커져요.** 23 → 24 → 25\n- **아래로** 한 칸 가면 **10씩 커져요.** 23 → 33 → 43\n- 같은 세로줄에 있는 수는 낱개의 수가 같아요. 3, 13, 23, 33 …\n\n> 💡 아래로 내려가면 10개씩 묶음이 하나씩 늘어나서 10씩 커져요.',
      easy: '수 배열표는 아파트와 비슷해요. 옆집으로 가면 호수가 1씩 커지고, 한 층 내려가면(수 배열표에서는 아래 줄) 10씩 커져요.\n\n23 바로 아래에는 33, 그 아래에는 43이 있어요.',
      fig: chart(21, 3, function (n) { return [String(n), n % 10 === 3]; }, '21부터 50까지의 수 배열표, 23, 33, 43에 색칠'),
      check: {
        type: 'choice',
        q: '수 배열표에서 아래로 한 칸 내려가면 수가 몇씩 커질까요?',
        choices: ['10씩', '1씩', '2씩'],
        answer: 0,
        why: ['', '1씩 커지는 것은 오른쪽으로 한 칸 갈 때예요.', '수 배열표의 한 줄에는 수가 10개씩 있어요. 아래로 가면 10씩 커져요.'],
        explain: '수 배열표는 한 줄에 10개씩 써서, 바로 아래 칸은 10 큰 수예요. 예: 23 아래는 33이에요.',
      },
    },
    {
      title: '규칙을 기호나 수로 나타내기',
      body: '같은 규칙을 **여러 가지로** 나타낼 수 있어요.\n\n사과, 배, 배, 사과, 배, 배 …\n\n| 무엇으로 | 나타낸 모양 |\n|---|---|\n| 기호 (사과 ○, 배 △) | ○ △ △ ○ △ △ |\n| 수 (사과 1, 배 2) | 1 2 2 1 2 2 |\n| 몸 (사과 손뼉, 배 발 구르기) | 짝 쿵 쿵 짝 쿵 쿵 |\n\n무엇으로 나타내도 **되풀이되는 차례는 똑같아요.**\n\n> 💡 기호나 수로 바꾸면 그림을 그리지 않아도 규칙을 쉽게 적을 수 있어요.',
      easy: '"사과, 배, 배"를 "짝, 쿵, 쿵"으로 바꿔서 박수와 발 구르기로 해 봐요.\n\n사과일 때 손뼉 한 번, 배일 때 발 한 번. 소리만 들어도 규칙을 알 수 있지요?\n\n○ △ △나 1 2 2로 써도 같은 규칙이에요.',
      check: {
        type: 'choice',
        q: '사과를 1, 배를 2로 나타내요. "사과, 사과, 배, 사과, 사과, 배"를 수로 바르게 나타낸 것은 무엇일까요?',
        choices: ['1, 1, 2, 1, 1, 2', '1, 2, 2, 1, 2, 2', '2, 2, 1, 2, 2, 1'],
        answer: 0,
        why: ['', '사과가 두 번, 배가 한 번이에요. 사과(1)를 두 번 써요.', '사과와 배의 수를 바꿨어요. 사과가 1, 배가 2예요.'],
        explain: '사과는 1, 배는 2이므로 "사과, 사과, 배"는 1, 1, 2예요. 이것이 되풀이되니 1, 1, 2, 1, 1, 2예요.',
      },
    },
  ],

  examples: [
    {
      q: '규칙에 따라 늘어놓았어요. ?에 올 모양은 무엇일까요?',
      fig: row([['△', 2], ['△', 2], ['□', 3], ['△', 2], ['△', 2], ['□', 3], ['△', 2], ['?', 0]], '△, △, □가 되풀이되고 마지막에 ? 칸이 있는 그림'),
      steps: [
        '처음부터 되풀이되는 부분을 찾아요. "△ △ □"가 한 번이에요.',
        '"△ △ □"가 두 번 나오고, 그다음 △ 하나가 놓여 있어요.',
        '"△ △ □"에서 △ 다음 두 번째 자리도 △예요. 그래서 ?는 △ 모양이에요.',
      ],
      answer: '△ 모양',
    },
    {
      q: '수 배열표에서 ?에 알맞은 수는 무엇일까요?',
      fig: chart(31, 3, function (n) { return n === 54 ? ['?', true] : (n === 44 ? ['44', false] : (n % 10 === 1 ? [String(n), false] : ['', false])); }, '31부터 60까지의 수 배열표 일부, 44 바로 아래 칸에 ?'),
      steps: [
        '?는 44 바로 아래 칸이에요.',
        '수 배열표에서 아래로 한 칸 내려가면 10씩 커져요.',
        '44보다 10 큰 수는 54예요. 10개씩 묶음이 4개에서 5개로 늘어요.',
      ],
      answer: '54',
    },
  ],

  terms: [
    { term: '규칙', def: '일정하게 되풀이되거나 일정하게 변하는 약속이에요. 예: ○ △ ○ △ …' },
    { term: '되풀이', def: '같은 것이 같은 차례로 다시 나오는 것이에요. "파랑, 주황"이 계속 나오면 되풀이돼요.' },
    { term: '무늬', def: '모양이나 색깔을 규칙에 따라 여러 줄로 늘어놓아 만든 꾸밈이에요.' },
    { term: '수 배열', def: '수를 차례로 늘어놓은 것이에요. 예: 2, 4, 6, 8은 2씩 커지는 수 배열이에요.' },
    { term: '수 배열표', def: '1부터 100까지의 수를 한 줄에 10개씩 쓴 표예요. 오른쪽으로 1씩, 아래로 10씩 커져요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '규칙에 따라 늘어놓았어요. ?에 올 모양은 무엇일까요?',
      fig: row([['○', 1], ['○', 1], ['△', 2], ['○', 1], ['○', 1], ['△', 2], ['○', 1], ['○', 1], ['?', 0]], '○, ○, △가 되풀이되고 마지막에 ? 칸이 있는 그림'),
      choices: ['△ 모양', '○ 모양', '□ 모양'],
      answer: 0,
      why: ['', '○는 두 번까지만 나와요. "○ ○ △"가 한 번이에요.', '□ 모양은 늘어놓은 것에 없어요.'],
      explain: '"○ ○ △"가 되풀이돼요. ○ ○ 다음이니 △ 모양이에요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '구슬을 파랑, 주황, 초록, 파랑, 주황, 초록 순서로 꿰었어요. 다음에 꿸 구슬은 무슨 색일까요?',
      fig: row([['○', 1], ['○', 2], ['○', 3], ['○', 1], ['○', 2], ['○', 3], ['?', 0]], '파랑, 주황, 초록 구슬이 되풀이되고 마지막에 ? 칸이 있는 그림'),
      choices: ['파랑', '주황', '초록'],
      answer: 0,
      why: ['', '초록 다음에는 처음 색으로 돌아가요. "파랑, 주황, 초록"이 한 번이에요.', '초록이 두 번 이어서 나오지 않아요. 초록 다음은 파랑이에요.'],
      explain: '"파랑, 주황, 초록"이 되풀이돼요. 초록까지 한 번이 끝났으니 다음은 다시 파랑이에요.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'number', concept: 3,
      q: '규칙에 따라 수를 늘어놓았어요. □에 알맞은 수를 구해 보세요.\n\n2, 4, 6, 8, □',
      answer: '10',
      wrong: [{ a: '9', why: '1씩 커지는 것이 아니에요. 이웃한 두 수가 2씩 커져요.' }],
      explain: '2, 4, 6, 8은 2씩 커져요. 8보다 2 큰 수는 10이에요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', concept: 3,
      q: '규칙에 따라 수를 늘어놓았어요. □에 알맞은 수를 구해 보세요.\n\n50, 40, 30, 20, □',
      answer: '10',
      wrong: [
        { a: '19', why: '1씩 작아지는 것이 아니에요. 이웃한 두 수가 10씩 작아져요.' },
        { a: '60', why: '수가 작아지고 있어요. 커지는 쪽이 아니라 작아지는 쪽으로 이어 가요.' },
      ],
      explain: '50, 40, 30, 20은 10씩 작아져요. 10개씩 묶음이 하나씩 줄어요. 20보다 10 작은 수는 10이에요.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 4,
      q: '수 배열표에서 오른쪽으로 한 칸 가면 수가 1씩 커져요.',
      answer: true,
      explain: '수 배열표는 한 줄에 수를 차례로 썼어요. 그래서 오른쪽으로 한 칸 가면 1씩 커져요. 예: 23 → 24',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', concept: 4,
      q: '수 배열표의 일부예요. ?에 알맞은 수는 무엇일까요?',
      fig: chart(61, 2, function (n) { return n === 77 ? ['?', true] : (n === 67 || n === 76 ? [String(n), false] : ['', false]); }, '61부터 80까지의 수 배열표 일부, 67과 76이 적혀 있고 67 바로 아래 칸에 ?'),
      answer: '77',
      hint: '67 바로 아래 칸이에요. 76 바로 오른쪽 칸이기도 해요.',
      wrong: [
        { a: '68', why: '67 바로 오른쪽 칸의 수예요. ?는 67 바로 아래 칸이에요.' },
        { a: '87', why: '두 칸 내려간 수예요. 아래로 한 칸은 10 큰 수예요.' },
      ],
      explain: '?는 67 바로 아래 칸이라 67보다 10 큰 77이에요. 76 바로 오른쪽 칸이라 76보다 1 큰 수로 생각해도 77이에요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 5,
      q: '○ △ △ ○ △ △를 수로 나타내요. ○는 1, △는 2로 나타내면 어떻게 될까요?',
      choices: ['1, 2, 2, 1, 2, 2', '1, 2, 1, 2, 1, 2', '2, 1, 1, 2, 1, 1', '1, 1, 2, 1, 1, 2'],
      answer: 0,
      why: [
        '',
        '△가 두 번 이어서 나오는 것을 놓쳤어요. △ △는 2, 2예요.',
        '○와 △를 바꿨어요. ○가 1, △가 2예요.',
        '○와 △의 개수를 바꿨어요. ○ 한 번, △ 두 번이에요.',
      ],
      explain: '○ △ △를 1, 2, 2로 바꾸고, 이것이 두 번 되풀이되니 1, 2, 2, 1, 2, 2예요.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 2,
      q: '규칙에 따라 늘어놓은 것이 **아닌** 것은 무엇일까요?',
      choices: ['○ △ ○ △ ○ △', '□ □ ○ □ □ ○', '△ ○ □ △ ○ □', '○ △ △ ○ △ ○'],
      answer: 3,
      why: [
        '○, △가 번갈아 되풀이돼요. 규칙이 있어요.',
        '"□ □ ○"가 되풀이돼요. 규칙이 있어요.',
        '"△ ○ □"가 되풀이돼요. 규칙이 있어요.',
        '',
      ],
      hint: '처음 몇 개가 다시 똑같이 나오는지 살펴봐요.',
      explain: '○ △ △ ○ 다음에 규칙대로라면 △ △가 와야 하는데 △ ○가 왔어요. 되풀이되지 않으니 규칙이 없어요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', concept: 3,
      q: '규칙에 따라 수를 늘어놓았어요. □에 알맞은 수를 구해 보세요.\n\n1, 3, 5, 7, □, 11',
      answer: '9',
      hint: '이웃한 두 수를 비교해 보세요.',
      wrong: [{ a: '8', why: '1씩 커지는 것이 아니에요. 이웃한 두 수가 2씩 커져요.' }],
      explain: '1, 3, 5, 7은 2씩 커져요. 7보다 2 큰 수는 9이고, 9보다 2 큰 수가 11이라서 맞아요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '수 배열표에서 색칠한 수 22, 32, 42, 52에는 어떤 규칙이 있을까요?',
      fig: chart(21, 4, function (n) { return [String(n), n % 10 === 2]; }, '21부터 60까지의 수 배열표, 22, 32, 42, 52에 색칠'),
      choices: ['10씩 커져요.', '1씩 커져요.', '2씩 커져요.', '10씩 작아져요.'],
      answer: 0,
      why: [
        '',
        '1씩 커지는 것은 옆으로 갈 때예요. 색칠한 수는 아래로 이어져 있어요.',
        '낱개 2만 보았어요. 22 다음이 32이니 몇씩 커지는지 봐요.',
        '22, 32, 42, 52는 점점 커져요.',
      ],
      hint: '22에서 32로 갈 때 10개씩 묶음이 어떻게 변하는지 봐요.',
      explain: '색칠한 수는 같은 세로줄에 있어서 아래로 한 칸씩 내려가요. 10개씩 묶음이 하나씩 늘어나 10씩 커져요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '구슬을 파랑, 파랑, 주황 순서로 되풀이해서 모두 12개 꿰었어요. 주황 구슬은 몇 개일까요?',
      fig: row([['○', 1], ['○', 1], ['○', 2], ['○', 1], ['○', 1], ['○', 2], ['○', 1], ['○', 1], ['○', 2], ['○', 1], ['○', 1], ['○', 2]], '파랑, 파랑, 주황이 되풀이된 구슬 12개'),
      answer: '4',
      hint: '"파랑, 파랑, 주황" 3개씩 묶어서 세어 보세요.',
      wrong: [
        { a: '8', why: '파랑 구슬을 셌어요. 주황 구슬만 세어요.' },
        { a: '6', why: '12개의 반을 셌어요. 3개 중에 주황은 1개예요.' },
      ],
      explain: '"파랑, 파랑, 주황" 3개씩 묶으면 3, 6, 9, 12로 4묶음이에요. 한 묶음에 주황이 1개씩이니 주황 구슬은 4개예요.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', concept: 5,
      q: '손뼉(짝), 손뼉(짝), 발 구르기(쿵)를 되풀이해요. 짝을 1, 쿵을 2로 나타내었어요. □에 알맞은 수를 구해 보세요.\n\n1, 1, 2, 1, 1, 2, 1, □',
      answer: '1',
      hint: '"짝, 짝, 쿵"을 수로 나타내면 1, 1, 2예요.',
      wrong: [{ a: '2', why: '1, 2가 번갈아 나오는 것이 아니에요. "1, 1, 2"가 되풀이돼요.' }],
      explain: '"1, 1, 2"가 되풀이돼요. 세 번째 묶음이 1로 시작했으니 다음도 1이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 4,
      q: '수 배열표에서 47 바로 아래 칸에서 오른쪽으로 한 칸 더 간 곳의 수는 무엇일까요?',
      answer: '58',
      hint: '아래로 한 칸은 10 큰 수, 오른쪽으로 한 칸은 1 큰 수예요.',
      wrong: [
        { a: '57', why: '47 바로 아래 칸까지만 갔어요. 오른쪽으로 한 칸 더 가요.' },
        { a: '48', why: '오른쪽으로만 갔어요. 먼저 아래로 한 칸 내려가요.' },
      ],
      explain: '47 바로 아래 칸은 10 큰 57이에요. 57에서 오른쪽으로 한 칸 가면 1 큰 58이에요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', concept: 3,
      q: '규칙에 따라 수를 늘어놓았어요. □에 알맞은 수를 구해 보세요.\n\n1, 2, 4, 7, 11, □',
      answer: '16',
      hint: '이웃한 두 수가 얼마씩 커지는지 차례로 써 보세요.',
      wrong: [
        { a: '15', why: '4씩 커진다고 보았어요. 커지는 수가 1, 2, 3, 4로 하나씩 늘어나요.' },
        { a: '12', why: '1만 커졌어요. 커지는 수가 1, 2, 3, 4, … 로 늘어나요.' },
      ],
      explain: '1에서 2는 1 커지고, 2에서 4는 2, 4에서 7은 3, 7에서 11은 4 커졌어요. 다음은 5 커지니 11보다 5 큰 16이에요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 0,
      q: '○ △ □를 되풀이해서 늘어놓아요. 15번째에 오는 모양은 무엇일까요?\n\n○ △ □ ○ △ □ …',
      choices: ['□ 모양', '○ 모양', '△ 모양'],
      answer: 0,
      why: ['', '○는 1번째, 4번째, 7번째 …에 와요. 3개씩 묶어 세어 보세요.', '△는 2번째, 5번째, 8번째 …에 와요. 3개씩 묶어 세어 보세요.'],
      hint: '"○ △ □" 3개씩 묶어서 3번째, 6번째, 9번째 …에 무엇이 오는지 봐요.',
      explain: '"○ △ □" 한 묶음의 마지막(□)은 3번째, 6번째, 9번째, 12번째, 15번째에 와요. 그래서 15번째는 □ 모양이에요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', concept: 5,
      q: '○ △ △를 되풀이해서 9개를 늘어놓았어요. ○는 1, △는 2로 바꾸어 쓴 수를 모두 더하면 얼마일까요?',
      answer: '15',
      hint: '○ △ △ 한 묶음을 수로 바꾸면 1, 2, 2예요. 한 묶음의 합부터 구해요.',
      wrong: [
        { a: '9', why: '늘어놓은 개수를 셌어요. 수로 바꾸어 더해요.' },
        { a: '5', why: '한 묶음의 합만 구했어요. 9개에는 묶음이 3개 있어요.' },
      ],
      explain: '○ △ △는 1, 2, 2이고 합은 5예요. 9개는 3묶음이니 $5+5+5=15$예요.',
    },
  ],

  deeper: [
    {
      title: '생활 속의 규칙',
      body: '우리 주변에는 규칙이 많아요.\n\n- 달력: 일, 월, 화, 수, 목, 금, 토요일이 되풀이돼요. 같은 요일의 날짜는 아래로 내려가면 7씩 커져요.\n- 보도블록, 벽지, 옷감의 무늬도 모양과 색깔이 되풀이돼요.\n- 노래와 춤에도 되풀이되는 부분이 있어요.\n\n2학년에서는 덧셈표와 곱셈표에서 규칙을 찾고, 쌓은 모양에서 규칙을 찾아요.',
    },
  ],

  faq: [
    {
      q: '규칙이 하나만 있어요?',
      a: '아니요. 같은 것을 보고도 여러 가지 규칙을 찾을 수 있어요. 수 배열표에서는 "오른쪽으로 1씩 커져요", "아래로 10씩 커져요"처럼 방향마다 다른 규칙이 있지요.\n\n그래서 규칙을 말할 때는 "어느 쪽으로", "무엇이" 되풀이되는지 함께 말해요.',
    },
    {
      q: '되풀이되는 부분을 어떻게 찾아요?',
      a: '맨 앞의 것과 똑같은 것이 다시 나오는 곳을 찾아요. 그 앞까지가 한 묶음일 수 있어요. 그다음도 같은 차례로 나오는지 끝까지 확인해요.',
    },
    {
      q: '내가 만든 규칙이 맞는지 어떻게 알아요?',
      a: '정한 묶음이 처음부터 끝까지 똑같은 차례로 되풀이되는지 확인해요. 중간에 하나라도 순서가 바뀌면 규칙이 깨진 거예요.',
    },
  ],

  mistakes: [
    '"파랑, 주황, 주황"처럼 같은 것이 두 번 나오는 규칙에서 한 번만 세는 실수 — 되풀이되는 묶음을 끝까지 확인해요.',
    '수 배열표에서 아래로 한 칸을 1 큰 수라고 하는 실수 — 아래로 한 칸은 10 큰 수예요.',
    '2씩 커지는 수 배열에서 1씩 이어 세는 실수 — 이웃한 두 수를 비교해 몇씩 커지는지 먼저 확인해요.',
  ],

  gens: [
    {
      id: 'pattern-next',
      level: 1,
      title: '되풀이되는 모양·색깔의 규칙에서 다음 것 찾기',
      make: function (R) {
        var form = R.pick(['AB', 'AAB', 'ABB', 'ABC']);
        var m = form === 'ABC' ? 3 : 2, L = form.length;
        var isColor = R.bool();
        var shown = 2 * L + R.int(0, L - 1);
        var idx = form.split('').map(function (ch) { return ch.charCodeAt(0) - 65; });   // A→0, B→1, C→2
        if (isColor) {
          var cols = R.sample([1, 2, 3, 4], m);
          var seqC = [];
          for (var i = 0; i < shown; i++) seqC.push(cols[idx[i % L]]);
          var ansC = cols[idx[shown % L]];
          var names = seqC.map(function (c) { return COLOR[c]; });
          var unitC = idx.map(function (j) { return COLOR[cols[j]]; }).join(', ');
          var correct = COLOR[ansC];
          var others = [1, 2, 3, 4].filter(function (c) { return c !== ansC; }).map(function (c) { return COLOR[c]; });
          var pick = R.choices(correct, others, 3);
          var last = names[names.length - 1];
          return {
            type: 'choice', concept: 1,
            q: '구슬을 ' + names.join(', ') + ' 순서로 꿰었어요. 다음에 꿸 구슬은 무슨 색일까요?',
            fig: row(seqC.map(function (c) { return ['○', c]; }).concat([['?', 0]]), names.join(', ') + ' 구슬과 마지막 ? 칸'),
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) {
              if (c === correct) return '';
              if (names.indexOf(c) < 0) return c + ' 구슬은 꿴 것 중에 없어요. 꿴 구슬의 색만 되풀이돼요.';
              return '되풀이되는 한 묶음은 ' + unitC + R.josa(COLOR[cols[idx[L - 1]]], '이에요/예요') + '. 마지막 ' + last + ' 다음에 무엇이 오는지 다시 봐요.';
            }),
            explain: '되풀이되는 한 묶음: ' + unitC + '\n\n이 차례가 계속 되풀이되니 마지막 ' + last + ' 다음은 ' + correct + R.josa(correct, '이에요/예요') + '.',
          };
        }
        var ks = R.sample(KINDS, m), cl = [1, 2, 3];
        var seq = [];
        for (var j = 0; j < shown; j++) seq.push(idx[j % L]);
        var ansK = ks[idx[shown % L]];
        var unitS = idx.map(function (t) { return ks[t]; }).join(' ');
        var correctS = ansK + ' 모양';
        var pickS = R.choices(correctS, KINDS.filter(function (k) { return k !== ansK; }).map(function (k) { return k + ' 모양'; }), 3);
        var seqTxt = seq.map(function (t) { return ks[t]; }).join(' ');
        return {
          type: 'choice', concept: 0,
          q: '규칙에 따라 늘어놓았어요. ?에 올 모양은 무엇일까요?\n\n' + seqTxt + ' ?',
          fig: row(seq.map(function (t) { return [ks[t], cl[t]]; }).concat([['?', 0]]), seqTxt + ' 다음에 ? 칸이 있는 그림'),
          choices: pickS.choices,
          answer: pickS.answer,
          why: pickS.choices.map(function (c) {
            if (c === correctS) return '';
            if (ks.indexOf(c.charAt(0)) < 0) return '이 모양은 늘어놓은 것에 없어요.';
            return '되풀이되는 한 묶음은 ' + unitS + ' 이렇게 ' + L + '개예요. 묶음 안에서 ? 자리를 다시 찾아봐요.';
          }),
          explain: '되풀이되는 한 묶음: ' + unitS + '\n\n이 묶음이 계속 되풀이되니 ?에는 ' + ansK + ' 모양이 와요.',
        };
      },
    },
    {
      id: 'number-sequence',
      level: 1,
      title: '수의 배열에서 규칙 찾기 (몇씩 커지거나 작아지기)',
      make: function (R) {
        var step = R.pick([2, 2, 5, 10, 10, 1]);
        var up = R.bool(0.7);
        var start;
        if (step === 5) start = 5 * R.int(up ? 1 : 5, up ? 12 : 20);
        else start = up ? R.int(1, 100 - 4 * step) : R.int(1 + 4 * step, 100);
        var seq = [];
        for (var i = 0; i < 5; i++) seq.push(start + (up ? 1 : -1) * step * i);
        var pos = R.bool(0.6) ? 4 : R.int(1, 3);
        var ans = seq[pos], prev = seq[pos - 1];
        var shown = seq.map(function (x, k) { return k === pos ? '□' : String(x); }).join(', ');
        var way = step + '씩 ' + (up ? '커져요' : '작아져요');
        var wrong = [];
        if (step !== 1) {
          var w1 = up ? prev + 1 : prev - 1;
          wrong.push({ a: String(w1), why: '1씩 ' + (up ? '커지는' : '작아지는') + ' 것이 아니에요. 이웃한 두 수가 ' + step + '씩 ' + (up ? '커져요.' : '작아져요.') });
        }
        var w2 = up ? prev - step : prev + step;
        if (w2 >= 1 && w2 !== ans) wrong.push({ a: String(w2), why: '수가 ' + (up ? '커지고' : '작아지고') + ' 있어요. 반대 방향으로 갔어요.' });
        return {
          type: 'short', check: 'number', concept: 3,
          q: '규칙에 따라 수를 늘어놓았어요. □에 알맞은 수를 구해 보세요.\n\n' + shown,
          answer: String(ans),
          wrong: wrong,
          hint: '이웃한 두 수를 비교해 몇씩 커지는지, 작아지는지 보세요.',
          explain: '이웃한 두 수를 비교하면 ' + way + '. ' + prev + '보다 ' + step + ' ' + (up ? '큰' : '작은') + ' 수는 ' + ans + R.josa(ans, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'hundred-chart',
      level: 2,
      title: '수 배열표에서 위·아래·옆 칸의 수 찾기',
      make: function (R) {
        var dirs = ['아래', '위', '오른쪽', '왼쪽'];
        var d = R.pick(dirs), n;
        for (var g = 0; g < 100; g++) {
          n = R.int(11, 90);
          if (d === '오른쪽' && n % 10 === 0) continue;
          if (d === '왼쪽' && n % 10 === 1) continue;
          break;
        }
        var delta = { '아래': 10, '위': -10, '오른쪽': 1, '왼쪽': -1 }[d];
        var t = n + delta, vertical = d === '아래' || d === '위';
        var rule = vertical ? (d === '아래' ? '아래로 한 칸 내려가면 10 커져요' : '위로 한 칸 올라가면 10 작아져요')
                            : (d === '오른쪽' ? '오른쪽으로 한 칸 가면 1 커져요' : '왼쪽으로 한 칸 가면 1 작아져요');
        var wrong = [];
        if (vertical) wrong.push({ a: String(n + (delta > 0 ? 1 : -1)), why: n + '보다 1 ' + (delta > 0 ? '큰' : '작은') + ' 수를 구했어요. ' + d + ' 칸은 10만큼 차이가 나요.' });
        else wrong.push({ a: String(n + (delta > 0 ? 10 : -10)), why: n + '보다 10 ' + (delta > 0 ? '큰' : '작은') + ' 수를 구했어요. ' + d + ' 칸은 1만큼 차이가 나요.' });
        var opp = n - delta;
        if (opp >= 1 && opp <= 100) wrong.push({ a: String(opp), why: n + '보다 ' + Math.abs(delta) + ' ' + (delta > 0 ? '작은' : '큰') + ' 수를 구했어요. ' + rule + '.' });
        var useFig = R.bool();
        var p = {
          type: 'short', check: 'number', concept: 4,
          answer: String(t),
          wrong: wrong,
          hint: '수 배열표는 오른쪽으로 1씩, 아래로 10씩 커져요.',
          explain: '수 배열표에서 ' + rule + '. 그래서 ' + n + '의 ' + d + ' 칸은 ' + t + R.josa(t, '이에요/예요') + '.',
        };
        if (useFig) {
          var lo = Math.min(n, t), first = Math.floor((lo - 1) / 10) * 10 + 1;
          if (!vertical && first + 10 > 91) first -= 10;   // 옆 칸 문제도 두 줄로 보여 준다
          p.q = '수 배열표의 일부예요. ?에 알맞은 수는 무엇일까요?';
          p.fig = chart(first, 2, function (x) { return x === n ? [String(n), false] : (x === t ? ['?', true] : ['', false]); }, '수 배열표 일부, ' + n + R.josa(n, '과/와') + ' ? 칸');
        } else {
          p.q = '수 배열표에서 ' + n + '의 바로 ' + d + ' 칸에 있는 수는 무엇일까요?';
        }
        return p;
      },
    },
    {
      id: 'nth-shape',
      level: 3,
      title: '되풀이되는 규칙에서 ○번째에 오는 모양 찾기',
      make: function (R) {
        var form = R.pick(['AB', 'ABC', 'AAB', 'ABB']);
        var m = form === 'ABC' ? 3 : 2, L = form.length;
        var idx = form.split('').map(function (ch) { return ch.charCodeAt(0) - 65; });
        var ks = R.sample(KINDS, m);
        var unit = idx.map(function (t) { return ks[t]; });
        var k = R.int(7, 20);
        var q = Math.floor((k - 1) / L), r = k - q * L;
        var ans = unit[r - 1];
        var ORD = ['', '첫째', '둘째', '셋째'];
        var ends = [];
        for (var i = 1; i <= q + (r === L ? 1 : 0); i++) ends.push(i * L);
        var correct = ans + ' 모양';
        var pick = R.choices(correct, KINDS.filter(function (x) { return x !== ans; }).map(function (x) { return x + ' 모양'; }), 3);
        function places(s) {
          var out = [];
          for (var p = 1; p <= 20 && out.length < 4; p++) if (unit[(p - 1) % L] === s) out.push(p);
          return out.join(', ');
        }
        return {
          type: 'choice', concept: 0,
          q: unit.join(' ') + '를 되풀이해서 늘어놓아요. ' + k + '번째에 오는 모양은 무엇일까요?\n\n' + unit.join(' ') + ' ' + unit.join(' ') + ' …',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            if (c === correct) return '';
            var s = c.charAt(0);
            if (unit.indexOf(s) < 0) return '이 모양은 늘어놓은 것에 없어요.';
            return '이 모양은 ' + places(s) + '번째 …에 와요. ' + L + '개씩 묶어 세어 보세요.';
          }),
          hint: L + '개씩 묶어서 몇 번째에 묶음이 끝나는지 세어 보세요.',
          explain: L + '개씩 한 묶음이에요. ' + ends.join(', ') + '번째에서 묶음이 끝나요. ' +
            (r === L ? k + '번째는 묶음의 마지막 자리라서 ' : k + '번째는 다음 묶음의 ' + ORD[r] + ' 자리라서 ') + ans + ' 모양이에요.',
        };
      },
    },
  ],
});
})();
