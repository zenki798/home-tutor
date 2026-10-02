/* 6학년 수학 · 분수의 나눗셈(÷분수)
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy) */
(function () {
  // 분수(Frac) → TeX: 1보다 크면 대분수, 자연수면 자연수
  function tex(f) { return f.toTex({ mixed: true }); }
  // 그 수를 읽은 소리에 맞는 조사 (대분수·분수는 분자, 자연수는 그 수)
  function josa(R, f, pair) {
    if (f.isInt()) return R.josa(f.num, pair);
    return R.josa(f.toMixed().num, pair);
  }
  function fr(n, d) { return '\\frac{' + n + '}{' + d + '}'; }
  function frx(n, d) { return d === 1 ? String(n) : fr(n, d); }
  function gcd(a, b) { while (b) { var t = a % b; a = b; b = t; } return a; }
  // 값이 같은 오답은 빼고, 같은 오답은 하나만
  function keepWrong(R, ans, list) {
    var out = [], seen = [ans];
    list.forEach(function (w) {
      var v = R.F(1, 1).mul(w.v);
      if (seen.some(function (s) { return s.eq(v); })) return;
      seen.push(v);
      out.push({ a: v.toString(), why: w.why });
    });
    return out;
  }
  // n/d 를 약분·대분수까지 이어 쓴 TeX: \frac{12}{8}=\frac{3}{2}=1\frac{1}{2}  (나누어떨어지면 그 수만)
  function chain(R, n, d) {
    var f = R.F(n, d);
    if (d === 1) return String(n);
    var parts = [fr(n, d)];
    if (f.isInt()) parts.push(String(f.num));
    else {
      if (f.den !== d) parts.push(fr(f.num, f.den));
      if (f.num > f.den) parts.push(tex(f));
    }
    return parts.join('=');
  }

Tutor.registerUnit({
  id: 'math-e6-07',
  course: 'math-e6',
  title: '분수의 나눗셈(÷분수)',
  summary: '분모가 같거나 다른 (분수)÷(분수)와 (자연수)÷(분수)를 하고, 곱셈으로 바꾸어 계산해요.',
  goals: [
    '분모가 같은 (분수)÷(분수)와 분모가 다른 (분수)÷(분수)를 계산할 수 있어요.',
    '(자연수)÷(분수)를 계산할 수 있어요.',
    '(분수)÷(분수)를 (분수)×(분수)로 바꾸어 계산할 수 있어요.',
    '대분수가 있는 분수의 나눗셈을 할 수 있어요.',
  ],
  standards: ['[6수01-11]'],

  concepts: [
    {
      title: '분모가 같은 (분수)÷(분수)',
      body: '$\\frac{6}{7} \\div \\frac{2}{7}$는 "$\\frac{6}{7}$ 안에 $\\frac{2}{7}$가 몇 번 들어갈까?"를 묻는 거예요.\n\n$\\frac{6}{7}$은 $\\frac{1}{7}$이 6개, $\\frac{2}{7}$는 $\\frac{1}{7}$이 2개예요. 그래서 6개를 2개씩 묶는 것과 같아요.\n\n$\\frac{6}{7} \\div \\frac{2}{7}=6 \\div 2=3$\n\n**분모가 같으면 분자끼리 나누면 돼요.** 분자끼리 나누어떨어지지 않으면 몫을 분수로 나타내요.\n\n$\\frac{5}{7} \\div \\frac{2}{7}=5 \\div 2=\\frac{5}{2}=2\\frac{1}{2}$',
      easy: '피자 한 판을 7조각으로 나눴어요. 6조각이 있는데 한 사람에게 2조각씩 주면 몇 명에게 줄 수 있을까요? $6 \\div 2=3$, 3명이에요.\n\n조각의 크기(분모)가 같으니 조각 수(분자)만 나누면 돼요.',
      fig: { type: 'fraction', shape: 'bar', n: 6, d: 7, alt: '7칸 중 6칸을 색칠한 막대' },
      check: {
        type: 'choice',
        q: '$\\frac{6}{8} \\div \\frac{2}{8}$의 값은 무엇일까요?',
        choices: ['$3$', '$\\frac{3}{8}$', '$\\frac{1}{3}$'],
        answer: 0,
        why: ['', '분자끼리 나누고 분모 8을 그대로 두었어요. 분모가 같으면 몫은 분자끼리 나눈 $6 \\div 2$예요.', '거꾸로 나누었어요. $\\frac{6}{8}$ 안에 $\\frac{2}{8}$가 몇 번 들어가는지 생각해요.'],
        explain: '분모가 같으므로 분자끼리 나누어요. $6 \\div 2=3$이므로 몫은 3이에요.',
      },
    },
    {
      title: '분모가 다른 (분수)÷(분수)',
      body: '분모가 다르면 먼저 **통분**해서 분모를 같게 만든 다음, 분자끼리 나누어요.\n\n$\\frac{3}{4} \\div \\frac{1}{8}=\\frac{6}{8} \\div \\frac{1}{8}=6 \\div 1=6$\n\n$\\frac{2}{3} \\div \\frac{3}{5}=\\frac{10}{15} \\div \\frac{9}{15}=10 \\div 9=\\frac{10}{9}=1\\frac{1}{9}$\n\n> 💡 조각의 크기가 다르면 몇 번 들어가는지 셀 수 없어요. 통분은 두 분수를 **같은 크기의 조각**으로 다시 자르는 일이에요.',
      easy: '$\\frac{3}{4}$ m 리본을 $\\frac{1}{8}$ m씩 자른다고 생각해 보세요. $\\frac{3}{4}$ m는 $\\frac{1}{8}$ m 조각으로 바꾸면 $\\frac{6}{8}$ m, 곧 $\\frac{1}{8}$ m가 6개예요. 그래서 6도막이 나와요.',
      check: {
        type: 'short', check: 'number',
        q: '계산해 보세요.\n\n$\\frac{3}{4} \\div \\frac{1}{8}$',
        answer: '6',
        wrong: [
          { a: '3/32', why: '나누지 않고 곱했어요. 통분하면 $\\frac{6}{8} \\div \\frac{1}{8}=6 \\div 1$이에요.' },
          { a: '3', why: '통분하지 않고 분자끼리 나누었어요. 분모가 다르면 먼저 통분해요.' },
        ],
        explain: '$\\frac{3}{4}=\\frac{6}{8}$이므로 $\\frac{6}{8} \\div \\frac{1}{8}=6 \\div 1=6$이에요.',
      },
    },
    {
      title: '(자연수)÷(분수)',
      body: '고구마 $\\frac{2}{3}$ kg의 값이 6000원이라면 1 kg의 값은 얼마일까요? 이것이 $6000 \\div \\frac{2}{3}$예요.\n\n1. $\\frac{1}{3}$ kg의 값: $\\frac{2}{3}$ kg은 $\\frac{1}{3}$ kg이 2개이므로 $6000 \\div 2=3000$(원)\n2. 1 kg의 값: 1 kg은 $\\frac{1}{3}$ kg이 3개이므로 $3000 \\times 3=9000$(원)\n\n곧 **자연수를 분자로 나누고, 분모를 곱해요.**\n\n$6 \\div \\frac{2}{3}=(6 \\div 2) \\times 3=9$',
      easy: '"$\\frac{2}{3}$에 6이 들어 있다면, 1에는 얼마가 들어 있을까?"라고 생각해 보세요.\n\n$\\frac{2}{3}$를 반으로 나누면 $\\frac{1}{3}$이니 6도 반으로: 3. 1은 $\\frac{1}{3}$이 3개이니 3을 3배: 9.',
      check: {
        type: 'short', check: 'number',
        q: '계산해 보세요.\n\n$4 \\div \\frac{2}{5}$',
        answer: '10',
        wrong: [
          { a: '8/5', why: '나누지 않고 곱했어요. 4를 분자 2로 나누고, 분모 5를 곱해요.' },
          { a: '2', why: '분자 2로 나누기만 했어요. 1은 $\\frac{1}{5}$이 5개이므로 5를 곱해야 해요.' },
        ],
        explain: '$4 \\div \\frac{2}{5}=(4 \\div 2) \\times 5=2 \\times 5=10$이에요.',
      },
    },
    {
      title: '(분수)÷(분수)를 (분수)×(분수)로',
      body: '통분해서 나누는 과정을 살펴보면 규칙이 보여요.\n\n$\\frac{2}{3} \\div \\frac{4}{5}=\\frac{2 \\times 5}{3 \\times 5} \\div \\frac{4 \\times 3}{5 \\times 3}=(2 \\times 5) \\div (4 \\times 3)=\\frac{2 \\times 5}{3 \\times 4}=\\frac{2}{3} \\times \\frac{5}{4}$\n\n그래서 **나누는 분수의 분모와 분자를 바꾸어 곱하면** 돼요.\n\n(분수) ÷ $\\frac{4}{5}$ → (분수) × $\\frac{5}{4}$\n\n예: $\\frac{2}{3} \\div \\frac{4}{5}=\\frac{2}{3} \\times \\frac{5}{4}=\\frac{10}{12}=\\frac{5}{6}$\n\n> ⚠️ 바꾸는 것은 **나누는 수(÷ 뒤의 분수)**뿐이에요. 앞의 분수는 그대로 두어요. (자연수)÷(분수)도 같아요: $6 \\div \\frac{2}{3}=6 \\times \\frac{3}{2}=9$',
      easy: '"÷ 분수"를 만나면 두 가지만 바꿔요.\n\n1. ÷ 를 × 로\n2. 뒤의 분수를 거꾸로(분모와 분자를 바꿔서)\n\n$\\frac{2}{3} \\div \\frac{4}{5}$ → $\\frac{2}{3} \\times \\frac{5}{4}$. 그다음은 5학년 때 배운 분수의 곱셈이에요.',
      check: {
        type: 'ox',
        q: '$\\frac{2}{3} \\div \\frac{4}{5}$는 $\\frac{2}{3} \\times \\frac{5}{4}$와 값이 같아요.',
        answer: true,
        explain: '나누는 분수 $\\frac{4}{5}$의 분모와 분자를 바꾸어 곱하면 돼요. $\\frac{2}{3} \\times \\frac{5}{4}=\\frac{10}{12}=\\frac{5}{6}$예요.',
      },
    },
    {
      title: '대분수가 있는 분수의 나눗셈',
      body: '대분수가 있으면 먼저 **대분수를 가분수로 바꾼** 다음, 나누는 분수의 분모와 분자를 바꾸어 곱해요.\n\n$1\\frac{3}{4} \\div \\frac{2}{3}=\\frac{7}{4} \\div \\frac{2}{3}=\\frac{7}{4} \\times \\frac{3}{2}=\\frac{21}{8}=2\\frac{5}{8}$\n\n$2\\frac{1}{4} \\div 1\\frac{1}{2}=\\frac{9}{4} \\div \\frac{3}{2}=\\frac{9}{4} \\times \\frac{2}{3}=\\frac{18}{12}=\\frac{3}{2}=1\\frac{1}{2}$\n\n> ⚠️ 대분수인 채로 분모와 분자를 바꾸면 안 돼요. $1\\frac{1}{2}$을 $1\\frac{2}{1}$처럼 바꾸는 것은 틀린 방법이에요. 꼭 가분수 $\\frac{3}{2}$으로 바꾼 다음 $\\frac{2}{3}$로 바꾸어요.',
      easy: '대분수는 "자연수 + 진분수"가 붙어 있는 모양이라 그대로는 뒤집을 수 없어요. 레고 블록을 하나로 합치듯 가분수 하나로 만든 다음에 계산해요.\n\n$1\\frac{3}{4}$ → 1은 $\\frac{4}{4}$이니 $\\frac{4}{4}+\\frac{3}{4}=\\frac{7}{4}$',
      check: {
        type: 'choice',
        q: '$1\\frac{1}{2} \\div \\frac{3}{4}$의 값은 무엇일까요?',
        choices: ['$2$', '$1\\frac{2}{3}$', '$\\frac{9}{8}$'],
        answer: 0,
        why: ['', '자연수 1은 그대로 두고 분수 부분만 나누었어요. 대분수를 가분수 $\\frac{3}{2}$으로 바꾼 뒤 계산해요.', '나누는 분수를 뒤집지 않고 곱했어요. $\\frac{3}{2} \\times \\frac{4}{3}$로 계산해요.'],
        explain: '$1\\frac{1}{2}=\\frac{3}{2}$이므로 $\\frac{3}{2} \\div \\frac{3}{4}=\\frac{3}{2} \\times \\frac{4}{3}=\\frac{12}{6}=2$예요.',
      },
    },
  ],

  examples: [
    {
      q: '계산해 보세요.\n\n$\\frac{5}{6} \\div \\frac{3}{8}$',
      steps: [
        '방법 1 (통분): $\\frac{5}{6}=\\frac{20}{24}$, $\\frac{3}{8}=\\frac{9}{24}$이므로 $20 \\div 9=\\frac{20}{9}$',
        '방법 2 (곱셈): $\\frac{5}{6} \\times \\frac{8}{3}=\\frac{40}{18}=\\frac{20}{9}$',
        '가분수를 대분수로 나타내면 $\\frac{20}{9}=2\\frac{2}{9}$예요.',
      ],
      answer: '$\\frac{20}{9}=2\\frac{2}{9}$',
    },
    {
      q: '페인트 $2\\frac{2}{3}$ L로 벽 $\\frac{4}{5}$ m²를 칠할 수 있어요. 벽 1 m²를 칠하는 데 드는 페인트는 몇 L일까요?',
      steps: [
        '1 m²에 드는 양을 구하려면 페인트의 양을 벽의 넓이로 나누어요: $2\\frac{2}{3} \\div \\frac{4}{5}$',
        '대분수를 가분수로: $2\\frac{2}{3}=\\frac{8}{3}$',
        '곱셈으로 바꾸어요: $\\frac{8}{3} \\times \\frac{5}{4}=\\frac{40}{12}=\\frac{10}{3}$',
        '대분수로 나타내면 $3\\frac{1}{3}$ L예요.',
      ],
      answer: '$3\\frac{1}{3}$ L',
    },
  ],

  terms: [
    { term: '통분', def: '분모가 다른 분수들의 분모를 같게 만드는 것이에요. 예: $\\frac{3}{4}$과 $\\frac{1}{8}$을 $\\frac{6}{8}$과 $\\frac{1}{8}$로' },
    { term: '나누어지는 수', def: '나눗셈 ÷ 앞에 있는 수예요. $\\frac{3}{4} \\div \\frac{1}{8}$에서 $\\frac{3}{4}$' },
    { term: '나누는 수', def: '나눗셈 ÷ 뒤에 있는 수예요. 곱셈으로 바꿀 때 분모와 분자를 바꾸는 것은 이 수예요.' },
    { term: '몫', def: '나눗셈의 결과예요. 분수의 나눗셈에서는 몫이 분수나 대분수가 될 수 있어요.' },
    { term: '가분수', def: '분자가 분모와 같거나 분모보다 큰 분수예요. 예: $\\frac{7}{4}$' },
    { term: '대분수', def: '자연수와 진분수로 이루어진 분수예요. 예: $1\\frac{3}{4}$. 나눗셈을 할 때는 가분수로 바꾸어요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
      q: '계산해 보세요.\n\n$\\frac{8}{9} \\div \\frac{2}{9}$',
      answer: '4',
      wrong: [
        { a: '4/9', why: '분자끼리 나누고 분모 9를 그대로 두었어요. 분모가 같으면 몫은 $8 \\div 2$예요.' },
        { a: '1/4', why: '거꾸로 나누었어요. $\\frac{8}{9}$ 안에 $\\frac{2}{9}$가 몇 번 들어가는지 구해요.' },
      ],
      explain: '분모가 같으므로 분자끼리 나누어요. $8 \\div 2=4$',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', concept: 0,
      q: '계산해 보세요. 답은 가분수나 대분수로 써요.\n\n$\\frac{5}{7} \\div \\frac{3}{7}$',
      answer: '5/3',
      wrong: [
        { a: '3/5', why: '거꾸로 나누었어요. 나누어지는 수의 분자 5를 나누는 수의 분자 3으로 나누어요.' },
        { a: '5/21', why: '분모 7을 그대로 두었어요. 분모가 같으면 몫은 $5 \\div 3$이에요.' },
      ],
      explain: '분모가 같으므로 $5 \\div 3=\\frac{5}{3}=1\\frac{2}{3}$예요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '$\\frac{5}{6} \\div \\frac{1}{3}$의 값은 무엇일까요?',
      choices: ['$2\\frac{1}{2}$', '$\\frac{5}{18}$', '$\\frac{2}{5}$', '$1\\frac{2}{3}$'],
      answer: 0,
      why: [
        '',
        '나누지 않고 곱했어요. 통분하거나, 나누는 분수를 뒤집어 곱해요.',
        '거꾸로 나누었어요. ÷ 앞의 수를 뒤의 수로 나누어요.',
        '통분하지 않고 분자끼리 $5 \\div 3$을 했어요. 분모가 다르면 먼저 통분해요.',
      ],
      explain: '$\\frac{1}{3}=\\frac{2}{6}$로 통분하면 $\\frac{5}{6} \\div \\frac{2}{6}=5 \\div 2=\\frac{5}{2}=2\\frac{1}{2}$이에요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', concept: 2,
      q: '계산해 보세요.\n\n$6 \\div \\frac{3}{4}$',
      answer: '8',
      wrong: [
        { a: '9/2', why: '나누지 않고 곱했어요. $6 \\times \\frac{3}{4}$이 아니라 $6 \\times \\frac{4}{3}$예요.' },
        { a: '2', why: '분자 3으로 나누기만 했어요. 그다음 분모 4를 곱해야 해요.' },
      ],
      explain: '$6 \\div \\frac{3}{4}=(6 \\div 3) \\times 4=2 \\times 4=8$이에요.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 3,
      q: '$\\frac{3}{5} \\div \\frac{2}{7}$는 $\\frac{3}{5} \\times \\frac{2}{7}$와 값이 같아요.',
      answer: false,
      explain: '나누는 분수의 분모와 분자를 바꾸어 곱해야 해요. $\\frac{3}{5} \\div \\frac{2}{7}=\\frac{3}{5} \\times \\frac{7}{2}=\\frac{21}{10}$이에요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', concept: 3,
      q: '곱셈으로 바꾸어 계산해 보세요.\n\n$\\frac{4}{5} \\div \\frac{2}{3}$',
      answer: '6/5',
      wrong: [
        { a: '8/15', why: '나누는 분수를 뒤집지 않고 곱했어요. $\\frac{4}{5} \\times \\frac{3}{2}$으로 계산해요.' },
        { a: '5/6', why: '앞의 분수를 뒤집었어요. 바꾸는 것은 ÷ 뒤의 분수예요.' },
      ],
      explain: '$\\frac{4}{5} \\times \\frac{3}{2}=\\frac{12}{10}=\\frac{6}{5}=1\\frac{1}{5}$이에요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'number', concept: 4,
      q: '계산해 보세요.\n\n$2\\frac{1}{4} \\div \\frac{3}{8}$',
      answer: '6',
      wrong: [
        { a: '27/32', why: '나누지 않고 곱했어요. $\\frac{9}{4} \\times \\frac{8}{3}$로 계산해요.' },
        { a: '2 2/3', why: '자연수 2는 그대로 두고 분수 부분만 나누었어요. 대분수를 가분수로 바꾼 뒤 계산해요.' },
      ],
      explain: '$2\\frac{1}{4}=\\frac{9}{4}$이므로 $\\frac{9}{4} \\times \\frac{8}{3}=\\frac{72}{12}=6$이에요.',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'number', unit: '도막', concept: 2,
      q: '리본 10 m를 $\\frac{2}{3}$ m씩 자르면 몇 도막이 될까요?',
      answer: '15',
      hint: '10 m 안에 $\\frac{2}{3}$ m가 몇 번 들어가는지 구해요.',
      wrong: [
        { a: '20/3', why: '나누지 않고 곱했어요. 몇 도막인지는 $10 \\div \\frac{2}{3}$로 구해요.' },
        { a: '5', why: '분자 2로 나누기만 했어요. 분모 3을 곱해야 해요.' },
      ],
      explain: '$10 \\div \\frac{2}{3}=(10 \\div 2) \\times 3=15$이므로 15도막이에요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: 'm', concept: 4,
      q: '넓이가 $3\\frac{3}{4}$ m²인 직사각형의 가로가 $1\\frac{1}{2}$ m예요. 세로는 몇 m일까요?',
      answer: '5/2',
      hint: '(세로) = (넓이) ÷ (가로)예요.',
      wrong: [{ a: '45/8', why: '넓이와 가로를 곱했어요. 세로는 넓이를 가로로 나누어 구해요.' }],
      explain: '$3\\frac{3}{4} \\div 1\\frac{1}{2}=\\frac{15}{4} \\div \\frac{3}{2}=\\frac{15}{4} \\times \\frac{2}{3}=\\frac{30}{12}=\\frac{5}{2}=2\\frac{1}{2}$이므로 세로는 $2\\frac{1}{2}$ m예요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '몫이 1보다 **큰** 것은 무엇일까요?',
      choices: [
        '$\\frac{3}{4} \\div \\frac{2}{3}$',
        '$\\frac{2}{5} \\div \\frac{3}{4}$',
        '$\\frac{1}{2} \\div \\frac{5}{6}$',
        '$\\frac{4}{9} \\div \\frac{2}{3}$',
      ],
      answer: 0,
      why: [
        '',
        '$\\frac{2}{5}$가 $\\frac{3}{4}$보다 작아서 몫은 1보다 작아요. ($\\frac{8}{15}$)',
        '$\\frac{1}{2}$이 $\\frac{5}{6}$보다 작아서 몫은 1보다 작아요. ($\\frac{3}{5}$)',
        '$\\frac{4}{9}$가 $\\frac{2}{3}$보다 작아서 몫은 1보다 작아요. ($\\frac{2}{3}$)',
      ],
      hint: '나누어지는 수가 나누는 수보다 크면 몫은 1보다 커요.',
      explain: '나누어지는 수가 나누는 수보다 클 때 몫이 1보다 커요. $\\frac{3}{4}>\\frac{2}{3}$이고, 실제로 $\\frac{3}{4} \\times \\frac{3}{2}=\\frac{9}{8}=1\\frac{1}{8}$이에요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', concept: 1,
      q: '어떤 수에 $\\frac{3}{5}$을 곱했더니 $\\frac{9}{10}$가 되었어요. 어떤 수는 얼마일까요?',
      answer: '3/2',
      hint: '곱셈을 거꾸로 하면 나눗셈이에요.',
      wrong: [{ a: '27/50', why: '$\\frac{9}{10}$에 $\\frac{3}{5}$을 곱했어요. 어떤 수는 $\\frac{9}{10} \\div \\frac{3}{5}$으로 구해요.' }],
      explain: '어떤 수는 $\\frac{9}{10} \\div \\frac{3}{5}$이에요. 통분하면 $\\frac{9}{10} \\div \\frac{6}{10}=9 \\div 6=\\frac{9}{6}=\\frac{3}{2}=1\\frac{1}{2}$이에요.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', unit: '일', concept: 4,
      q: '쌀 $4\\frac{1}{2}$ kg을 하루에 $\\frac{3}{4}$ kg씩 먹으면 며칠 동안 먹을 수 있을까요?',
      answer: '6',
      hint: '$4\\frac{1}{2}$ kg 안에 $\\frac{3}{4}$ kg이 몇 번 들어가는지 구해요.',
      wrong: [{ a: '27/8', why: '곱했어요. 며칠 동안 먹는지는 $4\\frac{1}{2} \\div \\frac{3}{4}$으로 구해요.' }],
      explain: '$4\\frac{1}{2} \\div \\frac{3}{4}=\\frac{9}{2} \\times \\frac{4}{3}=\\frac{36}{6}=6$이므로 6일 동안 먹을 수 있어요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 3,
      q: '$\\square$ 안에 들어갈 수 있는 자연수 가운데 가장 큰 수를 구해 보세요.\n\n$\\frac{5}{6} \\div \\frac{1}{\\square}<4$',
      answer: '4',
      hint: '$\\div \\frac{1}{\\square}$은 $\\times \\square$와 같아요.',
      wrong: [{ a: '5', why: '$\\square=5$이면 $\\frac{5}{6} \\times 5=\\frac{25}{6}=4\\frac{1}{6}$로 4보다 커요.' }],
      explain: '$\\frac{5}{6} \\div \\frac{1}{\\square}=\\frac{5}{6} \\times \\square$예요. $\\square=4$이면 $\\frac{20}{6}=3\\frac{1}{3}$로 4보다 작고, $\\square=5$이면 $\\frac{25}{6}=4\\frac{1}{6}$로 4보다 커요. 그래서 가장 큰 수는 4예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', concept: 0,
      q: '수 카드 2, 3, 5, 7 가운데 두 장을 골라 한 번씩 써서 다음 나눗셈을 만들려고 해요. 몫이 가장 크게 될 때의 몫을 구해 보세요.\n\n$\\frac{\\square}{9} \\div \\frac{\\square}{9}$',
      answer: '7/2',
      hint: '분모가 같으면 몫은 (앞 분자)÷(뒤 분자)예요. 몫이 크려면 어떻게 해야 할까요?',
      wrong: [{ a: '2/7', why: '몫이 가장 작은 경우를 만들었어요. 나누어지는 분자는 크게, 나누는 분자는 작게 해요.' }],
      explain: '분모가 같으므로 몫은 (앞 분자)÷(뒤 분자)예요. 앞에 가장 큰 7, 뒤에 가장 작은 2를 놓으면 $7 \\div 2=\\frac{7}{2}=3\\frac{1}{2}$로 가장 커요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', concept: 2,
      q: '어떤 수를 $\\frac{2}{5}$로 나누어야 할 것을 잘못하여 곱했더니 $\\frac{4}{5}$가 되었어요. 바르게 계산한 값을 구해 보세요.',
      answer: '5',
      hint: '먼저 거꾸로 생각해서 어떤 수를 구해요.',
      wrong: [{ a: '2', why: '어떤 수까지만 구했어요. 어떤 수를 $\\frac{2}{5}$로 나누어야 해요.' }],
      explain: '어떤 수에 $\\frac{2}{5}$를 곱한 것이 $\\frac{4}{5}$이므로 어떤 수는 $\\frac{4}{5} \\div \\frac{2}{5}=4 \\div 2=2$예요. 바르게 계산하면 $2 \\div \\frac{2}{5}=(2 \\div 2) \\times 5=5$예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: 'km', concept: 4,
      q: '민수는 $3\\frac{1}{3}$ km를 $\\frac{2}{3}$시간 동안 일정한 빠르기로 걸었어요. 같은 빠르기로 1시간 동안 걸으면 몇 km를 걸을 수 있을까요?',
      answer: '5',
      hint: '1시간 동안 걷는 거리는 (걸은 거리)÷(걸린 시간)이에요.',
      wrong: [{ a: '20/9', why: '거리와 시간을 곱했어요. 1시간 동안의 거리는 나누어서 구해요.' }],
      explain: '$3\\frac{1}{3} \\div \\frac{2}{3}=\\frac{10}{3} \\div \\frac{2}{3}=10 \\div 2=5$이므로 1시간 동안 5 km를 걸을 수 있어요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 3,
      q: '계산하지 않고, 몫이 가장 큰 것을 골라 보세요.',
      choices: [
        '$\\frac{3}{4} \\div \\frac{1}{2}$',
        '$\\frac{3}{4} \\div \\frac{2}{3}$',
        '$\\frac{3}{4} \\div \\frac{5}{6}$',
        '$\\frac{3}{4} \\div \\frac{7}{8}$',
      ],
      answer: 0,
      why: [
        '',
        '$\\frac{2}{3}$는 $\\frac{1}{2}$보다 커요. 나누어지는 수가 같으면 나누는 수가 작을수록 몫이 커요.',
        '$\\frac{5}{6}$는 $\\frac{1}{2}$보다 커요. 나누는 수가 클수록 몫은 작아져요.',
        '$\\frac{7}{8}$은 네 수 가운데 가장 커서 몫은 가장 작아요.',
      ],
      hint: '나누어지는 수가 모두 $\\frac{3}{4}$으로 같아요. 나누는 수의 크기를 비교해 보세요.',
      explain: '나누어지는 수가 같으면 나누는 수가 작을수록 몫이 커요. $\\frac{1}{2}<\\frac{2}{3}<\\frac{5}{6}<\\frac{7}{8}$이므로 $\\frac{3}{4} \\div \\frac{1}{2}$의 몫이 가장 커요. (실제로 $\\frac{3}{2}$, $\\frac{9}{8}$, $\\frac{9}{10}$, $\\frac{6}{7}$)',
    },
  ],

  deeper: [
    {
      title: '왜 나누는 분수를 뒤집어 곱할까?',
      body: '두 분수를 분모의 곱으로 통분해서 나누어 보면 이유가 보여요.\n\n$\\frac{a}{b} \\div \\frac{c}{d}=\\frac{a \\times d}{b \\times d} \\div \\frac{c \\times b}{d \\times b}=(a \\times d) \\div (c \\times b)=\\frac{a \\times d}{b \\times c}=\\frac{a}{b} \\times \\frac{d}{c}$\n\n통분한 뒤 분자끼리 나누는 계산이 결국 "나누는 분수의 분모와 분자를 바꾸어 곱하기"와 같은 거예요.\n\n중학교 1학년에서는 분모와 분자를 바꾼 수를 **역수**라고 부르고, "어떤 수로 나누는 것은 그 수의 역수를 곱하는 것과 같다"고 배워요. 음수가 있는 나눗셈에서도 똑같이 쓰여요.',
    },
    {
      title: '나눴는데 왜 더 커질까?',
      body: '$6 \\div 2=3$처럼 자연수로 나누면 몫이 작아지는 경우가 많지만, 1보다 작은 수로 나누면 몫이 나누어지는 수보다 커져요.\n\n$6 \\div \\frac{1}{2}=12$는 "6 안에 $\\frac{1}{2}$이 몇 번 들어갈까?"예요. 1 안에 $\\frac{1}{2}$이 2번 들어가니 6 안에는 12번 들어가요.\n\n- 1보다 큰 수로 나누면 → 몫은 나누어지는 수보다 작아요.\n- 1로 나누면 → 몫은 그대로예요.\n- 1보다 작은 수로 나누면 → 몫은 나누어지는 수보다 커요.',
    },
  ],

  faq: [
    {
      q: '나눗셈을 했는데 왜 답이 더 커져요?',
      a: '1보다 작은 수로 나누었기 때문이에요. $3 \\div \\frac{1}{4}$은 "3 안에 $\\frac{1}{4}$이 몇 번 들어갈까?"라서 12번이에요. 작은 조각으로 나눌수록 들어가는 횟수가 많아져요.',
    },
    {
      q: '분모와 분자를 바꿀 때 어느 쪽 분수를 바꿔요?',
      a: '÷ 뒤에 있는 **나누는 수**만 바꿔요. 앞의 분수는 그대로 두고 ÷를 ×로 바꿔요.\n\n예: $\\frac{2}{3} \\div \\frac{4}{5}=\\frac{2}{3} \\times \\frac{5}{4}$',
    },
    {
      q: '약분은 언제 해요?',
      a: '곱셈으로 바꾼 다음에 하면 편해요. $\\frac{4}{9} \\times \\frac{3}{8}$처럼 곱셈 식에서는 분자와 분모를 서로 약분할 수 있어요. 나눗셈 식인 채로 ÷ 양쪽의 분자와 분모를 약분하면 틀리기 쉬워요.\n\n계산이 끝난 답도 약분할 수 있으면 기약분수로 나타내요.',
    },
  ],

  mistakes: [
    '앞의 분수(나누어지는 수)를 뒤집는 실수 — 분모와 분자를 바꾸는 것은 ÷ 뒤의 나누는 수예요.',
    '대분수를 가분수로 바꾸지 않고 계산하는 실수 — $1\\frac{1}{2}$은 먼저 $\\frac{3}{2}$으로 바꾼 다음 계산해요.',
    '분모가 같은 분수를 나눌 때 분모를 그대로 남기는 실수 — $\\frac{6}{7} \\div \\frac{2}{7}$는 $\\frac{3}{7}$이 아니라 3이에요.',
  ],

  gens: [
    {
      id: 'same-den-or-whole',
      level: 1,
      title: '분모가 같은 (분수)÷(분수), (자연수)÷(분수)',
      make: function (R) {
        var ans, wrong, q, explain, concept;
        if (R.bool(0.4)) {
          // (자연수)÷(분수)
          var c = R.int(3, 9), b = R.int(1, c - 1);
          if (gcd(b, c) > 1) b = 1;
          var n = R.bool(0.5) ? b * R.int(2, 4) : R.int(2, 9);
          ans = R.F(n * c, b);
          concept = 2;
          q = '계산해 보세요.\n\n$' + n + ' \\div ' + fr(b, c) + '$';
          explain = n % b === 0
            ? '$' + n + ' \\div ' + fr(b, c) + '=(' + n + ' \\div ' + b + ') \\times ' + c + '=' + (n / b) + ' \\times ' + c + '=' + (n / b * c) + '$' + R.josa(n / b * c, '이에요/예요') + '.'
            : '나누는 분수의 분모와 분자를 바꾸어 곱해요. $' + n + ' \\div ' + fr(b, c) + '=' + n + ' \\times ' + fr(c, b) + '=' + chain(R, n * c, b) + '$' + josa(R, ans, '이에요/예요') + '.';
          wrong = keepWrong(R, ans, [
            { v: R.F(n * b, c), why: b === 1
              ? '나누지 않고 곱했어요. $' + n + ' \\div ' + fr(1, c) + '$' + R.josa(1, '은/는') + ' $' + n + ' \\times ' + c + '$' + R.josa(c, '과/와') + ' 같아요.'
              : '나누지 않고 곱했어요. 나누는 분수의 분모와 분자를 바꾸어 $' + n + ' \\times ' + fr(c, b) + '$' + R.josa(c, '으로/로') + ' 계산해요.' },
            { v: R.F(n, b), why: '분자 ' + b + R.josa(b, '으로/로') + ' 나누기만 했어요. 그다음 분모 ' + c + R.josa(c, '을/를') + ' 곱해야 해요.' },
          ]);
        } else {
          // 분모가 같은 (분수)÷(분수)
          var d = R.int(3, 12), a = R.int(1, d - 1), e = R.int(1, d - 1);
          if (e === a) e = a === d - 1 ? a - 1 : a + 1;
          ans = R.F(a, e);
          concept = 0;
          q = '계산해 보세요.\n\n$' + fr(a, d) + ' \\div ' + fr(e, d) + '$';
          explain = '분모가 같으므로 분자끼리 나누어요. $' + a + ' \\div ' + e + '=' + chain(R, a, e) + '$' + josa(R, ans, '이에요/예요') + '.';
          wrong = keepWrong(R, ans, [
            { v: R.F(e, a), why: '거꾸로 나누었어요. ÷ 앞의 분자 ' + a + R.josa(a, '을/를') + ' 뒤의 분자 ' + e + R.josa(e, '으로/로') + ' 나누어요.' },
            { v: R.F(a, e * d), why: '분자끼리 나눈 다음 분모 ' + d + R.josa(d, '을/를') + ' 그대로 두었어요. 분모가 같으면 몫은 분자끼리 나눈 값이에요.' },
            { v: R.F(a * e, d * d), why: '나누지 않고 곱했어요.' },
          ]);
        }
        return {
          type: 'short', check: 'number', concept: concept,
          q: q,
          answer: ans.toString(),
          wrong: wrong,
          explain: explain,
        };
      },
    },
    {
      id: 'diff-den',
      level: 2,
      title: '분모가 다른 (분수)÷(분수)',
      make: function (R) {
        var b = R.int(2, 9), d = R.int(2, 9);
        if (d === b) d = b === 9 ? 8 : b + 1;
        var a = R.int(1, b - 1), c = R.int(1, d - 1);
        while (gcd(a, b) > 1) a--;
        while (gcd(c, d) > 1) c--;
        if (a * d === b * c) { if (d > 2) c = c === 1 ? 2 : c - 1; else a = a === 1 ? 2 : a - 1; }
        if (gcd(a, b) > 1 || gcd(c, d) > 1) { a = 1; c = d - 1; }
        var ans = R.F(a * d, b * c), L = b * d / gcd(b, d), A = a * L / b, C = c * L / d;
        function T(f) { return '$' + tex(f) + '$'; }
        var cands = [
          [T(R.F(a * c, b * d)), '나누지 않고 곱했어요. 나누는 분수의 분모와 분자를 바꾸어 곱해요.'],
          [T(R.F(b * c, a * d)), '앞의 분수(나누어지는 수)를 뒤집었어요. 바꾸는 것은 ÷ 뒤의 분수예요.'],
          [T(R.F(b * d, a * c)), '두 분수를 모두 뒤집었어요. ÷ 뒤의 분수만 바꾸어요.'],
          [T(R.F(a, c)), '통분하지 않고 분자끼리 나누었어요. 분모가 다르면 먼저 통분해요.'],
          [T(ans.div(L)), '통분한 뒤 분자끼리 나누고 분모 ' + L + R.josa(L, '을/를') + ' 그대로 두었어요. 몫은 분자끼리 나눈 값이에요.'],
        ];
        var correct = T(ans), reason = {};
        cands.forEach(function (x) { if (!(x[0] in reason)) reason[x[0]] = x[1]; });
        var pick = R.choices(correct, cands.map(function (x) { return x[0]; }));
        return {
          type: 'choice', concept: 1,
          q: '계산한 값으로 알맞은 것을 고르세요.\n\n$' + fr(a, b) + ' \\div ' + fr(c, d) + '$',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (x) { return x === correct ? '' : reason[x] || ''; }),
          hint: '통분해서 분자끼리 나누거나, 나누는 분수의 분모와 분자를 바꾸어 곱해요.',
          explain: '방법 1 (통분): $' + fr(a, b) + ' \\div ' + fr(c, d) + '=' + fr(A, L) + ' \\div ' + fr(C, L) + '=' + A + ' \\div ' + C + '=' + chain(R, A, C) + '$\n\n' +
            '방법 2 (곱셈): $' + fr(a, b) + ' \\times ' + frx(d, c) + '=' + chain(R, a * d, b * c) + '$\n\n답은 ' + correct + josa(R, ans, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'mixed',
      level: 2,
      title: '대분수가 있는 분수의 나눗셈',
      make: function (R) {
        var w1 = R.int(1, 3), d1 = R.int(2, 6), n1 = R.int(1, d1 - 1);
        while (gcd(n1, d1) > 1) n1--;
        var An = w1 * d1 + n1, Ad = d1, A = R.F(An, Ad);
        var e = R.int(2, 6), c = R.int(1, e - 1);
        while (gcd(c, e) > 1) c--;
        var w2 = R.int(0, 2), Bn = w2 * e + c, Bd = e, B = R.F(Bn, Bd);
        var Atex = w1 + fr(n1, d1), Btex = w2 ? w2 + fr(c, e) : fr(c, e);
        var ans = A.div(B);
        // 몫이 자연수나 진분수일 때는 "가분수나 대분수로 써요"라고 하지 않는다
        var note = (!ans.isInt() && ans.num > ans.den) ? ' 답은 가분수나 대분수로 써요.' : '';
        var list = [
          { v: A.mul(B), why: '나누는 분수의 분모와 분자를 바꾸지 않고 곱했어요.' },
          { v: B.div(A), why: '거꾸로 나누었어요. ÷ 앞의 수를 뒤의 수로 나누어요.' },
        ];
        if (w2) list.push({ v: R.F(w1, w2).add(R.F(n1 * e, d1 * c)), why: '자연수끼리, 분수끼리 따로 나누었어요. 대분수를 가분수로 바꾼 뒤 계산해요.' });
        else list.push({ v: R.F(w1, 1).add(R.F(n1 * e, d1 * c)), why: '자연수 ' + w1 + R.josa(w1, '은/는') + ' 그대로 두고 분수 부분만 나누었어요. 대분수를 가분수로 바꾼 뒤 계산해요.' });
        var change = '$' + Atex + '=' + fr(An, Ad) + '$' + (w2 ? ', $' + Btex + '=' + fr(Bn, Bd) + '$' : '');
        return {
          type: 'short', check: 'number', concept: 4,
          q: '계산해 보세요.' + note + '\n\n$' + Atex + ' \\div ' + Btex + '$',
          answer: ans.toString(),
          hint: '대분수를 먼저 가분수로 바꾸어요.',
          wrong: keepWrong(R, ans, list),
          explain: '대분수를 가분수로 바꿔요: ' + change + '\n\n나누는 분수의 분모와 분자를 바꾸어 곱해요: $' + fr(An, Ad) + ' \\times ' + frx(Bd, Bn) + '=' + chain(R, An * Bd, Ad * Bn) + '$\n\n답은 $' + tex(ans) + '$' + josa(R, ans, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'wrong-operation',
      level: 3,
      title: '잘못 계산한 값에서 바른 값 구하기',
      make: function (R) {
        var d = R.int(2, 7), c = R.int(1, d - 1);
        while (gcd(c, d) > 1) c--;
        var qd = R.int(2, 6), pn = R.int(1, 2 * qd);
        if (pn === qd) pn = pn + 1;
        var X = R.F(pn, qd), K = R.F(c, d), Kt = fr(c, d), kj = R.josa(c, '을/를');
        var mulFirst = R.bool();
        var shown, ans, list, q, step1, step2;
        if (mulFirst) {
          // 곱해야 할 것을 나누었다
          shown = X.div(K); ans = X.mul(K);
          q = '어떤 수에 $' + Kt + '$' + kj + ' 곱해야 할 것을 잘못하여 나누었더니 $' + tex(shown) + '$' + josa(R, shown, '이/가') + ' 되었어요. 바르게 계산한 값을 구해 보세요.';
          step1 = '어떤 수를 $' + Kt + '$' + R.josa(c, '으로/로') + ' 나눈 값이 $' + tex(shown) + '$이므로, 거꾸로 생각하면 어떤 수는 $' + tex(shown) + ' \\times ' + Kt + '=' + tex(X) + '$' + josa(R, X, '이에요/예요') + '.';
          step2 = '바르게 계산하면 $' + tex(X) + ' \\times ' + Kt + '=' + tex(ans) + '$' + josa(R, ans, '이에요/예요') + '.';
          list = [
            { v: X, why: '어떤 수까지만 구했어요. 어떤 수에 $' + Kt + '$' + kj + ' 곱해야 해요.' },
            { v: shown.div(K), why: '어떤 수를 구할 때 거꾸로 하지 않고 한 번 더 나누었어요.' },
          ];
        } else {
          // 나누어야 할 것을 곱했다
          shown = X.mul(K); ans = X.div(K);
          q = '어떤 수를 $' + Kt + '$' + R.josa(c, '으로/로') + ' 나누어야 할 것을 잘못하여 곱했더니 $' + tex(shown) + '$' + josa(R, shown, '이/가') + ' 되었어요. 바르게 계산한 값을 구해 보세요.';
          step1 = '어떤 수에 $' + Kt + '$' + kj + ' 곱한 값이 $' + tex(shown) + '$이므로, 거꾸로 생각하면 어떤 수는 $' + tex(shown) + ' \\div ' + Kt + '=' + tex(X) + '$' + josa(R, X, '이에요/예요') + '.';
          step2 = '바르게 계산하면 $' + tex(X) + ' \\div ' + Kt + '=' + tex(X) + ' \\times ' + frx(d, c) + '=' + tex(ans) + '$' + josa(R, ans, '이에요/예요') + '.';
          list = [
            { v: X, why: '어떤 수까지만 구했어요. 어떤 수를 $' + Kt + '$' + R.josa(c, '으로/로') + ' 나누어야 해요.' },
            { v: shown.mul(K), why: '어떤 수를 구할 때 거꾸로 하지 않고 한 번 더 곱했어요.' },
          ];
        }
        return {
          type: 'short', check: 'number', concept: 3,
          q: q,
          answer: ans.toString(),
          hint: '먼저 잘못 계산한 과정을 거꾸로 하여 어떤 수를 구해요.',
          wrong: keepWrong(R, ans, list),
          explain: step1 + '\n\n' + step2,
        };
      },
    },
  ],
});
})();
