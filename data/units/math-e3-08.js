/* 3학년 수학 · 나눗셈(몫과 나머지)
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 나눗셈 세로셈(ldiv)·묶고 남은 그림(leftover)은 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  function tx(x, y, size, fill, s) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" text-anchor="middle" fill="' + fill + '">' + s + '</text>';
  }
  // 나눗셈 세로셈. d: 나누는 수, n: 나누어지는 수, q: 몫,
  // rows: [글, 끝 자리(나누어지는 수의 왼쪽부터 0), 아래에 줄을 그을지] — 빼는 수와 남은 수를 차례로
  function ldiv(d, n, q, rows, alt) {
    var ns = String(n), len = ns.length, s = '';
    function cx(j) { return 124 + 30 * j; }
    function put(str, endCol, y, fill) {
      str = String(str);
      for (var i = 0; i < str.length; i++) s += tx(cx(endCol - (str.length - 1 - i)), y, 26, fill, str.charAt(i));
    }
    var right = cx(len - 1) + 18;
    s += tx(78, 76, 26, 'currentColor', d);
    s += '<path d="M98 46 Q110 66 98 86" fill="none" stroke="currentColor" stroke-width="2"/>';
    s += '<line x1="98" y1="46" x2="' + right + '" y2="46" stroke="currentColor" stroke-width="2"/>';
    put(q, len - 1, 34, 'var(--fig-1)');
    put(ns, len - 1, 76, 'currentColor');
    var y = 76;
    rows.forEach(function (r) {
      y += 34;
      put(r[0], r[1], y, r[2] ? 'var(--fig-2)' : 'currentColor');
      if (r[2]) {
        var start = cx(r[1] - String(r[0]).length + 1) - 16;
        s += '<line x1="' + start + '" y1="' + (y + 8) + '" x2="' + right + '" y2="' + (y + 8) + '" stroke="currentColor" stroke-width="2"/>';
        y += 6;
      }
    });
    var W = Math.max(220, right + 30);
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' ' + (y + 14) + '">' + s + '</svg>', alt: alt };
  }

  // g 묶음(묶음마다 per 개)을 네모로 묶고, 남은 r 개는 따로 놓은 그림
  function leftover(g, per, r, alt) {
    var cols = per <= 5 ? per : Math.ceil(per / 2), rowsN = Math.ceil(per / cols);
    var bw = cols * 18 + 14, bh = rowsN * 18 + 14, gap = 14, s = '';
    var perLine = Math.min(g, 4), W = 0, lastX = 0, lastY = 0;
    for (var k = 0; k < g; k++) {
      var bx = 4 + (k % perLine) * (bw + gap), by = 4 + Math.floor(k / perLine) * (bh + gap);
      s += '<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + bh + '" rx="10" fill="none" stroke="var(--fig-2)" stroke-width="2"/>';
      for (var i = 0; i < per; i++) s += '<circle cx="' + (bx + 16 + (i % cols) * 18) + '" cy="' + (by + 16 + Math.floor(i / cols) * 18) + '" r="6" fill="var(--fig-1)"/>';
      W = Math.max(W, bx + bw + 4); lastX = bx + bw; lastY = by;
    }
    // 남은 것은 마지막 묶음 오른쪽에 (자리가 없으면 다음 줄에)
    var lx = lastX + 14, ly = lastY + 16;
    if (lx + r * 18 > 4 * (bw + gap) + 20) { lx = 4; ly = lastY + bh + gap + 12; }
    for (var j = 0; j < r; j++) s += '<circle cx="' + (lx + 8 + j * 18) + '" cy="' + ly + '" r="6" fill="var(--fig-4)"/>';
    W = Math.max(220, W, lx + r * 18 + 10);
    var H = Math.max(lastY + bh + 8, ly + 14);
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' ' + H + '">' + s + '</svg>', alt: alt };
  }

  var PLACE = ['일', '십', '백'];
  // (두·세 자리 수) ÷ (한 자리 수) 를 높은 자리부터 따라가며 풀이 줄을 만든다.
  // noBring: 나누고 남은 수를 아랫자리로 내리지 않았을 때(자리마다 따로 나눈) 몫
  function divWork(n, d, R) {
    var ds = String(n).split('').map(Number), len = ds.length, cur = 0, q = 0, lines = [], started = false, noBring = 0;
    for (var i = 0; i < len; i++) {
      var place = PLACE[len - 1 - i], last = i === len - 1;
      cur = cur * 10 + ds[i];
      noBring = noBring * 10 + Math.floor(ds[i] / d);
      if (!started && cur < d && !last) {
        lines.push(place + '의 자리: ' + cur + R.josa(cur, '은/는') + ' ' + d + '보다 작아서 나눌 수 없어요. 아랫자리와 함께 ' + (cur * 10 + ds[i + 1]) + R.josa(cur * 10 + ds[i + 1], '을/를') + ' 나누어요.');
        continue;
      }
      started = true;
      var qd = Math.floor(cur / d), rem = cur - qd * d;
      q = q * 10 + qd;
      var line;
      if (qd === 0) {
        line = place + '의 자리: ' + cur + R.josa(cur, '은/는') + ' ' + d + '보다 작아서 몫의 ' + place + '의 자리에 0을 써요.';
      } else {
        line = place + '의 자리: $' + cur + ' \\div ' + d + '=' + qd + (rem ? ' \\cdots ' + rem : '') + '$ → 몫의 ' + place + '의 자리에 ' + qd + R.josa(qd, '을/를') + ' 써요.';
      }
      if (!last && rem) line += ' 남은 ' + rem + R.josa(rem, '을/를') + ' 아랫자리로 내려 ' + (rem * 10 + ds[i + 1]) + R.josa(rem * 10 + ds[i + 1], '을/를') + ' 만들어요.';
      lines.push(line);
      cur = rem;
    }
    // 맨 앞자리가 나누는 수보다 작으면 "내리지 않은 답"이 뜻이 없으므로 몫과 같게 둔다(진단하지 않음)
    if (ds[0] < d) noBring = q;
    return { q: q, r: cur, lines: lines, noBring: noBring };
  }

Tutor.registerUnit({
  id: 'math-e3-08',
  course: 'math-e3',
  title: '나눗셈(몫과 나머지)',
  summary: '두 자리 수나 세 자리 수를 한 자리 수로 나누어 몫과 나머지를 구하고, 맞게 계산했는지 확인해요.',
  goals: [
    '(몇십)÷(몇), (몇십몇)÷(몇)을 내림이 있어도 계산할 수 있어요.',
    '나머지가 있는 나눗셈을 하고, 나머지는 나누는 수보다 작다는 것을 알아요.',
    '나누는 수와 몫을 곱하고 나머지를 더해 계산이 맞는지 확인할 수 있어요.',
    '(세 자리 수)÷(한 자리 수)를 계산하고, 몫을 어림할 수 있어요.',
  ],
  standards: ['[4수01-06]', '[4수01-08]'],

  concepts: [
    {
      title: '(몇십)÷(몇)',
      body: '$60 \\div 3$은 얼마일까요? 60은 10이 6개예요. 10짜리 6개를 3묶음으로 똑같이 나누면 한 묶음에 10짜리가 $6 \\div 3=2$개씩, 곧 20이에요.\n\n$60 \\div 3=20$\n\n$50 \\div 2$처럼 십의 자리를 나누고 **남는 것이 있을 때**는 남은 10을 일 모형 10개로 바꾸어 다시 나눠요.\n\n- 십의 자리: $5 \\div 2=2 \\cdots 1$ → 몫의 십의 자리에 2\n- 남은 10을 내려서: $10 \\div 2=5$ → 몫의 일의 자리에 5\n\n그래서 $50 \\div 2=25$예요.\n\n> 💡 확인: $2 \\times 25=50$',
      easy: '10원짜리 동전 5개(50원)를 두 사람이 똑같이 나눈다고 생각해 보세요. 10원짜리를 2개씩 나누어 가지면 1개가 남지요.\n\n남은 10원짜리 1개를 1원짜리 10개로 바꾸면 5개씩 나눌 수 있어요. 그래서 한 사람이 20원 + 5원 = 25원을 가져요.',
      fig: ldiv(2, 50, 25, [['4', 0, true], ['10', 1], ['10', 1, true], ['0', 1]], '50 나누기 2의 나눗셈 세로셈. 몫 25'),
      check: {
        type: 'choice',
        q: '$80 \\div 4$의 값은 무엇일까요?',
        choices: ['20', '2', '200'],
        answer: 0,
        why: ['', '0을 빠뜨렸어요. 80은 10이 8개이므로 몫은 10이 $8 \\div 4=2$개, 곧 20이에요.', '0을 하나 더 붙였어요. 80은 10이 8개이므로 몫은 10이 2개, 곧 20이에요.'],
        explain: '80은 10이 8개예요. $8 \\div 4=2$이므로 몫은 10이 2개, 20이에요. 확인: $4 \\times 20=80$',
      },
    },
    {
      title: '(몇십몇)÷(몇)',
      body: '두 자리 수를 나눌 때는 **십의 자리부터** 나누어요.\n\n**내림이 없을 때** $48 \\div 2$\n- 십의 자리: $4 \\div 2=2$ → 몫의 십의 자리에 2\n- 일의 자리: $8 \\div 2=4$ → 몫의 일의 자리에 4\n- $48 \\div 2=24$\n\n**내림이 있을 때** $52 \\div 4$\n- 십의 자리: $5 \\div 4=1 \\cdots 1$ → 몫의 십의 자리에 1, 남은 1(10을 나타내요)을 일의 자리로 내려요.\n- 일의 자리: 내린 1과 2를 합친 12를 나누어요. $12 \\div 4=3$\n- $52 \\div 4=13$\n\n> ⚠️ 십의 자리를 나누고 남은 1을 내리지 않으면 일의 자리 2만 4로 나누게 되어, $52 \\div 4$를 10으로 잘못 계산하게 돼요.',
      easy: '52를 십 모형 5개와 일 모형 2개로 생각해 보세요. 4명에게 십 모형을 1개씩 나누어 주면 1개가 남아요.\n\n남은 십 모형 1개를 일 모형 10개로 바꾸면 일 모형은 12개. 4명에게 3개씩 나누어 줄 수 있어요. 그래서 한 명이 십 모형 1개와 일 모형 3개, 곧 13을 받아요.',
      fig: ldiv(4, 52, 13, [['4', 0, true], ['12', 1], ['12', 1, true], ['0', 1]], '52 나누기 4의 나눗셈 세로셈. 몫 13'),
      check: {
        type: 'short', check: 'number',
        q: '계산해 보세요.\n\n$56 \\div 4$',
        answer: '14',
        wrong: [{ a: '11', why: '십의 자리를 나누고 남은 1을 일의 자리로 내리지 않았어요. 남은 1과 6을 합친 16을 4로 나누어요.' }],
        explain: '십의 자리 $5 \\div 4=1 \\cdots 1$ → 몫의 십의 자리에 1, 남은 1을 내려 16. $16 \\div 4=4$ → 몫의 일의 자리에 4. 그래서 14예요.',
      },
    },
    {
      title: '나머지가 있는 나눗셈',
      body: '사탕 17개를 한 봉지에 5개씩 담으면 3봉지가 되고 2개가 남아요. 이것을 이렇게 써요.\n\n$17 \\div 5=3 \\cdots 2$\n\n"17 나누기 5는 3이고 나머지는 2입니다"라고 읽어요. 이때 3은 **몫**, 2는 **나머지**예요.\n\n- **나머지는 나누는 수보다 항상 작아요.** 나머지가 5이거나 5보다 크면 한 봉지를 더 담을 수 있으니까요.\n- 나머지가 0일 때, 곧 남는 것이 없을 때 **나누어떨어진다**고 해요. 예: $15 \\div 5=3$',
      easy: '친구들과 딱지를 5장씩 나누어 갖는 놀이를 해 봐요. 딱지 17장에서 5장씩 덜어 내면 5장, 5장, 5장 — 세 번 덜어 내고 2장이 남아요. 남은 2장으로는 5장 묶음을 만들 수 없지요.\n\n이 "남은 2장"이 나머지예요.',
      fig: leftover(3, 5, 2, '5개씩 묶은 묶음 3개와 묶이지 않고 남은 2개'),
      check: {
        type: 'ox',
        q: '$23 \\div 4=4 \\cdots 7$은 바른 계산이에요.',
        answer: false,
        explain: '나머지 7이 나누는 수 4보다 커요. 4개씩 한 번 더 묶을 수 있으니 몫을 1 크게 해요. 바른 계산은 $23 \\div 4=5 \\cdots 3$이에요.',
      },
    },
    {
      title: '계산이 맞는지 확인하기',
      body: '나눗셈을 맞게 했는지는 곱셈과 덧셈으로 확인할 수 있어요.\n\n**나누는 수 × 몫 + 나머지 = 나누어지는 수**\n\n$17 \\div 5=3 \\cdots 2$ → $5 \\times 3+2=17$ (맞아요!)\n\n봉지 3개에 5개씩 담은 사탕 15개와 남은 2개를 합치면 처음 사탕 17개가 되지요.\n\n> 💡 확인한 결과가 나누어지는 수와 다르면 몫이나 나머지를 다시 계산해요. 그리고 나머지가 나누는 수보다 작은지도 함께 살펴봐요.',
      easy: '나눗셈은 "나누어 담기", 확인은 "다시 모으기"예요. 봉지에 담은 것(나누는 수 × 몫)과 남은 것(나머지)을 다시 모았을 때 처음 개수가 되면 맞게 나눈 거예요.',
      check: {
        type: 'choice',
        q: '$38 \\div 5=7 \\cdots 3$을 맞게 계산했는지 확인하는 식은 무엇일까요?',
        choices: ['$5 \\times 7+3=38$', '$5 \\times 3+7=22$', '$7 \\times 3+5=26$'],
        answer: 0,
        why: ['', '몫과 나머지의 자리를 바꾸었어요. 나누는 수에는 몫을 곱하고, 나머지는 더해요.', '나누는 수 5 대신 나머지 3을 곱했어요. 나누는 수 × 몫 + 나머지예요.'],
        explain: '나누는 수 × 몫 + 나머지 = 나누어지는 수이므로 $5 \\times 7+3=38$이에요. 38이 나오니 맞게 계산했어요.',
      },
    },
    {
      title: '(세 자리 수)÷(한 자리 수)',
      body: '세 자리 수도 **높은 자리부터** 차례로 나누어요. 남은 수는 아랫자리로 내려 함께 나누어요.\n\n$369 \\div 3$ → $3 \\div 3=1$, $6 \\div 3=2$, $9 \\div 3=3$ → 123\n\n**백의 자리 수가 나누는 수보다 작을 때** $252 \\div 6$\n- 백의 자리 2는 6보다 작아서 나눌 수 없어요. 그래서 25를 나누어요.\n- $25 \\div 6=4 \\cdots 1$ → 몫의 **십의 자리**에 4, 남은 1을 내려 12\n- $12 \\div 6=2$ → 몫의 일의 자리에 2\n- $252 \\div 6=42$ (몫이 두 자리 수예요)\n\n**몫의 가운데에 0이 들어갈 때** $618 \\div 6$ → $6 \\div 6=1$, 십의 자리 1은 6보다 작아서 몫의 십의 자리에 0, 내려서 $18 \\div 6=3$ → 103',
      easy: '100원짜리 동전 2개, 10원짜리 5개, 1원짜리 2개(252원)를 6명이 나눈다고 생각해 보세요. 100원짜리 2개로는 6명에게 나눌 수 없으니 10원짜리 25개로 바꾸어 나누어요. 한 명에게 10원짜리 4개씩 주면 1개가 남지요.\n\n남은 10원짜리를 1원짜리 10개로 바꾸면 1원짜리가 12개, 한 명에게 2개씩 줄 수 있어요. 한 명이 42원씩 받아요.',
      fig: ldiv(6, 252, 42, [['24', 1, true], ['12', 2], ['12', 2, true], ['0', 2]], '252 나누기 6의 나눗셈 세로셈. 몫 42'),
      check: {
        type: 'short', check: 'number',
        q: '계산해 보세요.\n\n$486 \\div 2$',
        answer: '243',
        wrong: [{ a: '484', why: '486에서 2를 뺐어요. 백의 자리부터 차례로 2로 나누어요.' }],
        explain: '백의 자리 $4 \\div 2=2$, 십의 자리 $8 \\div 2=4$, 일의 자리 $6 \\div 2=3$이므로 243이에요. 확인: $2 \\times 243=486$',
      },
    },
    {
      title: '나눗셈의 몫 어림하기',
      body: '나누어지는 수를 **나누기 쉬운 가까운 수**로 바꾸면 몫을 어림할 수 있어요.\n\n$158 \\div 4$ → 158은 160에 가까워요 → $160 \\div 4=40$ ($16 \\div 4=4$이므로) → 몫은 약 40\n\n실제로 계산하면 $158 \\div 4=39 \\cdots 2$이니 어림한 값과 비슷해요.\n\n> 💡 계산한 몫이 어림한 값과 아주 다르면(예: 4나 400) 자리를 잘못 쓴 것이 아닌지 살펴봐요.',
      easy: '귤 158개를 4상자에 나누어 담으면 한 상자에 몇 개쯤일까요? 158은 160과 거의 같고, 160개를 4상자에 나누면 40개씩이에요. 그러니 "한 상자에 40개쯤"이라고 어림할 수 있어요.',
      fig: { type: 'numberline', min: 150, max: 170, step: 1, labelEvery: 5, points: [{ x: 158, label: '158' }], alt: '150부터 170까지의 수직선. 158이 160 가까이에 표시되어 있음' },
      check: {
        type: 'choice',
        q: '$243 \\div 6$의 몫을 어림한 값으로 알맞은 것은 무엇일까요?',
        choices: ['약 40', '약 4', '약 400'],
        answer: 0,
        why: ['', '0을 빠뜨렸어요. $240 \\div 6$은 $24 \\div 6=4$에 0을 붙여 40이에요.', '0을 하나 더 붙였어요. 240은 10이 24개이므로 몫은 10이 4개, 40이에요.'],
        explain: '243은 240에 가까워요. $24 \\div 6=4$이므로 $240 \\div 6=40$, 몫은 약 40이에요. (실제로는 $243 \\div 6=40 \\cdots 3$)',
      },
    },
  ],

  examples: [
    {
      q: '계산해 보세요.\n\n$76 \\div 3$',
      steps: [
        '십의 자리: $7 \\div 3=2 \\cdots 1$ → 몫의 십의 자리에 2를 쓰고, 남은 1을 일의 자리로 내려요.',
        '일의 자리: 내린 1과 6을 합친 16을 나누어요. $16 \\div 3=5 \\cdots 1$',
        '몫은 25, 나머지는 1이에요. 나머지 1은 나누는 수 3보다 작으니 알맞아요.',
        '확인: $3 \\times 25+1=76$',
      ],
      answer: '$76 \\div 3=25 \\cdots 1$',
    },
    {
      q: '계산해 보세요.\n\n$457 \\div 4$',
      steps: [
        '백의 자리: $4 \\div 4=1$ → 몫의 백의 자리에 1',
        '십의 자리: $5 \\div 4=1 \\cdots 1$ → 몫의 십의 자리에 1, 남은 1을 내려 17',
        '일의 자리: $17 \\div 4=4 \\cdots 1$ → 몫의 일의 자리에 4, 나머지 1',
        '확인: $4 \\times 114+1=457$',
      ],
      answer: '$457 \\div 4=114 \\cdots 1$',
    },
    {
      q: '사탕 50개를 한 봉지에 6개씩 담으면 몇 봉지가 되고, 몇 개가 남을까요?',
      fig: leftover(8, 6, 2, '6개씩 묶은 묶음 8개와 남은 2개'),
      steps: [
        '6개씩 묶어 덜어 내는 상황이니 $50 \\div 6$을 계산해요.',
        '6단 곱셈구구에서 50을 넘지 않는 가장 큰 수는 $6 \\times 8=48$이에요.',
        '$50-48=2$이므로 $50 \\div 6=8 \\cdots 2$',
        '확인: $6 \\times 8+2=50$',
      ],
      answer: '8봉지가 되고 2개가 남아요.',
    },
  ],

  terms: [
    { term: '몫', def: '나눗셈의 결과예요. $17 \\div 5=3 \\cdots 2$에서 3이 몫이에요.' },
    { term: '나머지', def: '똑같이 나누고 남은 수예요. $17 \\div 5=3 \\cdots 2$에서 2가 나머지예요. 나머지는 나누는 수보다 작아요.' },
    { term: '나누어떨어진다', def: '나머지가 0일 때, 곧 남는 것 없이 똑같이 나누어질 때 "나누어떨어진다"고 해요. 예: $15 \\div 5=3$' },
    { term: '나누어지는 수', def: '나눗셈식에서 $\\div$ 앞에 있는 수예요. $17 \\div 5$에서 17이에요.' },
    { term: '나누는 수', def: '나눗셈식에서 $\\div$ 뒤에 있는 수예요. $17 \\div 5$에서 5예요.' },
    { term: '내림', def: '나눗셈에서 윗자리를 나누고 남은 수를 아랫자리로 내려 아랫자리 수와 함께 나누는 것이에요. 예: $52 \\div 4$에서 십의 자리에 남은 1을 내려 12를 나누어요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
      q: '계산해 보세요.\n\n$90 \\div 3$',
      answer: '30',
      wrong: [{ a: '3', why: '0을 빠뜨렸어요. 90은 10이 9개이므로 몫은 10이 $9 \\div 3=3$개, 곧 30이에요.' }],
      explain: '90은 10이 9개예요. $9 \\div 3=3$이므로 몫은 30이에요. 확인: $3 \\times 30=90$',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', concept: 1,
      q: '계산해 보세요.\n\n$68 \\div 2$',
      answer: '34',
      wrong: [{ a: '66', why: '68에서 2를 뺐어요. 십의 자리부터 차례로 2로 나누어요.' }],
      explain: '십의 자리 $6 \\div 2=3$, 일의 자리 $8 \\div 2=4$이므로 34예요. 확인: $2 \\times 34=68$',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '$75 \\div 5$의 값은 무엇일까요?',
      choices: ['15', '11', '70'],
      answer: 0,
      why: [
        '',
        '십의 자리를 나누고 남은 2를 일의 자리로 내리지 않았어요. 남은 2와 5를 합친 25를 5로 나누어요.',
        '75에서 5를 뺐어요. 십의 자리부터 차례로 5로 나누어요.',
      ],
      explain: '십의 자리 $7 \\div 5=1 \\cdots 2$ → 몫의 십의 자리에 1, 남은 2를 내려 25. $25 \\div 5=5$ → 몫은 15예요. 확인: $5 \\times 15=75$',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', concept: 2,
      q: '$29 \\div 6$의 나머지를 구하세요.',
      answer: '5',
      wrong: [
        { a: '4', why: '4는 몫이에요. 문제는 나머지를 묻고 있어요.' },
        { a: '11', why: '몫을 3으로 하면 나머지 11이 나누는 수 6보다 커요. 몫을 4로 하면 나머지는 5예요.' },
      ],
      explain: '6단에서 29를 넘지 않는 가장 큰 수는 $6 \\times 4=24$예요. $29-24=5$이므로 $29 \\div 6=4 \\cdots 5$, 나머지는 5예요.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 2,
      q: '나눗셈에서 나머지는 나누는 수보다 항상 작아요.',
      answer: true,
      explain: '나머지가 나누는 수와 같거나 크면 한 묶음을 더 만들 수 있어요. 그래서 나머지는 항상 나누는 수보다 작아요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '$47 \\div 6=7 \\cdots 5$를 맞게 계산했는지 확인하는 식은 무엇일까요?',
      choices: ['$6 \\times 7+5=47$', '$6 \\times 5+7=37$', '$7 \\times 5+6=41$', '$6 \\times 7-5=37$'],
      answer: 0,
      why: [
        '',
        '몫과 나머지의 자리를 바꾸었어요. 나누는 수에 몫을 곱하고 나머지를 더해요.',
        '나누는 수 대신 나머지를 곱했어요. 나누는 수 × 몫 + 나머지예요.',
        '나머지를 뺐어요. 남은 것을 다시 모으는 것이니 나머지는 더해요.',
      ],
      explain: '나누는 수 × 몫 + 나머지 = 나누어지는 수이므로 $6 \\times 7+5=47$이에요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'number', concept: 4,
      q: '계산해 보세요.\n\n$372 \\div 3$',
      answer: '124',
      wrong: [{ a: '120', why: '십의 자리를 나누고 남은 1을 내리지 않았어요. 남은 1과 일의 자리 2를 합친 12를 3으로 나누어요.' }],
      explain: '백의 자리 $3 \\div 3=1$, 십의 자리 $7 \\div 3=2 \\cdots 1$ → 남은 1을 내려 12, $12 \\div 3=4$. 그래서 124예요. 확인: $3 \\times 124=372$',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'number', unit: '명', concept: 2,
      q: '구슬 58개를 한 사람에게 7개씩 나누어 주려고 해요. 몇 명에게 나누어 줄 수 있을까요?',
      answer: '8',
      hint: '$58 \\div 7$의 몫과 나머지를 구해 보세요.',
      wrong: [
        { a: '9', why: '남은 구슬 2개로는 한 사람에게 7개를 줄 수 없어요. 나누어 줄 수 있는 사람 수는 몫 8이에요.' },
        { a: '2', why: '2는 나머지, 곧 남는 구슬의 수예요. 나누어 줄 수 있는 사람 수는 몫이에요.' },
      ],
      explain: '$58 \\div 7=8 \\cdots 2$예요. 8명에게 7개씩 주고 2개가 남으므로 8명에게 나누어 줄 수 있어요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '대', concept: 2,
      q: '학생 45명이 한 대에 6명씩 탈 수 있는 보트를 타려고 해요. 모두 타려면 보트는 적어도 몇 대 필요할까요?',
      answer: '8',
      hint: '나머지 학생들도 보트를 타야 해요.',
      wrong: [{ a: '7', why: '$45 \\div 6=7 \\cdots 3$에서 남은 3명도 보트를 타야 해요. 보트가 1대 더 필요해요.' }],
      explain: '$45 \\div 6=7 \\cdots 3$이에요. 7대에 42명이 타고 남은 3명이 탈 보트가 1대 더 필요하므로 $7+1=8$대예요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 5,
      q: '몫을 어림한 값이 **약 30**인 나눗셈을 고르세요.',
      choices: ['$92 \\div 3$', '$83 \\div 4$', '$148 \\div 2$', '$247 \\div 5$'],
      answer: 0,
      why: [
        '',
        '83은 약 80이므로 $80 \\div 4=20$, 몫은 약 20이에요.',
        '148은 약 150이므로 $150 \\div 2=75$, 몫은 약 75예요.',
        '247은 약 250이므로 $250 \\div 5=50$, 몫은 약 50이에요.',
      ],
      hint: '나누어지는 수를 나누기 쉬운 가까운 수로 바꾸어 보세요.',
      explain: '92는 약 90이므로 $90 \\div 3=30$, 몫은 약 30이에요. (실제로는 $92 \\div 3=30 \\cdots 2$)',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', concept: 4,
      q: '계산해 보세요.\n\n$635 \\div 5$',
      answer: '127',
      hint: '백의 자리부터 나누고, 남은 수는 아랫자리로 내려요.',
      wrong: [{ a: '101', why: '나누고 남은 수를 아랫자리로 내리지 않았어요. 백의 자리에서 남은 1을 내려 13을, 십의 자리에서 남은 3을 내려 35를 나누어요.' }],
      explain: '백의 자리 $6 \\div 5=1 \\cdots 1$ → 남은 1을 내려 13. $13 \\div 5=2 \\cdots 3$ → 남은 3을 내려 35. $35 \\div 5=7$. 그래서 127이에요. 확인: $5 \\times 127=635$',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', concept: 3,
      q: '어떤 수를 7로 나누었더니 몫이 6, 나머지가 4였어요. 어떤 수는 얼마일까요?',
      answer: '46',
      hint: '나누는 수 × 몫 + 나머지 = 나누어지는 수',
      wrong: [
        { a: '42', why: '나머지 4를 더하지 않았어요. $7 \\times 6+4$를 계산해요.' },
        { a: '38', why: '나머지 4를 뺐어요. 남은 것을 다시 모으는 것이니 나머지는 더해요.' },
      ],
      explain: '나누는 수 × 몫 + 나머지 = 어떤 수이므로 $7 \\times 6+4=46$이에요. 확인: $46 \\div 7=6 \\cdots 4$',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: '어떤 수를 6으로 나누어야 할 것을 잘못하여 4로 나누었더니 몫이 11, 나머지가 3이었어요. 바르게 계산한 몫과 나머지는 무엇일까요?',
      choices: ['몫 7, 나머지 5', '몫 11, 나머지 3', '몫 6, 나머지 11', '몫 7, 나머지 3'],
      answer: 0,
      why: [
        '',
        '잘못 계산한 결과 그대로예요. 먼저 어떤 수를 구한 뒤 6으로 나누어요.',
        '나머지 11이 나누는 수 6보다 커요. 6개씩 한 번 더 묶을 수 있어요.',
        '몫은 맞지만 나머지가 틀렸어요. $47-42$를 다시 계산해 보세요.',
      ],
      hint: '먼저 잘못 계산한 결과로 어떤 수를 구해요.',
      explain: '어떤 수는 $4 \\times 11+3=47$이에요. 바르게 계산하면 $47 \\div 6=7 \\cdots 5$ (확인: $6 \\times 7+5=47$)예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', concept: 2,
      q: '어떤 수를 7로 나누었더니 몫이 8이었어요. 어떤 수가 될 수 있는 수 가운데 가장 큰 수는 얼마일까요?',
      answer: '62',
      hint: '나누는 수가 7일 때 나머지가 될 수 있는 가장 큰 수부터 생각해요.',
      wrong: [
        { a: '63', why: '나머지를 7로 생각했어요. 나머지는 나누는 수 7보다 작아야 하니 가장 큰 나머지는 6이에요.' },
        { a: '56', why: '56은 나누어떨어지는 경우예요. 나머지가 클수록 어떤 수도 커져요.' },
      ],
      explain: '나머지는 7보다 작아야 하니 가장 큰 나머지는 6이에요. 그래서 가장 큰 어떤 수는 $7 \\times 8+6=62$예요. ($63 \\div 7=9$로 몫이 9가 돼요.)',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '개', concept: 4,
      q: '사탕 245개를 6명이 남김없이 똑같이 나누어 가지려고 해요. 사탕이 적어도 몇 개 더 있어야 할까요?',
      answer: '1',
      hint: '$245 \\div 6$의 나머지를 먼저 구해 보세요.',
      wrong: [{ a: '5', why: '5는 나머지, 곧 남는 사탕이에요. 6명에게 하나씩 더 나누어 주려면 몇 개가 모자라는지 생각해요.' }],
      explain: '$245 \\div 6=40 \\cdots 5$예요. 남은 5개로는 6명에게 하나씩 더 줄 수 없고, 1개가 더 있으면 6개가 되어 한 명에게 41개씩 남김없이 나눌 수 있어요. 확인: $6 \\times 41=246$',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '몫이 **두 자리 수**인 나눗셈을 고르세요.',
      choices: ['$427 \\div 5$', '$527 \\div 5$', '$736 \\div 7$', '$618 \\div 6$'],
      answer: 0,
      why: [
        '',
        '백의 자리 5를 5로 나눌 수 있으니 몫의 백의 자리에 1이 생겨 세 자리 수예요. ($527 \\div 5=105 \\cdots 2$)',
        '백의 자리 7을 7로 나눌 수 있으니 몫이 세 자리 수예요. ($736 \\div 7=105 \\cdots 1$)',
        '백의 자리 6을 6으로 나눌 수 있으니 몫이 세 자리 수예요. ($618 \\div 6=103$)',
      ],
      hint: '백의 자리 숫자가 나누는 수보다 작으면 몫의 백의 자리를 쓸 수 없어요.',
      explain: '$427 \\div 5$는 백의 자리 4가 5보다 작아서 42부터 나누어요. 몫은 십의 자리부터 생기므로 두 자리 수예요. ($427 \\div 5=85 \\cdots 2$)',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'number', unit: '개', concept: 2,
      q: '10부터 50까지의 수 가운데 6으로 나누었을 때 나머지가 2인 수는 모두 몇 개일까요?',
      answer: '7',
      hint: '6으로 나누어떨어지는 수에 2를 더한 수를 찾아요.',
      wrong: [{ a: '8', why: '6으로 나누면 나머지가 2인 수 8까지 센 것 같아요. 8은 10보다 작아서 넣으면 안 돼요. 10부터 50까지에서 찾아요.' }],
      explain: '6의 단 곱에 2를 더한 수예요: 14, 20, 26, 32, 38, 44, 50. 모두 7개예요. (8은 10보다 작고, 56은 50보다 커요.)',
    },
  ],

  deeper: [
    {
      title: '나머지는 어떻게 할까? — 문제가 묻는 것을 보자',
      body: '$45 \\div 6=7 \\cdots 3$이라는 같은 계산도 문제에 따라 답이 달라져요.\n\n- "6명씩 한 모둠을 만들면 몇 모둠?" → 7모둠 (남은 3명으로는 모둠을 못 만들어요)\n- "6명씩 타는 보트에 모두 타려면 몇 대?" → 8대 (남은 3명도 타야 해요)\n- "6명씩 모둠을 만들고 남는 사람은?" → 3명\n\n그래서 나눗셈 문제는 계산을 한 뒤 **무엇을 묻는지** 다시 읽어야 해요.\n\n4학년에서는 $372 \\div 12$처럼 **두 자리 수로 나누는** 나눗셈을 배워요. 오늘 배운 "높은 자리부터 나누고, 남은 수는 내리기"와 "나누는 수 × 몫 + 나머지로 확인하기"가 그대로 쓰여요.',
    },
  ],

  faq: [
    {
      q: '나머지가 나누는 수보다 크면 왜 안 돼요?',
      a: '나머지가 나누는 수만큼 있으면 한 묶음을 더 만들 수 있기 때문이에요. $23 \\div 4$에서 나머지를 7이라고 하면, 7개 중 4개로 한 묶음을 더 만들 수 있지요. 그래서 몫을 1 크게 하고 나머지는 3이 돼요.',
    },
    {
      q: '나누어떨어진다는 게 무슨 뜻이에요?',
      a: '나머지가 0, 곧 남는 것 없이 똑같이 나누어진다는 뜻이에요. $15 \\div 5=3$은 나누어떨어지고, $17 \\div 5=3 \\cdots 2$는 나누어떨어지지 않아요.',
    },
    {
      q: '몫에 0은 언제 써요?',
      a: '높은 자리부터 나누다가 어떤 자리의 수가 나누는 수보다 작으면 그 자리 몫에 0을 써요. $618 \\div 6$에서 백의 자리 $6 \\div 6=1$ 다음, 십의 자리 1은 6보다 작으니 몫의 십의 자리에 0을 쓰고 1을 내려 $18 \\div 6=3$. 그래서 103이에요. 0을 빠뜨려 13으로 쓰지 않게 조심해요.',
    },
    {
      q: '내 계산이 맞는지 어떻게 알아요?',
      a: '나누는 수 × 몫 + 나머지를 계산해 보세요. 나누어지는 수가 나오면 맞아요. $76 \\div 3=25 \\cdots 1$이면 $3 \\times 25+1=76$이니 맞게 계산한 거예요.',
    },
  ],

  mistakes: [
    '나머지를 나누는 수보다 크게 쓰는 실수 — $23 \\div 4=4 \\cdots 7$이 아니라 $5 \\cdots 3$이에요. 나머지는 항상 나누는 수보다 작아요.',
    '윗자리를 나누고 남은 수를 내리지 않는 실수 — $52 \\div 4$에서 남은 1을 내려 12를 나누어야 13이 나와요(10이 아니에요).',
    '몫의 가운데 0을 빠뜨리는 실수 — $618 \\div 6=103$이에요. 13으로 쓰면 안 돼요.',
  ],

  gens: [
    {
      id: 'div-2digit',
      level: 1,
      title: '(몇십)÷(몇), (몇십몇)÷(몇) — 나누어떨어지는 나눗셈',
      make: function (R) {
        var d, q, n, t = 0;
        do {
          d = R.int(2, 9);
          if (R.bool(0.3)) { n = 10 * R.int(2, 9); q = n / d; }
          else { q = R.int(11, 49); n = q * d; }
          t++;
        } while ((n % d !== 0 || q < 10 || n > 99 || n < 20) && t < 100);
        if (t >= 100) { d = 4; n = 52; q = 13; }
        var w = divWork(n, d, R);
        var wrong = [];
        if (w.noBring !== q) wrong.push({ a: String(w.noBring), why: '십의 자리를 나누고 남은 수를 일의 자리로 내리지 않았어요. 남은 수와 일의 자리 수를 합쳐서 나누어요.' });
        if (n - d !== q) wrong.push({ a: String(n - d), why: n + '에서 ' + d + R.josa(d, '을/를') + ' 뺐어요. 십의 자리부터 차례로 ' + d + R.josa(d, '으로/로') + ' 나누어요.' });
        return {
          type: 'short', check: 'number', concept: n % 10 === 0 ? 0 : 1,
          q: '계산해 보세요.\n\n$' + n + ' \\div ' + d + '$',
          answer: String(q),
          wrong: wrong,
          explain: '십의 자리부터 나누어요.\n' + w.lines.join('\n') + '\n\n그래서 $' + n + ' \\div ' + d + '=' + q + '$' + R.josa(q, '이에요/예요') + '. 확인: $' + d + ' \\times ' + q + '=' + n + '$',
        };
      },
    },
    {
      id: 'div-remainder',
      level: 1,
      title: '나머지가 있는 나눗셈(몫과 나머지 고르기)',
      make: function (R) {
        var d = R.int(3, 9), q = R.int(2, 9), r = R.int(1, d - 1), n = d * q + r;
        function pair(a, b) { return '몫 ' + a + ', 나머지 ' + b; }
        var correct = pair(q, r);
        var cands = [
          [pair(q - 1, r + d), '나머지 ' + (r + d) + R.josa(r + d, '이/가') + ' 나누는 수 ' + d + '보다 커요. ' + d + '개씩 한 번 더 묶을 수 있으니 몫을 1 크게 해요.'],
          [pair(r, q), '몫과 나머지를 바꾸어 썼어요. ' + d + '단에서 ' + n + R.josa(n, '을/를') + ' 넘지 않는 가장 큰 곱을 찾으면 몫이 나와요.'],
          [pair(q + 1, 0), '$' + d + ' \\times ' + (q + 1) + '=' + (d * (q + 1)) + '$' + R.josa(d * (q + 1), '은/는') + ' ' + n + '보다 커요. 몫이 너무 커요.'],
          [pair(q, r + 1 < d ? r + 1 : r - 1), '나머지를 잘못 구했어요. ' + n + '에서 $' + d + ' \\times ' + q + '=' + (d * q) + '$' + R.josa(d * q, '을/를') + ' 빼 보세요.'],
        ];
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason) && c[0] !== correct) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: 2,
          q: '$' + n + ' \\div ' + d + '$의 몫과 나머지를 바르게 구한 것을 고르세요.',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: d + '단에서 ' + n + R.josa(n, '을/를') + ' 넘지 않는 가장 큰 곱은 $' + d + ' \\times ' + q + '=' + (d * q) + '$' + R.josa(d * q, '이에요/예요') + '. $' + n + '-' + (d * q) + '=' + r + '$이므로 $' + n + ' \\div ' + d + '=' + q + ' \\cdots ' + r + '$' + R.josa(r, '이에요/예요') + '.\n\n확인: $' + d + ' \\times ' + q + '+' + r + '=' + n + '$',
        };
      },
    },
    {
      id: 'div-3digit',
      level: 2,
      title: '(두·세 자리 수)÷(한 자리 수)의 몫과 나머지',
      make: function (R) {
        var d = R.int(2, 9), n = R.int(100, 999);
        if (R.bool(0.3)) n = R.int(10 * d, 99); // 두 자리 수는 몫도 두 자리 수가 되게
        var w = divWork(n, d, R);
        var askRem = w.r > 0 && R.bool(0.4);
        var wrong = [];
        if (askRem) {
          wrong.push({ a: String(w.q), why: w.q + R.josa(w.q, '은/는') + ' 몫이에요. 문제는 나머지를 묻고 있어요.' });
        } else {
          if (w.noBring !== w.q) wrong.push({ a: String(w.noBring), why: '나누고 남은 수를 아랫자리로 내리지 않았어요. 남은 수는 아랫자리 수와 합쳐서 나누어요.' });
          var noZero = Number(String(w.q).replace(/0/g, ''));
          if (/0/.test(String(w.q)) && noZero !== w.q && noZero !== w.noBring && noZero > 0) wrong.push({ a: String(noZero), why: '몫의 0을 빠뜨렸어요. 나눌 수 없는 자리의 몫에는 0을 써요.' });
        }
        return {
          type: 'short', check: 'number', concept: n >= 100 ? 4 : (w.r ? 2 : 1),
          q: '$' + n + ' \\div ' + d + '$의 ' + (askRem ? '나머지' : '몫') + R.josa(askRem ? '나머지' : '몫', '을/를') + ' 구하세요.',
          answer: String(askRem ? w.r : w.q),
          wrong: wrong,
          explain: '높은 자리부터 나누어요.\n' + w.lines.join('\n') + '\n\n그래서 $' + n + ' \\div ' + d + '=' + w.q + (w.r ? ' \\cdots ' + w.r : '') + '$' + R.josa(w.r ? w.r : w.q, '이에요/예요') + '. ' +
            (askRem ? '나머지는 ' + w.r + R.josa(w.r, '이에요/예요') + '.' : '몫은 ' + w.q + R.josa(w.q, '이에요/예요') + '.') +
            '\n\n확인: $' + d + ' \\times ' + w.q + (w.r ? '+' + w.r : '') + '=' + n + '$',
        };
      },
    },
    {
      id: 'div-check-estimate',
      level: 2,
      title: '계산 확인하기로 어떤 수 구하기 · 몫 어림하기',
      make: function (R) {
        if (R.bool()) {
          var d = R.int(3, 9), q = R.int(4, 15), r = R.int(1, d - 1), n = d * q + r;
          var wrong = [{ a: String(d * q), why: '나머지 ' + r + R.josa(r, '을/를') + ' 더하지 않았어요. 나누는 수 × 몫 + 나머지예요.' }];
          if (d * q - r !== n) wrong.push({ a: String(d * q - r), why: '나머지를 뺐어요. 남은 것을 다시 모으는 것이니 나머지는 더해요.' });
          return {
            type: 'short', check: 'number', concept: 3,
            q: '어떤 수를 ' + d + R.josa(d, '으로/로') + ' 나누었더니 몫과 나머지가 다음과 같았어요. 어떤 수는 얼마일까요?\n\n몫: ' + q + ', 나머지: ' + r,
            answer: String(n),
            wrong: wrong,
            explain: '나누는 수 × 몫 + 나머지 = 어떤 수이므로 $' + d + ' \\times ' + q + '+' + r + '=' + n + '$' + R.josa(n, '이에요/예요') + '. 확인: $' + n + ' \\div ' + d + '=' + q + ' \\cdots ' + r + '$',
          };
        }
        var d2 = R.int(2, 9), m = R.int(2, 9), base = 10 * d2 * m;
        while (base < 100) { m = R.int(2, 9); base = 10 * d2 * m; }
        var delta = R.pick([-3, -2, -1, 1, 2, 3]);
        var n2 = base + delta, est = 10 * m;
        var correct = '약 ' + est;
        var cands = [
          ['약 ' + m, '0을 빠뜨렸어요. $' + base + ' \\div ' + d2 + '$' + R.josa(d2, '은/는') + ' $' + (base / 10) + ' \\div ' + d2 + '=' + m + '$에 0을 붙여요.'],
          ['약 ' + (100 * m), '0을 하나 더 붙였어요. ' + base + R.josa(base, '은/는') + ' 10이 ' + (base / 10) + '개이므로 몫은 10이 ' + m + '개예요.'],
          ['약 ' + (10 * (m + 1)), '몫을 너무 크게 어림했어요. $' + d2 + ' \\times ' + (10 * (m + 1)) + '=' + (d2 * 10 * (m + 1)) + '$' + R.josa(d2 * 10 * (m + 1), '은/는') + ' ' + n2 + '보다 커요.'],
          ['약 ' + (10 * (m - 1)), '몫을 너무 작게 어림했어요. $' + d2 + ' \\times ' + (10 * (m - 1)) + '=' + (d2 * 10 * (m - 1)) + '$' + R.josa(d2 * 10 * (m - 1), '은/는') + ' ' + n2 + '보다 작아요.'],
        ];
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: 5,
          q: '$' + n2 + ' \\div ' + d2 + '$의 몫을 어림한 값으로 알맞은 것을 고르세요.',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: n2 + R.josa(n2, '은/는') + ' ' + base + '에 가까워요. $' + (base / 10) + ' \\div ' + d2 + '=' + m + '$이므로 $' + base + ' \\div ' + d2 + '=' + est + '$, 몫은 ' + correct + R.josa(est, '이에요/예요') + '.',
        };
      },
    },
  ],
});
})();
