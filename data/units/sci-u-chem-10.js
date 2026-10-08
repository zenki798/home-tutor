/* 일반화학 · 열역학과 전기화학
 * 대학 1학년 일반화학 수준. 표준 상태 25 °C(298 K), R = 8.314 J/(mol·K), F = 96485 C/mol(문제에서는 96500 으로 어림),
 * 25 °C 에서 2.303RT/F = 0.0592 V 를 쓴다. 표준 환원 전위는 흔히 쓰는 표의 값(소수 둘째 자리)이다.
 * 계산 문제(ΔG, 경계 온도, ΔG°와 K, 전지 전위, ΔG° = −nFE°, 네른스트 식, 패러데이 법칙)는 생성기로 낸다. */
(function () {
  // 다니엘 전지 그림 — 아연 반쪽 전지와 구리 반쪽 전지, 염다리, 전압계
  var CELL_FIG = '<svg viewBox="0 0 300 205">' +
    '<path d="M20,88 L20,178 L120,178 L120,88" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
    '<path d="M180,88 L180,178 L280,178 L280,88" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
    '<rect x="21" y="108" width="98" height="69" fill="var(--fig-1)" opacity="0.25"/>' +
    '<rect x="181" y="108" width="98" height="69" fill="var(--fig-2)" opacity="0.25"/>' +
    '<path d="M100,150 L100,72 L200,72 L200,150" fill="none" stroke="var(--fig-4)" stroke-width="9" stroke-linejoin="round" opacity="0.7"/>' +
    '<text x="150" y="66" font-size="10" text-anchor="middle" fill="currentColor">염다리 (KNO₃)</text>' +
    '<rect x="50" y="56" width="14" height="104" fill="var(--fig-3)" stroke="currentColor" stroke-width="1"/>' +
    '<rect x="236" y="56" width="14" height="104" fill="var(--fig-3)" stroke="currentColor" stroke-width="1"/>' +
    '<polyline points="57,56 57,28 136,28" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
    '<polyline points="164,28 243,28 243,56" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
    '<circle cx="150" cy="28" r="14" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
    '<text x="150" y="32" font-size="12" text-anchor="middle" fill="currentColor">V</text>' +
    '<text x="96" y="20" font-size="10" text-anchor="middle" fill="currentColor">전자 e⁻ →</text>' +
    '<text x="76" y="140" font-size="10" fill="currentColor">Zn²⁺</text>' +
    '<text x="190" y="140" font-size="10" fill="currentColor">Cu²⁺</text>' +
    '<text x="70" y="195" font-size="10" text-anchor="middle" fill="currentColor">Zn 전극: 산화극(−)</text>' +
    '<text x="230" y="195" font-size="10" text-anchor="middle" fill="currentColor">Cu 전극: 환원극(+)</text>' +
    '</svg>';

  // 표준 환원 전위(25 °C) — E 는 0.01 V 단위 정수 (생성기용)
  var METALS = [
    { m: 'Ag', ion: 'Ag⁺', z: 1, E: 80 },
    { m: 'Cu', ion: 'Cu²⁺', z: 2, E: 34 },
    { m: 'Pb', ion: 'Pb²⁺', z: 2, E: -13 },
    { m: 'Fe', ion: 'Fe²⁺', z: 2, E: -44 },
    { m: 'Zn', ion: 'Zn²⁺', z: 2, E: -76 },
    { m: 'Mg', ion: 'Mg²⁺', z: 2, E: -237 },
  ];

  Tutor.registerUnit({
    id: 'sci-u-chem-10',
    course: 'sci-u-chem',
    title: '열역학과 전기화학',
    summary: '엔트로피와 깁스 자유 에너지로 반응의 자발성을 판단하고, 전지의 전위와 전기 분해를 정량적으로 다룹니다.',
    goals: [
      '엔트로피 변화의 부호를 예측하고, 열역학 제2법칙으로 우주의 엔트로피 변화와 자발성을 연결할 수 있다.',
      '$\\Delta G=\\Delta H-T\\Delta S$로 반응의 자발성과 경계 온도를 구하고, $\\Delta G^\\circ=-RT\\ln K$로 평형 상수와 연결할 수 있다.',
      '표준 환원 전위로 갈바니 전지의 전위를 구하고, $\\Delta G^\\circ=-nFE^\\circ$와 네른스트 식을 쓸 수 있다.',
      '패러데이 법칙으로 전기 분해에서 석출되는 물질의 양과 필요한 시간을 계산할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '엔트로피와 열역학 제2법칙',
        body: '뜨거운 커피가 식고, 향기가 방 안에 퍼지는 것처럼 저절로 일어나는 변화를 **자발적 과정**이라고 합니다. 이런 변화의 방향을 정해 주는 양이 **엔트로피** $S$입니다. 엔트로피는 에너지와 입자가 얼마나 넓게 흩어져 있는지, 곧 계가 취할 수 있는 미시적 상태의 수 $W$를 나타냅니다($S=k\\ln W$, $k$는 볼츠만 상수).\n\n**열역학 제2법칙**: 자발적 과정에서는 **우주**(계 + 주위)의 엔트로피가 증가합니다.\n\n$\\Delta S_{\\text{우주}}=\\Delta S_{\\text{계}}+\\Delta S_{\\text{주위}}>0$\n\n일정한 온도·압력에서 계가 열을 내놓으면 주위가 그 열을 받아 주위의 엔트로피가 늘어납니다: $\\Delta S_{\\text{주위}}=-\\dfrac{\\Delta H_{\\text{계}}}{T}$. 그래서 계의 엔트로피가 줄어드는 과정도, 주위의 엔트로피가 그보다 더 많이 늘면 자발적일 수 있습니다(예: 0 °C 아래에서 물이 어는 것).\n\n**$\\Delta S$의 부호 예측**\n\n| $\\Delta S>0$ (증가) | $\\Delta S<0$ (감소) |\n|---|---|\n| 고체 → 액체 → 기체 | 기체 → 액체 → 고체 |\n| 기체 분자 수가 늘어나는 반응 | 기체 분자 수가 줄어드는 반응 |\n| 고체가 물에 녹음(대부분) | 기체가 액체에 녹음 |\n| 온도 상승 | 온도 하강 |\n\n**열역학 제3법칙**: 0 K의 완전한 결정은 $S=0$입니다. 그래서 물질마다 절대 엔트로피, 곧 **표준 몰 엔트로피** $S^\\circ$(J/(mol·K))를 정할 수 있고, 반응의 엔트로피 변화는 다음과 같습니다.\n\n$\\Delta S^\\circ=\\sum nS^\\circ(\\text{생성물})-\\sum nS^\\circ(\\text{반응물})$\n\n상전이처럼 평형에서 일어나는 과정은 $\\Delta S=\\dfrac{\\Delta H}{T}$입니다. 얼음이 0 °C에서 녹을 때 $\\Delta S=\\dfrac{6010\\ \\text{J/mol}}{273\\ \\text{K}}=22.0$ J/(mol·K)입니다.',
        easy: '새 카드 한 벌을 섞으면 순서가 뒤죽박죽이 되지만, 아무리 섞어도 처음처럼 정렬된 순서로 돌아오지는 않습니다. 뒤섞인 배열이 정렬된 배열보다 압도적으로 많기 때문입니다. 엔트로피는 이렇게 "가능한 배열의 수"를 재는 양이고, 자연은 배열이 많은 쪽으로 흘러갑니다.\n\n다만 방 하나(계)만 보면 정리될 수도 있습니다. 냉장고가 물을 얼리는 것처럼요. 그때는 바깥(주위)에 더 큰 무질서를 내보내고 있으므로, 방과 바깥을 합친 전체(우주)의 엔트로피는 늘어납니다.',
        check: {
          type: 'ox',
          q: '계의 엔트로피가 줄어드는 과정은 결코 자발적으로 일어날 수 없다.',
          answer: false,
          explain: '자발성은 **우주**의 엔트로피로 판단합니다. 물이 0 °C 아래에서 얼 때 계의 엔트로피는 줄지만, 내놓은 열이 주위의 엔트로피를 더 크게 늘려 $\\Delta S_{\\text{우주}}>0$이므로 자발적입니다.',
        },
      },
      {
        title: '깁스 자유 에너지와 자발성',
        body: '우주의 엔트로피를 계의 양만으로 판단할 수 있게 만든 것이 **깁스 자유 에너지** $G=H-TS$입니다. 온도와 압력이 일정할 때\n\n$\\Delta G=\\Delta H-T\\Delta S$\n\n이고, $\\Delta G=-T\\Delta S_{\\text{우주}}$이므로 다음이 성립합니다.\n\n- $\\Delta G<0$: 자발적 (정반응이 저절로 진행할 수 있음)\n- $\\Delta G=0$: 평형\n- $\\Delta G>0$: 비자발적 (역반응이 자발적)\n\n**네 가지 경우**\n\n| $\\Delta H$ | $\\Delta S$ | 자발성 |\n|---|---|---|\n| − | + | 모든 온도에서 자발적 |\n| + | − | 모든 온도에서 비자발적 |\n| − | − | 낮은 온도에서 자발적 |\n| + | + | 높은 온도에서 자발적 |\n\n$\\Delta H$와 $\\Delta S$의 부호가 같으면 $\\Delta G=0$이 되는 **경계 온도** $T=\\dfrac{\\Delta H}{\\Delta S}$를 기준으로 자발성이 바뀝니다.\n\n**예 — 암모니아 합성** N₂ + 3H₂ → 2NH₃: $\\Delta H^\\circ=-92.2$ kJ, $\\Delta S^\\circ=-198.7$ J/K. 298 K에서 $\\Delta G^\\circ=-92.2-298 \\times(-0.1987)=-33.0$ kJ로 자발적입니다. 경계 온도는 $\\dfrac{92200}{198.7}=464$ K로, 표준 상태에서는 이보다 높은 온도에서 비자발적이 됩니다.\n\n> ⚠️ $\\Delta H$는 보통 kJ, $\\Delta S$는 J/K로 주어집니다. **단위를 맞춘 뒤** 계산하세요($-198.7$ J/K = $-0.1987$ kJ/K).\n\n> 💡 표준 생성 자유 에너지 $\\Delta G_f^\\circ$를 쓰면 $\\Delta G^\\circ=\\sum n\\Delta G_f^\\circ(\\text{생성물})-\\sum n\\Delta G_f^\\circ(\\text{반응물})$로도 구합니다. 그리고 "자발적"은 **빠르다는 뜻이 아닙니다**. 다이아몬드가 흑연으로 바뀌는 반응은 자발적이지만 상온에서는 사실상 일어나지 않습니다.',
        easy: '$\\Delta G$는 "에너지로 이득인가($\\Delta H$)"와 "흩어짐으로 이득인가($\\Delta S$)"를 함께 따지는 저울입니다. 온도 $T$는 흩어짐 쪽 저울판에 곱하는 배율입니다.\n\n둘 다 이득이면(열을 내놓고 흩어짐도 늘면) 언제나 자발적, 둘 다 손해면 언제나 비자발적입니다. 하나는 이득이고 하나는 손해면 온도가 승부를 가릅니다. 온도가 높을수록 흩어짐(엔트로피) 쪽 목소리가 커집니다.',
        check: {
          type: 'choice',
          q: '$\\Delta H>0$이고 $\\Delta S>0$인 반응은 언제 자발적입니까?',
          choices: ['높은 온도에서만', '낮은 온도에서만', '모든 온도에서'],
          answer: 0,
          why: ['', '낮은 온도에서는 $T\\Delta S$가 작아 양수인 $\\Delta H$를 이기지 못하므로 $\\Delta G>0$입니다.', '$\\Delta H>0$이 자발성을 방해하므로 모든 온도에서 자발적일 수는 없습니다. 모든 온도에서 자발적인 것은 $\\Delta H<0$, $\\Delta S>0$인 경우입니다.'],
          explain: '$\\Delta G=\\Delta H-T\\Delta S$에서 $T$가 충분히 커져 $T\\Delta S>\\Delta H$가 되어야 $\\Delta G<0$입니다. 그래서 경계 온도 $\\frac{\\Delta H}{\\Delta S}$보다 높은 온도에서만 자발적입니다.',
        },
      },
      {
        title: '자유 에너지와 평형 상수',
        body: '표준 상태가 아닌 실제 조건의 $\\Delta G$는 반응 지수 $Q$에 따라 달라집니다.\n\n$\\Delta G=\\Delta G^\\circ+RT\\ln Q$\n\n평형에서는 $\\Delta G=0$이고 $Q=K$이므로\n\n$\\Delta G^\\circ=-RT\\ln K$\n\n가 됩니다. 앞 단원의 평형 상수가 열역학과 이렇게 이어집니다.\n\n| $\\Delta G^\\circ$ | $K$ | 평형에서 |\n|---|---|---|\n| 음수 | $K>1$ | 생성물이 우세 |\n| 0 | $K=1$ | 비슷함 |\n| 양수 | $K<1$ | 반응물이 우세 |\n\n25 °C(298 K)에서는 $\\ln K=2.303\\log K$이므로 $\\Delta G^\\circ=-(5.71\\ \\text{kJ/mol})\\log K$입니다. $\\Delta G^\\circ$가 5.71 kJ/mol 낮아질 때마다 $K$는 10배 커집니다.\n\n**예**: 암모니아 합성의 $\\Delta G^\\circ=-33.0$ kJ(298 K)이면 $\\ln K=\\dfrac{33000}{8.314 \\times 298}=13.3$, $K \\approx 6\\times10^{5}$입니다.\n\n> 💡 $\\ln K=-\\dfrac{\\Delta H^\\circ}{RT}+\\dfrac{\\Delta S^\\circ}{R}$로 쓰면 온도에 따른 $K$의 변화가 보입니다. 발열 반응($\\Delta H^\\circ<0$)은 온도가 오르면 $K$가 작아지는데, 이것이 르샤틀리에 원리의 열역학적 근거입니다.\n\n> ⚠️ $\\Delta G^\\circ$는 **표준 상태**(기체 1 bar, 용액 1 M)에서 반응할 때의 값입니다. 평형에서 0이 되는 것은 $\\Delta G$이지 $\\Delta G^\\circ$가 아닙니다.',
        easy: '$\\Delta G^\\circ$는 "출발선(표준 상태)에서 반응이 얼마나 내리막인가"를 말합니다. 내리막이 가파를수록(크게 음수일수록) 공은 생성물 쪽 골짜기 깊숙이 굴러가 평형에서 생성물이 많아집니다. 그래서 $K$가 큽니다.\n\n공이 골짜기 바닥(평형)에 멈추면 더 굴러갈 내리막이 없으므로 그때의 $\\Delta G$는 0입니다.',
        check: {
          type: 'choice',
          q: '어떤 반응의 $\\Delta G^\\circ$가 양수입니다. 이 반응의 평형 상수 $K$에 대해 옳은 것은 무엇입니까?',
          choices: ['$K<1$', '$K>1$', '$K<0$'],
          answer: 0,
          why: ['', '$K>1$이면 $\\ln K>0$이라 $\\Delta G^\\circ=-RT\\ln K$가 음수가 됩니다.', '평형 상수는 언제나 양수입니다. $\\Delta G^\\circ>0$이면 $\\ln K<0$, 곧 $0<K<1$입니다.'],
          explain: '$\\Delta G^\\circ=-RT\\ln K>0$이면 $\\ln K<0$이므로 $0<K<1$입니다. 평형에서 반응물이 우세합니다.',
        },
      },
      {
        title: '갈바니 전지와 표준 환원 전위',
        body: '**갈바니 전지**(화학 전지)는 자발적인 산화·환원 반응의 에너지를 전기 에너지로 바꿉니다. 아연판을 Zn²⁺ 용액에, 구리판을 Cu²⁺ 용액에 넣고 도선과 염다리로 이은 **다니엘 전지**가 대표적입니다.\n\n- **산화 전극**(애노드, −극): Zn(s) → Zn²⁺(aq) + 2e⁻\n- **환원 전극**(캐소드, +극): Cu²⁺(aq) + 2e⁻ → Cu(s)\n- 전자는 도선을 따라 산화 전극에서 환원 전극으로 흐릅니다.\n- **염다리**의 이온이 움직여 두 용액의 전하 균형을 맞춥니다(음이온은 산화 전극 쪽으로).\n- 전지 표기: Zn(s) | Zn²⁺(aq) ‖ Cu²⁺(aq) | Cu(s) — 왼쪽이 산화 전극, ‖는 염다리입니다.\n\n**표준 환원 전위** $E^\\circ$는 표준 수소 전극(2H⁺ + 2e⁻ → H₂, $E^\\circ=0$ V)을 기준으로 잰 반쪽 반응의 환원 경향입니다(25 °C, 1 M, 1 bar).\n\n| 반쪽 반응(환원) | $E^\\circ$ (V) |\n|---|---|\n| Cl₂ + 2e⁻ → 2Cl⁻ | +1.36 |\n| Ag⁺ + e⁻ → Ag | +0.80 |\n| Cu²⁺ + 2e⁻ → Cu | +0.34 |\n| 2H⁺ + 2e⁻ → H₂ | 0.00 |\n| Pb²⁺ + 2e⁻ → Pb | −0.13 |\n| Fe²⁺ + 2e⁻ → Fe | −0.44 |\n| Zn²⁺ + 2e⁻ → Zn | −0.76 |\n| Mg²⁺ + 2e⁻ → Mg | −2.37 |\n\n$E^\\circ$가 클수록 환원되기 쉽고(강한 산화제), 작을수록 그 금속이 산화되기 쉽습니다(강한 환원제).\n\n$E^\\circ_{\\text{전지}}=E^\\circ_{\\text{환원 전극}}-E^\\circ_{\\text{산화 전극}}$\n\n다니엘 전지는 $E^\\circ_{\\text{전지}}=0.34-(-0.76)=1.10$ V입니다. $E^\\circ_{\\text{전지}}>0$이면 그 방향의 반응이 표준 상태에서 자발적입니다.\n\n> ⚠️ 반쪽 반응에 계수를 곱해도 $E^\\circ$는 **곱하지 않습니다**. 전위는 전자 1몰당 에너지(세기 성질)이기 때문입니다.',
        easy: '전자를 두고 줄다리기를 한다고 생각해 보세요. $E^\\circ$는 "전자를 끌어당기는 힘"입니다. 구리 이온(+0.34 V)이 아연 이온(−0.76 V)보다 전자를 더 세게 당기므로, 아연이 전자를 내놓고(산화) 구리 이온이 그 전자를 받습니다(환원).\n\n두 힘의 차이 $0.34-(-0.76)=1.10$ V가 전자를 도선으로 밀어 주는 "전기적 압력", 곧 전지의 전압입니다.',
        fig: { type: 'svg', svg: CELL_FIG, alt: '다니엘 전지. 왼쪽 비커는 Zn²⁺ 용액에 아연 전극이 담긴 산화극(−), 오른쪽 비커는 Cu²⁺ 용액에 구리 전극이 담긴 환원극(+)이다. 두 전극은 위쪽 도선과 전압계 V로 이어져 있고 전자는 왼쪽에서 오른쪽으로 흐른다. 두 비커 사이에는 거꾸로 된 U자 모양의 염다리(KNO₃)가 걸쳐 있다.' },
        check: {
          type: 'short', check: 'number', unit: 'V',
          q: '카드의 표를 이용해 Fe(s) | Fe²⁺(aq) ‖ Cu²⁺(aq) | Cu(s) 전지의 표준 전지 전위를 구하세요.',
          answer: '0.78',
          wrong: [
            { a: '-0.10', why: '두 전위를 더했습니다. $E^\\circ_{\\text{전지}}$는 (환원 전극) − (산화 전극)입니다.' },
            { a: '-0.78', why: '빼는 순서가 거꾸로입니다. 환원 전극(Cu)의 전위에서 산화 전극(Fe)의 전위를 뺍니다.' },
          ],
          explain: '환원 전극은 Cu(+0.34 V), 산화 전극은 Fe(−0.44 V)입니다. $E^\\circ_{\\text{전지}}=0.34-(-0.44)=0.78$ V입니다.',
        },
      },
      {
        title: '전지 전위와 자유 에너지, 네른스트 식',
        body: '전지가 하는 전기적 일은 자유 에너지 감소와 같습니다.\n\n$\\Delta G=-nFE$, 표준 상태에서 $\\Delta G^\\circ=-nFE^\\circ$\n\n$n$은 균형 맞춘 반응에서 이동하는 전자의 몰수, $F=96485$ C/mol은 **패러데이 상수**(전자 1몰의 전하량)입니다. $E^\\circ>0$이면 $\\Delta G^\\circ<0$, 곧 자발적입니다.\n\n다니엘 전지: $\\Delta G^\\circ=-2 \\times 96485 \\times 1.10=-2.12\\times10^{5}$ J $=-212$ kJ\n\n앞 카드의 $\\Delta G^\\circ=-RT\\ln K$와 합치면 25 °C에서\n\n$E^\\circ=\\dfrac{RT}{nF}\\ln K=\\dfrac{0.0592\\ \\text{V}}{n}\\log K$\n\n다니엘 전지는 $\\log K=\\dfrac{2 \\times 1.10}{0.0592}=37.2$로 $K \\approx 10^{37}$, 반응이 사실상 끝까지 갑니다.\n\n**네른스트 식**: 표준 상태가 아닐 때의 전지 전위입니다. $\\Delta G=\\Delta G^\\circ+RT\\ln Q$를 $-nF$로 나누면\n\n$E=E^\\circ-\\dfrac{RT}{nF}\\ln Q=E^\\circ-\\dfrac{0.0592\\ \\text{V}}{n}\\log Q$ (25 °C)\n\n다니엘 전지에서 $Q=\\dfrac{[\\mathrm{Zn²⁺}]}{[\\mathrm{Cu²⁺}]}$이므로(고체는 빠짐), $[\\mathrm{Zn²⁺}]=1.0$ M, $[\\mathrm{Cu²⁺}]=0.010$ M이면\n\n$E=1.10-\\dfrac{0.0592}{2}\\log 100=1.10-0.0592=1.04$ V\n\n전지를 쓰면 $Q$가 커져 $E$가 줄고, $Q=K$가 되면 $E=0$, 곧 **다 닳은 전지**입니다. 같은 전극이 농도만 다른 두 용액에 담긴 **농도차 전지**는 $E^\\circ=0$이지만 네른스트 식의 $\\log Q$ 항 때문에 전압이 생깁니다.',
        easy: '$E^\\circ$는 새 건전지의 전압이고, 네른스트 식은 "쓸수록 전압이 어떻게 떨어지는가"를 알려 줍니다. 반응이 진행해 생성물(Zn²⁺)이 쌓이고 반응물(Cu²⁺)이 줄면 반응하려는 의욕이 줄어 전압이 떨어집니다. 의욕이 완전히 사라진 평형 상태가 바로 다 쓴 건전지($E=0$)입니다.',
        check: {
          type: 'ox',
          q: '갈바니 전지가 방전되어 반응이 평형에 이르면 전지 전위 $E$는 0이 되고, 이때 반응 지수 $Q$는 평형 상수 $K$와 같다.',
          answer: true,
          explain: '평형에서는 $\\Delta G=0$이므로 $E=-\\dfrac{\\Delta G}{nF}=0$입니다. 네른스트 식에 $E=0$을 넣으면 $\\log Q=\\dfrac{nE^\\circ}{0.0592}=\\log K$, 곧 $Q=K$입니다.',
        },
      },
      {
        title: '전기 분해와 패러데이 법칙',
        body: '**전기 분해**는 바깥 전원으로 전기 에너지를 넣어 **비자발적인** 산화·환원 반응을 일으키는 것입니다. 금속 정련, 도금, 물의 분해, 알루미늄 생산이 모두 전기 분해입니다.\n\n- 전원의 (−)극에 이은 전극에서 **환원**(캐소드), (+)극에 이은 전극에서 **산화**(애노드)가 일어납니다. 갈바니 전지와 극의 부호가 반대인 점에 주의합니다.\n- 용융 NaCl: 환원 전극에서 Na⁺ + e⁻ → Na, 산화 전극에서 2Cl⁻ → Cl₂ + 2e⁻\n- NaCl **수용액**에서는 Na⁺보다 물이 더 쉽게 환원되어 환원 전극에서 H₂가 나옵니다(2H₂O + 2e⁻ → H₂ + 2OH⁻). 수용액 전기 분해는 물의 반응과 경쟁한다는 점을 함께 따집니다.\n\n**패러데이 법칙**: 전극에서 반응하는 물질의 양은 흘린 전하량에 비례합니다.\n\n$Q=It$ (전하량 C = 전류 A × 시간 s), 전자의 몰수 $=\\dfrac{Q}{F}$\n\n석출되는 금속의 몰수 $=\\dfrac{\\text{전자의 몰수}}{n}$ ($n$: 금속 이온 1개가 받는 전자 수)\n\n**예**: AgNO₃ 수용액에 5.00 A를 1930 s 동안 흘리면 $Q=5.00 \\times 1930=9650$ C, 전자는 $\\dfrac{9650}{96500}=0.100$ mol입니다. Ag⁺ + e⁻ → Ag이므로 은 0.100 mol, $0.100 \\times 107.9=10.8$ g이 석출됩니다. 같은 전하량으로 Cu²⁺ 용액에서는 전자 2개가 구리 1개를 만들므로 구리 0.0500 mol(3.18 g)이 석출됩니다.\n\n> ⚠️ 전기 분해 실험은 전원·약품·발생 기체(염소 등)를 다루므로 집에서 하지 않습니다. 실험실에서 지도 교수·조교와 안전 수칙에 따라 합니다.',
        easy: '전기 분해는 공을 언덕 위로 밀어 올리는 일입니다. 저절로는 일어나지 않으니 전원이 에너지를 넣어 줍니다.\n\n패러데이 법칙은 "전자 개수 세기"입니다. 전류는 1초에 지나가는 전하량이므로 전류 × 시간 = 지나간 전하량, 이것을 전자 1몰의 전하량(96500 C)으로 나누면 전자 몇 몰이 지나갔는지 압니다. 은 이온은 전자 1개, 구리 이온은 전자 2개를 받아야 금속 원자 하나가 됩니다.',
        check: {
          type: 'short', check: 'number', unit: 'mol',
          q: 'Cu²⁺ 수용액을 전기 분해해 전자 0.20 mol이 흘렀습니다. 석출되는 구리는 몇 mol입니까?',
          answer: '0.10',
          wrong: [
            { a: '0.20', why: '전자 1몰이 구리 1몰을 만든다고 보았습니다. Cu²⁺ + 2e⁻ → Cu이므로 전자 2몰이 구리 1몰을 만듭니다.' },
            { a: '0.40', why: '전자 수를 곱했습니다. 구리 몰수는 전자의 몰수를 2로 **나눈** 값입니다.' },
          ],
          explain: 'Cu²⁺ + 2e⁻ → Cu이므로 구리의 몰수는 전자 몰수의 절반입니다. $\\dfrac{0.20}{2}=0.10$ mol입니다.',
        },
      },
    ],

    examples: [
      {
        q: '2H₂(g) + O₂(g) → 2H₂O(l)의 $\\Delta S^\\circ$와 298 K에서의 $\\Delta G^\\circ$를 구하고 자발성을 판단하세요. ($\\Delta H^\\circ=-571.6$ kJ, $S^\\circ$: H₂(g) 130.7, O₂(g) 205.2, H₂O(l) 69.9 J/(mol·K))',
        steps: [
          '생성물: $2 \\times 69.9=139.8$ J/K, 반응물: $2 \\times 130.7+205.2=466.6$ J/K',
          '$\\Delta S^\\circ=139.8-466.6=-326.8$ J/K — 기체 3몰이 액체가 되므로 음수인 것이 자연스럽습니다.',
          '단위를 맞춥니다: $-326.8$ J/K $=-0.3268$ kJ/K',
          '$\\Delta G^\\circ=\\Delta H^\\circ-T\\Delta S^\\circ=-571.6-298 \\times(-0.3268)=-571.6+97.4=-474.2$ kJ',
          '$\\Delta G^\\circ<0$이므로 298 K, 표준 상태에서 자발적입니다. ($\\Delta H<0$, $\\Delta S<0$이라 아주 높은 온도에서는 비자발적이 됩니다.)',
        ],
        answer: '$\\Delta S^\\circ=-326.8$ J/K, $\\Delta G^\\circ=-474.2$ kJ (자발적)',
      },
      {
        q: '석회석의 분해 CaCO₃(s) → CaO(s) + CO₂(g)는 $\\Delta H^\\circ=+178$ kJ, $\\Delta S^\\circ=+161$ J/K입니다. 298 K에서 자발적입니까? 표준 상태에서 자발적이 되는 온도는 얼마 이상입니까?',
        steps: [
          '298 K: $\\Delta G^\\circ=178-298 \\times 0.161=178-48.0=+130$ kJ > 0이므로 비자발적입니다.',
          '$\\Delta H>0$, $\\Delta S>0$이므로 높은 온도에서 자발적입니다. 경계 온도는 $\\Delta G^\\circ=0$인 온도입니다.',
          '$T=\\dfrac{\\Delta H^\\circ}{\\Delta S^\\circ}=\\dfrac{178000\\ \\text{J}}{161\\ \\text{J/K}}=1106$ K (약 833 °C)',
        ],
        answer: '298 K에서는 비자발적, 약 1106 K보다 높은 온도에서 자발적',
      },
      {
        q: 'CuSO₄ 수용액에 2.00 A의 전류를 흘려 구리 1.27 g을 석출시키려면 몇 초가 걸립니까? (Cu 몰질량 63.5 g/mol, $F=96500$ C/mol)',
        steps: [
          '석출할 구리: $\\dfrac{1.27}{63.5}=0.0200$ mol',
          'Cu²⁺ + 2e⁻ → Cu이므로 필요한 전자는 $0.0200 \\times 2=0.0400$ mol',
          '전하량: $Q=0.0400 \\times 96500=3860$ C',
          '시간: $t=\\dfrac{Q}{I}=\\dfrac{3860}{2.00}=1930$ s (약 32분)',
        ],
        answer: '1930 s',
      },
    ],

    terms: [
      { term: '엔트로피', def: '에너지와 입자가 흩어진 정도, 곧 계가 가질 수 있는 미시적 상태의 수를 나타내는 양 $S$입니다. 기체가 액체보다, 액체가 고체보다 큽니다.' },
      { term: '열역학 제2법칙', def: '자발적 과정에서 우주(계 + 주위)의 엔트로피는 증가한다는 법칙입니다. $\\Delta S_{\\text{우주}}>0$' },
      { term: '표준 몰 엔트로피', def: '표준 상태에서 물질 1몰의 절대 엔트로피 $S^\\circ$(J/(mol·K))입니다. 0 K 완전 결정의 엔트로피를 0으로 두는 제3법칙 덕분에 정할 수 있습니다.' },
      { term: '깁스 자유 에너지', def: '$G=H-TS$. 온도·압력이 일정할 때 $\\Delta G<0$이면 자발적, $\\Delta G=0$이면 평형, $\\Delta G>0$이면 비자발적입니다.' },
      { term: '표준 환원 전위', def: '표준 수소 전극(0 V)을 기준으로 잰 반쪽 반응의 환원 경향 $E^\\circ$입니다. 클수록 환원되기 쉽습니다. 예: Cu²⁺/Cu +0.34 V, Zn²⁺/Zn −0.76 V' },
      { term: '산화 전극', def: '산화가 일어나 전자를 내놓는 전극(애노드)입니다. 갈바니 전지에서는 (−)극, 전기 분해에서는 전원의 (+)극에 이은 전극입니다.' },
      { term: '환원 전극', def: '환원이 일어나 전자를 받는 전극(캐소드)입니다. 갈바니 전지에서는 (+)극, 전기 분해에서는 전원의 (−)극에 이은 전극입니다.' },
      { term: '염다리', def: '갈바니 전지의 두 반쪽 전지를 잇는 이온 통로입니다. 이온이 움직여 두 용액의 전하 균형을 맞추고 회로를 완성합니다.' },
      { term: '패러데이 상수', def: '전자 1몰의 전하량으로 $F=96485$ C/mol(약 96500 C/mol)입니다.' },
      { term: '네른스트 식', def: '표준 상태가 아닐 때의 전지 전위를 구하는 식입니다. 25 °C에서 $E=E^\\circ-\\dfrac{0.0592}{n}\\log Q$' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '다음 중 계의 엔트로피가 **감소하는** 과정은 무엇입니까?',
        choices: ['물이 얼어 얼음이 된다', '드라이아이스가 승화한다', '소금이 물에 녹는다', 'CaCO₃(s) → CaO(s) + CO₂(g)'],
        answer: 0,
        why: [
          '',
          '고체가 기체가 되는 승화는 엔트로피가 크게 증가합니다.',
          '고체가 물에 녹아 이온이 흩어지면 대부분 엔트로피가 증가합니다.',
          '고체에서 기체가 생기므로 엔트로피가 증가합니다.',
        ],
        explain: '액체(물)가 고체(얼음)가 되면 분자가 정해진 자리에 고정되어 가능한 배열의 수가 줄어듭니다. 그래서 $\\Delta S<0$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 0,
        q: '일정한 온도·압력에서 발열 반응은 주위의 엔트로피를 증가시킨다.',
        answer: true,
        explain: '$\\Delta S_{\\text{주위}}=-\\dfrac{\\Delta H_{\\text{계}}}{T}$이므로 $\\Delta H<0$(발열)이면 $\\Delta S_{\\text{주위}}>0$입니다. 계가 내놓은 열이 주위 분자의 운동을 활발하게 만듭니다.',
      },
      {
        id: 'p3', level: 2, type: 'short', check: 'number', unit: 'J/K', concept: 0,
        q: 'N₂(g) + 3H₂(g) → 2NH₃(g)의 $\\Delta S^\\circ$는 몇 J/K입니까? ($S^\\circ$: N₂(g) 191.6, H₂(g) 130.7, NH₃(g) 192.5 J/(mol·K))',
        answer: '-198.7',
        hint: '각 물질의 $S^\\circ$에 계수를 곱해 더한 뒤, 생성물에서 반응물을 뺍니다.',
        wrong: [
          { a: '-129.8', why: '계수를 곱하지 않았습니다. NH₃는 2몰, H₂는 3몰입니다.' },
          { a: '198.7', why: '반응물에서 생성물을 뺐습니다. $\\Delta S^\\circ$는 (생성물) − (반응물)입니다. 기체 4몰이 2몰이 되므로 음수가 맞습니다.' },
        ],
        explain: '생성물 $2 \\times 192.5=385.0$, 반응물 $191.6+3 \\times 130.7=583.7$이므로 $\\Delta S^\\circ=385.0-583.7=-198.7$ J/K입니다. 기체 분자 수가 줄어 엔트로피가 감소합니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 1,
        q: '$\\Delta H<0$이고 $\\Delta S>0$인 반응의 자발성으로 옳은 것은 무엇입니까?',
        choices: ['모든 온도에서 자발적이다', '낮은 온도에서만 자발적이다', '높은 온도에서만 자발적이다', '어떤 온도에서도 비자발적이다'],
        answer: 0,
        why: [
          '',
          '낮은 온도에서만 자발적인 것은 $\\Delta H<0$, $\\Delta S<0$인 경우입니다.',
          '높은 온도에서만 자발적인 것은 $\\Delta H>0$, $\\Delta S>0$인 경우입니다.',
          '언제나 비자발적인 것은 $\\Delta H>0$, $\\Delta S<0$인 경우입니다.',
        ],
        explain: '$\\Delta G=\\Delta H-T\\Delta S$에서 $\\Delta H$는 음수, $-T\\Delta S$도 음수이므로 어떤 온도에서도 $\\Delta G<0$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', unit: 'kJ', concept: 1,
        q: '어떤 반응의 $\\Delta H^\\circ=-92.2$ kJ, $\\Delta S^\\circ=-198.7$ J/K입니다. 298 K에서 $\\Delta G^\\circ$는 몇 kJ입니까? (소수 첫째 자리까지)',
        answer: ['-33.0', '-32.99', '-32.987', '-32.9874'],
        hint: '$\\Delta S^\\circ$를 kJ/K로 바꾼 뒤 $\\Delta G^\\circ=\\Delta H^\\circ-T\\Delta S^\\circ$에 넣습니다.',
        wrong: [
          { a: '59120.4', why: '$\\Delta S^\\circ$를 J/K 그대로 넣었습니다. $-198.7$ J/K $=-0.1987$ kJ/K로 바꾸어 단위를 맞춥니다.' },
          { a: '-151.4', why: '$T\\Delta S$를 빼야 하는데 더했습니다. $\\Delta G=\\Delta H-T\\Delta S$입니다.' },
        ],
        explain: '$\\Delta G^\\circ=-92.2-298 \\times(-0.1987)=-92.2+59.2=-33.0$ kJ입니다. 음수이므로 298 K에서 자발적입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 2,
        q: '어떤 반응의 $\\Delta G^\\circ$가 $-20$ kJ입니다. 이 반응의 평형 상수에 대해 옳은 것은 무엇입니까?',
        choices: ['$K>1$', '$K<1$', '$K=1$', '$K<0$'],
        answer: 0,
        why: [
          '',
          '$K<1$이면 $\\ln K<0$이라 $\\Delta G^\\circ$는 양수가 됩니다.',
          '$K=1$이면 $\\ln K=0$이라 $\\Delta G^\\circ=0$입니다.',
          '평형 상수는 언제나 양수입니다.',
        ],
        explain: '$\\Delta G^\\circ=-RT\\ln K<0$이면 $\\ln K>0$이므로 $K>1$입니다. 평형에서 생성물이 우세합니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '다니엘 전지 Zn(s) | Zn²⁺(aq) ‖ Cu²⁺(aq) | Cu(s)에 대한 설명으로 옳은 것은 무엇입니까?',
        choices: ['Zn 전극에서 산화가 일어난다', 'Cu 전극에서 산화가 일어난다', 'Zn 전극에서 환원이 일어난다', '전자는 도선을 따라 Cu에서 Zn으로 흐른다'],
        answer: 0,
        why: [
          '',
          'Cu 전극에서는 Cu²⁺가 전자를 받아 Cu가 되는 환원이 일어납니다.',
          'Zn은 전자를 내놓고 Zn²⁺가 됩니다. 전자를 잃는 것은 산화입니다.',
          '전자는 산화가 일어나는 Zn 전극에서 나와 Cu 전극으로 흐릅니다.',
        ],
        explain: '표준 환원 전위가 작은 Zn(−0.76 V)이 산화되고(Zn → Zn²⁺ + 2e⁻), 큰 Cu(+0.34 V) 쪽에서 Cu²⁺가 환원됩니다. 전자는 Zn에서 Cu로 흐릅니다.',
      },
      {
        id: 'p8', level: 1, type: 'short', check: 'number', unit: 'V', concept: 3,
        q: 'Cu(s) | Cu²⁺(aq) ‖ Ag⁺(aq) | Ag(s) 전지의 표준 전지 전위는 몇 V입니까? (Ag⁺/Ag: +0.80 V, Cu²⁺/Cu: +0.34 V)',
        answer: '0.46',
        wrong: [
          { a: '1.14', why: '두 전위를 더했습니다. 환원 전극의 전위에서 산화 전극의 전위를 뺍니다.' },
          { a: '1.26', why: 'Ag의 반쪽 반응에 2를 곱하면서 전위도 2배로 했습니다. 계수를 곱해도 $E^\\circ$는 그대로입니다.' },
          { a: '-0.46', why: '빼는 순서가 거꾸로입니다. (환원 전극: Ag) − (산화 전극: Cu)입니다.' },
        ],
        explain: '환원 전극은 Ag(+0.80 V), 산화 전극은 Cu(+0.34 V)입니다. $E^\\circ_{\\text{전지}}=0.80-0.34=0.46$ V입니다. 전체 반응은 Cu + 2Ag⁺ → Cu²⁺ + 2Ag이지만 $E^\\circ$는 2배 하지 않습니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', unit: 'V', concept: 4,
        q: '25 °C에서 농도차 전지 Cu(s) | Cu²⁺(0.0010 M) ‖ Cu²⁺(1.0 M) | Cu(s)의 전위는 몇 V입니까? (소수 셋째 자리까지)',
        answer: ['0.089', '0.0888'],
        hint: '두 전극이 같으므로 $E^\\circ=0$입니다. $Q$는 (산화 전극 쪽 농도) ÷ (환원 전극 쪽 농도)입니다.',
        wrong: [
          { a: '0.178', why: '$n=1$로 계산했습니다. Cu²⁺ + 2e⁻ → Cu이므로 $n=2$입니다.' },
          { a: '0', why: '$E^\\circ$만 보았습니다. 농도가 다르면 네른스트 식의 $\\log Q$ 항 때문에 전위가 생깁니다.' },
        ],
        explain: '전체 반응은 Cu²⁺(1.0 M) → Cu²⁺(0.0010 M)이고 $Q=\\dfrac{0.0010}{1.0}=10^{-3}$입니다. $E=0-\\dfrac{0.0592}{2}\\log 10^{-3}=0.0296 \\times 3=0.0888 \\approx 0.089$ V입니다. 진한 쪽이 묽어지고 묽은 쪽이 진해지는 방향이 자발적입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', unit: 'g', concept: 5,
        q: 'CuSO₄ 수용액에 2.00 A의 전류를 965 s 동안 흘렸습니다. 석출되는 구리는 몇 g입니까? (Cu 몰질량 63.5 g/mol, $F=96500$ C/mol)',
        answer: ['0.635', '0.64'],
        hint: '전하량 → 전자의 몰수 → 구리의 몰수 → 질량 순서로 구합니다.',
        wrong: [
          { a: '1.27', why: '전자 1몰이 구리 1몰을 만든다고 보았습니다. Cu²⁺ + 2e⁻ → Cu이므로 전자 몰수를 2로 나눕니다.' },
          { a: '0.3175', why: '전류를 곱하지 않았습니다. 전하량은 $Q=It=2.00 \\times 965$ C입니다.' },
        ],
        explain: '$Q=2.00 \\times 965=1930$ C, 전자 $\\dfrac{1930}{96500}=0.0200$ mol, 구리 $\\dfrac{0.0200}{2}=0.0100$ mol, 질량 $0.0100 \\times 63.5=0.635$ g입니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 4,
        q: '다니엘 전지(Zn + Cu²⁺ → Zn²⁺ + Cu, $E^\\circ=1.10$ V)의 $\\Delta G^\\circ$에 가장 가까운 것은 무엇입니까? ($F=96500$ C/mol)',
        choices: ['$-212$ kJ', '$-106$ kJ', '$+212$ kJ', '$-0.212$ kJ'],
        answer: 0,
        why: [
          '',
          '$n=1$로 계산했습니다. Zn 1개가 전자 2개를 내놓으므로 $n=2$입니다.',
          '부호가 틀렸습니다. $\\Delta G^\\circ=-nFE^\\circ$이므로 $E^\\circ>0$이면 음수입니다.',
          'J을 kJ로 바꿀 때 1000으로 두 번 나누었습니다. $-212000$ J $=-212$ kJ입니다.',
        ],
        explain: '$\\Delta G^\\circ=-nFE^\\circ=-2 \\times 96500 \\times 1.10=-212300$ J $\\approx -212$ kJ입니다.',
      },
      {
        id: 'p12', level: 1, type: 'ox', concept: 5,
        q: '전기 분해에서 전원의 (−)극에 연결된 전극에서는 환원이 일어난다.',
        answer: true,
        explain: '전원의 (−)극은 전극에 전자를 밀어 넣으므로, 그 전극에서는 이온이 전자를 받는 **환원**이 일어납니다(예: Cu²⁺ + 2e⁻ → Cu). 갈바니 전지에서는 환원 전극이 (+)극이라 부호가 반대입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', unit: 'K', concept: 1,
        q: '어떤 분해 반응의 $\\Delta H^\\circ=+180$ kJ, $\\Delta S^\\circ=+150$ J/K입니다(온도에 따라 거의 변하지 않는다고 봅니다). 표준 상태에서 이 반응이 자발적이 되기 시작하는 온도는 몇 K입니까?',
        answer: '1200',
        hint: '$\\Delta G^\\circ=0$이 되는 온도를 구합니다. 단위를 맞추세요.',
        wrong: [
          { a: '1.2', why: 'kJ과 J/K를 그대로 나누었습니다. $180$ kJ $=180000$ J로 바꿉니다.' },
          { a: '927', why: '섭씨온도로 바꾸었습니다. 문제는 켈빈(K)으로 묻습니다.' },
        ],
        explain: '$T=\\dfrac{\\Delta H^\\circ}{\\Delta S^\\circ}=\\dfrac{180000}{150}=1200$ K입니다. $\\Delta H>0$, $\\Delta S>0$이므로 1200 K보다 높은 온도에서 $\\Delta G^\\circ<0$, 곧 자발적입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 2,
        q: '298 K에서 어떤 반응의 $\\Delta G^\\circ=-11.4$ kJ입니다. 평형 상수 $K$에 가장 가까운 것은 무엇입니까? ($2.303RT=5.71$ kJ/mol)',
        choices: ['약 $1\\times10^{2}$', '약 $1\\times10^{-2}$', '약 4.6', '약 2.0'],
        answer: 0,
        why: [
          '',
          '부호를 놓쳤습니다. $\\Delta G^\\circ$가 음수이면 $\\log K$는 양수입니다.',
          '$\\ln K$의 값(약 4.6)을 $K$로 썼습니다. $K=e^{4.6}$입니다.',
          '$\\log K$의 값(약 2.0)을 $K$로 썼습니다. $K=10^{2.0}$입니다.',
        ],
        hint: '$\\Delta G^\\circ=-2.303RT\\log K$에서 $\\log K$를 먼저 구합니다.',
        explain: '$\\log K=\\dfrac{-\\Delta G^\\circ}{2.303RT}=\\dfrac{11.4}{5.71}=2.0$이므로 $K=10^{2.0}=1\\times10^{2}$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 4,
        q: '25 °C에서 전자 2몰이 이동하는 어떤 전지 반응의 $E^\\circ=0.0888$ V입니다. 이 반응의 평형 상수는 얼마입니까? ($\\frac{RT}{F}\\ln 10=0.0592$ V로 계산)',
        answer: '1000',
        hint: '$E^\\circ=\\dfrac{0.0592}{n}\\log K$를 씁니다.',
        wrong: [
          { a: '3', why: '$\\log K$를 구하고 멈췄습니다. $K=10^{3}$입니다.' },
          { a: '31.6', why: '$n=1$로 계산했습니다. 전자 2몰이 이동하므로 $n=2$입니다.' },
        ],
        explain: '$\\log K=\\dfrac{nE^\\circ}{0.0592}=\\dfrac{2 \\times 0.0888}{0.0592}=3$이므로 $K=10^{3}=1000$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 4,
        q: '다니엘 전지를 오래 사용하는 동안 전지 전위가 변하는 까닭으로 옳은 것은 무엇입니까?',
        choices: [
          '[Zn²⁺]가 늘고 [Cu²⁺]가 줄어 $Q$가 커지므로 $E$가 작아진다',
          '[Zn²⁺]가 줄고 [Cu²⁺]가 늘어 $Q$가 작아지므로 $E$가 커진다',
          '아연 전극이 작아지므로 $E^\\circ$가 작아진다',
          '$E$는 1.10 V로 끝까지 일정하다가 갑자기 0이 된다',
        ],
        answer: 0,
        why: [
          '',
          '방전 중에는 Zn이 Zn²⁺로 녹아 나오고 Cu²⁺가 Cu로 석출되므로 [Zn²⁺]는 늘고 [Cu²⁺]는 줄어듭니다.',
          '$E^\\circ$는 표준 상태에서 정해진 값이라 전극 크기와 관계없습니다. 고체는 $Q$에도 들어가지 않습니다.',
          '네른스트 식에 따라 $Q$가 변하는 만큼 $E$도 서서히 줄어듭니다.',
        ],
        explain: '$E=1.10-\\dfrac{0.0592}{2}\\log\\dfrac{[\\mathrm{Zn²⁺}]}{[\\mathrm{Cu²⁺}]}$에서 방전할수록 $Q$가 커져 $E$가 줄고, $Q=K$가 되면 $E=0$이 됩니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', unit: 's', concept: 5,
        q: 'AgNO₃ 수용액에 0.500 A의 전류를 흘려 은 1.079 g을 석출시키려면 몇 초가 걸립니까? (Ag 몰질량 107.9 g/mol, $F=96500$ C/mol)',
        answer: '1930',
        hint: '석출할 은의 몰수 → 필요한 전자의 몰수 → 전하량 → 시간 순서로 구합니다.',
        wrong: [
          { a: '965', why: '전하량(965 C)을 구하고 멈췄습니다. 시간은 전하량을 전류로 나눈 값입니다.' },
          { a: '482.5', why: '전하량을 전류로 나누지 않고 곱했습니다. $t=\\dfrac{Q}{I}$입니다.' },
        ],
        explain: '은 $\\dfrac{1.079}{107.9}=0.0100$ mol, Ag⁺ + e⁻ → Ag이므로 전자도 0.0100 mol입니다. $Q=0.0100 \\times 96500=965$ C, $t=\\dfrac{965}{0.500}=1930$ s입니다.',
      },
      {
        id: 'a6', level: 3, type: 'choice', concept: 3,
        q: '표준 상태에서 Cu²⁺는 환원시키지만 Zn²⁺는 환원시키지 못하는 금속은 무엇입니까? (E°: Ag⁺/Ag +0.80, Cu²⁺/Cu +0.34, Fe²⁺/Fe −0.44, Zn²⁺/Zn −0.76, Al³⁺/Al −1.66, Mg²⁺/Mg −2.37 V)',
        choices: ['Fe', 'Ag', 'Mg', 'Al'],
        answer: 0,
        why: [
          '',
          'Ag는 $E^\\circ$(+0.80 V)가 Cu보다도 높아 Cu²⁺도 Zn²⁺도 환원시키지 못합니다.',
          'Mg는 $E^\\circ$가 Zn보다도 낮아 Zn²⁺까지 환원시킵니다.',
          'Al은 $E^\\circ$가 Zn보다 낮아 Zn²⁺까지 환원시킵니다.',
        ],
        hint: '금속 M이 이온 X를 환원시키려면 $E^\\circ_{\\text{전지}}=E^\\circ(X)-E^\\circ(M)>0$이어야 합니다.',
        explain: 'M이 Cu²⁺를 환원하려면 $E^\\circ(\\mathrm{M})<+0.34$, Zn²⁺를 환원하지 못하려면 $E^\\circ(\\mathrm{M})>-0.76$이어야 합니다. 이 사이에 있는 것은 Fe(−0.44 V)입니다. Fe + Cu²⁺ → Fe²⁺ + Cu는 $E^\\circ=0.78$ V로 자발적이고, Fe + Zn²⁺는 $E^\\circ=-0.32$ V로 비자발적입니다.',
      },
    ],

    deeper: [
      {
        title: '연료 전지와 열역학 효율',
        body: '수소 연료 전지는 2H₂ + O₂ → 2H₂O 반응을 태우지 않고 전지로 진행시킵니다. 표준 전지 전위는 1.23 V입니다.\n\n물 1몰이 생길 때 $\\Delta H^\\circ=-285.8$ kJ, $\\Delta G^\\circ=-237.1$ kJ입니다. 전지가 할 수 있는 최대 전기적 일은 $-\\Delta G$이므로, 이론적 최대 효율은 $\\dfrac{237.1}{285.8} \\approx 83$ %입니다. 나머지 $T\\Delta S$에 해당하는 에너지는 열로 나갈 수밖에 없습니다.\n\n연료를 태워 열기관을 돌리면 카르노 효율이라는 다른 한계(열원과 냉각원의 온도 차)에 묶여 실제 효율이 훨씬 낮습니다. 자유 에너지를 곧바로 전기로 바꾸는 전지가 열기관보다 효율이 높을 수 있는 까닭이 여기 있습니다. 같은 원리로 리튬 이온 전지는 충전(전기 분해처럼 에너지를 넣어 비자발적 반응을 일으킴)과 방전(갈바니 전지)을 되풀이합니다.',
      },
      {
        title: '부식과 희생 양극',
        body: '철이 녹스는 것은 철이 산화되고 산소가 환원되는 작은 갈바니 전지가 철 표면에서 생기는 현상입니다. 물방울 가장자리처럼 산소가 많은 곳이 환원 전극, 산소가 적은 안쪽이 산화 전극이 되며 Fe → Fe²⁺ + 2e⁻로 철이 녹아 나옵니다. 소금물은 이온이 많아 전류가 잘 흐르므로 부식을 빠르게 합니다.\n\n철을 아연으로 도금하면(함석) 흠집이 나도 표준 환원 전위가 더 낮은 아연(−0.76 V)이 철(−0.44 V)보다 먼저 산화되어 철을 지킵니다. 배의 선체나 땅속 배관에 마그네슘·아연 덩어리를 이어 두는 **희생 양극**법도 같은 원리입니다. 반대로 주석으로 도금한 철은 흠집이 나면 철이 먼저 산화되어 오히려 부식이 빨라질 수 있습니다.',
      },
    ],

    faq: [
      {
        q: '엔트로피는 무질서도라고 배웠는데, 정확한 말인가요?',
        a: '직관을 잡기에는 좋지만 정확한 정의는 "계가 가질 수 있는 미시적 상태의 수"($S=k\\ln W$), 또는 에너지가 얼마나 넓게 흩어져 있는가입니다. 예를 들어 기름과 물이 섞이지 않고 나뉘는 것은 겉보기에 "질서"가 생기는 것 같지만, 물 분자들이 가질 수 있는 배열을 따지면 엔트로피로 설명됩니다. 겉모습의 질서와 미시 상태의 수를 구분해 생각하세요.',
      },
      {
        q: 'ΔG가 음수인데 왜 반응이 일어나지 않아요?',
        a: '$\\Delta G$는 반응이 **일어날 수 있는지**(열역학)를 말할 뿐, **얼마나 빨리** 일어나는지(속도론)는 말하지 않습니다. 활성화 에너지가 크면 자발적인 반응도 아주 느립니다. 종이와 산소의 반응, 다이아몬드가 흑연으로 바뀌는 반응이 그렇습니다. 촉매나 점화(에너지 공급)로 활성화 에너지 장벽을 넘으면 진행합니다.',
      },
      {
        q: '반쪽 반응에 2를 곱하면 E°도 2배가 되나요?',
        a: '아닙니다. $E^\\circ$는 전자 1몰이 이동할 때의 에너지(전위)라서 반응의 양과 관계없는 세기 성질입니다. 반대로 $\\Delta G^\\circ=-nFE^\\circ$는 반응의 양에 비례하는 크기 성질이라, 계수를 2배 하면 $n$이 2배가 되어 $\\Delta G^\\circ$도 2배가 됩니다.',
      },
      {
        q: '건전지는 왜 쓸수록 약해지다가 결국 닳아요?',
        a: '반응이 진행하면서 생성물이 쌓이고 반응물이 줄어 반응 지수 $Q$가 커집니다. 네른스트 식 $E=E^\\circ-\\dfrac{0.0592}{n}\\log Q$에 따라 전위가 떨어지고, $Q$가 $K$에 이르면 $E=0$이 되어 더는 일을 하지 못합니다. 실제 건전지에서는 내부 저항이 커지는 것도 전압 저하의 원인입니다.',
      },
    ],

    mistakes: [
      '$\\Delta H$(kJ)와 $\\Delta S$(J/K)의 단위를 맞추지 않고 $\\Delta G=\\Delta H-T\\Delta S$에 넣는 실수 — $\\Delta S$를 1000으로 나누어 kJ/K로 바꾼 뒤 계산합니다.',
      '반쪽 반응에 계수를 곱하면서 $E^\\circ$까지 곱하는 실수 — $E^\\circ$는 그대로이고, $E^\\circ_{\\text{전지}}=E^\\circ_{\\text{환원 전극}}-E^\\circ_{\\text{산화 전극}}$로 구합니다.',
      '전기 분해에서 금속의 몰수를 전자의 몰수와 같다고 보는 실수 — Cu²⁺처럼 전하가 2인 이온은 전자 2몰이 금속 1몰을 만듭니다.',
    ],

    gens: [
      {
        id: 'dg-calc',
        level: 1,
        title: 'ΔG = ΔH − TΔS 계산하기',
        make: function (R) {
          var T = R.pick([298, 300, 350, 400, 500, 1000]);
          var dH = -50, dS = 100, GJ = 0, i, h, s, g;
          for (i = 0; i < 100; i++) {
            h = R.nonzero(-250, 250); s = R.nonzero(-300, 300);
            g = 1000 * h - T * s; // J
            if (Math.abs(g) >= 100 && Math.abs(g) % 100 !== 50) { dH = h; dS = s; GJ = g; break; }
          }
          if (GJ === 0) GJ = 1000 * dH - T * dS;
          var exact = trimDec(GJ / 1000, 3);
          var r1 = (Math.round(GJ / 100) / 10).toFixed(1);
          var answers = [r1];
          if (exact !== r1 && Number(exact) !== Number(r1)) answers.push(exact);
          var sKJ = trimDec(dS / 1000, 3);
          var wrong = [
            { a: String(dH - T * dS), why: '$\\Delta S$를 J/K 그대로 넣었습니다. ' + sg(dS) + ' J/K $=' + sKJ + '$ kJ/K로 바꾸어 단위를 맞춥니다.' },
            { a: (Math.round((1000 * dH + T * dS) / 100) / 10).toFixed(1), why: '$T\\Delta S$를 빼야 하는데 더했습니다. $\\Delta G=\\Delta H-T\\Delta S$입니다.' },
          ].filter(function (w) { return answers.every(function (x) { return Number(x) !== Number(w.a); }); });
          return {
            type: 'short', check: 'number', unit: 'kJ', concept: 1,
            q: '어떤 반응의 $\\Delta H^\\circ=' + sg(dH) + '$ kJ, $\\Delta S^\\circ=' + sg(dS) + '$ J/K입니다. ' + T + ' K에서 $\\Delta G^\\circ$는 몇 kJ입니까? (소수 첫째 자리까지)',
            answer: answers,
            wrong: wrong,
            explain: '$\\Delta S^\\circ$를 kJ/K로 바꾸면 $' + sKJ + '$ kJ/K입니다.\n\n$\\Delta G^\\circ=\\Delta H^\\circ-T\\Delta S^\\circ=' + dH + '-' + T + ' \\times (' + sKJ + ')=' + exact + (Number(exact) === Number(r1) ? '' : ' \\approx ' + r1) + '$ kJ\n\n' +
              (GJ < 0 ? '음수이므로 ' + T + ' K에서 자발적입니다.' : '양수이므로 ' + T + ' K에서 비자발적입니다.'),
          };
        },
      },
      {
        id: 'cross-temp',
        level: 2,
        title: '자발성이 바뀌는 경계 온도 구하기',
        make: function (R) {
          var dS = R.int(5, 25) * 10;
          var T0 = R.int(5, 30) * 50;
          var up = R.bool(); // true: ΔH>0, ΔS>0
          var dHabs = dS * T0 / 1000; // kJ (0.5 단위)
          var dHs = Number.isInteger(dHabs) ? String(dHabs) : dHabs.toFixed(1);
          var wrong = [
            { a: String(T0 / 1000), why: 'kJ과 J/K를 그대로 나누었습니다. $\\Delta H$를 J로 바꾸면 ' + (dHabs * 1000) + ' J입니다.' },
            { a: String(T0 - 273), why: '섭씨온도로 바꾸었습니다. 문제는 켈빈(K)으로 묻습니다.' },
          ];
          return {
            type: 'short', check: 'number', unit: 'K', concept: 1,
            q: '어떤 반응의 $\\Delta H^\\circ=' + (up ? '+' : '-') + dHs + '$ kJ, $\\Delta S^\\circ=' + (up ? '+' : '-') + dS + '$ J/K입니다(온도에 따라 변하지 않는다고 봅니다). 표준 상태에서 $\\Delta G^\\circ=0$이 되는 온도는 몇 K입니까?',
            answer: String(T0),
            hint: '$\\Delta G^\\circ=\\Delta H^\\circ-T\\Delta S^\\circ=0$을 $T$에 대해 풉니다. 단위를 맞추세요.',
            wrong: wrong,
            explain: '$T=\\dfrac{\\Delta H^\\circ}{\\Delta S^\\circ}=\\dfrac{' + (up ? '' : '-') + (dHabs * 1000) + '\\ \\text{J}}{' + (up ? '' : '-') + dS + '\\ \\text{J/K}}=' + T0 + '$ K입니다. ' +
              (up ? '$\\Delta H>0$, $\\Delta S>0$이므로 ' + T0 + ' K보다 높은 온도에서 자발적입니다.' : '$\\Delta H<0$, $\\Delta S<0$이므로 ' + T0 + ' K보다 낮은 온도에서 자발적입니다.'),
          };
        },
      },
      {
        id: 'dg-from-k',
        level: 2,
        title: '평형 상수로 표준 자유 에너지 변화 구하기',
        make: function (R) {
          var k = R.nonzero(-12, 12);
          var v1 = -2.302585 * 8.314 * 298 * k / 1000;
          var v2 = -2.303 * 8.314 * 298 * k / 1000;
          var a1 = v1.toFixed(1), a2 = v2.toFixed(1);
          var answers = a1 === a2 ? [a1] : [a1, a2];
          var wrong = [
            { a: (-v1).toFixed(1), why: '부호를 빠뜨렸습니다. $\\Delta G^\\circ=-RT\\ln K$이므로 ' + (k > 0 ? '$K>1$이면 음수' : '$K<1$이면 양수') + '입니다.' },
            { a: (-8.314 * 298 * k / 1000).toFixed(1), why: '$\\log K$를 $\\ln K$처럼 썼습니다. $\\ln K=2.303\\log K$입니다.' },
          ].filter(function (w) { return answers.indexOf(w.a) < 0; });
          return {
            type: 'short', check: 'number', unit: 'kJ', concept: 2,
            q: '298 K에서 어떤 반응의 평형 상수가 $K=1.0\\times10^{' + k + '}$입니다. 이 반응의 $\\Delta G^\\circ$는 몇 kJ입니까? (소수 첫째 자리까지, $R=8.314$ J/(mol·K))',
            answer: answers,
            hint: '$\\ln K=2.303\\log K$를 이용합니다.',
            wrong: wrong,
            explain: '$\\log K=' + k + '$이므로 $\\ln K=2.303 \\times (' + k + ')$입니다.\n\n$\\Delta G^\\circ=-RT\\ln K=-8.314 \\times 298 \\times 2.303 \\times (' + k + ')$ J $\\approx ' + a2 + '$ kJ\n\n' +
              (k > 0 ? '$K>1$이므로 $\\Delta G^\\circ$는 음수입니다.' : '$K<1$이므로 $\\Delta G^\\circ$는 양수입니다.') + ' (298 K에서 $K$가 10배 될 때마다 $\\Delta G^\\circ$는 약 5.71 kJ씩 작아집니다.)',
          };
        },
      },
      {
        id: 'cell-potential',
        level: 1,
        title: '표준 환원 전위로 표준 전지 전위 구하기',
        make: function (R) {
          var pair = R.sample(METALS, 2);
          var cat = pair[0].E > pair[1].E ? pair[0] : pair[1];
          var an = cat === pair[0] ? pair[1] : pair[0];
          var cv = cat.E - an.E;
          var ans = volt(cv);
          var cands = [
            [volt(cat.E + an.E), '두 전위를 더했습니다. $E^\\circ_{\\text{전지}}$는 (환원 전극) − (산화 전극)입니다.'],
            [volt(-cv), '빼는 순서가 거꾸로입니다. $E^\\circ$가 큰 쪽이 환원 전극이고, 그 값에서 산화 전극의 값을 뺍니다.'],
          ];
          if (cat.z === 1 && an.z === 2) cands.push([volt(2 * cat.E - an.E), 'Ag⁺의 계수 2를 전위에도 곱했습니다. 계수를 곱해도 $E^\\circ$는 그대로입니다.']);
          var wrong = [];
          cands.forEach(function (c) {
            if (Number(c[0]) !== Number(ans) && !wrong.some(function (w) { return Number(w.a) === Number(c[0]); })) wrong.push({ a: c[0], why: c[1] });
          });
          return {
            type: 'short', check: 'number', unit: 'V', concept: 3,
            q: pair[0].m + '/' + pair[0].ion + ' 반쪽 전지와 ' + pair[1].m + '/' + pair[1].ion + ' 반쪽 전지를 이어 갈바니 전지를 만들었습니다. 표준 전지 전위는 몇 V입니까?\n\n' +
              '(' + pair[0].ion + '/' + pair[0].m + ': $' + sgnV(pair[0].E) + '$ V, ' + pair[1].ion + '/' + pair[1].m + ': $' + sgnV(pair[1].E) + '$ V)',
            answer: ans,
            wrong: wrong,
            explain: '표준 환원 전위가 큰 ' + cat.m + ' 쪽이 환원 전극, 작은 ' + an.m + ' 쪽이 산화 전극입니다.\n\n$E^\\circ_{\\text{전지}}=' + sgnV(cat.E) + '-(' + sgnV(an.E) + ')=' + ans + '$ V',
          };
        },
      },
      {
        id: 'dg-nfe',
        level: 2,
        title: '전지 전위로 ΔG°와 평형 상수 구하기',
        make: function (R) {
          var pair = R.sample(METALS, 2);
          var cat = pair[0].E > pair[1].E ? pair[0] : pair[1];
          var an = cat === pair[0] ? pair[1] : pair[0];
          var cv = cat.E - an.E;
          var eq = cat.m === 'Ag'
            ? an.m + '(s) + 2Ag⁺(aq) → ' + an.ion + '(aq) + 2Ag(s)'
            : an.m + '(s) + ' + cat.ion + '(aq) → ' + an.ion + '(aq) + ' + cat.m + '(s)';
          var pots = '(' + cat.ion + '/' + cat.m + ': $' + sgnV(cat.E) + '$ V, ' + an.ion + '/' + an.m + ': $' + sgnV(an.E) + '$ V)';
          var eStep = '$E^\\circ_{\\text{전지}}=' + sgnV(cat.E) + '-(' + sgnV(an.E) + ')=' + volt(cv) + '$ V이고, ' + an.m + ' 1몰이 전자 2몰을 내놓으므로 $n=2$입니다.';
          if (R.bool()) {
            var k1 = (2 * cv / 100 / 0.0592).toFixed(1), k2 = (2 * cv / 100 / 0.05916).toFixed(1);
            var kAns = k1 === k2 ? [k1] : [k1, k2];
            return {
              type: 'short', check: 'number', concept: 4,
              q: '25 °C에서 다음 반응의 평형 상수 $K$에 대해 $\\log K$는 얼마입니까? (소수 첫째 자리까지, $\\frac{RT}{F}\\ln 10=0.0592$ V)\n\n' + eq + '\n\n' + pots,
              answer: kAns,
              hint: '$E^\\circ=\\dfrac{0.0592}{n}\\log K$를 씁니다.',
              wrong: [{ a: (cv / 100 / 0.0592).toFixed(1), why: '$n=1$로 계산했습니다. 이 반응에서는 전자 2몰이 이동하므로 $n=2$입니다.' }].filter(function (w) { return kAns.indexOf(w.a) < 0; }),
              explain: eStep + '\n\n$\\log K=\\dfrac{nE^\\circ}{0.0592}=\\dfrac{2 \\times ' + volt(cv) + '}{0.0592} \\approx ' + k1 + '$\n\n곧 $K \\approx 10^{' + k1 + '}$이며, 반응이 거의 끝까지 진행합니다.',
            };
          }
          var g1 = Math.round(-2 * 96485 * cv / 100000), g2 = Math.round(-2 * 96500 * cv / 100000);
          var answers = g1 === g2 ? [String(g1)] : [String(g1), String(g2)];
          var wrong = [
            { a: String(Math.round(-96485 * cv / 100000)), why: '$n=1$로 계산했습니다. 균형 맞춘 반응에서 전자 2몰이 이동하므로 $n=2$입니다.' },
            { a: String(-g1), why: '부호를 빠뜨렸습니다. $\\Delta G^\\circ=-nFE^\\circ$이므로 $E^\\circ>0$이면 음수입니다.' },
          ].filter(function (w) { return answers.indexOf(w.a) < 0; });
          return {
            type: 'short', check: 'number', unit: 'kJ', concept: 4,
            q: '표준 상태에서 다음 반응이 일어나는 갈바니 전지의 $\\Delta G^\\circ$는 몇 kJ입니까? (정수로 반올림, $F=96485$ C/mol)\n\n' + eq + '\n\n' + pots,
            answer: answers,
            hint: '먼저 $E^\\circ_{\\text{전지}}$를 구하고, 반응에서 이동하는 전자의 몰수 $n$을 셉니다.',
            wrong: wrong,
            explain: eStep + '\n\n$\\Delta G^\\circ=-nFE^\\circ=-2 \\times 96485 \\times ' + volt(cv) + '$ J $\\approx ' + g1 + '$ kJ',
          };
        },
      },
      {
        id: 'nernst',
        level: 2,
        title: '네른스트 식으로 비표준 상태의 전지 전위 구하기',
        make: function (R) {
          var pair = R.sample(METALS.slice(1), 2); // 모두 2가 이온
          var cat = pair[0].E > pair[1].E ? pair[0] : pair[1];
          var an = cat === pair[0] ? pair[1] : pair[0];
          var cv = cat.E - an.E;
          var pq = R.sample([0, 1, 2, 3], 2);
          var p = pq[0], q = pq[1]; // [산화 전극 이온] = 10^-p, [환원 전극 이온] = 10^-q
          var d = q - p; // log Q
          var CONC = ['1.0', '0.10', '0.010', '0.0010'];
          var e1 = ((cv * 100 - 296 * d) / 10000).toFixed(2);
          var e2 = ((cv * 1000 - 2958 * d) / 100000).toFixed(2);
          var answers = e1 === e2 ? [e1] : [e1, e2];
          var wrong = [
            { a: ((cv * 100 + 296 * d) / 10000).toFixed(2), why: '보정 항의 부호가 거꾸로입니다. $E=E^\\circ-\\dfrac{0.0592}{n}\\log Q$이고, $Q$는 (생성물 이온) ÷ (반응물 이온)입니다.' },
            { a: ((cv * 100 - 592 * d) / 10000).toFixed(2), why: '$n=1$로 계산했습니다. 두 금속 이온이 모두 2가이므로 $n=2$입니다.' },
          ].filter(function (w) { return answers.every(function (x) { return Number(x) !== Number(w.a); }); });
          return {
            type: 'short', check: 'number', unit: 'V', concept: 4,
            q: '25 °C에서 다음 전지의 전위는 몇 V입니까? (소수 둘째 자리까지)\n\n' + an.m + '(s) | ' + an.ion + '(' + CONC[p] + ' M) ‖ ' + cat.ion + '(' + CONC[q] + ' M) | ' + cat.m + '(s)\n\n(' + cat.ion + '/' + cat.m + ': $' + sgnV(cat.E) + '$ V, ' + an.ion + '/' + an.m + ': $' + sgnV(an.E) + '$ V)',
            answer: answers,
            hint: '전체 반응을 쓰고 $Q=\\dfrac{[' + '\\mathrm{' + an.ion + '}]}{[\\mathrm{' + cat.ion + '}]}$를 구합니다.',
            wrong: wrong,
            explain: '$E^\\circ=' + sgnV(cat.E) + '-(' + sgnV(an.E) + ')=' + volt(cv) + '$ V, 전체 반응은 ' + an.m + ' + ' + cat.ion + ' → ' + an.ion + ' + ' + cat.m + '이고 $n=2$입니다.\n\n' +
              '$Q=\\dfrac{[\\mathrm{' + an.ion + '}]}{[\\mathrm{' + cat.ion + '}]}=\\dfrac{' + CONC[p] + '}{' + CONC[q] + '}=10^{' + d + '}$\n\n' +
              '$E=' + volt(cv) + '-\\dfrac{0.0592}{2}\\log 10^{' + d + '}=' + volt(cv) + '-0.0296 \\times (' + d + ')=' + ((cv * 100 - 296 * d) / 10000).toFixed(4) + ' \\approx ' + e1 + '$ V',
          };
        },
      },
      {
        id: 'faraday',
        level: 2,
        title: '패러데이 법칙으로 석출량 구하기',
        make: function (R) {
          var MET = R.pick([
            { name: '구리', topic: '구리는', sol: 'CuSO₄', ion: 'Cu²⁺', sym: 'Cu', n: 2, M: '63.5', per: 3175 },
            { name: '은', topic: '은은', sol: 'AgNO₃', ion: 'Ag⁺', sym: 'Ag', n: 1, M: '107.9', per: 10790 },
            { name: '니켈', topic: '니켈은', sol: 'NiSO₄', ion: 'Ni²⁺', sym: 'Ni', n: 2, M: '58.7', per: 2935 },
          ]); // per: 전자 0.0100 mol 당 석출 질량(1e-4 g 단위)
          var I = R.pick([{ v: 0.5, s: '0.500' }, { v: 1, s: '1.00' }, { v: 2, s: '2.00' }, { v: 5, s: '5.00' }]);
          var j = R.int(1, 12);
          if (I.v === 2 && j % 2 === 1) j += 1;
          var Q = 965 * j, t = Q / I.v;
          var m4 = MET.per * j; // 1e-4 g
          var exact = trimDec(m4 / 10000, 4);
          var r2 = (Math.round(m4 / 100) / 100).toFixed(2);
          var r3 = m4 >= 100000 ? (Math.round(m4 / 1000) / 10).toFixed(1) : m4 >= 10000 ? r2 : (Math.round(m4 / 10) / 1000).toFixed(3);
          var answers = [r2];
          [exact, r3].forEach(function (x) { if (answers.every(function (y) { return Number(y) !== Number(x); })) answers.push(x); });
          var eMol = (j / 100).toFixed(4), mMol = (j / (100 * MET.n)).toFixed(4);
          var wrong = MET.n === 2
            ? [{ a: (Math.round(m4 * 2 / 100) / 100).toFixed(2), why: '전자 1몰이 금속 1몰을 만든다고 보았습니다. ' + MET.ion + ' + 2e⁻ → ' + MET.sym + '이므로 전자 몰수를 2로 나눕니다.' }]
            : [{ a: (Math.round(m4 / 2 / 100) / 100).toFixed(2), why: '전자 2몰이 은 1몰을 만든다고 보았습니다. Ag⁺ + e⁻ → Ag이므로 전자 1몰이 은 1몰을 만듭니다.' }];
          wrong = wrong.filter(function (w) { return answers.every(function (y) { return Number(y) !== Number(w.a); }); });
          return {
            type: 'short', check: 'number', unit: 'g', concept: 5,
            q: MET.sol + ' 수용액에 ' + I.s + ' A의 전류를 ' + t + ' s 동안 흘렸습니다. 석출되는 ' + MET.topic + ' 몇 g입니까? (' + MET.sym + ' 몰질량 ' + MET.M + ' g/mol, $F=96500$ C/mol, 소수 둘째 자리까지)',
            answer: answers,
            hint: '전하량 $Q=It$ → 전자의 몰수 → 금속의 몰수 → 질량 순서로 구합니다.',
            wrong: wrong,
            explain: '$Q=It=' + I.s + ' \\times ' + t + '=' + Q + '$ C이므로 전자는 $\\dfrac{' + Q + '}{96500}=' + eMol + '$ mol입니다.\n\n' +
              MET.ion + ' + ' + (MET.n === 2 ? '2e⁻' : 'e⁻') + ' → ' + MET.sym + '이므로 ' + MET.name + '의 몰수는 ' + (MET.n === 2 ? '그 절반인 ' : '전자와 같은 ') + mMol + ' mol, 질량은 $' + mMol + ' \\times ' + MET.M + '=' + exact + ' \\approx ' + r2 + '$ g입니다.',
          };
        },
      },
    ],
  });

  function volt(cv) { return (cv < 0 ? '-' : '') + (Math.abs(cv) / 100).toFixed(2); }   // 0.01 V 단위 → '0.46'
  function sgnV(cv) { return (cv > 0 ? '+' : cv < 0 ? '-' : '') + (Math.abs(cv) / 100).toFixed(2); } // '+0.34', '-0.76'
  function sg(n) { return n > 0 ? '+' + n : String(n); }
  function trimDec(x, d) { var s = x.toFixed(d); if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, ''); return s === '-0' ? '0' : s; }
})();
