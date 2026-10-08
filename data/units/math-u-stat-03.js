/* 확률과 통계학 · 이산확률분포
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 기하분포는 "처음 성공할 때까지의 시행 횟수"(값 1, 2, 3, …)로 정의한다.
 * 포아송 확률은 e 를 남긴 꼴(choice)로 묻거나, e^{-λ} 의 근삿값을 문제에 준다. 연속분포·정규근사(4단원 이후)는 쓰지 않는다. */
(function () {
  function comb(n, r) { var c = 1; for (var i = 0; i < r; i++) c = c * (n - i) / (i + 1); return Math.round(c); }
  function fact(n) { var f = 1; for (var i = 2; i <= n; i++) f *= i; return f; }
  function C(n, r) { return '\\binom{' + n + '}{' + r + '}'; }
  function ansText(f) { var d = f.toDecimal(8); return d === null ? f.toString() : d; }
  function texOf(f) { var d = f.toDecimal(8); return d === null ? f.toTex() : d; }
  // 틀린 답 목록: 정답과 값이 같거나 서로 겹치는 것은 뺀다 (Frac 끼리 비교)
  function W(ans, list) {
    var seen = [ans], out = [];
    list.forEach(function (w) {
      var v = w[0];
      if (!v) return;
      for (var i = 0; i < seen.length; i++) if (seen[i].eq(v)) return;
      seen.push(v);
      out.push({ a: ansText(v), why: w[1] });
    });
    return out;
  }
  // 계수 c(Frac) × e^{-lam} 의 TeX
  function eTerm(c, lam) {
    var e = 'e^{-' + lam + '}';
    if (c.eq(1)) return e;
    if (c.isInt()) return c.toString() + e;
    return '\\dfrac{' + c.num + '}{' + c.den + '}' + e;
  }
  // 거듭제곱 TeX: 지수 0 이면 쓰지 않고, 1 이면 지수 없이
  function powTex(tex, e) {
    if (e === 0) return '';
    if (e === 1) return '\\left(' + tex + '\\right)';
    return '\\left(' + tex + '\\right)^{' + e + '}';
  }

  Tutor.registerUnit({
    id: 'math-u-stat-03',
    course: 'math-u-stat',
    title: '이산확률분포',
    summary: '확률변수와 확률질량함수·누적분포함수를 정의하고, 기댓값과 분산의 성질을 익힙니다. 베르누이·이항분포, 포아송 분포와 이항분포의 근사, 기하분포를 다룹니다.',
    goals: [
      '이산확률변수의 확률질량함수와 누적분포함수를 구하고 서로 바꿀 수 있다.',
      '기댓값과 분산을 계산하고 $E(aX+b)$, $\\mathrm{Var}(aX+b)$ 같은 성질을 활용할 수 있다.',
      '이항분포·포아송 분포·기하분포가 어떤 상황의 모형인지 판단하고 확률·평균·분산을 구할 수 있다.',
      '시행 횟수가 많고 성공 확률이 작은 이항분포를 포아송 분포로 근사할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '확률변수, 확률질량함수와 누적분포함수',
        body: '표본공간의 각 결과에 실수 하나를 대응시키는 함수를 **확률변수**라고 하고 보통 대문자 $X$로 씁니다. 동전을 두 번 던질 때 "앞면의 개수"를 $X$라 하면 HH → 2, HT → 1, TH → 1, TT → 0입니다.\n\n' +
          '$X$가 가질 수 있는 값이 $0, 1, 2, \\cdots$처럼 하나하나 셀 수 있으면 **이산확률변수**입니다. 이때 각 값의 확률을 주는 함수\n\n' +
          '$p(x)=P(X=x)$\n\n' +
          '를 **확률질량함수**(pmf)라고 합니다. 모든 $x$에서 $p(x)\\ge0$이고 $\\sum_{x}p(x)=1$입니다. 위 예에서는 $p(0)=\\dfrac{1}{4}$, $p(1)=\\dfrac{1}{2}$, $p(2)=\\dfrac{1}{4}$입니다.\n\n' +
          '**누적분포함수**(cdf)는 $F(x)=P(X\\le x)=\\sum_{t\\le x}p(t)$입니다. 위 예에서 $F(1)=\\dfrac{1}{4}+\\dfrac{1}{2}=\\dfrac{3}{4}$입니다. 이산확률변수의 $F$는 값이 있는 곳에서만 뛰어오르는 **계단 함수**이고, 0에서 시작해 1까지 줄어들지 않고 올라갑니다.\n\n' +
          '> 💡 구간의 확률은 $P(a<X\\le b)=F(b)-F(a)$입니다. 이산형에서는 등호가 있는지 없는지에 따라 값이 달라지므로 부등호를 꼼꼼히 봅니다.',
        easy: '확률변수는 "결과에 붙이는 점수표"입니다. 동전 두 번의 결과 HT에 "앞면 1개"라는 점수를 붙이는 식이지요.\n\n' +
          '확률질량함수는 "점수마다 확률이 얼마인지" 적은 표이고, 누적분포함수는 "이 점수 이하일 확률"을 적은 표입니다. 시험에서 "60점 이하인 학생 비율"을 구하려면 60점 이하의 비율을 모두 더하는 것과 같습니다.',
        fig: { type: 'bars', labels: ['X=0', 'X=1', 'X=2'], values: [0.25, 0.5, 0.25], title: '동전 두 번에서 앞면 개수의 확률질량함수', alt: 'X가 0, 1, 2일 확률이 각각 0.25, 0.5, 0.25인 막대그래프' },
        check: {
          type: 'short', check: 'number',
          q: '확률변수 $X$의 확률질량함수가 $p(0)=0.2$, $p(1)=0.5$, $p(2)=0.3$입니다. 누적분포함수의 값 $F(1)$을 구하세요.',
          answer: '0.7',
          wrong: [{ a: '0.5', why: '$P(X=1)$만 구했습니다. $F(1)=P(X\\le1)$이므로 $X=0$의 확률도 더합니다.' }, { a: '0.2', why: '$P(X<1)$을 구했습니다. $F(1)$에는 $X=1$도 들어갑니다.' }],
          explain: '$F(1)=P(X\\le1)=p(0)+p(1)=0.2+0.5=0.7$입니다.',
        },
      },
      {
        title: '기댓값과 분산의 성질',
        body: '이산확률변수 $X$의 **기댓값**(평균)은 값에 확률을 곱해 모두 더한 것입니다.\n\n' +
          '$E(X)=\\mu=\\sum_{x}x\\,p(x)$, 함수의 기댓값은 $E(g(X))=\\sum_{x}g(x)\\,p(x)$\n\n' +
          '**분산**은 평균에서 떨어진 거리의 제곱의 기댓값이고, 계산할 때는 오른쪽 식이 편합니다.\n\n' +
          '$\\mathrm{Var}(X)=E\\left((X-\\mu)^{2}\\right)=E(X^{2})-\\{E(X)\\}^{2}$, 표준편차 $\\sigma=\\sqrt{\\mathrm{Var}(X)}$\n\n' +
          '예: 동전 두 번의 앞면 개수 $X$는 $E(X)=0\\cdot\\frac{1}{4}+1\\cdot\\frac{1}{2}+2\\cdot\\frac{1}{4}=1$, $E(X^{2})=0+\\frac{1}{2}+1=\\frac{3}{2}$이므로 $\\mathrm{Var}(X)=\\frac{3}{2}-1=\\frac{1}{2}$입니다.\n\n' +
          '| 성질 | 식 |\n|---|---|\n' +
          '| 일차변환 | $E(aX+b)=aE(X)+b$, $\\mathrm{Var}(aX+b)=a^{2}\\mathrm{Var}(X)$ |\n' +
          '| 합의 기댓값 (항상) | $E(X+Y)=E(X)+E(Y)$ |\n' +
          '| 합의 분산 ($X$, $Y$가 독립일 때) | $\\mathrm{Var}(X+Y)=\\mathrm{Var}(X)+\\mathrm{Var}(Y)$ |\n\n' +
          '상수 $b$를 더하면 분포가 통째로 옮겨질 뿐 퍼짐은 그대로라서 분산에 $b$가 나타나지 않습니다. 또 독립이면 $\\mathrm{Var}(X-Y)=\\mathrm{Var}(X)+\\mathrm{Var}(Y)$로, 빼도 분산은 **더해집니다**.',
        easy: '기댓값은 "같은 일을 아주 여러 번 되풀이했을 때 한 번에 평균적으로 얻는 값"입니다. 1,000원을 받을 확률이 $\\frac{1}{2}$, 0원일 확률이 $\\frac{1}{2}$인 뽑기를 여러 번 하면 한 번에 평균 500원을 얻습니다.\n\n' +
          '모든 상금에 100원을 보태 주면 평균은 100원 늘지만 "운에 따라 달라지는 정도"(분산)는 그대로입니다. 상금을 모두 2배로 하면 차이도 2배, 분산은 그 제곱인 4배가 됩니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\mathrm{Var}(X)=4$일 때 $\\mathrm{Var}(2X+3)$을 구하세요.',
          answer: '16',
          wrong: [{ a: '11', why: '$2\\times4+3$으로 계산했습니다. 더한 상수 3은 분산에 영향을 주지 않고, 곱한 수는 제곱이 붙습니다.' }, { a: '8', why: '2를 제곱하지 않았습니다. $\\mathrm{Var}(aX+b)=a^{2}\\mathrm{Var}(X)$입니다.' }, { a: '19', why: '상수 3을 더했습니다. 상수를 더해도 퍼짐은 그대로입니다.' }],
          explain: '$\\mathrm{Var}(2X+3)=2^{2}\\mathrm{Var}(X)=4\\times4=16$입니다.',
        },
      },
      {
        title: '베르누이 분포와 이항분포',
        body: '결과가 성공(1)과 실패(0) 둘뿐인 시행을 **베르누이 시행**이라고 합니다. 성공 확률이 $p$이면 $X$는 **베르누이 분포**를 따르고\n\n' +
          '$P(X=1)=p$, $P(X=0)=1-p$, $E(X)=p$, $\\mathrm{Var}(X)=p(1-p)$\n\n' +
          '성공 확률이 $p$인 베르누이 시행을 **서로 독립으로 $n$번** 할 때 성공 횟수 $X$는 **이항분포** $B(n, p)$를 따릅니다.\n\n' +
          '$P(X=k)=\\binom{n}{k}p^{k}(1-p)^{n-k}\\quad(k=0, 1, \\cdots, n)$\n\n' +
          '$n$번 가운데 성공할 $k$번을 고르는 방법이 $\\binom{n}{k}$가지이고, 그 하나하나의 확률이 $p^{k}(1-p)^{n-k}$이기 때문입니다.\n\n' +
          '이항분포의 $X$는 베르누이 확률변수 $n$개의 합 $X=X_{1}+\\cdots+X_{n}$이므로, 합의 기댓값과 (독립인) 합의 분산 성질에서 곧바로\n\n' +
          '$E(X)=np$, $\\mathrm{Var}(X)=np(1-p)$\n\n' +
          '를 얻습니다.\n\n' +
          '> ⚠️ 이항분포의 조건: 시행 횟수 $n$이 정해져 있고, 시행끼리 독립이고, 성공 확률이 매번 같아야 합니다. 다시 넣지 않고 뽑는 추출은 확률이 매번 바뀌므로 이항분포가 아닙니다.',
        easy: '객관식 4지선다 문제 5개를 모두 찍는다고 해 봅시다. 한 문제를 맞힐 확률은 $\\frac{1}{4}$이고, 문제끼리는 서로 영향을 주지 않습니다. 이때 맞힌 개수는 이항분포 $B\\left(5, \\frac{1}{4}\\right)$을 따릅니다.\n\n' +
          '평균적으로 몇 개 맞을까요? 5개의 $\\frac{1}{4}$, 곧 $5\\times\\frac{1}{4}=1.25$개입니다. 이것이 $E(X)=np$입니다.',
        check: {
          type: 'short', check: 'number',
          q: '$X$가 이항분포 $B(20, 0.3)$을 따를 때 $\\mathrm{Var}(X)$를 구하세요.',
          answer: '4.2',
          wrong: [{ a: '6', why: '기댓값 $np$를 구했습니다. 분산은 $np(1-p)$입니다.' }, { a: '0.21', why: '$n$을 곱하지 않았습니다. 분산은 $np(1-p)=20\\times0.3\\times0.7$입니다.' }],
          explain: '$\\mathrm{Var}(X)=np(1-p)=20\\times0.3\\times0.7=4.2$입니다.',
        },
      },
      {
        title: '포아송 분포와 이항분포의 근사',
        body: '일정한 시간·넓이·길이 안에서 **드물게, 서로 독립적으로** 일어나는 사건의 횟수는 **포아송 분포**로 잘 나타납니다. 한 시간에 걸려 오는 전화 수, 책 한 쪽의 오타 수, 1분 동안 들어오는 손님 수 등이 그 예입니다. 평균 횟수가 $\\lambda>0$이면\n\n' +
          '$P(X=k)=\\dfrac{e^{-\\lambda}\\lambda^{k}}{k!}\\quad(k=0, 1, 2, \\cdots)$\n\n' +
          '테일러 급수 $e^{\\lambda}=\\sum_{k=0}^{\\infty}\\dfrac{\\lambda^{k}}{k!}$에서 확률의 합이 1임을 확인할 수 있습니다. 포아송 분포는 **평균과 분산이 모두** $\\lambda$입니다.\n\n' +
          '$E(X)=\\lambda$, $\\mathrm{Var}(X)=\\lambda$\n\n' +
          '예: 한 쪽에 오타가 평균 2개라면 오타가 없을 확률은 $P(X=0)=e^{-2}\\approx0.135$입니다.\n\n' +
          '**이항분포의 근사**: $n$이 크고 $p$가 작으면 $B(n, p)$는 $\\lambda=np$인 포아송 분포와 거의 같습니다. $\\binom{n}{k}$나 $(1-p)^{n-k}$을 직접 계산하기 어려울 때 씁니다. 흔히 $n\\ge20$, $p\\le0.05$ 정도이면 근사가 좋다고 봅니다.\n\n' +
          '> 💡 이웃한 확률의 비 $\\dfrac{P(X=k)}{P(X=k-1)}=\\dfrac{\\lambda}{k}$를 쓰면 확률을 차례로 빠르게 구할 수 있습니다.',
        easy: '1시간을 3,600개의 1초로 잘게 나누어 봅시다. 1초마다 전화가 올 확률은 아주 작고, 각 1초는 서로 독립이라고 생각할 수 있습니다. 그러면 1시간의 전화 수는 "시행은 아주 많고 성공 확률은 아주 작은" 이항분포입니다.\n\n' +
          '이렇게 나누는 수를 끝없이 늘리면 이항분포가 포아송 분포가 됩니다. 그래서 포아송 분포에는 "평균 횟수 $\\lambda$" 하나만 있으면 됩니다.',
        check: {
          type: 'short', check: 'number',
          q: '1분 동안 매장에 들어오는 손님 수 $X$가 평균 3인 포아송 분포를 따릅니다. $\\mathrm{Var}(X)$를 구하세요.',
          answer: '3',
          wrong: [{ a: '9', why: '평균을 제곱했습니다. 포아송 분포는 평균과 분산이 같습니다.' }],
          explain: '포아송 분포는 $E(X)=\\mathrm{Var}(X)=\\lambda$이므로 $\\mathrm{Var}(X)=3$입니다.',
        },
      },
      {
        title: '기하분포 — 처음 성공할 때까지',
        body: '성공 확률이 $p$인 베르누이 시행을 독립적으로 되풀이할 때 **처음 성공할 때까지의 시행 횟수** $X$는 **기하분포**를 따릅니다. $X=k$는 "처음 $k-1$번 실패하고 $k$번째에 성공"이므로\n\n' +
          '$P(X=k)=(1-p)^{k-1}p\\quad(k=1, 2, 3, \\cdots)$\n\n' +
          '$k$번 모두 실패할 확률이 $(1-p)^{k}$이므로 $P(X>k)=(1-p)^{k}$입니다. 평균과 분산은\n\n' +
          '$E(X)=\\dfrac{1}{p}$, $\\mathrm{Var}(X)=\\dfrac{1-p}{p^{2}}$\n\n' +
          '예: 주사위에서 6이 처음 나올 때까지 던지는 횟수는 $p=\\frac{1}{6}$인 기하분포이고 평균 6번입니다. 세 번째에 처음 6이 나올 확률은 $\\left(\\frac{5}{6}\\right)^{2}\\frac{1}{6}=\\frac{25}{216}$입니다.\n\n' +
          '> ⚠️ 책에 따라 "처음 성공하기 전까지의 **실패** 횟수" $Y=X-1$(값 $0, 1, 2, \\cdots$)을 기하분포라고 부르기도 합니다. 이때는 $E(Y)=\\dfrac{1-p}{p}$입니다. 어느 정의인지 늘 확인합니다.',
        easy: '뽑기에서 당첨 확률이 $\\frac{1}{4}$이라면 "평균 4번 만에 처음 당첨된다"고 기대할 수 있습니다. 이것이 $E(X)=\\frac{1}{p}$입니다.\n\n' +
          '세 번째에 처음 당첨되려면 첫째 꽝, 둘째 꽝, 셋째 당첨이어야 하므로 $\\frac{3}{4}\\times\\frac{3}{4}\\times\\frac{1}{4}$입니다.',
        check: {
          type: 'short', check: 'number', unit: '번',
          q: '성공 확률이 $\\dfrac{1}{4}$인 시행을 처음 성공할 때까지 되풀이합니다. 처음 성공할 때까지의 시행 횟수의 기댓값을 구하세요.',
          answer: '4',
          wrong: [{ a: '3', why: '실패 횟수의 기댓값 $\\frac{1-p}{p}$를 구했습니다. 성공한 시행까지 셉니다.' }, { a: '0.25', why: '성공 확률을 답했습니다. 기댓값은 $\\frac{1}{p}$입니다.' }],
          explain: '$E(X)=\\dfrac{1}{p}=\\dfrac{1}{1/4}=4$번입니다.',
        },
      },
    ],

    examples: [
      {
        q: '확률변수 $X$의 확률질량함수가 $p(x)=cx\\ (x=1, 2, 3, 4)$입니다. 상수 $c$와 $E(X)$, $\\mathrm{Var}(X)$를 구하세요.',
        steps: [
          '확률의 합이 1이어야 하므로 $c(1+2+3+4)=10c=1$, $c=\\dfrac{1}{10}$입니다.',
          '$E(X)=\\sum x\\cdot\\dfrac{x}{10}=\\dfrac{1+4+9+16}{10}=3$입니다.',
          '$E(X^{2})=\\sum x^{2}\\cdot\\dfrac{x}{10}=\\dfrac{1+8+27+64}{10}=10$입니다.',
          '$\\mathrm{Var}(X)=E(X^{2})-\\{E(X)\\}^{2}=10-9=1$입니다.',
        ],
        answer: '$c=\\dfrac{1}{10}$, $E(X)=3$, $\\mathrm{Var}(X)=1$',
      },
      {
        q: '불량률이 0.002인 부품 1,000개를 검사할 때 불량품이 2개 이하일 확률을 포아송 근사로 구하세요. ($e^{-2}\\approx0.1353$)',
        steps: [
          '불량품 수 $X$는 $B(1000, 0.002)$를 따릅니다. $n$이 크고 $p$가 작으므로 $\\lambda=np=2$인 포아송 분포로 근사합니다.',
          '$P(X=0)\\approx e^{-2}$, $P(X=1)\\approx 2e^{-2}$, $P(X=2)\\approx\\dfrac{2^{2}}{2!}e^{-2}=2e^{-2}$입니다.',
          '모두 더하면 $P(X\\le2)\\approx(1+2+2)e^{-2}=5e^{-2}\\approx5\\times0.1353=0.6765$입니다.',
        ],
        answer: '약 0.677',
      },
    ],

    terms: [
      { term: '확률변수', def: '시행의 각 결과에 실수를 하나씩 대응시키는 함수입니다. 값을 하나하나 셀 수 있으면 이산확률변수입니다.' },
      { term: '확률질량함수', def: '이산확률변수 $X$가 각 값을 가질 확률 $p(x)=P(X=x)$를 주는 함수입니다. $p(x)\\ge0$, $\\sum p(x)=1$' },
      { term: '누적분포함수', def: '$F(x)=P(X\\le x)$입니다. 이산형이면 계단 모양이고 0에서 1까지 줄어들지 않고 올라갑니다.' },
      { term: '기댓값', def: '값에 확률을 곱해 모두 더한 $E(X)=\\sum x\\,p(x)$입니다. 같은 시행을 많이 되풀이할 때의 평균값을 뜻합니다.' },
      { term: '분산', def: '$\\mathrm{Var}(X)=E\\left((X-\\mu)^{2}\\right)=E(X^{2})-\\{E(X)\\}^{2}$입니다. 제곱근이 표준편차입니다.' },
      { term: '베르누이 시행', def: '결과가 성공과 실패 두 가지뿐인 시행입니다. 성공을 1, 실패를 0으로 나타낸 확률변수는 베르누이 분포를 따릅니다.' },
      { term: '이항분포', def: '성공 확률이 $p$인 베르누이 시행을 독립적으로 $n$번 할 때 성공 횟수의 분포 $B(n, p)$입니다. 평균 $np$, 분산 $np(1-p)$' },
      { term: '포아송 분포', def: '일정한 구간에서 드물게 독립적으로 일어나는 사건의 횟수 분포로, $P(X=k)=\\dfrac{e^{-\\lambda}\\lambda^{k}}{k!}$입니다. 평균과 분산이 모두 $\\lambda$입니다.' },
      { term: '기하분포', def: '처음 성공할 때까지의 시행 횟수의 분포로, $P(X=k)=(1-p)^{k-1}p$입니다. 평균 $\\dfrac{1}{p}$' },
      { term: '무기억성', def: '이미 지난 실패가 앞으로의 확률에 영향을 주지 않는 성질 $P(X>s+t|X>s)=P(X>t)$입니다. 이산분포 가운데 기하분포만 이 성질을 가집니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '확률변수 $X$의 확률분포가 다음과 같을 때 $a$의 값을 구하세요.\n\n| $x$ | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|\n| $P(X=x)$ | 0.1 | 0.3 | $a$ | 0.2 |',
        answer: '0.4',
        wrong: [{ a: '0.6', why: '주어진 확률의 합 0.6을 답했습니다. 전체 합이 1이 되도록 $1-0.6$을 구합니다.' }],
        explain: '확률의 합은 1이므로 $0.1+0.3+a+0.2=1$, $a=0.4$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 0,
        q: '확률변수 $X$의 확률질량함수가 $p(0)=0.2$, $p(1)=0.3$, $p(2)=0.4$, $p(3)=0.1$일 때, $P(1<X\\le3)$을 구하세요.',
        answer: '0.5',
        hint: '$1<X\\le3$에 드는 값이 무엇인지 먼저 적으세요.',
        wrong: [{ a: '0.8', why: '$X=1$도 넣었습니다. $1<X$이므로 1은 빠집니다.' }, { a: '0.4', why: '$X=3$을 빠뜨렸습니다. $X\\le3$이므로 3도 들어갑니다.' }],
        explain: '$1<X\\le3$인 값은 2와 3이므로 $P=0.4+0.1=0.5$입니다. 누적분포함수로는 $F(3)-F(1)=1-0.5=0.5$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 1,
        q: '확률변수 $X$의 확률분포가 다음과 같을 때 $E(X)$를 구하세요.\n\n| $x$ | 1 | 2 | 3 |\n|---|---|---|---|\n| $P(X=x)$ | 0.2 | 0.5 | 0.3 |',
        answer: '2.1',
        wrong: [{ a: '2', why: '값 1, 2, 3을 그냥 평균했습니다. 기댓값은 각 값에 확률을 곱해 더합니다.' }, { a: '1', why: '확률만 더했습니다. 각 확률에 값 $x$를 곱해야 합니다.' }],
        explain: '$E(X)=1\\times0.2+2\\times0.5+3\\times0.3=0.2+1+0.9=2.1$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 1,
        q: '$\\mathrm{Var}(X)=3$일 때 $\\mathrm{Var}(-2X+5)$의 값은 무엇입니까?',
        choices: ['12', '-6', '6', '17'],
        answer: 0,
        why: ['', '$-2$를 제곱하지 않았습니다. 분산은 음수가 될 수 없습니다.', '$a=-2$의 절댓값만 곱했습니다. 분산에는 $a^{2}=4$를 곱합니다.', '상수 5를 더했습니다. 상수를 더해도 분산은 변하지 않습니다.'],
        explain: '$\\mathrm{Var}(-2X+5)=(-2)^{2}\\mathrm{Var}(X)=4\\times3=12$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 2,
        q: '$X$가 이항분포 $B(10, 0.3)$을 따를 때 $\\mathrm{Var}(X)$를 구하세요.',
        answer: '2.1',
        wrong: [{ a: '3', why: '기댓값 $np$를 구했습니다. 분산은 $np(1-p)$입니다.' }, { a: '0.21', why: '$n=10$을 곱하지 않았습니다.' }],
        explain: '$\\mathrm{Var}(X)=np(1-p)=10\\times0.3\\times0.7=2.1$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 2,
        q: '다음 가운데 확률변수 $X$가 이항분포를 **따르지 않는** 것은 무엇입니까?',
        choices: ['카드 52장에서 다시 넣지 않고 5장을 뽑을 때 하트의 개수', '주사위를 10번 던질 때 6의 눈이 나온 횟수', '불량률이 2%인 공정에서 서로 독립적으로 만든 제품 50개 중 불량품의 수', '동전을 20번 던질 때 앞면이 나온 횟수'],
        answer: 0,
        why: ['', '시행 횟수 10이 정해져 있고 매번 확률 $\\frac{1}{6}$로 독립이므로 $B\\left(10, \\frac{1}{6}\\right)$입니다.', '독립인 50번의 시행에서 매번 불량 확률이 0.02이므로 $B(50, 0.02)$입니다.', '독립인 20번의 시행에서 매번 앞면 확률이 $\\frac{1}{2}$이므로 이항분포입니다.'],
        explain: '카드를 다시 넣지 않으면 뽑을 때마다 하트가 나올 확률이 바뀌고 시행끼리 독립이 아닙니다. 그래서 이항분포가 아닙니다(이 분포는 초기하분포라고 부릅니다).',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'number', concept: 3,
        q: '어떤 웹사이트에 1분 동안 들어오는 접속 요청 수 $X$가 평균 4인 포아송 분포를 따릅니다. $X$의 표준편차를 구하세요.',
        answer: '2',
        wrong: [{ a: '4', why: '분산을 답했습니다. 포아송 분포의 분산은 $\\lambda=4$이고 표준편차는 그 제곱근입니다.' }, { a: '16', why: '평균을 제곱했습니다. 포아송 분포는 분산이 평균과 같습니다.' }],
        explain: '포아송 분포의 분산은 $\\lambda=4$이므로 표준편차는 $\\sqrt{4}=2$입니다.',
      },
      {
        id: 'p8', level: 1, type: 'short', check: 'number', unit: '번', concept: 4,
        q: '한 번 시도할 때 성공 확률이 0.2인 일을 처음 성공할 때까지 되풀이합니다. 시도 횟수의 기댓값을 구하세요.',
        answer: '5',
        wrong: [{ a: '4', why: '실패 횟수의 기댓값을 구했습니다. 성공한 시도까지 세면 $\\frac{1}{p}$입니다.' }, { a: '0.2', why: '성공 확률을 답했습니다.' }],
        explain: '처음 성공까지의 시행 횟수는 기하분포를 따르고 $E(X)=\\dfrac{1}{0.2}=5$번입니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 3,
        q: '한 상담실에 한 시간 동안 걸려 오는 전화 수가 평균 2인 포아송 분포를 따릅니다. 한 시간 동안 전화가 **정확히 1통** 걸려 올 확률은 무엇입니까?',
        choices: ['$2e^{-2}$', '$e^{-2}$', '$e^{-1}$', '$1-e^{-2}$'],
        answer: 0,
        hint: '$P(X=k)=\\dfrac{e^{-\\lambda}\\lambda^{k}}{k!}$에 $\\lambda=2$, $k=1$을 넣으세요.',
        why: ['', '전화가 한 통도 오지 않을 확률 $P(X=0)$입니다.', '$\\lambda$ 자리에 $k=1$을 넣었습니다. 지수에는 평균 $\\lambda=2$가 들어갑니다.', '적어도 한 통 올 확률 $P(X\\ge1)$입니다.'],
        explain: '$P(X=1)=\\dfrac{e^{-2}2^{1}}{1!}=2e^{-2}\\approx0.271$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 4,
        q: '성공 확률이 $\\dfrac{1}{3}$인 시행을 독립적으로 되풀이할 때, **세 번째** 시행에서 처음으로 성공할 확률을 분수로 구하세요.',
        answer: '4/27',
        hint: '앞의 두 번은 어떻게 되어야 할까요?',
        wrong: [{ a: '2/27', why: '성공과 실패 확률을 바꾸어 썼습니다. 두 번 실패$\\left(\\frac{2}{3}\\right)^{2}$ 후 한 번 성공$\\left(\\frac{1}{3}\\right)$입니다.' }, { a: '4/9', why: '세 번째 성공 확률 $\\frac{1}{3}$을 곱하지 않았습니다.' }, { a: '1/3', why: '세 번째 시행만 보았습니다. 앞의 두 번이 모두 실패해야 "처음" 성공입니다.' }],
        explain: '$P(X=3)=\\left(\\dfrac{2}{3}\\right)^{2}\\times\\dfrac{1}{3}=\\dfrac{4}{27}$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 1,
        q: '두 확률변수 $X$, $Y$가 서로 독립이고 $\\mathrm{Var}(X)=4$, $\\mathrm{Var}(Y)=9$입니다. $\\mathrm{Var}(X-Y)$를 구하세요.',
        answer: '13',
        hint: '$X-Y=X+(-1)Y$로 보세요.',
        wrong: [{ a: '-5', why: '분산끼리 뺐습니다. $\\mathrm{Var}(-Y)=(-1)^{2}\\mathrm{Var}(Y)$이므로 분산은 더해집니다.' }, { a: '5', why: '분산끼리 뺀 값의 절댓값입니다. 독립이면 $\\mathrm{Var}(X-Y)=\\mathrm{Var}(X)+\\mathrm{Var}(Y)$입니다.' }, { a: '1', why: '표준편차끼리 뺐습니다. 분산을 더해야 합니다.' }],
        explain: '독립이므로 $\\mathrm{Var}(X-Y)=\\mathrm{Var}(X)+(-1)^{2}\\mathrm{Var}(Y)=4+9=13$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 3,
        q: '불량률이 0.004인 제품 500개 가운데 불량품이 하나도 없을 확률을 포아송 분포로 근사한 값은 무엇입니까?',
        choices: ['$e^{-2}$', '$e^{-0.004}$', '$2e^{-2}$', '$e^{-500}$'],
        answer: 0,
        hint: '$\\lambda=np$를 먼저 구하세요.',
        why: ['', '$\\lambda$로 $p$를 썼습니다. 근사할 포아송 분포의 평균은 $\\lambda=np$입니다.', '불량품이 정확히 1개일 확률 $P(X=1)$입니다.', '$\\lambda$로 $n$을 썼습니다. 평균 불량품 수는 $np=2$입니다.'],
        explain: '$\\lambda=np=500\\times0.004=2$이므로 $P(X=0)\\approx e^{-2}\\approx0.135$입니다. (정확한 값 $0.996^{500}\\approx0.135$와 거의 같습니다.)',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', unit: '원', concept: 1,
        q: '참가비 1,000원을 내고 주사위 한 개를 던져, 6의 눈이 나오면 상금 $x$원을 받는 게임이 있습니다(6이 아니면 상금 없음). 이 게임에서 얻는 순이익의 기댓값이 0이 되려면 $x$는 얼마여야 합니까?',
        answer: '6000',
        hint: '순이익을 확률변수로 놓고 기댓값을 식으로 쓰세요.',
        wrong: [{ a: '5000', why: '6이 아닐 때만 참가비를 잃는 것으로 계산했습니다. 참가비는 6이 나와도 내므로, 6이 나올 때의 순이익은 $x-1000$원입니다.' }, { a: '1000', why: '상금과 참가비가 같으면 된다고 생각했습니다. 상금은 6분의 1의 확률로만 받습니다.' }],
        explain: '받는 상금의 기댓값은 $\\dfrac{1}{6}x$원이고 참가비는 언제나 1,000원이므로 순이익의 기댓값은 $\\dfrac{1}{6}x-1000$입니다. 이것이 0이 되려면 $x=6000$원입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 4,
        q: '성공 확률이 0.2인 시행을 처음 성공할 때까지 되풀이합니다. 이미 3번 연속 실패했다는 것을 알 때, 앞으로 **2번 안에** 처음 성공할 확률을 구하세요.',
        answer: '0.36',
        hint: '$P(X\\le5|X>3)$을 조건부확률의 정의로 계산하거나, 기하분포의 무기억성을 쓰세요.',
        wrong: [{ a: '0.2', why: '다음 한 번만 생각했습니다. 다음 번 또는 그다음 번에 성공하면 됩니다.' }, { a: '0.64', why: '앞으로 2번 모두 실패할 확률입니다. 1에서 빼야 합니다.' }, { a: '0.18432', why: '조건 없이 처음 5번 안에 성공하고 3번 실패한 경우의 확률을 구했습니다. 이미 실패한 3번은 조건이므로 그 확률로 나누어야 합니다.' }],
        explain: '$P(X\\le5|X>3)=\\dfrac{P(3<X\\le5)}{P(X>3)}=\\dfrac{0.8^{3}-0.8^{5}}{0.8^{3}}=1-0.8^{2}=0.36$입니다. 지난 실패는 앞으로의 확률에 영향을 주지 않으므로(무기억성) 처음부터 2번 안에 성공할 확률 $1-0.8^{2}$과 같습니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 3,
        q: '포아송 분포를 따르는 확률변수 $X$에 대하여 $P(X=2)=P(X=3)$입니다. $E(X)$를 구하세요.',
        answer: '3',
        hint: '$\\dfrac{P(X=3)}{P(X=2)}$를 $\\lambda$로 나타내 보세요.',
        wrong: [{ a: '2.5', why: '두 값의 가운데를 평균으로 보았습니다. 확률의 비 $\\frac{\\lambda}{3}=1$에서 구합니다.' }, { a: '6', why: '$\\frac{\\lambda^{3}}{3!}=\\frac{\\lambda^{2}}{2!}$를 풀 때 계산이 어긋났습니다. 양변을 $\\frac{\\lambda^{2}}{2}$로 나누면 $\\frac{\\lambda}{3}=1$입니다.' }],
        explain: '$\\dfrac{P(X=3)}{P(X=2)}=\\dfrac{e^{-\\lambda}\\lambda^{3}/3!}{e^{-\\lambda}\\lambda^{2}/2!}=\\dfrac{\\lambda}{3}=1$이므로 $\\lambda=3$이고, $E(X)=\\lambda=3$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 2,
        q: '확률변수 $X$가 이항분포 $B(n, p)$를 따르고 $E(X)=6$, $\\mathrm{Var}(X)=4.2$입니다. $n$을 구하세요.',
        answer: '20',
        hint: '분산을 기댓값으로 나누면 무엇이 남을까요?',
        wrong: [{ a: '0.3', why: '$p$를 구했습니다. 문제는 $n$을 묻습니다.' }, { a: '0.7', why: '$1-p$를 구했습니다. 여기서 $p=0.3$, $n=\\frac{6}{0.3}$입니다.' }],
        explain: '$\\dfrac{\\mathrm{Var}(X)}{E(X)}=\\dfrac{np(1-p)}{np}=1-p=\\dfrac{4.2}{6}=0.7$이므로 $p=0.3$입니다. $np=6$에서 $n=\\dfrac{6}{0.3}=20$입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 1,
        q: '주사위 두 개를 던질 때 두 눈 가운데 큰 값(같으면 그 값)을 $X$라고 합니다. $E(X)$를 분수로 구하세요.',
        answer: '161/36',
        hint: '먼저 $P(X\\le k)=\\left(\\dfrac{k}{6}\\right)^{2}$임을 이용해 $P(X=k)$를 구하세요.',
        wrong: [{ a: '7/2', why: '주사위 한 개의 기댓값입니다. 두 눈 가운데 큰 값은 그보다 커집니다.' }, { a: '7', why: '두 눈의 합의 기댓값입니다.' }],
        explain: '두 눈이 모두 $k$ 이하일 확률이 $F(k)=\\dfrac{k^{2}}{36}$이므로 $P(X=k)=F(k)-F(k-1)=\\dfrac{2k-1}{36}$입니다.\n\n$E(X)=\\sum_{k=1}^{6}k\\cdot\\dfrac{2k-1}{36}=\\dfrac{1+6+15+28+45+66}{36}=\\dfrac{161}{36}\\approx4.47$입니다.',
      },
    ],

    deeper: [
      {
        title: '기하분포의 무기억성',
        body: '기하분포는 $P(X>s+t|X>s)=P(X>t)$를 만족합니다. 실제로 $P(X>k)=(1-p)^{k}$이므로\n\n' +
          '$P(X>s+t|X>s)=\\dfrac{(1-p)^{s+t}}{(1-p)^{s}}=(1-p)^{t}=P(X>t)$\n\n' +
          '"이미 열 번 실패했으니 이제 곧 성공하겠지"라는 생각은 독립 시행에서는 틀렸습니다. 지난 실패는 앞으로의 확률을 바꾸지 않습니다. 이 착각을 **도박사의 오류**라고 부릅니다.\n\n' +
          '값이 $1, 2, 3, \\cdots$인 이산분포 가운데 무기억성을 가지는 것은 기하분포뿐입니다. 다음 단원에서 배울 연속분포 가운데에서는 지수분포가 같은 성질을 가지며, 기하분포를 "연속 시간"으로 옮긴 것이라고 볼 수 있습니다.',
      },
      {
        title: '이항분포에서 포아송 분포로',
        body: '$\\lambda=np$를 고정하고 $n\\to\\infty$로 보내면\n\n' +
          '$\\binom{n}{k}p^{k}(1-p)^{n-k}=\\dfrac{n(n-1)\\cdots(n-k+1)}{n^{k}}\\cdot\\dfrac{\\lambda^{k}}{k!}\\cdot\\left(1-\\dfrac{\\lambda}{n}\\right)^{n}\\left(1-\\dfrac{\\lambda}{n}\\right)^{-k}$\n\n' +
          '에서 첫째 인수와 마지막 인수는 1로, $\\left(1-\\frac{\\lambda}{n}\\right)^{n}$은 $e^{-\\lambda}$에 다가갑니다. 그래서 극한은 $\\dfrac{e^{-\\lambda}\\lambda^{k}}{k!}$, 곧 포아송 분포가 됩니다.\n\n' +
          '보험 사고 건수, 방사성 원소의 붕괴 횟수, 서버에 들어오는 요청 수처럼 "기회는 매우 많지만 한 번 한 번의 확률은 매우 작은" 현상에 포아송 분포가 널리 쓰이는 까닭입니다.',
      },
    ],

    faq: [
      {
        q: '분산을 구할 때 E(X²)−{E(X)}²랑 정의식 중에 뭘 써야 해요?',
        a: '둘은 같은 값입니다. 손으로 계산할 때는 보통 $E(X^{2})-\\{E(X)\\}^{2}$이 편합니다. 다만 $E(X^{2})$과 $\\{E(X)\\}^{2}$을 헷갈리지 않도록, 앞의 것은 "제곱한 뒤 평균", 뒤의 것은 "평균한 뒤 제곱"이라고 기억하세요.',
      },
      {
        q: 'Var(X−Y)는 왜 분산을 빼지 않고 더해요?',
        a: '$X-Y=X+(-1)Y$이고 $\\mathrm{Var}(-Y)=(-1)^{2}\\mathrm{Var}(Y)=\\mathrm{Var}(Y)$입니다. 불확실한 값끼리 빼도 불확실성은 줄지 않고 쌓입니다. 단, 이렇게 단순히 더할 수 있는 것은 $X$와 $Y$가 독립일 때입니다.',
      },
      {
        q: '이항분포랑 포아송 분포는 언제 무엇을 써요?',
        a: '시행 횟수 $n$과 성공 확률 $p$가 분명하면 이항분포를 씁니다. 횟수에 정해진 상한이 없고 "단위 시간(넓이)당 평균 몇 번"만 알 때는 포아송 분포를 씁니다. $n$이 매우 크고 $p$가 매우 작은 이항분포는 계산을 쉽게 하려고 $\\lambda=np$인 포아송 분포로 근사합니다.',
      },
      {
        q: '기하분포의 평균이 책마다 1/p이기도 하고 (1−p)/p이기도 해요.',
        a: '정의가 두 가지이기 때문입니다. "처음 성공할 때까지의 시행 횟수"(1, 2, 3, …)로 정의하면 평균이 $\\frac{1}{p}$, "처음 성공하기 전까지의 실패 횟수"(0, 1, 2, …)로 정의하면 $\\frac{1-p}{p}$입니다. 이 단원은 앞의 정의를 씁니다.',
      },
    ],

    mistakes: [
      '$\\mathrm{Var}(aX+b)$를 $a\\mathrm{Var}(X)+b$로 계산하는 실수 — 곱한 수는 제곱이 붙고, 더한 상수는 사라집니다: $a^{2}\\mathrm{Var}(X)$',
      '$E(X^{2})$을 $\\{E(X)\\}^{2}$으로 바꾸어 쓰는 실수 — 둘의 차이가 바로 분산입니다.',
      '다시 넣지 않고 뽑는 상황을 이항분포로 계산하는 실수 — 확률이 매번 바뀌면 이항분포가 아닙니다.',
    ],

    gens: [
      {
        id: 'pmf-mean-var',
        level: 1,
        title: '확률분포표에서 기댓값·분산 구하기',
        make: function (R) {
          var k = R.pick([3, 3, 4]);
          var xs = R.sample([0, 1, 2, 3, 4, 5], k).sort(function (a, b) { return a - b; });
          // 확률(10분의 몇)을 1 이상씩 나누어 합이 10이 되게
          var ps = [], left = 10;
          for (var i = 0; i < k - 1; i++) { var v = R.int(1, left - (k - 1 - i)); ps.push(v); left -= v; }
          ps.push(left);
          ps = R.shuffle(ps);
          var P = ps.map(function (v) { return R.F(v, 10); });
          var E = R.F(0, 1), E2 = R.F(0, 1);
          for (i = 0; i < k; i++) { E = E.add(P[i].mul(xs[i])); E2 = E2.add(P[i].mul(xs[i] * xs[i])); }
          var V = E2.sub(E.mul(E));
          var table = '| $x$ | ' + xs.join(' | ') + ' |\n|' + new Array(k + 2).join('---|') + '\n| $P(X=x)$ | ' + P.map(texOf).join(' | ') + ' |';
          var plainMean = R.F(xs.reduce(function (s, v) { return s + v; }, 0), k);
          var Etex = xs.map(function (x, j) { return x + '\\times' + texOf(P[j]); }).join('+');
          var E2tex = xs.map(function (x, j) { return x * x + '\\times' + texOf(P[j]); }).join('+');
          if (R.bool(0.45)) {
            return {
              type: 'short', check: 'number', concept: 1,
              q: '확률변수 $X$의 확률분포가 다음과 같을 때 $E(X)$를 구하세요.\n\n' + table,
              answer: ansText(E),
              wrong: W(E, [[plainMean, '값들을 그냥 평균했습니다. 각 값에 확률을 곱해 더합니다.'], [E2, '$E(X^{2})$을 구했습니다. 값을 제곱하지 않고 곱합니다.']]),
              explain: '$E(X)=' + Etex + '=' + texOf(E) + '$입니다.',
            };
          }
          return {
            type: 'short', check: 'number', concept: 1,
            q: '확률변수 $X$의 확률분포가 다음과 같을 때 $\\mathrm{Var}(X)$를 구하세요.\n\n' + table,
            answer: ansText(V),
            hint: '$\\mathrm{Var}(X)=E(X^{2})-\\{E(X)\\}^{2}$',
            wrong: W(V, [[E2, '$E(X^{2})$에서 멈추었습니다. $\\{E(X)\\}^{2}$을 빼야 합니다.'], [E2.sub(E).sign() > 0 ? E2.sub(E) : null, '$E(X)$를 제곱하지 않고 뺐습니다.'], [E, '기댓값을 구했습니다.']]),
            explain: '$E(X)=' + Etex + '=' + texOf(E) + '$\n\n$E(X^{2})=' + E2tex + '=' + texOf(E2) + '$\n\n$\\mathrm{Var}(X)=' + texOf(E2) + '-(' + texOf(E) + ')^{2}=' + texOf(V) + '$입니다.',
          };
        },
      },
      {
        id: 'binomial',
        level: 2,
        title: '이항분포의 확률·평균·분산',
        make: function (R) {
          if (R.bool(0.6)) {
            var n = R.int(3, 6);
            var k = R.int(0, n);
            var pr = R.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5]]);
            var p = R.F(pr[0], pr[1]), q = R.F(1, 1).sub(p);
            var c = comb(n, k);
            var one = p.pow(k).mul(q.pow(n - k));
            var ans = one.mul(c);
            var pT = p.toTex(), qT = q.toTex();
            var expr = C(n, k) + powTex(pT, k) + powTex(qT, n - k);
            var swapped = p.pow(n - k).mul(q.pow(k)).mul(c);
            return {
              type: 'short', check: 'number', concept: 2,
              q: '$X$가 이항분포 $B\\left(' + n + ', ' + pT + '\\right)$' + R.josa(pr[0], '을/를') + ' 따를 때 $P(X=' + k + ')$' + R.josa(k, '을/를') + ' 분수로 구하세요.',
              answer: ans.toString(),
              hint: '$P(X=k)=\\binom{n}{k}p^{k}(1-p)^{n-k}$',
              wrong: W(ans, [
                [c === 1 ? null : one, '$' + C(n, k) + '=' + c + '$' + R.josa(c, '을/를') + ' 곱하지 않았습니다. 성공할 자리를 고르는 방법의 수입니다.'],
                [swapped, '성공 확률과 실패 확률의 지수를 바꾸어 썼습니다. 성공 ' + k + '번에는 $p$, 실패 ' + (n - k) + '번에는 $1-p$를 곱합니다.'],
              ]),
              explain: '$P(X=' + k + ')=' + expr + (c === 1 ? '' : '=' + c + '\\times ' + one.toTex()) + '=' + ans.toTex() + '$입니다.',
            };
          }
          var n2 = R.pick([10, 20, 25, 40, 50, 100]);
          var pp = R.pick([1, 2, 3, 4, 6, 7, 8, 9]);
          var P = R.F(pp, 10), Q = R.F(10 - pp, 10);
          var Ex = P.mul(n2), Vx = P.mul(Q).mul(n2);
          var askV = R.bool();
          var ans2 = askV ? Vx : Ex;
          return {
            type: 'short', check: 'number', concept: 2,
            q: '$X$가 이항분포 $B(' + n2 + ', ' + texOf(P) + ')$' + R.josa(texOf(P), '을/를') + ' 따를 때 ' + (askV ? '$\\mathrm{Var}(X)$' : '$E(X)$') + '를 구하세요.',
            answer: ansText(ans2),
            wrong: askV
              ? W(ans2, [[Ex, '기댓값 $np$를 구했습니다. 분산은 $np(1-p)$입니다.'], [P.mul(Q), '$n$을 곱하지 않았습니다.'], [P.mul(P).mul(n2), '$1-p$ 대신 $p$를 한 번 더 곱했습니다.']])
              : W(ans2, [[Vx, '분산 $np(1-p)$를 구했습니다. 기댓값은 $np$입니다.'], [Q.mul(n2), '실패 확률을 곱했습니다. 성공 횟수의 기댓값은 $np$입니다.']]),
            explain: askV
              ? '$\\mathrm{Var}(X)=np(1-p)=' + n2 + '\\times' + texOf(P) + '\\times' + texOf(Q) + '=' + texOf(Vx) + '$입니다.'
              : '$E(X)=np=' + n2 + '\\times' + texOf(P) + '=' + texOf(Ex) + '$입니다.',
          };
        },
      },
      {
        id: 'poisson',
        level: 2,
        title: '포아송 분포의 확률',
        make: function (R) {
          var lam = R.int(1, 5);
          var ctx = R.pick([
            ['한 시간 동안 걸려 오는 상담 전화 수', '통', '전화가 적어도 한 통 걸려 올'],
            ['책 한 쪽에 있는 오타 수', '개', '오타가 적어도 한 개 있을'],
            ['1분 동안 매장에 들어오는 손님 수', '명', '손님이 적어도 한 명 들어올'],
          ]);
          var intro = ctx[0] + ' $X$가 평균 ' + lam + '인 포아송 분포를 따릅니다. ';
          var approx = function (c) { return Math.round(c.valueOf() * Math.exp(-lam) * 1000) / 1000; };
          if (R.bool(0.7)) {
            var k = R.int(lam === 1 ? 2 : 1, 4);
            var c = R.F(Math.pow(lam, k), fact(k));
            var correct = '$' + eTerm(c, lam) + '$';
            var cands = [
              ['$' + eTerm(R.F(Math.pow(lam, k), 1), lam) + '$', '$k!=' + fact(k) + '$' + R.josa(fact(k), '으로/로') + ' 나누지 않았습니다.'],
              ['$' + (c.isInt() ? c.toString() : '\\dfrac{' + c.num + '}{' + c.den + '}') + '$', '$e^{-\\lambda}=e^{-' + lam + '}$을 곱하지 않았습니다.'],
              ['$' + (c.eq(1) ? '' : c.isInt() ? c.toString() : '\\dfrac{' + c.num + '}{' + c.den + '}') + 'e^{' + lam + '}$', '지수의 부호를 놓쳤습니다. $e^{-\\lambda}$입니다.'],
              ['$' + eTerm(R.F(1, 1), lam) + '$', '$X=0$일 확률입니다.'],
              ['$' + eTerm(R.F(Math.pow(lam, k + 1), fact(k + 1)), lam) + '$', '$X=' + (k + 1) + '$일 확률을 구했습니다.'],
              ['$' + eTerm(R.F(Math.pow(lam, k - 1), fact(k - 1)), lam) + '$', '$X=' + (k - 1) + '$일 확률을 구했습니다.'],
              ['$' + eTerm(R.F(Math.pow(k, lam), fact(lam)), k) + '$', '$\\lambda$와 $k$의 자리를 바꾸었습니다.'],
            ];
            var reason = {};
            cands.forEach(function (cd) { if (cd[0] !== correct && !(cd[0] in reason)) reason[cd[0]] = cd[1]; });
            var pick = R.choices(correct, R.shuffle(Object.keys(reason)));
            return {
              type: 'choice', concept: 3,
              q: intro + '$P(X=' + k + ')$' + R.josa(k, '은/는') + ' 무엇입니까?',
              choices: pick.choices,
              answer: pick.answer,
              hint: '$P(X=k)=\\dfrac{e^{-\\lambda}\\lambda^{k}}{k!}$',
              why: pick.choices.map(function (s) { return s === correct ? '' : reason[s] || ''; }),
              explain: '$P(X=' + k + ')=\\dfrac{e^{-' + lam + '}\\cdot' + lam + '^{' + k + '}}{' + k + '!}=' + eTerm(c, lam) + '\\approx' + approx(c) + '$입니다.',
            };
          }
          var correct2 = '$1-' + eTerm(R.F(1, 1), lam) + '$';
          var c2 = [
            ['$' + eTerm(R.F(1, 1), lam) + '$', '한 번도 일어나지 않을 확률 $P(X=0)$입니다. 1에서 빼야 합니다.'],
            ['$' + eTerm(R.F(lam, 1), lam) + '$', '정확히 한 번 일어날 확률 $P(X=1)$입니다. "적어도 한 번"은 여사건으로 구합니다.'],
            ['$1-' + eTerm(R.F(lam, 1), lam) + '$', '1에서 $P(X=1)$을 뺐습니다. 여사건은 "한 번도 없음", 곧 $X=0$입니다.'],
            ['$1-' + eTerm(R.F(1 + lam, 1), lam) + '$', '$P(X\\ge2)$를 구했습니다.'],
            ['$1-e^{-1}$', '지수에 평균 $\\lambda=' + lam + '$ 대신 1을 넣었습니다.'],
            ['$1-e^{' + lam + '}$', '지수의 부호를 놓쳤습니다. $P(X=0)=e^{-\\lambda}$입니다.'],
          ];
          var rs = {};
          c2.forEach(function (cd) { if (cd[0] !== correct2 && !(cd[0] in rs)) rs[cd[0]] = cd[1]; });
          var pk = R.choices(correct2, R.shuffle(Object.keys(rs)));
          return {
            type: 'choice', concept: 3,
            q: intro + ctx[2] + ' 확률 $P(X\\ge1)$은 무엇입니까?',
            choices: pk.choices,
            answer: pk.answer,
            hint: '여사건 $X=0$을 생각하세요.',
            why: pk.choices.map(function (s) { return s === correct2 ? '' : rs[s] || ''; }),
            explain: '$P(X\\ge1)=1-P(X=0)=1-e^{-' + lam + '}\\approx' + Math.round((1 - Math.exp(-lam)) * 1000) / 1000 + '$입니다.',
          };
        },
      },
      {
        id: 'geometric',
        level: 2,
        title: '기하분포의 확률',
        make: function (R) {
          var pr = R.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [1, 6]]);
          var p = R.F(pr[0], pr[1]), q = R.F(1, 1).sub(p);
          var k = R.int(2, 5);
          var pT = p.toTex();
          if (R.bool(0.6)) {
            var ans = q.pow(k - 1).mul(p);
            return {
              type: 'short', check: 'number', concept: 4,
              q: '성공 확률이 $' + pT + '$인 시행을 독립적으로 되풀이합니다. ' + k + '번째 시행에서 **처음으로** 성공할 확률을 분수로 구하세요.',
              answer: ans.toString(),
              hint: k === 2 ? '첫 번째 시행은 실패해야 합니다.' : '처음 ' + (k - 1) + '번은 모두 실패해야 합니다.',
              wrong: W(ans, [
                [q.pow(k).mul(p), '실패를 ' + k + '번 곱했습니다. ' + k + '번째가 성공이므로 실패는 ' + (k - 1) + '번입니다.'],
                [p.pow(k - 1).mul(q), '성공 확률과 실패 확률을 바꾸어 썼습니다.'],
                [q.pow(k - 1), '마지막 성공 확률 $' + pT + '$' + R.josa(pr[0], '을/를') + ' 곱하지 않았습니다.'],
              ]),
              explain: '$P(X=' + k + ')=(1-p)^{' + (k - 1) + '}p=' + powTex(q.toTex(), k - 1) + '\\times' + pT + '=' + ans.toTex() + '$입니다.',
            };
          }
          var ans2 = q.pow(k);
          return {
            type: 'short', check: 'number', concept: 4,
            q: '성공 확률이 $' + pT + '$인 시행을 처음 성공할 때까지 되풀이합니다. 처음 성공할 때까지의 시행 횟수 $X$에 대하여 $P(X>' + k + ')$' + R.josa(k, '을/를') + ' 분수로 구하세요.',
            answer: ans2.toString(),
            hint: '$X>' + k + '$' + R.josa(k, '은/는') + ' 처음 ' + k + '번이 어떻게 되었다는 뜻일까요?',
            wrong: W(ans2, [
              [q.pow(k - 1), '실패를 ' + (k - 1) + '번만 곱했습니다. $X>' + k + '$' + R.josa(k, '은/는') + ' 처음 ' + k + '번이 모두 실패라는 뜻입니다.'],
              [q.pow(k - 1).mul(p), '$P(X=' + k + ')$' + R.josa(k, '을/를') + ' 구했습니다.'],
              [R.F(1, 1).sub(q.pow(k)), '$P(X\\le' + k + ')$' + R.josa(k, '을/를') + ' 구했습니다.'],
            ]),
            explain: '$X>' + k + '$' + R.josa(k, '은/는') + ' 처음 ' + k + '번 모두 실패한다는 뜻이므로 $P(X>' + k + ')=(1-p)^{' + k + '}=' + powTex(q.toTex(), k) + '=' + ans2.toTex() + '$입니다.',
          };
        },
      },
    ],
  });
})();
