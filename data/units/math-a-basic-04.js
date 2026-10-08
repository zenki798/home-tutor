/* 다시 배우는 기초 수학 · 분수의 곱셈과 나눗셈
 * (자연수)×(분수)와 (분수)×(분수), 약분하며 곱하기와 대분수의 곱셈, 역수, 역수를 곱하는 분수의 나눗셈, 요리 재료 양 바꾸기.
 * 성인 대상 — 합니다체, 생활 속 예. 앞 단원(03)의 약분·대분수를 쓴다. 소수 계산은 다음 단원(05), 방정식은 08 이라 풀이에 쓰지 않는다. */
(function () {
  function fr(n, d) { return '\\frac{' + n + '}{' + d + '}'; }
  function gcd2(a, b) { while (b) { var t = a % b; a = b; b = t; } return a; }
  function mix(F) { return F.toTex({ mixed: true }); }
  // 분수 num/den 를 약분·대분수로 정리하는 과정 TeX: '=\frac{..}{..}=1\frac{..}{..}' (바뀌는 것이 없으면 '')
  function tidy(R, num, den) {
    var out = '', F = R.F(num, den);
    if (F.num !== num || F.den !== den) out += '=' + (F.den === 1 ? String(F.num) : fr(F.num, F.den));
    if (F.den !== 1 && F.num > F.den) out += '=' + mix(F);
    return out;
  }
  // 1 ~ b-1 가운데 b 와 서로소인 수
  function coprimeNum(R, b) {
    for (var i = 0; i < 100; i++) { var a = R.int(1, b - 1); if (gcd2(a, b) === 1) return a; }
    return 1;
  }
  // Frac 를 '분수 꼴' TeX 로 (가분수 그대로, 자연수는 수)
  function ftex(F) { return F.den === 1 ? String(F.num) : fr(F.num, F.den); }
  function valueEq(R, s, F) {
    var p = s.split(/[ /]/);
    var v = p.length === 3 ? R.F(Number(p[0]) * Number(p[2]) + Number(p[1]), Number(p[2])) : p.length === 2 ? R.F(Number(p[0]), Number(p[1])) : R.F(Number(p[0]), 1);
    return v.eq(F);
  }

  var AREA = (function () {
    var s = '<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="2">';
    for (var r = 0; r < 4; r++) {
      for (var c = 0; c < 3; c++) {
        s += '<rect x="' + (c * 80) + '" y="' + (r * 40) + '" width="80" height="40" fill="' + (c < 2 && r < 3 ? 'var(--fig-1)' : 'none') + '"/>';
      }
    }
    return s + '</g></svg>';
  })();

  Tutor.registerUnit({
    id: 'math-a-basic-04',
    course: 'math-a-basic',
    title: '분수의 곱셈과 나눗셈',
    summary: '분수끼리 곱하는 원리와, 나누는 수의 역수를 곱하는 분수의 나눗셈을 이해하고 계산합니다. 요리 재료의 양을 바꾸는 것 같은 생활 문제에도 써 봅니다.',
    goals: [
      '(자연수)×(분수)와 (분수)×(분수)를 계산할 수 있다.',
      '약분하며 곱하고, 대분수를 가분수로 바꾸어 곱할 수 있다.',
      '역수의 뜻을 알고, 분수의 나눗셈을 역수의 곱셈으로 바꾸는 이유를 설명할 수 있다.',
      '재료의 양을 바꾸거나 나누어 담는 생활 문제를 분수의 곱셈·나눗셈으로 풀 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '(자연수)×(분수)',
        body: '$3\\times\\frac{2}{5}$는 $\\frac{2}{5}$를 3번 더한 것입니다.\n\n$3\\times\\frac{2}{5}=\\frac{2}{5}+\\frac{2}{5}+\\frac{2}{5}=\\frac{2\\times 3}{5}=\\frac{6}{5}=1\\frac{1}{5}$\n\n그래서 **자연수는 분자에만 곱하고 분모는 그대로** 둡니다. 분모는 조각의 크기라서 조각 수를 늘려도 바뀌지 않습니다.\n\n거꾸로 $12\\times\\frac{3}{4}$은 "12의 $\\frac{3}{4}$"으로 읽을 수 있습니다. 12를 4묶음으로 나눈 것(한 묶음 3) 가운데 3묶음이므로 9입니다. 계산해도 $12\\times\\frac{3}{4}=\\frac{36}{4}=9$입니다.\n\n> 💡 생활 예: 한 달 수입이 240만 원이고 그 $\\frac{1}{4}$을 저축한다면, 저축액은 $240\\times\\frac{1}{4}=60$, 곧 60만 원입니다.',
        easy: '물병에 물이 $\\frac{2}{5}$ L씩 3병 있다고 해 보십시오. $\\frac{1}{5}$ L짜리 컵으로 한 병에 2잔씩, 3병이면 모두 6잔입니다. 그래서 $\\frac{6}{5}$ L입니다.\n\n컵의 크기($\\frac{1}{5}$ L)는 그대로이고 잔 수만 3배가 됩니다. 분모는 그대로, 분자만 3배라는 뜻입니다.',
        check: {
          type: 'short', check: 'number',
          q: '계산해 보십시오. (답은 가분수나 대분수 어느 꼴로 써도 됩니다.)\n\n$4\\times\\frac{3}{7}$',
          answer: '12/7',
          wrong: [{ a: '12/28', why: '분모에도 4를 곱했습니다. 자연수는 분자에만 곱합니다.' }],
          explain: '$4\\times\\frac{3}{7}=\\frac{4\\times 3}{7}=\\frac{12}{7}=1\\frac{5}{7}$입니다. 분모 7은 그대로입니다.',
        },
      },
      {
        title: '(분수)×(분수)',
        body: '분수끼리 곱할 때는 **분자는 분자끼리, 분모는 분모끼리** 곱합니다.\n\n$\\frac{2}{3}\\times\\frac{3}{4}=\\frac{2\\times 3}{3\\times 4}=\\frac{6}{12}=\\frac{1}{2}$\n\n"$\\frac{3}{4}$의 $\\frac{2}{3}$"로 생각하면 이유가 보입니다. 직사각형 하나를 가로줄 4개로 똑같이 나누어 그중 3줄($\\frac{3}{4}$)을 고르고, 다시 세로줄 3개로 똑같이 나누어 그중 2줄($\\frac{2}{3}$)을 고르면, 전체 12칸 가운데 두 번 다 고른 6칸이 겹칩니다(그림의 색칠한 부분). 전체 칸 수(분모)는 $3\\times 4$, 겹친 칸 수(분자)는 $2\\times 3$입니다.\n\n> 💡 1보다 작은 분수를 곱하면 결과는 원래 수보다 작아집니다. "~의 일부"를 구하는 것이기 때문입니다.',
        easy: '케이크의 $\\frac{3}{4}$이 남았는데, 그중 $\\frac{2}{3}$를 먹었다면 먹은 것은 케이크 전체의 얼마일까요?\n\n남은 $\\frac{3}{4}$은 $\\frac{1}{4}$짜리 3조각이고, 그 3조각의 $\\frac{2}{3}$는 2조각입니다. 2조각은 전체의 $\\frac{2}{4}$, 곧 $\\frac{1}{2}$입니다. 계산 $\\frac{2}{3}\\times\\frac{3}{4}=\\frac{1}{2}$과 같습니다.',
        fig: { type: 'svg', alt: '가로 3칸, 세로 4칸으로 나눈 직사각형. 왼쪽 2열과 위쪽 3행이 겹친 6칸이 색칠되어 있다(12칸 중 6칸)', svg: AREA },
        check: {
          type: 'choice',
          q: '$\\frac{2}{5}\\times\\frac{3}{4}$의 값은 무엇입니까?',
          choices: ['$\\frac{3}{10}$', '$\\frac{5}{9}$', '$\\frac{8}{15}$'],
          answer: 0,
          why: ['', '분자끼리, 분모끼리 **더했습니다**. 곱셈은 분자끼리, 분모끼리 곱합니다.', '나눗셈처럼 뒤의 분수를 뒤집어 곱했습니다. 곱셈은 그대로 곱합니다.'],
          explain: '$\\frac{2}{5}\\times\\frac{3}{4}=\\frac{2\\times 3}{5\\times 4}=\\frac{6}{20}=\\frac{3}{10}$입니다.',
        },
      },
      {
        title: '약분하며 곱하기와 대분수의 곱셈',
        body: '곱하기 전에 **분자와 분모를 미리 약분**하면 수가 작아져 계산이 쉽습니다. 어느 분자와 어느 분모든 공약수가 있으면 약분할 수 있습니다.\n\n$\\frac{4}{9}\\times\\frac{3}{8}=\\frac{4\\times 3}{9\\times 8}$에서 4와 8을 4로, 3과 9를 3으로 약분하면 $\\frac{1\\times 1}{3\\times 2}=\\frac{1}{6}$입니다.\n\n**대분수는 가분수로 바꾼 뒤** 곱합니다.\n\n$1\\frac{1}{2}\\times 2\\frac{2}{3}=\\frac{3}{2}\\times\\frac{8}{3}=\\frac{24}{6}=4$\n\n자연수끼리($1\\times 2$), 분수끼리($\\frac{1}{2}\\times\\frac{2}{3}$) 따로 곱하면 $2\\frac{1}{3}$이 되어 틀립니다. $\\left(1+\\frac{1}{2}\\right)\\times\\left(2+\\frac{2}{3}\\right)$에는 곱해야 할 짝이 네 개 있는데 그중 둘만 곱했기 때문입니다.',
        easy: '가로 $1\\frac{1}{2}$ m, 세로 $2\\frac{2}{3}$ m인 직사각형 텃밭의 넓이를 생각해 보십시오. 자연수끼리 곱한 $1\\times 2=2$ m²는 텃밭의 큰 덩어리 하나일 뿐이고, 가장자리의 띠 부분들이 빠져 있습니다.\n\n가분수로 바꾸어 $\\frac{3}{2}\\times\\frac{8}{3}=4$ m²로 계산하면 이런 부분까지 모두 들어갑니다.',
        check: {
          type: 'short', check: 'number',
          q: '계산해 보십시오.\n\n$1\\frac{1}{2}\\times 1\\frac{1}{3}$',
          answer: '2',
          wrong: [{ a: '1 1/6', why: '자연수끼리($1\\times 1$), 분수끼리($\\frac{1}{2}\\times\\frac{1}{3}$)만 곱했습니다. 대분수는 가분수로 바꾸어 곱합니다.' }],
          explain: '$1\\frac{1}{2}\\times 1\\frac{1}{3}=\\frac{3}{2}\\times\\frac{4}{3}=\\frac{12}{6}=2$입니다. 3끼리, 2와 4를 미리 약분하면 $\\frac{1}{1}\\times\\frac{2}{1}=2$로 더 빠릅니다.',
        },
      },
      {
        title: '역수',
        body: '두 수의 곱이 1이 될 때, 한 수를 다른 수의 **역수**라고 합니다.\n\n- $\\frac{3}{5}$의 역수는 분자와 분모를 바꾼 $\\frac{5}{3}$입니다. $\\frac{3}{5}\\times\\frac{5}{3}=1$\n- 자연수 4의 역수는 $\\frac{1}{4}$입니다. 4를 $\\frac{4}{1}$로 보고 뒤집습니다.\n- 대분수 $2\\frac{1}{3}$의 역수는 먼저 가분수 $\\frac{7}{3}$로 바꾼 뒤 뒤집어 $\\frac{3}{7}$입니다.\n\n1의 역수는 1이고, **0은 역수가 없습니다**. 0에 어떤 수를 곱해도 1이 될 수 없기 때문입니다.\n\n역수는 다음 카드의 분수 나눗셈에서 핵심 역할을 합니다.',
        easy: '역수는 "곱하면 서로 지워져 1이 되는 짝"입니다. $\\frac{3}{5}$에 $\\frac{5}{3}$를 곱하면 분자의 3과 분모의 3, 분자의 5와 분모의 5가 서로 지워져 1만 남습니다.\n\n5의 역수 $\\frac{1}{5}$을 생각해 보십시오. 5배로 늘린 것을 다시 5등분하면 제자리, 곧 1배입니다.',
        check: {
          type: 'ox',
          q: '$2\\frac{1}{3}$의 역수는 분수 부분만 뒤집은 $2\\frac{3}{1}$, 곧 5입니다.',
          answer: false,
          explain: '대분수는 먼저 가분수로 바꿉니다. $2\\frac{1}{3}=\\frac{7}{3}$이므로 역수는 $\\frac{3}{7}$입니다. 확인: $\\frac{7}{3}\\times\\frac{3}{7}=1$',
        },
      },
      {
        title: '분수의 나눗셈: 역수를 곱하는 이유',
        body: '분수로 나눌 때는 **나누는 수의 역수를 곱합니다.**\n\n$\\frac{3}{4}\\div\\frac{2}{5}=\\frac{3}{4}\\times\\frac{5}{2}=\\frac{15}{8}$\n\n**이유 1 — 몇 번 들어가나**: $2\\div\\frac{1}{3}$은 "2 안에 $\\frac{1}{3}$이 몇 번 들어가나"입니다. 1 안에 $\\frac{1}{3}$이 3번 들어가니 2 안에는 $2\\times 3=6$번입니다. $\\frac{1}{3}$로 나누는 것은 3을 곱하는 것과 같습니다.\n\n**이유 2 — 통분해서 나누기**: 분모가 같으면 분자끼리 나누면 됩니다. $\\frac{3}{4}\\div\\frac{2}{5}=\\frac{15}{20}\\div\\frac{8}{20}=15\\div 8=\\frac{15}{8}$이고, 이것은 $\\frac{3\\times 5}{4\\times 2}$, 곧 $\\frac{3}{4}\\times\\frac{5}{2}$와 같습니다.\n\n**이유 3 — 곱셈을 되돌리기**: 나눗셈은 곱셈을 되돌리는 계산입니다. $\\frac{2}{5}$를 곱한 것을 되돌리려면, 곱해서 1이 되는 짝인 역수 $\\frac{5}{2}$를 곱하면 됩니다.\n\n> 💡 1보다 작은 수로 나누면 결과는 원래 수보다 커집니다. 작은 그릇으로 덜어 내면 여러 번 덜 수 있는 것과 같습니다.',
        easy: '$\\frac{3}{4}$ L의 주스를 $\\frac{1}{4}$ L짜리 컵에 나눠 담으면 3컵입니다. $\\frac{3}{4}\\div\\frac{1}{4}=3$이지요.\n\n같은 주스를 $\\frac{1}{8}$ L짜리 작은 컵에 담으면 6컵이 됩니다. $\\frac{3}{4}\\div\\frac{1}{8}=\\frac{3}{4}\\times 8=6$. $\\frac{1}{8}$로 나누는 것이 "8을 곱하는 것"과 같다는 것, 이것이 역수를 곱하는 이유입니다.',
        check: {
          type: 'short', check: 'number',
          q: '계산해 보십시오.\n\n$\\frac{3}{4}\\div\\frac{3}{8}$',
          answer: '2',
          wrong: [{ a: '9/32', why: '역수를 곱하지 않고 그대로 곱했습니다. 나누는 수 $\\frac{3}{8}$을 뒤집어 $\\frac{8}{3}$을 곱합니다.' }],
          explain: '$\\frac{3}{4}\\div\\frac{3}{8}=\\frac{3}{4}\\times\\frac{8}{3}=\\frac{24}{12}=2$입니다. $\\frac{3}{4}=\\frac{6}{8}$ 안에 $\\frac{3}{8}$이 2번 들어간다고 보아도 됩니다.',
        },
      },
      {
        title: '생활 문제: 요리 재료의 양 바꾸기',
        body: '분수의 곱셈·나눗셈은 요리에서 자주 씁니다.\n\n**인분 바꾸기**: 4인분 요리법을 6인분으로 바꾸려면 모든 재료에 $\\frac{6}{4}=\\frac{3}{2}$을 곱합니다. 설탕이 4인분에 $\\frac{2}{3}$컵이면 6인분에는 $\\frac{2}{3}\\times\\frac{3}{2}=1$컵입니다.\n\n**1인분부터 구하기**: 헷갈리면 1인분을 먼저 구합니다. 4인분이 $\\frac{2}{3}$컵이면 1인분은 $\\frac{2}{3}\\div 4=\\frac{1}{6}$컵이고, 6인분은 $\\frac{1}{6}\\times 6=1$컵입니다. 결과는 같습니다.\n\n**몇 번 덜어 쓸 수 있나**: 간장 $2\\frac{1}{4}$컵을 한 번에 $\\frac{3}{8}$컵씩 쓰면 $\\frac{9}{4}\\div\\frac{3}{8}=\\frac{9}{4}\\times\\frac{8}{3}=6$번 쓸 수 있습니다.\n\n> ⚠️ 인분을 바꿀 때는 (만들 인분) ÷ (원래 인분)을 곱합니다. 거꾸로 $\\frac{4}{6}$를 곱하면 늘려야 할 양이 오히려 줄어듭니다.',
        easy: '4인분 요리법으로 6명분을 만들려면 재료를 "한 배 반"으로 늘립니다. 한 배 반은 $\\frac{3}{2}$배입니다.\n\n반대로 6인분 요리법으로 4명분을 만들려면 $\\frac{4}{6}=\\frac{2}{3}$배로 줄입니다. 늘릴지 줄일지 먼저 생각하고 곱할 분수를 고르면 실수가 줄어듭니다.',
        check: {
          type: 'short', check: 'number', unit: '큰술',
          q: '2인분에 버터가 $\\frac{3}{4}$큰술 들어가는 요리를 6인분 만들려면 버터는 몇 큰술 필요합니까?',
          answer: '9/4',
          wrong: [
            { a: '9/2', why: '6을 곱했습니다. 6인분은 2인분의 3배이므로 3을 곱합니다.' },
            { a: '1/4', why: '3으로 나누었습니다. 인분이 늘어나니 양도 늘어나야 합니다.' },
          ],
          explain: '6인분은 2인분의 $\\frac{6}{2}=3$배입니다. $\\frac{3}{4}\\times 3=\\frac{9}{4}=2\\frac{1}{4}$큰술이 필요합니다.',
        },
      },
    ],

    examples: [
      {
        q: '계산해 보십시오.\n\n$2\\frac{2}{5}\\times\\frac{5}{8}$',
        steps: [
          '대분수를 가분수로 바꿉니다. $2\\frac{2}{5}=\\frac{12}{5}$',
          '$\\frac{12}{5}\\times\\frac{5}{8}$에서 5끼리 약분하고, 12와 8을 4로 약분합니다. $\\frac{3}{1}\\times\\frac{1}{2}$',
          '곱하면 $\\frac{3}{2}=1\\frac{1}{2}$입니다.',
        ],
        answer: '$\\frac{3}{2}=1\\frac{1}{2}$',
      },
      {
        q: '계산해 보십시오.\n\n$1\\frac{3}{5}\\div\\frac{4}{15}$',
        steps: [
          '대분수를 가분수로 바꿉니다. $1\\frac{3}{5}=\\frac{8}{5}$',
          '나누는 수의 역수를 곱합니다. $\\frac{8}{5}\\div\\frac{4}{15}=\\frac{8}{5}\\times\\frac{15}{4}$',
          '8과 4를 4로, 15와 5를 5로 약분하면 $\\frac{2}{1}\\times\\frac{3}{1}=6$입니다.',
        ],
        answer: '6',
      },
    ],

    terms: [
      { term: '분수의 곱셈', def: '분자는 분자끼리, 분모는 분모끼리 곱합니다. 자연수를 곱할 때는 분자에만 곱합니다. 예: $\\frac{2}{3}\\times\\frac{3}{4}=\\frac{1}{2}$' },
      { term: '역수', def: '곱해서 1이 되는 수입니다. 분수는 분자와 분모를 바꾸면 역수가 됩니다. 예: $\\frac{3}{5}$의 역수는 $\\frac{5}{3}$, 4의 역수는 $\\frac{1}{4}$. 0은 역수가 없습니다.' },
      { term: '분수의 나눗셈', def: '나누는 수의 역수를 곱해서 계산합니다. 예: $\\frac{3}{4}\\div\\frac{2}{5}=\\frac{3}{4}\\times\\frac{5}{2}=\\frac{15}{8}$' },
      { term: '약분하며 곱하기', def: '곱하기 전에 어느 분자와 어느 분모든 공약수로 미리 나누어 수를 작게 만드는 방법입니다.' },
      { term: '가분수', def: '분자가 분모와 같거나 큰 분수입니다. 대분수를 곱하거나 나눌 때는 가분수로 바꾸어 계산합니다.' },
      { term: '단위분수', def: '분자가 1인 분수입니다. 예: $\\frac{1}{2}$, $\\frac{1}{8}$. 단위분수로 나누는 것은 분모를 곱하는 것과 같습니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '계산해 보십시오. (답은 가분수나 대분수 어느 꼴로 써도 됩니다.)\n\n$5\\times\\frac{2}{3}$',
        answer: '10/3',
        wrong: [{ a: '10/15', why: '분모에도 5를 곱했습니다. 자연수는 분자에만 곱합니다.' }],
        explain: '$5\\times\\frac{2}{3}=\\frac{5\\times 2}{3}=\\frac{10}{3}=3\\frac{1}{3}$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 1,
        q: '계산해 보십시오.\n\n$\\frac{3}{5}\\times\\frac{2}{7}$',
        answer: '6/35',
        wrong: [{ a: '21/10', why: '나눗셈처럼 뒤의 분수를 뒤집어 곱했습니다. 곱셈은 분자끼리, 분모끼리 그대로 곱합니다.' }],
        explain: '$\\frac{3}{5}\\times\\frac{2}{7}=\\frac{3\\times 2}{5\\times 7}=\\frac{6}{35}$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 2,
        q: '약분하며 계산해 보십시오.\n\n$\\frac{4}{9}\\times\\frac{3}{8}$',
        answer: '1/6',
        wrong: [{ a: '7/17', why: '분자끼리, 분모끼리 더했습니다. 곱셈은 분자끼리, 분모끼리 곱합니다.' }],
        explain: '4와 8을 4로, 3과 9를 3으로 약분하면 $\\frac{1}{3}\\times\\frac{1}{2}=\\frac{1}{6}$입니다. 그대로 곱해도 $\\frac{12}{72}=\\frac{1}{6}$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 3,
        q: '역수가 자기 자신과 같은 수는 무엇입니까?',
        choices: ['1', '0', '$\\frac{1}{2}$', '2'],
        answer: 0,
        why: ['', '0은 역수가 없습니다. 0에 어떤 수를 곱해도 1이 되지 않습니다.', '$\\frac{1}{2}$의 역수는 2입니다.', '2의 역수는 $\\frac{1}{2}$입니다.'],
        explain: '$1\\times 1=1$이므로 1의 역수는 1, 곧 자기 자신입니다. 양수 가운데 역수가 자기 자신인 수는 1뿐입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 2,
        q: '계산해 보십시오.\n\n$2\\frac{1}{2}\\times 1\\frac{1}{5}$',
        answer: '3',
        wrong: [{ a: '2 1/10', why: '자연수끼리, 분수끼리만 곱했습니다. 대분수는 가분수로 바꾸어 곱합니다.' }],
        explain: '$2\\frac{1}{2}\\times 1\\frac{1}{5}=\\frac{5}{2}\\times\\frac{6}{5}$입니다. 5끼리, 6과 2를 2로 약분하면 $\\frac{1}{1}\\times\\frac{3}{1}=3$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 4,
        q: '계산해 보십시오.\n\n$6\\div\\frac{2}{3}$',
        answer: '9',
        wrong: [{ a: '4', why: '역수를 곱하지 않고 $6\\times\\frac{2}{3}$를 계산했습니다. 나누는 수의 역수 $\\frac{3}{2}$을 곱합니다.' }],
        explain: '$6\\div\\frac{2}{3}=6\\times\\frac{3}{2}=\\frac{18}{2}=9$입니다. 6 안에 $\\frac{2}{3}$가 9번 들어갑니다.',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'number', concept: 4,
        q: '계산해 보십시오.\n\n$\\frac{5}{6}\\div\\frac{5}{12}$',
        answer: '2',
        wrong: [{ a: '25/72', why: '역수를 곱하지 않고 그대로 곱했습니다. 나누는 수 $\\frac{5}{12}$를 뒤집어 곱합니다.' }],
        explain: '$\\frac{5}{6}\\div\\frac{5}{12}=\\frac{5}{6}\\times\\frac{12}{5}=2$입니다. $\\frac{5}{6}=\\frac{10}{12}$ 안에 $\\frac{5}{12}$가 2번 들어간다고 보아도 됩니다.',
      },
      {
        id: 'p8', level: 1, type: 'ox', concept: 4,
        q: '$\\frac{3}{4}\\div\\frac{1}{2}$의 값은 $\\frac{3}{4}$보다 작습니다.',
        answer: false,
        explain: '$\\frac{3}{4}\\div\\frac{1}{2}=\\frac{3}{4}\\times 2=\\frac{3}{2}$이므로 $\\frac{3}{4}$보다 큽니다. 1보다 작은 수로 나누면 결과가 커집니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', unit: '컵', concept: 5,
        q: '2인분에 밀가루가 $\\frac{3}{4}$컵 들어가는 요리를 5인분 만들려고 합니다. 밀가루는 몇 컵 필요합니까?',
        answer: '15/8',
        hint: '5인분은 2인분의 몇 배인지 먼저 구하십시오.',
        wrong: [
          { a: '15/4', why: '2인분 양에 5를 곱했습니다. 5인분은 2인분의 $\\frac{5}{2}$배입니다.' },
          { a: '3/10', why: '$\\frac{2}{5}$를 곱해 양을 줄였습니다. 인분이 늘어나니 $\\frac{5}{2}$를 곱합니다.' },
        ],
        explain: '5인분은 2인분의 $\\frac{5}{2}$배입니다. $\\frac{3}{4}\\times\\frac{5}{2}=\\frac{15}{8}=1\\frac{7}{8}$컵이 필요합니다. (1인분 $\\frac{3}{8}$컵을 먼저 구해 5를 곱해도 같습니다.)',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', unit: '컵', concept: 5,
        q: '우유 $2\\frac{1}{4}$ L를 $\\frac{3}{8}$ L씩 컵에 나누어 담으면 몇 컵이 됩니까?',
        answer: '6',
        hint: '$2\\frac{1}{4}$ 안에 $\\frac{3}{8}$이 몇 번 들어가는지 구하십시오.',
        wrong: [{ a: '27/32', why: '나누어야 할 것을 곱했습니다. 몇 번 들어가는지는 나눗셈으로 구합니다.' }],
        explain: '$2\\frac{1}{4}\\div\\frac{3}{8}=\\frac{9}{4}\\times\\frac{8}{3}=\\frac{72}{12}=6$이므로 6컵입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 4,
        q: '계산해 보십시오.\n\n$1\\frac{3}{4}\\div 2\\frac{1}{3}$',
        answer: '3/4',
        hint: '두 대분수를 모두 가분수로 바꾼 뒤, 나누는 수의 역수를 곱하십시오.',
        wrong: [
          { a: '4/3', why: '나누는 수와 나누어지는 수를 바꾸어 계산했습니다. 뒤에 있는 $2\\frac{1}{3}$의 역수를 곱합니다.' },
          { a: '49/12', why: '역수를 곱하지 않고 그대로 곱했습니다.' },
        ],
        explain: '$1\\frac{3}{4}\\div 2\\frac{1}{3}=\\frac{7}{4}\\div\\frac{7}{3}=\\frac{7}{4}\\times\\frac{3}{7}=\\frac{3}{4}$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 4,
        q: '어떤 수에 $\\frac{3}{4}$을 곱해야 할 것을 잘못하여 나누었더니 $2\\frac{2}{3}$가 되었습니다. 바르게 계산한 값은 얼마입니까?',
        answer: '3/2',
        hint: '먼저 거꾸로 생각해 어떤 수를 구하십시오. 나눈 것을 되돌리려면 곱합니다.',
        wrong: [
          { a: '2', why: '2는 어떤 수입니다. 어떤 수에 $\\frac{3}{4}$을 곱한 값까지 구해야 합니다.' },
          { a: '32/9', why: '어떤 수를 구할 때 다시 나누었습니다. $\\frac{3}{4}$으로 나눈 결과를 되돌리려면 $\\frac{3}{4}$을 곱합니다.' },
        ],
        explain: '어떤 수 $\\div\\frac{3}{4}=\\frac{8}{3}$이므로 어떤 수는 $\\frac{8}{3}\\times\\frac{3}{4}=2$입니다. 바르게 계산하면 $2\\times\\frac{3}{4}=\\frac{3}{2}=1\\frac{1}{2}$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', unit: 'm', concept: 4,
        q: '넓이가 $3\\frac{1}{3}$ m²인 직사각형 모양의 화단이 있습니다. 가로가 $2\\frac{1}{2}$ m일 때 세로는 몇 m입니까?',
        fig: { type: 'polygon', points: [[0, 0], [5, 0], [5, 2.67], [0, 2.67]], sides: ['가로 2 1/2 m', '세로 ? m', null, null], alt: '가로 2와 2분의 1 m, 세로를 모르는 직사각형. 넓이는 3과 3분의 1 제곱미터' },
        answer: '4/3',
        hint: '(넓이) = (가로) × (세로)이므로 세로는 넓이를 가로로 나누어 구합니다.',
        wrong: [
          { a: '25/3', why: '넓이와 가로를 곱했습니다. 세로는 넓이를 가로로 나누어 구합니다.' },
          { a: '3/4', why: '가로를 넓이로 나누었습니다. 넓이 ÷ 가로를 계산해야 합니다.' },
        ],
        explain: '세로 $=3\\frac{1}{3}\\div 2\\frac{1}{2}=\\frac{10}{3}\\div\\frac{5}{2}=\\frac{10}{3}\\times\\frac{2}{5}=\\frac{4}{3}=1\\frac{1}{3}$ m입니다. 확인: $\\frac{5}{2}\\times\\frac{4}{3}=\\frac{10}{3}$',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 4,
        q: '계산 결과가 가장 큰 것은 무엇입니까? (직접 계산하지 않고 먼저 짐작해 보십시오.)',
        choices: ['$8\\div\\frac{3}{4}$', '$8\\times\\frac{3}{4}$', '$8\\times\\frac{5}{4}$', '$8\\div\\frac{5}{4}$'],
        answer: 0,
        why: [
          '',
          '1보다 작은 수를 곱하면 8보다 작아집니다. 값은 6입니다.',
          '1보다 큰 수를 곱해 8보다 커지지만 값은 10입니다. $8\\div\\frac{3}{4}=\\frac{32}{3}$는 10보다 큽니다.',
          '1보다 큰 수로 나누면 8보다 작아집니다. 값은 $\\frac{32}{5}$입니다.',
        ],
        hint: '1보다 작은 수로 나누면 커지고, 1보다 작은 수를 곱하면 작아집니다.',
        explain: '$8\\div\\frac{3}{4}=8\\times\\frac{4}{3}=\\frac{32}{3}=10\\frac{2}{3}$, $8\\times\\frac{3}{4}=6$, $8\\times\\frac{5}{4}=10$, $8\\div\\frac{5}{4}=\\frac{32}{5}=6\\frac{2}{5}$입니다. 가장 큰 것은 $8\\div\\frac{3}{4}$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 2,
        q: '계산해 보십시오.\n\n$\\frac{1}{2}\\times\\frac{2}{3}\\times\\frac{3}{4}\\times\\frac{4}{5}\\times\\cdots\\times\\frac{9}{10}$',
        answer: '1/10',
        hint: '이웃한 분수의 분자와 분모가 서로 약분됩니다.',
        wrong: [{ a: '9/10', why: '마지막 분수만 남겼습니다. 첫 분수의 분자 1과 마지막 분수의 분모 10이 남습니다.' }],
        explain: '앞 분수의 분모와 다음 분수의 분자가 차례로 약분됩니다(2와 2, 3과 3, …, 9와 9). 남는 것은 첫 분자 1과 마지막 분모 10이므로 $\\frac{1}{10}$입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', unit: '일', concept: 5,
        q: '어떤 일을 하루에 전체의 $\\frac{2}{9}$씩 합니다. 이 일을 모두 끝내려면 적어도 며칠이 걸립니까?',
        answer: '5',
        hint: '전체 1 안에 $\\frac{2}{9}$가 몇 번 들어가는지 구한 뒤, 남는 일도 하루가 걸린다는 점을 생각하십시오.',
        wrong: [
          { a: '4', why: '4일 동안은 전체의 $\\frac{8}{9}$만 끝납니다. 남은 $\\frac{1}{9}$을 하는 데 하루가 더 걸립니다.' },
          { a: '9/2', why: '$1\\div\\frac{2}{9}=\\frac{9}{2}$일까지는 맞습니다. 날수는 자연수이므로 올림해야 합니다.' },
        ],
        explain: '$1\\div\\frac{2}{9}=\\frac{9}{2}=4\\frac{1}{2}$이므로 4일로는 모자라고, 남은 일을 하려면 하루가 더 필요합니다. 적어도 5일이 걸립니다(올림).',
      },
    ],

    deeper: [
      {
        title: '곱했는데 작아지고, 나눴는데 커지는 까닭',
        body: '자연수만 다룰 때는 "곱하면 커지고 나누면 작아진다"가 맞았습니다. 분수에서는 늘 그렇지 않습니다.\n\n곱셈은 "몇 배"입니다. 1보다 작은 수를 곱하는 것은 1배보다 적게, 곧 일부만 가져오는 것이라 작아집니다. 나눗셈은 "몇 번 들어가나"입니다. 1보다 작은 그릇으로 덜어 내면 여러 번 들어가니 커집니다.\n\n그래서 할인(가격 × $\\frac{4}{5}$)은 값을 줄이고, 작은 단위로 나누는 일(2 L를 $\\frac{1}{4}$ L 컵에 담기)은 수를 늘립니다. 답이 어느 쪽으로 나와야 하는지 미리 짐작하면 계산 실수를 잡기 쉽습니다.',
      },
      {
        title: '분수에서 비율로',
        body: '"12의 $\\frac{3}{4}$"처럼 어떤 양의 일부를 구하는 곱셈은 뒤에서 배울 **비율**과 **백분율**의 바탕입니다. $\\frac{3}{4}$은 100을 기준으로 하면 $\\frac{75}{100}$, 곧 75%입니다.\n\n가격의 25%를 깎아 준다는 말은 원래 가격에 $\\frac{3}{4}$을 곱한 값을 낸다는 뜻이고, 요리법을 $\\frac{3}{2}$배로 늘리는 것은 재료를 150%로 늘리는 것입니다. 분수의 곱셈에 익숙해지면 이런 계산이 한결 쉬워집니다.',
      },
    ],

    faq: [
      {
        q: '곱셈인데 왜 답이 원래 수보다 작아지나요?',
        a: '1보다 작은 분수를 곱했기 때문입니다. $\\times\\frac{1}{2}$은 "절반만"이라는 뜻이라 줄어드는 것이 맞습니다.\n\n1보다 큰 수를 곱하면 커지고, 1을 곱하면 그대로이며, 1보다 작은 수를 곱하면 작아집니다. 답이 이 방향과 맞는지 보면 계산을 점검할 수 있습니다.',
      },
      {
        q: '분수의 나눗셈에서 왜 뒤의 수만 뒤집나요?',
        a: '나눗셈은 "앞의 수 안에 뒤의 수가 몇 번 들어가나"라서 두 수의 역할이 다릅니다. 뒤의 수(나누는 수)로 나누는 것이 그 역수를 곱하는 것과 같기 때문에 뒤의 수만 뒤집습니다.\n\n앞의 수를 뒤집으면 전혀 다른 값이 나옵니다. $\\frac{3}{4}\\div\\frac{1}{2}=\\frac{3}{2}$이지만, 앞을 뒤집어 $\\frac{4}{3}\\times\\frac{1}{2}$로 하면 $\\frac{2}{3}$가 되어 틀립니다.',
      },
      {
        q: '대분수끼리 곱할 때 자연수끼리, 분수끼리 곱하면 안 되나요?',
        a: '안 됩니다. 덧셈·뺄셈과 달리 곱셈에서는 $(2+\\frac{1}{2})\\times(1+\\frac{1}{5})$처럼 모든 짝을 곱해야 해서, 자연수끼리와 분수끼리만 곱하면 일부가 빠집니다.\n\n대분수를 가분수로 바꾼 뒤 곱하면 이런 실수 없이 한 번에 계산됩니다.',
      },
    ],

    mistakes: [
      '(자연수)×(분수)에서 분모에도 자연수를 곱하는 실수 — $5\\times\\frac{2}{3}$는 $\\frac{10}{15}$이 아니라 $\\frac{10}{3}$입니다. 분모는 그대로입니다.',
      '대분수의 곱셈에서 자연수끼리, 분수끼리 곱하는 실수 — $2\\frac{1}{2}\\times 1\\frac{1}{5}$은 $2\\frac{1}{10}$이 아니라 가분수로 바꾸어 $\\frac{5}{2}\\times\\frac{6}{5}=3$입니다.',
      '나눗셈에서 앞의 수를 뒤집거나 역수를 곱하지 않는 실수 — 뒤의 수(나누는 수)만 뒤집어 곱합니다.',
    ],

    gens: [
      {
        id: 'mul-frac',
        level: 1,
        title: '(자연수)×(분수)와 (분수)×(분수)',
        make: function (R) {
          var F, q, explain, wrong = [], concept;
          if (R.bool(0.4)) {
            var n = R.int(2, 9), b = R.int(3, 12), a = coprimeNum(R, b);
            F = R.F(n * a, b);
            var left = R.bool();
            q = left ? n + '\\times ' + fr(a, b) : fr(a, b) + '\\times ' + n;
            explain = '자연수는 분자에만 곱합니다. $' + q + '=\\frac{' + (left ? n + '\\times ' + a : a + '\\times ' + n) + '}{' + b + '}=' + fr(n * a, b) + tidy(R, n * a, b) + '$';
            wrong.push({ a: (n * a) + '/' + (n * b), why: '분모에도 ' + n + R.josa(n, '을/를') + ' 곱했습니다. 자연수는 분자에만 곱합니다.' });
            concept = 0;
          } else {
            var b2 = R.int(2, 9), d2 = R.int(2, 9), a2 = coprimeNum(R, b2), c2 = coprimeNum(R, d2);
            F = R.F(a2 * c2, b2 * d2);
            q = fr(a2, b2) + '\\times ' + fr(c2, d2);
            explain = '분자끼리, 분모끼리 곱합니다. $' + q + '=\\frac{' + a2 + '\\times ' + c2 + '}{' + b2 + '\\times ' + d2 + '}=' + fr(a2 * c2, b2 * d2) + tidy(R, a2 * c2, b2 * d2) + '$' +
              (gcd2(a2 * c2, b2 * d2) > 1 ? ' (곱하기 전에 미리 약분해도 같습니다.)' : '');
            wrong.push({ a: (a2 * d2) + '/' + (b2 * c2), why: '나눗셈처럼 뒤의 분수를 뒤집어 곱했습니다. 곱셈은 그대로 곱합니다.' });
            wrong.push({ a: (a2 + c2) + '/' + (b2 + d2), why: '분자끼리, 분모끼리 더했습니다. 곱셈은 분자끼리, 분모끼리 곱합니다.' });
            concept = 1;
          }
          wrong = wrong.filter(function (w) { return !valueEq(R, w.a, F); });
          return {
            type: 'short', check: 'number', concept: concept,
            q: '계산해 보십시오. (답은 기약분수, 가분수, 대분수 어느 꼴로 써도 됩니다.)\n\n$' + q + '$',
            answer: F.toString(),
            wrong: wrong,
            explain: explain,
          };
        },
      },
      {
        id: 'mul-mixed',
        level: 2,
        title: '대분수의 곱셈',
        make: function (R) {
          var w1 = R.int(1, 3), b = R.int(2, 6), a = coprimeNum(R, b);
          var w2 = R.int(1, 3), d = R.int(2, 6), c = coprimeNum(R, d);
          var p = w1 * b + a, q = w2 * d + c;
          var F = R.F(p * q, b * d);
          var naive = R.F(w1 * w2, 1).add(R.F(a * c, b * d));
          var wrong = [{ a: naive.toString(), why: '자연수끼리($' + w1 + '\\times ' + w2 + '$), 분수끼리만 곱했습니다. 대분수는 가분수로 바꾸어 곱합니다.' }];
          wrong = wrong.filter(function (w) { return !valueEq(R, w.a, F); });
          return {
            type: 'short', check: 'number', concept: 2,
            q: '계산해 보십시오. (답은 기약분수, 가분수, 대분수 어느 꼴로 써도 됩니다.)\n\n$' + w1 + fr(a, b) + '\\times ' + w2 + fr(c, d) + '$',
            answer: F.toString(),
            hint: '두 대분수를 먼저 가분수로 바꾸십시오.',
            wrong: wrong,
            explain: '대분수를 가분수로 바꿉니다. $' + w1 + fr(a, b) + '=' + fr(p, b) + '$, $' + w2 + fr(c, d) + '=' + fr(q, d) + '$. 곱하면 $' + fr(p, b) + '\\times ' + fr(q, d) + '=' + fr(p * q, b * d) + tidy(R, p * q, b * d) + '$입니다.',
          };
        },
      },
      {
        id: 'div-frac',
        level: 1,
        title: '분수의 나눗셈 (역수를 곱하기)',
        make: function (R) {
          var t = R.int(0, 2), F, q, rew, raw, wrong = [];
          if (t === 0) {
            var b = R.int(2, 9), d = R.int(2, 9), a = coprimeNum(R, b), c = coprimeNum(R, d);
            if (a * d === b * c) { d = d === 9 ? 8 : d + 1; c = coprimeNum(R, d); }
            F = R.F(a * d, b * c);
            q = fr(a, b) + '\\div ' + fr(c, d);
            rew = fr(a, b) + '\\times ' + fr(d, c);
            raw = [a * d, b * c];
            wrong.push({ a: (a * c) + '/' + (b * d), why: '역수를 곱하지 않고 그대로 곱했습니다. 나누는 수 $' + fr(c, d) + '$' + R.josa(c, '을/를') + ' 뒤집어 곱합니다.' });
            wrong.push({ a: (b * c) + '/' + (a * d), why: '나누어지는 수(앞의 수)를 뒤집었습니다. 뒤집는 것은 나누는 수(뒤의 수)입니다.' });
          } else if (t === 1) {
            var n = R.int(2, 9), b1 = R.int(2, 9), a1 = coprimeNum(R, b1);
            F = R.F(n * b1, a1);
            q = n + '\\div ' + fr(a1, b1);
            rew = n + '\\times ' + fr(b1, a1);
            raw = [n * b1, a1];
            wrong.push({ a: (n * a1) + '/' + b1, why: '역수를 곱하지 않고 $' + n + '\\times ' + fr(a1, b1) + '$' + R.josa(a1, '을/를') + ' 계산했습니다. 나누는 수의 역수를 곱합니다.' });
            wrong.push({ a: a1 + '/' + (n * b1), why: '나누는 수와 나누어지는 수를 바꾸어 $' + fr(a1, b1) + '\\div ' + n + '$' + R.josa(n, '을/를') + ' 계산했습니다.' });
          } else {
            var n2 = R.int(2, 9), b3 = R.int(2, 9), a3 = coprimeNum(R, b3);
            F = R.F(a3, b3 * n2);
            q = fr(a3, b3) + '\\div ' + n2;
            rew = fr(a3, b3) + '\\times ' + fr(1, n2);
            raw = [a3, b3 * n2];
            wrong.push({ a: (a3 * n2) + '/' + b3, why: '나누어야 할 것을 곱했습니다. ' + n2 + R.josa(n2, '으로/로') + ' 나누는 것은 $' + fr(1, n2) + '$' + R.josa(1, '을/를') + ' 곱하는 것입니다.' });
          }
          wrong = wrong.filter(function (w) { return !valueEq(R, w.a, F); });
          return {
            type: 'short', check: 'number', concept: 4,
            q: '계산해 보십시오. (답은 기약분수, 가분수, 대분수 어느 꼴로 써도 됩니다.)\n\n$' + q + '$',
            answer: F.toString(),
            wrong: wrong,
            explain: '나누는 수의 역수를 곱합니다. $' + q + '=' + rew + '=' + fr(raw[0], raw[1]) + tidy(R, raw[0], raw[1]) + '$',
          };
        },
      },
      {
        id: 'recipe',
        level: 2,
        title: '요리 재료의 양 바꾸기·나누어 쓰기',
        make: function (R) {
          var item = R.pick([['설탕', '컵'], ['간장', '큰술'], ['밀가루', '컵'], ['우유', '컵'], ['식초', '큰술'], ['소금', '작은술']]);
          var name = item[0], unit = item[1];
          var wrong = [];
          if (R.bool(0.6)) {
            var s1 = R.pick([2, 3, 4, 6]), s2;
            do { s2 = R.int(2, 8); } while (s2 === s1);
            var den = R.pick([2, 3, 4, 8]), num;
            do { num = R.int(1, 2 * den); } while (num % den === 0);
            var amt = R.F(num, den);
            var factor = R.F(s2, s1);
            var F = amt.mul(factor);
            wrong.push({ a: amt.mul(s2).toString(), why: s1 + '인분 양에 ' + s2 + R.josa(s2, '을/를') + ' 곱했습니다. ' + s2 + '인분은 ' + s1 + '인분의 $' + fr(s2, s1) + '$배입니다.' });
            wrong.push({ a: amt.mul(R.F(s1, s2)).toString(), why: '거꾸로 $' + fr(s1, s2) + '$' + R.josa(s1, '을/를') + ' 곱했습니다. (만들 인분) ÷ (원래 인분)을 곱합니다.' });
            var seen = {};
            wrong = wrong.filter(function (w) {
              if (valueEq(R, w.a, F) || seen[w.a]) return false;
              seen[w.a] = true;
              return true;
            });
            var conv = amt.num > amt.den ? '=' + ftex(amt) + '\\times ' + fr(s2, s1) : '';
            return {
              type: 'short', check: 'number', unit: unit, concept: 5,
              q: s1 + '인분에 ' + name + R.josa(name, '이/가') + ' $' + mix(amt) + '$' + unit + ' 들어가는 요리를 ' + s2 + '인분 만들려고 합니다. ' + name + R.josa(name, '은/는') + ' 몇 ' + unit + ' 필요합니까?',
              answer: F.toString(),
              hint: s2 + '인분은 ' + s1 + '인분의 몇 배인지 먼저 구하십시오.',
              wrong: wrong,
              explain: s2 + '인분은 ' + s1 + '인분의 $' + fr(s2, s1) + tidy(R, s2, s1) + '$배입니다. $' + mix(amt) + '\\times ' + fr(s2, s1) + conv + '=' + fr(amt.num * s2, amt.den * s1) + tidy(R, amt.num * s2, amt.den * s1) + '$' + unit + '입니다.',
            };
          }
          // 한 번에 일정량씩 덜어 쓰기 — 몇 번?
          var pd = R.pick([2, 3, 4, 8]), pn = coprimeNum(R, pd);
          var per = R.F(pn, pd), m = R.int(3, 12);
          var total = per.mul(m);
          var times = total.mul(per);
          if (!times.eq(R.F(m, 1))) wrong.push({ a: times.toString(), why: '나누어야 할 것을 곱했습니다. 몇 번 쓸 수 있는지는 나눗셈으로 구합니다.' });
          return {
            type: 'short', check: 'number', unit: '번', concept: 5,
            q: name + ' $' + mix(total) + '$' + unit + '을 한 번에 $' + fr(pn, pd) + '$' + unit + '씩 쓰면 모두 몇 번 쓸 수 있습니까?',
            answer: String(m),
            hint: '$' + mix(total) + '$ 안에 $' + fr(pn, pd) + '$' + R.josa(pn, '이/가') + ' 몇 번 들어가는지 구하십시오.',
            wrong: wrong,
            explain: '$' + mix(total) + '\\div ' + fr(pn, pd) + '=' + ftex(total) + '\\times ' + (pn === 1 ? String(pd) : fr(pd, pn)) + '=' + m + '$이므로 ' + m + '번 쓸 수 있습니다.',
          };
        },
      },
    ],
  });
})();
