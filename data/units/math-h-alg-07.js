/* 대수 · 삼각함수의 뜻과 성질
 * 원 위의 점(동경)으로 정의한 sinθ·cosθ·tanθ, 단위원과 값의 범위, 사분면에 따른 부호,
 * 삼각함수 사이의 관계(tanθ=sinθ/cosθ, sin²θ+cos²θ=1)와 그 활용, 특수한 각의 삼각함수 값을 다룬다. */
(function () {
  // 피타고라스 수 [a, b, c] (a²+b²=c²)
  var TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [6, 8, 10], [9, 40, 41]];
  var QUAD = ['제1사분면', '제2사분면', '제3사분면', '제4사분면'];
  var QSIGN = [[1, 1], [-1, 1], [-1, -1], [1, -1]];           // 사분면마다 [cos 부호, sin 부호]
  // Frac → TeX (분수는 \frac, 음수 부호 앞)
  function ft(f) { return f.toTex(); }

  // 특수한 각: 값 열쇠 → TeX
  var VAL = {
    '0': '0', '1': '1', 'h': '\\frac{1}{2}', 'r2': '\\frac{\\sqrt{2}}{2}', 'r3': '\\frac{\\sqrt{3}}{2}',
    't1': '\\frac{\\sqrt{3}}{3}', 't3': '\\sqrt{3}',
  };
  function valTex(k) {
    if (k === 'none') return '정의되지 않는다';
    var neg = k.charAt(0) === '-', b = neg ? k.slice(1) : k;
    return '$' + (neg ? '-' : '') + VAL[b] + '$';
  }
  function neg(k) { return k === '0' || k === 'none' ? k : k.charAt(0) === '-' ? k.slice(1) : '-' + k; }
  var BASE_COS = { 0: '1', 30: 'r3', 45: 'r2', 60: 'h', 90: '0' };
  var BASE_SIN = { 0: '0', 30: 'h', 45: 'r2', 60: 'r3', 90: '1' };
  var BASE_TAN = { 0: '0', 30: 't1', 45: '1', 60: 't3' };
  // 0 ≤ d < 360 (특수한 각) → { cos, sin, tan, ref } 값 열쇠
  function special(d) {
    var ref = d <= 90 ? d : d <= 180 ? 180 - d : d <= 270 ? d - 180 : 360 - d;
    var cs = d > 90 && d < 270 ? -1 : 1, ss = d > 180 ? -1 : 1;
    var c = BASE_COS[ref], s = BASE_SIN[ref];
    if (cs < 0) c = neg(c);
    if (ss < 0) s = neg(s);
    var t = ref === 90 ? 'none' : BASE_TAN[ref];
    if (t !== 'none' && cs * ss < 0) t = neg(t);
    return { cos: c, sin: s, tan: t, ref: ref };
  }
  // 도 → 라디안 TeX
  function radTex(d) {
    if (d === 0) return '0';
    var f = TutorMath.F(d, 180), a = Math.abs(f.num), top = (a === 1 ? '' : a) + '\\pi';
    return (f.num < 0 ? '-' : '') + (f.den === 1 ? top : '\\frac{' + top + '}{' + f.den + '}');
  }

  Tutor.registerUnit({
    id: 'math-h-alg-07',
    course: 'math-h-alg',
    title: '삼각함수의 뜻과 성질',
    summary: '원 위의 점의 좌표로 사인·코사인·탄젠트 함수를 정의하고, 삼각함수 사이의 관계를 알아봅니다.',
    goals: [
      '동경 위의 점의 좌표로 삼각함수의 값을 구할 수 있다.',
      '각이 속한 사분면에 따라 삼각함수 값의 부호를 정할 수 있다.',
      '$\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$, $\\sin^{2}\\theta+\\cos^{2}\\theta=1$을 이해하고 활용할 수 있다.',
      '$\\frac{\\pi}{6}$, $\\frac{\\pi}{4}$, $\\frac{\\pi}{3}$ 등 특수한 각의 삼각함수 값을 구할 수 있다.',
    ],
    standards: ['[12대수02-02]'],

    concepts: [
      {
        title: '원 위의 점으로 정의한 삼각함수',
        body: '좌표평면에서 원점 O를 중심으로 하고 반지름의 길이가 $r$인 원 위의 점 $P(x, y)$에 대하여, 동경 OP가 나타내는 각의 크기를 $\\theta$라고 할 때\n\n$\\sin\\theta=\\frac{y}{r}$, $\\cos\\theta=\\frac{x}{r}$, $\\tan\\theta=\\frac{y}{x}$ (단, $x\\ne 0$)\n\n로 정의합니다. 이 값들은 원의 크기와 관계없이 $\\theta$만으로 정해지므로(닮은 삼각형) 모두 $\\theta$의 함수입니다. 이 함수들을 **사인함수**, **코사인함수**, **탄젠트함수**라 하고, 통틀어 **삼각함수**라고 합니다.\n\n예: 동경 OP 위의 점이 $P(-3, 4)$이면 $r=\\sqrt{(-3)^{2}+4^{2}}=5$이므로\n\n$\\sin\\theta=\\frac{4}{5}$, $\\cos\\theta=-\\frac{3}{5}$, $\\tan\\theta=\\frac{4}{-3}=-\\frac{4}{3}$\n\n> 💡 중학교의 삼각비를 모든 각으로 넓힌 것입니다. $\\theta$가 예각이면 삼각비와 같고, 점의 좌표가 음수가 될 수 있으므로 삼각함수의 값도 음수가 될 수 있습니다.',
        easy: '원 위를 도는 점 P를 떠올려 보십시오.\n\n- 사인 = (점의 높이 $y$) ÷ (반지름 $r$)\n- 코사인 = (점이 옆으로 간 거리 $x$) ÷ (반지름 $r$)\n- 탄젠트 = (높이 $y$) ÷ (옆 거리 $x$)\n\n점이 원점보다 왼쪽에 있으면 $x$가 음수, 아래에 있으면 $y$가 음수이므로 값에 $-$가 붙습니다. 반지름 $r$은 길이라서 항상 양수입니다.',
        fig: {
          type: 'coord', xmin: -6, xmax: 6, ymin: -6, ymax: 6,
          fns: [{ expr: 'sqrt(25-x^2)' }, { expr: '-sqrt(25-x^2)' }],
          points: [{ x: -3, y: 4, label: 'P(-3, 4)' }],
          segments: [{ from: [0, 0], to: [-3, 4] }, { from: [-3, 4], to: [-3, 0], dashed: true }],
          alt: '원점이 중심이고 반지름이 5인 원과 원 위의 점 P(-3, 4). 선분 OP와 P에서 x축에 내린 점선',
        },
        check: {
          type: 'short', check: 'number',
          q: '원점 O와 점 $P(3, -4)$에 대하여 동경 OP가 나타내는 각의 크기를 $\\theta$라고 할 때, $\\cos\\theta$의 값을 구하십시오.',
          answer: '3/5',
          wrong: [
            { a: '-4/5', why: '$\\sin\\theta=\\frac{y}{r}$를 구했습니다. 코사인은 $x$좌표를 씁니다: $\\cos\\theta=\\frac{x}{r}$' },
            { a: '-3/4', why: '$\\frac{x}{y}$를 구했습니다. 코사인의 분모는 반지름 $r=5$입니다.' },
          ],
          explain: '$r=\\sqrt{3^{2}+(-4)^{2}}=5$이므로 $\\cos\\theta=\\frac{x}{r}=\\frac{3}{5}$입니다.',
        },
      },
      {
        title: '단위원과 삼각함수 값의 범위',
        body: '반지름의 길이가 1인 원을 **단위원**이라고 합니다. 단위원에서는 $r=1$이므로 동경과 단위원의 교점이\n\n$P(\\cos\\theta, \\sin\\theta)$\n\n입니다. 곧 **$\\cos\\theta$는 $x$좌표, $\\sin\\theta$는 $y$좌표**이고, $\\tan\\theta=\\frac{y}{x}$는 동경 OP의 **기울기**입니다.\n\n점 P는 단위원 위에 있으므로 좌표가 $-1$과 $1$ 사이에 있습니다.\n\n$-1\\le\\sin\\theta\\le 1$, $-1\\le\\cos\\theta\\le 1$, $\\tan\\theta$는 모든 실수 값\n\n좌표축 위의 점으로 바로 구할 수 있는 값\n\n| $\\theta$ | $0$ | $\\frac{\\pi}{2}$ | $\\pi$ | $\\frac{3\\pi}{2}$ |\n|---|---|---|---|---|\n| 점 P | $(1, 0)$ | $(0, 1)$ | $(-1, 0)$ | $(0, -1)$ |\n| $\\sin\\theta$ | 0 | 1 | 0 | $-1$ |\n| $\\cos\\theta$ | 1 | 0 | $-1$ | 0 |\n| $\\tan\\theta$ | 0 | 없음 | 0 | 없음 |\n\n> ⚠️ $\\theta=\\frac{\\pi}{2}$, $\\frac{3\\pi}{2}$처럼 $x=0$이 되는 각에서는 $\\tan\\theta$가 정의되지 않습니다(0으로 나눌 수 없습니다).',
        easy: '단위원에서는 반지름으로 나눌 필요가 없어 가장 간단합니다. 점 P의 좌표가 그대로 (코사인, 사인)입니다.\n\n그래서 "코사인은 가로, 사인은 세로"라고 기억하면 됩니다. 점이 원 밖으로 나갈 수 없으니 가로·세로 좌표는 $-1$보다 작거나 $1$보다 클 수 없습니다.',
        fig: {
          type: 'coord', xmin: -1.5, xmax: 1.5, ymin: -1.5, ymax: 1.5,
          fns: [{ expr: 'sqrt(1-x^2)' }, { expr: '-sqrt(1-x^2)' }],
          points: [{ x: 0.643, y: 0.766, label: 'P(cosθ, sinθ)' }],
          segments: [{ from: [0, 0], to: [0.643, 0.766] }, { from: [0.643, 0.766], to: [0.643, 0], dashed: true }],
          alt: '단위원과 동경 OP. 점 P의 x좌표가 cosθ, y좌표가 sinθ',
        },
        check: {
          type: 'ox',
          q: '$\\sin\\theta=1.2$를 만족하는 각 $\\theta$가 있습니다.',
          answer: false,
          explain: '$\\sin\\theta$는 단위원 위의 점의 $y$좌표이므로 $-1\\le\\sin\\theta\\le 1$입니다. 1.2는 1보다 크므로 이런 $\\theta$는 없습니다.',
        },
      },
      {
        title: '사분면에 따른 삼각함수 값의 부호',
        body: '$r>0$이므로 $\\sin\\theta=\\frac{y}{r}$의 부호는 $y$의 부호, $\\cos\\theta=\\frac{x}{r}$의 부호는 $x$의 부호, $\\tan\\theta=\\frac{y}{x}$의 부호는 $x$와 $y$의 부호가 같은지 다른지로 정해집니다.\n\n| | 제1사분면 | 제2사분면 | 제3사분면 | 제4사분면 |\n|---|---|---|---|---|\n| $(x, y)$ | $(+, +)$ | $(-, +)$ | $(-, -)$ | $(+, -)$ |\n| $\\sin\\theta$ | $+$ | $+$ | $-$ | $-$ |\n| $\\cos\\theta$ | $+$ | $-$ | $-$ | $+$ |\n| $\\tan\\theta$ | $+$ | $-$ | $+$ | $-$ |\n\n양수인 것만 모으면 제1사분면은 **모두**, 제2사분면은 **사인**, 제3사분면은 **탄젠트**, 제4사분면은 **코사인**입니다.\n\n예: $\\sin\\theta<0$이고 $\\tan\\theta>0$이면 제3사분면의 각입니다.',
        easy: '부호는 외울 필요 없이 점 P가 어디 있는지만 생각하면 됩니다.\n\n- 사인은 높이($y$): 위쪽(제1, 2사분면)이면 +\n- 코사인은 가로($x$): 오른쪽(제1, 4사분면)이면 +\n- 탄젠트는 $\\frac{y}{x}$: 두 부호가 같으면(제1, 3사분면) +',
        check: {
          type: 'choice', fixed: true,
          q: '$\\sin\\theta<0$이고 $\\cos\\theta>0$일 때, $\\theta$는 제몇사분면의 각입니까?',
          choices: ['제1사분면', '제2사분면', '제3사분면', '제4사분면'],
          answer: 3,
          why: [
            '제1사분면에서는 $\\sin\\theta>0$입니다.',
            '제2사분면에서는 $\\sin\\theta>0$, $\\cos\\theta<0$으로 둘 다 반대입니다.',
            '제3사분면에서는 $\\cos\\theta<0$입니다.',
            '',
          ],
          explain: '$\\sin\\theta<0$이면 $y<0$ (제3, 4사분면), $\\cos\\theta>0$이면 $x>0$ (제1, 4사분면)입니다. 둘 다 만족하는 것은 제4사분면입니다.',
        },
      },
      {
        title: '삼각함수 사이의 관계',
        body: '정의 $\\sin\\theta=\\frac{y}{r}$, $\\cos\\theta=\\frac{x}{r}$, $\\tan\\theta=\\frac{y}{x}$에서 두 관계가 나옵니다.\n\n**① $\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$**: $\\frac{\\sin\\theta}{\\cos\\theta}=\\frac{y/r}{x/r}=\\frac{y}{x}=\\tan\\theta$\n\n**② $\\sin^{2}\\theta+\\cos^{2}\\theta=1$**: 점 P가 원 $x^{2}+y^{2}=r^{2}$ 위에 있으므로 $\\left(\\frac{y}{r}\\right)^{2}+\\left(\\frac{x}{r}\\right)^{2}=\\frac{x^{2}+y^{2}}{r^{2}}=1$\n\n($\\sin^{2}\\theta$는 $(\\sin\\theta)^{2}$을 뜻합니다.)\n\n예: $\\theta$가 제2사분면의 각이고 $\\sin\\theta=\\frac{3}{5}$이면\n\n- $\\cos^{2}\\theta=1-\\frac{9}{25}=\\frac{16}{25}$이고 제2사분면에서 $\\cos\\theta<0$이므로 $\\cos\\theta=-\\frac{4}{5}$\n- $\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}=\\frac{3/5}{-4/5}=-\\frac{3}{4}$\n\n> ⚠️ $\\cos^{2}\\theta=\\frac{16}{25}$에서 $\\cos\\theta=\\pm\\frac{4}{5}$ 두 값이 나옵니다. 부호는 사분면으로 정합니다.',
        easy: '② 는 피타고라스 정리 그 자체입니다. 단위원 위의 점 $(\\cos\\theta, \\sin\\theta)$에서 원점까지의 거리가 1이므로 (가로)$^{2}$ + (세로)$^{2}$ = $1^{2}$입니다.\n\n그래서 사인과 코사인 가운데 하나를 알면 나머지 하나의 크기를 구할 수 있고, 어느 사분면인지 알면 부호까지 정해집니다.',
        check: {
          type: 'choice',
          q: '$\\theta$가 제3사분면의 각이고 $\\cos\\theta=-\\frac{3}{5}$일 때, $\\sin\\theta$의 값은 무엇입니까?',
          choices: ['$-\\frac{4}{5}$', '$\\frac{4}{5}$', '$\\frac{2}{5}$'],
          answer: 0,
          why: [
            '',
            '크기는 맞지만 제3사분면에서는 $\\sin\\theta<0$입니다.',
            '$1-\\frac{3}{5}$처럼 제곱하지 않고 뺐습니다. $\\sin^{2}\\theta=1-\\cos^{2}\\theta$입니다.',
          ],
          explain: '$\\sin^{2}\\theta=1-\\left(-\\frac{3}{5}\\right)^{2}=\\frac{16}{25}$이고, 제3사분면에서 $\\sin\\theta<0$이므로 $\\sin\\theta=-\\frac{4}{5}$입니다.',
        },
      },
      {
        title: '관계식의 활용 — sinθ±cosθ와 sinθcosθ',
        body: '$\\sin^{2}\\theta+\\cos^{2}\\theta=1$을 이용하면 $\\sin\\theta+\\cos\\theta$, $\\sin\\theta-\\cos\\theta$, $\\sin\\theta\\cos\\theta$ 가운데 하나를 알 때 나머지를 구할 수 있습니다.\n\n$(\\sin\\theta+\\cos\\theta)^{2}=\\sin^{2}\\theta+2\\sin\\theta\\cos\\theta+\\cos^{2}\\theta=1+2\\sin\\theta\\cos\\theta$\n\n$(\\sin\\theta-\\cos\\theta)^{2}=1-2\\sin\\theta\\cos\\theta$\n\n예: $\\sin\\theta+\\cos\\theta=\\frac{1}{2}$이면 $\\frac{1}{4}=1+2\\sin\\theta\\cos\\theta$이므로 $\\sin\\theta\\cos\\theta=-\\frac{3}{8}$\n\n더 나아가 곱셈 공식으로\n\n$\\sin^{3}\\theta+\\cos^{3}\\theta=(\\sin\\theta+\\cos\\theta)(1-\\sin\\theta\\cos\\theta)$\n\n도 구할 수 있습니다. 공통수학1에서 배운 곱셈 공식과 근과 계수의 관계가 그대로 쓰입니다.\n\n> 💡 $\\tan\\theta$가 주어진 식은 분모·분자를 $\\cos\\theta$로 나누어 $\\tan\\theta$만의 식으로 바꿉니다. 예: $\\frac{\\sin\\theta+\\cos\\theta}{\\sin\\theta-\\cos\\theta}=\\frac{\\tan\\theta+1}{\\tan\\theta-1}$',
        easy: '$\\sin\\theta=a$, $\\cos\\theta=b$라고 이름을 바꾸어 보십시오. 그러면 "$a^{2}+b^{2}=1$이고 $a+b=\\frac{1}{2}$일 때 $ab$는?"이라는 익숙한 곱셈 공식 문제가 됩니다.\n\n$(a+b)^{2}=a^{2}+b^{2}+2ab$이므로 $\\frac{1}{4}=1+2ab$, 곧 $ab=-\\frac{3}{8}$입니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\sin\\theta+\\cos\\theta=\\frac{1}{3}$일 때, $\\sin\\theta\\cos\\theta$의 값을 구하십시오.',
          answer: '-4/9',
          wrong: [
            { a: '4/9', why: '$\\frac{1}{9}=1+2\\sin\\theta\\cos\\theta$에서 이항할 때 부호를 바꾸지 않았습니다.' },
            { a: '-8/9', why: '$2\\sin\\theta\\cos\\theta=-\\frac{8}{9}$에서 2로 나누지 않았습니다.' },
          ],
          explain: '양변을 제곱하면 $1+2\\sin\\theta\\cos\\theta=\\frac{1}{9}$이므로 $2\\sin\\theta\\cos\\theta=-\\frac{8}{9}$, $\\sin\\theta\\cos\\theta=-\\frac{4}{9}$입니다.',
        },
      },
      {
        title: '특수한 각의 삼각함수 값',
        body: '$\\frac{\\pi}{6}(30°)$, $\\frac{\\pi}{4}(45°)$, $\\frac{\\pi}{3}(60°)$의 삼각함수 값은 세 각이 $30°, 60°, 90°$인 직각삼각형(변의 비 $1:\\sqrt{3}:2$)과 직각이등변삼각형(변의 비 $1:1:\\sqrt{2}$)에서 구합니다.\n\n| $\\theta$ | $\\frac{\\pi}{6}$ | $\\frac{\\pi}{4}$ | $\\frac{\\pi}{3}$ |\n|---|---|---|---|\n| $\\sin\\theta$ | $\\frac{1}{2}$ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{\\sqrt{3}}{2}$ |\n| $\\cos\\theta$ | $\\frac{\\sqrt{3}}{2}$ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{1}{2}$ |\n| $\\tan\\theta$ | $\\frac{\\sqrt{3}}{3}$ | $1$ | $\\sqrt{3}$ |\n\n다른 사분면의 각은 **단위원 위의 점**으로 구합니다. 예를 들어 $\\frac{2\\pi}{3}$의 동경은 $\\frac{\\pi}{3}$의 동경과 $y$축에 대하여 대칭이므로, 점 $\\left(\\frac{1}{2}, \\frac{\\sqrt{3}}{2}\\right)$의 대칭점 $\\left(-\\frac{1}{2}, \\frac{\\sqrt{3}}{2}\\right)$이 단위원 위의 점입니다.\n\n$\\sin\\frac{2\\pi}{3}=\\frac{\\sqrt{3}}{2}$, $\\cos\\frac{2\\pi}{3}=-\\frac{1}{2}$, $\\tan\\frac{2\\pi}{3}=-\\sqrt{3}$\n\n> 💡 방법: ① 동경과 $x$축이 이루는 예각($\\frac{\\pi}{6}$, $\\frac{\\pi}{4}$, $\\frac{\\pi}{3}$ 중 하나)으로 값의 크기를 정하고, ② 사분면으로 부호를 정합니다.',
        easy: '표를 통째로 외우기보다 단위원 위의 세 점을 기억하십시오.\n\n- $\\frac{\\pi}{6}$: $\\left(\\frac{\\sqrt{3}}{2}, \\frac{1}{2}\\right)$ — 낮고 오른쪽으로 멀리\n- $\\frac{\\pi}{4}$: $\\left(\\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{2}}{2}\\right)$ — 가로세로가 같음\n- $\\frac{\\pi}{3}$: $\\left(\\frac{1}{2}, \\frac{\\sqrt{3}}{2}\\right)$ — 높고 오른쪽으로 가깝게\n\n각이 커질수록 점이 위로 올라가므로 사인은 커지고 코사인은 작아집니다. 다른 사분면의 점은 이 세 점을 축에 대하여 접어 옮긴 것입니다.',
        fig: {
          type: 'coord', xmin: -1.5, xmax: 1.5, ymin: -1.5, ymax: 1.5,
          fns: [{ expr: 'sqrt(1-x^2)' }, { expr: '-sqrt(1-x^2)' }],
          points: [{ x: 0.5, y: 0.866, label: 'π/3' }, { x: -0.5, y: 0.866, label: '2π/3' }],
          segments: [{ from: [0, 0], to: [0.5, 0.866] }, { from: [0, 0], to: [-0.5, 0.866] }],
          alt: '단위원 위에서 π/3을 나타내는 점 (1/2, √3/2)과 y축에 대하여 대칭인 2π/3을 나타내는 점 (-1/2, √3/2)',
        },
        check: {
          type: 'choice',
          q: '$\\cos\\frac{2\\pi}{3}$의 값은 무엇입니까?',
          choices: ['$-\\frac{1}{2}$', '$\\frac{1}{2}$', '$-\\frac{\\sqrt{3}}{2}$'],
          answer: 0,
          why: [
            '',
            '크기는 맞지만 $\\frac{2\\pi}{3}$는 제2사분면의 각이라서 코사인이 음수입니다.',
            '사인과 코사인의 크기를 바꾸었습니다. $\\frac{\\pi}{3}$에서 코사인은 $\\frac{1}{2}$입니다.',
          ],
          explain: '$\\frac{2\\pi}{3}$를 나타내는 단위원 위의 점은 $\\left(-\\frac{1}{2}, \\frac{\\sqrt{3}}{2}\\right)$이므로 $\\cos\\frac{2\\pi}{3}=-\\frac{1}{2}$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '$\\theta$가 제3사분면의 각이고 $\\sin\\theta=-\\frac{12}{13}$일 때, $\\cos\\theta$와 $\\tan\\theta$의 값을 구하십시오.',
        steps: [
          '$\\cos^{2}\\theta=1-\\sin^{2}\\theta=1-\\frac{144}{169}=\\frac{25}{169}$입니다.',
          '제3사분면에서는 $\\cos\\theta<0$이므로 $\\cos\\theta=-\\frac{5}{13}$입니다.',
          '$\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}=\\frac{-12/13}{-5/13}=\\frac{12}{5}$입니다.',
          '확인: 제3사분면에서 $\\tan\\theta>0$이므로 부호가 맞습니다.',
        ],
        answer: '$\\cos\\theta=-\\frac{5}{13}$, $\\tan\\theta=\\frac{12}{5}$',
      },
      {
        q: '$\\sin\\frac{5\\pi}{4}$, $\\cos\\frac{5\\pi}{4}$, $\\tan\\frac{5\\pi}{4}$의 값을 구하십시오.',
        steps: [
          '$\\frac{5\\pi}{4}=\\pi+\\frac{\\pi}{4}$이므로 동경은 제3사분면에 있고, $x$축과 이루는 예각은 $\\frac{\\pi}{4}$입니다.',
          '$\\frac{\\pi}{4}$의 점 $\\left(\\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{2}}{2}\\right)$를 원점에 대하여 대칭이동하면 $\\left(-\\frac{\\sqrt{2}}{2}, -\\frac{\\sqrt{2}}{2}\\right)$입니다.',
          '따라서 $\\sin\\frac{5\\pi}{4}=-\\frac{\\sqrt{2}}{2}$, $\\cos\\frac{5\\pi}{4}=-\\frac{\\sqrt{2}}{2}$입니다.',
          '$\\tan\\frac{5\\pi}{4}=\\frac{-\\sqrt{2}/2}{-\\sqrt{2}/2}=1$입니다.',
        ],
        answer: '$-\\frac{\\sqrt{2}}{2}$, $-\\frac{\\sqrt{2}}{2}$, $1$',
      },
    ],

    terms: [
      { term: '삼각함수', def: '원 위의 점 $P(x, y)$와 동경 OP가 나타내는 각 $\\theta$에 대하여 정한 $\\sin\\theta=\\frac{y}{r}$, $\\cos\\theta=\\frac{x}{r}$, $\\tan\\theta=\\frac{y}{x}$를 통틀어 이르는 말입니다.' },
      { term: '사인', def: '$\\sin\\theta=\\frac{y}{r}$. 단위원에서는 점 P의 $y$좌표입니다. 값의 범위는 $-1$ 이상 $1$ 이하입니다.' },
      { term: '코사인', def: '$\\cos\\theta=\\frac{x}{r}$. 단위원에서는 점 P의 $x$좌표입니다. 값의 범위는 $-1$ 이상 $1$ 이하입니다.' },
      { term: '탄젠트', def: '$\\tan\\theta=\\frac{y}{x}$ ($x\\ne 0$). 동경 OP의 기울기와 같습니다. $\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$입니다.' },
      { term: '단위원', def: '원점을 중심으로 하고 반지름의 길이가 1인 원입니다. 동경과 단위원의 교점은 $(\\cos\\theta, \\sin\\theta)$입니다.' },
      { term: '삼각함수 사이의 관계', def: '$\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$, $\\sin^{2}\\theta+\\cos^{2}\\theta=1$입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '원점 O와 점 $P(-5, 12)$에 대하여 동경 OP가 나타내는 각의 크기를 $\\theta$라고 할 때, $\\sin\\theta$의 값을 구하십시오.',
        answer: '12/13',
        wrong: [
          { a: '-5/13', why: '$\\cos\\theta=\\frac{x}{r}$를 구했습니다. 사인은 $y$좌표를 씁니다.' },
          { a: '-12/5', why: '$\\tan\\theta=\\frac{y}{x}$를 구했습니다. 사인의 분모는 반지름 $r$입니다.' },
        ],
        explain: '$r=\\sqrt{(-5)^{2}+12^{2}}=13$이므로 $\\sin\\theta=\\frac{y}{r}=\\frac{12}{13}$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 0,
        q: '원점 O와 점 $P(-3, -4)$에 대하여 동경 OP가 나타내는 각의 크기를 $\\theta$라고 할 때, $\\tan\\theta$의 값을 구하십시오.',
        answer: '4/3',
        wrong: [
          { a: '-4/3', why: '$\\frac{-4}{-3}$는 음수끼리 나눈 것이라 양수입니다.' },
          { a: '3/4', why: '$\\frac{x}{y}$를 구했습니다. 탄젠트는 $\\frac{y}{x}$입니다.' },
        ],
        explain: '$\\tan\\theta=\\frac{y}{x}=\\frac{-4}{-3}=\\frac{4}{3}$입니다. 제3사분면에서 탄젠트가 양수인 것과도 맞습니다.',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 1,
        q: '모든 각 $\\theta$에 대하여 $-1\\le\\cos\\theta\\le 1$입니다.',
        answer: true,
        explain: '$\\cos\\theta$는 단위원 위의 점의 $x$좌표이므로 항상 $-1$ 이상 $1$ 이하입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 2,
        q: '$\\theta$가 제3사분면의 각일 때, 값이 항상 양수인 것은 무엇입니까?',
        choices: ['$\\tan\\theta$', '$\\sin\\theta$', '$\\cos\\theta$', '$\\sin\\theta\\tan\\theta$'],
        answer: 0,
        why: [
          '',
          '제3사분면에서는 $y<0$이므로 $\\sin\\theta<0$입니다.',
          '제3사분면에서는 $x<0$이므로 $\\cos\\theta<0$입니다.',
          '$\\sin\\theta<0$, $\\tan\\theta>0$이므로 곱은 음수입니다.',
        ],
        explain: '제3사분면에서 $x<0$, $y<0$이므로 $\\tan\\theta=\\frac{y}{x}>0$입니다. 사인과 코사인은 음수입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 5,
        q: '$\\sin\\frac{\\pi}{3}$의 값은 무엇입니까?',
        choices: ['$\\frac{\\sqrt{3}}{2}$', '$\\frac{1}{2}$', '$\\frac{\\sqrt{2}}{2}$', '$\\sqrt{3}$'],
        answer: 0,
        why: [
          '',
          '$\\cos\\frac{\\pi}{3}$ 또는 $\\sin\\frac{\\pi}{6}$의 값입니다.',
          '$\\frac{\\pi}{4}$의 사인 값입니다.',
          '$\\tan\\frac{\\pi}{3}$의 값입니다.',
        ],
        explain: '$\\frac{\\pi}{3}$를 나타내는 단위원 위의 점은 $\\left(\\frac{1}{2}, \\frac{\\sqrt{3}}{2}\\right)$이므로 $\\sin\\frac{\\pi}{3}=\\frac{\\sqrt{3}}{2}$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 1,
        q: '$\\cos\\pi+\\sin\\frac{3\\pi}{2}$의 값을 구하십시오.',
        answer: '-2',
        wrong: [
          { a: '0', why: '$\\cos\\pi$와 $\\sin\\frac{3\\pi}{2}$ 가운데 하나를 1로 보았습니다. 두 점 $(-1, 0)$, $(0, -1)$을 다시 보십시오.' },
          { a: '2', why: '부호를 놓쳤습니다. $\\cos\\pi=-1$, $\\sin\\frac{3\\pi}{2}=-1$입니다.' },
        ],
        explain: '$\\pi$의 점은 $(-1, 0)$이므로 $\\cos\\pi=-1$, $\\frac{3\\pi}{2}$의 점은 $(0, -1)$이므로 $\\sin\\frac{3\\pi}{2}=-1$입니다. 합은 $-2$입니다.',
      },
      {
        id: 'p7', level: 2, type: 'short', check: 'number', concept: 3,
        q: '$\\theta$가 제4사분면의 각이고 $\\cos\\theta=\\frac{5}{13}$일 때, $\\tan\\theta$의 값을 구하십시오.',
        answer: '-12/5',
        hint: '먼저 $\\sin^{2}\\theta+\\cos^{2}\\theta=1$로 $\\sin\\theta$를 구하십시오.',
        wrong: [
          { a: '12/5', why: '제4사분면에서는 $\\sin\\theta<0$이므로 $\\tan\\theta<0$입니다.' },
          { a: '-5/12', why: '$\\frac{\\cos\\theta}{\\sin\\theta}$를 계산했습니다. $\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$입니다.' },
        ],
        explain: '$\\sin^{2}\\theta=1-\\frac{25}{169}=\\frac{144}{169}$이고 제4사분면에서 $\\sin\\theta<0$이므로 $\\sin\\theta=-\\frac{12}{13}$입니다. $\\tan\\theta=\\frac{-12/13}{5/13}=-\\frac{12}{5}$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 3,
        q: '$(\\sin\\theta+\\cos\\theta)^{2}+(\\sin\\theta-\\cos\\theta)^{2}$을 간단히 하면 무엇입니까?',
        choices: ['$2$', '$1$', '$0$', '$4\\sin\\theta\\cos\\theta$'],
        answer: 0,
        why: [
          '',
          '$\\sin^{2}\\theta+\\cos^{2}\\theta=1$이 두 번 나옵니다. 두 식을 모두 전개해 보십시오.',
          '$2\\sin\\theta\\cos\\theta$ 항끼리만 지워지고 제곱 항은 남습니다.',
          '두 식을 빼면 $4\\sin\\theta\\cos\\theta$이지만, 이 문제는 더하기입니다.',
        ],
        explain: '$(1+2\\sin\\theta\\cos\\theta)+(1-2\\sin\\theta\\cos\\theta)=2$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 5,
        q: '$\\cos\\frac{5\\pi}{6}$의 값은 무엇입니까?',
        choices: ['$-\\frac{\\sqrt{3}}{2}$', '$\\frac{\\sqrt{3}}{2}$', '$-\\frac{1}{2}$', '$\\frac{1}{2}$'],
        answer: 0,
        why: [
          '',
          '크기는 맞지만 $\\frac{5\\pi}{6}$는 제2사분면의 각이라서 코사인이 음수입니다.',
          '$\\sin\\frac{\\pi}{6}$의 크기를 썼습니다. $\\frac{\\pi}{6}$의 코사인 크기는 $\\frac{\\sqrt{3}}{2}$입니다.',
          '이것은 $\\sin\\frac{5\\pi}{6}$의 값입니다.',
        ],
        explain: '$\\frac{5\\pi}{6}$의 동경은 $\\frac{\\pi}{6}$의 동경과 $y$축에 대하여 대칭이므로 점은 $\\left(-\\frac{\\sqrt{3}}{2}, \\frac{1}{2}\\right)$입니다. $\\cos\\frac{5\\pi}{6}=-\\frac{\\sqrt{3}}{2}$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 4,
        q: '$\\sin\\theta-\\cos\\theta=\\frac{1}{3}$일 때, $\\sin\\theta\\cos\\theta$의 값을 구하십시오.',
        answer: '4/9',
        hint: '양변을 제곱하십시오. $(\\sin\\theta-\\cos\\theta)^{2}=1-2\\sin\\theta\\cos\\theta$입니다.',
        wrong: [{ a: '-4/9', why: '$(\\sin\\theta-\\cos\\theta)^{2}$을 $1+2\\sin\\theta\\cos\\theta$로 전개했습니다. 가운데 항은 $-2\\sin\\theta\\cos\\theta$입니다.' }],
        explain: '$1-2\\sin\\theta\\cos\\theta=\\frac{1}{9}$이므로 $2\\sin\\theta\\cos\\theta=\\frac{8}{9}$, $\\sin\\theta\\cos\\theta=\\frac{4}{9}$입니다.',
      },
      {
        id: 'p11', level: 1, type: 'ox', concept: 3,
        q: '모든 각 $\\theta$에 대하여 $\\sin^{2}\\theta=1-\\cos^{2}\\theta$입니다.',
        answer: true,
        explain: '$\\sin^{2}\\theta+\\cos^{2}\\theta=1$은 모든 각에서 성립하므로 이항하면 $\\sin^{2}\\theta=1-\\cos^{2}\\theta$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', fixed: true, concept: 2,
        q: '$\\sin\\theta\\cos\\theta<0$이고 $\\sin\\theta\\tan\\theta>0$일 때, $\\theta$는 제몇사분면의 각입니까?',
        choices: ['제1사분면', '제2사분면', '제3사분면', '제4사분면'],
        answer: 3,
        why: [
          '제1사분면에서는 $\\sin\\theta\\cos\\theta>0$입니다.',
          '제2사분면에서는 $\\sin\\theta>0$, $\\tan\\theta<0$이므로 $\\sin\\theta\\tan\\theta<0$입니다.',
          '제3사분면에서는 $\\sin\\theta\\cos\\theta>0$입니다.',
          '',
        ],
        hint: '두 조건을 각각 만족하는 사분면을 구한 뒤 공통인 것을 찾으십시오.',
        explain: '$\\sin\\theta\\cos\\theta<0$이면 두 값의 부호가 달라 제2 또는 제4사분면입니다. $\\sin\\theta\\tan\\theta=\\frac{\\sin^{2}\\theta}{\\cos\\theta}>0$이면 $\\cos\\theta>0$이므로 제1 또는 제4사분면입니다. 공통은 제4사분면입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 4,
        q: '$\\sin\\theta+\\cos\\theta=\\frac{1}{2}$일 때, $\\sin^{3}\\theta+\\cos^{3}\\theta$의 값을 구하십시오.',
        answer: '11/16',
        hint: '$a^{3}+b^{3}=(a+b)(a^{2}-ab+b^{2})$이고, $a^{2}+b^{2}=1$입니다.',
        wrong: [
          { a: '1/8', why: '$(\\sin\\theta+\\cos\\theta)^{3}$을 계산했습니다. 세제곱의 합은 합의 세제곱과 다릅니다.' },
          { a: '5/16', why: '$1-\\sin\\theta\\cos\\theta$ 대신 $1+\\sin\\theta\\cos\\theta$를 곱했습니다.' },
        ],
        explain: '$1+2\\sin\\theta\\cos\\theta=\\frac{1}{4}$이므로 $\\sin\\theta\\cos\\theta=-\\frac{3}{8}$입니다.\n\n$\\sin^{3}\\theta+\\cos^{3}\\theta=(\\sin\\theta+\\cos\\theta)(1-\\sin\\theta\\cos\\theta)=\\frac{1}{2}\\times\\frac{11}{8}=\\frac{11}{16}$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 4,
        q: '$\\tan\\theta=2$일 때, $\\frac{\\sin\\theta+\\cos\\theta}{\\sin\\theta-\\cos\\theta}$의 값을 구하십시오.',
        answer: '3',
        hint: '분자와 분모를 $\\cos\\theta$로 나누어 보십시오.',
        wrong: [{ a: '-3', why: '분모를 $\\cos\\theta-\\sin\\theta$로 바꾸어 계산했습니다. 분모는 $\\tan\\theta-1$이 됩니다.' }],
        explain: '$\\tan\\theta=2$이므로 $\\cos\\theta\\ne 0$입니다. 분자와 분모를 $\\cos\\theta$로 나누면 $\\frac{\\tan\\theta+1}{\\tan\\theta-1}=\\frac{3}{1}=3$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 3,
        q: '$\\theta$가 제2사분면의 각이고 $\\tan\\theta=-2$일 때, $\\sin\\theta$의 값은 무엇입니까?',
        choices: ['$\\frac{2\\sqrt{5}}{5}$', '$-\\frac{2\\sqrt{5}}{5}$', '$\\frac{\\sqrt{5}}{5}$', '$-\\frac{\\sqrt{5}}{5}$'],
        answer: 0,
        why: [
          '',
          '제2사분면에서는 $\\sin\\theta>0$입니다.',
          '$|\\cos\\theta|$의 값입니다. $\\sin\\theta=\\tan\\theta\\times\\cos\\theta$로 구합니다.',
          '$\\cos\\theta$의 값입니다. 사인은 $\\tan\\theta\\cos\\theta=(-2)\\times\\left(-\\frac{\\sqrt{5}}{5}\\right)$입니다.',
        ],
        hint: '제2사분면에서 $x=-1$, $y=2$인 점을 동경 위에 잡아 보십시오.',
        explain: '$\\tan\\theta=\\frac{y}{x}=-2$이고 제2사분면이므로 동경 위의 점으로 $P(-1, 2)$를 잡을 수 있습니다. $r=\\sqrt{1+4}=\\sqrt{5}$이므로 $\\sin\\theta=\\frac{2}{\\sqrt{5}}=\\frac{2\\sqrt{5}}{5}$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 4,
        q: '이차방정식 $2x^{2}-x+k=0$의 두 근이 $\\sin\\theta$, $\\cos\\theta$일 때, 상수 $k$의 값을 구하십시오.',
        answer: '-3/4',
        hint: '근과 계수의 관계로 $\\sin\\theta+\\cos\\theta$와 $\\sin\\theta\\cos\\theta$를 나타내십시오.',
        wrong: [
          { a: '-3/8', why: '$\\sin\\theta\\cos\\theta=-\\frac{3}{8}$을 구했습니다. 두 근의 곱은 $\\frac{k}{2}$이므로 $k$는 그 2배입니다.' },
          { a: '3/4', why: '$1+2\\sin\\theta\\cos\\theta=\\frac{1}{4}$에서 이항할 때 부호를 바꾸지 않았습니다.' },
        ],
        explain: '근과 계수의 관계에서 $\\sin\\theta+\\cos\\theta=\\frac{1}{2}$, $\\sin\\theta\\cos\\theta=\\frac{k}{2}$입니다.\n\n첫 식을 제곱하면 $1+2\\sin\\theta\\cos\\theta=\\frac{1}{4}$이므로 $1+k=\\frac{1}{4}$, $k=-\\frac{3}{4}$입니다.',
      },
    ],

    deeper: [
      {
        title: '탄젠트라는 이름의 뜻 — 접선 위의 길이',
        body: '단위원에서 점 $A(1, 0)$을 지나고 $x$축에 수직인 직선 $x=1$을 그어 봅시다. 이 직선은 단위원의 **접선**(tangent line)입니다. 동경 OP 또는 그 연장선이 이 접선과 만나는 점을 $T$라고 하면, 직선 OP의 기울기가 $\\tan\\theta$이므로\n\n$T(1, \\tan\\theta)$\n\n입니다. 곧 $\\tan\\theta$는 접선 위에서 잰 높이이고, "탄젠트"라는 이름도 여기서 왔습니다.\n\n이 그림에서 $\\theta$가 $\\frac{\\pi}{2}$에 가까워지면 동경이 접선과 거의 평행해져 점 $T$가 한없이 위로 올라갑니다. 그래서 $\\tan\\frac{\\pi}{2}$는 정의되지 않습니다. 다음 단원에서 $y=\\tan x$의 그래프에 점근선이 생기는 이유이기도 합니다.',
      },
    ],

    faq: [
      {
        q: 'sin²θ는 sin(θ²)이랑 같은 거예요?',
        a: '아닙니다. $\\sin^{2}\\theta$는 $(\\sin\\theta)^{2}$, 곧 사인 값을 제곱한 것입니다. 괄호를 매번 쓰기 번거로워 이렇게 약속해서 씁니다. 각을 제곱한 $\\sin(\\theta^{2})$은 전혀 다른 값입니다.',
      },
      {
        q: '왜 tan(π/2)는 값이 없어요?',
        a: '$\\frac{\\pi}{2}$를 나타내는 단위원 위의 점은 $(0, 1)$이고, $\\tan\\theta=\\frac{y}{x}$에서 분모 $x$가 0이 되기 때문입니다. 0으로 나눌 수 없으므로 정의되지 않습니다. 동경이 $y$축과 겹쳐 기울기가 없는 것과 같습니다.',
      },
      {
        q: '중학교 삼각비랑 뭐가 달라요?',
        a: '삼각비는 직각삼각형의 변의 비라서 예각에서만 정의되었습니다. 삼각함수는 원 위의 점의 좌표로 정의하므로 $0$, 둔각, $2\\pi$보다 큰 각, 음의 각까지 모든 각에서 쓸 수 있고, 값이 음수가 될 수도 있습니다. 예각에서는 두 값이 같습니다.',
      },
    ],

    mistakes: [
      '$\\sin^{2}\\theta=\\frac{16}{25}$에서 $\\sin\\theta=\\frac{4}{5}$로 양수만 쓰는 실수 — 사분면을 보고 부호를 정합니다.',
      '$\\cos\\theta$에 $y$좌표, $\\sin\\theta$에 $x$좌표를 쓰는 실수 — 코사인은 $x$, 사인은 $y$입니다.',
      '$(\\sin\\theta-\\cos\\theta)^{2}$을 $1+2\\sin\\theta\\cos\\theta$로 전개하는 실수 — 가운데 항의 부호는 $-$입니다.',
    ],

    gens: [
      {
        id: 'point-value',
        level: 1,
        title: '동경 위의 점으로 삼각함수 값 구하기',
        make: function (R) {
          var t = R.pick(TRIPLES);
          var sw = R.bool();
          var x = (sw ? t[1] : t[0]) * R.sign(), y = (sw ? t[0] : t[1]) * R.sign(), r = t[2];
          var fn = R.pick(['sin', 'cos', 'tan']);
          var vals = { sin: R.F(y, r), cos: R.F(x, r), tan: R.F(y, x) };
          var ans = vals[fn];
          var cands = {
            sin: [[vals.cos, '$\\cos\\theta=\\frac{x}{r}$를 구했습니다. 사인은 $y$좌표를 씁니다.'], [ans.neg(), '부호를 다시 보십시오. $y=' + y + '$이고 $r$은 양수입니다.'], [vals.tan, '$\\tan\\theta=\\frac{y}{x}$를 구했습니다. 사인의 분모는 $r$입니다.']],
            cos: [[vals.sin, '$\\sin\\theta=\\frac{y}{r}$를 구했습니다. 코사인은 $x$좌표를 씁니다.'], [ans.neg(), '부호를 다시 보십시오. $x=' + x + '$이고 $r$은 양수입니다.'], [R.F(x, y), '$\\frac{x}{y}$를 구했습니다. 코사인의 분모는 $r$입니다.']],
            tan: [[R.F(x, y), '$\\frac{x}{y}$를 구했습니다. 탄젠트는 $\\frac{y}{x}$입니다.'], [ans.neg(), '부호를 다시 보십시오. $\\frac{' + y + '}{' + x + '}$의 부호를 따집니다.'], [vals.sin, '$\\sin\\theta$를 구했습니다. 탄젠트는 $\\frac{y}{x}$입니다.']],
          }[fn];
          var wrong = [];
          cands.forEach(function (c) {
            if (!c[0].eq(ans) && !wrong.some(function (w) { return R.F(0).add(w.a).eq(c[0]); })) wrong.push({ a: c[0].toString(), why: c[1] });
          });
          var def = { sin: '\\frac{y}{r}', cos: '\\frac{x}{r}', tan: '\\frac{y}{x}' }[fn];
          var rawN = fn === 'tan' ? y : fn === 'sin' ? y : x, rawD = fn === 'tan' ? x : r;
          // 대입한 분수가 이미 기약분수이고 분모가 양수이면 같은 값을 두 번 쓰지 않는다
          var subst = rawN === ans.num && rawD === ans.den ? '' : '\\frac{' + rawN + '}{' + rawD + '}=';
          return {
            type: 'short', check: 'number', concept: 0,
            q: '원점 O와 점 $P(' + x + ', ' + y + ')$에 대하여 동경 OP가 나타내는 각의 크기를 $\\theta$라고 할 때, $\\' + fn + '\\theta$의 값을 구하십시오.',
            answer: ans.toString(),
            wrong: wrong,
            explain: '$r=\\sqrt{' + R.fmt.paren(x) + '^{2}+' + R.fmt.paren(y) + '^{2}}=' + r + '$입니다.\n\n$\\' + fn + '\\theta=' + def + '=' + subst + ft(ans) + '$입니다.',
          };
        },
      },
      {
        id: 'relation',
        level: 2,
        title: '한 삼각함수 값으로 나머지 구하기',
        make: function (R) {
          var t = R.pick(TRIPLES.slice(0, 5));
          var sw = R.bool();
          var u = sw ? t[1] : t[0], v = sw ? t[0] : t[1], c = t[2];   // |sin| = u/c, |cos| = v/c
          var qd = R.pick([1, 1, 2, 2, 3, 3, 0]);                       // 사분면 번호(0~3), 부호가 중요한 2·3·4사분면을 더 자주
          var cs = QSIGN[qd][0], ss = QSIGN[qd][1];
          var S = R.F(ss * u, c), C = R.F(cs * v, c), T = R.F(ss * u, cs * v);
          var givenSin = R.bool();
          var ask = R.pick(['other', 'tan']);
          var given = givenSin ? S : C, gname = givenSin ? 'sin' : 'cos';
          var aname = ask === 'tan' ? 'tan' : (givenSin ? 'cos' : 'sin');
          var ans = ask === 'tan' ? T : (givenSin ? C : S);
          var wrong = [];
          function add(g, why) { if (!g.eq(ans) && !wrong.some(function (w) { return R.F(0).add(w.a).eq(g); })) wrong.push({ a: g.toString(), why: why }); }
          add(ans.neg(), QUAD[qd] + '에서 $\\' + aname + '\\theta$의 부호를 다시 확인하십시오.');
          if (ask === 'tan') add(R.F(cs * v, ss * u), '$\\frac{\\cos\\theta}{\\sin\\theta}$를 계산했습니다. $\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$입니다.');
          else add(R.F(c - (givenSin ? u : v), c).mul(givenSin ? cs : ss), '제곱하지 않고 $1-\\frac{' + (givenSin ? u : v) + '}{' + c + '}$처럼 뺐습니다. $\\' + aname + '^{2}\\theta=1-\\' + gname + '^{2}\\theta$입니다.');
          var other = givenSin ? C : S, oname = givenSin ? 'cos' : 'sin', oabs = givenSin ? v : u;
          var sq = R.F(oabs * oabs, c * c);
          var step1 = '$\\' + oname + '^{2}\\theta=1-\\left(' + ft(given) + '\\right)^{2}=' + ft(sq) + '$이고, ' + QUAD[qd] + '에서 $\\' + oname + '\\theta' + (other.num > 0 ? '>' : '<') + '0$이므로 $\\' + oname + '\\theta=' + ft(other) + '$입니다.';
          var step2 = ask === 'tan' ? '\n\n$\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}=' + ft(T) + '$입니다.' : '';
          return {
            type: 'short', check: 'number', concept: 3,
            q: '$\\theta$가 ' + QUAD[qd] + '의 각이고 $\\' + gname + '\\theta=' + ft(given) + '$일 때, $\\' + aname + '\\theta$의 값을 구하십시오.',
            answer: ans.toString(),
            wrong: wrong,
            explain: step1 + step2,
          };
        },
      },
      {
        id: 'special-angle',
        level: 2,
        title: '특수한 각의 삼각함수 값',
        make: function (R) {
          var d = R.pick([30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330]);
          var v = special(d);
          var fn = v.ref === 90 ? R.pick(['sin', 'cos']) : R.pick(['sin', 'cos', 'tan']);
          var key = v[fn];
          var correct = valTex(key);
          var reason = {};
          var cands = [];
          function add(k, why) { var s = valTex(k); if (s !== correct && !(s in reason)) { reason[s] = why; cands.push(s); } }
          add(neg(key), v.ref === 0 || v.ref === 90
            ? '값의 크기는 맞지만 부호가 틀렸습니다. 이 각을 나타내는 좌표축 위의 점의 좌표를 확인하십시오.'
            : '값의 크기는 맞지만 부호가 틀렸습니다. 이 각의 동경이 놓인 사분면을 확인하십시오.');
          if (fn !== 'tan') {
            var co = fn === 'sin' ? v.cos : v.sin;
            add(co, (fn === 'sin' ? '코사인' : '사인') + ' 값을 구했습니다. ' + (fn === 'sin' ? '사인은 $y$좌표' : '코사인은 $x$좌표') + '입니다.');
            add(neg(co), '사인과 코사인을 바꾸었고 부호도 다시 보아야 합니다.');
            add(fn === 'sin' ? v.tan : v.tan, '탄젠트 값을 구했습니다.');
          } else {
            var rec = { '0': 'none', 't1': 't3', 't3': 't1', '1': '1' };
            var bare = key.charAt(0) === '-' ? key.slice(1) : key;
            var rk = rec[bare];
            if (rk && rk !== 'none') add(key.charAt(0) === '-' ? neg(rk) : rk, '$\\frac{x}{y}$를 구했습니다. 탄젠트는 $\\frac{y}{x}$입니다.');
            add(v.sin, '사인 값을 구했습니다. 탄젠트는 $\\frac{\\sin\\theta}{\\cos\\theta}$입니다.');
            add(v.cos, '코사인 값을 구했습니다.');
          }
          // 모자라면 같은 종류의 다른 값으로 채운다
          var pool = fn === 'tan' ? ['0', 't1', '-t1', '1', '-1', 't3', '-t3'] : ['0', 'h', '-h', 'r2', '-r2', 'r3', '-r3', '1', '-1'];
          pool.forEach(function (k) { add(k, '이 각을 나타내는 단위원 위의 점을 다시 그려 보십시오.'); });
          var pick = R.choices(correct, cands.slice(0, 6));
          var pt = '\\left(' + valTex(v.cos).replace(/\$/g, '') + ', ' + valTex(v.sin).replace(/\$/g, '') + '\\right)';
          var tanLine = fn === 'tan' ? ' 따라서 $\\tan' + radTex(d) + '=\\frac{y}{x}=' + correct.replace(/\$/g, '') + '$입니다.' : '';
          var refTxt = v.ref === 0 || v.ref === 90 ? '좌표축 위의 점입니다.' : '동경과 $x$축이 이루는 예각은 $' + radTex(v.ref) + '$이고 ' + QUAD[Math.floor(d / 90)] + '에 있습니다.';
          return {
            type: 'choice', concept: 5,
            q: '$\\' + fn + radTex(d) + '$의 값은 무엇입니까?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (ch) { return ch === correct ? '' : reason[ch] || ''; }),
            explain: '각 $' + radTex(d) + '$의 동경을 생각합니다. ' + refTxt + ' 단위원 위의 점은 $' + pt + '$입니다.' + (fn === 'tan' ? tanLine : ' 따라서 $\\' + fn + radTex(d) + '=' + correct.replace(/\$/g, '') + '$입니다.'),
          };
        },
      },
      {
        id: 'sum-product',
        level: 3,
        title: 'sinθ+cosθ의 값으로 다른 식의 값 구하기',
        make: function (R) {
          var k = R.pick([R.F(1, 2), R.F(1, 3), R.F(2, 3), R.F(1, 4), R.F(3, 4), R.F(1, 5), R.F(2, 5), R.F(3, 5), R.F(4, 5)]);
          if (R.bool()) k = k.neg();
          var minus = R.bool();                                     // sinθ-cosθ=k 로 줄까
          var k2 = k.mul(k);
          var sc = minus ? R.F(1).sub(k2).div(2) : k2.sub(1).div(2); // sinθcosθ
          var kind = R.pick(['sc', 'sc', 'sq', 'cube']);
          if (minus && kind === 'cube') kind = 'sc';
          var lhs = minus ? '\\sin\\theta-\\cos\\theta' : '\\sin\\theta+\\cos\\theta';
          var ans, target, wrong = [], tail;
          var kT = ft(k);
          var first = '양변을 제곱하면 $' + (minus ? '1-2' : '1+2') + '\\sin\\theta\\cos\\theta=' + ft(k2) + '$이므로 $\\sin\\theta\\cos\\theta=' + ft(sc) + '$입니다.';
          function add(g, why) { if (!g.eq(ans) && !wrong.some(function (w) { return R.F(0).add(w.a).eq(g); })) wrong.push({ a: g.toString(), why: why }); }
          if (kind === 'sc') {
            target = '\\sin\\theta\\cos\\theta'; ans = sc; tail = '';
            add(sc.neg(), '이항할 때 부호를 바꾸지 않았습니다.');
            add(sc.mul(2), '$2\\sin\\theta\\cos\\theta$의 값에서 2로 나누지 않았습니다.');
          } else if (kind === 'sq') {
            target = minus ? '(\\sin\\theta+\\cos\\theta)^{2}' : '(\\sin\\theta-\\cos\\theta)^{2}';
            ans = minus ? R.F(1).add(sc.mul(2)) : R.F(1).sub(sc.mul(2));
            tail = '\n\n$' + target + '=' + (minus ? '1+2' : '1-2') + '\\sin\\theta\\cos\\theta=' + ft(ans) + '$입니다.';
            add(k2, '주어진 식의 제곱 $' + ft(k2) + '$' + R.josa(k2.num, '을/를') + ' 그대로 답했습니다. 가운데 항의 부호가 다릅니다.');
            add(minus ? R.F(1).sub(sc.mul(2)) : R.F(1).add(sc.mul(2)), '가운데 항 $2\\sin\\theta\\cos\\theta$의 부호를 반대로 썼습니다.');
          } else {
            target = '\\sin^{3}\\theta+\\cos^{3}\\theta';
            ans = k.mul(R.F(1).sub(sc));
            tail = '\n\n$' + target + '=(\\sin\\theta+\\cos\\theta)(1-\\sin\\theta\\cos\\theta)=' + (k.num < 0 ? '\\left(' + kT + '\\right)' : kT) + '\\times' + ft(R.F(1).sub(sc)) + '=' + ft(ans) + '$입니다.';
            add(k.mul(k2), '합의 세제곱 $(\\sin\\theta+\\cos\\theta)^{3}$을 계산했습니다. 세제곱의 합과 다릅니다.');
            add(k.mul(R.F(1).add(sc)), '$1-\\sin\\theta\\cos\\theta$ 대신 $1+\\sin\\theta\\cos\\theta$를 곱했습니다.');
          }
          return {
            type: 'short', check: 'number', concept: 4,
            q: '$' + lhs + '=' + kT + '$일 때, $' + target + '$의 값을 구하십시오.',
            answer: ans.toString(),
            hint: '양변을 제곱하고 $\\sin^{2}\\theta+\\cos^{2}\\theta=1$을 쓰십시오.',
            wrong: wrong,
            explain: first + tail,
          };
        },
      },
    ],
  });
})();
