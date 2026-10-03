/* 미적분Ⅱ · 수열의 극한
 * 수열의 수렴과 발산(양·음의 무한대, 진동), 극한의 성질, ∞/∞·∞-∞ 꼴, 대소 관계(조임), 등비수열 {r^n} 의 수렴 조건.
 * (급수·등비급수는 다음 단원 math-h-calc2-02) */
Tutor.registerUnit({
  id: 'math-h-calc2-01',
  course: 'math-h-calc2',
  title: '수열의 극한',
  summary: '수열이 수렴하는지 발산하는지 판정하고, 극한의 성질과 등비수열의 극한을 이용해 극한값을 구합니다.',
  goals: [
    '수열의 수렴과 발산(양의 무한대, 음의 무한대, 진동)의 뜻을 알고 판정할 수 있다.',
    '수열의 극한에 대한 성질을 이용하여 $\\frac{\\infty}{\\infty}$ 꼴, $\\infty-\\infty$ 꼴의 극한값을 구할 수 있다.',
    '수열의 극한의 대소 관계를 이용하여 극한값을 구할 수 있다.',
    '등비수열 $\\{r^n\\}$의 수렴과 발산을 $r$의 범위에 따라 판정할 수 있다.',
  ],
  standards: ['[12미적Ⅱ-01-01]', '[12미적Ⅱ-01-02]', '[12미적Ⅱ-01-03]'],

  concepts: [
    {
      title: '수열의 수렴',
      body: '수열 $\\{a_n\\}$에서 $n$이 한없이 커질 때 $a_n$의 값이 일정한 값 $\\alpha$에 한없이 가까워지면, 수열 $\\{a_n\\}$은 $\\alpha$에 **수렴**한다고 합니다. 이때 $\\alpha$를 수열 $\\{a_n\\}$의 **극한값** 또는 **극한**이라 하고 다음과 같이 나타냅니다.\n\n$\\lim_{n \\to \\infty} a_n=\\alpha$ 또는 $n \\to \\infty$일 때 $a_n \\to \\alpha$\n\n예를 들어 수열 $1, \\frac{1}{2}, \\frac{1}{3}, \\frac{1}{4}, \\cdots$의 일반항 $\\frac{1}{n}$은 $n$이 커질수록 0에 한없이 가까워지므로 $\\lim_{n \\to \\infty}\\frac{1}{n}=0$입니다.\n\n수열 $a_n=1+\\frac{(-1)^n}{n}$의 항은 $0, \\frac{3}{2}, \\frac{2}{3}, \\frac{5}{4}, \\cdots$으로 1보다 작아졌다 커졌다 하지만, 1과의 차 $\\frac{1}{n}$이 0에 가까워지므로 1에 수렴합니다. 모든 항이 $c$인 수열(상수수열)은 $c$에 수렴합니다.\n\n> 💡 수렴은 "언젠가 그 값이 된다"는 뜻이 아닙니다. 어떤 항도 극한값과 같지 않을 수 있습니다. 극한값과의 차가 한없이 0에 가까워지면 수렴합니다.',
      easy: '벽을 향해 걸어가는데, 매번 남은 거리의 절반만큼만 걷는다고 생각해 보십시오. 남은 거리는 1 m, 0.5 m, 0.25 m, 0.125 m, … 로 줄어듭니다.\n\n남은 거리가 정확히 0이 되는 순간은 오지 않지만, 0에 한없이 가까워집니다. 이것이 "남은 거리의 수열은 0에 수렴한다"는 말의 뜻입니다.',
      fig: {
        type: 'coord', xmin: 0, xmax: 9, ymin: -0.5, ymax: 2,
        points: [
          { x: 1, y: 0 }, { x: 2, y: 1.5 }, { x: 3, y: 0.667 }, { x: 4, y: 1.25 },
          { x: 5, y: 0.8 }, { x: 6, y: 1.167 }, { x: 7, y: 0.857 }, { x: 8, y: 1.125 },
        ],
        segments: [{ from: [0, 1], to: [9, 1], dashed: true }],
        alt: '가로축이 n, 세로축이 a_n인 좌표평면에 수열 1+(-1)^n/n의 항 8개를 점으로 찍은 그림. 점들이 점선 y=1의 위아래를 번갈아 오가며 점선에 가까워진다',
      },
      check: {
        type: 'ox',
        q: '수열 $\\left\\{\\frac{1}{n}\\right\\}$의 어떤 항도 0이 아니므로, 이 수열은 0에 수렴하지 않습니다.',
        answer: false,
        explain: '수렴은 항이 극한값과 같아지는 것이 아니라 극한값에 한없이 가까워지는 것입니다. $\\frac{1}{n}$은 0이 되지는 않지만 0에 한없이 가까워지므로 $\\lim_{n \\to \\infty}\\frac{1}{n}=0$입니다.',
      },
    },
    {
      title: '수열의 발산',
      body: '수열 $\\{a_n\\}$이 수렴하지 않으면 **발산**한다고 합니다. 발산에는 세 가지 경우가 있습니다.\n\n- **양의 무한대로 발산**: $a_n$의 값이 한없이 커집니다. $\\lim_{n \\to \\infty} a_n=\\infty$로 나타냅니다. 예: $\\{n^2\\}$, $\\{2n-5\\}$\n- **음의 무한대로 발산**: $a_n$이 음수이면서 그 절댓값이 한없이 커집니다. $\\lim_{n \\to \\infty} a_n=-\\infty$로 나타냅니다. 예: $\\{-3n\\}$, $\\{1-n^2\\}$\n- **진동**: 수렴하지도, 양의 무한대나 음의 무한대로 발산하지도 않습니다. 예: $\\{(-1)^n\\}$은 $-1, 1, -1, 1, \\cdots$, $\\{(-1)^n n\\}$은 $-1, 2, -3, 4, \\cdots$\n\n| 수열 | 수렴·발산 |\n|---|---|\n| $\\left\\{\\frac{1}{n}\\right\\}$ | 0에 수렴 |\n| $\\{n^2\\}$ | 양의 무한대로 발산 |\n| $\\{-3n\\}$ | 음의 무한대로 발산 |\n| $\\{(-1)^n\\}$ | 진동 |\n\n> ⚠️ $\\lim_{n \\to \\infty} a_n=\\infty$는 극한값이 $\\infty$라는 뜻이 아닙니다. $\\infty$는 수가 아니므로 이때 **극한값은 존재하지 않습니다.** 등호는 발산하는 모습을 나타내는 약속입니다.',
      easy: '수열이 끝에서 어떻게 되는지 네 가지로 나누어 생각해 보십시오.\n\n- 한 값을 향해 모여든다 → 수렴\n- 끝없이 위로 올라간다 → 양의 무한대로 발산\n- 끝없이 아래로 내려간다 → 음의 무한대로 발산\n- 어느 쪽으로도 정해지지 않고 왔다 갔다 한다 → 진동\n\n$-1, 1, -1, 1, \\cdots$은 두 값 사이를 오가기만 하고 한 값에 모이지 않으므로 진동합니다.',
      fig: {
        type: 'coord', xmin: 0, xmax: 9, ymin: -2, ymax: 2,
        points: [
          { x: 1, y: -1 }, { x: 2, y: 1 }, { x: 3, y: -1 }, { x: 4, y: 1 },
          { x: 5, y: -1 }, { x: 6, y: 1 }, { x: 7, y: -1 }, { x: 8, y: 1 },
        ],
        alt: '가로축이 n, 세로축이 a_n인 좌표평면에 수열 (-1)^n의 항 8개를 찍은 그림. 점들이 높이 -1과 1을 번갈아 오간다',
      },
      check: {
        type: 'choice',
        q: '수열 $-1, 2, -3, 4, -5, \\cdots$의 수렴, 발산을 바르게 말한 것은 무엇입니까?',
        choices: ['진동합니다.', '양의 무한대로 발산합니다.', '음의 무한대로 발산합니다.'],
        answer: 0,
        why: ['', '절댓값은 커지지만 부호가 번갈아 바뀌어 음수인 항도 계속 나옵니다. 한없이 커지기만 하는 것이 아니므로 진동입니다.', '양수인 항도 계속 나오므로 한없이 작아지기만 하는 것이 아닙니다. 진동입니다.'],
        explain: '일반항은 $(-1)^n n$입니다. 부호가 번갈아 바뀌면서 절댓값이 커지므로 한 값에 모이지도 않고, 한쪽 무한대로 가지도 않습니다. 따라서 진동합니다.',
      },
    },
    {
      title: '수열의 극한에 대한 성질',
      body: '두 수열 $\\{a_n\\}$, $\\{b_n\\}$이 **모두 수렴**하고 $\\lim_{n \\to \\infty} a_n=\\alpha$, $\\lim_{n \\to \\infty} b_n=\\beta$일 때 다음이 성립합니다.\n\n1. $\\lim_{n \\to \\infty} ka_n=k\\alpha$ (단, $k$는 상수)\n2. $\\lim_{n \\to \\infty}(a_n+b_n)=\\alpha+\\beta$, $\\lim_{n \\to \\infty}(a_n-b_n)=\\alpha-\\beta$\n3. $\\lim_{n \\to \\infty} a_nb_n=\\alpha\\beta$\n4. $\\lim_{n \\to \\infty}\\frac{a_n}{b_n}=\\frac{\\alpha}{\\beta}$ (단, $b_n \\ne 0$, $\\beta \\ne 0$)\n\n예: $\\lim_{n \\to \\infty} a_n=2$, $\\lim_{n \\to \\infty} b_n=-3$이면 $\\lim_{n \\to \\infty}(3a_n-b_n)=3 \\times 2-(-3)=9$입니다.\n\n> ⚠️ 이 성질은 두 수열이 **모두 수렴할 때만** 쓸 수 있습니다. $a_n=n$, $b_n=\\frac{1}{n}$이면 $a_nb_n=1$이므로 $\\{a_nb_n\\}$은 1에 수렴하지만, $\\{a_n\\}$이 발산하므로 $\\lim a_n \\times \\lim b_n$으로 계산할 수 없습니다.\n\n> 💡 수열 $\\{a_n\\}$이 수렴한다는 것을 알면, $\\lim_{n \\to \\infty} a_n=\\alpha$로 놓고 식을 세울 수 있습니다. $\\lim_{n \\to \\infty} a_{n+1}=\\alpha$도 같습니다.',
      easy: '각 수열이 끝에서 어떤 값으로 가는지 알면, 그 수열들을 더하거나 곱한 수열은 끝에서 그 값들을 더하거나 곱한 값으로 갑니다.\n\n$a_n$이 2 근처, $b_n$이 $-3$ 근처에 있을 때 $3a_n-b_n$은 $3 \\times 2-(-3)=9$ 근처에 있는 것과 같은 이치입니다. 다만 출발점이 되는 두 수열이 반드시 수렴해야 합니다.',
      check: {
        type: 'short', check: 'number',
        q: '$\\lim_{n \\to \\infty} a_n=4$, $\\lim_{n \\to \\infty} b_n=2$일 때, $\\lim_{n \\to \\infty}\\frac{a_n+b_n}{a_nb_n}$의 값을 구하십시오.',
        answer: '3/4',
        wrong: [{ a: '4/3', why: '분자와 분모를 바꾸어 계산했습니다. 분자는 $4+2=6$, 분모는 $4 \\times 2=8$입니다.' }],
        explain: '두 수열이 모두 수렴하고 분모의 극한 $4 \\times 2=8$이 0이 아니므로 $\\frac{4+2}{4 \\times 2}=\\frac{6}{8}=\\frac{3}{4}$입니다.',
      },
    },
    {
      title: '∞/∞ 꼴과 ∞-∞ 꼴의 극한',
      body: '**$\\frac{\\infty}{\\infty}$ 꼴**: 분모의 최고차항으로 분자와 분모를 각각 나눈 뒤 극한의 성질을 씁니다. $\\lim_{n \\to \\infty}\\frac{c}{n^k}=0$ ($k$는 자연수)을 이용합니다.\n\n$\\lim_{n \\to \\infty}\\dfrac{3n^2+n}{n^2-2}=\\lim_{n \\to \\infty}\\dfrac{3+\\frac{1}{n}}{1-\\frac{2}{n^2}}=\\frac{3+0}{1-0}=3$\n\n| 분자와 분모의 차수 | 극한 |\n|---|---|\n| (분자의 차수) < (분모의 차수) | 0에 수렴 |\n| (분자의 차수) = (분모의 차수) | 최고차항의 계수의 비에 수렴 |\n| (분자의 차수) > (분모의 차수) | 발산 |\n\n**$\\infty-\\infty$ 꼴**\n- 다항식이면 최고차항으로 묶습니다. $n^2-5n=n^2\\left(1-\\frac{5}{n}\\right)$이므로 양의 무한대로 발산합니다.\n- 근호가 있으면 분모를 1로 보고 **분자를 유리화**하여 $\\frac{\\infty}{\\infty}$ 꼴로 바꿉니다.\n\n$\\sqrt{n^2+2n}-n=\\dfrac{(n^2+2n)-n^2}{\\sqrt{n^2+2n}+n}=\\dfrac{2n}{\\sqrt{n^2+2n}+n}=\\dfrac{2}{\\sqrt{1+\\frac{2}{n}}+1} \\to \\frac{2}{1+1}=1$\n\n> ⚠️ $\\frac{\\infty}{\\infty}$는 1이 아니고, $\\infty-\\infty$는 0이 아닙니다. $\\infty$는 수가 아니라서 이런 꼴은 식을 바꾸어 다시 조사해야 합니다.',
      easy: '$n$이 아주 클 때는 최고차항이 "주인공"이고 나머지는 거의 보이지 않습니다.\n\n$n=1000$이면 $3n^2+n=3001000$, $n^2-2=999998$이어서 그 비는 약 3입니다. $3n^2$과 $n^2$만 남기고 보면 $\\frac{3n^2}{n^2}=3$이지요. 분모의 최고차항으로 나누는 것은 이 생각을 식으로 정확하게 하는 방법입니다.',
      check: {
        type: 'short', check: 'number',
        q: '$\\lim_{n \\to \\infty}\\dfrac{6n+1}{2n-3}$의 값을 구하십시오.',
        answer: '3',
        wrong: [
          { a: '1', why: '$\\frac{\\infty}{\\infty}$를 1로 보았습니다. 분자와 분모를 $n$으로 나누어 계산합니다.' },
          { a: '-1/3', why: '상수항끼리의 비를 구했습니다. $n$이 커지면 최고차항의 계수의 비가 남습니다.' },
        ],
        explain: '분자와 분모를 $n$으로 나누면 $\\dfrac{6+\\frac{1}{n}}{2-\\frac{3}{n}} \\to \\frac{6}{2}=3$입니다.',
      },
    },
    {
      title: '수열의 극한의 대소 관계',
      body: '두 수열 $\\{a_n\\}$, $\\{b_n\\}$이 수렴하고 $\\lim_{n \\to \\infty} a_n=\\alpha$, $\\lim_{n \\to \\infty} b_n=\\beta$일 때\n\n1. 모든 자연수 $n$에 대하여 $a_n \\le b_n$이면 $\\alpha \\le \\beta$입니다.\n2. 수열 $\\{c_n\\}$이 모든 자연수 $n$에 대하여 $a_n \\le c_n \\le b_n$이고 $\\alpha=\\beta$이면 $\\lim_{n \\to \\infty} c_n=\\alpha$입니다.\n\n2는 양쪽에서 같은 값으로 조여 오면 가운데 수열도 그 값으로 간다는 뜻입니다.\n\n예: $-1 \\le \\cos n \\le 1$이므로 $-\\frac{1}{n} \\le \\frac{\\cos n}{n} \\le \\frac{1}{n}$이고, 양쪽이 모두 0에 수렴하므로 $\\lim_{n \\to \\infty}\\frac{\\cos n}{n}=0$입니다.\n\n> ⚠️ 모든 $n$에 대하여 $a_n<b_n$이어도 $\\alpha<\\beta$라고 할 수는 없고 $\\alpha \\le \\beta$입니다. $a_n=1-\\frac{1}{n}$, $b_n=1+\\frac{1}{n}$은 늘 $a_n<b_n$이지만 극한은 둘 다 1입니다.',
      easy: '두 친구가 양옆에서 팔짱을 끼고 같은 문으로 걸어 들어간다고 생각해 보십시오. 가운데 낀 사람도 어쩔 수 없이 그 문으로 들어가게 됩니다.\n\n그림에서 위의 곡선 $y=\\frac{1}{x}$과 아래 곡선 $y=-\\frac{1}{x}$이 모두 0으로 다가가므로, 그 사이에 갇힌 점 $\\frac{\\cos n}{n}$도 0으로 다가갑니다.',
      fig: {
        type: 'coord', xmin: 0, xmax: 11, ymin: -1.2, ymax: 1.2,
        fns: [{ expr: '1/x', from: 0.85, to: 11 }, { expr: '-1/x', from: 0.85, to: 11 }],
        points: [
          { x: 1, y: 0.54 }, { x: 2, y: -0.208 }, { x: 3, y: -0.33 }, { x: 4, y: -0.163 }, { x: 5, y: 0.057 },
          { x: 6, y: 0.16 }, { x: 7, y: 0.108 }, { x: 8, y: -0.018 }, { x: 9, y: -0.101 }, { x: 10, y: -0.084 },
        ],
        alt: '곡선 y=1/x와 y=-1/x 사이에 수열 cos n / n의 항 10개를 점으로 찍은 그림. 점들이 두 곡선 사이에 갇힌 채 0에 가까워진다',
      },
      check: {
        type: 'ox',
        q: '두 수열 $\\{a_n\\}$, $\\{b_n\\}$이 수렴하고 모든 자연수 $n$에 대하여 $a_n<b_n$이면 $\\lim_{n \\to \\infty} a_n<\\lim_{n \\to \\infty} b_n$입니다.',
        answer: false,
        explain: '극한에서는 등호가 생길 수 있습니다. $a_n=1-\\frac{1}{n}$, $b_n=1+\\frac{1}{n}$은 늘 $a_n<b_n$이지만 두 극한은 모두 1입니다. 바른 결론은 $\\lim a_n \\le \\lim b_n$입니다.',
      },
    },
    {
      title: '등비수열 {rⁿ}의 수렴과 발산',
      body: '등비수열 $\\{r^n\\}$의 수렴과 발산은 공비 $r$의 범위에 따라 다음과 같습니다.\n\n| $r$의 범위 | $\\{r^n\\}$ |\n|---|---|\n| $r>1$ | 양의 무한대로 발산 |\n| $r=1$ | 1에 수렴 |\n| $-1<r<1$ | 0에 수렴 |\n| $r \\le -1$ | 진동(발산) |\n\n따라서 $\\{r^n\\}$이 **수렴하기 위한 조건은 $-1<r \\le 1$** 입니다.\n\n- $r=2$: $2, 4, 8, \\cdots$ → 한없이 커집니다.\n- $r=\\frac{1}{2}$: $\\frac{1}{2}, \\frac{1}{4}, \\frac{1}{8}, \\cdots$ → 0에 가까워집니다. $r=-\\frac{1}{2}$이면 부호는 바뀌지만 절댓값이 0에 가까워지므로 역시 0에 수렴합니다.\n- $r=-1$: $-1, 1, -1, \\cdots$ → 진동합니다. $r=-2$: $-2, 4, -8, \\cdots$ → 진동합니다.\n\n**활용**: $r^n$이 들어 있는 분수식은 분모에서 밑의 절댓값이 가장 큰 거듭제곱으로 분자와 분모를 나눕니다.\n\n$\\lim_{n \\to \\infty}\\dfrac{3^{n+1}+2^n}{3^n-2^n}=\\lim_{n \\to \\infty}\\dfrac{3+\\left(\\frac{2}{3}\\right)^n}{1-\\left(\\frac{2}{3}\\right)^n}=\\frac{3+0}{1-0}=3$',
      easy: '1보다 큰 수를 계속 곱하면 점점 커지고, 1보다 작은 양수를 계속 곱하면 점점 작아집니다. 0.5를 거듭 곱하면 0.5, 0.25, 0.125, … 로 0에 다가가지요.\n\n음수를 곱하면 곱할 때마다 부호가 바뀝니다. 그래서 $r$이 음수일 때는 절댓값이 1보다 작아야만 0으로 모이고, 그렇지 않으면 위아래로 오가며 진동합니다. 딱 1이면 1, 1, 1, … 로 그대로입니다.',
      check: {
        type: 'choice',
        q: '수열 $\\left\\{\\left(-\\frac{1}{2}\\right)^n\\right\\}$의 수렴, 발산을 바르게 말한 것은 무엇입니까?',
        choices: ['0에 수렴합니다.', '진동합니다.', '음의 무한대로 발산합니다.'],
        answer: 0,
        why: ['', '부호는 번갈아 바뀌지만 절댓값 $\\left(\\frac{1}{2}\\right)^n$이 0에 가까워지므로 0에 수렴합니다. 공비가 $-1<r<1$이면 0에 수렴합니다.', '항의 절댓값이 작아지고 있습니다. 공비가 $-1<r<1$이면 0에 수렴합니다.'],
        explain: '공비 $-\\frac{1}{2}$은 $-1<r<1$의 범위에 있으므로 0에 수렴합니다. 항은 $-\\frac{1}{2}, \\frac{1}{4}, -\\frac{1}{8}, \\cdots$입니다.',
      },
    },
  ],

  examples: [
    {
      q: '$\\lim_{n \\to \\infty}\\dfrac{3n^2-n+1}{n^2+2n}$의 값을 구하십시오.',
      steps: [
        '$n \\to \\infty$일 때 분자와 분모가 모두 양의 무한대로 발산하므로 $\\frac{\\infty}{\\infty}$ 꼴입니다.',
        '분모의 최고차항 $n^2$으로 분자와 분모를 나눕니다. $\\dfrac{3-\\frac{1}{n}+\\frac{1}{n^2}}{1+\\frac{2}{n}}$',
        '$\\frac{1}{n} \\to 0$, $\\frac{1}{n^2} \\to 0$이므로 극한값은 $\\frac{3}{1}=3$입니다.',
      ],
      answer: '$3$',
    },
    {
      q: '$\\lim_{n \\to \\infty}\\left(\\sqrt{n^2+4n}-n\\right)$의 값을 구하십시오.',
      steps: [
        '$\\infty-\\infty$ 꼴이고 근호가 있으므로 분자를 유리화합니다.',
        '$\\sqrt{n^2+4n}-n=\\dfrac{(n^2+4n)-n^2}{\\sqrt{n^2+4n}+n}=\\dfrac{4n}{\\sqrt{n^2+4n}+n}$',
        '분자와 분모를 $n$으로 나누면 $\\dfrac{4}{\\sqrt{1+\\frac{4}{n}}+1}$입니다. (분모의 $\\sqrt{n^2+4n}$을 $n$으로 나누면 $\\sqrt{1+\\frac{4}{n}}$입니다.)',
        '$n \\to \\infty$이면 $\\frac{4}{1+1}=2$입니다.',
      ],
      answer: '$2$',
    },
    {
      q: '$\\lim_{n \\to \\infty}\\dfrac{2^{n+1}+3^n}{3^{n+1}-2^n}$의 값을 구하십시오.',
      steps: [
        '분모에서 밑의 절댓값이 가장 큰 거듭제곱은 $3^n$입니다. 분자와 분모를 $3^n$으로 나눕니다.',
        '$\\dfrac{2\\left(\\frac{2}{3}\\right)^n+1}{3-\\left(\\frac{2}{3}\\right)^n}$ ($2^{n+1}=2 \\times 2^n$, $3^{n+1}=3 \\times 3^n$)',
        '$-1<\\frac{2}{3}<1$이므로 $\\left(\\frac{2}{3}\\right)^n \\to 0$입니다.',
        '극한값은 $\\frac{0+1}{3-0}=\\frac{1}{3}$입니다.',
      ],
      answer: '$\\frac{1}{3}$',
    },
  ],

  terms: [
    { term: '수열의 수렴', def: '$n$이 한없이 커질 때 $a_n$이 일정한 값 $\\alpha$에 한없이 가까워지는 것입니다. $\\lim_{n \\to \\infty} a_n=\\alpha$로 씁니다.' },
    { term: '극한값', def: '수렴하는 수열이 한없이 가까워지는 값입니다. 극한이라고도 합니다. 예: $\\lim_{n \\to \\infty}\\frac{1}{n}=0$에서 극한값은 0입니다.' },
    { term: '발산', def: '수열이 수렴하지 않는 것입니다. 양의 무한대로 발산, 음의 무한대로 발산, 진동의 세 경우가 있습니다.' },
    { term: '양의 무한대로 발산', def: '$a_n$의 값이 한없이 커지는 것입니다. $\\lim_{n \\to \\infty} a_n=\\infty$로 씁니다. 예: $\\{n^2\\}$' },
    { term: '음의 무한대로 발산', def: '$a_n$이 음수이면서 그 절댓값이 한없이 커지는 것입니다. $\\lim_{n \\to \\infty} a_n=-\\infty$로 씁니다. 예: $\\{-3n\\}$' },
    { term: '진동', def: '수렴하지도 않고 양의 무한대나 음의 무한대로 발산하지도 않는 것입니다. 예: $\\{(-1)^n\\}$' },
    { term: '유리화', def: '근호가 있는 식에 켤레식을 곱해 근호를 없애는 것입니다. 수열의 극한에서는 $\\infty-\\infty$ 꼴의 분자를 유리화하여 $\\frac{\\infty}{\\infty}$ 꼴로 바꿉니다.' },
    { term: '등비수열의 수렴 조건', def: '등비수열 $\\{r^n\\}$은 $-1<r \\le 1$일 때 수렴합니다. $-1<r<1$이면 0에, $r=1$이면 1에 수렴합니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'ox', concept: 0,
      q: '수열 $\\left\\{\\frac{(-1)^n}{n}\\right\\}$은 0에 수렴합니다.',
      answer: true,
      explain: '항은 $-1, \\frac{1}{2}, -\\frac{1}{3}, \\frac{1}{4}, \\cdots$입니다. 부호는 바뀌지만 0과의 차(절댓값) $\\frac{1}{n}$이 0에 한없이 가까워지므로 0에 수렴합니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '다음 중 **양의 무한대로 발산하는** 수열은 무엇입니까?',
      choices: ['$\\{n^2-10n\\}$', '$\\{(-1)^n n\\}$', '$\\{10-n\\}$', '$\\left\\{\\frac{10}{n}\\right\\}$'],
      answer: 0,
      why: [
        '',
        '항의 부호가 번갈아 바뀌면서 절댓값이 커지므로 진동합니다.',
        '$n$이 커지면 $10-n$은 한없이 작아지므로 음의 무한대로 발산합니다.',
        '$\\frac{10}{n}$은 0에 가까워지므로 0에 수렴합니다.',
      ],
      explain: '$n^2-10n=n^2\\left(1-\\frac{10}{n}\\right)$이고 $1-\\frac{10}{n} \\to 1$이므로 양의 무한대로 발산합니다. 처음 몇 항($n<10$)은 음수이지만, 수렴·발산은 $n$이 한없이 커질 때의 모습으로 정합니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', fixed: true, concept: 1,
      q: '수열 $\\{\\cos n\\pi\\}$의 수렴, 발산을 바르게 말한 것은 무엇입니까?',
      choices: ['0에 수렴', '1에 수렴', '양의 무한대로 발산', '진동'],
      answer: 3,
      why: [
        '$\\cos n\\pi$는 0이 되는 항이 없습니다. $\\cos \\pi=-1$, $\\cos 2\\pi=1$을 확인해 보십시오.',
        '$n$이 짝수일 때만 1이고, 홀수일 때는 $-1$입니다.',
        '항의 값은 $-1$과 1뿐이어서 한없이 커지지 않습니다.',
        '',
      ],
      explain: '$\\cos \\pi=-1$, $\\cos 2\\pi=1$, $\\cos 3\\pi=-1$, … 이므로 $\\cos n\\pi=(-1)^n$입니다. 두 값을 번갈아 가지므로 진동합니다.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', concept: 2,
      q: '$\\lim_{n \\to \\infty} a_n=3$, $\\lim_{n \\to \\infty} b_n=-2$일 때, $\\lim_{n \\to \\infty}(a_n+2b_n)$의 값을 구하십시오.',
      answer: '-1',
      wrong: [{ a: '7', why: '$b_n$의 극한의 부호를 놓쳤습니다. $2 \\times (-2)=-4$이므로 $3-4$입니다.' }],
      explain: '두 수열이 모두 수렴하므로 $\\lim(a_n+2b_n)=3+2 \\times (-2)=-1$입니다.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', concept: 3,
      q: '$\\lim_{n \\to \\infty}\\dfrac{4n-1}{2n+5}$의 값을 구하십시오.',
      answer: '2',
      wrong: [
        { a: '-1/5', why: '상수항끼리의 비를 구했습니다. $n$이 커지면 최고차항의 계수의 비가 남습니다.' },
        { a: '1', why: '$\\frac{\\infty}{\\infty}$를 1로 보았습니다. 분자와 분모를 $n$으로 나누어 계산합니다.' },
      ],
      explain: '분자와 분모를 $n$으로 나누면 $\\dfrac{4-\\frac{1}{n}}{2+\\frac{5}{n}} \\to \\frac{4}{2}=2$입니다.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', concept: 3,
      q: '$\\lim_{n \\to \\infty}\\dfrac{n+3}{n^2+1}$의 값을 구하십시오.',
      answer: '0',
      wrong: [
        { a: '1', why: '최고차항의 계수의 비는 분자와 분모의 차수가 같을 때만 극한값입니다. 여기서는 분모의 차수가 더 큽니다.' },
        { a: '3', why: '상수항끼리의 비를 구했습니다. 분자와 분모를 $n^2$으로 나누어 보십시오.' },
      ],
      explain: '분자와 분모를 분모의 최고차항 $n^2$으로 나누면 $\\dfrac{\\frac{1}{n}+\\frac{3}{n^2}}{1+\\frac{1}{n^2}} \\to \\frac{0}{1}=0$입니다. 분모의 차수가 더 크면 0에 수렴합니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 5,
      q: '다음 중 **수렴하는** 수열은 무엇입니까?',
      choices: ['$\\left\\{\\left(-\\frac{3}{4}\\right)^n\\right\\}$', '$\\{(-1)^n\\}$', '$\\left\\{\\left(\\frac{5}{4}\\right)^n\\right\\}$', '$\\{(-2)^n\\}$'],
      answer: 0,
      why: [
        '',
        '공비가 $-1$이면 $-1, 1, -1, \\cdots$로 진동합니다.',
        '공비 $\\frac{5}{4}$가 1보다 크므로 양의 무한대로 발산합니다.',
        '공비가 $-1$보다 작으므로 부호가 바뀌며 절댓값이 커져 진동합니다.',
      ],
      explain: '$\\{r^n\\}$은 $-1<r \\le 1$일 때 수렴합니다. 공비 $-\\frac{3}{4}$만 이 범위에 있고, 0에 수렴합니다.',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'number', concept: 3,
      q: '$\\lim_{n \\to \\infty}\\left(\\sqrt{n^2+6n}-n\\right)$의 값을 구하십시오.',
      answer: '3',
      hint: '$\\sqrt{n^2+6n}+n$을 분자와 분모에 곱해 보십시오.',
      wrong: [
        { a: '0', why: '$\\infty-\\infty$를 0으로 보았습니다. 분자를 유리화하여 $\\frac{\\infty}{\\infty}$ 꼴로 바꾸어야 합니다.' },
        { a: '6', why: '유리화한 뒤 분모 $\\sqrt{n^2+6n}+n$을 $n$으로 나누면 1이 아니라 $\\sqrt{1+\\frac{6}{n}}+1 \\to 2$입니다.' },
      ],
      explain: '$\\sqrt{n^2+6n}-n=\\dfrac{6n}{\\sqrt{n^2+6n}+n}=\\dfrac{6}{\\sqrt{1+\\frac{6}{n}}+1}$이므로 극한값은 $\\frac{6}{1+1}=3$입니다.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
      q: '모든 자연수 $n$에 대하여 수열 $\\{a_n\\}$이 $3n-1<a_n<3n+2$를 만족시킬 때, $\\lim_{n \\to \\infty}\\dfrac{a_n}{2n+1}$의 값을 구하십시오.',
      answer: '3/2',
      hint: '각 변을 양수 $2n+1$로 나누어 보십시오.',
      wrong: [{ a: '3', why: '$\\frac{3n-1}{2n+1}$의 극한은 최고차항의 계수의 비 $\\frac{3}{2}$입니다. 분모의 계수 2를 빠뜨렸습니다.' }],
      explain: '각 변을 $2n+1(>0)$로 나누면 $\\dfrac{3n-1}{2n+1}<\\dfrac{a_n}{2n+1}<\\dfrac{3n+2}{2n+1}$입니다. 양쪽 끝의 극한이 모두 $\\frac{3}{2}$이므로 대소 관계에 의해 구하는 극한값은 $\\frac{3}{2}$입니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 5,
      q: '수열 $\\left\\{\\left(\\frac{x-1}{2}\\right)^n\\right\\}$이 수렴하도록 하는 실수 $x$의 값의 범위는 무엇입니까?',
      choices: ['$-1<x \\le 3$', '$-1<x<3$', '$-1 \\le x \\le 3$', '$-3<x \\le 1$'],
      answer: 0,
      why: [
        '',
        '$x=3$이면 공비가 1이 되어 $1, 1, 1, \\cdots$로 1에 수렴합니다. $x=3$도 넣어야 합니다.',
        '$x=-1$이면 공비가 $-1$이 되어 진동합니다. $x=-1$은 빼야 합니다.',
        '부등식 $-2<x-1 \\le 2$의 각 변에 1을 더해야 하는데 뺐습니다.',
      ],
      hint: '수렴 조건 $-1<r \\le 1$에 공비를 넣어 보십시오.',
      explain: '공비가 $\\frac{x-1}{2}$이므로 $-1<\\frac{x-1}{2} \\le 1$이어야 합니다. 각 변에 2를 곱하면 $-2<x-1 \\le 2$, 1을 더하면 $-1<x \\le 3$입니다.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', concept: 2,
      q: '수열 $\\{a_n\\}$에 대하여 $\\lim_{n \\to \\infty} na_n=3$일 때, $\\lim_{n \\to \\infty}(2n+1)a_n$의 값을 구하십시오.',
      answer: '6',
      hint: '$(2n+1)a_n$을 $na_n$과 수렴하는 수열의 곱으로 나타내 보십시오.',
      wrong: [
        { a: '3', why: '$\\frac{2n+1}{n} \\to 2$를 곱하는 것을 빠뜨렸습니다.' },
        { a: '7', why: '$(2n+1)a_n=2na_n+a_n$에서 $a_n$의 극한을 1로 보았습니다. $a_n=\\frac{na_n}{n} \\to 3 \\times 0=0$입니다.' },
      ],
      explain: '$(2n+1)a_n=na_n \\times \\dfrac{2n+1}{n}$이고, 두 수열이 각각 3과 2에 수렴하므로 극한값은 $3 \\times 2=6$입니다.',
    },
    {
      id: 'p12', level: 2, type: 'ox', concept: 2,
      q: '두 수열 $\\{a_n\\}$, $\\{b_n\\}$에 대하여 수열 $\\{a_nb_n\\}$이 수렴하면 $\\{a_n\\}$과 $\\{b_n\\}$도 모두 수렴합니다.',
      answer: false,
      explain: '$a_n=n$, $b_n=\\frac{1}{n}$이면 $a_nb_n=1$이므로 $\\{a_nb_n\\}$은 1에 수렴하지만 $\\{a_n\\}$은 양의 무한대로 발산합니다. 극한의 성질은 두 수열이 모두 수렴할 때 쓰는 것이고, 거꾸로는 성립하지 않습니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 3,
      q: '두 상수 $a$, $b$에 대하여 $\\lim_{n \\to \\infty}\\dfrac{an^2+bn+1}{2n-1}=3$일 때, $a+b$의 값을 구하십시오.',
      answer: '6',
      hint: '$a \\ne 0$이면 분자의 차수가 분모보다 커서 어떻게 되는지 생각해 보십시오.',
      explain: '$a \\ne 0$이면 분자의 차수(2)가 분모의 차수(1)보다 커서 발산합니다. 그러므로 $a=0$입니다. 그러면 $\\lim_{n \\to \\infty}\\dfrac{bn+1}{2n-1}=\\frac{b}{2}=3$이므로 $b=6$입니다. 따라서 $a+b=6$입니다.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', concept: 5,
      q: '함수 $f(x)=\\lim_{n \\to \\infty}\\dfrac{x^{2n+1}+2}{x^{2n}+1}$에 대하여 $f(2)+f(1)+f\\left(\\frac{1}{2}\\right)$의 값을 구하십시오.',
      answer: '11/2',
      hint: '$|x|>1$, $x=1$, $|x|<1$일 때 $x^{2n}$이 어떻게 되는지 나누어 생각합니다.',
      wrong: [
        { a: '6', why: '$x=1$이면 $1^{2n}=1$이므로 $f(1)=\\frac{1+2}{1+1}=\\frac{3}{2}$입니다. $1^{2n}$을 0으로 보면 안 됩니다.' },
        { a: '4', why: '$|x|<1$이면 $x^{2n} \\to 0$, $x^{2n+1} \\to 0$이므로 $f\\left(\\frac{1}{2}\\right)=\\frac{0+2}{0+1}=2$입니다. $x^{2n}$으로 나누는 방법은 $|x|>1$일 때 씁니다.' },
      ],
      explain: '$x=2$: 분자와 분모를 $2^{2n}$으로 나누면 $\\dfrac{2+\\frac{2}{4^n}}{1+\\frac{1}{4^n}} \\to 2$이므로 $f(2)=2$입니다.\n\n$x=1$: $f(1)=\\frac{1+2}{1+1}=\\frac{3}{2}$입니다.\n\n$x=\\frac{1}{2}$: $\\left(\\frac{1}{2}\\right)^{2n} \\to 0$이므로 $f\\left(\\frac{1}{2}\\right)=\\frac{0+2}{0+1}=2$입니다.\n\n따라서 $2+\\frac{3}{2}+2=\\frac{11}{2}$입니다.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', concept: 2,
      q: '수렴하는 수열 $\\{a_n\\}$이 $\\lim_{n \\to \\infty}\\dfrac{3a_n-2}{a_n+1}=1$을 만족시킬 때, $\\lim_{n \\to \\infty} a_n$의 값을 구하십시오.',
      answer: '3/2',
      hint: '$\\lim_{n \\to \\infty} a_n=\\alpha$로 놓고 극한의 성질을 씁니다.',
      wrong: [{ a: '1', why: '$3\\alpha-2=1$로 분모를 빠뜨렸습니다. $\\frac{3\\alpha-2}{\\alpha+1}=1$에서 $3\\alpha-2=\\alpha+1$입니다.' }],
      explain: '$\\lim_{n \\to \\infty} a_n=\\alpha$라 하면 극한의 성질에 의해 $\\dfrac{3\\alpha-2}{\\alpha+1}=1$입니다(이때 $\\alpha \\ne -1$). $3\\alpha-2=\\alpha+1$에서 $\\alpha=\\frac{3}{2}$입니다.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', concept: 3,
      q: '$\\lim_{n \\to \\infty}\\left(\\sqrt{n^2+an}-\\sqrt{n^2-n}\\right)=2$일 때, 상수 $a$의 값을 구하십시오.',
      answer: '3',
      hint: '분자를 유리화한 뒤 극한값을 $a$로 나타냅니다.',
      wrong: [
        { a: '1', why: '유리화한 식의 분모 $\\sqrt{n^2+an}+\\sqrt{n^2-n}$을 $n$으로 나누면 2에 가까워집니다. 극한값은 $\\frac{a+1}{2}$입니다.' },
        { a: '5', why: '$(n^2+an)-(n^2-n)=(a+1)n$에서 부호를 잘못 계산했습니다.' },
      ],
      explain: '$\\sqrt{n^2+an}-\\sqrt{n^2-n}=\\dfrac{(a+1)n}{\\sqrt{n^2+an}+\\sqrt{n^2-n}}$이고, 분자와 분모를 $n$으로 나누면 극한값은 $\\frac{a+1}{1+1}=\\frac{a+1}{2}$입니다. $\\frac{a+1}{2}=2$에서 $a=3$입니다.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'number', concept: 4,
      q: '모든 자연수 $n$에 대하여 수열 $\\{a_n\\}$이 $3^n<a_n<3^n+2^n$을 만족시킬 때, $\\lim_{n \\to \\infty}\\dfrac{a_n}{3^{n+1}+2^n}$의 값을 구하십시오.',
      answer: '1/3',
      hint: '각 변을 $3^{n+1}+2^n$으로 나눈 뒤, 양쪽 끝의 극한을 구합니다.',
      wrong: [{ a: '1', why: '$3^{n+1}=3 \\times 3^n$입니다. 분모를 $3^n$으로 나누면 3이 남습니다.' }],
      explain: '각 변을 양수 $3^{n+1}+2^n$으로 나누면 $\\dfrac{3^n}{3^{n+1}+2^n}<\\dfrac{a_n}{3^{n+1}+2^n}<\\dfrac{3^n+2^n}{3^{n+1}+2^n}$입니다.\n\n양쪽 끝의 분자와 분모를 $3^n$으로 나누면 $\\dfrac{1}{3+\\left(\\frac{2}{3}\\right)^n} \\to \\frac{1}{3}$, $\\dfrac{1+\\left(\\frac{2}{3}\\right)^n}{3+\\left(\\frac{2}{3}\\right)^n} \\to \\frac{1}{3}$입니다. 대소 관계에 의해 구하는 극한값은 $\\frac{1}{3}$입니다.',
    },
  ],

  deeper: [
    {
      title: '"한없이 가까워진다"를 정확하게 말하기',
      body: '"한없이 가까워진다"는 말은 느낌으로는 분명하지만, 수학에서는 더 정확한 말이 필요합니다. 대학에서는 수렴을 이렇게 정의합니다.\n\n> 아무리 작은 양수 $\\varepsilon$을 정해도, 어떤 번호 $N$ 이후의 모든 항이 $|a_n-\\alpha|<\\varepsilon$을 만족시키면 $\\lim_{n \\to \\infty} a_n=\\alpha$이다.\n\n예를 들어 $a_n=\\frac{1}{n}$에서 오차를 $0.001$보다 작게 하고 싶으면 $n>1000$인 항만 보면 됩니다. 오차를 $0.000001$보다 작게 하고 싶으면 $n>1000000$이면 됩니다. 어떤 오차를 요구하더라도 그것을 만족시키는 번호가 있으니 0에 수렴합니다.\n\n이 정의 덕분에 "극한값은 하나뿐이다", "수렴하는 수열의 합은 극한값의 합으로 수렴한다" 같은 성질을 증명할 수 있습니다.',
    },
    {
      title: '제논의 역설과 수열의 극한',
      body: '고대 그리스의 철학자 제논은 "발 빠른 아킬레스도 앞서 출발한 거북을 따라잡을 수 없다"는 역설을 남겼다고 전해집니다. 아킬레스가 거북이 있던 곳에 가면 거북은 조금 앞으로 가 있고, 다시 그곳에 가면 또 조금 앞에 가 있으니 끝이 없다는 것입니다.\n\n수열의 극한으로 보면 이 역설은 풀립니다. 아킬레스가 거북이 있던 곳까지 가는 데 걸리는 시간이 예를 들어 1초, $\\frac{1}{10}$초, $\\frac{1}{100}$초, … 처럼 줄어든다면, 단계는 끝없이 많아도 지금까지 걸린 시간 $1, 1.1, 1.11, \\cdots$은 $\\frac{10}{9}$초에 수렴합니다. 따라서 아킬레스는 $\\frac{10}{9}$초 만에 거북을 따라잡습니다. 이렇게 끝없이 더한 값은 다음 단원 **급수**에서 다룹니다.',
    },
  ],

  faq: [
    {
      q: '∞-∞는 왜 0이 아닌가요?',
      a: '$\\infty$는 수가 아니라 "한없이 커지는 상태"라서 일반적인 뺄셈을 할 수 없습니다. 예를 들어 $(n+1)-n$은 1에 수렴하고, $n^2-n$은 양의 무한대로, $n-n^2$은 음의 무한대로 발산합니다. 모두 $\\infty-\\infty$ 꼴이지만 결과가 다르므로, 식을 묶거나 유리화하여 다시 조사해야 합니다.',
    },
    {
      q: '∞/∞ 꼴은 1이라고 하면 안 되나요?',
      a: '안 됩니다. $\\frac{2n}{n}$은 2에, $\\frac{n}{n^2}$은 0에 수렴하고, $\\frac{n^2}{n}$은 양의 무한대로 발산합니다. 분자와 분모가 커지는 "빠르기"가 다르기 때문입니다. 분모의 최고차항으로 나누면 이 빠르기를 비교할 수 있습니다.',
    },
    {
      q: '공비가 1이면 수렴하는데 -1이면 왜 발산하나요?',
      a: '$r=1$이면 $1, 1, 1, \\cdots$로 모든 항이 1이므로 1에 수렴합니다. $r=-1$이면 $-1, 1, -1, 1, \\cdots$로 두 값을 번갈아 가지므로 어느 한 값에 가까워지지 않습니다. 그래서 진동(발산)합니다. 수렴 조건이 $-1<r \\le 1$처럼 한쪽에만 등호가 있는 까닭입니다.',
    },
    {
      q: '진동하는 수열도 극한값이 있나요?',
      a: '없습니다. 극한값은 수열이 수렴할 때만 존재합니다. 진동하는 수열은 발산하는 수열이므로 극한값이 없습니다. 양의 무한대로 발산하는 수열도 $\\lim a_n=\\infty$라고 쓰지만 극한값이 존재하는 것은 아닙니다.',
    },
  ],

  mistakes: [
    '$\\infty-\\infty$ 꼴을 0으로, $\\frac{\\infty}{\\infty}$ 꼴을 1로 계산하는 실수 — 최고차항으로 나누거나 분자를 유리화하여 다시 조사합니다.',
    '모든 $n$에 대하여 $a_n<b_n$이면 $\\lim a_n<\\lim b_n$이라고 하는 실수 — 극한에서는 등호가 생길 수 있으므로 $\\lim a_n \\le \\lim b_n$입니다.',
    '$\\{r^n\\}$이 수렴하는 범위를 $-1<r<1$로 쓰는 실수 — $r=1$이면 1에 수렴하므로 수렴 조건은 $-1<r \\le 1$입니다.',
  ],

  gens: [
    {
      id: 'inf-over-inf',
      level: 1,
      title: '∞/∞ 꼴: 최고차항으로 나누기',
      make: function (R) {
        var kind = R.pick(['same1', 'same1', 'same2', 'prod', 'lower']);
        var p = R.nonzero(-5, 6), r = R.int(1, 5), q = R.nonzero(-6, 6);
        var s = R.int(1, 7);
        function P(c) { return R.fmt.poly(c, 'n'); }
        var num, den, ans, divisor = 'n^2', wrongs = [];
        if (kind === 'same1') {
          s = R.int(1 - r, 7); if (s === 0) s = 1; // rn+s>0 (모든 자연수 n)
          // 분자가 분모의 상수배이면 극한을 구할 필요가 없는 문제가 되므로 피한다 (예: (2n+3)/(2n+3))
          if (p * s === q * r) q = q === 6 ? 5 : (q === -1 ? -2 : q + 1);
          num = P([p, q]); den = P([r, s]); divisor = 'n';
          ans = R.F(p, r);
          wrongs.push([R.F(q, s), '상수항끼리의 비를 구했습니다. $n$이 커지면 최고차항의 계수의 비가 남습니다.']);
        } else if (kind === 'same2') {
          var c = R.nonzero(-5, 5);
          num = P([p, q, c]); den = P([r, 0, s]);
          ans = R.F(p, r);
          wrongs.push([R.F(c, s), '상수항끼리의 비를 구했습니다. $n$이 커지면 최고차항의 계수의 비가 남습니다.']);
        } else if (kind === 'prod') {
          var t = R.nonzero(-5, 5);
          num = '(' + P([p, q]) + ')(' + P([1, t]) + ')'; den = P([r, 0, s]);
          ans = R.F(p, r);
          wrongs.push([R.F(q * t, s), '상수항끼리의 비를 구했습니다. 분자를 전개하면 최고차항은 $' + P([p, 0, 0]) + '$입니다.']);
        } else {
          num = P([p, q]); den = P([r, 0, s]);
          ans = R.F(0);
          wrongs.push([R.F(p, r), '최고차항의 계수의 비는 분자와 분모의 차수가 같을 때의 극한값입니다. 여기서는 분모의 차수가 더 큽니다.']);
          wrongs.push([R.F(q, s), '상수항끼리의 비를 구했습니다. 분자와 분모를 $n^2$으로 나누어 보십시오.']);
        }
        if (kind !== 'lower') wrongs.push([R.F(1), '$\\frac{\\infty}{\\infty}$를 1로 보았습니다. 분모의 최고차항으로 분자와 분모를 나누어 계산합니다.']);
        var wr = [], seen = {};
        wrongs.forEach(function (w) {
          if (w[0].eq(ans) || seen[w[0].toString()]) return;
          seen[w[0].toString()] = true;
          wr.push({ a: w[0].toString(), why: w[1] });
        });
        var ansTex = R.fmt.frac(ans);
        var ratio = (p < 0 ? '-' : '') + '\\frac{' + Math.abs(p) + '}{' + r + '}';
        var explain;
        if (kind === 'lower') {
          explain = '분자는 1차식, 분모는 2차식입니다. 분자와 분모를 분모의 최고차항 $n^2$으로 나누면 분자의 두 항에는 $\\frac{1}{n}$, $\\frac{1}{n^2}$이 붙어 모두 0으로 가고, 분모는 $' + r + '$에 가까워집니다. 따라서 극한값은 $0$입니다.';
        } else {
          explain = '$\\frac{\\infty}{\\infty}$ 꼴입니다. 분자와 분모를 분모의 최고차항 $' + divisor + '$으로 나누면 ' + (divisor === 'n' ? '$\\frac{1}{n}$이' : '$\\frac{1}{n}$, $\\frac{1}{n^2}$이') + ' 붙은 항은 모두 0으로 가고 최고차항의 계수만 남습니다. ' +
            (kind === 'prod' ? '분자를 전개하면 최고차항이 $' + P([p, 0, 0]) + '$이므로 ' : '') +
            '극한값은 $' + ratio + (ratio === ansTex ? '' : '=' + ansTex) + '$입니다.';
        }
        return {
          type: 'short', check: 'number', concept: 3,
          q: '$\\lim_{n \\to \\infty}\\dfrac{' + num + '}{' + den + '}$의 값을 구하십시오.',
          answer: ans.toString(),
          wrong: wr,
          explain: explain,
        };
      },
    },
    {
      id: 'geometric-ratio-limit',
      level: 1,
      title: '등비수열의 극한: 가장 큰 밑으로 나누기',
      make: function (R) {
        var c = R.int(3, 5), d = R.int(2, c - 1);
        var A = R.int(1, 3), C = R.int(1, 3), B = R.nonzero(-3, 3), D = R.int(1, 3);
        function tm(k, base, ex, first) {
          var sign = k < 0 ? '-' : (first ? '' : '+');
          return sign + (Math.abs(k) === 1 ? '' : Math.abs(k) + ' \\cdot ') + base + '^{' + ex + '}';
        }
        var small = R.bool(0.25);
        var rt = R.fmt.frac(R.F(d, c));
        var pw = '\\left(' + rt + '\\right)^n';
        var num, den, ans, wrongs = [], explain;
        if (!small) {
          num = tm(A, c, 'n+1', true) + tm(B, d, 'n', false);
          den = tm(C, c, 'n', true) + tm(D, d, 'n+1', false);
          ans = R.F(A * c, C);
          wrongs.push([R.F(A, C), '$' + c + '^{n+1}=' + c + ' \\times ' + c + '^n$입니다. 분자를 $' + c + '^n$으로 나누면 $' + (A * c) + '$' + R.josa(A * c, '이/가') + ' 남습니다.']);
          wrongs.push([R.F(B, D * d), '밑이 작은 거듭제곱끼리 비교했습니다. 분모에서 밑이 가장 큰 $' + c + '^n$으로 나누어야 합니다.']);
          wrongs.push([R.F(0), '분자도 $' + c + '^n$에 비례하여 커지므로 0이 아닙니다. 분자와 분모를 $' + c + '^n$으로 나누어 보십시오.']);
          var bPart = (B === 1 ? '+' : B === -1 ? '-' : R.fmt.signed(B)) + pw;
          explain = '분모에서 밑이 가장 큰 거듭제곱은 $' + c + '^n$입니다. 분자와 분모를 $' + c + '^n$으로 나누면\n\n$\\dfrac{' + (A * c) + bPart + '}{' + C + '+' + (D * d) + pw + '}$\n\n' +
            '$0<' + rt + '<1$이므로 $' + pw + ' \\to 0$이고, 극한값은 $\\frac{' + (A * c) + '}{' + C + '}' + (C === 1 || R.F(A * c, C).den !== C ? '=' + R.fmt.frac(ans) : '') + '$입니다.';
          explain = explain.replace('\\frac{' + (A * c) + '}{1}=', '');
        } else {
          num = tm(A, d, 'n+1', true) + R.fmt.signed(B);
          den = tm(C, c, 'n', true) + '+' + D;
          ans = R.F(0);
          wrongs.push([R.F(A * d, C), '분자의 밑($' + d + '$)과 분모의 밑($' + c + '$)이 다릅니다. 분모의 $' + c + '^n$으로 나누면 분자에 $' + pw + '$이 남습니다.']);
          wrongs.push([R.F(B, D), '상수항끼리의 비를 구했습니다. $n$이 커지면 거듭제곱 항이 훨씬 커집니다.']);
          explain = '분자와 분모를 $' + c + '^n$으로 나누면 분자의 두 항에는 $' + pw + '$, $\\frac{1}{' + c + '^n}$이 붙어 모두 0으로 가고, 분모는 $' + C + '$에 가까워집니다. 따라서 극한값은 $0$입니다.';
        }
        var wr = [], seen = {};
        wrongs.forEach(function (w) {
          if (w[0].eq(ans) || seen[w[0].toString()]) return;
          seen[w[0].toString()] = true;
          wr.push({ a: w[0].toString(), why: w[1] });
        });
        return {
          type: 'short', check: 'number', concept: 5,
          q: '$\\lim_{n \\to \\infty}\\dfrac{' + num + '}{' + den + '}$의 값을 구하십시오.',
          answer: ans.toString(),
          wrong: wr,
          explain: explain,
        };
      },
    },
    {
      id: 'inf-minus-inf',
      level: 2,
      title: '∞-∞ 꼴: 분자 유리화',
      make: function (R) {
        var kind = R.pick(['A', 'A', 'B', 'D']);
        var a = R.int(1, 9);
        function P(c) { return R.fmt.poly(c, 'n'); }
        var expr, ans, wrongs = [], explain;
        if (kind === 'A') {
          var c0 = R.int(0, 5);
          if (a % 2 === 0 && c0 === (a / 2) * (a / 2)) c0 = 0; // 완전제곱식(√(n²+2n+1)=n+1)이면 유리화가 필요 없어지므로 피한다
          var inner = P([1, a, c0]);
          expr = '\\left(\\sqrt{' + inner + '}-n\\right)';
          ans = R.F(a, 2);
          wrongs.push([R.F(0), '$\\infty-\\infty$를 0으로 보았습니다. 분자를 유리화하여 $\\frac{\\infty}{\\infty}$ 꼴로 바꾸어야 합니다.']);
          wrongs.push([R.F(a), '유리화한 뒤 분모 $\\sqrt{' + inner + '}+n$을 $n$으로 나누면 2에 가까워집니다. 2로 나누는 것을 빠뜨렸습니다.']);
          explain = '분자와 분모에 $\\sqrt{' + inner + '}+n$을 곱하면 $\\dfrac{' + P([a, c0]) + '}{\\sqrt{' + inner + '}+n}$입니다. 분자와 분모를 $n$으로 나누면 분자는 $' + a + '$에, 분모는 $1+1=2$에 가까워지므로 극한값은 $' + R.fmt.frac(ans) + '$입니다.';
        } else if (kind === 'B') {
          var b = R.int(1, 9);
          if (b === a) b = a === 9 ? 1 : a + 1;
          expr = '\\left(\\sqrt{' + P([1, a, 0]) + '}-\\sqrt{' + P([1, b, 0]) + '}\\right)';
          ans = R.F(a - b, 2);
          wrongs.push([R.F(0), '$\\infty-\\infty$를 0으로 보았습니다. 분자를 유리화하여 $\\frac{\\infty}{\\infty}$ 꼴로 바꾸어야 합니다.']);
          wrongs.push([R.F(a - b), '유리화한 뒤 분모를 $n$으로 나누면 $1+1=2$에 가까워집니다. 2로 나누는 것을 빠뜨렸습니다.']);
          wrongs.push([R.F(b - a, 2), '$(' + P([1, a, 0]) + ')-(' + P([1, b, 0]) + ')$의 부호를 거꾸로 계산했습니다.']);
          explain = '분자와 분모에 $\\sqrt{' + P([1, a, 0]) + '}+\\sqrt{' + P([1, b, 0]) + '}$을 곱하면 분자는 $(' + P([1, a, 0]) + ')-(' + P([1, b, 0]) + ')=' + P([a - b, 0]) + '$입니다. 분자와 분모를 $n$으로 나누면 분자는 $' + (a - b) + '$에, 분모는 $1+1=2$에 가까워지므로 극한값은 $' + R.fmt.frac(ans) + '$입니다.';
        } else {
          expr = '\\dfrac{1}{\\sqrt{' + P([1, a, 0]) + '}-n}';
          ans = R.F(2, a);
          wrongs.push([R.F(a, 2), '역수를 구했습니다. 이 식은 근호가 분모에 있어서, 유리화하면 근호가 있는 쪽이 분자로 올라갑니다.']);
          wrongs.push([R.F(1, a), '분자 $\\sqrt{' + P([1, a, 0]) + '}+n$을 $n$으로 나누면 1이 아니라 2에 가까워집니다.']);
          explain = '분모를 유리화하기 위해 분자와 분모에 $\\sqrt{' + P([1, a, 0]) + '}+n$을 곱하면 $\\dfrac{\\sqrt{' + P([1, a, 0]) + '}+n}{' + P([a, 0]) + '}$입니다. 분자와 분모를 $n$으로 나누면 $\\dfrac{\\sqrt{1+\\frac{' + a + '}{n}}+1}{' + a + '}$이므로 극한값은 $\\frac{2}{' + a + '}' + (R.F(2, a).den === a ? '' : '=' + R.fmt.frac(ans)) + '$입니다.';
        }
        var wr = [], seen = {};
        wrongs.forEach(function (w) {
          if (w[0].eq(ans) || seen[w[0].toString()]) return;
          seen[w[0].toString()] = true;
          wr.push({ a: w[0].toString(), why: w[1] });
        });
        return {
          type: 'short', check: 'number', concept: 3,
          q: '$\\lim_{n \\to \\infty}' + expr + '$의 값을 구하십시오.',
          answer: ans.toString(),
          hint: '근호가 있는 쪽의 켤레식을 분자와 분모에 곱해 보십시오.',
          wrong: wr,
          explain: explain,
        };
      },
    },
    {
      id: 'piecewise-power-limit',
      level: 3,
      title: '극한으로 정의된 함수의 값',
      make: function (R) {
        var a = R.nonzero(-3, 3), b = R.nonzero(-4, 4);
        var k = R.pick([2, 3, -2, -3]);
        var s = R.pick([1, -1]);
        var m = R.int(2, 4), tSign = R.pick([1, -1]);
        var fk = R.F(a * k);
        var fs = s === 1 ? R.F(a + b, 2) : R.F(b - a, 2);
        var ft = R.F(b);
        var ans = fk.add(fs).add(ft);
        var lead = a === 1 ? '' : a === -1 ? '-' : String(a);
        var numTex = lead + 'x^{2n+1}' + R.fmt.signed(b);
        var tTex = (tSign < 0 ? '-' : '') + '\\frac{1}{' + m + '}';
        var q = '함수 $f(x)=\\lim_{n \\to \\infty}\\dfrac{' + numTex + '}{x^{2n}+1}$에 대하여 $f(' + k + ')+f(' + s + ')+f\\left(' + tTex + '\\right)$의 값을 구하십시오.';
        var wrongs = [
          [fk.add(R.F(b)).add(ft), '$x=' + s + '$이면 $x^{2n}=1$이므로 0이 아닙니다. $f(' + s + ')=' + R.fmt.frac(fs) + '$입니다.'],
          [fk.add(fs).add(R.F(a * tSign, m)), '$|x|<1$이면 $x^{2n} \\to 0$, $x^{2n+1} \\to 0$이므로 $f\\left(' + tTex + '\\right)=' + b + '$입니다. $x^{2n}$으로 나누는 방법은 $|x|>1$일 때 씁니다.'],
        ];
        if (s === -1) wrongs.push([fk.add(R.F(a + b, 2)).add(ft), '$x=-1$이면 $x^{2n+1}=-1$이므로 분자는 $' + (-a) + R.fmt.signed(b) + '$입니다. $f(-1)=' + R.fmt.frac(fs) + '$입니다.']);
        var wr = [], seen = {};
        wrongs.forEach(function (w) {
          if (w[0].eq(ans) || seen[w[0].toString()]) return;
          seen[w[0].toString()] = true;
          wr.push({ a: w[0].toString(), why: w[1] });
        });
        var bOver = R.fmt.signed(b) === '+' + b ? '+\\frac{' + b + '}{x^{2n}}' : '-\\frac{' + (-b) + '}{x^{2n}}';
        var explain = '$|x|>1$이면 분자와 분모를 $x^{2n}$으로 나누어 $\\dfrac{' + lead + 'x' + bOver + '}{1+\\frac{1}{x^{2n}}} \\to ' + lead + 'x$입니다. 그래서 $f(' + k + ')=' + R.fmt.frac(fk) + '$입니다.\n\n' +
          '$x=' + s + '$이면 $x^{2n}=1$, $x^{2n+1}=' + s + '$이므로 $f(' + s + ')=\\frac{' + (a * s) + R.fmt.signed(b) + '}{2}=' + R.fmt.frac(fs) + '$입니다.\n\n' +
          '$|x|<1$이면 $x^{2n} \\to 0$, $x^{2n+1} \\to 0$이므로 $f\\left(' + tTex + '\\right)=' + b + '$입니다.\n\n' +
          '따라서 구하는 값은 $' + R.fmt.frac(fk) + (fs.sign() < 0 ? '' : '+') + R.fmt.frac(fs) + R.fmt.signed(b) + '=' + R.fmt.frac(ans) + '$입니다.';
        return {
          type: 'short', check: 'number', concept: 5,
          q: q,
          answer: ans.toString(),
          hint: '$|x|>1$, $x=\\pm 1$, $|x|<1$일 때 $x^{2n}$이 어떻게 되는지 나누어 생각합니다.',
          wrong: wr,
          explain: explain,
        };
      },
    },
  ],
});
