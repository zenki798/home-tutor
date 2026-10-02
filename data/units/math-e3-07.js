/* 3학년 수학 · 곱셈(두 자리×두 자리)
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 세로셈(vmul·vmul2)·넓이 모형(area)은 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  var X = [196, 156, 116, 76]; // 일·십·백·천의 자리 가운데 x

  function tx(x, y, size, fill, s) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" text-anchor="middle" fill="' + fill + '">' + s + '</text>';
  }
  function putNum(str, y, fill) {
    var s = '';
    str = String(str);
    for (var i = 0; i < str.length; i++) s += tx(X[str.length - 1 - i], y, 30, fill, str.charAt(i));
    return s;
  }
  // 곱셈 세로셈 (곱하는 수가 한 자리). marks 는 {자리 번호: 위에 작게 쓸 올림 수}
  function vmul(top, bot, ans, marks, alt) {
    var s = '';
    if (marks) Object.keys(marks).forEach(function (k) { s += tx(X[k], 24, 16, 'var(--fig-4)', marks[k]); });
    s += putNum(top, 64, 'currentColor') + tx(36, 106, 30, 'currentColor', '×') + putNum(bot, 106, 'currentColor');
    s += '<line x1="20" y1="120" x2="220" y2="120" stroke="currentColor" stroke-width="2"/>';
    var has = ans !== null && ans !== undefined;
    if (has) s += putNum(ans, 160, 'var(--fig-1)');
    return { type: 'svg', svg: '<svg viewBox="0 0 240 ' + (has ? 176 : 134) + '">' + s + '</svg>', alt: alt };
  }
  // 두 자리 수끼리의 세로셈: 부분 곱 두 줄(p1 = 일의 자리를 곱한 값, p2 = 십의 자리를 곱한 값)과 합
  function vmul2(top, bot, p1, p2, ans, alt) {
    var s = putNum(top, 40, 'currentColor') + tx(36, 80, 30, 'currentColor', '×') + putNum(bot, 80, 'currentColor');
    s += '<line x1="20" y1="94" x2="220" y2="94" stroke="currentColor" stroke-width="2"/>';
    s += putNum(p1, 132, 'var(--fig-2)') + putNum(p2, 172, 'var(--fig-3)');
    s += '<line x1="20" y1="186" x2="220" y2="186" stroke="currentColor" stroke-width="2"/>';
    s += putNum(ans, 226, 'var(--fig-1)');
    return { type: 'svg', svg: '<svg viewBox="0 0 240 240">' + s + '</svg>', alt: alt };
  }
  // 넓이 모형: 가로 a = ta·10 + oa, 세로 b = tb·10 + ob 를 네 칸으로 나누어 칸마다 곱을 쓴다
  function area(a, b, alt) {
    var ta = Math.floor(a / 10) * 10, oa = a % 10, tb = Math.floor(b / 10) * 10, ob = b % 10;
    var W = 300, H = 170, x0 = 50, y0 = 30;
    var wa = Math.round(W * Math.max(0.26, oa / a)), wt = W - wa;
    var hb = Math.round(H * Math.max(0.26, ob / b)), ht = H - hb;
    var s = '';
    function cell(x, y, w, h, fill, label) {
      s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + fill + '" fill-opacity="0.25" stroke="currentColor" stroke-width="2"/>';
      s += tx(x + w / 2, y + h / 2 + 6, 16, 'currentColor', label);
    }
    cell(x0, y0, wt, ht, 'var(--fig-1)', ta + '×' + tb + '=' + (ta * tb));
    cell(x0 + wt, y0, wa, ht, 'var(--fig-2)', oa + '×' + tb + '=' + (oa * tb));
    cell(x0, y0 + ht, wt, hb, 'var(--fig-3)', ta + '×' + ob + '=' + (ta * ob));
    cell(x0 + wt, y0 + ht, wa, hb, 'var(--fig-4)', oa + '×' + ob + '=' + (oa * ob));
    s += tx(x0 + wt / 2, 22, 18, 'currentColor', ta) + tx(x0 + wt + wa / 2, 22, 18, 'currentColor', oa);
    s += tx(28, y0 + ht / 2 + 6, 18, 'currentColor', tb) + tx(28, y0 + ht + hb / 2 + 6, 18, 'currentColor', ob);
    return { type: 'svg', svg: '<svg viewBox="0 0 360 210">' + s + '</svg>', alt: alt };
  }

  var PLACE = ['일', '십', '백', '천'];
  // (여러 자리 수) × (한 자리 수) 를 자리별로 따라가며 풀이 줄과 "올림을 빠뜨린 답"을 만든다
  function colWork(n, k, R) {
    var ds = String(n).split('').reverse().map(Number), c = 0, lines = [], noCarry = 0, carries = 0;
    for (var i = 0; i < ds.length; i++) {
      var p = ds[i] * k, v = p + c, last = i === ds.length - 1;
      var expr = '$' + ds[i] + ' \\times ' + k + '=' + p + '$' + (c ? '에 올린 ' + c + R.josa(c, '을/를') + ' 더하면 $' + p + '+' + c + '=' + v + '$' : '');
      var line = PLACE[i] + '의 자리: ' + expr;
      if (!last && v >= 10) { line += ' → ' + (v % 10) + R.josa(v % 10, '을/를') + ' 쓰고 ' + Math.floor(v / 10) + R.josa(Math.floor(v / 10), '을/를') + ' ' + PLACE[i + 1] + '의 자리로 올려요.'; carries++; }
      else if (last && v >= 10) line += ' → ' + v + R.josa(v, '을/를') + ' 그대로 써요.';
      lines.push(line);
      noCarry += last ? p * Math.pow(10, i) : (p % 10) * Math.pow(10, i);
      c = last ? 0 : Math.floor(v / 10);
    }
    return { lines: lines, ans: n * k, noCarry: noCarry, carries: carries };
  }

Tutor.registerUnit({
  id: 'math-e3-07',
  course: 'math-e3',
  title: '곱셈(두 자리×두 자리)',
  summary: '(세 자리 수)×(한 자리 수)와 곱하는 수가 두 자리 수인 곱셈을 원리에 맞게 계산해요.',
  goals: [
    '올림이 있는 (세 자리 수)×(한 자리 수)를 계산할 수 있어요.',
    '(몇십)×(몇십), (몇십몇)×(몇십), (몇)×(몇십몇)을 계산할 수 있어요.',
    '(몇십몇)×(몇십몇)을 자리별로 나누어 계산할 수 있어요.',
    '곱셈 결과를 어림하고, 곱셈이 필요한 문제를 해결할 수 있어요.',
  ],
  standards: ['[4수01-04]', '[4수01-08]'],

  concepts: [
    {
      title: '(세 자리 수)×(한 자리 수)',
      body: '$213 \\times 3$은 213을 백, 십, 일의 자리로 나누어 각각 곱한 뒤 더한 것과 같아요.\n\n- $200 \\times 3=600$\n- $10 \\times 3=30$\n- $3 \\times 3=9$\n- 더하면 $600+30+9=639$\n\n세로셈으로는 **일의 자리부터** 곱해서 같은 자리에 써요. 일의 자리 9, 십의 자리 3, 백의 자리 6 → 639\n\n> 💡 백의 자리 숫자 2에 3을 곱한 6은 600을 나타내요.',
      easy: '100원짜리 2개, 10원짜리 1개, 1원짜리 3개가 든 지갑(213원)이 3개 있다고 생각해 보세요.\n\n100원짜리는 6개(600원), 10원짜리는 3개(30원), 1원짜리는 9개(9원)이니 모두 639원이에요. 동전 종류마다 따로 세면 쉬워요.',
      fig: vmul(213, 3, 639, null, '213 곱하기 3의 세로셈. 답은 639'),
      check: {
        type: 'ox',
        q: '$231 \\times 2$를 계산할 때, 백의 자리 계산 $2 \\times 2=4$는 400을 나타내요.',
        answer: true,
        explain: '231의 백의 자리 숫자 2는 200을 나타내요. $200 \\times 2=400$이므로 4는 백의 자리에 써요. $231 \\times 2=462$예요.',
      },
    },
    {
      title: '올림이 있는 (세 자리 수)×(한 자리 수)',
      body: '어느 자리든 곱이 10이거나 10보다 크면 **윗자리로 올려요**. 올린 수는 윗자리를 곱한 다음에 더해요.\n\n$476 \\times 3$\n- 일의 자리: $6 \\times 3=18$ → 8을 쓰고 1을 올려요.\n- 십의 자리: $7 \\times 3=21$, 올린 1을 더해 22 → 2를 쓰고 2를 올려요.\n- 백의 자리: $4 \\times 3=12$, 올린 2를 더해 14 → 14를 그대로 써요.\n\n그래서 $476 \\times 3=1428$이에요. 세 자리 수에 한 자리 수를 곱하면 네 자리 수가 될 수도 있어요.',
      easy: '두 자리 수 곱셈에서 하던 올림과 똑같아요. 자리가 하나 늘었을 뿐이에요.\n\n"곱하고 → 올린 수 더하고 → 일의 자리 숫자만 쓰고 → 나머지는 올리기"를 일의 자리, 십의 자리, 백의 자리 순서로 되풀이해요.',
      fig: vmul(476, 3, 1428, { 1: '1', 2: '2' }, '476 곱하기 3의 세로셈. 십의 자리 위에 1, 백의 자리 위에 2가 올림 수로 작게 쓰여 있고 답은 1428'),
      check: {
        type: 'short', check: 'number',
        q: '계산해 보세요.\n\n$258 \\times 3$',
        answer: '774',
        wrong: [{ a: '654', why: '올린 수를 윗자리에 더하지 않았어요. 일의 자리에서 2, 십의 자리에서 1을 올려 더해요.' }],
        explain: '일의 자리 $8 \\times 3=24$ → 4를 쓰고 2를 올려요. 십의 자리 $5 \\times 3=15$에 2를 더해 17 → 7을 쓰고 1을 올려요. 백의 자리 $2 \\times 3=6$에 1을 더해 7. 그래서 774예요.',
      },
    },
    {
      title: '(몇십)×(몇십), (몇십몇)×(몇십)',
      body: '$30 \\times 20$은 얼마일까요? 20은 $2 \\times 10$이에요. 그래서 $30 \\times 20$은 $30 \\times 2=60$을 10배 한 600이에요.\n\n- **(몇십)×(몇십)**: (몇)×(몇)을 계산한 뒤 **0을 2개** 붙여요. $30 \\times 20$ → $3 \\times 2=6$ → 600\n- **(몇십몇)×(몇십)**: (몇십몇)×(몇)을 계산한 뒤 **0을 1개** 붙여요. $13 \\times 20$ → $13 \\times 2=26$ → 260\n\n> ⚠️ $50 \\times 40$처럼 (몇)×(몇)이 이미 0으로 끝나도($5 \\times 4=20$) 0을 2개 더 붙여요. $50 \\times 40=2000$',
      easy: '10원짜리 동전 3개(30원)가 든 봉투가 20개 있다고 생각해 보세요. 봉투 2개에 60원이니, 봉투 20개에는 그 10배인 600원이 들어 있어요.\n\n"10배 하면 끝에 0이 하나 붙는다"를 기억하면 0의 개수를 헷갈리지 않아요.',
      check: {
        type: 'choice',
        q: '$40 \\times 30$의 값은 무엇일까요?',
        choices: ['1200', '120', '12000'],
        answer: 0,
        why: ['', '0을 1개만 붙였어요. 40과 30에 0이 하나씩 있으니 $4 \\times 3=12$에 0을 2개 붙여요.', '0을 3개 붙였어요. 40과 30에 있는 0은 모두 2개예요.'],
        explain: '$4 \\times 3=12$에 0을 2개 붙여 1200이에요.',
      },
    },
    {
      title: '(몇)×(몇십몇)',
      body: '$6 \\times 24$는 24를 20과 4로 나누어 곱한 뒤 더해요.\n\n- $6 \\times 4=24$\n- $6 \\times 20=120$\n- 더하면 $24+120=144$\n\n곱셈은 두 수의 순서를 바꾸어도 곱이 같아요. 그래서 $6 \\times 24=24 \\times 6$으로 바꾸어 세로셈으로 계산해도 돼요.\n\n> ⚠️ $6 \\times 20$을 $6 \\times 2=12$로 계산하면 안 돼요. 24의 2는 20을 나타내요.',
      easy: '한 봉지에 6개씩 든 사탕이 24봉지 있다고 생각해 보세요. 20봉지에 $6 \\times 20=120$개, 남은 4봉지에 $6 \\times 4=24$개, 모두 144개예요.\n\n큰 수를 쉬운 두 덩어리(20과 4)로 나누어 곱하는 거예요.',
      check: {
        type: 'short', check: 'number',
        q: '계산해 보세요.\n\n$7 \\times 15$',
        answer: '105',
        wrong: [{ a: '42', why: '15의 1을 1로 보고 곱했어요. 15의 1은 10을 나타내므로 $7 \\times 10=70$이에요.' }],
        explain: '$7 \\times 5=35$, $7 \\times 10=70$이므로 $35+70=105$예요.',
      },
    },
    {
      title: '(몇십몇)×(몇십몇)',
      body: '$24 \\times 13$은 13을 3과 10으로 나누어 곱한 뒤 더해요.\n\n- $24 \\times 3=72$\n- $24 \\times 10=240$\n- 더하면 $72+240=312$\n\n세로셈에서는 첫째 줄에 $24 \\times 3=72$를, 둘째 줄에 $24 \\times 10=240$을 쓰고 두 줄을 더해요.\n\n> ⚠️ 둘째 줄은 13의 **십의 자리 1**, 곧 10을 곱한 값이에요. 24가 아니라 240이에요.',
      easy: '가로 24칸, 세로 13칸인 직사각형 모양 타일이 몇 장인지 센다고 생각해 보세요. 세로를 10줄과 3줄로 잘라서 세면 $24 \\times 10=240$장, $24 \\times 3=72$장, 모두 312장이에요.\n\n가로도 20과 4로 잘라 네 조각으로 세어도 같아요. $20 \\times 10=200$, $4 \\times 10=40$, $20 \\times 3=60$, $4 \\times 3=12$ → $200+40+60+12=312$',
      fig: vmul2(24, 13, 72, 240, 312, '24 곱하기 13의 세로셈. 첫째 줄 72, 둘째 줄 240, 합 312'),
      check: {
        type: 'choice',
        q: '$21 \\times 14$의 값은 무엇일까요?',
        choices: ['294', '105', '204'],
        answer: 0,
        why: ['', '$21 \\times 10$을 21로 계산했어요. 14의 1은 10을 나타내므로 210이에요. $84+210=294$', '같은 자리끼리만 곱했어요($20 \\times 10$, $1 \\times 4$). $21 \\times 4$와 $21 \\times 10$을 모두 구해 더해요.'],
        explain: '$21 \\times 4=84$, $21 \\times 10=210$이므로 $84+210=294$예요.',
      },
    },
    {
      title: '곱셈 결과 어림하기와 문제 해결',
      body: '곱하는 두 수를 **가장 가까운 몇십**으로 바꾸어 곱하면 결과를 쉽게 어림할 수 있어요.\n\n$29 \\times 31$ → 약 $30 \\times 30=900$ (실제 값 899)\n\n곱셈이 필요한 문제는 이렇게 풀어요.\n\n1. 무엇을 구하는지 찾아요.\n2. "몇씩 몇 묶음"인지 찾아 곱셈식을 세워요.\n3. 계산하고, 어림한 값과 비교해 답이 알맞은 크기인지 확인해요.\n\n예: 한 상자에 사과가 24개씩 들어 있어요. 15상자에는 모두 몇 개? → $24 \\times 15=360$ (어림: 15는 10과 20 사이이니 답은 $24 \\times 10=240$과 $24 \\times 20=480$ 사이여야 해요. 360은 알맞아요)',
      easy: '마트에서 29개 묶음 상자를 31개 산다고 해 볼까요? "거의 30개씩 30상자니까 900개쯤이겠다"하고 미리 생각해 두면, 계산한 답이 9000이나 90처럼 엉뚱할 때 바로 알아챌 수 있어요.',
      check: {
        type: 'choice',
        q: '$49 \\times 21$을 몇십으로 어림한 값으로 알맞은 것은 무엇일까요?',
        choices: ['약 1000', '약 800', '약 100'],
        answer: 0,
        why: ['', '49를 40으로 생각했어요. 49는 50에 훨씬 가까워요.', '0을 빠뜨렸어요. $50 \\times 20$은 $5 \\times 2=10$에 0을 2개 붙여요.'],
        explain: '49는 약 50, 21은 약 20이므로 $50 \\times 20=1000$, 약 1000이에요. (실제 값은 1029)',
      },
    },
  ],

  examples: [
    {
      q: '계산해 보세요.\n\n$345 \\times 4$',
      fig: vmul(345, 4, null, null, '345 곱하기 4의 세로셈'),
      steps: [
        '일의 자리: $5 \\times 4=20$ → 0을 쓰고 2를 십의 자리로 올려요.',
        '십의 자리: $4 \\times 4=16$에 올린 2를 더해 18 → 8을 쓰고 1을 백의 자리로 올려요.',
        '백의 자리: $3 \\times 4=12$에 올린 1을 더해 13 → 13을 그대로 써요.',
        '확인: 345는 약 300과 400 사이이고 $300 \\times 4=1200$, $400 \\times 4=1600$이므로 1380은 알맞은 크기예요.',
      ],
      answer: '1380',
    },
    {
      q: '계산해 보세요.\n\n$36 \\times 24$',
      fig: area(36, 24, '가로 30과 6, 세로 20과 4로 나눈 넓이 모형. 네 칸에 30×20=600, 6×20=120, 30×4=120, 6×4=24'),
      steps: [
        '24를 4와 20으로 나누어 곱해요.',
        '$36 \\times 4=144$',
        '$36 \\times 20=720$ ($36 \\times 2=72$에 0을 붙여요)',
        '두 곱을 더해요. $144+720=864$',
        '넓이 모형으로 확인: $600+120+120+24=864$',
      ],
      answer: '864',
    },
    {
      q: '지아는 하루에 책을 35쪽씩 읽어요. 2주일(14일) 동안 읽으면 모두 몇 쪽을 읽을까요?',
      steps: [
        '35쪽씩 14일이므로 곱셈식 $35 \\times 14$를 세워요.',
        '$35 \\times 4=140$, $35 \\times 10=350$',
        '$140+350=490$',
        '어림: 14는 10과 20 사이이니 답은 $35 \\times 10=350$과 $35 \\times 20=700$ 사이여야 해요. 490은 알맞은 크기예요.',
      ],
      answer: '490쪽',
    },
  ],

  terms: [
    { term: '곱', def: '곱셈의 결과예요. $24 \\times 13=312$에서 312가 곱이에요.' },
    { term: '몇십몇', def: '13, 24, 57처럼 십의 자리와 일의 자리 숫자가 있는 두 자리 수를 말해요. (몇십몇)×(몇십몇)은 두 자리 수끼리의 곱셈이에요.' },
    { term: '올림', def: '어떤 자리의 곱(올린 수를 더한 값)이 10이거나 10보다 클 때, 10을 바로 윗자리의 1로 바꾸어 올려 주는 것이에요.' },
    { term: '세로셈', def: '자리를 맞추어 수를 위아래로 쓰고 계산하는 방법이에요. 두 자리 수끼리 곱할 때는 두 줄의 곱을 써서 더해요.' },
    { term: '어림하기', def: '정확한 값 대신 대강 얼마쯤인지 생각해 보는 것이에요. 예: $29 \\times 31$은 약 $30 \\times 30=900$' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
      q: '계산해 보세요.\n\n$312 \\times 3$',
      answer: '936',
      wrong: [{ a: '315', why: '312와 3을 더했어요. 곱셈은 312를 3번 더한 것이에요.' }],
      explain: '일의 자리 $2 \\times 3=6$, 십의 자리 $1 \\times 3=3$, 백의 자리 $3 \\times 3=9$이므로 936이에요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', concept: 1,
      q: '계산해 보세요.\n\n$127 \\times 4$',
      answer: '508',
      wrong: [{ a: '488', why: '올린 수를 윗자리에 더하지 않았어요. 일의 자리에서 2, 십의 자리에서 1을 올려 더해요.' }],
      explain: '일의 자리 $7 \\times 4=28$ → 8을 쓰고 2를 올려요. 십의 자리 $2 \\times 4=8$에 2를 더해 10 → 0을 쓰고 1을 올려요. 백의 자리 $1 \\times 4=4$에 1을 더해 5. 그래서 508이에요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: '$60 \\times 50$의 값은 무엇일까요?',
      choices: ['3000', '300', '30000', '110'],
      answer: 0,
      why: [
        '',
        '0을 1개만 붙였어요. 60과 50에 0이 하나씩 있으니 $6 \\times 5=30$에 0을 2개 붙여요.',
        '0을 3개 붙였어요. $6 \\times 5=30$에 0을 2개 붙이면 3000이에요.',
        '60과 50을 더했어요. 문제는 곱셈이에요.',
      ],
      explain: '$6 \\times 5=30$에 0을 2개 붙여 3000이에요. 30에 이미 0이 있어도 0을 2개 더 붙여요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', concept: 2,
      q: '계산해 보세요.\n\n$23 \\times 30$',
      answer: '690',
      wrong: [{ a: '69', why: '0을 빠뜨렸어요. $23 \\times 3=69$에 0을 하나 붙여요.' }],
      explain: '$23 \\times 3=69$이고, 30은 3의 10배이므로 0을 하나 붙여 690이에요.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', concept: 3,
      q: '계산해 보세요.\n\n$8 \\times 46$',
      answer: '368',
      wrong: [{ a: '80', why: '46의 4를 4로 보고 곱했어요. 46의 4는 40을 나타내므로 $8 \\times 40=320$이에요.' }],
      explain: '$8 \\times 6=48$, $8 \\times 40=320$이므로 $48+320=368$이에요.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 4,
      q: '$32 \\times 21$의 값은 $32 \\times 1$과 $32 \\times 20$을 더한 것과 같아요.',
      answer: true,
      explain: '21은 1과 20으로 나눌 수 있으니 $32 \\times 21=32 \\times 1+32 \\times 20=32+640=672$예요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'number', concept: 4,
      q: '계산해 보세요.\n\n$43 \\times 12$',
      answer: '516',
      wrong: [{ a: '129', why: '둘째 줄을 $43 \\times 1=43$으로 썼어요. 12의 1은 10을 나타내므로 $43 \\times 10=430$이에요.' }],
      explain: '$43 \\times 2=86$, $43 \\times 10=430$이므로 $86+430=516$이에요.',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '클립이 한 상자에 245개씩 들어 있어요. 6상자에 든 클립은 모두 몇 개일까요?',
      answer: '1470',
      hint: '245개씩 6상자이므로 곱셈식을 세워요.',
      wrong: [{ a: '1240', why: '올린 수를 윗자리에 더하지 않았어요. 일의 자리에서 3, 십의 자리에서 2를 올려 더해요.' }],
      explain: '$245 \\times 6$을 계산해요. 일의 자리 $5 \\times 6=30$ → 0을 쓰고 3을 올려요. 십의 자리 $4 \\times 6=24$에 3을 더해 27 → 7을 쓰고 2를 올려요. 백의 자리 $2 \\times 6=12$에 2를 더해 14. 그래서 1470개예요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '장', concept: 4,
      q: '학생 한 명에게 색종이를 15장씩 나누어 주려고 해요. 학생이 27명이면 색종이는 모두 몇 장 필요할까요?',
      answer: '405',
      hint: '15장씩 27명이므로 $15 \\times 27$을 계산해요.',
      wrong: [{ a: '135', why: '둘째 줄을 $15 \\times 2=30$으로 썼어요. 27의 2는 20을 나타내므로 $15 \\times 20=300$이에요.' }],
      explain: '$15 \\times 7=105$, $15 \\times 20=300$이므로 $105+300=405$장이 필요해요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 5,
      q: '두 수를 각각 몇십으로 어림했을 때 곱이 **약 1000**인 곱셈을 고르세요.',
      choices: ['$48 \\times 21$', '$39 \\times 31$', '$27 \\times 32$', '$19 \\times 42$'],
      answer: 0,
      why: [
        '',
        '39는 약 40, 31은 약 30이므로 $40 \\times 30=1200$, 약 1200이에요.',
        '27은 약 30, 32는 약 30이므로 $30 \\times 30=900$, 약 900이에요.',
        '19는 약 20, 42는 약 40이므로 $20 \\times 40=800$, 약 800이에요.',
      ],
      hint: '두 수를 가장 가까운 몇십으로 바꾸어 곱해 보세요.',
      explain: '48은 약 50, 21은 약 20이므로 $50 \\times 20=1000$, 약 1000이에요. (실제 값은 1008)',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: '원', concept: 5,
      q: '공책 한 권의 값은 650원이에요. 공책 4권을 사고 3000원을 냈다면 거스름돈은 얼마일까요?',
      answer: '400',
      hint: '먼저 공책 4권의 값을 구해요.',
      wrong: [
        { a: '2600', why: '2600원은 공책 4권의 값이에요. 낸 돈 3000원에서 빼야 거스름돈이에요.' },
        { a: '2350', why: '3000원에서 공책 한 권 값만 뺐어요. 공책 4권의 값은 $650 \\times 4$예요.' },
      ],
      explain: '공책 4권의 값은 $650 \\times 4=2600$원이에요. 거스름돈은 $3000-2600=400$원이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 4,
      q: '어떤 수에 25를 곱해야 할 것을 잘못하여 더했더니 61이 되었어요. 바르게 계산하면 얼마일까요?',
      answer: '900',
      hint: '먼저 거꾸로 생각해서 어떤 수를 구해요.',
      wrong: [
        { a: '36', why: '36은 어떤 수예요. 어떤 수에 25를 곱한 값까지 구해요.' },
        { a: '1525', why: '잘못 계산한 결과 61에 25를 곱했어요. 먼저 어떤 수를 구해요.' },
      ],
      explain: '어떤 수 $+25=61$이므로 어떤 수는 $61-25=36$이에요. 바르게 계산하면 $36 \\times 25$: $36 \\times 5=180$, $36 \\times 20=720$, $180+720=900$이에요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: '숫자 카드 2, 4, 6, 8을 한 번씩만 써서 (두 자리 수)×(두 자리 수)를 만들려고 해요. 곱이 **가장 크게** 될 때의 곱은 얼마일까요?',
      choices: ['5248', '5208', '3612', '2856'],
      answer: 0,
      why: [
        '',
        '$84 \\times 62$를 만들었어요. 8과 6을 십의 자리에 둔 것은 좋아요. 일의 자리 4와 2를 바꾼 $82 \\times 64$와도 비교해 보세요.',
        '$86 \\times 42$를 만들었어요. 큰 숫자 8과 6을 한 수에 모으면 다른 수가 작아져요. 십의 자리에 8과 6을 나누어 두어요.',
        '$68 \\times 42$를 만들었어요. 십의 자리에 큰 숫자를 두어야 곱이 커져요.',
      ],
      hint: '십의 자리가 곱을 크게 좌우해요. 8과 6을 어디에 둘지 먼저 정한 뒤 남은 두 숫자의 자리를 바꾸어 비교해요.',
      explain: '십의 자리에 가장 큰 8과 6을 나누어 두면 $84 \\times 62=5208$, $82 \\times 64=5248$이 나와요. 둘 중 더 큰 곱은 $82 \\times 64=5248$이에요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', concept: 2,
      q: '$\\square$ 안에 들어갈 수 있는 수 가운데 가장 큰 한 자리 수를 구하세요.\n\n$\\square0 \\times 40<2000$',
      answer: '4',
      hint: '$\\square0 \\times 40$은 $\\square \\times 4$에 0을 2개 붙인 수예요.',
      wrong: [{ a: '5', why: '$50 \\times 40=2000$이에요. 2000과 같으면 2000보다 작지 않아요.' }],
      explain: '$\\square0 \\times 40$은 $\\square \\times 4$에 0을 2개 붙인 수예요. $40 \\times 40=1600$은 2000보다 작고, $50 \\times 40=2000$은 2000보다 작지 않아요. 그래서 가장 큰 수는 4예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: '명', concept: 5,
      q: '학생들이 한 줄에 23명씩 18줄로 섰더니 7명이 남았어요. 학생은 모두 몇 명일까요?',
      answer: '421',
      hint: '줄에 선 학생 수를 먼저 구하고, 남은 학생을 더해요.',
      wrong: [
        { a: '414', why: '414명은 줄에 선 학생 수예요. 남은 7명도 더해요.' },
        { a: '407', why: '남은 7명을 뺐어요. 줄에 서지 못하고 남은 학생도 학생 수에 들어가요.' },
      ],
      explain: '줄에 선 학생은 $23 \\times 18$: $23 \\times 8=184$, $23 \\times 10=230$, $184+230=414$명이에요. 남은 7명을 더하면 $414+7=421$명이에요.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'number', concept: 1,
      q: '$\\square$ 안에 알맞은 숫자를 쓰세요.\n\n$2\\square7 \\times 4=1108$',
      answer: '7',
      hint: '일의 자리 $7 \\times 4=28$에서 올리는 수부터 생각해요.',
      wrong: [{ a: '277', why: '277은 세 자리 수 전체예요. $\\square$ 안에 들어갈 숫자 하나만 써요.' }],
      explain: '일의 자리 $7 \\times 4=28$ → 8을 쓰고 2를 올려요. 곱의 십의 자리가 0이므로 $\\square \\times 4+2$의 일의 자리가 0이어야 해요. $\\square=2$이면 10, $\\square=7$이면 30이에요. $\\square=2$이면 $227 \\times 4=908$, $\\square=7$이면 $277 \\times 4=1108$이므로 $\\square=7$이에요.',
    },
  ],

  deeper: [
    {
      title: '넓이 모형으로 보는 두 자리 수의 곱셈',
      body: '$36 \\times 24$를 가로 36칸, 세로 24칸인 직사각형의 칸 수라고 생각해 보세요. 가로를 30과 6으로, 세로를 20과 4로 자르면 네 조각이 생겨요.\n\n$30 \\times 20=600$, $6 \\times 20=120$, $30 \\times 4=120$, $6 \\times 4=24$\n\n네 조각을 모두 더하면 $600+120+120+24=864$예요. 세로셈의 첫째 줄 $36 \\times 4=144$는 아래쪽 두 조각($120+24$), 둘째 줄 $36 \\times 20=720$은 위쪽 두 조각($600+120$)을 합친 것이에요.\n\n4학년에서는 $243 \\times 35$처럼 (세 자리 수)×(두 자리 수)를 배우는데, 이 방법이 그대로 쓰여요.',
    },
  ],

  faq: [
    {
      q: '두 자리 수끼리 곱할 때 둘째 줄에 0을 왜 써요?',
      a: '둘째 줄은 곱하는 수의 **십의 자리**를 곱한 값이기 때문이에요. $24 \\times 13$에서 13의 1은 10을 나타내므로 둘째 줄은 $24 \\times 10=240$이에요.\n\n0을 쓰지 않고 24로 쓰면 $72+24=96$이 되어 크게 틀려요. 0을 생략하는 사람도 있지만, 그때는 한 칸 왼쪽으로 옮겨 써서 자리를 맞추어야 해요.',
    },
    {
      q: '$6 \\times 24$처럼 한 자리 수가 앞에 있으면 어떻게 해요?',
      a: '곱셈은 두 수의 순서를 바꾸어도 곱이 같아요. $6 \\times 24=24 \\times 6$이므로 익숙한 모양으로 바꾸어 세로셈으로 계산하면 돼요. 또는 24를 20과 4로 나누어 $6 \\times 20+6 \\times 4=120+24=144$로 구해도 돼요.',
    },
    {
      q: '어림한 값과 실제 값이 다르면 틀린 거예요?',
      a: '아니에요. 어림한 값은 "대강 얼마쯤"이라 실제 값과 조금 달라요. $29 \\times 31$은 약 900이고 실제 값은 899예요.\n\n다만 실제로 계산한 값이 어림한 값과 아주 많이(예: 10배쯤) 다르면, 0을 빠뜨리거나 자리를 잘못 맞춘 실수가 있는지 살펴보세요.',
    },
  ],

  mistakes: [
    '두 자리 수끼리 곱할 때 둘째 줄을 십의 자리 숫자만큼만 곱하는 실수 — $24 \\times 13$의 둘째 줄은 $24 \\times 1=24$가 아니라 $24 \\times 10=240$이에요.',
    '(몇십)×(몇십)에서 0을 하나만 붙이는 실수 — $30 \\times 20=600$이에요. 0이 두 수에 하나씩, 모두 2개예요.',
    '세 자리 수의 곱셈에서 올린 수를 더하지 않는 실수 — 올린 수는 윗자리를 곱한 다음에 꼭 더해요.',
  ],

  gens: [
    {
      id: 'mul-3by1',
      level: 1,
      title: '올림이 있는 (세 자리 수)×(한 자리 수)',
      make: function (R) {
        var k = R.int(2, 9), n, w;
        do { n = R.int(101, 989); w = colWork(n, k, R); } while (w.carries === 0 || n % 10 === 0);
        return {
          type: 'short', check: 'number', concept: 1,
          q: '계산해 보세요.\n\n$' + n + ' \\times ' + k + '$',
          answer: String(w.ans),
          wrong: [{ a: String(w.noCarry), why: '올린 수를 윗자리에 더하지 않았어요. 윗자리를 곱한 다음에 올린 수를 꼭 더해요.' }],
          explain: '일의 자리부터 곱해요.\n' + w.lines.join('\n') + '\n\n그래서 $' + n + ' \\times ' + k + '=' + w.ans + '$' + R.josa(w.ans, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'mul-tens-1by2',
      level: 1,
      title: '(몇십)×(몇십), (몇십몇)×(몇십), (몇)×(몇십몇)',
      make: function (R) {
        if (R.bool(0.6)) {
          var b = R.int(2, 9);
          if (R.bool()) {
            var a = R.int(2, 9), p = a * b, ans = p * 100;
            return {
              type: 'short', check: 'number', concept: 2,
              q: '계산해 보세요.\n\n$' + (a * 10) + ' \\times ' + (b * 10) + '$',
              answer: String(ans),
              wrong: [
                { a: String(p * 10), why: '0을 1개만 붙였어요. ' + (a * 10) + R.josa(a * 10, '과/와') + ' ' + (b * 10) + '에 0이 하나씩 있으니 0을 2개 붙여요.' },
                { a: String(p * 1000), why: '0을 3개 붙였어요. $' + a + ' \\times ' + b + '=' + p + '$에 0을 2개만 붙여요.' },
              ],
              explain: '$' + a + ' \\times ' + b + '=' + p + '$에 0을 2개 붙이면 ' + ans + R.josa(ans, '이에요/예요') + '.',
            };
          }
          var m = R.int(11, 49);
          while (m % 10 === 0) m = R.int(11, 49);
          var q = m * b, ans2 = q * 10;
          return {
            type: 'short', check: 'number', concept: 2,
            q: '계산해 보세요.\n\n$' + m + ' \\times ' + (b * 10) + '$',
            answer: String(ans2),
            wrong: [
              { a: String(q), why: '0을 빠뜨렸어요. $' + m + ' \\times ' + b + '=' + q + '$에 0을 하나 붙여요.' },
              { a: String(q * 100), why: '0을 2개 붙였어요. ' + (b * 10) + '에만 0이 있으니 0을 하나만 붙여요.' },
            ],
            explain: '$' + m + ' \\times ' + b + '=' + q + '$, ' + (b * 10) + R.josa(b * 10, '은/는') + ' ' + b + '의 10배이므로 0을 하나 붙여 ' + ans2 + R.josa(ans2, '이에요/예요') + '.',
          };
        }
        var a = R.int(2, 9), t = R.int(1, 9), o = R.int(1, 9), m = t * 10 + o;
        var p1 = a * o, p2 = a * t * 10, ans = p1 + p2;
        var wrong = [];
        if (p1 + a * t !== ans) wrong.push({ a: String(p1 + a * t), why: m + '의 ' + t + R.josa(t, '을/를') + ' ' + t + R.josa(t, '으로/로') + ' 보고 곱했어요. ' + t + R.josa(t, '은/는') + ' ' + (t * 10) + R.josa(t * 10, '을/를') + ' 나타내므로 $' + a + ' \\times ' + (t * 10) + '=' + p2 + '$' + R.josa(p2, '이에요/예요') + '.' });
        return {
          type: 'short', check: 'number', concept: 3,
          q: '계산해 보세요.\n\n$' + a + ' \\times ' + m + '$',
          answer: String(ans),
          wrong: wrong,
          explain: m + R.josa(m, '을/를') + ' ' + (t * 10) + R.josa(t * 10, '과/와') + ' ' + o + R.josa(o, '으로/로') + ' 나누어 곱해요. $' + a + ' \\times ' + o + '=' + p1 + '$, $' + a + ' \\times ' + (t * 10) + '=' + p2 + '$이므로 $' + p1 + '+' + p2 + '=' + ans + '$' + R.josa(ans, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'mul-2by2',
      level: 2,
      title: '(몇십몇)×(몇십몇)',
      make: function (R) {
        var a = R.int(12, 98), b = R.int(12, 49);
        while (a % 10 === 0) a = R.int(12, 98);
        while (b % 10 === 0 || b % 10 === 1 && R.bool(0.7)) b = R.int(12, 49);
        var tb = Math.floor(b / 10), ob = b % 10;
        var p1 = a * ob, p2 = a * tb * 10, ans = a * b;
        var wrong = [{ a: String(p1 + a * tb), why: '둘째 줄을 $' + a + ' \\times ' + tb + '=' + (a * tb) + '$' + R.josa(a * tb, '으로/로') + ' 썼어요. ' + b + '의 ' + tb + R.josa(tb, '은/는') + ' ' + (tb * 10) + R.josa(tb * 10, '을/를') + ' 나타내므로 $' + a + ' \\times ' + (tb * 10) + '=' + p2 + '$' + R.josa(p2, '이에요/예요') + '.' }];
        var same = Math.floor(a / 10) * 10 * tb * 10 + (a % 10) * ob;
        if (same !== ans && same !== p1 + a * tb) wrong.push({ a: String(same), why: '같은 자리끼리만 곱했어요. $' + a + ' \\times ' + ob + '$' + R.josa(ob, '과/와') + ' $' + a + ' \\times ' + (tb * 10) + '$' + R.josa(tb * 10, '을/를') + ' 모두 구해 더해요.' });
        var story = R.bool(0.4);
        var thing = R.pick([['한 상자에 귤이', '개', '상자'], ['한 묶음에 색종이가', '장', '묶음'], ['한 봉지에 사탕이', '개', '봉지'], ['한 줄에 의자가', '개', '줄']]);
        var q = story
          ? thing[0] + ' ' + a + thing[1] + '씩 있어요. ' + b + thing[2] + '에는 모두 몇 ' + thing[1] + '일까요?'
          : '계산해 보세요.\n\n$' + a + ' \\times ' + b + '$';
        var p = {
          type: 'short', check: 'number', concept: story ? 5 : 4,
          q: q,
          answer: String(ans),
          wrong: wrong,
          explain: (story ? a + thing[1] + '씩 ' + b + thing[2] + '이므로 $' + a + ' \\times ' + b + '$' + R.josa(b, '을/를') + ' 계산해요.\n' : '') +
            b + R.josa(b, '을/를') + ' ' + ob + R.josa(ob, '과/와') + ' ' + (tb * 10) + R.josa(tb * 10, '으로/로') + ' 나누어 곱해요.\n' +
            '첫째 줄: $' + a + ' \\times ' + ob + '=' + p1 + '$\n둘째 줄: $' + a + ' \\times ' + (tb * 10) + '=' + p2 + '$\n\n' +
            '두 줄을 더하면 $' + p1 + '+' + p2 + '=' + ans + '$' + R.josa(ans, '이에요/예요') + '.',
        };
        if (story) p.unit = thing[1];
        return p;
      },
    },
    {
      id: 'mul-2by2-reverse',
      level: 3,
      title: '잘못 계산한 결과에서 바른 곱 구하기',
      make: function (R) {
        var b = R.int(12, 39), x = R.int(12, 59);
        while (b % 10 === 0) b = R.int(12, 39);
        while (x % 10 === 0 || x === b) x = R.int(12, 59);
        var wrongSum = x + b, ans = x * b;
        var tb = Math.floor(b / 10), ob = b % 10;
        return {
          type: 'short', check: 'number', concept: 4,
          q: '어떤 수에 ' + b + R.josa(b, '을/를') + ' 곱해야 할 것을 잘못하여 더했더니 ' + wrongSum + R.josa(wrongSum, '이/가') + ' 되었어요. 바르게 계산하면 얼마일까요?',
          answer: String(ans),
          hint: '먼저 거꾸로 생각해서 어떤 수를 구해요.',
          wrong: [
            { a: String(x), why: x + R.josa(x, '은/는') + ' 어떤 수예요. 어떤 수에 ' + b + R.josa(b, '을/를') + ' 곱한 값까지 구해요.' },
            { a: String(wrongSum * b), why: '잘못 계산한 결과 ' + wrongSum + '에 ' + b + R.josa(b, '을/를') + ' 곱했어요. 먼저 어떤 수를 구해요.' },
          ],
          explain: '어떤 수 $+' + b + '=' + wrongSum + '$이므로 어떤 수는 $' + wrongSum + '-' + b + '=' + x + '$' + R.josa(x, '이에요/예요') + '.\n\n' +
            '바르게 계산하면 $' + x + ' \\times ' + b + '$: $' + x + ' \\times ' + ob + '=' + (x * ob) + '$, $' + x + ' \\times ' + (tb * 10) + '=' + (x * tb * 10) + '$, 더하면 ' + ans + R.josa(ans, '이에요/예요') + '.',
        };
      },
    },
  ],
});
})();
