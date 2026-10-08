/* 1학년 수학 · 비교하기
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 막대·키·건물·시소·넓이·그릇 그림은 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  var NAMES = ['민수', '지아', '서준', '하윤', '도윤', '수아', '예준', '서연'];
  var LABELS = ['가', '나', '다'];

  function txt(x, y, s, size, anchor) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 14) + '" text-anchor="' + (anchor || 'middle') + '" fill="currentColor">' + s + '</text>';
  }
  function svg(w, h, body, alt) {
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + w + ' ' + h + '">' + body + '</svg>', alt: alt };
  }
  // 왼쪽 끝을 맞춘 막대(리본·끈). items: [[이름, 길이(px)]]
  function bars(items, alt) {
    var body = '<line x1="90" y1="6" x2="90" y2="' + (items.length * 36 + 8) + '" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="4 4"/>';
    items.forEach(function (it, i) {
      var y = 14 + i * 36;
      body += txt(80, y + 13, it[0], 14, 'end') +
        '<rect x="90" y="' + y + '" width="' + it[1] + '" height="18" rx="4" fill="var(--fig-' + (i + 1) + ')" fill-opacity="0.6" stroke="currentColor" stroke-width="1.5"/>';
    });
    return svg(360, items.length * 36 + 16, body, alt || '왼쪽 끝을 맞추어 놓은 막대 그림');
  }
  // 바닥을 맞춘 어린이 키. items: [[이름, 키(px)]]
  function kids(items, alt) {
    var G = 170, W = items.length * 80 + 40, body = '<line x1="10" y1="' + G + '" x2="' + (W - 10) + '" y2="' + G + '" stroke="currentColor" stroke-width="2"/>';
    items.forEach(function (it, i) {
      var x = 60 + i * 80, h = it[1];
      body += '<circle cx="' + x + '" cy="' + (G - h + 11) + '" r="11" fill="var(--fig-' + (i + 1) + ')" fill-opacity="0.5" stroke="currentColor" stroke-width="1.5"/>' +
        '<rect x="' + (x - 13) + '" y="' + (G - h + 24) + '" width="26" height="' + (h - 24) + '" rx="8" fill="var(--fig-' + (i + 1) + ')" fill-opacity="0.5" stroke="currentColor" stroke-width="1.5"/>' +
        txt(x, G + 18, it[0]);
    });
    return svg(Math.max(200, W), G + 26, body, alt || '바닥에 나란히 선 어린이들');
  }
  // 바닥을 맞춘 건물. items: [[이름, 높이(px)]]
  function buildings(items, alt) {
    var G = 170, W = items.length * 80 + 40, body = '<line x1="10" y1="' + G + '" x2="' + (W - 10) + '" y2="' + G + '" stroke="currentColor" stroke-width="2"/>';
    items.forEach(function (it, i) {
      var x = 60 + i * 80, h = it[1];
      body += '<rect x="' + (x - 24) + '" y="' + (G - h) + '" width="48" height="' + h + '" fill="var(--fig-' + (i + 1) + ')" fill-opacity="0.45" stroke="currentColor" stroke-width="1.5"/>';
      for (var y = G - h + 10; y < G - 20; y += 22) {
        body += '<rect x="' + (x - 15) + '" y="' + y + '" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1"/><rect x="' + (x + 5) + '" y="' + y + '" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1"/>';
      }
      body += txt(x, G + 18, it[0]);
    });
    return svg(Math.max(200, W), G + 26, body, alt || '바닥에 나란히 선 건물들');
  }
  // 시소 하나 (x0 에서 시작하는 너비 240 칸). leftDown 이면 왼쪽이 아래로 내려가요
  function seesawBody(x0, L, Rt, leftDown) {
    var yL = leftDown ? 86 : 50, yR = leftDown ? 50 : 86;
    function yAt(x) { return yL + (yR - yL) * (x - (x0 + 20)) / 200; }
    var body = '<line x1="' + x0 + '" y1="112" x2="' + (x0 + 240) + '" y2="112" stroke="currentColor" stroke-width="2"/>' +
      '<polygon points="' + (x0 + 120) + ',68 ' + (x0 + 104) + ',112 ' + (x0 + 136) + ',112" fill="var(--fig-4)" fill-opacity="0.5" stroke="currentColor" stroke-width="1.5"/>' +
      '<line x1="' + (x0 + 20) + '" y1="' + yL + '" x2="' + (x0 + 220) + '" y2="' + yR + '" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>';
    [[x0 + 50, L], [x0 + 190, Rt]].forEach(function (p) {
      var y = yAt(p[0]);
      body += '<rect x="' + (p[0] - 28) + '" y="' + (y - 32) + '" width="56" height="28" rx="6" fill="var(--fig-1)" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/>' + txt(p[0], y - 13, p[1]);
    });
    return body;
  }
  function seesaw(L, Rt, leftDown, alt) {
    return svg(240, 120, seesawBody(0, L, Rt, leftDown), alt || L + '와(과) ' + Rt + '가 탄 시소 그림');
  }
  function seesaw2(a, b, c, d, alt) {
    return svg(500, 120, seesawBody(0, a[0], a[1], a[2]) + seesawBody(260, b[0], b[1], b[2]), alt || '시소 두 개 그림');
  }
  // 나란히 놓은 사각형 (넓이). items: [[이름, 너비, 높이]]
  function sheets(items, alt) {
    var x = 20, H = 0, body = '';
    items.forEach(function (it) { H = Math.max(H, it[2]); });
    items.forEach(function (it, i) {
      body += '<rect x="' + x + '" y="' + (10 + H - it[2]) + '" width="' + it[1] + '" height="' + it[2] + '" fill="var(--fig-' + (i + 1) + ')" fill-opacity="0.45" stroke="currentColor" stroke-width="1.5"/>' +
        txt(x + it[1] / 2, H + 32, it[0]);
      x += it[1] + 30;
    });
    return svg(Math.max(200, x), H + 42, body, alt || '크기가 다른 종이 그림');
  }
  // 그릇. items: [[이름, 너비, 높이, 물 높이(없으면 0)]] — 위가 열린 그릇
  function cups(items, alt) {
    var x = 20, H = 0, body = '';
    items.forEach(function (it) { H = Math.max(H, it[2]); });
    items.forEach(function (it, i) {
      var top = 10 + H - it[2], bot = 10 + H;
      if (it[3]) body += '<rect x="' + x + '" y="' + (bot - it[3]) + '" width="' + it[1] + '" height="' + it[3] + '" fill="var(--fig-1)" fill-opacity="0.55"/>';
      body += '<path d="M' + x + ' ' + top + ' L' + x + ' ' + bot + ' L' + (x + it[1]) + ' ' + bot + ' L' + (x + it[1]) + ' ' + top + '" fill="none" stroke="currentColor" stroke-width="2"/>' +
        txt(x + it[1] / 2, H + 32, it[0]);
      x += it[1] + 36;
    });
    return svg(Math.max(200, x), H + 42, body, alt || '그릇 그림');
  }

Tutor.registerUnit({
  id: 'math-e1-04',
  course: 'math-e1',
  title: '비교하기',
  summary: '길이, 높이, 무게, 넓이, 담을 수 있는 양을 비교하고 \'더 길다\', \'더 무겁다\'처럼 말해요.',
  goals: [
    '두 물건의 길이, 키와 높이를 비교해서 말할 수 있어요.',
    '무게와 넓이를 비교해서 말할 수 있어요.',
    '담을 수 있는 양을 비교해서 말할 수 있어요.',
    '셋 이상을 비교해서 "가장 ~하다"로 말할 수 있어요.',
  ],
  standards: ['[2수03-06]'],

  concepts: [
    {
      title: '길이 비교하기',
      body: '두 물건의 길이를 비교할 때는 **한쪽 끝을 똑같이 맞추어요.**\n\n그다음 다른 쪽 끝을 봐요.\n\n더 많이 나온 쪽이 **더 길어요.** 덜 나온 쪽이 **더 짧아요.**\n\n그림에서 민수의 리본이 지아의 리본보다 더 길어요.\n\n지아의 리본은 민수의 리본보다 더 짧아요.\n\n> ⚠️ 끝을 맞추지 않으면 짧은 것이 길어 보일 수 있어요.',
      easy: '연필 두 자루를 책상 모서리에 나란히 세워 보세요. 아래쪽 끝이 똑같이 맞지요?\n\n이제 위쪽을 봐요. 더 높이 올라온 연필이 더 길어요.\n\n달리기 출발선에 함께 서는 것과 같아요.',
      fig: bars([['민수', 220], ['지아', 140]], '왼쪽 끝을 맞춘 리본 두 개. 민수의 리본이 지아의 리본보다 오른쪽으로 더 나와 있어요'),
      check: {
        type: 'choice',
        q: '길이를 비교하려면 먼저 어떻게 해야 할까요?',
        choices: ['한쪽 끝을 맞추어요', '색깔을 비교해요', '무게를 비교해요'],
        answer: 0,
        why: ['', '색깔은 길이와 상관없어요. 한쪽 끝을 맞추고 다른 쪽 끝을 봐요.', '무게는 길이와 달라요. 한쪽 끝을 맞추고 다른 쪽 끝을 봐요.'],
        explain: '한쪽 끝을 똑같이 맞추고, 다른 쪽 끝이 더 많이 나온 것이 더 길어요.',
      },
    },
    {
      title: '키와 높이 비교하기',
      body: '사람이나 동물은 **키**를 비교해요. **더 크다**, **더 작다**라고 말해요.\n\n건물이나 나무는 **높이**를 비교해요. **더 높다**, **더 낮다**라고 말해요.\n\n키와 높이를 비교할 때는 **아래쪽 끝(바닥)을 맞추어요.** 그리고 위쪽 끝을 봐요.\n\n| 무엇을 | 이렇게 말해요 |\n|---|---|\n| 사람·동물 | 키가 더 커요 / 더 작아요 |\n| 건물·나무·산 | 더 높아요 / 더 낮아요 |\n| 리본·연필·끈 | 더 길어요 / 더 짧아요 |',
      easy: '친구와 등을 맞대고 서 보세요. 두 사람의 발은 같은 바닥에 있지요?\n\n머리가 더 위에 있는 사람이 키가 더 커요.\n\n건물도 똑같아요. 땅에서부터 위로 더 올라간 건물이 더 높아요.',
      fig: kids([['서준', 140], ['하윤', 110]], '바닥에 나란히 선 서준이와 하윤이. 서준이의 머리가 더 위에 있어요'),
      check: {
        type: 'choice',
        q: '그림을 보고 두 건물을 비교했어요. 알맞은 말은 무엇일까요?\n\n"학교는 우체국보다 더 ( )."',
        fig: buildings([['학교', 140], ['우체국', 90]], '바닥에 나란히 선 학교와 우체국. 학교의 위쪽 끝이 더 위에 있어요'),
        choices: ['높아요', '길어요', '무거워요'],
        answer: 0,
        why: ['', '"길어요"는 리본, 연필처럼 옆으로 긴 것을 비교할 때 써요. 건물은 높이를 비교해요.', '그림으로는 무게를 알 수 없어요. 건물이 위로 얼마나 올라갔는지는 높이로 비교해요.'],
        explain: '건물은 땅에서 위로 얼마나 올라갔는지, 곧 높이를 비교해요. 학교의 위쪽 끝이 더 위에 있으니 "더 높아요"라고 말해요.',
      },
    },
    {
      title: '무게 비교하기',
      body: '무게는 손으로 들어 보면 비교할 수 있어요. 들기 힘든 쪽이 **더 무거워요.** 들기 쉬운 쪽이 **더 가벼워요.**\n\n**시소**를 타면 **아래로 내려간 쪽이 더 무거워요.** 위로 올라간 쪽이 더 가벼워요.\n\n> ⚠️ 크기가 크다고 언제나 무거운 것은 아니에요. 큰 풍선은 작은 돌보다 가벼워요.',
      easy: '아빠와 시소를 탄다고 생각해 보세요. 아빠 쪽이 쿵 내려가고 나는 위로 올라가지요?\n\n아빠가 나보다 더 무거워서 그래요.\n\n시소는 무거운 쪽으로 기울어요.',
      fig: seesaw('민수', '지아', true, '왼쪽 민수 쪽이 아래로 내려간 시소'),
      check: {
        type: 'choice',
        q: '민수와 지아가 시소를 탔어요. 누가 더 무거울까요?',
        fig: seesaw('민수', '지아', true, '왼쪽 민수 쪽이 아래로 내려간 시소'),
        choices: ['민수', '지아', '두 사람이 똑같이 무거워요'],
        answer: 0,
        why: ['', '위로 올라간 쪽은 더 가벼워요. 아래로 내려간 쪽을 찾아요.', '무게가 같으면 시소가 기울지 않고 반듯해요. 그림의 시소는 한쪽으로 기울어 있어요.'],
        explain: '시소는 무거운 쪽이 아래로 내려가요. 민수 쪽이 내려갔으니 민수가 더 무거워요.',
      },
    },
    {
      title: '넓이 비교하기',
      body: '공책, 손수건, 책상 위처럼 평평한 곳의 크기를 **넓이**라고 해요.\n\n넓이를 비교할 때는 **겹쳐 보아요.** 한쪽 끝을 맞추어 겹쳤을 때 **남는 쪽이 더 넓어요.** 다른 쪽에 다 덮이는 쪽이 **더 좁아요.**\n\n스케치북 위에 공책을 올려 보면 스케치북이 남아요. 스케치북이 공책보다 더 넓어요.',
      easy: '이불과 손수건을 겹쳐 보세요. 손수건은 이불 위에 쏙 올라가고, 이불은 많이 남지요?\n\n남는 쪽인 이불이 더 넓어요.\n\n덮을 수 있는 곳이 많을수록 넓다고 해요.',
      fig: sheets([['가', 150, 100], ['나', 80, 60]], '큰 종이 가와 작은 종이 나'),
      check: {
        type: 'ox',
        q: '두 종이를 겹쳤을 때 남는 쪽이 더 좁아요.',
        answer: false,
        explain: '겹쳤을 때 남는 쪽이 더 넓어요. 다른 종이에 다 덮이는 쪽이 더 좁아요.',
      },
    },
    {
      title: '담을 수 있는 양 비교하기',
      body: '그릇에 물을 가득 담을 때, 그릇마다 담기는 양이 달라요.\n\n- 그릇이 **더 크면** 물을 **더 많이** 담을 수 있어요.\n- 한 그릇에 물을 가득 채워 다른 그릇에 부어 봐요. **넘치면** 처음 그릇에 **더 많이** 담을 수 있어요.\n- **모양과 크기가 같은 그릇**이면 물의 높이가 **더 높은 쪽에 물이 더 많아요.**\n\n담을 수 있는 양은 **더 많다**, **더 적다**라고 말해요.',
      easy: '물컵과 양동이에 물을 가득 채운다고 생각해 보세요. 양동이에 훨씬 많은 물이 들어가지요?\n\n똑같은 컵 두 개에 주스를 따르면, 주스가 더 높이 차오른 컵에 주스가 더 많아요.',
      fig: cups([['가', 60, 100, 70], ['나', 60, 100, 35]], '똑같은 그릇 두 개. 가 그릇의 물이 더 높이 차 있어요'),
      check: {
        type: 'choice',
        q: '모양과 크기가 같은 그릇이에요. 물이 더 많이 들어 있는 그릇은 무엇일까요?',
        fig: cups([['가', 60, 100, 70], ['나', 60, 100, 35]], '똑같은 그릇 가와 나에 물이 들어 있는 그림'),
        choices: ['가', '나', '두 그릇의 물이 똑같아요'],
        answer: 0,
        why: ['', '같은 그릇이면 물이 더 높이 차 있는 쪽이 더 많아요. 나는 물이 더 낮아요.', '물의 높이가 다르니 물의 양도 달라요. 모양과 크기가 같은 그릇은 물이 더 높이 찬 쪽이 더 많아요.'],
        explain: '그릇의 모양과 크기가 같으니 물의 높이를 비교해요. 가의 물이 더 높으니 가에 물이 더 많아요.',
      },
    },
    {
      title: '셋 이상 비교하기',
      body: '셋 이상을 비교할 때는 **가장**이라는 말을 써요.\n\n- 가장 길어요, 가장 짧아요\n- 가장 높아요, 가장 낮아요\n- 가장 무거워요, 가장 가벼워요\n- 가장 넓어요, 가장 좁아요\n- 가장 많아요, 가장 적어요\n\n그림에서 수아의 끈이 가장 길어요. 도윤이의 끈이 가장 짧아요.\n\n> 💡 둘씩 차례로 비교해 보면 "가장" 긴 것을 찾기 쉬워요.',
      easy: '키 순서대로 줄을 서 본 적이 있나요? 맨 끝에 선 친구가 가장 크고, 맨 앞에 선 친구가 가장 작아요.\n\n물건도 이렇게 줄 세우면 가장 긴 것, 가장 짧은 것을 바로 찾을 수 있어요.',
      fig: bars([['도윤', 100], ['수아', 240], ['예준', 170]], '왼쪽 끝을 맞춘 끈 세 개'),
      check: {
        type: 'choice',
        q: '끈 세 개를 비교했어요. 가장 짧은 끈은 누구의 끈일까요?',
        fig: bars([['도윤', 100], ['수아', 240], ['예준', 170]], '왼쪽 끝을 맞춘 끈 세 개'),
        choices: ['도윤', '수아', '예준'],
        answer: 0, fixed: true,
        why: ['', '수아의 끈은 가장 길어요. 가장 짧은 것을 찾아요.', '예준이의 끈보다 더 짧은 끈이 있어요.'],
        explain: '왼쪽 끝이 맞추어져 있으니 오른쪽 끝을 봐요. 도윤이의 끈이 가장 덜 나왔으니 가장 짧아요.',
      },
    },
  ],

  examples: [
    {
      q: '그림에서 키가 가장 큰 어린이는 누구일까요?',
      fig: kids([['지아', 120], ['도윤', 150], ['수아', 95]], '바닥에 나란히 선 지아, 도윤, 수아'),
      steps: [
        '세 어린이 모두 같은 바닥에 서 있어요. 아래쪽 끝이 맞추어져 있어요.',
        '머리의 위치를 봐요. 도윤이의 머리가 가장 위에 있어요.',
        '그래서 도윤이가 키가 가장 커요. 수아는 키가 가장 작아요.',
      ],
      answer: '도윤',
    },
    {
      q: '주전자에 물을 가득 채워 컵에 부었더니 물이 넘쳤어요. 주전자와 컵 가운데 물을 더 많이 담을 수 있는 것은 무엇일까요?',
      steps: [
        '주전자의 물이 컵에 다 들어가지 못하고 넘쳤어요.',
        '컵에는 주전자의 물을 다 담을 수 없다는 뜻이에요.',
        '그래서 주전자에 물을 더 많이 담을 수 있어요.',
      ],
      answer: '주전자',
    },
  ],

  terms: [
    { term: '길다, 짧다', def: '길이를 비교할 때 쓰는 말이에요. 예: 리본이 연필보다 더 길어요.' },
    { term: '크다, 작다', def: '사람이나 동물의 키를 비교할 때 쓰는 말이에요. 예: 형은 나보다 키가 더 커요.' },
    { term: '높다, 낮다', def: '건물, 나무, 산처럼 위로 솟은 것을 비교할 때 쓰는 말이에요. 예: 산이 언덕보다 더 높아요.' },
    { term: '무겁다, 가볍다', def: '무게를 비교할 때 쓰는 말이에요. 시소는 더 무거운 쪽이 아래로 내려가요.' },
    { term: '넓다, 좁다', def: '평평한 곳의 크기를 비교할 때 쓰는 말이에요. 겹쳤을 때 남는 쪽이 더 넓어요.' },
    { term: '많다, 적다', def: '담을 수 있는 양이나 들어 있는 양을 비교할 때 쓰는 말이에요. 예: 양동이는 컵보다 물을 더 많이 담을 수 있어요.' },
    { term: '가장', def: '셋 이상을 비교해서 제일 그러한 것을 말할 때 써요. 예: 가장 길어요, 가장 무거워요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '더 긴 연필은 누구의 연필일까요?',
      fig: bars([['하윤', 130], ['서연', 200]], '왼쪽 끝을 맞춘 연필 두 자루'),
      choices: ['서연', '하윤', '길이가 같아요'],
      answer: 0,
      why: ['', '하윤이의 연필은 오른쪽 끝이 덜 나와 있어요. 더 짧아요.', '오른쪽 끝이 맞지 않아요. 길이가 같으면 양쪽 끝이 모두 맞아요.'],
      explain: '왼쪽 끝이 맞추어져 있으니 오른쪽 끝을 봐요. 서연이의 연필이 더 많이 나와 있으니 더 길어요.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: '두 끈의 한쪽 끝을 맞추지 않아도, 다른 쪽 끝이 더 멀리 있는 끈이 언제나 더 길어요.',
      answer: false,
      explain: '한쪽 끝을 맞추지 않으면 짧은 끈이 앞에서 시작해서 더 멀리 가 있을 수 있어요. 길이를 비교할 때는 꼭 한쪽 끝을 맞추어요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말은 무엇일까요?\n\n"기린은 토끼보다 키가 더 ( )."',
      choices: ['커요', '길어요', '높아요', '작아요'],
      answer: 0,
      why: ['', '"길어요"는 리본, 끈처럼 옆으로 긴 것을 비교할 때 써요. 동물은 키를 비교해요.', '"높아요"는 건물, 나무, 산을 비교할 때 써요. 동물의 키는 "커요"라고 해요.', '기린은 토끼보다 훨씬 키가 커요. 반대로 말했어요.'],
      explain: '사람이나 동물의 키는 "크다, 작다"로 말해요. 기린은 토끼보다 키가 더 커요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 1,
      q: '가장 높은 건물은 무엇일까요?',
      fig: buildings([['병원', 120], ['학교', 90], ['도서관', 150]], '바닥에 나란히 선 병원, 학교, 도서관'),
      choices: ['도서관', '병원', '학교'],
      answer: 0,
      why: ['', '병원보다 더 높은 건물이 있어요. 위쪽 끝을 비교해 보세요.', '학교는 가장 낮은 건물이에요.'],
      explain: '세 건물은 같은 땅에 서 있어요. 위쪽 끝이 가장 위에 있는 도서관이 가장 높아요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '시소를 보고, 더 가벼운 어린이를 고르세요.',
      fig: seesaw('예준', '하윤', false, '오른쪽 하윤 쪽이 아래로 내려간 시소'),
      choices: ['예준', '하윤', '무게가 같아요'],
      answer: 0,
      why: ['', '하윤 쪽은 아래로 내려갔어요. 아래로 내려간 쪽이 더 무거워요.', '시소가 한쪽으로 기울었어요. 무게가 같으면 시소가 기울지 않고 반듯해요.'],
      explain: '시소는 무거운 쪽이 내려가요. 하윤 쪽이 내려갔으니 예준이가 더 가벼워요.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 2,
      q: '크기가 더 큰 물건은 언제나 더 무거워요.',
      answer: false,
      explain: '크다고 언제나 무거운 것은 아니에요. 커다란 풍선은 작은 돌멩이보다 가벼워요. 무게는 들어 보거나 시소, 저울로 비교해요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '가장 넓은 것은 무엇일까요?',
      choices: ['책상 윗면', '우표', '지우개 윗면'],
      answer: 0,
      why: ['', '우표는 손톱보다 조금 큰 종이예요. 책상 윗면에 쏙 올라가요.', '지우개는 손바닥에 올라갈 만큼 작아요. 책상 윗면이 훨씬 넓어요.'],
      explain: '우표나 지우개를 책상 위에 올리면 책상 윗면이 많이 남아요. 책상 윗면이 가장 넓어요.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 4,
      q: '물을 가장 많이 담을 수 있는 것은 무엇일까요?',
      choices: ['양동이', '컵', '숟가락'],
      answer: 0,
      why: ['', '컵에 담긴 물은 양동이에 다 들어가고도 남아요. 양동이가 더 많이 담아요.', '숟가락에는 물을 아주 조금만 담을 수 있어요.'],
      explain: '양동이가 가장 커요. 그래서 물을 가장 많이 담을 수 있어요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: '모양과 크기가 같은 그릇 세 개에 물이 들어 있어요. 물이 가장 **적게** 들어 있는 그릇은 무엇일까요?',
      fig: cups([['가', 60, 100, 55], ['나', 60, 100, 85], ['다', 60, 100, 25]], '똑같은 그릇 가, 나, 다에 물이 들어 있는 그림'),
      choices: ['다', '가', '나'],
      answer: 0,
      why: ['', '가보다 물이 더 낮은 그릇이 있어요.', '나는 물이 가장 많이 들어 있어요. 가장 적은 것을 찾아요.'],
      hint: '그릇이 모두 같으니 물의 높이만 비교해요.',
      explain: '그릇의 모양과 크기가 같으니 물의 높이를 봐요. 다의 물이 가장 낮으니 물이 가장 적게 들어 있어요.',
    },
    {
      id: 'p10', level: 2, type: 'order', concept: 5,
      q: '**긴 것부터** 순서대로 놓으세요.',
      fig: bars([['줄넘기', 240], ['연필', 90], ['허리띠', 170]], '왼쪽 끝을 맞춘 줄넘기, 연필, 허리띠'),
      choices: ['줄넘기', '연필', '허리띠'],
      answer: [0, 2, 1],
      hint: '오른쪽 끝이 가장 많이 나온 것부터 찾아요.',
      explain: '왼쪽 끝이 맞추어져 있으니 오른쪽 끝을 봐요. 줄넘기가 가장 길고, 그다음 허리띠, 연필이 가장 짧아요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '겹쳐 보았더니 가 종이가 나 종이를 다 덮고도 남았어요. 알맞은 말은 무엇일까요?',
      choices: ['가 종이가 나 종이보다 더 넓어요.', '나 종이가 가 종이보다 더 넓어요.', '가 종이와 나 종이의 넓이는 같아요.'],
      answer: 0,
      why: ['', '다 덮이는 쪽은 더 좁아요. 나 종이는 가 종이에 다 덮였어요.', '한쪽이 남았으니 넓이가 같지 않아요.'],
      explain: '겹쳤을 때 남는 쪽이 더 넓어요. 가 종이가 남았으니 가 종이가 나 종이보다 더 넓어요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 5,
      q: '끈 세 개가 있어요. 가 끈은 나 끈보다 더 길어요. 다 끈은 나 끈보다 더 짧아요. 가장 긴 끈은 무엇일까요?',
      choices: ['가 끈', '나 끈', '다 끈'],
      answer: 0, fixed: true,
      why: ['', '나 끈은 가 끈보다 짧아요. 가장 길 수 없어요.', '다 끈은 나 끈보다도 짧아요. 가장 짧은 끈이에요.'],
      hint: '나 끈을 가운데에 놓고 생각해 보세요.',
      explain: '가는 나보다 길고, 나는 다보다 길어요. 길이 순서는 가, 나, 다예요. 그래서 가장 긴 끈은 가 끈이에요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '세 어린이가 시소를 탔어요. 가장 가벼운 어린이는 누구일까요?',
      fig: seesaw2(['민수', '지아', true], ['지아', '서준', true], null, null, '왼쪽 시소는 민수 쪽이, 오른쪽 시소는 지아 쪽이 아래로 내려갔어요'),
      choices: ['서준', '지아', '민수'],
      answer: 0,
      why: ['', '지아는 서준이보다 무거워요. 오른쪽 시소에서 지아 쪽이 내려갔어요.', '민수는 지아보다 무거워요. 가장 무거운 어린이예요.'],
      hint: '두 시소에 모두 탄 지아를 기준으로 생각해 보세요.',
      explain: '민수는 지아보다 무겁고, 지아는 서준이보다 무거워요. 무거운 순서는 민수, 지아, 서준이에요. 가장 가벼운 어린이는 서준이에요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '가 물병과 나 물병의 물을 똑같은 컵에 부었어요. 가 물병의 물은 컵 3개를, 나 물병의 물은 컵 5개를 가득 채웠어요. 물이 더 많이 들어 있던 물병은 무엇일까요?',
      choices: ['나 물병', '가 물병', '똑같아요'],
      answer: 0,
      why: ['', '가 물병의 물은 컵 3개만 채웠어요. 컵을 더 많이 채운 쪽이 물이 더 많아요.', '컵 수가 3개와 5개로 달라요. 같은 컵을 더 많이 채운 쪽이 더 많아요.'],
      hint: '컵이 모두 같으니 몇 개를 채웠는지 비교해요.',
      explain: '똑같은 컵을 썼으니 컵을 더 많이 채운 쪽의 물이 더 많아요. 5는 3보다 크니 나 물병의 물이 더 많았어요.',
    },
    {
      id: 'a4', level: 3, type: 'order', concept: 5,
      q: '**넓은 것부터** 순서대로 놓으세요.',
      choices: ['신문지 한 장', '우표 한 장', '공책 한 쪽'],
      answer: [0, 2, 1],
      hint: '둘씩 겹쳐 본다고 생각해 보세요.',
      explain: '공책을 신문지 위에 올리면 신문지가 남고, 우표를 공책 위에 올리면 공책이 남아요. 넓은 순서는 신문지, 공책, 우표예요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: '똑같은 컵 두 개에 담긴 물을 하나는 가늘고 긴 병에, 하나는 넓적한 그릇에 모두 부었어요. 가는 병의 물이 더 높이 올라왔어요. 어느 쪽의 물이 더 많을까요?',
      choices: ['똑같아요', '가는 병', '넓적한 그릇'],
      answer: 0,
      why: ['', '그릇 모양이 다르면 물의 높이만으로 비교할 수 없어요. 처음에 똑같은 양을 부었어요.', '넓적한 그릇은 물이 옆으로 퍼져서 낮아 보일 뿐이에요. 처음에 똑같은 양을 부었어요.'],
      hint: '부은 물은 처음에 얼마나 있었나요?',
      explain: '똑같은 컵에 담긴 같은 양의 물을 부었으니 양은 똑같아요. 가는 병은 좁아서 물이 높이 올라오고, 넓적한 그릇은 넓어서 낮게 퍼질 뿐이에요. 물의 높이로 양을 비교할 수 있는 것은 그릇의 모양과 크기가 같을 때뿐이에요.',
    },
  ],

  deeper: [
    {
      title: '옛날 사람들은 어떻게 길이를 쟀을까?',
      body: '옛날에는 자가 없어서 몸을 써서 길이를 비교했어요.\n\n손가락을 벌린 길이(뼘), 발걸음 수로 재었지요.\n\n그런데 손이 큰 사람과 작은 사람의 한 뼘은 달라요. 그래서 같은 책상도 사람마다 "몇 뼘"이 다르게 나와요.\n\n2학년에서는 누가 재어도 똑같이 나오는 **자**와 **cm(센티미터)**로 길이를 재는 법을 배워요.',
    },
    {
      title: '물의 높이가 높으면 언제나 많을까?',
      body: '모양과 크기가 같은 컵이면 물이 높이 찬 쪽이 더 많아요.\n\n하지만 가늘고 긴 병과 넓적한 그릇에 똑같은 양을 부으면, 가는 병의 물이 훨씬 높이 올라와요.\n\n그래서 모양이 다른 그릇은 물의 높이만 보고 비교하면 안 돼요. 한쪽 물을 다른 쪽에 옮겨 부어 보거나, 똑같은 컵으로 몇 번 채우는지 세어 비교해요.',
    },
  ],

  faq: [
    { q: '키가 크다랑 높다는 뭐가 달라요?', a: '사람이나 동물은 "키가 크다"라고 해요. 건물, 나무, 산처럼 땅에서 솟은 것은 "높다"라고 해요. 둘 다 위아래로 얼마나 큰지를 비교하는 말이에요.' },
    { q: '시소에서 왜 무거운 쪽이 내려가요?', a: '무거운 쪽이 땅으로 더 세게 눌러서 그래요. 그래서 내려간 쪽이 더 무겁고, 올라간 쪽이 더 가벼워요. 두 쪽이 수평이면 무게가 비슷해요.' },
    { q: '종이를 겹칠 수 없을 때는 넓이를 어떻게 비교해요?', a: '벽이나 운동장처럼 겹칠 수 없을 때는 똑같은 크기의 종이나 타일로 덮어 보고, 몇 장이 드는지 세어 비교할 수 있어요. 더 많이 드는 쪽이 더 넓어요.' },
  ],

  mistakes: [
    '길이를 비교할 때 한쪽 끝을 맞추지 않고 보는 실수 — 꼭 한쪽 끝을 맞추고 다른 쪽 끝을 비교해요.',
    '크기가 크면 무조건 더 무겁다고 생각하는 실수 — 큰 풍선은 작은 돌보다 가벼워요.',
    '모양이 다른 그릇의 물 높이만 보고 양을 비교하는 실수 — 높이로 비교할 수 있는 것은 같은 그릇일 때뿐이에요.',
  ],

  gens: [
    {
      id: 'length-height',
      level: 1,
      title: '길이·키·높이 비교하기',
      make: function (R) {
        var k = R.bool(0.4) ? 2 : 3;
        var mode = R.int(0, 2);
        var vals = R.sample(mode === 0 ? [70, 110, 150, 190, 230] : [70, 95, 120, 145], k);
        var big = R.bool();
        var most = k === 2 ? '더 ' : '가장 ';
        var names, fig, adj, oppAdj, rule, card, same, label, q, noun, tail;
        if (mode === 0) {
          var thing = R.pick(['리본', '끈', '색 테이프', '줄', '막대']);
          names = R.sample(NAMES, k);
          adj = big ? '긴' : '짧은'; oppAdj = big ? '짧은' : '긴';
          noun = thing;
          tail = function (n) { return most + adj + ' ' + thing + R.josa(thing, '은/는') + ' ' + n + '의 ' + thing + R.josa(thing, '이에요/예요') + '.'; };
          fig = bars(names.map(function (n, i) { return [n, vals[i]]; }), '왼쪽 끝을 맞춘 ' + thing + ' ' + k + '개');
          label = function (n) { return n + '의 ' + thing; };
          q = most + adj + ' ' + thing + R.josa(thing, '은/는') + ' 누구의 ' + thing + '일까요?';
          rule = '왼쪽 끝이 맞추어져 있으니 오른쪽 끝을 봐요.';
          same = '길이가 같아요';
          card = k === 2 ? 0 : 5;
        } else if (mode === 1) {
          names = R.sample(NAMES, k);
          adj = big ? '큰' : '작은'; oppAdj = big ? '작은' : '큰';
          noun = '어린이';
          tail = function (n) { return '키가 ' + most + adj + ' 어린이는 ' + n + R.josa(n, '이에요/예요') + '.'; };
          fig = kids(names.map(function (n, i) { return [n, vals[i]]; }), '바닥에 나란히 선 어린이 ' + k + '명');
          label = function (n) { return n; };
          q = '키가 ' + most + adj + ' 어린이는 누구일까요?';
          rule = '모두 같은 바닥에 서 있으니 머리의 위치를 봐요.';
          same = '키가 같아요';
          card = k === 2 ? 1 : 5;
        } else {
          names = R.sample(['학교', '병원', '도서관', '우체국', '소방서', '경찰서'], k);
          adj = big ? '높은' : '낮은'; oppAdj = big ? '낮은' : '높은';
          noun = '건물';
          tail = function (n) { return most + adj + ' 건물은 ' + n + R.josa(n, '이에요/예요') + '.'; };
          fig = buildings(names.map(function (n, i) { return [n, vals[i]]; }), '바닥에 나란히 선 건물 ' + k + '개');
          label = function (n) { return n; };
          q = most + adj + ' 건물은 무엇일까요?';
          rule = '모두 같은 땅에 서 있으니 위쪽 끝을 봐요.';
          same = '높이가 같아요';
          card = k === 2 ? 1 : 5;
        }
        var target = big ? Math.max.apply(null, vals) : Math.min.apply(null, vals);
        var opp = big ? Math.min.apply(null, vals) : Math.max.apply(null, vals);
        var ti = vals.indexOf(target);
        var p = {
          type: 'choice', concept: card, fixed: true,
          q: q,
          fig: fig,
          choices: names.slice(),
          answer: ti,
          why: names.map(function (n, i) {
            if (i === ti) return '';
            var L = label(n);
            if (vals[i] === opp) return '반대로 골랐어요. ' + L + R.josa(L, '은/는') + ' ' + most + oppAdj + ' 쪽이에요.';
            return L + '보다 더 ' + adj + ' ' + noun + R.josa(noun, '이/가') + ' 있어요. ' + rule;
          }),
          explain: rule + ' ' + tail(names[ti]),
        };
        if (k === 2) { p.choices.push(same); p.why.push('끝이 서로 맞지 않아요. 같다면 끝이 나란히 맞아요. ' + rule); }
        return p;
      },
    },
    {
      id: 'area-water',
      level: 1,
      title: '넓이·담긴 양·담을 수 있는 양 비교하기',
      make: function (R) {
        var mode = R.int(0, 2);
        var k = R.bool(0.4) ? 2 : 3;
        var labels = LABELS.slice(0, k);
        var big = R.bool();
        var idx = R.sample([0, 1, 2, 3], k);
        var target = big ? Math.max.apply(null, idx) : Math.min.apply(null, idx);
        var ti = idx.indexOf(target);
        var opp = big ? Math.min.apply(null, idx) : Math.max.apply(null, idx);
        var most = k === 2 ? '더 ' : '가장 ';
        var fig, q, adj, oppAdj, rule, card, same, sameWhy, noun;
        if (mode === 0) {
          var WS = [50, 80, 110, 140], HS = [40, 60, 80, 100];
          fig = sheets(labels.map(function (l, i) { return [l, WS[idx[i]], HS[idx[i]]]; }), '크기가 다른 종이 ' + k + '장');
          noun = '종이';
          adj = big ? '넓은' : '좁은'; oppAdj = big ? '좁은' : '넓은';
          q = most + adj + ' 종이는 무엇일까요?';
          rule = '겹쳐 보면 남는 쪽이 더 넓고, 다 덮이는 쪽이 더 좁아요.';
          same = '넓이가 같아요';
          sameWhy = '두 종이의 크기가 달라요. 겹쳐 보면 한쪽이 남아요.';
          card = k === 2 ? 3 : 5;
        } else if (mode === 1) {
          var LV = [20, 40, 60, 80];
          fig = cups(labels.map(function (l, i) { return [l, 60, 100, LV[idx[i]]]; }), '모양과 크기가 같은 그릇 ' + k + '개에 물이 들어 있는 그림');
          noun = '그릇';
          adj = (big ? '많이' : '적게') + ' 들어 있는'; oppAdj = (big ? '적게' : '많이') + ' 들어 있는';
          q = '모양과 크기가 같은 그릇이에요. 물이 ' + most + adj + ' 그릇은 무엇일까요?';
          rule = '그릇이 모두 같으니 물의 높이를 비교해요. 물이 높을수록 더 많아요.';
          same = '물의 양이 같아요';
          sameWhy = '물의 높이가 서로 달라요. 같은 그릇에서 물의 높이가 다르면 양도 달라요.';
          card = k === 2 ? 4 : 5;
        } else {
          var CW = [40, 55, 70, 85], CH = [45, 65, 85, 105];
          fig = cups(labels.map(function (l, i) { return [l, CW[idx[i]], CH[idx[i]], 0]; }), '크기가 다른 빈 그릇 ' + k + '개');
          noun = '그릇';
          adj = (big ? '많이' : '적게') + ' 담을 수 있는'; oppAdj = (big ? '적게' : '많이') + ' 담을 수 있는';
          q = '그릇에 물을 가득 채우려고 해요. 물을 ' + most + adj + ' 그릇은 무엇일까요?';
          rule = '그릇이 클수록 물을 더 많이 담을 수 있어요.';
          same = '담을 수 있는 양이 같아요';
          sameWhy = '두 그릇의 크기가 달라요. 큰 그릇에 물이 더 많이 들어가요.';
          card = k === 2 ? 4 : 5;
        }
        var p = {
          type: 'choice', concept: card, fixed: true,
          q: q,
          fig: fig,
          choices: labels.slice(),
          answer: ti,
          why: labels.map(function (l, i) {
            if (i === ti) return '';
            if (idx[i] === opp) return '반대로 골랐어요. ' + l + ' ' + noun + R.josa(noun, '은/는') + ' ' + most + oppAdj + ' ' + noun + R.josa(noun, '이에요/예요') + '.';
            return l + ' ' + noun + '보다 더 ' + adj + ' ' + noun + R.josa(noun, '이/가') + ' 있어요. ' + rule;
          }),
          explain: rule + ' ' + most + adj + ' ' + noun + R.josa(noun, '은/는') + ' ' + labels[ti] + ' ' + noun + R.josa(noun, '이에요/예요') + '.',
        };
        if (k === 2) { p.choices.push(same); p.why.push(sameWhy); }
        return p;
      },
    },
    {
      id: 'seesaw',
      level: 2,
      title: '시소로 무게 비교하기',
      make: function (R) {
        var heavy = R.bool();
        if (R.bool(0.5)) {
          var p = R.sample(NAMES, 2), leftDown = R.bool();
          var heavier = leftDown ? p[0] : p[1], lighter = leftDown ? p[1] : p[0];
          var ans = heavy ? heavier : lighter;
          var order = R.shuffle(p);
          return {
            type: 'choice', concept: 2,
            q: p[0] + R.josa(p[0], '과/와') + ' ' + p[1] + R.josa(p[1], '이/가') + ' 시소를 탔어요. 더 ' + (heavy ? '무거운' : '가벼운') + ' 어린이는 누구일까요?',
            fig: seesaw(p[0], p[1], leftDown, (leftDown ? '왼쪽 ' + p[0] : '오른쪽 ' + p[1]) + ' 쪽이 아래로 내려간 시소'),
            choices: order.concat(['무게가 같아요']),
            answer: order.indexOf(ans),
            why: order.map(function (n) {
              if (n === ans) return '';
              return heavy ? n + ' 쪽은 위로 올라갔어요. 위로 올라간 쪽이 더 가벼워요.' : n + ' 쪽은 아래로 내려갔어요. 아래로 내려간 쪽이 더 무거워요.';
            }).concat(['시소가 한쪽으로 기울었어요. 무게가 같으면 시소가 기울지 않고 반듯해요.']),
            explain: '시소는 무거운 쪽이 아래로 내려가요. ' + heavier + ' 쪽이 내려갔으니 ' + heavier + R.josa(heavier, '이/가') + ' 더 무겁고, ' + lighter + R.josa(lighter, '이/가') + ' 더 가벼워요.',
          };
        }
        // 시소 두 개로 세 어린이 비교 (무거운 순서 A, B, C)
        var t = R.sample(NAMES, 3), A = t[0], B = t[1], C = t[2];
        var s1 = R.bool() ? [A, B, true] : [B, A, false];
        var s2 = R.bool() ? [B, C, true] : [C, B, false];
        var ans2 = heavy ? A : C;
        var opts = R.shuffle([A, B, C]);
        return {
          type: 'choice', concept: 5,
          q: '세 어린이가 두 번 시소를 탔어요. 가장 ' + (heavy ? '무거운' : '가벼운') + ' 어린이는 누구일까요?',
          fig: seesaw2(s1, s2, null, null, '시소 두 개: 왼쪽 시소는 ' + A + ' 쪽이, 오른쪽 시소는 ' + B + ' 쪽이 아래로 내려갔어요'),
          choices: opts,
          answer: opts.indexOf(ans2),
          why: opts.map(function (n) {
            if (n === ans2) return '';
            if (n === B) return B + R.josa(B, '은/는') + ' 한 번은 내려가고 한 번은 올라갔어요. 가운데예요. 두 시소에 모두 탄 ' + B + R.josa(B, '을/를') + ' 기준으로 생각해요.';
            return heavy ? n + R.josa(n, '은/는') + ' 가장 가벼운 어린이예요. 반대로 골랐어요.' : n + R.josa(n, '은/는') + ' 가장 무거운 어린이예요. 반대로 골랐어요.';
          }),
          explain: '왼쪽 시소에서 ' + A + R.josa(A, '이/가') + ' ' + B + '보다 무거워요. 오른쪽 시소에서 ' + B + R.josa(B, '이/가') + ' ' + C + '보다 무거워요. 무거운 순서는 ' + A + ', ' + B + ', ' + C + R.josa(C, '이에요/예요') + '. 가장 ' + (heavy ? '무거운' : '가벼운') + ' 어린이는 ' + ans2 + R.josa(ans2, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'chain3',
      level: 3,
      title: '말로 된 조건으로 셋 비교하기',
      make: function (R) {
        var KIND = [
          { what: '키', big: '커요', small: '작아요', bigAdj: '큰', smallAdj: '작은', who: '어린이', card: 1 },
          { what: '무게', big: '무거워요', small: '가벼워요', bigAdj: '무거운', smallAdj: '가벼운', who: '어린이', card: 2 },
        ];
        var useRope = R.bool(0.35);
        var t, K, s1, s2, top, bottom;
        if (useRope) {
          var owners = R.sample(NAMES, 3);
          t = owners;
          K = { big: '길어요', small: '짧아요', bigAdj: '긴', smallAdj: '짧은', card: 0 };
        } else {
          t = R.sample(NAMES, 3);
          K = R.pick(KIND);
        }
        var A = t[0], B = t[1], C = t[2]; // 큰 순서 A > B > C
        var subj = function (n) { return useRope ? n + '의 줄넘기는' : n + R.josa(n, '은/는'); };
        var obj = function (n) { return useRope ? n + '의 줄넘기보다' : n + '보다'; };
        var pre = useRope ? '' : (K.what === '키' ? '키가 ' : '');
        s1 = R.bool() ? subj(A) + ' ' + obj(B) + ' ' + pre + '더 ' + K.big : subj(B) + ' ' + obj(A) + ' ' + pre + '더 ' + K.small;
        s2 = R.bool() ? subj(B) + ' ' + obj(C) + ' ' + pre + '더 ' + K.big : subj(C) + ' ' + obj(B) + ' ' + pre + '더 ' + K.small;
        var lines = R.bool() ? [s1, s2] : [s2, s1];
        var askBig = R.bool();
        var ans = askBig ? A : C;
        var opts = R.shuffle([A, B, C]);
        var target = useRope ? '줄넘기' : K.who;
        var q = (useRope ? '세 어린이가 줄넘기를 하나씩 가지고 있어요.\n\n' : '') + lines.join('.\n\n') + '.\n\n' +
          (useRope ? '가장 ' + (askBig ? K.bigAdj : K.smallAdj) + ' 줄넘기는 누구의 것일까요?' : pre + '가장 ' + (askBig ? K.bigAdj : K.smallAdj) + ' ' + target + R.josa(target, '은/는') + ' 누구일까요?');
        return {
          type: 'choice', concept: 5,
          q: q,
          choices: opts,
          answer: opts.indexOf(ans),
          hint: '두 문장에 모두 나오는 ' + B + R.josa(B, '을/를') + ' 가운데에 놓고 생각해 보세요.',
          why: opts.map(function (n) {
            if (n === ans) return '';
            if (n === B) return B + R.josa(B, '은/는') + ' 가운데예요. 두 문장에 모두 나오는 ' + B + R.josa(B, '을/를') + ' 기준으로 순서를 세워 보세요.';
            return '반대로 골랐어요. ' + n + R.josa(n, '은/는') + ' 가장 ' + (askBig ? K.smallAdj : K.bigAdj) + ' 쪽이에요.';
          }),
          explain: '두 문장을 이으면 ' + pre + K.bigAdj + ' 순서는 ' + A + ', ' + B + ', ' + C + R.josa(C, '이에요/예요') + '. 그래서 ' +
            (useRope
              ? '가장 ' + (askBig ? K.bigAdj : K.smallAdj) + ' 줄넘기는 ' + ans + '의 것이에요.'
              : pre + '가장 ' + (askBig ? K.bigAdj : K.smallAdj) + ' 어린이는 ' + ans + R.josa(ans, '이에요/예요') + '.'),
        };
      },
    },
  ],
});
})();
