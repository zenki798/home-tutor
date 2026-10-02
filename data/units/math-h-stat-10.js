/* 확률과 통계 · 정규분포
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 표준정규분포표 값(P(0≤Z≤z), 소수 넷째 자리)은 문제마다 함께 준다. 연속성 수정은 쓰지 않는다(고등 교과 범위 밖).
 * 표본평균의 분포·추정(다음 단원)은 풀이에 쓰지 않는다. */
(function () {
  function r1(v) { var t = Math.round(v * 10) / 10; return t === 0 ? 0 : t; }
  function txt(x, y, s, size, anchor) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '" text-anchor="' + (anchor || 'middle') + '" fill="currentColor">' + s + '</text>';
  }
  // 정규분포 곡선 그림. 가로는 표준화한 값 z(-4~4), 곡선 높이는 1/σ 에 비례
  // o: { curves: [{ m, s, dash?, label? }], shade: [[a, b], …](첫 곡선 아래), marks: [{ z, label }], alt }
  function normSvg(o) {
    var X0 = 150, U = 34, Y0 = 128, H = 78;
    var curves = o.curves || [{ m: 0, s: 1 }];
    function px(z) { return X0 + z * U; }
    function py(c, z) { return Y0 - (H / c.s) * Math.exp(-(z - c.m) * (z - c.m) / (2 * c.s * c.s)); }
    function pts(c, a, b) {
      var out = [], n = Math.max(2, Math.round((b - a) / 0.08));
      for (var i = 0; i <= n; i++) { var z = a + (b - a) * i / n; out.push(r1(px(z)) + ',' + r1(py(c, z))); }
      return out;
    }
    var s = '';
    (o.shade || []).forEach(function (iv) {
      var a = Math.max(iv[0], -4), b = Math.min(iv[1], 4);
      s += '<polygon points="' + r1(px(a)) + ',' + Y0 + ' ' + pts(curves[0], a, b).join(' ') + ' ' + r1(px(b)) + ',' + Y0 + '" fill="var(--fig-2)" fill-opacity="0.5" stroke="none"/>';
    });
    s += '<line x1="8" y1="' + Y0 + '" x2="292" y2="' + Y0 + '" stroke="currentColor" stroke-width="1.2"/>';
    curves.forEach(function (c, i) {
      s += '<polyline points="' + pts(c, -4, 4).join(' ') + '" fill="none" stroke="' + (i === 0 ? 'currentColor' : 'var(--fig-1)') + '" stroke-width="1.8"' + (c.dash ? ' stroke-dasharray="5 4"' : '') + '/>';
      if (c.label) s += txt(px(c.m) + (c.lx || 0), py(c, c.m) - 6, c.label, 13);
    });
    (o.marks || []).forEach(function (mk) {
      var c = curves[0];
      s += '<line x1="' + r1(px(mk.z)) + '" y1="' + r1(py(c, mk.z)) + '" x2="' + r1(px(mk.z)) + '" y2="' + (Y0 + 4) + '" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>';
      s += txt(px(mk.z), Y0 + 17, mk.label, 12);
    });
    return { type: 'svg', alt: o.alt, svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">' + s + '</svg>' };
  }
  // 확률밀도함수 y = k x (0 ≤ x ≤ 2) 그림, [a, b] 를 색칠
  function pdfSvg(o) {
    function px(x) { return 50 + x * 100; }
    function py(y) { return 130 - y * 100; }
    var s = '';
    if (o.shade) {
      var a = o.shade[0], b = o.shade[1];
      s += '<polygon points="' + px(a) + ',' + py(0) + ' ' + px(a) + ',' + py(a / 2) + ' ' + px(b) + ',' + py(b / 2) + ' ' + px(b) + ',' + py(0) + '" fill="var(--fig-2)" fill-opacity="0.5" stroke="none"/>';
    }
    s += '<line x1="30" y1="130" x2="290" y2="130" stroke="currentColor" stroke-width="1.2"/>';
    s += '<line x1="50" y1="140" x2="50" y2="12" stroke="currentColor" stroke-width="1.2"/>';
    s += '<line x1="' + px(0) + '" y1="' + py(0) + '" x2="' + px(2) + '" y2="' + py(1) + '" stroke="currentColor" stroke-width="2"/>';
    s += '<line x1="' + px(2) + '" y1="' + py(0) + '" x2="' + px(2) + '" y2="' + py(1) + '" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3"/>';
    s += '<line x1="50" y1="' + py(1) + '" x2="' + px(2) + '" y2="' + py(1) + '" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3"/>';
    s += txt(px(1), 146, '1') + txt(px(2), 146, '2') + txt(44, 146, 'O', 12, 'end') + txt(282, 146, 'x') + txt(56, 18, 'y', 12, 'start');
    s += txt(44, py(1) + 4, o.top, 12, 'end') + txt(px(1.55), py(1) - 2, o.label, 12, 'end');
    return { type: 'svg', alt: o.alt, svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 155">' + s + '</svg>' };
  }
  // 이항분포 B(16, 1/2) 막대와 정규분포 N(8, 2²) 곡선
  var BIN_FIG = (function () {
    var n = 16, s = '', c = 1, tot = 65536;
    function px(k) { return 22 + k * 16; }
    function py(v) { return 130 - v * 540; }
    for (var k = 0; k <= n; k++) {
      var pr = c / tot;
      s += '<rect x="' + r1(px(k) - 7) + '" y="' + r1(py(pr)) + '" width="14" height="' + r1(130 - py(pr)) + '" fill="var(--fig-2)" fill-opacity="0.6" stroke="currentColor" stroke-width="0.6"/>';
      if (k % 2 === 0) s += txt(px(k), 145, String(k), 11);
      c = c * (n - k) / (k + 1);
    }
    var pts = [];
    for (var x = 0; x <= 16.001; x += 0.2) pts.push(r1(px(x)) + ',' + r1(py(Math.exp(-(x - 8) * (x - 8) / 8) / (2 * Math.sqrt(2 * Math.PI)))));
    s += '<line x1="8" y1="130" x2="292" y2="130" stroke="currentColor" stroke-width="1.2"/>';
    s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="var(--fig-1)" stroke-width="2"/>';
    return { type: 'svg', alt: '이항분포 B(16, 1/2)의 확률을 나타낸 막대들과, 평균 8, 표준편차 2인 정규분포 곡선을 겹쳐 그린 그림. 막대의 윗부분이 곡선과 거의 일치한다', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 152">' + s + '</svg>' };
  })();

  // 표준정규분포표: P(0 ≤ Z ≤ z) 의 값 × 10000
  var ZT = [
    { z: 0.5, s: '0.5', h: '0.5', t: 1915 },
    { z: 1, s: '1', h: '1.0', t: 3413 },
    { z: 1.5, s: '1.5', h: '1.5', t: 4332 },
    { z: 2, s: '2', h: '2.0', t: 4772 },
    { z: 2.5, s: '2.5', h: '2.5', t: 4938 },
    { z: 3, s: '3', h: '3.0', t: 4987 },
  ];
  function d4(v) { return (v / 10000).toFixed(4); }
  function table(rows) {
    rows = rows.slice().sort(function (a, b) { return a.z - b.z; }).filter(function (r, i, arr) { return i === 0 || arr[i - 1].z !== r.z; });
    return '| $z$ | ' + rows.map(function (r) { return r.h; }).join(' | ') + ' |\n|---|' + rows.map(function () { return '---|'; }).join('') +
      '\n| $\\mathrm{P}(0\\le Z\\le z)$ | ' + rows.map(function (r) { return d4(r.t); }).join(' | ') + ' |';
  }
  // 틀린 답: 정답과 같거나 겹치거나 범위(0~1) 밖이면 뺀다
  function W(ans, list) {
    var seen = [ans], out = [];
    list.forEach(function (w) {
      if (w[0] <= 0 || w[0] >= 10000 || seen.indexOf(w[0]) >= 0) return;
      seen.push(w[0]);
      out.push({ a: d4(w[0]), why: w[1] });
    });
    return out;
  }
  // 수 글자 뒤 조사 (끝 숫자의 읽는 소리: 0·1·3·6·7·8 은 받침 있음)
  function jo(numStr, pair) { var p = pair.split('/'); return '013678'.indexOf(numStr.charAt(numStr.length - 1)) >= 0 ? p[0] : p[1]; }
  // Z 의 구간 확률 (×10000) 과 풀이 한 줄. kind: 'ge'(Z≥a) 'le'(Z≤a) 'between'(a≤Z≤b)
  function zProb(kind, a, b) {
    var ta = a ? a.t : 0, tb = b ? b.t : 0;
    if (kind === 'ge') {
      if (a.sign > 0) return { v: 5000 - ta, how: '0.5-' + d4(ta), wr: [[ta, '0부터 ' + a.s + '까지의 넓이를 구했습니다. $Z\\ge ' + a.s + '$인 오른쪽 꼬리는 0.5에서 뺍니다.'], [5000 + ta, '왼쪽 부분의 넓이를 구했습니다. 부등호 방향을 다시 확인해 보세요.']] };
      return { v: 5000 + ta, how: d4(ta) + '+0.5', wr: [[5000 - ta, '$Z\\ge -' + a.s + '$' + jo(a.s, '은/는') + ' 0의 왼쪽 일부와 오른쪽 전체(0.5)를 합한 넓이입니다. 0.5에서 빼지 않고 더합니다.'], [ta, '$-' + a.s + '$부터 0까지의 넓이만 구했습니다. 0의 오른쪽 절반 0.5도 더합니다.']] };
    }
    if (kind === 'le') {
      if (a.sign > 0) return { v: 5000 + ta, how: '0.5+' + d4(ta), wr: [[ta, '0부터 ' + a.s + '까지의 넓이만 구했습니다. 0의 왼쪽 절반 0.5도 더합니다.'], [5000 - ta, '오른쪽 꼬리의 넓이를 구했습니다. $Z\\le ' + a.s + '$' + jo(a.s, '은/는') + ' 왼쪽 부분입니다.']] };
      return { v: 5000 - ta, how: '0.5-' + d4(ta), wr: [[ta, '$-' + a.s + '$부터 0까지의 넓이를 구했습니다. 왼쪽 꼬리는 0.5에서 그 넓이를 뺍니다.'], [5000 + ta, '대칭을 잘못 썼습니다. $Z\\le -' + a.s + '$' + jo(a.s, '은/는') + ' $Z\\ge ' + a.s + '$' + jo(a.s, '과/와') + ' 넓이가 같은 꼬리입니다.']] };
    }
    // between: a ≤ Z ≤ b (a 는 sign 을 가진다)
    if (a.sign < 0 && b.sign > 0) return { v: ta + tb, how: d4(ta) + '+' + d4(tb), wr: [[Math.abs(tb - ta), '0을 사이에 둔 구간인데 두 넓이를 뺐습니다. 0의 양쪽 넓이를 더합니다.'], [10000 - ta - tb, '구간 바깥의 넓이를 구했습니다.']] };
    var big = Math.max(ta, tb), small = Math.min(ta, tb);
    return { v: big - small, how: d4(big) + '-' + d4(small), wr: [[ta + tb, '두 끝이 모두 0의 같은 쪽에 있는데 넓이를 더했습니다. 큰 넓이에서 작은 넓이를 뺍니다.'], [big, '0부터 먼 끝까지의 넓이만 구했습니다. 가까운 끝까지의 넓이를 뺍니다.']] };
  }
  function zTex(r) { return (r.sign < 0 ? '-' : '') + r.s; }
  function zOf(r) { return r.sign * r.z; }
  function signed(R, row) { return { z: row.z, s: row.s, h: row.h, t: row.t, sign: R.sign() }; }

  Tutor.registerUnit({
    id: 'math-h-stat-10',
    course: 'math-h-stat',
    title: '정규분포',
    summary: '연속확률변수와 확률밀도함수의 뜻을 알고, 정규분포를 표준화하여 표준정규분포표로 확률을 구합니다. 시행 횟수가 클 때 이항분포를 정규분포로 어림하는 방법도 배웁니다.',
    goals: [
      '연속확률변수와 확률밀도함수의 뜻을 알고, 넓이로 확률을 구할 수 있다.',
      '정규분포 곡선의 성질을 이해하고, 평균과 표준편차에 따른 곡선의 변화를 설명할 수 있다.',
      '정규분포를 표준화하고 표준정규분포표를 이용하여 확률을 구할 수 있다.',
      '$n$이 충분히 클 때 이항분포의 확률을 정규분포로 어림할 수 있다.',
    ],
    standards: ['[12확통03-04]'],

    concepts: [
      {
        title: '연속확률변수와 확률밀도함수',
        body: '키, 무게, 시간처럼 어떤 범위의 **모든 실수 값**을 가질 수 있는 확률변수를 **연속확률변수**라고 합니다.\n\n' +
          '연속확률변수 $X$가 $\\alpha\\le X\\le\\beta$의 값을 가질 때, 다음을 만족시키는 함수 $f(x)$를 $X$의 **확률밀도함수**라고 합니다.\n\n' +
          '1. $\\alpha\\le x\\le\\beta$에서 $f(x)\\ge 0$\n' +
          '2. $y=f(x)$의 그래프와 $x$축 및 두 직선 $x=\\alpha$, $x=\\beta$로 둘러싸인 부분의 넓이는 1\n' +
          '3. $\\mathrm{P}(a\\le X\\le b)$는 $y=f(x)$의 그래프와 $x$축 및 두 직선 $x=a$, $x=b$로 둘러싸인 부분의 넓이 ($\\alpha\\le a\\le b\\le\\beta$)\n\n' +
          '미적분Ⅰ에서 배운 정적분으로 쓰면 $\\mathrm{P}(a\\le X\\le b)=\\int_{a}^{b}f(x)\\,dx$입니다.\n\n' +
          '한 점 위에는 넓이가 없으므로 $\\mathrm{P}(X=a)=0$입니다. 그래서 $\\mathrm{P}(a\\le X\\le b)=\\mathrm{P}(a<X<b)$처럼 등호가 있든 없든 확률이 같습니다.\n\n' +
          '예: $0\\le x\\le 2$에서 $f(x)=\\frac{1}{2}x$이면 전체 넓이가 $\\frac{1}{2}\\times 2\\times 1=1$이고, $\\mathrm{P}(0\\le X\\le 1)=\\frac{1}{2}\\times 1\\times\\frac{1}{2}=\\frac{1}{4}$입니다.',
        easy: '연속확률변수는 "정확히 얼마"가 아니라 "어느 범위"로 확률을 말합니다. 키가 정확히 170.000…cm일 확률은 0이지만, 169.5 cm와 170.5 cm 사이일 확률은 의미가 있지요.\n\n' +
          '그래서 확률을 막대의 높이 대신 **그래프 아래의 넓이**로 나타냅니다. 전체 넓이를 1로 정해 두고, 알고 싶은 구간의 넓이를 재면 그것이 확률입니다. 그림에서 색칠한 삼각형의 넓이 $\\frac{1}{4}$이 $\\mathrm{P}(0\\le X\\le 1)$입니다.',
        fig: pdfSvg({ shade: [0, 1], top: '1', label: 'y=f(x)', alt: '0에서 2까지 y=x/2 인 확률밀도함수 그래프. x=2에서 높이 1. 0부터 1까지의 아래 부분(삼각형)이 색칠되어 있다' }),
        check: {
          type: 'ox',
          q: '연속확률변수 $X$의 확률밀도함수가 $f(x)$일 때, $\\mathrm{P}(X=1)=f(1)$이다.',
          answer: false,
          explain: '연속확률변수에서 확률은 넓이입니다. 한 점 $x=1$ 위의 넓이는 0이므로 $\\mathrm{P}(X=1)=0$입니다. $f(1)$은 그래프의 높이일 뿐 확률이 아닙니다.',
        },
      },
      {
        title: '정규분포와 정규분포 곡선',
        body: '측정한 자료(키, 제품의 무게, 측정 오차 등)는 평균 근처에 많이 모이고 평균에서 멀어질수록 드물어지는 **종 모양**의 분포를 보이는 경우가 많습니다. 이런 분포를 수학적으로 나타낸 것이 **정규분포**입니다.\n\n' +
          '연속확률변수 $X$의 확률밀도함수의 그래프가 평균 $m$, 표준편차 $\\sigma$로 정해지는 종 모양 곡선(**정규분포 곡선**)일 때, $X$는 **정규분포** $\\mathrm{N}(m, \\sigma^{2})$을 따른다고 합니다.\n\n' +
          '정규분포 곡선의 성질은 다음과 같습니다.\n' +
          '- 직선 $x=m$에 대하여 대칭이고, $x=m$일 때 가장 높습니다.\n' +
          '- 곡선과 $x$축 사이의 넓이는 1입니다. 곡선은 양쪽으로 $x$축에 한없이 가까워집니다.\n' +
          '- $\\sigma$가 같고 $m$만 바뀌면 모양은 그대로이고 좌우로 평행이동합니다.\n' +
          '- $m$이 같을 때 $\\sigma$가 클수록 가운데가 낮아지고 옆으로 퍼지며, $\\sigma$가 작을수록 높고 좁아집니다.\n\n' +
          '> ⚠️ $\\mathrm{N}(m, \\sigma^{2})$의 두 번째 자리는 표준편차가 아니라 **분산**입니다. $\\mathrm{N}(50, 16)$이면 표준편차는 4입니다.',
        easy: '학생들을 키별로 모아 인원수를 막대로 그리면, 평균 키 근처가 가장 많고 아주 크거나 작은 쪽은 적어서 가운데가 볼록한 **종 모양**이 됩니다.\n\n' +
          '정규분포는 이 종 모양을 매끈한 곡선으로 그린 것입니다. 종의 **가운데 위치**가 평균 $m$, 종이 **퍼진 정도**가 표준편차 $\\sigma$입니다. 그림의 실선과 점선은 평균이 같고 점선의 표준편차가 더 큰 경우입니다. 전체 넓이가 1로 같아야 하니, 옆으로 퍼진 쪽은 키가 낮아집니다.',
        fig: normSvg({ curves: [{ m: 0, s: 1 }, { m: 0, s: 1.7, dash: true }], marks: [{ z: 0, label: 'm' }], alt: '평균 m이 같은 두 정규분포 곡선. 실선은 좁고 높으며, 점선은 표준편차가 커서 낮고 넓게 퍼져 있다' }),
        check: {
          type: 'choice',
          q: '정규분포 $\\mathrm{N}(m, \\sigma^{2})$의 곡선에 대한 설명으로 옳은 것은 무엇입니까?',
          choices: [
            '$\\sigma$가 커지면 곡선의 가운데가 낮아지고 옆으로 퍼진다.',
            '$\\sigma$는 그대로이고 $m$이 커지면 곡선이 높아진다.',
            '곡선은 언제나 직선 $x=0$에 대하여 대칭이다.',
          ],
          answer: 0,
          why: [
            '',
            '$m$이 바뀌면 곡선은 모양 그대로 좌우로 평행이동합니다. 높이를 정하는 것은 $\\sigma$입니다.',
            '대칭축은 직선 $x=m$입니다. $m=0$일 때만 직선 $x=0$에 대하여 대칭입니다.',
          ],
          explain: '곡선 아래 넓이는 늘 1이므로, $\\sigma$가 커서 옆으로 퍼지면 가운데는 낮아집니다. $m$은 곡선의 대칭축 위치를 정합니다.',
        },
      },
      {
        title: '표준정규분포와 표준화',
        body: '평균이 0, 표준편차가 1인 정규분포 $\\mathrm{N}(0, 1)$을 **표준정규분포**라 하고, 이를 따르는 확률변수를 보통 $Z$로 나타냅니다.\n\n' +
          '확률변수 $X$가 정규분포 $\\mathrm{N}(m, \\sigma^{2})$을 따를 때\n\n' +
          '$Z=\\dfrac{X-m}{\\sigma}$\n\n' +
          '로 놓으면 $Z$는 표준정규분포 $\\mathrm{N}(0, 1)$을 따릅니다. 이렇게 바꾸는 것을 **표준화**라고 합니다. 앞 단원의 성질로 확인하면 $\\mathrm{E}(Z)=\\frac{\\mathrm{E}(X)-m}{\\sigma}=0$, $\\mathrm{V}(Z)=\\frac{\\mathrm{V}(X)}{\\sigma^{2}}=1$입니다.\n\n' +
          '따라서 $\\mathrm{P}(a\\le X\\le b)=\\mathrm{P}\\left(\\dfrac{a-m}{\\sigma}\\le Z\\le\\dfrac{b-m}{\\sigma}\\right)$\n\n' +
          '예: $X$가 정규분포 $\\mathrm{N}(60, 5^{2})$을 따르면 $\\mathrm{P}(55\\le X\\le 70)=\\mathrm{P}(-1\\le Z\\le 2)$입니다.\n\n' +
          '> 💡 $Z$의 값은 "평균에서 표준편차의 몇 배만큼 떨어져 있는가"를 나타냅니다. $Z=2$이면 평균보다 표준편차 2개만큼 큰 값, $Z=-1$이면 표준편차 1개만큼 작은 값입니다.',
        easy: '국어 시험은 평균 70점, 표준편차 5점이고 수학 시험은 평균 65점, 표준편차 10점이라고 합시다. 두 과목 모두 80점을 받았다면 어느 쪽을 더 잘 본 걸까요?\n\n' +
          '국어는 평균보다 10점, 곧 표준편차 $10\\div 5=2$개만큼 높고, 수학은 평균보다 15점, 곧 표준편차 $15\\div 10=1.5$개만큼 높습니다. 그래서 국어를 상대적으로 더 잘 본 것입니다. 이렇게 "표준편차 몇 개만큼"으로 바꾸는 것이 표준화입니다.',
        check: {
          type: 'short', check: 'number',
          q: '확률변수 $X$가 정규분포 $\\mathrm{N}(50, 4^{2})$을 따를 때, $X=58$을 표준화한 $Z$의 값을 구하세요.',
          answer: '2',
          wrong: [
            { a: '8', why: '평균을 빼기만 했습니다. 그 차를 표준편차 4로 나눕니다.' },
            { a: '0.5', why: '분산 16으로 나누었습니다. 표준화할 때는 표준편차 $\\sigma=4$로 나눕니다.' },
          ],
          explain: '$Z=\\dfrac{58-50}{4}=2$입니다. 58은 평균보다 표준편차 2개만큼 큰 값입니다.',
        },
      },
      {
        title: '표준정규분포표로 확률 구하기',
        body: '**표준정규분포표**는 $z\\ge 0$에 대하여 $\\mathrm{P}(0\\le Z\\le z)$의 값을 정리한 표입니다. 이 단원에서 쓰는 값은 다음과 같습니다.\n\n' +
          table(ZT) + '\n\n' +
          '곡선이 $z=0$에 대하여 대칭이고 전체 넓이가 1이므로 $\\mathrm{P}(Z\\ge 0)=\\mathrm{P}(Z\\le 0)=0.5$입니다. 이것을 이용하면 ($a>0$, $b>0$)\n\n' +
          '- $\\mathrm{P}(Z\\ge a)=0.5-\\mathrm{P}(0\\le Z\\le a)$\n' +
          '- $\\mathrm{P}(Z\\le a)=0.5+\\mathrm{P}(0\\le Z\\le a)$\n' +
          '- $\\mathrm{P}(Z\\le -a)=\\mathrm{P}(Z\\ge a)$ (대칭)\n' +
          '- $\\mathrm{P}(-a\\le Z\\le b)=\\mathrm{P}(0\\le Z\\le a)+\\mathrm{P}(0\\le Z\\le b)$\n' +
          '- $a<b$일 때 $\\mathrm{P}(a\\le Z\\le b)=\\mathrm{P}(0\\le Z\\le b)-\\mathrm{P}(0\\le Z\\le a)$\n\n' +
          '예: 그림의 색칠한 부분은 $\\mathrm{P}(-1\\le Z\\le 2)=0.3413+0.4772=0.8185$입니다.\n\n' +
          '> 💡 그림을 먼저 그리고, 색칠할 부분이 0을 사이에 두는지 한쪽에만 있는지 보면 더할지 뺄지 바로 보입니다.',
        easy: '표는 "가운데 0에서 오른쪽으로 $z$까지"의 넓이만 알려 줍니다. 곡선 아래 전체 넓이는 1이고 좌우가 똑같으니 0의 오른쪽 절반은 0.5, 왼쪽 절반도 0.5입니다.\n\n' +
          '- 0을 사이에 두고 양쪽에 걸친 구간 → 두 조각을 **더합니다**.\n' +
          '- 한쪽에만 있는 구간 → 큰 조각에서 작은 조각을 **뺍니다**.\n' +
          '- 끝없이 이어지는 꼬리 → **0.5에서** 조각을 뺍니다.\n\n' +
          '음수 쪽은 거울에 비춘 것처럼 양수 쪽과 넓이가 같습니다.',
        fig: normSvg({ shade: [[-1, 2]], marks: [{ z: -1, label: '-1' }, { z: 0, label: '0' }, { z: 2, label: '2' }], alt: '표준정규분포 곡선에서 -1부터 2까지의 부분이 색칠되어 있다' }),
        check: {
          type: 'choice',
          q: '$\\mathrm{P}(0\\le Z\\le 1.5)=0.4332$일 때, $\\mathrm{P}(Z\\ge 1.5)$의 값은 무엇입니까?',
          choices: ['0.0668', '0.4332', '0.9332'],
          answer: 0,
          why: [
            '',
            '0부터 1.5까지의 넓이입니다. 1.5보다 오른쪽 꼬리는 0.5에서 이 넓이를 뺍니다.',
            '$\\mathrm{P}(Z\\le 1.5)=0.5+0.4332$를 구했습니다. 부등호 방향을 다시 확인해 보세요.',
          ],
          explain: '$\\mathrm{P}(Z\\ge 1.5)=0.5-\\mathrm{P}(0\\le Z\\le 1.5)=0.5-0.4332=0.0668$입니다.',
        },
      },
      {
        title: '정규분포를 이용한 확률 계산',
        body: '정규분포를 따르는 확률변수의 확률은 다음 순서로 구합니다.\n\n' +
          '1. 평균 $m$과 표준편차 $\\sigma$를 확인한다. (두 번째 자리가 분산이면 제곱근을 구한다.)\n' +
          '2. 구간의 끝값을 $Z=\\dfrac{X-m}{\\sigma}$으로 표준화한다.\n' +
          '3. 그림을 그리고 표준정규분포표로 넓이를 구한다.\n\n' +
          '예: 어느 과수원의 사과 한 개의 무게 $X$(g)가 정규분포 $\\mathrm{N}(300, 20^{2})$을 따를 때, 무게가 340 g 이상인 사과의 비율은\n' +
          '$\\mathrm{P}(X\\ge 340)=\\mathrm{P}\\left(Z\\ge\\frac{340-300}{20}\\right)=\\mathrm{P}(Z\\ge 2)=0.5-0.4772=0.0228$\n' +
          '곧 약 2.28 %입니다.\n\n' +
          '표준화하면 어떤 정규분포에서든 다음이 성립합니다.\n\n' +
          '| 구간 | 확률 |\n|---|---|\n| $m-\\sigma\\le X\\le m+\\sigma$ | 0.6826 |\n| $m-2\\sigma\\le X\\le m+2\\sigma$ | 0.9544 |\n| $m-3\\sigma\\le X\\le m+3\\sigma$ | 0.9974 |\n\n' +
          '거꾸로 확률이 주어지면 표에서 $z$를 찾아 $m$이나 $\\sigma$를 구합니다. 예: $\\mathrm{P}(X\\ge a)=0.0668$이면 $\\mathrm{P}(Z\\ge 1.5)=0.0668$이므로 $\\dfrac{a-m}{\\sigma}=1.5$입니다.',
        easy: '시험 점수가 평균 70점, 표준편차 10점인 정규분포를 따른다면, 90점은 평균보다 표준편차 2개만큼 높은 점수입니다. 표준정규분포에서 $Z\\ge 2$인 부분의 넓이는 0.0228이므로 90점 이상인 학생은 전체의 약 2.28 %입니다.\n\n' +
          '평균과 표준편차가 무엇이든 "표준편차 몇 개만큼 떨어졌나?"로 바꾸기만 하면 같은 표 하나로 모두 풀 수 있습니다.',
        check: {
          type: 'short', check: 'number',
          q: '확률변수 $X$가 정규분포 $\\mathrm{N}(20, 3^{2})$을 따를 때, $\\mathrm{P}(X\\le 23)$의 값을 구하세요. (단, $\\mathrm{P}(0\\le Z\\le 1)=0.3413$)',
          answer: '0.8413',
          wrong: [
            { a: '0.3413', why: '20부터 23까지, 곧 $\\mathrm{P}(0\\le Z\\le 1)$만 구했습니다. 평균보다 작은 쪽 절반 0.5도 더합니다.' },
            { a: '0.1587', why: '$\\mathrm{P}(X\\ge 23)$을 구했습니다. 부등호 방향을 다시 확인해 보세요.' },
          ],
          explain: '$\\mathrm{P}(X\\le 23)=\\mathrm{P}\\left(Z\\le\\frac{23-20}{3}\\right)=\\mathrm{P}(Z\\le 1)=0.5+0.3413=0.8413$입니다.',
        },
      },
      {
        title: '이항분포와 정규분포의 관계',
        body: '확률변수 $X$가 이항분포 $\\mathrm{B}(n, p)$를 따를 때, $n$이 충분히 크면 $X$는 **근사적으로 정규분포** $\\mathrm{N}(np, npq)$를 따릅니다. ($q=1-p$)\n\n' +
          '평균 $np$와 분산 $npq$는 그대로 두고, 막대그래프를 같은 평균과 분산을 가진 정규분포 곡선으로 어림하는 것입니다. 그림은 $\\mathrm{B}\\left(16, \\frac{1}{2}\\right)$의 막대와 $\\mathrm{N}(8, 2^{2})$의 곡선으로, $n=16$인데도 꽤 잘 맞습니다. 보통 $np$와 $nq$가 모두 5 이상 정도이면 쓸 만한 어림으로 봅니다.\n\n' +
          '예: 동전 한 개를 400번 던질 때 앞면이 나오는 횟수 $X$의 분포는 $\\mathrm{B}\\left(400, \\frac{1}{2}\\right)$이므로 평균 200, 분산 100, 표준편차 10입니다. $n$이 충분히 크므로 $X$는 근사적으로 $\\mathrm{N}(200, 10^{2})$을 따르고\n' +
          '$\\mathrm{P}(X\\ge 220)\\approx\\mathrm{P}\\left(Z\\ge\\frac{220-200}{10}\\right)=\\mathrm{P}(Z\\ge 2)=0.5-0.4772=0.0228$\n\n' +
          '> ⚠️ 이것은 $n$이 클 때의 **어림값**입니다. $n$이 작거나 $p$가 0이나 1에 너무 가까우면 오차가 커집니다.',
        easy: '동전을 400번 던져 앞면이 220번 이상 나올 확률을 이항분포로 정확히 구하려면 $\\mathrm{P}(X=220)$부터 $\\mathrm{P}(X=400)$까지 181개의 확률을 모두 더해야 합니다. 손으로는 거의 불가능하지요.\n\n' +
          '그런데 $n$이 크면 이항분포의 막대들이 종 모양 곡선과 거의 겹칩니다. 그래서 막대를 하나하나 더하는 대신, 평균과 분산이 같은 정규분포 곡선 아래의 넓이를 표에서 찾아 어림합니다.',
        fig: BIN_FIG,
        check: {
          type: 'choice',
          q: '확률변수 $X$가 이항분포 $\\mathrm{B}\\left(100, \\frac{1}{5}\\right)$을 따를 때, $X$가 근사적으로 따르는 정규분포는 무엇입니까?',
          choices: ['$\\mathrm{N}(20, 16)$', '$\\mathrm{N}(20, 4)$', '$\\mathrm{N}(16, 20)$'],
          answer: 0,
          why: [
            '',
            '두 번째 자리에는 분산 $npq=16$을 씁니다. $\\mathrm{N}(20, 4)$는 분산이 4, 표준편차가 2인 분포입니다.',
            '평균과 분산의 자리를 바꾸어 썼습니다. $\\mathrm{N}(\\text{평균}, \\text{분산})$입니다.',
          ],
          explain: '평균은 $np=100\\times\\frac{1}{5}=20$, 분산은 $npq=100\\times\\frac{1}{5}\\times\\frac{4}{5}=16$이므로 근사적으로 $\\mathrm{N}(20, 16)$, 곧 $\\mathrm{N}(20, 4^{2})$을 따릅니다.',
        },
      },
    ],

    examples: [
      {
        q: '확률변수 $X$가 정규분포 $\\mathrm{N}(50, 10^{2})$을 따를 때, $\\mathrm{P}(45\\le X\\le 70)$의 값을 구하세요.\n\n' + table([ZT[0], ZT[3]]),
        steps: [
          '표준화합니다. $\\frac{45-50}{10}=-0.5$, $\\frac{70-50}{10}=2$이므로 $\\mathrm{P}(45\\le X\\le 70)=\\mathrm{P}(-0.5\\le Z\\le 2)$입니다.',
          '구간이 0을 사이에 두므로 두 조각을 더합니다: $\\mathrm{P}(0\\le Z\\le 0.5)+\\mathrm{P}(0\\le Z\\le 2)$ (대칭이므로 $\\mathrm{P}(-0.5\\le Z\\le 0)=\\mathrm{P}(0\\le Z\\le 0.5)$)',
          '$0.1915+0.4772=0.6687$',
        ],
        answer: '$0.6687$',
      },
      {
        q: '어느 씨앗 한 개가 싹이 트지 않을 확률은 $\\frac{1}{5}$입니다. 이 씨앗 400개를 심었을 때 싹이 트지 않는 씨앗이 92개 이상일 확률을 정규분포를 이용하여 어림하세요. (각 씨앗은 서로 독립이고, $\\mathrm{P}(0\\le Z\\le 1.5)=0.4332$)',
        steps: [
          '싹이 트지 않는 씨앗의 수 $X$의 분포는 $\\mathrm{B}\\left(400, \\frac{1}{5}\\right)$입니다.',
          '평균 $400\\times\\frac{1}{5}=80$, 분산 $400\\times\\frac{1}{5}\\times\\frac{4}{5}=64$이므로 표준편차는 8입니다.',
          '$n=400$이 충분히 크므로 $X$는 근사적으로 $\\mathrm{N}(80, 8^{2})$을 따릅니다.',
          '$\\mathrm{P}(X\\ge 92)\\approx\\mathrm{P}\\left(Z\\ge\\frac{92-80}{8}\\right)=\\mathrm{P}(Z\\ge 1.5)=0.5-0.4332=0.0668$',
        ],
        answer: '약 $0.0668$',
      },
    ],

    terms: [
      { term: '연속확률변수', def: '어떤 범위의 모든 실수 값을 가질 수 있는 확률변수입니다. 예: 키, 무게, 걸린 시간' },
      { term: '확률밀도함수', def: '연속확률변수 $X$에 대하여 $f(x)\\ge 0$이고 그래프 아래 전체 넓이가 1이며, $\\mathrm{P}(a\\le X\\le b)$가 $x=a$부터 $x=b$까지 그래프 아래의 넓이가 되는 함수 $f(x)$입니다.' },
      { term: '정규분포', def: '평균 $m$, 표준편차 $\\sigma$로 정해지는 종 모양의 연속확률분포입니다. 기호로 $\\mathrm{N}(m, \\sigma^{2})$과 같이 씁니다.' },
      { term: '정규분포 곡선', def: '정규분포의 확률밀도함수의 그래프입니다. 직선 $x=m$에 대하여 대칭인 종 모양이고, $\\sigma$가 클수록 낮고 넓게 퍼집니다.' },
      { term: '표준정규분포', def: '평균이 0, 표준편차가 1인 정규분포 $\\mathrm{N}(0, 1)$입니다. 이를 따르는 확률변수를 보통 $Z$로 씁니다.' },
      { term: '표준화', def: '정규분포 $\\mathrm{N}(m, \\sigma^{2})$을 따르는 $X$를 $Z=\\frac{X-m}{\\sigma}$으로 바꾸어 표준정규분포를 따르게 하는 것입니다.' },
      { term: '표준정규분포표', def: '$z\\ge 0$에 대하여 $\\mathrm{P}(0\\le Z\\le z)$의 값을 정리한 표입니다. 예: $z=2$이면 0.4772' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'ox', concept: 0,
        q: '연속확률변수 $X$에 대하여 $\\mathrm{P}(1\\le X\\le 3)=\\mathrm{P}(1<X<3)$이다.',
        answer: true,
        explain: '연속확률변수에서는 한 점의 확률이 0이므로 $\\mathrm{P}(X=1)=\\mathrm{P}(X=3)=0$입니다. 그래서 끝점을 넣든 빼든 확률이 같습니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 0,
        q: '연속확률변수 $X$가 $0\\le X\\le 4$의 값을 갖고, 확률밀도함수가 $f(x)=k$ ($k$는 상수)입니다. $k$의 값을 구하세요.',
        answer: '1/4',
        wrong: [{ a: '4', why: '넓이가 1이 되어야 합니다. 가로 4, 세로 $k$인 직사각형의 넓이 $4k=1$에서 $k$를 구합니다.' }],
        explain: '그래프 아래는 가로 4, 세로 $k$인 직사각형이고 넓이가 1이어야 하므로 $4k=1$, $k=\\frac{1}{4}$입니다.',
      },
      {
        id: 'p3', level: 2, type: 'short', check: 'number', concept: 0,
        q: '연속확률변수 $X$가 $0\\le X\\le 2$의 값을 갖고, 확률밀도함수가 $f(x)=ax$ ($a$는 상수)입니다. $\\mathrm{P}(1\\le X\\le 2)$의 값을 구하세요.',
        fig: pdfSvg({ shade: [1, 2], top: '2a', label: 'y=ax', alt: '0에서 2까지 y=ax 인 확률밀도함수 그래프. x=2에서 높이 2a. 1부터 2까지의 아래 부분(사다리꼴)이 색칠되어 있다' }),
        answer: '3/4',
        hint: '먼저 전체 넓이가 1이 되도록 $a$를 구합니다.',
        wrong: [
          { a: '1/2', why: '구간의 길이가 전체의 절반이라고 확률도 절반이라고 보았습니다. 그래프의 높이가 달라서 넓이가 다릅니다.' },
          { a: '1/4', why: '$\\mathrm{P}(0\\le X\\le 1)$을 구했습니다. 구하는 것은 1부터 2까지의 넓이입니다.' },
        ],
        explain: '전체 넓이는 $\\frac{1}{2}\\times 2\\times 2a=2a=1$이므로 $a=\\frac{1}{2}$입니다.\n\n$\\mathrm{P}(0\\le X\\le 1)=\\frac{1}{2}\\times 1\\times\\frac{1}{2}=\\frac{1}{4}$이므로 $\\mathrm{P}(1\\le X\\le 2)=1-\\frac{1}{4}=\\frac{3}{4}$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 1,
        q: '확률변수 $X$가 정규분포 $\\mathrm{N}(60, 9)$를 따를 때, $X$의 표준편차는 무엇입니까?',
        choices: ['3', '9', '81', '60'],
        answer: 0,
        why: [
          '',
          '9는 분산입니다. $\\mathrm{N}(m, \\sigma^{2})$의 두 번째 자리는 분산이므로 표준편차는 그 제곱근입니다.',
          '9를 표준편차로 보고 제곱했습니다. 두 번째 자리 9가 이미 분산 $\\sigma^{2}$입니다.',
          '60은 평균입니다.',
        ],
        explain: '$\\sigma^{2}=9$이므로 $\\sigma=3$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', fixed: true, concept: 1,
        q: '그림은 정규분포 $\\mathrm{N}(m_{A}, \\sigma_{A}^{2})$, $\\mathrm{N}(m_{B}, \\sigma_{B}^{2})$을 따르는 두 확률변수의 정규분포 곡선 A(실선), B(점선)입니다. 옳은 것은 무엇입니까?',
        fig: normSvg({ curves: [{ m: -1.1, s: 0.75, label: 'A' }, { m: 1.2, s: 1.35, dash: true, label: 'B' }], alt: '두 정규분포 곡선. 실선 A는 왼쪽에 있고 높고 좁다. 점선 B는 오른쪽에 있고 낮고 넓다' }),
        choices: [
          '$m_{A}<m_{B}$, $\\sigma_{A}<\\sigma_{B}$',
          '$m_{A}<m_{B}$, $\\sigma_{A}>\\sigma_{B}$',
          '$m_{A}>m_{B}$, $\\sigma_{A}<\\sigma_{B}$',
          '$m_{A}>m_{B}$, $\\sigma_{A}>\\sigma_{B}$',
        ],
        answer: 0,
        why: [
          '',
          '높고 좁은 곡선이 표준편차가 작은 곡선입니다. A가 더 좁으므로 $\\sigma_{A}<\\sigma_{B}$입니다.',
          '평균은 곡선이 가장 높은 곳의 위치입니다. A의 꼭대기가 더 왼쪽에 있으므로 $m_{A}<m_{B}$입니다.',
          '평균과 표준편차를 모두 반대로 보았습니다. 꼭대기 위치는 평균, 퍼진 정도는 표준편차입니다.',
        ],
        explain: 'A의 꼭대기가 B보다 왼쪽에 있으므로 $m_{A}<m_{B}$이고, A가 더 높고 좁으므로 $\\sigma_{A}<\\sigma_{B}$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 2,
        q: '확률변수 $X$가 정규분포 $\\mathrm{N}(80, 5^{2})$을 따를 때, $X=72.5$를 표준화한 $Z$의 값을 구하세요.',
        answer: '-1.5',
        wrong: [
          { a: '1.5', why: '부호를 놓쳤습니다. 72.5는 평균 80보다 작으므로 $Z$는 음수입니다.' },
          { a: '-0.3', why: '분산 25로 나누었습니다. 표준편차 5로 나눕니다.' },
        ],
        explain: '$Z=\\dfrac{72.5-80}{5}=\\dfrac{-7.5}{5}=-1.5$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'number', concept: 3,
        q: '표준정규분포를 따르는 확률변수 $Z$에 대하여 $\\mathrm{P}(-1\\le Z\\le 1.5)$의 값을 구하세요.\n\n' + table([ZT[1], ZT[2]]),
        answer: '0.7745',
        wrong: [{ a: '0.0919', why: '0을 사이에 둔 구간인데 두 넓이를 뺐습니다. 0의 왼쪽 조각과 오른쪽 조각을 더합니다.' }],
        explain: '$\\mathrm{P}(-1\\le Z\\le 1.5)=\\mathrm{P}(0\\le Z\\le 1)+\\mathrm{P}(0\\le Z\\le 1.5)=0.3413+0.4332=0.7745$입니다.',
      },
      {
        id: 'p8', level: 1, type: 'short', check: 'number', concept: 3,
        q: '표준정규분포를 따르는 확률변수 $Z$에 대하여 $\\mathrm{P}(1\\le Z\\le 2)$의 값을 구하세요.\n\n' + table([ZT[1], ZT[3]]),
        fig: normSvg({ shade: [[1, 2]], marks: [{ z: 0, label: '0' }, { z: 1, label: '1' }, { z: 2, label: '2' }], alt: '표준정규분포 곡선에서 1부터 2까지의 부분이 색칠되어 있다' }),
        answer: '0.1359',
        wrong: [
          { a: '0.8185', why: '두 끝이 모두 0의 오른쪽에 있는데 넓이를 더했습니다. 0부터 2까지에서 0부터 1까지를 뺍니다.' },
          { a: '0.4772', why: '0부터 2까지의 넓이만 구했습니다. 0부터 1까지의 넓이를 빼야 합니다.' },
        ],
        explain: '$\\mathrm{P}(1\\le Z\\le 2)=\\mathrm{P}(0\\le Z\\le 2)-\\mathrm{P}(0\\le Z\\le 1)=0.4772-0.3413=0.1359$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
        q: '어느 공장에서 만드는 음료 한 병의 용량 $X$(mL)는 정규분포 $\\mathrm{N}(500, 4^{2})$을 따릅니다. 용량이 494 mL 이하인 음료의 비율을 구하세요. (단, $\\mathrm{P}(0\\le Z\\le 1.5)=0.4332$)',
        answer: '0.0668',
        hint: '494를 표준화하면 음수가 나옵니다. 대칭을 이용하세요.',
        wrong: [
          { a: '0.4332', why: '494부터 500까지의 비율을 구했습니다. 494 이하인 왼쪽 꼬리는 0.5에서 이 값을 뺍니다.' },
          { a: '0.9332', why: '$\\mathrm{P}(X\\ge 494)$를 구했습니다. 부등호 방향을 다시 확인해 보세요.' },
        ],
        explain: '$\\mathrm{P}(X\\le 494)=\\mathrm{P}\\left(Z\\le\\frac{494-500}{4}\\right)=\\mathrm{P}(Z\\le -1.5)=\\mathrm{P}(Z\\ge 1.5)=0.5-0.4332=0.0668$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 4,
        q: '확률변수 $X$가 정규분포 $\\mathrm{N}(m, 2^{2})$을 따르고 $\\mathrm{P}(X\\ge 14)=0.1587$입니다. $m$의 값을 구하세요. (단, $\\mathrm{P}(0\\le Z\\le 1)=0.3413$)',
        answer: '12',
        hint: '$0.5-0.3413=0.1587$입니다.',
        wrong: [{ a: '16', why: '부호를 거꾸로 보았습니다. 14보다 큰 쪽 꼬리의 확률 0.1587이 0.5보다 작으므로 14는 평균보다 큽니다. 그래서 $\\frac{14-m}{2}=1$입니다.' }],
        explain: '$\\mathrm{P}(Z\\ge 1)=0.5-0.3413=0.1587$이므로 $\\dfrac{14-m}{2}=1$, $m=12$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 5,
        q: '주사위 한 개를 450번 던질 때 3의 배수의 눈이 나오는 횟수를 $X$라고 합니다. $X$가 135 이하일 확률을 정규분포를 이용하여 어림하세요. (단, $\\mathrm{P}(0\\le Z\\le 1.5)=0.4332$)',
        answer: '0.0668',
        hint: '먼저 $X$의 평균과 표준편차를 구합니다.',
        wrong: [
          { a: '0.4332', why: '135부터 평균 150까지의 확률을 구했습니다. 135 이하는 왼쪽 꼬리이므로 0.5에서 뺍니다.' },
          { a: '0.9332', why: '135 이상일 확률을 구했습니다. 부등호 방향을 확인해 보세요.' },
        ],
        explain: '$X$의 분포는 $\\mathrm{B}\\left(450, \\frac{1}{3}\\right)$이므로 평균 $450\\times\\frac{1}{3}=150$, 분산 $450\\times\\frac{1}{3}\\times\\frac{2}{3}=100$, 표준편차 10입니다. 근사적으로 $\\mathrm{N}(150, 10^{2})$을 따르므로\n\n$\\mathrm{P}(X\\le 135)\\approx\\mathrm{P}\\left(Z\\le\\frac{135-150}{10}\\right)=\\mathrm{P}(Z\\le -1.5)=0.5-0.4332=0.0668$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 4,
        q: '확률변수 $X$가 정규분포 $\\mathrm{N}(m, \\sigma^{2})$을 따를 때, $\\mathrm{P}(m-2\\sigma\\le X\\le m+\\sigma)$의 값은 무엇입니까? (단, $\\mathrm{P}(0\\le Z\\le 1)=0.3413$, $\\mathrm{P}(0\\le Z\\le 2)=0.4772$)',
        choices: ['0.8185', '0.6826', '0.9544', '0.1359'],
        answer: 0,
        why: [
          '',
          '$\\mathrm{P}(-1\\le Z\\le 1)$을 구했습니다. 왼쪽 끝은 $m-2\\sigma$, 곧 $Z=-2$입니다.',
          '$\\mathrm{P}(-2\\le Z\\le 2)$를 구했습니다. 오른쪽 끝은 $m+\\sigma$, 곧 $Z=1$입니다.',
          '0을 사이에 둔 구간인데 두 넓이를 뺐습니다. 양쪽 조각을 더합니다.',
        ],
        explain: '표준화하면 $\\mathrm{P}(-2\\le Z\\le 1)=0.4772+0.3413=0.8185$입니다. $m$, $\\sigma$의 값과 관계없이 같습니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 4,
        q: '확률변수 $X$가 정규분포 $\\mathrm{N}(m, \\sigma^{2})$을 따르고 $\\mathrm{P}(X\\le 40)=0.0228$, $\\mathrm{P}(X\\ge 70)=0.1587$입니다. $m+\\sigma$의 값을 구하세요.\n\n' + table([ZT[1], ZT[3]]),
        answer: '70',
        hint: '두 확률을 각각 표준정규분포의 꼬리로 바꾸어 $z$를 찾습니다.',
        wrong: [{ a: '50', why: '$m$과 $\\sigma$의 식에서 부호를 잘못 세웠습니다. 40은 평균보다 작아 $\\frac{40-m}{\\sigma}=-2$, 70은 평균보다 커 $\\frac{70-m}{\\sigma}=1$입니다.' }],
        explain: '$0.5-0.4772=0.0228$이므로 $\\mathrm{P}(Z\\le -2)=0.0228$, 곧 $\\dfrac{40-m}{\\sigma}=-2$입니다. $0.5-0.3413=0.1587$이므로 $\\dfrac{70-m}{\\sigma}=1$입니다.\n\n$40=m-2\\sigma$, $70=m+\\sigma$를 연립하면 $3\\sigma=30$, $\\sigma=10$, $m=60$입니다. 따라서 $m+\\sigma=70$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 4, unit: '점',
        q: '어느 시험의 점수가 평균 65점, 표준편차 10점인 정규분포를 따른다고 합니다. 점수가 $a$점 이상인 학생이 전체의 2.28 %일 때, $a$의 값을 구하세요. (단, $\\mathrm{P}(0\\le Z\\le 2)=0.4772$)',
        answer: '85',
        hint: '$0.5-0.4772$를 계산해 보세요.',
        wrong: [{ a: '45', why: '오른쪽 꼬리를 왼쪽으로 보았습니다. "$a$점 이상"이 2.28 %로 적으므로 $a$는 평균보다 큽니다.' }],
        explain: '$\\mathrm{P}(Z\\ge 2)=0.5-0.4772=0.0228$이므로 $\\dfrac{a-65}{10}=2$, $a=85$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 1,
        q: '확률변수 $X$가 정규분포 $\\mathrm{N}(10, \\sigma^{2})$을 따르고 $\\mathrm{P}(X\\le 4)=0.0668$입니다. $\\mathrm{P}(10\\le X\\le 16)$의 값을 구하세요.',
        answer: '0.4332',
        hint: '$\\sigma$를 몰라도 곡선이 $x=10$에 대하여 대칭이라는 것만으로 풀 수 있습니다.',
        wrong: [
          { a: '0.0668', why: '대칭으로 $\\mathrm{P}(X\\ge 16)$을 구했습니다. 구하는 것은 10부터 16까지의 넓이입니다.' },
          { a: '0.9332', why: '$\\mathrm{P}(X\\ge 4)$를 구했습니다. 평균 10의 오른쪽 절반 가운데 16까지만 구합니다.' },
        ],
        explain: '곡선은 $x=10$에 대하여 대칭이므로 $\\mathrm{P}(10\\le X\\le 16)=\\mathrm{P}(4\\le X\\le 10)$입니다.\n\n$\\mathrm{P}(4\\le X\\le 10)=\\mathrm{P}(X\\le 10)-\\mathrm{P}(X\\le 4)=0.5-0.0668=0.4332$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 5,
        q: '동전 한 개를 100번 던질 때 앞면이 $k$번 이상 나올 확률을 정규분포로 어림한 값이 0.0228입니다. 자연수 $k$의 값을 구하세요. (단, $\\mathrm{P}(0\\le Z\\le 2)=0.4772$)',
        answer: '60',
        hint: '앞면의 횟수는 $\\mathrm{B}\\left(100, \\frac{1}{2}\\right)$을 따릅니다. 평균과 표준편차를 먼저 구하세요.',
        wrong: [
          { a: '100', why: '분산 25를 표준편차로 썼습니다. 표준편차는 $\\sqrt{25}=5$입니다.' },
          { a: '40', why: '"$k$번 이상"이 0.0228로 작은 오른쪽 꼬리이므로 $k$는 평균 50보다 큽니다.' },
        ],
        explain: '앞면의 횟수 $X$의 분포는 $\\mathrm{B}\\left(100, \\frac{1}{2}\\right)$이고 평균 50, 분산 25, 표준편차 5입니다. 근사적으로 $\\mathrm{N}(50, 5^{2})$을 따릅니다.\n\n$\\mathrm{P}(Z\\ge 2)=0.0228$이므로 $\\dfrac{k-50}{5}=2$, $k=60$입니다.',
      },
    ],

    deeper: [
      {
        title: '정규분포 곡선의 식',
        body: '정규분포 $\\mathrm{N}(m, \\sigma^{2})$의 확률밀도함수는\n\n' +
          '$f(x)=\\dfrac{1}{\\sqrt{2\\pi}\\,\\sigma}e^{-\\frac{(x-m)^{2}}{2\\sigma^{2}}}$\n\n' +
          '입니다. 여기서 $e$는 약 2.718인 수로, 미적분Ⅱ에서 자세히 배웁니다. 이 식을 외울 필요는 없지만 몇 가지를 읽어 낼 수 있습니다.\n\n' +
          '- 지수에 $(x-m)^{2}$이 있으므로 $x=m$에 대하여 대칭이고 $x=m$일 때 가장 큽니다.\n' +
          '- 앞의 $\\frac{1}{\\sigma}$ 때문에 $\\sigma$가 클수록 곡선의 최댓값이 작아집니다. 전체 넓이를 1로 맞추기 위해서입니다.\n\n' +
          '이 곡선 아래 넓이는 정적분으로 정확히 계산하기 어려워서, 미리 계산해 둔 표준정규분포표를 씁니다. 요즘은 공학용 계산기나 컴퓨터로도 바로 구합니다.',
      },
      {
        title: '연속성 수정 — 더 정확한 어림',
        body: '이항분포는 $X=0, 1, 2, \\cdots$처럼 띄엄띄엄한 값을 갖는데, 정규분포는 연속입니다. 그래서 막대 하나($X=k$)를 곡선의 구간 $k-0.5\\le X\\le k+0.5$로 보면 어림이 더 정확해집니다. 이것을 **연속성 수정**이라고 합니다.\n\n' +
          '고등학교 교과에서는 $n$이 충분히 크다고 보고 이 수정 없이 계산합니다. 이 단원의 문제도 모두 수정 없이 어림합니다. 통계학을 더 공부하면 이런 세부 조정을 배우게 됩니다.',
      },
    ],

    faq: [
      {
        q: '연속확률변수에서 한 점의 확률이 0이면, 그 값은 절대 나오지 않는다는 뜻인가요?',
        a: '아닙니다. 키가 정확히 170 cm인 사람도 있을 수 있지만, 실수는 끝없이 촘촘해서 "정확히 170.000…"이라는 한 점이 차지하는 넓이가 0이라는 뜻입니다. 그래서 연속확률변수는 항상 구간의 확률로 이야기합니다.',
      },
      {
        q: '왜 굳이 표준화를 해요?',
        a: '정규분포는 $m$과 $\\sigma$에 따라 무수히 많지만, 표준화하면 모두 $\\mathrm{N}(0, 1)$ 하나로 바뀝니다. 그래서 표준정규분포표 하나만 있으면 어떤 정규분포의 확률이든 구할 수 있습니다.',
      },
      {
        q: '표준정규분포표에는 양수 $z$만 있는데 음수는 어떻게 해요?',
        a: '곡선이 0에 대하여 대칭이므로 $\\mathrm{P}(-a\\le Z\\le 0)=\\mathrm{P}(0\\le Z\\le a)$입니다. 음수 쪽은 같은 크기의 양수 쪽 값을 그대로 씁니다.',
      },
      {
        q: 'N(50, 16)이면 표준편차가 16인가요?',
        a: '아닙니다. $\\mathrm{N}(m, \\sigma^{2})$의 두 번째 자리는 분산입니다. 분산이 16이므로 표준편차는 4입니다. 헷갈리지 않게 $\\mathrm{N}(50, 4^{2})$처럼 쓰기도 합니다.',
      },
    ],

    mistakes: [
      '$\\mathrm{N}(m, \\sigma^{2})$의 두 번째 자리(분산)를 표준편차로 써서 표준화하는 실수 — 표준화는 $\\frac{X-m}{\\sigma}$으로, 분산의 제곱근으로 나눕니다.',
      '$\\mathrm{P}(Z\\ge a)$를 구할 때 표의 값 $\\mathrm{P}(0\\le Z\\le a)$를 그대로 쓰는 실수 — 오른쪽 꼬리는 $0.5$에서 뺍니다.',
      '0을 사이에 둔 구간 $\\mathrm{P}(-a\\le Z\\le b)$에서 두 값을 빼는 실수 — 양쪽 조각을 더합니다.',
    ],

    gens: [
      {
        id: 'std-normal-table',
        level: 1,
        title: '표준정규분포표로 확률 구하기',
        make: function (R) {
          var kind = R.pick(['ge', 'le', 'between', 'between']);
          var a, b, q, shade, marks, res;
          if (kind === 'between') {
            var two = R.sample(ZT, 2);
            a = signed(R, two[0]); b = signed(R, two[1]);
            if (zOf(a) > zOf(b)) { var tmp = a; a = b; b = tmp; }
            if (a.sign === b.sign && a.sign < 0) { // 둘 다 음수 → between 은 대칭
              res = zProb('between', b, a);
            } else res = zProb('between', a, b);
            q = '\\mathrm{P}(' + zTex(a) + '\\le Z\\le ' + zTex(b) + ')';
            shade = [[zOf(a), zOf(b)]];
            marks = [{ z: zOf(a), label: zTex(a) }, { z: zOf(b), label: zTex(b) }];
            if (a.sign !== b.sign) marks.push({ z: 0, label: '0' });
          } else {
            a = signed(R, R.pick(ZT));
            res = zProb(kind, a);
            q = '\\mathrm{P}(Z\\' + kind + ' ' + zTex(a) + ')';
            shade = kind === 'ge' ? [[zOf(a), 4]] : [[-4, zOf(a)]];
            marks = [{ z: 0, label: '0' }, { z: zOf(a), label: zTex(a) }];
          }
          var rows = kind === 'between' ? [a, b] : [a];
          return {
            type: 'short', check: 'number', concept: 3,
            q: '표준정규분포를 따르는 확률변수 $Z$에 대하여 $' + q + '$의 값을 구하세요.\n\n' + table(rows),
            fig: normSvg({ shade: shade, marks: marks, alt: '표준정규분포 곡선에서 구하려는 구간이 색칠되어 있다' }),
            answer: d4(res.v),
            hint: '0을 기준으로 색칠한 부분이 어디에 있는지 보세요.',
            wrong: W(res.v, res.wr),
            explain: '$' + q + '=' + res.how + '=' + d4(res.v) + '$입니다.',
          };
        },
      },
      {
        id: 'normal-prob',
        level: 2,
        title: '정규분포를 표준화하여 확률 구하기',
        make: function (R) {
          var ctx = R.pick([
            { pre: '확률변수 $X$가', m: [40, 50, 60, 100], s: [2, 4, 5, 8, 10] },
            { pre: '어느 과수원에서 수확한 배 한 개의 무게를 $X$ g이라고 하면 $X$는', m: [400, 450, 500], s: [10, 20, 30, 40] },
            { pre: '어느 학교 학생의 통학 시간을 $X$분이라고 하면 $X$는', m: [30, 40, 50], s: [4, 6, 8] },
            { pre: '어느 공장에서 만드는 나사 한 개의 길이를 $X$ mm라고 하면 $X$는', m: [50, 60, 80], s: [2, 4] },
          ]);
          var m = R.pick(ctx.m), sd = R.pick(ctx.s);
          var kind = R.pick(['ge', 'le', 'between']);
          var a, b, res, probTex, zTexStr, rows;
          function val(r) { return m + zOf(r) * sd; }
          function fmtv(v) { return String(Math.round(v * 10) / 10); }
          if (kind === 'between') {
            var two = R.sample(ZT.slice(0, 4), 2);
            a = signed(R, two[0]); b = signed(R, two[1]);
            if (zOf(a) > zOf(b)) { var tmp = a; a = b; b = tmp; }
            res = (a.sign < 0 && b.sign < 0) ? zProb('between', b, a) : zProb('between', a, b);
            probTex = '\\mathrm{P}(' + fmtv(val(a)) + '\\le X\\le ' + fmtv(val(b)) + ')';
            zTexStr = '\\mathrm{P}\\left(\\frac{' + fmtv(val(a)) + '-' + m + '}{' + sd + '}\\le Z\\le\\frac{' + fmtv(val(b)) + '-' + m + '}{' + sd + '}\\right)=\\mathrm{P}(' + zTex(a) + '\\le Z\\le ' + zTex(b) + ')';
            rows = [a, b];
          } else {
            a = signed(R, R.pick(ZT.slice(0, 5)));
            res = zProb(kind, a);
            probTex = '\\mathrm{P}(X\\' + kind + ' ' + fmtv(val(a)) + ')';
            zTexStr = '\\mathrm{P}\\left(Z\\' + kind + '\\frac{' + fmtv(val(a)) + '-' + m + '}{' + sd + '}\\right)=\\mathrm{P}(Z\\' + kind + ' ' + zTex(a) + ')';
            rows = [a];
          }
          var wl = res.wr.slice();
          return {
            type: 'short', check: 'number', concept: 4,
            q: ctx.pre + ' 정규분포 $\\mathrm{N}(' + m + ', ' + sd + '^{2})$을 따릅니다. $' + probTex + '$의 값을 구하세요.\n\n' + table(rows),
            answer: d4(res.v),
            hint: '구간의 끝값을 $Z=\\frac{X-' + m + '}{' + sd + '}$' + R.josa(m, '으로/로') + ' 표준화하세요.',
            wrong: W(res.v, wl),
            explain: '평균 ' + m + ', 표준편차 ' + sd + '이므로 표준화하면\n\n$' + probTex + '=' + zTexStr + '$\n\n$=' + res.how + '=' + d4(res.v) + '$입니다.',
          };
        },
      },
      {
        id: 'binom-normal',
        level: 2,
        title: '이항분포를 정규분포로 어림하기',
        make: function (R) {
          // npq 가 제곱수(표준편차 4~20, 짝수)가 되는 (n, p) 후보
          var PS = [[1, 2], [1, 5], [4, 5], [1, 10], [9, 10], [1, 4], [3, 4], [1, 3], [2, 3]];
          var cands = [];
          PS.forEach(function (x) {
            for (var k = 1; k * x[1] <= 3600; k++) {
              var n = k * x[1];
              var num = n * x[0] * (x[1] - x[0]), den = x[1] * x[1];
              if (num % den) continue;
              var v = num / den, s = Math.round(Math.sqrt(v));
              if (s * s === v && s >= 4 && s <= 20 && s % 2 === 0 && n * x[0] / x[1] >= 5) cands.push([n, x[0], x[1], s]);
            }
          });
          var c = R.pick(cands);
          var n = c[0], pa = c[1], pb = c[2], sd = c[3];
          var mean = n * pa / pb;
          var row = R.pick(ZT.slice(0, 4));
          var a = { z: row.z, s: row.s, h: row.h, t: row.t, sign: R.sign() };
          var kind = R.pick(['ge', 'le']);
          var k = mean + zOf(a) * sd;
          var res = zProb(kind, a);
          var ci = R.int(0, 2);
          if (ci === 1 && pa * 4 > pb) ci = 2; // 불량품 확률은 1/4 이하일 때만
          var ctx = ([
            '한 번의 시행에서 성공할 확률이 $\\frac{' + pa + '}{' + pb + '}$인 독립시행을 ' + n + '번 할 때 성공 횟수를 $X$라고 합니다.',
            '어느 제품 하나가 불량품일 확률은 $\\frac{' + pa + '}{' + pb + '}$입니다. 이 제품 ' + n + '개를 임의로 골랐을 때 불량품의 개수를 $X$라고 합니다. 각 제품이 불량품인지는 서로 독립입니다.',
            '어느 씨앗 한 개가 싹이 틀 확률은 $\\frac{' + pa + '}{' + pb + '}$입니다. 이 씨앗 ' + n + '개를 심었을 때 싹이 튼 씨앗의 수를 $X$라고 합니다. 각 씨앗에 싹이 트는지는 서로 독립입니다.',
          ])[ci];
          var word = kind === 'ge' ? '이상' : '이하';
          return {
            type: 'short', check: 'number', concept: 5,
            q: ctx + ' $X$가 ' + k + ' ' + word + '일 확률을 정규분포를 이용하여 어림하세요.\n\n' + table([a]),
            answer: d4(res.v),
            hint: '$X$의 분포는 $\\mathrm{B}\\left(' + n + ', \\frac{' + pa + '}{' + pb + '}\\right)$입니다. 평균 $np$와 표준편차 $\\sqrt{npq}$를 먼저 구하세요.',
            wrong: W(res.v, res.wr),
            explain: '$X$의 분포는 $\\mathrm{B}\\left(' + n + ', \\frac{' + pa + '}{' + pb + '}\\right)$이므로 평균은 $' + n + '\\times\\frac{' + pa + '}{' + pb + '}=' + mean + '$, 분산은 $' + n + '\\times\\frac{' + pa + '}{' + pb + '}\\times\\frac{' + (pb - pa) + '}{' + pb + '}=' + (sd * sd) + '$, 표준편차는 ' + sd + '입니다.\n\n' +
              '$n$이 충분히 크므로 $X$는 근사적으로 $\\mathrm{N}(' + mean + ', ' + sd + '^{2})$을 따르고\n\n' +
              '$\\mathrm{P}(X\\' + kind + ' ' + k + ')\\approx\\mathrm{P}\\left(Z\\' + kind + '\\frac{' + k + '-' + mean + '}{' + sd + '}\\right)=\\mathrm{P}(Z\\' + kind + ' ' + zTex(a) + ')=' + res.how + '=' + d4(res.v) + '$입니다.',
          };
        },
      },
      {
        id: 'normal-reverse',
        level: 3,
        title: '확률이 주어질 때 평균이나 표준편차 구하기',
        make: function (R) {
          var row = R.pick(ZT.slice(0, 5));
          var sd = R.pick([2, 4, 5, 6, 8, 10]);
          var m = R.pick([20, 30, 40, 50, 60, 70, 80]);
          var right = R.bool(); // 오른쪽 꼬리 P(X ≥ c) 또는 왼쪽 꼬리 P(X ≤ c)
          var c = right ? m + row.z * sd : m - row.z * sd;
          var tail = d4(5000 - row.t);
          var askM = R.bool();
          var cTex = String(Math.round(c * 10) / 10);
          var probTex = right ? '\\mathrm{P}(X\\ge ' + cTex + ')' : '\\mathrm{P}(X\\le ' + cTex + ')';
          var zEq = '\\dfrac{' + cTex + '-' + (askM ? 'm' : m) + '}{' + (askM ? sd : '\\sigma') + '}=' + (right ? '' : '-') + row.s;
          var base = {
            type: 'short', check: 'number', concept: 4,
            hint: '$0.5-' + d4(row.t) + '=' + tail + '$입니다. 이 꼬리가 평균의 어느 쪽인지 보세요.',
          };
          var tbl = '\n\n(단, $\\mathrm{P}(0\\le Z\\le ' + row.s + ')=' + d4(row.t) + '$)';
          if (askM) {
            var wrongM = right ? m + 2 * row.z * sd : m - 2 * row.z * sd; // 부호를 거꾸로 세운 경우
            base.q = '확률변수 $X$가 정규분포 $\\mathrm{N}(m, ' + sd + '^{2})$을 따르고 $' + probTex + '=' + tail + '$입니다. $m$의 값을 구하세요.' + tbl;
            base.answer = String(m);
            base.wrong = [{ a: String(Math.round(wrongM * 10) / 10), why: '부호를 거꾸로 세웠습니다. ' + (right ? '오른쪽' : '왼쪽') + ' 꼬리의 확률이 0.5보다 작으므로 ' + cTex + R.josa(cTex, '은/는') + ' 평균보다 ' + (right ? '큽니다' : '작습니다') + '.' }];
            base.explain = '$' + probTex + '=' + tail + '=0.5-' + d4(row.t) + '$이므로 $\\mathrm{P}(Z' + (right ? '\\ge ' : '\\le -') + row.s + ')=' + tail + '$입니다. 따라서 $' + zEq + '$, $m=' + m + '$입니다.';
          } else {
            base.q = '확률변수 $X$가 정규분포 $\\mathrm{N}(' + m + ', \\sigma^{2})$을 따르고 $' + probTex + '=' + tail + '$입니다. $\\sigma$의 값을 구하세요. (단, $\\sigma>0$)' + tbl;
            base.answer = String(sd);
            base.wrong = [{ a: String(sd * sd), why: '분산 $\\sigma^{2}$을 구했습니다. 표준화는 $\\frac{X-m}{\\sigma}$이므로 $\\sigma$를 바로 구할 수 있습니다.' }];
            base.explain = '$' + probTex + '=' + tail + '=0.5-' + d4(row.t) + '$이므로 $\\mathrm{P}(Z' + (right ? '\\ge ' : '\\le -') + row.s + ')=' + tail + '$입니다. 따라서 $' + zEq + '$, $\\sigma=' + sd + '$입니다.';
          }
          return base;
        },
      },
    ],
  });
})();
