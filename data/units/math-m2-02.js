/* 중2 수학 · 식의 계산
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy) */
Tutor.registerUnit({
  id: 'math-m2-02',
  course: 'math-m2',
  title: '식의 계산',
  summary: '지수법칙으로 단항식을 곱하고 나누며, 다항식의 덧셈과 뺄셈, 단항식과 다항식의 곱셈과 나눗셈을 해요.',
  goals: [
    '지수법칙을 이해하고 거듭제곱을 간단히 할 수 있어요.',
    '단항식끼리 곱하고 나눌 수 있어요.',
    '이차식을 포함한 다항식의 덧셈과 뺄셈을 할 수 있어요.',
    '(단항식)×(다항식), (다항식)÷(단항식)을 계산할 수 있어요.',
  ],
  standards: ['[9수02-08]', '[9수02-09]', '[9수02-10]'],

  concepts: [
    {
      title: '지수법칙 ① 거듭제곱의 곱셈, 거듭제곱의 거듭제곱',
      body: '같은 수를 여러 번 곱한 것을 **거듭제곱**으로 나타내요. $a^{3}$에서 $a$를 **밑**, 3을 **지수**라고 해요. 지수는 "몇 번 곱했는지"예요.\n\n' +
        '**밑이 같은 거듭제곱의 곱셈**: 곱한 개수를 모두 세면 되니까 **지수끼리 더해요.**\n\n' +
        '$a^{2}\\times a^{3}=(a\\times a)\\times(a\\times a\\times a)=a^{5}$ $\\quad$ 곧 $a^m\\times a^n=a^{m+n}$\n\n' +
        '**거듭제곱의 거듭제곱**: 같은 묶음을 여러 번 곱하는 것이니 **지수끼리 곱해요.**\n\n' +
        '$(a^{2})^{3}=a^{2}\\times a^{2}\\times a^{2}=a^{2+2+2}=a^{6}$ $\\quad$ 곧 $(a^m)^n=a^{mn}$\n\n' +
        '(단, $m$, $n$은 자연수)\n\n' +
        '> ⚠️ $a^{2}\\times a^{3}$을 $a^{6}$으로 쓰지 않아요(곱셈은 지수의 **합**). 또 밑이 다르면 지수법칙을 쓸 수 없어요. $a^{2}\\times b^{3}$은 그대로 $a^{2}b^{3}$이에요.',
      easy: '$a^{2}$은 "$a$ 카드 2장", $a^{3}$은 "$a$ 카드 3장"이라고 생각해 보세요.\n\n' +
        '- $a^{2}\\times a^{3}$: 카드 2장과 3장을 한데 모으면 5장 → $a^{5}$\n' +
        '- $(a^{2})^{3}$: "$a$ 카드 2장짜리 묶음"을 3묶음 → $2\\times3=6$장 → $a^{6}$\n\n' +
        '모으면 더하기, 묶음을 여러 번 쓰면 곱하기예요.',
      check: {
        type: 'choice',
        q: '$x^{4}\\times x^{3}$을 간단히 한 것은 무엇일까요?',
        choices: ['$x^{7}$', '$x^{12}$', '$2x^{7}$'],
        answer: 0,
        why: ['', '지수끼리 곱했어요. 밑이 같은 거듭제곱의 곱셈은 지수끼리 **더해요**.', '계수 2가 생기지 않아요. $x$를 모두 7번 곱한 것이니 $x^{7}$이에요.'],
        explain: '$x$를 4번 곱한 것과 3번 곱한 것을 곱하면 모두 7번 곱한 것이에요. $x^{4}\\times x^{3}=x^{4+3}=x^{7}$',
      },
    },
    {
      title: '지수법칙 ② 거듭제곱의 나눗셈',
      body: '밑이 같은 거듭제곱의 나눗셈은 분수로 쓰고 **약분**해 보면 규칙이 보여요. ($a\\ne0$)\n\n' +
        '$a^{5}\\div a^{2}=\\frac{a\\times a\\times a\\times a\\times a}{a\\times a}=a^{3}$\n\n' +
        '약분하고 남은 개수만큼 거듭제곱이 남으므로 **지수끼리 빼요.** 어느 쪽에 남느냐에 따라 세 가지예요.\n\n' +
        '| 경우 | 결과 | 예 |\n|---|---|---|\n' +
        '| $m>n$ | $a^m\\div a^n=a^{m-n}$ | $a^{5}\\div a^{2}=a^{3}$ |\n' +
        '| $m=n$ | $a^m\\div a^n=1$ | $a^{3}\\div a^{3}=1$ |\n' +
        '| $m<n$ | $a^m\\div a^n=\\frac{1}{a^{n-m}}$ | $a^{2}\\div a^{5}=\\frac{1}{a^{3}}$ |\n\n' +
        '> ⚠️ $a^{3}\\div a^{3}$은 0이 아니라 **1**이에요. 같은 수로 나누면 1이니까요. 또 $a^{6}\\div a^{2}$을 $a^{3}$으로 쓰지 않아요(나눗셈은 지수의 **차**).',
      easy: '나눗셈은 "위아래에서 똑같은 $a$를 하나씩 지우기"예요.\n\n' +
        '$a^{5}\\div a^{2}$이면 위에 $a$가 5개, 아래에 2개 있어요. 2쌍을 지우면 위에 3개가 남아 $a^{3}$이에요. 위아래 개수가 같으면 모두 지워지고 1이 남고, 아래가 더 많으면 아래에 남아서 $\\frac{1}{a^{\\square}}$ 꼴이 돼요.',
      check: {
        type: 'ox',
        q: '$x^{6}\\div x^{2}=x^{3}$이에요.',
        answer: false,
        explain: '거듭제곱의 나눗셈은 지수끼리 **빼요**. $x^{6}\\div x^{2}=x^{6-2}=x^{4}$이에요. 지수를 나누면 안 돼요.',
      },
    },
    {
      title: '지수법칙 ③ 곱과 몫의 거듭제곱',
      body: '**곱의 거듭제곱**: 괄호 안의 곱을 통째로 여러 번 곱하면 각각을 여러 번 곱한 것과 같아요.\n\n' +
        '$(ab)^{3}=ab\\times ab\\times ab=a^{3}b^{3}$ $\\quad$ 곧 $(ab)^n=a^nb^n$\n\n' +
        '**몫의 거듭제곱**: $\\left(\\frac{a}{b}\\right)^n=\\frac{a^n}{b^n}$ (단, $b\\ne0$)\n\n' +
        '계수와 부호도 **모두** 거듭제곱해요.\n\n' +
        '- $(2x)^{3}=2^{3}x^{3}=8x^{3}$\n' +
        '- $(-3a^{2})^{2}=(-3)^{2}(a^{2})^{2}=9a^{4}$\n' +
        '- $(-2xy^{2})^{3}=(-2)^{3}x^{3}(y^{2})^{3}=-8x^{3}y^{6}$\n' +
        '- $\\left(\\frac{x}{3}\\right)^{2}=\\frac{x^{2}}{9}$\n\n' +
        '> 💡 음수를 짝수 번 곱하면 양수, 홀수 번 곱하면 음수예요. 그래서 $(-1)^{\\text{짝수}}=1$, $(-1)^{\\text{홀수}}=-1$이에요.',
      easy: '$(2x)^{3}$은 "$2x$를 세 번 곱한 것"이에요. 풀어 쓰면 $2x\\times2x\\times2x$이고, 수는 수끼리 $2\\times2\\times2=8$, 문자는 문자끼리 $x\\times x\\times x=x^{3}$이에요. 그래서 $8x^{3}$이에요.\n\n' +
        '괄호 밖 지수는 괄호 안의 **모든 것**(수, 부호, 문자)에게 똑같이 배달돼요.',
      check: {
        type: 'choice',
        q: '$(-2x^{3})^{2}$을 간단히 한 것은 무엇일까요?',
        choices: ['$4x^{6}$', '$-4x^{6}$', '$4x^{5}$'],
        answer: 0,
        why: ['', '$(-2)^{2}=(-2)\\times(-2)=4$로 양수예요. 음수를 짝수 번 곱하면 양수예요.', '$(x^{3})^{2}$은 지수끼리 곱해서 $x^{6}$이에요. 지수끼리 더하면 안 돼요.'],
        explain: '계수와 문자를 모두 제곱해요. $(-2)^{2}=4$, $(x^{3})^{2}=x^{6}$이므로 $4x^{6}$이에요.',
      },
    },
    {
      title: '단항식의 곱셈과 나눗셈',
      body: '**단항식의 곱셈**: 계수는 계수끼리, 문자는 문자끼리 곱해요. 같은 문자의 곱은 지수법칙으로 정리해요.\n\n' +
        '$3x^{2}\\times(-4xy)=\\{3\\times(-4)\\}\\times(x^{2}\\times x)\\times y=-12x^{3}y$\n\n' +
        '**단항식의 나눗셈**: 두 가지 방법이 있어요.\n\n' +
        '1. 분수 꼴로 고쳐 약분해요. $12a^{3}b^{2}\\div4ab=\\frac{12a^{3}b^{2}}{4ab}=3a^{2}b$\n' +
        '2. 나누는 식의 **역수를 곱해요.** 계수가 분수일 때 편해요. $6x^{2}\\div\\frac{2}{3}x=6x^{2}\\times\\frac{3}{2x}=9x$\n\n' +
        '곱셈과 나눗셈이 섞여 있으면 **앞에서부터 차례로** 계산하거나, 나눗셈을 역수의 곱셈으로 바꿔 한꺼번에 계산해요.\n\n' +
        '$4a^{2}\\times3b\\div6ab=4a^{2}\\times3b\\times\\frac{1}{6ab}=2a$\n\n' +
        '> ⚠️ $\\frac{2}{3}x$의 역수는 $\\frac{3}{2}x$가 아니라 $\\frac{3}{2x}$이에요. $x$도 분모로 가요.',
      easy: '단항식의 곱셈은 "같은 종류끼리 모으기"예요. 수는 수끼리, $x$는 $x$끼리, $y$는 $y$끼리 모아서 계산해요.\n\n' +
        '나눗셈은 분수로 쓰면 쉬워요. 위아래에 같은 것이 있으면 지우면 되니까요. $\\frac{12a^{3}b^{2}}{4ab}$에서 12와 4는 약분해 3, $a$는 하나 지워 $a^{2}$, $b$도 하나 지워 $b$가 남아요.',
      check: {
        type: 'choice',
        q: '$10a^{3}b\\div5ab$를 간단히 한 것은 무엇일까요?',
        choices: ['$2a^{2}$', '$2a^{3}$', '$50a^{4}b^{2}$'],
        answer: 0,
        why: ['', '$a^{3}\\div a=a^{2}$이에요. 나누는 식의 $a$도 약분해야 해요.', '나누지 않고 곱했어요. 나눗셈은 분수 꼴로 고쳐 약분해요.'],
        explain: '$\\frac{10a^{3}b}{5ab}$에서 $10\\div5=2$, $a^{3}\\div a=a^{2}$, $b\\div b=1$이므로 $2a^{2}$이에요.',
      },
    },
    {
      title: '다항식의 덧셈과 뺄셈',
      body: '다항식의 덧셈과 뺄셈은 괄호를 풀고 **동류항끼리** 모아 계산해요. **동류항**은 문자와 차수가 같은 항이에요.\n\n' +
        '$(2x+3y)-(x-4y)=2x+3y-x+4y=x+7y$\n\n' +
        '빼는 식의 괄호 앞에 $-$가 있으면 괄호 안 **모든 항의 부호**를 바꾸어 풀어요.\n\n' +
        '**이차식**은 차수가 가장 큰 항의 차수가 2인 다항식이에요. 예: $3x^{2}-x+5$\n\n' +
        '$(x^{2}+2x-1)-(3x^{2}-x+4)=x^{2}+2x-1-3x^{2}+x-4=-2x^{2}+3x-5$\n\n' +
        '괄호가 여러 겹이면 소괄호 ( ) → 중괄호 { } → 대괄호 [ ] 순서로, 안쪽부터 풀어요.\n\n' +
        '> ⚠️ $x^{2}$과 $x$는 문자는 같지만 차수가 달라서 동류항이 아니에요. $3x^{2}+2x$는 더 간단히 할 수 없어요.',
      easy: '동류항은 "같은 종류의 물건"이에요. 사과($x$) 2개와 배($y$) 3개가 든 바구니에서 사과 1개를 빼고 배 4개를 더 넣는다고 생각해 보세요. 사과는 사과끼리, 배는 배끼리 셈해요.\n\n' +
        '$x^{2}$과 $x$는 이름은 비슷해도 다른 물건(상자와 낱개)이라 섞어서 셀 수 없어요.\n\n' +
        '괄호 앞의 빼기는 "괄호 안 것을 모두 반대로"라고 기억하세요.',
      check: {
        type: 'ox',
        q: '$(3x-y)-(x-2y)=2x-3y$예요.',
        answer: false,
        explain: '괄호 앞이 $-$이므로 $-2y$의 부호도 바뀌어 $+2y$가 돼요. $3x-y-x+2y=2x+y$예요.',
      },
    },
    {
      title: '단항식과 다항식의 곱셈과 나눗셈',
      body: '**(단항식)×(다항식)**은 **분배법칙**으로 단항식을 다항식의 각 항에 곱해요.\n\n' +
        '$2a(3a-b+1)=2a\\times3a+2a\\times(-b)+2a\\times1=6a^{2}-2ab+2a$\n\n' +
        '이렇게 괄호를 풀어 하나의 다항식으로 나타내는 것을 **전개**한다고 하고, 전개하여 얻은 다항식을 **전개식**이라고 해요.\n\n' +
        '**(다항식)÷(단항식)**은 다항식의 **각 항을** 단항식으로 나누어요. 분수 꼴로 고치거나, 역수를 곱해요.\n\n' +
        '$(8x^{2}y-4xy)\\div2x=\\frac{8x^{2}y}{2x}-\\frac{4xy}{2x}=4xy-2y$\n\n' +
        '$(6a^{2}-3a)\\div\\frac{3}{2}a=(6a^{2}-3a)\\times\\frac{2}{3a}=4a-2$\n\n' +
        '> ⚠️ 분배할 때 **모든 항**에 곱하고(나누고), 부호까지 함께 곱해요. $-x(x-3)=-x^{2}+3x$예요.',
      easy: '분배법칙은 "선물을 모든 친구에게 하나씩 나눠 주기"예요. $2a(3a-b+1)$이면 $2a$가 $3a$, $-b$, $1$에게 빠짐없이 한 번씩 곱해져요. 마지막 항 1을 빼먹기 쉬우니 항의 개수만큼 곱했는지 세어 보세요.\n\n' +
        '나눗셈도 마찬가지로 모든 항을 하나씩 나눠요.',
      check: {
        type: 'choice',
        q: '$-3x(2x-5)$를 전개한 것은 무엇일까요?',
        choices: ['$-6x^{2}+15x$', '$-6x^{2}-15x$', '$-6x^{2}-5$'],
        answer: 0,
        why: ['', '$(-3x)\\times(-5)=+15x$예요. 음수끼리 곱하면 양수예요.', '$-5$에도 $-3x$를 곱해야 해요. 분배법칙은 모든 항에 곱해요.'],
        explain: '$-3x\\times2x=-6x^{2}$, $-3x\\times(-5)=15x$이므로 $-6x^{2}+15x$예요.',
      },
    },
  ],

  examples: [
    {
      q: '간단히 하세요.\n\n$(-2x^{2}y)^{3}\\times3xy^{2}\\div6x^{5}y^{4}$',
      steps: [
        '거듭제곱부터 계산해요. $(-2x^{2}y)^{3}=(-2)^{3}(x^{2})^{3}y^{3}=-8x^{6}y^{3}$',
        '나눗셈을 역수의 곱셈으로 바꿔요. $-8x^{6}y^{3}\\times3xy^{2}\\times\\frac{1}{6x^{5}y^{4}}$',
        '계수끼리: $-8\\times3\\div6=-4$',
        '문자끼리: $x^{6+1-5}=x^{2}$, $y^{3+2-4}=y$',
      ],
      answer: '$-4x^{2}y$',
    },
    {
      q: '간단히 하세요.\n\n$3x(x-2y)-(6x^{2}y-9xy^{2})\\div3y$',
      steps: [
        '곱셈과 나눗셈을 먼저 해요. $3x(x-2y)=3x^{2}-6xy$',
        '$(6x^{2}y-9xy^{2})\\div3y=\\frac{6x^{2}y}{3y}-\\frac{9xy^{2}}{3y}=2x^{2}-3xy$',
        '빼기 앞의 괄호를 풀면 부호가 바뀌어요. $3x^{2}-6xy-(2x^{2}-3xy)=3x^{2}-6xy-2x^{2}+3xy$',
        '동류항끼리 정리하면 $x^{2}-3xy$',
      ],
      answer: '$x^{2}-3xy$',
    },
  ],

  terms: [
    { term: '지수법칙', def: '거듭제곱의 곱셈·나눗셈·거듭제곱을 간단히 하는 규칙이에요. 예: $a^m\\times a^n=a^{m+n}$, $(a^m)^n=a^{mn}$' },
    { term: '밑과 지수', def: '$a^n$에서 여러 번 곱하는 수 $a$를 밑, 곱한 횟수 $n$을 지수라고 해요.' },
    { term: '단항식', def: '수나 문자의 곱으로만 이루어진 식이에요. 예: $-3x^{2}y$, $5$' },
    { term: '다항식', def: '하나 또는 여러 개의 단항식의 합으로 이루어진 식이에요. 예: $2x^{2}-x+3$' },
    { term: '동류항', def: '문자와 차수가 각각 같은 항이에요. $3xy$와 $-xy$는 동류항이지만 $x^{2}$과 $x$는 동류항이 아니에요.' },
    { term: '이차식', def: '차수가 가장 큰 항의 차수가 2인 다항식이에요. 예: $x^{2}-5x+6$' },
    { term: '전개', def: '분배법칙 등을 써서 괄호를 풀어 하나의 다항식으로 나타내는 것이에요. 그 결과를 전개식이라고 해요.' },
    { term: '역수', def: '곱해서 1이 되는 수나 식이에요. $\\frac{2}{3}x$의 역수는 $\\frac{3}{2x}$이에요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
      q: '$\\square$ 안에 알맞은 수를 구해 보세요.\n\n$a^{3}\\times a^{4}\\times a=a^{\\square}$',
      answer: '8',
      wrong: [
        { a: '12', why: '지수끼리 곱했어요. 밑이 같은 거듭제곱의 곱셈은 지수끼리 더해요.' },
        { a: '7', why: '마지막 $a$를 빠뜨렸어요. $a$는 $a^{1}$이라서 지수 1을 더해야 해요.' },
      ],
      explain: '$a=a^{1}$이므로 지수끼리 더하면 $3+4+1=8$이에요. 따라서 $a^{3}\\times a^{4}\\times a=a^{8}$이에요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '$(x^{2})^{5}$을 간단히 한 것은 무엇일까요?',
      choices: ['$x^{10}$', '$x^{7}$', '$x^{25}$', '$5x^{2}$'],
      answer: 0,
      why: [
        '',
        '지수끼리 더했어요. 거듭제곱의 거듭제곱은 지수끼리 곱해요.',
        '$5^{2}$을 계산했어요. $(x^{2})^{5}$은 $x^{2}$을 5번 곱한 것이라 $2\\times5$예요.',
        '괄호 밖 지수 5를 계수처럼 곱했어요. 5는 $x^{2}$을 5번 곱한다는 뜻이에요.',
      ],
      explain: '$(x^{2})^{5}=x^{2}\\times x^{2}\\times x^{2}\\times x^{2}\\times x^{2}=x^{2\\times5}=x^{10}$이에요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '$x^{3}\\div x^{7}$을 간단히 한 것은 무엇일까요? (단, $x\\ne0$)',
      choices: ['$\\frac{1}{x^{4}}$', '$x^{4}$', '$\\frac{1}{x^{10}}$'],
      answer: 0,
      why: [
        '',
        '나누는 쪽의 지수가 더 커서 약분하면 분모에 $x$가 남아요.',
        '지수끼리 더했어요. 나눗셈은 지수끼리 빼요.',
      ],
      explain: '분모의 $x$가 7개, 분자의 $x$가 3개이므로 약분하면 분모에 $x$가 4개 남아요. $x^{3}\\div x^{7}=\\frac{1}{x^{7-3}}=\\frac{1}{x^{4}}$이에요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: '$a^{5}\\div a^{5}=0$이에요. (단, $a\\ne0$)',
      answer: false,
      explain: '0이 아닌 같은 식으로 나누면 1이에요. $a^{5}\\div a^{5}=\\frac{a^{5}}{a^{5}}=1$이에요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '$\\left(\\frac{y^{2}}{3}\\right)^{3}$을 간단히 한 것은 무엇일까요?',
      choices: ['$\\frac{y^{6}}{27}$', '$\\frac{y^{6}}{3}$', '$\\frac{y^{5}}{27}$', '$\\frac{y^{6}}{9}$'],
      answer: 0,
      why: [
        '',
        '분모 3도 세제곱해야 해요. $3^{3}=27$이에요.',
        '$(y^{2})^{3}$은 지수끼리 곱해서 $y^{6}$이에요.',
        '$3^{3}$을 $3\\times3$으로 계산했어요. $3\\times3\\times3=27$이에요.',
      ],
      explain: '분자와 분모를 각각 세제곱해요. $(y^{2})^{3}=y^{6}$, $3^{3}=27$이므로 $\\frac{y^{6}}{27}$이에요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '$2a^{2}b\\times(-5ab^{3})$을 간단히 한 것은 무엇일까요?',
      choices: ['$-10a^{3}b^{4}$', '$-10a^{2}b^{3}$', '$-3a^{3}b^{4}$', '$10a^{3}b^{4}$'],
      answer: 0,
      why: [
        '',
        '같은 문자끼리 곱할 때 지수를 더해야 해요. $a^{2}\\times a=a^{3}$, $b\\times b^{3}=b^{4}$이에요.',
        '계수끼리 더했어요. 계수는 곱해요: $2\\times(-5)=-10$',
        '부호를 확인해 보세요. 양수와 음수를 곱하면 음수예요.',
      ],
      explain: '계수끼리 $2\\times(-5)=-10$, 문자끼리 $a^{2}\\times a=a^{3}$, $b\\times b^{3}=b^{4}$이므로 $-10a^{3}b^{4}$이에요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '다음을 계산한 것은 무엇일까요?\n\n$(4x^{2}-3x+1)+(-x^{2}+5x-6)$',
      choices: ['$3x^{2}+2x-5$', '$5x^{2}+2x-5$', '$3x^{2}+8x-5$', '$3x^{2}+2x+7$'],
      answer: 0,
      why: [
        '',
        '$-x^{2}$의 부호를 놓쳤어요. $4x^{2}-x^{2}=3x^{2}$이에요.',
        '$-3x$의 부호를 놓쳤어요. $-3x+5x=2x$예요.',
        '상수항을 다시 보세요. $1+(-6)=-5$예요.',
      ],
      explain: '동류항끼리 모아요. $x^{2}$항: $4-1=3$, $x$항: $-3+5=2$, 상수항: $1-6=-5$이므로 $3x^{2}+2x-5$예요.',
    },
    {
      id: 'p8', level: 1, type: 'short', check: 'number', concept: 5,
      q: '$-2a(3a-5b+4)$를 전개했을 때 $ab$의 계수를 구해 보세요.',
      answer: '10',
      wrong: [{ a: '-10', why: '$(-2a)\\times(-5b)$는 음수끼리의 곱이라 양수예요. $+10ab$예요.' }],
      explain: '$-2a(3a-5b+4)=-6a^{2}+10ab-8a$예요. $ab$항은 $(-2a)\\times(-5b)=10ab$이므로 계수는 10이에요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: '다음을 간단히 한 것은 무엇일까요?\n\n$5x-[2y-\\{3x-(x-y)\\}]$',
      choices: ['$7x-y$', '$3x+y$', '$7x-3y$', '$7x+y$'],
      answer: 0,
      why: [
        '',
        '대괄호 앞의 $-$를 풀 때 안쪽 모든 항의 부호를 바꿔야 해요. $5x-(-2x+y)=7x-y$예요.',
        '소괄호를 풀 때 $-y$의 부호를 바꾸지 않았어요. $3x-(x-y)=2x+y$예요.',
        '대괄호를 풀 때 $y$의 부호를 바꾸지 않았어요.',
      ],
      hint: '가장 안쪽 소괄호부터 차례로 풀어 보세요.',
      explain: '안쪽부터 풀어요. $3x-(x-y)=2x+y$, $2y-(2x+y)=-2x+y$, $5x-(-2x+y)=7x-y$예요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', concept: 5,
      q: '$(12x^{2}y-8xy^{2})\\div(-4xy)$를 간단히 하면 $ax+by$예요. $a+b$의 값을 구해 보세요.',
      answer: '-1',
      hint: '각 항을 $-4xy$로 나누어 보세요.',
      wrong: [
        { a: '-5', why: '두 번째 항의 부호를 확인해 보세요. $-8xy^{2}\\div(-4xy)=+2y$예요.' },
        { a: '1', why: '음수로 나누면 부호가 바뀌어요. $12x^{2}y\\div(-4xy)=-3x$예요.' },
      ],
      explain: '$\\frac{12x^{2}y}{-4xy}=-3x$, $\\frac{-8xy^{2}}{-4xy}=2y$이므로 $-3x+2y$예요. $a=-3$, $b=2$이므로 $a+b=-1$이에요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '$\\square$ 안에 알맞은 식은 무엇일까요?\n\n$\\square\\div3a^{2}b=4ab^{2}$',
      choices: ['$12a^{3}b^{3}$', '$\\frac{4b}{3a}$', '$12a^{2}b^{2}$', '$7a^{3}b^{3}$'],
      answer: 0,
      why: [
        '',
        '나누었어요. $\\square$는 나눗셈의 결과에 나누는 식을 곱해서 구해요.',
        '지수끼리 곱했어요. $a^{2}\\times a=a^{3}$, $b\\times b^{2}=b^{3}$이에요.',
        '계수끼리 더했어요. $3\\times4=12$예요.',
      ],
      hint: '나눗셈과 곱셈의 관계를 써 보세요.',
      explain: '$\\square=4ab^{2}\\times3a^{2}b=12a^{3}b^{3}$이에요.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', concept: 5,
      q: '$x=2$, $y=-1$일 때, $3x(x-2y)-2x^{2}$의 값을 구해 보세요.',
      answer: '16',
      hint: '먼저 식을 간단히 한 뒤 수를 대입하면 계산이 쉬워요.',
      wrong: [{ a: '-8', why: '$-6xy$에 대입할 때 부호를 확인해 보세요. $-6\\times2\\times(-1)=12$예요.' }],
      explain: '식을 간단히 하면 $3x^{2}-6xy-2x^{2}=x^{2}-6xy$예요. 대입하면 $2^{2}-6\\times2\\times(-1)=4+12=16$이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 0,
      q: '$2^x\\times4^{3}=2^{11}$일 때, 자연수 $x$의 값을 구해 보세요.',
      answer: '5',
      hint: '4를 2의 거듭제곱으로 나타내 보세요.',
      wrong: [{ a: '8', why: '$4^{3}$을 $2^{3}$처럼 생각했어요. $4=2^{2}$이므로 $4^{3}=(2^{2})^{3}=2^{6}$이에요.' }],
      explain: '$4^{3}=(2^{2})^{3}=2^{6}$이므로 $2^x\\times2^{6}=2^{x+6}=2^{11}$이에요. $x+6=11$이므로 $x=5$예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', concept: 2,
      q: '$(2x^ay^{3})^b=16x^{12}y^c$일 때, 자연수 $a$, $b$, $c$에 대하여 $a+b+c$의 값을 구해 보세요.',
      answer: '19',
      hint: '계수부터 비교해 $b$를 구해 보세요.',
      wrong: [{ a: '14', why: '$(y^{3})^b$의 지수는 $3+b$가 아니라 $3\\times b$예요.' }],
      explain: '계수를 비교하면 $2^b=16=2^{4}$이므로 $b=4$예요. $x$의 지수에서 $a\\times4=12$이므로 $a=3$, $y$의 지수에서 $c=3\\times4=12$예요. 따라서 $a+b+c=3+4+12=19$예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '자리', concept: 2,
      q: '$2^{10}\\times5^{7}$은 몇 자리의 자연수일까요?',
      answer: '8',
      hint: '$2\\times5=10$을 이용할 수 있게 2와 5의 지수를 맞춰 보세요.',
      wrong: [{ a: '17', why: '지수 10과 7을 더했어요. $2^{7}\\times5^{7}=(2\\times5)^{7}=10^{7}$으로 묶어 보세요.' }],
      explain: '$2^{10}\\times5^{7}=2^{3}\\times2^{7}\\times5^{7}=2^{3}\\times(2\\times5)^{7}=8\\times10^{7}=80000000$이에요. 8 뒤에 0이 7개이므로 8자리 자연수예요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 5,
      q: '어떤 식에 $-2x$를 곱해야 할 것을 잘못하여 나누었더니 $3x-5y$가 되었어요. 바르게 계산한 식은 무엇일까요?',
      choices: ['$12x^{3}-20x^{2}y$', '$-6x^{2}+10xy$', '$12x^{3}+20x^{2}y$', '$3x^{2}-5xy$'],
      answer: 0,
      why: [
        '',
        '이것은 어떤 식이에요. 어떤 식에 $-2x$를 한 번 더 곱해야 해요.',
        '$10xy\\times(-2x)$의 부호를 확인해 보세요. $-20x^{2}y$예요.',
        '어떤 식을 구하지 않고 $3x-5y$에 $x$만 곱했어요.',
      ],
      hint: '먼저 나눗셈을 거꾸로 해서 어떤 식을 구해요.',
      explain: '어떤 식을 $A$라 하면 $A\\div(-2x)=3x-5y$이므로 $A=(3x-5y)\\times(-2x)=-6x^{2}+10xy$예요. 바르게 계산하면 $(-6x^{2}+10xy)\\times(-2x)=12x^{3}-20x^{2}y$예요.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'number', concept: 4,
      q: '어떤 다항식에서 $2x^{2}-3x+1$을 빼야 할 것을 잘못하여 더했더니 $5x^{2}+x-4$가 되었어요. 바르게 계산한 식에서 $x$의 계수를 구해 보세요.',
      answer: '7',
      hint: '먼저 어떤 다항식을 구해 보세요.',
      wrong: [{ a: '4', why: '어떤 다항식 $3x^{2}+4x-5$의 계수에서 멈췄어요. 여기서 $2x^{2}-3x+1$을 빼야 해요.' }],
      explain: '어떤 다항식은 $(5x^{2}+x-4)-(2x^{2}-3x+1)=3x^{2}+4x-5$예요. 바르게 계산하면 $(3x^{2}+4x-5)-(2x^{2}-3x+1)=x^{2}+7x-6$이므로 $x$의 계수는 7이에요.',
    },
  ],

  deeper: [
    {
      title: '지수법칙으로 아주 큰 수 다루기',
      body: '$2^{10}=1024$는 1000에 아주 가까워요. 그래서 $2^{20}=(2^{10})^{2}$은 약 100만, $2^{30}=(2^{10})^{3}$은 약 10억이에요. 컴퓨터의 저장 용량 단위가 대략 1000배씩 커지는 것도 이 때문이에요.\n\n' +
        '또 $2^{10}\\times5^{10}=(2\\times5)^{10}=10^{10}$처럼 곱의 거듭제곱을 쓰면 큰 수가 몇 자리인지 계산하지 않고도 알 수 있어요.',
    },
    {
      title: '3학년에서는 다항식끼리 곱해요',
      body: '이 단원에서는 단항식을 다항식에 곱했어요. 3학년에서는 $(a+b)(c+d)$처럼 **다항식끼리 곱하는** 방법과, 자주 나오는 곱을 공식으로 정리한 **곱셈 공식**을 배워요.\n\n' +
        '그때도 "분배법칙으로 모든 항에 빠짐없이 곱한 뒤 동류항끼리 정리한다"는 원리는 지금과 똑같아요.',
    },
  ],

  faq: [
    {
      q: '$a^{2}\\times a^{3}$은 왜 $a^{6}$이 아니에요?',
      a: '$a^{2}\\times a^{3}=(a\\times a)\\times(a\\times a\\times a)$로 풀어 쓰면 $a$를 모두 5번 곱한 것이에요. 그래서 $a^{5}$이에요. 지수끼리 곱하는 것은 $(a^{2})^{3}$처럼 거듭제곱을 다시 거듭제곱할 때예요.',
    },
    {
      q: '$a^{3}\\div a^{3}$은 왜 0이 아니고 1이에요?',
      a: '0이 아닌 수를 자기 자신으로 나누면 1이에요. $5\\div5=1$인 것과 같아요. 분수로 쓰면 $\\frac{a^{3}}{a^{3}}$이고 위아래가 모두 약분되어 1이 남아요.',
    },
    {
      q: '$(-2)^{2}$과 $-2^{2}$은 달라요?',
      a: '달라요. $(-2)^{2}=(-2)\\times(-2)=4$는 괄호 안의 $-2$를 제곱한 것이고, $-2^{2}=-(2\\times2)=-4$는 2만 제곱한 뒤 음의 부호를 붙인 것이에요. 괄호가 있으면 부호까지 거듭제곱해요.',
    },
    {
      q: '$x^{2}$과 $x$는 왜 더해서 하나로 만들 수 없어요?',
      a: '차수가 달라서 동류항이 아니기 때문이에요. $x^{2}$은 넓이(가로 $x$, 세로 $x$인 정사각형), $x$는 길이처럼 서로 다른 종류의 양이에요. 그래서 $3x^{2}+2x$는 더 간단히 할 수 없어요.',
    },
  ],

  mistakes: [
    '밑이 같은 거듭제곱의 곱셈에서 지수끼리 곱하는 실수 — $a^{2}\\times a^{3}=a^{5}$예요($a^{6}$이 아니에요).',
    '괄호 앞이 $-$일 때 뒤쪽 항의 부호를 바꾸지 않는 실수 — $(3x-y)-(x-2y)=2x+y$예요.',
    '분배법칙에서 마지막 항에 곱하는 것을 잊는 실수 — $2a(3a-b+1)=6a^{2}-2ab+2a$예요.',
  ],

  gens: [
    {
      id: 'exp-law-blank',
      level: 1,
      title: '지수법칙으로 빈칸의 지수 구하기',
      make: function (R) {
        var v = R.pick(['a', 'x', 'y']);
        function pw(e) { return e === 1 ? v : v + '^{' + e + '}'; }
        var kind = R.int(0, 3), m, n, k, ans, expr, explain, wrong = [];
        if (kind === 0) {
          do { m = R.int(2, 9); n = R.int(2, 9); } while (m * n === m + n);
          ans = m + n;
          expr = pw(m) + '\\times ' + pw(n) + '=' + v + '^{\\square}';
          wrong.push({ a: String(m * n), why: '지수끼리 곱했어요. 밑이 같은 거듭제곱의 곱셈은 지수끼리 더해요.' });
          explain = '밑이 같은 거듭제곱의 곱셈은 지수끼리 더해요.\n\n$' + pw(m) + '\\times ' + pw(n) + '=' + v + '^{' + m + '+' + n + '}=' + pw(ans) + '$';
        } else if (kind === 1) {
          do { m = R.int(2, 7); n = R.int(2, 5); } while (m * n === m + n);
          ans = m * n;
          expr = '(' + pw(m) + ')^{' + n + '}=' + v + '^{\\square}';
          wrong.push({ a: String(m + n), why: '지수끼리 더했어요. 거듭제곱의 거듭제곱은 지수끼리 곱해요.' });
          explain = '거듭제곱의 거듭제곱은 지수끼리 곱해요.\n\n$(' + pw(m) + ')^{' + n + '}=' + v + '^{' + m + '\\times ' + n + '}=' + pw(ans) + '$';
        } else if (kind === 2) {
          n = R.int(2, 6);
          m = R.int(n + 1, n + 9);
          ans = m - n;
          expr = pw(m) + '\\div ' + pw(n) + '=' + v + '^{\\square}';
          if (m % n === 0 && m / n !== ans) wrong.push({ a: String(m / n), why: '지수끼리 나누었어요. 거듭제곱의 나눗셈은 지수끼리 빼요.' });
          wrong.push({ a: String(m + n), why: '지수끼리 더했어요. 나눗셈은 지수끼리 빼요.' });
          explain = '밑이 같은 거듭제곱의 나눗셈은 (나뉘는 수의 지수가 더 크면) 지수끼리 빼요.\n\n$' + pw(m) + '\\div ' + pw(n) + '=' + v + '^{' + m + '-' + n + '}=' + pw(ans) + '$ (단, $' + v + '\\ne0$)';
        } else {
          m = R.int(2, 8);
          k = R.int(m + 2, m + 10);
          ans = k - m;
          expr = pw(m) + '\\times ' + v + '^{\\square}=' + pw(k);
          if (k % m === 0 && k / m !== ans) wrong.push({ a: String(k / m), why: '지수끼리 곱한다고 생각했어요. 곱셈은 지수끼리 더하므로 $' + m + '+\\square=' + k + '$' + R.josa(k, '이에요/예요') + '.' });
          wrong.push({ a: String(k + m), why: '빈칸은 더해서 ' + k + R.josa(k, '이/가') + ' 되는 수예요. $' + m + '+\\square=' + k + '$에서 거꾸로 빼서 구해요.' });
          explain = '밑이 같은 거듭제곱의 곱셈은 지수끼리 더하므로 $' + m + '+\\square=' + k + '$' + R.josa(k, '이에요/예요') + '. 따라서 $\\square=' + k + '-' + m + '=' + ans + '$';
        }
        return {
          type: 'short', check: 'number', concept: kind === 2 ? 1 : 0,
          q: '$\\square$ 안에 알맞은 수를 구해 보세요.\n\n$' + expr + '$',
          answer: String(ans),
          wrong: wrong,
          explain: explain,
        };
      },
    },
    {
      id: 'poly-sub-coef',
      level: 1,
      title: '다항식의 뺄셈 (괄호 앞의 빼기)',
      make: function (R) {
        var vars, names;
        if (R.bool(0.6)) {
          vars = ['x^{2}', 'x', ''];
          names = ['$x^{2}$의 계수', '$x$의 계수', '상수항'];
        } else {
          vars = ['x', 'y', ''];
          names = ['$x$의 계수', '$y$의 계수', '상수항'];
        }
        var P = [R.nonzero(-6, 9), R.nonzero(-9, 9), R.nonzero(-9, 9)];
        var Q = [R.nonzero(-6, 9), R.nonzero(-9, 9), R.nonzero(-9, 9)];
        var res = [P[0] - Q[0], P[1] - Q[1], P[2] - Q[2]];
        var t = R.int(0, 2);
        if (res[t] === 0) t = (t + 1) % 3;
        if (res[t] === 0) t = (t + 1) % 3;
        function poly(c, first) {
          var s = '';
          for (var i = 0; i < 3; i++) s += R.fmt.term(c[i], vars[i], first && s === '');
          return s;
        }
        var Ps = poly(P, true), Qs = poly(Q, true);
        var negQ = poly([-Q[0], -Q[1], -Q[2]], false);
        var resS = poly(res, true) || '0';
        var wrong = [{ a: String(P[t] + Q[t]), why: '괄호 앞의 $-$를 풀 때 ' + names[t] + '의 부호를 바꾸지 않았어요. 빼는 식의 모든 항의 부호를 바꿔요.' }];
        if (Q[t] - P[t] !== res[t] && Q[t] - P[t] !== P[t] + Q[t]) wrong.push({ a: String(Q[t] - P[t]), why: '거꾸로 뺐어요. 앞의 식에서 뒤의 식을 빼요.' });
        return {
          type: 'short', check: 'number', concept: 4,
          q: '다음 식을 간단히 했을 때 ' + names[t] + R.josa(names[t], '을/를') + ' 구해 보세요.\n\n$(' + Ps + ')-(' + Qs + ')$',
          answer: String(res[t]),
          wrong: wrong,
          explain: '빼는 식의 괄호를 풀면 각 항의 부호가 바뀌어요. 그다음 동류항끼리 모아요.\n\n$(' + Ps + ')-(' + Qs + ')=' + Ps + negQ + '=' + resS + '$\n\n' +
            '따라서 ' + names[t] + R.josa(names[t], '은/는') + ' ' + res[t] + R.josa(res[t], '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'mono-muldiv',
      level: 2,
      title: '단항식의 곱셈과 나눗셈',
      make: function (R) {
        function mono(c, ex, ey) {
          var v = (ex > 0 ? (ex === 1 ? 'x' : 'x^{' + ex + '}') : '') + (ey > 0 ? (ey === 1 ? 'y' : 'y^{' + ey + '}') : '');
          return R.fmt.term(c, v, true) || '0';
        }
        function par(c, ex, ey) { var s = mono(c, ex, ey); return c < 0 ? '(' + s + ')' : s; }
        var correct, cands, q, explain;
        if (R.bool()) {
          var c1 = R.pick([-3, -2, 2, 3]), p = R.int(1, 3), qq = R.int(0, 2), k = R.pick([2, 3]);
          var c2 = R.nonzero(-5, 5), r = R.int(1, 3), s = R.int(1, 3);
          var pk = Math.pow(c1, k);
          var C = pk * c2, X = p * k + r, Y = qq * k + s;
          correct = mono(C, X, Y);
          cands = [
            [mono(c1 * c2, X, Y), '괄호 밖의 지수를 계수에도 적용해야 해요. $' + R.fmt.paren(c1) + '^{' + k + '}=' + pk + '$' + R.josa(pk, '이에요/예요') + '.'],
            [mono(C, p + k + r, qq === 0 ? s : qq + k + s), '거듭제곱의 거듭제곱에서 지수끼리 더했어요. 지수끼리 곱해요.'],
            [mono(-C, X, Y), '부호를 다시 확인해 보세요. 음수를 짝수 번 곱하면 양수, 홀수 번 곱하면 음수예요.'],
            [mono(c1 * k * c2, X, Y), '계수에 지수를 곱했어요. $' + R.fmt.paren(c1) + '^{' + k + '}$' + R.josa('제곱', '은/는') + ' $' + c1 + '$' + R.josa(c1, '을/를') + ' ' + k + '번 곱한 수예요.'],
            [mono(C, X + 1, Y), '같은 문자끼리 곱할 때 지수를 다시 세어 보세요.'],
          ];
          q = '다음 식을 간단히 한 것으로 알맞은 것을 고르세요.\n\n$(' + mono(c1, p, qq) + ')^{' + k + '}\\times ' + par(c2, r, s) + '$';
          explain = '먼저 거듭제곱을 계산하면 $(' + mono(c1, p, qq) + ')^{' + k + '}=' + mono(pk, p * k, qq * k) + '$\n\n' +
            '계수끼리 $' + R.fmt.paren(pk) + '\\times ' + R.fmt.paren(c2) + '=' + C + '$, 문자끼리 곱하면 지수를 더해서 답은 $' + correct + '$';
        } else {
          var cc2, k1, cc1, cc3, pp, rr, ss, sq, t, u, X2, Y2;
          do {
            cc2 = R.pick([-4, -3, -2, 2, 3, 4, 6]);
            k1 = R.nonzero(-4, 4);
            cc1 = cc2 * k1;
            cc3 = R.nonzero(-3, 3);
            rr = R.int(1, 3); ss = R.int(1, 2);
            pp = R.int(rr, rr + 3); sq = R.int(ss, ss + 2);
            t = R.int(1, 3); u = R.int(0, 2);
            X2 = pp - rr + t; Y2 = sq - ss + u;
          } while (Y2 < 1 || (cc1 === cc2 && pp === rr && sq === ss));
          var C2 = k1 * cc3;
          correct = mono(C2, X2, Y2);
          cands = [
            [mono(C2, pp + rr + t, sq + ss + u), '나누는 식의 지수를 더했어요. 나눗셈은 지수끼리 빼요.'],
            [mono(cc1 * cc2 * cc3, X2, Y2), '계수를 나누지 않고 곱했어요. 나눗셈은 역수를 곱해요.'],
            [mono(-C2, X2, Y2), '부호를 다시 확인해 보세요. 음수의 개수를 세어 보면 돼요.'],
            [mono(C2, X2 + 1, Y2), '$x$의 지수를 다시 세어 보세요. 곱하는 식은 더하고, 나누는 식은 빼요.'],
            [mono(C2, X2, Y2 + 1), '$y$의 지수를 다시 세어 보세요. 곱하는 식은 더하고, 나누는 식은 빼요.'],
          ];
          q = '다음 식을 간단히 한 것으로 알맞은 것을 고르세요.\n\n$' + mono(cc1, pp, sq) + '\\div ' + par(cc2, rr, ss) + '\\times ' + par(cc3, t, u) + '$';
          explain = '나눗셈은 역수의 곱셈으로 바꾸어 앞에서부터 계산해요.\n\n' +
            '계수: $' + R.fmt.paren(cc1) + '\\div ' + R.fmt.paren(cc2) + '\\times ' + R.fmt.paren(cc3) + '=' + C2 + '$\n\n' +
            '$x$의 지수: $' + pp + '-' + rr + '+' + t + '=' + X2 + '$, $\\;y$의 지수: $' + sq + '-' + ss + '+' + u + '=' + Y2 + '$\n\n' +
            '답: $' + correct + '$';
        }
        var reason = {};
        cands.forEach(function (c) { if (c[0] !== correct && !(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: 3,
          q: q,
          choices: pick.choices.map(function (c) { return '$' + c + '$'; }),
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: explain,
        };
      },
    },
    {
      id: 'distribute',
      level: 2,
      title: '(단항식)×(다항식), (다항식)÷(단항식)',
      make: function (R) {
        function poly(list) {
          var s = '';
          list.forEach(function (t) { s += R.fmt.term(t[0], t[1], s === ''); });
          return s || '0';
        }
        function neg(list) { return list.map(function (t) { return [-t[0], t[1]]; }); }
        var correct, cands, q, explain;
        if (R.bool()) {
          var c0 = R.pick([-4, -3, -2, 2, 3, 4]), e = R.int(1, 2);
          var xe = e === 1 ? 'x' : 'x^{2}', xe1 = e === 1 ? 'x^{2}' : 'x^{3}';
          var a = R.nonzero(-6, 6), b = R.nonzero(-6, 6), c = R.nonzero(-6, 6);
          var inner = poly([[a, 'x'], [b, 'y'], [c, '']]);
          var mono0 = R.fmt.term(c0, xe, true);
          var res = [[c0 * a, xe1], [c0 * b, xe + 'y'], [c0 * c, xe]];
          correct = poly(res);
          cands = [
            [poly([res[0], res[1], [c, '']]), '마지막 항 $' + R.fmt.term(c, '', true) + '$에도 $' + mono0 + '$' + R.josa(xe === 'x' ? 'x' : '제곱', '을/를') + ' 곱해야 해요.'],
            [poly([res[0], [-c0 * b, xe + 'y'], res[2]]), '$' + xe + 'y$항의 부호를 다시 확인해 보세요. $' + mono0 + '\\times ' + (b < 0 ? '(' + R.fmt.term(b, 'y', true) + ')' : R.fmt.term(b, 'y', true)) + '=' + R.fmt.term(c0 * b, xe + 'y', true) + '$' + R.josa('y', '이에요/예요') + '.'],
            [poly(neg(res)), c0 < 0 ? '곱하는 단항식 $' + mono0 + '$의 음의 부호를 빠뜨렸어요. 음수를 곱하면 모든 항의 부호가 바뀌어요.' : '모든 항의 부호가 반대로 되었어요. $' + mono0 + '$' + R.josa(xe === 'x' ? 'x' : '제곱', '은/는') + ' 양수 계수이므로 각 항의 부호가 그대로예요.'],
            [poly([res[0], [b, 'y'], [c, '']]), '첫째 항에만 곱했어요. 분배법칙은 괄호 안의 모든 항에 곱해요.'],
            [poly([[-c0 * a, xe1], res[1], res[2]]), '첫째 항의 부호를 다시 확인해 보세요. $' + mono0 + '\\times ' + (a < 0 ? '(' + R.fmt.term(a, 'x', true) + ')' : R.fmt.term(a, 'x', true)) + '=' + R.fmt.term(c0 * a, xe1, true) + '$' + R.josa('제곱', '이에요/예요') + '.'],
          ];
          q = '다음 식을 전개한 것으로 알맞은 것을 고르세요.\n\n$' + mono0 + '(' + inner + ')$';
          explain = '분배법칙으로 $' + mono0 + '$' + R.josa(xe === 'x' ? 'x' : '제곱', '을/를') + ' 괄호 안의 모든 항에 곱해요.\n\n' +
            '$' + mono0 + '\\times ' + R.fmt.term(a, 'x', true) + '=' + R.fmt.term(c0 * a, xe1, true) + '$, $\\;' + mono0 + '\\times ' + (b < 0 ? '(' + R.fmt.term(b, 'y', true) + ')' : R.fmt.term(b, 'y', true)) + '=' + R.fmt.term(c0 * b, xe + 'y', true) + '$, $\\;' + mono0 + '\\times ' + R.fmt.paren(c) + '=' + R.fmt.term(c0 * c, xe, true) + '$\n\n' +
            '답: $' + correct + '$';
        } else {
          var k = R.pick([-4, -3, -2, 2, 3, 4]);
          var u = R.nonzero(-5, 5), w = R.nonzero(-5, 5), z = R.int(-4, 4);
          var given = [[u * k, 'x^{2}y'], [w * k, 'xy^{2}'], [z * k, 'xy']];
          var div = R.fmt.term(k, 'xy', true);
          var divP = k < 0 ? '(' + div + ')' : div;
          var res2 = [[u, 'x'], [w, 'y'], [z, '']];
          correct = poly(res2);
          cands = [
            [poly([[u, 'x'], [-w, 'y'], [z, '']]), '$y$항의 부호를 다시 확인해 보세요. $' + R.fmt.term(w * k, 'xy^{2}', true) + '$' + R.josa('제곱', '을/를') + ' $' + div + '$' + R.josa('y', '으로/로') + ' 나누면 $' + R.fmt.term(w, 'y', true) + '$' + R.josa('y', '이에요/예요') + '.'],
            [poly([[u, 'x'], [w * k, 'xy^{2}'], [z * k, 'xy']]), '첫째 항만 나누었어요. 다항식의 모든 항을 나누어요.'],
            [poly(neg(res2)), k < 0 ? '나누는 식 $' + div + '$의 음의 부호를 빠뜨렸어요. 음수로 나누면 모든 항의 부호가 바뀌어요.' : '모든 항의 부호가 반대로 되었어요. 양수로 나누면 각 항의 부호는 그대로예요.'],
            [poly([[u, 'x^{2}y'], [w, 'xy^{2}'], [z, 'xy']]), '계수만 나누고 문자는 나누지 않았어요. 문자도 약분해요.'],
          ];
          if (z !== 0) cands.push([poly([[u, 'x'], [w, 'y']]), '$' + R.fmt.term(z * k, 'xy', true) + '$' + R.josa('y', '을/를') + ' $' + div + '$' + R.josa('y', '으로/로') + ' 나누면 상수 $' + z + '$' + R.josa(z, '이/가') + ' 남아요.']);
          else cands.push([poly([[u, 'x'], [w, 'y'], [1, '']]), '$xy$항이 없으니 상수항도 없어요.']);
          q = '다음 식을 간단히 한 것으로 알맞은 것을 고르세요.\n\n$(' + poly(given) + ')\\div ' + divP + '$';
          var parts = given.filter(function (g) { return g[0] !== 0; }).map(function (g, i) {
            var r = g[1] === 'x^{2}y' ? [u, 'x'] : g[1] === 'xy^{2}' ? [w, 'y'] : [z, ''];
            return '\\frac{' + R.fmt.term(g[0], g[1], true) + '}{' + div + '}=' + R.fmt.term(r[0], r[1], true);
          });
          explain = '다항식의 각 항을 $' + div + '$' + R.josa('y', '으로/로') + ' 나누어요.\n\n$' + parts.join('$, $\\;') + '$\n\n답: $' + correct + '$';
        }
        var reason = {};
        cands.forEach(function (c) { if (c[0] !== correct && !(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: 5,
          q: q,
          choices: pick.choices.map(function (c) { return '$' + c + '$'; }),
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: explain,
        };
      },
    },
  ],
});
