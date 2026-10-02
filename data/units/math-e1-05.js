/* 1학년 수학 · 50까지의 수
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 10, 십몇, 19까지의 수 모으기와 가르기, 몇십과 몇십몇(50까지), 수의 순서, 크기 비교.
 * 1학년 말로 "10개씩 묶음", "낱개"를 쓴다(자리 이름은 2학년). 크기 비교는 >, < 기호 없이 말로 한다.
 * 받아올림이 있는 덧셈은 뒤 단원(덧셈과 뺄셈(3))에서 배우므로 모으기는 "이어 세기"로 설명한다.
 * 그림: 10칸 틀·10개씩 묶음 막대는 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
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
  // 10칸 틀 두 개(20칸): 앞에서부터 a 개는 1번 색, 이어서 b 개는 2번 색
  function frame20(a, b, alt) {
    var s = '', n = a + (b || 0);
    for (var i = 0; i < 20; i++) {
      var f = Math.floor(i / 10), k = i % 10;
      var x = 10 + f * 220 + (k % 5) * 40, y = 10 + Math.floor(k / 5) * 40;
      s += '<rect x="' + x + '" y="' + y + '" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2"/>';
      if (i < n) {
        s += '<circle cx="' + (x + 20) + '" cy="' + (y + 20) + '" r="13" fill="' + (i < a ? 'var(--fig-1)' : 'var(--fig-2)') + '" fill-opacity="0.75" stroke="currentColor" stroke-width="1.5"/>';
      }
    }
    return { type: 'svg', svg: '<svg viewBox="0 0 440 100">' + s + '</svg>', alt: alt };
  }
  // 10칸 틀 하나
  function frame10(a, b, alt) {
    var s = '', n = a + (b || 0);
    for (var i = 0; i < 10; i++) {
      var x = 10 + (i % 5) * 40, y = 10 + Math.floor(i / 5) * 40;
      s += '<rect x="' + x + '" y="' + y + '" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2"/>';
      if (i < n) {
        s += '<circle cx="' + (x + 20) + '" cy="' + (y + 20) + '" r="13" fill="' + (i < a ? 'var(--fig-1)' : 'var(--fig-2)') + '" fill-opacity="0.75" stroke="currentColor" stroke-width="1.5"/>';
      }
    }
    return { type: 'svg', svg: '<svg viewBox="0 0 220 100">' + s + '</svg>', alt: alt };
  }

Tutor.registerUnit({
  id: 'math-e1-05',
  course: 'math-e1',
  title: '50까지의 수',
  summary: '10과 십몇, 몇십을 알아보고, 50까지의 수를 세고 읽고 쓰며 순서와 크기를 비교해요.',
  goals: [
    '10을 알고, 10을 두 수로 모으고 가를 수 있어요.',
    '10개씩 묶음과 낱개로 50까지의 수를 세고 두 가지로 읽을 수 있어요.',
    '50까지의 수의 순서를 알고 두 수의 크기를 비교할 수 있어요.',
  ],
  standards: ['[2수01-01]', '[2수01-03]', '[2수01-04]'],

  concepts: [
    {
      title: '10 알아보기',
      body: '9보다 1 큰 수를 **10**이라고 해요. 10은 **십** 또는 **열**이라고 읽어요.\n\n10은 두 수로 **가를** 수 있어요. 10칸 틀에 6개와 4개가 있으면 모두 10개예요.\n\n- 6과 4를 **모으면** 10이에요.\n- 10은 6과 4로 **가를** 수 있어요.\n\n10은 1과 9, 2와 8, 3과 7, 4와 6, 5와 5로 가를 수 있어요.\n\n> 💡 10칸 틀에서 빈칸을 세면 10이 되려면 몇이 더 있어야 하는지 알 수 있어요.',
      easy: '두 손을 펴 봐요. 손가락이 모두 **열 개**예요. 이것이 10이에요.\n\n한 손을 접고 다른 손은 펴 봐요. 접은 손가락 5개, 편 손가락 5개예요. 10은 5와 5로 가를 수 있어요.\n\n손가락 3개만 접으면 편 손가락은 7개예요. 10은 3과 7로도 가를 수 있어요.',
      fig: frame10(6, 4, '10칸 틀에 6개와 4개가 다른 색으로 채워진 그림'),
      check: {
        type: 'choice',
        q: '10은 7과 몇으로 가를 수 있을까요?',
        choices: ['3', '4', '17'],
        answer: 0,
        why: ['', '7과 4를 모으면 11이에요. 10칸 틀에 7개를 놓고 빈칸을 세어 보세요.', '10과 7을 모았어요. 10을 둘로 나누면 7과 몇이 되는지 찾아요.'],
        explain: '10칸 틀에 7개가 있으면 빈칸은 3개예요. 그래서 10은 7과 3으로 가를 수 있어요.',
      },
    },
    {
      title: '십몇 알아보기',
      body: '10개씩 묶음 1개와 낱개 3개를 **13**이라고 해요. **십삼** 또는 **열셋**이라고 읽어요.\n\n| 수 | 읽기 | 읽기 |\n|---|---|---|\n| 11 | 십일 | 열하나 |\n| 12 | 십이 | 열둘 |\n| 13 | 십삼 | 열셋 |\n| 14 | 십사 | 열넷 |\n| 15 | 십오 | 열다섯 |\n| 16 | 십육 | 열여섯 |\n| 17 | 십칠 | 열일곱 |\n| 18 | 십팔 | 열여덟 |\n| 19 | 십구 | 열아홉 |\n\n> 💡 13에서 앞의 1은 **10개씩 묶음 1개**, 뒤의 3은 **낱개 3개**를 나타내요.',
      easy: '달걀 10개가 든 판 하나와 낱개 달걀 3개가 있어요.\n\n판 하나는 10개예요. 10에서 이어 세면 11, 12, 13이에요. 그래서 달걀은 모두 13개예요.\n\n"판 1개, 낱개 3개"를 그대로 붙여 쓰면 13이 돼요.',
      fig: beads([[13, '']], '10개씩 묶음 1개와 낱개 3개'),
      check: {
        type: 'short', check: 'number',
        q: '10개씩 묶음 1개와 낱개 6개는 얼마일까요?',
        answer: '16',
        wrong: [
          { a: '7', why: '10개씩 묶음을 1개로 셌어요. 묶음 하나에는 10개가 들어 있어요.' },
          { a: '61', why: '묶음과 낱개의 자리를 바꿨어요. 묶음의 수를 앞에, 낱개의 수를 뒤에 써요.' },
        ],
        explain: '10개씩 묶음 1개는 10이고, 낱개 6개를 더 세면 11, 12, 13, 14, 15, 16이에요. 그래서 16이에요.',
      },
    },
    {
      title: '19까지의 수 모으기와 가르기',
      body: '두 수를 **모으면** 더 큰 수가 되고, 한 수를 두 수로 **가를** 수 있어요.\n\n**모으기**: 9와 4를 모아 봐요. 9 다음부터 4개를 이어 세면 10, 11, 12, 13이에요. 9와 4를 모으면 13이에요.\n\n**가르기**: 15는 10과 5로 가를 수 있어요. 8과 7, 9와 6으로도 가를 수 있어요.\n\n> 💡 10과 몇을 모으면 십몇이 돼요. 10과 4를 모으면 14예요.',
      easy: '구슬 9개가 있는 주머니와 4개가 있는 주머니가 있어요.\n\n두 주머니의 구슬을 한 바구니에 쏟아요. 하나씩 세면 13개예요. 이것이 모으기예요.\n\n13개를 다시 두 주머니에 나누어 담는 것이 가르기예요.',
      fig: frame20(9, 4, '10칸 틀 두 개에 9개와 4개가 다른 색으로 채워진 그림'),
      check: {
        type: 'choice',
        q: '8과 5를 모으면 얼마일까요?',
        choices: ['13', '12', '3'],
        answer: 0,
        why: ['', '하나를 덜 셌어요. 8 다음부터 9, 10, 11, 12, 13으로 5번 이어 세요.', '두 수의 차를 구했어요. 모으기는 둘을 합쳐서 더 많아지는 거예요.'],
        explain: '8 다음부터 5개를 이어 세면 9, 10, 11, 12, 13이에요. 그래서 13이에요.',
      },
    },
    {
      title: '몇십과 몇십몇',
      body: '10개씩 묶음 2개는 **20**이에요. 10개씩 묶음이 몇 개인지에 따라 수가 정해져요.\n\n| 수 | 10개씩 묶음 | 읽기 |\n|---|---|---|\n| 10 | 1개 | 십, 열 |\n| 20 | 2개 | 이십, 스물 |\n| 30 | 3개 | 삼십, 서른 |\n| 40 | 4개 | 사십, 마흔 |\n| 50 | 5개 | 오십, 쉰 |\n\n10개씩 묶음 3개와 낱개 7개는 **37**이에요. **삼십칠** 또는 **서른일곱**이라고 읽어요.\n\n> ⚠️ 두 가지 읽기를 섞지 않아요. "삼십일곱", "서른칠"은 틀린 말이에요.',
      easy: '연필 10자루를 고무줄로 묶은 것이 3묶음, 낱개 연필이 7자루 있어요.\n\n묶음을 "십, 이십, 삼십" 하고 센 다음, 낱개를 "삼십일, 삼십이, …, 삼십칠" 하고 이어 세요. 연필은 모두 37자루예요.\n\n묶음 3개와 낱개 7개를 그대로 붙이면 37이 돼요.',
      fig: beads([[37, '']], '10개씩 묶음 3개와 낱개 7개'),
      check: {
        type: 'choice',
        q: '10개씩 묶음 4개와 낱개 2개인 수를 바르게 읽은 것은 무엇일까요?',
        choices: ['사십이', '이십사', '마흔이'],
        answer: 0,
        why: ['', '묶음과 낱개를 바꿔 읽었어요. 묶음이 4개이니 사십으로 시작해요.', '두 가지 읽기를 섞었어요. "사십이" 또는 "마흔둘"로 읽어요.'],
        explain: '10개씩 묶음 4개와 낱개 2개는 42예요. "사십이" 또는 "마흔둘"이라고 읽어요.',
      },
    },
    {
      title: '50까지의 수의 순서',
      body: '수를 순서대로 쓰면 하나씩 커져요.\n\n… 27, 28, 29, 30, 31 …\n\n- 바로 뒤의 수는 **1 큰 수**예요. 29보다 1 큰 수는 30이에요.\n- 바로 앞의 수는 **1 작은 수**예요. 40보다 1 작은 수는 39예요.\n- 23과 25 **사이의 수**는 24예요.\n\n> ⚠️ 29 다음은 30이에요. 낱개 9개에 하나가 더 생기면 10개가 되어 10개씩 묶음이 하나 늘어나요.',
      easy: '계단을 한 칸씩 올라간다고 생각해요. 한 칸 올라가면 1 큰 수, 한 칸 내려가면 1 작은 수예요.\n\n29번 계단에서 한 칸 올라가면 30번 계단이에요. 40번 계단에서 한 칸 내려가면 39번 계단이에요.',
      fig: { type: 'numberline', min: 20, max: 30, step: 1, labelEvery: 1, alt: '20부터 30까지 수가 적힌 수직선' },
      check: {
        type: 'short', check: 'number',
        q: '39보다 1 큰 수는 얼마일까요?',
        answer: '40',
        wrong: [
          { a: '38', why: '1 작은 수를 구했어요. 1 큰 수는 바로 뒤의 수예요.' },
          { a: '30', why: '낱개가 10개가 되면 10개씩 묶음이 하나 늘어요. 묶음 3개가 4개가 돼요.' },
        ],
        explain: '39 바로 뒤의 수는 40이에요. 낱개 9개에 하나가 더 생기면 10개가 되어, 10개씩 묶음이 4개가 돼요.',
      },
    },
    {
      title: '50까지 수의 크기 비교',
      body: '두 수의 크기를 비교할 때는 **10개씩 묶음의 수**를 먼저 봐요. 묶음이 많은 수가 더 커요.\n\n32와 28: 묶음이 3개와 2개예요. 32가 28보다 커요.\n\n묶음의 수가 같으면 **낱개의 수**를 봐요.\n\n34와 37: 묶음은 3개로 같고, 낱개는 4개와 7개예요. 37이 34보다 커요.\n\n> 💡 수의 순서에서 뒤에 있는 수가 더 커요.',
      easy: '10개짜리 사탕 봉지와 낱개 사탕이 있어요.\n\n봉지를 더 많이 가진 사람이 사탕이 더 많아요. 봉지 하나가 낱개 9개보다도 많으니까요.\n\n봉지 수가 같으면 그때 낱개를 비교해요.',
      fig: beads([[32, '32'], [28, '28']], '32와 28을 10개씩 묶음과 낱개로 나타낸 그림'),
      check: {
        type: 'ox',
        q: '41은 39보다 커요.',
        answer: true,
        explain: '41은 10개씩 묶음이 4개, 39는 3개예요. 묶음이 많은 41이 더 커요. 낱개 9개가 1개보다 많아도 묶음의 수를 먼저 봐요.',
      },
    },
  ],

  examples: [
    {
      q: '10개씩 묶음 3개와 낱개 5개인 수를 쓰고, 두 가지로 읽어 보세요.',
      fig: beads([[35, '']], '10개씩 묶음 3개와 낱개 5개'),
      steps: [
        '10개씩 묶음 3개는 30이에요.',
        '30에서 낱개 5개를 이어 세면 31, 32, 33, 34, 35예요.',
        '그래서 35라고 써요. "삼십오" 또는 "서른다섯"이라고 읽어요.',
      ],
      answer: '35 (삼십오, 서른다섯)',
    },
    {
      q: '26, 31, 29 중에서 가장 큰 수는 무엇일까요?',
      steps: [
        '10개씩 묶음의 수를 먼저 봐요. 26은 2개, 31은 3개, 29는 2개예요.',
        '묶음이 3개인 31이 가장 커요.',
        '26과 29는 묶음이 같으니 낱개를 봐요. 6보다 9가 크니 29가 26보다 커요.',
      ],
      answer: '31',
    },
  ],

  terms: [
    { term: '10', def: '9보다 1 큰 수예요. 십 또는 열이라고 읽어요.' },
    { term: '10개씩 묶음', def: '10개를 한 묶음으로 묶은 것이에요. 묶음 2개는 20이에요.' },
    { term: '낱개', def: '묶음에 들어가지 않고 하나씩 따로 있는 것이에요. 37에서 낱개는 7개예요.' },
    { term: '십몇', def: '10개씩 묶음 1개와 낱개 몇 개인 수예요. 11부터 19까지예요.' },
    { term: '몇십', def: '10개씩 묶음만 있고 낱개가 없는 수예요. 10, 20, 30, 40, 50이 있어요.' },
    { term: '모으기', def: '두 수를 하나로 합치는 것이에요. 9와 4를 모으면 13이에요.' },
    { term: '가르기', def: '한 수를 두 수로 나누는 것이에요. 15는 10과 5로 가를 수 있어요.' },
    { term: '1 큰 수', def: '바로 뒤의 수예요. 29보다 1 큰 수는 30이에요.' },
    { term: '1 작은 수', def: '바로 앞의 수예요. 40보다 1 작은 수는 39예요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
      q: '10은 4와 몇으로 가를 수 있을까요?',
      fig: frame10(4, 0, '10칸 틀에 4개가 채워진 그림'),
      answer: '6',
      wrong: [
        { a: '14', why: '10과 4를 모았어요. 10칸 틀에서 빈칸을 세어 보세요.' },
        { a: '4', why: '채워진 칸을 셌어요. 빈칸을 세어요.' },
      ],
      explain: '10칸 틀에 4개가 있으면 빈칸은 6개예요. 10은 4와 6으로 가를 수 있어요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '구슬은 모두 몇 개일까요?',
      fig: beads([[14, '']], '10개씩 묶음 1개와 낱개 4개'),
      answer: '14',
      wrong: [
        { a: '5', why: '10개씩 묶음을 1개로 셌어요. 묶음 하나에는 구슬이 10개 있어요.' },
        { a: '41', why: '묶음과 낱개의 자리를 바꿨어요. 묶음의 수를 앞에 써요.' },
      ],
      explain: '10개씩 묶음 1개와 낱개 4개예요. 10에서 이어 세면 11, 12, 13, 14라서 14개예요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '17을 바르게 읽은 것은 무엇일까요?',
      choices: ['열일곱', '십일곱', '일곱', '일칠'],
      answer: 0,
      why: [
        '',
        '두 가지 읽기를 섞었어요. "십칠" 또는 "열일곱"으로 읽어요.',
        '낱개만 읽었어요. 10개씩 묶음 1개도 읽어야 해요.',
        '숫자를 하나씩 따로 읽었어요. 17은 "십칠" 또는 "열일곱"이에요.',
      ],
      explain: '17은 "십칠" 또는 "열일곱"이라고 읽어요. 보기 중에서는 "열일곱"이 맞아요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', concept: 2,
      q: '7과 6을 모으면 얼마일까요?',
      fig: frame20(7, 6, '10칸 틀 두 개에 7개와 6개가 다른 색으로 채워진 그림'),
      answer: '13',
      wrong: [
        { a: '1', why: '두 수의 차를 구했어요. 모으기는 둘을 합치는 거예요.' },
        { a: '12', why: '하나를 덜 셌어요. 7 다음부터 6번 이어 세어 보세요.' },
      ],
      explain: '7 다음부터 6개를 이어 세면 8, 9, 10, 11, 12, 13이에요. 7과 6을 모으면 13이에요.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', concept: 2,
      q: '16은 10과 몇으로 가를 수 있을까요?',
      answer: '6',
      wrong: [{ a: '26', why: '10과 16을 모았어요. 16에서 10개씩 묶음 1개를 떼면 낱개가 몇 개 남는지 봐요.' }],
      explain: '16은 10개씩 묶음 1개와 낱개 6개예요. 그래서 16은 10과 6으로 가를 수 있어요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '구슬은 모두 몇 개일까요?',
      fig: beads([[23, '']], '10개씩 묶음 2개와 낱개 3개'),
      choices: ['23개', '32개', '5개', '203개'],
      answer: 0,
      why: [
        '',
        '묶음과 낱개를 바꿨어요. 10개씩 묶음이 2개이니 이십으로 시작해요.',
        '10개씩 묶음을 1개씩으로 셌어요. 묶음 하나는 10개예요.',
        '20과 3을 그대로 이어 썼어요. 10개씩 묶음 2개와 낱개 3개는 23이에요.',
      ],
      explain: '10개씩 묶음 2개는 20이에요. 20에서 낱개 3개를 이어 세면 21, 22, 23이라서 23개예요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'number', concept: 4,
      q: '36과 38 사이에 있는 수는 무엇일까요?',
      answer: '37',
      wrong: [{ a: '35', why: '36보다 1 작은 수예요. 36과 38의 가운데에 있는 수를 찾아요.' }],
      explain: '36, 37, 38 순서이므로 36과 38 사이에 있는 수는 37이에요.',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 5,
      q: '28은 31보다 커요.',
      answer: false,
      explain: '10개씩 묶음을 먼저 봐요. 28은 2개, 31은 3개예요. 그래서 31이 28보다 커요. 낱개 8이 1보다 커도 묶음의 수를 먼저 비교해요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
      q: '수직선에서 ?에 알맞은 수는 무엇일까요?',
      fig: { type: 'numberline', min: 40, max: 50, step: 1, labelEvery: 5, points: [{ x: 47, label: '?' }], alt: '40부터 50까지의 수직선에 ? 표시가 있는 그림' },
      answer: '47',
      hint: '45에서 한 칸씩 세어 보세요.',
      wrong: [
        { a: '46', why: '45에서 한 칸만 갔어요. 눈금을 하나씩 다시 세어 보세요.' },
        { a: '7', why: '40에서 몇 칸 갔는지만 썼어요. 40에서 7칸 간 곳의 수를 써요.' },
      ],
      explain: '45에서 오른쪽으로 한 칸씩 가면 46, 47이에요. 그래서 ?는 47이에요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 5,
      q: '가장 큰 수는 무엇일까요?',
      choices: ['45', '38', '42', '29'],
      answer: 0,
      why: [
        '',
        '낱개 8만 보았어요. 10개씩 묶음의 수를 먼저 비교해요. 38은 묶음이 3개예요.',
        '42와 45는 묶음이 4개로 같아요. 낱개를 비교하면 5가 2보다 커요.',
        '낱개 9만 보았어요. 29는 10개씩 묶음이 2개뿐이에요.',
      ],
      hint: '10개씩 묶음의 수를 먼저 비교해요.',
      explain: '묶음이 4개인 45와 42가 가장 커요. 둘은 묶음이 같으니 낱개를 비교하면 5가 2보다 커서 45가 가장 커요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: '장', concept: 3,
      q: '지호는 색종이를 10장씩 3묶음과 낱장 8장 가지고 있어요. 색종이는 모두 몇 장일까요?',
      answer: '38',
      hint: '10장씩 3묶음은 몇 장인지 먼저 생각해요.',
      wrong: [
        { a: '11', why: '묶음 수와 낱장 수를 그냥 더했어요. 10장씩 3묶음은 30장이에요.' },
        { a: '83', why: '묶음과 낱장의 자리를 바꿨어요. 묶음의 수를 앞에 써요.' },
      ],
      explain: '10장씩 3묶음은 30장이에요. 30에서 낱장 8장을 이어 세면 38장이에요.',
    },
    {
      id: 'p12', level: 2, type: 'order', concept: 5,
      q: '작은 수부터 차례로 놓으세요.',
      choices: ['19', '24', '31', '42'],
      answer: [0, 1, 2, 3],
      hint: '10개씩 묶음의 수가 적은 수부터 놓아요.',
      explain: '10개씩 묶음이 19는 1개, 24는 2개, 31은 3개, 42는 4개예요. 그래서 19, 24, 31, 42 순서예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 4,
      q: '어떤 수보다 1 큰 수는 30이에요. 어떤 수보다 1 작은 수는 얼마일까요?',
      answer: '28',
      hint: '먼저 어떤 수를 찾아요.',
      wrong: [
        { a: '29', why: '29는 어떤 수예요. 어떤 수보다 1 작은 수까지 구해야 해요.' },
        { a: '31', why: '30보다 1 큰 수를 구했어요. 30은 어떤 수보다 1 큰 수예요.' },
      ],
      explain: '1 큰 수가 30이니 어떤 수는 30 바로 앞의 수 29예요. 29보다 1 작은 수는 28이에요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', fixed: true, concept: 5,
      q: '10개씩 묶음 3개와 낱개 □개인 수가 35보다 커요. □에 들어갈 수 있는 수는 모두 몇 개일까요? (□는 0부터 9까지의 수예요.)',
      choices: ['3개', '4개', '5개', '6개'],
      answer: 1,
      why: [
        '하나를 빠뜨렸어요. 36, 37, 38, 39를 모두 세어 봐요.',
        '',
        '5도 넣었어요. 35는 35보다 크지 않아요.',
        '35보다 큰 수만 세어야 해요. □는 6, 7, 8, 9예요.',
      ],
      hint: '묶음이 3개로 같으니 낱개를 비교해요.',
      explain: '묶음이 3개로 같으니 낱개가 5보다 많아야 해요. □는 6, 7, 8, 9로 모두 4개예요. 35는 35와 같아서 들어가지 않아요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', concept: 3,
      q: '수 카드 2, 4, 1 중에서 2장을 골라 몇십몇을 만들어요. 만들 수 있는 가장 큰 수는 무엇일까요?',
      answer: '42',
      hint: '앞의 수가 10개씩 묶음의 수예요. 앞에 가장 큰 카드를 놓아요.',
      wrong: [
        { a: '41', why: '앞에는 4를 맞게 놓았어요. 뒤에는 남은 2와 1 중 큰 수를 놓아요.' },
        { a: '24', why: '카드 순서를 바꿨어요. 앞(10개씩 묶음의 수)에 가장 큰 4를 놓아요.' },
      ],
      explain: '앞의 수가 10개씩 묶음의 수예요. 가장 큰 4를 앞에, 남은 2와 1 중 큰 2를 뒤에 놓으면 42예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: '개', concept: 2,
      q: '사탕 13개를 민수와 지아가 나누어 가졌어요. 민수가 지아보다 3개 더 많이 가졌어요. 지아가 가진 사탕은 몇 개일까요?',
      answer: '5',
      hint: '13을 두 수로 가르고, 두 수가 3만큼 차이 나는 것을 찾아요.',
      wrong: [
        { a: '8', why: '민수가 가진 사탕을 구했어요. 지아는 민수보다 적게 가졌어요.' },
        { a: '10', why: '13에서 3만 빼고 멈췄어요. 13을 두 수로 갈라서 3만큼 차이 나는 두 수를 찾아요.' },
      ],
      explain: '13을 가르면 9와 4, 8과 5, 7과 6 …이 돼요. 이 가운데 3만큼 차이 나는 것은 8과 5예요. 민수가 8개, 지아가 5개를 가졌어요.',
    },
  ],

  deeper: [
    {
      title: '왜 10개씩 묶어서 셀까요?',
      body: '구슬 37개를 하나씩 세면 세다가 헷갈리기 쉬워요. 10개씩 묶어 두면 "묶음 3개, 낱개 7개"만 보고 바로 37이라는 것을 알 수 있어요.\n\n우리가 쓰는 수는 **10개가 모이면 한 묶음**이 되는 약속으로 만들어졌어요. 손가락이 10개라서 이렇게 되었다는 이야기도 있어요.\n\n다음 단원에서는 10개씩 묶음이 6개, 7개, … 10개인 수(60, 70, … 100)까지 알아봐요.',
    },
  ],

  faq: [
    {
      q: '열하나랑 십일 중에 뭐라고 읽어야 해요?',
      a: '둘 다 맞아요. 물건을 셀 때는 "사과 열한 개"처럼 말하고, 번호를 말할 때는 "11번"을 "십일 번"이라고 읽어요.\n\n다만 두 가지를 섞어서 "십하나"처럼 읽지는 않아요.',
    },
    {
      q: '29 다음은 왜 210이 아니고 30이에요?',
      a: '29는 10개씩 묶음 2개와 낱개 9개예요. 여기에 1개가 더 생기면 낱개가 10개가 되어 새 묶음이 돼요. 그래서 묶음 3개, 낱개 0개인 30이에요.',
    },
    {
      q: '28은 8이 1보다 큰데 왜 31보다 작아요?',
      a: '28의 앞의 2는 10개씩 묶음 2개, 31의 앞의 3은 묶음 3개예요. 묶음 하나(10개)가 낱개 8개보다 많으니 묶음의 수를 먼저 비교해야 해요. 그래서 31이 더 커요.',
    },
  ],

  mistakes: [
    '10개씩 묶음 1개를 1개로 세어 14를 5라고 하는 실수 — 묶음 하나에는 10개가 들어 있어요.',
    '"삼십일곱", "서른칠"처럼 두 가지 읽기를 섞는 실수 — "삼십칠" 또는 "서른일곱"으로 읽어요.',
    '28과 31에서 낱개만 보고 28이 크다고 하는 실수 — 10개씩 묶음의 수를 먼저 비교해요.',
  ],

  gens: [
    {
      id: 'count-bundles',
      level: 1,
      title: '10개씩 묶음과 낱개로 수 세기·읽기',
      make: function (R) {
        var t = R.int(1, 4), o = R.int(0, 9);
        if (R.int(1, 12) === 1) { t = 5; o = 0; }
        var n = 10 * t + o;
        var mode = o === 0 ? R.int(0, 1) : R.int(0, 2);
        var wrong = [];
        if (t + o !== n) wrong.push({ a: String(t + o), why: '10개씩 묶음을 1개로 셌어요. 묶음 하나에는 10개가 들어 있어요.' });
        if (o > 0 && o !== t) wrong.push({ a: String(10 * o + t), why: '묶음과 낱개의 자리를 바꿨어요. 묶음의 수를 앞에, 낱개의 수를 뒤에 써요.' });
        var how = '10개씩 묶음 ' + t + '개는 ' + (10 * t) + R.josa(10 * t, '이에요/예요') + '.' +
          (o ? ' ' + (10 * t) + '에서 낱개 ' + o + '개를 이어 세면 ' + n + R.josa(n, '이에요/예요') + '.' : '');
        if (mode === 0) {
          return {
            type: 'short', check: 'number', unit: '개', concept: t === 1 ? 1 : 3,
            q: '구슬은 모두 몇 개일까요?',
            fig: beads([[n, '']], '10개씩 묶음 ' + t + '개' + (o ? '와 낱개 ' + o + '개' : '')),
            answer: String(n),
            wrong: wrong,
            explain: how,
          };
        }
        if (mode === 1) {
          return {
            type: 'short', check: 'number', concept: t === 1 ? 1 : 3,
            q: '10개씩 묶음 ' + t + '개' + (o ? '와 낱개 ' + o + '개' : '') + '인 수는 얼마일까요?',
            answer: String(n),
            wrong: wrong,
            explain: how,
          };
        }
        // 읽기 고르기 (낱개가 있을 때만)
        var useSino = R.bool();
        var correct = useSino ? sino(n) : nat(n);
        var mixWhy = '두 가지 읽기를 섞었어요. "' + sino(n) + '" 또는 "' + nat(n) + '"' + R.josa(nat(n), '으로/로') + ' 읽어요.';
        var rev = 10 * o + t;
        var cands = useSino
          ? [[sino(10 * t) + NAT[o], mixWhy],
             [sino(rev), '10개씩 묶음과 낱개를 바꿔 읽었어요. 묶음이 ' + t + '개예요.'],
             [SINO[o], '낱개만 읽었어요. 10개씩 묶음도 읽어야 해요.'],
             [SINO[t] + SINO[o], '숫자를 하나씩 따로 읽었어요.']]
          : [[NAT10[t] + SINO[o], mixWhy],
             [nat(rev), '10개씩 묶음과 낱개를 바꿔 읽었어요. 묶음이 ' + t + '개예요.'],
             [NAT[o], '낱개만 읽었어요. 10개씩 묶음도 읽어야 해요.'],
             [NAT[t] + NAT[o], '숫자를 하나씩 따로 셌어요.']];
        var reason = {};
        cands.forEach(function (c, i) { if (i === 1 && rev > 50) return; if (c[0] !== correct && !(c[0] in reason)) reason[c[0]] = c[1]; });   // 바꿔 읽은 수가 50을 넘으면 빼요(아직 안 배운 수)
        var pick = R.choices(correct, Object.keys(reason), 4);
        return {
          type: 'choice', concept: t === 1 ? 1 : 3,
          q: n + R.josa(n, '을/를') + ' 바르게 읽은 것은 무엇일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: n + R.josa(n, '은/는') + ' 10개씩 묶음 ' + t + '개와 낱개 ' + o + '개예요. "' + sino(n) + '" 또는 "' + nat(n) + '"' + R.josa(nat(n), '이라고/라고') + ' 읽어요.',
        };
      },
    },
    {
      id: 'order50',
      level: 1,
      title: '1 큰 수, 1 작은 수, 사이의 수',
      make: function (R) {
        var mode = R.int(0, 2);
        var n;
        if (mode === 0) {
          // 1 큰 수 (낱개 9에서 묶음이 바뀌는 수가 자주 나오게)
          n = R.bool(0.4) ? 10 * R.int(1, 4) + 9 : R.int(11, 48);
          var big = n + 1;
          var w0 = [{ a: String(n - 1), why: '1 작은 수를 구했어요. 1 큰 수는 바로 뒤의 수예요.' }];
          if (n % 10 === 9) w0.push({ a: String(n - 9), why: '낱개가 10개가 되면 10개씩 묶음이 하나 늘어나요. ' + n + ' 다음은 ' + big + R.josa(big, '이에요/예요') + '.' });
          return {
            type: 'short', check: 'number', concept: 4,
            q: n + '보다 1 큰 수는 얼마일까요?',
            answer: String(big),
            wrong: w0,
            explain: n + ' 바로 뒤의 수는 ' + big + R.josa(big, '이에요/예요') + '.' + (n % 10 === 9 ? ' 낱개 9개에 하나가 더 생기면 10개가 되어, 10개씩 묶음이 ' + (big / 10) + '개가 돼요.' : ''),
          };
        }
        if (mode === 1) {
          n = R.bool(0.4) ? 10 * R.int(2, 5) : R.int(12, 50);
          var small = n - 1;
          return {
            type: 'short', check: 'number', concept: 4,
            q: n + '보다 1 작은 수는 얼마일까요?',
            answer: String(small),
            wrong: [{ a: String(n + 1), why: '1 큰 수를 구했어요. 1 작은 수는 바로 앞의 수예요.' }],
            explain: n + ' 바로 앞의 수는 ' + small + R.josa(small, '이에요/예요') + '.',
          };
        }
        n = R.int(11, 48);
        var mid = n + 1, hi = n + 2;
        return {
          type: 'short', check: 'number', concept: 4,
          q: n + R.josa(n, '과/와') + ' ' + hi + ' 사이에 있는 수는 무엇일까요?',
          answer: String(mid),
          wrong: [{ a: String(n - 1), why: n + '보다 1 작은 수예요. 두 수의 가운데에 있는 수를 찾아요.' }, { a: String(hi + 1), why: hi + '보다 1 큰 수예요. 두 수의 가운데에 있는 수를 찾아요.' }],
          explain: n + ', ' + mid + ', ' + hi + ' 순서이므로 ' + n + R.josa(n, '과/와') + ' ' + hi + ' 사이에 있는 수는 ' + mid + R.josa(mid, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'compare50',
      level: 2,
      title: '50까지 수의 크기 비교 (가장 큰 수·가장 작은 수)',
      make: function (R) {
        // 같은 묶음 수인 두 수 + 묶음과 낱개를 바꾼 수 + 다른 수 → 서로 다른 4개 (모두 10~50)
        var t = R.int(1, 4), o1 = R.int(0, 9), o2 = R.int(0, 9);
        while (o2 === o1) o2 = R.int(0, 9);
        var nums = [10 * t + o1, 10 * t + o2];
        function add(x) { if (x >= 10 && x <= 50 && nums.indexOf(x) < 0) nums.push(x); }
        add(10 * o1 + t);
        add(10 * o2 + t);
        var guard = 0;
        while (nums.length < 4 && guard++ < 50) add(R.int(10, 50));
        nums = nums.slice(0, 4);
        var wantBig = R.bool();
        var best = nums.reduce(function (a, b) { return wantBig ? Math.max(a, b) : Math.min(a, b); });
        var bt = Math.floor(best / 10);
        var correct = String(best);
        var wrongs = nums.filter(function (x) { return x !== best; }).map(String);
        var pick = R.choices(correct, wrongs, 4);
        var word = wantBig ? '큰' : '작은';
        return {
          type: 'choice', concept: 5,
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
      id: 'gather-split19',
      level: 2,
      title: '19까지의 수 모으기와 가르기',
      make: function (R) {
        var mode = R.int(0, 2);
        if (mode === 0) {
          var a = R.int(3, 9), b = R.int(11 - a, 9), s = a + b;
          if (s > 18) { b = 18 - a; s = 18; }
          return {
            type: 'short', check: 'number', concept: 2,
            q: a + R.josa(a, '과/와') + ' ' + b + R.josa(b, '을/를') + ' 모으면 얼마일까요?',
            fig: frame20(a, b, '10칸 틀 두 개에 ' + a + '개와 ' + b + '개가 다른 색으로 채워진 그림'),
            answer: String(s),
            wrong: a !== b ? [{ a: String(Math.abs(a - b)), why: '두 수의 차를 구했어요. 모으기는 둘을 합쳐서 더 많아지는 거예요.' }] : [],
            explain: a + ' 다음부터 ' + b + '개를 이어 세면 ' + s + R.josa(s, '이에요/예요') + '. 10칸 틀 하나가 꽉 차고 ' + (s - 10) + '개가 더 있어요.',
          };
        }
        if (mode === 1) {
          var n = R.int(11, 19), r = n - 10;
          return {
            type: 'short', check: 'number', concept: 2,
            q: n + R.josa(n, '은/는') + ' 10과 몇으로 가를 수 있을까요?',
            answer: String(r),
            wrong: [{ a: String(n + 10), why: '10과 ' + n + R.josa(n, '을/를') + ' 모았어요. ' + n + '에서 10개씩 묶음 1개를 떼면 낱개가 몇 개 남는지 봐요.' }],
            explain: n + R.josa(n, '은/는') + ' 10개씩 묶음 1개와 낱개 ' + r + '개예요. 그래서 10과 ' + r + R.josa(r, '으로/로') + ' 가를 수 있어요.',
          };
        }
        var m = R.int(11, 17), p = R.int(m - 9, 9), q = m - p;
        if (p < 2) { p = 2; q = m - 2; }
        return {
          type: 'short', check: 'number', concept: 2,
          q: m + R.josa(m, '은/는') + ' ' + p + R.josa(p, '과/와') + ' 몇으로 가를 수 있을까요?',
          fig: frame20(m, 0, '10칸 틀 두 개에 ' + m + '개가 채워진 그림'),
          answer: String(q),
          wrong: [{ a: String(m + p), why: m + R.josa(m, '과/와') + ' ' + p + R.josa(p, '을/를') + ' 모았어요. ' + m + '개 중 ' + p + '개를 빼고 남은 것을 세어요.' }],
          explain: m + '개 중 ' + p + '개를 빼고 남은 것을 세면 ' + q + '개예요. ' + m + R.josa(m, '은/는') + ' ' + p + R.josa(p, '과/와') + ' ' + q + R.josa(q, '으로/로') + ' 가를 수 있어요.',
        };
      },
    },
  ],
});
})();
