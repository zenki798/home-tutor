/* 확률과 통계 · 모집단과 표본
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 표본은 따로 말이 없으면 복원추출(임의추출)로 본다. 신뢰구간·추정(다음 단원)은 풀이에 쓰지 않는다.
 * 표준정규분포표 값(P(0≤Z≤z), 소수 넷째 자리)은 문제마다 함께 준다. */
(function () {
  function r1(v) { var t = Math.round(v * 10) / 10; return t === 0 ? 0 : t; }
  function txt(x, y, s, size, anchor) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '" text-anchor="' + (anchor || 'middle') + '" fill="currentColor">' + s + '</text>';
  }
  // 모집단의 분포와 표본평균의 분포를 겹쳐 그린 그림 (가로는 m 을 0 으로 둔 표준 단위)
  var XBAR_FIG = (function () {
    var X0 = 150, U = 34, Y0 = 128, H = 48;
    function px(z) { return X0 + z * U; }
    function pts(s) {
      var out = [];
      for (var i = 0; i <= 100; i++) { var z = -4 + 8 * i / 100; out.push(r1(px(z)) + ',' + r1(Y0 - (H / s) * Math.exp(-z * z / (2 * s * s)))); }
      return out.join(' ');
    }
    var s = '<line x1="8" y1="' + Y0 + '" x2="292" y2="' + Y0 + '" stroke="currentColor" stroke-width="1.2"/>';
    s += '<polyline points="' + pts(1) + '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="5 4"/>';
    s += '<polyline points="' + pts(0.5) + '" fill="none" stroke="var(--fig-1)" stroke-width="2"/>';
    s += '<line x1="150" y1="' + (Y0 + 4) + '" x2="150" y2="' + (Y0 - 98) + '" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>';
    s += txt(150, Y0 + 17, 'm') + txt(214, 70, '모집단', 12, 'start') + txt(186, 36, '표본평균(n=4)', 12, 'start');
    return { type: 'svg', alt: '평균이 m인 모집단의 분포(점선)와, 크기 4인 표본의 표본평균의 분포(실선). 두 곡선 모두 m에서 가장 높고, 표본평균의 분포가 더 높고 좁다', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">' + s + '</svg>' };
  })();

  // 표준정규분포표: P(0 ≤ Z ≤ z) 의 값 × 10000
  var ZT = [
    { z: 0.5, s: '0.5', h: '0.5', t: 1915 },
    { z: 1, s: '1', h: '1.0', t: 3413 },
    { z: 1.5, s: '1.5', h: '1.5', t: 4332 },
    { z: 2, s: '2', h: '2.0', t: 4772 },
    { z: 2.5, s: '2.5', h: '2.5', t: 4938 },
  ];
  function d4(v) { return (v / 10000).toFixed(4); }
  function table(rows) {
    return '| $z$ | ' + rows.map(function (r) { return r.h; }).join(' | ') + ' |\n|---|' + rows.map(function () { return '---|'; }).join('') +
      '\n| $\\mathrm{P}(0\\le Z\\le z)$ | ' + rows.map(function (r) { return d4(r.t); }).join(' | ') + ' |';
  }
  function W4(ans, list) {
    var seen = [ans], out = [];
    list.forEach(function (w) {
      if (w[0] <= 0 || w[0] >= 10000 || seen.indexOf(w[0]) >= 0) return;
      seen.push(w[0]);
      out.push({ a: d4(w[0]), why: w[1] });
    });
    return out;
  }
  // 꼬리 확률: Z ≥ ±a 또는 Z ≤ ±a
  function tail(kind, sign, row) {
    var t = row.t, pos = (kind === 'ge') === (sign > 0); // 오른쪽 꼬리(Z≥a, a>0) 또는 왼쪽 꼬리(Z≤-a)이면 작은 꼬리
    if (pos) return { v: 5000 - t, how: '0.5-' + d4(t), wr: [[t, '0부터 ' + row.s + '까지의 넓이를 구했습니다. 꼬리 부분은 0.5에서 이 넓이를 뺍니다.'], [5000 + t, '반대쪽 넓이를 구했습니다. 부등호 방향을 다시 확인해 보세요.']] };
    return { v: 5000 + t, how: '0.5+' + d4(t), wr: [[t, '0부터 ' + row.s + '까지의 넓이만 구했습니다. 0의 다른 쪽 절반 0.5도 더합니다.'], [5000 - t, '꼬리 부분만 구했습니다. 부등호 방향을 다시 확인해 보세요.']] };
  }
  function W(ans, list) {
    var seen = [ans], out = [];
    list.forEach(function (w) {
      var v = w[0];
      if (!v || v.sign() <= 0) return;
      for (var i = 0; i < seen.length; i++) if (seen[i].eq(v)) return;
      seen.push(v);
      out.push({ a: v.toString(), why: w[1] });
    });
    return out;
  }

  Tutor.registerUnit({
    id: 'math-h-stat-11',
    course: 'math-h-stat',
    title: '모집단과 표본',
    summary: '전수조사와 표본조사, 임의추출의 뜻을 알고, 표본평균과 표본비율의 분포가 모평균·모비율과 어떤 관계인지 알아봅니다.',
    goals: [
      '모집단과 표본, 전수조사와 표본조사의 뜻을 알고 표본추출의 원리를 설명할 수 있다.',
      '모평균·모분산과 표본평균·표본분산을 구별하고, 표본분산을 계산할 수 있다.',
      '표본평균 $\\bar{X}$의 평균, 분산, 표준편차를 구하고 그 분포를 이용하여 확률을 구할 수 있다.',
      '표본비율의 평균, 분산, 표준편차를 구하고 모비율과의 관계를 설명할 수 있다.',
    ],
    standards: ['[12확통03-05]', '[12확통03-06]'],

    concepts: [
      {
        title: '모집단과 표본, 전수조사와 표본조사',
        body: '통계 조사에서 조사하려는 대상 전체를 **모집단**, 모집단에서 뽑은 일부를 **표본**이라고 합니다. 표본에 들어 있는 대상의 개수를 **표본의 크기**라고 합니다.\n\n' +
          '- **전수조사**: 모집단 전체를 조사합니다. 예: 한 학급 학생 모두의 혈액형 조사, 전국의 인구를 모두 세는 총조사\n' +
          '- **표본조사**: 모집단의 일부(표본)만 조사하여 모집단의 성질을 추측합니다.\n\n' +
          '표본조사를 하는 까닭은 다음과 같습니다.\n' +
          '- 모집단이 너무 커서 전체를 조사하는 데 시간과 비용이 많이 들 때. 예: 전국 고등학생의 하루 수면 시간\n' +
          '- 조사하면 대상이 망가지거나 쓸 수 없게 될 때. 예: 전구의 수명, 통조림의 품질, 자동차의 충돌 안전 검사\n\n' +
          '> 💡 표본조사의 목적은 표본 자체가 아니라 **모집단**의 성질을 알아내는 것입니다.',
        easy: '국이 잘 끓었는지 알아보려고 냄비의 국을 다 먹어 볼 필요는 없습니다. 잘 저은 뒤 한 숟가락만 떠서 맛을 보면 되지요. 냄비 전체의 국이 **모집단**, 한 숟가락이 **표본**입니다.\n\n' +
          '과자 공장에서 과자가 잘 구워졌는지 모든 과자를 먹어 보면 팔 과자가 남지 않습니다. 이처럼 조사하면 망가지는 경우에는 표본조사를 할 수밖에 없습니다.',
        check: {
          type: 'choice',
          q: '다음 중 표본조사를 하는 것이 알맞은 것은 무엇입니까?',
          choices: ['공장에서 출고하는 전구의 평균 수명 조사', '우리 반 학생 전체의 출석 확인', '비행기에 타는 승객 모두의 보안 검색'],
          answer: 0,
          why: [
            '',
            '한 반의 출석은 대상이 적고, 한 명도 빠짐없이 확인해야 하므로 전수조사가 알맞습니다.',
            '보안 검색은 한 사람이라도 빠지면 안 되므로 모두 검사하는 전수조사를 합니다.',
          ],
          explain: '전구의 수명을 재려면 전구가 다 닳을 때까지 켜 두어야 하므로 모두 조사하면 팔 전구가 남지 않습니다. 그래서 일부만 뽑아 조사하는 표본조사가 알맞습니다.',
        },
      },
      {
        title: '임의추출',
        body: '표본은 모집단의 특징을 고루 담고 있어야 합니다. 그래서 모집단의 각 대상이 **같은 확률로 뽑히도록** 표본을 뽑는데, 이것을 **임의추출**이라고 합니다.\n\n' +
          '임의추출에는 제비뽑기, 난수표, 공학 도구(계산기나 컴퓨터의 난수 만들기 기능)를 씁니다. 예: 1번부터 500번까지 번호를 붙인 학생 중 10명을 뽑을 때, 공학 도구로 1 이상 500 이하의 난수를 만들어 그 번호의 학생을 뽑습니다.\n\n' +
          '- **복원추출**: 뽑은 것을 되돌려 놓은 뒤 다음 것을 뽑습니다.\n' +
          '- **비복원추출**: 뽑은 것을 되돌려 놓지 않고 다음 것을 뽑습니다.\n\n' +
          '모집단이 표본에 비해 충분히 크면 비복원추출도 복원추출과 거의 같다고 봅니다. 이 단원에서는 특별한 말이 없으면 임의추출을 복원추출로 생각합니다. 크기가 $N$인 모집단에서 크기가 $n$인 표본을 복원추출하는 방법의 수는 중복순열의 수 $N^{n}$입니다.\n\n' +
          '> ⚠️ 운동장에 나와 있는 학생만, 설문에 스스로 응답한 사람만 조사하는 것은 임의추출이 아닙니다. 특정한 성향을 가진 대상이 많이 뽑혀 표본이 모집단을 잘 대표하지 못합니다.',
        easy: '반에서 발표자를 뽑을 때 앞자리 학생만 시키면 공평하지 않지요. 번호표를 모두 상자에 넣고 눈을 감고 뽑아야 누구나 뽑힐 기회가 같습니다.\n\n' +
          '임의추출은 이렇게 "누구나 뽑힐 확률이 같게" 뽑는 것입니다. 사람이 직접 고르면 자기도 모르게 치우치므로 제비, 난수표, 컴퓨터의 난수처럼 사람의 뜻이 들어가지 않는 도구를 씁니다.',
        check: {
          type: 'ox',
          q: '어느 학교 학생들의 평균 독서 시간을 알아보려고 점심시간에 도서관에 있는 학생 20명을 조사하는 것은 임의추출이다.',
          answer: false,
          explain: '도서관에 있는 학생은 책을 좋아할 가능성이 커서 모든 학생이 같은 확률로 뽑히지 않습니다. 전교생에게 번호를 붙이고 난수로 20명을 뽑는 것이 임의추출입니다.',
        },
      },
      {
        title: '모평균·모분산과 표본평균·표본분산',
        body: '모집단에서 조사하려는 특성을 확률변수 $X$로 나타낼 때, $X$의 평균, 분산, 표준편차를 각각 **모평균** $m$, **모분산** $\\sigma^{2}$, **모표준편차** $\\sigma$라고 합니다.\n\n' +
          '모집단에서 임의추출한 크기가 $n$인 표본을 $X_{1}, X_{2}, \\cdots, X_{n}$이라고 할 때\n\n' +
          '- **표본평균** $\\bar{X}=\\dfrac{1}{n}(X_{1}+X_{2}+\\cdots+X_{n})$\n' +
          '- **표본분산** $S^{2}=\\dfrac{1}{n-1}\\{(X_{1}-\\bar{X})^{2}+(X_{2}-\\bar{X})^{2}+\\cdots+(X_{n}-\\bar{X})^{2}\\}$\n' +
          '- **표본표준편차** $S=\\sqrt{S^{2}}$\n\n' +
          '표본분산은 $n$이 아니라 $n-1$로 나눈다는 점에 주의합니다. 그래야 표본분산의 평균이 모분산과 같아집니다(심화 학습 참고).\n\n' +
          '예: 표본 2, 4, 9의 표본평균은 $\\frac{2+4+9}{3}=5$, 표본분산은 $\\frac{(-3)^{2}+(-1)^{2}+4^{2}}{3-1}=\\frac{26}{2}=13$입니다.\n\n' +
          '> ⚠️ 모평균 $m$은 하나로 정해진 상수이지만, 표본평균 $\\bar{X}$는 어떤 표본이 뽑히느냐에 따라 값이 달라지는 **확률변수**입니다.',
        easy: '전교생의 평균 키(모평균)는 하나로 정해진 값이지만 우리는 그 값을 모릅니다. 그래서 학생 몇 명을 뽑아 평균 키(표본평균)를 구해 봅니다.\n\n' +
          '그런데 다른 학생들을 뽑으면 표본평균이 조금씩 달라지겠지요. 모평균은 "과녁의 한가운데", 표본평균은 "화살이 맞은 자리"라고 생각하면 됩니다. 화살은 쏠 때마다 다른 곳에 맞습니다.',
        check: {
          type: 'short', check: 'number',
          q: '크기가 4인 표본 3, 5, 7, 9의 표본분산을 구하세요.',
          answer: '20/3',
          wrong: [{ a: '5', why: '편차 제곱의 합 20을 표본의 크기 4로 나누었습니다. 표본분산은 $n-1=3$으로 나눕니다.' }],
          explain: '표본평균은 $\\frac{3+5+7+9}{4}=6$이고, 편차 제곱의 합은 $9+1+1+9=20$입니다. 표본분산은 $\\frac{20}{4-1}=\\frac{20}{3}$입니다.',
        },
      },
      {
        title: '표본평균의 분포',
        body: '모평균이 $m$, 모분산이 $\\sigma^{2}$인 모집단에서 크기가 $n$인 표본을 임의추출할 때, 표본평균 $\\bar{X}$에 대하여\n\n' +
          '$\\mathrm{E}(\\bar{X})=m,\\quad \\mathrm{V}(\\bar{X})=\\dfrac{\\sigma^{2}}{n},\\quad \\sigma(\\bar{X})=\\dfrac{\\sigma}{\\sqrt{n}}$\n\n' +
          '입니다. 표본평균의 평균은 모평균과 같고, 표본의 크기 $n$이 클수록 표본평균은 모평균 근처에 더 촘촘히 모입니다.\n\n' +
          '표본평균의 분포는 다음과 같습니다.\n' +
          '- 모집단이 정규분포 $\\mathrm{N}(m, \\sigma^{2})$을 따르면 $\\bar{X}$는 $n$에 관계없이 정규분포 $\\mathrm{N}\\left(m, \\dfrac{\\sigma^{2}}{n}\\right)$을 따릅니다.\n' +
          '- 모집단이 정규분포가 아니어도 $n$이 충분히 크면 $\\bar{X}$는 근사적으로 정규분포 $\\mathrm{N}\\left(m, \\dfrac{\\sigma^{2}}{n}\\right)$을 따릅니다. 보통 $n\\ge 30$이면 충분히 크다고 봅니다.\n\n' +
          '예: 모집단이 정규분포 $\\mathrm{N}(50, 12^{2})$을 따를 때 크기가 36인 표본의 표본평균은 정규분포 $\\mathrm{N}\\left(50, \\frac{12^{2}}{36}\\right)$, 곧 $\\mathrm{N}(50, 2^{2})$을 따릅니다.\n\n' +
          '> ⚠️ 표준편차는 $n$이 아니라 $\\sqrt{n}$으로 나눕니다. 표본의 크기를 4배로 하면 표본평균의 표준편차는 $\\frac{1}{2}$배가 됩니다.',
        easy: '한 사람의 키는 들쭉날쭉하지만, 100명의 평균 키는 아주 크거나 아주 작게 나오기 어렵습니다. 큰 사람과 작은 사람이 섞여서 서로 상쇄되기 때문입니다.\n\n' +
          '그래서 표본평균은 모평균 $m$을 중심으로, 한 사람의 값보다 훨씬 좁게 모입니다. 그림의 점선은 모집단, 실선은 크기 4인 표본의 표본평균의 분포입니다. 가운데는 같고 폭은 절반($\\frac{\\sigma}{\\sqrt{4}}$)입니다.',
        fig: XBAR_FIG,
        check: {
          type: 'choice',
          q: '모평균이 50, 모표준편차가 10인 모집단에서 크기가 25인 표본을 임의추출할 때, 표본평균 $\\bar{X}$의 표준편차는 무엇입니까?',
          choices: ['2', '10', '0.4', '4'],
          answer: 0,
          why: [
            '',
            '모표준편차를 그대로 썼습니다. 표본평균의 표준편차는 $\\frac{\\sigma}{\\sqrt{n}}$입니다.',
            '$\\sqrt{n}$이 아니라 $n$으로 나누었습니다. $\\frac{10}{\\sqrt{25}}=\\frac{10}{5}$입니다.',
            '분산 $\\mathrm{V}(\\bar{X})=\\frac{100}{25}=4$를 구했습니다. 표준편차는 그 양의 제곱근입니다.',
          ],
          explain: '$\\sigma(\\bar{X})=\\dfrac{\\sigma}{\\sqrt{n}}=\\dfrac{10}{\\sqrt{25}}=2$입니다.',
        },
      },
      {
        title: '표본비율의 분포',
        body: '모집단에서 어떤 특성을 가진 것의 비율을 **모비율**이라 하고 $p$로 나타냅니다. 크기가 $n$인 표본에서 그 특성을 가진 것의 개수를 $X$라고 할 때, $\\hat{p}=\\dfrac{X}{n}$를 **표본비율**이라고 합니다.\n\n' +
          '임의추출이면 $X$는 이항분포 $\\mathrm{B}(n, p)$를 따르므로 ($q=1-p$)\n\n' +
          '$\\mathrm{E}(\\hat{p})=\\dfrac{np}{n}=p,\\quad \\mathrm{V}(\\hat{p})=\\dfrac{1}{n^{2}}\\times npq=\\dfrac{pq}{n},\\quad \\sigma(\\hat{p})=\\sqrt{\\dfrac{pq}{n}}$\n\n' +
          '또 $n$이 충분히 크면 $X$가 근사적으로 정규분포를 따르므로, 표본비율도 근사적으로 정규분포 $\\mathrm{N}\\left(p, \\dfrac{pq}{n}\\right)$를 따릅니다.\n\n' +
          '예: 어느 지역 가구의 20 %가 반려동물을 기른다면($p=0.2$), 400가구를 임의추출할 때 표본비율의 평균은 0.2, 표준편차는 $\\sqrt{\\frac{0.2\\times 0.8}{400}}=\\sqrt{0.0004}=0.02$입니다.\n\n' +
          '> ⚠️ 모비율 $p$는 정해진 상수, 표본비율 $\\hat{p}$의 값은 표본에 따라 달라집니다. 표본비율도 확률변수입니다.',
        easy: '어느 도시에서 새 공원 계획에 찬성하는 시민의 비율(모비율)이 40 %라고 합시다. 시민 10명에게만 물으면 3명(30 %)이나 5명(50 %)이 찬성하는 일이 흔합니다. 하지만 400명에게 물으면 40 % 근처에서 크게 벗어나기 어렵습니다.\n\n' +
          '표본비율은 이항분포의 성공 횟수를 $n$으로 나눈 것이라서 평균은 모비율 $p$, 퍼짐은 $\\sqrt{\\frac{pq}{n}}$입니다. $n$이 커질수록 퍼짐이 작아집니다.',
        check: {
          type: 'short', check: 'number',
          q: '모비율이 0.5인 모집단에서 크기가 100인 표본을 임의추출할 때, 표본비율 $\\hat{p}$의 표준편차를 구하세요.',
          answer: '0.05',
          wrong: [
            { a: '0.0025', why: '분산 $\\frac{pq}{n}=\\frac{0.25}{100}$를 구했습니다. 표준편차는 그 양의 제곱근입니다.' },
            { a: '0.005', why: '$\\sqrt{pq}$를 $n$으로 나누었습니다. $\\sqrt{\\frac{pq}{n}}=\\frac{\\sqrt{0.25}}{\\sqrt{100}}=\\frac{0.5}{10}$입니다.' },
          ],
          explain: '$\\sigma(\\hat{p})=\\sqrt{\\dfrac{0.5\\times 0.5}{100}}=\\sqrt{0.0025}=0.05$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '숫자 2, 4, 6이 하나씩 적힌 카드 3장이 든 주머니에서 카드를 한 장 꺼내 수를 확인하고 다시 넣는 일을 2번 합니다. 꺼낸 두 수의 평균을 $\\bar{X}$라고 할 때, $\\bar{X}$의 확률분포를 구하고 $\\mathrm{E}(\\bar{X})$, $\\mathrm{V}(\\bar{X})$를 모평균·모분산과 비교하세요.',
        steps: [
          '모집단(카드 한 장의 수 $X$)은 2, 4, 6이 각각 $\\frac{1}{3}$이므로 모평균 $m=4$, 모분산 $\\sigma^{2}=\\frac{(2-4)^{2}+0^{2}+(6-4)^{2}}{3}=\\frac{8}{3}$입니다.',
          '크기 2인 표본은 $3^{2}=9$가지이고, 두 수의 평균은 다음과 같습니다.\n\n| $\\bar{X}$ | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|\n| 확률 | $\\frac{1}{9}$ | $\\frac{2}{9}$ | $\\frac{3}{9}$ | $\\frac{2}{9}$ | $\\frac{1}{9}$ |',
          '$\\mathrm{E}(\\bar{X})=\\frac{2\\times 1+3\\times 2+4\\times 3+5\\times 2+6\\times 1}{9}=\\frac{36}{9}=4$ — 모평균과 같습니다.',
          '$\\mathrm{V}(\\bar{X})=\\frac{4\\times 1+1\\times 2+0\\times 3+1\\times 2+4\\times 1}{9}=\\frac{12}{9}=\\frac{4}{3}$ — 모분산 $\\frac{8}{3}$을 표본의 크기 2로 나눈 값과 같습니다.',
        ],
        answer: '$\\mathrm{E}(\\bar{X})=4=m$, $\\mathrm{V}(\\bar{X})=\\frac{4}{3}=\\frac{\\sigma^{2}}{2}$',
      },
      {
        q: '어느 고등학교 학생의 키는 평균 170 cm, 표준편차 8 cm인 정규분포를 따릅니다. 이 학교 학생 16명을 임의추출할 때, 16명의 평균 키가 174 cm 이상일 확률을 구하세요. (단, $\\mathrm{P}(0\\le Z\\le 2)=0.4772$)',
        steps: [
          '표본평균 $\\bar{X}$는 정규분포 $\\mathrm{N}\\left(170, \\frac{8^{2}}{16}\\right)$, 곧 $\\mathrm{N}(170, 2^{2})$을 따릅니다.',
          '표준화하면 $\\mathrm{P}(\\bar{X}\\ge 174)=\\mathrm{P}\\left(Z\\ge\\frac{174-170}{2}\\right)=\\mathrm{P}(Z\\ge 2)$입니다.',
          '$0.5-0.4772=0.0228$',
        ],
        answer: '$0.0228$',
      },
    ],

    terms: [
      { term: '모집단', def: '통계 조사에서 조사하려는 대상 전체입니다.' },
      { term: '표본', def: '모집단에서 뽑은 일부입니다. 표본에 들어 있는 대상의 개수를 표본의 크기라고 합니다.' },
      { term: '전수조사', def: '모집단 전체를 빠짐없이 조사하는 것입니다.' },
      { term: '표본조사', def: '모집단의 일부인 표본만 조사하여 모집단의 성질을 추측하는 것입니다.' },
      { term: '임의추출', def: '모집단의 각 대상이 같은 확률로 뽑히도록 표본을 뽑는 것입니다. 제비뽑기, 난수표, 공학 도구를 씁니다.' },
      { term: '모평균', def: '모집단의 평균으로 $m$으로 나타냅니다. 모분산은 $\\sigma^{2}$, 모표준편차는 $\\sigma$입니다.' },
      { term: '표본평균', def: '표본 $X_{1}, \\cdots, X_{n}$의 평균 $\\bar{X}=\\frac{1}{n}(X_{1}+\\cdots+X_{n})$입니다. 표본에 따라 달라지는 확률변수입니다.' },
      { term: '표본분산', def: '$S^{2}=\\frac{1}{n-1}\\sum_{i=1}^{n}(X_{i}-\\bar{X})^{2}$입니다. $n$이 아니라 $n-1$로 나눕니다.' },
      { term: '모비율', def: '모집단에서 어떤 특성을 가진 것의 비율로 $p$로 나타냅니다.' },
      { term: '표본비율', def: '크기가 $n$인 표본에서 그 특성을 가진 것의 개수가 $X$일 때 $\\hat{p}=\\frac{X}{n}$입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '다음 중 **전수조사**를 하는 것이 알맞은 것은 무엇입니까?',
        choices: [
          '한 학급 학생 전체의 혈액형 조사',
          '어느 공장에서 만든 통조림의 품질 검사',
          '전국 고등학생의 하루 평균 수면 시간 조사',
          '어느 호수에 사는 물고기의 평균 길이 조사',
        ],
        answer: 0,
        why: [
          '',
          '통조림을 검사하려면 뜯어야 하므로 모두 조사하면 팔 것이 남지 않습니다. 표본조사가 알맞습니다.',
          '모집단이 매우 커서 모두 조사하기에 시간과 비용이 너무 많이 듭니다. 표본조사가 알맞습니다.',
          '호수의 물고기를 모두 잡아 재기는 어렵습니다. 일부를 잡아 조사하는 표본조사가 알맞습니다.',
        ],
        explain: '한 학급은 대상이 적어 모두 조사하기 쉽고, 혈액형은 사람마다 정확히 알아야 하는 정보이므로 전수조사가 알맞습니다.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 1,
        q: '크기가 5인 모집단에서 크기가 3인 표본을 복원추출하는 방법의 수는 125이다.',
        answer: true,
        explain: '한 번 뽑을 때마다 5가지씩이고 되돌려 놓으므로 $5^{3}=125$가지입니다. 중복순열의 수입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 2,
        q: '크기가 5인 표본 4, 6, 8, 10, 12의 표본분산을 구하세요.',
        answer: '10',
        wrong: [{ a: '8', why: '편차 제곱의 합 40을 5로 나누었습니다. 표본분산은 $n-1=4$로 나눕니다.' }],
        explain: '표본평균은 $\\frac{40}{5}=8$이고 편차 제곱의 합은 $16+4+0+4+16=40$입니다. 표본분산은 $\\frac{40}{5-1}=10$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', concept: 3,
        q: '모평균이 60, 모표준편차가 12인 모집단에서 크기가 36인 표본을 임의추출할 때, 표본평균 $\\bar{X}$의 분산 $\\mathrm{V}(\\bar{X})$의 값을 구하세요.',
        answer: '4',
        wrong: [
          { a: '2', why: '표준편차 $\\sigma(\\bar{X})=\\frac{12}{6}$를 구했습니다. 분산은 $\\frac{\\sigma^{2}}{n}$입니다.' },
          { a: '1/3', why: '모표준편차를 $n$으로 나누었습니다. 분산은 모분산 $12^{2}=144$를 $n$으로 나눕니다.' },
          { a: '144', why: '모분산을 그대로 썼습니다. 표본평균의 분산은 모분산을 $n$으로 나눕니다.' },
        ],
        explain: '$\\mathrm{V}(\\bar{X})=\\dfrac{\\sigma^{2}}{n}=\\dfrac{144}{36}=4$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'ox', concept: 3,
        q: '표본의 크기를 4배로 늘리면 표본평균의 표준편차는 $\\frac{1}{4}$배가 된다.',
        answer: false,
        explain: '$\\sigma(\\bar{X})=\\frac{\\sigma}{\\sqrt{n}}$이므로 $n$을 4배로 하면 $\\sqrt{4}=2$로 나누어 $\\frac{1}{2}$배가 됩니다. $\\frac{1}{4}$배가 되는 것은 분산입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 4,
        q: '모비율이 0.1인 모집단에서 크기가 900인 표본을 임의추출할 때, 표본비율 $\\hat{p}$의 표준편차를 구하세요.',
        answer: '0.01',
        wrong: [
          { a: '0.0001', why: '분산 $\\frac{pq}{n}$를 구했습니다. 표준편차는 그 양의 제곱근입니다.' },
          { a: '0.1', why: '표본비율의 평균(모비율)을 구했습니다. 표준편차는 $\\sqrt{\\frac{pq}{n}}$입니다.' },
        ],
        explain: '$\\sigma(\\hat{p})=\\sqrt{\\dfrac{0.1\\times 0.9}{900}}=\\sqrt{0.0001}=0.01$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 2,
        q: '모평균과 표본평균에 대한 설명으로 옳은 것은 무엇입니까?',
        choices: [
          '모평균은 상수이고, 표본평균은 확률변수이다.',
          '모평균은 표본을 뽑을 때마다 값이 달라진다.',
          '표본분산은 편차 제곱의 합을 표본의 크기 $n$으로 나눈다.',
          '표본평균은 어떤 표본을 뽑아도 모평균과 같다.',
        ],
        answer: 0,
        why: [
          '',
          '모평균은 모집단 전체의 평균이라 하나로 정해진 값입니다. 달라지는 것은 표본평균입니다.',
          '표본분산은 $n-1$로 나눕니다.',
          '표본평균은 표본에 따라 달라집니다. 같은 것은 표본평균의 **평균** $\\mathrm{E}(\\bar{X})$와 모평균입니다.',
        ],
        explain: '모평균 $m$은 모집단에 대해 하나로 정해진 상수이고, 표본평균 $\\bar{X}$는 뽑힌 표본에 따라 값이 달라지는 확률변수입니다.',
      },
      {
        id: 'p8', level: 1, type: 'choice', concept: 1,
        q: '어느 고등학교 학생 1200명 중 60명을 뽑아 통학 시간을 조사하려고 합니다. 임의추출 방법으로 가장 알맞은 것은 무엇입니까?',
        choices: [
          '전교생에게 번호를 붙이고 공학 도구로 만든 난수 60개의 번호를 뽑는다.',
          '아침에 교문을 가장 먼저 통과한 학생 60명을 차례대로 골라서 뽑는다.',
          '조사에 참여하겠다고 스스로 손을 든 학생 60명을 모두 뽑는다.',
          '학교에서 가장 가까운 동네에 사는 학생 60명을 골라서 뽑는다.',
        ],
        answer: 0,
        why: [
          '',
          '일찍 오는 학생은 학교와 가까이 살 가능성이 커서 통학 시간이 짧은 쪽으로 치우칩니다.',
          '스스로 응답한 학생은 특정한 성향을 가질 수 있어 모든 학생이 같은 확률로 뽑히지 않습니다.',
          '가까운 동네 학생만 뽑으면 통학 시간이 짧은 쪽으로 크게 치우칩니다.',
        ],
        explain: '번호와 난수를 이용하면 1200명 모두가 같은 확률로 뽑히므로 임의추출입니다. 나머지는 통학 시간과 관련된 조건으로 뽑아 표본이 치우칩니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 3,
        q: '모집단이 정규분포 $\\mathrm{N}(100, 20^{2})$을 따릅니다. 이 모집단에서 크기가 25인 표본을 임의추출할 때, 표본평균 $\\bar{X}$에 대하여 $\\mathrm{P}(\\bar{X}\\le 96)$의 값을 구하세요. (단, $\\mathrm{P}(0\\le Z\\le 1)=0.3413$)',
        answer: '0.1587',
        hint: '$\\bar{X}$의 표준편차는 $\\frac{20}{\\sqrt{25}}$입니다.',
        wrong: [
          { a: '0.4207', why: '표본평균의 표준편차 대신 모표준편차 20으로 표준화했습니다. $\\sigma(\\bar{X})=\\frac{20}{5}=4$입니다.' },
          { a: '0.8413', why: '$\\mathrm{P}(\\bar{X}\\ge 96)$을 구했습니다. 부등호 방향을 확인해 보세요.' },
        ],
        explain: '$\\bar{X}$는 정규분포 $\\mathrm{N}\\left(100, \\frac{20^{2}}{25}\\right)=\\mathrm{N}(100, 4^{2})$을 따릅니다.\n\n$\\mathrm{P}(\\bar{X}\\le 96)=\\mathrm{P}\\left(Z\\le\\frac{96-100}{4}\\right)=\\mathrm{P}(Z\\le -1)=0.5-0.3413=0.1587$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 3,
        q: '모집단의 확률분포가 다음 표와 같습니다. 이 모집단에서 크기가 4인 표본을 임의추출할 때, 표본평균 $\\bar{X}$의 분산 $\\mathrm{V}(\\bar{X})$의 값을 구하세요.\n\n| $X$ | 1 | 2 | 3 |\n|---|---|---|---|\n| $\\mathrm{P}(X=x)$ | $\\frac{1}{4}$ | $\\frac{1}{2}$ | $\\frac{1}{4}$ |',
        answer: '1/8',
        hint: '먼저 모평균과 모분산을 구합니다.',
        wrong: [
          { a: '1/2', why: '모분산을 구했습니다. 표본평균의 분산은 모분산을 표본의 크기 4로 나눕니다.' },
          { a: '1/4', why: '모분산을 $\\sqrt{4}=2$로 나누었습니다. 분산은 모분산을 $n=4$로 나눕니다.' },
        ],
        explain: '모평균은 $1\\times\\frac{1}{4}+2\\times\\frac{1}{2}+3\\times\\frac{1}{4}=2$, 모분산은 $(1-2)^{2}\\times\\frac{1}{4}+0+(3-2)^{2}\\times\\frac{1}{4}=\\frac{1}{2}$입니다.\n\n따라서 $\\mathrm{V}(\\bar{X})=\\frac{1}{2}\\div 4=\\frac{1}{8}$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 3,
        q: '모표준편차가 8인 모집단에서 크기가 $n$인 표본을 임의추출합니다. 표본평균의 표준편차가 1 이하가 되게 하는 $n$의 최솟값을 구하세요.',
        answer: '64',
        wrong: [{ a: '8', why: '$\\frac{8}{n}\\le 1$로 풀었습니다. 표본평균의 표준편차는 $\\frac{8}{\\sqrt{n}}$이므로 $\\sqrt{n}\\ge 8$입니다.' }],
        explain: '$\\dfrac{8}{\\sqrt{n}}\\le 1$에서 $\\sqrt{n}\\ge 8$, 곧 $n\\ge 64$이므로 최솟값은 64입니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 4,
        q: '어느 지역 가구의 20 %가 반려동물을 기릅니다. 이 지역에서 400가구를 임의추출할 때, 반려동물을 기르는 가구의 표본비율이 0.23 이상일 확률을 정규분포를 이용하여 어림하세요. (단, $\\mathrm{P}(0\\le Z\\le 1.5)=0.4332$)',
        answer: '0.0668',
        hint: '표본비율은 근사적으로 $\\mathrm{N}\\left(p, \\frac{pq}{n}\\right)$를 따릅니다.',
        wrong: [
          { a: '0.4332', why: '0.2부터 0.23까지의 확률을 구했습니다. 0.23 이상은 오른쪽 꼬리이므로 0.5에서 뺍니다.' },
          { a: '0.9332', why: '0.23 이하일 확률을 구했습니다. 부등호 방향을 확인해 보세요.' },
        ],
        explain: '표본비율의 평균은 0.2, 표준편차는 $\\sqrt{\\frac{0.2\\times 0.8}{400}}=0.02$입니다. 근사적으로 $\\mathrm{N}(0.2, 0.02^{2})$을 따르므로\n\n$\\mathrm{P}\\left(Z\\ge\\frac{0.23-0.2}{0.02}\\right)=\\mathrm{P}(Z\\ge 1.5)=0.5-0.4332=0.0668$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 3,
        q: '숫자 1, 3, 5, 7이 하나씩 적힌 카드 4장이 든 주머니에서 카드를 한 장 꺼내 수를 확인하고 다시 넣는 일을 2번 합니다. 꺼낸 두 수의 평균 $\\bar{X}$에 대하여 $\\mathrm{P}(\\bar{X}=4)$의 값을 구하세요.',
        answer: '1/4',
        hint: '복원추출이므로 $4^{2}=16$가지 경우를 모두 같은 확률로 봅니다.',
        wrong: [{ a: '1/8', why: '(1, 7)과 (7, 1)처럼 순서가 다른 표본을 하나로 셌습니다. 두 번 꺼내는 순서가 다르면 다른 표본입니다.' }],
        explain: '평균이 4이려면 두 수의 합이 8이어야 합니다. (1, 7), (7, 1), (3, 5), (5, 3)의 4가지이므로 $\\mathrm{P}(\\bar{X}=4)=\\frac{4}{16}=\\frac{1}{4}$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 3,
        q: '모집단이 정규분포 $\\mathrm{N}(m, 8^{2})$을 따릅니다. 크기가 16인 표본의 표본평균 $\\bar{X}$에 대하여 $\\mathrm{P}(\\bar{X}\\ge 52)=0.0228$일 때, $m$의 값을 구하세요. (단, $\\mathrm{P}(0\\le Z\\le 2)=0.4772$)',
        answer: '48',
        hint: '$\\bar{X}$의 표준편차는 $\\frac{8}{4}=2$입니다.',
        wrong: [{ a: '36', why: '표본평균의 표준편차 대신 모표준편차 8로 표준화했습니다. $\\sigma(\\bar{X})=\\frac{8}{\\sqrt{16}}=2$입니다.' }],
        explain: '$\\bar{X}$는 $\\mathrm{N}(m, 2^{2})$을 따릅니다. $\\mathrm{P}(Z\\ge 2)=0.5-0.4772=0.0228$이므로 $\\dfrac{52-m}{2}=2$, $m=48$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 3,
        q: '모집단이 정규분포 $\\mathrm{N}(m, 10^{2})$을 따릅니다. 크기가 $n$인 표본의 표본평균 $\\bar{X}$에 대하여 $\\mathrm{P}(|\\bar{X}-m|\\le 2)\\ge 0.9544$가 되게 하는 $n$의 최솟값을 구하세요. (단, $\\mathrm{P}(0\\le Z\\le 2)=0.4772$)',
        answer: '100',
        hint: '$\\mathrm{P}(|Z|\\le 2)=0.9544$입니다.',
        wrong: [{ a: '10', why: '$\\sqrt{n}\\ge 10$에서 멈추었습니다. 구하는 것은 $n$이므로 $n\\ge 100$입니다.' }],
        explain: '$\\bar{X}$는 $\\mathrm{N}\\left(m, \\frac{100}{n}\\right)$을 따르므로 $\\mathrm{P}(|\\bar{X}-m|\\le 2)=\\mathrm{P}\\left(|Z|\\le\\frac{2\\sqrt{n}}{10}\\right)$입니다.\n\n$\\mathrm{P}(|Z|\\le 2)=2\\times 0.4772=0.9544$이므로 $\\frac{2\\sqrt{n}}{10}\\ge 2$, 곧 $\\sqrt{n}\\ge 10$, $n\\ge 100$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 4,
        q: '모비율이 0.5인 모집단에서 크기가 $n$인 표본을 임의추출합니다. 표본비율이 0.55 이상일 확률을 정규분포로 어림한 값이 0.0228일 때, $n$의 값을 구하세요. (단, $\\mathrm{P}(0\\le Z\\le 2)=0.4772$)',
        answer: '400',
        hint: '먼저 표본비율의 표준편차가 얼마여야 하는지 구합니다.',
        wrong: [{ a: '20', why: '$\\sqrt{n}=20$에서 멈추었습니다. $n=400$입니다.' }],
        explain: '$\\mathrm{P}(Z\\ge 2)=0.0228$이므로 $\\dfrac{0.55-0.5}{\\sigma(\\hat{p})}=2$, $\\sigma(\\hat{p})=0.025$입니다.\n\n$\\sqrt{\\frac{0.5\\times 0.5}{n}}=\\frac{0.5}{\\sqrt{n}}=0.025$에서 $\\sqrt{n}=20$, $n=400$입니다.',
      },
    ],

    deeper: [
      {
        title: '표본분산은 왜 n-1로 나눌까?',
        body: '표본의 편차는 모평균 $m$이 아니라 표본평균 $\\bar{X}$를 기준으로 잽니다. 그런데 $\\bar{X}$는 바로 그 표본에서 구한 값이라 표본의 한가운데에 놓이므로, $\\bar{X}$에서 잰 편차 제곱의 합은 $m$에서 잰 것보다 평균적으로 조금 작습니다.\n\n' +
          '계산해 보면 그 합의 평균은 $(n-1)\\sigma^{2}$이 됩니다. 그래서 $n$이 아니라 $n-1$로 나누어야 $\\mathrm{E}(S^{2})=\\sigma^{2}$, 곧 표본분산의 평균이 모분산과 같아집니다. 이처럼 평균이 모수와 같은 성질을 **불편성**이라고 하며, 대학 통계학에서 자세히 다룹니다.',
      },
      {
        title: '중심극한정리',
        body: '모집단이 어떤 모양의 분포이든, 표본의 크기 $n$이 충분히 크면 표본평균 $\\bar{X}$의 분포는 정규분포에 가까워집니다. 이것을 **중심극한정리**라고 합니다.\n\n' +
          '주사위 눈처럼 고르게 퍼진 분포에서 출발해도, 30번 던진 눈의 평균을 여러 번 구해 그 분포를 그려 보면 종 모양이 나타납니다. 정규분포가 통계에서 그토록 자주 쓰이는 이유입니다. 다음 단원에서는 이 성질을 이용하여 표본평균으로 모평균을 추정합니다.',
      },
    ],

    faq: [
      {
        q: '표본이 클수록 무조건 좋은 건가요?',
        a: '표본이 클수록 표본평균의 표준편차 $\\frac{\\sigma}{\\sqrt{n}}$가 작아져 모평균에 더 가까운 값을 얻을 가능성이 큽니다. 하지만 비용과 시간이 늘어나고, 정밀도는 $\\sqrt{n}$에 비례해 천천히 좋아집니다. 무엇보다 **임의추출**이 아니면 표본이 아무리 커도 치우친 결과가 나옵니다.',
      },
      {
        q: '표본분산을 n으로 나누면 틀린 건가요?',
        a: '고등학교 확률과 통계에서는 표본분산을 $n-1$로 나누어 정의합니다. $n$으로 나눈 값은 평균적으로 모분산보다 조금 작게 나오기 때문입니다. 공학 도구에도 두 가지가 모두 있으니, 어느 쪽으로 계산했는지 확인해야 합니다.',
      },
      {
        q: '모집단이 정규분포가 아니면 표본평균으로 확률을 못 구하나요?',
        a: '표본의 크기가 충분히 크면(보통 30 이상) 표본평균은 근사적으로 정규분포 $\\mathrm{N}\\left(m, \\frac{\\sigma^{2}}{n}\\right)$을 따르므로 정규분포로 어림할 수 있습니다.',
      },
    ],

    mistakes: [
      '표본평균의 표준편차를 $\\frac{\\sigma}{n}$로 계산하는 실수 — $\\sigma(\\bar{X})=\\frac{\\sigma}{\\sqrt{n}}$이고, $n$으로 나누는 것은 분산 $\\frac{\\sigma^{2}}{n}$입니다.',
      '표본평균의 확률을 구하면서 모표준편차 $\\sigma$로 표준화하는 실수 — $\\bar{X}$는 $\\frac{\\sigma}{\\sqrt{n}}$로 표준화합니다.',
      '표본분산을 $n$으로 나누는 실수 — 표본분산은 $n-1$로 나눕니다.',
    ],

    gens: [
      {
        id: 'xbar-moments',
        level: 1,
        title: '표본평균의 평균·분산·표준편차',
        make: function (R) {
          var m = R.int(4, 40) * 5;
          var rn = R.pick([2, 3, 4, 5, 6, 8, 10]);
          var n = rn * rn;
          var ask = R.pick(['E', 'V', 'S']);
          var sd = ask === 'S' ? rn * R.int(1, 6) : R.int(2, 15);
          var V = R.F(sd * sd, n), S = R.F(sd, rn);
          var q = '모평균이 ' + m + ', 모표준편차가 ' + sd + '인 모집단에서 크기가 ' + n + '인 표본을 임의추출할 때, 표본평균 $\\bar{X}$의 ';
          var ans, wl, ex;
          if (ask === 'E') {
            ans = R.F(m, 1);
            q += '평균 $\\mathrm{E}(\\bar{X})$의 값을 구하세요.';
            wl = [[R.F(m, n), '모평균을 표본의 크기로 나누었습니다. 표본평균의 평균은 모평균과 같습니다.']];
            ex = '$\\mathrm{E}(\\bar{X})=m=' + m + '$입니다. 표본평균의 평균은 표본의 크기와 관계없이 모평균과 같습니다.';
          } else if (ask === 'V') {
            ans = V;
            q += '분산 $\\mathrm{V}(\\bar{X})$의 값을 구하세요.';
            wl = [[S, '표준편차 $\\frac{\\sigma}{\\sqrt{n}}$를 구했습니다. 분산은 $\\frac{\\sigma^{2}}{n}$입니다.'], [R.F(sd, n), '모표준편차를 $n$으로 나누었습니다. 분산은 모분산 $' + sd + '^{2}=' + (sd * sd) + '$' + R.josa(sd * sd, '을/를') + ' $n$으로 나눕니다.'], [R.F(sd * sd, 1), '모분산을 그대로 썼습니다. 표본평균의 분산은 모분산을 $n$으로 나눕니다.']];
            ex = '$\\mathrm{V}(\\bar{X})=\\dfrac{\\sigma^{2}}{n}=\\dfrac{' + (sd * sd) + '}{' + n + '}' + (V.num === sd * sd && V.den === n ? '' : '=' + V.toTex()) + '$입니다.';
          } else {
            ans = S;
            q += '표준편차 $\\sigma(\\bar{X})$의 값을 구하세요.';
            wl = [[V, '분산 $\\frac{\\sigma^{2}}{n}$을 구했습니다. 표준편차는 $\\frac{\\sigma}{\\sqrt{n}}$입니다.'], [R.F(sd, n), '$\\sqrt{n}$이 아니라 $n$으로 나누었습니다.'], [R.F(sd, 1), '모표준편차를 그대로 썼습니다. 표본평균의 표준편차는 $\\frac{\\sigma}{\\sqrt{n}}$입니다.']];
            ex = '$\\sigma(\\bar{X})=\\dfrac{\\sigma}{\\sqrt{n}}=\\dfrac{' + sd + '}{\\sqrt{' + n + '}}=\\dfrac{' + sd + '}{' + rn + '}=' + S.toTex() + '$입니다.';
          }
          return {
            type: 'short', check: 'number', concept: 3,
            q: q,
            answer: ans.toString(),
            wrong: W(ans, wl),
            explain: ex,
          };
        },
      },
      {
        id: 'sample-variance',
        level: 1,
        title: '표본평균과 표본분산 구하기',
        make: function (R) {
          var n = R.int(3, 5);
          var xs, sum;
          for (var tries = 0; ; tries++) {
            xs = [];
            for (var i = 0; i < n; i++) xs.push(R.int(1, 15));
            sum = xs.reduce(function (a, b) { return a + b; }, 0);
            var distinct = xs.filter(function (v, j) { return xs.indexOf(v) === j; }).length;
            if ((sum % n === 0 && distinct >= 2) || tries > 60) break;
          }
          if (sum % n !== 0) { xs[n - 1] += n - (sum % n); sum = xs.reduce(function (a, b) { return a + b; }, 0); }
          var mean = sum / n;
          var ss = 0, parts = [];
          xs.forEach(function (v) { var d = v - mean; ss += d * d; parts.push(d < 0 ? '(' + d + ')^{2}' : d + '^{2}'); });
          var S2 = R.F(ss, n - 1);
          return {
            type: 'short', check: 'number', concept: 2,
            q: '크기가 ' + n + '인 표본 ' + xs.join(', ') + '의 표본분산을 구하세요.',
            answer: S2.toString(),
            hint: '표본평균을 먼저 구하고, 편차 제곱의 합을 $n-1$로 나눕니다.',
            wrong: W(S2, [[R.F(ss, n), '편차 제곱의 합 ' + ss + R.josa(ss, '을/를') + ' 표본의 크기 ' + n + R.josa(n, '으로/로') + ' 나누었습니다. 표본분산은 $n-1=' + (n - 1) + '$' + R.josa(n - 1, '으로/로') + ' 나눕니다.'], [R.F(ss, 1), '편차 제곱의 합에서 멈추었습니다. $n-1$로 나눕니다.']]),
            explain: '표본평균은 $\\frac{' + sum + '}{' + n + '}=' + mean + '$입니다. 편차 제곱의 합은 $' + parts.join('+') + '=' + ss + '$이므로 표본분산은 $\\dfrac{' + ss + '}{' + n + '-1}=' + S2.toTex() + '$입니다.',
          };
        },
      },
      {
        id: 'xbar-prob',
        level: 2,
        title: '표본평균의 분포로 확률 구하기',
        make: function (R) {
          var rn = R.pick([2, 3, 4, 5, 6, 10]);
          var n = rn * rn;
          var sdx = R.pick([1, 2, 3, 4, 5]); // 표본평균의 표준편차
          var sd = sdx * rn;
          var m = R.int(10, 60) * 5;
          var row = R.pick(ZT);
          var sign = R.sign();
          var kind = R.pick(['ge', 'le']);
          var c = m + sign * row.z * sdx;
          var res = tail(kind, sign, row);
          var cTex = String(c);
          var op = kind === 'ge' ? '\\ge' : '\\le';
          var zT = (sign < 0 ? '-' : '') + row.s;
          var wl = res.wr.slice();
          // 모표준편차로 표준화한 실수 (그때 z 가 표에 있으면 그 꼬리 값)
          var zWrong = row.z * sdx / sd;
          ZT.forEach(function (r) { if (r.z === zWrong) wl.push([tail(kind, sign, r).v, '표본평균의 표준편차 $\\frac{\\sigma}{\\sqrt{n}}=' + sdx + '$ 대신 모표준편차 ' + sd + R.josa(sd, '으로/로') + ' 표준화했습니다.']); });
          var ctxs = ['모집단이 정규분포 $\\mathrm{N}(' + m + ', ' + sd + '^{2})$을 따릅니다. 이 모집단에서 크기가 ' + n + '인 표본을 임의추출할 때, 표본평균 $\\bar{X}$에 대하여 $\\mathrm{P}(\\bar{X}' + op + ' ' + cTex + ')$의 값을 구하세요.'];
          // 귤 무게는 표준편차가 평균의 5분의 1 이하일 때만 (평균 60 g 에 표준편차 50 g 같은 어색한 수 피하기)
          if (sd * 5 <= m) ctxs.push('어느 과수원에서 수확한 귤 한 개의 무게는 평균 ' + m + ' g, 표준편차 ' + sd + ' g인 정규분포를 따릅니다. 귤 ' + n + '개를 임의추출할 때, 그 평균 무게가 ' + cTex + ' g ' + (kind === 'ge' ? '이상' : '이하') + '일 확률을 구하세요.');
          var ctx = R.pick(ctxs);
          return {
            type: 'short', check: 'number', concept: 3,
            q: ctx + '\n\n' + table([row]),
            answer: d4(res.v),
            hint: '표본평균의 표준편차는 $\\frac{\\sigma}{\\sqrt{n}}$입니다.',
            wrong: W4(res.v, wl),
            explain: '$\\bar{X}$는 정규분포 $\\mathrm{N}\\left(' + m + ', \\frac{' + sd + '^{2}}{' + n + '}\\right)=\\mathrm{N}(' + m + ', ' + sdx + '^{2})$을 따릅니다.\n\n' +
              '$\\mathrm{P}(\\bar{X}' + op + ' ' + cTex + ')=\\mathrm{P}\\left(Z' + op + '\\frac{' + cTex + '-' + m + '}{' + sdx + '}\\right)=\\mathrm{P}(Z' + op + ' ' + zT + ')=' + res.how + '=' + d4(res.v) + '$입니다.',
          };
        },
      },
      {
        id: 'phat-dist',
        level: 2,
        title: '표본비율의 분포',
        make: function (R) {
          // 모비율 p(×100), √(pq)(×100), 표본의 크기의 제곱근
          var pc = R.pick([[10, 30], [90, 30], [20, 40], [80, 40], [50, 50]]);
          var cands = [];
          [10, 20, 30, 40, 50].forEach(function (rn) {
            var sig = pc[1] * 100 / rn; // σ(p̂) × 10000
            if (sig === Math.round(sig)) cands.push([rn, sig]);
          });
          var cc = R.pick(cands), rn = cc[0], sig = cc[1], n = rn * rn;
          var p = pc[0] / 100, pTex = String(p), qTex = String((100 - pc[0]) / 100);
          var askProb = R.bool();
          var sigTex = String(sig / 10000);
          if (!askProb) {
            var ans = sig / 10000;
            var varTex = String(Math.round(sig * sig) / 1e8);
            return {
              type: 'short', check: 'number', concept: 4,
              q: '모비율이 ' + pTex + '인 모집단에서 크기가 ' + n + '인 표본을 임의추출할 때, 표본비율 $\\hat{p}$의 표준편차를 구하세요.',
              answer: sigTex,
              wrong: [
                { a: varTex, why: '분산 $\\frac{pq}{n}$를 구했습니다. 표준편차는 그 양의 제곱근입니다.' },
                { a: pTex, why: '표본비율의 평균(모비율)을 구했습니다. 표준편차는 $\\sqrt{\\frac{pq}{n}}$입니다.' },
              ].filter(function (w) { return Number(w.a) !== ans; }),
              explain: '$\\sigma(\\hat{p})=\\sqrt{\\dfrac{' + pTex + '\\times ' + qTex + '}{' + n + '}}=\\dfrac{' + (pc[1] / 100) + '}{' + rn + '}=' + sigTex + '$입니다.',
            };
          }
          var rows = ZT.filter(function (r) { return (r.z * sig) === Math.round(r.z * sig); });
          var row = R.pick(rows);
          var sign = R.sign();
          var kind = R.pick(['ge', 'le']);
          var c = (pc[0] * 100 + sign * row.z * sig) / 10000;
          var cTex = String(Math.round(c * 10000) / 10000);
          var res = tail(kind, sign, row);
          var zT = (sign < 0 ? '-' : '') + row.s;
          var op = kind === 'ge' ? '\\ge' : '\\le';
          return {
            type: 'short', check: 'number', concept: 4,
            q: '모비율이 ' + pTex + '인 모집단에서 크기가 ' + n + '인 표본을 임의추출합니다. 표본비율 $\\hat{p}$에 대하여 $\\mathrm{P}(\\hat{p}' + op + ' ' + cTex + ')$의 값을 정규분포를 이용하여 어림하세요.\n\n' + table([row]),
            answer: d4(res.v),
            hint: '표본비율은 근사적으로 $\\mathrm{N}\\left(p, \\frac{pq}{n}\\right)$를 따릅니다.',
            wrong: W4(res.v, res.wr),
            explain: '표본비율의 평균은 ' + pTex + ', 표준편차는 $\\sqrt{\\dfrac{' + pTex + '\\times ' + qTex + '}{' + n + '}}=' + sigTex + '$입니다.\n\n' +
              '$\\mathrm{P}(\\hat{p}' + op + ' ' + cTex + ')\\approx\\mathrm{P}\\left(Z' + op + '\\frac{' + cTex + '-' + pTex + '}{' + sigTex + '}\\right)=\\mathrm{P}(Z' + op + ' ' + zT + ')=' + res.how + '=' + d4(res.v) + '$입니다.',
          };
        },
      },
    ],
  });
})();
