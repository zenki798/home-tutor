/* 화학 · 평형 상수와 반응 지수
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy) */
(function () {
  /* ---------- 그림: Q 와 K 비교 ---------- */
  function txt(x, y, s, size, bold, anchor) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || 'middle') + '" font-size="' + (size || 12) + '"' + (bold ? ' font-weight="bold"' : '') + ' fill="currentColor">' + s + '</text>';
  }
  function arrow(x1, x2, y, color) {
    var dir = x2 > x1 ? 1 : -1;
    return '<line x1="' + x1 + '" y1="' + y + '" x2="' + (x2 - dir * 10) + '" y2="' + y + '" stroke="' + color + '" stroke-width="3"/>' +
      '<polygon points="' + x2 + ',' + y + ' ' + (x2 - dir * 12) + ',' + (y - 6) + ' ' + (x2 - dir * 12) + ',' + (y + 6) + '" fill="' + color + '"/>';
  }
  var QK = '<svg viewBox="0 0 480 170">' +
    '<line x1="20" y1="80" x2="460" y2="80" stroke="currentColor" stroke-width="2"/>' +
    '<line x1="240" y1="64" x2="240" y2="96" stroke="currentColor" stroke-width="3"/>' +
    txt(240, 56, 'K (평형)', 13, true) + txt(30, 102, '0', 11) + txt(450, 102, 'Q 값 →', 11, false, 'end') +
    '<circle cx="90" cy="80" r="7" fill="var(--fig-1)"/>' + arrow(100, 228, 120, 'var(--fig-1)') +
    txt(90, 56, 'Q < K', 13, true) + txt(130, 145, '정반응 쪽으로 진행', 12, true) + txt(130, 162, '(생성물↑, 반응물↓, Q가 커짐)', 11) +
    '<circle cx="390" cy="80" r="7" fill="var(--fig-2)"/>' + arrow(380, 252, 120, 'var(--fig-2)') +
    txt(390, 56, 'Q > K', 13, true) + txt(350, 145, '역반응 쪽으로 진행', 12, true) + txt(350, 162, '(반응물↑, 생성물↓, Q가 작아짐)', 11) +
    '</svg>';

  /* ---------- 생성기 도구 ---------- */
  var RXNS = [
    { eq: 'N₂O₄(g) ⇌ 2NO₂(g)', r: [['N₂O₄', 1]], p: [['NO₂', 2]] },
    { eq: 'H₂(g) + I₂(g) ⇌ 2HI(g)', r: [['H₂', 1], ['I₂', 1]], p: [['HI', 2]] },
    { eq: 'PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)', r: [['PCl₅', 1]], p: [['PCl₃', 1], ['Cl₂', 1]] },
    { eq: 'CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)', r: [['CO', 1], ['H₂O', 1]], p: [['CO₂', 1], ['H₂', 1]] },
    { eq: '2SO₂(g) + O₂(g) ⇌ 2SO₃(g)', r: [['SO₂', 2], ['O₂', 1]], p: [['SO₃', 2]] },
  ];
  // 농도 후보(0.1 M 단위 정수): 소인수가 2와 5뿐이라 K 가 늘 유한소수가 된다
  var CONC = [1, 2, 4, 5, 8, 10];
  function cTex(n10, F) { return F(n10, 10).toDecimal(); }
  function bracket(s) { return '[\\mathrm{' + s[0] + '}]' + (s[1] > 1 ? '^' + s[1] : ''); }
  function kTex(rx, sym) {
    return (sym || 'K') + '=\\dfrac{' + rx.p.map(bracket).join('') + '}{' + rx.r.map(bracket).join('') + '}';
  }
  // 실제 수를 넣은 식: vals 는 물질 이름 → 0.1 M 단위 정수
  function subTex(rx, vals, F) {
    // 같은 쪽(분자 또는 분모)에 물질이 둘 이상이면 곱셈이 보이게 괄호로 묶는다
    function side(list) {
      return list.map(function (s) {
        var v = cTex(vals[s[0]], F);
        return s[1] > 1 ? '(' + v + ')^' + s[1] : (list.length > 1 ? '(' + v + ')' : v);
      }).join('');
    }
    return '\\dfrac{' + side(rx.p) + '}{' + side(rx.r) + '}';
  }
  function kValue(rx, vals, F, noPow) {
    var k = F(1);
    rx.p.forEach(function (s) { k = k.mul(F(vals[s[0]], 10).pow(noPow ? 1 : s[1])); });
    rx.r.forEach(function (s) { k = k.div(F(vals[s[0]], 10).pow(noPow ? 1 : s[1])); });
    return k;
  }
  function numText(f) { var d = f.toDecimal(6); return d === null ? f.toString() : d; }
  function concList(rx, vals, F) {
    return rx.r.concat(rx.p).map(function (s) { return '[' + s[0] + '] = ' + cTex(vals[s[0]], F) + ' M'; }).join(', ');
  }

  Tutor.registerUnit({
    id: 'sci-h-chem-08',
    course: 'sci-h-chem',
    title: '평형 상수와 반응 지수',
    summary: '몰 농도로 평형 상수 식을 세워 값을 구하고, 평형 상수의 크기가 뜻하는 것을 알며, 반응 지수와 비교해 반응이 어느 쪽으로 진행할지 예측합니다.',
    goals: [
      '몰 농도의 뜻을 알고 물질의 양과 부피로 몰 농도를 구할 수 있다.',
      '화학 반응식으로 평형 상수 식을 세우고 평형 농도로 그 값을 구할 수 있다.',
      '평형 상수의 크기로 평형에서 반응물과 생성물의 상대적인 양을 판단할 수 있다.',
      '반응 지수와 평형 상수를 비교하여 반응의 진행 방향을 예측할 수 있다.',
    ],
    standards: ['[12화학03-02]', '[12화학03-03]'],

    concepts: [
      {
        title: '몰 농도와 농도 자료 읽기',
        body: '평형을 다룰 때는 물질의 양을 **몰 농도**로 나타냅니다. 몰 농도는 용액 1 L 속에 녹아 있는 용질의 양(mol)이고, 단위는 **M**(= mol/L)입니다. 밀폐 용기 속 기체라면 용기 1 L에 들어 있는 기체의 양으로 생각합니다.\n\n' +
          '$\\text{몰 농도(M)}=\\dfrac{\\text{물질의 양(mol)}}{\\text{부피(L)}}$\n\n' +
          '물질 X의 몰 농도는 대괄호로 [X]처럼 씁니다. 예를 들어 2 L 용기에 NO₂ 0.4 mol이 들어 있으면 $[\\mathrm{NO₂}]=\\dfrac{0.4}{2}=0.2$ M입니다.\n\n' +
          '| 용기 부피 | N₂O₄의 양 | [N₂O₄] |\n|---|---|---|\n| 1 L | 0.6 mol | 0.6 M |\n| 2 L | 0.6 mol | 0.3 M |\n| 0.5 L | 0.6 mol | 1.2 M |\n\n' +
          '> ⚠️ 평형 상수는 **몰 농도**로 계산합니다. 문제에 몰수(mol)와 부피가 주어지면 먼저 몰 농도로 바꾸세요. 용기가 1 L일 때만 몰수와 몰 농도의 수가 같습니다.\n\n' +
          '몰 농도로 용액을 만드는 방법은 이 과정의 "몰 농도와 용액 만들기" 단원에서 자세히 배웁니다.',
        easy: '몰 농도는 "1 L에 몇 mol이 들어 있나"를 나타내는 빽빽함의 정도입니다. 같은 수의 사람도 작은 방에 있으면 북적이고, 큰 강당에 있으면 한산하지요.\n\n그래서 같은 0.6 mol이라도 1 L 용기에서는 0.6 M, 2 L 용기에서는 그 절반인 0.3 M입니다.',
        check: {
          type: 'short', check: 'number', unit: 'M',
          q: '부피가 4 L인 밀폐 용기에 H₂가 0.8 mol 들어 있습니다. [H₂]는 몇 M일까요?',
          answer: '0.2',
          wrong: [{ a: '3.2', why: '물질의 양에 부피를 곱했습니다. 몰 농도는 물질의 양을 부피로 나눈 값입니다.' }, { a: '5', why: '부피를 물질의 양으로 나누었습니다. 물질의 양(mol)을 부피(L)로 나눕니다.' }],
          explain: '$[\\mathrm{H₂}]=\\dfrac{0.8\\text{ mol}}{4\\text{ L}}=0.2$ M입니다.',
        },
      },
      {
        title: '평형 상수 식 세우기',
        body: '일정한 온도에서 가역 반응이 평형에 이르면, 반응물과 생성물의 평형 농도 사이에 일정한 관계가 성립합니다. 반응식이\n\n' +
          'aA + bB ⇌ cC + dD (A, B, C, D는 물질, a, b, c, d는 계수)\n\n' +
          '일 때, 다음 값은 온도가 같으면 늘 일정합니다. 이것을 **평형 상수(K)**라 하고, 이 관계를 **화학 평형 법칙**이라고 합니다.\n\n' +
          '$K=\\dfrac{[\\mathrm{C}]^c[\\mathrm{D}]^d}{[\\mathrm{A}]^a[\\mathrm{B}]^b}$\n\n' +
          '- **분자**에는 생성물, **분모**에는 반응물의 평형 농도를 씁니다.\n' +
          '- 각 농도에 반응식의 **계수를 지수로** 붙입니다(계수를 곱하는 것이 아닙니다).\n\n' +
          '예: N₂O₄(g) ⇌ 2NO₂(g)이면 $K=\\dfrac{[\\mathrm{NO₂}]^2}{[\\mathrm{N₂O₄}]}$, N₂(g) + 3H₂(g) ⇌ 2NH₃(g)이면 $K=\\dfrac{[\\mathrm{NH₃}]^2}{[\\mathrm{N₂}][\\mathrm{H₂}]^3}$입니다.\n\n' +
          '> 💡 고체(s)와 물 같은 순수한 액체(l)는 농도가 거의 변하지 않으므로 평형 상수 식에 쓰지 않습니다. 예: CaCO₃(s) ⇌ CaO(s) + CO₂(g)이면 $K=[\\mathrm{CO₂}]$입니다. 이 과정에서는 평형 상수의 단위를 쓰지 않습니다.',
        easy: '평형 상수 식은 "생성물 ÷ 반응물"의 꼴입니다. 반응식의 오른쪽(생성물)은 위로, 왼쪽(반응물)은 아래로 보내고, 반응식 앞의 숫자(계수)는 어깨 위의 작은 숫자(지수)로 올려 줍니다.\n\n2NO₂라면 [NO₂]를 두 번 곱한다는 뜻으로 $[\\mathrm{NO₂}]^2$이라고 씁니다.',
        check: {
          type: 'choice',
          q: 'H₂(g) + I₂(g) ⇌ 2HI(g)의 평형 상수 식은 무엇일까요?',
          choices: ['$K=\\dfrac{[\\mathrm{HI}]^2}{[\\mathrm{H₂}][\\mathrm{I₂}]}$', '$K=\\dfrac{[\\mathrm{H₂}][\\mathrm{I₂}]}{[\\mathrm{HI}]^2}$', '$K=\\dfrac{2[\\mathrm{HI}]}{[\\mathrm{H₂}][\\mathrm{I₂}]}$'],
          answer: 0,
          why: ['', '분자와 분모를 바꾸었습니다. 생성물(HI)이 분자, 반응물이 분모입니다.', '계수 2를 곱했습니다. 계수는 지수로 붙입니다.'],
          explain: '생성물 HI의 농도를 분자에, 계수 2를 지수로 붙여 $[\\mathrm{HI}]^2$으로 쓰고, 반응물 H₂와 I₂의 농도를 분모에 씁니다.',
        },
      },
      {
        title: '평형 상수 값 구하기',
        body: '평형 상수 식에 **평형에서의 몰 농도**를 넣으면 K 값을 구할 수 있습니다.\n\n' +
          '예: N₂O₄(g) ⇌ 2NO₂(g) 반응이 평형일 때 [N₂O₄] = 0.4 M, [NO₂] = 0.2 M이면\n\n' +
          '$K=\\dfrac{[\\mathrm{NO₂}]^2}{[\\mathrm{N₂O₄}]}=\\dfrac{(0.2)^2}{0.4}=\\dfrac{0.04}{0.4}=0.1$\n\n' +
          '같은 온도에서 처음 넣은 양을 바꾸어 실험해도 K는 같은 값이 나옵니다. 다음은 H₂(g) + I₂(g) ⇌ 2HI(g) 반응을 어느 일정한 온도에서 세 번 실험한 결과입니다(가상의 자료).\n\n' +
          '| 실험 | [H₂] | [I₂] | [HI] | $\\dfrac{[\\mathrm{HI}]^2}{[\\mathrm{H₂}][\\mathrm{I₂}]}$ |\n|---|---|---|---|---|\n| 1 | 0.10 | 0.10 | 0.70 | 49 |\n| 2 | 0.20 | 0.05 | 0.70 | 49 |\n| 3 | 0.02 | 0.08 | 0.28 | 49 |\n\n' +
          '평형 농도는 실험마다 다르지만 평형 상수는 49로 같습니다. 곧 **평형 상수는 온도가 일정하면 농도와 관계없이 일정**합니다. 온도가 바뀌면 K도 바뀝니다.\n\n' +
          '> 💡 처음 넣은 양만 주어지면 "처음 → 변화 → 평형" 표로 평형 농도를 먼저 구한 뒤 식에 넣습니다.',
        easy: '평형 상수는 그 반응의 "고유 번호" 같은 것입니다. 시작할 때 무엇을 얼마나 넣든, 같은 온도에서 평형에 이르면 생성물과 반응물의 농도가 늘 그 번호에 맞도록 자리를 잡습니다.\n\n계산은 식에 평형 농도를 그대로 넣고, 지수가 있으면 거듭제곱부터 한 뒤 나누면 됩니다.',
        check: {
          type: 'short', check: 'number',
          q: 'PCl₅(g) ⇌ PCl₃(g) + Cl₂(g) 반응이 평형일 때 [PCl₅] = 0.5 M, [PCl₃] = 0.2 M, [Cl₂] = 0.5 M입니다. 평형 상수 K는 얼마일까요?',
          answer: '0.2',
          wrong: [{ a: '5', why: '분자와 분모를 바꾸었습니다. 생성물(PCl₃, Cl₂)의 농도 곱을 반응물(PCl₅)의 농도로 나눕니다.' }, { a: '1.4', why: '농도를 곱하지 않고 더했습니다. 생성물의 농도는 서로 곱합니다.' }],
          explain: '$K=\\dfrac{[\\mathrm{PCl₃}][\\mathrm{Cl₂}]}{[\\mathrm{PCl₅}]}=\\dfrac{0.2\\times0.5}{0.5}=0.2$입니다.',
        },
      },
      {
        title: '평형 상수의 크기가 뜻하는 것',
        body: 'K는 "평형에서 생성물 쪽이 반응물 쪽에 비해 얼마나 많은가"를 알려 줍니다.\n\n' +
          '| K의 크기 | 평형 상태의 모습 |\n|---|---|\n| K ≫ 1 (매우 큼) | 생성물이 반응물보다 훨씬 많다. 정반응이 거의 완결된 쪽에서 평형 |\n| K ≈ 1 | 반응물과 생성물이 비슷한 정도로 섞여 있다 |\n| K ≪ 1 (매우 작음) | 반응물이 대부분이다. 정반응이 조금만 일어난 쪽에서 평형 |\n\n' +
          '역반응의 평형 상수는 정반응의 역수입니다. N₂O₄ ⇌ 2NO₂의 K가 0.1이면, 같은 온도에서 2NO₂ ⇌ N₂O₄의 평형 상수는 $\\dfrac{1}{0.1}=10$입니다. 분자와 분모가 서로 바뀌기 때문입니다.\n\n' +
          '> ⚠️ K는 평형에서의 양의 비율만 알려 줄 뿐, **반응이 얼마나 빨리 평형에 이르는지(반응 속도)는 알려 주지 않습니다.** K가 매우 커도 아주 느리게 진행되는 반응이 있습니다.',
        easy: 'K를 "생성물 팀 ÷ 반응물 팀"의 점수 비로 생각해 보세요. K가 1000이면 평형에서 생성물 팀이 압도적으로 많고, 0.001이면 반응물 팀이 대부분입니다.\n\n하지만 이 점수 비는 "경기가 끝났을 때"의 결과일 뿐, 경기가 얼마나 빨리 끝나는지는 말해 주지 않습니다.',
        check: {
          type: 'ox',
          q: '평형 상수(K)가 1보다 매우 큰 반응은 평형에서 반응물이 생성물보다 훨씬 많습니다.',
          answer: false,
          explain: 'K는 생성물 농도를 분자에 두므로, K가 매우 크면 평형에서 생성물이 반응물보다 훨씬 많습니다. 반응물이 대부분인 것은 K가 매우 작을 때입니다.',
        },
      },
      {
        title: '반응 지수(Q)',
        body: '**반응 지수(Q)**는 평형 상수 식과 같은 꼴에 **어느 순간의 농도**를 넣어 구한 값입니다. 평형이 아닐 때도 구할 수 있습니다.\n\n' +
          '$Q=\\dfrac{[\\mathrm{C}]^c[\\mathrm{D}]^d}{[\\mathrm{A}]^a[\\mathrm{B}]^b}$ (지금 이 순간의 농도)\n\n' +
          '- 반응물만 넣고 시작하면 생성물 농도가 0이므로 처음 Q = 0입니다.\n' +
          '- 반응이 진행되면 생성물이 늘고 반응물이 줄어 Q가 점점 커집니다.\n' +
          '- 평형에 이르면 Q는 K와 같아지고, 그 뒤로는 변하지 않습니다.\n\n' +
          '예: N₂O₄(g) ⇌ 2NO₂(g)에서 어느 순간 [N₂O₄] = 0.5 M, [NO₂] = 0.1 M이면 $Q=\\dfrac{(0.1)^2}{0.5}=0.02$입니다.\n\n' +
          '> 💡 K는 평형 농도로만 구하는 "목표값", Q는 지금 농도로 구하는 "현재값"입니다.',
        easy: '평형 상수 K를 목적지, 반응 지수 Q를 지금 위치라고 생각해 보세요. 반응은 늘 Q가 K에 가까워지는 쪽으로 움직이고, Q가 K에 도착하면(Q = K) 그곳이 평형입니다.\n\nQ는 언제든 지금 농도를 식에 넣기만 하면 구할 수 있습니다.',
        check: {
          type: 'choice',
          q: '반응물만 넣고 가역 반응을 시작했습니다. 반응 지수 Q는 시간에 따라 어떻게 변할까요?',
          choices: ['0에서 커져 K와 같아진 뒤 일정해진다.', 'K보다 큰 값에서 작아져 K와 같아진다.', '처음부터 끝까지 K와 같다.'],
          answer: 0,
          why: ['', '처음에는 생성물이 없어 Q = 0입니다. K보다 큰 값에서 시작하지 않습니다.', 'Q가 K와 같은 것은 평형에 이른 뒤입니다. 처음에는 생성물이 없어 Q = 0입니다.'],
          explain: '처음에는 생성물 농도가 0이라 Q = 0이고, 정반응이 진행되며 Q가 커지다가 평형에서 K와 같아집니다.',
        },
      },
      {
        title: 'Q와 K를 비교해 진행 방향 예측하기',
        body: '어느 순간의 Q를 K와 비교하면 반응이 어느 쪽으로 진행할지 알 수 있습니다.\n\n' +
          '| 비교 | 진행 방향 | 까닭 |\n|---|---|---|\n| Q < K | 정반응 쪽 | 생성물이 평형보다 적다. 생성물이 늘어 Q가 커진다 |\n| Q = K | 평형 상태 | 농도가 변하지 않는다 |\n| Q > K | 역반응 쪽 | 생성물이 평형보다 많다. 반응물이 늘어 Q가 작아진다 |\n\n' +
          '예: 어떤 온도에서 N₂O₄(g) ⇌ 2NO₂(g)의 K = 0.1입니다. 어느 순간 [N₂O₄] = 0.5 M, [NO₂] = 0.1 M이면 Q = 0.02로 K보다 작으므로, 정반응 쪽으로 진행해 NO₂가 늘고 N₂O₄가 줄어듭니다.\n\n' +
          '> 💡 계산 순서: ① 평형 상수 식 세우기 → ② 지금 농도로 Q 구하기 → ③ K와 비교하기. 몰수가 주어지면 ②에서 반드시 몰 농도로 바꿉니다.',
        easy: '목적지 K보다 아직 덜 왔으면(Q < K) 앞으로(정반응 쪽) 가고, 지나쳤으면(Q > K) 뒤로(역반응 쪽) 돌아옵니다. 딱 도착해 있으면(Q = K) 그 자리에 머뭅니다.',
        fig: { type: 'svg', svg: QK, alt: '수직선 가운데에 K가 있고, 왼쪽의 Q < K는 오른쪽 화살표로 정반응 쪽, 오른쪽의 Q > K는 왼쪽 화살표로 역반응 쪽으로 진행해 K에 가까워짐' },
        check: {
          type: 'ox',
          q: '어느 순간의 반응 지수 Q가 평형 상수 K보다 크면, 반응은 역반응 쪽으로 진행합니다.',
          answer: true,
          explain: 'Q > K이면 생성물이 평형보다 많은 상태입니다. 역반응이 더 빨리 일어나 생성물이 줄고 반응물이 늘면서 Q가 작아져 K에 가까워집니다.',
        },
      },
    ],

    examples: [
      {
        q: '부피가 2 L인 밀폐 용기에 H₂ 2.0 mol과 I₂ 2.0 mol을 넣었더니 H₂(g) + I₂(g) ⇌ 2HI(g) 반응이 일어나 평형에서 HI가 3.2 mol 있었습니다. 이 온도에서 평형 상수 K를 구하세요.',
        steps: [
          '계수비 H₂ : I₂ : HI = 1 : 1 : 2이므로 HI 3.2 mol이 생기려면 H₂와 I₂가 1.6 mol씩 반응합니다.',
          '평형에서의 양: H₂ $2.0-1.6=0.4$ mol, I₂ 0.4 mol, HI 3.2 mol입니다.',
          '부피 2 L로 나누어 몰 농도로 바꿉니다: [H₂] = 0.2 M, [I₂] = 0.2 M, [HI] = 1.6 M',
          '$K=\\dfrac{[\\mathrm{HI}]^2}{[\\mathrm{H₂}][\\mathrm{I₂}]}=\\dfrac{(1.6)^2}{(0.2)(0.2)}=\\dfrac{2.56}{0.04}=64$',
        ],
        answer: '$K=64$',
      },
      {
        q: '어떤 온도에서 N₂O₄(g) ⇌ 2NO₂(g)의 평형 상수는 K = 0.4입니다. 어느 순간 [N₂O₄] = 0.1 M, [NO₂] = 0.4 M이었다면 반응은 어느 쪽으로 진행할까요?',
        steps: [
          '평형 상수 식과 같은 꼴로 반응 지수를 세웁니다: $Q=\\dfrac{[\\mathrm{NO₂}]^2}{[\\mathrm{N₂O₄}]}$',
          '지금 농도를 넣습니다: $Q=\\dfrac{(0.4)^2}{0.1}=\\dfrac{0.16}{0.1}=1.6$',
          'Q = 1.6은 K = 0.4보다 큽니다(Q > K). 생성물인 NO₂가 평형보다 많은 상태입니다.',
          '그래서 역반응 쪽으로 진행해 NO₂가 줄고 N₂O₄가 늘어나며, Q가 작아져 0.4에 이르면 평형이 됩니다.',
        ],
        answer: 'Q > K이므로 역반응 쪽으로 진행합니다.',
      },
    ],

    terms: [
      { term: '몰 농도', def: '용액(또는 기체가 든 용기) 1 L 속에 들어 있는 물질의 양(mol)입니다. 단위는 M(= mol/L)이고, 물질 X의 몰 농도를 [X]로 씁니다.' },
      { term: '평형 상수', def: '일정한 온도에서 평형에 이르렀을 때, 생성물 농도의 곱을 반응물 농도의 곱으로 나눈 값(각 농도에 계수를 지수로 붙임)입니다. K로 나타냅니다.' },
      { term: '화학 평형 법칙', def: '일정한 온도에서 가역 반응이 평형에 이르면 평형 상수 식의 값이 처음 농도와 관계없이 일정하다는 법칙입니다.' },
      { term: '평형 농도', def: '반응이 평형에 이르렀을 때 각 물질의 몰 농도입니다. 평형 상수는 평형 농도로만 구합니다.' },
      { term: '반응 지수', def: '평형 상수 식과 같은 꼴에 어느 순간의 농도를 넣어 구한 값입니다. Q로 나타내며, K와 비교해 반응의 진행 방향을 예측합니다.' },
      { term: '처음·변화·평형 표', def: '처음 양, 반응한 양(계수비를 따름), 평형에서의 양을 세 줄로 정리해 평형 농도를 구하는 방법입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', unit: 'M', concept: 0,
        q: '용액 0.5 L 속에 용질이 0.2 mol 녹아 있습니다. 이 용액의 몰 농도는 몇 M일까요?',
        answer: '0.4',
        wrong: [
          { a: '0.1', why: '물질의 양에 부피를 곱했습니다. 몰 농도는 물질의 양을 부피로 나눈 값입니다.' },
          { a: '2.5', why: '부피를 물질의 양으로 나누었습니다. 물질의 양(mol)을 부피(L)로 나눕니다.' },
        ],
        explain: '몰 농도 $=\\dfrac{0.2\\text{ mol}}{0.5\\text{ L}}=0.4$ M입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1,
        q: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)의 평형 상수 식으로 옳은 것은 무엇일까요?',
        choices: [
          '$K=\\dfrac{[\\mathrm{NH₃}]^2}{[\\mathrm{N₂}][\\mathrm{H₂}]^3}$',
          '$K=\\dfrac{[\\mathrm{NH₃}]}{[\\mathrm{N₂}][\\mathrm{H₂}]}$',
          '$K=\\dfrac{[\\mathrm{N₂}][\\mathrm{H₂}]^3}{[\\mathrm{NH₃}]^2}$',
          '$K=\\dfrac{2[\\mathrm{NH₃}]}{[\\mathrm{N₂}]\\times3[\\mathrm{H₂}]}$',
        ],
        answer: 0,
        why: ['', '계수를 지수로 붙이지 않았습니다. NH₃에는 2, H₂에는 3을 지수로 붙입니다.', '분자와 분모를 바꾸었습니다. 생성물이 분자, 반응물이 분모입니다.', '계수를 곱했습니다. 계수는 곱하지 않고 지수로 붙입니다.'],
        explain: '생성물 NH₃의 농도에 계수 2를 지수로 붙여 분자에, 반응물 N₂와 H₂의 농도에 계수 1과 3을 지수로 붙여 분모에 씁니다.',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 2,
        q: '온도가 일정하면, 처음 넣어 준 물질의 농도를 바꾸어도 평형 상수는 같은 값이 나옵니다.',
        answer: true,
        explain: '처음 농도가 다르면 평형 농도는 달라지지만, 평형 농도로 구한 평형 상수는 온도가 같으면 일정합니다. 평형 상수를 바꾸는 것은 온도입니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', concept: 2,
        q: 'H₂(g) + I₂(g) ⇌ 2HI(g) 반응이 평형일 때 [H₂] = 0.1 M, [I₂] = 0.2 M, [HI] = 0.4 M입니다. 평형 상수 K는 얼마일까요?',
        answer: '8',
        wrong: [
          { a: '20', why: '[HI]를 제곱하지 않았습니다. 계수 2를 지수로 붙여 $(0.4)^2$으로 계산합니다.' },
          { a: '0.125', why: '분자와 분모를 바꾸었습니다. 생성물(HI)이 분자입니다.' },
        ],
        explain: '$K=\\dfrac{[\\mathrm{HI}]^2}{[\\mathrm{H₂}][\\mathrm{I₂}]}=\\dfrac{(0.4)^2}{(0.1)(0.2)}=\\dfrac{0.16}{0.02}=8$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 3,
        q: '평형 상수 K가 1보다 매우 큰 반응에 대한 설명으로 옳은 것은 무엇일까요?',
        choices: ['평형에서 생성물이 반응물보다 훨씬 많다.', '평형에서 반응물이 생성물보다 훨씬 많다.', '평형에서 반응물과 생성물의 농도가 같다.', '반응이 매우 빠르게 평형에 도달한다.'],
        answer: 0,
        why: ['', '반대입니다. 반응물이 대부분인 것은 K가 매우 작을 때입니다.', '농도가 비슷하면 K는 1에 가깝습니다.', 'K는 평형에서의 양의 비율만 알려 줄 뿐 반응 속도는 알려 주지 않습니다.'],
        explain: 'K는 생성물 농도를 분자에 둔 값이므로, K가 매우 크면 평형에서 생성물이 반응물보다 훨씬 많습니다.',
      },
      {
        id: 'p6', level: 1, type: 'ox', concept: 5,
        q: '어느 순간의 반응 지수 Q가 평형 상수 K보다 작으면, 반응은 정반응 쪽으로 진행합니다.',
        answer: true,
        explain: 'Q < K이면 생성물이 평형보다 적은 상태이므로 정반응 쪽으로 진행해 생성물이 늘고 Q가 커져 K에 가까워집니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 4,
        q: '반응 지수 Q에 대한 설명으로 옳은 것은 무엇일까요?',
        choices: ['어느 순간의 농도를 평형 상수 식과 같은 꼴에 넣어 구한 값이다.', '반응이 평형에 이르렀을 때만 구할 수 있는 값이다.', '정반응 속도를 역반응 속도로 나누어 구한 값이다.', '반응물 농도의 합을 생성물 농도의 합으로 나눈 값이다.'],
        answer: 0,
        why: [
          '',
          '평형에서만 구하는 것은 평형 상수 K입니다. Q는 아무 때나 지금 농도로 구할 수 있습니다.',
          'Q는 반응 속도가 아니라 농도로 구합니다.',
          'Q는 농도를 더하지 않고 곱하며, 생성물이 분자입니다.',
        ],
        explain: 'Q는 평형 상수 식과 같은 꼴에 지금 이 순간의 농도를 넣은 값입니다. 평형에 이르면 Q = K가 됩니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 3,
        q: '어떤 온도에서 N₂O₄(g) ⇌ 2NO₂(g)의 평형 상수는 0.2입니다. 같은 온도에서 2NO₂(g) ⇌ N₂O₄(g)의 평형 상수는 얼마일까요?',
        answer: '5',
        hint: '두 반응의 평형 상수 식을 나란히 써 보세요.',
        wrong: [
          { a: '0.2', why: '반응식의 방향이 바뀌면 평형 상수 식의 분자와 분모가 바뀝니다. 그대로 쓰면 안 됩니다.' },
          { a: '-0.2', why: '방향이 바뀌면 부호가 바뀌는 것이 아니라 역수가 됩니다.' },
        ],
        explain: '정반응은 $K=\\dfrac{[\\mathrm{NO₂}]^2}{[\\mathrm{N₂O₄}]}=0.2$, 역반응은 $K\'=\\dfrac{[\\mathrm{N₂O₄}]}{[\\mathrm{NO₂}]^2}$로 분자와 분모가 서로 바뀝니다. 그래서 $K\'=\\dfrac{1}{0.2}=5$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', fixed: true, concept: 5,
        q: '어떤 온도에서 CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)의 평형 상수는 K = 1입니다. 어느 순간 [CO] = 0.2 M, [H₂O] = 0.2 M, [CO₂] = 0.4 M, [H₂] = 0.4 M이었다면 반응은 어떻게 될까요?',
        choices: ['정반응 쪽으로 진행한다.', '역반응 쪽으로 진행한다.', '평형 상태라서 농도가 변하지 않는다.'],
        answer: 1,
        why: ['Q를 다시 계산해 보세요. $Q=4$로 K보다 크므로 생성물이 평형보다 많습니다.', '', 'Q = 4이고 K = 1이므로 Q와 K가 같지 않습니다. 아직 평형이 아닙니다.'],
        hint: '먼저 지금 농도로 Q를 구하세요.',
        explain: '$Q=\\dfrac{[\\mathrm{CO₂}][\\mathrm{H₂}]}{[\\mathrm{CO}][\\mathrm{H₂O}]}=\\dfrac{(0.4)(0.4)}{(0.2)(0.2)}=4$입니다. Q > K이므로 역반응 쪽으로 진행해 CO와 H₂O가 늘고 CO₂와 H₂가 줄어듭니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 2,
        q: '부피가 2 L인 밀폐 용기에서 N₂O₄(g) ⇌ 2NO₂(g) 반응이 평형에 이르렀을 때 N₂O₄ 0.8 mol과 NO₂ 0.4 mol이 들어 있었습니다. 평형 상수 K는 얼마일까요?',
        answer: '0.1',
        hint: '몰수를 먼저 몰 농도로 바꾸세요.',
        wrong: [
          { a: '0.2', why: '몰수를 그대로 넣었습니다. 부피 2 L로 나누어 [N₂O₄] = 0.4 M, [NO₂] = 0.2 M으로 바꾼 뒤 계산합니다.' },
          { a: '10', why: '분자와 분모를 바꾸었습니다. 생성물 NO₂가 분자입니다.' },
        ],
        explain: '[N₂O₄] = 0.8 ÷ 2 = 0.4 M, [NO₂] = 0.4 ÷ 2 = 0.2 M입니다. $K=\\dfrac{(0.2)^2}{0.4}=\\dfrac{0.04}{0.4}=0.1$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'ox', concept: 3,
        q: '평형 상수가 큰 반응일수록 평형에 빨리 도달합니다.',
        answer: false,
        explain: '평형 상수는 평형에서 생성물과 반응물의 양의 비율을 알려 줄 뿐, 평형에 이르는 빠르기(반응 속도)와는 관계가 없습니다. K가 커도 매우 느린 반응이 있습니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 1,
        q: 'CaCO₃(s) ⇌ CaO(s) + CO₂(g)의 평형 상수 식으로 옳은 것은 무엇일까요?',
        choices: ['$K=[\\mathrm{CO₂}]$', '$K=\\dfrac{[\\mathrm{CaO}][\\mathrm{CO₂}]}{[\\mathrm{CaCO₃}]}$', '$K=\\dfrac{[\\mathrm{CaCO₃}]}{[\\mathrm{CaO}][\\mathrm{CO₂}]}$', '$K=\\dfrac{1}{[\\mathrm{CO₂}]}$'],
        answer: 0,
        why: ['', '고체(s)는 농도가 거의 일정하므로 평형 상수 식에 쓰지 않습니다.', '고체를 넣었고, 분자와 분모도 바뀌었습니다.', '생성물 CO₂는 분모가 아니라 분자에 씁니다.'],
        explain: 'CaCO₃와 CaO는 고체라서 평형 상수 식에 쓰지 않습니다. 남는 것은 생성물인 기체 CO₂뿐이므로 $K=[\\mathrm{CO₂}]$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 2,
        q: '부피가 1 L인 밀폐 용기에 H₂ 1.0 mol과 I₂ 1.0 mol을 넣었더니 H₂(g) + I₂(g) ⇌ 2HI(g) 반응이 일어나 평형에서 HI가 1.6 mol 있었습니다. 이 온도에서 평형 상수 K는 얼마일까요?',
        answer: '64',
        hint: '처음 → 변화 → 평형 표로 평형에서 H₂와 I₂의 양을 먼저 구하세요.',
        wrong: [
          { a: '2.56', why: '처음 농도(1.0 M)를 분모에 넣었습니다. 평형 상수에는 평형 농도(0.2 M)를 넣어야 합니다.' },
          { a: '40', why: '[HI]를 제곱하지 않았습니다. 계수 2를 지수로 붙입니다.' },
        ],
        explain: 'HI 1.6 mol이 생기려면 H₂와 I₂가 0.8 mol씩 반응하므로 평형에서 [H₂] = [I₂] = 0.2 M, [HI] = 1.6 M입니다. $K=\\dfrac{(1.6)^2}{(0.2)(0.2)}=\\dfrac{2.56}{0.04}=64$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 5,
        q: '어떤 온도에서 N₂O₄(g) ⇌ 2NO₂(g)의 평형 상수는 0.4입니다. 같은 온도에서 밀폐 용기에 [N₂O₄] = 0.1 M, [NO₂] = 0.1 M이 되도록 두 기체를 넣었습니다. 이후 농도 변화로 옳은 것은 무엇일까요?',
        choices: ['[NO₂]는 커지고 [N₂O₄]는 작아진다.', '[NO₂]는 작아지고 [N₂O₄]는 커진다.', '두 농도 모두 변하지 않는다.', '두 농도가 같으므로 처음부터 평형이다.'],
        answer: 0,
        why: [
          '',
          '그렇게 되려면 Q > K여야 합니다. 지금은 Q = 0.1로 K보다 작습니다.',
          '농도가 변하지 않으려면 Q = K여야 합니다.',
          '평형은 농도가 같은 상태가 아니라 Q = K인 상태입니다.',
        ],
        hint: '지금 농도로 Q를 구해 0.4와 비교하세요.',
        explain: '$Q=\\dfrac{(0.1)^2}{0.1}=0.1$로 K = 0.4보다 작습니다. 정반응 쪽으로 진행하므로 NO₂는 늘고 N₂O₄는 줄어듭니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', unit: 'M', concept: 2,
        q: '어떤 온도에서 PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)의 평형 상수는 0.5입니다. 이 온도의 평형 상태에서 [PCl₃] = 0.2 M, [Cl₂] = 0.2 M이었다면 [PCl₅]는 몇 M일까요?',
        answer: '0.08',
        hint: '평형 상수 식에 아는 값을 넣고 [PCl₅]를 구하세요.',
        wrong: [
          { a: '0.02', why: '분자와 분모 관계를 거꾸로 썼습니다. $0.5=\\dfrac{0.04}{[\\mathrm{PCl₅}]}$이므로 [PCl₅]는 0.04를 0.5로 나눈 값입니다.' },
          { a: '0.8', why: '[PCl₃]와 [Cl₂]를 곱하지 않고 더했습니다. $0.2\\times0.2=0.04$입니다.' },
        ],
        explain: '$K=\\dfrac{[\\mathrm{PCl₃}][\\mathrm{Cl₂}]}{[\\mathrm{PCl₅}]}$이므로 $0.5=\\dfrac{0.2\\times0.2}{[\\mathrm{PCl₅}]}$, $[\\mathrm{PCl₅}]=\\dfrac{0.04}{0.5}=0.08$ M입니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 3,
        q: '어떤 온도에서 H₂(g) + I₂(g) ⇌ 2HI(g)의 평형 상수는 64입니다. 같은 온도에서 2H₂(g) + 2I₂(g) ⇌ 4HI(g)의 평형 상수는 얼마일까요?',
        choices: ['4096', '128', '64', '8'],
        answer: 0,
        why: ['', '계수가 2배가 되었다고 평형 상수를 2배 했습니다. 계수는 지수이므로 평형 상수는 제곱이 됩니다.', '계수가 바뀌면 평형 상수 식의 지수가 바뀌므로 값도 달라집니다.', '제곱근을 구했습니다. 계수가 2배가 되면 평형 상수는 제곱이 됩니다.'],
        hint: '새 반응식의 평형 상수 식을 쓰고 처음 식과 비교해 보세요.',
        explain: '새 식은 $K\'=\\dfrac{[\\mathrm{HI}]^4}{[\\mathrm{H₂}]^2[\\mathrm{I₂}]^2}=\\left(\\dfrac{[\\mathrm{HI}]^2}{[\\mathrm{H₂}][\\mathrm{I₂}]}\\right)^2$이므로 $K\'=64^2=4096$입니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 5,
        q: '어떤 온도에서 A(g) ⇌ 2B(g)의 평형 상수는 K = 2입니다. 부피가 1 L인 밀폐 용기에 A 0.5 mol과 B 1.0 mol을 넣었습니다. 이 순간에 대한 설명으로 옳은 것은 무엇일까요?',
        choices: ['평형 상태이므로 A와 B의 양이 변하지 않는다.', 'Q < K이므로 B가 늘어난다.', 'Q > K이므로 A가 늘어난다.', 'B가 A보다 많으므로 역반응 쪽으로 진행한다.'],
        answer: 0,
        why: [
          '',
          'Q를 다시 계산해 보세요. $Q=\\dfrac{(1.0)^2}{0.5}=2$로 K와 같습니다.',
          'Q를 다시 계산해 보세요. $Q=2$로 K보다 크지 않습니다.',
          '진행 방향은 양의 크기가 아니라 Q와 K의 비교로 정합니다.',
        ],
        hint: '부피가 1 L이므로 몰수와 몰 농도의 수가 같습니다.',
        explain: '[A] = 0.5 M, [B] = 1.0 M이므로 $Q=\\dfrac{[\\mathrm{B}]^2}{[\\mathrm{A}]}=\\dfrac{(1.0)^2}{0.5}=2$입니다. Q = K이므로 이미 평형 상태이고 농도가 변하지 않습니다.',
      },
    ],

    deeper: [
      {
        title: '평형 상수를 바꾸는 단 하나: 온도',
        body: '평형 상수는 처음 농도, 용기의 부피, 촉매와 관계없이 온도만 같으면 일정합니다. 온도가 바뀌면 정반응과 역반응의 빠르기가 서로 다르게 변하므로 평형 상수도 달라집니다.\n\n' +
          '예를 들어 2NO₂ ⇌ N₂O₄ 반응은 온도를 높이면 평형 상수가 작아져, 뜨거운 물에 담근 시험관의 적갈색이 더 진해집니다. 농도·압력·온도를 바꿀 때 평형이 어느 쪽으로 움직이는지는 다음 단원 "화학 평형의 이동"에서 Q와 K의 비교로 설명합니다.',
      },
      {
        title: '암모니아 공장의 고민: 평형과 속도',
        body: '암모니아 합성 반응 N₂ + 3H₂ ⇌ 2NH₃는 낮은 온도일수록 평형 상수가 커서 암모니아가 많이 생깁니다. 그런데 온도가 낮으면 반응이 너무 느려 평형에 이르기까지 오래 걸립니다.\n\n' +
          '그래서 실제 공장에서는 적당히 높은 온도와 높은 압력, 촉매를 함께 써서 "충분히 많이, 충분히 빨리" 만드는 조건을 찾습니다. 평형 상수(얼마나 많이)와 반응 속도(얼마나 빨리)가 서로 다른 질문이라는 것을 보여 주는 좋은 예입니다. 이 과정의 첫 단원에서 본 암모니아 합성의 성공 뒤에도 이런 화학이 숨어 있습니다.',
      },
    ],

    faq: [
      {
        q: '평형 상수에는 왜 단위를 안 붙여요?',
        a: '평형 상수 식의 지수에 따라 단위가 반응마다 달라지는데, 엄밀하게는 각 농도를 기준 농도(1 M)로 나눈 값을 쓰기 때문에 단위가 없는 수가 됩니다. 이 과정에서는 평형 상수를 단위 없이 수로만 나타낸다고 기억하면 됩니다.',
      },
      {
        q: '고체나 물은 왜 평형 상수 식에 안 넣어요?',
        a: '고체나 순수한 액체는 양이 늘거나 줄어도 그 물질 자체의 농도(빽빽한 정도)는 거의 변하지 않습니다. 변하지 않는 값은 평형 상수 안에 이미 포함된 것으로 보고 식에 따로 쓰지 않습니다. 그래서 CaCO₃(s) ⇌ CaO(s) + CO₂(g)의 평형 상수는 [CO₂]만으로 나타냅니다.',
      },
      {
        q: 'Q랑 K는 식이 똑같은데 뭐가 달라요?',
        a: '식의 꼴은 같지만 넣는 농도가 다릅니다. K에는 평형에서의 농도만 넣고, 그래서 온도가 같으면 늘 같은 값입니다. Q에는 아무 순간의 농도나 넣을 수 있어서 반응이 진행하는 동안 값이 계속 바뀌고, 평형에 이르면 K와 같아집니다.',
      },
      {
        q: '몰수를 그대로 넣으면 안 되나요?',
        a: '평형 상수는 몰 농도로 정의되므로 몰수를 부피로 나누어 몰 농도로 바꾼 뒤 넣어야 합니다. 부피가 1 L일 때는 수가 같아서 괜찮지만, 다른 부피에서는 계수의 합이 양쪽에서 다른 반응이라면 값이 달라집니다.',
      },
    ],

    mistakes: [
      '평형 상수 식에서 계수를 지수로 붙이지 않거나 곱하는 실수 — 2NO₂라면 $[\\mathrm{NO₂}]^2$처럼 지수로 붙입니다.',
      '처음 농도나 몰수를 그대로 평형 상수 식에 넣는 실수 — 평형 상수에는 평형에서의 몰 농도를 넣습니다. 처음 → 변화 → 평형 표와 부피 나누기를 잊지 마세요.',
      'Q > K일 때 정반응 쪽으로 진행한다고 하는 실수 — Q가 K보다 크면 생성물이 너무 많은 것이므로 역반응 쪽으로 진행합니다.',
    ],

    gens: [
      {
        id: 'molarity',
        level: 1,
        title: '몰 농도 구하기',
        make: function (R) {
          var F = R.F;
          var X = R.pick(['NO₂', 'N₂O₄', 'H₂', 'I₂', 'HI', 'NH₃']);
          if (R.bool()) {
            var V10 = R.pick([5, 10, 20, 40, 50]);      // 부피 (0.1 L 단위)
            var n10 = R.int(1, 30);                      // 물질의 양 (0.1 mol 단위)
            if (n10 === V10) n10 += 1;
            var V = F(V10, 10), n = F(n10, 10), M = n.div(V);
            var wrong = [];
            if (!n.mul(V).eq(M)) wrong.push({ a: numText(n.mul(V)), why: '물질의 양에 부피를 곱했습니다. 몰 농도는 물질의 양을 부피로 나눈 값입니다.' });
            if (!V.div(n).eq(M)) wrong.push({ a: numText(V.div(n)), why: '부피를 물질의 양으로 나누었습니다. 물질의 양(mol)을 부피(L)로 나눕니다.' });
            return {
              type: 'short', check: 'number', unit: 'M', concept: 0,
              q: '부피가 ' + V.toDecimal() + ' L인 밀폐 용기에 ' + X + '가 ' + n.toDecimal() + ' mol 들어 있습니다. [' + X + ']는 몇 M일까요?',
              answer: numText(M),
              wrong: wrong,
              explain: '$[\\mathrm{' + X + '}]=\\dfrac{' + n.toDecimal() + '\\text{ mol}}{' + V.toDecimal() + '\\text{ L}}=' + numText(M) + '$ M입니다.',
            };
          }
          var M2 = F(R.pick([1, 2, 4, 5, 10, 15, 20]), 10);   // 몰 농도
          var V2 = F(R.pick([2, 5, 20, 30, 40]), 10);          // 부피
          var nn = M2.mul(V2);
          var w2 = M2.div(V2).eq(nn) ? [] : [{ a: numText(M2.div(V2)), why: '몰 농도를 부피로 나누었습니다. 물질의 양 = 몰 농도 × 부피입니다.' }];
          return {
            type: 'short', check: 'number', unit: 'mol', concept: 0,
            q: '부피가 ' + V2.toDecimal() + ' L인 밀폐 용기 속 ' + X + '의 몰 농도가 ' + M2.toDecimal() + ' M입니다. 용기에 들어 있는 ' + X + '는 몇 mol일까요?',
            answer: numText(nn),
            wrong: w2,
            explain: '물질의 양 = 몰 농도 × 부피 = ' + M2.toDecimal() + ' M × ' + V2.toDecimal() + ' L = ' + numText(nn) + ' mol입니다.',
          };
        },
      },
      {
        id: 'k-calc',
        level: 1,
        title: '평형 농도로 평형 상수 구하기',
        make: function (R) {
          var F = R.F, rx, vals, k, tries = 0;
          do {
            rx = R.pick(RXNS);
            vals = {};
            rx.r.concat(rx.p).forEach(function (s) { vals[s[0]] = R.pick(CONC); });
            k = kValue(rx, vals, F);
            tries++;
          } while ((k.toDecimal(3) === null || k.cmp(F(1, 100)) < 0 || k.cmp(F(1000)) > 0) && tries < 40);
          if (k.toDecimal(3) === null || k.cmp(F(1, 100)) < 0 || k.cmp(F(1000)) > 0) {
            rx = RXNS[0]; vals = { 'N₂O₄': 4, 'NO₂': 2 }; k = kValue(rx, vals, F);
          }
          var kStr = k.toDecimal(3);
          var wrong = [];
          var inv = k.inv();
          if (!inv.eq(k)) wrong.push({ a: numText(inv), why: '분자와 분모를 바꾸었습니다. 생성물의 농도가 분자, 반응물의 농도가 분모입니다.' });
          var hasPow = rx.r.concat(rx.p).some(function (s) { return s[1] > 1; });
          if (hasPow) {
            var np = kValue(rx, vals, F, true);
            if (!np.eq(k) && !np.eq(inv)) wrong.push({ a: numText(np), why: '계수를 지수로 붙이지 않았습니다. 계수가 2인 물질은 농도를 제곱합니다.' });
          }
          return {
            type: 'short', check: 'number', concept: 2,
            q: rx.eq + ' 반응이 평형일 때 각 물질의 농도가 다음과 같습니다.\n\n' + concList(rx, vals, F) + '\n\n평형 상수 K는 얼마일까요?',
            answer: kStr,
            wrong: wrong,
            explain: '$' + kTex(rx) + '=' + subTex(rx, vals, F) + '=' + kStr + '$입니다.',
          };
        },
      },
      {
        id: 'q-direction',
        level: 2,
        title: '반응 지수로 진행 방향 예측하기',
        make: function (R) {
          var F = R.F, rx, vals, q, tries = 0;
          do {
            rx = R.pick(RXNS);
            vals = {};
            rx.r.concat(rx.p).forEach(function (s) { vals[s[0]] = R.pick(CONC); });
            q = kValue(rx, vals, F);
            tries++;
          } while ((q.toDecimal(3) === null || q.cmp(F(1, 100)) < 0 || q.cmp(F(100)) > 0) && tries < 40);
          if (q.toDecimal(3) === null || q.cmp(F(1, 100)) < 0 || q.cmp(F(100)) > 0) {
            rx = RXNS[0]; vals = { 'N₂O₄': 5, 'NO₂': 1 }; q = kValue(rx, vals, F);
          }
          var mode = R.pick(['lt', 'gt', 'eq', 'lt', 'gt']);
          var facs = R.shuffle([2, 4, 5, 10]), K = q;
          if (mode !== 'eq') {
            // K 가 소수 셋째 자리 안에서 끝나는 배수를 고른다 (없으면 평형인 경우로)
            var found = facs.some(function (fac) {
              K = mode === 'lt' ? q.mul(fac) : q.div(fac);
              return K.toDecimal(3) !== null;
            });
            if (!found) { mode = 'eq'; K = q; }
          }
          var qStr = numText(q), kStr = numText(K);
          var ans = mode === 'lt' ? 0 : mode === 'gt' ? 1 : 2;
          var rel = mode === 'lt' ? '<' : mode === 'gt' ? '>' : '=';
          var then = mode === 'lt'
            ? '생성물이 평형보다 적으므로 정반응 쪽으로 진행해 생성물이 늘고 Q가 커집니다.'
            : mode === 'gt'
              ? '생성물이 평형보다 많으므로 역반응 쪽으로 진행해 반응물이 늘고 Q가 작아집니다.'
              : '이미 평형 상태이므로 각 물질의 농도가 변하지 않습니다.';
          var whyLt = '정반응 쪽으로 진행하려면 Q < K여야 합니다. 이번에는 Q ' + rel + ' K입니다.';
          var whyGt = '역반응 쪽으로 진행하려면 Q > K여야 합니다. 이번에는 Q ' + rel + ' K입니다.';
          var whyEq = '평형이려면 Q = K여야 합니다. 이번에는 Q ' + rel + ' K입니다.';
          var why = [whyLt, whyGt, whyEq];
          why[ans] = '';
          return {
            type: 'choice', fixed: true, concept: 5,
            q: '어떤 온도에서 ' + rx.eq + '의 평형 상수는 K = ' + kStr + '입니다. 같은 온도에서 어느 순간의 농도가 다음과 같았습니다.\n\n' + concList(rx, vals, F) + '\n\n이후 반응은 어떻게 될까요?',
            choices: ['정반응 쪽으로 진행한다.', '역반응 쪽으로 진행한다.', '평형 상태라서 농도가 변하지 않는다.'],
            answer: ans,
            why: why,
            hint: '지금 농도로 Q를 구해 K와 비교하세요.',
            explain: '$' + kTex(rx, 'Q') + '=' + subTex(rx, vals, F) + '=' + qStr + '$이고 K = ' + kStr + '이므로 Q ' + rel + ' K입니다. ' + then,
          };
        },
      },
      {
        id: 'ice-k',
        level: 3,
        title: '처음 양과 평형 자료로 평형 상수 구하기',
        make: function (R) {
          var F = R.F, rx, V, n0, x, k, tries = 0, ok = false;
          var bad = function (f) { return f.toDecimal(4) === null || f.cmp(F(1, 100)) < 0 || f.cmp(F(1000)) > 0; };
          while (!ok && tries < 60) {
            tries++;
            rx = R.pick([RXNS[0], RXNS[1], RXNS[2]]);
            V = R.pick([1, 2]);
            n0 = rx.r.map(function () { return 2 * R.int(2, 10); });       // 0.1 mol 단위, 짝수
            var xmax = Math.min.apply(null, n0) - 1;
            x = R.int(1, xmax);
            var vals = {};
            rx.r.forEach(function (s, i) { vals[s[0]] = F(n0[i] - s[1] * x, 10 * V); });
            rx.p.forEach(function (s) { vals[s[0]] = F(s[1] * x, 10 * V); });
            k = F(1);
            rx.p.forEach(function (s) { k = k.mul(vals[s[0]].pow(s[1])); });
            rx.r.forEach(function (s) { k = k.div(vals[s[0]].pow(s[1])); });
            var fine = Object.keys(vals).every(function (key) { return vals[key].toDecimal(3) !== null; });
            ok = fine && !bad(k);
          }
          if (!ok) { rx = RXNS[1]; V = 1; n0 = [10, 10]; x = 8; k = F(64); }
          var P = rx.p[0];
          var mol = function (n10) { return F(n10, 10).toDecimal(); };
          var conc = function (n10) { return F(n10, 10 * V).toDecimal(); };
          var eqMol = {}, start = [];
          rx.r.forEach(function (s, i) { eqMol[s[0]] = n0[i] - s[1] * x; start.push(s[0] + ' ' + mol(n0[i]) + ' mol'); });
          rx.p.forEach(function (s) { eqMol[s[0]] = s[1] * x; });
          var sp = rx.r.concat(rx.p);
          var table = '| | ' + sp.map(function (s) { return s[0]; }).join(' | ') + ' |\n|' + sp.map(function () { return '---|'; }).join('') + '---|\n' +
            '| 처음(mol) | ' + rx.r.map(function (s, i) { return mol(n0[i]); }).concat(rx.p.map(function () { return '0'; })).join(' | ') + ' |\n' +
            '| 변화(mol) | ' + rx.r.map(function (s) { return '−' + mol(s[1] * x); }).concat(rx.p.map(function (s) { return '+' + mol(s[1] * x); })).join(' | ') + ' |\n' +
            '| 평형(mol) | ' + sp.map(function (s) { return mol(eqMol[s[0]]); }).join(' | ') + ' |\n' +
            '| 평형 농도(M) | ' + sp.map(function (s) { return conc(eqMol[s[0]]); }).join(' | ') + ' |';
          function side(list) {
            return list.map(function (s) {
              var v = conc(eqMol[s[0]]);
              return s[1] > 1 ? '(' + v + ')^' + s[1] : (list.length > 1 ? '(' + v + ')' : v);
            }).join('');
          }
          var sub = '\\dfrac{' + side(rx.p) + '}{' + side(rx.r) + '}';
          var kStr = numText(k);
          var wrong = [];
          // 몰수를 그대로 넣은 경우(부피 2 L 일 때만 다를 수 있다)
          var km = F(1);
          rx.p.forEach(function (s) { km = km.mul(F(eqMol[s[0]], 10).pow(s[1])); });
          rx.r.forEach(function (s) { km = km.div(F(eqMol[s[0]], 10).pow(s[1])); });
          if (!km.eq(k)) wrong.push({ a: numText(km), why: '몰수를 그대로 넣었습니다. 부피 ' + V + ' L로 나누어 몰 농도로 바꾼 뒤 계산합니다.' });
          // 처음 양(몰 농도)을 반응물 자리에 넣은 경우
          var k0 = F(1);
          rx.p.forEach(function (s) { k0 = k0.mul(F(eqMol[s[0]], 10 * V).pow(s[1])); });
          rx.r.forEach(function (s, i) { k0 = k0.div(F(n0[i], 10 * V).pow(s[1])); });
          if (!k0.eq(k) && !k0.eq(km)) wrong.push({ a: numText(k0), why: '반응물의 처음 농도를 넣었습니다. 평형 상수에는 반응하고 남은 평형 농도를 넣습니다.' });
          return {
            type: 'short', check: 'number', concept: 2,
            q: '부피가 ' + V + ' L인 밀폐 용기에 ' + start.join('과 ') + '을 넣었더니 ' + rx.eq + ' 반응이 일어나 평형에서 ' + P[0] + '가 ' + mol(P[1] * x) + ' mol 있었습니다. 이 온도에서 평형 상수 K는 얼마일까요?',
            answer: kStr,
            wrong: wrong,
            hint: '처음 → 변화 → 평형 표를 그린 뒤, 평형의 몰수를 부피로 나누어 몰 농도로 바꾸세요.',
            explain: '계수비에 따라 표를 정리합니다.\n\n' + table + '\n\n$' + kTex(rx) + '=' + sub + '=' + kStr + '$입니다.',
          };
        },
      },
    ],
  });
})();
