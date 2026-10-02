/* 중3 수학 · 근호를 포함한 식의 계산
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy) */
(function () {
  // 생성기 도우미 (난수를 쓰지 않는 순수 함수만)
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  // n = k^2 * c (c 는 제곱 인수가 없는 수) → [k, c]
  function splitSquare(n) {
    var k = 1, c = n;
    for (var p = 2; p * p <= c; p++) while (c % (p * p) === 0) { c /= p * p; k *= p; }
    return [k, c];
  }
  // k√c 의 TeX (k=1 이면 √c, c=1 이면 k)
  function surd(k, c) {
    if (c === 1) return String(k);
    if (k === 1) return '\\sqrt{' + c + '}';
    if (k === -1) return '-\\sqrt{' + c + '}';
    return k + '\\sqrt{' + c + '}';
  }
  // 분수 꼴 a√c / b (기약) 의 TeX 와 값
  function fracSurd(a, c, b) {
    var g = gcd(a, b); a /= g; b /= g;
    var top = surd(a, c);
    return { tex: b === 1 ? top : '\\frac{' + top + '}{' + b + '}', val: a * Math.sqrt(c) / b };
  }

  Tutor.registerUnit({
    id: 'math-m3-02',
    course: 'math-m3',
    title: '근호를 포함한 식의 계산',
    summary: '제곱근의 곱셈과 나눗셈, 분모의 유리화, 덧셈과 뺄셈을 익혀 근호를 포함한 식을 계산해요.',
    goals: [
      '제곱근의 곱셈과 나눗셈을 하고, 근호 안의 제곱인 인수를 근호 밖으로 꺼낼 수 있어요.',
      '분모에 근호가 있는 식의 분모를 유리화할 수 있어요.',
      '근호를 포함한 식의 덧셈과 뺄셈, 분배법칙을 이용한 혼합 계산을 할 수 있어요.',
      '제곱근의 어림값을 이용하여 여러 수의 제곱근의 값을 구할 수 있어요.',
    ],
    standards: ['[9수01-10]'],

    concepts: [
      {
        title: '제곱근의 곱셈과 나눗셈',
        body: '$a>0$, $b>0$일 때 근호 안의 수끼리 곱하거나 나눌 수 있어요.\n\n' +
          '$\\sqrt{a}\\times\\sqrt{b}=\\sqrt{ab}$, $\\quad\\sqrt{a}\\div\\sqrt{b}=\\frac{\\sqrt{a}}{\\sqrt{b}}=\\sqrt{\\frac{a}{b}}$\n\n' +
          '**왜 그럴까요?** $(\\sqrt{a}\\times\\sqrt{b})^{2}=(\\sqrt{a})^{2}\\times(\\sqrt{b})^{2}=ab$이고 $\\sqrt{a}\\times\\sqrt{b}>0$이므로, $\\sqrt{a}\\times\\sqrt{b}$는 $ab$의 양의 제곱근 $\\sqrt{ab}$예요.\n\n' +
          '근호 밖에 수가 있으면 근호 밖의 수끼리, 근호 안의 수끼리 계산해요.\n\n' +
          '$2\\sqrt{3}\\times5\\sqrt{2}=(2\\times5)\\sqrt{3\\times2}=10\\sqrt{6}$, $\\quad6\\sqrt{10}\\div2\\sqrt{5}=\\frac{6}{2}\\sqrt{\\frac{10}{5}}=3\\sqrt{2}$\n\n' +
          '> ⚠️ 곱셈·나눗셈과 달리 덧셈은 근호 안끼리 할 수 없어요. $\\sqrt{2}+\\sqrt{3}\\ne\\sqrt{5}$',
        easy: '$\\sqrt{4}\\times\\sqrt{9}$를 두 가지로 계산해 보세요. 먼저 근호를 벗기면 $2\\times3=6$이고, 근호 안끼리 곱하면 $\\sqrt{36}=6$이에요. 결과가 같지요?\n\n' +
          '그래서 근호가 있는 수끼리 곱할 때는 "안은 안끼리, 밖은 밖끼리" 곱하면 돼요.',
        check: {
          type: 'choice',
          q: '$\\sqrt{2}\\times\\sqrt{8}$의 값은 무엇일까요?',
          choices: ['$4$', '$\\sqrt{10}$', '$16$'],
          answer: 0,
          why: ['', '근호 안끼리 더했어요. 곱셈이므로 근호 안끼리 곱해요: $\\sqrt{2\\times8}$', '$\\sqrt{16}$에서 근호를 벗기는 것을 잊었어요. $\\sqrt{16}=4$예요.'],
          explain: '$\\sqrt{2}\\times\\sqrt{8}=\\sqrt{16}=4$예요.',
        },
      },
      {
        title: '근호 안의 제곱인 인수를 근호 밖으로',
        body: '근호 안의 수에 제곱인 인수가 있으면 근호 밖으로 꺼낼 수 있어요. $a>0$, $b>0$일 때\n\n' +
          '$\\sqrt{a^{2}b}=\\sqrt{a^{2}}\\times\\sqrt{b}=a\\sqrt{b}$\n\n' +
          '예: $\\sqrt{12}=\\sqrt{2^{2}\\times3}=2\\sqrt{3}$, $\\quad\\sqrt{72}=\\sqrt{6^{2}\\times2}=6\\sqrt{2}$\n\n' +
          '거꾸로 근호 밖의 양수는 **제곱해서** 근호 안으로 넣을 수 있어요: $3\\sqrt{2}=\\sqrt{3^{2}\\times2}=\\sqrt{18}$\n\n' +
          '분수도 같아요: $\\sqrt{\\frac{5}{9}}=\\frac{\\sqrt{5}}{\\sqrt{9}}=\\frac{\\sqrt{5}}{3}$\n\n' +
          '> 💡 소인수분해를 해서 지수가 2 이상인 소인수를 짝지어 꺼내면 빠뜨리지 않아요. 보통 근호 안의 수를 **가장 작은 자연수**가 되게 정리해요. $\\sqrt{72}=2\\sqrt{18}$에서 멈추면 아직 덜 정리한 거예요.',
        easy: '근호는 "제곱인 것만 통과할 수 있는 문"이라고 생각해 보세요. $\\sqrt{12}$ 안에는 $4\\times3$이 들어 있는데, 4는 $2\\times2$로 짝이 맞으니 문을 통과해서 밖으로 나올 때 2가 돼요. 3은 짝이 없어서 안에 남아요.\n\n' +
          '그래서 $\\sqrt{12}=2\\sqrt{3}$이에요.',
        check: {
          type: 'short', check: 'number',
          q: '$\\sqrt{50}=a\\sqrt{2}$일 때, 자연수 $a$의 값을 구해 보세요.',
          answer: '5',
          wrong: [{ a: '25', why: '25를 그대로 꺼냈어요. 근호 밖으로 나올 때는 $\\sqrt{25}=5$가 돼요.' }],
          explain: '$50=5^{2}\\times2$이므로 $\\sqrt{50}=5\\sqrt{2}$예요. 그래서 $a=5$예요.',
        },
      },
      {
        title: '분모의 유리화',
        body: '분모에 근호가 있을 때, 분모와 분자에 같은 수를 곱해 분모를 유리수로 고치는 것을 **분모의 유리화**라고 해요.\n\n' +
          '$\\frac{a}{\\sqrt{b}}=\\frac{a\\times\\sqrt{b}}{\\sqrt{b}\\times\\sqrt{b}}=\\frac{a\\sqrt{b}}{b}$ $\\quad$($b>0$)\n\n' +
          '예: $\\frac{3}{\\sqrt{2}}=\\frac{3\\sqrt{2}}{2}$, $\\quad\\frac{6}{\\sqrt{3}}=\\frac{6\\sqrt{3}}{3}=2\\sqrt{3}$\n\n' +
          '$\\frac{\\sqrt{2}}{\\sqrt{5}}=\\frac{\\sqrt{2}\\times\\sqrt{5}}{\\sqrt{5}\\times\\sqrt{5}}=\\frac{\\sqrt{10}}{5}$\n\n' +
          '분모가 $\\sqrt{12}$처럼 정리되지 않았으면 먼저 $2\\sqrt{3}$으로 정리하고 $\\sqrt{3}$만 곱하면 계산이 간단해져요: $\\frac{1}{\\sqrt{12}}=\\frac{1}{2\\sqrt{3}}=\\frac{\\sqrt{3}}{2\\times3}=\\frac{\\sqrt{3}}{6}$\n\n' +
          '> 💡 분모와 분자에 같은 수를 곱해도 분수의 값은 그대로예요. 모양만 바뀌어요.',
        easy: '$\\frac{1}{\\sqrt{2}}$이 얼마쯤인지 어림하려면 1을 $1.414\\cdots$로 나누어야 해서 어려워요. 그런데 $\\frac{\\sqrt{2}}{2}$로 바꾸면 $1.414\\cdots$의 절반, 약 0.707이라는 걸 바로 알 수 있지요.\n\n' +
          '분모의 유리화는 이렇게 "분모를 깔끔한 수로 바꾸어 다루기 쉽게" 하는 일이에요. $\\sqrt{2}\\times\\sqrt{2}=2$라는 성질을 써요.',
        check: {
          type: 'ox',
          q: '$\\frac{3}{\\sqrt{3}}$의 분모를 유리화하면 $\\sqrt{3}$이에요.',
          answer: true,
          explain: '$\\frac{3}{\\sqrt{3}}=\\frac{3\\sqrt{3}}{\\sqrt{3}\\times\\sqrt{3}}=\\frac{3\\sqrt{3}}{3}=\\sqrt{3}$이에요.',
        },
      },
      {
        title: '제곱근의 덧셈과 뺄셈',
        body: '근호 안의 수가 같은 것끼리는 문자식의 동류항처럼 계산해요.\n\n' +
          '$m\\sqrt{a}+n\\sqrt{a}=(m+n)\\sqrt{a}$, $\\quad m\\sqrt{a}-n\\sqrt{a}=(m-n)\\sqrt{a}$\n\n' +
          '예: $5\\sqrt{2}+3\\sqrt{2}=8\\sqrt{2}$ (마치 $5x+3x=8x$처럼)\n\n' +
          '근호 안의 수가 달라 보여도 **먼저 정리하면** 같아질 수 있어요.\n\n' +
          '$\\sqrt{8}+\\sqrt{18}=2\\sqrt{2}+3\\sqrt{2}=5\\sqrt{2}$\n\n' +
          '근호 안의 수가 끝까지 다르면 더 이상 계산할 수 없어요. $2\\sqrt{3}+\\sqrt{5}$는 그대로 답이에요.\n\n' +
          '> ⚠️ $\\sqrt{2}+\\sqrt{3}=\\sqrt{5}$가 아니에요. $\\sqrt{2}+\\sqrt{3}=1.414\\cdots+1.732\\cdots=3.146\\cdots$이지만 $\\sqrt{5}=2.236\\cdots$예요.',
        easy: '$\\sqrt{2}$를 "사과", $\\sqrt{3}$을 "배"라고 생각해 보세요. 사과 5개와 사과 3개를 더하면 사과 8개지요. 그래서 $5\\sqrt{2}+3\\sqrt{2}=8\\sqrt{2}$예요.\n\n' +
          '하지만 사과 2개와 배 1개를 더해서 "사과배 3개"라고 할 수는 없어요. $2\\sqrt{2}+\\sqrt{3}$은 더 합칠 수 없어요.\n\n' +
          '$\\sqrt{8}$은 포장을 벗기면 $2\\sqrt{2}$, 곧 사과 2개예요. 포장부터 벗겨 보세요.',
        check: {
          type: 'choice',
          q: '$\\sqrt{12}+\\sqrt{27}$을 계산한 값은 무엇일까요?',
          choices: ['$5\\sqrt{3}$', '$\\sqrt{39}$', '$6\\sqrt{3}$'],
          answer: 0,
          why: ['', '근호 안끼리 더했어요. 덧셈은 근호 안끼리 할 수 없어요. 먼저 $2\\sqrt{3}$, $3\\sqrt{3}$으로 정리해요.', '근호 밖의 수를 곱했어요. $2\\sqrt{3}+3\\sqrt{3}$은 $(2+3)\\sqrt{3}$이에요.'],
          explain: '$\\sqrt{12}=2\\sqrt{3}$, $\\sqrt{27}=3\\sqrt{3}$이므로 $2\\sqrt{3}+3\\sqrt{3}=5\\sqrt{3}$이에요.',
        },
      },
      {
        title: '분배법칙과 혼합 계산',
        body: '근호를 포함한 식에서도 **분배법칙**이 성립해요.\n\n' +
          '$\\sqrt{2}(\\sqrt{3}+\\sqrt{5})=\\sqrt{6}+\\sqrt{10}$, $\\quad\\sqrt{3}(\\sqrt{12}-2)=\\sqrt{36}-2\\sqrt{3}=6-2\\sqrt{3}$\n\n' +
          '여러 계산이 섞여 있으면 수의 계산과 같은 순서로 해요.\n\n' +
          '1. 근호 안의 제곱인 인수를 꺼내고, 분모를 유리화해요.\n2. 괄호가 있으면 분배법칙으로 풀어요.\n3. 곱셈과 나눗셈을 먼저 해요.\n4. 근호 안의 수가 같은 것끼리 덧셈과 뺄셈을 해요.\n\n' +
          '예: $\\sqrt{2}\\times\\sqrt{6}+\\frac{6}{\\sqrt{3}}=\\sqrt{12}+2\\sqrt{3}=2\\sqrt{3}+2\\sqrt{3}=4\\sqrt{3}$\n\n' +
          '> 💡 $a$, $b$가 유리수이고 $\\sqrt{m}$이 무리수일 때, $a+b\\sqrt{m}$이 유리수가 되려면 $b=0$이어야 해요.',
        easy: '$\\sqrt{2}(\\sqrt{3}+\\sqrt{5})$는 "$\\sqrt{2}$를 괄호 안의 두 친구에게 각각 나누어 주는 것"이에요. $3(x+2)=3x+6$과 똑같아요.\n\n' +
          '계산 순서도 보통 수의 계산과 같아요. 곱셈·나눗셈 먼저, 덧셈·뺄셈은 나중에. 마지막에 근호 안이 같은 것끼리 모아요.',
        check: {
          type: 'choice',
          q: '$\\sqrt{3}(\\sqrt{3}+\\sqrt{2})$를 계산한 것은 무엇일까요?',
          choices: ['$3+\\sqrt{6}$', '$\\sqrt{3}+\\sqrt{6}$', '$3+\\sqrt{2}$'],
          answer: 0,
          why: ['', '$\\sqrt{3}\\times\\sqrt{3}=3$이에요. 근호를 벗겨요.', '두 번째 항에도 $\\sqrt{3}$을 곱해야 해요: $\\sqrt{3}\\times\\sqrt{2}=\\sqrt{6}$'],
          explain: '분배법칙으로 $\\sqrt{3}\\times\\sqrt{3}+\\sqrt{3}\\times\\sqrt{2}=3+\\sqrt{6}$이에요.',
        },
      },
      {
        title: '제곱근의 어림값',
        body: '$\\sqrt{2}$, $\\sqrt{3}$처럼 무리수인 제곱근의 값은 **계산기**의 $\\sqrt{\\;}$ 단추나 **제곱근표**로 어림값을 구해요. 계산기에 2를 넣고 $\\sqrt{\\;}$ 단추를 누르면 $1.414213\\cdots$이 나와요.\n\n' +
          '제곱근표에 없는 큰 수나 작은 수는 근호 안을 **(표에 있는 수)×(100의 거듭제곱)** 꼴로 바꾸어 구해요.\n\n' +
          '$\\sqrt{5}=2.236$일 때\n\n' +
          '- $\\sqrt{500}=\\sqrt{100\\times5}=10\\sqrt{5}=22.36$\n- $\\sqrt{0.05}=\\sqrt{\\frac{5}{100}}=\\frac{\\sqrt{5}}{10}=0.2236$\n\n' +
          '$\\sqrt{50}$은 $\\sqrt{5}$로는 구할 수 없고 $\\sqrt{50}=5\\sqrt{2}$나 $\\sqrt{50}=\\sqrt{100\\times0.5}$처럼 다른 제곱근의 값이 필요해요.\n\n' +
          '> 💡 근호 안의 수에서 소수점이 **두 자리** 움직일 때마다 제곱근의 소수점은 **한 자리** 움직여요.',
        easy: '$100=10\\times10$이니까 근호 안에서 100을 곱하면 근호 밖에서는 10을 곱한 것과 같아요.\n\n' +
          '그래서 $\\sqrt{5}$가 2.236이면 $\\sqrt{500}$은 그 10배인 22.36이에요. 거꾸로 근호 안을 100으로 나누면 밖에서는 10으로 나눈 것이 돼요.',
        check: {
          type: 'short', check: 'number',
          q: '$\\sqrt{3}=1.732$일 때, $\\sqrt{300}$의 값을 구해 보세요.',
          answer: '17.32',
          wrong: [{ a: '173.2', why: '근호 안에서 100을 곱하면 밖에서는 $\\sqrt{100}=10$을 곱한 것이에요. 100배가 아니라 10배예요.' }],
          explain: '$\\sqrt{300}=\\sqrt{100\\times3}=10\\sqrt{3}=10\\times1.732=17.32$예요.',
        },
      },
    ],

    examples: [
      {
        q: '$\\sqrt{48}-\\sqrt{27}+\\sqrt{75}$를 계산하세요.',
        steps: [
          '근호 안의 제곱인 인수를 꺼내요. $\\sqrt{48}=\\sqrt{4^{2}\\times3}=4\\sqrt{3}$',
          '$\\sqrt{27}=\\sqrt{3^{2}\\times3}=3\\sqrt{3}$, $\\sqrt{75}=\\sqrt{5^{2}\\times3}=5\\sqrt{3}$',
          '근호 안의 수가 모두 3이므로 계수끼리 계산해요. $4\\sqrt{3}-3\\sqrt{3}+5\\sqrt{3}=(4-3+5)\\sqrt{3}$',
        ],
        answer: '$6\\sqrt{3}$',
      },
      {
        q: '$\\frac{4}{\\sqrt{2}}+\\sqrt{2}(3-\\sqrt{2})$를 계산하세요.',
        steps: [
          '분모를 유리화해요. $\\frac{4}{\\sqrt{2}}=\\frac{4\\sqrt{2}}{2}=2\\sqrt{2}$',
          '분배법칙으로 괄호를 풀어요. $\\sqrt{2}(3-\\sqrt{2})=3\\sqrt{2}-2$',
          '모두 더하면 $2\\sqrt{2}+3\\sqrt{2}-2=5\\sqrt{2}-2$',
        ],
        answer: '$5\\sqrt{2}-2$',
      },
    ],

    terms: [
      { term: '분모의 유리화', def: '분모에 근호가 있을 때 분모와 분자에 같은 수를 곱해 분모를 유리수로 고치는 것이에요. 예: $\\frac{1}{\\sqrt{2}}=\\frac{\\sqrt{2}}{2}$' },
      { term: '근호', def: '제곱근을 나타내는 기호 $\\sqrt{\\;}$예요. "루트"라고 읽어요.' },
      { term: '제곱근표', def: '1.00부터 99.9까지의 수의 양의 제곱근의 어림값을 정리한 표예요. 가로줄과 세로줄이 만나는 칸에서 값을 읽어요.' },
      { term: '분배법칙', def: '$a(b+c)=ab+ac$처럼 괄호 밖의 수를 괄호 안의 각 항에 곱하는 법칙이에요. 근호가 있는 식에도 쓸 수 있어요.' },
      { term: '제곱인 인수', def: '$4=2^{2}$, $9=3^{2}$처럼 어떤 자연수의 제곱인 인수예요. 근호 밖으로 꺼낼 수 있어요. 예: $\\sqrt{18}=\\sqrt{3^{2}\\times2}=3\\sqrt{2}$' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '계산해 보세요.\n\n$\\sqrt{3}\\times\\sqrt{12}$',
        answer: '6',
        wrong: [{ a: '36', why: '$\\sqrt{36}$에서 근호를 벗기는 것을 잊었어요. $\\sqrt{36}=6$이에요.' }],
        explain: '근호 안끼리 곱하면 $\\sqrt{3}\\times\\sqrt{12}=\\sqrt{36}=6$이에요.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 0,
        q: '$\\sqrt{30}\\div\\sqrt{5}$의 값은 무엇일까요?',
        choices: ['$\\sqrt{6}$', '$6$', '$\\sqrt{25}$', '$\\sqrt{150}$'],
        answer: 0,
        why: [
          '',
          '근호를 빠뜨렸어요. $\\sqrt{30}\\div\\sqrt{5}=\\sqrt{30\\div5}=\\sqrt{6}$이에요.',
          '나눗셈인데 근호 안끼리 뺐어요. 근호 안끼리 나누어요.',
          '나눗셈인데 근호 안끼리 곱했어요.',
        ],
        explain: '$\\sqrt{30}\\div\\sqrt{5}=\\sqrt{\\frac{30}{5}}=\\sqrt{6}$이에요.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 1,
        q: '$\\sqrt{75}=a\\sqrt{3}$일 때, 자연수 $a$의 값을 구해 보세요.',
        answer: '5',
        wrong: [{ a: '25', why: '25를 그대로 꺼냈어요. 근호 밖으로 나올 때는 $\\sqrt{25}=5$가 돼요.' }],
        explain: '$75=5^{2}\\times3$이므로 $\\sqrt{75}=5\\sqrt{3}$이에요. 그래서 $a=5$예요.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 1,
        q: '$3\\sqrt{2}$를 $\\sqrt{a}$ 꼴로 나타낸 것은 무엇일까요?',
        choices: ['$\\sqrt{18}$', '$\\sqrt{6}$', '$\\sqrt{12}$', '$\\sqrt{5}$'],
        answer: 0,
        why: [
          '',
          '3을 제곱하지 않고 그대로 곱했어요. 근호 안으로 넣을 때는 $3^{2}=9$를 곱해요.',
          '3이 아니라 2를 제곱했어요. 근호 **밖의** 수 3을 제곱해서 넣어요: $3^{2}\\times2$',
          '3과 2를 더했어요. $3\\sqrt{2}$는 $3\\times\\sqrt{2}$, 곧 곱셈이에요.',
        ],
        explain: '$3\\sqrt{2}=\\sqrt{3^{2}}\\times\\sqrt{2}=\\sqrt{9\\times2}=\\sqrt{18}$이에요.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '$\\frac{6}{\\sqrt{2}}$의 분모를 유리화한 것은 무엇일까요?',
        choices: ['$3\\sqrt{2}$', '$6\\sqrt{2}$', '$\\frac{\\sqrt{6}}{2}$', '$\\sqrt{3}$'],
        answer: 0,
        why: [
          '',
          '분모와 분자에 $\\sqrt{2}$를 곱하면 분모는 2가 돼요. 분모 2로 나누는 것을 잊었어요.',
          '분자 6에 근호를 씌웠어요. 분자에는 $\\sqrt{2}$를 **곱해요**: $6\\times\\sqrt{2}$',
          '$\\sqrt{\\frac{6}{2}}$으로 계산했어요. 6은 근호 밖의 수라서 근호 안으로 넣으려면 제곱해야 해요.',
        ],
        explain: '$\\frac{6}{\\sqrt{2}}=\\frac{6\\times\\sqrt{2}}{\\sqrt{2}\\times\\sqrt{2}}=\\frac{6\\sqrt{2}}{2}=3\\sqrt{2}$예요.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 3,
        q: '$5\\sqrt{7}-2\\sqrt{7}+\\sqrt{7}=a\\sqrt{7}$일 때, $a$의 값을 구해 보세요.',
        answer: '4',
        wrong: [{ a: '3', why: '마지막 $\\sqrt{7}$을 빠뜨렸어요. $\\sqrt{7}$은 $1\\sqrt{7}$이에요.' }],
        explain: '근호 안의 수가 7로 같으므로 앞의 수끼리 계산해요. $(5-2+1)\\sqrt{7}=4\\sqrt{7}$이므로 $a=4$예요.',
      },
      {
        id: 'p7', level: 1, type: 'ox', concept: 3,
        q: '$\\sqrt{2}+\\sqrt{3}=\\sqrt{5}$예요.',
        answer: false,
        explain: '덧셈은 근호 안끼리 할 수 없어요. $\\sqrt{2}+\\sqrt{3}=1.414\\cdots+1.732\\cdots=3.146\\cdots$이고 $\\sqrt{5}=2.236\\cdots$이므로 같지 않아요. $\\sqrt{2}+\\sqrt{3}$은 더 간단히 할 수 없어요.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 3,
        q: '$\\sqrt{48}-\\sqrt{12}+\\sqrt{27}$을 계산한 값은 무엇일까요?',
        choices: ['$5\\sqrt{3}$', '$\\sqrt{63}$', '$9\\sqrt{3}$', '$-\\sqrt{3}$'],
        answer: 0,
        why: [
          '',
          '근호 안끼리 계산했어요($48-12+27=63$). 덧셈·뺄셈은 근호 안끼리 할 수 없어요.',
          '빼기를 더하기로 계산했어요. $4\\sqrt{3}-2\\sqrt{3}+3\\sqrt{3}$이에요.',
          '$4\\sqrt{3}-(2\\sqrt{3}+3\\sqrt{3})$처럼 뒤의 두 항을 모두 뺐어요. $+\\sqrt{27}$은 더해요.',
        ],
        hint: '세 수를 모두 $a\\sqrt{3}$ 꼴로 바꾸어 보세요.',
        explain: '$\\sqrt{48}=4\\sqrt{3}$, $\\sqrt{12}=2\\sqrt{3}$, $\\sqrt{27}=3\\sqrt{3}$이므로 $4\\sqrt{3}-2\\sqrt{3}+3\\sqrt{3}=5\\sqrt{3}$이에요.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
        q: '계산해 보세요.\n\n$\\sqrt{3}(\\sqrt{12}-\\sqrt{3})$',
        answer: '3',
        wrong: [{ a: '9', why: '부호를 놓쳤어요. 괄호 안이 빼기이므로 $\\sqrt{36}-\\sqrt{9}=6-3$이에요.' }],
        hint: '분배법칙으로 $\\sqrt{3}$을 괄호 안의 두 항에 각각 곱해요.',
        explain: '$\\sqrt{3}\\times\\sqrt{12}-\\sqrt{3}\\times\\sqrt{3}=\\sqrt{36}-3=6-3=3$이에요.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 4,
        q: '$\\frac{4}{\\sqrt{2}}+\\sqrt{8}-\\sqrt{2}$를 계산한 값은 무엇일까요?',
        choices: ['$3\\sqrt{2}$', '$5\\sqrt{2}$', '$2+\\sqrt{2}$', '$2\\sqrt{2}$'],
        answer: 0,
        why: [
          '',
          '$\\frac{4}{\\sqrt{2}}$를 $4\\sqrt{2}$로 계산했어요. 유리화하면 분모가 2가 되니 2로 나누어요: $\\frac{4\\sqrt{2}}{2}=2\\sqrt{2}$',
          '$\\frac{4}{\\sqrt{2}}$를 $\\frac{4}{2}=2$처럼 근호를 지우고 계산했어요.',
          '$\\frac{4}{\\sqrt{2}}$를 $\\sqrt{\\frac{4}{2}}=\\sqrt{2}$로 계산했어요. 4를 근호 안으로 넣으려면 제곱해서 16이 돼요.',
        ],
        hint: '먼저 분모를 유리화하고, $\\sqrt{8}$을 $a\\sqrt{2}$ 꼴로 바꾸어 보세요.',
        explain: '$\\frac{4}{\\sqrt{2}}=\\frac{4\\sqrt{2}}{2}=2\\sqrt{2}$, $\\sqrt{8}=2\\sqrt{2}$이므로 $2\\sqrt{2}+2\\sqrt{2}-\\sqrt{2}=3\\sqrt{2}$예요.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 5,
        q: '$\\sqrt{5}=2.236$일 때, $\\sqrt{500}$의 값을 구해 보세요.',
        answer: '22.36',
        wrong: [{ a: '223.6', why: '근호 안에서 100을 곱하면 밖에서는 $\\sqrt{100}=10$을 곱한 것이에요. 100배가 아니라 10배예요.' }],
        hint: '500을 $100\\times5$로 나누어 생각해 보세요.',
        explain: '$\\sqrt{500}=\\sqrt{100\\times5}=10\\sqrt{5}=10\\times2.236=22.36$이에요.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 5,
        q: '$\\sqrt{3}=1.732$, $\\sqrt{30}=5.477$일 때, 다음 중 **옳지 않은** 것은 무엇일까요?',
        choices: ['$\\sqrt{300}=17.32$', '$\\sqrt{3000}=54.77$', '$\\sqrt{0.3}=0.5477$', '$\\sqrt{0.03}=0.1732$', '$\\sqrt{0.003}=0.01732$'],
        answer: 4,
        why: [
          '$\\sqrt{300}=\\sqrt{100\\times3}=10\\sqrt{3}=17.32$로 옳아요.',
          '$\\sqrt{3000}=\\sqrt{100\\times30}=10\\sqrt{30}=54.77$로 옳아요.',
          '$\\sqrt{0.3}=\\sqrt{\\frac{30}{100}}=\\frac{\\sqrt{30}}{10}=0.5477$로 옳아요.',
          '$\\sqrt{0.03}=\\sqrt{\\frac{3}{100}}=\\frac{\\sqrt{3}}{10}=0.1732$로 옳아요.',
          '',
        ],
        hint: '근호 안의 수를 (3 또는 30)×(100의 거듭제곱) 꼴로 바꾸어 보세요.',
        explain: '$0.003=\\frac{30}{10000}$이므로 $\\sqrt{0.003}=\\frac{\\sqrt{30}}{100}=0.05477$이에요. $0.01732$는 $\\sqrt{0.0003}$의 값이에요. 근호 안의 소수점이 두 자리 움직일 때 제곱근의 소수점은 한 자리 움직여요.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 4,
        q: '$a$는 유리수예요. $\\sqrt{3}(2\\sqrt{3}-5)+a\\sqrt{3}$이 유리수가 되도록 하는 $a$의 값을 구해 보세요.',
        answer: '5',
        wrong: [{ a: '-5', why: '부호를 거꾸로 했어요. 정리하면 $6+(a-5)\\sqrt{3}$이므로 $a-5=0$이어야 해요.' }],
        hint: '식을 정리해서 (유리수)+(유리수)$\\times\\sqrt{3}$ 꼴로 만들어 보세요.',
        explain: '$\\sqrt{3}(2\\sqrt{3}-5)+a\\sqrt{3}=6-5\\sqrt{3}+a\\sqrt{3}=6+(a-5)\\sqrt{3}$이에요. 이 식이 유리수가 되려면 $\\sqrt{3}$ 앞의 수가 0이어야 하므로 $a-5=0$, 곧 $a=5$예요.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 2,
        q: '$\\frac{\\sqrt{2}}{\\sqrt{3}}=a\\sqrt{6}$일 때, 유리수 $a$의 값을 구해 보세요.',
        answer: '1/3',
        wrong: [{ a: '3', why: '분모와 분자를 바꾸었어요. $\\frac{\\sqrt{2}}{\\sqrt{3}}=\\frac{\\sqrt{6}}{3}=\\frac{1}{3}\\sqrt{6}$이에요.' }],
        hint: '분모를 유리화한 뒤 $\\sqrt{6}$ 앞의 수를 읽어요.',
        explain: '$\\frac{\\sqrt{2}}{\\sqrt{3}}=\\frac{\\sqrt{2}\\times\\sqrt{3}}{\\sqrt{3}\\times\\sqrt{3}}=\\frac{\\sqrt{6}}{3}=\\frac{1}{3}\\sqrt{6}$이므로 $a=\\frac{1}{3}$이에요.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 3,
        q: '넓이가 각각 $8\\,\\text{cm}^{2}$, $18\\,\\text{cm}^{2}$인 정사각형 두 개를 그림처럼 밑변을 맞추어 나란히 붙였어요. 붙여서 만든 도형의 둘레의 길이는 무엇일까요?',
        fig: {
          type: 'polygon',
          points: [[0, 0], [5, 0], [5, 3], [2, 3], [2, 2], [0, 2]],
          segments: [{ from: [2, 0], to: [2, 2], dashed: true }],
          alt: '작은 정사각형(왼쪽)과 큰 정사각형(오른쪽)을 밑변을 맞추어 붙인 도형',
        },
        choices: ['$16\\sqrt{2}$ cm', '$20\\sqrt{2}$ cm', '$10\\sqrt{2}$ cm', '$12\\sqrt{2}$ cm'],
        answer: 0,
        why: [
          '',
          '두 정사각형의 둘레를 그냥 더했어요($8\\sqrt{2}+12\\sqrt{2}$). 맞닿은 부분은 도형의 둘레가 아니에요.',
          '아래쪽 가로 길이만 두 번 더했어요. 세로 길이도 둘레에 들어가요.',
          '맞닿은 부분을 너무 많이 뺐어요. 맞닿은 길이 $2\\sqrt{2}$는 두 번(각 정사각형에서 한 번씩)만 빼요.',
        ],
        hint: '두 정사각형의 한 변의 길이를 $a\\sqrt{2}$ 꼴로 먼저 구해요.',
        explain: '작은 정사각형의 한 변은 $\\sqrt{8}=2\\sqrt{2}$ cm, 큰 정사각형의 한 변은 $\\sqrt{18}=3\\sqrt{2}$ cm예요. 두 정사각형의 둘레의 합 $4\\times2\\sqrt{2}+4\\times3\\sqrt{2}=20\\sqrt{2}$에서 맞닿은 부분 $2\\sqrt{2}$를 두 번 빼면 $20\\sqrt{2}-4\\sqrt{2}=16\\sqrt{2}$ (cm)예요.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 1,
        q: '$\\sqrt{2}=a$, $\\sqrt{3}=b$라고 할 때, $\\sqrt{54}$를 $a$, $b$를 사용하여 나타낸 것은 무엇일까요?',
        choices: ['$3ab$', '$9ab$', '$3a^{2}b$', '$ab$'],
        answer: 0,
        why: [
          '',
          '9를 그대로 근호 밖으로 꺼냈어요. 근호 밖으로 나오면 $\\sqrt{9}=3$이에요.',
          '$a^{2}=2$이므로 $3a^{2}b=6\\sqrt{3}$이에요. $\\sqrt{6}$은 $\\sqrt{2}\\times\\sqrt{3}=ab$예요.',
          '$ab=\\sqrt{6}$이에요. $\\sqrt{54}=\\sqrt{9\\times6}$이므로 3을 꺼내야 해요.',
        ],
        hint: '$54=3^{2}\\times6$이고 $\\sqrt{6}=\\sqrt{2}\\times\\sqrt{3}$이에요.',
        explain: '$\\sqrt{54}=\\sqrt{3^{2}\\times6}=3\\sqrt{6}=3\\times\\sqrt{2}\\times\\sqrt{3}=3ab$예요.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 5,
        q: '$\\sqrt{2}=1.414$, $\\sqrt{20}=4.472$일 때, $\\sqrt{0.2}+\\sqrt{200}$의 값을 구해 보세요.',
        answer: '14.5872',
        wrong: [{ a: '14.2814', why: '$\\sqrt{0.2}$를 $\\frac{\\sqrt{2}}{10}$로 계산했어요. $\\frac{\\sqrt{2}}{10}$는 $\\sqrt{0.02}$예요. $0.2=\\frac{20}{100}$이므로 $\\sqrt{0.2}=\\frac{\\sqrt{20}}{10}$이에요.' }],
        hint: '$0.2=\\frac{20}{100}$, $200=100\\times2$로 바꾸어 보세요.',
        explain: '$\\sqrt{0.2}=\\sqrt{\\frac{20}{100}}=\\frac{\\sqrt{20}}{10}=0.4472$, $\\sqrt{200}=10\\sqrt{2}=14.14$이므로 합은 $0.4472+14.14=14.5872$예요.',
      },
    ],

    deeper: [
      {
        title: '$\\sqrt{a}+\\sqrt{b}$는 왜 $\\sqrt{a+b}$가 아닐까?',
        body: '두 식을 제곱해서 비교해 보면 이유가 보여요. $(\\sqrt{a}+\\sqrt{b})^{2}$을 전개하면 $a+2\\sqrt{ab}+b$이고, $(\\sqrt{a+b})^{2}=a+b$예요.\n\n' +
          '$a$, $b$가 양수이면 $2\\sqrt{ab}>0$이므로 언제나 $\\sqrt{a}+\\sqrt{b}>\\sqrt{a+b}$예요. 직각삼각형으로 생각하면 더 쉬워요. 두 변의 길이가 $\\sqrt{a}$, $\\sqrt{b}$인 직각삼각형의 빗변은 피타고라스 정리에 따라 $\\sqrt{a+b}$인데, 삼각형에서 두 변의 길이의 합은 나머지 한 변보다 길지요.\n\n' +
          '곱셈 $\\sqrt{a}\\sqrt{b}=\\sqrt{ab}$는 되지만 덧셈은 안 되는 이유가 여기 있어요. (다음 단원에서 $(\\sqrt{a}+\\sqrt{b})^{2}$ 같은 식을 전개하는 곱셈 공식을 배워요.)',
      },
      {
        title: '분모의 유리화, 다음 단원에서는',
        body: '$\\frac{1}{\\sqrt{2}+1}$처럼 분모가 두 항으로 된 경우에는 $\\sqrt{2}$를 곱하는 것만으로는 근호가 없어지지 않아요.\n\n' +
          '다음 단원에서 배우는 곱셈 공식 $(a+b)(a-b)=a^{2}-b^{2}$을 쓰면 $(\\sqrt{2}+1)(\\sqrt{2}-1)=2-1=1$이 되어 분모의 근호를 없앨 수 있어요.',
      },
    ],

    faq: [
      {
        q: '곱셈은 근호 안끼리 되는데 덧셈은 왜 안 돼요?',
        a: '곱셈은 $(\\sqrt{a}\\sqrt{b})^{2}=ab$라서 $\\sqrt{a}\\sqrt{b}=\\sqrt{ab}$가 성립해요. 덧셈은 제곱하면 $(\\sqrt{a}+\\sqrt{b})^{2}=a+b+2\\sqrt{ab}$처럼 $2\\sqrt{ab}$가 더 생겨서 $\\sqrt{a+b}$와 같지 않아요.\n\n예를 들어 $\\sqrt{9}+\\sqrt{16}=3+4=7$이지만 $\\sqrt{25}=5$예요.',
      },
      {
        q: '분모의 유리화는 꼭 해야 해요?',
        a: '값은 같으니 틀린 답은 아니에요. 하지만 분모를 유리화하면 어림값을 구하거나 다른 식과 더하고 빼기가 훨씬 쉬워져서, 보통 답은 분모를 유리화한 꼴로 써요.\n\n예: $\\frac{1}{\\sqrt{2}}+\\sqrt{2}$는 유리화하면 $\\frac{\\sqrt{2}}{2}+\\sqrt{2}=\\frac{3\\sqrt{2}}{2}$로 바로 정리돼요.',
      },
      {
        q: '$\\sqrt{72}$를 정리할 때 $2\\sqrt{18}$이라고 해도 돼요?',
        a: '값은 같지만 덜 정리된 꼴이에요. 18 안에 아직 제곱인 인수 9가 있으니 한 번 더 꺼내야 해요. $2\\sqrt{18}=2\\times3\\sqrt{2}=6\\sqrt{2}$\n\n처음부터 $72=2^{3}\\times3^{2}=6^{2}\\times2$로 소인수분해하면 한 번에 $6\\sqrt{2}$를 얻어요.',
      },
    ],

    mistakes: [
      '$\\sqrt{2}+\\sqrt{3}=\\sqrt{5}$처럼 덧셈을 근호 안끼리 하는 실수 — 근호 안의 수가 같은 것끼리만 앞의 수를 더해요.',
      '근호 밖의 수를 근호 안에 넣을 때 제곱하지 않는 실수 — $3\\sqrt{2}=\\sqrt{18}$이에요($\\sqrt{6}$이 아니에요).',
      '분모를 유리화할 때 분모만 곱하는 실수 — 분모와 분자에 **같은 수**를 곱해야 값이 그대로예요.',
    ],

    gens: [
      {
        id: 'pull-out',
        level: 1,
        title: '근호 안의 제곱인 인수 꺼내기·넣기',
        make: function (R) {
          var k = R.int(2, 7), c = R.pick([2, 3, 5, 6, 7, 10, 11]), N = k * k * c;
          if (R.bool()) {
            var wrong = [{ a: String(k * k), why: '근호 밖으로 꺼낼 때는 제곱근이 나와요. $\\sqrt{' + (k * k) + '}=' + k + '$' + R.josa(k, '이에요/예요') + '.' }];
            for (var d = 2; d < k; d++) {
              if (k % d === 0) wrong.push({ a: String(d), why: '$\\sqrt{' + N + '}=' + d + '\\sqrt{' + (N / (d * d)) + '}$에서 멈췄어요. 근호 안의 ' + (N / (d * d)) + '에 아직 제곱인 인수가 남아 있어요.' });
            }
            return {
              type: 'short', check: 'number', concept: 1,
              q: '$\\sqrt{' + N + '}=a\\sqrt{' + c + '}$일 때, 자연수 $a$의 값을 구해 보세요.',
              answer: String(k),
              wrong: wrong,
              explain: '$' + N + '=' + k + '^{2}\\times' + c + '$이므로 $\\sqrt{' + N + '}=\\sqrt{' + k + '^{2}\\times' + c + '}=' + k + '\\sqrt{' + c + '}$' + R.josa(c, '이에요/예요') + '. 그래서 $a=' + k + '$' + R.josa(k, '이에요/예요') + '.',
            };
          }
          return {
            type: 'short', check: 'number', concept: 1,
            q: '$' + k + '\\sqrt{' + c + '}=\\sqrt{x}$일 때, 자연수 $x$의 값을 구해 보세요.',
            answer: String(N),
            wrong: [{ a: String(k * c), why: '근호 밖의 ' + k + R.josa(k, '을/를') + ' 제곱하지 않고 그대로 곱했어요. 근호 안으로 넣을 때는 $' + k + '^{2}=' + (k * k) + '$' + R.josa(k * k, '을/를') + ' 곱해요.' }],
            explain: '근호 밖의 양수는 제곱해서 근호 안으로 넣어요. $' + k + '\\sqrt{' + c + '}=\\sqrt{' + k + '^{2}\\times' + c + '}=\\sqrt{' + N + '}$이므로 $x=' + N + '$' + R.josa(N, '이에요/예요') + '.',
          };
        },
      },
      {
        id: 'mul-div',
        level: 1,
        title: '제곱근의 곱셈과 나눗셈',
        make: function (R) {
          var q, k, c, mid, cands = [];
          if (R.bool()) {
            var L = [2, 3, 5, 6, 7, 8, 10, 12, 14, 15, 18, 20, 21];
            var a = 2, b = 6, sp = [2, 3];
            for (var i = 0; i < 60; i++) {
              var a1 = R.pick(L), b1 = R.pick(L), s1 = splitSquare(a1 * b1);
              if (a1 !== b1 && s1[0] >= 2 && s1[1] >= 2) { a = a1; b = b1; sp = s1; break; }
            }
            k = sp[0]; c = sp[1];
            q = '\\sqrt{' + a + '}\\times\\sqrt{' + b + '}';
            mid = '\\sqrt{' + a + '\\times' + b + '}=\\sqrt{' + (a * b) + '}';
            cands.push(['\\sqrt{' + (a + b) + '}', Math.sqrt(a + b), '근호 안끼리 더했어요. 곱셈은 근호 안끼리 곱해요: $\\sqrt{' + a + '\\times' + b + '}$']);
          } else {
            var bb = R.pick([2, 3, 5, 6, 7]);
            k = R.int(2, 5);
            c = R.pick([2, 3, 5, 6, 7].filter(function (x) { return x !== bb; }));   // c = bb 이면 나뉘는 수가 제곱수가 된다
            var aa = bb * k * k * c;
            q = '\\sqrt{' + aa + '}\\div\\sqrt{' + bb + '}';
            mid = '\\sqrt{\\frac{' + aa + '}{' + bb + '}}=\\sqrt{' + (k * k * c) + '}';
            cands.push(['\\sqrt{' + (aa - bb) + '}', Math.sqrt(aa - bb), '나눗셈인데 근호 안끼리 뺐어요. 근호 안끼리 나누어요.']);
            var sq = splitSquare(aa * bb);
            cands.push([surd(sq[0], sq[1]), Math.sqrt(aa * bb), '나눗셈인데 근호 안끼리 곱했어요.']);
          }
          var correct = surd(k, c), cv = k * Math.sqrt(c);
          cands.push([surd(k * k, c), k * k * Math.sqrt(c), '근호 안의 $' + (k * k) + '$' + R.josa(k * k, '을/를') + ' 그대로 꺼냈어요. 근호 밖으로 나오면 $\\sqrt{' + (k * k) + '}=' + k + '$' + R.josa(k, '이에요/예요') + '.']);
          cands.push([surd(k + 1, c), (k + 1) * Math.sqrt(c), '근호 안의 제곱인 인수를 다시 찾아보세요. $' + (k * k * c) + '=' + k + '^{2}\\times' + c + '$' + R.josa(c, '이에요/예요') + '.']);
          cands.push([surd(k - 1, c), (k - 1) * Math.sqrt(c), '근호 안의 제곱인 인수를 다시 찾아보세요. $' + (k * k * c) + '=' + k + '^{2}\\times' + c + '$' + R.josa(c, '이에요/예요') + '.']);
          // 값이 정답과 같거나 서로 같은 후보는 뺀다
          var seen = [cv], wrongs = [], reason = {};
          cands.forEach(function (w) {
            if (seen.some(function (v) { return Math.abs(v - w[1]) < 1e-9; })) return;
            seen.push(w[1]); wrongs.push(w[0]); reason[w[0]] = w[2];
          });
          var pick = R.choices('$' + correct + '$', R.shuffle(wrongs).map(function (t) { return '$' + t + '$'; }));
          return {
            type: 'choice', concept: 0,
            q: '다음을 계산하여 근호 안의 수가 가장 작은 자연수가 되게 나타낸 것은 무엇일까요?\n\n$' + q + '$',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (t, i) { return i === pick.answer ? '' : reason[t.slice(1, -1)] || ''; }),
            explain: '$' + q + '=' + mid + '$이고, $' + (k * k * c) + '=' + k + '^{2}\\times' + c + '$이므로 $\\sqrt{' + (k * k * c) + '}=' + correct + '$' + R.josa(c, '이에요/예요') + '.',
          };
        },
      },
      {
        id: 'rationalize',
        level: 1,
        title: '분모의 유리화',
        make: function (R) {
          var q, correct, explain, cands;
          if (R.bool(0.6)) {
            var n = R.pick([2, 3, 5, 6, 7, 10]), m = R.int(2, 12);
            correct = fracSurd(m, n, n);
            q = '\\frac{' + m + '}{\\sqrt{' + n + '}}';
            var raw = '\\frac{' + m + '\\sqrt{' + n + '}}{' + n + '}';
            explain = '분모와 분자에 $\\sqrt{' + n + '}$' + R.josa(n, '을/를') + ' 곱해요.\n\n$' + q + '=\\frac{' + m + '\\times\\sqrt{' + n + '}}{\\sqrt{' + n + '}\\times\\sqrt{' + n + '}}=' + raw + (raw === correct.tex ? '' : '=' + correct.tex) + '$';
            cands = [
              [surd(m, n), m * Math.sqrt(n), '분모와 분자에 $\\sqrt{' + n + '}$' + R.josa(n, '을/를') + ' 곱하면 분모가 ' + n + R.josa(n, '이/가') + ' 돼요. 분모 ' + n + R.josa(n, '으로/로') + ' 나누는 것을 잊었어요.'],
              [fracSurd(m, 1, n).tex, m / n, '근호를 그냥 지웠어요. 분모와 분자에 같은 $\\sqrt{' + n + '}$' + R.josa(n, '을/를') + ' 곱해야 값이 그대로예요.'],
              ['\\frac{\\sqrt{' + n + '}}{' + m + '}', Math.sqrt(n) / m, '분모와 분자를 바꾸어 썼어요. 분자에 $\\sqrt{' + n + '}$' + R.josa(n, '을/를') + ' 곱해요.'],
              [fracSurd(m, n, n * n).tex, m * Math.sqrt(n) / (n * n), '분모를 $' + n + '^{2}$으로 계산했어요. $\\sqrt{' + n + '}\\times\\sqrt{' + n + '}=' + n + '$' + R.josa(n, '이에요/예요') + '.'],
            ];
          } else {
            var P = [2, 3, 5, 6, 7, 10, 11, 13], a = 2, b = 3;
            for (var i = 0; i < 60; i++) {
              var a1 = R.pick(P), b1 = R.pick(P);
              if (a1 !== b1 && gcd(a1, b1) === 1) { a = a1; b = b1; break; }
            }
            correct = fracSurd(1, a * b, b);
            q = '\\frac{\\sqrt{' + a + '}}{\\sqrt{' + b + '}}';
            explain = '분모와 분자에 $\\sqrt{' + b + '}$' + R.josa(b, '을/를') + ' 곱해요.\n\n$' + q + '=\\frac{\\sqrt{' + a + '}\\times\\sqrt{' + b + '}}{\\sqrt{' + b + '}\\times\\sqrt{' + b + '}}=' + correct.tex + '$';
            cands = [
              ['\\frac{\\sqrt{' + (a * b) + '}}{' + a + '}', Math.sqrt(a * b) / a, '분모에 남는 수는 $\\sqrt{' + b + '}\\times\\sqrt{' + b + '}=' + b + '$' + R.josa(b, '이에요/예요') + '.'],
              ['\\frac{\\sqrt{' + a + '}}{' + b + '}', Math.sqrt(a) / b, '분모에만 $\\sqrt{' + b + '}$' + R.josa(b, '을/를') + ' 곱했어요. 분자에도 똑같이 곱해야 해요.'],
              ['\\sqrt{' + (a * b) + '}', Math.sqrt(a * b), '분모 ' + b + R.josa(b, '을/를') + ' 빠뜨렸어요.'],
              ['\\frac{' + a + '}{' + b + '}', a / b, '근호를 그냥 지웠어요. 근호가 있는 수는 근호를 지우면 값이 달라져요.'],
            ];
          }
          var seen = [correct.val], wrongs = [], reason = {};
          cands.forEach(function (w) {
            if (seen.some(function (v) { return Math.abs(v - w[1]) < 1e-9; })) return;
            seen.push(w[1]); wrongs.push(w[0]); reason[w[0]] = w[2];
          });
          var pick = R.choices('$' + correct.tex + '$', R.shuffle(wrongs).map(function (t) { return '$' + t + '$'; }));
          return {
            type: 'choice', concept: 2,
            q: '다음 수의 분모를 유리화한 것은 무엇일까요?\n\n$' + q + '$',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (t, i) { return i === pick.answer ? '' : reason[t.slice(1, -1)] || ''; }),
            explain: explain,
          };
        },
      },
      {
        id: 'add-sub',
        level: 2,
        title: '제곱근의 덧셈과 뺄셈',
        make: function (R) {
          var c = R.pick([2, 3, 5, 6, 7]);
          var terms = [], K = 0;
          for (var t = 0; t < 50; t++) {
            var ss = R.sample([1, 2, 3, 4, 5], 3);
            terms = ss.map(function (s, i) { return { s: s, m: R.pick([1, 1, 2, 3]), sg: i === 0 ? 1 : R.sign() }; });
            K = terms.reduce(function (acc, x) { return acc + x.sg * x.m * x.s; }, 0);
            if (K !== 0) break;
          }
          if (K === 0) { terms[0].m += 1; K += terms[0].s; }
          var expr = terms.map(function (x, i) {
            return (i === 0 ? '' : (x.sg > 0 ? '+' : '-')) + (x.m > 1 ? x.m : '') + '\\sqrt{' + (x.s * x.s * c) + '}';
          }).join('');
          var simp = terms.filter(function (x) { return x.s > 1; }).map(function (x) {
            return '$' + (x.m > 1 ? x.m : '') + '\\sqrt{' + (x.s * x.s * c) + '}=' + surd(x.m * x.s, c) + '$';
          }).join(', ');
          var coefs = terms.map(function (x, i) { return (i === 0 ? '' : (x.sg > 0 ? '+' : '-')) + (x.m * x.s); }).join('');
          var allPlus = terms.reduce(function (acc, x) { return acc + x.m * x.s; }, 0);
          var noRoot = terms.reduce(function (acc, x) { return acc + x.sg * x.m * x.s * x.s; }, 0);
          var onlyM = terms.reduce(function (acc, x) { return acc + x.sg * x.m; }, 0);
          var wrong = [], seen = {};
          seen[K] = true;
          [[allPlus, '빼기를 더하기로 계산했어요. 각 항의 부호를 다시 확인해 보세요.'],
            [noRoot, '근호 밖으로 꺼낼 때 제곱근을 구하지 않았어요. 예를 들어 $\\sqrt{' + (4 * c) + '}=2\\sqrt{' + c + '}$' + R.josa(c, '이에요/예요') + '.'],
            [onlyM, '근호 안을 정리하지 않고 앞의 수만 계산했어요. 먼저 모든 항을 $a\\sqrt{' + c + '}$ 꼴로 바꾸어요.']].forEach(function (w) {
            if (!seen[w[0]]) { seen[w[0]] = true; wrong.push({ a: String(w[0]), why: w[1] }); }
          });
          return {
            type: 'short', check: 'number', concept: 3,
            q: '다음 식을 $a\\sqrt{' + c + '}$ 꼴로 나타낼 때, 유리수 $a$의 값을 구해 보세요.\n\n$' + expr + '$',
            answer: String(K),
            wrong: wrong,
            hint: '각 항의 근호 안에서 제곱인 인수를 꺼내 $\\sqrt{' + c + '}$ 앞의 수로 만들어 보세요.',
            explain: '각 항을 정리하면 ' + simp + '\n\n그래서 $(' + coefs + ')\\sqrt{' + c + '}=' + surd(K, c) + '$이므로 $a=' + K + '$' + R.josa(K, '이에요/예요') + '.',
          };
        },
      },
    ],
  });
})();
