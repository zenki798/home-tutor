/* 3학년 수학 · 곱셈(두 자리×한 자리)
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 세로셈(vmul)·수 모형 줄(rows)은 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  var X = [196, 156, 116, 76]; // 일·십·백·천의 자리 가운데 x

  function tx(x, y, size, fill, s) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" text-anchor="middle" fill="' + fill + '">' + s + '</text>';
  }
  // 곱셈 세로셈. marks 는 {자리 번호: 위에 작게 쓸 올림 수}, ans 가 null 이면 답 칸을 비운다
  function vmul(top, bot, ans, marks, alt) {
    var s = '';
    function put(str, y, fill) {
      str = String(str);
      for (var i = 0; i < str.length; i++) s += tx(X[str.length - 1 - i], y, 30, fill, str.charAt(i));
    }
    if (marks) Object.keys(marks).forEach(function (k) { s += tx(X[k], 24, 16, 'var(--fig-4)', marks[k]); });
    put(top, 64, 'currentColor');
    s += tx(36, 106, 30, 'currentColor', '×');
    put(bot, 106, 'currentColor');
    s += '<line x1="20" y1="120" x2="220" y2="120" stroke="currentColor" stroke-width="2"/>';
    var has = ans !== null && ans !== undefined;
    if (has) put(ans, 160, 'var(--fig-1)');
    return { type: 'svg', svg: '<svg viewBox="0 0 240 ' + (has ? 176 : 134) + '">' + s + '</svg>', alt: alt };
  }

  // 수 모형을 k 줄 놓은 그림: 줄마다 십 모형 t 개와 일 모형 o 개
  function rows(k, t, o, alt) {
    var s = '', W = Math.max(220, t * 16 + o * 16 + 40), H = k * 62 + 8;
    for (var r = 0; r < k; r++) {
      var y = 6 + r * 62, x = 10;
      for (var i = 0; i < t; i++) {
        s += '<rect x="' + x + '" y="' + y + '" width="10" height="50" fill="var(--fig-1)" stroke="currentColor" stroke-width="1"/>';
        x += 16;
      }
      x += 12;
      for (var j = 0; j < o; j++) {
        s += '<rect x="' + x + '" y="' + (y + 40) + '" width="10" height="10" fill="var(--fig-2)" stroke="currentColor" stroke-width="1"/>';
        x += 16;
      }
    }
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' ' + H + '">' + s + '</svg>', alt: alt };
  }

  // (두 자리 수) × (한 자리 수) 를 자리별로 따라가며 풀이 줄과 실수 답을 만든다
  function mulWork(n, k, R) {
    var t = Math.floor(n / 10), o = n % 10;
    var po = o * k, c = Math.floor(po / 10), pt = t * k + c, ans = n * k;
    var lines = [];
    if (po >= 10) lines.push('일의 자리: $' + o + ' \\times ' + k + '=' + po + '$ → ' + (po % 10) + R.josa(po % 10, '을/를') + ' 쓰고 ' + c + R.josa(c, '을/를') + ' 십의 자리로 올려요.');
    else lines.push('일의 자리: $' + o + ' \\times ' + k + '=' + po + '$');
    if (c) lines.push('십의 자리: $' + t + ' \\times ' + k + '=' + (t * k) + '$에 올린 ' + c + R.josa(c, '을/를') + ' 더하면 $' + (t * k) + '+' + c + '=' + pt + '$' + (pt >= 10 ? ' → 십의 자리에 ' + (pt % 10) + ', 백의 자리에 ' + Math.floor(pt / 10) + R.josa(Math.floor(pt / 10), '을/를') + ' 써요.' : ''));
    else lines.push('십의 자리: $' + t + ' \\times ' + k + '=' + pt + '$' + (pt >= 10 ? ' → 십의 자리에 ' + (pt % 10) + ', 백의 자리에 ' + Math.floor(pt / 10) + R.josa(Math.floor(pt / 10), '을/를') + ' 써요.' : ''));
    return {
      lines: lines, ans: ans, carry: c,
      noCarry: t * k * 10 + po % 10,             // 올린 수를 더하지 않은 답
      glued: Number(String(t * k) + String(po)),  // 자리마다 곱을 이어 붙인 답
    };
  }

Tutor.registerUnit({
  id: 'math-e3-04',
  course: 'math-e3',
  title: '곱셈(두 자리×한 자리)',
  summary: '(몇십)×(몇)부터 올림이 있는 (두 자리 수)×(한 자리 수)까지 계산하고 곱을 어림해요.',
  goals: [
    '(몇십)×(몇)을 계산할 수 있어요.',
    '올림이 없는 (두 자리 수)×(한 자리 수)를 자리별로 계산할 수 있어요.',
    '일의 자리나 십의 자리에서 올림이 있는 (두 자리 수)×(한 자리 수)를 계산할 수 있어요.',
    '곱셈의 결과를 몇십으로 어림할 수 있어요.',
  ],
  standards: ['[4수01-04]', '[4수01-08]'],

  concepts: [
    {
      title: '(몇십)×(몇)',
      body: '$20 \\times 3$은 얼마일까요? 20은 10이 2개예요. 그러니 $20 \\times 3$은 10이 $2 \\times 3=6$개, 곧 60이에요.\n\n$20 \\times 3=60$\n\n**(몇십)×(몇)은 (몇)×(몇)을 계산한 뒤 끝에 0을 하나 붙여요.**\n\n- $40 \\times 2$ → $4 \\times 2=8$ → 80\n- $50 \\times 6$ → $5 \\times 6=30$ → 300\n\n> ⚠️ $50 \\times 6$에서 $5 \\times 6=30$에는 이미 0이 있어요. 그래도 0을 하나 더 붙여 300이 돼요.',
      easy: '10원짜리 동전으로 생각해 보세요. 20원은 10원짜리 2개예요. 20원씩 3번이면 10원짜리가 $2 \\times 3=6$개, 곧 60원이지요.\n\n10원짜리 몇 개인지 곱셈구구로 세고, 끝에 0을 붙이면 돼요.',
      fig: rows(3, 2, 0, '십 모형 2개씩 3줄을 놓은 그림'),
      check: {
        type: 'choice',
        q: '$30 \\times 4$의 값은 무엇일까요?',
        choices: ['120', '12', '1200'],
        answer: 0,
        why: ['', '0을 빠뜨렸어요. 30은 10이 3개이므로 $3 \\times 4=12$에 0을 붙여요.', '0을 두 개 붙였어요. 30에는 0이 하나뿐이니 0도 하나만 붙여요.'],
        explain: '$3 \\times 4=12$이고, 30은 10이 3개이므로 끝에 0을 하나 붙여 120이에요.',
      },
    },
    {
      title: '올림이 없는 (두 자리 수)×(한 자리 수)',
      body: '$12 \\times 3$은 12를 십의 자리와 일의 자리로 나누어 곱한 뒤 더해요.\n\n- 일의 자리: $2 \\times 3=6$\n- 십의 자리: $10 \\times 3=30$\n- 더하기: $6+30=36$\n\n세로셈으로는 **일의 자리부터** 곱해요. 일의 자리에 6, 십의 자리에 $1 \\times 3=3$을 써요. 십의 자리 3은 30을 나타내요.\n\n> 💡 두 자리 수의 **두 숫자 모두에** 곱하는 수를 곱해야 해요.',
      easy: '수 모형으로 12를 세 번 놓아 보세요. 십 모형은 1개씩 3줄이니 3개, 일 모형은 2개씩 3줄이니 6개예요.\n\n십 모형 3개(30)와 일 모형 6개(6)를 합치면 36이에요.',
      fig: rows(3, 1, 2, '십 모형 1개와 일 모형 2개를 한 줄로 하여 3줄을 놓은 그림'),
      check: {
        type: 'short', check: 'number',
        q: '계산해 보세요.\n\n$23 \\times 3$',
        answer: '69',
        wrong: [{ a: '29', why: '일의 자리에만 3을 곱했어요. 십의 자리 2에도 3을 곱해요. $2 \\times 3=6$' }],
        explain: '일의 자리 $3 \\times 3=9$, 십의 자리 $2 \\times 3=6$이므로 69예요. ($9+60=69$)',
      },
    },
    {
      title: '십의 자리에서 올림이 있는 곱셈',
      body: '$41 \\times 3$을 계산해 볼까요?\n\n- 일의 자리: $1 \\times 3=3$\n- 십의 자리: $4 \\times 3=12$ → 십의 자리 곱 12는 120을 나타내요.\n\n그래서 $41 \\times 3=120+3=123$이에요.\n\n세로셈에서는 십의 자리 곱 12의 2를 십의 자리에, 1을 **백의 자리**에 써요. 두 자리 수에 한 자리 수를 곱해도 곱이 세 자리 수가 될 수 있어요.',
      easy: '10원짜리 동전 4개와 1원짜리 1개, 곧 41원이 3묶음 있다고 생각해 보세요.\n\n10원짜리는 $4 \\times 3=12$개 → 120원, 1원짜리는 3개 → 3원. 모두 123원이에요. 10원짜리가 10개 넘게 모이면 100원이 넘는 거예요.',
      fig: vmul(41, 3, 123, null, '41 곱하기 3의 세로셈. 답은 123'),
      check: {
        type: 'ox',
        q: '$73 \\times 3$을 계산하면 219예요.',
        answer: true,
        explain: '일의 자리 $3 \\times 3=9$, 십의 자리 $7 \\times 3=21$이에요. 21은 210을 나타내므로 $210+9=219$예요.',
      },
    },
    {
      title: '일의 자리에서 올림이 있는 곱셈',
      body: '$16 \\times 3$을 계산해 볼까요?\n\n- 일의 자리: $6 \\times 3=18$ → 8을 쓰고 **1을 십의 자리로 올려요**.\n- 십의 자리: $1 \\times 3=3$에 올린 1을 더해 $3+1=4$\n\n그래서 $16 \\times 3=48$이에요.\n\n> 💡 나누어 계산해도 같아요. $6 \\times 3=18$, $10 \\times 3=30$, $18+30=48$\n\n> ⚠️ 올린 수는 십의 자리를 **곱한 다음에** 더해요. 먼저 더하고 곱하면 틀려요.',
      easy: '일의 자리 곱 18은 "10이 1개, 1이 8개"예요. 10은 십의 자리 몫이니 십의 자리로 보내고, 일의 자리에는 8만 남겨요.\n\n덧셈의 받아올림과 같은 생각이에요. 10이 모이면 윗자리로 올라가요.',
      fig: vmul(16, 3, 48, { 1: '1' }, '16 곱하기 3의 세로셈. 십의 자리 위에 올린 1이 작게 쓰여 있고 답은 48'),
      check: {
        type: 'short', check: 'number',
        q: '계산해 보세요.\n\n$27 \\times 3$',
        answer: '81',
        wrong: [
          { a: '61', why: '일의 자리에서 올린 2를 십의 자리에 더하지 않았어요. $2 \\times 3=6$에 2를 더하면 8이에요.' },
          { a: '621', why: '자리마다 곱한 6과 21을 그대로 이어 썼어요. 21의 2는 십의 자리로 올려요.' },
        ],
        explain: '일의 자리 $7 \\times 3=21$ → 1을 쓰고 2를 올려요. 십의 자리 $2 \\times 3=6$에 올린 2를 더하면 8. 그래서 81이에요.',
      },
    },
    {
      title: '일의 자리와 십의 자리에서 모두 올림이 있는 곱셈',
      body: '$67 \\times 4$를 계산해 볼까요?\n\n- 일의 자리: $7 \\times 4=28$ → 8을 쓰고 2를 십의 자리로 올려요.\n- 십의 자리: $6 \\times 4=24$에 올린 2를 더해 $24+2=26$ → 십의 자리에 6, 백의 자리에 2를 써요.\n\n그래서 $67 \\times 4=268$이에요.\n\n> 💡 확인: $60 \\times 4=240$, $7 \\times 4=28$, $240+28=268$',
      easy: '100원·10원·1원 동전으로 생각해 보세요. 67원이 4묶음이면 1원짜리가 28개예요. 1원짜리 20개를 10원짜리 2개로 바꾸어요.\n\n10원짜리는 $6 \\times 4=24$개에 바꾼 2개를 더해 26개. 그중 20개를 100원짜리 2개로 바꾸면 100원짜리 2개, 10원짜리 6개, 1원짜리 8개 — 268원이에요.',
      fig: vmul(67, 4, 268, { 1: '2' }, '67 곱하기 4의 세로셈. 십의 자리 위에 올린 2가 작게 쓰여 있고 답은 268'),
      check: {
        type: 'choice',
        q: '$58 \\times 6$의 값은 무엇일까요?',
        choices: ['348', '308', '3048'],
        answer: 0,
        why: ['', '일의 자리에서 올린 4를 십의 자리에 더하지 않았어요. $5 \\times 6=30$에 4를 더하면 34예요.', '자리마다 곱한 30과 48을 그대로 이어 썼어요. 48의 4는 십의 자리로 올려 더해요.'],
        explain: '일의 자리 $8 \\times 6=48$ → 8을 쓰고 4를 올려요. 십의 자리 $5 \\times 6=30$에 4를 더해 34. 그래서 348이에요.',
      },
    },
    {
      title: '곱셈 결과 어림하기',
      body: '정확히 계산하기 전에 **대강 얼마쯤인지** 생각해 보는 것을 **어림하기**라고 해요.\n\n두 자리 수를 가장 가까운 몇십으로 바꾸어 곱하면 쉽게 어림할 수 있어요.\n\n- $48 \\times 3$ → 48은 50에 가까워요 → $50 \\times 3=150$ → 약 150 (실제 값 144)\n- $31 \\times 7$ → 31은 30에 가까워요 → $30 \\times 7=210$ → 약 210 (실제 값 217)\n\n> 💡 계산한 답이 어림한 값과 아주 많이 다르면 계산을 다시 살펴보세요. $48 \\times 3$을 계산했는데 1224가 나왔다면 어딘가 틀린 거예요.',
      easy: '한 개에 48원짜리 사탕 3개를 사려면 돈이 얼마쯤 필요할까요? 48원은 거의 50원이니 "50원짜리 3개, 150원쯤이면 되겠다" 하고 생각할 수 있지요. 이것이 어림하기예요.',
      fig: { type: 'numberline', min: 40, max: 50, step: 1, labelEvery: 5, points: [{ x: 48, label: '48' }], alt: '40부터 50까지의 수직선. 48이 50 가까이에 표시되어 있음' },
      check: {
        type: 'choice',
        q: '$39 \\times 4$를 어림한 값으로 알맞은 것은 무엇일까요?',
        choices: ['약 160', '약 120', '약 1600'],
        answer: 0,
        why: ['', '39를 30으로 생각했어요. 39는 40에 훨씬 가까워요.', '0을 하나 더 붙였어요. $40 \\times 4$는 $4 \\times 4=16$에 0을 하나 붙여 160이에요.'],
        explain: '39는 40에 가까우므로 $40 \\times 4=160$, 약 160이에요. (실제 값은 156)',
      },
    },
  ],

  examples: [
    {
      q: '계산해 보세요.\n\n$47 \\times 5$',
      fig: vmul(47, 5, null, null, '47 곱하기 5의 세로셈'),
      steps: [
        '자리를 맞추어 세로로 쓰고 일의 자리부터 곱해요.',
        '일의 자리: $7 \\times 5=35$ → 5를 쓰고 3을 십의 자리로 올려요.',
        '십의 자리: $4 \\times 5=20$에 올린 3을 더해 $20+3=23$ → 십의 자리에 3, 백의 자리에 2를 써요.',
        '확인: 47은 약 50이고 $50 \\times 5=250$이므로 235는 알맞은 크기예요.',
      ],
      answer: '235',
    },
    {
      q: '한 상자에 귤이 24개씩 들어 있어요. 4상자에 든 귤은 모두 몇 개일까요?',
      steps: [
        '24개씩 4상자이므로 곱셈식 $24 \\times 4$로 구해요.',
        '일의 자리: $4 \\times 4=16$ → 6을 쓰고 1을 올려요.',
        '십의 자리: $2 \\times 4=8$에 올린 1을 더해 9',
        '그래서 $24 \\times 4=96$, 귤은 모두 96개예요.',
      ],
      answer: '96개',
    },
  ],

  terms: [
    { term: '곱', def: '곱셈의 결과예요. $24 \\times 4=96$에서 96이 곱이에요.' },
    { term: '몇십', def: '10, 20, 30 …처럼 10이 몇 개인 수예요. 예: 40은 10이 4개' },
    { term: '세로셈', def: '자리를 맞추어 수를 위아래로 쓰고 계산하는 방법이에요. 곱셈은 일의 자리부터 곱해요.' },
    { term: '올림', def: '어떤 자리의 곱이 10이거나 10보다 클 때, 10을 바로 윗자리의 1로 바꾸어 올려 주는 것이에요. 예: $6 \\times 3=18$이면 8을 쓰고 1을 올려요.' },
    { term: '어림하기', def: '정확한 값 대신 대강 얼마쯤인지 생각해 보는 것이에요. 예: $48 \\times 3$은 약 $50 \\times 3=150$' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
      q: '계산해 보세요.\n\n$40 \\times 2$',
      answer: '80',
      wrong: [{ a: '8', why: '0을 빠뜨렸어요. 40은 10이 4개이므로 $4 \\times 2=8$에 0을 붙여요.' }],
      explain: '$4 \\times 2=8$에 0을 하나 붙여 80이에요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', concept: 1,
      q: '계산해 보세요.\n\n$31 \\times 3$',
      answer: '93',
      wrong: [{ a: '33', why: '십의 자리 3에 곱하지 않았어요. 두 숫자 모두에 3을 곱해요.' }],
      explain: '일의 자리 $1 \\times 3=3$, 십의 자리 $3 \\times 3=9$이므로 93이에요.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'number', concept: 2,
      q: '계산해 보세요.\n\n$62 \\times 4$',
      answer: '248',
      wrong: [{ a: '48', why: '십의 자리 곱 24의 2를 빠뜨렸어요. 2는 백의 자리에 써요.' }],
      explain: '일의 자리 $2 \\times 4=8$, 십의 자리 $6 \\times 4=24$예요. 24는 240을 나타내므로 $240+8=248$이에요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 3,
      q: '$18 \\times 5$의 값은 무엇일까요?',
      choices: ['90', '50', '540'],
      answer: 0,
      why: [
        '',
        '일의 자리에서 올린 4를 더하지 않았어요. $1 \\times 5=5$에 4를 더하면 9예요.',
        '자리마다 곱한 5와 40을 그대로 이어 썼어요. 40의 4는 십의 자리로 올려 더해요.',
      ],
      explain: '일의 자리 $8 \\times 5=40$ → 0을 쓰고 4를 올려요. 십의 자리 $1 \\times 5=5$에 4를 더해 9. 그래서 90이에요.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 0,
      q: '$50 \\times 6=300$이에요.',
      answer: true,
      explain: '$5 \\times 6=30$에 0을 하나 붙이면 300이에요. 30에 이미 0이 있지만, 50의 0도 붙여 줘야 해요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', concept: 4,
      q: '계산해 보세요.\n\n$36 \\times 7$',
      answer: '252',
      wrong: [
        { a: '212', why: '일의 자리에서 올린 4를 십의 자리에 더하지 않았어요. $3 \\times 7=21$에 4를 더해 25예요.' },
        { a: '2142', why: '자리마다 곱한 21과 42를 그대로 이어 썼어요. 42의 4는 십의 자리로 올려 더해요.' },
      ],
      explain: '일의 자리 $6 \\times 7=42$ → 2를 쓰고 4를 올려요. 십의 자리 $3 \\times 7=21$에 4를 더해 25 → 십의 자리에 5, 백의 자리에 2. 그래서 252예요.',
    },
    {
      id: 'p7', level: 2, type: 'short', check: 'number', unit: '장', concept: 4,
      q: '색종이가 한 묶음에 45장씩 8묶음 있어요. 색종이는 모두 몇 장일까요?',
      answer: '360',
      hint: '45장씩 8묶음이므로 곱셈식으로 나타내 보세요.',
      wrong: [
        { a: '320', why: '일의 자리에서 올린 4를 더하지 않았어요. $4 \\times 8=32$에 4를 더해 36이에요.' },
        { a: '53', why: '45와 8을 더했어요. 45장씩 8묶음은 곱셈 $45 \\times 8$이에요.' },
      ],
      explain: '$45 \\times 8$을 계산해요. 일의 자리 $5 \\times 8=40$ → 0을 쓰고 4를 올려요. 십의 자리 $4 \\times 8=32$에 4를 더해 36. 그래서 360장이에요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 5,
      q: '몇십으로 어림한 값이 **약 300**인 곱셈을 고르세요.',
      choices: ['$59 \\times 5$', '$41 \\times 6$', '$28 \\times 9$', '$72 \\times 3$'],
      answer: 0,
      why: [
        '',
        '41은 약 40이므로 $40 \\times 6=240$, 약 240이에요.',
        '28은 약 30이므로 $30 \\times 9=270$, 약 270이에요.',
        '72는 약 70이므로 $70 \\times 3=210$, 약 210이에요.',
      ],
      hint: '두 자리 수를 가장 가까운 몇십으로 바꾸어 곱해 보세요.',
      explain: '59는 약 60이므로 $60 \\times 5=300$, 약 300이에요. 나머지는 약 240, 약 270, 약 210이에요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '명', concept: 3,
      q: '버스 한 대에 학생이 28명씩 탈 수 있어요. 버스 3대에는 학생이 모두 몇 명 탈 수 있을까요?',
      answer: '84',
      hint: '28명씩 3대이므로 곱셈으로 구해요.',
      wrong: [
        { a: '64', why: '일의 자리에서 올린 2를 더하지 않았어요. $2 \\times 3=6$에 2를 더해 8이에요.' },
        { a: '31', why: '28과 3을 더했어요. 28명씩 3대는 곱셈 $28 \\times 3$이에요.' },
      ],
      explain: '$28 \\times 3$을 계산해요. 일의 자리 $8 \\times 3=24$ → 4를 쓰고 2를 올려요. 십의 자리 $2 \\times 3=6$에 2를 더해 8. 그래서 84명이에요.',
    },
    {
      id: 'p10', level: 2, type: 'order', concept: 4,
      q: '곱이 **큰 것부터** 차례로 놓으세요.',
      choices: ['$46 \\times 7$', '$59 \\times 5$', '$83 \\times 4$', '$67 \\times 3$'],
      answer: [2, 0, 1, 3],
      hint: '하나씩 계산해서 비교해요. 곱하는 수가 크다고 곱이 큰 것은 아니에요.',
      explain: '$46 \\times 7=322$, $59 \\times 5=295$, $83 \\times 4=332$, $67 \\times 3=201$이에요. 큰 것부터 $83 \\times 4$, $46 \\times 7$, $59 \\times 5$, $67 \\times 3$이에요.',
    },
    {
      id: 'p11', level: 1, type: 'short', check: 'number', concept: 1,
      q: '수 모형은 $32 \\times 3$을 나타내요. 모두 얼마일까요?',
      fig: rows(3, 3, 2, '십 모형 3개와 일 모형 2개를 한 줄로 하여 3줄을 놓은 그림'),
      answer: '96',
      wrong: [{ a: '35', why: '32와 3을 더했어요. 32가 3줄 있으므로 $32 \\times 3$이에요.' }],
      explain: '십 모형은 $3 \\times 3=9$개(90), 일 모형은 $2 \\times 3=6$개(6)예요. 모두 $90+6=96$이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 4,
      q: '$\\square$ 안에 들어갈 수 있는 한 자리 수 가운데 가장 큰 수를 구하세요.\n\n$47 \\times \\square<300$',
      answer: '6',
      hint: '$47$은 약 50이에요. 어림해서 범위를 좁힌 뒤 직접 곱해 보세요.',
      wrong: [{ a: '7', why: '$47 \\times 7=329$로 300보다 커요. 곱이 300보다 작아야 해요.' }],
      explain: '$47 \\times 6=282$, $47 \\times 7=329$예요. 282는 300보다 작고 329는 300보다 크므로, 가장 큰 수는 6이에요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', concept: 3,
      q: '어떤 수에 6을 곱해야 할 것을 잘못하여 더했더니 21이 되었어요. 바르게 계산하면 얼마일까요?',
      answer: '90',
      hint: '먼저 거꾸로 생각해서 어떤 수를 구해요.',
      wrong: [
        { a: '15', why: '15는 어떤 수예요. 어떤 수에 6을 곱한 값까지 구해요.' },
        { a: '126', why: '잘못 계산한 결과 21에 6을 곱했어요. 먼저 어떤 수를 구해요.' },
      ],
      explain: '어떤 수 $+6=21$이므로 어떤 수는 $21-6=15$예요. 바르게 계산하면 $15 \\times 6=90$이에요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '숫자 카드 3, 5, 8을 한 번씩만 써서 (두 자리 수)×(한 자리 수)를 만들려고 해요. 곱이 **가장 크게** 될 때의 곱은 얼마일까요?',
      choices: ['424', '415', '280', '255'],
      answer: 0,
      why: [
        '',
        '$83 \\times 5$를 만들었어요. 가장 큰 8을 곱하는 수로 쓰면 8이 두 숫자 모두에 곱해져 더 커져요. $53 \\times 8$과 비교해 보세요.',
        '$35 \\times 8$을 만들었어요. 8을 곱하는 수로 쓴 것은 좋지만, 두 자리 수의 십의 자리에는 남은 수 중 큰 5를 써요.',
        '$85 \\times 3$을 만들었어요. 가장 작은 3을 곱하는 수로 쓰면 곱이 작아져요.',
      ],
      hint: '가장 큰 숫자를 곱하는 수(한 자리 수)에 둘 때와 두 자리 수의 십의 자리에 둘 때를 비교해 보세요.',
      explain: '후보를 계산하면 $53 \\times 8=424$, $83 \\times 5=415$, $35 \\times 8=280$, $85 \\times 3=255$ … 이 가운데 가장 큰 곱은 $53 \\times 8=424$예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: '자루', concept: 3,
      q: '연필 한 타는 12자루예요. 연필 8타 가운데 15자루를 친구들에게 나누어 주었어요. 남은 연필은 몇 자루일까요?',
      answer: '81',
      hint: '먼저 연필이 모두 몇 자루인지 구해요.',
      wrong: [
        { a: '96', why: '96은 처음에 있던 연필의 수예요. 나누어 준 15자루를 빼야 해요.' },
        { a: '71', why: '$12 \\times 8$을 86으로 계산했어요. 일의 자리 $2 \\times 8=16$에서 올린 1을 십의 자리 8에 더하면 9, 곧 96이에요.' },
      ],
      explain: '연필은 모두 $12 \\times 8=96$자루예요. 15자루를 나누어 주었으므로 $96-15=81$자루가 남아요.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'number', concept: 4,
      q: '$\\square$ 안에 알맞은 숫자를 쓰세요.\n\n$\\square4 \\times 6=384$',
      answer: '6',
      hint: '일의 자리 $4 \\times 6=24$에서 올림이 얼마인지 먼저 생각해요.',
      wrong: [{ a: '64', why: '64는 두 자리 수 전체예요. $\\square$ 안에 들어갈 숫자 하나만 써요.' }],
      explain: '일의 자리 $4 \\times 6=24$ → 4를 쓰고 2를 올려요. 십의 자리에서 $\\square \\times 6$에 2를 더한 값이 38이어야 하므로 $\\square \\times 6=36$, $\\square=6$이에요. 확인: $64 \\times 6=384$',
    },
  ],

  deeper: [
    {
      title: '곱하는 순서를 바꾸어도 될까?',
      body: '$6 \\times 47$처럼 한 자리 수가 앞에 있으면 어떻게 계산할까요? 곱셈은 두 수의 순서를 바꾸어도 곱이 같아요. $3 \\times 4$와 $4 \\times 3$이 모두 12인 것처럼요.\n\n그래서 $6 \\times 47=47 \\times 6=282$예요. 익숙한 모양으로 바꾸어 세로셈으로 계산하면 돼요.\n\n2학기에는 $213 \\times 3$처럼 **세 자리 수**에 한 자리 수를 곱하거나, $24 \\times 13$처럼 **두 자리 수끼리** 곱하는 방법을 배워요. 오늘 배운 "자리별로 곱하고, 곱이 10이거나 10보다 크면 올리기"가 그대로 쓰여요.',
    },
  ],

  faq: [
    {
      q: '올림한 수는 언제 더해요?',
      a: '윗자리 숫자를 **곱한 다음에** 더해요. $16 \\times 3$에서 일의 자리에서 1을 올렸다면, 십의 자리는 $1 \\times 3=3$을 먼저 구하고 거기에 1을 더해 4가 돼요.\n\n$(1+1) \\times 3$처럼 먼저 더하고 곱하면 틀려요.',
    },
    {
      q: '(몇십)×(몇)에서 왜 0을 붙여요?',
      a: '20은 10이 2개예요. $20 \\times 3$은 10이 $2 \\times 3=6$개이므로 60이지요. "10이 몇 개인지"를 곱셈구구로 세고, 10의 몇 배이니 끝에 0을 붙이는 거예요.',
    },
    {
      q: '어림은 왜 해요? 그냥 계산하면 되잖아요.',
      a: '어림하면 답이 대강 얼마쯤일지 미리 알 수 있어요. 계산한 답이 어림한 값과 아주 다르면 실수를 찾을 수 있지요.\n\n물건을 살 때 "돈이 모자라지 않을까?"를 빨리 판단할 때도 어림을 써요.',
    },
  ],

  mistakes: [
    '일의 자리에서 올린 수를 십의 자리에 더하는 것을 잊는 실수 — $27 \\times 3$은 61이 아니라 81이에요. 십의 자리 $2 \\times 3=6$에 올린 2를 꼭 더해요.',
    '자리마다 곱한 값을 그대로 이어 쓰는 실수 — $27 \\times 3$을 621로 쓰면 안 돼요. 일의 자리 곱 21은 1만 쓰고 2는 올려요.',
    '십의 자리에만, 또는 일의 자리에만 곱하는 실수 — 두 자리 수의 두 숫자 모두에 곱해요.',
  ],

  gens: [
    {
      id: 'mul-basic',
      level: 1,
      title: '(몇십)×(몇)과 일의 자리에서 올림이 없는 (두 자리 수)×(한 자리 수)',
      make: function (R) {
        if (R.bool(0.35)) {
          var t = R.int(2, 9), k = R.int(2, 9), p = t * k, ans = p * 10;
          return {
            type: 'short', check: 'number', concept: 0,
            q: '계산해 보세요.\n\n$' + (t * 10) + ' \\times ' + k + '$',
            answer: String(ans),
            wrong: [
              { a: String(p), why: '0을 빠뜨렸어요. ' + (t * 10) + R.josa(t * 10, '은/는') + ' 10이 ' + t + '개이므로 $' + t + ' \\times ' + k + '=' + p + '$에 0을 붙여요.' },
              { a: String(p * 100), why: '0을 두 개 붙였어요. ' + (t * 10) + '에는 0이 하나뿐이에요.' },
            ],
            explain: (t * 10) + R.josa(t * 10, '은/는') + ' 10이 ' + t + '개예요. $' + t + ' \\times ' + k + '=' + p + '$에 0을 하나 붙이면 ' + ans + R.josa(ans, '이에요/예요') + '.',
          };
        }
        var k = R.int(2, 9);
        var o = R.int(1, Math.floor(9 / k));             // 일의 자리 곱이 10보다 작게
        var t = R.int(1, 9);
        if (t * k < 10 && R.bool(0.6)) t = R.int(Math.ceil(10 / k), 9); // 십의 자리 올림이 있는 문제를 더 자주
        var n = t * 10 + o, w = mulWork(n, k, R);
        var wrong = [];
        if (t !== 1) wrong.push({ a: String(t * 10 + o * k), why: '일의 자리에만 ' + k + R.josa(k, '을/를') + ' 곱했어요. 십의 자리 ' + t + '에도 곱해요.' });
        if (t * k >= 10 && w.ans % 100 !== t * 10 + o * k) wrong.push({ a: String(w.ans % 100), why: '십의 자리 곱 ' + (t * k) + '에서 ' + Math.floor(t * k / 10) + R.josa(Math.floor(t * k / 10), '을/를') + ' 빠뜨렸어요. 그 숫자는 백의 자리에 써요.' });
        return {
          type: 'short', check: 'number', concept: t * k >= 10 ? 2 : 1,
          q: '계산해 보세요.\n\n$' + n + ' \\times ' + k + '$',
          answer: String(w.ans),
          wrong: wrong,
          explain: '일의 자리부터 곱해요.\n' + w.lines.join('\n') + '\n\n그래서 $' + n + ' \\times ' + k + '=' + w.ans + '$' + R.josa(w.ans, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'mul-ones-carry',
      level: 2,
      title: '일의 자리에서 올림이 있는 (두 자리 수)×(한 자리 수)',
      make: function (R) {
        var k = R.int(2, 9);
        var o = R.int(Math.ceil(10 / k), 9);              // 일의 자리 곱이 10 이상
        var t = R.int(1, 9);
        var n = t * 10 + o, w = mulWork(n, k, R);
        var wrong = [{ a: String(w.noCarry), why: '일의 자리에서 올린 ' + w.carry + R.josa(w.carry, '을/를') + ' 십의 자리에 더하지 않았어요. 십의 자리를 곱한 뒤 올린 수를 더해요.' }];
        if (w.glued !== w.noCarry) wrong.push({ a: String(w.glued), why: '자리마다 곱한 값을 그대로 이어 썼어요. 일의 자리 곱의 십의 자리 숫자는 위로 올려 더해요.' });
        var story = R.bool(0.4), name = R.pick(['민수', '지아', '서준', '하윤', '도윤', '수아']);
        var q = story
          ? (R.josa(name, '이/가') === '이' ? name + '이는' : name + '는') + ' 하루에 줄넘기를 ' + n + '번씩 했어요. ' + k + '일 동안 줄넘기를 모두 몇 번 했을까요?'
          : '계산해 보세요.\n\n$' + n + ' \\times ' + k + '$';
        var p = {
          type: 'short', check: 'number', concept: w.ans >= 100 && Math.floor(n / 10) * k + w.carry >= 10 ? 4 : 3,
          q: q,
          answer: String(w.ans),
          wrong: wrong,
          explain: (story ? n + '번씩 ' + k + '일이므로 $' + n + ' \\times ' + k + '$' + R.josa(k, '을/를') + ' 계산해요.\n' : '일의 자리부터 곱해요.\n') +
            w.lines.join('\n') + '\n\n그래서 $' + n + ' \\times ' + k + '=' + w.ans + '$' + R.josa(w.ans, '이에요/예요') + '.',
        };
        if (story) p.unit = '번';
        return p;
      },
    },
    {
      id: 'mul-estimate',
      level: 2,
      title: '곱셈 결과 어림하기',
      make: function (R) {
        var o = R.pick([1, 2, 3, 4, 6, 7, 8, 9]);
        var t = R.int(1, 8);
        var n = t * 10 + o, k = R.int(3, 9);
        var near = o < 5 ? t * 10 : (t + 1) * 10, far = o < 5 ? (t + 1) * 10 : t * 10;
        var est = near * k;
        var correct = '약 ' + est;
        var cands = [
          ['약 ' + far * k, n + R.josa(n, '을/를') + ' ' + far + R.josa(far, '으로/로') + ' 생각했어요. ' + n + R.josa(n, '은/는') + ' ' + near + '에 더 가까워요.'],
          ['약 ' + est * 10, '0을 하나 더 붙였어요. $' + (near / 10) + ' \\times ' + k + '=' + (near / 10 * k) + '$에 0을 하나만 붙여요.'],
          ['약 ' + (near / 10 * k), '0을 빠뜨렸어요. ' + near + R.josa(near, '은/는') + ' 10이 ' + (near / 10) + '개이므로 $' + (near / 10) + ' \\times ' + k + '=' + (near / 10 * k) + '$에 0을 하나 붙여요.'],
          ['약 ' + (near + k), near + R.josa(near, '과/와') + ' ' + k + R.josa(k, '을/를') + ' 더했어요. 어림할 때도 곱해요.'],
        ];
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: 5,
          q: '$' + n + ' \\times ' + k + '$' + R.josa(k, '을/를') + ' 몇십으로 어림한 값으로 알맞은 것을 고르세요.',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: n + R.josa(n, '은/는') + ' ' + near + '에 가까우므로 $' + near + ' \\times ' + k + '=' + est + '$, ' + correct + R.josa(est, '이에요/예요') + '. (실제 값은 ' + (n * k) + ')',
        };
      },
    },
    {
      id: 'mul-max-digit',
      level: 3,
      title: '곱이 어떤 수보다 작게 되는 가장 큰 수',
      make: function (R) {
        var n = R.int(12, 99);
        while (n % 10 === 0) n = R.int(12, 99);
        var d = R.int(2, 8);
        if (n * d > 700) d = Math.max(2, Math.floor(700 / n));
        var L = (Math.floor(n * d / 10) + 1) * 10; // n×d < L ≤ n×(d+1)
        var big = n * (d + 1);
        return {
          type: 'short', check: 'number', concept: 4,
          q: '$\\square$ 안에 들어갈 수 있는 한 자리 수 가운데 가장 큰 수를 구하세요.\n\n$' + n + ' \\times \\square<' + L + '$',
          answer: String(d),
          hint: '어림해서 범위를 좁힌 뒤 직접 곱해 보세요.',
          wrong: [{ a: String(d + 1), why: '$' + n + ' \\times ' + (d + 1) + '=' + big + '$' + R.josa(big, '으로/로') + ' ' + L + '보다 ' + (big === L ? '작지 않아요' : '커요') + '. 곱이 ' + L + '보다 작아야 해요.' }],
          explain: '$' + n + ' \\times ' + d + '=' + (n * d) + '$, $' + n + ' \\times ' + (d + 1) + '=' + big + '$' + R.josa(big, '이에요/예요') + '. ' + (n * d) + R.josa(n * d, '은/는') + ' ' + L + '보다 작고 ' + big + R.josa(big, '은/는') + ' ' + L + '보다 ' + (big === L ? '작지 않으므로' : '크므로') + ' 가장 큰 수는 ' + d + R.josa(d, '이에요/예요') + '.',
        };
      },
    },
  ],
});
})();
