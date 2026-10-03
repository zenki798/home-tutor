/* 미적분Ⅱ · 몫과 합성함수의 미분법
 * 몫의 미분법, xⁿ(n 은 정수)의 도함수, tan·sec·csc·cot 의 도함수, 합성함수의 미분법,
 * xʳ(r 은 실수)의 도함수와 로그미분법. (매개변수·음함수·역함수의 미분은 다음 단원) */
(function () {
  // 분수(Frac) → TeX. 음수면 앞에 -
  function tex(R, f) { return R.fmt.frac(f); }
  // 값이 같은 것을 빼고, 정답과 값이 같은 틀린 답도 뺀다
  function cleanWrong(R, ans, list) {
    var seen = {}, out = [];
    seen[R.F(0).add(ans).toString()] = true;
    list.forEach(function (w) {
      var k = R.F(0).add(w.a).toString();
      if (seen[k]) return;
      seen[k] = true;
      out.push({ a: k, why: w.why });
    });
    return out;
  }

  Tutor.registerUnit({
    id: 'math-h-calc2-05',
    course: 'math-h-calc2',
    title: '몫과 합성함수의 미분법',
    summary: '함수의 몫을 미분하는 방법과 합성함수의 미분법을 익혀, 유리함수·삼각함수·지수함수·로그함수가 섞인 여러 가지 함수를 미분합니다.',
    goals: [
      '몫의 미분법을 이해하고, 이를 이용하여 함수를 미분할 수 있다.',
      '$n$이 정수일 때 $y=x^n$의 도함수와 $\\tan x$, $\\sec x$, $\\csc x$, $\\cot x$의 도함수를 구할 수 있다.',
      '합성함수의 미분법을 이해하고, 이를 이용하여 함수를 미분할 수 있다.',
      '$r$이 실수일 때 $y=x^r$의 도함수를 구하고, 로그미분법을 이용하여 함수를 미분할 수 있다.',
    ],
    standards: ['[12미적Ⅱ-02-04]', '[12미적Ⅱ-02-05]'],

    concepts: [
      {
        title: '몫의 미분법',
        body: '두 함수 $f(x)$, $g(x)$가 미분가능하고 $g(x) \\ne 0$일 때\n\n$\\left\\{\\dfrac{f(x)}{g(x)}\\right\\}\'=\\dfrac{f\'(x)g(x)-f(x)g\'(x)}{\\{g(x)\\}^2}$\n\n특히 분자가 1이면 $\\left\\{\\dfrac{1}{g(x)}\\right\\}\'=-\\dfrac{g\'(x)}{\\{g(x)\\}^2}$입니다.\n\n**까닭** 먼저 $\\dfrac{1}{g(x)}$을 도함수의 정의로 미분합니다.\n\n$\\dfrac{1}{h}\\left\\{\\dfrac{1}{g(x+h)}-\\dfrac{1}{g(x)}\\right\\}=-\\dfrac{g(x+h)-g(x)}{h}\\cdot\\dfrac{1}{g(x+h)g(x)}$\n\n$h \\to 0$이면 이 값은 $-g\'(x)\\cdot\\dfrac{1}{\\{g(x)\\}^2}$에 가까워집니다. 그다음 $\\dfrac{f}{g}=f\\cdot\\dfrac{1}{g}$에 곱의 미분법을 쓰면 $f\'\\cdot\\dfrac{1}{g}+f\\cdot\\left(-\\dfrac{g\'}{g^2}\\right)=\\dfrac{f\'g-fg\'}{g^2}$이 됩니다.\n\n**예** $\\left(\\dfrac{x}{x^2+1}\\right)\'=\\dfrac{1\\cdot(x^2+1)-x\\cdot 2x}{(x^2+1)^2}=\\dfrac{1-x^2}{(x^2+1)^2}$\n\n> ⚠️ 분자는 뺄셈이라 순서가 중요합니다. **(분자의 도함수)×(분모) − (분자)×(분모의 도함수)** 순서를 바꾸면 부호가 반대가 됩니다.',
        easy: '곱의 미분법 $(fg)\'=f\'g+fg\'$와 나란히 놓고 보면 쉽습니다. 몫의 미분법은 덧셈이 뺄셈으로 바뀌고, 분모의 제곱으로 나눈다는 것만 다릅니다.\n\n"위를 미분해서 아래를 곱하고, 위에 아래를 미분해서 곱한 것을 빼고, 아래의 제곱으로 나눈다"라고 소리 내어 몇 번 읽어 두면 순서를 헷갈리지 않습니다.\n\n| | 공식 |\n|---|---|\n| 곱 | $(fg)\'=f\'g+fg\'$ |\n| 몫 | $\\left(\\dfrac{f}{g}\\right)\'=\\dfrac{f\'g-fg\'}{g^2}$ |',
        check: {
          type: 'choice',
          q: '함수 $y=\\dfrac{1}{x^2+1}$의 도함수는 어느 것입니까?',
          choices: ['$\\dfrac{2x}{(x^2+1)^2}$', '$-\\dfrac{2x}{(x^2+1)^2}$', '$\\dfrac{1}{2x}$'],
          answer: 1,
          why: [
            '부호를 빠뜨렸습니다. $\\left(\\dfrac{1}{g}\\right)\'=-\\dfrac{g\'}{g^2}$에는 마이너스가 붙습니다.',
            '',
            '분모만 미분해서 뒤집었습니다. 분자와 분모를 따로 미분하면 안 되고, 몫의 미분법을 써야 합니다.',
          ],
          explain: '$g(x)=x^2+1$이면 $g\'(x)=2x$이므로 $\\left(\\dfrac{1}{x^2+1}\\right)\'=-\\dfrac{2x}{(x^2+1)^2}$입니다.',
        },
      },
      {
        title: '$y=x^n$ ($n$은 정수)의 도함수',
        body: '미적분Ⅰ에서 $n$이 양의 정수일 때 $(x^n)\'=nx^{n-1}$임을 배웠습니다. 이 공식은 $n$이 **0이나 음의 정수**일 때도 그대로 성립합니다($x \\ne 0$).\n\n- $n=0$: $x^0=1$이므로 도함수는 $0=0\\cdot x^{-1}$입니다.\n- $n=-m$ ($m$은 양의 정수): $x^{-m}=\\dfrac{1}{x^m}$에 몫의 미분법을 쓰면\n\n$\\left(\\dfrac{1}{x^m}\\right)\'=-\\dfrac{mx^{m-1}}{x^{2m}}=-mx^{-m-1}$\n\n이고, 이것은 $nx^{n-1}$에 $n=-m$을 넣은 것과 같습니다.\n\n따라서 **$n$이 정수이면 $(x^n)\'=nx^{n-1}$** 입니다.\n\n**예** $\\left(\\dfrac{1}{x}\\right)\'=(x^{-1})\'=-x^{-2}=-\\dfrac{1}{x^2}$, $\\left(\\dfrac{2}{x^3}\\right)\'=(2x^{-3})\'=-6x^{-4}=-\\dfrac{6}{x^4}$\n\n> 💡 분모에 $x$의 거듭제곱만 있으면 음의 지수로 바꾸어 미분하는 것이 몫의 미분법보다 빠릅니다.',
        easy: '규칙은 양의 정수일 때와 똑같습니다. "지수를 앞으로 내려 곱하고, 지수에서 1을 뺀다."\n\n다만 음수에서 1을 빼면 절댓값이 커진다는 것만 조심하면 됩니다. $x^{-2}$을 미분하면 지수가 $-2-1=-3$이 되어 $-2x^{-3}$이 됩니다. $-1$이 되는 것이 아닙니다.\n\n그림의 곡선 $y=\\dfrac{1}{x}$은 어디서나 오른쪽 아래로 내려갑니다. 도함수 $-\\dfrac{1}{x^2}$이 늘 음수이기 때문입니다.',
        fig: {
          type: 'coord', xmin: -4, xmax: 4, ymin: -4, ymax: 4,
          fns: [{ expr: '1/x', from: -4, to: -0.25 }, { expr: '1/x', from: 0.25, to: 4, label: 'y=1/x' }],
          alt: '곡선 y=1/x. x<0인 부분과 x>0인 부분 모두 오른쪽으로 갈수록 내려간다',
        },
        check: {
          type: 'short', check: 'expr',
          q: '함수 $f(x)=\\dfrac{1}{x^2}$의 도함수 $f\'(x)$를 구하십시오. (식으로 답합니다. 예: 5/x^4)',
          answer: '-2/x^3',
          wrong: [
            { a: '-2/x', why: '지수 $-2$에서 1을 빼면 $-3$입니다. $-1$이 아닙니다.' },
            { a: '1/(2x)', why: '분모만 미분해서 뒤집었습니다. $\\dfrac{1}{x^2}=x^{-2}$으로 바꾸어 미분합니다.' },
            { a: '2/x^3', why: '부호를 빠뜨렸습니다. 지수 $-2$를 앞으로 내리면 음수가 곱해집니다.' },
          ],
          explain: '$\\dfrac{1}{x^2}=x^{-2}$이므로 $f\'(x)=-2x^{-3}=-\\dfrac{2}{x^3}$입니다.',
        },
      },
      {
        title: '$\\tan x$, $\\sec x$, $\\csc x$, $\\cot x$의 도함수',
        body: '코사인·사인·탄젠트의 역수를 다음과 같이 나타냅니다.\n\n$\\sec x=\\dfrac{1}{\\cos x}$ (시컨트), $\\csc x=\\dfrac{1}{\\sin x}$ (코시컨트), $\\cot x=\\dfrac{1}{\\tan x}=\\dfrac{\\cos x}{\\sin x}$ (코탄젠트)\n\n$(\\sin x)\'=\\cos x$, $(\\cos x)\'=-\\sin x$와 몫의 미분법을 쓰면 다음을 얻습니다.\n\n| 함수 | 도함수 |\n|---|---|\n| $\\tan x$ | $\\sec^2 x$ |\n| $\\cot x$ | $-\\csc^2 x$ |\n| $\\sec x$ | $\\sec x\\tan x$ |\n| $\\csc x$ | $-\\csc x\\cot x$ |\n\n**예** $(\\tan x)\'=\\left(\\dfrac{\\sin x}{\\cos x}\\right)\'=\\dfrac{\\cos x\\cdot\\cos x-\\sin x\\cdot(-\\sin x)}{\\cos^2 x}=\\dfrac{1}{\\cos^2 x}=\\sec^2 x$\n\n$(\\sec x)\'=\\left(\\dfrac{1}{\\cos x}\\right)\'=-\\dfrac{-\\sin x}{\\cos^2 x}=\\dfrac{1}{\\cos x}\\cdot\\dfrac{\\sin x}{\\cos x}=\\sec x\\tan x$\n\n> 💡 이름에 "코"가 붙은 함수($\\cos x$, $\\cot x$, $\\csc x$)의 도함수에는 마이너스가 붙습니다.',
        easy: '네 공식을 따로 외우기보다 짝으로 기억하면 편합니다.\n\n- 탄젠트와 시컨트가 한 짝: $(\\tan x)\'=\\sec^2 x$, $(\\sec x)\'=\\sec x\\tan x$\n- 코탄젠트와 코시컨트가 한 짝: 위의 두 식에서 이름에 "코"를 붙이고 마이너스를 붙이면 됩니다.\n\n잊어버렸다면 언제든 $\\sin x$, $\\cos x$로 바꾸어 몫의 미분법으로 다시 구할 수 있습니다.',
        check: {
          type: 'ox',
          q: '$(\\cot x)\'=\\csc^2 x$입니다.',
          answer: false,
          explain: '$\\cot x=\\dfrac{\\cos x}{\\sin x}$를 미분하면 $\\dfrac{-\\sin^2 x-\\cos^2 x}{\\sin^2 x}=-\\dfrac{1}{\\sin^2 x}$이므로 $(\\cot x)\'=-\\csc^2 x$입니다. 마이너스가 붙습니다.',
        },
      },
      {
        title: '합성함수의 미분법',
        body: '두 함수 $y=f(u)$, $u=g(x)$가 미분가능하면 합성함수 $y=f(g(x))$도 미분가능하고\n\n$\\dfrac{dy}{dx}=\\dfrac{dy}{du}\\cdot\\dfrac{du}{dx}$, 곧 $\\{f(g(x))\\}\'=f\'(g(x))\\,g\'(x)$\n\n입니다. 이를 **합성함수의 미분법**이라고 합니다.\n\n**까닭** $x$의 증분 $\\Delta x$에 대한 $u$의 증분을 $\\Delta u$, $y$의 증분을 $\\Delta y$라 하면 ($\\Delta u \\ne 0$일 때) $\\dfrac{\\Delta y}{\\Delta x}=\\dfrac{\\Delta y}{\\Delta u}\\cdot\\dfrac{\\Delta u}{\\Delta x}$이고, $g(x)$가 연속이므로 $\\Delta x \\to 0$이면 $\\Delta u \\to 0$입니다.\n\n**예**\n\n- $y=(3x+1)^4$: $4(3x+1)^3\\cdot 3=12(3x+1)^3$\n- $y=\\sin x^2$: $\\cos x^2\\cdot 2x=2x\\cos x^2$\n- $y=e^{2x}$: $e^{2x}\\cdot 2=2e^{2x}$\n\n> 💡 **겉 함수를 미분하고(속은 그대로 둔 채), 속 함수의 도함수를 곱한다**고 기억합니다.',
        easy: '맞물린 톱니바퀴 세 개를 떠올려 보십시오. 첫째 바퀴가 1바퀴 돌 때 둘째 바퀴는 3바퀴, 둘째 바퀴가 1바퀴 돌 때 셋째 바퀴는 2바퀴 돈다면, 첫째 바퀴가 1바퀴 돌 때 셋째 바퀴는 $3\\times 2=6$바퀴 돕니다.\n\n변화율도 이렇게 곱해집니다. $x$가 변할 때 $u$가 변하는 빠르기 $\\dfrac{du}{dx}$와, $u$가 변할 때 $y$가 변하는 빠르기 $\\dfrac{dy}{du}$를 곱하면 $x$에 대한 $y$의 변화율이 됩니다.',
        check: {
          type: 'choice',
          q: '함수 $y=(x^2+1)^3$의 도함수는 어느 것입니까?',
          choices: ['$3(x^2+1)^2$', '$6x(x^2+1)^2$', '$6x(x^2+1)^3$'],
          answer: 1,
          why: [
            '속 함수 $x^2+1$의 도함수 $2x$를 곱하지 않았습니다.',
            '',
            '지수를 앞으로 내린 뒤 지수에서 1을 빼지 않았습니다.',
          ],
          explain: '겉 함수 $u^3$을 미분하면 $3u^2$, 속 함수 $u=x^2+1$의 도함수는 $2x$이므로 $y\'=3(x^2+1)^2\\cdot 2x=6x(x^2+1)^2$입니다.',
        },
      },
      {
        title: '$y=x^r$ ($r$은 실수)의 도함수와 로그미분법',
        body: '$x>0$이고 $r$이 실수일 때 $x^r=e^{r\\ln x}$이므로, 합성함수의 미분법으로\n\n$(x^r)\'=e^{r\\ln x}\\cdot\\dfrac{r}{x}=x^r\\cdot\\dfrac{r}{x}=rx^{r-1}$\n\n입니다. 지수가 분수나 무리수여도 공식은 같습니다.\n\n**예** $(\\sqrt{x})\'=\\left(x^{\\frac{1}{2}}\\right)\'=\\dfrac{1}{2}x^{-\\frac{1}{2}}=\\dfrac{1}{2\\sqrt{x}}$, $(x^{\\sqrt{2}})\'=\\sqrt{2}\\,x^{\\sqrt{2}-1}$\n\n**로그미분법** 곱·몫·거듭제곱이 얽힌 함수나 $x^x$처럼 밑과 지수에 모두 $x$가 있는 함수는, 양변에 절댓값을 씌워 자연로그를 취한 뒤 미분하면 편합니다. 이때 다음을 씁니다.\n\n$(\\ln|x|)\'=\\dfrac{1}{x}$, $\\{\\ln|f(x)|\\}\'=\\dfrac{f\'(x)}{f(x)}$\n\n**예** $y=x^x$ ($x>0$): $\\ln y=x\\ln x$의 양변을 미분하면 $\\dfrac{y\'}{y}=\\ln x+1$이므로 $y\'=x^x(\\ln x+1)$\n\n> ⚠️ $x^x$은 지수가 고정된 거듭제곱 꼴($x^r$)도, 밑이 고정된 지수함수 꼴($a^x$)도 아니므로 두 공식 어느 것도 바로 쓸 수 없습니다.',
        easy: '로그는 곱을 합으로, 몫을 차로, 거듭제곱을 곱으로 바꿔 줍니다. 그래서 복잡하게 곱하고 나눈 식도 로그를 취하면 덧셈·뺄셈만 남아 미분하기 쉬워집니다.\n\n순서는 늘 같습니다.\n\n1. 양변에 자연로그를 취합니다.\n2. 양변을 $x$에 대하여 미분합니다. 왼쪽은 $\\dfrac{y\'}{y}$가 됩니다.\n3. 양변에 $y$를 곱합니다.',
        check: {
          type: 'ox',
          q: '$x>0$일 때 $(x^{\\pi})\'=\\pi x^{\\pi-1}$입니다.',
          answer: true,
          explain: '$r$이 실수이면 $(x^r)\'=rx^{r-1}$이 성립합니다. $\\pi$도 실수이므로 $(x^{\\pi})\'=\\pi x^{\\pi-1}$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '함수 $y=\\dfrac{x^2+1}{x-1}$의 도함수를 구하십시오.',
        steps: [
          '분자 $f(x)=x^2+1$, 분모 $g(x)=x-1$이라 하면 $f\'(x)=2x$, $g\'(x)=1$입니다.',
          '몫의 미분법으로 $y\'=\\dfrac{2x(x-1)-(x^2+1)\\cdot 1}{(x-1)^2}$입니다.',
          '분자를 정리하면 $2x^2-2x-x^2-1=x^2-2x-1$입니다.',
        ],
        answer: '$y\'=\\dfrac{x^2-2x-1}{(x-1)^2}$',
      },
      {
        q: '함수 $f(x)=\\sqrt{x^2+3}$에 대하여 $f\'(1)$의 값을 구하십시오.',
        steps: [
          '$f(x)=(x^2+3)^{\\frac{1}{2}}$로 봅니다. 겉 함수는 $u^{\\frac{1}{2}}$, 속 함수는 $u=x^2+3$입니다.',
          '$f\'(x)=\\dfrac{1}{2}(x^2+3)^{-\\frac{1}{2}}\\cdot 2x=\\dfrac{x}{\\sqrt{x^2+3}}$',
          '$f\'(1)=\\dfrac{1}{\\sqrt{4}}=\\dfrac{1}{2}$',
        ],
        answer: '$\\dfrac{1}{2}$',
      },
      {
        q: '함수 $y=x^{\\sin x}$ ($x>0$)의 도함수를 구하십시오.',
        steps: [
          '밑과 지수에 모두 $x$가 있으므로 로그미분법을 씁니다. 양변에 자연로그를 취하면 $\\ln y=\\sin x\\ln x$입니다.',
          '양변을 $x$에 대하여 미분합니다. 오른쪽은 곱의 미분법으로 $\\cos x\\ln x+\\sin x\\cdot\\dfrac{1}{x}$입니다.',
          '$\\dfrac{y\'}{y}=\\cos x\\ln x+\\dfrac{\\sin x}{x}$이므로 양변에 $y=x^{\\sin x}$을 곱합니다.',
        ],
        answer: '$y\'=x^{\\sin x}\\left(\\cos x\\ln x+\\dfrac{\\sin x}{x}\\right)$',
      },
    ],

    terms: [
      { term: '몫의 미분법', def: '$\\left\\{\\dfrac{f(x)}{g(x)}\\right\\}\'=\\dfrac{f\'(x)g(x)-f(x)g\'(x)}{\\{g(x)\\}^2}$ ($g(x) \\ne 0$)으로 두 함수의 몫을 미분하는 방법입니다.' },
      { term: '시컨트 함수', def: '$\\sec x=\\dfrac{1}{\\cos x}$로 정의한 함수입니다. 도함수는 $\\sec x\\tan x$입니다.' },
      { term: '코시컨트 함수', def: '$\\csc x=\\dfrac{1}{\\sin x}$로 정의한 함수입니다. 도함수는 $-\\csc x\\cot x$입니다.' },
      { term: '코탄젠트 함수', def: '$\\cot x=\\dfrac{1}{\\tan x}=\\dfrac{\\cos x}{\\sin x}$로 정의한 함수입니다. 도함수는 $-\\csc^2 x$입니다.' },
      { term: '합성함수의 미분법', def: '$y=f(u)$, $u=g(x)$일 때 $\\dfrac{dy}{dx}=\\dfrac{dy}{du}\\cdot\\dfrac{du}{dx}$, 곧 $\\{f(g(x))\\}\'=f\'(g(x))g\'(x)$로 미분하는 방법입니다. 연쇄법칙이라고도 합니다.' },
      { term: '로그미분법', def: '양변에 (절댓값을 씌워) 자연로그를 취한 뒤 미분하여 도함수를 구하는 방법입니다. 곱·몫·거듭제곱이 얽힌 함수나 $x^x$ 꼴의 함수에 씁니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '함수 $y=\\dfrac{x}{x+1}$의 도함수는 어느 것입니까?',
        choices: ['$\\dfrac{2x+1}{(x+1)^2}$', '$\\dfrac{1}{(x+1)^2}$', '$-\\dfrac{1}{(x+1)^2}$', '$1$'],
        answer: 1,
        why: [
          '분자를 $f\'g+fg\'$처럼 더했습니다. 몫의 미분법의 분자는 $f\'g-fg\'$입니다.',
          '',
          '분자의 순서를 바꾸어 $fg\'-f\'g$로 계산했습니다. 그러면 부호가 반대가 됩니다.',
          '분자와 분모를 따로 미분해 $\\dfrac{1}{1}$로 계산했습니다. 몫은 그렇게 미분할 수 없습니다.',
        ],
        explain: '$y\'=\\dfrac{1\\cdot(x+1)-x\\cdot 1}{(x+1)^2}=\\dfrac{1}{(x+1)^2}$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'expr', concept: 1,
        q: '함수 $f(x)=\\dfrac{1}{x^3}$의 도함수 $f\'(x)$를 구하십시오. (식으로 답합니다. 예: 5/x^2)',
        answer: '-3/x^4',
        wrong: [
          { a: '-3/x^2', why: '지수 $-3$에서 1을 빼면 $-4$입니다. $-2$가 아닙니다.' },
          { a: '1/(3x^2)', why: '분모만 미분해서 뒤집었습니다. $\\dfrac{1}{x^3}=x^{-3}$으로 바꾸어 미분합니다.' },
          { a: '3/x^4', why: '부호를 빠뜨렸습니다. 지수 $-3$을 앞으로 내리면 음수가 곱해집니다.' },
        ],
        explain: '$\\dfrac{1}{x^3}=x^{-3}$이므로 $f\'(x)=-3x^{-4}=-\\dfrac{3}{x^4}$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 1,
        q: '함수 $y=x^{-2}$의 도함수는 $y\'=-2x^{-1}$입니다.',
        answer: false,
        explain: '지수에서 1을 빼면 $-2-1=-3$이므로 $y\'=-2x^{-3}=-\\dfrac{2}{x^3}$입니다. 음의 지수에서 1을 빼면 절댓값이 커집니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 2,
        q: '$(\\tan x)\'=\\sec^2 x$입니다.',
        answer: true,
        explain: '$\\tan x=\\dfrac{\\sin x}{\\cos x}$에 몫의 미분법을 쓰면 $\\dfrac{\\cos^2 x+\\sin^2 x}{\\cos^2 x}=\\dfrac{1}{\\cos^2 x}=\\sec^2 x$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '함수 $y=\\csc x$의 도함수는 어느 것입니까?',
        choices: ['$\\csc x\\cot x$', '$-\\csc^2 x$', '$-\\csc x\\cot x$', '$\\sec x\\tan x$'],
        answer: 2,
        why: [
          '부호를 빠뜨렸습니다. $\\csc x=\\dfrac{1}{\\sin x}$을 미분하면 $-\\dfrac{\\cos x}{\\sin^2 x}$로 마이너스가 붙습니다.',
          '$\\cot x$의 도함수와 헷갈렸습니다. $(\\cot x)\'=-\\csc^2 x$입니다.',
          '',
          '$\\sec x$의 도함수입니다. $\\csc x$는 $\\sin x$의 역수입니다.',
        ],
        explain: '$(\\csc x)\'=\\left(\\dfrac{1}{\\sin x}\\right)\'=-\\dfrac{\\cos x}{\\sin^2 x}=-\\dfrac{1}{\\sin x}\\cdot\\dfrac{\\cos x}{\\sin x}=-\\csc x\\cot x$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 3,
        q: '함수 $f(x)=(2x-3)^4$에 대하여 $f\'(2)$의 값을 구하십시오.',
        answer: '8',
        wrong: [
          { a: '4', why: '속 함수 $2x-3$의 도함수 2를 곱하지 않았습니다.' },
          { a: '1', why: '함숫값 $f(2)$를 구했습니다. 먼저 도함수를 구한 뒤 대입합니다.' },
        ],
        explain: '$f\'(x)=4(2x-3)^3\\cdot 2=8(2x-3)^3$이므로 $f\'(2)=8\\cdot 1^3=8$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '함수 $y=\\cos 3x$의 도함수는 어느 것입니까?',
        choices: ['$3\\sin 3x$', '$-\\sin 3x$', '$-3\\sin x$', '$-3\\sin 3x$'],
        answer: 3,
        why: [
          '$(\\cos u)\'=-\\sin u$의 마이너스를 빠뜨렸습니다.',
          '속 함수 $3x$의 도함수 3을 곱하지 않았습니다.',
          '겉 함수를 미분할 때 속 함수 $3x$는 그대로 두어야 합니다. $\\sin x$가 아니라 $\\sin 3x$입니다.',
          '',
        ],
        explain: '겉 함수 $\\cos u$의 도함수는 $-\\sin u$, 속 함수 $u=3x$의 도함수는 3이므로 $y\'=-\\sin 3x\\cdot 3=-3\\sin 3x$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 0,
        q: '함수 $f(x)=\\dfrac{x^2+3}{x+1}$에 대하여 $f\'(0)$의 값을 구하십시오.',
        answer: '-3',
        hint: '몫의 미분법으로 $f\'(x)$를 구한 뒤 $x=0$을 대입합니다.',
        wrong: [
          { a: '3', why: '분자의 순서를 바꾸어 계산했습니다. $f\'g-fg\'$ 순서로 뺍니다.' },
          { a: '0', why: '분자와 분모를 따로 미분해 $\\dfrac{2x}{1}$에 대입했습니다. 몫은 몫의 미분법으로 미분합니다.' },
        ],
        explain: '$f\'(x)=\\dfrac{2x(x+1)-(x^2+3)}{(x+1)^2}=\\dfrac{x^2+2x-3}{(x+1)^2}$이므로 $f\'(0)=\\dfrac{-3}{1}=-3$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
        q: '함수 $f(x)=x\\sqrt{x}$에 대하여 $f\'(4)$의 값을 구하십시오.',
        answer: '3',
        hint: '$x\\sqrt{x}$를 $x$의 거듭제곱 하나로 나타내 봅니다.',
        wrong: [
          { a: '12', why: '지수를 앞으로 내린 뒤 지수에서 1을 빼지 않았습니다. $\\dfrac{3}{2}x^{\\frac{1}{2}}$에 대입해야 합니다.' },
          { a: '8', why: '함숫값 $f(4)=4\\sqrt{4}$를 구했습니다.' },
        ],
        explain: '$x\\sqrt{x}=x^{\\frac{3}{2}}$이므로 $f\'(x)=\\dfrac{3}{2}x^{\\frac{1}{2}}=\\dfrac{3}{2}\\sqrt{x}$입니다. 따라서 $f\'(4)=\\dfrac{3}{2}\\cdot 2=3$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 3,
        q: '함수 $f(x)=e^{x^2-2x}$에 대하여 $f\'(2)$의 값을 구하십시오.',
        answer: '2',
        hint: '겉 함수는 $e^u$, 속 함수는 $u=x^2-2x$입니다.',
        wrong: [
          { a: '1', why: '겉 함수의 도함수 $e^{x^2-2x}$에만 대입했습니다. 속 함수의 도함수 $2x-2$를 곱해야 합니다.' },
        ],
        explain: '$f\'(x)=e^{x^2-2x}\\cdot(2x-2)$이므로 $f\'(2)=e^{0}\\cdot 2=2$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 3,
        q: '$\\cos x>0$인 범위에서 함수 $y=\\ln(\\cos x)$의 도함수는 어느 것입니까?',
        choices: ['$\\tan x$', '$-\\tan x$', '$\\dfrac{1}{\\cos x}$', '$-\\cot x$'],
        answer: 1,
        why: [
          '$(\\cos x)\'=-\\sin x$의 마이너스를 빠뜨렸습니다.',
          '',
          '속 함수 $\\cos x$의 도함수를 곱하지 않았습니다. $(\\ln u)\'=\\dfrac{u\'}{u}$입니다.',
          '분자와 분모를 바꾸어 $\\dfrac{u}{u\'}$로 계산했습니다. $\\dfrac{u\'}{u}=\\dfrac{-\\sin x}{\\cos x}$입니다.',
        ],
        explain: '$\\{\\ln f(x)\\}\'=\\dfrac{f\'(x)}{f(x)}$이므로 $y\'=\\dfrac{-\\sin x}{\\cos x}=-\\tan x$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 4,
        q: '함수 $y=x^x$ ($x>0$)의 도함수는 어느 것입니까?',
        choices: ['$x\\cdot x^{x-1}$', '$x^x\\ln x$', '$x^x(\\ln x+1)$', '$\\ln x+1$'],
        answer: 2,
        why: [
          '거듭제곱 공식 $(x^r)\'=rx^{r-1}$을 썼습니다. 이 공식은 지수 $r$이 상수일 때만 쓸 수 있습니다.',
          '지수함수 공식 $(a^x)\'=a^x\\ln a$를 썼습니다. 이 공식은 밑 $a$가 상수일 때만 쓸 수 있습니다.',
          '',
          '$\\dfrac{y\'}{y}$를 구하고 양변에 $y$를 곱하는 것을 빠뜨렸습니다.',
        ],
        explain: '$\\ln y=x\\ln x$의 양변을 미분하면 $\\dfrac{y\'}{y}=\\ln x+x\\cdot\\dfrac{1}{x}=\\ln x+1$이므로 $y\'=x^x(\\ln x+1)$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 0,
        q: '미분가능한 함수 $g(x)$에 대하여 $g(2)=4$, $g\'(2)=3$입니다. $f(x)=\\dfrac{g(x)}{x}$일 때 $f\'(2)$의 값을 구하십시오.',
        answer: '1/2',
        hint: '분자가 $g(x)$, 분모가 $x$인 몫입니다.',
        wrong: [
          { a: '5/2', why: '분자를 $g\'(x)\\cdot x+g(x)\\cdot 1$로 더했습니다. 몫의 미분법은 뺄셈입니다.' },
          { a: '-1/2', why: '분자의 순서를 바꾸었습니다. $g\'(x)\\cdot x-g(x)\\cdot 1$ 순서로 뺍니다.' },
          { a: '3', why: '분자와 분모를 따로 미분해 $\\dfrac{g\'(2)}{1}$로 계산했습니다.' },
        ],
        explain: '$f\'(x)=\\dfrac{g\'(x)\\cdot x-g(x)\\cdot 1}{x^2}$이므로 $f\'(2)=\\dfrac{3\\cdot 2-4}{4}=\\dfrac{2}{4}=\\dfrac{1}{2}$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 3,
        q: '미분가능한 함수 $f(x)$가 모든 실수 $x$에 대하여 $f(2x-1)=x^3+x$를 만족시킵니다. $f\'(1)$의 값을 구하십시오.',
        answer: '2',
        hint: '양변을 $x$에 대하여 미분하면 왼쪽은 합성함수의 미분법을 써야 합니다. $2x-1=1$이 되는 $x$를 찾습니다.',
        wrong: [
          { a: '4', why: '왼쪽을 미분할 때 속 함수 $2x-1$의 도함수 2를 곱하지 않았습니다.' },
        ],
        explain: '양변을 $x$에 대하여 미분하면 $2f\'(2x-1)=3x^2+1$입니다. $2x-1=1$, 곧 $x=1$을 대입하면 $2f\'(1)=4$이므로 $f\'(1)=2$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 3,
        q: '미분가능한 함수 $f(x)$에 대하여 $f\'(2)=3$입니다. $g(x)=f(x^3+x)$일 때 $g\'(1)$의 값을 구하십시오.',
        answer: '12',
        hint: '$x=1$일 때 속 함수 $x^3+x$의 값이 얼마인지 먼저 봅니다.',
        wrong: [
          { a: '3', why: '속 함수 $x^3+x$의 도함수를 곱하지 않았습니다.' },
          { a: '4', why: '속 함수의 미분계수만 구했습니다. 겉 함수의 미분계수 $f\'(2)$도 곱합니다.' },
        ],
        explain: '$g\'(x)=f\'(x^3+x)\\cdot(3x^2+1)$입니다. $x=1$이면 $x^3+x=2$이므로 $g\'(1)=f\'(2)\\cdot 4=3\\cdot 4=12$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 4,
        q: '함수 $y=\\dfrac{(x+1)^3}{(x^2+1)^2}$에 대하여 $x=0$에서의 미분계수를 구하십시오.',
        answer: '3',
        hint: '로그미분법을 쓰면 곱과 몫이 합과 차로 바뀝니다.',
        wrong: [
          { a: '1', why: '$x=0$에서의 함숫값을 구했습니다. 미분계수는 도함수에 대입한 값입니다.' },
        ],
        explain: '양변에 절댓값을 씌워 자연로그를 취하면 $\\ln|y|=3\\ln|x+1|-2\\ln(x^2+1)$입니다. 미분하면 $\\dfrac{y\'}{y}=\\dfrac{3}{x+1}-\\dfrac{4x}{x^2+1}$입니다.\n\n$x=0$에서 $y=1$, $\\dfrac{y\'}{y}=3-0=3$이므로 미분계수는 $1\\cdot 3=3$입니다. (몫의 미분법으로 계산해도 같습니다.)',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'expr', concept: 2,
        q: '함수 $f(x)=\\tan\\dfrac{\\pi x}{4}$에 대하여 $\\lim_{h \\to 0}\\dfrac{f(1+h)-f(1)}{h}$의 값을 구하십시오. (답은 $\\pi$를 써서 나타냅니다. 예: π/3)',
        answer: 'pi/2',
        hint: '주어진 극한은 $f\'(1)$입니다.',
        wrong: [
          { a: '2', why: '속 함수 $\\dfrac{\\pi x}{4}$의 도함수 $\\dfrac{\\pi}{4}$를 곱하지 않았습니다.' },
          { a: 'pi/4', why: '$\\sec^2\\dfrac{\\pi}{4}$를 1로 계산했습니다. $\\cos\\dfrac{\\pi}{4}=\\dfrac{\\sqrt{2}}{2}$이므로 $\\sec^2\\dfrac{\\pi}{4}=2$입니다.' },
        ],
        explain: '주어진 극한은 $f\'(1)$입니다. $f\'(x)=\\sec^2\\dfrac{\\pi x}{4}\\cdot\\dfrac{\\pi}{4}$이고 $\\sec^2\\dfrac{\\pi}{4}=\\dfrac{1}{\\cos^2\\frac{\\pi}{4}}=2$이므로 $f\'(1)=2\\cdot\\dfrac{\\pi}{4}=\\dfrac{\\pi}{2}$입니다.',
      },
      {
        id: 'a6', level: 3, type: 'choice', concept: 4,
        q: '$x>0$일 때 함수 $f(x)=x^{\\ln x}$의 도함수는 어느 것입니까?',
        choices: ['$(\\ln x)\\,x^{\\ln x-1}$', '$x^{\\ln x}\\ln x$', '$\\dfrac{2\\ln x}{x}$', '$\\dfrac{2\\ln x}{x}\\,x^{\\ln x}$'],
        answer: 3,
        why: [
          '지수 $\\ln x$를 상수처럼 보고 거듭제곱 공식을 썼습니다. 지수에도 $x$가 있으므로 로그미분법을 씁니다.',
          '밑 $x$를 상수처럼 보고 지수함수 공식 $(a^x)\'=a^x\\ln a$를 그대로 썼습니다. 밑에도 지수에도 $x$가 있으므로 로그미분법을 씁니다.',
          '$\\dfrac{f\'(x)}{f(x)}$까지만 구했습니다. 양변에 $f(x)$를 곱해야 합니다.',
          '',
        ],
        hint: '양변에 자연로그를 취하면 $\\ln f(x)=(\\ln x)^2$입니다.',
        explain: '$\\ln f(x)=\\ln x\\cdot\\ln x=(\\ln x)^2$의 양변을 미분하면 $\\dfrac{f\'(x)}{f(x)}=2\\ln x\\cdot\\dfrac{1}{x}$입니다. 따라서 $f\'(x)=\\dfrac{2\\ln x}{x}\\,x^{\\ln x}$입니다.',
      },
    ],

    deeper: [
      {
        title: '$\\dfrac{dy}{du}\\cdot\\dfrac{du}{dx}$는 약분일까?',
        body: '$\\dfrac{dy}{dx}=\\dfrac{dy}{du}\\cdot\\dfrac{du}{dx}$를 보면 분수의 약분처럼 $du$가 지워지는 것 같습니다. 라이프니츠가 이런 기호를 만든 덕분에 공식을 기억하기 쉽습니다.\n\n하지만 $\\dfrac{dy}{dx}$는 분수가 아니라 극한값 하나를 나타내는 기호입니다. 개념 카드의 설명도 $\\Delta u \\ne 0$이라고 가정했는데, $x$ 근처에서 $\\Delta u=0$이 되는 경우(예: $g(x)$가 상수인 구간)까지 빈틈없이 증명하려면 조금 더 손질이 필요합니다. 대학 미적분학에서는 이 부분까지 다룹니다.\n\n그래도 "약분처럼 보인다"는 직관은 매우 쓸모 있습니다. 다음 단원의 매개변수 미분 $\\dfrac{dy}{dx}=\\dfrac{dy/dt}{dx/dt}$와 역함수 미분 $\\dfrac{dx}{dy}=\\dfrac{1}{dy/dx}$도 같은 모양입니다.',
      },
      {
        title: '로그미분법이 특히 편한 경우',
        body: '로그미분법은 다음과 같은 함수에서 계산을 크게 줄여 줍니다.\n\n- 인수가 많이 곱해진 함수: $y=(x+1)(x+2)(x+3)(x+4)$\n- 거듭제곱과 몫이 섞인 함수: $y=\\dfrac{(x-1)^2\\sqrt{x+3}}{(x+2)^5}$\n- 밑과 지수가 모두 변하는 함수: $y=x^x$, $y=(\\sin x)^x$\n\n로그를 취하면 곱은 합, 몫은 차, 지수는 앞으로 나온 계수가 되므로, 각 항을 따로 미분해 더하기만 하면 됩니다. 단, $y$가 0이 되는 점에서는 로그를 취할 수 없으므로 그 점은 따로 생각합니다.',
      },
    ],

    faq: [
      {
        q: '몫의 미분법을 꼭 외워야 하나요? 곱의 미분법으로 하면 안 되나요?',
        a: '됩니다. $\\dfrac{f}{g}=f\\cdot g^{-1}$으로 보고 곱의 미분법과 합성함수의 미분법을 쓰면 $f\'g^{-1}+f\\cdot(-g^{-2}g\')=\\dfrac{f\'g-fg\'}{g^2}$로 같은 결과가 나옵니다. 다만 자주 쓰는 공식이라 외워 두면 계산이 빨라집니다.',
      },
      {
        q: '합성함수에서 어느 것이 겉 함수이고 어느 것이 속 함수예요?',
        a: '$x$에 값을 넣었을 때 **마지막에** 하는 계산이 겉 함수입니다. $y=\\sin x^2$이면 먼저 제곱하고 마지막에 사인을 취하므로 겉 함수는 사인, 속 함수는 $x^2$입니다. 반대로 $y=\\sin^2 x=(\\sin x)^2$이면 먼저 사인을 취하고 마지막에 제곱하므로 겉 함수는 제곱, 속 함수는 $\\sin x$입니다.',
      },
      {
        q: '$(x^n)\'=nx^{n-1}$은 언제나 쓸 수 있나요?',
        a: '$n$이 정수이면 ($n$이 0 이하일 때는 $x \\ne 0$에서) 쓸 수 있고, $r$이 실수이면 $x>0$에서 $(x^r)\'=rx^{r-1}$이 성립합니다. 중요한 것은 **지수가 상수**여야 한다는 점입니다. $x^x$처럼 지수에 $x$가 있으면 쓸 수 없고 로그미분법을 씁니다.',
      },
      {
        q: '$\\sec x$, $\\csc x$, $\\cot x$는 왜 따로 이름을 붙이나요?',
        a: '$\\dfrac{1}{\\cos x}$ 같은 식이 미분과 적분에서 매우 자주 나오기 때문입니다. 예를 들어 $(\\tan x)\'=\\dfrac{1}{\\cos^2 x}$을 $\\sec^2 x$로 짧게 쓸 수 있습니다. 새로운 함수라기보다 자주 쓰는 역수에 붙인 이름이라고 생각하면 됩니다.',
      },
    ],

    mistakes: [
      '몫의 미분법에서 분자의 순서를 바꾸어 $\\dfrac{fg\'-f\'g}{g^2}$로 계산하는 실수 — (분자의 도함수)×(분모)를 먼저 씁니다.',
      '합성함수를 미분할 때 속 함수의 도함수를 곱하지 않는 실수 — $(\\sin 3x)\'$는 $\\cos 3x$가 아니라 $3\\cos 3x$입니다.',
      '$x^x$을 거듭제곱 공식이나 지수함수 공식으로 미분하는 실수 — 밑과 지수가 모두 변하면 로그미분법을 씁니다.',
    ],

    gens: [
      {
        id: 'quotient-value',
        level: 1,
        title: '몫의 미분법으로 미분계수 구하기',
        make: function (R) {
          var q, ans, wrongs, explain, x0, D, N;
          for (var t = 0; t < 60; t++) {
            x0 = R.int(-2, 3);
            if (R.bool()) {
              // f(x) = (ax+b)/(x+d),  f'(x) = (ad-b)/(x+d)^2
              var a = R.nonzero(-4, 4), b = R.int(-5, 5), d = R.nonzero(-4, 4);
              D = x0 + d;
              N = a * d - b;
              if (D === 0 || N === 0) continue;
              var top = R.fmt.poly([a, b]), bot = R.fmt.poly([1, d]);
              q = '함수 $f(x)=\\dfrac{' + top + '}{' + bot + '}$에 대하여 $f\'(' + x0 + ')$의 값을 구하십시오.';
              ans = R.F(N, D * D);
              wrongs = [
                { a: R.F(-N, D * D), why: '분자의 순서를 바꾸어 (분자)×(분모의 도함수)를 먼저 썼습니다. 그러면 부호가 반대가 됩니다.' },
                { a: R.F(a * D + (a * x0 + b), D * D), why: '분자를 뺄셈이 아니라 덧셈으로 계산했습니다.' },
                { a: R.F(N, D), why: '분모를 제곱하지 않았습니다. 몫의 미분법의 분모는 $\\{g(x)\\}^2$입니다.' },
                { a: R.F(a), why: '분자와 분모를 따로 미분해 나누었습니다. 몫은 그렇게 미분할 수 없습니다.' },
              ];
              explain = '$f\'(x)=\\dfrac{' + (a === 1 ? '' : a === -1 ? '-' : a) + '(' + bot + ')-(' + top + ')\\cdot 1}{(' + bot + ')^2}=\\dfrac{' + N + '}{(' + bot + ')^2}$입니다.\n\n' +
                '$x=' + x0 + '$' + R.josa(x0, '을/를') + ' 대입하면 $f\'(' + x0 + ')=\\dfrac{' + N + '}{' + R.fmt.paren(D) + '^2}=' + tex(R, ans) + '$입니다.';
            } else {
              // f(x) = (x^2+p)/(x+d),  f'(x) = (x^2+2dx-p)/(x+d)^2
              var p = R.nonzero(-5, 5), d2 = R.nonzero(-3, 3);
              D = x0 + d2;
              N = x0 * x0 + 2 * d2 * x0 - p;
              if (D === 0 || N === 0 || d2 * d2 + p === 0) continue;
              var top2 = R.fmt.poly([1, 0, p]), bot2 = R.fmt.poly([1, d2]);
              q = '함수 $f(x)=\\dfrac{' + top2 + '}{' + bot2 + '}$에 대하여 $f\'(' + x0 + ')$의 값을 구하십시오.';
              ans = R.F(N, D * D);
              wrongs = [
                { a: R.F(-N, D * D), why: '분자의 순서를 바꾸어 (분자)×(분모의 도함수)를 먼저 썼습니다. 그러면 부호가 반대가 됩니다.' },
                { a: R.F(2 * x0 * D + x0 * x0 + p, D * D), why: '분자를 뺄셈이 아니라 덧셈으로 계산했습니다.' },
                { a: R.F(N, D), why: '분모를 제곱하지 않았습니다. 몫의 미분법의 분모는 $\\{g(x)\\}^2$입니다.' },
                { a: R.F(2 * x0), why: '분자와 분모를 따로 미분해 $\\dfrac{2x}{1}$로 계산했습니다. 몫은 그렇게 미분할 수 없습니다.' },
              ];
              explain = '$f\'(x)=\\dfrac{2x(' + bot2 + ')-(' + top2 + ')\\cdot 1}{(' + bot2 + ')^2}=\\dfrac{' + R.fmt.poly([1, 2 * d2, -p]) + '}{(' + bot2 + ')^2}$입니다.\n\n' +
                '$x=' + x0 + '$' + R.josa(x0, '을/를') + ' 대입하면 분자는 $' + N + '$, 분모는 $' + R.fmt.paren(D) + '^2=' + (D * D) + '$이므로 $f\'(' + x0 + ')=' + tex(R, ans) + '$입니다.';
            }
            break;
          }
          return {
            type: 'short', check: 'number', concept: 0,
            q: q,
            answer: ans.toString(),
            wrong: cleanWrong(R, ans, wrongs),
            explain: explain,
          };
        },
      },
      {
        id: 'chain-power',
        level: 1,
        title: '합성함수의 미분법 — $(ax+b)^n$과 $\\sqrt{ax+b}$',
        make: function (R) {
          var a, b, x0, u0, n, s, q, ans, wrongs, explain, inner;
          for (var t = 0; t < 60; t++) {
            a = R.nonzero(-3, 3);
            x0 = R.int(-2, 3);
            if (R.bool()) {
              n = R.int(2, 5);
              u0 = R.pick([-2, -1, 1, 2]);
              b = u0 - a * x0;
              if (b === 0) continue;
              inner = R.fmt.poly([a, b]);
              q = '함수 $f(x)=(' + inner + ')^{' + n + '}$에 대하여 $f\'(' + x0 + ')$의 값을 구하십시오.';
              var pw = Math.pow(u0, n - 1);
              ans = R.F(n * a * pw);
              wrongs = [
                { a: R.F(n * pw), why: '속 함수 $' + inner + '$의 도함수 $' + a + '$' + R.josa(a, '을/를') + ' 곱하지 않았습니다.' },
                { a: R.F(n * a * pw * u0), why: '지수를 앞으로 내린 뒤 지수에서 1을 빼지 않았습니다.' },
                { a: R.F(pw * u0), why: '함숫값 $f(' + x0 + ')$' + R.josa(x0, '을/를') + ' 구했습니다. 도함수에 대입해야 합니다.' },
              ];
              var ex1 = n === 2 ? '' : '^{' + (n - 1) + '}';
              explain = '$f\'(x)=' + n + '(' + inner + ')' + ex1 + '\\cdot' + R.fmt.paren(a) + '$입니다.\n\n' +
                '$x=' + x0 + '$일 때 $' + inner + '=' + u0 + '$이므로 $f\'(' + x0 + ')=' + n + '\\cdot' + R.fmt.paren(u0) + ex1 + '\\cdot' + R.fmt.paren(a) + '=' + ans.toString() + '$입니다.';
            } else {
              s = R.int(1, 4);
              b = s * s - a * x0;
              if (b === 0) continue;
              inner = R.fmt.poly([a, b]);
              q = '함수 $f(x)=\\sqrt{' + inner + '}$에 대하여 $f\'(' + x0 + ')$의 값을 구하십시오.';
              ans = R.F(a, 2 * s);
              wrongs = [
                { a: R.F(1, 2 * s), why: '속 함수 $' + inner + '$의 도함수 $' + a + '$' + R.josa(a, '을/를') + ' 곱하지 않았습니다.' },
                { a: R.F(a, s), why: '$(\\sqrt{u})\'=\\dfrac{1}{2\\sqrt{u}}$의 $\\dfrac{1}{2}$을 빠뜨렸습니다.' },
                { a: R.F(s), why: '함숫값 $f(' + x0 + ')$' + R.josa(x0, '을/를') + ' 구했습니다. 도함수에 대입해야 합니다.' },
              ];
              explain = '$f(x)=(' + inner + ')^{\\frac{1}{2}}$이므로 $f\'(x)=\\dfrac{1}{2}(' + inner + ')^{-\\frac{1}{2}}\\cdot' + R.fmt.paren(a) + '=\\dfrac{' + a + '}{2\\sqrt{' + inner + '}}$입니다.\n\n' +
                '$x=' + x0 + '$일 때 $' + inner + '=' + (s * s) + '$이므로 $f\'(' + x0 + ')=\\dfrac{' + a + '}{2\\cdot ' + s + '}=' + tex(R, ans) + '$입니다.';
            }
            break;
          }
          return {
            type: 'short', check: 'number', concept: 3,
            q: q,
            answer: ans.toString(),
            wrong: cleanWrong(R, ans, wrongs),
            explain: explain,
          };
        },
      },
      {
        id: 'chain-functions',
        level: 2,
        title: '삼각함수·지수함수·로그함수의 합성함수 미분',
        make: function (R) {
          var k = R.int(2, 6);
          var kind = R.int(0, 5);
          var f, correct, cands, why;
          if (kind === 0) {
            f = '\\sin ' + k + 'x';
            correct = k + '\\cos ' + k + 'x';
            cands = [['\\cos ' + k + 'x', '속 함수 $' + k + 'x$의 도함수 ' + k + R.josa(k, '을/를') + ' 곱하지 않았습니다.'],
              ['-' + k + '\\cos ' + k + 'x', '$(\\sin u)\'=\\cos u$에는 마이너스가 없습니다.'],
              [k + '\\cos x', '겉 함수를 미분할 때 속 함수 $' + k + 'x$는 그대로 두어야 합니다.'],
              ['\\dfrac{1}{' + k + '}\\cos ' + k + 'x', '속 함수의 도함수를 곱해야 하는데 나누었습니다.']];
          } else if (kind === 1) {
            f = '\\cos ' + k + 'x';
            correct = '-' + k + '\\sin ' + k + 'x';
            cands = [[k + '\\sin ' + k + 'x', '$(\\cos u)\'=-\\sin u$의 마이너스를 빠뜨렸습니다.'],
              ['-\\sin ' + k + 'x', '속 함수 $' + k + 'x$의 도함수 ' + k + R.josa(k, '을/를') + ' 곱하지 않았습니다.'],
              ['-' + k + '\\sin x', '겉 함수를 미분할 때 속 함수 $' + k + 'x$는 그대로 두어야 합니다.'],
              ['-\\dfrac{1}{' + k + '}\\sin ' + k + 'x', '속 함수의 도함수를 곱해야 하는데 나누었습니다.']];
          } else if (kind === 2) {
            f = 'e^{' + k + 'x}';
            correct = k + 'e^{' + k + 'x}';
            cands = [['e^{' + k + 'x}', '속 함수 $' + k + 'x$의 도함수 ' + k + R.josa(k, '을/를') + ' 곱하지 않았습니다.'],
              [k + 'xe^{' + k + 'x-1}', '거듭제곱 공식을 썼습니다. 지수에 $x$가 있으므로 $(e^u)\'=e^u\\cdot u\'$를 씁니다.'],
              ['\\dfrac{1}{' + k + '}e^{' + k + 'x}', '속 함수의 도함수를 곱해야 하는데 나누었습니다.'],
              [k + 'e^{x}', '겉 함수를 미분할 때 속 함수 $' + k + 'x$는 그대로 두어야 합니다.']];
          } else if (kind === 3) {
            f = '\\tan ' + k + 'x';
            correct = k + '\\sec^2 ' + k + 'x';
            cands = [['\\sec^2 ' + k + 'x', '속 함수 $' + k + 'x$의 도함수 ' + k + R.josa(k, '을/를') + ' 곱하지 않았습니다.'],
              [k + '\\sec ' + k + 'x\\tan ' + k + 'x', '$\\sec x$의 도함수와 헷갈렸습니다. $(\\tan u)\'=\\sec^2 u$입니다.'],
              ['-' + k + '\\csc^2 ' + k + 'x', '$\\cot x$의 도함수와 헷갈렸습니다. $(\\tan u)\'=\\sec^2 u$입니다.'],
              ['\\dfrac{1}{' + k + '}\\sec^2 ' + k + 'x', '속 함수의 도함수를 곱해야 하는데 나누었습니다.']];
          } else if (kind === 4) {
            f = '\\ln(x^2+' + k + ')';
            correct = '\\dfrac{2x}{x^2+' + k + '}';
            cands = [['\\dfrac{1}{x^2+' + k + '}', '속 함수 $x^2+' + k + '$의 도함수 $2x$를 곱하지 않았습니다.'],
              ['\\dfrac{1}{2x}', '속 함수의 도함수만 뒤집었습니다. $(\\ln u)\'=\\dfrac{u\'}{u}$입니다.'],
              ['\\dfrac{2x}{(x^2+' + k + ')^2}', '$(\\ln u)\'=\\dfrac{u\'}{u}$인데 분모를 제곱했습니다.'],
              ['\\dfrac{x^2+' + k + '}{2x}', '분자와 분모를 바꾸었습니다. $(\\ln u)\'=\\dfrac{u\'}{u}$입니다.']];
          } else {
            var sk1 = k === 2 ? '\\sin x' : '\\sin^{' + (k - 1) + '}x';
            var ck1 = k === 2 ? '\\cos x' : '\\cos^{' + (k - 1) + '}x';
            f = '\\sin^{' + k + '}x';
            correct = k + sk1 + '\\cos x';
            cands = [[k + sk1, '속 함수 $\\sin x$의 도함수 $\\cos x$를 곱하지 않았습니다.'],
              [k + ck1, '$\\sin^{' + k + '}x=(\\sin x)^{' + k + '}$에서 겉 함수는 거듭제곱입니다. 사인을 코사인으로 바꾸는 것이 아니라 속 함수의 도함수를 곱합니다.'],
              ['\\cos^{' + k + '}x', '겉 함수(거듭제곱)를 미분하지 않았습니다.'],
              [k + '\\sin^{' + k + '}x\\cos x', '지수를 앞으로 내린 뒤 지수에서 1을 빼지 않았습니다.']];
          }
          why = {};
          cands.forEach(function (c) { why[c[0]] = c[1]; });
          var pick = R.choices('$' + correct + '$', cands.map(function (c) { return '$' + c[0] + '$'; }));
          var explainMap = [
            '겉 함수 $\\sin u$의 도함수는 $\\cos u$, 속 함수 $u=' + k + 'x$의 도함수는 ' + k + '입니다.',
            '겉 함수 $\\cos u$의 도함수는 $-\\sin u$, 속 함수 $u=' + k + 'x$의 도함수는 ' + k + '입니다.',
            '겉 함수 $e^u$의 도함수는 $e^u$, 속 함수 $u=' + k + 'x$의 도함수는 ' + k + '입니다.',
            '겉 함수 $\\tan u$의 도함수는 $\\sec^2 u$, 속 함수 $u=' + k + 'x$의 도함수는 ' + k + '입니다.',
            '겉 함수 $\\ln u$의 도함수는 $\\dfrac{1}{u}$, 속 함수 $u=x^2+' + k + '$의 도함수는 $2x$입니다.',
            '$\\sin^{' + k + '}x=(\\sin x)^{' + k + '}$이므로 겉 함수 $u^{' + k + '}$의 도함수는 $' + k + (k === 2 ? 'u' : 'u^{' + (k - 1) + '}') + '$, 속 함수 $u=\\sin x$의 도함수는 $\\cos x$입니다.',
          ];
          return {
            type: 'choice', concept: 3,
            q: '함수 $y=' + f + '$의 도함수는 어느 것입니까?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c, i) { return i === pick.answer ? '' : (why[c.slice(1, -1)] || ''); }),
            explain: explainMap[kind] + ' 둘을 곱하면 $y\'=' + correct + '$입니다.',
          };
        },
      },
      {
        id: 'power-rational',
        level: 2,
        title: '$x^r$의 도함수로 미분계수 구하기',
        make: function (R) {
          var q, ans, wrongs, explain, concept;
          if (R.bool()) {
            // f(x) = (q제곱근)(x^p) = x^{p/q},  x0 = t^q
            var qq = R.pick([2, 3]);
            var p = R.int(1, 5);
            if (p % qq === 0) p += 1;
            var t = R.pick([2, 3]);
            if (qq === 3 && t === 3 && p > 3) t = 2;
            var x0 = Math.pow(t, qq);
            var radicand = p === 1 ? 'x' : 'x^{' + p + '}';
            var root = qq === 2 ? '\\sqrt{' + radicand + '}' : '\\sqrt[3]{' + radicand + '}';
            var e = R.F(p, qq), e1 = e.sub(1);
            q = '함수 $f(x)=' + root + '$에 대하여 $f\'(' + x0 + ')$의 값을 구하십시오.';
            ans = e.mul(R.F(t).pow(p - qq));
            wrongs = [
              { a: e.mul(R.F(t).pow(p)), why: '지수를 앞으로 내린 뒤 지수에서 1을 빼지 않았습니다.' },
              { a: R.F(t).pow(p), why: '함숫값 $f(' + x0 + ')$' + R.josa(x0, '을/를') + ' 구했습니다.' },
              { a: R.F(t).pow(p - qq), why: '지수 $' + e.toTex() + '$' + R.josa(e, '을/를') + ' 앞으로 내려 곱하는 것을 빠뜨렸습니다.' },
            ];
            concept = 4;
            explain = '$f(x)=x^{' + e.toTex() + '}$이므로 $f\'(x)=' + e.toTex() + 'x^{' + e1.toTex() + '}$입니다.\n\n' +
              '$' + x0 + '=' + t + '^{' + qq + '}$이므로 $' + x0 + '^{' + e1.toTex() + '}=' + (p - qq === 1 ? t : t + '^{' + (p - qq) + '}') + '$이고, $f\'(' + x0 + ')=' + e.toTex() + '\\cdot' + R.fmt.frac(R.F(t).pow(p - qq)) + '=' + tex(R, ans) + '$입니다.';
          } else {
            // f(x) = 1/x^n
            var n = R.int(2, 4);
            var x1 = R.pick([-2, -1, 1, 2]);
            q = '함수 $f(x)=\\dfrac{1}{x^{' + n + '}}$에 대하여 $f\'(' + x1 + ')$의 값을 구하십시오.';
            ans = R.F(-n).mul(R.F(x1).pow(-n - 1));
            wrongs = [
              { a: R.F(-n).mul(R.F(x1).pow(-n + 1)), why: '지수 $-' + n + '$에서 1을 빼면 $-' + (n + 1) + '$입니다. $-' + (n - 1) + '$' + R.josa(n - 1, '이/가') + ' 아닙니다.' },
              { a: R.F(n).mul(R.F(x1).pow(-n - 1)), why: '지수 $-' + n + '$' + R.josa(n, '을/를') + ' 앞으로 내리면 음수가 곱해집니다. 부호를 빠뜨렸습니다.' },
              { a: R.F(x1).pow(-n), why: '함숫값 $f(' + x1 + ')$' + R.josa(x1, '을/를') + ' 구했습니다.' },
            ];
            concept = 1;
            explain = '$f(x)=x^{-' + n + '}$이므로 $f\'(x)=-' + n + 'x^{-' + (n + 1) + '}=-\\dfrac{' + n + '}{x^{' + (n + 1) + '}}$입니다.\n\n' +
              '$f\'(' + x1 + ')=-\\dfrac{' + n + '}{' + R.fmt.paren(x1) + '^{' + (n + 1) + '}}=' + tex(R, ans) + '$입니다.';
          }
          return {
            type: 'short', check: 'number', concept: concept,
            q: q,
            answer: ans.toString(),
            wrong: cleanWrong(R, ans, wrongs),
            explain: explain,
          };
        },
      },
    ],
  });
})();
