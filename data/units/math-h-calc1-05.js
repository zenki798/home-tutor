/* 미적분Ⅰ · 도함수와 미분법
 * 도함수의 정의와 정의로 미분하기, y=xⁿ(n은 양의 정수)·상수함수의 도함수, 실수배·합·차의 미분법,
 * 곱의 미분법({f(x)}ⁿ 포함), 미분계수의 정의를 이용한 극한값을 다룬다. (접선·증감은 다음 단원부터) */
(function () {
  // 정수 계수(내림차순) → 답 칸용 평문: [6,-10,4] → '6x^2-10x+4'
  function plain(c) {
    var deg = c.length - 1, s = '';
    for (var i = 0; i < c.length; i++) {
      var a = c[i], e = deg - i;
      if (a === 0) continue;
      var sign = a < 0 ? '-' : (s ? '+' : '');
      var m = Math.abs(a);
      var body = e === 0 ? String(m) : (m === 1 ? '' : String(m)) + 'x' + (e > 1 ? '^' + e : '');
      s += sign + body;
    }
    return s || '0';
  }
  // 계수 → 도함수의 계수
  function deriv(c) {
    var deg = c.length - 1, out = [];
    for (var i = 0; i < deg; i++) out.push(c[i] * (deg - i));
    return out.length ? out : [0];
  }
  // 값 (호너)
  function val(c, x) {
    var v = 0;
    for (var i = 0; i < c.length; i++) v = v * x + c[i];
    return v;
  }
  function par(R, n) { return R.fmt.paren(n); }

  Tutor.registerUnit({
    id: 'math-h-calc1-05',
    course: 'math-h-calc1',
    title: '도함수와 미분법',
    summary: '도함수의 뜻을 알고, 거듭제곱 함수와 상수함수의 도함수, 실수배·합·차·곱의 미분법으로 다항함수를 미분합니다.',
    goals: [
      '도함수의 뜻을 알고, 정의를 이용하여 간단한 함수의 도함수를 구할 수 있다.',
      '함수 y=xⁿ(n은 양의 정수)과 상수함수의 도함수를 구할 수 있다.',
      '실수배·합·차·곱의 미분법을 이용하여 다항함수를 미분할 수 있다.',
      '미분계수의 정의를 이용하여 여러 가지 극한값을 구할 수 있다.',
    ],
    standards: ['[12미적Ⅰ-02-03]', '[12미적Ⅰ-02-04]'],

    concepts: [
      {
        title: '도함수의 뜻',
        body: '함수 $f(x)$가 어떤 구간의 모든 $x$에서 미분가능하면, 그 구간의 각 $x$에 미분계수 $f\'(x)$를 하나씩 대응시킬 수 있습니다. 이렇게 얻은 새로운 함수\n\n$f\'(x)=\\lim_{h \\to 0}\\dfrac{f(x+h)-f(x)}{h}$\n\n를 $f(x)$의 **도함수**라고 합니다. 기호로는 $f\'(x)$, $y\'$, $\\dfrac{dy}{dx}$, $\\dfrac{d}{dx}f(x)$로 나타냅니다.\n\n$f(x)$에서 도함수 $f\'(x)$를 구하는 것을 $f(x)$를 $x$에 대하여 **미분한다**고 하고, 그 계산 방법을 **미분법**이라고 합니다.\n\n- 미분계수 $f\'(a)$: $x=a$ 한 점에서의 순간변화율 (하나의 수)\n- 도함수 $f\'(x)$: 모든 점의 미분계수를 모아 놓은 함수\n\n곧 도함수에 $x=a$를 대입한 값이 미분계수 $f\'(a)$입니다.\n\n> 💡 도함수를 한 번 구해 두면, 점마다 극한을 다시 계산하지 않고 대입만으로 미분계수를 얻을 수 있습니다.',
        easy: '자동차의 속도계를 떠올려 보십시오. 어느 한 순간의 속도(미분계수)는 하나의 수이지만, 속도계는 매 순간의 속도를 계속 보여 줍니다. 시각마다 그때의 속도를 알려 주는 "속도계"가 바로 도함수입니다.\n\n$f(x)=x^2$이면 $f\'(x)=2x$입니다. $x=1$에서 접선의 기울기는 2, $x=3$에서는 6처럼, 도함수에 $x$의 값만 넣으면 그 점의 접선의 기울기가 바로 나옵니다.',
        fig: {
          type: 'coord', xmin: -3, xmax: 3, ymin: -6, ymax: 9,
          fns: [{ expr: 'x^2', label: 'y=x²' }, { expr: '2x', label: "y=f'(x)=2x" }],
          alt: '곡선 y=x²과 그 도함수의 그래프인 직선 y=2x. x가 음수인 곳에서는 도함수의 값이 음수, 양수인 곳에서는 양수이다',
        },
        check: {
          type: 'choice',
          q: '$f(x)=x^2$의 도함수가 $f\'(x)=2x$일 때, $x=5$에서의 미분계수 $f\'(5)$의 값은 무엇입니까?',
          choices: ['$10$', '$25$', '$2$'],
          answer: 0,
          why: ['', '함숫값 $f(5)=25$를 구했습니다. 미분계수는 도함수 $f\'(x)$에 대입합니다.', '도함수의 계수만 보았습니다. $f\'(5)=2\\times5$입니다.'],
          explain: '도함수에 $x=5$를 대입하면 $f\'(5)=2\\times 5=10$입니다.',
        },
      },
      {
        title: '정의를 이용하여 미분하기',
        body: '도함수의 정의를 그대로 써서 미분해 봅시다.\n\n**예 1** $f(x)=x^2+3x$\n\n$f(x+h)-f(x)=(x+h)^2+3(x+h)-(x^2+3x)=2xh+h^2+3h$\n\n$f\'(x)=\\lim_{h \\to 0}\\dfrac{2xh+h^2+3h}{h}=\\lim_{h \\to 0}(2x+h+3)=2x+3$\n\n**예 2** $f(x)=x^3$\n\n$(x+h)^3-x^3=3x^2h+3xh^2+h^3$이므로\n\n$f\'(x)=\\lim_{h \\to 0}(3x^2+3xh+h^2)=3x^2$\n\n순서는 늘 같습니다.\n\n1. $f(x+h)-f(x)$를 전개하여 정리합니다.\n2. $h$로 나누어 약분합니다(분모의 $h$를 없앱니다).\n3. $h \\to 0$일 때의 극한값을 구합니다.\n\n> ⚠️ 약분하기 전에 $h=0$을 대입하면 $\\dfrac{0}{0}$ 꼴이 되어 값을 정할 수 없습니다. 반드시 약분을 먼저 합니다.',
        easy: '정의로 미분하는 것은 "아주 조금 움직였을 때 얼마나 변하는가"를 직접 재 보는 일입니다.\n\n$x$에서 $h$만큼 옮겼을 때 함숫값의 변화량을 $h$로 나누면 평균변화율이 되고, $h$를 0에 한없이 가깝게 하면 그 점의 순간변화율이 됩니다. 계산 끝에 $h$가 곱해진 항들은 모두 0이 되어 사라지고, $h$가 없는 항만 도함수로 남습니다.',
        check: {
          type: 'choice',
          q: '도함수의 정의를 이용하여 함수 $f(x)=x^2-x$의 도함수를 구한 결과는 무엇입니까?',
          choices: ['$2x-1$', '$2x$', '$2x+h-1$'],
          answer: 0,
          why: ['', '$-x$ 부분의 변화량 $-h$를 빠뜨렸습니다. $f(x+h)-f(x)=2xh+h^2-h$입니다.', '마지막에 $h \\to 0$의 극한을 취하지 않았습니다. $h$가 남은 항은 0이 됩니다.'],
          explain: '$f(x+h)-f(x)=(x+h)^2-(x+h)-(x^2-x)=2xh+h^2-h$이므로 $h$로 나누면 $2x+h-1$이고, $h \\to 0$일 때 $2x-1$입니다.',
        },
      },
      {
        title: '$y=x^n$과 상수함수의 도함수',
        body: '$n$이 양의 정수일 때\n\n$(x^n)\'=nx^{n-1}$\n\n곧 **지수를 앞으로 내려 곱하고, 지수는 1 줄입니다.** 예: $(x^5)\'=5x^4$, $(x^2)\'=2x$, $(x)\'=1$\n\n**상수함수** $f(x)=c$ ($c$는 상수)의 도함수는 $f\'(x)=0$입니다. $f(x+h)-f(x)=c-c=0$이기 때문입니다. 그래프가 수평인 직선이니 어디서나 기울기가 0입니다.\n\n**왜 $nx^{n-1}$일까?** $(x+h)^n$은 $(x+h)$를 $n$번 곱한 것입니다. 전개할 때 $n$개의 괄호 가운데 **한 괄호에서만** $h$를 고르고 나머지 괄호에서 모두 $x$를 고르는 방법이 $n$가지이므로, $h$에 대한 일차항은 $nx^{n-1}h$입니다. 나머지 항에는 모두 $h^2$ 이상이 곱해져 있습니다. 따라서\n\n$\\dfrac{(x+h)^n-x^n}{h}=nx^{n-1}+(h\\text{가 곱해진 항들})$\n\n이고, $h \\to 0$이면 $nx^{n-1}$만 남습니다.\n\n> ⚠️ $(x^5)\'=5x^5$처럼 지수를 줄이지 않거나, $x^4$처럼 지수를 내려 곱하는 것을 빠뜨리지 않도록 주의합니다.',
        easy: '규칙을 짧게 외우면 "**내리고, 하나 빼기**"입니다.\n\n$x^3$ → 지수 3을 앞으로 내리고, 지수에서 1을 빼면 $3x^2$\n\n$x^7$ → $7x^6$\n\n상수는 변하지 않는 값이므로 변화율이 0입니다. 늘 같은 높이로 이어지는 평평한 길의 기울기가 0인 것과 같습니다.',
        check: {
          type: 'short', check: 'expr',
          q: '$f(x)=x^6$일 때 $f\'(x)$를 구하십시오.',
          answer: '6x^5',
          wrong: [
            { a: '6x^6', why: '지수를 1 줄이지 않았습니다. $(x^n)\'=nx^{n-1}$이므로 지수는 5가 됩니다.' },
            { a: 'x^5', why: '지수 6을 앞으로 내려 곱하는 것을 빠뜨렸습니다.' },
          ],
          explain: '$(x^n)\'=nx^{n-1}$에서 $n=6$이므로 $f\'(x)=6x^5$입니다.',
        },
      },
      {
        title: '실수배·합·차의 미분법',
        body: '두 함수 $f(x)$, $g(x)$가 미분가능할 때 다음이 성립합니다. ($c$는 실수)\n\n| 이름 | 공식 |\n|---|---|\n| 실수배 | $\\{cf(x)\\}\'=cf\'(x)$ |\n| 합 | $\\{f(x)+g(x)\\}\'=f\'(x)+g\'(x)$ |\n| 차 | $\\{f(x)-g(x)\\}\'=f\'(x)-g\'(x)$ |\n\n이 공식들은 극한의 성질에서 바로 나옵니다. 예를 들어 합은\n\n$\\dfrac{\\{f(x+h)+g(x+h)\\}-\\{f(x)+g(x)\\}}{h}=\\dfrac{f(x+h)-f(x)}{h}+\\dfrac{g(x+h)-g(x)}{h}$\n\n에서 $h \\to 0$으로 보내면 됩니다.\n\n그래서 **다항함수는 항마다 따로 미분하여 더합니다.**\n\n$f(x)=2x^3-5x^2+4x-7$이면\n\n$f\'(x)=2\\cdot3x^2-5\\cdot2x+4-0=6x^2-10x+4$\n\n> 💡 상수항은 미분하면 0이 되어 사라집니다. 일차항 $4x$는 계수 4만 남습니다.',
        easy: '여러 항으로 된 다항식은 "항마다 따로 미분해서 그대로 이어 붙인다"고 생각하면 됩니다.\n\n$3x^4$은 $x^4$을 미분한 $4x^3$에 3을 곱해 $12x^3$이 됩니다. 앞의 계수는 그대로 따라다니기만 합니다.\n\n$x^2+5x+1$ → $2x+5+0=2x+5$',
        check: {
          type: 'ox',
          q: '$f(x)=4x^3+2x-9$이면 $f\'(x)=12x^2+2$입니다.',
          answer: true,
          explain: '항마다 미분하면 $4\\cdot3x^2+2-0=12x^2+2$입니다. 상수항 $-9$는 미분하면 0입니다.',
        },
      },
      {
        title: '곱의 미분법',
        body: '두 함수 $f(x)$, $g(x)$가 미분가능할 때\n\n$\\{f(x)g(x)\\}\'=f\'(x)g(x)+f(x)g\'(x)$\n\n**까닭**: $f(x)g(x+h)$를 빼고 더하면\n\n$f(x+h)g(x+h)-f(x)g(x)=\\{f(x+h)-f(x)\\}g(x+h)+f(x)\\{g(x+h)-g(x)\\}$\n\n양변을 $h$로 나누고 $h \\to 0$으로 보냅니다. 미분가능한 함수는 연속이므로 $g(x+h)$는 $g(x)$에 가까워지고, 위 공식을 얻습니다.\n\n예: $\\{(x^2+1)(3x-2)\\}\'=2x(3x-2)+(x^2+1)\\cdot3=9x^2-4x+3$\n\n세 함수의 곱도 같은 방법으로\n\n$\\{f(x)g(x)k(x)\\}\'=f\'(x)g(x)k(x)+f(x)g\'(x)k(x)+f(x)g(x)k\'(x)$\n\n이고, 이를 되풀이하면 $n$이 양의 정수일 때\n\n$[\\{f(x)\\}^n]\'=n\\{f(x)\\}^{n-1}f\'(x)$\n\n입니다. 예: $\\{(2x+1)^3\\}\'=3(2x+1)^2\\cdot2=6(2x+1)^2$\n\n> ⚠️ 곱의 도함수는 도함수끼리의 곱 $f\'(x)g\'(x)$가 **아닙니다.** $x^2\\cdot x^3=x^5$의 도함수는 $5x^4$인데, $2x\\cdot3x^2=6x^3$이 되어 맞지 않습니다.',
        easy: '직사각형의 넓이로 생각해 봅시다. 가로가 $f$, 세로가 $g$일 때 넓이는 $fg$입니다. 가로가 조금($\\Delta f$) 늘고 세로도 조금($\\Delta g$) 늘면, 넓이는 오른쪽 띠 $\\Delta f\\cdot g$와 위쪽 띠 $f\\cdot\\Delta g$만큼 늘어납니다. 모서리의 아주 작은 조각 $\\Delta f\\cdot\\Delta g$는 너무 작아서 무시할 수 있습니다.\n\n그래서 곱의 변화는 "앞을 미분하고 뒤는 그대로 + 앞은 그대로 두고 뒤를 미분"입니다.',
        fig: {
          type: 'svg',
          svg: '<svg viewBox="0 0 240 170" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="40" width="150" height="100" fill="none" stroke="currentColor" stroke-width="2"/><rect x="170" y="40" width="40" height="100" fill="var(--fig-1)" fill-opacity="0.35" stroke="currentColor"/><rect x="20" y="10" width="150" height="30" fill="var(--fig-2)" fill-opacity="0.35" stroke="currentColor"/><rect x="170" y="10" width="40" height="30" fill="var(--fig-3)" fill-opacity="0.35" stroke="currentColor"/><text x="95" y="95" font-size="16" text-anchor="middle" fill="currentColor">f·g</text><text x="190" y="95" font-size="12" text-anchor="middle" fill="currentColor">Δf·g</text><text x="95" y="30" font-size="12" text-anchor="middle" fill="currentColor">f·Δg</text><text x="95" y="160" font-size="13" text-anchor="middle" fill="currentColor">가로 f</text><text x="10" y="95" font-size="13" text-anchor="middle" fill="currentColor" transform="rotate(-90 10 95)">세로 g</text></svg>',
          alt: '가로 f, 세로 g인 직사각형. 가로가 Δf, 세로가 Δg만큼 늘어나면 오른쪽 띠 Δf·g와 위쪽 띠 f·Δg, 모서리의 작은 조각 Δf·Δg만큼 넓이가 늘어난다',
        },
        check: {
          type: 'choice',
          q: '$y=x^2(x+3)$의 도함수는 무엇입니까?',
          choices: ['$3x^2+6x$', '$2x$', '$2x^2+6x$'],
          answer: 0,
          why: ['', '두 인수의 도함수 $2x$와 1을 곱했습니다. 곱의 미분법은 $f\'g+fg\'$입니다.', '앞의 $x^2$만 미분했습니다. 뒤의 $x+3$을 미분한 항 $x^2\\cdot1$도 더합니다.'],
          explain: '$2x(x+3)+x^2\\cdot1=3x^2+6x$입니다. 전개한 $x^3+3x^2$을 미분해도 같습니다.',
        },
      },
      {
        title: '미분계수의 정의를 이용한 극한값',
        body: '미분계수의 정의\n\n$f\'(a)=\\lim_{h \\to 0}\\dfrac{f(a+h)-f(a)}{h}=\\lim_{x \\to a}\\dfrac{f(x)-f(a)}{x-a}$\n\n를 거꾸로 쓰면, 복잡해 보이는 극한값을 도함수로 쉽게 구할 수 있습니다. 핵심은 **분모를 분자의 $x$의 증가량과 같게 맞추는 것**입니다.\n\n| 극한 | 값 |\n|---|---|\n| $\\lim_{h \\to 0}\\dfrac{f(a+2h)-f(a)}{h}$ | $2f\'(a)$ |\n| $\\lim_{h \\to 0}\\dfrac{f(a+h)-f(a-h)}{h}$ | $2f\'(a)$ |\n| $\\lim_{x \\to a}\\dfrac{f(x)-f(a)}{x^2-a^2}$ | $\\dfrac{f\'(a)}{2a}$ ($a \\ne 0$) |\n\n예: $\\lim_{h \\to 0}\\dfrac{f(a+2h)-f(a)}{h}=\\lim_{h \\to 0}\\dfrac{f(a+2h)-f(a)}{2h}\\times2=2f\'(a)$\n\n두 번째 줄은 $f(a)$를 빼고 더해 두 극한으로 나눕니다: $\\dfrac{f(a+h)-f(a)}{h}+\\dfrac{f(a-h)-f(a)}{-h}$\n\n**다항식의 극한에도** 씁니다. $f(x)=x^{10}$이면 $\\lim_{x \\to 1}\\dfrac{x^{10}-1}{x-1}=f\'(1)=10$입니다.\n\n> 💡 다항함수 $f(x)$에 대하여 $\\lim_{x \\to a}\\dfrac{f(x)-b}{x-a}=k$이면, 분모가 0으로 가므로 분자도 0으로 가야 합니다. 곧 $f(a)=b$이고 $f\'(a)=k$입니다.',
        easy: '미분계수는 "함숫값의 변화량 나누기 $x$의 변화량"의 극한입니다. 위아래의 변화량이 같은 크기여야 그대로 $f\'(a)$가 됩니다.\n\n$\\dfrac{f(a+2h)-f(a)}{h}$에서 위는 $x$가 $2h$만큼 변했는데 아래는 $h$뿐입니다. 아래를 $2h$로 맞추려면 2로 나누고 2를 곱하면 되므로, 답은 $f\'(a)$의 2배입니다.',
        check: {
          type: 'short', check: 'number',
          q: '$f(x)=x^2+x$일 때, $\\lim_{h \\to 0}\\dfrac{f(1+3h)-f(1)}{h}$의 값을 구하십시오.',
          answer: '9',
          wrong: [{ a: '3', why: '$f\'(1)$만 구했습니다. 분모를 $3h$로 맞추면 극한값은 $3f\'(1)$입니다.' }],
          explain: '$\\dfrac{f(1+3h)-f(1)}{h}=\\dfrac{f(1+3h)-f(1)}{3h}\\times3$이므로 극한값은 $3f\'(1)$입니다. $f\'(x)=2x+1$에서 $f\'(1)=3$이므로 답은 9입니다.',
        },
      },
    ],

    examples: [
      {
        q: '$f(x)=(2x+1)(x^2-3)$일 때, $f\'(1)$의 값을 구하십시오.',
        steps: [
          '곱의 미분법을 씁니다. $f\'(x)=(2x+1)\'(x^2-3)+(2x+1)(x^2-3)\'$',
          '$(2x+1)\'=2$, $(x^2-3)\'=2x$이므로 $f\'(x)=2(x^2-3)+(2x+1)\\cdot2x=6x^2+2x-6$',
          '$x=1$을 대입하면 $f\'(1)=6+2-6=2$',
          '확인: 전개하면 $f(x)=2x^3+x^2-6x-3$이고, 미분하면 $f\'(x)=6x^2+2x-6$으로 같습니다.',
        ],
        answer: '$f\'(1)=2$',
      },
      {
        q: '$f(x)=x^3-2x$일 때, $\\lim_{h \\to 0}\\dfrac{f(2+h)-f(2-h)}{h}$의 값을 구하십시오.',
        steps: [
          '$f(2)$를 빼고 더해 둘로 나눕니다: $\\dfrac{f(2+h)-f(2)}{h}+\\dfrac{f(2-h)-f(2)}{-h}$',
          '$h \\to 0$이면 두 항은 모두 $f\'(2)$에 가까워집니다(둘째 항은 $x$의 증가량이 $-h$). 극한값은 $2f\'(2)$입니다.',
          '$f\'(x)=3x^2-2$이므로 $f\'(2)=10$',
          '극한값은 $2\\times10=20$입니다.',
        ],
        answer: '$20$',
      },
      {
        q: '다항함수 $f(x)=x^2+ax+b$가 $\\lim_{x \\to 2}\\dfrac{f(x)-5}{x-2}=7$을 만족시킬 때, 상수 $a$, $b$의 값을 구하십시오.',
        steps: [
          '$x \\to 2$일 때 분모가 0에 가까워지고 극한값이 존재하므로 분자도 0에 가까워져야 합니다. 곧 $f(2)=5$',
          '그러면 주어진 극한은 $\\lim_{x \\to 2}\\dfrac{f(x)-f(2)}{x-2}=f\'(2)=7$입니다.',
          '$f(2)=4+2a+b=5$이고, $f\'(x)=2x+a$에서 $f\'(2)=4+a=7$',
          '따라서 $a=3$, $b=1-2a=-5$입니다.',
        ],
        answer: '$a=3$, $b=-5$',
      },
    ],

    terms: [
      { term: '도함수', def: '함수 $f(x)$의 각 $x$에 그 점에서의 미분계수를 대응시킨 함수입니다. $f\'(x)=\\lim_{h \\to 0}\\dfrac{f(x+h)-f(x)}{h}$' },
      { term: '미분법', def: '함수 $f(x)$에서 도함수 $f\'(x)$를 구하는 것을 미분한다고 하고, 그 계산 방법을 미분법이라고 합니다.' },
      { term: '미분계수', def: '$x=a$에서의 순간변화율 $f\'(a)=\\lim_{h \\to 0}\\dfrac{f(a+h)-f(a)}{h}$입니다. 곡선 위의 점 $(a, f(a))$에서의 접선의 기울기와 같습니다.' },
      { term: '미분가능', def: '$x=a$에서 미분계수 $f\'(a)$가 존재하는 것입니다. 미분가능한 함수는 그 점에서 연속입니다.' },
      { term: '상수함수', def: '$f(x)=c$처럼 함숫값이 늘 같은 함수입니다. 도함수는 0입니다.' },
      { term: '곱의 미분법', def: '$\\{f(x)g(x)\\}\'=f\'(x)g(x)+f(x)g\'(x)$입니다. 도함수끼리 곱하는 것이 아닙니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'expr', concept: 2,
        q: '$f(x)=x^5$일 때 $f\'(x)$를 구하십시오.',
        answer: '5x^4',
        wrong: [
          { a: '5x^5', why: '지수를 1 줄이지 않았습니다. $(x^n)\'=nx^{n-1}$입니다.' },
          { a: 'x^4', why: '지수 5를 앞으로 내려 곱하는 것을 빠뜨렸습니다.' },
        ],
        explain: '$(x^n)\'=nx^{n-1}$에서 $n=5$이므로 $f\'(x)=5x^4$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 2,
        q: '상수함수 $f(x)=7$의 도함수 $f\'(x)$는 무엇입니까?',
        choices: ['$0$', '$7$', '$7x$', '$1$'],
        answer: 0,
        why: [
          '',
          '함숫값을 그대로 썼습니다. 값이 변하지 않으므로 변화율은 0입니다.',
          '$7x$를 미분하면 7입니다. 거꾸로 생각했습니다.',
          '$f(x)=x$의 도함수가 1입니다. 상수함수의 도함수는 0입니다.',
        ],
        explain: '$f(x+h)-f(x)=7-7=0$이므로 $f\'(x)=0$입니다. 그래프 $y=7$은 수평인 직선이라 어디서나 기울기가 0입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 3,
        q: '$f(x)=2x^3-4x^2+x-5$일 때 $f\'(1)$의 값을 구하십시오.',
        answer: '-1',
        wrong: [{ a: '-6', why: '함숫값 $f(1)$을 계산했습니다. 먼저 미분한 뒤 $x=1$을 대입합니다.' }],
        explain: '항마다 미분하면 $f\'(x)=6x^2-8x+1$이므로 $f\'(1)=6-8+1=-1$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 4,
        q: '두 다항함수 $f(x)$, $g(x)$에 대하여 $\\{f(x)g(x)\\}\'=f\'(x)g\'(x)$입니다.',
        answer: false,
        explain: '곱의 미분법은 $\\{f(x)g(x)\\}\'=f\'(x)g(x)+f(x)g\'(x)$입니다. 예를 들어 $f(x)=x$, $g(x)=x$이면 $f(x)g(x)=x^2$의 도함수는 $2x$인데 $f\'(x)g\'(x)=1$이 되어 맞지 않습니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 0,
        q: '함수 $f(x)$의 도함수 $f\'(x)$의 정의로 옳은 것은 무엇입니까?',
        choices: [
          '$\\lim_{h \\to 0}\\dfrac{f(x+h)-f(x)}{h}$',
          '$\\lim_{h \\to 0}\\dfrac{f(x+h)-f(x)}{x}$',
          '$\\dfrac{f(x+h)-f(x)}{h}$',
          '$\\lim_{h \\to 0}\\{f(x+h)-f(x)\\}$',
        ],
        answer: 0,
        why: [
          '',
          '분모는 $x$ 자체가 아니라 $x$의 증가량 $h$여야 합니다.',
          '극한을 취하지 않으면 평균변화율일 뿐입니다. $h \\to 0$의 극한을 취해야 순간변화율이 됩니다.',
          '변화량을 $h$로 나누지 않았습니다. 이 극한은 연속함수에서 늘 0입니다.',
        ],
        explain: '도함수는 각 $x$에서의 순간변화율이므로 $f\'(x)=\\lim_{h \\to 0}\\dfrac{f(x+h)-f(x)}{h}$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'expr', concept: 3,
        q: '$f(x)=\\dfrac{1}{3}x^3-2x^2+5x$일 때 $f\'(x)$를 구하십시오.',
        answer: 'x^2-4x+5',
        wrong: [
          { a: 'x^2-4x', why: '일차항 $5x$의 도함수 5를 빠뜨렸습니다.' },
          { a: '3x^2-4x+5', why: '첫째 항의 계수 $\\dfrac{1}{3}$을 곱하지 않았습니다. $\\dfrac{1}{3}\\cdot3x^2=x^2$입니다.' },
        ],
        explain: '항마다 미분합니다. $\\dfrac{1}{3}\\cdot3x^2-2\\cdot2x+5=x^2-4x+5$입니다.',
      },
      {
        id: 'p7', level: 2, type: 'short', check: 'number', concept: 4,
        q: '$f(x)=(x^2+2)(3x-1)$일 때 $f\'(1)$의 값을 구하십시오.',
        answer: '13',
        hint: '곱의 미분법을 쓰거나, 전개한 뒤 미분합니다.',
        wrong: [
          { a: '6', why: '두 인수의 도함수 $2x$와 3을 곱했습니다. 곱의 미분법은 "앞 미분·뒤 그대로 + 앞 그대로·뒤 미분"입니다.' },
          { a: '4', why: '앞의 $x^2+2$만 미분했습니다. 뒤를 미분한 항 $(x^2+2)\\cdot3$도 더합니다.' },
        ],
        explain: '$f\'(x)=2x(3x-1)+(x^2+2)\\cdot3$이므로 $f\'(1)=2\\cdot2+3\\cdot3=13$입니다. 전개한 $f(x)=3x^3-x^2+6x-2$를 미분해도 $f\'(x)=9x^2-2x+6$, $f\'(1)=13$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 5,
        q: '$f(x)=x^3-3x$일 때, $\\lim_{x \\to 2}\\dfrac{f(x)-f(2)}{x^2-4}$의 값을 구하십시오.',
        answer: '9/4',
        hint: '분모를 인수분해하여 미분계수의 정의 꼴을 만듭니다.',
        wrong: [{ a: '9', why: '분모를 $x-2$로 보았습니다. $x^2-4=(x-2)(x+2)$이므로 $x+2$로 한 번 더 나눕니다.' }],
        explain: '$\\dfrac{f(x)-f(2)}{x^2-4}=\\dfrac{f(x)-f(2)}{x-2}\\cdot\\dfrac{1}{x+2}$이므로 극한값은 $\\dfrac{f\'(2)}{4}$입니다. $f\'(x)=3x^2-3$에서 $f\'(2)=9$이므로 답은 $\\dfrac{9}{4}$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 5,
        q: '$\\lim_{x \\to 1}\\dfrac{x^{10}-1}{x-1}$의 값을 구하십시오.',
        answer: '10',
        hint: '$f(x)=x^{10}$으로 놓으면 $1=f(1)$입니다.',
        wrong: [
          { a: '0', why: '분자에 $x=1$을 넣어 0으로 생각했습니다. 분모도 0이므로 $\\dfrac{0}{0}$ 꼴입니다.' },
          { a: '9', why: '도함수의 지수를 답으로 썼습니다. $10x^9$에 $x=1$을 넣으면 10입니다.' },
        ],
        explain: '$f(x)=x^{10}$으로 놓으면 $f(1)=1$이므로 주어진 극한은 $\\lim_{x \\to 1}\\dfrac{f(x)-f(1)}{x-1}=f\'(1)$입니다. $f\'(x)=10x^9$이므로 $f\'(1)=10$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 5,
        q: '다항함수 $f(x)=x^3+ax^2+b$에 대하여 $\\lim_{x \\to 1}\\dfrac{f(x)-4}{x-1}=7$일 때, $ab$의 값을 구하십시오. (단, $a$, $b$는 상수)',
        answer: '2',
        hint: '분모가 0에 가까워지므로 분자도 0에 가까워져야 합니다.',
        wrong: [{ a: '-4', why: '$ax^2$의 도함수를 $ax$로 계산한 것 같습니다. $(ax^2)\'=2ax$이므로 $f\'(1)=3+2a$입니다.' }],
        explain: '분모가 0에 가까워지고 극한값이 존재하므로 분자도 0에 가까워져야 합니다. 곧 $f(1)=1+a+b=4$입니다. 그러면 극한은 $f\'(1)$이고, $f\'(x)=3x^2+2ax$에서 $f\'(1)=3+2a=7$, $a=2$입니다. $b=3-a=1$이므로 $ab=2$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 4,
        q: '$f(x)=(2x-1)^3$의 도함수는 무엇입니까?',
        choices: ['$6(2x-1)^2$', '$3(2x-1)^2$', '$6(2x-1)$', '$2(2x-1)^3$'],
        answer: 0,
        why: [
          '',
          '괄호 안 $2x-1$의 도함수 2를 곱하지 않았습니다.',
          '지수를 2만큼 줄였습니다. $3-1=2$이므로 $(2x-1)^2$이 남습니다.',
          '지수를 앞으로 내리고 1 줄이는 것을 빠뜨렸습니다.',
        ],
        explain: '$g(x)=2x-1$로 놓으면 $f(x)=\\{g(x)\\}^3$이고, $f\'(x)=3\\{g(x)\\}^2g\'(x)$입니다. $g\'(x)=2$이므로 $f\'(x)=3(2x-1)^2\\cdot2=6(2x-1)^2$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 4,
        q: '두 다항함수 $f(x)$, $g(x)$가 $f(1)=2$, $f\'(1)=3$, $g(1)=-1$, $g\'(1)=4$를 만족시킵니다. $h(x)=f(x)g(x)$일 때 $h\'(1)$의 값을 구하십시오.',
        answer: '5',
        wrong: [
          { a: '12', why: '도함수끼리 곱한 $f\'(1)g\'(1)$을 계산했습니다.' },
          { a: '-2', why: '$h(1)=f(1)g(1)$을 구했습니다. 도함수의 값을 묻고 있습니다.' },
        ],
        explain: '$h\'(x)=f\'(x)g(x)+f(x)g\'(x)$이므로 $h\'(1)=3\\cdot(-1)+2\\cdot4=5$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 0,
        q: '다항함수 $f(x)$가 모든 실수 $x$, $y$에 대하여 $f(x+y)=f(x)+f(y)+2xy$를 만족시키고 $f\'(0)=3$일 때, $f\'(2)$의 값을 구하십시오.',
        answer: '7',
        hint: '$x=y=0$을 넣어 $f(0)$을 먼저 구하고, 도함수의 정의에 $f(x+h)=f(x)+f(h)+2xh$를 씁니다.',
        wrong: [
          { a: '4', why: '$f\'(0)$을 더하지 않았습니다. $\\lim_{h \\to 0}\\dfrac{f(h)}{h}=f\'(0)=3$입니다.' },
          { a: '3', why: '도함수가 상수라고 생각했습니다. $f\'(x)=3+2x$로 $x$에 따라 달라집니다.' },
        ],
        explain: '$x=y=0$이면 $f(0)=2f(0)$이므로 $f(0)=0$입니다.\n\n$f\'(x)=\\lim_{h \\to 0}\\dfrac{f(x+h)-f(x)}{h}=\\lim_{h \\to 0}\\dfrac{f(h)+2xh}{h}=\\lim_{h \\to 0}\\dfrac{f(h)-f(0)}{h}+2x=f\'(0)+2x=3+2x$\n\n따라서 $f\'(2)=7$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'expr', concept: 4,
        q: '다항식 $x^{10}-3x+2$를 $(x-1)^2$으로 나눈 나머지를 구하십시오.',
        answer: '7x-7',
        hint: '몫을 $Q(x)$, 나머지를 $ax+b$로 놓고, 양변을 미분하여 $x=1$을 넣어 봅니다.',
        wrong: [{ a: '7x+7', why: '$x=1$을 넣은 식 $a+b=0$에서 부호를 잘못 정했습니다. $b=-7$입니다.' }],
        explain: '$x^{10}-3x+2=(x-1)^2Q(x)+ax+b$로 놓습니다. $x=1$을 넣으면 $0=a+b$입니다.\n\n양변을 미분하면 곱의 미분법으로 $10x^9-3=2(x-1)Q(x)+(x-1)^2Q\'(x)+a$이고, $x=1$을 넣으면 $7=a$입니다.\n\n따라서 $b=-7$이고, 나머지는 $7x-7$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 5,
        q: '다항함수 $f(x)$가 $\\lim_{x \\to \\infty}\\dfrac{f(x)}{x^2}=2$, $\\lim_{x \\to 1}\\dfrac{f(x)}{x-1}=3$을 만족시킬 때, $f(2)$의 값을 구하십시오.',
        answer: '5',
        hint: '첫째 조건에서 $f(x)$의 차수와 최고차항의 계수를 알 수 있습니다.',
        wrong: [{ a: '7', why: '$f\'(1)=2+a$로 계산한 것 같습니다. 최고차항의 계수 2까지 곱하면 $(2x^2)\'=4x$이므로 $f\'(1)=4+a$입니다.' }],
        explain: '첫째 조건에서 $f(x)$는 최고차항의 계수가 2인 이차함수이므로 $f(x)=2x^2+ax+b$로 놓습니다.\n\n둘째 조건에서 분모가 0에 가까워지므로 $f(1)=0$, 곧 $2+a+b=0$이고, 극한은 $f\'(1)=4+a=3$이므로 $a=-1$, $b=-1$입니다.\n\n$f(x)=2x^2-x-1$이므로 $f(2)=8-2-1=5$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 5,
        q: '$f(x)=x^3+x$일 때, $\\lim_{h \\to 0}\\dfrac{f(1+2h)-f(1-h)}{h}$의 값을 구하십시오.',
        answer: '12',
        hint: '$f(1)$을 빼고 더해 두 극한으로 나누어 봅니다.',
        wrong: [
          { a: '4', why: '두 점 사이의 거리를 $2h-h=h$로 계산했습니다. $1+2h$와 $1-h$의 차는 $3h$입니다.' },
          { a: '8', why: '$f(1-h)$ 쪽의 변화를 빠뜨렸습니다. 둘째 극한도 $f\'(1)$만큼 더해집니다.' },
        ],
        explain: '$f(1)$을 빼고 더하면 $\\dfrac{f(1+2h)-f(1)}{h}-\\dfrac{f(1-h)-f(1)}{h}$입니다. 첫째 항은 $2f\'(1)$, 둘째 항 $\\dfrac{f(1-h)-f(1)}{h}$은 $-f\'(1)$에 가까워지므로 극한값은 $2f\'(1)+f\'(1)=3f\'(1)$입니다.\n\n$f\'(x)=3x^2+1$에서 $f\'(1)=4$이므로 답은 12입니다.',
      },
    ],

    deeper: [
      {
        title: '도함수를 나타내는 여러 기호',
        body: '같은 도함수를 여러 기호로 씁니다. $\\dfrac{dy}{dx}$는 독일의 수학자 **라이프니츠**가 쓴 기호로, "$y$의 변화량 $\\Delta y$를 $x$의 변화량 $\\Delta x$로 나눈 것의 극한"이라는 뜻이 그대로 담겨 있습니다. $f\'(x)$처럼 작은따옴표 모양의 표시를 붙이는 기호는 **라그랑주**가 널리 퍼뜨렸습니다. 영국의 **뉴턴**은 시간에 대한 변화율을 문자 위에 점을 찍어 나타냈습니다.\n\n$\\dfrac{dy}{dx}$는 분수처럼 생겼지만 하나의 기호입니다. 그래도 "무엇을 무엇에 대하여 미분하는가"가 드러나서, 물리처럼 변수가 여럿인 곳에서 특히 편리합니다.',
      },
      {
        title: '다음 단원과의 연결',
        body: '도함수 $f\'(x)$는 각 점에서의 접선의 기울기를 알려 줍니다. 다음 단원에서는 이것으로 **접선의 방정식**을 세우고, 그다음에는 $f\'(x)$의 부호로 함수가 **증가하는지 감소하는지**를 판단합니다.\n\n또 미분을 거꾸로 하는 일, 곧 "도함수가 주어졌을 때 원래 함수를 찾는 일"이 **부정적분**입니다. 이 단원에서 익힌 $(x^n)\'=nx^{n-1}$이 그때 거꾸로 쓰입니다.',
      },
    ],

    faq: [
      {
        q: '미분계수와 도함수는 뭐가 달라요?',
        a: '미분계수 $f\'(a)$는 한 점 $x=a$에서의 순간변화율로, **하나의 수**입니다. 도함수 $f\'(x)$는 모든 점의 미분계수를 모아 놓은 **함수**입니다. 도함수를 먼저 구하고 $x=a$를 대입하면 미분계수가 됩니다.',
      },
      {
        q: '곱의 미분법을 안 쓰고 전개해서 미분해도 돼요?',
        a: '됩니다. 다항함수는 전개한 뒤 항마다 미분해도 답이 같습니다. 다만 $(2x-1)^5$처럼 전개가 길어지거나, $f(x)g(x)$처럼 식을 모르는 함수의 곱을 다룰 때는 곱의 미분법이 꼭 필요합니다.',
      },
      {
        q: '$(x^n)\'=nx^{n-1}$은 $n$이 음수나 분수여도 맞아요?',
        a: '이 과정에서는 $n$이 양의 정수인 경우만 다룹니다. $n$이 음의 정수나 실수인 경우에도 같은 꼴의 공식이 성립하는데, 이는 다음 과정(미적분Ⅱ)에서 여러 가지 미분법과 함께 배웁니다.',
      },
      {
        q: '상수함수를 미분하면 왜 0이에요?',
        a: '상수함수는 $x$가 변해도 함숫값이 그대로입니다. 변화량이 늘 0이므로 변화율도 0입니다. 그래프로 보면 수평인 직선이라 어느 점에서나 접선의 기울기가 0입니다.',
      },
    ],

    mistakes: [
      '$(x^5)\'=5x^5$처럼 지수를 1 줄이지 않는 실수 — 지수를 앞으로 내려 곱하고, 지수는 1 줄여 $5x^4$입니다.',
      '곱의 도함수를 도함수끼리의 곱 $f\'(x)g\'(x)$로 계산하는 실수 — $\\{f(x)g(x)\\}\'=f\'(x)g(x)+f(x)g\'(x)$입니다.',
      '$\\lim_{h \\to 0}\\dfrac{f(a+2h)-f(a)}{h}$를 그냥 $f\'(a)$로 쓰는 실수 — 분모를 $x$의 증가량 $2h$로 맞추면 $2f\'(a)$입니다.',
    ],

    gens: [
      {
        id: 'diff-poly',
        level: 1,
        title: '다항함수의 도함수 구하기',
        make: function (R) {
          var deg = R.pick([3, 3, 4]);
          var c = [R.nonzero(-3, 3)];
          for (var i = 0; i < deg; i++) c.push(R.int(-6, 6));
          var d = deriv(c);
          // 지수를 줄이지 않은 실수: a x^e → e·a x^e
          var noDrop = c.map(function (a, i) { return a * (deg - i); });
          // 지수를 내려 곱하지 않은 실수: a x^e → a x^(e-1)
          var noMul = c.slice(0, deg);
          return {
            type: 'short', check: 'expr', concept: 3,
            q: '$f(x)=' + R.fmt.poly(c) + '$일 때 $f\'(x)$를 구하십시오.',
            answer: plain(d),
            wrong: [
              { a: plain(noDrop), why: '계수는 맞게 곱했지만 지수를 1 줄이지 않았습니다. $(x^n)\'=nx^{n-1}$입니다.' },
              { a: plain(noMul), why: '지수만 1 줄이고, 지수를 앞으로 내려 곱하는 것을 빠뜨렸습니다.' },
            ],
            explain: '항마다 $(x^n)\'=nx^{n-1}$을 쓰고, 상수항은 미분하면 0입니다.\n\n$f\'(x)=' + R.fmt.poly(d) + '$',
          };
        },
      },
      {
        id: 'diff-value',
        level: 1,
        title: '도함수에 대입하여 미분계수 구하기',
        make: function (R) {
          var c = [R.nonzero(-3, 3), R.int(-5, 5), R.int(-5, 5), R.int(-5, 5)];
          var k = R.pick([-2, -1, 1, 2, 3]);
          var d = deriv(c);
          var ans = val(d, k);
          var fk = val(c, k);
          var noMul = val(c.slice(0, 3), k);
          var wrong = [];
          if (fk !== ans) wrong.push({ a: String(fk), why: '함숫값 $f(' + k + ')$' + R.josa(k, '을/를') + ' 계산했습니다. 먼저 미분한 뒤 $x=' + k + '$' + R.josa(k, '을/를') + ' 대입합니다.' });
          if (noMul !== ans && noMul !== fk) wrong.push({ a: String(noMul), why: '지수만 1 줄이고 지수를 앞으로 내려 곱하지 않았습니다. $(x^n)\'=nx^{n-1}$입니다.' });
          return {
            type: 'short', check: 'number', concept: 3,
            q: '$f(x)=' + R.fmt.poly(c) + '$일 때 $f\'(' + k + ')$의 값을 구하십시오.',
            answer: String(ans),
            wrong: wrong,
            explain: '항마다 미분하면 $f\'(x)=' + R.fmt.poly(d) + '$입니다. $x=' + k + '$' + R.josa(k, '을/를') + ' 대입하면 $f\'(' + k + ')=' + ans + '$입니다.',
          };
        },
      },
      {
        id: 'product-value',
        level: 2,
        title: '곱의 미분법으로 미분계수 구하기',
        make: function (R) {
          var p = R.pick([1, 2, 3, -1, -2]), q = R.nonzero(-5, 5);
          var r = R.pick([1, 2, 3, -1, -2]), s = R.nonzero(-5, 5);
          var k = R.pick([-2, -1, 1, 2, 3]);
          var u = R.fmt.poly([p, q]), v = R.fmt.poly([r, 0, s]);
          var A = p * (r * k * k + s);       // (앞 미분)(뒤 그대로)
          var B = (p * k + q) * 2 * r * k;   // (앞 그대로)(뒤 미분)
          var ans = A + B;
          var cands = [
            [p * 2 * r * k, '두 인수의 도함수끼리 곱했습니다. 곱의 미분법은 "앞 미분·뒤 그대로 + 앞 그대로·뒤 미분"입니다.'],
            [A, '앞 인수만 미분했습니다. 뒤 인수를 미분한 항도 더합니다.'],
            [B, '뒤 인수만 미분했습니다. 앞 인수를 미분한 항도 더합니다.'],
          ];
          var wrong = [], seen = {};
          seen[ans] = true;
          cands.forEach(function (w) {
            if (!seen[w[0]]) { seen[w[0]] = true; wrong.push({ a: String(w[0]), why: w[1] }); }
          });
          var pc = p === 1 ? '' : p === -1 ? '-' : String(p);
          return {
            type: 'short', check: 'number', concept: 4,
            q: '$f(x)=(' + u + ')(' + v + ')$일 때 $f\'(' + k + ')$의 값을 구하십시오.',
            answer: String(ans),
            wrong: wrong,
            hint: '곱의 미분법 "앞 미분·뒤 그대로 + 앞 그대로·뒤 미분"을 씁니다.',
            explain: '곱의 미분법으로 $f\'(x)=' + pc + '(' + v + ')+(' + u + ')\\cdot(' + R.fmt.poly([2 * r, 0]) + ')$입니다.\n\n$x=' + k + '$' + R.josa(k, '을/를') + ' 대입하면 $f\'(' + k + ')=' + A + R.fmt.signed(B) + '=' + ans + '$입니다.',
          };
        },
      },
      {
        id: 'limit-deriv',
        level: 2,
        title: '미분계수의 정의를 이용한 극한값',
        make: function (R) {
          var cubic = R.bool();
          var b = R.int(-4, 4);
          var a = R.pick([-2, -1, 1, 2]);
          var c = cubic ? [1, 0, b, 0] : [1, b, 0];
          var fp = val(deriv(c), a);
          if (fp === 0) { c[c.length - 2] += 1; b += 1; fp = val(deriv(c), a); }
          var form = R.pick(['one', 'two', 'frac']);
          var m = R.int(2, 4), n = R.int(1, 3);
          var at = function (k, neg) { return 'f(' + a + (neg ? '-' : '+') + (k === 1 ? '' : k) + 'h)'; };
          var lim, coef, how, wrong = [];
          if (form === 'one') {
            lim = '\\dfrac{' + at(m) + '-f(' + a + ')}{h}';
            coef = R.F(m);
            how = '$\\dfrac{' + at(m) + '-f(' + a + ')}{' + m + 'h}\\times' + m + '$' + R.josa(m, '으로/로') + ' 고치면 극한값은 $' + m + 'f\'(' + a + ')$입니다.';
          } else if (form === 'two') {
            lim = '\\dfrac{' + at(m) + '-' + at(n, true) + '}{h}';
            coef = R.F(m + n);
            how = '$f(' + a + ')$' + R.josa(a, '을/를') + ' 빼고 더하면 $\\dfrac{' + at(m) + '-f(' + a + ')}{h}-\\dfrac{' + at(n, true) + '-f(' + a + ')}{h}$이고, 두 극한은 $' + m + 'f\'(' + a + ')$' + R.josa(a, '과/와') + ' $' + (n === 1 ? '-' : -n) + 'f\'(' + a + ')$입니다. 따라서 극한값은 $' + m + 'f\'(' + a + ')+' + (n === 1 ? '' : n) + 'f\'(' + a + ')=' + (m + n) + 'f\'(' + a + ')$입니다.';
            if (m - n !== 0 && m - n !== 1) wrong.push({ a: String((m - n) * fp), why: '두 점 사이의 거리를 $' + m + 'h-' + (n === 1 ? '' : n) + 'h$로 계산했습니다. $' + a + '+' + m + 'h$와 $' + a + '-' + (n === 1 ? '' : n) + 'h$의 차는 $' + (m + n) + 'h$입니다.' });
          } else {
            var den = n + 1 === m ? m + 1 : n + 1;
            lim = '\\dfrac{' + at(m) + '-f(' + a + ')}{' + den + 'h}';
            coef = R.F(m, den);
            how = '분모를 $' + m + 'h$로 맞추면 $\\dfrac{' + at(m) + '-f(' + a + ')}{' + m + 'h}\\times\\dfrac{' + m + '}{' + den + '}$이므로 극한값은 $' + R.fmt.frac(coef) + 'f\'(' + a + ')$입니다.';
          }
          var ans = coef.mul(fp);
          if (!coef.eq(1) && fp !== 0 && !R.F(fp).eq(ans)) wrong.unshift({ a: String(fp), why: '$f\'(' + a + ')$만 구했습니다. 분모를 분자의 $x$의 증가량과 같게 맞추어야 합니다.' });
          return {
            type: 'short', check: 'number', concept: 5,
            q: '$f(x)=' + R.fmt.poly(c) + '$일 때, $\\lim_{h \\to 0}' + lim + '$의 값을 구하십시오.',
            answer: ans.toString(),
            wrong: wrong,
            hint: '분모를 분자의 $x$의 증가량과 같게 맞추어 미분계수의 정의 꼴을 만듭니다.',
            explain: how + '\n\n$f\'(x)=' + R.fmt.poly(deriv(c)) + '$에서 $f\'(' + a + ')=' + fp + '$이므로 답은 $' + R.fmt.frac(ans) + '$입니다.',
          };
        },
      },
      {
        id: 'coef-from-limit',
        level: 3,
        title: '극한 조건으로 다항함수의 계수 정하기',
        make: function (R) {
          var a = R.pick([-2, -1, 1, 2]);
          var p = R.int(-5, 5), q = R.int(-6, 6);
          var f = [1, 0, p, q];
          var cval = val(f, a);
          var k = 3 * a * a + p;
          var t = R.pick([-2, -1, 0, 1, 2, 3].filter(function (x) { return x !== a; }));
          var ans = val(f, t);
          // 실수: (x^3)' 을 3x 로 계산
          var p2 = k - 3 * a, q2 = cval - a * a * a - p2 * a;
          var ans2 = t * t * t + p2 * t + q2;
          var wrong = [];
          if (ans2 !== ans) wrong.push({ a: String(ans2), why: '$x^3$의 도함수를 잘못 구했습니다. $(x^3)\'=3x^2$이므로 $f\'(' + a + ')=' + (3 * a * a) + '+p$입니다.' });
          var top = cval === 0 ? 'f(x)' : 'f(x)' + R.fmt.signed(-cval);
          return {
            type: 'short', check: 'number', concept: 5,
            q: '다항함수 $f(x)=x^3+px+q$가 $\\lim_{x \\to ' + a + '}\\dfrac{' + top + '}{' + R.fmt.poly([1, -a]) + '}=' + k + '$' + R.josa(k, '을/를') + ' 만족시킬 때, $f(' + t + ')$의 값을 구하십시오. (단, $p$, $q$는 상수)',
            answer: String(ans),
            wrong: wrong,
            hint: '분모가 0에 가까워지므로 분자도 0에 가까워져야 합니다. 그러면 주어진 극한은 미분계수입니다.',
            explain: '분모가 0에 가까워지고 극한값이 존재하므로 $f(' + a + ')=' + cval + '$이고, 주어진 극한은 $f\'(' + a + ')=' + k + '$입니다.\n\n' +
              '$f\'(x)=3x^2+p$이므로 $' + (3 * a * a) + '+p=' + k + '$, $p=' + p + '$입니다. $f(' + a + ')=' + (a * a * a) + (p * a === 0 ? '' : R.fmt.signed(p * a)) + '+q=' + cval + '$에서 $q=' + q + '$입니다.\n\n' +
              '$f(x)=' + R.fmt.poly(f) + '$이므로 $f(' + t + ')=' + ans + '$입니다.',
          };
        },
      },
    ],
  });
})();
