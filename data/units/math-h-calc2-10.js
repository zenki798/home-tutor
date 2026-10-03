/* 미적분Ⅱ · 치환적분법과 부분적분법
 * 합성함수의 미분법을 거꾸로 쓰는 치환적분법(부정적분, f'(x)/f(x) 꼴, 정적분의 적분 구간 바꾸기)과
 * 곱의 미분법에서 나온 부분적분법(부정적분, 정적분)을 다룬다. */
(function () {
  function tex(f) { return f.toTex(); }
  function ptex(f) { return f.sign() < 0 ? '(' + f.toTex() + ')' : f.toTex(); }
  // 계수(Frac) × 본체 — 1·-1 은 생략, 본체가 숫자로 시작하면 \cdot
  function cterm(c, body) {
    if (c.eq(1)) return body;
    if (c.eq(-1)) return '-' + body;
    return c.toTex() + (/^\d/.test(body) ? '\\cdot ' : '') + body;
  }
  // r + sK (K 는 '\\pi' 또는 'e') → TeX
  function rk(r, s, K) {
    var out = '';
    if (!s.isZero()) {
      var a = s.abs(), sg = s.sign() < 0 ? '-' : '';
      if (a.eq(1)) out = sg + K;
      else if (a.isInt()) out = sg + a.num + K;
      else out = sg + '\\dfrac{' + (a.num === 1 ? '' : a.num) + K + '}{' + a.den + '}';
    }
    if (!r.isZero()) out += (out && r.sign() > 0 ? '+' : '') + r.toTex();
    return out || '0';
  }

  // 부분적분 그림: u-v 평면에서 곡선 아래·왼쪽 두 부분의 넓이 합 = 큰 직사각형 - 작은 직사각형
  var partsFig = (function () {
    var s = '<svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg">';
    // 곡선 위 점 (u, v): 화면 좌표
    var pts = [], i, t, x, y;
    for (i = 0; i <= 40; i++) {
      t = i / 40;
      x = 80 + 150 * t;
      y = 150 - 110 * Math.pow(t, 0.6);
      pts.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
    }
    var curve = pts.map(function (p) { return p.join(','); }).join(' ');
    var x1 = pts[0][0], y1 = pts[0][1], x2 = pts[40][0], y2 = pts[40][1];
    // 곡선과 u축 사이 (∫v du) — 아래쪽
    s += '<polygon points="' + curve + ' ' + x2 + ',180 ' + x1 + ',180" fill="var(--fig-1)" fill-opacity="0.38" stroke="none"/>';
    // 곡선과 v축 사이 (∫u dv) — 왼쪽
    s += '<polygon points="' + curve + ' 30,' + y2 + ' 30,' + y1 + '" fill="var(--fig-2)" fill-opacity="0.38" stroke="none"/>';
    s += '<g stroke="currentColor" stroke-width="1.3" fill="none">';
    s += '<line x1="30" y1="180" x2="272" y2="180"/><line x1="30" y1="195" x2="30" y2="8"/>';
    s += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x1 + '" y2="180" stroke-dasharray="4 3"/>';
    s += '<line x1="' + x2 + '" y1="' + y2 + '" x2="' + x2 + '" y2="180" stroke-dasharray="4 3"/>';
    s += '<line x1="30" y1="' + y1 + '" x2="' + x1 + '" y2="' + y1 + '" stroke-dasharray="4 3"/>';
    s += '<line x1="30" y1="' + y2 + '" x2="' + x2 + '" y2="' + y2 + '" stroke-dasharray="4 3"/>';
    s += '</g>';
    s += '<polyline points="' + curve + '" fill="none" stroke="currentColor" stroke-width="2.2"/>';
    s += '<g fill="currentColor" font-family="sans-serif" font-size="13" text-anchor="middle">';
    s += '<text x="268" y="194">u</text><text x="20" y="16">v</text>';
    s += '<text x="160" y="160">∫v du</text><text x="100" y="80">∫u dv</text>';
    s += '<text x="' + x1 + '" y="194">a</text><text x="' + x2 + '" y="194">b</text>';
    s += '</g></svg>';
    return s;
  })();

  Tutor.registerUnit({
    id: 'math-h-calc2-10',
    course: 'math-h-calc2',
    title: '치환적분법과 부분적분법',
    summary: '합성함수의 미분법을 거꾸로 쓰는 치환적분법과, 곱의 미분법에서 나온 부분적분법으로 부정적분과 정적분을 구합니다.',
    goals: [
      '치환적분법을 이용하여 부정적분을 구할 수 있다.',
      '$\\dfrac{f\'(x)}{f(x)}$ 꼴의 함수를 적분할 수 있다.',
      '정적분의 치환적분법에서 적분 구간을 바꾸어 계산할 수 있다.',
      '부분적분법을 이용하여 부정적분과 정적분을 구할 수 있다.',
    ],
    standards: ['[12미적Ⅱ-03-02]', '[12미적Ⅱ-03-03]'],

    concepts: [
      {
        title: '치환적분법',
        body: '합성함수의 미분법 $\\{F(g(x))\\}\'=F\'(g(x))g\'(x)=f(g(x))g\'(x)$를 거꾸로 읽으면\n\n' +
          '$\\int f(g(x))g\'(x)\\,dx=F(g(x))+C$\n\n' +
          '입니다. $g(x)=t$로 놓으면 $g\'(x)=\\dfrac{dt}{dx}$이고, 이것을 $g\'(x)\\,dx=dt$로 써서\n\n' +
          '$\\int f(g(x))g\'(x)\\,dx=\\int f(t)\\,dt$\n\n' +
          '로 바꿀 수 있습니다. 이렇게 식의 일부를 새 변수로 바꾸어 적분하는 방법을 **치환적분법**이라고 합니다.\n\n' +
          '예: $\\int 2x(x^2+1)^3\\,dx$에서 $x^2+1=t$로 놓으면 $2x\\,dx=dt$이므로\n\n' +
          '$\\int t^3\\,dt=\\dfrac{1}{4}t^4+C=\\dfrac{1}{4}(x^2+1)^4+C$\n\n' +
          '**일차식을 치환하는 경우** $ax+b=t$로 놓으면 $dx=\\dfrac{1}{a}dt$이므로 $\\int f(ax+b)\\,dx=\\dfrac{1}{a}F(ax+b)+C$입니다.\n\n' +
          '- $\\int e^{3x}\\,dx=\\dfrac{1}{3}e^{3x}+C$, $\\int\\cos 2x\\,dx=\\dfrac{1}{2}\\sin 2x+C$, $\\int(2x-1)^5\\,dx=\\dfrac{1}{12}(2x-1)^6+C$\n\n' +
          '> ⚠️ 마지막에는 $t$를 다시 $x$에 대한 식으로 돌려놓습니다.',
        easy: '치환적분은 "복잡한 덩어리에 새 이름 붙이기"입니다. $(x^2+1)^3$에서 괄호 안 $x^2+1$을 $t$라고 부르면 $t^3$이라는 쉬운 모양이 됩니다.\n\n' +
          '다만 $dx$도 $dt$로 바꾸어야 하는데, 이때 덩어리의 도함수 $2x$가 필요합니다. 그래서 치환적분이 잘 되는 식은 **"덩어리"와 "덩어리의 도함수"가 함께 곱해져 있는** 꼴입니다. 식을 보고 "이것의 도함수가 옆에 있나?"를 먼저 찾아보십시오.',
        check: {
          type: 'choice',
          q: '$\\int e^{3x}\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
          choices: ['$\\dfrac{1}{3}e^{3x}+C$', '$3e^{3x}+C$', '$e^{3x}+C$'],
          answer: 0,
          why: [
            '',
            '$e^{3x}$을 미분했습니다. $3x=t$로 놓으면 $dx=\\dfrac{1}{3}dt$이므로 $\\dfrac{1}{3}$을 곱합니다.',
            '미분해 보면 $3e^{3x}$이 되어 맞지 않습니다. 속의 일차식 $3x$의 계수 3으로 나누어야 합니다.',
          ],
          explain: '$3x=t$로 놓으면 $dx=\\dfrac{1}{3}dt$이므로 $\\int e^{t}\\cdot\\dfrac{1}{3}dt=\\dfrac{1}{3}e^{t}+C=\\dfrac{1}{3}e^{3x}+C$입니다.',
        },
      },
      {
        title: '$\\dfrac{f\'(x)}{f(x)}$ 꼴의 적분',
        body: '분자가 분모의 도함수인 분수식은 분모를 $t$로 치환하면 바로 적분됩니다. $f(x)=t$로 놓으면 $f\'(x)\\,dx=dt$이므로\n\n' +
          '$\\int\\dfrac{f\'(x)}{f(x)}\\,dx=\\int\\dfrac{1}{t}\\,dt=\\ln|t|+C=\\ln|f(x)|+C$\n\n' +
          '예:\n\n' +
          '- $\\int\\dfrac{2x}{x^2+1}\\,dx=\\ln(x^2+1)+C$ ($x^2+1>0$이므로 절댓값 기호가 필요 없습니다)\n' +
          '- $\\int\\dfrac{e^x}{e^x+2}\\,dx=\\ln(e^x+2)+C$\n' +
          '- $\\int\\tan x\\,dx=\\int\\dfrac{\\sin x}{\\cos x}\\,dx=-\\int\\dfrac{(\\cos x)\'}{\\cos x}\\,dx=-\\ln|\\cos x|+C$\n\n' +
          '분자가 분모의 도함수의 **상수배**여도 됩니다. $\\int\\dfrac{x}{x^2+1}\\,dx=\\dfrac{1}{2}\\int\\dfrac{2x}{x^2+1}\\,dx=\\dfrac{1}{2}\\ln(x^2+1)+C$\n\n' +
          '> 💡 분수식을 보면 먼저 "분모를 미분하면 분자가 되는가(상수배 차이까지)?"를 확인합니다.',
        easy: '$\\int\\dfrac{1}{x}\\,dx=\\ln|x|+C$에서 $x$ 자리에 덩어리 $f(x)$가 들어간 모양입니다. 덩어리를 미분한 $f\'(x)$가 분자에 있으면, 치환했을 때 $\\dfrac{1}{t}$만 남습니다.\n\n' +
          '그래서 "분모의 도함수가 분자"인 분수는 답이 언제나 "$\\ln|$분모$|$"입니다. 분자가 분모의 도함수의 2배, $\\dfrac{1}{2}$배라면 답에도 그 수를 곱하면 됩니다.',
        check: {
          type: 'ox',
          q: '$\\int\\dfrac{2x}{x^2+5}\\,dx=\\ln(x^2+5)+C$입니다.',
          answer: true,
          explain: '분모 $x^2+5$를 미분하면 분자 $2x$가 되므로 $\\ln|x^2+5|+C$이고, $x^2+5>0$이므로 절댓값 기호 없이 $\\ln(x^2+5)+C$로 씁니다.',
        },
      },
      {
        title: '정적분의 치환적분법',
        body: '정적분에서 $g(x)=t$로 치환할 때는 **적분 구간도 $t$의 값으로 바꿉니다.** $x=a$일 때 $t=g(a)$, $x=b$일 때 $t=g(b)$이므로\n\n' +
          '$\\int_{a}^{b}f(g(x))g\'(x)\\,dx=\\int_{g(a)}^{g(b)}f(t)\\,dt$\n\n' +
          '예: $\\int_{0}^{1}2x(x^2+1)^3\\,dx$에서 $x^2+1=t$로 놓으면 $x=0$일 때 $t=1$, $x=1$일 때 $t=2$이므로\n\n' +
          '$\\int_{1}^{2}t^3\\,dt=\\left[\\dfrac{1}{4}t^4\\right]_{1}^{2}=\\dfrac{16-1}{4}=\\dfrac{15}{4}$\n\n' +
          '구간을 바꾸었으므로 $t$를 다시 $x$로 돌려놓을 필요가 없습니다.\n\n' +
          '> ⚠️ 변수는 $t$로 바꾸고 구간은 $x$의 값($0$부터 $1$) 그대로 두면 틀린 답이 나옵니다. 변수와 구간은 **함께** 바꿉니다.',
        easy: '길이를 cm로 재다가 m로 바꾸면 처음과 끝 눈금도 m 단위로 바꾸어 읽어야 합니다. 치환도 같습니다. 변수를 $x$에서 $t$로 바꾸었으면, 처음과 끝도 "$t$로는 몇인가"로 바꾸어 적습니다.\n\n' +
          '표로 정리하면 편합니다. 예를 들어 $t=x^2+1$이면\n\n' +
          '| $x$ | $0$ | $1$ |\n|---|---|---|\n| $t$ | $1$ | $2$ |',
        check: {
          type: 'short', check: 'number',
          q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{0}^{1}2x(x^2+1)^2\\,dx$',
          answer: '7/3',
          wrong: [{ a: '1/3', why: '변수는 $t$로 바꾸었지만 구간을 $0$부터 $1$ 그대로 두었습니다. $t=x^2+1$이면 $t$는 $1$부터 $2$까지입니다.' }],
          explain: '$x^2+1=t$로 놓으면 $2x\\,dx=dt$이고, $x=0$일 때 $t=1$, $x=1$일 때 $t=2$입니다. $\\int_{1}^{2}t^2\\,dt=\\left[\\dfrac{1}{3}t^3\\right]_{1}^{2}=\\dfrac{8-1}{3}=\\dfrac{7}{3}$입니다.',
        },
      },
      {
        title: '부분적분법',
        body: '곱의 미분법 $\\{f(x)g(x)\\}\'=f\'(x)g(x)+f(x)g\'(x)$의 양변을 적분하면 $f(x)g(x)=\\int f\'(x)g(x)\\,dx+\\int f(x)g\'(x)\\,dx$이므로\n\n' +
          '$\\int f(x)g\'(x)\\,dx=f(x)g(x)-\\int f\'(x)g(x)\\,dx$\n\n' +
          '입니다. 이것을 **부분적분법**이라고 합니다. 곱해진 두 함수 가운데 하나는 미분하고($f$), 하나는 적분하여($g\'$에서 $g$로) 더 쉬운 적분 $\\int f\'(x)g(x)\\,dx$로 바꾸는 것입니다.\n\n' +
          '예: $\\int xe^x\\,dx$에서 $f(x)=x$, $g\'(x)=e^x$으로 놓으면 $f\'(x)=1$, $g(x)=e^x$이므로\n\n' +
          '$\\int xe^x\\,dx=xe^x-\\int e^x\\,dx=xe^x-e^x+C$\n\n' +
          '**$f$를 고르는 요령** 미분하면 간단해지는 것을 $f$로 둡니다. 다항함수는 미분할수록 차수가 낮아지고, $\\ln x$는 미분하면 $\\dfrac{1}{x}$이 되어 간단해집니다. $e^x$, $\\sin x$, $\\cos x$는 적분해도 복잡해지지 않으므로 $g\'$로 두기 좋습니다.\n\n' +
          '- $\\int\\ln x\\,dx$: $f(x)=\\ln x$, $g\'(x)=1$로 놓으면 $x\\ln x-\\int x\\cdot\\dfrac{1}{x}\\,dx=x\\ln x-x+C$',
        easy: '부분적분은 "곱셈 적분을 바꿔치기"하는 방법입니다. $x$와 $e^x$의 곱은 바로 적분할 수 없지만, $x$를 미분하면 1이 되어 사라집니다. 그래서 $x$는 미분할 쪽, $e^x$은 적분할 쪽으로 정합니다.\n\n' +
          '공식은 "앞은 그대로·뒤는 적분한 것의 곱"에서 "앞을 미분·뒤는 적분한 것의 곱의 적분"을 **뺀다**고 외우면 됩니다. 그림처럼 곡선이 직사각형을 두 부분으로 나눌 때, 두 부분의 넓이 $\\int u\\,dv$와 $\\int v\\,du$를 더하면 큰 직사각형에서 작은 직사각형을 뺀 넓이 $\\left[uv\\right]$가 된다는 뜻이기도 합니다.',
        fig: {
          type: 'svg',
          alt: '가로축 u, 세로축 v 인 평면에서 곡선이 큰 직사각형을 두 부분으로 나눈 그림. 곡선 아래 부분은 ∫v du, 곡선 왼쪽 부분은 ∫u dv 이다',
          svg: partsFig,
        },
        check: {
          type: 'choice',
          q: '$\\int xe^x\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
          choices: ['$xe^x-e^x+C$', '$xe^x+e^x+C$', '$\\dfrac{1}{2}x^2e^x+C$'],
          answer: 0,
          why: [
            '',
            '부분적분법의 뒤 항은 **빼야** 합니다. $xe^x-\\int e^x\\,dx$입니다.',
            '$x$와 $e^x$을 따로 적분하여 곱했습니다. 곱의 적분은 이렇게 할 수 없습니다. 미분해 보면 $xe^x$이 나오지 않습니다.',
          ],
          explain: '$f(x)=x$, $g\'(x)=e^x$으로 놓으면 $\\int xe^x\\,dx=xe^x-\\int 1\\cdot e^x\\,dx=xe^x-e^x+C$입니다.',
        },
      },
      {
        title: '정적분의 부분적분법',
        body: '부분적분법을 정적분에 쓰면\n\n' +
          '$\\int_{a}^{b}f(x)g\'(x)\\,dx=\\left[f(x)g(x)\\right]_{a}^{b}-\\int_{a}^{b}f\'(x)g(x)\\,dx$\n\n' +
          '입니다. 앞 항 $\\left[f(x)g(x)\\right]_{a}^{b}$에도 위끝·아래끝을 넣는 것을 잊지 않습니다.\n\n' +
          '예: $\\int_{0}^{1}xe^x\\,dx=\\left[xe^x\\right]_{0}^{1}-\\int_{0}^{1}e^x\\,dx=e-\\left[e^x\\right]_{0}^{1}=e-(e-1)=1$\n\n' +
          '예: $\\int_{1}^{e}\\ln x\\,dx=\\left[x\\ln x\\right]_{1}^{e}-\\int_{1}^{e}1\\,dx=e-(e-1)=1$\n\n' +
          '> 💡 부분적분을 한 번 해도 적분이 남으면 한 번 더 합니다. $\\int x^2e^x\\,dx$는 두 번, $\\int e^x\\sin x\\,dx$는 두 번 한 뒤 처음 적분이 다시 나타나는 것을 이용하여 방정식처럼 풉니다.',
        easy: '정적분의 부분적분도 계산 순서는 같습니다. 다만 "앞은 그대로·뒤는 적분한 것의 곱" 부분이 이제 수가 되도록 위끝과 아래끝을 넣어 빼 주어야 합니다.\n\n' +
          '$\\int_{0}^{1}xe^x\\,dx$에서 $\\left[xe^x\\right]_{0}^{1}=1\\cdot e-0\\cdot 1=e$입니다. 남은 적분 $\\int_{0}^{1}e^x\\,dx=e-1$을 빼면 $1$이 됩니다. 단계마다 구간을 함께 적어 두면 실수가 줄어듭니다.',
        check: {
          type: 'short', check: 'number',
          q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{0}^{1}xe^x\\,dx$',
          answer: '1',
          wrong: [
            { a: '0', why: '$\\left[e^x\\right]_{0}^{1}$을 $e$로 셈했습니다. $e^{0}=1$이므로 $e-1$입니다.' },
          ],
          explain: '$\\left[xe^x\\right]_{0}^{1}-\\int_{0}^{1}e^x\\,dx=e-(e-1)=1$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '다음 부정적분을 구하십시오.\n\n$\\int x\\sqrt{x^2+3}\\,dx$',
        steps: [
          '근호 안의 $x^2+3$을 $t$로 놓습니다. $2x\\,dx=dt$, 곧 $x\\,dx=\\dfrac{1}{2}dt$입니다.',
          '$\\int\\sqrt{t}\\cdot\\dfrac{1}{2}dt=\\dfrac{1}{2}\\cdot\\dfrac{2}{3}t^{\\frac{3}{2}}+C=\\dfrac{1}{3}t\\sqrt{t}+C$',
          '$t$를 다시 $x^2+3$으로 바꿉니다.',
        ],
        answer: '$\\dfrac{1}{3}(x^2+3)\\sqrt{x^2+3}+C$',
      },
      {
        q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{0}^{\\ln 2}\\dfrac{e^x}{e^x+1}\\,dx$',
        steps: [
          '분모 $e^x+1$을 미분하면 분자 $e^x$이므로 $\\dfrac{f\'(x)}{f(x)}$ 꼴입니다.',
          '한 부정적분은 $\\ln(e^x+1)$입니다.',
          '$\\left[\\ln(e^x+1)\\right]_{0}^{\\ln 2}=\\ln 3-\\ln 2=\\ln\\dfrac{3}{2}$',
        ],
        answer: '$\\ln\\dfrac{3}{2}$',
      },
      {
        q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{1}^{e}x\\ln x\\,dx$',
        steps: [
          '미분하면 간단해지는 $\\ln x$를 $f(x)$, $x$를 $g\'(x)$로 놓습니다. $f\'(x)=\\dfrac{1}{x}$, $g(x)=\\dfrac{1}{2}x^2$',
          '$\\left[\\dfrac{1}{2}x^2\\ln x\\right]_{1}^{e}-\\int_{1}^{e}\\dfrac{1}{x}\\cdot\\dfrac{1}{2}x^2\\,dx=\\dfrac{e^2}{2}-\\int_{1}^{e}\\dfrac{x}{2}\\,dx$',
          '$\\int_{1}^{e}\\dfrac{x}{2}\\,dx=\\left[\\dfrac{x^2}{4}\\right]_{1}^{e}=\\dfrac{e^2-1}{4}$',
          '$\\dfrac{e^2}{2}-\\dfrac{e^2-1}{4}=\\dfrac{e^2+1}{4}$',
        ],
        answer: '$\\dfrac{e^2+1}{4}$',
      },
    ],

    terms: [
      { term: '치환적분법', def: '식의 일부를 새 변수 $t$로 바꾸어 적분하는 방법입니다. $\\int f(g(x))g\'(x)\\,dx=\\int f(t)\\,dt$ ($g(x)=t$)' },
      { term: '부분적분법', def: '곱의 미분법에서 나온 적분법입니다. $\\int f(x)g\'(x)\\,dx=f(x)g(x)-\\int f\'(x)g(x)\\,dx$' },
      { term: '적분 구간 바꾸기', def: '정적분을 치환할 때 $x$의 구간 $[a, b]$를 새 변수의 구간 $[g(a), g(b)]$로 바꾸는 것입니다.' },
      { term: '로그 미분 꼴', def: '분자가 분모의 도함수인 $\\dfrac{f\'(x)}{f(x)}$ 꼴입니다. 적분하면 $\\ln|f(x)|+C$입니다.' },
      { term: '피적분함수', def: '$\\int f(x)\\,dx$에서 적분하는 함수 $f(x)$입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '$\\int(3x+1)^4\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
        choices: ['$\\dfrac{1}{15}(3x+1)^5+C$', '$\\dfrac{1}{5}(3x+1)^5+C$', '$\\dfrac{3}{5}(3x+1)^5+C$', '$12(3x+1)^3+C$'],
        answer: 0,
        why: [
          '',
          '속의 일차식 $3x+1$의 계수 3으로 나누는 것을 빠뜨렸습니다. $dx=\\dfrac{1}{3}dt$입니다.',
          '계수 3으로 나누어야 하는데 곱했습니다.',
          '$(3x+1)^4$을 미분했습니다.',
        ],
        explain: '$3x+1=t$로 놓으면 $dx=\\dfrac{1}{3}dt$이므로 $\\dfrac{1}{3}\\int t^4\\,dt=\\dfrac{1}{3}\\cdot\\dfrac{1}{5}t^5+C=\\dfrac{1}{15}(3x+1)^5+C$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 0,
        q: '$\\int 2xe^{x^2}\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
        choices: ['$e^{x^2}+C$', '$x^2e^{x^2}+C$', '$2e^{x^2}+C$', '$\\dfrac{e^{x^2}}{2x}+C$'],
        answer: 0,
        why: [
          '',
          '$2x$만 적분하여 $x^2$으로 바꾸고 $e^{x^2}$은 그대로 곱했습니다. 미분해 보면 맞지 않습니다. $x^2=t$로 치환합니다.',
          '$2x\\,dx=dt$이므로 2는 $dt$ 속에 들어갑니다. 따로 곱하지 않습니다.',
          '분모의 $2x$는 상수가 아니므로 이렇게 나눌 수 없습니다. 미분해 보면 맞지 않습니다.',
        ],
        explain: '$x^2=t$로 놓으면 $2x\\,dx=dt$이므로 $\\int e^{t}\\,dt=e^{t}+C=e^{x^2}+C$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 0,
        q: '$\\int\\cos 2x\\,dx=2\\sin 2x+C$입니다.',
        answer: false,
        explain: '$2\\sin 2x$를 미분하면 $4\\cos 2x$가 됩니다. $2x=t$로 놓으면 $dx=\\dfrac{1}{2}dt$이므로 $\\int\\cos 2x\\,dx=\\dfrac{1}{2}\\sin 2x+C$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 1,
        q: '$\\int\\dfrac{\\cos x}{\\sin x}\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
        choices: ['$\\ln|\\sin x|+C$', '$\\ln|\\cos x|+C$', '$-\\ln|\\sin x|+C$', '$\\dfrac{\\sin x}{\\cos x}+C$'],
        answer: 0,
        why: [
          '',
          '분모가 $\\sin x$이므로 $\\ln|\\sin x|$입니다. 분자와 분모를 바꾸어 보았습니다.',
          '$(\\sin x)\'=\\cos x$이므로 부호를 바꾸지 않습니다.',
          '분자와 분모를 각각 적분했습니다. 분자가 분모의 도함수인 꼴이므로 $\\ln|$분모$|$입니다.',
        ],
        explain: '분모 $\\sin x$를 미분하면 분자 $\\cos x$이므로 $\\int\\dfrac{(\\sin x)\'}{\\sin x}\\,dx=\\ln|\\sin x|+C$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 2,
        q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{0}^{\\frac{\\pi}{2}}\\sin^{2}x\\cos x\\,dx$',
        answer: '1/3',
        hint: '$\\sin x=t$로 놓습니다.',
        wrong: [{ a: '0', why: '$x=\\dfrac{\\pi}{2}$일 때의 $t$ 값을 0으로 셈했습니다. $\\sin\\dfrac{\\pi}{2}=1$이므로 $t=\\sin x$는 $0$부터 $1$까지입니다.' }],
        explain: '$\\sin x=t$로 놓으면 $\\cos x\\,dx=dt$이고, $x=0$일 때 $t=0$, $x=\\dfrac{\\pi}{2}$일 때 $t=1$입니다. $\\int_{0}^{1}t^2\\,dt=\\dfrac{1}{3}$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: '$\\int x\\cos x\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
        choices: ['$x\\sin x+\\cos x+C$', '$x\\sin x-\\cos x+C$', '$-x\\sin x+\\cos x+C$', '$\\dfrac{1}{2}x^2\\sin x+C$'],
        answer: 0,
        why: [
          '',
          '$\\int\\sin x\\,dx=-\\cos x$이므로 $x\\sin x-(-\\cos x)$입니다. 부호를 놓쳤습니다.',
          '$\\int\\cos x\\,dx=\\sin x$입니다. 앞 항의 부호가 틀렸습니다.',
          '두 함수를 따로 적분하여 곱했습니다. 곱의 적분은 부분적분법으로 합니다.',
        ],
        explain: '$f(x)=x$, $g\'(x)=\\cos x$로 놓으면 $g(x)=\\sin x$이므로 $x\\sin x-\\int\\sin x\\,dx=x\\sin x+\\cos x+C$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '$\\int\\ln x\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
        choices: ['$x\\ln x-x+C$', '$\\dfrac{1}{x}+C$', '$x\\ln x+C$', '$x\\ln x+x+C$'],
        answer: 0,
        why: [
          '',
          '$\\ln x$를 미분했습니다.',
          '부분적분의 뒤 항 $\\int x\\cdot\\dfrac{1}{x}\\,dx=x$를 빼는 것을 빠뜨렸습니다.',
          '뒤 항은 빼야 합니다. $x\\ln x-\\int 1\\,dx$입니다.',
        ],
        explain: '$f(x)=\\ln x$, $g\'(x)=1$로 놓으면 $g(x)=x$이므로 $x\\ln x-\\int x\\cdot\\dfrac{1}{x}\\,dx=x\\ln x-x+C$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 2,
        q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{1}^{e}\\dfrac{\\ln x}{x}\\,dx$',
        answer: '1/2',
        hint: '$\\ln x=t$로 놓으면 $\\dfrac{1}{x}dx=dt$입니다.',
        wrong: [
          { a: '1', why: '$\\int t\\,dt=\\dfrac{1}{2}t^2$에서 $\\dfrac{1}{2}$을 빠뜨렸습니다.' },
        ],
        explain: '$\\ln x=t$로 놓으면 $\\dfrac{1}{x}dx=dt$이고, $x=1$일 때 $t=0$, $x=e$일 때 $t=1$입니다. $\\int_{0}^{1}t\\,dt=\\left[\\dfrac{1}{2}t^2\\right]_{0}^{1}=\\dfrac{1}{2}$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
        q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{1}^{e}\\ln x\\,dx$',
        answer: '1',
        hint: '$f(x)=\\ln x$, $g\'(x)=1$로 놓고 부분적분합니다.',
        wrong: [
          { a: '0', why: '$\\int_{1}^{e}1\\,dx$를 $e$로 셈했습니다. $e-1$입니다.' },
        ],
        explain: '$\\left[x\\ln x\\right]_{1}^{e}-\\int_{1}^{e}x\\cdot\\dfrac{1}{x}\\,dx=(e-0)-(e-1)=1$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 1,
        q: '$\\int\\tan x\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
        choices: ['$-\\ln|\\cos x|+C$', '$\\ln|\\cos x|+C$', '$\\sec^{2}x+C$', '$\\ln|\\sin x|+C$'],
        answer: 0,
        hint: '$\\tan x=\\dfrac{\\sin x}{\\cos x}$이고, $(\\cos x)\'=-\\sin x$입니다.',
        why: [
          '',
          '분자 $\\sin x$는 분모 $\\cos x$의 도함수의 $-1$배입니다. $-$ 부호를 빠뜨렸습니다.',
          '$\\tan x$를 미분한 것입니다.',
          '분모는 $\\cos x$입니다. 분모의 절댓값에 로그를 씌웁니다.',
        ],
        explain: '$\\int\\dfrac{\\sin x}{\\cos x}\\,dx=-\\int\\dfrac{(\\cos x)\'}{\\cos x}\\,dx=-\\ln|\\cos x|+C$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 4,
        q: '다음 정적분의 값은 무엇입니까?\n\n$\\int_{0}^{\\frac{\\pi}{2}}x\\cos x\\,dx$',
        choices: ['$\\dfrac{\\pi}{2}-1$', '$\\dfrac{\\pi}{2}+1$', '$\\dfrac{\\pi}{2}$', '$1-\\dfrac{\\pi}{2}$'],
        answer: 0,
        why: [
          '',
          '$\\int\\sin x\\,dx=-\\cos x$의 부호를 놓쳤습니다. $\\left[\\cos x\\right]_{0}^{\\frac{\\pi}{2}}=0-1=-1$입니다.',
          '뒤 항 $\\int_{0}^{\\frac{\\pi}{2}}\\sin x\\,dx=1$을 빼는 것을 빠뜨렸습니다.',
          '부분적분 공식의 부호를 거꾸로 썼습니다.',
        ],
        explain: '$\\left[x\\sin x\\right]_{0}^{\\frac{\\pi}{2}}-\\int_{0}^{\\frac{\\pi}{2}}\\sin x\\,dx=\\dfrac{\\pi}{2}-\\left[-\\cos x\\right]_{0}^{\\frac{\\pi}{2}}=\\dfrac{\\pi}{2}-1$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 3,
        q: '$\\int x^{2}\\ln x\\,dx$를 부분적분법으로 구할 때, $\\int f(x)g\'(x)\\,dx$의 $f(x)$로 놓기에 알맞은 것은 무엇입니까?',
        choices: ['$\\ln x$', '$x^{2}$', '$x^{2}\\ln x$', '$1$'],
        answer: 0,
        why: [
          '',
          '$x^2$을 $f$로 놓으면 $g\'(x)=\\ln x$를 적분해야 하고, 남는 적분이 더 복잡해집니다.',
          '곱 전체를 $f$로 두면 $g\'(x)=1$이 되어 적분이 쉬워지지 않습니다.',
          '$f(x)=1$이면 $g\'(x)=x^2\\ln x$를 적분해야 하므로 처음 문제와 같습니다.',
        ],
        explain: '$\\ln x$는 미분하면 $\\dfrac{1}{x}$로 간단해지고, $x^2$은 적분하기 쉽습니다. $f(x)=\\ln x$, $g\'(x)=x^2$으로 놓으면 $\\dfrac{1}{3}x^3\\ln x-\\int\\dfrac{1}{3}x^2\\,dx=\\dfrac{1}{3}x^3\\ln x-\\dfrac{1}{9}x^3+C$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 2,
        q: '연속함수 $f(x)$에 대하여 $\\int_{0}^{4}f(x)\\,dx=10$일 때, $\\int_{0}^{2}f(2x)\\,dx$의 값을 구하십시오.',
        answer: '5',
        hint: '$2x=t$로 놓으면 $dx=\\dfrac{1}{2}dt$이고 구간도 바뀝니다.',
        wrong: [
          { a: '20', why: '$dx=\\dfrac{1}{2}dt$인데 2를 곱했습니다.' },
          { a: '10', why: '$dx$를 $dt$로 바꿀 때 생기는 $\\dfrac{1}{2}$을 빠뜨렸습니다.' },
        ],
        explain: '$2x=t$로 놓으면 $dx=\\dfrac{1}{2}dt$이고, $x=0$일 때 $t=0$, $x=2$일 때 $t=4$입니다. $\\int_{0}^{4}f(t)\\cdot\\dfrac{1}{2}dt=\\dfrac{1}{2}\\times10=5$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 4,
        q: '미분가능한 함수 $f(x)$의 도함수 $f\'(x)$가 연속이고 $f(1)=3$, $\\int_{0}^{1}f(x)\\,dx=2$일 때, $\\int_{0}^{1}xf\'(x)\\,dx$의 값을 구하십시오.',
        answer: '1',
        hint: '$x$를 미분할 쪽, $f\'(x)$를 적분할 쪽으로 놓고 부분적분합니다.',
        wrong: [{ a: '5', why: '부분적분의 뒤 항을 더했습니다. $\\left[xf(x)\\right]_{0}^{1}-\\int_{0}^{1}f(x)\\,dx$입니다.' }],
        explain: '$\\int_{0}^{1}xf\'(x)\\,dx=\\left[xf(x)\\right]_{0}^{1}-\\int_{0}^{1}f(x)\\,dx=1\\cdot f(1)-0-2=3-2=1$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 4,
        q: '다음 정적분의 값은 무엇입니까?\n\n$\\int_{0}^{1}x^{2}e^{x}\\,dx$',
        choices: ['$e-2$', '$e$', '$e+2$', '$2-e$'],
        answer: 0,
        hint: '부분적분법을 두 번 씁니다.',
        why: [
          '',
          '첫 번째 부분적분 뒤에 남은 $2\\int_{0}^{1}xe^x\\,dx=2$를 빼는 것을 빠뜨렸습니다.',
          '첫 번째 부분적분의 뒤 항 $2\\int_{0}^{1}xe^x\\,dx=2$를 더했습니다. 부분적분법에서는 뒤 항을 **뺍니다**.',
          '위끝 값과 아래끝 값을 바꾸어 뺐습니다.',
        ],
        explain: '$\\int_{0}^{1}x^2e^x\\,dx=\\left[x^2e^x\\right]_{0}^{1}-2\\int_{0}^{1}xe^x\\,dx=e-2\\times1=e-2$입니다. ($\\int_{0}^{1}xe^x\\,dx=1$)',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 4,
        q: '다음 정적분의 값은 무엇입니까?\n\n$\\int_{0}^{\\pi}e^{x}\\sin x\\,dx$',
        choices: ['$\\dfrac{e^{\\pi}+1}{2}$', '$\\dfrac{e^{\\pi}-1}{2}$', '$e^{\\pi}+1$', '$0$'],
        answer: 0,
        hint: '$I=\\int e^x\\sin x\\,dx$로 놓고 부분적분법을 두 번 쓰면 $I$가 다시 나타납니다.',
        why: [
          '',
          '아래끝 $x=0$에서의 값 $\\dfrac{e^{0}(\\sin 0-\\cos 0)}{2}=-\\dfrac{1}{2}$의 부호를 놓쳤습니다.',
          '$2I=\\cdots$에서 2로 나누는 것을 빠뜨렸습니다.',
          '$\\sin\\pi=\\sin 0=0$만 보고 0으로 했습니다. 부정적분에는 $\\cos x$도 들어 있습니다.',
        ],
        explain: '두 번 부분적분하면 $I=e^x\\sin x-e^x\\cos x-I$이므로 $\\int e^x\\sin x\\,dx=\\dfrac{e^x(\\sin x-\\cos x)}{2}+C$입니다.\n\n' +
          '$\\left[\\dfrac{e^x(\\sin x-\\cos x)}{2}\\right]_{0}^{\\pi}=\\dfrac{e^{\\pi}(0+1)}{2}-\\dfrac{1\\cdot(0-1)}{2}=\\dfrac{e^{\\pi}+1}{2}$입니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 2,
        q: '$x=\\sin\\theta$로 치환하여 다음 정적분의 값을 구하면 무엇입니까?\n\n$\\int_{0}^{1}\\sqrt{1-x^{2}}\\,dx$',
        choices: ['$\\dfrac{\\pi}{4}$', '$\\dfrac{\\pi}{2}$', '$\\pi$', '$1$'],
        answer: 0,
        hint: '$x=0$일 때 $\\theta=0$, $x=1$일 때 $\\theta=\\dfrac{\\pi}{2}$이고 $dx=\\cos\\theta\\,d\\theta$입니다.',
        why: [
          '',
          '$\\int_{0}^{\\frac{\\pi}{2}}\\cos^{2}\\theta\\,d\\theta$를 $\\int_{0}^{\\frac{\\pi}{2}}1\\,d\\theta$처럼 계산했습니다. $\\cos^{2}\\theta=\\dfrac{1+\\cos 2\\theta}{2}$입니다.',
          '반지름이 1인 원 전체의 넓이입니다. 이 정적분은 원의 $\\dfrac{1}{4}$입니다.',
          '가로·세로가 1인 정사각형의 넓이입니다. 곡선 아래는 사분원입니다.',
        ],
        explain: '$x=\\sin\\theta$로 놓으면 $dx=\\cos\\theta\\,d\\theta$이고 $0\\le\\theta\\le\\dfrac{\\pi}{2}$에서 $\\sqrt{1-\\sin^{2}\\theta}=\\cos\\theta$입니다.\n\n' +
          '$\\int_{0}^{\\frac{\\pi}{2}}\\cos^{2}\\theta\\,d\\theta=\\int_{0}^{\\frac{\\pi}{2}}\\dfrac{1+\\cos 2\\theta}{2}\\,d\\theta=\\left[\\dfrac{\\theta}{2}+\\dfrac{\\sin 2\\theta}{4}\\right]_{0}^{\\frac{\\pi}{2}}=\\dfrac{\\pi}{4}$입니다. 반지름이 1인 사분원의 넓이와 같습니다.',
      },
    ],

    deeper: [
      {
        title: '어떤 적분법을 쓸까? — 모양 보고 고르기',
        body: '적분 문제를 보면 다음 순서로 생각하면 대부분 길이 보입니다.\n\n' +
          '1. **기본 공식**으로 바로 되는가? ($x^n$, $e^x$, $\\sin x$ …) 나눗셈·전개·삼각함수 관계로 기본 꼴이 되면 그렇게 합니다.\n' +
          '2. **덩어리와 그 도함수**가 함께 있는가? ($2x$와 $x^2+1$, $\\cos x$와 $\\sin x$, $\\dfrac{1}{x}$과 $\\ln x$) → 치환적분법. 분수식에서 분자가 분모의 도함수이면 $\\ln|$분모$|$.\n' +
          '3. **서로 다른 종류의 함수의 곱**인가? (다항함수 × 지수·삼각함수, 다항함수 × 로그함수) → 부분적분법. 미분하면 간단해지는 쪽을 $f$로.\n\n' +
          '모든 함수의 부정적분을 이런 방법으로 구할 수 있는 것은 아닙니다. 예를 들어 $e^{x^2}$의 부정적분은 지금까지 배운 함수들로는 나타낼 수 없다는 것이 알려져 있습니다. 그런 적분은 정적분의 값을 어림하는 방법(다음 단원의 구분구적법 같은 생각)으로 다룹니다.',
      },
      {
        title: '라이프니츠의 기호 $dx$가 편리한 까닭',
        body: '치환할 때 $\\dfrac{dt}{dx}=g\'(x)$를 마치 분수처럼 $dt=g\'(x)\\,dx$로 바꾸어 썼습니다. 엄밀히 $\\dfrac{dt}{dx}$는 분수가 아니라 극한값이지만, 합성함수의 미분법이 성립하기 때문에 이렇게 계산해도 올바른 답이 나옵니다.\n\n' +
          '이 기호는 17세기에 라이프니츠가 만든 것으로, 계산 규칙이 기호 안에 자연스럽게 녹아 있어 지금까지 쓰이고 있습니다. 좋은 기호가 생각을 대신해 주는 대표적인 예입니다.',
      },
    ],

    faq: [
      {
        q: '치환할 때 무엇을 t로 놓아야 하나요?',
        a: '보통 괄호 안, 근호 안, 지수 자리, 분모처럼 **안쪽에 있는 덩어리**를 $t$로 놓습니다. 그 덩어리의 도함수(또는 상수배)가 식에 곱해져 있으면 성공입니다. 도함수가 없으면 다른 덩어리를 놓아 보거나 부분적분법을 생각합니다.',
      },
      {
        q: '정적분에서 치환한 뒤 다시 x로 돌려놓아야 하나요?',
        a: '적분 구간을 $t$의 값으로 바꾸었다면 돌려놓을 필요가 없습니다. $t$에 대한 정적분을 그대로 계산하면 됩니다. 반대로 구간을 $x$의 값 그대로 쓰고 싶다면 부정적분을 $x$에 대한 식으로 돌려놓은 뒤 넣어야 합니다. 둘을 섞으면 틀립니다.',
      },
      {
        q: '부분적분에서 f와 g\'을 반대로 정하면 어떻게 되나요?',
        a: '틀린 답이 나오지는 않지만, 남는 적분이 오히려 복잡해져 끝나지 않습니다. 예를 들어 $\\int xe^x\\,dx$에서 $f=e^x$, $g\'=x$로 하면 $\\dfrac{1}{2}x^2e^x-\\int\\dfrac{1}{2}x^2e^x\\,dx$가 되어 차수가 올라갑니다. 미분하면 간단해지는 쪽($\\ln x$, 다항함수)을 $f$로 둡니다.',
      },
      {
        q: '∫e^x sin x dx 처럼 부분적분을 해도 끝나지 않으면요?',
        a: '두 번 부분적분하면 처음 적분 $I$가 다시 나타납니다. $I=(\\text{식})-I$ 꼴이 되므로 $2I=(\\text{식})$에서 $I$를 구합니다. 두 번 모두 같은 종류(예: 지수함수)를 $g\'$로 정해야 처음 적분으로 돌아옵니다.',
      },
    ],

    mistakes: [
      '정적분을 치환하면서 적분 구간을 바꾸지 않는 실수 — $t=g(x)$이면 구간도 $g(a)$부터 $g(b)$까지로 바꿉니다.',
      '$\\int e^{3x}\\,dx=e^{3x}+C$처럼 일차식의 계수로 나누는 것을 빠뜨리는 실수 — $\\dfrac{1}{3}e^{3x}+C$입니다.',
      '부분적분법에서 뒤 항을 더하는 실수 — $\\int fg\'\\,dx=fg-\\int f\'g\\,dx$로 **뺍니다**.',
    ],

    gens: [
      {
        id: 'sub-poly-definite',
        level: 1,
        title: '정적분의 치환적분 (x²+c 치환)',
        make: function (R) {
          var c = R.int(1, 3), n = R.int(2, 3), q = R.int(1, 2), m = R.pick([1, 2, 3, 4, 6]);
          var top = q * q + c;
          var half = R.F(m, 2);
          var core = R.F(Math.pow(top, n + 1) - Math.pow(c, n + 1), n + 1);   // ∫_c^top t^n dt
          var ans = half.mul(core);
          var noBound = half.mul(R.F(Math.pow(q, n + 1), n + 1));              // 구간을 바꾸지 않음
          var noHalf = R.F(m).mul(core);                                       // dt = 2x dx 의 1/2 빠뜨림
          var noDiv = half.mul(R.F(Math.pow(top, n + 1) - Math.pow(c, n + 1))); // n+1 로 나누지 않음
          var wrong = [], seen = {};
          seen[ans.toString()] = true;
          [[noBound, '구간을 $t$의 값으로 바꾸지 않았습니다. $t=x^2+' + c + '$이면 $t$는 $' + c + '$부터 $' + top + '$까지입니다.'],
            [noHalf, '$2x\\,dx=dt$에서 $x\\,dx=\\dfrac{1}{2}dt$입니다. $\\dfrac{1}{2}$을 빠뜨렸습니다.'],
            [noDiv, '$\\int t^{' + n + '}\\,dt=\\dfrac{1}{' + (n + 1) + '}t^{' + (n + 1) + '}$에서 $' + (n + 1) + '$' + R.josa(n + 1, '으로/로') + ' 나누는 것을 빠뜨렸습니다.'],
          ].forEach(function (w) { var k = w[0].toString(); if (!seen[k]) { seen[k] = true; wrong.push({ a: k, why: w[1] }); } });
          var ms = m === 1 ? '' : String(m);
          var pw = n === 1 ? '' : '^{' + n + '}';
          var coefT = half.mul(R.F(1, n + 1));
          return {
            type: 'short', check: 'number', concept: 2,
            q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{0}^{' + q + '}' + ms + 'x(x^{2}+' + c + ')' + pw + '\\,dx$',
            answer: ans.toString(),
            hint: '$x^2+' + c + '=t$로 놓고 적분 구간도 $t$의 값으로 바꿉니다.',
            wrong: wrong,
            explain: '$x^2+' + c + '=t$로 놓으면 $2x\\,dx=dt$, 곧 $x\\,dx=\\dfrac{1}{2}dt$이고, $x=0$일 때 $t=' + c + '$, $x=' + q + '$일 때 $t=' + top + '$입니다.\n\n' +
              '$\\int_{' + c + '}^{' + top + '}' + cterm(half, 't^{' + n + '}') + '\\,dt=\\left[' + cterm(coefT, 't^{' + (n + 1) + '}') + '\\right]_{' + c + '}^{' + top + '}=' + tex(coefT) + '\\times(' + Math.pow(top, n + 1) + '-' + Math.pow(c, n + 1) + ')=' + tex(ans) + '$',
          };
        },
      },
      {
        id: 'sub-linear',
        level: 1,
        title: '일차식을 치환하는 부정적분',
        make: function (R) {
          var a = R.pick([2, 3, 4, 5]);
          var b = R.pick([1, -1, 2, -3, 3]);
          var inner = R.fmt.poly([a, b]);
          var ia = R.F(1, a);
          var kind = R.int(0, 4);
          var f, F, W;
          if (kind === 0) {
            f = 'e^{' + inner + '}';
            F = [ia, 'e^{' + inner + '}'];
            W = [[R.F(a), 'e^{' + inner + '}', '이 보기는 $' + f + '$의 도함수입니다. 적분할 때는 $' + a + '$' + R.josa(a, '으로/로') + ' 나눕니다.'],
              [R.F(1), 'e^{' + inner + '}', '속의 일차식의 계수 $' + a + '$' + R.josa(a, '으로/로') + ' 나누는 것을 빠뜨렸습니다. 미분해 보면 $' + a + '$배가 됩니다.'],
              [ia, 'e^{' + R.fmt.poly([a, b + 1]) + '}', '지수에 1을 더했습니다. 지수함수에는 거듭제곱 공식을 쓰지 않습니다.']];
          } else if (kind === 1) {
            f = '\\sin(' + inner + ')';
            F = [ia.neg(), '\\cos(' + inner + ')'];
            W = [[ia, '\\cos(' + inner + ')', '$\\int\\sin t\\,dt=-\\cos t$입니다. 부호를 놓쳤습니다.'],
              [R.F(-1), '\\cos(' + inner + ')', '속의 일차식의 계수 $' + a + '$' + R.josa(a, '으로/로') + ' 나누는 것을 빠뜨렸습니다.'],
              [R.F(-a), '\\cos(' + inner + ')', '$' + a + '$' + R.josa(a, '으로/로') + ' 나누어야 하는데 곱했습니다.'],
              [R.F(a), '\\cos(' + inner + ')', '이 보기는 $\\sin(' + inner + ')$의 도함수입니다.']];
          } else if (kind === 2) {
            f = '\\cos(' + inner + ')';
            F = [ia, '\\sin(' + inner + ')'];
            W = [[ia.neg(), '\\sin(' + inner + ')', '$\\int\\cos t\\,dt=\\sin t$이므로 $-$를 붙이지 않습니다.'],
              [R.F(1), '\\sin(' + inner + ')', '속의 일차식의 계수 $' + a + '$' + R.josa(a, '으로/로') + ' 나누는 것을 빠뜨렸습니다.'],
              [R.F(a), '\\sin(' + inner + ')', '$' + a + '$' + R.josa(a, '으로/로') + ' 나누어야 하는데 곱했습니다.'],
              [R.F(-a), '\\sin(' + inner + ')', '이 보기는 $\\cos(' + inner + ')$의 도함수입니다.']];
          } else if (kind === 3) {
            var n = R.int(2, 5);
            f = '(' + inner + ')^{' + n + '}';
            F = [R.F(1, a * (n + 1)), '(' + inner + ')^{' + (n + 1) + '}'];
            W = [[R.F(1, n + 1), '(' + inner + ')^{' + (n + 1) + '}', '속의 일차식의 계수 $' + a + '$' + R.josa(a, '으로/로') + ' 나누는 것을 빠뜨렸습니다.'],
              [R.F(a, n + 1), '(' + inner + ')^{' + (n + 1) + '}', '$' + a + '$' + R.josa(a, '으로/로') + ' 나누어야 하는데 곱했습니다.'],
              [R.F(a * n), n - 1 === 1 ? '(' + inner + ')' : '(' + inner + ')^{' + (n - 1) + '}', '이 보기는 $' + f + '$의 도함수입니다.'],
              [R.F(1, a * n), '(' + inner + ')^{' + n + '}', '지수에 1을 더하지 않았습니다.']];
          } else {
            f = '\\dfrac{1}{' + inner + '}';
            F = [ia, '\\ln|' + inner + '|'];
            W = [[R.F(1), '\\ln|' + inner + '|', '속의 일차식의 계수 $' + a + '$' + R.josa(a, '으로/로') + ' 나누는 것을 빠뜨렸습니다. 미분해 보면 결과가 $\\dfrac{' + a + '}{' + inner + '}$입니다.'],
              [R.F(a), '\\ln|' + inner + '|', '$' + a + '$' + R.josa(a, '으로/로') + ' 나누어야 하는데 곱했습니다.'],
              [R.F(-1), '\\dfrac{' + a + '}{(' + inner + ')^{2}}', '이 보기는 $\\dfrac{1}{' + inner + '}$의 도함수입니다.']];
          }
          function show(c, body) { return '$' + cterm(c, body) + '+C$'; }
          var correct = show(F[0], F[1]);
          var reason = {};
          var wrongs = W.map(function (w) { var s = show(w[0], w[1]); if (!(s in reason)) reason[s] = w[2]; return s; });
          var pick = R.choices(correct, wrongs);
          return {
            type: 'choice', concept: 0,
            q: '다음 부정적분을 구한 것으로 옳은 것을 고르십시오.\n\n$\\int ' + f + '\\,dx$',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || '답을 미분해 보면 피적분함수가 나오지 않습니다.'; }),
            explain: '$' + inner + '=t$로 놓으면 $dx=\\dfrac{1}{' + a + '}dt$이므로 기본 공식으로 적분한 뒤 $\\dfrac{1}{' + a + '}$을 곱합니다. 답은 ' + correct + '입니다.',
          };
        },
      },
      {
        id: 'log-deriv',
        level: 2,
        title: '분자가 분모의 도함수의 상수배인 정적분',
        make: function (R) {
          var c = R.int(1, 4), m = R.int(1, 3), k = R.pick([1, 2, 3, 4, 6]);
          var top = m * m + c;
          var ratio = R.F(top, c);
          var half = R.F(k, 2);
          function lnTex(f) { return f.isInt() ? '\\ln ' + f.num : '\\ln\\dfrac{' + f.num + '}{' + f.den + '}'; }
          function val(coef, f) {
            if (coef.eq(1)) return '$' + lnTex(f) + '$';
            if (coef.eq(-1)) return '$-' + lnTex(f) + '$';
            return '$' + coef.toTex() + lnTex(f) + '$';
          }
          var correct = val(half, ratio);
          var cands = [
            [val(R.F(k), ratio), '$x\\,dx=\\dfrac{1}{2}dt$에서 생기는 $\\dfrac{1}{2}$을 빠뜨렸습니다.'],
            [val(half.neg(), ratio), '아래끝 값에서 위끝 값을 뺐습니다.'],
            [val(half.mul(R.F(1, 2)), ratio), '$\\dfrac{1}{2}$을 두 번 곱했습니다.'],
          ];
          if (c !== 1) cands.push([val(half, R.F(top)), '아래끝 값 $\\ln ' + c + '$' + R.josa(c, '을/를') + ' 빼는 것을 빠뜨렸습니다.']);
          var reason = {};
          cands.forEach(function (w) { if (!(w[0] in reason)) reason[w[0]] = w[1]; });
          var pick = R.choices(correct, cands.map(function (w) { return w[0]; }));
          var kx = k === 1 ? 'x' : k + 'x';
          return {
            type: 'choice', concept: 1,
            q: '다음 정적분의 값은 무엇입니까?\n\n$\\int_{0}^{' + m + '}\\dfrac{' + kx + '}{x^{2}+' + c + '}\\,dx$',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (s) { return s === correct ? '' : reason[s] || ''; }),
            explain: (half.eq(1)
              ? '분모 $x^2+' + c + '$의 도함수가 분자 $2x$입니다.\n\n$\\left[\\ln(x^{2}+' + c + ')\\right]_{0}^{' + m + '}=\\ln ' + top + '-\\ln ' + c + '$'
              : '분모 $x^2+' + c + '$의 도함수는 $2x$이므로 $\\dfrac{' + kx + '}{x^{2}+' + c + '}=' + tex(half) + '\\cdot\\dfrac{2x}{x^{2}+' + c + '}$입니다.\n\n' +
                '$' + tex(half) + '\\left[\\ln(x^{2}+' + c + ')\\right]_{0}^{' + m + '}=' + tex(half) + '(\\ln ' + top + '-\\ln ' + c + ')$') +
              '이므로 답은 ' + correct + '입니다.' + (c === 1 ? ' ($\\ln 1=0$)' : ''),
          };
        },
      },
      {
        id: 'by-parts-definite',
        level: 2,
        title: '정적분의 부분적분',
        make: function (R) {
          var fam = R.int(0, 2);
          var a = R.int(1, 3), b = R.int(1, 4);
          if (fam === 2 && a === b) b = a + 1;
          var Z = R.F(0);
          var q, K, corr, w1, w2, w3, w4, steps, lin = (a === 1 ? 'x' : a + 'x') + '+' + b;
          if (fam === 0) {        // ∫₀^{π/2} (ax+b) sin x dx = a + b
            K = '\\pi';
            q = '\\int_{0}^{\\frac{\\pi}{2}}(' + lin + ')\\sin x\\,dx';
            corr = [R.F(a + b), Z];
            w1 = [R.F(b - a), Z]; w2 = [R.F(b), Z]; w3 = [R.F(-(a + b)), Z];
            w4 = a === 1 ? null : [R.F(b + 1), Z];
            steps = '$f(x)=' + lin + '$, $g\'(x)=\\sin x$로 놓으면 $g(x)=-\\cos x$입니다.\n\n' +
              '$\\left[-(' + lin + ')\\cos x\\right]_{0}^{\\frac{\\pi}{2}}+' + (a === 1 ? '' : a) + '\\int_{0}^{\\frac{\\pi}{2}}\\cos x\\,dx=(0+' + b + ')+' + a + '\\times1=' + (a + b) + '$';
          } else if (fam === 1) { // ∫₀^{π/2} (ax+b) cos x dx = (b-a) + (a/2)π
            K = '\\pi';
            q = '\\int_{0}^{\\frac{\\pi}{2}}(' + lin + ')\\cos x\\,dx';
            corr = [R.F(b - a), R.F(a, 2)];
            w1 = [R.F(b + a), R.F(a, 2)]; w2 = [R.F(b), R.F(a, 2)]; w3 = [R.F(a - b), R.F(-a, 2)];
            w4 = a === 1 ? null : [R.F(b - 1), R.F(a, 2)];
            steps = '$f(x)=' + lin + '$, $g\'(x)=\\cos x$로 놓으면 $g(x)=\\sin x$입니다.\n\n' +
              '$\\left[(' + lin + ')\\sin x\\right]_{0}^{\\frac{\\pi}{2}}-' + (a === 1 ? '' : a) + '\\int_{0}^{\\frac{\\pi}{2}}\\sin x\\,dx=\\left(' + rk(R.F(b), R.F(a, 2), K) + '\\right)-' + a + '\\times1=' + rk(R.F(b - a), R.F(a, 2), K) + '$';
          } else {                // ∫₀¹ (ax+b) eˣ dx = be + (a-b)
            K = 'e';
            q = '\\int_{0}^{1}(' + lin + ')e^{x}\\,dx';
            corr = [R.F(a - b), R.F(b)];
            w1 = [R.F(-a - b), R.F(2 * a + b)]; w2 = [R.F(-b), R.F(a + b)]; w3 = [Z, R.F(b)];
            w4 = a === 1 ? null : [R.F(1 - b), R.F(a + b - 1)];
            steps = '$f(x)=' + lin + '$, $g\'(x)=e^x$으로 놓으면 $g(x)=e^x$입니다.\n\n' +
              '$\\left[(' + lin + ')e^{x}\\right]_{0}^{1}-' + (a === 1 ? '' : a) + '\\int_{0}^{1}e^{x}\\,dx=\\{' + rk(Z, R.F(a + b), K) + '-' + b + '\\}-' + (a === 1 ? '' : a) + '(e-1)=' + rk(R.F(a - b), R.F(b), K) + '$';
          }
          var correct = '$' + rk(corr[0], corr[1], K) + '$';
          var cands = [
            [w1, '부분적분의 뒤 항을 더했습니다. $\\int fg\'\\,dx=fg-\\int f\'g\\,dx$로 **뺍니다**.'],
            [w2, '앞 항 $\\left[f(x)g(x)\\right]$만 계산하고 뒤 항 $\\int f\'(x)g(x)\\,dx$를 빠뜨렸습니다.'],
            [w3, fam === 2 ? '$e^{0}$을 0으로 셈했습니다. $e^{0}=1$입니다.' : '삼각함수를 적분할 때 부호를 거꾸로 했습니다. $\\int\\sin x\\,dx=-\\cos x$, $\\int\\cos x\\,dx=\\sin x$입니다.'],
          ];
          if (w4) cands.push([w4, '뒤 항 $\\int f\'(x)g(x)\\,dx$에서 $f\'(x)=' + a + '$' + R.josa(a, '을/를') + ' 곱하는 것을 빠뜨렸습니다.']);
          var reason = {}, list = [];
          cands.forEach(function (w) {
            var s = '$' + rk(w[0][0], w[0][1], K) + '$';
            if (!(s in reason)) reason[s] = w[1];
            list.push(s);
          });
          var pick = R.choices(correct, list);
          return {
            type: 'choice', concept: 4,
            q: '다음 정적분의 값은 무엇입니까?\n\n$' + q + '$',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (s) { return s === correct ? '' : reason[s] || '마지막 계산을 다시 확인해 보십시오. 위끝·아래끝 값을 넣어 빼는 과정에서 실수했습니다.'; }),
            hint: '미분하면 간단해지는 일차식을 $f(x)$로 놓습니다.',
            explain: steps + '\n\n따라서 답은 ' + correct + '입니다.',
          };
        },
      },
    ],
  });
})();
