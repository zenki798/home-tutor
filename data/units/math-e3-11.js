/* 3학년 수학 · 들이와 무게
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 눈금 있는 그릇(비커)과 바늘 저울은 아래 도우미가 직접 그린 svg. alt 는 눈금 값을 말하지 않는다(답이 드러나지 않게). */
(function () {
  // 들이를 'L·mL' 글자로: 1300 → '1 L 300 mL', 2000 → '2 L', 700 → '700 mL'
  function vol(ml) {
    var l = Math.floor(ml / 1000), r = ml % 1000;
    if (l === 0) return r + ' mL';
    return r === 0 ? l + ' L' : l + ' L ' + r + ' mL';
  }
  function txt(x, y, s, size, anchor) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 13) + '" text-anchor="' + (anchor || 'middle') + '" dominant-baseline="central" fill="currentColor">' + s + '</text>';
  }
  function r1(v) { return Math.round(v * 10) / 10; }

  // 눈금 있는 그릇 (물의 높이 level mL). max: 가장 위 눈금, step: 작은 눈금 한 칸, labelEvery: 몇 mL마다 글자를 쓸지
  function beaker(max, step, labelEvery, level) {
    var top = 30, bottom = 250, x1 = 40, x2 = 130, o = [];
    function y(v) { return r1(bottom - (v / max) * (bottom - top)); }
    o.push('<rect x="' + (x1 + 1) + '" y="' + y(level) + '" width="' + (x2 - x1 - 2) + '" height="' + r1(bottom - y(level)) + '" style="fill:var(--fig-1)" fill-opacity="0.35"/>');
    o.push('<line x1="' + (x1 + 1) + '" y1="' + y(level) + '" x2="' + (x2 - 1) + '" y2="' + y(level) + '" stroke-width="2" style="stroke:var(--fig-1)"/>');
    o.push('<path d="M' + x1 + ' 12L' + x1 + ' ' + bottom + 'L' + x2 + ' ' + bottom + 'L' + x2 + ' 12" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>');
    var d = '';
    for (var v = step; v <= max; v += step) {
      var big = v % labelEvery === 0;
      d += 'M' + x2 + ' ' + y(v) + 'L' + (x2 - (big ? 20 : 10)) + ' ' + y(v);
      if (big) o.push(txt(x2 + 8, y(v), vol(v), 13, 'start'));
    }
    o.push('<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="1.6"/>');
    return { type: 'svg', alt: '눈금이 있는 그릇에 물이 담겨 있는 그림', svg: '<svg viewBox="0 0 240 262">' + o.join('') + '</svg>' };
  }

  // 바늘 저울. max: 한 바퀴의 무게(g), minor: 작은 눈금 한 칸(g), labelEvery: 글자를 쓰는 간격(g),
  // kg: true 면 글자를 kg 으로(0, 1, 2 …), value: 바늘이 가리키는 무게(g)
  function dial(max, minor, labelEvery, kg, value) {
    var cx = 120, cy = 150, r = 100, o = [];
    function xy(len, v) {
      var a = (v / max) * 2 * Math.PI;
      return [r1(cx + len * Math.sin(a)), r1(cy - len * Math.cos(a))];
    }
    o.push('<rect x="50" y="6" width="140" height="12" rx="4" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="2"/>');
    o.push('<rect x="112" y="18" width="16" height="24" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="2"/>');
    o.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 6) + '" fill="currentColor" fill-opacity="0.04" stroke="currentColor" stroke-width="3"/>');
    var d = '';
    for (var v = 0; v < max; v += minor) {
      var len = v % labelEvery === 0 ? 14 : (v % (labelEvery / 2) === 0 ? 10 : 6);
      var p = xy(r, v), q = xy(r - len, v);
      d += 'M' + p[0] + ' ' + p[1] + 'L' + q[0] + ' ' + q[1];
      if (v % labelEvery === 0) {
        var t = xy(r - 30, v);
        o.push(txt(t[0], t[1], kg ? v / 1000 : v, 15));
      }
    }
    o.push('<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="1.5"/>');
    o.push(txt(cx, cy + 40, kg ? 'kg' : 'g', 16));
    var n = xy(r - 8, value), b = xy(-14, value);
    o.push('<line x1="' + b[0] + '" y1="' + b[1] + '" x2="' + n[0] + '" y2="' + n[1] + '" stroke-width="3" stroke-linecap="round" style="stroke:var(--fig-2)"/>');
    o.push('<circle cx="' + cx + '" cy="' + cy + '" r="6" fill="currentColor"/>');
    return { type: 'svg', alt: '눈금판과 바늘이 있는 저울 그림', svg: '<svg viewBox="0 0 240 262">' + o.join('') + '</svg>' };
  }

  // 'a L b mL' / 'a kg b g' 처럼 두 단위로 쓴 양. u = ['L', 'mL'] 또는 ['kg', 'g']
  function two(a, b, u) {
    if (a === 0) return b + ' ' + u[1];
    if (b === 0) return a + ' ' + u[0];
    return a + ' ' + u[0] + ' ' + b + ' ' + u[1];
  }

Tutor.registerUnit({
  id: 'math-e3-11',
  course: 'math-e3',
  title: '들이와 무게',
  summary: '들이 단위 L, mL와 무게 단위 kg, g, t을 알고, 들이와 무게를 어림하며 더하고 빼요.',
  goals: [
    '여러 가지 방법으로 그릇의 들이를 비교하고, 1 L와 1 mL를 알아 단위를 바꿀 수 있어요.',
    '들이를 어림하고, 들이의 덧셈과 뺄셈을 할 수 있어요.',
    '무게를 비교하고 1 kg, 1 g, 1 t을 알아 단위를 바꿀 수 있어요.',
    '무게를 어림하고, 무게의 덧셈과 뺄셈을 할 수 있어요.',
  ],
  standards: ['[4수03-17]', '[4수03-18]', '[4수03-19]', '[4수03-20]', '[4수03-21]', '[4수03-22]', '[4수03-23]'],

  concepts: [
    {
      title: '들이 비교하기',
      body: '그릇 안쪽에 담을 수 있는 양을 그 그릇의 **들이**라고 해요. 모양이 다른 두 그릇은 겉모습만 보고는 어느 쪽 들이가 더 많은지 알기 어려워요. 이럴 때는 물을 이용해 비교해요.\n\n1. 한 그릇에 물을 가득 채운 뒤 다른 그릇에 옮겨 담아요. 물이 넘치면 처음 그릇의 들이가 더 많아요.\n2. 두 그릇의 물을 모양과 크기가 같은 그릇에 각각 옮겨 담아 물의 높이를 비교해요.\n3. 두 그릇의 물을 크기가 같은 컵에 부어 몇 번 부었는지 세어요. 컵으로 더 많이 부은 그릇의 들이가 더 많아요.\n\n> ⚠️ 컵 수로 비교할 때는 **같은 컵**을 써야 해요. 컵의 크기가 다르면 컵 수만 보고 비교할 수 없어요.',
      easy: '물병과 주전자 중 어느 쪽에 물이 더 많이 들어갈까요? 물병에 물을 가득 채워 주전자에 부어 보세요.\n\n물이 넘치지 않고 주전자에 자리가 남으면 주전자의 들이가 더 많아요. 물이 넘치면 물병의 들이가 더 많고요.',
      check: {
        type: 'choice',
        q: '같은 컵으로 물을 부었더니 주전자는 6번, 물병은 4번 만에 가득 찼어요. 들이가 더 많은 것은 무엇일까요?',
        choices: ['주전자', '물병', '알 수 없어요.'],
        answer: 0,
        why: ['', '컵으로 더 적게 부은 쪽을 골랐어요. 컵으로 더 많이 부어야 찬 그릇에 물이 더 많이 들어가요.', '같은 컵으로 부었으니 컵 수로 비교할 수 있어요.'],
        explain: '같은 컵으로 주전자는 6번, 물병은 4번 부었으니 주전자에 컵 2개만큼 물이 더 들어가요. 들이가 더 많은 것은 주전자예요.',
      },
    },
    {
      title: '1 L와 1 mL, 들이 어림하기',
      body: '들이의 단위에는 **리터**와 **밀리리터**가 있어요. 1 리터는 **1 L**, 1 밀리리터는 **1 mL**라고 써요.\n\n**1 L = 1000 mL**\n\n1 L보다 300 mL 더 많은 들이는 **1 L 300 mL**라 쓰고 "1 리터 300 밀리리터"라고 읽어요. 1 L는 1000 mL이므로 1 L 300 mL는 **1300 mL**예요.\n\n들이를 자로 재듯 정확히 재지 않고 대강 짐작하는 것을 **어림한다**고 해요. 어림한 들이는 "약 2 L"처럼 **약**을 붙여 말해요.\n\n| 그릇 | 어림한 들이 |\n|---|---|\n| 작은 우유갑 | 약 200 mL |\n| 큰 우유갑 | 약 1 L |\n| 양동이 | 약 10 L |\n\n> 💡 적은 양(컵, 병)은 mL, 많은 양(양동이, 욕조)은 L로 나타내면 알맞아요.',
      easy: '큰 우유갑 하나에 든 우유가 약 1 L예요. 이 우유를 똑같이 1000개의 아주 작은 칸에 나누어 담는다고 생각해 보세요. 한 칸의 양이 1 mL예요.\n\n그래서 1 L에는 1 mL가 1000개 들어가요. 2 L에는 2000개가 들어가지요.',
      fig: beaker(1000, 100, 200, 600),
      check: {
        type: 'short', check: 'number', unit: 'mL',
        q: '2 L 400 mL는 몇 mL일까요?',
        answer: '2400',
        wrong: [
          { a: '240', why: '1 L를 100 mL로 생각했어요. 1 L는 1000 mL이므로 2 L는 2000 mL예요.' },
          { a: '402', why: 'L와 mL의 수를 그냥 더했어요. 2 L를 mL로 바꾼 뒤 400 mL를 더해요.' },
        ],
        explain: '1 L는 1000 mL이므로 2 L는 2000 mL예요. 2000 mL와 400 mL를 합하면 2400 mL예요.',
      },
    },
    {
      title: '들이의 덧셈과 뺄셈',
      body: '들이를 더하거나 뺄 때는 **L는 L끼리, mL는 mL끼리** 계산해요.\n\nmL끼리 더해 1000 mL가 되거나 넘으면 **1000 mL를 1 L로 받아올려요.**\n\n예: 2 L 700 mL + 1 L 500 mL\n- mL끼리: 700 mL + 500 mL = 1200 mL = 1 L 200 mL\n- L끼리: 2 L + 1 L = 3 L, 받아올린 1 L를 더하면 4 L\n- 답: **4 L 200 mL**\n\nmL끼리 뺄 수 없으면 **1 L를 1000 mL로 받아내려요.**\n\n예: 4 L 200 mL − 1 L 600 mL → 3 L 1200 mL − 1 L 600 mL = **2 L 600 mL**',
      easy: '세 자리 수의 덧셈에서 10이 모이면 윗자리로 올렸지요? 들이에서는 mL가 **1000**이 모이면 1 L로 올려요.\n\n뺄셈에서 mL가 모자라면 1 L를 1000 mL로 바꾸어 보태 줘요. 1 L를 빌려 왔으니 L는 하나 줄어요.',
      check: {
        type: 'choice',
        q: '1 L 800 mL + 2 L 400 mL는 얼마일까요?',
        choices: ['4 L 200 mL', '3 L 200 mL', '4 L 1200 mL'],
        answer: 0,
        why: ['', 'mL끼리 더한 1200 mL에서 1 L를 받아올렸는데, 그 1 L를 L에 더하지 않았어요.', '1 L를 받아올렸으면 1200 mL에서 1000 mL를 빼야 해요. 남는 것은 200 mL예요.'],
        explain: 'mL끼리 800 mL + 400 mL = 1200 mL = 1 L 200 mL예요. L끼리 1 L + 2 L = 3 L에 받아올린 1 L를 더하면 4 L예요. 답은 4 L 200 mL예요.',
      },
    },
    {
      title: '무게 비교하기와 1 kg, 1 g',
      body: '물건의 무거운 정도를 **무게**라고 해요. 두 물건의 무게는 이렇게 비교해요.\n\n1. 두 손에 하나씩 들어 봐요. 하지만 무게가 비슷하면 알기 어려워요.\n2. **양팔저울**에 올려요. 더 무거운 쪽이 아래로 내려가요.\n3. 바둑돌이나 클립처럼 무게가 같은 물건 몇 개와 무게가 같은지 세어요. 개수가 많을수록 더 무거워요.\n\n무게의 단위에는 **킬로그램**과 **그램**이 있어요. 1 킬로그램은 **1 kg**, 1 그램은 **1 g**이라고 써요.\n\n**1 kg = 1000 g**\n\n1 kg보다 500 g 더 무거운 무게는 **1 kg 500 g**이라 쓰고 "1 킬로그램 500 그램"이라고 읽어요. 1 kg 500 g은 **1500 g**이에요.\n\n> 💡 저울로 잴 때는 바늘이 가리키는 눈금을 읽어요. 그림의 저울은 1 kg까지 잴 수 있고, 작은 눈금 한 칸은 10 g이에요.',
      easy: '큰 우유갑 하나에 든 우유의 무게가 약 1 kg이에요. 작은 클립 한 개의 무게가 1 g쯤이고요.\n\n1 kg은 1 g짜리 클립 1000개를 모은 무게와 같아요. 그래서 1 kg = 1000 g이에요.',
      fig: dial(1000, 10, 100, false, 350),
      check: {
        type: 'short', check: 'number', unit: 'g',
        q: '3 kg 200 g은 몇 g일까요?',
        answer: '3200',
        wrong: [
          { a: '320', why: '1 kg을 100 g으로 생각했어요. 1 kg은 1000 g이므로 3 kg은 3000 g이에요.' },
          { a: '203', why: 'kg과 g의 수를 그냥 더했어요. 3 kg을 g으로 바꾼 뒤 200 g을 더해요.' },
        ],
        explain: '1 kg은 1000 g이므로 3 kg은 3000 g이에요. 3000 g과 200 g을 합하면 3200 g이에요.',
      },
    },
    {
      title: '1 t 알아보기와 무게 어림하기',
      body: '트럭이나 코끼리처럼 아주 무거운 것의 무게는 **톤**으로 나타내요. 1 톤은 **1 t**이라고 써요.\n\n**1 t = 1000 kg**\n\n2 t은 2000 kg이고, 1 t 300 kg은 1300 kg이에요. 짐을 1 t까지 실을 수 있는 트럭을 "1 t 트럭"이라고 불러요.\n\n> ⚠️ 1 t을 g으로 나타내면 수가 너무 커져요. 그래서 t은 kg과만 바꾸어 나타내요.\n\n자주 보는 물건의 무게를 기준으로 삼아 무게를 **어림**할 수 있어요.\n\n| 물건 | 어림한 무게 |\n|---|---|\n| 사과 한 개 | 약 300 g |\n| 3학년 어린이 | 약 30 kg |\n| 작은 자동차 | 약 1 t |\n\n> 💡 가벼운 물건은 g, 사람이나 큰 짐은 kg, 트럭이나 배처럼 아주 무거운 것은 t으로 나타내면 알맞아요.',
      easy: '몸무게가 약 50 kg인 어른 20명이 모이면 모두 약 1000 kg, 곧 1 t이에요. 작은 자동차 한 대의 무게가 그쯤 돼요.\n\n그래서 t은 사람 한 명이 아니라 "아주 많은 사람이나 큰 기계"의 무게를 나타낼 때 써요.',
      check: {
        type: 'choice',
        q: '무게를 t으로 나타내기에 가장 알맞은 것은 무엇일까요?',
        choices: ['버스', '수박', '책가방'],
        answer: 0,
        why: ['', '수박은 몇 kg쯤이라서 kg으로 나타내는 것이 알맞아요.', '책가방은 몇 kg쯤이라서 kg으로 나타내는 것이 알맞아요.'],
        explain: '버스는 아주 무거워서 몇 t쯤이에요. 그래서 t으로 나타내기 알맞아요. 수박과 책가방은 kg으로 나타내요.',
      },
    },
    {
      title: '무게의 덧셈과 뺄셈',
      body: '무게도 들이처럼 **kg은 kg끼리, g은 g끼리** 계산해요.\n\ng끼리 더해 1000 g이 되거나 넘으면 **1000 g을 1 kg으로 받아올려요.**\n\n예: 1 kg 600 g + 2 kg 700 g\n- g끼리: 600 g + 700 g = 1300 g = 1 kg 300 g\n- kg끼리: 1 kg + 2 kg = 3 kg, 받아올린 1 kg을 더하면 4 kg\n- 답: **4 kg 300 g**\n\ng끼리 뺄 수 없으면 **1 kg을 1000 g으로 받아내려요.**\n\n예: 5 kg 100 g − 2 kg 400 g → 4 kg 1100 g − 2 kg 400 g = **2 kg 700 g**',
      easy: '들이의 덧셈·뺄셈과 방법이 똑같아요. L 대신 kg, mL 대신 g을 쓰는 것만 달라요.\n\n1 g이 1000개 모이면 1 kg으로 올리고, g이 모자라면 1 kg을 1000 g으로 바꾸어 보태요.',
      check: {
        type: 'ox',
        q: '6 kg 300 g − 2 kg 500 g을 계산할 때 1 kg을 받아내리면 6 kg 300 g은 5 kg 1300 g이 돼요.',
        answer: true,
        explain: '6 kg에서 1 kg을 1000 g으로 바꾸어 g에 보태면 300 g + 1000 g = 1300 g, kg은 5 kg이 돼요. 그래서 5 kg 1300 g − 2 kg 500 g = 3 kg 800 g이에요.',
      },
    },
  ],

  examples: [
    {
      q: '물통에 물이 2 L 700 mL 들어 있어요. 여기에 물을 1 L 600 mL 더 부으면 물은 모두 몇 L 몇 mL가 될까요?',
      steps: [
        '모두 몇인지 구하니 덧셈을 해요: 2 L 700 mL + 1 L 600 mL',
        'mL끼리 더해요: 700 mL + 600 mL = 1300 mL. 1000 mL를 1 L로 받아올리면 1 L 300 mL예요.',
        'L끼리 더해요: 2 L + 1 L = 3 L, 받아올린 1 L를 더하면 4 L예요.',
      ],
      answer: '4 L 300 mL',
    },
    {
      q: '쌀 5 kg 100 g 중에서 2 kg 400 g으로 밥을 지었어요. 남은 쌀은 몇 kg 몇 g일까요?',
      steps: [
        '남은 양을 구하니 뺄셈을 해요: 5 kg 100 g − 2 kg 400 g',
        '100 g에서 400 g을 뺄 수 없으니 5 kg에서 1 kg을 1000 g으로 받아내려요: 4 kg 1100 g',
        'g끼리: 1100 g − 400 g = 700 g, kg끼리: 4 kg − 2 kg = 2 kg',
      ],
      answer: '2 kg 700 g',
    },
    {
      q: '무게가 1 t 400 kg인 트럭이 있어요. 이 트럭의 무게는 몇 kg일까요?',
      steps: [
        '1 t은 1000 kg이에요.',
        '1 t 400 kg은 1000 kg과 400 kg을 합한 것이에요.',
        '그래서 1400 kg이에요.',
      ],
      answer: '1400 kg',
    },
  ],

  terms: [
    { term: '들이', def: '그릇 안쪽에 담을 수 있는 양이에요. 들이의 단위에는 L와 mL가 있어요.' },
    { term: '리터(L)', def: '들이의 단위예요. 큰 우유갑 하나에 든 우유가 약 1 L예요. 1 L = 1000 mL예요.' },
    { term: '밀리리터(mL)', def: '들이의 단위예요. 1 L를 똑같이 1000으로 나눈 하나의 양이 1 mL예요.' },
    { term: '무게', def: '물건의 무거운 정도예요. 무게의 단위에는 g, kg, t이 있어요.' },
    { term: '킬로그램(kg)', def: '무게의 단위예요. 1 kg = 1000 g이에요. 사람의 몸무게는 kg으로 나타내요.' },
    { term: '그램(g)', def: '무게의 단위예요. 작은 클립 한 개의 무게가 1 g쯤이에요.' },
    { term: '톤(t)', def: '아주 무거운 것의 무게를 나타내는 단위예요. 1 t = 1000 kg이에요.' },
    { term: '양팔저울', def: '양쪽 접시에 물건을 올려 어느 쪽이 더 무거운지 비교하는 저울이에요. 무거운 쪽이 아래로 내려가요.' },
    { term: '어림', def: '정확히 재지 않고 들이나 무게를 대강 짐작하는 것이에요. "약 2 L", "약 300 g"처럼 말해요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '같은 컵으로 물을 부어 그릇을 가득 채웠어요. 가 그릇은 7번, 나 그릇은 9번, 다 그릇은 5번 부었어요. 들이가 가장 많은 그릇은 무엇일까요?',
      choices: ['나 그릇', '가 그릇', '다 그릇'],
      answer: 0,
      why: ['', '가 그릇은 7번으로, 9번 부은 나 그릇보다 적게 들어가요.', '컵으로 가장 적게 부은 그릇을 골랐어요. 가장 많이 부은 그릇의 들이가 가장 많아요.'],
      explain: '같은 컵으로 부었으니 컵으로 많이 부은 그릇일수록 들이가 많아요. 9번 부은 나 그릇의 들이가 가장 많아요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', unit: 'mL', concept: 1,
      q: '그릇에 담긴 물의 양은 몇 mL일까요?',
      fig: beaker(1000, 50, 200, 750),
      answer: '750',
      hint: '물의 높이 바로 아래에 있는 큰 눈금을 먼저 읽고, 작은 눈금이 몇 칸 더 있는지 세어 보세요.',
      wrong: [
        { a: '630', why: '작은 눈금 한 칸을 10 mL로 셌어요. 이 그릇은 큰 눈금 200 mL 사이가 4칸이라서 작은 눈금 한 칸이 50 mL예요.' },
        { a: '800', why: '물의 높이보다 위에 있는 눈금을 읽었어요. 물의 높이와 같은 높이의 눈금을 읽어요.' },
      ],
      explain: '큰 눈금 200 mL 사이가 작은 눈금 4칸이므로 작은 눈금 한 칸은 50 mL예요. 물의 높이는 600 mL에서 작은 눈금 3칸을 더 올라간 곳이므로 600 mL + 150 mL = 750 mL예요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '3 L 40 mL는 몇 mL일까요?',
      choices: ['3040 mL', '340 mL', '3400 mL', '43 mL'],
      answer: 0,
      why: ['', '3과 40을 붙여 썼어요. 3 L는 3000 mL이므로 3000 mL와 40 mL를 합해요.', '40 mL를 400 mL로 바꾸었어요. 40 mL는 그대로 40 mL예요.', 'L와 mL의 수를 그냥 더했어요. 3 L를 mL로 바꾸어야 해요.'],
      explain: '1 L는 1000 mL이므로 3 L는 3000 mL예요. 3000 mL와 40 mL를 합하면 3040 mL예요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 1,
      q: '들이를 mL로 나타내기에 가장 알맞은 것은 무엇일까요?',
      choices: ['요구르트 병', '욕조', '양동이', '수영장'],
      answer: 0,
      why: ['', '욕조에는 물이 아주 많이 들어가서 L로 나타내는 것이 알맞아요.', '양동이의 들이는 약 10 L라서 L로 나타내는 것이 알맞아요.', '수영장에는 물이 아주아주 많이 들어가서 L로 나타내요.'],
      explain: '요구르트 병처럼 작은 그릇의 들이는 mL로 나타내기 알맞아요. 욕조, 양동이, 수영장처럼 물이 많이 들어가는 것은 L로 나타내요.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 2,
      q: '3 L 400 mL + 2 L 300 mL = 5 L 700 mL예요.',
      answer: true,
      explain: 'L끼리 3 L + 2 L = 5 L, mL끼리 400 mL + 300 mL = 700 mL이므로 5 L 700 mL가 맞아요.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 3,
      q: '1 kg은 100 g과 같아요.',
      answer: false,
      explain: '1 kg은 1000 g과 같아요. 1 kg = 1000 g이에요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'number', unit: 'g', concept: 3,
      q: '저울의 바늘이 가리키는 무게는 몇 g일까요?',
      fig: dial(1000, 10, 100, false, 640),
      answer: '640',
      hint: '바늘 바로 앞의 숫자를 읽고, 작은 눈금이 몇 칸 더 있는지 세어 보세요. 작은 눈금 한 칸은 10 g이에요.',
      wrong: [
        { a: '600', why: '작은 눈금을 세지 않았어요. 600 g에서 작은 눈금 4칸을 더 갔어요.' },
        { a: '604', why: '작은 눈금 한 칸을 1 g으로 셌어요. 숫자 사이 100 g이 10칸으로 나뉘어 있으니 한 칸은 10 g이에요.' },
      ],
      explain: '숫자 사이(100 g)가 작은 눈금 10칸이므로 한 칸은 10 g이에요. 바늘은 600에서 4칸 더 간 곳을 가리키므로 600 g + 40 g = 640 g이에요.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 3,
      q: '저울에 수박을 올렸어요. 수박의 무게는 몇 kg 몇 g일까요? (작은 눈금 한 칸은 100 g이에요.)',
      fig: dial(4000, 100, 1000, true, 2300),
      choices: ['2 kg 300 g', '2 kg 30 g', '3 kg 300 g', '2 kg 3 g'],
      answer: 0,
      why: ['', '작은 눈금 한 칸을 10 g으로 셌어요. 이 저울은 작은 눈금 한 칸이 100 g이에요.', '바늘을 지나간 다음 숫자를 읽었어요. 바늘 바로 앞의 숫자 2를 읽어요.', '작은 눈금 한 칸을 1 g으로 셌어요. 한 칸은 100 g이에요.'],
      explain: '바늘은 2 kg에서 작은 눈금 3칸을 더 간 곳을 가리켜요. 한 칸이 100 g이므로 2 kg 300 g이에요.',
    },
    {
      id: 'p9', level: 1, type: 'choice', concept: 4,
      q: '코끼리 한 마리의 무게를 어림한 것으로 가장 알맞은 것은 무엇일까요?',
      choices: ['약 5 t', '약 5 kg', '약 5 g'],
      answer: 0,
      why: ['', '5 kg은 수박 한 통쯤의 무게예요. 코끼리는 훨씬 무거워요.', '5 g은 클립 몇 개의 무게예요. 코끼리는 아주 무거워요.'],
      explain: '코끼리는 자동차보다도 무거워서 t으로 나타내요. 약 5 t이 알맞아요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 2,
      q: '물이 5 L 200 mL 있었어요. 그중에서 1 L 700 mL로 화분에 물을 주었어요. 남은 물은 몇 L 몇 mL일까요?',
      choices: ['3 L 500 mL', '4 L 500 mL', '6 L 900 mL', '2 L 500 mL'],
      answer: 0,
      why: [
        '',
        '받아내리지 않고 700 mL에서 200 mL를 거꾸로 뺐거나, 받아내린 뒤 L를 1 줄이지 않았어요.',
        '남은 물을 구하는데 더했어요. 남은 양은 뺄셈으로 구해요.',
        'L를 두 번 줄였어요. 받아내림은 한 번만 해요.',
      ],
      hint: '200 mL에서 700 mL를 뺄 수 없으면 1 L를 1000 mL로 받아내려요.',
      explain: '200 mL에서 700 mL를 뺄 수 없으니 1 L를 받아내려요: 5 L 200 mL = 4 L 1200 mL\n\nmL끼리 1200 mL − 700 mL = 500 mL, L끼리 4 L − 1 L = 3 L이므로 3 L 500 mL예요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: 'g', concept: 5,
      q: '고구마가 담긴 상자의 무게가 3 kg 200 g이에요. 빈 상자의 무게는 450 g이에요. 고구마만의 무게는 몇 g일까요?',
      answer: '2750',
      hint: '전체 무게에서 빈 상자의 무게를 빼요. 3 kg 200 g을 g으로 바꾸어 보세요.',
      wrong: [
        { a: '3650', why: '빈 상자의 무게를 더했어요. 고구마만의 무게는 전체 무게에서 상자 무게를 빼서 구해요.' },
        { a: '3250', why: '200 g에서 450 g을 뺄 수 없어서 450 g에서 200 g을 거꾸로 뺐어요. 1 kg을 1000 g으로 받아내려 계산해요.' },
      ],
      explain: '3 kg 200 g은 3200 g이에요. 3200 g − 450 g = 2750 g이므로 고구마만의 무게는 2750 g(2 kg 750 g)이에요.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', unit: '상자', concept: 4,
      q: '짐을 1 t까지 실을 수 있는 트럭이 있어요. 한 상자의 무게가 100 kg인 짐을 이 트럭에 몇 상자까지 실을 수 있을까요?',
      answer: '10',
      hint: '1 t을 kg으로 바꾸어 보세요.',
      wrong: [
        { a: '1', why: '1 t을 100 kg으로 생각했어요. 1 t은 1000 kg이에요.' },
        { a: '100', why: '1 t을 10000 kg으로 생각했어요. 1 t은 1000 kg이에요.' },
      ],
      explain: '1 t은 1000 kg이에요. 100 kg이 10개 모이면 1000 kg이므로 10상자까지 실을 수 있어요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '가 그릇은 큰 컵으로 4번, 나 그릇은 작은 컵으로 6번 부어서 가득 채웠어요. 큰 컵 하나의 물은 작은 컵으로 2번 부은 양과 같아요. 들이에 대해 바르게 말한 것은 무엇일까요?',
      choices: ['가 그릇이 작은 컵 2번만큼 더 많아요.', '나 그릇이 작은 컵 2번만큼 더 많아요.', '두 그릇의 들이가 같아요.', '가 그릇이 작은 컵 4번만큼 더 많아요.'],
      answer: 0,
      why: [
        '',
        '컵의 크기가 다른데 컵 수(4번, 6번)만 비교했어요. 같은 컵으로 바꾸어 세어 보세요.',
        '큰 컵 4번을 작은 컵으로 바꾸면 8번이에요. 6번과 같지 않아요.',
        '큰 컵 4번을 작은 컵으로 바꾸면 8번이에요. 8번과 6번의 차를 다시 세어 보세요.',
      ],
      hint: '큰 컵으로 부은 양을 작은 컵으로 몇 번인지 바꾸어 보세요.',
      explain: '큰 컵 하나가 작은 컵 2번이므로 큰 컵 4번은 작은 컵 8번이에요. 가 그릇은 작은 컵 8번, 나 그릇은 작은 컵 6번이므로 가 그릇이 작은 컵 2번만큼 더 많아요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '양팔저울로 무게를 비교했더니 사과 1개는 귤 3개와 무게가 같고, 귤 1개는 바둑돌 10개와 무게가 같았어요. 사과 1개는 바둑돌 몇 개와 무게가 같을까요?',
      answer: '30',
      hint: '사과 1개를 귤로 바꾼 다음, 귤을 바둑돌로 바꾸어 보세요.',
      wrong: [
        { a: '13', why: '3과 10을 더했어요. 귤 3개가 각각 바둑돌 10개이므로 10씩 3번 더해요.' },
        { a: '10', why: '귤 1개의 무게만 바둑돌로 바꾸었어요. 사과는 귤 3개와 같아요.' },
      ],
      explain: '사과 1개 = 귤 3개이고, 귤 1개 = 바둑돌 10개예요. 그래서 사과 1개는 바둑돌 10개씩 3묶음과 같아요. $10 \\times 3 = 30$이므로 바둑돌 30개예요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '무게가 1 kg 400 g인 멜론의 무게를 세 사람이 어림했어요. 민수는 1 kg 300 g, 지아는 1550 g, 서준은 1 kg 600 g이라고 했어요. 실제 무게에 가장 가깝게 어림한 사람은 누구일까요?',
      choices: ['민수', '지아', '서준'],
      answer: 0,
      why: [
        '',
        '지아가 어림한 1550 g은 1 kg 550 g이에요. 실제 무게와 150 g 차이가 나서 민수(100 g 차이)보다 멀어요.',
        '서준이 어림한 1 kg 600 g은 실제 무게와 200 g 차이가 나요. 민수(100 g 차이)보다 멀어요.',
      ],
      hint: '단위를 g으로 맞춘 뒤, 실제 무게와의 차이를 각각 구해 보세요.',
      explain: '모두 g으로 바꾸면 실제 무게는 1400 g, 민수 1300 g, 지아 1550 g, 서준 1600 g이에요. 차이는 민수 100 g, 지아 150 g, 서준 200 g이므로 민수가 가장 가깝게 어림했어요.',
    },
    {
      id: 'a4', level: 3, type: 'order', concept: 3,
      q: '무게가 무거운 것부터 차례대로 놓으세요.',
      choices: ['3010 g', '2 kg 900 g', '2700 g', '2 kg 80 g'],
      answer: [0, 1, 2, 3],
      hint: '모두 g으로 바꾸어 비교해 보세요.',
      explain: '모두 g으로 바꾸면 3010 g, 2 kg 900 g = 2900 g, 2700 g, 2 kg 80 g = 2080 g이에요. 무거운 것부터 놓으면 3010 g, 2 kg 900 g, 2700 g, 2 kg 80 g이에요.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'number', unit: 'mL', concept: 2,
      q: '가 물통에는 물이 3 L 400 mL, 나 물통에는 1 L 800 mL 들어 있어요. 가 물통의 물을 나 물통으로 옮겨 두 물통의 물의 양을 같게 하려면 몇 mL를 옮겨야 할까요?',
      answer: '800',
      hint: '두 물통의 물의 양의 차를 먼저 구해 보세요. 차만큼 다 옮기면 어떻게 될까요?',
      wrong: [
        { a: '1600', why: '차만큼 다 옮기면 이번에는 나 물통이 1600 mL 더 많아져요. 차의 반만 옮겨야 같아져요.' },
        { a: '5200', why: '두 물통의 물을 모두 더했어요. 옮길 양은 두 물통의 차를 이용해서 구해요.' },
      ],
      explain: '두 물통의 차는 3 L 400 mL − 1 L 800 mL = 1 L 600 mL, 곧 1600 mL예요. 가 물통에서 덜어 낸 만큼 나 물통이 늘어나므로 차의 반을 옮기면 같아져요. 1600 mL는 100 mL가 16개이고, 그 반은 100 mL가 8개인 800 mL예요.\n\n(확인: 가 물통 3400 mL − 800 mL = 2600 mL, 나 물통 1800 mL + 800 mL = 2600 mL)',
    },
    {
      id: 'a6', level: 3, type: 'short', check: 'number', unit: 'kg', concept: 4,
      q: '무게가 3 t까지인 차만 지나갈 수 있는 다리가 있어요. 빈 트럭의 무게는 2 t이고, 지금 짐을 800 kg 실었어요. 이 트럭이 다리를 지나가려면 짐을 몇 kg까지 더 실을 수 있을까요?',
      answer: '200',
      hint: 't을 kg으로 바꾸어 생각해 보세요. 지금 트럭과 짐의 무게는 모두 몇 kg일까요?',
      wrong: [
        { a: '1000', why: '이미 실은 짐 800 kg을 빠뜨렸어요. 빈 트럭과 짐의 무게를 합한 2800 kg에서 생각해요.' },
        { a: '2200', why: '3 t − 800 kg을 계산했어요. 빈 트럭의 무게 2 t도 함께 생각해야 해요.' },
      ],
      explain: '3 t은 3000 kg, 2 t은 2000 kg이에요. 지금 트럭과 짐의 무게는 2000 kg + 800 kg = 2800 kg이에요. 3000 kg − 2800 kg = 200 kg이므로 짐을 200 kg까지 더 실을 수 있어요.',
    },
  ],

  deeper: [
    {
      title: '물 1 L의 무게는 약 1 kg',
      body: '들이와 무게는 다른 것이지만, 물에서는 둘 사이에 재미있는 관계가 있어요. 물 1 L의 무게는 **약 1 kg**이고, 물 1 mL의 무게는 **약 1 g**이에요.\n\n그래서 2 L짜리 물병에 물을 가득 채우면 물만 약 2 kg이에요. 물이 아닌 기름이나 꿀은 같은 1 L라도 무게가 달라요.\n\n> 💡 들이가 같아도 무엇을 담았는지에 따라 무게는 달라질 수 있어요.',
    },
    {
      title: '킬로와 밀리는 무슨 뜻일까?',
      body: '단위 이름 앞의 **킬로(k)**는 "1000배"라는 뜻이에요. 1 km는 1000 m, 1 kg은 1000 g이지요.\n\n**밀리(m)**는 "1000으로 똑같이 나눈 하나"라는 뜻이에요. 1 L를 1000으로 나눈 하나가 1 mL, 1 m를 1000으로 나눈 하나가 1 mm예요.\n\n이렇게 앞에 붙는 말의 뜻을 알면 처음 보는 단위도 짐작할 수 있어요.',
    },
  ],

  faq: [
    {
      q: '리터는 왜 대문자 L로 써요?',
      a: '소문자 l은 숫자 1과 모양이 비슷해서 헷갈리기 쉬워요. 그래서 리터는 대문자 L로 많이 써요. 밀리리터도 mL처럼 L를 대문자로 써요.',
    },
    {
      q: 't을 g으로는 왜 안 바꿔요?',
      a: '1 t은 1000 kg이고 1 kg은 1000 g이라서, 1 t을 g으로 나타내면 아주 큰 수가 돼요. 그래서 3학년에서는 t은 kg과만 바꾸어 나타내요.\n\n무거운 것은 t과 kg, 가벼운 것은 kg과 g으로 나타내면 알아보기 쉬워요.',
    },
    {
      q: '들이와 무게는 뭐가 달라요?',
      a: '들이는 그릇에 **얼마나 담을 수 있는지**, 무게는 물건이 **얼마나 무거운지**예요. 같은 컵에 물과 솜을 가득 담으면 들이는 같지만 무게는 물이 훨씬 무거워요.\n\n들이는 L, mL로, 무게는 t, kg, g으로 나타내요.',
    },
  ],

  mistakes: [
    '2 L 50 mL를 250 mL로 쓰는 실수 — 2 L는 2000 mL이므로 2050 mL예요.',
    'mL끼리 더해 1000 mL가 넘었는데 받아올리지 않는 실수 — 1000 mL는 1 L로, 1000 g은 1 kg으로 받아올려요.',
    '뺄셈에서 받아내림을 하고 L나 kg을 하나 줄이지 않는 실수 — 1 L를 1000 mL로 빌려 왔으면 L는 1 줄어요.',
  ],

  gens: [
    {
      id: 'unit-convert',
      level: 1,
      title: '들이·무게 단위 바꾸기 (L와 mL, kg과 g, t과 kg)',
      make: function (R) {
        var v = R.int(0, 5);
        var kind = Math.floor(v / 2);
        var u = [['L', 'mL'], ['kg', 'g'], ['t', 'kg']][kind];
        var concept = [1, 3, 4][kind];
        var a = R.int(1, 9);
        var b = R.pick([R.int(1, 9) * 100, R.int(11, 99) * 10, R.int(1, 9) * 10]);
        var n = a * 1000 + b;
        var big = a * 1000;
        function J(x, pair) { return R.josa(x, pair); }
        if (v % 2 === 0) {
          var wrong = [{ a: String(a + b), why: u[0] + J(u[0], '과/와') + ' ' + u[1] + '의 수를 그냥 더했어요. ' + a + ' ' + u[0] + J(u[0], '을/를') + ' ' + u[1] + J(u[1], '으로/로') + ' 바꾼 뒤 ' + b + ' ' + u[1] + J(u[1], '을/를') + ' 더해요.' }];
          if (b < 100) wrong.push({ a: String(a) + String(b), why: a + J(a, '과/와') + ' ' + b + J(b, '을/를') + ' 붙여 썼어요. ' + a + ' ' + u[0] + J(u[0], '은/는') + ' ' + big + ' ' + u[1] + '이므로 ' + big + ' ' + u[1] + J(u[1], '과/와') + ' ' + b + ' ' + u[1] + J(u[1], '을/를') + ' 합해요.' });
          else wrong.push({ a: String(a * 100 + b), why: '1 ' + u[0] + J(u[0], '을/를') + ' 100 ' + u[1] + J(u[1], '으로/로') + ' 생각했어요. 1 ' + u[0] + J(u[0], '은/는') + ' 1000 ' + u[1] + J(u[1], '이에요/예요') + '.' });
          return {
            type: 'short', check: 'number', unit: u[1], concept: concept,
            q: two(a, b, u) + J(u[1], '은/는') + ' 몇 ' + u[1] + '일까요?',
            answer: String(n),
            wrong: wrong,
            explain: (a === 1 ? '1 ' + u[0] + J(u[0], '은/는') + ' 1000 ' + u[1] + J(u[1], '이에요/예요') + '.' : '1 ' + u[0] + J(u[0], '은/는') + ' 1000 ' + u[1] + '이므로 ' + a + ' ' + u[0] + J(u[0], '은/는') + ' ' + big + ' ' + u[1] + J(u[1], '이에요/예요') + '.') +
              ' 여기에 ' + b + ' ' + u[1] + J(u[1], '을/를') + ' 더하면 ' + n + ' ' + u[1] + J(u[1], '이에요/예요') + '.',
          };
        }
        return {
          type: 'short', check: 'number', concept: concept,
          q: '[[?]] 안에 알맞은 수를 쓰세요.\n\n' + n + ' ' + u[1] + ' = [[?]] ' + u[0] + ' ' + b + ' ' + u[1],
          answer: String(a),
          wrong: [{ a: String(big), why: big + ' ' + u[1] + J(u[1], '을/를') + ' ' + u[0] + J(u[0], '으로/로') + ' 바꾸지 않았어요. 1000 ' + u[1] + J(u[1], '이/가') + ' 1 ' + u[0] + '이므로 ' + big + ' ' + u[1] + J(u[1], '은/는') + ' ' + a + ' ' + u[0] + J(u[0], '이에요/예요') + '.' }],
          explain: n + ' ' + u[1] + J(u[1], '은/는') + ' ' + big + ' ' + u[1] + J(u[1], '과/와') + ' ' + b + ' ' + u[1] + J(u[1], '을/를') + ' 합한 것이에요. ' + (a === 1 ? '1000 ' + u[1] + J(u[1], '은/는') + ' 1 ' + u[0] + J(u[0], '이에요/예요') + '.' : '1000 ' + u[1] + J(u[1], '이/가') + ' 1 ' + u[0] + '이므로 ' + big + ' ' + u[1] + J(u[1], '은/는') + ' ' + a + ' ' + u[0] + J(u[0], '이에요/예요') + '.') + ' 그래서 ' + n + ' ' + u[1] + ' = ' + two(a, b, u) + J(u[1], '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'read-measure',
      level: 1,
      title: '그릇의 눈금과 저울의 눈금 읽기',
      make: function (R) {
        // [max, 작은 눈금, 글자 간격, kg 글자?, 그릇?]
        var modes = [
          [500, 50, 100, false, true],
          [2000, 100, 500, false, true],
          [1000, 50, 100, false, false],
          [1000, 10, 100, false, false],
          [4000, 100, 1000, true, false],
        ];
        var m = R.pick(modes);
        var max = m[0], step = m[1], every = m[2], cup = m[4];
        var val = R.int(every / step, max / step - 1) * step; // 첫 글자 눈금 위에서 고른다
        var base = Math.floor(val / every) * every;
        var k = (val - base) / step;
        var unit = cup ? 'mL' : 'g';
        var fig = cup ? beaker(max, step, every, val) : dial(max, step, every, m[3], val);
        var baseName = cup ? vol(base) : (m[3] ? (base / 1000) + ' kg' : base + ' g');
        var wrong = [];
        if (val + step < max) wrong.push({ a: String(val + step), why: '작은 눈금을 한 칸 더 셌어요. 작은 눈금 한 칸은 ' + step + ' ' + unit + R.josa(unit, '이에요/예요') + '.' });
        if (val - step > 0) wrong.push({ a: String(val - step), why: '작은 눈금을 한 칸 덜 셌어요. 작은 눈금 한 칸은 ' + step + ' ' + unit + R.josa(unit, '이에요/예요') + '.' });
        if (k > 0) {
          var guess = step === 10 ? 1 : 10;
          wrong.push({ a: String(base + k * guess), why: '작은 눈금 한 칸을 ' + guess + ' ' + unit + R.josa(unit, '으로/로') + ' 셌어요. 이 ' + (cup ? '그릇' : '저울') + '의 작은 눈금 한 칸은 ' + step + ' ' + unit + R.josa(unit, '이에요/예요') + '.' });
        }
        var first = '글자가 있는 눈금 사이를 보면 작은 눈금 한 칸은 ' + step + ' ' + unit + R.josa(unit, '이에요/예요') + '. ';
        var place = cup ? '물의 높이는 ' : '바늘은 ';
        var went = cup ? '칸을 더 올라간 곳이에요.' : '칸을 더 간 곳이에요.';
        var where = k === 0
          ? place + baseName + ' 눈금과 같아요.'
          : place + baseName + '에서 작은 눈금 ' + k + went;
        var sum = k === 0 ? '' : ' ' + base + ' ' + unit + ' + ' + (k * step) + ' ' + unit + ' = ' + val + ' ' + unit + R.josa(unit, '이에요/예요') + '.';
        var tail = ' 답은 ' + (val >= 1000 ? (cup ? vol(val) : two(Math.floor(val / 1000), val % 1000, ['kg', 'g'])) + ', 곧 ' : '') + val + ' ' + unit + R.josa(unit, '이에요/예요') + '.';
        return {
          type: 'short', check: 'number', unit: unit, concept: cup ? 1 : 3,
          q: cup ? '그릇에 담긴 물의 양은 몇 mL일까요?' : '저울의 바늘이 가리키는 무게는 몇 g일까요?',
          fig: fig,
          answer: String(val),
          wrong: wrong,
          explain: first + where + sum + tail,
        };
      },
    },
    {
      id: 'add-sub',
      level: 2,
      title: '받아올림·받아내림이 있는 들이와 무게의 덧셈과 뺄셈',
      make: function (R) {
        var weight = R.bool();
        var u = weight ? ['kg', 'g'] : ['L', 'mL'];
        var add = R.bool();
        var a1, a2, b1, b2, A, B, correct, cands, q, explain;
        function T(a, b) { return two(a, b, u); }
        function J(x, pair) { return R.josa(x, pair); }
        var one = '1 ' + u[0] + J(u[0], '을/를');
        if (add) {
          a1 = R.int(1, 6); a2 = R.int(1, 5);
          do { b1 = R.int(2, 19) * 50; b2 = R.int(2, 19) * 50; } while (b1 + b2 <= 1000);
          var S = b1 + b2;
          A = a1 + a2 + 1; B = S - 1000;
          correct = T(A, B);
          cands = [
            [T(a1 + a2, B), u[1] + '끼리 더해 1000 ' + u[1] + J(u[1], '이/가') + ' 넘었을 때 받아올린 ' + one + ' ' + u[0] + '에 더하지 않았어요.'],
            [T(A, S), one + ' 받아올렸으면 ' + S + ' ' + u[1] + '에서 1000 ' + u[1] + J(u[1], '을/를') + ' 빼야 해요.'],
            [T(A + 1, B), '받아올린 ' + one + ' 두 번 더했어요. 받아올림은 한 번이에요.'],
            [T(A, B <= 800 ? B + 100 : B - 100), u[1] + '끼리 더한 값을 다시 계산해 보세요.'],
          ];
          if (weight) q = '감자 ' + T(a1, b1) + J(u[1], '과/와') + ' 고구마 ' + T(a2, b2) + J(u[1], '을/를') + ' 함께 저울에 올렸어요. 모두 몇 kg 몇 g일까요?';
          else q = '물통에 물이 ' + T(a1, b1) + ' 들어 있어요. 여기에 물을 ' + T(a2, b2) + ' 더 부으면 물은 모두 몇 L 몇 mL가 될까요?';
          explain = u[1] + '끼리 더하면 ' + b1 + ' ' + u[1] + ' + ' + b2 + ' ' + u[1] + ' = ' + S + ' ' + u[1] + J(u[1], '이에요/예요') + '. 1000 ' + u[1] + J(u[1], '은/는') + ' 1 ' + u[0] + '이므로 ' + S + ' ' + u[1] + ' = ' + T(1, B) + J(u[1], '으로/로') + ' 받아올려요.\n\n' +
            u[0] + '끼리 더하면 ' + a1 + ' ' + u[0] + ' + ' + a2 + ' ' + u[0] + ' = ' + (a1 + a2) + ' ' + u[0] + ', 받아올린 ' + one + ' 더하면 ' + A + ' ' + u[0] + J(u[0], '이에요/예요') + '. 답은 ' + correct + J(u[1], '이에요/예요') + '.';
        } else {
          a1 = R.int(4, 9); a2 = R.int(1, a1 - 2);
          do { b1 = R.int(1, 17) * 50; b2 = R.int(b1 / 50 + 1, 19) * 50; } while (b2 - b1 === 500);
          A = a1 - a2 - 1; B = b1 + 1000 - b2;
          correct = T(A, B);
          cands = [
            [T(a1 - a2, b2 - b1), u[1] + '끼리 뺄 수 없어서 ' + b2 + ' ' + u[1] + '에서 ' + b1 + ' ' + u[1] + J(u[1], '을/를') + ' 거꾸로 뺐어요. ' + one + ' 1000 ' + u[1] + J(u[1], '으로/로') + ' 받아내려요.'],
            [T(a1 - a2, B), one + ' 받아내렸으면 ' + u[0] + J(u[0], '을/를') + ' 1 줄여야 해요.'],
            [T(A, b2 - b1), u[0] + J(u[0], '은/는') + ' 맞게 줄였지만 ' + u[1] + '끼리 거꾸로 뺐어요.'],
            [T(A, B <= 800 ? B + 100 : B - 100), u[1] + '끼리 뺀 값을 다시 계산해 보세요.'],
            [T(A - 1, B), u[0] + J(u[0], '을/를') + ' 두 번 줄였어요. 받아내림은 한 번이에요.'],
          ];
          if (weight) q = '쌀 ' + T(a1, b1) + ' 중에서 ' + T(a2, b2) + J(u[1], '을/를') + ' 덜어 냈어요. 남은 쌀은 몇 kg 몇 g일까요?';
          else q = '주스가 ' + T(a1, b1) + ' 있었어요. 그중에서 ' + T(a2, b2) + J(u[1], '을/를') + ' 마셨어요. 남은 주스는 몇 L 몇 mL일까요?';
          explain = b1 + ' ' + u[1] + '에서 ' + b2 + ' ' + u[1] + J(u[1], '을/를') + ' 뺄 수 없으니 ' + one + ' 1000 ' + u[1] + J(u[1], '으로/로') + ' 받아내려요. ' + T(a1, b1) + ' = ' + T(a1 - 1, b1 + 1000) + '\n\n' +
            u[1] + '끼리 ' + (b1 + 1000) + ' ' + u[1] + ' − ' + b2 + ' ' + u[1] + ' = ' + B + ' ' + u[1] + ', ' + u[0] + '끼리 ' + (a1 - 1) + ' ' + u[0] + ' − ' + a2 + ' ' + u[0] + ' = ' + A + ' ' + u[0] + J(u[0], '이에요/예요') + '. 답은 ' + correct + J(u[1], '이에요/예요') + '.';
        }
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: weight ? 5 : 2,
          q: q,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: explain,
        };
      },
    },
    {
      id: 'find-start',
      level: 3,
      title: '거꾸로 생각하여 처음 양 구하기',
      make: function (R) {
        var weight = R.bool();
        var u = weight ? ['kg', 'g'] : ['L', 'mL'];
        function T(a, b) { return two(a, b, u); }
        function J(x, pair) { return R.josa(x, pair); }
        var a0 = R.int(1, 4), b0 = R.int(2, 19) * 50;
        var a2 = R.int(1, 4);
        var b2 = R.int(Math.floor((1000 - b0) / 50) + 1, 19) * 50; // b0 + b2 > 1000: 거꾸로 뺄 때 받아내림이 생긴다
        var first = a0 * 1000 + b0, added = a2 * 1000 + b2, total = first + added;
        var tA = Math.floor(total / 1000), tB = total % 1000;
        var q = weight
          ? '바구니에 사과가 담겨 있었어요. 여기에 귤 ' + T(a2, b2) + J(u[1], '을/를') + ' 더 담았더니 전체 무게가 ' + T(tA, tB) + J(u[1], '이/가') + ' 되었어요. 귤을 담기 전 사과가 담긴 바구니의 무게는 몇 g일까요?'
          : '물통에 물이 얼마간 들어 있었어요. 여기에 물을 ' + T(a2, b2) + ' 더 부었더니 물이 모두 ' + T(tA, tB) + J(u[1], '이/가') + ' 되었어요. 처음 물통에 들어 있던 물은 몇 mL일까요?';
        var wrong = [
          { a: String(total + added), why: '더한 양을 한 번 더 더했어요. 처음 양은 전체 양에서 더한 양을 빼서 구해요.' },
          { a: String((tA - a2) * 1000 + (b2 - tB)), why: u[1] + '끼리 뺄 수 없어서 ' + b2 + ' ' + u[1] + '에서 ' + tB + ' ' + u[1] + J(u[1], '을/를') + ' 거꾸로 뺐어요. 1 ' + u[0] + J(u[0], '을/를') + ' 받아내려 계산해요.' },
        ];
        if (first + 1000 !== (tA - a2) * 1000 + (b2 - tB)) wrong.push(
          { a: String(first + 1000), why: '1 ' + u[0] + J(u[0], '을/를') + ' 받아내린 뒤 ' + u[0] + J(u[0], '을/를') + ' 1 줄이지 않았어요.' });
        return {
          type: 'short', check: 'number', unit: u[1], concept: weight ? 5 : 2,
          q: q,
          answer: String(first),
          hint: '처음 양에 더한 양을 더하면 전체 양이 돼요. 거꾸로 생각하면 처음 양은 어떻게 구할까요?',
          wrong: wrong,
          explain: '처음 양에 ' + T(a2, b2) + J(u[1], '을/를') + ' 더해서 ' + T(tA, tB) + J(u[1], '이/가') + ' 되었으니, 처음 양은 ' + T(tA, tB) + ' − ' + T(a2, b2) + J(u[1], '으로/로') + ' 구해요.\n\n' +
            tB + ' ' + u[1] + '에서 ' + b2 + ' ' + u[1] + J(u[1], '을/를') + ' 뺄 수 없으니 1 ' + u[0] + J(u[0], '을/를') + ' 받아내려요: ' + T(tA - 1, tB + 1000) + '\n\n' +
            u[1] + '끼리 ' + (tB + 1000) + ' − ' + b2 + ' = ' + b0 + ', ' + u[0] + '끼리 ' + (tA - 1) + ' − ' + a2 + ' = ' + a0 + '이므로 처음 양은 ' + T(a0, b0) + ', 곧 ' + first + ' ' + u[1] + J(u[1], '이에요/예요') + '.',
        };
      },
    },
  ],
});
})();
