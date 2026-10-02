/* 2학년 수학 · 분류하기
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 모양·단추는 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  var KIND = ['삼각형', '사각형', '원'];

  // 모양 하나 (k: 0 삼각형, 1 사각형, 2 원 / f: 색칠 / big: 큰 것)
  function shape(k, x, y, f, big) {
    var s = big ? 19 : 13;
    var st = ' fill="' + (f ? 'var(--fig-1)' : 'none') + '"' + (f ? ' fill-opacity="0.6"' : '') + ' stroke="currentColor" stroke-width="2"';
    if (k === 0) {
      return '<polygon points="' + x + ',' + (y - s) + ' ' + (x - s) + ',' + (y + s * 0.8) + ' ' + (x + s) + ',' + (y + s * 0.8) + '"' + st + '/>';
    }
    if (k === 1) {
      return '<rect x="' + (x - s * 0.85) + '" y="' + (y - s * 0.85) + '" width="' + (s * 1.7) + '" height="' + (s * 1.7) + '"' + st + '/>';
    }
    return '<circle cx="' + x + '" cy="' + y + '" r="' + (s * 0.95) + '"' + st + '/>';
  }
  function itemName(it) {
    return (it[2] ? '큰 ' : '') + (it[1] ? '색칠한 ' : '') + KIND[it[0]];
  }
  // 모양 여러 개를 한 줄에 6개씩 (it = [k, f, big])
  function scene(items, alt) {
    var rows = Math.ceil(items.length / 6), H = rows * 50 + 14, body = '';
    items.forEach(function (it, i) {
      body += shape(it[0], 30 + (i % 6) * 50, 32 + Math.floor(i / 6) * 50, it[1], it[2]);
    });
    return {
      type: 'svg', svg: '<svg viewBox="0 0 312 ' + H + '">' + body + '</svg>',
      alt: alt || '모양 ' + items.length + '개가 놓인 그림. 왼쪽 위부터 차례로 ' + items.map(itemName).join(', '),
    };
  }
  // 단추 하나 (k: 0 둥근 단추, 1 네모난 단추 / h: 구멍 수 2·4)
  function button(k, h, x, y) {
    var o = k === 0
      ? '<circle cx="' + x + '" cy="' + y + '" r="17" fill="var(--fig-2)" fill-opacity="0.45" stroke="currentColor" stroke-width="2"/>'
      : '<rect x="' + (x - 16) + '" y="' + (y - 16) + '" width="32" height="32" rx="5" fill="var(--fig-2)" fill-opacity="0.45" stroke="currentColor" stroke-width="2"/>';
    var holes = h === 2 ? [[-5, 0], [5, 0]] : [[-5, -5], [5, -5], [-5, 5], [5, 5]];
    holes.forEach(function (p) {
      o += '<circle cx="' + (x + p[0]) + '" cy="' + (y + p[1]) + '" r="2.6" fill="currentColor"/>';
    });
    return o;
  }
  function buttons(list) {
    var rows = Math.ceil(list.length / 6), H = rows * 50 + 14, body = '';
    list.forEach(function (b, i) { body += button(b[0], b[1], 30 + (i % 6) * 50, 32 + Math.floor(i / 6) * 50); });
    return {
      type: 'svg', svg: '<svg viewBox="0 0 312 ' + H + '">' + body + '</svg>',
      alt: '단추 ' + list.length + '개. 왼쪽 위부터 차례로 ' + list.map(function (b) { return (b[0] === 0 ? '둥근' : '네모난') + ' 단추(구멍 ' + b[1] + '개)'; }).join(', '),
    };
  }
  function countOf(list, fn) {
    var c = 0;
    list.forEach(function (x) { if (fn(x)) c++; });
    return c;
  }
  // 오답 후보 중 정답과 값이 다르고 서로 다른 것만
  function wrongs(ans, list) {
    var seen = {}, out = [];
    seen[ans] = true;
    list.forEach(function (w) {
      if (w[0] > 0 && !seen[w[0]]) { seen[w[0]] = true; out.push({ a: String(w[0]), why: w[1] }); }
    });
    return out;
  }

  // 문제에 쓰는 고정 그림
  var BTN_A = [[0, 2], [1, 4], [0, 4], [0, 2], [1, 2], [0, 4], [1, 4], [0, 4], [1, 2], [0, 4]];
  var SHAPES_A = [[0, 1, 0], [2, 0, 0], [1, 1, 0], [2, 1, 0], [0, 0, 0], [1, 1, 0], [2, 0, 0], [0, 1, 0], [2, 1, 0], [1, 0, 0], [0, 1, 0], [2, 0, 0]];
  var SIZE_A = [[2, 1, 1], [0, 1, 0], [1, 1, 1], [2, 1, 0], [0, 1, 1], [1, 1, 0], [2, 1, 1], [0, 1, 0]];

Tutor.registerUnit({
  id: 'math-e2-05',
  course: 'math-e2',
  title: '분류하기',
  summary: '누가 보아도 분명한 기준을 정해 물건을 분류하고, 분류한 것을 세어 결과를 말해 봐요.',
  goals: [
    '분명한 분류 기준과 그렇지 않은 기준을 알 수 있어요.',
    '정해진 기준이나 내가 정한 기준에 따라 물건을 분류할 수 있어요.',
    '분류한 것을 세어 표에 쓰고, 결과를 말할 수 있어요.',
  ],
  standards: ['[2수04-01]'],

  concepts: [
    {
      title: '분류와 분명한 기준',
      body: '여러 가지 물건을 같은 것끼리 나누는 것을 **분류**라고 해요.\n\n나누는 잣대를 **분류 기준**이라고 해요.\n\n기준은 **누가 나누어도 결과가 같아야** 해요.\n\n| 분명한 기준 | 분명하지 않은 기준 |\n|---|---|\n| 다리의 수 | 귀여운 것 |\n| 모양 | 예쁜 것 |\n| 색깔 | 좋아하는 것 |\n\n"귀여운 것"은 사람마다 생각이 달라요. 그래서 나눈 결과가 달라져요.\n\n> 💡 "누가 해도 똑같이 나눌까?" 하고 물어보세요.',
      easy: '민수와 지아가 인형을 "귀여운 것"과 "안 귀여운 것"으로 나누었어요.\n\n민수는 곰 인형이 귀엽대요. 지아는 아니래요. 결과가 달라졌지요?\n\n이번에는 "다리가 있는 것"과 "없는 것"으로 나누어요. 이건 둘이 똑같이 나눠요.\n\n이렇게 **똑같이 나뉘는 기준**이 좋은 기준이에요.',
      check: {
        type: 'choice',
        q: '동물을 분류하는 기준으로 알맞은 것은 무엇일까요?',
        choices: ['다리의 수', '귀여운 것과 귀엽지 않은 것', '좋아하는 것과 싫어하는 것'],
        answer: 0,
        why: ['', '귀여운지는 사람마다 생각이 달라요. 누가 해도 같은 기준을 골라요.', '좋아하는 것은 사람마다 달라요. 누가 해도 같은 기준을 골라요.'],
        explain: '다리의 수는 누가 세어도 똑같아요. 그래서 분명한 기준이에요.',
      },
    },
    {
      title: '정해진 기준에 따라 분류하기',
      body: '기준이 정해지면 물건을 **하나씩** 보며 어디에 들어갈지 정해요.\n\n동물을 **다리의 수**로 분류해 볼까요?\n\n닭, 강아지, 오리, 고양이, 참새, 소\n\n| 다리가 2개 | 다리가 4개 |\n|---|---|\n| 닭, 오리, 참새 | 강아지, 고양이, 소 |\n\n> 💡 분류한 것에는 표시(✓)를 해요. 그러면 빠뜨리거나 두 번 넣지 않아요.',
      easy: '장난감 정리를 떠올려 보세요.\n\n"공은 이 바구니, 블록은 저 바구니" 하고 정하면 하나씩 집어서 넣기만 하면 돼요.\n\n분류도 같아요. 기준이 정해지면 하나씩 보고 알맞은 곳에 넣어요.',
      check: {
        type: 'ox',
        q: '동물을 다리의 수로 분류하면 닭은 "다리가 4개" 쪽에 들어가요.',
        answer: false,
        explain: '닭은 다리가 2개예요. 그래서 "다리가 2개" 쪽에 들어가요.',
      },
    },
    {
      title: '내가 정한 기준으로 분류하기',
      body: '같은 물건이라도 **기준을 바꾸면** 다르게 나뉘어요.\n\n아래 단추를 보세요.\n\n- **모양**으로 나누면: 둥근 단추, 네모난 단추\n- **구멍의 수**로 나누면: 구멍 2개, 구멍 4개\n\n내가 기준을 정할 때도 누가 보아도 분명한 것으로 정해요.',
      easy: '친구들을 나누어 볼까요?\n\n"안경을 쓴 친구, 안 쓴 친구"로 나눌 수 있어요.\n\n"모자를 쓴 친구, 안 쓴 친구"로도 나눌 수 있지요.\n\n같은 친구들인데 기준에 따라 나뉘는 모습이 달라져요.',
      fig: buttons([[0, 2], [1, 4], [0, 4], [1, 2], [0, 2], [1, 4]]),
      check: {
        type: 'ox',
        q: '같은 물건이라도 기준을 바꾸면 다르게 분류할 수 있어요.',
        answer: true,
        explain: '맞아요. 단추를 모양으로 나눌 수도, 구멍의 수로 나눌 수도 있어요.',
      },
    },
    {
      title: '분류하여 세어 보기',
      body: '분류한 다음에는 **몇 개인지 세어** 표에 써요.\n\n세면서 하나씩 /표시를 하면 두 번 세지 않아요.\n\n| 모양 | 삼각형 | 사각형 | 원 |\n|---|---|---|---|\n| 수(개) | 3 | 2 | 4 |\n\n표의 수를 모두 더하면 전체 수가 돼요. $3+2+4=9$\n\n> ⚠️ 표의 합이 전체 수와 다르면 빠뜨리거나 두 번 센 거예요.',
      easy: '바구니에 공을 넣을 때마다 손가락을 하나씩 펴 보세요.\n\n다 넣고 나서 편 손가락을 세면 몇 개인지 알 수 있어요.\n\n표에 쓸 때도 하나씩 표시하며 세면 틀리지 않아요.',
      fig: scene([[0, 1, 0], [2, 1, 0], [1, 1, 0], [2, 1, 0], [0, 1, 0], [2, 1, 0], [1, 1, 0], [0, 1, 0], [2, 1, 0]]),
      check: {
        type: 'short', check: 'number', unit: '개',
        q: '그림에서 원은 몇 개일까요?',
        fig: scene([[2, 1, 0], [0, 1, 0], [2, 1, 0], [1, 1, 0], [2, 1, 0], [0, 1, 0], [1, 1, 0]]),
        answer: '3',
        wrong: [{ a: '7', why: '모양을 모두 셌어요. 원만 골라 세어 보세요.' }],
        explain: '원에만 하나씩 표시하며 세면 3개예요.',
      },
    },
    {
      title: '분류한 결과 말하기',
      body: '표를 보면 여러 가지를 알 수 있어요.\n\n| 좋아하는 간식 | 떡 | 과일 | 빵 |\n|---|---|---|---|\n| 학생 수(명) | 4 | 7 | 5 |\n\n- 가장 많은 학생이 좋아하는 간식은 **과일**이에요.\n- 가장 적은 학생이 좋아하는 간식은 **떡**이에요.\n- 과일은 빵보다 2명 더 좋아해요. $7-5=2$\n\n그래서 간식을 준비한다면 과일을 가장 많이 준비하면 좋아요.',
      easy: '수를 비교하면 결과를 말할 수 있어요.\n\n가장 큰 수가 있는 칸이 "가장 많은 것", 가장 작은 수가 있는 칸이 "가장 적은 것"이에요.\n\n두 칸의 수를 빼면 몇 개 더 많은지 알 수 있어요.',
      check: {
        type: 'choice',
        q: '삼각형 5개, 사각형 2개, 원 6개를 분류했어요. 가장 많은 모양은 무엇일까요?',
        choices: ['원', '삼각형', '사각형'],
        answer: 0,
        why: ['', '삼각형은 5개예요. 6개인 원이 더 많아요.', '사각형은 2개로 가장 적어요.'],
        explain: '6이 가장 큰 수이므로 원이 가장 많아요.',
      },
    },
  ],

  examples: [
    {
      q: '다음 탈것을 다니는 곳에 따라 분류해 보세요.\n\n자동차, 배, 비행기, 버스, 헬리콥터, 자전거, 잠수함',
      steps: [
        '기준은 "다니는 곳"이에요. 땅, 물, 하늘로 나누어요.',
        '땅에서 다니는 것: 자동차, 버스, 자전거 (3개)',
        '물에서 다니는 것: 배, 잠수함 (2개)',
        '하늘에서 다니는 것: 비행기, 헬리콥터 (2개)',
        '확인해요. $3+2+2=7$로 전체 7개와 같아요.',
      ],
      answer: '땅 3개, 물 2개, 하늘 2개',
    },
    {
      q: '단추를 구멍의 수에 따라 분류하고 세어 보세요.',
      fig: buttons(BTN_A),
      steps: [
        '기준은 "구멍의 수"예요. 구멍 2개와 구멍 4개로 나누어요.',
        '구멍이 2개인 단추에 표시하며 세면 4개예요.',
        '구멍이 4개인 단추에 표시하며 세면 6개예요.',
        '확인해요. $4+6=10$으로 전체 10개와 같아요.',
      ],
      answer: '구멍 2개: 4개, 구멍 4개: 6개',
    },
  ],

  terms: [
    { term: '분류', def: '여러 가지 물건을 같은 것끼리 나누는 것이에요. 예: 동물을 다리의 수로 나누기' },
    { term: '분류 기준', def: '분류할 때 나누는 잣대예요. 모양, 색깔, 다리의 수처럼 누가 보아도 분명해야 해요.' },
    { term: '분명한 기준', def: '누가 나누어도 결과가 똑같은 기준이에요. "예쁜 것"은 사람마다 달라서 분명하지 않아요.' },
    { term: '표', def: '분류한 것의 수를 칸에 나누어 쓴 것이에요. 한눈에 비교하기 좋아요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '옷을 분류하는 기준으로 알맞은 것은 무엇일까요?',
      choices: ['소매의 길이(긴 소매, 짧은 소매)', '멋진 옷과 멋지지 않은 옷', '비싸 보이는 옷과 싸 보이는 옷', '내가 좋아하는 옷과 싫어하는 옷'],
      answer: 0,
      why: ['', '멋진지는 사람마다 생각이 달라요.', '비싸 보이는지는 사람마다 생각이 달라요.', '좋아하는 것은 사람마다 달라요.'],
      explain: '소매가 긴지 짧은지는 누가 보아도 똑같아요. 그래서 분명한 기준이에요.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: '"맛있는 과일과 맛없는 과일"은 분명한 분류 기준이에요.',
      answer: false,
      explain: '맛있는지는 사람마다 달라요. 그래서 분명한 기준이 아니에요. "껍질을 벗겨 먹는 것과 그냥 먹는 것"처럼 정하면 분명해요.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '구멍이 4개인 단추는 몇 개일까요?',
      fig: buttons(BTN_A),
      answer: '6',
      wrong: [
        { a: '4', why: '구멍이 2개인 단추를 셌어요. 구멍이 4개인 단추를 세어 보세요.' },
        { a: '10', why: '단추를 모두 셌어요. 구멍이 4개인 것만 골라 세어요.' },
      ],
      explain: '구멍이 4개인 단추에 하나씩 표시하며 세면 6개예요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', unit: '가지', concept: 2,
      q: '모양을 **크기**에 따라 분류하면 몇 가지로 나뉠까요?',
      fig: scene(SIZE_A, '크기가 다른 모양 8개. 큰 원, 작은 삼각형, 큰 사각형, 작은 원, 큰 삼각형, 작은 사각형, 큰 원, 작은 삼각형'),
      answer: '2',
      wrong: [{ a: '3', why: '모양(삼각형, 사각형, 원)으로 나누었어요. 기준은 크기예요.' }],
      explain: '크기로 나누면 큰 것과 작은 것, 2가지로 나뉘어요. 모양으로 나누면 3가지가 돼요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 1,
      q: '탈것을 다니는 곳에 따라 분류했어요. **땅**에서 다니는 것에 잘못 들어간 것은 무엇일까요?\n\n땅: 자동차, 버스, 배, 자전거',
      choices: ['배', '자동차', '버스', '자전거'],
      answer: 0,
      why: ['', '자동차는 땅에서 다녀요.', '버스는 땅에서 다녀요.', '자전거는 땅에서 다녀요.'],
      explain: '배는 물에서 다녀요. 그래서 "물"에 넣어야 해요.',
    },
    {
      id: 'p6', level: 1, type: 'order', concept: 3,
      q: '분류하여 세는 순서대로 놓으세요.',
      choices: ['분류 기준 정하기', '기준에 따라 나누기', '세어서 표에 쓰기', '결과 말하기'],
      answer: [0, 1, 2, 3],
      explain: '먼저 기준을 정하고, 그 기준으로 나누어요. 그다음 세어서 표에 쓰고, 표를 보고 결과를 말해요.',
    },
    {
      id: 'p7', level: 2, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '색칠한 원은 몇 개일까요?',
      fig: scene(SHAPES_A),
      answer: '2',
      hint: '원을 먼저 찾고, 그중에서 색칠한 것만 세어요.',
      wrong: [
        { a: '5', why: '원을 모두 셌어요. 색칠한 원만 세어요.' },
        { a: '7', why: '색칠한 모양을 모두 셌어요. 그중 원만 세어요.' },
      ],
      explain: '원은 모두 5개예요. 그중 색칠한 원은 2개예요.',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'number', unit: '명', concept: 3,
      q: '학생 20명이 좋아하는 계절을 조사했어요. 여름을 좋아하는 학생은 몇 명일까요?\n\n| 계절 | 봄 | 여름 | 가을 | 겨울 |\n|---|---|---|---|---|\n| 학생 수(명) | 6 | [[?]] | 5 | 4 |',
      answer: '5',
      hint: '봄, 가을, 겨울을 좋아하는 학생 수를 먼저 더해요.',
      wrong: [{ a: '15', why: '봄, 가을, 겨울의 합 15명을 썼어요. 전체 20명에서 15명을 빼야 해요.' }],
      explain: '봄, 가을, 겨울을 더하면 $6+5+4=15$(명)이에요. 전체가 20명이므로 여름은 $20-15=5$(명)이에요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: '표를 보고 **바르게** 말한 것을 고르세요.\n\n| 좋아하는 운동 | 축구 | 줄넘기 | 수영 |\n|---|---|---|---|\n| 학생 수(명) | 8 | 3 | 6 |',
      choices: ['축구를 좋아하는 학생이 가장 많아요.', '줄넘기를 좋아하는 학생이 가장 많아요.', '수영을 좋아하는 학생이 가장 적어요.', '축구는 수영보다 3명 더 많아요.'],
      answer: 0,
      why: ['', '줄넘기는 3명으로 가장 적어요.', '수영은 6명이에요. 가장 적은 것은 줄넘기예요.', '축구는 8명, 수영은 6명이에요. $8-6=2$이므로 2명 더 많아요.'],
      explain: '8이 가장 큰 수이므로 축구를 좋아하는 학생이 가장 많아요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '반 친구들이 좋아하는 음료를 조사했어요. 모둠 잔치에 음료를 준비한다면 무엇을 가장 많이 준비하면 좋을까요?\n\n| 음료 | 우유 | 주스 | 보리차 |\n|---|---|---|---|\n| 학생 수(명) | 5 | 9 | 4 |',
      choices: ['주스', '우유', '보리차'],
      answer: 0,
      why: ['', '우유는 5명이 좋아해요. 더 많은 학생이 좋아하는 음료가 있어요.', '보리차는 4명으로 가장 적어요.'],
      explain: '주스를 좋아하는 학생이 9명으로 가장 많아요. 그래서 주스를 가장 많이 준비하면 좋아요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '가지', concept: 2,
      q: '단추를 **모양**과 **구멍의 수**를 함께 기준으로 하여 분류하면 몇 가지로 나뉠까요?',
      fig: buttons(BTN_A),
      answer: '4',
      hint: '둥근 단추 가운데 구멍 2개, 구멍 4개가 있는지 보고, 네모난 단추도 살펴보세요.',
      wrong: [{ a: '2', why: '기준 하나로만 나누었어요. 모양과 구멍의 수를 함께 보아요.' }],
      explain: '둥근 단추(구멍 2개), 둥근 단추(구멍 4개), 네모난 단추(구멍 2개), 네모난 단추(구멍 4개)로 4가지예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '구슬 11개를 큰 구슬과 작은 구슬로 분류했어요. 큰 구슬이 작은 구슬보다 3개 더 많아요. 큰 구슬은 몇 개일까요?',
      answer: '7',
      hint: '더해서 11이 되는 두 수를 차례로 찾아보고, 차가 3인지 확인해요.',
      wrong: [
        { a: '4', why: '작은 구슬의 수를 구했어요. 큰 구슬이 더 많아요.' },
        { a: '8', why: '8과 3을 더하면 11이지만 차는 5예요. 두 수의 차가 3인지도 확인해요.' },
      ],
      explain: '더해서 11이 되는 두 수를 찾아요. 6과 5는 차가 1, 7과 4는 차가 3이에요. 그래서 큰 구슬은 7개, 작은 구슬은 4개예요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '서준이가 블록 12개를 색깔에 따라 분류하고 표를 만들었어요. 표를 보고 알 수 있는 것은 무엇일까요?\n\n| 색깔 | 빨간색 | 노란색 | 파란색 |\n|---|---|---|---|\n| 블록 수(개) | 5 | 3 | 3 |',
      choices: ['블록 하나를 빠뜨리고 셌어요.', '블록 하나를 두 번 셌어요.', '바르게 세었어요.', '분류 기준이 분명하지 않아요.'],
      answer: 0,
      why: ['', '두 번 세었다면 합이 12보다 커야 해요.', '$5+3+3=11$이라서 전체 12개와 달라요.', '색깔은 누가 보아도 같은 분명한 기준이에요.'],
      hint: '표의 수를 모두 더해 전체 수와 비교해요.',
      explain: '표의 합은 $5+3+3=11$(개)예요. 전체는 12개이므로 1개를 빠뜨리고 셌어요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 0,
      q: '세 친구가 같은 장난감을 분류했어요. 결과가 **사람마다 달라질 수 있는** 기준을 쓴 친구는 누구일까요?\n\n- 하윤: 바퀴가 있는 것과 없는 것\n- 도윤: 재미있는 것과 재미없는 것\n- 수아: 공 모양과 공 모양이 아닌 것',
      choices: ['도윤', '하윤', '수아'],
      answer: 0,
      why: ['', '바퀴가 있는지는 누가 보아도 같아요.', '공 모양인지는 누가 보아도 같아요.'],
      explain: '재미있는지는 사람마다 생각이 달라요. 그래서 도윤이의 기준은 분명하지 않아요.',
    },
  ],

  deeper: [
    {
      title: '생활 속 분류',
      body: '분류는 생활 곳곳에 있어요.\n\n- **도서관**: 책을 내용에 따라 나누어 꽂아요. 그래서 찾기 쉬워요.\n- **분리배출**: 종이, 플라스틱, 캔, 유리를 나누어 버려요.\n- **마트**: 과일, 채소, 우유처럼 나누어 놓아요.\n\n2학기 "표와 그래프" 단원에서는 분류한 결과를 표와 그래프로 나타내는 방법을 더 배워요.',
    },
  ],

  faq: [
    {
      q: '분명한 기준이 뭐예요?',
      a: '누가 나누어도 결과가 똑같은 기준이에요. "다리의 수"는 누가 세어도 같아요. 하지만 "귀여운 것"은 사람마다 생각이 달라요.',
    },
    {
      q: '하나가 두 곳에 다 들어갈 것 같으면 어떡해요?',
      a: '기준이 분명하지 않다는 뜻이에요. 기준을 더 분명하게 바꿔 보세요. 예를 들어 "큰 것"보다 "자보다 긴 것"이 더 분명해요.',
    },
    {
      q: '분류하고 나서 왜 세어요?',
      a: '세어서 표에 쓰면 어느 것이 가장 많은지, 몇 개 더 많은지 한눈에 알 수 있어요. 그 결과로 무엇을 준비할지 정할 수도 있어요.',
    },
  ],

  mistakes: [
    '"예쁜 것", "좋아하는 것"처럼 사람마다 다른 기준으로 분류하는 실수 — 누가 해도 같은 기준을 정해요.',
    '세다가 빠뜨리거나 두 번 세는 실수 — 하나씩 표시하며 세고, 표의 합이 전체 수와 같은지 확인해요.',
  ],

  gens: [
    {
      id: 'count-shape',
      level: 1,
      title: '그림에서 한 가지 모양 세기',
      make: function (R) {
        var n = R.int(8, 12), items = [], i;
        for (i = 0; i < n; i++) items.push([R.int(0, 2), 1, 0]);
        var k = R.int(0, 2);
        if (countOf(items, function (x) { return x[0] === k; }) === 0) items[R.int(0, n - 1)][0] = k;
        var c = countOf(items, function (x) { return x[0] === k; });
        var other = (k + 1) % 3;
        var co = countOf(items, function (x) { return x[0] === other; });
        return {
          type: 'short', check: 'number', unit: '개', concept: 3,
          q: '그림에서 ' + KIND[k] + R.josa(KIND[k], '은/는') + ' 몇 개일까요?',
          fig: scene(items),
          answer: String(c),
          wrong: wrongs(c, [
            [n, '모양을 모두 셌어요. ' + KIND[k] + '만 골라 세어 보세요.'],
            [co, KIND[other] + R.josa(KIND[other], '을/를') + ' 셌어요. ' + KIND[k] + R.josa(KIND[k], '을/를') + ' 찾아 세어 보세요.'],
            [c + 1, '하나를 두 번 센 것 같아요. 센 것에 표시하며 다시 세어 보세요.'],
            [c - 1, '하나를 빠뜨린 것 같아요. 센 것에 표시하며 다시 세어 보세요.'],
          ]),
          explain: KIND[k] + '에만 하나씩 표시하며 세면 ' + c + '개예요.',
        };
      },
    },
    {
      id: 'classify-list',
      level: 1,
      title: '기준에 따라 분류하여 세기',
      make: function (R) {
        var SETS = [
          { what: '탈것', crit: '다니는 곳', unit: '개', groups: [
            ['땅에서 다니는 것', ['자동차', '버스', '자전거', '기차', '트럭', '오토바이']],
            ['물에서 다니는 것', ['배', '잠수함', '뗏목', '유람선']],
            ['하늘에서 다니는 것', ['비행기', '헬리콥터', '열기구']]] },
          { what: '동물', crit: '다리의 수', unit: '마리', groups: [
            ['다리가 2개인 동물', ['닭', '오리', '참새', '타조', '펭귄', '독수리']],
            ['다리가 4개인 동물', ['강아지', '고양이', '소', '말', '토끼', '돼지', '사자', '코끼리']]] },
          { what: '수', crit: '자리 수', unit: '개', groups: [
            ['한 자리 수', ['3', '5', '7', '8', '2', '9', '4']],
            ['두 자리 수', ['12', '40', '35', '68', '91', '27', '50', '76']]] },
        ];
        var S = R.pick(SETS), G = S.groups.length;
        var pick = [], tag = [];
        S.groups.forEach(function (g, gi) {
          var m = R.int(1, G === 2 ? 4 : 3);
          R.sample(g[1], Math.min(m, g[1].length)).forEach(function (x) { pick.push(x); tag.push(gi); });
        });
        var order = R.shuffle(pick.map(function (x, i) { return i; }));
        var list = order.map(function (i) { return pick[i]; });
        var t = R.int(0, G - 1);
        var c = countOf(tag, function (x) { return x === t; });
        var n = pick.length;
        var mine = order.filter(function (i) { return tag[i] === t; }).map(function (i) { return pick[i]; });
        var otherCounts = [];
        for (var gi = 0; gi < G; gi++) if (gi !== t) otherCounts.push([countOf(tag, function (x) { return x === gi; }), '다른 쪽에 들어가는 것을 셌어요. **' + S.groups[t][0] + '**만 골라 세어요.']);
        return {
          type: 'short', check: 'number', unit: S.unit, concept: 1,
          q: '다음 ' + S.what + R.josa(S.what, '을/를') + ' ' + S.crit + '에 따라 분류하려고 해요.\n\n' + list.join(', ') + '\n\n**' + S.groups[t][0] + '**' + R.josa(S.groups[t][0], '은/는') + ' 몇 ' + S.unit + '일까요?',
          answer: String(c),
          wrong: wrongs(c, [[n, '모두 셌어요. 기준에 맞는 것만 골라 세어요.']].concat(otherCounts)),
          explain: S.groups[t][0] + R.josa(S.groups[t][0], '은/는') + ' ' + mine.join(', ') + R.josa(mine[mine.length - 1], '으로/로') + ' ' + c + S.unit + '예요.',
        };
      },
    },
    {
      id: 'two-criteria',
      level: 2,
      title: '두 가지 기준으로 세기',
      make: function (R) {
        var n = R.int(9, 12), items = [], i;
        for (i = 0; i < n; i++) items.push([R.int(0, 2), R.int(0, 1), 0]);
        var k = R.int(0, 2), f = R.int(0, 1);
        var both = function (x) { return x[0] === k && x[1] === f; };
        if (countOf(items, both) === 0) { var j = R.int(0, n - 1); items[j][0] = k; items[j][1] = f; }
        var c = countOf(items, both);
        var ck = countOf(items, function (x) { return x[0] === k; });
        var cf = countOf(items, function (x) { return x[1] === f; });
        var fw = f ? '색칠한' : '색칠하지 않은';
        return {
          type: 'short', check: 'number', unit: '개', concept: 3,
          q: '그림에서 **' + fw + ' ' + KIND[k] + '**' + R.josa(KIND[k], '은/는') + ' 몇 개일까요?',
          fig: scene(items),
          answer: String(c),
          hint: KIND[k] + R.josa(KIND[k], '을/를') + ' 먼저 찾고, 그중에서 ' + fw + ' 것만 세어요.',
          wrong: wrongs(c, [
            [ck, KIND[k] + R.josa(KIND[k], '을/를') + ' 모두 셌어요. 그중 ' + fw + ' 것만 세어요.'],
            [cf, fw + ' 모양을 모두 셌어요. 그중 ' + KIND[k] + '만 세어요.'],
          ]),
          explain: KIND[k] + R.josa(KIND[k], '은/는') + ' 모두 ' + ck + '개예요. 그중 ' + fw + ' 것은 ' + c + '개예요.',
        };
      },
    },
    {
      id: 'compare-most',
      level: 2,
      title: '분류한 결과 비교하기',
      make: function (R) {
        var cnt = R.sample([2, 3, 4, 5, 6], 3);
        var items = [];
        cnt.forEach(function (m, k) { for (var i = 0; i < m; i++) items.push([k, 1, 0]); });
        items = R.shuffle(items);
        var most = R.bool();
        var target = 0;
        for (var k = 1; k < 3; k++) if (most ? cnt[k] > cnt[target] : cnt[k] < cnt[target]) target = k;
        var correct = KIND[target];
        var reason = {};
        for (k = 0; k < 3; k++) {
          if (k === target) continue;
            reason[KIND[k]] = KIND[k] + R.josa(KIND[k], '은/는') + ' ' + cnt[k] + '개예요. ' + (most ? '이보다 더 많은 모양이 있어요.' : '이보다 더 적은 모양이 있어요.') + ' 모양마다 표시하며 세어 비교해 보세요.';
        }
        var pick = R.choices(correct, KIND.filter(function (x) { return x !== correct; }), 3);
        var w = most ? '가장 많은' : '가장 적은';
        return {
          type: 'choice', concept: 4,
          q: '모양에 따라 분류하여 세어 보세요. **' + w + '** 모양은 무엇일까요?',
          fig: scene(items),
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: '| 모양 | 삼각형 | 사각형 | 원 |\n|---|---|---|---|\n| 수(개) | ' + cnt[0] + ' | ' + cnt[1] + ' | ' + cnt[2] + ' |\n\n' + (most ? '가장 큰 수' : '가장 작은 수') + '는 ' + cnt[target] + '이므로 ' + w + ' 모양은 ' + correct + '이에요.',
        };
      },
    },
  ],
});
})();
