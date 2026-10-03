/* 미적분Ⅱ · 여러 가지 함수의 적분
 * 미분법을 거꾸로 생각해 xⁿ(n은 실수, n≠-1)과 1/x, 지수함수(eˣ, aˣ), 삼각함수(sin, cos, sec², csc²)의
 * 부정적분을 구하고, 이것으로 여러 가지 함수의 정적분을 계산한다. */
(function () {
  // 곡선 아래를 칠한 그래프 SVG. o: { x: [min, max], y: [min, max], fns: [함수], shade: [{ top, bot?, a, b, c? }], text: [[x, y, 글자]] }
  function plot(o) {
    var W = 280, H = 200, pl = 14, pr = 14, pt = 14, pb = 16;
    var x0 = o.x[0], x1 = o.x[1], y0 = o.y[0], y1 = o.y[1];
    function X(x) { return pl + (x - x0) / (x1 - x0) * (W - pl - pr); }
    function Y(y) { return pt + (y1 - y) / (y1 - y0) * (H - pt - pb); }
    function r1(v) { return Math.round(v * 10) / 10; }
    function P(x, y) { return r1(X(x)) + ',' + r1(Y(y)); }
    function cl(y) { return Math.max(y0, Math.min(y1, y)); }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">';
    (o.shade || []).forEach(function (r) {
      var pts = [], n = 48, i, x;
      for (i = 0; i <= n; i++) { x = r.a + (r.b - r.a) * i / n; pts.push(P(x, cl(r.top(x)))); }
      for (i = n; i >= 0; i--) { x = r.a + (r.b - r.a) * i / n; pts.push(P(x, cl(r.bot ? r.bot(x) : 0))); }
      s += '<polygon points="' + pts.join(' ') + '" fill="var(--fig-' + (r.c || 1) + ')" fill-opacity="0.38" stroke="none"/>';
    });
    var ax = r1(Y(0)), ay = r1(X(0));
    s += '<g stroke="currentColor" stroke-width="1.3" fill="none">';
    s += '<line x1="4" y1="' + ax + '" x2="' + (W - 5) + '" y2="' + ax + '"/>';
    if (x0 <= 0 && x1 >= 0) s += '<line x1="' + ay + '" y1="' + (H - 4) + '" x2="' + ay + '" y2="5"/>';
    s += '</g><g fill="currentColor">';
    s += '<polygon points="' + (W - 2) + ',' + ax + ' ' + (W - 9) + ',' + r1(ax - 3.5) + ' ' + (W - 9) + ',' + r1(ax + 3.5) + '"/>';
    if (x0 <= 0 && x1 >= 0) s += '<polygon points="' + ay + ',2 ' + r1(ay - 3.5) + ',9 ' + r1(ay + 3.5) + ',9"/>';
    s += '</g>';
    (o.fns || []).forEach(function (fn, k) {
      var d = '', on = false, n = 160, i, x, y;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n;
        y = fn(x);
        if (!isFinite(y) || y < y0 || y > y1) { on = false; continue; }
        d += (on ? 'L' : 'M') + P(x, y);
        on = true;
      }
      s += '<path d="' + d + '" fill="none" stroke="' + (k === 0 ? 'currentColor' : 'var(--fig-' + (k + 1) + ')') + '" stroke-width="2.2" stroke-linejoin="round"/>';
    });
    s += '<g fill="currentColor" font-family="sans-serif" font-size="13" text-anchor="middle">';
    (o.text || []).forEach(function (t) { s += '<text x="' + r1(X(t[0])) + '" y="' + r1(Y(t[1])) + '">' + t[2] + '</text>'; });
    s += '</g></svg>';
    return s;
  }
  var PI = Math.PI;
  function recip(x) { return Math.abs(x) < 0.05 ? NaN : 1 / x; }

  // 계수(Frac) × 본체(TeX) — 1·-1 은 생략
  function cterm(c, body) {
    if (c.eq(1)) return body;
    if (c.eq(-1)) return '-' + body;
    return c.toTex() + (/^\d/.test(body) ? '\\cdot ' : '') + body;
  }
  function tex(f) { return f.toTex(); }
  function ptex(f) { return f.sign() < 0 ? '(' + f.toTex() + ')' : f.toTex(); }
  function dedupWrong(ans, cands) {
    var out = [], seen = {};
    seen[ans.toString()] = true;
    cands.forEach(function (w) {
      var k = w[0].toString();
      if (!seen[k]) { seen[k] = true; out.push({ a: k, why: w[1] }); }
    });
    return out;
  }

  Tutor.registerUnit({
    id: 'math-h-calc2-09',
    course: 'math-h-calc2',
    title: '여러 가지 함수의 적분',
    summary: '미분법을 거꾸로 생각하여 $x^n$($n$은 실수), 지수함수, 삼각함수의 부정적분을 구하고, 이를 이용하여 여러 가지 함수의 정적분을 계산합니다.',
    goals: [
      '$n$이 실수일 때 $x^n$의 부정적분을 구하고, $\\dfrac{1}{x}$의 부정적분이 $\\ln|x|+C$임을 설명할 수 있다.',
      '지수함수 $e^x$, $a^x$의 부정적분을 구할 수 있다.',
      '삼각함수 $\\sin x$, $\\cos x$, $\\sec^{2}x$, $\\csc^{2}x$의 부정적분을 구할 수 있다.',
      '여러 가지 함수의 정적분을 계산할 수 있다.',
    ],
    standards: ['[12미적Ⅱ-03-01]'],

    concepts: [
      {
        title: '$x^n$의 부정적분 ($n$은 실수)',
        body: '미적분Ⅰ에서는 자연수 $n$에 대하여 $\\int x^n\\,dx=\\dfrac{1}{n+1}x^{n+1}+C$를 배웠습니다. 앞에서 배운 미분법 $\\left(x^{r}\\right)\'=rx^{r-1}$은 지수 $r$이 **실수**일 때도 성립하므로, 적분 공식도 실수 지수로 넓어집니다.\n\n' +
          '$n\\ne-1$인 실수 $n$에 대하여\n\n' +
          '$\\int x^n\\,dx=\\dfrac{1}{n+1}x^{n+1}+C$\n\n' +
          '오른쪽을 미분하면 $\\dfrac{1}{n+1}\\times(n+1)x^{n}=x^n$이 되는 것으로 확인할 수 있습니다.\n\n' +
          '근호나 분수 꼴은 먼저 **거듭제곱 꼴로 바꾼 뒤** 공식을 씁니다.\n\n' +
          '- $\\int\\sqrt{x}\\,dx=\\int x^{\\frac{1}{2}}\\,dx=\\dfrac{2}{3}x^{\\frac{3}{2}}+C=\\dfrac{2}{3}x\\sqrt{x}+C$\n' +
          '- $\\int\\dfrac{1}{x^{3}}\\,dx=\\int x^{-3}\\,dx=\\dfrac{1}{-2}x^{-2}+C=-\\dfrac{1}{2x^{2}}+C$\n\n' +
          '> ⚠️ $n=-1$이면 분모 $n+1$이 0이 되어 이 공식을 쓸 수 없습니다. $\\dfrac{1}{x}$의 부정적분은 다음 카드에서 따로 다룹니다.',
        easy: '적분은 "미분하기 전의 함수 찾기"입니다. 미분할 때 지수를 앞으로 내리고 1을 뺐으니, 거꾸로 할 때는 **지수에 1을 더하고, 그 새 지수로 나눕니다.**\n\n' +
          '$\\sqrt{x}$는 $x^{\\frac{1}{2}}$입니다. 지수에 1을 더하면 $\\dfrac{3}{2}$이고, $\\dfrac{3}{2}$으로 나누는 것은 $\\dfrac{2}{3}$를 곱하는 것과 같습니다. 그래서 $\\dfrac{2}{3}x^{\\frac{3}{2}}$입니다. 답을 미분해서 처음 함수가 나오는지 확인하는 습관을 들이면 실수가 줄어듭니다.',
        check: {
          type: 'choice',
          q: '$\\int\\sqrt{x}\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
          choices: ['$\\dfrac{2}{3}x\\sqrt{x}+C$', '$\\dfrac{3}{2}x\\sqrt{x}+C$', '$\\dfrac{1}{2\\sqrt{x}}+C$'],
          answer: 0,
          why: [
            '',
            '새 지수 $\\dfrac{3}{2}$을 곱했습니다. 새 지수로 **나누어야** 하므로 $\\dfrac{2}{3}$를 곱합니다.',
            '$\\sqrt{x}$를 미분했습니다. $\\dfrac{1}{2\\sqrt{x}}$는 $\\sqrt{x}$의 도함수입니다.',
          ],
          explain: '$\\sqrt{x}=x^{\\frac{1}{2}}$이므로 $\\int x^{\\frac{1}{2}}\\,dx=\\dfrac{1}{\\frac{3}{2}}x^{\\frac{3}{2}}+C=\\dfrac{2}{3}x\\sqrt{x}+C$입니다.',
        },
      },
      {
        title: '$\\dfrac{1}{x}$의 부정적분',
        body: '$x>0$일 때 $(\\ln x)\'=\\dfrac{1}{x}$입니다. $x<0$일 때는 $\\ln(-x)$를 미분하면 $\\dfrac{-1}{-x}=\\dfrac{1}{x}$입니다. 두 경우를 함께 쓰면 $x\\ne0$에서 $(\\ln|x|)\'=\\dfrac{1}{x}$이므로\n\n' +
          '$\\int\\dfrac{1}{x}\\,dx=\\ln|x|+C$\n\n' +
          '입니다. 절댓값 기호는 $x<0$인 범위에서도 공식이 맞도록 붙인 것입니다. $\\ln x$는 $x>0$에서만 정의되기 때문입니다.\n\n' +
          '분수 꼴은 분자를 분모로 나누어 항별로 적분합니다.\n\n' +
          '$\\int\\dfrac{x^2+3}{x}\\,dx=\\int\\left(x+\\dfrac{3}{x}\\right)dx=\\dfrac{1}{2}x^2+3\\ln|x|+C$\n\n' +
          '> 💡 $y=\\dfrac{1}{x}$의 그래프는 $x=0$에서 끊어져 있습니다. 그래서 $x>0$인 부분과 $x<0$인 부분에서 적분상수가 서로 다를 수도 있습니다(심화 문제에서 다룹니다).',
        easy: '$x^n$ 공식에 $n=-1$을 넣으면 $\\dfrac{x^{0}}{0}$이 되어 계산할 수 없습니다. 그래서 $\\dfrac{1}{x}$만은 "미분해서 $\\dfrac{1}{x}$이 되는 함수"를 따로 기억합니다. 그것이 자연로그 $\\ln x$입니다.\n\n' +
          '그런데 $\\ln x$는 양수에서만 계산할 수 있습니다. 음수 $x$에서도 쓸 수 있게 $x$에 절댓값을 씌워 $\\ln|x|$로 씁니다. 그림처럼 $y=\\dfrac{1}{x}$의 그래프는 두 조각인데, $\\ln|x|$도 오른쪽 조각과 왼쪽 조각을 모두 맡습니다.',
        fig: {
          type: 'svg',
          alt: '쌍곡선 y=1/x 의 그래프. x>0 인 오른쪽 위 조각과 x<0 인 왼쪽 아래 조각으로 나뉘어 있다',
          svg: plot({
            x: [-4, 4], y: [-3, 3], fns: [recip],
            text: [[2.8, 0.75, 'y=1/x'], [0.25, -0.45, 'O']],
          }),
        },
        check: {
          type: 'ox',
          q: '$\\int\\dfrac{1}{x}\\,dx=\\ln x+C$는 $x<0$인 범위에서도 그대로 쓸 수 있습니다.',
          answer: false,
          explain: '$\\ln x$는 $x>0$에서만 정의됩니다. $x<0$에서는 $\\ln(-x)$를 미분해야 $\\dfrac{1}{x}$이 되므로, 두 경우를 함께 $\\int\\dfrac{1}{x}\\,dx=\\ln|x|+C$로 씁니다.',
        },
      },
      {
        title: '지수함수의 부정적분',
        body: '$(e^x)\'=e^x$이므로 $e^x$은 미분해도 적분해도 모양이 같습니다.\n\n' +
          '$\\int e^x\\,dx=e^x+C$\n\n' +
          '$a>0$, $a\\ne1$일 때 $(a^x)\'=a^x\\ln a$입니다. 미분하면 $\\ln a$가 곱해지므로, 적분할 때는 $\\ln a$로 **나눕니다.**\n\n' +
          '$\\int a^x\\,dx=\\dfrac{a^x}{\\ln a}+C$\n\n' +
          '예: $\\int 2^x\\,dx=\\dfrac{2^x}{\\ln 2}+C$, $\\int(3e^x-5^x)\\,dx=3e^x-\\dfrac{5^x}{\\ln 5}+C$\n\n' +
          '> 💡 $a=e$이면 $\\ln e=1$이어서 두 공식이 같아집니다. $e^x$ 공식은 $a^x$ 공식의 특별한 경우입니다.\n\n' +
          '> ⚠️ $a^x$에 거듭제곱 공식을 써서 $\\dfrac{a^{x+1}}{x+1}$로 하면 안 됩니다. 거듭제곱 공식은 **밑**이 변수 $x$인 $x^n$ 꼴에만 씁니다. $a^x$은 **지수**가 변수입니다.',
        easy: '$e^x$은 미분해도 자기 자신이 되는 특별한 함수여서, 적분해도 그대로입니다.\n\n' +
          '$2^x$은 미분할 때마다 $\\ln 2$라는 수가 하나씩 곱해져 나옵니다. 거꾸로 적분할 때는 그 수를 미리 나누어 두면, 미분했을 때 곱해지는 $\\ln 2$와 지워져 $2^x$으로 돌아옵니다. "미분이 곱하면 적분은 나눈다"라고 기억하면 됩니다.',
        fig: {
          type: 'svg',
          alt: '지수함수 y=e^x 의 그래프. 왼쪽에서는 x축에 가까이 붙어 있다가 오른쪽으로 갈수록 가파르게 올라가며 점 (0, 1)을 지난다',
          svg: plot({
            x: [-3, 2.2], y: [-0.6, 7], fns: [function (x) { return Math.exp(x); }],
            text: [[1.15, 5.6, 'y=eˣ'], [-0.25, 1.15, '1'], [0.2, -0.4, 'O']],
          }),
        },
        check: {
          type: 'choice',
          q: '$\\int 2^x\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
          choices: ['$\\dfrac{2^x}{\\ln 2}+C$', '$2^x\\ln 2+C$', '$\\dfrac{2^{x+1}}{x+1}+C$'],
          answer: 0,
          why: [
            '',
            '$2^x$을 미분했습니다. 미분하면 $\\ln 2$가 곱해지므로 적분할 때는 $\\ln 2$로 나눕니다.',
            '거듭제곱 공식을 썼습니다. $2^x$은 지수가 변수인 지수함수이므로 $\\int a^x\\,dx=\\dfrac{a^x}{\\ln a}+C$를 씁니다.',
          ],
          explain: '$(2^x)\'=2^x\\ln 2$이므로 $\\left(\\dfrac{2^x}{\\ln 2}\\right)\'=2^x$입니다. 따라서 $\\int 2^x\\,dx=\\dfrac{2^x}{\\ln 2}+C$입니다.',
        },
      },
      {
        title: '삼각함수의 부정적분',
        body: '삼각함수의 도함수를 거꾸로 읽으면 부정적분이 됩니다.\n\n' +
          '| 미분 | 적분 |\n|---|---|\n' +
          '| $(\\sin x)\'=\\cos x$ | $\\int\\cos x\\,dx=\\sin x+C$ |\n' +
          '| $(\\cos x)\'=-\\sin x$ | $\\int\\sin x\\,dx=-\\cos x+C$ |\n' +
          '| $(\\tan x)\'=\\sec^{2}x$ | $\\int\\sec^{2}x\\,dx=\\tan x+C$ |\n' +
          '| $(\\cot x)\'=-\\csc^{2}x$ | $\\int\\csc^{2}x\\,dx=-\\cot x+C$ |\n\n' +
          '$\\sin x$와 $\\csc^{2}x$의 부정적분에는 **$-$ 부호**가 붙는 것에 주의합니다. $\\cos x$와 $\\cot x$를 미분하면 $-$가 생기기 때문입니다.\n\n' +
          '$\\tan^{2}x$, $\\cot^{2}x$는 삼각함수 사이의 관계 $1+\\tan^{2}x=\\sec^{2}x$, $1+\\cot^{2}x=\\csc^{2}x$로 바꾸어 적분합니다.\n\n' +
          '$\\int\\tan^{2}x\\,dx=\\int(\\sec^{2}x-1)\\,dx=\\tan x-x+C$',
        easy: '부호가 헷갈리면 답을 미분해 보면 됩니다. $\\int\\sin x\\,dx$의 답을 $\\cos x$라고 써 놓고 미분하면 $-\\sin x$가 나와 부호가 반대입니다. 그래서 $-\\cos x$로 고칩니다.\n\n' +
          '그림은 $y=\\sin x$의 한 봉우리입니다. $\\int_{0}^{\\pi}\\sin x\\,dx=\\left[-\\cos x\\right]_{0}^{\\pi}=1-(-1)=2$이므로, 칠한 봉우리의 넓이는 정확히 2입니다.',
        fig: {
          type: 'svg',
          alt: '0 부터 π 까지 x축 위로 솟은 사인 곡선의 봉우리 아래가 칠해져 있는 그림',
          svg: plot({
            x: [-0.4, 3.9], y: [-0.4, 1.4], fns: [Math.sin],
            shade: [{ top: Math.sin, a: 0, b: PI, c: 1 }],
            text: [[PI, -0.25, 'π'], [-0.15, -0.25, 'O'], [1.57, 1.18, 'y=sin x']],
          }),
        },
        check: {
          type: 'choice',
          q: '$\\int\\sin x\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
          choices: ['$-\\cos x+C$', '$\\cos x+C$', '$-\\sin x+C$'],
          answer: 0,
          why: [
            '',
            '$\\cos x$를 미분하면 $-\\sin x$이므로 부호가 반대입니다.',
            '$-\\sin x$를 미분하면 $-\\cos x$입니다. 미분해서 $\\sin x$가 되는 함수를 찾아야 합니다.',
          ],
          explain: '$(-\\cos x)\'=-(-\\sin x)=\\sin x$이므로 $\\int\\sin x\\,dx=-\\cos x+C$입니다.',
        },
      },
      {
        title: '여러 가지 함수의 정적분',
        body: '부정적분을 구할 수 있으면 미적분의 기본정리 $\\int_{a}^{b}f(x)\\,dx=\\left[F(x)\\right]_{a}^{b}=F(b)-F(a)$로 정적분을 계산합니다. 정적분의 성질(상수배, 합과 차, 구간 나누기, 대칭성)도 그대로 씁니다.\n\n' +
          '- $\\int_{1}^{e}\\dfrac{1}{x}\\,dx=\\left[\\ln|x|\\right]_{1}^{e}=\\ln e-\\ln 1=1$\n' +
          '- $\\int_{0}^{\\ln 3}e^x\\,dx=\\left[e^x\\right]_{0}^{\\ln 3}=e^{\\ln 3}-e^{0}=3-1=2$\n' +
          '- $\\int_{0}^{\\frac{\\pi}{2}}\\cos x\\,dx=\\left[\\sin x\\right]_{0}^{\\frac{\\pi}{2}}=1-0=1$\n' +
          '- $\\int_{1}^{4}\\dfrac{1}{\\sqrt{x}}\\,dx=\\left[2\\sqrt{x}\\right]_{1}^{4}=4-2=2$\n\n' +
          '> 💡 자주 쓰는 값: $\\ln 1=0$, $\\ln e=1$, $e^{0}=1$, $e^{\\ln a}=a$, $\\sin 0=0$, $\\cos 0=1$, $\\cos\\pi=-1$\n\n' +
          '> ⚠️ $\\int_{a}^{b}\\dfrac{1}{x}\\,dx$는 구간 $[a, b]$에 0이 들어 있으면 계산할 수 없습니다. 함수가 $x=0$에서 정의되지 않기 때문입니다.',
        easy: '정적분 계산 순서는 미적분Ⅰ과 똑같습니다. ① 부정적분 $F(x)$를 구하고, ② 위끝을 넣은 값 $F(b)$에서 ③ 아래끝을 넣은 값 $F(a)$를 뺍니다.\n\n' +
          '달라진 것은 넣는 함수가 $\\ln$, $e^x$, $\\sin$처럼 다양해졌다는 것뿐입니다. 그래서 $\\ln 1=0$, $e^{0}=1$, $\\cos\\pi=-1$ 같은 값을 정확히 아는 것이 중요합니다. 특히 $e^{0}$은 0이 아니라 1이라는 점을 자주 놓칩니다.',
        check: {
          type: 'short', check: 'number',
          q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{1}^{e^{2}}\\dfrac{1}{x}\\,dx$',
          answer: '2',
          wrong: [
            { a: '-2', why: '아래끝 값에서 위끝 값을 뺐습니다. $\\ln e^{2}-\\ln 1$ 순서로 뺍니다.' },
            { a: '1', why: '$\\ln 1$을 1로 셈했습니다. $\\ln 1=0$입니다.' },
          ],
          explain: '$\\left[\\ln|x|\\right]_{1}^{e^{2}}=\\ln e^{2}-\\ln 1=2-0=2$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '다음 부정적분을 구하십시오.\n\n$\\int\\left(x\\sqrt{x}-\\dfrac{3}{x}+2e^x\\right)dx$',
        steps: [
          '$x\\sqrt{x}=x^{\\frac{3}{2}}$이므로 $\\int x^{\\frac{3}{2}}\\,dx=\\dfrac{2}{5}x^{\\frac{5}{2}}=\\dfrac{2}{5}x^{2}\\sqrt{x}$입니다.',
          '$\\int\\dfrac{3}{x}\\,dx=3\\ln|x|$입니다.',
          '$\\int 2e^x\\,dx=2e^x$입니다.',
          '항별로 모으고 적분상수를 하나 붙입니다.',
        ],
        answer: '$\\dfrac{2}{5}x^{2}\\sqrt{x}-3\\ln|x|+2e^x+C$',
      },
      {
        q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{1}^{4}\\dfrac{x+2}{\\sqrt{x}}\\,dx$',
        steps: [
          '분자를 분모로 나누어 거듭제곱 꼴로 씁니다. $\\dfrac{x+2}{\\sqrt{x}}=x^{\\frac{1}{2}}+2x^{-\\frac{1}{2}}$',
          '부정적분은 $\\dfrac{2}{3}x^{\\frac{3}{2}}+4x^{\\frac{1}{2}}=\\dfrac{2}{3}x\\sqrt{x}+4\\sqrt{x}$입니다.',
          '위끝을 넣으면 $\\dfrac{2}{3}\\times8+4\\times2=\\dfrac{40}{3}$, 아래끝을 넣으면 $\\dfrac{2}{3}+4=\\dfrac{14}{3}$입니다.',
          '빼면 $\\dfrac{40}{3}-\\dfrac{14}{3}=\\dfrac{26}{3}$입니다.',
        ],
        answer: '$\\dfrac{26}{3}$',
      },
      {
        q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{0}^{\\frac{\\pi}{4}}(\\sec^{2}x+2\\sin x)\\,dx$',
        steps: [
          '부정적분은 $\\tan x-2\\cos x$입니다.',
          '위끝 $\\dfrac{\\pi}{4}$를 넣으면 $1-2\\times\\dfrac{\\sqrt{2}}{2}=1-\\sqrt{2}$입니다.',
          '아래끝 0을 넣으면 $0-2\\times1=-2$입니다.',
          '빼면 $(1-\\sqrt{2})-(-2)=3-\\sqrt{2}$입니다.',
        ],
        answer: '$3-\\sqrt{2}$',
      },
    ],

    terms: [
      { term: '부정적분', def: '미분하여 $f(x)$가 되는 함수들을 $\\int f(x)\\,dx$로 나타낸 것입니다. 한 부정적분이 $F(x)$이면 $\\int f(x)\\,dx=F(x)+C$입니다.' },
      { term: '적분상수', def: '부정적분 $F(x)+C$에 붙는 상수 $C$입니다. 상수는 미분하면 0이 되므로 어떤 상수를 더해도 부정적분입니다.' },
      { term: '자연로그', def: '밑이 $e$인 로그 $\\ln x=\\log_{e}x$입니다. $(\\ln|x|)\'=\\dfrac{1}{x}$이므로 $\\int\\dfrac{1}{x}\\,dx=\\ln|x|+C$입니다.' },
      { term: '시컨트 함수', def: '$\\sec x=\\dfrac{1}{\\cos x}$입니다. $(\\tan x)\'=\\sec^{2}x$이므로 $\\int\\sec^{2}x\\,dx=\\tan x+C$입니다.' },
      { term: '코시컨트 함수', def: '$\\csc x=\\dfrac{1}{\\sin x}$입니다. $(\\cot x)\'=-\\csc^{2}x$이므로 $\\int\\csc^{2}x\\,dx=-\\cot x+C$입니다.' },
      { term: '코탄젠트 함수', def: '$\\cot x=\\dfrac{1}{\\tan x}=\\dfrac{\\cos x}{\\sin x}$입니다.' },
      { term: '실수 지수의 적분 공식', def: '$n\\ne-1$인 실수 $n$에 대하여 $\\int x^n\\,dx=\\dfrac{1}{n+1}x^{n+1}+C$입니다. 근호나 분수 꼴은 거듭제곱 꼴로 바꾸어 씁니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '$\\int\\dfrac{1}{x^{3}}\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
        choices: ['$-\\dfrac{1}{2x^{2}}+C$', '$\\dfrac{1}{2x^{2}}+C$', '$-\\dfrac{3}{x^{4}}+C$', '$-\\dfrac{1}{4x^{4}}+C$'],
        answer: 0,
        why: [
          '',
          '새 지수 $-2$로 나누어야 하는데 부호를 놓쳤습니다. $\\dfrac{1}{-2}x^{-2}$입니다.',
          '$x^{-3}$을 미분했습니다. 적분은 지수에 1을 **더합니다**.',
          '지수에 1을 더해야 하는데 1을 뺐습니다. $-3+1=-2$입니다.',
        ],
        explain: '$\\dfrac{1}{x^{3}}=x^{-3}$이므로 $\\int x^{-3}\\,dx=\\dfrac{1}{-2}x^{-2}+C=-\\dfrac{1}{2x^{2}}+C$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 1,
        q: '$\\int\\dfrac{1}{x}\\,dx$는 공식 $\\int x^n\\,dx=\\dfrac{1}{n+1}x^{n+1}+C$에 $n=-1$을 넣어 구할 수 있습니다.',
        answer: false,
        explain: '$n=-1$이면 분모 $n+1$이 0이 되어 공식을 쓸 수 없습니다. $\\dfrac{1}{x}$의 부정적분은 $(\\ln|x|)\'=\\dfrac{1}{x}$에서 $\\ln|x|+C$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 2,
        q: '$\\int(e^x+3^x)\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
        choices: ['$e^x+\\dfrac{3^x}{\\ln 3}+C$', '$e^x+3^x\\ln 3+C$', '$\\dfrac{e^{x+1}}{x+1}+\\dfrac{3^{x+1}}{x+1}+C$', '$e^x+3^x+C$'],
        answer: 0,
        why: [
          '',
          '$3^x$을 미분했습니다. 적분할 때는 $\\ln 3$으로 나눕니다.',
          '지수함수에 거듭제곱 공식을 썼습니다. 거듭제곱 공식은 밑이 $x$인 $x^n$ 꼴에만 씁니다.',
          '$3^x$도 $e^x$처럼 그대로라고 생각했습니다. $(3^x)\'=3^x\\ln 3$이므로 $\\ln 3$으로 나누어야 합니다.',
        ],
        explain: '$\\int e^x\\,dx=e^x+C$, $\\int 3^x\\,dx=\\dfrac{3^x}{\\ln 3}+C$이므로 $e^x+\\dfrac{3^x}{\\ln 3}+C$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 3,
        q: '$\\int(\\cos x-\\csc^{2}x)\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
        choices: ['$\\sin x+\\cot x+C$', '$\\sin x-\\cot x+C$', '$-\\sin x+\\cot x+C$', '$\\sin x+\\tan x+C$'],
        answer: 0,
        why: [
          '',
          '$\\int\\csc^{2}x\\,dx=-\\cot x$이므로 $-\\int\\csc^{2}x\\,dx=+\\cot x$입니다. 부호가 두 번 바뀌는 것을 놓쳤습니다.',
          '$\\int\\cos x\\,dx$의 부호가 틀렸습니다. $(\\sin x)\'=\\cos x$이므로 $+\\sin x$입니다.',
          '$\\csc^{2}x$와 $\\sec^{2}x$를 헷갈렸습니다. $\\tan x$를 미분하면 $\\sec^{2}x$입니다.',
        ],
        explain: '$\\int\\cos x\\,dx=\\sin x$, $\\int\\csc^{2}x\\,dx=-\\cot x$입니다. 따라서 $\\sin x-(-\\cot x)+C=\\sin x+\\cot x+C$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 4,
        q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{1}^{e}\\dfrac{3}{x}\\,dx$',
        answer: '3',
        wrong: [
          { a: '0', why: '$\\ln e$와 $\\ln 1$을 모두 1로 셈했습니다. $\\ln e=1$, $\\ln 1=0$입니다.' },
          { a: '-3', why: '아래끝 값에서 위끝 값을 뺐습니다.' },
        ],
        explain: '$\\left[3\\ln|x|\\right]_{1}^{e}=3\\ln e-3\\ln 1=3-0=3$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 4,
        q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{0}^{\\frac{\\pi}{3}}\\sin x\\,dx$',
        answer: '1/2',
        wrong: [
          { a: '-1/2', why: '$\\int\\sin x\\,dx$를 $\\cos x$로 했습니다. $-\\cos x$입니다.' },
          { a: '3/2', why: '위끝 값 $-\\cos\\dfrac{\\pi}{3}$의 부호를 놓쳐 $\\dfrac{1}{2}-(-1)$로 계산했습니다. $-\\cos\\dfrac{\\pi}{3}=-\\dfrac{1}{2}$이므로 $-\\dfrac{1}{2}-(-1)$입니다.' },
        ],
        explain: '$\\left[-\\cos x\\right]_{0}^{\\frac{\\pi}{3}}=-\\cos\\dfrac{\\pi}{3}-(-\\cos 0)=-\\dfrac{1}{2}+1=\\dfrac{1}{2}$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'number', concept: 4,
        q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{0}^{\\ln 5}e^x\\,dx$',
        answer: '4',
        wrong: [{ a: '5', why: '$e^{0}$을 0으로 셈했습니다. $e^{0}=1$이므로 $5-1=4$입니다.' }],
        explain: '$\\left[e^x\\right]_{0}^{\\ln 5}=e^{\\ln 5}-e^{0}=5-1=4$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 3,
        q: '$\\int\\tan^{2}x\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
        choices: ['$\\tan x-x+C$', '$\\dfrac{1}{3}\\tan^{3}x+C$', '$\\tan x+x+C$', '$\\sec^{2}x+C$'],
        answer: 0,
        hint: '$1+\\tan^{2}x=\\sec^{2}x$를 이용합니다.',
        why: [
          '',
          '거듭제곱 공식을 $\\tan x$에 썼습니다. 이 공식은 $x^n$ 꼴에만 씁니다. 미분해 보면 $\\tan^{2}x\\sec^{2}x$가 되어 맞지 않습니다.',
          '$\\tan^{2}x=\\sec^{2}x-1$인데 $\\sec^{2}x+1$로 바꾸었습니다.',
          '$\\tan^{2}x$와 $\\sec^{2}x$를 같다고 보았습니다. 둘은 1만큼 차이 납니다.',
        ],
        explain: '$\\tan^{2}x=\\sec^{2}x-1$이므로 $\\int(\\sec^{2}x-1)\\,dx=\\tan x-x+C$입니다. 미분하면 $\\sec^{2}x-1=\\tan^{2}x$로 돌아옵니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 1,
        q: '$\\int\\dfrac{(x+1)^{2}}{x}\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
        choices: ['$\\dfrac{1}{2}x^{2}+2x+\\ln|x|+C$', '$\\dfrac{1}{2}x^{2}+2x-\\dfrac{1}{x^{2}}+C$', '$\\dfrac{(x+1)^{3}}{3}\\ln|x|+C$', '$\\dfrac{1}{2}x^{2}+x+\\ln|x|+C$'],
        answer: 0,
        hint: '분자를 전개한 뒤 $x$로 나누어 항별로 적분합니다.',
        why: [
          '',
          '$\\dfrac{1}{x}$을 미분했습니다. $\\int\\dfrac{1}{x}\\,dx=\\ln|x|$입니다.',
          '분자와 분모를 따로 적분하여 곱했습니다. 몫의 적분은 이렇게 할 수 없으므로 먼저 나눗셈을 합니다.',
          '전개를 잘못했습니다. $(x+1)^{2}=x^{2}+2x+1$이므로 $x$로 나누면 $x+2+\\dfrac{1}{x}$입니다.',
        ],
        explain: '$\\dfrac{(x+1)^{2}}{x}=\\dfrac{x^{2}+2x+1}{x}=x+2+\\dfrac{1}{x}$이므로 $\\int\\left(x+2+\\dfrac{1}{x}\\right)dx=\\dfrac{1}{2}x^{2}+2x+\\ln|x|+C$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 3,
        q: '함수 $f(x)$에 대하여 $f\'(x)=\\cos x$이고 $f(0)=2$일 때, $f\\left(\\dfrac{\\pi}{2}\\right)$의 값을 구하십시오.',
        answer: '3',
        hint: '$f(x)=\\sin x+C$로 놓고 $f(0)=2$로 $C$를 정합니다.',
        wrong: [
          { a: '1', why: '적분상수 $C$를 0으로 두었거나, $f(x)=-\\sin x+C$로 적분했습니다. $(\\sin x)\'=\\cos x$이므로 $f(x)=\\sin x+C$이고, $f(0)=2$에서 $C=2$입니다.' },
          { a: '2', why: '$f(0)$의 값을 그대로 답했습니다. $C=2$를 구한 뒤 $f\\left(\\dfrac{\\pi}{2}\\right)=\\sin\\dfrac{\\pi}{2}+2$를 계산합니다.' },
        ],
        explain: '$f(x)=\\int\\cos x\\,dx=\\sin x+C$이고 $f(0)=0+C=2$이므로 $C=2$입니다. 따라서 $f\\left(\\dfrac{\\pi}{2}\\right)=1+2=3$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 4,
        q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{-\\frac{\\pi}{2}}^{\\frac{\\pi}{2}}(\\sin x+\\cos x)\\,dx$',
        answer: '2',
        hint: '$\\sin x$는 그래프가 원점에 대칭, $\\cos x$는 $y$축에 대칭입니다.',
        wrong: [
          { a: '0', why: '$\\cos x$까지 지워진다고 보았습니다. $\\cos x$는 $y$축에 대칭이므로 $0$부터 $\\dfrac{\\pi}{2}$까지의 2배입니다.' },
          { a: '4', why: '$\\sin x$까지 2배 했습니다. $\\sin x$는 원점에 대칭이어서 $0$이 됩니다.' },
        ],
        explain: '$\\sin(-x)=-\\sin x$이므로 $\\int_{-\\frac{\\pi}{2}}^{\\frac{\\pi}{2}}\\sin x\\,dx=0$이고, $\\cos(-x)=\\cos x$이므로 $\\int_{-\\frac{\\pi}{2}}^{\\frac{\\pi}{2}}\\cos x\\,dx=2\\left[\\sin x\\right]_{0}^{\\frac{\\pi}{2}}=2$입니다. 따라서 값은 $2$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 0,
        q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{1}^{8}\\sqrt[3]{x}\\,dx$',
        answer: '45/4',
        hint: '$\\sqrt[3]{x}=x^{\\frac{1}{3}}$입니다.',
        wrong: [
          { a: '20', why: '새 지수 $\\dfrac{4}{3}$를 곱했습니다. $\\dfrac{4}{3}$로 나누어야 하므로 $\\dfrac{3}{4}$을 곱합니다.' },
          { a: '12', why: '아래끝 값을 빼지 않았습니다. $\\dfrac{3}{4}\\times1^{\\frac{4}{3}}=\\dfrac{3}{4}$을 빼야 합니다.' },
        ],
        explain: '$\\int x^{\\frac{1}{3}}\\,dx=\\dfrac{3}{4}x^{\\frac{4}{3}}$이므로 $\\left[\\dfrac{3}{4}x^{\\frac{4}{3}}\\right]_{1}^{8}=\\dfrac{3}{4}\\times16-\\dfrac{3}{4}\\times1=12-\\dfrac{3}{4}=\\dfrac{45}{4}$입니다. ($8^{\\frac{4}{3}}=(\\sqrt[3]{8})^{4}=2^{4}=16$)',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 4,
        q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{0}^{2\\pi}|\\sin x|\\,dx$',
        answer: '4',
        hint: '$\\sin x$의 부호가 바뀌는 $x=\\pi$에서 구간을 나눕니다.',
        wrong: [{ a: '0', why: '절댓값 기호를 무시했습니다. 구간 $[\\pi, 2\\pi]$에서는 $\\sin x\\le0$이므로 $-\\sin x$를 적분합니다.' }],
        explain: '$\\int_{0}^{\\pi}\\sin x\\,dx+\\int_{\\pi}^{2\\pi}(-\\sin x)\\,dx=\\left[-\\cos x\\right]_{0}^{\\pi}+\\left[\\cos x\\right]_{\\pi}^{2\\pi}=2+2=4$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 1,
        q: '$x\\ne0$인 모든 실수 $x$에서 미분가능한 함수 $f(x)$가 $f\'(x)=\\dfrac{1}{x}$, $f(1)=0$, $f(-1)=2$를 만족시킬 때, $f(-e)$의 값을 구하십시오.',
        answer: '3',
        hint: '$x>0$인 범위와 $x<0$인 범위에서 적분상수를 따로 둡니다.',
        wrong: [
          { a: '1', why: '두 범위의 적분상수를 같게 두었습니다. $x<0$에서는 $f(-1)=2$로 상수를 따로 정합니다.' },
          { a: '2', why: '$\\ln|-e|=1$을 더하는 것을 빠뜨렸습니다.' },
        ],
        explain: '$f(x)=\\ln|x|+C_1$ ($x>0$), $f(x)=\\ln|x|+C_2$ ($x<0$)로 놓습니다. $f(1)=C_1=0$, $f(-1)=C_2=2$입니다. 따라서 $f(-e)=\\ln e+2=3$입니다. 정의역이 $x=0$에서 끊어져 있으므로 두 상수가 같을 필요가 없습니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 3,
        q: '다음 정적분의 값은 무엇입니까?\n\n$\\int_{0}^{\\frac{\\pi}{2}}\\left(\\sin\\dfrac{x}{2}+\\cos\\dfrac{x}{2}\\right)^{2}dx$',
        choices: ['$\\dfrac{\\pi}{2}+1$', '$\\dfrac{\\pi}{2}$', '$\\dfrac{\\pi}{2}-1$', '$\\pi+1$'],
        answer: 0,
        hint: '전개한 뒤 $\\sin^{2}\\theta+\\cos^{2}\\theta=1$과 사인의 배각공식을 씁니다.',
        why: [
          '',
          '$2\\sin\\dfrac{x}{2}\\cos\\dfrac{x}{2}$ 항을 빠뜨렸습니다. 전개하면 $1+\\sin x$입니다.',
          '$\\int\\sin x\\,dx$의 부호를 틀렸습니다. $\\left[-\\cos x\\right]_{0}^{\\frac{\\pi}{2}}=0-(-1)=1$입니다.',
          '$\\sin^{2}\\dfrac{x}{2}+\\cos^{2}\\dfrac{x}{2}$를 2로 셈했습니다. 이 값은 1입니다.',
        ],
        explain: '$\\left(\\sin\\dfrac{x}{2}+\\cos\\dfrac{x}{2}\\right)^{2}=1+2\\sin\\dfrac{x}{2}\\cos\\dfrac{x}{2}=1+\\sin x$입니다.\n\n' +
          '$\\int_{0}^{\\frac{\\pi}{2}}(1+\\sin x)\\,dx=\\left[x-\\cos x\\right]_{0}^{\\frac{\\pi}{2}}=\\dfrac{\\pi}{2}-(-1)=\\dfrac{\\pi}{2}+1$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 3,
        q: '다음 정적분의 값은 무엇입니까?\n\n$\\int_{0}^{\\frac{\\pi}{4}}\\tan^{2}x\\,dx$',
        choices: ['$1-\\dfrac{\\pi}{4}$', '$1+\\dfrac{\\pi}{4}$', '$\\dfrac{1}{3}$', '$\\dfrac{\\pi}{4}-1$'],
        answer: 0,
        why: [
          '',
          '$\\tan^{2}x=\\sec^{2}x-1$인데 $\\sec^{2}x+1$로 바꾸었습니다.',
          '$\\tan x$를 $x$처럼 보고 거듭제곱 공식을 썼습니다. 먼저 $\\sec^{2}x-1$로 바꿉니다.',
          '아래끝 값에서 위끝 값을 뺐습니다.',
        ],
        explain: '$\\int_{0}^{\\frac{\\pi}{4}}(\\sec^{2}x-1)\\,dx=\\left[\\tan x-x\\right]_{0}^{\\frac{\\pi}{4}}=1-\\dfrac{\\pi}{4}$입니다. 구간에서 $\\tan^{2}x\\ge0$이므로 값이 양수인 것도 확인됩니다($\\dfrac{\\pi}{4}<1$).',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 0,
        q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{1}^{4}\\dfrac{x-1}{\\sqrt{x}+1}\\,dx$',
        answer: '5/3',
        hint: '$x-1=(\\sqrt{x}+1)(\\sqrt{x}-1)$로 인수분해해 봅니다.',
        wrong: [{ a: '14/3', why: '$\\int_{1}^{4}\\sqrt{x}\\,dx$만 계산했습니다. $\\sqrt{x}-1$에서 $-1$의 정적분 $-3$도 더해야 합니다.' }],
        explain: '$\\dfrac{x-1}{\\sqrt{x}+1}=\\dfrac{(\\sqrt{x}+1)(\\sqrt{x}-1)}{\\sqrt{x}+1}=\\sqrt{x}-1$입니다.\n\n' +
          '$\\int_{1}^{4}(\\sqrt{x}-1)\\,dx=\\left[\\dfrac{2}{3}x\\sqrt{x}-x\\right]_{1}^{4}=\\left(\\dfrac{16}{3}-4\\right)-\\left(\\dfrac{2}{3}-1\\right)=\\dfrac{4}{3}+\\dfrac{1}{3}=\\dfrac{5}{3}$입니다.',
      },
    ],

    deeper: [
      {
        title: '왜 $\\dfrac{1}{x}$에서만 로그가 나올까?',
        body: '$x^n$의 부정적분은 모두 $x$의 거듭제곱인데, $n=-1$일 때만 전혀 다른 함수 $\\ln|x|$가 나옵니다. 이상해 보이지만 사실 둘은 이어져 있습니다.\n\n' +
          '$x>0$에서 $\\int_{1}^{x}t^{n}\\,dt=\\dfrac{x^{n+1}-1}{n+1}$입니다. $n$을 $-1$에 한없이 가까이 보내면 이 값은 $\\ln x$에 가까워집니다. ($h=n+1$로 놓으면 $\\dfrac{x^{h}-1}{h}$이고, 이 극한은 지수함수 $x^h$을 $h=0$에서 미분한 값 $\\ln x$입니다.) 곧 $\\ln x$는 거듭제곱 공식이 "끊어진 자리"를 메우는 함수입니다.\n\n' +
          '역사적으로도 17세기에 쌍곡선 $y=\\dfrac{1}{x}$ 아래의 넓이가 로그처럼 곱을 합으로 바꾸는 성질을 가진다는 것이 알려졌고, 이것이 자연로그를 이해하는 한 갈래가 되었습니다.',
      },
      {
        title: '다음 단원과의 연결',
        body: '이 단원의 공식은 피적분함수가 $\\sin x$, $e^x$처럼 "기본 모양"일 때만 바로 쓸 수 있습니다. $\\sin 3x$, $xe^{x^2}$, $x\\cos x$, $\\ln x$처럼 조금만 모양이 바뀌어도 공식표에 없습니다.\n\n' +
          '다음 단원에서는 합성함수의 미분법을 거꾸로 쓰는 **치환적분법**과 곱의 미분법에서 나온 **부분적분법**을 배워, 이런 함수도 이 단원의 기본 공식으로 바꾸어 적분합니다.',
      },
    ],

    faq: [
      {
        q: '∫(1/x)dx 에 왜 절댓값을 붙이나요?',
        a: '$\\ln x$는 $x>0$에서만 정의되므로 $\\ln x+C$로 쓰면 $x<0$에서는 부정적분이 없는 것처럼 됩니다. 그런데 $x<0$일 때 $\\{\\ln(-x)\\}\'=\\dfrac{1}{x}$이므로, 두 경우를 함께 $\\ln|x|$로 씁니다. 적분 구간이 양수뿐이면 $\\ln x$로 계산해도 결과는 같습니다.',
      },
      {
        q: '∫sin x dx 는 왜 -cos x 인가요? cos x 가 아니고요?',
        a: '$\\cos x$를 미분하면 $-\\sin x$가 되어 부호가 반대입니다. $-\\cos x$를 미분해야 $\\sin x$가 됩니다. 부호가 헷갈리면 답을 미분해서 피적분함수가 나오는지 확인하십시오.',
      },
      {
        q: '2ˣ를 적분할 때 왜 ln 2 로 나누나요?',
        a: '$(2^x)\'=2^x\\ln 2$로, 미분하면 $\\ln 2$가 곱해집니다. 그래서 미리 $\\ln 2$로 나눈 $\\dfrac{2^x}{\\ln 2}$을 미분해야 $2^x$이 나옵니다. $e^x$은 $\\ln e=1$이어서 나눌 필요가 없습니다.',
      },
      {
        q: '분수 꼴 함수는 분자와 분모를 따로 적분하면 안 되나요?',
        a: '안 됩니다. 몫이나 곱은 따로 적분해서 나누거나 곱할 수 없습니다. $\\dfrac{x^2+1}{x}=x+\\dfrac{1}{x}$처럼 **나눗셈을 먼저 하여 합의 꼴**로 바꾼 뒤 항별로 적분합니다. 나누어지지 않는 꼴은 다음 단원의 치환적분법이나 부분적분법을 씁니다.',
      },
    ],

    mistakes: [
      '$\\int\\sin x\\,dx=\\cos x+C$, $\\int\\csc^{2}x\\,dx=\\cot x+C$처럼 부호를 놓치는 실수 — 각각 $-\\cos x+C$, $-\\cot x+C$입니다. 답을 미분해 확인합니다.',
      '$\\int a^x\\,dx=a^x\\ln a+C$로 곱하거나, $\\dfrac{a^{x+1}}{x+1}+C$로 거듭제곱 공식을 쓰는 실수 — $\\dfrac{a^x}{\\ln a}+C$입니다.',
      '정적분에서 $e^{0}=0$, $\\ln 1=1$로 셈하는 실수 — $e^{0}=1$, $\\ln 1=0$입니다.',
    ],

    gens: [
      {
        id: 'power-real',
        level: 1,
        title: '실수 지수 거듭제곱 꼴의 정적분',
        make: function (R) {
          var t = R.int(0, 3), c = R.int(1, 4), m, a, b, integrand, Ftex, ans, cands, newExp, steps;
          var cs = c === 1 ? '' : String(c);
          if (t === 0) {          // ∫₁ᵐ c/x² dx = c(1 - 1/m)
            m = R.int(2, 6); a = 1; b = m;
            integrand = '\\dfrac{' + c + '}{x^{2}}';
            Ftex = '-\\dfrac{' + c + '}{x}';
            ans = R.F(c).mul(R.F(1).sub(R.F(1, m)));
            newExp = '-1';
            steps = '$\\left[-\\dfrac{' + c + '}{x}\\right]_{1}^{' + m + '}=' + tex(R.F(-c, m)) + '-(' + (-c) + ')=' + tex(ans) + '$';
            cands = [
              [ans.neg(), '부호를 놓쳤습니다. $x^{-2}$의 부정적분은 $\\dfrac{1}{-1}x^{-1}=-\\dfrac{1}{x}$입니다.'],
              [R.F(c, 3).mul(R.F(1).sub(R.F(1, m * m * m))), '지수에서 1을 뺐습니다. 적분은 지수에 1을 더합니다($-2+1=-1$).'],
              [R.F(c).mul(R.F(1, m * m)).sub(c), '피적분함수에 끝 값을 넣어 뺐습니다. 부정적분에 넣어야 합니다.'],
            ];
          } else if (t === 1) {   // ∫₀^{m²} c√x dx = (2c/3) m³
            m = R.int(1, 4); a = 0; b = m * m;
            integrand = cs + '\\sqrt{x}';
            Ftex = tex(R.F(2 * c, 3)) + 'x\\sqrt{x}';
            ans = R.F(2 * c * m * m * m, 3);
            newExp = '\\frac{3}{2}';
            steps = '$\\left[' + Ftex + '\\right]_{0}^{' + b + '}=' + tex(R.F(2 * c, 3)) + '\\times' + (m * m * m) + '-0=' + tex(ans) + '$';
            cands = [
              [R.F(3 * c * m * m * m, 2), '새 지수 $\\dfrac{3}{2}$을 곱했습니다. $\\dfrac{3}{2}$으로 나누어야 하므로 $\\dfrac{2}{3}$를 곱합니다.'],
              [R.F(c * m * m * m), '새 지수로 나누는 것을 빠뜨렸습니다.'],
              [R.F(c, 2 * m), '$\\sqrt{x}$를 미분했습니다. 적분은 지수에 1을 더합니다.'],
            ];
          } else if (t === 2) {   // ∫₁^{m²} c/√x dx = 2c(m-1)
            m = R.int(2, 5); a = 1; b = m * m;
            integrand = '\\dfrac{' + c + '}{\\sqrt{x}}';
            Ftex = (2 * c) + '\\sqrt{x}';
            ans = R.F(2 * c * (m - 1));
            newExp = '\\frac{1}{2}';
            steps = '$\\left[' + Ftex + '\\right]_{1}^{' + b + '}=' + (2 * c * m) + '-' + (2 * c) + '=' + tex(ans) + '$';
            cands = [
              [R.F(c * (m - 1), 2), '새 지수 $\\dfrac{1}{2}$을 곱했습니다. $\\dfrac{1}{2}$로 나누어야 하므로 2를 곱합니다.'],
              [R.F(c * (m - 1)), '새 지수로 나누는 것을 빠뜨렸습니다.'],
              [R.F(2 * c * m), '아래끝 값을 빼지 않았습니다.'],
            ];
          } else {                // ∫₀^{m³} c∛x dx = (3c/4) m⁴
            m = R.int(1, 3); a = 0; b = m * m * m;
            integrand = cs + '\\sqrt[3]{x}';
            Ftex = tex(R.F(3 * c, 4)) + 'x\\sqrt[3]{x}';
            ans = R.F(3 * c * m * m * m * m, 4);
            newExp = '\\frac{4}{3}';
            steps = '$\\left[' + Ftex + '\\right]_{0}^{' + b + '}=' + tex(R.F(3 * c, 4)) + '\\times' + (m * m * m * m) + '-0=' + tex(ans) + '$';
            cands = [
              [R.F(4 * c * m * m * m * m, 3), '새 지수 $\\dfrac{4}{3}$를 곱했습니다. $\\dfrac{4}{3}$로 나누어야 하므로 $\\dfrac{3}{4}$을 곱합니다.'],
              [R.F(c * m * m * m * m), '새 지수로 나누는 것을 빠뜨렸습니다.'],
            ];
          }
          return {
            type: 'short', check: 'number', concept: 0,
            q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{' + a + '}^{' + b + '}' + integrand + '\\,dx$',
            answer: ans.toString(),
            hint: '거듭제곱 꼴로 바꾸면 새 지수는 $' + newExp + '$입니다.',
            wrong: dedupWrong(ans, cands),
            explain: '피적분함수를 거듭제곱 꼴로 바꾸어 지수에 1을 더하고 새 지수로 나누면 한 부정적분은 $' + Ftex + '$입니다.\n\n' + steps,
          };
        },
      },
      {
        id: 'antideriv-basic',
        level: 1,
        title: '지수함수·삼각함수·1/x 의 부정적분',
        make: function (R) {
          var items = [
            { c: 3, f: '\\sin x', F: [-1, '\\cos x'], W: [
              [1, '\\cos x', '$\\cos x$를 미분하면 $-\\sin x$입니다. 부호를 놓쳤습니다.'],
              [1, '\\sin x', '피적분함수를 그대로 썼습니다. 미분해서 $\\sin x$가 되는 함수를 찾습니다.'],
              [-1, '\\sin x', '$-\\sin x$를 미분하면 $-\\cos x$입니다. 미분해서 $\\sin x$가 되는 함수를 찾습니다.'],
              [[1, 2], '\\sin^{2}x', '거듭제곱 공식을 $\\sin x$에 썼습니다. 거듭제곱 공식은 $x^n$ 꼴에만 씁니다.'],
            ] },
            { c: 3, f: '\\cos x', F: [1, '\\sin x'], W: [
              [-1, '\\sin x', '$-\\sin x$를 미분하면 $-\\cos x$입니다. 부호가 반대입니다.'],
              [-1, '\\cos x', '$\\cos x$를 미분한 것과 헷갈렸습니다. 적분은 미분해서 $\\cos x$가 되는 함수를 찾는 것입니다.'],
              [1, '\\cos x', '피적분함수를 그대로 썼습니다. 미분해서 $\\cos x$가 되는 함수를 찾습니다.'],
              [[1, 2], '\\cos^{2}x', '거듭제곱 공식을 $\\cos x$에 썼습니다. 거듭제곱 공식은 $x^n$ 꼴에만 씁니다.'],
            ] },
            { c: 3, f: '\\sec^{2}x', F: [1, '\\tan x'], W: [
              [-1, '\\cot x', '$\\csc^{2}x$의 부정적분과 헷갈렸습니다. $(\\tan x)\'=\\sec^{2}x$입니다.'],
              [-1, '\\tan x', '부호가 틀렸습니다. $(\\tan x)\'=\\sec^{2}x$이므로 $-$를 붙이지 않습니다.'],
              [[1, 3], '\\sec^{3}x', '거듭제곱 공식을 $\\sec x$에 썼습니다. 미분해 보면 $\\sec^{2}x$가 나오지 않습니다.'],
              [2, '\\sec^{2}x\\tan x', '$\\sec^{2}x$를 미분했습니다. 적분은 미분해서 $\\sec^{2}x$가 되는 함수를 찾는 것입니다.'],
            ] },
            { c: 3, f: '\\csc^{2}x', F: [-1, '\\cot x'], W: [
              [1, '\\cot x', '$(\\cot x)\'=-\\csc^{2}x$이므로 부호가 반대입니다.'],
              [1, '\\tan x', '$\\sec^{2}x$의 부정적분과 헷갈렸습니다.'],
              [[1, 3], '\\csc^{3}x', '거듭제곱 공식을 $\\csc x$에 썼습니다. 미분해 보면 $\\csc^{2}x$가 나오지 않습니다.'],
              [-2, '\\csc^{2}x\\cot x', '$\\csc^{2}x$를 미분했습니다. 적분은 미분해서 $\\csc^{2}x$가 되는 함수를 찾는 것입니다.'],
            ] },
            { c: 2, f: 'e^{x}', F: [1, 'e^{x}'], W: [
              [1, 'e^{x+1}', '지수에 1을 더했습니다. $e^x$은 미분해도 적분해도 $e^x$입니다.'],
              [1, 'xe^{x-1}', '$x^n$의 미분 공식을 지수함수에 썼습니다.'],
              [-1, 'e^{x}', '부호를 바꾸었습니다. $(e^x)\'=e^x$이므로 그대로입니다.'],
              [1, '\\dfrac{e^{x+1}}{x+1}', '거듭제곱 공식을 지수함수에 썼습니다. 거듭제곱 공식은 밑이 $x$일 때만 씁니다.'],
            ] },
            { c: 1, f: '\\dfrac{1}{x}', F: [1, '\\ln|x|'], W: [
              [-1, '\\dfrac{1}{x^{2}}', '$\\dfrac{1}{x}$을 미분했습니다. 적분하면 $\\ln|x|$입니다.'],
              [1, '\\ln x', '$x<0$에서도 쓸 수 있도록 절댓값 기호를 붙여야 합니다.'],
              [1, 'e^{x}', '$\\ln x$와 $e^x$을 헷갈렸습니다. $(\\ln|x|)\'=\\dfrac{1}{x}$입니다.'],
              [-1, '\\ln|x|', '부호가 틀렸습니다. $(\\ln|x|)\'=\\dfrac{1}{x}$입니다.'],
            ] },
          ];
          var bases = [2, 3, 5, 10];
          var useExp = R.bool(0.25);
          var k = R.pick([1, -1, 2, -2, 3, -3, 4]);
          var it, fTex;
          if (useExp) {
            var b = R.pick(bases);
            var bx = b + '^{x}';
            it = { c: 2, f: bx, F: [1, '\\dfrac{' + bx + '}{\\ln ' + b + '}'], W: [
              [1, bx + '\\ln ' + b, '$' + bx + '$을 미분했습니다. 미분하면 $\\ln ' + b + '$' + R.josa(b, '이/가') + ' 곱해지므로 적분할 때는 $\\ln ' + b + '$' + R.josa(b, '으로/로') + ' 나눕니다.'],
              [1, '\\dfrac{' + b + '^{x+1}}{x+1}', '거듭제곱 공식을 지수함수에 썼습니다. 거듭제곱 공식은 밑이 $x$일 때만 씁니다.'],
              [1, bx, '$e^x$처럼 그대로라고 생각했습니다. $\\ln ' + b + '$' + R.josa(b, '으로/로') + ' 나누어야 합니다.'],
              [1, 'x\\cdot' + b + '^{x-1}', '$x^n$의 미분 공식을 지수함수에 썼습니다.'],
            ] };
            k = R.pick([1, 2, 3]);
          } else {
            it = R.pick(items);
          }
          // 계수 × 본체. 본체가 분수(\dfrac{분자}{분모})이고 계수가 정수면 계수를 분자에 넣는다
          function mul(c, body) {
            var m = /^\\dfrac\{(.*)\}\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}$/.exec(body);
            if (m && c.isInt() && !c.eq(1) && !c.eq(-1)) {
              var ab = Math.abs(c.num), sg = c.num < 0 ? '-' : '';
              var top = m[1] === '1' ? String(ab) : ab + (/^\d/.test(m[1]) ? '\\cdot ' : '') + m[1];
              return sg + '\\dfrac{' + top + '}{' + m[2] + '}';
            }
            return cterm(c, body);
          }
          fTex = mul(R.F(k), it.f);
          function show(sc, body) {
            var c = Array.isArray(sc) ? R.F(k * sc[0], sc[1]) : R.F(k * sc);
            return '$' + mul(c, body) + '+C$';
          }
          var correct = show(it.F[0], it.F[1]);
          var reason = {};
          var wrongs = it.W.map(function (w) {
            var s = show(w[0], w[1]);
            if (!(s in reason)) reason[s] = w[2];
            return s;
          });
          var pick = R.choices(correct, wrongs);
          return {
            type: 'choice', concept: it.c,
            q: '다음 부정적분을 구한 것으로 옳은 것을 고르십시오.\n\n$\\int ' + fTex + '\\,dx$',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || '답을 미분해 보면 피적분함수가 나오지 않습니다.'; }),
            explain: '답을 미분하면 피적분함수가 되는지 확인합니다. $\\int ' + fTex + '\\,dx=' + correct.slice(1, -1) + '$입니다.',
          };
        },
      },
      {
        id: 'trans-definite',
        level: 2,
        title: '지수·로그·삼각함수의 정적분',
        make: function (R) {
          var t = R.int(0, 5), q, ans, Ftex, lo, hi, vHi, vLo, cands, concept, hint;
          var a = R.pick([1, 2, 3, 4, -1, -2, -3]);
          var as = a === 1 ? '' : a === -1 ? '-' : String(a);
          if (t === 0) {          // ∫₀^{π/2} (a sin x + b cos x) dx = a + b
            var b = R.pick([1, 2, 3, -1, -2, 5]);
            var bs = (b > 0 ? '+' : '-') + (Math.abs(b) === 1 ? '' : Math.abs(b));
            lo = '0'; hi = '\\frac{\\pi}{2}';
            q = '\\int_{0}^{\\frac{\\pi}{2}}(' + as + '\\sin x' + bs + '\\cos x)\\,dx';
            Ftex = cterm(R.F(-a), '\\cos x') + bs + '\\sin x';
            vHi = R.F(b); vLo = R.F(-a);
            cands = [
              [R.F(b - a), '$\\int\\sin x\\,dx$를 $\\cos x$로 했습니다. $-\\cos x$입니다.'],
              [R.F(-a - b), '아래끝 값에서 위끝 값을 뺐습니다.'],
              [R.F(b), '$\\cos 0=1$을 0으로 셈했습니다.'],
            ];
            concept = 3;
            hint = '$\\int\\sin x\\,dx=-\\cos x$, $\\int\\cos x\\,dx=\\sin x$입니다.';
          } else if (t === 1) {   // ∫₀^π a sin x dx = 2a
            lo = '0'; hi = '\\pi';
            q = '\\int_{0}^{\\pi}' + as + '\\sin x\\,dx';
            Ftex = cterm(R.F(-a), '\\cos x');
            vHi = R.F(a); vLo = R.F(-a);
            cands = [
              [R.F(-2 * a), '$\\int\\sin x\\,dx$를 $\\cos x$로 했습니다. $-\\cos x$입니다.'],
              [R.F(0), '$\\cos\\pi$를 1로 셈했습니다. $\\cos\\pi=-1$입니다.'],
              [R.F(a), '아래끝 값을 빼지 않았습니다.'],
            ];
            concept = 3;
            hint = '$\\cos\\pi=-1$, $\\cos 0=1$입니다.';
          } else if (t === 2) {
            if (R.bool()) {       // ∫_{-π/4}^{π/4} a sec²x dx = 2a
              lo = '-\\frac{\\pi}{4}'; hi = '\\frac{\\pi}{4}';
              q = '\\int_{-\\frac{\\pi}{4}}^{\\frac{\\pi}{4}}' + as + '\\sec^{2}x\\,dx';
              Ftex = cterm(R.F(a), '\\tan x');
              vHi = R.F(a); vLo = R.F(-a);
              cands = [
                [R.F(0), '$\\tan\\left(-\\dfrac{\\pi}{4}\\right)$를 1로 셈했습니다. $-1$입니다.'],
                [R.F(a), '아래끝 값을 빼지 않았습니다.'],
                [R.F(-2 * a), '부호가 틀렸습니다. $\\int\\sec^{2}x\\,dx=\\tan x$입니다.'],
              ];
              hint = '$\\int\\sec^{2}x\\,dx=\\tan x+C$입니다.';
            } else {              // ∫_{π/4}^{π/2} a csc²x dx = a
              lo = '\\frac{\\pi}{4}'; hi = '\\frac{\\pi}{2}';
              q = '\\int_{\\frac{\\pi}{4}}^{\\frac{\\pi}{2}}' + as + '\\csc^{2}x\\,dx';
              Ftex = cterm(R.F(-a), '\\cot x');
              vHi = R.F(0); vLo = R.F(-a);
              cands = [
                [R.F(-a), '부호가 틀렸습니다. $\\int\\csc^{2}x\\,dx=-\\cot x$입니다.'],
                [R.F(0), '$\\cot\\dfrac{\\pi}{4}$를 0으로 셈했습니다. $\\cot\\dfrac{\\pi}{4}=1$, $\\cot\\dfrac{\\pi}{2}=0$입니다.'],
              ];
              hint = '$\\int\\csc^{2}x\\,dx=-\\cot x+C$, $\\cot\\dfrac{\\pi}{2}=0$입니다.';
            }
            concept = 3;
          } else if (t === 3) {   // ∫₀^{ln m} a eˣ dx = a(m-1)
            var m = R.int(2, 7);
            lo = '0'; hi = '\\ln ' + m;
            q = '\\int_{0}^{\\ln ' + m + '}' + as + 'e^{x}\\,dx';
            Ftex = cterm(R.F(a), 'e^{x}');
            vHi = R.F(a * m); vLo = R.F(a);
            cands = [
              [R.F(a * m), '$e^{0}$을 0으로 셈했습니다. $e^{0}=1$입니다.'],
              [R.F(-a * (m - 1)), '아래끝 값에서 위끝 값을 뺐습니다.'],
            ];
            concept = 4;
            hint = '$e^{\\ln a}=a$, $e^{0}=1$입니다.';
          } else if (t === 4) {   // ∫₁^{e^m} a/x dx = am
            var m2 = R.int(1, 4);
            lo = '1'; hi = m2 === 1 ? 'e' : 'e^{' + m2 + '}';
            q = '\\int_{1}^{' + hi + '}\\dfrac{' + a + '}{x}\\,dx';
            Ftex = cterm(R.F(a), '\\ln|x|');
            vHi = R.F(a * m2); vLo = R.F(0);
            cands = [
              [R.F(a * (m2 - 1)), '$\\ln 1$을 1로 셈했습니다. $\\ln 1=0$입니다.'],
              [R.F(-a * m2), '아래끝 값에서 위끝 값을 뺐습니다.'],
            ];
            concept = 4;
            hint = '$\\ln e^{k}=k$, $\\ln 1=0$입니다.';
          } else {                // ∫_{-e^m}^{-1} a/x dx = -am
            var m3 = R.int(1, 3);
            lo = m3 === 1 ? '-e' : '-e^{' + m3 + '}'; hi = '-1';
            q = '\\int_{' + lo + '}^{-1}\\dfrac{' + a + '}{x}\\,dx';
            Ftex = cterm(R.F(a), '\\ln|x|');
            vHi = R.F(0); vLo = R.F(a * m3);
            cands = [
              [R.F(a * m3), '아래끝 값에서 위끝 값을 뺐습니다. $\\ln|-1|=0$에서 $\\ln|' + lo + '|=' + m3 + '$의 ' + Math.abs(a) + '배를 빼야 합니다.'],
              [R.F(0), '$\\ln|' + lo + '|$를 0으로 셈했습니다. $\\ln e^{k}=k$입니다.'],
            ];
            concept = 1;
            hint = '$x<0$에서도 $\\int\\dfrac{1}{x}\\,dx=\\ln|x|+C$입니다.';
          }
          ans = vHi.sub(vLo);
          return {
            type: 'short', check: 'number', concept: concept,
            q: '다음 정적분의 값을 구하십시오.\n\n$' + q + '$',
            answer: ans.toString(),
            hint: hint,
            wrong: dedupWrong(ans, cands),
            explain: '한 부정적분은 $' + Ftex + '$입니다. 위끝을 넣은 값은 $' + tex(vHi) + '$, 아래끝을 넣은 값은 $' + tex(vLo) + '$이므로\n\n' +
              '$\\left[' + Ftex + '\\right]_{' + lo + '}^{' + hi + '}=' + tex(vHi) + '-' + ptex(vLo) + '=' + tex(ans) + '$입니다.',
          };
        },
      },
      {
        id: 'log-two-constants',
        level: 3,
        title: '1/x 의 부정적분과 두 범위의 적분상수',
        make: function (R) {
          var a = R.pick([1, 2, 3, -1, -2]);
          var p = R.int(-3, 4), q = R.int(-3, 4);
          if (q === p) q = p + 2;
          var m = R.int(1, 3), n = R.int(1, 3);
          var ans = a * (m + n) + p + q;
          var up = m === 1 ? 'e' : 'e^{' + m + '}';
          var dn = n === 1 ? '-e' : '-e^{' + n + '}';
          var as = a === 1 ? '' : a === -1 ? '-' : String(a);
          var cands = [
            [a * (m + n) + 2 * p, '두 범위의 적분상수를 같게 두었습니다. $x<0$에서는 $f(-1)$로 상수를 따로 정합니다.'],
            [a * (m + n), '적분상수를 빠뜨렸습니다. $f(1)$, $f(-1)$로 각 범위의 상수를 정합니다.'],
            [a * (m - n) + p + q, '$\\ln|' + dn + '|$를 음수로 셈했습니다. 절댓값 안이므로 $' + n + '$입니다.'],
          ];
          var wrong = [], seen = {};
          seen[ans] = true;
          cands.forEach(function (w) { if (!seen[w[0]]) { seen[w[0]] = true; wrong.push({ a: String(w[0]), why: w[1] }); } });
          return {
            type: 'short', check: 'number', concept: 1,
            q: '$x\\ne0$인 모든 실수 $x$에서 미분가능한 함수 $f(x)$가\n\n$f\'(x)=\\dfrac{' + a + '}{x}$, $f(1)=' + p + '$, $f(-1)=' + q + '$\n\n를 만족시킬 때, $f(' + up + ')+f(' + dn + ')$의 값을 구하십시오.',
            answer: String(ans),
            hint: '$x>0$과 $x<0$에서 적분상수를 따로 둡니다.',
            wrong: wrong,
            explain: '$x>0$에서 $f(x)=' + as + '\\ln|x|+C_1$, $x<0$에서 $f(x)=' + as + '\\ln|x|+C_2$입니다. $f(1)=C_1=' + p + '$, $f(-1)=C_2=' + q + '$입니다.\n\n' +
              '$f(' + up + ')=' + (a * m) + R.fmt.signed(p) + '=' + (a * m + p) + '$, $f(' + dn + ')=' + (a * n) + R.fmt.signed(q) + '=' + (a * n + q) + '$이므로 합은 $' + ans + '$입니다.',
          };
        },
      },
    ],
  });
})();
