/* 대수 · 삼각함수의 그래프
 * y=sin x, y=cos x 의 그래프와 주기·치역, y=tan x 의 그래프와 점근선, y=a sin(bx+c)+d 꼴의 주기·최댓값·최솟값,
 * -x, π±x, π/2±x 의 삼각함수(그래프의 대칭·평행이동), 그래프로 푸는 간단한 삼각방정식·삼각부등식을 다룬다. */
(function () {
  var F = TutorMath.F;
  var QUAD = ['제1사분면', '제2사분면', '제3사분면', '제4사분면'];
  // Frac f × π → [답 칸 글자, TeX]
  function piStr(f) {
    if (f.isZero()) return ['0', '0'];
    var a = Math.abs(f.num), b = f.den, s = f.num < 0 ? '-' : '';
    var top = (a === 1 ? '' : a) + 'π', topT = (a === 1 ? '' : a) + '\\pi';
    if (b === 1) return [s + top, s + topT];
    return [s + top + '/' + b, s + '\\frac{' + topT + '}{' + b + '}'];
  }
  function radStr(d) { return piStr(F(d, 180))[0]; }
  function radTex(d) { return piStr(F(d, 180))[1]; }

  // 특수한 각의 값 열쇠 (단원 math-h-alg-07 과 같은 약속)
  var VAL = { '0': '0', '1': '1', 'h': '\\frac{1}{2}', 'r2': '\\frac{\\sqrt{2}}{2}', 'r3': '\\frac{\\sqrt{3}}{2}', 't1': '\\frac{\\sqrt{3}}{3}', 't3': '\\sqrt{3}' };
  function vt(k) { var n = k.charAt(0) === '-'; return (n ? '-' : '') + VAL[n ? k.slice(1) : k]; }
  function neg(k) { return k === '0' || k === 'none' ? k : k.charAt(0) === '-' ? k.slice(1) : '-' + k; }
  var BASE_COS = { 0: '1', 30: 'r3', 45: 'r2', 60: 'h', 90: '0' };
  var BASE_SIN = { 0: '0', 30: 'h', 45: 'r2', 60: 'r3', 90: '1' };
  var BASE_TAN = { 0: '0', 30: 't1', 45: '1', 60: 't3' };
  function special(d) {
    var ref = d <= 90 ? d : d <= 180 ? 180 - d : d <= 270 ? d - 180 : 360 - d;
    var cs = d > 90 && d < 270 ? -1 : 1, ss = d > 180 ? -1 : 1;
    var c = BASE_COS[ref], s = BASE_SIN[ref];
    if (cs < 0) c = neg(c);
    if (ss < 0) s = neg(s);
    var t = ref === 90 ? 'none' : BASE_TAN[ref];
    if (t !== 'none' && cs * ss < 0) t = neg(t);
    return { cos: c, sin: s, tan: t };
  }
  var ANGLES = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
  // 방정식 "f(x) = 값" 을 일차식 꼴로: 예 '2\\sin x-1=0'
  var LIN = { 'h': ['2', '1'], 'r2': ['2', '\\sqrt{2}'], 'r3': ['2', '\\sqrt{3}'], '1': ['', '1'], 't1': ['3', '\\sqrt{3}'], 't3': ['', '\\sqrt{3}'] };

  Tutor.registerUnit({
    id: 'math-h-alg-08',
    course: 'math-h-alg',
    title: '삼각함수의 그래프',
    summary: '사인·코사인·탄젠트 함수의 그래프를 그려 주기와 최댓값·최솟값을 알고, 간단한 삼각방정식을 풉니다.',
    goals: [
      '$y=\\sin x$, $y=\\cos x$, $y=\\tan x$의 그래프를 그리고 주기·치역·점근선을 말할 수 있다.',
      '$y=a\\sin(bx+c)+d$ 꼴의 주기와 최댓값·최솟값을 구할 수 있다.',
      '$-x$, $\\pi\\pm x$, $\\frac{\\pi}{2}\\pm x$의 삼각함수를 그래프의 대칭과 평행이동으로 설명하고 값을 구할 수 있다.',
      '그래프를 이용하여 주어진 구간에서 간단한 삼각방정식과 삼각부등식을 풀 수 있다.',
    ],
    standards: ['[12대수02-02]'],

    concepts: [
      {
        title: 'y=sin x, y=cos x의 그래프',
        body: '각을 호도법으로 나타내면 실수 $x$에 대하여 $y=\\sin x$, $y=\\cos x$를 생각할 수 있습니다. 단위원 위의 점이 한 바퀴 돌 때 $y$좌표($\\sin x$)와 $x$좌표($\\cos x$)를 그래프로 옮기면 물결 모양이 됩니다.\n\n| | $y=\\sin x$ | $y=\\cos x$ |\n|---|---|---|\n| 정의역 | 실수 전체 | 실수 전체 |\n| 치역 | $-1\\le y\\le 1$ | $-1\\le y\\le 1$ |\n| 주기 | $2\\pi$ | $2\\pi$ |\n| 대칭 | 원점에 대하여 대칭 | $y$축에 대하여 대칭 |\n| $x=0$일 때 | $y=0$ | $y=1$ |\n\n$x$에 $2\\pi$를 더하면 동경이 한 바퀴 돌아 제자리에 오므로 $\\sin(x+2\\pi)=\\sin x$, $\\cos(x+2\\pi)=\\cos x$입니다. 그래서 그래프는 길이 $2\\pi$마다 같은 모양이 되풀이됩니다.\n\n> 💡 $y=\\cos x$의 그래프는 $y=\\sin x$의 그래프를 $x$축의 방향으로 $-\\frac{\\pi}{2}$만큼 평행이동한 것입니다.',
        easy: '관람차에 탄 사람을 생각해 보십시오. 관람차가 일정한 빠르기로 돌면 사람의 높이는 올라갔다 내려갔다를 끝없이 되풀이합니다. 이 높이를 시간에 따라 그린 것이 사인 그래프입니다.\n\n관람차 반지름이 1이라면 높이는 $-1$과 1 사이에서만 움직이고(치역), 한 바퀴($2\\pi$)마다 같은 움직임이 되풀이됩니다(주기).',
        fig: {
          type: 'coord', xmin: -1, xmax: 7, ymin: -1.6, ymax: 1.6,
          fns: [{ expr: 'sin(x)', label: 'y=sin x' }, { expr: 'cos(x)', label: 'y=cos x' }],
          points: [{ x: 1.5708, y: 1, label: 'π/2' }, { x: 3.1416, y: 0, label: 'π' }, { x: 6.2832, y: 0, label: '2π' }],
          alt: 'y=sin x와 y=cos x의 그래프. 둘 다 -1과 1 사이를 오르내리는 물결 모양이고 2π마다 되풀이된다. sin x는 원점을, cos x는 점 (0, 1)을 지난다',
        },
        check: {
          type: 'choice',
          q: '함수 $y=\\sin x$의 치역은 무엇입니까?',
          choices: ['$\\{y \\mid -1\\le y\\le 1\\}$', '실수 전체', '$\\{y \\mid 0\\le y\\le 1\\}$'],
          answer: 0,
          why: [
            '',
            '실수 전체는 정의역입니다. 함숫값은 단위원 위의 점의 $y$좌표라서 $-1$과 1 사이입니다.',
            '그래프는 $x$축 아래로도 내려갑니다. 예: $\\sin\\frac{3\\pi}{2}=-1$',
          ],
          explain: '$\\sin x$는 단위원 위의 점의 $y$좌표이므로 치역은 $-1\\le y\\le 1$입니다.',
        },
      },
      {
        title: '주기함수와 y=tan x의 그래프',
        body: '함수 $f(x)$의 정의역에 속하는 모든 $x$에 대하여 $f(x+p)=f(x)$를 만족하는 0이 아닌 상수 $p$가 있을 때, $f(x)$를 **주기함수**라 하고, 이런 $p$ 가운데 가장 작은 양수를 **주기**라고 합니다.\n\n$y=\\tan x$의 성질\n\n- 정의역: $x\\ne n\\pi+\\frac{\\pi}{2}$ ($n$은 정수)인 실수 전체 — 이때 $\\cos x=0$이 되어 정의되지 않습니다.\n- 치역: 실수 전체 (최댓값·최솟값이 없습니다)\n- 주기: $\\pi$ — 동경이 반 바퀴 돌면 기울기가 같아지기 때문입니다: $\\tan(x+\\pi)=\\tan x$\n- **점근선**: 직선 $x=n\\pi+\\frac{\\pi}{2}$ ($n$은 정수)\n- 원점에 대하여 대칭: $\\tan(-x)=-\\tan x$\n\n그래프는 점근선 사이에서 왼쪽 아래에서 오른쪽 위로 끝없이 올라가는 곡선이 되풀이되는 모양입니다.',
        easy: '탄젠트는 동경의 기울기입니다. 동경이 $0$에서 $\\frac{\\pi}{2}$ 쪽으로 세워질수록 기울기가 점점 가팔라져 한없이 커지고, $\\frac{\\pi}{2}$에서는 세로선이 되어 기울기가 없습니다(점근선).\n\n동경이 반 바퀴 돌면 같은 직선 위에 놓이므로 기울기도 같습니다. 그래서 탄젠트의 주기는 한 바퀴가 아니라 반 바퀴, $\\pi$입니다.',
        fig: {
          type: 'coord', xmin: -4.8, xmax: 4.8, ymin: -4, ymax: 4,
          fns: [{ expr: 'tan(x)', label: 'y=tan x' }],
          segments: [{ from: [-1.5708, -4], to: [-1.5708, 4], dashed: true }, { from: [1.5708, -4], to: [1.5708, 4], dashed: true }, { from: [4.7124, -4], to: [4.7124, 4], dashed: true }, { from: [-4.7124, -4], to: [-4.7124, 4], dashed: true }],
          alt: 'y=tan x의 그래프. 점선으로 그린 점근선 x=-3π/2, -π/2, π/2, 3π/2 사이마다 오른쪽 위로 올라가는 곡선이 되풀이된다',
        },
        check: {
          type: 'ox',
          q: '함수 $y=\\tan x$의 주기는 $2\\pi$입니다.',
          answer: false,
          explain: '$\\tan(x+\\pi)=\\tan x$이므로 주기는 $\\pi$입니다. 동경이 반 바퀴만 돌아도 같은 직선 위에 놓여 기울기가 같기 때문입니다.',
        },
      },
      {
        title: 'y=a sin(bx+c)+d 꼴의 주기와 최댓값·최솟값',
        body: '$y=a\\sin(bx+c)+d$, $y=a\\cos(bx+c)+d$ ($a\\ne 0$, $b\\ne 0$)에서\n\n- **최댓값** $|a|+d$, **최솟값** $-|a|+d$: $-1\\le\\sin(bx+c)\\le 1$이므로 $|a|$배로 늘이고 $d$만큼 올립니다.\n- **주기** $\\frac{2\\pi}{|b|}$: $bx$가 $2\\pi$만큼 변하려면 $x$는 $\\frac{2\\pi}{|b|}$만큼만 변하면 됩니다.\n- $c$는 그래프를 $x$축의 방향으로 옮길 뿐, 주기와 최댓값·최솟값에 영향을 주지 않습니다. $bx+c=b\\left(x+\\frac{c}{b}\\right)$이므로 $x$축의 방향으로 $-\\frac{c}{b}$만큼 평행이동입니다.\n\n$y=a\\tan(bx+c)+d$는 최댓값·최솟값이 없고 **주기는 $\\frac{\\pi}{|b|}$** 입니다.\n\n예: $y=2\\sin(3x-\\pi)+1$ → 최댓값 $2+1=3$, 최솟값 $-2+1=-1$, 주기 $\\frac{2\\pi}{3}$\n\n> ⚠️ $a$가 음수여도 최댓값은 $|a|+d$입니다. $y=-3\\cos x$는 $\\cos x=-1$일 때 최댓값 3을 가집니다.',
        easy: '$a$는 물결의 높이(위아래로 얼마나 크게 흔들리나), $d$는 물결의 중심선 높이, $b$는 물결이 얼마나 촘촘한가입니다.\n\n$b=2$이면 같은 구간에 물결이 두 배로 촘촘해지므로 한 번 되풀이되는 길이(주기)가 절반이 됩니다. 그래서 주기는 $2\\pi$를 $b$로 나눕니다.',
        fig: {
          type: 'coord', xmin: -0.5, xmax: 6.6, ymin: -2.5, ymax: 2.5,
          fns: [{ expr: 'sin(x)', label: 'y=sin x' }, { expr: '2sin(2x)', label: 'y=2sin 2x' }],
          alt: 'y=sin x와 y=2sin 2x의 그래프. y=2sin 2x는 -2와 2 사이를 오르내리고, 0부터 2π 사이에 두 번 되풀이된다(주기 π)',
        },
        check: {
          type: 'short', check: 'expr',
          q: '함수 $y=3\\cos 2x-1$의 주기를 구하십시오. ($\\pi$는 pi로 써도 됩니다.)',
          answer: 'π',
          wrong: [
            { a: '4π', why: '$2\\pi$에 $b=2$를 곱했습니다. 주기는 $\\frac{2\\pi}{|b|}$입니다.' },
            { a: '2π', why: '$x$의 계수 2를 반영하지 않았습니다. 주기는 $\\frac{2\\pi}{2}$입니다.' },
          ],
          explain: '주기는 $\\frac{2\\pi}{|b|}=\\frac{2\\pi}{2}=\\pi$입니다. $a=3$, $d=-1$은 주기와 관계가 없습니다.',
        },
      },
      {
        title: '-x, π±x, π/2±x의 삼각함수',
        body: '그래프의 대칭과 평행이동(또는 단위원 위의 점의 대칭)으로 다음이 성립합니다.\n\n| 각 | $\\sin$ | $\\cos$ | $\\tan$ |\n|---|---|---|---|\n| $-x$ | $-\\sin x$ | $\\cos x$ | $-\\tan x$ |\n| $\\pi-x$ | $\\sin x$ | $-\\cos x$ | $-\\tan x$ |\n| $\\pi+x$ | $-\\sin x$ | $-\\cos x$ | $\\tan x$ |\n| $\\frac{\\pi}{2}-x$ | $\\cos x$ | $\\sin x$ | $\\frac{1}{\\tan x}$ |\n| $\\frac{\\pi}{2}+x$ | $\\cos x$ | $-\\sin x$ | $-\\frac{1}{\\tan x}$ |\n\n- $-x$: $y=\\sin x$는 원점 대칭, $y=\\cos x$는 $y$축 대칭인 그래프입니다.\n- $\\pi\\pm x$: 단위원에서 $\\pi-x$의 점은 $x$의 점을 $y$축에 대하여, $\\pi+x$의 점은 원점에 대하여 대칭이동한 것입니다.\n- $\\frac{\\pi}{2}\\pm x$: $y=\\cos x$의 그래프가 $y=\\sin x$의 그래프를 평행이동한 것과 같은 관계입니다.\n\n> 💡 기억하는 법: $\\frac{\\pi}{2}\\times n\\pm x$에서 ① $n$이 **짝수**면 함수 그대로, **홀수**면 $\\sin\\leftrightarrow\\cos$ ($\\tan\\to\\frac{1}{\\tan}$)으로 바꿉니다. ② 부호는 $x$를 예각으로 보고 $\\frac{\\pi}{2}\\times n\\pm x$가 놓인 사분면에서 **원래 함수**의 부호를 붙입니다.\n\n예: $\\cos\\left(\\frac{\\pi}{2}+x\\right)$ → $n=1$(홀수)이므로 $\\sin x$로 바꾸고, $\\frac{\\pi}{2}+x$는 제2사분면이라 코사인이 음수이므로 $-\\sin x$',
        easy: '단위원 위의 점 하나 $(\\cos x, \\sin x)$를 접어 옮긴다고 생각하십시오.\n\n- $-x$: $x$축으로 접습니다 → $y$좌표만 부호가 바뀝니다.\n- $\\pi-x$: $y$축으로 접습니다 → $x$좌표만 부호가 바뀝니다.\n- $\\pi+x$: 원점에 대하여 돌립니다 → 둘 다 부호가 바뀝니다.\n- $\\frac{\\pi}{2}-x$: 직선 $y=x$로 접습니다 → 가로와 세로가 바뀝니다(사인과 코사인이 바뀝니다).',
        check: {
          type: 'choice',
          q: '$\\sin(\\pi-x)$와 항상 같은 것은 무엇입니까?',
          choices: ['$\\sin x$', '$-\\sin x$', '$\\cos x$'],
          answer: 0,
          why: [
            '',
            '$\\pi+x$일 때의 결과입니다. $\\pi-x$의 점은 $y$축에 대하여 대칭이라 $y$좌표가 같습니다.',
            '$\\pi$는 $\\frac{\\pi}{2}$의 짝수 배이므로 함수가 바뀌지 않습니다.',
          ],
          explain: '단위원에서 $\\pi-x$의 점은 $x$의 점을 $y$축에 대하여 대칭이동한 점이므로 $y$좌표가 같습니다. 따라서 $\\sin(\\pi-x)=\\sin x$입니다.',
        },
      },
      {
        title: '그래프로 푸는 삼각방정식',
        body: '각의 크기가 미지수인 삼각함수를 포함한 방정식을 **삼각방정식**이라고 합니다. $\\sin x=k$의 해는 $y=\\sin x$의 그래프와 직선 $y=k$의 **교점의 $x$좌표**입니다.\n\n예: $0\\le x<2\\pi$에서 $\\sin x=\\frac{1}{2}$\n\n1. 특수한 각에서 해 하나를 찾습니다: $x=\\frac{\\pi}{6}$\n2. 그래프의 대칭으로 나머지를 찾습니다. $y=\\sin x$는 직선 $x=\\frac{\\pi}{2}$에 대하여 대칭이므로 다른 해는 $\\pi-\\frac{\\pi}{6}=\\frac{5\\pi}{6}$\n3. 해: $x=\\frac{\\pi}{6}$ 또는 $x=\\frac{5\\pi}{6}$\n\n| 방정식 | 한 해가 $\\alpha$일 때 다른 해 ($0\\le x<2\\pi$) |\n|---|---|\n| $\\sin x=k$ | $\\pi-\\alpha$ |\n| $\\cos x=k$ | $2\\pi-\\alpha$ |\n| $\\tan x=k$ | $\\pi+\\alpha$ |\n\n> 💡 $2\\cos x+1=0$처럼 주어지면 먼저 $\\cos x=-\\frac{1}{2}$ 꼴로 바꿉니다. $k=\\pm1$이면 교점이 하나뿐일 수 있으니 그래프로 확인합니다.',
        easy: '삼각방정식은 "물결 모양의 그래프와 가로선이 어디서 만나는가"를 묻는 문제입니다.\n\n$0$부터 $2\\pi$까지 물결은 한 번 올라갔다 내려오므로, 가로선 $y=\\frac{1}{2}$과는 올라갈 때 한 번, 내려올 때 한 번, 모두 두 번 만납니다. 그래서 해가 두 개입니다.',
        fig: {
          type: 'coord', xmin: -0.5, xmax: 6.6, ymin: -1.5, ymax: 1.5,
          fns: [{ expr: 'sin(x)', from: 0, to: 6.2832, label: 'y=sin x' }, { expr: '0.5', from: 0, to: 6.2832, label: 'y=1/2' }],
          points: [{ x: 0.5236, y: 0.5, label: 'π/6' }, { x: 2.618, y: 0.5, label: '5π/6' }],
          alt: '0부터 2π까지 그린 y=sin x의 그래프와 직선 y=1/2. 두 그래프는 x=π/6, x=5π/6에서 만난다',
        },
        check: {
          type: 'short', check: 'set',
          q: '$0\\le x<2\\pi$일 때, 방정식 $\\cos x=0$의 해를 모두 구하십시오. (쉼표로 구분, $\\pi$는 pi로 써도 됩니다.)',
          answer: ['π/2', '3π/2'],
          wrong: [{ a: ['π/2'], why: '$y=\\cos x$는 $0\\le x<2\\pi$에서 $x$축과 두 번 만납니다. $\\frac{3\\pi}{2}$도 해입니다.' }],
          explain: '$\\cos x$는 단위원 위의 점의 $x$좌표이므로 $x$좌표가 0인 점 $(0, 1)$, $(0, -1)$에 해당하는 $x=\\frac{\\pi}{2}$, $\\frac{3\\pi}{2}$가 해입니다.',
        },
      },
      {
        title: '그래프로 푸는 삼각부등식',
        body: '$\\sin x>k$의 해는 $y=\\sin x$의 그래프가 직선 $y=k$보다 **위쪽**에 있는 $x$의 범위입니다. 먼저 방정식 $\\sin x=k$를 풀어 경계를 구한 뒤, 그래프에서 위·아래를 읽습니다.\n\n예: $0\\le x<2\\pi$에서 $\\cos x<\\frac{1}{2}$\n\n1. 경계: $\\cos x=\\frac{1}{2}$에서 $x=\\frac{\\pi}{3}$, $\\frac{5\\pi}{3}$\n2. $y=\\cos x$의 그래프가 $y=\\frac{1}{2}$보다 아래에 있는 부분: $\\frac{\\pi}{3}<x<\\frac{5\\pi}{3}$\n\n> ⚠️ 부등호에 등호가 있으면 경계 값을 넣고, 없으면 뺍니다. 또 $x$의 범위($0\\le x<2\\pi$)의 끝도 확인합니다.',
        easy: '부등식은 "그래프가 가로선보다 위에 있는 구간(또는 아래에 있는 구간)"을 읽는 문제입니다. 손가락으로 그래프를 따라가며 가로선 위로 올라갔다 내려오는 두 지점을 찾으면, 그 사이가 "위쪽" 구간입니다.',
        fig: {
          type: 'coord', xmin: -0.5, xmax: 6.6, ymin: -1.5, ymax: 1.5,
          fns: [{ expr: 'cos(x)', from: 0, to: 6.2832, label: 'y=cos x' }, { expr: '0.5', from: 0, to: 6.2832, label: 'y=1/2' }],
          points: [{ x: 1.0472, y: 0.5, label: 'π/3' }, { x: 5.236, y: 0.5, label: '5π/3' }],
          alt: '0부터 2π까지 그린 y=cos x의 그래프와 직선 y=1/2. x=π/3과 x=5π/3 사이에서 코사인 그래프가 직선보다 아래에 있다',
        },
        check: {
          type: 'choice',
          q: '$0\\le x<2\\pi$일 때, 부등식 $\\sin x<0$의 해는 무엇입니까?',
          choices: ['$\\pi<x<2\\pi$', '$0<x<\\pi$', '$\\frac{\\pi}{2}<x<\\frac{3\\pi}{2}$'],
          answer: 0,
          why: [
            '',
            '$\\sin x>0$인 범위입니다. 그래프가 $x$축 위에 있는 부분입니다.',
            '$\\cos x<0$인 범위입니다. 사인은 $y$좌표이므로 아래쪽 반원(제3, 4사분면)에서 음수입니다.',
          ],
          explain: '$y=\\sin x$의 그래프는 $0\\le x<2\\pi$에서 $\\pi<x<2\\pi$일 때 $x$축보다 아래에 있습니다. 따라서 $\\pi<x<2\\pi$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '함수 $y=2\\sin\\left(2x-\\frac{\\pi}{3}\\right)+1$의 최댓값, 최솟값, 주기를 구하고, 그래프가 $y=2\\sin 2x$의 그래프를 어떻게 평행이동한 것인지 말하십시오.',
        steps: [
          '$-1\\le\\sin\\left(2x-\\frac{\\pi}{3}\\right)\\le 1$이므로 $-2+1\\le y\\le 2+1$, 곧 최댓값 3, 최솟값 $-1$입니다.',
          '주기는 $\\frac{2\\pi}{2}=\\pi$입니다.',
          '$2x-\\frac{\\pi}{3}=2\\left(x-\\frac{\\pi}{6}\\right)$이므로 $y=2\\sin 2\\left(x-\\frac{\\pi}{6}\\right)+1$입니다.',
          '따라서 $y=2\\sin 2x$의 그래프를 $x$축의 방향으로 $\\frac{\\pi}{6}$만큼, $y$축의 방향으로 1만큼 평행이동한 것입니다.',
        ],
        answer: '최댓값 3, 최솟값 $-1$, 주기 $\\pi$',
      },
      {
        q: '$0\\le x<2\\pi$일 때, 방정식 $2\\sin x+1=0$을 푸십시오.',
        steps: [
          '$\\sin x=-\\frac{1}{2}$로 바꿉니다.',
          '사인이 음수이므로 해는 제3, 4사분면의 각입니다. $\\sin\\frac{\\pi}{6}=\\frac{1}{2}$이므로 기준이 되는 예각은 $\\frac{\\pi}{6}$입니다.',
          '제3사분면: $\\pi+\\frac{\\pi}{6}=\\frac{7\\pi}{6}$, 제4사분면: $2\\pi-\\frac{\\pi}{6}=\\frac{11\\pi}{6}$',
          '확인: 두 해는 $\\frac{7\\pi}{6}+\\frac{11\\pi}{6}=3\\pi$로, 그래프의 대칭축 $x=\\frac{3\\pi}{2}$에 대하여 대칭입니다.',
        ],
        answer: '$x=\\frac{7\\pi}{6}$ 또는 $x=\\frac{11\\pi}{6}$',
      },
    ],

    terms: [
      { term: '주기함수', def: '모든 $x$에 대하여 $f(x+p)=f(x)$를 만족하는 0이 아닌 상수 $p$가 있는 함수입니다.' },
      { term: '주기', def: '주기함수에서 $f(x+p)=f(x)$를 만족하는 $p$ 가운데 가장 작은 양수입니다. $\\sin x$, $\\cos x$는 $2\\pi$, $\\tan x$는 $\\pi$입니다.' },
      { term: '점근선', def: '그래프가 한없이 가까워지지만 만나지 않는 직선입니다. $y=\\tan x$의 점근선은 $x=n\\pi+\\frac{\\pi}{2}$ ($n$은 정수)입니다.' },
      { term: '치역', def: '함숫값 전체의 집합입니다. $y=\\sin x$, $y=\\cos x$의 치역은 $\\{y \\mid -1\\le y\\le 1\\}$, $y=\\tan x$의 치역은 실수 전체입니다.' },
      { term: '삼각방정식', def: '각의 크기가 미지수인 삼각함수를 포함한 방정식입니다. 그래프와 직선의 교점으로 풉니다.' },
      { term: '삼각부등식', def: '각의 크기가 미지수인 삼각함수를 포함한 부등식입니다. 그래프가 직선보다 위나 아래에 있는 범위를 읽습니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '함수 $y=\\cos x$의 그래프에 대한 설명으로 **옳지 않은** 것은 무엇입니까?',
        choices: ['원점에 대하여 대칭이다.', '주기가 $2\\pi$이다.', '치역은 $\\{y \\mid -1\\le y\\le 1\\}$이다.', '점 $(0, 1)$을 지난다.'],
        answer: 0,
        why: [
          '',
          '옳은 설명입니다. $\\cos(x+2\\pi)=\\cos x$입니다.',
          '옳은 설명입니다. 코사인은 단위원 위의 점의 $x$좌표입니다.',
          '옳은 설명입니다. $\\cos 0=1$입니다.',
        ],
        explain: '$\\cos(-x)=\\cos x$이므로 $y=\\cos x$의 그래프는 $y$축에 대하여 대칭입니다. 원점에 대하여 대칭인 것은 $y=\\sin x$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'expr', concept: 2,
        q: '함수 $y=\\sin 4x$의 주기를 구하십시오. ($\\pi$는 pi로 써도 됩니다.)',
        answer: 'π/2',
        wrong: [
          { a: '8π', why: '$2\\pi$에 4를 곱했습니다. 물결이 촘촘해지므로 주기는 $\\frac{2\\pi}{4}$로 줄어듭니다.' },
          { a: 'π/4', why: '탄젠트의 주기 공식 $\\frac{\\pi}{|b|}$를 썼습니다. 사인은 $\\frac{2\\pi}{|b|}$입니다.' },
        ],
        explain: '주기는 $\\frac{2\\pi}{|b|}=\\frac{2\\pi}{4}=\\frac{\\pi}{2}$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 2,
        q: '함수 $y=-3\\cos x+2$의 최솟값을 구하십시오.',
        answer: '-1',
        wrong: [{ a: '5', why: '최댓값을 구했습니다. $-3\\cos x$는 $\\cos x=1$일 때 가장 작은 $-3$이 됩니다.' }],
        explain: '$-1\\le\\cos x\\le 1$이므로 $-3\\le -3\\cos x\\le 3$, $-1\\le -3\\cos x+2\\le 5$입니다. 최솟값은 $-1$ ($\\cos x=1$일 때)입니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: '함수 $y=\\tan x$의 그래프의 점근선은 직선 $x=n\\pi+\\frac{\\pi}{2}$ ($n$은 정수)입니다.',
        answer: true,
        explain: '$x=n\\pi+\\frac{\\pi}{2}$에서 $\\cos x=0$이 되어 $\\tan x$가 정의되지 않고, 그래프는 이 직선에 한없이 가까워집니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 3,
        q: '$\\cos(\\pi+x)$와 항상 같은 것은 무엇입니까?',
        choices: ['$-\\cos x$', '$\\cos x$', '$-\\sin x$', '$\\sin x$'],
        answer: 0,
        why: [
          '',
          '$\\pi+x$의 점은 원점에 대하여 대칭이라 $x$좌표의 부호가 바뀝니다.',
          '$\\pi$는 $\\frac{\\pi}{2}$의 짝수 배이므로 코사인이 사인으로 바뀌지 않습니다.',
          '함수도 부호도 다시 확인하십시오. $\\pi$를 더하면 함수는 그대로입니다.',
        ],
        explain: '단위원에서 $\\pi+x$의 점은 $x$의 점을 원점에 대하여 대칭이동한 점이므로 $x$좌표의 부호가 바뀝니다. 따라서 $\\cos(\\pi+x)=-\\cos x$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 3,
        q: '$\\sin\\left(-\\frac{\\pi}{6}\\right)$의 값을 구하십시오.',
        answer: '-1/2',
        wrong: [{ a: '1/2', why: '$\\sin(-x)=-\\sin x$입니다. 사인 그래프는 원점에 대하여 대칭입니다.' }],
        explain: '$\\sin(-x)=-\\sin x$이므로 $\\sin\\left(-\\frac{\\pi}{6}\\right)=-\\sin\\frac{\\pi}{6}=-\\frac{1}{2}$입니다.',
      },
      {
        id: 'p7', level: 2, type: 'short', check: 'set', concept: 4,
        q: '$0\\le x<2\\pi$일 때, 방정식 $2\\cos x+\\sqrt{3}=0$의 해를 모두 구하십시오. (쉼표로 구분, $\\pi$는 pi로 써도 됩니다.)',
        answer: ['5π/6', '7π/6'],
        hint: '$\\cos x=-\\frac{\\sqrt{3}}{2}$으로 바꾸고, 코사인이 음수인 사분면을 생각하십시오.',
        wrong: [
          { a: ['5π/6'], why: '해가 하나 더 있습니다. $\\cos x=k$의 다른 해는 $2\\pi-\\alpha$입니다.' },
          { a: ['π/6', '11π/6'], why: '$\\cos x=\\frac{\\sqrt{3}}{2}$의 해를 구했습니다. 부호를 옮길 때 다시 확인하십시오.' },
        ],
        explain: '$\\cos x=-\\frac{\\sqrt{3}}{2}$입니다. 코사인이 음수인 것은 제2, 3사분면이고, 기준이 되는 예각은 $\\frac{\\pi}{6}$입니다. 따라서 $x=\\pi-\\frac{\\pi}{6}=\\frac{5\\pi}{6}$, $x=\\pi+\\frac{\\pi}{6}=\\frac{7\\pi}{6}$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 5,
        q: '$0\\le x<2\\pi$일 때, 부등식 $\\sin x\\ge\\frac{\\sqrt{2}}{2}$의 해는 무엇입니까?',
        choices: ['$\\frac{\\pi}{4}\\le x\\le\\frac{3\\pi}{4}$', '$0\\le x\\le\\frac{\\pi}{4}$', '$\\frac{\\pi}{4}\\le x\\le\\frac{7\\pi}{4}$', '$\\frac{3\\pi}{4}\\le x\\le\\frac{5\\pi}{4}$'],
        answer: 0,
        why: [
          '',
          '그래프가 직선 $y=\\frac{\\sqrt{2}}{2}$보다 아래에 있는 부분(의 일부)입니다.',
          '코사인 방정식처럼 다른 해를 $2\\pi-\\alpha$로 구했습니다. 사인은 $\\pi-\\alpha$입니다.',
          '경계 두 점 사이를 잘못 골랐습니다. 사인 그래프의 꼭대기 $x=\\frac{\\pi}{2}$를 포함하는 구간이어야 합니다.',
        ],
        hint: '경계는 $\\sin x=\\frac{\\sqrt{2}}{2}$의 해입니다. 그래프가 그보다 위에 있는 부분을 읽으십시오.',
        explain: '$\\sin x=\\frac{\\sqrt{2}}{2}$의 해는 $\\frac{\\pi}{4}$, $\\frac{3\\pi}{4}$입니다. $y=\\sin x$의 그래프가 직선 $y=\\frac{\\sqrt{2}}{2}$보다 위에 있거나 만나는 부분은 $\\frac{\\pi}{4}\\le x\\le\\frac{3\\pi}{4}$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 2,
        q: '함수 $y=a\\sin bx+c$의 최댓값이 5, 최솟값이 $-1$, 주기가 $\\pi$입니다. $a>0$, $b>0$일 때, $a+b+c$의 값을 구하십시오.',
        answer: '7',
        hint: '최댓값은 $a+c$, 최솟값은 $-a+c$, 주기는 $\\frac{2\\pi}{b}$입니다.',
        wrong: [
          { a: '10', why: '$a$를 최댓값과 최솟값의 차 6으로 잡았습니다. 차는 $2a$이므로 $a=3$입니다.' },
          { a: '11/2', why: '주기를 $2\\pi b$로 생각해 $b=\\frac{1}{2}$로 구했습니다. 주기는 $\\frac{2\\pi}{b}$입니다.' },
        ],
        explain: '$a+c=5$, $-a+c=-1$에서 $a=3$, $c=2$입니다. $\\frac{2\\pi}{b}=\\pi$에서 $b=2$입니다. 따라서 $a+b+c=7$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 3,
        q: '$\\sin\\frac{7\\pi}{6}+\\cos\\frac{2\\pi}{3}$의 값을 구하십시오.',
        answer: '-1',
        hint: '$\\frac{7\\pi}{6}=\\pi+\\frac{\\pi}{6}$, $\\frac{2\\pi}{3}=\\pi-\\frac{\\pi}{3}$입니다.',
        wrong: [
          { a: '0', why: '두 값 가운데 하나의 부호를 놓쳤습니다. 둘 다 음수입니다.' },
          { a: '1', why: '두 값의 부호를 모두 놓쳤습니다. $\\sin(\\pi+x)=-\\sin x$, $\\cos(\\pi-x)=-\\cos x$입니다.' },
        ],
        explain: '$\\sin\\frac{7\\pi}{6}=\\sin\\left(\\pi+\\frac{\\pi}{6}\\right)=-\\sin\\frac{\\pi}{6}=-\\frac{1}{2}$, $\\cos\\frac{2\\pi}{3}=\\cos\\left(\\pi-\\frac{\\pi}{3}\\right)=-\\cos\\frac{\\pi}{3}=-\\frac{1}{2}$이므로 합은 $-1$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'expr', concept: 4,
        q: '$0\\le x<2\\pi$일 때, 방정식 $\\tan x=\\sqrt{3}$의 모든 해의 합을 구하십시오. ($\\pi$는 pi로 써도 됩니다.)',
        answer: '5π/3',
        hint: '탄젠트의 주기는 $\\pi$입니다.',
        wrong: [{ a: 'π', why: '사인처럼 다른 해를 $\\pi-\\alpha$로 구했습니다. 탄젠트의 다른 해는 $\\pi+\\alpha$입니다.' }],
        explain: '$\\tan\\frac{\\pi}{3}=\\sqrt{3}$이고 주기가 $\\pi$이므로 해는 $\\frac{\\pi}{3}$, $\\frac{\\pi}{3}+\\pi=\\frac{4\\pi}{3}$입니다. 합은 $\\frac{5\\pi}{3}$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 2,
        q: '그림은 함수 $y=a\\cos bx+c$의 그래프의 일부입니다. 그래프는 점 $(0, 3)$에서 최댓값을, 점 $\\left(\\frac{\\pi}{2}, -1\\right)$에서 최솟값을 가집니다. $a>0$, $b>0$이고 $b$가 가장 작은 값일 때, $a+b+c$의 값을 구하십시오.',
        fig: {
          type: 'coord', xmin: -0.5, xmax: 6.6, ymin: -2, ymax: 4,
          fns: [{ expr: '2cos(2x)+1', from: 0, to: 6.2832 }],
          points: [{ x: 0, y: 3, label: '(0, 3)' }, { x: 1.5708, y: -1, label: '(π/2, -1)' }],
          alt: '0부터 2π까지 그린 코사인 모양의 그래프. 점 (0, 3)에서 최대, 점 (π/2, -1)에서 최소이고 다시 π에서 최대가 된다',
        },
        answer: '5',
        hint: '최대에서 다음 최소까지는 주기의 절반입니다.',
        wrong: [
          { a: '7', why: '최대에서 최소까지의 거리 $\\frac{\\pi}{2}$를 한 주기의 절반이 아니라 한 주기로 보아 $b=4$로 구했습니다. 주기는 $\\pi$이므로 $b=2$입니다.' },
          { a: '4', why: '$b=1$로 놓았습니다. $y=2\\cos x+1$이면 최솟값이 $x=\\pi$에서 나오지만, 그래프는 $x=\\frac{\\pi}{2}$에서 최소입니다.' },
        ],
        explain: '최댓값 $a+c=3$, 최솟값 $-a+c=-1$에서 $a=2$, $c=1$입니다.\n\n최대(0)에서 최소($\\frac{\\pi}{2}$)까지가 주기의 절반이므로 주기는 $\\pi$, $\\frac{2\\pi}{b}=\\pi$에서 $b=2$입니다. 따라서 $a+b+c=5$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'expr', concept: 5,
        q: '$0\\le x<2\\pi$일 때, 부등식 $2\\sin^{2}x-\\sin x-1>0$의 해가 $\\alpha<x<\\beta$입니다. $\\beta-\\alpha$의 값을 구하십시오. ($\\pi$는 pi로 써도 됩니다.)',
        answer: '2π/3',
        hint: '$\\sin x=t$로 놓고 인수분해하십시오. $-1\\le t\\le 1$입니다.',
        wrong: [{ a: 'π', why: '$\\sin x<0$인 범위로 생각했습니다. 조건은 $\\sin x<-\\frac{1}{2}$입니다.' }],
        explain: '$\\sin x=t$로 놓으면 $2t^{2}-t-1>0$, $(2t+1)(t-1)>0$이므로 $t<-\\frac{1}{2}$ 또는 $t>1$입니다. $-1\\le t\\le 1$이므로 $\\sin x<-\\frac{1}{2}$입니다.\n\n$\\sin x=-\\frac{1}{2}$의 해는 $\\frac{7\\pi}{6}$, $\\frac{11\\pi}{6}$이고 그 사이에서 그래프가 직선 아래에 있으므로 $\\frac{7\\pi}{6}<x<\\frac{11\\pi}{6}$입니다. $\\beta-\\alpha=\\frac{4\\pi}{6}=\\frac{2\\pi}{3}$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'set', concept: 4,
        q: '$0\\le x<2\\pi$일 때, 방정식 $\\cos^{2}x+\\sin x-1=0$의 해를 모두 구하십시오. (쉼표로 구분, $\\pi$는 pi로 써도 됩니다.)',
        answer: ['0', 'π/2', 'π'],
        hint: '$\\cos^{2}x=1-\\sin^{2}x$로 바꾸어 $\\sin x$만의 식으로 만드십시오.',
        wrong: [
          { a: ['0', 'π/2', 'π', '2π'], why: '$x=2\\pi$는 범위 $0\\le x<2\\pi$에 들어가지 않습니다.' },
          { a: ['π/2'], why: '$\\sin x=0$인 해를 빠뜨렸습니다. $\\sin x(1-\\sin x)=0$에서 두 경우를 모두 봅니다.' },
        ],
        explain: '$1-\\sin^{2}x+\\sin x-1=0$, 곧 $\\sin x(1-\\sin x)=0$이므로 $\\sin x=0$ 또는 $\\sin x=1$입니다.\n\n$\\sin x=0$에서 $x=0$, $\\pi$이고, $\\sin x=1$에서 $x=\\frac{\\pi}{2}$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 0,
        q: '함수 $y=\\sin^{2}x+2\\cos x$의 최댓값과 최솟값의 차를 구하십시오.',
        answer: '4',
        hint: '$\\sin^{2}x=1-\\cos^{2}x$로 바꾸고 $\\cos x=t$ ($-1\\le t\\le 1$)로 놓으십시오.',
        wrong: [{ a: '2', why: '최댓값만 구했습니다. 최솟값은 $t=-1$일 때 $-2$입니다.' }],
        explain: '$y=1-\\cos^{2}x+2\\cos x$이고 $\\cos x=t$로 놓으면 $y=-t^{2}+2t+1=-(t-1)^{2}+2$ ($-1\\le t\\le 1$)입니다.\n\n$t=1$일 때 최댓값 2, $t=-1$일 때 최솟값 $-4+2=-2$이므로 차는 4입니다.',
      },
    ],

    deeper: [
      {
        title: '파동으로 보는 삼각함수 — 진폭과 주기',
        body: '소리, 빛, 물결, 교류 전기처럼 일정하게 되풀이되는 현상은 $y=a\\sin(bx+c)+d$ 꼴로 나타낼 수 있습니다.\n\n- $|a|$: **진폭** — 중심에서 가장 멀리 흔들리는 정도. 소리에서는 크기(세기)와 관계가 있습니다.\n- $\\frac{2\\pi}{|b|}$: **주기** — 한 번 되풀이되는 데 걸리는 시간. 주기가 짧을수록 1초에 더 많이 흔들리고(진동수가 큼), 소리에서는 더 높은 음이 됩니다.\n- $c$, $d$: 그래프를 옆과 위아래로 옮깁니다.\n\n예를 들어 하루의 밀물·썰물 높이, 한 해 동안의 낮의 길이처럼 되풀이되는 자료도 주기와 진폭을 정해 사인 곡선으로 어림할 수 있습니다. 다음 학년의 미적분에서는 이런 함수가 얼마나 빨리 변하는지도 다룹니다.',
      },
    ],

    faq: [
      {
        q: '왜 주기가 2π를 b로 나눈 값이에요?',
        a: '$\\sin bx$는 $bx$가 $0$부터 $2\\pi$까지 변할 때 한 번 되풀이됩니다. $bx$가 $2\\pi$만큼 변하려면 $x$는 $\\frac{2\\pi}{b}$만큼만 변하면 됩니다. 예를 들어 $\\sin 2x$는 $x$가 $\\pi$만큼 변하면 안쪽 각이 $2\\pi$만큼 변하므로 주기가 $\\pi$입니다.',
      },
      {
        q: 'π/2 ± x 공식이 너무 많아요. 다 외워야 해요?',
        a: '외우지 않아도 됩니다. 두 가지만 기억하십시오. ① $\\frac{\\pi}{2}$의 홀수 배가 붙으면 사인과 코사인이 바뀌고, 짝수 배($\\pi$, $2\\pi$)면 그대로입니다. ② 부호는 $x$를 작은 예각으로 보았을 때 그 각이 놓인 사분면에서 원래 함수의 부호입니다. 헷갈리면 단위원 위의 점을 접어 옮겨 보면 됩니다.',
      },
      {
        q: 'y=tan x는 왜 최댓값이 없어요?',
        a: '탄젠트는 동경의 기울기라서, 동경이 세로선에 가까워질수록 한없이 커지거나 한없이 작아집니다. 그래서 치역이 실수 전체이고 최댓값과 최솟값이 없습니다. 그래프에서도 점근선 근처에서 위아래로 끝없이 뻗어 갑니다.',
      },
      {
        q: '방정식 문제에 왜 0≤x<2π 같은 범위가 붙어요?',
        a: '삼각함수는 주기함수라서 범위가 없으면 해가 무수히 많습니다. 예를 들어 $\\sin x=\\frac{1}{2}$의 해는 $\\frac{\\pi}{6}+2n\\pi$, $\\frac{5\\pi}{6}+2n\\pi$ ($n$은 정수)로 끝이 없습니다. 그래서 보통 한 주기 안의 해만 구하도록 범위를 정합니다.',
      },
    ],

    mistakes: [
      '$y=\\sin 2x$의 주기를 $4\\pi$로 구하는 실수 — $b$를 곱하지 않고 나눕니다: $\\frac{2\\pi}{2}=\\pi$.',
      '$a<0$일 때 최댓값을 $a+d$로 쓰는 실수 — 최댓값은 언제나 $|a|+d$입니다.',
      '삼각방정식에서 해를 하나만 구하고 멈추는 실수 — 그래프를 그려 직선과 만나는 점을 모두 셉니다.',
    ],

    gens: [
      {
        id: 'period-maxmin',
        level: 1,
        title: '주기와 최댓값·최솟값',
        make: function (R) {
          var fn = R.pick(['sin', 'cos', 'sin', 'cos', 'tan']);
          var a = R.nonzero(-4, 4);
          var b = R.pick([F(1), F(2), F(3), F(4), F(1, 2)]);
          var c = R.pick([F(0), F(0), F(1, 2), F(-1, 2), F(1, 3), F(-1, 3), F(1), F(-1)]);
          var d = R.int(-3, 3);
          var ask = fn === 'tan' ? 'period' : R.pick(['max', 'min', 'period']);
          var bT = b.isInt() ? (b.num === 1 ? '' : String(b.num)) : '\\frac{1}{2}';
          var cT = c.isZero() ? '' : (c.num > 0 ? '+' : '-') + piStr(c.abs())[1];
          var inner = bT + 'x' + cT;
          var head = (a === 1 ? '' : a === -1 ? '-' : String(a)) + '\\' + fn;
          var expr = (c.isZero() ? head + ' ' + inner : head + '\\left(' + inner + '\\right)') + (d === 0 ? '' : R.fmt.signed(d));
          var A = Math.abs(a);
          var ans, wrong = [], kind = 'number';
          function addN(v, why) { if (v !== ans && !wrong.some(function (w) { return w.v === v; })) wrong.push({ v: v, a: String(v), why: why }); }
          var explain;
          if (ask === 'period') {
            kind = 'expr';
            var P = (fn === 'tan' ? F(1) : F(2)).div(b);
            ans = P;
            var cands = [
              [(fn === 'tan' ? F(1) : F(2)).mul(b), '$x$의 계수를 곱했습니다. 주기는 $' + (fn === 'tan' ? '\\pi' : '2\\pi') + '$를 $|b|$로 나눕니다.'],
              [(fn === 'tan' ? F(2) : F(1)).div(b), fn === 'tan' ? '사인·코사인의 주기 공식 $\\frac{2\\pi}{|b|}$를 썼습니다. 탄젠트는 $\\frac{\\pi}{|b|}$입니다.' : '탄젠트의 주기 공식 $\\frac{\\pi}{|b|}$를 썼습니다.'],
              [fn === 'tan' ? F(1) : F(2), '$x$의 계수 $' + (bT === '' ? '1' : bT) + '$' + R.josa(b.num, '을/를') + ' 반영하지 않았습니다.'],
            ];
            cands.forEach(function (cd) {
              if (!cd[0].eq(P) && !wrong.some(function (w) { return w.v.eq(cd[0]); })) wrong.push({ v: cd[0], a: piStr(cd[0])[0], why: cd[1] });
            });
            explain = '주기는 $\\frac{' + (fn === 'tan' ? '\\pi' : '2\\pi') + '}{|b|}=' + piStr(P)[1] + '$입니다. ' +
              (cT || d !== 0 || A !== 1 ? '$x$축·$y$축 방향의 평행이동이나 $a$의 값은 주기에 영향을 주지 않습니다.' : '');
          } else {
            var mx = A + d, mn = -A + d;
            ans = ask === 'max' ? mx : mn;
            if (ask === 'max') {
              addN(mn, '최솟값을 구했습니다. ' + (a < 0 ? '$a$가 음수이면 $\\' + fn + '$의 값이 $-1$일 때 최대가 됩니다.' : ''));
              if (d !== 0) addN(A, '$' + d + '$만큼 평행이동한 것을 빠뜨렸습니다.');
              if (A !== 1) addN(1 + d, '$|a|=' + A + '$배로 늘인 것을 빠뜨렸습니다.');
            } else {
              addN(mx, '최댓값을 구했습니다.');
              if (d !== 0) addN(-A, '$' + d + '$만큼 평행이동한 것을 빠뜨렸습니다.');
              if (A !== 1) addN(-1 + d, '$|a|=' + A + '$배로 늘인 것을 빠뜨렸습니다.');
            }
            explain = '$-1\\le\\' + fn + '(\\cdots)\\le 1$' + (a === 1 ? '이고, ' : '이므로 $' + (-A) + '\\le ' + (a === -1 ? '-' : a) + '\\' + fn + '(\\cdots)\\le ' + A + '$이고, ') +
              (d === 0 ? '' : '$' + d + '$' + R.josa(d, '을/를') + ' 더하면 ') + '$' + mn + '\\le y\\le ' + mx + '$입니다. 따라서 ' + (ask === 'max' ? '최댓값' : '최솟값') + '은 $' + ans + '$입니다.';
          }
          var p = {
            type: 'short', check: kind, concept: 2,
            q: '함수 $y=' + expr + '$의 ' + (ask === 'period' ? '주기를' : ask === 'max' ? '최댓값을' : '최솟값을') + ' 구하십시오.' + (ask === 'period' ? ' ($\\pi$는 pi로 써도 됩니다.)' : ''),
            answer: ask === 'period' ? piStr(ans)[0] : String(ans),
            wrong: wrong.map(function (w) { return { a: w.a, why: w.why }; }),
            explain: explain,
          };
          return p;
        },
      },
      {
        id: 'trig-eq',
        level: 2,
        title: '그래프로 푸는 삼각방정식',
        make: function (R) {
          var fn = R.pick(['sin', 'cos', 'tan']);
          var d0;
          do { d0 = R.pick(ANGLES); } while (special(d0)[fn] === 'none');
          var key = special(d0)[fn];
          var sols = ANGLES.filter(function (d) { return special(d)[fn] === key; });
          var answer = sols.map(radStr);
          // 식 꼴: 그대로 또는 일차식 꼴
          var bare = key.charAt(0) === '-' ? key.slice(1) : key;
          var eq, lin = false;
          if (key !== '0' && LIN[bare] && R.bool()) {
            lin = true;
            var L = LIN[bare];
            eq = L[0] + '\\' + fn + ' x' + (key.charAt(0) === '-' ? '+' : '-') + L[1] + '=0';
          } else {
            eq = '\\' + fn + ' x=' + vt(key);
          }
          var wrong = [];
          if (sols.length > 1) wrong.push({ a: [answer[0]], why: '해가 더 있습니다. ' + (fn === 'sin' ? '사인은 $\\pi-\\alpha$도 해입니다(그래프의 대칭).' : fn === 'cos' ? '코사인은 $2\\pi-\\alpha$도 해입니다(그래프의 대칭).' : '탄젠트는 주기가 $\\pi$이므로 $\\pi+\\alpha$도 해입니다.') });
          var nk = neg(key);
          if (nk !== key) {
            var other = ANGLES.filter(function (d) { return special(d)[fn] === nk; }).map(radStr);
            if (other.length) wrong.push({ a: other, why: '$\\' + fn + ' x=' + vt(nk) + '$의 해를 구했습니다. 부호를 다시 확인하십시오.' });
          }
          if (fn === 'tan' && key !== '0') {
            var odd = [radStr(sols[0]), radStr(180 - sols[0] < 0 ? 0 : 180 - sols[0])];
            if (180 - sols[0] > 0 && odd[1] !== answer[1]) wrong.push({ a: odd, why: '사인처럼 다른 해를 $\\pi-\\alpha$로 구했습니다. 탄젠트의 주기는 $\\pi$이므로 다른 해는 $\\pi+\\alpha$입니다.' });
          }
          var how = lin ? '먼저 $\\' + fn + ' x=' + vt(key) + '$ 꼴로 바꿉니다. ' : '';
          return {
            type: 'short', check: 'set', concept: 4,
            q: '$0\\le x<2\\pi$일 때, 방정식 $' + eq + '$의 해를 모두 구하십시오. (쉼표로 구분, $\\pi$는 pi로 써도 됩니다.)',
            answer: answer,
            wrong: wrong,
            explain: how + '$y=\\' + fn + ' x$의 그래프와 직선 $y=' + vt(key) + '$의 교점의 $x$좌표를 $0\\le x<2\\pi$에서 찾으면 $x=' + sols.map(radTex).join('$, $x=') + '$입니다.',
          };
        },
      },
      {
        id: 'reduce',
        level: 2,
        title: '-x, π±x, π/2±x의 삼각함수',
        make: function (R) {
          var forms = [
            { k: 0, s: -1, t: '-x' }, { k: 2, s: -1, t: '\\pi-x' }, { k: 2, s: 1, t: '\\pi+x' },
            { k: 1, s: -1, t: '\\frac{\\pi}{2}-x' }, { k: 1, s: 1, t: '\\frac{\\pi}{2}+x' },
            { k: 3, s: -1, t: '\\frac{3\\pi}{2}-x' }, { k: 3, s: 1, t: '\\frac{3\\pi}{2}+x' }, { k: 4, s: -1, t: '2\\pi-x' },
          ];
          var fm = R.pick(forms);
          var fn = R.pick(['sin', 'cos', 'tan']);
          var x0 = 0.3, ang = fm.k * Math.PI / 2 + fm.s * x0;
          var fv = { sin: Math.sin, cos: Math.cos, tan: Math.tan }[fn](ang);
          var opts = fn === 'tan'
            ? [['\\tan x', Math.tan(x0)], ['-\\tan x', -Math.tan(x0)], ['\\frac{1}{\\tan x}', 1 / Math.tan(x0)], ['-\\frac{1}{\\tan x}', -1 / Math.tan(x0)]]
            : [['\\sin x', Math.sin(x0)], ['-\\sin x', -Math.sin(x0)], ['\\cos x', Math.cos(x0)], ['-\\cos x', -Math.cos(x0)]];
          var correct = null;
          opts.forEach(function (o) { if (Math.abs(o[1] - fv) < 1e-9) correct = o[0]; });
          var family = function (s) { return s.replace(/^-/, ''); };
          var a2 = ((ang % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
          var q = Math.floor(a2 / (Math.PI / 2));
          var oddK = fm.k % 2 === 1;
          var argT = fm.k === 0 ? '(-x)' : (fm.k % 2 === 1 ? '\\left(' + fm.t + '\\right)' : '(' + fm.t + ')');
          var choices = opts.map(function (o) { return '$' + o[0] + '$'; });
          var why = opts.map(function (o) {
            if (o[0] === correct) return '';
            if (family(o[0]) === family(correct)) return '부호를 다시 보십시오. $x$를 예각으로 보면 $' + fm.t + '$의 동경은 ' + QUAD[q] + '에 있고, 거기서 $\\' + fn + '$의 값은 ' + (fv > 0 ? '양수' : '음수') + '입니다.';
            return oddK ? '$\\frac{\\pi}{2}$의 홀수 배가 더해졌으므로 함수가 바뀝니다(사인↔코사인, 탄젠트→$\\frac{1}{\\tan x}$).' : '$\\pi$의 정수 배만 더해졌으므로 함수의 종류는 그대로입니다.';
          });
          var order = R.shuffle([0, 1, 2, 3]);
          return {
            type: 'choice', concept: 3,
            q: '$\\' + fn + argT + '$와 항상 같은 것은 무엇입니까? (단, 식의 값이 정의되는 $x$에 대하여)',
            choices: order.map(function (i) { return choices[i]; }),
            answer: order.indexOf(opts.map(function (o) { return o[0]; }).indexOf(correct)),
            why: order.map(function (i) { return why[i]; }),
            explain: (fm.k === 0 ? '$-x$는 $\\frac{\\pi}{2}\\times0-x$로 봅니다. ' : '') +
              (oddK ? '$\\frac{\\pi}{2}$의 홀수 배이므로 ' + (fn === 'tan' ? '탄젠트는 $\\frac{1}{\\tan x}$ 꼴로' : '사인과 코사인이 서로') + ' 바뀝니다. ' : '$\\frac{\\pi}{2}$의 짝수 배이므로 함수는 그대로입니다. ') +
              '$x$를 예각으로 보면 $' + fm.t + '$의 동경은 ' + QUAD[q] + '에 있고, 거기서 $\\' + fn + '$의 값은 ' + (fv > 0 ? '양수' : '음수') + '입니다. 따라서 $\\' + fn + argT + '=' + correct + '$입니다.',
          };
        },
      },
      {
        id: 'count-roots',
        level: 3,
        title: '삼각방정식의 해의 개수',
        make: function (R) {
          var fn = R.pick(['sin', 'cos']);
          var b = R.int(2, 5);
          var v = R.pick(['0', 'h', '-h', 'r2', '-r3', '1', '-1']);
          var edge = v === '1' || v === '-1';
          var ans = edge ? b : 2 * b;
          var wrong = [{ a: String(edge ? 1 : 2), why: '$x$의 계수 ' + b + R.josa(b, '을/를') + ' 생각하지 않았습니다. $0\\le x<2\\pi$에서 $' + b + 'x$는 $0$부터 $' + b + '\\times2\\pi$까지 변하므로 그래프가 ' + b + '번 되풀이됩니다.' }];
          if (edge || b !== 2) wrong.push(edge
            ?{ a: String(2 * b), why: '그래프의 ' + (v === '1' ? '꼭대기가' : '바닥이') + ' 직선 $y=' + vt(v) + '$에 닿을 뿐이라 한 주기에 한 번만 만납니다.' }
            : { a: String(b), why: '한 주기마다 교점이 두 개입니다. 올라갈 때와 내려올 때 한 번씩 만납니다.' });
          return {
            type: 'short', check: 'number', unit: '개', concept: 4,
            q: '$0\\le x<2\\pi$일 때, 방정식 $\\' + fn + ' ' + b + 'x=' + vt(v) + '$의 서로 다른 실근은 몇 개입니까?',
            answer: String(ans),
            hint: '$y=\\' + fn + ' ' + b + 'x$의 주기를 먼저 구하십시오.',
            wrong: wrong,
            explain: '$y=\\' + fn + ' ' + b + 'x$의 주기는 $\\frac{2\\pi}{' + b + '}' + (b % 2 === 0 ? '=' + piStr(F(2, b))[1] : '') + '$이므로 $0\\le x<2\\pi$에서 그래프가 ' + b + '번 되풀이됩니다. 한 주기마다 그래프와 직선 $y=' + vt(v) + '$의 교점이 ' + (edge ? '1개' : '2개') + '이므로 실근은 $' + b + '\\times' + (edge ? 1 : 2) + '=' + ans + '$개입니다.',
          };
        },
      },
    ],
  });
})();
