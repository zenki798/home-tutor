/* 미적분Ⅰ · 극한값의 계산
 * 함수의 극한에 대한 성질(합·차·곱·몫), 0/0 꼴(인수분해·유리화), ∞/∞ 꼴과 ∞-∞ 꼴,
 * 극한값이 주어질 때 미정계수 구하기, 함수의 극한의 대소 관계를 다룬다.
 * (연속은 다음 단원 — 여기서는 "다항함수는 극한의 성질로 대입해서 구한다"까지만 쓴다) */
(function () {
  // 분수 TeX: 정수면 그대로, 아니면 \frac
  function ft(R, f) { return R.fmt.frac(f); }

  Tutor.registerUnit({
    id: 'math-h-calc1-02',
    course: 'math-h-calc1',
    title: '극한값의 계산',
    summary: '함수의 극한에 대한 성질을 이용해 $\\frac{0}{0}$ 꼴, $\\frac{\\infty}{\\infty}$ 꼴, $\\infty-\\infty$ 꼴의 극한값을 구하고, 극한값이 주어질 때 미정계수를 정합니다.',
    goals: [
      '함수의 극한에 대한 성질을 이용하여 극한값을 구할 수 있다.',
      '$\\frac{0}{0}$ 꼴의 극한을 인수분해나 유리화로 계산할 수 있다.',
      '$\\frac{\\infty}{\\infty}$ 꼴과 $\\infty-\\infty$ 꼴의 극한을 계산할 수 있다.',
      '극한값이 주어진 조건으로 미정계수를 구하고, 함수의 극한의 대소 관계를 활용할 수 있다.',
    ],
    standards: ['[12미적Ⅰ-01-02]'],

    concepts: [
      {
        title: '함수의 극한에 대한 성질',
        body: '$\\lim_{x \\to a} f(x)=\\alpha$, $\\lim_{x \\to a} g(x)=\\beta$ ($\\alpha$, $\\beta$는 실수)일 때\n\n1. $\\lim_{x \\to a} cf(x)=c\\alpha$ ($c$는 상수)\n2. $\\lim_{x \\to a}\\{f(x) \\pm g(x)\\}=\\alpha \\pm \\beta$ (복부호 같은 순서)\n3. $\\lim_{x \\to a} f(x)g(x)=\\alpha\\beta$\n4. $\\lim_{x \\to a}\\dfrac{f(x)}{g(x)}=\\dfrac{\\alpha}{\\beta}$ (단, $\\beta \\ne 0$)\n\n이 성질은 $x \\to a+$, $x \\to a-$, $x \\to \\infty$, $x \\to -\\infty$일 때도 성립합니다.\n\n$\\lim_{x \\to a} x=a$와 상수의 극한에 이 성질을 거듭 쓰면, 다항함수 $p(x)$는 $\\lim_{x \\to a} p(x)=p(a)$입니다. 예: $\\lim_{x \\to 2}(x^2+3x)=4+6=10$\n\n> ⚠️ 이 성질은 $f(x)$와 $g(x)$의 극한값이 **모두 존재할 때만** 쓸 수 있습니다. 예를 들어 $x \\cdot \\frac{1}{x}=1$이므로 $\\lim_{x \\to 0} x \\cdot \\frac{1}{x}=1$이지만, $\\lim_{x \\to 0}\\frac{1}{x}$이 존재하지 않으므로 "$0 \\times (\\text{극한})$"처럼 나누어 계산할 수 없습니다.',
        easy: '극한의 성질은 "극한을 먼저 구하고 계산해도 된다"는 허락입니다. $f(x)$가 3으로, $g(x)$가 $-2$로 다가가면 $f(x)+g(x)$는 $3+(-2)=1$로, $f(x)g(x)$는 $-6$으로 다가갑니다.\n\n다만 각자가 어떤 수로 다가갈 때에만 이 허락이 유효합니다. 어느 하나가 한없이 커지는 등 극한값이 없으면 따로 생각해야 합니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\lim_{x \\to 1} f(x)=3$, $\\lim_{x \\to 1} g(x)=-2$일 때, $\\lim_{x \\to 1}\\{2f(x)-f(x)g(x)\\}$의 값을 구하십시오.',
          answer: '12',
          wrong: [{ a: '0', why: '$f(x)g(x)$의 극한을 $3 \\times (-2)=-6$이 아니라 6으로 계산했습니다. 부호를 확인해 보십시오.' }],
          explain: '극한의 성질에 따라 $2 \\times 3-3 \\times (-2)=6+6=12$입니다.',
        },
      },
      {
        title: '$\\frac{0}{0}$ 꼴: 인수분해와 유리화',
        body: '$x=a$를 그대로 넣으면 분자와 분모가 모두 0이 되는 극한을 $\\frac{0}{0}$ 꼴이라고 합니다. 분모의 극한이 0이므로 몫의 성질을 바로 쓸 수 없습니다. 그래서 식을 고친 뒤 극한을 구합니다.\n\n**인수분해**: 분자와 분모의 공통인수 $x-a$를 약분합니다. $x \\to a$일 때 $x \\ne a$이므로 $x-a \\ne 0$이어서 약분할 수 있습니다.\n\n$\\lim_{x \\to 2}\\dfrac{x^2-4}{x-2}=\\lim_{x \\to 2}\\dfrac{(x-2)(x+2)}{x-2}=\\lim_{x \\to 2}(x+2)=4$\n\n**유리화**: 근호가 있으면 켤레식을 분자와 분모에 곱해 근호를 한쪽으로 옮긴 뒤 약분합니다.\n\n$\\lim_{x \\to 0}\\dfrac{\\sqrt{x+1}-1}{x}=\\lim_{x \\to 0}\\dfrac{(x+1)-1}{x(\\sqrt{x+1}+1)}=\\lim_{x \\to 0}\\dfrac{1}{\\sqrt{x+1}+1}=\\dfrac{1}{2}$\n\n> ⚠️ $\\frac{0}{0}$은 값이 아닙니다. 0도, 1도, "존재하지 않음"도 아니고 "아직 모른다"는 표시입니다.',
        easy: '$\\frac{0}{0}$ 꼴은 분자와 분모가 같은 "0이 되는 원인" $x-a$를 함께 품고 있는 상태입니다. 그 원인을 약분해 덜어 내면 나머지 식에는 $x=a$를 넣을 수 있습니다.\n\n근호가 있어서 인수분해가 안 보이면, $(A-B)(A+B)=A^2-B^2$을 이용해 근호를 없애면 숨어 있던 $x-a$가 드러납니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\lim_{x \\to 3}\\dfrac{x^2-9}{x-3}$의 값을 구하십시오.',
          answer: '6',
          wrong: [{ a: '0', why: '$x=3$을 넣어 $\\frac{0}{0}$이 되는 것을 0으로 보았습니다. $\\frac{0}{0}$은 값이 아니므로 먼저 약분합니다.' }],
          explain: '$\\frac{x^2-9}{x-3}=\\frac{(x-3)(x+3)}{x-3}=x+3$ ($x \\ne 3$)이므로 극한값은 $3+3=6$입니다.',
        },
      },
      {
        title: '$\\frac{\\infty}{\\infty}$ 꼴',
        body: '$x \\to \\infty$일 때 분자와 분모가 모두 한없이 커지는 극한은 **분모의 최고차항**으로 분자와 분모를 나누어 구합니다. $\\frac{1}{x}$, $\\frac{1}{x^2}$ 같은 항은 0으로 수렴하기 때문입니다.\n\n$\\lim_{x \\to \\infty}\\dfrac{3x^2+x}{2x^2-1}=\\lim_{x \\to \\infty}\\dfrac{3+\\frac{1}{x}}{2-\\frac{1}{x^2}}=\\dfrac{3}{2}$\n\n유리함수의 $\\frac{\\infty}{\\infty}$ 꼴은 분자와 분모의 차수로 결과를 정리할 수 있습니다.\n\n| 차수 비교 | 극한 | 예 |\n|---|---|---|\n| (분자의 차수) < (분모의 차수) | 0 | $\\lim_{x \\to \\infty}\\frac{x+1}{x^2+1}=0$ |\n| (분자의 차수) = (분모의 차수) | 최고차항의 계수의 비 | $\\lim_{x \\to \\infty}\\frac{4x-1}{2x+5}=2$ |\n| (분자의 차수) > (분모의 차수) | 발산 ($\\infty$ 또는 $-\\infty$) | $\\lim_{x \\to \\infty}\\frac{x^2}{x+1}=\\infty$ |\n\n> 💡 $x \\to -\\infty$일 때는 $x$가 음수이므로 부호에 주의합니다. 특히 $\\sqrt{x^2}=|x|=-x$입니다.',
        easy: '$x$가 백만, 억처럼 커지면 식에서 가장 차수가 높은 항이 나머지를 압도합니다. $3x^2+x$에서 $x=1000000$이면 $3x^2$은 3조이고 $x$는 백만이라 거의 보이지 않습니다.\n\n그래서 $\\frac{3x^2+x}{2x^2-1}$의 값은 사실상 $\\frac{3x^2}{2x^2}=\\frac{3}{2}$처럼 움직입니다. 분모의 최고차항으로 나누는 것은 이 직관을 정확한 계산으로 만드는 방법입니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\lim_{x \\to \\infty}\\dfrac{4x-1}{2x+5}$의 값을 구하십시오.',
          answer: '2',
          wrong: [{ a: '-1/5', why: '상수항끼리의 비를 구했습니다. $x \\to \\infty$에서는 최고차항이 결과를 정합니다.' }],
          explain: '분자와 분모를 $x$로 나누면 $\\frac{4-\\frac{1}{x}}{2+\\frac{5}{x}} \\to \\frac{4}{2}=2$입니다.',
        },
      },
      {
        title: '$\\infty-\\infty$ 꼴',
        body: '두 식이 모두 한없이 커지는데 그 차를 묻는 극한입니다. $\\infty-\\infty$는 0이 아닙니다. 어느 쪽이 얼마나 빨리 커지는지에 따라 결과가 달라집니다.\n\n**다항식**: 최고차항으로 묶습니다.\n\n$\\lim_{x \\to \\infty}(x^2-3x)=\\lim_{x \\to \\infty}x^2\\left(1-\\frac{3}{x}\\right)=\\infty$\n\n**근호가 있는 식**: 분모를 1로 보고 유리화하여 $\\frac{\\infty}{\\infty}$ 꼴로 바꿉니다.\n\n$\\lim_{x \\to \\infty}(\\sqrt{x^2+4x}-x)=\\lim_{x \\to \\infty}\\dfrac{(x^2+4x)-x^2}{\\sqrt{x^2+4x}+x}=\\lim_{x \\to \\infty}\\dfrac{4x}{\\sqrt{x^2+4x}+x}$\n\n분자와 분모를 $x$로 나누면 ($x>0$이므로 $\\frac{\\sqrt{x^2+4x}}{x}=\\sqrt{1+\\frac{4}{x}}$)\n\n$=\\lim_{x \\to \\infty}\\dfrac{4}{\\sqrt{1+\\frac{4}{x}}+1}=\\dfrac{4}{2}=2$',
        easy: '두 식 $\\sqrt{x^2+4x}$, $x$는 끝없이 달리는 두 사람과 같습니다. 둘 다 끝없이 달리지만 그 **간격**은 일정한 값 2에 가까워질 수 있습니다.\n\n간격을 보려면 유리화로 "차"를 "몫"으로 바꿔야 합니다. 그러면 앞에서 배운 $\\frac{\\infty}{\\infty}$ 꼴 계산을 쓸 수 있습니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\lim_{x \\to \\infty}(\\sqrt{x^2+2x}-x)$의 값을 구하십시오.',
          answer: '1',
          wrong: [{ a: '0', why: '$\\infty-\\infty$를 0으로 보았습니다. 유리화하면 $\\frac{2x}{\\sqrt{x^2+2x}+x}$가 되어 1에 수렴합니다.' }],
          explain: '유리화하면 $\\frac{2x}{\\sqrt{x^2+2x}+x}=\\frac{2}{\\sqrt{1+\\frac{2}{x}}+1} \\to \\frac{2}{2}=1$입니다.',
        },
      },
      {
        title: '극한값이 주어질 때 미정계수 구하기',
        body: '$\\lim_{x \\to a}\\dfrac{f(x)}{g(x)}=\\alpha$ ($\\alpha$는 실수)일 때\n\n1. $\\lim_{x \\to a} g(x)=0$이면 $\\lim_{x \\to a} f(x)=0$입니다.\n2. $\\alpha \\ne 0$이고 $\\lim_{x \\to a} f(x)=0$이면 $\\lim_{x \\to a} g(x)=0$입니다.\n\n까닭: 1에서 $f(x)=\\frac{f(x)}{g(x)} \\cdot g(x)$이므로 $\\lim f(x)=\\alpha \\cdot 0=0$입니다. 분모가 0으로 가는데 극한값이 있으려면 분자도 0으로 가야 합니다(그렇지 않으면 발산합니다).\n\n**예**: $\\lim_{x \\to 1}\\dfrac{x^2+ax+b}{x-1}=3$일 때\n\n- 분모 $\\to 0$이므로 분자 $\\to 0$: $1+a+b=0$, 곧 $b=-a-1$\n- 분자 $=x^2+ax-a-1=(x-1)(x+a+1)$이므로 극한값은 $1+a+1=a+2$\n- $a+2=3$에서 $a=1$, $b=-2$',
        easy: '분모가 0에 가까워지는데 분수가 어떤 수로 수렴한다면, 분자가 0이 아닌 수로 가는 경우는 불가능합니다. 예를 들어 $\\frac{1}{0.001}=1000$처럼 값이 폭발하기 때문입니다.\n\n그래서 "분모 → 0이고 극한값이 있다"는 말을 들으면 곧바로 "분자 → 0"이라는 식을 하나 얻습니다. 이것이 미정계수를 구하는 첫걸음입니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\lim_{x \\to 2}\\dfrac{x^2+ax-6}{x-2}$의 값이 존재할 때, 상수 $a$의 값을 구하십시오.',
          answer: '1',
          wrong: [{ a: '5', why: '극한값 5를 구했습니다. 묻는 것은 상수 $a$입니다.' }],
          explain: '분모가 0으로 가므로 분자도 0으로 가야 합니다. $4+2a-6=0$에서 $a=1$입니다. (이때 $\\frac{(x-2)(x+3)}{x-2}=x+3 \\to 5$로 극한값은 5입니다.)',
        },
      },
      {
        title: '함수의 극한의 대소 관계',
        body: '$\\lim_{x \\to a} f(x)=\\alpha$, $\\lim_{x \\to a} g(x)=\\beta$이고, $a$에 가까운 모든 $x$에 대하여\n\n1. $f(x) \\le g(x)$이면 $\\alpha \\le \\beta$입니다.\n2. $f(x) \\le h(x) \\le g(x)$이고 $\\alpha=\\beta$이면 $\\lim_{x \\to a} h(x)=\\alpha$입니다.\n\n2를 쓰면 직접 구하기 어려운 $h(x)$의 극한을 양쪽에서 조여서 구할 수 있습니다. ($x \\to \\infty$ 등에서도 성립합니다.)\n\n**예**: 모든 실수 $x$에 대하여 $2x-1 \\le h(x) \\le x^2$이면, $\\lim_{x \\to 1}(2x-1)=1$, $\\lim_{x \\to 1}x^2=1$이므로 $\\lim_{x \\to 1} h(x)=1$입니다.\n\n**예**: $x>0$일 때 $-1 \\le \\sin x \\le 1$에서 $-\\frac{1}{x} \\le \\frac{\\sin x}{x} \\le \\frac{1}{x}$이고 양쪽이 0으로 수렴하므로 $\\lim_{x \\to \\infty}\\frac{\\sin x}{x}=0$입니다.\n\n> ⚠️ $f(x)<g(x)$라도 $\\alpha<\\beta$라고 할 수는 없습니다. $x>0$에서 $1-\\frac{1}{x}<1+\\frac{1}{x}$이지만 $x \\to \\infty$일 때 두 극한은 모두 1입니다. 부등호 $<$는 극한에서 $\\le$로 바뀔 수 있습니다.',
        easy: '두 친구가 가운데 친구의 양팔을 잡고 같은 문으로 걸어 들어간다고 생각해 보십시오. 왼쪽 친구도 오른쪽 친구도 그 문으로 들어가면, 가운데 친구는 다른 곳으로 갈 수 없습니다.\n\n$h(x)$를 아래에서 받치는 $f(x)$와 위에서 누르는 $g(x)$가 같은 값으로 가면 $h(x)$도 그 값으로 갑니다.',
        check: {
          type: 'short', check: 'number',
          q: '모든 실수 $x$에 대하여 $4x-4 \\le f(x) \\le x^2$일 때, $\\lim_{x \\to 2} f(x)$의 값을 구하십시오.',
          answer: '4',
          wrong: [{ a: '0', why: '조이는 두 함수의 극한을 다시 계산해 보십시오. $4 \\times 2-4=4$, $2^2=4$입니다.' }],
          explain: '$\\lim_{x \\to 2}x^2=4$, $\\lim_{x \\to 2}(4x-4)=4$로 같으므로 함수의 극한의 대소 관계에 따라 $\\lim_{x \\to 2} f(x)=4$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '$\\lim_{x \\to -1}\\dfrac{x^2-x-2}{x^2-1}$의 값을 구하십시오.',
        steps: [
          '$x=-1$을 넣으면 분자 $1+1-2=0$, 분모 $1-1=0$이므로 $\\frac{0}{0}$ 꼴입니다.',
          '분자와 분모를 인수분해합니다. $\\frac{(x-2)(x+1)}{(x-1)(x+1)}$',
          '$x \\ne -1$이므로 $x+1$로 약분하면 $\\frac{x-2}{x-1}$입니다.',
          '이제 분모의 극한이 $-2 \\ne 0$이므로 대입하면 $\\frac{-1-2}{-1-1}=\\frac{-3}{-2}=\\frac{3}{2}$입니다.',
        ],
        answer: '$\\frac{3}{2}$',
      },
      {
        q: '$\\lim_{x \\to \\infty}(\\sqrt{4x^2+x}-2x)$의 값을 구하십시오.',
        steps: [
          '$\\infty-\\infty$ 꼴이므로 분모를 1로 보고 유리화합니다.',
          '$\\frac{(4x^2+x)-4x^2}{\\sqrt{4x^2+x}+2x}=\\frac{x}{\\sqrt{4x^2+x}+2x}$',
          '분자와 분모를 $x$로 나눕니다($x>0$). $\\frac{1}{\\sqrt{4+\\frac{1}{x}}+2}$',
          '$\\frac{1}{x} \\to 0$이므로 극한값은 $\\frac{1}{\\sqrt{4}+2}=\\frac{1}{4}$입니다.',
        ],
        answer: '$\\frac{1}{4}$',
      },
      {
        q: '$\\lim_{x \\to 3}\\dfrac{x^2+ax+b}{x-3}=5$일 때, 상수 $a$, $b$의 값을 구하십시오.',
        steps: [
          '분모 $x-3 \\to 0$이고 극한값이 존재하므로 분자도 0으로 갑니다: $9+3a+b=0$',
          '분자는 $x=3$에서 0이므로 $x-3$을 인수로 가집니다. $x^2+ax+b=(x-3)(x+c)$로 놓습니다.',
          '약분하면 극한값은 $3+c$이므로 $3+c=5$, $c=2$입니다.',
          '$(x-3)(x+2)=x^2-x-6$이므로 $a=-1$, $b=-6$입니다.',
        ],
        answer: '$a=-1$, $b=-6$',
      },
    ],

    terms: [
      { term: '극한의 성질', def: '극한값이 각각 존재하는 두 함수의 합·차·곱·몫(분모의 극한이 0이 아닐 때)의 극한은 극한값의 합·차·곱·몫과 같다는 성질입니다.' },
      { term: '0/0 꼴', def: '분자와 분모의 극한이 모두 0인 극한입니다. 인수분해나 유리화로 약분한 뒤 구합니다. 예: $\\lim_{x \\to 2}\\frac{x^2-4}{x-2}$' },
      { term: '∞/∞ 꼴', def: '분자와 분모가 모두 한없이 커지는(또는 작아지는) 극한입니다. 분모의 최고차항으로 분자와 분모를 나누어 구합니다.' },
      { term: '∞-∞ 꼴', def: '한없이 커지는 두 식의 차의 극한입니다. 다항식은 최고차항으로 묶고, 근호가 있으면 유리화합니다.' },
      { term: '유리화', def: '켤레식을 곱하여 근호를 없애는 것입니다. 예: $(\\sqrt{x+1}-1)(\\sqrt{x+1}+1)=x$' },
      { term: '미정계수', def: '아직 정해지지 않은 계수입니다. 극한값이 존재한다는 조건으로 식을 세워 구합니다.' },
      { term: '함수의 극한의 대소 관계', def: '$f(x) \\le g(x)$이면 극한값도 $\\lim f(x) \\le \\lim g(x)$이고, $f(x) \\le h(x) \\le g(x)$에서 양쪽 극한이 같으면 $h(x)$의 극한도 그 값이라는 성질입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '$\\lim_{x \\to 2}(x^3-2x+1)$의 값을 구하십시오.',
        answer: '5',
        wrong: [{ a: '3', why: '$x^3$을 $3x$처럼 계산했습니다. $2^3=8$이므로 $8-4+1=5$입니다.' }],
        explain: '다항함수의 극한은 극한의 성질에 따라 $x=2$를 대입한 값과 같습니다. $8-4+1=5$',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 0,
        q: '$\\lim_{x \\to 3} f(x)=4$, $\\lim_{x \\to 3} g(x)=-1$일 때, $\\lim_{x \\to 3}\\dfrac{f(x)+2g(x)}{f(x)g(x)}$의 값을 구하십시오.',
        answer: '-1/2',
        wrong: [{ a: '1/2', why: '분모 $f(x)g(x)$의 극한 $4 \\times (-1)=-4$의 부호를 놓쳤습니다.' }],
        explain: '분모의 극한이 $4 \\times (-1)=-4 \\ne 0$이므로 몫의 성질을 쓸 수 있습니다. $\\frac{4+2 \\times (-1)}{-4}=\\frac{2}{-4}=-\\frac{1}{2}$',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 1,
        q: '$\\lim_{x \\to 1}\\dfrac{x^2+2x-3}{x-1}$의 값을 구하십시오.',
        answer: '4',
        wrong: [{ a: '0', why: '$\\frac{0}{0}$을 0으로 보았습니다. 분자를 $(x-1)(x+3)$으로 인수분해해 약분합니다.' }],
        explain: '$\\frac{(x-1)(x+3)}{x-1}=x+3$ ($x \\ne 1$)이므로 극한값은 $1+3=4$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', concept: 1,
        q: '$\\lim_{x \\to 4}\\dfrac{\\sqrt{x}-2}{x-4}$의 값을 구하십시오.',
        answer: '1/4',
        hint: '분자와 분모에 $\\sqrt{x}+2$를 곱해 봅니다.',
        wrong: [{ a: '4', why: '마지막에 역수를 답했습니다. 약분하면 $\\frac{1}{\\sqrt{x}+2}$이므로 $\\frac{1}{4}$입니다.' }],
        explain: '$\\frac{(\\sqrt{x}-2)(\\sqrt{x}+2)}{(x-4)(\\sqrt{x}+2)}=\\frac{x-4}{(x-4)(\\sqrt{x}+2)}=\\frac{1}{\\sqrt{x}+2}$이므로 극한값은 $\\frac{1}{2+2}=\\frac{1}{4}$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 2,
        q: '$\\lim_{x \\to \\infty}\\dfrac{5x^2-x}{x^2+3}$의 값을 구하십시오.',
        answer: '5',
        wrong: [{ a: '0', why: '분모가 커지니 0이라고 보았습니다. 분자와 분모의 차수가 같으면 최고차항의 계수의 비가 극한값입니다.' }],
        explain: '분자와 분모를 $x^2$으로 나누면 $\\frac{5-\\frac{1}{x}}{1+\\frac{3}{x^2}} \\to \\frac{5}{1}=5$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 2,
        q: '$\\lim_{x \\to \\infty}\\dfrac{x+1}{x^2+1}$의 값은 무엇입니까?',
        choices: ['$0$', '$\\frac{\\infty}{\\infty}$ 꼴이라 정할 수 없다', '$1$', '$\\infty$'],
        answer: 0,
        why: ['', '$\\frac{\\infty}{\\infty}$는 값이 아니라 "식을 고쳐서 다시 구하라"는 표시입니다. 분모의 최고차항 $x^2$으로 분자와 분모를 나누면 극한값을 구할 수 있습니다.', '최고차항의 계수의 비로 계산했습니다. 그 규칙은 분자와 분모의 차수가 같을 때만 씁니다.', '분모의 차수가 더 높으므로 분모가 훨씬 빨리 커집니다.'],
        explain: '분자와 분모를 $x^2$으로 나누면 $\\frac{\\frac{1}{x}+\\frac{1}{x^2}}{1+\\frac{1}{x^2}} \\to \\frac{0}{1}=0$입니다. 분자의 차수가 분모의 차수보다 낮으면 극한값은 0입니다.',
      },
      {
        id: 'p7', level: 1, type: 'ox', concept: 3,
        q: '$\\lim_{x \\to \\infty}(x^2-x)=\\infty-\\infty=0$입니다.',
        answer: false,
        explain: '$\\infty-\\infty$는 0이 아닙니다. 최고차항으로 묶으면 $x^2\\left(1-\\frac{1}{x}\\right)$이고, $x^2 \\to \\infty$, $1-\\frac{1}{x} \\to 1$이므로 $\\lim_{x \\to \\infty}(x^2-x)=\\infty$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 3,
        q: '$\\lim_{x \\to \\infty}(\\sqrt{x^2+6x}-x)$의 값을 구하십시오.',
        answer: '3',
        hint: '분모를 1로 보고 $\\sqrt{x^2+6x}+x$를 분자와 분모에 곱합니다.',
        wrong: [
          { a: '0', why: '$\\infty-\\infty$를 0으로 보았습니다. 유리화해서 $\\frac{\\infty}{\\infty}$ 꼴로 바꿉니다.' },
          { a: '6', why: '유리화한 뒤 분모 $\\sqrt{x^2+6x}+x$를 $x$로 나누면 2가 된다는 것을 빠뜨렸습니다.' },
        ],
        explain: '$\\frac{6x}{\\sqrt{x^2+6x}+x}=\\frac{6}{\\sqrt{1+\\frac{6}{x}}+1} \\to \\frac{6}{2}=3$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
        q: '$\\lim_{x \\to 2}\\dfrac{x^2+ax+b}{x-2}=6$일 때, 상수 $a$, $b$에 대하여 $a+b$의 값을 구하십시오.',
        answer: '-6',
        hint: '분모가 0으로 가므로 분자도 0으로 가야 합니다.',
        wrong: [{ a: '6', why: '극한값을 답했습니다. $a=2$, $b=-8$을 구해 더합니다.' }],
        explain: '분자 $\\to 0$이므로 $4+2a+b=0$입니다. 분자를 $(x-2)(x+c)$로 놓으면 극한값은 $2+c=6$, $c=4$입니다. $(x-2)(x+4)=x^2+2x-8$이므로 $a=2$, $b=-8$이고 $a+b=-6$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 4,
        q: '두 함수 $f(x)$, $g(x)$에 대한 설명으로 **항상 옳은** 것은 무엇입니까?',
        choices: [
          '$\\lim_{x \\to a}\\frac{f(x)}{g(x)}$가 존재하고 $\\lim_{x \\to a} g(x)=0$이면 $\\lim_{x \\to a} f(x)=0$이다',
          '$\\lim_{x \\to a} f(x)g(x)$가 존재하면 $\\lim_{x \\to a} f(x)$도 존재한다',
          '$\\lim_{x \\to a}\\{f(x)+g(x)\\}$가 존재하면 $\\lim_{x \\to a} f(x)$도 존재한다',
          '$x \\ne a$일 때 $f(x)<g(x)$이면 $\\lim_{x \\to a} f(x)<\\lim_{x \\to a} g(x)$이다',
        ],
        answer: 0,
        why: [
          '',
          '반례: $f(x)=\\frac{1}{x}$, $g(x)=x$이면 $f(x)g(x)=1$이지만 $\\lim_{x \\to 0}\\frac{1}{x}$은 존재하지 않습니다.',
          '반례: $f(x)=\\frac{1}{x}$, $g(x)=-\\frac{1}{x}$이면 합은 0이지만 $\\lim_{x \\to 0}\\frac{1}{x}$은 존재하지 않습니다.',
          '반례: $f(x)=0$, $g(x)=x^2$이면 $x \\ne 0$에서 $f(x)<g(x)$이지만 $x \\to 0$일 때 두 극한은 모두 0입니다.',
        ],
        explain: '$f(x)=\\frac{f(x)}{g(x)} \\cdot g(x)$이고 두 극한값이 모두 존재하므로 $\\lim f(x)=(\\text{극한값}) \\times 0=0$입니다. 나머지는 반례가 있습니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 5,
        q: '$x>0$인 모든 실수 $x$에 대하여 $2x+1<f(x)<2x+3$일 때, $\\lim_{x \\to \\infty}\\dfrac{f(x)}{x}$의 값을 구하십시오.',
        answer: '2',
        hint: '부등식의 각 변을 양수 $x$로 나눕니다.',
        wrong: [{ a: '0', why: '$f(x)$가 한없이 커진다는 것을 놓쳤습니다. 각 변을 $x$로 나누면 양쪽이 2로 수렴합니다.' }],
        explain: '각 변을 양수 $x$로 나누면 $2+\\frac{1}{x}<\\frac{f(x)}{x}<2+\\frac{3}{x}$입니다. 양쪽의 극한이 모두 2이므로 $\\lim_{x \\to \\infty}\\frac{f(x)}{x}=2$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 2,
        q: '$\\lim_{x \\to -\\infty}\\dfrac{2x^2+1}{x-3}$에 대한 설명으로 옳은 것은 무엇입니까?',
        choices: ['음의 무한대로 발산한다', '양의 무한대로 발산한다', '2에 수렴한다', '0에 수렴한다'],
        answer: 0,
        why: [
          '',
          '$x \\to \\infty$일 때의 결과입니다. $x \\to -\\infty$이면 분모 $x-3$이 음수입니다.',
          '최고차항의 계수의 비는 차수가 같을 때만 씁니다. 여기서는 분자의 차수가 더 높습니다.',
          '분자의 차수가 분모보다 높으면 0이 아니라 발산합니다.',
        ],
        hint: '분자와 분모를 $x$로 나누어 봅니다.',
        explain: '분자와 분모를 $x$로 나누면 $\\frac{2x+\\frac{1}{x}}{1-\\frac{3}{x}}$입니다. $x \\to -\\infty$이면 분자 $2x+\\frac{1}{x} \\to -\\infty$, 분모 $\\to 1$이므로 음의 무한대로 발산합니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 2,
        q: '$\\lim_{x \\to -\\infty}\\dfrac{\\sqrt{x^2+3}}{x+1}$의 값을 구하십시오.',
        answer: '-1',
        hint: '$x<0$이면 $\\sqrt{x^2}=-x$입니다. 분자와 분모를 $-x$로 나누어 봅니다.',
        wrong: [{ a: '1', why: '$x<0$일 때 $\\sqrt{x^2}=|x|=-x$라는 것을 놓쳤습니다. 분자는 양수, 분모는 음수입니다.' }],
        explain: '$x=-t$로 놓으면 $x \\to -\\infty$일 때 $t \\to \\infty$이고 $\\frac{\\sqrt{t^2+3}}{-t+1}$입니다. 분자와 분모를 $t$로 나누면 $\\frac{\\sqrt{1+\\frac{3}{t^2}}}{-1+\\frac{1}{t}} \\to \\frac{1}{-1}=-1$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 4,
        q: '$\\lim_{x \\to 2}\\dfrac{x-2}{x^2+ax+b}=\\dfrac{1}{5}$일 때, 상수 $a$, $b$에 대하여 $a+b$의 값을 구하십시오.',
        answer: '-5',
        hint: '분자가 0으로 가고 극한값이 0이 아니므로 분모도 0으로 가야 합니다.',
        wrong: [{ a: '-6', why: '$b=-6$만 구했습니다. $a=1$도 구해서 더합니다.' }],
        explain: '극한값 $\\frac{1}{5} \\ne 0$이고 분자 $\\to 0$이므로 분모 $\\to 0$입니다: $4+2a+b=0$\n\n분모를 $(x-2)(x+c)$로 놓으면 극한값은 $\\frac{1}{2+c}=\\frac{1}{5}$, $c=3$입니다.\n\n$(x-2)(x+3)=x^2+x-6$이므로 $a=1$, $b=-6$, $a+b=-5$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 4,
        q: '다항함수 $f(x)$가 $\\lim_{x \\to \\infty}\\dfrac{f(x)}{x^2}=2$, $\\lim_{x \\to 1}\\dfrac{f(x)}{x-1}=3$을 만족시킬 때, $f(2)$의 값을 구하십시오.',
        answer: '5',
        hint: '첫째 조건에서 $f(x)$의 차수와 최고차항의 계수를 알 수 있습니다.',
        wrong: [{ a: '8', why: '$f(x)=2x^2$으로만 보았습니다. 둘째 조건에서 $f(1)=0$이어야 합니다.' }],
        explain: '첫째 조건에서 $f(x)$는 최고차항이 $2x^2$인 이차함수입니다. 둘째 조건에서 분모 $\\to 0$이므로 $f(1)=0$, 곧 $f(x)=(x-1)(2x+c)$로 놓을 수 있습니다.\n\n$\\lim_{x \\to 1}\\frac{f(x)}{x-1}=2+c=3$에서 $c=1$이므로 $f(x)=(x-1)(2x+1)$입니다. 따라서 $f(2)=1 \\times 5=5$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 5,
        q: '$\\lim_{x \\to \\infty}\\dfrac{3x+2\\sin x}{x+1}$의 값을 구하십시오.',
        answer: '3',
        hint: '$-1 \\le \\sin x \\le 1$을 이용해 분자를 양쪽에서 조입니다.',
        wrong: [{ a: '0', why: '$\\frac{2\\sin x}{x+1}$가 0으로 가는 것처럼 식 전체도 0으로 간다고 보았습니다. $\\frac{3x}{x+1}$ 부분은 3으로 수렴합니다.' }],
        explain: '$-1 \\le \\sin x \\le 1$이므로 $x>0$에서 $\\frac{3x-2}{x+1} \\le \\frac{3x+2\\sin x}{x+1} \\le \\frac{3x+2}{x+1}$입니다. 양쪽의 극한이 모두 3이므로 함수의 극한의 대소 관계에 따라 극한값은 3입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 1,
        q: '$\\lim_{x \\to 0}\\dfrac{x}{\\sqrt{1+x}-\\sqrt{1-x}}$의 값을 구하십시오.',
        answer: '1',
        hint: '분모의 켤레식 $\\sqrt{1+x}+\\sqrt{1-x}$를 분자와 분모에 곱합니다.',
        wrong: [{ a: '2', why: '유리화한 분모 $(1+x)-(1-x)=2x$에서 2를 빠뜨렸습니다.' }],
        explain: '분모를 유리화하면 $\\frac{x(\\sqrt{1+x}+\\sqrt{1-x})}{(1+x)-(1-x)}=\\frac{x(\\sqrt{1+x}+\\sqrt{1-x})}{2x}=\\frac{\\sqrt{1+x}+\\sqrt{1-x}}{2}$입니다. $x \\to 0$이면 $\\frac{1+1}{2}=1$입니다.',
      },
    ],

    deeper: [
      {
        title: '왜 "부정형"이라고 부를까?',
        body: '$\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $\\infty-\\infty$, $0 \\times \\infty$ 같은 꼴을 **부정형**이라고 부릅니다. "정해지지 않은 꼴"이라는 뜻입니다.\n\n같은 $\\frac{0}{0}$ 꼴이라도 결과는 제각각입니다.\n\n- $\\lim_{x \\to 0}\\frac{2x}{x}=2$\n- $\\lim_{x \\to 0}\\frac{x^2}{x}=0$\n- $\\lim_{x \\to 0+}\\frac{x}{x^2}=\\infty$\n\n분자와 분모가 0으로 가는 **빠르기**가 결과를 정합니다. 그래서 꼴만 보고 답을 정할 수 없고, 인수분해·유리화·최고차항으로 나누기처럼 식을 바꾸어 빠르기를 비교해야 합니다. 앞으로 배울 미분계수 $\\lim_{h \\to 0}\\frac{f(a+h)-f(a)}{h}$도 늘 $\\frac{0}{0}$ 꼴입니다.',
      },
    ],

    faq: [
      {
        q: '약분할 때 $x-a$가 0이면 안 되는 것 아닌가요?',
        a: '맞습니다. 0으로는 나눌 수 없습니다. 그런데 극한 $x \\to a$에서는 $x$가 $a$에 가까워질 뿐 $a$가 되지 않으므로 $x-a \\ne 0$입니다. 그래서 극한 안에서는 안심하고 약분할 수 있습니다.',
      },
      {
        q: '$\\frac{\\infty}{\\infty}$는 1 아닌가요?',
        a: '아닙니다. $\\infty$는 수가 아니라서 약분할 수 없습니다. $\\frac{2x}{x}$는 2로, $\\frac{x}{x^2}$는 0으로 수렴하듯이 분자와 분모가 커지는 빠르기에 따라 결과가 달라집니다.',
      },
      {
        q: '분모의 최고차항으로 나누는 이유가 뭔가요?',
        a: '분모를 상수 쪽으로 수렴하게 만들기 위해서입니다. 분모의 최고차항으로 나누면 분모는 최고차항의 계수로 수렴하고, 나머지 항은 $\\frac{1}{x}$, $\\frac{1}{x^2}$ 꼴이 되어 0으로 사라집니다. 그러면 몫의 성질을 쓸 수 있습니다.',
      },
    ],

    mistakes: [
      '$\\frac{0}{0}$이 나오면 답을 0이나 "존재하지 않음"으로 쓰는 실수 — $\\frac{0}{0}$은 "식을 고쳐서 다시 구하라"는 신호입니다.',
      '$\\infty-\\infty=0$, $\\frac{\\infty}{\\infty}=1$로 계산하는 실수 — $\\infty$는 수가 아니므로 유리화나 최고차항으로 나누기로 구합니다.',
      '$x \\to -\\infty$에서 $\\sqrt{x^2}=x$로 쓰는 실수 — $x<0$이면 $\\sqrt{x^2}=|x|=-x$입니다.',
    ],

    gens: [
      {
        id: 'zero-over-zero-factor',
        level: 1,
        title: '0/0 꼴: 인수분해하여 약분하기',
        make: function (R) {
          var a = R.nonzero(-4, 5);
          var r = R.int(-5, 5);
          if (r === a) r = a + R.pick([1, 2, -1, -3]);
          var quad = R.bool();
          var s = R.int(-5, 5);
          if (s === a) s = a + R.pick([2, 3, -2]);
          if (s === r) s = (r + 1 === a) ? r + 2 : r + 1; // 약분하고 1만 남는 뻔한 식을 피한다
          var num = R.fmt.poly([1, -(a + r), a * r]);
          var den = quad ? R.fmt.poly([1, -(a + s), a * s]) : R.fmt.poly([1, -a]);
          var ans = quad ? R.F(a - r, a - s) : R.F(a - r);
          var fa = function (k) { return R.fmt.poly([1, -k]); };
          var wr = [{ a: '0', why: '$x=' + a + '$' + R.josa(Math.abs(a), '을/를') + ' 넣어 $\\frac{0}{0}$이 된 것을 0으로 보았습니다. $\\frac{0}{0}$은 값이 아니므로 먼저 약분합니다.' }];
          var bad = quad ? (a + s === 0 ? null : R.F(a + r, a + s)) : R.F(a + r);
          if (bad && !bad.eq(ans) && !bad.isZero()) wr.push({ a: bad.toString(), why: '약분한 식에 $x=' + a + '$' + R.josa(Math.abs(a), '을/를') + ' 넣을 때 부호를 잘못 계산했습니다.' });
          var reduced = quad ? '\\frac{' + fa(r) + '}{' + fa(s) + '}' : fa(r);
          var pw = function (k) { return k === 0 ? 'x' : '(' + fa(k) + ')'; };
          // 인수 x 는 앞에 쓴다: x(x-1) (괄호 뒤에 x 를 붙이지 않는다)
          var two = function (k) { return k === 0 ? 'x' + pw(a) : pw(a) + pw(k); };
          var raw = quad && !(ans.num === a - r && ans.den === a - s) ? '\\frac{' + (a - r) + '}{' + (a - s) + '}=' : '';
          return {
            type: 'short', check: 'number', concept: 1,
            q: '$\\lim_{x \\to ' + a + '}\\dfrac{' + num + '}{' + den + '}$의 값을 구하십시오.',
            answer: ans.toString(),
            wrong: wr,
            explain: '$x=' + a + '$' + R.josa(Math.abs(a), '을/를') + ' 넣으면 $\\frac{0}{0}$ 꼴입니다. 인수분해하면 $\\frac{' + two(r) + '}{' + (quad ? two(s) : fa(a)) + '}$이고, $x \\ne ' + a + '$이므로 $' + fa(a) + '$' + R.josa(Math.abs(a), '으로/로') + ' 약분하면 $' + reduced + '$입니다. 따라서 극한값은 $' + raw + ft(R, ans) + '$입니다.',
          };
        },
      },
      {
        id: 'zero-over-zero-root',
        level: 2,
        title: '0/0 꼴: 유리화하여 약분하기',
        make: function (R) {
          var c = R.int(1, 4);
          var a = R.int(-3, 6);
          if (a === c * c) a = a - 1;
          var b = c * c - a;
          var root = '\\sqrt{' + R.fmt.poly([1, b]) + '}';
          var lin = R.fmt.poly([1, -a]);
          var flip = R.bool();
          var ans = flip ? R.F(2 * c) : R.F(1, 2 * c);
          var expr = flip ? '\\dfrac{' + lin + '}{' + root + '-' + c + '}' : '\\dfrac{' + root + '-' + c + '}{' + lin + '}';
          var wr = [];
          if (flip) {
            wr.push({ a: R.F(1, 2 * c).toString(), why: '역수를 구했습니다. 이 식은 근호가 분모에 있어서 약분하면 $' + root + '+' + c + '$' + R.josa(c, '이/가') + ' 분자에 남습니다.' });
            wr.push({ a: String(c), why: '$' + root + '+' + c + '$에서 근호 부분을 빠뜨렸습니다. $x \\to ' + a + '$이면 근호도 $' + c + '$' + R.josa(c, '으로/로') + ' 가므로 $' + c + '+' + c + '$입니다.' });
          } else {
            wr.push({ a: String(2 * c), why: '역수를 구했습니다. 약분하면 $\\frac{1}{' + root + '+' + c + '}$입니다.' });
            wr.push({ a: R.F(1, c).toString(), why: '분모 $' + root + '+' + c + '$에서 근호 부분을 빠뜨렸습니다. 근호도 $' + c + '$' + R.josa(c, '으로/로') + ' 가므로 $' + c + '+' + c + '$입니다.' });
          }
          var linP = a === 0 ? 'x' : '(' + lin + ')';
          var steps = flip
            ? '분자와 분모에 $' + root + '+' + c + '$' + R.josa(c, '을/를') + ' 곱하면 분모는 $(' + R.fmt.poly([1, b]) + ')-' + (c * c) + '=' + lin + '$' + (a === 0 ? '가' : R.josa(Math.abs(a), '이/가')) + ' 되어 $\\frac{' + linP + '(' + root + '+' + c + ')}{' + lin + '}=' + root + '+' + c + '$입니다.'
            : '분자와 분모에 $' + root + '+' + c + '$' + R.josa(c, '을/를') + ' 곱하면 분자는 $(' + R.fmt.poly([1, b]) + ')-' + (c * c) + '=' + lin + '$' + (a === 0 ? '가' : R.josa(Math.abs(a), '이/가')) + ' 되어 $\\frac{' + lin + '}{' + linP + '(' + root + '+' + c + ')}=\\frac{1}{' + root + '+' + c + '}$입니다.';
          return {
            type: 'short', check: 'number', concept: 1,
            q: '$\\lim_{x \\to ' + a + '}' + expr + '$의 값을 구하십시오.',
            answer: ans.toString(),
            wrong: wr,
            hint: '근호가 있는 쪽의 켤레식을 분자와 분모에 곱합니다.',
            explain: steps + ' $x \\to ' + a + '$이면 $' + root + ' \\to ' + c + '$이므로 극한값은 $' + ft(R, ans) + '$입니다.',
          };
        },
      },
      {
        id: 'inf-over-inf',
        level: 2,
        title: '∞/∞ 꼴: 차수 비교로 극한 조사하기',
        make: function (R) {
          var pairs = [[1, 1], [2, 2], [1, 2], [2, 1], [2, 2], [1, 1], [3, 2], [2, 3]];
          var pr = R.pick(pairs), n = pr[0], m = pr[1];
          var toNeg = R.bool(0.3);
          var p = R.nonzero(-5, 5), q = R.nonzero(-4, 4);
          if (q === 1 && n === m) q = R.pick([2, 3, -2]);
          function coeffs(deg, lead) {
            var cs = [lead];
            for (var i = 0; i < deg; i++) cs.push(R.int(-6, 6));
            return cs;
          }
          var cn = coeffs(n, p), cd = coeffs(m, q);
          if (cd[cd.length - 1] === 0) cd[cd.length - 1] = R.nonzero(-5, 5);
          var dir = toNeg ? '-\\infty' : '\\infty';
          var ratio = R.F(p, q);
          var POS = '$\\infty$', NEG = '$-\\infty$';
          var correct, kind;
          if (n === m) { correct = '$' + ft(R, ratio) + '$'; kind = 'eq'; }
          else if (n < m) { correct = '$0$'; kind = 'lt'; }
          else {
            var sg = (p / q > 0 ? 1 : -1) * (toNeg && (n - m) % 2 === 1 ? -1 : 1);
            correct = sg > 0 ? POS : NEG; kind = 'gt';
          }
          var cands = [
            ['$0$', '분자의 차수가 분모의 차수보다 낮을 때의 결과입니다. 차수를 다시 비교해 보십시오.'],
            ['$' + ft(R, ratio) + '$', '최고차항의 계수의 비는 분자와 분모의 차수가 같을 때만 극한값이 됩니다.'],
            [POS, n > m ? '발산하는 방향이 반대입니다. ' + (toNeg ? '$x<0$인 것과 ' : '') + '최고차항의 계수의 부호를 확인합니다.' : '분자의 차수가 분모의 차수보다 높을 때만 발산합니다. 차수를 다시 비교해 보십시오.'],
            [NEG, n > m ? '발산하는 방향이 반대입니다. ' + (toNeg ? '$x<0$인 것과 ' : '') + '최고차항의 계수의 부호를 확인합니다.' : '분자의 차수가 분모의 차수보다 높을 때만 발산합니다. 차수를 다시 비교해 보십시오.'],
            ['$' + ft(R, R.F(q, p)) + '$', '분모의 계수를 분자의 계수로 나누었습니다. 거꾸로입니다.'],
          ];
          var reason = {};
          cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
          var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
          var big = 'x' + (m === 1 ? '' : '^' + m);
          var why = kind === 'eq'
            ? '분자와 분모의 차수가 ' + n + R.josa(n, '으로/로') + ' 같으므로, 분자와 분모를 $' + big + '$' + (m === 1 ? '로' : '으로') + ' 나누면 최고차항의 계수의 비 $' + (ratio.num === p && ratio.den === q ? '' : '\\frac{' + p + '}{' + q + '}=') + ft(R, ratio) + '$' + R.josa(ratio.num, '으로/로') + ' 수렴합니다.'
            : kind === 'lt'
              ? '분모의 차수(' + m + ')가 분자의 차수(' + n + ')보다 높습니다. 분자와 분모를 $' + big + '$' + (m === 1 ? '로' : '으로') + ' 나누면 분자는 0, 분모는 $' + q + '$' + R.josa(q, '으로/로') + ' 수렴하므로 극한값은 0입니다.'
              : '분자의 차수(' + n + ')가 분모의 차수(' + m + ')보다 높으므로 발산합니다. 분자와 분모를 $' + big + '$' + (m === 1 ? '로' : '으로') + ' 나누면 분모는 $' + q + '$' + R.josa(q, '으로/로') + ' 수렴하고, 분자는 $' + R.fmt.poly([p].concat(n - m === 1 ? [0] : [0, 0])) + '$처럼 행동하므로 $x \\to ' + dir + '$일 때 ' + (correct === POS ? '양의' : '음의') + ' 무한대로 발산합니다.';
          return {
            type: 'choice', concept: 2,
            q: '다음 극한을 조사한 결과로 옳은 것은 무엇입니까? (발산하면 $\\infty$ 또는 $-\\infty$를 고릅니다.)\n\n$\\lim_{x \\to ' + dir + '}\\dfrac{' + R.fmt.poly(cn) + '}{' + R.fmt.poly(cd) + '}$',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || '차수와 최고차항의 계수를 다시 확인해 보십시오.'; }),
            explain: why,
          };
        },
      },
      {
        id: 'undetermined-coeff',
        level: 3,
        title: '극한값이 주어질 때 미정계수 구하기',
        make: function (R) {
          // t=1 이면 분자 조건 1+a+b=0 만으로 a+b=-1 이 되어 극한값이 쓸모없어진다 → 뺀다
          var t = R.pick([-3, -2, -1, 2, 3, 4]);
          var L = R.nonzero(-5, 6);
          if (L === t) L = t + R.pick([1, 2, -1]);
          // L=t-2 이면 a+b 가 극한값 L 과 같아져서, 극한값을 잘못 답해도 정답이 된다 → 피한다
          if (L === t - 2) L = t === -1 ? 1 : t + 1;
          var r = t - L;          // 분자 = (x-t)(x-r)
          var a = -(t + r), b = t * r;
          var ans = a + b;
          var r2 = t + L;         // 극한값을 t+r 로 착각
          var bad = -(t + r2) + t * r2;
          var wr = [];
          if (L !== ans) wr.push({ a: String(L), why: '극한값 $' + L + '$' + R.josa(L, '을/를') + ' 답했습니다. 묻는 것은 $a+b$입니다.' });
          if (bad !== ans && bad !== L) wr.push({ a: String(bad), why: '약분한 식 $x-c$에 $x=' + t + '$' + R.josa(Math.abs(t), '을/를') + ' 넣을 때 부호를 바꾸었습니다. 극한값은 $' + t + '-c$입니다.' });
          var fac = '(' + R.fmt.poly([1, -t]) + ')(' + R.fmt.poly([1, -r]) + ')';
          return {
            type: 'short', check: 'number', concept: 4,
            q: '$\\lim_{x \\to ' + t + '}\\dfrac{x^2+ax+b}{' + R.fmt.poly([1, -t]) + '}=' + L + '$일 때, 상수 $a$, $b$에 대하여 $a+b$의 값을 구하십시오.',
            answer: String(ans),
            wrong: wr,
            hint: '분모가 0으로 가므로 분자도 0으로 가야 합니다.',
            explain: '분모 $\\to 0$이고 극한값이 존재하므로 분자도 $x=' + t + '$에서 0입니다. 분자를 $(' + R.fmt.poly([1, -t]) + ')(x-c)$로 놓으면 극한값은 $' + t + '-c=' + L + '$이므로 $c=' + r + '$입니다.\n\n분자는 $' + fac + '=' + R.fmt.poly([1, a, b]) + '$이므로 $a=' + a + '$, $b=' + b + '$, $a+b=' + ans + '$입니다.',
          };
        },
      },
    ],
  });
})();
