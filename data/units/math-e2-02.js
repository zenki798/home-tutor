/* 2학년 수학 · 여러 가지 도형
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 칠교판·쌓기나무·여러 모양은 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  // 칠교판 (큰 사각형을 7조각으로, 조각마다 번호)
  // 1·2 큰 삼각형, 3 중간 삼각형, 4 사각형, 5·6 작은 삼각형, 7 사각형(기울어진 모양)
  var TAN = [
    [[0, 0], [200, 0], [100, 100]],
    [[0, 0], [100, 100], [0, 200]],
    [[200, 100], [200, 200], [100, 200]],
    [[100, 100], [150, 50], [200, 100], [150, 150]],
    [[150, 50], [200, 0], [200, 100]],
    [[100, 100], [150, 150], [50, 150]],
    [[0, 200], [50, 150], [150, 150], [100, 200]],
  ];
  function tangram(alt) {
    var body = '';
    TAN.forEach(function (pts, i) {
      var cx = 0, cy = 0;
      pts.forEach(function (p) { cx += p[0]; cy += p[1]; });
      cx = cx / pts.length + 20; cy = cy / pts.length + 20;
      body += '<polygon points="' + pts.map(function (p) { return (p[0] + 20) + ',' + (p[1] + 20); }).join(' ') +
        '" fill="var(--fig-' + (i % 4 + 1) + ')" fill-opacity="0.45" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' +
        '<text x="' + cx.toFixed(0) + '" y="' + (cy + 6).toFixed(0) + '" font-size="16" text-anchor="middle" fill="currentColor">' + (i + 1) + '</text>';
    });
    return { type: 'svg', svg: '<svg viewBox="0 0 240 240">' + body + '</svg>', alt: alt || '칠교판: 1~7번 조각으로 나뉜 큰 사각형' };
  }

  // 쌓기나무: cubes = [{ x, z, y?, label?, hi? }] — x 왼쪽→오른쪽, z 아래→위(층), y 앞→뒤
  function cubes(list, alt) {
    var s = 40, dx = 16, dy = 16, mx = 0, my = 0, mz = 0;
    list.forEach(function (c) { mx = Math.max(mx, c.x); my = Math.max(my, c.y || 0); mz = Math.max(mz, c.z); });
    var cw = (mx + 1) * s + (my + 1) * dx, W = Math.max(200, cw + 20), H = 20 + (mz + 1) * s + (my + 1) * dy;
    var ox = (W - cw) / 2;
    var order = list.slice().sort(function (a, b) { return ((b.y || 0) - (a.y || 0)) || (a.z - b.z) || (a.x - b.x); });
    var body = '';
    order.forEach(function (c) {
      var y = c.y || 0, X = ox + c.x * s + y * dx, Y = H - 10 - (c.z + 1) * s - y * dy;
      var col = c.hi ? 'var(--fig-2)' : 'var(--fig-1)';
      var st = '" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>';
      body += '<rect x="' + X + '" y="' + Y + '" width="' + s + '" height="' + s + '" fill="' + col + '" fill-opacity="0.3' + st;
      body += '<polygon points="' + X + ',' + Y + ' ' + (X + dx) + ',' + (Y - dy) + ' ' + (X + s + dx) + ',' + (Y - dy) + ' ' + (X + s) + ',' + Y + '" fill="' + col + '" fill-opacity="0.6' + st;
      body += '<polygon points="' + (X + s) + ',' + Y + ' ' + (X + s + dx) + ',' + (Y - dy) + ' ' + (X + s + dx) + ',' + (Y + s - dy) + ' ' + (X + s) + ',' + (Y + s) + '" fill="' + col + '" fill-opacity="0.45' + st;
      if (c.label) body += '<text x="' + (X + s / 2) + '" y="' + (Y + s / 2 + 6) + '" font-size="17" text-anchor="middle" fill="currentColor">' + c.label + '</text>';
    });
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' ' + H + '">' + body + '</svg>', alt: alt || '쌓기나무 ' + list.length + '개로 쌓은 모양' };
  }

  // 가: 삼각형, 나: 선이 끊어진 모양, 다: 굽은 선이 있는 모양, 라: 삼각형
  var FOUR = {
    type: 'svg',
    alt: '도형 4개: 가는 곧은 선 3개로 둘러싸인 모양, 나는 곧은 선 3개가 끊어진 모양, 다는 한 변이 굽은 모양, 라는 기울어진 곧은 선 3개로 둘러싸인 모양',
    svg: '<svg viewBox="0 0 400 130">' +
      '<polygon points="15,100 85,100 40,25" fill="var(--fig-1)" fill-opacity="0.3" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="M115 100 L185 100 L150 25 L126 72" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="M215 100 L285 100 Q 300 45 250 25 Z" fill="var(--fig-1)" fill-opacity="0.3" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<polygon points="320,30 390,45 340,100" fill="var(--fig-1)" fill-opacity="0.3" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<text x="50" y="124" font-size="16" text-anchor="middle" fill="currentColor">가</text>' +
      '<text x="150" y="124" font-size="16" text-anchor="middle" fill="currentColor">나</text>' +
      '<text x="250" y="124" font-size="16" text-anchor="middle" fill="currentColor">다</text>' +
      '<text x="355" y="124" font-size="16" text-anchor="middle" fill="currentColor">라</text>' +
      '</svg>',
  };

  // 쌓기나무 이름표 ('나'는 "나(자신)"와 헷갈려서 쓰지 않는다)
  var LAB = ['가', '다', '라', '마', '바', '사'];
  var NAMES = ['민수', '지아', '서준', '하윤', '도윤', '수아', '예준', '서연', '지호'];

  // 볼록한 삼각형·사각형 꼭짓점 (자동 맞춤 좌표)
  function convex(R, n) {
    var g = [];
    if (n === 3) {
      var g1 = R.int(90, 150), g2 = R.int(90, 360 - g1 - 90);
      g = [g1, g2, 360 - g1 - g2];
    } else {
      for (var t = 0; t < 60; t++) {
        g = [R.int(60, 120), R.int(60, 120), R.int(60, 120)];
        var last = 360 - g[0] - g[1] - g[2];
        if (last >= 60 && last <= 120) { g.push(last); break; }
        g = [];
      }
      if (!g.length) g = [90, 90, 90, 90];
    }
    var a = R.int(0, 359), pts = [];
    for (var i = 0; i < n; i++) {
      var r = R.int(75, 100) / 10, rad = a * Math.PI / 180;
      pts.push([Math.round(r * Math.cos(rad) * 10) / 10, Math.round(r * Math.sin(rad) * 10) / 10]);
      a += g[i];
    }
    return pts;
  }

Tutor.registerUnit({
  id: 'math-e2-02',
  course: 'math-e2',
  title: '여러 가지 도형',
  summary: '삼각형, 사각형, 원을 알아보고, 칠교판으로 모양을 만들며 쌓기나무로 모양을 쌓아 설명해요.',
  goals: [
    '삼각형과 사각형을 알고, 변과 꼭짓점을 셀 수 있어요.',
    '원을 알고, 삼각형·사각형과 다른 점을 말할 수 있어요.',
    '칠교 조각으로 여러 가지 모양을 만들 수 있어요.',
    '쌓기나무로 쌓은 모양을 세고, 위치와 방향을 말할 수 있어요.',
  ],
  standards: ['[2수03-02]', '[2수03-03]', '[2수03-04]', '[2수03-05]'],

  concepts: [
    {
      title: '삼각형 알아보기',
      body: '**곧은 선 3개**로 둘러싸인 모양을 **삼각형**이라고 해요.\n\n- 도형의 곧은 선을 **변**이라고 해요.\n- 두 곧은 선이 만나는 점을 **꼭짓점**이라고 해요.\n\n삼각형은 변이 3개, 꼭짓점이 3개예요.\n\n> ⚠️ 선이 끊어져 있거나 굽은 선이 있으면 삼각형이 아니에요.',
      easy: '빨대 3개로 모양을 만든다고 생각해요. 빨대 끝끼리 빈틈없이 이으면 삼각형이 돼요.\n\n빨대 하나하나가 변이고, 빨대끼리 만나는 뾰족한 곳이 꼭짓점이에요.',
      fig: { type: 'polygon', points: [[0, 0], [6, 0], [2, 4]], labels: [null, null, '꼭짓점'], sides: ['변', null, null], alt: '삼각형: 곧은 선 하나에 "변", 뾰족한 점 하나에 "꼭짓점" 이름표' },
      check: {
        type: 'ox',
        q: '삼각형은 변이 3개, 꼭짓점이 3개예요.',
        answer: true,
        explain: '삼각형은 곧은 선 3개로 둘러싸여 있어요. 그래서 변이 3개, 곧은 선이 만나는 꼭짓점도 3개예요.',
      },
    },
    {
      title: '사각형 알아보기',
      body: '**곧은 선 4개**로 둘러싸인 모양을 **사각형**이라고 해요.\n\n사각형은 변이 4개, 꼭짓점이 4개예요.\n\n| 도형 | 변의 수 | 꼭짓점의 수 |\n|---|---|---|\n| 삼각형 | 3개 | 3개 |\n| 사각형 | 4개 | 4개 |\n\n> 💡 생김새가 달라도 곧은 선 4개로 둘러싸여 있으면 모두 사각형이에요.',
      easy: '공책이나 액자의 테두리를 손가락으로 따라가 보세요. 곧은 선을 4번 지나면 처음 자리로 돌아와요.\n\n그래서 이런 모양은 사각형이에요. 구석마다 뾰족한 꼭짓점이 하나씩, 모두 4개 있어요.',
      fig: { type: 'polygon', points: [[0, 0], [5, 0], [6, 3], [1, 4]], alt: '곧은 선 4개로 둘러싸인 사각형' },
      check: {
        type: 'choice',
        q: '사각형의 꼭짓점은 몇 개일까요?',
        choices: ['4개', '3개', '5개'],
        answer: 0,
        why: ['', '3개는 삼각형의 꼭짓점 수예요.', '사각형은 곧은 선 4개로 둘러싸여 있어서 꼭짓점도 4개예요.'],
        explain: '사각형은 곧은 선 4개로 둘러싸여 있어요. 곧은 선이 만나는 꼭짓점도 4개예요.',
      },
    },
    {
      title: '원 알아보기',
      body: '**뾰족한 곳**도 **곧은 선**도 없이, 어느 쪽에서 보아도 똑같이 동그란 모양을 **원**이라고 해요.\n\n원은 굽은 선으로 이어져 있어서 **변도 꼭짓점도 없어요**.\n\n원은 크기가 달라도 생긴 모양이 모두 같아요. 동전이나 접시의 테두리에서 원을 찾을 수 있어요.\n\n> ⚠️ 달걀처럼 길쭉한 동그라미는 원이 아니에요.',
      easy: '컵을 종이에 엎어 놓고 테두리를 따라 그려 보세요. 동그란 모양이 나오지요? 그게 원이에요.\n\n손가락으로 따라가 보면 걸리는 뾰족한 곳이 하나도 없어요.',
      fig: { type: 'circle', alt: '원' },
      check: {
        type: 'ox',
        q: '원에는 꼭짓점이 1개 있어요.',
        answer: false,
        explain: '원에는 뾰족한 곳도 곧은 선도 없어요. 그래서 꼭짓점도 변도 없어요.',
      },
    },
    {
      title: '칠교판으로 모양 만들기',
      body: '**칠교판**은 큰 사각형 하나를 **7조각**으로 나눈 놀이판이에요.\n\n| 조각 | 개수 | 그림의 번호 |\n|---|---|---|\n| 삼각형 | 5개 | 1, 2, 3, 5, 6 |\n| 사각형 | 2개 | 4, 7 |\n\n칠교 조각을 이리저리 붙이면 여러 가지 모양을 만들 수 있어요. 작은 삼각형 2조각(5, 6)을 붙이면 사각형도, 더 큰 삼각형도 만들 수 있어요.\n\n> 💡 조각끼리 겹치지 않게, 변과 변을 꼭 맞대어 붙여요.',
      easy: '칠교판은 퍼즐과 같아요. 조각 7개를 다시 맞추면 처음의 큰 사각형이 돼요.\n\n조각을 돌리거나 뒤집어서 집, 배, 사람 같은 모양도 만들 수 있어요.',
      fig: tangram(),
      check: {
        type: 'choice',
        q: '칠교판의 조각 중에서 삼각형은 몇 개일까요?',
        choices: ['5개', '7개', '2개'],
        answer: 0,
        why: ['', '7개는 조각 전체의 수예요. 사각형 조각 2개는 빼야 해요.', '2개는 사각형 조각의 수예요.'],
        explain: '칠교판 7조각 중 삼각형은 1, 2, 3, 5, 6번으로 5개, 사각형은 4, 7번으로 2개예요.',
      },
    },
    {
      title: '쌓기나무로 모양 만들기',
      body: '**쌓기나무**는 크기와 모양이 똑같은 상자 모양의 나무 블록이에요. 쌓기나무로 여러 가지 모양을 만들 수 있어요.\n\n쌓기나무를 셀 때는 **층**으로 나누어 세면 빠뜨리지 않아요.\n- 바닥에 놓인 줄이 **1층**, 그 위가 **2층**이에요.\n- 그림의 모양은 1층에 3개, 2층에 1개, 모두 4개예요.\n\n> ⚠️ 2층에 쌓기나무를 놓으려면 그 바로 아래 1층에 쌓기나무가 있어야 해요.',
      easy: '아파트처럼 생각해요. 땅에 닿은 줄이 1층, 그 위가 2층이에요.\n\n1층에 몇 개, 2층에 몇 개를 따로 센 다음 모두 더하면 돼요.',
      fig: cubes([{ x: 0, z: 0 }, { x: 1, z: 0 }, { x: 2, z: 0 }, { x: 1, z: 1 }], '1층에 3개를 나란히 놓고, 가운데 위에 1개를 쌓은 쌓기나무'),
      check: {
        type: 'short', check: 'number', unit: '개',
        q: '쌓기나무는 모두 몇 개일까요?',
        fig: cubes([{ x: 0, z: 0 }, { x: 1, z: 0 }, { x: 0, z: 1 }, { x: 1, z: 1 }, { x: 0, z: 2 }], '1층에 2개, 2층에 2개, 3층에 1개를 쌓은 쌓기나무'),
        answer: '5',
        wrong: [
          { a: '2', why: '1층만 셌어요. 위에 쌓은 쌓기나무도 세어요.' },
          { a: '4', why: '3층의 쌓기나무를 빠뜨렸어요. 맨 위까지 세어 보세요.' },
        ],
        explain: '1층에 2개, 2층에 2개, 3층에 1개예요. $2+2+1=5$이므로 모두 5개예요.',
      },
    },
    {
      title: '쌓기나무의 위치와 방향',
      body: '쌓기나무가 어디에 있는지 **위, 아래, 앞, 뒤, 오른쪽, 왼쪽** 같은 말로 설명할 수 있어요.\n\n그림에서\n- 마는 다의 **바로 위**에 있어요.\n- 가는 다의 **왼쪽**에, 라는 다의 **오른쪽**에 있어요.\n\n> 💡 오른쪽과 왼쪽은 그림을 보는 **내 쪽**에서 정해요. 앞은 나와 가까운 쪽, 뒤는 나와 먼 쪽이에요.',
      easy: '그림을 보고 오른손을 들어 보세요. 오른손이 있는 쪽이 오른쪽이에요.\n\n"바로 위"는 위에 딱 붙어 있다는 뜻이에요. 바로 옆도 딱 붙어 있는 쌓기나무를 말해요.',
      fig: cubes([{ x: 0, z: 0, label: '가' }, { x: 1, z: 0, label: '다' }, { x: 2, z: 0, label: '라' }, { x: 1, z: 1, label: '마' }], '1층에 왼쪽부터 가, 다, 라가 있고, 다의 위에 마가 있는 쌓기나무'),
      check: {
        type: 'choice',
        q: '그림에서 다의 바로 위에 있는 쌓기나무는 무엇일까요?',
        choices: ['마', '가', '라'],
        answer: 0,
        why: ['', '가는 다의 왼쪽에 있어요.', '라는 다의 오른쪽에 있어요.'],
        explain: '다 위에 딱 붙어 있는 쌓기나무는 마예요. 가는 다의 왼쪽, 라는 다의 오른쪽에 있어요.',
      },
    },
  ],

  examples: [
    {
      q: '삼각형 1개와 사각형 1개가 있어요. 꼭짓점은 모두 몇 개일까요?',
      steps: [
        '삼각형의 꼭짓점은 3개예요.',
        '사각형의 꼭짓점은 4개예요.',
        '모두 더하면 $3+4=7$이에요.',
      ],
      answer: '7개',
    },
    {
      q: '쌓기나무로 쌓은 모양을 설명해 보세요.',
      fig: cubes([{ x: 0, z: 0, label: '가' }, { x: 1, z: 0, label: '다' }, { x: 1, z: 1, label: '라' }], '1층에 가와 다가 나란히 있고, 다의 위에 라가 있는 쌓기나무'),
      steps: [
        '1층에 쌓기나무 2개(가, 다)가 옆으로 나란히 있어요.',
        '2층에는 쌓기나무 1개(라)가 있어요. 라는 오른쪽 쌓기나무 다의 바로 위에 있어요.',
        '모두 세면 $2+1=3$이에요.',
      ],
      answer: '1층에 2개를 나란히 놓고, 오른쪽 쌓기나무 위에 1개를 쌓았어요. 모두 3개예요.',
    },
  ],

  terms: [
    { term: '삼각형', def: '곧은 선 3개로 둘러싸인 모양이에요. 변이 3개, 꼭짓점이 3개예요.' },
    { term: '사각형', def: '곧은 선 4개로 둘러싸인 모양이에요. 변이 4개, 꼭짓점이 4개예요.' },
    { term: '원', def: '뾰족한 곳도 곧은 선도 없이, 어느 쪽에서 보아도 똑같이 동그란 모양이에요. 변과 꼭짓점이 없어요.' },
    { term: '변', def: '삼각형, 사각형에서 곧은 선을 말해요.' },
    { term: '꼭짓점', def: '삼각형, 사각형에서 두 곧은 선이 만나는 점이에요.' },
    { term: '칠교판', def: '큰 사각형을 삼각형 5조각, 사각형 2조각으로 나눈 놀이판이에요. 조각으로 여러 가지 모양을 만들어요.' },
    { term: '쌓기나무', def: '크기와 모양이 똑같은 상자 모양의 블록이에요. 쌓아서 여러 가지 모양을 만들어요.' },
    { term: '층', def: '쌓기나무를 쌓은 높이를 나타내요. 바닥에 놓인 것이 1층, 그 위가 2층이에요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', fixed: true, concept: 0,
      q: '삼각형을 모두 고른 것은 무엇일까요?',
      fig: FOUR,
      choices: ['가, 라', '가, 나, 라', '가, 다, 라', '가'],
      answer: 0,
      why: [
        '',
        '나는 선이 끊어져 있어서 둘러싸여 있지 않아요.',
        '다에는 굽은 선이 있어요. 삼각형은 곧은 선으로만 둘러싸여요.',
        '라도 삼각형이에요. 기울어져 있어도 곧은 선 3개로 둘러싸여 있어요.',
      ],
      explain: '가와 라는 곧은 선 3개로 빈틈없이 둘러싸여 있어서 삼각형이에요. 나는 선이 끊어졌고, 다는 굽은 선이 있어서 삼각형이 아니에요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '이 도형의 변은 몇 개일까요?',
      fig: { type: 'polygon', points: [[0, 0], [7, 1], [5, 4], [1, 3]], alt: '곧은 선으로 둘러싸인 도형' },
      answer: '4',
      wrong: [{ a: '3', why: '변을 하나 빠뜨렸어요. 곧은 선을 손가락으로 짚으며 하나씩 세어 보세요.' }],
      explain: '곧은 선이 4개 있어요. 변이 4개이니 이 도형은 사각형이에요.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 2,
      q: '원에는 곧은 선이 없어요.',
      answer: true,
      explain: '원은 굽은 선으로만 이어진 동그란 모양이에요. 그래서 곧은 선(변)이 없어요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 0,
      q: '변이 3개, 꼭짓점이 3개인 도형은 무엇일까요?',
      choices: ['삼각형', '사각형', '원'],
      answer: 0,
      why: ['', '사각형은 변과 꼭짓점이 4개씩이에요.', '원에는 변도 꼭짓점도 없어요.'],
      explain: '곧은 선 3개로 둘러싸인 삼각형은 변이 3개, 꼭짓점이 3개예요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '칠교판의 작은 삼각형 조각 2개를 변끼리 맞대어 붙였어요. 만들 수 **없는** 모양은 무엇일까요?',
      choices: ['원', '삼각형', '사각형'],
      answer: 0,
      why: [
        '',
        '두 조각의 긴 변이 아닌 짧은 변끼리 붙이면 더 큰 삼각형이 돼요.',
        '두 조각의 긴 변끼리 맞대어 붙이면 사각형이 돼요.',
      ],
      explain: '칠교 조각은 모두 곧은 선으로 되어 있어요. 그래서 굽은 선이 있는 원은 만들 수 없어요. 삼각형과 사각형은 만들 수 있어요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', unit: '개', concept: 4,
      q: '쌓기나무는 모두 몇 개일까요?',
      fig: cubes([{ x: 0, z: 0 }, { x: 1, z: 0 }, { x: 2, z: 0 }, { x: 0, z: 1 }, { x: 1, z: 1 }, { x: 0, z: 2 }], '1층에 3개, 2층에 2개, 3층에 1개를 계단처럼 쌓은 쌓기나무'),
      answer: '6',
      wrong: [
        { a: '3', why: '1층만 셌어요. 위에 쌓은 쌓기나무도 세어요.' },
        { a: '5', why: '한 층을 빠뜨렸어요. 1층, 2층, 3층을 따로 세어 더해 보세요.' },
      ],
      explain: '1층에 3개, 2층에 2개, 3층에 1개예요. $3+2+1=6$이므로 모두 6개예요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 5,
      q: '그림에서 가의 바로 오른쪽에 있는 쌓기나무는 무엇일까요? (오른쪽은 그림을 보는 내 쪽에서 정해요.)',
      fig: cubes([{ x: 0, z: 0, label: '라' }, { x: 1, z: 0, label: '가' }, { x: 2, z: 0, label: '바' }, { x: 1, z: 1, label: '다' }], '1층에 왼쪽부터 라, 가, 바가 있고, 가의 위에 다가 있는 쌓기나무'),
      choices: ['바', '라', '다'],
      answer: 0,
      why: ['', '라는 가의 왼쪽에 있어요. 오른손이 있는 쪽을 다시 보세요.', '다는 가의 바로 위에 있어요.'],
      explain: '가의 오른쪽에 딱 붙어 있는 쌓기나무는 바예요. 라는 가의 왼쪽, 다는 가의 위에 있어요.',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '삼각형 2개와 사각형 2개를 그렸어요. 변은 모두 몇 개일까요?',
      answer: '14',
      hint: '삼각형 하나에 변이 3개, 사각형 하나에 변이 4개예요.',
      wrong: [
        { a: '4', why: '도형의 개수를 셌어요. 도형마다 변이 몇 개인지 세어 더해요.' },
        { a: '7', why: '삼각형 1개와 사각형 1개의 변만 셌어요. 2개씩 있어요.' },
      ],
      explain: '삼각형 2개의 변은 $3+3=6$, 사각형 2개의 변은 $4+4=8$이에요. 모두 $6+8=14$예요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '칠교판의 3번 조각(중간 삼각형)을 작은 삼각형 조각으로 빈틈없이 덮으려고 해요. 작은 삼각형이 몇 개 필요할까요?',
      fig: tangram(),
      answer: '2',
      hint: '작은 삼각형 5번과 6번을 붙여 3번 조각과 같은 모양을 만들어 보세요.',
      wrong: [{ a: '4', why: '4개는 큰 삼각형(1번, 2번)을 덮을 때 필요한 수예요.' }],
      explain: '작은 삼각형 2개를 짧은 변끼리 붙이면 3번 조각과 똑같은 삼각형이 돼요. 그래서 2개가 필요해요.',
    },
    {
      id: 'p10', level: 2, type: 'ox', concept: 5,
      q: '설명: 쌓기나무 3개를 옆으로 나란히 놓고, **맨 왼쪽** 쌓기나무 위에 1개를 쌓았어요.\n\n그림은 설명대로 쌓은 모양이에요.',
      fig: cubes([{ x: 0, z: 0 }, { x: 1, z: 0 }, { x: 2, z: 0 }, { x: 2, z: 1 }], '1층에 3개를 나란히 놓고, 맨 오른쪽 위에 1개를 쌓은 쌓기나무'),
      answer: false,
      explain: '그림에서 2층의 쌓기나무는 맨 오른쪽 쌓기나무 위에 있어요. 설명대로라면 맨 왼쪽 쌓기나무 위에 있어야 해요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 2,
      q: '도형에 대한 설명으로 **옳지 않은** 것은 무엇일까요?',
      choices: ['원은 꼭짓점이 1개예요.', '삼각형은 변이 3개예요.', '사각형은 꼭짓점이 4개예요.', '원에는 곧은 선이 없어요.'],
      answer: 0,
      why: [
        '',
        '맞는 설명이에요. 삼각형은 곧은 선 3개로 둘러싸여 있어요.',
        '맞는 설명이에요. 사각형은 꼭짓점이 4개예요.',
        '맞는 설명이에요. 원은 굽은 선으로만 되어 있어요.',
      ],
      explain: '원에는 뾰족한 곳이 없어서 꼭짓점이 없어요. 그래서 "원은 꼭짓점이 1개예요."가 옳지 않아요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '칠교판의 1번 조각(큰 삼각형)을 작은 삼각형 조각으로 빈틈없이 덮으려고 해요. 작은 삼각형이 몇 개 필요할까요?',
      fig: tangram(),
      answer: '4',
      hint: '큰 삼각형은 중간 삼각형 몇 개로 덮을 수 있을까요? 중간 삼각형은 작은 삼각형 2개로 덮을 수 있어요.',
      wrong: [
        { a: '2', why: '2개는 중간 삼각형(3번)을 덮을 때의 수예요. 큰 삼각형은 더 커요.' },
        { a: '3', why: '하나를 빠뜨렸어요. 큰 삼각형은 중간 삼각형 2개, 중간 삼각형은 작은 삼각형 2개로 덮어요.' },
      ],
      explain: '큰 삼각형 1개는 중간 삼각형 2개로 덮을 수 있고, 중간 삼각형 1개는 작은 삼각형 2개로 덮을 수 있어요. 그래서 작은 삼각형은 $2+2=4$개가 필요해요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: '개', concept: 0,
      q: '사각형 안에 곧은 선 2개를 그었어요. 그림에서 찾을 수 있는 크고 작은 삼각형은 모두 몇 개일까요?',
      fig: { type: 'polygon', points: [[0, 0], [6, 0], [6, 4], [0, 4]], segments: [{ from: [0, 0], to: [6, 4] }, { from: [6, 0], to: [0, 4] }], alt: '사각형 안에 서로 마주 보는 꼭짓점을 잇는 곧은 선 2개를 그은 그림' },
      answer: '8',
      hint: '작은 삼각형 1개짜리와, 작은 삼각형 2개를 붙인 큰 삼각형을 따로 세어 보세요.',
      wrong: [
        { a: '4', why: '작은 삼각형만 셌어요. 작은 삼각형 2개를 합친 큰 삼각형도 있어요.' },
        { a: '6', why: '큰 삼각형을 다 찾지 못했어요. 곧은 선 하나가 사각형을 큰 삼각형 2개로 나누어요. 곧은 선이 2개이니 큰 삼각형은 4개예요.' },
      ],
      explain: '작은 삼각형이 4개 있어요. 작은 삼각형 2개를 붙인 큰 삼각형도 있어요. 곧은 선 하나가 사각형을 큰 삼각형 2개로 나누니, 곧은 선 2개로 큰 삼각형이 4개 생겨요. 모두 $4+4=8$개예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '삼각형 3개와 사각형 몇 개를 그렸더니 꼭짓점이 모두 17개였어요. 사각형은 몇 개 그렸을까요?',
      answer: '2',
      hint: '먼저 삼각형 3개의 꼭짓점이 몇 개인지 구해 보세요.',
      wrong: [{ a: '8', why: '8은 사각형들의 꼭짓점 수예요. 사각형 하나에 꼭짓점이 4개이니 4, 8 하고 세어 보세요.' }],
      explain: '삼각형 3개의 꼭짓점은 $3+3+3=9$개예요. 남은 꼭짓점은 $17-9=8$개예요. 사각형 하나에 4개씩이니 4, 8 하고 세면 사각형은 2개예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: '개', concept: 4,
      q: '2층에 쌓기나무 3개를 놓으려고 해요. 1층에는 쌓기나무가 적어도 몇 개 있어야 할까요?',
      answer: '3',
      hint: '2층의 쌓기나무 하나하나는 바로 아래에 받쳐 주는 쌓기나무가 있어야 해요.',
      wrong: [{ a: '1', why: '1층의 쌓기나무 1개 위에는 2층 쌓기나무를 1개만 바로 놓을 수 있어요.' }],
      explain: '2층의 쌓기나무는 바로 아래 1층에 쌓기나무가 있어야 해요. 2층에 3개를 놓으려면 그 아래 1층에 적어도 3개가 있어야 해요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 5,
      q: '설명대로 쌓기나무를 쌓았어요.\n\n- 1층에 왼쪽부터 가, 다, 라를 나란히 놓아요.\n- 라 위에 마를 쌓아요.\n- 다 위에 바를 쌓아요.\n\n마의 바로 왼쪽에 있는 쌓기나무는 무엇일까요?',
      choices: ['바', '다', '라', '가'],
      answer: 0,
      why: [
        '',
        '다는 1층에 있어요. 마는 2층에 있으니 같은 2층에서 찾아요.',
        '라는 마의 바로 아래에 있어요.',
        '가는 1층 맨 왼쪽에 있어서 마와 붙어 있지 않아요.',
      ],
      hint: '설명대로 그림을 그려 보세요. 마와 같은 층에 있는 쌓기나무를 찾아요.',
      explain: '마는 라 위, 바는 다 위에 있어서 둘 다 2층이에요. 다가 라의 왼쪽에 있으니 바도 마의 바로 왼쪽에 있어요.',
    },
  ],

  deeper: [
    {
      title: '생활 속에서 도형 찾기',
      body: '우리 주변에는 도형이 많아요.\n\n- 자전거 바퀴, 동전, 접시의 테두리 → 원\n- 공책, 창문, 칠판의 테두리 → 사각형\n- 삼각김밥, 옷걸이의 테두리 → 삼각형\n\n바퀴가 원 모양인 데는 까닭이 있어요. 원은 뾰족한 곳이 없어서 덜컹거리지 않고 부드럽게 굴러가요.',
    },
    {
      title: '3학년에서 배울 도형',
      body: '3학년에서는 곧은 선을 더 자세히 나누어 배워요. 두 점을 곧게 이은 선, 끝없이 늘어나는 곧은 선 같은 것이에요.\n\n또 사각형 중에서 네 구석이 모두 반듯한 사각형처럼, 특별한 삼각형과 사각형의 이름도 배워요. 오늘 배운 변과 꼭짓점이 그때도 계속 쓰여요.',
    },
  ],

  faq: [
    {
      q: '꼭짓점이 뭐예요?',
      a: '삼각형이나 사각형에서 곧은 선 두 개가 만나는 뾰족한 점이에요. 삼각형에는 3개, 사각형에는 4개 있어요. 원에는 없어요.',
    },
    {
      q: '동그란 모양은 다 원이에요?',
      a: '아니에요. 원은 어느 쪽에서 보아도 똑같이 동그란 모양이에요. 달걀처럼 한쪽으로 길쭉한 동그라미는 원이 아니에요.',
    },
    {
      q: '쌓기나무에서 오른쪽, 왼쪽은 누구를 기준으로 해요?',
      a: '그림이나 쌓기나무를 보고 있는 내 쪽에서 정해요. 내 오른손이 있는 쪽이 오른쪽, 왼손이 있는 쪽이 왼쪽이에요.',
    },
  ],

  mistakes: [
    '선이 끊어진 모양이나 굽은 선이 있는 모양도 삼각형이라고 하는 실수 — 삼각형은 곧은 선 3개로 빈틈없이 둘러싸여야 해요.',
    '원에도 꼭짓점이 있다고 생각하는 실수 — 원에는 변도 꼭짓점도 없어요.',
    '쌓기나무를 셀 때 위에 쌓은 것을 빠뜨리는 실수 — 1층, 2층, 3층을 따로 세어 더해요.',
  ],

  gens: [
    {
      id: 'shape-parts',
      level: 1,
      title: '삼각형·사각형·원 알아보기',
      make: function (R) {
        var k = R.int(0, 4), name, fig, n;
        if (k <= 1) { n = 3; name = '삼각형'; }
        else if (k <= 3) { n = 4; name = '사각형'; }
        else { n = 0; name = '원'; }
        fig = n ? { type: 'polygon', points: convex(R, n), alt: '곧은 선으로 둘러싸인 도형' } : { type: 'circle', alt: '동그란 도형' };
        var ask = R.pick(['name', 'side', 'vertex']);
        if (ask === 'name') {
          var why = {
            '삼각형': n === 4 ? '곧은 선을 다시 세어 보세요. 4개예요.' : '원은 곧은 선이 없어요. 삼각형은 곧은 선 3개로 둘러싸여요.',
            '사각형': n === 3 ? '곧은 선을 다시 세어 보세요. 3개예요.' : '원은 곧은 선이 없어요. 사각형은 곧은 선 4개로 둘러싸여요.',
            '원': '원은 곧은 선도 뾰족한 곳도 없는 동그란 모양이에요. 이 도형에는 곧은 선이 있어요.',
          };
          var pick = R.choices(name, ['삼각형', '사각형', '원'].filter(function (x) { return x !== name; }), 3);
          return {
            type: 'choice', concept: n === 3 ? 0 : n === 4 ? 1 : 2,
            q: '그림의 도형의 이름은 무엇일까요?',
            fig: fig,
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === name ? '' : why[c]; }),
            explain: n ? '곧은 선 ' + n + '개로 둘러싸인 모양이니 ' + name + '이에요.' : '뾰족한 곳도 곧은 선도 없이 동그란 모양이니 원이에요.',
          };
        }
        var word = ask === 'side' ? '변' : '꼭짓점';
        var wrong = [];
        if (n === 0) wrong.push({ a: '1', why: '원에는 곧은 선도 뾰족한 곳도 없어서 ' + word + R.josa(word, '이/가') + ' 하나도 없어요.' });
        else wrong.push({ a: String(7 - n), why: (7 - n) + '개는 ' + (n === 3 ? '사각형' : '삼각형') + '의 ' + word + ' 수예요. 그림의 ' + (ask === 'side' ? '곧은 선' : '뾰족한 점') + '을 하나씩 짚으며 세어 보세요.' });
        return {
          type: 'short', check: 'number', unit: '개', concept: n === 3 ? 0 : n === 4 ? 1 : 2,
          q: '그림의 도형에서 ' + word + R.josa(word, '은/는') + ' 몇 개일까요?',
          fig: fig,
          answer: String(n),
          wrong: wrong,
          explain: n ? '이 도형은 곧은 선 ' + n + '개로 둘러싸인 ' + name + '이에요. ' + word + R.josa(word, '이/가') + ' ' + n + '개예요.'
            : '이 도형은 원이에요. 원에는 곧은 선도 뾰족한 곳도 없어서 ' + word + R.josa(word, '이/가') + ' 0개예요.',
        };
      },
    },
    {
      id: 'parts-total',
      level: 2,
      title: '여러 도형의 변·꼭짓점 모두 세기',
      make: function (R) {
        var a = R.int(1, 3), b = R.int(1, 3), c = R.int(0, 2);
        var word = R.pick(['변', '꼭짓점']);
        var ta = 3 * a, tb = 4 * b, total = ta + tb;
        var list = '삼각형 ' + a + '개, 사각형 ' + b + '개' + (c ? ', 원 ' + c + '개' : '');
        function rep(x, k) { var r = []; for (var i = 0; i < k; i++) r.push(x); return r.join('+'); }
        var wrong = [{ a: String(a + b + c), why: '도형의 개수를 셌어요. 도형마다 ' + word + R.josa(word, '이/가') + ' 몇 개인지 세어 더해요.' }];
        if (a !== b) wrong.push({ a: String(4 * a + 3 * b), why: '삼각형과 사각형의 ' + word + ' 수를 바꾸어 셌어요. 삼각형은 3개, 사각형은 4개예요.' });
        if (c && (a === b || total + c !== 4 * a + 3 * b)) wrong.push({ a: String(total + c), why: '원에도 ' + word + R.josa(word, '이/가') + ' 있다고 셌어요. 원에는 ' + word + R.josa(word, '이/가') + ' 없어요.' });
        return {
          type: 'short', check: 'number', unit: '개', concept: 1,
          q: list + '가 있어요. ' + word + R.josa(word, '은/는') + ' 모두 몇 개일까요?',
          answer: String(total),
          wrong: wrong,
          hint: '삼각형 하나에 3개, 사각형 하나에 4개' + (c ? ', 원에는 0개' : '') + '예요.',
          explain: '삼각형 ' + a + '개의 ' + word + R.josa(word, '은/는') + ' ' + (a > 1 ? '$' + rep(3, a) + '=' + ta + '$' : '3') + '개, 사각형 ' + b + '개의 ' + word + R.josa(word, '은/는') + ' ' + (b > 1 ? '$' + rep(4, b) + '=' + tb + '$' : '4') + '개예요.' +
            (c ? ' 원에는 ' + word + R.josa(word, '이/가') + ' 없어요.' : '') + ' 모두 $' + ta + '+' + tb + '=' + total + '$개예요.',
        };
      },
    },
    {
      id: 'cube-count',
      level: 1,
      title: '쌓기나무 세기',
      make: function (R) {
        var k = R.int(2, 4), h = [], i, list = [];
        for (i = 0; i < k; i++) h.push(R.int(1, 3));
        if (h.every(function (x) { return x === 1; })) h[R.int(0, k - 1)] = 2;
        for (i = 0; i < k; i++) for (var z = 0; z < h[i]; z++) list.push({ x: i, z: z });
        var fl = [0, 0, 0];
        h.forEach(function (x) { for (var z = 0; z < x; z++) fl[z]++; });
        var total = list.length;
        var parts = fl.filter(function (x) { return x > 0; });
        var desc = parts.map(function (x, j) { return (j + 1) + '층에 ' + x + '개'; }).join(', ');
        var fig = cubes(list, '쌓기나무 ' + k + '줄을 옆으로 나란히 쌓은 모양');
        var who = R.pick(NAMES), lead = who + R.josa(who, '이/가') + ' 쌓기나무로 모양을 만들었어요. ';
        if (R.bool(0.3)) {
          return {
            type: 'short', check: 'number', unit: '개', concept: 4,
            q: lead + '2층에 있는 쌓기나무는 몇 개일까요?',
            fig: fig,
            answer: String(fl[1]),
            wrong: [{ a: String(total), why: '모든 쌓기나무를 셌어요. 바닥에 놓인 줄 바로 위, 2층만 세어요.' }],
            explain: '바닥에 놓인 줄이 1층, 그 바로 위가 2층이에요. 그림은 ' + desc + '예요. 2층에는 ' + fl[1] + '개가 있어요.',
          };
        }
        var wrong = [{ a: String(fl[0]), why: '1층만 셌어요. 위에 쌓은 쌓기나무도 세어요.' }];
        return {
          type: 'short', check: 'number', unit: '개', concept: 4,
          q: lead + '쌓기나무는 모두 몇 개일까요?',
          fig: fig,
          answer: String(total),
          wrong: wrong,
          explain: desc + '예요. $' + parts.join('+') + '=' + total + '$이므로 모두 ' + total + '개예요.',
        };
      },
    },
    {
      id: 'cube-position',
      level: 2,
      title: '쌓기나무의 위치 말하기',
      make: function (R) {
        var k = R.int(3, 4), m = R.int(1, 2), i;
        var tops = R.sample([0, 1, 2, 3].slice(0, k), m);
        var lab = R.shuffle(LAB).slice(0, k + m);
        var list = [];
        for (i = 0; i < k; i++) list.push({ x: i, z: 0, label: lab[i] });
        tops.forEach(function (x, j) { list.push({ x: x, z: 1, label: lab[k + j] }); });
        function at(x, z) { for (var j = 0; j < list.length; j++) if (list[j].x === x && list[j].z === z) return list[j]; return null; }
        var DIRS = [['위', 0, 1], ['아래', 0, -1], ['오른쪽', 1, 0], ['왼쪽', -1, 0]];
        var pairs = [];
        list.forEach(function (c) {
          DIRS.forEach(function (d) { var nb = at(c.x + d[1], c.z + d[2]); if (nb) pairs.push([c, d[0], nb]); });
        });
        var pr = R.pick(pairs), t = pr[0], dir = pr[1], nb = pr[2];
        function rel(w) {
          if (w.z === t.z) return w.x > t.x ? '오른쪽' : '왼쪽';
          if (w.x === t.x) return w.z > t.z ? '위' : '아래';
          return '';
        }
        var others = list.filter(function (c) { return c !== t && c !== nb; }).map(function (c) { return c.label; });
        var pick = R.choices(nb.label, others, Math.min(4, others.length + 1));
        var byLab = {};
        list.forEach(function (c) { byLab[c.label] = c; });
        return {
          type: 'choice', concept: 5,
          q: '그림에서 ' + t.label + '의 바로 ' + dir + '에 있는 쌓기나무는 무엇일까요? (오른쪽, 왼쪽은 그림을 보는 내 쪽에서 정해요.)',
          fig: cubes(list, '이름표가 붙은 쌓기나무 ' + list.length + '개'),
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            if (c === nb.label) return '';
            var r = rel(byLab[c]);
            if (r && r === dir) return c + R.josa(c, '은/는') + ' ' + t.label + '의 ' + r + '에 있지만 딱 붙어 있지 않아요. 바로 ' + dir + '에 딱 붙은 쌓기나무를 찾아요.';
            if (r) return c + R.josa(c, '은/는') + ' ' + t.label + '의 ' + r + '에 있어요. 바로 ' + dir + '에 딱 붙은 쌓기나무를 찾아요.';
            return c + R.josa(c, '은/는') + ' ' + t.label + '와 딱 붙어 있지 않아요. 바로 ' + dir + '에 딱 붙은 쌓기나무를 찾아요.';
          }),
          explain: t.label + '의 바로 ' + dir + '에 딱 붙어 있는 쌓기나무는 ' + nb.label + '예요.',
        };
      },
    },
  ],
});
})();
