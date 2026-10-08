/* 대수 · 수열의 합
 * 합의 기호 Σ 의 뜻과 성질(합·차·상수배), 자연수의 거듭제곱의 합 Σk·Σk²·Σk³,
 * 분수 꼴 수열의 합(부분분수로 나누어 더하기), 규칙을 찾아 Σ 로 나타내어 여러 가지 수열의 합을 구한다. */
(function () {
  // 계수 c 와 문자 v 의 한 항 (c=±1 이면 1 생략, first 가 아니면 + 부호를 붙임)
  function lin(c, v, first) {
    var s = c === 1 ? '' : c === -1 ? '-' : String(c);
    if (!first && c > 0) s = '+' + s;
    return s + v;
  }
  function sumK(n) { return n * (n + 1) / 2; }
  function sumK2(n) { return n * (n + 1) * (2 * n + 1) / 6; }

  Tutor.registerUnit({
    id: 'math-h-alg-11',
    course: 'math-h-alg',
    title: '수열의 합',
    summary: '합의 기호 $\\sum$의 뜻과 성질을 알고, 자연수의 거듭제곱의 합과 여러 가지 수열의 합을 구합니다.',
    goals: [
      '합의 기호 $\\sum$의 뜻을 알고, 수열의 합을 $\\sum$로 나타낼 수 있다.',
      '$\\sum$의 성질을 이용하여 수열의 합을 계산할 수 있다.',
      '자연수의 거듭제곱의 합 공식을 이용하여 수열의 합을 구할 수 있다.',
      '분수 꼴 수열의 합을 부분분수로 나누어 구하고, 규칙을 찾아 여러 가지 수열의 합을 구할 수 있다.',
    ],
    standards: ['[12대수03-04]', '[12대수03-05]'],

    concepts: [
      {
        title: '합의 기호 Σ의 뜻',
        body: '수열 $\\{a_n\\}$의 첫째항부터 제$n$항까지의 합 $a_1+a_2+\\cdots+a_n$을 기호 $\\sum$(시그마)를 써서\n\n$\\sum_{k=1}^{n}a_k=a_1+a_2+a_3+\\cdots+a_n$\n\n' +
          '으로 나타냅니다. "$k$에 1부터 $n$까지의 자연수를 차례로 넣은 $a_k$를 모두 더한다"는 뜻입니다. $\\sum$는 합을 뜻하는 영어 Sum의 첫 글자 S에 해당하는 그리스 문자입니다.\n\n' +
          '- 아래의 $k=1$은 **시작**, 위의 $n$은 **끝**입니다. $\\sum_{k=m}^{n}a_k=a_m+a_{m+1}+\\cdots+a_n$의 항의 개수는 $n-m+1$입니다.\n' +
          '- $k$ 대신 $i$, $j$ 같은 다른 문자를 써도 같은 합입니다. $\\sum_{k=1}^{n}a_k=\\sum_{i=1}^{n}a_i$\n\n' +
          '예: $\\sum_{k=1}^{4}(2k+1)=3+5+7+9=24$\n\n' +
          '예: $2+4+8+\\cdots+2^{10}$은 제$k$항이 $2^k$이고 $k=1$부터 $10$까지이므로 $\\sum_{k=1}^{10}2^k$입니다.',
        easy: '$\\sum$는 "더하라"는 명령을 짧게 쓴 것입니다. 아래에는 출발 번호, 위에는 도착 번호, 오른쪽에는 각 번호에서 무엇을 더할지 적습니다.\n\n' +
          '$\\sum_{k=1}^{3}k^2$은 "$k$를 1, 2, 3으로 바꿔 가며 $k^2$을 더하라"이므로 $1+4+9=14$입니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\sum_{k=1}^{4}(3k-1)$의 값을 구하십시오.',
          answer: '26',
          wrong: [{ a: '11', why: '$k=4$일 때의 값 $3\\times4-1$만 구했습니다. $k=1, 2, 3, 4$일 때의 값을 모두 더합니다.' }],
          explain: '$k=1, 2, 3, 4$를 차례로 넣으면 $2+5+8+11=26$입니다.',
        },
      },
      {
        title: 'Σ의 성질',
        body: '$\\sum$는 덧셈을 줄여 쓴 것이므로 덧셈의 성질이 그대로 성립합니다. ($c$는 상수)\n\n' +
          '1. $\\sum_{k=1}^{n}(a_k+b_k)=\\sum_{k=1}^{n}a_k+\\sum_{k=1}^{n}b_k$\n' +
          '2. $\\sum_{k=1}^{n}(a_k-b_k)=\\sum_{k=1}^{n}a_k-\\sum_{k=1}^{n}b_k$\n' +
          '3. $\\sum_{k=1}^{n}ca_k=c\\sum_{k=1}^{n}a_k$\n' +
          '4. $\\sum_{k=1}^{n}c=cn$\n\n' +
          '4번은 $c$를 $n$번 더한 것이기 때문입니다. $\\sum_{k=1}^{10}3=3$이 **아니라** $30$입니다.\n\n' +
          '예: $\\sum_{k=1}^{10}a_k=5$, $\\sum_{k=1}^{10}b_k=2$이면 $\\sum_{k=1}^{10}(3a_k-b_k+2)=15-2+20=33$입니다.\n\n' +
          '> ⚠️ 곱과 거듭제곱은 나누어지지 않습니다. 일반적으로 $\\sum_{k=1}^{n}a_kb_k\\ne\\left(\\sum_{k=1}^{n}a_k\\right)\\left(\\sum_{k=1}^{n}b_k\\right)$이고 $\\sum_{k=1}^{n}a_k^2\\ne\\left(\\sum_{k=1}^{n}a_k\\right)^2$입니다.',
        easy: '여러 봉투에 사과 $a_k$개와 배 $b_k$개가 들어 있다고 하면, 과일 전체 수는 사과끼리 다 세고 배끼리 다 세어 더해도 같습니다. 이것이 1번 성질입니다.\n\n' +
          '봉투마다 귤을 2개씩 더 넣으면, 봉투가 10개일 때 귤은 2개가 아니라 $2\\times10=20$개 늘어납니다. 이것이 4번 성질입니다.',
        check: {
          type: 'choice',
          q: '$\\sum_{k=1}^{20}5$의 값은 무엇입니까?',
          choices: ['$100$', '$5$', '$1050$'],
          answer: 0,
          why: ['', '상수 5를 한 번만 더했습니다. $k=1$부터 $20$까지 20번 더합니다.', '$\\sum_{k=1}^{20}5k$로 계산했습니다. 더하는 것은 $k$가 없는 상수 5입니다.'],
          explain: '$5$를 20번 더하므로 $5\\times20=100$입니다.',
        },
      },
      {
        title: '자연수의 거듭제곱의 합',
        body: '자주 쓰는 세 공식입니다.\n\n' +
          '$\\sum_{k=1}^{n}k=\\frac{n(n+1)}{2}$\n\n$\\sum_{k=1}^{n}k^2=\\frac{n(n+1)(2n+1)}{6}$\n\n$\\sum_{k=1}^{n}k^3=\\left\\{\\frac{n(n+1)}{2}\\right\\}^2$\n\n' +
          '**$\\sum k$** 는 첫째항 1, 공차 1인 등차수열의 합입니다.\n\n' +
          '**$\\sum k^2$의 증명** 항등식 $(k+1)^3-k^3=3k^2+3k+1$에 $k=1, 2, \\cdots, n$을 넣어 변끼리 더하면 왼쪽은 중간이 모두 지워져 $(n+1)^3-1$만 남습니다. 그래서\n\n' +
          '$(n+1)^3-1=3\\sum_{k=1}^{n}k^2+3\\times\\frac{n(n+1)}{2}+n$\n\n이고, 이것을 $\\sum k^2$에 대해 정리하면 위의 공식이 나옵니다.\n\n' +
          '예: $\\sum_{k=1}^{10}k^2=\\frac{10\\times11\\times21}{6}=385$, $\\sum_{k=1}^{5}k^3=15^2=225$\n\n' +
          '> 💡 $\\sum k^3$은 $\\sum k$의 제곱입니다. $1^3+2^3+3^3=36=(1+2+3)^2$',
        easy: '$1+2+\\cdots+n$은 계단 모양으로 쌓은 블록 수입니다. 똑같은 계단을 하나 더 만들어 거꾸로 붙이면 가로 $n+1$, 세로 $n$인 직사각형이 되므로, 계단 하나는 그 절반 $\\frac{n(n+1)}{2}$입니다.\n\n' +
          '$\\sum k^2$, $\\sum k^3$도 이런 식으로 "지워지는 덧셈"을 이용해 얻은 공식이니 결과를 기억해 두고 씁니다.',
        fig: {
          type: 'svg',
          alt: '가로 5칸, 세로 4칸 직사각형을 계단 모양으로 나눈 그림. 한쪽 계단은 1, 2, 3, 4칸이고 나머지 계단도 4, 3, 2, 1칸이다. 그래서 1+2+3+4는 직사각형 4×5의 절반이다',
          svg: '<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">' +
            '<g fill="var(--fig-1)" fill-opacity="0.35" stroke="currentColor" stroke-width="1.5">' +
            '<rect x="30" y="20" width="30" height="30"/>' +
            '<rect x="30" y="50" width="30" height="30"/><rect x="60" y="50" width="30" height="30"/>' +
            '<rect x="30" y="80" width="30" height="30"/><rect x="60" y="80" width="30" height="30"/><rect x="90" y="80" width="30" height="30"/>' +
            '<rect x="30" y="110" width="30" height="30"/><rect x="60" y="110" width="30" height="30"/><rect x="90" y="110" width="30" height="30"/><rect x="120" y="110" width="30" height="30"/></g>' +
            '<g fill="var(--fig-2)" fill-opacity="0.35" stroke="currentColor" stroke-width="1.5">' +
            '<rect x="60" y="20" width="30" height="30"/><rect x="90" y="20" width="30" height="30"/><rect x="120" y="20" width="30" height="30"/><rect x="150" y="20" width="30" height="30"/>' +
            '<rect x="90" y="50" width="30" height="30"/><rect x="120" y="50" width="30" height="30"/><rect x="150" y="50" width="30" height="30"/>' +
            '<rect x="120" y="80" width="30" height="30"/><rect x="150" y="80" width="30" height="30"/>' +
            '<rect x="150" y="110" width="30" height="30"/></g>' +
            '<g fill="currentColor" font-family="sans-serif" font-size="15" text-anchor="middle"><text x="105" y="160">n+1 = 5</text><text x="14" y="85">n</text></g></svg>',
        },
        check: {
          type: 'short', check: 'number',
          q: '$\\sum_{k=1}^{6}k^2$의 값을 구하십시오.',
          answer: '91',
          wrong: [{ a: '441', why: '$\\left(\\sum_{k=1}^{6}k\\right)^2=21^2$을 계산했습니다. 제곱의 합은 합의 제곱과 다릅니다.' }],
          explain: '$\\sum_{k=1}^{6}k^2=\\frac{6\\times7\\times13}{6}=91$입니다. (확인: $1+4+9+16+25+36=91$)',
        },
      },
      {
        title: '분수 꼴 수열의 합 — 부분분수',
        body: '분모가 두 식의 곱인 분수는 두 분수의 **차**로 나눌 수 있습니다(**부분분수**).\n\n' +
          '$\\frac{1}{AB}=\\frac{1}{B-A}\\left(\\frac{1}{A}-\\frac{1}{B}\\right)$ ($A\\ne B$)\n\n' +
          '예: $\\frac{1}{k(k+1)}=\\frac{1}{k}-\\frac{1}{k+1}$\n\n' +
          '이렇게 나누어 늘어놓으면 이웃한 항이 서로 지워집니다.\n\n' +
          '$\\sum_{k=1}^{n}\\frac{1}{k(k+1)}=\\left(1-\\frac{1}{2}\\right)+\\left(\\frac{1}{2}-\\frac{1}{3}\\right)+\\cdots+\\left(\\frac{1}{n}-\\frac{1}{n+1}\\right)=1-\\frac{1}{n+1}=\\frac{n}{n+1}$\n\n' +
          '두 인수의 차가 1이 아니면 앞에 $\\frac{1}{(\\text{차})}$를 곱합니다.\n\n' +
          '$\\frac{1}{(2k-1)(2k+1)}=\\frac{1}{2}\\left(\\frac{1}{2k-1}-\\frac{1}{2k+1}\\right)$\n\n' +
          '근호가 있는 분수는 분모를 유리화하면 같은 방법이 됩니다. $\\frac{1}{\\sqrt{k+1}+\\sqrt{k}}=\\sqrt{k+1}-\\sqrt{k}$\n\n' +
          '> ⚠️ 지워지고 남는 항을 정확히 찾습니다. 앞에서 남는 항과 뒤에서 남는 항의 개수가 같습니다.',
        easy: '$\\frac{1}{2}-\\frac{1}{3}$을 계산하면 $\\frac{1}{6}=\\frac{1}{2\\times3}$입니다. 거꾸로 $\\frac{1}{2\\times3}$을 "빼기 두 개"로 쪼갤 수 있다는 뜻입니다.\n\n' +
          '쪼갠 것을 길게 늘어놓으면 $+\\frac{1}{3}$과 $-\\frac{1}{3}$처럼 짝이 맞는 것이 지워지고 맨 앞과 맨 뒤만 남습니다. 줄줄이 넘어지는 도미노에서 처음과 끝만 남는 것과 비슷합니다.',
        check: {
          type: 'choice',
          q: '$\\frac{1}{k(k+2)}$을 부분분수로 바르게 나타낸 것은 무엇입니까?',
          choices: ['$\\frac{1}{2}\\left(\\frac{1}{k}-\\frac{1}{k+2}\\right)$', '$\\frac{1}{k}-\\frac{1}{k+2}$', '$2\\left(\\frac{1}{k}-\\frac{1}{k+2}\\right)$'],
          answer: 0,
          why: ['', '$\\frac{1}{k}-\\frac{1}{k+2}=\\frac{2}{k(k+2)}$입니다. 두 인수의 차가 2이므로 $\\frac{1}{2}$을 곱합니다.', '차로 나누어야 할 것을 곱했습니다. 통분해서 확인해 보십시오.'],
          explain: '$\\frac{1}{k}-\\frac{1}{k+2}=\\frac{(k+2)-k}{k(k+2)}=\\frac{2}{k(k+2)}$이므로 $\\frac{1}{k(k+2)}=\\frac{1}{2}\\left(\\frac{1}{k}-\\frac{1}{k+2}\\right)$입니다.',
        },
      },
      {
        title: '여러 가지 수열의 합',
        body: '복잡해 보이는 합도 **제$k$항을 $k$에 대한 식으로** 나타내면 $\\sum$의 성질과 공식으로 계산할 수 있습니다.\n\n' +
          '1. 몇 개의 항을 보고 규칙을 찾아 제$k$항 $a_k$를 구합니다.\n2. 마지막 항이 제몇 항인지 정하여 $\\sum_{k=1}^{n}a_k$로 씁니다.\n3. $a_k$를 전개하여 $\\sum k^2$, $\\sum k$, $\\sum 1$로 나누어 계산합니다.\n\n' +
          '예: $1\\times2+2\\times3+3\\times4+\\cdots+10\\times11$은 제$k$항이 $k(k+1)=k^2+k$이므로\n\n' +
          '$\\sum_{k=1}^{10}(k^2+k)=385+55=440$\n\n' +
          '**시작이 1이 아닐 때**는 1부터의 합에서 빼서 구합니다.\n\n' +
          '$\\sum_{k=m}^{n}a_k=\\sum_{k=1}^{n}a_k-\\sum_{k=1}^{m-1}a_k$\n\n' +
          '> ⚠️ 빼는 쪽은 $m$까지가 아니라 **$m-1$까지**입니다. $m$까지 빼면 $a_m$도 빠집니다.',
        easy: '긴 덧셈을 보면 먼저 "몇 번째 수가 어떻게 생겼나"를 찾습니다. $1\\times2$, $2\\times3$, $3\\times4$, …에서 $k$번째 수는 $k\\times(k+1)$입니다.\n\n' +
          '규칙을 식으로 바꾸고 나면, 그다음은 이미 아는 공식을 쓰는 계산입니다.',
        check: {
          type: 'choice',
          q: '$1\\times3+2\\times5+3\\times7+\\cdots$의 제$k$항으로 알맞은 것은 무엇입니까?',
          choices: ['$k(2k+1)$', '$k(k+2)$', '$(2k-1)(2k+1)$'],
          answer: 0,
          why: ['', '$k=2$이면 $2\\times4$라 둘째항 $2\\times5$와 다릅니다.', '$k=1$이면 $1\\times3$으로 맞지만 $k=2$이면 $3\\times5$라 둘째항과 다릅니다.'],
          explain: '앞의 수는 $1, 2, 3, \\cdots$이므로 $k$, 뒤의 수는 $3, 5, 7, \\cdots$이므로 $2k+1$입니다. 제$k$항은 $k(2k+1)$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '$\\sum_{k=1}^{10}(3k^2-2k+1)$의 값을 구하십시오.',
        steps: [
          '$\\sum$의 성질로 나눕니다. $3\\sum_{k=1}^{10}k^2-2\\sum_{k=1}^{10}k+\\sum_{k=1}^{10}1$',
          '$\\sum_{k=1}^{10}k^2=\\frac{10\\times11\\times21}{6}=385$, $\\sum_{k=1}^{10}k=\\frac{10\\times11}{2}=55$, $\\sum_{k=1}^{10}1=10$',
          '$3\\times385-2\\times55+10=1155-110+10=1055$',
        ],
        answer: '$1055$',
      },
      {
        q: '$\\sum_{k=1}^{10}\\frac{1}{(2k-1)(2k+1)}$의 값을 구하십시오.',
        steps: [
          '두 인수의 차가 2이므로 $\\frac{1}{(2k-1)(2k+1)}=\\frac{1}{2}\\left(\\frac{1}{2k-1}-\\frac{1}{2k+1}\\right)$입니다.',
          '늘어놓으면 $\\frac{1}{2}\\left(1-\\frac{1}{3}\\right)+\\frac{1}{2}\\left(\\frac{1}{3}-\\frac{1}{5}\\right)+\\cdots+\\frac{1}{2}\\left(\\frac{1}{19}-\\frac{1}{21}\\right)$',
          '가운데 항이 모두 지워져 $\\frac{1}{2}\\left(1-\\frac{1}{21}\\right)=\\frac{1}{2}\\times\\frac{20}{21}=\\frac{10}{21}$입니다.',
        ],
        answer: '$\\frac{10}{21}$',
      },
      {
        q: '다음 합을 구하십시오.\n\n$1\\times3+2\\times5+3\\times7+\\cdots+10\\times21$',
        steps: [
          '제$k$항은 $k(2k+1)=2k^2+k$이고, $10\\times21$은 $k=10$일 때의 항입니다.',
          '$\\sum_{k=1}^{10}(2k^2+k)=2\\times385+55$',
          '$=770+55=825$',
        ],
        answer: '$825$',
      },
    ],

    terms: [
      { term: '합의 기호 Σ', def: '수열의 합을 나타내는 기호입니다. $\\sum_{k=1}^{n}a_k$는 $a_1+a_2+\\cdots+a_n$을 뜻합니다. "시그마"라고 읽습니다.' },
      { term: '부분분수', def: '분모가 곱으로 된 분수를 분모가 더 간단한 분수의 합이나 차로 나타낸 것입니다. 예: $\\frac{1}{k(k+1)}=\\frac{1}{k}-\\frac{1}{k+1}$' },
      { term: '자연수의 거듭제곱의 합', def: '$\\sum k=\\frac{n(n+1)}{2}$, $\\sum k^2=\\frac{n(n+1)(2n+1)}{6}$, $\\sum k^3=\\left\\{\\frac{n(n+1)}{2}\\right\\}^2$ (모두 $k=1$부터 $n$까지)' },
      { term: '항등식', def: '문자에 어떤 값을 넣어도 항상 성립하는 등식입니다. 예: $(k+1)^2-k^2=2k+1$' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '$\\sum_{k=1}^{4}(k+1)^2$을 $\\sum$ 없이 풀어 쓴 것은 무엇입니까?',
        choices: ['$2^2+3^2+4^2+5^2$', '$1^2+2^2+3^2+4^2$', '$(2+3+4+5)^2$', '$2^2+3^2+4^2$'],
        answer: 0,
        why: [
          '',
          '$k^2$을 풀어 썼습니다. 더하는 식은 $(k+1)^2$이므로 $k=1$일 때 $2^2$입니다.',
          '각 항을 제곱한 뒤 더해야 합니다. 합을 제곱한 것과 다릅니다.',
          '$k=4$일 때의 항 $5^2$을 빠뜨렸습니다. $k=1$부터 $4$까지 네 항입니다.',
        ],
        explain: '$k=1, 2, 3, 4$를 $(k+1)^2$에 넣으면 $2^2, 3^2, 4^2, 5^2$이므로 $2^2+3^2+4^2+5^2$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 0,
        q: '$3+6+9+\\cdots+30$을 $\\sum$를 써서 바르게 나타낸 것은 무엇입니까?',
        choices: ['$\\sum_{k=1}^{10}3k$', '$\\sum_{k=1}^{30}3k$', '$\\sum_{k=3}^{30}k$', '$\\sum_{k=1}^{10}(k+3)$'],
        answer: 0,
        why: [
          '',
          '끝항의 값 30을 끝 번호로 썼습니다. $3k=30$에서 $k=10$까지입니다.',
          '$3+4+5+\\cdots+30$이 되어 3의 배수만 더한 합과 다릅니다.',
          '$4+5+\\cdots+13$이 됩니다. 각 항은 $k$의 3배입니다.',
        ],
        explain: '제$k$항이 $3k$이고 $3k=30$에서 $k=10$이므로 $\\sum_{k=1}^{10}3k$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 0,
        q: '$\\sum_{k=4}^{15}a_k$는 몇 개의 항을 더한 것입니까?',
        answer: '12',
        wrong: [{ a: '11', why: '$15-4$만 계산했습니다. 시작 항도 세어야 하므로 $15-4+1$입니다.' }],
        explain: '$a_4, a_5, \\cdots, a_{15}$이므로 항의 개수는 $15-4+1=12$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', concept: 1,
        q: '$\\sum_{k=1}^{10}a_k=7$, $\\sum_{k=1}^{10}b_k=4$일 때, $\\sum_{k=1}^{10}(2a_k-3b_k+1)$의 값을 구하십시오.',
        answer: '12',
        wrong: [{ a: '3', why: '상수 1을 한 번만 더했습니다. $\\sum_{k=1}^{10}1=10$입니다.' }],
        explain: '$2\\sum_{k=1}^{10}a_k-3\\sum_{k=1}^{10}b_k+\\sum_{k=1}^{10}1=2\\times7-3\\times4+10=12$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'ox', concept: 1,
        q: '모든 수열 $\\{a_n\\}$, $\\{b_n\\}$에 대하여 $\\sum_{k=1}^{n}a_kb_k=\\left(\\sum_{k=1}^{n}a_k\\right)\\left(\\sum_{k=1}^{n}b_k\\right)$가 성립합니다.',
        answer: false,
        explain: '곱은 나누어지지 않습니다. 예를 들어 $a_k=b_k=k$, $n=2$이면 왼쪽은 $1\\times1+2\\times2=5$, 오른쪽은 $(1+2)\\times(1+2)=9$입니다. $\\sum$의 성질은 합·차·상수배에만 성립합니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 2,
        q: '$\\sum_{k=1}^{10}k^2$의 값을 구하십시오.',
        answer: '385',
        wrong: [{ a: '3025', why: '$\\left(\\sum_{k=1}^{10}k\\right)^2=55^2$을 계산했습니다. 제곱의 합 공식은 $\\frac{n(n+1)(2n+1)}{6}$입니다.' }],
        explain: '$\\frac{10\\times11\\times21}{6}=385$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'number', concept: 2,
        q: '$1^3+2^3+3^3+4^3+5^3+6^3$의 값을 구하십시오.',
        answer: '441',
        wrong: [{ a: '91', why: '제곱의 합 $\\sum k^2$ 공식을 썼습니다. 세제곱의 합은 $\\left\\{\\frac{n(n+1)}{2}\\right\\}^2$입니다.' }],
        explain: '$\\sum_{k=1}^{6}k^3=\\left(\\frac{6\\times7}{2}\\right)^2=21^2=441$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 2,
        q: '$\\sum_{k=1}^{10}(k+1)(k-1)$의 값을 구하십시오.',
        answer: '375',
        wrong: [{ a: '384', why: '$\\sum_{k=1}^{10}1$을 1로 계산했습니다. 1을 10번 더하므로 10입니다.' }],
        hint: '먼저 $(k+1)(k-1)$을 전개합니다.',
        explain: '$(k+1)(k-1)=k^2-1$이므로 $\\sum_{k=1}^{10}k^2-\\sum_{k=1}^{10}1=385-10=375$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
        q: '$\\sum_{k=5}^{10}k^2$의 값을 구하십시오.',
        answer: '355',
        wrong: [{ a: '330', why: '$\\sum_{k=1}^{5}k^2$을 뺐습니다. 그러면 $5^2$도 빠집니다. $\\sum_{k=1}^{4}k^2$을 빼야 합니다.' }],
        hint: '1부터 10까지의 합에서 1부터 4까지의 합을 뺍니다.',
        explain: '$\\sum_{k=1}^{10}k^2-\\sum_{k=1}^{4}k^2=385-30=355$입니다.',
      },
      {
        id: 'p10', level: 1, type: 'short', check: 'number', concept: 3,
        q: '$\\sum_{k=1}^{9}\\frac{1}{k(k+1)}$의 값을 구하십시오.',
        answer: '9/10',
        wrong: [{ a: '8/9', why: '마지막에 남는 항을 잘못 찾았습니다. $k=9$일 때의 항은 $\\frac{1}{9}-\\frac{1}{10}$이므로 $-\\frac{1}{10}$이 남습니다.' }],
        explain: '$\\frac{1}{k(k+1)}=\\frac{1}{k}-\\frac{1}{k+1}$이므로 합은 $\\left(1-\\frac{1}{2}\\right)+\\left(\\frac{1}{2}-\\frac{1}{3}\\right)+\\cdots+\\left(\\frac{1}{9}-\\frac{1}{10}\\right)=1-\\frac{1}{10}=\\frac{9}{10}$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 3,
        q: '$\\sum_{k=1}^{24}\\frac{1}{\\sqrt{k+1}+\\sqrt{k}}$의 값을 구하십시오.',
        answer: '4',
        wrong: [{ a: '5', why: '맨 앞에서 남는 $-\\sqrt{1}$을 빠뜨렸습니다.' }],
        hint: '분모를 유리화해 보십시오.',
        explain: '$\\frac{1}{\\sqrt{k+1}+\\sqrt{k}}=\\frac{\\sqrt{k+1}-\\sqrt{k}}{(k+1)-k}=\\sqrt{k+1}-\\sqrt{k}$이므로 합은 $(\\sqrt{2}-\\sqrt{1})+(\\sqrt{3}-\\sqrt{2})+\\cdots+(\\sqrt{25}-\\sqrt{24})=\\sqrt{25}-\\sqrt{1}=5-1=4$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 4,
        q: '다음 합을 구하십시오.\n\n$1\\times2+2\\times3+3\\times4+\\cdots+10\\times11$',
        answer: '440',
        wrong: [{ a: '385', why: '$\\sum k^2$만 계산했습니다. 제$k$항 $k(k+1)=k^2+k$에서 $\\sum k$도 더합니다.' }],
        hint: '제$k$항을 $k$에 대한 식으로 나타냅니다.',
        explain: '제$k$항은 $k(k+1)=k^2+k$이므로 $\\sum_{k=1}^{10}(k^2+k)=385+55=440$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 4,
        q: '다음 합을 구하십시오.\n\n$1+(1+2)+(1+2+3)+\\cdots+(1+2+3+\\cdots+10)$',
        answer: '220',
        wrong: [{ a: '440', why: '제$k$항 $\\frac{k(k+1)}{2}$에서 $\\frac{1}{2}$을 빠뜨렸습니다.' }],
        hint: '괄호 하나하나가 제$k$항입니다. 제$k$항은 $1+2+\\cdots+k$입니다.',
        explain: '제$k$항은 $1+2+\\cdots+k=\\frac{k(k+1)}{2}$이므로 합은 $\\sum_{k=1}^{10}\\frac{k^2+k}{2}=\\frac{1}{2}(385+55)=220$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 3,
        q: '$\\sum_{k=1}^{n}\\frac{1}{(2k-1)(2k+1)}=\\frac{10}{21}$을 만족하는 자연수 $n$의 값을 구하십시오.',
        answer: '10',
        wrong: [{ a: '21', why: '마지막 분모 $2n+1=21$을 $n$으로 착각했습니다. $2n+1=21$에서 $n=10$입니다.' }],
        hint: '먼저 왼쪽 합을 $n$에 대한 식으로 나타냅니다.',
        explain: '$\\sum_{k=1}^{n}\\frac{1}{(2k-1)(2k+1)}=\\frac{1}{2}\\left(1-\\frac{1}{2n+1}\\right)=\\frac{n}{2n+1}$입니다. $\\frac{n}{2n+1}=\\frac{10}{21}$에서 $21n=20n+10$이므로 $n=10$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 1,
        q: '$a_k=2k-1$일 때, $\\sum_{k=1}^{10}a_k^2$의 값을 구하십시오.',
        answer: '1330',
        wrong: [{ a: '10000', why: '$\\left(\\sum_{k=1}^{10}a_k\\right)^2=100^2$을 계산했습니다. 각 항을 제곱한 뒤 더해야 합니다.' }],
        hint: '$a_k^2=(2k-1)^2$을 전개합니다.',
        explain: '$(2k-1)^2=4k^2-4k+1$이므로 $4\\times385-4\\times55+10=1540-220+10=1330$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 4,
        q: '수열 $\\{a_n\\}$의 첫째항부터 제$n$항까지의 합이 $n^2$일 때, $\\sum_{k=1}^{10}ka_k$의 값을 구하십시오.',
        answer: '715',
        wrong: [{ a: '5500', why: '$\\left(\\sum k\\right)\\left(\\sum a_k\\right)=55\\times100$을 계산했습니다. 곱의 합은 합의 곱과 다릅니다.' }],
        hint: '먼저 일반항 $a_n$을 구합니다.',
        explain: '$a_1=1$이고 $n\\ge2$일 때 $a_n=n^2-(n-1)^2=2n-1$이며 $a_1$도 이 식에 맞으므로 $a_k=2k-1$입니다. $\\sum_{k=1}^{10}k(2k-1)=2\\times385-55=715$입니다.',
      },
    ],

    deeper: [
      {
        title: '지워지는 덧셈 — 망원경처럼 접히는 합',
        body: '$\\sum_{k=1}^{n}(f(k+1)-f(k))=f(n+1)-f(1)$처럼 이웃한 항이 지워지는 합을 길게 뽑았다가 접히는 망원경에 빗대어 부르기도 합니다.\n\n' +
          '이 단원의 많은 공식이 이 생각에서 나옵니다. $f(k)=k^2$이면 $(k+1)^2-k^2=2k+1$이므로 $\\sum(2k+1)=(n+1)^2-1$이 되어 $\\sum k$를 얻고, $f(k)=k^3$이면 $\\sum k^2$을 얻습니다. 부분분수의 합도 $f(k)=-\\frac{1}{k}$인 경우입니다.\n\n' +
          '뒤의 과정(미적분)에서 배우는 정적분의 계산도 "잘게 나눈 차이를 모두 더하면 양 끝 값의 차가 된다"는 같은 원리를 씁니다.',
      },
      {
        title: '세제곱의 합이 합의 제곱이 되는 까닭',
        body: '$1^3+2^3+\\cdots+n^3=(1+2+\\cdots+n)^2$은 그림으로도 볼 수 있습니다. 한 변이 $1+2+\\cdots+n$인 정사각형을 ㄱ자 모양 띠로 나누면, $k$번째 띠의 넓이가 정확히 $k^3$이 됩니다.\n\n' +
          '확인: $k$번째 띠는 한 변이 $\\frac{k(k+1)}{2}$인 정사각형에서 한 변이 $\\frac{(k-1)k}{2}$인 정사각형을 뺀 것이므로 넓이는 $\\frac{k^2(k+1)^2-(k-1)^2k^2}{4}=\\frac{k^2\\times4k}{4}=k^3$입니다.',
      },
    ],

    faq: [
      {
        q: '시그마 아래 k는 꼭 k로 써야 해요?',
        a: '아닙니다. $k$는 "몇 번째인지"를 가리키는 이름표일 뿐이라 $i$, $j$ 등 다른 문자를 써도 합은 같습니다. 다만 끝 번호 $n$처럼 이미 다른 뜻으로 쓰는 문자와 겹치지 않게 합니다.',
      },
      {
        q: '상수를 시그마 하면 왜 n배가 돼요?',
        a: '$\\sum_{k=1}^{n}c$는 "$k$가 1부터 $n$까지 바뀌는 동안 매번 $c$를 더하라"는 뜻입니다. $c$에 $k$가 없어서 항이 모두 같을 뿐, 더하는 횟수는 $n$번입니다. 그래서 $c+c+\\cdots+c=cn$입니다.',
      },
      {
        q: '부분분수에서 앞에 곱하는 수는 어떻게 정해요?',
        a: '$\\frac{1}{A}-\\frac{1}{B}$을 통분하면 $\\frac{B-A}{AB}$이므로, $\\frac{1}{AB}$을 만들려면 $\\frac{1}{B-A}$을 곱합니다. 두 인수의 차가 1이면 그대로, 2이면 $\\frac{1}{2}$을 곱합니다. 헷갈리면 통분해서 원래 식이 나오는지 확인하십시오.',
      },
    ],

    mistakes: [
      '$\\sum_{k=1}^{n}c=c$로 계산하는 실수 — 상수도 $n$번 더하므로 $cn$입니다.',
      '$\\sum k^2$을 $\\left(\\sum k\\right)^2$으로 계산하는 실수 — 제곱의 합과 합의 제곱은 다릅니다.',
      '$\\sum_{k=m}^{n}$을 구할 때 $\\sum_{k=1}^{m}$을 빼는 실수 — $m-1$까지의 합을 빼야 $a_m$이 남습니다.',
    ],

    gens: [
      {
        id: 'sigma-linear',
        level: 1,
        title: '일차식의 합 $\\sum(ak+b)$',
        make: function (R) {
          var a = R.nonzero(-5, 6), b = R.int(-6, 8), n = R.int(5, 20);
          var ans = a * sumK(n) + b * n;
          var wrong = [{ a: String(a * n * (n + 1) + b * n), why: '$\\sum k=\\frac{n(n+1)}{2}$에서 2로 나누는 것을 빠뜨렸습니다.' }];
          if (b !== 0) wrong.push({ a: String(a * sumK(n) + b), why: '상수 $' + b + '$' + R.josa(b, '을/를') + ' 한 번만 더했습니다. $\\sum_{k=1}^{' + n + '}' + R.fmt.paren(b) + '=' + b * n + '$입니다.' });
          return {
            type: 'short', check: 'number', concept: 2,
            q: '$\\sum_{k=1}^{' + n + '}(' + R.fmt.poly([a, b], 'k') + ')$의 값을 구하십시오.',
            answer: String(ans),
            wrong: wrong,
            hint: '$\\sum$의 성질로 $\\sum k$와 $\\sum 1$로 나눕니다.',
            explain: '$' + lin(a, '\\sum_{k=1}^{' + n + '}k', true) + (b === 0 ? '' : '+\\sum_{k=1}^{' + n + '}' + R.fmt.paren(b)) + '=' +
              R.fmt.paren(a) + '\\times\\frac{' + n + '\\times' + (n + 1) + '}{2}' + (b === 0 ? '' : '+' + R.fmt.paren(b) + '\\times' + n) + '=' + ans + '$입니다.',
          };
        },
      },
      {
        id: 'sigma-props',
        level: 1,
        title: 'Σ의 성질로 계산하기',
        make: function (R) {
          var n = R.pick([10, 15, 20]), P = R.nonzero(-10, 20), Q = R.nonzero(-10, 20);
          var p = R.nonzero(-4, 4), q = R.nonzero(-4, 4), c = R.nonzero(-5, 5);
          var ans = p * P + q * Q + c * n;
          var S = '\\sum_{k=1}^{' + n + '}';
          var inner = lin(p, 'a_k', true) + lin(q, 'b_k', false) + R.fmt.signed(c);
          return {
            type: 'short', check: 'number', concept: 1,
            q: '$' + S + 'a_k=' + P + '$, $' + S + 'b_k=' + Q + '$일 때, $' + S + '(' + inner + ')$의 값을 구하십시오.',
            answer: String(ans),
            wrong: [{ a: String(p * P + q * Q + c), why: '상수 $' + c + '$' + R.josa(c, '을/를') + ' 한 번만 더했습니다. $' + S + R.fmt.paren(c) + '=' + c * n + '$입니다.' }],
            hint: '$\\sum_{k=1}^{n}c=cn$',
            explain: '$' + lin(p, S + 'a_k', true) + lin(q, S + 'b_k', false) + '+' + S + R.fmt.paren(c) + '=' + R.fmt.paren(p) + '\\times' + R.fmt.paren(P) + '+' + R.fmt.paren(q) + '\\times' + R.fmt.paren(Q) + '+' + R.fmt.paren(c) + '\\times' + n + '=' + ans + '$입니다.',
          };
        },
      },
      {
        id: 'sigma-poly',
        level: 2,
        title: '이차식의 합 $\\sum(ak^2+bk+c)$',
        make: function (R) {
          var a = R.nonzero(-3, 4), b = R.int(-5, 5), c = R.int(-4, 4), n = R.int(5, 10);
          var s1 = sumK(n), s2 = sumK2(n);
          var ans = a * s2 + b * s1 + c * n;
          var wrong = [{ a: String(a * s1 * s1 + b * s1 + c * n), why: '제곱의 합 대신 합의 제곱(' + s1 + '의 제곱)을 썼습니다. 제곱의 합은 $\\sum_{k=1}^{' + n + '}k^2=' + s2 + '$입니다.' }];
          if (c !== 0) wrong.push({ a: String(a * s2 + b * s1 + c), why: '상수 $' + c + '$' + R.josa(c, '을/를') + ' 한 번만 더했습니다. $' + n + '$번 더해야 합니다.' });
          var poly = R.fmt.poly([a, b, c], 'k');
          return {
            type: 'short', check: 'number', concept: 2,
            q: '$\\sum_{k=1}^{' + n + '}(' + poly + ')$의 값을 구하십시오.',
            answer: String(ans),
            wrong: wrong,
            hint: '$\\sum k^2=\\frac{n(n+1)(2n+1)}{6}$, $\\sum k=\\frac{n(n+1)}{2}$',
            explain: '$\\sum_{k=1}^{' + n + '}k^2=\\frac{' + n + '\\times' + (n + 1) + '\\times' + (2 * n + 1) + '}{6}=' + s2 + '$, $\\sum_{k=1}^{' + n + '}k=' + s1 + '$이므로\n\n' +
              '$' + R.fmt.paren(a) + '\\times' + s2 + (b === 0 ? '' : '+' + R.fmt.paren(b) + '\\times' + s1) + (c === 0 ? '' : '+' + R.fmt.paren(c) + '\\times' + n) + '=' + ans + '$입니다.',
          };
        },
      },
      {
        id: 'telescoping',
        level: 2,
        title: '부분분수로 분수 꼴 수열의 합 구하기',
        make: function (R) {
          var type = R.pick(['A', 'B', 'C', 'D']), n = R.int(5, 20);
          var F = R.F, ans, wrong, term, explain;
          function fr(x) { return R.fmt.frac(x); }
          if (type === 'A') {
            term = '\\frac{1}{k(k+1)}';
            ans = F(n, n + 1);
            wrong = [{ a: F(n - 1, n).toString(), why: '마지막에 남는 항을 잘못 찾았습니다. $k=' + n + '$일 때의 항에서 $-\\frac{1}{' + (n + 1) + '}$이 남습니다.' }];
            explain = '$\\frac{1}{k(k+1)}=\\frac{1}{k}-\\frac{1}{k+1}$이므로\n\n$\\left(1-\\frac{1}{2}\\right)+\\left(\\frac{1}{2}-\\frac{1}{3}\\right)+\\cdots+\\left(\\frac{1}{' + n + '}-\\frac{1}{' + (n + 1) + '}\\right)=1-\\frac{1}{' + (n + 1) + '}=' + fr(ans) + '$입니다.';
          } else if (type === 'B') {
            term = '\\frac{1}{(2k-1)(2k+1)}';
            ans = F(n, 2 * n + 1);
            wrong = [{ a: F(2 * n, 2 * n + 1).toString(), why: '두 인수의 차가 2이므로 앞에 $\\frac{1}{2}$을 곱해야 합니다.' }];
            explain = '$\\frac{1}{(2k-1)(2k+1)}=\\frac{1}{2}\\left(\\frac{1}{2k-1}-\\frac{1}{2k+1}\\right)$이므로\n\n$\\frac{1}{2}\\left\\{\\left(1-\\frac{1}{3}\\right)+\\left(\\frac{1}{3}-\\frac{1}{5}\\right)+\\cdots+\\left(\\frac{1}{' + (2 * n - 1) + '}-\\frac{1}{' + (2 * n + 1) + '}\\right)\\right\\}=\\frac{1}{2}\\left(1-\\frac{1}{' + (2 * n + 1) + '}\\right)=' + fr(ans) + '$입니다.';
          } else if (type === 'C') {
            term = '\\frac{1}{k(k+2)}';
            var inside = F(3, 2).sub(F(1, n + 1)).sub(F(1, n + 2));
            ans = inside.div(2);
            wrong = [
              { a: inside.toString(), why: '두 인수의 차가 2이므로 앞에 $\\frac{1}{2}$을 곱해야 합니다.' },
              { a: F(1, 2).mul(F(1).sub(F(1, n + 2))).toString(), why: '남는 항을 덜 찾았습니다. 앞에서 $1$과 $\\frac{1}{2}$, 뒤에서 $\\frac{1}{' + (n + 1) + '}$과 $\\frac{1}{' + (n + 2) + '}$이 남습니다.' },
            ];
            explain = '$\\frac{1}{k(k+2)}=\\frac{1}{2}\\left(\\frac{1}{k}-\\frac{1}{k+2}\\right)$입니다. 늘어놓으면 한 칸씩 건너 지워지므로 앞에서 $1$, $\\frac{1}{2}$이 남고 뒤에서 $\\frac{1}{' + (n + 1) + '}$, $\\frac{1}{' + (n + 2) + '}$이 남습니다.\n\n' +
              '$\\frac{1}{2}\\left(1+\\frac{1}{2}-\\frac{1}{' + (n + 1) + '}-\\frac{1}{' + (n + 2) + '}\\right)=' + fr(ans) + '$입니다.';
          } else {
            term = '\\frac{1}{(k+1)(k+2)}';
            ans = F(1, 2).sub(F(1, n + 2));
            wrong = [{ a: F(1).sub(F(1, n + 2)).toString(), why: '첫 항을 $1$로 보았습니다. $k=1$일 때의 항은 $\\frac{1}{2}-\\frac{1}{3}$입니다.' }];
            explain = '$\\frac{1}{(k+1)(k+2)}=\\frac{1}{k+1}-\\frac{1}{k+2}$이므로\n\n$\\left(\\frac{1}{2}-\\frac{1}{3}\\right)+\\left(\\frac{1}{3}-\\frac{1}{4}\\right)+\\cdots+\\left(\\frac{1}{' + (n + 1) + '}-\\frac{1}{' + (n + 2) + '}\\right)=\\frac{1}{2}-\\frac{1}{' + (n + 2) + '}=' + fr(ans) + '$입니다.';
          }
          return {
            type: 'short', check: 'number', concept: 3,
            q: '$\\sum_{k=1}^{' + n + '}' + term + '$의 값을 구하십시오.',
            answer: ans.toString(),
            wrong: wrong,
            hint: '분수를 두 분수의 차로 나누어 늘어놓으면 이웃한 항이 지워집니다.',
            explain: explain,
          };
        },
      },
    ],
  });
})();
