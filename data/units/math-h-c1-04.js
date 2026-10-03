/* 공통수학1 · 복소수와 그 연산
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy) */
(function () {
  // 생성기 도우미 (난수를 쓰지 않는 순수 함수만)
  // 정수 a, b → a+bi 의 TeX ('3-2i', '-i', '5', '0')
  function cx(a, b) {
    var im = b === 0 ? '' : (b === 1 ? 'i' : b === -1 ? '-i' : b + 'i');
    if (a === 0) return im || '0';
    return a + (b > 0 ? '+' : '') + im;
  }
  // Frac 두 개 → a+bi 의 TeX (분수 허용)
  function cxF(re, im) {
    var reZero = re.isZero(), imZero = im.isZero();
    var imAbs = im.abs();
    var imTex = imZero ? '' : (imAbs.isInt() && imAbs.num === 1 ? 'i' : imAbs.toTex() + 'i');
    if (reZero) return imZero ? '0' : (im.sign() < 0 ? '-' : '') + imTex;
    return re.toTex() + (imZero ? '' : (im.sign() < 0 ? '-' : '+') + imTex);
  }
  // ax+by (x, y 의 계수) → TeX
  function lin2(a, b) {
    function t(c, v, first) {
      if (c === 0) return '';
      var s = c < 0 ? '-' : (first ? '' : '+');
      var m = Math.abs(c);
      return s + (m === 1 ? '' : m) + v;
    }
    var out = t(a, 'x', true);
    out += t(b, 'y', out === '');
    return out || '0';
  }
  function uniqByKey(correctKey, cands) {
    var seen = [String(correctKey)], out = [];
    cands.forEach(function (c) {
      var k = String(c[1]);
      if (seen.indexOf(k) >= 0) return;
      seen.push(k); out.push(c);
    });
    return out;
  }

  Tutor.registerUnit({
    id: 'math-h-c1-04',
    course: 'math-h-c1',
    title: '복소수와 그 연산',
    summary: '제곱하면 $-1$이 되는 수 $i$를 도입하여 복소수를 만들고, 복소수의 사칙연산과 켤레복소수, $i$의 거듭제곱, 음수의 제곱근을 익힙니다.',
    goals: [
      '허수단위 $i$와 복소수의 뜻을 알고, 복소수의 실수부분과 허수부분을 말할 수 있다.',
      '두 복소수가 서로 같을 조건을 이용하여 미지수의 값을 구할 수 있다.',
      '복소수의 덧셈·뺄셈·곱셈·나눗셈을 하고, 켤레복소수의 성질을 이용할 수 있다.',
      '$i$의 거듭제곱의 규칙과 음수의 제곱근의 성질을 이용하여 계산할 수 있다.',
    ],
    standards: ['[10공수1-02-01]'],

    concepts: [
      {
        title: '허수단위 $i$와 복소수',
        body: '실수는 제곱하면 항상 0 이상이므로 $x^{2}=-1$을 만족하는 실수는 없습니다. 그래서 **제곱하여 $-1$이 되는 새로운 수**를 생각하고, 이것을 $i$로 나타내어 **허수단위**라고 합니다.\n\n' +
          '$i^{2}=-1$, $\\quad i=\\sqrt{-1}$\n\n' +
          '실수 $a$, $b$에 대하여 $a+bi$ 꼴의 수를 **복소수**라 하고, $a$를 **실수부분**, $b$를 **허수부분**이라고 합니다.\n\n' +
          '| 복소수 $a+bi$ | 조건 | 예 |\n|---|---|---|\n| 실수 | $b=0$ | $3$, $-\\frac{1}{2}$ |\n| 허수 | $b\\ne0$ | $2+i$, $-3i$ |\n| 순허수 | $a=0$, $b\\ne0$ | $5i$, $-\\sqrt{2}i$ |\n\n' +
          '예: $3-2i$의 실수부분은 3, 허수부분은 $-2$입니다.\n\n' +
          '> ⚠️ 허수부분은 $i$ 앞에 곱해진 **실수** $b$입니다. $3-2i$의 허수부분은 $-2i$가 아니라 $-2$입니다.',
        easy: '수는 "풀 수 없는 방정식"을 풀기 위해 넓어져 왔습니다. $x+3=1$을 풀려고 음수를, $2x=1$을 풀려고 분수를, $x^{2}=2$를 풀려고 $\\sqrt{2}$ 같은 무리수를 만들었지요.\n\n' +
          '이번에는 $x^{2}=-1$입니다. 이 방정식의 해가 되는 수를 $i$라고 약속하고, 실수와 $i$를 섞어 $a+bi$ 꼴로 만든 수 전체를 복소수라고 부릅니다. 실수도 $b=0$인 복소수이므로 복소수 안에 들어 있습니다.',
        fig: {
          type: 'svg',
          alt: '복소수 a+bi 전체를 실수(b=0)와 허수(b≠0)로 나누고, 허수 안에 순허수(a=0)가 있는 그림',
          svg: '<svg viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="2"><rect x="10" y="30" width="300" height="130" rx="8"/><line x1="140" y1="30" x2="140" y2="160"/></g>' +
            '<rect x="180" y="95" width="115" height="50" rx="6" fill="var(--fig-2)" opacity="0.25"/><rect x="180" y="95" width="115" height="50" rx="6" fill="none" stroke="currentColor" stroke-width="1.5"/>' +
            '<g fill="currentColor" font-family="sans-serif" text-anchor="middle"><text x="160" y="20" font-size="15">복소수 a+bi (a, b는 실수)</text><text x="75" y="80" font-size="15">실수</text><text x="75" y="102" font-size="13">b=0</text><text x="225" y="62" font-size="15">허수</text><text x="225" y="82" font-size="13">b≠0</text><text x="237" y="117" font-size="14">순허수</text><text x="237" y="136" font-size="12">a=0, b≠0</text></g></svg>',
        },
        check: {
          type: 'choice',
          q: '복소수 $2-5i$의 허수부분은 무엇입니까?',
          choices: ['$-5$', '$-5i$', '$5$'],
          answer: 0,
          why: ['', '허수부분은 $i$ 앞에 곱해진 실수입니다. $i$는 빼고 $-5$입니다.', '부호도 허수부분에 포함됩니다. $2-5i=2+(-5)i$입니다.'],
          explain: '$2-5i=2+(-5)i$이므로 실수부분은 2, 허수부분은 $-5$입니다.',
        },
      },
      {
        title: '두 복소수가 서로 같을 조건',
        body: '두 복소수는 **실수부분끼리, 허수부분끼리 각각 같을 때** 서로 같다고 합니다. $a$, $b$, $c$, $d$가 실수일 때\n\n' +
          '- $a+bi=c+di$ $\\iff$ $a=c$, $b=d$\n' +
          '- $a+bi=0$ $\\iff$ $a=0$, $b=0$\n\n' +
          '예: 실수 $x$, $y$에 대하여 $(x+y)+(x-y)i=5+i$이면 $x+y=5$, $x-y=1$이므로 $x=3$, $y=2$입니다.\n\n' +
          '> ⚠️ 이 조건은 $a$, $b$, $c$, $d$가 **실수**일 때만 쓸 수 있습니다. 문제에 "실수 $x$, $y$"라는 말이 있는지 확인합니다.',
        easy: '복소수 $a+bi$는 "실수 칸 $a$"와 "허수 칸 $b$" 두 칸짜리 상자라고 생각할 수 있습니다. 두 상자가 같으려면 칸마다 들어 있는 수가 같아야 합니다.\n\n' +
          '그래서 등식 하나에서 식이 두 개(실수부분끼리, 허수부분끼리) 나오고, 미지수 두 개를 구할 수 있습니다.',
        check: {
          type: 'short', check: 'number',
          q: '실수 $x$, $y$에 대하여 $(x-1)+(y+2)i=3-i$일 때, $x+y$의 값을 구하시오.',
          answer: '1',
          wrong: [
            { a: '-1', why: '$x-1=3$에서 $x=4$입니다. $x=2$로 계산했습니다.' },
            { a: '7', why: '$y+2=-1$에서 $y=-3$입니다. 허수부분 $-1$의 부호를 확인합니다.' },
          ],
          explain: '실수부분끼리 $x-1=3$이므로 $x=4$, 허수부분끼리 $y+2=-1$이므로 $y=-3$입니다. 따라서 $x+y=1$입니다.',
        },
      },
      {
        title: '복소수의 덧셈·뺄셈·곱셈',
        body: '복소수의 계산은 $i$를 **문자처럼** 다루어 다항식처럼 계산하고, $i^{2}$이 나오면 $-1$로 바꿉니다.\n\n' +
          '- 덧셈: $(a+bi)+(c+di)=(a+c)+(b+d)i$\n' +
          '- 뺄셈: $(a+bi)-(c+di)=(a-c)+(b-d)i$\n' +
          '- 곱셈: $(a+bi)(c+di)=ac+adi+bci+bdi^{2}=(ac-bd)+(ad+bc)i$\n\n' +
          '예: $(2+3i)(1-i)=2-2i+3i-3i^{2}=2+i+3=5+i$\n\n' +
          '예: $(1+i)^{2}=1+2i+i^{2}=2i$\n\n' +
          '복소수에서도 덧셈과 곱셈의 교환법칙·결합법칙·분배법칙이 성립하므로, 다항식의 곱셈 공식을 그대로 쓸 수 있습니다.',
        easy: '$i$를 $x$ 같은 문자라고 생각하고 계산하면 됩니다. $(2+3i)(1-i)$는 $(2+3x)(1-x)=2+x-3x^{2}$처럼 전개하지요.\n\n' +
          '딱 하나 다른 점은 마지막에 $i^{2}$을 $-1$로 바꾸는 것입니다. $2+i-3i^{2}$에서 $-3i^{2}=-3\\cdot(-1)=3$이므로 $5+i$가 됩니다.',
        check: {
          type: 'choice',
          q: '$(1+2i)(3-i)$를 계산한 것은 무엇입니까?',
          choices: ['$5+5i$', '$1+5i$', '$3-2i$'],
          answer: 0,
          why: ['', '$i^{2}$을 $1$로 계산했습니다. $-2i^{2}=-2\\cdot(-1)=2$입니다.', '실수부분끼리, 허수부분끼리만 곱했습니다. 분배법칙으로 네 번 곱해야 합니다.'],
          explain: '$(1+2i)(3-i)=3-i+6i-2i^{2}=3+5i+2=5+5i$입니다.',
        },
      },
      {
        title: '켤레복소수와 복소수의 나눗셈',
        body: '복소수 $z=a+bi$에서 허수부분의 부호를 바꾼 $a-bi$를 $z$의 **켤레복소수**라 하고 $\\overline{z}$로 나타냅니다.\n\n' +
          '$z+\\overline{z}=2a$, $\\quad z\\overline{z}=(a+bi)(a-bi)=a^{2}+b^{2}$\n\n' +
          '두 값은 모두 **실수**입니다. 또 다음 성질이 있습니다.\n\n' +
          '- $\\overline{\\overline{z}}=z$, $\\quad\\overline{z_1\\pm z_2}=\\overline{z_1}\\pm\\overline{z_2}$, $\\quad\\overline{z_1z_2}=\\overline{z_1}\\,\\overline{z_2}$\n' +
          '- $z=\\overline{z}$ $\\iff$ $z$는 실수\n\n' +
          '**나눗셈**은 분모의 켤레복소수를 분모와 분자에 곱하여 **분모를 실수로** 만듭니다.\n\n' +
          '$\\frac{3+i}{1-i}=\\frac{(3+i)(1+i)}{(1-i)(1+i)}=\\frac{3+4i+i^{2}}{1^{2}+1^{2}}=\\frac{2+4i}{2}=1+2i$\n\n' +
          '> 💡 분모를 실수로 만드는 것은 중학교에서 분모의 근호를 없앤 **분모의 유리화**와 같은 생각입니다.',
        easy: '$\\frac{1}{\\sqrt{2}}$을 $\\frac{\\sqrt{2}}{2}$로 바꿀 때 분모와 분자에 같은 것을 곱해 분모의 근호를 없앴지요. 복소수의 나눗셈도 분모의 $i$를 없애고 싶습니다.\n\n' +
          '$(a+bi)(a-bi)=a^{2}-b^{2}i^{2}=a^{2}+b^{2}$이므로, 분모의 짝꿍인 켤레복소수를 곱하면 $i$가 사라집니다. 분자에도 똑같이 곱해야 값이 변하지 않습니다.',
        check: {
          type: 'choice',
          q: '$\\frac{1}{1+i}$을 $a+bi$ 꼴로 나타낸 것은 무엇입니까? (단, $a$, $b$는 실수)',
          choices: ['$\\frac{1}{2}-\\frac{1}{2}i$', '$\\frac{1}{2}+\\frac{1}{2}i$', '$1-i$'],
          answer: 0,
          why: ['', '분자에 곱한 켤레복소수는 $1-i$입니다. 허수부분의 부호를 확인합니다.', '분모 $(1+i)(1-i)=2$로 나누지 않았습니다.'],
          explain: '$\\frac{1}{1+i}=\\frac{1-i}{(1+i)(1-i)}=\\frac{1-i}{2}=\\frac{1}{2}-\\frac{1}{2}i$입니다.',
        },
      },
      {
        title: '$i$의 거듭제곱',
        body: '$i$를 거듭제곱하면 네 개의 값이 차례로 되풀이됩니다.\n\n' +
          '| $i^{1}$ | $i^{2}$ | $i^{3}$ | $i^{4}$ | $i^{5}$ | $i^{6}$ | $\\cdots$ |\n|---|---|---|---|---|---|---|\n| $i$ | $-1$ | $-i$ | $1$ | $i$ | $-1$ | $\\cdots$ |\n\n' +
          '$i^{4}=1$이므로 지수를 4로 나눈 **나머지**만 보면 됩니다. 자연수 $k$에 대하여\n\n' +
          '$i^{4k}=1$, $\\quad i^{4k+1}=i$, $\\quad i^{4k+2}=-1$, $\\quad i^{4k+3}=-i$\n\n' +
          '예: $i^{23}=i^{4\\times5+3}=(i^{4})^{5}\\cdot i^{3}=-i$\n\n' +
          '또 연속한 네 거듭제곱의 합은 $i+i^{2}+i^{3}+i^{4}=i-1-i+1=0$입니다. 그래서 긴 합은 네 개씩 묶어 지우고 남은 항만 계산합니다.',
        easy: '시계를 떠올려 보세요. 시곗바늘이 한 바퀴를 돌면 제자리로 오듯, $i$도 네 번 곱하면 $i^{4}=1$로 처음으로 돌아옵니다.\n\n' +
          '$i \\to -1 \\to -i \\to 1 \\to i \\to \\cdots$ 네 칸짜리 원을 빙빙 도는 것이므로, $i^{23}$은 23을 4로 나눈 나머지 3칸만 가면 됩니다. 셋째 칸은 $-i$입니다.',
        check: {
          type: 'choice',
          q: '$i^{23}$의 값은 무엇입니까?',
          choices: ['$1$', '$i$', '$-1$', '$-i$'],
          answer: 3,
          fixed: true,
          why: ['$i^{4}=1$은 지수가 4의 배수일 때입니다. 23을 4로 나눈 나머지는 3입니다.', '나머지가 1일 때의 값입니다. 23을 4로 나눈 나머지는 3입니다.', '나머지가 2일 때의 값입니다. 23을 4로 나눈 나머지는 3입니다.', ''],
          explain: '$23=4\\times5+3$이므로 $i^{23}=(i^{4})^{5}\\cdot i^{3}=1\\cdot(-i)=-i$입니다.',
        },
      },
      {
        title: '음수의 제곱근',
        body: '$a>0$일 때 $(\\sqrt{a}i)^{2}=a\\cdot i^{2}=-a$이므로 $\\sqrt{a}i$는 $-a$의 제곱근입니다. 그래서 다음과 같이 정합니다.\n\n' +
          '$a>0$일 때 $\\sqrt{-a}=\\sqrt{a}i$, $\\quad -a$의 제곱근은 $\\pm\\sqrt{a}i$\n\n' +
          '예: $\\sqrt{-4}=2i$, $\\quad\\sqrt{-3}=\\sqrt{3}i$, $\\quad -9$의 제곱근은 $\\pm3i$\n\n' +
          '**주의:** 실수에서 쓰던 $\\sqrt{a}\\sqrt{b}=\\sqrt{ab}$는 $a<0$, $b<0$이면 성립하지 않습니다.\n\n' +
          '$\\sqrt{-2}\\sqrt{-3}=\\sqrt{2}i\\cdot\\sqrt{3}i=\\sqrt{6}i^{2}=-\\sqrt{6}$ ($\\sqrt{6}$이 아님)\n\n' +
          '마찬가지로 $a>0$, $b<0$이면 $\\frac{\\sqrt{a}}{\\sqrt{b}}=-\\sqrt{\\frac{a}{b}}$입니다.\n\n' +
          '> 💡 음수의 제곱근이 보이면 **먼저 $\\sqrt{-a}=\\sqrt{a}i$로 바꾼 뒤** 계산하면 실수할 일이 없습니다.',
        easy: '$\\sqrt{-4}$는 "제곱해서 $-4$가 되는 수 중 하나"입니다. $2i$를 제곱하면 $4i^{2}=-4$이므로 $\\sqrt{-4}=2i$입니다.\n\n' +
          '함정은 곱셈입니다. $\\sqrt{-4}\\times\\sqrt{-9}$를 $\\sqrt{36}=6$으로 하면 틀립니다. 먼저 $2i\\times3i$로 바꾸면 $6i^{2}=-6$이 됩니다. 순서를 지키는 것이 핵심입니다.',
        check: {
          type: 'ox',
          q: '$\\sqrt{-2}\\times\\sqrt{-8}=\\sqrt{16}=4$입니다.',
          answer: false,
          explain: '음수끼리는 근호를 합칠 수 없습니다. $\\sqrt{-2}\\times\\sqrt{-8}=\\sqrt{2}i\\times2\\sqrt{2}i=4i^{2}=-4$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '$\\frac{3+i}{1-i}$를 $a+bi$ 꼴로 나타내시오. (단, $a$, $b$는 실수)',
        steps: [
          '분모 $1-i$의 켤레복소수 $1+i$를 분모와 분자에 곱합니다.',
          '분모: $(1-i)(1+i)=1-i^{2}=2$',
          '분자: $(3+i)(1+i)=3+3i+i+i^{2}=2+4i$',
          '따라서 $\\frac{2+4i}{2}=1+2i$입니다.',
        ],
        answer: '$1+2i$',
      },
      {
        q: '실수 $x$, $y$에 대하여 $(1+i)x+(1-i)y=3+i$일 때, $x$, $y$의 값을 구하시오.',
        steps: [
          '좌변을 실수부분과 허수부분으로 정리합니다: $(x+y)+(x-y)i$',
          '$x$, $y$가 실수이므로 $x+y$, $x-y$도 실수입니다. 두 복소수가 같을 조건에서 $x+y=3$, $x-y=1$입니다.',
          '두 식을 더하면 $2x=4$이므로 $x=2$, $y=1$입니다.',
        ],
        answer: '$x=2$, $y=1$',
      },
      {
        q: '$i+i^{2}+i^{3}+\\cdots+i^{10}$의 값을 구하시오.',
        steps: [
          '연속한 네 거듭제곱의 합은 $i+i^{2}+i^{3}+i^{4}=0$입니다.',
          '$i^{1}$부터 $i^{8}$까지는 네 개씩 두 묶음이므로 합이 0입니다.',
          '남은 것은 $i^{9}+i^{10}=i+(-1)=-1+i$입니다.',
        ],
        answer: '$-1+i$',
      },
    ],

    terms: [
      { term: '허수단위', def: '제곱하여 $-1$이 되는 수를 $i$로 나타낸 것입니다. $i^{2}=-1$, $i=\\sqrt{-1}$' },
      { term: '복소수', def: '실수 $a$, $b$에 대하여 $a+bi$ 꼴로 나타내는 수입니다. 실수와 허수를 모두 포함합니다.' },
      { term: '실수부분·허수부분', def: '복소수 $a+bi$에서 $a$를 실수부분, $b$를 허수부분이라고 합니다. 허수부분은 $bi$가 아니라 $b$입니다.' },
      { term: '허수', def: '실수가 아닌 복소수, 곧 $a+bi$에서 $b\\ne0$인 수입니다. 예: $2+i$, $3i$' },
      { term: '순허수', def: '실수부분이 0이고 허수부분이 0이 아닌 복소수입니다. 예: $5i$, $-\\sqrt{2}i$' },
      { term: '켤레복소수', def: '복소수 $z=a+bi$에서 허수부분의 부호를 바꾼 $a-bi$입니다. $\\overline{z}$로 나타냅니다.' },
      { term: '음수의 제곱근', def: '$a>0$일 때 $\\sqrt{-a}=\\sqrt{a}i$입니다. $-a$의 제곱근은 $\\pm\\sqrt{a}i$입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '다음 중 순허수인 것은 무엇입니까?',
        choices: ['$3i$', '$3$', '$3+i$', '$i^{2}$'],
        answer: 0,
        why: [
          '',
          '허수부분이 0이므로 실수입니다.',
          '허수이지만 실수부분이 3으로 0이 아니므로 순허수가 아닙니다.',
          '$i^{2}=-1$은 실수입니다.',
        ],
        explain: '순허수는 실수부분이 0이고 허수부분이 0이 아닌 복소수입니다. $3i=0+3i$이므로 순허수입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 0,
        q: '복소수 $5-3i$의 실수부분을 $a$, 허수부분을 $b$라 할 때, $a+b$의 값을 구하시오.',
        answer: '2',
        wrong: [
          { a: '8', why: '허수부분은 $-3$입니다. 부호까지 허수부분에 포함됩니다.' },
        ],
        explain: '$5-3i=5+(-3)i$이므로 $a=5$, $b=-3$이고 $a+b=2$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 1,
        q: '실수 $a$, $b$에 대하여 $(a-2)+(b+1)i=0$이면 $a=2$, $b=-1$입니다.',
        answer: true,
        explain: '복소수가 0이 되려면 실수부분과 허수부분이 모두 0이어야 합니다. $a-2=0$, $b+1=0$이므로 $a=2$, $b=-1$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 2,
        q: '$(3-2i)-(1-4i)$를 계산한 것은 무엇입니까?',
        choices: ['$2+2i$', '$2-6i$', '$4-6i$', '$2-2i$'],
        answer: 0,
        why: [
          '',
          '빼는 수의 허수부분 부호를 바꾸지 않았습니다. $-(1-4i)=-1+4i$입니다.',
          '두 복소수를 더했습니다.',
          '허수부분은 $-2-(-4)=2$입니다.',
        ],
        explain: '실수부분끼리 $3-1=2$, 허수부분끼리 $-2-(-4)=2$이므로 $2+2i$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '$(2+i)^{2}$을 계산한 것은 무엇입니까?',
        choices: ['$3+4i$', '$5+4i$', '$4+4i$', '$3+2i$'],
        answer: 0,
        why: [
          '',
          '$i^{2}$을 $1$로 계산했습니다. $i^{2}=-1$입니다.',
          '$i^{2}$항을 빠뜨렸습니다. $(2+i)^{2}=4+4i+i^{2}$입니다.',
          '가운데 항은 $2\\cdot2\\cdot i=4i$입니다. 2를 곱하지 않았습니다.',
        ],
        explain: '$(2+i)^{2}=4+4i+i^{2}=4+4i-1=3+4i$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'ox', concept: 3,
        q: '$z=2+3i$일 때, $z\\overline{z}=-5$입니다.',
        answer: false,
        explain: '$z\\overline{z}=(2+3i)(2-3i)=4-9i^{2}=4+9=13$입니다. $i^{2}=-1$이므로 $-9i^{2}=+9$입니다. $z\\overline{z}=a^{2}+b^{2}$은 항상 0 이상의 실수입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 4, fixed: true,
        q: '$i^{30}$의 값은 무엇입니까?',
        choices: ['$1$', '$i$', '$-1$', '$-i$'],
        answer: 2,
        why: [
          '30은 4의 배수가 아닙니다. 30을 4로 나눈 나머지는 2입니다.',
          '나머지가 1일 때의 값입니다. 30을 4로 나눈 나머지는 2입니다.',
          '',
          '나머지가 3일 때의 값입니다. 30을 4로 나눈 나머지는 2입니다.',
        ],
        explain: '$30=4\\times7+2$이므로 $i^{30}=(i^{4})^{7}\\cdot i^{2}=-1$입니다.',
      },
      {
        id: 'p8', level: 1, type: 'short', check: 'number', concept: 5,
        q: '$\\sqrt{-4}\\times\\sqrt{-9}$의 값을 구하시오.',
        answer: '-6',
        wrong: [
          { a: '6', why: '$\\sqrt{-4}\\sqrt{-9}=\\sqrt{36}$으로 계산했습니다. 음수끼리는 근호를 합칠 수 없습니다. $2i\\times3i=6i^{2}$입니다.' },
        ],
        explain: '$\\sqrt{-4}=2i$, $\\sqrt{-9}=3i$이므로 $2i\\times3i=6i^{2}=-6$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 3,
        q: '$\\frac{2+i}{2-i}$를 $a+bi$ 꼴로 나타낸 것은 무엇입니까? (단, $a$, $b$는 실수)',
        choices: ['$\\frac{3}{5}+\\frac{4}{5}i$', '$\\frac{3}{5}-\\frac{4}{5}i$', '$\\frac{5}{3}+\\frac{4}{3}i$', '$3+4i$'],
        answer: 0,
        why: [
          '',
          '허수부분의 부호가 틀렸습니다. 분자 $(2+i)(2+i)=3+4i$입니다.',
          '$i^{2}$을 $1$로 계산했습니다. 분모는 $(2-i)(2+i)=4-i^{2}=5$입니다.',
          '분모 5로 나누지 않았습니다.',
        ],
        hint: '분모의 켤레복소수 $2+i$를 분모와 분자에 곱합니다.',
        explain: '$\\frac{(2+i)(2+i)}{(2-i)(2+i)}=\\frac{4+4i+i^{2}}{4-i^{2}}=\\frac{3+4i}{5}=\\frac{3}{5}+\\frac{4}{5}i$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 1,
        q: '실수 $x$, $y$에 대하여 $(2+i)x-(1-3i)y=4+9i$일 때, $x+y$의 값을 구하시오.',
        answer: '5',
        hint: '좌변을 (실수부분)$+$(허수부분)$i$ 꼴로 정리합니다.',
        wrong: [
          { a: '-11/5', why: '$-(1-3i)y=-y+3yi$입니다. 허수부분을 $x-3y$로 계산했습니다.' },
        ],
        explain: '좌변을 정리하면 $(2x-y)+(x+3y)i$입니다. $2x-y=4$, $x+3y=9$를 연립하면 $x=3$, $y=2$이므로 $x+y=5$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 4, fixed: true,
        q: '$i+i^{2}+i^{3}+\\cdots+i^{50}$의 값은 무엇입니까?',
        choices: ['$0$', '$i$', '$-1$', '$-1+i$'],
        answer: 3,
        why: [
          '50은 4의 배수가 아닙니다. 네 개씩 묶고 나면 두 항이 남습니다.',
          '남는 항은 $i^{49}$, $i^{50}$ 두 개입니다. $i^{50}$을 빠뜨렸습니다.',
          '남는 항은 $i^{49}$, $i^{50}$ 두 개입니다. $i^{49}=i$를 빠뜨렸습니다.',
          '',
        ],
        hint: '$i+i^{2}+i^{3}+i^{4}=0$을 이용합니다.',
        explain: '$i^{1}$부터 $i^{48}$까지는 네 개씩 12묶음이므로 합이 0입니다. 남은 $i^{49}+i^{50}=i+(-1)=-1+i$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 4,
        q: '$z=\\frac{1+i}{1-i}$일 때, $z^{50}$의 값을 구하시오.',
        answer: '-1',
        hint: '먼저 $z$를 간단히 합니다.',
        wrong: [
          { a: '1', why: '$z=i$입니다. 50을 4로 나눈 나머지는 2이므로 $i^{50}=i^{2}=-1$입니다.' },
        ],
        explain: '$z=\\frac{(1+i)^{2}}{(1-i)(1+i)}=\\frac{2i}{2}=i$입니다. $50=4\\times12+2$이므로 $z^{50}=i^{50}=i^{2}=-1$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 0,
        q: '복소수 $z=(x^{2}-3x+2)+(x^{2}-1)i$가 순허수가 되도록 하는 실수 $x$의 값을 구하시오.',
        answer: '2',
        hint: '순허수는 실수부분이 0이고, 허수부분이 0이 **아닌** 수입니다.',
        wrong: [
          { a: '1', why: '$x=1$이면 허수부분 $x^{2}-1$도 0이 되어 $z=0$입니다. 0은 순허수가 아닙니다.' },
        ],
        explain: '실수부분 $x^{2}-3x+2=(x-1)(x-2)=0$에서 $x=1$ 또는 $x=2$입니다. 허수부분 $x^{2}-1\\ne0$이어야 하므로 $x\\ne1$입니다. 따라서 $x=2$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 5,
        q: '$\\sqrt{-2}\\sqrt{-8}+\\frac{\\sqrt{12}}{\\sqrt{-3}}$을 계산한 것은 무엇입니까?',
        choices: ['$-4-2i$', '$4-2i$', '$-4+2i$', '$4+2i$'],
        answer: 0,
        why: [
          '',
          '$\\sqrt{-2}\\sqrt{-8}=\\sqrt{16}=4$로 계산했습니다. 음수끼리는 근호를 합칠 수 없습니다.',
          '$\\frac{2}{i}=2i$로 계산했습니다. $\\frac{1}{i}=\\frac{i}{i^{2}}=-i$입니다.',
          '두 곳 모두 틀렸습니다. 음수의 제곱근은 먼저 $i$를 써서 바꾼 뒤 계산합니다.',
        ],
        hint: '$\\sqrt{-a}=\\sqrt{a}i$로 먼저 바꿉니다.',
        explain: '$\\sqrt{-2}\\sqrt{-8}=\\sqrt{2}i\\cdot2\\sqrt{2}i=4i^{2}=-4$이고, $\\frac{\\sqrt{12}}{\\sqrt{-3}}=\\frac{2\\sqrt{3}}{\\sqrt{3}i}=\\frac{2}{i}=\\frac{2i}{i^{2}}=-2i$입니다. 합은 $-4-2i$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 3,
        q: '복소수 $z$에 대하여 $z+2\\overline{z}=6-2i$일 때, $z\\overline{z}$의 값을 구하시오.',
        answer: '8',
        hint: '$z=a+bi$($a$, $b$는 실수)로 놓습니다.',
        wrong: [
          { a: '0', why: '$z\\overline{z}=a^{2}-b^{2}$으로 계산했습니다. $(a+bi)(a-bi)=a^{2}+b^{2}$입니다.' },
        ],
        explain: '$z=a+bi$로 놓으면 $z+2\\overline{z}=(a+bi)+2(a-bi)=3a-bi$입니다. $3a-bi=6-2i$에서 $a=2$, $b=2$이므로 $z\\overline{z}=a^{2}+b^{2}=8$입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 2,
        q: '$(1+i)^{8}$의 값을 구하시오.',
        answer: '16',
        hint: '$(1+i)^{2}$을 먼저 구합니다.',
        wrong: [
          { a: '-16', why: '$(2i)^{4}=16i^{4}$이고 $i^{4}=1$입니다.' },
        ],
        explain: '$(1+i)^{2}=1+2i+i^{2}=2i$이므로 $(1+i)^{8}=\\{(1+i)^{2}\\}^{4}=(2i)^{4}=16i^{4}=16$입니다.',
      },
    ],

    deeper: [
      {
        title: '허수는 어디에서 왔을까',
        body: '16세기 이탈리아의 수학자들은 삼차방정식의 근의 공식을 연구하다가, 답이 실수인데도 계산 중간에 음수의 제곱근이 나타나는 일을 만났습니다. 처음에는 "상상 속의 수"라고 여겼지만, 그대로 계산을 이어 가면 올바른 실수 답이 나왔습니다.\n\n' +
          '그 뒤 수학자들이 이 수의 계산 규칙을 정리했고, 18세기에 오일러가 $\\sqrt{-1}$을 $i$로 나타내기 시작했습니다. 오늘날 복소수는 전기 회로의 교류 계산, 신호 처리, 양자역학 등에서 꼭 필요한 도구입니다.',
      },
      {
        title: '다음 단원과의 연결 — 이차방정식의 허근',
        body: '실수 범위에서 $x^{2}+1=0$은 해가 없었지만, 복소수 범위에서는 $x=\\pm i$라는 두 해를 가집니다. 이처럼 복소수를 쓰면 **모든 이차방정식이 해를 가집니다**.\n\n' +
          '예를 들어 $x^{2}-2x+5=0$을 근의 공식으로 풀면 $x=1\\pm\\sqrt{-4}=1\\pm2i$입니다. 다음 단원에서 판별식으로 근이 실근인지 허근인지 판별하는 방법을 배웁니다.',
      },
    ],

    faq: [
      {
        q: '허수는 실제로 없는 수 아닌가요? 왜 배워요?',
        a: '허수는 길이나 개수처럼 직접 셀 수 있는 양은 아니지만, 계산 규칙이 분명하고 모순이 없는 수입니다. 음수도 처음에는 "없는 수"로 여겨졌지만 지금은 온도·빚처럼 자연스럽게 쓰지요.\n\n복소수를 쓰면 모든 이차방정식이 해를 가지고, 전기·신호·물리 계산이 훨씬 간단해집니다.',
      },
      {
        q: '허수부분은 bi예요, b예요?',
        a: '$b$입니다. 복소수 $a+bi$에서 허수부분은 $i$ 앞에 곱해진 **실수** $b$입니다. 예를 들어 $3-2i$의 허수부분은 $-2$입니다.',
      },
      {
        q: '√(-2)×√(-3)은 왜 √6이 아니에요?',
        a: '$\\sqrt{a}\\sqrt{b}=\\sqrt{ab}$는 $a$, $b$가 음수가 아닐 때 성립하는 성질입니다. 음수의 제곱근은 먼저 $i$로 바꾸어 $\\sqrt{2}i\\times\\sqrt{3}i=\\sqrt{6}i^{2}=-\\sqrt{6}$으로 계산해야 합니다.',
      },
      {
        q: '복소수끼리도 크기를 비교할 수 있나요?',
        a: '허수끼리, 또는 허수와 실수 사이에는 크고 작음을 정하지 않습니다. 예를 들어 $i>0$이라고 하면 양변에 $i$를 곱해 $-1>0$이 되어 모순이 생기고, $i<0$이라고 해도 마찬가지로 모순이 생깁니다. 크기 비교는 실수끼리만 합니다.',
      },
    ],

    mistakes: [
      '$3-2i$의 허수부분을 $-2i$라고 쓰는 실수 — 허수부분은 $i$ 앞의 실수 $-2$입니다.',
      '곱셈에서 $i^{2}$을 $1$로 계산하는 실수 — $i^{2}=-1$이므로 $bdi^{2}=-bd$입니다.',
      '$\\sqrt{-4}\\sqrt{-9}=\\sqrt{36}=6$처럼 음수끼리 근호를 합치는 실수 — 먼저 $2i\\times3i$로 바꾸면 $-6$입니다.',
    ],

    gens: [
      {
        id: 'complex-arith',
        level: 1,
        title: '복소수의 뺄셈과 곱셈',
        make: function (R) {
          var a, b, c, d;
          for (var t = 0; t < 20; t++) {
            a = R.nonzero(-4, 4); b = R.nonzero(-4, 4); c = R.nonzero(-4, 4); d = R.nonzero(-4, 4);
            if (a !== c || b !== d) break;
          }
          if (a === c && b === d) c = a + 1 === 0 ? 2 : a + 1;
          var mulMode = R.bool();
          var re, im, cands, qtex, explain;
          function st(k, s) { var m = Math.abs(k); return (k < 0 ? '-' : '+') + (m === 1 ? '' : m) + s; }
          if (mulMode) {
            re = a * c - b * d; im = a * d + b * c;
            cands = [
              [[a * c + b * d, a * d + b * c], '$i^{2}$을 $1$로 계산했습니다. $i^{2}=-1$입니다.'],
              [[a * c, b * d], '실수부분끼리, 허수부분끼리만 곱했습니다. 분배법칙으로 네 번 곱해야 합니다.'],
              [[a * c - b * d, -(a * d + b * c)], '허수부분의 부호가 틀렸습니다.'],
              [[a * c - b * d, a * d - b * c], '가운데 두 항 중 하나의 부호를 잘못 계산했습니다.'],
            ];
            qtex = '(' + cx(a, b) + ')(' + cx(c, d) + ')';
            var bd = b * d;
            explain = '$i$를 문자처럼 전개하면 $' + qtex + '=' + (a * c) + st(a * d, 'i') + st(b * c, 'i') + st(bd, 'i^{2}') + '$입니다.\n\n' +
              '$i^{2}=-1$이므로 $' + (bd === 1 ? '' : bd === -1 ? '-' : bd) + 'i^{2}=' + (-bd) + '$입니다. 정리하면 $' + cx(re, im) + '$입니다.';
          } else {
            re = a - c; im = b - d;
            cands = [
              [[a - c, b + d], '빼는 수의 허수부분 부호를 바꾸지 않았습니다.'],
              [[a + c, b + d], '두 복소수를 더했습니다.'],
              [[a + c, b - d], '빼는 수의 실수부분 부호를 바꾸지 않았습니다.'],
              [[c - a, d - b], '빼는 순서를 거꾸로 했습니다.'],
            ];
            qtex = '(' + cx(a, b) + ')-(' + cx(c, d) + ')';
            explain = '실수부분끼리 $' + a + '-' + (c < 0 ? '(' + c + ')' : c) + '=' + re + '$, 허수부분끼리 $' + b + '-' + (d < 0 ? '(' + d + ')' : d) + '=' + im + '$이므로 $' + cx(re, im) + '$입니다.';
          }
          var list = uniqByKey(re + ',' + im, cands.map(function (c2) { return [cx(c2[0][0], c2[0][1]), c2[0][0] + ',' + c2[0][1], c2[1]]; }));
          var reason = {};
          list.forEach(function (c2) { reason['$' + c2[0] + '$'] = c2[2]; });
          var pick = R.choices('$' + cx(re, im) + '$', R.shuffle(list).map(function (c2) { return '$' + c2[0] + '$'; }));
          return {
            type: 'choice', concept: 2,
            q: '다음을 계산한 것은 무엇입니까?\n\n$' + qtex + '$',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (ch, i) { return i === pick.answer ? '' : reason[ch] || ''; }),
            explain: explain,
          };
        },
      },
      {
        id: 'complex-divide',
        level: 2,
        title: '복소수의 나눗셈 (분모를 실수로)',
        make: function (R) {
          var F = R.F;
          var p = R.int(-3, 3), q = R.nonzero(-3, 3), c = R.int(1, 3), d = R.nonzero(-3, 3);
          var N = c * c + d * d;
          var nr = p * c - q * d, ni = p * d + q * c;
          function key(re, im) { return F(re).toString() + ',' + F(im).toString(); }
          var cands = [
            [F(p), F(-q), '허수부분의 부호가 틀렸습니다. 분자에 곱하는 켤레복소수와 계산을 다시 확인합니다.'],
            [F(p * N), F(q * N), '분모 $' + N + '$' + R.josa(N, '으로/로') + ' 나누지 않았습니다.'],
          ];
          if (c * c !== d * d) cands.push([F(p * N, c * c - d * d), F(q * N, c * c - d * d), '$i^{2}$을 $1$로 계산하여 분모를 $' + (c * c - d * d) + '$' + R.josa(c * c - d * d, '으로/로') + ' 구했습니다. 분모는 $' + c + '^{2}+' + Math.abs(d) + '^{2}$입니다.']);
          var s2r = c * c - d * d, s2i = 2 * c * d;
          cands.push([F(p * s2r - q * s2i, N), F(p * s2i + q * s2r, N), '켤레복소수 대신 분모와 같은 수를 곱했습니다. 분모의 허수부분 부호를 바꾼 수를 곱합니다.']);
          if (p !== q) cands.push([F(q), F(p), '실수부분과 허수부분을 바꾸어 썼습니다.']);
          cands.push([F(-p), F(-q), '부호가 모두 반대입니다. 분자와 분모에 같은 수를 곱했는지 확인합니다.']);
          cands.push([F(-p), F(q), '실수부분의 부호가 틀렸습니다. 분자의 곱셈에서 $i^{2}=-1$을 다시 확인합니다.']);
          var list = uniqByKey(key(p, q), cands.map(function (c2) { return [cxF(c2[0], c2[1]), c2[0].toString() + ',' + c2[1].toString(), c2[2]]; }));
          var reason = {};
          list.forEach(function (c2) { reason['$' + c2[0] + '$'] = c2[2]; });
          var pick = R.choices('$' + cx(p, q) + '$', R.shuffle(list).map(function (c2) { return '$' + c2[0] + '$'; }));
          var conj = cx(c, -d);
          return {
            type: 'choice', concept: 3,
            q: '다음을 $a+bi$ 꼴로 나타낸 것은 무엇입니까? (단, $a$, $b$는 실수)\n\n$\\frac{' + cx(nr, ni) + '}{' + cx(c, d) + '}$',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (ch, i) { return i === pick.answer ? '' : reason[ch] || ''; }),
            hint: '분모의 켤레복소수를 분모와 분자에 곱합니다.',
            explain: '분모의 켤레복소수 $' + conj + '$' + R.josa(conj, '을/를') + ' 분모와 분자에 곱합니다.\n\n' +
              '분모: $(' + cx(c, d) + ')(' + conj + ')=' + c + '^{2}+' + Math.abs(d) + '^{2}=' + N + '$\n\n' +
              '분자: $(' + cx(nr, ni) + ')(' + conj + ')=' + cx(p * N, q * N) + '$\n\n' +
              '따라서 $\\frac{' + cx(p * N, q * N) + '}{' + N + '}=' + cx(p, q) + '$입니다.',
          };
        },
      },
      {
        id: 'i-power',
        level: 1,
        title: '$i$의 거듭제곱',
        make: function (R) {
          var n = R.int(5, 99);
          var r = n % 4, k = (n - r) / 4;
          var vals = ['1', 'i', '-1', '-i'];
          var why = vals.map(function (v, j) {
            if (j === r) return '';
            return (j === 0 ? '지수가 4의 배수일 때의 값입니다. ' : '지수를 4로 나눈 나머지가 ' + j + '일 때의 값입니다. ') + n + R.josa(n, '을/를') + ' 4로 나눈 나머지는 ' + r + '입니다.';
          });
          return {
            type: 'choice', concept: 4, fixed: true,
            q: '$i^{' + n + '}$의 값은 무엇입니까?',
            choices: vals.map(function (v) { return '$' + v + '$'; }),
            answer: r,
            why: why,
            explain: '$i^{4}=1$이므로 지수를 4로 나눈 나머지만 봅니다. $' + n + '=4\\times' + k + (r === 0 ? '' : '+' + r) + '$이므로 $i^{' + n + '}=(i^{4})^{' + k + '}' + (r === 0 ? '' : '\\cdot i^{' + r + '}') + '=' + vals[r] + '$입니다.',
          };
        },
      },
      {
        id: 'complex-equal',
        level: 2,
        title: '복소수가 서로 같을 조건으로 미지수 구하기',
        make: function (R) {
          var al, be, ga, de, x, y, P, Q, ok = false;
          for (var t = 0; t < 60 && !ok; t++) {
            al = R.int(1, 3); be = R.nonzero(-3, 3); ga = R.nonzero(-3, 3); de = R.nonzero(-3, 3);
            x = R.nonzero(-4, 4); y = R.nonzero(-4, 4);
            P = al * x + ga * y; Q = be * x + de * y;
            ok = al * de - be * ga !== 0 && (P !== 0 || Q !== 0);
          }
          if (!ok) { al = 1; be = 1; ga = 1; de = -1; x = 2; y = 1; P = 3; Q = 1; }
          var det = al * de - be * ga;
          var askSum = R.bool();
          var ask = askSum ? 'x+y' : 'xy';
          var ans = askSum ? x + y : x * y;
          var wrong = [];
          var xs = Q * de - ga * P, ys = al * P - be * Q; // 실수부분과 허수부분을 바꾸어 세운 연립방정식의 해 (× det)
          if (xs % det === 0 && ys % det === 0) {
            var xw = xs / det, yw = ys / det;
            var aw = askSum ? xw + yw : xw * yw;
            if (aw !== ans) wrong.push({ a: String(aw), why: '실수부분과 허수부분을 바꾸어 비교했습니다. 좌변의 실수부분은 $' + lin2(al, ga) + '$입니다.' });
          }
          return {
            type: 'short', check: 'number', concept: 1,
            q: '실수 $x$, $y$에 대하여 $(' + cx(al, be) + ')x+(' + cx(ga, de) + ')y=' + cx(P, Q) + '$일 때, $' + ask + '$의 값을 구하시오.',
            answer: String(ans),
            hint: '좌변을 (실수부분)$+$(허수부분)$i$ 꼴로 정리합니다.',
            wrong: wrong,
            explain: '좌변을 정리하면 $(' + lin2(al, ga) + ')+(' + lin2(be, de) + ')i$입니다.\n\n' +
              '$x$, $y$가 실수이므로 두 복소수가 서로 같을 조건에서 $' + lin2(al, ga) + '=' + P + '$, $' + lin2(be, de) + '=' + Q + '$입니다.\n\n' +
              '연립하여 풀면 $x=' + x + '$, $y=' + y + '$이므로 $' + ask + '=' + ans + '$입니다.',
          };
        },
      },
    ],
  });
})();
