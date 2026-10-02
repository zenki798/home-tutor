/* 2학년 수학 · 길이 재기(cm)
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 2학년 범위: cm 만 쓴다(m 는 math-e2-09). 곱셈은 아직 배우지 않았으므로 같은 길이를 여러 번 이을 때는 덧셈으로 한다.
 * "약 몇 cm" 는 답 칸에 '약'을 쓰면 수로 채점할 수 없으므로 choice 로 낸다.
 * 그림: 자·끈·단위 그림은 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  var NAMES = ['민수', '지아', '서준', '하윤', '도윤', '수아', '예준', '서연'];
  var THINGS = ['막대', '연필', '크레파스', '색 테이프', '빨대', '나무젓가락'];

  // 자 그림: 0~n cm 눈금, bar = { from, to } (cm, 소수 가능) 위에 물건(막대)을 그린다
  function ruler(n, bar, alt) {
    var S = n <= 10 ? 34 : 28, x0 = 24, W = x0 * 2 + n * S, body = '';
    function X(v) { return Math.round((x0 + v * S) * 10) / 10; }
    if (bar) {
      body += '<rect x="' + X(bar.from) + '" y="22" width="' + Math.round((bar.to - bar.from) * S * 10) / 10 + '" height="18" rx="3" fill="var(--fig-2)" fill-opacity="0.7" stroke="currentColor" stroke-width="1.5"/>';
      body += '<line x1="' + X(bar.from) + '" y1="40" x2="' + X(bar.from) + '" y2="56" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2"/>';
      body += '<line x1="' + X(bar.to) + '" y1="40" x2="' + X(bar.to) + '" y2="56" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2"/>';
    }
    body += '<rect x="' + (x0 - 14) + '" y="56" width="' + (n * S + 28) + '" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/>';
    for (var i = 0; i <= n; i++) {
      body += '<line x1="' + X(i) + '" y1="56" x2="' + X(i) + '" y2="70" stroke="currentColor" stroke-width="1.5"/>';
      body += '<text x="' + X(i) + '" y="88" font-size="13" text-anchor="middle" fill="currentColor">' + i + '</text>';
    }
    return {
      type: 'svg',
      svg: '<svg viewBox="0 0 ' + W + ' 104">' + body + '</svg>',
      alt: alt || ('0부터 ' + n + ' cm까지 눈금이 있는 자 위에 막대가 놓여 있어요.' + (bar ? ' 막대의 왼쪽 끝은 ' + bar.from + ' 눈금 근처, 오른쪽 끝은 그 오른쪽에 있어요.' : '')),
    };
  }
  // 끈 여러 개: list = [{ label, from, len }] (모눈 한 칸 = 같은 길이), 모눈이 뒤에 깔린다
  function strips(list, cols, alt) {
    var U = 30, x0 = 40, W = x0 + cols * U + 16, H = list.length * 40 + 16, body = '';
    for (var c = 0; c <= cols; c++) {
      body += '<line x1="' + (x0 + c * U) + '" y1="8" x2="' + (x0 + c * U) + '" y2="' + (H - 8) + '" stroke="currentColor" stroke-width="0.6" stroke-opacity="0.35"/>';
    }
    list.forEach(function (s, i) {
      var y = 16 + i * 40;
      body += '<text x="14" y="' + (y + 16) + '" font-size="15" text-anchor="middle" fill="currentColor">' + s.label + '</text>';
      body += '<rect x="' + (x0 + s.from * U) + '" y="' + y + '" width="' + s.len * U + '" height="22" rx="4" fill="var(--fig-' + (i % 4 + 1) + ')" fill-opacity="0.6" stroke="currentColor" stroke-width="1.5"/>';
    });
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + Math.max(W, 200) + ' ' + H + '">' + body + '</svg>', alt: alt || '모눈 위에 놓인 끈 그림' };
  }
  // 단위로 재기: 위에 물건 막대(k칸), 아래에 같은 크기의 단위(클립·지우개) k개
  function tiles(k, alt) {
    var U = 40, x0 = 16, W = Math.max(200, x0 * 2 + k * U), body = '';
    body += '<rect x="' + x0 + '" y="12" width="' + k * U + '" height="20" rx="4" fill="var(--fig-1)" fill-opacity="0.6" stroke="currentColor" stroke-width="1.5"/>';
    for (var i = 0; i < k; i++) {
      var x = x0 + i * U + 2;
      body += '<rect x="' + x + '" y="44" width="' + (U - 4) + '" height="16" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"/>';
      body += '<rect x="' + (x + 6) + '" y="49" width="' + (U - 16) + '" height="6" rx="3" fill="none" stroke="currentColor" stroke-width="1"/>';
    }
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' 72">' + body + '</svg>', alt: alt || '막대 아래에 클립을 겹치지 않게 이어 놓은 그림' };
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
  id: 'math-e2-04',
  course: 'math-e2',
  title: '길이 재기(cm)',
  summary: '여러 가지 단위로 길이를 재 보고, 1 cm를 알아 자로 길이를 재며 길이를 어림해요.',
  goals: [
    '두 물건의 길이를 맞대어 비교할 수 있어요.',
    '뼘, 클립 같은 여러 가지 단위로 길이를 잴 수 있어요.',
    '1 cm를 알고, 자로 길이를 재어 몇 cm, 약 몇 cm로 나타낼 수 있어요.',
    '길이를 어림하고 어림한 길이를 말할 수 있어요.',
  ],
  standards: ['[2수03-10]', '[2수03-12]'],

  concepts: [
    {
      title: '길이 비교하기',
      body: '두 물건의 길이는 **한쪽 끝을 맞추어** 비교해요. 그러면 다른 쪽 끝이 더 많이 나온 것이 더 길어요.\n\n그림에서 가와 나는 왼쪽 끝이 맞춰져 있어요. 오른쪽 끝이 더 나온 나가 더 길어요.\n\n책상과 칠판처럼 **옮길 수 없는 물건**은 끈이나 종이띠에 길이를 옮겨 표시해요. 그 끈끼리 맞대어 비교하면 돼요.\n\n> ⚠️ 끝을 맞추지 않으면 짧은 것이 길어 보일 수 있어요.',
      easy: '친구와 키를 잴 때 두 사람이 같은 바닥에 서지요? 한 사람이 의자 위에 서면 비교가 안 돼요.\n\n길이도 같아요. 출발하는 쪽 끝을 똑같이 맞춰야 바르게 비교할 수 있어요.',
      fig: strips([{ label: '가', from: 0, len: 5 }, { label: '나', from: 0, len: 7 }], 8, '왼쪽 끝을 맞춘 끈 가와 나. 나의 오른쪽 끝이 더 나와 있어요.'),
      check: {
        type: 'choice',
        q: '두 연필의 길이를 맞대어 비교하려고 해요. 어떻게 놓아야 할까요?',
        choices: ['한쪽 끝을 맞추어 놓아요.', '가운데를 맞추어 놓아요.', '아무렇게나 놓아요.'],
        answer: 0,
        why: ['', '가운데를 맞추면 양쪽 끝을 모두 봐야 해서 헷갈려요. 한쪽 끝을 맞춰요.', '끝을 맞추지 않으면 짧은 것이 길어 보일 수 있어요.'],
        explain: '한쪽 끝을 맞추고 다른 쪽 끝을 보면 어느 것이 더 긴지 바로 알 수 있어요.',
      },
    },
    {
      title: '여러 가지 단위로 재기',
      body: '길이를 잴 때 **기준이 되는 물건**을 몇 번 이어 놓을 수 있는지 세어요. 이 기준을 **단위**라고 해요.\n\n- **뼘**: 엄지손가락과 새끼손가락을 쫙 폈을 때 두 끝 사이의 길이\n- 클립, 지우개, 연필, 걸음 등\n\n그림의 막대는 클립으로 5번이에요. 그래서 막대의 길이는 **클립 5개만큼**이에요.\n\n단위가 **짧을수록 여러 번** 재야 해요. 그리고 사람마다 뼘의 길이가 달라서, 같은 책상을 재어도 잰 수가 다를 수 있어요.\n\n> 💡 그래서 누구나 같은 길이를 쓰는 단위가 필요해요. 그것이 다음에 배울 **cm**예요.',
      easy: '똑같은 길을 어른과 아이가 걸어 보세요. 어른은 10걸음, 아이는 15걸음쯤 걸어요.\n\n아이 걸음이 더 짧아서 더 많이 걸어야 하지요. 단위가 짧으면 잰 수가 커져요.',
      fig: tiles(5, '막대 아래에 클립 5개를 겹치지 않게 이어 놓은 그림'),
      check: {
        type: 'choice',
        q: '같은 책상의 길이를 민수는 뼘으로 6번, 지아는 뼘으로 7번 재었어요. 누구의 뼘이 더 길까요?',
        choices: ['민수', '지아', '두 사람이 같아요'],
        answer: 0,
        why: ['', '잰 수가 많을수록 단위가 짧은 거예요. 지아는 7번이나 재었으니 뼘이 더 짧아요.', '잰 수가 다르니 뼘의 길이도 달라요.'],
        explain: '같은 길이를 잴 때 단위가 길면 적게, 짧으면 많이 재요. 민수가 더 적게(6번) 재었으니 민수의 뼘이 더 길어요.',
      },
    },
    {
      title: '1 cm 알아보기',
      body: '누가 재어도 똑같이 알 수 있도록 정한 길이가 있어요. 그림에서 0부터 1까지의 길이를 **1 cm**라고 쓰고 **1 센티미터**라고 읽어요.\n\n- 1 cm가 2번이면 **2 cm**\n- 1 cm가 5번이면 **5 cm**\n\n자에서 큰 눈금 한 칸이 1 cm예요.\n\n> 💡 cm는 작은 c와 작은 m를 이어서 써요.',
      easy: '여러분의 집게손가락 손톱의 폭이 1 cm쯤이에요.\n\n손톱 폭 3개를 나란히 놓은 길이가 3 cm쯤이지요. 1 cm가 몇 번 들어가는지 세면 길이를 알 수 있어요.',
      fig: ruler(5, { from: 0, to: 1 }, '0부터 5 cm까지 눈금이 있는 자. 0부터 1까지 막대가 놓여 있어요.'),
      check: {
        type: 'short', check: 'number', unit: 'cm',
        q: '1 cm가 4번이면 몇 cm일까요?',
        answer: '4',
        wrong: [{ a: '1', why: '1 cm가 4번 있으니 1을 4번 세어요. 1, 2, 3, 4예요.' }],
        explain: '1 cm가 4번이면 4 cm예요.',
      },
    },
    {
      title: '자로 길이 재기',
      body: '자로 길이를 잴 때는 이렇게 해요.\n\n1. 물건의 한쪽 끝을 자의 눈금 **0에** 맞춰요.\n2. 물건을 자와 나란히 놓아요.\n3. 다른 쪽 끝의 눈금을 읽어요. 6이면 **6 cm**예요.\n\n0이 아닌 눈금에 맞춰 놓았을 때는 **1 cm가 몇 번 들어가는지** 세어요.\n\n눈금 3부터 8까지는 1 cm가 5번 → **5 cm**\n\n> ⚠️ 이때 끝 눈금 8을 그대로 읽으면 안 돼요.',
      easy: '달리기 출발선이 0이라고 생각해 보세요. 출발선에서 출발해야 몇 칸 갔는지 바로 알 수 있어요.\n\n출발선이 3이면, 3에서부터 한 칸씩 세어요. 4, 5, 6, 7, 8 하고 세면 5칸이에요.',
      fig: ruler(10, { from: 0, to: 6 }, '자의 0 눈금에 막대의 왼쪽 끝을 맞추었고, 오른쪽 끝은 6 눈금에 있어요.'),
      check: {
        type: 'short', check: 'number', unit: 'cm',
        q: '막대의 길이는 몇 cm일까요?',
        fig: ruler(10, { from: 2, to: 6 }, '막대의 왼쪽 끝이 자의 2 눈금에, 오른쪽 끝이 6 눈금에 있어요.'),
        answer: '4',
        wrong: [
          { a: '6', why: '오른쪽 끝 눈금을 그대로 읽었어요. 막대가 2에서 시작하니 1 cm가 몇 번인지 세어요.' },
          { a: '5', why: '눈금의 개수를 세었어요. 눈금 사이의 칸(1 cm)을 세어요.' },
        ],
        explain: '눈금 2부터 6까지 1 cm가 4번 들어가요. 그래서 4 cm예요.',
      },
    },
    {
      title: '약 몇 cm',
      body: '물건의 끝이 눈금에 딱 맞지 않을 때가 있어요. 그때는 **더 가까운 쪽의 눈금**을 읽고 앞에 **약**을 붙여요.\n\n그림의 막대는 끝이 6과 7 사이에 있지만 6에 더 가까워요. 그래서 **약 6 cm**예요.\n\n"약 6 cm"는 "6 cm쯤"이라는 뜻이에요.\n\n> 💡 끝이 두 눈금의 어느 쪽에 더 가까운지 잘 보세요.',
      easy: '버스 정류장 두 곳 사이에 서 있다고 생각해 보세요. 더 가까운 정류장 이름을 말하면 친구가 금방 찾아오겠지요?\n\n길이도 더 가까운 눈금의 수를 말하고, 딱 맞지 않으니 "약"을 붙여요.',
      fig: ruler(10, { from: 0, to: 6.2 }, '막대의 왼쪽 끝은 0 눈금에, 오른쪽 끝은 6과 7 사이에서 6에 더 가까운 곳에 있어요.'),
      check: {
        type: 'choice',
        q: '막대의 길이는 약 몇 cm일까요?',
        fig: ruler(10, { from: 0, to: 4.8 }, '막대의 왼쪽 끝은 0 눈금에, 오른쪽 끝은 4와 5 사이에서 5에 더 가까운 곳에 있어요.'),
        choices: ['약 5 cm', '약 4 cm', '약 6 cm'],
        answer: 0,
        why: ['', '끝이 4와 5 사이에 있지만 5에 더 가까워요.', '끝은 6까지 가지 않았어요. 4와 5 사이에서 5에 더 가까워요.'],
        explain: '막대의 끝이 4와 5 사이에서 5에 더 가까우니 약 5 cm예요.',
      },
    },
    {
      title: '길이 어림하기',
      body: '자로 재지 않고 길이가 얼마쯤인지 짐작하는 것을 **어림하기**라고 해요. 어림한 길이는 "**약** 몇 cm"라고 말해요.\n\n어림할 때는 내가 아는 길이를 떠올려요.\n\n- 집게손가락 손톱의 폭: 약 1 cm\n- 한 뼘: 약 15 cm (사람마다 달라요)\n\n어림한 뒤 자로 재어 보면 어림을 얼마나 잘했는지 알 수 있어요. 어림한 길이와 잰 길이의 **차가 작을수록** 잘 어림한 거예요.',
      easy: '지우개를 보고 "손톱 폭이 4개쯤 들어가겠다" 하고 생각하면 약 4 cm라고 어림한 거예요.\n\n자로 재어 보니 4 cm였다면 아주 잘 어림했어요!',
      check: {
        type: 'choice',
        q: '새 연필의 길이로 알맞은 것은 무엇일까요?',
        choices: ['약 17 cm', '약 1 cm', '약 170 cm'],
        answer: 0,
        why: ['', '1 cm는 손톱 폭쯤이에요. 연필은 훨씬 길어요.', '170 cm는 어른 키쯤이에요. 연필은 그보다 훨씬 짧아요.'],
        explain: '새 연필은 한 뼘쯤 되는 길이라서 약 17 cm가 알맞아요.',
      },
    },
  ],

  examples: [
    {
      q: '막대의 길이는 몇 cm일까요?',
      fig: ruler(10, { from: 2, to: 9 }, '막대의 왼쪽 끝이 자의 2 눈금에, 오른쪽 끝이 9 눈금에 있어요.'),
      steps: [
        '막대의 왼쪽 끝이 0이 아니라 2에 맞춰져 있어요.',
        '그래서 끝 눈금 9를 그대로 읽으면 안 돼요.',
        '2부터 한 칸씩 세어요. 3, 4, 5, 6, 7, 8, 9 → 1 cm가 7번이에요.',
        '그래서 막대의 길이는 7 cm예요.',
      ],
      answer: '7 cm',
    },
    {
      q: '실제 길이가 12 cm인 필통의 길이를 민수는 약 10 cm, 지아는 약 13 cm로 어림했어요. 누가 더 가깝게 어림했을까요?',
      steps: [
        '민수의 어림과 실제 길이의 차: 12와 10은 2 cm 차이예요.',
        '지아의 어림과 실제 길이의 차: 13과 12는 1 cm 차이예요.',
        '차가 더 작은 쪽이 더 가깝게 어림한 거예요.',
      ],
      answer: '지아',
    },
  ],

  terms: [
    { term: '단위', def: '길이를 잴 때 기준이 되는 길이예요. 뼘, 클립, 1 cm 등이 단위가 될 수 있어요.' },
    { term: '뼘', def: '엄지손가락과 새끼손가락을 쫙 폈을 때 두 손가락 끝 사이의 길이예요. 사람마다 달라요.' },
    { term: '1 cm', def: '자에서 큰 눈금 한 칸의 길이예요. "1 센티미터"라고 읽어요. 누가 재어도 같은 길이예요.' },
    { term: '센티미터', def: '길이의 단위예요. cm라고 써요. 예: 5 cm는 1 cm가 5번인 길이예요.' },
    { term: '눈금', def: '자에 길이를 나타내려고 그어 놓은 금이에요. 눈금 옆에 0, 1, 2 …가 쓰여 있어요.' },
    { term: '약', def: '"그쯤"이라는 뜻이에요. 끝이 눈금에 딱 맞지 않거나 어림했을 때 "약 6 cm"처럼 붙여요.' },
    { term: '어림하기', def: '자로 재지 않고 길이가 얼마쯤인지 짐작하는 거예요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '왼쪽 끝을 맞춘 끈 세 개가 있어요. 가장 긴 끈은 무엇일까요?',
      fig: strips([{ label: '가', from: 0, len: 6 }, { label: '나', from: 0, len: 8 }, { label: '다', from: 0, len: 5 }], 9, '왼쪽 끝을 맞춘 끈 가, 나, 다'),
      choices: ['나', '가', '다'],
      answer: 0,
      why: ['', '가보다 오른쪽 끝이 더 나온 끈이 있어요. 끝을 다시 비교해 보세요.', '다는 가장 짧은 끈이에요. 오른쪽 끝이 가장 덜 나왔어요.'],
      explain: '왼쪽 끝이 맞춰져 있으니 오른쪽 끝이 가장 많이 나온 나가 가장 길어요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '모눈 위에 끈 가와 나가 놓여 있어요. 더 긴 끈은 무엇일까요?',
      fig: strips([{ label: '가', from: 0, len: 6 }, { label: '나', from: 3, len: 5 }], 9, '모눈 위의 끈 가와 나. 가는 맨 왼쪽부터, 나는 오른쪽으로 3칸 옮긴 곳부터 놓여 있어요.'),
      choices: ['가', '나', '두 끈의 길이가 같아요'],
      answer: 0,
      why: ['', '오른쪽 끝만 보고 골랐어요. 왼쪽 끝이 맞춰져 있지 않으니 모눈 칸 수를 세어 보세요.', '모눈 칸 수를 다시 세어 보세요. 가는 6칸, 나는 5칸이에요.'],
      hint: '끝이 맞춰져 있지 않아요. 끈마다 모눈 몇 칸인지 세어 보세요.',
      explain: '가는 모눈 6칸, 나는 모눈 5칸이에요. 나의 오른쪽 끝이 더 멀리 있지만, 시작한 곳이 달라서 그래요. 더 긴 끈은 가예요.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '막대의 길이를 클립으로 재었어요. 막대의 길이는 클립 몇 개만큼일까요?',
      fig: tiles(6, '막대 아래에 클립을 겹치지 않게 이어 놓은 그림'),
      answer: '6',
      wrong: [{ a: '5', why: '클립 하나를 빠뜨렸어요. 왼쪽부터 하나씩 손으로 짚으며 세어 보세요.' }],
      explain: '막대 아래에 클립이 6개 이어져 있어요. 그래서 막대의 길이는 클립 6개만큼이에요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 1,
      q: '같은 책상의 길이를 서준이는 뼘으로 7번, 하윤이는 뼘으로 9번 재었어요. 누구의 뼘이 더 짧을까요?',
      choices: ['하윤', '서준', '두 사람이 같아요'],
      answer: 0,
      why: ['', '서준이는 더 적게(7번) 재었어요. 적게 잴수록 뼘이 길어요.', '잰 수가 다르니 뼘의 길이도 달라요.'],
      explain: '같은 길이를 잴 때 단위가 짧을수록 여러 번 재요. 하윤이가 더 많이(9번) 재었으니 하윤이의 뼘이 더 짧아요.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 3,
      q: '막대의 길이는 몇 cm일까요?',
      fig: ruler(10, { from: 0, to: 7 }, '막대의 왼쪽 끝이 자의 0 눈금에, 오른쪽 끝이 7 눈금에 있어요.'),
      answer: '7',
      wrong: [{ a: '8', why: '눈금의 개수를 세었어요. 0에 맞췄으니 끝 눈금을 읽으면 돼요.' }],
      explain: '막대의 한쪽 끝이 0에 맞춰져 있으니 다른 쪽 끝의 눈금 7을 읽어요. 7 cm예요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 3,
      q: '막대의 길이는 몇 cm일까요?',
      fig: ruler(10, { from: 3, to: 8 }, '막대의 왼쪽 끝이 자의 3 눈금에, 오른쪽 끝이 8 눈금에 있어요.'),
      answer: '5',
      wrong: [
        { a: '8', why: '오른쪽 끝 눈금을 그대로 읽었어요. 막대가 3에서 시작하니 1 cm가 몇 번인지 세어요.' },
        { a: '6', why: '눈금의 개수를 세었어요. 눈금 사이의 칸(1 cm)을 세어요.' },
      ],
      hint: '막대가 0에서 시작하지 않았어요. 3부터 한 칸씩 세어 보세요.',
      explain: '눈금 3부터 8까지 1 cm가 5번 들어가요. 4, 5, 6, 7, 8 하고 세면 5번이에요. 그래서 5 cm예요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '막대의 길이는 약 몇 cm일까요?',
      fig: ruler(10, { from: 0, to: 5.2 }, '막대의 왼쪽 끝은 0 눈금에, 오른쪽 끝은 5와 6 사이에서 5에 더 가까운 곳에 있어요.'),
      choices: ['약 5 cm', '약 6 cm', '약 4 cm'],
      answer: 0,
      why: ['', '끝이 5와 6 사이에 있지만 5에 더 가까워요.', '끝은 5를 조금 지났어요. 4보다 5에 훨씬 가까워요.'],
      explain: '막대의 끝이 5와 6 사이에서 5에 더 가까우니 약 5 cm예요.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 5,
      q: '지우개의 길이로 알맞은 것은 무엇일까요?',
      choices: ['약 4 cm', '약 40 cm', '약 400 cm'],
      answer: 0,
      why: ['', '40 cm는 책상의 짧은 쪽 길이쯤이에요. 지우개는 훨씬 짧아요.', '400 cm는 교실 벽 높이보다도 길어요. 지우개는 손가락 몇 개 폭쯤이에요.'],
      explain: '지우개는 손톱 폭(약 1 cm)이 4개쯤 들어가는 길이라서 약 4 cm가 알맞아요.',
    },
    {
      id: 'p9', level: 1, type: 'choice', concept: 2,
      q: '3 cm를 바르게 읽은 것은 무엇일까요?',
      choices: ['3 센티미터', '3 미터', '3 킬로미터'],
      answer: 0,
      why: ['', '미터는 m라고 써요. cm는 센티미터라고 읽어요.', '킬로미터는 아주 먼 거리를 나타내요. cm는 센티미터라고 읽어요.'],
      explain: 'cm는 "센티미터"라고 읽어요. 3 cm는 3 센티미터예요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '막대의 길이는 약 몇 cm일까요?',
      fig: ruler(10, { from: 2, to: 8.3 }, '막대의 왼쪽 끝은 2 눈금에, 오른쪽 끝은 8과 9 사이에서 8에 더 가까운 곳에 있어요.'),
      choices: ['약 6 cm', '약 8 cm', '약 7 cm', '약 9 cm'],
      answer: 0,
      why: [
        '',
        '오른쪽 끝 눈금을 그대로 읽었어요. 막대가 2에서 시작해요.',
        '1 cm가 몇 번인지 다시 세어 보세요. 2부터 8까지는 6번이에요.',
        '끝 눈금을 그대로 읽고, 더 먼 눈금 9를 골랐어요.',
      ],
      hint: '2부터 한 칸씩 세고, 끝이 어느 눈금에 더 가까운지 보세요.',
      explain: '끝은 8과 9 사이에서 8에 더 가까워요. 2부터 8까지는 1 cm가 6번이니 막대는 약 6 cm예요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 2,
      q: '길이가 6 cm인 색 테이프와 9 cm인 색 테이프를 겹치지 않게 이어 붙였어요. 이어 붙인 색 테이프의 길이는 몇 cm일까요?',
      answer: '15',
      hint: '1 cm가 6번, 또 9번 있어요.',
      wrong: [{ a: '3', why: '두 길이의 차를 구했어요. 이어 붙이면 길이를 더해요.' }],
      explain: '1 cm가 6번, 9번 있으니 모두 $6+9=15$번이에요. 그래서 15 cm예요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 5,
      q: '실제 길이가 15 cm인 공책의 짧은 쪽 길이를 세 친구가 어림했어요. 가장 가깝게 어림한 사람은 누구일까요?\n\n- 민수: 약 12 cm\n- 지아: 약 17 cm\n- 서준: 약 14 cm',
      choices: ['서준', '민수', '지아'],
      answer: 0,
      why: ['', '민수의 어림은 실제 길이와 3 cm 차이예요. 차가 더 작은 사람이 있어요.', '지아의 어림은 실제 길이와 2 cm 차이예요. 차가 더 작은 사람이 있어요.'],
      hint: '어림한 길이와 15 cm의 차를 사람마다 구해 보세요.',
      explain: '실제 길이와의 차는 민수 3 cm, 지아 2 cm, 서준 1 cm예요. 차가 가장 작은 서준이가 가장 가깝게 어림했어요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '같은 끈을 클립으로 재었더니 6번, 지우개로 재었더니 3번이었어요. 지우개 한 개의 길이는 클립 몇 개의 길이와 같을까요?',
      answer: '2',
      hint: '끈 아래에 지우개 3개를 그리고, 그 아래에 클립 6개를 그려 보세요.',
      wrong: [
        { a: '3', why: '지우개로 잰 횟수를 썼어요. 지우개 하나 아래에 클립이 몇 개 놓이는지 생각해요.' },
        { a: '9', why: '두 수를 더했어요. 클립 6개를 지우개 3개에 똑같이 나누어 놓아 보세요.' },
      ],
      explain: '클립 6개를 지우개 3개 아래에 똑같이 나누어 놓으면 지우개 하나 아래에 클립이 2개씩 놓여요. 그래서 지우개 한 개는 클립 2개의 길이와 같아요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 3,
      q: '어떤 끈의 한쪽 끝을 자의 눈금 4에 맞추었더니 다른 쪽 끝이 눈금 11에 닿았어요. 이 끈 2개를 겹치지 않게 이으면 몇 cm일까요?',
      answer: '14',
      hint: '먼저 끈 한 개의 길이를 구해요. 4부터 11까지 1 cm가 몇 번일까요?',
      wrong: [
        { a: '22', why: '끝 눈금 11을 끈 한 개의 길이로 읽었어요. 4부터 11까지는 7 cm예요.' },
        { a: '7', why: '끈 한 개의 길이예요. 끈 2개를 이은 길이를 구해요.' },
      ],
      explain: '눈금 4부터 11까지 1 cm가 7번이니 끈 한 개는 7 cm예요. 2개를 이으면 $7+7=14$(cm)예요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 2,
      q: '1 cm 막대 한 개와 3 cm 막대 한 개가 있어요. 막대를 이어 놓거나 나란히 놓아 비교해서 잴 수 **없는** 길이는 무엇일까요?',
      choices: ['5 cm', '2 cm', '4 cm', '1 cm'],
      answer: 0,
      why: [
        '',
        '3 cm 막대 옆에 1 cm 막대를 나란히 놓으면 남는 부분이 2 cm예요.',
        '두 막대를 이어 놓으면 $1+3=4$(cm)예요.',
        '1 cm 막대 하나로 잴 수 있어요.',
      ],
      hint: '하나만 쓰기, 이어 놓기, 나란히 놓고 남는 부분 보기를 모두 생각해 보세요.',
      explain: '1 cm(1 cm 막대), 3 cm(3 cm 막대), 4 cm(이어 놓기), 2 cm(3 cm 막대에서 1 cm 막대를 뺀 남는 부분)를 잴 수 있어요. 5 cm는 잴 수 없어요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 5,
      q: '지아의 한 뼘은 약 15 cm예요. 지아가 책상의 길이를 뼘으로 재었더니 4뼘이었어요. 책상의 길이는 약 몇 cm일까요?',
      choices: ['약 60 cm', '약 19 cm', '약 45 cm', '약 4 cm'],
      answer: 0,
      why: [
        '',
        '15와 4를 더했어요. 15 cm가 4번이에요.',
        '15를 3번만 더했어요. 4뼘이니 4번 더해요.',
        '뼘의 수를 그대로 썼어요. 한 뼘이 약 15 cm예요.',
      ],
      hint: '한 뼘이 약 15 cm이니 15를 4번 더해요.',
      explain: '15 cm가 4번이니 $15+15+15+15=60$이에요. 책상의 길이는 약 60 cm예요.',
    },
  ],

  deeper: [
    {
      title: '왜 누구나 같은 단위를 쓸까?',
      body: '옛날에는 사람들이 손이나 발, 팔 길이로 길이를 쟀어요. 그런데 사람마다 손과 발의 크기가 달라서 같은 물건도 다르게 재어졌지요. 물건을 사고팔 때 다툼이 생기기도 했어요.\n\n그래서 세계 여러 나라가 함께 쓰는 단위를 정했어요. 1 cm는 어느 나라에서 재어도 같은 길이예요.\n\n2학기에는 더 긴 길이를 나타내는 **1 m**를 배워요. 1 m는 1 cm가 100번인 길이예요.',
    },
  ],

  faq: [
    {
      q: '자가 부러져서 0 눈금이 없어요. 그래도 잴 수 있어요?',
      a: '네, 잴 수 있어요. 물건의 한쪽 끝을 아무 눈금(예: 3)에 맞추고, 다른 쪽 끝까지 1 cm가 몇 번 들어가는지 세면 돼요.',
    },
    {
      q: '왜 "약"을 붙여요?',
      a: '물건의 끝이 눈금에 딱 맞지 않거나 어림했을 때, 정확한 길이가 아니라 "그쯤"이라는 뜻으로 "약"을 붙여요.',
    },
    {
      q: '뼘으로 재면 왜 친구랑 다르게 나와요?',
      a: '사람마다 손 크기가 달라서 뼘의 길이도 달라요. 그래서 누구나 같은 길이를 쓰는 cm 같은 단위를 써요.',
    },
  ],

  mistakes: [
    '물건을 0이 아닌 눈금에 맞춰 놓고 끝 눈금을 그대로 읽는 실수 — 1 cm가 몇 번 들어가는지 세어요.',
    '눈금 사이의 칸이 아니라 눈금(금)의 개수를 세는 실수 — 칸 하나가 1 cm예요.',
    '끝을 맞추지 않고 길이를 비교하는 실수 — 한쪽 끝을 맞추어 비교해요.',
  ],

  gens: [
    {
      id: 'ruler-zero',
      level: 1,
      title: '0에 맞춘 자로 길이 재기',
      make: function (R) {
        var n = R.pick([10, 12]);
        var k = R.int(2, n);
        var thing = R.pick(THINGS);
        return {
          type: 'short', check: 'number', unit: 'cm', concept: 3,
          q: '자로 ' + thing + '의 길이를 재었어요. ' + thing + '의 길이는 몇 cm일까요?',
          fig: ruler(n, { from: 0, to: k }, thing + '의 왼쪽 끝이 자의 0 눈금에, 오른쪽 끝이 ' + k + ' 눈금에 있어요.'),
          answer: String(k),
          wrong: wrongs(k, [[k + 1, '눈금의 개수를 세었어요. 0에 맞췄으니 끝 눈금을 읽으면 돼요.']]),
          explain: thing + '의 한쪽 끝이 0에 맞춰져 있으니 다른 쪽 끝의 눈금 ' + k + R.josa(k, '을/를') + ' 읽어요. ' + k + ' cm예요.',
        };
      },
    },
    {
      id: 'ruler-offset',
      level: 2,
      title: '0이 아닌 눈금에서 시작한 길이 재기',
      make: function (R) {
        var n = R.pick([10, 12]);
        var s = R.int(1, 5);
        var k = R.int(2, n - s);
        var e = s + k;
        var count = [];
        for (var i = s + 1; i <= e; i++) count.push(i);
        var thing = R.pick(THINGS);
        return {
          type: 'short', check: 'number', unit: 'cm', concept: 3,
          q: thing + '의 한쪽 끝을 자의 눈금 ' + s + '에 맞추었어요. ' + thing + '의 길이는 몇 cm일까요?',
          fig: ruler(n, { from: s, to: e }, thing + '의 왼쪽 끝이 자의 ' + s + ' 눈금에, 오른쪽 끝이 ' + e + ' 눈금에 있어요.'),
          answer: String(k),
          hint: thing + R.josa(thing, '이/가') + ' 0에서 시작하지 않았어요. ' + s + '부터 한 칸씩 세어 보세요.',
          wrong: wrongs(k, [
            [e, '오른쪽 끝 눈금을 그대로 읽었어요. ' + thing + R.josa(thing, '이/가') + ' ' + s + '에서 시작하니 1 cm가 몇 번인지 세어요.'],
            [k + 1, '눈금의 개수를 세었어요. 눈금 사이의 칸(1 cm)을 세어요.'],
          ]),
          explain: '눈금 ' + s + '부터 ' + e + '까지 1 cm가 몇 번인지 세어요. ' + count.join(', ') + ' 하고 세면 ' + k + '번이에요. 그래서 ' + k + ' cm예요.',
        };
      },
    },
    {
      id: 'ruler-about',
      level: 2,
      title: '약 몇 cm로 나타내기',
      make: function (R) {
        var n = 10;
        var s = R.bool(0.6) ? 0 : R.int(1, 3);
        var k = R.int(2, n - s - 1);
        var dlt = R.pick([-0.3, -0.2, 0.2, 0.3]);
        var endTick = s + k;
        var to = endTick + dlt;
        var lo = dlt < 0 ? endTick - 1 : endTick, hi = lo + 1;
        var far = dlt < 0 ? k - 1 : k + 1; // 먼 쪽 눈금으로 읽은 길이
        function A(v) { return '약 ' + v + ' cm'; }
        var correct = A(k);
        // 같은 값이 두 실수에서 나오면 먼저 넣은 진단을 쓴다 → 0이 아닌 곳에서 시작하면 "끝 눈금 그대로 읽기"를 먼저
        var cands = [];
        if (s > 0) {
          cands.push([A(endTick), '오른쪽 끝 눈금을 그대로 읽었어요. 막대가 ' + s + '에서 시작해요.']);
          cands.push([A(dlt < 0 ? endTick - 1 : endTick + 1), '끝 눈금을 그대로 읽고, 먼 쪽 눈금을 골랐어요.']);
        }
        cands.push([A(far), '끝이 ' + lo + R.josa(lo, '과/와') + ' ' + hi + ' 사이에 있지만 ' + endTick + '에 더 가까워요.']);
        cands.push([A(dlt < 0 ? k + 1 : k - 1), '1 cm가 몇 번인지 다시 세어 보세요.']);
        cands.push([A(k + 2), '1 cm가 몇 번인지 다시 세어 보세요.']);
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: 4,
          q: '막대의 길이는 약 몇 cm일까요?',
          fig: ruler(n, { from: s, to: to }, '막대의 왼쪽 끝은 ' + s + ' 눈금에, 오른쪽 끝은 ' + lo + R.josa(lo, '과/와') + ' ' + hi + ' 사이에서 ' + endTick + '에 더 가까운 곳에 있어요.'),
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '막대의 끝은 ' + lo + R.josa(lo, '과/와') + ' ' + hi + ' 사이에서 ' + endTick + '에 더 가까워요. ' +
            (s === 0 ? '0에서 시작했으니 약 ' + k + ' cm예요.' : s + '부터 ' + endTick + '까지 1 cm가 ' + k + '번이니 약 ' + k + ' cm예요.'),
        };
      },
    },
    {
      id: 'estimate-closer',
      level: 2,
      title: '더 가깝게 어림한 사람 찾기',
      make: function (R) {
        var things = [['연필', 14, 18], ['필통', 18, 22], ['공책의 긴 쪽', 24, 28], ['숟가락', 15, 19], ['크레파스 상자', 20, 26]];
        var t = R.pick(things);
        var real = R.int(t[1], t[2]);
        var who = R.sample(NAMES, 3);
        var diffs = R.sample([1, 2, 3, 4, 5], 3);
        var est = diffs.map(function (d) { return R.bool() ? real + d : real - d; });
        var best = 0;
        for (var i = 1; i < 3; i++) if (diffs[i] < diffs[best]) best = i;
        var reason = {};
        who.forEach(function (w, i) {
          reason[w] = w + '의 어림은 실제 길이와 ' + diffs[i] + ' cm 차이예요. 차가 더 작은 사람이 있어요.';
        });
        var pick = R.choices(who[best], who.filter(function (w, i) { return i !== best; }), 3);
        var lines = who.map(function (w, i) { return '- ' + w + ': 약 ' + est[i] + ' cm'; }).join('\n');
        return {
          type: 'choice', concept: 5,
          q: '실제 길이가 ' + real + ' cm인 ' + t[0] + R.josa(t[0], '을/를') + ' 세 친구가 어림했어요. 가장 가깝게 어림한 사람은 누구일까요?\n\n' + lines,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === who[best] ? '' : reason[c]; }),
          hint: '어림한 길이와 ' + real + ' cm의 차를 사람마다 구해 보세요.',
          explain: '실제 길이와의 차는 ' + who.map(function (w, i) { return w + ' ' + diffs[i] + ' cm'; }).join(', ') + '예요. 차가 가장 작은 ' + who[best] + R.josa(who[best], '이/가') + ' 가장 가깝게 어림했어요.',
        };
      },
    },
  ],
});
})();
