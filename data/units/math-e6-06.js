/* 6학년 수학 · 직육면체의 겉넓이와 부피
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 직육면체는 cuboid, 쌓기나무(1 cm³)로 채운 모양은 아래 도우미가 직접 그린 svg */
(function () {
  // 쌓기나무로 빈틈없이 채운 직육면체: 가로 nx개, 세로(앞뒤) ny개, 높이 nz개
  function unitBox(nx, ny, nz, alt) {
    var s = 30, dx = 13, dy = 11, body = '';
    var W = nx * s + ny * dx + 20, H = nz * s + ny * dy + 20, ox = 10, base = H - 10;
    var st = '" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>';
    for (var y = ny - 1; y >= 0; y--) {
      for (var z = 0; z < nz; z++) {
        for (var x = 0; x < nx; x++) {
          var X = ox + x * s + y * dx, Y = base - (z + 1) * s - y * dy;
          body += '<polygon points="' + X + ',' + (Y + s) + ' ' + X + ',' + Y + ' ' + (X + dx) + ',' + (Y - dy) + ' ' + (X + s + dx) + ',' + (Y - dy) + ' ' + (X + s + dx) + ',' + (Y + s - dy) + ' ' + (X + s) + ',' + (Y + s) + '" fill="var(--surface, #fff)"/>';  // 뒤의 쌓기나무가 비쳐 보이지 않게 불투명한 바탕
          body += '<rect x="' + X + '" y="' + Y + '" width="' + s + '" height="' + s + '" fill="var(--fig-1)" fill-opacity="0.3' + st;
          body += '<polygon points="' + X + ',' + Y + ' ' + (X + dx) + ',' + (Y - dy) + ' ' + (X + s + dx) + ',' + (Y - dy) + ' ' + (X + s) + ',' + Y + '" fill="var(--fig-1)" fill-opacity="0.6' + st;
          body += '<polygon points="' + (X + s) + ',' + Y + ' ' + (X + s + dx) + ',' + (Y - dy) + ' ' + (X + s + dx) + ',' + (Y + s - dy) + ' ' + (X + s) + ',' + (Y + s) + '" fill="var(--fig-1)" fill-opacity="0.45' + st;
        }
      }
    }
    var VW = Math.max(W, 200);
    return { type: 'svg', svg: '<svg viewBox="' + (-(VW - W) / 2) + ' 0 ' + VW + ' ' + H + '">' + body + '</svg>', alt: alt };
  }
  function box(w, d, h, unit) {
    unit = unit || 'cm';
    return { type: 'cuboid', w: w, h: h, d: d, labels: { w: w + unit, h: h + unit, d: d + unit },
      alt: '가로 ' + w + unit + ', 세로 ' + d + unit + ', 높이 ' + h + unit + '인 직육면체' };
  }
  function uniq(ans, list) {
    var seen = {}, out = [];
    seen[String(ans)] = 1;
    list.forEach(function (w) { if (!seen[String(w.a)]) { seen[String(w.a)] = 1; out.push(w); } });
    return out;
  }

Tutor.registerUnit({
  id: 'math-e6-06',
  course: 'math-e6',
  title: '직육면체의 겉넓이와 부피',
  summary: '직육면체와 정육면체의 겉넓이를 구하고, 부피 단위 1cm³, 1m³를 알아 부피를 구해요.',
  goals: [
    '직육면체와 정육면체의 겉넓이를 여러 가지 방법으로 구할 수 있어요.',
    '부피의 단위 1 cm³와 1 m³를 알고, 둘 사이의 관계를 설명할 수 있어요.',
    '직육면체와 정육면체의 부피를 구하는 방법을 알고 부피를 구할 수 있어요.',
  ],
  standards: ['[6수03-17]', '[6수03-18]', '[6수03-19]'],

  concepts: [
    {
      title: '직육면체의 겉넓이',
      body: '직육면체의 **겉넓이**는 여섯 면의 넓이를 모두 더한 것이에요.\n\n직육면체에서 마주 보는 두 면은 모양과 크기가 같아요(합동). 그래서 한 꼭짓점에서 만나는 **세 면의 넓이를 더한 뒤 2배** 하면 돼요.\n\n(겉넓이) = (가로×세로 + 세로×높이 + 가로×높이) × 2\n\n예: 가로 5 cm, 세로 4 cm, 높이 3 cm이면\n$(5 \\times 4+4 \\times 3+5 \\times 3) \\times 2=(20+12+15) \\times 2=94$ (cm²)\n\n> 💡 전개도로 생각할 수도 있어요. 옆면 네 개를 이어 붙이면 가로가 **밑면의 둘레**, 세로가 **높이**인 직사각형이 돼요. (겉넓이) = (한 밑면의 넓이)×2 + (밑면의 둘레)×(높이)',
      easy: '선물 상자를 포장지로 빈틈없이 싸는 데 드는 종이의 넓이가 겉넓이예요.\n\n상자에는 위·아래, 앞·뒤, 왼쪽·오른쪽 면이 짝을 이루어 있어요. 짝끼리는 크기가 같으니 위, 앞, 오른쪽 세 면만 구해서 더한 다음 두 배 하면 여섯 면을 모두 더한 것과 같아요.',
      fig: box(5, 4, 3),
      check: {
        type: 'choice',
        q: '직육면체의 겉넓이는 무엇을 모두 더한 것일까요?',
        choices: ['여섯 면의 넓이', '한 꼭짓점에서 만나는 세 면의 넓이', '모든 모서리의 길이'],
        answer: 0,
        why: ['', '세 면의 넓이만 더하면 겉넓이의 절반이에요. 마주 보는 면까지 더해야 하니 2배 해요.', '모서리의 길이를 더한 것은 넓이가 아니에요. 겉넓이는 면의 넓이를 더해요.'],
        explain: '겉넓이는 겉을 둘러싼 여섯 면의 넓이를 모두 더한 것이에요. 세 면의 넓이의 합을 2배 해도 같아요.',
      },
    },
    {
      title: '정육면체의 겉넓이',
      body: '**정육면체**는 여섯 면이 모두 크기가 같은 정사각형이에요. 그래서\n\n(정육면체의 겉넓이) = (한 면의 넓이) × 6 = (한 모서리) × (한 모서리) × 6\n\n예: 한 모서리가 3 cm인 정육면체의 겉넓이는 $3 \\times 3 \\times 6=54$ (cm²)예요.',
      easy: '주사위를 떠올려 보세요. 주사위의 여섯 면은 모두 같은 정사각형이에요. 한 면의 넓이만 구하면 6배 해서 끝이에요.',
      fig: box(3, 3, 3),
      check: {
        type: 'short', check: 'number', unit: 'cm²',
        q: '한 모서리가 4 cm인 정육면체의 겉넓이는 몇 cm²일까요?',
        answer: '96',
        wrong: [
          { a: '16', why: '한 면의 넓이만 구했어요. 정육면체는 면이 6개이므로 6배 해요.' },
          { a: '64', why: '부피($4 \\times 4 \\times 4$)를 구했어요. 겉넓이는 한 면의 넓이의 6배예요.' },
        ],
        explain: '한 면의 넓이는 $4 \\times 4=16$ (cm²)이고 면이 6개이므로 $16 \\times 6=96$ (cm²)이에요.',
      },
    },
    {
      title: '부피 비교하기와 1 cm³',
      body: '**부피**는 물건이 공간에서 차지하는 크기예요.\n\n두 상자의 부피를 비교하는 방법\n- 가로·세로·높이 가운데 두 길이가 같으면, 나머지 한 길이만 비교해요(직접 맞대기).\n- 크기가 같은 쌓기나무를 빈틈없이 채워서 개수를 비교해요.\n\n하지만 쌓기나무의 크기가 다르면 개수로 비교할 수 없어요. 그래서 모두가 같이 쓰는 단위를 정했어요.\n\n한 모서리의 길이가 1 cm인 정육면체의 부피를 **1 cm³** 라 쓰고 **1 세제곱센티미터**라고 읽어요.\n\n그림처럼 1 cm³ 쌓기나무 12개로 빈틈없이 쌓은 직육면체의 부피는 12 cm³예요.',
      easy: '컵에 담긴 물의 양을 비교할 때 같은 숟가락으로 몇 번 뜨는지 세면 공평하지요? 부피도 똑같아요.\n\n모두가 같은 "작은 정육면체(1 cm³)"를 숟가락처럼 써서, 그 정육면체가 몇 개 들어가는지 세는 거예요.',
      fig: unitBox(3, 2, 2, '1 cm³ 쌓기나무를 가로 3개, 세로 2개, 높이 2층으로 쌓은 직육면체'),
      check: {
        type: 'ox',
        q: '1 cm³는 한 모서리의 길이가 1 cm인 정육면체의 부피예요.',
        answer: true,
        explain: '맞아요. 한 모서리가 1 cm인 정육면체의 부피를 1 cm³라 쓰고 1 세제곱센티미터라고 읽어요.',
      },
    },
    {
      title: '직육면체와 정육면체의 부피',
      body: '1 cm³ 쌓기나무로 직육면체를 채운다고 생각해 봐요. 가로에 5개, 세로에 3개를 놓으면 한 층에 $5 \\times 3=15$(개), 높이가 4층이면 $15 \\times 4=60$(개)가 들어가요. 그래서 부피는 60 cm³예요.\n\n(직육면체의 부피) = (가로) × (세로) × (높이)\n\n가로×세로는 밑면의 넓이이므로 **(밑면의 넓이)×(높이)** 라고도 할 수 있어요.\n\n정육면체는 세 모서리의 길이가 모두 같으므로\n\n(정육면체의 부피) = (한 모서리) × (한 모서리) × (한 모서리)\n\n예: 한 모서리가 3 cm인 정육면체의 부피는 $3 \\times 3 \\times 3=27$ (cm³)예요.',
      easy: '두부를 생각해 보세요. 바닥에 한 층으로 깔린 작은 두부 조각이 15개이고, 그런 층이 4개 있으면 모두 $15 \\times 4=60$(조각)이에요.\n\n"한 층에 몇 개" × "몇 층" = "모두 몇 개". 이것이 가로 × 세로 × 높이예요.',
      fig: box(5, 3, 4),
      check: {
        type: 'short', check: 'number', unit: 'cm³',
        q: '가로 4 cm, 세로 3 cm, 높이 5 cm인 직육면체의 부피는 몇 cm³일까요?',
        answer: '60',
        wrong: [
          { a: '12', why: '세 길이를 더했어요. 부피는 가로 × 세로 × 높이로 곱해요.' },
          { a: '94', why: '겉넓이를 구했어요. 부피는 가로 × 세로 × 높이예요.' },
        ],
        explain: '$4 \\times 3 \\times 5=60$이므로 부피는 60 cm³예요.',
      },
    },
    {
      title: '1 m³와 1 cm³의 관계',
      body: '교실이나 창고처럼 큰 물건의 부피는 더 큰 단위로 나타내요.\n\n한 모서리의 길이가 1 m인 정육면체의 부피를 **1 m³** 라 쓰고 **1 세제곱미터**라고 읽어요.\n\n1 m = 100 cm이므로 1 m³인 정육면체에는 1 cm³ 쌓기나무가 가로로 100개, 세로로 100개, 높이로 100층 들어가요.\n\n$100 \\times 100 \\times 100=1000000$\n\n그래서 **1 m³ = 1000000 cm³** 예요.\n\n> ⚠️ 1 m = 100 cm라고 1 m³ = 100 cm³가 아니에요. 길이가 100배이면 부피는 100을 세 번 곱한 1000000배가 돼요.\n\n> 💡 길이의 단위가 섞여 있으면 먼저 **같은 단위로 바꾼 뒤** 곱해요. 2 m × 50 cm × 1 m → 2 m × 0.5 m × 1 m = 1 m³',
      easy: '1 m³ 상자 안을 1 cm³ 쌓기나무로 채운다고 상상해 보세요.\n\n바닥 한 줄에만 100개, 바닥 한 층을 채우려면 100줄이니 10000개. 이런 층을 100층 쌓아야 하니 1000000개(백만 개)가 필요해요!',
      check: {
        type: 'choice',
        q: '1 m³는 몇 cm³일까요?',
        choices: ['1000000 cm³', '100 cm³', '10000 cm³'],
        answer: 0,
        why: ['', '1 m = 100 cm인 길이의 관계를 그대로 썼어요. 부피는 가로·세로·높이 세 방향이 모두 100배예요.', '1 m² = 10000 cm²인 넓이의 관계와 헷갈렸어요. 부피는 100을 세 번 곱해요.'],
        explain: '1 m³에는 1 cm³ 쌓기나무가 $100 \\times 100 \\times 100=1000000$(개) 들어가요. 그래서 1 m³ = 1000000 cm³예요.',
      },
    },
  ],

  examples: [
    {
      q: '가로 6 cm, 세로 4 cm, 높이 5 cm인 직육면체의 겉넓이와 부피를 구하세요.',
      fig: box(6, 4, 5),
      steps: [
        '한 꼭짓점에서 만나는 세 면의 넓이: $6 \\times 4=24$, $4 \\times 5=20$, $6 \\times 5=30$ (cm²)',
        '마주 보는 면끼리 넓이가 같으므로 겉넓이는 $(24+20+30) \\times 2=148$ (cm²)',
        '부피는 가로 × 세로 × 높이: $6 \\times 4 \\times 5=120$ (cm³)',
      ],
      answer: '겉넓이 148 cm², 부피 120 cm³',
    },
    {
      q: '가로 3 m, 세로 2 m, 높이 50 cm인 직육면체 모양 화단의 부피는 몇 m³일까요?',
      steps: [
        '단위를 m로 맞춰요. 50 cm = 0.5 m',
        '부피: $3 \\times 2 \\times 0.5=3$ (m³)',
        '(cm³로 구하면 $300 \\times 200 \\times 50=3000000$ (cm³)이고, 1 m³ = 1000000 cm³이므로 3 m³로 같아요.)',
      ],
      answer: '3 m³',
    },
  ],

  terms: [
    { term: '겉넓이', def: '입체도형의 겉을 둘러싼 모든 면의 넓이의 합이에요. 직육면체는 여섯 면의 넓이를 더해요.' },
    { term: '부피', def: '물건이 공간에서 차지하는 크기예요. 단위로 cm³, m³를 써요.' },
    { term: '1 cm³', def: '한 모서리의 길이가 1 cm인 정육면체의 부피예요. 1 세제곱센티미터라고 읽어요.' },
    { term: '1 m³', def: '한 모서리의 길이가 1 m인 정육면체의 부피예요. 1 세제곱미터라고 읽고, 1000000 cm³와 같아요.' },
    { term: '직육면체', def: '직사각형 6개로 둘러싸인 입체도형이에요. 마주 보는 면은 서로 합동이에요.' },
    { term: '정육면체', def: '정사각형 6개로 둘러싸인 입체도형이에요. 모서리 12개의 길이가 모두 같아요.' },
    { term: '밑면', def: '직육면체에서 서로 마주 보는 두 면을 밑면이라고 해요. 부피는 (밑면의 넓이)×(높이)로도 구해요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 0,
      q: '직육면체의 겉넓이는 몇 cm²일까요?',
      fig: box(6, 4, 3),
      answer: '108',
      wrong: [
        { a: '54', why: '세 면의 넓이를 더하고 2배 하는 것을 빠뜨렸어요. 마주 보는 면도 있어요.' },
        { a: '72', why: '부피($6 \\times 4 \\times 3$)를 구했어요. 겉넓이는 면의 넓이를 더해요.' },
      ],
      explain: '세 면의 넓이는 $6 \\times 4=24$, $4 \\times 3=12$, $6 \\times 3=18$ (cm²)이에요. 겉넓이는 $(24+12+18) \\times 2=108$ (cm²)이에요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '가로 5 cm, 세로 3 cm, 높이 4 cm인 직육면체의 겉넓이를 구하는 식으로 **옳은** 것은 무엇일까요?',
      choices: [
        '$(5 \\times 3+3 \\times 4+5 \\times 4) \\times 2$',
        '$5 \\times 3 \\times 4$',
        '$(5+3+4) \\times 4$',
        '$5 \\times 3 \\times 6$',
      ],
      answer: 0,
      why: [
        '',
        '부피를 구하는 식이에요.',
        '모든 모서리의 길이의 합을 구하는 식이에요.',
        '한 면의 넓이에 6을 곱하는 것은 여섯 면이 모두 같은 정육면체일 때만 맞아요.',
      ],
      explain: '한 꼭짓점에서 만나는 세 면의 넓이 $5 \\times 3$, $3 \\times 4$, $5 \\times 4$를 더하고 2배 해요. 값은 $(15+12+20) \\times 2=94$ (cm²)예요.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 1,
      q: '한 모서리가 7 cm인 정육면체의 겉넓이는 몇 cm²일까요?',
      answer: '294',
      wrong: [
        { a: '49', why: '한 면의 넓이만 구했어요. 면이 6개이므로 6배 해요.' },
        { a: '343', why: '부피($7 \\times 7 \\times 7$)를 구했어요. 겉넓이는 한 면의 넓이의 6배예요.' },
        { a: '196', why: '면을 4개만 더했어요. 정육면체의 면은 6개예요.' },
      ],
      explain: '한 면의 넓이는 $7 \\times 7=49$ (cm²)이고 면이 6개이므로 $49 \\times 6=294$ (cm²)예요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: '쌓기나무의 크기가 서로 다르면, 쌓기나무를 채운 개수만으로 두 상자의 부피를 비교할 수 없어요.',
      answer: true,
      explain: '큰 쌓기나무 10개와 작은 쌓기나무 10개는 부피가 달라요. 그래서 크기가 같은 단위(1 cm³)를 정해서 개수를 세요.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', unit: 'cm³', concept: 2,
      q: '부피가 1 cm³인 쌓기나무로 빈틈없이 쌓아 직육면체를 만들었어요. 이 직육면체의 부피는 몇 cm³일까요?',
      fig: unitBox(4, 3, 2, '1 cm³ 쌓기나무를 가로 4개, 세로 3개, 높이 2층으로 빈틈없이 쌓은 직육면체'),
      answer: '24',
      hint: '한 층에 몇 개가 있는지 먼저 세어 보세요.',
      wrong: [{ a: '12', why: '한 층만 셌어요. 2층이므로 2배 해요.' }],
      explain: '한 층에 $4 \\times 3=12$(개), 2층이므로 $12 \\times 2=24$(개)예요. 쌓기나무 하나가 1 cm³이므로 부피는 24 cm³예요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', unit: 'cm³', concept: 3,
      q: '직육면체의 부피는 몇 cm³일까요?',
      fig: box(8, 5, 3),
      answer: '120',
      wrong: [
        { a: '16', why: '세 길이를 더했어요. 부피는 곱해서 구해요.' },
        { a: '158', why: '겉넓이를 구했어요. 부피는 가로 × 세로 × 높이예요.' },
      ],
      explain: '$8 \\times 5 \\times 3=120$이므로 부피는 120 cm³예요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'number', unit: 'cm³', concept: 4,
      q: '3 m³는 몇 cm³일까요?',
      answer: '3000000',
      wrong: [
        { a: '300', why: '1 m³ = 100 cm³로 생각했어요. 1 m³ = 1000000 cm³예요.' },
        { a: '30000', why: '넓이의 관계(1 m² = 10000 cm²)와 헷갈렸어요. 1 m³ = 1000000 cm³예요.' },
      ],
      explain: '1 m³ = 1000000 cm³이므로 3 m³ = 3000000 cm³예요.',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 3,
      q: '부피가 64 cm³인 정육면체가 있어요. 이 정육면체의 한 모서리는 몇 cm일까요?',
      answer: '4',
      hint: '같은 수를 세 번 곱해서 64가 되는 수를 찾아요.',
      wrong: [{ a: '16', why: '64를 4로 나누었어요. 같은 수를 세 번 곱해 64가 되는 수를 찾아요.' }],
      explain: '$4 \\times 4 \\times 4=64$이므로 한 모서리는 4 cm예요. ($3 \\times 3 \\times 3=27$, $5 \\times 5 \\times 5=125$이므로 3과 5는 아니에요.)',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: 'cm³', concept: 3,
      q: '가로 5 cm, 세로 4 cm, 높이 6 cm인 직육면체와 한 모서리가 5 cm인 정육면체가 있어요. 정육면체의 부피는 직육면체의 부피보다 몇 cm³ 더 클까요?',
      answer: '5',
      hint: '두 부피를 각각 구한 뒤 빼요.',
      wrong: [{ a: '-5', why: '거꾸로 뺐어요. 정육면체의 부피가 더 커요.' }],
      explain: '직육면체: $5 \\times 4 \\times 6=120$ (cm³), 정육면체: $5 \\times 5 \\times 5=125$ (cm³). $125-120=5$이므로 5 cm³ 더 커요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: 'm³', concept: 4,
      q: '가로 2 m, 세로 150 cm, 높이 1 m인 직육면체의 부피는 몇 m³일까요?',
      answer: '3',
      hint: '먼저 150 cm를 m로 바꾸어요.',
      wrong: [{ a: '300', why: '단위를 맞추지 않고 150을 그대로 곱했어요. 150 cm = 1.5 m예요.' }],
      explain: '150 cm = 1.5 m이므로 부피는 $2 \\times 1.5 \\times 1=3$ (m³)이에요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 2,
      q: '가 상자는 가로 4 cm, 세로 3 cm, 높이 5 cm이고, 나 상자는 가로 4 cm, 세로 3 cm, 높이 6 cm예요. 부피를 바르게 비교한 것은 무엇일까요?',
      choices: ['나 상자의 부피가 더 커요.', '가 상자의 부피가 더 커요.', '두 상자의 부피가 같아요.'],
      answer: 0,
      why: ['', '가로와 세로가 같으니 높이만 비교하면 돼요. 높이는 나 상자가 더 높아요.', '가로와 세로는 같지만 높이가 달라요. 높이가 높은 쪽의 부피가 커요.'],
      explain: '가로와 세로가 같으므로(밑면이 같으므로) 높이만 비교하면 돼요. 높이가 6 cm인 나 상자의 부피가 더 커요. (가: 60 cm³, 나: 72 cm³)',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', unit: 'cm²', concept: 0,
      q: '뚜껑이 없는 직육면체 모양 상자가 있어요. 가로 10 cm, 세로 8 cm, 높이 5 cm일 때 상자의 겉면(바깥쪽) 전체의 넓이는 몇 cm²일까요?',
      answer: '260',
      hint: '뚜껑이 없으니 윗면 하나를 빼야 해요.',
      wrong: [{ a: '340', why: '뚜껑(윗면)까지 더했어요. 뚜껑이 없으니 윗면의 넓이를 빼요.' }],
      explain: '여섯 면을 모두 더하면 $(10 \\times 8+8 \\times 5+10 \\times 5) \\times 2=(80+40+50) \\times 2=340$ (cm²)이에요. 뚜껑(윗면) $10 \\times 8=80$ (cm²)이 없으므로 $340-80=260$ (cm²)이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '가로 12 cm, 세로 8 cm, 높이 6 cm인 직육면체를 잘라서 한 모서리가 2 cm인 정육면체를 최대한 많이 만들려고 해요. 정육면체는 몇 개 만들 수 있을까요?',
      answer: '72',
      hint: '가로, 세로, 높이에 각각 정육면체가 몇 개씩 놓이는지 생각해요.',
      wrong: [{ a: '288', why: '부피 576 cm³를 2로 나누었어요. 작은 정육면체 하나의 부피는 $2 \\times 2 \\times 2=8$ (cm³)이에요.' }],
      explain: '가로에 $12 \\div 2=6$(개), 세로에 $8 \\div 2=4$(개), 높이에 $6 \\div 2=3$(층)이므로 $6 \\times 4 \\times 3=72$(개)예요. (부피로 확인: $576 \\div 8=72$)',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: 'cm³', concept: 1,
      q: '겉넓이가 150 cm²인 정육면체의 부피는 몇 cm³일까요?',
      answer: '125',
      hint: '먼저 한 면의 넓이를 구해요.',
      wrong: [
        { a: '25', why: '한 면의 넓이까지만 구했어요. 한 모서리를 구한 뒤 부피를 구해요.' },
        { a: '5', why: '한 모서리의 길이까지만 구했어요. 부피는 $5 \\times 5 \\times 5$예요.' },
      ],
      explain: '한 면의 넓이는 $150 \\div 6=25$ (cm²)예요. $5 \\times 5=25$이므로 한 모서리는 5 cm, 부피는 $5 \\times 5 \\times 5=125$ (cm³)예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: 'cm²', concept: 0,
      q: '한 모서리가 3 cm인 정육면체 2개를 한 면끼리 꼭 맞게 이어 붙여 직육면체를 만들었어요. 만든 직육면체의 겉넓이는 몇 cm²일까요?',
      answer: '90',
      hint: '이어 붙인 면은 겉에 보이지 않아요.',
      wrong: [{ a: '108', why: '정육면체 2개의 겉넓이를 그냥 더했어요. 붙은 두 면은 겉에서 사라져요.' }],
      explain: '만든 직육면체는 가로 6 cm, 세로 3 cm, 높이 3 cm예요. 겉넓이는 $(6 \\times 3+3 \\times 3+6 \\times 3) \\times 2=(18+9+18) \\times 2=90$ (cm²)이에요. (정육면체 2개의 겉넓이 108 cm²에서 붙은 두 면 $9 \\times 2=18$ (cm²)을 빼도 90 cm²예요.)',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: 'm³', concept: 4,
      q: '가로 2 m, 세로 50 cm, 높이 80 cm인 직육면체 모양 상자의 부피는 몇 m³일까요?',
      answer: '0.8',
      hint: '모든 길이를 m로 바꾼 뒤 곱해요.',
      wrong: [
        { a: '800000', why: 'cm³로 구했어요. 1 m³ = 1000000 cm³이므로 m³로 바꾸어요.' },
        { a: '8000', why: '단위를 맞추지 않고 $2 \\times 50 \\times 80$을 계산했어요. 길이를 모두 m로 바꾸어요.' },
      ],
      explain: '50 cm = 0.5 m, 80 cm = 0.8 m이므로 $2 \\times 0.5 \\times 0.8=0.8$ (m³)이에요. (cm로 계산하면 $200 \\times 50 \\times 80=800000$ (cm³) = 0.8 m³)',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'number', unit: 'cm³', concept: 3,
      q: '가로 20 cm, 세로 15 cm인 직육면체 모양 수조에 물이 들어 있어요. 돌 하나를 물속에 완전히 잠기게 넣었더니 물의 높이가 2 cm 올라갔어요. 돌의 부피는 몇 cm³일까요? (물은 넘치지 않았어요.)',
      answer: '600',
      hint: '돌이 들어간 만큼 물이 밀려 올라가요. 올라간 물의 부피를 구해요.',
      wrong: [{ a: '300', why: '수조 밑면의 넓이만 구했어요. 올라간 높이 2 cm를 곱해요.' }],
      explain: '돌의 부피는 올라간 물의 부피와 같아요. 밑면의 넓이 $20 \\times 15=300$ (cm²)에 올라간 높이 2 cm를 곱하면 $300 \\times 2=600$ (cm³)이에요.',
    },
  ],

  deeper: [
    {
      title: '길이, 넓이, 부피의 단위는 어떻게 커질까?',
      body: '1 m = 100 cm예요. 그런데\n\n| | 관계 | 이유 |\n|---|---|---|\n| 길이 | 1 m = 100 cm | 한 방향 |\n| 넓이 | 1 m² = 10000 cm² | $100 \\times 100$ (두 방향) |\n| 부피 | 1 m³ = 1000000 cm³ | $100 \\times 100 \\times 100$ (세 방향) |\n\n길이가 한 방향, 넓이가 두 방향, 부피가 세 방향이라서 단위 사이의 관계가 이렇게 커져요.\n\n생활에서 쓰는 들이와도 이어져요. 1 L는 1000 cm³와 같아요. 그래서 1 m³의 물은 1000 L예요.',
    },
    {
      title: '중학교에서는 이렇게 이어져요',
      body: '직육면체의 부피를 (밑면의 넓이)×(높이)로 구한 생각은 중학교 1학년에서 **각기둥과 원기둥의 부피**로 이어져요. 밑면이 삼각형이든 원이든 (밑넓이)×(높이)로 구해요.\n\n겉넓이도 전개도로 생각해서 (밑넓이)×2 + (옆넓이)로 구해요. 이 단원에서 옆면을 펼쳐 (밑면의 둘레)×(높이)로 구한 것과 같은 방법이에요.',
    },
  ],

  faq: [
    {
      q: '겉넓이랑 부피는 뭐가 달라요?',
      a: '겉넓이는 상자의 **겉을 싸는 종이의 넓이**이고, 부피는 상자가 **차지하는 공간의 크기**예요.\n\n그래서 단위도 달라요. 겉넓이는 넓이라서 cm²(제곱센티미터), 부피는 cm³(세제곱센티미터)를 써요.',
    },
    {
      q: '1 m³는 왜 100 cm³가 아니라 1000000 cm³예요?',
      a: '1 m³는 한 모서리가 1 m인 정육면체예요. 이 정육면체 안에 1 cm³ 쌓기나무를 채우면 가로 100개, 세로 100개, 높이 100층이 들어가요.\n\n그래서 $100 \\times 100 \\times 100=1000000$(개), 곧 1000000 cm³예요.',
    },
    {
      q: '어느 면을 밑면으로 정해도 부피가 같아요?',
      a: '네, 같아요. 가로 × 세로 × 높이는 곱하는 순서만 바뀔 뿐이라서 어느 면을 밑면으로 해도 결과가 같아요. 예: $2 \\times 3 \\times 4=3 \\times 4 \\times 2=24$',
    },
  ],

  mistakes: [
    '세 면의 넓이만 더하고 2배 하는 것을 빠뜨리는 실수 — 직육면체에는 마주 보는 면이 있어 여섯 면이에요.',
    '1 m³ = 100 cm³라고 생각하는 실수 — 세 방향이 모두 100배라서 1 m³ = 1000000 cm³예요.',
    'm와 cm가 섞인 길이를 그대로 곱하는 실수 — 먼저 같은 단위로 바꾼 뒤 곱해요.',
  ],

  gens: [
    {
      id: 'cuboid-surface',
      level: 1,
      title: '직육면체의 겉넓이',
      make: function (R) {
        var a = R.int(2, 12), b = R.int(2, 12), c = R.int(2, 12);
        if (a === b && b === c) c = c === 12 ? 11 : c + 1;
        var ab = a * b, bc = b * c, ac = a * c, S = 2 * (ab + bc + ac);
        return {
          type: 'short', check: 'number', unit: 'cm²', concept: 0,
          q: '가로 ' + a + ' cm, 세로 ' + b + ' cm, 높이 ' + c + ' cm인 직육면체의 겉넓이는 몇 cm²일까요?',
          fig: box(a, b, c),
          answer: String(S),
          wrong: uniq(S, [
            { a: String(S / 2), why: '세 면의 넓이를 더하고 2배 하는 것을 빠뜨렸어요. 마주 보는 면도 더해야 해요.' },
            { a: String(a * b * c), why: '부피를 구했어요. 겉넓이는 여섯 면의 넓이를 더해요.' },
            { a: String(4 * (a + b + c)), why: '모든 모서리의 길이를 더했어요. 겉넓이는 면의 넓이를 더해요.' },
          ]),
          explain: '한 꼭짓점에서 만나는 세 면의 넓이는 $' + a + ' \\times ' + b + '=' + ab + '$, $' + b + ' \\times ' + c + '=' + bc + '$, $' + a + ' \\times ' + c + '=' + ac + '$ (cm²)예요.\n\n마주 보는 면끼리 넓이가 같으므로 겉넓이는 $(' + ab + '+' + bc + '+' + ac + ') \\times 2=' + S + '$ (cm²)예요.',
        };
      },
    },
    {
      id: 'volume',
      level: 1,
      title: '직육면체와 정육면체의 부피',
      make: function (R) {
        if (R.bool(0.3)) {
          var e = R.int(2, 12), V = e * e * e;
          return {
            type: 'short', check: 'number', unit: 'cm³', concept: 3,
            q: '한 모서리가 ' + e + ' cm인 정육면체의 부피는 몇 cm³일까요?',
            fig: box(e, e, e),
            answer: String(V),
            wrong: uniq(V, [
              { a: String(e * 3), why: '한 모서리에 3을 곱했어요. 한 모서리를 세 번 곱해요: $' + e + ' \\times ' + e + ' \\times ' + e + '$' },
              { a: String(e * e), why: '한 면의 넓이까지만 구했어요. 높이 ' + e + ' cm를 한 번 더 곱해요.' },
              { a: String(6 * e * e), why: '겉넓이를 구했어요. 부피는 한 모서리를 세 번 곱해요.' },
            ]),
            explain: '정육면체의 부피는 (한 모서리)×(한 모서리)×(한 모서리)예요. $' + e + ' \\times ' + e + ' \\times ' + e + '=' + V + '$ (cm³)예요.',
          };
        }
        var a = R.int(2, 15), b = R.int(2, 12), c = R.int(2, 12);
        if (a === b && b === c) a = a + 1;
        var W = a * b * c, S = 2 * (a * b + b * c + a * c);
        return {
          type: 'short', check: 'number', unit: 'cm³', concept: 3,
          q: '가로 ' + a + ' cm, 세로 ' + b + ' cm, 높이 ' + c + ' cm인 직육면체의 부피는 몇 cm³일까요?',
          fig: box(a, b, c),
          answer: String(W),
          wrong: uniq(W, [
            { a: String(a + b + c), why: '세 길이를 더했어요. 부피는 가로 × 세로 × 높이로 곱해요.' },
            { a: String(a * b), why: '밑면의 넓이까지만 구했어요. 높이를 곱해야 해요.' },
            { a: String(S), why: '겉넓이를 구했어요. 부피는 가로 × 세로 × 높이예요.' },
          ]),
          explain: '(직육면체의 부피) = (가로)×(세로)×(높이)예요. $' + a + ' \\times ' + b + ' \\times ' + c + '=' + W + '$ (cm³)예요.',
        };
      },
    },
    {
      id: 'unit-m3',
      level: 2,
      title: 'm³와 cm³ 바꾸기',
      make: function (R) {
        var mode = R.int(0, 2);
        if (mode < 2) {
          var k = R.pick([2, 3, 4, 5, 6, 7, 8, 9, 0.5, 1.5, 2.5, 0.2]);
          var big = Math.round(k * 1000000), kt = String(k);
          if (mode === 0) {
            return {
              type: 'short', check: 'number', unit: 'cm³', concept: 4,
              q: kt + ' m³는 몇 cm³일까요?',
              answer: String(big),
              wrong: uniq(big, [
                { a: String(Math.round(k * 100)), why: '1 m³ = 100 cm³로 생각했어요. 부피는 세 방향이 모두 100배라서 1 m³ = 1000000 cm³예요.' },
                { a: String(Math.round(k * 10000)), why: '넓이의 관계(1 m² = 10000 cm²)와 헷갈렸어요. 1 m³ = 1000000 cm³예요.' },
                { a: String(Math.round(k * 1000)), why: '1000을 곱했어요. 1 m³ = $100 \\times 100 \\times 100$ cm³ = 1000000 cm³예요.' },
              ]),
              explain: '1 m³ = 1000000 cm³이므로 ' + kt + ' m³ = $' + kt + ' \\times 1000000=' + big + '$ (cm³)예요.',
            };
          }
          return {
            type: 'short', check: 'number', unit: 'm³', concept: 4,
            q: big + ' cm³는 몇 m³일까요?',
            answer: kt,
            wrong: uniq(k, [
              { a: String(big / 100), why: '100으로 나누었어요. 1 m³ = 1000000 cm³이므로 1000000으로 나누어요.' },
              { a: String(big / 10000), why: '넓이의 관계(1 m² = 10000 cm²)와 헷갈렸어요. 1000000으로 나누어요.' },
            ]),
            explain: '1000000 cm³ = 1 m³이므로 ' + big + ' cm³ = $' + big + ' \\div 1000000=' + kt + '$ (m³)예요.',
          };
        }
        var a = R.int(1, 5), b = R.int(1, 4), c = R.pick([20, 30, 40, 50, 60, 80, 120, 150, 250]);
        var prod = a * b * c;                       // a×b×c(cm) — m³ 의 100배
        var ans = R.F(prod, 100).toDecimal(), cm = R.F(c, 100).toDecimal();
        return {
          type: 'short', check: 'number', unit: 'm³', concept: 4,
          q: '가로 ' + a + ' m, 세로 ' + b + ' m, 높이 ' + c + ' cm인 직육면체의 부피는 몇 m³일까요?',
          answer: ans,
          hint: '먼저 ' + c + ' cm를 m로 바꾸어요.',
          wrong: uniq(ans, [
            { a: String(prod), why: '단위를 맞추지 않고 ' + c + R.josa(c, '을/를') + ' 그대로 곱했어요. ' + c + ' cm = ' + cm + ' m예요.' },
          ]),
          explain: c + ' cm = ' + cm + ' m이므로 부피는 $' + a + ' \\times ' + b + ' \\times ' + cm + '=' + ans + '$ (m³)예요.',
        };
      },
    },
    {
      id: 'height-from-surface',
      level: 3,
      title: '겉넓이로 높이 구하기',
      make: function (R) {
        var a = R.int(2, 10), b = R.int(2, 10), h = R.int(2, 12);
        var S = 2 * (a * b + b * h + a * h), base2 = 2 * a * b, side = S - base2, per = 2 * (a + b);
        return {
          type: 'short', check: 'number', unit: 'cm', concept: 0,
          q: '가로 ' + a + ' cm, 세로 ' + b + ' cm인 직육면체의 겉넓이가 ' + S + ' cm²예요. 이 직육면체의 높이는 몇 cm일까요?',
          answer: String(h),
          hint: '겉넓이에서 두 밑면의 넓이를 빼면 옆면 네 개의 넓이가 남아요.',
          wrong: uniq(h, [
            { a: String(side), why: '옆면 네 개의 넓이까지만 구했어요. 옆면을 펼친 직사각형의 가로(밑면의 둘레)로 나누어요.' },
            { a: String(side / 2), why: '옆면 넓이를 2로 나누었어요. 밑면의 둘레 ' + per + ' cm로 나누어야 해요.' },
          ]),
          explain: '두 밑면의 넓이는 $' + a + ' \\times ' + b + ' \\times 2=' + base2 + '$ (cm²)이므로 옆면 넓이는 $' + S + '-' + base2 + '=' + side + '$ (cm²)예요.\n\n' +
            '옆면을 펼치면 가로가 밑면의 둘레 $(' + a + '+' + b + ') \\times 2=' + per + '$ (cm), 세로가 높이인 직사각형이에요. 그래서 높이는 $' + side + ' \\div ' + per + '=' + h + '$ (cm)예요.',
        };
      },
    },
  ],
});
})();
