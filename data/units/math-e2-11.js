/* 2학년 수학 · 표와 그래프
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 조사한 자료(낱말 카드)와 ○·×·/ 그래프는 아래 도우미가 직접 그린 svg. 모든 자료는 가상의 자료다.
 * 그래프 그림의 alt 는 수를 말하지 않는다(그림 설명이 답을 알려 주지 않게). */
(function () {
  var NAMES = ['민수', '지아', '서준', '하윤', '도윤', '수아', '예준', '서연'];
  var TOPICS = [
    { title: '좋아하는 과일', what: '과일', items: ['사과', '배', '포도', '귤', '딸기'], verb: '좋아하는' },
    { title: '좋아하는 계절', what: '계절', items: ['봄', '여름', '가을', '겨울'], verb: '좋아하는' },
    { title: '좋아하는 운동', what: '운동', items: ['축구', '줄넘기', '수영', '피구'], verb: '좋아하는' },
    { title: '기르고 싶은 동물', what: '동물', items: ['강아지', '고양이', '햄스터', '물고기'], verb: '기르고 싶은' },
  ];

  function esc(s) { return String(s); }
  function txt(x, y, s, size, bold) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 14) + '"' + (bold ? ' font-weight="bold"' : '') + ' text-anchor="middle" fill="currentColor">' + esc(s) + '</text>';
  }
  function mark(kind, cx, cy) {
    if (kind === '×') {
      return '<path d="M' + (cx - 8) + ' ' + (cy - 8) + 'L' + (cx + 8) + ' ' + (cy + 8) + 'M' + (cx + 8) + ' ' + (cy - 8) + 'L' + (cx - 8) + ' ' + (cy + 8) + '" stroke="var(--fig-4)" stroke-width="2.5" stroke-linecap="round"/>';
    }
    if (kind === '/') {
      return '<path d="M' + (cx - 7) + ' ' + (cy + 9) + 'L' + (cx + 7) + ' ' + (cy - 9) + '" stroke="var(--fig-3)" stroke-width="2.5" stroke-linecap="round"/>';
    }
    return '<circle cx="' + cx + '" cy="' + cy + '" r="9" fill="none" stroke="var(--fig-1)" stroke-width="2.5"/>';
  }

  // ○·×·/ 그래프 (세로: 학생 수, 가로: 항목). 아래에서 위로 그린다.
  function graph(labels, values, kind, title, rows) {
    var n = labels.length, max = rows || Math.max.apply(null, values), cw = 60, ch = 28, nx = 44;
    var x0 = 10, top = title ? 34 : 12, y0 = top + 18, W = x0 + nx + n * cw + 10, H = y0 + max * ch + 32 + 8, o = '';
    if (title) o += txt(W / 2, 22, title, 16, true);
    o += txt(x0 + nx / 2, y0 - 5, '(명)', 12);
    o += '<rect x="' + x0 + '" y="' + y0 + '" width="' + (nx + n * cw) + '" height="' + (max * ch + 32) + '" fill="none" stroke="currentColor" stroke-width="1.5"/>';
    for (var r = 1; r <= max; r++) {
      var y = y0 + (max - r) * ch;
      o += '<line x1="' + x0 + '" y1="' + (y + ch) + '" x2="' + (x0 + nx + n * cw) + '" y2="' + (y + ch) + '" stroke="currentColor" stroke-width="' + (r === 1 ? 1.5 : 0.8) + '"/>';
      o += txt(x0 + nx / 2, y + 19, r, 13);
    }
    for (var i = 0; i <= n; i++) {
      var x = x0 + nx + i * cw;
      o += '<line x1="' + x + '" y1="' + y0 + '" x2="' + x + '" y2="' + (y0 + max * ch + 32) + '" stroke="currentColor" stroke-width="' + (i === 0 ? 1.5 : 0.8) + '"/>';
    }
    for (var j = 0; j < n; j++) {
      var cx = x0 + nx + j * cw + cw / 2;
      o += txt(cx, y0 + max * ch + 21, labels[j], 13);
      for (var k = 1; k <= values[j]; k++) o += mark(kind, cx, y0 + (max - k) * ch + ch / 2);
    }
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' ' + H + '">' + o + '</svg>', alt: (title || '조사한 자료') + '를 ' + kind + '로 나타낸 그래프' };
  }

  // 조사한 자료: 학생 한 명이 낱말 카드 하나 (4개씩 줄지어)
  function cards(words, title) {
    var cols = 4, cw = 72, ch = 36, top = title ? 34 : 10, rows = Math.ceil(words.length / cols);
    var W = cols * cw + 20, H = top + rows * (ch + 8) + 6, o = '';
    if (title) o += txt(W / 2, 22, title, 16, true);
    for (var i = 0; i < words.length; i++) {
      var x = 10 + (i % cols) * cw, y = top + Math.floor(i / cols) * (ch + 8);
      o += '<rect x="' + (x + 3) + '" y="' + y + '" width="' + (cw - 6) + '" height="' + ch + '" rx="6" fill="var(--fig-2)" fill-opacity="0.18" stroke="currentColor" stroke-width="1.2"/>';
      o += txt(x + cw / 2, y + 23, words[i], 14);
    }
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' ' + H + '">' + o + '</svg>', alt: '학생들이 고른 것을 한 장씩 적은 카드 ' + words.length + '장' };
  }

  // 표 (서식 글): 머리행 + 수 행 + 합계
  function table(what, labels, values, total, unknown) {
    var head = '| ' + what + ' | ' + labels.join(' | ') + ' | 합계 |';
    var line = '|' + labels.concat(['', '']).map(function () { return '---'; }).join('|') + '|';
    var vals = values.map(function (v, i) { return i === unknown ? '□' : String(v); });
    var row = '| 학생 수(명) | ' + vals.join(' | ') + ' | ' + (unknown === -1 ? '□' : total) + ' |';
    return head + '\n' + line + '\n' + row;
  }

  function sum(a) { return a.reduce(function (s, v) { return s + v; }, 0); }
  // 항목 이름 + "을/를 좋아하는 학생"
  function who(t, item) { return item + Tutor_josa(item, '을/를') + ' ' + t.verb + ' 학생'; }
  var Tutor_josa = null; // make 안에서 R.josa 로 채운다

Tutor.registerUnit({
  id: 'math-e2-11',
  course: 'math-e2',
  title: '표와 그래프',
  summary: '조사한 자료를 분류해 표로 나타내고, ○, ×, /를 이용한 그래프로 그려 알 수 있는 것을 말해요.',
  goals: [
    '알고 싶은 것을 정해 자료를 조사할 수 있어요.',
    '조사한 자료를 분류하여 표로 나타낼 수 있어요.',
    '표를 보고 ○, ×, /를 이용해 그래프로 나타낼 수 있어요.',
    '표와 그래프를 보고 알 수 있는 것을 말하고, 편리한 점을 비교할 수 있어요.',
  ],
  standards: ['[2수04-02]', '[2수04-03]'],

  concepts: [
    {
      title: '자료 모으기',
      body: '우리 반 친구들이 어떤 과일을 좋아하는지 알고 싶어요. 이럴 때 **조사**를 해요.\n\n조사하는 순서:\n1. 무엇을 알고 싶은지 정해요. (좋아하는 과일)\n2. 어떻게 조사할지 정해요. (손 들기, 붙임 종이에 쓰기, 한 명씩 물어보기)\n3. 친구들의 답을 모아요.\n\n이렇게 모은 것을 **자료**라고 해요.\n\n> 💡 한 사람이 한 번만 답하게 해요. 그래야 바르게 셀 수 있어요.',
      easy: '반 친구들에게 "어떤 과일을 제일 좋아해?" 하고 물어본다고 생각해 보세요.\n\n친구마다 답을 종이에 하나씩 써서 칠판에 붙이면, 그 종이들이 모두 자료예요.',
      check: {
        type: 'choice',
        q: '우리 반 친구들이 좋아하는 과일을 알아보려고 해요. 알맞은 방법은 무엇일까요?',
        choices: ['친구들에게 좋아하는 과일을 한 명씩 물어봐요.', '내가 좋아하는 과일만 적어요.', '과일 가게에 있는 과일을 세어요.'],
        answer: 0,
        why: ['', '내 생각만으로는 친구들이 무엇을 좋아하는지 알 수 없어요.', '가게의 과일 수는 친구들이 좋아하는 과일과 관계없어요.'],
        explain: '친구들이 좋아하는 과일을 알려면 친구들에게 직접 물어보아야 해요.',
      },
    },
    {
      title: '표로 나타내기',
      body: '모은 자료를 **종류별로 나누어 세면** 표로 나타낼 수 있어요.\n\n| 과일 | 사과 | 포도 | 딸기 | 합계 |\n|---|---|---|---|---|\n| 학생 수(명) | 4 | 3 | 5 | 12 |\n\n**합계**는 모두 더한 수예요. 조사한 학생 수와 같아요. $4+3+5=12$\n\n> 💡 셀 때는 센 자료에 / 표시를 하면 빠뜨리거나 두 번 세지 않아요.',
      easy: '과일 카드를 사과는 사과끼리, 포도는 포도끼리 모아서 줄을 세워 보세요. 그다음 줄마다 몇 장인지 세어 칸에 쓰면 표가 돼요.\n\n마지막 칸 "합계"에는 카드가 모두 몇 장인지 써요.',
      fig: cards(['사과', '딸기', '포도', '사과', '딸기', '딸기', '포도', '사과', '딸기', '포도', '사과', '딸기'], '좋아하는 과일'),
      check: {
        type: 'short', check: 'number', unit: '명',
        q: '표를 보고 합계를 구해 보세요.\n\n| 계절 | 봄 | 여름 | 가을 | 겨울 | 합계 |\n|---|---|---|---|---|---|\n| 학생 수(명) | 3 | 5 | 2 | 4 | □ |',
        answer: '14',
        wrong: [{ a: '5', why: '가장 큰 수를 썼어요. 합계는 모든 수를 더한 거예요.' }],
        explain: '합계는 모두 더한 수예요. $3+5+2+4=14$이니까 14명이에요.',
      },
    },
    {
      title: '그래프로 나타내기',
      body: '표를 보고 **○, ×, /** 같은 표시로 **그래프**를 그릴 수 있어요.\n\n그리는 방법:\n1. 가로에 항목(사과, 포도, 딸기)을 써요.\n2. 세로에 학생 수를 1, 2, 3 … 으로 써요.\n3. 학생 한 명에 ○ 하나씩, **아래에서 위로 한 칸씩** 빈칸 없이 그려요.\n\n> ⚠️ 칸을 건너뛰거나 한 칸에 ○를 두 개 그리면 안 돼요.\n\n> 💡 세로 칸은 가장 큰 수만큼은 있어야 해요.',
      easy: '○ 하나는 친구 한 명이에요. 사과를 좋아하는 친구가 4명이면 사과 위에 ○를 4개 쌓아요.\n\n블록을 쌓듯 바닥부터 차곡차곡 쌓으면, 높이만 보고도 몇 명인지 알 수 있어요.',
      fig: graph(['사과', '포도', '딸기'], [4, 3, 5], '○', '좋아하는 과일'),
      check: {
        type: 'ox',
        q: '그래프에서 ○는 칸을 건너뛰면서 그려도 돼요.',
        answer: false,
        explain: '○는 **아래에서 위로 한 칸씩 빈칸 없이** 그려요. 칸을 건너뛰면 몇 명인지 바르게 알 수 없어요.',
      },
    },
    {
      title: '그래프를 보고 알 수 있는 것',
      body: '그래프를 보면 **가장 많은 것**과 **가장 적은 것**을 한눈에 알 수 있어요. ○가 가장 높이 쌓인 것이 가장 많아요.\n\n앞의 과일 그래프에서는\n- 가장 많은 학생이 좋아하는 과일: 딸기 (5명)\n- 가장 적은 학생이 좋아하는 과일: 포도 (3명)\n- 딸기는 포도보다 2명 더 많아요. $5-3=2$\n\n> 💡 두 항목의 차이는 ○ 개수의 차이예요.',
      easy: '키 재기를 하듯 ○ 탑의 높이를 비교해 보세요. 가장 높은 탑이 가장 많고, 가장 낮은 탑이 가장 적어요.\n\n두 탑의 높이 차이만큼이 몇 명 더 많은지예요.',
      fig: graph(['봄', '여름', '가을', '겨울'], [3, 6, 2, 4], '×', '좋아하는 계절'),
      check: {
        type: 'choice',
        q: '그림의 그래프에서 가장 많은 학생이 좋아하는 계절은 무엇일까요?',
        choices: ['여름', '가을', '겨울'],
        answer: 0,
        why: ['', '가을은 ×가 가장 적어요. 가장 적은 것을 골랐어요.', '겨울보다 여름의 ×가 더 높이 있어요.'],
        explain: '×가 가장 높이 쌓인 것은 여름(6명)이에요. 그래서 여름을 좋아하는 학생이 가장 많아요.',
      },
    },
    {
      title: '표와 그래프의 편리한 점',
      body: '자료, 표, 그래프는 저마다 좋은 점이 있어요.\n\n| 나타낸 것 | 좋은 점 |\n|---|---|\n| 조사한 자료 | **누가** 무엇을 골랐는지 알 수 있어요. |\n| 표 | 항목별 **수**와 **합계**를 바로 알 수 있어요. |\n| 그래프 | **가장 많은 것, 가장 적은 것**을 한눈에 알 수 있어요. |\n\n알고 싶은 것에 따라 알맞은 것을 골라 봐요.',
      easy: '"모두 몇 명이지?" 하고 궁금하면 표의 합계를 보면 돼요.\n\n"무엇이 제일 인기 있지?" 하고 궁금하면 그래프에서 가장 높은 것을 찾으면 돼요.',
      check: {
        type: 'choice',
        q: '조사한 학생이 모두 몇 명인지 바로 알 수 있는 것은 무엇일까요?',
        choices: ['표', '그래프', '조사한 자료'],
        answer: 0,
        why: ['', '그래프는 많고 적음을 한눈에 보기 좋아요. 모두 몇 명인지는 ○를 다 세어야 해요.', '조사한 자료는 하나하나 세어야 해요. 표에는 합계가 있어요.'],
        explain: '표에는 **합계** 칸이 있어서 조사한 학생 수를 바로 알 수 있어요.',
      },
    },
  ],

  examples: [
    {
      q: '서준이네 반 학생들이 기르고 싶은 동물을 조사한 표예요. 표를 보고 ○로 그래프를 그리고, 가장 많은 학생이 기르고 싶은 동물을 찾아보세요.\n\n| 동물 | 강아지 | 고양이 | 햄스터 | 합계 |\n|---|---|---|---|---|\n| 학생 수(명) | 6 | 4 | 2 | 12 |',
      fig: graph(['강아지', '고양이', '햄스터'], [6, 4, 2], '○', '기르고 싶은 동물'),
      steps: [
        '가로에 강아지, 고양이, 햄스터를 쓰고, 세로에 1부터 6까지 써요. 가장 큰 수가 6이니까 6칸이면 돼요.',
        '강아지 6개, 고양이 4개, 햄스터 2개의 ○를 아래에서 위로 한 칸씩 그려요.',
        '○가 가장 높이 쌓인 것은 강아지예요.',
      ],
      answer: '강아지',
    },
  ],

  terms: [
    { term: '조사', def: '알고 싶은 것을 물어보거나 살펴서 알아보는 거예요.' },
    { term: '자료', def: '조사해서 모은 답이나 내용이에요.' },
    { term: '분류', def: '같은 것끼리 나누어 모으는 거예요.' },
    { term: '표', def: '분류한 수를 칸에 정리한 것이에요. 항목별 수와 합계를 알기 쉬워요.' },
    { term: '합계', def: '모든 수를 더한 수예요. 조사한 전체 수와 같아요.' },
    { term: '그래프', def: '수를 ○, ×, / 같은 표시로 나타낸 그림이에요. 많고 적음을 한눈에 알 수 있어요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '우리 반 친구들이 좋아하는 운동을 조사하려고 해요. 먼저 할 일은 무엇일까요?',
      choices: ['무엇을 알고 싶은지 정해요.', '그래프부터 그려요.', '합계를 먼저 써요.', '가장 많은 운동을 미리 정해요.'],
      answer: 0,
      why: [
        '',
        '그래프는 자료를 모으고 표로 정리한 다음에 그려요.',
        '합계는 자료를 다 세고 나서 써요.',
        '가장 많은 것은 조사를 해야 알 수 있어요. 미리 정하면 안 돼요.',
      ],
      explain: '조사는 "무엇을 알고 싶은지 정하기 → 조사 방법 정하기 → 자료 모으기" 순서로 해요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', unit: '명', concept: 1,
      q: '하윤이네 모둠 학생들이 좋아하는 과일을 카드에 썼어요. 포도를 좋아하는 학생은 몇 명일까요?',
      fig: cards(['포도', '사과', '귤', '포도', '사과', '포도', '귤', '사과', '포도', '귤', '포도', '사과'], '좋아하는 과일'),
      answer: '5',
      wrong: [
        { a: '4', why: '하나를 빠뜨렸어요. 센 카드에 / 표시를 하며 다시 세어 보세요.' },
        { a: '6', why: '하나를 두 번 셌어요. 센 카드에 / 표시를 하며 다시 세어 보세요.' },
      ],
      explain: '포도 카드를 하나씩 세면 1, 2, 3, 4, 5장이에요. 그래서 5명이에요.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'number', unit: '명', concept: 1,
      q: '표를 보고 합계를 구해 보세요.\n\n| 운동 | 축구 | 줄넘기 | 수영 | 합계 |\n|---|---|---|---|---|\n| 학생 수(명) | 7 | 4 | 6 | □ |',
      answer: '17',
      wrong: [{ a: '7', why: '가장 큰 수를 썼어요. 합계는 모든 수를 더한 거예요.' }],
      explain: '$7+4+6=17$이니까 합계는 17명이에요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: '그래프를 그릴 때 ○를 아래에서 위로 한 칸에 하나씩 빈칸 없이 그려요.',
      answer: true,
      explain: '맞아요. ○ 하나가 한 명이에요. 아래에서 위로 빈칸 없이 그려야 높이를 보고 수를 바르게 알 수 있어요.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', unit: '명', concept: 3,
      q: '그래프를 보고, 고양이를 기르고 싶은 학생은 몇 명인지 구해 보세요.',
      fig: graph(['강아지', '고양이', '햄스터', '물고기'], [5, 3, 4, 2], '○', '기르고 싶은 동물'),
      answer: '3',
      wrong: [{ a: '5', why: '강아지의 ○를 셌어요. 고양이 위의 ○를 세어 보세요.' }],
      explain: '고양이 위에 ○가 3개 있어요. 그래서 3명이에요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '그래프를 보고, 가장 적은 학생이 좋아하는 과일을 골라 보세요.',
      fig: graph(['사과', '배', '귤', '딸기'], [4, 2, 5, 3], '/', '좋아하는 과일'),
      choices: ['배', '귤', '사과', '딸기'],
      answer: 0,
      why: [
        '',
        '귤은 /가 가장 많아요. 가장 적은 것을 찾아요.',
        '사과(4명)보다 /가 더 적은 과일이 있어요.',
        '딸기(3명)보다 /가 더 적은 과일이 있어요.',
      ],
      explain: '/가 가장 적게 그려진 것은 배(2명)예요. 그래서 배를 좋아하는 학생이 가장 적어요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '가장 많은 학생이 좋아하는 계절을 **한눈에** 알아보기 좋은 것은 무엇일까요?',
      choices: ['그래프', '표', '조사한 자료'],
      answer: 0,
      why: ['', '표는 수를 하나하나 비교해야 해요. 그래프는 높이만 보면 돼요.', '조사한 자료는 하나하나 세어야 해요.'],
      explain: '그래프는 ○의 높이를 비교하면 가장 많은 것과 가장 적은 것을 한눈에 알 수 있어요.',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'number', unit: '명', concept: 3,
      q: '그래프를 보고, 축구를 좋아하는 학생은 수영을 좋아하는 학생보다 몇 명 더 많은지 구해 보세요.',
      fig: graph(['축구', '줄넘기', '수영', '피구'], [7, 3, 4, 5], '○', '좋아하는 운동'),
      answer: '3',
      hint: '축구와 수영의 ○ 개수를 각각 세어 보세요.',
      wrong: [
        { a: '11', why: '두 수를 더했어요. 몇 명 더 많은지는 큰 수에서 작은 수를 빼요.' },
        { a: '4', why: '줄넘기(3명)와 헷갈렸어요. 수영의 ○를 다시 세어 보세요.' },
      ],
      explain: '축구는 7명, 수영은 4명이에요. $7-4=3$이니까 3명 더 많아요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '명', concept: 1,
      q: '수아네 반 학생 20명이 좋아하는 계절을 조사한 표예요. 가을을 좋아하는 학생은 몇 명일까요?\n\n| 계절 | 봄 | 여름 | 가을 | 겨울 | 합계 |\n|---|---|---|---|---|---|\n| 학생 수(명) | 6 | 5 | □ | 4 | 20 |',
      answer: '5',
      hint: '합계에서 나머지 계절의 학생 수를 빼 보세요.',
      wrong: [{ a: '15', why: '나머지 세 계절의 수를 더하기만 했어요. 합계 20에서 15를 빼요.' }],
      explain: '봄, 여름, 겨울을 더하면 $6+5+4=15$예요. 합계가 20이니까 가을은 $20-15=5$, 5명이에요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: '칸', concept: 2,
      q: '다음 표를 ○ 그래프로 나타내려고 해요. 세로에 학생 수를 적어도 몇 칸까지 그려야 할까요?\n\n| 과일 | 사과 | 배 | 포도 | 귤 | 합계 |\n|---|---|---|---|---|---|\n| 학생 수(명) | 5 | 3 | 7 | 4 | 19 |',
      answer: '7',
      hint: '가장 많은 학생 수를 그릴 수 있어야 해요.',
      wrong: [{ a: '19', why: '합계만큼 그릴 필요는 없어요. 한 항목의 ○가 가장 많을 때만큼 있으면 돼요.' }],
      explain: '포도를 좋아하는 학생 7명을 ○ 7개로 그려야 하니까 세로는 적어도 7칸이 있어야 해요.',
    },
    {
      id: 'p11', level: 2, type: 'ox', concept: 4,
      q: '그래프를 보면 조사한 학생 한 명 한 명이 무엇을 골랐는지 알 수 있어요.',
      answer: false,
      explain: '그래프는 항목별로 몇 명인지 보여 줘요. **누가** 무엇을 골랐는지는 조사한 자료를 봐야 알 수 있어요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 3,
      q: '그래프를 보고 **바르게** 말한 것을 골라 보세요.',
      fig: graph(['봄', '여름', '가을', '겨울'], [5, 2, 6, 3], '×', '좋아하는 계절'),
      choices: ['가을을 좋아하는 학생이 가장 많아요.', '여름을 좋아하는 학생은 겨울보다 많아요.', '봄을 좋아하는 학생은 4명이에요.', '조사한 학생은 모두 15명이에요.'],
      answer: 0,
      why: [
        '',
        '여름은 2명, 겨울은 3명이라서 여름이 더 적어요.',
        '봄 위의 ×를 다시 세어 보세요. 5개예요.',
        '모두 더하면 $5+2+6+3=16$, 16명이에요.',
      ],
      explain: '×가 가장 높이 쌓인 것은 가을(6명)이에요. 그래서 가을을 좋아하는 학생이 가장 많아요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '명', concept: 3,
      q: '도윤이네 반 학생 18명이 기르고 싶은 동물을 조사해 그래프로 나타내다가 물고기를 빠뜨렸어요. 물고기를 기르고 싶은 학생은 몇 명일까요?',
      fig: graph(['강아지', '고양이', '햄스터', '물고기'], [6, 5, 3, 0], '○', '기르고 싶은 동물', 6),
      answer: '4',
      hint: '그래프에 그려진 학생 수를 모두 더한 다음 18에서 빼 보세요.',
      wrong: [{ a: '14', why: '그래프에 그려진 학생 수를 더하기만 했어요. 18에서 14를 빼요.' }],
      explain: '그래프에 그려진 학생은 $6+5+3=14$명이에요. 반 학생은 18명이니까 물고기는 $18-14=4$, 4명이에요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 3,
      q: '지아네 반에서 좋아하는 과일을 조사했더니 사과 5명, 배 3명, 귤 6명, 딸기 4명이었어요. 그런데 전학 온 친구 3명이 모두 딸기를 좋아한대요. 이 친구들까지 넣으면 가장 많은 학생이 좋아하는 과일은 무엇일까요?',
      choices: ['딸기', '귤', '사과', '배'],
      answer: 0,
      why: [
        '',
        '전학 온 친구들을 넣기 전에는 귤이 가장 많았어요. 딸기에 3명을 더해 보세요.',
        '사과는 5명 그대로예요. 딸기는 $4+3=7$명이 돼요.',
        '배는 3명으로 가장 적어요.',
      ],
      hint: '딸기를 좋아하는 학생 수가 몇 명으로 바뀌는지 먼저 구해 보세요.',
      explain: '딸기는 $4+3=7$명이 돼요. 귤 6명보다 많아지니까 이제 딸기가 가장 많아요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '명', concept: 1,
      q: '반 학생 15명이 강아지, 고양이, 햄스터 중 하나를 골랐어요. 햄스터는 3명이고, 강아지를 고른 학생은 고양이를 고른 학생보다 2명 더 많아요. 강아지를 고른 학생은 몇 명일까요?',
      answer: '7',
      hint: '강아지와 고양이를 합하면 몇 명인지 먼저 구하고, 여러 수를 넣어 맞춰 보세요.',
      wrong: [
        { a: '5', why: '고양이를 고른 학생 수를 구했어요. 강아지는 고양이보다 2명 더 많아요.' },
        { a: '6', why: '12명을 똑같이 나누었어요. 강아지가 고양이보다 2명 더 많아야 해요.' },
      ],
      explain: '강아지와 고양이를 합하면 $15-3=12$명이에요. 고양이가 5명이면 강아지는 7명이고, $5+7=12$, $7-5=2$로 맞아요. 그래서 강아지는 7명이에요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '서연이는 반 친구들이 좋아하는 운동을 조사했어요. "피구를 좋아하는 친구가 누구누구인지" 알고 싶다면 무엇을 보아야 할까요?',
      choices: ['조사한 자료', '표', '그래프'],
      answer: 0,
      why: ['', '표에는 피구를 좋아하는 학생 수만 있어요. 누구인지는 나오지 않아요.', '그래프에는 피구를 좋아하는 학생 수만 있어요. 누구인지는 나오지 않아요.'],
      explain: '표와 그래프는 수만 보여 줘요. 누가 무엇을 골랐는지는 이름과 답이 함께 있는 조사한 자료를 봐야 알 수 있어요.',
    },
  ],

  deeper: [
    {
      title: '그래프는 생활 곳곳에 있어요',
      body: '날씨 안내에서 요일별 기온을, 학교에서는 반별 독서량을 그래프로 보여 줄 때가 있어요. 수를 줄줄이 읽는 것보다 그림으로 보면 많고 적음을 금방 알 수 있기 때문이에요.\n\n3학년에서는 그림 하나가 10명, 100명처럼 큰 수를 나타내는 **그림그래프**를 배워요. 4학년에서는 막대의 길이로 나타내는 **막대그래프**를 배워요.',
    },
  ],

  faq: [
    {
      q: '그래프를 위에서 아래로 그리면 안 돼요?',
      a: '○는 아래에서 위로 쌓듯이 그려요. 그래야 높이를 보고 바로 몇 명인지 알 수 있어요.\n\n가로로 눕힌 그래프라면 왼쪽에서 오른쪽으로 빈칸 없이 그려요.',
    },
    {
      q: '○ 대신 다른 모양으로 그려도 돼요?',
      a: '네, ×나 /로 그려도 돼요. 한 칸에 표시 하나가 한 명이라는 약속만 지키면 돼요.\n\n한 그래프 안에서는 같은 표시를 쓰는 것이 보기 좋아요.',
    },
    {
      q: '합계는 왜 써요?',
      a: '합계를 보면 조사한 사람이 모두 몇 명인지 바로 알 수 있어요.\n\n합계가 조사한 사람 수와 같은지 확인하면 빠뜨리거나 두 번 센 것도 찾을 수 있어요.',
    },
  ],

  mistakes: [
    '자료를 셀 때 같은 것을 두 번 세거나 빠뜨리는 실수 — 센 것에 / 표시를 하며 세어요.',
    '그래프에서 ○를 위에서부터 그리거나 칸을 건너뛰는 실수 — 아래에서 위로 빈칸 없이 그려요.',
    '합계 칸에 가장 큰 수를 쓰는 실수 — 합계는 모든 수를 더한 거예요.',
  ],

  gens: [
    {
      id: 'count-data',
      level: 1,
      title: '조사한 자료를 세어 표로 나타내기',
      make: function (R) {
        Tutor_josa = R.josa;
        var t = R.pick(TOPICS);
        var items = R.sample(t.items, R.int(3, 4));
        var counts = items.map(function () { return R.int(1, 6); });
        var words = [];
        items.forEach(function (it, i) { for (var k = 0; k < counts[i]; k++) words.push(it); });
        words = R.shuffle(words);
        var name = R.pick(NAMES);
        var total = sum(counts);
        var intro = name + '네 모둠 학생들이 ' + t.title.replace(t.verb + ' ', t.verb + ' ') + R.josa(t.what, '을/를') + ' 카드에 썼어요.';
        intro = name + '네 반 학생들이 ' + t.verb + ' ' + t.what + R.josa(t.what, '을/를') + ' 하나씩 카드에 썼어요.';
        if (R.bool(0.25)) {
          return {
            type: 'short', check: 'number', unit: '명', concept: 1,
            q: intro + ' 조사한 학생은 모두 몇 명일까요?',
            fig: cards(words, t.title),
            answer: String(total),
            wrong: [{ a: String(total - 1), why: '카드 하나를 빠뜨렸어요. 센 카드에 / 표시를 하며 다시 세어 보세요.' }, { a: String(total + 1), why: '카드 하나를 두 번 셌어요. 센 카드에 / 표시를 하며 다시 세어 보세요.' }],
            explain: '카드 한 장이 학생 한 명이에요. ' + items.map(function (it, i) { return it + ' ' + counts[i]; }).join(', ') + '장을 모두 더하면 $' + counts.join('+') + '=' + total + '$, ' + total + '명이에요.',
          };
        }
        var j = R.int(0, items.length - 1), c = counts[j];
        var wrong = [{ a: String(c + 1), why: '카드 하나를 두 번 셌어요. 센 카드에 / 표시를 하며 다시 세어 보세요.' }];
        if (c > 1) wrong.push({ a: String(c - 1), why: '카드 하나를 빠뜨렸어요. 센 카드에 / 표시를 하며 다시 세어 보세요.' });
        return {
          type: 'short', check: 'number', unit: '명', concept: 1,
          q: intro + ' ' + who(t, items[j]) + R.josa('생', '은/는') + ' 몇 명일까요?',
          fig: cards(words, t.title),
          answer: String(c),
          wrong: wrong,
          explain: items[j] + ' 카드만 골라 하나씩 세면 ' + c + '장이에요. 그래서 ' + c + '명이에요.',
        };
      },
    },
    {
      id: 'read-graph',
      level: 1,
      title: '그래프 읽기 (몇 명, 가장 많은 것, 가장 적은 것)',
      make: function (R) {
        Tutor_josa = R.josa;
        var t = R.pick(TOPICS);
        var items = R.sample(t.items, R.int(3, 4));
        var counts = R.sample([1, 2, 3, 4, 5, 6, 7], items.length); // 서로 다른 수 → 가장 많은 것·적은 것이 하나
        var kind = R.pick(['○', '×', '/']);
        var fig = graph(items, counts, kind, t.title);
        var mode = R.int(0, 2);
        var maxI = counts.indexOf(Math.max.apply(null, counts)), minI = counts.indexOf(Math.min.apply(null, counts));
        if (mode === 0) {
          var j = R.int(0, items.length - 1), c = counts[j];
          var wrong = [];
          if (c > 1) wrong.push({ a: String(c - 1), why: kind + '를 하나 덜 셌어요. 아래에서부터 하나씩 다시 세어 보세요.' });
          wrong.push({ a: String(c + 1), why: kind + '를 하나 더 셌어요. 아래에서부터 하나씩 다시 세어 보세요.' });
          return {
            type: 'short', check: 'number', unit: '명', concept: 3,
            q: '그래프를 보고, ' + who(t, items[j]) + R.josa('생', '은/는') + ' 몇 명인지 구해 보세요.',
            fig: fig,
            answer: String(c),
            wrong: wrong,
            explain: items[j] + ' 위에 ' + kind + '가 ' + c + '개 있어요. ' + kind + ' 하나가 한 명이니까 ' + c + '명이에요.',
          };
        }
        var most = mode === 1;
        var ans = most ? maxI : minI, opp = most ? minI : maxI;
        var why = items.map(function (it, i) {
          if (i === ans) return '';
          if (i === opp) return it + R.josa(it, '은/는') + ' ' + kind + '가 가장 ' + (most ? '적어요' : '많아요') + '. 가장 ' + (most ? '많은' : '적은') + ' 것을 찾아요.';
          return it + R.josa(it, '은/는') + ' ' + counts[i] + '명이에요. ' + items[ans] + R.josa(items[ans], '이/가') + ' ' + counts[ans] + '명으로 더 ' + (most ? '많아요' : '적어요') + '.';
        });
        return {
          type: 'choice', concept: 3,
          q: '그래프를 보고, 가장 ' + (most ? '많은' : '적은') + ' 학생이 ' + t.verb.replace(/은$/, '') + (t.verb === '좋아하는' ? '' : '') + '는 ' + t.what + R.josa(t.what, '을/를') + ' 골라 보세요.',
          fig: fig,
          choices: items.slice(),
          answer: ans,
          why: why,
          explain: kind + '가 가장 ' + (most ? '높이' : '낮게') + ' 쌓인 것은 ' + items[ans] + '(' + counts[ans] + '명)이에요. 그래서 ' + items[ans] + R.josa(items[ans], '이/가') + ' 가장 ' + (most ? '많아요' : '적어요') + '.',
        };
      },
    },
    {
      id: 'table-graph-calc',
      level: 2,
      title: '표와 그래프로 차이·합계·빠진 수 구하기',
      make: function (R) {
        Tutor_josa = R.josa;
        var t = R.pick(TOPICS);
        var items = R.sample(t.items, 4);
        var counts = items.map(function () { return R.int(1, 8); });
        var total = sum(counts);
        var name = R.pick(NAMES);
        var mode = R.int(0, 2);
        if (mode === 0) {
          // 그래프: 두 항목의 차이
          var ij = R.sample([0, 1, 2, 3], 2);
          if (counts[ij[0]] === counts[ij[1]]) counts[ij[0]] = counts[ij[1]] === 8 ? 5 : counts[ij[1]] + 2;
          var a = counts[ij[0]] > counts[ij[1]] ? ij[0] : ij[1], b = a === ij[0] ? ij[1] : ij[0];
          var diff = counts[a] - counts[b];
          var kind = R.pick(['○', '×', '/']);
          return {
            type: 'short', check: 'number', unit: '명', concept: 3,
            q: '그래프를 보고, ' + who(t, items[a]) + R.josa('생', '은/는') + ' ' + items[b] + R.josa(items[b], '을/를') + ' ' + t.verb + ' 학생보다 몇 명 더 많은지 구해 보세요.',
            fig: graph(items, counts, kind, t.title),
            answer: String(diff),
            hint: '두 항목의 ' + kind + ' 개수를 각각 세어 보세요.',
            wrong: [{ a: String(counts[a] + counts[b]), why: '두 수를 더했어요. 몇 명 더 많은지는 큰 수에서 작은 수를 빼요.' }],
            explain: items[a] + R.josa(items[a], '은/는') + ' ' + counts[a] + '명, ' + items[b] + R.josa(items[b], '은/는') + ' ' + counts[b] + '명이에요. $' + counts[a] + '-' + counts[b] + '=' + diff + '$이니까 ' + diff + '명 더 많아요.',
          };
        }
        if (mode === 1) {
          // 표: 빠진 수 (합계가 주어짐)
          var u = R.int(0, 3), known = total - counts[u];
          var others = counts.filter(function (v, i) { return i !== u; });
          return {
            type: 'short', check: 'number', unit: '명', concept: 1,
            q: name + '네 반 학생 ' + total + '명이 ' + t.verb + ' ' + t.what + R.josa(t.what, '을/를') + ' 조사한 표예요. ' + who(t, items[u]) + R.josa('생', '은/는') + ' 몇 명일까요?\n\n' + table(t.what, items, counts, total, u),
            answer: String(counts[u]),
            hint: '합계에서 나머지 학생 수를 빼 보세요.',
            wrong: known !== counts[u] ? [{ a: String(known), why: '나머지 수를 더하기만 했어요. 합계 ' + total + '에서 ' + known + R.josa(known, '을/를') + ' 빼요.' }] : [],
            explain: '나머지를 더하면 $' + others.join('+') + '=' + known + '$' + R.josa(known, '이에요/예요') + '. 합계가 ' + total + '이니까 $' + total + '-' + known + '=' + counts[u] + '$, ' + counts[u] + '명이에요.',
          };
        }
        // 그래프: 조사한 학생 수(합계)
        var kind2 = R.pick(['○', '×', '/']);
        var mx = Math.max.apply(null, counts);
        return {
          type: 'short', check: 'number', unit: '명', concept: 3,
          q: '그래프를 보고, 조사한 학생은 모두 몇 명인지 구해 보세요.',
          fig: graph(items, counts, kind2, t.title),
          answer: String(total),
          hint: '항목마다 ' + kind2 + '의 개수를 세어 모두 더해 보세요.',
          wrong: mx !== total ? [{ a: String(mx), why: '가장 많은 항목의 수만 셌어요. 모든 항목의 수를 더해요.' }] : [],
          explain: items.map(function (it, i) { return it + ' ' + counts[i] + '명'; }).join(', ') + '이에요. $' + counts.join('+') + '=' + total + '$이니까 모두 ' + total + '명이에요.',
        };
      },
    },
  ],
});
})();
