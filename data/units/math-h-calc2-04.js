/* 미적분Ⅱ · 삼각함수의 덧셈정리와 미분
 * csc·sec·cot, 사인·코사인·탄젠트의 덧셈정리, 두 직선이 이루는 각, lim sin x / x = 1, sin x · cos x 의 도함수.
 * (tan x 의 도함수는 몫의 미분법이 필요하므로 다음 단원 math-h-calc2-05 에서) */
(function () {
  function dedupe(ans, wrongs) {
    var wr = [], seen = {};
    wrongs.forEach(function (w) {
      if (!w[0] || w[0].eq(ans) || seen[w[0].toString()]) return;
      seen[w[0].toString()] = true;
      wr.push({ a: w[0].toString(), why: w[1] });
    });
    return wr;
  }
  function kx(q) { return (q === 1 ? '' : q === -1 ? '-' : q) + 'x'; }
  // \sin 3x, \sin(-2x)
  function trig(f, p) { return p < 0 ? '\\' + f + '(' + kx(p) + ')' : '\\' + f + ' ' + kx(p); }
  function T(k, body, first) {
    if (k === 0) return '';
    var sign = k < 0 ? '-' : (first ? '' : '+');
    return sign + (Math.abs(k) === 1 ? '' : Math.abs(k)) + body;
  }

  Tutor.registerUnit({
    id: 'math-h-calc2-04',
    course: 'math-h-calc2',
    title: '삼각함수의 덧셈정리와 미분',
    summary: '$\\csc$, $\\sec$, $\\cot$와 삼각함수의 덧셈정리를 익히고, 삼각함수의 극한을 이용해 사인·코사인 함수를 미분합니다.',
    goals: [
      '$\\csc x$, $\\sec x$, $\\cot x$의 뜻을 알고 그 값을 구할 수 있다.',
      '사인·코사인·탄젠트의 덧셈정리를 이해하고 이를 활용할 수 있다.',
      '$\\lim_{x \\to 0}\\frac{\\sin x}{x}=1$을 이용하여 삼각함수의 극한값을 구할 수 있다.',
      '$y=\\sin x$, $y=\\cos x$의 도함수를 구할 수 있다.',
    ],
    standards: ['[12미적Ⅱ-02-02]', '[12미적Ⅱ-02-03]'],

    concepts: [
      {
        title: 'csc x, sec x, cot x',
        body: '사인·코사인·탄젠트의 역수를 각각 **코시컨트**, **시컨트**, **코탄젠트**라고 합니다.\n\n$\\csc\\theta=\\dfrac{1}{\\sin\\theta}, \\quad \\sec\\theta=\\dfrac{1}{\\cos\\theta}, \\quad \\cot\\theta=\\dfrac{1}{\\tan\\theta}=\\dfrac{\\cos\\theta}{\\sin\\theta}$\n\n(각각 분모가 0이 아닐 때 정의합니다.) 원점 $O$를 중심으로 하는 반지름 $r$인 원 위의 점 $P(x, y)$에 대하여 동경 $OP$가 나타내는 각이 $\\theta$이면 $\\csc\\theta=\\frac{r}{y}$, $\\sec\\theta=\\frac{r}{x}$, $\\cot\\theta=\\frac{x}{y}$입니다.\n\n| $\\theta$ | $\\frac{\\pi}{6}$ | $\\frac{\\pi}{4}$ | $\\frac{\\pi}{3}$ |\n|---|---|---|---|\n| $\\csc\\theta$ | $2$ | $\\sqrt{2}$ | $\\frac{2\\sqrt{3}}{3}$ |\n| $\\sec\\theta$ | $\\frac{2\\sqrt{3}}{3}$ | $\\sqrt{2}$ | $2$ |\n| $\\cot\\theta$ | $\\sqrt{3}$ | $1$ | $\\frac{\\sqrt{3}}{3}$ |\n\n$\\sin^2\\theta+\\cos^2\\theta=1$의 양변을 $\\cos^2\\theta$, $\\sin^2\\theta$로 나누면 다음 관계를 얻습니다.\n\n$1+\\tan^2\\theta=\\sec^2\\theta, \\quad 1+\\cot^2\\theta=\\csc^2\\theta$',
        easy: '새로운 함수처럼 보이지만 이미 아는 값을 뒤집은 것뿐입니다. 짝만 정확히 기억하면 됩니다.\n\n- 코시컨트($\\csc$) ↔ 사인의 역수\n- 시컨트($\\sec$) ↔ 코사인의 역수\n- 코탄젠트($\\cot$) ↔ 탄젠트의 역수\n\n예를 들어 $\\sin\\frac{\\pi}{6}=\\frac{1}{2}$이므로 $\\csc\\frac{\\pi}{6}=2$입니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\sec\\frac{\\pi}{3}$의 값을 구하십시오.',
          answer: '2',
          wrong: [{ a: '1/2', why: '$\\cos\\frac{\\pi}{3}$의 값을 구했습니다. $\\sec$는 코사인의 역수입니다.' }],
          explain: '$\\cos\\frac{\\pi}{3}=\\frac{1}{2}$이므로 $\\sec\\frac{\\pi}{3}=\\dfrac{1}{\\cos\\frac{\\pi}{3}}=2$입니다.',
        },
      },
      {
        title: '사인·코사인의 덧셈정리',
        body: '두 각 $\\alpha$, $\\beta$에 대하여 다음이 성립합니다. 이것을 **삼각함수의 덧셈정리**라고 합니다.\n\n- $\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta$\n- $\\sin(\\alpha-\\beta)=\\sin\\alpha\\cos\\beta-\\cos\\alpha\\sin\\beta$\n- $\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$\n- $\\cos(\\alpha-\\beta)=\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta$\n\n**까닭**: 단위원 위의 두 점 $P(\\cos\\alpha, \\sin\\alpha)$, $Q(\\cos\\beta, \\sin\\beta)$ 사이의 거리를 두 가지로 구합니다. 좌표로 계산하면 $\\overline{PQ}^2=2-2(\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta)$이고, $\\angle POQ$의 크기가 $\\alpha-\\beta$인 삼각형 $OPQ$에 코사인법칙을 쓰면 $\\overline{PQ}^2=2-2\\cos(\\alpha-\\beta)$입니다. 두 식을 비교하면 $\\cos(\\alpha-\\beta)$의 공식이 나오고, $\\beta$ 대신 $-\\beta$를 넣거나 $\\sin\\theta=\\cos\\left(\\frac{\\pi}{2}-\\theta\\right)$를 쓰면 나머지 공식이 나옵니다.\n\n예: $\\sin 75^\\circ=\\sin(45^\\circ+30^\\circ)=\\frac{\\sqrt{2}}{2} \\cdot \\frac{\\sqrt{3}}{2}+\\frac{\\sqrt{2}}{2} \\cdot \\frac{1}{2}=\\frac{\\sqrt{6}+\\sqrt{2}}{4}$\n\n> ⚠️ $\\sin(\\alpha+\\beta) \\ne \\sin\\alpha+\\sin\\beta$입니다. $\\alpha=\\beta=\\frac{\\pi}{4}$이면 $\\sin\\frac{\\pi}{2}=1$이지만 $\\sin\\frac{\\pi}{4}+\\sin\\frac{\\pi}{4}=\\sqrt{2}$입니다.',
        easy: '모양으로 기억하면 쉽습니다.\n\n- 사인: "사·코 + 코·사" (부호는 괄호 안과 같게)\n- 코사인: "코·코 − 사·사" (부호는 괄호 안과 반대로)\n\n$\\cos(\\alpha+\\beta)$에서 빼기가 나오는 까닭은, 두 각을 더해 각이 커지면 코사인 값은 대체로 작아지기 때문이라고 생각해 두면 부호를 덜 헷갈립니다.',
        fig: {
          type: 'coord', xmin: -1.3, xmax: 1.3, ymin: -1.3, ymax: 1.3, grid: false,
          fns: [{ expr: 'sqrt(1-x^2)', from: -1, to: 1 }, { expr: '-sqrt(1-x^2)', from: -1, to: 1 }],
          segments: [{ from: [0, 0], to: [0.342, 0.94] }, { from: [0, 0], to: [0.906, 0.423] }, { from: [0.342, 0.94], to: [0.906, 0.423], dashed: true }],
          points: [{ x: 0.342, y: 0.94, label: 'P' }, { x: 0.906, y: 0.423, label: 'Q' }, { x: 0, y: 0, label: 'O' }],
          alt: '원점 O를 중심으로 하는 단위원 위에 두 점 P(cos α, sin α), Q(cos β, sin β)를 찍고 선분 OP, OQ와 점선 PQ를 그린 그림',
        },
        check: {
          type: 'choice',
          q: '$\\cos(\\alpha+\\beta)$와 같은 것은 무엇입니까?',
          choices: ['$\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$', '$\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta$', '$\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta$'],
          answer: 0,
          why: ['', '$\\cos(\\alpha-\\beta)$의 공식입니다. 코사인은 괄호 안과 부호가 반대입니다.', '$\\sin(\\alpha+\\beta)$의 공식입니다.'],
          explain: '$\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$입니다. 코사인의 덧셈정리는 "코·코 − 사·사"입니다.',
        },
      },
      {
        title: '탄젠트의 덧셈정리',
        body: '$\\tan(\\alpha+\\beta)=\\dfrac{\\sin(\\alpha+\\beta)}{\\cos(\\alpha+\\beta)}=\\dfrac{\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta}{\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta}$의 분자와 분모를 $\\cos\\alpha\\cos\\beta$로 나누면 다음을 얻습니다.\n\n$\\tan(\\alpha+\\beta)=\\dfrac{\\tan\\alpha+\\tan\\beta}{1-\\tan\\alpha\\tan\\beta}, \\quad \\tan(\\alpha-\\beta)=\\dfrac{\\tan\\alpha-\\tan\\beta}{1+\\tan\\alpha\\tan\\beta}$\n\n(분모가 0이 아닐 때 성립합니다.) 분자는 괄호 안과 같은 부호, 분모는 반대 부호입니다.\n\n예: $\\tan 15^\\circ=\\tan(45^\\circ-30^\\circ)=\\dfrac{1-\\frac{\\sqrt{3}}{3}}{1+\\frac{\\sqrt{3}}{3}}=\\dfrac{3-\\sqrt{3}}{3+\\sqrt{3}}=2-\\sqrt{3}$\n\n> 💡 $\\tan\\alpha\\tan\\beta=1$이면 $\\tan(\\alpha+\\beta)$의 분모가 0이 됩니다. 이때 $\\alpha+\\beta=\\frac{\\pi}{2}$처럼 탄젠트가 정의되지 않는 각이 됩니다.',
        easy: '탄젠트는 기울기입니다. 기울기가 $\\tan\\alpha$인 방향을 각 $\\beta$만큼 더 돌렸을 때의 기울기를 구하는 공식이라고 생각할 수 있습니다.\n\n분자는 "두 탄젠트의 합", 분모는 "1에서 두 탄젠트의 곱을 뺀 것" — 더하기 공식에서 분모에 빼기가 들어가는 점만 조심하면 됩니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\tan\\alpha=2$, $\\tan\\beta=3$일 때, $\\tan(\\alpha+\\beta)$의 값을 구하십시오.',
          answer: '-1',
          wrong: [
            { a: '5', why: '분자 $\\tan\\alpha+\\tan\\beta$만 계산했습니다. 분모 $1-\\tan\\alpha\\tan\\beta$로 나누어야 합니다.' },
            { a: '5/7', why: '분모의 부호를 거꾸로 썼습니다. $\\tan(\\alpha+\\beta)$의 분모는 $1-\\tan\\alpha\\tan\\beta$입니다.' },
          ],
          explain: '$\\tan(\\alpha+\\beta)=\\dfrac{2+3}{1-2 \\times 3}=\\dfrac{5}{-5}=-1$입니다.',
        },
      },
      {
        title: '두 직선이 이루는 각',
        body: '직선 $y=mx+n$이 $x$축의 양의 방향과 이루는 각의 크기를 $\\theta$라 하면 기울기는 $m=\\tan\\theta$입니다.\n\n두 직선 $y=m_1x+n_1$, $y=m_2x+n_2$가 $x$축의 양의 방향과 이루는 각을 각각 $\\theta_1$, $\\theta_2$라 하면, 두 직선이 이루는 예각의 크기 $\\theta$는 $|\\theta_1-\\theta_2|$이거나 그 보각입니다. 탄젠트의 덧셈정리로\n\n$\\tan\\theta=\\left|\\dfrac{m_1-m_2}{1+m_1m_2}\\right|$\n\n입니다. 예각을 구하므로 절댓값을 붙입니다. $1+m_1m_2=0$, 곧 $m_1m_2=-1$이면 두 직선은 **수직**입니다.\n\n예: 두 직선 $y=3x$, $y=\\frac{1}{2}x$가 이루는 예각을 $\\theta$라 하면 $\\tan\\theta=\\left|\\dfrac{3-\\frac{1}{2}}{1+\\frac{3}{2}}\\right|=1$이므로 $\\theta=\\frac{\\pi}{4}$입니다.',
        easy: '두 직선이 벌어진 각은 "두 직선이 기울어진 각의 차"입니다. 각각의 기울어진 각은 몰라도 탄젠트(기울기)는 알고 있으니, 탄젠트의 뺄셈 공식에 기울기를 넣으면 벌어진 각의 탄젠트가 나옵니다.\n\n음수가 나오면 둔각 쪽을 잰 것이므로 절댓값을 붙여 예각으로 바꿉니다.',
        fig: {
          type: 'coord', xmin: -1, xmax: 4, ymin: -1, ymax: 4,
          fns: [{ expr: '3x', from: -0.33, to: 1.33, label: 'y=3x' }, { expr: 'x/2', from: -1, to: 4, label: 'y=x/2' }],
          alt: '원점을 지나는 두 직선 y=3x와 y=x/2를 그린 그림. 두 직선 사이의 예각이 45도이다',
        },
        check: {
          type: 'ox',
          q: '두 직선의 기울기를 $m_1$, $m_2$라 할 때, $m_1m_2=-1$이면 두 직선은 서로 수직입니다.',
          answer: true,
          explain: '$1+m_1m_2=0$이면 $\\tan\\theta$의 분모가 0이 되어 두 직선이 이루는 각이 $\\frac{\\pi}{2}$입니다. 따라서 두 직선은 수직입니다.',
        },
      },
      {
        title: '삼각함수의 극한: sin x / x → 1',
        body: '각의 크기를 **호도법(라디안)** 으로 나타낼 때\n\n$\\lim_{x \\to 0}\\dfrac{\\sin x}{x}=1$\n\n입니다. **까닭**: $0<x<\\frac{\\pi}{2}$일 때 반지름이 1인 원에서 (그림) 삼각형 $OAP$의 넓이 < 부채꼴 $OAP$의 넓이 < 삼각형 $OAT$의 넓이이므로\n\n$\\frac{1}{2}\\sin x<\\frac{1}{2}x<\\frac{1}{2}\\tan x$\n\n입니다. 각 변을 $\\frac{1}{2}\\sin x(>0)$로 나누고 역수를 취하면 $\\cos x<\\dfrac{\\sin x}{x}<1$이고, $x \\to 0+$일 때 $\\cos x \\to 1$이므로 극한의 대소 관계에 의해 극한값은 1입니다. $x<0$일 때도 $\\frac{\\sin(-x)}{-x}=\\frac{\\sin x}{x}$이므로 같습니다.\n\n**활용**\n- $\\lim_{x \\to 0}\\dfrac{\\sin 3x}{x}=\\lim_{x \\to 0}\\dfrac{\\sin 3x}{3x} \\times 3=3$\n- $\\lim_{x \\to 0}\\dfrac{\\tan x}{x}=\\lim_{x \\to 0}\\dfrac{\\sin x}{x} \\cdot \\dfrac{1}{\\cos x}=1$\n- $\\lim_{x \\to 0}\\dfrac{1-\\cos x}{x^2}=\\lim_{x \\to 0}\\dfrac{\\sin^2 x}{x^2(1+\\cos x)}=\\frac{1}{2}$\n\n> ⚠️ 각을 도(°)로 재면 이 극한은 1이 아닙니다. 미적분에서 삼각함수의 각은 항상 라디안입니다.',
        easy: '0에 아주 가까운 각에서는 원의 호와 그 높이(사인값)가 거의 같은 길이입니다. 피자 조각을 아주 얇게 자르면 둥근 끝(호)이 거의 곧은 선분처럼 보이는 것과 같습니다.\n\n그래서 $x=0.01$이면 $\\sin x=0.0099998\\cdots$로 $x$와 거의 같고, 그 비 $\\frac{\\sin x}{x}$는 1에 가까워집니다.',
        fig: {
          type: 'coord', xmin: -0.2, xmax: 1.3, ymin: -0.2, ymax: 1.2, grid: false,
          fns: [{ expr: 'sqrt(1-x^2)', from: 0, to: 1 }],
          segments: [
            { from: [0, 0], to: [1, 0] }, { from: [0, 0], to: [1, 1.03] }, { from: [1, 0], to: [1, 1.03] },
            { from: [0.697, 0.717], to: [1, 0] }, { from: [0.697, 0.717], to: [0.697, 0], dashed: true },
          ],
          points: [{ x: 0, y: 0, label: 'O' }, { x: 1, y: 0, label: 'A' }, { x: 0.697, y: 0.717, label: 'P' }, { x: 1, y: 1.03, label: 'T' }],
          alt: '반지름 1인 사분원에서 중심 O, x축 위의 점 A(1, 0), 원 위의 점 P, 직선 OP가 점 A에서의 접선과 만나는 점 T를 표시한 그림. 삼각형 OAP, 부채꼴 OAP, 삼각형 OAT가 차례로 커진다',
        },
        check: {
          type: 'short', check: 'number',
          q: '$\\lim_{x \\to 0}\\dfrac{\\sin 4x}{x}$의 값을 구하십시오.',
          answer: '4',
          wrong: [
            { a: '1', why: '$\\frac{\\sin x}{x} \\to 1$을 그대로 썼습니다. 분모를 $4x$로 맞추면 4를 곱해야 합니다.' },
            { a: '1/4', why: '분모를 $4x$로 맞출 때 4를 나누었습니다. $\\frac{\\sin 4x}{x}=\\frac{\\sin 4x}{4x} \\times 4$입니다.' },
          ],
          explain: '$\\dfrac{\\sin 4x}{x}=\\dfrac{\\sin 4x}{4x} \\times 4$이고 $4x \\to 0$이므로 극한값은 $1 \\times 4=4$입니다.',
        },
      },
      {
        title: 'sin x와 cos x의 도함수',
        body: '덧셈정리와 삼각함수의 극한을 쓰면\n\n$(\\sin x)\'=\\lim_{h \\to 0}\\dfrac{\\sin(x+h)-\\sin x}{h}=\\lim_{h \\to 0}\\left\\{\\sin x \\cdot \\dfrac{\\cos h-1}{h}+\\cos x \\cdot \\dfrac{\\sin h}{h}\\right\\}$\n\n입니다. 여기서 $\\dfrac{\\cos h-1}{h}=-\\dfrac{\\sin^2 h}{h(\\cos h+1)}=-\\dfrac{\\sin h}{h} \\cdot \\dfrac{\\sin h}{\\cos h+1} \\to -1 \\times 0=0$이고 $\\dfrac{\\sin h}{h} \\to 1$이므로\n\n$(\\sin x)\'=\\cos x, \\quad (\\cos x)\'=-\\sin x$\n\n입니다. ($\\cos x$도 같은 방법으로 구합니다.)\n\n예:\n- $(3\\sin x-2\\cos x)\'=3\\cos x+2\\sin x$\n- $(x\\sin x)\'=\\sin x+x\\cos x$ (곱의 미분법)\n- $f(x)=\\sin x$이면 $f\'\\left(\\frac{\\pi}{3}\\right)=\\cos\\frac{\\pi}{3}=\\frac{1}{2}$\n\n> ⚠️ $(\\cos x)\'$에는 마이너스가 붙습니다. $(\\cos x)\'=\\sin x$로 쓰는 실수가 많습니다.',
        easy: '그림에서 $y=\\sin x$의 그래프를 따라가 보십시오. $x=0$에서 가장 가파르게 올라가고(기울기 1), $x=\\frac{\\pi}{2}$에서 꼭대기라 평평하며(기울기 0), $x=\\pi$에서 가장 가파르게 내려갑니다(기울기 $-1$).\n\n이 기울기 1, 0, $-1$은 바로 $\\cos x$의 값 $\\cos 0$, $\\cos\\frac{\\pi}{2}$, $\\cos\\pi$입니다. 그래서 $(\\sin x)\'=\\cos x$입니다.',
        fig: {
          type: 'coord', xmin: -1, xmax: 7, ymin: -1.5, ymax: 1.5,
          fns: [{ expr: 'sin(x)', label: 'y=sin x' }, { expr: 'cos(x)', label: 'y=cos x' }],
          alt: '곡선 y=sin x와 y=cos x를 함께 그린 그림. y=sin x가 가장 가파르게 오르는 x=0에서 y=cos x는 최댓값 1이고, y=sin x의 꼭대기인 x=π/2에서 y=cos x는 0이다',
        },
        check: {
          type: 'choice',
          q: '함수 $y=\\cos x$의 도함수는 무엇입니까?',
          choices: ['$-\\sin x$', '$\\sin x$', '$-\\cos x$'],
          answer: 0,
          why: ['', '부호를 빠뜨렸습니다. $(\\cos x)\'=-\\sin x$입니다.', '사인과 코사인을 바꾸지 않았습니다. $(\\cos x)\'=-\\sin x$입니다.'],
          explain: '$(\\cos x)\'=-\\sin x$입니다. $y=\\cos x$는 $x=0$ 바로 뒤에서 내려가므로, 그 근처에서 양수인 $\\sin x$에 마이너스가 붙어야 기울기가 음수가 됩니다.',
        },
      },
    ],

    examples: [
      {
        q: '$\\sin 75^\\circ$의 값을 구하십시오.',
        steps: [
          '$75^\\circ$를 값을 아는 두 각의 합 $45^\\circ+30^\\circ$로 나타냅니다.',
          '사인의 덧셈정리로 $\\sin(45^\\circ+30^\\circ)=\\sin 45^\\circ\\cos 30^\\circ+\\cos 45^\\circ\\sin 30^\\circ$입니다.',
          '$=\\frac{\\sqrt{2}}{2} \\cdot \\frac{\\sqrt{3}}{2}+\\frac{\\sqrt{2}}{2} \\cdot \\frac{1}{2}=\\frac{\\sqrt{6}}{4}+\\frac{\\sqrt{2}}{4}=\\frac{\\sqrt{6}+\\sqrt{2}}{4}$',
        ],
        answer: '$\\frac{\\sqrt{6}+\\sqrt{2}}{4}$',
      },
      {
        q: '$0<\\alpha<\\frac{\\pi}{2}$, $0<\\beta<\\frac{\\pi}{2}$이고 $\\sin\\alpha=\\frac{3}{5}$, $\\cos\\beta=\\frac{5}{13}$일 때, $\\cos(\\alpha+\\beta)$의 값을 구하십시오.',
        steps: [
          '$\\alpha$가 예각이므로 $\\cos\\alpha>0$입니다. $\\cos\\alpha=\\sqrt{1-\\left(\\frac{3}{5}\\right)^2}=\\frac{4}{5}$',
          '$\\beta$도 예각이므로 $\\sin\\beta=\\sqrt{1-\\left(\\frac{5}{13}\\right)^2}=\\frac{12}{13}$',
          '$\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta=\\frac{4}{5} \\cdot \\frac{5}{13}-\\frac{3}{5} \\cdot \\frac{12}{13}=\\frac{20-36}{65}=-\\frac{16}{65}$',
        ],
        answer: '$-\\frac{16}{65}$',
      },
      {
        q: '$\\lim_{x \\to 0}\\dfrac{\\sin 3x}{\\tan 2x}$의 값을 구하십시오.',
        steps: [
          '분자와 분모를 각각 $\\frac{\\sin x}{x}$ 꼴로 맞춥니다. $\\dfrac{\\sin 3x}{\\tan 2x}=\\dfrac{\\sin 3x}{3x} \\cdot \\dfrac{2x}{\\tan 2x} \\cdot \\dfrac{3}{2}$',
          '$\\dfrac{\\sin 3x}{3x} \\to 1$, $\\dfrac{\\tan 2x}{2x} \\to 1$이므로 $\\dfrac{2x}{\\tan 2x} \\to 1$입니다.',
          '극한값은 $1 \\times 1 \\times \\frac{3}{2}=\\frac{3}{2}$입니다.',
        ],
        answer: '$\\frac{3}{2}$',
      },
    ],

    terms: [
      { term: '코시컨트', def: '사인의 역수입니다. $\\csc\\theta=\\frac{1}{\\sin\\theta}$ 예: $\\csc\\frac{\\pi}{6}=2$' },
      { term: '시컨트', def: '코사인의 역수입니다. $\\sec\\theta=\\frac{1}{\\cos\\theta}$ 예: $\\sec\\frac{\\pi}{3}=2$' },
      { term: '코탄젠트', def: '탄젠트의 역수입니다. $\\cot\\theta=\\frac{1}{\\tan\\theta}=\\frac{\\cos\\theta}{\\sin\\theta}$ 예: $\\cot\\frac{\\pi}{4}=1$' },
      { term: '삼각함수의 덧셈정리', def: '$\\sin(\\alpha \\pm \\beta)$, $\\cos(\\alpha \\pm \\beta)$, $\\tan(\\alpha \\pm \\beta)$를 $\\alpha$, $\\beta$의 삼각함수로 나타낸 공식입니다. 예: $\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta$' },
      { term: '두 직선이 이루는 각', def: '기울기가 $m_1$, $m_2$인 두 직선이 이루는 예각 $\\theta$는 $\\tan\\theta=\\left|\\frac{m_1-m_2}{1+m_1m_2}\\right|$로 구합니다.' },
      { term: '호도법(라디안)', def: '반지름과 길이가 같은 호에 대한 중심각을 1라디안으로 하는 각의 단위입니다. $180^\\circ=\\pi$ 라디안. 미적분에서 삼각함수의 각은 라디안으로 잽니다.' },
      { term: '삼각함수의 극한', def: '각을 라디안으로 잴 때 $\\lim_{x \\to 0}\\frac{\\sin x}{x}=1$입니다. 이로부터 $\\lim_{x \\to 0}\\frac{\\tan x}{x}=1$도 얻습니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '$\\csc\\frac{\\pi}{6}$의 값을 구하십시오.',
        answer: '2',
        wrong: [{ a: '1/2', why: '$\\sin\\frac{\\pi}{6}$의 값을 구했습니다. $\\csc$는 사인의 역수입니다.' }],
        explain: '$\\sin\\frac{\\pi}{6}=\\frac{1}{2}$이므로 $\\csc\\frac{\\pi}{6}=\\dfrac{1}{\\sin\\frac{\\pi}{6}}=2$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 0,
        q: '$\\cot\\frac{\\pi}{3}$의 값은 무엇입니까?',
        choices: ['$\\frac{\\sqrt{3}}{3}$', '$\\sqrt{3}$', '$\\frac{1}{2}$', '$2$'],
        answer: 0,
        why: [
          '',
          '$\\tan\\frac{\\pi}{3}$의 값입니다. $\\cot$는 탄젠트의 역수입니다.',
          '$\\cos\\frac{\\pi}{3}$의 값입니다.',
          '$\\sec\\frac{\\pi}{3}$의 값입니다. $\\cot$는 탄젠트의 역수입니다.',
        ],
        explain: '$\\tan\\frac{\\pi}{3}=\\sqrt{3}$이므로 $\\cot\\frac{\\pi}{3}=\\dfrac{1}{\\sqrt{3}}=\\dfrac{\\sqrt{3}}{3}$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '$\\cos 75^\\circ$의 값은 무엇입니까?',
        choices: ['$\\frac{\\sqrt{6}-\\sqrt{2}}{4}$', '$\\frac{\\sqrt{6}+\\sqrt{2}}{4}$', '$\\frac{\\sqrt{2}-\\sqrt{6}}{4}$', '$\\frac{\\sqrt{2}+\\sqrt{3}}{2}$'],
        answer: 0,
        why: [
          '',
          '$\\sin 75^\\circ$(또는 $\\cos 15^\\circ$)의 값입니다. $\\cos(\\alpha+\\beta)$는 "코·코 − 사·사"로 빼기입니다.',
          '빼는 순서를 거꾸로 했습니다. $75^\\circ$는 예각이므로 코사인 값은 양수입니다.',
          '$\\cos 45^\\circ+\\cos 30^\\circ=\\frac{\\sqrt{2}}{2}+\\frac{\\sqrt{3}}{2}$처럼 각각의 값을 더했습니다. 이 값은 1보다 커서 코사인 값이 될 수 없습니다. 덧셈정리를 써야 합니다.',
        ],
        explain: '$\\cos 75^\\circ=\\cos(45^\\circ+30^\\circ)=\\cos 45^\\circ\\cos 30^\\circ-\\sin 45^\\circ\\sin 30^\\circ=\\frac{\\sqrt{6}}{4}-\\frac{\\sqrt{2}}{4}=\\frac{\\sqrt{6}-\\sqrt{2}}{4}$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', concept: 2,
        q: '$\\tan\\alpha=\\frac{1}{2}$, $\\tan\\beta=\\frac{1}{3}$일 때, $\\tan(\\alpha+\\beta)$의 값을 구하십시오.',
        answer: '1',
        wrong: [
          { a: '5/6', why: '분자 $\\tan\\alpha+\\tan\\beta$만 계산했습니다. 분모 $1-\\tan\\alpha\\tan\\beta$로 나누어야 합니다.' },
          { a: '5/7', why: '분모를 $1+\\tan\\alpha\\tan\\beta$로 썼습니다. 더하기 공식의 분모는 $1-\\tan\\alpha\\tan\\beta$입니다.' },
        ],
        explain: '$\\tan(\\alpha+\\beta)=\\dfrac{\\frac{1}{2}+\\frac{1}{3}}{1-\\frac{1}{2} \\cdot \\frac{1}{3}}=\\dfrac{\\frac{5}{6}}{\\frac{5}{6}}=1$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'ox', concept: 1,
        q: '모든 실수 $\\alpha$, $\\beta$에 대하여 $\\sin(\\alpha+\\beta)=\\sin\\alpha+\\sin\\beta$입니다.',
        answer: false,
        explain: '$\\alpha=\\beta=\\frac{\\pi}{4}$이면 $\\sin\\frac{\\pi}{2}=1$이지만 $\\sin\\frac{\\pi}{4}+\\sin\\frac{\\pi}{4}=\\sqrt{2}$입니다. 바른 식은 $\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 4,
        q: '$\\lim_{x \\to 0}\\dfrac{\\sin 5x}{x}$의 값을 구하십시오.',
        answer: '5',
        wrong: [{ a: '1', why: '$\\frac{\\sin x}{x} \\to 1$을 그대로 썼습니다. 분모를 $5x$로 맞추면 5를 곱해야 합니다.' }],
        explain: '$\\dfrac{\\sin 5x}{x}=\\dfrac{\\sin 5x}{5x} \\times 5 \\to 1 \\times 5=5$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 5,
        q: '함수 $y=2\\sin x+\\cos x$의 도함수는 무엇입니까?',
        choices: ['$2\\cos x-\\sin x$', '$2\\cos x+\\sin x$', '$-2\\cos x+\\sin x$', '$2\\sin x-\\cos x$'],
        answer: 0,
        why: [
          '',
          '$(\\cos x)\'=-\\sin x$의 부호를 빠뜨렸습니다.',
          '$(\\sin x)\'=\\cos x$에는 마이너스가 붙지 않습니다. 마이너스는 $(\\cos x)\'$에 붙습니다.',
          '미분하지 않고 사인과 코사인의 자리만 바꾸었습니다. $(\\sin x)\'=\\cos x$, $(\\cos x)\'=-\\sin x$입니다.',
        ],
        explain: '$(\\sin x)\'=\\cos x$, $(\\cos x)\'=-\\sin x$이므로 $y\'=2\\cos x-\\sin x$입니다.',
      },
      {
        id: 'p8', level: 1, type: 'short', check: 'number', concept: 5,
        q: '함수 $f(x)=\\sin x+\\cos x$에 대하여 $f\'\\left(\\frac{\\pi}{2}\\right)$의 값을 구하십시오.',
        answer: '-1',
        wrong: [{ a: '1', why: '$(\\cos x)\'$을 $\\sin x$로 계산했습니다. $(\\cos x)\'=-\\sin x$입니다.' }],
        explain: '$f\'(x)=\\cos x-\\sin x$이므로 $f\'\\left(\\frac{\\pi}{2}\\right)=\\cos\\frac{\\pi}{2}-\\sin\\frac{\\pi}{2}=0-1=-1$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', fixed: true, concept: 3,
        q: '두 직선 $y=3x+1$, $y=\\frac{1}{2}x-2$가 이루는 예각의 크기는 무엇입니까?',
        choices: ['$\\frac{\\pi}{6}$', '$\\frac{\\pi}{4}$', '$\\frac{\\pi}{3}$', '$\\frac{5\\pi}{12}$'],
        answer: 1,
        why: [
          '$\\tan\\frac{\\pi}{6}=\\frac{\\sqrt{3}}{3}$입니다. 공식으로 구한 $\\tan\\theta$의 값을 다시 계산해 보십시오.',
          '',
          '$\\tan\\frac{\\pi}{3}=\\sqrt{3}$입니다. 분모 $1+m_1m_2$를 $1+\\frac{3}{2}=\\frac{5}{2}$로 계산했는지 확인해 보십시오.',
          '두 직선이 $x$축과 이루는 각의 차를 어림했습니다. 공식 $\\tan\\theta=\\left|\\frac{m_1-m_2}{1+m_1m_2}\\right|$로 계산합니다.',
        ],
        hint: '$\\tan\\theta=\\left|\\dfrac{m_1-m_2}{1+m_1m_2}\\right|$를 씁니다.',
        explain: '두 기울기가 3과 $\\frac{1}{2}$이므로 $\\tan\\theta=\\left|\\dfrac{3-\\frac{1}{2}}{1+3 \\cdot \\frac{1}{2}}\\right|=\\left|\\dfrac{\\frac{5}{2}}{\\frac{5}{2}}\\right|=1$입니다. 따라서 $\\theta=\\frac{\\pi}{4}$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 1,
        q: '$0<\\alpha<\\frac{\\pi}{2}$, $0<\\beta<\\frac{\\pi}{2}$이고 $\\sin\\alpha=\\frac{3}{5}$, $\\cos\\beta=\\frac{5}{13}$일 때, $\\sin(\\alpha+\\beta)$의 값을 구하십시오.',
        answer: '63/65',
        hint: '먼저 $\\cos\\alpha$와 $\\sin\\beta$를 구합니다. 두 각이 예각이므로 모두 양수입니다.',
        wrong: [
          { a: '-33/65', why: '$\\sin(\\alpha-\\beta)$의 공식을 썼습니다. 사인의 덧셈정리는 괄호 안과 같은 부호인 더하기입니다.' },
          { a: '-16/65', why: '$\\cos(\\alpha+\\beta)$를 구했습니다. 사인의 덧셈정리는 "사·코 + 코·사"입니다.' },
        ],
        explain: '$\\cos\\alpha=\\sqrt{1-\\frac{9}{25}}=\\frac{4}{5}$, $\\sin\\beta=\\sqrt{1-\\frac{25}{169}}=\\frac{12}{13}$입니다. $\\sin(\\alpha+\\beta)=\\frac{3}{5} \\cdot \\frac{5}{13}+\\frac{4}{5} \\cdot \\frac{12}{13}=\\frac{15+48}{65}=\\frac{63}{65}$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 5,
        q: '함수 $f(x)=x\\sin x$에 대하여 $f\'\\left(\\frac{\\pi}{2}\\right)$의 값을 구하십시오.',
        answer: '1',
        hint: '곱의 미분법을 씁니다.',
        wrong: [{ a: '0', why: '$x \\cdot (\\sin x)\'=x\\cos x$만 계산했습니다. 곱의 미분법에서 $(x)\' \\cdot \\sin x=\\sin x$ 항도 더해야 합니다.' }],
        explain: '$f\'(x)=1 \\cdot \\sin x+x\\cos x$이므로 $f\'\\left(\\frac{\\pi}{2}\\right)=\\sin\\frac{\\pi}{2}+\\frac{\\pi}{2}\\cos\\frac{\\pi}{2}=1+0=1$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 4,
        q: '$\\lim_{x \\to 0}\\dfrac{1-\\cos x}{x^2}$의 값을 구하십시오.',
        answer: '1/2',
        hint: '분자와 분모에 $1+\\cos x$를 곱해 보십시오.',
        wrong: [
          { a: '0', why: '분자가 0으로 가는 것만 보았습니다. 분모도 0으로 가는 $\\frac{0}{0}$ 꼴이므로 식을 바꾸어 조사합니다.' },
          { a: '1', why: '$\\frac{\\sin^2 x}{x^2} \\to 1$까지만 계산하고 $\\frac{1}{1+\\cos x} \\to \\frac{1}{2}$을 빠뜨렸습니다.' },
        ],
        explain: '$\\dfrac{1-\\cos x}{x^2}=\\dfrac{(1-\\cos x)(1+\\cos x)}{x^2(1+\\cos x)}=\\dfrac{\\sin^2 x}{x^2} \\cdot \\dfrac{1}{1+\\cos x}$이고, $\\left(\\frac{\\sin x}{x}\\right)^2 \\to 1$, $\\frac{1}{1+\\cos x} \\to \\frac{1}{2}$이므로 극한값은 $\\frac{1}{2}$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 3,
        q: '원점을 지나고 직선 $y=2x$와 이루는 예각의 크기가 $\\frac{\\pi}{4}$인 직선은 두 개입니다. 이 두 직선의 기울기의 합을 구하십시오.',
        answer: '-8/3',
        hint: '구하는 직선의 기울기를 $m$이라 하고 $\\left|\\frac{m-2}{1+2m}\\right|=\\tan\\frac{\\pi}{4}$를 풉니다.',
        wrong: [
          { a: '-1', why: '두 기울기의 곱을 구했습니다. $-3+\\frac{1}{3}$을 계산합니다.' },
          { a: '1/3', why: '두 직선 가운데 하나의 기울기만 구했습니다. 절댓값을 풀면 두 경우가 나옵니다.' },
        ],
        explain: '$\\left|\\dfrac{m-2}{1+2m}\\right|=1$이므로 $m-2=1+2m$ 또는 $m-2=-(1+2m)$입니다. 앞의 식에서 $m=-3$, 뒤의 식에서 $3m=1$, $m=\\frac{1}{3}$입니다. 기울기의 합은 $-3+\\frac{1}{3}=-\\frac{8}{3}$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 4,
        q: '두 상수 $a$, $b$에 대하여 $\\lim_{x \\to 0}\\dfrac{\\sqrt{x+a}-b}{\\sin x}=\\frac{1}{4}$일 때, $a+b$의 값을 구하십시오. (단, $b>0$)',
        answer: '6',
        hint: '분모가 0으로 가므로 분자도 0으로 가야 합니다.',
        wrong: [{ a: '20', why: '$\\frac{1}{2b}=\\frac{1}{4}$을 $\\frac{1}{b}=\\frac{1}{4}$로 계산했습니다. 유리화하면 분모에 $\\sqrt{x+a}+b \\to 2b$가 남습니다.' }],
        explain: '$x \\to 0$일 때 분모 $\\sin x \\to 0$이므로 분자도 0으로 가야 합니다. $\\sqrt{a}-b=0$, 곧 $a=b^2$입니다.\n\n분자를 유리화하면 $\\dfrac{x}{(\\sqrt{x+a}+b)\\sin x}=\\dfrac{x}{\\sin x} \\cdot \\dfrac{1}{\\sqrt{x+a}+b} \\to 1 \\times \\dfrac{1}{2b}$입니다. $\\frac{1}{2b}=\\frac{1}{4}$에서 $b=2$, $a=4$이므로 $a+b=6$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 5,
        q: '함수 $f(x)=a\\sin x+b\\cos x$가 $f(0)=2$, $f\'(0)=3$을 만족시킬 때, $f\\left(\\frac{\\pi}{2}\\right)+f\'\\left(\\frac{\\pi}{2}\\right)$의 값을 구하십시오.',
        answer: '1',
        hint: '$f\'(x)=a\\cos x-b\\sin x$입니다.',
        wrong: [{ a: '5', why: '$(\\cos x)\'$을 $\\sin x$로 계산했습니다. $f\'\\left(\\frac{\\pi}{2}\\right)=-b=-2$입니다.' }],
        explain: '$f(0)=b=2$이고, $f\'(x)=a\\cos x-b\\sin x$이므로 $f\'(0)=a=3$입니다. $f\\left(\\frac{\\pi}{2}\\right)=a=3$, $f\'\\left(\\frac{\\pi}{2}\\right)=-b=-2$이므로 합은 $1$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 2,
        q: '이차방정식 $x^2-5x+6=0$의 두 근이 $\\tan\\alpha$, $\\tan\\beta$일 때, $\\tan(\\alpha+\\beta)$의 값을 구하십시오.',
        answer: '-1',
        hint: '근과 계수의 관계로 $\\tan\\alpha+\\tan\\beta$와 $\\tan\\alpha\\tan\\beta$를 구합니다.',
        wrong: [
          { a: '5/7', why: '분모를 $1+\\tan\\alpha\\tan\\beta$로 썼습니다. 더하기 공식의 분모는 $1-\\tan\\alpha\\tan\\beta$입니다.' },
          { a: '5', why: '분자 $\\tan\\alpha+\\tan\\beta$만 구했습니다. 분모로 나누어야 합니다.' },
        ],
        explain: '근과 계수의 관계에서 $\\tan\\alpha+\\tan\\beta=5$, $\\tan\\alpha\\tan\\beta=6$입니다. 따라서 $\\tan(\\alpha+\\beta)=\\dfrac{5}{1-6}=-1$입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 4,
        q: '$\\lim_{x \\to \\pi}\\dfrac{\\sin x}{x-\\pi}$의 값을 구하십시오.',
        answer: '-1',
        hint: '$x-\\pi=t$로 놓고 $\\sin(\\pi+t)$를 덧셈정리로 바꿉니다.',
        wrong: [{ a: '1', why: '$\\sin(\\pi+t)=-\\sin t$의 부호를 놓쳤습니다.' }],
        explain: '$x-\\pi=t$로 놓으면 $x \\to \\pi$일 때 $t \\to 0$입니다. 덧셈정리로 $\\sin(\\pi+t)=\\sin\\pi\\cos t+\\cos\\pi\\sin t=-\\sin t$이므로 $\\dfrac{\\sin x}{x-\\pi}=\\dfrac{-\\sin t}{t} \\to -1$입니다.',
      },
    ],

    deeper: [
      {
        title: '덧셈정리에서 나오는 배각 공식',
        body: '덧셈정리에서 $\\beta=\\alpha$로 놓으면 **배각 공식**을 얻습니다.\n\n- $\\sin 2\\alpha=2\\sin\\alpha\\cos\\alpha$\n- $\\cos 2\\alpha=\\cos^2\\alpha-\\sin^2\\alpha=2\\cos^2\\alpha-1=1-2\\sin^2\\alpha$\n- $\\tan 2\\alpha=\\dfrac{2\\tan\\alpha}{1-\\tan^2\\alpha}$\n\n$\\cos 2\\alpha=1-2\\sin^2\\alpha$를 거꾸로 쓰면 $\\sin^2\\alpha=\\dfrac{1-\\cos 2\\alpha}{2}$가 됩니다. 제곱을 없애 주는 이 식은 뒤에서 삼각함수를 적분할 때 아주 유용하게 쓰입니다. 덧셈정리 하나에서 많은 공식이 줄줄이 나오므로, 공식을 외우기보다 덧셈정리에서 끌어내는 연습을 해 두면 좋습니다.',
      },
      {
        title: '왜 라디안이어야 할까?',
        body: '각을 도(°)로 재면 $x^\\circ=\\frac{\\pi}{180}x$ 라디안이므로\n\n$\\lim_{x \\to 0}\\dfrac{\\sin x^\\circ}{x}=\\lim_{x \\to 0}\\dfrac{\\sin\\frac{\\pi x}{180}}{x}=\\frac{\\pi}{180}$\n\n이 되어 1이 아닙니다. 그러면 $\\sin x^\\circ$를 미분할 때마다 $\\frac{\\pi}{180}$라는 군더더기가 붙습니다.\n\n라디안은 "반지름 1인 원에서 호의 길이"로 각을 재는 방법이라서, 아주 작은 각에서 호의 길이와 사인값(높이)이 거의 같아집니다. 그래서 $\\frac{\\sin x}{x} \\to 1$이 깔끔하게 성립하고, $(\\sin x)\'=\\cos x$처럼 가장 단순한 미분 공식을 얻습니다. 이것이 미적분에서 라디안을 쓰는 까닭입니다.',
      },
    ],

    faq: [
      {
        q: 'sin(α+β)는 왜 sin α + sin β가 아닌가요?',
        a: '사인은 각에 비례하는 함수가 아니기 때문입니다. $\\sin 30^\\circ=\\frac{1}{2}$이지만 $\\sin 60^\\circ$는 1이 아니라 $\\frac{\\sqrt{3}}{2}$입니다. 각을 두 배로 늘려도 사인값은 두 배가 되지 않습니다. 그래서 두 각을 더한 각의 사인은 덧셈정리 $\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta$로 구해야 합니다.',
      },
      {
        q: '덧셈정리를 쉽게 외우는 방법이 있나요?',
        a: '사인은 "사·코, 코·사"이고 가운데 부호가 괄호 안과 같습니다. 코사인은 "코·코, 사·사"이고 가운데 부호가 괄호 안과 반대입니다. 탄젠트는 분자의 부호가 괄호 안과 같고, 분모 $1 \\mp \\tan\\alpha\\tan\\beta$의 부호는 괄호 안과 반대입니다. 헷갈리면 $\\alpha=\\beta=0$이나 $\\beta=\\frac{\\pi}{2}$처럼 쉬운 값을 넣어 확인해 보십시오.',
      },
      {
        q: 'cos x를 미분하면 왜 마이너스가 붙나요?',
        a: '$y=\\cos x$의 그래프는 $x=0$에서 꼭대기이고 그 뒤로 내려갑니다. $0<x<\\pi$에서 그래프가 내려가므로 도함수가 음수여야 하는데, 이 구간에서 $\\sin x$는 양수입니다. 그래서 $-\\sin x$가 됩니다. 식으로는 덧셈정리 $\\cos(x+h)=\\cos x\\cos h-\\sin x\\sin h$의 빼기에서 마이너스가 나옵니다.',
      },
      {
        q: 'lim sin x / x = 1은 각을 도(°)로 써도 성립하나요?',
        a: '성립하지 않습니다. 각을 도로 재면 극한값이 $\\frac{\\pi}{180}$가 됩니다. $\\lim_{x \\to 0}\\frac{\\sin x}{x}=1$과 $(\\sin x)\'=\\cos x$는 모두 각을 라디안으로 잴 때의 결과입니다. 미적분 문제에서 삼각함수의 각은 따로 말이 없으면 라디안입니다.',
      },
    ],

    mistakes: [
      '$\\sin(\\alpha+\\beta)=\\sin\\alpha+\\sin\\beta$로 계산하는 실수 — 덧셈정리 $\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta$를 씁니다.',
      '$\\cos(\\alpha+\\beta)$의 가운데 부호를 더하기로 쓰는 실수 — 코사인은 괄호 안과 부호가 반대이므로 $\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$입니다.',
      '$(\\cos x)\'=\\sin x$로 부호를 빠뜨리는 실수 — $(\\cos x)\'=-\\sin x$입니다.',
    ],

    gens: [
      {
        id: 'trig-limit',
        level: 1,
        title: 'sin x / x 꼴의 극한',
        make: function (R) {
          var kind = R.pick(['sin', 'sin', 'tan', 'sinsin']);
          var p = R.nonzero(-5, 6), q = R.int(1, 6);
          if (p === q) q = q === 6 ? 5 : q + 1;
          var ans = R.F(p, q);
          var mult = R.fmt.frac(ans);
          var multTex = ans.sign() < 0 ? '\\left(' + mult + '\\right)' : mult;
          var expr, explain;
          if (kind === 'sinsin') {
            expr = '\\dfrac{' + trig('sin', p) + '}{' + trig('sin', q) + '}';
            explain = '분자와 분모를 각각 $x$로 나누면 $\\dfrac{\\frac{' + trig('sin', p) + '}{x}}{\\frac{' + trig('sin', q) + '}{x}}$입니다. $\\dfrac{' + trig('sin', p) + '}{x}=\\dfrac{' + trig('sin', p) + '}{' + kx(p) + '} \\times ' + R.fmt.paren(p) + ' \\to ' + p + '$이고 같은 방법으로 분모는 $' + q + '$에 가까워지므로 극한값은 $' + mult + '$입니다.';
          } else {
            var f = kind;
            expr = '\\dfrac{' + trig(f, p) + '}{' + kx(q) + '}';
            explain = '분모를 $' + kx(p) + '$' + R.josa('x', '으로/로') + ' 맞춥니다. $' + expr + '=\\dfrac{' + trig(f, p) + '}{' + kx(p) + '} \\times ' + multTex + '$\n\n' +
              (f === 'tan' ? '$\\dfrac{' + trig('tan', p) + '}{' + kx(p) + '}=\\dfrac{' + trig('sin', p) + '}{' + kx(p) + '} \\cdot \\dfrac{1}{' + trig('cos', p) + '} \\to 1 \\times 1=1$' : '$' + kx(p) + ' \\to 0$이므로 $\\dfrac{' + trig('sin', p) + '}{' + kx(p) + '} \\to 1$') +
              '입니다. 따라서 극한값은 $1 \\times ' + multTex + '=' + mult + '$입니다.';
          }
          var wrongs = [
            [R.F(q, p), '분자와 분모의 계수를 거꾸로 놓았습니다. 분자의 각 $' + kx(p) + '$에 맞추어 분모를 고칩니다.'],
            [R.F(1), '$\\frac{\\sin x}{x} \\to 1$을 그대로 썼습니다. 삼각함수 안의 각과 분모가 같아야 1입니다.'],
          ];
          if (q !== 1) wrongs.push([R.F(p), '분모의 계수 ' + q + R.josa(q, '을/를') + ' 빠뜨렸습니다.']);
          return {
            type: 'short', check: 'number', concept: 4,
            q: '$\\lim_{x \\to 0}' + expr + '$의 값을 구하십시오.',
            answer: ans.toString(),
            wrong: dedupe(ans, wrongs),
            explain: explain,
          };
        },
      },
      {
        id: 'trig-deriv-value',
        level: 1,
        title: 'sin x, cos x가 들어 있는 함수의 미분계수',
        make: function (R) {
          var i = R.int(0, 3);
          var cosv = [1, 0, -1, 0][i], sinv = [0, 1, 0, -1][i];
          var tTex = ['0', '\\frac{\\pi}{2}', '\\pi', '\\frac{3\\pi}{2}'][i];
          var a = R.nonzero(-5, 5), b = R.nonzero(-5, 5), c = R.int(-4, 4);
          var f = T(a, '\\sin x', true) + T(b, '\\cos x', false) + T(c, 'x', false);
          var fp = T(a, '\\cos x', true) + T(-b, '\\sin x', false) + (c ? R.fmt.signed(c) : '');
          var ans = R.F(a * cosv - b * sinv + c);
          var fArg = i === 0 ? 'f\'(0)' : 'f\'\\left(' + tTex + '\\right)';
          var wrongs = [
            [R.F(a * cosv + b * sinv + c), '$(\\cos x)\'=-\\sin x$의 부호를 빠뜨렸습니다.'],
            [R.F(a * sinv + b * cosv + c), '미분하지 않은 $\\sin x$, $\\cos x$에 값을 넣었습니다. $(\\sin x)\'=\\cos x$, $(\\cos x)\'=-\\sin x$입니다.'],
            [R.F(-a * cosv - b * sinv + c), '$(\\sin x)\'$에 마이너스를 붙였습니다. 마이너스는 $(\\cos x)\'$에만 붙습니다.'],
          ];
          return {
            type: 'short', check: 'number', concept: 5,
            q: '함수 $f(x)=' + f + '$에 대하여 $' + fArg + '$의 값을 구하십시오.',
            answer: ans.toString(),
            wrong: dedupe(ans, wrongs),
            explain: '$f\'(x)=' + fp + '$입니다. $\\cos ' + tTex + '=' + cosv + '$, $\\sin ' + tTex + '=' + sinv + '$이므로 $' + fArg + '=' + a + ' \\times ' + R.fmt.paren(cosv) + '-' + R.fmt.paren(b) + ' \\times ' + R.fmt.paren(sinv) + (c ? R.fmt.signed(c) : '') + '=' + ans.toString() + '$입니다.',
          };
        },
      },
      {
        id: 'add-formula-value',
        level: 2,
        title: '덧셈정리로 삼각함수의 값 구하기',
        make: function (R) {
          var triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];
          var t1 = R.pick(triples), t2 = R.pick(triples);
          var o1 = R.bool(), o2 = R.bool();
          var sA = R.F(o1 ? t1[0] : t1[1], t1[2]), cA = R.F(o1 ? t1[1] : t1[0], t1[2]);
          var sB = R.F(o2 ? t2[0] : t2[1], t2[2]), cB = R.F(o2 ? t2[1] : t2[0], t2[2]);
          if (sA.eq(sB)) { var tmp = sB; sB = cB; cB = tmp; }
          var giveA = R.bool() ? 'sin' : 'cos', giveB = R.bool() ? 'sin' : 'cos';
          var target = R.pick(['sin+', 'sin-', 'cos+', 'cos-']);
          var v = {
            'sin+': sA.mul(cB).add(cA.mul(sB)), 'sin-': sA.mul(cB).sub(cA.mul(sB)),
            'cos+': cA.mul(cB).sub(sA.mul(sB)), 'cos-': cA.mul(cB).add(sA.mul(sB)),
          };
          var ans = v[target];
          var fn = target.slice(0, 3), op = target.charAt(3);
          var F = R.fmt.frac;
          var given = function (g, s, c, ang) { return '\\' + g + '\\' + ang + '=' + F(g === 'sin' ? s : c); };
          var other = function (g, s, c, ang) {
            var h = g === 'sin' ? 'cos' : 'sin', known = g === 'sin' ? s : c, val = g === 'sin' ? c : s;
            return '$\\' + h + '\\' + ang + '=\\sqrt{1-\\left(' + F(known) + '\\right)^2}=' + F(val) + '$';
          };
          var formula = {
            'sin+': ['\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta', F(sA) + ' \\cdot ' + F(cB) + '+' + F(cA) + ' \\cdot ' + F(sB)],
            'sin-': ['\\sin\\alpha\\cos\\beta-\\cos\\alpha\\sin\\beta', F(sA) + ' \\cdot ' + F(cB) + '-' + F(cA) + ' \\cdot ' + F(sB)],
            'cos+': ['\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta', F(cA) + ' \\cdot ' + F(cB) + '-' + F(sA) + ' \\cdot ' + F(sB)],
            'cos-': ['\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta', F(cA) + ' \\cdot ' + F(cB) + '+' + F(sA) + ' \\cdot ' + F(sB)],
          }[target];
          var flip = fn + (op === '+' ? '-' : '+');
          var cross = (fn === 'sin' ? 'cos' : 'sin') + op;
          var wrongs = [
            [v[flip], (fn === 'sin' ? '사인은 괄호 안과 같은 부호입니다.' : '코사인은 괄호 안과 반대 부호입니다.') + ' 가운데 부호를 다시 확인해 보십시오.'],
            [fn === 'sin' ? (op === '+' ? sA.add(sB) : sA.sub(sB)) : (op === '+' ? cA.add(cB) : cA.sub(cB)), '각각의 값을 그대로 ' + (op === '+' ? '더했습니다' : '뺐습니다') + '. 덧셈정리를 써야 합니다.'],
            [v[cross], (fn === 'sin' ? '코사인' : '사인') + '의 덧셈정리를 썼습니다. 구하는 것은 $\\' + fn + '(\\alpha' + op + '\\beta)$입니다.'],
          ];
          return {
            type: 'short', check: 'number', concept: 1,
            q: '$0<\\alpha<\\frac{\\pi}{2}$, $0<\\beta<\\frac{\\pi}{2}$이고 $' + given(giveA, sA, cA, 'alpha') + '$, $' + given(giveB, sB, cB, 'beta') + '$일 때, $\\' + fn + '(\\alpha' + op + '\\beta)$의 값을 구하십시오.',
            answer: ans.toString(),
            hint: '두 각이 예각이므로 사인과 코사인이 모두 양수입니다. 모르는 값을 먼저 구합니다.',
            wrong: dedupe(ans, wrongs),
            explain: '두 각이 예각이므로 ' + other(giveA, sA, cA, 'alpha') + ', ' + other(giveB, sB, cB, 'beta') + '입니다.\n\n$\\' + fn + '(\\alpha' + op + '\\beta)=' + formula[0] + '=' + formula[1] + '=' + F(ans) + '$입니다.',
          };
        },
      },
      {
        id: 'line-angle',
        level: 2,
        title: '두 직선이 이루는 예각의 탄젠트',
        make: function (R) {
          var pool = [R.F(1), R.F(2), R.F(3), R.F(4), R.F(-1), R.F(-2), R.F(-3), R.F(1, 2), R.F(-1, 2), R.F(1, 3)];
          var m1 = R.pick(pool), m2 = R.pick(pool), guard = 0;
          while ((m1.eq(m2) || m1.mul(m2).add(1).isZero()) && guard < 50) { m2 = R.pick(pool); guard++; }
          if (m1.eq(m2) || m1.mul(m2).add(1).isZero()) { m1 = R.F(2); m2 = R.F(-3); }
          var n1 = R.int(-3, 3), n2 = R.int(-3, 3);
          var top = m1.sub(m2), bot = m1.mul(m2).add(1);
          var raw = top.div(bot);
          var ans = raw.abs();
          var F = R.fmt.frac;
          var wrongs = [];
          if (raw.sign() < 0) wrongs.push([raw, '예각의 탄젠트는 양수입니다. 절댓값을 붙여야 합니다.']);
          wrongs.push([bot.div(top).abs(), '분자와 분모를 거꾸로 놓았습니다. $\\tan\\theta=\\left|\\frac{m_1-m_2}{1+m_1m_2}\\right|$입니다.']);
          var bot2 = R.F(1).sub(m1.mul(m2));
          if (!bot2.isZero()) wrongs.push([top.div(bot2).abs(), '분모를 $1-m_1m_2$로 썼습니다. 두 직선이 이루는 각의 공식에서 분모는 $1+m_1m_2$입니다.']);
          var P = function (m) { return m.sign() < 0 || !m.isInt() ? '\\left(' + F(m) + '\\right)' : F(m); };
          return {
            type: 'short', check: 'number', concept: 3,
            q: '다음 두 직선이 이루는 예각의 크기를 $\\theta$라 할 때, $\\tan\\theta$의 값을 구하십시오.\n\n$y=' + R.fmt.poly([m1, n1]) + '$, $\\quad y=' + R.fmt.poly([m2, n2]) + '$',
            answer: ans.toString(),
            hint: '$\\tan\\theta=\\left|\\dfrac{m_1-m_2}{1+m_1m_2}\\right|$를 씁니다.',
            wrong: dedupe(ans, wrongs),
            explain: '두 직선의 기울기는 $' + F(m1) + '$, $' + F(m2) + '$입니다. $\\tan\\theta=\\left|\\dfrac{' + F(m1) + '-' + P(m2) + '}{1+' + P(m1) + ' \\cdot ' + P(m2) + '}\\right|=\\left|\\dfrac{' + F(top) + '}{' + F(bot) + '}\\right|=' + F(ans) + '$입니다.',
          };
        },
      },
    ],
  });
})();
