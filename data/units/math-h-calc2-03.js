/* 미적분Ⅱ · 지수함수와 로그함수의 미분
 * 지수·로그함수의 극한, 무리수 e 와 자연로그, (e^x-1)/x → 1 · ln(1+x)/x → 1,
 * e^x · a^x · ln x · log_a x 의 도함수. (몫·합성함수의 미분법은 math-h-calc2-05 에서 — 여기서는 쓰지 않는다) */
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
  // 계수 k 와 몸통 body 로 한 항: (3, 'e^x', true) → '3e^x', (-1, '\\ln x', false) → '-\\ln x'
  function T(k, body, first) {
    if (k === 0) return '';
    var sign = k < 0 ? '-' : (first ? '' : '+');
    return sign + (Math.abs(k) === 1 ? '' : Math.abs(k)) + body;
  }
  // e^{px}: p=1 → e^{x}, p=-1 → e^{-x}
  function ePow(p) { return 'e^{' + (p === 1 ? '' : p === -1 ? '-' : p) + 'x}'; }
  // 1+px
  function onePlus(p) { return '1' + (p > 0 ? '+' : '-') + (Math.abs(p) === 1 ? '' : Math.abs(p)) + 'x'; }
  function kx(q) { return (q === 1 ? '' : q === -1 ? '-' : q) + 'x'; }

  Tutor.registerUnit({
    id: 'math-h-calc2-03',
    course: 'math-h-calc2',
    title: '지수함수와 로그함수의 미분',
    summary: '무리수 $e$와 자연로그를 알고, 지수함수와 로그함수의 극한을 구해 두 함수를 미분합니다.',
    goals: [
      '지수함수와 로그함수의 극한을 구할 수 있다.',
      '무리수 $e$의 뜻과 자연로그 $\\ln x$를 알고, 이를 이용한 극한값을 구할 수 있다.',
      '$y=e^x$, $y=a^x$의 도함수를 구할 수 있다.',
      '$y=\\ln x$, $y=\\log_a x$의 도함수를 구할 수 있다.',
    ],
    standards: ['[12미적Ⅱ-02-01]'],

    concepts: [
      {
        title: '지수함수와 로그함수의 극한',
        body: '지수함수 $y=a^x$ ($a>0$, $a \\ne 1$)은 실수 전체에서 연속이므로 $\\lim_{x \\to c} a^x=a^c$이고, 로그함수 $y=\\log_a x$는 $x>0$에서 연속이므로 $\\lim_{x \\to c}\\log_a x=\\log_a c$ ($c>0$)입니다.\n\n$x$가 한없이 커지거나 작아질 때는 그래프의 모양으로 판단합니다.\n\n| 극한 | $a>1$ | $0<a<1$ |\n|---|---|---|\n| $\\lim_{x \\to \\infty} a^x$ | $\\infty$ | 0 |\n| $\\lim_{x \\to -\\infty} a^x$ | 0 | $\\infty$ |\n| $\\lim_{x \\to \\infty}\\log_a x$ | $\\infty$ | $-\\infty$ |\n| $\\lim_{x \\to 0+}\\log_a x$ | $-\\infty$ | $\\infty$ |\n\n($x \\to 0+$는 $x$가 0보다 큰 쪽에서 0에 가까워지는 것, 곧 우극한입니다.)\n\n예: $\\lim_{x \\to \\infty}\\dfrac{3^x-2^x}{3^x+2^x}$은 분자와 분모를 $3^x$으로 나누면 $\\dfrac{1-\\left(\\frac{2}{3}\\right)^x}{1+\\left(\\frac{2}{3}\\right)^x} \\to \\frac{1-0}{1+0}=1$입니다. 수열의 극한에서 가장 큰 밑으로 나누던 방법과 같습니다.',
        easy: '그래프를 떠올리면 쉽습니다. $y=2^x$은 오른쪽으로 갈수록 가파르게 솟아오르고, 왼쪽으로 갈수록 $x$축에 바짝 붙습니다. 그래서 $x \\to \\infty$이면 $\\infty$, $x \\to -\\infty$이면 0입니다.\n\n$y=\\log_2 x$는 $y=2^x$을 직선 $y=x$에 대하여 뒤집은 모양입니다. 오른쪽으로 갈수록 천천히 끝없이 올라가고, 0에 다가가면 $y$축을 따라 끝없이 내려갑니다.',
        fig: {
          type: 'coord', xmin: -4, xmax: 6, ymin: -4, ymax: 6,
          fns: [
            { expr: '2^x', from: -4, to: 2.55, label: 'y=2^x' },
            { expr: 'ln(x)/ln(2)', from: 0.07, to: 6, label: 'y=log_2 x' },
            { expr: 'x', from: -4, to: 6 },
          ],
          alt: '곡선 y=2^x와 y=log_2 x, 직선 y=x를 그린 좌표평면. 두 곡선은 직선 y=x에 대하여 대칭이다. y=2^x는 왼쪽으로 갈수록 x축에 가까워지고, y=log_2 x는 0에 가까워질수록 y축을 따라 내려간다',
        },
        check: {
          type: 'choice',
          q: '$\\lim_{x \\to -\\infty} 3^x$의 값은 무엇입니까?',
          choices: ['$0$', '$\\infty$', '$-\\infty$'],
          answer: 0,
          why: ['', '$x \\to \\infty$일 때의 극한입니다. $x$가 음수이면서 절댓값이 커지면 $3^x=\\frac{1}{3^{-x}}$은 0에 가까워집니다.', '$3^x$은 언제나 양수이므로 음의 무한대로 갈 수 없습니다.'],
          explain: '$3^x=\\dfrac{1}{3^{-x}}$이고 $x \\to -\\infty$이면 $3^{-x} \\to \\infty$이므로 $3^x \\to 0$입니다. 그래프가 왼쪽으로 갈수록 $x$축에 가까워집니다.',
        },
      },
      {
        title: '무리수 e와 자연로그',
        body: '$x$가 0에 가까워질 때 $(1+x)^{\\frac{1}{x}}$의 값은 다음과 같이 일정한 값에 가까워집니다.\n\n| $x$ | $0.1$ | $0.01$ | $0.001$ | $-0.001$ | $-0.01$ |\n|---|---|---|---|---|---|\n| $(1+x)^{\\frac{1}{x}}$ | $2.5937\\cdots$ | $2.7048\\cdots$ | $2.7169\\cdots$ | $2.7196\\cdots$ | $2.7319\\cdots$ |\n\n이 극한값을 $e$로 나타냅니다.\n\n$e=\\lim_{x \\to 0}(1+x)^{\\frac{1}{x}}=2.718281828\\cdots$\n\n$e$는 **무리수**입니다. $\\frac{1}{x}=t$로 놓으면 $e=\\lim_{t \\to \\infty}\\left(1+\\frac{1}{t}\\right)^t$로도 나타낼 수 있습니다.\n\n$e$를 밑으로 하는 로그 $\\log_e x$를 **자연로그**라 하고 $\\ln x$로 씁니다. 로그의 성질이 그대로 성립하여 $\\ln e=1$, $\\ln 1=0$, $\\ln e^k=k$, $e^{\\ln x}=x$입니다.\n\n> 💡 $\\lim_{x \\to 0}(1+2x)^{\\frac{1}{x}}=\\lim_{x \\to 0}\\left\\{(1+2x)^{\\frac{1}{2x}}\\right\\}^2=e^2$처럼, 괄호 안의 $x$ 자리와 지수의 분모를 같게 맞추면 $e$의 정의를 쓸 수 있습니다.',
        easy: '$(1+x)^{\\frac{1}{x}}$에서 밑 $1+x$는 1에 가까워지고 지수 $\\frac{1}{x}$은 한없이 커집니다. "1에 가까운 수"를 "아주 여러 번" 곱하는 줄다리기입니다.\n\n밑이 1보다 조금 크면 여러 번 곱할수록 커지려 하고, 밑이 1에 가까워질수록 커지는 힘은 약해집니다. 이 둘이 팽팽하게 맞서서 결국 약 2.718에서 멈춥니다. 그 값이 $e$입니다.',
        check: {
          type: 'choice',
          q: '$\\lim_{x \\to 0}(1+x)^{\\frac{1}{x}}$의 값은 무엇입니까?',
          choices: ['$e$', '$1$', '$\\infty$'],
          answer: 0,
          why: ['', '밑이 1에 가까워진다고 값이 1이 되는 것은 아닙니다. 지수도 한없이 커지므로 표처럼 약 2.718에 가까워집니다.', '지수가 커지지만 밑이 1에 가까워지므로 한없이 커지지 않습니다. 표처럼 약 2.718에 가까워집니다.'],
          explain: '이 극한값을 $e$라 정의합니다. $e=2.718281828\\cdots$인 무리수입니다.',
        },
      },
      {
        title: '(eˣ-1)/x와 ln(1+x)/x의 극한',
        body: '두 극한은 지수·로그함수를 미분하는 열쇠입니다.\n\n$\\lim_{x \\to 0}\\dfrac{\\ln(1+x)}{x}=1, \\quad \\lim_{x \\to 0}\\dfrac{e^x-1}{x}=1$\n\n**첫째 극한**: 로그의 성질로 $\\dfrac{\\ln(1+x)}{x}=\\ln(1+x)^{\\frac{1}{x}}$이고, $(1+x)^{\\frac{1}{x}} \\to e$이므로 $\\ln e=1$에 가까워집니다.\n\n**둘째 극한**: $e^x-1=t$로 놓으면 $x=\\ln(1+t)$이고, $x \\to 0$일 때 $t \\to 0$입니다. 따라서 $\\dfrac{e^x-1}{x}=\\dfrac{t}{\\ln(1+t)}=\\dfrac{1}{\\frac{\\ln(1+t)}{t}} \\to \\frac{1}{1}=1$입니다.\n\n**활용**: $x$ 자리와 분모를 같게 맞춥니다.\n\n$\\lim_{x \\to 0}\\dfrac{e^{3x}-1}{x}=\\lim_{x \\to 0}\\dfrac{e^{3x}-1}{3x} \\times 3=1 \\times 3=3$\n\n> 💡 같은 방법으로 $\\lim_{x \\to 0}\\dfrac{a^x-1}{x}=\\ln a$, $\\lim_{x \\to 0}\\dfrac{\\log_a(1+x)}{x}=\\dfrac{1}{\\ln a}$입니다. ($a^x=e^{x\\ln a}$, $\\log_a(1+x)=\\dfrac{\\ln(1+x)}{\\ln a}$)',
        easy: '그림을 보면 곡선 $y=e^x$은 $x=0$ 근처에서 직선 $y=x+1$과 거의 겹칩니다. 그래서 0에 아주 가까운 $x$에서는 $e^x-1$이 거의 $x$와 같습니다.\n\n실제로 $x=0.001$이면 $e^x-1=0.0010005\\cdots$로 $x$와 거의 같고, 그 비는 1에 가까워집니다.',
        fig: {
          type: 'coord', xmin: -3, xmax: 3, ymin: -1, ymax: 5,
          fns: [{ expr: 'e^x', from: -3, to: 1.6, label: 'y=e^x' }, { expr: 'x+1', label: 'y=x+1' }],
          points: [{ x: 0, y: 1, label: '(0, 1)' }],
          alt: '곡선 y=e^x와 직선 y=x+1을 그린 그림. 두 그래프는 점 (0, 1)에서 접하고, 그 근처에서 거의 겹친다',
        },
        check: {
          type: 'short', check: 'number',
          q: '$\\lim_{x \\to 0}\\dfrac{e^{2x}-1}{x}$의 값을 구하십시오.',
          answer: '2',
          wrong: [
            { a: '1', why: '$\\frac{e^{\\square}-1}{\\square}$에서 두 자리가 같아야 1입니다. 분모를 $2x$로 맞추면 2를 곱해야 합니다.' },
            { a: '1/2', why: '분모를 $2x$로 맞출 때 2를 나누었습니다. $\\frac{e^{2x}-1}{x}=\\frac{e^{2x}-1}{2x} \\times 2$입니다.' },
          ],
          explain: '$\\dfrac{e^{2x}-1}{x}=\\dfrac{e^{2x}-1}{2x} \\times 2$이고, $2x=t$로 놓으면 $x \\to 0$일 때 $t \\to 0$이므로 극한값은 $1 \\times 2=2$입니다.',
        },
      },
      {
        title: 'eˣ와 aˣ의 도함수',
        body: '도함수의 정의와 앞의 극한을 쓰면\n\n$(e^x)\'=\\lim_{h \\to 0}\\dfrac{e^{x+h}-e^x}{h}=e^x\\lim_{h \\to 0}\\dfrac{e^h-1}{h}=e^x$\n\n입니다. 곧 **$y=e^x$은 미분해도 자기 자신**입니다. 같은 방법으로 $\\lim_{h \\to 0}\\frac{a^h-1}{h}=\\ln a$를 쓰면\n\n$(a^x)\'=a^x\\ln a$ ($a>0$, $a \\ne 1$)\n\n입니다.\n\n예:\n- $(3e^x-x^2)\'=3e^x-2x$\n- $(2^x)\'=2^x\\ln 2$\n- $(xe^x)\'=1 \\cdot e^x+x \\cdot e^x=(x+1)e^x$ (곱의 미분법)\n\n> ⚠️ $(a^x)\'$을 $xa^{x-1}$으로 계산하면 안 됩니다. $(x^n)\'=nx^{n-1}$은 밑이 변수이고 지수가 상수일 때의 공식입니다. $a^x$은 지수가 변수입니다.\n\n> 💡 $y=e^x$ 위의 점 $(0, 1)$에서 접선의 기울기는 $e^0=1$입니다. 그래서 그 점에서의 접선이 $y=x+1$입니다.',
        easy: '$e^x$은 "지금 높이만큼의 빠르기로 자라는" 함수입니다. 높이가 1일 때는 기울기 1, 높이가 2일 때는 기울기 2, 높이가 10일 때는 기울기 10으로 올라갑니다.\n\n다른 밑 $a^x$도 높이에 비례해 자라지만 그 비례 상수가 1이 아니라 $\\ln a$입니다. 비례 상수가 꼭 1이 되는 밑이 바로 $e$입니다.',
        check: {
          type: 'choice',
          q: '함수 $y=5^x$의 도함수는 무엇입니까?',
          choices: ['$5^x\\ln 5$', '$x \\cdot 5^{x-1}$', '$5^x$'],
          answer: 0,
          why: ['', '$(x^n)\'=nx^{n-1}$은 지수가 상수일 때의 공식입니다. $5^x$은 지수가 변수이므로 $(a^x)\'=a^x\\ln a$를 씁니다.', '그대로 나오는 것은 밑이 $e$일 때뿐입니다. 밑이 5이면 $\\ln 5$를 곱합니다.'],
          explain: '$(a^x)\'=a^x\\ln a$이므로 $(5^x)\'=5^x\\ln 5$입니다.',
        },
      },
      {
        title: 'ln x와 logₐx의 도함수',
        body: '$f(x)=\\ln x$ ($x>0$)에서\n\n$f\'(x)=\\lim_{h \\to 0}\\dfrac{\\ln(x+h)-\\ln x}{h}=\\lim_{h \\to 0}\\dfrac{\\ln\\left(1+\\frac{h}{x}\\right)}{h}$\n\n입니다. $\\frac{h}{x}=t$로 놓으면 $h \\to 0$일 때 $t \\to 0$이고 $h=xt$이므로\n\n$f\'(x)=\\lim_{t \\to 0}\\dfrac{1}{x} \\cdot \\dfrac{\\ln(1+t)}{t}=\\dfrac{1}{x}$\n\n입니다. 또 $\\log_a x=\\dfrac{\\ln x}{\\ln a}$이므로\n\n$(\\ln x)\'=\\dfrac{1}{x}, \\quad (\\log_a x)\'=\\dfrac{1}{x\\ln a}$\n\n예:\n- $(2\\ln x+x)\'=\\dfrac{2}{x}+1$\n- $(\\log_3 x)\'=\\dfrac{1}{x\\ln 3}$\n- $(x\\ln x)\'=1 \\cdot \\ln x+x \\cdot \\dfrac{1}{x}=\\ln x+1$ (곱의 미분법)\n\n> ⚠️ $(\\log_a x)\'$에서 $\\ln a$를 빠뜨리지 않습니다. $\\frac{1}{x}$이 되는 것은 밑이 $e$일 때뿐입니다.',
        easy: '$y=\\ln x$의 그래프는 오른쪽으로 갈수록 점점 완만해집니다. $x=1$에서는 기울기가 1, $x=2$에서는 $\\frac{1}{2}$, $x=10$에서는 $\\frac{1}{10}$입니다. 기울기가 $x$에 반비례하는 것이 $(\\ln x)\'=\\frac{1}{x}$의 뜻입니다.\n\n$y=e^x$의 그래프를 $y=x$에 대하여 뒤집은 것이 $y=\\ln x$이므로, $e^x$에서 "기울기 = 높이"였던 것이 $\\ln x$에서는 "기울기 = 1 ÷ 가로 위치"로 바뀐 것입니다.',
        check: {
          type: 'short', check: 'number',
          q: '함수 $f(x)=3\\ln x$에 대하여 $f\'(6)$의 값을 구하십시오.',
          answer: '1/2',
          wrong: [{ a: '1/6', why: '상수 3을 곱하지 않았습니다. $f\'(x)=3 \\times \\frac{1}{x}$입니다.' }],
          explain: '$f\'(x)=\\dfrac{3}{x}$이므로 $f\'(6)=\\dfrac{3}{6}=\\dfrac{1}{2}$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '$\\lim_{x \\to 0}\\dfrac{e^{3x}-1}{2x}$의 값을 구하십시오.',
        steps: [
          '분모를 지수와 같은 $3x$로 맞춥니다. $\\dfrac{e^{3x}-1}{2x}=\\dfrac{e^{3x}-1}{3x} \\times \\dfrac{3}{2}$',
          '$3x=t$로 놓으면 $x \\to 0$일 때 $t \\to 0$이므로 $\\dfrac{e^{3x}-1}{3x} \\to 1$입니다.',
          '따라서 극한값은 $1 \\times \\frac{3}{2}=\\frac{3}{2}$입니다.',
        ],
        answer: '$\\frac{3}{2}$',
      },
      {
        q: '함수 $f(x)=x^2e^x$의 도함수를 구하십시오.',
        steps: [
          '두 함수 $x^2$과 $e^x$의 곱이므로 곱의 미분법을 씁니다. $(x^2)\'=2x$, $(e^x)\'=e^x$',
          '$f\'(x)=2x \\cdot e^x+x^2 \\cdot e^x$',
          '$e^x$으로 묶으면 $f\'(x)=(x^2+2x)e^x$입니다.',
        ],
        answer: '$f\'(x)=(x^2+2x)e^x$',
      },
      {
        q: '함수 $f(x)=x\\ln x-x$에 대하여 $f\'(e)$의 값을 구하십시오.',
        steps: [
          '$x\\ln x$는 곱의 미분법으로 $(x\\ln x)\'=1 \\cdot \\ln x+x \\cdot \\frac{1}{x}=\\ln x+1$입니다.',
          '$f\'(x)=(\\ln x+1)-1=\\ln x$',
          '$f\'(e)=\\ln e=1$입니다.',
        ],
        answer: '$1$',
      },
    ],

    terms: [
      { term: '무리수 e', def: '$\\lim_{x \\to 0}(1+x)^{\\frac{1}{x}}$의 값으로 정의한 수입니다. $e=2.718281828\\cdots$인 무리수입니다.' },
      { term: '자연로그', def: '$e$를 밑으로 하는 로그 $\\log_e x$입니다. $\\ln x$로 씁니다. 예: $\\ln e=1$, $\\ln 1=0$' },
      { term: '지수함수의 도함수', def: '$(e^x)\'=e^x$, $(a^x)\'=a^x\\ln a$입니다. $e^x$은 미분해도 자기 자신입니다.' },
      { term: '로그함수의 도함수', def: '$(\\ln x)\'=\\frac{1}{x}$, $(\\log_a x)\'=\\frac{1}{x\\ln a}$입니다.' },
      { term: '지수·로그의 기본 극한', def: '$\\lim_{x \\to 0}\\frac{e^x-1}{x}=1$, $\\lim_{x \\to 0}\\frac{\\ln(1+x)}{x}=1$입니다. 지수·로그함수를 미분하는 바탕이 됩니다.' },
      { term: '우극한 x→0+', def: '$x$가 0보다 큰 쪽에서 0에 가까워질 때의 극한입니다. 예: $\\lim_{x \\to 0+}\\ln x=-\\infty$' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', fixed: true, concept: 0,
        q: '$\\lim_{x \\to \\infty}\\left(\\frac{1}{2}\\right)^x$의 값은 무엇입니까?',
        choices: ['$0$', '$\\frac{1}{2}$', '$1$', '$\\infty$'],
        answer: 0,
        why: [
          '',
          '$x=1$일 때의 값입니다. $x$가 커질수록 $\\left(\\frac{1}{2}\\right)^x$은 계속 작아집니다.',
          '$x=0$일 때의 값입니다. $x$가 커질수록 작아집니다.',
          '밑이 1보다 작으므로 거듭 곱할수록 작아집니다. $0<a<1$이면 $\\lim_{x \\to \\infty} a^x=0$입니다.',
        ],
        explain: '밑 $\\frac{1}{2}$이 $0<a<1$이므로 $x \\to \\infty$일 때 $\\left(\\frac{1}{2}\\right)^x \\to 0$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 0,
        q: '$\\lim_{x \\to \\infty}\\dfrac{2 \\cdot 3^x+1}{3^x-5}$의 값을 구하십시오.',
        answer: '2',
        wrong: [{ a: '-1/5', why: '상수항끼리의 비를 구했습니다. $x$가 커지면 $3^x$이 들어 있는 항이 훨씬 커집니다.' }],
        explain: '분자와 분모를 $3^x$으로 나누면 $\\dfrac{2+\\frac{1}{3^x}}{1-\\frac{5}{3^x}}$이고, $x \\to \\infty$일 때 $\\frac{1}{3^x} \\to 0$이므로 극한값은 $\\frac{2}{1}=2$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 1,
        q: '무리수 $e$는 $\\lim_{x \\to 0}(1+x)^{\\frac{1}{x}}$로 정의하며, 그 값은 약 2.718입니다.',
        answer: true,
        explain: '$e=\\lim_{x \\to 0}(1+x)^{\\frac{1}{x}}=2.718281828\\cdots$입니다. $e$는 무리수이므로 소수로 끝까지 나타낼 수 없고 순환하지도 않습니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', concept: 2,
        q: '$\\lim_{x \\to 0}\\dfrac{e^{4x}-1}{x}$의 값을 구하십시오.',
        answer: '4',
        wrong: [{ a: '1', why: '$\\frac{e^{x}-1}{x} \\to 1$을 그대로 썼습니다. 분모를 $4x$로 맞추면 4를 곱해야 합니다.' }],
        explain: '$\\dfrac{e^{4x}-1}{x}=\\dfrac{e^{4x}-1}{4x} \\times 4 \\to 1 \\times 4=4$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 2,
        q: '$\\lim_{x \\to 0}\\dfrac{\\ln(1+3x)}{2x}$의 값을 구하십시오.',
        answer: '3/2',
        wrong: [
          { a: '2/3', why: '분자와 분모의 계수를 거꾸로 놓았습니다. $\\frac{\\ln(1+3x)}{3x} \\times \\frac{3}{2}$입니다.' },
          { a: '1/2', why: '$\\ln(1+3x)$의 짝인 분모를 $3x$로 맞추지 않았습니다. $\\frac{\\ln(1+3x)}{3x} \\to 1$이 되도록 3을 곱하고 나눕니다.' },
        ],
        explain: '$\\dfrac{\\ln(1+3x)}{2x}=\\dfrac{\\ln(1+3x)}{3x} \\times \\dfrac{3}{2} \\to 1 \\times \\dfrac{3}{2}=\\dfrac{3}{2}$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: '함수 $y=e^x+x^2$의 도함수는 무엇입니까?',
        choices: ['$e^x+2x$', '$xe^{x-1}+2x$', '$e^x+x^2$', '$e^x$'],
        answer: 0,
        why: [
          '',
          '$e^x$에 $(x^n)\'=nx^{n-1}$을 쓰면 안 됩니다. $(e^x)\'=e^x$입니다.',
          '$x^2$을 미분하지 않았습니다. $(x^2)\'=2x$입니다.',
          '$x^2$의 도함수 $2x$를 빠뜨렸습니다.',
        ],
        explain: '$(e^x)\'=e^x$, $(x^2)\'=2x$이므로 $y\'=e^x+2x$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 4,
        q: '함수 $f(x)=\\ln x+3x$의 도함수는 무엇입니까?',
        choices: ['$\\frac{1}{x}+3$', '$\\ln x+3$', '$\\frac{1}{x}+3x$', '$x+3$'],
        answer: 0,
        why: [
          '',
          '$\\ln x$를 미분하지 않았습니다. $(\\ln x)\'=\\frac{1}{x}$입니다.',
          '$3x$를 미분하지 않았습니다. $(3x)\'=3$입니다.',
          '$(\\ln x)\'$은 $x$가 아니라 $\\frac{1}{x}$입니다.',
        ],
        explain: '$(\\ln x)\'=\\frac{1}{x}$, $(3x)\'=3$이므로 $f\'(x)=\\frac{1}{x}+3$입니다.',
      },
      {
        id: 'p8', level: 1, type: 'short', check: 'number', concept: 4,
        q: '함수 $f(x)=2\\ln x$에 대하여 $f\'(4)$의 값을 구하십시오.',
        answer: '1/2',
        wrong: [{ a: '1/4', why: '상수 2를 곱하지 않았습니다. $f\'(x)=\\frac{2}{x}$입니다.' }],
        explain: '$f\'(x)=2 \\times \\dfrac{1}{x}=\\dfrac{2}{x}$이므로 $f\'(4)=\\dfrac{2}{4}=\\dfrac{1}{2}$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 3,
        q: '함수 $f(x)=2^x$의 도함수는 무엇입니까?',
        choices: ['$2^x\\ln 2$', '$x \\cdot 2^{x-1}$', '$2^x$', '$\\frac{2^x}{\\ln 2}$'],
        answer: 0,
        why: [
          '',
          '$(x^n)\'=nx^{n-1}$은 지수가 상수일 때의 공식입니다. $2^x$은 지수가 변수입니다.',
          '미분해도 그대로인 것은 밑이 $e$일 때뿐입니다.',
          '$\\ln 2$는 나누는 것이 아니라 곱합니다. $\\frac{1}{x\\ln a}$은 $\\log_a x$의 도함수입니다.',
        ],
        explain: '$(a^x)\'=a^x\\ln a$이므로 $f\'(x)=2^x\\ln 2$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 3,
        q: '함수 $f(x)=xe^x$에 대하여 $f\'(0)$의 값을 구하십시오.',
        answer: '1',
        hint: '곱의 미분법 $\\{g(x)h(x)\\}\'=g\'(x)h(x)+g(x)h\'(x)$를 씁니다.',
        wrong: [{ a: '0', why: '$e^x$만 미분하여 $f\'(x)=xe^x$으로 계산했습니다. 곱의 미분법에서 $(x)\' \\cdot e^x=e^x$ 항을 빠뜨렸습니다.' }],
        explain: '$f\'(x)=1 \\cdot e^x+x \\cdot e^x=(x+1)e^x$이므로 $f\'(0)=1 \\times e^0=1$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 2,
        q: '$\\lim_{x \\to 0}\\dfrac{e^x-1}{\\ln(1+3x)}$의 값을 구하십시오.',
        answer: '1/3',
        hint: '분자와 분모를 각각 $x$로 나누어 보십시오.',
        wrong: [{ a: '3', why: '분모의 극한 $\\frac{\\ln(1+3x)}{x} \\to 3$을 분자에 곱했습니다. 3은 분모에 있으므로 $\\frac{1}{3}$입니다.' }],
        explain: '분자와 분모를 $x$로 나누면 $\\dfrac{\\frac{e^x-1}{x}}{\\frac{\\ln(1+3x)}{x}}$입니다. 분자는 1, 분모는 $\\frac{\\ln(1+3x)}{3x} \\times 3 \\to 3$이므로 극한값은 $\\frac{1}{3}$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 4,
        q: '함수 $f(x)=x\\ln x$에 대하여 $f\'(e)$의 값을 구하십시오.',
        answer: '2',
        hint: '곱의 미분법을 씁니다.',
        wrong: [{ a: '1', why: '$(x\\ln x)\'$을 $\\ln x$나 $x \\cdot \\frac{1}{x}$ 하나만으로 계산했습니다. 곱의 미분법으로 두 항을 모두 더하면 $\\ln x+1$입니다.' }],
        explain: '$f\'(x)=1 \\cdot \\ln x+x \\cdot \\dfrac{1}{x}=\\ln x+1$이므로 $f\'(e)=\\ln e+1=2$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 2,
        q: '두 상수 $a$, $b$에 대하여 $\\lim_{x \\to 0}\\dfrac{ae^x+b}{x}=3$일 때, $a-b$의 값을 구하십시오.',
        answer: '6',
        hint: '$x \\to 0$일 때 분모가 0으로 가는데 극한값이 있으려면 분자는 어떻게 되어야 할까요?',
        wrong: [{ a: '0', why: '$a+b$의 값을 구했습니다. $a=3$, $b=-3$이므로 $a-b=6$입니다.' }],
        explain: '$x \\to 0$일 때 분모가 0으로 가고 극한값이 존재하므로 분자도 0으로 가야 합니다. $a+b=0$, 곧 $b=-a$입니다.\n\n그러면 $\\dfrac{ae^x-a}{x}=a \\cdot \\dfrac{e^x-1}{x} \\to a$이므로 $a=3$, $b=-3$이고 $a-b=6$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 3,
        q: '함수 $f(x)=e^x(x^2+ax)$에 대하여 $f\'(1)=0$일 때, 상수 $a$의 값을 구하십시오.',
        answer: '-3/2',
        hint: '곱의 미분법으로 $f\'(x)$를 구한 뒤 $e^x$으로 묶어 보십시오.',
        wrong: [{ a: '-2', why: '$x^2+ax$만 미분했습니다. 곱의 미분법에서 $(e^x)\' \\cdot (x^2+ax)$ 항도 더해야 합니다.' }],
        explain: '$f\'(x)=e^x(x^2+ax)+e^x(2x+a)=e^x\\{x^2+(a+2)x+a\\}$입니다. $f\'(1)=e(1+a+2+a)=e(2a+3)=0$이고 $e \\ne 0$이므로 $a=-\\frac{3}{2}$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 4,
        q: '원점을 지나고 곡선 $y=\\ln x$에 접하는 직선의 기울기는 무엇입니까?',
        choices: ['$\\frac{1}{e}$', '$e$', '$1$', '$\\frac{1}{2}$'],
        answer: 0,
        why: [
          '',
          '접점의 $x$좌표가 $e$입니다. 기울기는 그 점에서의 미분계수 $\\frac{1}{e}$입니다.',
          '점 $(1, 0)$에서의 접선 $y=x-1$의 기울기입니다. 이 접선은 원점을 지나지 않습니다.',
          '접점을 정하지 않고 어림했습니다. 접점을 $(t, \\ln t)$로 놓고 접선이 원점을 지날 조건을 세워 보십시오.',
        ],
        hint: '접점을 $(t, \\ln t)$로 놓고 접선의 방정식을 세운 뒤 원점을 대입합니다.',
        explain: '접점을 $(t, \\ln t)$라 하면 기울기는 $\\frac{1}{t}$이고 접선은 $y-\\ln t=\\frac{1}{t}(x-t)$입니다. 원점 $(0, 0)$을 대입하면 $-\\ln t=-1$, $t=e$입니다. 따라서 기울기는 $\\frac{1}{e}$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 2,
        q: '$\\lim_{x \\to 1}\\dfrac{\\ln x}{x^2-1}$의 값을 구하십시오.',
        answer: '1/2',
        hint: '$x-1=t$로 놓으면 $x \\to 1$일 때 $t \\to 0$입니다.',
        wrong: [{ a: '1', why: '$x^2-1=(x-1)(x+1)$에서 $x+1 \\to 2$를 빠뜨렸습니다.' }],
        explain: '$x-1=t$로 놓으면 $x \\to 1$일 때 $t \\to 0$이고 $\\dfrac{\\ln x}{x^2-1}=\\dfrac{\\ln(1+t)}{t(t+2)}=\\dfrac{\\ln(1+t)}{t} \\times \\dfrac{1}{t+2}$입니다. 극한값은 $1 \\times \\frac{1}{2}=\\frac{1}{2}$입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 3,
        q: '함수 $f(x)=\\begin{cases} e^x & (x \\le 0) \\\\ ax+b & (x>0) \\end{cases}$가 $x=0$에서 미분가능할 때, $a+b$의 값을 구하십시오.',
        answer: '2',
        hint: '미분가능하면 연속입니다. 연속 조건과 좌우 미분계수가 같을 조건을 함께 씁니다.',
        wrong: [{ a: '1', why: '연속 조건 $b=1$만 썼습니다. $x=0$에서 좌우의 미분계수도 같아야 하므로 $a=e^0=1$입니다.' }],
        explain: '$x=0$에서 연속이어야 하므로 $\\lim_{x \\to 0+}(ax+b)=b$와 $f(0)=e^0=1$이 같아 $b=1$입니다. 좌미분계수는 $(e^x)\'$의 $x=0$에서의 값 $e^0=1$, 우미분계수는 $a$이므로 $a=1$입니다. 따라서 $a+b=2$입니다.',
      },
    ],

    deeper: [
      {
        title: 'e는 어디에서 왔을까? — 복리 이자',
        body: '1원을 이자율 100%로 1년 동안 맡긴다고 해 봅시다. 1년에 한 번 이자를 붙이면 2원이 됩니다. 반년마다 50%씩 두 번 붙이면 $\\left(1+\\frac{1}{2}\\right)^2=2.25$원, 한 달마다 붙이면 $\\left(1+\\frac{1}{12}\\right)^{12}=2.613\\cdots$원, 하루마다 붙이면 $\\left(1+\\frac{1}{365}\\right)^{365}=2.714\\cdots$원이 됩니다.\n\n이자를 붙이는 횟수 $n$을 한없이 늘려도 금액은 끝없이 커지지 않고 $\\lim_{n \\to \\infty}\\left(1+\\frac{1}{n}\\right)^n=e$원에 가까워집니다. 17세기에 야코프 베르누이가 이런 복리 계산에서 이 수를 연구했고, 18세기에 오일러가 $e$라는 기호를 널리 쓰면서 오늘날의 이름이 자리 잡았습니다.',
      },
      {
        title: '왜 하필 e를 밑으로 쓸까?',
        body: '모든 지수함수 $a^x$은 "자기 크기에 비례하는 빠르기로" 변합니다. $(a^x)\'=a^x\\ln a$에서 비례 상수가 $\\ln a$입니다. 이 상수가 정확히 1이 되는 밑이 $e$입니다. 그래서 $e^x$은 미분해도 모양이 그대로이고, 미분과 적분 계산이 가장 간단해집니다.\n\n인구 증가, 방사성 물질의 감소, 커피가 식는 빠르기처럼 "양에 비례해서 변하는" 현상은 대학의 미분방정식에서 $e$를 밑으로 하는 지수함수로 나타냅니다. 그래서 과학과 공학에서는 $\\ln$과 $e^x$을 가장 많이 씁니다.',
      },
    ],

    faq: [
      {
        q: 'eˣ를 미분하면 왜 그대로 eˣ인가요?',
        a: '$(e^x)\'=e^x\\lim_{h \\to 0}\\frac{e^h-1}{h}$이고, 이 극한이 정확히 1이기 때문입니다. 사실은 거꾸로, 이 극한이 1이 되도록 정한 밑이 $e$라고 생각해도 됩니다. 그래프로는 $y=e^x$ 위 모든 점에서 접선의 기울기가 그 점의 높이와 같다는 뜻입니다.',
      },
      {
        q: '2ˣ를 미분할 때 x·2ˣ⁻¹로 하면 안 되나요?',
        a: '안 됩니다. $(x^n)\'=nx^{n-1}$은 $x^2$, $x^3$처럼 밑이 변수 $x$이고 지수가 상수일 때의 공식입니다. $2^x$은 밑이 상수이고 지수가 변수이므로 지수함수의 공식 $(a^x)\'=a^x\\ln a$를 써서 $2^x\\ln 2$입니다.',
      },
      {
        q: 'ln과 log는 뭐가 다른가요?',
        a: '$\\ln x$는 밑이 $e$인 자연로그 $\\log_e x$입니다. 고등학교에서 밑을 쓰지 않은 $\\log x$는 보통 밑이 10인 상용로그를 뜻합니다. 미분 공식이 가장 간단한 것은 자연로그로, $(\\ln x)\'=\\frac{1}{x}$입니다. 다른 밑은 $(\\log_a x)\'=\\frac{1}{x\\ln a}$처럼 $\\ln a$가 붙습니다.',
      },
      {
        q: '(1+x)^(1/x)은 1을 무한 번 곱한 것이니 1 아닌가요?',
        a: '밑이 정확히 1이라면 몇 번 곱해도 1이지만, 여기서 밑 $1+x$는 1이 아니라 1에 "가까워지는" 수입니다. 밑이 1보다 조금 클 때 아주 여러 번 곱하면 커지려는 힘이 생기고, 이것이 밑이 1에 가까워지는 힘과 맞서 약 2.718에서 균형을 이룹니다. 이런 꼴은 직접 계산해 보거나 식을 바꾸어 조사해야 합니다.',
      },
    ],

    mistakes: [
      '$(a^x)\'$을 $xa^{x-1}$으로 계산하는 실수 — 지수가 변수이므로 $(a^x)\'=a^x\\ln a$입니다.',
      '$(\\log_a x)\'$을 $\\frac{1}{x}$로 계산하여 $\\ln a$를 빠뜨리는 실수 — $(\\log_a x)\'=\\frac{1}{x\\ln a}$이고, $\\frac{1}{x}$은 밑이 $e$일 때뿐입니다.',
      '$\\lim_{x \\to 0}\\frac{e^{3x}-1}{x}$을 1이라고 하는 실수 — 분모를 $3x$로 맞추면 $\\frac{e^{3x}-1}{3x} \\times 3$이므로 3입니다.',
    ],

    gens: [
      {
        id: 'exp-log-limit',
        level: 1,
        title: '(eˣ-1)/x, ln(1+x)/x 꼴의 극한',
        make: function (R) {
          var kind = R.pick(['exp', 'log']);
          var p = R.nonzero(-5, 6), q = R.int(1, 6);
          if (p === q) q = q === 6 ? 5 : q + 1;
          var ans = R.F(p, q);
          var top = kind === 'exp' ? ePow(p) + '-1' : '\\ln(' + onePlus(p) + ')';
          var core = '\\dfrac{' + top + '}{' + kx(p) + '}';
          var mult = R.fmt.frac(ans);
          var multTex = ans.sign() < 0 ? '\\left(' + mult + '\\right)' : mult;
          var wrongs = [
            [R.F(q, p), '분자와 분모의 계수를 거꾸로 놓았습니다. 분모를 $' + kx(p) + '$' + R.josa('x', '으로/로') + ' 맞춘 뒤 $' + mult + '$' + R.josa(Math.abs(ans.num), '을/를') + ' 곱합니다.'],
            [R.F(1), (kind === 'exp' ? '$\\frac{e^x-1}{x} \\to 1$' : '$\\frac{\\ln(1+x)}{x} \\to 1$') + '을 그대로 썼습니다. 지수(괄호) 안의 식과 분모가 같아야 1입니다.'],
          ];
          if (q !== 1) wrongs.push([R.F(p), '분모의 계수 ' + q + R.josa(q, '을/를') + ' 빠뜨렸습니다.']);
          return {
            type: 'short', check: 'number', concept: 2,
            q: '$\\lim_{x \\to 0}\\dfrac{' + top + '}{' + kx(q) + '}$의 값을 구하십시오.',
            answer: ans.toString(),
            wrong: dedupe(ans, wrongs),
            explain: '분모를 $' + kx(p) + '$' + R.josa('x', '으로/로') + ' 맞춥니다. $\\dfrac{' + top + '}{' + kx(q) + '}=' + core + ' \\times ' + multTex + '$\n\n$' + kx(p) + '=t$로 놓으면 $x \\to 0$일 때 $t \\to 0$이므로 $' + core + ' \\to 1$입니다. 따라서 극한값은 $1 \\times ' + multTex + '=' + mult + '$입니다.',
          };
        },
      },
      {
        id: 'exp-log-limit-ratio',
        level: 2,
        title: '지수·로그 극한의 응용',
        make: function (R) {
          var kind = R.pick(['A', 'B', 'C']);
          var p = R.nonzero(-4, 5), q = R.nonzero(-4, 5);
          var ans, expr, wrongs = [], explain;
          if (kind === 'B') {
            if (q === p) q = p === 5 ? 4 : p + 1;
            expr = '\\dfrac{' + ePow(p) + '-' + ePow(q) + '}{x}';
            ans = R.F(p - q);
            wrongs.push([R.F(p + q), '두 극한을 더했습니다. 분자를 $(' + ePow(p) + '-1)-(' + ePow(q) + '-1)$처럼 나누면 두 극한의 차가 됩니다.']);
            wrongs.push([R.F(0), '$x \\to 0$일 때 분자가 0으로 가는 것만 보았습니다. 분모도 0으로 가는 $\\frac{0}{0}$ 꼴이므로 식을 나누어 조사합니다.']);
            explain = '분자에 1을 빼고 더하면 $\\dfrac{' + ePow(p) + '-' + ePow(q) + '}{x}=\\dfrac{' + ePow(p) + '-1}{x}-\\dfrac{' + ePow(q) + '-1}{x}$입니다. 각각의 극한은 $' + p + '$, $' + q + '$이므로 극한값은 $' + p + '-' + R.fmt.paren(q) + '=' + (p - q) + '$입니다.';
          } else {
            var num = kind === 'A' ? ePow(p) + '-1' : '\\ln(' + onePlus(p) + ')';
            var den = kind === 'A' ? '\\ln(' + onePlus(q) + ')' : ePow(q) + '-1';
            expr = '\\dfrac{' + num + '}{' + den + '}';
            ans = R.F(p, q);
            wrongs.push([R.F(q, p), '분자와 분모의 극한을 거꾸로 놓았습니다. 분자의 극한은 $' + p + '$, 분모의 극한은 $' + q + '$입니다.']);
            wrongs.push([R.F(1), '분자와 분모가 모두 기본 극한 꼴이라고 1로 보았습니다. 각각을 $x$로 나눈 극한이 $' + p + '$' + R.josa(Math.abs(p), '과/와') + ' $' + q + '$입니다.']);
            wrongs.push([R.F(p * q), '분자와 분모의 극한을 곱했습니다. 나누어야 합니다.']);
            explain = '분자와 분모를 각각 $x$로 나누면 $\\dfrac{\\frac{' + num + '}{x}}{\\frac{' + den + '}{x}}$입니다. 분자는 $' + p + '$에, 분모는 $' + q + '$에 가까워지므로 극한값은 $' + R.fmt.frac(ans) + '$입니다.';
          }
          return {
            type: 'short', check: 'number', concept: 2,
            q: '$\\lim_{x \\to 0}' + expr + '$의 값을 구하십시오.',
            answer: ans.toString(),
            hint: kind === 'B' ? '분자에 1을 빼고 더해 두 극한으로 나누어 보십시오.' : '분자와 분모를 각각 $x$로 나누어 보십시오.',
            wrong: dedupe(ans, wrongs),
            explain: explain,
          };
        },
      },
      {
        id: 'deriv-value',
        level: 1,
        title: '지수·로그함수가 섞인 함수의 미분계수',
        make: function (R) {
          var kind = R.pick(['ln', 'ln', 'exp']);
          var a = R.nonzero(-6, 6), b = R.nonzero(-3, 3), c = R.int(-5, 5);
          function joinF(arr) {
            var s = '';
            arr.forEach(function (f, i) {
              if (i > 0 && f.isZero()) return;
              var t = R.fmt.frac(f);
              s += i === 0 || t.charAt(0) === '-' ? t : '+' + t;
            });
            return s;
          }
          var f, fp, ans, wrongs = [], explain, at;
          if (kind === 'ln') {
            var k = R.int(1, 4);
            at = k;
            f = T(a, '\\ln x', true) + T(b, 'x^2', false) + T(c, 'x', false);
            fp = (a < 0 ? '-' : '') + '\\frac{' + Math.abs(a) + '}{x}' + T(2 * b, 'x', false) + (c ? R.fmt.signed(c) : '');
            var parts = [R.F(a, k), R.F(2 * b * k), R.F(c)];
            ans = R.F(a, k).add(2 * b * k).add(c);
            wrongs.push([R.F(a, k).add(b * k).add(c), '$x^2$의 도함수 $2x$에서 2를 빠뜨렸습니다.']);
            wrongs.push([R.F(2 * b * k + c), '$\\ln x$의 도함수를 0으로 보았습니다. $(\\ln x)\'=\\frac{1}{x}$입니다.']);
            wrongs.push([R.F(a * k + 2 * b * k + c), '$(\\ln x)\'$을 $x$로 계산했습니다. $(\\ln x)\'=\\frac{1}{x}$입니다.']);
            explain = '$f\'(x)=' + fp + '$이므로 $f\'(' + k + ')=' + joinF(parts) + '=' + R.fmt.frac(ans) + '$입니다.';
          } else {
            at = 0;
            f = T(a, 'e^x', true) + T(b, 'x^3', false) + T(c, 'x', false);
            fp = T(a, 'e^x', true) + T(3 * b, 'x^2', false) + (c ? R.fmt.signed(c) : '');
            ans = R.F(a + c);
            wrongs.push([R.F(c), '$e^x$을 상수로 보아 그 도함수를 0으로 계산했습니다. $e$는 상수이지만 $e^x$은 함수이고 $(e^x)\'=e^x$입니다.']);
            wrongs.push([R.F(a), '$' + T(c, 'x', true) + '$의 도함수 $' + c + '$' + R.josa(Math.abs(c), '을/를') + ' 빠뜨렸습니다.']);
            explain = '$f\'(x)=' + fp + '$이므로 $f\'(0)=' + T(a, 'e^0', true) + (b ? '+0' : '') + (c ? R.fmt.signed(c) : '') + '=' + (a + c) + '$입니다. ($e^0=1$)';
          }
          return {
            type: 'short', check: 'number', concept: kind === 'ln' ? 4 : 3,
            q: '함수 $f(x)=' + f + '$에 대하여 $f\'(' + at + ')$의 값을 구하십시오.',
            answer: ans.toString(),
            wrong: dedupe(ans, wrongs),
            explain: explain,
          };
        },
      },
      {
        id: 'deriv-formula',
        level: 2,
        title: '지수·로그함수의 도함수 고르기',
        make: function (R) {
          var kind = R.pick(['expa', 'loga', 'prodexp', 'prodln']);
          var a = R.pick([2, 3, 5, 10]);
          var k = R.int(1, 4);
          var kT = k === 1 ? '' : String(k);
          var f, correct, cands, concept, explain;
          if (kind === 'expa') {
            // 계수와 밑이 붙으면 4·2^x 가 42^x 로 읽히므로 계수 뒤에 \cdot 을 넣는다
            var kC = k === 1 ? '' : k + ' \\cdot ';
            f = kC + a + '^x';
            correct = kC + a + '^x\\ln ' + a;
            cands = [
              [kT + 'x \\cdot ' + a + '^{x-1}', '$(x^n)\'=nx^{n-1}$은 지수가 상수일 때의 공식입니다. $' + a + '^x$은 지수가 변수입니다.'],
              [kC + a + '^x', '그대로 나오는 것은 밑이 $e$일 때뿐입니다. $\\ln ' + a + '$' + R.josa(a, '을/를') + ' 곱해야 합니다.'],
              ['\\frac{' + kC + a + '^x}{\\ln ' + a + '}', '$\\ln ' + a + '$' + R.josa(a, '은/는') + ' 나누는 것이 아니라 곱합니다.'],
              [kC + a + '^x\\ln x', '$\\ln x$가 아니라 밑의 자연로그 $\\ln ' + a + '$' + R.josa(a, '을/를') + ' 곱합니다.'],
            ];
            concept = 3;
            explain = '$(a^x)\'=a^x\\ln a$이므로 $f\'(x)=' + correct + '$입니다.';
          } else if (kind === 'loga') {
            f = kT + '\\log_{' + a + '} x';
            correct = '\\frac{' + k + '}{x\\ln ' + a + '}';
            cands = [
              ['\\frac{' + k + '}{x}', '$\\frac{1}{x}$이 되는 것은 밑이 $e$일 때뿐입니다. $\\ln ' + a + '$' + R.josa(a, '으로/로') + ' 나누어야 합니다.'],
              ['\\frac{' + (k === 1 ? '' : k) + '\\ln ' + a + '}{x}', '$\\ln ' + a + '$' + R.josa(a, '은/는') + ' 곱하는 것이 아니라 나눕니다. $\\log_a x=\\frac{\\ln x}{\\ln a}$입니다.'],
              ['\\frac{' + k + '}{x\\ln x}', '밑의 자연로그 $\\ln ' + a + '$' + R.josa(a, '으로/로') + ' 나눕니다. $\\ln x$가 아닙니다.'],
              ['\\frac{' + k + '}{' + a + 'x}', '$\\ln ' + a + '$ 대신 밑 ' + a + R.josa(a, '으로/로') + ' 나누었습니다.'],
            ];
            concept = 4;
            explain = '$\\log_{' + a + '} x=\\dfrac{\\ln x}{\\ln ' + a + '}$이므로 $f\'(x)=' + correct + '$입니다.';
          } else if (kind === 'prodexp') {
            var p = R.nonzero(-4, 4);
            var lin = function (c) { return c === 0 ? 'xe^x' : '(x' + R.fmt.signed(c) + ')e^x'; };
            f = lin(p);
            correct = lin(p + 1);
            cands = [
              ['e^x', '두 함수의 도함수끼리 곱했습니다. 곱의 미분법은 $g\'h+gh\'$입니다.'],
              [lin(p), '$e^x$만 미분하고 $(x' + R.fmt.signed(p) + ')\'=1$인 항을 빠뜨렸습니다.'],
              [lin(p - 1), '$1 \\cdot e^x$ 항을 빼 버렸습니다. 곱의 미분법은 두 항을 더합니다.'],
              ['xe^{x-1}', '$e^x$에 $(x^n)\'=nx^{n-1}$을 쓰면 안 됩니다.'],
            ];
            concept = 3;
            explain = '곱의 미분법으로 $f\'(x)=1 \\cdot e^x+(x' + R.fmt.signed(p) + ')e^x=' + correct + '$입니다.';
          } else {
            var m = R.int(1, 3);
            var xp = function (d) { return d === 0 ? '' : d === 1 ? 'x' : 'x^' + d; };
            f = xp(m) + '\\ln x';
            correct = m === 1 ? '\\ln x+1' : m + xp(m - 1) + '\\ln x+' + xp(m - 1);
            cands = [
              [m === 1 ? '\\frac{1}{x}' : m === 2 ? '2' : '3x', '두 함수의 도함수끼리 곱했습니다. 곱의 미분법은 $g\'h+gh\'$입니다.'],
              [m === 1 ? '\\ln x' : m + xp(m - 1) + '\\ln x', '$' + xp(m) + ' \\cdot (\\ln x)\'$ 항을 빠뜨렸습니다.'],
              [m === 1 ? '1' : xp(m - 1), '$(' + xp(m) + ')\' \\cdot \\ln x$ 항을 빠뜨렸습니다.'],
              [m === 1 ? '\\ln x-1' : m + xp(m - 1) + '\\ln x-' + xp(m - 1), '곱의 미분법은 두 항을 더합니다. 빼지 않습니다.'],
            ];
            concept = 4;
            explain = '곱의 미분법으로 $f\'(x)=' + (m === 1 ? '1' : m + xp(m - 1)) + ' \\cdot \\ln x+' + xp(m) + ' \\cdot \\dfrac{1}{x}=' + correct + '$입니다.';
          }
          var reason = {};
          cands.forEach(function (c) { reason['$' + c[0] + '$'] = c[1]; });
          var pick = R.choices('$' + correct + '$', cands.map(function (c) { return '$' + c[0] + '$'; }));
          return {
            type: 'choice', concept: concept,
            q: '함수 $f(x)=' + f + '$의 도함수는 무엇입니까?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c, i) { return i === pick.answer ? '' : reason[c] || ''; }),
            explain: explain,
          };
        },
      },
    ],
  });
})();
