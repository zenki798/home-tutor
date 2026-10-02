/* 2학년 수학 · 네 자리 수
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 2학년은 네 자리 수에 쉼표(,)를 쓰지 않는다 (3058 처럼).
 * 그림: 수 모형(천·백·십·일)은 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  var DG = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  var PL = ['천', '백', '십', ''];
  var PLN = ['천', '백', '십', '일'];          // 자리 이름
  var PV = [1000, 100, 10, 1];

  function digitsOf(n) { return [Math.floor(n / 1000) % 10, Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10]; }
  function fromDigits(d) { return d[0] * 1000 + d[1] * 100 + d[2] * 10 + d[3]; }
  // 수를 읽는 말 (1은 천·백·십 앞에서 "일"을 읽지 않고, 0인 자리는 읽지 않는다)
  function readNum(n) {
    var d = digitsOf(n), s = '';
    for (var i = 0; i < 4; i++) {
      if (!d[i]) continue;
      s += (d[i] === 1 && i < 3 ? '' : DG[d[i]]) + PL[i];
    }
    return s || '영';
  }
  // 실수: 가운데 0인 자리도 "영"을 붙여 읽기
  function readZero(n) {
    var d = digitsOf(n), s = '', started = false;
    for (var i = 0; i < 4; i++) {
      if (!d[i] && !started) continue;
      started = true;
      if (!d[i]) { if (i < 3) s += '영' + PL[i]; continue; }
      s += (d[i] === 1 && i < 3 ? '' : DG[d[i]]) + PL[i];
    }
    return s;
  }

  /* ── 수 모형 그림 ── */
  function gridPath(x, y, w, h, nx, ny) {
    var p = '';
    for (var i = 1; i < nx; i++) p += 'M' + (x + w * i / nx).toFixed(1) + ' ' + y + 'V' + (y + h);
    for (var j = 1; j < ny; j++) p += 'M' + x + ' ' + (y + h * j / ny).toFixed(1) + 'H' + (x + w);
    return p ? '<path d="' + p + '" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.6" fill="none"/>' : '';
  }
  function thousand(x, y) {      // 천 모형: 정육면체 (앞면 30, 깊이 9)
    var s = 30, k = 9, o = '';
    o += '<polygon points="' + x + ',' + (y + k) + ' ' + (x + k) + ',' + y + ' ' + (x + s + k) + ',' + y + ' ' + (x + s) + ',' + (y + k) + '" fill="var(--fig-1)" fill-opacity="0.35" stroke="currentColor" stroke-width="1.2"/>';
    o += '<polygon points="' + (x + s) + ',' + (y + k) + ' ' + (x + s + k) + ',' + y + ' ' + (x + s + k) + ',' + (y + s) + ' ' + (x + s) + ',' + (y + s + k) + '" fill="var(--fig-1)" fill-opacity="0.55" stroke="currentColor" stroke-width="1.2"/>';
    o += '<rect x="' + x + '" y="' + (y + k) + '" width="' + s + '" height="' + s + '" fill="var(--fig-1)" fill-opacity="0.2" stroke="currentColor" stroke-width="1.2"/>';
    return o + gridPath(x, y + k, s, s, 10, 10);
  }
  function hundred(x, y) {       // 백 모형: 납작한 판
    return '<rect x="' + x + '" y="' + y + '" width="30" height="30" fill="var(--fig-2)" fill-opacity="0.25" stroke="currentColor" stroke-width="1.2"/>' + gridPath(x, y, 30, 30, 10, 10);
  }
  function ten(x, y) {           // 십 모형: 막대
    return '<rect x="' + x + '" y="' + y + '" width="6" height="30" fill="var(--fig-3)" fill-opacity="0.4" stroke="currentColor" stroke-width="1.2"/>' + gridPath(x, y, 6, 30, 1, 10);
  }
  function one(x, y) {           // 일 모형: 작은 정육면체
    return '<rect x="' + x + '" y="' + y + '" width="6" height="6" fill="var(--fig-4)" fill-opacity="0.5" stroke="currentColor" stroke-width="1.2"/>';
  }
  function blocks(th, h, t, o, alt) {
    var x = 10, body = '', i;
    for (i = 0; i < th; i++) { body += thousand(x, 6); x += 44; }
    if (th) x += 8;
    for (i = 0; i < h; i++) { body += hundred(x, 15); x += 36; }
    if (h) x += 8;
    for (i = 0; i < t; i++) { body += ten(x, 15); x += 10; }
    if (t) x += 10;
    for (i = 0; i < o; i++) { body += one(x, 39); x += 9; }
    var W = Math.max(200, x + 10);
    return {
      type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' 56">' + body + '</svg>',
      alt: alt || '수 모형: 천 모형 ' + th + '개, 백 모형 ' + h + '개, 십 모형 ' + t + '개, 일 모형 ' + o + '개',
    };
  }
  function hundredsTen() {       // 백 모형 10개 (5개씩 2줄)
    var body = '';
    for (var i = 0; i < 10; i++) body += hundred(14 + (i % 5) * 40, 8 + Math.floor(i / 5) * 38);
    return { type: 'svg', svg: '<svg viewBox="0 0 220 86">' + body + '</svg>', alt: '백 모형 10개' };
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
  id: 'math-e2-07',
  course: 'math-e2',
  title: '네 자리 수',
  summary: '1000과 몇천, 네 자리 수를 알아보고, 자릿값과 뛰어 세기, 수의 크기 비교를 배워요.',
  goals: [
    '1000과 몇천을 알고 읽고 쓸 수 있어요.',
    '네 자리 수를 읽고 쓰고, 각 자리의 숫자가 나타내는 값을 알 수 있어요.',
    '1000, 100, 10, 1씩 뛰어 셀 수 있어요.',
    '네 자리 수의 크기를 비교할 수 있어요.',
  ],
  standards: ['[2수01-02]', '[2수01-03]'],

  concepts: [
    {
      title: '1000 알아보기',
      body: '100이 10개이면 **1000**이에요. **천**이라고 읽어요.\n\n1000은 이런 수이기도 해요.\n\n- 900보다 100 큰 수\n- 990보다 10 큰 수\n- 999보다 1 큰 수\n\n> 💡 1000은 0이 3개인 네 자리 수예요.',
      easy: '100원짜리 동전을 하나씩 모아 볼까요?\n\n100, 200, 300, … 900, 그리고 하나 더 모으면 1000원이 돼요.\n\n그래서 100원짜리 10개는 1000원짜리 한 장과 같아요.',
      fig: hundredsTen(),
      check: {
        type: 'choice',
        q: '100이 10개인 수는 무엇일까요?',
        choices: ['1000', '110', '10000'],
        answer: 0,
        why: ['', '100과 10을 더했어요. 100이 10개 있다는 뜻이에요.', '0을 하나 더 썼어요. 100이 10개이면 1000이에요.'],
        explain: '100이 10개이면 1000(천)이에요.',
      },
    },
    {
      title: '몇천 알아보기',
      body: '1000이 몇 개인지에 따라 이렇게 써요.\n\n| 1000이 | 2개 | 3개 | 4개 | 5개 |\n|---|---|---|---|---|\n| 쓰기 | 2000 | 3000 | 4000 | 5000 |\n| 읽기 | 이천 | 삼천 | 사천 | 오천 |\n\n6000(육천), 7000(칠천), 8000(팔천), 9000(구천)도 같아요.\n\n> 💡 1000이 ■개이면 ■000이에요.',
      easy: '1000원짜리 지폐를 세어 보세요.\n\n한 장이면 천 원, 두 장이면 이천 원, 세 장이면 삼천 원이에요.\n\n지폐가 몇 장인지가 맨 앞 숫자가 돼요.',
      fig: blocks(3, 0, 0, 0, '천 모형 3개'),
      check: {
        type: 'short', check: 'number',
        q: '1000이 6개인 수를 쓰세요.',
        answer: '6000',
        wrong: [{ a: '600', why: '100이 6개인 수를 썼어요. 1000이 6개이면 6000이에요.' }, { a: '1006', why: '1000과 6을 더했어요. 1000이 6개 있다는 뜻이에요.' }],
        explain: '1000이 6개이면 6000(육천)이에요.',
      },
    },
    {
      title: '네 자리 수 읽고 쓰기',
      body: '1000이 2개, 100이 3개, 10이 5개, 1이 7개이면 **2357**이에요.\n\n**이천삼백오십칠**이라고 읽어요.\n\n읽을 때 주의할 점이 있어요.\n\n- **0인 자리는 읽지 않아요.** 3058 → 삼천오십팔\n- **1은 "일"을 빼고 읽어요.** 1111 → 천백십일 (일의 자리 1은 "일"로 읽어요)\n\n> ⚠️ 이천칠십을 2000 70처럼 따로 쓰지 않아요. 자리에 맞추어 2070이라고 써요.',
      easy: '돈으로 생각해 봐요.\n\n천 원짜리 2장, 백 원짜리 3개, 십 원짜리 5개, 일 원짜리 7개가 있으면 이천삼백오십칠 원이에요.\n\n없는 돈(0)은 말하지 않아요. 천 원짜리 3장과 십 원짜리 5개, 일 원짜리 8개면 "삼천오십팔 원"이에요.',
      fig: blocks(2, 3, 5, 7),
      check: {
        type: 'choice',
        q: '4062를 바르게 읽은 것은 무엇일까요?',
        choices: ['사천육십이', '사천영백육십이', '사백육십이'],
        answer: 0,
        why: ['', '0인 자리는 읽지 않아요.', '천의 자리 4를 백으로 읽었어요. 네 자리 수이니 "사천"으로 시작해요.'],
        explain: '천의 자리 4는 사천, 백의 자리는 0이라 읽지 않고, 육십이를 붙여요. 사천육십이예요.',
      },
    },
    {
      title: '각 자리의 숫자가 나타내는 값',
      body: '네 자리 수는 자리마다 숫자가 나타내는 값이 달라요.\n\n| 천의 자리 | 백의 자리 | 십의 자리 | 일의 자리 |\n|---|---|---|---|\n| 5 | 3 | 8 | 4 |\n| 5000 | 300 | 80 | 4 |\n\n5384에서 5는 5000, 3은 300, 8은 80, 4는 4를 나타내요.\n\n$5384=5000+300+80+4$',
      easy: '같은 숫자라도 서 있는 자리에 따라 값이 달라요.\n\n2222에서 맨 앞 2는 2000, 그다음 2는 200, 그다음 2는 20, 맨 끝 2는 2예요.\n\n왼쪽으로 한 자리 갈 때마다 10배씩 커져요.',
      check: {
        type: 'short', check: 'number',
        q: '7425에서 숫자 4가 나타내는 값은 얼마일까요?',
        answer: '400',
        wrong: [{ a: '4', why: '숫자만 썼어요. 4는 백의 자리 숫자라서 400을 나타내요.' }, { a: '40', why: '십의 자리로 보았어요. 4는 오른쪽에서 세 번째, 백의 자리예요.' }],
        explain: '4는 백의 자리 숫자이므로 400을 나타내요.',
      },
    },
    {
      title: '뛰어 세기',
      body: '몇씩 뛰어 세면 어느 자리 숫자가 1씩 커지는지 보아요.\n\n- **1000씩**: 2650, 3650, 4650 → 천의 자리가 1씩 커져요.\n- **100씩**: 2650, 2750, 2850 → 백의 자리가 1씩 커져요.\n- **10씩**: 2650, 2660, 2670 → 십의 자리가 1씩 커져요.\n- **1씩**: 2650, 2651, 2652 → 일의 자리가 1씩 커져요.\n\n> ⚠️ 100씩 뛰어 세다가 백의 자리가 9를 넘으면 천의 자리가 1 커져요. 2950 다음은 3050이에요.',
      easy: '100원짜리 동전을 하나씩 더 놓는다고 생각해 보세요.\n\n2650원, 2750원, 2850원, 2950원, 그다음은 3050원이에요.\n\n백 원짜리가 10개 모이면 천 원짜리 한 장이 되니까요.',
      fig: { type: 'numberline', min: 2600, max: 3100, step: 50, labelEvery: 2, arrows: [{ from: 2650, to: 2750 }, { from: 2750, to: 2850 }, { from: 2850, to: 2950 }, { from: 2950, to: 3050 }] },
      check: {
        type: 'choice',
        q: '4300에서 100씩 뛰어 세면 바로 다음 수는 무엇일까요?',
        choices: ['4400', '5300', '4310'],
        answer: 0,
        why: ['', '1000씩 뛰어 셌어요. 100씩이면 백의 자리가 1 커져요.', '10씩 뛰어 셌어요. 100씩이면 백의 자리가 1 커져요.'],
        explain: '100씩 뛰어 세면 백의 자리 숫자가 1 커져요. 4300 다음은 4400이에요.',
      },
    },
    {
      title: '네 자리 수의 크기 비교',
      body: '네 자리 수는 **천의 자리부터** 차례로 비교해요.\n\n- 천의 자리가 다르면 천의 자리 숫자가 큰 수가 커요. 5102 > 4987\n- 천의 자리가 같으면 백의 자리를 비교해요.\n- 백의 자리도 같으면 십의 자리, 그다음 일의 자리를 비교해요.\n\n3582와 3519는 천, 백의 자리가 같아요. 십의 자리 8이 1보다 크니 $3582>3519$예요.\n\n> 💡 >, < 기호는 벌어진 쪽이 큰 수를 향해요.',
      easy: '키를 재듯이 맨 앞자리부터 대어 보세요.\n\n앞자리가 같으면 한 칸씩 오른쪽으로 옮기며 비교해요.\n\n처음으로 다른 숫자가 나온 곳에서 숫자가 큰 수가 더 큰 수예요.',
      check: {
        type: 'ox',
        q: '4291은 4219보다 작아요.',
        answer: false,
        explain: '천, 백의 자리가 같고, 십의 자리가 9와 1이에요. 9가 더 크니 4291이 더 커요. $4291>4219$',
      },
    },
  ],

  examples: [
    {
      q: '1000이 3개, 100이 0개, 10이 6개, 1이 2개인 수를 쓰고 읽어 보세요.',
      steps: [
        '천의 자리 3, 백의 자리 0, 십의 자리 6, 일의 자리 2예요.',
        '자리에 맞추어 쓰면 3062예요.',
        '백의 자리는 0이라 읽지 않아요. 삼천육십이라고 읽어요.',
      ],
      answer: '3062, 삼천육십이',
    },
    {
      q: '5870에서 100씩 뛰어 세어 보세요.\n\n5870, 5970, [[?]], [[?]]',
      steps: [
        '100씩 뛰어 세면 백의 자리 숫자가 1씩 커져요.',
        '5970에서 백의 자리 9가 1 커지면 10이 되어 천의 자리로 올라가요. 그래서 6070이에요.',
        '그다음은 6170이에요.',
      ],
      answer: '6070, 6170',
    },
  ],

  terms: [
    { term: '천', def: '100이 10개인 수예요. 1000이라고 써요.' },
    { term: '네 자리 수', def: '천의 자리, 백의 자리, 십의 자리, 일의 자리로 된 수예요. 예: 2357' },
    { term: '자리', def: '숫자가 놓인 곳이에요. 오른쪽부터 일의 자리, 십의 자리, 백의 자리, 천의 자리예요.' },
    { term: '천의 자리', def: '네 자리 수에서 맨 왼쪽 자리예요. 2357에서 천의 자리 숫자는 2이고, 2000을 나타내요.' },
    { term: '뛰어 세기', def: '몇씩 건너뛰며 세는 것이에요. 예: 100씩 뛰어 세면 1200, 1300, 1400' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
      q: '900보다 100 큰 수를 쓰세요.',
      answer: '1000',
      wrong: [{ a: '910', why: '10 큰 수를 썼어요. 100 큰 수는 백의 자리가 1 커져요.' }, { a: '901', why: '1 큰 수를 썼어요. 100 큰 수를 구해요.' }],
      explain: '900보다 100 큰 수는 1000이에요. 100이 10개이기 때문이에요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', concept: 0,
      q: '1000은 990보다 얼마만큼 더 큰 수일까요?',
      answer: '10',
      wrong: [{ a: '100', why: '990에서 100을 더하면 1090이에요. 990에서 10을 더해야 1000이에요.' }, { a: '1', why: '999보다 1 큰 수가 1000이에요. 990은 10만큼 작아요.' }],
      explain: '990에서 10씩 세면 1000이에요. 그래서 1000은 990보다 10 큰 수예요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '"칠천"을 수로 바르게 쓴 것은 무엇일까요?',
      choices: ['7000', '700', '70000', '7100'],
      answer: 0,
      why: ['', '700은 칠백이에요.', '0을 하나 더 썼어요. 칠천은 1000이 7개예요.', '7100은 칠천백이에요.'],
      explain: '칠천은 1000이 7개인 수로 7000이라고 써요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', concept: 2,
      q: '"이천칠십오"를 수로 쓰세요.',
      answer: '2075',
      wrong: [{ a: '2705', why: '칠십을 칠백으로 썼어요. 백의 자리는 읽지 않았으니 0이에요.' }, { a: '200075', why: '이천(2000)과 칠십오(75)를 따로 이어 썼어요. 자리에 맞추어 2075라고 써요.' }],
      explain: '천의 자리 2, 백의 자리 0, 십의 자리 7, 일의 자리 5이므로 2075예요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '6309를 바르게 읽은 것은 무엇일까요?',
      choices: ['육천삼백구', '육천삼백영구', '육천삼십구', '육백삼십구'],
      answer: 0,
      why: ['', '0인 자리는 읽지 않아요.', '3은 백의 자리 숫자예요. 삼십이 아니라 삼백이에요.', '6은 천의 자리 숫자예요. 육백이 아니라 육천이에요.'],
      explain: '천의 자리 6(육천), 백의 자리 3(삼백), 십의 자리는 0이라 읽지 않고, 일의 자리 9(구)예요. 육천삼백구예요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', concept: 2,
      q: '수 모형이 나타내는 수를 쓰세요.',
      fig: blocks(3, 2, 4, 1),
      answer: '3241',
      wrong: [{ a: '1423', why: '일의 자리부터 거꾸로 썼어요. 천 모형의 수가 맨 앞이에요.' }],
      explain: '천 모형 3개, 백 모형 2개, 십 모형 4개, 일 모형 1개이므로 3241이에요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'number', concept: 3,
      q: '8536에서 천의 자리 숫자를 쓰세요.',
      answer: '8',
      wrong: [{ a: '8000', why: '숫자가 나타내는 값을 썼어요. 문제는 천의 자리 "숫자"를 묻고 있어요.' }, { a: '6', why: '일의 자리 숫자를 썼어요. 천의 자리는 맨 왼쪽이에요.' }],
      explain: '8536에서 맨 왼쪽 8이 천의 자리 숫자예요. 8은 8000을 나타내요.',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 3,
      q: '$5000+700+3=5703$이에요.',
      answer: true,
      explain: '천의 자리 5, 백의 자리 7, 십의 자리 0, 일의 자리 3이므로 5703이 맞아요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
      q: '규칙에 따라 뛰어 세었어요. [[?]]에 알맞은 수를 쓰세요.\n\n5970, 5980, 5990, [[?]], 6010',
      answer: '6000',
      hint: '어느 자리 숫자가 1씩 커지는지 보세요.',
      wrong: [{ a: '5900', why: '5990보다 작은 수를 썼어요. 10씩 커지니 5990 다음은 6000이에요.' }, { a: '5100', why: '십의 자리 9 다음을 잘못 생각했어요. 10이 되면 백의 자리로, 다시 천의 자리로 올라가요.' }],
      explain: '10씩 뛰어 세고 있어요. 5990보다 10 큰 수는 6000이에요. 그다음이 6010이에요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 5,
      q: '가장 큰 수는 무엇일까요?',
      choices: ['3850', '3805', '3580', '3508'],
      answer: 0,
      why: ['', '천, 백의 자리가 같은 3850과 비교하면 십의 자리 0이 5보다 작아요.', '백의 자리가 5예요. 백의 자리가 8인 수가 더 커요.', '백의 자리가 5예요. 백의 자리가 8인 수가 더 커요.'],
      hint: '천의 자리부터 차례로 비교해요.',
      explain: '천의 자리는 모두 3이에요. 백의 자리가 8인 3850과 3805 중에서 십의 자리가 5인 3850이 가장 커요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: '원', concept: 2,
      q: '지아는 1000원짜리 지폐 3장, 100원짜리 동전 5개, 10원짜리 동전 8개를 가지고 있어요. 모두 얼마일까요?',
      answer: '3580',
      wrong: [{ a: '16', why: '지폐와 동전의 수를 더했어요. 1000원이 3장이면 3000원처럼 값을 생각해요.' }],
      explain: '3000원, 500원, 80원이므로 모두 3580원이에요.',
    },
    {
      id: 'p12', level: 2, type: 'order', concept: 5,
      q: '작은 수부터 차례로 놓으세요.',
      choices: ['4710', '4170', '4701', '4107'],
      answer: [3, 1, 2, 0],
      explain: '천의 자리는 모두 4예요. 백의 자리가 1인 4170, 4107 중에서 십의 자리가 작은 4107이 더 작아요. 백의 자리가 7인 4710, 4701 중에서는 4701이 더 작아요. 4107 < 4170 < 4701 < 4710',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 3,
      q: '1000이 2개, 100이 13개, 10이 4개, 1이 5개인 수를 쓰세요.',
      answer: '3345',
      hint: '100이 13개는 1000이 1개, 100이 3개와 같아요.',
      wrong: [{ a: '2345', why: '100이 13개인 것을 100이 3개로만 셌어요. 100이 10개는 1000이에요.' }],
      explain: '100이 13개는 1300이에요. $2000+1300+40+5=3345$예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', concept: 5,
      q: '숫자 카드 4, 0, 7, 2를 한 번씩만 써서 네 자리 수를 만들려고 해요. 가장 큰 수를 쓰세요.',
      answer: '7420',
      hint: '큰 숫자부터 높은 자리에 놓아요.',
      wrong: [{ a: '7402', why: '십의 자리에 0을 놓았어요. 2가 0보다 커요.' }],
      explain: '가장 높은 천의 자리부터 큰 숫자를 차례로 놓아요. 7, 4, 2, 0이므로 7420이에요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', concept: 5,
      q: '숫자 카드 4, 0, 7, 2를 한 번씩만 써서 네 자리 수를 만들려고 해요. 가장 작은 수를 쓰세요.',
      answer: '2047',
      hint: '0은 천의 자리에 올 수 없어요.',
      wrong: [{ a: '247', why: '0을 천의 자리에 놓았어요. 그러면 네 자리 수가 아니에요.' }, { a: '2407', why: '백의 자리에 0을 놓으면 더 작아요.' }],
      explain: '0은 맨 앞에 올 수 없으니 천의 자리에는 0 다음으로 작은 2를 놓아요. 나머지 0, 4, 7을 작은 것부터 놓으면 2047이에요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', concept: 4,
      q: '어떤 수에서 100씩 4번 뛰어 세었더니 6230이 되었어요. 어떤 수는 얼마일까요?',
      answer: '5830',
      hint: '6230에서 거꾸로 100씩 4번 작아지게 세어 보세요.',
      wrong: [{ a: '6630', why: '100씩 커지게 세었어요. 거꾸로 생각해서 100씩 작아지게 세어요.' }, { a: '6190', why: '10씩 거꾸로 세었어요. 100씩 거꾸로 세어요.' }],
      explain: '6230에서 100씩 거꾸로 4번 세면 6130, 6030, 5930, 5830이에요. 그래서 어떤 수는 5830이에요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', fixed: true, concept: 5,
      q: '0부터 9까지의 숫자 중에서 [[?]]에 들어갈 수 있는 숫자는 모두 몇 개일까요?\n\n$53\\square7>5368$',
      choices: ['2개', '3개', '4개', '5개'],
      answer: 1,
      why: ['7, 8, 9를 다시 확인해 보세요. 모두 들어갈 수 있어요.', '', '6을 넣으면 5367이 되어 5368보다 작아요.', '5를 넣으면 5357이 되어 5368보다 작아요.'],
      hint: '[[?]]에 6을 넣으면 어떻게 되는지 먼저 확인해요.',
      explain: '천, 백의 자리가 같으니 십의 자리를 비교해요. [[?]]가 7, 8, 9이면 더 커요. 6이면 5367로 5368보다 작아요. 그래서 7, 8, 9로 3개예요.',
    },
  ],

  deeper: [
    {
      title: '10개가 모이면 한 자리 올라가요',
      body: '1이 10개면 10, 10이 10개면 100, 100이 10개면 1000이에요.\n\n이렇게 **10개가 모일 때마다 한 자리 올라가는** 방법을 십진법이라고 해요. 손가락이 10개라서 이렇게 세게 되었다는 이야기도 있어요.\n\n그럼 1000이 10개면 얼마일까요? 10000, **만**이에요. 4학년 "큰 수" 단원에서 만, 억, 조까지 배워요.',
    },
  ],

  faq: [
    {
      q: '0은 왜 읽지 않아요?',
      a: '0은 그 자리에 아무것도 없다는 뜻이에요. 그래서 읽지 않아요. 하지만 쓸 때는 자리를 지켜야 하니 꼭 0을 써요. 3058에서 0을 빼면 358이 되어 버려요.',
    },
    {
      q: '1111은 왜 일천일백일십일이라고 안 읽어요?',
      a: '천, 백, 십 앞의 1은 "일"을 빼고 읽기로 약속했어요. 그래서 천백십일이라고 읽어요. 일의 자리 1만 "일"이라고 읽어요.',
    },
    {
      q: '숫자랑 숫자가 나타내는 값은 뭐가 달라요?',
      a: '5384에서 천의 자리 "숫자"는 5예요. 그 5가 나타내는 "값"은 5000이에요. 문제에서 무엇을 묻는지 잘 보세요.',
    },
  ],

  mistakes: [
    '이천칠십을 200070처럼 쓰는 실수 — 자리에 맞추어 2070이라고 써요.',
    '3058을 "삼천영백오십팔"로 읽는 실수 — 0인 자리는 읽지 않아요.',
    '100씩 뛰어 셀 때 2950 다음을 21050처럼 쓰는 실수 — 백의 자리가 10이 되면 천의 자리로 올라가 3050이에요.',
  ],

  gens: [
    {
      id: 'read-num',
      level: 1,
      title: '네 자리 수 읽기',
      make: function (R) {
        var d = [R.int(1, 9), R.int(0, 9), R.int(0, 9), R.int(1, 9)];
        if (R.bool(0.6)) d[R.int(1, 2)] = 0;               // 가운데 0이 있는 수를 자주
        var n = fromDigits(d);
        var correct = readNum(n);
        var cands = [];
        if (d[1] === 0 || d[2] === 0) cands.push([readZero(n), '0인 자리는 읽지 않아요.']);
        cands.push([readNum(n % 1000), '천의 자리를 빠뜨렸어요. 네 자리 수이니 "' + DG[d[0]].replace('일', '') + '천"으로 시작해요.']);
        var sw1 = [d[0], d[2], d[1], d[3]], sw2 = [d[0], d[1], d[3], d[2]];
        cands.push([readNum(fromDigits(sw1)), '백의 자리와 십의 자리 숫자를 바꾸어 읽었어요.']);
        cands.push([readNum(fromDigits(sw2)), '십의 자리와 일의 자리 숫자를 바꾸어 읽었어요.']);
        if (d[1] === 0) cands.push([readNum(fromDigits([d[0], d[2], d[3], 0])), '0인 자리를 건너뛰고 숫자를 앞 자리로 당겨 읽었어요.']);
        cands.push([readNum(n + 100 * (d[1] < 9 ? 1 : -1)), '백의 자리 숫자를 다시 확인해 보세요.']);
        cands.push([readNum(n + 10 * (d[2] < 9 ? 1 : -1)), '십의 자리 숫자를 다시 확인해 보세요.']);
        var reason = {};
        cands.forEach(function (c) { if (c[0] !== correct && !(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        var parts = [];
        for (var i = 0; i < 4; i++) {
          if (d[i]) parts.push(PLN[i] + '의 자리 ' + d[i] + ' → ' + (d[i] === 1 && i < 3 ? '' : DG[d[i]]) + PL[i]);
          else parts.push(PLN[i] + '의 자리 0 → 읽지 않아요');
        }
        return {
          type: 'choice', concept: 2,
          q: n + R.josa(n, '을/를') + ' 바르게 읽은 것은 무엇일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: parts.map(function (p) { return '- ' + p; }).join('\n') + '\n\n그래서 ' + correct + R.josa(correct, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'place-value',
      level: 1,
      title: '자리의 숫자가 나타내는 값',
      make: function (R) {
        var d, pos;
        do {
          d = [R.int(1, 9), R.int(0, 9), R.int(0, 9), R.int(0, 9)];
          pos = R.int(0, 2);
        } while (d[pos] === 0 || d.filter(function (x) { return x === d[pos]; }).length > 1);
        var n = fromDigits(d), dg = d[pos], val = dg * PV[pos];
        var ws = [[dg, '숫자만 썼어요. ' + dg + R.josa(dg, '은/는') + ' ' + PLN[pos] + '의 자리 숫자라서 ' + val + R.josa(val, '을/를') + ' 나타내요.']];
        if (pos > 0) ws.push([dg * PV[pos - 1], '한 자리 왼쪽으로 보았어요. 오른쪽부터 일, 십, 백, 천의 자리예요.']);
        if (pos < 3) ws.push([dg * PV[pos + 1], '한 자리 오른쪽으로 보았어요. 오른쪽부터 일, 십, 백, 천의 자리예요.']);
        return {
          type: 'short', check: 'number', concept: 3,
          q: n + '에서 숫자 ' + dg + R.josa(dg, '이/가') + ' 나타내는 값은 얼마일까요?',
          answer: String(val),
          wrong: wrongs(val, ws),
          explain: dg + R.josa(dg, '은/는') + ' ' + PLN[pos] + '의 자리 숫자이므로 ' + val + R.josa(val, '을/를') + ' 나타내요.\n\n$' + n + '=' + d.map(function (x, i) { return x * PV[i]; }).filter(function (x) { return x > 0; }).join('+') + '$',
        };
      },
    },
    {
      id: 'skip-count',
      level: 2,
      title: '1000, 100, 10, 1씩 뛰어 세기',
      make: function (R) {
        var si = R.int(0, 3), step = PV[si];
        var s;
        if (si === 0) s = R.int(1, 5) * 1000 + R.int(0, 99) * 10;
        else s = R.int(1000, 9999 - 4 * step);
        // 자리가 올라가는 경우를 자주 만든다 (100·10·1씩)
        if (si > 0 && R.bool(0.6)) {
          var big = PV[si - 1];
          var base = (Math.floor(s / big) + 1) * big;   // s 보다 큰 다음 "올림" 지점
          s = base - step * R.int(1, 3) + (s % step);
          if (s + 4 * step > 9999) s -= big;
        }
        var seq = [];
        for (var i = 0; i < 5; i++) seq.push(s + i * step);
        var k = R.int(2, 4), ans = seq[k];
        var shown = seq.map(function (x, i) { return i === k ? '[[?]]' : String(x); });
        var ws = [];
        PV.forEach(function (v, j) {
          if (j !== si) ws.push([seq[k - 1] + v, v + '씩 뛰어 셌어요. 앞의 두 수를 보고 어느 자리가 커지는지 확인해요.']);
        });
        return {
          type: 'short', check: 'number', concept: 4,
          q: '규칙에 따라 뛰어 세었어요. [[?]]에 알맞은 수를 쓰세요.\n\n' + shown.join(', '),
          answer: String(ans),
          hint: '어느 자리 숫자가 1씩 커지는지 보세요.',
          wrong: wrongs(ans, ws),
          explain: PLN[si] + '의 자리 숫자가 1씩 커지니 ' + step + '씩 뛰어 센 거예요. ' + seq[k - 1] + '보다 ' + step + ' 큰 수는 ' + ans + R.josa(ans, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'compare-max',
      level: 2,
      title: '네 자리 수의 크기 비교',
      make: function (R) {
        var a = R.int(1, 9), h = R.int(1, 8);
        // 천의 자리가 같고, 몇은 백의 자리도 같게 만들어 깊이 비교하게 한다
        var nums = R.distinct(4, function () {
          var hh = R.bool(0.6) ? h : R.int(0, 9);
          return String(a * 1000 + hh * 100 + R.int(0, 99));
        });
        var vals = nums.map(Number);
        var most = R.bool();
        var target = vals[0];
        vals.forEach(function (v) { if (most ? v > target : v < target) target = v; });
        var correct = String(target);
        var td = digitsOf(target);
        var why = nums.map(function (x) {
          if (x === correct) return '';
          var xd = digitsOf(Number(x)), i = 0;
          while (xd[i] === td[i]) i++;
          return (i > 0 ? '앞자리가 같으면 ' : '') + PLN[i] + '의 자리 숫자를 비교해 보세요. ' + x + '보다 ' + (most ? '큰' : '작은') + ' 수가 있어요.';
        });
        return {
          type: 'choice', concept: 5,
          q: '가장 ' + (most ? '큰' : '작은') + ' 수는 무엇일까요?',
          choices: nums,
          answer: nums.indexOf(correct),
          why: why,
          hint: '천의 자리부터 차례로 비교해요.',
          explain: '천의 자리는 모두 ' + a + R.josa(a, '이에요/예요') + '. 백의 자리부터 차례로 비교하면 가장 ' + (most ? '큰' : '작은') + ' 수는 ' + correct + R.josa(correct, '이에요/예요') + '.\n\n' + vals.slice().sort(function (x, y) { return x - y; }).join(' < '),
        };
      },
    },
  ],
});
})();
