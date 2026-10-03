/* 미적분Ⅱ · 여러 가지 미분법
 * 매개변수로 나타낸 함수의 미분, 음함수의 미분, 역함수의 미분법, 이계도함수.
 * (접선의 방정식·오목과 볼록은 다음 단원) */
(function () {
  function tex(R, f) { return R.fmt.frac(f); }
  // 값이 같은 것을 빼고, 정답과 값이 같은 틀린 답도 뺀다 (분모가 0인 후보는 null 로 넘겨 버린다)
  function cleanWrong(R, ans, list) {
    var seen = {}, out = [];
    seen[R.F(0).add(ans).toString()] = true;
    list.forEach(function (w) {
      if (!w || w.a === null) return;
      var k = R.F(0).add(w.a).toString();
      if (seen[k]) return;
      seen[k] = true;
      out.push({ a: k, why: w.why });
    });
    return out;
  }
  function safeF(R, n, d) { return d === 0 ? null : R.F(n, d); }
  // 계수 c 와 문자 v 를 한 항으로: 1 → '+v', -1 → '-v', 3 → '+3v' (first 면 앞의 + 를 뗀다)
  function termStr(c, v, first) {
    if (c === 0) return '';
    var s = c === 1 ? v : c === -1 ? '-' + v : c + v;
    if (!first && c > 0) s = '+' + s;
    return s;
  }

  Tutor.registerUnit({
    id: 'math-h-calc2-06',
    course: 'math-h-calc2',
    title: '여러 가지 미분법',
    summary: '매개변수로 나타낸 함수, 음함수, 역함수를 미분하는 방법을 익히고, 도함수를 한 번 더 미분한 이계도함수를 구합니다.',
    goals: [
      '매개변수로 나타낸 함수를 미분할 수 있다.',
      '음함수를 미분할 수 있다.',
      '역함수의 미분법을 이해하고, 이를 이용하여 역함수의 미분계수를 구할 수 있다.',
      '이계도함수를 구할 수 있다.',
    ],
    standards: ['[12미적Ⅱ-02-06]', '[12미적Ⅱ-02-07]'],

    concepts: [
      {
        title: '매개변수로 나타낸 함수의 미분',
        body: '두 변수 $x$, $y$의 관계를 다른 변수 $t$를 써서\n\n$x=f(t)$, $y=g(t)$\n\n로 나타낼 때, $t$를 **매개변수**라고 합니다. 예를 들어 $x=\\cos t$, $y=\\sin t$ ($0 \\le t<2\\pi$)는 원 $x^2+y^2=1$을 나타냅니다.\n\n$f(t)$, $g(t)$가 미분가능하고 $f\'(t) \\ne 0$이면\n\n$\\dfrac{dy}{dx}=\\dfrac{\\dfrac{dy}{dt}}{\\dfrac{dx}{dt}}=\\dfrac{g\'(t)}{f\'(t)}$\n\n입니다.\n\n**까닭** $t$의 증분 $\\Delta t$에 대한 $x$, $y$의 증분을 $\\Delta x$, $\\Delta y$라 하면 $\\dfrac{\\Delta y}{\\Delta x}=\\dfrac{\\Delta y/\\Delta t}{\\Delta x/\\Delta t}$이고, $\\Delta t \\to 0$일 때 분자와 분모가 각각 $g\'(t)$, $f\'(t)$에 가까워집니다.\n\n**예** $x=2\\cos t$, $y=2\\sin t$이면 $\\dfrac{dy}{dx}=\\dfrac{2\\cos t}{-2\\sin t}=-\\dfrac{\\cos t}{\\sin t}$ ($\\sin t \\ne 0$). $t=\\dfrac{\\pi}{4}$인 점 $(\\sqrt{2}, \\sqrt{2})$에서 기울기는 $-1$입니다.\n\n> 💡 결과는 보통 $t$로 나타냅니다. 특정한 점에서의 값을 구할 때는 그 점에 대응하는 $t$의 값을 먼저 찾습니다.',
        easy: '$t$를 시각이라고 생각해 보십시오. 점이 평면 위를 움직이고, 시각 $t$일 때 위치가 $(x, y)$입니다.\n\n점이 지나간 자취(곡선)의 기울기는 "옆으로 1만큼 갈 때 위로 얼마나 가는가"입니다. 1초 동안 옆으로 $\\dfrac{dx}{dt}$, 위로 $\\dfrac{dy}{dt}$만큼 움직인다면 기울기는 그 비 $\\dfrac{dy/dt}{dx/dt}$입니다.',
        fig: {
          type: 'coord', xmin: -3, xmax: 3, ymin: -3, ymax: 3,
          fns: [{ expr: 'sqrt(4-x^2)' }, { expr: '-sqrt(4-x^2)' }, { expr: '-x+2.83', from: 0.4, to: 2.4 }],
          points: [{ x: 1.414, y: 1.414, label: 't=π/4' }],
          alt: 'x=2cos t, y=2sin t로 나타낸 반지름 2인 원과, t=π/4인 점에서 그은 기울기 -1인 접선',
        },
        check: {
          type: 'choice',
          q: '$x=t^2$, $y=4t$로 나타낸 함수에서 $\\dfrac{dy}{dx}$는 어느 것입니까? (단, $t \\ne 0$)',
          choices: ['$\\dfrac{2}{t}$', '$\\dfrac{t}{2}$', '$8t$'],
          answer: 0,
          why: [
            '',
            '분자와 분모를 바꾸어 $\\dfrac{dx/dt}{dy/dt}$를 계산했습니다.',
            '$\\dfrac{dy}{dt}$와 $\\dfrac{dx}{dt}$를 곱했습니다. 나누어야 합니다.',
          ],
          explain: '$\\dfrac{dx}{dt}=2t$, $\\dfrac{dy}{dt}=4$이므로 $\\dfrac{dy}{dx}=\\dfrac{4}{2t}=\\dfrac{2}{t}$입니다.',
        },
      },
      {
        title: '음함수의 미분',
        body: '$x^2+y^2=25$처럼 $x$, $y$의 방정식 $F(x, y)=0$ 꼴로 주어진 관계에서, $y$를 $x$의 함수로 볼 때 이를 **음함수** 표현이라고 합니다. ($y=\\sqrt{25-x^2}$처럼 $y$를 $x$의 식으로 직접 나타낸 것은 양함수입니다.)\n\n$y$를 $x$에 대하여 풀지 않아도, **$y$를 $x$의 함수로 보고 양변을 $x$에 대하여 미분**하면 $\\dfrac{dy}{dx}$를 구할 수 있습니다. 이때 $y$가 들어 있는 항은 합성함수의 미분법으로 미분합니다.\n\n$\\dfrac{d}{dx}(y^2)=2y\\dfrac{dy}{dx}$, $\\dfrac{d}{dx}(xy)=y+x\\dfrac{dy}{dx}$\n\n**예** $x^2+y^2=25$의 양변을 $x$에 대하여 미분하면\n\n$2x+2y\\dfrac{dy}{dx}=0$이므로 $\\dfrac{dy}{dx}=-\\dfrac{x}{y}$ ($y \\ne 0$)\n\n점 $(3, 4)$에서의 기울기는 $-\\dfrac{3}{4}$입니다.\n\n> ⚠️ $y^2$을 미분하고 $2y$에서 멈추면 안 됩니다. $y$는 $x$의 함수이므로 반드시 $\\dfrac{dy}{dx}$를 곱합니다.',
        easy: '$y$를 "$x$에 따라 값이 정해지는 어떤 함수 $y(x)$"라고 적어 보면 이해가 쉽습니다.\n\n$y^2$은 $\\{y(x)\\}^2$이므로 겉 함수 $u^2$과 속 함수 $y(x)$의 합성함수입니다. 그래서 미분하면 $2y(x)\\cdot y\'(x)$가 됩니다. $x^2$을 미분할 때 $2x$ 뒤에 아무것도 붙지 않는 것은 $x$를 $x$로 미분하면 1이기 때문입니다.\n\n그림의 원에서 점 $(3, 4)$의 접선 기울기는 $-\\dfrac{3}{4}$입니다. 반지름의 기울기 $\\dfrac{4}{3}$와 곱하면 $-1$, 곧 접선과 반지름이 수직입니다.',
        fig: {
          type: 'coord', xmin: -6, xmax: 8, ymin: -6, ymax: 7,
          fns: [{ expr: 'sqrt(25-x^2)' }, { expr: '-sqrt(25-x^2)' }, { expr: '-0.75x+6.25', from: -1, to: 7.5 }],
          points: [{ x: 3, y: 4, label: '(3, 4)' }],
          alt: '원 x²+y²=25와 점 (3, 4)에서의 접선. 접선의 기울기는 -3/4이다',
        },
        check: {
          type: 'ox',
          q: '$x^2+y^2=25$의 양변을 $x$에 대하여 미분하면 $2x+2y=0$입니다.',
          answer: false,
          explain: '$y$는 $x$의 함수이므로 $\\dfrac{d}{dx}(y^2)=2y\\dfrac{dy}{dx}$입니다. 바르게 미분하면 $2x+2y\\dfrac{dy}{dx}=0$입니다.',
        },
      },
      {
        title: '역함수의 미분법',
        body: '미분가능한 함수 $f(x)$의 역함수 $g(x)$가 존재하고 미분가능할 때, $y=g(x)$이면 $x=f(y)$입니다. 이 식의 양변을 $x$에 대하여 미분하면 $1=f\'(y)\\dfrac{dy}{dx}$이므로\n\n$\\dfrac{dy}{dx}=\\dfrac{1}{\\dfrac{dx}{dy}}$ ($\\dfrac{dx}{dy} \\ne 0$), 곧 $g\'(x)=\\dfrac{1}{f\'(g(x))}$\n\n입니다. 점으로 말하면 **$f(a)=b$이면 $g\'(b)=\\dfrac{1}{f\'(a)}$** ($f\'(a) \\ne 0$)입니다.\n\n**그래프의 뜻** $y=f(x)$와 $y=g(x)$의 그래프는 직선 $y=x$에 대하여 대칭이므로, 점 $(a, b)$에서의 접선과 점 $(b, a)$에서의 접선도 대칭이고 기울기는 서로 역수입니다.\n\n**예** $f(x)=x^3+x$의 역함수를 $g(x)$라 하면 $f(1)=2$이므로 $g\'(2)=\\dfrac{1}{f\'(1)}=\\dfrac{1}{4}$입니다. 역함수의 식을 직접 구하지 않아도 됩니다.\n\n> ⚠️ $g\'(b)$를 구할 때 $f\'(b)$에 넣지 않습니다. 먼저 $f(a)=b$인 $a$를 찾고 $f\'(a)$의 역수를 구합니다.',
        easy: '역함수는 "입력과 출력을 바꾼 함수"입니다. 그래프로는 $y=x$를 거울로 삼아 뒤집은 모양입니다.\n\n거울에 비친 직선은 가로와 세로가 바뀌므로, 기울기 $\\dfrac{세로}{가로}$가 뒤집혀 역수가 됩니다. 그림에서 곡선 $y=e^x$의 점 $(1, e)$에서의 기울기는 $e$이고, 곡선 $y=\\ln x$의 대응하는 점 $(e, 1)$에서의 기울기는 $\\dfrac{1}{e}$입니다.',
        fig: {
          type: 'coord', xmin: -2, xmax: 4, ymin: -2, ymax: 4,
          fns: [{ expr: 'exp(x)', label: 'y=eˣ' }, { expr: 'ln(x)', from: 0.05, label: 'y=ln x' }, { expr: 'x' }],
          points: [{ x: 1, y: 2.718, label: '(1, e)' }, { x: 2.718, y: 1, label: '(e, 1)' }],
          alt: '직선 y=x에 대하여 대칭인 두 곡선 y=e^x와 y=ln x. 점 (1, e)와 점 (e, 1)이 서로 대칭이다',
        },
        check: {
          type: 'short', check: 'number',
          q: '함수 $f(x)=x^3+2x$의 역함수를 $g(x)$라 할 때, $f(1)=3$입니다. $g\'(3)$의 값을 구하십시오.',
          answer: '1/5',
          wrong: [
            { a: '1/29', why: '$f\'(3)$에 넣었습니다. $f(1)=3$이므로 $f\'(1)$의 역수를 구합니다.' },
            { a: '5', why: '$f\'(1)=5$까지 구하고 역수를 취하지 않았습니다.' },
          ],
          explain: '$f\'(x)=3x^2+2$이고 $f(1)=3$이므로 $g\'(3)=\\dfrac{1}{f\'(1)}=\\dfrac{1}{5}$입니다.',
        },
      },
      {
        title: '이계도함수',
        body: '함수 $f(x)$의 도함수 $f\'(x)$가 미분가능할 때, $f\'(x)$의 도함수를 $f(x)$의 **이계도함수**라 하고 다음과 같이 나타냅니다.\n\n$f\'\'(x)$, $y\'\'$, $\\dfrac{d^2y}{dx^2}$, $\\dfrac{d^2}{dx^2}f(x)$\n\n곧 $f\'\'(x)=\\lim_{h \\to 0}\\dfrac{f\'(x+h)-f\'(x)}{h}$입니다. 이계도함수는 **기울기가 변하는 빠르기**를 나타냅니다. 직선 위를 움직이는 점의 위치를 두 번 미분하면 가속도가 되는 것도 이 때문입니다.\n\n**예**\n\n| $f(x)$ | $f\'(x)$ | $f\'\'(x)$ |\n|---|---|---|\n| $x^3-2x$ | $3x^2-2$ | $6x$ |\n| $\\sin x$ | $\\cos x$ | $-\\sin x$ |\n| $e^{2x}$ | $2e^{2x}$ | $4e^{2x}$ |\n| $\\ln x$ | $\\dfrac{1}{x}$ | $-\\dfrac{1}{x^2}$ |\n\n> ⚠️ $\\dfrac{d^2y}{dx^2}$는 $\\left(\\dfrac{dy}{dx}\\right)^2$이 아닙니다. "$x$에 대하여 두 번 미분한다"는 뜻의 기호입니다.\n\n> 💡 다음 단원에서는 $f\'\'(x)$의 부호로 곡선이 위로 볼록한지 아래로 볼록한지를 판정합니다.',
        easy: '자동차로 비유하면 위치를 한 번 미분한 것이 속도, 속도를 한 번 더 미분한 것이 가속도입니다. 가속도는 "속도가 얼마나 빨리 바뀌는가"입니다.\n\n그래프에서는 $f\'(x)$가 접선의 기울기이고, $f\'\'(x)$는 그 기울기가 얼마나 빨리 바뀌는가입니다. 계산은 간단합니다. 도함수를 구한 뒤, 그 결과를 한 번 더 미분하면 됩니다.',
        check: {
          type: 'choice',
          q: '함수 $f(x)=x^4$의 이계도함수 $f\'\'(x)$는 어느 것입니까?',
          choices: ['$4x^3$', '$12x^2$', '$24x$'],
          answer: 1,
          why: [
            '한 번만 미분했습니다. 이계도함수는 두 번 미분한 것입니다.',
            '',
            '세 번 미분했습니다. $4x^3$을 한 번 더 미분하면 $12x^2$입니다.',
          ],
          explain: '$f\'(x)=4x^3$이고, 이것을 한 번 더 미분하면 $f\'\'(x)=12x^2$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '$x=t^2+1$, $y=t^3-3t$로 나타낸 곡선 위의 $t=2$인 점에서 $\\dfrac{dy}{dx}$의 값을 구하십시오.',
        steps: [
          '$\\dfrac{dx}{dt}=2t$, $\\dfrac{dy}{dt}=3t^2-3$입니다.',
          '$\\dfrac{dy}{dx}=\\dfrac{3t^2-3}{2t}$ ($t \\ne 0$)입니다.',
          '$t=2$를 대입하면 $\\dfrac{12-3}{4}=\\dfrac{9}{4}$입니다.',
        ],
        answer: '$\\dfrac{9}{4}$',
      },
      {
        q: '곡선 $x^2+xy+y^2=7$ 위의 점 $(1, 2)$에서 $\\dfrac{dy}{dx}$의 값을 구하십시오.',
        steps: [
          '$y$를 $x$의 함수로 보고 양변을 $x$에 대하여 미분합니다. $xy$는 곱의 미분법으로 $y+x\\dfrac{dy}{dx}$가 됩니다.',
          '$2x+y+x\\dfrac{dy}{dx}+2y\\dfrac{dy}{dx}=0$이므로 $\\dfrac{dy}{dx}=-\\dfrac{2x+y}{x+2y}$입니다.',
          '$x=1$, $y=2$를 대입하면 $-\\dfrac{4}{5}$입니다.',
        ],
        answer: '$-\\dfrac{4}{5}$',
      },
      {
        q: '함수 $f(x)=x^3+x+1$의 역함수를 $g(x)$라 할 때, $g\'(3)$의 값을 구하십시오.',
        steps: [
          '$f(a)=3$인 $a$를 찾습니다. $a^3+a+1=3$에서 $a=1$입니다. ($f(x)$는 증가함수이므로 이런 $a$는 하나뿐입니다.)',
          '$f\'(x)=3x^2+1$이므로 $f\'(1)=4$입니다.',
          '$g\'(3)=\\dfrac{1}{f\'(1)}=\\dfrac{1}{4}$입니다.',
        ],
        answer: '$\\dfrac{1}{4}$',
      },
    ],

    terms: [
      { term: '매개변수', def: '$x=f(t)$, $y=g(t)$처럼 두 변수 $x$, $y$의 관계를 나타내기 위해 쓰는 또 다른 변수 $t$입니다.' },
      { term: '매개변수로 나타낸 함수의 미분법', def: '$x=f(t)$, $y=g(t)$일 때 $\\dfrac{dy}{dx}=\\dfrac{g\'(t)}{f\'(t)}$ ($f\'(t) \\ne 0$)로 미분하는 방법입니다.' },
      { term: '음함수', def: '$x^2+y^2=1$처럼 $F(x, y)=0$ 꼴의 방정식으로 나타낸 함수입니다. $y=f(x)$ 꼴로 직접 나타낸 함수는 양함수라고 합니다.' },
      { term: '음함수의 미분법', def: '$y$를 $x$의 함수로 보고 방정식의 양변을 $x$에 대하여 미분한 뒤 $\\dfrac{dy}{dx}$를 구하는 방법입니다.' },
      { term: '역함수의 미분법', def: '$f(x)$의 역함수를 $g(x)$라 할 때 $g\'(x)=\\dfrac{1}{f\'(g(x))}$입니다. $f(a)=b$이면 $g\'(b)=\\dfrac{1}{f\'(a)}$입니다.' },
      { term: '이계도함수', def: '도함수 $f\'(x)$를 한 번 더 미분한 함수입니다. $f\'\'(x)$, $y\'\'$, $\\dfrac{d^2y}{dx^2}$로 나타냅니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '$x=t^2+1$, $y=3t-1$로 나타낸 함수에서 $t=1$일 때 $\\dfrac{dy}{dx}$의 값을 구하십시오.',
        answer: '3/2',
        wrong: [
          { a: '2/3', why: '분자와 분모를 바꾸어 $\\dfrac{dx/dt}{dy/dt}$를 계산했습니다.' },
          { a: '6', why: '$\\dfrac{dy}{dt}$와 $\\dfrac{dx}{dt}$를 곱했습니다. 나누어야 합니다.' },
        ],
        explain: '$\\dfrac{dx}{dt}=2t$, $\\dfrac{dy}{dt}=3$이므로 $\\dfrac{dy}{dx}=\\dfrac{3}{2t}$입니다. $t=1$이면 $\\dfrac{3}{2}$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 0,
        q: '$x=\\cos t$, $y=\\sin t$로 나타낸 함수에서 $\\dfrac{dy}{dx}$는 어느 것입니까? (단, $\\sin t \\ne 0$)',
        choices: ['$-\\dfrac{\\sin t}{\\cos t}$', '$\\dfrac{\\cos t}{\\sin t}$', '$-\\dfrac{\\cos t}{\\sin t}$', '$-\\sin t\\cos t$'],
        answer: 2,
        why: [
          '분자와 분모를 바꾸어 $\\dfrac{dx/dt}{dy/dt}$를 계산했습니다.',
          '$(\\cos t)\'=-\\sin t$의 마이너스를 빠뜨렸습니다.',
          '',
          '$\\dfrac{dy}{dt}$와 $\\dfrac{dx}{dt}$를 곱했습니다. 나누어야 합니다.',
        ],
        explain: '$\\dfrac{dx}{dt}=-\\sin t$, $\\dfrac{dy}{dt}=\\cos t$이므로 $\\dfrac{dy}{dx}=\\dfrac{\\cos t}{-\\sin t}=-\\dfrac{\\cos t}{\\sin t}$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '$y$를 $x$의 함수로 볼 때 $\\dfrac{d}{dx}(y^3)$은 어느 것입니까?',
        choices: ['$3y^2$', '$3y^2\\dfrac{dy}{dx}$', '$3x^2$', '$y^3\\dfrac{dy}{dx}$'],
        answer: 1,
        why: [
          '$y$는 $x$의 함수이므로 합성함수의 미분법에 따라 $\\dfrac{dy}{dx}$를 곱해야 합니다.',
          '',
          '$y$를 $x$로 바꾸면 안 됩니다. $y^3$은 $y$의 세제곱입니다.',
          '겉 함수 $u^3$을 미분하지 않았습니다. $(u^3)\'=3u^2$입니다.',
        ],
        explain: '$y^3$은 겉 함수 $u^3$과 속 함수 $y(x)$의 합성함수이므로 $\\dfrac{d}{dx}(y^3)=3y^2\\dfrac{dy}{dx}$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', concept: 1,
        q: '곡선 $x^2+2y^2=9$ 위의 점 $(1, 2)$에서 $\\dfrac{dy}{dx}$의 값을 구하십시오.',
        answer: '-1/4',
        wrong: [
          { a: '-1/2', why: '$2y^2$을 미분할 때 계수 2를 빠뜨렸습니다. $\\dfrac{d}{dx}(2y^2)=4y\\dfrac{dy}{dx}$입니다.' },
          { a: '1/4', why: '이항할 때 부호를 바꾸지 않았습니다.' },
        ],
        explain: '양변을 $x$에 대하여 미분하면 $2x+4y\\dfrac{dy}{dx}=0$이므로 $\\dfrac{dy}{dx}=-\\dfrac{x}{2y}$입니다. 점 $(1, 2)$에서 $-\\dfrac{1}{4}$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 2,
        q: '함수 $f(x)=x^5+x$의 역함수를 $g(x)$라 할 때, $g\'(2)$의 값을 구하십시오.',
        answer: '1/6',
        hint: '$f(a)=2$인 $a$를 먼저 찾습니다.',
        wrong: [
          { a: '1/81', why: '$f\'(2)$에 넣었습니다. $f(1)=2$이므로 $f\'(1)$의 역수를 구합니다.' },
          { a: '6', why: '$f\'(1)=6$까지 구하고 역수를 취하지 않았습니다.' },
        ],
        explain: '$f(1)=1+1=2$이고 $f\'(x)=5x^4+1$이므로 $f\'(1)=6$입니다. 따라서 $g\'(2)=\\dfrac{1}{f\'(1)}=\\dfrac{1}{6}$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'expr', concept: 3,
        q: '함수 $f(x)=x^4-2x^3$의 이계도함수 $f\'\'(x)$를 구하십시오. (식으로 답합니다. 예: 3x^2+1)',
        answer: '12x^2-12x',
        wrong: [
          { a: '4x^3-6x^2', why: '한 번만 미분했습니다. 이계도함수는 두 번 미분한 것입니다.' },
          { a: '24x-12', why: '세 번 미분했습니다.' },
        ],
        explain: '$f\'(x)=4x^3-6x^2$이고, 한 번 더 미분하면 $f\'\'(x)=12x^2-12x$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '함수 $f(x)=\\sin x$의 이계도함수 $f\'\'(x)$는 어느 것입니까?',
        choices: ['$\\cos x$', '$-\\cos x$', '$\\sin x$', '$-\\sin x$'],
        answer: 3,
        why: [
          '한 번만 미분했습니다.',
          '세 번 미분했습니다. $-\\sin x$를 한 번 더 미분하면 $-\\cos x$입니다.',
          '$(\\cos x)\'=-\\sin x$의 마이너스를 빠뜨렸습니다.',
          '',
        ],
        explain: '$f\'(x)=\\cos x$이고, $f\'\'(x)=(\\cos x)\'=-\\sin x$입니다.',
      },
      {
        id: 'p8', level: 1, type: 'ox', concept: 3,
        q: '$\\dfrac{d^2y}{dx^2}$는 $\\left(\\dfrac{dy}{dx}\\right)^2$과 같습니다.',
        answer: false,
        explain: '$\\dfrac{d^2y}{dx^2}$는 $y$를 $x$에 대하여 두 번 미분한 이계도함수입니다. 예를 들어 $y=x^2$이면 $\\dfrac{d^2y}{dx^2}=2$이지만 $\\left(\\dfrac{dy}{dx}\\right)^2=4x^2$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 1,
        q: '곡선 $xy+y^2=6$ 위의 점 $(1, 2)$에서 $\\dfrac{dy}{dx}$의 값을 구하십시오.',
        answer: '-2/5',
        hint: '$xy$는 곱의 미분법으로 미분합니다.',
        wrong: [
          { a: '-1/2', why: '$xy$를 미분할 때 $x\\dfrac{dy}{dx}$ 항을 빠뜨렸습니다. $\\dfrac{d}{dx}(xy)=y+x\\dfrac{dy}{dx}$입니다.' },
          { a: '2/5', why: '이항할 때 부호를 바꾸지 않았습니다.' },
        ],
        explain: '양변을 $x$에 대하여 미분하면 $y+x\\dfrac{dy}{dx}+2y\\dfrac{dy}{dx}=0$이므로 $\\dfrac{dy}{dx}=-\\dfrac{y}{x+2y}$입니다. 점 $(1, 2)$에서 $-\\dfrac{2}{5}$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 0,
        q: '$x=t^3+t$, $y=t^4+3t$로 나타낸 곡선 위의 점 $(2, 4)$에서 $\\dfrac{dy}{dx}$의 값을 구하십시오.',
        answer: '7/4',
        hint: '점 $(2, 4)$에 대응하는 $t$의 값을 먼저 찾습니다.',
        wrong: [
          { a: '4/7', why: '분자와 분모를 바꾸어 $\\dfrac{dx/dt}{dy/dt}$를 계산했습니다.' },
          { a: '35/13', why: '$t$ 대신 점의 $x$좌표 2를 $t$에 대입했습니다. 먼저 점 $(2, 4)$에 대응하는 $t$의 값을 구합니다.' },
        ],
        explain: '$t^3+t=2$, $t^4+3t=4$를 함께 만족시키는 값은 $t=1$입니다. $\\dfrac{dx}{dt}=3t^2+1$, $\\dfrac{dy}{dt}=4t^3+3$이므로 $t=1$에서 $\\dfrac{dy}{dx}=\\dfrac{7}{4}$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 2,
        q: '함수 $f(x)=x+e^{x-1}$의 역함수를 $g(x)$라 할 때, $\\lim_{h \\to 0}\\dfrac{g(2+h)-g(2)}{h}$의 값을 구하십시오.',
        answer: '1/2',
        hint: '주어진 극한은 $g\'(2)$입니다. $f(a)=2$인 $a$를 찾아봅니다.',
        wrong: [
          { a: '2', why: '$f\'(1)=2$까지 구하고 역수를 취하지 않았습니다.' },
        ],
        explain: '주어진 극한은 $g\'(2)$입니다. $f(1)=1+e^0=2$이고 $f\'(x)=1+e^{x-1}$이므로 $f\'(1)=2$입니다. 따라서 $g\'(2)=\\dfrac{1}{f\'(1)}=\\dfrac{1}{2}$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 3,
        q: '함수 $f(x)=x^2\\ln x$에 대하여 $f\'\'(1)$의 값을 구하십시오.',
        answer: '3',
        hint: '곱의 미분법을 두 번 씁니다.',
        wrong: [
          { a: '1', why: '$f\'(1)$을 구했습니다. 한 번 더 미분해야 합니다.' },
          { a: '2', why: '$f\'(x)=2x\\ln x+x$에서 $x$ 항의 도함수 1을 빠뜨렸습니다.' },
        ],
        explain: '$f\'(x)=2x\\ln x+x^2\\cdot\\dfrac{1}{x}=2x\\ln x+x$이고, $f\'\'(x)=2\\ln x+2x\\cdot\\dfrac{1}{x}+1=2\\ln x+3$입니다. 따라서 $f\'\'(1)=3$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'set', concept: 0,
        q: '$x=t^2-1$, $y=t^3-3t$로 나타낸 곡선에서 $\\dfrac{dy}{dx}=0$이 되는 $t$의 값을 모두 구하십시오.',
        answer: ['1', '-1'],
        hint: '$\\dfrac{dy}{dt}=0$이면서 $\\dfrac{dx}{dt} \\ne 0$인 $t$를 찾습니다.',
        wrong: [
          { a: ['1'], why: '$3t^2-3=0$의 근은 두 개입니다. $t=-1$도 있습니다.' },
          { a: ['0'], why: '$\\dfrac{dx}{dt}=0$이 되는 값입니다. 이때는 $\\dfrac{dy}{dx}$가 정의되지 않습니다.' },
        ],
        explain: '$\\dfrac{dx}{dt}=2t$, $\\dfrac{dy}{dt}=3t^2-3$이므로 $\\dfrac{dy}{dx}=\\dfrac{3t^2-3}{2t}$입니다. 분자가 0이 되는 $t=1$, $t=-1$에서 분모는 각각 $2$, $-2$로 0이 아니므로 $t=1$ 또는 $t=-1$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 1,
        q: '곡선 $x^3+y^3=9xy$ 위의 점 $(2, 4)$에서 $\\dfrac{dy}{dx}$의 값을 구하십시오.',
        answer: '4/5',
        hint: '오른쪽 $9xy$는 곱의 미분법으로 미분합니다.',
        wrong: [
          { a: '1/2', why: '$9xy$를 미분할 때 $9x\\dfrac{dy}{dx}$ 항을 빠뜨렸습니다.' },
          { a: '-4/5', why: '이항할 때 부호를 잘못 옮겼습니다. 식을 다시 정리해 보십시오.' },
        ],
        explain: '양변을 $x$에 대하여 미분하면 $3x^2+3y^2\\dfrac{dy}{dx}=9y+9x\\dfrac{dy}{dx}$입니다. 정리하면 $(3y^2-9x)\\dfrac{dy}{dx}=9y-3x^2$이므로 $\\dfrac{dy}{dx}=\\dfrac{3y-x^2}{y^2-3x}$입니다.\n\n점 $(2, 4)$에서 $\\dfrac{12-4}{16-6}=\\dfrac{8}{10}=\\dfrac{4}{5}$입니다. (확인: $8+64=72=9\\cdot 2\\cdot 4$이므로 점은 곡선 위에 있습니다.)',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 2,
        q: '함수 $f(x)=x^3+x$의 역함수를 $g(x)$라 할 때, $\\lim_{x \\to 2}\\dfrac{g(x)-1}{x-2}$의 값을 구하십시오.',
        answer: '1/4',
        hint: '$g(2)$의 값을 먼저 구하면 극한이 미분계수의 꼴임을 알 수 있습니다.',
        wrong: [
          { a: '1/13', why: '$f\'(2)$에 넣었습니다. $g(2)=1$, 곧 $f(1)=2$이므로 $f\'(1)$의 역수를 구합니다.' },
          { a: '4', why: '$f\'(1)=4$까지 구하고 역수를 취하지 않았습니다.' },
        ],
        explain: '$f(1)=2$이므로 $g(2)=1$입니다. 따라서 주어진 극한은 $\\lim_{x \\to 2}\\dfrac{g(x)-g(2)}{x-2}=g\'(2)$입니다.\n\n$f\'(x)=3x^2+1$이므로 $g\'(2)=\\dfrac{1}{f\'(1)}=\\dfrac{1}{4}$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 3,
        q: '함수 $f(x)=\\sin 2x$가 모든 실수 $x$에 대하여 $f\'\'(x)+kf(x)=0$을 만족시킬 때, 상수 $k$의 값을 구하십시오.',
        answer: '4',
        hint: '$f\'\'(x)$를 $f(x)$로 나타내 봅니다.',
        wrong: [
          { a: '2', why: '두 번 미분하는 동안 속 함수의 도함수 2를 한 번만 곱했습니다.' },
          { a: '-4', why: '$f\'\'(x)=-4f(x)$에서 부호를 잘못 옮겼습니다. $f\'\'(x)+4f(x)=0$입니다.' },
        ],
        explain: '$f\'(x)=2\\cos 2x$, $f\'\'(x)=-4\\sin 2x=-4f(x)$입니다. 따라서 $f\'\'(x)+4f(x)=0$이 모든 $x$에서 성립하므로 $k=4$입니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 0,
        q: '$x=2\\cos t$, $y=3\\sin t$ $\\left(0<t<\\dfrac{\\pi}{2}\\right)$로 나타낸 곡선 위의 점에서 $\\dfrac{dy}{dx}=-\\dfrac{3}{2}$일 때, 그 점의 좌표는 어느 것입니까?',
        choices: ['$\\left(\\sqrt{3}, \\dfrac{3}{2}\\right)$', '$\\left(\\sqrt{2}, \\dfrac{3\\sqrt{2}}{2}\\right)$', '$\\left(1, \\dfrac{3\\sqrt{3}}{2}\\right)$', '$\\left(\\dfrac{3\\sqrt{2}}{2}, \\sqrt{2}\\right)$'],
        answer: 1,
        why: [
          '$t=\\dfrac{\\pi}{6}$인 점입니다. 이때 $\\dfrac{dy}{dx}=-\\dfrac{3}{2}\\cot\\dfrac{\\pi}{6}=-\\dfrac{3\\sqrt{3}}{2}$입니다.',
          '',
          '$t=\\dfrac{\\pi}{3}$인 점입니다. 이때 $\\dfrac{dy}{dx}=-\\dfrac{3}{2}\\cot\\dfrac{\\pi}{3}=-\\dfrac{\\sqrt{3}}{2}$입니다.',
          '$x$좌표와 $y$좌표를 바꾸어 썼습니다. $x=2\\cos t$, $y=3\\sin t$입니다.',
        ],
        hint: '$\\dfrac{dy}{dx}$를 $t$로 나타낸 뒤 $\\cot t$의 값을 구합니다.',
        explain: '$\\dfrac{dy}{dx}=\\dfrac{3\\cos t}{-2\\sin t}=-\\dfrac{3}{2}\\cot t$입니다. 이 값이 $-\\dfrac{3}{2}$이면 $\\cot t=1$이고, $0<t<\\dfrac{\\pi}{2}$이므로 $t=\\dfrac{\\pi}{4}$입니다.\n\n그 점은 $\\left(2\\cos\\dfrac{\\pi}{4}, 3\\sin\\dfrac{\\pi}{4}\\right)=\\left(\\sqrt{2}, \\dfrac{3\\sqrt{2}}{2}\\right)$입니다.',
      },
    ],

    deeper: [
      {
        title: '원은 함수가 아닌데 왜 미분할 수 있을까?',
        body: '원 $x^2+y^2=25$는 $x=3$ 하나에 $y=4$와 $y=-4$ 두 값이 대응하므로 전체로는 함수가 아닙니다. 하지만 점 $(3, 4)$ **근처만** 보면 원은 위쪽 반원 $y=\\sqrt{25-x^2}$이고, 이것은 미분가능한 함수입니다.\n\n음함수의 미분은 이렇게 "그 점 근처에서 $y$를 $x$의 함수로 볼 수 있다"는 사실에 기대고 있습니다. 실제로 $\\sqrt{25-x^2}$을 직접 미분하면 $\\dfrac{-x}{\\sqrt{25-x^2}}=-\\dfrac{x}{y}$로, 음함수의 미분으로 얻은 결과와 같습니다.\n\n반대로 점 $(5, 0)$ 근처에서는 위아래 두 갈래가 만나므로 $y$를 $x$의 함수로 볼 수 없고, 실제로 $-\\dfrac{x}{y}$의 분모가 0이 됩니다. 이곳에서는 접선이 세로선입니다. 대학 미적분학에서는 이런 조건을 **음함수 정리**로 정확히 다룹니다.',
      },
      {
        title: '굴러가는 바퀴 위의 점 — 사이클로이드',
        body: '반지름이 1인 바퀴가 $x$축 위를 미끄러지지 않고 굴러갈 때, 바퀴 둘레의 한 점이 그리는 곡선을 **사이클로이드**라고 합니다. 바퀴가 각 $t$만큼 돌았을 때 그 점의 위치는\n\n$x=t-\\sin t$, $y=1-\\cos t$\n\n로 나타납니다. 이 곡선은 $y$를 $x$의 식으로 나타내기 어렵지만, 매개변수 미분으로 기울기를 쉽게 구할 수 있습니다.\n\n$\\dfrac{dy}{dx}=\\dfrac{\\sin t}{1-\\cos t}$\n\n$t$가 $2\\pi$의 배수에 가까워지면(점이 바닥에 닿는 순간) 분모가 0에 가까워져 곡선이 뾰족해집니다. 사이클로이드는 "가장 빨리 미끄러져 내려가는 길"로도 유명합니다.',
      },
    ],

    faq: [
      {
        q: '매개변수로 나타낸 함수에서 $\\dfrac{dx}{dt}=0$이면 어떻게 돼요?',
        a: '그 점에서는 $\\dfrac{dy}{dx}=\\dfrac{dy/dt}{dx/dt}$를 계산할 수 없습니다. 이때 $\\dfrac{dy}{dt} \\ne 0$이면 점이 그 순간 위아래로만 움직이므로 접선이 $y$축에 평행합니다. 예를 들어 원 $x=\\cos t$, $y=\\sin t$에서 $t=0$인 점 $(1, 0)$의 접선은 세로선 $x=1$입니다.',
      },
      {
        q: '음함수를 미분했더니 답에 $y$가 남아요. 틀린 건가요?',
        a: '아닙니다. 음함수의 미분 결과는 보통 $-\\dfrac{x}{y}$처럼 $x$와 $y$로 나타납니다. 특정한 점에서의 기울기를 구할 때 그 점의 $x$좌표와 $y$좌표를 함께 대입하면 됩니다.',
      },
      {
        q: '역함수의 미분계수를 구할 때 역함수의 식을 꼭 구해야 하나요?',
        a: '구하지 않아도 됩니다. $f(a)=b$인 $a$만 찾으면 $g\'(b)=\\dfrac{1}{f\'(a)}$입니다. $f(x)=x^3+x$처럼 역함수의 식을 구하기 어려운 함수에서 특히 쓸모가 있습니다.',
      },
      {
        q: '$\\dfrac{d^2y}{dx^2}$에서 2는 왜 위치가 달라요?',
        a: '$\\dfrac{d}{dx}\\left(\\dfrac{dy}{dx}\\right)$를 줄여 쓴 것이라서, 분자 쪽에는 $d$가 두 번($d^2$), 분모 쪽에는 $dx$가 두 번($dx^2$) 나오는 것처럼 적습니다. 분수의 제곱이 아니라 "두 번 미분"을 나타내는 약속입니다.',
      },
    ],

    mistakes: [
      '매개변수로 나타낸 함수에서 $\\dfrac{dx/dt}{dy/dt}$처럼 분자와 분모를 바꾸는 실수 — 기울기는 $\\dfrac{dy}{dx}$이므로 $y$의 변화율이 분자입니다.',
      '음함수를 미분할 때 $y^2$을 $2y$로만 미분하는 실수 — $y$는 $x$의 함수이므로 $2y\\dfrac{dy}{dx}$입니다. $xy$는 곱의 미분법으로 $y+x\\dfrac{dy}{dx}$입니다.',
      '역함수의 미분계수 $g\'(b)$를 $\\dfrac{1}{f\'(b)}$로 계산하는 실수 — $f(a)=b$인 $a$를 찾아 $\\dfrac{1}{f\'(a)}$을 구합니다.',
    ],

    gens: [
      {
        id: 'param-slope',
        level: 1,
        title: '매개변수로 나타낸 함수의 미분계수',
        make: function (R) {
          var q, xt, yt, dx, dy, t0, xtTex, ytTex, dxTex, dyTex;
          for (var tr = 0; tr < 60; tr++) {
            var qq = R.int(-3, 3), s = R.int(-4, 4);
            if (R.bool()) {
              // x = t^2 + q t,  y = t^3 + s t
              t0 = R.pick([-2, -1, 1, 2]);
              xtTex = 't^2' + termStr(qq, 't');
              ytTex = 't^3' + termStr(s, 't');
              dxTex = '2t' + (qq === 0 ? '' : R.fmt.signed(qq));
              dyTex = '3t^2' + (s === 0 ? '' : R.fmt.signed(s));
              dx = R.F(2 * t0 + qq);
              dy = R.F(3 * t0 * t0 + s);
            } else {
              // x = ln t + q t,  y = t^2 + s t  (t > 0)
              if (qq === 0) qq = 1;
              t0 = R.pick([1, 2]);
              xtTex = '\\ln t' + termStr(qq, 't');
              ytTex = 't^2' + termStr(s, 't');
              dxTex = '\\dfrac{1}{t}' + R.fmt.signed(qq);
              dyTex = '2t' + (s === 0 ? '' : R.fmt.signed(s));
              dx = R.F(1, t0).add(qq);
              dy = R.F(2 * t0 + s);
            }
            if (dx.isZero() || dy.isZero()) continue;
            break;
          }
          var ans = dy.div(dx);
          var wrongs = cleanWrong(R, ans, [
            { a: dx.div(dy), why: '분자와 분모를 바꾸어 $\\dfrac{dx/dt}{dy/dt}$를 계산했습니다.' },
            { a: dx.mul(dy), why: '$\\dfrac{dy}{dt}$와 $\\dfrac{dx}{dt}$를 곱했습니다. 나누어야 합니다.' },
            { a: dy, why: '$\\dfrac{dy}{dt}$만 구했습니다. $\\dfrac{dx}{dt}$로 나누어야 합니다.' },
          ]);
          q = '매개변수 $t$로 나타낸 함수 $x=' + xtTex + '$, $y=' + ytTex + '$에서 $t=' + t0 + '$일 때 $\\dfrac{dy}{dx}$의 값을 구하십시오.';
          return {
            type: 'short', check: 'number', concept: 0,
            q: q,
            answer: ans.toString(),
            wrong: wrongs,
            explain: '$\\dfrac{dx}{dt}=' + dxTex + '$, $\\dfrac{dy}{dt}=' + dyTex + '$입니다.\n\n' +
              '$t=' + t0 + '$에서 $\\dfrac{dx}{dt}=' + tex(R, dx) + '$, $\\dfrac{dy}{dt}=' + tex(R, dy) + '$이므로 $\\dfrac{dy}{dx}=' + tex(R, ans) + '$입니다.',
          };
        },
      },
      {
        id: 'implicit-slope',
        level: 2,
        title: '음함수의 미분으로 기울기 구하기',
        make: function (R) {
          var k, x0, y0, num, den;
          for (var tr = 0; tr < 80; tr++) {
            k = R.pick([-3, -1, 1, 3]);
            x0 = R.nonzero(-3, 3);
            y0 = R.nonzero(-3, 3);
            num = 2 * x0 + k * y0;
            den = k * x0 + 2 * y0;
            var C0 = x0 * x0 + k * x0 * y0 + y0 * y0;
            // x0 = y0 이면 기울기가 늘 -1, x0 = -y0 이면 늘 1 이 되므로 뺀다
            if (num === 0 || den === 0 || C0 <= 0 || x0 === y0 || x0 === -y0) continue;
            break;
          }
          var C = x0 * x0 + k * x0 * y0 + y0 * y0;
          var curve = 'x^2' + termStr(k, 'xy') + '+y^2=' + C;
          var ans = R.F(-num, den);
          var wrongs = cleanWrong(R, ans, [
            { a: safeF(R, -num, 2 * y0), why: '$' + termStr(k, 'xy', true) + '$' + R.josa('xy', '을/를') + ' 미분할 때 곱의 미분법에서 $' + termStr(k, 'x', true) + '\\dfrac{dy}{dx}$ 항을 빠뜨렸습니다.' },
            { a: R.F(num, den), why: '이항할 때 부호를 바꾸지 않았습니다.' },
            { a: safeF(R, -den, num), why: '분자와 분모를 바꾸어 정리했습니다. $\\dfrac{dy}{dx}$가 붙은 항을 한쪽으로 모아 다시 정리해 보십시오.' },
            { a: safeF(R, -x0, y0), why: '$' + termStr(k, 'xy', true) + '$ 항을 미분하지 않고 빠뜨렸습니다.' },
          ]);
          return {
            type: 'short', check: 'number', concept: 1,
            q: '곡선 $' + curve + '$ 위의 점 $(' + x0 + ', ' + y0 + ')$에서 $\\dfrac{dy}{dx}$의 값을 구하십시오.',
            answer: ans.toString(),
            wrong: wrongs,
            hint: '$xy$ 항은 곱의 미분법으로, $y^2$ 항은 합성함수의 미분법으로 미분합니다.',
            explain: '양변을 $x$에 대하여 미분하면 $2x' + termStr(k, 'y') + termStr(k, 'x') + '\\dfrac{dy}{dx}+2y\\dfrac{dy}{dx}=0$입니다.\n\n' +
              '정리하면 $\\dfrac{dy}{dx}=-\\dfrac{2x' + termStr(k, 'y') + '}{' + termStr(k, 'x', true) + '+2y}$입니다.\n\n' +
              '점 $(' + x0 + ', ' + y0 + ')$에서 분자는 $2x' + termStr(k, 'y') + '=' + num + '$, 분모는 $' + termStr(k, 'x', true) + '+2y=' + den + '$이므로 $\\dfrac{dy}{dx}=' + tex(R, ans) + '$입니다.',
          };
        },
      },
      {
        id: 'inverse-deriv',
        level: 2,
        title: '역함수의 미분계수',
        make: function (R) {
          var q, ans, wrongs, explain;
          if (R.int(0, 2) > 0) {
            // f(x) = x^3 + p x + c  (p > 0 이면 증가함수)
            var p = R.int(1, 4), c = R.int(-3, 3), a = R.int(-1, 2);
            var b = a * a * a + p * a + c;
            var fTex = 'x^3' + termStr(p, 'x') + (c === 0 ? '' : R.fmt.signed(c));
            var fpa = 3 * a * a + p;
            ans = R.F(1, fpa);
            wrongs = [
              { a: R.F(1, 3 * b * b + p), why: '$f\'(' + b + ')$에 넣었습니다. $f(' + a + ')=' + b + '$이므로 $f\'(' + a + ')$의 역수를 구합니다.' },
              { a: R.F(fpa), why: '$f\'(' + a + ')=' + fpa + '$까지 구하고 역수를 취하지 않았습니다.' },
              { a: R.F(-1, fpa), why: '역함수의 미분계수에는 마이너스가 붙지 않습니다. $g\'(b)=\\dfrac{1}{f\'(a)}$입니다.' },
            ];
            q = '함수 $f(x)=' + fTex + '$의 역함수를 $g(x)$라 할 때, $g\'(' + b + ')$의 값을 구하십시오.';
            explain = '$f(a)=' + b + '$인 $a$를 찾으면 $a=' + a + '$입니다. ($f\'(x)=3x^2' + R.fmt.signed(p) + '>0$이므로 $f(x)$는 증가함수이고, 이런 $a$는 하나뿐입니다.)\n\n' +
              '$f\'(' + a + ')=' + fpa + '$이므로 $g\'(' + b + ')=\\dfrac{1}{f\'(' + a + ')}=' + tex(R, ans) + '$입니다.';
          } else {
            // f(x) = e^{kx} + p x,  f(0) = 1
            var k = R.int(1, 3), p2 = R.int(1, 4);
            var eTex = k === 1 ? 'e^{x}' : 'e^{' + k + 'x}';
            ans = R.F(1, k + p2);
            wrongs = [
              { a: R.F(k + p2), why: '$f\'(0)=' + (k + p2) + '$까지 구하고 역수를 취하지 않았습니다.' },
              { a: R.F(1, 1 + p2), why: '$' + eTex + '$' + '을 미분할 때 속 함수의 도함수 ' + k + R.josa(k, '을/를') + ' 곱하지 않았습니다.' },
            ];
            q = '함수 $f(x)=' + eTex + termStr(p2, 'x') + '$의 역함수를 $g(x)$라 할 때, $g\'(1)$의 값을 구하십시오.';
            explain = '$f(0)=e^0+0=1$이므로 $g(1)=0$입니다.\n\n' +
              '$f\'(x)=' + (k === 1 ? '' : k) + eTex + R.fmt.signed(p2) + '$이므로 $f\'(0)=' + (k + p2) + '$이고, $g\'(1)=\\dfrac{1}{f\'(0)}=' + tex(R, ans) + '$입니다.';
          }
          return {
            type: 'short', check: 'number', concept: 2,
            q: q,
            answer: ans.toString(),
            wrong: cleanWrong(R, ans, wrongs),
            hint: '$f(a)=b$이면 $g\'(b)=\\dfrac{1}{f\'(a)}$입니다.',
            explain: explain,
          };
        },
      },
      {
        id: 'second-deriv',
        level: 1,
        title: '이계도함수의 값',
        make: function (R) {
          var kind = R.int(0, 2), q, ans, wrongs, explain;
          if (kind === 0) {
            var a = R.nonzero(-3, 3), b = R.int(-4, 4), c = R.int(-5, 5), x0 = R.int(-2, 2);
            var coeffs = [a, b, c, 0];
            ans = R.F(6 * a * x0 + 2 * b);
            var f1 = 3 * a * x0 * x0 + 2 * b * x0 + c;
            wrongs = [
              { a: R.F(f1), why: '$f\'(' + x0 + ')$' + R.josa(x0, '을/를') + ' 구했습니다. 한 번 더 미분해야 합니다.' },
              { a: R.F(6 * a * x0), why: '$f\'(x)$의 $' + (2 * b) + 'x$ 항을 다시 미분하는 것을 빠뜨렸습니다.' },
              { a: R.F(6 * a), why: '세 번 미분했습니다.' },
            ];
            q = '함수 $f(x)=' + R.fmt.poly(coeffs) + '$에 대하여 $f\'\'(' + x0 + ')$의 값을 구하십시오.';
            explain = '$f\'(x)=' + R.fmt.poly([3 * a, 2 * b, c]) + '$, $f\'\'(x)=' + R.fmt.poly([6 * a, 2 * b]) + '$이므로 $f\'\'(' + x0 + ')=' + ans.toString() + '$입니다.';
          } else if (kind === 1) {
            // f(x) = x e^{kx},  f''(x) = (k^2 x + 2k) e^{kx},  f''(0) = 2k
            var k = R.nonzero(-3, 3);
            var eTex = k === 1 ? 'e^{x}' : k === -1 ? 'e^{-x}' : 'e^{' + k + 'x}';
            ans = R.F(2 * k);
            wrongs = [
              { a: R.F(1), why: '$f\'(0)$을 구했습니다. 한 번 더 미분해야 합니다.' },
              { a: R.F(k * k), why: '곱의 미분법을 쓰지 않고 $' + eTex + '$만 두 번 미분했습니다. $f(x)$는 $x$와 $' + eTex + '$의 곱이므로 $f\'\'(x)=(' + termStr(k * k, 'x', true) + R.fmt.signed(2 * k) + ')' + eTex + '$입니다.' },
              { a: R.F(k), why: '두 번째로 미분할 때 곱의 미분법의 한 항을 빠뜨렸습니다.' },
            ];
            q = '함수 $f(x)=x' + eTex + '$에 대하여 $f\'\'(0)$의 값을 구하십시오.';
            explain = '$f\'(x)=' + eTex + '+x\\cdot' + R.fmt.paren(k) + eTex + '=(1' + termStr(k, 'x') + ')' + eTex + '$입니다.\n\n' +
              '$f\'\'(x)=' + R.fmt.paren(k) + eTex + '+(1' + termStr(k, 'x') + ')\\cdot' + R.fmt.paren(k) + eTex + '=(' + termStr(k * k, 'x', true) + R.fmt.signed(2 * k) + ')' + eTex + '$이므로 $f\'\'(0)=' + (2 * k) + '$입니다.';
          } else {
            // f(x) = cos kx,  f''(0) = -k^2
            var k2 = R.int(2, 5);
            ans = R.F(-k2 * k2);
            wrongs = [
              { a: R.F(k2 * k2), why: '$(\\cos u)\'=-\\sin u$, $(\\sin u)\'=\\cos u$를 따라가면 부호가 한 번 바뀝니다. 마이너스를 빠뜨렸습니다.' },
              { a: R.F(-k2), why: '속 함수의 도함수 ' + k2 + R.josa(k2, '을/를') + ' 한 번만 곱했습니다. 두 번 미분하므로 두 번 곱합니다.' },
              { a: R.F(-1), why: '속 함수 $' + k2 + 'x$의 도함수를 곱하지 않았습니다.' },
            ];
            q = '함수 $f(x)=\\cos ' + k2 + 'x$에 대하여 $f\'\'(0)$의 값을 구하십시오.';
            explain = '$f\'(x)=-' + k2 + '\\sin ' + k2 + 'x$, $f\'\'(x)=-' + (k2 * k2) + '\\cos ' + k2 + 'x$이므로 $f\'\'(0)=-' + (k2 * k2) + '$입니다.';
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
    ],
  });
})();
